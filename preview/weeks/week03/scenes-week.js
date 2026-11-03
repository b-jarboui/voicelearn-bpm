// FILE w03-claude-part1.js
// OPER621 · Week 3 · Animated teaching scenes · part 1 of 3 (W3O1a, W3O1b, W3O2a, W3O2b)
// Prof. Bassem Jarboui · HBMSU · VoiceLearn
// Contract: window.VL_SCENES[secId] = { build(el), step(i, n), reset() }; one entry per narration line.
// CSS: appended to the single <style id="vl-sc-w03">, every rule scoped under .vls-w03-<secId>.
// Uses window.gsap when present (CSS transitions otherwise); honours prefers-reduced-motion.
// Standalone: this part defines every helper it uses and can be concatenated with the other parts.
(() => {
  "use strict";
  const W = window;
  W.VL_SCENES = W.VL_SCENES || {};
  const SID = "vl-sc-w03";
  const DOC = W.document;

  // ---------- environment ----------
  const RM = () => {
    try { return !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    catch (e) { return false; }
  };
  const GS = () => (W.gsap && typeof W.gsap.to === "function" && typeof W.gsap.set === "function") ? W.gsap : null;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const words = (s) => (s ? String(s).trim().split(/\s+/).filter(Boolean) : []);

  // ---------- palette ----------
  const C = {
    ink: "#18243a", navy: "#1f4e79", deep: "#14213d", teal: "#1f8a7a", mint: "#d8f1ea",
    coral: "#e4572e", peach: "#fde3d6", amber: "#f2a33a", gold: "#e9c46a", sun: "#fff1c1",
    plum: "#6b4f8c", lilac: "#e7def5", sky: "#7fb7e3", ice: "#e3f0fb", green: "#2f8f5b",
    leaf: "#58b368", pale: "#e3f4e8", red: "#c63b2b", slate: "#5d6d7e", grey: "#9aa8b6",
    mist: "#e9eef3", white: "#ffffff", paper: "#fbf8f1", cream: "#f6efdc", cork: "#c99b6d"
  };

  // ---------- SVG string helpers (all defined here, used by the scenes) ----------
  const A = (o) => Object.keys(o || {}).filter((k) => o[k] !== null && o[k] !== undefined && o[k] !== false)
    .map((k) => `${k}="${o[k]}"`).join(" ");
  const KA = (k, o, v) => (k ? `data-k="${k}"` + (o ? ` data-o="${o}"` : "") + (v ? ` data-v="1"` : "") : "");
  const R = (x, y, w, h, fill, rx, ex) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx === undefined ? 8 : rx}" fill="${fill}" ${ex || ""}/>`;
  const O = (cx, cy, r, fill, ex) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${ex || ""}/>`;
  const E = (cx, cy, rx, ry, fill, ex) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${ex || ""}/>`;
  const P = (d, s, w, ex) => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w === undefined ? 3 : w}" stroke-linecap="round" stroke-linejoin="round" ${ex || ""}/>`;
  const F = (d, fill, ex) => `<path d="${d}" fill="${fill}" ${ex || ""}/>`;
  // keyed drawable stroke: drawn by the "d" state (0..1)
  const DP = (k, d, s, w, ex) => `<path data-k="${k}" data-dr="1" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" d="${d}" fill="none" stroke="${s}" stroke-width="${w === undefined ? 3 : w}" stroke-linecap="round" stroke-linejoin="round" ${ex || ""}/>`;
  // text: o = {s:size, c:color, a:anchor, w:weight, h:halo colour, k:key, cls}
  const T = (x, y, str, o) => {
    o = o || {};
    const halo = o.h ? ` stroke="${o.h}" stroke-width="${o.hw || 5}" stroke-linejoin="round" paint-order="stroke"` : "";
    return `<text x="${x}" y="${y}" text-anchor="${o.a || "middle"}" font-size="${o.s || 16}" font-weight="${o.w || 750}" fill="${o.c || C.ink}"${halo} ${KA(o.k, o.o, o.v)} ${o.cls ? `class="${o.cls}"` : ""} ${o.ex || ""}>${str}</text>`;
  };
  // keyed group: k = key, inner = svg string, o = transform origin, v = visible by default, cls = class on inner wrapper
  const K = (k, inner, o, v, cls) => `<g ${KA(k, o, v)}><g class="vx-i${cls ? " " + cls : ""}">${inner}</g></g>`;
  const Gc = (cls, inner, ex) => `<g class="${cls}" ${ex || ""}>${inner}</g>`;
  const TR = (x, y, inner, s) => `<g transform="translate(${x} ${y})${s ? ` scale(${s})` : ""}">${inner}</g>`;
  const person = (x, y, c, s, ex) => TR(x, y, O(0, -15, 9, c) + F("M-14 14 Q-14 -3 0 -3 Q14 -3 14 14 Z", c), s || 1);
  const face = (r, mood) => {
    const e = r * 0.32, ey = -r * 0.12, er = Math.max(1.6, r * 0.13);
    const mouth = mood === "sad" ? P(`M${-r * 0.3} ${r * 0.42} Q0 ${r * 0.18} ${r * 0.3} ${r * 0.42}`, C.ink, 1.8)
      : mood === "flat" ? P(`M${-r * 0.25} ${r * 0.34} H${r * 0.25}`, C.ink, 1.8)
      : P(`M${-r * 0.3} ${r * 0.26} Q0 ${r * 0.55} ${r * 0.3} ${r * 0.26}`, C.ink, 1.8);
    return O(-e, ey, er, C.ink) + O(e, ey, er, C.ink) + mouth;
  };
  const tick = (x, y, c, w) => P(`M${x - 8} ${y} l6 6 l11 -13`, c || C.green, w || 3.5);
  const cross = (x, y, c, w) => P(`M${x - 6} ${y - 6} l12 12 M${x + 6} ${y - 6} l-12 12`, c || C.coral, w || 3.5);
  const glowDef = (id, c1, c2) => `<radialGradient id="${id}"><stop offset="0" stop-color="${c1}" stop-opacity="1"/><stop offset="1" stop-color="${c2 || c1}" stop-opacity="0"/></radialGradient>`;
  const linDef = (id, c1, c2, vert) => `<linearGradient id="${id}" x1="0" y1="0" x2="${vert ? 0 : 1}" y2="${vert ? 1 : 0}"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`;
  const BG = (fill) => R(-600, -500, 1600, 1300, fill, 0);

  // ---------- one shared <style id="vl-sc-w03">, rules scoped per section ----------
  const KF = [
    "@keyframes vlw03pop{0%{transform:scale(1)}35%{transform:scale(1.16)}70%{transform:scale(.97)}100%{transform:scale(1)}}",
    "@keyframes vlw03ring{0%{opacity:.95;transform:scale(.2)}100%{opacity:0;transform:scale(1.7)}}",
    "@keyframes vlw03spin{to{transform:rotate(360deg)}}",
    "@keyframes vlw03spinr{to{transform:rotate(-360deg)}}",
    "@keyframes vlw03bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}",
    "@keyframes vlw03flow{to{stroke-dashoffset:-28}}",
    "@keyframes vlw03blink{0%,100%{opacity:1}50%{opacity:.25}}",
    "@keyframes vlw03swing{from{transform:rotate(-24deg)}to{transform:rotate(24deg)}}",
    "@keyframes vlw03tw{0%,100%{opacity:.25;transform:scale(.6)}50%{opacity:1;transform:scale(1.15)}}",
    "@keyframes vlw03wob{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}",
    "@keyframes vlw03pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}",
    "@keyframes vlw03drift{0%{transform:translateX(0)}100%{transform:translateX(-80px)}}",
    "@keyframes vlw03rise{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(-30px);opacity:0}}",
    "@keyframes vlw03shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-2px)}75%{transform:translateX(2px)}}",
    "@keyframes vlw03chip{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}"
  ];
  const BASE = [
    "&{position:relative;display:flex;flex-direction:column;width:100%;height:100%;min-height:0;overflow:hidden;box-sizing:border-box;border-radius:14px;font-family:inherit;}",
    "& *{box-sizing:border-box;}",
    "& .vx-hd{flex:0 0 auto;display:flex;align-items:center;gap:10px;padding:7px 12px 5px;min-height:32px;}",
    "& .vx-chip{flex:0 1 auto;max-width:86%;padding:4px 11px;border-radius:999px;font-size:13px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.3;}",
    "& .vx-chip.go{animation:vlw03chip .45s ease-out 1;}",
    "& .vx-pg{flex:1 1 auto;height:4px;border-radius:2px;overflow:hidden;min-width:24px;}",
    "& .vx-pgb{height:100%;width:0;border-radius:2px;transition:width .6s ease;}",
    "& .vx-svg{flex:1 1 0;display:block;width:100%;height:100%;min-height:150px;overflow:hidden;}",
    "& .vx-svg text{font-family:inherit;pointer-events:none;}",
    "& [data-k]{transform-box:fill-box;transform-origin:50% 50%;transition:transform .85s cubic-bezier(.45,0,.15,1),opacity .55s ease,fill .55s ease,stroke .55s ease,stroke-dashoffset 1.15s cubic-bezier(.45,0,.2,1);}",
    "&.vx-inst [data-k],&.vx-g [data-k]{transition:none!important;}",
    "& .vx-i{transform-box:fill-box;transform-origin:50% 50%;}",
    "& .vx-pop{animation:vlw03pop .62s cubic-bezier(.3,1.5,.5,1) 1;}",
    "& .vx-ring{fill:none;stroke-width:3;opacity:0;transform-box:fill-box;transform-origin:50% 50%;pointer-events:none;}",
    "& .vx-ring.go{animation:vlw03ring .95s ease-out 1;}",
    "& .vx-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlw03spin 9s linear infinite;}",
    "& .vx-spinr{transform-box:fill-box;transform-origin:50% 50%;animation:vlw03spinr 7s linear infinite;}",
    "& .vx-bob{animation:vlw03bob 2.6s ease-in-out infinite;}",
    "& .vx-flow{stroke-dasharray:6 8;animation:vlw03flow 1.1s linear infinite;}",
    "& .vx-fast{animation-duration:.35s!important;}",
    "& .vx-blink{animation:vlw03blink 1.4s ease-in-out infinite;}",
    "& .vx-swing{transform-box:fill-box;transform-origin:50% 100%;animation:vlw03swing 1.1s ease-in-out infinite alternate;}",
    "& .vx-tw{transform-box:fill-box;transform-origin:50% 50%;animation:vlw03tw 1.9s ease-in-out infinite;}",
    "& .vx-wob{transform-box:fill-box;transform-origin:50% 50%;animation:vlw03wob 1.3s ease-in-out infinite;}",
    "& .vx-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlw03pulse 1.6s ease-in-out infinite;}",
    "& .vx-drift{animation:vlw03drift 3s linear infinite;}",
    "& .vx-rise{animation:vlw03rise 2.4s ease-out infinite;}",
    "& .vx-shake{animation:vlw03shake .35s linear infinite;}",
    "@media (max-width:420px){& .vx-chip{font-size:12px;letter-spacing:.05em;}& .vx-hd{padding:6px 10px 4px;}}",
    "@media (max-width:360px){& .vx-chip{font-size:11px;letter-spacing:.03em;padding:4px 9px;}}",
    "@media (prefers-reduced-motion:reduce){& *,& *::before,& *::after{animation:none!important;transition:none!important;}}"
  ];
  function installCss(ids, marker, extra) {
    if (!DOC) return;
    let s = DOC.getElementById(SID);
    if (!s) {
      s = DOC.createElement("style");
      s.id = SID;
      (DOC.head || DOC.documentElement).appendChild(s);
    }
    if (s.textContent.indexOf("/*" + marker + "*/") >= 0) return;
    const sc = (rule) => ids.map((id) => rule.split("&").join(".vls-w03-" + id)).join("\n");
    s.textContent += "\n/*" + marker + "*/\n" + KF.join("\n") + "\n" + BASE.map(sc).join("\n") + "\n" + (extra || []).join("\n");
  }

  // ---------- scene engine ----------
  // def.frames: one entry per narration line: {L:"2-4 word chip", on:"keys", off:"keys", s:{key:{props}}, pop:"keys", ring:[x,y,colour]}
  // props: o opacity, x y translate, r rotate, sc scale, sx sy, d draw 0..1, f fill, st stroke, t text, n number (nd decimals, ns suffix, np prefix), dl delay (this line only)
  const DEF = { o: 0, x: 0, y: 0, r: 0, sc: 1, sx: 1, sy: 1 };
  const TIMING = { dl: 1, du: 1 };
  function register(id, def) {
    const N = def.frames.length;
    const states = [], labels = [], timing = [], orders = [];
    let acc = {}, lab = def.title || "";
    def.frames.forEach((f) => {
      const nx = {};
      for (const k in acc) nx[k] = Object.assign({}, acc[k]);
      const ord = [], tm = {};
      const touch = (k) => { if (ord.indexOf(k) < 0) ord.push(k); };
      words(f.off).forEach((k) => { nx[k] = Object.assign({}, nx[k], { o: 0 }); touch(k); });
      words(f.on).forEach((k) => { nx[k] = Object.assign({}, nx[k], { o: 1 }); touch(k); });
      const s = f.s || {};
      Object.keys(s).forEach((ks) => words(ks).forEach((k) => {
        const p = Object.assign({}, s[ks]);
        Object.keys(TIMING).forEach((t) => { if (p[t] !== undefined) { tm[k] = tm[k] || {}; tm[k][t] = p[t]; delete p[t]; } });
        nx[k] = Object.assign({}, nx[k], p);
        touch(k);
      }));
      if (f.L) lab = f.L;
      acc = nx;
      states.push(nx); labels.push(lab); timing.push(tm); orders.push(ord);
    });

    let root = null, chip = null, bar = null, map = {}, cur = {}, idx = -1, timers = [], rings = [], ringI = 0;
    const later = (fn, ms) => { timers.push(W.setTimeout(fn, ms)); };
    const clearTimers = () => { timers.forEach((t) => W.clearTimeout(t)); timers = []; };

    function full(k, s) {
      const n = map[k];
      const base = Object.assign({}, DEF);
      if (n && n.hasAttribute("data-v")) base.o = 1;
      if (n && n.hasAttribute("data-dr")) { base.o = 1; base.d = 0; }
      return Object.assign(base, s || {});
    }
    function counter(n, t, inst) {
      const to = +t.n, dec = t.nd || 0, pre = t.np || "", suf = t.ns || "";
      const fmt = (v) => pre + v.toFixed(dec) + suf;
      const from = (typeof n._v === "number") ? n._v : to;
      n._v = to;
      if (n._tw && n._tw.kill) n._tw.kill();
      if (n._raf) W.cancelAnimationFrame(n._raf);
      if (inst || from === to || !W.requestAnimationFrame) { n.textContent = fmt(to); return; }
      const g = GS();
      if (g) {
        const o = { v: from };
        n._tw = g.to(o, { v: to, duration: 1.2, ease: "power2.out", onUpdate: () => { n.textContent = fmt(o.v); } });
        return;
      }
      const t0 = W.performance ? W.performance.now() : Date.now();
      const stepF = (now) => {
        const p = clamp((now - t0) / 1200, 0, 1), e = 1 - Math.pow(1 - p, 3);
        n.textContent = fmt(from + (to - from) * e);
        if (p < 1) n._raf = W.requestAnimationFrame(stepF);
      };
      n._raf = W.requestAnimationFrame(stepF);
    }
    function setNode(n, t, inst, delay, du) {
      const dr = n.hasAttribute("data-dr");
      const op = dr && !(t.d > 0.001) ? 0 : t.o;
      const sx = t.sc * t.sx, sy = t.sc * t.sy;
      const g = GS();
      if (g) {
        const v = { x: t.x, y: t.y, rotation: t.r, scaleX: sx, scaleY: sy, opacity: op, transformOrigin: n.getAttribute("data-o") || "50% 50%" };
        if (t.f) v.fill = t.f;
        if (t.st) v.stroke = t.st;
        if (dr) v.strokeDashoffset = 1 - (t.d || 0);
        if (inst) { if (g.killTweensOf) g.killTweensOf(n); g.set(n, v); }
        else g.to(n, Object.assign(v, { duration: du || 0.85, delay: delay, ease: "power2.inOut", overwrite: "auto" }));
      } else {
        n.style.transitionDelay = inst ? "0s" : delay.toFixed(2) + "s";
        n.style.transitionDuration = !inst && du ? du + "s" : "";
        n.style.transform = `translate(${t.x}px,${t.y}px) rotate(${t.r}deg) scale(${sx},${sy})`;
        n.style.opacity = String(op);
        if (t.f) n.style.fill = t.f;
        if (t.st) n.style.stroke = t.st;
        if (dr) n.style.strokeDashoffset = String(1 - (t.d || 0));
      }
      if (t.t !== undefined && n.textContent !== String(t.t)) n.textContent = String(t.t);
      if (t.n !== undefined) counter(n, t, inst);
    }
    function pop(k, delay) {
      const n = map[k];
      if (!n) return;
      const inner = n.querySelector(".vx-i") || n;
      later(() => { inner.classList.remove("vx-pop"); void inner.getBoundingClientRect(); inner.classList.add("vx-pop"); }, delay * 1000);
    }
    function ring(spec, delay) {
      if (!spec || !rings.length) return;
      const list = Array.isArray(spec[0]) ? spec : [spec];
      list.forEach((r, j) => {
        const c = rings[(ringI++) % rings.length];
        later(() => {
          c.setAttribute("cx", r[0]); c.setAttribute("cy", r[1]);
          c.setAttribute("r", r[3] || 26);
          c.setAttribute("stroke", r[2] || def.ring || C.coral);
          c.classList.remove("go"); void c.getBoundingClientRect(); c.classList.add("go");
        }, (delay + j * 0.18) * 1000);
      });
    }
    function setLabel(txt, inst) {
      if (!chip || chip.textContent === txt) return;
      chip.textContent = txt;
      chip.classList.remove("go");
      if (!inst) { void chip.offsetWidth; chip.classList.add("go"); }
    }
    function apply(i, inst) {
      const rm = RM();
      inst = !!inst || rm;
      const g = GS();
      root.classList.toggle("vx-g", !!g);
      if (inst) {
        clearTimers();
        root.classList.add("vx-inst");
        rings.forEach((c) => c.classList.remove("go"));
        root.querySelectorAll(".vx-pop").forEach((n) => n.classList.remove("vx-pop"));
      }
      const st = states[i], ord = orders[i], tm = timing[i];
      Object.keys(map).forEach((k) => {
        const t = full(k, st[k]);
        const js = JSON.stringify(t);
        if (!inst && cur[k] === js) return;
        const oi = ord.indexOf(k);
        const tk = tm[k] || {};
        const delay = inst ? 0 : (oi > 0 ? Math.min(oi * 0.06, 0.7) : 0) + (tk.dl || 0);
        setNode(map[k], t, inst, delay, tk.du);
        cur[k] = js;
      });
      if (inst) { void root.offsetWidth; root.classList.remove("vx-inst"); }
      setLabel(labels[i], inst);
      if (bar) bar.style.width = (((i + 1) / N) * 100).toFixed(1) + "%";
      if (!inst) {
        const f = def.frames[i];
        words(f.pop).forEach((k, j) => pop(k, 0.25 + j * 0.08));
        ring(f.ring, 0.3);
      }
      idx = i;
    }
    W.VL_SCENES[id] = {
      build(el) {
        if (!el || !DOC) return;
        clearTimers();
        const th = def.theme || {};
        root = DOC.createElement("div");
        root.className = "vls-w03 vls-w03-" + id;
        root.innerHTML =
          `<div class="vx-hd"><span class="vx-chip" aria-live="polite" style="background:${th.chipBg || C.navy};color:${th.chipFg || C.white}"></span>` +
          `<span class="vx-pg" aria-hidden="true" style="background:${th.track || "rgba(31,78,121,.15)"}"><span class="vx-pgb" style="display:block;background:${th.bar || C.coral}"></span></span></div>` +
          `<svg class="vx-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${def.aria || id}">` +
          def.art() +
          `<g aria-hidden="true">${[0, 1, 2].map(() => `<circle class="vx-ring" cx="200" cy="150" r="26" stroke="${C.coral}"/>`).join("")}</g></svg>`;
        if (typeof el.replaceChildren === "function") el.replaceChildren(root);
        else { el.innerHTML = ""; el.appendChild(root); }
        chip = root.querySelector(".vx-chip");
        bar = root.querySelector(".vx-pgb");
        rings = Array.from(root.querySelectorAll(".vx-ring"));
        map = {}; cur = {};
        root.querySelectorAll("[data-k]").forEach((n) => {
          map[n.getAttribute("data-k")] = n;
          const o = n.getAttribute("data-o");
          if (o) n.style.transformOrigin = o;
        });
        apply(0, true);
      },
      step(i, n) {
        if (!root) return;
        const nn = Number.isFinite(+n) && +n > 0 ? Math.floor(+n) : N;
        let ii = Number.isFinite(+i) ? Math.floor(+i) : 0;
        ii = clamp(ii, 0, nn - 1);
        if (nn !== N) ii = Math.round((ii * (N - 1)) / Math.max(1, nn - 1));
        ii = clamp(ii, 0, N - 1);
        if (ii === idx) return;
        apply(ii, false);
      },
      reset() { if (root) apply(0, true); }
    };
  }

  const css = [];
  // =====================================================================
  // W3O1a · "The self-playing piano"
  // Technique: musical score + playhead + metronome rhythm (concert hall).
  // Metaphor: the process is the melody, the BPMS is the instrument, BPM is
  // the conductor. A gleaming self-playing piano plays the same sour notes
  // faster; its pre-punched roll quietly becomes the score nobody chose.
  // =====================================================================
  {
    const HALL = "#1b1f3d", FLOOR = "#262b52", LIGHT = "#f4ecd8", DIM = "#aab3d6";
    const note = (x, y, c, up) => E(x, y, 9, 6.5, c, `transform="rotate(-22 ${x} ${y})"`) + P(`M${x + 8} ${y - 2} V${y - (up || 32)}`, c, 2.5);
    const staff = (x1, x2, y0, gap, col, kp) => [0, 1, 2, 3, 4].map((j) =>
      kp ? DP(kp + j, `M${x1} ${y0 + j * gap} H${x2}`, col, 1.6) : P(`M${x1} ${y0 + j * gap} H${x2}`, col, 1.6)).join("");
    const sour = (x, y) => Gc("vx-wob", P(`M${x - 10} ${y - 44} l5 -6 5 6 5 -6 5 6`, C.coral, 2.2));
    const piano = () => {
      const leg = "#7a5a18";
      return E(0, 46, 98, 7, "rgba(0,0,0,.35)") +
        R(-80, 12, 9, 34, leg, 2) + R(70, 12, 9, 34, leg, 2) + R(-6, 12, 8, 26, leg, 2) + R(-14, 36, 24, 4, leg, 2) +
        F("M-62 -14 L94 -14 L-18 -84 Z", "url(#w3a-lid)") + P("M-62 -14 L-18 -84 L94 -14", "#fff3c9", 1.5, `opacity=".55"`) +
        P("M44 -14 L30 -50", leg, 3) +
        F("M-92 -14 H44 C74 -14 96 -8 98 4 C99 14 92 18 82 18 H-92 Z", "url(#w3a-body)") +
        P("M-92 2 H96", "#a8821f", 2) +
        R(-92, -22, 50, 9, C.white, 2) + [0, 1, 2, 3, 4].map((j) => R(-88 + j * 9, -22, 4.5, 6, C.ink, 0.5)).join("") +
        K("layers", [C.teal, C.sky, C.coral, C.amber, C.plum].map((c, j) => F(`M${-40 + j * 4} ${-92 - j * 13} h96 l22 -9 h-96 z`, c, `stroke="#ffffff" stroke-width="1.2" opacity=".95"`)).join(""), "50% 100%") +
        K("phone", R(-80, -64, 28, 42, C.ink, 5) + R(-77, -60, 22, 32, "#bfe3ff", 3) + tick(-66, -44, C.green, 2.6)) +
        P("M-66 -22 V-14", leg, 3);
    };
    const mini = () => E(0, 20, 30, 4, "rgba(0,0,0,.35)") + R(-26, -6, 52, 14, C.gold, 4) + F("M14 -6 Q30 -6 30 4 V8 H14Z", C.gold) +
      R(-26, -11, 20, 6, C.white, 1) + R(-22, 8, 4, 12, "#8a6a1f", 1) + R(18, 8, 4, 12, "#8a6a1f", 1) + P("M-4 -6 L26 -20", "#d4ad48", 4);
    const token = () =>
      K("gClock", O(0, -42, 11, C.white, `stroke="${C.coral}" stroke-width="2.5"`) + Gc("vx-spin", P("M0 -42 V-50", C.coral, 2.2), `style="transform-origin:0px -42px;transform-box:view-box"`) + P("M0 -42 H5", C.ink, 2)) +
      O(0, 0, 17, "#ffd6a5") + R(16, -1, 13, 16, C.coral, 3) + P("M19 -1 V-5 H26 V-1", C.coral, 1.8) +
      K("gSad", face(17, "sad"), null, true) + K("gHappy", face(17, "happy"));
    const people = (xs, c) => xs.map((x) => person(x, 222, c, 1.1)).join("");

    const art = () =>
      `<defs>${glowDef("w3a-spot", "#3a4590", "#1b1f3d")}${linDef("w3a-lid", "#f7dc8a", "#c99a2e", true)}${linDef("w3a-body", "#f0cf6c", "#b8891f", true)}</defs>` +
      BG(HALL) + E(200, 150, 330, 230, "url(#w3a-spot)") + R(-600, 256, 1600, 500, FLOOR, 0) + P("M-600 256 H1000", "#3a4180", 2) +
      // curtains at the edges of the hall
      F("M-600 -500 H-2 Q12 60 -4 300 H-600Z", "#5a1f3a") + F("M1000 -500 H402 Q388 60 404 300 H1000Z", "#5a1f3a") +
      // ---- painted backdrop: Qasr Marina ----
      K("backdrop", R(262, 160, 110, 96, "#2c3266", 4) + Array.from({ length: 12 }, (_, j) => R(274 + (j % 4) * 24, 172 + Math.floor(j / 4) * 24, 12, 12, j % 5 ? "#3f4788" : "#f6d98b", 2)).join("") +
        P("M240 256 C238 220 236 200 244 176", "#3f4788", 4) + F("M244 176 q-22 -4 -30 8 q14 -6 30 -8 q-10 -14 -28 -12 q16 2 28 12 q6 -18 22 -20 q-10 8 -22 20 q20 -6 30 4 q-16 -2 -30 -4z", "#3f4788") +
        "", null, true) +
      T(317, 150, "Qasr Marina", { s: 15, c: DIM, k: "qm", v: true }) +
      // ---- act A: the guest's melody ----
      K("actA",
        staff(30, 370, 50, 10, DIM, "aL") +
        K("n1", note(80, 80, C.leaf)) +
        K("n2", note(160, 60, C.coral) + sour(160, 60)) +
        K("n3", note(240, 70, C.coral) + sour(240, 70)) +
        K("n4", note(320, 50, C.coral) + sour(320, 50)) +
        T(80, 114, "Arrives", { s: 15, c: LIGHT, k: "la1" }) +
        T(160, 136, "Booking mix-up", { s: 15, c: "#ffb59e", k: "la2" }) +
        T(240, 114, "Checks again", { s: 15, c: "#ffb59e", k: "la3" }) +
        T(320, 136, "Room not ready", { s: 15, c: "#ffb59e", k: "la4" }) +
        K("breaks", R(196, 46, 8, 48, HALL, 0) + R(276, 46, 8, 48, HALL, 0) + P("M200 44 l-5 12 9 8 -8 10 6 10 -4 10", C.coral, 2.4) + P("M280 44 l-5 12 9 8 -8 10 6 10 -4 10", C.coral, 2.4)) +
        K("glass", R(212, 26, 150, 70, "rgba(220,235,255,.42)", 12, `stroke="#ffffff" stroke-opacity=".7" stroke-width="1.5"`) + P("M228 90 L262 32 M246 90 L280 32", "#ffffff", 3, `opacity=".45"`)), null, true) +
      // ---- GM and his wish ----
      K("gm", person(52, 236, "#9fb4ff", 1.25) + P("M52 226 l-3 10 3 6 3 -6z", C.coral, 1.5)) +
      K("bubble", O(84, 196, 4, C.white) + O(96, 184, 6, C.white) + R(100, 150, 156, 34, C.white, 17) + T(178, 173, "Tech will fix it", { s: 16, c: C.ink })) +
      // ---- metronome ----
      K("metro", F("M-20 40 L-9 -40 H9 L20 40Z", "#b98a3a") + R(-14, 0, 28, 30, "#7d5a20", 3) +
        K("arm1", Gc("vx-swing", P("M0 30 V-44", LIGHT, 3) + R(-5, -26, 10, 8, C.coral, 2)), null, true) +
        K("arm4", Gc("vx-swing vx-fast", P("M0 30 V-44", LIGHT, 3) + R(-5, -26, 10, 8, C.coral, 2)))) +
      T(150, 206, "×1", { s: 26, c: C.gold, k: "speed" }) +
      T(110, 288, "Faster, still sour", { s: 16, c: "#ffb59e", k: "fss" }) +
      // ---- pause badge ----
      K("pause", O(120, 190, 25, "rgba(255,255,255,.92)") + R(110, 178, 7, 24, C.navy, 2) + R(123, 178, 7, 24, C.navy, 2)) +
      // ---- audience ----
      K("aud", [60, 102, 144, 186].map((x) => O(x, 282, 12, "#ffd6a5") + TR(x, 282, face(12, "happy"))).join("")) +
      // ---- act C: conductor and instrument ----
      K("cond", R(58, 250, 64, 12, "#4a4f86", 3) + person(90, 232, "#9fb4ff", 1.3) +
        Gc("vx-wob", P("M102 212 L128 186 L146 168", C.gold, 3), `style="transform-origin:102px 212px;transform-box:view-box"`) +
        T(90, 140, "BPM", { s: 28, c: C.gold })) +
      K("disc", T(90, 162, "Discipline", { s: 15, c: LIGHT }) +
        Gc("vx-spin", P("M90 172 A42 42 0 0 1 132 214", C.gold, 2.5) + P("M126 206 L132 215 L138 206", C.gold, 2.5) +
          P("M90 256 A42 42 0 0 1 48 214", C.gold, 2.5) + P("M42 222 L48 213 L54 222", C.gold, 2.5), `style="transform-origin:90px 214px;transform-box:view-box"`)) +
      K("bpmsT", T(342, 98, "BPMS", { s: 28, c: LIGHT }) + T(342, 118, "Software", { s: 15, c: DIM })) +
      K("card", R(104, 14, 170, 70, C.paper, 10) + staff(118, 262, 30, 8, "#b7b0a0") +
        note(140, 54, C.navy, 22) + note(180, 46, C.navy, 22) + note(215, 50, C.navy, 22) + note(250, 38, C.navy, 22) +
        DP("strike", "M168 26 L228 70 M228 26 L168 70", C.coral, 4)) +
      T(80, 110, "People decide", { s: 16, c: C.gold, k: "pdec" }) +
      // ---- act D: retyping, faster ----
      K("actD",
        staff(40, 360, 40, 10, DIM) +
        note(90, 70, C.leaf) + K("d1", note(175, 60, C.amber)) + K("d2", note(215, 60, C.amber)) + note(300, 50, C.leaf) +
        K("echo", note(186, 60, "rgba(242,163,58,.45)") + note(226, 60, "rgba(242,163,58,.45)") + note(197, 60, "rgba(242,163,58,.25)") + note(237, 60, "rgba(242,163,58,.25)")) +
        K("streaks", Gc("vx-drift", [0, 1, 2, 3].map((j) => P(`M${120 + j * 60} ${44 + j * 11} H${190 + j * 60}`, "#ffffff", 2, `opacity=".5"`)).join("") +
          [0, 1, 2, 3].map((j) => P(`M${200 + j * 60} ${50 + j * 9} H${270 + j * 60}`, "#ffffff", 2, `opacity=".35"`)).join(""))) +
        T(90, 104, "Booking", { s: 15, c: LIGHT }) + T(195, 104, "Retype ×2", { s: 15, c: C.amber }) + T(300, 104, "Key", { s: 15, c: LIGHT }) +
        T(200, 134, "Breaks faster", { s: 17, c: "#ffb59e", k: "dMsg" })) +
      [0, 1, 2].map((j) => K("coin" + j, O(0, 0, 9, C.gold, `stroke="#b98a3a" stroke-width="2"`) + T(0, 5, "$", { s: 14, c: "#7d5a20" }))).join("") +
      // ---- act E: ten bars of the framework ----
      K("actE",
        staff(40, 380, 56, 14, DIM, "eL") +
        [[1, C.coral], [4, C.leaf], [5, C.leaf], [7, C.gold]].map(([k, c]) => R(40 + 34 * (k - 1), 56, 34, 56, c, 0, KA("hb" + k))).join("") +
        Array.from({ length: 11 }, (_, k) => P(`M${40 + 34 * k} 56 V112`, DIM, 1.4)).join("") +
        Array.from({ length: 10 }, (_, k) => K("bn" + (k + 1), O(57 + 34 * k, 136, 13, "#33396a", `stroke="${DIM}" stroke-width="1.5"`) + T(57 + 34 * k, 141, String(k + 1), { s: 15, c: LIGHT }), null, true)).join("") +
        T(159, 44, "Understand", { s: 15, c: "#9be3b0", k: "lU" }) +
        T(193, 174, "Innovate", { s: 15, c: "#9be3b0", k: "lI" }) +
        T(261, 44, "Develop", { s: 15, c: C.gold, k: "lD" }) +
        T(57, 174, "Strategy", { s: 15, c: "#ffb59e", k: "lS" }) +
        K("roll", R(40, 256, 340, 18, C.cream, 3) + Array.from({ length: 16 }, (_, k) => R(52 + k * 20, 259 + (k * 7) % 8, 10, 4, "#5c4a2a", 1)).join(""), "0% 50%") +
        K("vendor", person(370, 246, C.amber, 1.1) + P("M358 254 L378 262", C.amber, 3)) +
        T(200, 294, "Who designs?", { s: 17, c: C.gold, k: "who" })) +
      K("mini", mini()) +
      T(261, 248, "Tech enters", { s: 15, c: C.gold, k: "tEnt" }) +
      T(57, 248, "Too early", { s: 15, c: "#ffb59e", k: "tEar" }) +
      // ---- act F: Noor Health ----
      K("actF",
        T(200, 34, "Noor Health", { s: 20, c: "#8fe0cf" }) +
        K("hosp", [60, 130, 200, 270, 340].map((x) => R(x - 18, 56, 36, 30, "#d9f2ec", 4) + R(x - 4, 61, 8, 18, C.teal, 1) + R(x - 9, 66, 18, 8, C.teal, 1)).join(""), null, true) +
        K("tag", P("M262 181 L330 148", C.gold, 1.5) + R(300, 120, 88, 28, C.gold, 6) + T(344, 140, "AED 6.2M", { s: 16, c: C.ink })) +
        K("book", R(40, 132, 58, 46, "#e9dfc7", 4) + R(40, 132, 9, 46, "#a08c5c", 2) + T(73, 161, "2019", { s: 15, c: C.ink }) + T(69, 198, "Manual", { s: 15, c: LIGHT })) +
        K("arrowF", P("M106 156 H140", C.gold, 3) + P("M132 148 L141 156 L132 164", C.gold, 3)) +
        K("stack", [0, 1, 2, 3].map((j) => R(150 + j * 5, 128 + j * 5, 42, 34, C.paper, 3, `stroke="#b7b0a0" stroke-width="1"`)).join("") +
          T(186, 198, "0 models", { s: 15, c: LIGHT, k: "cnt" })) +
        K("fence", P("M252 120 V214", "#ffb59e", 2.5, `stroke-dasharray="6 6"`) + O(252, 167, 10, HALL, `stroke="#ffb59e" stroke-width="2"`) + cross(252, 167, "#ffb59e", 2.5)) +
        K("clin", person(300, 162, "#7fe0b8", 1.05) + person(340, 162, "#7fe0b8", 1.05) + person(320, 184, "#7fe0b8", 1.05) + T(320, 220, "Clinicians", { s: 15, c: "#7fe0b8" })) +
        K("waves",
          T(24, 244, "On paper", { s: 15, c: LIGHT, a: "start" }) +
          P("M130 240 " + Array.from({ length: 8 }, (_, k) => `q14 -10 28 0`).join(" "), "#bfe3ff", 2.5) +
          T(24, 278, "On the ward", { s: 15, c: "#ffb59e", a: "start" }) +
          P("M130 274 q8 -16 16 2 q10 18 22 -6 q6 -14 18 4 q12 20 24 -10 q8 -12 20 6 q10 14 22 -4 q8 -10 18 2 q8 10 18 -2", C.coral, 2.5)) +
        K("neq", O(372, 258, 15, C.coral) + T(372, 264, "≠", { s: 20, c: C.white }))) +
      // ---- act G: people, foundation, the suite inside ----
      K("crowd", people([36, 72], "#9fb4ff") + people([328, 364], "#7fe0b8")) +
      [["Understand", 104], ["Accept", 200], ["Improve", 296]].map(([w, x], j) =>
        K("fb" + j, R(x - 47, 248, 94, 30, ["#2a9d8f", "#4f6fd6", "#b0569b"][j], 7) + T(x, 268, w, { s: 15, c: C.white }))).join("") +
      K("hidden", staff(40, 360, 34, 9, DIM) + note(120, 61, C.coral, 26) + note(200, 52, C.coral, 26) + note(280, 70, C.coral, 26) +
        R(150, 22, 220, 60, "rgba(220,235,255,.5)", 12, `stroke="#ffffff" stroke-opacity=".8" stroke-width="1.5"`) + P("M170 78 L196 26 M190 78 L216 26", "#ffffff", 3, `opacity=".5"`)) +
      T(200, 104, "Hidden, not fixed", { s: 17, c: "#ffb59e", k: "hidT" }) +
      T(200, 40, "Five layers inside", { s: 17, c: C.gold, k: "layT" }) +
      // ---- shared actors ----
      K("guest", token()) +
      K("piano", piano()) +
      K("sheet", R(-13, -17, 26, 34, C.paper, 3) + P("M-8 -9 H8 M-8 -3 H8 M-8 3 H8 M-8 9 H4", "#8a8a8a", 1.4)) +
      K("spark", [[150, 150], [312, 140], [140, 196], [330, 206], [230, 128]].map(([x, y], j) =>
        Gc("vx-tw", P(`M${x} ${y - 8} V${y + 8} M${x - 8} ${y} H${x + 8}`, j % 2 ? C.gold : "#ffffff", 2.5), `style="animation-delay:${j * 0.3}s"`)).join(""));

    const aL = "aL0 aL1 aL2 aL3 aL4", eL = "eL0 eL1 eL2 eL3 eL4";
    const dAll = (keys, d) => { const o = {}; o[keys] = { d: d }; return o; };
    const S = (...objs) => Object.assign({}, ...objs);
    const frames = [
      // 0 welcome: the hall, the staff draws itself
      { L: "Week 3 begins", s: S(dAll(aL, 1), { guest: { o: 1, x: 44, y: 236 }, piano: { x: 560, y: 210 }, metro: { x: 90, y: 214 }, sheet: { x: 146, y: 176 }, mini: { x: 261, y: 170, sc: 1.25 }, layers: { y: 24 }, coin0: { x: 270, y: 120 }, coin1: { x: 296, y: 110 }, coin2: { x: 322, y: 120 } }) },
      // 1 the exhausted traveller waits
      { L: "The traveller waits", on: "gClock", pop: "guest", ring: [44, 236, C.gold] },
      // 2 her melody: sour notes, she hops note to note
      { L: "Her sour melody", on: "n1 n2 n3 n4 la1 la2 la3 la4", off: "qm", s: { guest: { x: 200 }, gClock: { o: 0 } }, pop: "n2 n3 n4" },
      // 3 the GM wishes technology would fix it
      { L: "One big fix?", on: "gm bubble", pop: "bubble" },
      // 4 the vendor rolls in a self-playing piano
      { L: "The vendor's demo", off: "bubble gm", s: { piano: { o: 1, x: 250 }, guest: { x: 44 }, backdrop: { o: 0 } }, ring: [250, 180, C.gold] },
      // 5 beautiful, effortless
      { L: "Looks effortless", on: "spark aud", s: { actA: { o: 0.35 } }, pop: "phone" },
      // 6 pause before buying
      { L: "Pause first", off: "spark", on: "pause", pop: "pause" },
      // 7 the broken links are still there
      { L: "Links still broken", off: "pause aud", s: { actA: { o: 1 } }, on: "breaks", pop: "n2 n3 n4", ring: [[200, 70], [280, 70]] },
      // 8 the piano plays the same notes, faster
      { L: "Faster, still sour", on: "metro fss glass", s: { guest: { x: 44 } }, pop: "n2 n3 n4" },
      // 9 BPM: the conductor
      { L: "Meet BPM", off: "actA metro fss guest glass breaks", on: "cond", s: { piano: { x: 290 } } },
      // 10 a management discipline
      { L: "A discipline", on: "disc", pop: "cond" },
      // 11 BPMS: the instrument
      { L: "BPMS: the instrument", on: "bpmsT sheet", pop: "piano", ring: [290, 200, C.gold] },
      // 12 it plays the agreed score
      { L: "Plays the agreed score", s: { sheet: { x: 226, y: 168 }, phone: { o: 0 } }, pop: "piano" },
      // 13 software cannot choose what matters or what disappears
      { L: "Enables, never decides", s: { strike: { d: 1 } }, on: "card pdec", pop: "card" },
      // 14 retyping between separate records
      { L: "Duplicate entry", off: "cond disc bpmsT card pdec sheet", on: "actD guest", s: { strike: { d: 0 }, phone: { o: 1 }, piano: { x: 300 }, guest: { x: 196, y: 236 }, dMsg: { o: 0 } }, pop: "d1 d2" },
      // 15 automate it: x2
      { L: "Automate the retyping", on: "metro echo", s: { speed: { o: 1, t: "×2" } }, pop: "speed" },
      // 16 breaks faster, harder to see
      { L: "Breaks faster", on: "streaks", s: { arm1: { o: 0 }, arm4: { o: 1 }, speed: { t: "×4" }, dMsg: { o: 1, t: "Breaks faster" } }, pop: "speed" },
      // 17 paid for speed, the stay is no better
      { L: "Paid for speed", s: { coin0: { o: 1, y: 194 }, coin1: { o: 1, y: 188, dl: 0.15 }, coin2: { o: 1, y: 194, dl: 0.3 }, dMsg: { t: "Paid for speed" } }, pop: "guest" },
      // 18 the framework: ten bars
      { L: "Understand comes first", off: "actD metro speed coin0 coin1 coin2 piano guest", on: "actE", s: S(dAll(eL, 1), { lU: { o: 0 }, lI: { o: 0 }, lD: { o: 0 }, lS: { o: 0 }, roll: { sx: 0.02, o: 0 }, vendor: { o: 0 }, who: { o: 0 } }) },
      // 19 Understand (4) before Innovate (5)
      { L: "Understand, then innovate", on: "lU lI", s: { "hb4 hb5": { o: 0.55 } }, pop: "bn4 bn5" },
      // 20 Develop (7): the instrument enters here
      { L: "Develop: phase seven", on: "lD tEnt", s: { hb7: { o: 0.55 }, mini: { o: 1, y: 210 } }, pop: "bn7", ring: [261, 210, C.gold] },
      // 21 in practice it jumps to Strategy (1)
      { L: "Too early, at Strategy", off: "tEnt", on: "lS tEar", s: { hb1: { o: 0.6 }, hb7: { o: 0.2 }, mini: { x: 57 }, "lU lI lD": { o: 0.4 }, "hb4 hb5": { o: 0.2 } }, pop: "bn1" },
      // 22 the built-in model unrolls
      { L: "The tool's built-in model", s: { roll: { o: 1, sx: 1 } } },
      // 23 who designs check-in?
      { L: "Who designs check-in?", on: "who", pop: "who" },
      // 24 the vendor does
      { L: "The vendor decides", on: "vendor", s: { who: { t: "Vendor decides", f: "#ffb59e" } }, pop: "vendor" },
      // 25 Noor Health
      { L: "Noor Health Group", off: "actE mini tEar", on: "actF tag", s: { piano: { o: 1, x: 200, y: 214 }, cnt: { o: 1, n: 0, ns: " models" } }, pop: "tag" },
      // 26 91 models, clinicians outside
      { L: "91 models, no clinicians", off: "tag piano", on: "book arrowF stack fence clin", s: { cnt: { n: 91, ns: " models" }, hosp: { o: 0.3 } }, pop: "stack" },
      // 27 paper versus the ward
      { L: "Paper versus practice", on: "waves" },
      // 28 the same thing?
      { L: "Paper or reality?", on: "neq", pop: "neq" },
      // 29 people understand, accept, improve
      { L: "People make it work", off: "actF", on: "crowd fb0 fb1 fb2 piano", s: { piano: { x: 200, y: 202 }, "fb0 fb1 fb2": { y: 0 } }, pop: "fb0 fb1 fb2" },
      // 30 no foundation: a nicer screen hides old problems
      { L: "Hidden, not fixed", on: "hidden hidT", s: { "fb0 fb1 fb2": { o: 0, y: 40 }, piano: { y: 214, r: 6 }, crowd: { o: 0.35 } } },
      // 31 foundation back, open the suite
      { L: "Open the suite", off: "hidden hidT", on: "layT layers", s: { "fb0 fb1 fb2": { o: 1, y: 0 }, piano: { y: 202, r: 0 }, crowd: { o: 1 } }, pop: "layers", ring: [210, 70, C.gold] }
    ];
    register("W3O1a", {
      title: "Week 3 begins",
      aria: "A self-playing piano plays a hotel's sour process melody faster, while a conductor stands for BPM as a discipline",
      theme: { chipBg: C.gold, chipFg: C.deep, track: "rgba(255,255,255,.18)", bar: C.gold },
      art, frames
    });
    css.push(".vls-w03-W3O1a{background:" + HALL + ";color:" + LIGHT + ";}");
  }

  // =====================================================================
  // W3O1b · "The exploded suite"
  // Technique: isometric exploded view (Ciechanowski / Stripe layered system).
  // A sealed suite explodes into five glass plates. Each plate in turn slides
  // into a side index while its own working mechanism plays on the main
  // stage: blueprint, swimlane router, rule dial, API bus, live pulse chart.
  // Then Noor: five plates bought, one lit, 4.1 to 3.9 against 2.87.
  // =====================================================================
  {
    const BGc = "#f2f5fb", INK = C.ink;
    const PC = ["#1f9a8a", "#2c5d9e", "#e0613a", "#3b8fd6", "#7b5ea7"];
    const NM = ["Modelling", "Workflow", "Rules", "Integration", "Monitoring"];
    const shade = (hex, f) => {
      const n = parseInt(hex.slice(1), 16);
      const ch = (v) => Math.max(0, Math.min(255, Math.round(v * f)));
      return "#" + [ch(n >> 16), ch((n >> 8) & 255), ch(n & 255)].map((v) => v.toString(16).padStart(2, "0")).join("");
    };
    const plate = (k) => {
      const w = 170, h = 85, t = 12, c = PC[k];
      const icon = [
        R(-34, -12, 22, 13, "#ffffff", 3) + R(-6, -12, 22, 13, "#ffffff", 3) + R(22, -12, 22, 13, "#ffffff", 3) + P("M-12 -5 H-6 M16 -5 H22", "#ffffff", 2),
        P("M-40 -6 H20", "#ffffff", 4) + P("M12 -14 L22 -6 L12 2", "#ffffff", 4) + O(-40, -6, 5, "#ffffff"),
        F("M0 -22 L20 -6 L0 10 L-20 -6 Z", "#ffffff") + O(0, -6, 5, c),
        R(-34, -12, 18, 14, "#ffffff", 3) + R(16, -12, 18, 14, "#ffffff", 3) + P("M-16 -5 H16", "#ffffff", 3) + O(0, -5, 4, "#ffffff"),
        P("M-40 -4 L-20 -4 L-12 -18 L-2 8 L8 -10 L16 -4 L40 -4", "#ffffff", 3.5)
      ][k];
      return F(`M${-w / 2} 0 L0 ${h / 2} L0 ${h / 2 + t} L${-w / 2} ${t} Z`, shade(c, 0.72)) +
        F(`M0 ${h / 2} L${w / 2} 0 L${w / 2} ${t} L0 ${h / 2 + t} Z`, shade(c, 0.55)) +
        F(`M0 ${-h / 2} L${w / 2} 0 L0 ${h / 2} L${-w / 2} 0 Z`, c, `stroke="#ffffff" stroke-opacity=".55" stroke-width="1.5"`) +
        `<g transform="scale(1 .62) translate(0 6)">${icon}</g>` +
        K("dust" + k, [[-40, -6], [30, -14], [6, 18], [-12, -24], [44, 6]].map(([x, y]) => O(x, y, 3.5, "#c9c2b4")).join("") +
          P("M-60 0 L0 30 M-30 -15 L30 15", "#d8d2c4", 2, `opacity=".8"`));
    };
    const plates = [4, 3, 2, 1, 0].map((k) => K("pl" + k, plate(k))).join("");
    const bigY = (k) => 66 + k * 42;
    const labels = NM.map((nm, k) => K("lb" + k, P(`M222 ${bigY(k)} H234`, PC[k], 2.5) + T(240, bigY(k) + 6, nm, { s: 16, c: PC[k], a: "start", k: "lt" + k, v: true }))).join("");
    const card = (c) => R(-15, -10, 30, 20, c || C.gold, 5, `stroke="#ffffff" stroke-width="2"`) + P("M-8 -3 H8 M-8 3 H4", "#ffffff", 2);
    const pencil = (x, y) => `<g transform="translate(${x} ${y}) rotate(35)">${R(-4, -26, 8, 26, C.amber, 2)}${F("M-4 0 L4 0 L0 9 Z", INK)}</g>`;

    const art = () =>
      `<defs>${linDef("w3b-bg", "#f7f9fd", "#e6edf7", true)}</defs>` + BG("url(#w3b-bg)") +
      P("M-600 296 H1000", "#d5deea", 2) +
      T(20, 36, "Modelling", { s: 19, c: PC[0], a: "start", k: "dT" }) +
      // ---------- modelling: blueprint ----------
      K("mod",
        R(14, 48, 272, 238, "#e6f0fb", 10, `stroke="#c6d8ee" stroke-width="1.5"`) +
        Array.from({ length: 8 }, (_, k) => P(`M${30 + k * 34} 52 V282`, "#d3e3f4", 1)).join("") +
        Array.from({ length: 7 }, (_, k) => P(`M18 ${60 + k * 34} H282`, "#d3e3f4", 1)).join("") +
        [["Booking", 64], ["Corporate rate", 116], ["Room ready", 168], ["Settled", 220]].map(([nm, y], j) =>
          K("mb" + j, R(30, y, 124, 34, j === 3 ? "#e3f4ec" : "#ffffff", 8, `stroke="${PC[0]}" stroke-width="2"`) + T(92, y + 22, nm, { s: 15, c: INK })) +
          (j < 3 ? K("ma" + j, P(`M92 ${y + 36} V${y + 50}`, PC[0], 2.5) + P(`M86 ${y + 44} L92 ${y + 51} L98 ${y + 44}`, PC[0], 2.5)) : "")).join("") +
        K("loop", P("M156 185 C186 185 186 81 156 81", C.coral, 3, `stroke-dasharray="6 5"`) + P("M164 75 L155 81 L164 88", C.coral, 3) + T(196, 138, "Rework", { s: 14, c: C.coral, a: "start" })) +
        K("rr", R(30, 168, 124, 34, "#ffe9e1", 8, `stroke="${C.coral}" stroke-width="2"`) + T(92, 190, "Room ready", { s: 15, c: C.coral })) +
        K("trav", O(0, 0, 13, "#ffd6a5") + TR(0, 0, face(13, "flat")) + R(12, -2, 9, 12, C.coral, 2)) +
        K("crowd3", person(196, 104, PC[1], 0.9) + person(232, 96, PC[0], 0.9) + person(268, 104, PC[4], 0.9) +
          P("M196 84 L150 90 M232 76 L156 130 M268 84 L156 180", "#9fb3cc", 1.5, `stroke-dasharray="3 4"`) + T(232, 162, "Shared, current", { s: 15, c: INK })) +
        K("drawer", R(196, 210, 74, 52, "#c9d3df", 6) + R(204, 222, 58, 14, "#ffffff", 3) + R(204, 242, 58, 14, "#ffffff", 3) + O(233, 229, 2.5, INK) + O(233, 249, 2.5, INK) +
          O(268, 212, 11, "#ffffff", `stroke="${C.coral}" stroke-width="2"`) + cross(268, 212, C.coral, 2.5)) +
        K("tog", R(176, 58, 104, 30, "#ffffff", 15, `stroke="#c6d8ee" stroke-width="2"`) +
          K("knob", R(179, 61, 50, 24, PC[0], 12), null, true) +
          T(204, 78, "As-is", { s: 14, c: INK, k: "tA", v: true }) + T(255, 78, "To-be", { s: 14, c: INK, k: "tB", v: true }))) +
      // ---------- workflow: lanes and a routed card ----------
      K("wf",
        [["Reception", 60], ["Revenue", 126], ["Housekeeping", 192]].map(([nm, y], j) =>
          K("ln" + j, R(14, y, 272, 60, j % 2 ? "#eef3fb" : "#ffffff", 8, `stroke="#c6d8ee" stroke-width="1.5"`), null, true) +
          R(14, y, 108, 60, shade(PC[1], 1 + j * 0.12), 8) + T(68, y + 36, nm, { s: 14, c: C.white })).join("") +
        K("chaos", Gc("vx-flow", P("M140 90 C300 80 120 160 250 150 S130 250 270 230 S170 100 150 220", C.coral, 3)) +
          person(160, 112, PC[1], 0.8) + person(250, 176, PC[1], 0.8) + person(200, 238, PC[1], 0.8)) +
        K("route", P("M170 90 C200 90 196 156 226 156 M226 156 C256 156 250 222 266 222", PC[1], 3, `stroke-dasharray="5 6"`)) +
        K("block", P("M170 104 C170 170 230 200 258 214", C.coral, 2.5, `stroke-dasharray="4 5"`) + O(210, 182, 12, "#ffffff", `stroke="${C.coral}" stroke-width="2"`) + cross(210, 182, C.coral, 2.5)) +
        K("poster", R(212, 16, 70, 40, "#e6f0fb", 4, `stroke="${PC[0]}" stroke-width="1.5"`) + [0, 1, 2].map((j) => R(222 + j * 18, 30, 12, 10, "#ffffff", 2, `stroke="${PC[0]}" stroke-width="1"`)).join(""))) +
      K("wcard", card(C.gold)) +
      K("wtick", O(0, 0, 13, C.green) + tick(0, 1, C.white, 3)) +
      // ---------- rules: a decision lifted out of the code ----------
      K("ru",
        [["Contract", 82], ["Dates", 142], ["Room type", 202]].map(([nm, y], j) =>
          K("in" + j, R(16, y, 98, 32, "#ffffff", 16, `stroke="${PC[2]}" stroke-width="2"`) + T(65, y + 21, nm, { s: 14, c: INK }) +
            P(`M114 ${y + 16} C132 ${y + 16} 130 158 146 158`, "#e7a58f", 2.5, `class="vx-flow"`))).join("") +
        K("code", R(176, 226, 104, 50, "#4b5a6b", 8) + T(248, 257, "App code", { s: 14, c: C.white }) +
          K("lock", R(262, 210, 16, 13, C.green, 3) + P("M265 210 V205 Q270 198 275 205 V210", C.green, 2.5))) +
        K("norel", T(228, 294, "No release", { s: 14, c: C.green })) +
        K("tag", R(226, 140, 58, 36, PC[2], 8) + T(255, 164, "AED 540", { s: 13.5, c: C.white, k: "rate", v: true })) +
        K("old", R(226, 92, 58, 30, "#ffffff", 8, `stroke="${C.red}" stroke-width="2" stroke-dasharray="4 4"`) + T(255, 112, "540", { s: 14, c: C.red }) + cross(276, 96, C.red, 2.5) +
          T(120, 290, "Costly mistake", { s: 14, c: C.red })) +
        K("editor", person(104, 252, C.green, 0.95) + pencil(156, 168))) +
      K("dia", F("M0 -36 L36 0 L0 36 L-36 0 Z", "#fdebe5", `stroke="${PC[2]}" stroke-width="3"`) + T(0, 6, "Rule", { s: 15, c: PC[2], k: "diaT", v: true })) +
      K("qbig", O(0, 0, 16, PC[2]) + T(0, 6, "?", { s: 18, c: C.white })) +
      // ---------- integration: walls, bus, APIs, one screen ----------
      K("ig",
        [["Booking", 14], ["Rates", 112], ["Rooms", 210]].map(([nm, x]) =>
          R(x, 70, 76, 48, "#ffffff", 8, `stroke="${PC[3]}" stroke-width="2"`) + T(x + 38, 99, nm, { s: 14, c: INK })).join("") +
        K("walls", R(96, 62, 10, 66, C.coral, 3) + R(194, 62, 10, 66, C.coral, 3)) +
        K("trap", O(276, 76, 6, C.amber) + Gc("vx-pulse", O(276, 76, 11, "none", `stroke="${C.amber}" stroke-width="2.5"`))) +
        DP("bus", "M30 170 H274", PC[3], 6) +
        K("apis", [52, 150, 248].map((x) => P(`M${x} 118 V158`, PC[3], 3) + R(x - 20, 136, 40, 20, C.amber, 6) + T(x, 151, "API", { s: 13.5, c: INK })).join("")) +
        K("flowB", Gc("vx-flow", P("M30 170 H274", C.white, 2.5))) +
        K("screen", R(96, 196, 116, 92, "#20314a", 10) + R(103, 203, 102, 62, "#ffffff", 5) +
          [["#d7e9fa", 0], ["#fdebe5", 1], ["#e3f4ec", 2]].map(([c, j]) => R(109, 208 + j * 19, 64, 13, c, 3) + tick(188, 215 + j * 19, C.green, 2.5)).join("") +
          T(154, 281, "One screen", { s: 13.5, c: C.white }))) +
      K("gtok", O(0, 0, 11, "#ffd6a5") + TR(0, 0, face(11, "happy"))) +
      // ---------- monitoring: live chart ----------
      K("mo",
        R(14, 52, 272, 190, "#ffffff", 10, `stroke="#d9cfe9" stroke-width="2"`) +
        P("M40 214 H272 M40 214 V70", "#b8a9d1", 2) +
        DP("line", "M40 196 L70 188 L100 192 L130 180 L160 186 L190 176 L220 182 L250 172 L272 176", PC[4], 3.5) +
        K("spike", P("M190 176 L205 96 L220 182", C.coral, 3.5) + O(205, 96, 6, C.coral) + Gc("vx-pulse", O(205, 96, 13, "none", `stroke="${C.coral}" stroke-width="2.5"`)) +
          R(150, 62, 80, 24, C.coral, 12) + T(190, 79, "Long wait", { s: 13.5, c: C.white })) +
        K("fixd", O(205, 179, 6, C.green) + R(226, 102, 50, 24, C.green, 12) + T(251, 119, "Fixed", { s: 13.5, c: C.white })) +
        K("eye", P("M110 140 Q150 108 190 140 Q150 172 110 140 Z", PC[4], 3) + O(150, 140, 11, PC[4]) + O(154, 136, 3.5, C.white)) +
        K("live", Gc("vx-blink", O(244, 72, 5, C.green)) + T(256, 77, "Live", { s: 14, c: C.green, a: "start" })) +
        K("ct", P("M40 226 V234 H130 V226", C.green, 2.5) + T(85, 262, "Cycle time", { s: 15, c: C.green }) +
          O(150, 252, 11, "#ffffff", `stroke="${C.green}" stroke-width="2.5"`) + P("M150 252 V245 M146 238 H154", C.green, 2)) +
        K("act", R(180, 248, 100, 28, PC[4], 14) + T(230, 267, "Act today", { s: 14, c: C.white })) +
        K("cal", R(296, 250, 48, 40, "#ffffff", 5, `stroke="#b8a9d1" stroke-width="2"`) + R(296, 250, 48, 11, "#b8a9d1", 3) + T(320, 282, "30", { s: 14, c: "#8a7aa8" }) + cross(340, 254, C.coral, 2.5)) +
        K("daily", R(180, 248, 100, 28, C.green, 14) + T(230, 267, "Every day", { s: 14, c: C.white })) +
        K("later", `<g transform="rotate(-8 333 239)">${R(296, 224, 74, 30, "#fff1a8", 3, `stroke="${C.amber}" stroke-width="1.5"`)}${T(333, 245, "Later…", { s: 15, c: "#9a6a12" })}</g>`)) +
      // ---------- Noor ----------
      T(132, 18, "Noor Health", { s: 16, c: C.teal, k: "noorT" }) +
      T(306, 32, "One of five used", { s: 16, c: C.red, k: "oneT" }) +
      K("bars",
        T(20, 40, "Discharge time", { s: 16, c: INK, a: "start" }) +
        [["Start", 4.1, "#5d6d7e"], ["Actual", 3.9, C.coral], ["Promise", 2.87, C.green]].map(([nm, v, c], j) => {
          const y = 70 + j * 62, w = Math.round(v * 50);
          return T(20, y + 22, nm, { s: 15, c: INK, a: "start" }) + K("hb" + j, R(96, y, w, 32, c, 8), "0% 50%") +
            T(96 + w + 8, y + 22, "0.0 h", { s: 15, c: c, a: "start", k: "hv" + j, v: true });
        }).join("") +
        K("gap", P(`M${96 + Math.round(2.87 * 50)} 248 V262 H${96 + Math.round(3.9 * 50)} V248`, C.coral, 2.5) + T(96 + Math.round(3.4 * 50), 286, "Claim challenged", { s: 15, c: C.coral }))) +
      K("brk", P("M236 98 H244 V240 H236", INK, 2.5) + T(250, 174, "Run, manage", { s: 15, c: INK, a: "start" })) +
      K("qq", O(0, 0, 16, C.amber) + T(0, 6, "?", { s: 19, c: C.white })) +
      // ---------- the stack itself (drawn last, on top) ----------
      T(200, 66, "BPM suite", { s: 18, c: INK, k: "suiteT" }) +
      plates + labels +
      K("xr", O(0, 0, 13, C.red) + cross(0, 0, C.white, 3)) +
      K("plug", P("M0 0 C16 0 16 22 34 22", "#5d6d7e", 3) + R(34, 15, 14, 14, "#5d6d7e", 3) + P("M48 18 H54 M48 26 H54", "#5d6d7e", 2.5)) +
      K("ring", O(0, 0, 44, "none", `stroke="${C.amber}" stroke-width="3" stroke-dasharray="5 5"`));

    // stack layouts
    const L = {};
    const lay = (mode, act) => {
      const o = {};
      for (let k = 0; k < 5; k++) {
        if (mode === "box") o["pl" + k] = { o: 1, x: 200, y: 128 + k * 11, sc: 1 };
        if (mode === "big") o["pl" + k] = { o: 1, x: 132, y: bigY(k), sc: 1 };
        if (mode === "idx") o["pl" + k] = { o: act === undefined || act === k ? 1 : 0.4, x: act === k ? 334 : 346, y: 92 + k * 26, sc: 0.42 };
        if (mode === "off") o["pl" + k] = { o: 0, x: 346, y: 92 + k * 26, sc: 0.42 };
        o["lb" + k] = { o: mode === "big" ? 1 : 0 };
      }
      return o;
    };
    const S = (...a) => Object.assign({}, ...a);
    const frames = [
      // 0 the sealed suite arrives
      { L: "Open the suite", on: "suiteT", s: S(lay("box"), { dT: { o: 0 } }) },
      // 1 explode: five layers
      { L: "Five layers", off: "suiteT", s: lay("big"), pop: "lb0 lb1 lb2 lb3 lb4" },
      // 2 the traveller at reception again
      { L: "Back at reception", on: "mod dT trav", s: S(lay("idx", 0), { dT: { t: "Modelling", f: PC[0] }, trav: { x: 220, y: 230 } }), ring: [334, 92, PC[0]] },
      // 3 one shared picture of the whole arrival
      { L: "One shared picture", on: "mb0 mb1 mb3 ma0 ma1 ma2 loop rr", s: { trav: { x: 180, y: 248, o: 0 } }, pop: "mb0 mb1 mb2 mb3" },
      // 4 a current model, not a drawer
      { L: "Shared, not shelved", on: "crowd3 drawer", pop: "crowd3" },
      // 5 as-is and to-be
      { L: "As-is to to-be", off: "loop crowd3 drawer", on: "tog", s: { knob: { x: 48 }, rr: { o: 0 }, mb2: { o: 1 }, tB: { f: C.white } }, pop: "tog mb2" },
      // 6 a drawing is not obeyed when busy
      { L: "Busy evening", off: "mod", on: "wf chaos poster", s: S(lay("idx", 1), { dT: { t: "Workflow", f: PC[1] }, "ln0 ln1 ln2": { o: 0.35 } }), ring: [334, 118, PC[1]] },
      // 7 workflow routes each task
      { L: "Workflow routes work", off: "chaos poster", on: "route wcard", s: { "ln0 ln1 ln2": { o: 1 }, wcard: { x: 170, y: 90 } } },
      // 8 the sequence is enforced
      { L: "Sequence enforced", on: "block", s: { wcard: { x: 226, y: 156 }, ln1: { o: 1 }, "ln0 ln2": { o: 0.5 } }, pop: "block" },
      // 9 corporate booking straight to revenue
      { L: "Straight to Revenue", off: "block", on: "wtick", s: { wtick: { x: 252, y: 140 }, wcard: { sc: 1.25 } }, pop: "wtick" },
      // 10 decisions inside the tasks
      { L: "Decisions inside tasks", off: "wf wcard wtick route", on: "ru qbig", s: S(lay("idx", 2), { dT: { t: "Rules", f: PC[2] }, "in0 in1 in2 code tag norel old editor": { o: 0 }, qbig: { x: 180, y: 158, sc: 1.7 } }), ring: [334, 144, PC[2]] },
      // 11 contract, dates and room type
      { L: "Three conditions", off: "qbig diaT", on: "in0 in1 in2 code dia", pop: "in0 in1 in2" },
      // 12 the rule lives outside the code
      { L: "Rules outside code", on: "tag diaT", s: { dia: { x: 180, y: 158, sc: 1 } }, pop: "tag" },
      // 13 authorised staff edit it, no release
      { L: "Edit, no release", on: "editor norel", s: { rate: { t: "AED 495" } }, pop: "dia tag lock" },
      // 14 yesterday's rate, tomorrow's mistake
      { L: "Yesterday's rate", on: "old", pop: "old" },
      // 15 the information is trapped elsewhere
      { L: "Information trapped", off: "ru dia", on: "ig walls trap qbig", s: S(lay("idx", 3), { dT: { t: "Integration", f: PC[3] }, qbig: { x: 150, y: 214, sc: 1 }, apis: { o: 0 }, flowB: { o: 0 }, screen: { o: 0 } }), ring: [334, 170, PC[3]] },
      // 16 integration connects the systems
      { L: "Connect the systems", s: { walls: { o: 0.15 }, bus: { d: 1 } }, off: "trap" },
      // 17 APIs exchange information
      { L: "APIs exchange data", off: "walls qbig", on: "apis", pop: "apis" },
      // 18 the process crosses systems
      { L: "Crossing systems", on: "flowB gtok", s: { gtok: { x: 30, y: 170 } } },
      // 19 one screen
      { L: "One check-in screen", on: "screen", s: { gtok: { x: 274 } }, pop: "screen" },
      // 20 someone must watch
      { L: "Who is watching?", off: "ig gtok", on: "mo eye", s: S(lay("idx", 4), { dT: { t: "Monitoring", f: PC[4] }, "spike fixd live ct act cal daily later": { o: 0 } }), ring: [334, 196, PC[4]] },
      // 21 performance while work runs
      { L: "While work runs", off: "eye", on: "live", s: { line: { d: 1 } } },
      // 22 cycle time
      { L: "Cycle time", on: "ct", pop: "ct" },
      // 23 an exception flagged
      { L: "Exception flagged", on: "spike", pop: "spike", ring: [205, 96, C.coral] },
      // 24 act today, not next month
      { L: "Act today", off: "spike", on: "fixd act cal", pop: "act" },
      // 25 project becomes management
      { L: "Project to management", off: "act fixd cal", on: "daily", pop: "daily" },
      // 26 the layer most often postponed
      { L: "Postponed layer", on: "later", s: { mo: { o: 0.35 }, later: { o: 1 } }, pop: "later" },
      // 27 Noor bought every layer
      { L: "Noor bought all five", off: "mo dT", on: "noorT", s: S(lay("big")) },
      // 28 rules unused, dashboard unplugged
      { L: "Unused, unplugged", on: "xr plug", s: { xr: { x: 132, y: bigY(2) }, plug: { x: 205, y: bigY(4) + 6 } }, pop: "xr plug" },
      // 29 only modelling used
      { L: "One of five used", on: "oneT dust1 dust2 dust3 dust4", s: { "pl1 pl2 pl3 pl4": { o: 0.45 }, "lb1 lb2 lb3 lb4": { o: 0.45 } } },
      // 30 4.1 to 3.9 against 2.87
      { L: "From 4.1 to 3.9", off: "oneT xr plug noorT", on: "bars", s: S(lay("off"), { hb0: { o: 1, sx: 1 }, hb1: { o: 1, sx: 1, dl: 0.2 }, hb2: { o: 1, sx: 1, dl: 0.4 }, hv0: { n: 4.1, nd: 1, ns: " h" }, hv1: { n: 3.9, nd: 1, ns: " h" }, hv2: { n: 2.87, nd: 2, ns: " h" } }) },
      // 31 a challenged claim, not a full explanation
      { L: "Not every cause", on: "gap", pop: "gap" },
      // 32 describe versus run and manage
      { L: "Describe, then run", off: "bars gap", on: "brk", s: S(lay("big"), { lt0: { t: "Describes" }, "lb1 lb2 lb3 lb4": { o: 0 }, "pl1 pl2 pl3 pl4": { o: 1 }, "dust1 dust2 dust3 dust4": { o: 0 } }), pop: "pl0" },
      // 33 what decides success?
      { L: "What decides success?", off: "brk", on: "qq", s: S(lay("box"), { qq: { x: 200, y: 62 } }), pop: "qq" }
    ];
    // start positions for moving actors
    Object.assign(frames[0].s, { wcard: { x: 170, y: 90 }, wtick: { x: 252, y: 140 }, qbig: { x: 180, y: 158 }, dia: { x: 197, y: 251, sc: 0.5 }, gtok: { x: 30, y: 170 }, hb0: { sx: 0.02 }, hb1: { sx: 0.02 }, hb2: { sx: 0.02 }, hv0: { n: 0, nd: 1, ns: " h" }, hv1: { n: 0, nd: 1, ns: " h" }, hv2: { n: 0, nd: 2, ns: " h" }, trav: { x: 220, y: 230 }, qq: { x: 200, y: 40 } });
    register("W3O1b", {
      title: "Open the suite",
      aria: "A BPM suite explodes into five layers; each layer demonstrates its job, then Noor Health's unused layers",
      theme: { chipBg: C.deep, chipFg: C.white, track: "rgba(20,33,61,.12)", bar: PC[2] },
      art, frames
    });
    css.push(".vls-w03-W3O1b{background:" + BGc + ";color:" + INK + ";}");
  }

  // =====================================================================
  // W3O2a · "The greenhouse that needs gardeners"
  // Technique: time-lapse growth (stems draw, leaves unfurl, plants lean).
  // The suite is a perfect glass greenhouse, yet nothing grows by itself.
  // Leadership is the sun (visible, sustained, decisive), people are the
  // gardeners (an owner whose hose crosses every bed, skills grown in-house),
  // method is the planting plan. A leaning plant is information, not defiance.
  // =====================================================================
  {
    const SKY = "#eaf5fb", SOIL = "#8b6b4a", GLASS = "rgba(186,224,240,.38)", FRAME = "#e9f7f3";
    const BEDX = [140, 202, 264];
    const plantX = [126, 154, 188, 216, 250, 278];
    const stem = (j) => { const x = plantX[j]; return `M${x} 226 C${x - 6} 206 ${x + 8} 190 ${x + 3} ${166 - (j % 2) * 8}`; };
    const leaves = (b) => [0, 1].map((q) => {
      const x = plantX[b * 2 + q];
      return F(`M${x} 206 q-16 -4 -18 -16 q14 0 18 16z`, C.leaf) + F(`M${x + 2} 192 q16 -4 18 -16 q-14 0 -18 16z`, "#3f9a52");
    }).join("");
    const blooms = (b) => [0, 1].map((q) => {
      const x = plantX[b * 2 + q] + 3, y = 166 - q * 8;
      return [0, 72, 144, 216, 288].map((a) => E(x + 6 * Math.cos(a * Math.PI / 180), y + 6 * Math.sin(a * Math.PI / 180), 5, 3.5, ["#f28ca7", "#f6b84a", "#b38be0"][b], `transform="rotate(${a} ${x + 6 * Math.cos(a * Math.PI / 180)} ${y + 6 * Math.sin(a * Math.PI / 180)})"`)).join("") + O(x, y, 3.5, "#fff1a8");
    }).join("");
    const sun = () => Gc("vx-spin", [0, 45, 90, 135, 180, 225, 270, 315].map((a) =>
      P(`M${Math.cos(a * Math.PI / 180) * 28} ${Math.sin(a * Math.PI / 180) * 28} L${Math.cos(a * Math.PI / 180) * 37} ${Math.sin(a * Math.PI / 180) * 37}`, "#f6b84a", 4)).join("")) + O(0, 0, 22, "#ffd25e") + TR(0, 0, face(22, "happy"));
    const cloud = (c) => F("M-34 10 Q-44 10 -44 0 Q-44 -12 -30 -12 Q-26 -26 -10 -24 Q0 -36 16 -26 Q34 -28 36 -12 Q48 -10 46 2 Q44 10 34 10 Z", c || "#cfd8e3");
    const gardener = (c, hat) => person(0, 0, c, 1.1) + F("M-12 -26 Q0 -40 12 -26 Z", hat || "#e9c46a") + R(-14, -27, 28, 4, hat || "#e9c46a", 2);
    const pot = (x) => F(`M${x - 18} 250 L${x - 14} 274 H${x + 14} L${x + 18} 250 Z`, "#c97a4a") + R(x - 20, 246, 40, 7, "#a9603a", 3);
    const badge = (x, ic, nm, k) => K(k, O(x, 274, 15, "#ffffff", `stroke="${C.amber}" stroke-width="2" stroke-dasharray="4 3"`) + ic + T(x + 20, 279, nm, { s: 14, c: C.white, a: "start" }));

    const art = () =>
      `<defs>${linDef("w3c-sky", "#e3f2fb", "#f6fbef", true)}</defs>` + BG("url(#w3c-sky)") +
      R(-600, 250, 1600, 400, SOIL, 0) + P("M-600 250 H1000", "#6f9e4c", 5) +
      // hills
      F("M-600 250 Q-100 180 120 236 Q260 200 420 232 Q700 190 1000 250 Z", "#cfe8c0") +
      // ---------- the greenhouse ----------
      K("house",
        R(96, 128, 208, 122, GLASS, 0) + F("M96 128 L200 70 L304 128 Z", GLASS) +
        DP("hf", "M96 250 V128 L200 70 L304 128 V250", FRAME, 5) +
        Array.from({ length: 7 }, (_, k) => P(`M${122 + k * 26} 250 V128`, FRAME, 2.5)).join("") +
        P("M96 170 H304 M148 99 V128 M252 99 V128", FRAME, 2.5) +
        K("door", R(104, 196, 28, 54, "#d9f1ea", 2, `stroke="${FRAME}" stroke-width="3"`) + O(126, 224, 2.5, C.teal), "0% 50%", true) +
        [0, 1, 2].map((b) => R(BEDX[b] - 29, 226, 58, 20, "#6e4f33", 4)).join("") +
        K("rocks", [[124, 240], [146, 238], [196, 241], [214, 239], [256, 240], [276, 238]].map(([x, y]) => E(x, y, 6, 4, "#b8ab9a")).join("")), null, true) +
      K("fences", [171, 233].map((x) => R(x - 3, 176, 6, 70, "#b5562f", 2) + P(`M${x - 10} 190 H${x + 10} M${x - 10} 214 H${x + 10}`, "#b5562f", 3)).join(""), "50% 100%") +
      K("pane", R(150, 132, 22, 36, "#3d4a5c", 2) + P("M154 138 L168 162", "#6b7a8f", 2)) +
      // plants, one group per bed so a whole bed can lean or droop
      [0, 1, 2].map((b) => K("pg" + b,
        DP("sa" + (b * 2), stem(b * 2), "#3f9a52", 3.5) + DP("sa" + (b * 2 + 1), stem(b * 2 + 1), "#3f9a52", 3.5) +
        K("lv" + b, leaves(b), "50% 100%") + K("bm" + b, blooms(b)), "50% 100%", true)).join("") +
      K("hose", P("M110 216 C150 206 170 222 202 214 S258 206 294 216", "#2f8f5b", 4) + Gc("vx-flow", P("M110 216 C150 206 170 222 202 214 S258 206 294 216", "#bfe8d0", 2))) +
      // bed labels
      T(140, 270, "Reception", { s: 14, c: C.white, k: "bl0" }) + T(202, 290, "Revenue", { s: 14, c: C.white, k: "bl1" }) + T(264, 270, "Rooms", { s: 14, c: C.white, k: "bl2" }) +
      K("inst", R(150, 82, 100, 26, C.teal, 13) + T(200, 100, "Installed", { s: 14, c: C.white }) ) +
      K("spark", [[110, 92], [292, 96], [200, 50], [250, 150]].map(([x, y], j) => Gc("vx-tw", P(`M${x} ${y - 7} V${y + 7} M${x - 7} ${y} H${x + 7}`, "#ffffff", 2.5), `style="animation-delay:${j * 0.3}s"`)).join("")) +
      // ---------- the traveller waits outside ----------
      K("trav", O(0, 0, 14, "#ffd6a5") + TR(0, 0, face(14, "sad")) + R(13, -1, 10, 13, C.coral, 2) +
        O(0, -34, 10, C.white, `stroke="${C.coral}" stroke-width="2.5"`) + Gc("vx-spin", P("M0 -34 V-41", C.coral, 2), `style="transform-origin:0px -34px;transform-box:view-box"`)) +
      // ---------- three families: sun, gardener, plan ----------
      K("slots", O(50, 52, 30, "none", `stroke="#9aa8b6" stroke-width="2" stroke-dasharray="5 5"`) + O(350, 220, 26, "none", `stroke="#9aa8b6" stroke-width="2" stroke-dasharray="5 5"`) +
        R(326, 64, 48, 56, "none", 6, `stroke="#9aa8b6" stroke-width="2" stroke-dasharray="5 5"`) + T(50, 58, "?", { s: 18, c: "#9aa8b6" }) + T(350, 226, "?", { s: 18, c: "#9aa8b6" }) + T(350, 98, "?", { s: 18, c: "#9aa8b6" })) +
      K("beam", F("M64 70 L112 128 L170 128 L76 60 Z", "rgba(255,210,94,.35)")) +
      K("sun", sun()) +
      K("cloud", cloud()) +
      K("storm", cloud("#7d8a9c") + Gc("vx-flow", P("M-24 16 l-6 16 M-4 16 l-6 16 M16 16 l-6 16", "#6aa6d6", 2.5))) +
      T(50, 100, "Leadership", { s: 15, c: "#a8771b", k: "tLead" }) +
      DP("strike", "M14 95 H86", C.red, 3) +
      K("plan", R(326, 64, 48, 56, "#ffffff", 6, `stroke="${C.navy}" stroke-width="2"`) + R(340, 58, 20, 10, C.navy, 3) +
        [0, 1, 2].map((j) => P(`M334 ${82 + j * 12} H362`, "#9fb3cc", 3) + tick(338, 82 + j * 12, C.green, 2)).join("")) +
      T(350, 140, "Method", { s: 15, c: C.navy, k: "tMeth" }) +
      K("gard", gardener(C.green)) +
      T(350, 270, "People", { s: 15, c: C.white, k: "tPeop" }) +
      K("ownTag", R(-26, 18, 52, 20, C.amber, 10) + T(0, 33, "Owner", { s: 14, c: C.ink })) +
      // sponsor lamps
      [["Visible", 120, 70], ["Sustained", 196, 84], ["Decisive", 286, 74]].map(([nm, x, w], j) =>
        K("lamp" + j, R(x, 12, w, 24, "#ffffff", 12, `stroke="#c9b27a" stroke-width="2" stroke-dasharray="4 3"`) + T(x + w / 2, 29, nm, { s: 14, c: "#8a7a55" })) +
        K("lit" + j, R(x, 12, w, 24, "#ffd25e", 12) + T(x + w / 2, 29, nm, { s: 14, c: C.ink }))).join("") +
      K("stamp", `<g transform="rotate(-8 104 140)">${R(64, 126, 82, 28, "#ffffff", 5, `stroke="${C.green}" stroke-width="2.5"`)}${T(105, 145, "Approved", { s: 14, c: C.green })}</g>`) +
      K("gm", person(30, 160, "#6b7fb3", 1.1)) +
      K("argue", person(150, 208, "#5d6d7e", 0.85) + person(194, 208, "#5d6d7e", 0.85) + P("M162 188 l6 -8 -4 -2 8 -10", C.coral, 2.5) + P("M182 188 l-6 -8 4 -2 -8 -10", C.coral, 2.5)) +
      K("ticket", R(-14, -10, 28, 20, "#ffffff", 4, `stroke="${C.navy}" stroke-width="2"`) + P("M-8 -3 H8 M-8 3 H4", "#9fb3cc", 2)) +
      K("tTick", O(0, 0, 11, C.green) + tick(0, 1, C.white, 2.5)) +
      T(200, 56, "Days, not quarters", { s: 15, c: C.green, k: "tDays" }) +
      // ---------- owner badges ----------
      badge(110, P("M104 274 H118 M114 274 V280 M104 270 v8", "#b07a1e", 2.5) + O(104, 274, 4, "none", `stroke="#b07a1e" stroke-width="2"`), "Authority", "bg0") +
      badge(214, P("M208 266 H220 M208 282 H220 M209 266 L219 282 M219 266 L209 282", "#b07a1e", 2), "Time", "bg1") +
      badge(286, R(279, 267, 14, 14, "none", 2, `stroke="#b07a1e" stroke-width="2"`) + P("M286 267 V281", "#b07a1e", 1.5), "Training", "bg2") +
      // ---------- change early: two pots ----------
      K("pots", pot(40) + pot(360) + T(40, 292, "Week 1", { s: 14, c: C.white }) + T(360, 292, "Go-live", { s: 14, c: C.white }) +
        P("M70 284 H322", "#f1e3c8", 2.5, `stroke-dasharray="6 6"`) + P("M314 278 L323 284 L314 290", "#f1e3c8", 2.5)) +
      DP("pL", "M40 248 C34 220 48 196 42 160", "#3f9a52", 4) + K("pLl", F("M40 222 q-18 -4 -20 -18 q16 0 20 18z", C.leaf) + F("M43 200 q18 -4 20 -18 q-16 0 -20 18z", "#3f9a52") + O(42, 158, 6, "#f6b84a"), "50% 100%") +
      DP("pR", "M360 248 C356 240 362 234 360 228", "#3f9a52", 4) + K("pRl", F("M360 234 q-8 -2 -9 -8 q7 0 9 8z", C.leaf), "50% 100%") +
      // consultants leave, in-house gardeners stay
      K("cons", TR(0, 0, gardener("#e0613a", "#5d6d7e")) + TR(30, 4, gardener("#e0613a", "#5d6d7e"))) +
      K("inh", TR(158, 196, gardener(C.green)) + TR(246, 196, gardener(C.green))) +
      // ---------- resistance: a leaning plant ----------
      K("bub", R(106, 94, 104, 28, "#ffffff", 14, `stroke="${C.coral}" stroke-width="2"`) + F("M140 121 L132 134 L150 121 Z", "#ffffff") + T(158, 113, "Rate hidden", { s: 14, c: C.coral, k: "bubT", v: true })) +
      K("mag", O(0, 0, 18, "rgba(255,255,255,.35)", `stroke="${C.navy}" stroke-width="4"`) + P("M13 13 L26 26", C.navy, 6)) +
      // ---------- Noor ----------
      T(200, 30, "Noor Health", { s: 18, c: C.teal, k: "noorT" }) +
      K("anal", person(176, 206, "#6b7fb3", 0.9) + person(226, 206, "#6b7fb3", 0.9) + R(186, 182, 30, 24, "#ffffff", 3, `stroke="${C.navy}" stroke-width="1.5"`) + T(201, 199, "91", { s: 14, c: C.navy })) +
      K("clin", person(328, 226, "#2fb39a", 1) + person(358, 226, "#2fb39a", 1) + person(343, 244, "#2fb39a", 1) + T(343, 284, "Clinicians", { s: 14, c: C.white })) +
      K("doorX", O(118, 222, 11, "#ffffff", `stroke="${C.coral}" stroke-width="2"`) + cross(118, 222, C.coral, 2.5)) +
      K("ward", R(150, 276, 100, 22, "#fff4e0", 11) + T(200, 292, "Ward reality", { s: 14, c: "#8b5a2b" }) + P("M320 214 L280 236", "#2fb39a", 2, `stroke-dasharray="4 4"`)) +
      T(200, 56, "People create value", { s: 16, c: C.green, k: "tEnd" });

    const S = (...a) => Object.assign({}, ...a);
    const stems = (v) => ({ "sa0 sa1 sa2 sa3 sa4 sa5": { d: v } });
    const frames = [
      // 0 something remains outside the software
      { L: "Beyond the software", s: S(stems(0.25), { hf: { d: 1 }, house: { o: 1 }, trav: { x: 52, y: 236 }, gard: { x: 350, y: 222 }, ticket: { x: 350, y: 196 }, tTick: { x: 118, y: 62 }, cons: { x: 150, y: 210 }, mag: { x: 161, y: 150 }, ownTag: { x: 350, y: 222 }, cloud: { x: -30, y: 40 }, storm: { x: 420, y: 44 }, sun: { x: 50, y: 52 } }) },
      // 1 installed exactly as planned
      { L: "Installed as planned", on: "inst spark", pop: "inst" },
      // 2 still waiting: fenced beds
      { L: "Separate routines", off: "spark", on: "fences trav bl0 bl1 bl2", s: { "sa0 sa1 sa2 sa3 sa4 sa5": { st: "#9aa8b6" } }, pop: "fences" },
      // 3 critical success factors
      { L: "What really decides?", off: "inst", on: "slots", pop: "slots" },
      // 4 leadership, people, method
      { L: "Three families", off: "slots", on: "sun tLead plan tMeth gard tPeop", pop: "sun plan gard" },
      // 5 leadership first
      { L: "Leadership first", s: { "plan tMeth gard tPeop": { o: 0.3 }, sun: { sc: 1.15 } }, ring: [50, 52, C.amber] },
      // 6 approved with enthusiasm, then absent
      { L: "Approved, then absent", on: "gm stamp", s: { cloud: { o: 1, x: 50, y: 50, dl: 0.4 }, sun: { sc: 1 } } },
      // 7 nobody senior settles the dispute
      { L: "Nobody settles it", off: "stamp", on: "argue", s: { trav: { x: 62 } }, pop: "argue" },
      // 8 executive sponsorship
      { L: "Executive sponsorship", off: "argue gm", on: "lamp0 lamp1 lamp2", s: { cloud: { x: -60, o: 0 }, sun: { sc: 1.2 }, tLead: { t: "Sponsor" } }, pop: "sun" },
      // 9 visible
      { L: "Visible", off: "lamp0", on: "lit0 beam", pop: "lit0" },
      // 10 sustained through a bad month
      { L: "Sustained", off: "lamp1", on: "lit1 storm", s: { storm: { x: 230, y: 44 }, "sa0 sa1 sa2 sa3 sa4 sa5": { d: 0.4 } }, pop: "lit1" },
      // 11 decisive: days, not quarters
      { L: "Decisive", off: "lamp2 storm", on: "lit2 ticket tDays tTick", s: { ticket: { x: 104, y: 70 }, tTick: { o: 1, dl: 0.8 }, storm: { x: 460 } }, pop: "lit2" },
      // 12 delegated = withdrawn
      { L: "Quietly withdrawn", off: "beam lit0 lit1 lit2 tDays ticket tTick", on: "lamp0 lamp1 lamp2", s: { sun: { o: 0.25, sc: 1 }, strike: { d: 1 } } },
      // 13 now: people
      { L: "Now, people", off: "trav bl0 bl1 bl2", s: { sun: { o: 1 }, strike: { d: 0 }, tLead: { t: "Leadership" }, "plan tMeth": { o: 0.3 }, "gard tPeop": { o: 1 }, gard: { sc: 1.15 } }, ring: [350, 222, C.green] },
      // 14 a process owner across the beds
      { L: "One process owner", off: "tPeop", on: "hose ownTag", s: { gard: { x: 200, y: 196, sc: 1 }, ownTag: { x: 200, y: 196 }, fences: { sy: 0.15 }, "sa0 sa1 sa2 sa3 sa4 sa5": { st: "#3f9a52", d: 0.5 } }, pop: "hose" },
      // 15 the title, without authority, time or training
      { L: "Only the title", on: "bg0 bg1 bg2", pop: "bg0 bg1 bg2" },
      // 16 change management starts early
      { L: "Change management", off: "bg0 bg1 bg2", on: "pots pR", s: { pL: { d: 0.15 }, pR: { d: 0.01 } } },
      // 17 week one, not go-live
      { L: "Start in week one", on: "pLl pRl", s: { pL: { d: 1 }, pR: { d: 1 } }, pop: "pLl" },
      // 18 grow skills inside
      { L: "Build skills inside", off: "pots pL pLl pR pRl", on: "cons inh", s: { cons: { x: 18, y: 214 }, "sa0 sa1 sa2 sa3 sa4 sa5": { d: 0.65 }, "lv0 lv1 lv2": { o: 1 } } },
      // 19 an objection: the rate is hidden
      { L: "An objection", off: "cons inh hose ownTag gard", on: "pane bub", s: { pg0: { r: -22 } }, pop: "bub" },
      // 20 resistance is information
      { L: "Resistance is information", on: "mag", s: { pane: { o: 0, dl: 0.6 }, pg0: { r: 0, dl: 0.6 }, bubT: { t: "Design clue", f: C.green } }, pop: "mag" },
      // 21 Noor: 91 models without clinicians
      { L: "Noor's 91 models", off: "mag bub lamp0 lamp1 lamp2 sun tLead plan tMeth tPeop", on: "noorT anal clin doorX", s: { "lv0 lv1 lv2": { o: 0.6 } }, pop: "anal" },
      // 22 the wards know what the manual missed
      { L: "Knowledge left outside", on: "ward", s: { rocks: { o: 1 } }, pop: "ward" },
      // 23 weaker models, less willing use
      { L: "Weaker models, less use", s: { anal: { o: 0.45 }, "pg0 pg1 pg2": { sy: 0.9 }, pg1: { r: 10 }, pg2: { r: -8 }, "sa0 sa1 sa2 sa3 sa4 sa5": { st: "#9aa8b6" } } },
      // 24 involve people early
      { L: "Involve people early", off: "doorX ward", s: { door: { sx: 0.2 }, clin: { x: -110, y: -16 }, anal: { o: 1, x: -20 }, "pg0 pg1 pg2": { sy: 1, r: 0 }, "sa0 sa1 sa2 sa3 sa4 sa5": { st: "#3f9a52", d: 1 }, "lv0 lv1 lv2": { o: 1 } }, pop: "lv0 lv1 lv2" },
      // 25 people create value
      { L: "People create value", off: "noorT", on: "bm0 bm1 bm2 tEnd sun", s: { sun: { o: 1, sc: 0.8, x: 40, y: 40 } }, pop: "bm0 bm1 bm2" }
    ];
    register("W3O2a", {
      title: "Beyond the software",
      aria: "A glass greenhouse stands for the installed system; leadership, people and method make the plants grow",
      theme: { chipBg: C.green, chipFg: C.white, track: "rgba(47,143,91,.15)", bar: "#f6b84a" },
      art, frames
    });
    css.push(".vls-w03-W3O2a{background:" + SKY + ";color:" + C.ink + ";}");
  }

  // =====================================================================
  // W3O2b · "Launching is not arriving"
  // Technique: nautical chart voyage (motion along a charted route, measured
  // distances, buoys and a lighthouse). The improvement is a ship. Strategy
  // is the lighthouse it steers by; the benefit is the charted distance, the
  // baseline the buoy at the start, the owner the captain who stays aboard
  // after the shipbuilders leave. Go-live is the launch, not the arrival.
  // =====================================================================
  {
    const SEA = "#d9ecf2", LAND = "#efe2c4", COAST = "#c9b48a", NAVY = "#1f3f66";
    const ship = (sail, hull) => P("M0 4 V-30", "#6b4a2a", 2.5) + F("M2 -28 L2 0 L22 0 Z", sail || "#ffffff", `stroke="${NAVY}" stroke-width="1.2"`) + F("M-2 -24 L-2 0 L-16 0 Z", sail || "#ffffff", `stroke="${NAVY}" stroke-width="1.2"`) +
      F("M-24 3 H24 L15 14 H-15 Z", hull || NAVY) + F("M0 -30 L10 -27 L0 -24 Z", C.coral);
    const buoy = (c) => P("M0 0 V-16", "#5d6d7e", 2) + F("M-7 0 L0 -12 L7 0 Z", c || C.coral) + E(0, 2, 9, 3.5, "#ffffff", `stroke="${c || C.coral}" stroke-width="2"`);
    const ruler = (x1, x2, y, c) => P(`M${x1} ${y} H${x2}`, c, 3) + Array.from({ length: Math.floor((x2 - x1) / 14) + 1 }, (_, k) => P(`M${x1 + k * 14} ${y - (k % 2 ? 4 : 7)} V${y}`, c, 1.5)).join("");
    const pin = () => F("M0 0 C-12 -14 -12 -30 0 -30 C12 -30 12 -14 0 0 Z", C.amber) + T(0, -14, "?", { s: 15, c: C.white });
    const HX = (h) => 60 + h * 70;

    const art = () =>
      `<defs>${glowDef("w3d-beam", "#fff3b0", "#d9ecf2")}</defs>` + BG(SEA) +
      // chart grid and waves
      Array.from({ length: 9 }, (_, k) => P(`M${-600} ${k * 40} H1000`, "#c7e0e9", 1)).join("") +
      Array.from({ length: 11 }, (_, k) => P(`M${k * 40} -500 V800`, "#c7e0e9", 1)).join("") +
      Gc("vx-drift", [[40, 60], [250, 40], [150, 280], [330, 290], [20, 250]].map(([x, y]) => P(`M${x} ${y} q6 -5 12 0 q6 5 12 0`, "#a9cfdc", 1.8)).join("")) +
      // ---------- Qasr chart: harbour, island, lighthouse ----------
      K("qasr",
        F("M-600 -500 H34 Q64 40 54 120 Q46 168 74 188 Q94 206 70 236 Q44 270 58 320 H-600 Z", LAND, `stroke="${COAST}" stroke-width="2"`) +
        R(52, 210, 40, 8, "#a0825a", 2) +
        F("M300 168 Q320 140 352 146 Q392 150 420 178 L420 252 Q380 264 346 258 Q306 252 296 224 Q288 196 300 168 Z", LAND, `stroke="${COAST}" stroke-width="2"`) +
        T(352, 186, "Ready room", { s: 14, c: "#6b5a3a" }) +
        K("beam", Gc("vx-pulse", F("M352 104 L236 74 L236 134 Z", "url(#w3d-beam)"))) +
        F("M346 150 L349 112 H355 L358 150 Z", "#ffffff", `stroke="${NAVY}" stroke-width="1.5"`) + R(347, 124, 10, 7, C.coral, 0) + R(346, 138, 12, 7, C.coral, 0) +
        R(345, 100, 14, 12, "#ffd25e", 3, `stroke="${NAVY}" stroke-width="1.5"`) + F("M343 100 L352 92 L361 100 Z", NAVY) +
        T(396, 84, "Strategy", { s: 15, c: NAVY, a: "end", k: "lhT", v: true }), null, true) +
      // launch party
      K("party", P("M10 150 Q60 178 120 160", "#7a6a4a", 1.5) + [20, 40, 60, 80, 100].map((x, j) => F(`M${x} ${154 + Math.sin(j) * 4 + 8} l8 0 l-4 10 z`, [C.coral, C.amber, C.teal, C.plum, C.sky][j])).join("") +
        [[30, 120], [140, 150], [120, 120], [70, 110], [160, 186]].map(([x, y], j) => Gc("vx-tw", R(x, y, 7, 7, [C.coral, C.amber, C.teal, C.plum][j % 4], 1), `style="animation-delay:${j * 0.25}s"`)).join("")) +
      K("feat", R(140, 52, 124, 100, "#ffffff", 8, `stroke="${NAVY}" stroke-width="2"`) + T(202, 74, "Features", { s: 15, c: NAVY }) +
        [0, 1, 2].map((j) => tick(158, 94 + j * 18, C.green, 2.6) + P(`M172 ${94 + j * 18} H${246 - j * 14}`, "#b9c7d6", 4)).join("")) +
      K("seal", O(256, 148, 22, C.green, `stroke="#ffffff" stroke-width="3"`) + T(256, 146, "Met", { s: 13.5, c: C.white }) + T(256, 160, "✓", { s: 14, c: C.white })) +
      K("trav", O(0, 0, 12, "#ffd6a5") + TR(0, 0, face(12, "sad")) + O(0, -28, 9, C.white, `stroke="${C.coral}" stroke-width="2.2"`) + Gc("vx-spin", P("M0 -28 V-34", C.coral, 2), `style="transform-origin:0px -28px;transform-box:view-box"`)) +
      // route, defender, orphan
      DP("route", "M118 206 H296", NAVY, 2.5) +
      T(206, 194, "Faster check-in", { s: 15, c: NAVY, k: "fc" }) +
      K("shield", F("M200 222 L216 228 Q216 246 200 254 Q184 246 184 228 Z", C.green) + tick(200, 238, C.white, 2.6) + T(200, 276, "Defended", { s: 14, c: C.green })) +
      K("orphan", Gc("vx-spin", TR(0, -22, ship("#f3e3d3", "#9aa8b6"), 0.8)) + T(0, -50, "No defender", { s: 14, c: C.coral })) +
      // benefit ruler and baseline buoy
      K("rul", ruler(100, 296, 252, NAVY) + T(198, 280, "Arrival to room", { s: 15, c: NAVY })) +
      K("shorter", R(100, 256, 196, 6, C.green, 3), "0% 50%") +
      K("bbuoy", TR(100, 250, buoy(C.coral)) + T(116, 238, "Baseline", { s: 14, c: C.coral, a: "start" })) +
      // four gates before the build
      [["Define", 130, 184], ["Baseline", 170, 238], ["Owner", 210, 184], ["Build", 250, 238]].map(([nm, x, ly], j) =>
        K("gt" + j, TR(x, 210, buoy(j === 3 ? NAVY : C.green)) + T(x, ly, nm, { s: 14, c: j === 3 ? NAVY : C.green }))).join("") +
      K("later", `<g transform="rotate(-6 200 206)">${R(126, 188, 148, 36, "#fff1a8", 3, `stroke="${C.amber}" stroke-width="1.5"`)}${T(200, 212, "Benefits later?", { s: 15, c: "#9a6a12" })}</g>`) +
      // fragmented measures
      K("segA", ruler(100, 170, 252, C.sky) + T(135, 276, "Reception", { s: 14, c: "#2c6fa3" }) + tick(178, 244, C.green, 2.4)) +
      K("segB", ruler(226, 296, 252, C.teal) + T(262, 276, "Housekeeping", { s: 14, c: C.teal }) + tick(304, 244, C.green, 2.4)) +
      K("hole", O(198, 252, 13, "#ffffff", `stroke="${C.coral}" stroke-width="2"`) + T(198, 258, "?", { s: 15, c: C.coral })) +
      K("whole", P("M100 236 V228 H296 V236", C.coral, 3) + T(198, 222, "Whole wait", { s: 15, c: C.coral })) +
      // ---------- Noor: the discharge chart ----------
      K("noor",
        T(200, 40, "Noor discharge time", { s: 17, c: NAVY }) +
        P(`M${HX(0)} 214 H${HX(4.4)}`, NAVY, 2.5) + [0, 1, 2, 3, 4].map((h) => P(`M${HX(h)} 208 V220`, NAVY, 2)).join("") +
        T(HX(0), 240, "0 h", { s: 14, c: NAVY }) +
        K("st41", TR(HX(4.1), 214, buoy(NAVY)) + T(HX(4.1), 240, "4.1 h", { s: 15, c: NAVY }), null, true) +
        K("pr", TR(HX(2.87), 214, P("M0 0 V-34", "#5d6d7e", 2) + F("M0 -34 L22 -28 L0 -22 Z", C.green)) + T(HX(2.87), 166, "Promise", { s: 15, c: C.green }) + T(HX(2.87), 240, "2.87 h", { s: 15, c: C.green })) +
        K("act39", T(HX(3.9) - 8, 262, "3.9 h", { s: 15, c: C.coral })) +
        K("pct", P(`M${HX(2.87)} 124 V132 H${HX(4.1)} V124`, C.green, 2.5) + T((HX(2.87) + HX(4.1)) / 2, 116, "−30% promised", { s: 14, c: C.green }) +
          P(`M${HX(3.9)} 284 V276 H${HX(4.1)} V284`, C.coral, 2.5) + T(HX(3.4), 296, "−4.9% actual", { s: 14, c: C.coral })) +
        K("fog", Gc("vx-bob", E(HX(3.38), 206, 54, 22, "rgba(255,255,255,.88)") + E(HX(3.1), 196, 30, 16, "rgba(255,255,255,.88)") + E(HX(3.7), 198, 28, 14, "rgba(255,255,255,.88)")) + T(HX(3.38), 212, "Why?", { s: 15, c: "#5d6d7e" }))) +
      // ---------- go-live and governance ----------
      K("slip", F("M-600 160 H70 L150 250 H-600 Z", LAND, `stroke="${COAST}" stroke-width="2"`) + [0, 1, 2, 3, 4].map((k) => P(`M${70 + k * 14} ${166 + k * 16} l14 0`, "#a0825a", 4)).join("") +
        TR(148, 250, P("M0 0 V-54", "#5d6d7e", 2.5) + F("M0 -54 L30 -46 L0 -38 Z", C.coral)) + T(162, 186, "Go-live", { s: 15, c: C.coral, a: "start" })) +
      K("team", person(48, 176, "#8a7a55", 0.9) + person(76, 184, "#8a7a55", 0.9) + T(64, 216, "Project team", { s: 14, c: "#6b5a3a" })) +
      K("res", F("M330 150 Q360 132 398 146 L420 150 V240 Q380 250 350 240 Q320 230 330 150 Z", LAND, `stroke="${COAST}" stroke-width="2"`) + T(366, 196, "Results", { s: 15, c: C.green })) +
      K("startnf", R(196, 52, 132, 28, NAVY, 14) + T(262, 71, "Start, not finish", { s: 14, c: C.white })) +
      K("rose", O(200, 82, 30, "#ffffff", `stroke="${NAVY}" stroke-width="2"`) + Gc("vx-spin", F("M200 54 L206 82 L200 110 L194 82 Z", NAVY) + F("M172 82 L200 76 L228 82 L200 88 Z", "#9fb3cc"), `style="animation-duration:24s"`) +
        T(200, 42, "Measure", { s: 14, c: NAVY }) + T(164, 87, "Decide", { s: 14, c: NAVY, a: "end" }) + T(236, 87, "Act", { s: 14, c: NAVY, a: "start" })) +
      K("ghost", P("M270 250 C240 262 200 262 150 246", C.coral, 2.5, `stroke-dasharray="5 5"`) + P("M160 240 L148 246 L158 254", C.coral, 2.5) + T(214, 284, "Old habits", { s: 15, c: C.coral })) +
      // ---------- the ship and its captain ----------
      K("ship", ship() + K("capt", O(-8, -8, 5, "#ffd6a5") + R(-12, -4, 8, 8, C.amber, 2) + R(-14, -14, 12, 4, NAVY, 1)), "50% 100%") +
      K("ownT", R(-30, 22, 60, 20, C.amber, 10) + T(0, 37, "Owner", { s: 14, c: C.ink })) +
      // final pins
      K("pins", TR(374, 130, pin()) + TR(100, 244, pin())) +
      K("pinS", TR(0, 0, pin())) +
      T(200, 30, "Your last system?", { s: 17, c: NAVY, k: "yours" });

    const S = (...a) => Object.assign({}, ...a);
    const frames = [
      // 0 launch party: installed
      { L: "Installation celebrated", on: "party", s: { ship: { o: 1, x: 92, y: 206 }, trav: { x: 318, y: 232 }, orphan: { x: 200, y: 130 }, ownT: { x: 92, y: 206 }, pinS: { x: 0, y: 0 } }, pop: "ship" },
      // 1 every feature works, contract met
      { L: "Every feature works", on: "feat seal", pop: "seal" },
      // 2 the traveller still waits
      { L: "What improved?", off: "party", on: "trav", s: { feat: { o: 0.35 }, seal: { o: 0.35 } }, pop: "trav", ring: [318, 232, C.coral] },
      // 3 method begins with strategy
      { L: "Method: strategy first", off: "feat seal", on: "beam", s: { lhT: { sc: 1.1 } }, ring: [352, 106, C.amber] },
      // 4 trace to a declared objective
      { L: "Trace to an objective", s: { route: { d: 1 }, lhT: { sc: 1 } } },
      // 5 faster check-in serves reliable hospitality
      { L: "It has a defender", on: "fc shield", s: { lhT: { t: "Reliable hospitality" } }, pop: "shield" },
      // 6 an orphan project
      { L: "An orphan project", on: "orphan", s: { "fc shield": { o: 0.3 } }, pop: "orphan" },
      // 7 define benefits
      { L: "Define the benefit", off: "orphan shield fc", on: "rul", pop: "rul" },
      // 8 shorter arrival-to-room time
      { L: "Shorter time to room", on: "shorter", s: { shorter: { sx: 0.62 } } },
      // 9 a baseline
      { L: "Baseline first", on: "bbuoy", pop: "bbuoy", ring: [100, 246, C.coral] },
      // 10 defined, baselined, owned, then build
      { L: "Before the build", off: "rul shorter bbuoy", on: "gt0 gt1 gt2 gt3", pop: "gt0 gt1 gt2 gt3" },
      // 11 "we'll identify benefits later"
      { L: "Benefits later?", off: "gt0 gt1 gt2 gt3", on: "later", s: { route: { o: 0.3 } }, pop: "later" },
      // 12 two departments, two clocks
      { L: "Two separate clocks", off: "later", on: "segA segB", s: { route: { o: 1 } } },
      // 13 nobody measures the whole wait
      { L: "Nobody measures it all", on: "hole", pop: "hole trav" },
      // 14 the owner draws the measure around the guest
      { L: "Measure the whole wait", off: "hole", on: "whole", s: { "segA segB": { o: 0.35 } }, pop: "whole" },
      // 15 Noor's promise
      { L: "Noor's promise", off: "qasr segA segB whole trav route", on: "noor", s: { ship: { x: HX(4.1), y: 200, sc: 1.15 }, "pr act39 pct fog": { o: 0 } } },
      // 16 4.1 h means about 2.87 h
      { L: "Promised: 2.87 h", on: "pr", pop: "pr" },
      // 17 only 3.9 h
      { L: "Only reached 3.9 h", on: "act39", s: { ship: { x: HX(3.9) } }, pop: "act39" },
      // 18 4.9% against 30%
      { L: "4.9% versus 30%", on: "pct", pop: "pct" },
      // 19 a gap, not every reason
      { L: "A gap, not reasons", on: "fog" },
      // 20 an owner stays responsible
      { L: "An owner stays", off: "noor", on: "slip team ownT", s: { ship: { x: 128, y: 226, sc: 1.2, r: 40 }, ownT: { x: 128, y: 230 } }, pop: "ownT" },
      // 21 go-live is a launch
      { L: "Launch, not arrival", on: "res startnf", s: { ship: { x: 214, y: 236, r: 0, sc: 1.2 }, ownT: { x: 214, y: 240 } }, pop: "startnf" },
      // 22 governance: decide, measure, act
      { L: "Decide, measure, act", off: "startnf", on: "rose", pop: "rose" },
      // 23 designed to outlive the project team
      { L: "Outlives the team", s: { team: { x: -90, o: 0 } } },
      // 24 otherwise: drift to old habits
      { L: "Drift to old habits", on: "ghost", s: { rose: { o: 0.25 }, ship: { x: 176, y: 232, r: -10 }, ownT: { o: 0, x: 176, y: 236 } } },
      // 25 strategy, benefit, owner
      { L: "Strategy, baseline, owner", off: "ghost slip res", on: "qasr beam route rul bbuoy", s: { rose: { o: 1 }, lhT: { t: "Strategy" }, ship: { x: 200, y: 206, sc: 1, r: 0 }, ownT: { o: 1, x: 200, y: 206 } }, pop: "ship" },
      // 26 your organisation's last system
      { L: "Your last system?", on: "yours pins pinS", s: { pinS: { x: 200, y: 168 }, rose: { o: 0 } }, pop: "pins pinS" }
    ];
    register("W3O2b", {
      title: "Installation celebrated",
      aria: "A ship launched from a harbour stands for a new system; strategy is the lighthouse, the benefit is the charted distance, and an owner stays aboard",
      theme: { chipBg: NAVY, chipFg: C.white, track: "rgba(31,63,102,.15)", bar: C.coral },
      art, frames
    });
    css.push(".vls-w03-W3O2b{background:" + SEA + ";color:" + NAVY + ";}");
  }

  installCss(["W3O1a", "W3O1b", "W3O2a", "W3O2b"], "w03-claude-part1", css);
})();

// FILE w03-claude-part2.js
// OPER621 · Week 3 · Animated teaching scenes · part 2 of 3 (W3O2c, W3O3a, W3O3b, W3O3c)
// Prof. Bassem Jarboui · HBMSU · VoiceLearn
// Contract: window.VL_SCENES[secId] = { build(el), step(i, n), reset() }; one entry per narration line.
// CSS: appended to the single <style id="vl-sc-w03">, every rule scoped under .vls-w03-<secId>.
// Uses window.gsap when present (CSS transitions otherwise); honours prefers-reduced-motion.
// Standalone: this part defines every helper it uses and can be concatenated with the other parts.
(() => {
  "use strict";
  const W = window;
  W.VL_SCENES = W.VL_SCENES || {};
  const SID = "vl-sc-w03";
  const DOC = W.document;

  // ---------- environment ----------
  const RM = () => {
    try { return !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    catch (e) { return false; }
  };
  const GS = () => (W.gsap && typeof W.gsap.to === "function" && typeof W.gsap.set === "function") ? W.gsap : null;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const words = (s) => (s ? String(s).trim().split(/\s+/).filter(Boolean) : []);

  // ---------- palette ----------
  const C = {
    ink: "#18243a", navy: "#1f4e79", deep: "#14213d", teal: "#1f8a7a", mint: "#d8f1ea",
    coral: "#e4572e", peach: "#fde3d6", amber: "#f2a33a", gold: "#e9c46a", sun: "#fff1c1",
    plum: "#6b4f8c", lilac: "#e7def5", sky: "#7fb7e3", ice: "#e3f0fb", green: "#2f8f5b",
    leaf: "#58b368", pale: "#e3f4e8", red: "#c63b2b", slate: "#5d6d7e", grey: "#9aa8b6",
    mist: "#e9eef3", white: "#ffffff", paper: "#fbf8f1", cream: "#f6efdc", cork: "#c99b6d"
  };

  // ---------- SVG string helpers (all defined here, used by the scenes) ----------
  const A = (o) => Object.keys(o || {}).filter((k) => o[k] !== null && o[k] !== undefined && o[k] !== false)
    .map((k) => `${k}="${o[k]}"`).join(" ");
  const KA = (k, o, v) => (k ? `data-k="${k}"` + (o ? ` data-o="${o}"` : "") + (v ? ` data-v="1"` : "") : "");
  const R = (x, y, w, h, fill, rx, ex) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx === undefined ? 8 : rx}" fill="${fill}" ${ex || ""}/>`;
  const O = (cx, cy, r, fill, ex) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${ex || ""}/>`;
  const E = (cx, cy, rx, ry, fill, ex) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${ex || ""}/>`;
  const P = (d, s, w, ex) => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w === undefined ? 3 : w}" stroke-linecap="round" stroke-linejoin="round" ${ex || ""}/>`;
  const F = (d, fill, ex) => `<path d="${d}" fill="${fill}" ${ex || ""}/>`;
  // keyed drawable stroke: drawn by the "d" state (0..1)
  const DP = (k, d, s, w, ex) => `<path data-k="${k}" data-dr="1" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" d="${d}" fill="none" stroke="${s}" stroke-width="${w === undefined ? 3 : w}" stroke-linecap="round" stroke-linejoin="round" ${ex || ""}/>`;
  // text: o = {s:size, c:color, a:anchor, w:weight, h:halo colour, k:key, cls}
  const T = (x, y, str, o) => {
    o = o || {};
    const halo = o.h ? ` stroke="${o.h}" stroke-width="${o.hw || 5}" stroke-linejoin="round" paint-order="stroke"` : "";
    return `<text x="${x}" y="${y}" text-anchor="${o.a || "middle"}" font-size="${o.s || 16}" font-weight="${o.w || 750}" fill="${o.c || C.ink}"${halo} ${KA(o.k, o.o, o.v)} ${o.cls ? `class="${o.cls}"` : ""} ${o.ex || ""}>${str}</text>`;
  };
  // keyed group: k = key, inner = svg string, o = transform origin, v = visible by default, cls = class on inner wrapper
  const K = (k, inner, o, v, cls) => `<g ${KA(k, o, v)}><g class="vx-i${cls ? " " + cls : ""}">${inner}</g></g>`;
  const Gc = (cls, inner, ex) => `<g class="${cls}" ${ex || ""}>${inner}</g>`;
  const TR = (x, y, inner, s) => `<g transform="translate(${x} ${y})${s ? ` scale(${s})` : ""}">${inner}</g>`;
  const person = (x, y, c, s, ex) => TR(x, y, O(0, -15, 9, c) + F("M-14 14 Q-14 -3 0 -3 Q14 -3 14 14 Z", c), s || 1);
  const face = (r, mood) => {
    const e = r * 0.32, ey = -r * 0.12, er = Math.max(1.6, r * 0.13);
    const mouth = mood === "sad" ? P(`M${-r * 0.3} ${r * 0.42} Q0 ${r * 0.18} ${r * 0.3} ${r * 0.42}`, C.ink, 1.8)
      : mood === "flat" ? P(`M${-r * 0.25} ${r * 0.34} H${r * 0.25}`, C.ink, 1.8)
      : P(`M${-r * 0.3} ${r * 0.26} Q0 ${r * 0.55} ${r * 0.3} ${r * 0.26}`, C.ink, 1.8);
    return O(-e, ey, er, C.ink) + O(e, ey, er, C.ink) + mouth;
  };
  const tick = (x, y, c, w) => P(`M${x - 8} ${y} l6 6 l11 -13`, c || C.green, w || 3.5);
  const cross = (x, y, c, w) => P(`M${x - 6} ${y - 6} l12 12 M${x + 6} ${y - 6} l-12 12`, c || C.coral, w || 3.5);
  const glowDef = (id, c1, c2) => `<radialGradient id="${id}"><stop offset="0" stop-color="${c1}" stop-opacity="1"/><stop offset="1" stop-color="${c2 || c1}" stop-opacity="0"/></radialGradient>`;
  const linDef = (id, c1, c2, vert) => `<linearGradient id="${id}" x1="0" y1="0" x2="${vert ? 0 : 1}" y2="${vert ? 1 : 0}"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`;
  const BG = (fill) => R(-600, -500, 1600, 1300, fill, 0);

  // ---------- one shared <style id="vl-sc-w03">, rules scoped per section ----------
  const KF = [
    "@keyframes vlw03pop{0%{transform:scale(1)}35%{transform:scale(1.16)}70%{transform:scale(.97)}100%{transform:scale(1)}}",
    "@keyframes vlw03ring{0%{opacity:.95;transform:scale(.2)}100%{opacity:0;transform:scale(1.7)}}",
    "@keyframes vlw03spin{to{transform:rotate(360deg)}}",
    "@keyframes vlw03spinr{to{transform:rotate(-360deg)}}",
    "@keyframes vlw03bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}",
    "@keyframes vlw03flow{to{stroke-dashoffset:-28}}",
    "@keyframes vlw03blink{0%,100%{opacity:1}50%{opacity:.25}}",
    "@keyframes vlw03swing{from{transform:rotate(-24deg)}to{transform:rotate(24deg)}}",
    "@keyframes vlw03tw{0%,100%{opacity:.25;transform:scale(.6)}50%{opacity:1;transform:scale(1.15)}}",
    "@keyframes vlw03wob{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}",
    "@keyframes vlw03pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}",
    "@keyframes vlw03drift{0%{transform:translateX(0)}100%{transform:translateX(-80px)}}",
    "@keyframes vlw03rise{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(-30px);opacity:0}}",
    "@keyframes vlw03shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-2px)}75%{transform:translateX(2px)}}",
    "@keyframes vlw03chip{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}"
  ];
  const BASE = [
    "&{position:relative;display:flex;flex-direction:column;width:100%;height:100%;min-height:0;overflow:hidden;box-sizing:border-box;border-radius:14px;font-family:inherit;}",
    "& *{box-sizing:border-box;}",
    "& .vx-hd{flex:0 0 auto;display:flex;align-items:center;gap:10px;padding:7px 12px 5px;min-height:32px;}",
    "& .vx-chip{flex:0 1 auto;max-width:86%;padding:4px 11px;border-radius:999px;font-size:13px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.3;}",
    "& .vx-chip.go{animation:vlw03chip .45s ease-out 1;}",
    "& .vx-pg{flex:1 1 auto;height:4px;border-radius:2px;overflow:hidden;min-width:24px;}",
    "& .vx-pgb{height:100%;width:0;border-radius:2px;transition:width .6s ease;}",
    "& .vx-svg{flex:1 1 0;display:block;width:100%;height:100%;min-height:150px;overflow:hidden;}",
    "& .vx-svg text{font-family:inherit;pointer-events:none;}",
    "& [data-k]{transform-box:fill-box;transform-origin:50% 50%;transition:transform .85s cubic-bezier(.45,0,.15,1),opacity .55s ease,fill .55s ease,stroke .55s ease,stroke-dashoffset 1.15s cubic-bezier(.45,0,.2,1);}",
    "&.vx-inst [data-k],&.vx-g [data-k]{transition:none!important;}",
    "& .vx-i{transform-box:fill-box;transform-origin:50% 50%;}",
    "& .vx-pop{animation:vlw03pop .62s cubic-bezier(.3,1.5,.5,1) 1;}",
    "& .vx-ring{fill:none;stroke-width:3;opacity:0;transform-box:fill-box;transform-origin:50% 50%;pointer-events:none;}",
    "& .vx-ring.go{animation:vlw03ring .95s ease-out 1;}",
    "& .vx-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlw03spin 9s linear infinite;}",
    "& .vx-spinr{transform-box:fill-box;transform-origin:50% 50%;animation:vlw03spinr 7s linear infinite;}",
    "& .vx-bob{animation:vlw03bob 2.6s ease-in-out infinite;}",
    "& .vx-flow{stroke-dasharray:6 8;animation:vlw03flow 1.1s linear infinite;}",
    "& .vx-fast{animation-duration:.35s!important;}",
    "& .vx-blink{animation:vlw03blink 1.4s ease-in-out infinite;}",
    "& .vx-swing{transform-box:fill-box;transform-origin:50% 100%;animation:vlw03swing 1.1s ease-in-out infinite alternate;}",
    "& .vx-tw{transform-box:fill-box;transform-origin:50% 50%;animation:vlw03tw 1.9s ease-in-out infinite;}",
    "& .vx-wob{transform-box:fill-box;transform-origin:50% 50%;animation:vlw03wob 1.3s ease-in-out infinite;}",
    "& .vx-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlw03pulse 1.6s ease-in-out infinite;}",
    "& .vx-drift{animation:vlw03drift 3s linear infinite;}",
    "& .vx-rise{animation:vlw03rise 2.4s ease-out infinite;}",
    "& .vx-shake{animation:vlw03shake .35s linear infinite;}",
    "@media (max-width:420px){& .vx-chip{font-size:12px;letter-spacing:.05em;}& .vx-hd{padding:6px 10px 4px;}}",
    "@media (max-width:360px){& .vx-chip{font-size:11px;letter-spacing:.03em;padding:4px 9px;}}",
    "@media (prefers-reduced-motion:reduce){& *,& *::before,& *::after{animation:none!important;transition:none!important;}}"
  ];
  function installCss(ids, marker, extra) {
    if (!DOC) return;
    let s = DOC.getElementById(SID);
    if (!s) {
      s = DOC.createElement("style");
      s.id = SID;
      (DOC.head || DOC.documentElement).appendChild(s);
    }
    if (s.textContent.indexOf("/*" + marker + "*/") >= 0) return;
    const sc = (rule) => ids.map((id) => rule.split("&").join(".vls-w03-" + id)).join("\n");
    s.textContent += "\n/*" + marker + "*/\n" + KF.join("\n") + "\n" + BASE.map(sc).join("\n") + "\n" + (extra || []).join("\n");
  }

  // ---------- scene engine ----------
  // def.frames: one entry per narration line: {L:"2-4 word chip", on:"keys", off:"keys", s:{key:{props}}, pop:"keys", ring:[x,y,colour]}
  // props: o opacity, x y translate, r rotate, sc scale, sx sy, d draw 0..1, f fill, st stroke, t text, n number (nd decimals, ns suffix, np prefix), dl delay (this line only)
  const DEF = { o: 0, x: 0, y: 0, r: 0, sc: 1, sx: 1, sy: 1 };
  const TIMING = { dl: 1, du: 1 };
  function register(id, def) {
    const N = def.frames.length;
    const states = [], labels = [], timing = [], orders = [];
    let acc = {}, lab = def.title || "";
    def.frames.forEach((f) => {
      const nx = {};
      for (const k in acc) nx[k] = Object.assign({}, acc[k]);
      const ord = [], tm = {};
      const touch = (k) => { if (ord.indexOf(k) < 0) ord.push(k); };
      words(f.off).forEach((k) => { nx[k] = Object.assign({}, nx[k], { o: 0 }); touch(k); });
      words(f.on).forEach((k) => { nx[k] = Object.assign({}, nx[k], { o: 1 }); touch(k); });
      const s = f.s || {};
      Object.keys(s).forEach((ks) => words(ks).forEach((k) => {
        const p = Object.assign({}, s[ks]);
        Object.keys(TIMING).forEach((t) => { if (p[t] !== undefined) { tm[k] = tm[k] || {}; tm[k][t] = p[t]; delete p[t]; } });
        nx[k] = Object.assign({}, nx[k], p);
        touch(k);
      }));
      if (f.L) lab = f.L;
      acc = nx;
      states.push(nx); labels.push(lab); timing.push(tm); orders.push(ord);
    });

    let root = null, chip = null, bar = null, map = {}, cur = {}, idx = -1, timers = [], rings = [], ringI = 0;
    const later = (fn, ms) => { timers.push(W.setTimeout(fn, ms)); };
    const clearTimers = () => { timers.forEach((t) => W.clearTimeout(t)); timers = []; };

    function full(k, s) {
      const n = map[k];
      const base = Object.assign({}, DEF);
      if (n && n.hasAttribute("data-v")) base.o = 1;
      if (n && n.hasAttribute("data-dr")) { base.o = 1; base.d = 0; }
      return Object.assign(base, s || {});
    }
    function counter(n, t, inst) {
      const to = +t.n, dec = t.nd || 0, pre = t.np || "", suf = t.ns || "";
      const fmt = (v) => pre + v.toFixed(dec) + suf;
      const from = (typeof n._v === "number") ? n._v : to;
      n._v = to;
      if (n._tw && n._tw.kill) n._tw.kill();
      if (n._raf) W.cancelAnimationFrame(n._raf);
      if (inst || from === to || !W.requestAnimationFrame) { n.textContent = fmt(to); return; }
      const g = GS();
      if (g) {
        const o = { v: from };
        n._tw = g.to(o, { v: to, duration: 1.2, ease: "power2.out", onUpdate: () => { n.textContent = fmt(o.v); } });
        return;
      }
      const t0 = W.performance ? W.performance.now() : Date.now();
      const stepF = (now) => {
        const p = clamp((now - t0) / 1200, 0, 1), e = 1 - Math.pow(1 - p, 3);
        n.textContent = fmt(from + (to - from) * e);
        if (p < 1) n._raf = W.requestAnimationFrame(stepF);
      };
      n._raf = W.requestAnimationFrame(stepF);
    }
    function setNode(n, t, inst, delay, du) {
      const dr = n.hasAttribute("data-dr");
      const op = dr && !(t.d > 0.001) ? 0 : t.o;
      const sx = t.sc * t.sx, sy = t.sc * t.sy;
      const g = GS();
      if (g) {
        const v = { x: t.x, y: t.y, rotation: t.r, scaleX: sx, scaleY: sy, opacity: op, transformOrigin: n.getAttribute("data-o") || "50% 50%" };
        if (t.f) v.fill = t.f;
        if (t.st) v.stroke = t.st;
        if (dr) v.strokeDashoffset = 1 - (t.d || 0);
        if (inst) { if (g.killTweensOf) g.killTweensOf(n); g.set(n, v); }
        else g.to(n, Object.assign(v, { duration: du || 0.85, delay: delay, ease: "power2.inOut", overwrite: "auto" }));
      } else {
        n.style.transitionDelay = inst ? "0s" : delay.toFixed(2) + "s";
        n.style.transitionDuration = !inst && du ? du + "s" : "";
        n.style.transform = `translate(${t.x}px,${t.y}px) rotate(${t.r}deg) scale(${sx},${sy})`;
        n.style.opacity = String(op);
        if (t.f) n.style.fill = t.f;
        if (t.st) n.style.stroke = t.st;
        if (dr) n.style.strokeDashoffset = String(1 - (t.d || 0));
      }
      if (t.t !== undefined && n.textContent !== String(t.t)) n.textContent = String(t.t);
      if (t.n !== undefined) counter(n, t, inst);
    }
    function pop(k, delay) {
      const n = map[k];
      if (!n) return;
      const inner = n.querySelector(".vx-i") || n;
      later(() => { inner.classList.remove("vx-pop"); void inner.getBoundingClientRect(); inner.classList.add("vx-pop"); }, delay * 1000);
    }
    function ring(spec, delay) {
      if (!spec || !rings.length) return;
      const list = Array.isArray(spec[0]) ? spec : [spec];
      list.forEach((r, j) => {
        const c = rings[(ringI++) % rings.length];
        later(() => {
          c.setAttribute("cx", r[0]); c.setAttribute("cy", r[1]);
          c.setAttribute("r", r[3] || 26);
          c.setAttribute("stroke", r[2] || def.ring || C.coral);
          c.classList.remove("go"); void c.getBoundingClientRect(); c.classList.add("go");
        }, (delay + j * 0.18) * 1000);
      });
    }
    function setLabel(txt, inst) {
      if (!chip || chip.textContent === txt) return;
      chip.textContent = txt;
      chip.classList.remove("go");
      if (!inst) { void chip.offsetWidth; chip.classList.add("go"); }
    }
    function apply(i, inst) {
      const rm = RM();
      inst = !!inst || rm;
      const g = GS();
      root.classList.toggle("vx-g", !!g);
      if (inst) {
        clearTimers();
        root.classList.add("vx-inst");
        rings.forEach((c) => c.classList.remove("go"));
        root.querySelectorAll(".vx-pop").forEach((n) => n.classList.remove("vx-pop"));
      }
      const st = states[i], ord = orders[i], tm = timing[i];
      Object.keys(map).forEach((k) => {
        const t = full(k, st[k]);
        const js = JSON.stringify(t);
        if (!inst && cur[k] === js) return;
        const oi = ord.indexOf(k);
        const tk = tm[k] || {};
        const delay = inst ? 0 : (oi > 0 ? Math.min(oi * 0.06, 0.7) : 0) + (tk.dl || 0);
        setNode(map[k], t, inst, delay, tk.du);
        cur[k] = js;
      });
      if (inst) { void root.offsetWidth; root.classList.remove("vx-inst"); }
      setLabel(labels[i], inst);
      if (bar) bar.style.width = (((i + 1) / N) * 100).toFixed(1) + "%";
      if (!inst) {
        const f = def.frames[i];
        words(f.pop).forEach((k, j) => pop(k, 0.25 + j * 0.08));
        ring(f.ring, 0.3);
      }
      idx = i;
    }
    W.VL_SCENES[id] = {
      build(el) {
        if (!el || !DOC) return;
        clearTimers();
        const th = def.theme || {};
        root = DOC.createElement("div");
        root.className = "vls-w03 vls-w03-" + id;
        root.innerHTML =
          `<div class="vx-hd"><span class="vx-chip" aria-live="polite" style="background:${th.chipBg || C.navy};color:${th.chipFg || C.white}"></span>` +
          `<span class="vx-pg" aria-hidden="true" style="background:${th.track || "rgba(31,78,121,.15)"}"><span class="vx-pgb" style="display:block;background:${th.bar || C.coral}"></span></span></div>` +
          `<svg class="vx-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${def.aria || id}">` +
          def.art() +
          `<g aria-hidden="true">${[0, 1, 2].map(() => `<circle class="vx-ring" cx="200" cy="150" r="26" stroke="${C.coral}"/>`).join("")}</g></svg>`;
        if (typeof el.replaceChildren === "function") el.replaceChildren(root);
        else { el.innerHTML = ""; el.appendChild(root); }
        chip = root.querySelector(".vx-chip");
        bar = root.querySelector(".vx-pgb");
        rings = Array.from(root.querySelectorAll(".vx-ring"));
        map = {}; cur = {};
        root.querySelectorAll("[data-k]").forEach((n) => {
          map[n.getAttribute("data-k")] = n;
          const o = n.getAttribute("data-o");
          if (o) n.style.transformOrigin = o;
        });
        apply(0, true);
      },
      step(i, n) {
        if (!root) return;
        const nn = Number.isFinite(+n) && +n > 0 ? Math.floor(+n) : N;
        let ii = Number.isFinite(+i) ? Math.floor(+i) : 0;
        ii = clamp(ii, 0, nn - 1);
        if (nn !== N) ii = Math.round((ii * (N - 1)) / Math.max(1, nn - 1));
        ii = clamp(ii, 0, N - 1);
        if (ii === idx) return;
        apply(ii, false);
      },
      reset() { if (root) apply(0, true); }
    };
  }

  const css = [];
  // =====================================================================
  // W3O2c · "The detective's board"
  // Technique: shared-object zoom (a pinned card blows up into a polaroid
  // vignette, then shrinks back into its slot) plus red-string tracing.
  // Five failure symptoms are pinned at the top of a cork board; root
  // causes are pinned at the bottom; red strings connect what we see to
  // what it reveals. Noor's clues stay dashed: investigate, do not invent.
  // =====================================================================
  {
    const CORK = "#c99b6d", INK = "#2b2118", RED = "#b8322a", PAPER = "#fffdf6";
    const SY = [["Shelfware", 70, 36], ["Fast mess", 135, 92], ["Lone pilot", 200, 36], ["Evaporated", 265, 92], ["Rejected", 330, 36]];
    const RC = [["Ownership", 56, C.navy], ["Method", 152, C.teal], ["Governance", 248, C.plum], ["People", 344, C.coral]];
    const pinH = (x, y, c) => O(x, y, 4.5, c || RED) + O(x - 1.3, y - 1.3, 1.5, "#ffffff", `opacity=".7"`);
    const card = (nm, x, y, k) => K("cf" + k, R(x - 52, y - 18, 104, 36, PAPER, 3, `stroke="#e3d8c2" stroke-width="1"`) + T(x, y + 6, nm, { s: 15, c: INK }) + pinH(x, y - 14));
    const back = (x, y, k) => K("cb" + k, R(x - 52, y - 18, 104, 36, "#efe3c8", 3) + P(`M${x - 40} ${y - 8} l80 16 M${x - 40} ${y + 8} l80 -16`, "#e2d2ae", 1.5) + T(x, y + 6, "?", { s: 16, c: "#a68a5a" }) + pinH(x, y - 14), null, true);
    const cause = (nm, x, c, k) => K("rc" + k, R(x - 45, 236, 90, 34, c, 4) + T(x, 258, nm, { s: 14, c: C.white }) + pinH(x, 240, "#ffd25e"));
    const rback = (x, k) => K("rb" + k, R(x - 45, 236, 90, 34, "none", 4, `stroke="#8d6a45" stroke-width="2" stroke-dasharray="5 4"`) + T(x, 258, "Root?", { s: 14, c: "#6d5236" }));
    const str = (k, x1, y1, x2, y2) => DP(k, `M${x1} ${y1} C${x1} ${(y1 + y2) / 2 + 20} ${x2} ${(y1 + y2) / 2 - 20} ${x2} ${y2}`, RED, 2.5);
    const polaroid = (k, inner, cap) => K(k, R(54, 46, 300, 212, "rgba(0,0,0,.18)", 4) + R(50, 40, 300, 212, PAPER, 4) + R(62, 52, 276, 160, "#e9eef3", 2) + inner +
      T(66, 238, cap, { s: 17, c: INK, a: "start" }) + pinH(200, 46));
    const sticky = (k, l1, l2) => K(k, `<g transform="rotate(-4 296 236)">${R(214, 208, 164, l2 ? 58 : 34, "#fff07a", 2)}${T(296, 230, l1, { s: 14, c: "#5a4a00" })}${l2 ? T(296, 256, l2, { s: 14, c: "#5a4a00" }) : ""}</g>`);
    const slotT = (j) => ({ x: SY[j][1] - 200, y: SY[j][2] - 146, sc: 0.32 });

    const art = () =>
      `<defs><pattern id="w3e-cork" width="18" height="18" patternUnits="userSpaceOnUse">${O(4, 5, 1.4, "#b58656")}${O(13, 12, 1.1, "#d8ad80")}${O(9, 2, 0.9, "#a8784a")}</pattern></defs>` +
      BG(CORK) + R(-600, -500, 1600, 1300, "url(#w3e-cork)", 0) +
      // ---- slots: card backs and faces, root backs and faces ----
      SY.map(([nm, x, y], j) => back(x, y, j) + card(nm, x, y, j)).join("") +
      RC.map(([nm, x], j) => rback(x, j) + cause(nm, x, RC[j][2], j)).join("") +
      DP("hint", "M70 54 C70 150 56 140 56 236", "#8d6a45", 2) +
      // strings (drawn under the vignettes)
      str("s0", 70, 54, 56, 236) + str("s1", 265, 110, 56, 236) + str("s2", 135, 110, 152, 236) + str("s3", 200, 54, 248, 236) + str("s4", 330, 54, 344, 236) +
      // ---- vignette 0: shelfware ----
      polaroid("v0",
        R(84, 66, 128, 86, "#2b3a4f", 6) + R(90, 72, 116, 66, "#ffffff", 3) + [0, 1, 2].map((j) => R(98 + j * 36, 96, 26, 16, "#d7e9fa", 3, `stroke="${C.navy}" stroke-width="1.2"`)).join("") +
        P("M124 104 H134 M160 104 H170", C.navy, 1.5) + P("M148 152 V164 M128 166 H168", "#2b3a4f", 3) +
        K("views", R(98, 176, 100, 26, C.coral, 13) + T(148, 194, "0 opens", { s: 14, c: C.white })) +
        K("web", P("M206 72 L186 72 M206 72 L206 92 M206 72 L190 88 M192 72 Q198 80 206 79 M186 72 Q196 86 206 88", "#9aa8b6", 1.3) +
          [[108, 64], [170, 62], [232, 120]].map(([x, y], j) => Gc("vx-tw", O(x, y, 2.5, "#9aa8b6"), `style="animation-delay:${j * 0.4}s"`)).join("")) +
        K("shelf", R(236, 150, 92, 6, "#8d6a45", 2) + R(246, 104, 18, 46, "#4f6fd6", 2) + R(266, 112, 14, 38, "#e0613a", 2) + R(282, 100, 20, 50, "#1f9a8a", 2) +
          Gc("vx-tw", O(256, 98, 2.5, "#9aa8b6") + O(292, 94, 2.5, "#9aa8b6"))) +
        K("chair", R(254, 172, 40, 8, "#8d6a45", 2) + R(286, 148, 8, 26, "#8d6a45", 2) + P("M258 180 V200 M290 180 V200", "#8d6a45", 3)),
        "Shelfware") +
      sticky("r0", "No owner needs it") +
      // ---- vignette 1: the automated mess ----
      polaroid("v1",
        R(70, 150, 260, 16, "#4b5a6b", 8) + [84, 120, 156, 192, 228, 264, 300].map((x) => O(x, 158, 4, "#9aa8b6")).join("") +
        K("recs", Gc("vx-bob", [0, 1, 2, 3, 4, 5].map((j) => R(80 + j * 46, 118, 26, 32, "#ffffff", 3, `stroke="${C.navy}" stroke-width="1.5"`)).join(""))) +
        K("dups", Gc("vx-shake", [0, 1, 2, 3, 4, 5].map((j) => R(92 + j * 46, 112, 26, 32, "#ffe3d6", 3, `stroke="${C.coral}" stroke-width="1.5"`)).join(""))) +
        K("gauge", P("M100 100 A34 34 0 0 1 168 100", "#9aa8b6", 6) + K("needle", P("M134 100 L134 72", C.coral, 4), "50% 100%", true) + O(134, 100, 5, INK)) +
        K("x2", R(200, 66, 70, 30, C.coral, 15) + T(235, 87, "×2 faster", { s: 14, c: C.white })),
        "Fast mess") +
      sticky("r1", "Skipped Understand", "and Innovate") +
      // ---- vignette 2: the pilot that never scales ----
      polaroid("v2",
        Array.from({ length: 12 }, (_, i) => {
          const c = i % 4, r = Math.floor(i / 4), x = 76 + c * 66, y = 60 + r * 50;
          return R(x, y, 54, 38, i === 5 ? C.green : "#d3dbe3", 5, (i === 5 ? KA("lit", null, true) : "") + ` stroke="#ffffff" stroke-width="1.5"`);
        }).join("") +
        T(169, 134, "Check-in", { s: 13.5, c: C.white }) +
        K("arrows", P("M196 129 H206 M169 148 V158 M142 129 H132", C.green, 3) + P("M201 124 L207 129 L201 134", C.green, 3)) +
        K("stops", cross(219, 129, RED, 3) + cross(169, 170, RED, 3) + cross(119, 129, RED, 3)) +
        K("map", P("M103 79 H301 M103 129 H301 M103 179 H301 M103 79 V179 M169 79 V179 M235 79 V179 M301 79 V179", "#4f6fd6", 2, `stroke-dasharray="4 5"`)),
        "Lone pilot") +
      sticky("r2", "No architecture", "no governance") +
      // ---- vignette 3: benefits evaporate ----
      polaroid("v3",
        R(82, 64, 96, 128, "#ffffff", 4, `stroke="#c9d3df" stroke-width="2"`) + P("M96 88 H164 M96 104 H150 M96 120 H158", "#c9d3df", 4) +
        `<g transform="rotate(-12 130 160)">${R(92, 146, 78, 28, "none", 4, `stroke="${C.green}" stroke-width="3"`)}${T(131, 166, "Savings", { s: 14, c: C.green })}</g>` +
        K("steam", [0, 1, 2].map((j) => Gc("vx-rise", O(118 + j * 24, 60, 7, "#ffd25e", `stroke="#c99a2e" stroke-width="1.5"`), `style="animation-delay:${j * 0.6}s"`)).join("")) +
        K("jar", R(226, 84, 86, 108, "rgba(255,255,255,.6)", 10, `stroke="#5d6d7e" stroke-width="2.5"`) + R(229, 120, 80, 69, "#ffd25e", 8) +
          P("M216 120 H322", RED, 2, `stroke-dasharray="5 4"`) + T(269, 110, "Budget", { s: 14, c: INK })) +
        K("same", R(225, 56, 88, 22, RED, 11) + T(269, 72, "Unchanged", { s: 14, c: C.white })),
        "Evaporated") +
      sticky("r3", "No baseline, owner", "or measure date") +
      K("noorTag", R(60, 196, 140, 26, C.teal, 13) + T(130, 214, "Noor: no proof", { s: 14, c: C.white })) +
      // ---- vignette 4: rejection at go-live ----
      polaroid("v4",
        R(196, 64, 118, 82, "#2b3a4f", 6) + R(202, 70, 106, 62, "#bfe3ff", 3) + P("M255 146 V160 M236 162 H274", "#2b3a4f", 3) +
        K("nurse", person(112, 156, C.teal, 1.3) + R(128, 132, 24, 32, "#ffffff", 2, `stroke="${INK}" stroke-width="1.5"`) + P("M133 141 H147 M133 148 H147 M133 155 H143", "#9aa8b6", 2)) +
        K("detour", P("M150 186 C190 206 270 206 300 170", RED, 3, `class="vx-flow"`) + T(270, 202, "Workaround", { s: 14, c: RED })) +
        K("weeks", R(78, 60, 76, 26, C.amber, 13) + T(116, 78, "Weeks in", { s: 14, c: INK })),
        "Rejected") +
      sticky("r4", "Change came late") +
      // ---- diagnosis tools ----
      K("lens", O(0, 0, 26, "rgba(255,255,255,.35)", `stroke="${INK}" stroke-width="5"`) + P("M19 19 L36 36", INK, 8)) +
      K("diag", R(140, 158, 120, 30, INK, 15) + T(200, 178, "Diagnose first", { s: 15, c: C.white })) +
      K("prev", `<g transform="rotate(-8 200 172)">${R(124, 154, 152, 38, "none", 6, `stroke="${C.green}" stroke-width="4"`)}${T(200, 180, "Preventable", { s: 18, c: C.green })}</g>`) +
      [0, 1, 2, 3].map((j) => K("ok" + j, O(RC[j][1] + 38, 238, 10, C.green, `stroke="#ffffff" stroke-width="2"`) + tick(RC[j][1] + 38, 239, C.white, 2.4))).join("") +
      // ---- Noor's case file ----
      K("file", R(110, 120, 180, 82, "#f3d58a", 6) + R(110, 112, 70, 14, "#f3d58a", 4) + T(200, 140, "Noor case file", { s: 15, c: INK }) +
        R(122, 150, 76, 44, PAPER, 3) + T(160, 168, "Rules", { s: 14, c: INK }) + T(160, 185, "unused", { s: 14, c: INK }) +
        R(204, 150, 76, 44, PAPER, 3) + T(242, 168, "No", { s: 14, c: INK }) + T(242, 185, "clinicians", { s: 14, c: INK })) +
      K("qstr", P("M126 160 C112 152 100 146 92 140", RED, 2, `stroke-dasharray="4 5"`) + P("M276 160 C290 152 300 146 308 140", RED, 2, `stroke-dasharray="4 5"`) +
        O(84, 134, 11, PAPER, `stroke="${RED}" stroke-width="2"`) + T(84, 139, "?", { s: 14, c: RED }) + O(316, 134, 11, PAPER, `stroke="${RED}" stroke-width="2"`) + T(316, 139, "?", { s: 14, c: RED })) +
      K("evid", `<g transform="rotate(-3 200 216)">${R(130, 204, 140, 26, "#fffdf6", 5, `stroke="${C.navy}" stroke-width="3"`)}${T(200, 223, "Evidence first", { s: 15, c: C.navy })}</g>`) +
      // ---- a good product alone ----
      K("prod", R(150, 140, 100, 70, "#ffffff", 8, `stroke="${C.amber}" stroke-width="3"`) + R(194, 140, 12, 70, C.amber, 0) + R(150, 166, 100, 12, C.amber, 0) +
        F("M200 140 C186 120 170 124 178 138 Z M200 140 C214 120 230 124 222 138 Z", C.coral) + T(200, 228, "Good product", { s: 15, c: INK })) +
      K("found", R(10, 280, 380, 18, "#7a5a3a", 4) + T(200, 294, "Organisational readiness", { s: 14, c: C.white })) +
      K("crew", [40, 120, 280, 360].map((x) => person(x, 214, ["#1f4e79", "#1f8a7a", "#6b4f8c", "#e4572e"][[40, 120, 280, 360].indexOf(x)], 1)).join(""));

    const S = (...a) => Object.assign({}, ...a);
    const zoomIn = (j) => { const o = {}; o["v" + j] = { o: 1, x: 0, y: 0, sc: 1 }; return o; };
    const zoomOut = (j) => { const o = {}; o["v" + j] = Object.assign({ o: 0 }, slotT(j)); o["cf" + j] = { o: 1, dl: 0.45 }; o["cb" + j] = { o: 0 }; o["r" + j] = { o: 0 }; return o; };
    const init = {};
    for (let j = 0; j < 5; j++) init["v" + j] = Object.assign({ o: 0 }, slotT(j));
    const frames = [
      // 0 five face-down cards
      { L: "When factors are missing", s: S(init, { lens: { x: 70, y: 150 } }) },
      // 1 each has a sign and a root
      { L: "Sign and root", on: "rb0 rb1 rb2 rb3", s: { hint: { d: 1 } }, pop: "rb0 rb1 rb2 rb3" },
      // 2 a model nobody opens
      { L: "A model nobody opens", off: "rb0 rb1 rb2 rb3 cb1 cb3", on: "views", s: S(zoomIn(0), { hint: { d: 0 }, "web shelf chair": { o: 0 } }), pop: "views" },
      // 3 shelfware: dust and an unread book
      { L: "Shelfware", on: "web shelf", pop: "shelf" },
      // 4 modelling for its own sake, no owner
      { L: "No owner needs it", on: "r0 chair", pop: "r0" },
      // 5 automate the existing sequence
      { L: "Automate as it stands", on: "recs gauge", s: S(zoomOut(0), zoomIn(1), { "dups x2": { o: 0 } }) },
      // 6 duplicates happen automatically
      { L: "Duplicates, automatically", on: "dups x2", s: { needle: { r: 70 } }, pop: "x2" },
      // 7 a faster bad process
      { L: "Automated mess", on: "r1", pop: "r1" },
      // 8 the pilot that never scales
      { L: "The pilot that stalls", s: S(zoomOut(1), zoomIn(2), { "arrows stops map": { o: 0 } }), pop: "lit" },
      // 9 nothing else is touched
      { L: "Nothing follows", on: "arrows stops", pop: "stops" },
      // 10 no process architecture
      { L: "No process map", off: "arrows", on: "map" },
      // 11 nobody decides what comes next
      { L: "Momentum stops", on: "r2", pop: "r2" },
      // 12 benefits evaporate
      { L: "Benefits evaporate", on: "jar", s: S(zoomOut(2), zoomIn(3), { "steam same": { o: 0 } }) },
      // 13 savings claimed, budget unchanged
      { L: "Budget unchanged", on: "steam same", pop: "same" },
      // 14 no baseline, owner or date
      { L: "No baseline or owner", on: "r3", pop: "r3" },
      // 15 Noor cannot show the savings
      { L: "Noor's missing savings", on: "noorTag", pop: "noorTag" },
      // 16 rejection at go-live
      { L: "Rejection at go-live", off: "noorTag", on: "nurse", s: S(zoomOut(3), zoomIn(4), { "detour weeks": { o: 0 } }), pop: "nurse" },
      // 17 paper lists within weeks
      { L: "Paper workarounds", on: "detour weeks", pop: "weeks" },
      // 18 change management too late
      { L: "Change came late", on: "r4", pop: "r4" },
      // 19 every failure traces to a missing factor
      { L: "Missing factors", s: S(zoomOut(4), { "rc0 rc1 rc2 rc3": { o: 1, dl: 0.5 } }), pop: "rc0 rc1 rc2 rc3" },
      // 20 ownership and method
      { L: "Ownership and method", s: { s0: { d: 1 }, s1: { d: 1, dl: 0.3 }, s2: { d: 1, dl: 0.6 } }, pop: "cf0 cf3 cf1" },
      // 21 governance and people
      { L: "Governance and people", s: { s3: { d: 1 }, s4: { d: 1, dl: 0.3 } }, pop: "cf2 cf4" },
      // 22 symptom first, condition behind it
      { L: "Symptom, then condition", on: "lens diag", s: { lens: { x: 250, y: 150 } } },
      // 23 predictable, so preventable
      { L: "Predictable, preventable", off: "lens diag", on: "prev ok0 ok1 ok2 ok3", pop: "prev ok0 ok1 ok2 ok3" },
      // 24 Noor: which patterns?
      { L: "Noor: which patterns?", off: "prev", on: "file qstr", s: { "s0 s1 s2 s3 s4": { o: 0.25 } }, pop: "file" },
      // 25 investigate, do not invent
      { L: "Investigate, don't invent", on: "evid", pop: "evid" },
      // 26 a good product cannot prevent them alone
      { L: "Product is not enough", off: "file qstr evid", on: "prod", s: { "s0 s1 s2 s3 s4": { o: 1 } }, pop: "prod" },
      // 27 the organisation creates the conditions
      { L: "Organisation makes it", off: "prod ok0 ok1 ok2 ok3", on: "found crew", s: { "s0 s1 s2 s3 s4": { st: C.green }, "rc0 rc1 rc2 rc3": { y: 8 } }, pop: "found" }
    ];
    register("W3O2c", {
      title: "When factors are missing",
      aria: "A detective's cork board links five visible failure patterns to the missing success factors underneath",
      theme: { chipBg: RED, chipFg: C.white, track: "rgba(43,33,24,.18)", bar: "#ffd25e" },
      art, frames
    });
    css.push(".vls-w03-W3O2c{background:" + CORK + ";color:" + INK + ";}");
  }

  // =====================================================================
  // W3O3a · "The test drive"
  // Technique: parallax world scrolling (the world moves behind the car,
  // three depth layers at three speeds) plus a drawn route on a map.
  // Three suites are cars in a showroom. The vendor drives its own smooth
  // track; Qasr has not drawn its route. Qasr draws the to-be route first,
  // turns it into checkpoints, distrusts cars that fit the old ruts, and
  // tests every car on its own hardest road.
  // =====================================================================
  {
    const SKYc = "#fde6cf", ROAD = "#3c4655", INK = "#1d2a3c";
    const VC = ["#2f8f5b", "#e0613a", "#2c5d9e"];
    const car = (c, drv) => E(0, 16, 40, 5, "rgba(0,0,0,.25)") +
      F("M-38 8 V-4 Q-36 -10 -26 -12 L-14 -24 Q-10 -28 -2 -28 H14 Q22 -28 26 -22 L34 -12 Q40 -10 40 -2 V8 Z", c) +
      F("M-12 -22 H-1 V-12 H-22 Z", "#cfe8ff") + F("M3 -22 H14 Q18 -22 21 -18 L26 -12 H3 Z", "#cfe8ff") +
      (drv ? O(-6, -17, 4.5, "#ffd6a5") + R(-10, -13, 8, 4, drv, 1) : "") +
      [-24, 24].map((x) => Gc("vx-spin", O(x, 8, 9, "#20262f") + O(x, 8, 4, "#9aa8b6") + P(`M${x} 1 V15`, "#5d6d7e", 1.5), `style="animation-duration:1.2s"`)).join("") +
      R(34, -8, 6, 4, "#ffe07a", 1);
    const sign = (x, nm, c, w) => P(`M${x} 210 V176`, "#5d6d7e", 3) + R(x - w / 2, 150, w, 28, c, 5) + T(x, 169, nm, { s: 14, c: C.white });
    const bubble = (cx, nm, k) => K(k, R(cx - 58, 92, 116, 30, "#ffffff", 15, `stroke="#c9d3df" stroke-width="1.5"`) + F(`M${cx - 6} 122 L${cx} 132 L${cx + 6} 122 Z`, "#ffffff") + T(cx, 112, nm, { s: 14, c: INK }));
    const flag = (x, y, c) => P(`M${x} ${y} V${y - 26}`, "#5d6d7e", 2) + F(`M${x} ${y - 26} L${x + 16} ${y - 21} L${x} ${y - 16} Z`, c);
    const cone = (x) => F(`M${x - 9} 222 L${x} 196 L${x + 9} 222 Z`, C.amber) + R(x - 12, 220, 24, 5, C.amber, 2) + P(`M${x - 5} 210 H${x + 5}`, "#ffffff", 2.5);

    const art = () =>
      `<defs>${linDef("w3f-sky", "#fbd3b0", "#c7e3f6", true)}</defs>` + BG("url(#w3f-sky)") +
      // ---- static world ----
      O(342, 46, 20, "#ffe9a8") + Gc("vx-bob", F("M40 70 q8 -14 24 -8 q10 -14 26 -2 q16 -2 16 10 z", "#ffffff", `opacity=".8"`) + F("M250 40 q8 -12 22 -6 q10 -12 24 -2 q14 0 14 8 z", "#ffffff", `opacity=".7"`)) +
      F("M-600 196 Q-300 120 -40 170 Q60 130 160 168 Q260 124 380 166 Q600 120 1000 190 V300 H-600 Z", "#c9dcc0") +
      K("city", [[18, 40], [52, 62], [92, 34], [300, 56], [334, 40], [368, 70]].map(([x, h]) => R(x, 196 - h, 28, h, "#b9c6d6", 2) + R(x + 6, 202 - h, 6, 6, "#fff3c4", 1) + R(x + 16, 214 - h, 6, 6, "#fff3c4", 1)).join(""), null, true) +
      // ---- moving world (parallax) ----
      K("drive",
        Gc("vx-drift", Array.from({ length: 14 }, (_, k) => F(`M${-160 + k * 80} 196 q40 -36 80 0z`, "#b7cfae")).join(""), `style="animation-duration:6s"`) +
        Gc("vx-drift", Array.from({ length: 14 }, (_, k) => R(-150 + k * 80, 150, 24, 46, "#aebcce", 2) + R(-120 + k * 80, 168, 18, 28, "#c3cfdd", 2)).join(""), `style="animation-duration:3s"`)) +
      R(-600, 206, 1600, 60, ROAD, 0) + R(-600, 266, 1600, 40, "#b8b1a4", 0) + R(-600, 200, 1600, 6, "#b8b1a4", 0) +
      K("dashS", Array.from({ length: 14 }, (_, k) => R(-140 + k * 40, 234, 22, 4, "#f4f1e8", 2)).join(""), null, true) +
      K("dashM", Gc("vx-drift", Array.from({ length: 30 }, (_, k) => R(-300 + k * 40, 234, 22, 4, "#f4f1e8", 2)).join(""), `style="animation-duration:.5s"`)) +
      // ---- showroom ----
      K("ribbons", [80, 200, 320].map((x) => P(`M${x - 40} 206 Q${x} 196 ${x + 40} 206`, "#f6b84a", 3)).join("")) +
      ["Vendor A", "Vendor B", "Vendor C"].map((nm, j) => T(80 + j * 120, 288, nm, { s: 14, c: INK, k: "vl" + j })).join("") +
      K("cal", R(170, 34, 60, 50, "#ffffff", 6, `stroke="${INK}" stroke-width="2"`) + R(170, 34, 60, 14, C.coral, 4) + T(200, 74, "Next", { s: 14, c: INK }) + P("M184 30 V40 M216 30 V40", INK, 3)) +
      // directors
      [["IT", "#2c5d9e"], ["Operations", "#e0613a"], ["Finance", "#2f8f5b"]].map(([nm, c], j) =>
        K("dr" + j, person(80 + j * 120, 176, c, 1.15) + T(80 + j * 120, 148, nm, { s: 14, c: INK }))).join("") +
      bubble(70, "Best integration", "bb0") + bubble(200, "Mobile check-in", "bb1") + bubble(330, "Cheap to change", "bb2") +
      [0, 1, 2].map((j) => K("ok" + j, O(80 + j * 120 + 28, 170, 9, C.green) + tick(80 + j * 120 + 28, 171, C.white, 2.2))).join("") +
      K("pd", person(0, 0, INK, 1.2) + O(18, -10, 9, "rgba(255,255,255,.5)", `stroke="${INK}" stroke-width="3"`) + P("M24 -4 L32 4", INK, 4)) +
      // the empty map
      K("map", R(110, 20, 180, 104, "#fffaf0", 6, `stroke="#c9b48a" stroke-width="2"`) + P("M170 20 V124 M230 20 V124", "#efe2c4", 2) +
        P("M128 100 C160 60 210 110 270 44", "#c9b48a", 2.5, `stroke-dasharray="5 6"`) + O(200, 70, 15, C.coral) + T(200, 76, "?", { s: 17, c: C.white }) +
        T(200, 142, "No to-be route", { s: 15, c: C.coral })) +
      // ---- the vendor's track ----
      K("vlab", R(100, 40, 200, 34, "#ffffff", 17, `stroke="${VC[1]}" stroke-width="2.5"`) + O(124, 57, 10, "none", `stroke="${INK}" stroke-width="3"`) + P("M114 57 H134 M124 57 V67", INK, 2.5) + T(212, 63, "Vendor at the wheel", { s: 15, c: INK, k: "vlabT", v: true })) +
      K("vsigns", sign(70, "Clean booking", C.green, 108) + sign(190, "Standard rate", C.green, 104) + sign(310, "Room ready", C.green, 92)) +
      K("rsigns", cone(170) + cone(196) + sign(140, "Corporate rate", C.amber, 116) +
        R(276, 182, 92, 12, C.red, 2) + P("M282 182 L294 194 M302 182 L314 194 M322 182 L334 194 M342 182 L354 194", "#ffffff", 3) + P("M286 194 V214 M358 194 V214", "#5d6d7e", 3) +
        T(322, 168, "Room not ready", { s: 14, c: C.red }) + R(250, 48, 148, 28, INK, 14) + T(324, 67, "Never in the demo", { s: 14, c: C.white })) +
      // ---- Qasr's own map and route ----
      K("qmap", R(20, 18, 360, 128, "#fffaf0", 8, `stroke="#c9b48a" stroke-width="2"`) +
        DP("qroute", "M44 112 C90 112 96 60 140 60 S200 108 240 96 S300 40 356 52", C.teal, 4) +
        T(48, 40, "Qasr to-be", { s: 15, c: C.teal, a: "start" }) +
        K("cp", flag(140, 64, C.amber) + flag(240, 100, C.amber) + flag(356, 56, C.amber) +
          T(140, 88, "Rate check", { s: 14, c: INK }) + T(232, 128, "Early arrival", { s: 14, c: INK }) + T(330, 82, "Room status", { s: 14, c: INK }))) +
      // scoring
      [0, 1, 2].map((j) => K("fb" + j, R(80 + j * 120 - 12, 196 - [26, 42, 22][j], 24, [26, 42, 22][j], VC[j], 3), "50% 100%")).join("") +
      K("fbL", T(200, 166, "Feature count", { s: 15, c: INK })) +
      [0, 1, 2].map((j) => K("sc" + j, [0, 1, 2].map((q) => O(80 + j * 120 - 20 + q * 20, 180, 7, "#ffffff", `stroke="${C.amber}" stroke-width="2"`) + T(80 + j * 120 - 20 + q * 20, 185, "?", { s: 13.5, c: C.amber })).join(""))).join("") +
      K("scL", T(200, 166, "Requirement fit", { s: 15, c: C.teal })) +
      // ---- the old ruts ----
      K("ruts", P("M-40 222 H130 C170 222 170 170 210 170 C250 170 250 222 290 222 H440", "#2a313c", 7) + P("M-40 250 H130 C170 250 170 198 210 198 C250 198 250 250 290 250 H440", "#2a313c", 7)) +
      K("rutL", T(110, 160, "Fits today's process", { s: 15, c: INK })) +
      K("jam", O(370, 182, 13, "#ffd6a5") + TR(370, 182, face(13, "sad")) + O(370, 152, 9, "#ffffff", `stroke="${C.coral}" stroke-width="2"`) + Gc("vx-spin", P("M370 152 V146", C.coral, 2), `style="transform-origin:370px 152px;transform-box:view-box"`) +
        T(328, 128, "Where she waited", { s: 14, c: C.coral })) +
      K("loopL", T(210, 154, "Old detour kept", { s: 15, c: C.coral })) +
      K("warn", F("M200 40 L236 102 H164 Z", C.amber, `stroke="${INK}" stroke-width="3" stroke-linejoin="round"`) + T(200, 94, "!", { s: 30, c: INK }) + T(200, 124, "Fit is a warning", { s: 15, c: INK })) +
      // ---- the hardest case course ----
      K("course", O(130, 160, 18, "#ffffff", `stroke="${INK}" stroke-width="3"`) + P("M130 160 V148 M130 160 L138 164", INK, 2.5) + T(130, 196, "Early", { s: 14, c: INK }) +
        R(196, 150, 70, 26, C.amber, 6) + T(231, 168, "Corporate", { s: 14, c: INK }) + P("M231 176 V206", "#5d6d7e", 3) +
        R(292, 166, 78, 12, C.red, 2) + P("M298 166 L310 178 M318 166 L330 178 M338 166 L350 178", "#ffffff", 3) + P("M300 178 V206 M362 178 V206", "#5d6d7e", 3) + T(331, 156, "Not ready", { s: 14, c: C.red })) +
      K("watch", [["#2c5d9e", 40], ["#e0613a", 74], ["#2f8f5b", 108]].map(([c, x]) => person(x, 72, c, 0.85)).join("") + T(74, 104, "Staff watch", { s: 15, c: INK })) +
      K("qs", [130, 231, 331].map((x) => O(x, 110, 12, "#ffffff", `stroke="${C.plum}" stroke-width="2"`) + T(x, 115, "?", { s: 14, c: C.plum })).join("")) +
      // ---- demo screen and evidence ----
      K("bill", R(40, 30, 150, 96, INK, 8) + R(48, 38, 134, 70, "#bfe3ff", 4) + tick(115, 74, C.green, 4) + T(115, 120, "Demo", { s: 14, c: C.white }) +
        `<g transform="rotate(-10 115 72)">${R(66, 56, 98, 32, "none", 5, `stroke="${C.coral}" stroke-width="3.5"`)}${T(115, 79, "Test it", { s: 17, c: C.coral })}</g>`) +
      K("evid", R(232, 30, 128, 96, "#ffffff", 6, `stroke="${INK}" stroke-width="2"`) + R(276, 24, 40, 12, INK, 3) + [0, 1, 2].map((j) => tick(252, 60 + j * 22, C.green, 2.6) + P(`M266 ${60 + j * 22} H${340 - j * 10}`, "#c9d3df", 4)).join("") +
        T(296, 144, "Evidence", { s: 15, c: C.green })) +
      K("spk", [[60, 160], [170, 150], [110, 186]].map(([x, y], j) => Gc("vx-tw", P(`M${x} ${y - 8} V${y + 8} M${x - 8} ${y} H${x + 8}`, "#ffffff", 3), `style="animation-delay:${j * 0.3}s"`)).join("") + T(115, 144, "Attractive", { s: 15, c: "#7a4a12" })) +
      // ---- the cars (drawn last) ----
      [0, 1, 2].map((j) => K("car" + j, car(VC[j]))).join("") +
      K("vdrv", car(VC[1], C.amber));

    const parked = (o) => ({ car0: { o: o, x: 80, y: 236, sc: 1 }, car1: { o: o, x: 200, y: 236, sc: 1 }, car2: { o: o, x: 320, y: 236, sc: 1 } });
    const S = (...a) => Object.assign({}, ...a);
    const frames = [
      // 0 the committee must choose a suite
      { L: "Choosing a suite", on: "ribbons vl0 vl1 vl2", s: S(parked(1), { pd: { x: 200, y: 180 }, vdrv: { x: 160, y: 236 }, "fb0 fb1 fb2": { sy: 0.05 } }), pop: "car0 car1 car2" },
      // 1 three demonstrations, decision next meeting
      { L: "Decision next meeting", on: "cal", pop: "cal" },
      // 2 something is missing
      { L: "Something is missing", off: "cal", on: "map", s: { map: { sc: 1 } }, pop: "map" },
      // 3 three directors
      { L: "Three directors", off: "map", on: "dr0 dr1 dr2", pop: "dr0 dr1 dr2" },
      // 4 IT: integration
      { L: "IT: integration", on: "bb0", s: { car0: { y: 230 } }, pop: "bb0" },
      // 5 operations: the mobile demo
      { L: "Operations: the demo", on: "bb1", s: { car0: { y: 236 }, car1: { y: 230 } }, pop: "bb1" },
      // 6 finance: change in four years
      { L: "Finance: four years", on: "bb2", s: { car1: { y: 236 }, car2: { y: 230 } }, pop: "bb2" },
      // 7 every concern is legitimate
      { L: "All legitimate", on: "ok0 ok1 ok2", s: { car2: { y: 236 } }, pop: "ok0 ok1 ok2" },
      // 8 the programme director notices
      { L: "Programme director", off: "bb0 bb1 bb2 ok0 ok1 ok2", on: "pd", s: { "dr0 dr1 dr2": { o: 0.35 }, pd: { y: 100 } }, pop: "pd" },
      // 9 no to-be process written down
      { L: "No to-be process", on: "map", s: { pd: { x: 330, y: 110 }, "dr0 dr1 dr2": { o: 0 } }, pop: "map", ring: [200, 70, C.coral] },
      // 10 the demonstration is doing the design
      { L: "The demo designs", off: "map pd dr0 dr1 dr2 ribbons vl0 vl1 vl2 dashS", on: "vdrv drive dashM vlab", s: S(parked(0), { vdrv: { o: 1, x: 160 } }), pop: "vlab" },
      // 11 smooth for a particular reason
      { L: "Smooth, for a reason", s: { vdrv: { x: 200 }, vlabT: { t: "Their own smooth track" } }, pop: "vlab" },
      // 12 the vendor's easy guest
      { L: "The vendor's easy guest", on: "vsigns", pop: "vsigns" },
      // 13 the real road was never shown
      { L: "Never shown", off: "vsigns drive dashM vlab", on: "rsigns dashS", s: { vdrv: { x: 60 } }, pop: "rsigns" },
      // 14 draw the to-be route first
      { L: "Draw the to-be first", off: "rsigns vdrv", on: "qmap", s: S(parked(1), { qroute: { d: 1 }, cp: { o: 0 } }) },
      // 15 requirements from the outline
      { L: "Process requirements", on: "cp", pop: "cp" },
      // 16 not a feature count
      { L: "Not feature counts", on: "fb0 fb1 fb2 fbL vl0 vl1 vl2", s: { "fb0 fb1 fb2": { sy: 1 } }, pop: "fb1" },
      // 17 score against the requirements
      { L: "Score the requirements", off: "fb0 fb1 fb2 fbL", on: "sc0 sc1 sc2 scL", pop: "sc0 sc1 sc2" },
      // 18 "we fit your current process"
      { L: "Fits current process?", off: "qmap sc0 sc1 sc2 scL car0 car2 vl0 vl1 vl2", on: "ruts rutL", s: { car1: { x: 60, y: 238 } } },
      // 19 the current process made her wait
      { L: "The process that failed", on: "jam", pop: "jam" },
      // 20 the fit keeps the old detours
      { L: "Keeps old detours", off: "rutL", on: "loopL", s: { car1: { x: 210, y: 196 } } },
      // 21 close fit is a warning here
      { L: "Fit is a warning", off: "loopL", on: "warn", s: { car1: { x: 290, y: 238 } }, pop: "warn" },
      // 22 test with Qasr's hardest case
      { L: "Your hardest case", off: "ruts jam warn car1", on: "course dashS", s: S(parked(0), { car0: { o: 1, x: 40, y: 238, sc: 0.8 } }) },
      // 23 early, corporate, not ready
      { L: "Early, corporate, no room", pop: "course", ring: [[130, 160, C.amber], [231, 163, C.amber], [331, 172, C.red]] },
      // 24 watch each suite handle that guest
      { L: "Watch each suite", on: "watch qs car1 car2", s: { car0: { x: 230 }, car1: { o: 1, x: 120, y: 238, sc: 0.8 }, car2: { o: 1, x: 40, y: 238, sc: 0.8 } }, pop: "qs" },
      // 25 demonstrations still reveal things
      { L: "Demos still help", off: "course watch qs car0 car1 car2", on: "bill", pop: "bill" },
      // 26 from designing to testing
      { L: "From design to test", on: "qmap", s: { bill: { y: 134 }, vdrv: { o: 1, x: 300, y: 238 } } },
      // 27 attractive behaviour or evidence?
      { L: "Attractive or evident?", off: "qmap bill vdrv", on: "evid spk", pop: "evid" }
    ];
    register("W3O3a", {
      title: "Choosing a suite",
      aria: "Three suites shown as cars: the vendor drives its own smooth road, while Qasr draws its route and tests every car on its hardest case",
      theme: { chipBg: INK, chipFg: C.white, track: "rgba(29,42,60,.15)", bar: C.amber },
      art, frames
    });
    css.push(".vls-w03-W3O3a{background:" + SKYc + ";color:" + INK + ";}");
  }

  // =====================================================================
  // W3O3b · "Concrete or bricks"
  // Technique: Pudding-style table reading (a ruler slides row by row and
  // the cells re-colour) followed by a four-year time-lapse with running
  // cost meters. Vendor B is concrete poured into the exact shape of today's
  // process; Vendors A and C are bricks Qasr's own staff can rearrange.
  // =====================================================================
  {
    const BGc = "#eef1f5", INK = "#1d2a3c", WIN = "#2f8f5b", LOSE = "#c63b2b", MUTE = "#5d6d7e";
    const ROWS = [
      ["Features", ["Lower", "Highest", "Lower"]],
      ["Fit today", ["Partial", "Close", "Partial"]],
      ["Change cost", ["Low", "High", "Low"]],
      ["Custom code", ["None", "Yes", "None"]],
      ["Who trains", ["In-house", "Vendor", "In-house"]]
    ];
    const COLX = [200, 270, 340];
    const RY = (r) => 58 + r * 40;
    const cell = (r, c, val) => K(`c${r}${c}`, R(COLX[c] - 33, RY(r) + 5, 66, 30, "#ffffff", 6, `${KA("cb" + r + c, null, true)}`) + T(COLX[c], RY(r) + 25, val, { s: 14, c: INK, k: "ct" + r + c, v: true }), null, true);
    const brick = (x, y, c, k) => R(x, y, 30, 16, c, 2, `${k ? KA(k, null, true) : ""} stroke="#ffffff" stroke-width="1.5"`);
    const coin = (x, y) => O(x, y, 8, "#ffd25e", `stroke="#c99a2e" stroke-width="2"`);

    const art = () =>
      BG(BGc) + Array.from({ length: 12 }, (_, k) => P(`M-600 ${k * 30} H1000`, "#e3e8ef", 1)).join("") +
      // ---------- Exhibit 3: the scoring table ----------
      K("table",
        R(10, 22, 380, 236, "#ffffff", 10, `stroke="#c9d3df" stroke-width="2"`) +
        T(20, 46, "Exhibit 3", { s: 15, c: INK, a: "start" }) +
        ["A", "B", "C"].map((v, j) => T(COLX[j], 46, v, { s: 16, c: j === 1 ? C.coral : INK })).join("") +
        P("M10 56 H390", "#c9d3df", 2) +
        ROWS.map(([nm, vals], r) =>
          K("row" + r, T(20, RY(r) + 25, nm, { s: 15, c: INK, a: "start", k: "rn" + r, v: true }) + vals.map((v, c) => cell(r, c, v)).join("") +
            (r < 4 ? P(`M18 ${RY(r) + 40} H382`, "#eef1f5", 1.5) : ""))).join(""), null, true) +
      K("ruler", R(12, 0, 376, 38, "rgba(242,163,58,.22)", 6, `stroke="${C.amber}" stroke-width="2"`), "50% 0%") +
      K("crown", F("M258 30 L262 18 L270 26 L278 18 L282 30 Z", "#f2a33a")) +
      K("wins", R(234, 262, 72, 26, WIN, 13) + T(270, 280, "2 wins", { s: 14, c: C.white })) +
      K("guest", O(156, 0, 9, "#ffd6a5") + TR(156, 0, face(9, "happy"))) +
      K("chg", [["Contracts", 70], ["Rates", 200], ["Guests", 330]].map(([nm, x]) =>
        Gc("vx-spin", P(`M${x - 12} 272 A12 12 0 1 1 ${x} 284`, C.plum, 2.5) + P(`M${x - 2} 280 L${x} 285 L${x - 6} 287`, C.plum, 2.5), `style="animation-duration:4s"`) + T(x + 18, 282, nm, { s: 14, c: C.plum, a: "start" })).join("")) +
      K("verdict", R(36, 262, 328, 30, INK, 15) + T(200, 282, "Wins today, loses tomorrow", { s: 15, c: C.white, k: "verT", v: true })) +
      K("vs", R(118, 127, 34, 22, C.plum, 11) + T(135, 143, "vs", { s: 14, c: C.white })) +
      // ---------- concrete versus bricks ----------
      K("split",
        R(10, 30, 186, 264, "#e6e6e3", 10) + R(204, 30, 186, 264, "#f3ece4", 10) +
        T(103, 54, "Vendor B", { s: 16, c: C.coral }) + T(297, 54, "Vendors A, C", { s: 16, c: WIN }) +
        T(22, 258, "Change cost", { s: 14, c: MUTE, a: "start" }) + T(216, 258, "Change cost", { s: 14, c: MUTE, a: "start" }) +
        R(22, 266, 160, 12, "#d5d9de", 6) + R(216, 266, 160, 12, "#e7ddd0", 6)) +
      K("costB", R(22, 266, 160, 12, LOSE, 6), "0% 50%") +
      K("costA", R(216, 266, 160, 12, WIN, 6), "0% 50%") +
      K("yr", R(160, 4, 80, 22, INK, 11) + T(200, 20, "Year 1", { s: 14, c: C.white, k: "yrT", v: true })) +
      // concrete statue shaped like today's process
      K("mixer", R(64, 64, 52, 26, "#9aa8b6", 6) + P("M90 90 V120", "#a8a29a", 8, `class="vx-flow"`)) +
      K("statue", F("M40 232 V160 L66 140 L92 168 L118 124 L144 150 L166 136 V232 Z", "#bdbab3", `stroke="#8f8b84" stroke-width="2" ${KA("stF", null, true)}`), "50% 100%") +
      K("fitL", T(104, 104, "Exact fit today", { s: 15, c: INK })) +
      K("cracks", P("M70 150 l8 16 -6 10 10 18 M120 132 l-6 20 8 12 -4 22 M150 150 l6 18 -8 14", LOSE, 2.5) + P("M30 120 V232 M176 120 V232 M30 140 H176 M30 190 H176", "#8a6a3a", 2, `stroke-dasharray="6 5"`)) +
      K("hammer", person(170, 222, C.amber, 1) + P("M156 214 L138 196", "#5d6d7e", 5) + P("M134 190 L142 202", "#2b3a4f", 7) + Gc("vx-shake", P("M128 204 l-6 4 M130 214 l-8 2", LOSE, 2)) +
        O(40, 130, 12, "#ffffff", `stroke="${LOSE}" stroke-width="2.5"`) + Gc("vx-spin", P("M40 130 V122", LOSE, 2.5), `style="transform-origin:40px 130px;transform-box:view-box"`)) +
      K("bookB", R(132, 122, 30, 22, "#ffd25e", 3, `stroke="${C.coral}" stroke-width="2"`) + R(150, 112, 14, 12, C.coral, 3) + P("M153 112 V108 Q157 102 161 108 V112", C.coral, 2) + P("M147 122 V144", C.coral, 1.5)) +
      K("buy", [0, 1, 2].map((j) => Gc("vx-rise", coin(80 + j * 26, 200), `style="animation-delay:${j * 0.5}s"`)).join("")) +
      T(104, 80, "Retest every part", { s: 14, c: LOSE, k: "bMsg" }) +
      // bricks Qasr can rearrange
      K("tower", [0, 1, 2, 3, 4].map((row) => [0, 1, 2].map((c) => brick(250 + c * 32 + (row % 2) * 8, 214 - row * 18, ["#e0613a", "#f2a33a", "#2c5d9e", "#2f8f5b", "#7b5ea7"][(row + c) % 5], row === 2 && c === 1 ? "swapOld" : null)).join("")).join("")) +
      K("swapNew", brick(0, 0, "#1f9a8a")) +
      K("addRow", [0, 1, 2].map((c) => brick(258 + c * 32, 124, ["#1f9a8a", "#f2a33a", "#2c5d9e"][c])).join("")) +
      K("fitR", T(297, 104, "Rearrangeable", { s: 15, c: INK })) +
      K("staff", person(356, 222, WIN, 1) + R(340, 196, 16, 12, "#ffffff", 2, `stroke="${WIN}" stroke-width="1.5"`)) +
      K("bookA", R(-15, -11, 30, 22, "#ffd25e", 3, `stroke="${WIN}" stroke-width="2"`) + P("M0 -11 V11", WIN, 1.5)) +
      T(297, 80, "Staff test it", { s: 14, c: WIN, k: "aMsg" }) +
      K("upg", R(150, 64, 100, 26, C.plum, 13) + T(200, 82, "Upgrade", { s: 14, c: C.white }) + P("M150 77 L128 98 M250 77 L272 98", C.plum, 2.5) + P("M122 92 L127 100 L134 94 M266 94 L273 100 L278 92", C.plum, 2.5)) +
      K("contract", R(176, 110, 48, 60, "#ffffff", 4, `stroke="${INK}" stroke-width="2"`) + P("M186 126 H214 M186 136 H214 M186 146 H206", "#c9d3df", 3) + T(200, 186, "New rate", { s: 14, c: INK })) +
      K("van", R(300, 160, 64, 34, C.coral, 6) + R(352, 168, 22, 26, C.coral, 4) + R(356, 172, 14, 10, "#cfe8ff", 2) + O(318, 196, 7, "#20262f") + O(358, 196, 7, "#20262f") + T(332, 182, "Vendor", { s: 13.5, c: C.white })) +
      // ---------- 80% adopted versus 100% resisted ----------
      K("adopt",
        T(104, 60, "100% fit", { s: 16, c: LOSE }) + T(296, 60, "80% fit", { s: 16, c: WIN }) +
        R(54, 90, 100, 100, "#c9d3df", 8, `stroke="${MUTE}" stroke-width="2"`) +
        F("M246 90 H346 V190 H286 V160 H246 Z", "#c9d3df", `stroke="${MUTE}" stroke-width="2"`) +
        K("resist", person(30, 236, MUTE, 1) + person(176, 236, MUTE, 1) + P("M40 214 C60 250 150 250 166 214", LOSE, 2.5, `stroke-dasharray="5 5"`) + T(104, 276, "Resisted", { s: 15, c: LOSE })) +
        K("use", person(266, 236, WIN, 1) + person(306, 236, WIN, 1) + person(346, 236, WIN, 1) + P("M266 214 V196 M306 214 V196 M346 214 V196", WIN, 2.5) + T(296, 276, "Adopted", { s: 15, c: WIN }))) +
      K("bestT", O(330, 92, 16, WIN) + tick(330, 93, C.white, 3)) +
      // ---------- Noor's unused capability ----------
      K("noor", R(130, 96, 140, 100, "#ffffff", 10, `stroke="${C.teal}" stroke-width="3"`) + R(150, 116, 100, 60, "#d9f2ec", 6) +
        [[160, 130], [200, 150], [236, 126], [180, 170]].map(([x, y]) => O(x, y, 3, "#b8ab9a")).join("") +
        P("M262 100 L240 100 M262 100 L262 122 M262 100 L244 118", "#9aa8b6", 1.5) +
        T(200, 76, "Noor Health", { s: 16, c: C.teal }) + T(200, 222, "Capability, no value", { s: 15, c: LOSE }));

    const S = (...a) => Object.assign({}, ...a);
    const colour = (r, cols) => { const o = {}; cols.forEach(([c, col]) => { o["cb" + r + c] = { f: col }; o["ct" + r + c] = { f: C.white }; }); return o; };
    const ruler = (r) => ({ ruler: { o: 1, y: RY(r) + 1 } });
    const frames = [
      // 0 Exhibit 3
      { L: "Exhibit 3", s: { "row0 row1 row2 row3 row4": { o: 0 }, ruler: { y: RY(0) + 1 }, statue: { sy: 0.05 }, guest: { x: 0, y: RY(2) + 20 } } },
      // 1 a few words everyone can discuss
      { L: "Easy to discuss", on: "row0 row1 row2 row3 row4", pop: "row0 row1 row2 row3 row4" },
      // 2 read before forming a view
      { L: "Read every row", on: "ruler", s: { ruler: { y: RY(4) + 1 } } },
      // 3 B has the most features
      { L: "B: most features", on: "crown", s: S(ruler(0), colour(0, [[1, WIN]])), pop: "c01" },
      // 4 B fits today's process closely
      { L: "B: close fit", s: S(ruler(1), colour(1, [[1, WIN]])), pop: "c11" },
      // 5 count strengths and B wins
      { L: "Counting strengths", off: "ruler", on: "wins", pop: "wins" },
      // 6 the finance row
      { L: "Cost to change", off: "wins", on: "guest", s: S(ruler(2), { rn2: { f: C.coral } }), pop: "rn2" },
      // 7 every later change touches real guests
      { L: "Real guests, real changes", s: { guest: { x: 2 } }, pop: "guest", ring: [158, RY(2) + 20, C.coral] },
      // 8 B high, A and C low
      { L: "B high, others low", off: "guest", s: colour(2, [[0, WIN], [1, LOSE], [2, WIN]]), pop: "c20 c21 c22" },
      // 9 contracts, rates and expectations keep changing
      { L: "Change never stops", on: "chg", pop: "chg" },
      // 10 B needs custom code
      { L: "Custom code", off: "chg", s: S(ruler(3), colour(3, [[0, WIN], [1, LOSE], [2, WIN]])), pop: "c31" },
      // 11 custom code bends the product to today
      { L: "Bent to fit today", off: "table ruler crown", on: "split mixer statue tower costB costA", s: { statue: { sy: 1 }, costB: { sx: 0.02 }, costA: { sx: 0.02 } } },
      // 12 today's fit, tomorrow's rigidity
      { L: "Fit today, rigid tomorrow", off: "mixer", on: "fitL fitR", s: { stF: { f: "#9c988f" } }, pop: "statue tower" },
      // 13 what happens at an upgrade?
      { L: "What at upgrade?", off: "fitL fitR", on: "yr upg", pop: "upg" },
      // 14 rebuild and retest the custom parts
      { L: "Rebuild and retest", off: "upg", on: "cracks bMsg", s: { costB: { sx: 0.35 }, costA: { sx: 0.08 }, tower: { y: -6 } }, pop: "cracks" },
      // 15 a rate rule must change in days
      { L: "A rule must change", off: "cracks bMsg", on: "contract", s: { yrT: { t: "Year 2" }, tower: { y: 0 } }, pop: "contract" },
      // 16 A or C: a supported setting, staff test it
      { L: "A, C: adjust settings", on: "staff swapNew aMsg", s: { swapOld: { o: 0 }, swapNew: { x: 282, y: 178 }, costA: { sx: 0.14 } }, pop: "swapNew" },
      // 17 B: wait for vendor specialists
      { L: "B: waits for vendor", off: "contract", on: "hammer bMsg", s: { bMsg: { t: "Waits for vendor" }, costB: { sx: 0.6 }, yrT: { t: "Year 3" } }, pop: "hammer" },
      // 18 who is trained afterwards
      { L: "Who holds the knowledge?", off: "hammer aMsg", on: "bookB bookA", s: { bookA: { x: 330, y: 150 }, bMsg: { t: "Vendor holds it" } }, pop: "bookB bookA" },
      // 19 every improvement becomes a purchase
      { L: "Every change, a purchase", on: "buy", s: { costB: { sx: 0.9 }, bMsg: { t: "Buy every change" }, yrT: { t: "Year 4" } } },
      // 20 the honest reading
      { L: "The honest reading", off: "split statue tower stF bookB bookA buy bMsg staff swapNew yr costA costB", on: "table verdict", s: S(colour(4, [[0, WIN], [1, LOSE], [2, WIN]]), { "row2 row3 row4": { o: 1 } }), pop: "verdict" },
      // 21 depends on the current process
      { L: "Preserve today's process?", off: "verdict", on: "vs ruler", s: { ruler: { y: RY(1) + 1, sy: 2.05 }, verT: { t: "Fit or freedom?" } }, pop: "vs" },
      // 22 redesigning: freedom to change matters more
      { L: "Freedom to change", on: "verdict", s: { row1: { o: 0.3 }, ruler: { y: RY(2) + 1, sy: 1 }, verT: { t: "Freedom to change wins" } }, pop: "row2" },
      // 23 80% adopted beats 100% resisted
      { L: "80% adopted beats 100%", off: "table vs ruler verdict", on: "adopt resist use", pop: "adopt" },
      // 24 adoption over perfect fit
      { L: "Adoption beats fit", on: "bestT", s: { resist: { o: 0.4 } }, pop: "bestT use" },
      // 25 Noor: capability without value
      { L: "Capability, no value", off: "adopt bestT", on: "noor", pop: "noor" },
      // 26 keep improving after the vendor leaves
      { L: "Keep improving", off: "noor", on: "split tower staff van addRow", s: { van: { x: 120, o: 0, dl: 0.6 }, "costA": { sx: 0.12 }, statue: { o: 0 } }, pop: "addRow" },
      // 27 which row will still matter?
      { L: "Which row lasts?", off: "split tower staff van addRow", on: "table verdict ruler", s: { row1: { o: 1 }, ruler: { y: RY(2) + 1 }, verT: { t: "Read every row" } }, pop: "row2" }
    ];
    register("W3O3b", {
      title: "Exhibit 3",
      aria: "The vendor scoring table read row by row, then concrete versus bricks over four years of change",
      theme: { chipBg: INK, chipFg: C.white, track: "rgba(29,42,60,.12)", bar: C.coral },
      art, frames
    });
    css.push(".vls-w03-W3O3b{background:" + BGc + ";color:" + INK + ";}");
  }

  // =====================================================================
  // W3O3c · "Go / no-go"
  // Technique: mission-control status cascade (a polling board whose lamps
  // turn from unknown to GO one question at a time) with a detail monitor
  // that shows the evidence behind each lamp, and a countdown on HOLD.
  // Signing a contract is a launch: nobody launches until every console
  // can answer, the hardest case has been test-fired and a live change has
  // been shown.
  // =====================================================================
  {
    const DARK = "#0f1b2d", PANEL = "#16263d", LINE = "#2a3f5c", TXT = "#e6eefb", DIMT = "#8fa3bf", GO = "#3ccf7e", HOLD = "#ffb547", NO = "#ff6b5a";
    const QS = ["Named owners", "Baseline", "Maturity", "People plan", "Governance"];
    const RYc = (r) => 62 + r * 40;
    const rocket = (lbl, sz) => F("M0 -86 C14 -70 18 -40 18 -10 V30 H-18 V-10 C-18 -40 -14 -70 0 -86 Z", "#e9eef5", `stroke="#9fb3cc" stroke-width="2"`) +
      O(0, -44, 8, "#7fb7e3", `stroke="#5d7ea6" stroke-width="2"`) + F("M-18 10 L-32 34 H-18 Z M18 10 L32 34 H18 Z", C.coral) +
      R(-12, 30, 24, 8, "#5d6d7e", 2) + (lbl ? T(0, -4, lbl, { s: sz || 14, c: "#33435a" }) : "");
    const badge = (x, nm) => R(x - 34, 70, 68, 84, "#ffffff", 8) + R(x - 34, 70, 68, 16, C.navy, 6) + O(x, 108, 13, "#c9d3df") + F(`M${x - 18} 140 Q${x - 18} 124 ${x} 124 Q${x + 18} 124 ${x + 18} 140 Z`, "#c9d3df") + T(x, 172, nm, { s: 14, c: TXT });
    const lamp = (r, col, k) => K(k, O(30, RYc(r), 8, col) + Gc("vx-pulse", O(30, RYc(r), 12, "none", `stroke="${col}" stroke-width="1.5" opacity=".6"`)));

    const art = () =>
      BG(DARK) + Array.from({ length: 16 }, (_, k) => P(`M${k * 30 - 30} -500 V800`, "#13233a", 1)).join("") +
      // ---------- opening: control room ----------
      K("room",
        R(16, 24, 210, 116, PANEL, 10, `stroke="${LINE}" stroke-width="2"`) +
        T(121, 52, "Steering meeting", { s: 15, c: DIMT }) +
        T(121, 96, "T−7 days", { s: 30, c: TXT, k: "cdT", v: true }) +
        R(30, 196, 196, 26, "#22344f", 6) + [52, 116, 180].map((x) => person(x, 186, "#5d7ea6", 1)).join("") +
        P("M10 236 H236", LINE, 3) +
        K("pad", TR(316, 230, rocket("Suite")) + R(270, 268, 92, 10, "#33435a", 3) + P("M350 268 V150 M350 170 H332 M350 210 H334", "#5d6d7e", 3), null, true)) +
      K("ex3", `<g transform="rotate(-6 162 166)">${R(124, 146, 76, 40, "#ffffff", 3)}${T(162, 172, "Exhibit 3", { s: 14, c: C.ink })}</g>`) +
      K("hold", R(30, 124, 182, 2, NO, 1) + Gc("vx-blink", R(34, 142, 64, 24, NO, 12) + T(66, 159, "HOLD", { s: 15, c: C.white }))) +
      K("hand", P("M180 170 L196 140", "#5d7ea6", 5) + O(197, 136, 5, "#ffd6a5")) +
      K("scale", F("M310 202 L298 222 H322 Z", "#5d7ea6") + R(286, 222, 48, 6, "#5d7ea6", 2) +
        K("beam", P("M236 200 H384", TXT, 3) + R(244, 186, 28, 14, GO, 3) + T(258, 178, "One week", { s: 14, c: GO }) + R(332, 152, 48, 48, NO, 4) + T(356, 142, "Reversal", { s: 14, c: NO }), null, true)) +
      // ---------- the readiness board ----------
      K("board",
        R(10, 8, 198, 250, PANEL, 10, `stroke="${LINE}" stroke-width="2"`) + T(22, 32, "Readiness", { s: 15, c: HOLD, a: "start" }) +
        QS.map((q, r) => P(`M20 ${RYc(r) + 20} H198`, LINE, 1) + O(30, RYc(r), 8, "#3a4a63") + T(46, RYc(r) + 5, q, { s: 15, c: TXT, a: "start", k: "q" + r, v: true }) +
          T(198, RYc(r) + 5, "?", { s: 15, c: DIMT, a: "end", k: "st" + r, v: true })).join("")) +
      K("goB", R(146, 16, 56, 22, GO, 11) + T(174, 32, "GO", { s: 14, c: DARK })) +
      K("holdB", R(146, 16, 56, 22, HOLD, 11) + T(174, 32, "HOLD", { s: 14, c: DARK })) +
      QS.map((q, r) => lamp(r, GO, "lg" + r) + lamp(r, HOLD, "la" + r)).join("") +
      K("three", T(110, 252, "Three blanks: failure", { s: 14, c: NO })) +
      // evidence strip
      K("evs", R(10, 266, 198, 28, PANEL, 14, `stroke="${LINE}" stroke-width="2"`) + T(110, 285, "Hardest case", { s: 14, c: TXT }) +
        R(214, 266, 178, 28, PANEL, 14, `stroke="${LINE}" stroke-width="2"`) + T(303, 285, "Live change", { s: 14, c: TXT })) +
      K("ev0", O(28, 280, 7, GO)) + K("ev1", O(232, 280, 7, GO)) +
      // ---------- the detail monitor ----------
      K("mon", R(216, 8, 176, 250, "#0b1626", 10, `stroke="${LINE}" stroke-width="2"`)) +
      K("d0", badge(266, "Sponsor") + badge(342, "Owner")) +
      K("comm", [0, 1, 2, 3, 4].map((j) => O(256 + j * 22, 214 - (j % 2) * 8, 9, "#5d6d7e")).join("") + O(352, 196, 11, NO) + T(352, 201, "?", { s: 14, c: C.white }) + T(303, 246, "Not a committee", { s: 14, c: NO })) +
      K("d1", P("M253 150 A50 50 0 0 1 353 150", "#2a3f5c", 12) + K("needle", P("M303 150 L303 106", HOLD, 4), "50% 100%", true) + O(303, 150, 7, TXT) + T(303, 186, "Waiting time", { s: 14, c: TXT }) +
        K("rec", R(244, 204, 118, 26, GO, 13) + T(303, 222, "Recorded today", { s: 14, c: DARK }))) +
      K("d2", R(250, 50, 106, 40, "#7b5ea7", 6) + T(303, 76, "Ambition", { s: 14, c: C.white }) +
        K("eng", R(280, 92, 46, 90, "#2c5d9e", 6) + F("M286 182 L303 214 L320 182 Z", HOLD, `opacity=".8"`), "50% 0%", true) + T(303, 236, "Readiness", { s: 14, c: "#7fb7e3" })) +
      K("d3", person(258, 132, C.amber, 1.1) + person(300, 132, "#2c5d9e", 1.1) + person(342, 132, C.teal, 1.1) + T(300, 168, "Reception to revenue", { s: 14, c: TXT }) +
        K("tags", [["Time", 248, 44], ["Training", 310, 72], ["Voice", 368, 44]].map(([nm, x, w]) => R(x - w / 2, 194, w, 24, "#22344f", 12, `stroke="${GO}" stroke-width="1.5"`) + T(x, 211, nm, { s: 14, c: GO })).join(""))) +
      K("d4", P("M303 150 V120", "#9fb3cc", 4) + F("M276 112 Q303 80 330 112 Z", "#9fb3cc") + Gc("vx-blink", P("M318 92 q8 -8 16 0 M322 84 q12 -12 24 0", GO, 2)) + R(270, 150, 66, 30, "#22344f", 6) + T(303, 170, "Control", { s: 14, c: TXT }) +
        K("team", person(250, 222, "#5d6d7e", 0.9) + person(276, 222, "#5d6d7e", 0.9) + T(264, 252, "Project team", { s: 13.5, c: DIMT }))) +
      // hardest case test stand
      K("d5", T(303, 34, "Test stand", { s: 15, c: HOLD }) + P("M232 150 H376", TXT, 2.5) +
        K("obs", O(262, 132, 12, "none", `stroke="${TXT}" stroke-width="2.5"`) + P("M262 132 V124 M262 132 L268 136", TXT, 2) +
          R(288, 122, 34, 20, HOLD, 4) + T(305, 137, "Rate", { s: 13.5, c: DARK }) + R(338, 128, 30, 8, NO, 2) + P("M342 128 L348 136 M352 128 L358 136", C.white, 2)) +
        K("gtk", O(0, 0, 10, "#ffd6a5") + TR(0, 0, face(10, "flat"))) +
        person(250, 222, C.amber, 0.9) + person(303, 222, "#2c5d9e", 0.9) + person(356, 222, C.teal, 0.9) + T(303, 252, "Staff test it", { s: 14, c: TXT }) +
        K("spk", [[262, 112], [305, 108], [353, 112]].map(([x, y], j) => Gc("vx-tw", P(`M${x} ${y - 7} V${y + 7} M${x - 7} ${y} H${x + 7}`, NO, 2.5), `style="animation-delay:${j * 0.3}s"`)).join("") + T(303, 78, "Real exceptions", { s: 14, c: NO }))) +
      // live change demo
      K("d6", T(303, 34, "Four years ahead", { s: 15, c: HOLD }) + [0, 1, 2, 3].map((j) => R(236 + j * 38, 50, 32, 30, "#22344f", 4) + T(252 + j * 38, 70, "Y" + (j + 1), { s: 14, c: TXT })).join("") +
        K("rule", R(246, 110, 114, 44, "#ffffff", 8) + T(303, 130, "Rate rule", { s: 14, c: C.ink }) + T(303, 147, "AED 540", { s: 13.5, c: C.coral, k: "rv", v: true })) +
        K("gol", R(228, 92, 2, 70, HOLD, 1) + T(234, 174, "After go-live", { s: 14, c: HOLD, a: "start" })) +
        K("sw", O(262, 214, 16, "none", `stroke="${TXT}" stroke-width="3"`) + Gc("vx-spin", P("M262 214 V202", HOLD, 2.5), `style="transform-origin:262px 214px;transform-box:view-box;animation-duration:2s"`) + T(338, 212, "Who? How long?", { s: 14, c: TXT }) + person(338, 240, "#7fb7e3", 0.7)) +
        K("xray", R(246, 110, 114, 44, "rgba(255,107,90,.18)", 8, `stroke="${NO}" stroke-width="2.5" stroke-dasharray="5 4"`) + R(318, 118, 34, 28, NO, 4) + T(335, 137, "</>", { s: 14, c: C.white }) + T(303, 100, "Custom code?", { s: 14, c: NO }))) +
      // decision
      K("allgo", TR(303, 200, rocket("Suite")) + R(250, 44, 106, 30, GO, 15) + T(303, 64, "All GO", { s: 16, c: DARK })) +
      K("fin", [["A", 250], ["B", 303], ["C", 356]].map(([v, x]) => TR(x, 140, rocket(v, 20), 0.7)).join("") +
        R(244, 196, 118, 30, "#ffffff", 6) + T(303, 216, "Evidence file", { s: 14, c: C.ink }) + T(303, 246, "Any, if justified", { s: 14, c: GO })) +
      K("launch", TR(303, 150, rocket("Qasr", 16), 0.9) + Gc("vx-pulse", F("M293 186 Q303 230 313 186 Z", HOLD) + F("M297 186 Q303 210 309 186 Z", "#fff1a8")) +
        O(303, 40, 16, "#ffd6a5") + TR(303, 40, face(16, "happy")) + T(303, 76, "Better arrival", { s: 15, c: GO })) +
      K("noor", R(232, 120, 142, 96, "#22344f", 6) + [0, 1, 2, 3, 4, 5].map((j) => R(244 + (j % 3) * 42, 134 + Math.floor(j / 3) * 34, 30, 22, "#33435a", 3)).join("") +
        R(292, 94, 22, 22, NO, 3) + P("M303 98 V112 M296 105 H310", C.white, 3) + T(303, 240, "Noor Health", { s: 15, c: "#8fe0cf" }));

    const S = (...a) => Object.assign({}, ...a);
    const st = (r, txt, col) => { const o = {}; o["st" + r] = { t: txt, f: col }; return o; };
    const frames = [
      // 0 the steering committee meets
      { L: "Decision meeting", on: "room", s: { gtk: { x: 232, y: 138 }, needle: { r: -60 } } },
      // 1 a recommendation is expected
      { L: "Recommend a suite", on: "ex3", pop: "ex3" },
      // 2 pause before anyone signs
      { L: "Pause before signing", on: "hold hand", s: { cdT: { t: "T−7 days" } }, pop: "hold" },
      // 3 one careful week versus a reversal
      { L: "One week or reversal", off: "hand ex3", on: "scale", s: { beam: { r: 8 }, pad: { o: 0 } }, pop: "beam" },
      // 4 a readiness check
      { L: "A readiness check", off: "room scale hold", on: "board holdB mon", pop: "board" },
      // 5 five questions; three blanks predict failure
      { L: "Five questions", on: "three la0 la1 la2", pop: "three" },
      // 6 named sponsor and owner
      { L: "Name real people", off: "three la0 la1 la2", on: "d0 lg0", s: st(0, "GO", GO), pop: "d0", ring: [30, RYc(0), GO, 18] },
      // 7 a committee cannot be accountable
      { L: "Not a committee", on: "comm", pop: "comm" },
      // 8 is there a baseline?
      { L: "A baseline?", off: "d0 comm", on: "d1 la1", s: st(1, "HOLD", HOLD), pop: "d1" },
      // 9 record today's waiting time
      { L: "Record it today", off: "la1", on: "rec lg1", s: S(st(1, "GO", GO), { needle: { r: 34 } }), pop: "rec", ring: [30, RYc(1), GO, 18] },
      // 10 does maturity support the plan?
      { L: "Maturity check", off: "d1", on: "d2 la2", s: st(2, "HOLD", HOLD), pop: "d2" },
      // 11 ambition versus readiness
      { L: "Ambition versus readiness", s: { eng: { sx: 0.7 }, d2: { r: -4 } }, pop: "eng" },
      // 12 the people whose work changes
      { L: "The people plan", off: "d2", on: "d3 la3", s: st(3, "HOLD", HOLD), pop: "d3" },
      // 13 time, training and a voice
      { L: "Time, training, voice", off: "la3", on: "tags lg3", s: st(3, "GO", GO), pop: "tags", ring: [30, RYc(3), GO, 18] },
      // 14 who governs after the project?
      { L: "Who governs after?", off: "d3", on: "d4 team la4", s: st(4, "?", HOLD), pop: "d4" },
      // 15 governance outlives the team
      { L: "Outlives the team", off: "la4", on: "lg4", s: S(st(4, "GO", GO), { team: { x: -60, o: 0 } }), ring: [30, RYc(4), GO, 18] },
      // 16 evidence from Qasr's own hardest case
      { L: "Test the hardest case", off: "d4", on: "d5 evs gtk", s: { "obs spk": { o: 0 } }, pop: "d5" },
      // 17 an early corporate guest, room not ready
      { L: "Early, corporate, no room", on: "obs", s: { gtk: { x: 352, y: 138 } } },
      // 18 exceptions demos rarely show
      { L: "Real exceptions", on: "spk ev0", pop: "spk ev0" },
      // 19 four years ahead deserves a test
      { L: "Four years ahead", off: "d5 gtk", on: "d6", s: { "rule gol sw xray": { o: 0 } }, pop: "d6" },
      // 20 change a rule live
      { L: "Change a rule live", on: "rule", s: { rv: { t: "AED 495" } }, pop: "rule" },
      // 21 after go-live, with real guests
      { L: "After go-live", on: "gol", pop: "gol" },
      // 22 who does the work, how long
      { L: "Who, and how long?", on: "sw", pop: "sw" },
      // 23 custom code exposed
      { L: "Custom code exposed", on: "xray ev1", pop: "xray ev1" },
      // 24 honest confidence
      { L: "Honest confidence", off: "d6 holdB la2", on: "goB lg2 allgo", s: st(2, "GO", GO), pop: "goB", ring: [174, 27, GO] },
      // 25 the evidence must justify the choice
      { L: "Evidence decides", off: "allgo", on: "fin", pop: "fin" },
      // 26 a better arrival that stays adaptable
      { L: "Better, and adaptable", off: "fin", on: "launch", s: { launch: { y: -20 } }, pop: "launch" },
      // 27 a very different outcome
      { L: "A different outcome", off: "launch", on: "noor", pop: "noor" }
    ];
    register("W3O3c", {
      title: "Decision meeting",
      aria: "A mission-control readiness board turns each question from unknown to GO before Qasr commits to a suite",
      theme: { chipBg: GO, chipFg: DARK, track: "rgba(255,255,255,.14)", bar: HOLD },
      art, frames
    });
    css.push(".vls-w03-W3O3c{background:" + DARK + ";color:" + TXT + ";}");
  }

  installCss(["W3O2c", "W3O3a", "W3O3b", "W3O3c"], "w03-claude-part2", css);
})();

// FILE w03-claude-part3.js
// OPER621 · Week 3 · Animated teaching scenes · part 3 of 3 (W3O2d)
// Prof. Bassem Jarboui · HBMSU · VoiceLearn
// Contract: window.VL_SCENES[secId] = { build(el), step(i, n), reset() }; one entry per narration line.
// CSS: appended to the single <style id="vl-sc-w03">, every rule scoped under .vls-w03-<secId>.
// Uses window.gsap when present (CSS transitions otherwise); honours prefers-reduced-motion.
// Standalone: this part defines every helper it uses and can be concatenated with the other parts.
(() => {
  "use strict";
  const W = window;
  W.VL_SCENES = W.VL_SCENES || {};
  const SID = "vl-sc-w03";
  const DOC = W.document;

  // ---------- environment ----------
  const RM = () => {
    try { return !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    catch (e) { return false; }
  };
  const GS = () => (W.gsap && typeof W.gsap.to === "function" && typeof W.gsap.set === "function") ? W.gsap : null;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const words = (s) => (s ? String(s).trim().split(/\s+/).filter(Boolean) : []);

  // ---------- palette ----------
  const C = {
    ink: "#18243a", navy: "#1f4e79", deep: "#14213d", teal: "#1f8a7a", mint: "#d8f1ea",
    coral: "#e4572e", peach: "#fde3d6", amber: "#f2a33a", gold: "#e9c46a", sun: "#fff1c1",
    plum: "#6b4f8c", lilac: "#e7def5", sky: "#7fb7e3", ice: "#e3f0fb", green: "#2f8f5b",
    leaf: "#58b368", pale: "#e3f4e8", red: "#c63b2b", slate: "#5d6d7e", grey: "#9aa8b6",
    mist: "#e9eef3", white: "#ffffff", paper: "#fbf8f1", cream: "#f6efdc", cork: "#c99b6d"
  };

  // ---------- SVG string helpers (all defined here, used by the scenes) ----------
  const A = (o) => Object.keys(o || {}).filter((k) => o[k] !== null && o[k] !== undefined && o[k] !== false)
    .map((k) => `${k}="${o[k]}"`).join(" ");
  const KA = (k, o, v) => (k ? `data-k="${k}"` + (o ? ` data-o="${o}"` : "") + (v ? ` data-v="1"` : "") : "");
  const R = (x, y, w, h, fill, rx, ex) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx === undefined ? 8 : rx}" fill="${fill}" ${ex || ""}/>`;
  const O = (cx, cy, r, fill, ex) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${ex || ""}/>`;
  const E = (cx, cy, rx, ry, fill, ex) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${ex || ""}/>`;
  const P = (d, s, w, ex) => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w === undefined ? 3 : w}" stroke-linecap="round" stroke-linejoin="round" ${ex || ""}/>`;
  const F = (d, fill, ex) => `<path d="${d}" fill="${fill}" ${ex || ""}/>`;
  // keyed drawable stroke: drawn by the "d" state (0..1)
  const DP = (k, d, s, w, ex) => `<path data-k="${k}" data-dr="1" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" d="${d}" fill="none" stroke="${s}" stroke-width="${w === undefined ? 3 : w}" stroke-linecap="round" stroke-linejoin="round" ${ex || ""}/>`;
  // text: o = {s:size, c:color, a:anchor, w:weight, h:halo colour, k:key, cls}
  const T = (x, y, str, o) => {
    o = o || {};
    const halo = o.h ? ` stroke="${o.h}" stroke-width="${o.hw || 5}" stroke-linejoin="round" paint-order="stroke"` : "";
    return `<text x="${x}" y="${y}" text-anchor="${o.a || "middle"}" font-size="${o.s || 16}" font-weight="${o.w || 750}" fill="${o.c || C.ink}"${halo} ${KA(o.k, o.o, o.v)} ${o.cls ? `class="${o.cls}"` : ""} ${o.ex || ""}>${str}</text>`;
  };
  // keyed group: k = key, inner = svg string, o = transform origin, v = visible by default, cls = class on inner wrapper
  const K = (k, inner, o, v, cls) => `<g ${KA(k, o, v)}><g class="vx-i${cls ? " " + cls : ""}">${inner}</g></g>`;
  const Gc = (cls, inner, ex) => `<g class="${cls}" ${ex || ""}>${inner}</g>`;
  const TR = (x, y, inner, s) => `<g transform="translate(${x} ${y})${s ? ` scale(${s})` : ""}">${inner}</g>`;
  const person = (x, y, c, s, ex) => TR(x, y, O(0, -15, 9, c) + F("M-14 14 Q-14 -3 0 -3 Q14 -3 14 14 Z", c), s || 1);
  const face = (r, mood) => {
    const e = r * 0.32, ey = -r * 0.12, er = Math.max(1.6, r * 0.13);
    const mouth = mood === "sad" ? P(`M${-r * 0.3} ${r * 0.42} Q0 ${r * 0.18} ${r * 0.3} ${r * 0.42}`, C.ink, 1.8)
      : mood === "flat" ? P(`M${-r * 0.25} ${r * 0.34} H${r * 0.25}`, C.ink, 1.8)
      : P(`M${-r * 0.3} ${r * 0.26} Q0 ${r * 0.55} ${r * 0.3} ${r * 0.26}`, C.ink, 1.8);
    return O(-e, ey, er, C.ink) + O(e, ey, er, C.ink) + mouth;
  };
  const tick = (x, y, c, w) => P(`M${x - 8} ${y} l6 6 l11 -13`, c || C.green, w || 3.5);
  const cross = (x, y, c, w) => P(`M${x - 6} ${y - 6} l12 12 M${x + 6} ${y - 6} l-12 12`, c || C.coral, w || 3.5);
  const glowDef = (id, c1, c2) => `<radialGradient id="${id}"><stop offset="0" stop-color="${c1}" stop-opacity="1"/><stop offset="1" stop-color="${c2 || c1}" stop-opacity="0"/></radialGradient>`;
  const linDef = (id, c1, c2, vert) => `<linearGradient id="${id}" x1="0" y1="0" x2="${vert ? 0 : 1}" y2="${vert ? 1 : 0}"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`;
  const BG = (fill) => R(-600, -500, 1600, 1300, fill, 0);

  // ---------- one shared <style id="vl-sc-w03">, rules scoped per section ----------
  const KF = [
    "@keyframes vlw03pop{0%{transform:scale(1)}35%{transform:scale(1.16)}70%{transform:scale(.97)}100%{transform:scale(1)}}",
    "@keyframes vlw03ring{0%{opacity:.95;transform:scale(.2)}100%{opacity:0;transform:scale(1.7)}}",
    "@keyframes vlw03spin{to{transform:rotate(360deg)}}",
    "@keyframes vlw03spinr{to{transform:rotate(-360deg)}}",
    "@keyframes vlw03bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}",
    "@keyframes vlw03flow{to{stroke-dashoffset:-28}}",
    "@keyframes vlw03blink{0%,100%{opacity:1}50%{opacity:.25}}",
    "@keyframes vlw03swing{from{transform:rotate(-24deg)}to{transform:rotate(24deg)}}",
    "@keyframes vlw03tw{0%,100%{opacity:.25;transform:scale(.6)}50%{opacity:1;transform:scale(1.15)}}",
    "@keyframes vlw03wob{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}",
    "@keyframes vlw03pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}",
    "@keyframes vlw03drift{0%{transform:translateX(0)}100%{transform:translateX(-80px)}}",
    "@keyframes vlw03rise{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(-30px);opacity:0}}",
    "@keyframes vlw03shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-2px)}75%{transform:translateX(2px)}}",
    "@keyframes vlw03chip{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}"
  ];
  const BASE = [
    "&{position:relative;display:flex;flex-direction:column;width:100%;height:100%;min-height:0;overflow:hidden;box-sizing:border-box;border-radius:14px;font-family:inherit;}",
    "& *{box-sizing:border-box;}",
    "& .vx-hd{flex:0 0 auto;display:flex;align-items:center;gap:10px;padding:7px 12px 5px;min-height:32px;}",
    "& .vx-chip{flex:0 1 auto;max-width:86%;padding:4px 11px;border-radius:999px;font-size:13px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.3;}",
    "& .vx-chip.go{animation:vlw03chip .45s ease-out 1;}",
    "& .vx-pg{flex:1 1 auto;height:4px;border-radius:2px;overflow:hidden;min-width:24px;}",
    "& .vx-pgb{height:100%;width:0;border-radius:2px;transition:width .6s ease;}",
    "& .vx-svg{flex:1 1 0;display:block;width:100%;height:100%;min-height:150px;overflow:hidden;}",
    "& .vx-svg text{font-family:inherit;pointer-events:none;}",
    "& [data-k]{transform-box:fill-box;transform-origin:50% 50%;transition:transform .85s cubic-bezier(.45,0,.15,1),opacity .55s ease,fill .55s ease,stroke .55s ease,stroke-dashoffset 1.15s cubic-bezier(.45,0,.2,1);}",
    "&.vx-inst [data-k],&.vx-g [data-k]{transition:none!important;}",
    "& .vx-i{transform-box:fill-box;transform-origin:50% 50%;}",
    "& .vx-pop{animation:vlw03pop .62s cubic-bezier(.3,1.5,.5,1) 1;}",
    "& .vx-ring{fill:none;stroke-width:3;opacity:0;transform-box:fill-box;transform-origin:50% 50%;pointer-events:none;}",
    "& .vx-ring.go{animation:vlw03ring .95s ease-out 1;}",
    "& .vx-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlw03spin 9s linear infinite;}",
    "& .vx-spinr{transform-box:fill-box;transform-origin:50% 50%;animation:vlw03spinr 7s linear infinite;}",
    "& .vx-bob{animation:vlw03bob 2.6s ease-in-out infinite;}",
    "& .vx-flow{stroke-dasharray:6 8;animation:vlw03flow 1.1s linear infinite;}",
    "& .vx-fast{animation-duration:.35s!important;}",
    "& .vx-blink{animation:vlw03blink 1.4s ease-in-out infinite;}",
    "& .vx-swing{transform-box:fill-box;transform-origin:50% 100%;animation:vlw03swing 1.1s ease-in-out infinite alternate;}",
    "& .vx-tw{transform-box:fill-box;transform-origin:50% 50%;animation:vlw03tw 1.9s ease-in-out infinite;}",
    "& .vx-wob{transform-box:fill-box;transform-origin:50% 50%;animation:vlw03wob 1.3s ease-in-out infinite;}",
    "& .vx-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlw03pulse 1.6s ease-in-out infinite;}",
    "& .vx-drift{animation:vlw03drift 3s linear infinite;}",
    "& .vx-rise{animation:vlw03rise 2.4s ease-out infinite;}",
    "& .vx-shake{animation:vlw03shake .35s linear infinite;}",
    "@media (max-width:420px){& .vx-chip{font-size:12px;letter-spacing:.05em;}& .vx-hd{padding:6px 10px 4px;}}",
    "@media (max-width:360px){& .vx-chip{font-size:11px;letter-spacing:.03em;padding:4px 9px;}}",
    "@media (prefers-reduced-motion:reduce){& *,& *::before,& *::after{animation:none!important;transition:none!important;}}"
  ];
  function installCss(ids, marker, extra) {
    if (!DOC) return;
    let s = DOC.getElementById(SID);
    if (!s) {
      s = DOC.createElement("style");
      s.id = SID;
      (DOC.head || DOC.documentElement).appendChild(s);
    }
    if (s.textContent.indexOf("/*" + marker + "*/") >= 0) return;
    const sc = (rule) => ids.map((id) => rule.split("&").join(".vls-w03-" + id)).join("\n");
    s.textContent += "\n/*" + marker + "*/\n" + KF.join("\n") + "\n" + BASE.map(sc).join("\n") + "\n" + (extra || []).join("\n");
  }

  // ---------- scene engine ----------
  // def.frames: one entry per narration line: {L:"2-4 word chip", on:"keys", off:"keys", s:{key:{props}}, pop:"keys", ring:[x,y,colour]}
  // props: o opacity, x y translate, r rotate, sc scale, sx sy, d draw 0..1, f fill, st stroke, t text, n number (nd decimals, ns suffix, np prefix), dl delay (this line only)
  const DEF = { o: 0, x: 0, y: 0, r: 0, sc: 1, sx: 1, sy: 1 };
  const TIMING = { dl: 1, du: 1 };
  function register(id, def) {
    const N = def.frames.length;
    const states = [], labels = [], timing = [], orders = [];
    let acc = {}, lab = def.title || "";
    def.frames.forEach((f) => {
      const nx = {};
      for (const k in acc) nx[k] = Object.assign({}, acc[k]);
      const ord = [], tm = {};
      const touch = (k) => { if (ord.indexOf(k) < 0) ord.push(k); };
      words(f.off).forEach((k) => { nx[k] = Object.assign({}, nx[k], { o: 0 }); touch(k); });
      words(f.on).forEach((k) => { nx[k] = Object.assign({}, nx[k], { o: 1 }); touch(k); });
      const s = f.s || {};
      Object.keys(s).forEach((ks) => words(ks).forEach((k) => {
        const p = Object.assign({}, s[ks]);
        Object.keys(TIMING).forEach((t) => { if (p[t] !== undefined) { tm[k] = tm[k] || {}; tm[k][t] = p[t]; delete p[t]; } });
        nx[k] = Object.assign({}, nx[k], p);
        touch(k);
      }));
      if (f.L) lab = f.L;
      acc = nx;
      states.push(nx); labels.push(lab); timing.push(tm); orders.push(ord);
    });

    let root = null, chip = null, bar = null, map = {}, cur = {}, idx = -1, timers = [], rings = [], ringI = 0;
    const later = (fn, ms) => { timers.push(W.setTimeout(fn, ms)); };
    const clearTimers = () => { timers.forEach((t) => W.clearTimeout(t)); timers = []; };

    function full(k, s) {
      const n = map[k];
      const base = Object.assign({}, DEF);
      if (n && n.hasAttribute("data-v")) base.o = 1;
      if (n && n.hasAttribute("data-dr")) { base.o = 1; base.d = 0; }
      return Object.assign(base, s || {});
    }
    function counter(n, t, inst) {
      const to = +t.n, dec = t.nd || 0, pre = t.np || "", suf = t.ns || "";
      const fmt = (v) => pre + v.toFixed(dec) + suf;
      const from = (typeof n._v === "number") ? n._v : to;
      n._v = to;
      if (n._tw && n._tw.kill) n._tw.kill();
      if (n._raf) W.cancelAnimationFrame(n._raf);
      if (inst || from === to || !W.requestAnimationFrame) { n.textContent = fmt(to); return; }
      const g = GS();
      if (g) {
        const o = { v: from };
        n._tw = g.to(o, { v: to, duration: 1.2, ease: "power2.out", onUpdate: () => { n.textContent = fmt(o.v); } });
        return;
      }
      const t0 = W.performance ? W.performance.now() : Date.now();
      const stepF = (now) => {
        const p = clamp((now - t0) / 1200, 0, 1), e = 1 - Math.pow(1 - p, 3);
        n.textContent = fmt(from + (to - from) * e);
        if (p < 1) n._raf = W.requestAnimationFrame(stepF);
      };
      n._raf = W.requestAnimationFrame(stepF);
    }
    function setNode(n, t, inst, delay, du) {
      const dr = n.hasAttribute("data-dr");
      const op = dr && !(t.d > 0.001) ? 0 : t.o;
      const sx = t.sc * t.sx, sy = t.sc * t.sy;
      const g = GS();
      if (g) {
        const v = { x: t.x, y: t.y, rotation: t.r, scaleX: sx, scaleY: sy, opacity: op, transformOrigin: n.getAttribute("data-o") || "50% 50%" };
        if (t.f) v.fill = t.f;
        if (t.st) v.stroke = t.st;
        if (dr) v.strokeDashoffset = 1 - (t.d || 0);
        if (inst) { if (g.killTweensOf) g.killTweensOf(n); g.set(n, v); }
        else g.to(n, Object.assign(v, { duration: du || 0.85, delay: delay, ease: "power2.inOut", overwrite: "auto" }));
      } else {
        n.style.transitionDelay = inst ? "0s" : delay.toFixed(2) + "s";
        n.style.transitionDuration = !inst && du ? du + "s" : "";
        n.style.transform = `translate(${t.x}px,${t.y}px) rotate(${t.r}deg) scale(${sx},${sy})`;
        n.style.opacity = String(op);
        if (t.f) n.style.fill = t.f;
        if (t.st) n.style.stroke = t.st;
        if (dr) n.style.strokeDashoffset = String(1 - (t.d || 0));
      }
      if (t.t !== undefined && n.textContent !== String(t.t)) n.textContent = String(t.t);
      if (t.n !== undefined) counter(n, t, inst);
    }
    function pop(k, delay) {
      const n = map[k];
      if (!n) return;
      const inner = n.querySelector(".vx-i") || n;
      later(() => { inner.classList.remove("vx-pop"); void inner.getBoundingClientRect(); inner.classList.add("vx-pop"); }, delay * 1000);
    }
    function ring(spec, delay) {
      if (!spec || !rings.length) return;
      const list = Array.isArray(spec[0]) ? spec : [spec];
      list.forEach((r, j) => {
        const c = rings[(ringI++) % rings.length];
        later(() => {
          c.setAttribute("cx", r[0]); c.setAttribute("cy", r[1]);
          c.setAttribute("r", r[3] || 26);
          c.setAttribute("stroke", r[2] || def.ring || C.coral);
          c.classList.remove("go"); void c.getBoundingClientRect(); c.classList.add("go");
        }, (delay + j * 0.18) * 1000);
      });
    }
    function setLabel(txt, inst) {
      if (!chip || chip.textContent === txt) return;
      chip.textContent = txt;
      chip.classList.remove("go");
      if (!inst) { void chip.offsetWidth; chip.classList.add("go"); }
    }
    function apply(i, inst) {
      const rm = RM();
      inst = !!inst || rm;
      const g = GS();
      root.classList.toggle("vx-g", !!g);
      if (inst) {
        clearTimers();
        root.classList.add("vx-inst");
        rings.forEach((c) => c.classList.remove("go"));
        root.querySelectorAll(".vx-pop").forEach((n) => n.classList.remove("vx-pop"));
      }
      const st = states[i], ord = orders[i], tm = timing[i];
      Object.keys(map).forEach((k) => {
        const t = full(k, st[k]);
        const js = JSON.stringify(t);
        if (!inst && cur[k] === js) return;
        const oi = ord.indexOf(k);
        const tk = tm[k] || {};
        const delay = inst ? 0 : (oi > 0 ? Math.min(oi * 0.06, 0.7) : 0) + (tk.dl || 0);
        setNode(map[k], t, inst, delay, tk.du);
        cur[k] = js;
      });
      if (inst) { void root.offsetWidth; root.classList.remove("vx-inst"); }
      setLabel(labels[i], inst);
      if (bar) bar.style.width = (((i + 1) / N) * 100).toFixed(1) + "%";
      if (!inst) {
        const f = def.frames[i];
        words(f.pop).forEach((k, j) => pop(k, 0.25 + j * 0.08));
        ring(f.ring, 0.3);
      }
      idx = i;
    }
    W.VL_SCENES[id] = {
      build(el) {
        if (!el || !DOC) return;
        clearTimers();
        const th = def.theme || {};
        root = DOC.createElement("div");
        root.className = "vls-w03 vls-w03-" + id;
        root.innerHTML =
          `<div class="vx-hd"><span class="vx-chip" aria-live="polite" style="background:${th.chipBg || C.navy};color:${th.chipFg || C.white}"></span>` +
          `<span class="vx-pg" aria-hidden="true" style="background:${th.track || "rgba(31,78,121,.15)"}"><span class="vx-pgb" style="display:block;background:${th.bar || C.coral}"></span></span></div>` +
          `<svg class="vx-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${def.aria || id}">` +
          def.art() +
          `<g aria-hidden="true">${[0, 1, 2].map(() => `<circle class="vx-ring" cx="200" cy="150" r="26" stroke="${C.coral}"/>`).join("")}</g></svg>`;
        if (typeof el.replaceChildren === "function") el.replaceChildren(root);
        else { el.innerHTML = ""; el.appendChild(root); }
        chip = root.querySelector(".vx-chip");
        bar = root.querySelector(".vx-pgb");
        rings = Array.from(root.querySelectorAll(".vx-ring"));
        map = {}; cur = {};
        root.querySelectorAll("[data-k]").forEach((n) => {
          map[n.getAttribute("data-k")] = n;
          const o = n.getAttribute("data-o");
          if (o) n.style.transformOrigin = o;
        });
        apply(0, true);
      },
      step(i, n) {
        if (!root) return;
        const nn = Number.isFinite(+n) && +n > 0 ? Math.floor(+n) : N;
        let ii = Number.isFinite(+i) ? Math.floor(+i) : 0;
        ii = clamp(ii, 0, nn - 1);
        if (nn !== N) ii = Math.round((ii * (N - 1)) / Math.max(1, nn - 1));
        ii = clamp(ii, 0, N - 1);
        if (ii === idx) return;
        apply(ii, false);
      },
      reset() { if (root) apply(0, true); }
    };
  }

  const css = [];
  // =====================================================================
  // W3O2d · "The discharge clock"
  // Technique: radial clock geometry (3Blue1Brown-style sweeping arcs on a
  // five-hour dial) inside a hospital story: 91 models fanned from a 2019
  // manual, clinicians outside the glass, modules left unplugged, two
  // evidence trays, and a forum thread built in the order the task requires.
  // =====================================================================
  {
    const BGc = "#eef7f8", INK = "#17323a", TEAL = "#1f8a7a", CORAL = "#e4572e", NAVY = "#1f4e79", GREEN = "#2f8f5b";
    const CX = 150, CY = 162;
    const ang = (h) => (h / 5) * 2 * Math.PI - Math.PI / 2;
    const pt = (r, h) => [CX + r * Math.cos(ang(h)), CY + r * Math.sin(ang(h))].map((v) => v.toFixed(1));
    const arc = (r, h0, h1) => { const a = pt(r, h0), b = pt(r, h1); return `M${a[0]} ${a[1]} A${r} ${r} 0 ${h1 - h0 > 2.5 ? 1 : 0} 1 ${b[0]} ${b[1]}`; };
    const sector = (r0, r1, h0, h1) => { const a = pt(r1, h0), b = pt(r1, h1), c = pt(r0, h1), d = pt(r0, h0); return `M${a[0]} ${a[1]} A${r1} ${r1} 0 0 1 ${b[0]} ${b[1]} L${c[0]} ${c[1]} A${r0} ${r0} 0 0 0 ${d[0]} ${d[1]} Z`; };
    const hosp = (x, w, h) => R(x, 232 - h, w, h, "#ffffff", 4, `stroke="#b7dcd6" stroke-width="2"`) + R(x + w / 2 - 4, 240 - h, 8, 20, CORAL, 1) + R(x + w / 2 - 10, 246 - h, 20, 8, CORAL, 1) +
      [0, 1].map((r) => [0, 1].map((c) => R(x + 8 + c * (w - 26), 270 - h + r * 22, 10, 10, "#cfe9e5", 2)).join("")).join("");
    const bed = () => R(-22, -6, 44, 10, "#ffffff", 3, `stroke="${INK}" stroke-width="2"`) + R(-22, -16, 8, 20, INK, 2) + O(-10, -12, 6, "#ffd6a5") + P("M-18 4 V12 M18 4 V12", INK, 2.5);
    const chip = (x, y, w, txt, c, dashed) => R(x - w / 2, y - 15, w, 30, "#ffffff", 15, `stroke="${c}" stroke-width="2"${dashed ? ' stroke-dasharray="5 4"' : ""}`) + T(x, y + 5, txt, { s: 14, c: c });
    const book = (x, y, txt) => R(x, y, 96, 26, NAVY, 4) + R(x, y, 8, 26, "#0f2c4a", 2) + T(x + 52, y + 18, txt, { s: 14, c: C.white });

    const art = () =>
      `<defs>${linDef("w3i-bg", "#f4fbfb", "#e3f1f2", true)}</defs>` + BG("url(#w3i-bg)") +
      R(-600, 232, 1600, 400, "#d9ecea", 0) + P("M-600 232 H1000", "#b7dcd6", 2) +
      // ---------- A: from Qasr to Noor ----------
      K("city", T(250, 62, "Noor Health", { s: 22, c: TEAL }) +
        [[124, 48, 96], [176, 48, 120], [228, 48, 108], [280, 48, 130], [332, 48, 100]].map(([x, w, h], j) => K("hs" + j, hosp(x, w, h), "50% 100%", true)).join("") +
        K("qasr", R(20, 150, 64, 82, "#f6e7c9", 4, `stroke="#c9b48a" stroke-width="2"`) + [0, 1, 2].map((r) => R(30, 160 + r * 22, 12, 12, "#c9b48a", 2) + R(62, 160 + r * 22, 12, 12, "#c9b48a", 2)).join("") + T(52, 256, "Qasr", { s: 14, c: "#8a6a3a" }), null, true)) +
      K("ideas", [0, 1, 2, 3, 4].map((j) => Gc("vx-bob", O(0, j * 0, 8, [TEAL, NAVY, CORAL, C.amber, C.plum][j], `transform="translate(${j * 20} ${(j % 2) * 10})"`), `style="animation-delay:${j * 0.2}s"`)).join("") + T(40, -24, "Transfer the ideas", { s: 15, c: INK })) +
      K("gift", R(150, 116, 100, 72, "#ffffff", 8, `stroke="${C.amber}" stroke-width="3"`) + R(194, 116, 12, 72, C.amber, 0) + R(150, 144, 100, 12, C.amber, 0) +
        F("M200 116 C186 96 170 100 178 114 Z M200 116 C214 96 230 100 222 114 Z", CORAL) + R(236, 90, 92, 28, INK, 14) + T(282, 109, "AED 6.2M", { s: 15, c: C.white })) +
      K("dq", TR(80, 112, bed()) + O(80, 76, 14, "#ffffff", `stroke="${CORAL}" stroke-width="2.5"`) + Gc("vx-spin", P("M80 76 V66", CORAL, 2.5), `style="transform-origin:80px 76px;transform-box:view-box;animation-duration:3s"`) + T(80, 148, "Faster discharge?", { s: 14, c: CORAL })) +
      // ---------- B: 91 models from a manual ----------
      K("manual", R(22, 70, 74, 92, "#e9dfc7", 4, `stroke="#a08c5c" stroke-width="2"`) + R(22, 70, 10, 92, "#a08c5c", 2) + T(62, 112, "2019", { s: 16, c: INK }) + T(60, 182, "Policy manual", { s: 14, c: INK })) +
      K("cards", Array.from({ length: 12 }, (_, i) => {
        const x = 130 + (i % 4) * 62, y = 52 + Math.floor(i / 4) * 50;
        return K("m" + i, R(x, y, 52, 38, "#ffffff", 4, `stroke="${NAVY}" stroke-width="1.5"`) + R(x + 6, y + 10, 12, 9, "#d7e9fa", 2) + R(x + 22, y + 10, 12, 9, "#d7e9fa", 2) + R(x + 38, y + 18, 9, 9, "#d7e9fa", 2) + P(`M${x + 18} ${y + 14} H${x + 22} M${x + 34} ${y + 14} H${x + 40}`, NAVY, 1.2));
      }).join("") + T(253, 216, "0 models", { s: 15, c: NAVY, k: "cnt", v: true })) +
      K("wall", P("M110 230 H390", CORAL, 2.5, `stroke-dasharray="7 6"`) + O(110, 230, 10, "#ffffff", `stroke="${CORAL}" stroke-width="2"`) + cross(110, 230, CORAL, 2.5)) +
      [["Doctor", 136], ["Nurse", 204], ["Pharmacy", 274], ["Transport", 348]].map(([nm, x], j) =>
        K("cl" + j, person(x, 262, ["#2fb39a", "#2f8f5b", "#5aa9c8", "#7b8fd6"][j], 1) + T(x, 292, nm, { s: 14, c: INK }))).join("") +
      K("notA", T(52, 266, "Not asked", { s: 15, c: CORAL })) +
      K("paper", P("M120 92 H380", NAVY, 2.5, `stroke-dasharray="8 6"`) + T(120, 80, "On paper", { s: 14, c: NAVY, a: "start" })) +
      DP("hand", "M120 246 C150 216 180 276 204 246 C228 216 250 276 274 246 C298 216 324 276 348 246", CORAL, 3) +
      K("hlab", T(250, 190, "Handoffs and judgement", { s: 15, c: CORAL })) +
      K("bedB", bed()) +
      K("lens", O(0, 0, 24, "rgba(255,255,255,.4)", `stroke="${INK}" stroke-width="5"`) + P("M17 17 L32 32", INK, 7)) +
      K("qm", chip(253, 30, 130, "Question them", CORAL)) +
      // ---------- C: modules left outside the work ----------
      K("suite",
        [["Models", 80, TEAL], ["Rules engine", 200, "#8a9aa6"], ["Dashboard", 320, "#8a9aa6"]].map(([nm, x, c], j) =>
          R(x - 52, 58, 104, 84, "#ffffff", 10, `stroke="${c}" stroke-width="2.5"`) + T(x, 80, nm, { s: 15, c: j ? INK : TEAL })).join("") +
        [0, 1, 2].map((j) => R(48 + j * 22, 92, 16, 12, "#d7f1ec", 2, `stroke="${TEAL}" stroke-width="1.2"`)).join("") + R(58, 112, 44, 14, TEAL, 3) +
        F("M200 92 L220 112 L200 132 L180 112 Z", "#e7ecf0", `stroke="#8a9aa6" stroke-width="2"`) +
        P("M292 128 A28 28 0 0 1 348 128", "#c9d3df", 7) + K("gN", P("M320 128 L304 108", "#8a9aa6", 3), "100% 100%", true) +
        R(260, 238, 120, 30, "#ffffff", 6, `stroke="${NAVY}" stroke-width="2"`) + T(320, 258, "Hospital system", { s: 14, c: NAVY })) +
      K("unplug", P("M200 142 C200 170 236 170 238 186", "#5d6d7e", 3) + R(232, 186, 14, 12, "#5d6d7e", 2) + O(200, 112, 13, CORAL) + cross(200, 112, C.white, 2.5) +
        P("M320 142 C320 176 300 196 316 214", "#5d6d7e", 3) + R(310, 212, 12, 12, "#5d6d7e", 2) + Gc("vx-blink", P("M318 228 l-4 6 6 0 -4 6", C.amber, 2))) +
      K("does", T(190, 160, "Applies rules", { s: 14, c: INK }) + T(330, 160, "Shows performance", { s: 14, c: INK }) +
        P("M220 112 H232 M200 132 V138", TEAL, 2.5)) +
      K("corr", P("M20 206 H390", "#9fc9c2", 10) + T(80, 228, "Patient flow", { s: 14, c: TEAL })) +
      K("bedC", bed()) +
      K("noval", R(140, 178, 120, 26, CORAL, 13) + T(200, 196, "No value yet", { s: 14, c: C.white })) +
      // ---------- D: the five-hour discharge clock ----------
      K("clock",
        O(CX, CY, 104, "#ffffff", `stroke="#c9e3df" stroke-width="2"`) +
        Array.from({ length: 20 }, (_, k) => { const a = pt(98, k / 4), b = pt(k % 4 ? 93 : 86, k / 4); return P(`M${a[0]} ${a[1]} L${b[0]} ${b[1]}`, "#9fc9c2", k % 4 ? 1.5 : 3); }).join("") +
        T(CX, 44, "0 h", { s: 14, c: INK }) + T(CX, 166, "Hours", { s: 14, c: "#7aa8a0" }) +
        DP("a41", arc(78, 0, 4.1), NAVY, 14) + DP("a287", arc(60, 0, 2.87), GREEN, 14) + DP("a39", arc(42, 0, 3.9), CORAL, 14) +
        K("gap", F(sector(30, 88, 2.87, 3.9), "rgba(228,87,46,.18)", `stroke="${CORAL}" stroke-width="1.5" stroke-dasharray="4 4"`)) +
        K("qs", [[2.95, 74], [3.25, 58], [3.55, 72], [3.8, 50], [3.2, 40]].map(([h, r]) => { const p = pt(r, h); return T(p[0], +p[1] + 5, "?", { s: 15, c: CORAL }); }).join(""))) +
      K("lg0", O(272, 86, 7, NAVY) + T(284, 91, "Start 4.1 h", { s: 14, c: NAVY, a: "start" })) +
      K("lg1", O(272, 116, 7, GREEN) + T(284, 121, "Promise 2.87 h", { s: 14, c: GREEN, a: "start" })) +
      K("lg2", O(272, 146, 7, CORAL) + T(284, 151, "Actual 3.9 h", { s: 14, c: CORAL, a: "start" })) +
      K("lg3", R(268, 168, 110, 48, "#ffffff", 8, `stroke="${CORAL}" stroke-width="2"`) + T(323, 188, "−4.9%", { s: 15, c: CORAL }) + T(323, 207, "not −30%", { s: 14, c: GREEN })) +
      K("many", T(318, 246, "Many possible causes", { s: 14, c: CORAL })) +
      // ---------- E: two evidence trays ----------
      K("trays", R(14, 40, 180, 186, "#ffffff", 10, `stroke="${TEAL}" stroke-width="2.5"`) + T(104, 64, "Established", { s: 16, c: TEAL }) +
        R(206, 40, 180, 186, "#ffffff", 10, `stroke="${CORAL}" stroke-width="2.5" stroke-dasharray="7 5"`) + T(296, 64, "To investigate", { s: 16, c: CORAL }) +
        chip(104, 92, 150, "AED 6.2M suite", TEAL) + chip(104, 128, 150, "91 manual models", TEAL) + chip(104, 164, 150, "Rules unused", TEAL)) +
      K("e1", chip(104, 200, 150, "Clinicians excluded", TEAL)) +
      K("e2", chip(296, 110, 150, "How much impact?", CORAL, true) + chip(296, 150, 150, "Which weakness?", CORAL, true)) +
      K("stop", F("M200 210 l18 0 13 13 0 18 -13 13 -18 0 -13 -13 0 -18 z", CORAL) + T(209, 237, "STOP", { s: 13.5, c: C.white }) + chip(300, 270, 150, "Another purchase?", CORAL, true)) +
      // ---------- F: the forum task ----------
      K("crit", [["Process fit", 72], ["Hardest case", 112], ["Change cost", 152], ["Readiness", 192]].map(([nm, y]) => chip(84, y, 136, nm, NAVY)).join("") +
        T(84, 42, "Criteria", { s: 15, c: NAVY }) + K("cq", [72, 112, 152, 192].map((y) => O(160, y, 10, C.amber) + T(160, y + 5, "?", { s: 13.5, c: C.white })).join(""), null, true)) +
      K("risk", R(256, 82, 130, 100, "#ffffff", 8, `stroke="${CORAL}" stroke-width="2"`) + T(321, 104, "Case evidence", { s: 14, c: CORAL }) +
        [0, 1, 2].map((j) => R(270, 118 + j * 18, 100 - j * 18, 8, "#f6c9bb", 3)).join("")) +
      DP("thread", "M172 132 C210 132 214 132 256 132", CORAL, 3) +
      K("thrL", T(212, 116, "Explain the risk", { s: 14, c: INK })) +
      K("forum", R(14, 34, 214, 92, "#ffffff", 12, `stroke="${TEAL}" stroke-width="3"`) + T(30, 58, "Your post", { s: 15, c: TEAL, a: "start" }) +
        [0, 1, 2].map((j) => R(30, 70 + j * 16, 176 - j * 30, 8, "#cfe9e5", 4)).join("") +
        [0, 1, 2].map((j) => R(246, 40 + j * 70, 140, 52, "#ffffff", 10, `stroke="#c9d3df" stroke-width="2"`) + O(266, 58 + j * 70, 9, "#c9d3df") + R(282, 54 + j * 70, 90, 8, "#e3e8ef", 4) + R(258, 72 + j * 70, 110, 8, "#e3e8ef", 4)).join("")) +
      K("blur", [0, 1, 2].map((j) => R(246, 40 + j * 70, 140, 52, "rgba(238,247,248,.85)", 10)).join("") + T(316, 118, "Read after", { s: 14, c: "#7aa8a0" })) +
      K("books", book(20, 138, "Jeston Ch 7") + book(124, 138, "Jeston Ch 8")) +
      K("replies", P("M228 90 C236 90 238 70 246 66", TEAL, 2.5) + P("M228 104 C240 110 236 130 246 136", TEAL, 2.5) +
        chip(110, 196, 110, "Reply ×2", TEAL) + chip(110, 232, 132, "Disagree ×1", C.amber)) +
      K("dis", R(246, 110, 140, 52, "none", 10, `stroke="${C.amber}" stroke-width="3"`) + T(316, 256, "Tests reasoning", { s: 14, c: "#a8771b" })) +
      K("a4", R(14, 256, 150, 32, NAVY, 16) + T(89, 277, "Assessment 4", { s: 15, c: C.white })) +
      // ---------- G: the people the processes serve ----------
      K("pair", O(130, 150, 22, "#ffd6a5") + R(150, 146, 14, 18, CORAL, 3) + TR(280, 166, bed(), 1.6) +
        K("sadF", TR(130, 150, face(22, "sad")) + TR(264, 147, face(9, "sad")), null, true) + K("hapF", TR(130, 150, face(22, "happy")) + TR(264, 147, face(9, "happy"))) +
        T(130, 206, "Traveller", { s: 15, c: INK }) + T(280, 206, "Patient", { s: 15, c: INK }) +
        K("clk", O(130, 104, 12, "#ffffff", `stroke="${CORAL}" stroke-width="2.5"`) + O(280, 104, 12, "#ffffff", `stroke="${CORAL}" stroke-width="2.5"`) +
          Gc("vx-spin", P("M130 104 V96", CORAL, 2), `style="transform-origin:130px 104px;transform-box:view-box"`) + Gc("vx-spin", P("M280 104 V96", CORAL, 2), `style="transform-origin:280px 104px;transform-box:view-box"`), null, true)) +
      K("out", T(200, 60, "Real people, real outcomes", { s: 16, c: TEAL })) +
      K("mgmt", R(240, 60, 130, 84, "#ffffff", 8, `stroke="${NAVY}" stroke-width="2"`) + P("M254 126 L280 106 L306 116 L356 78", TEAL, 3) + T(305, 160, "Visible, measurable", { s: 14, c: NAVY }) +
        person(110, 140, NAVY, 1.4) + O(150, 96, 5, "#cfe9e5") + O(162, 84, 7, "#cfe9e5") + R(160, 46, 70, 28, "#cfe9e5", 14) + T(195, 65, "Decide", { s: 14, c: NAVY }) + T(110, 200, "Management", { s: 15, c: NAVY })) +
      K("next", P("M30 110 H380", "#c9d3df", 2) + DP("dip", "M30 110 C90 110 110 180 170 180 C230 180 250 70 380 70", C.plum, 4) + T(170, 206, "Performance dip", { s: 14, c: C.plum }) +
        R(250, 120, 130, 30, C.plum, 15) + T(315, 140, "Next: change", { s: 15, c: C.white })) +
      K("thanks", R(110, 70, 180, 84, "#ffffff", 16, `stroke="${TEAL}" stroke-width="3"`) + F("M150 154 L140 176 L170 154 Z", "#ffffff") +
        F("M200 128 C176 108 182 88 200 100 C218 88 224 108 200 128 Z", CORAL) + T(200 , 200, "See you there", { s: 16, c: TEAL })) +
      K("done", [["Look beyond software", 74, -3], ["Understand the process", 136, 2], ["Protect the people", 198, -2]].map(([t, y, r]) =>
        `<g transform="rotate(${r} 200 ${y})">${R(80, y - 22, 240, 40, "#ffffff", 8, `stroke="${TEAL}" stroke-width="3"`)}${T(200, y + 5, t, { s: 16, c: TEAL })}</g>`).join("") +
        O(330, 252, 22, GREEN) + tick(330, 253, C.white, 4) + T(200, 262, "Week 3 complete", { s: 17, c: GREEN }));

    const S = (...a) => Object.assign({}, ...a);
    const frames = [
      // 0 from Qasr to Noor's five hospitals
      { L: "Noor Health Group", on: "city", s: { ideas: { x: 60, y: 120 }, bedB: { x: 120, y: 222 }, bedC: { x: 30, y: 196 }, lens: { x: 160, y: 80 }, cnt: { n: 0, ns: " models" } }, pop: "hs0 hs1 hs2 hs3 hs4" },
      // 1 a new organisation on purpose
      { L: "Transfer the ideas", on: "ideas", s: { ideas: { x: 190 } } },
      // 2 AED 6.2 million, expecting faster discharge
      { L: "AED 6.2M invested", off: "ideas", on: "gift dq", s: { "hs0 hs1 hs2 hs3 hs4 qasr": { o: 0.2 } }, pop: "gift" },
      // 3 91 diagrams from the 2019 manual
      { L: "91 models from paper", off: "city gift dq", on: "manual cards m0 m1 m2 m3 m4 m5 m6 m7 m8 m9 m10 m11", s: { cnt: { n: 91, ns: " models" } }, pop: "manual" },
      // 4 clinicians never involved
      { L: "Clinicians not involved", on: "wall cl0 cl1 cl2 cl3 notA", pop: "cl0 cl1 cl2 cl3" },
      // 5 the manual describes intended procedure
      { L: "Intended, not real", off: "notA wall", on: "paper", s: { cards: { o: 0.35 } } },
      // 6 judgement and handoffs
      { L: "Judgement and handoffs", on: "hlab bedB", s: { hand: { d: 1 }, bedB: { x: 350 } } },
      // 7 a reason to question, not proof
      { L: "A reason to question", off: "hlab bedB paper", on: "lens qm", s: { hand: { d: 0 }, cards: { o: 1 }, lens: { x: 290, y: 140 } }, pop: "qm" },
      // 8 capabilities that never joined daily work
      { L: "Bought, not used", off: "manual cards lens qm cl0 cl1 cl2 cl3", on: "suite corr", pop: "suite" },
      // 9 rules unused, dashboard unconnected
      { L: "Unused, unconnected", on: "unplug", pop: "unplug" },
      // 10 what the two modules would do
      { L: "Rules and dashboards", on: "does", s: { gN: { r: 70 } } },
      // 11 outside the real process: no value
      { L: "Outside the real work", on: "bedC noval", s: { bedC: { x: 370 } }, pop: "noval" },
      // 12 the figures make the gap visible
      { L: "The discharge clock", off: "suite unplug does corr bedC noval", on: "clock" },
      // 13 4.1 h, promised 2.87 h
      { L: "Promise: 2.87 h", on: "lg0 lg1", s: { a41: { d: 1 }, a287: { d: 1, dl: 0.6 } } },
      // 14 actual 3.9 h, about 4.9%
      { L: "Actual: 3.9 h", on: "lg2 lg3 gap", s: { a39: { d: 1 } }, pop: "lg3" },
      // 15 resist one explanation
      { L: "Not one cause", on: "qs many", pop: "qs" },
      // 16 established versus to investigate
      { L: "Separate the evidence", off: "clock lg0 lg1 lg2 lg3 many", on: "trays", pop: "trays" },
      // 17 we cannot measure the exclusion's effect
      { L: "Known, not measured", on: "e1 e2", pop: "e1 e2" },
      // 18 before another expensive intervention
      { L: "Before buying more", on: "stop", pop: "stop" },
      // 19 your advice to Noor
      { L: "Your advice to Noor", off: "trays e1 e2 stop", on: "crit risk", pop: "crit" },
      // 20 any criterion, if linked to the risk
      { L: "Link it to evidence", off: "cq", on: "thrL", s: { thread: { d: 1 } }, pop: "risk" },
      // 21 the forum challenge
      { L: "This week's forum", off: "crit risk thrL", on: "forum", s: { thread: { d: 0 } }, pop: "forum" },
      // 22 post before reading others
      { L: "Post first", on: "blur", pop: "blur" },
      // 23 Jeston chapters 7 and 8
      { L: "Cite Jeston's chapters", off: "blur", on: "books", pop: "books" },
      // 24 reply to two, disagree with one
      { L: "Reply two, disagree one", on: "replies", pop: "replies" },
      // 25 honest disagreement
      { L: "Honest disagreement", on: "dis", pop: "dis" },
      // 26 Assessment 4: participation
      { L: "Assessment 4", on: "a4", pop: "a4" },
      // 27 the traveller and the patients
      { L: "Remember who waits", off: "forum books replies dis a4", on: "pair" },
      // 28 outcomes for real people
      { L: "Outcomes for people", off: "sadF clk", on: "hapF out", pop: "pair" },
      // 29 visible and measurable, still managed
      { L: "Tech shows, people manage", off: "pair out", on: "mgmt", pop: "mgmt" },
      // 30 next week: organisational change
      { L: "Next week: change", off: "mgmt", on: "next", s: { dip: { d: 1 } } },
      // 31 thank you
      { L: "Thank you", off: "next", on: "thanks", pop: "thanks" },
      // 32 week 3 complete
      { L: "Week 3 complete", off: "thanks", on: "done", pop: "done" }
    ];
    register("W3O2d", {
      title: "Noor Health Group",
      aria: "Noor Health's discharge story: models drawn from a manual, unused modules, a five-hour clock of promise versus result, and the forum task",
      theme: { chipBg: TEAL, chipFg: C.white, track: "rgba(31,138,122,.15)", bar: CORAL },
      art, frames
    });
    css.push(".vls-w03-W3O2d{background:" + BGc + ";color:" + INK + ";}");
  }

  installCss(["W3O2d"], "w03-claude-part3", css);
})();
