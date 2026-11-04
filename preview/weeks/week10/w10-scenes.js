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

  function showText(st, index) {
    if (!st.text) return;
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
    const key = JSON.stringify(notes);
    if (key && st.text.dataset.shown === key && st.text.childElementCount) return;
    st.text.dataset.shown = key;
    st.text.replaceChildren();
    notes.forEach(t => {
      const note = document.createElement("div");
      note.className = "w10s-note";
      [["k", t.k], ["m", t.m], ["s", t.s]].forEach(([c, s]) => {
        if (!s) return;
        const p = document.createElement("p");
        p.className = c;
        p.textContent = String(s).replace(/\|/g, " ");
        note.appendChild(p);
      });
      st.text.appendChild(note);
    });
    st.text.scrollTop = 0;
  }

  // Before the first scene step (the part's opening lines): show the part title, not an empty box.
  function showTitle(st) {
    if (!st.text || !st.title || st.text.dataset.shown === "title|" + st.title) return;
    st.text.dataset.shown = "title|" + st.title;
    const p = document.createElement("p");
    p.className = "m";
    p.textContent = st.title;
    st.text.replaceChildren(p);
  }

  const hosts = new WeakMap();
  let active = null;
  function release() {
    if (!active) return;
    const st = active;
    active = null;
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
          st.host.setAttribute("aria-hidden", "true");
          root.appendChild(st.host);
        }
        if (st.built !== id) {
          if (st.undress) { st.undress(); st.undress = null; }
          st.host.replaceChildren();
          st.inner = document.createElement("div");
          st.inner.className = "w10s-inner";
          const mountEl = document.createElement("div");
          mountEl.className = "w10s-mount";
          mountEl.style.cssText = "width:100%;flex:1 1 auto;min-height:0;max-height:58%;position:relative;overflow:hidden";
          st.inner.appendChild(mountEl);
          st.text = document.createElement("div");
          st.text.className = "w10s-text";
          st.text.setAttribute("aria-live", "polite");
          st.inner.appendChild(st.text);
          st.host.appendChild(st.inner);
          try { scene.build(mountEl); } catch (e) { console.warn("[w10s] build", id, e); }
          st.built = id;
        }
        st.scene = scene; st.id = id; st.lastIndex = null; active = st;
        try { scene.reset(); } catch (e) { console.warn("[w10s] reset", id, e); }
        root.setAttribute("data-w10s", "on");
        st.host.classList.add("on");
        // Each look dresses the same scene its own way (see the [data-look] rules).
        st.host.dataset.look = style.id || "";
        if (style.id === "board" && !st.undress) st.undress = window.VL_BOARD?.dressScene(st.inner.querySelector(".w10s-mount"));
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
        if (st.scene && index >= 0) { st.scene.step(index, st.n || 1); showText(st, index); }
        else if (st.scene && index < 0) { st.scene.reset(); showTitle(st); }
      } catch (e) { console.warn("[w10s] step", st.id, e); }
    };
  }

  function installAll() { (window.STYLES || []).forEach(install); }
  installAll();
  window.addEventListener("pageshow", installAll);
  window.W10_SCENES_HOST = { installAll, repairKeys, reduced, release };
})();

;

(() => {
  "use strict";

  window.W10_SCENES = window.W10_SCENES || {};

  // PART A — Three independent cinematic scenes.
  // W10O1a: The living lobby / interrupted arrival.
  // W10O1b: The readiness engine / five interlocking mechanisms.
  // W10O1c: The accountability constellation / RACI decision ownership.
  //
  // Narration lengths: W10O1a = 24, W10O1b = 22, W10O1c = 24.
  // All SVG geometry is responsive and all animations are seek-safe.

  const NS = "http://www.w3.org/2000/svg";
  const COLORS = {
    navy: "#1f4e79",
    orange: "#c0502a",
    paper: "#fbf8f1",
    ink: "#1b2a3a",
    blue: "#dbe7f2",
    green: "#317c61"
  };

  const reduced = () =>
    !!(window.matchMedia &&
       window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const beat = (i, n, boundaries) => {
    const x = clamp(Number.isFinite(+i) ? Math.floor(+i) : 0, 0,
      Math.max(0, (Number.isFinite(+n) && +n > 0 ? Math.floor(+n) : 1) - 1));
    return boundaries.reduce((s, boundary) => s + (x >= boundary ? 1 : 0), 0);
  };

  const svg = (content, viewBox = "0 0 340 370") =>
    `<svg class="w10s-art" xmlns="${NS}" viewBox="${viewBox}"
      role="img" aria-label="Animated teaching illustration"
      preserveAspectRatio="xMidYMid meet">${content}</svg>`;

  const text = (x, y, label, size = 13, fill = COLORS.ink, extra = "") =>
    `<text x="${x}" y="${y}" text-anchor="middle"
      font-size="${size}" fill="${fill}" ${extra}>${label}</text>`;

  const person = (x, y, color = COLORS.navy, scale = 1) =>
    `<g transform="translate(${x} ${y}) scale(${scale})">
      <circle cy="-15" r="10" fill="${color}"/>
      <path d="M-17 16 Q-17 -2 0 -2 Q17 -2 17 16"
        fill="${color}"/>
      <path d="M-7 -15 Q0 -10 7 -15" fill="none"
        stroke="${COLORS.paper}" stroke-width="1.5" opacity=".65"/>
    </g>`;

  const check = (x, y, color = COLORS.green) =>
    `<path d="M${x - 7} ${y} l5 5 11 -13" fill="none"
      stroke="${color}" stroke-width="3.5"
      stroke-linecap="round" stroke-linejoin="round"/>`;

  const root = (el, id, content) => {
    if (!el || typeof el.replaceChildren !== "function") return null;
    const div = document.createElement("div");
    div.className = `w10s w10s-${id}`;
    div.innerHTML = content;
    el.replaceChildren(div);
    return div;
  };

  const set = (r, selector, name, value) => {
    const e = r && r.querySelector(selector);
    if (e) e.style[name] = value;
  };

  const attr = (r, selector, name, value) => {
    const e = r && r.querySelector(selector);
    if (e) e.setAttribute(name, String(value));
  };

  const show = (r, selector, visible) =>
    set(r, selector, "opacity", visible ? "1" : "0");

  const move = (r, selector, x = 0, y = 0, scale = 1) =>
    set(r, selector, "transform",
      `translate(${x}px, ${y}px) scale(${scale})`);

  const applyBeat = (scene, index, count, boundaries, render) => {
    if (!scene.root) return;
    const b = beat(index, count, boundaries);
    scene.root.classList.toggle("w10s-still", reduced());
    render(scene.root, b, clamp(+index || 0, 0, Math.max(0, count - 1)));
    scene.current = b;
  };

  const resetScene = (scene, render) => {
    if (!scene.root) return;
    scene.root.classList.add("w10s-still");
    render(scene.root, 0, 0);
    scene.current = 0;
    // A future narration step restores motion.
  };

  // ================================================================
  // SHARED CSS — Inject exactly once.
  // ================================================================

  if (!document.getElementById("w10s-css-A")) {
    const style = document.createElement("style");
    style.id = "w10s-css-A";
    style.textContent = `
      .w10s {
        --navy:#1f4e79;
        --orange:#c0502a;
        --paper:#fbf8f1;
        --ink:#1b2a3a;
        --blue:#dbe7f2;
        --green:#317c61;
        position:relative;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        width:100%;
        height:100%;
        min-height:0;
        overflow:hidden;
        background:transparent;
        color:var(--ink);
        font-family:inherit;
        isolation:isolate;
        box-sizing:border-box;
      }
      .w10s *, .w10s *::before, .w10s *::after {
        box-sizing:border-box;
      }
      .w10s .w10s-art {
        display:block;
        width:100%;
        height:auto;
        max-height:100%;
        flex:0 1 auto;
        overflow:visible;
        font-family:inherit;
      }
      .w10s svg text {
        font-family:inherit;
        font-weight:650;
        letter-spacing:.05px;
      }
      .w10s .w10s-topline {
        position:absolute;
        top:2%;
        left:0;
        right:0;
        text-align:center;
        font-size:12px;
        font-weight:750;
        letter-spacing:1.4px;
        color:var(--navy);
        opacity:.75;
        pointer-events:none;
      }
      .w10s .w10s-bottom {
        position:absolute;
        bottom:1%;
        left:4%;
        right:4%;
        display:flex;
        align-items:center;
        justify-content:center;
        min-height:24px;
        font-size:12px;
        font-weight:750;
        letter-spacing:.45px;
        color:var(--navy);
        text-align:center;
        pointer-events:none;
      }
      .w10s .w10s-progress {
        position:absolute;
        bottom:0;
        left:0;
        height:3px;
        background:var(--orange);
        width:0;
        transition:width .85s cubic-bezier(.2,.7,.2,1);
      }
      .w10s svg .w10s-anim {
        transition:transform .9s cubic-bezier(.2,.7,.2,1),
          opacity .75s ease, fill .8s ease, stroke .8s ease;
        transform-box:fill-box;
        transform-origin:center;
      }
      .w10s.w10s-still svg .w10s-anim,
      .w10s.w10s-still .w10s-progress {
        transition:none!important;
        animation:none!important;
      }
      @media (prefers-reduced-motion:reduce) {
        .w10s *, .w10s *::before, .w10s *::after {
          transition:none!important;
          animation:none!important;
        }
      }

      /* A — theatrical tracking shot, moving actor and spotlight */
      .w10s-W10O1a .a-stage {
        transform-origin:170px 180px;
        transition:transform 1.05s cubic-bezier(.22,.72,.19,1);
      }
      .w10s-W10O1a .a-beam {
        transition:opacity .8s ease, transform 1s ease;
        transform-origin:170px 100px;
      }
      .w10s-W10O1a .a-guest {
        transition:transform 1.1s cubic-bezier(.2,.8,.2,1);
      }
      .w10s-W10O1a .a-pulse {
        transform-origin:center;
        animation:w10sAAlert 1.6s ease-in-out infinite;
      }
      .w10s-W10O1a .a-path {
        stroke-dasharray:260;
        stroke-dashoffset:260;
        transition:stroke-dashoffset 1.1s ease;
      }
      .w10s-W10O1a .a-glow {
        filter:drop-shadow(0 0 8px rgba(192,80,42,.35));
      }
      @keyframes w10sAAlert {
        0%,100% {opacity:.35;transform:scale(.9)}
        50% {opacity:1;transform:scale(1.08)}
      }
      .w10s-W10O1a.w10s-still .a-stage,
      .w10s-W10O1a.w10s-still .a-beam,
      .w10s-W10O1a.w10s-still .a-guest,
      .w10s-W10O1a.w10s-still .a-path {
        transition:none!important;
      }
      .w10s-W10O1a.w10s-still .a-pulse {
        animation:none!important;
      }

      /* B — kinetic machinery, sequential gear engagement */
      .w10s-W10O1b .b-ring {
        transform-origin:170px 178px;
        transition:transform 1.1s cubic-bezier(.2,.7,.2,1),
          opacity .8s ease;
      }
      .w10s-W10O1b .b-gear {
        transition:transform 1s cubic-bezier(.2,.7,.2,1),
          opacity .7s ease;
        transform-box:fill-box;
        transform-origin:center;
      }
      .w10s-W10O1b .b-link {
        stroke-dasharray:120;
        stroke-dashoffset:120;
        transition:stroke-dashoffset .9s ease,opacity .7s ease;
      }
      .w10s-W10O1b .b-core {
        transition:fill .8s ease,transform 1s ease;
        transform-origin:170px 178px;
      }
      .w10s-W10O1b .b-scan {
        transition:transform 1.05s ease,opacity .65s ease;
      }
      .w10s-W10O1b.w10s-still .b-ring,
      .w10s-W10O1b.w10s-still .b-gear,
      .w10s-W10O1b.w10s-still .b-link,
      .w10s-W10O1b.w10s-still .b-core,
      .w10s-W10O1b.w10s-still .b-scan {
        transition:none!important;
      }

      /* C — orbital constellation, signals and ownership gravity */
      .w10s-W10O1c .c-orbit {
        transform-origin:170px 177px;
        transition:transform 1.05s cubic-bezier(.2,.7,.2,1);
      }
      .w10s-W10O1c .c-node {
        transition:opacity .7s ease,transform .9s ease;
        transform-box:fill-box;
        transform-origin:center;
      }
      .w10s-W10O1c .c-wire {
        stroke-dasharray:180;
        stroke-dashoffset:180;
        transition:stroke-dashoffset .95s ease,stroke .8s ease;
      }
      .w10s-W10O1c .c-token {
        transition:transform 1.05s cubic-bezier(.2,.75,.2,1),
          opacity .6s ease;
      }
      .w10s-W10O1c .c-halo {
        transition:opacity .7s ease,transform .9s ease;
        transform-origin:170px 177px;
      }
      .w10s-W10O1c.w10s-still .c-orbit,
      .w10s-W10O1c.w10s-still .c-node,
      .w10s-W10O1c.w10s-still .c-wire,
      .w10s-W10O1c.w10s-still .c-token,
      .w10s-W10O1c.w10s-still .c-halo {
        transition:none!important;
      }
    `;
    document.head.appendChild(style);
  }

  // ================================================================
  // SCENE 1 — W10O1a
  // THE LIVING LOBBY
  //
  // Visual metaphor:
  // A theatrical hotel lobby becomes a moving stage.
  // The automated route is interrupted by a human decision.
  //
  // Animation language:
  // Camera tracking, spotlight, character blocking, iris-like focus,
  // transformation of the guest journey and framework reveal.
  //
  // Narration beats:
  // 0–1 arrival; 2–3 interruption; 4–6 human intervention;
  // 7–9 redesigned work; 10–12 authority contradiction;
  // 13–15 people system; 16–18 People/Develop;
  // 19–23 dependable resolution.
  // ================================================================

  {
    const scene = {root:null,current:0};

    const content = `
      <div class="w10s-topline">THE DESIGN IS NOT THE WORK</div>
      ${svg(`
        <defs>
          <linearGradient id="w10a-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#dbe7f2" stop-opacity=".6"/>
            <stop offset="1" stop-color="#fbf8f1" stop-opacity=".05"/>
          </linearGradient>
          <radialGradient id="w10a-light">
            <stop offset="0" stop-color="#e9bd7c" stop-opacity=".42"/>
            <stop offset="1" stop-color="#e9bd7c" stop-opacity="0"/>
          </radialGradient>
        </defs>

        <g class="a-stage">
          <path d="M15 275 L170 215 L325 275 L325 315 L15 315Z"
            fill="url(#w10a-floor)"/>
          <path d="M15 275 L170 215 L325 275" fill="none"
            stroke="#a8bfd1" stroke-width="1.5"/>
          <path d="M170 215 V315 M92 245 L62 315 M248 245 L278 315"
            stroke="#c8d8e5" stroke-width="1" fill="none"/>

          <g opacity=".45">
            <path d="M26 205 V77 H83 V205 M257 205 V77 H314 V205"
              stroke="#1f4e79" stroke-width="5" fill="none"/>
            <path d="M26 104 H83 M257 104 H314"
              stroke="#1f4e79" stroke-width="2"/>
            <path d="M37 90 H72 M268 90 H303"
              stroke="#c0502a" stroke-width="3"/>
          </g>

          <g class="w10s-anim a-kiosk">
            <ellipse cx="170" cy="258" rx="43" ry="11"
              fill="#1f4e79" opacity=".1"/>
            <rect x="140" y="92" width="60" height="119" rx="12"
              fill="#1f4e79"/>
            <rect x="146" y="101" width="48" height="69" rx="6"
              fill="#dbe7f2"/>
            <rect x="151" y="109" width="38" height="8" rx="4"
              fill="#317c61"/>
            <path d="M153 132 H187 M153 142 H181"
              stroke="#1f4e79" stroke-width="3" opacity=".45"/>
            <circle cx="170" cy="158" r="4" fill="#317c61"/>
            <path d="M170 211 V248 M150 248 H190"
              stroke="#1f4e79" stroke-width="7"
              stroke-linecap="round"/>
          </g>

          <g class="a-guest">
            ${person(62,235,COLORS.navy,1.15)}
            <rect x="79" y="233" width="17" height="23" rx="3"
              fill="#c0502a"/>
            <path d="M83 233 V229 Q87 223 92 229 V233"
              stroke="#c0502a" stroke-width="2" fill="none"/>
          </g>

          <g class="w10s-anim a-host" opacity="0">
            ${person(267,231,COLORS.green,1.15)}
            <path d="M253 223 L239 212 L223 215"
              stroke="#317c61" stroke-width="5" fill="none"
              stroke-linecap="round"/>
          </g>

          <g class="w10s-anim a-error" opacity="0">
            <rect x="149" y="124" width="42" height="38" rx="5"
              fill="#c0502a"/>
            <path d="M170 131 V146 M170 153 V155"
              stroke="#fbf8f1" stroke-width="4"
              stroke-linecap="round"/>
            <circle class="a-pulse" cx="170" cy="143" r="28"
              fill="none" stroke="#c0502a" stroke-width="2"/>
          </g>

          <path class="a-path" d="M64 275 Q113 286 150 260
            Q190 234 240 259" stroke="#317c61"
            stroke-width="4" fill="none" stroke-linecap="round"/>

          <g class="w10s-anim a-approval" opacity="0">
            <circle cx="170" cy="143" r="19" fill="#317c61"/>
            ${check(170,146,COLORS.paper)}
          </g>
        </g>

        <g class="a-beam">
          <ellipse cx="170" cy="173" rx="145" ry="137"
            fill="url(#w10a-light)"/>
        </g>

        <g class="w10s-anim a-decision" opacity="0">
          <path d="M170 48 L208 70 V108 Q208 141 170 161
            Q132 141 132 108 V70Z"
            fill="#fbf8f1" stroke="#c0502a" stroke-width="3"/>
          <path d="M152 106 L164 118 L188 91"
            stroke="#c0502a" stroke-width="5"
            fill="none" stroke-linecap="round"/>
          ${text(170,82,"AUTHORITY",12,COLORS.navy)}
        </g>

        <g class="w10s-anim a-people" opacity="0">
          <circle cx="170" cy="183" r="102" fill="none"
            stroke="#1f4e79" stroke-width="2"
            stroke-dasharray="5 7" opacity=".55"/>
          ${person(89,150,COLORS.navy,.75)}
          ${person(251,150,COLORS.green,.75)}
          ${person(170,273,COLORS.orange,.75)}
          <path d="M107 163 Q170 107 233 163
            M109 174 Q170 250 231 174"
            stroke="#317c61" stroke-width="2"
            fill="none" stroke-dasharray="4 5"/>
        </g>

        <g class="w10s-anim a-framework" opacity="0">
          <path d="M45 325 H295" stroke="#1f4e79"
            stroke-width="4" stroke-linecap="round" opacity=".2"/>
          <circle cx="90" cy="325" r="11" fill="#dbe7f2"/>
          <circle cx="170" cy="325" r="16" fill="#c0502a"/>
          <circle cx="250" cy="325" r="11" fill="#317c61"/>
          ${text(90,349,"INNOVATE",12,COLORS.navy)}
          ${text(170,349,"PEOPLE",12,COLORS.orange)}
          ${text(250,349,"DEVELOP",12,COLORS.green)}
        </g>

        <g class="w10s-anim a-caption">
          ${text(170,36,"A NEW ARRIVAL",15,COLORS.navy)}
        </g>
      `)}
      <div class="w10s-bottom">
        <span class="a-status">The guest arrives</span>
      </div>
      <div class="w10s-progress"></div>`;

    const labels = [
      "The guest arrives",
      "The arrival stops",
      "A person must decide",
      "The job has changed",
      "Authority is unclear",
      "Redesign the people system",
      "People connects to Develop",
      "Make the journey dependable"
    ];

    function render(r,b) {
      const camera = [
        "translate(0px,0px) scale(1)",
        "translate(-10px,13px) scale(1.12)",
        "translate(-14px,5px) scale(1.08)",
        "translate(0px,0px) scale(.96)",
        "translate(0px,12px) scale(1.08)",
        "translate(0px,0px) scale(.91)",
        "translate(0px,-8px) scale(.89)",
        "translate(0px,0px) scale(1)"
      ];
      set(r,".a-stage","transform",camera[b]);
      move(r,".a-guest",b===0?0:b<3?72:b<5?91:62,0);
      show(r,".a-error",b>=1&&b<=4);
      show(r,".a-host",b>=2);
      show(r,".a-decision",b>=4&&b<=5);
      show(r,".a-people",b===5);
      show(r,".a-framework",b>=6);
      show(r,".a-approval",b===7);
      set(r,".a-path","strokeDashoffset",b===7?"0":"260");
      set(r,".a-beam","opacity",b===1||b===4?"1":".3");
      set(r,".a-kiosk","opacity",b===5?".35":"1");
      set(r,".a-caption","opacity",b>=5?"0":"1");
      const caption=r.querySelector(".a-status");
      if(caption) caption.textContent=labels[b];
      set(r,".w10s-progress","width",`${(b+1)/8*100}%`);
    }

    window.W10_SCENES["W10O1a"] = {
      build(el) {
        scene.root=root(el,"W10O1a",content);
        resetScene(scene,render);
      },
      step(i,n) {
        applyBeat(scene,i,n,[1,2,6,10,13,16,21],render);
      },
      reset() {resetScene(scene,render);}
    };
  }

  // ================================================================
  // SCENE 2 — W10O1b
  // THE READINESS ENGINE
  //
  // Visual metaphor:
  // Five mechanical components must engage to power one operating
  // system. Installation is not proof that the machine works.
  //
  // Animation language:
  // Radial mechanical assembly, gear rotation, magnetic engagement,
  // energy transmission and diagnostic scanning.
  //
  // Narration beats:
  // 0–2 empty mechanism; 3–6 role;
  // 7–9 authority; 10–13 measures;
  // 14–16 capability; 17–19 adoption;
  // 20–21 integrated evidence gate.
  // ================================================================

  {
    const scene={root:null,current:0};

    const components=[
      {x:170,y:57,label:"ROLE",color:COLORS.navy},
      {x:285,y:140,label:"AUTHORITY",color:COLORS.orange},
      {x:241,y:281,label:"MEASURES",color:COLORS.navy},
      {x:99,y:281,label:"CAPABILITY",color:COLORS.green},
      {x:55,y:140,label:"ADOPTION",color:COLORS.green}
    ];

    const gearShape=(x,y,color,index)=>{
      const teeth=Array.from({length:10},(_,k)=>{
        const a=k*Math.PI/5;
        const xx=x+28*Math.cos(a), yy=y+28*Math.sin(a);
        return `<rect x="${xx-5}" y="${yy-5}" width="10"
          height="10" rx="2" fill="${color}"
          transform="rotate(${k*36} ${xx} ${yy})"/>`;
      }).join("");
      return `<g class="b-gear b-gear-${index}">
        ${teeth}
        <circle cx="${x}" cy="${y}" r="24" fill="${color}"/>
        <circle cx="${x}" cy="${y}" r="15" fill="#fbf8f1"/>
        <circle cx="${x}" cy="${y}" r="7" fill="${color}"/>
      </g>`;
    };

    const content=`
      <div class="w10s-topline">FIVE CONDITIONS FOR READINESS</div>
      ${svg(`
        <defs>
          <radialGradient id="w10b-core">
            <stop offset="0" stop-color="#dbe7f2"/>
            <stop offset="1" stop-color="#fbf8f1"/>
          </radialGradient>
        </defs>

        <circle cx="170" cy="178" r="128" fill="none"
          stroke="#dbe7f2" stroke-width="1.5"
          stroke-dasharray="3 7"/>
        <circle class="b-ring" cx="170" cy="178" r="94"
          fill="none" stroke="#1f4e79"
          stroke-width="9" stroke-opacity=".13"
          stroke-dasharray="14 9"/>
        <circle cx="170" cy="178" r="70" fill="url(#w10b-core)"
          stroke="#dbe7f2" stroke-width="2"/>

        ${components.map((p,j)=>`
          <path class="b-link b-link-${j}"
            d="M${170+(p.x-170)*.37} ${178+(p.y-178)*.37}
               L${p.x} ${p.y}"
            fill="none" stroke="${p.color}"
            stroke-width="4" stroke-linecap="round"/>
        `).join("")}

        ${components.map((p,j)=>`
          <g class="w10s-anim b-unit-${j}">
            ${gearShape(p.x,p.y,p.color,j)}
            ${text(p.x,p.y+(j===0?-42:44),p.label,12,p.color)}
          </g>
        `).join("")}

        <g class="b-core">
          <circle cx="170" cy="178" r="48"
            fill="#fbf8f1" stroke="#1f4e79" stroke-width="3"/>
          <circle cx="170" cy="178" r="34"
            fill="none" stroke="#dbe7f2" stroke-width="7"/>
          <path d="M151 178 L164 191 L191 162"
            fill="none" stroke="#317c61" stroke-width="6"
            stroke-linecap="round" stroke-linejoin="round"
            class="w10s-anim b-check" opacity="0"/>
          ${text(170,174,"READY?",14,COLORS.navy,
            'class="b-question"')}
          ${text(170,191,"EVIDENCE",12,COLORS.navy,
            'class="b-evidence"')}
        </g>

        <g class="b-scan" opacity="0">
          <rect x="35" y="40" width="270" height="275"
            rx="18" fill="none" stroke="#317c61"
            stroke-width="2" stroke-dasharray="7 6"/>
          <path d="M43 178 H297" stroke="#317c61"
            stroke-width="3" opacity=".5"/>
        </g>

        <g class="w10s-anim b-proof" opacity="0">
          <circle cx="170" cy="178" r="61" fill="none"
            stroke="#317c61" stroke-width="3"
            stroke-dasharray="8 5"/>
        </g>

        ${text(170,352,"ONE CONNECTED OPERATING SYSTEM",
          12,COLORS.navy)}
      `)}
      <div class="w10s-bottom">
        <span class="b-status">A title is not readiness</span>
      </div>
      <div class="w10s-progress"></div>`;

    const labels=[
      "Installation is not readiness",
      "Define the real role",
      "Document decision authority",
      "Align measures and incentives",
      "Demonstrate practical capability",
      "Track actual adoption",
      "Demand operating evidence"
    ];

    function render(r,b) {
      const engaged=Math.min(5,b);
      for(let j=0;j<5;j++){
        const active=j<engaged;
        const node=r.querySelector(`.b-unit-${j}`);
        const gear=r.querySelector(`.b-gear-${j}`);
        if(node){
          node.style.opacity=active?"1":".22";
          node.style.transform=active
            ?"translate(0px,0px) scale(1)"
            :`translate(${(170-components[j].x)*.12}px,
              ${(178-components[j].y)*.12}px) scale(.72)`;
        }
        if(gear) gear.style.transform=
          `rotate(${active?(j%2?-32:32):0}deg)`;
        set(r,`.b-link-${j}`,"strokeDashoffset",active?"0":"120");
      }
      set(r,".b-ring","transform",
        `rotate(${b>=5?48:b*8}deg)`);
      set(r,".b-ring","opacity",b===0?".25":"1");
      show(r,".b-check",b===6);
      show(r,".b-question",b<6);
      show(r,".b-evidence",b<6);
      show(r,".b-proof",b===6);
      show(r,".b-scan",b===6);
      set(r,".b-scan","transform",
        `translateY(${b===6?0:-35}px)`);
      set(r,".b-core","fill",b===6?"#e5f2e9":"#fbf8f1");
      const label=r.querySelector(".b-status");
      if(label) label.textContent=labels[b];
      set(r,".w10s-progress","width",`${(b+1)/7*100}%`);
    }

    window.W10_SCENES["W10O1b"]={
      build(el){
        scene.root=root(el,"W10O1b",content);
        resetScene(scene,render);
      },
      step(i,n){
        applyBeat(scene,i,n,[3,7,10,14,17,20],render);
      },
      reset(){resetScene(scene,render);}
    };
  }

  // ================================================================
  // SCENE 3 — W10O1c
  // THE ACCOUNTABILITY CONSTELLATION
  //
  // Visual metaphor:
  // A disputed decision sits at the centre of an organisational
  // constellation. Contributions orbit it, but accountability
  // must settle on exactly one owner.
  //
  // Animation language:
  // Orbital movement, signal transmission, gravitational focus,
  // competing ownership, and final alignment with delegation.
  //
  // Narration beats:
  // 0–2 disputed case; 3–5 Responsible;
  // 6–7 Accountable; 8–9 competing owners;
  // 10–11 Consulted; 12–14 Informed;
  // 15–18 missing owner; 19–21 delegation;
  // 22–23 resolved ownership.
  // ================================================================

  {
    const scene={root:null,current:0};

    const nodes=[
      {x:75,y:115,l:"R",name:"DOES",color:COLORS.navy},
      {x:265,y:115,l:"A",name:"OWNS",color:COLORS.orange},
      {x:75,y:265,l:"C",name:"ADVISES",color:COLORS.green},
      {x:265,y:265,l:"I",name:"KNOWS",color:COLORS.navy}
    ];

    const content=`
      <div class="w10s-topline">WHO DOES THE WORK?</div>
      ${svg(`
        <defs>
          <radialGradient id="w10c-field">
            <stop offset="0" stop-color="#dbe7f2"
              stop-opacity=".8"/>
            <stop offset="1" stop-color="#dbe7f2"
              stop-opacity="0"/>
          </radialGradient>
        </defs>

        <circle cx="170" cy="177" r="137"
          fill="url(#w10c-field)"/>
        <g class="c-orbit">
          <ellipse cx="170" cy="177" rx="137" ry="105"
            fill="none" stroke="#1f4e79"
            stroke-width="1.5" stroke-opacity=".18"
            stroke-dasharray="4 7"/>
          <ellipse cx="170" cy="177" rx="103" ry="134"
            fill="none" stroke="#317c61"
            stroke-width="1" stroke-opacity=".2"/>
        </g>

        ${nodes.map((p,j)=>`
          <path class="c-wire c-wire-${j}"
            d="M170 177 L${p.x} ${p.y}"
            stroke="${p.color}" stroke-width="2.5"
            fill="none"/>
        `).join("")}

        <g class="c-halo" opacity="0">
          <circle cx="170" cy="177" r="59" fill="none"
            stroke="#c0502a" stroke-width="3"
            stroke-dasharray="6 5"/>
        </g>

        <g class="c-token">
          <circle cx="170" cy="177" r="40"
            fill="#fbf8f1" stroke="#1f4e79"
            stroke-width="3"/>
          <path d="M155 165 H185 M155 176 H177 M155 187 H182"
            stroke="#1f4e79" stroke-width="3"
            stroke-linecap="round"/>
          <circle cx="186" cy="190" r="10" fill="#c0502a"/>
          ${text(186,194,"?",13,COLORS.paper)}
        </g>

        ${nodes.map((p,j)=>`
          <g class="c-node c-node-${j}">
            <circle cx="${p.x}" cy="${p.y}" r="29"
              fill="#fbf8f1" stroke="${p.color}"
              stroke-width="3"/>
            <circle cx="${p.x}" cy="${p.y}" r="22"
              fill="${p.color}" opacity=".12"/>
            ${text(p.x,p.y+8,p.l,25,p.color)}
            ${text(p.x,p.y+(j<2?-39:45),p.name,12,p.color)}
          </g>
        `).join("")}

        <g class="w10s-anim c-double" opacity="0">
          <circle cx="234" cy="177" r="19"
            fill="#c0502a" opacity=".75"/>
          <circle cx="276" cy="177" r="19"
            fill="#c0502a" opacity=".75"/>
          ${text(234,183,"A",18,COLORS.paper)}
          ${text(276,183,"A",18,COLORS.paper)}
          <path d="M251 157 L259 197 M259 157 L251 197"
            stroke="#1b2a3a" stroke-width="3"/>
        </g>

        <g class="w10s-anim c-owner" opacity="0">
          <circle cx="170" cy="177" r="54"
            fill="#fbf8f1" stroke="#317c61"
            stroke-width="4"/>
          <circle cx="170" cy="177" r="37"
            fill="#317c61" opacity=".12"/>
          ${check(170,177,COLORS.green)}
          ${text(170,218,"ONE OWNER",12,COLORS.green)}
        </g>

        <g class="w10s-anim c-delegation" opacity="0">
          <path d="M117 316 H223" stroke="#1f4e79"
            stroke-width="3" stroke-linecap="round"/>
          <rect x="132" y="298" width="76" height="36"
            rx="18" fill="#dbe7f2"
            stroke="#317c61" stroke-width="2"/>
          ${text(170,321,"AUTHORITY",12,COLORS.green)}
        </g>

        <g class="w10s-anim c-missing" opacity="0">
          <circle cx="265" cy="115" r="34"
            fill="none" stroke="#c0502a"
            stroke-width="3" stroke-dasharray="4 5"/>
          <path d="M253 103 L277 127 M277 103 L253 127"
            stroke="#c0502a" stroke-width="3"/>
        </g>

        ${text(170,352,"ONE DECISION · DISTINCT CONTRIBUTIONS",
          12,COLORS.navy)}
      `)}
      <div class="w10s-bottom">
        <span class="c-status">A disputed rate needs an answer</span>
      </div>
      <div class="w10s-progress"></div>`;

    const labels=[
      "One guest, several functions",
      "Responsible: performs the work",
      "Accountable: answers for it",
      "Two owners create conflict",
      "Consulted: provides expertise",
      "Informed: receives updates",
      "An owner cannot be missing",
      "RACI is not formal delegation",
      "Clear ownership, clear authority"
    ];

    function render(r,b) {
      const active=[
        [],
        [0],
        [0,1],
        [0,1],
        [0,1,2],
        [0,1,2,3],
        [0,2,3],
        [0,1,2,3],
        [0,1,2,3]
      ][b];

      for(let j=0;j<4;j++){
        const on=active.includes(j);
        const e=r.querySelector(`.c-node-${j}`);
        if(e){
          e.style.opacity=on?"1":".28";
          e.style.transform=on
            ?"scale(1)"
            :"scale(.78)";
        }
        set(r,`.c-wire-${j}`,"strokeDashoffset",
          on?"0":"180");
      }

      set(r,".c-orbit","transform",
        `rotate(${b===0?0:b<6?b*8:0}deg)`);
      show(r,".c-halo",b===2||b===3||b>=6);
      show(r,".c-double",b===3);
      show(r,".c-missing",b===6);
      show(r,".c-delegation",b>=7);
      show(r,".c-owner",b===8);
      set(r,".c-token","opacity",b===8?"0":"1");

      const token=r.querySelector(".c-token");
      if(token){
        const positions=[
          [0,0],[ -35,-17],[24,-19],[0,0],
          [-27,26],[25,26],[0,0],[0,-12],[0,0]
        ];
        const p=positions[b];
        token.style.transform=`translate(${p[0]}px,${p[1]}px)`;
      }

      const caption=r.querySelector(".c-status");
      if(caption) caption.textContent=labels[b];
      set(r,".w10s-progress","width",`${(b+1)/9*100}%`);
    }

    window.W10_SCENES["W10O1c"]={
      build(el){
        scene.root=root(el,"W10O1c",content);
        resetScene(scene,render);
      },
      step(i,n){
        applyBeat(scene,i,n,[3,6,8,10,12,15,19,22],render);
      },
      reset(){resetScene(scene,render);}
    };
  }

})();

;

(() => {
  "use strict";
  window.W10_SCENES = window.W10_SCENES || {};

  const PART = "B";
  const NS = "http://www.w3.org/2000/svg";
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const beat = (i, cuts) => cuts.reduce((b, c) => b + (i >= c ? 1 : 0), 0);
  const $ = (root, selector) => root.querySelector(selector);
  const $$ = (root, selector) => [...root.querySelectorAll(selector)];
  const svg = (markup) => `<svg viewBox="0 0 340 390" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Animated teaching illustration">${markup}</svg>`;
  const txt = (x, y, text, size = 13, fill = "#1b2a3a", anchor = "middle", extra = "") =>
    `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" fill="${fill}" ${extra}>${text}</text>`;
  const rect = (x, y, w, h, fill, rx = 8, extra = "") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`;
  const circle = (x, y, r, fill, extra = "") =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
  const path = (d, stroke, width = 3, extra = "") =>
    `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
  const set = (root, selector, props) => {
    $$(root, selector).forEach(el => Object.entries(props).forEach(([k, v]) => {
      if (k === "text") el.textContent = v;
      else if (k === "attr") Object.entries(v).forEach(([a, b]) => el.setAttribute(a, b));
      else el.style[k] = v;
    }));
  };
  const show = (root, selector, yes, extra = {}) =>
    set(root, selector, { opacity: yes ? "1" : "0", ...extra });
  const move = (root, selector, x = 0, y = 0, scale = 1) =>
    set(root, selector, { transform: `translate(${x}px,${y}px) scale(${scale})` });
  const initialize = (el, id, markup) => {
    el.replaceChildren();
    const root = document.createElement("div");
    root.className = `w10s w10s-${id}`;
    root.innerHTML = markup;
    el.appendChild(root);
    return root;
  };
  const transition = (root, enabled) => {
    root.classList.toggle("w10s-instant", !enabled || reduced());
  };

  if (!document.getElementById("w10s-css-B")) {
    const style = document.createElement("style");
    style.id = "w10s-css-B";
    style.textContent = `
      .w10s{--navy:#1f4e79;--orange:#c0502a;--paper:#fbf8f1;--ink:#1b2a3a;
        --blue:#dbe7f2;--green:#317c61;position:relative;width:100%;height:100%;
        min-height:0;overflow:hidden;background:transparent;color:var(--ink);
        font-family:inherit;isolation:isolate}
      .w10s *{box-sizing:border-box}
      .w10s svg{display:block;width:100%;height:100%;max-height:100%;overflow:visible;
        font-family:inherit}
      .w10s svg text{font-family:inherit;font-weight:650;paint-order:stroke;
        stroke:none}
      .w10s .w10s-art{position:absolute;inset:0;display:flex;align-items:center;
        justify-content:center}
      .w10s .w10s-art>svg{max-width:400px}
      .w10s .w10s-animated{transition:opacity .75s ease,transform .9s cubic-bezier(.2,.75,.2,1),
        stroke-dashoffset .9s ease,fill .75s ease,stroke .75s ease}
      .w10s .w10s-instant,.w10s.w10s-instant .w10s-animated{transition:none!important;
        animation:none!important}
      .w10s .w10s-caption{position:absolute;left:5%;right:5%;bottom:2%;
        text-align:center;font-size:12px;letter-spacing:.025em;font-weight:700;
        color:var(--navy);pointer-events:none}
      .w10s .w10s-caption span{display:inline-block;min-width:120px;
        border-top:1px solid rgba(31,78,121,.22);padding-top:7px}
      .w10s-W10O2a .w10s-needle{transform-origin:170px 183px}
      .w10s-W10O2a .w10s-gate{transform-origin:170px 231px}
      .w10s-W10O2a .w10s-stamp{transform-origin:170px 285px}
      .w10s-W10O2a .w10s-coin{transform-origin:center}
      .w10s-W10O2a .w10s-beam{transform-origin:170px 183px}
      .w10s-W10O2a .w10s-pulse{animation:w10s-B-pulse 2.4s ease-in-out infinite}
      .w10s-W10O2b .w10s-scale{transform-origin:170px 155px}
      .w10s-W10O2b .w10s-leftpan,.w10s-W10O2b .w10s-rightpan{
        transform-origin:170px 155px}
      .w10s-W10O2b .w10s-spark{transform-origin:center}
      .w10s-W10O2b .w10s-guard{transform-origin:170px 260px}
      .w10s-W10O2c .w10s-sheet{transform-origin:170px 175px}
      .w10s-W10O2c .w10s-tool{transform-origin:center}
      .w10s-W10O2c .w10s-seal{transform-origin:170px 175px}
      .w10s-W10O2c .w10s-thread{stroke-dasharray:300;stroke-dashoffset:300}
      .w10s-W10O2c .w10s-fibre{transform-origin:center}
      @keyframes w10s-B-pulse{0%,100%{opacity:.45}50%{opacity:1}}
      @media(prefers-reduced-motion:reduce){
        .w10s .w10s-animated{transition:none!important;animation:none!important}
        .w10s .w10s-pulse{animation:none!important}
      }
      @media(max-width:380px){
        .w10s .w10s-caption{font-size:12px}
      }
    `;
    document.head.appendChild(style);
  }

  // ================================================================
  // W10O2a — THE AED 400 DECISION
  // Metaphor: a mechanical customs lock with a calibrated threshold.
  // Motion: rotating dial, sliding gates, descending approval seal.
  // Narration beats: 0 / 2 / 4 / 9 / 13 / 16 / 17 / 22.
  // ================================================================
  {
    let root = null;
    let current = -1;
    const cuts = [2, 4, 9, 13, 16, 17, 22];
    const captions = [
      "THE DECISION", "CHECK ELIGIBILITY", "AUTHORITY MISSING",
      "FORMAL AUTHORITY", "LIMIT EXCEEDED", "NOT ELIGIBLE",
      "THREE CONDITIONS", "REPAIR THE RULE"
    ];

    const markup = `
      <div class="w10s-art">${svg(`
        <defs>
          <linearGradient id="w10b-a-metal" x1="0" y1="0" x2="1" y2="1">
            <stop stop-color="#dbe7f2"/><stop offset=".5" stop-color="#fff"/>
            <stop offset="1" stop-color="#a8c0d5"/>
          </linearGradient>
          <filter id="w10b-a-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#1f4e79" flood-opacity=".16"/>
          </filter>
        </defs>
        ${txt(170,32,"DECISION CHAMBER",13,"#1f4e79")}
        ${path("M45 47 H295","#dbe7f2",2)}
        <g class="w10s-machine">
          ${rect(51,72,238,239,"url(#w10b-a-metal)",23,
            'stroke="#9cb6cb" stroke-width="2" filter="url(#w10b-a-shadow)"')}
          ${rect(68,90,204,203,"#fbf8f1",17)}
          ${circle(170,182,85,"#dbe7f2")}
          ${circle(170,182,69,"#fbf8f1",'stroke="#1f4e79" stroke-width="5"')}
          ${path("M170 104 V115 M170 249 V260 M92 182 H103 M237 182 H248",
            "#1f4e79",3)}
          <g class="w10s-beam w10s-animated">
            ${path("M112 182 H228","#1f4e79",5)}
            ${circle(112,182,6,"#1f4e79")}
            ${circle(228,182,6,"#1f4e79")}
          </g>
          <g class="w10s-needle w10s-animated">
            ${path("M170 182 L170 123","#c0502a",7)}
            ${path("M170 120 L161 135 L179 135 Z","#c0502a",1)}
          </g>
          ${circle(170,182,13,"#1f4e79")}
          ${circle(170,182,5,"#fbf8f1")}
          <g class="w10s-amount w10s-animated">
            ${rect(121,195,98,36,"#1f4e79",9)}
            ${txt(170,219,"AED 320",17,"#fff")}
          </g>
          <g class="w10s-limit w10s-animated">
            ${txt(170,150,"LIMIT 400",12,"#1f4e79")}
          </g>
          <g class="w10s-gate w10s-animated">
            ${rect(77,272,93,18,"#c0502a",5)}
            ${rect(170,272,93,18,"#c0502a",5)}
            ${path("M170 273 V290","#fbf8f1",2)}
          </g>
        </g>
        <g class="w10s-coin w10s-animated">
          ${circle(170,343,22,"#f4d7a5",'stroke="#c0502a" stroke-width="2"')}
          ${txt(170,348,"AED",12,"#1b2a3a")}
        </g>
        <g class="w10s-warning w10s-animated" opacity="0">
          ${path("M170 64 L186 90 H154 Z","#c0502a",2)}
          ${txt(170,85,"!",17,"#fff")}
        </g>
        <g class="w10s-stamp w10s-animated" opacity="0">
          ${circle(170,284,34,"none",'stroke="#317c61" stroke-width="5"')}
          ${path("M153 283 L165 295 L188 271","#317c61",6)}
        </g>
        <g class="w10s-stop w10s-animated" opacity="0">
          ${circle(170,284,34,"none",'stroke="#c0502a" stroke-width="5"')}
          ${path("M154 268 L186 300 M186 268 L154 300","#c0502a",6)}
        </g>
        <g class="w10s-checks w10s-animated" opacity="0">
          ${rect(32,319,276,42,"#dbe7f2",12)}
          ${txt(78,345,"ELIGIBLE",12,"#1f4e79")}
          ${txt(170,345,"≤ 400",13,"#1f4e79")}
          ${txt(264,345,"SIGNED",12,"#1f4e79")}
          ${circle(34,340,5,"#317c61")}
        </g>
      `)}</div>
      <div class="w10s-caption"><span></span></div>`;

    function render(b, animate) {
      if (!root) return;
      transition(root, animate);
      const amount = b === 4 ? 460 : 320;
      const eligible = b !== 5;
      const documented = b >= 3 && b !== 7;
      const approved = documented && eligible && amount <= 400;
      const angle = b === 4 ? 54 : b === 5 ? -54 : b >= 3 ? 0 : -24;

      set(root, ".w10s-caption span", { text: captions[b] });
      set(root, ".w10s-amount text", { text: `AED ${amount}` });
      move(root, ".w10s-needle", 0, 0, 1);
      set(root, ".w10s-needle", { transform: `rotate(${angle}deg)` });
      set(root, ".w10s-beam", { transform: `rotate(${b === 4 ? 12 : b === 5 ? -12 : 0}deg)` });
      set(root, ".w10s-gate", {
        transform: approved || b === 6 ? "scaleX(.15)" : "scaleX(1)"
      });
      show(root, ".w10s-warning", b === 2 || b === 4 || b === 5 || b === 7);
      show(root, ".w10s-stamp", approved && b !== 6, {
        transform: approved ? "scale(1)" : "scale(.5)"
      });
      show(root, ".w10s-stop", b === 2 || b === 4 || b === 5 || b === 7);
      show(root, ".w10s-checks", b === 6);
      show(root, ".w10s-limit", b >= 1);
      set(root, ".w10s-coin", {
        transform: approved ? "translateY(-32px)" : "translateY(0px)"
      });
      set(root, ".w10s-amount rect", {
        fill: approved ? "#317c61" : b === 4 || b === 5 ? "#c0502a" : "#1f4e79"
      });
      set(root, ".w10s-machine", { opacity: "1" });
    }

    window.W10_SCENES.W10O2a = {
      build(el) {
        root = initialize(el, "W10O2a", markup);
        current = -1;
        this.reset();
      },
      step(i, n) {
        if (!root) return;
        const index = clamp(Math.floor(Number(i) || 0), 0, Math.max(0, (Number(n) || 24) - 1));
        const b = beat(index, cuts);
        if (b === current) return;
        render(b, current >= 0);
        current = b;
      },
      reset() {
        if (!root) return;
        current = -1;
        render(0, false);
      }
    };
  }

  // ================================================================
  // W10O2b — MEASURES AND INCENTIVES
  // Metaphor: a physical balance weighing speed against real service.
  // Motion: tilting beam, falling weights, guardrail and equilibrium.
  // Narration beats: 0 / 2 / 7 / 10 / 12 / 15 / 19 / 22.
  // ================================================================
  {
    let root = null;
    let current = -1;
    const cuts = [2, 7, 10, 12, 15, 19, 22];
    const captions = [
      "THE OLD SCORECARD", "VALUE INVISIBLE", "THE SCALE TILTS",
      "REBALANCE SUCCESS", "ESCALATION CAN BE RIGHT",
      "QUALITY GUARDRAIL", "FAIR MEASURES", "ALIGNED REWARDS"
    ];

    const markup = `
      <div class="w10s-art">${svg(`
        <defs>
          <linearGradient id="w10b-b-gold" x1="0" y1="0" x2="1" y2="1">
            <stop stop-color="#f9dfae"/><stop offset="1" stop-color="#c99548"/>
          </linearGradient>
        </defs>
        ${txt(170,31,"THE VALUE SCALE",13,"#1f4e79")}
        ${path("M44 45 H296","#dbe7f2",2)}
        <g class="w10s-scale w10s-animated">
          ${path("M58 155 H282","#1f4e79",8)}
          ${circle(170,155,12,"#c0502a")}
          <g class="w10s-leftpan w10s-animated">
            ${path("M70 155 L53 218 M70 155 L87 218","#1f4e79",2)}
            ${path("M35 218 Q70 253 105 218 Z","#dbe7f2",2)}
            ${txt(70,215,"SPEED",12,"#1f4e79")}
          </g>
          <g class="w10s-rightpan w10s-animated">
            ${path("M270 155 L253 218 M270 155 L287 218","#1f4e79",2)}
            ${path("M235 218 Q270 253 305 218 Z","#dbe7f2",2)}
            ${txt(270,215,"SERVICE",12,"#1f4e79")}
          </g>
        </g>
        ${path("M170 167 L142 309 H198 Z","#1f4e79",2)}
        ${rect(121,310,98,13,"#1f4e79",6)}
        <g class="w10s-weight-speed w10s-animated">
          ${rect(43,177,54,31,"#c0502a",7)}
          ${txt(70,198,"TIME",12,"#fff")}
        </g>
        <g class="w10s-weight-value w10s-animated" opacity="0">
          ${rect(242,177,56,31,"#317c61",7)}
          ${txt(270,198,"CARE",12,"#fff")}
        </g>
        <g class="w10s-spark w10s-animated" opacity="0">
          ${path("M270 96 L277 111 L293 116 L277 122 L270 137 L263 122 L247 116 L263 111 Z",
            "#317c61",2)}
        </g>
        <g class="w10s-escalation w10s-animated" opacity="0">
          ${circle(170,79,29,"#dbe7f2")}
          ${path("M158 79 H181 M172 70 L181 79 L172 88","#1f4e79",4)}
          ${txt(170,123,"REFER",12,"#1f4e79")}
        </g>
        <g class="w10s-guard w10s-animated" opacity="0">
          ${path("M170 239 L195 250 V273 Q195 293 170 303 Q145 293 145 273 V250 Z",
            "#317c61",2)}
          ${path("M158 272 L167 281 L183 261","#fff",5)}
        </g>
        <g class="w10s-metrics w10s-animated" opacity="0">
          ${circle(70,344,8,"#1f4e79")}
          ${circle(170,344,8,"#317c61")}
          ${circle(270,344,8,"#c0502a")}
          ${txt(70,368,"EFFICIENCY",12,"#1f4e79")}
          ${txt(170,368,"QUALITY",12,"#317c61")}
          ${txt(270,368,"REWORK",12,"#c0502a")}
        </g>
        <g class="w10s-fair w10s-animated" opacity="0">
          ${path("M116 70 Q170 42 224 70","#317c61",4)}
          ${circle(116,70,6,"#317c61")}
          ${circle(224,70,6,"#317c61")}
          ${txt(170,62,"FAIR",13,"#317c61")}
        </g>
      `)}</div>
      <div class="w10s-caption"><span></span></div>`;

    function render(b, animate) {
      if (!root) return;
      transition(root, animate);
      const angle = [-13, -19, -24, -6, -6, 0, 0, 0][b];
      set(root, ".w10s-caption span", { text: captions[b] });
      set(root, ".w10s-scale", { transform: `rotate(${angle}deg)` });
      set(root, ".w10s-leftpan", { transform: `rotate(${-angle}deg)` });
      set(root, ".w10s-rightpan", { transform: `rotate(${-angle}deg)` });
      show(root, ".w10s-weight-speed", b < 7, {
        transform: b >= 3 ? "translateY(9px) scale(.8)" : "translateY(0px)"
      });
      show(root, ".w10s-weight-value", b >= 2, {
        transform: b >= 3 ? "translateY(0px)" : "translateY(-25px)"
      });
      show(root, ".w10s-spark", b === 3 || b === 7, {
        transform: b === 7 ? "scale(1.2)" : "scale(.8)"
      });
      show(root, ".w10s-escalation", b === 4);
      show(root, ".w10s-guard", b >= 5, {
        transform: b >= 5 ? "scale(1)" : "scale(.4)"
      });
      show(root, ".w10s-metrics", b >= 5);
      show(root, ".w10s-fair", b >= 6);
      set(root, ".w10s-weight-value rect", {
        fill: b >= 5 ? "#317c61" : "#c99548"
      });
    }

    window.W10_SCENES.W10O2b = {
      build(el) {
        root = initialize(el, "W10O2b", markup);
        current = -1;
        this.reset();
      },
      step(i, n) {
        if (!root) return;
        const index = clamp(Math.floor(Number(i) || 0), 0, Math.max(0, (Number(n) || 26) - 1));
        const b = beat(index, cuts);
        if (b === current) return;
        render(b, current >= 0);
        current = b;
      },
      reset() {
        if (!root) return;
        current = -1;
        render(0, false);
      }
    };
  }

  // ================================================================
  // W10O2c — WRITE THE REAL JOB
  // Metaphor: a weaving loom producing a coherent role specification.
  // Motion: sliding shuttle, threads weaving, rotating tools, final seal.
  // Narration beats: 0 / 2 / 5 / 7 / 10 / 12 / 14 / 18.
  // ================================================================
  {
    let root = null;
    let current = -1;
    const cuts = [2, 5, 7, 10, 12, 14, 18];
    const captions = [
      "THE UNFINISHED ROLE", "THREE-WEEK GAP", "DEFINE PURPOSE",
      "ADD DECISION RIGHTS", "WEAVE ACCOUNTABILITY",
      "BUILD CAPABILITY", "ALIGN PERFORMANCE", "ONE COHERENT JOB"
    ];

    const markup = `
      <div class="w10s-art">${svg(`
        <defs>
          <linearGradient id="w10b-c-paper" x1="0" y1="0" x2="1" y2="1">
            <stop stop-color="#fff"/><stop offset="1" stop-color="#e8eff5"/>
          </linearGradient>
        </defs>
        ${txt(170,31,"THE ROLE LOOM",13,"#1f4e79")}
        ${path("M45 45 H295","#dbe7f2",2)}
        ${rect(49,76,242,246,"none",15,'stroke="#1f4e79" stroke-width="8"')}
        ${rect(63,89,214,221,"#dbe7f2",7)}
        <g class="w10s-sheet w10s-animated">
          ${rect(89,103,162,194,"url(#w10b-c-paper)",8,
            'stroke="#9bb6cc" stroke-width="1.5"')}
          ${txt(170,124,"GUEST HOST",13,"#1f4e79")}
          ${path("M105 139 H235","#b5c8d8",2)}
          <g class="w10s-thread w10s-animated" data-thread="0">
            ${path("M105 157 H235","#1f4e79",7)}
          </g>
          <g class="w10s-thread w10s-animated" data-thread="1">
            ${path("M105 181 H235","#c0502a",7)}
          </g>
          <g class="w10s-thread w10s-animated" data-thread="2">
            ${path("M105 205 H235","#317c61",7)}
          </g>
          <g class="w10s-thread w10s-animated" data-thread="3">
            ${path("M105 229 H235","#1f4e79",7)}
          </g>
          <g class="w10s-thread w10s-animated" data-thread="4">
            ${path("M105 253 H235","#c0502a",7)}
          </g>
          <g class="w10s-labels w10s-animated" opacity="0">
            ${txt(170,151,"PURPOSE",12,"#1f4e79")}
            ${txt(170,175,"AUTHORITY",12,"#c0502a")}
            ${txt(170,199,"ACCOUNTABILITY",12,"#317c61")}
            ${txt(170,223,"CAPABILITY",12,"#1f4e79")}
            ${txt(170,247,"PERFORMANCE",12,"#c0502a")}
          </g>
        </g>
        <g class="w10s-shuttle w10s-animated">
          ${path("M38 176 Q57 154 76 176 Q57 198 38 176 Z","#c0502a",2)}
          ${circle(57,176,5,"#fbf8f1")}
        </g>
        <g class="w10s-gap w10s-animated" opacity="0">
          ${rect(112,269,116,29,"#c0502a",7)}
          ${txt(170,289,"3 WEEKS LATE",12,"#fff")}
        </g>
        <g class="w10s-tools w10s-animated" opacity="0">
          <g class="w10s-tool w10s-animated">
            ${path("M48 337 L75 364 M54 331 L81 358","#1f4e79",5)}
            ${circle(48,330,9,"none",'stroke="#1f4e79" stroke-width="4"')}
          </g>
          ${circle(170,346,17,"#dbe7f2")}
          ${path("M159 346 L167 354 L181 337","#317c61",4)}
          ${path("M260 335 L280 355 M280 335 L260 355","#c0502a",4)}
        </g>
        <g class="w10s-seal w10s-animated" opacity="0">
          ${circle(170,175,55,"none",'stroke="#317c61" stroke-width="5"')}
          ${circle(170,175,44,"none",'stroke="#317c61" stroke-width="1.5"')}
          ${path("M145 174 L163 192 L195 156","#317c61",8)}
        </g>
        <g class="w10s-fibre w10s-animated" opacity="0">
          ${path("M85 342 H255","#317c61",4)}
          ${circle(85,342,6,"#317c61")}
          ${circle(255,342,6,"#317c61")}
          ${txt(170,368,"ROLE + SYSTEM",12,"#317c61")}
        </g>
      `)}</div>
      <div class="w10s-caption"><span></span></div>`;

    function render(b, animate) {
      if (!root) return;
      transition(root, animate);
      set(root, ".w10s-caption span", { text: captions[b] });
      const count = [0, 0, 1, 2, 3, 4, 5, 5][b];
      $$(root, ".w10s-thread").forEach((el, j) => {
        el.style.strokeDashoffset = j < count ? "0" : "300";
        el.style.opacity = j < count ? "1" : ".08";
      });
      const shuttleX = [0, 0, 100, 190, 70, 190, 70, 110][b];
      const shuttleY = [0, 0, -20, 4, 28, 52, 76, 100][b];
      move(root, ".w10s-shuttle", shuttleX, shuttleY);
      show(root, ".w10s-gap", b === 1);
      show(root, ".w10s-labels", b >= 6);
      show(root, ".w10s-tools", b >= 3 && b <= 6);
      show(root, ".w10s-seal", b === 7, {
        transform: b === 7 ? "scale(1)" : "scale(1.5)"
      });
      show(root, ".w10s-fibre", b === 7);
      set(root, ".w10s-sheet", {
        transform: b === 7 ? "scale(1.04)" : b === 1 ? "rotate(-3deg)" : "scale(1)"
      });
      set(root, ".w10s-shuttle", {
        opacity: b === 7 ? "0" : "1",
        transform: `translate(${shuttleX}px,${shuttleY}px)`
      });
    }

    window.W10_SCENES.W10O2c = {
      build(el) {
        root = initialize(el, "W10O2c", markup);
        current = -1;
        this.reset();
      },
      step(i, n) {
        if (!root) return;
        const index = clamp(Math.floor(Number(i) || 0), 0, Math.max(0, (Number(n) || 21) - 1));
        const b = beat(index, cuts);
        if (b === current) return;
        render(b, current >= 0);
        current = b;
      },
      reset() {
        if (!root) return;
        current = -1;
        render(0, false);
      }
    };
  }
})();

;

(() => {
  "use strict";
  window.W10_SCENES = window.W10_SCENES || {};

  const PART = "C";
  const reduced = () => window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const beat = (i, n, count = 7) =>
    clamp(Math.floor(clamp(i, 0, Math.max(0, n - 1)) * count /
      Math.max(1, n)), 0, count - 1);
  const svgNS = "http://www.w3.org/2000/svg";
  const S = (tag, attrs = {}, text) => {
    const e = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, String(v)));
    if (text !== undefined) e.textContent = text;
    return e;
  };
  const set = (e, attrs) => {
    if (!e) return;
    Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, String(v)));
  };
  const show = (e, yes) => {
    if (e) e.style.opacity = yes ? "1" : "0";
  };

  if (!document.getElementById("w10s-css-" + PART)) {
    const style = document.createElement("style");
    style.id = "w10s-css-" + PART;
    style.textContent = `
      .w10s{position:relative;width:100%;height:100%;min-height:350px;
        overflow:hidden;isolation:isolate;font-family:inherit;color:#1b2a3a}
      .w10s *{box-sizing:border-box}
      .w10s svg{display:block;width:100%;height:100%;overflow:visible}
      .w10s .canvas{position:absolute;inset:0}
      .w10s .tag{position:absolute;left:12px;top:10px;font-size:12px;
        font-weight:800;letter-spacing:.12em;color:#1f4e79}
      .w10s .footer{position:absolute;left:12px;right:12px;bottom:12px;
        display:flex;justify-content:space-between;align-items:center;
        gap:8px;font-size:12px;font-weight:750;color:#1f4e79}
      .w10s .phase{color:#c0502a;text-align:right}
      .w10s svg text{font-family:inherit}
      .w10s .motion{transition:transform .85s cubic-bezier(.2,.75,.2,1),
        opacity .75s ease,fill .75s ease,stroke .75s ease}
      .w10s .fade{transition:opacity .8s ease}
      .w10s .dash{transition:stroke-dashoffset 1s ease,opacity .7s ease}
      .w10s .thin{stroke:#1f4e79;stroke-width:2;fill:none}
      .w10s .label{font-size:12px;font-weight:750;fill:#1b2a3a}
      .w10s .small{font-size:11px;fill:#1f4e79}
      .w10s .number{font-size:29px;font-weight:850;fill:#1f4e79}
      .w10s .orange{fill:#c0502a}
      .w10s .green{fill:#317c61}
      .w10s .panel{fill:#fbf8f1;stroke:#dbe7f2;stroke-width:2}
      .w10s .glow{filter:drop-shadow(0 4px 7px rgba(31,78,121,.13))}
      .w10s-W10O3a .host{transition:fill .65s,opacity .65s,
        transform .65s;transform-box:fill-box;transform-origin:center}
      .w10s-W10O3a .scanner{transition:transform .9s ease,opacity .7s}
      .w10s-W10O3a .beam{animation:w10sScan 3s ease-in-out infinite alternate}
      .w10s-W10O3b .traveller{transition:transform 1s ease,opacity .6s}
      .w10s-W10O3b .route{transition:stroke-dashoffset 1.1s ease,
        opacity .6s}
      .w10s-W10O3b .desk{transition:transform .85s ease,opacity .7s}
      .w10s-W10O3b .lens{transition:transform .85s ease,opacity .7s}
      .w10s-W10O3c .ice{transition:transform 1s ease,opacity .7s}
      .w10s-W10O3c .thread{transition:stroke-dashoffset 1.1s ease,
        opacity .7s}
      .w10s-W10O3c .spark{animation:w10sSpark 3.2s ease-in-out infinite}
      @keyframes w10sScan{from{opacity:.25}to{opacity:.9}}
      @keyframes w10sSpark{0%,100%{opacity:.3}50%{opacity:1}}
      @media(prefers-reduced-motion:reduce){
        .w10s *{animation:none!important;transition:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  function mount(el, id, markup) {
    el.replaceChildren();
    const root = document.createElement("div");
    root.className = "w10s w10s-" + id;
    root.innerHTML = markup;
    el.appendChild(root);
    return root;
  }

  function animateState(root, fn, instant) {
    if (!root) return;
    if (instant || reduced()) {
      root.classList.add("w10s-instant");
      const nodes = root.querySelectorAll("*");
      nodes.forEach(e => {
        e.style.transition = "none";
        e.style.animation = "none";
      });
      fn();
      // Force the requested state to settle before restoring transitions.
      void root.offsetHeight;
      if (!reduced()) nodes.forEach(e => {
        e.style.removeProperty("transition");
        e.style.removeProperty("animation");
      });
      root.classList.remove("w10s-instant");
    } else fn();
  }

  // ================================================================
  // W10O3a — THE HUMAN CONSTELLATION
  // Metaphor: a room of 22 illuminated human signals.
  // Animation: scanning beam, selective illumination, diagnostic
  // orbit, and decision-boundary projection.
  // The nine highlighted hosts are an illustrative subset of 22,
  // not identified individuals or a claim about their capabilities.
  // ================================================================
  {
    let root, svg, people = [], orbit, scanner, beam, question;
    let counter, subtitle, footer, nodes = {};

    const person = (x, y, index) => {
      const g = S("g", {class:"host",transform:`translate(${x} ${y})`});
      g.append(
        S("circle",{cx:0,cy:-7,r:5.4,fill:"#1f4e79"}),
        S("path",{d:"M-9 13 Q-9 1 0 1 Q9 1 9 13 Z",fill:"#1f4e79"}),
        S("circle",{cx:0,cy:0,r:15,fill:"none",
          stroke:"#dbe7f2","stroke-width":1.3})
      );
      g.dataset.index = index;
      return g;
    };

    window.W10_SCENES["W10O3a"] = {
      build(el) {
        root = mount(el,"W10O3a",`
          <div class="tag">THE READINESS SCAN</div>
          <div class="canvas"></div>
          <div class="footer"><span class="count">22 / 22</span>
          <span class="phase">INDUCTION</span></div>`);
        svg = S("svg",{viewBox:"0 0 340 390",
          preserveAspectRatio:"xMidYMid meet",
          role:"img","aria-label":"Twenty-two Guest Hosts: attendance, referrals, and capability evidence"});
        root.querySelector(".canvas").appendChild(svg);

        svg.appendChild(S("ellipse",{cx:170,cy:195,rx:148,ry:149,
          fill:"#dbe7f2",opacity:.22}));
        for(let r=50;r<=140;r+=45)
          svg.appendChild(S("circle",{cx:170,cy:195,r,
            fill:"none",stroke:"#1f4e79",opacity:.12,
            "stroke-dasharray":"3 8"}));

        people=[];
        const group=S("g");
        for(let j=0;j<22;j++){
          const row=Math.floor(j/6), col=j%6;
          const count=row===3?4:6;
          const x=170+(col-(count-1)/2)*46;
          const y=113+row*52;
          const p=person(x,y,j);
          group.appendChild(p);
          people.push(p);
        }
        svg.appendChild(group);

        orbit=S("circle",{cx:170,cy:195,r:142,fill:"none",
          stroke:"#c0502a","stroke-width":2.5,
          "stroke-dasharray":"6 10",opacity:0,class:"motion"});
        svg.appendChild(orbit);

        scanner=S("g",{class:"scanner",opacity:0});
        beam=S("rect",{x:34,y:65,width:272,height:5,rx:3,
          fill:"#317c61",opacity:.55,class:"beam"});
        scanner.appendChild(beam);
        svg.appendChild(scanner);

        const top=S("g",{class:"fade"});
        top.append(
          S("rect",{x:83,y:12,width:174,height:39,rx:19,
            fill:"#317c61"}),
          S("text",{x:170,y:37,"text-anchor":"middle",
            fill:"#fff","font-size":15,"font-weight":800},
            "4 HOURS · ATTENDED")
        );
        svg.appendChild(top);
        nodes.attendance=top;

        question=S("g",{class:"fade",opacity:0});
        question.append(
          S("circle",{cx:170,cy:195,r:48,fill:"#fbf8f1",
            stroke:"#c0502a","stroke-width":2.5}),
          S("text",{x:170,y:207,"text-anchor":"middle",
            fill:"#c0502a","font-size":39,"font-weight":800},"?")
        );
        svg.appendChild(question);

        counter=S("text",{x:170,y:354,"text-anchor":"middle",
          class:"number"},"22");
        subtitle=S("text",{x:170,y:375,"text-anchor":"middle",
          class:"label"},"ATTENDED");
        svg.append(counter,subtitle);

        footer=root.querySelector(".phase");
        this.reset();
      },
      step(i,n) {
        const b=beat(i,n,8);
        // 0-3 attendance and missing assessment;
        // 4-5 nine referrals; 6-11 possible causes;
        // 12-20 realistic decisions; 21-28 diagnosis.
        const stages=[
          i<2?0:i<3?1:i<4?2:i<6?3:
          i<11?4:i<13?5:i<21?6:7
        ];
        const k=stages[0];
        animateState(root,()=>{
          people.forEach((p,j)=>{
            const referred=j<9;
            const color=k>=3&&referred?"#c0502a":
              k>=6?"#317c61":"#1f4e79";
            p.querySelectorAll("circle,path").forEach((shape,m)=>{
              if(m<2)shape.setAttribute("fill",color);
            });
            p.style.opacity=k>=3&&!referred?.37:1;
            p.style.transform=k===4&&referred?"scale(1.17)":"scale(1)";
          });
          show(nodes.attendance,k<=1);
          show(question,k===2||k===4);
          show(orbit,k>=3&&k<=5);
          scanner.style.opacity=k===1||k===5||k===6?"1":"0";
          beam.setAttribute("y",k===6?270:80);
          counter.textContent=k>=3&&k<=5?"9 / 22":
            k===2?"?":k>=6?"4":"22";
          subtitle.textContent=[
            "ATTENDED","ATTENDED","NOT ASSESSED",
            "ALWAYS REFER","CAUSES UNKNOWN",
            "DIAGNOSE","TEST DECISIONS","VERIFY READINESS"
          ][k];
          footer.textContent=[
            "INDUCTION","PARTICIPATION","EVIDENCE GAP",
            "OBSERVED BEHAVIOUR","NO VERDICT","INVESTIGATE",
            "REALISTIC CASES","ASSESS · OBSERVE"
          ][k];
          if(k===6){
            // A moving diagnostic scan, not a claim of proven competence.
            people.forEach(p=>p.style.opacity=".82");
          }
        });
      },
      reset(){
        if(!root)return;
        animateState(root,()=>{
          people.forEach(p=>{
            p.style.opacity="1";p.style.transform="scale(1)";
            p.querySelectorAll("circle,path").forEach((s,j)=>{
              if(j<2)s.setAttribute("fill","#1f4e79");
            });
          });
          show(nodes.attendance,true);
          show(question,false);
          show(orbit,false);
          scanner.style.opacity="0";
          beam.setAttribute("y",80);
          counter.textContent="22";
          subtitle.textContent="ATTENDED";
          footer.textContent="INDUCTION";
        },true);
      }
    };
  }

  // ================================================================
  // W10O3b — THE TWO-CHANNEL LOBBY
  // Metaphor: architectural floor plan with diverging guest routes.
  // Animation: path tracing, moving travellers, physical desk rising,
  // inspection lens, and a four-property comparison.
  // The unclassified 6% is deliberately NOT assigned a cause.
  // ================================================================
  {
    let root,svg,paths={},guests=[],desk,lens,bar,barLabels,footer;
    let nodes={};

    window.W10_SCENES["W10O3b"]={
      build(el){
        root=mount(el,"W10O3b",`
          <div class="tag">WEEK 11 · ARRIVAL FLOOR</div>
          <div class="canvas"></div>
          <div class="footer"><span>FOUR PILOT PROPERTIES</span>
          <span class="phase">TWO ROUTES</span></div>`);
        svg=S("svg",{viewBox:"0 0 340 390",
          preserveAspectRatio:"xMidYMid meet",role:"img",
          "aria-label":"Lobby plan with kiosk and desk routes, observed 65 percent kiosk and 29 percent desk"});
        root.querySelector(".canvas").appendChild(svg);
        svg.appendChild(S("rect",{x:14,y:52,width:312,height:270,
          rx:25,fill:"#dbe7f2",opacity:.27,
          stroke:"#1f4e79","stroke-width":1.5}));

        const floor=S("g");
        for(let y=65;y<315;y+=25)
          floor.appendChild(S("path",{d:`M25 ${y} H315`,
            stroke:"#1f4e79",opacity:.055}));
        svg.appendChild(floor);

        // The entrance feeds two genuinely different operating routes.
        svg.append(
          S("path",{d:"M145 317 V295 M195 317 V295",
            stroke:"#1f4e79","stroke-width":3}),
          S("text",{x:170,y:344,"text-anchor":"middle",
            class:"label"},"ARRIVALS")
        );

        paths.kiosk=S("path",{d:"M170 296 C170 245 92 250 92 188",
          fill:"none",stroke:"#317c61","stroke-width":7,
          "stroke-linecap":"round",class:"route",
          "stroke-dasharray":"240","stroke-dashoffset":240});
        paths.desk=S("path",{d:"M170 296 C170 245 250 250 250 188",
          fill:"none",stroke:"#c0502a","stroke-width":7,
          "stroke-linecap":"round",class:"route",
          "stroke-dasharray":"240","stroke-dashoffset":240});
        svg.append(paths.kiosk,paths.desk);

        // Kiosk: a physical machine rather than a labelled box.
        const kiosk=S("g",{class:"glow"});
        kiosk.append(
          S("rect",{x:53,y:91,width:78,height:91,rx:12,
            fill:"#1f4e79"}),
          S("rect",{x:61,y:101,width:62,height:57,rx:5,
            fill:"#fbf8f1"}),
          S("circle",{cx:92,cy:128,r:13,fill:"#dbe7f2"}),
          S("path",{d:"M86 128 l5 5 9 -11",fill:"none",
            stroke:"#317c61","stroke-width":3}),
          S("rect",{x:82,y:183,width:20,height:10,rx:3,
            fill:"#1f4e79"}),
          S("text",{x:92,y:80,"text-anchor":"middle",
            class:"label"},"KIOSK")
        );
        svg.appendChild(kiosk);

        desk=S("g",{class:"desk glow"});
        desk.append(
          S("rect",{x:205,y:132,width:89,height:16,rx:5,
            fill:"#c0502a"}),
          S("rect",{x:214,y:148,width:71,height:43,rx:5,
            fill:"#1f4e79"}),
          S("circle",{cx:250,cy:109,r:12,fill:"#c0502a"}),
          S("path",{d:"M230 131 Q250 107 270 131",
            fill:"#c0502a"}),
          S("text",{x:250,y:80,"text-anchor":"middle",
            class:"label"},"DESK")
        );
        svg.appendChild(desk);

        guests=[];
        for(let j=0;j<8;j++){
          const g=S("g",{class:"traveller",opacity:0});
          g.append(
            S("circle",{cx:0,cy:-6,r:5,fill:"#1f4e79"}),
            S("path",{d:"M-7 9 Q-7 0 0 0 Q7 0 7 9",
              fill:"#1f4e79"})
          );
          svg.appendChild(g);guests.push(g);
        }

        lens=S("g",{class:"lens",opacity:0});
        lens.append(
          S("circle",{cx:250,cy:170,r:43,fill:"#fbf8f1",
            "fill-opacity":.3,stroke:"#c0502a",
            "stroke-width":3}),
          S("path",{d:"M281 200 L311 230",stroke:"#c0502a",
            "stroke-width":9,"stroke-linecap":"round"}),
          S("text",{x:250,y:174,"text-anchor":"middle",
            fill:"#c0502a","font-size":29,"font-weight":800},"?")
        );
        svg.appendChild(lens);

        bar=S("g",{class:"fade",opacity:0});
        bar.append(
          S("rect",{x:30,y:23,width:280,height:15,rx:7,
            fill:"#dbe7f2"}),
          S("rect",{x:30,y:23,width:182,height:15,rx:7,
            fill:"#317c61"}),
          S("rect",{x:212,y:23,width:81.2,height:15,
            fill:"#c0502a"})
        );
        svg.appendChild(bar);

        barLabels=S("g",{class:"fade",opacity:0});
        barLabels.append(
          S("text",{x:115,y:17,"text-anchor":"middle",
            class:"label"},"65%"),
          S("text",{x:251,y:17,"text-anchor":"middle",
            class:"label"},"29%"),
          S("text",{x:305,y:17,"text-anchor":"middle",
            class:"small"},"6%")
        );
        svg.appendChild(barLabels);

        nodes.sites=S("g",{class:"fade",opacity:0});
        for(let j=0;j<4;j++){
          const x=42+j*76;
          nodes.sites.append(
            S("rect",{x,y:248,width:57,height:55,rx:8,
              fill:j===0?"#c0502a":"#1f4e79",
              opacity:.85}),
            S("rect",{x:x+12,y:260,width:13,height:12,
              fill:"#fbf8f1"}),
            S("rect",{x:x+33,y:260,width:13,height:12,
              fill:"#fbf8f1"}),
            S("text",{x:x+28,y:294,"text-anchor":"middle",
              fill:"#fff","font-size":12},String(j+1))
          );
        }
        svg.appendChild(nodes.sites);
        footer=root.querySelector(".phase");
        this.reset();
      },
      step(i,n){
        const k=i<2?0:i<3?1:i<6?2:i<9?3:
          i<12?4:i<18?5:i<23?6:7;
        animateState(root,()=>{
          paths.kiosk.style.strokeDashoffset=k>=1?"0":"240";
          paths.desk.style.strokeDashoffset=k>=1?"0":"240";
          show(bar,k>=1);
          show(barLabels,k>=1);
          show(lens,k===3||k===4||k===6);
          show(nodes.sites,k===5);
          desk.style.transform=k===4?"translateY(-12px)":
            k===5?"translateY(8px)":"translateY(0)";
          desk.style.opacity=k===5?".35":"1";
          guests.forEach((g,j)=>{
            const left=j<5;
            const x=k===0?170:left?92:250;
            const y=k===0?294:left?204:205;
            g.setAttribute("transform",`translate(${x+(j%3-1)*11}
              ${y+(Math.floor(j/3))*12})`);
            g.style.opacity=k>=1&&k!==5?".9":"0";
          });
          if(k>=6){
            // Measurement lens returns to the actual observed routes.
            show(nodes.sites,false);
            guests.forEach((g,j)=>g.style.opacity=j<5?".9":".55");
          }
          footer.textContent=[
            "PROCESS LAUNCHED","OBSERVED CHANNELS",
            "PATH ≠ CAUSE","LEGITIMATE OR AVOIDABLE?",
            "PERMANENT DESK","COMPARE PROPERTIES",
            "DEFINE · CLASSIFY","IMPROVE THE JOURNEY"
          ][k];
        });
      },
      reset(){
        if(!root)return;
        animateState(root,()=>{
          paths.kiosk.style.strokeDashoffset="240";
          paths.desk.style.strokeDashoffset="240";
          show(bar,false);show(barLabels,false);
          show(lens,false);show(nodes.sites,false);
          desk.style.transform="translateY(0)";
          desk.style.opacity="1";
          guests.forEach(g=>{
            g.setAttribute("transform","translate(170 294)");
            g.style.opacity="0";
          });
          footer.textContent="TWO ROUTES";
        },true);
      }
    };
  }

  // ================================================================
  // W10O3c — THE SUBMERGED KNOWLEDGE
  // Metaphor: an iceberg of invisible professional judgement,
  // transformed into a network of transferable reasoning.
  // Animation: vertical reveal, submerged illumination, flowing
  // knowledge threads, peer constellation, continuity gap.
  // Departures are shown without suggesting individual motives.
  // ================================================================
  {
    let root,svg,ice,water,threads=[],sparks=[],peers=[];
    let notes={},footer,departure;

    window.W10_SCENES["W10O3c"]={
      build(el){
        root=mount(el,"W10O3c",`
          <div class="tag">BELOW THE PROCEDURE</div>
          <div class="canvas"></div>
          <div class="footer"><span>EXPERIENCE → SHARED PRACTICE</span>
          <span class="phase">VISIBLE RULES</span></div>`);
        svg=S("svg",{viewBox:"0 0 340 390",
          preserveAspectRatio:"xMidYMid meet",role:"img",
          "aria-label":"Iceberg representing written procedures and hidden judgement, followed by knowledge sharing and continuity"});
        root.querySelector(".canvas").appendChild(svg);

        // The surface separates codified knowledge from experience.
        water=S("g");
        water.append(
          S("rect",{x:12,y:160,width:316,height:187,rx:13,
            fill:"#dbe7f2",opacity:.68}),
          S("path",{d:"M12 160 Q51 150 90 160 T168 160 T246 160 T328 160",
            stroke:"#1f4e79","stroke-width":3,fill:"none"})
        );
        svg.appendChild(water);

        ice=S("g",{class:"ice"});
        ice.append(
          S("path",{d:"M170 48 L213 160 L170 160 L128 160 Z",
            fill:"#fbf8f1",stroke:"#1f4e79",
            "stroke-width":2.2}),
          S("path",{d:"M128 160 L213 160 L284 247 L207 325 L145 337 L65 247 Z",
            fill:"#1f4e79",opacity:.91}),
          S("path",{d:"M128 160 L170 160 L145 337 L65 247 Z",
            fill:"#317c61",opacity:.28}),
          S("path",{d:"M213 160 L284 247 L207 325 L170 160 Z",
            fill:"#dbe7f2",opacity:.28}),
          S("path",{d:"M170 48 L187 96 L155 91 Z",
            fill:"#dbe7f2",opacity:.75})
        );
        svg.appendChild(ice);

        notes.rules=S("text",{x:170,y:124,
          "text-anchor":"middle",class:"label"},"WRITTEN RULE");
        notes.judgement=S("text",{x:170,y:222,
          "text-anchor":"middle",fill:"#fff","font-size":15,
          "font-weight":800,opacity:0},"JUDGEMENT");
        notes.evidence=S("text",{x:170,y:248,
          "text-anchor":"middle",fill:"#fff","font-size":12,
          opacity:0},"EVIDENCE · CONTEXT");
        svg.append(notes.rules,notes.judgement,notes.evidence);

        // Threads make reasoning transferable, not merely copied.
        const network=S("g");
        const coordinates=[
          [72,284],[125,308],[215,307],[270,281],
          [96,238],[246,234]
        ];
        coordinates.forEach(([x,y],j)=>{
          const path=S("path",{
            d:`M170 230 Q${170+(x-170)*.3} ${y-42} ${x} ${y}`,
            fill:"none",stroke:j%2?"#317c61":"#c0502a",
            "stroke-width":2.5,"stroke-dasharray":"180",
            "stroke-dashoffset":180,class:"thread",opacity:0
          });
          network.appendChild(path);threads.push(path);
          const dot=S("circle",{cx:x,cy:y,r:6,
            fill:j%2?"#317c61":"#c0502a",
            opacity:0,class:"spark"});
          network.appendChild(dot);sparks.push(dot);
        });
        svg.appendChild(network);

        // Peer-learning constellation emerges above the water.
        const peerGroup=S("g",{class:"fade"});
        [[72,88],[268,88],[50,139],[290,139]].forEach(([x,y])=>{
          const p=S("g",{opacity:0,class:"motion"});
          p.append(
            S("circle",{cx:x,cy:y-7,r:8,fill:"#317c61"}),
            S("path",{d:`M${x-13} ${y+12} Q${x-13} ${y-1}
              ${x} ${y-1} Q${x+13} ${y-1} ${x+13} ${y+12}`,
              fill:"#317c61"})
          );
          peerGroup.appendChild(p);peers.push(p);
        });
        svg.appendChild(peerGroup);

        departure=S("g",{class:"fade",opacity:0});
        departure.append(
          S("rect",{x:97,y:352,width:146,height:29,rx:14,
            fill:"#c0502a"}),
          S("text",{x:170,y:372,"text-anchor":"middle",
            fill:"#fff","font-size":13,"font-weight":800},
            "2 DEPARTURES")
        );
        svg.appendChild(departure);

        notes.case=S("g",{class:"fade",opacity:0});
        notes.case.append(
          S("circle",{cx:170,cy:288,r:36,fill:"#fbf8f1",
            stroke:"#317c61","stroke-width":2}),
          S("text",{x:170,y:283,"text-anchor":"middle",
            fill:"#1f4e79","font-size":13,"font-weight":800},
            "AED 400"),
          S("path",{d:"M151 295 L164 306 L188 281",
            stroke:"#317c61","stroke-width":4,fill:"none",
            "stroke-linecap":"round"})
        );
        svg.appendChild(notes.case);
        footer=root.querySelector(".phase");
        this.reset();
      },
      step(i,n){
        const k=i<2?0:i<4?1:i<7?2:i<9?3:
          i<12?4:i<14?5:i<18?6:7;
        animateState(root,()=>{
          // The iceberg remains the central visual anchor.
          ice.style.transform=k===1?"translateY(-14px)":
            k>=3?"translateY(-5px)":"translateY(0)";
          notes.rules.style.opacity=k===6?".4":"1";
          notes.judgement.style.opacity=k>=1?"1":"0";
          notes.evidence.style.opacity=k>=2?"1":"0";
          show(notes.case,k===4);
          threads.forEach((p,j)=>{
            p.style.opacity=k>=3&&k!==6?"1":"0";
            p.style.strokeDashoffset=k>=3?"0":"180";
          });
          sparks.forEach((p,j)=>{
            p.style.opacity=k>=3&&k!==6?"1":"0";
          });
          peers.forEach((p,j)=>{
            p.style.opacity=k>=5?"1":"0";
            p.style.transform=k>=5?"translateY(0)":
              "translateY(12px)";
          });
          show(departure,k===6);
          // During departures, the transfer network dims but does not
          // identify either departing employee or imply their motives.
          if(k===6){
            threads.forEach(p=>p.style.opacity=".18");
            sparks.forEach(p=>p.style.opacity=".15");
          }
          if(k===7){
            show(departure,false);
            threads.forEach(p=>{
              p.style.opacity="1";p.style.strokeDashoffset="0";
            });
            sparks.forEach(p=>p.style.opacity="1");
          }
          footer.textContent=[
            "EXPLICIT KNOWLEDGE","TACIT JUDGEMENT",
            "HIDDEN REASONING","MAKE IT TEACHABLE",
            "WORKED EXAMPLES","PEER LEARNING",
            "MOTIVES UNKNOWN","SHARED CAPABILITY"
          ][k];
        });
      },
      reset(){
        if(!root)return;
        animateState(root,()=>{
          ice.style.transform="translateY(0)";
          notes.rules.style.opacity="1";
          notes.judgement.style.opacity="0";
          notes.evidence.style.opacity="0";
          show(notes.case,false);
          show(departure,false);
          threads.forEach(p=>{
            p.style.opacity="0";p.style.strokeDashoffset="180";
          });
          sparks.forEach(p=>p.style.opacity="0");
          peers.forEach(p=>{
            p.style.opacity="0";
            p.style.transform="translateY(12px)";
          });
          footer.textContent="VISIBLE RULES";
        },true);
      }
    };
  }
})();

;

(() => {
  "use strict";
  const PART = "D";
  window.W10_SCENES = window.W10_SCENES || {};
  const NS = "http://www.w3.org/2000/svg";
  const C = { navy:"#1f4e79", orange:"#c0502a", paper:"#fbf8f1",
    ink:"#1b2a3a", blue:"#dbe7f2", green:"#317c61" };
  const reduced = () => typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
  const svg = (body,view="0 0 340 390") =>
    `<svg xmlns="${NS}" viewBox="${view}" preserveAspectRatio="xMidYMid meet"
      role="img" style="width:100%;height:100%;display:block;overflow:visible">${body}</svg>`;
  const rect = (x,y,w,h,fill,rx=0,extra="") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`;
  const line = (x1,y1,x2,y2,color=C.navy,width=2,extra="") =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}"
      stroke-width="${width}" stroke-linecap="round" ${extra}/>`;
  const txt = (x,y,s,size=13,color=C.ink,extra="") =>
    `<text x="${x}" y="${y}" fill="${color}" font-size="${size}"
      font-family="inherit" ${extra}>${s}</text>`;
  const circle = (x,y,r,fill,extra="") =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
  const make = (el,id,body) => {
    el.replaceChildren();
    const root=document.createElement("div");
    root.className="w10s w10s-"+id;
    root.innerHTML=svg(body);
    el.appendChild(root);
    return root;
  };
  const phase = (i,n,cuts) => {
    const x=clamp(Number.isFinite(+i)?Math.floor(+i):0,0,
      Math.max(0,(Number.isFinite(+n)?+n:1)-1));
    return cuts.reduce((a,c)=>a+(x>=c?1:0),0);
  };
  const animate = (root,fn,instant=false) => {
    if(!root)return;
    root.classList.toggle("w10s-instant",instant||reduced());
    fn();
  };
  const attr = (root,selector,name,value) => {
    const node=root.querySelector(selector);
    if(node)node.setAttribute(name,String(value));
  };
  const show = (root,selector,on) => {
    const node=root.querySelector(selector);
    if(node)node.classList.toggle("on",!!on);
  };
  const setText = (root,selector,value) => {
    const node=root.querySelector(selector);
    if(node)node.textContent=value;
  };

  if(!document.getElementById("w10s-css-"+PART)){
    const style=document.createElement("style");
    style.id="w10s-css-"+PART;
    style.textContent=`
.w10s{position:relative;width:100%;height:100%;min-height:0;
 overflow:hidden;isolation:isolate;font-family:inherit;color:${C.ink};
 background:transparent;box-sizing:border-box}
.w10s *{box-sizing:border-box}
.w10s svg{max-width:100%;max-height:100%}
.w10s svg text{font-family:inherit;font-weight:650;letter-spacing:.1px}
.w10s .fade{opacity:0;transition:opacity .8s ease,transform .9s ease;
 transform:translateY(9px)}
.w10s .fade.on{opacity:1;transform:translateY(0)}
.w10s .piece{transition:transform .95s cubic-bezier(.22,.8,.2,1),
 opacity .8s ease;transform-box:fill-box;transform-origin:center}
.w10s .draw{stroke-dasharray:180;stroke-dashoffset:180;
 transition:stroke-dashoffset 1s ease}
.w10s .draw.on{stroke-dashoffset:0}
.w10s .w10s-invisible{opacity:0}
.w10s.w10s-instant *, .w10s.w10s-instant *::before,
.w10s.w10s-instant *::after{transition:none!important;
 animation:none!important}
.w10s-W10O2d .repair-ring{transition:stroke-dashoffset 1s ease,
 opacity .7s ease;transform-origin:170px 190px;
 transform:rotate(-90deg)}
.w10s-W10O2d .repair-unit{transition:opacity .65s ease,
 transform .9s cubic-bezier(.2,.8,.2,1);
 transform-box:fill-box;transform-origin:center}
.w10s-W10O2d .repair-unit:not(.on){opacity:.16;
 transform:translateY(13px) scale(.85)}
.w10s-W10O2d .repair-unit.on{opacity:1;transform:none}
.w10s-W10O2d .repair-core{transition:fill .9s ease}
.w10s-W10O2d .repair-pulse{animation:w10d-breathe 3.2s ease-in-out infinite;
 transform-origin:170px 190px}
.w10s-W10O2d .repair-pulse:not(.on){animation:none;opacity:0}
@keyframes w10d-breathe{0%,100%{opacity:.15;transform:scale(.94)}
 50%{opacity:.45;transform:scale(1.07)}}
.w10s-W10O3d .flip-face{transition:opacity .35s ease,transform .85s ease;
 transform-box:fill-box;transform-origin:center}
.w10s-W10O3d .flip-face:not(.on){opacity:0;transform:scaleX(.06)}
.w10s-W10O3d .flip-face.on{opacity:1;transform:scaleX(1)}
.w10s-W10O3d .evidence-ray{transition:stroke-dashoffset 1s ease;
 stroke-dasharray:240;stroke-dashoffset:240}
.w10s-W10O3d .evidence-ray.on{stroke-dashoffset:0}
.w10s-W10O3d .evidence-node{transition:opacity .65s ease,
 transform .8s ease;transform-box:fill-box;transform-origin:center}
.w10s-W10O3d .evidence-node:not(.on){opacity:0;transform:scale(.65)}
.w10s-W10O3d .evidence-node.on{opacity:1;transform:scale(1)}
.w10s-W10O3d .scanner{transition:transform 1.05s ease;
 transform-box:fill-box;transform-origin:center}
.w10s-W10O3d .scanner.on{animation:w10d-scan 2.5s ease-in-out infinite}
@keyframes w10d-scan{0%,100%{transform:translateY(-28px)}
 50%{transform:translateY(30px)}}
.w10s-W10O3e .handover-object{transition:transform 1.05s
 cubic-bezier(.22,.8,.2,1),opacity .7s ease;
 transform-box:fill-box;transform-origin:center}
.w10s-W10O3e .handover-track{stroke-dasharray:360;
 stroke-dashoffset:360;transition:stroke-dashoffset 1s ease}
.w10s-W10O3e .handover-track.on{stroke-dashoffset:0}
.w10s-W10O3e .handover-gate{transition:transform .85s ease,
 opacity .7s ease;transform-box:fill-box;transform-origin:center}
.w10s-W10O3e .handover-gate.open{transform:translateY(-20px);opacity:.35}
.w10s-W10O3e .handover-glow{animation:w10d-glow 2.6s ease-in-out infinite}
@keyframes w10d-glow{0%,100%{opacity:.25}50%{opacity:.8}}
@media(prefers-reduced-motion:reduce){
 .w10s *, .w10s *::before,.w10s *::after{
 animation:none!important;transition:none!important}}
`;
    document.head.appendChild(style);
  }

  // ================================================================
  // W10O2d — THE ROLE REPAIR REACTOR
  // Visual metaphor: five interlocking orbital mechanisms restore
  // a damaged human-centred operating system.
  // Beats follow role, authority, measures, capability, adoption.
  // ================================================================
  {
    let root=null,last=-1;
    const labels=["ROLE","AUTHORITY","MEASURES","CAPABILITY","ADOPTION"];
    const colors=[C.navy,C.orange,C.green,C.navy,C.orange];
    const positions=[[170,57],[293,147],[247,293],[93,293],[47,147]];
    const units=positions.map(([x,y],j)=>{
      const a=Math.atan2(y-190,x-170)*180/Math.PI;
      return `<g class="repair-unit u${j}">
        <g transform="translate(${x} ${y})">
          ${circle(0,0,30,C.paper,`stroke="${colors[j]}" stroke-width="2.5"`)}
          ${circle(0,0,21,C.blue,`opacity=".55"`)}
          <g transform="rotate(${a+90})">
            ${Array.from({length:8},(_,k)=>`<path d="M-4 -27 L4 -27 L5 -33 L-5 -33Z"
              fill="${colors[j]}" transform="rotate(${k*45})"/>`).join("")}
          </g>
          ${j===0?`<path d="M-9 10 V4 Q-9 -1 -4 -3 Q-10 -12 0 -15
            Q10 -12 4 -3 Q9 -1 9 4 V10Z" fill="${colors[j]}"/>`:
          j===1?`<path d="M-11 1 L-11 -5 A11 11 0 0 1 11 -5
            L11 1 M-12 1 H12 V13 H-12Z" fill="none"
            stroke="${colors[j]}" stroke-width="3"/>`:
          j===2?`${line(-11,12,-11,-7,colors[j],5)}
            ${line(0,12,0,-14,colors[j],5)}
            ${line(11,12,11,-2,colors[j],5)}`:
          j===3?`<path d="M-12 1 Q-12 -13 0 -12 Q12 -13 12 1
            Q12 12 0 12 Q-12 12 -12 1Z" fill="none"
            stroke="${colors[j]}" stroke-width="3"/>
            ${circle(0,0,4,colors[j])}`:
          `<path d="M-12 2 L-3 11 L14 -10" fill="none"
            stroke="${colors[j]}" stroke-width="4"
            stroke-linecap="round" stroke-linejoin="round"/>`}
        </g>
        ${txt(x,y+(y<190?-39:48),labels[j],12,C.ink,
          `text-anchor="middle"`)}
      </g>`;
    }).join("");
    const body=`
      <defs>
        <radialGradient id="w10d-reactor">
          <stop stop-color="#dbe7f2"/><stop offset="1" stop-color="#fbf8f1"/>
        </radialGradient>
      </defs>
      ${txt(170,20,"REBUILD THE ROLE",16,C.ink,`text-anchor="middle"`)}
      ${circle(170,190,116,"none",`stroke="${C.blue}" stroke-width="20" opacity=".45"`)}
      ${circle(170,190,116,"none",`class="repair-ring" stroke="${C.green}"
        stroke-width="7" stroke-dasharray="729" stroke-dashoffset="729"`)}
      ${positions.map(([x,y])=>line(170,190,x,y,C.blue,3)).join("")}
      ${circle(170,190,61,"url(#w10d-reactor)",
        `stroke="${C.navy}" stroke-width="3" class="repair-core"`)}
      ${circle(170,190,70,"none",
        `class="repair-pulse" stroke="${C.green}" stroke-width="5"`)}
      ${circle(170,172,11,C.orange)}
      <path d="M149 208 Q149 186 170 186 Q191 186 191 208"
        fill="${C.navy}"/>
      ${txt(170,228,"GUEST HOST",12,C.ink,`text-anchor="middle"`)}
      ${units}
      <g class="fade outcome">
        ${rect(67,348,206,31,C.green,15)}
        ${txt(170,369,"OPERATING DESIGN ALIGNED",12,"white",
          `text-anchor="middle"`)}
      </g>`;
    const apply=(beat,instant)=>{
      animate(root,()=>{
        let active=0;
        if(beat>=1)active=1;
        if(beat>=2)active=2;
        if(beat>=3)active=3;
        if(beat>=4)active=4;
        if(beat>=5)active=5;
        for(let j=0;j<5;j++)show(root,`.u${j}`,j<active);
        attr(root,".repair-ring","stroke-dashoffset",729*(1-active/5));
        show(root,".repair-pulse",beat>=6);
        show(root,".outcome",beat>=6);
        attr(root,".repair-core","fill",beat>=5?"#e5f3e9":"url(#w10d-reactor)");
      },instant);
    };
    window.W10_SCENES.W10O2d={
      build(el){root=make(el,"W10O2d",body);last=-1;apply(0,true);},
      step(i,n){
        if(!root)return;
        // 0–5 contradiction; 6–11 role; 12–20 authority;
        // 21–30 measures; 31–41 capability; 42–48 adoption;
        // 49–53 integrated repair.
        const b=phase(i,n,[6,12,21,31,42,49]);
        if(b!==last){apply(b);last=b;}
      },
      reset(){if(root){last=-1;apply(0,true);}}
    };
  }

  // ================================================================
  // W10O3d — THE EVIDENCE X-RAY
  // Visual metaphor: a pristine green project dashboard rotates
  // into a diagnostic light table; evidence radiates outward.
  // Unlike the orbital assembly, this is a forensic reveal.
  // ================================================================
  {
    let root=null,last=-1;
    const evidenceNodes=[
      {x:61,y:121,value:"65%",label:"KIOSK",color:C.navy},
      {x:279,y:121,value:"29%",label:"DESK",color:C.orange},
      {x:61,y:271,value:"9/22",label:"REFERRALS",color:C.orange},
      {x:279,y:271,value:"0",label:"TESTED",color:C.orange}
    ];
    const rays=evidenceNodes.map((p,j)=>
      `<path class="evidence-ray ray${j}" d="M170 192 L${p.x} ${p.y}"
        stroke="${p.color}" stroke-width="2.5" fill="none"/>`).join("");
    const nodes=evidenceNodes.map((p,j)=>`
      <g class="evidence-node ev${j}">
        ${circle(p.x,p.y,40,C.paper,`stroke="${p.color}" stroke-width="3"`)}
        ${txt(p.x,p.y+3,p.value,22,p.color,`text-anchor="middle"`)}
        ${txt(p.x,p.y+21,p.label,12,C.ink,`text-anchor="middle"`)}
      </g>`).join("");
    const body=`
      <defs>
        <linearGradient id="w10d-glass" x2="1" y2="1">
          <stop stop-color="#dbe7f2" stop-opacity=".7"/>
          <stop offset="1" stop-color="#fbf8f1" stop-opacity=".2"/>
        </linearGradient>
      </defs>
      ${txt(170,22,"BEHIND THE GREEN STATUS",15,C.ink,
        `text-anchor="middle"`)}
      <g class="flip-face face-front on">
        ${rect(49,78,242,222,C.paper,15,
          `stroke="${C.navy}" stroke-width="3"`)}
        ${rect(49,78,242,39,C.navy,12)}
        ${txt(170,104,"PEOPLE WORKSTREAM",13,"white",
          `text-anchor="middle"`)}
        ${[0,1,2].map((j)=>`
          ${circle(86,155+j*47,13,C.green)}
          <path d="M80 ${155+j*47} l5 5 9 -11" fill="none"
            stroke="white" stroke-width="3"/>
          ${line(111,155+j*47,251,155+j*47,C.blue,13)}
        `).join("")}
        ${rect(102,318,136,37,C.green,18)}
        ${txt(170,342,"COMPLETE",15,"white",`text-anchor="middle"`)}
      </g>
      <g class="flip-face face-back">
        ${circle(170,192,76,"url(#w10d-glass)",
          `stroke="${C.navy}" stroke-width="2.5"`)}
        ${rays}
        ${circle(170,192,43,C.navy)}
        ${txt(170,188,"REAL",16,"white",`text-anchor="middle"`)}
        ${txt(170,207,"OPERATION",12,"white",`text-anchor="middle"`)}
        ${nodes}
        <g class="scanner">
          ${rect(91,187,158,6,C.orange,3,`opacity=".42"`)}
        </g>
      </g>
      <g class="fade diagnosis">
        ${rect(52,335,236,38,C.paper,18,
          `stroke="${C.orange}" stroke-width="2"`)}
        ${txt(170,359,"OBSERVE  ≠  EXPLAIN",13,C.orange,
          `text-anchor="middle"`)}
      </g>`;
    const apply=(b,instant)=>{
      animate(root,()=>{
        show(root,".face-front",b===0);
        show(root,".face-back",b>=1);
        for(let j=0;j<4;j++){
          const on=b>=j+2;
          show(root,`.ev${j}`,on);
          show(root,`.ray${j}`,on);
        }
        show(root,".scanner",b>=2&&b<6);
        show(root,".diagnosis",b>=6);
      },instant);
    };
    window.W10_SCENES.W10O3d={
      build(el){root=make(el,"W10O3d",body);last=-1;apply(0,true);},
      step(i,n){
        if(!root)return;
        // Dashboard 0–2; reveal 3–4; channels 5–6;
        // referrals 7–8; authority and incentives 9–10;
        // assessment 11–12; hypotheses 13–19;
        // evidence-based correction 20–34.
        const b=phase(i,n,[3,5,7,9,11,14]);
        if(b!==last){apply(b);last=b;}
      },
      reset(){if(root){last=-1;apply(0,true);}}
    };
  }

  // ================================================================
  // W10O3e — THE CONTROLLED HANDOVER
  // Visual metaphor: a luminous decision capsule crosses successive
  // engineering gates and enters the next framework phase.
  // Animation language: horizontal travel, gates, and transfer.
  // ================================================================
  {
    let root=null,last=-1;
    const gates=[
      {x:66,label:"ROLE"},
      {x:134,label:"RIGHTS"},
      {x:202,label:"SKILL"},
      {x:270,label:"MEASURE"}
    ];
    const body=`
      <defs>
        <linearGradient id="w10d-capsule" x1="0" x2="1">
          <stop stop-color="${C.navy}"/>
          <stop offset="1" stop-color="${C.green}"/>
        </linearGradient>
      </defs>
      ${txt(170,22,"PEOPLE → DEVELOP",16,C.ink,
        `text-anchor="middle"`)}
      ${txt(170,49,"CONTROLLED HANDOVER",12,C.navy,
        `text-anchor="middle"`)}
      ${rect(21,103,298,173,C.blue,20,`opacity=".45"`)}
      ${line(27,191,314,191,C.navy,3,`stroke-dasharray="6 7" opacity=".35"`)}
      ${gates.map((g,j)=>`
        <g class="handover-gate gate${j}">
          ${rect(g.x-22,127,44,128,C.paper,10,
            `stroke="${j%2?C.orange:C.navy}" stroke-width="2.5"`)}
          ${rect(g.x-13,145,26,91,C.blue,6)}
          ${txt(g.x,115,g.label,12,C.ink,`text-anchor="middle"`)}
          ${circle(g.x,191,9,j%2?C.orange:C.navy)}
          <path d="M${g.x-5} 191 l4 4 8 -9" stroke="white"
            stroke-width="2" fill="none"/>
        </g>`).join("")}
      <path class="handover-track" d="M25 191 H315"
        stroke="${C.green}" stroke-width="5" fill="none"
        stroke-linecap="round"/>
      <g class="handover-object capsule">
        ${rect(-25,-16,50,32,"url(#w10d-capsule)",16)}
        ${circle(-9,0,6,"white")}
        ${line(2,0,15,0,"white",3)}
        <path d="M10 -5 L17 0 L10 5" fill="none"
          stroke="white" stroke-width="2.5"/>
      </g>
      <g class="fade open-issues">
        ${rect(47,294,246,33,C.paper,12,
          `stroke="${C.orange}" stroke-width="2"`)}
        ${txt(170,315,"OPEN ISSUES STAY VISIBLE",12,C.orange,
          `text-anchor="middle"`)}
      </g>
      <g class="fade destination">
        ${rect(85,340,170,39,C.green,18)}
        ${txt(170,365,"READY FOR DEVELOP",13,"white",
          `text-anchor="middle"`)}
      </g>
      <g class="fade arrival">
        ${circle(305,191,27,C.green,`opacity=".22" class="handover-glow"`)}
      </g>`;
    const apply=(b,instant)=>{
      animate(root,()=>{
        const x=[25,66,134,202,270,305,305,305][b]??25;
        const cap=root.querySelector(".capsule");
        if(cap)cap.setAttribute("transform",`translate(${x} 191)`);
        for(let j=0;j<4;j++)
          root.querySelector(`.gate${j}`)?.classList.toggle("open",b>j+1);
        attr(root,".handover-track","stroke-dashoffset",
          Math.max(0,360-Math.max(0,x-25)*360/290));
        show(root,".open-issues",b>=5);
        show(root,".destination",b>=6);
        show(root,".arrival",b>=6);
      },instant);
    };
    window.W10_SCENES.W10O3e={
      build(el){root=make(el,"W10O3e",body);last=-1;apply(0,true);},
      step(i,n){
        if(!root)return;
        // Opening 0–1; role 2; rights 3; capability 4;
        // measures 5–7; transfer 8–11; unresolved issues 12–15;
        // future guest decision 16–21; Develop 22–27.
        const b=phase(i,n,[2,3,4,5,8,12,22]);
        if(b!==last){apply(b);last=b;}
      },
      reset(){if(root){last=-1;apply(0,true);}}
    };
  }
})();
