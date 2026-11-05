/* W10 scenes host: mounts one original scene per section over the look's stage, in sync with narration.
   Contract: window.W10_SCENES[secId] = { build(el), step(i, n), reset() }. Loaded after cinematics.js. */
(() => {
  "use strict";
  if (window.W10_SCENES_HOST) return;
  // One registry for every week: weeks register window.VL_SCENES[sectionId] = { build, step, reset }.
  window.W10_SCENES = window.W10_SCENES || window.VL_SCENES || {};
  window.VL_SCENES = window.W10_SCENES;

  const CSS = `
.w10s-host{position:absolute;inset:0;z-index:30;overflow:hidden;background:#fbf8f1;display:none;box-sizing:border-box;
  padding:10px 8px 10px;font-family:inherit;color:#1b2a3a;touch-action:manipulation}
.w10s-host.on{display:block}
.w10s-host .w10s-inner{width:100%;height:100%;display:flex;flex-direction:column;justify-content:flex-start;gap:10px}
.w10s-host .w10s-text{flex:0 0 auto;padding:4px 10px 8px;text-align:left;min-height:96px}
.w10s-host .w10s-text .k{font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#a4553a;margin:0 0 6px}
.w10s-host .w10s-text .m{font-size:clamp(19px,2.6vw,30px);line-height:1.3;font-weight:700;margin:0}
.w10s-host .w10s-text .s{font-size:clamp(15px,1.8vw,20px);line-height:1.45;margin:8px 0 0;opacity:.85}
.w10s-host .w10s-text.in{animation:w10sIn .45s ease both}
.w10s-host[data-look=notebook]{background:repeating-linear-gradient(to bottom,transparent 0 31px,rgba(70,110,160,.16) 31px 32px),#fbf8f1!important}
.w10s-host[data-look=notebook]::before{content:"";position:absolute;top:0;bottom:0;left:22px;width:2px;background:rgba(190,70,60,.45);z-index:0}
.w10s-host[data-look=notebook] .w10s-inner{position:relative;z-index:1;padding-left:18px}
.w10s-host[data-look=notebook] .w10s-mount{filter:sepia(.25) saturate(.9)}
.w10s-host[data-look=notebook] .w10s-text .m{font-family:Georgia,"Times New Roman",serif;font-weight:600}
.w10s-host[data-look=notebook] .w10s-text .k{color:#b34a3c;font-family:Georgia,serif;font-style:italic;letter-spacing:.04em;text-transform:none;font-size:15px}
.w10s-host[data-look=journey]{background:radial-gradient(circle at 85% 10%,rgba(214,170,90,.25),transparent 40%),linear-gradient(180deg,#f3e8d2,#e6efe4)!important}
.w10s-host[data-look=journey]::before{content:"";position:absolute;left:14px;top:0;bottom:0;width:4px;background:repeating-linear-gradient(to bottom,#2f6b57 0 10px,transparent 10px 18px);opacity:.55}
.w10s-host[data-look=journey]::after{content:"";position:absolute;left:8px;top:18px;width:16px;height:16px;border-radius:50%;background:#c46a2b;box-shadow:0 0 0 5px rgba(196,106,43,.25)}
.w10s-host[data-look=journey] .w10s-inner{padding-left:22px}
.w10s-host[data-look=journey] .w10s-text .m{color:#24473b}
.w10s-host[data-look=journey] .w10s-text{border-left:4px dashed #2f6b57;margin-left:14px;padding-left:16px;position:relative}
.w10s-host[data-look=journey] .w10s-text::before{content:"";position:absolute;left:-11px;top:6px;width:14px;height:14px;border-radius:50%;background:#2f6b57;box-shadow:0 0 0 4px rgba(47,107,87,.2)}
.w10s-host[data-look=journey] .w10s-text .k{color:#2f6b57}
.w10s-host[data-look=journey] .w10s-mount{filter:hue-rotate(-12deg) saturate(1.05)}
.w10s-host[data-look=board]{background:#fff!important;border:1px solid #abb8c4;border-radius:12px;box-shadow:none;padding:12px;color:#202f39;color-scheme:light}
.w10s-host[data-look=board] .w10s-mount{filter:none}
.w10s-host[data-look=board] .w10s-text .m,.w10s-host[data-look=board] .w10s-text .s{color:#202f39;font-family:"Segoe Print","Comic Sans MS","Atkinson Hyperlegible",sans-serif;opacity:1}
.w10s-host[data-look=board] .w10s-text .k{color:#175caa}
.w10s-host[data-look=motion]{background:radial-gradient(circle,rgba(58,92,255,.12) 1.2px,transparent 1.4px) 0 0/18px 18px,#ffffff!important}
.w10s-host[data-look=motion]::before{content:"";position:absolute;left:0;right:0;top:0;height:8px;background:linear-gradient(90deg,#3a5cff,#ff4f8b,#ffb020)}
.w10s-host[data-look=motion] .w10s-text .m{font-size:clamp(22px,3vw,34px);color:#101a3a}
.w10s-host[data-look=motion] .w10s-mount{filter:saturate(1.5) contrast(1.06)}
.w10s-host[data-look=motion] .w10s-text .k{display:inline-block;background:#3a5cff;color:#fff;padding:3px 10px;border-radius:4px;letter-spacing:.08em}
.w10s-host[data-look=motion] .w10s-text .m{font-family:"Segoe UI",Inter,Arial,sans-serif;font-weight:800;letter-spacing:-.01em}
@media (min-width:900px) and (min-aspect-ratio:5/4){
.w10s-host .w10s-inner{flex-direction:row;align-items:center;gap:28px;padding:0 18px}
.w10s-host .w10s-mount{flex:1 1 60%!important;max-height:100%!important;height:100%;min-width:0}
.w10s-host .w10s-text{flex:0 0 34%;min-height:0;max-height:100%;overflow:auto;align-self:center;padding:0 8px 0 0}
.w10s-host .w10s-text .m{font-size:clamp(20px,1.9vw,30px)}
.w10s-host .w10s-text .s{font-size:clamp(15px,1.25vw,19px)}
.w10s-host[data-look=journey] .w10s-text{margin-left:0}
}
@keyframes w10sIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.w10s-host .w10s-text.in{animation:none}}
.w10s-host .w10s-mount{display:flex;flex-direction:column;justify-content:center}.w10s-host .w10s-mount>.w10s{flex:0 1 auto;width:100%;max-height:100%}
[data-w10s="on"]{position:relative}
`;

  function css() {
    if (document.getElementById("w10s-host-css")) return;
    const s = document.createElement("style");
    s.id = "w10s-host-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  const reduced = () => {
    try { return matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; }
  };

  // Section id from the section title (section objects handed to look.load carry the title only).
  function secIdFor(section) {
    if (!section) return null;
    if (section.sec && window.W10_SCENES[section.sec]) return section.sec;
    const lessons = window.COURSE && window.COURSE.lessons;
    if (!Array.isArray(lessons)) return null;
    for (const l of lessons) for (const s of (l.sections || [])) {
      if (s && s.title === section.title && (!section.lesson || true)) return s.sec;
    }
    return null;
  }

  // Guard against GSAP re-appending an inline highlighted keyword after its trailing text:
  // [before, after, <span.nb-key>] is restored to [before, <span.nb-key>, after].
  function repairKeys(root) {
    root.querySelectorAll(".nb-key").forEach(span => {
      const p = span.previousSibling;
      if (p && p.nodeType === 3 && !span.nextSibling && p.previousSibling && p.previousSibling.nodeType === 3) {
        span.parentNode.insertBefore(span, p);
      }
    });
  }

  function linesFor(id) {
    const lessons = window.COURSE && window.COURSE.lessons;
    if (!id || !Array.isArray(lessons)) return [];
    for (const l of lessons) for (const s of (l.sections || [])) if (s && s.sec === id) return s.lines || [];
    return [];
  }

  // On-screen words for the current moment, taken from the lesson's own visual for that line.
  function momentText(v) {
    if (!v || typeof v !== "object") return null;
    const clean = s => (s == null ? "" : String(s).replace(/\|/g, " ").trim());
    switch (v.type) {
      case "title": return { k: v.kicker, m: v.text };
      case "item": return { k: v.n && v.of ? v.n + " of " + v.of : "", m: v.title, s: v.text };
      case "compare": return { k: ["a", "b", "left", "right"].includes(String(v.side).toLowerCase()) ? "" : v.side, m: v.label, s: v.note };
      case "diagram": return { k: v.kicker, m: v.caption };
      case "formula": return { k: "", m: clean(v.label) };
      case "issue": return { k: "", m: v.text, s: v.effect };
      default: return { k: "", m: v.text };
    }
  }

  function notesFor(st, index) {
    // A null moment keeps the previous picture, so keep the previous words too (never an empty box).
    let notes = [];
    for (let j = index; j >= 0 && !notes.length; j--) {
      const line = st.lines && st.lines[j];
      notes = [].concat(Array.isArray(line) ? line[1] : null)
        .map(momentText).filter(c => c && (c.m || c.s));
    }
    if (!notes.length) {
      // Nothing to keep yet (opening sentences): show the sentence being spoken.
      const line = st.lines && st.lines[index];
      const said = Array.isArray(line) ? line[0] : line;
      if (said) notes = [{ k: "", m: String(said) }];
    }
    return notes;
  }

  function noteNodes(notes) {
    return notes.map(t => {
      const note = document.createElement("div");
      note.className = "w10s-note";
      [["k", t.k], ["m", t.m], ["s", t.s]].forEach(([c, s]) => {
        if (!s) return;
        const p = document.createElement("p");
        p.className = c;
        p.textContent = String(s).replace(/\|/g, " ");
        note.appendChild(p);
      });
      return note;
    });
  }

  function showText(st, index) {
    if (!st.text) return;
    const notes = notesFor(st, index), key = JSON.stringify(notes);
    if (key && st.text.dataset.shown === key && st.text.childElementCount) return;
    st.text.dataset.shown = key;
    st.text.replaceChildren(...noteNodes(notes));
    st.text.scrollTop = 0;
    window.VL_LAYOUT?.refresh();
  }

  // Before the first scene step (the part's opening lines): show the part title, not an empty box.
  function showTitle(st) {
    if (!st.text || !st.title || st.text.dataset.shown === "title|" + st.title) return;
    st.text.dataset.shown = "title|" + st.title;
    const p = document.createElement("p");
    p.className = "m";
    p.textContent = st.title;
    st.text.replaceChildren(p);
    window.VL_LAYOUT?.refresh();
  }

  const hosts = new WeakMap();
  let active = null;
  function release() {
    if (!active) return;
    const st = active;
    active = null;
    window.VL_ART?.current(null);
    window.VL_LAYOUT?.scene(null);
    // reset() owns scene timers/RAF work; remove GSAP work before its SVG is detached.
    try { st.scene?.reset(); } catch (e) { console.warn("[w10s] release", st.id, e); }
    if (st.root && window.gsap) gsap.killTweensOf([st.root, ...st.root.querySelectorAll("*")]);
    st.scene = null; st.lastIndex = null;
    if (st.mo) st.mo.disconnect();
    if (st.undress) { st.undress(); st.undress = null; }
  }

  function install(style) {
    if (!style || hosts.has(style) || !["mount", "load", "step"].every(k => typeof style[k] === "function")) return;
    const st = { root: null, host: null, inner: null, scene: null, id: null, n: 0, built: null, mo: null };
    hosts.set(style, st);
    const base = { mount: style.mount, load: style.load, step: style.step };

    function fit() {
      if (st.host) st.host.style.minHeight = "";
    }

    style.mount = function (element) {
      release();
      const r = base.mount.apply(this, arguments);
      st.root = element || null; st.host = null; st.scene = null; st.id = null; st.built = null;
      if (st.mo) st.mo.disconnect();
      if (element) {
        css();
        st.mo = new MutationObserver(() => repairKeys(element));
        st.mo.observe(element, { childList: true, subtree: true });
      }
      return r;
    };

    style.load = function (section) {
      const r = base.load.apply(this, arguments);
      try {
        css();
        const id = secIdFor(section);
        const scene = id && window.W10_SCENES[id];
        st.lines = (section && Array.isArray(section.lines)) ? section.lines : linesFor(id);
        st.n = st.lines.length || (section && section.sentences && section.sentences.length) || 0;
        st.title = (section && section.title) || "";
        const root = st.root;
        if (!root) return r;
        if (!scene) { if (st.host) { st.host.classList.remove("on"); root.removeAttribute("data-w10s"); } st.scene = null; st.id = null; return r; }
        if (!st.host || !root.contains(st.host)) {
          st.host = document.createElement("div");
          st.host.className = "w10s-host";
          root.appendChild(st.host);
        }
        if (st.built !== id) {
          if (st.undress) { st.undress(); st.undress = null; }
          st.host.replaceChildren();
          st.inner = document.createElement("div");
          st.inner.className = "w10s-inner";
          const mountEl = document.createElement("div");
          mountEl.className = "w10s-mount";
          mountEl.setAttribute("aria-hidden", "true");
          mountEl.style.cssText = "width:100%;flex:1 1 auto;min-height:0;max-height:58%;position:relative;overflow:hidden";
          st.inner.appendChild(mountEl);
          st.text = document.createElement("div");
          st.text.className = "w10s-text";
          st.text.setAttribute("aria-live", "polite");
          st.inner.appendChild(st.text);
          st.host.appendChild(st.inner);
          try { scene.build(mountEl); } catch (e) { console.warn("[w10s] build", id, e); }
          st.art = window.VL_ART?.prepare(mountEl, style.id);
          st.built = id;
        }
        st.scene = scene; st.id = id; st.lastIndex = null; active = st;
        try { scene.reset(); } catch (e) { console.warn("[w10s] reset", id, e); }
        root.setAttribute("data-w10s", "on");
        st.host.classList.add("on");
        // Each look dresses the same scene its own way (see the [data-look] rules).
        st.host.dataset.look = style.id || "";
        window.VL_LAYOUT?.scene({host:st.host,mount:st.inner.querySelector('.w10s-mount'),text:st.text,
          states:[noteNodes([{m:st.title}]),...st.lines.map((_,i)=>noteNodes(notesFor(st,i)))]});
        if (style.id === "board" && !st.undress) st.undress = window.VL_BOARD?.dressScene(st.inner.querySelector(".w10s-mount"));
        window.VL_ART?.current({mount:st.inner.querySelector('.w10s-mount'),title:st.title});
        if (!["notebook", "journey", "board", "motion"].includes(style.id)) {
          const bg = getComputedStyle(root).backgroundColor;
          if (bg && !/rgba\(0, 0, 0, 0\)|transparent/.test(bg)) st.host.style.backgroundColor = bg;
        }
      } catch (e) { console.warn("[w10s] load", e); }
      return r;
    };

    style.step = function (index) {
      // The registered scene covers the base look. Do not animate an invisible second
      // presentation underneath it, or restart the same scene on a viewport refit.
      if (!st.scene) return base.step.apply(this, arguments);
      const target = Math.max(-1, index);
      if (target === st.lastIndex) return;
      st.lastIndex = target;
      try {
        if (st.scene && index >= 0) { st.scene.step(index, st.n || 1); st.art?.refresh(); showText(st, index); }
        else if (st.scene && index < 0) { st.scene.reset(); showTitle(st); }
      } catch (e) { console.warn("[w10s] step", st.id, e); }
    };
  }

  function installAll() { (window.STYLES || []).forEach(install); }
  installAll();
  window.addEventListener("pageshow", installAll);
  window.W10_SCENES_HOST = { installAll, repairKeys, reduced, release };
})();
