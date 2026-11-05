/* Drawing finish only. Authored scene objects, reveals and narration indices stay intact. */
(() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const context = document.createElement('canvas').getContext('2d');
  const styles = document.createElement('style');
  styles.textContent = `
    html[data-week] .player .w10s-host .w10s-mount { filter:none!important; }
    html[data-week] .player .w10s-host svg text {
      font-family:"Atkinson Hyperlegible",sans-serif!important;
      font-weight:700!important;letter-spacing:0!important;
    }
    html[data-week] .player .w10s-host svg :is(path,line,polyline,polygon) {
      stroke-linejoin:round;
    }
    html[data-week] body[data-view="player"] #courseNav .player-topbar-row {
      grid-template-columns:76px minmax(0,1fr) max-content!important;
    }
    html[data-week] #playerSettingsSlot { display:flex;align-items:center;gap:.35rem;width:auto!important;min-width:0; }
    .vl-art-open { display:grid;place-items:center;min-width:44px;min-height:44px;padding:.5rem;border-radius:12px; }
    .vl-art-open[hidden] { display:none; }
    .vl-art-dialog .vl-art-pan { overflow:auto;max-height:70dvh;background:#fff;border:1px solid var(--line);border-radius:9px; }
    .vl-art-dialog svg { display:block;max-width:none!important;max-height:none!important; }
    .vl-art-dialog h2 { font-size:1.2rem;margin:.8em 0; }
    .vl-art-dialog p { font-size:1rem;line-height:1.5; }
    @media (orientation:landscape) and (max-height:500px) {
      html[data-week] body.vl-measured .player .w10s-mount .vl-scene-caption {
        padding:.2em .45em!important;min-height:0!important;line-height:1.2;
        flex-wrap:nowrap!important;gap:.4em!important;
      }
      html[data-week] body.vl-measured .player .w10s-mount :is(.w01-lab,.w04-txt,.w05-lab,.w08-lab,.w10-lab,.w11-lab) {
        flex:1 1 auto!important;order:0!important;font-size:.72rem!important;
      }
    }
  `;
  document.head.appendChild(styles);

  function boxFor(text) {
    // Measure in the label's own coordinate space. A nearby card may be nested
    // under a translated/animated group; never compare unrelated local x/y values.
    const b = text.getBBox(), matrix = text.getCTM();
    if (!matrix || !b.width) return null;
    const centre = new DOMPoint(b.x+b.width/2,b.y+b.height/2).matrixTransform(matrix);
    let best = null;
    for (let g=text.parentElement;g&&g.tagName!=='svg';g=g.parentElement) {
      for (const r of g.children) {
        if (r.tagName!=='rect' || !r.getCTM()) continue;
        const rb=r.getBBox(), p=centre.matrixTransform(r.getCTM().inverse());
        if (rb.width<25 || rb.height<16 || p.x<rb.x || p.x>rb.x+rb.width || p.y<rb.y || p.y>rb.y+rb.height) continue;
        if (!best || rb.width*rb.height<best.area) {
          const m=matrix.inverse().multiply(r.getCTM());
          // Rotated stamps and camera worlds retain their authored typography.
          if (Math.abs(m.b)>.01 || Math.abs(m.c)>.01) continue;
          best={element:r,x:rb.x*m.a+m.e,y:rb.y*m.d+m.f,width:rb.width*Math.abs(m.a),height:rb.height*Math.abs(m.d),area:rb.width*rb.height};
        }
      }
      if (best) break;
    }
    return best;
  }
  function luminance(fill) {
    const a=fill.match(/[\d.]+/g);if(!a||a.length<3)return null;
    return a.slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
  }
  function prepare(mount, look) {
    const svg=mount.querySelector('svg');if(!svg)return {refresh(){}};
    const labels=[...svg.querySelectorAll('text')], done=new WeakMap(), authored=new WeakMap();
    const unit=svg.viewBox.baseVal.width/400 || 1;
    // Keep small icon details light and card outlines consistent. Wide route
    // strokes, chart weights, dashed conventions and square BPMN symbols retain
    // their authored distinctions.
    for(const shape of svg.querySelectorAll('[stroke-width]')) {
      if(shape.closest('defs,clipPath,mask') || shape.matches('text,tspan'))continue;
      const w=+shape.getAttribute('stroke-width');
      if(w>=1.8*unit&&w<=3.1*unit)shape.setAttribute('stroke-width',String(2.25*unit));
      if(shape.tagName==='rect') {
        const h=+shape.getAttribute('height'),r=+shape.getAttribute('rx');
        if(+shape.getAttribute('width')>70*unit&&h>32*unit&&r>0&&r<h*.4)shape.setAttribute('rx',String(Math.min(9*unit,h*.2)));
      }
    }
    for(const el of svg.querySelectorAll('[class]')) {
      const c=getComputedStyle(el);
      if(c.animationIterationCount==='infinite'&&/bob|pulse|blink|flow/i.test(c.animationName)) {
        const duration=parseFloat(c.animationDuration);
        if(duration>0&&duration<2.4)el.style.animationDuration='2.4s';
      }
    }
    function refresh() {
      // Dynamic titles/counters can be rewritten by a scene. Only remeasure
      // changed words; no layout reads or animation restarts for stable labels.
      for(const text of labels) {
        const attribute=text.getAttribute('font-size');
        const key=text.textContent+'|'+attribute+'|'+text.style.fontSize;
        if(done.get(text)===key)continue;
        const cs=getComputedStyle(text);
        // Some weekly engines already fit a long label with an inline font size.
        // Respect that measured size, including subsequent dynamic refits. The
        // SVG presentation attribute is only the original design's upper bound.
        let source=authored.get(text);
        if(!source||source.attribute!==attribute||source.applied!==text.style.fontSize)source={size:parseFloat(cs.fontSize),attribute};
        const original=source.size;
        if(!original || !text.textContent.trim() || text.closest('defs'))continue;
        const box=boxFor(text), own=text.getBBox();
        if(!own.width)continue;
        let target=box?Math.max(original,Math.min(16*unit,original*1.22)):original;
        if(box?.width>svg.viewBox.baseVal.width*.72)target=original;
        // These authored components fit their border to the measured text.
        // Enlarging their lettering afterwards would invalidate that fit.
        if(text.closest('.pill,[data-pill],[data-pad],.v2fit,[data-vl-fit="authored"]'))target=original;
        if(box&&+box.element.getAttribute('rx')>=box.height*.4)target=original;
        if(text.matches('.vlw-gl') || /^[\d?%+×✓✔✕!]{1,3}$/.test(text.textContent.trim()))target=original;
        const y=+text.getAttribute('y');
        const near=[...text.parentElement.children].filter(e=>e!==text&&e.tagName==='text').map(e=>({b:e.getBBox(),gap:Math.abs(+e.getAttribute('y')-y),size:parseFloat(e.getAttribute('font-size'))||original})).filter(e=>e.gap>0&&e.gap<Math.max(original,e.size)*1.8&&Math.abs(e.b.x+e.b.width/2-own.x-own.width/2)<Math.max(e.b.width,own.width)*.35);
        if(near.length)target=Math.min(target,...near.map(e=>e.gap*.78));
        target=Math.max(original,target);
        const width=s=>{context.font=`700 ${target}px "Atkinson Hyperlegible"`;return context.measureText(s).width};
        // Text without a card gets only the room its original line occupied.
        // Explicitly authored multi-line labels are never reflowed here.
        const x=+text.getAttribute('x'),anchor=cs.textAnchor,pad=7*unit;
        const space=box?Math.max(1,anchor==='start'?box.x+box.width-pad-x:anchor==='end'?x-box.x-pad:2*Math.min(x-box.x-pad,box.x+box.width-pad-x)):own.width;
        const spans=[...text.querySelectorAll('tspan')];
        const longest=Math.max(...(spans.length?spans.map(s=>width(s.textContent)):[width(text.textContent)]));
        if(target>original+.1&&longest>space&&box&&!spans.length&&!near.length&&box.height>=target*2.9&&text.textContent.includes(' ')) {
          const words=text.textContent.split(' '),lines=[];let line='';
          for(const word of words){if(line&&width(line+' '+word)>space){lines.push(line);line=word}else line+=(line?' ':'')+word}if(line)lines.push(line);
          const x=text.getAttribute('x'),y=+text.getAttribute('y'),lh=target*1.15,start=y-(lines.length-1)*lh/2;
          if(lines.length<=3&&start-target>=box.y+4*unit&&start+(lines.length-1)*lh<=box.y+box.height-4*unit&&lines.every(s=>width(s)<=space)) {
            text.replaceChildren(...lines.map((s,i)=>{const span=document.createElementNS(NS,'tspan');span.setAttribute('x',x);span.setAttribute('y',String(start+i*lh));span.textContent=s+(i<lines.length-1?' ':'');return span}));
          }else target=Math.max(original,target*space/longest);
        }else if(longest>space)target=Math.max(original,target*space/longest);
        text.style.fontSize=target.toFixed(2)+'px';
        const light=luminance(cs.fill),rgb=cs.fill.match(/[\d.]+/g)?.slice(0,3).map(Number);
        // Preserve authored semantic colours and inverse lettering. Only pale
        // neutral construction ink is promoted to readable annotation ink.
        // The whiteboard dresser alone owns its marker palette.
        if(look!=='board'&&rgb&&Math.max(...rgb)-Math.min(...rgb)<50&&light>.28&&light<.8)text.style.fill='#455965';
        source.applied=text.style.fontSize;authored.set(text,source);
        done.set(text,text.textContent+'|'+text.getAttribute('font-size')+'|'+text.style.fontSize);
      }
    }
    refresh();
    const result={refresh};instances.set(mount,result);return result;
  }
  const instances=new WeakMap();
  let active=null,dialog=null;
  const open=document.createElement('button');
  open.type='button';open.className='vl-art-open';open.hidden=true;
  open.title='Enlarge lesson drawing';open.setAttribute('aria-label','Enlarge lesson drawing');
  open.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="10" cy="10" r="7"/><path d="m15 15 6 6M10 7v6M7 10h6"/></svg>';
  document.getElementById('playerSettingsSlot')?.prepend(open);
  function close(){dialog?.close();}
  open.onclick=()=>{
    const source=active?.mount.querySelector('svg');if(!source)return;
    // Use the existing Pause action; there is no independent media state here.
    const toggle=document.getElementById('toggle');if(toggle?.textContent.includes('Pause'))toggle.click();
    const clone=source.cloneNode(true),original=[source,...source.querySelectorAll('*')],copy=[clone,...clone.querySelectorAll('*')];
    for(let i=0;i<original.length;i++){
      const c=getComputedStyle(original[i]);
      for(const k of ['fill','stroke','stroke-width','stroke-linecap','stroke-linejoin','stroke-dasharray','stroke-dashoffset','opacity','visibility','display','font-family','font-size','font-weight','letter-spacing','text-anchor','dominant-baseline','paint-order','transform','transform-origin','transform-box','clip-path','mask','filter','marker-start','marker-end'])copy[i].style.setProperty(k,c.getPropertyValue(k));
      copy[i].style.animation='none';copy[i].style.transition='none';
    }
    const ids=new Map();for(const el of copy)if(el.id){ids.set(el.id,el.id+'-detail');el.id+='-detail'}
    for(const el of copy)for(const attr of [...el.attributes]){let value=attr.value;for(const [old,id] of ids)value=value.replaceAll('#'+old,'#'+id);if(value!==attr.value)el.setAttribute(attr.name,value)}
    const visible=e=>{for(let n=e;n&&n!==source;n=n.parentElement){const c=getComputedStyle(n);if(c.display==='none'||c.visibility==='hidden'||+c.opacity<.15)return false}return true};
    const screen=source.getBoundingClientRect(),matrix=source.getScreenCTM(),scale=Math.hypot(matrix.a,matrix.b);
    const type=[...source.querySelectorAll('text')].filter(e=>{const r=e.getBoundingClientRect();return visible(e)&&e.textContent.trim().length>3&&r.right>screen.left&&r.left<screen.right&&r.bottom>screen.top&&r.top<screen.bottom}).map(e=>{const m=e.getScreenCTM();return parseFloat(getComputedStyle(e).fontSize)*Math.hypot(m.a,m.b)/scale});
    const view=source.viewBox.baseVal,minimum=Math.min(16,...type);
    const width=Math.ceil(Math.max(view.width*16/minimum,Math.min(innerWidth-64,1000)));
    clone.style.setProperty('width',width+'px','important');clone.style.setProperty('height',(width*view.height/view.width)+'px','important');
    dialog=document.createElement('dialog');dialog.className='qdiagram-dialog vl-art-dialog';dialog.setAttribute('aria-label','Enlarged lesson drawing');
    const closeButton=document.createElement('button');closeButton.type='button';closeButton.className='qdiagram-close';closeButton.textContent='Close enlarged view';closeButton.onclick=close;
    const heading=document.createElement('h2');heading.textContent=active.title;
    const hint=document.createElement('p');hint.textContent='Scroll to inspect the drawing. Continue the lesson when you’re ready.';
    const pan=document.createElement('div');pan.className='vl-art-pan';pan.tabIndex=0;pan.setAttribute('aria-label','Lesson drawing. Scroll in either direction to inspect.');pan.appendChild(clone);
    dialog.append(closeButton,heading,hint,pan);
    const opened=dialog;
    opened.onclose=()=>{opened.remove();if(dialog===opened)dialog=null;if(open.isConnected&&!open.hidden)open.focus({preventScroll:true})};
    document.body.appendChild(dialog);dialog.showModal();closeButton.focus();
  };
  window.VL_ART={prepare,refresh:mount=>instances.get(mount)?.refresh(),current(value){active=value;open.hidden=!value;if(!value)close()}};
})();
