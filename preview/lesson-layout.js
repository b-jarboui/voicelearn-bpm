/* Content-sized lesson presentation. No scene, narration or assessment state is changed. */
(() => {
  'use strict';
  // Paint tap feedback before presentation work. Audio activation remains in
  // the original player handler; only visual work uses this coalescing queue.
  const jobs = new Map();
  let immediate = false, discarding = false, lastInput = -Infinity;
  const afterPaint = fn => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(fn, 0)));
  const taps = new WeakMap();
  function tapFeedback(event) {
    lastInput=performance.now();
    const el=event.target.closest?.('button,summary');
    if(!el||el.disabled)return;
    const token={flip:!taps.get(el)?.flip};taps.set(el,token);el.setAttribute('data-vl-tap',token.flip?'1':'0');
    // A small fixed ink ring also paints independently of a busy SVG layer.
    // Pointer coordinates avoid measuring the button during scene layout.
    let ink;
    if(event.type==='pointerdown'){
      ink=document.createElement('canvas');ink.width=48;ink.height=48;ink.className='vl-tap-ink';ink.setAttribute('aria-hidden','true');
      ink.style.left=event.clientX+'px';ink.style.top=event.clientY+'px';document.body.append(ink);
      const context=ink.getContext('2d'),start=performance.now();
      const paint=()=>{
        if(!ink.isConnected||!context)return;
        const progress=Math.min(1,(performance.now()-start)/120);
        context.clearRect(0,0,48,48);context.beginPath();context.arc(24,24,7+progress*13,0,Math.PI*2);
        context.strokeStyle='#175caa';context.lineWidth=5;context.stroke();
        context.strokeStyle='#fff';context.lineWidth=2;context.stroke();
        if(progress<1)requestAnimationFrame(paint);
      };requestAnimationFrame(paint);
    }
    // Keep the feedback through a paint even if preparation delays timers.
    // Starting a 100 ms timer at pointerdown could remove it before any paint.
    requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(()=>{
      ink?.remove();
      if(taps.get(el)===token){el.removeAttribute('data-vl-tap');taps.delete(el)}
    },100)));
  }
  document.addEventListener('pointerdown',tapFeedback,{capture:true,passive:true});
  document.addEventListener('keydown',event=>{if(!event.repeat&&(event.key==='Enter'||event.key===' '))tapFeedback(event)},{capture:true});
  window.VL_WORK = {
    get immediate() { return immediate; },
    get discarding() { return discarding; },
    discard(fn) { const was=discarding;discarding=true;try{return fn()}finally{discarding=was} },
    visual(key, fn) {
      if (immediate) return fn();
      const pending = jobs.has(key); jobs.set(key, fn);
      if (!pending) afterPaint(() => { const job = jobs.get(key); jobs.delete(key); job?.(); });
    },
    cancel(key) { jobs.delete(key); },
    now(fn) { const was = immediate; immediate = true; try { return fn(); } finally { immediate = was; } },
    afterPaint,
    // A paint boundary also lets Chromium deliver queued touch input. Merely
    // chaining scheduler.yield continuations can still postpone that delivery.
    yield: () => new Promise(resolve => {
      const resume=()=>{
        // Incoming transport taps take precedence over preparing an invisible
        // drawing. Resume after the short burst, without delaying audio actions.
        const quiet=250-(performance.now()-lastInput);
        if(quiet>0)setTimeout(resume,quiet);
        else requestAnimationFrame(()=>setTimeout(resolve,20));
      };
      resume();
    }),
    wrap(fn) { return function(...args) {
      const el = this instanceof HTMLElement ? this : null;
      // Existing interface forwarding and deterministic QA calls keep their
      // synchronous DOM semantics. Native taps get a paint before navigation.
      if(args[0] instanceof Event && !args[0].isTrusted)return fn.apply(el,args);
      if (el?.hasAttribute('data-vl-pending')) return;
      el?.setAttribute('data-vl-pending', ''); el?.setAttribute('aria-busy', 'true');
      afterPaint(() => { if(el&&!el.isConnected)return;try { fn.apply(el, args); } finally { el?.removeAttribute('data-vl-pending'); el?.removeAttribute('aria-busy'); } });
    }; }
  };
  let captions = [], part = '', scene = null, raf = 0, signature = '', settling = 0, settleVersion = 0;
  const body = document.body, main = document.getElementById('main');
  const px = n => `${Math.max(0, Math.ceil(n))}px`;
  const number = s => parseFloat(s) || 0;
  const textSizes = new Map();
  let settleTask = null;
  function put(el, name, value) { if (el.style.getPropertyValue(name) !== value) el.style.setProperty(name, value); }
  function schedule() { if (!raf) raf = requestAnimationFrame(() => { raf = 0; if (!settling) window.VL_WORK.visual('layout', () => { if(scene && !scene.fitKey)startSettle();else fit(); }); }); }
  function flush() {
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    if(window.VL_WORK.immediate)settling=0;
    fit();
  }
  function measureText(source, texts, width, scales) {
    const style = getComputedStyle(source);
    const cacheKey = [source.className, source.closest('[data-look]')?.dataset.look, width, style.font, style.lineHeight, style.padding, scales,
      ...texts.map(t => typeof t === 'string' ? t : t.map(n=>n.outerHTML).join(''))].join('|');
    if(textSizes.has(cacheKey))return textSizes.get(cacheKey);
    const variants = scales || [null], heights = variants.map(() => 0);
    const fragment = document.createDocumentFragment(), seen = new Set(), clones = [];
    for (const text of texts) {
      const key = typeof text === 'string' ? text : text.map(n => n.outerHTML).join('');
      if (seen.has(key)) continue;
      seen.add(key);
      for (const [index, scale] of variants.entries()) {
      const clone = source.cloneNode(false);
      clone.removeAttribute('id'); clone.removeAttribute('aria-live'); clone.removeAttribute('tabindex');
      clone.classList.add('vl-measure'); clone.setAttribute('aria-hidden', 'true');
      clone.style.cssText = `position:fixed!important;left:-10000px!important;right:auto!important;top:0!important;bottom:auto!important;visibility:hidden!important;display:block!important;width:${width}px!important;height:auto!important;max-height:none!important;min-height:0!important;flex:none!important;overflow:visible!important;animation:none!important;transform:none!important;margin:0!important`;
      clone.style.setProperty('font', style.font, 'important');
      clone.style.setProperty('line-height', style.lineHeight, 'important');
      clone.style.setProperty('padding', style.padding, 'important');
      clone.style.setProperty('white-space', 'normal', 'important');
      if (scale != null) {
        clone.style.setProperty('--vl-note-scale', String(scale));
        clone.style.setProperty('--vl-note-label-scale', String(Math.min(1.3, scale)));
      }
      if (typeof text === 'string') clone.textContent = text;
      else clone.replaceChildren(...text.map(n => n.cloneNode(true)));
      fragment.appendChild(clone); clones.push({clone, index});
      }
    }
    // Insert once, read once, remove once: avoid reflowing the live SVG for every sentence.
    source.parentElement.appendChild(fragment);
    clones.forEach(({clone,index}) => { heights[index] = Math.max(heights[index], clone.getBoundingClientRect().height); });
    clones.forEach(({clone}) => clone.remove());
    const result = scales ? heights.map(Math.ceil) : Math.ceil(heights[0]);
    if(textSizes.size>=96)textSizes.delete(textSizes.keys().next().value);
    textSizes.set(cacheKey,result);return result;
  }
  function fit() { if(settling)return;for (const phase of fitSteps()) { /* synchronous inspection/resize */ } }
  function startSettle() {
    if(settleTask?.scene===scene&&settleTask.part===part)return settleTask.promise;
    const task={scene,part};task.promise=settle();settleTask=task;
    task.promise.finally(()=>{if(settleTask===task)settleTask=null});
    return task.promise;
  }
  async function settle() {
    window.VL_WORK.cancel('layout');
    const currentScene=scene,currentPart=part,version=++settleVersion,steps=fitSteps();
    settling=version;
    try {
      while(true){
        if(scene!==currentScene||part!==currentPart||body.dataset.view!=='player'||settling!==version){steps.return();return false}
        if(steps.next().done)return true;
        await window.VL_WORK.yield();
      }
    } finally { if(settling===version){settling=0;schedule();} }
  }
  function* fitSteps() {
    if (body.dataset.view !== 'player') return;
    if(scene?.host.isConnected && scene.host.classList.contains('on') && !body.classList.contains('vl-measured'))body.classList.add('vl-measured');
    const cc = document.getElementById('cc'), bar = document.querySelector('body > .bar');
    if (!cc || !bar) return;
    const full = body.classList.contains('fs'), off = body.classList.contains('cc-off');
    const viewport = window.visualViewport;
    const bottom = Math.min(viewport ? viewport.height + viewport.offsetTop : innerHeight, bar.getBoundingClientRect().top);
    const nav = document.getElementById('courseNav');
    const top = full ? (viewport?.offsetTop || 0) : Math.max(0, nav.getBoundingClientRect().bottom);
    const cs = getComputedStyle(main), space = Math.max(1, bottom - top - number(cs.paddingTop) - number(cs.paddingBottom));
    const width = Math.max(1, main.clientWidth - number(cs.paddingLeft) - number(cs.paddingRight));
    const portrait = !!scene && space > width;
    const key = [part, width, space, full, off, portrait, getComputedStyle(document.documentElement).fontSize, devicePixelRatio].join('|');
    if (key !== signature) {
      signature = key;
      // Portrait has room for a reading band as well as the picture. Measure every
      // sentence at the larger type, so captions never change height mid-part.
      put(body, '--vl-caption-scale', portrait ? '1.15' : '1');
      const natural = off ? 0 : measureText(cc, captions.length ? captions : [cc.textContent], width);
      // Extremely long captions and large accessibility fonts stay readable in a scrollable band.
      const height = Math.min(natural, space * (width > space ? .25 : .28));
      put(body, '--vl-caption-size', px(height));
      put(body, '--vl-controls-size', px(bar.getBoundingClientRect().height));
      put(main, '--vl-lesson-space', px(space));
      put(main, '--vl-page-space', px(bottom - top));
    }
    yield;
    if (!scene?.host.isConnected || !scene.host.classList.contains('on')) return;
    const {host, mount, text, states} = scene;
    const canvas = mount.firstElementChild, svg = mount.querySelector('svg');
    if (!canvas || !svg) return;
    const fitKey = key + '|' + text.dataset.shown + '|' + [...canvas.children].filter(e=>!e.querySelector('svg')&&e!==svg).map(e=>e.textContent).join('|');
    if (scene.fitKey === fitKey && scene.drawing) {
      scene.composition?.compose(...scene.drawing);
      return;
    }
    if(!body.classList.contains('vl-measured'))body.classList.add('vl-measured');
    const hcs = getComputedStyle(host), ics = getComputedStyle(host.querySelector('.w10s-inner'));
    const w = Math.max(1, width - number(hcs.paddingLeft) - number(hcs.paddingRight) - number(ics.paddingLeft) - number(ics.paddingRight));
    const band = off ? 0 : number(body.style.getPropertyValue('--vl-caption-size'));
    const available = Math.max(1, space - band - number(hcs.paddingTop) - number(hcs.paddingBottom));
    const row = w > available * 1.35;
    host.dataset.flow = row ? 'row' : 'stack';
    host.dataset.presentation = portrait && !row ? 'portrait' : 'wide';
    const gap = number(getComputedStyle(host).fontSize) * .5;
    const noteWidth = row ? Math.min(w * .32, number(getComputedStyle(text).fontSize) * 22) : w;
    const noteKey = [part, w, available, row, noteWidth, getComputedStyle(text).font, getComputedStyle(document.documentElement).fontSize].join('|');
    if (scene.noteKey !== noteKey) {
      scene.noteKey = noteKey;
      put(host, '--vl-note-scale', '1');
      put(host, '--vl-note-label-scale', '1');
      scene.notes = measureText(text, states.length ? states : [[...text.children]], noteWidth);
      scene.chromeReserve = null;
      scene.portraitKey = '';
    }
    yield;
    // Wide compositions reserve the largest explanation of this part. Portrait
    // below measures the current note and composes the remaining drawing space.
    let notes = Math.min(scene.notes, available * (row ? 1 : .42));
    const view = svg.viewBox.baseVal;
    // Some authored scenes adjust their viewBox to fit a label during playback.
    // Keep the presentation box stable while SVG's own meet scaling handles that change.
    if (!scene.ratio) scene.ratio = view.width > 0 && view.height > 0 ? view.width / view.height : 4 / 3;
    let ratio = scene.ratio;
    // Resolve the authored heading/footer separately from the SVG. Wrapping labels
    // may grow the card downward, but cannot shrink or move the illustration.
    put(mount, '--vl-scene-width', px(row ? w - noteWidth - gap : w));
    let figure = svg;
    while (figure.parentElement && figure.parentElement !== canvas) figure = figure.parentElement;
    figure.dataset.vlFigure = '';
    const style = getComputedStyle(canvas);
    const siblings = [...canvas.children].filter(el => el !== figure && !['absolute','fixed'].includes(getComputedStyle(el).position) && getComputedStyle(el).display !== 'none');
    siblings.forEach(el => { if (el.textContent.trim()) el.classList.add('vl-scene-caption'); });
    const chrome = number(style.paddingTop) + number(style.paddingBottom) + number(style.borderTopWidth) + number(style.borderBottomWidth)
      + siblings.reduce((n,el) => { const c=getComputedStyle(el); return n+el.getBoundingClientRect().height+number(c.marginTop)+number(c.marginBottom); },0)
      + number(style.rowGap) * siblings.length;
    if (scene.chromeReserve == null) scene.chromeReserve = chrome + Math.max(0,...siblings.map(el => number(getComputedStyle(el).lineHeight) || number(getComputedStyle(el).fontSize)*1.4));
    put(mount, '--vl-footer-limit', px(scene.chromeReserve));
    const maxW = row ? w - noteWidth - gap : w;
    let maxH = Math.max(1, row ? available : available - notes - gap);
    // A portrait drawing is composed for its actual available rectangle, after
    // measuring the caption, explanation and scene chrome. No device breakpoint.
    const wantsPortraitArt = !row && available > maxW && window.VL_PORTRAIT;
    yield;
    const composition = wantsPortraitArt ? window.VL_PORTRAIT.prepare(mount) : scene.composition;
    yield;
    // A declined composition uses the complete authored drawing and spare bands.
    const portraitArt = !!(wantsPortraitArt && composition);
    if (composition) scene.composition = composition;
    if (portraitArt && composition) {
      put(host, '--vl-note-scale', '1');
      put(host, '--vl-note-label-scale', '1');
      notes = Math.min(text.scrollHeight, available * .42);
      maxH = Math.max(1, available - notes - gap);
      ratio = maxW / Math.max(1, maxH - chrome);
      host.dataset.presentation = 'portrait';
    } else composition?.restore();
    const drawingW = portraitArt ? maxW : Math.max(1, Math.min(maxW, Math.max(1, maxH - scene.chromeReserve) * ratio));
    put(mount, '--vl-scene-width', px(drawingW));
    put(mount, '--vl-art-height', px(drawingW / ratio));
    const finalChrome = number(style.paddingTop) + number(style.paddingBottom) + number(style.borderTopWidth) + number(style.borderBottomWidth)
      + siblings.reduce((n,el) => { const c=getComputedStyle(el); return n+el.getBoundingClientRect().height+number(c.marginTop)+number(c.marginBottom); },0)
      + number(style.rowGap) * siblings.length;
    const drawingH = drawingW / ratio + finalChrome;
    put(mount, '--vl-scene-height', px(drawingH));
    // For an authored wide composition, fit the current explanation into the
    // remaining space. A composed portrait keeps the note's natural type size.
    // Never stretch the SVG or shrink accessibility text to make it fit.
    const noteLimit = portraitArt ? notes : portrait && !row ? Math.max(1, available - drawingH - gap) : row ? available : notes;
    const portraitKey = [noteKey, noteLimit, text.innerHTML].join('|');
    if (!portraitArt && portrait && !row && scene.portraitKey !== portraitKey) {
      scene.portraitKey = portraitKey;
      const current = [[...text.children]];
      // Measure type candidates in one DOM batch, without repeatedly reflowing
      // the live animated drawing or flashing intermediate sizes on a phone.
      const scales = Array.from({length:16}, (_, i) => 1 + i * .05);
      const sizes = measureText(text, current, noteWidth, scales);
      let low = 1;
      sizes.forEach((height, i) => { if (height <= noteLimit) low = scales[i]; });
      put(host, '--vl-note-scale', String(low));
      put(host, '--vl-note-label-scale', String(Math.min(1.3, low)));
    }
    put(text, '--vl-note-limit', px(noteLimit));
    put(host, '--vl-note-width', px(noteWidth));
    put(host, '--vl-scene-gap', px(gap));
    const noteH = Math.min(text.scrollHeight, noteLimit);
    const rowHeight = Math.max(drawingW / ratio + scene.chromeReserve, Math.min(scene.notes, available));
    put(host, '--vl-row-height', px(rowHeight));
    const height = (row ? Math.max(rowHeight,drawingH) : drawingH + noteH + gap) + number(hcs.paddingTop) + number(hcs.paddingBottom);
    put(main, '--vl-picture-size', px(height));
    // Only authored wide proportions can leave spare bands. A composed portrait
    // uses its available height, apart from subpixel rounding.
    put(body, '--vl-spare', px(Math.floor(Math.max(0, space - band - height) / 2)));
    scene.fitKey = fitKey;
    scene.drawing = portraitArt && composition ? [drawingW, drawingW / ratio] : null;
    yield;
    if (scene.drawing) composition.compose(...scene.drawing);
    if (cc.scrollHeight > cc.clientHeight + 1 && !off) { cc.tabIndex = 0; cc.setAttribute('aria-label', 'Caption. Scroll to read the full sentence.'); }
    else { cc.removeAttribute('tabindex'); cc.removeAttribute('aria-label'); }
    if (text.scrollHeight > text.clientHeight + 1) { text.tabIndex = 0; text.setAttribute('role','region'); text.setAttribute('aria-label','Lesson explanation'); }
    else { text.removeAttribute('tabindex'); text.removeAttribute('role'); text.removeAttribute('aria-label'); }
  }
  window.VL_LAYOUT = {
    part(key, lines) { if (part !== key || captions !== lines) { part = key; captions = lines || []; signature = ''; } schedule(); },
    scene(value) { scene = value; if (!scene) body.classList.remove('vl-measured'); schedule(); },
    refresh: schedule,
    flush,
    settle: startSettle
  };
  const resize = new ResizeObserver(schedule);
  for (const el of [main, document.getElementById('courseNav'), document.querySelector('body > .bar')]) if (el) resize.observe(el);
  new MutationObserver(schedule).observe(body, {attributes:true,attributeFilter:['class','data-view','data-step']});
  window.addEventListener('resize', schedule);
  window.addEventListener('orientationchange', schedule);
  document.addEventListener('fullscreenchange', () => { signature = ''; schedule(); });
  window.visualViewport?.addEventListener('resize', schedule);
  document.fonts?.addEventListener('loadingdone', () => { textSizes.clear(); signature = ''; if (scene) { scene.noteKey = ''; scene.fitKey = ''; } schedule(); });
  document.fonts?.ready.then(schedule);
})();
