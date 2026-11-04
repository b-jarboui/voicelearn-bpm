// FILE: w06-claude-part1.js
// OPER621 · Week 6 · Process Architecture — animated teaching scenes, part 1 of 3
// Sections: W6O1a, W6O1b, W6O1c, W6O2a
// Contract: window.VL_SCENES["<secId>"] = { build(el), step(i, n), reset() }; i = narration moment index.
// Standalone: defines every helper it uses; appends its own scoped rules to <style id="vl-sc-w06">.
// Each section is a reel of distinct visuals; every visual names the benchmark template it adapts.
// Uses window.gsap when present (CSS transitions otherwise); honours prefers-reduced-motion.
(() => {
  "use strict";
  if (typeof window === "undefined") return;
  window.VL_SCENES = window.VL_SCENES || {};
  const REG = window.VL_SCENES;
  const PART = 1;
  const IDS = ["W6O1a", "W6O1b", "W6O1c", "W6O2a"];
  // ------------------------------------------------------------------
  // SHARED RUNTIME (self-contained in every part; nothing leaks out)
  // A section is a "shot reel": several distinct visual compositions,
  // each owning a slice of the narration moments. Inside a shot, items
  // tagged data-lv="n" are revealed level by level, and an optional
  // tick(api,k,K,lv) adds deterministic motion on EVERY moment.
  // All states are recomputed from (i,n) only, so seeking is safe.
  // ------------------------------------------------------------------
  const NS = "http://www.w3.org/2000/svg";
  const VB = { w: 400, h: 300 };
  const COL = {
    navy: "#1f4e79", ink: "#1b2a3a", orange: "#c0502a", green: "#2f7a5f",
    gold: "#c9962e", sky: "#3f7fb5", teal: "#23807e", plum: "#6a4c93",
    red: "#b8322f", paper: "#fbf8f1", mist: "#e3ecf4", fog: "#f1f5f9",
    line: "#9fb4c7", grey: "#7d8a97", white: "#ffffff", sand: "#f3e6cc"
  };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const num = (v, d) => { if (v === null || v === undefined || v === "") return d; const x = Number(v); return Number.isFinite(x) ? x : d; };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const attrs = o => Object.keys(o || {}).filter(k => o[k] !== null && o[k] !== undefined && o[k] !== false)
    .map(k => ` ${k}="${esc(o[k])}"`).join("");
  const E = (tag, o, inner) => `<${tag}${attrs(o)}>${inner == null ? "" : inner}</${tag}>`;
  const rect = (x, y, w, h, fill, rx, o) => E("rect", Object.assign({ x, y, width: w, height: h, rx: rx || 0, fill }, o));
  const circ = (x, y, r, fill, o) => E("circle", Object.assign({ cx: x, cy: y, r, fill }, o));
  const pth = (d, stroke, w, o) => E("path", Object.assign({ d, fill: "none", stroke, "stroke-width": w || 2, "stroke-linecap": "round", "stroke-linejoin": "round" }, o));
  const shape = (d, fill, o) => E("path", Object.assign({ d, fill }, o));
  const grp = (o, inner) => E("g", o, inner);
  const at = (x, y, inner, s) => E("g", { transform: `translate(${x} ${y})${s ? ` scale(${s})` : ""}` }, inner);
  // Text: bold, halo for legibility; '|' splits into two centred lines.
  const tx = (x, y, s, size, fill, o) => {
    const z = size || 16, parts = String(s).split("|");
    const base = Object.assign({ x, y, "font-size": z, "text-anchor": "middle", "font-weight": 800,
      "paint-order": "stroke", stroke: COL.white, "stroke-width": 3.2, "stroke-linejoin": "round" }, o, { fill: fill || COL.ink });
    if (parts.length === 1) return E("text", base, esc(s));
    const lh = z * 1.12, y0 = y - (lh * (parts.length - 1)) / 2;
    base.y = y0;
    return E("text", base, parts.map((p, i) => E("tspan", { x, dy: i ? lh : 0 }, esc(p))).join(""));
  };
  const txOn = (x, y, s, size, fill, o) => {
    if (fill && typeof fill === "object") { o = fill; fill = null; }
    return tx(x, y, s, size, (o && o.fill) || fill || COL.white, Object.assign({ stroke: "none" }, o, { fill: undefined }));
  };
  // Reveal wrappers. how: up|down|left|right|pop|fade|grow|rise|spin|draw
  const LV = (n, how, o) => Object.assign({ "data-lv": n, "data-in": how || "up" }, o);
  const rv = (n, how, inner, o) => grp(LV(n, how, o), inner);
  const OUT = (n, o) => Object.assign({ "data-out": n }, o);
  const draw = (n, d, stroke, w, o) => pth(d, stroke, w, Object.assign({ pathLength: 1, "stroke-dasharray": "1 1", "stroke-dashoffset": 1 }, LV(n, "draw"), o));
  const tw = (s, z) => String(s).split("|").reduce((m, p) => Math.max(m, p.length), 0) * (z || 16) * 0.6;
  // Labelled card.
  const card = (x, y, w, h, label, o) => {
    o = o || {};
    const c = o.col || COL.navy, solid = !!o.solid, z = o.size || 15;
    const body = rect(x, y, w, h, solid ? c : (o.fill || COL.white), o.rx == null ? 10 : o.rx,
      { stroke: c, "stroke-width": o.sw || 2.5, "stroke-dasharray": o.dash || null }) +
      (o.band ? rect(x, y, 8, h, c, 4) : "") +
      (solid ? txOn(x + w / 2, y + h / 2 + z * 0.36, label, z) : tx(x + w / 2, y + h / 2 + z * 0.36, label, z, o.tcol || COL.ink));
    return o.lv == null ? grp({ class: o.cls || null }, body) : rv(o.lv, o.in || "up", body, { class: o.cls || null });
  };
  const pill = (cx, cy, label, col, o) => {
    o = o || {};
    const z = o.size || 15, w = Math.max(48, tw(label, z) + 26), h = z + 14;
    const body = rect(cx - w / 2, cy - h / 2, w, h, o.hollow ? COL.white : col, h / 2, { stroke: col, "stroke-width": 2.5 }) +
      (o.hollow ? tx(cx, cy + z * 0.36, label, z, col) : txOn(cx, cy + z * 0.36, label, z));
    return o.lv == null ? grp({ class: o.cls || null }, body) : rv(o.lv, o.in || "pop", body, { class: o.cls || null });
  };
  const head = (x, y, ang, col, n, o) => rv(n, "pop", at(x, y, shape("M0 0 L-12 -7 L-9 0 L-12 7Z", col, { transform: `rotate(${ang})` })), o);
  // Icons, all drawn around (0,0).
  const I = {
    person: (c, s) => at(0, 0, circ(0, -17, 8, c) + shape("M-14 13 Q-14 -6 0 -6 Q14 -6 14 13Z", c), s),
    guest: (c, s) => at(0, 0, circ(0, -17, 8, c) + shape("M-14 13 Q-14 -6 0 -6 Q14 -6 14 13Z", c) +
      rect(14, -2, 11, 15, COL.orange, 2) + pth("M17 -2 V-6 H22 V-2", COL.orange, 2), s),
    doc: (c, s) => at(0, 0, shape("M-15 -20 H7 L15 -12 V20 H-15Z", COL.white, { stroke: c, "stroke-width": 2.5, "stroke-linejoin": "round" }) +
      pth("M-9 -8 H9 M-9 0 H9 M-9 8 H4", c, 2.4), s),
    bldg: (w, h, c, s) => at(0, 0, rect(-w / 2, -h, w, h, COL.white, 4, { stroke: c, "stroke-width": 2.5 }) + rect(-w / 2, -h, w, 9, c, 3) +
      Array.from({ length: Math.max(1, Math.floor((h - 26) / 18)) * 2 }, (_, i) => rect(-w / 2 + 9 + (i % 2) * (w / 2 - 4), -h + 17 + Math.floor(i / 2) * 18, w / 2 - 14, 10, COL.mist, 2)).join("") +
      rect(-7, -16, 14, 16, c, 2), s),
    gear: (r, c) => grp({}, Array.from({ length: 8 }, (_, i) => rect(-4, -r - 6, 8, 12, c, 2, { transform: `rotate(${i * 45})` })).join("") +
      circ(0, 0, r, c) + circ(0, 0, r * 0.45, COL.white)),
    check: (c, s) => at(0, 0, circ(0, 0, 15, c) + pth("M-7 0 L-2 6 L8 -6", COL.white, 3.4), s),
    cross: (c, s) => at(0, 0, circ(0, 0, 15, c) + pth("M-6 -6 L6 6 M6 -6 L-6 6", COL.white, 3.4), s),
    q: (c, s) => at(0, 0, circ(0, 0, 15, c) + txOn(0, 7, "?", 21), s),
    warn: (c, s) => at(0, 0, shape("M0 -17 L17 13 H-17Z", c, { "stroke-linejoin": "round" }) + txOn(0, 9, "!", 17), s),
    crown: (c, s) => at(0, 0, shape("M-14 8 L-16 -9 L-7 -1 L0 -13 L7 -1 L16 -9 L14 8Z", c) + rect(-14, 9, 28, 5, c, 2), s),
    clock: (c, s) => at(0, 0, circ(0, 0, 14, COL.white, { stroke: c, "stroke-width": 3 }) + pth("M0 -8 V0 L6 4", c, 3), s),
    coin: (c, s) => at(0, 0, circ(0, 0, 10, c, { stroke: COL.white, "stroke-width": 2 }) + txOn(0, 5, "$", 13), s),
    lock: (c, s) => at(0, 0, pth("M-8 -4 V-11 A8 8 0 0 1 8 -11 V-4", c, 3.4) + rect(-12, -5, 24, 19, c, 4), s),
    key: (c, s) => at(0, 0, circ(-8, 0, 7, "none", { stroke: c, "stroke-width": 3.4 }) + pth("M-1 0 H15 M10 0 V6 M14 0 V5", c, 3.4), s),
    bed: (c, s) => at(0, 0, rect(-20, -2, 40, 10, c, 3) + rect(-20, -12, 12, 10, c, 3) + pth("M-20 8 V14 M20 8 V14", c, 3.4), s),
    star: (c, s) => at(0, 0, shape("M0 -14 L4 -4 L14 -4 L6 3 L9 13 L0 7 L-9 13 L-6 3 L-14 -4 L-4 -4Z", c), s),
    seal: (c, s) => at(0, 0, circ(0, 0, 20, c) + circ(0, 0, 15, "none", { stroke: COL.white, "stroke-width": 1.8, "stroke-dasharray": "3 3" }) + pth("M-7 0 L-2 6 L8 -6", COL.white, 3.4), s),
    lens: (c, s) => at(0, 0, circ(0, 0, 16, "rgba(255,255,255,.35)", { stroke: c, "stroke-width": 4 }) + pth("M11 11 L24 24", c, 6), s),
    folder: (c, s) => at(0, 0, shape("M-26 -16 H-8 L-3 -10 H26 V18 H-26Z", c) + rect(-24, -6, 48, 22, COL.white, 2, { opacity: 0.25 }), s),
    target: (c, s) => at(0, 0, circ(0, 0, 16, COL.white, { stroke: c, "stroke-width": 3 }) + circ(0, 0, 9, "none", { stroke: c, "stroke-width": 3 }) + circ(0, 0, 3.5, c), s),
    rocket: (c, s) => at(0, 0, shape("M0 -26 Q11 -14 9 10 H-9 Q-11 -14 0 -26Z", COL.white, { stroke: c, "stroke-width": 2.6 }) +
      circ(0, -8, 4, c) + shape("M-9 2 L-17 14 L-9 11Z M9 2 L17 14 L9 11Z", COL.orange), s)
  };

  // ---------- motion core ----------
  const reduced = () => { try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; } };
  const G = () => (window.gsap && typeof window.gsap.to === "function" && typeof window.gsap.set === "function") ? window.gsap : null;
  // p: {x,y,s,sx,sy,r,o,d,og,view,t,dl}
  function anim(el, p, now) {
    if (!el) return;
    const g = G(), x = num(p.x, 0), y = num(p.y, 0), r = num(p.r, 0);
    const sx = num(p.sx, num(p.s, 1)), sy = num(p.sy, num(p.s, 1));
    if (g) {
      const v = { x, y, rotation: r, scaleX: sx, scaleY: sy };
      if (p.o != null) v.opacity = p.o;
      if (p.d != null) v.strokeDashoffset = p.d;
      if (p.view) v.svgOrigin = `${VB.w / 2} ${VB.h / 2}`; else v.transformOrigin = p.og || "50% 50%";
      try {
        if (now || reduced()) { g.killTweensOf(el); g.set(el, v); }
        else { v.duration = num(p.t, 0.8); v.delay = num(p.dl, 0); v.ease = p.ease || "power3.out"; v.overwrite = "auto"; g.to(el, v); }
        return;
      } catch (e) { /* fall through to CSS */ }
    }
    el.style.transitionDelay = now ? "0s" : `${num(p.dl, 0)}s`;
    if (p.og) el.style.transformOrigin = p.og;
    el.style.transform = `translate(${x}px,${y}px) rotate(${r}deg) scale(${sx},${sy})`;
    if (p.o != null) el.style.opacity = String(p.o);
    if (p.d != null) el.style.strokeDashoffset = String(p.d);
  }
  const HIDE = {
    up: { y: 22, o: 0 }, down: { y: -22, o: 0 }, left: { x: -34, o: 0 }, right: { x: 34, o: 0 },
    pop: { s: 0.35, o: 0 }, fade: { o: 0 }, grow: { sx: 0.02, o: 0, og: "0% 50%" }, rise: { sy: 0.02, o: 0, og: "50% 100%" },
    spin: { r: -120, s: 0.4, o: 0 }, draw: { d: 1, o: 0 }
  };
  function revealState(el, show) {
    const how = el.getAttribute("data-in") || "up";
    const h = HIDE[how] || HIDE.up;
    if (show) return how === "draw" ? { d: 0, o: 1 } : { o: 1, og: h.og };
    return Object.assign({}, h);
  }
  const TR = {
    slide: [{ x: -70, o: 0 }, { x: 70, o: 0 }], zoom: [{ s: 1.35, o: 0 }, { s: 0.72, o: 0 }],
    rise: [{ y: -50, o: 0 }, { y: 50, o: 0 }], iris: [{ s: 0.6, r: -6, o: 0 }, { s: 1.25, r: 6, o: 0 }]
  };
  const TRN = ["slide", "zoom", "rise", "iris"];

  function makeAPI(g, now, fresh) {
    const q = s => g.querySelector(s), qa = s => Array.prototype.slice.call(g.querySelectorAll(s));
    return {
      q, qa, fresh, now,
      anim: (t, p) => (typeof t === "string" ? qa(t) : [t]).forEach(e => anim(e, p, now)),
      // like anim, but jumps (no glide) when the shot has just entered
      place: (t, p) => (typeof t === "string" ? qa(t) : [t]).forEach(e => anim(e, p, now || fresh)),
      // move token (drawn at 0,0) to fraction f along path (path coords = token parent coords)
      along: (tok, path, f) => {
        const P = typeof path === "string" ? q(path) : path, T = typeof tok === "string" ? q(tok) : tok;
        if (!P || !T || typeof P.getTotalLength !== "function") return;
        let L = 0; try { L = P.getTotalLength(); } catch (e) { L = 0; }
        if (!L) return;
        const pt = P.getPointAtLength(clamp(f, 0, 1) * L);
        anim(T, { x: pt.x, y: pt.y, o: 1 }, now || fresh);
      },
      // fromTo: jump to p0 on entry (fresh shot), then glide to p1
      from: (t, p0, p1) => (typeof t === "string" ? qa(t) : [t]).forEach(e => {
        if (!e) return;
        if (fresh && !now) { anim(e, p0, true); void e.getBoundingClientRect(); }
        anim(e, p1, now);
      }),
      text: (t, v) => { const e = typeof t === "string" ? q(t) : t; if (e) e.textContent = String(v); },
      attr: (t, k, v) => (typeof t === "string" ? qa(t) : [t]).forEach(e => e && e.setAttribute(k, String(v))),
      cls: (t, c, on) => (typeof t === "string" ? qa(t) : [t]).forEach(e => e && e.classList.toggle(c, !!on))
    };
  }

  function buildScene(id, N0, shots) {
    let root = null, svg = null, groups = [], active = -1, lastN = N0;
    const cls = `vls-w06-${id}`;
    function mount(el) {
      installCSS();
      if (!el || typeof el.appendChild !== "function") return false;
      while (el.firstChild) el.removeChild(el.firstChild);
      root = document.createElement("div");
      root.className = cls;
      const dots = shots.map((_, j) => `<i class="w6-dot" data-d="${j}"></i>`).join("");
      const body = shots.map((s, j) => `<g class="w6-shot" data-shot="${j}">${s.svg}</g>`).join("");
      root.innerHTML = `<div class="w6-top"><span class="w6-chip" aria-live="polite"></span><span class="w6-dots" aria-hidden="true">${dots}</span></div>` +
        `<svg xmlns="${NS}" class="w6-svg" viewBox="0 0 ${VB.w} ${VB.h}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(shots[0].tag)}">${body}</svg>`;
      el.appendChild(root);
      svg = root.querySelector("svg");
      groups = Array.prototype.slice.call(root.querySelectorAll(".w6-shot"));
      active = -1;
      return true;
    }
    function starts(n) {
      const st = shots.map(s => Math.round(s.at * n / N0));
      for (let j = 1; j < st.length; j++) if (st[j] <= st[j - 1]) st[j] = st[j - 1] + 1;
      return st;
    }
    function setLevels(g, lvl, now) {
      const items = Array.prototype.slice.call(g.querySelectorAll("[data-lv]"));
      const rank = {};
      items.forEach(e => {
        const L = num(e.getAttribute("data-lv"), 0), O = num(e.getAttribute("data-out"), 1e9);
        const show = L <= lvl && lvl < O;
        const idx = rank[L] = (rank[L] || 0) + 1;
        const p = revealState(e, show);
        if (show) p.dl = Math.min(0.55, (idx - 1) * 0.07);
        anim(e, p, now);
        e.classList.toggle("w6-hot", show && L === lvl && lvl > 0 && !now);
      });
    }
    function render(i, n, inst) {
      if (!root) return;
      const N = Math.max(1, Math.floor(num(n, N0)));
      lastN = N;
      i = clamp(Math.floor(num(i, 0)), 0, N - 1);
      const st = starts(N);
      let a = 0;
      for (let j = 0; j < st.length; j++) if (st[j] <= i) a = j;
      const end = a + 1 < st.length ? Math.min(st[a + 1], N) : N;
      const K = Math.max(1, end - st[a]), k = clamp(i - st[a], 0, K - 1);
      const fresh = a !== active;
      groups.forEach((g, j) => {
        const s = shots[j], kind = s.tr || TRN[j % TRN.length];
        if (j === a) {
          if (fresh && !inst) {
            // enter: start from the "future" pose, hide its items, then play in
            g.classList.add("w6-inst");
            anim(g, Object.assign({ view: true }, TR[kind][j > active ? 1 : 0]), true);
            setLevels(g, -1, true);
            void g.getBoundingClientRect();
            g.classList.remove("w6-inst");
          }
          anim(g, { view: true, o: 1, t: 0.9 }, inst);
          g.removeAttribute("aria-hidden");
          const L = num(s.L, 0);
          const lvl = K <= 1 ? L : Math.round(k * L / (K - 1));
          setLevels(g, lvl, inst);
          if (typeof s.tick === "function") {
            try { s.tick(makeAPI(g, inst || reduced(), fresh), k, K, lvl); } catch (e) { /* never break playback */ }
          }
        } else {
          anim(g, Object.assign({ view: true }, TR[kind][j < a ? 0 : 1]), inst || !fresh);
          g.setAttribute("aria-hidden", "true");
        }
        g.classList.toggle("w6-on", j === a);
      });
      active = a;
      const chip = root.querySelector(".w6-chip");
      if (chip && chip.textContent !== shots[a].tag) chip.textContent = shots[a].tag;
      if (svg) svg.setAttribute("aria-label", shots[a].tag);
      Array.prototype.slice.call(root.querySelectorAll(".w6-dot")).forEach((d, j) => {
        d.classList.toggle("on", j === a); d.classList.toggle("done", j < a);
      });
    }
    function instant(fn) {
      root.classList.add("w6-inst");
      fn();
      void root.getBoundingClientRect();
      if (!reduced()) root.classList.remove("w6-inst");
    }
    return {
      build(el) {
        if (!mount(el)) return;
        instant(() => render(0, N0, true));
      },
      step(i, n) { if (root) render(i, n, false); },
      reset() {
        if (!root) return;
        const g = G();
        if (g) { try { g.killTweensOf(root.querySelectorAll("*")); } catch (e) { /* ignore */ } }
        active = -1;
        instant(() => render(0, lastN, true));
      }
    };
  }

  // ---------- one stylesheet <style id="vl-sc-w06">, each part appends its own scoped block ----------
  const SC = `:is(${IDS.map(s => `.vls-w06-${s}`).join(",")})`;
  const CSS = `
${SC}{position:relative;display:flex;flex-direction:column;width:100%;height:100%;min-height:210px;box-sizing:border-box;overflow:hidden;container-type:inline-size;isolation:isolate;color:#1b2a3a;font-family:inherit;background:radial-gradient(120% 95% at 28% 18%,#ffffff 0%,#f4f7fb 55%,#e6eef6 100%)}
${SC} *{box-sizing:border-box}
${SC} .w6-top{flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 12px 0}
${SC} .w6-chip{display:inline-block;max-width:72%;padding:5px 13px;border-radius:999px;background:#1f4e79;color:#fff;font-weight:800;font-size:clamp(13px,3.3cqw,18px);line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-shadow:0 2px 6px rgba(31,78,121,.25)}
${SC} .w6-dots{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:5px;max-width:40%}
${SC} .w6-dot{display:block;width:9px;height:9px;border-radius:50%;background:#c9d6e2;transition:background .4s ease,transform .4s ease}
${SC} .w6-dot.done{background:#86a8c7}
${SC} .w6-dot.on{background:#c0502a;transform:scale(1.35)}
${SC} .w6-svg{flex:1 1 auto;display:block;width:100%;height:100%;min-height:0;overflow:hidden}
${SC} .w6-svg text{font-family:inherit;user-select:none;pointer-events:none}
${SC} .w6-svg *{transition:transform .8s cubic-bezier(.2,.8,.2,1),opacity .6s ease,stroke-dashoffset 1s ease,fill .5s ease,stroke .5s ease}
${SC} [data-lv],${SC} .w6-m{transform-box:fill-box;transform-origin:50% 50%}
${SC} .w6-shot{transform-box:view-box;transform-origin:200px 150px;opacity:0;pointer-events:none}
${SC} .w6-shot.w6-on{pointer-events:auto}
${SC} .w6-hot{animation:w6glow 1.7s ease-in-out 2}
${SC} .w6-spin{animation:w6spin 14s linear infinite;transform-box:fill-box;transform-origin:50% 50%}
${SC} .w6-ants{stroke-dasharray:7 9;animation:w6ants 1.1s linear infinite}
${SC} .w6-blink{animation:w6blink 1.5s ease-in-out infinite}
${SC}.w6-inst *,${SC} .w6-inst,${SC} .w6-inst *{transition:none!important}
@keyframes w6glow{50%{filter:drop-shadow(0 0 7px rgba(192,80,42,.85))}}
@keyframes w6spin{to{transform:rotate(360deg)}}
@keyframes w6ants{to{stroke-dashoffset:-32}}
@keyframes w6blink{50%{opacity:.35}}
@media (max-width:420px){${SC} .w6-top{padding:6px 8px 0}${SC} .w6-dot{width:7px;height:7px}}
@media (prefers-reduced-motion:reduce){${SC} *,${SC} *::before,${SC} *::after{transition:none!important;animation:none!important}}
`;
  function installCSS() {
    if (typeof document === "undefined") return;
    let st = document.getElementById("vl-sc-w06");
    if (!st) {
      st = document.createElement("style");
      st.id = "vl-sc-w06";
      (document.head || document.documentElement).appendChild(st);
    }
    const mark = `/* w06-claude-part${PART} */`;
    if (st.textContent.indexOf(mark) < 0) st.appendChild(document.createTextNode(mark + CSS));
  }

  // ==================================================================
  // W6O1a · Phase 2 — the map that tells you where you are (10 visuals)
  // ==================================================================
  REG.W6O1a = buildScene("W6O1a", 30, [
    // V1 · Adapts "Supply chain design animation" (Behance)
    // https://www.behance.net/gallery/7392601/Supply-chain-design-animation
    // Sites pop onto a planning grid; departments appear as separate islands.
    (() => {
      const pins = [[232, 58], [270, 46], [312, 56], [352, 48], [378, 86], [372, 128], [380, 172],
        [372, 214], [350, 256], [302, 266], [256, 256], [228, 214], [224, 172], [228, 128]];
      // simpler explicit composition (keeps transform off animated nodes)
      const marina = at(46, 238, rv(0, "rise", I.bldg(64, 120, COL.navy)));
      const s =
        rv(3, "fade", rect(205, 24, 188, 266, COL.white, 16, { stroke: COL.mist, "stroke-width": 2 })) +
        marina + tx(46, 262, "Qasr Marina", 15, COL.navy) +
        at(175, 245, grp({ class: "w6-m tv", "data-vl-role": "customer" }, I.guest(COL.orange))) +
        rv(1, "left", card(90, 92, 108, 32, "Revenue", { col: COL.sky, size: 14 })) +
        rv(1, "left", card(90, 136, 108, 32, "Reception", { col: COL.sky, size: 14 })) +
        rv(1, "left", card(90, 180, 108, 32, "Housekeeping", { col: COL.sky, size: 14 })) +
        rv(2, "pop", pill(144, 52, "Journey?", COL.red)) +
        draw(2, "M144 66 V92", COL.red, 2.5, { "stroke-dasharray": null }) +
        grp(LV(3, "fade"), Array.from({ length: 8 }, (_, j) => pth(`M${215 + j * 22} 34 V280`, COL.mist, 1.2)).join("")) +
        grp(LV(3, "pop"), pins.map(([x, y], j) => grp({ class: "w6-m pin" },
          circ(x, y, j === 13 ? 10 : 8, j === 13 ? COL.orange : COL.navy, { stroke: COL.white, "stroke-width": 2.5 }))).join("")) +
        rv(3, "pop", tx(300, 168, "14", 66, COL.navy) + tx(300, 218, "properties", 17, COL.navy));
      return {
        at: 0, tag: "One group, many hotels", L: 3, svg: s,
        tick(api, k) {
          const xs = [0, -22, -40, -52];
          api.from(".tv", { x: 30, o: 0 }, { x: xs[clamp(k, 0, 3)], y: 0, o: 1 });
          api.qa(".pin").forEach((p, j) => api.anim(p, { s: j === (k * 5 + 2) % 14 ? 1.6 : 1 }));
        }
      };
    })(),
    // V2 · Adapts "Outline - Explainer Kit" (Motion Array)
    // https://motionarray.com/after-effects-templates/outline-explainer-kit-36706/
    // Outlined activity cards are known; the links between them are question marks.
    (() => {
      const names = ["Check booking", "Set rate", "Clean room", "Issue key", "Bill guest", "Order linen", "Fix aircon", "Pay staff", "Plan rota"];
      const pos = j => [15 + (j % 3) * 125, 35 + Math.floor(j / 3) * 85];
      const pairs = [[0, 4, 137, 98], [2, 4, 262, 98], [4, 6, 137, 183], [4, 8, 262, 183]];
      const s =
        pairs.map(([a, b]) => {
          const [ax, ay] = pos(a), [bx, by] = pos(b);
          return draw(1, `M${ax + 60} ${ay + 21} L${bx + 60} ${by + 21}`, COL.red, 2.5, { "stroke-dasharray": "1 1" });
        }).join("") +
        names.map((nm, j) => {
          const [x, y] = pos(j);
          return rv(0, "pop", grp({ class: "w6-m jg" }, card(x, y, 120, 42, nm, { col: j === 4 ? COL.orange : COL.navy, size: 14, band: true })));
        }).join("") +
        pairs.map(([, , mx, my]) => at(mx, my, rv(1, "pop", grp({ class: "w6-blink" }, I.q(COL.red, 0.85))))).join("");
      return {
        at: 4, tag: "Known tasks, hidden links", L: 1, svg: s,
        tick(api, k) {
          api.qa(".jg").forEach((c, j) => api.anim(c, { x: Math.sin(j * 1.7 + k * 2.1) * 4, y: Math.cos(j * 1.3 + k * 1.9) * 4, r: Math.sin(j + k) * 2 }));
        }
      };
    })(),
    // V3 · Adapts "Awwwards SVG lines scroll animation — FEED Agency"
    // https://www.awwwards.com/inspiration/svg-lines-scroll-animation-feed-agency
    // Streets trace themselves between buildings once the map exists.
    (() => {
      const b = [["Hotel", 70, 112], ["Station", 330, 112], ["Hospital", 70, 262], ["Airport", 330, 262]];
      const streets = ["M104 98 C150 98 160 168 200 168 C240 168 250 98 296 98",
        "M104 248 C150 248 160 168 200 168 C240 168 250 248 296 248",
        "M70 132 V180", "M330 132 V180"];
      const s =
        b.map(([nm, x, y], j) => at(x, y, rv(0, "rise", I.bldg(62, 78, j % 2 ? COL.teal : COL.navy))) +
          tx(x, j < 2 ? y + 20 : y + 22, nm, 15, COL.navy)).join("") +
        streets.map(d => draw(2, d, COL.green, 7)).join("") +
        draw(1, "M200 205 C170 215 240 230 215 190 C190 160 250 175 236 205", COL.grey, 2, { "stroke-dasharray": "1 1" }) +
        at(200, 205, grp({ class: "w6-m tv" }, I.person(COL.orange) + at(0, -40, rv(0, "pop", I.q(COL.red, 0.8), OUT(2))))) +
        rv(2, "pop", pill(200, 30, "Street map", COL.green));
      return {
        at: 6, tag: "Buildings without a map", L: 2, svg: s,
        tick(api, k) {
          const p = [[0, 0], [-22, 8], [62, -34]][clamp(k, 0, 2)];
          api.anim(".tv", { x: p[0], y: p[1], r: k === 1 ? -8 : 0 });
        }
      };
    })(),
    // V4 · Adapts "Interactive Computer Assembly Sequence" (CodePen)
    // https://codepen.io/karlhorning/pen/OJqNMVR
    // Components slide in and lock into the architecture frame.
    (() => {
      const parts = [["Which processes", COL.navy], ["How they relate", COL.teal], ["Who is accountable", COL.orange]];
      const s =
        rv(0, "pop", rect(92, 34, 216, 222, COL.white, 18, { stroke: COL.navy, "stroke-width": 3 }) +
          rect(92, 34, 216, 40, COL.navy, 18) + rect(92, 56, 216, 18, COL.navy, 0) + txOn(200, 61, "Process architecture", 16)) +
        parts.map(([nm, c], j) => rv(0, j % 2 ? "right" : "left",
          rect(106, 88 + j * 54, 188, 44, COL.fog, 10, { stroke: c, "stroke-width": 2.5 }) +
          at(128, 110 + j * 54, j === 0 ? pth("M-9 -8 H9 M-9 0 H9 M-9 8 H9", c, 3) : j === 1 ? pth("M-10 6 L-2 -6 L4 4 L10 -8", c, 3) + circ(-10, 6, 3, c) + circ(10, -8, 3, c) : I.person(c, 0.62)) +
          tx(214, 115 + j * 54, nm, nm.length > 16 ? 13.5 : 15, COL.ink))).join("") +
        at(42, 148, rv(1, "left", I.person(COL.sky))) +
        at(358, 148, rv(1, "right", I.person(COL.sky))) +
        draw(1, "M60 140 H92", COL.sky, 2.5) + draw(1, "M340 140 H308", COL.sky, 2.5) +
        rv(1, "up", pill(200, 278, "One shared view", COL.green));
      return { at: 9, tag: "What architecture shows", L: 1, svg: s };
    })(),
    // V5 · Adapts "Modern Process Infographic Steps Animation Template" (Envato)
    // https://elements.envato.com/steps-infographic-BUNKM3A
    // Numbered milestones; a moving active ring lands on Phase 2.
    (() => {
      const steps = ["Strategy", "Architecture", "Launch Pad", "Understand", "Innovate"];
      const s =
        draw(0, "M40 175 H360", COL.line, 6) +
        steps.map((nm, j) => {
          const x = 40 + j * 80, up = j % 2 === 0;
          return rv(0, "pop", circ(x, 175, 17, j === 1 ? COL.orange : COL.navy) + txOn(x, 181, String(j + 1), 17)) +
            tx(x, up ? 143 : 215, nm, 15, j === 1 ? COL.orange : COL.navy);
        }).join("") +
        at(40, 175, grp({ class: "w6-m ind" }, circ(0, 0, 25, "none", { stroke: COL.orange, "stroke-width": 4 }))) +
        rv(1, "down", at(64, 62, I.target(COL.navy, 1.3)) + tx(64, 104, "Goals", 15, COL.navy)) +
        draw(1, "M92 62 H178", COL.navy, 3) + head(186, 62, 0, COL.navy, 1) +
        ["Arrival", "Stay", "Billing"].map((nm, j) => rv(1, "right", card(192 + j * 68, 44, 62, 36, nm, { col: COL.teal, size: 14 }))).join("") +
        rv(1, "pop", pill(310, 110, "Phase 2", COL.orange));
      return {
        at: 11, tag: "Phase 2 of the framework", L: 1, svg: s,
        tick(api, k) { api.from(".ind", { x: 0 }, { x: 80, s: k ? 1.12 : 1, dl: 0.3 }); }
      };
    })(),
    // V6 · Adapts "Bar Chart Race, Explained" (Observable)
    // https://observablehq.com/@d3/bar-chart-race-explained
    // Bars re-rank when the metric switches from speed to guest value.
    (() => {
      const rows = [["Internal reporting", COL.orange], ["Guest arrival", COL.navy], ["Billing accuracy", COL.teal]];
      const s =
        rv(0, "down", tx(200, 40, "Speed gain", 20, COL.ink, { class: "met" })) +
        rows.map(([nm, c], j) => grp({ class: "w6-m row r" + j },
          tx(40, 92 + j * 62, nm, 15, COL.ink, { "text-anchor": "start" }) +
          rect(40, 100 + j * 62, 300, 28, COL.mist, 8) +
          grp({ class: "w6-m bar" }, rect(40, 100 + j * 62, 300, 28, c, 8)) +
          tx(372, 120 + j * 62, "", 16, c, { class: "val" }) +
          (j === 1 ? at(20, 114 + j * 62, grp({ class: "w6-m tgt" }, I.target(COL.orange, 0.8))) : ""))).join("");
      const V = [[30, 35, 25], [95, 35, 25], [12, 90, 40], [12, 90, 40]];
      return {
        at: 13, tag: "Improve what matters", L: 0, svg: s,
        tick(api, k) {
          const v = V[clamp(k, 0, 3)];
          api.text(".met", k >= 2 ? "Guest value" : "Speed gain");
          const order = [0, 1, 2].sort((a, b) => v[b] - v[a]);
          api.qa(".row").forEach((r, j) => {
            api.anim(r, { y: (order.indexOf(j) - j) * 62 });
            api.anim(r.querySelector(".bar"), { sx: v[j] / 100, og: "0% 50%" });
            api.text(r.querySelector(".val"), v[j] + "%");
          });
          api.anim(".tgt", { o: k >= 3 ? 1 : 0, s: k >= 3 ? 1 : 0.3 });
        }
      };
    })(),
    // V7 · Adapts "Sankey particles generation" (Observable)
    // https://observablehq.com/@joaormendes/sankey-animation-particles-generation
    // Two teams' particle streams collide on one process, then separate by boundary.
    (() => {
      const pA = "M96 80 C170 80 190 140 256 146", pB = "M96 220 C170 220 190 160 256 154";
      const qA = "M96 80 C170 80 200 72 256 72", qB = "M96 220 C170 220 200 228 256 228";
      const tok = (c, cl) => grp({ class: `w6-m ${cl}`, opacity: 0 }, circ(0, 0, 7, c, { stroke: COL.white, "stroke-width": 2 }));
      const s =
        pth(pA, COL.mist, 10, { class: "pa" }) + pth(pB, COL.mist, 10, { class: "pb" }) +
        draw(2, qA, COL.green, 6, { class: "qa" }) + draw(2, qB, COL.green, 6, { class: "qb" }) +
        pill(58, 80, "Team A", COL.sky) + pill(58, 220, "Team B", COL.plum) +
        rv(0, "right", card(258, 124, 132, 52, "Guest arrival", { col: COL.navy, size: 15 }), OUT(2)) +
        rv(1, "pop", at(240, 150, I.warn(COL.red, 1.2)), OUT(2)) +
        rv(1, "up", pill(320, 210, "Clashing fixes", COL.red), OUT(2)) +
        rv(2, "right", card(258, 50, 132, 44, "Verify booking", { col: COL.green, size: 14 })) +
        rv(2, "right", card(258, 206, 132, 44, "Room ready", { col: COL.green, size: 14 })) +
        rv(2, "fade", pth("M248 150 H396", COL.navy, 2.5, { "stroke-dasharray": "6 6" }) + pill(322, 150, "Clear boundary", COL.navy, { hollow: true, size: 14 })) +
        [0, 1, 2, 3].map(j => tok(COL.sky, "ta")).join("") + [0, 1, 2, 3].map(j => tok(COL.plum, "tb")).join("");
      return {
        at: 17, tag: "Teams on one process", L: 2, svg: s,
        tick(api, k, K, lv) {
          const sep = lv >= 2;
          api.qa(".ta").forEach((t, j) => api.along(t, sep ? ".qa" : ".pa", ((j / 4) + k * 0.13 + 0.05) % 1));
          api.qa(".tb").forEach((t, j) => api.along(t, sep ? ".qb" : ".pb", ((j / 4) + k * 0.13 + 0.15) % 1));
        }
      };
    })(),
    // V8 · Adapts "Process Infographic Widget" (Envato)
    // https://elements.envato.com/process-infographic-widget-C3TVD9H
    // A segmented dial: the needle overshoots to "every task", then settles on "useful".
    (() => {
      const cx = 200, cy = 222, R = 118;
      const arc = (a0, a1) => {
        const p = a => [cx + R * Math.cos(a * Math.PI / 180), cy - R * Math.sin(a * Math.PI / 180)];
        const [x0, y0] = p(a0), [x1, y1] = p(a1);
        return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${R} ${R} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
      };
      const s =
        draw(0, arc(178, 128), COL.grey, 34, { "stroke-linecap": "butt" }) +
        draw(0, arc(126, 54), COL.green, 34, { "stroke-linecap": "butt" }) +
        draw(0, arc(52, 2), COL.orange, 34, { "stroke-linecap": "butt" }) +
        tx(84, 252, "Too vague", 16, COL.grey) + tx(200, 72, "Useful", 18, COL.green) + tx(316, 252, "Every task", 16, COL.orange) +
        grp({ class: "w6-m needle" }, shape(`M${cx - 7} ${cy} L${cx} ${cy - 104} L${cx + 7} ${cy}Z`, COL.ink)) +
        circ(cx, cy, 13, COL.ink) +
        at(316, 196, grp({ class: "w6-m nx" }, I.cross(COL.red, 0.9))) +
        rv(1, "pop", at(200, 36, I.check(COL.green, 1.05))) +
        rv(1, "up", pill(200, 282, "Enough structure", COL.green));
      return {
        at: 20, tag: "Enough, not everything", L: 1, svg: s,
        tick(api, k) {
          api.from(".needle", { r: -75, og: "50% 100%" }, { r: k ? 0 : 68, og: "50% 100%", t: 1.1, ease: "back.out(1.6)" });
          api.anim(".nx", { o: k ? 0 : 1, s: k ? 0.3 : 1, dl: 0.6 });
        }
      };
    })(),
    // V9 · Adapts "Celonis Process Explorer map"
    // https://help.celonis.com/cpm47/en/process-explorer
    // Frequency-weighted edges and moving cases; a change ripples, an owner is named.
    (() => {
      const nodes = [["Reservations", 15, 40], ["Housekeeping", 265, 40], ["Billing", 15, 218], ["Revenue", 265, 218]];
      const edges = ["M135 60 C170 60 170 120 200 125", "M265 60 C230 60 230 120 200 125", "M135 238 C170 238 170 175 200 171", "M265 238 C230 238 230 175 200 171"];
      const s =
        edges.map((d, j) => pth(d, COL.line, [9, 5, 6, 4][j], { class: "e e" + j })) +
        nodes.map(([nm, x, y]) => card(x, y, 120, 40, nm, { col: COL.navy, size: 14 })).join("") +
        rv(1, "pop", circ(200, 148, 54, "none", { stroke: COL.gold, "stroke-width": 6, opacity: 0.6 })) +
        card(140, 125, 120, 46, "Guest arrival", { col: COL.orange, solid: true, size: 15 }) +
        rv(1, "up", pill(200, 196, "Investment priority", COL.gold, { size: 14 })) +
        rv(2, "spin", at(36, 104, grp({ class: "w6-spin" }, I.gear(9, COL.red)))) +
        rv(3, "down", at(200, 104, I.crown(COL.gold, 1.1))) +
        rv(3, "pop", pill(200, 20, "One accountable owner", COL.green, { size: 14 })) +
        [0, 1, 2, 3].map(j => grp({ class: "w6-m tk", opacity: 0 }, circ(0, 0, 6, COL.orange, { stroke: COL.white, "stroke-width": 2 }))).join("");
      return {
        at: 22, tag: "Decisions the map supports", L: 3, svg: s,
        tick(api, k, K, lv) {
          api.qa(".tk").forEach((t, j) => api.along(t, ".e" + j, (0.2 + k * 0.17 + j * 0.11) % 1));
          api.attr(".e0", "stroke", lv >= 2 ? COL.red : COL.line);
          api.attr(".e2", "stroke", lv >= 2 ? COL.orange : COL.line);
        }
      };
    })(),
    // V10 · Adapts "The Pudding — pockets" (comparison overlay)
    // https://pudding.cool/2018/08/pockets/
    // A fanning folder of diagrams set against a connected map.
    (() => {
      const pages = [0, 1, 2, 3, 4].map(j => grp({ class: "w6-m pg" }, rect(70, 85, 64, 84, COL.white, 6, { stroke: COL.navy, "stroke-width": 2 }) +
        pth(`M80 105 H124 M80 120 H118 M80 135 H124`, COL.line, 3))).join("");
      const tiles = [[250, 80], [320, 80], [250, 140], [320, 140], [285, 200]];
      const s =
        pages + at(102, 196, I.folder(COL.gold, 1.7)) + tx(102, 258, "Documentation", 16, COL.ink) +
        draw(0, "M280 100 H320 M265 115 V140 M335 115 V140 M285 160 L285 200", COL.teal, 4) +
        tiles.map(([x, y], j) => rv(0, "pop", rect(x - 26, y - 18, 52, 36, j === 4 ? COL.orange : COL.navy, 8))).join("") +
        tx(296, 258, "Architecture", 16, COL.ink) +
        rv(1, "pop", tx(200, 165, "\u2260", 64, COL.orange)) +
        rv(2, "pop", at(102, 60, I.q(COL.red, 1.1))) + rv(2, "pop", at(360, 222, I.check(COL.green, 1.1)));
      return {
        at: 27, tag: "Folder or map?", L: 2, svg: s,
        tick(api, k) {
          api.qa(".pg").forEach((p, j) => api.anim(p, { x: (j - 2) * (8 + k * 6), y: -Math.abs(j - 2) * 4 - k * 6, r: (j - 2) * (6 + k * 4) }));
        }
      };
    })()
  ]);

  // ==================================================================
  // W6O1b · Architecture versus documentation and models (12 visuals)
  // ==================================================================
  REG.W6O1b = buildScene("W6O1b", 32, [
    // V1 · Adapts "Logistic - Warehouse" (LottieFiles) — intake, holding, dispatch
    // https://lottiefiles.com/free-animation/logistic-warehouse-json-animation-2kz8lGzNGD
    (() => {
      const belt = "M20 236 H226";
      const s =
        rect(14, 240, 216, 14, COL.ink, 7) + [0, 1, 2, 3, 4, 5].map(j => circ(30 + j * 38, 247, 4, COL.grey)).join("") +
        pth(belt, "none", 1, { class: "belt" }) +
        rv(0, "rise", rect(232, 70, 150, 196, COL.white, 14, { stroke: COL.navy, "stroke-width": 3 }) +
          [0, 1, 2].map(j => rect(246, 112 + j * 50, 122, 40, COL.mist, 8, { stroke: COL.navy, "stroke-width": 2 }) + rect(290, 128 + j * 50, 34, 8, COL.navy, 4)).join("") +
          tx(307, 98, "Repository", 16, COL.navy)) +
        [0, 1, 2, 3].map(() => grp({ class: "w6-m dk", opacity: 0 }, at(0, -24, I.doc(COL.navy, 0.8)))).join("") +
        rv(0, "pop", tx(110, 142, "0", 54, COL.orange, { class: "cnt" }) + tx(110, 170, "diagrams", 16, COL.ink)) +
        rv(1, "left", at(36, 60, I.person(COL.sky)) + pill(122, 52, "Growing fast", COL.sky, { size: 14 })) +
        rv(2, "pop", pill(307, 34, "Stored, not organised", COL.orange, { size: 14 }));
      return {
        at: 0, tag: "Diagrams pile up", L: 2, svg: s,
        tick(api, k) {
          api.text(".cnt", [6, 14, 23][clamp(k, 0, 2)]);
          api.qa(".dk").forEach((d, j) => api.along(d, ".belt", (j * 0.25 + k * 0.18) % 1));
        }
      };
    })(),
    // V2 · Adapts "The Trouble With Food Safety Audits" (New York Times) — highlight evidence, reveal discrepancy
    // https://www.nytimes.com/interactive/projects/documents/food-safety-peanut-inspection
    (() => {
      const flows = [[3, 0], [4, 1], [3, 2]];
      const s =
        flows.map(([nb, v], j) => {
          const x = 16 + j * 126;
          let inner = rect(x, 46, 116, 196, COL.white, 12, { stroke: COL.navy, "stroke-width": 2.5 }) + tx(x + 58, 72, "Version " + "ABC"[j], 15, COL.navy);
          for (let b = 0; b < nb; b++) {
            const y = 88 + b * (nb === 4 ? 36 : 46), w = v === 2 && b === 1 ? 60 : 84;
            inner += rect(x + 16, y, w, nb === 4 ? 26 : 32, b === 1 ? COL.mist : COL.fog, 6, { stroke: COL.line, "stroke-width": 2 });
            if (b < nb - 1) inner += pth(`M${x + 58} ${y + (nb === 4 ? 26 : 32)} V${y + (nb === 4 ? 36 : 46)}`, COL.line, 2);
          }
          return rv(0, "up", inner);
        }).join("") +
        rv(1, "pop", circ(74, 150, 30, "none", { stroke: COL.red, "stroke-width": 4 }) + circ(200, 160, 30, "none", { stroke: COL.red, "stroke-width": 4 }) + circ(306, 150, 30, "none", { stroke: COL.red, "stroke-width": 4 })) +
        rv(1, "up", pill(200, 272, "Which is agreed?", COL.red)) +
        at(0, 0, grp({ class: "w6-m mag" }, I.lens(COL.ink, 1.4)));
      return {
        at: 3, tag: "Which one is agreed?", L: 1, svg: s,
        tick(api, k) { api.from(".mag", { x: 40, y: 120 }, { x: k ? 330 : 190, y: k ? 190 : 120, r: k ? 12 : -6, t: 1.2 }); }
      };
    })(),
    // V3 · Adapts "Interactive SVG Path & GSAP Animation" (CodePen) — trace path, move marker, highlight destination
    // https://codepen.io/WebGuyJeff/pen/rNdmqdO
    (() => {
      const route = "M40 128 H74 M176 128 H196 M256 128 H272 M362 128 H372";
      const s =
        pth("M40 128 H372", COL.line, 4, { class: "rt" }) +
        circ(34, 128, 14, COL.white, { stroke: COL.green, "stroke-width": 4 }) +
        card(74, 102, 102, 52, "Check|booking", { col: COL.navy, size: 15 }) +
        shape("M226 96 L258 128 L226 160 L194 128Z", COL.white, { stroke: COL.gold, "stroke-width": 3 }) + txOn(226, 134, "?", 18, { fill: COL.gold }) +
        tx(226, 84, "Room ready?", 14, COL.gold) +
        card(272, 102, 90, 52, "Issue|key", { col: COL.navy, size: 15 }) +
        circ(380, 128, 13, COL.white, { stroke: COL.red, "stroke-width": 6 }) +
        grp({ class: "w6-m mk", opacity: 0 }, circ(0, 0, 9, COL.orange, { stroke: COL.white, "stroke-width": 3 })) +
        rv(1, "pop", at(226, 186, I.clock(COL.red, 1.1)) + pill(226, 222, "Delay here", COL.red, { size: 14 })) +
        ["Billing", "Housekeeping", "Reservations"].map((nm, j) => rv(2, "up", card(14 + j * 128, 244, 116, 40, nm, { col: COL.grey, size: 14, dash: "6 5" }))).join("") +
        rv(2, "fade", draw(2, "M72 244 L110 160 M200 244 L226 162 M330 244 L310 160", COL.grey, 2, { "stroke-dasharray": "1 1" }));
      void route;
      return {
        at: 5, tag: "Inside one model", L: 2, svg: s,
        tick(api, k) { api.along(".mk", ".rt", [0.15, 0.5, 0.92][clamp(k, 0, 2)]); }
      };
    })(),
    // V4 · Adapts "The Pudding — Human Terrain" (camera shift between scales)
    // https://pudding.cool/2018/10/city_3d/
    (() => {
      const flows = ["Reserve", "Arrive", "Stay", "Depart"];
      const chev = (x, c) => `M${x} 118 H${x + 78} L${x + 92} 148 L${x + 78} 178 H${x} L${x + 14} 148Z`;
      const s = grp({ class: "w6-m cam" },
        rect(16, 52, 368, 46, COL.mist, 10) + tx(200, 82, "Management", 16, COL.navy) +
        flows.map((nm, j) => shape(chev(18 + j * 92, 0), j === 1 ? COL.orange : COL.navy) + txOn(64 + j * 92, 154, nm, 15)).join("") +
        rect(16, 198, 368, 46, COL.mist, 10) + tx(200, 228, "Support", 16, COL.navy) +
        rv(1, "pop", at(156, 104, I.crown(COL.gold, 0.8))) +
        rv(1, "pop", pill(156, 270, "Owner · links · level", COL.green, { size: 14 })) +
        rv(1, "fade", pth("M156 178 V198 M156 98 V118", COL.green, 4)));
      return {
        at: 8, tag: "Zoom out to the map", L: 1, svg: s,
        tick(api) { api.from(".cam", { s: 2.6, x: 117, y: 5 }, { s: 1, x: 0, y: 0, t: 1.4, ease: "power2.inOut" }); }
      };
    })(),
    // V5 · Adapts "SVGator UI templates" — before/after toggle state
    // https://www.svgator.com/animation-templates/ui-elements
    (() => {
      const houses = [0, 1, 2, 3].map(j => rect(26 + j * 42, 120, 36, 60, j % 2 ? COL.mist : COL.sand, 4, { stroke: COL.navy, "stroke-width": 2 }) + rect(38 + j * 42, 156, 12, 24, COL.navy, 2)).join("");
      const s =
        rect(150, 22, 100, 36, COL.mist, 18, { stroke: COL.navy, "stroke-width": 2 }) +
        grp({ class: "w6-m knob" }, circ(170, 40, 14, COL.orange)) +
        tx(84, 47, "Street view", 16, COL.navy) + tx(318, 47, "City map", 16, COL.navy) +
        grp({ class: "w6-m L" }, rect(14, 78, 182, 170, COL.white, 14, { stroke: COL.navy, "stroke-width": 2.5 }) + houses +
          rect(14, 190, 182, 26, COL.grey, 0) + pth("M24 203 H186", COL.white, 3, { "stroke-dasharray": "10 8" }) + tx(105, 238, "One process", 15, COL.ink)) +
        grp({ class: "w6-m R" }, rect(204, 78, 182, 170, COL.white, 14, { stroke: COL.navy, "stroke-width": 2.5 }) +
          pth("M214 120 H376 M214 190 H376 M250 88 V218 M330 88 V218", COL.grey, 8) +
          [[250, 120], [330, 120], [250, 190], [330, 190]].map(([x, y], j) => circ(x, y, 10, j === 2 ? COL.orange : COL.navy)).join("") + tx(295, 238, "All processes", 15, COL.ink)) +
        rv(1, "up", pill(200, 278, "Both are needed", COL.green));
      return {
        at: 10, tag: "Street view vs map", L: 1, svg: s,
        tick(api, k) {
          api.anim(".knob", { x: k ? 60 : 0 });
          api.anim(".L", { o: k ? 1 : 1, s: k ? 0.96 : 1.04 });
          api.anim(".R", { o: k ? 1 : 0.3, s: k ? 1.04 : 0.96 });
        }
      };
    })(),
    // V6 · Adapts "SaaS Platform & Workflow Motion UI Concept" (Dribbble) — cards reflow between states
    // https://dribbble.com/shots/27719724-SaaS-Platform-Workflow-Motion-UI-Concept
    (() => {
      const blocksA = [0, 1, 2, 3, 4, 5].map(j => grp({ class: "w6-m ba" }, rect(34 + (j % 3) * 46, 98 + Math.floor(j / 3) * 46, 38, 34, COL.sand, 6, { stroke: COL.orange, "stroke-width": 2 }))).join("");
      const blocksB = [0, 1, 2].map(j => rect(232 + j * 50, 110, 42, 58, COL.mist, 6, { stroke: COL.navy, "stroke-width": 2 })).join("");
      const s =
        rv(0, "left", rect(18, 40, 172, 160, COL.white, 14, { stroke: COL.orange, "stroke-width": 2.5 }) + tx(104, 72, "Reception admin", 15, COL.orange, { class: "na" }) + blocksA) +
        rv(0, "right", rect(212, 40, 172, 160, COL.white, 14, { stroke: COL.navy, "stroke-width": 2.5 }) + tx(298, 72, "Arrival journey", 15, COL.navy, { class: "nb" }) + blocksB) +
        at(70, 250, I.person(COL.orange)) + at(330, 250, I.person(COL.navy)) +
        rv(1, "pop", tx(200, 128, "\u2260", 46, COL.red), OUT(3)) +
        rv(2, "pop", pill(200, 238, "Can't compare", COL.red), OUT(3)) +
        rv(3, "pop", pill(200, 238, "Shared convention", COL.green));
      return {
        at: 12, tag: "Two names, one process", L: 3, svg: s,
        tick(api, k, K, lv) {
          const done = lv >= 3;
          api.text(".na", done ? "Manage arrival" : "Reception admin");
          api.text(".nb", done ? "Manage arrival" : "Arrival journey");
          api.qa(".ba").forEach((b, j) => api.anim(b, done ? { o: j < 3 ? 1 : 0, x: j < 3 ? j * 4 : 0, y: j < 3 ? 12 : 0, sy: j < 3 ? 1.7 : 1, og: "50% 0%" } : { o: 1 }));
        }
      };
    })(),
    // V7 · Adapts "SAP Signavio Process Transformation Suite" — approval badges over model versions
    // https://www.signavio.com/products/process-transformation-suite/
    (() => {
      const s =
        [0, 1, 2, 3].map(j => grp({ class: "w6-m vc" }, rect(150, 70, 100, 130, COL.white, 10, { stroke: j === 2 ? COL.green : COL.navy, "stroke-width": 2.5 }) +
          tx(200, 100, "v" + (j + 1), 22, j === 2 ? COL.green : COL.navy) + pth("M166 126 H234 M166 144 H226 M166 162 H234 M166 180 H214", COL.line, 3))).join("") +
        rv(1, "pop", at(292, 66, I.seal(COL.green, 1.1))) +
        rv(1, "up", pill(244, 244, "Authoritative", COL.green)) +
        rv(2, "pop", at(48, 74, I.warn(COL.red, 1.1))) +
        rv(2, "up", pill(92, 270, "Outdated basis", COL.red, { size: 14 }));
      return {
        at: 16, tag: "Which version rules?", L: 2, svg: s,
        tick(api, k) {
          const fan = [[-138, 14, -10], [-46, -4, -3], [46, -4, 3], [138, 14, 10]];
          api.qa(".vc").forEach((c, j) => api.anim(c, { x: fan[j][0], y: fan[j][1], r: fan[j][2], s: (k >= 1 && j === 2) ? 1.1 : (k >= 2 && j === 0) ? 1.06 : 0.92, dl: j * 0.06 }));
        }
      };
    })(),
    // V8 · Adapts "SAP Signavio Transformation HUB" — process owner and decision gate
    // https://www.signavio.com/wiki/
    (() => {
      const s =
        rv(0, "left", at(80, 100, I.person(COL.sky, 1.3)) + at(118, 88, I.doc(COL.sky, 0.8)) + tx(90, 146, "Diagram author", 15, COL.sky)) +
        rv(0, "pop", tx(200, 100, "\u2260", 44, COL.red)) +
        rv(0, "right", at(310, 100, I.person(COL.navy, 1.3)) + at(310, 56, I.crown(COL.gold, 0.9)) + tx(310, 146, "Process owner", 15, COL.navy)) +
        rv(1, "left", at(46, 236, I.person(COL.orange)) + tx(46, 272, "Reception", 14, COL.orange)) +
        rv(1, "right", at(170, 236, I.person(COL.teal)) + tx(170, 272, "Revenue", 14, COL.teal)) +
        draw(1, "M66 226 C140 200 230 200 284 180", COL.orange, 3) + draw(1, "M188 220 C220 200 250 196 284 186", COL.teal, 3) +
        rv(1, "pop", at(316, 210, I.check(COL.green, 1.2)) + tx(342, 252, "Decided", 15, COL.green));
      return { at: 19, tag: "Author is not owner", L: 1, svg: s };
    })(),
    // V9 · Adapts "Celonis Process Explorer animation" — cases advance at throughput-dependent speeds
    // https://help.celonis.com/cpm46/en/process-components
    (() => {
      const s =
        card(14, 108, 140, 64, "Corporate|reservations", { col: COL.navy, size: 15 }) +
        pth("M154 140 H246", COL.line, 10, { class: "ln" }) +
        grp({ class: "w6-m arr" }, card(246, 108, 140, 64, "Guest|arrival", { col: COL.navy, size: 15 })) +
        rv(1, "spin", at(84, 84, grp({ class: "w6-spin" }, I.gear(10, COL.orange)))) +
        rv(1, "up", pill(84, 210, "Faster here", COL.orange, { size: 14 })) +
        [0, 1, 2, 3, 4, 5].map(() => grp({ class: "w6-m tq", opacity: 0 }, circ(0, 0, 7, COL.orange, { stroke: COL.white, "stroke-width": 2 }))).join("") +
        rv(2, "pop", at(316, 84, I.clock(COL.red, 1.1))) +
        rv(2, "up", pill(316, 210, "Slower arrival", COL.red, { size: 14 }));
      return {
        at: 21, tag: "Change ripples onward", L: 2, svg: s,
        tick(api, k, K, lv) {
          api.qa(".tq").forEach((t, j) => {
            const f = lv >= 2 ? Math.min(0.95, 0.98 - j * 0.12) : (j / 6 + k * 0.2) % 1;
            api.along(t, ".ln", f);
          });
          api.attr(".arr rect", "stroke", lv >= 2 ? COL.red : COL.navy);
        }
      };
    })(),
    // V10 · Adapts "Animated treemap" (Observable) — nested blocks re-layout
    // https://observablehq.com/@d3/animated-treemap
    (() => {
      const lv = [["Value chain", COL.navy], ["Process", COL.teal], ["Sub-process", COL.sky], ["Activity", COL.gold], ["Task", COL.orange]];
      const s = lv.map(([nm, c], j) => rv(j, "pop",
        rect(14 + j * 16, 22 + j * 34, 250 - j * 32, 262 - j * 58, j === 4 ? COL.orange : COL.white, 12, { stroke: c, "stroke-width": 3 }) +
        (j === 4 ? txOn(14 + 64 + 61, 22 + 136 + 21, "Task", 16) : tx(26 + j * 16, 44 + j * 34, nm, 15, c, { "text-anchor": "start" })))).join("") +
        rv(4, "pop", pill(326, 76, "Business flow", COL.teal, { size: 14 })) + draw(4, "M258 76 H236", COL.teal, 3) +
        rv(4, "pop", pill(326, 160, "One activity", COL.gold, { size: 14 })) + draw(4, "M260 160 H202", COL.gold, 3);
      return { at: 24, tag: "Levels nest inside", L: 4, svg: s };
    })(),
    // V11 · Adapts "SVG Timeline + ScrollTrigger + Paths" (CodePen) — draw successive paths, expose nodes
    // https://codepen.io/ruru_wang/pen/VwOPzgy
    (() => {
      const ln = ["Value chain", "Process", "Sub-process", "Activity", "Task"];
      const s =
        draw(0, "M60 46 V262", COL.line, 6) +
        ln.map((nm, j) => rv(0, "left", circ(60, 46 + j * 54, 12, COL.navy) + tx(82, 52 + j * 54, nm, 15, COL.navy, { "text-anchor": "start" }))).join("") +
        rv(0, "right", card(258, 70, 128, 52, "Diagram A", { col: COL.sky, size: 15 })) + draw(0, "M258 96 C220 96 200 100 162 100", COL.sky, 3) +
        rv(0, "right", card(258, 190, 128, 52, "Diagram B", { col: COL.plum, size: 15 })) + draw(0, "M258 216 C220 216 200 208 162 208", COL.plum, 3) +
        rv(1, "pop", at(322, 156, I.warn(COL.red, 1.1))) +
        rv(1, "up", pill(300, 280, "Agree the level", COL.green, { size: 14 }));
      return { at: 27, tag: "Different levels clash", L: 1, svg: s };
    })(),
    // V12 · Adapts "SVGator motion graphics assets" — reveal, emphasise, exit
    // https://www.svgator.com/animation-templates/assets
    (() => {
      const slots = [[250, 66], [318, 66], [250, 140], [318, 140], [250, 214], [318, 214]];
      const s =
        rv(0, "fade", rect(214, 30, 172, 236, COL.white, 14, { stroke: COL.navy, "stroke-width": 3 }) +
          slots.map(([x, y]) => rect(x - 26, y - 30, 52, 60, COL.fog, 8, { stroke: COL.line, "stroke-width": 2, "stroke-dasharray": "5 4" })).join("") +
          tx(300, 288, "Agreed structure", 15, COL.navy)) +
        slots.map((_, j) => grp({ class: "w6-m dd" }, I.doc(j % 2 ? COL.navy : COL.orange, 0.95))).join("") +
        rv(1, "pop", at(110, 60, I.q(COL.red, 1.2))) + rv(1, "up", pill(110, 270, "Usable?", COL.red)) +
        rv(2, "pop", at(374, 34, I.check(COL.green, 1)));
      const pile = [[60, 150, -18], [100, 140, 12], [140, 160, -6], [80, 200, 20], [126, 210, -14], [160, 196, 8]];
      return {
        at: 29, tag: "A structure people trust", L: 2, svg: s,
        tick(api, k, K, lv) {
          api.qa(".dd").forEach((d, j) => {
            const p = lv >= 2 ? [slots[j][0], slots[j][1], 0] : [pile[j][0] + Math.sin(k + j) * 4, pile[j][1], pile[j][2] + k * 3];
            api.place(d, { x: p[0], y: p[1], r: p[2], dl: lv >= 2 ? j * 0.08 : 0 });
          });
        }
      };
    })()
  ]);

  // ==================================================================
  // W6O1c · Core, supporting and management processes (12 visuals)
  // ==================================================================
  REG.W6O1c = buildScene("W6O1c", 30, [
    // V1 · Adapts "Workflow Management animation gallery" (LottieFiles) — state changes regroup a jumble
    // https://lottiefiles.com/free-animations/workflow
    (() => {
      const items = [["Check-in", 0], ["Payroll", 1], ["Planning", 2], ["Room service", 0], ["IT upkeep", 1], ["Budgeting", 2],
        ["Concierge", 0], ["Purchasing", 1], ["Performance", 2]];
      const jumble = [[150, 70, -8], [20, 150, 6], [270, 40, 10], [140, 190, 5], [276, 150, -7], [30, 50, -5], [270, 210, 4], [20, 220, 8], [150, 120, -10]];
      const cols = [COL.orange, COL.teal, COL.navy];
      const s =
        items.map(([nm], j) => grp({ class: "w6-m it" }, rect(0, 0, 112, 36, COL.white, 9, { stroke: COL.grey, "stroke-width": 2.5, class: "ib" }) + tx(56, 23, nm, 14, COL.ink))).join("") +
        [0, 1, 2].map(c => rv(2, "rise", [0, 1, 2].map(h => at(70 + c * 130, 236 - h * 10, I.coin(COL.gold, 1.1))).join(""))).join("") +
        rv(2, "up", pill(200, 278, "Same budget for all?", COL.red, { size: 14 }));
      return {
        at: 0, tag: "Not every process is alike", L: 2, svg: s,
        tick(api, k, K, lv) {
          const rowOf = [0, 0, 0, 1, 1, 1, 2, 2, 2];
          api.qa(".it").forEach((e, j) => {
            const c = items[j][1];
            const p = lv >= 1 ? [14 + c * 130, 52 + rowOf[j] * 46, 0] : [jumble[j][0], jumble[j][1] + Math.sin(k + j) * 3, jumble[j][2]];
            api.place(e, { x: p[0], y: p[1], r: p[2], dl: lv >= 1 ? j * 0.05 : 0 });
            api.attr(e.querySelector(".ib"), "stroke", lv >= 1 ? cols[c] : COL.grey);
          });
        }
      };
    })(),
    // V2 · Adapts "Modern Business Process Infographics Animation Pack" (Envato) — stacked stage plates
    // https://elements.envato.com/flow-processes-infographic-scenes-pack-ZNAYHQ5
    (() => {
      const plate = (y, c, nm, sub) => shape(`M60 ${y} L340 ${y} L370 ${y + 22} L90 ${y + 22}Z`, c, { opacity: 0.25 }) +
        shape(`M40 ${y - 44} L330 ${y - 44} L360 ${y - 22} L360 ${y + 16} L70 ${y + 16} L40 ${y - 6}Z`, c) +
        txOn(200, y - 14, nm, 19) + txOn(200, y + 7, sub, 13, { opacity: 0.9 });
      const s =
        rv(0, "down", plate(84, COL.navy, "Management", "direct and govern")) +
        rv(0, "left", plate(172, COL.orange, "Core", "value guests pay for")) +
        rv(0, "up", plate(260, COL.teal, "Supporting", "enable the core")) +
        rv(0, "right", at(380, 150, I.guest(COL.orange, 0.9)));
      return {
        at: 3, tag: "Three kinds of process", L: 0, svg: s,
        tick(api, k) { void k; }
      };
    })(),
    // V3 · Adapts "Explainer Video Kit" (Motion Array) — actor, problem, resolution
    // https://motionarray.com/after-effects-templates/explainer-video-18242/
    (() => {
      const s =
        at(60, 200, I.guest(COL.orange, 1.6)) + tx(60, 252, "Guest", 16, COL.orange) +
        rv(0, "right", at(300, 222, I.bldg(110, 150, COL.navy)) + tx(300, 246, "Qasr Marina", 15, COL.navy)) +
        pth("M100 150 C160 110 220 110 246 140", "none", 1, { class: "cp" }) +
        grp({ class: "w6-m cn", opacity: 0 }, I.coin(COL.gold, 1.3)) +
        rv(1, "left", at(150, 230, I.bed(COL.navy, 1.2))) + rv(1, "left", at(200, 232, I.key(COL.gold, 1.2))) +
        rv(2, "down", rect(40, 26, 180, 40, COL.orange, 20) + txOn(130, 52, "Guest arrival", 16)) +
        rv(2, "pop", pill(130, 92, "Core process", COL.navy, { hollow: true, size: 14 }));
      return {
        at: 4, tag: "Core: what guests buy", L: 2, svg: s,
        tick(api, k) { api.along(".cn", ".cp", [0.2, 0.6, 1][clamp(k, 0, 2)]); }
      };
    })(),
    // V4 · Adapts "Stripe Connect" — funds split across routes
    // https://stripe.com/ae/connect
    (() => {
      const s =
        rv(0, "left", rect(14, 110, 104, 80, COL.navy, 14) + txOn(66, 145, "Invest-", 15) + txOn(66, 165, "ment", 15)) +
        pth("M118 140 C190 140 200 80 262 80", COL.orange, 6, { class: "ra", opacity: 0.35 }) +
        pth("M118 160 C190 160 200 220 262 220", COL.grey, 6, { class: "rb", opacity: 0.35 }) +
        rv(0, "right", card(262, 52, 128, 56, "Arrival|experience", { col: COL.orange, size: 15 })) +
        grp({ class: "w6-m pc" }, card(262, 192, 128, 56, "Faster|PC", { col: COL.grey, size: 15 })) +
        [0, 1, 2, 3].map(() => grp({ class: "w6-m ca", opacity: 0 }, I.coin(COL.gold))).join("") +
        [0, 1].map(() => grp({ class: "w6-m cb", opacity: 0 }, I.coin(COL.gold))).join("") +
        rv(1, "pop", at(384, 196, I.cross(COL.red, 1))) +
        rv(1, "up", pill(200, 280, "Differentiate the core", COL.orange, { size: 14 }));
      return {
        at: 7, tag: "Invest to stand out", L: 1, svg: s,
        tick(api, k, K, lv) {
          api.qa(".ca").forEach((c, j) => api.along(c, ".ra", (j / 4 + k * 0.12 + 0.1) % 1));
          api.qa(".cb").forEach((c, j) => { if (lv >= 1) api.anim(c, { o: 0 }); else api.along(c, ".rb", (j / 2 + 0.3) % 1); });
          api.anim(".pc", { o: lv >= 1 ? 0.45 : 1 });
        }
      };
    })(),
    // V5 · Adapts "Factory Manufacturing Animation Pack" (LottieFiles) — conveyor under the shop floor
    // https://lottiefiles.com/marketplace/factory-manufacturing
    (() => {
      const boxes = ["Payroll", "IT upkeep", "Supplies", "Payroll", "IT upkeep", "Supplies"];
      const s =
        rect(0, 140, 400, 6, COL.ink, 0) + tx(330, 126, "Guest side", 14, COL.grey) +
        at(80, 120, I.guest(COL.orange, 1.1)) + rect(150, 92, 120, 46, COL.mist, 8, { stroke: COL.navy, "stroke-width": 2 }) + tx(210, 121, "Front desk", 14, COL.navy) +
        rect(10, 246, 380, 14, COL.ink, 7) + [0, 1, 2, 3, 4, 5, 6, 7].map(j => circ(28 + j * 49, 253, 4, COL.grey)).join("") +
        grp({ class: "w6-m belt" }, boxes.map((nm, j) => rect(j * 132 - 380, 196, 112, 48, COL.white, 8, { stroke: COL.teal, "stroke-width": 2.5 }) + tx(j * 132 - 324, 226, nm, 14, COL.teal)).join("")) +
        at(370, 176, grp({ class: "w6-spin" }, I.gear(12, COL.teal))) +
        rv(1, "pop", pill(80, 56, "Guests don't see it", COL.grey, { size: 14 })) +
        rv(2, "up", draw(2, "M210 190 V150", COL.green, 4) + head(210, 148, -90, COL.green, 2) + pill(110, 172, "Enables the core", COL.green, { size: 14 }));
      return {
        at: 9, tag: "Supporting work beneath", L: 2, svg: s,
        tick(api, k) { api.place(".belt", { x: 132 + clamp(k, 0, 2) * 132, t: 1.2, ease: "power1.inOut" }); }
      };
    })(),
    // V6 · Adapts "Free Logistics gallery" (LottieFiles) — transport loop with a waiting checkpoint
    // https://lottiefiles.com/free-animations/logistics
    (() => {
      const loop = "M90 150 C90 70 310 70 310 150 C310 230 90 230 90 150Z";
      const s =
        pth(loop, COL.line, 8, { class: "lp" }) +
        rv(0, "left", card(14, 124, 96, 52, "Supplier", { col: COL.teal, size: 15 })) +
        rv(0, "right", at(332, 180, I.bldg(76, 100, COL.navy)) + tx(332, 200, "Hotel", 15, COL.navy)) +
        grp({ class: "w6-m tr", opacity: 0 }, rect(-18, -12, 26, 22, COL.teal, 4) + rect(8, -6, 12, 16, COL.teal, 3) + circ(-10, 12, 5, COL.ink) + circ(12, 12, 5, COL.ink)) +
        rv(0, "pop", pill(200, 44, "Ready-made service", COL.teal, { size: 14 }), OUT(1)) +
        rv(1, "pop", at(200, 214, I.warn(COL.red, 1.2))) +
        rv(1, "up", pill(200, 268, "Stay disrupted", COL.red)) +
        rv(1, "pop", circ(332, 130, 34, "none", { stroke: COL.red, "stroke-width": 5 }));
      return {
        at: 12, tag: "Standardise, keep it running", L: 1, svg: s,
        tick(api, k, K, lv) { api.along(".tr", ".lp", lv >= 1 ? 0.5 : 0.18); }
      };
    })(),
    // V7 · Adapts "Animated Planning Dashboard Workflow" (Dribbble) — panels pulse while a person works
    // https://dribbble.com/shots/27184988-Animated-Planning-Dashboard-Workflow
    (() => {
      const s =
        rect(110, 26, 280, 120, COL.ink, 14) +
        [0, 1].map(j => at(170 + j * 80, 90, circ(0, 0, 30, "none", { stroke: COL.grey, "stroke-width": 6 }) + grp({ class: "w6-m dl" + j }, pth("M0 0 V-24", COL.gold, 4)))).join("") +
        txOn(170, 136, "Invest", 13) + txOn(250, 136, "Measure", 13) +
        [0, 1, 2, 3].map(j => grp({ class: "w6-m br" }, rect(304 + j * 18, 44, 12, 80, COL.green, 3))).join("") +
        at(56, 120, I.person(COL.navy, 1.6)) + tx(56, 166, "Executives", 15, COL.navy) +
        rv(1, "up", card(120, 214, 120, 46, "Core", { col: COL.orange, solid: true, size: 16 })) +
        rv(1, "up", card(262, 214, 120, 46, "Supporting", { col: COL.teal, solid: true, size: 16 })) +
        draw(1, "M180 150 V210", COL.navy, 3) + draw(1, "M322 150 V210", COL.navy, 3) +
        rv(2, "pop", pill(56, 230, "Direct", COL.navy, { size: 14 }));
      return {
        at: 14, tag: "Management steers", L: 2, svg: s,
        tick(api, k) {
          api.anim(".dl0", { r: [-60, 20, 55][clamp(k, 0, 2)], og: "50% 100%" });
          api.anim(".dl1", { r: [40, -30, 10][clamp(k, 0, 2)], og: "50% 100%" });
          api.qa(".br").forEach((b, j) => api.anim(b, { sy: [0.4, 0.7, 0.55, 0.9][(j + k) % 4], og: "50% 100%" }));
        }
      };
    })(),
    // V8 · Adapts "Stripe Connect onboarding quickstart" — decision diamond and checkpoints
    // https://docs.stripe.com/connect/onboarding/quickstart
    (() => {
      const s =
        pth("M30 170 H370", COL.line, 8) +
        shape("M200 112 L258 170 L200 228 L142 170Z", COL.white, { stroke: COL.navy, "stroke-width": 3 }) + tx(200, 176, "Change?", 15, COL.navy) +
        grp({ class: "w6-m ow" }, I.person(COL.orange, 1.2) + at(0, -34, I.crown(COL.gold, 0.6))) +
        rv(0, "pop", at(200, 82, I.lock(COL.red, 1.3)), OUT(1)) +
        rv(0, "up", pill(200, 266, "No decision rights", COL.red, { size: 14 }), OUT(1)) +
        rv(1, "pop", at(200, 82, I.check(COL.green, 1.2))) +
        rv(1, "fade", rect(14, 40, 372, 230, "none", 18, { stroke: COL.navy, "stroke-width": 3, "stroke-dasharray": "10 7" }) + pill(200, 266, "Management process", COL.navy, { size: 14 }));
      return {
        at: 17, tag: "Decision rights matter", L: 1, svg: s,
        tick(api, k, K, lv) { api.from(".ow", { x: 30, y: 168 }, { x: lv >= 1 ? 320 : 110, y: 168, t: 1.2 }); }
      };
    })(),
    // V9 · Adapts "Linear" product site — work items move between status columns
    // https://linear.app/
    (() => {
      const colx = [120, 212, 304], heads = ["Core", "Support", "Manage"];
      const board = (y, nm, lv) => rv(lv, "up", tx(14, y + 34, nm, 15, COL.navy, { "text-anchor": "start" }) +
        heads.map((h, j) => rect(colx[j] - 42, y, 84, 70, COL.fog, 10, { stroke: COL.line, "stroke-width": 2 })).join(""));
      const s =
        heads.map((h, j) => tx(colx[j], 34, h, 15, [COL.orange, COL.teal, COL.navy][j])).join("") +
        board(48, "Payroll|firm", 1) + board(150, "Qasr", 0) +
        rv(1, "fade", grp({ class: "w6-m ca" }, rect(-38, -16, 76, 32, COL.gold, 8) + txOn(0, 6, "Payroll", 14))) +
        grp({ class: "w6-m cb" }, rect(-38, -16, 76, 32, COL.gold, 8) + txOn(0, 6, "Payroll", 14)) +
        rv(4, "up", pill(200, 266, "Strategy decides", COL.green));
      return {
        at: 19, tag: "Same work, different role", L: 4, svg: s,
        tick(api, k, K, lv) {
          api.place(".ca", { x: lv >= 2 ? colx[0] : 360, y: 83 });
          api.place(".cb", { x: lv >= 3 ? colx[1] : 360, y: 185 });
          api.anim(".ca", { x: lv >= 2 ? colx[0] : 360, y: 83 });
          api.anim(".cb", { x: lv >= 3 ? colx[1] : 360, y: 185 });
        }
      };
    })(),
    // V10 · Adapts "MotionPath plugin demonstration" (GSAP) — object traverses a path
    // https://gsap.com/docs/v3/Plugins/MotionPathPlugin/
    (() => {
      const s =
        pth("M60 110 C130 40 170 190 200 120 C230 50 290 170 340 110", COL.navy, 4, { class: "mp", "stroke-dasharray": "8 8" }) +
        at(60, 110, I.target(COL.navy, 1.5)) + tx(60, 156, "Strategy", 15, COL.navy) +
        at(200, 120, circ(0, 0, 26, COL.white, { stroke: COL.teal, "stroke-width": 3 }) + pth("M-12 -6 H12 M-12 2 H6 M-12 10 H9", COL.teal, 3)) + tx(200, 170, "Classify", 15, COL.teal) +
        at(340, 110, I.coin(COL.gold, 2)) + tx(340, 156, "Invest", 15, COL.gold) +
        grp({ class: "w6-m sg", opacity: 0 }, circ(0, 0, 10, COL.orange, { stroke: COL.white, "stroke-width": 3 })) +
        rv(1, "up", at(110, 254, I.bldg(60, 60, COL.grey)) + tx(210, 250, "Department size", 15, COL.grey) + at(110, 222, I.cross(COL.red, 0.9)));
      return {
        at: 24, tag: "Strategy first", L: 1, svg: s,
        tick(api, k) { api.along(".sg", ".mp", k ? 0.98 : 0.5); }
      };
    })(),
    // V11 · Adapts "Sankey With Animated Gradients" (Observable) — highlight a node's connected flows
    // https://old.observablehq.com/@jarrettmeyer/sankey-with-animated-gradients
    (() => {
      const s =
        rect(14, 90, 26, 120, COL.navy, 6) + tx(27, 230, "All", 15, COL.navy) +
        draw(0, "M40 120 C150 120 170 80 250 80", COL.orange, 34, { "stroke-linecap": "butt", opacity: 0.85 }) +
        draw(0, "M40 180 C150 180 170 220 250 220", COL.teal, 34, { "stroke-linecap": "butt", opacity: 0.85 }) +
        grp({ class: "w6-ants" }, pth("M40 120 C150 120 170 80 250 80", COL.white, 3) + pth("M40 180 C150 180 170 220 250 220", COL.white, 3)) +
        card(252, 56, 136, 48, "Differentiate", { col: COL.orange, solid: true, size: 15 }) +
        card(252, 196, 136, 48, "Standardise", { col: COL.teal, solid: true, size: 15 }) +
        rv(1, "pop", E("ellipse", { cx: 320, cy: 150, rx: 76, ry: 128, fill: "none", stroke: COL.navy, "stroke-width": 3, "stroke-dasharray": "8 8" })) +
        rv(1, "pop", pill(320, 150, "Coordinated", COL.navy, { size: 14 }));
      return { at: 26, tag: "Differentiate or standardise", L: 1, svg: s };
    })(),
    // V12 · Adapts "Awwwards — Kairon Labs SVG animation" — scrub into the next composition
    // https://www.awwwards.com/inspiration/svg-animation-on-scroll-https-kaironlabs-com
    (() => {
      const tiles = (y, c, n) => Array.from({ length: n }, (_, j) => rect(40 + j * (320 / n), y, 320 / n - 6, 40, c, 6)).join("");
      const s =
        rv(0, "fade", tiles(40, COL.navy, 1) + tiles(130, COL.orange, 1) + tiles(220, COL.teal, 1), OUT(1)) +
        rv(1, "pop", tiles(40, COL.navy, 3) + tiles(130, COL.orange, 4) + tiles(220, COL.teal, 3)) +
        at(0, 0, grp({ class: "w6-m ln" }, I.lens(COL.ink, 1.6))) +
        tx(200, 112, "How far to zoom?", 17, COL.ink) + tx(200, 202, "Useful levels next", 15, COL.grey);
      return {
        at: 28, tag: "Next: useful levels", L: 1, svg: s,
        tick(api, k) { api.from(".ln", { x: 60, y: 60 }, { x: k ? 300 : 200, y: k ? 150 : 150, t: 1.1 }); }
      };
    })()
  ]);

  // ==================================================================
  // W6O2a · Three levels — knowing how far to zoom in (10 visuals)
  // ==================================================================
  REG.W6O2a = buildScene("W6O2a", 31, [
    // V1 · Adapts "Celonis Process Explorer map" — the activity slider expands or collapses the map
    // https://help.celonis.com/cpm47/en/process-explorer
    (() => {
      const mid = [0, 1, 2, 3, 4, 5].map(j => rect(40 + (j % 3) * 112, 92 + Math.floor(j / 3) * 86, 96, 60, COL.navy, 10)).join("") +
        pth("M136 122 H152 M248 122 H264 M88 152 V178 M200 152 V178 M312 152 V178", COL.line, 4);
      const many = Array.from({ length: 70 }, (_, j) => rect(22 + (j % 10) * 36, 76 + Math.floor(j / 10) * 26, 30, 18, j % 7 ? COL.sky : COL.orange, 3)).join("");
      const s =
        rect(90, 34, 220, 10, COL.mist, 5) + tx(48, 45, "1 box", 14, COL.grey) + tx(356, 45, "Every task", 14, COL.grey) +
        grp({ class: "w6-m kb" }, circ(200, 39, 13, COL.orange, { stroke: COL.white, "stroke-width": 3 })) +
        grp({ class: "w6-m g0" }, mid) + grp({ class: "w6-m g1", opacity: 0 }, many) +
        grp({ class: "w6-m g2", opacity: 0 }, rect(70, 90, 260, 150, COL.navy, 18) + txOn(200, 172, "Hotel operations", 20)) +
        grp({ class: "w6-m p1", opacity: 0 }, pill(200, 276, "Impossible to read", COL.red, { size: 14 })) +
        grp({ class: "w6-m p2", opacity: 0 }, pill(200, 276, "Reveals nothing", COL.red, { size: 14 }));
      return {
        at: 0, tag: "How much detail?", L: 0, svg: s,
        tick(api, k) {
          const st = [0, 0, 1, 2][clamp(k, 0, 3)];
          api.anim(".kb", { x: [0, 0, 110, -110][clamp(k, 0, 3)], t: 1 });
          ["g0", "g1", "g2"].forEach((g, j) => api.anim("." + g, { o: st === j ? 1 : 0, s: st === j ? 1 : 0.9 }));
          api.anim(".p1", { o: st === 1 ? 1 : 0 }); api.anim(".p2", { o: st === 2 ? 1 : 0 });
        }
      };
    })(),
    // V2 · Adapts "Awwwards — background SVG animation (Henning Tillmann)" — elements reposition and scale with progress
    // https://www.awwwards.com/inspiration/background-svg-animation-on-scroll-henning-tillmann
    (() => {
      const s =
        E("clipPath", { id: "w6cp-o2a-map" }, rect(14, 30, 230, 250, "#000", 16)) +
        rect(14, 30, 230, 250, COL.mist, 16, { stroke: COL.navy, "stroke-width": 3 }) +
        grp({ "clip-path": "url(#w6cp-o2a-map)" }, grp({ class: "w6-m mapz" },
          shape("M40 80 L120 50 L210 70 L230 150 L190 250 L90 262 L36 190Z", COL.white, { stroke: COL.navy, "stroke-width": 3 }) +
          pth("M60 120 H210 M80 200 H200 M130 60 V250", COL.line, 3) +
          pth("M140 150 H160 M150 140 V160 M143 144 L157 156", COL.grey, 1.2) +
          circ(150, 150, 6, COL.orange))) +
        ["Country", "Neighbourhood", "Street"].map((nm, j) => rv(2, "right", card(258, 52 + j * 74, 130, 50, nm, { col: [COL.navy, COL.teal, COL.orange][j], size: 14 }))).join("") +
        rv(2, "fade", pth("M323 102 V126 M323 176 V200", COL.line, 4)) +
        rv(1, "pop", pill(129, 282, "Zoom for decisions", COL.orange, { size: 14 }));
      return {
        at: 4, tag: "Zoom like a map", L: 2, svg: s,
        tick(api, k) { api.anim(".mapz", { s: [1, 2.8, 1][clamp(k, 0, 2)], x: [0, -6, 0][clamp(k, 0, 2)], y: [0, 5, 0][clamp(k, 0, 2)], t: 1.3, ease: "power2.inOut" }); }
      };
    })(),
    // V3 · Adapts "Modern Business Process Infographics Animation Pack" (Envato) — stations on a value ribbon
    // https://elements.envato.com/flow-processes-infographic-scenes-pack-ZNAYHQ5
    (() => {
      const st = ["Manage|reservations", "Deliver|arrival", "Provide|stay", "Complete|departure"];
      const s =
        rv(0, "down", pth("M40 96 Q200 20 360 96", COL.navy, 10) + tx(200, 46, "Govern performance", 15, COL.navy)) +
        draw(1, "M24 150 H356", COL.orange, 22, { "stroke-linecap": "butt" }) +
        rv(1, "fade", shape("M356 128 L392 150 L356 172Z", COL.orange)) +
        st.map((nm, j) => rv(1, "pop", circ(66 + j * 90, 150, 22, COL.white, { stroke: COL.orange, "stroke-width": 5 }) + txOn(66 + j * 90, 157, String(j + 1), 18, { fill: COL.orange }))).join("") +
        st.map((nm, j) => rv(1, "up", tx(66 + j * 90, 202, nm, 14, COL.ink))).join("") +
        [0, 1, 2, 3].map(j => rv(2, "rise", rect(34 + j * 86, 246, 76, 30, COL.teal, 6))).join("") +
        rv(2, "fade", tx(200, 294, "Maintain properties · people · IT", 14, COL.teal)) +
        rv(3, "pop", pill(330, 46, "Level 1", COL.green, { size: 14 }));
      return { at: 7, tag: "Level 1: the landscape", L: 3, svg: s };
    })(),
    // V4 · Adapts "SaaS Platform & Workflow Motion UI Concept" (Dribbble) — one card expands into its parts
    // https://dribbble.com/shots/27719724-SaaS-Platform-Workflow-Motion-UI-Concept
    (() => {
      const top = ["Reserve", "Arrive", "Stay", "Depart"];
      const subs = ["Verify|booking", "Confirm|room", "Complete|arrival"];
      const s =
        top.map((nm, j) => card(22 + j * 92, 22, 84, 36, nm, { col: j === 1 ? COL.orange : COL.navy, solid: j === 1, size: 14 })).join("") +
        rv(1, "rise", shape("M114 58 H190 L380 96 V276 H20 V96Z", COL.sand, { opacity: 0.55 })) +
        rv(1, "rise", rect(20, 96, 360, 180, COL.white, 16, { stroke: COL.orange, "stroke-width": 3 }) + tx(200, 124, "Guest arrival", 17, COL.orange)) +
        subs.map((nm, j) => rv(2, "up", card(36 + j * 114, 146, 100, 60, nm, { col: COL.teal, size: 14 }))).join("") +
        rv(2, "fade", pth("M136 176 H150 M250 176 H264", COL.teal, 4)) +
        rv(3, "pop", pth("M36 222 V234 H364 V222", COL.navy, 3) + pill(200, 250, "Parts of one whole", COL.navy, { size: 14 }));
      return { at: 10, tag: "Open guest arrival", L: 3, svg: s };
    })(),
    // V5 · Adapts "Animation Workflow gallery" (LottieFiles) — repeating activity, transition, overload
    // https://lottiefiles.com/free-animations/animation-workflow
    (() => {
      const chips = Array.from({ length: 8 }, (_, j) => grp({ class: "w6-m ch" }, rect(-26, -13, 52, 26, COL.sky, 6)));
      const s =
        grp({ class: "w6-m shelf" }, rect(20, 92, 360, 12, COL.ink, 6) +
          [0, 1, 2, 3].map(j => rect(32 + j * 88, 50, 80, 42, COL.navy, 8)).join("") + tx(200, 128, "Top-level map", 15, COL.navy)) +
        rect(110, 160, 180, 104, COL.white, 14, { stroke: COL.orange, "stroke-width": 3 }) + tx(200, 186, "Guest arrival", 15, COL.orange) +
        chips.join("") +
        rv(1, "pop", pill(70, 214, "Stay inside", COL.green, { size: 14 }), OUT(2)) +
        rv(2, "pop", at(360, 150, I.warn(COL.red, 1.2))) +
        rv(2, "up", pill(70, 214, "Map overloads", COL.red, { size: 14 }));
      return {
        at: 14, tag: "Parts stay parts", L: 2, svg: s,
        tick(api, k, K, lv) {
          api.qa(".ch").forEach((c, j) => {
            const inside = [148 + (j % 3) * 52, 216 + Math.floor(j / 3) * 28];
            const onShelf = [44 + j * 44, 76 - (j % 2) * 26];
            const p = lv >= 2 ? onShelf : (lv === 1 ? inside : [inside[0], inside[1] - (j === k % 8 ? 20 : 0)]);
            api.place(c, { x: p[0], y: Math.min(p[1], 252), r: lv >= 2 ? (j % 2 ? 8 : -8) : 0, dl: j * 0.05 });
          });
          api.anim(".shelf", { r: lv >= 2 ? 4 : 0, y: lv >= 2 ? 6 : 0 });
        }
      };
    })(),
    // V6 · Adapts "Celonis process analysis" — reveal the observed flow, then overlay what is hidden
    // https://www.celonis.com/platform/process-analysis
    (() => {
      const hidden = ["Sales", "Clean", "Hire", "Repair", "Cook", "Bill", "Market", "Audit"];
      const s =
        rv(0, "pop", rect(30, 40, 340, 210, COL.navy, 22) + txOn(200, 82, "Manage the hotel", 22)) +
        hidden.map((nm, j) => rv(1, "pop", rect(50 + (j % 4) * 78, 112 + Math.floor(j / 4) * 62, 70, 46, COL.white, 8, { opacity: 0.95 }) + tx(85 + (j % 4) * 78, 141 + Math.floor(j / 4) * 62, nm, 14, COL.navy))).join("") +
        grp({ class: "w6-m scan" }, rect(30, 40, 10, 210, COL.gold, 4, { opacity: 0.8 })) +
        rv(1, "up", pill(200, 278, "Who owns which?", COL.red));
      return {
        at: 17, tag: "Too broad to manage", L: 1, svg: s,
        tick(api, k) { api.from(".scan", { x: 0 }, { x: k ? 330 : 120, t: 1.4, ease: "power1.inOut" }); }
      };
    })(),
    // V7 · Adapts "Workflow Dashboard – Interactive Motion Design" (Dribbble) — panels switch focus
    // https://dribbble.com/shots/27538364-Workflow-Dashboard-Interactive-Motion-Design
    (() => {
      const s =
        grp({ class: "w6-m pa" }, rect(14, 56, 180, 200, COL.white, 14, { stroke: COL.navy, "stroke-width": 3 }) + tx(104, 84, "Strategic", 17, COL.navy) +
          [0, 1, 2, 3].map(j => rect(30 + (j % 2) * 78, 104 + Math.floor(j / 2) * 70, 70, 56, COL.navy, 8)).join("")) +
        grp({ class: "w6-m pb" }, rect(206, 56, 180, 200, COL.white, 14, { stroke: COL.orange, "stroke-width": 3 }) + tx(296, 84, "Operational", 17, COL.orange) +
          [0, 1, 2].map(j => rect(216, 100 + j * 48, 160, 40, j % 2 ? COL.fog : COL.sand, 4)).join("") +
          Array.from({ length: 7 }, (_, j) => rect(222 + j * 22, 108 + (j % 3) * 48, 16, 24, COL.orange, 3)).join("")) +
        rv(0, "pop", pill(200, 30, "Which decision?", COL.ink, { size: 15 }));
      return {
        at: 19, tag: "Detail fits the decision", L: 0, svg: s,
        tick(api, k) {
          api.anim(".pa", { s: k === 1 ? 1.08 : 0.94, o: k === 2 ? 0.35 : 1 });
          api.anim(".pb", { s: k === 2 ? 1.08 : 0.94, o: k === 1 ? 0.35 : 1 });
        }
      };
    })(),
    // V8 · Adapts "Design process timeline - Animation" (Dribbble) — a marker travels between milestones
    // https://dribbble.com/shots/9892691-Design-process-timeline-Animation
    (() => {
      const fl = ["Landscape", "Process", "Sub-process", "Activity", "Task"];
      const s =
        rect(150, 20, 200, 270, COL.white, 12, { stroke: COL.navy, "stroke-width": 3 }) +
        fl.map((nm, j) => rect(150, 20 + j * 54, 200, 54, j % 2 ? COL.fog : COL.white, 0, { stroke: COL.line, "stroke-width": 1.5 }) + tx(268, 53 + j * 54, nm, 16, COL.navy)).join("") +
        rect(160, 20, 6, 270, COL.line, 3) +
        grp({ class: "w6-m car" }, rect(152, 26, 30, 42, COL.orange, 6) + circ(167, 40, 6, COL.white)) +
        rv(0, "left", pill(72, 70, "Strategy talk", COL.navy, { size: 14 })) +
        rv(1, "left", pill(72, 236, "Operations fix", COL.orange, { size: 14 })) +
        rv(1, "fade", pth("M72 100 V140 M72 180 V206", COL.green, 4, { "stroke-dasharray": "6 6" }) + tx(72, 160, "Same map", 14, COL.green));
      return {
        at: 22, tag: "Levels stay connected", L: 1, svg: s,
        tick(api, k) { api.from(".car", { y: 108 }, { y: k ? 216 : 0, t: 1.4, ease: "power2.inOut" }); }
      };
    })(),
    // V9 · Adapts "SVGator — animated UI templates you can customize" — cards flip to reveal a hidden state
    // https://www.svgator.com/blog/animated-ui-templates-you-can-customize/
    (() => {
      const s =
        rv(0, "left", rect(14, 40, 180, 190, COL.white, 14, { stroke: COL.navy, "stroke-width": 3 }) + tx(104, 68, "Hotel A", 17, COL.navy)) +
        rv(0, "right", rect(206, 40, 180, 190, COL.white, 14, { stroke: COL.teal, "stroke-width": 3 }) + tx(296, 68, "Hotel B", 17, COL.teal)) +
        rv(1, "pop", card(34, 96, 140, 70, "Guest|arrival", { col: COL.navy, solid: true, size: 15 })) +
        [0, 1, 2, 3, 4].map(j => rv(1, "pop", rect(220 + (j % 3) * 54, 92 + Math.floor(j / 3) * 52, 46, 40, COL.teal, 6))).join("") +
        rv(2, "pop", pill(104, 200, "Level 2?", COL.gold, { size: 14 })) + rv(2, "pop", pill(296, 200, "Level 3?", COL.gold, { size: 14 })) +
        rv(3, "up", pill(200, 268, "Paper, not practice", COL.red));
      return { at: 24, tag: "Same work, unequal maps", L: 3, svg: s };
    })(),
    // V10 · Adapts "SVGator icon templates" — icon from idle to action to completion
    // https://www.svgator.com/animation-templates/icons
    (() => {
      const s =
        [0, 1, 2].map(j => rv(0, "up", rect(24 + j * 124, 120, 104, 120, COL.white, 12, { stroke: COL.navy, "stroke-width": 2.5 }) +
          pth(`M${40 + j * 124} 150 H${112 + j * 124} M${40 + j * 124} 170 H${100 + j * 124} M${40 + j * 124} 190 H${112 + j * 124}`, COL.line, 4) +
          grp({ class: "w6-m tag" }, rect(42 + j * 124, 204, 68, 26, COL.green, 6) + txOn(76 + j * 124, 222, "Level 2", 13)))).join("") +
        grp({ class: "w6-m st" }, rect(-34, -60, 68, 44, COL.orange, 8) + rect(-10, -84, 20, 26, COL.ink, 6) + rect(-40, -18, 80, 12, COL.ink, 4)) +
        rv(1, "pop", pill(200, 278, "Comparable models", COL.green)) +
        rv(2, "pop", pill(200, 40, "Next: who owns it?", COL.navy, { size: 14 }));
      return {
        at: 28, tag: "State the level", L: 2, svg: s,
        tick(api, k) {
          api.place(".st", { x: 76 + clamp(k, 0, 2) * 124, y: 126 });
          api.qa(".tag").forEach((t, j) => api.anim(t, { o: j <= k ? 1 : 0, s: j <= k ? 1 : 0.4 }));
        }
      };
    })()
  ]);

  if (typeof document !== "undefined") {
    if (document.head) installCSS();
    else document.addEventListener("DOMContentLoaded", installCSS, { once: true });
  }
})();
// END FILE: w06-claude-part1.js

// FILE: w06-claude-part2.js
// OPER621 · Week 6 · Process Architecture — animated teaching scenes, part 2 of 3
// Sections: W6O2b, W6O2c, W6O3a, W6O3b
// Contract: window.VL_SCENES["<secId>"] = { build(el), step(i, n), reset() }; i = narration moment index.
// Standalone: defines every helper it uses; appends its own scoped rules to <style id="vl-sc-w06">.
// Each section is a reel of distinct visuals; every visual names the benchmark template it adapts.
// Uses window.gsap when present (CSS transitions otherwise); honours prefers-reduced-motion.
(() => {
  "use strict";
  if (typeof window === "undefined") return;
  window.VL_SCENES = window.VL_SCENES || {};
  const REG = window.VL_SCENES;
  const PART = 2;
  const IDS = ["W6O2b", "W6O2c", "W6O3a", "W6O3b"];
  // ------------------------------------------------------------------
  // SHARED RUNTIME (self-contained in every part; nothing leaks out)
  // A section is a "shot reel": several distinct visual compositions,
  // each owning a slice of the narration moments. Inside a shot, items
  // tagged data-lv="n" are revealed level by level, and an optional
  // tick(api,k,K,lv) adds deterministic motion on EVERY moment.
  // All states are recomputed from (i,n) only, so seeking is safe.
  // ------------------------------------------------------------------
  const NS = "http://www.w3.org/2000/svg";
  const VB = { w: 400, h: 300 };
  const COL = {
    navy: "#1f4e79", ink: "#1b2a3a", orange: "#c0502a", green: "#2f7a5f",
    gold: "#c9962e", sky: "#3f7fb5", teal: "#23807e", plum: "#6a4c93",
    red: "#b8322f", paper: "#fbf8f1", mist: "#e3ecf4", fog: "#f1f5f9",
    line: "#9fb4c7", grey: "#7d8a97", white: "#ffffff", sand: "#f3e6cc"
  };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const num = (v, d) => { if (v === null || v === undefined || v === "") return d; const x = Number(v); return Number.isFinite(x) ? x : d; };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const attrs = o => Object.keys(o || {}).filter(k => o[k] !== null && o[k] !== undefined && o[k] !== false)
    .map(k => ` ${k}="${esc(o[k])}"`).join("");
  const E = (tag, o, inner) => `<${tag}${attrs(o)}>${inner == null ? "" : inner}</${tag}>`;
  const rect = (x, y, w, h, fill, rx, o) => E("rect", Object.assign({ x, y, width: w, height: h, rx: rx || 0, fill }, o));
  const circ = (x, y, r, fill, o) => E("circle", Object.assign({ cx: x, cy: y, r, fill }, o));
  const pth = (d, stroke, w, o) => E("path", Object.assign({ d, fill: "none", stroke, "stroke-width": w || 2, "stroke-linecap": "round", "stroke-linejoin": "round" }, o));
  const shape = (d, fill, o) => E("path", Object.assign({ d, fill }, o));
  const grp = (o, inner) => E("g", o, inner);
  const at = (x, y, inner, s) => E("g", { transform: `translate(${x} ${y})${s ? ` scale(${s})` : ""}` }, inner);
  // Text: bold, halo for legibility; '|' splits into two centred lines.
  const tx = (x, y, s, size, fill, o) => {
    const z = size || 16, parts = String(s).split("|");
    const base = Object.assign({ x, y, "font-size": z, "text-anchor": "middle", "font-weight": 800,
      "paint-order": "stroke", stroke: COL.white, "stroke-width": 3.2, "stroke-linejoin": "round" }, o, { fill: fill || COL.ink });
    if (parts.length === 1) return E("text", base, esc(s));
    const lh = z * 1.12, y0 = y - (lh * (parts.length - 1)) / 2;
    base.y = y0;
    return E("text", base, parts.map((p, i) => E("tspan", { x, dy: i ? lh : 0 }, esc(p))).join(""));
  };
  const txOn = (x, y, s, size, fill, o) => {
    if (fill && typeof fill === "object") { o = fill; fill = null; }
    return tx(x, y, s, size, (o && o.fill) || fill || COL.white, Object.assign({ stroke: "none" }, o, { fill: undefined }));
  };
  // Reveal wrappers. how: up|down|left|right|pop|fade|grow|rise|spin|draw
  const LV = (n, how, o) => Object.assign({ "data-lv": n, "data-in": how || "up" }, o);
  const rv = (n, how, inner, o) => grp(LV(n, how, o), inner);
  const OUT = (n, o) => Object.assign({ "data-out": n }, o);
  const draw = (n, d, stroke, w, o) => pth(d, stroke, w, Object.assign({ pathLength: 1, "stroke-dasharray": "1 1", "stroke-dashoffset": 1 }, LV(n, "draw"), o));
  const tw = (s, z) => String(s).split("|").reduce((m, p) => Math.max(m, p.length), 0) * (z || 16) * 0.6;
  // Labelled card.
  const card = (x, y, w, h, label, o) => {
    o = o || {};
    const c = o.col || COL.navy, solid = !!o.solid, z = o.size || 15;
    const body = rect(x, y, w, h, solid ? c : (o.fill || COL.white), o.rx == null ? 10 : o.rx,
      { stroke: c, "stroke-width": o.sw || 2.5, "stroke-dasharray": o.dash || null }) +
      (o.band ? rect(x, y, 8, h, c, 4) : "") +
      (solid ? txOn(x + w / 2, y + h / 2 + z * 0.36, label, z) : tx(x + w / 2, y + h / 2 + z * 0.36, label, z, o.tcol || COL.ink));
    return o.lv == null ? grp({ class: o.cls || null }, body) : rv(o.lv, o.in || "up", body, { class: o.cls || null });
  };
  const pill = (cx, cy, label, col, o) => {
    o = o || {};
    const z = o.size || 15, w = Math.max(48, tw(label, z) + 26), h = z + 14;
    const body = rect(cx - w / 2, cy - h / 2, w, h, o.hollow ? COL.white : col, h / 2, { stroke: col, "stroke-width": 2.5 }) +
      (o.hollow ? tx(cx, cy + z * 0.36, label, z, col) : txOn(cx, cy + z * 0.36, label, z));
    return o.lv == null ? grp({ class: o.cls || null }, body) : rv(o.lv, o.in || "pop", body, { class: o.cls || null });
  };
  const head = (x, y, ang, col, n, o) => rv(n, "pop", at(x, y, shape("M0 0 L-12 -7 L-9 0 L-12 7Z", col, { transform: `rotate(${ang})` })), o);
  // Icons, all drawn around (0,0).
  const I = {
    person: (c, s) => at(0, 0, circ(0, -17, 8, c) + shape("M-14 13 Q-14 -6 0 -6 Q14 -6 14 13Z", c), s),
    guest: (c, s) => at(0, 0, circ(0, -17, 8, c) + shape("M-14 13 Q-14 -6 0 -6 Q14 -6 14 13Z", c) +
      rect(14, -2, 11, 15, COL.orange, 2) + pth("M17 -2 V-6 H22 V-2", COL.orange, 2), s),
    doc: (c, s) => at(0, 0, shape("M-15 -20 H7 L15 -12 V20 H-15Z", COL.white, { stroke: c, "stroke-width": 2.5, "stroke-linejoin": "round" }) +
      pth("M-9 -8 H9 M-9 0 H9 M-9 8 H4", c, 2.4), s),
    bldg: (w, h, c, s) => at(0, 0, rect(-w / 2, -h, w, h, COL.white, 4, { stroke: c, "stroke-width": 2.5 }) + rect(-w / 2, -h, w, 9, c, 3) +
      Array.from({ length: Math.max(1, Math.floor((h - 26) / 18)) * 2 }, (_, i) => rect(-w / 2 + 9 + (i % 2) * (w / 2 - 4), -h + 17 + Math.floor(i / 2) * 18, w / 2 - 14, 10, COL.mist, 2)).join("") +
      rect(-7, -16, 14, 16, c, 2), s),
    gear: (r, c) => grp({}, Array.from({ length: 8 }, (_, i) => rect(-4, -r - 6, 8, 12, c, 2, { transform: `rotate(${i * 45})` })).join("") +
      circ(0, 0, r, c) + circ(0, 0, r * 0.45, COL.white)),
    check: (c, s) => at(0, 0, circ(0, 0, 15, c) + pth("M-7 0 L-2 6 L8 -6", COL.white, 3.4), s),
    cross: (c, s) => at(0, 0, circ(0, 0, 15, c) + pth("M-6 -6 L6 6 M6 -6 L-6 6", COL.white, 3.4), s),
    q: (c, s) => at(0, 0, circ(0, 0, 15, c) + txOn(0, 7, "?", 21), s),
    warn: (c, s) => at(0, 0, shape("M0 -17 L17 13 H-17Z", c, { "stroke-linejoin": "round" }) + txOn(0, 9, "!", 17), s),
    crown: (c, s) => at(0, 0, shape("M-14 8 L-16 -9 L-7 -1 L0 -13 L7 -1 L16 -9 L14 8Z", c) + rect(-14, 9, 28, 5, c, 2), s),
    clock: (c, s) => at(0, 0, circ(0, 0, 14, COL.white, { stroke: c, "stroke-width": 3 }) + pth("M0 -8 V0 L6 4", c, 3), s),
    coin: (c, s) => at(0, 0, circ(0, 0, 10, c, { stroke: COL.white, "stroke-width": 2 }) + txOn(0, 5, "$", 13), s),
    lock: (c, s) => at(0, 0, pth("M-8 -4 V-11 A8 8 0 0 1 8 -11 V-4", c, 3.4) + rect(-12, -5, 24, 19, c, 4), s),
    key: (c, s) => at(0, 0, circ(-8, 0, 7, "none", { stroke: c, "stroke-width": 3.4 }) + pth("M-1 0 H15 M10 0 V6 M14 0 V5", c, 3.4), s),
    bed: (c, s) => at(0, 0, rect(-20, -2, 40, 10, c, 3) + rect(-20, -12, 12, 10, c, 3) + pth("M-20 8 V14 M20 8 V14", c, 3.4), s),
    star: (c, s) => at(0, 0, shape("M0 -14 L4 -4 L14 -4 L6 3 L9 13 L0 7 L-9 13 L-6 3 L-14 -4 L-4 -4Z", c), s),
    seal: (c, s) => at(0, 0, circ(0, 0, 20, c) + circ(0, 0, 15, "none", { stroke: COL.white, "stroke-width": 1.8, "stroke-dasharray": "3 3" }) + pth("M-7 0 L-2 6 L8 -6", COL.white, 3.4), s),
    lens: (c, s) => at(0, 0, circ(0, 0, 16, "rgba(255,255,255,.35)", { stroke: c, "stroke-width": 4 }) + pth("M11 11 L24 24", c, 6), s),
    folder: (c, s) => at(0, 0, shape("M-26 -16 H-8 L-3 -10 H26 V18 H-26Z", c) + rect(-24, -6, 48, 22, COL.white, 2, { opacity: 0.25 }), s),
    target: (c, s) => at(0, 0, circ(0, 0, 16, COL.white, { stroke: c, "stroke-width": 3 }) + circ(0, 0, 9, "none", { stroke: c, "stroke-width": 3 }) + circ(0, 0, 3.5, c), s),
    rocket: (c, s) => at(0, 0, shape("M0 -26 Q11 -14 9 10 H-9 Q-11 -14 0 -26Z", COL.white, { stroke: c, "stroke-width": 2.6 }) +
      circ(0, -8, 4, c) + shape("M-9 2 L-17 14 L-9 11Z M9 2 L17 14 L9 11Z", COL.orange), s)
  };

  // ---------- motion core ----------
  const reduced = () => { try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; } };
  const G = () => (window.gsap && typeof window.gsap.to === "function" && typeof window.gsap.set === "function") ? window.gsap : null;
  // p: {x,y,s,sx,sy,r,o,d,og,view,t,dl}
  function anim(el, p, now) {
    if (!el) return;
    const g = G(), x = num(p.x, 0), y = num(p.y, 0), r = num(p.r, 0);
    const sx = num(p.sx, num(p.s, 1)), sy = num(p.sy, num(p.s, 1));
    if (g) {
      const v = { x, y, rotation: r, scaleX: sx, scaleY: sy };
      if (p.o != null) v.opacity = p.o;
      if (p.d != null) v.strokeDashoffset = p.d;
      if (p.view) v.svgOrigin = `${VB.w / 2} ${VB.h / 2}`; else v.transformOrigin = p.og || "50% 50%";
      try {
        if (now || reduced()) { g.killTweensOf(el); g.set(el, v); }
        else { v.duration = num(p.t, 0.8); v.delay = num(p.dl, 0); v.ease = p.ease || "power3.out"; v.overwrite = "auto"; g.to(el, v); }
        return;
      } catch (e) { /* fall through to CSS */ }
    }
    el.style.transitionDelay = now ? "0s" : `${num(p.dl, 0)}s`;
    if (p.og) el.style.transformOrigin = p.og;
    el.style.transform = `translate(${x}px,${y}px) rotate(${r}deg) scale(${sx},${sy})`;
    if (p.o != null) el.style.opacity = String(p.o);
    if (p.d != null) el.style.strokeDashoffset = String(p.d);
  }
  const HIDE = {
    up: { y: 22, o: 0 }, down: { y: -22, o: 0 }, left: { x: -34, o: 0 }, right: { x: 34, o: 0 },
    pop: { s: 0.35, o: 0 }, fade: { o: 0 }, grow: { sx: 0.02, o: 0, og: "0% 50%" }, rise: { sy: 0.02, o: 0, og: "50% 100%" },
    spin: { r: -120, s: 0.4, o: 0 }, draw: { d: 1, o: 0 }
  };
  function revealState(el, show) {
    const how = el.getAttribute("data-in") || "up";
    const h = HIDE[how] || HIDE.up;
    if (show) return how === "draw" ? { d: 0, o: 1 } : { o: 1, og: h.og };
    return Object.assign({}, h);
  }
  const TR = {
    slide: [{ x: -70, o: 0 }, { x: 70, o: 0 }], zoom: [{ s: 1.35, o: 0 }, { s: 0.72, o: 0 }],
    rise: [{ y: -50, o: 0 }, { y: 50, o: 0 }], iris: [{ s: 0.6, r: -6, o: 0 }, { s: 1.25, r: 6, o: 0 }]
  };
  const TRN = ["slide", "zoom", "rise", "iris"];

  function makeAPI(g, now, fresh) {
    const q = s => g.querySelector(s), qa = s => Array.prototype.slice.call(g.querySelectorAll(s));
    return {
      q, qa, fresh, now,
      anim: (t, p) => (typeof t === "string" ? qa(t) : [t]).forEach(e => anim(e, p, now)),
      // like anim, but jumps (no glide) when the shot has just entered
      place: (t, p) => (typeof t === "string" ? qa(t) : [t]).forEach(e => anim(e, p, now || fresh)),
      // move token (drawn at 0,0) to fraction f along path (path coords = token parent coords)
      along: (tok, path, f) => {
        const P = typeof path === "string" ? q(path) : path, T = typeof tok === "string" ? q(tok) : tok;
        if (!P || !T || typeof P.getTotalLength !== "function") return;
        let L = 0; try { L = P.getTotalLength(); } catch (e) { L = 0; }
        if (!L) return;
        const pt = P.getPointAtLength(clamp(f, 0, 1) * L);
        anim(T, { x: pt.x, y: pt.y, o: 1 }, now || fresh);
      },
      // fromTo: jump to p0 on entry (fresh shot), then glide to p1
      from: (t, p0, p1) => (typeof t === "string" ? qa(t) : [t]).forEach(e => {
        if (!e) return;
        if (fresh && !now) { anim(e, p0, true); void e.getBoundingClientRect(); }
        anim(e, p1, now);
      }),
      text: (t, v) => { const e = typeof t === "string" ? q(t) : t; if (e) e.textContent = String(v); },
      attr: (t, k, v) => (typeof t === "string" ? qa(t) : [t]).forEach(e => e && e.setAttribute(k, String(v))),
      cls: (t, c, on) => (typeof t === "string" ? qa(t) : [t]).forEach(e => e && e.classList.toggle(c, !!on))
    };
  }

  function buildScene(id, N0, shots) {
    let root = null, svg = null, groups = [], active = -1, lastN = N0;
    const cls = `vls-w06-${id}`;
    function mount(el) {
      installCSS();
      if (!el || typeof el.appendChild !== "function") return false;
      while (el.firstChild) el.removeChild(el.firstChild);
      root = document.createElement("div");
      root.className = cls;
      const dots = shots.map((_, j) => `<i class="w6-dot" data-d="${j}"></i>`).join("");
      const body = shots.map((s, j) => `<g class="w6-shot" data-shot="${j}">${s.svg}</g>`).join("");
      root.innerHTML = `<div class="w6-top"><span class="w6-chip" aria-live="polite"></span><span class="w6-dots" aria-hidden="true">${dots}</span></div>` +
        `<svg xmlns="${NS}" class="w6-svg" viewBox="0 0 ${VB.w} ${VB.h}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(shots[0].tag)}">${body}</svg>`;
      el.appendChild(root);
      svg = root.querySelector("svg");
      groups = Array.prototype.slice.call(root.querySelectorAll(".w6-shot"));
      active = -1;
      return true;
    }
    function starts(n) {
      const st = shots.map(s => Math.round(s.at * n / N0));
      for (let j = 1; j < st.length; j++) if (st[j] <= st[j - 1]) st[j] = st[j - 1] + 1;
      return st;
    }
    function setLevels(g, lvl, now) {
      const items = Array.prototype.slice.call(g.querySelectorAll("[data-lv]"));
      const rank = {};
      items.forEach(e => {
        const L = num(e.getAttribute("data-lv"), 0), O = num(e.getAttribute("data-out"), 1e9);
        const show = L <= lvl && lvl < O;
        const idx = rank[L] = (rank[L] || 0) + 1;
        const p = revealState(e, show);
        if (show) p.dl = Math.min(0.55, (idx - 1) * 0.07);
        anim(e, p, now);
        e.classList.toggle("w6-hot", show && L === lvl && lvl > 0 && !now);
      });
    }
    function render(i, n, inst) {
      if (!root) return;
      const N = Math.max(1, Math.floor(num(n, N0)));
      lastN = N;
      i = clamp(Math.floor(num(i, 0)), 0, N - 1);
      const st = starts(N);
      let a = 0;
      for (let j = 0; j < st.length; j++) if (st[j] <= i) a = j;
      const end = a + 1 < st.length ? Math.min(st[a + 1], N) : N;
      const K = Math.max(1, end - st[a]), k = clamp(i - st[a], 0, K - 1);
      const fresh = a !== active;
      groups.forEach((g, j) => {
        const s = shots[j], kind = s.tr || TRN[j % TRN.length];
        if (j === a) {
          if (fresh && !inst) {
            // enter: start from the "future" pose, hide its items, then play in
            g.classList.add("w6-inst");
            anim(g, Object.assign({ view: true }, TR[kind][j > active ? 1 : 0]), true);
            setLevels(g, -1, true);
            void g.getBoundingClientRect();
            g.classList.remove("w6-inst");
          }
          anim(g, { view: true, o: 1, t: 0.9 }, inst);
          g.removeAttribute("aria-hidden");
          const L = num(s.L, 0);
          const lvl = K <= 1 ? L : Math.round(k * L / (K - 1));
          setLevels(g, lvl, inst);
          if (typeof s.tick === "function") {
            try { s.tick(makeAPI(g, inst || reduced(), fresh), k, K, lvl); } catch (e) { /* never break playback */ }
          }
        } else {
          anim(g, Object.assign({ view: true }, TR[kind][j < a ? 0 : 1]), inst || !fresh);
          g.setAttribute("aria-hidden", "true");
        }
        g.classList.toggle("w6-on", j === a);
      });
      active = a;
      const chip = root.querySelector(".w6-chip");
      if (chip && chip.textContent !== shots[a].tag) chip.textContent = shots[a].tag;
      if (svg) svg.setAttribute("aria-label", shots[a].tag);
      Array.prototype.slice.call(root.querySelectorAll(".w6-dot")).forEach((d, j) => {
        d.classList.toggle("on", j === a); d.classList.toggle("done", j < a);
      });
    }
    function instant(fn) {
      root.classList.add("w6-inst");
      fn();
      void root.getBoundingClientRect();
      if (!reduced()) root.classList.remove("w6-inst");
    }
    return {
      build(el) {
        if (!mount(el)) return;
        instant(() => render(0, N0, true));
      },
      step(i, n) { if (root) render(i, n, false); },
      reset() {
        if (!root) return;
        const g = G();
        if (g) { try { g.killTweensOf(root.querySelectorAll("*")); } catch (e) { /* ignore */ } }
        active = -1;
        instant(() => render(0, lastN, true));
      }
    };
  }

  // ---------- one stylesheet <style id="vl-sc-w06">, each part appends its own scoped block ----------
  const SC = `:is(${IDS.map(s => `.vls-w06-${s}`).join(",")})`;
  const CSS = `
${SC}{position:relative;display:flex;flex-direction:column;width:100%;height:100%;min-height:210px;box-sizing:border-box;overflow:hidden;container-type:inline-size;isolation:isolate;color:#1b2a3a;font-family:inherit;background:radial-gradient(120% 95% at 28% 18%,#ffffff 0%,#f4f7fb 55%,#e6eef6 100%)}
${SC} *{box-sizing:border-box}
${SC} .w6-top{flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 12px 0}
${SC} .w6-chip{display:inline-block;max-width:72%;padding:5px 13px;border-radius:999px;background:#1f4e79;color:#fff;font-weight:800;font-size:clamp(13px,3.3cqw,18px);line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-shadow:0 2px 6px rgba(31,78,121,.25)}
${SC} .w6-dots{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:5px;max-width:40%}
${SC} .w6-dot{display:block;width:9px;height:9px;border-radius:50%;background:#c9d6e2;transition:background .4s ease,transform .4s ease}
${SC} .w6-dot.done{background:#86a8c7}
${SC} .w6-dot.on{background:#c0502a;transform:scale(1.35)}
${SC} .w6-svg{flex:1 1 auto;display:block;width:100%;height:100%;min-height:0;overflow:hidden}
${SC} .w6-svg text{font-family:inherit;user-select:none;pointer-events:none}
${SC} .w6-svg *{transition:transform .8s cubic-bezier(.2,.8,.2,1),opacity .6s ease,stroke-dashoffset 1s ease,fill .5s ease,stroke .5s ease}
${SC} [data-lv],${SC} .w6-m{transform-box:fill-box;transform-origin:50% 50%}
${SC} .w6-shot{transform-box:view-box;transform-origin:200px 150px;opacity:0;pointer-events:none}
${SC} .w6-shot.w6-on{pointer-events:auto}
${SC} .w6-hot{animation:w6glow 1.7s ease-in-out 2}
${SC} .w6-spin{animation:w6spin 14s linear infinite;transform-box:fill-box;transform-origin:50% 50%}
${SC} .w6-ants{stroke-dasharray:7 9;animation:w6ants 1.1s linear infinite}
${SC} .w6-blink{animation:w6blink 1.5s ease-in-out infinite}
${SC}.w6-inst *,${SC} .w6-inst,${SC} .w6-inst *{transition:none!important}
@keyframes w6glow{50%{filter:drop-shadow(0 0 7px rgba(192,80,42,.85))}}
@keyframes w6spin{to{transform:rotate(360deg)}}
@keyframes w6ants{to{stroke-dashoffset:-32}}
@keyframes w6blink{50%{opacity:.35}}
@media (max-width:420px){${SC} .w6-top{padding:6px 8px 0}${SC} .w6-dot{width:7px;height:7px}}
@media (prefers-reduced-motion:reduce){${SC} *,${SC} *::before,${SC} *::after{transition:none!important;animation:none!important}}
`;
  function installCSS() {
    if (typeof document === "undefined") return;
    let st = document.getElementById("vl-sc-w06");
    if (!st) {
      st = document.createElement("style");
      st.id = "vl-sc-w06";
      (document.head || document.documentElement).appendChild(st);
    }
    const mark = `/* w06-claude-part${PART} */`;
    if (st.textContent.indexOf(mark) < 0) st.appendChild(document.createTextNode(mark + CSS));
  }

  // ==================================================================
  // W6O2b · Process ownership — a title or real authority? (12 visuals)
  // ==================================================================
  REG.W6O2b = buildScene("W6O2b", 32, [
    // V1 · Adapts "Motion Graphics: Design Thinking Process" (Behance) — scene-state storyboard
    // https://www.behance.net/gallery/108659899/Motion-Graphics-Design-Thinking-Process
    (() => {
      const deps = [["Revenue", COL.sky], ["House-|keeping", COL.teal], ["Reception", COL.plum]];
      const s =
        deps.map(([nm, c], j) => rv(0, "rise", rect(30 + j * 118, 80, 100, 196, COL.fog, 12, { stroke: c, "stroke-width": 2.5 }) +
          at(80 + j * 118, 130, I.person(c, 1.1)) + tx(80 + j * 118, 176, nm, 14, c))).join("") +
        draw(0, "M14 232 H372", COL.orange, 10) + rv(0, "pop", shape("M370 216 L394 232 L370 248Z", COL.orange)) +
        rv(1, "pop", at(200, 44, I.q(COL.red, 1.3))) + rv(1, "pop", pill(300, 44, "Owner?", COL.red));
      return { at: 0, tag: "Who owns the whole?", L: 1, svg: s };
    })(),
    // V2 · Adapts "Supply Chain Animation" (Behance) — object-to-object handoff between actors
    // https://www.behance.net/gallery/121206799/Supply-Chain-Animation
    (() => {
      const lanes = [["Revenue", COL.sky], ["Housekeeping", COL.teal], ["Reception", COL.plum]];
      const s =
        lanes.map(([nm, c], j) => rect(14, 30 + j * 84, 372, 76, j % 2 ? COL.white : COL.fog, 10, { stroke: c, "stroke-width": 2 }) +
          tx(24, 56 + j * 84, nm, 14, c, { "text-anchor": "start" })).join("") +
        pth("M90 80 H170 V164 H250 V248 H350", COL.line, 5, { class: "rt", "stroke-dasharray": "8 8" }) +
        grp({ class: "w6-m gt", opacity: 0 }, I.guest(COL.orange, 0.85)) +
        rv(1, "pop", at(284, 206, I.cross(COL.red, 1.1))) +
        rv(2, "pop", pill(140, 116, "Done \u2713", COL.teal, { size: 14 })) + rv(2, "pop", pill(334, 262, "Done \u2713", COL.plum, { size: 14 })) +
        rv(2, "pop", at(300, 140, I.clock(COL.red, 1)));
      return {
        at: 2, tag: "The handoff breaks", L: 2, svg: s,
        tick(api, k) { api.along(".gt", ".rt", [0.35, 0.6, 0.6][clamp(k, 0, 2)]); }
      };
    })(),
    // V3 · Adapts "Data Workflow Animation" (Dribbble) — activate nodes, then trace along connectors
    // https://dribbble.com/shots/27247003-Data-Workflow-Animation
    (() => {
      const nd = ["Arrival|trigger", "Booking|verified", "Room|confirmed", "Guest|settled"];
      const s =
        draw(0, "M60 176 H340", COL.line, 6) +
        nd.map((nm, j) => rv(0, "pop", circ(60 + j * 93, 176, 20, j === 0 || j === 3 ? COL.navy : COL.teal) + tx(60 + j * 93, 230, nm, 14, COL.ink))).join("") +
        grp({ class: "w6-m pk", opacity: 0 }, circ(0, 0, 8, COL.orange, { stroke: COL.white, "stroke-width": 3 })) +
        pth("M60 176 H340", "none", 1, { class: "ln" }) +
        rv(1, "down", at(200, 66, I.person(COL.green, 1.2)) + at(200, 32, I.crown(COL.gold, 0.8)) + tx(270, 70, "Owner", 16, COL.green)) +
        draw(1, "M44 128 V114 H356 V128", COL.green, 4) +
        rv(2, "pop", at(60, 142, I.star(COL.green, 0.8)) + at(340, 142, I.check(COL.green, 0.8))) +
        rv(3, "pop", rect(262, 162, 62, 28, "none", 8, { stroke: COL.orange, "stroke-width": 4 }) + pill(170, 274, "Reception: one part", COL.orange, { size: 14 }));
      return {
        at: 5, tag: "One end-to-end owner", L: 3, svg: s,
        tick(api, k) { api.along(".pk", ".ln", [0.05, 0.4, 0.75, 1][clamp(k, 0, 3)]); }
      };
    })(),
    // V4 · Adapts "SaaS Dashboard Workflow UI Motion Concept" (Dribbble) — reveal cards, highlight the KPI
    // https://dribbble.com/shots/27719715-SaaS-Dashboard-Workflow-UI-Motion-Concept
    (() => {
      const d = ["Revenue", "Housekeeping", "Reception"];
      const s =
        d.map((nm, j) => tx(20, 58 + j * 56, nm, 14, COL.ink, { "text-anchor": "start" }) + rect(20, 66 + j * 56, 200, 18, COL.mist, 9) +
          grp({ class: "w6-m db" }, rect(20, 66 + j * 56, 200, 18, COL.green, 9)) + rv(0, "pop", at(240, 75 + j * 56, I.check(COL.green, 0.7)))).join("") +
        rv(1, "right", circ(320, 116, 58, "none", { stroke: COL.mist, "stroke-width": 16 }) +
          grp({ class: "w6-m ring" }, circ(320, 116, 58, "none", { stroke: COL.red, "stroke-width": 16, pathLength: 100, "stroke-dasharray": "62 100", transform: "rotate(-90 320 116)" })) +
          tx(320, 124, "62%", 24, COL.red) + tx(320, 196, "End-to-end", 15, COL.red)) +
        rv(2, "up", pill(200, 262, "Great parts, poor whole", COL.red));
      return {
        at: 9, tag: "Parts vs the whole", L: 2, svg: s,
        tick(api, k) { api.from(".db", { sx: 0.05, og: "0% 50%" }, { sx: 1, og: "0% 50%", t: 1.2 }); void k; }
      };
    })(),
    // V5 · Adapts "Infographics motion design" (Behance) — components revealed by storyboard beat
    // https://www.behance.net/gallery/210506051/Infographics-motion-design
    (() => {
      const s =
        at(200, 120, I.person(COL.green, 1.8)) + at(200, 66, I.crown(COL.gold, 1)) + tx(200, 170, "Process owner", 16, COL.green) +
        rv(0, "left", rect(14, 196, 176, 80, COL.white, 12, { stroke: COL.navy, "stroke-width": 2.5 }) +
          [0, 1, 2, 3].map(j => rect(26 + j * 14, 246 - j * 10, 10, 20 + j * 10, COL.navy, 2)).join("") + tx(134, 236, "Reports|the measure", 14, COL.navy)) +
        rv(1, "right", rect(210, 196, 176, 80, COL.white, 12, { stroke: COL.red, "stroke-width": 2.5 }) +
          rect(226, 216, 52, 40, COL.red, 6) + txOn(252, 241, "VETO", 13) + tx(334, 236, "Can veto|spending", 14, COL.red)) +
        draw(0, "M176 180 L110 196", COL.navy, 3) + draw(1, "M224 180 L290 196", COL.red, 3);
      return { at: 12, tag: "Authority means levers", L: 1, svg: s };
    })(),
    // V6 · Adapts "Action Security Systems — Infographic & Motion Design" (Behance) — risks, then controls
    // https://www.behance.net/gallery/104646575/Action-Security-Systems-Infographic-Motion-Design
    (() => {
      const s =
        at(200, 76, I.person(COL.orange, 1.4)) + rect(150, 104, 100, 26, COL.gold, 6) + txOn(200, 122, "Owner", 14) +
        ["Revenue", "House-|keeping", "Reception"].map((nm, j) => card(24 + j * 128, 180, 96, 52, nm, { col: COL.navy, size: 14 })).join("") +
        [0, 1, 2].map(j => pth(`M200 132 L${72 + j * 128} 180`, COL.grey, 2.5, { "stroke-dasharray": "4 6" })).join("") +
        [0, 1, 2].map(j => rv(0, "pop", at((200 + 72 + j * 128) / 2, 156, I.cross(COL.red, 0.6)))).join("") +
        rv(1, "fade", pth("M20 262 L120 250 L150 270 L210 244 L260 268 L380 252", COL.red, 4)) +
        rv(1, "up", pill(200, 280, "Fails first dispute", COL.red, { size: 14 }));
      return { at: 14, tag: "A title without power", L: 1, svg: s };
    })(),
    // V7 · Adapts "Steps Infographic" (Envato) — steps introduced in sequence
    // https://elements.envato.com/steps-infographic-5NHT2YG
    (() => {
      const st = [["Managers|disagree", COL.orange], ["Owner|mediates", COL.teal], ["Forum|decides", COL.navy]];
      const s =
        st.map(([nm, c], j) => rv(0, "rise", rect(20 + j * 124, 210 - j * 70, 116, 60 + j * 70, c, 10, { opacity: 0.92 }) +
          txOn(78 + j * 124, 236 - j * 70, nm, 14))).join("") +
        grp({ class: "w6-m tk" }, I.person(COL.ink, 0.9)) +
        rv(1, "pop", pill(210, 40, "Decided", COL.green, { size: 15 }));
      return {
        at: 16, tag: "An escalation route", L: 1, svg: s,
        tick(api, k) { api.place(".tk", { x: k ? 326 : 78, y: k ? 54 : 194 }); }
      };
    })(),
    // V8 · Adapts "Kurzgesagt — production method" — a layered iconographic metaphor
    // https://kurzgesagt.org/what-we-do
    (() => {
      const sec = [["Revenue", COL.sky, 70], ["Housekeeping", COL.teal, 200], ["Reception", COL.plum, 330]];
      const s =
        at(200, 82, I.person(COL.green, 1.4)) + rect(176, 100, 48, 10, COL.ink, 3) +
        grp({ class: "w6-m bt" }, pth("M214 60 L250 36", COL.ink, 4)) + tx(200, 132, "Owner", 15, COL.green) +
        sec.map(([nm, c, x]) => rv(0, "up", at(x, 214, I.person(c, 1.15)) + [-26, 26].map(dx => at(x + dx, 238, I.person(c, 0.75))).join("") + tx(x, 278, nm, 14, c))).join("") +
        rv(1, "fade", sec.map(([, , x]) => pth(`M200 140 Q${(200 + x) / 2} 160 ${x} 180`, COL.green, 2.5, { "stroke-dasharray": "5 6", class: "w6-ants" })).join("")) +
        rv(2, "pop", pill(330, 40, "Coordinates", COL.green, { size: 14 })) + rv(2, "pop", pill(80, 40, "Managers lead", COL.navy, { size: 14 }));
      return {
        at: 18, tag: "Coordinate, not replace", L: 2, svg: s,
        tick(api, k) { api.anim(".bt", { r: [0, -26, 18][clamp(k, 0, 2)], og: "0% 100%" }); }
      };
    })(),
    // V9 · Adapts "Sankey animation - acyclic graph" (Observable) — particles route through branches
    // https://observablehq.com/@joaormendes/sankey-animation-acyclic-graph
    (() => {
      const src = [["Marina", 60], ["Old Town", 150], ["Desert", 240]];
      const s =
        src.map(([nm, y], j) => pill(60, y, nm, COL.sky, { size: 14 }) + pth(`M108 ${y} C150 ${y} 150 150 196 150`, COL.line, 6, { class: "s" + j })).join("") +
        rv(0, "pop", at(214, 150, I.person(COL.green, 1)) + at(214, 118, I.crown(COL.gold, 0.6))) +
        pth("M232 150 C270 150 270 80 300 80", COL.line, 6, { class: "o0" }) + pth("M232 150 C270 150 270 220 300 220", COL.line, 6, { class: "o1" }) +
        rv(1, "right", card(300, 56, 92, 48, "Common", { col: COL.navy, solid: true, size: 15 })) +
        rv(2, "right", card(300, 196, 92, 48, "Local|variant", { col: COL.orange, size: 14 })) +
        rv(3, "up", pill(214, 280, "Evidence decides", COL.green, { size: 14 })) +
        [0, 1, 2].map(() => grp({ class: "w6-m p", opacity: 0 }, circ(0, 0, 7, COL.orange, { stroke: COL.white, "stroke-width": 2 }))).join("") +
        [0, 1].map(() => grp({ class: "w6-m q", opacity: 0 }, circ(0, 0, 7, COL.navy, { stroke: COL.white, "stroke-width": 2 }))).join("");
      return {
        at: 21, tag: "Common or local?", L: 3, svg: s,
        tick(api, k, K, lv) {
          api.qa(".p").forEach((t, j) => api.along(t, ".s" + j, (0.3 + k * 0.23) % 1));
          api.qa(".q").forEach((t, j) => { if (lv >= j + 1) api.along(t, ".o" + j, (0.3 + k * 0.2) % 1); else api.anim(t, { o: 0 }); });
        }
      };
    })(),
    // V10 · Adapts "Learn D3: Animation" (Observable) — a time series drawn with playback
    // https://observablehq.com/@d3/learn-d3-animation
    (() => {
      const s =
        pth("M50 40 V250 H380", COL.ink, 3) + tx(30, 150, "Trust", 15, COL.ink, { transform: "rotate(-90 30 150)" }) +
        tx(80, 276, "Today", 14, COL.grey) + tx(350, 276, "Next year", 14, COL.grey) +
        draw(0, "M50 70 C150 72 250 74 380 72", COL.green, 5) + rv(0, "left", pill(300, 46, "Owner maintains", COL.green, { size: 14 })) +
        draw(2, "M50 70 C140 90 220 170 380 230", COL.red, 5) + rv(2, "left", pill(300, 200, "Nobody maintains", COL.red, { size: 14 })) +
        ["Tech", "Guests", "Rules"].map((nm, j) => rv(1, "down", rect(100 + j * 90 - 28, 100, 56, 26, COL.gold, 6) + txOn(100 + j * 90, 118, nm, 13) + pth(`M${100 + j * 90} 126 V246`, COL.gold, 2, { "stroke-dasharray": "4 4" }))).join("");
      return { at: 25, tag: "Keep the map current", L: 2, svg: s };
    })(),
    // V11 · Adapts "SVGator — animated UI templates you can customize" — toggles switch on in turn
    // https://www.svgator.com/blog/animated-ui-templates-you-can-customize/
    (() => {
      const ck = ["Authority", "Relationships", "Governance"];
      const s =
        rect(20, 40, 150, 90, COL.white, 12, { stroke: COL.navy, "stroke-width": 2.5 }) + tx(95, 72, "Arrival owner", 15, COL.navy) + rect(40, 92, 110, 14, COL.mist, 7) +
        rv(0, "pop", pill(95, 160, "Name found", COL.grey, { size: 14 })) +
        ck.map((nm, j) => tx(214, 70 + j * 74, nm, 16, COL.ink, { "text-anchor": "start" }) +
          rect(330, 50 + j * 74, 56, 28, COL.mist, 14, { class: "tg" + j }) + grp({ class: "w6-m kn" }, circ(344, 64 + j * 74, 11, COL.grey))).join("") +
        rv(1, "up", pill(95, 250, "Real influence?", COL.green, { size: 14 }));
      return {
        at: 28, tag: "Look beyond the name", L: 1, svg: s,
        tick(api, k) {
          api.qa(".kn").forEach((n, j) => {
            const on = k >= 1 || j === 0;
            api.anim(n, { x: on ? 28 : 0, dl: j * 0.25 });
            api.attr(n.querySelector("circle"), "fill", on ? COL.green : COL.grey);
          });
        }
      };
    })(),
    // V12 · Adapts "Workflow AI Animation" (Dribbble) — input traced through processing stages
    // https://dribbble.com/shots/26275497-Workflow-AI-Animation
    (() => {
      const s =
        [0, 1, 2, 3].map(j => grp({ class: "w6-m md" }, I.doc([COL.orange, COL.navy, COL.plum, COL.teal][j], 1))).join("") +
        rv(0, "pop", rect(170, 70, 60, 160, COL.navy, 12) + txOn(200, 140, "Rules", 15) + txOn(200, 160, "book", 15)) +
        rv(1, "pop", pill(310, 270, "Next: conventions", COL.navy, { size: 14 }));
      const a = [[50, 90, -16], [100, 140, 12], [44, 200, 8], [96, 236, -10]];
      return {
        at: 30, tag: "Next: shared conventions", L: 1, svg: s,
        tick(api, k) {
          api.qa(".md").forEach((d, j) => api.place(d, k ? { x: 310, y: 70 + j * 46, r: 0, dl: j * 0.1 } : { x: a[j][0], y: a[j][1], r: a[j][2] }));
        }
      };
    })()
  ]);

  // ==================================================================
  // W6O2c · Structure first — conventions and authoritative versions (11 visuals)
  // ==================================================================
  REG.W6O2c = buildScene("W6O2c", 29, [
    // V1 · Adapts "Design thinking process" (Behance) — emphasise one stage, then move on
    // https://www.behance.net/gallery/209502471/Design-thinking-process
    (() => {
      const s =
        rect(60, 96, 280, 14, COL.navy, 4) +
        grp({ class: "w6-m roof" }, shape("M40 92 L200 30 L360 92Z", COL.navy) + txOn(200, 80, "Architecture", 17)) +
        [["Levels", COL.teal], ["Owners", COL.teal]].map(([nm, c], j) => rv(0, "rise", rect(76 + j * 104, 112, 60, 140, c, 6) + txOn(106 + j * 104, 190, nm, 14, { transform: `rotate(-90 ${106 + j * 104} 186)` }))).join("") +
        [0, 1].map(j => rv(0, "pop", at(106 + j * 104, 134, I.check(COL.green, 0.7)))).join("") +
        rv(0, "fade", rect(284, 112, 60, 140, "none", 6, { stroke: COL.red, "stroke-width": 3, "stroke-dasharray": "8 6" }) + tx(314, 186, "Rules?", 15, COL.red)) +
        rect(40, 252, 320, 12, COL.ink, 4) +
        rv(2, "up", pill(200, 284, "Becomes a confusing pile", COL.red, { size: 14 }));
      return {
        at: 0, tag: "One foundation missing", L: 2, svg: s,
        tick(api, k, K, lv) { api.anim(".roof", { r: lv >= 1 ? 7 : 0, y: lv >= 1 ? 10 : 0, og: "0% 100%" }); }
      };
    })(),
    // V2 · Adapts "Process Infographics" (Envato) — stage cards and active state
    // https://elements.envato.com/process-infographics-FYE5ZGW
    (() => {
      const s =
        rv(0, "up", rect(14, 40, 118, 170, COL.white, 12, { stroke: COL.orange, "stroke-width": 2.5 }) + tx(73, 64, "Every action", 14, COL.orange) +
          Array.from({ length: 12 }, (_, j) => rect(26 + (j % 3) * 32, 78 + Math.floor(j / 3) * 30, 26, 22, COL.sand, 4, { stroke: COL.orange, "stroke-width": 1.5 })).join("")) +
        rv(0, "up", rect(141, 40, 118, 170, COL.white, 12, { stroke: COL.navy, "stroke-width": 2.5 }) + tx(200, 64, "Stages only", 14, COL.navy) +
          [0, 1, 2].map(j => rect(156, 80 + j * 42, 88, 34, COL.mist, 6, { stroke: COL.navy, "stroke-width": 2 })).join("")) +
        rv(0, "up", rect(268, 40, 118, 170, COL.white, 12, { stroke: COL.plum, "stroke-width": 2.5 }) + tx(327, 64, "Front office", 14, COL.plum) +
          rect(284, 84, 86, 106, COL.plum, 8, { opacity: 0.85 }) + txOn(327, 142, "Dept", 15)) +
        [0, 1, 2].map(j => at(73 + j * 127, 244, I.person([COL.orange, COL.navy, COL.plum][j], 0.9))).join("") +
        rv(1, "pop", pill(200, 282, "Hard to compare", COL.red));
      return { at: 3, tag: "Three analysts, three styles", L: 1, svg: s };
    })(),
    // V3 · Adapts "Creative Design Workflow Animation" (Dribbble) — rough sketch morphs into a polished layout
    // https://dribbble.com/shots/27476599-Creative-Design-Workflow-Animation
    (() => {
      const s =
        rv(0, "down", rect(70, 24, 260, 44, COL.navy, 10) + txOn(200, 52, "Rule: verb + outcome", 16)) +
        rv(1, "left", rect(30, 92, 340, 56, COL.white, 12, { stroke: COL.grey, "stroke-width": 2.5 }) + tx(200, 127, "Reception administration", 18, COL.grey)) +
        rv(1, "pop", pth("M54 120 H346", COL.red, 4)) +
        rv(2, "right", rect(30, 170, 340, 56, COL.green, 12) + txOn(200, 205, "Manage guest arrival", 20)) +
        rv(2, "up", pth("M70 236 H150 M170 236 H330", COL.gold, 4) + tx(110, 262, "verb", 15, COL.gold) + tx(250, 262, "outcome", 15, COL.gold));
      return { at: 5, tag: "Name the work", L: 2, svg: s };
    })(),
    // V4 · Adapts "GSAP Demo Hub" — labelled timeline states
    // https://demos.gsap.com/explore/
    (() => {
      const ev = ["Reservation|made", "Guest|arrives", "Booking|verified", "Guest|settled"];
      const xs = [52, 148, 248, 348];
      const s =
        draw(0, "M30 150 H372", COL.line, 6) +
        ev.map((nm, j) => rv(0, "pop", circ(xs[j], 150, 11, COL.navy)) + tx(xs[j], j % 2 ? 196 : 112, nm, 14, COL.ink)).join("") +
        rv(1, "down", pth("M52 64 V54 H348 V64", COL.green, 5) + pill(200, 40, "Analyst 1", COL.green, { size: 14 })) +
        rv(1, "up", pth("M148 230 V240 H348 V230", COL.orange, 5) + pill(248, 262, "Analyst 2", COL.orange, { size: 14 })) +
        rv(2, "pop", at(34, 222, I.warn(COL.red, 1.1))) + rv(2, "pop", pill(90, 272, "Not equivalent", COL.red, { size: 14 }));
      return { at: 8, tag: "Agree the boundary", L: 2, svg: s };
    })(),
    // V5 · Adapts "Workflow Animation" (Dribbble) — an event transfers stage to stage with a notification
    // https://dribbble.com/shots/3791748-Workflow-Animation
    (() => {
      const cols = [["Revenue", COL.sky], ["Reception", COL.plum], ["House-|keeping", COL.teal]];
      const s =
        cols.map(([nm, c], j) => rect(14 + j * 128, 30, 116, 230, COL.fog, 12, { stroke: c, "stroke-width": 2 }) + tx(72 + j * 128, 58, nm, 14, c)).join("") +
        card(26, 96, 92, 44, "Confirm|booking", { col: COL.sky, size: 13.5 }) +
        card(154, 148, 92, 44, "Check|arrival", { col: COL.plum, size: 13.5 }) +
        card(282, 96, 92, 44, "Room|ready", { col: COL.teal, size: 13.5 }) +
        card(154, 206, 92, 44, "Complete|arrival", { col: COL.plum, size: 13.5 }) +
        pth("M118 118 C140 118 140 170 154 170", COL.line, 4, { class: "h0" }) + pth("M282 118 C262 118 262 170 246 170", COL.line, 4, { class: "h1" }) +
        grp({ class: "w6-m env", opacity: 0 }, rect(-12, -8, 24, 16, COL.gold, 3) + pth("M-12 -8 L0 2 L12 -8", COL.white, 2)) +
        rv(1, "pop", at(270, 206, I.clock(COL.red, 1))) + rv(1, "pop", pill(200, 284, "Delayed handoff", COL.red, { size: 14 }), OUT(2)) +
        rv(2, "pop", pill(200, 284, "Fixed before it spreads", COL.green, { size: 14 }));
      return {
        at: 11, tag: "Handoffs surface", L: 2, svg: s,
        tick(api, k, K, lv) { api.along(".env", lv >= 1 ? ".h1" : ".h0", lv === 1 ? 0.35 : 0.85); }
      };
    })(),
    // V6 · Adapts "Celonis Process Animation update" — cases aggregate and pause at a node
    // https://community.celonis.com/product-updates/what-s-new-in-the-celonis-platform-5560
    (() => {
      const s =
        rv(0, "rise", rect(30, 196, 150, 84, COL.white, 12, { stroke: COL.green, "stroke-width": 3 }) + tx(105, 266, "Real local need", 14, COL.green)) +
        rv(0, "rise", rect(220, 196, 150, 84, COL.white, 12, { stroke: COL.red, "stroke-width": 3 }) + tx(295, 266, "Outdated or|inconsistent", 13.5, COL.red)) +
        shape("M160 40 H240 L220 90 H180Z", COL.navy) + txOn(200, 62, "Versions", 13) +
        [0, 1, 2, 3, 4].map(j => grp({ class: "w6-m vv" }, I.doc(j === 1 || j === 3 ? COL.green : COL.red, 0.9))).join("");
      return {
        at: 14, tag: "Sort the versions", L: 0, svg: s,
        tick(api, k) {
          api.qa(".vv").forEach((d, j) => {
            const good = j === 1 || j === 3, landed = k >= 1 || j < 3;
            const p = landed ? (good ? [80 + (j === 3 ? 50 : 0), 228] : [250 + (j % 3) * 30, 228]) : [200, 112];
            api.place(d, { x: p[0], y: p[1], dl: j * 0.12 });
          });
        }
      };
    })(),
    // V7 · Adapts "Stripe Connect features" — state machine with verification
    // https://stripe.com/ae/connect/features
    (() => {
      const s =
        rv(0, "pop", rect(146, 80, 108, 130, COL.white, 12, { stroke: COL.green, "stroke-width": 3 }) + pth("M164 112 H236 M164 132 H226 M164 152 H236", COL.line, 4) + at(236, 84, I.seal(COL.green, 0.9)) + tx(200, 236, "Approved reference", 15, COL.green)) +
        [0, 1, 2].map(j => rv(1, "fade", at(50, 70 + j * 80, I.bldg(42, 50, COL.grey, 1)) + at(80, 50 + j * 80, I.cross(COL.red, 0.6)))).join("") +
        rv(1, "left", pill(64, 284, "Copy Marina?", COL.red, { size: 14 }), OUT(2)) +
        rv(2, "right", rect(268, 90, 30, 34, COL.orange, 6) + rect(268, 140, 30, 34, COL.orange, 6) + tx(340, 112, "Old Town", 13.5, COL.orange) + tx(340, 162, "Desert", 13.5, COL.orange) + pth("M254 107 H268 M254 157 H268", COL.orange, 3)) +
        rv(3, "up", pill(200, 278, "Consistent, not identical", COL.navy, { size: 14 }));
      return { at: 16, tag: "Authoritative, not copied", L: 3, svg: s };
    })(),
    // V8 · Adapts "Interactive SVG Path & GSAP Animation" (CodePen) — marker follows a traced route
    // https://codepen.io/WebGuyJeff/pen/rNdmqdO
    (() => {
      const s =
        rect(330, 60, 18, 120, COL.ink, 4) +
        pth("M30 120 C120 120 200 120 326 120", COL.grey, 5, { class: "old", "stroke-dasharray": "10 8" }) + tx(140, 104, "Old instruction", 15, COL.grey) +
        draw(0, "M30 120 C110 120 150 230 260 230 C320 230 340 210 372 210", COL.green, 6) + tx(200, 260, "Approved way", 15, COL.green) +
        [0, 1].map(() => grp({ class: "w6-m em", opacity: 0 }, I.person(COL.navy, 0.75))).join("") +
        rv(1, "fade", pth("M80 40 L120 70 L104 86 L150 120", COL.red, 4)) + rv(1, "pop", pill(250, 40, "Map loses trust", COL.red, { size: 14 }));
      return {
        at: 20, tag: "Outdated maps mislead", L: 1, svg: s,
        tick(api, k) { api.qa(".em").forEach((e, j) => api.along(e, ".old", [0.55, 0.92][k ? 1 : 0] - j * 0.25)); }
      };
    })(),
    // V9 · Adapts "Animated Process Infographic with Geometric Circles and Arrows" (Envato) — 4-step cycle
    // https://elements.envato.com/business-strategy-round-infographic-4-steps-templa-ZS2NQ92
    (() => {
      const st = [["Draft", 200, 40], ["Review", 330, 150], ["Approve", 200, 262], ["Maintain", 70, 150]];
      const s =
        draw(0, "M200 62 A90 90 0 1 1 199 62", COL.line, 10) +
        st.map(([nm, x, y], j) => rv(0, "pop", pill(x, y, nm, [COL.sky, COL.gold, COL.green, COL.navy][j], { size: 15 }))).join("") +
        at(200, 152, grp({ class: "w6-m rot" }, circ(0, -90, 12, COL.orange, { stroke: COL.white, "stroke-width": 3 }))) +
        rv(1, "pop", tx(200, 148, "Living", 18, COL.navy) + tx(200, 170, "resource", 18, COL.navy));
      return {
        at: 22, tag: "Maintain, never finish", L: 1, svg: s,
        tick(api, k) { api.from(".rot", { r: 0, og: "50% 50%" }, { r: (k + 1) * 180, og: "50% 50%", t: 1.6, ease: "power1.inOut" }); }
      };
    })(),
    // V10 · Adapts "Factory Manufacturing Animation Pack" (LottieFiles) — items pause at an inspection gate
    // https://lottiefiles.com/marketplace/factory-manufacturing
    (() => {
      const s =
        rect(14, 200, 372, 12, COL.ink, 6) +
        rv(0, "rise", rect(150, 84, 14, 116, COL.navy, 4) + rect(236, 84, 14, 116, COL.navy, 4) + rect(144, 70, 112, 22, COL.navy, 6) + tx(200, 56, "Rules + evidence", 16, COL.navy) +
          grp({ class: "w6-ants" }, pth("M200 96 V196", COL.gold, 3))) +
        [0, 1, 2].map(() => grp({ class: "w6-m dg" }, I.doc(COL.navy, 1))).join("") +
        rv(1, "pop", at(300, 140, I.check(COL.green, 1))) + rv(1, "pop", at(350, 140, I.warn(COL.orange, 1))) +
        rv(2, "up", pill(200, 256, "Defensible decisions", COL.green, { size: 14 }));
      return {
        at: 24, tag: "Evidence before merging", L: 2, svg: s,
        tick(api, k) { api.qa(".dg").forEach((d, j) => api.place(d, { x: [60, 200, 300][clamp(k - j + 1, 0, 2)] + j * 0, y: 176, dl: j * 0.15 })); }
      };
    })(),
    // V11 · Adapts "Awwwards — Mubasic scroll animation" — shapes revealed in stages
    // https://www.awwwards.com/inspiration/scroll-animation
    (() => {
      const s =
        Array.from({ length: 14 }, (_, j) => rv(0, "pop", at(36 + (j % 7) * 55, 104 + Math.floor(j / 7) * 100, I.bldg(36, 48, COL.navy)))).join("") +
        Array.from({ length: 11 }, (_, j) => rv(1, "pop", at(48 + (j % 7) * 55, 52 + Math.floor(j / 7) * 100, I.doc([COL.orange, COL.plum, COL.teal][j % 3], 0.6)))).join("") +
        rv(1, "up", pill(200, 278, "14 hotels, 11 answers", COL.orange));
      return { at: 27, tag: "Next: fourteen hotels", L: 1, svg: s };
    })()
  ]);

  // ==================================================================
  // W6O3a · Which one is the process? — Exhibit 6 (12 visuals)
  // Figures used exactly as in Exhibit 6: 14 properties; 11 models;
  // 2 property-team models (0 disputed, owner named); 9 analyst models
  // (3+4+2, disputed 2+3+1 = 6, no owner); 3 properties with no model;
  // manual last revised four years ago.
  // ==================================================================
  REG.W6O3a = buildScene("W6O3a", 34, [
    // V1 · Adapts "GSAP SVG animation gallery" — stroke draws and objects travel
    // https://gsap.com/svg/
    (() => {
      const f = [["Levels", COL.teal], ["Owners", COL.gold], ["Rules", COL.navy]];
      const s =
        f.map(([nm, c], j) => rv(0, "pop", circ(80 + j * 120, 100, 42, COL.white, { stroke: c, "stroke-width": 4 }) +
          (j === 0 ? pth("M64 82 H96 M64 100 H96 M64 118 H96", c, 4) : j === 1 ? at(200, 104, I.crown(c, 1.3)) : rect(302, 80, 36, 42, c, 4) + pth("M310 92 H330 M310 102 H326", COL.white, 3)) +
          tx(80 + j * 120, 166, nm, 16, c) + at(110 + j * 120, 70, I.check(COL.green, 0.65)))).join("") +
        [0, 1, 2].map(j => grp({ class: "w6-m bx" }, rect(-24, -18, 48, 36, COL.sand, 4, { stroke: COL.orange, "stroke-width": 2.5 }) + pth("M-24 -6 H24", COL.orange, 2))).join("") +
        rv(2, "pop", pill(200, 278, "Collected without them", COL.red, { size: 14 }));
      return {
        at: 0, tag: "Evidence day", L: 2, svg: s,
        tick(api, k, K, lv) { api.qa(".bx").forEach((b, j) => api.place(b, { x: lv >= 2 ? 120 + j * 80 : -60, y: 222 + (j % 2) * 8, r: (j - 1) * 6, dl: j * 0.12 })); }
      };
    })(),
    // V2 · Adapts "Infographic MOGRT templates" (Motion Array) — progress rings and big numbers
    // https://motionarray.com/motion-graphics-templates/infographics/
    (() => {
      const ring = (cx, c, cls) => circ(cx, 130, 74, "none", { stroke: COL.mist, "stroke-width": 16 }) +
        grp({ class: "w6-m " + cls }, circ(cx, 130, 74, "none", { stroke: c, "stroke-width": 16, pathLength: 100, "stroke-dasharray": "100 100", "stroke-dashoffset": 100, transform: `rotate(-90 ${cx} 130)`, class: "arc" }));
      const s =
        ring(108, COL.navy, "r1") + tx(108, 148, "14", 54, COL.navy) + tx(108, 232, "properties", 17, COL.navy) +
        ring(292, COL.orange, "r2") + tx(292, 148, "11", 54, COL.orange) + tx(292, 232, "arrival models", 17, COL.orange) +
        rv(1, "pop", at(200, 130, I.q(COL.red, 1.3))) + rv(1, "up", pill(200, 274, "Trusted?", COL.red));
      return {
        at: 3, tag: "14 properties, 11 models", L: 1, svg: s,
        tick(api) {
          api.from(".r1 .arc", { d: 100 }, { d: 0, t: 1.4 });
          api.from(".r2 .arc", { d: 100 }, { d: 100 - 11 / 14 * 100, t: 1.4 });
        }
      };
    })(),
    // V3 · Adapts "The Pudding — sticky scrollytelling" — a pinned chart updated at each step
    // https://pudding.cool/process/scrollytelling-sticky/
    (() => {
      const rows = [["Marina, Corniche", 2, 2], ["Old Town + 2 Heritage", 3, 3], ["Desert Ridge + 3 Oasis", 4, 4], ["Airport, City", 2, 2], ["Remaining", 3, 0]];
      const s =
        tx(250, 26, "hotels", 13.5, COL.grey) + tx(345, 26, "models", 13.5, COL.grey) +
        rv(1, "fade", rect(8, 34, 384, 34, COL.sand, 8)) +
        rows.map(([nm, p, m], j) => {
          const y = 38 + j * 36;
          return rv(0, "left", tx(14, y + 20, nm, 13.5, j === 4 ? COL.grey : COL.ink, { "text-anchor": "start" }) +
            Array.from({ length: p }, (_, t) => rect(204 + t * 24, y + 4, 20, 20, j === 0 ? COL.orange : COL.navy, 4)).join("") +
            (m ? Array.from({ length: m }, (_, t) => at(312 + t * 22, y + 15, I.doc(j === 0 ? COL.green : COL.navy, 0.45))).join("") : tx(340, y + 20, "none", 13.5, COL.grey)));
        }).join("") +
        rv(1, "pop", pill(84, 236, "Property teams", COL.green, { size: 14 })) +
        rv(2, "pop", pill(274, 236, "0 disputes, owner named", COL.green, { size: 14 })) +
        rv(3, "up", pill(200, 278, "Needs a real mandate", COL.orange, { size: 14 }));
      return { at: 5, tag: "Exhibit 6, group by group", L: 3, svg: s };
    })(),
    // V4 · Adapts "Modern Data Infographics templates" (Motion Array) — reveal axes, fill values, flag the outlier
    // https://motionarray.com/after-effects-templates/infographics/
    (() => {
      const g = [["Old Town|+ Heritage", 3, 2], ["Desert Ridge|+ Oasis", 4, 3], ["Airport|+ City", 2, 1], ["Remaining|3 hotels", 0, 0]];
      const lvOf = [0, 2, 3, 4];
      const s =
        pth("M14 232 H386", COL.ink, 3) +
        g.map(([nm, m, d], j) => {
          const x = 58 + j * 96;
          let st = "";
          for (let b = 0; b < m; b++) st += rect(x - 32, 202 - b * 32, 64, 28, b < d ? COL.red : COL.navy, 6) + (b < d ? txOn(x, 222 - b * 32, "disputed", 12.5) : txOn(x, 222 - b * 32, "model", 13));
          if (!m) st += rect(x - 32, 170, 64, 60, "none", 6, { stroke: COL.grey, "stroke-width": 2.5, "stroke-dasharray": "6 5" }) + tx(x, 205, "none", 14, COL.grey);
          const lbl = tx(x, 254, nm, 13.5, COL.ink);
          const note = m ? tx(x, 196 - m * 32, `${d} of ${m}`, 16, COL.red) + tx(x, 172 - m * 32, "no owner", 13.5, COL.grey) : "";
          return rv(lvOf[j], "rise", st + lbl) + (m ? rv(j === 0 ? 1 : lvOf[j], "pop", note) : "");
        }).join("");
      return { at: 9, tag: "The analyst-drawn models", L: 4, svg: s };
    })(),
    // V5 · Adapts "Sankey animation - graph variant" (Observable) — traverse routes, update counters
    // https://observablehq.com/@oluckyman/sankey-animation-acyclic-graph
    (() => {
      const s =
        rect(14, 50, 120, 50, COL.green, 10) + txOn(74, 72, "Property", 14) + txOn(74, 90, "teams: 2", 14) +
        rect(14, 140, 120, 130, COL.navy, 10) + txOn(74, 180, "Analysts:", 15) + txOn(74, 228, "9", 22) +
        pth("M134 75 C220 75 220 120 266 120", COL.green, 14, { opacity: 0.5, class: "a" }) +
        pth("M134 205 C220 205 220 176 266 176", COL.navy, 46, { opacity: 0.35, class: "b" }) +
        rect(266, 96, 120, 108, COL.orange, 12) + txOn(326, 150, "11", 36) + txOn(326, 180, "models", 15) +
        [0, 1].map(() => grp({ class: "w6-m pa", opacity: 0 }, circ(0, 0, 6, COL.white))).join("") +
        [0, 1, 2, 3, 4].map(() => grp({ class: "w6-m pb", opacity: 0 }, circ(0, 0, 6, COL.white))).join("") +
        rv(0, "down", pill(200, 28, "2 + 9 = 11", COL.ink, { size: 15 }));
      return {
        at: 14, tag: "Where the 11 came from", L: 0, svg: s,
        tick(api, k) {
          api.qa(".pa").forEach((t, j) => api.along(t, ".a", (j * 0.5 + 0.3 + k * 0.2) % 1));
          api.qa(".pb").forEach((t, j) => api.along(t, ".b", (j * 0.2 + 0.1 + k * 0.2) % 1));
        }
      };
    })(),
    // V6 · Adapts "The Pudding — women in parliament" — historical bars, then individual lines traced
    // https://pudding.cool/2018/07/women-in-parliament/
    (() => {
      const s =
        draw(0, "M60 110 H350", COL.ink, 4) +
        [0, 1, 2, 3, 4].map(j => rv(0, "pop", pth(`M${60 + j * 72.5} 100 V120`, COL.ink, 3))).join("") +
        tx(60, 92, "Revised", 15, COL.navy) + tx(350, 92, "Today", 15, COL.orange) +
        rv(0, "fade", rect(110, 130, 190, 34, COL.gold, 17) + txOn(205, 153, "four years old", 16)) +
        at(60, 190, rect(-28, -26, 56, 52, COL.navy, 6) + rect(-22, -20, 44, 40, COL.white, 3) + pth("M-14 -8 H14 M-14 0 H14 M-14 8 H8", COL.navy, 3)) + tx(60, 238, "Manual", 15, COL.navy) +
        Array.from({ length: 9 }, (_, j) => rv(0, "right", at(170 + (j % 5) * 46, 210 + Math.floor(j / 5) * 50, I.doc(COL.navy, 0.75)))).join("") +
        draw(0, "M92 190 H150", COL.navy, 3) + tx(260, 290, "9 analyst models", 15, COL.navy);
      return { at: 15, tag: "A four-year-old manual", L: 0, svg: s };
    })(),
    // V7 · Adapts "Data Analysis Animation" (LottieFiles) — analytics indicator motion
    // https://lottiefiles.com/free-animation/data-analysis-animation-visualize-insights-effectively-JTyygZuvbP
    (() => {
      const s =
        Array.from({ length: 9 }, (_, j) => at(42 + (j % 3) * 56, 66 + Math.floor(j / 3) * 66, grp({ class: "w6-m md" }, I.doc(COL.navy, 1)) +
          (j < 6 ? rv(0, "pop", at(16, -18, I.warn(COL.red, 0.6))) : ""))).join("") +
        tx(98, 270, "6 of 9 disputed", 16, COL.red) +
        rv(1, "pop", circ(300, 120, 62, "none", { stroke: COL.mist, "stroke-width": 22 }) +
          circ(300, 120, 62, "none", { stroke: COL.red, "stroke-width": 22, pathLength: 90, "stroke-dasharray": "60 90", transform: "rotate(-90 300 120)" }) +
          tx(300, 130, "2/3", 28, COL.red)) +
        rv(2, "pop", pill(300, 214, "A warning, not proof", COL.orange, { size: 14 })) +
        rv(3, "pop", pill(300, 256, "Manual \u2260 practice", COL.red, { size: 14 }));
      return {
        at: 16, tag: "Six of nine disputed", L: 3, svg: s,
        tick(api, k) { api.qa(".md").forEach((d, j) => api.anim(d, { r: j < 6 ? Math.sin(k * 2 + j) * 8 : 0 })); }
      };
    })(),
    // V8 · Adapts "Motion Array — animated explainer template roundup" — problem, mechanism, result
    // https://motionarray.com/learn/video-effects/animated-explainer-video-templates/
    (() => {
      const s =
        card(14, 120, 90, 52, "Check|booking", { col: COL.navy, size: 14 }) +
        card(155, 120, 90, 52, "Old|step", { col: COL.grey, size: 14, dash: "7 5" }) +
        card(296, 120, 90, 52, "Issue|key", { col: COL.navy, size: 14 }) +
        pth("M104 146 H155 M245 146 H296", COL.line, 4) +
        rv(0, "down", rect(186, 18, 28, 50, COL.gold, 4) + pth("M200 68 V112", COL.gold, 3) + tx(150, 44, "Redesign", 15, COL.gold)) +
        [0, 1, 2, 3].map(() => grp({ class: "w6-m cn", opacity: 0 }, I.coin(COL.gold, 0.9))).join("") +
        rv(1, "pop", pill(200, 230, "It no longer exists", COL.red, { size: 14 })) +
        rv(1, "pop", pill(200, 272, "Wasted investment", COL.red, { size: 14 }));
      return {
        at: 20, tag: "Redesigning ghosts", L: 1, svg: s,
        tick(api, k) { api.qa(".cn").forEach((c, j) => api.place(c, { x: 186 + j * 10, y: (k ? 186 : 90) + (j % 2) * 10, o: 1, dl: j * 0.1 })); }
      };
    })(),
    // V9 · Adapts "Workflow Dashboard – Interactive Motion Design" (Dribbble) — rows and status cells
    // https://dribbble.com/shots/27538364-Workflow-Dashboard-Interactive-Motion-Design
    (() => {
      const rows = ["Marina", "Old Town", "Oasis 1", "Airport"];
      const s =
        rect(14, 30, 372, 34, COL.navy, 8) + txOn(80, 52, "Model", 14) + txOn(200, 52, "Owner", 14) + txOn(320, 52, "Authoritative?", 14) +
        rows.map((nm, j) => rect(14, 70 + j * 40, 372, 34, j % 2 ? COL.white : COL.fog, 6) + tx(80, 92 + j * 40, nm, 14, COL.ink) +
          tx(200, 92 + j * 40, j ? "\u2014" : "named", 14, j ? COL.grey : COL.green) +
          grp({ class: "w6-blink" }, circ(320, 87 + j * 40, 11, COL.white, { stroke: COL.red, "stroke-width": 2.5 }) + tx(320, 92 + j * 40, "?", 14, COL.red))).join("") +
        rv(1, "up", pill(200, 246, "No field to say", COL.red, { size: 14 })) +
        grp({ class: "w6-m cur" }, shape("M0 0 L0 22 L6 16 L11 26 L15 24 L10 14 L18 14Z", COL.ink, { stroke: COL.white, "stroke-width": 1.5 })) +
        rv(2, "up", pill(200, 280, "Which to redesign?", COL.orange, { size: 14 }));
      return {
        at: 22, tag: "No authoritative field", L: 2, svg: s,
        tick(api, k) { api.place(".cur", { x: 300 + (k % 2) * 30, y: 80 + k * 40 }); }
      };
    })(),
    // V10 · Adapts "Animated Sankey" (Observable) — branches converge, emphasis shifts
    // https://old.observablehq.com/@chekos/animated-sankey
    (() => {
      const s =
        Array.from({ length: 11 }, (_, j) => at(40, 30 + j * 23, rect(-18, -9, 36, 18, j < 2 ? COL.green : ([2, 3, 5, 6, 8, 9].indexOf(j) >= 0 ? COL.red : COL.navy), 3)) +
          pth(`M58 ${30 + j * 23} C150 ${30 + j * 23} 160 150 230 150`, COL.line, 3, { opacity: 0.8 })).join("") +
        rv(0, "pop", rect(230, 110, 110, 80, COL.white, 12, { stroke: COL.navy, "stroke-width": 3 }) + tx(285, 145, "Model 12", 16, COL.navy) +
          [0, 1, 2].map(j => circ(258 + j * 26, 168, 6, COL.red)).join("")) +
        rv(1, "pop", rect(350, 120, 40, 60, COL.orange, 8) + rect(358, 130, 8, 40, COL.white, 2) + rect(374, 130, 8, 40, COL.white, 2)) +
        rv(1, "up", pill(285, 226, "Errors carried in", COL.red, { size: 14 })) +
        rv(2, "up", pill(285, 268, "Differences hidden", COL.orange, { size: 14 }));
      return { at: 25, tag: "A twelfth model?", L: 2, svg: s };
    })(),
    // V11 · Adapts "SAP Signavio Transformation HUB" — owner, gate, audit loop
    // https://www.signavio.com/wiki/
    (() => {
      const g = [["Agree|boundary", COL.sky], ["Verify|practice", COL.teal], ["Resolve|disputes", COL.gold], ["Approve|versions", COL.green]];
      const s =
        pth("M20 150 H380", COL.line, 8, { class: "ln" }) +
        g.map(([nm, c], j) => rv(j === 3 ? 3 : 0, "rise", rect(36 + j * 92, 100, 16, 100, c, 4) + rect(60 + j * 92, 100, 16, 100, c, 4) + rect(30 + j * 92, 92, 52, 12, c, 4) + tx(56 + j * 92, 232, nm, 13.5, c))).join("") +
        rv(1, "pop", at(240, 60, I.lens(COL.teal, 0.9))) +
        rv(2, "pop", at(150, 60, I.person(COL.gold, 0.9))) +
        rv(3, "pop", at(332, 58, I.crown(COL.gold, 0.9))) +
        grp({ class: "w6-m tk", opacity: 0 }, I.doc(COL.navy, 0.8));
      return {
        at: 28, tag: "Verify, then approve", L: 3, svg: s,
        tick(api, k) { api.along(".tk", ".ln", [0.15, 0.42, 0.66, 0.92][clamp(k, 0, 3)]); }
      };
    })(),
    // V12 · Adapts "SVGator full templates" — keyframed states sequenced into a timeline
    // https://www.svgator.com/animation-templates
    (() => {
      const s =
        rect(194, 90, 12, 150, COL.ink, 4) + shape("M170 250 H230 L215 236 H185Z", COL.ink) +
        grp({ class: "w6-m beam" },
          rect(60, 84, 280, 10, COL.ink, 5) + pth("M90 94 V140 M310 94 V140", COL.ink, 2.5) +
          shape("M50 140 H130 L120 160 H60Z", COL.grey) + shape("M270 140 H350 L340 160 H280Z", COL.grey) +
          Array.from({ length: 6 }, (_, j) => at(70 + (j % 3) * 20, 128 - Math.floor(j / 3) * 16, rect(-9, -7, 18, 14, COL.navy, 2))).join("") +
          at(310, 126, I.doc(COL.green, 0.7)) + at(326, 112, I.seal(COL.green, 0.5))) +
        tx(90, 196, "More models", 15, COL.navy) + tx(310, 196, "Verified one", 15, COL.green) +
        rv(1, "up", pill(200, 274, "Structure beats volume", COL.green, { size: 14 })) +
        rv(2, "pop", pill(200, 34, "Next: local differences", COL.navy, { size: 14 }));
      return {
        at: 31, tag: "More models, less clarity", L: 2, svg: s,
        tick(api, k) { api.anim(".beam", { r: [-8, 9, 9][clamp(k, 0, 2)], t: 1.2, ease: "back.out(1.4)" }); }
      };
    })()
  ]);

  // ==================================================================
  // W6O3b · One standard or fourteen variants? (12 visuals)
  // ==================================================================
  REG.W6O3b = buildScene("W6O3b", 31, [
    // V1 · Adapts "Animating SVG with GSAP 3" (CodePen) — staged shape reveal, move and settle
    // https://codepen.io/designcourse/pen/yLOxoyP
    (() => {
      const s =
        grp({ class: "w6-m stp" }, rect(-40, -34, 80, 40, COL.navy, 8) + rect(-12, -64, 24, 32, COL.ink, 6) + txOn(0, -8, "Standard", 13)) +
        [0, 1, 2].map(j => rv(1, "up", rect(30 + j * 120, 150, 100, 80, COL.white, 10, { stroke: COL.navy, "stroke-width": 2.5 }) +
          pth(`M${46 + j * 120} 172 H${114 + j * 120} M${46 + j * 120} 190 H${104 + j * 120} M${46 + j * 120} 208 H${114 + j * 120}`, COL.line, 4))).join("") +
        rv(2, "right", rect(318, 162, 54, 30, COL.orange, 6) + txOn(345, 182, "Variant", 12.5)) +
        rv(3, "pop", pill(200, 270, "Value or habit?", COL.red));
      return {
        at: 0, tag: "Standard or variants?", L: 3, svg: s,
        tick(api, k) { api.place(".stp", { x: 80 + clamp(k, 0, 2) * 120, y: k === 1 ? 140 : 110 }); }
      };
    })(),
    // V2 · Adapts "Product Workflow Animation & UI Motion Design" (Dribbble) — screens transition, active control highlighted
    // https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design
    (() => {
      const panel = (x, nm, lanes) => rect(x, 30, 180, 200, COL.white, 14, { stroke: COL.navy, "stroke-width": 2.5 }) + tx(x + 90, 56, nm, 16, COL.navy) +
        lanes.map((ln, j) => rect(x + 10, 70 + j * 76, 160, 68, j % 2 ? COL.fog : COL.mist, 8) + tx(x + 18, 88 + j * 76, ln, 13.5, COL.grey, { "text-anchor": "start" })).join("");
      const s =
        rv(0, "left", panel(14, "Qasr Marina", ["Revenue office", "Front desk"])) +
        rv(0, "left", card(52, 96, 104, 36, "Rate check", { col: COL.orange, solid: true, size: 14 })) +
        rv(1, "right", panel(206, "Old Town", ["No back office", "Front desk"])) +
        rv(1, "right", card(244, 172, 104, 36, "Rate check", { col: COL.orange, solid: true, size: 14 })) +
        rv(1, "pop", pth("M262 96 L332 126 M332 96 L262 126", COL.red, 3)) +
        rv(2, "up", at(104, 256, I.check(COL.green, 0.9)) + at(296, 256, I.check(COL.green, 0.9)) + pill(200, 256, "Same outcome", COL.green, { size: 14 }));
      return { at: 4, tag: "Marina vs Old Town", L: 2, svg: s };
    })(),
    // V3 · Adapts "Awwwards — scroll animations (Ember House)" — statement first, then supporting proof
    // https://www.awwwards.com/inspiration/scroll-animations
    (() => {
      const s =
        at(90, 220, I.bldg(120, 150, COL.gold)) + tx(90, 244, "Old Town", 15, COL.gold) +
        rv(0, "pop", pill(90, 40, "No back office", COL.orange, { size: 14 })) +
        ["Errors?", "Delays?", "Guests fair?"].map((nm, j) => rv(1, "right", card(200, 50 + j * 64, 180, 48, nm, { col: COL.navy, size: 15 }))).join("") +
        grp({ class: "w6-m ln" }, I.lens(COL.ink, 1.1)) +
        rv(1, "up", pill(290, 270, "Evidence, not custom", COL.green, { size: 14 }));
      return {
        at: 7, tag: "Constraint or habit?", L: 1, svg: s,
        tick(api, k) { api.place(".ln", { x: k ? 360 : 150, y: k ? 140 : 120 }); }
      };
    })(),
    // V4 · Adapts "Celonis process analysis" — observed flow with a deviation overlay
    // https://www.celonis.com/platform/process-analysis
    (() => {
      const s =
        at(350, 48, circ(0, 0, 16, COL.gold) + pth("M0 -26 V-20 M0 20 V26 M-26 0 H-20 M20 0 H26 M-18 -18 L-14 -14 M18 18 L14 14 M-18 18 L-14 14 M18 -18 L14 -14", COL.gold, 3)) +
        tx(270, 54, "Desert Ridge", 16, COL.navy) +
        card(14, 120, 86, 52, "Booking", { col: COL.navy, size: 14 }) +
        rv(0, "pop", rect(116, 120, 86, 52, "none", 10, { stroke: COL.red, "stroke-width": 3, "stroke-dasharray": "8 6" }) + tx(159, 151, "Rate check", 13.5, COL.red)) +
        card(218, 120, 86, 52, "Room", { col: COL.navy, size: 14 }) + card(320, 120, 66, 52, "Key", { col: COL.navy, size: 14 }) +
        pth("M100 146 H116 M202 146 H218 M304 146 H320", COL.line, 4) +
        [0, 1, 2].map(j => at(50 + j * 40, 236, I.guest(COL.orange, 0.7))).join("") + tx(90, 278, "Leisure guests", 14, COL.orange) +
        rv(1, "pop", at(159, 92, I.lens(COL.ink, 0.8))) + rv(1, "pop", pill(290, 218, "Verify the need", COL.navy, { size: 14 })) +
        rv(2, "pop", pill(290, 262, "Outcome still met?", COL.green, { size: 14 }));
      return { at: 9, tag: "The missing step", L: 2, svg: s };
    })(),
    // V5 · Adapts "Outline - Explainer Kit" (Motion Array) — outlined role and action cards
    // https://motionarray.com/after-effects-templates/outline-explainer-kit-36706/
    (() => {
      const s =
        rv(0, "up", rect(14, 40, 116, 170, COL.white, 12, { stroke: COL.sky, "stroke-width": 2.5 }) + tx(72, 66, "Property A", 14, COL.sky) + rect(30, 84, 84, 104, COL.sky, 8)) +
        rv(0, "up", rect(142, 40, 116, 170, COL.white, 12, { stroke: COL.teal, "stroke-width": 2.5 }) + tx(200, 66, "Property B", 14, COL.teal) +
          [0, 1, 2].map(j => rect(158, 82 + j * 38, 84, 30, COL.teal, 6)).join("")) +
        rv(0, "up", rect(270, 40, 116, 170, COL.white, 12, { stroke: COL.plum, "stroke-width": 2.5 }) + tx(328, 66, "Property C", 14, COL.plum) +
          shape("M286 88 H370 V160 H316 L300 176 V160 H286Z", COL.plum, { opacity: 0.85 })) +
        tx(200, 238, "\u201cGuest recognition\u201d", 17, COL.ink) +
        rv(1, "pop", pill(200, 276, "Same work at all?", COL.red, { size: 14 }));
      return { at: 12, tag: "Three descriptions", L: 1, svg: s };
    })(),
    // V6 · Adapts "SVG Timeline + ScrollTrigger + Paths" (CodePen) — successive paths expose nodes
    // https://codepen.io/ruru_wang/pen/VwOPzgy
    (() => {
      const rungs = ["Value chain", "Process", "Sub-process", "Activity"];
      const s =
        rungs.map((nm, j) => rect(14, 30 + j * 58, 200, 46, j % 2 ? COL.fog : COL.white, 8, { stroke: COL.line, "stroke-width": 2 }) + tx(114, 59 + j * 58, nm, 15, COL.navy)).join("") +
        [["A", COL.sky], ["B", COL.teal], ["C", COL.plum]].map(([nm, c]) => grp({ class: "w6-m cd" }, circ(0, 0, 18, c) + txOn(0, 6, nm, 16))).join("") +
        rv(2, "fade", pth("M240 268 H380", COL.orange, 4) + circ(240, 268, 7, COL.orange) + shape("M380 260 L392 268 L380 276Z", COL.orange) + tx(310, 254, "start \u2192 outcome", 14, COL.orange)) +
        rv(1, "pop", pill(310, 40, "Match the level", COL.navy, { size: 14 }));
      return {
        at: 14, tag: "Match the level first", L: 2, svg: s,
        tick(api, k, K, lv) {
          const pos = lv >= 1 ? [[250, 111], [292, 169], [334, 111]] : [[260, 200], [310, 190], [360, 210]];
          api.qa(".cd").forEach((c, j) => api.place(c, { x: pos[j][0], y: pos[j][1], dl: j * 0.1 }));
        }
      };
    })(),
    // V7 · Adapts "GSAP SVG Research" (CodePen) — grow a stem, reveal leaves
    // https://codepen.io/FabioG/post/svg-animation-research-gsap
    (() => {
      const nodes = ["Purpose", "Boundaries", "Owner", "Outcomes"];
      const s =
        draw(0, "M200 284 C196 220 206 150 200 30", COL.green, 10) +
        nodes.map((nm, j) => rv(0, "pop", circ(200, 250 - j * 60, 9, COL.navy) + tx(186, 256 - j * 60, nm, 15, COL.navy, { "text-anchor": "end" }))).join("") +
        rv(1, "spin", shape("M206 200 C240 170 300 170 330 196 C300 222 240 224 206 200Z", COL.green)) + rv(1, "pop", tx(330, 230, "Old Town", 14, COL.green) + tx(330, 248, "registered", 13.5, COL.green)) +
        rv(2, "spin", shape("M206 110 C240 80 300 80 330 106 C300 132 240 134 206 110Z", "none", { stroke: COL.grey, "stroke-width": 3, "stroke-dasharray": "6 5" })) +
        rv(2, "pop", at(268, 106, I.q(COL.grey, 0.75)) + tx(330, 64, "Unregistered", 14, COL.red));
      return { at: 17, tag: "One trunk, known variants", L: 2, svg: s };
    })(),
    // V8 · Adapts "Sankey animation - acyclic graph" (Observable) — one source fans into many routes
    // https://observablehq.com/@joaormendes/sankey-animation-acyclic-graph
    (() => {
      const s =
        rect(14, 126, 70, 48, COL.navy, 10) + txOn(49, 155, "Arrival", 13.5) +
        Array.from({ length: 14 }, (_, j) => {
          const y = 24 + j * 19;
          return draw(0, `M84 150 C200 150 220 ${y} 340 ${y}`, [COL.orange, COL.teal, COL.plum, COL.sky, COL.gold][j % 5], 3) + rv(0, "pop", circ(352, y, 7, [COL.orange, COL.teal, COL.plum, COL.sky, COL.gold][j % 5]));
        }).join("") +
        rv(0, "pop", pill(120, 40, "14 interpretations", COL.red, { size: 14 }));
      return { at: 20, tag: "Uncontrolled drift", L: 0, svg: s };
    })(),
    // V9 · Adapts "Logistic - Warehouse" (LottieFiles) — intake, sorting and dispatch
    // https://lottiefiles.com/free-animation/logistic-warehouse-json-animation-2kz8lGzNGD
    (() => {
      const items = [["Cost only", 0], ["Regulation", 1], ["Scale", 1], ["Building", 1], ["Habit", 0], ["Market", 1]];
      const s =
        shape("M150 30 H250 L228 90 H172Z", COL.navy) + txOn(200, 58, "Differences", 13.5) +
        rv(0, "rise", rect(14, 150, 146, 136, COL.white, 12, { stroke: COL.navy, "stroke-width": 3 }) + tx(87, 176, "Standardise", 16, COL.navy)) +
        rv(0, "rise", rect(170, 150, 216, 136, COL.white, 12, { stroke: COL.orange, "stroke-width": 3 }) + tx(278, 176, "Permit", 16, COL.orange)) +
        items.map(([nm, ok]) => grp({ class: "w6-m it" }, rect(-48, -14, 96, 28, ok ? COL.orange : COL.grey, 8) + txOn(0, 5, nm, 13))).join("");
      return {
        at: 21, tag: "Standardise or permit", L: 0, svg: s,
        tick(api, k) {
          let a = 0, b = 0;
          api.qa(".it").forEach((e, j) => {
            const landed = k >= 1 || j < 3, ok = items[j][1];
            let p;
            if (!landed) p = [200, 70];
            else if (ok) { p = [224 + (b % 2) * 108, 208 + Math.floor(b / 2) * 34]; b++; }
            else { p = [87, 208 + a * 34]; a++; }
            api.place(e, { x: p[0], y: p[1], s: landed ? 1 : 0.3, o: landed ? 1 : 0, dl: j * 0.1 });
          });
        }
      };
    })(),
    // V10 · Adapts "Easing Animations" (Observable) — the same motion replayed with different timing
    // https://observablehq.com/@d3/easing-animations
    (() => {
      const s =
        rect(40, 140, 320, 12, COL.mist, 6) +
        rect(30, 112, 120, 68, COL.white, 10, { stroke: COL.red, "stroke-width": 2.5 }) + tx(90, 140, "Forced", 15, COL.red) + tx(90, 162, "uniformity", 15, COL.red) +
        rect(250, 112, 120, 68, COL.white, 10, { stroke: COL.red, "stroke-width": 2.5 }) + tx(310, 140, "Uncontrolled", 14, COL.red) + tx(310, 162, "variation", 15, COL.red) +
        pth("M200 40 V60", COL.ink, 3) + grp({ class: "w6-m pd" }, pth("M200 60 V190", COL.ink, 3) + circ(200, 200, 16, COL.green)) +
        rv(1, "up", pill(200, 256, "Justified flexibility", COL.green));
      return {
        at: 23, tag: "Neither extreme", L: 1, svg: s,
        tick(api, k) { api.from(".pd", { r: 40, og: "50% 0%" }, { r: k ? 0 : -34, og: "50% 0%", t: 1.4, ease: k ? "elastic.out(1,0.5)" : "power2.inOut" }); }
      };
    })(),
    // V11 · Adapts "Animated Planning Dashboard Workflow" (Dribbble) — a person works while panels update
    // https://dribbble.com/shots/27184988-Animated-Planning-Dashboard-Workflow
    (() => {
      const s =
        at(70, 120, I.person(COL.green, 1.5)) + at(70, 70, I.crown(COL.gold, 0.9)) + rect(30, 142, 100, 10, COL.ink, 3) + tx(70, 176, "Owner", 15, COL.green) +
        [0, 1, 2].map(j => grp({ class: "w6-m tk" }, rect(160, 40 + j * 46, 110, 36, COL.sand, 8, { stroke: COL.orange, "stroke-width": 2 }) + tx(215, 64 + j * 46, "Variant " + (j + 1), 13.5, COL.orange))).join("") +
        rv(1, "right", ["Revenue", "Reception"].map((nm, j) => rect(296, 40 + j * 70, 90, 56, COL.fog, 8, { stroke: COL.navy, "stroke-width": 2 }) + tx(341, 74 + j * 70, nm, 13.5, COL.navy)).join("") + at(280, 80, I.key(COL.gold, 0.9))) +
        rv(2, "up", [0, 1, 2].map(j => at(190 + j * 70, 262, I.bldg(36, 44, COL.grey))).join("") + pill(90, 250, "No owner?", COL.red, { size: 14 }) + tx(260, 290, "each defends its own", 14, COL.red));
      return {
        at: 25, tag: "The owner reviews variants", L: 2, svg: s,
        tick(api, k) { api.qa(".tk").forEach((t, j) => api.anim(t, { x: j === k % 3 ? -10 : 0, s: j === k % 3 ? 1.06 : 1 })); }
      };
    })(),
    // V12 · Adapts "Awwwards — scrolling website gallery" — progressive reveal with scene continuity
    // https://www.awwwards.com/websites/scrolling/
    (() => {
      const variant = [3, 9], drop = [1, 5, 7, 12];
      const s =
        Array.from({ length: 14 }, (_, j) => grp({ class: "w6-m tl" }, rect(30 + (j % 7) * 50, 50 + Math.floor(j / 7) * 90, 40, 64, COL.navy, 8, { class: "tr" }))).join("") +
        variant.map(j => rv(1, "pop", rect(36 + (j % 7) * 50, 94 + Math.floor(j / 7) * 90, 28, 14, COL.orange, 4))).join("") +
        rv(1, "pop", pill(100, 258, "Variant registered", COL.orange, { size: 14 })) +
        rv(2, "pop", pill(300, 258, "Habits removed", COL.navy, { size: 14 }));
      return {
        at: 28, tag: "Make variation visible", L: 2, svg: s,
        tick(api, k, K, lv) {
          api.qa(".tl").forEach((t, j) => {
            const odd = drop.indexOf(j) >= 0;
            api.anim(t, { y: odd && lv < 2 ? -8 : 0, r: odd && lv < 2 ? 8 : 0 });
            api.attr(t.querySelector(".tr"), "fill", odd && lv < 2 ? COL.grey : COL.navy);
          });
        }
      };
    })()
  ]);

  if (typeof document !== "undefined") {
    if (document.head) installCSS();
    else document.addEventListener("DOMContentLoaded", installCSS, { once: true });
  }
})();
// END FILE: w06-claude-part2.js

// FILE: w06-claude-part3.js
// OPER621 · Week 6 · Process Architecture — animated teaching scenes, part 3 of 3
// Sections: W6O3c, W6O3d
// Contract: window.VL_SCENES["<secId>"] = { build(el), step(i, n), reset() }; i = narration moment index.
// Standalone: defines every helper it uses; appends its own scoped rules to <style id="vl-sc-w06">.
// Each section is a reel of distinct visuals; every visual names the benchmark template it adapts.
// Uses window.gsap when present (CSS transitions otherwise); honours prefers-reduced-motion.
(() => {
  "use strict";
  if (typeof window === "undefined") return;
  window.VL_SCENES = window.VL_SCENES || {};
  const REG = window.VL_SCENES;
  const PART = 3;
  const IDS = ["W6O3c", "W6O3d"];
  // ------------------------------------------------------------------
  // SHARED RUNTIME (self-contained in every part; nothing leaks out)
  // A section is a "shot reel": several distinct visual compositions,
  // each owning a slice of the narration moments. Inside a shot, items
  // tagged data-lv="n" are revealed level by level, and an optional
  // tick(api,k,K,lv) adds deterministic motion on EVERY moment.
  // All states are recomputed from (i,n) only, so seeking is safe.
  // ------------------------------------------------------------------
  const NS = "http://www.w3.org/2000/svg";
  const VB = { w: 400, h: 300 };
  const COL = {
    navy: "#1f4e79", ink: "#1b2a3a", orange: "#c0502a", green: "#2f7a5f",
    gold: "#c9962e", sky: "#3f7fb5", teal: "#23807e", plum: "#6a4c93",
    red: "#b8322f", paper: "#fbf8f1", mist: "#e3ecf4", fog: "#f1f5f9",
    line: "#9fb4c7", grey: "#7d8a97", white: "#ffffff", sand: "#f3e6cc"
  };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const num = (v, d) => { if (v === null || v === undefined || v === "") return d; const x = Number(v); return Number.isFinite(x) ? x : d; };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const attrs = o => Object.keys(o || {}).filter(k => o[k] !== null && o[k] !== undefined && o[k] !== false)
    .map(k => ` ${k}="${esc(o[k])}"`).join("");
  const E = (tag, o, inner) => `<${tag}${attrs(o)}>${inner == null ? "" : inner}</${tag}>`;
  const rect = (x, y, w, h, fill, rx, o) => E("rect", Object.assign({ x, y, width: w, height: h, rx: rx || 0, fill }, o));
  const circ = (x, y, r, fill, o) => E("circle", Object.assign({ cx: x, cy: y, r, fill }, o));
  const pth = (d, stroke, w, o) => E("path", Object.assign({ d, fill: "none", stroke, "stroke-width": w || 2, "stroke-linecap": "round", "stroke-linejoin": "round" }, o));
  const shape = (d, fill, o) => E("path", Object.assign({ d, fill }, o));
  const grp = (o, inner) => E("g", o, inner);
  const at = (x, y, inner, s) => E("g", { transform: `translate(${x} ${y})${s ? ` scale(${s})` : ""}` }, inner);
  // Text: bold, halo for legibility; '|' splits into two centred lines.
  const tx = (x, y, s, size, fill, o) => {
    const z = size || 16, parts = String(s).split("|");
    const base = Object.assign({ x, y, "font-size": z, "text-anchor": "middle", "font-weight": 800,
      "paint-order": "stroke", stroke: COL.white, "stroke-width": 3.2, "stroke-linejoin": "round" }, o, { fill: fill || COL.ink });
    if (parts.length === 1) return E("text", base, esc(s));
    const lh = z * 1.12, y0 = y - (lh * (parts.length - 1)) / 2;
    base.y = y0;
    return E("text", base, parts.map((p, i) => E("tspan", { x, dy: i ? lh : 0 }, esc(p))).join(""));
  };
  const txOn = (x, y, s, size, fill, o) => {
    if (fill && typeof fill === "object") { o = fill; fill = null; }
    return tx(x, y, s, size, (o && o.fill) || fill || COL.white, Object.assign({ stroke: "none" }, o, { fill: undefined }));
  };
  // Reveal wrappers. how: up|down|left|right|pop|fade|grow|rise|spin|draw
  const LV = (n, how, o) => Object.assign({ "data-lv": n, "data-in": how || "up" }, o);
  const rv = (n, how, inner, o) => grp(LV(n, how, o), inner);
  const OUT = (n, o) => Object.assign({ "data-out": n }, o);
  const draw = (n, d, stroke, w, o) => pth(d, stroke, w, Object.assign({ pathLength: 1, "stroke-dasharray": "1 1", "stroke-dashoffset": 1 }, LV(n, "draw"), o));
  const tw = (s, z) => String(s).split("|").reduce((m, p) => Math.max(m, p.length), 0) * (z || 16) * 0.6;
  // Labelled card.
  const card = (x, y, w, h, label, o) => {
    o = o || {};
    const c = o.col || COL.navy, solid = !!o.solid, z = o.size || 15;
    const body = rect(x, y, w, h, solid ? c : (o.fill || COL.white), o.rx == null ? 10 : o.rx,
      { stroke: c, "stroke-width": o.sw || 2.5, "stroke-dasharray": o.dash || null }) +
      (o.band ? rect(x, y, 8, h, c, 4) : "") +
      (solid ? txOn(x + w / 2, y + h / 2 + z * 0.36, label, z) : tx(x + w / 2, y + h / 2 + z * 0.36, label, z, o.tcol || COL.ink));
    return o.lv == null ? grp({ class: o.cls || null }, body) : rv(o.lv, o.in || "up", body, { class: o.cls || null });
  };
  const pill = (cx, cy, label, col, o) => {
    o = o || {};
    const z = o.size || 15, w = Math.max(48, tw(label, z) + 26), h = z + 14;
    const body = rect(cx - w / 2, cy - h / 2, w, h, o.hollow ? COL.white : col, h / 2, { stroke: col, "stroke-width": 2.5 }) +
      (o.hollow ? tx(cx, cy + z * 0.36, label, z, col) : txOn(cx, cy + z * 0.36, label, z));
    return o.lv == null ? grp({ class: o.cls || null }, body) : rv(o.lv, o.in || "pop", body, { class: o.cls || null });
  };
  const head = (x, y, ang, col, n, o) => rv(n, "pop", at(x, y, shape("M0 0 L-12 -7 L-9 0 L-12 7Z", col, { transform: `rotate(${ang})` })), o);
  // Icons, all drawn around (0,0).
  const I = {
    person: (c, s) => at(0, 0, circ(0, -17, 8, c) + shape("M-14 13 Q-14 -6 0 -6 Q14 -6 14 13Z", c), s),
    guest: (c, s) => at(0, 0, circ(0, -17, 8, c) + shape("M-14 13 Q-14 -6 0 -6 Q14 -6 14 13Z", c) +
      rect(14, -2, 11, 15, COL.orange, 2) + pth("M17 -2 V-6 H22 V-2", COL.orange, 2), s),
    doc: (c, s) => at(0, 0, shape("M-15 -20 H7 L15 -12 V20 H-15Z", COL.white, { stroke: c, "stroke-width": 2.5, "stroke-linejoin": "round" }) +
      pth("M-9 -8 H9 M-9 0 H9 M-9 8 H4", c, 2.4), s),
    bldg: (w, h, c, s) => at(0, 0, rect(-w / 2, -h, w, h, COL.white, 4, { stroke: c, "stroke-width": 2.5 }) + rect(-w / 2, -h, w, 9, c, 3) +
      Array.from({ length: Math.max(1, Math.floor((h - 26) / 18)) * 2 }, (_, i) => rect(-w / 2 + 9 + (i % 2) * (w / 2 - 4), -h + 17 + Math.floor(i / 2) * 18, w / 2 - 14, 10, COL.mist, 2)).join("") +
      rect(-7, -16, 14, 16, c, 2), s),
    gear: (r, c) => grp({}, Array.from({ length: 8 }, (_, i) => rect(-4, -r - 6, 8, 12, c, 2, { transform: `rotate(${i * 45})` })).join("") +
      circ(0, 0, r, c) + circ(0, 0, r * 0.45, COL.white)),
    check: (c, s) => at(0, 0, circ(0, 0, 15, c) + pth("M-7 0 L-2 6 L8 -6", COL.white, 3.4), s),
    cross: (c, s) => at(0, 0, circ(0, 0, 15, c) + pth("M-6 -6 L6 6 M6 -6 L-6 6", COL.white, 3.4), s),
    q: (c, s) => at(0, 0, circ(0, 0, 15, c) + txOn(0, 7, "?", 21), s),
    warn: (c, s) => at(0, 0, shape("M0 -17 L17 13 H-17Z", c, { "stroke-linejoin": "round" }) + txOn(0, 9, "!", 17), s),
    crown: (c, s) => at(0, 0, shape("M-14 8 L-16 -9 L-7 -1 L0 -13 L7 -1 L16 -9 L14 8Z", c) + rect(-14, 9, 28, 5, c, 2), s),
    clock: (c, s) => at(0, 0, circ(0, 0, 14, COL.white, { stroke: c, "stroke-width": 3 }) + pth("M0 -8 V0 L6 4", c, 3), s),
    coin: (c, s) => at(0, 0, circ(0, 0, 10, c, { stroke: COL.white, "stroke-width": 2 }) + txOn(0, 5, "$", 13), s),
    lock: (c, s) => at(0, 0, pth("M-8 -4 V-11 A8 8 0 0 1 8 -11 V-4", c, 3.4) + rect(-12, -5, 24, 19, c, 4), s),
    key: (c, s) => at(0, 0, circ(-8, 0, 7, "none", { stroke: c, "stroke-width": 3.4 }) + pth("M-1 0 H15 M10 0 V6 M14 0 V5", c, 3.4), s),
    bed: (c, s) => at(0, 0, rect(-20, -2, 40, 10, c, 3) + rect(-20, -12, 12, 10, c, 3) + pth("M-20 8 V14 M20 8 V14", c, 3.4), s),
    star: (c, s) => at(0, 0, shape("M0 -14 L4 -4 L14 -4 L6 3 L9 13 L0 7 L-9 13 L-6 3 L-14 -4 L-4 -4Z", c), s),
    seal: (c, s) => at(0, 0, circ(0, 0, 20, c) + circ(0, 0, 15, "none", { stroke: COL.white, "stroke-width": 1.8, "stroke-dasharray": "3 3" }) + pth("M-7 0 L-2 6 L8 -6", COL.white, 3.4), s),
    lens: (c, s) => at(0, 0, circ(0, 0, 16, "rgba(255,255,255,.35)", { stroke: c, "stroke-width": 4 }) + pth("M11 11 L24 24", c, 6), s),
    folder: (c, s) => at(0, 0, shape("M-26 -16 H-8 L-3 -10 H26 V18 H-26Z", c) + rect(-24, -6, 48, 22, COL.white, 2, { opacity: 0.25 }), s),
    target: (c, s) => at(0, 0, circ(0, 0, 16, COL.white, { stroke: c, "stroke-width": 3 }) + circ(0, 0, 9, "none", { stroke: c, "stroke-width": 3 }) + circ(0, 0, 3.5, c), s),
    rocket: (c, s) => at(0, 0, shape("M0 -26 Q11 -14 9 10 H-9 Q-11 -14 0 -26Z", COL.white, { stroke: c, "stroke-width": 2.6 }) +
      circ(0, -8, 4, c) + shape("M-9 2 L-17 14 L-9 11Z M9 2 L17 14 L9 11Z", COL.orange), s)
  };

  // ---------- motion core ----------
  const reduced = () => { try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; } };
  const G = () => (window.gsap && typeof window.gsap.to === "function" && typeof window.gsap.set === "function") ? window.gsap : null;
  // p: {x,y,s,sx,sy,r,o,d,og,view,t,dl}
  function anim(el, p, now) {
    if (!el) return;
    const g = G(), x = num(p.x, 0), y = num(p.y, 0), r = num(p.r, 0);
    const sx = num(p.sx, num(p.s, 1)), sy = num(p.sy, num(p.s, 1));
    if (g) {
      const v = { x, y, rotation: r, scaleX: sx, scaleY: sy };
      if (p.o != null) v.opacity = p.o;
      if (p.d != null) v.strokeDashoffset = p.d;
      if (p.view) v.svgOrigin = `${VB.w / 2} ${VB.h / 2}`; else v.transformOrigin = p.og || "50% 50%";
      try {
        if (now || reduced()) { g.killTweensOf(el); g.set(el, v); }
        else { v.duration = num(p.t, 0.8); v.delay = num(p.dl, 0); v.ease = p.ease || "power3.out"; v.overwrite = "auto"; g.to(el, v); }
        return;
      } catch (e) { /* fall through to CSS */ }
    }
    el.style.transitionDelay = now ? "0s" : `${num(p.dl, 0)}s`;
    if (p.og) el.style.transformOrigin = p.og;
    el.style.transform = `translate(${x}px,${y}px) rotate(${r}deg) scale(${sx},${sy})`;
    if (p.o != null) el.style.opacity = String(p.o);
    if (p.d != null) el.style.strokeDashoffset = String(p.d);
  }
  const HIDE = {
    up: { y: 22, o: 0 }, down: { y: -22, o: 0 }, left: { x: -34, o: 0 }, right: { x: 34, o: 0 },
    pop: { s: 0.35, o: 0 }, fade: { o: 0 }, grow: { sx: 0.02, o: 0, og: "0% 50%" }, rise: { sy: 0.02, o: 0, og: "50% 100%" },
    spin: { r: -120, s: 0.4, o: 0 }, draw: { d: 1, o: 0 }
  };
  function revealState(el, show) {
    const how = el.getAttribute("data-in") || "up";
    const h = HIDE[how] || HIDE.up;
    if (show) return how === "draw" ? { d: 0, o: 1 } : { o: 1, og: h.og };
    return Object.assign({}, h);
  }
  const TR = {
    slide: [{ x: -70, o: 0 }, { x: 70, o: 0 }], zoom: [{ s: 1.35, o: 0 }, { s: 0.72, o: 0 }],
    rise: [{ y: -50, o: 0 }, { y: 50, o: 0 }], iris: [{ s: 0.6, r: -6, o: 0 }, { s: 1.25, r: 6, o: 0 }]
  };
  const TRN = ["slide", "zoom", "rise", "iris"];

  function makeAPI(g, now, fresh) {
    const q = s => g.querySelector(s), qa = s => Array.prototype.slice.call(g.querySelectorAll(s));
    return {
      q, qa, fresh, now,
      anim: (t, p) => (typeof t === "string" ? qa(t) : [t]).forEach(e => anim(e, p, now)),
      // like anim, but jumps (no glide) when the shot has just entered
      place: (t, p) => (typeof t === "string" ? qa(t) : [t]).forEach(e => anim(e, p, now || fresh)),
      // move token (drawn at 0,0) to fraction f along path (path coords = token parent coords)
      along: (tok, path, f) => {
        const P = typeof path === "string" ? q(path) : path, T = typeof tok === "string" ? q(tok) : tok;
        if (!P || !T || typeof P.getTotalLength !== "function") return;
        let L = 0; try { L = P.getTotalLength(); } catch (e) { L = 0; }
        if (!L) return;
        const pt = P.getPointAtLength(clamp(f, 0, 1) * L);
        anim(T, { x: pt.x, y: pt.y, o: 1 }, now || fresh);
      },
      // fromTo: jump to p0 on entry (fresh shot), then glide to p1
      from: (t, p0, p1) => (typeof t === "string" ? qa(t) : [t]).forEach(e => {
        if (!e) return;
        if (fresh && !now) { anim(e, p0, true); void e.getBoundingClientRect(); }
        anim(e, p1, now);
      }),
      text: (t, v) => { const e = typeof t === "string" ? q(t) : t; if (e) e.textContent = String(v); },
      attr: (t, k, v) => (typeof t === "string" ? qa(t) : [t]).forEach(e => e && e.setAttribute(k, String(v))),
      cls: (t, c, on) => (typeof t === "string" ? qa(t) : [t]).forEach(e => e && e.classList.toggle(c, !!on))
    };
  }

  function buildScene(id, N0, shots) {
    let root = null, svg = null, groups = [], active = -1, lastN = N0;
    const cls = `vls-w06-${id}`;
    function mount(el) {
      installCSS();
      if (!el || typeof el.appendChild !== "function") return false;
      while (el.firstChild) el.removeChild(el.firstChild);
      root = document.createElement("div");
      root.className = cls;
      const dots = shots.map((_, j) => `<i class="w6-dot" data-d="${j}"></i>`).join("");
      const body = shots.map((s, j) => `<g class="w6-shot" data-shot="${j}">${s.svg}</g>`).join("");
      root.innerHTML = `<div class="w6-top"><span class="w6-chip" aria-live="polite"></span><span class="w6-dots" aria-hidden="true">${dots}</span></div>` +
        `<svg xmlns="${NS}" class="w6-svg" viewBox="0 0 ${VB.w} ${VB.h}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(shots[0].tag)}">${body}</svg>`;
      el.appendChild(root);
      svg = root.querySelector("svg");
      groups = Array.prototype.slice.call(root.querySelectorAll(".w6-shot"));
      active = -1;
      return true;
    }
    function starts(n) {
      const st = shots.map(s => Math.round(s.at * n / N0));
      for (let j = 1; j < st.length; j++) if (st[j] <= st[j - 1]) st[j] = st[j - 1] + 1;
      return st;
    }
    function setLevels(g, lvl, now) {
      const items = Array.prototype.slice.call(g.querySelectorAll("[data-lv]"));
      const rank = {};
      items.forEach(e => {
        const L = num(e.getAttribute("data-lv"), 0), O = num(e.getAttribute("data-out"), 1e9);
        const show = L <= lvl && lvl < O;
        const idx = rank[L] = (rank[L] || 0) + 1;
        const p = revealState(e, show);
        if (show) p.dl = Math.min(0.55, (idx - 1) * 0.07);
        anim(e, p, now);
        e.classList.toggle("w6-hot", show && L === lvl && lvl > 0 && !now);
      });
    }
    function render(i, n, inst) {
      if (!root) return;
      const N = Math.max(1, Math.floor(num(n, N0)));
      lastN = N;
      i = clamp(Math.floor(num(i, 0)), 0, N - 1);
      const st = starts(N);
      let a = 0;
      for (let j = 0; j < st.length; j++) if (st[j] <= i) a = j;
      const end = a + 1 < st.length ? Math.min(st[a + 1], N) : N;
      const K = Math.max(1, end - st[a]), k = clamp(i - st[a], 0, K - 1);
      const fresh = a !== active;
      groups.forEach((g, j) => {
        const s = shots[j], kind = s.tr || TRN[j % TRN.length];
        if (j === a) {
          if (fresh && !inst) {
            // enter: start from the "future" pose, hide its items, then play in
            g.classList.add("w6-inst");
            anim(g, Object.assign({ view: true }, TR[kind][j > active ? 1 : 0]), true);
            setLevels(g, -1, true);
            void g.getBoundingClientRect();
            g.classList.remove("w6-inst");
          }
          anim(g, { view: true, o: 1, t: 0.9 }, inst);
          g.removeAttribute("aria-hidden");
          const L = num(s.L, 0);
          const lvl = K <= 1 ? L : Math.round(k * L / (K - 1));
          setLevels(g, lvl, inst);
          if (typeof s.tick === "function") {
            try { s.tick(makeAPI(g, inst || reduced(), fresh), k, K, lvl); } catch (e) { /* never break playback */ }
          }
        } else {
          anim(g, Object.assign({ view: true }, TR[kind][j < a ? 0 : 1]), inst || !fresh);
          g.setAttribute("aria-hidden", "true");
        }
        g.classList.toggle("w6-on", j === a);
      });
      active = a;
      const chip = root.querySelector(".w6-chip");
      if (chip && chip.textContent !== shots[a].tag) chip.textContent = shots[a].tag;
      if (svg) svg.setAttribute("aria-label", shots[a].tag);
      Array.prototype.slice.call(root.querySelectorAll(".w6-dot")).forEach((d, j) => {
        d.classList.toggle("on", j === a); d.classList.toggle("done", j < a);
      });
    }
    function instant(fn) {
      root.classList.add("w6-inst");
      fn();
      void root.getBoundingClientRect();
      if (!reduced()) root.classList.remove("w6-inst");
    }
    return {
      build(el) {
        if (!mount(el)) return;
        instant(() => render(0, N0, true));
      },
      step(i, n) { if (root) render(i, n, false); },
      reset() {
        if (!root) return;
        const g = G();
        if (g) { try { g.killTweensOf(root.querySelectorAll("*")); } catch (e) { /* ignore */ } }
        active = -1;
        instant(() => render(0, lastN, true));
      }
    };
  }

  // ---------- one stylesheet <style id="vl-sc-w06">, each part appends its own scoped block ----------
  const SC = `:is(${IDS.map(s => `.vls-w06-${s}`).join(",")})`;
  const CSS = `
${SC}{position:relative;display:flex;flex-direction:column;width:100%;height:100%;min-height:210px;box-sizing:border-box;overflow:hidden;container-type:inline-size;isolation:isolate;color:#1b2a3a;font-family:inherit;background:radial-gradient(120% 95% at 28% 18%,#ffffff 0%,#f4f7fb 55%,#e6eef6 100%)}
${SC} *{box-sizing:border-box}
${SC} .w6-top{flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 12px 0}
${SC} .w6-chip{display:inline-block;max-width:72%;padding:5px 13px;border-radius:999px;background:#1f4e79;color:#fff;font-weight:800;font-size:clamp(13px,3.3cqw,18px);line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-shadow:0 2px 6px rgba(31,78,121,.25)}
${SC} .w6-dots{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:5px;max-width:40%}
${SC} .w6-dot{display:block;width:9px;height:9px;border-radius:50%;background:#c9d6e2;transition:background .4s ease,transform .4s ease}
${SC} .w6-dot.done{background:#86a8c7}
${SC} .w6-dot.on{background:#c0502a;transform:scale(1.35)}
${SC} .w6-svg{flex:1 1 auto;display:block;width:100%;height:100%;min-height:0;overflow:hidden}
${SC} .w6-svg text{font-family:inherit;user-select:none;pointer-events:none}
${SC} .w6-svg *{transition:transform .8s cubic-bezier(.2,.8,.2,1),opacity .6s ease,stroke-dashoffset 1s ease,fill .5s ease,stroke .5s ease}
${SC} [data-lv],${SC} .w6-m{transform-box:fill-box;transform-origin:50% 50%}
${SC} .w6-shot{transform-box:view-box;transform-origin:200px 150px;opacity:0;pointer-events:none}
${SC} .w6-shot.w6-on{pointer-events:auto}
${SC} .w6-hot{animation:w6glow 1.7s ease-in-out 2}
${SC} .w6-spin{animation:w6spin 14s linear infinite;transform-box:fill-box;transform-origin:50% 50%}
${SC} .w6-ants{stroke-dasharray:7 9;animation:w6ants 1.1s linear infinite}
${SC} .w6-blink{animation:w6blink 1.5s ease-in-out infinite}
${SC}.w6-inst *,${SC} .w6-inst,${SC} .w6-inst *{transition:none!important}
@keyframes w6glow{50%{filter:drop-shadow(0 0 7px rgba(192,80,42,.85))}}
@keyframes w6spin{to{transform:rotate(360deg)}}
@keyframes w6ants{to{stroke-dashoffset:-32}}
@keyframes w6blink{50%{opacity:.35}}
@media (max-width:420px){${SC} .w6-top{padding:6px 8px 0}${SC} .w6-dot{width:7px;height:7px}}
@media (prefers-reduced-motion:reduce){${SC} *,${SC} *::before,${SC} *::after{transition:none!important;animation:none!important}}
`;
  function installCSS() {
    if (typeof document === "undefined") return;
    let st = document.getElementById("vl-sc-w06");
    if (!st) {
      st = document.createElement("style");
      st.id = "vl-sc-w06";
      (document.head || document.documentElement).appendChild(st);
    }
    const mark = `/* w06-claude-part${PART} */`;
    if (st.textContent.indexOf(mark) < 0) st.appendChild(document.createTextNode(mark + CSS));
  }

  // ==================================================================
  // W6O3c · An architecture that survives change (12 visuals)
  // ==================================================================
  REG.W6O3c = buildScene("W6O3c", 29, [
    // V1 · Adapts "The Pudding — responsive scrollytelling" — keep the essential change, simplify for phone
    // https://pudding.cool/process/responsive-scrollytelling/
    (() => {
      const s =
        rv(0, "grow", rect(20, 70, 250, 170, COL.white, 14, { stroke: COL.navy, "stroke-width": 3 }) +
          [0, 1, 2, 3].map(j => rect(36 + j * 58, 120, 50, 60, j === 1 ? COL.orange : COL.navy, 8)).join("") +
          pth("M86 150 H94 M144 150 H152 M202 150 H210", COL.white, 3) + tx(145, 100, "Agreed map", 16, COL.navy) + at(145, 214, I.seal(COL.green, 0.7))) +
        [0, 1, 2].map(j => rv(1, "fade", pth(`M${350 - j * 22} ${90 - j * 6} Q${320 - j * 22} 155 ${350 - j * 22} ${220 + j * 6}`, COL.red, 4, { class: "w6-blink" }))).join("") +
        rv(1, "left", pill(340, 46, "Change arrives", COL.red, { size: 14 })) +
        rv(1, "up", pill(200, 274, "The real test", COL.orange, { size: 14 }));
      return { at: 0, tag: "Agreeing is only the start", L: 1, svg: s };
    })(),
    // V2 · Adapts "Interactive Computer Assembly Sequence" (CodePen) — a component docks into place
    // https://codepen.io/karlhorning/pen/OJqNMVR
    (() => {
      const s =
        rect(110, 150, 180, 90, COL.navy, 14) + txOn(200, 200, "Reservations", 16) + rect(170, 140, 60, 14, COL.ink, 4) +
        grp({ class: "w6-m mod" }, rect(156, 40, 88, 60, COL.orange, 10) + txOn(200, 66, "New", 14) + txOn(200, 84, "platform", 14) + pth("M180 100 V112 M220 100 V112", COL.ink, 4)) +
        rv(1, "fade", card(4, 170, 100, 40, "Reception", { col: COL.teal, size: 14 }) + card(296, 140, 100, 40, "Billing", { col: COL.teal, size: 14 }) +
          card(296, 206, 100, 40, "Revenue", { col: COL.teal, size: 14 }) + pth("M104 190 H110 M290 160 H296 M290 226 H296", COL.teal, 5)) +
        rv(1, "pop", at(60, 120, I.lens(COL.teal, 1.1))) +
        rv(1, "up", pill(200, 278, "What else changes?", COL.navy, { size: 14 }));
      return {
        at: 2, tag: "A new reservation platform", L: 1, svg: s,
        tick(api, k) { api.from(".mod", { y: -40 }, { y: k ? 46 : 20, t: 1.1, ease: "back.out(1.3)" }); }
      };
    })(),
    // V3 · Adapts "MotionPath plugin demonstration" (GSAP) — an object aligned and carried along a path
    // https://gsap.com/docs/v3/Plugins/MotionPathPlugin/
    (() => {
      const nd = ["Reser-|vations", "Prepare|arrival", "Check-in", "Stay"];
      const s =
        pth("M60 150 H340", COL.line, 6, { class: "ln" }) +
        nd.map((nm, j) => card(16 + j * 96, 122, 84, 56, nm, { col: j === 2 ? COL.plum : COL.navy, size: 14 })).join("") +
        grp({ class: "w6-m pk", opacity: 0 }, rect(-13, -9, 26, 18, COL.gold, 3) + pth("M-13 -9 L0 1 L13 -9", COL.white, 2)) +
        rv(0, "fade", draw(0, "M58 112 C100 70 220 70 250 112", COL.gold, 3, { "stroke-dasharray": "1 1" }) + tx(150, 62, "depends on", 15, COL.gold)) +
        rv(1, "pop", at(250, 236, I.person(COL.plum, 1)) + pill(250, 278, "Needs accurate data", COL.plum, { size: 14 }));
      return {
        at: 4, tag: "Dependencies", L: 1, svg: s,
        tick(api, k) { api.along(".pk", ".ln", k ? 0.6 : 0.2); }
      };
    })(),
    // V4 · Adapts "GSAP SVG Research" (CodePen) — a drop sends out ripple rings
    // https://codepen.io/FabioG/post/svg-animation-research-gsap
    (() => {
      const pts = [["Revenue", 110, 80], ["Reception", 300, 92], ["Billing", 90, 226], ["Guest", 306, 222]];
      const s =
        [1, 2, 3].map(r => grp({ class: "w6-m rg" }, circ(200, 152, 40 * r, "none", { stroke: COL.orange, "stroke-width": 3, opacity: 0.6 }))).join("") +
        circ(200, 152, 30, COL.orange) + txOn(200, 148, "Rate", 13) + txOn(200, 164, "rule", 13) +
        pts.map(([nm, x, y], j) => grp({ class: "w6-m nd" }, card(x - 50, y - 18, 100, 36, nm, { col: COL.navy, size: 14 }))).join("") +
        rv(1, "pop", pill(200, 28, "Plausible effects", COL.navy, { size: 14 })) +
        rv(2, "up", pill(200, 284, "Blast radius", COL.red));
      return {
        at: 6, tag: "The blast radius", L: 2, svg: s,
        tick(api, k, K, lv) {
          api.qa(".rg").forEach((r, j) => api.from(r, { s: 0.2, o: 0 }, { s: 1 + k * 0.08, o: 1, dl: j * 0.2, t: 1.2 }));
          api.qa(".nd").forEach((n, j) => {
            api.anim(n, { s: lv >= (j < 2 ? 1 : 2) ? 1.08 : 0.95 });
            api.attr(n.querySelector("rect"), "stroke", lv >= (j < 2 ? 1 : 2) ? COL.red : COL.navy);
          });
        }
      };
    })(),
    // V5 · Adapts "Bar Chart Race" (Observable) — keyframes animate values in opposite directions
    // https://observablehq.com/@d3/bar-chart-race
    (() => {
      const s =
        tx(30, 92, "Booking speed", 16, COL.ink, { "text-anchor": "start" }) + rect(30, 102, 300, 34, COL.mist, 8) +
        grp({ class: "w6-m b1" }, rect(30, 102, 300, 34, COL.green, 8)) + at(356, 119, shape("M0 -14 L12 4 H-12Z", COL.green)) +
        tx(30, 192, "Journey reliability", 16, COL.ink, { "text-anchor": "start" }) + rect(30, 202, 300, 34, COL.mist, 8) +
        grp({ class: "w6-m b2" }, rect(30, 202, 300, 34, COL.red, 8)) + at(356, 219, shape("M0 14 L12 -4 H-12Z", COL.red)) +
        rv(0, "pop", pill(200, 278, "Local win, journey loss", COL.red, { size: 14 }));
      return {
        at: 9, tag: "Local win, journey loss", L: 0, svg: s,
        tick(api) { api.from(".b1", { sx: 0.4, og: "0% 50%" }, { sx: 0.95, og: "0% 50%", t: 1.4 }); api.from(".b2", { sx: 0.85, og: "0% 50%" }, { sx: 0.35, og: "0% 50%", t: 1.4 }); }
      };
    })(),
    // V6 · Adapts "SaaS Platform & Workflow Motion UI Concept" (Dribbble) — cards cross lanes and reflow
    // https://dribbble.com/shots/27719724-SaaS-Platform-Workflow-Motion-UI-Concept
    (() => {
      const s =
        rect(14, 40, 372, 70, COL.fog, 10) + tx(24, 64, "Programme A", 14, COL.sky, { "text-anchor": "start" }) +
        rect(14, 124, 372, 70, COL.fog, 10) + tx(24, 148, "Programme B", 14, COL.plum, { "text-anchor": "start" }) +
        grp({ class: "w6-m ga" }, rect(30, 72, 150, 28, COL.sky, 6) + txOn(105, 91, "Verification", 13.5)) +
        grp({ class: "w6-m gb" }, rect(220, 156, 150, 28, COL.plum, 6) + txOn(295, 175, "Verification", 13.5)) +
        rv(1, "pop", at(200, 117, I.warn(COL.red, 1.1)), OUT(2)) + rv(1, "up", pill(200, 240, "Conflicting changes", COL.red, { size: 14 }), OUT(2)) +
        rv(2, "pop", rect(120, 64, 160, 128, "none", 12, { stroke: COL.green, "stroke-width": 3, "stroke-dasharray": "8 6" }) + at(280, 64, I.crown(COL.gold, 0.8))) +
        rv(2, "up", pill(200, 240, "Coordinated on the map", COL.green, { size: 14 }));
      return {
        at: 10, tag: "Overlapping programmes", L: 2, svg: s,
        tick(api, k, K, lv) { api.anim(".ga", { x: lv >= 1 ? 95 : 0 }); api.anim(".gb", { x: lv >= 1 ? -95 : 0 }); }
      };
    })(),
    // V7 · Adapts "Stripe Connect onboarding quickstart" — decision and verification checkpoints
    // https://docs.stripe.com/connect/onboarding/quickstart
    (() => {
      const gv = [["Decides", 80, 70], ["Approves", 200, 40], ["Resolves", 320, 70]];
      const s =
        at(200, 168, I.person(COL.green, 1.5)) + at(200, 124, I.crown(COL.gold, 0.9)) + tx(200, 208, "Owner", 16, COL.green) +
        gv.map(([nm, x, y], j) => rv(1, "pop", pill(x, y, nm, [COL.navy, COL.teal, COL.gold][j], { size: 14 }))).join("") +
        rv(2, "left", pth("M60 270 H120 V236 H180", COL.orange, 4) + shape("M180 228 L194 236 L180 244Z", COL.orange) + tx(80, 254, "Escalate", 14, COL.orange)) +
        rv(3, "pop", pth("M250 236 L276 256 L262 266 L292 290", COL.red, 4) + tx(330, 252, "No mandate", 14, COL.red));
      return { at: 13, tag: "Governance with a mandate", L: 3, svg: s };
    })(),
    // V8 · Adapts "SVGator — animated UI templates you can customize" — flip a card to its other face
    // https://www.svgator.com/blog/animated-ui-templates-you-can-customize/
    (() => {
      const f = ["What differs", "Why it exists", "Who approved"];
      const s =
        grp({ class: "w6-m fr" }, rect(110, 40, 180, 200, COL.orange, 16) + txOn(200, 130, "Local", 20) + txOn(200, 156, "variant", 20)) +
        grp({ class: "w6-m bk" }, rect(110, 40, 180, 200, COL.white, 16, { stroke: COL.orange, "stroke-width": 3 }) + tx(200, 70, "Variant record", 16, COL.orange) +
          f.map((nm, j) => tx(130, 112 + j * 42, nm, 14, COL.ink, { "text-anchor": "start" }) + at(268, 107 + j * 42, I.check(COL.green, 0.55))).join("")) +
        rv(2, "pop", at(330, 220, I.clock(COL.navy, 1.1)) + pill(330, 264, "Review again", COL.navy, { size: 14 }));
      return {
        at: 17, tag: "Register the variant", L: 2, svg: s,
        tick(api, k, K, lv) {
          const back = lv >= 1;
          api.anim(".fr", { sx: back ? 0.02 : 1, o: back ? 0 : 1, t: 0.5 });
          api.anim(".bk", { sx: back ? 1 : 0.02, o: back ? 1 : 0, dl: back ? 0.35 : 0, t: 0.5 });
        }
      };
    })(),
    // V9 · Adapts "Workflow Management animation gallery" (LottieFiles) — state changes and handoffs
    // https://lottiefiles.com/free-animations/workflow
    (() => {
      const inp = ["Technology", "Roles", "Procedure", "Strategy"];
      const s =
        inp.map((nm, j) => rv(0, "left", pill(70, 52 + j * 52, nm, COL.gold, { size: 14 }) + pth(`M130 ${52 + j * 52} C170 ${52 + j * 52} 180 130 214 130`, COL.gold, 2.5, { "stroke-dasharray": "5 5" }))).join("") +
        rect(214, 70, 120, 130, COL.white, 12, { stroke: COL.green, "stroke-width": 3 }) + pth("M232 128 H316 M232 148 H306 M232 168 H316", COL.line, 4) +
        tx(274, 106, "v1", 22, COL.green, { class: "ver" }) + at(330, 74, I.seal(COL.green, 0.7)) +
        rv(2, "pop", at(270, 256, I.person(COL.navy, 0.9)) + at(310, 246, I.doc(COL.grey, 0.7)) + at(350, 252, I.cross(COL.red, 0.7)) + tx(120, 266, "Old model used", 15, COL.red));
      return {
        at: 20, tag: "Keep descriptions current", L: 2, svg: s,
        tick(api, k) { api.text(".ver", "v" + (k + 2)); }
      };
    })(),
    // V10 · Adapts "Awwwards — SVG lines scroll animation (FEED Agency)" — lines fade as progress advances
    // https://www.awwwards.com/inspiration/svg-lines-scroll-animation-feed-agency
    (() => {
      const s =
        Array.from({ length: 40 }, (_, j) => grp({ class: "w6-m dz" }, rect(16 + (j % 10) * 37, 30 + Math.floor(j / 10) * 54, 30, 44, COL.white, 4, { stroke: COL.navy, "stroke-width": 2 }) +
          pth(`M${22 + (j % 10) * 37} ${44 + Math.floor(j / 10) * 54} H${40 + (j % 10) * 37} M${22 + (j % 10) * 37} ${54 + Math.floor(j / 10) * 54} H${36 + (j % 10) * 37}`, COL.line, 2.5))).join("") +
        rv(1, "up", pill(200, 266, "No owner \u00b7 no links \u00b7 no upkeep", COL.red, { size: 14 }));
      return {
        at: 23, tag: "Hundreds of stale diagrams", L: 1, svg: s,
        tick(api, k) { api.qa(".dz").forEach((d, j) => api.anim(d, { o: k ? (j % 3 ? 0.25 : 0.45) : 1, r: k ? ((j % 5) - 2) * 3 : 0, dl: (j % 10) * 0.04 })); }
      };
    })(),
    // V11 · Adapts "Idea Flow Animation | Infographic Motion Design" (Behance) — orbiting ideas connect
    // https://www.behance.net/gallery/247762027/Idea-Flow-Animation-Infographic-Motion-Design
    (() => {
      const b = ["Investment", "Dependencies", "Variations", "Coordination"];
      const s =
        E("ellipse", { cx: 200, cy: 150, rx: 150, ry: 100, fill: "none", stroke: COL.line, "stroke-width": 2.5, "stroke-dasharray": "6 8" }) +
        circ(200, 150, 44, COL.green) + pth("M172 150 H186 L192 136 L200 166 L208 144 L214 150 H228", COL.white, 3.4) +
        b.map(() => "").join("") +
        b.map((nm) => grp({ class: "w6-m ob" }, pill(0, 0, nm, COL.navy, { size: 14 }))).join("") +
        tx(200, 214, "Living map", 16, COL.green);
      return {
        at: 25, tag: "A living architecture", L: 0, svg: s,
        tick(api, k) {
          api.qa(".ob").forEach((o, j) => {
            const a = (j / 4) * Math.PI * 2 + (k + 1) * 0.4 - Math.PI / 2;
            api.place(o, { x: 200 + Math.cos(a) * 150, y: 150 + Math.sin(a) * 100 });
          });
        }
      };
    })(),
    // V12 · Adapts "MotionPath plugin demonstration" (GSAP) — traverse and auto-rotate along a path
    // https://gsap.com/docs/v3/Plugins/MotionPathPlugin/
    (() => {
      const s =
        rect(14, 200, 110, 70, COL.white, 12, { stroke: COL.navy, "stroke-width": 3 }) + [0, 1, 2].map(j => rect(26 + j * 32, 222, 26, 30, COL.navy, 4)).join("") + tx(69, 290, "Architecture", 14, COL.navy) +
        pth("M80 196 C140 80 260 60 330 80", COL.navy, 3, { "stroke-dasharray": "6 7", class: "fp" }) +
        at(330, 92, rect(-40, 4, 80, 12, COL.ink, 4)) + tx(330, 136, "Launch Pad", 16, COL.orange) +
        grp({ class: "w6-m rk", opacity: 0 }, I.rocket(COL.navy, 0.9)) +
        rv(1, "pop", pill(200, 190, "Next week", COL.orange, { size: 14 })) +
        rv(2, "up", pill(260, 250, "Decisions, not diagrams", COL.green, { size: 14 }));
      return {
        at: 26, tag: "Next: the Launch Pad", L: 2, svg: s,
        tick(api, k) { api.along(".rk", ".fp", [0.1, 0.55, 1][clamp(k, 0, 2)]); }
      };
    })()
  ]);

  // ==================================================================
  // W6O3d · Build the first-level map — synthesis and forum (11 visuals)
  // ==================================================================
  REG.W6O3d = buildScene("W6O3d", 28, [
    // V1 · Adapts "Explainer Video Kit" (Motion Array) — introduce the actors, pose the problem
    // https://motionarray.com/after-effects-templates/explainer-video-18242/
    (() => {
      const s =
        rect(40, 200, 220, 14, COL.ink, 6) + [0, 1, 2].map(j => at(80 + j * 70, 190, I.person([COL.navy, COL.sky, COL.teal][j], 1.1))).join("") +
        tx(150, 244, "Qasr leadership", 15, COL.navy) +
        rv(0, "right", rect(286, 60, 100, 130, COL.white, 8, { stroke: COL.navy, "stroke-width": 3 }) + pth("M300 210 L336 190 L372 210", COL.navy, 3)) +
        rv(1, "pop", shape("M70 40 H250 Q262 40 262 52 V104 Q262 116 250 116 H140 L118 136 L120 116 H70 Q58 116 58 104 V52 Q58 40 70 40Z", COL.white, { stroke: COL.orange, "stroke-width": 3 }) +
          tx(160, 74, "What should our", 15, COL.orange) + tx(160, 96, "map show?", 15, COL.orange));
      return { at: 0, tag: "Something practical", L: 1, svg: s };
    })(),
    // V2 · Adapts "Modern Business Process Infographics Animation Pack" (Envato) — stages introduced and connected
    // https://elements.envato.com/flow-processes-infographic-scenes-pack-ZNAYHQ5
    (() => {
      const fl = ["Attract|guests", "Manage|reservations", "Deliver|guest stay", "Complete|departure"];
      const seg = j => { const x = 12 + j * 94; return `M${x} 112 H${x + 86} L${x + 100} 150 L${x + 86} 188 H${x} ${j ? `L${x + 14} 150` : ""}Z`; };
      const s =
        rv(0, "down", rect(12, 36, 376, 56, COL.navy, 12) + txOn(200, 70, "Management processes", 16)) +
        fl.map((nm, j) => rv(1, "left", shape(seg(j), j % 2 ? COL.orange : "#d0663e") + txOn(58 + j * 94 + (j ? 6 : 0), 152, nm, 13))).join("") +
        rv(1, "up", rect(12, 204, 376, 52, COL.teal, 12) + txOn(200, 236, "Supporting processes", 16)) +
        rv(2, "pop", pill(200, 284, "Illustrative, not yet agreed", COL.red, { size: 14 }));
      return { at: 2, tag: "A first-level map", L: 2, svg: s };
    })(),
    // V3 · Adapts "Creative Design Workflow Animation" (Dribbble) — rough structure morphs into a polished one
    // https://dribbble.com/shots/27476599-Creative-Design-Workflow-Animation
    (() => {
      const s =
        grp({ class: "w6-m b0" }, rect(-44, -20, 88, 40, COL.navy, 8)) +
        [1, 2, 3].map(j => grp({ class: "w6-m b" + j }, rect(-44, -20, 88, 40, COL.orange, 8))).join("") +
        rv(0, "pop", tx(200, 270, "Value flow, not org chart", 16, COL.navy)) +
        grp({ class: "w6-m ln" }, pth("M44 150 H356", COL.orange, 4, { "stroke-dasharray": "8 6" }));
      return {
        at: 5, tag: "Value, not org chart", L: 0, svg: s,
        tick(api) {
          api.from(".b0", { x: 200, y: 60 }, { x: 60, y: 150, t: 1.3, ease: "power2.inOut" });
          [1, 2, 3].forEach(j => api.from(".b" + j, { x: 90 + (j - 1) * 110, y: 170 }, { x: 60 + j * 94, y: 150, t: 1.3, dl: 0.15 * j, ease: "power2.inOut" }));
          api.from(".ln", { o: 0 }, { o: 1, dl: 1 });
        }
      };
    })(),
    // V4 · Adapts "SaaS Dashboard Workflow UI Motion Concept" (Dribbble) — reveal cards, reorganise, highlight KPI
    // https://dribbble.com/shots/27719715-SaaS-Dashboard-Workflow-UI-Motion-Concept
    (() => {
      const s =
        [0, 1, 2, 3].map(j => rect(14 + j * 96, 110, 84, 80, j === 2 ? COL.orange : COL.navy, 10)).join("") +
        [0, 1, 2, 3].map(j => rv(0, "down", at(56 + j * 96, 92, I.crown(COL.gold, 0.8)))).join("") +
        [0, 1, 2, 3].map(j => rv(1, "pop", rect(30 + j * 96, 140, 52, 24, COL.white, 6) + tx(56 + j * 96, 157, "L1", 14, COL.navy))).join("") +
        rv(2, "pop", at(248, 214, I.lens(COL.ink, 1.1)) + [0, 1, 2].map(j => rect(204 + j * 34, 238, 28, 22, COL.sand, 4, { stroke: COL.orange, "stroke-width": 2 })).join("")) +
        rv(2, "up", pill(90, 250, "Detail on demand", COL.orange, { size: 14 })) +
        rv(0, "pop", pill(200, 40, "Owners, names, levels", COL.green, { size: 14 }));
      return { at: 6, tag: "Owners and levels", L: 2, svg: s };
    })(),
    // V5 · Adapts "Celonis Process Explorer animation" — cases move through the graph and pause at a node
    // https://help.celonis.com/cpm46/en/process-components
    (() => {
      const s =
        rv(0, "fade", tx(70, 40, "11 models", 16, COL.navy)) +
        rv(1, "pop", pill(70, 270, "6 of 9 disputed", COL.red, { size: 14 })) +
        rv(2, "rise", rect(176, 60, 48, 190, COL.navy, 10) + txOn(200, 150, "Verify", 13, { transform: "rotate(-90 200 150)" })) +
        rv(3, "pop", at(330, 80, I.seal(COL.green, 1)) + tx(330, 120, "Authoritative", 14, COL.green) +
          rect(300, 160, 60, 26, COL.orange, 6) + txOn(330, 178, "Variant", 13) + tx(330, 214, "registered", 14, COL.orange)) +
        Array.from({ length: 11 }, (_, j) => grp({ class: "w6-m md" }, rect(-12, -9, 24, 18, j < 2 ? COL.green : COL.navy, 3, { class: "mr" }))).join("");
      return {
        at: 9, tag: "Back to the eleven models", L: 3, svg: s,
        tick(api, k, K, lv) {
          api.qa(".md").forEach((m, j) => {
            const home = [30 + (j % 3) * 34, 66 + Math.floor(j / 3) * 40];
            const out = [270 + (j % 2) * 26, 236 - Math.floor(j / 2) * 12];
            const p = lv >= 3 ? out : home;
            api.place(m, { x: p[0], y: p[1], o: lv >= 3 && j > 3 ? 0 : 1, dl: j * 0.05 });
            const red = [2, 3, 5, 6, 8, 9].indexOf(j) >= 0;
            api.attr(m.querySelector(".mr"), "fill", lv >= 1 && lv < 3 && red ? COL.red : (j < 2 ? COL.green : COL.navy));
          });
        }
      };
    })(),
    // V6 · Adapts "Sankey particles generation" (Observable) — emitted particles choose routes
    // https://observablehq.com/@joaormendes/sankey-animation-particles-generation
    (() => {
      const s =
        rect(110, 70, 180, 120, COL.white, 14, { stroke: COL.navy, "stroke-width": 3 }) +
        [0, 1, 2].map(j => rect(128 + j * 54, 110, 42, 40, COL.navy, 6)).join("") + pth("M170 130 H182 M224 130 H236", COL.gold, 4) +
        pth("M20 60 C80 60 100 120 128 128", COL.sky, 5, { class: "pa" }) + pth("M380 60 C320 60 300 120 290 128", COL.plum, 5, { class: "pb" }) +
        grp({ class: "w6-m ta", opacity: 0 }, circ(0, 0, 8, COL.sky)) + grp({ class: "w6-m tb", opacity: 0 }, circ(0, 0, 8, COL.plum)) +
        [0, 1, 2].map(j => rv(1, "up", at(130 + j * 70, 246, I.person([COL.navy, COL.teal, COL.gold][j], 1)))).join("") +
        rv(1, "up", pill(200, 286, "Priorities \u00b7 consequences", COL.navy, { size: 14 }));
      return {
        at: 13, tag: "See the collisions early", L: 1, svg: s,
        tick(api, k) { api.along(".ta", ".pa", k ? 0.75 : 0.35); api.along(".tb", ".pb", k ? 0.75 : 0.35); }
      };
    })(),
    // V7 · Adapts "Design process timeline - Animation" (Dribbble) — marker travels along milestones
    // https://dribbble.com/shots/9892691-Design-process-timeline-Animation
    (() => {
      const st = ["Strategy", "Architecture", "Launch Pad"];
      const s =
        pth("M60 160 H340", COL.line, 8) +
        st.map((nm, j) => circ(60 + j * 140, 160, 20, j === 2 ? COL.orange : COL.navy) + txOn(60 + j * 140, 167, String(j + 1), 17) + tx(60 + j * 140, j % 2 ? 214 : 116, nm, 16, j === 2 ? COL.orange : COL.navy)).join("") +
        grp({ class: "w6-m mk" }, circ(200, 160, 30, "none", { stroke: COL.orange, "stroke-width": 4 })) +
        rv(0, "up", pill(200, 270, "Next week", COL.orange));
      return {
        at: 15, tag: "Toward the Launch Pad", L: 0, svg: s,
        tick(api) { api.from(".mk", { x: 0 }, { x: 140, t: 1.5, dl: 0.3 }); }
      };
    })(),
    // V8 · Adapts "Motion Graphics: Design Thinking Process" (Behance) — eight-scene explainer storyboard
    // https://www.behance.net/gallery/108659899/Motion-Graphics-Design-Thinking-Process
    (() => {
      const dots = Array.from({ length: 400 }, (_, j) => circ(20 + (j % 25) * 7.2, 64 + Math.floor(j / 25) * 7.2, 2.4, j % 9 ? COL.line : COL.orange)).join("");
      const s =
        rv(0, "fade", dots) + tx(106, 46, "400 processes, no map", 15, COL.ink) +
        rv(1, "right", pill(290, 60, "Transfer the reasoning", COL.navy, { size: 13.5 })) +
        rv(2, "right", rect(232, 96, 116, 30, COL.navy, 6) + txOn(290, 116, "Level 1", 13.5) +
          [0, 1, 2].map(j => rect(222 + j * 46, 158, 40, 26, COL.teal, 5)).join("") + pth("M290 126 V142 M242 142 H334 M242 142 V158 M290 142 V158 M334 142 V158", COL.teal, 2.5)) +
        rv(3, "up", rect(236, 206, 108, 70, "none", 6, { stroke: COL.grey, "stroke-width": 6 }) + at(290, 241, I.cross(COL.red, 0.9)) + tx(290, 294, "Not a pretty picture", 13.5, COL.red));
      return { at: 16, tag: "Forum: a new case", L: 3, svg: s };
    })(),
    // V9 · Adapts "Workflow Animation" (Dribbble) — events move stage to stage with notifications
    // https://dribbble.com/shots/3791748-Workflow-Animation
    (() => {
      const s =
        rv(0, "left", card(14, 40, 170, 56, "1  Post first", { col: COL.navy, solid: true, size: 16 }) + at(206, 68, I.lock(COL.navy, 0.9)) + tx(290, 74, "peers hidden", 14, COL.grey)) +
        rv(1, "left", card(14, 116, 170, 56, "2  Reply to two", { col: COL.teal, solid: true, size: 16 }) + at(220, 144, I.person(COL.sky, 0.9)) + at(264, 144, I.person(COL.plum, 0.9))) +
        rv(2, "left", card(14, 192, 170, 56, "3  Disagree, reasoned", { col: COL.orange, solid: true, size: 14 }) +
          at(230, 222, rect(-16, -20, 32, 40, COL.gold, 4) + pth("M-8 -8 H8 M-8 0 H8 M-8 8 H4", COL.white, 2.5)) + tx(320, 228, "Cite the chapter", 14, COL.gold)) +
        grp({ class: "w6-m nt" }, circ(0, 0, 9, COL.red) + txOn(0, 4.5, "!", 12));
      return {
        at: 20, tag: "How to take part", L: 2, svg: s,
        tick(api, k) { api.place(".nt", { x: 182, y: 44 + k * 76 }); }
      };
    })(),
    // V10 · Adapts "Supply Chain Animation" (Behance) — object handed from one actor to the next
    // https://www.behance.net/gallery/121206799/Supply-Chain-Animation
    (() => {
      const s =
        at(90, 190, I.person(COL.navy, 1.8)) + tx(90, 246, "Professor", 15, COL.navy) +
        at(310, 190, I.person(COL.orange, 1.8)) + tx(310, 246, "You", 15, COL.orange) +
        grp({ class: "w6-m ky" }, I.key(COL.gold, 1.6)) +
        rv(0, "pop", pill(200, 60, "The solution is yours", COL.green, { size: 14 }));
      return {
        at: 23, tag: "Transfer the reasoning", L: 0, svg: s,
        tick(api) { api.from(".ky", { x: 130, y: 170 }, { x: 266, y: 160, t: 1.6, ease: "power2.inOut" }); }
      };
    })(),
    // V11 · Adapts "Kurzgesagt — what we do" — layered vector metaphors keyed to narration
    // https://kurzgesagt.org/what-we-do
    (() => {
      const p = ["Ownership", "Comparison", "Coordination", "Decisions"];
      const s =
        rv(0, "left", at(60, 90, I.folder(COL.gold, 1.3)) + at(86, 66, I.cross(COL.red, 0.7)) + tx(60, 138, "Not a folder", 14, COL.red)) +
        rect(130, 236, 256, 16, COL.navy, 4) + tx(258, 274, "Process architecture", 15, COL.navy) +
        p.map((nm, j) => rv(1 + Math.floor(j / 2), "rise", rect(138 + j * 62, 96, 52, 140, [COL.teal, COL.sky, COL.gold, COL.green][j], 6) +
          txOn(164 + j * 62, 166, nm, 13, { transform: `rotate(-90 ${164 + j * 62} 166)` }))).join("") +
        rv(3, "down", shape("M130 92 L258 40 L386 92Z", COL.orange) + txOn(258, 82, "Launch Pad next", 13.5));
      return { at: 24, tag: "The central lesson", L: 3, svg: s };
    })()
  ]);

  if (typeof document !== "undefined") {
    if (document.head) installCSS();
    else document.addEventListener("DOMContentLoaded", installCSS, { once: true });
  }
})();
// END FILE: w06-claude-part3.js
