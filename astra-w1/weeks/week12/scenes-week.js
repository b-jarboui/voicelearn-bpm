/* w12-claude-part1.js — OPER621 · Week 12 · The Implement Phase — animated teaching scenes (version 1, label: claude), part 1 of 4.
 * Sections: W12O1a, W12O1b, W12O1c, W12O2a
 * Contract: window.VL_SCENES[secId] = { build(el), step(i, n), reset() }.
 * Standalone part: it defines every helper it uses, registers its own scenes and appends its own
 * rules (scoped under .vls-w12-<secId>) to the single <style id="vl-sc-w12">. Parts may be concatenated.
 * Seek-safe: every step(i, n) derives the complete visual state from (i, n) alone.
 * Moments: n === lines → one state per narration line; n === visual moments → one beat per moment;
 * any other n → proportional mapping. Uses window.gsap when present; otherwise CSS transitions.
 * prefers-reduced-motion: all changes become instant and ambient loops stop.
 */
(() => {
  "use strict";
  const W = window;
  W.VL_SCENES = W.VL_SCENES || {};
  const PART = "p1";
  const IDS = ["W12O1a", "W12O1b", "W12O1c", "W12O2a"];
  const NS = "http://www.w3.org/2000/svg";
  const DW = 420, DH = 340;
  const C = {
    navy: "#1f4e79", ink: "#1b2a3a", orange: "#c0502a", paper: "#fbf8f1", blue: "#dbe7f2",
    sky: "#eef5fb", green: "#317c61", mint: "#e2f1e9", gold: "#d9a75c", goldD: "#8a5a12",
    sand: "#f3e9d6", teal: "#1f7f99", tealL: "#d6eef4", violet: "#5b4a9e", lilac: "#ebe7f6",
    rose: "#f7e0d8", slate: "#6d7f94", mist: "#c9d6e3", white: "#ffffff", red: "#b3261e"
  };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (t) => t * t * (3 - 2 * t);
  const r1 = (v) => Math.round(v * 10) / 10;
  const reduced = () => !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const hasG = () => !!(W.gsap && typeof W.gsap.to === "function" && typeof W.gsap.set === "function");
  const EASE = {
    io: ["power2.inOut", "cubic-bezier(.45,0,.2,1)"],
    out: ["power3.out", "cubic-bezier(.2,.8,.2,1)"],
    back: ["back.out(1.7)", "cubic-bezier(.34,1.56,.64,1)"],
    in: ["power2.in", "cubic-bezier(.55,0,.8,.3)"],
    lin: ["none", "linear"]
  };

  /* ---------- SVG string helpers ---------- */
  const R = (x, y, w, h, f, rx = 0, e = "") =>
    `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${rx}" fill="${f}" ${e}/>`;
  const O = (x, y, r, f, e = "") => `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}" fill="${f}" ${e}/>`;
  const EL = (x, y, rx, ry, f, e = "") =>
    `<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="${f}" ${e}/>`;
  const P = (d, s, w = 3, e = "") =>
    `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${e}/>`;
  const F = (d, f, e = "") => `<path d="${d}" fill="${f}" ${e}/>`;
  /* drawable path: animate with { dr: 0..1 } */
  const D = (d, s, w = 3, cls = "", e = "") =>
    `<path class="vw-d ${cls}" pathLength="100" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${e}/>`;
  const T = (x, y, s, z = 15, f = C.ink, e = "", a = "middle") =>
    `<text x="${r1(x)}" y="${r1(y)}" font-size="${z}" fill="${f}" text-anchor="${a}" ${e}>${s}</text>`;
  const G = (c, h, e = "") => `<g class="${c}" ${e}>${h}</g>`;
  const AT = (x, y, h) => `<g transform="translate(${r1(x)} ${r1(y)})">${h}</g>`;
  const TW = (s, z) => String(s).length * z * 0.68 + 2;
  /* auto-fitting label chip (rect is re-measured after build) */
  const chip = (x, y, s, z = 14, fg = C.ink, bg = C.white, cls = "", e = "") => {
    const w = TW(s, z) + z * 1.2, h = Math.round(z * 1.75);
    return `<g class="vw-chip ${cls}" ${e}>${R(x - w / 2, y - h / 2, w, h, bg, h / 2, `stroke="${fg}" stroke-width="2" data-cx="${x}" data-pad="${z * 0.6}"`)}${T(x, y + z * 0.36, s, z, fg)}</g>`;
  };
  const person = (x, y, s = 1, f = C.navy) =>
    AT(x, y, `<g transform="scale(${s})">${O(0, -17, 9, f)}${F("M-14 14 Q-14 -5 0 -5 Q14 -5 14 14 Z", f)}</g>`);
  const tick = (x, y, s = 1, c = C.white, w = 3.4) =>
    P(`M${r1(x - 8 * s)} ${r1(y)} L${r1(x - 2 * s)} ${r1(y + 7 * s)} L${r1(x + 9 * s)} ${r1(y - 8 * s)}`, c, w * s);
  const cross = (x, y, s = 1, c = C.white, w = 3.4) =>
    P(`M${r1(x - 7 * s)} ${r1(y - 7 * s)} L${r1(x + 7 * s)} ${r1(y + 7 * s)} M${r1(x + 7 * s)} ${r1(y - 7 * s)} L${r1(x - 7 * s)} ${r1(y + 7 * s)}`, c, w * s);
  const wave = (x0, x1, y, amp, len, ph) => {
    let d = "";
    for (let x = x0; x <= x1; x += 10) d += (x === x0 ? "M" : "L") + r1(x) + " " + r1(y + amp * Math.sin(x / len + ph)) + " ";
    return d.trim();
  };
  const bigBg = (fill) => R(-1000, -800, 2420, 1940, fill);
  void EL; void lerp;

  /* ---------- scoped stylesheet (appended once per part) ---------- */
  (function css() {
    const d = document;
    let s = d.getElementById("vl-sc-w12");
    if (!s) { s = d.createElement("style"); s.id = "vl-sc-w12"; (d.head || d.documentElement).appendChild(s); }
    if (s.getAttribute("data-" + PART)) return;
    s.setAttribute("data-" + PART, "1");
    const k = "vw12" + PART;
    const rules = [
      "&{position:relative;display:block;width:100%;height:100%;min-height:220px;overflow:hidden;font-family:inherit;color:#1b2a3a;background:#fbf8f1;-webkit-user-select:none;user-select:none}",
      "& svg{position:absolute;inset:0;display:block;width:100%;height:100%;overflow:hidden}",
      "& text{font-family:inherit;font-weight:800;letter-spacing:.2px;pointer-events:none}",
      "& .hl{paint-order:stroke fill;stroke:#fbf8f1;stroke-width:4px;stroke-linejoin:round}",
      "& .hw{paint-order:stroke fill;stroke:#ffffff;stroke-width:4px;stroke-linejoin:round}",
      "& .vw-d{stroke-dasharray:100 102;stroke-dashoffset:101}",
      `& .vw-flow{stroke-dasharray:4 9;animation:${k}flow 1.1s linear infinite}`,
      `& .vw-pulse{transform-box:fill-box;transform-origin:center;animation:${k}pulse 1.9s ease-in-out infinite}`,
      `& .vw-spin{transform-box:fill-box;transform-origin:center;animation:${k}spin 6s linear infinite}`,
      `& .vw-bob{transform-box:fill-box;transform-origin:center;animation:${k}bob .55s ease-in-out infinite alternate}`,
      `& .vw-glow{animation:${k}glow 1.6s ease-in-out infinite alternate}`,
      `& .vw-hud.vw-pop{animation:${k}pop .5s cubic-bezier(.2,.8,.2,1)}`,
      "& .vw-sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}",
      "&.vw-now *{transition:none!important}"
    ];
    let out = "";
    IDS.forEach((id) => { rules.forEach((r) => { out += r.replace(/&/g, ".vls-w12-" + id); }); });
    out += `@keyframes ${k}flow{to{stroke-dashoffset:-26}}`;
    out += `@keyframes ${k}pulse{0%,100%{opacity:.35;transform:scale(.9)}50%{opacity:.9;transform:scale(1.12)}}`;
    out += `@keyframes ${k}spin{to{transform:rotate(360deg)}}`;
    out += `@keyframes ${k}bob{from{transform:translateY(0)}to{transform:translateY(-3px)}}`;
    out += `@keyframes ${k}glow{from{opacity:.45}to{opacity:1}}`;
    out += `@keyframes ${k}pop{0%{opacity:0;transform:translateX(-12px)}100%{opacity:1;transform:none}}`;
    out += "@media (prefers-reduced-motion:reduce){" +
      IDS.map((id) => `.vls-w12-${id} *{transition:none!important;animation:none!important}`).join("") + "}";
    s.textContent += out;
  })();

  /* ---------- scene engine ---------- */
  let UID = 0;
  function scene(id, cfg) {
    let root = null, svg = null, ro = null, lastN = 1, curB = -1, instant = true, raf = 0;
    const q = (s) => (root ? Array.from(root.querySelectorAll(s)) : []);
    function apply(n, p) {
      const st = n.__vw || (n.__vw = { x: 0, y: 0, r: 0, sx: 1, sy: 1 });
      let tf = false;
      ["x", "y", "r", "sx", "sy"].forEach((k) => { if (p[k] !== undefined) { st[k] = p[k]; tf = true; } });
      if (p.s !== undefined) { st.sx = p.s; st.sy = p.s; tf = true; }
      if (p.ox !== undefined) { st.ox = p.ox; st.oy = p.oy; st.org = undefined; }
      if (p.org !== undefined) { st.org = p.org; st.ox = undefined; }
      const dur = instant ? 0 : (p.d !== undefined ? p.d : 0.8);
      const dl = instant ? 0 : (p.dl || 0);
      const ez = EASE[p.e || "io"] || EASE.io;
      if (hasG()) {
        const v = {};
        if (tf) {
          if (n.style.transform) n.style.transform = "";
          v.x = st.x; v.y = st.y; v.rotation = st.r; v.scaleX = st.sx; v.scaleY = st.sy;
          if (st.ox !== undefined) v.svgOrigin = st.ox + " " + st.oy;
          else v.transformOrigin = st.org || "50% 50%";
        }
        if (p.o !== undefined) v.opacity = p.o;
        if (p.fill !== undefined) v.fill = p.fill;
        if (p.stroke !== undefined) v.stroke = p.stroke;
        if (p.dr !== undefined) v.strokeDashoffset = 101 * (1 - clamp(p.dr, 0, 1));
        if (instant || reduced()) { W.gsap.killTweensOf(n); W.gsap.set(n, v); }
        else { v.duration = dur; v.delay = dl; v.ease = ez[0]; v.overwrite = "auto"; W.gsap.to(n, v); }
        return;
      }
      n.style.transition = instant ? "none" :
        `transform ${dur}s ${ez[1]} ${dl}s,opacity ${r1(dur * 0.85)}s ease ${dl}s,fill ${dur}s ease ${dl}s,stroke ${dur}s ease ${dl}s,stroke-dashoffset ${r1(dur * 1.15)}s ${ez[1]} ${dl}s`;
      if (tf) {
        if (st.ox !== undefined) { n.style.transformBox = "view-box"; n.style.transformOrigin = `${st.ox}px ${st.oy}px`; }
        else { n.style.transformBox = "fill-box"; n.style.transformOrigin = st.org || "50% 50%"; }
        n.style.transform = `translate(${r1(st.x)}px,${r1(st.y)}px) rotate(${r1(st.r)}deg) scale(${st.sx},${st.sy})`;
      }
      if (p.o !== undefined) n.style.opacity = String(p.o);
      if (p.fill !== undefined) n.style.fill = p.fill;
      if (p.stroke !== undefined) n.style.stroke = p.stroke;
      if (p.dr !== undefined) n.style.strokeDashoffset = String(r1(101 * (1 - clamp(p.dr, 0, 1))));
    }
    const api = {
      to(sel, p) { q(sel).forEach((n, k) => { const v = typeof p === "function" ? p(k, n) : p; if (v) apply(n, v); }); },
      vis(sel, on, p) { api.to(sel, Object.assign({ o: on ? 1 : 0 }, p || {})); },
      txt(sel, s) { q(sel).forEach((n) => { if (n.textContent !== String(s)) n.textContent = String(s); }); },
      attr(sel, k, v) { q(sel).forEach((n) => n.setAttribute(k, String(v))); },
      num(sel, v, fmt) {
        const f = fmt || ((x) => String(Math.round(x)));
        q(sel).forEach((n) => {
          const from = n.__nv === undefined ? v : n.__nv;
          n.__nv = v;
          if (n.__raf) { cancelAnimationFrame(n.__raf); n.__raf = 0; }
          if (instant || reduced() || from === v || !W.requestAnimationFrame) { n.textContent = f(v); return; }
          const t0 = W.performance ? W.performance.now() : Date.now(), dur = 850;
          const tickF = (now) => {
            const k = clamp((now - t0) / dur, 0, 1);
            n.textContent = f(lerp(from, v, smooth(k)));
            n.__raf = k < 1 ? requestAnimationFrame(tickF) : 0;
          };
          n.__raf = requestAnimationFrame(tickF);
        });
      },
      pt(sel, f) {
        const n = q(sel)[0];
        if (!n || typeof n.getTotalLength !== "function") return null;
        try { const L = n.getTotalLength(); const p = n.getPointAtLength(clamp(f, 0, 1) * L); return { x: p.x, y: p.y }; }
        catch (e) { return null; }
      },
      get instant() { return instant; }
    };
    function fitChips() {
      if (!root) return;
      q(".vw-chip").forEach((g) => {
        const rc = g.querySelector("rect"), tx = g.querySelector("text");
        if (!rc || !tx) return;
        let w = 0;
        try { w = tx.getComputedTextLength(); } catch (e) { w = 0; }
        if (!(w > 0)) return;
        const pad = +rc.getAttribute("data-pad") || 8, cx = +rc.getAttribute("data-cx");
        rc.setAttribute("width", r1(w + pad * 2 + 4));
        rc.setAttribute("x", r1(cx - (w + pad * 2 + 4) / 2));
      });
      const pt = root.querySelector(".vw-pt"), pr = root.querySelector(".vw-pr");
      if (pt && pr) {
        let w = 0;
        try { w = pt.getComputedTextLength(); } catch (e) { w = 0; }
        if (!(w > 0)) w = TW(pt.textContent, 15);
        pr.setAttribute("width", r1(w + 46));
      }
    }
    function fit() {
      if (!root || !svg) return;
      const b = root.getBoundingClientRect();
      let vb = [0, 0, DW, DH];
      if (b.width > 20 && b.height > 20) {
        const a = b.width / b.height, a0 = DW / DH;
        if (a > a0) { const w = DH * a; vb = [-(w - DW) / 2, 0, w, DH]; }
        else { const h = DW / a; vb = [0, -(h - DH) / 2, DW, h]; }
      }
      svg.setAttribute("viewBox", vb.map(r1).join(" "));
      fitChips();
    }
    function mapIndex(i, n) {
      const L = cfg.L, M = cfg.M;
      let li;
      if (n === L) li = i;
      else if (n === M.length) li = M[i];
      else li = Math.round((n > 1 ? i / (n - 1) : 0) * (L - 1));
      let b = 0;
      for (let k = 0; k < M.length; k++) if (M[k] <= li) b = k;
      const s0 = M[b], s1 = b + 1 < M.length ? M[b + 1] : L;
      const t = s1 > s0 ? clamp((li - s0) / (s1 - s0), 0, 0.999) : 0;
      return { b, t, li };
    }
    function render(i, n, now) {
      if (!root) return;
      n = Math.max(1, Math.floor(+n) || 1);
      i = clamp(Math.floor(+i) || 0, 0, n - 1);
      const m = mapIndex(i, n);
      instant = !!now || reduced();
      root.classList.toggle("vw-now", instant);
      cfg.paint(api, m.b, m.t, m);
      const lab = cfg.labels[m.b] || "";
      const pt = root.querySelector(".vw-pt");
      if (pt && pt.textContent !== lab) {
        pt.textContent = lab;
        const sr = root.querySelector(".vw-sr");
        if (sr) sr.textContent = lab;
        fitChips();
      }
      const hud = root.querySelector(".vw-hud");
      if (hud && m.b !== curB && !instant) {
        hud.classList.remove("vw-pop");
        void hud.getBoundingClientRect();
        hud.classList.add("vw-pop");
      }
      curB = m.b;
      api.to(".vw-bar", { sx: Math.max(0.004, (i + 1) / n), ox: 14, oy: 331, d: 0.5, e: "out" });
      lastN = n;
      if (instant) void root.getBoundingClientRect();
    }
    W.VL_SCENES[id] = {
      build(el) {
        if (!el) return;
        if (ro) { try { ro.disconnect(); } catch (e) { /* ignore */ } ro = null; }
        if (raf && W.cancelAnimationFrame) cancelAnimationFrame(raf);
        const u = id + "u" + (++UID);
        const div = document.createElement("div");
        div.className = "vls-w12-" + id;
        const hud = `<g class="vw-hud">${R(14, 11, 180, 30, "rgba(255,255,255,.94)", 15, `class="vw-pr" stroke="${cfg.hue}" stroke-width="2"`)}${O(31, 26, 6, cfg.hue)}${T(45, 31.5, "", 15, C.ink, 'class="vw-pt"', "start")}</g>` +
          `<g class="vw-prog">${R(14, 329, DW - 28, 4, C.mist, 2, 'opacity=".7"')}${R(14, 329, DW - 28, 4, cfg.hue, 2, 'class="vw-bar"')}</g>`;
        div.innerHTML = `<svg xmlns="${NS}" viewBox="0 0 ${DW} ${DH}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${cfg.aria}" focusable="false"><defs>${cfg.defs ? cfg.defs(u) : ""}</defs><g class="vw-bg">${cfg.bg(u)}</g><g class="vw-art">${cfg.art(u)}</g>${hud}</svg><span class="vw-sr" aria-live="polite"></span>`;
        if (typeof el.replaceChildren === "function") el.replaceChildren(div);
        else { el.innerHTML = ""; el.appendChild(div); }
        root = div;
        svg = div.querySelector("svg");
        curB = -1;
        fit();
        if (W.ResizeObserver) { ro = new ResizeObserver(() => fit()); ro.observe(div); }
        else if (W.requestAnimationFrame) raf = requestAnimationFrame(fit);
        render(0, 1, true);
      },
      step(i, n) { if (root) render(i, n, false); },
      reset() {
        if (!root) return;
        if (hasG()) q("*").forEach((n) => W.gsap.killTweensOf(n));
        curB = -1;
        render(0, lastN, true);
      }
    };
  }

  /* ======================================================================
   * W12O1a · OUT OF THE BELL JAR
   * Technique: camera dolly across one continuous world (NYT-style pan & zoom).
   * Left world: the ten-phase framework drawn as a metro line, phase 8 lit.
   * Right world: a tested kiosk sealed in a glass test jar inside a live lobby.
   * The jar lifts, the whole arrival journey runs, support arrives, and three
   * continuous threads (project, change, leadership) run beneath everything.
   * ==================================================================== */
  // template: Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO  (metro line traced, tram moves to phase 8)
  // template: SVG Timeline + ScrollTrigger + Paths — https://codepen.io/ruru_wang/pen/VwOPzgy  (camera dolly between framework and lobby)
  // template: Customer Support — https://lottiefiles.com/free-animation/customer-support-TrBfuCgebx  (kiosk, assisted desk, guest journey)
  // template: Multi-Step Icon Animation — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU  (train, support, monitor icons)
  // template: Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p  (four routes ahead)
  scene("W12O1a", {
    L: 31, M: [0, 2, 4, 6, 8, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 30], hue: C.navy,
    aria: "A tested kiosk leaves its glass test jar and enters a live hotel lobby, on phase eight of the ten-phase BPM framework",
    labels: ["Week 12 · Implement", "Developed, not yet live", "Test bench vs real lobby", "Phase 8 of 10",
      "Innovate, People, Develop", "Into everyday practice", "Kiosk + assisted route", "The whole guest journey",
      "Learning while serving", "Train, support, monitor", "A dependable escalation", "Three continuous threads",
      "Across every phase", "Live is not value", "Then sustain it", "Choose how to arrive", "Four ways ahead"],
    defs: (u) => `<linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef4fa"/><stop offset="1" stop-color="#fbf8f1"/></linearGradient>` +
      `<linearGradient id="${u}j" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#dbe7f2" stop-opacity=".55"/><stop offset=".45" stop-color="#ffffff" stop-opacity=".2"/><stop offset="1" stop-color="#bcd0e4" stop-opacity=".55"/></linearGradient>`,
    bg: (u) => bigBg(`url(#${u}s)`),
    art: (u) => {
      const SX = [45, 127, 210, 293, 375];
      const st = SX.map((x) => [x, 110]).concat(SX.slice().reverse().map((x) => [x, 225]));
      const lineD = "M45 110 H375 C418 110 418 225 375 225 H45";
      let left = T(178, 70, "TEN-PHASE FRAMEWORK", 14, C.slate, 'class="a-fw"');
      left += P(lineD, C.mist, 9);
      left += D("M45 110 H375 C418 110 418 225 375 225 H293", C.navy, 9, "a-done");
      left += D("M293 225 H210", C.orange, 9, "a-seg8");
      left += D("M375 110 C418 110 418 225 375 225 H293", C.teal, 13, "a-trail", 'opacity=".55"');
      st.forEach(([x, y], k) => {
        if (k === 7) return;
        const done = k < 7;
        left += G(`a-st a-st${k + 1}`, O(x, y, 14, C.white, `stroke="${done ? C.navy : C.slate}" stroke-width="3"`) + T(x, y + 5, k + 1, 14, done ? C.navy : C.slate));
      });
      left += G("a-g9", O(127, 225, 21, "none", `stroke="${C.green}" stroke-width="4"`));
      left += G("a-g10", O(45, 225, 21, "none", `stroke="${C.green}" stroke-width="4"`));
      left += G("a-st8", O(210, 225, 27, C.orange, 'class="vw-pulse" opacity=".3"') + O(210, 225, 20, C.orange) + T(210, 231, "8", 18, C.white));
      left += G("a-l5", T(375, 88, "INNOVATE", 14, C.navy));
      left += G("a-l6", T(375, 259, "PEOPLE", 14, C.navy));
      left += G("a-l7", T(293, 259, "DEVELOP", 14, C.navy));
      left += G("a-l8", T(210, 197, "IMPLEMENT", 16, C.orange, 'class="hl"'));
      left += G("a-l9", T(127, 258, "REALIZE", 14, C.green) + T(127, 274, "VALUE", 14, C.green));
      left += G("a-l10", T(4, 168, "SUSTAINABLE", 14, C.green, "", "start") + T(4, 184, "PERFORMANCE", 14, C.green, "", "start"));
      left += G("a-flag", P("M133 211 V158", C.ink, 3) + R(133, 158, 36, 22, "rgba(255,255,255,.7)", 2, `stroke="${C.green}" stroke-width="2.5" stroke-dasharray="4 4"`));
      left += G("a-live", chip(210, 264, "LIVE", 14, C.white, C.orange));
      left += G("a-tram", R(-17, -11, 34, 22, C.navy, 8) + R(-11, -6, 22, 9, C.blue, 3) + O(-9, 12, 3, C.ink) + O(9, 12, 3, C.ink));

      let right = [30, 120, 300, 390].map((x) => F(`M${x - 30} 250 V120 C${x - 30} 86 ${x + 30} 86 ${x + 30} 120 V250 Z`, "#e7eef5")).join("") + R(-80, 262, 580, 30, C.sand) + P("M-80 262 H500", "#d8c7a6", 2);
      right += R(-80, 46, 580, 6, "#e9eef4");
      let houses = "";
      for (let k = 0; k < 14; k++) {
        const x = 45 + k * 25;
        houses += F(`M${x - 9} 82 L${x} 72 L${x + 9} 82 Z`, C.slate) + R(x - 8, 82, 16, 12, C.white, 1, `stroke="${C.slate}" stroke-width="1.5"`);
      }
      right += G("a-houses", houses);
      right += G("a-h14", T(210, 110, "14 PROPERTIES", 14, C.slate, 'class="hl"'));
      right += R(100, 252, 100, 10, C.slate, 3);
      right += G("a-kiosk", R(132, 178, 36, 74, C.navy, 7) + R(137, 186, 26, 24, C.blue, 3) + R(141, 192, 18, 4, C.green, 2) + R(141, 200, 12, 3, C.white, 1) + R(144, 232, 12, 14, C.ink, 2));
      right += G("a-tested", O(150, 160, 12, C.green) + tick(150, 160, 0.9));
      right += G("a-jar", F("M96 262 L96 170 C96 120 204 120 204 170 L204 262 Z", `url(#${u}j)`, `stroke="#9fb6cc" stroke-width="3"`) + P("M112 240 V172 C112 150 124 140 138 136", C.white, 5, 'opacity=".8"') + R(140, 112, 20, 14, "#9fb6cc", 4));
      right += G("a-q", O(256, 150, 22, C.white, `stroke="${C.orange}" stroke-width="3"`) + T(256, 159, "?", 26, C.orange));
      right += G("a-out", person(250, 248, 0.9, C.slate) + person(278, 248, 0.9, C.slate) + person(28, 248, 0.9, C.slate));
      right += G("a-lane1", D("M10 280 C60 280 100 274 140 268", C.teal, 4, "a-ln1"));
      right += G("a-lane2", D("M160 268 C210 286 280 288 330 270", C.orange, 4, "a-ln2"));
      right += G("a-ck", chip(150, 160, "KIOSK", 14, C.teal, C.white));
      right += G("a-ca", chip(335, 160, "ASSISTED", 14, C.orange, C.white));
      right += G("a-emp", person(335, 204, 0.95, C.green));
      right += G("a-eq", O(296, 172, 14, C.white, `stroke="${C.orange}" stroke-width="2.5"`) + T(296, 179, "?", 18, C.orange));
      right += R(290, 218, 92, 6, C.ink, 2) + R(296, 224, 80, 38, C.navy, 4) + R(306, 234, 60, 4, C.blue, 2);
      right += G("a-journey", D("M40 254 L120 254 C170 254 220 258 272 254", C.navy, 3, "a-jl", 'stroke-dasharray="3 0"'));
      for (let k = 0; k < 3; k++) right += G(`a-qp a-qp${k}`, person(28 + k * 26, 248, 0.85, C.slate));
      right += G("a-guest", person(0, 0, 1, C.navy) + R(10, -1, 10, 13, C.orange, 2));
      right += G("a-rej", O(176, 196, 12, C.orange) + cross(176, 196, 0.75));
      right += G("a-key", O(286, 196, 7, "none", `stroke="${C.gold}" stroke-width="3.5"`) + P("M293 196 H306 M302 196 V202 M306 196 V201", C.gold, 3.5));
      const icon = (k, x, inner, lab) => G(`a-i a-i${k}`, O(x, 96, 24, C.white, `stroke="${C.teal}" stroke-width="2.5"`) + inner + T(x, 136, lab, 14, C.teal, 'class="hl"'));
      right += icon(0, 90, R(77, 86, 26, 20, C.teal, 3) + P("M90 86 V106", C.white, 2), "TRAIN");
      right += icon(1, 210, P("M197 100 C197 82 223 82 223 100", C.teal, 3.5) + R(193, 96, 8, 12, C.teal, 3) + R(219, 96, 8, 12, C.teal, 3), "SUPPORT");
      right += icon(2, 330, R(316, 84, 28, 20, C.white, 3, `stroke="${C.teal}" stroke-width="2.5"`) + P("M320 99 L327 93 L333 97 L340 89", C.teal, 2.5), "MONITOR");
      right += G("a-sup", person(352, 108, 0.85, C.violet) + O(366, 92, 6, C.gold));
      right += G("a-sc", chip(262, 102, "ESCALATE", 14, C.violet, C.white));
      right += G("a-escg", D("M318 192 C300 165 318 140 340 130", C.violet, 3.5, "a-esc"));
      const route = (k, x, c) => D(`M150 176 C150 140 ${x} 140 ${x} 100`, c, 3.5, `a-rt a-rt${k}`);
      right += G("a-routes", route(0, 60, C.orange) + route(1, 140, C.teal) + route(2, 250, C.violet) + route(3, 340, C.green) +
        [60, 140, 250, 340].map((x, k) => G(`a-rn a-rn${k}`, O(x, 128, 11, C.white, `stroke="${[C.orange, C.teal, C.violet, C.green][k]}" stroke-width="2.5"`) + T(x, 133, k + 1, 13, C.ink))).join(""));
      right += G("a-four", chip(64, 200, "FOUR WAYS", 14, C.ink, C.white));

      let threads = "";
      [C.navy, C.teal, C.goldD].forEach((c, k) => {
        threads += G(`a-th a-th${k}`, P(wave(-260, 1200, 304, 6, 34, k * 2.09), c, 4));
      });
      threads = G("a-ths", threads);
      return G("a-cam", threads + G("a-left", left) + G("a-rightw", AT(520, 0, G("a-right", right)))) +
        G("a-thl", chip(84, 132, "PROJECT MGMT", 14, C.navy, C.white) + chip(210, 236, "CHANGE MGMT", 14, C.teal, C.white) + chip(336, 132, "LEADERSHIP", 14, C.goldD, C.white, "a-lead"));
    },
    paint(a, b, t) {
      const half = t >= 0.5;
      /* camera */
      let cam = [-520, 0, 1];
      if (b === 0 || b === 3 || b === 4 || b === 12 || b === 13 || b === 14) cam = [0, 0, 1];
      if (b === 2) cam = [-529, -10, 1.15];
      if (b === 11) cam = half ? [-490, 0, 1] : [-520, 0, 1];
      a.to(".a-cam", { x: cam[0] - (half && b !== 11 ? 6 : 0), y: cam[1], s: cam[2], ox: 210, oy: 186, d: 1.15 });
      /* left world: framework metro */
      const tramX = b < 3 ? 293 : 210;
      a.to(".a-tram", { x: tramX, y: 225, d: 1.1, dl: b === 3 ? 0.4 : 0 });
      a.to(".a-seg8", { dr: b >= 3 ? 1 : 0, dl: b === 3 ? 0.4 : 0 });
      a.to(".a-done", { dr: 1, d: 0.01 });
      a.to(".a-st8", { s: b === 3 ? 1.22 : 1, e: "back" });
      a.to(".a-st7", { s: b === 0 && half ? 1.25 : 1 });
      a.vis(".a-trail", b === 4, { dr: b === 4 ? 1 : 0 });
      const lab = (k) => {
        if (k === 8) return b === 0 || b === 3 || b >= 12 ? 1 : 0.55;
        if (k === 5 || k === 6) return b === 4 || (b === 3 && half) ? 1 : 0.25;
        if (k === 7) return b === 4 || b === 3 || (b === 0 && half) ? 1 : 0.3;
        if (k === 9) return b === 3 || b >= 12 ? 1 : 0.3;
        return b >= 13 ? 1 : 0.3;
      };
      [5, 6, 7, 8, 9, 10].forEach((k) => a.to(".a-l" + k, { o: lab(k), s: (b === 4 && (k === 5 || k === 6 || k === 7)) ? 1.08 : 1 }));
      a.vis(".a-flag", b === 12 && half || b >= 13, { y: b >= 13 ? 0 : 12 });
      a.vis(".a-live", b === 13 || b === 14, { s: b === 13 ? 1 : 0.9, e: "back" });
      a.vis(".a-g9", b === 13 && half || b === 14, { s: b === 14 ? 1.1 : 1 });
      a.vis(".a-g10", b === 14, { s: b === 14 && half ? 1.15 : 1 });
      a.to(".a-fw", { o: b === 0 || b === 3 ? 1 : 0.5 });
      /* right world: lobby */
      a.vis(".a-houses", b === 1 || b === 2 || b >= 15, { y: b >= 15 ? -4 : 0 });
      a.vis(".a-h14", b === 1);
      a.vis(".a-jar", b < 5, { y: b < 5 ? 0 : -190, d: 1.3 });
      a.vis(".a-tested", b < 5, { s: b === 1 ? 1.15 : 1, e: "back" });
      a.vis(".a-q", (b === 1 && half) || b === 2, { s: b === 2 ? 1.1 : 0.9, e: "back" });
      a.vis(".a-out", b === 2, { x: b === 2 && half ? -6 : 0 });
      const lanes = (b === 5 && half) || (b >= 6 && b <= 10) || b >= 15;
      a.to(".a-ln1", { dr: lanes ? 1 : 0 });
      a.to(".a-ln2", { dr: lanes ? 1 : 0, dl: 0.25 });
      a.to(".a-lane1, .a-lane2", { o: lanes ? (b >= 15 ? 0.45 : 1) : 0 });
      a.vis(".a-ck", (b === 5 && half) || b === 6);
      a.vis(".a-ca", (b === 5 && half) || b === 6);
      a.vis(".a-emp", true);
      a.vis(".a-eq", b === 8, { s: b === 8 && half ? 1.2 : 1, e: "back" });
      /* the guest */
      let g = [-40, 248], go = 0;
      if (b >= 1 && b <= 5) { g = [40, 248]; go = 1; }
      if (b === 6) { g = [118, 248]; go = 1; }
      if (b === 7) { g = [272, 248]; go = 1; }
      if (b === 8 || b === 9 || b === 10) { g = [262, 248]; go = 1; }
      if (b >= 15) { g = [262, 248]; go = 0.6; }
      a.to(".a-guest", { x: g[0], y: g[1], o: go, d: b === 7 ? 1.4 : 0.9 });
      a.vis(".a-rej", b === 6 && half, { s: 1, e: "back" });
      a.vis(".a-key", b === 7, { s: b === 7 ? 1 : 0.5, e: "back", dl: b === 7 ? 1 : 0 });
      a.vis(".a-journey", b === 7);
      a.to(".a-jl", { dr: b === 7 ? 1 : 0, d: 1.4 });
      const qn = b === 7 && half ? 1 : b === 8 ? (half ? 3 : 2) : 0;
      for (let k = 0; k < 3; k++) a.to(".a-qp" + k, { o: k < qn ? 1 : 0, x: k < qn ? 0 : -20, dl: k * 0.1 });
      for (let k = 0; k < 3; k++) {
        const on = b === 9;
        a.to(".a-i" + k, { o: on ? 1 : 0, y: on ? 0 : -40, dl: on ? k * 0.15 : 0, e: on ? "back" : "io", s: on && half && k === 2 ? 1.1 : 1 });
      }
      a.vis(".a-sup", b === 10, { y: b === 10 ? 0 : -10 });
      a.vis(".a-sc", b === 10);
      a.vis(".a-escg", b === 10);
      a.to(".a-esc", { dr: b === 10 ? 1 : 0 });
      const rts = b >= 15;
      for (let k = 0; k < 4; k++) {
        a.to(".a-rt" + k, { dr: rts ? 1 : 0, dl: rts ? k * 0.15 : 0 });
        a.vis(".a-rn" + k, rts, { s: b === 16 && k === (half ? 3 : 0) ? 1.25 : 1, e: "back", dl: rts ? 0.4 + k * 0.1 : 0 });
      }
      a.vis(".a-four", rts, { s: b === 16 ? 1.08 : 1 });
      /* threads + dimming */
      const thr = b === 11 || b === 12;
      a.to(".a-left, .a-right", { o: b === 11 ? 0.28 : b === 12 ? 0.5 : 1 });
      for (let k = 0; k < 3; k++) a.to(".a-th" + k, { o: thr || (b === 10 && half) ? 1 : 0.28 });
      a.vis(".a-thl", b === 11, { y: b === 11 ? 0 : 10 });
      a.to(".a-ths", { y: b === 11 ? -120 : 0, sy: b === 11 ? 2.4 : 1, d: 1.1 });
      a.to(".a-lead", { s: b === 11 && half ? 1.12 : 1, e: "back" });
    }
  });

  /* ======================================================================
   * W12O1b · ONE SET OF TILES, FOUR CHOREOGRAPHIES
   * Technique: identity-preserving re-layout (3Blue1Brown-style transform).
   * The same twelve property tiles are re-arranged for big bang, phased,
   * parallel and pilot-then-roll; a fill rising from each tile's base is
   * its cutover. Beneath, an exposure timeline shows WHEN and HOW MANY switch,
   * ending as four small multiples (Pudding / Tufte).
   * ==================================================================== */
  // template: Stacked-to-grouped bars — https://observablehq.com/@d3/stacked-to-grouped-bars  (same twelve tiles re-laid out per approach)
  // template: Project TimeLine — https://motionarray.com/after-effects-templates/project-timeline-2424919/  (exposure timeline: when and how many switch)
  // template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3  (four small multiples side by side)
  // template: Git Workflow 1 — https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5  (old and new tracks running in parallel)
  scene("W12O1b", {
    L: 28, M: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 27], hue: C.teal,
    aria: "Twelve property tiles rearrange to show big bang, phased, parallel and pilot-then-roll implementation, with an exposure timeline",
    labels: ["Twelve sites to switch", "Four ways to switch", "Big bang: all at once", "One cutover, one risk",
      "Speed vs consequences", "Phased: wave by wave", "Each wave, a new risk", "Old and new, side by side",
      "Parallel: both kept", "One arrival, used once", "Protection ≠ feasibility", "Pilot, then roll",
      "Pilot ≠ proof everywhere", "Where risk lands", "Find the binding factor"],
    defs: (u) => `<linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1f6f8"/><stop offset="1" stop-color="#f7f3ea"/></linearGradient>`,
    bg: (u) => bigBg(`url(#${u}b)`) + R(-1000, 240, 2420, 600, "#efe9dc") + P("M-1000 240 H1420", "#e2d8c4", 1.5),
    art: () => {
      let s = "";
      /* parallel tracks (behind tiles) */
      s += G("b-tracks", P("M28 150 H392", C.navy, 4) + P("M28 186 H392", C.green, 4) +
        T(84, 141, "OLD WAY", 14, C.navy, 'class="hl"') + T(84, 207, "NEW WAY", 14, C.green, 'class="hl"'));
      /* learning arrows + wave triangles + links */
      s += G("b-learn", P("M96 66 Q150 44 204 66", C.teal, 3) + P("M196 59 L205 67 L193 70", C.teal, 3) +
        P("M216 66 Q270 44 324 66", C.teal, 3) + P("M316 59 L325 67 L313 70", C.teal, 3));
      [90, 210, 330].forEach((x, k) => {
        s += G(`b-tri b-tri${k}`, F(`M${x} 74 L${x + 11} 94 L${x - 11} 94 Z`, C.orange) + T(x, 92, "!", 13, C.white));
      });
      s += G("b-links", P("M138 150 H162", C.slate, 3, 'stroke-dasharray="3 5"') + P("M258 150 H282", C.slate, 3, 'stroke-dasharray="3 5"'));
      /* the twelve tiles */
      for (let k = 0; k < 12; k++) {
        s += G(`b-t b-t${k}`,
          R(-20, -20, 40, 40, "#e5ebf1", 7, `stroke="${C.slate}" stroke-width="2"`) +
          P("M-11 -7 H11 M-11 1 H11 M-11 9 H4", C.slate, 2.5) +
          R(-20, -20, 40, 40, C.green, 7, 'class="b-nf"') +
          G("b-ng", R(-6, -13, 12, 20, C.white, 3) + R(-3, -9, 6, 5, C.green, 1) + R(-2, 8, 4, 5, C.white, 1)) +
          R(-24, -24, 48, 48, "none", 10, `class="b-rd" stroke="${C.red}" stroke-width="3"`) +
          G("b-tq", O(15, -15, 9, C.white, `stroke="${C.orange}" stroke-width="2"`) + T(15, -10, "?", 14, C.orange)));
      }
      /* pilots */
      s += G("b-pil", chip(46, 88, "PILOTS", 14, C.green, C.white) +
        [120, 174].map((y, k) => R(26, y - 20, 40, 40, C.green, 7) + G("b-pl", T(46, y + 6, k ? "C" : "M", 16, C.white))).join(""));
      s += G("b-loop", O(46, 222, 15, C.white, `stroke="${C.teal}" stroke-width="2"`) + G("vw-spin", P("M37 216 A11 11 0 1 1 38 230", C.teal, 3) + P("M33 226 L38 231 L43 226", C.teal, 2.5)));
      s += G("b-bolt", O(210, 146, 24, C.orange) + F("M214 128 L200 150 L210 150 L206 166 L221 141 L211 141 Z", C.white));
      /* booking card, ghosts, ledgers */
      const card = R(-14, -10, 28, 20, C.orange, 4) + P("M-8 -3 H8 M-8 3 H4", C.white, 2);
      s += G("b-card", card);
      s += G("b-gh1", card, 'opacity=".5"') + G("b-gh2", card, 'opacity=".5"');
      s += G("b-x", O(338, 168, 15, C.red) + cross(338, 168, 0.8));
      s += G("b-ledg", R(290, 92, 34, 44, C.white, 3, `stroke="${C.navy}" stroke-width="2"`) + P("M296 104 H318 M296 113 H318 M296 122 H312", C.navy, 2) +
        R(358, 92, 34, 44, C.white, 3, `stroke="${C.green}" stroke-width="2"`) + P("M364 104 H386 M364 113 H380 M364 122 H386", C.green, 2) +
        T(341, 122, "≠", 24, C.red));
      /* exposure timeline */
      s += G("b-axis", P("M20 284 H400", C.slate, 2) + P("M394 279 L401 284 L394 289", C.slate, 2));
      s += G("b-spb", R(115, 248, 12, 36, C.orange, 2, 'class="b-sp0"'));
      s += G("b-spp", [100, 210, 320].map((x, k) => R(x - 6, 270, 12, 14, k === 2 ? "none" : C.teal, 2, `class="b-sq b-sq${k}" ${k === 2 ? `stroke="${C.teal}" stroke-width="2" stroke-dasharray="3 3"` : ""}`)).join("") +
        R(115, 248, 12, 36, "none", 2, `class="b-ghost" stroke="${C.orange}" stroke-width="2" stroke-dasharray="4 4"`));
      s += G("b-spr", D("M110 268 H330", C.navy, 4, "b-r1") + D("M110 277 H330", C.green, 4, "b-r2"));
      s += G("b-spl", R(54, 278, 12, 6, C.green, 2) + P("M74 281 H250", C.teal, 2.5, 'stroke-dasharray="2 6"') +
        [270, 296, 322, 348].map((x) => R(x - 6, 272, 12, 12, C.teal, 2)).join(""));
      s += G("b-12", chip(196, 262, "12 AT ONCE", 14, C.red, C.white));
      s += G("b-dual", chip(210, 232, "OLD + NEW RUNNING", 14, C.ink, C.white));
      /* four mode chips + small multiples */
      const CH = [[58, "BIG BANG", C.orange], [156, "PHASED", C.teal], [256, "PARALLEL", C.navy], [360, "PILOT", C.green]];
      CH.forEach(([x, l, c], k) => { s += G(`b-ch b-ch${k}`, chip(x, 306, l, 14, c, C.white)); });
      s += G("b-sm",
        R(52, 252, 12, 30, C.orange, 2) +
        [136, 156, 176].map((x) => R(x - 5, 272, 10, 10, C.teal, 2)).join("") +
        P("M222 264 H290", C.navy, 4) + P("M222 273 H290", C.green, 4) +
        R(328, 278, 10, 4, C.green, 1) + P("M342 280 H360", C.teal, 2, 'stroke-dasharray="2 4"') + R(366, 273, 9, 9, C.teal, 2) + R(380, 273, 9, 9, C.teal, 2));
      s += G("b-sup", [58, 156, 256, 360].map((x) => O(x + 38, 292, 9, C.teal) + P(`M${x + 33} 293 C${x + 33} 286 ${x + 43} 286 ${x + 43} 293`, C.white, 2)).join(""));
      s += G("b-lens", O(0, 0, 25, "rgba(255,255,255,.25)", `stroke="${C.ink}" stroke-width="3"`) + P("M18 -18 L30 -30", C.ink, 5));
      return s;
    },
    paint(a, b, t) {
      const half = t >= 0.5;
      /* layout */
      let lay = "g";
      if ((b === 4 && half) || b === 5 || b === 6 || (b === 7 && !half)) lay = "w";
      if ((b === 7 && half) || b === 8 || b === 9 || (b === 10 && !half)) lay = "p";
      if ((b === 10 && half) || b === 11 || b === 12) lay = "pl";
      const waveFill = (w) => (b === 5 ? (w === 0 || (w === 1 && half)) : (b === 6 || b === 7) ? w < 2 : false);
      for (let k = 0; k < 12; k++) {
        const c = k % 4, r = Math.floor(k / 4);
        let x = 105 + 70 * c, y = 92 + 54 * r, s = 1, fill = 0;
        const w = Math.floor(k / 4), i = k % 4;
        if (lay === "w") { x = [90, 210, 330][w] + (i % 2 ? 24 : -24); y = 150 + (i < 2 ? -24 : 24); fill = waveFill(w) ? 1 : 0; }
        if (lay === "p") { if (k === 5) { x = 210; y = 168; s = 2.2; fill = 0.5; } else { const j = k < 5 ? k : k - 1; x = 45 + j * 33; y = 70; s = 0.55; } }
        if (lay === "pl") { x += 28; }
        if (b >= 13) { x = [58, 156, 256, 360][c]; y = 92 + 52 * r; s = 0.82; fill = [1, r < 2 ? 1 : 0, 0.5, 0][c]; }
        if (lay === "g" && b < 13) fill = (b === 2 || b === 3 || (b === 4 && !half)) ? 1 : 0;
        const dist = Math.hypot(c - 1.5, r - 1);
        a.to(".b-t" + k, { x, y, s, o: 1, d: 1.05, dl: lay === "w" || lay === "p" || b >= 13 ? (k % 4) * 0.05 : 0 });
        a.to(`.b-t${k} .b-nf`, { sy: Math.max(0.001, fill), org: "50% 100%", d: b === 2 ? 0.45 : 0.7, dl: 0 });
        a.to(`.b-t${k} .b-ng`, { o: fill >= 0.5 ? 1 : 0 });
        const red = (b === 2 && half) || (b === 3 && half) || (b === 4 && !half);
        a.to(`.b-t${k} .b-rd`, { o: red ? 1 : 0, dl: red ? dist * 0.12 : 0, d: 0.35 });
        a.to(`.b-t${k} .b-tq`, { o: b === 12 ? 1 : 0, s: b === 12 ? 1 : 0.4, e: "back", dl: b === 12 ? k * 0.04 : 0 });
      }
      /* chips */
      let act = -1;
      if (b === 1 && half) act = 0;
      if (b >= 2 && b <= 4) act = 0;
      if (b === 4 && half) act = 1;
      if (b >= 5 && b <= 7) act = 1;
      if (b === 7 && half) act = 2;
      if (b >= 8 && b <= 10) act = 2;
      if (b === 10 && half) act = 3;
      if (b === 11 || b === 12) act = 3;
      for (let k = 0; k < 4; k++) {
        const on = b >= 13 || (b === 1 && !half) || act === k;
        a.to(".b-ch" + k, { o: b === 0 && !half ? 0 : (on ? 1 : 0.35), s: act === k ? 1.1 : 1, y: act === k ? -3 : 0, e: "back", dl: b === 1 && !half ? k * 0.12 : 0 });
      }
      a.vis(".b-bolt", b === 2 && !half, { s: b === 2 && !half ? 1 : 0.4, e: "back" });
      a.vis(".b-12", b === 4 && !half, { s: 1, e: "back" });
      /* timeline */
      a.vis(".b-spb", b >= 2 && (b < 4 || (b === 4 && !half)));
      a.to(".b-sp0", { sy: b >= 2 && b <= 4 ? 1 : 0.001, org: "50% 100%", e: "back" });
      a.to(".b-spb", { s: b === 4 && !half ? 1.12 : 1 });
      const ph = b >= 5 && b <= 7;
      a.vis(".b-spp", ph);
      a.to(".b-sq0", { sy: ph ? 1 : 0.001, org: "50% 100%" });
      a.to(".b-sq1", { sy: (b === 5 && half) || b === 6 || b === 7 ? 1 : 0.001, org: "50% 100%" });
      a.to(".b-sq2", { o: b === 7 ? 1 : 0 });
      a.to(".b-ghost", { o: b === 5 && half ? 1 : 0 });
      const pa = (b >= 8 && b <= 10) || (b === 7 && half);
      a.vis(".b-spr", pa);
      a.to(".b-r1", { dr: pa ? 1 : 0 });
      a.to(".b-r2", { dr: pa ? 1 : 0, dl: 0.2 });
      a.vis(".b-spl", b === 11 || b === 12 || (b === 10 && half));
      a.vis(".b-axis", b < 13);
      a.vis(".b-sm", b >= 13, { y: b >= 13 ? 0 : 8 });
      /* phased extras */
      a.vis(".b-tri0", b === 6, { s: b === 6 ? 1 : 0.3, e: "back" });
      a.vis(".b-tri1", b === 6, { s: b === 6 ? 1 : 0.3, e: "back", dl: 0.15 });
      a.vis(".b-tri2", false);
      a.vis(".b-learn", b === 6 && half);
      a.vis(".b-dual", b === 5 || (b === 7 && !half), { s: b === 7 ? 1.08 : 1 });
      a.vis(".b-links", b === 7 && !half);
      /* parallel extras */
      a.vis(".b-tracks", pa && !(b === 10 && half));
      a.vis(".b-card", (b === 8 && half) || (b === 9 && !half), { x: b === 9 ? 128 : 60, y: 168 });
      a.vis(".b-gh1", b === 9 && !half, { x: b === 9 ? 292 : 140, y: b === 9 ? 150 : 168 });
      a.vis(".b-gh2", b === 9 && !half, { x: b === 9 ? 292 : 140, y: b === 9 ? 186 : 168 });
      a.vis(".b-x", (b === 9 && !half) || (b === 10 && !half), { s: b === 9 || b === 10 ? 1 : 0.3, e: "back", dl: b === 9 ? 0.5 : 0 });
      a.vis(".b-ledg", (b === 9 && half) || (b === 10 && !half));
      /* pilot extras */
      const pl = b === 11 || b === 12 || (b === 10 && half);
      a.vis(".b-pil", pl, { x: pl ? 0 : -30 });
      a.to(".b-pl", { o: (b === 11 && half) || b === 12 ? 1 : 0 });
      a.vis(".b-loop", b === 11 || b === 12 || b >= 13, { x: b >= 13 ? 314 : 0, y: b >= 13 ? 12 : 0 });
      a.vis(".b-sup", b === 12 && half);
      a.vis(".b-lens", b === 14, { x: b === 14 ? (half ? 256 : 58) : 58, y: 300, d: 1 });
    }
  });

  /* ======================================================================
   * W12O1c · FIVE FORCES, FOUR GLASS COLUMNS
   * Technique: unit accumulation (data emerging from discrete drops).
   * Each selection factor is a weight that releases tokens into the
   * approaches it favours; parallel gets sealed; the stacks end level,
   * so the learner must name the binding constraint. A rollback net
   * hangs under every option.
   * ==================================================================== */
  // template: Sankey particles generation — https://observablehq.com/@joaormendes/sankey-animation-particles-generation  (factor weights release tokens)
  // template: Infographic Chart Creator — https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/  (four glass columns fill)
  // template: Bar Chart Race, Explained — https://observablehq.com/@d3/bar-chart-race-explained  (columns end level: name the binding constraint)
  // template: Circle target — https://lottiefiles.com/free-animation/circle-target-VoScEbLOv2  (lens on the binding factor)
  scene("W12O1c", {
    L: 28, M: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 27], hue: C.violet,
    aria: "Five constraint weights drop tokens into four glass columns for big bang, phased, parallel and pilot, ending level so the binding constraint must be named",
    labels: ["Four candidates", "Fit, not preference", "Deadline: 1 January", "Pushes toward speed",
      "Each arrival used once", "Rollback matters more", "Visible early success", "Learning, not proof",
      "Variation → phased", "Reconciliation cost", "Costly dual → big bang", "Signals conflict",
      "Name the binding one", "Rehearsed rollback", "Next: the people"],
    defs: (u) => `<radialGradient id="${u}r" cx=".5" cy=".35" r=".8"><stop offset="0" stop-color="#f6f4fb"/><stop offset="1" stop-color="#ece8f4"/></radialGradient>`,
    bg: (u) => bigBg(`url(#${u}r)`) + R(-1000, 286, 2420, 600, "#e6e1ef"),
    art: () => {
      const WX = [48, 128, 210, 292, 372], WC = [C.orange, C.navy, C.green, C.teal, C.goldD];
      const WL = ["JAN 1", "USE ONCE", "TRUST", "VARIATION", "RECONCILE"];
      const CX = [75, 165, 255, 345], CL = ["BIG BANG", "PHASED", "PARALLEL", "PILOT"];
      let s = "";
      s += G("c-fit", R(24, 140, 372, 170, "none", 18, `stroke="${C.violet}" stroke-width="2.5" stroke-dasharray="7 6"`));
      /* columns */
      let cols = "";
      CX.forEach((x, k) => {
        cols += G(`c-col c-col${k}`, R(x - 31, 152, 62, 130, "rgba(255,255,255,.6)", 12, `stroke="${C.slate}" stroke-width="2.5"`) +
          P(`M${x - 22} 196 H${x - 12} M${x - 22} 220 H${x - 12} M${x - 22} 244 H${x - 12}`, C.mist, 2) +
          T(x, 301, CL[k], 14, C.ink) + G(`c-sp c-sp${k}`, F(`M${x + 18} 160 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 Z`, C.gold)));
      });
      s += G("c-cols", cols);
      s += G("c-lid", R(222, 145, 66, 13, C.orange, 4) + O(255, 212, 19, C.red) + cross(255, 212, 0.95));
      /* tokens: [weight, column, slot] */
      const TK = [[0, 0, 0], [0, 1, 0], [1, 3, 0], [2, 3, 1], [3, 1, 1], [4, 0, 1]];
      TK.forEach(([w, c, sl], k) => {
        const x = CX[c], y = 264 - sl * 32;
        s += G(`c-tk c-tk${k}`, O(x, y, 14, WC[w], `stroke="${C.white}" stroke-width="2.5"`) + O(x - 4, y - 4, 4, "rgba(255,255,255,.55)"));
      });
      s += G("c-halo", O(345, 232, 20, "none", `stroke="${C.orange}" stroke-width="2.5" stroke-dasharray="4 4"`) + O(367, 212, 10, C.white, `stroke="${C.orange}" stroke-width="2"`) + T(367, 217, "?", 14, C.orange));
      s += G("c-tie", P("M30 214 H390", C.violet, 2.5, 'stroke-dasharray="8 6"'));
      /* traces from tokens back to their weight */
      TK.forEach(([w, c, sl], k) => {
        s += D(`M${CX[c]} ${264 - sl * 32} C${CX[c]} 170 ${WX[w]} 160 ${WX[w]} 104`, WC[w], 2.5, `c-tr c-tr${k}`);
      });
      /* weights */
      WX.forEach((x, k) => {
        let ic = "";
        if (k === 0) ic = G("c-jan", R(x - 12, 68, 24, 22, C.white, 3) + R(x - 12, 68, 24, 7, C.orange, 2) + T(x, 87, "1", 12, C.orange)) +
          G("c-5mo", T(x, 85, "5 MO", 12, C.white));
        if (k === 1) ic = R(x - 11, 71, 22, 16, C.white, 3) + T(x, 84, "1×", 12, C.navy);
        if (k === 2) ic = F(`M${x} 90 C${x - 16} 80 ${x - 12} 66 ${x} 74 C${x + 12} 66 ${x + 16} 80 ${x} 90 Z`, C.white);
        if (k === 3) ic = R(x - 13, 76, 9, 12, C.white, 1) + R(x - 2, 70, 9, 18, C.white, 1) + R(x + 9, 79, 6, 9, C.white, 1);
        if (k === 4) ic = P(`M${x - 12} 74 H${x + 12} M${x} 70 V90 M${x - 12} 74 L${x - 16} 84 H${x - 8} Z M${x + 12} 74 L${x + 8} 84 H${x + 16} Z`, C.white, 2);
        s += G(`c-w c-w${k}`, G(`c-wi c-wi${k}`, O(x, 80, 23, WC[k]) + ic) + T(x, k % 2 ? 137 : 119, WL[k], 14, WC[k], 'class="hl"'));
      });
      s += G("c-lens", O(0, 80, 29, "rgba(255,255,255,.2)", `stroke="${C.ink}" stroke-width="3"`) + P("M21 101 L32 112", C.ink, 5));
      /* rollback net */
      let mesh = "";
      for (let x = 30; x < 390; x += 20) mesh += `M${x} 312 L${x + 10} 320 L${x + 20} 312 `;
      s += G("c-netd", P(mesh, C.violet, 2, 'stroke-dasharray="3 4"') + P("M30 312 H390", C.violet, 2, 'stroke-dasharray="3 4"'));
      s += G("c-net", P(mesh, C.violet, 2.5) + P("M30 312 H390", C.violet, 2.5) + O(402, 312, 9, C.green) + tick(402, 312, 0.55));
      s += G("c-people", person(170, 236, 1.1, C.teal) + person(210, 228, 1.25, C.violet) + person(250, 236, 1.1, C.green));
      return s;
    },
    paint(a, b, t) {
      const half = t >= 0.5;
      const actW = b === 2 || b === 3 ? 0 : b === 4 ? 1 : (b === 5 && half) || b === 6 || (b === 7 && !half) ? 2 :
        (b === 7 && half) || b === 8 ? 3 : b === 9 || b === 10 ? 4 : -1;
      for (let k = 0; k < 5; k++) {
        const shown = b >= 2 || (b === 1 && half);
        a.to(".c-w" + k, { o: !shown ? 0 : b >= 14 ? 0.2 : (actW >= 0 && actW !== k ? 0.45 : 1), y: shown ? 0 : -20, e: "back", dl: b === 1 ? k * 0.1 : 0 });
        a.to(".c-wi" + k, { s: actW === k ? 1.18 : 1, e: "back" });
      }
      a.to(".c-jan", { o: b === 2 && half ? 0 : 1 });
      a.to(".c-5mo", { o: b === 2 && half ? 1 : 0 });
      const drop = [b >= 3, b >= 3, (b === 4 && half) || b >= 5, b >= 6, b >= 8, b >= 10];
      const WXo = [48, 48, 128, 210, 292, 372], TX = [75, 165, 345, 345, 165, 75], TY = [264, 264, 264, 232, 232, 232];
      for (let k = 0; k < 6; k++) {
        a.to(".c-tk" + k, { x: drop[k] ? 0 : WXo[k] - TX[k], y: drop[k] ? 0 : 80 - TY[k], o: drop[k] ? (b >= 14 ? 0.2 : 1) : 0, d: 0.9, e: drop[k] ? "back" : "io", dl: drop[k] && k === 1 ? 0.15 : 0 });
      }
      a.to(".c-cols", { o: b === 0 ? 1 : b >= 14 ? 0.2 : 1, y: b >= 14 ? 16 : 0 });
      for (let k = 0; k < 4; k++) {
        a.to(".c-col" + k, { sy: 1, s: b === 11 ? (half ? 1 : 1.03) : 1, r: b === 11 && !half ? (k % 2 ? 1.5 : -1.5) : 0 });
        a.to(".c-sp" + k, { o: b === 0 && half ? 1 : 0, s: b === 0 && half ? 1 : 0.3, e: "back", dl: k * 0.1 });
      }
      a.vis(".c-fit", b === 1, { s: b === 1 ? 1 : 1.04 });
      a.vis(".c-lid", b >= 4 && b < 14, { y: b >= 4 ? 0 : -30, e: "back" });
      a.vis(".c-halo", b === 7, { s: b === 7 ? 1 : 0.5, e: "back" });
      a.vis(".c-tie", b === 11 || b === 12);
      a.vis(".c-lens", (b === 11 && half) || b === 12, { x: b === 12 ? (half ? 292 : 128) : 48, d: 1 });
      for (let k = 0; k < 6; k++) a.to(".c-tr" + k, { dr: b === 12 ? 1 : 0, o: b === 12 ? 0.85 : 0, dl: b === 12 ? k * 0.12 : 0 });
      a.vis(".c-netd", b >= 5 && b <= 12 && !(b === 12 && half), { y: 0 });
      a.vis(".c-net", (b === 12 && half) || b === 13, { s: b === 13 ? 1 : 0.98 });
      a.vis(".c-people", b === 14, { y: b === 14 ? 0 : 30, e: "back" });
    }
  });

  /* ======================================================================
   * W12O2a · THE CHART RECORDER
   * Technique: a live plotting pen (3Blue1Brown traced curve) on running
   * graph paper. The pen draws the implementation dip in narration time;
   * depth and duration are measured, temporary capacity props the valley,
   * a sponsor's scissors hover over the worst week, and an alarm line
   * separates an expected dip from real failure. Below, a receptionist,
   * a growing queue and a walker on the employee change curve.
   * ==================================================================== */
  // template: Animated line chart lesson — https://observablehq.com/@d3/learn-d3-animation  (pen draws the implementation dip)
  // template: Waiting Queue — https://lottiefiles.com/free-animation/waiting-queue-xoNutPl764  (queue grows at the receptionist's desk)
  // template: Walk Cycle — https://lottiefiles.com/free-animation/walk-cycle-fXeAliCZ3E  (employee walks the change curve)
  // template: Health risk assessment — https://lottiefiles.com/free-animation/health-risk-assessment-bOhC3au0wY  (alarm line: dip versus failure)
  scene("W12O2a", {
    L: 27, M: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], hue: C.orange,
    aria: "A chart-recorder pen draws performance dipping after go-live and recovering, while an employee walks the change curve from announcement to commitment",
    labels: ["Before go-live", "Performance falls first", "Not a defect", "Conscious effort",
      "Sound process, real cost", "Dip or failure?", "The change curve", "Resistance, then exploring",
      "Commitment", "Support observed needs", "Forecast depth & duration", "Sponsor expectations",
      "Never an excuse", "Support comes next"],
    defs: (u) => `<clipPath id="${u}c"><rect x="20" y="50" width="380" height="156" rx="10"/></clipPath>`,
    bg: () => bigBg("#f6f1e8") + R(-1000, 300, 2420, 600, "#efe6d6"),
    art: (u) => {
      const curve = "M30 85 H110 C140 85 160 141 205 141 C245 141 255 102 285 100 C320 98 350 70 392 58";
      let s = R(20, 50, 380, 156, "#fffdf8", 10, `stroke="${C.slate}" stroke-width="2"`);
      let grid = "";
      for (let x = 20; x <= 440; x += 24) grid += `M${x} 50 V206 `;
      for (let y = 62; y <= 206; y += 24) grid += `M20 ${y} H440 `;
      s += `<g clip-path="url(#${u}c)">${G("d-grid", P(grid, "#efe3d0", 1.2))}</g>`;
      s += T(252, 70, "PERFORMANCE", 14, C.slate);
      s += G("d-go", P("M110 92 V180", C.slate, 2, 'stroke-dasharray="4 4"') + chip(110, 190, "GO-LIVE", 14, C.slate, C.white));
      s += G("d-ghost", P("M110 85 C140 85 160 116 205 116 C245 116 255 98 285 97", C.green, 3, 'stroke-dasharray="6 5"') +
        [160, 205, 250].map((x, k) => P(`M${x} 204 V${[106, 116, 108][k]}`, C.goldD, 4) + P(`M${x - 8} 204 H${x + 8}`, C.goldD, 4)).join("") +
        chip(330, 132, "WITH SUPPORT", 14, C.green, C.white));
      s += G("d-alarm", P("M30 188 H392", C.red, 2.5, 'stroke-dasharray="7 5"') + T(392, 182, "ALARM LINE", 14, C.red, 'class="hw"', "end"));
      s += G("d-gap", P("M205 147 V182 M200 152 L205 146 L210 152 M200 177 L205 183 L210 177", C.green, 2.5));
      s += `<path class="d-guide" d="${curve}" fill="none" stroke="none"/>`;
      s += D(curve, C.navy, 4, "d-trace");
      s += G("d-dip", chip(205, 166, "THE DIP", 14, C.orange, C.white));
      s += G("d-depth", P("M60 85 V141 M55 91 L60 85 L65 91 M55 135 L60 141 L65 135", C.violet, 2.5) + P("M60 141 H200", C.violet, 1.5, 'stroke-dasharray="3 4"') +
        T(70, 120, "DEPTH", 14, C.violet, 'class="hw"', "start"));
      s += G("d-dur", P("M110 168 H285 M116 163 L110 168 L116 173 M279 163 L285 168 L279 173", C.violet, 2.5) + T(197, 188, "DURATION", 14, C.violet, 'class="hw"'));
      s += G("d-sc", G("d-b1", P("M190 170 L222 150", C.ink, 4) + O(186, 173, 6, "none", `stroke="${C.ink}" stroke-width="3"`)) +
        G("d-b2", P("M190 150 L222 170", C.ink, 4) + O(186, 147, 6, "none", `stroke="${C.ink}" stroke-width="3"`)));
      s += G("d-lens", O(205, 188, 18, "rgba(255,255,255,.3)", `stroke="${C.ink}" stroke-width="3"`) + P("M218 201 L227 210", C.ink, 5));
      s += G("d-end", O(392, 58, 10, C.green) + tick(392, 58, 0.6));
      s += G("d-pen", P("M0 0 L-7 -16 L7 -16 Z", C.ink, 2) + F("M0 0 L-7 -16 L7 -16 Z", C.gold) + O(0, 0, 4, C.orange) + P("M0 -16 V-30", C.ink, 3));
      /* receptionist zone */
      s += G("d-bub", O(104, 232, 4, C.white, `stroke="${C.slate}" stroke-width="1.5"`) + O(114, 224, 5, C.white, `stroke="${C.slate}" stroke-width="1.5"`) +
        R(120, 210, 104, 30, C.white, 15, `stroke="${C.slate}" stroke-width="2"`) +
        [140, 172, 204].map((x, k) => O(x, 225, 10, [C.teal, C.violet, C.orange][k]) + T(x, 230, k + 1, 13, C.white)).join("") +
        P("M151 225 H161 M183 225 H193", C.slate, 2));
      s += G("d-rec", person(90, 248, 1, C.green) + G("d-star", O(108, 226, 8, C.gold) + tick(108, 226, 0.5)) + R(40, 260, 112, 8, C.ink, 3) + R(46, 268, 100, 22, C.navy, 4) + R(60, 276, 72, 4, C.blue, 2));
      for (let k = 0; k < 2; k++) s += G(`d-h d-h${k}`, person(176 + k * 34, 252, 0.9, C.teal) + P(`M${168 + k * 34} 230 C${168 + k * 34} 222 ${184 + k * 34} 222 ${184 + k * 34} 230`, C.white, 2));
      for (let k = 0; k < 5; k++) s += G(`d-q d-q${k}`, person(0, 0, 0.7, C.slate) + G("d-qk", O(9, -22, 6, C.green) + tick(9, -22, 0.35)));
      s += G("d-spon", person(316, 270, 1.05, C.violet) + R(334, 248, 34, 26, C.white, 3, `stroke="${C.violet}" stroke-width="2"`) + P("M338 254 L346 262 L352 258 L362 268", C.orange, 2.5) +
        T(316, 312, "SPONSOR", 14, C.violet, 'class="hl"'));
      /* change curve */
      s += G("d-u", P("M240 238 C250 282 262 292 275 292 L345 292 C362 292 382 280 392 236", C.mist, 6) +
        [[240, 238], [275, 292], [345, 292], [392, 236]].map(([x, y], k) => O(x, y, 7, C.white, `stroke="${[C.slate, C.orange, C.teal, C.green][k]}" stroke-width="3"`)).join("") +
        T(240, 224, "ANNOUNCE", 14, C.slate, 'class="hl"') + T(275, 316, "RESIST", 14, C.orange, 'class="hl"') +
        T(345, 316, "EXPLORE", 14, C.teal, 'class="hl"') + T(410, 222, "COMMIT", 14, C.green, 'class="hl"', "end"));
      const face = (c) => O(0, 0, 10, c, `stroke="${C.white}" stroke-width="2"`) + O(-3, -2, 1.6, C.white) + O(3, -2, 1.6, C.white);
      s += G("d-wk", face(C.navy));
      s += G("d-wq", O(-20, 2, 9, C.white, `stroke="${C.orange}" stroke-width="2"`) + T(-20, 7, "?", 14, C.orange));
      for (let k = 0; k < 3; k++) s += G(`d-w d-w${k}`, face([C.slate, C.teal, C.green][k]));
      s += G("d-help", [[275, 292], [345, 292]].map(([x, y]) => O(x + 14, y - 16, 8, C.green) + P(`M${x + 10} ${y - 16} H${x + 18} M${x + 14} ${y - 20} V${y - 12}`, C.white, 2)).join(""));
      return s;
    },
    paint(a, b, t, m) {
      const half = t >= 0.5;
      const F_ = [0.2, half ? 0.44 : 0.36, 0.48, 0.5, half ? 0.53 : 0.52, 0.54, 0.55, half ? 0.57 : 0.56, 0.58, 0.59, 0.6, 0.6, half ? 1 : 0.64, 1][b];
      a.to(".d-trace", { dr: F_, d: 1.2, e: "lin" });
      const p = a.pt(".d-guide", F_) || { x: 30, y: 85 };
      a.to(".d-pen", { x: p.x, y: p.y, d: 1.2, e: "lin" });
      a.to(".d-grid", { x: -((m.li * 8) % 24), d: 0.6 });
      a.vis(".d-go", (b === 0 && half) || (b >= 1 && b <= 3) || (b === 4 && !half));
      a.vis(".d-dip", (b === 1 && half) || b === 2 || b === 3);
      const alarm = b === 5 || b === 12 || (b === 4 && half);
      a.to(".d-alarm", { o: alarm ? 1 : (b >= 6 && b <= 9 ? 0.35 : 0) });
      a.vis(".d-gap", b === 5);
      a.vis(".d-depth", b === 10);
      a.vis(".d-dur", b === 10 && !half);
      a.vis(".d-ghost", b === 10 && half);
      a.vis(".d-sc", b === 11, { y: b === 11 ? 0 : -14 });
      a.to(".d-b1", { r: b === 11 && half ? 12 : -2, ox: 206, oy: 160 });
      a.to(".d-b2", { r: b === 11 && half ? -12 : 2, ox: 206, oy: 160 });
      a.vis(".d-lens", b === 12 && !half, { x: b === 12 ? 0 : -30 });
      a.vis(".d-end", b === 13 || (b === 12 && half), { s: 1, e: "back", dl: 1 });
      /* receptionist */
      a.vis(".d-rec", true);
      a.to(".d-star", { o: b === 13 ? 1 : 0, s: b === 13 ? 1 : 0.3, e: "back" });
      a.vis(".d-bub", (b === 2 && half) || b === 3 || b === 4, { s: b === 4 ? 0.95 : 1 });
      a.vis(".d-h0", b === 9 || b === 10 || b === 11, { x: b >= 9 && b <= 11 ? 0 : 40 });
      a.vis(".d-h1", (b === 10 && half) || b === 11, { x: (b === 10 && half) || b === 11 ? 0 : 40 });
      const qn = b === 0 ? 1 : b === 1 || b === 2 ? 2 : b === 3 ? (half ? 4 : 3) : b === 4 ? 5 : b === 13 ? 4 : 0;
      for (let k = 0; k < 5; k++) {
        const served = b === 13;
        a.to(".d-q" + k, { x: k < qn ? (served ? 250 + k * 34 : 182 + k * 32) : 420, y: 294, o: k < qn ? 1 : 0, dl: k * 0.08, d: 0.9 });
      }
      a.to(".d-qk", { o: b === 13 ? 1 : 0 });
      a.vis(".d-spon", b === 11 || (b === 12 && !half), { x: b === 11 || b === 12 ? 0 : 30 });
      /* change curve */
      const cu = (b === 5 && half) || (b >= 6 && b <= 9);
      a.to(".d-u", { o: cu ? 1 : (b === 10 ? 0.25 : 0) });
      const STOP = [[240, 238], [275, 292], [345, 292], [392, 236]];
      let st = 0;
      if (b === 7) st = half ? 2 : 1;
      if (b >= 8) st = 3;
      const many = (b === 8 && half) || b === 9;
      a.to(".d-wk", { x: STOP[st][0], y: STOP[st][1], o: cu && !many ? 1 : 0, s: b === 6 && half ? 1.2 : 1, d: 1 });
      a.vis(".d-wq", b === 6 && half, { x: STOP[0][0], y: STOP[0][1] });
      for (let k = 0; k < 3; k++) a.to(".d-w" + k, { x: STOP[k + 1][0], y: STOP[k + 1][1], o: many ? 1 : 0, dl: k * 0.12 });
      a.vis(".d-help", b === 9, { s: 1, e: "back" });
    }
  });
})();


// OPER621 · Week 12 · The Implement Phase — animated teaching scenes (version 1, label: claude)
// File: w12-claude-part2.js  ·  Scenes: W12O2b, W12O2c, W12O1d
// Every narration line maps to one named shot family (its benchmark template is
// named in a "// template:" comment above the family) whose state shows what that
// sentence says about Qasr Hospitality Group's implementation decision.
// Standalone part: defines every helper it uses, registers its scenes and appends
// its own scoped rules (.vls-w12-<secId>) into the single shared <style id="vl-sc-w12">.
// Contract: VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
// step(i, n): i = narration line index, n = number of lines (proportional otherwise).
// Uses window.gsap when present, otherwise CSS transitions; honours prefers-reduced-motion.
(() => {
"use strict";
const PART = "p2";
// ===== shared engine (a self-contained copy lives in every part) =====
window.VL_SCENES = window.VL_SCENES || {};
const VL_SCENES = window.VL_SCENES;
const SCENE_BG = [];
const C = {
  navy: "#1f4e79", navy2: "#2d6a9f", orange: "#c0502a", paper: "#fbf8f1",
  ink: "#1b2a3a", blue: "#dbe7f2", green: "#317c61", gold: "#e5b76c",
  muted: "#91aabd", plum: "#6b4e8a", sand: "#efe4cf", sky: "#eaf2f8",
  red: "#b0362b", white: "#ffffff", mint: "#e1f0e8", peach: "#f8e3d8",
  lilac: "#ece6f3", slate: "#5d7389", teal: "#1f7f99", amber: "#a8741a", grey: "#c5ced8"
};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const num = (v, f) => { const x = Number(v); return Number.isFinite(x) ? x : f; };
const reduced = () => {
  try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
  catch (_) { return false; }
};
const hasG = () => !!(window.gsap && typeof window.gsap.to === "function" && typeof window.gsap.set === "function") && !reduced();
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");

// ---- SVG string builders ----
const R = (x, y, w, h, f, rx = 0, ex = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${ex}/>`;
const O = (cx, cy, r, f, ex = "") => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${ex}/>`;
const P = (d, s, w = 2, ex = "") => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const F = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
const D = (k, d, s, w = 3, ex = "") => `<path data-k="${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100" ${ex}/>`;
const T = (x, y, s, sz = 14, f = C.ink, ex = "", a = "middle") => `<text x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const TK = (k, x, y, s, sz = 14, f = C.ink, a = "middle", ex = "") => `<text data-k="${k}" x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const K = (k, body, ex = "") => `<g data-k="${k}" ${ex}>${body}</g>`;
const H = (k, body, ex = "") => `<g data-k="${k}" style="opacity:0" ${ex}>${body}</g>`;
const tw = (s, sz) => Math.round(String(s).length * sz * 0.6 + sz * 1.3);
const chip = (x, y, s, o = {}) => {
  const sz = o.sz || 13, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.9);
  return R(x - w / 2, y - h / 2, w, h, o.bg || C.white, o.rx == null ? h / 2 : o.rx,
    `stroke="${o.st || C.navy}" stroke-width="${o.sw || 1.8}"${o.dash ? ' stroke-dasharray="4 3"' : ""}`) +
    T(x, y + sz * 0.36, s, sz, o.fg || C.navy);
};
const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${x - 7 * s} ${y} l${5 * s} ${5 * s} l${10 * s} ${-11 * s}`, col, w);
const cross = (x, y, s = 1, col = C.orange, w = 3) => P(`M${x - 6 * s} ${y - 6 * s} l${12 * s} ${12 * s} M${x + 6 * s} ${y - 6 * s} l${-12 * s} ${12 * s}`, col, w);
const person = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}</g>`;
const buddy = (x, y, r, col) => O(x, y, r, col) + O(x - r * 0.35, y - r * 0.12, r * 0.24, C.white) + O(x + r * 0.35, y - r * 0.12, r * 0.24, C.white) + O(x - r * 0.3, y - r * 0.08, r * 0.11, C.ink) + O(x + r * 0.4, y - r * 0.08, r * 0.11, C.ink);
const clockI = (x, y, r, col = C.orange, bg = C.white) => O(x, y, r, bg, `stroke="${col}" stroke-width="${Math.max(2, r / 6)}"`) + P(`M${x} ${y - r * 0.62} V${y} L${x + r * 0.45} ${y + r * 0.3}`, col, Math.max(2, r / 7));
const star = (x, y, s = 1, col = C.gold) => F(`M${x} ${y - 10 * s} l${3 * s} ${6 * s} ${7 * s} ${1 * s} ${-5 * s} ${5 * s} ${1 * s} ${7 * s} ${-6 * s} ${-3 * s} ${-6 * s} ${3 * s} ${1 * s} ${-7 * s} ${-5 * s} ${-5 * s} ${7 * s} ${-1 * s} Z`, col, `stroke="${C.amber}" stroke-width="1"`);
const house = (x, y, col = C.navy, s = 1, fill = C.white) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M-13 -2 L0 -14 L13 -2 Z", col)}${R(-11, -2, 22, 16, fill, 1, `stroke="${col}" stroke-width="2"`)}${R(-3, 5, 6, 9, col, 1)}</g>`;
const kioskI = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-14, -52, 28, 52, col, 6)}${R(-10, -47, 20, 18, C.blue, 3)}${R(-7, -42, 14, 3, C.green, 1)}${R(-7, -37, 10, 2.5, C.white, 1)}${R(-5, -20, 10, 8, C.ink, 2)}${R(-18, -2, 36, 5, C.slate, 2)}</g>`;
const keyI = (x, y, col = C.amber, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, 0, 5.5, "none", `stroke="${col}" stroke-width="3"`)}${P("M5.5 0 H17 M13 0 V5 M17 0 V4", col, 3)}</g>`;
const wrenchI = (x, y, col = C.slate, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${P("M-8 8 L3 -3", col, 4.5)}${P("M1 -9 A7 7 0 1 0 9 -1", col, 3.5)}</g>`;
const lockI = (x, y, col = C.slate, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-9, -4, 18, 14, col, 3)}${P("M-5 -4 V-8 A5 5 0 0 1 5 -8 V-4", col, 2.6)}</g>`;
const docI = (x, y, col = C.navy, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-11, -14, 22, 28, C.white, 2, `stroke="${col}" stroke-width="2"`)}${P("M-6 -6 h12 M-6 0 h12 M-6 6 h8", col, 1.6)}</g>`;
const calI = (x, y, col = C.navy, s = 1, txt = "") => `<g transform="translate(${x} ${y}) scale(${s})">${R(-13, -12, 26, 24, C.white, 3, `stroke="${col}" stroke-width="2"`)}${R(-13, -12, 26, 7, col, 2)}${txt ? T(0, 9, txt, 11, col) : ""}</g>`;
const flagI = (x, y, col = C.green, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${P("M0 12 V-14", C.ink, 2.4)}${F("M0 -14 L16 -9 L0 -3 Z", col)}</g>`;
const magI = (x, y, r = 16, col = C.ink) => O(x, y, r, "rgba(255,255,255,.3)", `stroke="${col}" stroke-width="3"`) + P(`M${x + r * 0.7} ${y + r * 0.7} L${x + r * 1.3} ${y + r * 1.3}`, col, 5);
const megaI = (x, y, col = C.orange, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M-10 -4 L6 -12 V12 L-10 4 Z", col)}${R(-16, -5, 7, 10, col, 2)}${P("M10 -6 Q14 0 10 6 M13 -10 Q20 0 13 10", col, 2)}</g>`;
const barrierI = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${P("M-20 12 V-10 M20 12 V-10", C.ink, 3)}${R(-24, -10, 48, 10, C.white, 2, `stroke="${C.red}" stroke-width="2"`)}${rep(4, (i) => F(`M${-20 + i * 12} -10 l6 0 l-5 10 l-6 0 Z`, C.red))}</g>`;
const undoI = (x, y, col = C.plum, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${P("M10 8 A11 11 0 1 0 -8 -6", col, 3.6)}${F("M-15 -12 L-4 -10 L-11 -1 Z", col)}</g>`;
const gearI = (x, y, r, col, hole = C.paper) => {
  let d = ""; const n = 8;
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n * 0.55, a2 = a0 + Math.PI / n, a3 = a2 + Math.PI / n * 0.45;
    const p = (a, rr) => `${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`;
    d += (i ? "L" : "M") + p(a0, r) + "L" + p(a1, r) + "L" + p(a2, r * 0.78) + "L" + p(a3, r * 0.78);
  }
  return F(d + "Z", col) + O(x, y, r * 0.34, hole);
};
const shieldI = (x, y, col = C.green, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M0 -16 L14 -10 V2 C14 10 7 15 0 18 C-7 15 -14 10 -14 2 V-10 Z", col)}${tick(0, 1, 0.7, C.white, 2.6)}</g>`;
const bookI = (x, y, col = C.teal, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M-16 -10 Q-8 -14 0 -9 Q8 -14 16 -10 V12 Q8 8 0 13 Q-8 8 -16 12 Z", col)}${P("M0 -9 V13", C.white, 1.6)}</g>`;
const chartI = (x, y, col = C.navy, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-16, -14, 32, 28, C.white, 3, `stroke="${col}" stroke-width="2"`)}${P("M-11 7 L-4 0 L2 4 L11 -8", col, 2.6)}</g>`;
const crowdI = (x, y, col = C.slate) => person(x - 14, y, 0.75, col) + person(x + 14, y, 0.75, col) + person(x, y + 4, 0.85, col);
const cloudI = (x, y, col = C.slate) => F(`M${x - 22} ${y + 8} Q${x - 30} ${y - 6} ${x - 14} ${y - 8} Q${x - 10} ${y - 22} ${x + 4} ${y - 14} Q${x + 20} ${y - 22} ${x + 22} ${y - 4} Q${x + 32} ${y + 6} ${x + 18} ${y + 10} Z`, C.white, `stroke="${col}" stroke-width="2"`);
const ICONS = {
  person: (x, y) => person(x, y + 6, 1.4, C.navy), kiosk: (x, y) => kioskI(x, y + 26, 0.85), doc: (x, y) => docI(x, y, C.navy, 1.3),
  clock: (x, y) => clockI(x, y, 20, C.orange), flag: (x, y) => flagI(x - 6, y, C.green, 1.4), stop: (x, y) => barrierI(x, y, 1.1),
  undo: (x, y) => undoI(x, y, C.plum, 1.3), key: (x, y) => keyI(x - 10, y, C.amber, 1.5), chart: (x, y) => chartI(x, y, C.navy, 1.2),
  shield: (x, y) => shieldI(x, y, C.green, 1.2), gear: (x, y) => gearI(x, y, 20, C.slate, C.white), hotel: (x, y) => house(x, y + 4, C.navy, 1.6),
  book: (x, y) => bookI(x, y, C.teal, 1.3), cal: (x, y) => calI(x, y, C.navy, 1.4, "1"), cloud: (x, y) => cloudI(x, y, C.slate),
  crowd: (x, y) => crowdI(x, y + 4, C.slate), lock: (x, y) => lockI(x, y + 2, C.slate, 1.5), wrench: (x, y) => wrenchI(x, y, C.slate, 1.5)
};

// ---- marks: ok / x / q / w ----
const MK = {
  ok: (x, y, s) => O(x, y, 11 * s, C.green) + tick(x, y, 0.62 * s, C.white, 2.4),
  x: (x, y, s) => O(x, y, 11 * s, C.red) + cross(x, y, 0.62 * s, C.white, 2.4),
  q: (x, y, s) => O(x, y, 11 * s, C.white, `stroke="${C.orange}" stroke-width="2.2"`) + T(x, y + 5.2 * s, "?", 15 * s, C.orange),
  w: (x, y, s) => F(`M${x} ${y - 11 * s} L${x + 12 * s} ${y + 9 * s} L${x - 12 * s} ${y + 9 * s} Z`, C.gold, `stroke="${C.amber}" stroke-width="1.5"`) + T(x, y + 6 * s, "!", 13 * s, C.ink)
};

// ---- prefixed builders for shot families ----
const pfx = (p) => ({
  p,
  K: (k, b, e) => K(p + k, b, e),
  H: (k, b, e) => H(p + k, b, e),
  D: (k, d, s, w, e) => D(p + k, d, s, w, e),
  TK: (k, x, y, s, sz, f, a, e) => TK(p + k, x, y, s, sz, f, a, e)
});
const pc = (c, p) => {
  const o = { p, snap: c.snap, all: c.all, opEl: c.opEl, mvEl: c.mvEl, flEl: c.flEl, data: c.data };
  ["op", "mv", "dr", "fl", "tx", "cl"].forEach((m) => { o[m] = (k, ...a) => c[m](p + k, ...a); });
  o.vis = (m, t) => { const q = {}; Object.keys(m).forEach((k) => { q[p + k] = m[k]; }); c.vis(q, t); };
  return o;
};
const markSVG = (f, key, x, y, s = 1) => Object.keys(MK).map((m) => f.H(key + m, MK[m](x, y, s))).join("");
const setMark = (c, key, m) => Object.keys(MK).forEach((q) => c.op(key + q, q === m ? 1 : 0, { dl: q === m ? 0.25 : 0 }));

// ---- auto-sized note chips: N(avy) O(range) R(ed) G(reen) P(lum) A(mber) F(illed) ----
const NOTE_COL = { N: [C.navy, C.white, C.navy], O: [C.orange, C.white, C.orange], R: [C.red, C.white, C.red], G: [C.green, C.white, C.green], P: [C.plum, C.white, C.plum], F: [C.navy, C.navy, C.white], A: [C.amber, C.white, C.amber] };
const noteSVG = (f, key, x, y, sz = 14) => f.H(key, R(x - 40, y - 14, 80, 28, C.white, 14, `stroke="${C.navy}" stroke-width="2"`) +
  `<text x="${x}" y="${y + sz * 0.36}" font-size="${sz}" fill="${C.navy}" text-anchor="middle"></text>`, `data-cx="${x}" data-sz="${sz}"`);
function setNote(c, key, n) {
  if (!n) { c.op(key, 0); return; }
  const t = typeof n === "string" ? n : n.t;
  const v = typeof n === "string" ? "N" : (n.c || "N");
  const col = NOTE_COL[v] || NOTE_COL.N;
  c.all(`[data-k="${c.p}${key}"]`).forEach((g) => {
    const r = g.querySelector("rect"), tx = g.querySelector("text");
    const cx = +g.getAttribute("data-cx"), sz = +g.getAttribute("data-sz") || 14;
    const w = Math.round(t.length * sz * 0.6 + sz * 1.7);
    const x0 = clamp(cx - w / 2, 4, 396 - w);
    if (r) { r.setAttribute("x", String(x0)); r.setAttribute("width", String(w)); r.setAttribute("stroke", col[0]); r.setAttribute("fill", col[1]); }
    if (tx) { tx.setAttribute("x", String(x0 + w / 2)); tx.setAttribute("fill", col[2]); if (tx.textContent !== t) tx.textContent = t; }
  });
  c.op(key, 1, { dl: 0.15 });
}

// ---- per-part stylesheet (appended once into the shared <style id="vl-sc-w12">) ----
const AN = "vlsw12c" + PART;
function sceneCSS(id, bg) {
  const s = ".vls-w12-" + id;
  return `
${s}{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:220px;overflow:hidden!important;box-sizing:border-box;border-radius:14px;background:${bg};color:${C.ink};font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w12-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w12-fig>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}
${s} svg text{font-family:inherit;font-weight:800;letter-spacing:.1px}
${s} [data-k]{transform-box:fill-box;transform-origin:50% 50%}
${s}.w12-css [data-k]{transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.85s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}
${s}.w12-snap [data-k],${s}.w12-rm [data-k]{transition:none!important}
${s}.w12-rm *,${s}.w12-snap *{animation:none!important}
${s} .w12-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:38px;padding:6px 12px 8px;font-size:15px;font-weight:800;line-height:1.25;color:${C.navy};background:rgba(255,255,255,.62);border-top:1px solid rgba(31,78,121,.12)}
${s} .w12-num{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w12-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.2px}
${s} .w12-lab.w12-in{animation:${AN}CapIn .5s cubic-bezier(.22,.8,.24,1)}
${s} .w12-bar{flex:0 0 54px;height:4px;border-radius:4px;background:rgba(31,78,121,.15);overflow:hidden}
${s} .w12-bar i{display:block;height:100%;width:0;background:${C.orange};transition:width .6s ease}
${s}.w12-intro .w12-fig>svg{animation:${AN}Intro .7s cubic-bezier(.22,.8,.24,1)}
${s} .a-flow{stroke-dasharray:6 7;animation:${AN}Flow 1.1s linear infinite}
${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:${AN}Spin 6s linear infinite}
${s} .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:${AN}Bob 2.6s ease-in-out infinite}
${s} .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:${AN}Pulse 2s ease-in-out infinite}
${s} .a-blink{animation:${AN}Blink 1.4s ease-in-out infinite}
${s} .a-shake{transform-box:fill-box;transform-origin:50% 50%;animation:${AN}Shake .9s ease-in-out infinite}
@media (max-width:420px){${s} .w12-cap{font-size:14px;min-height:34px;padding:5px 10px 7px}${s} .w12-bar{flex-basis:40px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
}
const KEYFRAMES = `
@keyframes ${AN}CapIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes ${AN}Intro{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
@keyframes ${AN}Flow{to{stroke-dashoffset:-26}}
@keyframes ${AN}Spin{to{transform:rotate(360deg)}}
@keyframes ${AN}Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes ${AN}Pulse{0%,100%{opacity:.35;transform:scale(.94)}50%{opacity:.95;transform:scale(1.06)}}
@keyframes ${AN}Blink{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes ${AN}Shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}
`;
function addStyles(list) {
  if (typeof document === "undefined") return;
  let st = document.getElementById("vl-sc-w12");
  if (!st) { st = document.createElement("style"); st.id = "vl-sc-w12"; (document.head || document.documentElement).appendChild(st); }
  const flag = "w12claude" + PART;
  if (st.getAttribute("data-" + flag)) return;
  st.setAttribute("data-" + flag, "1");
  st.appendChild(document.createTextNode(KEYFRAMES + list.map(([id, bg]) => sceneCSS(id, bg)).join("\n")));
}

// ---- scene factory: build(el), step(i, n), reset() ----
// step(i, n): i = narration line index, n = number of narration lines in the section.
// When n equals the plan length each line gets its own state; any other n maps proportionally.
function makeScene(cfg) {
  const { id, N, labels } = cfg;
  let root = null, useG = false;
  const mapK = (i, n) => {
    const nn = Math.max(1, Math.floor(num(n, N)));
    const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
    return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
  };
  const nodes = (k) => (root ? Array.prototype.slice.call(root.querySelectorAll('[data-k="' + k + '"]')) : []);
  function timing(el, t) {
    el.style.transitionDuration = (t.d == null ? 0.85 : t.d) + "s";
    el.style.transitionDelay = (t.dl || 0) + "s";
  }
  function tf(el, st, t, snap) {
    const x = st.x || 0, y = st.y || 0, r = st.r || 0;
    const sx = st.sx != null ? st.sx : (st.s != null ? st.s : 1);
    const sy = st.sy != null ? st.sy : (st.s != null ? st.s : 1);
    if (useG) {
      const v = { x, y, rotation: r, scaleX: sx, scaleY: sy };
      if (st.pv) v.svgOrigin = st.pv[0] + " " + st.pv[1]; else v.transformOrigin = "50% 50%";
      if (snap) window.gsap.set(el, v);
      else window.gsap.to(el, Object.assign(v, { duration: t.d == null ? 0.85 : t.d, delay: t.dl || 0, ease: t.e || "power3.out", overwrite: "auto" }));
    } else {
      if (st.pv) { el.style.transformBox = "view-box"; el.style.transformOrigin = st.pv[0] + "px " + st.pv[1] + "px"; }
      timing(el, t);
      el.style.transform = "translate(" + x + "px," + y + "px) rotate(" + r + "deg) scale(" + sx + "," + sy + ")";
    }
  }
  function op(el, o, t, snap) {
    if (useG) { if (snap) window.gsap.set(el, { opacity: o }); else window.gsap.to(el, { opacity: o, duration: t.d == null ? 0.6 : t.d, delay: t.dl || 0, ease: "power1.out", overwrite: false }); }
    else { timing(el, t); el.style.opacity = String(o); }
  }
  function dash(el, f, t, snap) {
    const v = 100 * (1 - clamp(f, 0, 1));
    if (useG) { if (snap) window.gsap.set(el, { strokeDashoffset: v }); else window.gsap.to(el, { strokeDashoffset: v, duration: t.d == null ? 1.1 : t.d, delay: t.dl || 0, ease: "power2.inOut" }); }
    else { timing(el, t); el.style.strokeDashoffset = String(v); }
  }
  function fill(el, col, t, snap) {
    if (useG) { if (snap) window.gsap.set(el, { fill: col }); else window.gsap.to(el, { fill: col, duration: t.d == null ? 0.6 : t.d, delay: t.dl || 0 }); }
    else { timing(el, t); el.style.fill = col; }
  }
  function ctx(snap) {
    return {
      snap,
      op: (k, o, t = {}) => nodes(k).forEach((el) => op(el, o, t, snap)),
      mv: (k, st, t = {}) => nodes(k).forEach((el) => tf(el, st, t, snap)),
      dr: (k, f, t = {}) => nodes(k).forEach((el) => dash(el, f, t, snap)),
      fl: (k, col, t = {}) => nodes(k).forEach((el) => fill(el, col, t, snap)),
      tx: (k, s) => nodes(k).forEach((el) => { if (el.textContent !== String(s)) el.textContent = String(s); }),
      cl: (k, cls, on) => nodes(k).forEach((el) => el.classList.toggle(cls, !!on)),
      vis: (map, t = {}) => Object.keys(map).forEach((k) => { const v = map[k]; const o = typeof v === "number" ? clamp(v, 0, 1) : (v ? 1 : 0); nodes(k).forEach((el) => op(el, o, t, snap)); }),
      all: (sel) => (root ? Array.prototype.slice.call(root.querySelectorAll(sel)) : []),
      opEl: (el, o, t = {}) => op(el, o, t, snap),
      mvEl: (el, st, t = {}) => tf(el, st, t, snap),
      flEl: (el, col, t = {}) => fill(el, col, t, snap),
      data: (n, v) => { if (root) root.setAttribute("data-" + n, String(v)); }
    };
  }
  function caption(k, snap) {
    const lab = root.querySelector(".w12-lab"), nn = root.querySelector(".w12-num"), bar = root.querySelector(".w12-bar i");
    const txt = labels[k] || "";
    if (lab && lab.textContent !== txt) {
      lab.textContent = txt;
      if (!snap && !reduced()) { lab.classList.remove("w12-in"); void lab.offsetWidth; lab.classList.add("w12-in"); }
    }
    if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
    if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
  }
  function render(k, snap) {
    if (!root) return;
    if (snap) root.classList.add("w12-snap");
    try { cfg.render(ctx(snap), k); } catch (e) { if (window.console) console.warn("[VL W12 " + id + "]", e); }
    caption(k, snap);
    if (snap) { void root.offsetWidth; root.classList.remove("w12-snap"); }
    root.setAttribute("data-moment", String(k));
  }
  function kill() {
    if (root && useG) { try { window.gsap.killTweensOf(root.querySelectorAll("[data-k]")); } catch (_) {} }
  }
  function mount(el) {
    const r = document.createElement("div");
    r.className = "vls-w12-" + id + " w12-root" + (useG ? " w12-gsap" : " w12-css") + (reduced() ? " w12-rm" : " w12-intro");
    r.setAttribute("data-scene", id);
    r.innerHTML = '<div class="w12-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
      esc(cfg.desc) + '">' + cfg.draw() + '</svg></div><div class="w12-cap" aria-live="polite"><span class="w12-num"></span><span class="w12-lab"></span><span class="w12-bar"><i></i></span></div>';
    if (typeof el.replaceChildren === "function") el.replaceChildren(r);
    else { el.innerHTML = ""; el.appendChild(r); }
    return r;
  }
  return {
    build(el) {
      if (!el || el.nodeType !== 1) return;
      kill();
      useG = hasG();
      root = mount(el);
      render(0, true);
    },
    step(i, n) { if (!root) return; render(mapK(i, n), false); },
    reset() { if (!root) return; kill(); render(0, true); }
  };
}

// ---- shot-based scene: every narration line names one shot family + its state + a caption ----
function shotScene(cfg) {
  const names = Object.keys(cfg.shots);
  const draw = () => R(-400, -300, 1200, 900, cfg.bg) +
    names.map((nm) => `<g data-k="SH_${nm}" style="opacity:0">${cfg.shots[nm].draw()}</g>`).join("");
  const render = (c, k) => {
    const [act, st] = cfg.plan[k];
    names.forEach((nm) => {
      const on = nm === act;
      c.op("SH_" + nm, on ? 1 : 0, { d: on ? 0.55 : 0.35, dl: on ? 0.12 : 0 });
      c.mv("SH_" + nm, on ? {} : { y: 10, s: 0.97 }, { d: 0.6 });
    });
    const shot = cfg.shots[act];
    shot.render(pc(c, shot.p), st || {}, k);
    c.data("benchmark", shot.bench);
    c.data("shot", act);
  };
  return makeScene({ id: cfg.id, N: cfg.plan.length, labels: cfg.plan.map((x) => x[2]), draw, render, desc: cfg.desc });
}


// =====================================================================
// SHOT FAMILY: LOBBY — Qasr reception: kiosk route, assisted desk,
// rejected corporate booking, queue, floor coach, supervisor's authority,
// heritage lobby with no room for a kiosk.
// template: Customer Support — https://lottiefiles.com/free-animation/customer-support-TrBfuCgebx
// template: Waiting Queue — https://lottiefiles.com/free-animation/waiting-queue-xoNutPl764
// =====================================================================
function F_LOBBY(p) {
  const f = pfx(p);
  const GP = { door: [24, 214], kiosk: [76, 214], wait: [160, 214], desk: [228, 214], done: [384, 214] };
  return {
    p, bench: "Customer Support + Waiting Queue (LottieFiles)",
    draw() {
      let s = R(-400, 236, 1200, 400, "#efe6d6") + P("M-400 236 H800", "#d8c7a6", 2);
      s += [70, 200, 330].map((x) => F(`M${x - 40} 236 V100 C${x - 40} 64 ${x + 40} 64 ${x + 40} 100 V236 Z`, "#e6edf4")).join("");
      s += f.H("wl", R(-400, 30, 452, 206, "#d6c6a6") + P("M52 30 V236", "#b9a57e", 3));
      s += f.H("wr", R(352, 30, 460, 206, "#d6c6a6") + P("M352 30 V236", "#b9a57e", 3));
      s += f.K("kio", kioskI(112, 234, 1.3));
      s += f.H("kok", O(112, 150, 12, C.green) + tick(112, 150, 0.65, C.white, 2.6));
      s += f.H("noK", R(82, 160, 60, 76, "rgba(255,255,255,.6)", 6, `stroke="${C.red}" stroke-width="2.6" stroke-dasharray="5 4"`) + cross(112, 198, 1.5, C.red, 4.5) + chip(112, 136, "No room for kiosk", { sz: 13, st: C.red, fg: C.red }));
      s += f.H("rej", O(136, 168, 13, C.red) + cross(136, 168, 0.65, C.white, 2.6) + chip(112, 136, "Rejected", { sz: 13, st: C.red, fg: C.red }));
      s += K(p + "desk", R(246, 196, 124, 9, C.ink, 3) + R(252, 205, 112, 31, C.navy, 4) + R(270, 214, 76, 4, C.blue, 2));
      s += K(p + "rcp", person(300, 188, 1.15, C.green));
      s += f.H("q", O(326, 146, 14, C.white, `stroke="${C.orange}" stroke-width="2.4"`) + T(326, 152, "?", 18, C.orange));
      s += f.H("help", person(342, 190, 1.05, C.plum) + O(356, 160, 9, C.gold) + T(356, 164.5, "!", 13, C.ink));
      s += f.H("sup", person(374, 186, 1.1, C.navy2) + keyI(352, 156, C.amber, 1));
      s += f.H("route", P("M136 200 C176 150 216 150 250 188", C.orange, 3.6, 'class="a-flow"') + chip(194, 140, "Assisted path", { sz: 13, st: C.orange, fg: C.orange }));
      s += f.H("tK", chip(112, 64, "Kiosk: 2 min", { sz: 14, st: C.green, fg: C.green }));
      s += f.H("tA", chip(304, 64, "Assisted: 9 min", { sz: 14, st: C.orange, fg: C.orange }));
      s += f.H("busy", clockI(30, 66, 14, C.red) + T(50, 71, "Busy shift", 13, C.red, "", "start"));
      for (let i = 0; i < 5; i++) s += f.H("qp" + i, person(24 + i * 26, 274, 0.78, C.slate));
      s += f.H("g", `<g class="a-bob">${buddy(0, 0, 13, C.navy2)}</g>` + f.H("corp", R(8, -2, 22, 14, C.orange, 3) + T(19, 8.5, "CORP", 8, C.white)));
      s += noteSVG(f, "nt", 200, 24) + noteSVG(f, "nb", 230, 284) + noteSVG(f, "nr", 304, 104) + noteSVG(f, "nl", 112, 104);
      return s;
    },
    render(c, s) {
      c.vis({ wl: s.small, wr: s.small });
      c.mv("wl", s.small ? {} : { x: -60 }, { d: 1 }); c.mv("wr", s.small ? {} : { x: 60 }, { d: 1 });
      c.op("kio", s.noK ? 0.25 : s.dimK ? 0.4 : 1);
      c.vis({ kok: s.kok, rej: s.rej, noK: s.noK, q: s.q, help: s.help, sup: s.sup, route: s.route, tK: s.tK, tA: s.tA, busy: s.busy });
      c.mv("help", s.help ? {} : { x: 40 }); c.mv("sup", s.sup ? {} : { x: 40 });
      c.mv("q", s.q ? { s: 1 } : { s: 0.5 }, { e: "back.out(2)" });
      c.mv("rej", s.rej ? { s: 1 } : { s: 0.6 }, { e: "back.out(2)" });
      const qn = s.qn || 0;
      for (let i = 0; i < 5; i++) { c.op("qp" + i, i < qn ? 1 : 0, { dl: i * 0.08 }); c.mv("qp" + i, i < qn ? {} : { x: -40 }, { dl: i * 0.08 }); }
      const gp = s.g && GP[s.g];
      c.op("g", gp ? 1 : 0);
      if (gp) c.mv("g", { x: gp[0], y: gp[1] }, { d: 1.2, e: "power2.inOut" });
      c.op("corp", s.corp ? 1 : 0);
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb); setNote(c, "nr", s.nr); setNote(c, "nl", s.nl);
    }
  };
}

// =====================================================================
// SHOT FAMILY: TRAIN — the training room next to the real shift: which
// situations were practised and which were not; roles; the "why".
// template: Checklist — https://lottiefiles.com/free-animation/checklist-c1qt4p98BW
// template: Man with task list — https://lottiefiles.com/free-animation/man-with-task-list-Z2XrIU43bQ
// =====================================================================
function F_TRAIN(p) {
  const f = pfx(p);
  const panel = (x, title, col, key) => R(x, 40, 182, 160, C.white, 10, `stroke="${col}" stroke-width="2.2"`) + R(x, 40, 182, 26, col, 10) + R(x, 56, 182, 10, col) + f.TK(key, x + 91, 58, title, 13.5, C.white);
  return {
    p, bench: "Checklist + Man with task list (LottieFiles)",
    draw() {
      let s = f.K("pL", panel(12, "Training room", C.teal, "tL"));
      s += f.K("pR", panel(206, "Real shift", C.navy, "tR"));
      s += f.H("hL", R(16, 0, 174, 24, "rgba(229,183,108,.35)", 6)) + f.H("hR", R(210, 0, 174, 24, "rgba(229,183,108,.35)", 6));
      for (let i = 0; i < 5; i++) {
        const y = 90 + i * 24;
        s += f.H("l" + i, f.TK("lt" + i, 24, y + 5, "", 13, C.ink, "start") + markSVG(f, "lm" + i, 178, y, 0.8));
        s += f.H("r" + i, f.TK("rt" + i, 218, y + 5, "", 13, C.ink, "start") + markSVG(f, "rm" + i, 372, y, 0.8));
      }
      s += f.H("gap", P("M198 82 L192 104 L204 126 L193 148 L202 172", C.red, 3.4) + O(198, 128, 13, C.red) + cross(198, 128, 0.6, C.white, 2.4));
      s += f.H("roles", person(36, 264, 1.1, C.green) + T(36, 292, "Reception", 12, C.green) + person(220, 264, 1.1, C.navy2) + T(220, 292, "Supervisor", 12, C.navy2));
      s += noteSVG(f, "rl", 128, 250, 13) + noteSVG(f, "rr", 316, 250, 13);
      s += f.H("why", O(372, 228, 15, C.gold) + R(366, 243, 12, 9, C.slate, 2) + rep(5, (i) => { const a = Math.PI * (1.1 + i * 0.2); return P(`M${372 + 20 * Math.cos(a)} ${228 + 20 * Math.sin(a)} L${372 + 26 * Math.cos(a)} ${228 + 26 * Math.sin(a)}`, C.amber, 2.2); }) + T(372, 233, "?", 14, C.ink));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 200, 228);
      return s;
    },
    render(c, s) {
      const mods = s.mods || [], live = s.live || [];
      for (let i = 0; i < 5; i++) {
        c.op("l" + i, i < mods.length ? 1 : 0, { dl: i * 0.08 }); c.tx("lt" + i, mods[i] || "");
        setMark(c, "lm" + i, (s.mk || [])[i] || "");
        c.op("r" + i, i < live.length ? 1 : 0, { dl: i * 0.08 }); c.tx("rt" + i, live[i] || "");
        setMark(c, "rm" + i, (s.lk || [])[i] || "");
      }
      c.op("pR", s.right === 0 ? 0.25 : 1); c.op("pL", s.left === 0 ? 0.25 : 1);
      c.op("hL", s.hlL != null ? 1 : 0); c.mv("hL", { y: 78 + (s.hlL || 0) * 24 }, { d: 0.6 });
      c.op("hR", s.hlR != null ? 1 : 0); c.mv("hR", { y: 78 + (s.hlR || 0) * 24 }, { d: 0.6 });
      c.vis({ gap: s.gap, roles: s.roles, why: s.why });
      c.mv("why", s.why ? { s: 1 } : { s: 0.5 }, { e: "back.out(2)" });
      setNote(c, "rl", s.roles ? s.rl : null); setNote(c, "rr", s.roles ? s.rr : null);
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: WEEKS — the first six weeks after go-live: support
// intensity per week, a coach on the floor versus a distant help queue,
// and temporary extra capacity.
// template: Roadmap / Project schedule — https://lottiefiles.com/free-animation/roadmapproject-schedule-krKjaLHUr0
// template: Tech support and customer service — https://lottiefiles.com/free-animation/tech-support-and-customer-service-9aooyn7i8u
// =====================================================================
function F_WEEKS(p) {
  const f = pfx(p);
  const X = (i) => 40 + i * 58;
  const DEF = [1, 0.92, 0.78, 0.62, 0.46, 0.32];
  return {
    p, bench: "Roadmap / Project schedule + Tech support (LottieFiles)",
    draw() {
      let s = flagI(24, 62, C.green, 1);
      for (let i = 0; i < 6; i++) {
        s += K(p + "c" + i, R(X(i), 44, 52, 30, C.white, 6, `stroke="${C.slate}" stroke-width="1.6"`) + T(X(i) + 26, 64, "Wk " + (i + 1), 13, C.slate));
        s += f.H("cl" + i, R(X(i), 44, 52, 30, C.green, 6) + T(X(i) + 26, 64, "Wk " + (i + 1), 13, C.white));
        s += f.H("b" + i, R(X(i) + 12, 84, 28, 66, C.green, 4, 'opacity=".85"'));
      }
      s += f.H("bl", T(24, 150, "Support", 12, C.green, 'transform="rotate(-90 24 150)"'));
      s += f.H("cur", R(X(0) - 4, 40, 60, 38, "none", 9, `stroke="${C.gold}" stroke-width="3" class="a-pulse"`));
      s += R(-400, 252, 1200, 300, "#efe6d6") + P("M-400 252 H800", "#d8c7a6", 2);
      s += R(66, 214, 124, 9, C.ink, 3) + R(72, 223, 112, 29, C.navy, 4);
      s += person(116, 208, 1.1, C.green);
      s += f.H("guest", buddy(40, 236, 12, C.navy2) + O(40, 208, 9, C.white, `stroke="${C.orange}" stroke-width="2"`) + T(40, 212.5, "?", 12, C.orange));
      s += f.H("near", person(160, 208, 1.05, C.plum) + chip(160, 172, "Coach on floor", { sz: 12, st: C.plum, fg: C.plum }));
      s += f.H("far", P("M188 236 C240 286 300 286 334 244", C.slate, 2, 'stroke-dasharray="4 5"') + R(296, 196, 96, 46, C.white, 6, `stroke="${C.slate}" stroke-width="2"`) + T(344, 215, "Remote helpdesk", 11.5, C.slate) + T(344, 233, "Ticket #42", 12, C.red) + clockI(386, 196, 10, C.red));
      s += f.H("farX", cross(344, 220, 2, C.red, 4));
      s += f.H("cap", person(214, 210, 1, C.green) + person(240, 210, 1, C.green) + chip(227, 174, "+2 staff", { sz: 12, st: C.green, fg: C.green }));
      s += noteSVG(f, "nt", 250, 22) + noteSVG(f, "nb", 200, 284) + noteSVG(f, "nm", 250, 168);
      return s;
    },
    render(c, s) {
      const wk = s.wk == null ? 0 : s.wk, bars = s.bars ? (Array.isArray(s.bars) ? s.bars : DEF) : null;
      for (let i = 0; i < 6; i++) {
        c.op("cl" + i, i < wk ? 1 : 0, { dl: i * 0.1 });
        c.op("b" + i, bars ? 1 : 0, { dl: i * 0.08 });
        c.mv("b" + i, { sy: bars ? Math.max(0.05, bars[i]) : 0.05, pv: [X(i) + 26, 150] }, { d: 0.9, dl: i * 0.08 });
      }
      c.op("bl", bars ? 1 : 0);
      c.op("cur", s.cur != null ? 1 : 0); c.mv("cur", { x: (s.cur || 0) * 58 }, { d: 0.7 });
      c.vis({ guest: s.guest, near: s.near, far: s.far, farX: s.farX, cap: s.cap });
      c.mv("near", s.near ? {} : { x: 30 }); c.mv("cap", s.cap ? {} : { y: 20 });
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: ROUTER — escalation: a reported problem is sorted by
// kind and travels to the person with authority to decide it.
// template: Flowchart — https://lottiefiles.com/free-animation/secret-animation-7trmN1JFrD
// template: Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p
// =====================================================================
function F_ROUTER(p) {
  const f = pfx(p);
  const POS = { start: [54, 150], dia: [150, 150], tech: [236, 78], proc: [236, 222] };
  return {
    p, bench: "Flowchart + Choosing a path (LottieFiles)",
    draw() {
      let s = f.K("dia", F("M150 114 L186 150 L150 186 L114 150 Z", C.navy) + T(150, 147, "Which", 12, C.white) + T(150, 162, "kind?", 12, C.white));
      s += f.D("up", "M186 150 C212 150 214 78 278 78", C.slate, 3);
      s += f.D("dn", "M186 150 C212 150 214 222 278 222", C.green, 3);
      s += f.K("tech", R(282, 50, 112, 56, C.white, 10, `stroke="${C.slate}" stroke-width="2"`) + person(300, 86, 0.95, C.slate) + wrenchI(300, 60, C.slate, 0.7) + T(318, 74, "Technical", 12, C.slate, "", "start") + T(318, 90, "specialist", 12, C.slate, "", "start"));
      s += f.K("own", R(282, 194, 112, 56, C.white, 10, `stroke="${C.green}" stroke-width="2"`) + person(300, 230, 0.95, C.green) + T(318, 218, "Process", 12, C.green, "", "start") + T(318, 234, "owner", 12, C.green, "", "start"));
      s += f.H("auth", R(278, 190, 120, 64, "none", 12, `stroke="${C.gold}" stroke-width="3.5" class="a-pulse"`) + keyI(362, 240, C.amber, 1));
      s += f.H("noAuth", docI(306, 132, C.slate, 0.9) + lockI(318, 140, C.red, 0.8) + chip(300, 168, "Can't change procedure", { sz: 12, st: C.red, fg: C.red }));
      s += f.H("daily", calI(36, 64, C.navy, 1.2, "") + T(58, 69, "Raised daily", 13, C.navy, "", "start"));
      s += f.H("wa", P("M30 252 C60 230 90 270 120 246 C150 226 170 268 200 250", C.slate, 2, 'stroke-dasharray="4 4"') + person(206, 262, 0.9, C.slate) + O(224, 234, 9, C.white, `stroke="${C.orange}" stroke-width="2"`) + T(224, 238.5, "?", 12, C.orange));
      s += f.H("tok", R(-38, -20, 76, 40, C.white, 8, `stroke="${C.orange}" stroke-width="2.2"`) + f.TK("k1", 0, -3, "", 12, C.orange) + f.TK("k2", 0, 13, "", 12, C.orange));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 200, 284);
      return s;
    },
    render(c, s) {
      c.dr("up", s.up ? 1 : 0); c.dr("dn", s.dn ? 1 : 0);
      c.op("tech", s.only === "proc" ? 0.3 : 1); c.op("own", s.only === "tech" ? 0.3 : 1);
      c.vis({ auth: s.auth, noAuth: s.noAuth, daily: s.daily, wa: s.wa });
      const tp = s.tok && POS[s.tok];
      c.op("tok", tp ? 1 : 0);
      if (tp) c.mv("tok", { x: tp[0], y: tp[1] }, { d: 1.1, e: "power2.inOut" });
      const k = s.k || ["Reported", "problem"];
      c.tx("k1", k[0] || ""); c.tx("k2", k[1] || "");
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: BOARD — the daily problem board: raised, being fixed,
// fixed and told back to staff; recurring cards; staff trust meter.
// template: Workflow Dashboard – Interactive Motion Design — https://dribbble.com/shots/27538364-Workflow-Dashboard-Interactive-Motion-Design
// template: Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD
// =====================================================================
function F_BOARD(p) {
  const f = pfx(p);
  const CX = [72, 200, 328], HD = ["Raised", "Fixing", "Fixed + told"], HC = [C.orange, C.amber, C.green];
  return {
    p, bench: "Workflow Dashboard (Dribbble) + Problem Solving Team (LottieFiles)",
    draw() {
      let s = "";
      for (let j = 0; j < 3; j++) s += R(CX[j] - 62, 40, 124, 180, "rgba(255,255,255,.75)", 10, `stroke="${HC[j]}" stroke-width="2"`) + R(CX[j] - 62, 40, 124, 26, HC[j], 10) + R(CX[j] - 62, 56, 124, 10, HC[j]) + T(CX[j], 58, HD[j], 13.5, C.white);
      for (let i = 0; i < 6; i++) s += f.H("c" + i, R(-56, -14, 112, 28, C.white, 6, `stroke="${C.slate}" stroke-width="1.6"`) + R(-56, -14, 6, 28, C.orange, 3) + f.TK("ct" + i, 3, 4.5, "", 12, C.ink));
      s += f.H("bx", O(0, 0, 11, C.red) + T(0, 4, "×3", 10, C.white));
      s += f.H("win", star(0, 0, 1));
      for (let i = 0; i < 3; i++) {
        s += person(30 + i * 30, 270, 0.85, C.green);
        s += f.H("sb" + i, R(18 + i * 30, 234, 26, 18, C.white, 6, `stroke="${C.green}" stroke-width="1.6"`) + tick(31 + i * 30, 243, 0.5, C.green, 2));
      }
      s += f.H("sx", rep(3, (i) => R(18 + i * 30, 234, 26, 18, C.white, 6, `stroke="${C.slate}" stroke-width="1.6"`) + cross(31 + i * 30, 243, 0.5, C.red, 2.2)));
      s += f.H("meg", megaI(136, 262, C.orange, 1.1));
      s += f.H("cred", T(282, 252, "Staff trust", 12.5, C.navy) + R(190, 260, 190, 14, "#e4e9ef", 7) + `<rect data-k="${p}cf" x="190" y="260" width="190" height="14" rx="7" fill="${C.green}"/>`);
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nm", 200, 236);
      return s;
    },
    render(c, s) {
      const cards = s.cards || [], cnt = [0, 0, 0], pos = [];
      for (let i = 0; i < 6; i++) {
        const cd = cards[i];
        if (!cd) { c.op("c" + i, 0); pos.push(null); continue; }
        const col = cd[1], row = cnt[col]++;
        const x = CX[col], y = 88 + row * 34;
        pos.push([x, y]);
        c.tx("ct" + i, cd[0]);
        c.op("c" + i, s.hl != null && s.hl !== i ? 0.45 : 1, { dl: i * 0.06 });
        c.mv("c" + i, { x, y, s: s.hl === i ? 1.08 : 1 }, { d: 1, e: "power2.inOut" });
      }
      const rp = s.recur != null && pos[s.recur];
      c.op("bx", rp ? 1 : 0); if (rp) c.mv("bx", { x: rp[0] + 52, y: rp[1] - 13 });
      const wp = s.win != null && pos[s.win];
      c.op("win", wp ? 1 : 0); if (wp) c.mv("win", { x: wp[0] - 50, y: wp[1] - 13, s: 1.1 }, { e: "back.out(2)" });
      for (let i = 0; i < 3; i++) c.op("sb" + i, s.told && !s.quiet ? 1 : 0, { dl: i * 0.12 });
      c.vis({ sx: s.quiet, meg: s.told, cred: s.cred != null });
      c.mv("cf", { sx: Math.max(0.02, s.cred || 0), pv: [190, 267] }, { d: 1 });
      c.fl("cf", (s.cred || 0) < 0.4 ? C.red : (s.cred || 0) < 0.7 ? C.amber : C.green);
      setNote(c, "nt", s.nt); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: CHART — a line chart that draws itself: kiosk adoption
// rising and flattening at 65 %, or exception volume against the
// designed range.
// template: Animated line chart lesson — https://observablehq.com/@d3/learn-d3-animation
// template: Growth Chart — https://lottiefiles.com/free-animation/growth-chart-MBrxgE3xfn
// =====================================================================
function F_CHART(p) {
  const f = pfx(p);
  const X = (w) => 56 + w * 28, Y = (v) => 232 - v * 1.7;
  const line = (a) => a.map((v, w) => (w ? "L" : "M") + X(w) + " " + Y(v).toFixed(1)).join(" ");
  const AD = [0, 12, 28, 40, 50, 57, 61, 64, 65, 65, 65, 65];
  const EIN = [22, 26, 24, 27, 25, 28, 26, 27, 25, 26, 27, 26];
  const EOV = [22, 27, 31, 36, 42, 47, 52, 57, 61, 64, 66, 68];
  return {
    p, bench: "Animated line chart (Observable) + Growth Chart (LottieFiles)",
    draw() {
      let s = P(`M56 58 V232 H${X(11) + 16}`, C.slate, 2);
      s += rep(12, (w) => T(X(w), 248, String(w), 11, C.slate));
      s += f.TK("xl", 214, 266, "Weeks since the pilot began", 12, C.slate);
      s += f.TK("yl", 58, 50, "Kiosk adoption %", 13, C.navy, "start");
      s += f.H("ytk", rep(3, (i) => T(48, Y(i * 50) + 4, String(i * 50), 11, C.slate, "", "end")));
      s += f.H("band", R(56, Y(32), X(11) - 46, Y(20) - Y(32), "rgba(49,124,97,.18)") + T(X(11) + 6, Y(32) - 6, "Designed range", 12, C.green, "", "end"));
      s += f.H("t100", P(`M56 ${Y(100)} H${X(11) + 10}`, C.green, 2, 'stroke-dasharray="6 5"') + T(X(11) + 10, Y(100) - 7, "100% = every arrival", 12, C.green, "", "end"));
      s += f.H("gap", R(X(7), Y(100), X(11) - X(7), Y(65) - Y(100), "rgba(192,80,42,.15)") + T((X(7) + X(11)) / 2, (Y(100) + Y(65)) / 2 + 5, "35% not on kiosk", 13, C.orange));
      s += f.D("ad", line(AD), C.navy, 4.5);
      s += f.D("ein", line(EIN), C.green, 4);
      s += f.D("eov", line(EOV), C.red, 4);
      s += f.H("ovr", F(EOV.slice(3).map((v, w) => (w ? "L" : "M") + X(w + 3) + " " + Y(v).toFixed(1)).join(" ") + ` L${X(11)} ${Y(32)} L${X(3)} ${Y(32)} Z`, "rgba(176,54,43,.14)") + T(X(7), Y(52), "Above design", 12, C.red));
      s += f.H("plat", R(X(8) - 8, Y(65) - 9, X(11) - X(8) + 16, 18, "none", 9, `stroke="${C.gold}" stroke-width="3"`) + chip(X(9.5), Y(65) + 30, "Plateau: 65%", { sz: 13, st: C.amber, fg: C.amber }));
      s += f.H("big", T(X(9.5), 206, "65%", 34, C.navy));
      s += f.H("ill", T(X(2.6), 224, "rise shape illustrative", 10.5, C.slate, "", "start"));
      s += f.H("wk", rep(11, (w) => O(X(w + 1), 232, 4.5, C.teal)) + chip(118, 82, "Reviewed weekly", { sz: 12.5, st: C.teal, fg: C.teal }));
      s += f.H("dot", O(0, 0, 7, C.orange, `stroke="${C.white}" stroke-width="2"`));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 214, 287) + noteSVG(f, "nm", 250, 186);
      return s;
    },
    render(c, s) {
      const exc = s.mode === "exc";
      c.tx("yl", exc ? "Exception volume" : "Kiosk adoption %");
      c.tx("xl", exc ? "Weeks after go-live" : "Weeks since the pilot began");
      c.op("ytk", exc ? 0 : 1);
      c.dr("ad", !exc ? (s.dr == null ? 1 : s.dr) : 0, { d: 1.4 }); c.op("ad", exc ? 0 : 1);
      c.dr("ein", exc && s.ein ? 1 : 0, { d: 1.4 }); c.dr("eov", exc && s.eov ? 1 : 0, { d: 1.4 });
      c.vis({ band: exc && s.band, t100: !exc && s.t100, gap: !exc && s.gap, plat: !exc && s.plat, big: !exc && s.big, ill: !exc && (s.dr == null || s.dr > 0.2), wk: s.wk, ovr: exc && s.ovr });
      if (s.dot != null) { const v = exc ? EOV : AD; c.op("dot", 1); c.mv("dot", { x: X(s.dot), y: Y(v[s.dot]) }, { d: 0.9 }); } else c.op("dot", 0);
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: WAFFLE — 100 pilot arrivals sort into kiosk (65) and
// reception desk (35); the desk group is examined.
// template: Sankey animation - acyclic graph — https://observablehq.com/@joaormendes/sankey-animation-acyclic-graph
// template: Stacked-to-grouped bars — https://observablehq.com/@d3/stacked-to-grouped-bars
// =====================================================================
function F_WAFFLE(p) {
  const f = pfx(p);
  const g = (i) => [18 + (i % 10) * 17, 52 + Math.floor(i / 10) * 17];
  const tgt = (i) => i < 65 ? [210 + (i % 15) * 12, 66 + Math.floor(i / 15) * 12] : [210 + ((i - 65) % 15) * 12, 186 + Math.floor((i - 65) / 15) * 12];
  return {
    p, bench: "Sankey animation (Observable) + Stacked-to-grouped bars (Observable)",
    draw() {
      let s = f.K("hd", T(100, 40, "100 pilot arrivals", 13.5, C.navy));
      s += f.H("bG", R(200, 40, 192, 104, "#eef7f1", 10, `stroke="${C.green}" stroke-width="2"`) + T(210, 58, "Kiosk", 14, C.green, "", "start") + T(384, 58, "65", 17, C.green, "", "end"));
      s += f.H("bO", R(200, 160, 192, 92, "#fbefe8", 10, `stroke="${C.orange}" stroke-width="2"`) + T(210, 178, "Reception desk", 14, C.orange, "", "start") + T(384, 178, "35", 17, C.orange, "", "end"));
      s += rep(100, (i) => { const [x, y] = g(i); return `<rect class="${p}t" data-i="${i}" data-k="${p}t" x="${x}" y="${y}" width="14" height="14" rx="3" fill="${C.grey}"/>`; });
      s += f.H("corp", chip(296, 238, "Mostly corporate bookings", { sz: 12, bg: C.orange, st: C.orange, fg: C.white }));
      s += f.H("why", magI(300, 204, 26, C.ink));
      s += f.H("q", chip(100, 262, "Approved exception?", { sz: 12.5, st: C.green, fg: C.green }) + chip(300, 268, "Informal workaround?", { sz: 12.5, st: C.red, fg: C.red, dash: 1 }));
      s += noteSVG(f, "nb", 200, 287) + noteSVG(f, "nl", 100, 238);
      return s;
    },
    render(c, s) {
      const tiles = c.all("." + p + "t");
      const col = !!s.col || !!s.sort;
      tiles.forEach((el) => {
        const i = +el.getAttribute("data-i"), orange = i >= 65;
        let fill = C.grey;
        if (col) fill = orange ? C.orange : C.green;
        let o = 1;
        if (s.dimG && !orange) o = 0.22;
        if (s.dimO && orange) o = 0.22;
        c.flEl(el, fill, { dl: s.col && !s.sort ? (i % 35) * 0.012 : 0 });
        c.opEl(el, o);
        if (s.sort) { const [a, b] = g(i), [x, y] = tgt(i); c.mvEl(el, { x: x + 5 - (a + 7), y: y + 5 - (b + 7), s: 0.72 }, { d: 1.1, dl: (orange ? (i - 65) : i) * 0.01, e: "power2.inOut" }); }
        else c.mvEl(el, {}, { d: 0.8 });
      });
      c.vis({ bG: s.sort, bO: s.sort, corp: s.corp, why: s.why, q: s.q });
      c.op("hd", s.sort ? 0.4 : 1);
      setNote(c, "nb", s.nb); setNote(c, "nl", s.nl);
    }
  };
}

// =====================================================================
// SHOT FAMILY: COMPARE — two cards side by side (a distinction the
// narration draws), each with an icon, two short lines and a verdict.
// template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
// template: Interactive AI Customer Support vs Old Way — https://lottiefiles.com/free-animation/interactive-ai-optimised-customer-support-vs-old-way-yKSecPTuwL
// =====================================================================
function F_COMPARE(p) {
  const f = pfx(p);
  const side = (k, x0, col) => {
    const cx = x0 + 89;
    let s = f.K(k + "card", R(x0, 46, 178, 192, C.white, 12, `stroke="${col}" stroke-width="2.2"`) + R(x0, 46, 178, 32, col, 12) + R(x0, 66, 178, 12, col) + f.TK(k + "t", cx, 68, "", 13.5, C.white));
    s += f.H(k + "hl", R(x0 - 4, 42, 186, 200, "none", 15, `stroke="${C.gold}" stroke-width="3.5"`));
    Object.keys(ICONS).forEach((nm) => { s += f.H(k + "i_" + nm, ICONS[nm](cx, 122)); });
    s += f.TK(k + "a", cx, 182, "", 13, C.ink) + f.TK(k + "b", cx, 200, "", 13, C.ink);
    s += markSVG(f, k + "m", cx, 222, 0.9);
    return s;
  };
  return {
    p, bench: "Comparison Chart (LottieFiles) + Customer Support vs Old Way (LottieFiles)",
    draw() {
      let s = side("L", 12, C.navy) + side("R", 210, C.orange);
      s += f.H("mid", O(200, 142, 17, C.white, `stroke="${C.ink}" stroke-width="2.4"`) + f.TK("mt", 200, 148.5, "≠", 17, C.ink));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 200, 270);
      return s;
    },
    render(c, s) {
      [["L", s.lt, s.li, s.l, s.lm], ["R", s.rt, s.ri, s.r, s.rm]].forEach(([k, t, ic, ln, m]) => {
        c.tx(k + "t", t || ""); c.tx(k + "a", (ln || [])[0] || ""); c.tx(k + "b", (ln || [])[1] || "");
        Object.keys(ICONS).forEach((nm) => c.op(k + "i_" + nm, nm === ic ? 1 : 0));
        setMark(c, k + "m", m || "");
        const on = !s.hl || s.hl === k.toLowerCase();
        c.op(k + "card", on ? 1 : 0.4);
        c.op(k + "hl", s.hl === k.toLowerCase() ? 1 : 0);
        c.mv(k + "card", s.hl === k.toLowerCase() ? { s: 1.03 } : {});
      });
      c.op("mid", s.mid === "" ? 0 : 1); c.tx("mt", s.mid || "≠");
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: BARS — horizontal bars to true scale with values and
// "?" where the case gives no number.
// template: Bar chart transitions — https://observablehq.com/@d3/bar-chart-transitions/2
// template: Infographic Chart Creator — https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/
// =====================================================================
function F_BARS(p) {
  const f = pfx(p);
  const BC = { g: C.green, o: C.orange, n: C.navy, p: C.plum, s: C.slate, r: C.red, t: C.teal };
  return {
    p, bench: "Bar chart transitions (Observable) + Infographic Chart Creator (Motion Array)",
    draw() {
      let s = f.TK("ti", 200, 36, "", 14, C.navy);
      for (let i = 0; i < 5; i++) {
        const y = 74 + i * 42;
        s += f.H("r" + i, f.TK("l" + i, 20, y - 6, "", 13, C.ink, "start") + R(20, y, 300, 20, "#e8edf2", 5) +
          `<rect data-k="${p}b${i}" x="20" y="${y}" width="300" height="20" rx="5" fill="${C.navy}"/>` + f.TK("v" + i, 330, y + 15.5, "", 15, C.ink, "start") + markSVG(f, "m" + i, 384, y + 10, 0.85));
      }
      s += noteSVG(f, "nb", 200, 286) + noteSVG(f, "nm", 200, 252);
      return s;
    },
    render(c, s) {
      c.tx("ti", s.ti || "");
      const rows = s.rows || [], mx = s.max || Math.max(1, ...rows.map((r) => r[1] || 0));
      for (let i = 0; i < 5; i++) {
        const r = rows[i];
        c.op("r" + i, r ? 1 : 0, { dl: i * 0.08 });
        if (!r) continue;
        c.tx("l" + i, r[0]); c.tx("v" + i, r[3] != null ? r[3] : String(r[1]));
        c.fl("b" + i, BC[r[2]] || C.navy);
        c.mv("b" + i, { sx: Math.max(0.01, (r[1] || 0) / mx), pv: [20, 84 + i * 42] }, { d: 1.1, dl: i * 0.1 });
        setMark(c, "m" + i, r[4] || "");
      }
      setNote(c, "nb", s.nb); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: GAUGE — a dial with a needle: guest satisfaction out of
// ten, or occupancy with the 90 % danger band.
// template: Customer satisfaction — https://lottiefiles.com/free-animation/customer-satisfaction-zfm0C8rzLz
// template: Arc tween — https://observablehq.com/@d3/arc-tween
// =====================================================================
function F_GAUGE(p) {
  const f = pfx(p);
  const pt = (fr, r) => [200 - r * Math.cos(Math.PI * fr), 196 - r * Math.sin(Math.PI * fr)];
  const arc = (a, b, r) => { const [x0, y0] = pt(a, r), [x1, y1] = pt(b, r); return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`; };
  return {
    p, bench: "Customer satisfaction (LottieFiles) + Arc tween (Observable)",
    draw() {
      let s = P(arc(0, 1, 112), "#e3e8ee", 22);
      s += f.H("sat", P(arc(0, 0.6, 112), "#f3d9cc", 22) + P(arc(0.6, 0.8, 112), "#f4e7c9", 22) + P(arc(0.8, 1, 112), "#d5ebdf", 22) +
        rep(6, (i) => { const [x, y] = pt(i / 5, 140); return T(x, y + 5, String(i * 2), 13, C.slate); }));
      s += f.H("occ", P(arc(0.9, 1, 112), "#f0c4bc", 22) + rep(3, (i) => { const [x, y] = pt(i / 2, 140); return T(x, y + 5, ["0%", "50%", "100%"][i], 13, C.slate); }) +
        (() => { const [x, y] = pt(0.9, 140); return T(x - 4, y - 2, "90%", 13, C.red); })());
      s += f.H("g0", P("M200 196 V96", C.slate, 3, 'stroke-dasharray="5 4"'));
      s += f.K("nd", P("M200 196 V92", C.ink, 5) + F("M194 104 L200 86 L206 104 Z", C.ink));
      s += O(200, 196, 11, C.ink);
      s += f.TK("big", 200, 248, "", 36, C.navy);
      s += noteSVG(f, "nL", 82, 236, 13) + noteSVG(f, "nR", 318, 236, 13) + noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 200, 284);
      return s;
    },
    render(c, s) {
      const occ = s.mode === "occ";
      c.op("sat", occ ? 0 : 1); c.op("occ", occ ? 1 : 0);
      const fr = (v) => clamp(occ ? v / 100 : v / 10, 0, 1);
      c.mv("nd", { r: -90 + 180 * fr(s.v || 0), pv: [200, 196] }, { d: 1.4, e: "power2.inOut" });
      c.op("g0", s.v0 != null ? 1 : 0); c.mv("g0", { r: -90 + 180 * fr(s.v0 || 0), pv: [200, 196] }, { d: 0.01 });
      c.tx("big", s.big || "");
      c.fl("big", s.bigc === "r" ? C.red : s.bigc === "g" ? C.green : C.navy);
      setNote(c, "nL", s.nL); setNote(c, "nR", s.nR); setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}


// =====================================================================
// SHOT FAMILY: MAP — Qasr's fourteen properties in their four groups
// (2 pilots, 5 standard, 3 heritage, 4 peak occupancy) with marks,
// wave labels, support levels and copied limitations.
// template: Animated treemap — https://observablehq.com/@d3/animated-treemap
// template: World map with logistics — https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy
// =====================================================================
function F_MAP(p) {
  const f = pfx(p);
  const HX = [40, 80, 146, 198, 250, 302, 354, 52, 104, 156, 236, 282, 328, 372];
  const HY = (i) => (i < 7 ? 88 : 184);
  const GRP = (i) => (i < 2 ? "pil" : i < 7 ? "std" : i < 10 ? "her" : "peak");
  const GC = { pil: C.green, std: C.navy, her: C.plum, peak: C.orange };
  const ZB = { pil: [12, 40, 96, 84, "PILOTS"], std: [116, 40, 276, 84, "STANDARD ×5"], her: [12, 136, 184, 84, "HERITAGE ×3"], peak: [204, 136, 188, 84, "PEAK >90% ×4"] };
  return {
    p, bench: "Animated treemap (Observable) + World map with logistics (LottieFiles)",
    draw() {
      let s = "";
      Object.keys(ZB).forEach((g) => { const [x, y, w, h, l] = ZB[g]; s += f.H("z_" + g, R(x, y, w, h, "rgba(255,255,255,.7)", 10, `stroke="${GC[g]}" stroke-width="2"`) + T(x + 8, y + 16, l, 12, GC[g], "", "start")); });
      s += f.H("trv", P("M60 40 Q150 4 250 38", C.green, 2.4, 'stroke-dasharray="5 5"') + P("M44 124 Q46 134 70 140", C.green, 2.4, 'stroke-dasharray="5 5"') + P("M96 124 Q200 128 290 138", C.green, 2.4, 'stroke-dasharray="5 5"') +
        [[156, 20], [52, 134], [200, 129]].map(([x, y]) => O(x, y, 9, C.white, `stroke="${C.orange}" stroke-width="2"`) + T(x, y + 4.5, "?", 12, C.orange)).join(""));
      for (let i = 0; i < 14; i++) {
        const x = HX[i], y = HY(i), col = GC[GRP(i)];
        s += f.K("h" + i, house(x, y, col, 1.2));
        s += f.H("s" + i, R(x - 13, y + 22, 26, 6, "#e4e9ef", 3) + `<rect data-k="${p}sb${i}" x="${x - 13}" y="${y + 22}" width="26" height="6" rx="3" fill="${C.green}"/>`);
        s += f.TK("w" + i, x, y + 34, "", 11.5, C.ink);
        s += markSVG(f, "m" + i, x + 14, y - 16, 0.62);
        s += f.H("cp" + i, O(x - 14, y - 16, 7, C.red) + T(x - 14, y - 12, "!", 10, C.white));
      }
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nm", 200, 250) + noteSVG(f, "nb", 200, 284);
      return s;
    },
    render(c, s) {
      const lit = s.lit || null;
      Object.keys(ZB).forEach((g) => c.op("z_" + g, s.grp ? (lit && lit.indexOf(g) < 0 ? 0.3 : 1) : 0, { dl: s.grp ? 0.1 : 0 }));
      c.op("trv", s.trv ? 1 : 0);
      for (let i = 0; i < 14; i++) {
        const g = GRP(i), on = !lit || lit.indexOf(g) >= 0;
        c.op("h" + i, on ? 1 : 0.25, { dl: i * 0.03 });
        c.mv("h" + i, on && s.pop ? { s: 1.12 } : {}, { e: "back.out(2)" });
        setMark(c, "m" + i, (s.mkH && s.mkH[i]) || (s.mk && s.mk[g]) || "");
        c.tx("w" + i, (s.wave && s.wave[g]) || "");
        const sv = s.sup ? s.sup[i] : null;
        c.op("s" + i, sv != null ? 1 : 0);
        c.mv("sb" + i, { sx: Math.max(0.03, sv || 0), pv: [HX[i] - 13, HY(i) + 25] }, { d: 1, dl: i * 0.05 });
        c.fl("sb" + i, (sv || 0) < 0.4 ? C.red : (sv || 0) < 0.7 ? C.amber : C.green);
        c.op("cp" + i, s.copy && i >= 2 ? 1 : 0, { dl: (i - 2) * 0.07 });
      }
      setNote(c, "nt", s.nt); setNote(c, "nm", s.nm); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: ARCH — the process architecture: one arrival process,
// its standard kiosk route and the registered assisted variant for
// heritage lobbies; an unregistered local workaround stays outside.
// template: Hierarchy traversal animated — https://old.observablehq.com/@d3/hierarchy-traversal-animated
// template: The Process Architectural Motion — https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion
// =====================================================================
function F_ARCH(p) {
  const f = pfx(p);
  return {
    p, bench: "Hierarchy traversal (Observable) + The Process Architectural Motion (Behance)",
    draw() {
      let s = K(p + "root", R(120, 32, 160, 40, C.navy, 10) + T(200, 57, "Arrival process", 14, C.white));
      s += f.H("lock", lockI(296, 54, C.navy, 1) + T(312, 58, "Preserved", 12, C.navy, "", "start"));
      s += f.D("e1", "M170 72 C170 100 110 96 110 122", C.green, 3) + f.D("e2", "M230 72 C230 100 290 96 290 122", C.plum, 3);
      s += f.H("std", R(30, 122, 160, 42, C.white, 10, `stroke="${C.green}" stroke-width="2.2"`) + T(110, 140, "Standard route", 13, C.green) + T(110, 157, "kiosk + assisted", 11.5, C.slate));
      s += f.H("var", R(210, 122, 160, 42, C.white, 10, `stroke="${C.plum}" stroke-width="2.2"`) + T(290, 140, "Approved variant", 13, C.plum) + T(290, 157, "assisted, no kiosk", 11.5, C.slate));
      s += f.H("reg", chip(342, 118, "Registered", { sz: 11.5, bg: C.plum, st: C.plum, fg: C.white }));
      s += f.H("ps", rep(5, (i) => house(50 + i * 30, 196, C.navy, 0.85)) + T(110, 228, "Pilots, standard, peak", 11.5, C.slate));
      s += f.H("pv", rep(3, (i) => house(250 + i * 40, 196, C.plum, 0.85)) + T(290, 228, "3 heritage properties", 11.5, C.plum));
      s += f.H("prep", chip(290, 190, "Procedures", { sz: 12, st: C.plum, fg: C.plum }) + chip(290, 214, "Responsibilities", { sz: 12, st: C.plum, fg: C.plum }) + chip(290, 238, "Training", { sz: 12, st: C.plum, fg: C.plum }));
      s += markSVG(f, "pm0", 362, 190, 0.6) + markSVG(f, "pm1", 362, 214, 0.6) + markSVG(f, "pm2", 362, 238, 0.6);
      s += f.H("wa", R(222, 246, 170, 34, "rgba(255,255,255,.85)", 8, `stroke="${C.red}" stroke-width="2.2" stroke-dasharray="5 4"`) + T(307, 268, "Local workaround", 13, C.red));
      s += f.H("waX", cross(380, 252, 1.1, C.red, 3.4));
      s += f.H("rd", rep(3, (i) => P(`M${44 + i * 46} 250 q8 -12 16 0 t16 0`, C.red, 2.6) + cross(60 + i * 46, 250, 0.7, C.red, 2.6)) + T(110, 278, "Each site its own way?", 12, C.red));
      s += noteSVG(f, "nb", 200, 286) + noteSVG(f, "nt", 200, 16);
      return s;
    },
    render(c, s) {
      c.dr("e1", s.tr ? 1 : 0); c.dr("e2", s.tr && s.vr ? 1 : 0, { dl: 0.2 });
      c.vis({ std: s.tr, var: s.vr, reg: s.reg, ps: s.ps && !s.rd, pv: s.pv && !s.prep, prep: s.prep, wa: s.wa, waX: s.waX, rd: s.rd, lock: s.lock });
      c.mv("reg", s.reg ? { s: 1 } : { s: 1.6 }, { e: "back.out(2)" });
      for (let i = 0; i < 3; i++) setMark(c, "pm" + i, s.prep ? ((s.pmk || [])[i] || "") : "");
      c.op("std", s.tr ? (s.hl === "var" ? 0.4 : 1) : 0); c.op("var", s.vr ? (s.hl === "std" ? 0.4 : 1) : 0);
      setNote(c, "nb", s.nb); setNote(c, "nt", s.nt);
    }
  };
}

// =====================================================================
// SHOT FAMILY: GANTT — October to January: eight rollout weeks, the
// three-week buffer, the 1 January deadline, readiness gates, a failed
// week 8 and its recovery eating the buffer.
// template: Project TimeLine — https://motionarray.com/after-effects-templates/project-timeline-2424919/
// template: Roadmap / Project schedule — https://lottiefiles.com/free-animation/roadmapproject-schedule-krKjaLHUr0
// =====================================================================
function F_GANTT(p) {
  const f = pfx(p);
  const X = (i) => 24 + i * 28;
  const WC = { n: C.navy, g: C.green, p: C.plum, o: C.orange, s: C.slate, r: C.red };
  return {
    p, bench: "Project TimeLine (Motion Array) + Roadmap / Project schedule (LottieFiles)",
    draw() {
      let s = R(24, 44, 84, 20, "#e6edf4", 3) + T(66, 58, "Oct", 12, C.slate) + R(108, 44, 112, 20, "#f2eee5", 3) + T(164, 58, "Nov", 12, C.slate) +
        R(220, 44, 112, 20, "#e6edf4", 3) + T(276, 58, "Dec", 12, C.slate) + R(332, 44, 60, 20, "#f6e2de", 3) + T(362, 58, "Jan", 12, C.red);
      s += f.H("pk", R(334, 66, 58, 140, "rgba(176,54,43,.10)") + T(363, 152, "Peak", 12, C.red) + T(363, 168, ">90%", 12, C.red));
      for (let i = 0; i < 8; i++) {
        s += K(p + "w" + i, R(X(i), 80, 26, 30, C.white, 4, `stroke="${C.slate}" stroke-width="1.4"`));
        s += f.H("wf" + i, `<rect data-k="${p}wr${i}" x="${X(i)}" y="80" width="26" height="30" rx="4" fill="${C.navy}"/>` + T(X(i) + 13, 100, String(i + 1), 13, C.white));
      }
      s += f.H("buf", rep(3, (k) => R(X(8 + k), 80, 26, 30, "#eef0f3", 4, `stroke="${C.slate}" stroke-width="1.2" stroke-dasharray="3 3"`) + P(`M${X(8 + k) + 4} 106 l18 -22 M${X(8 + k) + 4} 94 l9 -11`, C.muted, 1.4)) + chip(X(9) + 13, 128, "3-week buffer", { sz: 12, st: C.slate, fg: C.slate }));
      s += f.H("gt", rep(3, (k) => { const x = X([0, 3, 6][k]) + 2; return F(`M${x} 64 L${x + 7} 71 L${x} 78 L${x - 7} 71 Z`, C.gold, `stroke="${C.amber}" stroke-width="1.4"`); }));
      s += f.H("wv", R(X(0), 146, 82, 28, C.green, 6) + T(X(0) + 41, 165, "Standard ×5", 11.5, C.white) +
        R(X(3), 146, 82, 28, "rgba(107,78,138,.14)", 6, `stroke="${C.plum}" stroke-width="1.8" stroke-dasharray="4 3"`) + T(X(3) + 41, 165, "Heritage ×3", 11.5, C.plum) +
        R(X(6), 146, 54, 28, "rgba(192,80,42,.12)", 6, `stroke="${C.orange}" stroke-width="1.8" stroke-dasharray="4 3"`) + T(X(6) + 27, 165, "Peak ×4", 11.5, C.orange));
      s += f.H("wvq", O(X(6) + 52, 146, 9, C.white, `stroke="${C.orange}" stroke-width="2"`) + T(X(6) + 52, 150.5, "?", 12, C.orange) + O(X(3) + 80, 146, 9, C.white, `stroke="${C.plum}" stroke-width="2"`) + T(X(3) + 80, 150.5, "?", 12, C.plum));
      s += f.H("fx", R(X(7), 80, 26, 30, C.red, 4) + cross(X(7) + 13, 95, 0.9, C.white, 3));
      s += f.H("rcg", `<rect data-k="${p}rc" x="${X(8)}" y="84" width="1" height="22" rx="3" fill="${C.orange}" opacity=".9"/>` + T(X(8) + 4, 100, "recovery", 11, C.white, "", "start"));
      s += f.H("ovf", chip(352, 190, "Past 1 Jan", { sz: 12, bg: C.red, st: C.red, fg: C.white }));
      s += f.H("dl", P("M332 40 V206", C.red, 3) + chip(326, 222, "1 Jan deadline", { sz: 12.5, bg: C.red, st: C.red, fg: C.white }));
      s += noteSVG(f, "nt", 180, 22) + noteSVG(f, "nq", 180, 200) + noteSVG(f, "nm", 180, 252) + noteSVG(f, "nb", 200, 284);
      return s;
    },
    render(c, s) {
      const wk = s.wk == null ? 8 : s.wk;
      for (let i = 0; i < 8; i++) {
        c.op("wf" + i, i < wk ? 1 : 0, { dl: i * 0.07 });
        c.fl("wr" + i, WC[(s.wc || [])[i]] || C.navy);
      }
      c.vis({ buf: s.buf, gt: s.gt, wv: s.wv, wvq: s.wv && s.wvq, fx: s.fail, dl: s.dl, pk: s.pk, ovf: s.ovf });
      c.op("rcg", s.rec ? 1 : 0);
      c.mv("rc", { sx: Math.max(1, (s.rec || 0) * 28), pv: [X(8), 95] }, { d: 1.2, dl: 0.3 });
      setNote(c, "nt", s.nt); setNote(c, "nq", s.nq); setNote(c, "nm", s.nm); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: GATE — the go / no-go gate: criteria agreed in advance
// (technical and operational), a named decision owner, a fixed date,
// a recorded waiver, and the pressure of the schedule.
// template: Approved Seal — https://lottiefiles.com/free-animation/approved-seal-seal-approval-loader-6o8fKZVBbx
// template: Checklist — https://lottiefiles.com/free-animation/checklist-c1qt4p98BW
// =====================================================================
function F_GATE(p) {
  const f = pfx(p);
  return {
    p, bench: "Approved Seal + Checklist (LottieFiles)",
    draw() {
      let s = f.K("brd", R(12, 40, 228, 214, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + R(12, 40, 228, 28, C.navy, 10) + R(12, 58, 228, 10, C.navy) + f.TK("ti", 126, 59, "Go / no-go criteria", 13.5, C.white));
      for (let i = 0; i < 6; i++) {
        const y = 92 + i * 25;
        s += f.H("r" + i, f.H("dt" + i, O(26, y - 4, 5, C.navy)) + f.H("do" + i, O(26, y - 4, 5, C.green)) + f.TK("t" + i, 38, y, "", 12.5, C.ink, "start") + markSVG(f, "m" + i, 222, y - 4, 0.72));
      }
      s += f.H("leg", O(26, 240, 5, C.navy) + T(36, 244, "Technical", 11.5, C.navy, "", "start") + O(120, 240, 5, C.green) + T(130, 244, "Operational", 11.5, C.green, "", "start"));
      s += R(250, 92, 8, 142, C.ink, 2) + R(384, 92, 8, 142, C.ink, 2) + R(244, 232, 154, 6, C.slate, 2);
      s += f.K("dL", R(259, 100, 62, 128, "#d9e4ee", 3, `stroke="${C.navy}" stroke-width="2"`) + P("M272 112 V216 M290 112 V216 M308 112 V216", C.muted, 2));
      s += f.K("dR", R(321, 100, 62, 128, "#d9e4ee", 3, `stroke="${C.navy}" stroke-width="2"`) + P("M334 112 V216 M352 112 V216 M370 112 V216", C.muted, 2));
      s += f.H("shut", R(254, 158, 134, 12, C.red, 4));
      s += R(262, 66, 120, 26, C.white, 6, `stroke="${C.navy}" stroke-width="2"`) + f.TK("sg", 322, 84, "GO / NO-GO", 13.5, C.navy);
      s += f.H("dm", person(262, 272, 0.95, C.navy) + chip(336, 270, "Decision owner", { sz: 12 }));
      s += f.H("date", calI(376, 40, C.navy, 1, "") + T(358, 45, "Date fixed", 12, C.navy, "", "end"));
      s += f.H("pre", `<g transform="rotate(-6 176 32)">${chip(176, 32, "Agreed in advance", { sz: 12, bg: C.green, st: C.green, fg: C.white })}</g>`);
      s += f.H("wv", R(26, 74, 200, 168, "#fffaf0", 8, `stroke="${C.amber}" stroke-width="2.4"`) + R(26, 74, 200, 26, C.amber, 8) + R(26, 90, 200, 10, C.amber) + T(126, 93, "WAIVER RECORD", 13, C.white) +
        T(38, 122, "Unmet condition", 11.5, C.amber, "", "start") + f.TK("w1", 38, 140, "", 12.5, C.ink, "start") + T(38, 166, "Why proceed anyway", 11.5, C.amber, "", "start") + f.TK("w2", 38, 184, "", 12.5, C.ink, "start") +
        T(38, 210, "Accepted by", 11.5, C.amber, "", "start") + f.TK("w3", 38, 228, "", 12.5, C.ink, "start"));
      s += f.H("party", rep(12, (i) => R(262 + (i * 37) % 120, 104 + (i * 53) % 100, 7, 4, [C.gold, C.orange, C.green, C.plum][i % 4], 1, `transform="rotate(${i * 31} ${266 + (i * 37) % 120} ${106 + (i * 53) % 100})"`)) + chip(322, 140, "Celebrate?", { sz: 13, st: C.amber, fg: C.amber }));
      s += f.H("partyX", cross(322, 140, 1.6, C.red, 4));
      s += f.H("push", P("M150 22 C214 22 236 44 252 74", C.orange, 3.4, 'class="a-flow"') + F("M246 70 L256 80 L258 66 Z", C.orange));
      s += noteSVG(f, "nt", 200, 20) + noteSVG(f, "nb", 200, 286);
      return s;
    },
    render(c, s) {
      c.tx("ti", s.t || "Go / no-go criteria");
      const it = s.items || [];
      for (let i = 0; i < 6; i++) {
        const r = it[i];
        c.op("r" + i, r ? 1 : 0, { dl: i * 0.08 });
        if (!r) { setMark(c, "m" + i, ""); continue; }
        c.tx("t" + i, r[0]); c.op("dt" + i, r[1] ? 0 : 1); c.op("do" + i, r[1] ? 1 : 0);
        setMark(c, "m" + i, r[2] || "");
      }
      c.op("leg", it.length ? 1 : 0);
      const open = !!s.open;
      c.mv("dL", { sx: open ? 0.12 : 1, pv: [259, 164] }, { d: 1.1 }); c.mv("dR", { sx: open ? 0.12 : 1, pv: [383, 164] }, { d: 1.1 });
      c.op("shut", s.shut ? 1 : 0);
      c.tx("sg", s.sign || "GO / NO-GO"); c.fl("sg", s.sign === "GO" ? C.green : s.sign === "NO-GO" || s.sign === "HOLD" ? C.red : C.navy);
      c.vis({ dm: s.dm, date: s.date, pre: s.pre, wv: s.wv, party: s.party, partyX: s.partyX, push: s.push });
      c.op("brd", s.wv ? 0.5 : 1);
      c.tx("w1", s.w1 || ""); c.tx("w2", s.w2 || ""); c.tx("w3", s.w3 || "");
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: REHEARSE — the only rollback rehearsal: 11 hours at
// Marina, no live corporate bookings; records already made in the new
// process must travel back safely.
// template: 5s countdown — https://lottiefiles.com/free-animation/5s-countdown-XZv1P0rDCu
// template: Git Workflow 1 — https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5
// =====================================================================
function F_REHEARSE(p) {
  const f = pfx(p);
  return {
    p, bench: "5s countdown + Git Workflow 1 (LottieFiles)",
    draw() {
      let s = O(100, 140, 60, C.white, `stroke="#e3e8ee" stroke-width="12"`);
      s += rep(12, (i) => { const a = i * Math.PI / 6; return P(`M${100 + 46 * Math.sin(a)} ${140 - 46 * Math.cos(a)} L${100 + 40 * Math.sin(a)} ${140 - 40 * Math.cos(a)}`, C.slate, i % 3 ? 1.4 : 2.6); });
      s += f.D("arc", "M100 80 A60 60 0 1 1 99.9 80", C.plum, 12);
      s += f.TK("hh", 100, 151, "", 30, C.plum);
      s += f.K("ml", T(100, 222, "Marina rehearsal", 13, C.navy) + house(100, 246, C.green, 0.9));
      s += f.H("cov", R(196, 50, 196, 150, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + R(196, 50, 196, 26, C.navy, 10) + R(196, 66, 196, 10, C.navy) + T(294, 68, "What the test covered", 12.5, C.white) +
        rep(3, (i) => f.TK("ct" + i, 208, 104 + i * 34, "", 12.5, C.ink, "start") + markSVG(f, "cm" + i, 372, 100 + i * 34, 0.8)));
      s += f.H("old", R(12, 248, 104, 40, C.white, 8, `stroke="${C.green}" stroke-width="2"`) + T(64, 273, "Previous way", 12.5, C.green));
      s += markSVG(f, "om", 112, 248, 0.7);
      s += f.H("new", R(286, 248, 106, 40, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + T(339, 273, "New process", 12.5, C.navy));
      s += f.H("lane", P("M118 268 H284", C.slate, 2, 'stroke-dasharray="4 5"'));
      for (let i = 0; i < 3; i++) s += f.H("rc" + i, R(-12, -9, 24, 18, C.white, 3, `stroke="${C.orange}" stroke-width="1.8"`) + P("M-7 -3 H7 M-7 3 H4", C.orange, 1.6));
      s += f.H("cf", O(200, 244, 10, C.red) + T(200, 248.5, "!", 13, C.white));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "no", 100, 44, 13) + noteSVG(f, "nm", 294, 222);
      return s;
    },
    render(c, s) {
      c.dr("arc", s.arc || 0, { d: 1.6 });
      c.tx("hh", s.hh || "");
      c.op("ml", s.ml === 0 ? 0 : 1);
      c.op("cov", s.cov ? 1 : 0);
      const rows = s.rows || [];
      for (let i = 0; i < 3; i++) { c.tx("ct" + i, rows[i] || ""); setMark(c, "cm" + i, s.cov ? ((s.mk || [])[i] || "") : ""); }
      const rb = !!s.recs;
      c.vis({ old: rb || s.old, new: rb || s.old, lane: rb, cf: s.conf });
      setMark(c, "om", s.om || "");
      for (let i = 0; i < 3; i++) {
        c.op("rc" + i, rb ? 1 : 0);
        let x = 304 + i * 30, y = 268;
        if (s.back) { x = s.conf && i === 1 ? 200 : 30 + i * 30; }
        c.mv("rc" + i, { x, y }, { d: 1.3, dl: i * 0.2, e: "power2.inOut" });
      }
      c.cl("rc1", "a-shake", !!s.conf);
      setNote(c, "nt", s.nt); setNote(c, "no", s.no); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: TRIGGER — a numerical stop / rollback trigger: backlog
// gauge with a proposed threshold, two distinct actions, named decision
// rights, and the point after which rollback is no longer possible.
// template: Health risk assessment — https://lottiefiles.com/free-animation/health-risk-assessment-bOhC3au0wY
// template: Wrong feedback — https://lottiefiles.com/free-animation/wrong-feedback-s8Ijly21K0
// =====================================================================
function F_TRIGGER(p) {
  const f = pfx(p);
  return {
    p, bench: "Health risk assessment + Wrong feedback (LottieFiles)",
    draw() {
      let s = T(64, 28, "Unresolved", 12, C.navy) + T(64, 42, "exceptions", 12, C.navy);
      s += R(46, 52, 36, 176, C.white, 18, `stroke="${C.slate}" stroke-width="2.5"`) + O(64, 236, 22, C.white, `stroke="${C.slate}" stroke-width="2.5"`) + O(64, 236, 16, C.orange);
      s += rep(5, (i) => P(`M84 ${70 + i * 34} H92`, C.slate, 1.6));
      s += `<rect data-k="${p}lv" x="52" y="58" width="24" height="176" rx="12" fill="${C.orange}"/>`;
      s += f.H("th", P("M36 130 H98", C.red, 3, 'stroke-dasharray="6 4"') + chip(150, 130, "Proposed trigger", { sz: 12, st: C.red, fg: C.red }) + T(150, 152, "not yet approved", 11, C.amber));
      s += f.H("vg", cloudI(150, 92) + T(150, 96, "Feels bad?", 11, C.slate));
      s += f.H("vgX", cross(150, 92, 1.8, C.red, 4));
      s += f.K("ps", R(214, 50, 178, 84, C.white, 10, `stroke="${C.red}" stroke-width="2"`) + barrierI(244, 82, 0.85) + T(274, 80, "STOP", 15, C.red, "", "start") + T(274, 98, "the next wave", 12, C.ink, "", "start") + f.TK("ws", 228, 124, "", 12, C.slate, "start"));
      s += f.K("pr", R(214, 146, 178, 84, C.white, 10, `stroke="${C.plum}" stroke-width="2"`) + undoI(244, 182, C.plum, 1) + T(274, 176, "ROLL BACK", 15, C.plum, "", "start") + T(274, 194, "a live site", 12, C.ink, "", "start") + f.TK("wr", 228, 220, "", 12, C.slate, "start"));
      s += f.H("hS", R(210, 46, 186, 92, "none", 13, `stroke="${C.gold}" stroke-width="3.5" class="a-pulse"`));
      s += f.H("hR", R(210, 142, 186, 92, "none", 13, `stroke="${C.gold}" stroke-width="3.5" class="a-pulse"`));
      s += f.H("kS", keyI(360, 114, C.amber, 1)) + f.H("kR", keyI(360, 210, C.amber, 1));
      s += f.H("rX", cross(303, 188, 3, C.red, 5));
      s += f.H("pnr", P("M110 262 H392", C.slate, 3) + P("M300 252 V272", C.red, 3) + T(300, 246, "No return", 12, C.red));
      s += f.H("mk", O(0, 262, 8, C.navy, `stroke="${C.white}" stroke-width="2"`));
      s += f.H("wait", rep(3, (i) => buddy(132 + i * 26, 254, 10, C.navy2)) + clockI(212, 248, 10, C.red));
      s += noteSVG(f, "nt", 240, 22) + noteSVG(f, "nb", 240, 286);
      return s;
    },
    render(c, s) {
      const lv = clamp(s.lv == null ? 0.3 : s.lv, 0.02, 1);
      c.mv("lv", { sy: lv, pv: [64, 234] }, { d: 1.2 });
      c.fl("lv", s.th != null && lv >= s.th ? C.red : C.orange);
      c.op("th", s.th != null ? 1 : 0); c.mv("th", { y: s.th != null ? (234 - s.th * 176) - 130 : 0 }, { d: 0.9 });
      c.vis({ vg: s.vg, vgX: s.vgX, hS: s.hl === "s", hR: s.hl === "r", kS: s.whoS === "ok", kR: s.whoR === "ok", rX: s.past, pnr: s.pnr, mk: s.pnr, wait: s.wait });
      c.op("ps", s.ps === 0 ? 0.25 : 1); c.op("pr", s.pr === 0 ? 0.25 : 1);
      c.tx("ws", s.whoS === "ok" ? "Decided by: named" : s.whoS === "q" ? "Decided by: ?" : "");
      c.tx("wr", s.whoR === "ok" ? "Decided by: named" : s.whoR === "q" ? "Decided by: ?" : "");
      c.mv("mk", { x: 110 + (s.pos || 0) * 282 }, { d: 1.2 });
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: CHECK — a titled checklist that ticks itself.
// template: Checklist — https://lottiefiles.com/free-animation/checklist-c1qt4p98BW
// template: Success — https://lottiefiles.com/free-animation/success-he8DVHwbzM
// =====================================================================
function F_CHECK(p) {
  const f = pfx(p);
  return {
    p, bench: "Checklist + Success (LottieFiles)",
    draw() {
      let s = R(36, 34, 328, 230, C.white, 12, `stroke="${C.navy}" stroke-width="2"`) + R(36, 34, 328, 30, C.navy, 12) + R(36, 52, 328, 12, C.navy) + f.TK("ti", 200, 55, "", 14, C.white);
      s += f.H("hl", R(44, 0, 312, 28, "rgba(229,183,108,.32)", 6));
      for (let i = 0; i < 6; i++) {
        const y = 92 + i * 30;
        s += f.H("r" + i, O(62, y - 5, 11, C.navy) + T(62, y - 0.5, String(i + 1), 12, C.white) + f.TK("t" + i, 82, y, "", 13.5, C.ink, "start") + markSVG(f, "m" + i, 338, y - 5, 0.8));
      }
      s += `<g transform="rotate(-6 290 250)">${noteSVG(f, "st", 290, 250, 13)}</g>`;
      s += noteSVG(f, "nb", 200, 286);
      return s;
    },
    render(c, s) {
      c.tx("ti", s.t || "");
      const it = s.items || [];
      for (let i = 0; i < 6; i++) {
        c.op("r" + i, it[i] ? (s.dimTo != null && i > s.dimTo ? 0.35 : 1) : 0, { dl: i * 0.08 });
        c.tx("t" + i, it[i] || "");
        setMark(c, "m" + i, it[i] ? ((s.mk || [])[i] || "") : "");
      }
      c.op("hl", s.hl != null ? 1 : 0); c.mv("hl", { y: 92 + (s.hl || 0) * 30 - 20 }, { d: 0.6 });
      setNote(c, "st", s.st); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: HAND — handover from the project team to operations:
// ownership, measures, exceptions, procedures and defects travel across;
// the project team can leave only when nothing depends on it.
// template: teamwork — https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6
// template: Business Solution conveyor — https://lottiefiles.com/free-animation/business-solution-pNyNfkcRsa
// =====================================================================
function F_HAND(p) {
  const f = pfx(p);
  const IT = [["Ownership", C.navy], ["Measures", C.teal], ["Exceptions", C.orange], ["Procedures", C.green], ["Defects", C.red]];
  return {
    p, bench: "teamwork + Business Solution conveyor (LottieFiles)",
    draw() {
      let s = R(10, 40, 146, 192, "rgba(255,255,255,.6)", 12, `stroke="${C.plum}" stroke-width="2" stroke-dasharray="6 4"`) + T(83, 60, "Project team", 13.5, C.plum);
      s += R(244, 40, 148, 192, "rgba(255,255,255,.75)", 12, `stroke="${C.green}" stroke-width="2.2"`) + T(318, 60, "Operations", 13.5, C.green);
      s += R(156, 206, 88, 10, C.slate, 5) + rep(4, (i) => O(168 + i * 21, 211, 3, C.white));
      s += f.K("pt", person(46, 214, 1, C.plum) + person(83, 214, 1, C.plum) + person(120, 214, 1, C.plum));
      s += person(278, 214, 1.1, C.green) + person(320, 214, 1, C.navy2) + person(358, 214, 1, C.navy2);
      IT.forEach(([l, col], i) => { s += f.H("i" + i, R(-44, -10, 88, 20, C.white, 10, `stroke="${col}" stroke-width="2"`) + T(0, 4.5, l, 12, col)); });
      s += f.H("hl", R(-50, -14, 100, 28, "none", 13, `stroke="${C.gold}" stroke-width="3" class="a-pulse"`));
      s += f.H("stk", P("M322 186 C262 150 160 150 118 186", C.orange, 2.6, 'class="a-flow"') + O(340, 178, 9, C.white, `stroke="${C.orange}" stroke-width="2"`) + T(340, 182.5, "?", 12, C.orange));
      s += f.H("onm", R(252, 240, 132, 30, "#eef0f3", 6, `stroke="${C.slate}" stroke-width="1.8" stroke-dasharray="4 3"`) + T(318, 260, "Owner: name only", 12, C.slate));
      s += f.H("oac", `<g class="a-spin">${gearI(298, 182, 10, C.amber, C.white)}</g>` + chip(318, 256, "Active owner", { sz: 12, bg: C.green, st: C.green, fg: C.white }));
      s += noteSVG(f, "nt", 200, 20) + noteSVG(f, "nb", 200, 287);
      return s;
    },
    render(c, s) {
      const mvd = s.mv || [], shown = s.items == null ? 5 : s.items;
      IT.forEach((_, i) => {
        const moved = mvd.indexOf(i) >= 0;
        c.op("i" + i, i < shown ? 1 : 0, { dl: i * 0.08 });
        c.mv("i" + i, { x: moved ? 318 : 83, y: 82 + i * 24 }, { d: 1.2, dl: moved ? i * 0.12 : 0, e: "power2.inOut" });
      });
      const hp = s.hl != null ? [mvd.indexOf(s.hl) >= 0 ? 318 : 83, 82 + s.hl * 24] : null;
      c.op("hl", hp ? 1 : 0); if (hp) c.mv("hl", { x: hp[0], y: hp[1] }, { d: 1.2 });
      c.op("pt", s.leave ? 0 : 1, { dl: s.leave ? 0.4 : 0 }); c.mv("pt", s.leave ? { x: -150 } : {}, { d: 1.4 });
      c.vis({ stk: s.stuck, onm: s.own === "name", oac: s.own === "active" });
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: DEFECT — the open-defect register that must survive
// project closure: every defect with a named owner and a date.
// template: Project Dashboard — https://lottiefiles.com/free-animation/project-dashboard-PeJUc2p1iB
// template: Man with task list — https://lottiefiles.com/free-animation/man-with-task-list-Z2XrIU43bQ
// =====================================================================
function F_DEFECT(p) {
  const f = pfx(p);
  return {
    p, bench: "Project Dashboard + Man with task list (LottieFiles)",
    draw() {
      let s = R(16, 46, 368, 192, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + R(16, 46, 368, 30, C.navy, 10) + R(16, 66, 368, 10, C.navy) +
        T(30, 66, "Open defect", 13, C.white, "", "start") + T(250, 66, "Owner", 13, C.white) + T(342, 66, "Date", 13, C.white);
      s += f.H("hl", R(20, 0, 360, 34, "rgba(229,183,108,.32)", 6));
      for (let i = 0; i < 4; i++) {
        const y = 104 + i * 36;
        s += f.H("r" + i, f.TK("d" + i, 30, y, "", 12.5, C.ink, "start") + f.TK("o" + i, 250, y, "", 12.5, C.navy) + f.TK("t" + i, 342, y, "", 12.5, C.navy) + P(`M24 ${y + 14} H376`, "#e4e9ef", 1.2) +
          markSVG(f, "mo" + i, 250, y - 4, 0.7) + markSVG(f, "mt" + i, 342, y - 4, 0.7));
      }
      s += f.H("lost", chip(200, 262, "Lost when the team leaves", { sz: 12.5, bg: C.red, st: C.red, fg: C.white }));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 200, 286);
      return s;
    },
    render(c, s) {
      const rows = s.rows || [];
      for (let i = 0; i < 4; i++) {
        const r = rows[i];
        c.op("r" + i, r ? (s.drop === i ? 0 : 1) : 0, { dl: s.drop === i ? 0.6 : i * 0.1, d: s.drop === i ? 1.2 : 0.6 });
        c.mv("r" + i, s.drop === i ? { y: 60 } : {}, { d: 1.4 });
        c.tx("d" + i, r ? r[0] : ""); c.tx("o" + i, r && r[1] ? r[1] : ""); c.tx("t" + i, r && r[2] ? r[2] : "");
        setMark(c, "mo" + i, r && !r[1] ? "q" : ""); setMark(c, "mt" + i, r && !r[2] ? "q" : "");
      }
      c.op("hl", s.hl != null ? 1 : 0); c.mv("hl", { y: 104 + (s.hl || 0) * 36 - 22 }, { d: 0.6 });
      c.op("lost", s.drop != null ? 1 : 0, { dl: 0.8 });
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: PHASES — the ten-phase framework as a snake of stations,
// with Implement (8), Realize Value (9) and Sustainable Performance (10)
// and the three continuous threads beneath.
// template: Multi-Step Icon Animation — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
// template: SVG Timeline + ScrollTrigger + Paths — https://codepen.io/ruru_wang/pen/VwOPzgy
// =====================================================================
function F_PHASES(p) {
  const f = pfx(p);
  const PX = [60, 130, 200, 270, 340, 340, 270, 200, 130, 60], PY = (n) => (n < 5 ? 82 : 170);
  const NM = ["Strategy", "Architecture", "Launch pad", "Understand", "Innovate", "People", "Develop", "Implement", "Realize value", "Sustain"];
  return {
    p, bench: "Multi-Step Icon Animation (LottieFiles) + SVG Timeline paths (CodePen)",
    draw() {
      let s = P("M60 82 H340 C384 82 384 170 340 170 H60", C.muted, 6);
      for (let n = 0; n < 10; n++) {
        const x = PX[n], y = PY(n);
        s += f.K("c" + n, O(x, y, 19, C.white, `stroke="${C.slate}" stroke-width="2.5"`) + T(x, y + 5, String(n + 1), 14, C.slate));
        s += f.H("o" + n, O(x, y, 19, n === 7 ? C.orange : n > 7 ? C.green : C.navy) + T(x, y + 5, String(n + 1), 14, C.white));
        s += T(x, y + 36, NM[n], 11.5, n === 7 ? C.orange : C.slate);
      }
      s += f.H("cu", O(0, 0, 27, "none", `stroke="${C.gold}" stroke-width="3.5" class="a-pulse"`));
      s += f.H("thr", P("M18 236 H382", C.navy, 4) + P("M18 252 H382", C.teal, 4) + P("M18 268 H382", C.amber, 4) +
        chip(80, 236, "Project mgmt", { sz: 11, st: C.navy, fg: C.navy }) + chip(200, 252, "Change mgmt", { sz: 11, st: C.teal, fg: C.teal }) + chip(320, 268, "Leadership", { sz: 11, st: C.amber, fg: C.amber }));
      s += noteSVG(f, "nt", 200, 24) + noteSVG(f, "nb", 200, 286);
      return s;
    },
    render(c, s) {
      const hl = s.hl || [];
      for (let n = 0; n < 10; n++) { c.op("o" + n, hl.indexOf(n + 1) >= 0 ? 1 : 0, { dl: hl.indexOf(n + 1) * 0.12 }); c.op("c" + n, s.dim && hl.indexOf(n + 1) < 0 ? 0.35 : 1); }
      c.op("cu", s.cur ? 1 : 0); if (s.cur) c.mv("cu", { x: PX[s.cur - 1], y: PY(s.cur - 1) }, { d: 0.9 });
      c.op("thr", s.thr ? 1 : 0);
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: FORUM — the asynchronous forum: post your own
// recommendation first, then reply to two classmates, disagreeing with
// at least one; Assessment Three is separate.
// template: Service Experience Feedback — https://lottiefiles.com/free-animation/service-experience-feedback-vxEY8nkHzh
// template: Join your team — https://lottiefiles.com/free-animation/join-your-team-qaD4U7x6Ml
// =====================================================================
function F_FORUM(p) {
  const f = pfx(p);
  const post = (y, col, a, b, av) => R(70, y, 296, 40, C.white, 10, `stroke="${col}" stroke-width="2"`) + person(48, y + 30, 0.85, av) + T(84, y + 17, a, 12.5, col, "", "start") + T(84, y + 33, b, 11.5, C.slate, "", "start");
  return {
    p, bench: "Service Experience Feedback + Join your team (LottieFiles)",
    draw() {
      let s = f.K("card", R(24, 36, 352, 222, "rgba(255,255,255,.8)", 12, `stroke="${C.navy}" stroke-width="2"`) + R(24, 36, 352, 30, C.navy, 12) + R(24, 54, 352, 12, C.navy) + T(200, 57, "Forum: One Weekend or Nine Months", 13, C.white));
      s += f.H("p0", post(78, C.navy, "Your recommendation", "posted before reading others", C.navy) + O(356, 84, 10, C.green) + tick(356, 84, 0.55, C.white, 2.2));
      s += f.H("lk", R(70, 128, 296, 86, "#eef0f3", 10) + rep(3, (i) => R(86, 142 + i * 22, 220 - i * 40, 10, "#d5dbe2", 5)) + lockI(340, 170, C.slate, 1.2));
      s += f.H("p1", post(128, C.green, "Reply 1: builds on it", "uses go / no-go criteria", C.teal));
      s += f.H("p2", post(176, C.red, "Reply 2: I disagree…", "uses rollback evidence", C.plum));
      s += f.H("cn", chip(200, 236, "Use this week's concepts", { sz: 12, st: C.amber, fg: C.amber }));
      s += f.H("a3", R(24, 70, 170, 150, C.navy, 12) + T(109, 112, "Assessment 3", 15, C.white) + T(109, 138, "Group research", 12.5, C.white) + T(109, 156, "project", 12.5, C.white) + T(109, 196, "Graded", 12, C.gold) +
        R(206, 70, 170, 150, C.white, 12, `stroke="${C.green}" stroke-width="2.4"`) + T(291, 112, "VoiceLearn", 15, C.green) + T(291, 138, "Questions for", 12.5, C.ink) + T(291, 156, "practice", 12.5, C.ink) + T(291, 196, "Formative", 12, C.green));
      s += noteSVG(f, "nt", 200, 18) + noteSVG(f, "nb", 200, 284);
      return s;
    },
    render(c, s) {
      const k = s.k || 0;
      c.op("card", s.a3 ? 0.12 : 1);
      c.vis({ p0: !s.a3 && k >= 1, lk: !s.a3 && k === 1, p1: !s.a3 && k >= 2, p2: !s.a3 && k >= 3, cn: !s.a3 && k >= 4, a3: s.a3 });
      c.mv("p1", k >= 2 ? {} : { x: 30 }); c.mv("p2", k >= 3 ? {} : { x: 30 });
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: BALANCE — the steering group's scale: the programme
// director's deadline against the operations director's contingency.
// template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
// template: Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p
// =====================================================================
function F_BALANCE(p) {
  const f = pfx(p);
  return {
    p, bench: "Comparison Chart + Choosing a path (LottieFiles)",
    draw() {
      let s = R(176, 250, 48, 8, C.ink, 3) + P("M200 100 V250", C.ink, 5);
      s += f.K("bm", P("M70 100 H330", C.ink, 5) + O(200, 100, 7, C.ink) + P("M70 100 L34 176 M70 100 L106 176 M330 100 L294 176 M330 100 L366 176", C.slate, 1.8) +
        R(24, 174, 92, 7, C.orange, 3) + R(284, 174, 92, 7, C.green, 3) + noteSVG(f, "pl0", 70, 160, 12.5) + noteSVG(f, "pl1", 70, 132, 12.5) + noteSVG(f, "pr0", 330, 160, 12.5) + noteSVG(f, "pr1", 330, 132, 12.5));
      s += f.H("who", person(70, 236, 1.1, C.orange) + T(70, 266, "Programme", 12, C.orange) + T(70, 280, "director", 12, C.orange) + person(330, 236, 1.1, C.green) + T(330, 266, "Operations", 12, C.green) + T(330, 280, "director", 12, C.green));
      s += noteSVG(f, "nt", 200, 24) + noteSVG(f, "nm", 200, 214);
      return s;
    },
    render(c, s) {
      c.mv("bm", { r: (s.tilt || 0) * 7, pv: [200, 100] }, { d: 1.3, e: "power2.inOut" });
      const l = s.l || [], r = s.r || [];
      setNote(c, "pl0", l[0]); setNote(c, "pl1", l[1]); setNote(c, "pr0", r[0]); setNote(c, "pr1", r[1]);
      c.op("who", s.who === 0 ? 0 : 1);
      setNote(c, "nt", s.nt); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: DIP — the implementation dip (compact): performance
// falls after go-live, support props the valley, recovery follows.
// template: Line Chart — https://lottiefiles.com/free-animation/line-chart-q9Ehbk6l4y
// template: Easing Animations — https://observablehq.com/@d3/easing-animations
// =====================================================================
function F_DIP(p) {
  const f = pfx(p);
  return {
    p, bench: "Line Chart (LottieFiles) + Easing Animations (Observable)",
    draw() {
      let s = R(20, 40, 370, 192, "#fffdf8", 10, `stroke="${C.slate}" stroke-width="1.6"`) + T(30, 60, "Performance", 12, C.slate, "", "start");
      s += rep(7, (i) => P(`M${70 + i * 50} 44 V228`, "#f0e6d6", 1));
      s += P("M120 70 V226", C.slate, 2, 'stroke-dasharray="4 4"') + T(120, 248, "Go-live", 12, C.slate);
      s += f.H("al", P("M28 214 H382", C.red, 2.4, 'stroke-dasharray="7 5"') + T(382, 208, "Failure line", 12, C.red, "", "end"));
      s += f.H("sup", P("M172 226 V176 M205 226 V192 M238 226 V178", C.amber, 5) + chip(205, 140, "Training + support", { sz: 12, st: C.amber, fg: C.amber }));
      s += f.D("cv", "M30 110 H120 C150 110 165 190 205 190 C245 190 255 120 290 110 C320 100 350 80 382 70", C.navy, 4.5);
      s += f.H("rec", O(382, 70, 10, C.green) + tick(382, 70, 0.6, C.white, 2.4));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 200, 278);
      return s;
    },
    render(c, s) {
      c.dr("cv", s.dr == null ? 1 : s.dr, { d: 1.5 });
      c.vis({ al: s.al, sup: s.sup, rec: s.rec });
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}


// =====================================================================
// W12O2b · Training people to use the process — and helping them stay
// with it (27 lines). One state per narration line.
// Shots: DIP, LOBBY, WEEKS, TRAIN, COMPARE, ROUTER, BOARD, CHECK, CHART
// =====================================================================
{
  const id = "W12O2b";
  const MODS4 = ["Ordinary arrival", "Unusual cases", "Handovers", "New duties"];
  const plan = [
    ["dip", { dr: 1, nt: { t: "We expect a dip", c: "N" }, nb: { t: "Expecting it isn't managing it", c: "O" } }, "Expecting isn't managing"],
    ["lobby", { g: "desk", corp: 1, q: 1, help: 1, nt: { t: "Prepare, then support", c: "G" } }, "Prepare and support people"],
    ["weeks", { wk: 6, guest: 1, near: 1, nt: { t: "Beyond the classroom", c: "N" }, nb: { t: "Support continues after go-live", c: "G" } }, "Beyond the classroom"],
    ["train", { mods: ["Kiosk screens", "Ordinary arrival"], mk: ["ok", "ok"], right: 0, nt: { t: "Kiosk training: done", c: "G" } }, "Kiosk training completed"],
    ["lobby", { g: "kiosk", corp: 1, rej: 1, busy: 1, qn: 3, nt: { t: "Corporate booking rejected", c: "R" } }, "Busy shift, booking rejected"],
    ["lobby", { g: "desk", corp: 1, route: 1, q: 1, busy: 1, qn: 3, nl: { t: "Screens: known", c: "G" }, nr: { t: "Who authorises?", c: "O" } }, "Interface known, exception not"],
    ["train", { mods: ["Kiosk screens", "Ordinary arrival"], mk: ["ok", "ok"], live: ["Ordinary arrival", "Corporate case", "Authorisation", "Busy-shift queue"], lk: ["ok", "x", "x", "q"], gap: 1, nb: { t: "Technical training isn't enough", c: "R" } }, "Technique isn't the whole process"],
    ["train", { mods: MODS4, mk: ["ok", "ok", "ok", "ok"], live: MODS4, lk: ["ok", "ok", "ok", "ok"], nb: { t: "Train the real work", c: "G" } }, "Train the work people really do"],
    ["train", { mods: MODS4, mk: ["ok", "ok", "ok", "ok"], live: MODS4, lk: ["ok", "ok", "ok", "ok"], roles: 1, rl: { t: "Practise exceptions", c: "G" }, rr: { t: "Escalation decisions", c: "N" } }, "Reception and supervisors differ"],
    ["train", { mods: ["Why we change", "Ordinary arrival", "Unusual cases", "Handovers"], mk: ["ok", "ok", "ok", "ok"], hlL: 0, live: MODS4, lk: ["ok", "ok", "ok", "ok"], why: 1, nb: { t: "Explain why it changes", c: "A" } }, "Explain why it changes"],
    ["compare", { lt: "Only instructions", li: "doc", l: ["Do these steps", "Unsure, passive"], lm: "q", rt: "Purpose explained", ri: "person", r: ["Knows the reason", "Helps it work"], rm: "ok", hl: "r", mid: "→" }, "Purpose builds participation"],
    ["train", { mods: ["Ordinary arrival", "Unusual cases", "Handovers", "Escalation"], mk: ["ok", "ok", "ok", "ok"], live: ["Ordinary arrival", "Unusual cases", "A new situation", "Another new one"], lk: ["ok", "ok", "q", "q"], hlR: 2, nb: { t: "Not every case can be rehearsed", c: "O" } }, "Not every case rehearsed"],
    ["weeks", { wk: 6, bars: 1, nt: { t: "Six weeks of intensive support", c: "G" } }, "Six intensive weeks"],
    ["weeks", { wk: 6, cur: 0, guest: 1, near: 1, far: 1, farX: 1, nb: { t: "Help where the work happens", c: "G" } }, "Support at the desk, not a queue"],
    ["lobby", { g: "desk", corp: 1, route: 1, help: 1, busy: 1, qn: 2, nt: { t: "Before service suffers", c: "O" }, nr: { t: "Guidance now", c: "G" } }, "Guidance before damage"],
    ["weeks", { wk: 6, bars: 1, guest: 1, cap: 1, nm: { t: "Extra hands while learning", c: "G" } }, "Extra frontline capacity"],
    ["compare", { lt: "Planned support", li: "cal", l: ["Budgeted before", "go-live"], lm: "ok", rt: "Sign of failure", ri: "cloud", r: ["'Staff could", "not cope'"], rm: "x", hl: "l", mid: "≠" }, "Planned, not a sign of failure"],
    ["router", { tok: "dia", k: ["Reported", "problem"], up: 1, dn: 1, nt: { t: "Technology or process?", c: "P" } }, "Technology or process?"],
    ["router", { tok: "tech", k: ["Kiosk", "fault"], up: 1, dn: 1, noAuth: 1, only: "tech", nb: { t: "Repairs, but can't redesign", c: "O" } }, "A fix is not authority"],
    ["router", { tok: "proc", k: ["Unsuitable", "procedure"], up: 1, dn: 1, auth: 1, only: "proc", nb: { t: "Route to who can decide", c: "G" } }, "Escalate to the right authority"],
    ["board", { cards: [["Corp rejected", 0], ["Corp rejected", 0], ["Unclear step", 0], ["Key card slow", 1]], recur: 0, nt: { t: "Raised every day", c: "N" }, nm: { t: "Spot repeats early", c: "O" } }, "Raise problems daily"],
    ["board", { cards: [["Corp rejected", 1], ["Unclear step", 2], ["Printer jam", 2], ["Key card slow", 2]], win: 1, cred: 0.55, nt: { t: "Quick, visible fixes", c: "G" } }, "Early wins buy credibility"],
    ["board", { cards: [["Corp rejected", 0], ["Unclear step", 0], ["Printer jam", 0], ["Key card slow", 0]], quiet: 1, cred: 0.18, nm: { t: "No change, no more reports", c: "R" } }, "Silence follows inaction"],
    ["board", { cards: [["Corp rejected", 1], ["Unclear step", 2], ["Printer jam", 2], ["Key card slow", 2]], told: 1, cred: 0.75, nm: { t: "You said, we fixed", c: "G" } }, "Tell staff what was fixed"],
    ["board", { cards: [["Corp rejected", 2], ["Unclear step", 2], ["Printer jam", 2], ["Key card slow", 2]], told: 1, cred: 0.95, nt: { t: "Their experience shapes it", c: "G" } }, "Confidence grows"],
    ["check", { t: "Training and support plan", items: ["Prepare for the real work", "Protect service with support", "Reliable route for problems"], mk: ["ok", "ok", "ok"], st: { t: "Planned before go-live", c: "G" } }, "Prepare, protect, resolve"],
    ["chart", { dr: 0.72, t100: 1, nb: { t: "Next: workarounds that persist", c: "P" } }, "Next: persistent workarounds"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#f3f6f1", plan,
    desc: "A receptionist trained on the kiosk meets a rejected corporate booking on a busy shift. Training that mirrors real work, explaining why, six weeks of support on the floor, extra capacity, escalation by problem type to the person with authority, and a daily problem board whose visible fixes build staff trust.",
    shots: { dip: F_DIP("di_"), lobby: F_LOBBY("lo_"), weeks: F_WEEKS("wk_"), train: F_TRAIN("tr_"), compare: F_COMPARE("cp_"), router: F_ROUTER("ro_"), board: F_BOARD("bo_"), check: F_CHECK("ck_"), chart: F_CHART("ch_") }
  });
  SCENE_BG.push([id, "#f3f6f1"]);
}

// =====================================================================
// W12O2c · When adoption stops at sixty-five percent (27 lines)
// Shots: LOBBY, CHART, WAFFLE, COMPARE, BARS, BOARD, CHECK, TRAIN,
// GAUGE, BALANCE, MAP
// =====================================================================
{
  const id = "W12O2c";
  const plan = [
    ["lobby", { g: "done", kok: 1, help: 1, nt: { t: "Pilot: Marina + Corniche", c: "N" }, nb: { t: "A persistent problem appears", c: "O" } }, "The pilot reveals a problem"],
    ["chart", { dr: 1, t100: 1, plat: 1, big: 1, dot: 11, nt: { t: "Week 11: still 65%", c: "O" } }, "Adoption stuck at 65%"],
    ["waffle", { sort: 1, corp: 1, nb: { t: "35% still go to the desk", c: "O" } }, "35% at the reception desk"],
    ["compare", { lt: "Manager's guess", li: "crowd", l: ["Staff won't use", "the kiosk"], lm: "q", rt: "Not yet checked", ri: "kiosk", r: ["Which arrivals", "stay at the desk?"], rm: "q", hl: "l", mid: "?" }, "Is it resistance?"],
    ["waffle", { sort: 1, why: 1, dimG: 1, nb: { t: "Look at who stays out", c: "N" } }, "Examine the 35%"],
    ["compare", { lt: "Resistance", li: "person", l: ["Respond with", "support, persuasion"], rt: "Process limit", ri: "gear", r: ["Respond by", "fixing the design"], mid: "≠" }, "Different causes, different fixes"],
    ["lobby", { g: "kiosk", corp: 1, rej: 1, nt: { t: "Encouragement can't fix this", c: "R" } }, "Encouragement can't help here"],
    ["lobby", { g: "desk", corp: 1, route: 1, dimK: 1, nt: { t: "Assisted path works, slowly", c: "O" } }, "The assisted path works"],
    ["bars", { ti: "Time per arrival in the pilot", rows: [["Kiosk arrival", 2, "g", "2 min"], ["Assisted exception", 9, "o", "9 min"]], max: 10, nm: { t: "4.5 times longer", c: "O" } }, "2 minutes versus 9"],
    ["lobby", { g: "desk", corp: 1, route: 1, tK: 1, tA: 1, qn: 4, nb: { t: "A continuing desk workload", c: "O" } }, "The continuing workload"],
    ["bars", { ti: "What total cost needs", rows: [["Minutes per assisted arrival", 9, "o", "9 min"], ["Assisted arrivals per day", 0, "s", "?", "q"], ["Staff on each shift", 0, "s", "?", "q"]], max: 10, nm: { t: "Missing: volumes, staffing", c: "R" } }, "Time alone isn't cost"],
    ["chart", { dr: 1, wk: 1, nt: { t: "Measure from day one", c: "N" } }, "Measure adoption weekly"],
    ["chart", { dr: 1, t100: 1, gap: 1, plat: 1, nt: { t: "A plateau is a design message", c: "O" } }, "The plateau speaks of design"],
    ["waffle", { sort: 1, why: 1, corp: 1, dimG: 1, nb: { t: "Look past the headline 65%", c: "N" } }, "Look past the headline"],
    ["board", { cards: [["Corp rejected", 0], ["Corp rejected", 0], ["Corp rejected", 0], ["Group arrival", 0]], recur: 0, nt: { t: "Which fail, where, how often?", c: "O" } }, "Same exception, again"],
    ["waffle", { sort: 1, q: 1, dimG: 1 }, "Approved exception or workaround?"],
    ["compare", { lt: "Informal workaround", li: "wrench", l: ["Staff improvise", "around a gap"], lm: "w", rt: "What it signals", ri: "gear", r: ["The process misses", "an ordinary case"], rm: "q", hl: "r", mid: "→" }, "A workaround is a signal"],
    ["lobby", { g: "desk", corp: 1, route: 1, sup: 1, nt: { t: "Introduced on purpose", c: "G" }, nr: { t: "Answer to staff", c: "G" } }, "Introduced after staff objections"],
    ["compare", { lt: "Assisted path", li: "shield", l: ["Approved route", "for exceptions"], lm: "ok", rt: "Workaround", ri: "wrench", r: ["Unapproved", "detour"], rm: "x", mid: "≠" }, "Approved path isn't a workaround"],
    ["check", { t: "Workaround catalogue", items: ["Training gap → retrain", "Unclear procedure → rewrite", "Process limit → redesign"], mk: ["q", "q", "q"], st: { t: "Classify each one", c: "P" } }, "Catalogue and classify"],
    ["train", { mods: ["Corporate case", "Corporate case", "Corporate case"], mk: ["ok", "ok", "ok"], live: ["Corporate booking"], lk: ["x"], gap: 1, nb: { t: "Retraining can't fix design", c: "R" } }, "Retraining won't fix the design"],
    ["gauge", { v: 7.9, v0: 6.8, big: "7.9", bigc: "g", nL: { t: "Before: 6.8", c: "N" }, nR: { t: "Pilot: 7.9", c: "G" }, nt: { t: "Guest satisfaction", c: "N" } }, "Satisfaction 6.8 → 7.9"],
    ["gauge", { v: 7.9, v0: 6.8, big: "7.9", bigc: "g", nL: { t: "Average", c: "N" }, nR: { t: "Every category?", c: "O" }, nb: { t: "An average hides categories", c: "O" } }, "Good average, not every case"],
    ["balance", { l: [{ t: "Satisfaction 7.9", c: "G" }, { t: "Assisted path works", c: "G" }], r: [{ t: "Plateau at 65%", c: "O" }, { t: "Corporate rejected", c: "R" }], who: 0, nm: { t: "A judgement, not a verdict", c: "P" } }, "Is 65% a success?"],
    ["compare", { lt: "Acceptable", li: "shield", l: ["Controlled", "assisted handling"], lm: "q", rt: "Needs correction", ri: "gear", r: ["Fix the corporate", "booking gap"], rm: "q", mid: "or" }, "Accept or correct?"],
    ["board", { cards: [["Corp rejected", 1], ["Unclear step", 2], ["Group arrival", 2]], told: 1, cred: 0.8, nm: { t: "Tell staff what changed", c: "G" } }, "Share what was learned"],
    ["map", { lit: ["pil"], trv: 1, nb: { t: "Next: twelve more properties?", c: "P" } }, "Next: twelve more sites"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#f6f1ea", plan,
    desc: "Eleven weeks into the Marina and Corniche pilot, kiosk adoption has flattened at 65 percent. The 35 percent at the desk are mostly rejected corporate bookings, not resistance; kiosk 2 minutes versus assisted 9 minutes, unknown volumes, workarounds catalogued, satisfaction 6.8 to 7.9, and a judgement rather than a verdict.",
    shots: { lobby: F_LOBBY("lo_"), chart: F_CHART("ch_"), waffle: F_WAFFLE("wf_"), compare: F_COMPARE("cp_"), bars: F_BARS("ba_"), board: F_BOARD("bo_"), check: F_CHECK("ck_"), train: F_TRAIN("tr_"), gauge: F_GAUGE("ga_"), balance: F_BALANCE("bl_"), map: F_MAP("mp_") }
  });
  SCENE_BG.push([id, "#f6f1ea"]);
}

// =====================================================================
// W12O1d · A pilot is not fourteen properties (27 lines)
// Shots: MAP, CHECK, COMPARE, LOBBY, CHART, ARCH, BARS, WAFFLE, GANTT
// =====================================================================
{
  const id = "W12O1d";
  const SUP_THIN = [1, 1, 0.95, 0.9, 0.85, 0.75, 0.65, 0.6, 0.5, 0.45, 0.4, 0.32, 0.26, 0.2];
  const SUP_FAIR = [1, 1, 0.8, 0.8, 0.8, 0.8, 0.8, 1, 1, 1, 1, 1, 1, 1];
  const plan = [
    ["map", { grp: 1, lit: ["pil"], trv: 1, nb: { t: "How far does it travel?", c: "P" } }, "How far does the pilot travel?"],
    ["check", { t: "What the pilot taught", items: ["Real guest arrivals", "How staff adjusted", "Kiosk limit: corporate"], mk: ["ok", "ok", "w"] }, "Valuable pilot evidence"],
    ["map", { grp: 1, mk: { pil: "ok", std: "q", her: "q", peak: "q" }, nb: { t: "2 of 14 tested", c: "O" } }, "Two can't speak for fourteen"],
    ["compare", { lt: "Pilot sites", li: "hotel", l: ["Marina,", "Corniche"], lm: "ok", rt: "Elsewhere", ri: "hotel", r: ["Same results?", "Not yet known"], rm: "q", mid: "→", nt: { t: "Pilot generalisability", c: "P" } }, "Pilot generalisability"],
    ["map", { grp: 1, lit: ["pil"], mk: { pil: "ok" }, nb: { t: "Works there ≠ ready here", c: "O" } }, "Works there, not proven here"],
    ["lobby", { g: "done", kok: 1, nt: { t: "Live at two pilot hotels", c: "G" } }, "Two pilots already live"],
    ["chart", { dr: 1, plat: 1, big: 1, nt: { t: "Pilot lesson: the plateau", c: "O" } }, "The plateau and corporate cases"],
    ["map", { grp: 1, lit: ["std", "her", "peak"], nb: { t: "Different conditions", c: "N" } }, "The others differ"],
    ["lobby", { small: 1, noK: 1, g: "door", nt: { t: "Heritage lobby", c: "P" } }, "No room for a kiosk"],
    ["arch", { tr: 1, vr: 1, nb: { t: "One standard, approved variants", c: "N" } }, "Standard and variants"],
    ["arch", { tr: 1, vr: 1, reg: 1, ps: 1, pv: 1, nb: { t: "Registered in Process Architecture", c: "P" } }, "Registered variants"],
    ["arch", { tr: 1, vr: 1, reg: 1, wa: 1, waX: 1, nt: { t: "Variant ≠ workaround", c: "R" } }, "Not an unauthorised workaround"],
    ["arch", { tr: 1, vr: 1, reg: 1, ps: 1, prep: 1, pmk: ["q", "q", "q"], nb: { t: "Implementation must prepare it", c: "P" } }, "Support the variant properly"],
    ["arch", { tr: 1, vr: 1, reg: 1, pv: 1, rd: 1, nt: { t: "No local redesigns", c: "R" } }, "Variation isn't a free hand"],
    ["arch", { tr: 1, vr: 1, reg: 1, ps: 1, lock: 1, prep: 1, pmk: ["ok", "ok", "ok"], nb: { t: "Same design, local preparation", c: "G" } }, "Preserve design, adapt preparation"],
    ["check", { t: "Each property: ready?", items: ["Infrastructure in place", "Procedures for its route", "People trained and staffed"], mk: ["q", "q", "q"], st: { t: "Site by site", c: "N" } }, "Infrastructure, procedures, people"],
    ["compare", { lt: "Technical", li: "kiosk", l: ["Kiosks installed,", "tests passed"], lm: "ok", rt: "Operational", ri: "person", r: ["Exception support", "not arranged"], rm: "x", mid: "≠" }, "Technically ready isn't enough"],
    ["map", { grp: 1, mk: { std: "q", her: "q", peak: "q" }, pop: 1, nb: { t: "Many sites, many checks", c: "N" } }, "Many locations, many checks"],
    ["map", { grp: 1, trv: 1, mk: { pil: "ok", her: "w", peak: "w" }, nb: { t: "Transfer, then adapt", c: "G" } }, "Transfer learning, adapt safeguards"],
    ["map", { grp: 1, sup: SUP_THIN, nb: { t: "Attention thins out", c: "O" } }, "Uneven attention"],
    ["bars", { ti: "Help per wave (illustration)", rows: [["Early wave", 10, "g", "Full team"], ["Middle wave", 7, "t", "Stretched"], ["Late wave", 4, "o", "Thin"]], max: 10, nm: { t: "Experience up, help down", c: "O" } }, "More experience, less help"],
    ["map", { grp: 1, sup: SUP_FAIR, nb: { t: "Allocate support deliberately", c: "G" } }, "Allocate support on purpose"],
    ["bars", { ti: "Support follows need", rows: [["Local readiness", 6, "n", "Assess"], ["Operating complexity", 8, "p", "Assess"], ["Cost of disruption", 10, "o", "Assess"]], max: 10, nm: { t: "Readiness, complexity, risk", c: "N" } }, "Match support to need"],
    ["waffle", { sort: 1, corp: 1, dimG: 1, nb: { t: "Still unresolved", c: "R" } }, "Corporate cases still open"],
    ["map", { grp: 1, copy: 1, nb: { t: "Same gap, 12 more times", c: "R" } }, "Copying the limitation"],
    ["gantt", { wk: 0, dl: 1, nq: { t: "Order? Evidence first", c: "P" } }, "Evidence before sequencing"],
    ["map", { grp: 1, lit: ["std", "her", "peak"], wave: { std: "?", her: "?", peak: "?" }, nb: { t: "Next: Exhibit 12 and the order", c: "P" } }, "Next: build the order"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#eef3f6", plan,
    desc: "Fourteen Qasr properties in four groups: two pilots, five standard, three heritage and four peak-occupancy. Pilot lessons and their limits, heritage lobbies with no room for kiosks, the registered assisted variant versus an informal workaround, readiness per site, uneven support, and the corporate gap copied twelve times.",
    shots: { map: F_MAP("mp_"), check: F_CHECK("ck_"), compare: F_COMPARE("cp_"), lobby: F_LOBBY("lo_"), chart: F_CHART("ch_"), arch: F_ARCH("ar_"), bars: F_BARS("ba_"), waffle: F_WAFFLE("wf_"), gantt: F_GANTT("gt_") }
  });
  SCENE_BG.push([id, "#eef3f6"]);
}

addStyles(SCENE_BG);
})();


// OPER621 · Week 12 · The Implement Phase — animated teaching scenes (version 1, label: claude)
// File: w12-claude-part3.js  ·  Scenes: W12O1e, W12O3a, W12O3b
// Every narration line maps to one named shot family (its benchmark template is
// named in a "// template:" comment above the family) whose state shows what that
// sentence says about Qasr Hospitality Group's implementation decision.
// Standalone part: defines every helper it uses, registers its scenes and appends
// its own scoped rules (.vls-w12-<secId>) into the single shared <style id="vl-sc-w12">.
// Contract: VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
// step(i, n): i = narration line index, n = number of lines (proportional otherwise).
// Uses window.gsap when present, otherwise CSS transitions; honours prefers-reduced-motion.
(() => {
"use strict";
const PART = "p3";
// ===== shared engine (a self-contained copy lives in every part) =====
window.VL_SCENES = window.VL_SCENES || {};
const VL_SCENES = window.VL_SCENES;
const SCENE_BG = [];
const C = {
  navy: "#1f4e79", navy2: "#2d6a9f", orange: "#c0502a", paper: "#fbf8f1",
  ink: "#1b2a3a", blue: "#dbe7f2", green: "#317c61", gold: "#e5b76c",
  muted: "#91aabd", plum: "#6b4e8a", sand: "#efe4cf", sky: "#eaf2f8",
  red: "#b0362b", white: "#ffffff", mint: "#e1f0e8", peach: "#f8e3d8",
  lilac: "#ece6f3", slate: "#5d7389", teal: "#1f7f99", amber: "#a8741a", grey: "#c5ced8"
};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const num = (v, f) => { const x = Number(v); return Number.isFinite(x) ? x : f; };
const reduced = () => {
  try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
  catch (_) { return false; }
};
const hasG = () => !!(window.gsap && typeof window.gsap.to === "function" && typeof window.gsap.set === "function") && !reduced();
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");

// ---- SVG string builders ----
const R = (x, y, w, h, f, rx = 0, ex = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${ex}/>`;
const O = (cx, cy, r, f, ex = "") => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${ex}/>`;
const P = (d, s, w = 2, ex = "") => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const F = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
const D = (k, d, s, w = 3, ex = "") => `<path data-k="${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100" ${ex}/>`;
const T = (x, y, s, sz = 14, f = C.ink, ex = "", a = "middle") => `<text x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const TK = (k, x, y, s, sz = 14, f = C.ink, a = "middle", ex = "") => `<text data-k="${k}" x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const K = (k, body, ex = "") => `<g data-k="${k}" ${ex}>${body}</g>`;
const H = (k, body, ex = "") => `<g data-k="${k}" style="opacity:0" ${ex}>${body}</g>`;
const tw = (s, sz) => Math.round(String(s).length * sz * 0.6 + sz * 1.3);
const chip = (x, y, s, o = {}) => {
  const sz = o.sz || 13, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.9);
  return R(x - w / 2, y - h / 2, w, h, o.bg || C.white, o.rx == null ? h / 2 : o.rx,
    `stroke="${o.st || C.navy}" stroke-width="${o.sw || 1.8}"${o.dash ? ' stroke-dasharray="4 3"' : ""}`) +
    T(x, y + sz * 0.36, s, sz, o.fg || C.navy);
};
const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${x - 7 * s} ${y} l${5 * s} ${5 * s} l${10 * s} ${-11 * s}`, col, w);
const cross = (x, y, s = 1, col = C.orange, w = 3) => P(`M${x - 6 * s} ${y - 6 * s} l${12 * s} ${12 * s} M${x + 6 * s} ${y - 6 * s} l${-12 * s} ${12 * s}`, col, w);
const person = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}</g>`;
const buddy = (x, y, r, col) => O(x, y, r, col) + O(x - r * 0.35, y - r * 0.12, r * 0.24, C.white) + O(x + r * 0.35, y - r * 0.12, r * 0.24, C.white) + O(x - r * 0.3, y - r * 0.08, r * 0.11, C.ink) + O(x + r * 0.4, y - r * 0.08, r * 0.11, C.ink);
const clockI = (x, y, r, col = C.orange, bg = C.white) => O(x, y, r, bg, `stroke="${col}" stroke-width="${Math.max(2, r / 6)}"`) + P(`M${x} ${y - r * 0.62} V${y} L${x + r * 0.45} ${y + r * 0.3}`, col, Math.max(2, r / 7));
const star = (x, y, s = 1, col = C.gold) => F(`M${x} ${y - 10 * s} l${3 * s} ${6 * s} ${7 * s} ${1 * s} ${-5 * s} ${5 * s} ${1 * s} ${7 * s} ${-6 * s} ${-3 * s} ${-6 * s} ${3 * s} ${1 * s} ${-7 * s} ${-5 * s} ${-5 * s} ${7 * s} ${-1 * s} Z`, col, `stroke="${C.amber}" stroke-width="1"`);
const house = (x, y, col = C.navy, s = 1, fill = C.white) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M-13 -2 L0 -14 L13 -2 Z", col)}${R(-11, -2, 22, 16, fill, 1, `stroke="${col}" stroke-width="2"`)}${R(-3, 5, 6, 9, col, 1)}</g>`;
const kioskI = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-14, -52, 28, 52, col, 6)}${R(-10, -47, 20, 18, C.blue, 3)}${R(-7, -42, 14, 3, C.green, 1)}${R(-7, -37, 10, 2.5, C.white, 1)}${R(-5, -20, 10, 8, C.ink, 2)}${R(-18, -2, 36, 5, C.slate, 2)}</g>`;
const keyI = (x, y, col = C.amber, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, 0, 5.5, "none", `stroke="${col}" stroke-width="3"`)}${P("M5.5 0 H17 M13 0 V5 M17 0 V4", col, 3)}</g>`;
const wrenchI = (x, y, col = C.slate, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${P("M-8 8 L3 -3", col, 4.5)}${P("M1 -9 A7 7 0 1 0 9 -1", col, 3.5)}</g>`;
const lockI = (x, y, col = C.slate, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-9, -4, 18, 14, col, 3)}${P("M-5 -4 V-8 A5 5 0 0 1 5 -8 V-4", col, 2.6)}</g>`;
const docI = (x, y, col = C.navy, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-11, -14, 22, 28, C.white, 2, `stroke="${col}" stroke-width="2"`)}${P("M-6 -6 h12 M-6 0 h12 M-6 6 h8", col, 1.6)}</g>`;
const calI = (x, y, col = C.navy, s = 1, txt = "") => `<g transform="translate(${x} ${y}) scale(${s})">${R(-13, -12, 26, 24, C.white, 3, `stroke="${col}" stroke-width="2"`)}${R(-13, -12, 26, 7, col, 2)}${txt ? T(0, 9, txt, 11, col) : ""}</g>`;
const flagI = (x, y, col = C.green, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${P("M0 12 V-14", C.ink, 2.4)}${F("M0 -14 L16 -9 L0 -3 Z", col)}</g>`;
const magI = (x, y, r = 16, col = C.ink) => O(x, y, r, "rgba(255,255,255,.3)", `stroke="${col}" stroke-width="3"`) + P(`M${x + r * 0.7} ${y + r * 0.7} L${x + r * 1.3} ${y + r * 1.3}`, col, 5);
const megaI = (x, y, col = C.orange, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M-10 -4 L6 -12 V12 L-10 4 Z", col)}${R(-16, -5, 7, 10, col, 2)}${P("M10 -6 Q14 0 10 6 M13 -10 Q20 0 13 10", col, 2)}</g>`;
const barrierI = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${P("M-20 12 V-10 M20 12 V-10", C.ink, 3)}${R(-24, -10, 48, 10, C.white, 2, `stroke="${C.red}" stroke-width="2"`)}${rep(4, (i) => F(`M${-20 + i * 12} -10 l6 0 l-5 10 l-6 0 Z`, C.red))}</g>`;
const undoI = (x, y, col = C.plum, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${P("M10 8 A11 11 0 1 0 -8 -6", col, 3.6)}${F("M-15 -12 L-4 -10 L-11 -1 Z", col)}</g>`;
const gearI = (x, y, r, col, hole = C.paper) => {
  let d = ""; const n = 8;
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n * 0.55, a2 = a0 + Math.PI / n, a3 = a2 + Math.PI / n * 0.45;
    const p = (a, rr) => `${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`;
    d += (i ? "L" : "M") + p(a0, r) + "L" + p(a1, r) + "L" + p(a2, r * 0.78) + "L" + p(a3, r * 0.78);
  }
  return F(d + "Z", col) + O(x, y, r * 0.34, hole);
};
const shieldI = (x, y, col = C.green, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M0 -16 L14 -10 V2 C14 10 7 15 0 18 C-7 15 -14 10 -14 2 V-10 Z", col)}${tick(0, 1, 0.7, C.white, 2.6)}</g>`;
const bookI = (x, y, col = C.teal, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M-16 -10 Q-8 -14 0 -9 Q8 -14 16 -10 V12 Q8 8 0 13 Q-8 8 -16 12 Z", col)}${P("M0 -9 V13", C.white, 1.6)}</g>`;
const chartI = (x, y, col = C.navy, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-16, -14, 32, 28, C.white, 3, `stroke="${col}" stroke-width="2"`)}${P("M-11 7 L-4 0 L2 4 L11 -8", col, 2.6)}</g>`;
const crowdI = (x, y, col = C.slate) => person(x - 14, y, 0.75, col) + person(x + 14, y, 0.75, col) + person(x, y + 4, 0.85, col);
const cloudI = (x, y, col = C.slate) => F(`M${x - 22} ${y + 8} Q${x - 30} ${y - 6} ${x - 14} ${y - 8} Q${x - 10} ${y - 22} ${x + 4} ${y - 14} Q${x + 20} ${y - 22} ${x + 22} ${y - 4} Q${x + 32} ${y + 6} ${x + 18} ${y + 10} Z`, C.white, `stroke="${col}" stroke-width="2"`);
const ICONS = {
  person: (x, y) => person(x, y + 6, 1.4, C.navy), kiosk: (x, y) => kioskI(x, y + 26, 0.85), doc: (x, y) => docI(x, y, C.navy, 1.3),
  clock: (x, y) => clockI(x, y, 20, C.orange), flag: (x, y) => flagI(x - 6, y, C.green, 1.4), stop: (x, y) => barrierI(x, y, 1.1),
  undo: (x, y) => undoI(x, y, C.plum, 1.3), key: (x, y) => keyI(x - 10, y, C.amber, 1.5), chart: (x, y) => chartI(x, y, C.navy, 1.2),
  shield: (x, y) => shieldI(x, y, C.green, 1.2), gear: (x, y) => gearI(x, y, 20, C.slate, C.white), hotel: (x, y) => house(x, y + 4, C.navy, 1.6),
  book: (x, y) => bookI(x, y, C.teal, 1.3), cal: (x, y) => calI(x, y, C.navy, 1.4, "1"), cloud: (x, y) => cloudI(x, y, C.slate),
  crowd: (x, y) => crowdI(x, y + 4, C.slate), lock: (x, y) => lockI(x, y + 2, C.slate, 1.5), wrench: (x, y) => wrenchI(x, y, C.slate, 1.5)
};

// ---- marks: ok / x / q / w ----
const MK = {
  ok: (x, y, s) => O(x, y, 11 * s, C.green) + tick(x, y, 0.62 * s, C.white, 2.4),
  x: (x, y, s) => O(x, y, 11 * s, C.red) + cross(x, y, 0.62 * s, C.white, 2.4),
  q: (x, y, s) => O(x, y, 11 * s, C.white, `stroke="${C.orange}" stroke-width="2.2"`) + T(x, y + 5.2 * s, "?", 15 * s, C.orange),
  w: (x, y, s) => F(`M${x} ${y - 11 * s} L${x + 12 * s} ${y + 9 * s} L${x - 12 * s} ${y + 9 * s} Z`, C.gold, `stroke="${C.amber}" stroke-width="1.5"`) + T(x, y + 6 * s, "!", 13 * s, C.ink)
};

// ---- prefixed builders for shot families ----
const pfx = (p) => ({
  p,
  K: (k, b, e) => K(p + k, b, e),
  H: (k, b, e) => H(p + k, b, e),
  D: (k, d, s, w, e) => D(p + k, d, s, w, e),
  TK: (k, x, y, s, sz, f, a, e) => TK(p + k, x, y, s, sz, f, a, e)
});
const pc = (c, p) => {
  const o = { p, snap: c.snap, all: c.all, opEl: c.opEl, mvEl: c.mvEl, flEl: c.flEl, data: c.data };
  ["op", "mv", "dr", "fl", "tx", "cl"].forEach((m) => { o[m] = (k, ...a) => c[m](p + k, ...a); });
  o.vis = (m, t) => { const q = {}; Object.keys(m).forEach((k) => { q[p + k] = m[k]; }); c.vis(q, t); };
  return o;
};
const markSVG = (f, key, x, y, s = 1) => Object.keys(MK).map((m) => f.H(key + m, MK[m](x, y, s))).join("");
const setMark = (c, key, m) => Object.keys(MK).forEach((q) => c.op(key + q, q === m ? 1 : 0, { dl: q === m ? 0.25 : 0 }));

// ---- auto-sized note chips: N(avy) O(range) R(ed) G(reen) P(lum) A(mber) F(illed) ----
const NOTE_COL = { N: [C.navy, C.white, C.navy], O: [C.orange, C.white, C.orange], R: [C.red, C.white, C.red], G: [C.green, C.white, C.green], P: [C.plum, C.white, C.plum], F: [C.navy, C.navy, C.white], A: [C.amber, C.white, C.amber] };
const noteSVG = (f, key, x, y, sz = 14) => f.H(key, R(x - 40, y - 14, 80, 28, C.white, 14, `stroke="${C.navy}" stroke-width="2"`) +
  `<text x="${x}" y="${y + sz * 0.36}" font-size="${sz}" fill="${C.navy}" text-anchor="middle"></text>`, `data-cx="${x}" data-sz="${sz}"`);
function setNote(c, key, n) {
  if (!n) { c.op(key, 0); return; }
  const t = typeof n === "string" ? n : n.t;
  const v = typeof n === "string" ? "N" : (n.c || "N");
  const col = NOTE_COL[v] || NOTE_COL.N;
  c.all(`[data-k="${c.p}${key}"]`).forEach((g) => {
    const r = g.querySelector("rect"), tx = g.querySelector("text");
    const cx = +g.getAttribute("data-cx"), sz = +g.getAttribute("data-sz") || 14;
    const w = Math.round(t.length * sz * 0.6 + sz * 1.7);
    const x0 = clamp(cx - w / 2, 4, 396 - w);
    if (r) { r.setAttribute("x", String(x0)); r.setAttribute("width", String(w)); r.setAttribute("stroke", col[0]); r.setAttribute("fill", col[1]); }
    if (tx) { tx.setAttribute("x", String(x0 + w / 2)); tx.setAttribute("fill", col[2]); if (tx.textContent !== t) tx.textContent = t; }
  });
  c.op(key, 1, { dl: 0.15 });
}

// ---- per-part stylesheet (appended once into the shared <style id="vl-sc-w12">) ----
const AN = "vlsw12c" + PART;
function sceneCSS(id, bg) {
  const s = ".vls-w12-" + id;
  return `
${s}{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:220px;overflow:hidden!important;box-sizing:border-box;border-radius:14px;background:${bg};color:${C.ink};font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w12-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w12-fig>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}
${s} svg text{font-family:inherit;font-weight:800;letter-spacing:.1px}
${s} [data-k]{transform-box:fill-box;transform-origin:50% 50%}
${s}.w12-css [data-k]{transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.85s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}
${s}.w12-snap [data-k],${s}.w12-rm [data-k]{transition:none!important}
${s}.w12-rm *,${s}.w12-snap *{animation:none!important}
${s} .w12-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:38px;padding:6px 12px 8px;font-size:15px;font-weight:800;line-height:1.25;color:${C.navy};background:rgba(255,255,255,.62);border-top:1px solid rgba(31,78,121,.12)}
${s} .w12-num{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w12-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.2px}
${s} .w12-lab.w12-in{animation:${AN}CapIn .5s cubic-bezier(.22,.8,.24,1)}
${s} .w12-bar{flex:0 0 54px;height:4px;border-radius:4px;background:rgba(31,78,121,.15);overflow:hidden}
${s} .w12-bar i{display:block;height:100%;width:0;background:${C.orange};transition:width .6s ease}
${s}.w12-intro .w12-fig>svg{animation:${AN}Intro .7s cubic-bezier(.22,.8,.24,1)}
${s} .a-flow{stroke-dasharray:6 7;animation:${AN}Flow 1.1s linear infinite}
${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:${AN}Spin 6s linear infinite}
${s} .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:${AN}Bob 2.6s ease-in-out infinite}
${s} .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:${AN}Pulse 2s ease-in-out infinite}
${s} .a-blink{animation:${AN}Blink 1.4s ease-in-out infinite}
${s} .a-shake{transform-box:fill-box;transform-origin:50% 50%;animation:${AN}Shake .9s ease-in-out infinite}
@media (max-width:420px){${s} .w12-cap{font-size:14px;min-height:34px;padding:5px 10px 7px}${s} .w12-bar{flex-basis:40px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
}
const KEYFRAMES = `
@keyframes ${AN}CapIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes ${AN}Intro{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
@keyframes ${AN}Flow{to{stroke-dashoffset:-26}}
@keyframes ${AN}Spin{to{transform:rotate(360deg)}}
@keyframes ${AN}Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes ${AN}Pulse{0%,100%{opacity:.35;transform:scale(.94)}50%{opacity:.95;transform:scale(1.06)}}
@keyframes ${AN}Blink{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes ${AN}Shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}
`;
function addStyles(list) {
  if (typeof document === "undefined") return;
  let st = document.getElementById("vl-sc-w12");
  if (!st) { st = document.createElement("style"); st.id = "vl-sc-w12"; (document.head || document.documentElement).appendChild(st); }
  const flag = "w12claude" + PART;
  if (st.getAttribute("data-" + flag)) return;
  st.setAttribute("data-" + flag, "1");
  st.appendChild(document.createTextNode(KEYFRAMES + list.map(([id, bg]) => sceneCSS(id, bg)).join("\n")));
}

// ---- scene factory: build(el), step(i, n), reset() ----
// step(i, n): i = narration line index, n = number of narration lines in the section.
// When n equals the plan length each line gets its own state; any other n maps proportionally.
function makeScene(cfg) {
  const { id, N, labels } = cfg;
  let root = null, useG = false;
  const mapK = (i, n) => {
    const nn = Math.max(1, Math.floor(num(n, N)));
    const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
    return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
  };
  const nodes = (k) => (root ? Array.prototype.slice.call(root.querySelectorAll('[data-k="' + k + '"]')) : []);
  function timing(el, t) {
    el.style.transitionDuration = (t.d == null ? 0.85 : t.d) + "s";
    el.style.transitionDelay = (t.dl || 0) + "s";
  }
  function tf(el, st, t, snap) {
    const x = st.x || 0, y = st.y || 0, r = st.r || 0;
    const sx = st.sx != null ? st.sx : (st.s != null ? st.s : 1);
    const sy = st.sy != null ? st.sy : (st.s != null ? st.s : 1);
    if (useG) {
      const v = { x, y, rotation: r, scaleX: sx, scaleY: sy };
      if (st.pv) v.svgOrigin = st.pv[0] + " " + st.pv[1]; else v.transformOrigin = "50% 50%";
      if (snap) window.gsap.set(el, v);
      else window.gsap.to(el, Object.assign(v, { duration: t.d == null ? 0.85 : t.d, delay: t.dl || 0, ease: t.e || "power3.out", overwrite: "auto" }));
    } else {
      if (st.pv) { el.style.transformBox = "view-box"; el.style.transformOrigin = st.pv[0] + "px " + st.pv[1] + "px"; }
      timing(el, t);
      el.style.transform = "translate(" + x + "px," + y + "px) rotate(" + r + "deg) scale(" + sx + "," + sy + ")";
    }
  }
  function op(el, o, t, snap) {
    if (useG) { if (snap) window.gsap.set(el, { opacity: o }); else window.gsap.to(el, { opacity: o, duration: t.d == null ? 0.6 : t.d, delay: t.dl || 0, ease: "power1.out", overwrite: false }); }
    else { timing(el, t); el.style.opacity = String(o); }
  }
  function dash(el, f, t, snap) {
    const v = 100 * (1 - clamp(f, 0, 1));
    if (useG) { if (snap) window.gsap.set(el, { strokeDashoffset: v }); else window.gsap.to(el, { strokeDashoffset: v, duration: t.d == null ? 1.1 : t.d, delay: t.dl || 0, ease: "power2.inOut" }); }
    else { timing(el, t); el.style.strokeDashoffset = String(v); }
  }
  function fill(el, col, t, snap) {
    if (useG) { if (snap) window.gsap.set(el, { fill: col }); else window.gsap.to(el, { fill: col, duration: t.d == null ? 0.6 : t.d, delay: t.dl || 0 }); }
    else { timing(el, t); el.style.fill = col; }
  }
  function ctx(snap) {
    return {
      snap,
      op: (k, o, t = {}) => nodes(k).forEach((el) => op(el, o, t, snap)),
      mv: (k, st, t = {}) => nodes(k).forEach((el) => tf(el, st, t, snap)),
      dr: (k, f, t = {}) => nodes(k).forEach((el) => dash(el, f, t, snap)),
      fl: (k, col, t = {}) => nodes(k).forEach((el) => fill(el, col, t, snap)),
      tx: (k, s) => nodes(k).forEach((el) => { if (el.textContent !== String(s)) el.textContent = String(s); }),
      cl: (k, cls, on) => nodes(k).forEach((el) => el.classList.toggle(cls, !!on)),
      vis: (map, t = {}) => Object.keys(map).forEach((k) => { const v = map[k]; const o = typeof v === "number" ? clamp(v, 0, 1) : (v ? 1 : 0); nodes(k).forEach((el) => op(el, o, t, snap)); }),
      all: (sel) => (root ? Array.prototype.slice.call(root.querySelectorAll(sel)) : []),
      opEl: (el, o, t = {}) => op(el, o, t, snap),
      mvEl: (el, st, t = {}) => tf(el, st, t, snap),
      flEl: (el, col, t = {}) => fill(el, col, t, snap),
      data: (n, v) => { if (root) root.setAttribute("data-" + n, String(v)); }
    };
  }
  function caption(k, snap) {
    const lab = root.querySelector(".w12-lab"), nn = root.querySelector(".w12-num"), bar = root.querySelector(".w12-bar i");
    const txt = labels[k] || "";
    if (lab && lab.textContent !== txt) {
      lab.textContent = txt;
      if (!snap && !reduced()) { lab.classList.remove("w12-in"); void lab.offsetWidth; lab.classList.add("w12-in"); }
    }
    if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
    if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
  }
  function render(k, snap) {
    if (!root) return;
    if (snap) root.classList.add("w12-snap");
    try { cfg.render(ctx(snap), k); } catch (e) { if (window.console) console.warn("[VL W12 " + id + "]", e); }
    caption(k, snap);
    if (snap) { void root.offsetWidth; root.classList.remove("w12-snap"); }
    root.setAttribute("data-moment", String(k));
  }
  function kill() {
    if (root && useG) { try { window.gsap.killTweensOf(root.querySelectorAll("[data-k]")); } catch (_) {} }
  }
  function mount(el) {
    const r = document.createElement("div");
    r.className = "vls-w12-" + id + " w12-root" + (useG ? " w12-gsap" : " w12-css") + (reduced() ? " w12-rm" : " w12-intro");
    r.setAttribute("data-scene", id);
    r.innerHTML = '<div class="w12-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
      esc(cfg.desc) + '">' + cfg.draw() + '</svg></div><div class="w12-cap" aria-live="polite"><span class="w12-num"></span><span class="w12-lab"></span><span class="w12-bar"><i></i></span></div>';
    if (typeof el.replaceChildren === "function") el.replaceChildren(r);
    else { el.innerHTML = ""; el.appendChild(r); }
    return r;
  }
  return {
    build(el) {
      if (!el || el.nodeType !== 1) return;
      kill();
      useG = hasG();
      root = mount(el);
      render(0, true);
    },
    step(i, n) { if (!root) return; render(mapK(i, n), false); },
    reset() { if (!root) return; kill(); render(0, true); }
  };
}

// ---- shot-based scene: every narration line names one shot family + its state + a caption ----
function shotScene(cfg) {
  const names = Object.keys(cfg.shots);
  const draw = () => R(-400, -300, 1200, 900, cfg.bg) +
    names.map((nm) => `<g data-k="SH_${nm}" style="opacity:0">${cfg.shots[nm].draw()}</g>`).join("");
  const render = (c, k) => {
    const [act, st] = cfg.plan[k];
    names.forEach((nm) => {
      const on = nm === act;
      c.op("SH_" + nm, on ? 1 : 0, { d: on ? 0.55 : 0.35, dl: on ? 0.12 : 0 });
      c.mv("SH_" + nm, on ? {} : { y: 10, s: 0.97 }, { d: 0.6 });
    });
    const shot = cfg.shots[act];
    shot.render(pc(c, shot.p), st || {}, k);
    c.data("benchmark", shot.bench);
    c.data("shot", act);
  };
  return makeScene({ id: cfg.id, N: cfg.plan.length, labels: cfg.plan.map((x) => x[2]), draw, render, desc: cfg.desc });
}


// =====================================================================
// SHOT FAMILY: LOBBY — Qasr reception: kiosk route, assisted desk,
// rejected corporate booking, queue, floor coach, supervisor's authority,
// heritage lobby with no room for a kiosk.
// template: Customer Support — https://lottiefiles.com/free-animation/customer-support-TrBfuCgebx
// template: Waiting Queue — https://lottiefiles.com/free-animation/waiting-queue-xoNutPl764
// =====================================================================
function F_LOBBY(p) {
  const f = pfx(p);
  const GP = { door: [24, 214], kiosk: [76, 214], wait: [160, 214], desk: [228, 214], done: [384, 214] };
  return {
    p, bench: "Customer Support + Waiting Queue (LottieFiles)",
    draw() {
      let s = R(-400, 236, 1200, 400, "#efe6d6") + P("M-400 236 H800", "#d8c7a6", 2);
      s += [70, 200, 330].map((x) => F(`M${x - 40} 236 V100 C${x - 40} 64 ${x + 40} 64 ${x + 40} 100 V236 Z`, "#e6edf4")).join("");
      s += f.H("wl", R(-400, 30, 452, 206, "#d6c6a6") + P("M52 30 V236", "#b9a57e", 3));
      s += f.H("wr", R(352, 30, 460, 206, "#d6c6a6") + P("M352 30 V236", "#b9a57e", 3));
      s += f.K("kio", kioskI(112, 234, 1.3));
      s += f.H("kok", O(112, 150, 12, C.green) + tick(112, 150, 0.65, C.white, 2.6));
      s += f.H("noK", R(82, 160, 60, 76, "rgba(255,255,255,.6)", 6, `stroke="${C.red}" stroke-width="2.6" stroke-dasharray="5 4"`) + cross(112, 198, 1.5, C.red, 4.5) + chip(112, 136, "No room for kiosk", { sz: 13, st: C.red, fg: C.red }));
      s += f.H("rej", O(136, 168, 13, C.red) + cross(136, 168, 0.65, C.white, 2.6) + chip(112, 136, "Rejected", { sz: 13, st: C.red, fg: C.red }));
      s += K(p + "desk", R(246, 196, 124, 9, C.ink, 3) + R(252, 205, 112, 31, C.navy, 4) + R(270, 214, 76, 4, C.blue, 2));
      s += K(p + "rcp", person(300, 188, 1.15, C.green));
      s += f.H("q", O(326, 146, 14, C.white, `stroke="${C.orange}" stroke-width="2.4"`) + T(326, 152, "?", 18, C.orange));
      s += f.H("help", person(342, 190, 1.05, C.plum) + O(356, 160, 9, C.gold) + T(356, 164.5, "!", 13, C.ink));
      s += f.H("sup", person(374, 186, 1.1, C.navy2) + keyI(352, 156, C.amber, 1));
      s += f.H("route", P("M136 200 C176 150 216 150 250 188", C.orange, 3.6, 'class="a-flow"') + chip(194, 140, "Assisted path", { sz: 13, st: C.orange, fg: C.orange }));
      s += f.H("tK", chip(112, 64, "Kiosk: 2 min", { sz: 14, st: C.green, fg: C.green }));
      s += f.H("tA", chip(304, 64, "Assisted: 9 min", { sz: 14, st: C.orange, fg: C.orange }));
      s += f.H("busy", clockI(30, 66, 14, C.red) + T(50, 71, "Busy shift", 13, C.red, "", "start"));
      for (let i = 0; i < 5; i++) s += f.H("qp" + i, person(24 + i * 26, 274, 0.78, C.slate));
      s += f.H("g", `<g class="a-bob">${buddy(0, 0, 13, C.navy2)}</g>` + f.H("corp", R(8, -2, 22, 14, C.orange, 3) + T(19, 8.5, "CORP", 8, C.white)));
      s += noteSVG(f, "nt", 200, 24) + noteSVG(f, "nb", 230, 284) + noteSVG(f, "nr", 304, 104) + noteSVG(f, "nl", 112, 104);
      return s;
    },
    render(c, s) {
      c.vis({ wl: s.small, wr: s.small });
      c.mv("wl", s.small ? {} : { x: -60 }, { d: 1 }); c.mv("wr", s.small ? {} : { x: 60 }, { d: 1 });
      c.op("kio", s.noK ? 0.25 : s.dimK ? 0.4 : 1);
      c.vis({ kok: s.kok, rej: s.rej, noK: s.noK, q: s.q, help: s.help, sup: s.sup, route: s.route, tK: s.tK, tA: s.tA, busy: s.busy });
      c.mv("help", s.help ? {} : { x: 40 }); c.mv("sup", s.sup ? {} : { x: 40 });
      c.mv("q", s.q ? { s: 1 } : { s: 0.5 }, { e: "back.out(2)" });
      c.mv("rej", s.rej ? { s: 1 } : { s: 0.6 }, { e: "back.out(2)" });
      const qn = s.qn || 0;
      for (let i = 0; i < 5; i++) { c.op("qp" + i, i < qn ? 1 : 0, { dl: i * 0.08 }); c.mv("qp" + i, i < qn ? {} : { x: -40 }, { dl: i * 0.08 }); }
      const gp = s.g && GP[s.g];
      c.op("g", gp ? 1 : 0);
      if (gp) c.mv("g", { x: gp[0], y: gp[1] }, { d: 1.2, e: "power2.inOut" });
      c.op("corp", s.corp ? 1 : 0);
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb); setNote(c, "nr", s.nr); setNote(c, "nl", s.nl);
    }
  };
}

// =====================================================================
// SHOT FAMILY: TRAIN — the training room next to the real shift: which
// situations were practised and which were not; roles; the "why".
// template: Checklist — https://lottiefiles.com/free-animation/checklist-c1qt4p98BW
// template: Man with task list — https://lottiefiles.com/free-animation/man-with-task-list-Z2XrIU43bQ
// =====================================================================
function F_TRAIN(p) {
  const f = pfx(p);
  const panel = (x, title, col, key) => R(x, 40, 182, 160, C.white, 10, `stroke="${col}" stroke-width="2.2"`) + R(x, 40, 182, 26, col, 10) + R(x, 56, 182, 10, col) + f.TK(key, x + 91, 58, title, 13.5, C.white);
  return {
    p, bench: "Checklist + Man with task list (LottieFiles)",
    draw() {
      let s = f.K("pL", panel(12, "Training room", C.teal, "tL"));
      s += f.K("pR", panel(206, "Real shift", C.navy, "tR"));
      s += f.H("hL", R(16, 0, 174, 24, "rgba(229,183,108,.35)", 6)) + f.H("hR", R(210, 0, 174, 24, "rgba(229,183,108,.35)", 6));
      for (let i = 0; i < 5; i++) {
        const y = 90 + i * 24;
        s += f.H("l" + i, f.TK("lt" + i, 24, y + 5, "", 13, C.ink, "start") + markSVG(f, "lm" + i, 178, y, 0.8));
        s += f.H("r" + i, f.TK("rt" + i, 218, y + 5, "", 13, C.ink, "start") + markSVG(f, "rm" + i, 372, y, 0.8));
      }
      s += f.H("gap", P("M198 82 L192 104 L204 126 L193 148 L202 172", C.red, 3.4) + O(198, 128, 13, C.red) + cross(198, 128, 0.6, C.white, 2.4));
      s += f.H("roles", person(36, 264, 1.1, C.green) + T(36, 292, "Reception", 12, C.green) + person(220, 264, 1.1, C.navy2) + T(220, 292, "Supervisor", 12, C.navy2));
      s += noteSVG(f, "rl", 128, 250, 13) + noteSVG(f, "rr", 316, 250, 13);
      s += f.H("why", O(372, 228, 15, C.gold) + R(366, 243, 12, 9, C.slate, 2) + rep(5, (i) => { const a = Math.PI * (1.1 + i * 0.2); return P(`M${372 + 20 * Math.cos(a)} ${228 + 20 * Math.sin(a)} L${372 + 26 * Math.cos(a)} ${228 + 26 * Math.sin(a)}`, C.amber, 2.2); }) + T(372, 233, "?", 14, C.ink));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 200, 228);
      return s;
    },
    render(c, s) {
      const mods = s.mods || [], live = s.live || [];
      for (let i = 0; i < 5; i++) {
        c.op("l" + i, i < mods.length ? 1 : 0, { dl: i * 0.08 }); c.tx("lt" + i, mods[i] || "");
        setMark(c, "lm" + i, (s.mk || [])[i] || "");
        c.op("r" + i, i < live.length ? 1 : 0, { dl: i * 0.08 }); c.tx("rt" + i, live[i] || "");
        setMark(c, "rm" + i, (s.lk || [])[i] || "");
      }
      c.op("pR", s.right === 0 ? 0.25 : 1); c.op("pL", s.left === 0 ? 0.25 : 1);
      c.op("hL", s.hlL != null ? 1 : 0); c.mv("hL", { y: 78 + (s.hlL || 0) * 24 }, { d: 0.6 });
      c.op("hR", s.hlR != null ? 1 : 0); c.mv("hR", { y: 78 + (s.hlR || 0) * 24 }, { d: 0.6 });
      c.vis({ gap: s.gap, roles: s.roles, why: s.why });
      c.mv("why", s.why ? { s: 1 } : { s: 0.5 }, { e: "back.out(2)" });
      setNote(c, "rl", s.roles ? s.rl : null); setNote(c, "rr", s.roles ? s.rr : null);
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: WEEKS — the first six weeks after go-live: support
// intensity per week, a coach on the floor versus a distant help queue,
// and temporary extra capacity.
// template: Roadmap / Project schedule — https://lottiefiles.com/free-animation/roadmapproject-schedule-krKjaLHUr0
// template: Tech support and customer service — https://lottiefiles.com/free-animation/tech-support-and-customer-service-9aooyn7i8u
// =====================================================================
function F_WEEKS(p) {
  const f = pfx(p);
  const X = (i) => 40 + i * 58;
  const DEF = [1, 0.92, 0.78, 0.62, 0.46, 0.32];
  return {
    p, bench: "Roadmap / Project schedule + Tech support (LottieFiles)",
    draw() {
      let s = flagI(24, 62, C.green, 1);
      for (let i = 0; i < 6; i++) {
        s += K(p + "c" + i, R(X(i), 44, 52, 30, C.white, 6, `stroke="${C.slate}" stroke-width="1.6"`) + T(X(i) + 26, 64, "Wk " + (i + 1), 13, C.slate));
        s += f.H("cl" + i, R(X(i), 44, 52, 30, C.green, 6) + T(X(i) + 26, 64, "Wk " + (i + 1), 13, C.white));
        s += f.H("b" + i, R(X(i) + 12, 84, 28, 66, C.green, 4, 'opacity=".85"'));
      }
      s += f.H("bl", T(24, 150, "Support", 12, C.green, 'transform="rotate(-90 24 150)"'));
      s += f.H("cur", R(X(0) - 4, 40, 60, 38, "none", 9, `stroke="${C.gold}" stroke-width="3" class="a-pulse"`));
      s += R(-400, 252, 1200, 300, "#efe6d6") + P("M-400 252 H800", "#d8c7a6", 2);
      s += R(66, 214, 124, 9, C.ink, 3) + R(72, 223, 112, 29, C.navy, 4);
      s += person(116, 208, 1.1, C.green);
      s += f.H("guest", buddy(40, 236, 12, C.navy2) + O(40, 208, 9, C.white, `stroke="${C.orange}" stroke-width="2"`) + T(40, 212.5, "?", 12, C.orange));
      s += f.H("near", person(160, 208, 1.05, C.plum) + chip(160, 172, "Coach on floor", { sz: 12, st: C.plum, fg: C.plum }));
      s += f.H("far", P("M188 236 C240 286 300 286 334 244", C.slate, 2, 'stroke-dasharray="4 5"') + R(296, 196, 96, 46, C.white, 6, `stroke="${C.slate}" stroke-width="2"`) + T(344, 215, "Remote helpdesk", 11.5, C.slate) + T(344, 233, "Ticket #42", 12, C.red) + clockI(386, 196, 10, C.red));
      s += f.H("farX", cross(344, 220, 2, C.red, 4));
      s += f.H("cap", person(214, 210, 1, C.green) + person(240, 210, 1, C.green) + chip(227, 174, "+2 staff", { sz: 12, st: C.green, fg: C.green }));
      s += noteSVG(f, "nt", 250, 22) + noteSVG(f, "nb", 200, 284) + noteSVG(f, "nm", 250, 168);
      return s;
    },
    render(c, s) {
      const wk = s.wk == null ? 0 : s.wk, bars = s.bars ? (Array.isArray(s.bars) ? s.bars : DEF) : null;
      for (let i = 0; i < 6; i++) {
        c.op("cl" + i, i < wk ? 1 : 0, { dl: i * 0.1 });
        c.op("b" + i, bars ? 1 : 0, { dl: i * 0.08 });
        c.mv("b" + i, { sy: bars ? Math.max(0.05, bars[i]) : 0.05, pv: [X(i) + 26, 150] }, { d: 0.9, dl: i * 0.08 });
      }
      c.op("bl", bars ? 1 : 0);
      c.op("cur", s.cur != null ? 1 : 0); c.mv("cur", { x: (s.cur || 0) * 58 }, { d: 0.7 });
      c.vis({ guest: s.guest, near: s.near, far: s.far, farX: s.farX, cap: s.cap });
      c.mv("near", s.near ? {} : { x: 30 }); c.mv("cap", s.cap ? {} : { y: 20 });
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: ROUTER — escalation: a reported problem is sorted by
// kind and travels to the person with authority to decide it.
// template: Flowchart — https://lottiefiles.com/free-animation/secret-animation-7trmN1JFrD
// template: Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p
// =====================================================================
function F_ROUTER(p) {
  const f = pfx(p);
  const POS = { start: [54, 150], dia: [150, 150], tech: [236, 78], proc: [236, 222] };
  return {
    p, bench: "Flowchart + Choosing a path (LottieFiles)",
    draw() {
      let s = f.K("dia", F("M150 114 L186 150 L150 186 L114 150 Z", C.navy) + T(150, 147, "Which", 12, C.white) + T(150, 162, "kind?", 12, C.white));
      s += f.D("up", "M186 150 C212 150 214 78 278 78", C.slate, 3);
      s += f.D("dn", "M186 150 C212 150 214 222 278 222", C.green, 3);
      s += f.K("tech", R(282, 50, 112, 56, C.white, 10, `stroke="${C.slate}" stroke-width="2"`) + person(300, 86, 0.95, C.slate) + wrenchI(300, 60, C.slate, 0.7) + T(318, 74, "Technical", 12, C.slate, "", "start") + T(318, 90, "specialist", 12, C.slate, "", "start"));
      s += f.K("own", R(282, 194, 112, 56, C.white, 10, `stroke="${C.green}" stroke-width="2"`) + person(300, 230, 0.95, C.green) + T(318, 218, "Process", 12, C.green, "", "start") + T(318, 234, "owner", 12, C.green, "", "start"));
      s += f.H("auth", R(278, 190, 120, 64, "none", 12, `stroke="${C.gold}" stroke-width="3.5" class="a-pulse"`) + keyI(362, 240, C.amber, 1));
      s += f.H("noAuth", docI(306, 132, C.slate, 0.9) + lockI(318, 140, C.red, 0.8) + chip(300, 168, "Can't change procedure", { sz: 12, st: C.red, fg: C.red }));
      s += f.H("daily", calI(36, 64, C.navy, 1.2, "") + T(58, 69, "Raised daily", 13, C.navy, "", "start"));
      s += f.H("wa", P("M30 252 C60 230 90 270 120 246 C150 226 170 268 200 250", C.slate, 2, 'stroke-dasharray="4 4"') + person(206, 262, 0.9, C.slate) + O(224, 234, 9, C.white, `stroke="${C.orange}" stroke-width="2"`) + T(224, 238.5, "?", 12, C.orange));
      s += f.H("tok", R(-38, -20, 76, 40, C.white, 8, `stroke="${C.orange}" stroke-width="2.2"`) + f.TK("k1", 0, -3, "", 12, C.orange) + f.TK("k2", 0, 13, "", 12, C.orange));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 200, 284);
      return s;
    },
    render(c, s) {
      c.dr("up", s.up ? 1 : 0); c.dr("dn", s.dn ? 1 : 0);
      c.op("tech", s.only === "proc" ? 0.3 : 1); c.op("own", s.only === "tech" ? 0.3 : 1);
      c.vis({ auth: s.auth, noAuth: s.noAuth, daily: s.daily, wa: s.wa });
      const tp = s.tok && POS[s.tok];
      c.op("tok", tp ? 1 : 0);
      if (tp) c.mv("tok", { x: tp[0], y: tp[1] }, { d: 1.1, e: "power2.inOut" });
      const k = s.k || ["Reported", "problem"];
      c.tx("k1", k[0] || ""); c.tx("k2", k[1] || "");
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: BOARD — the daily problem board: raised, being fixed,
// fixed and told back to staff; recurring cards; staff trust meter.
// template: Workflow Dashboard – Interactive Motion Design — https://dribbble.com/shots/27538364-Workflow-Dashboard-Interactive-Motion-Design
// template: Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD
// =====================================================================
function F_BOARD(p) {
  const f = pfx(p);
  const CX = [72, 200, 328], HD = ["Raised", "Fixing", "Fixed + told"], HC = [C.orange, C.amber, C.green];
  return {
    p, bench: "Workflow Dashboard (Dribbble) + Problem Solving Team (LottieFiles)",
    draw() {
      let s = "";
      for (let j = 0; j < 3; j++) s += R(CX[j] - 62, 40, 124, 180, "rgba(255,255,255,.75)", 10, `stroke="${HC[j]}" stroke-width="2"`) + R(CX[j] - 62, 40, 124, 26, HC[j], 10) + R(CX[j] - 62, 56, 124, 10, HC[j]) + T(CX[j], 58, HD[j], 13.5, C.white);
      for (let i = 0; i < 6; i++) s += f.H("c" + i, R(-56, -14, 112, 28, C.white, 6, `stroke="${C.slate}" stroke-width="1.6"`) + R(-56, -14, 6, 28, C.orange, 3) + f.TK("ct" + i, 3, 4.5, "", 12, C.ink));
      s += f.H("bx", O(0, 0, 11, C.red) + T(0, 4, "×3", 10, C.white));
      s += f.H("win", star(0, 0, 1));
      for (let i = 0; i < 3; i++) {
        s += person(30 + i * 30, 270, 0.85, C.green);
        s += f.H("sb" + i, R(18 + i * 30, 234, 26, 18, C.white, 6, `stroke="${C.green}" stroke-width="1.6"`) + tick(31 + i * 30, 243, 0.5, C.green, 2));
      }
      s += f.H("sx", rep(3, (i) => R(18 + i * 30, 234, 26, 18, C.white, 6, `stroke="${C.slate}" stroke-width="1.6"`) + cross(31 + i * 30, 243, 0.5, C.red, 2.2)));
      s += f.H("meg", megaI(136, 262, C.orange, 1.1));
      s += f.H("cred", T(282, 252, "Staff trust", 12.5, C.navy) + R(190, 260, 190, 14, "#e4e9ef", 7) + `<rect data-k="${p}cf" x="190" y="260" width="190" height="14" rx="7" fill="${C.green}"/>`);
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nm", 200, 236);
      return s;
    },
    render(c, s) {
      const cards = s.cards || [], cnt = [0, 0, 0], pos = [];
      for (let i = 0; i < 6; i++) {
        const cd = cards[i];
        if (!cd) { c.op("c" + i, 0); pos.push(null); continue; }
        const col = cd[1], row = cnt[col]++;
        const x = CX[col], y = 88 + row * 34;
        pos.push([x, y]);
        c.tx("ct" + i, cd[0]);
        c.op("c" + i, s.hl != null && s.hl !== i ? 0.45 : 1, { dl: i * 0.06 });
        c.mv("c" + i, { x, y, s: s.hl === i ? 1.08 : 1 }, { d: 1, e: "power2.inOut" });
      }
      const rp = s.recur != null && pos[s.recur];
      c.op("bx", rp ? 1 : 0); if (rp) c.mv("bx", { x: rp[0] + 52, y: rp[1] - 13 });
      const wp = s.win != null && pos[s.win];
      c.op("win", wp ? 1 : 0); if (wp) c.mv("win", { x: wp[0] - 50, y: wp[1] - 13, s: 1.1 }, { e: "back.out(2)" });
      for (let i = 0; i < 3; i++) c.op("sb" + i, s.told && !s.quiet ? 1 : 0, { dl: i * 0.12 });
      c.vis({ sx: s.quiet, meg: s.told, cred: s.cred != null });
      c.mv("cf", { sx: Math.max(0.02, s.cred || 0), pv: [190, 267] }, { d: 1 });
      c.fl("cf", (s.cred || 0) < 0.4 ? C.red : (s.cred || 0) < 0.7 ? C.amber : C.green);
      setNote(c, "nt", s.nt); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: CHART — a line chart that draws itself: kiosk adoption
// rising and flattening at 65 %, or exception volume against the
// designed range.
// template: Animated line chart lesson — https://observablehq.com/@d3/learn-d3-animation
// template: Growth Chart — https://lottiefiles.com/free-animation/growth-chart-MBrxgE3xfn
// =====================================================================
function F_CHART(p) {
  const f = pfx(p);
  const X = (w) => 56 + w * 28, Y = (v) => 232 - v * 1.7;
  const line = (a) => a.map((v, w) => (w ? "L" : "M") + X(w) + " " + Y(v).toFixed(1)).join(" ");
  const AD = [0, 12, 28, 40, 50, 57, 61, 64, 65, 65, 65, 65];
  const EIN = [22, 26, 24, 27, 25, 28, 26, 27, 25, 26, 27, 26];
  const EOV = [22, 27, 31, 36, 42, 47, 52, 57, 61, 64, 66, 68];
  return {
    p, bench: "Animated line chart (Observable) + Growth Chart (LottieFiles)",
    draw() {
      let s = P(`M56 58 V232 H${X(11) + 16}`, C.slate, 2);
      s += rep(12, (w) => T(X(w), 248, String(w), 11, C.slate));
      s += f.TK("xl", 214, 266, "Weeks since the pilot began", 12, C.slate);
      s += f.TK("yl", 58, 50, "Kiosk adoption %", 13, C.navy, "start");
      s += f.H("ytk", rep(3, (i) => T(48, Y(i * 50) + 4, String(i * 50), 11, C.slate, "", "end")));
      s += f.H("band", R(56, Y(32), X(11) - 46, Y(20) - Y(32), "rgba(49,124,97,.18)") + T(X(11) + 6, Y(32) - 6, "Designed range", 12, C.green, "", "end"));
      s += f.H("t100", P(`M56 ${Y(100)} H${X(11) + 10}`, C.green, 2, 'stroke-dasharray="6 5"') + T(X(11) + 10, Y(100) - 7, "100% = every arrival", 12, C.green, "", "end"));
      s += f.H("gap", R(X(7), Y(100), X(11) - X(7), Y(65) - Y(100), "rgba(192,80,42,.15)") + T((X(7) + X(11)) / 2, (Y(100) + Y(65)) / 2 + 5, "35% not on kiosk", 13, C.orange));
      s += f.D("ad", line(AD), C.navy, 4.5);
      s += f.D("ein", line(EIN), C.green, 4);
      s += f.D("eov", line(EOV), C.red, 4);
      s += f.H("ovr", F(EOV.slice(3).map((v, w) => (w ? "L" : "M") + X(w + 3) + " " + Y(v).toFixed(1)).join(" ") + ` L${X(11)} ${Y(32)} L${X(3)} ${Y(32)} Z`, "rgba(176,54,43,.14)") + T(X(7), Y(52), "Above design", 12, C.red));
      s += f.H("plat", R(X(8) - 8, Y(65) - 9, X(11) - X(8) + 16, 18, "none", 9, `stroke="${C.gold}" stroke-width="3"`) + chip(X(9.5), Y(65) + 30, "Plateau: 65%", { sz: 13, st: C.amber, fg: C.amber }));
      s += f.H("big", T(X(9.5), 206, "65%", 34, C.navy));
      s += f.H("ill", T(X(2.6), 224, "rise shape illustrative", 10.5, C.slate, "", "start"));
      s += f.H("wk", rep(11, (w) => O(X(w + 1), 232, 4.5, C.teal)) + chip(118, 82, "Reviewed weekly", { sz: 12.5, st: C.teal, fg: C.teal }));
      s += f.H("dot", O(0, 0, 7, C.orange, `stroke="${C.white}" stroke-width="2"`));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 214, 287) + noteSVG(f, "nm", 250, 186);
      return s;
    },
    render(c, s) {
      const exc = s.mode === "exc";
      c.tx("yl", exc ? "Exception volume" : "Kiosk adoption %");
      c.tx("xl", exc ? "Weeks after go-live" : "Weeks since the pilot began");
      c.op("ytk", exc ? 0 : 1);
      c.dr("ad", !exc ? (s.dr == null ? 1 : s.dr) : 0, { d: 1.4 }); c.op("ad", exc ? 0 : 1);
      c.dr("ein", exc && s.ein ? 1 : 0, { d: 1.4 }); c.dr("eov", exc && s.eov ? 1 : 0, { d: 1.4 });
      c.vis({ band: exc && s.band, t100: !exc && s.t100, gap: !exc && s.gap, plat: !exc && s.plat, big: !exc && s.big, ill: !exc && (s.dr == null || s.dr > 0.2), wk: s.wk, ovr: exc && s.ovr });
      if (s.dot != null) { const v = exc ? EOV : AD; c.op("dot", 1); c.mv("dot", { x: X(s.dot), y: Y(v[s.dot]) }, { d: 0.9 }); } else c.op("dot", 0);
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: WAFFLE — 100 pilot arrivals sort into kiosk (65) and
// reception desk (35); the desk group is examined.
// template: Sankey animation - acyclic graph — https://observablehq.com/@joaormendes/sankey-animation-acyclic-graph
// template: Stacked-to-grouped bars — https://observablehq.com/@d3/stacked-to-grouped-bars
// =====================================================================
function F_WAFFLE(p) {
  const f = pfx(p);
  const g = (i) => [18 + (i % 10) * 17, 52 + Math.floor(i / 10) * 17];
  const tgt = (i) => i < 65 ? [210 + (i % 15) * 12, 66 + Math.floor(i / 15) * 12] : [210 + ((i - 65) % 15) * 12, 186 + Math.floor((i - 65) / 15) * 12];
  return {
    p, bench: "Sankey animation (Observable) + Stacked-to-grouped bars (Observable)",
    draw() {
      let s = f.K("hd", T(100, 40, "100 pilot arrivals", 13.5, C.navy));
      s += f.H("bG", R(200, 40, 192, 104, "#eef7f1", 10, `stroke="${C.green}" stroke-width="2"`) + T(210, 58, "Kiosk", 14, C.green, "", "start") + T(384, 58, "65", 17, C.green, "", "end"));
      s += f.H("bO", R(200, 160, 192, 92, "#fbefe8", 10, `stroke="${C.orange}" stroke-width="2"`) + T(210, 178, "Reception desk", 14, C.orange, "", "start") + T(384, 178, "35", 17, C.orange, "", "end"));
      s += rep(100, (i) => { const [x, y] = g(i); return `<rect class="${p}t" data-i="${i}" data-k="${p}t" x="${x}" y="${y}" width="14" height="14" rx="3" fill="${C.grey}"/>`; });
      s += f.H("corp", chip(296, 238, "Mostly corporate bookings", { sz: 12, bg: C.orange, st: C.orange, fg: C.white }));
      s += f.H("why", magI(300, 204, 26, C.ink));
      s += f.H("q", chip(100, 262, "Approved exception?", { sz: 12.5, st: C.green, fg: C.green }) + chip(300, 268, "Informal workaround?", { sz: 12.5, st: C.red, fg: C.red, dash: 1 }));
      s += noteSVG(f, "nb", 200, 287) + noteSVG(f, "nl", 100, 238);
      return s;
    },
    render(c, s) {
      const tiles = c.all("." + p + "t");
      const col = !!s.col || !!s.sort;
      tiles.forEach((el) => {
        const i = +el.getAttribute("data-i"), orange = i >= 65;
        let fill = C.grey;
        if (col) fill = orange ? C.orange : C.green;
        let o = 1;
        if (s.dimG && !orange) o = 0.22;
        if (s.dimO && orange) o = 0.22;
        c.flEl(el, fill, { dl: s.col && !s.sort ? (i % 35) * 0.012 : 0 });
        c.opEl(el, o);
        if (s.sort) { const [a, b] = g(i), [x, y] = tgt(i); c.mvEl(el, { x: x + 5 - (a + 7), y: y + 5 - (b + 7), s: 0.72 }, { d: 1.1, dl: (orange ? (i - 65) : i) * 0.01, e: "power2.inOut" }); }
        else c.mvEl(el, {}, { d: 0.8 });
      });
      c.vis({ bG: s.sort, bO: s.sort, corp: s.corp, why: s.why, q: s.q });
      c.op("hd", s.sort ? 0.4 : 1);
      setNote(c, "nb", s.nb); setNote(c, "nl", s.nl);
    }
  };
}

// =====================================================================
// SHOT FAMILY: COMPARE — two cards side by side (a distinction the
// narration draws), each with an icon, two short lines and a verdict.
// template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
// template: Interactive AI Customer Support vs Old Way — https://lottiefiles.com/free-animation/interactive-ai-optimised-customer-support-vs-old-way-yKSecPTuwL
// =====================================================================
function F_COMPARE(p) {
  const f = pfx(p);
  const side = (k, x0, col) => {
    const cx = x0 + 89;
    let s = f.K(k + "card", R(x0, 46, 178, 192, C.white, 12, `stroke="${col}" stroke-width="2.2"`) + R(x0, 46, 178, 32, col, 12) + R(x0, 66, 178, 12, col) + f.TK(k + "t", cx, 68, "", 13.5, C.white));
    s += f.H(k + "hl", R(x0 - 4, 42, 186, 200, "none", 15, `stroke="${C.gold}" stroke-width="3.5"`));
    Object.keys(ICONS).forEach((nm) => { s += f.H(k + "i_" + nm, ICONS[nm](cx, 122)); });
    s += f.TK(k + "a", cx, 182, "", 13, C.ink) + f.TK(k + "b", cx, 200, "", 13, C.ink);
    s += markSVG(f, k + "m", cx, 222, 0.9);
    return s;
  };
  return {
    p, bench: "Comparison Chart (LottieFiles) + Customer Support vs Old Way (LottieFiles)",
    draw() {
      let s = side("L", 12, C.navy) + side("R", 210, C.orange);
      s += f.H("mid", O(200, 142, 17, C.white, `stroke="${C.ink}" stroke-width="2.4"`) + f.TK("mt", 200, 148.5, "≠", 17, C.ink));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 200, 270);
      return s;
    },
    render(c, s) {
      [["L", s.lt, s.li, s.l, s.lm], ["R", s.rt, s.ri, s.r, s.rm]].forEach(([k, t, ic, ln, m]) => {
        c.tx(k + "t", t || ""); c.tx(k + "a", (ln || [])[0] || ""); c.tx(k + "b", (ln || [])[1] || "");
        Object.keys(ICONS).forEach((nm) => c.op(k + "i_" + nm, nm === ic ? 1 : 0));
        setMark(c, k + "m", m || "");
        const on = !s.hl || s.hl === k.toLowerCase();
        c.op(k + "card", on ? 1 : 0.4);
        c.op(k + "hl", s.hl === k.toLowerCase() ? 1 : 0);
        c.mv(k + "card", s.hl === k.toLowerCase() ? { s: 1.03 } : {});
      });
      c.op("mid", s.mid === "" ? 0 : 1); c.tx("mt", s.mid || "≠");
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: BARS — horizontal bars to true scale with values and
// "?" where the case gives no number.
// template: Bar chart transitions — https://observablehq.com/@d3/bar-chart-transitions/2
// template: Infographic Chart Creator — https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/
// =====================================================================
function F_BARS(p) {
  const f = pfx(p);
  const BC = { g: C.green, o: C.orange, n: C.navy, p: C.plum, s: C.slate, r: C.red, t: C.teal };
  return {
    p, bench: "Bar chart transitions (Observable) + Infographic Chart Creator (Motion Array)",
    draw() {
      let s = f.TK("ti", 200, 36, "", 14, C.navy);
      for (let i = 0; i < 5; i++) {
        const y = 74 + i * 42;
        s += f.H("r" + i, f.TK("l" + i, 20, y - 6, "", 13, C.ink, "start") + R(20, y, 300, 20, "#e8edf2", 5) +
          `<rect data-k="${p}b${i}" x="20" y="${y}" width="300" height="20" rx="5" fill="${C.navy}"/>` + f.TK("v" + i, 330, y + 15.5, "", 15, C.ink, "start") + markSVG(f, "m" + i, 384, y + 10, 0.85));
      }
      s += noteSVG(f, "nb", 200, 286) + noteSVG(f, "nm", 200, 252);
      return s;
    },
    render(c, s) {
      c.tx("ti", s.ti || "");
      const rows = s.rows || [], mx = s.max || Math.max(1, ...rows.map((r) => r[1] || 0));
      for (let i = 0; i < 5; i++) {
        const r = rows[i];
        c.op("r" + i, r ? 1 : 0, { dl: i * 0.08 });
        if (!r) continue;
        c.tx("l" + i, r[0]); c.tx("v" + i, r[3] != null ? r[3] : String(r[1]));
        c.fl("b" + i, BC[r[2]] || C.navy);
        c.mv("b" + i, { sx: Math.max(0.01, (r[1] || 0) / mx), pv: [20, 84 + i * 42] }, { d: 1.1, dl: i * 0.1 });
        setMark(c, "m" + i, r[4] || "");
      }
      setNote(c, "nb", s.nb); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: GAUGE — a dial with a needle: guest satisfaction out of
// ten, or occupancy with the 90 % danger band.
// template: Customer satisfaction — https://lottiefiles.com/free-animation/customer-satisfaction-zfm0C8rzLz
// template: Arc tween — https://observablehq.com/@d3/arc-tween
// =====================================================================
function F_GAUGE(p) {
  const f = pfx(p);
  const pt = (fr, r) => [200 - r * Math.cos(Math.PI * fr), 196 - r * Math.sin(Math.PI * fr)];
  const arc = (a, b, r) => { const [x0, y0] = pt(a, r), [x1, y1] = pt(b, r); return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`; };
  return {
    p, bench: "Customer satisfaction (LottieFiles) + Arc tween (Observable)",
    draw() {
      let s = P(arc(0, 1, 112), "#e3e8ee", 22);
      s += f.H("sat", P(arc(0, 0.6, 112), "#f3d9cc", 22) + P(arc(0.6, 0.8, 112), "#f4e7c9", 22) + P(arc(0.8, 1, 112), "#d5ebdf", 22) +
        rep(6, (i) => { const [x, y] = pt(i / 5, 140); return T(x, y + 5, String(i * 2), 13, C.slate); }));
      s += f.H("occ", P(arc(0.9, 1, 112), "#f0c4bc", 22) + rep(3, (i) => { const [x, y] = pt(i / 2, 140); return T(x, y + 5, ["0%", "50%", "100%"][i], 13, C.slate); }) +
        (() => { const [x, y] = pt(0.9, 140); return T(x - 4, y - 2, "90%", 13, C.red); })());
      s += f.H("g0", P("M200 196 V96", C.slate, 3, 'stroke-dasharray="5 4"'));
      s += f.K("nd", P("M200 196 V92", C.ink, 5) + F("M194 104 L200 86 L206 104 Z", C.ink));
      s += O(200, 196, 11, C.ink);
      s += f.TK("big", 200, 248, "", 36, C.navy);
      s += noteSVG(f, "nL", 82, 236, 13) + noteSVG(f, "nR", 318, 236, 13) + noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 200, 284);
      return s;
    },
    render(c, s) {
      const occ = s.mode === "occ";
      c.op("sat", occ ? 0 : 1); c.op("occ", occ ? 1 : 0);
      const fr = (v) => clamp(occ ? v / 100 : v / 10, 0, 1);
      c.mv("nd", { r: -90 + 180 * fr(s.v || 0), pv: [200, 196] }, { d: 1.4, e: "power2.inOut" });
      c.op("g0", s.v0 != null ? 1 : 0); c.mv("g0", { r: -90 + 180 * fr(s.v0 || 0), pv: [200, 196] }, { d: 0.01 });
      c.tx("big", s.big || "");
      c.fl("big", s.bigc === "r" ? C.red : s.bigc === "g" ? C.green : C.navy);
      setNote(c, "nL", s.nL); setNote(c, "nR", s.nR); setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}


// =====================================================================
// SHOT FAMILY: MAP — Qasr's fourteen properties in their four groups
// (2 pilots, 5 standard, 3 heritage, 4 peak occupancy) with marks,
// wave labels, support levels and copied limitations.
// template: Animated treemap — https://observablehq.com/@d3/animated-treemap
// template: World map with logistics — https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy
// =====================================================================
function F_MAP(p) {
  const f = pfx(p);
  const HX = [40, 80, 146, 198, 250, 302, 354, 52, 104, 156, 236, 282, 328, 372];
  const HY = (i) => (i < 7 ? 88 : 184);
  const GRP = (i) => (i < 2 ? "pil" : i < 7 ? "std" : i < 10 ? "her" : "peak");
  const GC = { pil: C.green, std: C.navy, her: C.plum, peak: C.orange };
  const ZB = { pil: [12, 40, 96, 84, "PILOTS"], std: [116, 40, 276, 84, "STANDARD ×5"], her: [12, 136, 184, 84, "HERITAGE ×3"], peak: [204, 136, 188, 84, "PEAK >90% ×4"] };
  return {
    p, bench: "Animated treemap (Observable) + World map with logistics (LottieFiles)",
    draw() {
      let s = "";
      Object.keys(ZB).forEach((g) => { const [x, y, w, h, l] = ZB[g]; s += f.H("z_" + g, R(x, y, w, h, "rgba(255,255,255,.7)", 10, `stroke="${GC[g]}" stroke-width="2"`) + T(x + 8, y + 16, l, 12, GC[g], "", "start")); });
      s += f.H("trv", P("M60 40 Q150 4 250 38", C.green, 2.4, 'stroke-dasharray="5 5"') + P("M44 124 Q46 134 70 140", C.green, 2.4, 'stroke-dasharray="5 5"') + P("M96 124 Q200 128 290 138", C.green, 2.4, 'stroke-dasharray="5 5"') +
        [[156, 20], [52, 134], [200, 129]].map(([x, y]) => O(x, y, 9, C.white, `stroke="${C.orange}" stroke-width="2"`) + T(x, y + 4.5, "?", 12, C.orange)).join(""));
      for (let i = 0; i < 14; i++) {
        const x = HX[i], y = HY(i), col = GC[GRP(i)];
        s += f.K("h" + i, house(x, y, col, 1.2));
        s += f.H("s" + i, R(x - 13, y + 22, 26, 6, "#e4e9ef", 3) + `<rect data-k="${p}sb${i}" x="${x - 13}" y="${y + 22}" width="26" height="6" rx="3" fill="${C.green}"/>`);
        s += f.TK("w" + i, x, y + 34, "", 11.5, C.ink);
        s += markSVG(f, "m" + i, x + 14, y - 16, 0.62);
        s += f.H("cp" + i, O(x - 14, y - 16, 7, C.red) + T(x - 14, y - 12, "!", 10, C.white));
      }
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nm", 200, 250) + noteSVG(f, "nb", 200, 284);
      return s;
    },
    render(c, s) {
      const lit = s.lit || null;
      Object.keys(ZB).forEach((g) => c.op("z_" + g, s.grp ? (lit && lit.indexOf(g) < 0 ? 0.3 : 1) : 0, { dl: s.grp ? 0.1 : 0 }));
      c.op("trv", s.trv ? 1 : 0);
      for (let i = 0; i < 14; i++) {
        const g = GRP(i), on = !lit || lit.indexOf(g) >= 0;
        c.op("h" + i, on ? 1 : 0.25, { dl: i * 0.03 });
        c.mv("h" + i, on && s.pop ? { s: 1.12 } : {}, { e: "back.out(2)" });
        setMark(c, "m" + i, (s.mkH && s.mkH[i]) || (s.mk && s.mk[g]) || "");
        c.tx("w" + i, (s.wave && s.wave[g]) || "");
        const sv = s.sup ? s.sup[i] : null;
        c.op("s" + i, sv != null ? 1 : 0);
        c.mv("sb" + i, { sx: Math.max(0.03, sv || 0), pv: [HX[i] - 13, HY(i) + 25] }, { d: 1, dl: i * 0.05 });
        c.fl("sb" + i, (sv || 0) < 0.4 ? C.red : (sv || 0) < 0.7 ? C.amber : C.green);
        c.op("cp" + i, s.copy && i >= 2 ? 1 : 0, { dl: (i - 2) * 0.07 });
      }
      setNote(c, "nt", s.nt); setNote(c, "nm", s.nm); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: ARCH — the process architecture: one arrival process,
// its standard kiosk route and the registered assisted variant for
// heritage lobbies; an unregistered local workaround stays outside.
// template: Hierarchy traversal animated — https://old.observablehq.com/@d3/hierarchy-traversal-animated
// template: The Process Architectural Motion — https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion
// =====================================================================
function F_ARCH(p) {
  const f = pfx(p);
  return {
    p, bench: "Hierarchy traversal (Observable) + The Process Architectural Motion (Behance)",
    draw() {
      let s = K(p + "root", R(120, 32, 160, 40, C.navy, 10) + T(200, 57, "Arrival process", 14, C.white));
      s += f.H("lock", lockI(296, 54, C.navy, 1) + T(312, 58, "Preserved", 12, C.navy, "", "start"));
      s += f.D("e1", "M170 72 C170 100 110 96 110 122", C.green, 3) + f.D("e2", "M230 72 C230 100 290 96 290 122", C.plum, 3);
      s += f.H("std", R(30, 122, 160, 42, C.white, 10, `stroke="${C.green}" stroke-width="2.2"`) + T(110, 140, "Standard route", 13, C.green) + T(110, 157, "kiosk + assisted", 11.5, C.slate));
      s += f.H("var", R(210, 122, 160, 42, C.white, 10, `stroke="${C.plum}" stroke-width="2.2"`) + T(290, 140, "Approved variant", 13, C.plum) + T(290, 157, "assisted, no kiosk", 11.5, C.slate));
      s += f.H("reg", chip(342, 118, "Registered", { sz: 11.5, bg: C.plum, st: C.plum, fg: C.white }));
      s += f.H("ps", rep(5, (i) => house(50 + i * 30, 196, C.navy, 0.85)) + T(110, 228, "Pilots, standard, peak", 11.5, C.slate));
      s += f.H("pv", rep(3, (i) => house(250 + i * 40, 196, C.plum, 0.85)) + T(290, 228, "3 heritage properties", 11.5, C.plum));
      s += f.H("prep", chip(290, 190, "Procedures", { sz: 12, st: C.plum, fg: C.plum }) + chip(290, 214, "Responsibilities", { sz: 12, st: C.plum, fg: C.plum }) + chip(290, 238, "Training", { sz: 12, st: C.plum, fg: C.plum }));
      s += markSVG(f, "pm0", 362, 190, 0.6) + markSVG(f, "pm1", 362, 214, 0.6) + markSVG(f, "pm2", 362, 238, 0.6);
      s += f.H("wa", R(222, 246, 170, 34, "rgba(255,255,255,.85)", 8, `stroke="${C.red}" stroke-width="2.2" stroke-dasharray="5 4"`) + T(307, 268, "Local workaround", 13, C.red));
      s += f.H("waX", cross(380, 252, 1.1, C.red, 3.4));
      s += f.H("rd", rep(3, (i) => P(`M${44 + i * 46} 250 q8 -12 16 0 t16 0`, C.red, 2.6) + cross(60 + i * 46, 250, 0.7, C.red, 2.6)) + T(110, 278, "Each site its own way?", 12, C.red));
      s += noteSVG(f, "nb", 200, 286) + noteSVG(f, "nt", 200, 16);
      return s;
    },
    render(c, s) {
      c.dr("e1", s.tr ? 1 : 0); c.dr("e2", s.tr && s.vr ? 1 : 0, { dl: 0.2 });
      c.vis({ std: s.tr, var: s.vr, reg: s.reg, ps: s.ps && !s.rd, pv: s.pv && !s.prep, prep: s.prep, wa: s.wa, waX: s.waX, rd: s.rd, lock: s.lock });
      c.mv("reg", s.reg ? { s: 1 } : { s: 1.6 }, { e: "back.out(2)" });
      for (let i = 0; i < 3; i++) setMark(c, "pm" + i, s.prep ? ((s.pmk || [])[i] || "") : "");
      c.op("std", s.tr ? (s.hl === "var" ? 0.4 : 1) : 0); c.op("var", s.vr ? (s.hl === "std" ? 0.4 : 1) : 0);
      setNote(c, "nb", s.nb); setNote(c, "nt", s.nt);
    }
  };
}

// =====================================================================
// SHOT FAMILY: GANTT — October to January: eight rollout weeks, the
// three-week buffer, the 1 January deadline, readiness gates, a failed
// week 8 and its recovery eating the buffer.
// template: Project TimeLine — https://motionarray.com/after-effects-templates/project-timeline-2424919/
// template: Roadmap / Project schedule — https://lottiefiles.com/free-animation/roadmapproject-schedule-krKjaLHUr0
// =====================================================================
function F_GANTT(p) {
  const f = pfx(p);
  const X = (i) => 24 + i * 28;
  const WC = { n: C.navy, g: C.green, p: C.plum, o: C.orange, s: C.slate, r: C.red };
  return {
    p, bench: "Project TimeLine (Motion Array) + Roadmap / Project schedule (LottieFiles)",
    draw() {
      let s = R(24, 44, 84, 20, "#e6edf4", 3) + T(66, 58, "Oct", 12, C.slate) + R(108, 44, 112, 20, "#f2eee5", 3) + T(164, 58, "Nov", 12, C.slate) +
        R(220, 44, 112, 20, "#e6edf4", 3) + T(276, 58, "Dec", 12, C.slate) + R(332, 44, 60, 20, "#f6e2de", 3) + T(362, 58, "Jan", 12, C.red);
      s += f.H("pk", R(334, 66, 58, 140, "rgba(176,54,43,.10)") + T(363, 152, "Peak", 12, C.red) + T(363, 168, ">90%", 12, C.red));
      for (let i = 0; i < 8; i++) {
        s += K(p + "w" + i, R(X(i), 80, 26, 30, C.white, 4, `stroke="${C.slate}" stroke-width="1.4"`));
        s += f.H("wf" + i, `<rect data-k="${p}wr${i}" x="${X(i)}" y="80" width="26" height="30" rx="4" fill="${C.navy}"/>` + T(X(i) + 13, 100, String(i + 1), 13, C.white));
      }
      s += f.H("buf", rep(3, (k) => R(X(8 + k), 80, 26, 30, "#eef0f3", 4, `stroke="${C.slate}" stroke-width="1.2" stroke-dasharray="3 3"`) + P(`M${X(8 + k) + 4} 106 l18 -22 M${X(8 + k) + 4} 94 l9 -11`, C.muted, 1.4)) + chip(X(9) + 13, 128, "3-week buffer", { sz: 12, st: C.slate, fg: C.slate }));
      s += f.H("gt", rep(3, (k) => { const x = X([0, 3, 6][k]) + 2; return F(`M${x} 64 L${x + 7} 71 L${x} 78 L${x - 7} 71 Z`, C.gold, `stroke="${C.amber}" stroke-width="1.4"`); }));
      s += f.H("wv", R(X(0), 146, 82, 28, C.green, 6) + T(X(0) + 41, 165, "Standard ×5", 11.5, C.white) +
        R(X(3), 146, 82, 28, "rgba(107,78,138,.14)", 6, `stroke="${C.plum}" stroke-width="1.8" stroke-dasharray="4 3"`) + T(X(3) + 41, 165, "Heritage ×3", 11.5, C.plum) +
        R(X(6), 146, 54, 28, "rgba(192,80,42,.12)", 6, `stroke="${C.orange}" stroke-width="1.8" stroke-dasharray="4 3"`) + T(X(6) + 27, 165, "Peak ×4", 11.5, C.orange));
      s += f.H("wvq", O(X(6) + 52, 146, 9, C.white, `stroke="${C.orange}" stroke-width="2"`) + T(X(6) + 52, 150.5, "?", 12, C.orange) + O(X(3) + 80, 146, 9, C.white, `stroke="${C.plum}" stroke-width="2"`) + T(X(3) + 80, 150.5, "?", 12, C.plum));
      s += f.H("fx", R(X(7), 80, 26, 30, C.red, 4) + cross(X(7) + 13, 95, 0.9, C.white, 3));
      s += f.H("rcg", `<rect data-k="${p}rc" x="${X(8)}" y="84" width="1" height="22" rx="3" fill="${C.orange}" opacity=".9"/>` + T(X(8) + 4, 100, "recovery", 11, C.white, "", "start"));
      s += f.H("ovf", chip(352, 190, "Past 1 Jan", { sz: 12, bg: C.red, st: C.red, fg: C.white }));
      s += f.H("dl", P("M332 40 V206", C.red, 3) + chip(326, 222, "1 Jan deadline", { sz: 12.5, bg: C.red, st: C.red, fg: C.white }));
      s += noteSVG(f, "nt", 180, 22) + noteSVG(f, "nq", 180, 200) + noteSVG(f, "nm", 180, 252) + noteSVG(f, "nb", 200, 284);
      return s;
    },
    render(c, s) {
      const wk = s.wk == null ? 8 : s.wk;
      for (let i = 0; i < 8; i++) {
        c.op("wf" + i, i < wk ? 1 : 0, { dl: i * 0.07 });
        c.fl("wr" + i, WC[(s.wc || [])[i]] || C.navy);
      }
      c.vis({ buf: s.buf, gt: s.gt, wv: s.wv, wvq: s.wv && s.wvq, fx: s.fail, dl: s.dl, pk: s.pk, ovf: s.ovf });
      c.op("rcg", s.rec ? 1 : 0);
      c.mv("rc", { sx: Math.max(1, (s.rec || 0) * 28), pv: [X(8), 95] }, { d: 1.2, dl: 0.3 });
      setNote(c, "nt", s.nt); setNote(c, "nq", s.nq); setNote(c, "nm", s.nm); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: GATE — the go / no-go gate: criteria agreed in advance
// (technical and operational), a named decision owner, a fixed date,
// a recorded waiver, and the pressure of the schedule.
// template: Approved Seal — https://lottiefiles.com/free-animation/approved-seal-seal-approval-loader-6o8fKZVBbx
// template: Checklist — https://lottiefiles.com/free-animation/checklist-c1qt4p98BW
// =====================================================================
function F_GATE(p) {
  const f = pfx(p);
  return {
    p, bench: "Approved Seal + Checklist (LottieFiles)",
    draw() {
      let s = f.K("brd", R(12, 40, 228, 214, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + R(12, 40, 228, 28, C.navy, 10) + R(12, 58, 228, 10, C.navy) + f.TK("ti", 126, 59, "Go / no-go criteria", 13.5, C.white));
      for (let i = 0; i < 6; i++) {
        const y = 92 + i * 25;
        s += f.H("r" + i, f.H("dt" + i, O(26, y - 4, 5, C.navy)) + f.H("do" + i, O(26, y - 4, 5, C.green)) + f.TK("t" + i, 38, y, "", 12.5, C.ink, "start") + markSVG(f, "m" + i, 222, y - 4, 0.72));
      }
      s += f.H("leg", O(26, 240, 5, C.navy) + T(36, 244, "Technical", 11.5, C.navy, "", "start") + O(120, 240, 5, C.green) + T(130, 244, "Operational", 11.5, C.green, "", "start"));
      s += R(250, 92, 8, 142, C.ink, 2) + R(384, 92, 8, 142, C.ink, 2) + R(244, 232, 154, 6, C.slate, 2);
      s += f.K("dL", R(259, 100, 62, 128, "#d9e4ee", 3, `stroke="${C.navy}" stroke-width="2"`) + P("M272 112 V216 M290 112 V216 M308 112 V216", C.muted, 2));
      s += f.K("dR", R(321, 100, 62, 128, "#d9e4ee", 3, `stroke="${C.navy}" stroke-width="2"`) + P("M334 112 V216 M352 112 V216 M370 112 V216", C.muted, 2));
      s += f.H("shut", R(254, 158, 134, 12, C.red, 4));
      s += R(262, 66, 120, 26, C.white, 6, `stroke="${C.navy}" stroke-width="2"`) + f.TK("sg", 322, 84, "GO / NO-GO", 13.5, C.navy);
      s += f.H("dm", person(262, 272, 0.95, C.navy) + chip(336, 270, "Decision owner", { sz: 12 }));
      s += f.H("date", calI(376, 40, C.navy, 1, "") + T(358, 45, "Date fixed", 12, C.navy, "", "end"));
      s += f.H("pre", `<g transform="rotate(-6 176 32)">${chip(176, 32, "Agreed in advance", { sz: 12, bg: C.green, st: C.green, fg: C.white })}</g>`);
      s += f.H("wv", R(26, 74, 200, 168, "#fffaf0", 8, `stroke="${C.amber}" stroke-width="2.4"`) + R(26, 74, 200, 26, C.amber, 8) + R(26, 90, 200, 10, C.amber) + T(126, 93, "WAIVER RECORD", 13, C.white) +
        T(38, 122, "Unmet condition", 11.5, C.amber, "", "start") + f.TK("w1", 38, 140, "", 12.5, C.ink, "start") + T(38, 166, "Why proceed anyway", 11.5, C.amber, "", "start") + f.TK("w2", 38, 184, "", 12.5, C.ink, "start") +
        T(38, 210, "Accepted by", 11.5, C.amber, "", "start") + f.TK("w3", 38, 228, "", 12.5, C.ink, "start"));
      s += f.H("party", rep(12, (i) => R(262 + (i * 37) % 120, 104 + (i * 53) % 100, 7, 4, [C.gold, C.orange, C.green, C.plum][i % 4], 1, `transform="rotate(${i * 31} ${266 + (i * 37) % 120} ${106 + (i * 53) % 100})"`)) + chip(322, 140, "Celebrate?", { sz: 13, st: C.amber, fg: C.amber }));
      s += f.H("partyX", cross(322, 140, 1.6, C.red, 4));
      s += f.H("push", P("M150 22 C214 22 236 44 252 74", C.orange, 3.4, 'class="a-flow"') + F("M246 70 L256 80 L258 66 Z", C.orange));
      s += noteSVG(f, "nt", 200, 20) + noteSVG(f, "nb", 200, 286);
      return s;
    },
    render(c, s) {
      c.tx("ti", s.t || "Go / no-go criteria");
      const it = s.items || [];
      for (let i = 0; i < 6; i++) {
        const r = it[i];
        c.op("r" + i, r ? 1 : 0, { dl: i * 0.08 });
        if (!r) { setMark(c, "m" + i, ""); continue; }
        c.tx("t" + i, r[0]); c.op("dt" + i, r[1] ? 0 : 1); c.op("do" + i, r[1] ? 1 : 0);
        setMark(c, "m" + i, r[2] || "");
      }
      c.op("leg", it.length ? 1 : 0);
      const open = !!s.open;
      c.mv("dL", { sx: open ? 0.12 : 1, pv: [259, 164] }, { d: 1.1 }); c.mv("dR", { sx: open ? 0.12 : 1, pv: [383, 164] }, { d: 1.1 });
      c.op("shut", s.shut ? 1 : 0);
      c.tx("sg", s.sign || "GO / NO-GO"); c.fl("sg", s.sign === "GO" ? C.green : s.sign === "NO-GO" || s.sign === "HOLD" ? C.red : C.navy);
      c.vis({ dm: s.dm, date: s.date, pre: s.pre, wv: s.wv, party: s.party, partyX: s.partyX, push: s.push });
      c.op("brd", s.wv ? 0.5 : 1);
      c.tx("w1", s.w1 || ""); c.tx("w2", s.w2 || ""); c.tx("w3", s.w3 || "");
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: REHEARSE — the only rollback rehearsal: 11 hours at
// Marina, no live corporate bookings; records already made in the new
// process must travel back safely.
// template: 5s countdown — https://lottiefiles.com/free-animation/5s-countdown-XZv1P0rDCu
// template: Git Workflow 1 — https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5
// =====================================================================
function F_REHEARSE(p) {
  const f = pfx(p);
  return {
    p, bench: "5s countdown + Git Workflow 1 (LottieFiles)",
    draw() {
      let s = O(100, 140, 60, C.white, `stroke="#e3e8ee" stroke-width="12"`);
      s += rep(12, (i) => { const a = i * Math.PI / 6; return P(`M${100 + 46 * Math.sin(a)} ${140 - 46 * Math.cos(a)} L${100 + 40 * Math.sin(a)} ${140 - 40 * Math.cos(a)}`, C.slate, i % 3 ? 1.4 : 2.6); });
      s += f.D("arc", "M100 80 A60 60 0 1 1 99.9 80", C.plum, 12);
      s += f.TK("hh", 100, 151, "", 30, C.plum);
      s += f.K("ml", T(100, 222, "Marina rehearsal", 13, C.navy) + house(100, 246, C.green, 0.9));
      s += f.H("cov", R(196, 50, 196, 150, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + R(196, 50, 196, 26, C.navy, 10) + R(196, 66, 196, 10, C.navy) + T(294, 68, "What the test covered", 12.5, C.white) +
        rep(3, (i) => f.TK("ct" + i, 208, 104 + i * 34, "", 12.5, C.ink, "start") + markSVG(f, "cm" + i, 372, 100 + i * 34, 0.8)));
      s += f.H("old", R(12, 248, 104, 40, C.white, 8, `stroke="${C.green}" stroke-width="2"`) + T(64, 273, "Previous way", 12.5, C.green));
      s += markSVG(f, "om", 112, 248, 0.7);
      s += f.H("new", R(286, 248, 106, 40, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + T(339, 273, "New process", 12.5, C.navy));
      s += f.H("lane", P("M118 268 H284", C.slate, 2, 'stroke-dasharray="4 5"'));
      for (let i = 0; i < 3; i++) s += f.H("rc" + i, R(-12, -9, 24, 18, C.white, 3, `stroke="${C.orange}" stroke-width="1.8"`) + P("M-7 -3 H7 M-7 3 H4", C.orange, 1.6));
      s += f.H("cf", O(200, 244, 10, C.red) + T(200, 248.5, "!", 13, C.white));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "no", 100, 44, 13) + noteSVG(f, "nm", 294, 222);
      return s;
    },
    render(c, s) {
      c.dr("arc", s.arc || 0, { d: 1.6 });
      c.tx("hh", s.hh || "");
      c.op("ml", s.ml === 0 ? 0 : 1);
      c.op("cov", s.cov ? 1 : 0);
      const rows = s.rows || [];
      for (let i = 0; i < 3; i++) { c.tx("ct" + i, rows[i] || ""); setMark(c, "cm" + i, s.cov ? ((s.mk || [])[i] || "") : ""); }
      const rb = !!s.recs;
      c.vis({ old: rb || s.old, new: rb || s.old, lane: rb, cf: s.conf });
      setMark(c, "om", s.om || "");
      for (let i = 0; i < 3; i++) {
        c.op("rc" + i, rb ? 1 : 0);
        let x = 304 + i * 30, y = 268;
        if (s.back) { x = s.conf && i === 1 ? 200 : 30 + i * 30; }
        c.mv("rc" + i, { x, y }, { d: 1.3, dl: i * 0.2, e: "power2.inOut" });
      }
      c.cl("rc1", "a-shake", !!s.conf);
      setNote(c, "nt", s.nt); setNote(c, "no", s.no); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: TRIGGER — a numerical stop / rollback trigger: backlog
// gauge with a proposed threshold, two distinct actions, named decision
// rights, and the point after which rollback is no longer possible.
// template: Health risk assessment — https://lottiefiles.com/free-animation/health-risk-assessment-bOhC3au0wY
// template: Wrong feedback — https://lottiefiles.com/free-animation/wrong-feedback-s8Ijly21K0
// =====================================================================
function F_TRIGGER(p) {
  const f = pfx(p);
  return {
    p, bench: "Health risk assessment + Wrong feedback (LottieFiles)",
    draw() {
      let s = T(64, 28, "Unresolved", 12, C.navy) + T(64, 42, "exceptions", 12, C.navy);
      s += R(46, 52, 36, 176, C.white, 18, `stroke="${C.slate}" stroke-width="2.5"`) + O(64, 236, 22, C.white, `stroke="${C.slate}" stroke-width="2.5"`) + O(64, 236, 16, C.orange);
      s += rep(5, (i) => P(`M84 ${70 + i * 34} H92`, C.slate, 1.6));
      s += `<rect data-k="${p}lv" x="52" y="58" width="24" height="176" rx="12" fill="${C.orange}"/>`;
      s += f.H("th", P("M36 130 H98", C.red, 3, 'stroke-dasharray="6 4"') + chip(150, 130, "Proposed trigger", { sz: 12, st: C.red, fg: C.red }) + T(150, 152, "not yet approved", 11, C.amber));
      s += f.H("vg", cloudI(150, 92) + T(150, 96, "Feels bad?", 11, C.slate));
      s += f.H("vgX", cross(150, 92, 1.8, C.red, 4));
      s += f.K("ps", R(214, 50, 178, 84, C.white, 10, `stroke="${C.red}" stroke-width="2"`) + barrierI(244, 82, 0.85) + T(274, 80, "STOP", 15, C.red, "", "start") + T(274, 98, "the next wave", 12, C.ink, "", "start") + f.TK("ws", 228, 124, "", 12, C.slate, "start"));
      s += f.K("pr", R(214, 146, 178, 84, C.white, 10, `stroke="${C.plum}" stroke-width="2"`) + undoI(244, 182, C.plum, 1) + T(274, 176, "ROLL BACK", 15, C.plum, "", "start") + T(274, 194, "a live site", 12, C.ink, "", "start") + f.TK("wr", 228, 220, "", 12, C.slate, "start"));
      s += f.H("hS", R(210, 46, 186, 92, "none", 13, `stroke="${C.gold}" stroke-width="3.5" class="a-pulse"`));
      s += f.H("hR", R(210, 142, 186, 92, "none", 13, `stroke="${C.gold}" stroke-width="3.5" class="a-pulse"`));
      s += f.H("kS", keyI(360, 114, C.amber, 1)) + f.H("kR", keyI(360, 210, C.amber, 1));
      s += f.H("rX", cross(303, 188, 3, C.red, 5));
      s += f.H("pnr", P("M110 262 H392", C.slate, 3) + P("M300 252 V272", C.red, 3) + T(300, 246, "No return", 12, C.red));
      s += f.H("mk", O(0, 262, 8, C.navy, `stroke="${C.white}" stroke-width="2"`));
      s += f.H("wait", rep(3, (i) => buddy(132 + i * 26, 254, 10, C.navy2)) + clockI(212, 248, 10, C.red));
      s += noteSVG(f, "nt", 240, 22) + noteSVG(f, "nb", 240, 286);
      return s;
    },
    render(c, s) {
      const lv = clamp(s.lv == null ? 0.3 : s.lv, 0.02, 1);
      c.mv("lv", { sy: lv, pv: [64, 234] }, { d: 1.2 });
      c.fl("lv", s.th != null && lv >= s.th ? C.red : C.orange);
      c.op("th", s.th != null ? 1 : 0); c.mv("th", { y: s.th != null ? (234 - s.th * 176) - 130 : 0 }, { d: 0.9 });
      c.vis({ vg: s.vg, vgX: s.vgX, hS: s.hl === "s", hR: s.hl === "r", kS: s.whoS === "ok", kR: s.whoR === "ok", rX: s.past, pnr: s.pnr, mk: s.pnr, wait: s.wait });
      c.op("ps", s.ps === 0 ? 0.25 : 1); c.op("pr", s.pr === 0 ? 0.25 : 1);
      c.tx("ws", s.whoS === "ok" ? "Decided by: named" : s.whoS === "q" ? "Decided by: ?" : "");
      c.tx("wr", s.whoR === "ok" ? "Decided by: named" : s.whoR === "q" ? "Decided by: ?" : "");
      c.mv("mk", { x: 110 + (s.pos || 0) * 282 }, { d: 1.2 });
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: CHECK — a titled checklist that ticks itself.
// template: Checklist — https://lottiefiles.com/free-animation/checklist-c1qt4p98BW
// template: Success — https://lottiefiles.com/free-animation/success-he8DVHwbzM
// =====================================================================
function F_CHECK(p) {
  const f = pfx(p);
  return {
    p, bench: "Checklist + Success (LottieFiles)",
    draw() {
      let s = R(36, 34, 328, 230, C.white, 12, `stroke="${C.navy}" stroke-width="2"`) + R(36, 34, 328, 30, C.navy, 12) + R(36, 52, 328, 12, C.navy) + f.TK("ti", 200, 55, "", 14, C.white);
      s += f.H("hl", R(44, 0, 312, 28, "rgba(229,183,108,.32)", 6));
      for (let i = 0; i < 6; i++) {
        const y = 92 + i * 30;
        s += f.H("r" + i, O(62, y - 5, 11, C.navy) + T(62, y - 0.5, String(i + 1), 12, C.white) + f.TK("t" + i, 82, y, "", 13.5, C.ink, "start") + markSVG(f, "m" + i, 338, y - 5, 0.8));
      }
      s += `<g transform="rotate(-6 290 250)">${noteSVG(f, "st", 290, 250, 13)}</g>`;
      s += noteSVG(f, "nb", 200, 286);
      return s;
    },
    render(c, s) {
      c.tx("ti", s.t || "");
      const it = s.items || [];
      for (let i = 0; i < 6; i++) {
        c.op("r" + i, it[i] ? (s.dimTo != null && i > s.dimTo ? 0.35 : 1) : 0, { dl: i * 0.08 });
        c.tx("t" + i, it[i] || "");
        setMark(c, "m" + i, it[i] ? ((s.mk || [])[i] || "") : "");
      }
      c.op("hl", s.hl != null ? 1 : 0); c.mv("hl", { y: 92 + (s.hl || 0) * 30 - 20 }, { d: 0.6 });
      setNote(c, "st", s.st); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: HAND — handover from the project team to operations:
// ownership, measures, exceptions, procedures and defects travel across;
// the project team can leave only when nothing depends on it.
// template: teamwork — https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6
// template: Business Solution conveyor — https://lottiefiles.com/free-animation/business-solution-pNyNfkcRsa
// =====================================================================
function F_HAND(p) {
  const f = pfx(p);
  const IT = [["Ownership", C.navy], ["Measures", C.teal], ["Exceptions", C.orange], ["Procedures", C.green], ["Defects", C.red]];
  return {
    p, bench: "teamwork + Business Solution conveyor (LottieFiles)",
    draw() {
      let s = R(10, 40, 146, 192, "rgba(255,255,255,.6)", 12, `stroke="${C.plum}" stroke-width="2" stroke-dasharray="6 4"`) + T(83, 60, "Project team", 13.5, C.plum);
      s += R(244, 40, 148, 192, "rgba(255,255,255,.75)", 12, `stroke="${C.green}" stroke-width="2.2"`) + T(318, 60, "Operations", 13.5, C.green);
      s += R(156, 206, 88, 10, C.slate, 5) + rep(4, (i) => O(168 + i * 21, 211, 3, C.white));
      s += f.K("pt", person(46, 214, 1, C.plum) + person(83, 214, 1, C.plum) + person(120, 214, 1, C.plum));
      s += person(278, 214, 1.1, C.green) + person(320, 214, 1, C.navy2) + person(358, 214, 1, C.navy2);
      IT.forEach(([l, col], i) => { s += f.H("i" + i, R(-44, -10, 88, 20, C.white, 10, `stroke="${col}" stroke-width="2"`) + T(0, 4.5, l, 12, col)); });
      s += f.H("hl", R(-50, -14, 100, 28, "none", 13, `stroke="${C.gold}" stroke-width="3" class="a-pulse"`));
      s += f.H("stk", P("M322 186 C262 150 160 150 118 186", C.orange, 2.6, 'class="a-flow"') + O(340, 178, 9, C.white, `stroke="${C.orange}" stroke-width="2"`) + T(340, 182.5, "?", 12, C.orange));
      s += f.H("onm", R(252, 240, 132, 30, "#eef0f3", 6, `stroke="${C.slate}" stroke-width="1.8" stroke-dasharray="4 3"`) + T(318, 260, "Owner: name only", 12, C.slate));
      s += f.H("oac", `<g class="a-spin">${gearI(298, 182, 10, C.amber, C.white)}</g>` + chip(318, 256, "Active owner", { sz: 12, bg: C.green, st: C.green, fg: C.white }));
      s += noteSVG(f, "nt", 200, 20) + noteSVG(f, "nb", 200, 287);
      return s;
    },
    render(c, s) {
      const mvd = s.mv || [], shown = s.items == null ? 5 : s.items;
      IT.forEach((_, i) => {
        const moved = mvd.indexOf(i) >= 0;
        c.op("i" + i, i < shown ? 1 : 0, { dl: i * 0.08 });
        c.mv("i" + i, { x: moved ? 318 : 83, y: 82 + i * 24 }, { d: 1.2, dl: moved ? i * 0.12 : 0, e: "power2.inOut" });
      });
      const hp = s.hl != null ? [mvd.indexOf(s.hl) >= 0 ? 318 : 83, 82 + s.hl * 24] : null;
      c.op("hl", hp ? 1 : 0); if (hp) c.mv("hl", { x: hp[0], y: hp[1] }, { d: 1.2 });
      c.op("pt", s.leave ? 0 : 1, { dl: s.leave ? 0.4 : 0 }); c.mv("pt", s.leave ? { x: -150 } : {}, { d: 1.4 });
      c.vis({ stk: s.stuck, onm: s.own === "name", oac: s.own === "active" });
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: DEFECT — the open-defect register that must survive
// project closure: every defect with a named owner and a date.
// template: Project Dashboard — https://lottiefiles.com/free-animation/project-dashboard-PeJUc2p1iB
// template: Man with task list — https://lottiefiles.com/free-animation/man-with-task-list-Z2XrIU43bQ
// =====================================================================
function F_DEFECT(p) {
  const f = pfx(p);
  return {
    p, bench: "Project Dashboard + Man with task list (LottieFiles)",
    draw() {
      let s = R(16, 46, 368, 192, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + R(16, 46, 368, 30, C.navy, 10) + R(16, 66, 368, 10, C.navy) +
        T(30, 66, "Open defect", 13, C.white, "", "start") + T(250, 66, "Owner", 13, C.white) + T(342, 66, "Date", 13, C.white);
      s += f.H("hl", R(20, 0, 360, 34, "rgba(229,183,108,.32)", 6));
      for (let i = 0; i < 4; i++) {
        const y = 104 + i * 36;
        s += f.H("r" + i, f.TK("d" + i, 30, y, "", 12.5, C.ink, "start") + f.TK("o" + i, 250, y, "", 12.5, C.navy) + f.TK("t" + i, 342, y, "", 12.5, C.navy) + P(`M24 ${y + 14} H376`, "#e4e9ef", 1.2) +
          markSVG(f, "mo" + i, 250, y - 4, 0.7) + markSVG(f, "mt" + i, 342, y - 4, 0.7));
      }
      s += f.H("lost", chip(200, 262, "Lost when the team leaves", { sz: 12.5, bg: C.red, st: C.red, fg: C.white }));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 200, 286);
      return s;
    },
    render(c, s) {
      const rows = s.rows || [];
      for (let i = 0; i < 4; i++) {
        const r = rows[i];
        c.op("r" + i, r ? (s.drop === i ? 0 : 1) : 0, { dl: s.drop === i ? 0.6 : i * 0.1, d: s.drop === i ? 1.2 : 0.6 });
        c.mv("r" + i, s.drop === i ? { y: 60 } : {}, { d: 1.4 });
        c.tx("d" + i, r ? r[0] : ""); c.tx("o" + i, r && r[1] ? r[1] : ""); c.tx("t" + i, r && r[2] ? r[2] : "");
        setMark(c, "mo" + i, r && !r[1] ? "q" : ""); setMark(c, "mt" + i, r && !r[2] ? "q" : "");
      }
      c.op("hl", s.hl != null ? 1 : 0); c.mv("hl", { y: 104 + (s.hl || 0) * 36 - 22 }, { d: 0.6 });
      c.op("lost", s.drop != null ? 1 : 0, { dl: 0.8 });
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: PHASES — the ten-phase framework as a snake of stations,
// with Implement (8), Realize Value (9) and Sustainable Performance (10)
// and the three continuous threads beneath.
// template: Multi-Step Icon Animation — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
// template: SVG Timeline + ScrollTrigger + Paths — https://codepen.io/ruru_wang/pen/VwOPzgy
// =====================================================================
function F_PHASES(p) {
  const f = pfx(p);
  const PX = [60, 130, 200, 270, 340, 340, 270, 200, 130, 60], PY = (n) => (n < 5 ? 82 : 170);
  const NM = ["Strategy", "Architecture", "Launch pad", "Understand", "Innovate", "People", "Develop", "Implement", "Realize value", "Sustain"];
  return {
    p, bench: "Multi-Step Icon Animation (LottieFiles) + SVG Timeline paths (CodePen)",
    draw() {
      let s = P("M60 82 H340 C384 82 384 170 340 170 H60", C.muted, 6);
      for (let n = 0; n < 10; n++) {
        const x = PX[n], y = PY(n);
        s += f.K("c" + n, O(x, y, 19, C.white, `stroke="${C.slate}" stroke-width="2.5"`) + T(x, y + 5, String(n + 1), 14, C.slate));
        s += f.H("o" + n, O(x, y, 19, n === 7 ? C.orange : n > 7 ? C.green : C.navy) + T(x, y + 5, String(n + 1), 14, C.white));
        s += T(x, y + 36, NM[n], 11.5, n === 7 ? C.orange : C.slate);
      }
      s += f.H("cu", O(0, 0, 27, "none", `stroke="${C.gold}" stroke-width="3.5" class="a-pulse"`));
      s += f.H("thr", P("M18 236 H382", C.navy, 4) + P("M18 252 H382", C.teal, 4) + P("M18 268 H382", C.amber, 4) +
        chip(80, 236, "Project mgmt", { sz: 11, st: C.navy, fg: C.navy }) + chip(200, 252, "Change mgmt", { sz: 11, st: C.teal, fg: C.teal }) + chip(320, 268, "Leadership", { sz: 11, st: C.amber, fg: C.amber }));
      s += noteSVG(f, "nt", 200, 24) + noteSVG(f, "nb", 200, 286);
      return s;
    },
    render(c, s) {
      const hl = s.hl || [];
      for (let n = 0; n < 10; n++) { c.op("o" + n, hl.indexOf(n + 1) >= 0 ? 1 : 0, { dl: hl.indexOf(n + 1) * 0.12 }); c.op("c" + n, s.dim && hl.indexOf(n + 1) < 0 ? 0.35 : 1); }
      c.op("cu", s.cur ? 1 : 0); if (s.cur) c.mv("cu", { x: PX[s.cur - 1], y: PY(s.cur - 1) }, { d: 0.9 });
      c.op("thr", s.thr ? 1 : 0);
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: FORUM — the asynchronous forum: post your own
// recommendation first, then reply to two classmates, disagreeing with
// at least one; Assessment Three is separate.
// template: Service Experience Feedback — https://lottiefiles.com/free-animation/service-experience-feedback-vxEY8nkHzh
// template: Join your team — https://lottiefiles.com/free-animation/join-your-team-qaD4U7x6Ml
// =====================================================================
function F_FORUM(p) {
  const f = pfx(p);
  const post = (y, col, a, b, av) => R(70, y, 296, 40, C.white, 10, `stroke="${col}" stroke-width="2"`) + person(48, y + 30, 0.85, av) + T(84, y + 17, a, 12.5, col, "", "start") + T(84, y + 33, b, 11.5, C.slate, "", "start");
  return {
    p, bench: "Service Experience Feedback + Join your team (LottieFiles)",
    draw() {
      let s = f.K("card", R(24, 36, 352, 222, "rgba(255,255,255,.8)", 12, `stroke="${C.navy}" stroke-width="2"`) + R(24, 36, 352, 30, C.navy, 12) + R(24, 54, 352, 12, C.navy) + T(200, 57, "Forum: One Weekend or Nine Months", 13, C.white));
      s += f.H("p0", post(78, C.navy, "Your recommendation", "posted before reading others", C.navy) + O(356, 84, 10, C.green) + tick(356, 84, 0.55, C.white, 2.2));
      s += f.H("lk", R(70, 128, 296, 86, "#eef0f3", 10) + rep(3, (i) => R(86, 142 + i * 22, 220 - i * 40, 10, "#d5dbe2", 5)) + lockI(340, 170, C.slate, 1.2));
      s += f.H("p1", post(128, C.green, "Reply 1: builds on it", "uses go / no-go criteria", C.teal));
      s += f.H("p2", post(176, C.red, "Reply 2: I disagree…", "uses rollback evidence", C.plum));
      s += f.H("cn", chip(200, 236, "Use this week's concepts", { sz: 12, st: C.amber, fg: C.amber }));
      s += f.H("a3", R(24, 70, 170, 150, C.navy, 12) + T(109, 112, "Assessment 3", 15, C.white) + T(109, 138, "Group research", 12.5, C.white) + T(109, 156, "project", 12.5, C.white) + T(109, 196, "Graded", 12, C.gold) +
        R(206, 70, 170, 150, C.white, 12, `stroke="${C.green}" stroke-width="2.4"`) + T(291, 112, "VoiceLearn", 15, C.green) + T(291, 138, "Questions for", 12.5, C.ink) + T(291, 156, "practice", 12.5, C.ink) + T(291, 196, "Formative", 12, C.green));
      s += noteSVG(f, "nt", 200, 18) + noteSVG(f, "nb", 200, 284);
      return s;
    },
    render(c, s) {
      const k = s.k || 0;
      c.op("card", s.a3 ? 0.12 : 1);
      c.vis({ p0: !s.a3 && k >= 1, lk: !s.a3 && k === 1, p1: !s.a3 && k >= 2, p2: !s.a3 && k >= 3, cn: !s.a3 && k >= 4, a3: s.a3 });
      c.mv("p1", k >= 2 ? {} : { x: 30 }); c.mv("p2", k >= 3 ? {} : { x: 30 });
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: BALANCE — the steering group's scale: the programme
// director's deadline against the operations director's contingency.
// template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
// template: Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p
// =====================================================================
function F_BALANCE(p) {
  const f = pfx(p);
  return {
    p, bench: "Comparison Chart + Choosing a path (LottieFiles)",
    draw() {
      let s = R(176, 250, 48, 8, C.ink, 3) + P("M200 100 V250", C.ink, 5);
      s += f.K("bm", P("M70 100 H330", C.ink, 5) + O(200, 100, 7, C.ink) + P("M70 100 L34 176 M70 100 L106 176 M330 100 L294 176 M330 100 L366 176", C.slate, 1.8) +
        R(24, 174, 92, 7, C.orange, 3) + R(284, 174, 92, 7, C.green, 3) + noteSVG(f, "pl0", 70, 160, 12.5) + noteSVG(f, "pl1", 70, 132, 12.5) + noteSVG(f, "pr0", 330, 160, 12.5) + noteSVG(f, "pr1", 330, 132, 12.5));
      s += f.H("who", person(70, 236, 1.1, C.orange) + T(70, 266, "Programme", 12, C.orange) + T(70, 280, "director", 12, C.orange) + person(330, 236, 1.1, C.green) + T(330, 266, "Operations", 12, C.green) + T(330, 280, "director", 12, C.green));
      s += noteSVG(f, "nt", 200, 24) + noteSVG(f, "nm", 200, 214);
      return s;
    },
    render(c, s) {
      c.mv("bm", { r: (s.tilt || 0) * 7, pv: [200, 100] }, { d: 1.3, e: "power2.inOut" });
      const l = s.l || [], r = s.r || [];
      setNote(c, "pl0", l[0]); setNote(c, "pl1", l[1]); setNote(c, "pr0", r[0]); setNote(c, "pr1", r[1]);
      c.op("who", s.who === 0 ? 0 : 1);
      setNote(c, "nt", s.nt); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: DIP — the implementation dip (compact): performance
// falls after go-live, support props the valley, recovery follows.
// template: Line Chart — https://lottiefiles.com/free-animation/line-chart-q9Ehbk6l4y
// template: Easing Animations — https://observablehq.com/@d3/easing-animations
// =====================================================================
function F_DIP(p) {
  const f = pfx(p);
  return {
    p, bench: "Line Chart (LottieFiles) + Easing Animations (Observable)",
    draw() {
      let s = R(20, 40, 370, 192, "#fffdf8", 10, `stroke="${C.slate}" stroke-width="1.6"`) + T(30, 60, "Performance", 12, C.slate, "", "start");
      s += rep(7, (i) => P(`M${70 + i * 50} 44 V228`, "#f0e6d6", 1));
      s += P("M120 70 V226", C.slate, 2, 'stroke-dasharray="4 4"') + T(120, 248, "Go-live", 12, C.slate);
      s += f.H("al", P("M28 214 H382", C.red, 2.4, 'stroke-dasharray="7 5"') + T(382, 208, "Failure line", 12, C.red, "", "end"));
      s += f.H("sup", P("M172 226 V176 M205 226 V192 M238 226 V178", C.amber, 5) + chip(205, 140, "Training + support", { sz: 12, st: C.amber, fg: C.amber }));
      s += f.D("cv", "M30 110 H120 C150 110 165 190 205 190 C245 190 255 120 290 110 C320 100 350 80 382 70", C.navy, 4.5);
      s += f.H("rec", O(382, 70, 10, C.green) + tick(382, 70, 0.6, C.white, 2.4));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 200, 278);
      return s;
    },
    render(c, s) {
      c.dr("cv", s.dr == null ? 1 : s.dr, { d: 1.5 });
      c.vis({ al: s.al, sup: s.sup, rec: s.rec });
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}


// =====================================================================
// W12O1e · Sequencing the twelve remaining properties (29 lines)
// Shots: MAP, GANTT, COMPARE, CHECK, LOBBY, ARCH, TRAIN, GATE, GAUGE,
// DIP, CHART
// =====================================================================
{
  const id = "W12O1e";
  const SEQ = ["g", "g", "g"];
  const plan = [
    ["map", { grp: 1, mk: { pil: "ok", std: "q", her: "q", peak: "q" }, nt: { t: "Not a copy-and-paste", c: "O" } }, "Pilot experience can't be copied"],
    ["gantt", { wk: 0, nt: { t: "12 properties to sequence", c: "N" } }, "A practical sequence"],
    ["compare", { lt: "Scheduling", li: "cal", l: ["Fill the", "calendar"], lm: "x", rt: "Sequencing", ri: "hotel", r: ["Match each group", "to its readiness"], rm: "ok", hl: "r", mid: "≠", nt: { t: "Exhibit 12", c: "N" } }, "More than scheduling"],
    ["map", { grp: 1, mk: { pil: "ok" }, lit: ["std", "her", "peak"], pop: 1, nb: { t: "Three groups remain", c: "N" } }, "Three distinct groups"],
    ["map", { grp: 1, lit: ["std"], pop: 1, nb: { t: "Standard ×5: no constraint", c: "G" } }, "Five standard-layout properties"],
    ["check", { t: "Standard ×5: still check", items: ["Staff prepared", "Support arranged", "Corporate issue resolved?"], mk: ["q", "q", "q"], st: { t: "Not automatic", c: "O" } }, "Not automatically ready"],
    ["map", { grp: 1, lit: ["pil", "std"], trv: 1, nb: { t: "Extend learning simply", c: "G" } }, "Extend the pilot learning"],
    ["lobby", { small: 1, noK: 1, g: "desk", nt: { t: "Heritage ×3: no kiosk room", c: "P" } }, "Three heritage properties"],
    ["arch", { tr: 1, vr: 1, reg: 1, ps: 1, pv: 1, hl: "var", nb: { t: "Approved, not a local exception", c: "P" } }, "Prepare the registered variant"],
    ["train", { mods: ["Assisted check-in", "No-kiosk routines", "Escalation"], mk: ["ok", "ok", "ok"], live: ["Heritage lobby", "Assisted arrivals"], lk: ["ok", "ok"], nb: { t: "Training for the variant", c: "P" } }, "Different training and support"],
    ["gate", { t: "Heritage variant ready?", items: [["Variant procedures", 1, "q"], ["Variant training", 1, "q"], ["Desk staffing", 1, "q"]], nb: { t: "Check before the wave", c: "P" } }, "Assess each variant first"],
    ["gauge", { mode: "occ", v: 93, big: "> 90%", bigc: "r", nt: { t: "Peak ×4: occupancy", c: "N" }, nb: { t: "Through January", c: "R" } }, "Four peak-occupancy properties"],
    ["dip", { dr: 1, al: 1, nt: { t: "No room for a January dip", c: "R" }, nb: { t: "Every slow arrival: a full house", c: "O" } }, "No room for a dip"],
    ["gantt", { wk: 8, dl: 1, pk: 1, buf: 1, nt: { t: "Timing is critical", c: "O" } }, "Timing becomes critical"],
    ["gantt", { wk: 8, dl: 1, pk: 1, wv: 1, wvq: 1, nb: { t: "Protect peak operations", c: "O" } }, "Protect the busy period"],
    ["gantt", { wk: 0, dl: 1, nt: { t: "Digital guest record: 1 Jan", c: "R" } }, "An external deadline"],
    ["gantt", { wk: 8, dl: 1, nt: { t: "Proposal: 12 sites, 8 weeks", c: "N" } }, "October start, eight weeks"],
    ["gantt", { wk: 8, dl: 1, buf: 1, nt: { t: "Three weeks to spare", c: "G" } }, "Three-week buffer"],
    ["gantt", { wk: 8, dl: 1, buf: 1, nq: { t: "Is the buffer enough?", c: "O" } }, "Enough contingency?"],
    ["gantt", { wk: 8, dl: 1, buf: 1, fail: 1, nq: { t: "What if week 8 fails?", c: "R" } }, "What if week eight fails?"],
    ["gantt", { wk: 8, dl: 1, buf: 1, fail: 1, rec: 4, ovf: 1, nm: { t: "Planned ≠ resilient", c: "R" }, nb: { t: "Illustrative 4-week recovery", c: "N" } }, "Planned versus resilient"],
    ["chart", { dr: 1, plat: 1, big: 1, nt: { t: "Still 65% at week 11", c: "O" } }, "Adoption still at 65%"],
    ["map", { grp: 1, copy: 1, nb: { t: "More desk load everywhere", c: "R" } }, "Corporate cases multiply"],
    ["gantt", { wk: 3, wc: SEQ, dl: 1, wv: 1, wvq: 1, gt: 1, nt: { t: "A candidate sequence", c: "N" } }, "Standard first, prepare, protect"],
    ["compare", { lt: "Conditional", li: "doc", l: ["If readiness", "evidence holds"], lm: "q", rt: "Approved decision", ri: "key", r: ["Not made", "by Qasr yet"], rm: "x", mid: "≠" }, "Conditional, not approved"],
    ["map", { grp: 1, lit: ["std", "peak"], wave: { std: "Next?", her: "Prep", peak: "Risk" }, nb: { t: "Who's next? Who's riskiest?", c: "P" } }, "Next group and riskiest group"],
    ["gate", { t: "Delay a wave if…", items: [["Staff not ready", 1, "x"], ["Support missing", 1, "x"], ["Variant not prepared", 1, "x"]], sign: "HOLD", shut: 1, push: 1, nb: { t: "Evidence beats the deadline", c: "O" } }, "Evidence that justifies delay"],
    ["gantt", { wk: 8, dl: 1, buf: 1, gt: 1, nt: { t: "Evidence at every gate", c: "N" } }, "Evidence before each wave"],
    ["gate", { nb: { t: "Next: the go-live decision", c: "P" } }, "Next: the go-live decision"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#f2f0f6", plan,
    desc: "Exhibit 12 turned into a rollout order: five standard properties with no identified constraint, three heritage properties needing their registered assisted variant, four peak-occupancy properties above 90 percent through January, the 1 January deadline, an eight-week rollout with a three-week buffer, and the question of what happens if week eight fails.",
    shots: { map: F_MAP("mp_"), gantt: F_GANTT("gt_"), compare: F_COMPARE("cp_"), check: F_CHECK("ck_"), lobby: F_LOBBY("lo_"), arch: F_ARCH("ar_"), train: F_TRAIN("tr_"), gate: F_GATE("ga_"), gauge: F_GAUGE("gg_"), dip: F_DIP("di_"), chart: F_CHART("ch_") }
  });
  SCENE_BG.push([id, "#f2f0f6"]);
}

// =====================================================================
// W12O3a · The go-live decision is not a formality (29 lines)
// Shots: GANTT, COMPARE, GATE, LOBBY, CHECK, BALANCE, TRIGGER, MAP
// =====================================================================
{
  const id = "W12O3a";
  const CRIT5 = [["Functions verified", 0, "ok"], ["Interfaces verified", 0, "ok"], ["Staff trained", 1, "q"], ["Support capacity", 1, "q"], ["Workable procedures", 1, "q"]];
  const MOST = [["Functions verified", 0, "ok"], ["Staff trained", 1, "ok"], ["Support capacity", 1, "ok"], ["Escalation route", 1, "x"]];
  const WV = { w1: "Escalation not ready", w2: "Example: senior cover", w3: "Named steering member" };
  const plan = [
    ["gantt", { wk: 8, gt: 1, dl: 1, nt: { t: "A gate before each wave", c: "N" } }, "Evidence before each property"],
    ["compare", { lt: "Planned date", li: "cal", l: ["On the", "schedule"], lm: "ok", rt: "Operations ready", ri: "person", r: ["Not shown", "by a date"], rm: "q", mid: "≠" }, "A date isn't readiness"],
    ["gate", { items: [["Real conditions OK?", 1, "q"]], nb: { t: "Dependable, here, for real", c: "N" } }, "Can it run dependably here?"],
    ["lobby", { g: "kiosk", kok: 1, nt: { t: "Kiosks work, tests passed", c: "G" } }, "Kiosks work, tests passed"],
    ["gate", { items: [["Kiosks functioning", 0, "ok"], ["Tests passed", 0, "ok"], ["Corporate drill done", 1, "x"]], nb: { t: "Tech ready, staff not", c: "O" } }, "Technical yes, people not yet"],
    ["lobby", { g: "desk", corp: 1, busy: 1, sup: 1, q: 1, qn: 3, nt: { t: "Supervisors? Help when busy?", c: "O" } }, "The operations director's questions"],
    ["compare", { lt: "Technical", li: "gear", l: ["Passed", "development tests"], lm: "ok", rt: "Operational", ri: "person", r: ["Ready to run", "real shifts?"], rm: "q", hl: "r", mid: "≠" }, "Operational readiness"],
    ["gate", { items: [["Criteria written down", 1, "ok"]], pre: 1, date: 1, nb: { t: "Set before, not during", c: "G" } }, "Criteria fixed in advance"],
    ["compare", { lt: "General confidence", li: "cloud", l: ["'We think", "it's fine'"], lm: "x", rt: "Observable test", ri: "chart", r: ["Evidence anyone", "can check"], rm: "ok", hl: "r", mid: "→" }, "Confidence into conditions"],
    ["gate", { items: CRIT5, nb: { t: "Two kinds of readiness", c: "N" } }, "Technical and operational"],
    ["check", { t: "One criterion, fully defined", items: ["What: staff trained", "Evidence: drill passed", "Bar: every shift lead", "Agreed: before go-live"], mk: ["ok", "ok", "ok", "ok"], st: { t: "Example, defined early", c: "G" } }, "What satisfactory evidence looks like"],
    ["gate", { items: CRIT5, dm: 1, date: 1, nt: { t: "Who decides? When?", c: "P" } }, "A named decision-maker"],
    ["balance", { l: [{ t: "Go now", c: "O" }], r: [{ t: "Wait", c: "G" }], nm: { t: "No decider: the date decides", c: "R" } }, "Drift to an unavoidable cutover"],
    ["gate", { items: CRIT5, party: 1, partyX: 1, nb: { t: "Assess, don't celebrate", c: "O" } }, "Assess, don't celebrate"],
    ["check", { t: "Activity versus readiness", items: ["Kiosk installed", "Training attended", "Can staff run it alone?"], mk: ["ok", "ok", "q"], hl: 2 }, "Activity isn't readiness"],
    ["gate", { items: MOST, nb: { t: "One gap: escalation", c: "O" } }, "Most criteria met"],
    ["gate", { items: MOST, push: 1, nb: { t: "Schedule pressure", c: "R" } }, "Pressure to approve"],
    ["gate", { items: [["Functions verified", 0, "ok"], ["Staff trained", 1, "ok"], ["Support capacity", 1, "ok"], ["Escalation route", 1, "w"]], nb: { t: "Spent money isn't a reason", c: "R" } }, "Don't quietly skip a criterion"],
    ["gate", Object.assign({ wv: 1, nb: { t: "A waiver is written down", c: "A" } }, WV), "Record any waiver"],
    ["gate", Object.assign({ wv: 1, nt: { t: "What's unmet, and why OK", c: "A" } }, WV), "Unmet condition and reason"],
    ["compare", { lt: "Informed exception", li: "doc", l: ["Recorded, justified,", "accepted by name"], lm: "ok", rt: "Overlooked failure", ri: "cloud", r: ["No record,", "no one decided"], rm: "x", mid: "≠" }, "Informed versus overlooked"],
    ["gate", Object.assign({ wv: 1, sign: "NO-GO", nb: { t: "Paper doesn't make it safe", c: "R" } }, WV), "Documentation isn't safety"],
    ["gate", { items: MOST, sign: "HOLD", shut: 1, nb: { t: "Some gaps mean: postpone", c: "R" } }, "Some gaps justify postponing"],
    ["trigger", { lv: 0.3, nt: { t: "Plan the 'what if' first", c: "P" } }, "Contingency before approval"],
    ["check", { t: "Before approving", items: ["If it fails: what happens?", "Who can intervene?", "What forces a stop?"], mk: ["q", "q", "q"] }, "Failure, intervention, stopping"],
    ["balance", { tilt: -0.7, l: [{ t: "1 Jan deadline", c: "R" }], r: [{ t: "Readiness evidence", c: "G" }], nm: { t: "Pressure isn't evidence", c: "O" } }, "Deadline can't replace evidence"],
    ["map", { grp: 1, lit: ["her", "peak"], mk: { her: "w", peak: "w" }, nb: { t: "Different sites, different gates", c: "O" } }, "Heritage and peak need judgement"],
    ["compare", { lt: "Desirable schedule", li: "cal", l: ["What we", "would like"], lm: "q", rt: "Defensible go", ri: "shield", r: ["What evidence", "supports"], rm: "ok", hl: "r", mid: "≠" }, "Desirable versus defensible"],
    ["trigger", { lv: 0.62, nt: { t: "Next: when it goes wrong", c: "P" } }, "Next: contingency"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#eef2f7", plan,
    desc: "A go / no-go gate in front of each Qasr property: objective technical and operational criteria agreed before the meeting, a named decision owner and date, a property that meets most criteria but lacks an escalation route, schedule pressure, an explicitly recorded waiver, postponement, and contingency planned before approval.",
    shots: { gantt: F_GANTT("gt_"), compare: F_COMPARE("cp_"), gate: F_GATE("ga_"), lobby: F_LOBBY("lo_"), check: F_CHECK("ck_"), balance: F_BALANCE("bl_"), trigger: F_TRIGGER("tg_"), map: F_MAP("mp_") }
  });
  SCENE_BG.push([id, "#eef2f7"]);
}

// =====================================================================
// W12O3b · Eleven hours to go backwards (29 lines)
// Shots: GATE, GANTT, REHEARSE, LOBBY, COMPARE, TRIGGER, BARS, BALANCE,
// CHECK, HAND
// =====================================================================
{
  const id = "W12O3b";
  const H11 = { arc: 11 / 12, hh: "11 h" };
  const COV = ["Marina only", "Live corporate bookings", "Other properties"];
  const plan = [
    ["gate", { sign: "GO", open: 1, items: [["Criteria met", 1, "ok"]], nb: { t: "Approved ≠ guaranteed", c: "O" } }, "Approval isn't a guarantee"],
    ["gantt", { wk: 8, dl: 1, buf: 1, fail: 1, nq: { t: "Week 8 fails?", c: "R" } }, "The eighth-week question"],
    ["gantt", { wk: 8, dl: 1, buf: 1, fail: 1, nm: { t: "Only 3 weeks before 1 Jan", c: "R" } }, "Only the buffer remains"],
    ["rehearse", { arc: 0.05, nt: { t: "'We rehearsed rollback'", c: "N" } }, "The rollback rehearsal"],
    ["rehearse", Object.assign({ nt: { t: "Marina only: 11 hours", c: "P" } }, H11), "Marina, eleven hours"],
    ["rehearse", Object.assign({ cov: 1, rows: COV, mk: ["ok", "x", "q"], nm: { t: "Corporate recovery untested", c: "R" } }, H11), "No live corporate bookings"],
    ["rehearse", Object.assign({ no: { t: "Observed, not guaranteed", c: "O" }, nt: { t: "One test, one site", c: "N" } }, H11), "Observed, not guaranteed"],
    ["lobby", { g: "desk", corp: 1, route: 1, rej: 1, busy: 1, qn: 4, nt: { t: "Failure mid-arrival", c: "R" } }, "Failure during corporate arrivals"],
    ["rehearse", Object.assign({ recs: 1, nt: { t: "Records already made", c: "N" } }, H11), "Completed transactions"],
    ["rehearse", Object.assign({ recs: 1, back: 1, conf: 1, om: "q", nt: { t: "Lost or conflicting data?", c: "R" } }, H11), "Can the old way resume safely?"],
    ["compare", { lt: "Parallel running", li: "stop", l: ["Old and new", "side by side"], lm: "x", rt: "One arrival", ri: "person", r: ["Processed", "only once"], rm: "ok", mid: "→", nt: { t: "No parallel safety net", c: "R" } }, "No parallel running here"],
    ["trigger", { lv: 0.5, hl: "r", ps: 0, nt: { t: "Rollback: restore the old way", c: "P" } }, "What rollback means"],
    ["compare", { lt: "A document", li: "doc", l: ["'Technicians", "might…'"], lm: "x", rt: "A capability", ri: "gear", r: ["Triggers, people,", "rehearsed steps"], rm: "ok", hl: "r", mid: "≠" }, "More than a document"],
    ["trigger", { lv: 0.45, th: 0.6, nt: { t: "Triggers must be numbers", c: "N" } }, "Numerical triggers"],
    ["trigger", { lv: 0.45, th: 0.6, vg: 1, vgX: 1, nt: { t: "Measurable, not vague", c: "N" } }, "Measurable, not vague"],
    ["trigger", { lv: 0.78, th: 0.6, nt: { t: "Example: backlog limit", c: "A" } }, "Example: an exception backlog"],
    ["trigger", { lv: 0.45, th: 0.6, nb: { t: "The case gives no approved number", c: "O" } }, "Only a proposed threshold"],
    ["trigger", { lv: 0.5, nt: { t: "Two different actions", c: "P" } }, "Stop and rollback differ"],
    ["compare", { lt: "Stop", li: "stop", l: ["No new sites", "go live"], rt: "Roll back", ri: "undo", r: ["Reverse a live", "site to the old way"], mid: "≠" }, "Prevent versus reverse"],
    ["trigger", { lv: 0.5, whoS: "ok", whoR: "ok", nt: { t: "Named decision rights", c: "G" } }, "Who can stop, who can reverse"],
    ["trigger", { lv: 0.82, whoS: "q", whoR: "q", wait: 1, nt: { t: "Not while guests wait", c: "R" } }, "Never negotiated at the desk"],
    ["trigger", { lv: 0.5, pnr: 1, pos: 0.45, nt: { t: "A point of no return", c: "O" } }, "The point of no return"],
    ["trigger", { lv: 0.5, pnr: 1, pos: 0.9, past: 1, nt: { t: "Past it: another plan", c: "R" } }, "Beyond it: another contingency"],
    ["rehearse", Object.assign({ cov: 1, rows: ["Representative sites", "Corporate bookings", "Busy-period load"], mk: ["q", "q", "q"], nm: { t: "Rehearse what's missing", c: "G" } }, H11), "Rehearse representative conditions"],
    ["bars", { ti: "Evidence that recovery works", rows: [["One Marina test", 3, "o", "Some"], ["Representative tests", 7, "g", "Stronger"], ["Any guarantee", 10, "s", "Never", "x"]], max: 10, nm: { t: "Stronger, never certain", c: "N" } }, "Stronger evidence, no guarantee"],
    ["balance", { l: [{ t: "1 Jan deadline", c: "R" }, { t: "Site readiness", c: "N" }], r: [{ t: "Recovery capability", c: "P" }, { t: "Cost of failing on", c: "O" }], nm: { t: "Weigh them together", c: "N" } }, "Balance recovery and deadline"],
    ["check", { t: "Contingency plan", items: ["Numerical triggers", "Named authority", "Recovery actions", "Evidence to resume"], mk: ["ok", "ok", "ok", "ok"], st: { t: "Ready before go-live", c: "G" } }, "Triggers, authority, actions, resumption"],
    ["gantt", { wk: 8, dl: 1, buf: 1, fail: 1, rec: 2, nm: { t: "Resilience, not pessimism", c: "G" } }, "A test of resilience"],
    ["hand", { nb: { t: "Next: handing over to operations", c: "P" } }, "Next: when can the team leave?"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#f4f0f6", plan,
    desc: "The only rollback rehearsal took eleven hours at Marina and excluded live corporate bookings. Records made in the new process must travel back without loss; parallel running is impossible; numerical stop and rollback triggers with a proposed (not approved) threshold, named decision rights, a point of no return, and a contingency plan.",
    shots: { gate: F_GATE("ga_"), gantt: F_GANTT("gt_"), rehearse: F_REHEARSE("rh_"), lobby: F_LOBBY("lo_"), compare: F_COMPARE("cp_"), trigger: F_TRIGGER("tg_"), bars: F_BARS("ba_"), balance: F_BALANCE("bl_"), check: F_CHECK("ck_"), hand: F_HAND("hd_") }
  });
  SCENE_BG.push([id, "#f4f0f6"]);
}

addStyles(SCENE_BG);
})();


// OPER621 · Week 12 · The Implement Phase — animated teaching scenes (version 1, label: claude)
// File: w12-claude-part4.js  ·  Scenes: W12O3c, W12O3d
// Every narration line maps to one named shot family (its benchmark template is
// named in a "// template:" comment above the family) whose state shows what that
// sentence says about Qasr Hospitality Group's implementation decision.
// Standalone part: defines every helper it uses, registers its scenes and appends
// its own scoped rules (.vls-w12-<secId>) into the single shared <style id="vl-sc-w12">.
// Contract: VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
// step(i, n): i = narration line index, n = number of lines (proportional otherwise).
// Uses window.gsap when present, otherwise CSS transitions; honours prefers-reduced-motion.
(() => {
"use strict";
const PART = "p4";
// ===== shared engine (a self-contained copy lives in every part) =====
window.VL_SCENES = window.VL_SCENES || {};
const VL_SCENES = window.VL_SCENES;
const SCENE_BG = [];
const C = {
  navy: "#1f4e79", navy2: "#2d6a9f", orange: "#c0502a", paper: "#fbf8f1",
  ink: "#1b2a3a", blue: "#dbe7f2", green: "#317c61", gold: "#e5b76c",
  muted: "#91aabd", plum: "#6b4e8a", sand: "#efe4cf", sky: "#eaf2f8",
  red: "#b0362b", white: "#ffffff", mint: "#e1f0e8", peach: "#f8e3d8",
  lilac: "#ece6f3", slate: "#5d7389", teal: "#1f7f99", amber: "#a8741a", grey: "#c5ced8"
};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const num = (v, f) => { const x = Number(v); return Number.isFinite(x) ? x : f; };
const reduced = () => {
  try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
  catch (_) { return false; }
};
const hasG = () => !!(window.gsap && typeof window.gsap.to === "function" && typeof window.gsap.set === "function") && !reduced();
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");

// ---- SVG string builders ----
const R = (x, y, w, h, f, rx = 0, ex = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${ex}/>`;
const O = (cx, cy, r, f, ex = "") => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${ex}/>`;
const P = (d, s, w = 2, ex = "") => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const F = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
const D = (k, d, s, w = 3, ex = "") => `<path data-k="${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100" ${ex}/>`;
const T = (x, y, s, sz = 14, f = C.ink, ex = "", a = "middle") => `<text x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const TK = (k, x, y, s, sz = 14, f = C.ink, a = "middle", ex = "") => `<text data-k="${k}" x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const K = (k, body, ex = "") => `<g data-k="${k}" ${ex}>${body}</g>`;
const H = (k, body, ex = "") => `<g data-k="${k}" style="opacity:0" ${ex}>${body}</g>`;
const tw = (s, sz) => Math.round(String(s).length * sz * 0.6 + sz * 1.3);
const chip = (x, y, s, o = {}) => {
  const sz = o.sz || 13, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.9);
  return R(x - w / 2, y - h / 2, w, h, o.bg || C.white, o.rx == null ? h / 2 : o.rx,
    `stroke="${o.st || C.navy}" stroke-width="${o.sw || 1.8}"${o.dash ? ' stroke-dasharray="4 3"' : ""}`) +
    T(x, y + sz * 0.36, s, sz, o.fg || C.navy);
};
const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${x - 7 * s} ${y} l${5 * s} ${5 * s} l${10 * s} ${-11 * s}`, col, w);
const cross = (x, y, s = 1, col = C.orange, w = 3) => P(`M${x - 6 * s} ${y - 6 * s} l${12 * s} ${12 * s} M${x + 6 * s} ${y - 6 * s} l${-12 * s} ${12 * s}`, col, w);
const person = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}</g>`;
const buddy = (x, y, r, col) => O(x, y, r, col) + O(x - r * 0.35, y - r * 0.12, r * 0.24, C.white) + O(x + r * 0.35, y - r * 0.12, r * 0.24, C.white) + O(x - r * 0.3, y - r * 0.08, r * 0.11, C.ink) + O(x + r * 0.4, y - r * 0.08, r * 0.11, C.ink);
const clockI = (x, y, r, col = C.orange, bg = C.white) => O(x, y, r, bg, `stroke="${col}" stroke-width="${Math.max(2, r / 6)}"`) + P(`M${x} ${y - r * 0.62} V${y} L${x + r * 0.45} ${y + r * 0.3}`, col, Math.max(2, r / 7));
const star = (x, y, s = 1, col = C.gold) => F(`M${x} ${y - 10 * s} l${3 * s} ${6 * s} ${7 * s} ${1 * s} ${-5 * s} ${5 * s} ${1 * s} ${7 * s} ${-6 * s} ${-3 * s} ${-6 * s} ${3 * s} ${1 * s} ${-7 * s} ${-5 * s} ${-5 * s} ${7 * s} ${-1 * s} Z`, col, `stroke="${C.amber}" stroke-width="1"`);
const house = (x, y, col = C.navy, s = 1, fill = C.white) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M-13 -2 L0 -14 L13 -2 Z", col)}${R(-11, -2, 22, 16, fill, 1, `stroke="${col}" stroke-width="2"`)}${R(-3, 5, 6, 9, col, 1)}</g>`;
const kioskI = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-14, -52, 28, 52, col, 6)}${R(-10, -47, 20, 18, C.blue, 3)}${R(-7, -42, 14, 3, C.green, 1)}${R(-7, -37, 10, 2.5, C.white, 1)}${R(-5, -20, 10, 8, C.ink, 2)}${R(-18, -2, 36, 5, C.slate, 2)}</g>`;
const keyI = (x, y, col = C.amber, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, 0, 5.5, "none", `stroke="${col}" stroke-width="3"`)}${P("M5.5 0 H17 M13 0 V5 M17 0 V4", col, 3)}</g>`;
const wrenchI = (x, y, col = C.slate, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${P("M-8 8 L3 -3", col, 4.5)}${P("M1 -9 A7 7 0 1 0 9 -1", col, 3.5)}</g>`;
const lockI = (x, y, col = C.slate, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-9, -4, 18, 14, col, 3)}${P("M-5 -4 V-8 A5 5 0 0 1 5 -8 V-4", col, 2.6)}</g>`;
const docI = (x, y, col = C.navy, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-11, -14, 22, 28, C.white, 2, `stroke="${col}" stroke-width="2"`)}${P("M-6 -6 h12 M-6 0 h12 M-6 6 h8", col, 1.6)}</g>`;
const calI = (x, y, col = C.navy, s = 1, txt = "") => `<g transform="translate(${x} ${y}) scale(${s})">${R(-13, -12, 26, 24, C.white, 3, `stroke="${col}" stroke-width="2"`)}${R(-13, -12, 26, 7, col, 2)}${txt ? T(0, 9, txt, 11, col) : ""}</g>`;
const flagI = (x, y, col = C.green, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${P("M0 12 V-14", C.ink, 2.4)}${F("M0 -14 L16 -9 L0 -3 Z", col)}</g>`;
const magI = (x, y, r = 16, col = C.ink) => O(x, y, r, "rgba(255,255,255,.3)", `stroke="${col}" stroke-width="3"`) + P(`M${x + r * 0.7} ${y + r * 0.7} L${x + r * 1.3} ${y + r * 1.3}`, col, 5);
const megaI = (x, y, col = C.orange, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M-10 -4 L6 -12 V12 L-10 4 Z", col)}${R(-16, -5, 7, 10, col, 2)}${P("M10 -6 Q14 0 10 6 M13 -10 Q20 0 13 10", col, 2)}</g>`;
const barrierI = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${P("M-20 12 V-10 M20 12 V-10", C.ink, 3)}${R(-24, -10, 48, 10, C.white, 2, `stroke="${C.red}" stroke-width="2"`)}${rep(4, (i) => F(`M${-20 + i * 12} -10 l6 0 l-5 10 l-6 0 Z`, C.red))}</g>`;
const undoI = (x, y, col = C.plum, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${P("M10 8 A11 11 0 1 0 -8 -6", col, 3.6)}${F("M-15 -12 L-4 -10 L-11 -1 Z", col)}</g>`;
const gearI = (x, y, r, col, hole = C.paper) => {
  let d = ""; const n = 8;
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n * 0.55, a2 = a0 + Math.PI / n, a3 = a2 + Math.PI / n * 0.45;
    const p = (a, rr) => `${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`;
    d += (i ? "L" : "M") + p(a0, r) + "L" + p(a1, r) + "L" + p(a2, r * 0.78) + "L" + p(a3, r * 0.78);
  }
  return F(d + "Z", col) + O(x, y, r * 0.34, hole);
};
const shieldI = (x, y, col = C.green, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M0 -16 L14 -10 V2 C14 10 7 15 0 18 C-7 15 -14 10 -14 2 V-10 Z", col)}${tick(0, 1, 0.7, C.white, 2.6)}</g>`;
const bookI = (x, y, col = C.teal, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M-16 -10 Q-8 -14 0 -9 Q8 -14 16 -10 V12 Q8 8 0 13 Q-8 8 -16 12 Z", col)}${P("M0 -9 V13", C.white, 1.6)}</g>`;
const chartI = (x, y, col = C.navy, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-16, -14, 32, 28, C.white, 3, `stroke="${col}" stroke-width="2"`)}${P("M-11 7 L-4 0 L2 4 L11 -8", col, 2.6)}</g>`;
const crowdI = (x, y, col = C.slate) => person(x - 14, y, 0.75, col) + person(x + 14, y, 0.75, col) + person(x, y + 4, 0.85, col);
const cloudI = (x, y, col = C.slate) => F(`M${x - 22} ${y + 8} Q${x - 30} ${y - 6} ${x - 14} ${y - 8} Q${x - 10} ${y - 22} ${x + 4} ${y - 14} Q${x + 20} ${y - 22} ${x + 22} ${y - 4} Q${x + 32} ${y + 6} ${x + 18} ${y + 10} Z`, C.white, `stroke="${col}" stroke-width="2"`);
const ICONS = {
  person: (x, y) => person(x, y + 6, 1.4, C.navy), kiosk: (x, y) => kioskI(x, y + 26, 0.85), doc: (x, y) => docI(x, y, C.navy, 1.3),
  clock: (x, y) => clockI(x, y, 20, C.orange), flag: (x, y) => flagI(x - 6, y, C.green, 1.4), stop: (x, y) => barrierI(x, y, 1.1),
  undo: (x, y) => undoI(x, y, C.plum, 1.3), key: (x, y) => keyI(x - 10, y, C.amber, 1.5), chart: (x, y) => chartI(x, y, C.navy, 1.2),
  shield: (x, y) => shieldI(x, y, C.green, 1.2), gear: (x, y) => gearI(x, y, 20, C.slate, C.white), hotel: (x, y) => house(x, y + 4, C.navy, 1.6),
  book: (x, y) => bookI(x, y, C.teal, 1.3), cal: (x, y) => calI(x, y, C.navy, 1.4, "1"), cloud: (x, y) => cloudI(x, y, C.slate),
  crowd: (x, y) => crowdI(x, y + 4, C.slate), lock: (x, y) => lockI(x, y + 2, C.slate, 1.5), wrench: (x, y) => wrenchI(x, y, C.slate, 1.5)
};

// ---- marks: ok / x / q / w ----
const MK = {
  ok: (x, y, s) => O(x, y, 11 * s, C.green) + tick(x, y, 0.62 * s, C.white, 2.4),
  x: (x, y, s) => O(x, y, 11 * s, C.red) + cross(x, y, 0.62 * s, C.white, 2.4),
  q: (x, y, s) => O(x, y, 11 * s, C.white, `stroke="${C.orange}" stroke-width="2.2"`) + T(x, y + 5.2 * s, "?", 15 * s, C.orange),
  w: (x, y, s) => F(`M${x} ${y - 11 * s} L${x + 12 * s} ${y + 9 * s} L${x - 12 * s} ${y + 9 * s} Z`, C.gold, `stroke="${C.amber}" stroke-width="1.5"`) + T(x, y + 6 * s, "!", 13 * s, C.ink)
};

// ---- prefixed builders for shot families ----
const pfx = (p) => ({
  p,
  K: (k, b, e) => K(p + k, b, e),
  H: (k, b, e) => H(p + k, b, e),
  D: (k, d, s, w, e) => D(p + k, d, s, w, e),
  TK: (k, x, y, s, sz, f, a, e) => TK(p + k, x, y, s, sz, f, a, e)
});
const pc = (c, p) => {
  const o = { p, snap: c.snap, all: c.all, opEl: c.opEl, mvEl: c.mvEl, flEl: c.flEl, data: c.data };
  ["op", "mv", "dr", "fl", "tx", "cl"].forEach((m) => { o[m] = (k, ...a) => c[m](p + k, ...a); });
  o.vis = (m, t) => { const q = {}; Object.keys(m).forEach((k) => { q[p + k] = m[k]; }); c.vis(q, t); };
  return o;
};
const markSVG = (f, key, x, y, s = 1) => Object.keys(MK).map((m) => f.H(key + m, MK[m](x, y, s))).join("");
const setMark = (c, key, m) => Object.keys(MK).forEach((q) => c.op(key + q, q === m ? 1 : 0, { dl: q === m ? 0.25 : 0 }));

// ---- auto-sized note chips: N(avy) O(range) R(ed) G(reen) P(lum) A(mber) F(illed) ----
const NOTE_COL = { N: [C.navy, C.white, C.navy], O: [C.orange, C.white, C.orange], R: [C.red, C.white, C.red], G: [C.green, C.white, C.green], P: [C.plum, C.white, C.plum], F: [C.navy, C.navy, C.white], A: [C.amber, C.white, C.amber] };
const noteSVG = (f, key, x, y, sz = 14) => f.H(key, R(x - 40, y - 14, 80, 28, C.white, 14, `stroke="${C.navy}" stroke-width="2"`) +
  `<text x="${x}" y="${y + sz * 0.36}" font-size="${sz}" fill="${C.navy}" text-anchor="middle"></text>`, `data-cx="${x}" data-sz="${sz}"`);
function setNote(c, key, n) {
  if (!n) { c.op(key, 0); return; }
  const t = typeof n === "string" ? n : n.t;
  const v = typeof n === "string" ? "N" : (n.c || "N");
  const col = NOTE_COL[v] || NOTE_COL.N;
  c.all(`[data-k="${c.p}${key}"]`).forEach((g) => {
    const r = g.querySelector("rect"), tx = g.querySelector("text");
    const cx = +g.getAttribute("data-cx"), sz = +g.getAttribute("data-sz") || 14;
    const w = Math.round(t.length * sz * 0.6 + sz * 1.7);
    const x0 = clamp(cx - w / 2, 4, 396 - w);
    if (r) { r.setAttribute("x", String(x0)); r.setAttribute("width", String(w)); r.setAttribute("stroke", col[0]); r.setAttribute("fill", col[1]); }
    if (tx) { tx.setAttribute("x", String(x0 + w / 2)); tx.setAttribute("fill", col[2]); if (tx.textContent !== t) tx.textContent = t; }
  });
  c.op(key, 1, { dl: 0.15 });
}

// ---- per-part stylesheet (appended once into the shared <style id="vl-sc-w12">) ----
const AN = "vlsw12c" + PART;
function sceneCSS(id, bg) {
  const s = ".vls-w12-" + id;
  return `
${s}{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:220px;overflow:hidden!important;box-sizing:border-box;border-radius:14px;background:${bg};color:${C.ink};font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w12-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w12-fig>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}
${s} svg text{font-family:inherit;font-weight:800;letter-spacing:.1px}
${s} [data-k]{transform-box:fill-box;transform-origin:50% 50%}
${s}.w12-css [data-k]{transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.85s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}
${s}.w12-snap [data-k],${s}.w12-rm [data-k]{transition:none!important}
${s}.w12-rm *,${s}.w12-snap *{animation:none!important}
${s} .w12-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:38px;padding:6px 12px 8px;font-size:15px;font-weight:800;line-height:1.25;color:${C.navy};background:rgba(255,255,255,.62);border-top:1px solid rgba(31,78,121,.12)}
${s} .w12-num{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w12-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.2px}
${s} .w12-lab.w12-in{animation:${AN}CapIn .5s cubic-bezier(.22,.8,.24,1)}
${s} .w12-bar{flex:0 0 54px;height:4px;border-radius:4px;background:rgba(31,78,121,.15);overflow:hidden}
${s} .w12-bar i{display:block;height:100%;width:0;background:${C.orange};transition:width .6s ease}
${s}.w12-intro .w12-fig>svg{animation:${AN}Intro .7s cubic-bezier(.22,.8,.24,1)}
${s} .a-flow{stroke-dasharray:6 7;animation:${AN}Flow 1.1s linear infinite}
${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:${AN}Spin 6s linear infinite}
${s} .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:${AN}Bob 2.6s ease-in-out infinite}
${s} .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:${AN}Pulse 2s ease-in-out infinite}
${s} .a-blink{animation:${AN}Blink 1.4s ease-in-out infinite}
${s} .a-shake{transform-box:fill-box;transform-origin:50% 50%;animation:${AN}Shake .9s ease-in-out infinite}
@media (max-width:420px){${s} .w12-cap{font-size:14px;min-height:34px;padding:5px 10px 7px}${s} .w12-bar{flex-basis:40px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
}
const KEYFRAMES = `
@keyframes ${AN}CapIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes ${AN}Intro{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
@keyframes ${AN}Flow{to{stroke-dashoffset:-26}}
@keyframes ${AN}Spin{to{transform:rotate(360deg)}}
@keyframes ${AN}Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes ${AN}Pulse{0%,100%{opacity:.35;transform:scale(.94)}50%{opacity:.95;transform:scale(1.06)}}
@keyframes ${AN}Blink{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes ${AN}Shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}
`;
function addStyles(list) {
  if (typeof document === "undefined") return;
  let st = document.getElementById("vl-sc-w12");
  if (!st) { st = document.createElement("style"); st.id = "vl-sc-w12"; (document.head || document.documentElement).appendChild(st); }
  const flag = "w12claude" + PART;
  if (st.getAttribute("data-" + flag)) return;
  st.setAttribute("data-" + flag, "1");
  st.appendChild(document.createTextNode(KEYFRAMES + list.map(([id, bg]) => sceneCSS(id, bg)).join("\n")));
}

// ---- scene factory: build(el), step(i, n), reset() ----
// step(i, n): i = narration line index, n = number of narration lines in the section.
// When n equals the plan length each line gets its own state; any other n maps proportionally.
function makeScene(cfg) {
  const { id, N, labels } = cfg;
  let root = null, useG = false;
  const mapK = (i, n) => {
    const nn = Math.max(1, Math.floor(num(n, N)));
    const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
    return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
  };
  const nodes = (k) => (root ? Array.prototype.slice.call(root.querySelectorAll('[data-k="' + k + '"]')) : []);
  function timing(el, t) {
    el.style.transitionDuration = (t.d == null ? 0.85 : t.d) + "s";
    el.style.transitionDelay = (t.dl || 0) + "s";
  }
  function tf(el, st, t, snap) {
    const x = st.x || 0, y = st.y || 0, r = st.r || 0;
    const sx = st.sx != null ? st.sx : (st.s != null ? st.s : 1);
    const sy = st.sy != null ? st.sy : (st.s != null ? st.s : 1);
    if (useG) {
      const v = { x, y, rotation: r, scaleX: sx, scaleY: sy };
      if (st.pv) v.svgOrigin = st.pv[0] + " " + st.pv[1]; else v.transformOrigin = "50% 50%";
      if (snap) window.gsap.set(el, v);
      else window.gsap.to(el, Object.assign(v, { duration: t.d == null ? 0.85 : t.d, delay: t.dl || 0, ease: t.e || "power3.out", overwrite: "auto" }));
    } else {
      if (st.pv) { el.style.transformBox = "view-box"; el.style.transformOrigin = st.pv[0] + "px " + st.pv[1] + "px"; }
      timing(el, t);
      el.style.transform = "translate(" + x + "px," + y + "px) rotate(" + r + "deg) scale(" + sx + "," + sy + ")";
    }
  }
  function op(el, o, t, snap) {
    if (useG) { if (snap) window.gsap.set(el, { opacity: o }); else window.gsap.to(el, { opacity: o, duration: t.d == null ? 0.6 : t.d, delay: t.dl || 0, ease: "power1.out", overwrite: false }); }
    else { timing(el, t); el.style.opacity = String(o); }
  }
  function dash(el, f, t, snap) {
    const v = 100 * (1 - clamp(f, 0, 1));
    if (useG) { if (snap) window.gsap.set(el, { strokeDashoffset: v }); else window.gsap.to(el, { strokeDashoffset: v, duration: t.d == null ? 1.1 : t.d, delay: t.dl || 0, ease: "power2.inOut" }); }
    else { timing(el, t); el.style.strokeDashoffset = String(v); }
  }
  function fill(el, col, t, snap) {
    if (useG) { if (snap) window.gsap.set(el, { fill: col }); else window.gsap.to(el, { fill: col, duration: t.d == null ? 0.6 : t.d, delay: t.dl || 0 }); }
    else { timing(el, t); el.style.fill = col; }
  }
  function ctx(snap) {
    return {
      snap,
      op: (k, o, t = {}) => nodes(k).forEach((el) => op(el, o, t, snap)),
      mv: (k, st, t = {}) => nodes(k).forEach((el) => tf(el, st, t, snap)),
      dr: (k, f, t = {}) => nodes(k).forEach((el) => dash(el, f, t, snap)),
      fl: (k, col, t = {}) => nodes(k).forEach((el) => fill(el, col, t, snap)),
      tx: (k, s) => nodes(k).forEach((el) => { if (el.textContent !== String(s)) el.textContent = String(s); }),
      cl: (k, cls, on) => nodes(k).forEach((el) => el.classList.toggle(cls, !!on)),
      vis: (map, t = {}) => Object.keys(map).forEach((k) => { const v = map[k]; const o = typeof v === "number" ? clamp(v, 0, 1) : (v ? 1 : 0); nodes(k).forEach((el) => op(el, o, t, snap)); }),
      all: (sel) => (root ? Array.prototype.slice.call(root.querySelectorAll(sel)) : []),
      opEl: (el, o, t = {}) => op(el, o, t, snap),
      mvEl: (el, st, t = {}) => tf(el, st, t, snap),
      flEl: (el, col, t = {}) => fill(el, col, t, snap),
      data: (n, v) => { if (root) root.setAttribute("data-" + n, String(v)); }
    };
  }
  function caption(k, snap) {
    const lab = root.querySelector(".w12-lab"), nn = root.querySelector(".w12-num"), bar = root.querySelector(".w12-bar i");
    const txt = labels[k] || "";
    if (lab && lab.textContent !== txt) {
      lab.textContent = txt;
      if (!snap && !reduced()) { lab.classList.remove("w12-in"); void lab.offsetWidth; lab.classList.add("w12-in"); }
    }
    if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
    if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
  }
  function render(k, snap) {
    if (!root) return;
    if (snap) root.classList.add("w12-snap");
    try { cfg.render(ctx(snap), k); } catch (e) { if (window.console) console.warn("[VL W12 " + id + "]", e); }
    caption(k, snap);
    if (snap) { void root.offsetWidth; root.classList.remove("w12-snap"); }
    root.setAttribute("data-moment", String(k));
  }
  function kill() {
    if (root && useG) { try { window.gsap.killTweensOf(root.querySelectorAll("[data-k]")); } catch (_) {} }
  }
  function mount(el) {
    const r = document.createElement("div");
    r.className = "vls-w12-" + id + " w12-root" + (useG ? " w12-gsap" : " w12-css") + (reduced() ? " w12-rm" : " w12-intro");
    r.setAttribute("data-scene", id);
    r.innerHTML = '<div class="w12-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
      esc(cfg.desc) + '">' + cfg.draw() + '</svg></div><div class="w12-cap" aria-live="polite"><span class="w12-num"></span><span class="w12-lab"></span><span class="w12-bar"><i></i></span></div>';
    if (typeof el.replaceChildren === "function") el.replaceChildren(r);
    else { el.innerHTML = ""; el.appendChild(r); }
    return r;
  }
  return {
    build(el) {
      if (!el || el.nodeType !== 1) return;
      kill();
      useG = hasG();
      root = mount(el);
      render(0, true);
    },
    step(i, n) { if (!root) return; render(mapK(i, n), false); },
    reset() { if (!root) return; kill(); render(0, true); }
  };
}

// ---- shot-based scene: every narration line names one shot family + its state + a caption ----
function shotScene(cfg) {
  const names = Object.keys(cfg.shots);
  const draw = () => R(-400, -300, 1200, 900, cfg.bg) +
    names.map((nm) => `<g data-k="SH_${nm}" style="opacity:0">${cfg.shots[nm].draw()}</g>`).join("");
  const render = (c, k) => {
    const [act, st] = cfg.plan[k];
    names.forEach((nm) => {
      const on = nm === act;
      c.op("SH_" + nm, on ? 1 : 0, { d: on ? 0.55 : 0.35, dl: on ? 0.12 : 0 });
      c.mv("SH_" + nm, on ? {} : { y: 10, s: 0.97 }, { d: 0.6 });
    });
    const shot = cfg.shots[act];
    shot.render(pc(c, shot.p), st || {}, k);
    c.data("benchmark", shot.bench);
    c.data("shot", act);
  };
  return makeScene({ id: cfg.id, N: cfg.plan.length, labels: cfg.plan.map((x) => x[2]), draw, render, desc: cfg.desc });
}


// =====================================================================
// SHOT FAMILY: LOBBY — Qasr reception: kiosk route, assisted desk,
// rejected corporate booking, queue, floor coach, supervisor's authority,
// heritage lobby with no room for a kiosk.
// template: Customer Support — https://lottiefiles.com/free-animation/customer-support-TrBfuCgebx
// template: Waiting Queue — https://lottiefiles.com/free-animation/waiting-queue-xoNutPl764
// =====================================================================
function F_LOBBY(p) {
  const f = pfx(p);
  const GP = { door: [24, 214], kiosk: [76, 214], wait: [160, 214], desk: [228, 214], done: [384, 214] };
  return {
    p, bench: "Customer Support + Waiting Queue (LottieFiles)",
    draw() {
      let s = R(-400, 236, 1200, 400, "#efe6d6") + P("M-400 236 H800", "#d8c7a6", 2);
      s += [70, 200, 330].map((x) => F(`M${x - 40} 236 V100 C${x - 40} 64 ${x + 40} 64 ${x + 40} 100 V236 Z`, "#e6edf4")).join("");
      s += f.H("wl", R(-400, 30, 452, 206, "#d6c6a6") + P("M52 30 V236", "#b9a57e", 3));
      s += f.H("wr", R(352, 30, 460, 206, "#d6c6a6") + P("M352 30 V236", "#b9a57e", 3));
      s += f.K("kio", kioskI(112, 234, 1.3));
      s += f.H("kok", O(112, 150, 12, C.green) + tick(112, 150, 0.65, C.white, 2.6));
      s += f.H("noK", R(82, 160, 60, 76, "rgba(255,255,255,.6)", 6, `stroke="${C.red}" stroke-width="2.6" stroke-dasharray="5 4"`) + cross(112, 198, 1.5, C.red, 4.5) + chip(112, 136, "No room for kiosk", { sz: 13, st: C.red, fg: C.red }));
      s += f.H("rej", O(136, 168, 13, C.red) + cross(136, 168, 0.65, C.white, 2.6) + chip(112, 136, "Rejected", { sz: 13, st: C.red, fg: C.red }));
      s += K(p + "desk", R(246, 196, 124, 9, C.ink, 3) + R(252, 205, 112, 31, C.navy, 4) + R(270, 214, 76, 4, C.blue, 2));
      s += K(p + "rcp", person(300, 188, 1.15, C.green));
      s += f.H("q", O(326, 146, 14, C.white, `stroke="${C.orange}" stroke-width="2.4"`) + T(326, 152, "?", 18, C.orange));
      s += f.H("help", person(342, 190, 1.05, C.plum) + O(356, 160, 9, C.gold) + T(356, 164.5, "!", 13, C.ink));
      s += f.H("sup", person(374, 186, 1.1, C.navy2) + keyI(352, 156, C.amber, 1));
      s += f.H("route", P("M136 200 C176 150 216 150 250 188", C.orange, 3.6, 'class="a-flow"') + chip(194, 140, "Assisted path", { sz: 13, st: C.orange, fg: C.orange }));
      s += f.H("tK", chip(112, 64, "Kiosk: 2 min", { sz: 14, st: C.green, fg: C.green }));
      s += f.H("tA", chip(304, 64, "Assisted: 9 min", { sz: 14, st: C.orange, fg: C.orange }));
      s += f.H("busy", clockI(30, 66, 14, C.red) + T(50, 71, "Busy shift", 13, C.red, "", "start"));
      for (let i = 0; i < 5; i++) s += f.H("qp" + i, person(24 + i * 26, 274, 0.78, C.slate));
      s += f.H("g", `<g class="a-bob">${buddy(0, 0, 13, C.navy2)}</g>` + f.H("corp", R(8, -2, 22, 14, C.orange, 3) + T(19, 8.5, "CORP", 8, C.white)));
      s += noteSVG(f, "nt", 200, 24) + noteSVG(f, "nb", 230, 284) + noteSVG(f, "nr", 304, 104) + noteSVG(f, "nl", 112, 104);
      return s;
    },
    render(c, s) {
      c.vis({ wl: s.small, wr: s.small });
      c.mv("wl", s.small ? {} : { x: -60 }, { d: 1 }); c.mv("wr", s.small ? {} : { x: 60 }, { d: 1 });
      c.op("kio", s.noK ? 0.25 : s.dimK ? 0.4 : 1);
      c.vis({ kok: s.kok, rej: s.rej, noK: s.noK, q: s.q, help: s.help, sup: s.sup, route: s.route, tK: s.tK, tA: s.tA, busy: s.busy });
      c.mv("help", s.help ? {} : { x: 40 }); c.mv("sup", s.sup ? {} : { x: 40 });
      c.mv("q", s.q ? { s: 1 } : { s: 0.5 }, { e: "back.out(2)" });
      c.mv("rej", s.rej ? { s: 1 } : { s: 0.6 }, { e: "back.out(2)" });
      const qn = s.qn || 0;
      for (let i = 0; i < 5; i++) { c.op("qp" + i, i < qn ? 1 : 0, { dl: i * 0.08 }); c.mv("qp" + i, i < qn ? {} : { x: -40 }, { dl: i * 0.08 }); }
      const gp = s.g && GP[s.g];
      c.op("g", gp ? 1 : 0);
      if (gp) c.mv("g", { x: gp[0], y: gp[1] }, { d: 1.2, e: "power2.inOut" });
      c.op("corp", s.corp ? 1 : 0);
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb); setNote(c, "nr", s.nr); setNote(c, "nl", s.nl);
    }
  };
}

// =====================================================================
// SHOT FAMILY: TRAIN — the training room next to the real shift: which
// situations were practised and which were not; roles; the "why".
// template: Checklist — https://lottiefiles.com/free-animation/checklist-c1qt4p98BW
// template: Man with task list — https://lottiefiles.com/free-animation/man-with-task-list-Z2XrIU43bQ
// =====================================================================
function F_TRAIN(p) {
  const f = pfx(p);
  const panel = (x, title, col, key) => R(x, 40, 182, 160, C.white, 10, `stroke="${col}" stroke-width="2.2"`) + R(x, 40, 182, 26, col, 10) + R(x, 56, 182, 10, col) + f.TK(key, x + 91, 58, title, 13.5, C.white);
  return {
    p, bench: "Checklist + Man with task list (LottieFiles)",
    draw() {
      let s = f.K("pL", panel(12, "Training room", C.teal, "tL"));
      s += f.K("pR", panel(206, "Real shift", C.navy, "tR"));
      s += f.H("hL", R(16, 0, 174, 24, "rgba(229,183,108,.35)", 6)) + f.H("hR", R(210, 0, 174, 24, "rgba(229,183,108,.35)", 6));
      for (let i = 0; i < 5; i++) {
        const y = 90 + i * 24;
        s += f.H("l" + i, f.TK("lt" + i, 24, y + 5, "", 13, C.ink, "start") + markSVG(f, "lm" + i, 178, y, 0.8));
        s += f.H("r" + i, f.TK("rt" + i, 218, y + 5, "", 13, C.ink, "start") + markSVG(f, "rm" + i, 372, y, 0.8));
      }
      s += f.H("gap", P("M198 82 L192 104 L204 126 L193 148 L202 172", C.red, 3.4) + O(198, 128, 13, C.red) + cross(198, 128, 0.6, C.white, 2.4));
      s += f.H("roles", person(36, 264, 1.1, C.green) + T(36, 292, "Reception", 12, C.green) + person(220, 264, 1.1, C.navy2) + T(220, 292, "Supervisor", 12, C.navy2));
      s += noteSVG(f, "rl", 128, 250, 13) + noteSVG(f, "rr", 316, 250, 13);
      s += f.H("why", O(372, 228, 15, C.gold) + R(366, 243, 12, 9, C.slate, 2) + rep(5, (i) => { const a = Math.PI * (1.1 + i * 0.2); return P(`M${372 + 20 * Math.cos(a)} ${228 + 20 * Math.sin(a)} L${372 + 26 * Math.cos(a)} ${228 + 26 * Math.sin(a)}`, C.amber, 2.2); }) + T(372, 233, "?", 14, C.ink));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 200, 228);
      return s;
    },
    render(c, s) {
      const mods = s.mods || [], live = s.live || [];
      for (let i = 0; i < 5; i++) {
        c.op("l" + i, i < mods.length ? 1 : 0, { dl: i * 0.08 }); c.tx("lt" + i, mods[i] || "");
        setMark(c, "lm" + i, (s.mk || [])[i] || "");
        c.op("r" + i, i < live.length ? 1 : 0, { dl: i * 0.08 }); c.tx("rt" + i, live[i] || "");
        setMark(c, "rm" + i, (s.lk || [])[i] || "");
      }
      c.op("pR", s.right === 0 ? 0.25 : 1); c.op("pL", s.left === 0 ? 0.25 : 1);
      c.op("hL", s.hlL != null ? 1 : 0); c.mv("hL", { y: 78 + (s.hlL || 0) * 24 }, { d: 0.6 });
      c.op("hR", s.hlR != null ? 1 : 0); c.mv("hR", { y: 78 + (s.hlR || 0) * 24 }, { d: 0.6 });
      c.vis({ gap: s.gap, roles: s.roles, why: s.why });
      c.mv("why", s.why ? { s: 1 } : { s: 0.5 }, { e: "back.out(2)" });
      setNote(c, "rl", s.roles ? s.rl : null); setNote(c, "rr", s.roles ? s.rr : null);
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: WEEKS — the first six weeks after go-live: support
// intensity per week, a coach on the floor versus a distant help queue,
// and temporary extra capacity.
// template: Roadmap / Project schedule — https://lottiefiles.com/free-animation/roadmapproject-schedule-krKjaLHUr0
// template: Tech support and customer service — https://lottiefiles.com/free-animation/tech-support-and-customer-service-9aooyn7i8u
// =====================================================================
function F_WEEKS(p) {
  const f = pfx(p);
  const X = (i) => 40 + i * 58;
  const DEF = [1, 0.92, 0.78, 0.62, 0.46, 0.32];
  return {
    p, bench: "Roadmap / Project schedule + Tech support (LottieFiles)",
    draw() {
      let s = flagI(24, 62, C.green, 1);
      for (let i = 0; i < 6; i++) {
        s += K(p + "c" + i, R(X(i), 44, 52, 30, C.white, 6, `stroke="${C.slate}" stroke-width="1.6"`) + T(X(i) + 26, 64, "Wk " + (i + 1), 13, C.slate));
        s += f.H("cl" + i, R(X(i), 44, 52, 30, C.green, 6) + T(X(i) + 26, 64, "Wk " + (i + 1), 13, C.white));
        s += f.H("b" + i, R(X(i) + 12, 84, 28, 66, C.green, 4, 'opacity=".85"'));
      }
      s += f.H("bl", T(24, 150, "Support", 12, C.green, 'transform="rotate(-90 24 150)"'));
      s += f.H("cur", R(X(0) - 4, 40, 60, 38, "none", 9, `stroke="${C.gold}" stroke-width="3" class="a-pulse"`));
      s += R(-400, 252, 1200, 300, "#efe6d6") + P("M-400 252 H800", "#d8c7a6", 2);
      s += R(66, 214, 124, 9, C.ink, 3) + R(72, 223, 112, 29, C.navy, 4);
      s += person(116, 208, 1.1, C.green);
      s += f.H("guest", buddy(40, 236, 12, C.navy2) + O(40, 208, 9, C.white, `stroke="${C.orange}" stroke-width="2"`) + T(40, 212.5, "?", 12, C.orange));
      s += f.H("near", person(160, 208, 1.05, C.plum) + chip(160, 172, "Coach on floor", { sz: 12, st: C.plum, fg: C.plum }));
      s += f.H("far", P("M188 236 C240 286 300 286 334 244", C.slate, 2, 'stroke-dasharray="4 5"') + R(296, 196, 96, 46, C.white, 6, `stroke="${C.slate}" stroke-width="2"`) + T(344, 215, "Remote helpdesk", 11.5, C.slate) + T(344, 233, "Ticket #42", 12, C.red) + clockI(386, 196, 10, C.red));
      s += f.H("farX", cross(344, 220, 2, C.red, 4));
      s += f.H("cap", person(214, 210, 1, C.green) + person(240, 210, 1, C.green) + chip(227, 174, "+2 staff", { sz: 12, st: C.green, fg: C.green }));
      s += noteSVG(f, "nt", 250, 22) + noteSVG(f, "nb", 200, 284) + noteSVG(f, "nm", 250, 168);
      return s;
    },
    render(c, s) {
      const wk = s.wk == null ? 0 : s.wk, bars = s.bars ? (Array.isArray(s.bars) ? s.bars : DEF) : null;
      for (let i = 0; i < 6; i++) {
        c.op("cl" + i, i < wk ? 1 : 0, { dl: i * 0.1 });
        c.op("b" + i, bars ? 1 : 0, { dl: i * 0.08 });
        c.mv("b" + i, { sy: bars ? Math.max(0.05, bars[i]) : 0.05, pv: [X(i) + 26, 150] }, { d: 0.9, dl: i * 0.08 });
      }
      c.op("bl", bars ? 1 : 0);
      c.op("cur", s.cur != null ? 1 : 0); c.mv("cur", { x: (s.cur || 0) * 58 }, { d: 0.7 });
      c.vis({ guest: s.guest, near: s.near, far: s.far, farX: s.farX, cap: s.cap });
      c.mv("near", s.near ? {} : { x: 30 }); c.mv("cap", s.cap ? {} : { y: 20 });
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: ROUTER — escalation: a reported problem is sorted by
// kind and travels to the person with authority to decide it.
// template: Flowchart — https://lottiefiles.com/free-animation/secret-animation-7trmN1JFrD
// template: Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p
// =====================================================================
function F_ROUTER(p) {
  const f = pfx(p);
  const POS = { start: [54, 150], dia: [150, 150], tech: [236, 78], proc: [236, 222] };
  return {
    p, bench: "Flowchart + Choosing a path (LottieFiles)",
    draw() {
      let s = f.K("dia", F("M150 114 L186 150 L150 186 L114 150 Z", C.navy) + T(150, 147, "Which", 12, C.white) + T(150, 162, "kind?", 12, C.white));
      s += f.D("up", "M186 150 C212 150 214 78 278 78", C.slate, 3);
      s += f.D("dn", "M186 150 C212 150 214 222 278 222", C.green, 3);
      s += f.K("tech", R(282, 50, 112, 56, C.white, 10, `stroke="${C.slate}" stroke-width="2"`) + person(300, 86, 0.95, C.slate) + wrenchI(300, 60, C.slate, 0.7) + T(318, 74, "Technical", 12, C.slate, "", "start") + T(318, 90, "specialist", 12, C.slate, "", "start"));
      s += f.K("own", R(282, 194, 112, 56, C.white, 10, `stroke="${C.green}" stroke-width="2"`) + person(300, 230, 0.95, C.green) + T(318, 218, "Process", 12, C.green, "", "start") + T(318, 234, "owner", 12, C.green, "", "start"));
      s += f.H("auth", R(278, 190, 120, 64, "none", 12, `stroke="${C.gold}" stroke-width="3.5" class="a-pulse"`) + keyI(362, 240, C.amber, 1));
      s += f.H("noAuth", docI(306, 132, C.slate, 0.9) + lockI(318, 140, C.red, 0.8) + chip(300, 168, "Can't change procedure", { sz: 12, st: C.red, fg: C.red }));
      s += f.H("daily", calI(36, 64, C.navy, 1.2, "") + T(58, 69, "Raised daily", 13, C.navy, "", "start"));
      s += f.H("wa", P("M30 252 C60 230 90 270 120 246 C150 226 170 268 200 250", C.slate, 2, 'stroke-dasharray="4 4"') + person(206, 262, 0.9, C.slate) + O(224, 234, 9, C.white, `stroke="${C.orange}" stroke-width="2"`) + T(224, 238.5, "?", 12, C.orange));
      s += f.H("tok", R(-38, -20, 76, 40, C.white, 8, `stroke="${C.orange}" stroke-width="2.2"`) + f.TK("k1", 0, -3, "", 12, C.orange) + f.TK("k2", 0, 13, "", 12, C.orange));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 200, 284);
      return s;
    },
    render(c, s) {
      c.dr("up", s.up ? 1 : 0); c.dr("dn", s.dn ? 1 : 0);
      c.op("tech", s.only === "proc" ? 0.3 : 1); c.op("own", s.only === "tech" ? 0.3 : 1);
      c.vis({ auth: s.auth, noAuth: s.noAuth, daily: s.daily, wa: s.wa });
      const tp = s.tok && POS[s.tok];
      c.op("tok", tp ? 1 : 0);
      if (tp) c.mv("tok", { x: tp[0], y: tp[1] }, { d: 1.1, e: "power2.inOut" });
      const k = s.k || ["Reported", "problem"];
      c.tx("k1", k[0] || ""); c.tx("k2", k[1] || "");
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: BOARD — the daily problem board: raised, being fixed,
// fixed and told back to staff; recurring cards; staff trust meter.
// template: Workflow Dashboard – Interactive Motion Design — https://dribbble.com/shots/27538364-Workflow-Dashboard-Interactive-Motion-Design
// template: Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD
// =====================================================================
function F_BOARD(p) {
  const f = pfx(p);
  const CX = [72, 200, 328], HD = ["Raised", "Fixing", "Fixed + told"], HC = [C.orange, C.amber, C.green];
  return {
    p, bench: "Workflow Dashboard (Dribbble) + Problem Solving Team (LottieFiles)",
    draw() {
      let s = "";
      for (let j = 0; j < 3; j++) s += R(CX[j] - 62, 40, 124, 180, "rgba(255,255,255,.75)", 10, `stroke="${HC[j]}" stroke-width="2"`) + R(CX[j] - 62, 40, 124, 26, HC[j], 10) + R(CX[j] - 62, 56, 124, 10, HC[j]) + T(CX[j], 58, HD[j], 13.5, C.white);
      for (let i = 0; i < 6; i++) s += f.H("c" + i, R(-56, -14, 112, 28, C.white, 6, `stroke="${C.slate}" stroke-width="1.6"`) + R(-56, -14, 6, 28, C.orange, 3) + f.TK("ct" + i, 3, 4.5, "", 12, C.ink));
      s += f.H("bx", O(0, 0, 11, C.red) + T(0, 4, "×3", 10, C.white));
      s += f.H("win", star(0, 0, 1));
      for (let i = 0; i < 3; i++) {
        s += person(30 + i * 30, 270, 0.85, C.green);
        s += f.H("sb" + i, R(18 + i * 30, 234, 26, 18, C.white, 6, `stroke="${C.green}" stroke-width="1.6"`) + tick(31 + i * 30, 243, 0.5, C.green, 2));
      }
      s += f.H("sx", rep(3, (i) => R(18 + i * 30, 234, 26, 18, C.white, 6, `stroke="${C.slate}" stroke-width="1.6"`) + cross(31 + i * 30, 243, 0.5, C.red, 2.2)));
      s += f.H("meg", megaI(136, 262, C.orange, 1.1));
      s += f.H("cred", T(282, 252, "Staff trust", 12.5, C.navy) + R(190, 260, 190, 14, "#e4e9ef", 7) + `<rect data-k="${p}cf" x="190" y="260" width="190" height="14" rx="7" fill="${C.green}"/>`);
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nm", 200, 236);
      return s;
    },
    render(c, s) {
      const cards = s.cards || [], cnt = [0, 0, 0], pos = [];
      for (let i = 0; i < 6; i++) {
        const cd = cards[i];
        if (!cd) { c.op("c" + i, 0); pos.push(null); continue; }
        const col = cd[1], row = cnt[col]++;
        const x = CX[col], y = 88 + row * 34;
        pos.push([x, y]);
        c.tx("ct" + i, cd[0]);
        c.op("c" + i, s.hl != null && s.hl !== i ? 0.45 : 1, { dl: i * 0.06 });
        c.mv("c" + i, { x, y, s: s.hl === i ? 1.08 : 1 }, { d: 1, e: "power2.inOut" });
      }
      const rp = s.recur != null && pos[s.recur];
      c.op("bx", rp ? 1 : 0); if (rp) c.mv("bx", { x: rp[0] + 52, y: rp[1] - 13 });
      const wp = s.win != null && pos[s.win];
      c.op("win", wp ? 1 : 0); if (wp) c.mv("win", { x: wp[0] - 50, y: wp[1] - 13, s: 1.1 }, { e: "back.out(2)" });
      for (let i = 0; i < 3; i++) c.op("sb" + i, s.told && !s.quiet ? 1 : 0, { dl: i * 0.12 });
      c.vis({ sx: s.quiet, meg: s.told, cred: s.cred != null });
      c.mv("cf", { sx: Math.max(0.02, s.cred || 0), pv: [190, 267] }, { d: 1 });
      c.fl("cf", (s.cred || 0) < 0.4 ? C.red : (s.cred || 0) < 0.7 ? C.amber : C.green);
      setNote(c, "nt", s.nt); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: CHART — a line chart that draws itself: kiosk adoption
// rising and flattening at 65 %, or exception volume against the
// designed range.
// template: Animated line chart lesson — https://observablehq.com/@d3/learn-d3-animation
// template: Growth Chart — https://lottiefiles.com/free-animation/growth-chart-MBrxgE3xfn
// =====================================================================
function F_CHART(p) {
  const f = pfx(p);
  const X = (w) => 56 + w * 28, Y = (v) => 232 - v * 1.7;
  const line = (a) => a.map((v, w) => (w ? "L" : "M") + X(w) + " " + Y(v).toFixed(1)).join(" ");
  const AD = [0, 12, 28, 40, 50, 57, 61, 64, 65, 65, 65, 65];
  const EIN = [22, 26, 24, 27, 25, 28, 26, 27, 25, 26, 27, 26];
  const EOV = [22, 27, 31, 36, 42, 47, 52, 57, 61, 64, 66, 68];
  return {
    p, bench: "Animated line chart (Observable) + Growth Chart (LottieFiles)",
    draw() {
      let s = P(`M56 58 V232 H${X(11) + 16}`, C.slate, 2);
      s += rep(12, (w) => T(X(w), 248, String(w), 11, C.slate));
      s += f.TK("xl", 214, 266, "Weeks since the pilot began", 12, C.slate);
      s += f.TK("yl", 58, 50, "Kiosk adoption %", 13, C.navy, "start");
      s += f.H("ytk", rep(3, (i) => T(48, Y(i * 50) + 4, String(i * 50), 11, C.slate, "", "end")));
      s += f.H("band", R(56, Y(32), X(11) - 46, Y(20) - Y(32), "rgba(49,124,97,.18)") + T(X(11) + 6, Y(32) - 6, "Designed range", 12, C.green, "", "end"));
      s += f.H("t100", P(`M56 ${Y(100)} H${X(11) + 10}`, C.green, 2, 'stroke-dasharray="6 5"') + T(X(11) + 10, Y(100) - 7, "100% = every arrival", 12, C.green, "", "end"));
      s += f.H("gap", R(X(7), Y(100), X(11) - X(7), Y(65) - Y(100), "rgba(192,80,42,.15)") + T((X(7) + X(11)) / 2, (Y(100) + Y(65)) / 2 + 5, "35% not on kiosk", 13, C.orange));
      s += f.D("ad", line(AD), C.navy, 4.5);
      s += f.D("ein", line(EIN), C.green, 4);
      s += f.D("eov", line(EOV), C.red, 4);
      s += f.H("ovr", F(EOV.slice(3).map((v, w) => (w ? "L" : "M") + X(w + 3) + " " + Y(v).toFixed(1)).join(" ") + ` L${X(11)} ${Y(32)} L${X(3)} ${Y(32)} Z`, "rgba(176,54,43,.14)") + T(X(7), Y(52), "Above design", 12, C.red));
      s += f.H("plat", R(X(8) - 8, Y(65) - 9, X(11) - X(8) + 16, 18, "none", 9, `stroke="${C.gold}" stroke-width="3"`) + chip(X(9.5), Y(65) + 30, "Plateau: 65%", { sz: 13, st: C.amber, fg: C.amber }));
      s += f.H("big", T(X(9.5), 206, "65%", 34, C.navy));
      s += f.H("ill", T(X(2.6), 224, "rise shape illustrative", 10.5, C.slate, "", "start"));
      s += f.H("wk", rep(11, (w) => O(X(w + 1), 232, 4.5, C.teal)) + chip(118, 82, "Reviewed weekly", { sz: 12.5, st: C.teal, fg: C.teal }));
      s += f.H("dot", O(0, 0, 7, C.orange, `stroke="${C.white}" stroke-width="2"`));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 214, 287) + noteSVG(f, "nm", 250, 186);
      return s;
    },
    render(c, s) {
      const exc = s.mode === "exc";
      c.tx("yl", exc ? "Exception volume" : "Kiosk adoption %");
      c.tx("xl", exc ? "Weeks after go-live" : "Weeks since the pilot began");
      c.op("ytk", exc ? 0 : 1);
      c.dr("ad", !exc ? (s.dr == null ? 1 : s.dr) : 0, { d: 1.4 }); c.op("ad", exc ? 0 : 1);
      c.dr("ein", exc && s.ein ? 1 : 0, { d: 1.4 }); c.dr("eov", exc && s.eov ? 1 : 0, { d: 1.4 });
      c.vis({ band: exc && s.band, t100: !exc && s.t100, gap: !exc && s.gap, plat: !exc && s.plat, big: !exc && s.big, ill: !exc && (s.dr == null || s.dr > 0.2), wk: s.wk, ovr: exc && s.ovr });
      if (s.dot != null) { const v = exc ? EOV : AD; c.op("dot", 1); c.mv("dot", { x: X(s.dot), y: Y(v[s.dot]) }, { d: 0.9 }); } else c.op("dot", 0);
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: WAFFLE — 100 pilot arrivals sort into kiosk (65) and
// reception desk (35); the desk group is examined.
// template: Sankey animation - acyclic graph — https://observablehq.com/@joaormendes/sankey-animation-acyclic-graph
// template: Stacked-to-grouped bars — https://observablehq.com/@d3/stacked-to-grouped-bars
// =====================================================================
function F_WAFFLE(p) {
  const f = pfx(p);
  const g = (i) => [18 + (i % 10) * 17, 52 + Math.floor(i / 10) * 17];
  const tgt = (i) => i < 65 ? [210 + (i % 15) * 12, 66 + Math.floor(i / 15) * 12] : [210 + ((i - 65) % 15) * 12, 186 + Math.floor((i - 65) / 15) * 12];
  return {
    p, bench: "Sankey animation (Observable) + Stacked-to-grouped bars (Observable)",
    draw() {
      let s = f.K("hd", T(100, 40, "100 pilot arrivals", 13.5, C.navy));
      s += f.H("bG", R(200, 40, 192, 104, "#eef7f1", 10, `stroke="${C.green}" stroke-width="2"`) + T(210, 58, "Kiosk", 14, C.green, "", "start") + T(384, 58, "65", 17, C.green, "", "end"));
      s += f.H("bO", R(200, 160, 192, 92, "#fbefe8", 10, `stroke="${C.orange}" stroke-width="2"`) + T(210, 178, "Reception desk", 14, C.orange, "", "start") + T(384, 178, "35", 17, C.orange, "", "end"));
      s += rep(100, (i) => { const [x, y] = g(i); return `<rect class="${p}t" data-i="${i}" data-k="${p}t" x="${x}" y="${y}" width="14" height="14" rx="3" fill="${C.grey}"/>`; });
      s += f.H("corp", chip(296, 238, "Mostly corporate bookings", { sz: 12, bg: C.orange, st: C.orange, fg: C.white }));
      s += f.H("why", magI(300, 204, 26, C.ink));
      s += f.H("q", chip(100, 262, "Approved exception?", { sz: 12.5, st: C.green, fg: C.green }) + chip(300, 268, "Informal workaround?", { sz: 12.5, st: C.red, fg: C.red, dash: 1 }));
      s += noteSVG(f, "nb", 200, 287) + noteSVG(f, "nl", 100, 238);
      return s;
    },
    render(c, s) {
      const tiles = c.all("." + p + "t");
      const col = !!s.col || !!s.sort;
      tiles.forEach((el) => {
        const i = +el.getAttribute("data-i"), orange = i >= 65;
        let fill = C.grey;
        if (col) fill = orange ? C.orange : C.green;
        let o = 1;
        if (s.dimG && !orange) o = 0.22;
        if (s.dimO && orange) o = 0.22;
        c.flEl(el, fill, { dl: s.col && !s.sort ? (i % 35) * 0.012 : 0 });
        c.opEl(el, o);
        if (s.sort) { const [a, b] = g(i), [x, y] = tgt(i); c.mvEl(el, { x: x + 5 - (a + 7), y: y + 5 - (b + 7), s: 0.72 }, { d: 1.1, dl: (orange ? (i - 65) : i) * 0.01, e: "power2.inOut" }); }
        else c.mvEl(el, {}, { d: 0.8 });
      });
      c.vis({ bG: s.sort, bO: s.sort, corp: s.corp, why: s.why, q: s.q });
      c.op("hd", s.sort ? 0.4 : 1);
      setNote(c, "nb", s.nb); setNote(c, "nl", s.nl);
    }
  };
}

// =====================================================================
// SHOT FAMILY: COMPARE — two cards side by side (a distinction the
// narration draws), each with an icon, two short lines and a verdict.
// template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
// template: Interactive AI Customer Support vs Old Way — https://lottiefiles.com/free-animation/interactive-ai-optimised-customer-support-vs-old-way-yKSecPTuwL
// =====================================================================
function F_COMPARE(p) {
  const f = pfx(p);
  const side = (k, x0, col) => {
    const cx = x0 + 89;
    let s = f.K(k + "card", R(x0, 46, 178, 192, C.white, 12, `stroke="${col}" stroke-width="2.2"`) + R(x0, 46, 178, 32, col, 12) + R(x0, 66, 178, 12, col) + f.TK(k + "t", cx, 68, "", 13.5, C.white));
    s += f.H(k + "hl", R(x0 - 4, 42, 186, 200, "none", 15, `stroke="${C.gold}" stroke-width="3.5"`));
    Object.keys(ICONS).forEach((nm) => { s += f.H(k + "i_" + nm, ICONS[nm](cx, 122)); });
    s += f.TK(k + "a", cx, 182, "", 13, C.ink) + f.TK(k + "b", cx, 200, "", 13, C.ink);
    s += markSVG(f, k + "m", cx, 222, 0.9);
    return s;
  };
  return {
    p, bench: "Comparison Chart (LottieFiles) + Customer Support vs Old Way (LottieFiles)",
    draw() {
      let s = side("L", 12, C.navy) + side("R", 210, C.orange);
      s += f.H("mid", O(200, 142, 17, C.white, `stroke="${C.ink}" stroke-width="2.4"`) + f.TK("mt", 200, 148.5, "≠", 17, C.ink));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 200, 270);
      return s;
    },
    render(c, s) {
      [["L", s.lt, s.li, s.l, s.lm], ["R", s.rt, s.ri, s.r, s.rm]].forEach(([k, t, ic, ln, m]) => {
        c.tx(k + "t", t || ""); c.tx(k + "a", (ln || [])[0] || ""); c.tx(k + "b", (ln || [])[1] || "");
        Object.keys(ICONS).forEach((nm) => c.op(k + "i_" + nm, nm === ic ? 1 : 0));
        setMark(c, k + "m", m || "");
        const on = !s.hl || s.hl === k.toLowerCase();
        c.op(k + "card", on ? 1 : 0.4);
        c.op(k + "hl", s.hl === k.toLowerCase() ? 1 : 0);
        c.mv(k + "card", s.hl === k.toLowerCase() ? { s: 1.03 } : {});
      });
      c.op("mid", s.mid === "" ? 0 : 1); c.tx("mt", s.mid || "≠");
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: BARS — horizontal bars to true scale with values and
// "?" where the case gives no number.
// template: Bar chart transitions — https://observablehq.com/@d3/bar-chart-transitions/2
// template: Infographic Chart Creator — https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/
// =====================================================================
function F_BARS(p) {
  const f = pfx(p);
  const BC = { g: C.green, o: C.orange, n: C.navy, p: C.plum, s: C.slate, r: C.red, t: C.teal };
  return {
    p, bench: "Bar chart transitions (Observable) + Infographic Chart Creator (Motion Array)",
    draw() {
      let s = f.TK("ti", 200, 36, "", 14, C.navy);
      for (let i = 0; i < 5; i++) {
        const y = 74 + i * 42;
        s += f.H("r" + i, f.TK("l" + i, 20, y - 6, "", 13, C.ink, "start") + R(20, y, 300, 20, "#e8edf2", 5) +
          `<rect data-k="${p}b${i}" x="20" y="${y}" width="300" height="20" rx="5" fill="${C.navy}"/>` + f.TK("v" + i, 330, y + 15.5, "", 15, C.ink, "start") + markSVG(f, "m" + i, 384, y + 10, 0.85));
      }
      s += noteSVG(f, "nb", 200, 286) + noteSVG(f, "nm", 200, 252);
      return s;
    },
    render(c, s) {
      c.tx("ti", s.ti || "");
      const rows = s.rows || [], mx = s.max || Math.max(1, ...rows.map((r) => r[1] || 0));
      for (let i = 0; i < 5; i++) {
        const r = rows[i];
        c.op("r" + i, r ? 1 : 0, { dl: i * 0.08 });
        if (!r) continue;
        c.tx("l" + i, r[0]); c.tx("v" + i, r[3] != null ? r[3] : String(r[1]));
        c.fl("b" + i, BC[r[2]] || C.navy);
        c.mv("b" + i, { sx: Math.max(0.01, (r[1] || 0) / mx), pv: [20, 84 + i * 42] }, { d: 1.1, dl: i * 0.1 });
        setMark(c, "m" + i, r[4] || "");
      }
      setNote(c, "nb", s.nb); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: GAUGE — a dial with a needle: guest satisfaction out of
// ten, or occupancy with the 90 % danger band.
// template: Customer satisfaction — https://lottiefiles.com/free-animation/customer-satisfaction-zfm0C8rzLz
// template: Arc tween — https://observablehq.com/@d3/arc-tween
// =====================================================================
function F_GAUGE(p) {
  const f = pfx(p);
  const pt = (fr, r) => [200 - r * Math.cos(Math.PI * fr), 196 - r * Math.sin(Math.PI * fr)];
  const arc = (a, b, r) => { const [x0, y0] = pt(a, r), [x1, y1] = pt(b, r); return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`; };
  return {
    p, bench: "Customer satisfaction (LottieFiles) + Arc tween (Observable)",
    draw() {
      let s = P(arc(0, 1, 112), "#e3e8ee", 22);
      s += f.H("sat", P(arc(0, 0.6, 112), "#f3d9cc", 22) + P(arc(0.6, 0.8, 112), "#f4e7c9", 22) + P(arc(0.8, 1, 112), "#d5ebdf", 22) +
        rep(6, (i) => { const [x, y] = pt(i / 5, 140); return T(x, y + 5, String(i * 2), 13, C.slate); }));
      s += f.H("occ", P(arc(0.9, 1, 112), "#f0c4bc", 22) + rep(3, (i) => { const [x, y] = pt(i / 2, 140); return T(x, y + 5, ["0%", "50%", "100%"][i], 13, C.slate); }) +
        (() => { const [x, y] = pt(0.9, 140); return T(x - 4, y - 2, "90%", 13, C.red); })());
      s += f.H("g0", P("M200 196 V96", C.slate, 3, 'stroke-dasharray="5 4"'));
      s += f.K("nd", P("M200 196 V92", C.ink, 5) + F("M194 104 L200 86 L206 104 Z", C.ink));
      s += O(200, 196, 11, C.ink);
      s += f.TK("big", 200, 248, "", 36, C.navy);
      s += noteSVG(f, "nL", 82, 236, 13) + noteSVG(f, "nR", 318, 236, 13) + noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 200, 284);
      return s;
    },
    render(c, s) {
      const occ = s.mode === "occ";
      c.op("sat", occ ? 0 : 1); c.op("occ", occ ? 1 : 0);
      const fr = (v) => clamp(occ ? v / 100 : v / 10, 0, 1);
      c.mv("nd", { r: -90 + 180 * fr(s.v || 0), pv: [200, 196] }, { d: 1.4, e: "power2.inOut" });
      c.op("g0", s.v0 != null ? 1 : 0); c.mv("g0", { r: -90 + 180 * fr(s.v0 || 0), pv: [200, 196] }, { d: 0.01 });
      c.tx("big", s.big || "");
      c.fl("big", s.bigc === "r" ? C.red : s.bigc === "g" ? C.green : C.navy);
      setNote(c, "nL", s.nL); setNote(c, "nR", s.nR); setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}


// =====================================================================
// SHOT FAMILY: MAP — Qasr's fourteen properties in their four groups
// (2 pilots, 5 standard, 3 heritage, 4 peak occupancy) with marks,
// wave labels, support levels and copied limitations.
// template: Animated treemap — https://observablehq.com/@d3/animated-treemap
// template: World map with logistics — https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy
// =====================================================================
function F_MAP(p) {
  const f = pfx(p);
  const HX = [40, 80, 146, 198, 250, 302, 354, 52, 104, 156, 236, 282, 328, 372];
  const HY = (i) => (i < 7 ? 88 : 184);
  const GRP = (i) => (i < 2 ? "pil" : i < 7 ? "std" : i < 10 ? "her" : "peak");
  const GC = { pil: C.green, std: C.navy, her: C.plum, peak: C.orange };
  const ZB = { pil: [12, 40, 96, 84, "PILOTS"], std: [116, 40, 276, 84, "STANDARD ×5"], her: [12, 136, 184, 84, "HERITAGE ×3"], peak: [204, 136, 188, 84, "PEAK >90% ×4"] };
  return {
    p, bench: "Animated treemap (Observable) + World map with logistics (LottieFiles)",
    draw() {
      let s = "";
      Object.keys(ZB).forEach((g) => { const [x, y, w, h, l] = ZB[g]; s += f.H("z_" + g, R(x, y, w, h, "rgba(255,255,255,.7)", 10, `stroke="${GC[g]}" stroke-width="2"`) + T(x + 8, y + 16, l, 12, GC[g], "", "start")); });
      s += f.H("trv", P("M60 40 Q150 4 250 38", C.green, 2.4, 'stroke-dasharray="5 5"') + P("M44 124 Q46 134 70 140", C.green, 2.4, 'stroke-dasharray="5 5"') + P("M96 124 Q200 128 290 138", C.green, 2.4, 'stroke-dasharray="5 5"') +
        [[156, 20], [52, 134], [200, 129]].map(([x, y]) => O(x, y, 9, C.white, `stroke="${C.orange}" stroke-width="2"`) + T(x, y + 4.5, "?", 12, C.orange)).join(""));
      for (let i = 0; i < 14; i++) {
        const x = HX[i], y = HY(i), col = GC[GRP(i)];
        s += f.K("h" + i, house(x, y, col, 1.2));
        s += f.H("s" + i, R(x - 13, y + 22, 26, 6, "#e4e9ef", 3) + `<rect data-k="${p}sb${i}" x="${x - 13}" y="${y + 22}" width="26" height="6" rx="3" fill="${C.green}"/>`);
        s += f.TK("w" + i, x, y + 34, "", 11.5, C.ink);
        s += markSVG(f, "m" + i, x + 14, y - 16, 0.62);
        s += f.H("cp" + i, O(x - 14, y - 16, 7, C.red) + T(x - 14, y - 12, "!", 10, C.white));
      }
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nm", 200, 250) + noteSVG(f, "nb", 200, 284);
      return s;
    },
    render(c, s) {
      const lit = s.lit || null;
      Object.keys(ZB).forEach((g) => c.op("z_" + g, s.grp ? (lit && lit.indexOf(g) < 0 ? 0.3 : 1) : 0, { dl: s.grp ? 0.1 : 0 }));
      c.op("trv", s.trv ? 1 : 0);
      for (let i = 0; i < 14; i++) {
        const g = GRP(i), on = !lit || lit.indexOf(g) >= 0;
        c.op("h" + i, on ? 1 : 0.25, { dl: i * 0.03 });
        c.mv("h" + i, on && s.pop ? { s: 1.12 } : {}, { e: "back.out(2)" });
        setMark(c, "m" + i, (s.mkH && s.mkH[i]) || (s.mk && s.mk[g]) || "");
        c.tx("w" + i, (s.wave && s.wave[g]) || "");
        const sv = s.sup ? s.sup[i] : null;
        c.op("s" + i, sv != null ? 1 : 0);
        c.mv("sb" + i, { sx: Math.max(0.03, sv || 0), pv: [HX[i] - 13, HY(i) + 25] }, { d: 1, dl: i * 0.05 });
        c.fl("sb" + i, (sv || 0) < 0.4 ? C.red : (sv || 0) < 0.7 ? C.amber : C.green);
        c.op("cp" + i, s.copy && i >= 2 ? 1 : 0, { dl: (i - 2) * 0.07 });
      }
      setNote(c, "nt", s.nt); setNote(c, "nm", s.nm); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: ARCH — the process architecture: one arrival process,
// its standard kiosk route and the registered assisted variant for
// heritage lobbies; an unregistered local workaround stays outside.
// template: Hierarchy traversal animated — https://old.observablehq.com/@d3/hierarchy-traversal-animated
// template: The Process Architectural Motion — https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion
// =====================================================================
function F_ARCH(p) {
  const f = pfx(p);
  return {
    p, bench: "Hierarchy traversal (Observable) + The Process Architectural Motion (Behance)",
    draw() {
      let s = K(p + "root", R(120, 32, 160, 40, C.navy, 10) + T(200, 57, "Arrival process", 14, C.white));
      s += f.H("lock", lockI(296, 54, C.navy, 1) + T(312, 58, "Preserved", 12, C.navy, "", "start"));
      s += f.D("e1", "M170 72 C170 100 110 96 110 122", C.green, 3) + f.D("e2", "M230 72 C230 100 290 96 290 122", C.plum, 3);
      s += f.H("std", R(30, 122, 160, 42, C.white, 10, `stroke="${C.green}" stroke-width="2.2"`) + T(110, 140, "Standard route", 13, C.green) + T(110, 157, "kiosk + assisted", 11.5, C.slate));
      s += f.H("var", R(210, 122, 160, 42, C.white, 10, `stroke="${C.plum}" stroke-width="2.2"`) + T(290, 140, "Approved variant", 13, C.plum) + T(290, 157, "assisted, no kiosk", 11.5, C.slate));
      s += f.H("reg", chip(342, 118, "Registered", { sz: 11.5, bg: C.plum, st: C.plum, fg: C.white }));
      s += f.H("ps", rep(5, (i) => house(50 + i * 30, 196, C.navy, 0.85)) + T(110, 228, "Pilots, standard, peak", 11.5, C.slate));
      s += f.H("pv", rep(3, (i) => house(250 + i * 40, 196, C.plum, 0.85)) + T(290, 228, "3 heritage properties", 11.5, C.plum));
      s += f.H("prep", chip(290, 190, "Procedures", { sz: 12, st: C.plum, fg: C.plum }) + chip(290, 214, "Responsibilities", { sz: 12, st: C.plum, fg: C.plum }) + chip(290, 238, "Training", { sz: 12, st: C.plum, fg: C.plum }));
      s += markSVG(f, "pm0", 362, 190, 0.6) + markSVG(f, "pm1", 362, 214, 0.6) + markSVG(f, "pm2", 362, 238, 0.6);
      s += f.H("wa", R(222, 246, 170, 34, "rgba(255,255,255,.85)", 8, `stroke="${C.red}" stroke-width="2.2" stroke-dasharray="5 4"`) + T(307, 268, "Local workaround", 13, C.red));
      s += f.H("waX", cross(380, 252, 1.1, C.red, 3.4));
      s += f.H("rd", rep(3, (i) => P(`M${44 + i * 46} 250 q8 -12 16 0 t16 0`, C.red, 2.6) + cross(60 + i * 46, 250, 0.7, C.red, 2.6)) + T(110, 278, "Each site its own way?", 12, C.red));
      s += noteSVG(f, "nb", 200, 286) + noteSVG(f, "nt", 200, 16);
      return s;
    },
    render(c, s) {
      c.dr("e1", s.tr ? 1 : 0); c.dr("e2", s.tr && s.vr ? 1 : 0, { dl: 0.2 });
      c.vis({ std: s.tr, var: s.vr, reg: s.reg, ps: s.ps && !s.rd, pv: s.pv && !s.prep, prep: s.prep, wa: s.wa, waX: s.waX, rd: s.rd, lock: s.lock });
      c.mv("reg", s.reg ? { s: 1 } : { s: 1.6 }, { e: "back.out(2)" });
      for (let i = 0; i < 3; i++) setMark(c, "pm" + i, s.prep ? ((s.pmk || [])[i] || "") : "");
      c.op("std", s.tr ? (s.hl === "var" ? 0.4 : 1) : 0); c.op("var", s.vr ? (s.hl === "std" ? 0.4 : 1) : 0);
      setNote(c, "nb", s.nb); setNote(c, "nt", s.nt);
    }
  };
}

// =====================================================================
// SHOT FAMILY: GANTT — October to January: eight rollout weeks, the
// three-week buffer, the 1 January deadline, readiness gates, a failed
// week 8 and its recovery eating the buffer.
// template: Project TimeLine — https://motionarray.com/after-effects-templates/project-timeline-2424919/
// template: Roadmap / Project schedule — https://lottiefiles.com/free-animation/roadmapproject-schedule-krKjaLHUr0
// =====================================================================
function F_GANTT(p) {
  const f = pfx(p);
  const X = (i) => 24 + i * 28;
  const WC = { n: C.navy, g: C.green, p: C.plum, o: C.orange, s: C.slate, r: C.red };
  return {
    p, bench: "Project TimeLine (Motion Array) + Roadmap / Project schedule (LottieFiles)",
    draw() {
      let s = R(24, 44, 84, 20, "#e6edf4", 3) + T(66, 58, "Oct", 12, C.slate) + R(108, 44, 112, 20, "#f2eee5", 3) + T(164, 58, "Nov", 12, C.slate) +
        R(220, 44, 112, 20, "#e6edf4", 3) + T(276, 58, "Dec", 12, C.slate) + R(332, 44, 60, 20, "#f6e2de", 3) + T(362, 58, "Jan", 12, C.red);
      s += f.H("pk", R(334, 66, 58, 140, "rgba(176,54,43,.10)") + T(363, 152, "Peak", 12, C.red) + T(363, 168, ">90%", 12, C.red));
      for (let i = 0; i < 8; i++) {
        s += K(p + "w" + i, R(X(i), 80, 26, 30, C.white, 4, `stroke="${C.slate}" stroke-width="1.4"`));
        s += f.H("wf" + i, `<rect data-k="${p}wr${i}" x="${X(i)}" y="80" width="26" height="30" rx="4" fill="${C.navy}"/>` + T(X(i) + 13, 100, String(i + 1), 13, C.white));
      }
      s += f.H("buf", rep(3, (k) => R(X(8 + k), 80, 26, 30, "#eef0f3", 4, `stroke="${C.slate}" stroke-width="1.2" stroke-dasharray="3 3"`) + P(`M${X(8 + k) + 4} 106 l18 -22 M${X(8 + k) + 4} 94 l9 -11`, C.muted, 1.4)) + chip(X(9) + 13, 128, "3-week buffer", { sz: 12, st: C.slate, fg: C.slate }));
      s += f.H("gt", rep(3, (k) => { const x = X([0, 3, 6][k]) + 2; return F(`M${x} 64 L${x + 7} 71 L${x} 78 L${x - 7} 71 Z`, C.gold, `stroke="${C.amber}" stroke-width="1.4"`); }));
      s += f.H("wv", R(X(0), 146, 82, 28, C.green, 6) + T(X(0) + 41, 165, "Standard ×5", 11.5, C.white) +
        R(X(3), 146, 82, 28, "rgba(107,78,138,.14)", 6, `stroke="${C.plum}" stroke-width="1.8" stroke-dasharray="4 3"`) + T(X(3) + 41, 165, "Heritage ×3", 11.5, C.plum) +
        R(X(6), 146, 54, 28, "rgba(192,80,42,.12)", 6, `stroke="${C.orange}" stroke-width="1.8" stroke-dasharray="4 3"`) + T(X(6) + 27, 165, "Peak ×4", 11.5, C.orange));
      s += f.H("wvq", O(X(6) + 52, 146, 9, C.white, `stroke="${C.orange}" stroke-width="2"`) + T(X(6) + 52, 150.5, "?", 12, C.orange) + O(X(3) + 80, 146, 9, C.white, `stroke="${C.plum}" stroke-width="2"`) + T(X(3) + 80, 150.5, "?", 12, C.plum));
      s += f.H("fx", R(X(7), 80, 26, 30, C.red, 4) + cross(X(7) + 13, 95, 0.9, C.white, 3));
      s += f.H("rcg", `<rect data-k="${p}rc" x="${X(8)}" y="84" width="1" height="22" rx="3" fill="${C.orange}" opacity=".9"/>` + T(X(8) + 4, 100, "recovery", 11, C.white, "", "start"));
      s += f.H("ovf", chip(352, 190, "Past 1 Jan", { sz: 12, bg: C.red, st: C.red, fg: C.white }));
      s += f.H("dl", P("M332 40 V206", C.red, 3) + chip(326, 222, "1 Jan deadline", { sz: 12.5, bg: C.red, st: C.red, fg: C.white }));
      s += noteSVG(f, "nt", 180, 22) + noteSVG(f, "nq", 180, 200) + noteSVG(f, "nm", 180, 252) + noteSVG(f, "nb", 200, 284);
      return s;
    },
    render(c, s) {
      const wk = s.wk == null ? 8 : s.wk;
      for (let i = 0; i < 8; i++) {
        c.op("wf" + i, i < wk ? 1 : 0, { dl: i * 0.07 });
        c.fl("wr" + i, WC[(s.wc || [])[i]] || C.navy);
      }
      c.vis({ buf: s.buf, gt: s.gt, wv: s.wv, wvq: s.wv && s.wvq, fx: s.fail, dl: s.dl, pk: s.pk, ovf: s.ovf });
      c.op("rcg", s.rec ? 1 : 0);
      c.mv("rc", { sx: Math.max(1, (s.rec || 0) * 28), pv: [X(8), 95] }, { d: 1.2, dl: 0.3 });
      setNote(c, "nt", s.nt); setNote(c, "nq", s.nq); setNote(c, "nm", s.nm); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: GATE — the go / no-go gate: criteria agreed in advance
// (technical and operational), a named decision owner, a fixed date,
// a recorded waiver, and the pressure of the schedule.
// template: Approved Seal — https://lottiefiles.com/free-animation/approved-seal-seal-approval-loader-6o8fKZVBbx
// template: Checklist — https://lottiefiles.com/free-animation/checklist-c1qt4p98BW
// =====================================================================
function F_GATE(p) {
  const f = pfx(p);
  return {
    p, bench: "Approved Seal + Checklist (LottieFiles)",
    draw() {
      let s = f.K("brd", R(12, 40, 228, 214, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + R(12, 40, 228, 28, C.navy, 10) + R(12, 58, 228, 10, C.navy) + f.TK("ti", 126, 59, "Go / no-go criteria", 13.5, C.white));
      for (let i = 0; i < 6; i++) {
        const y = 92 + i * 25;
        s += f.H("r" + i, f.H("dt" + i, O(26, y - 4, 5, C.navy)) + f.H("do" + i, O(26, y - 4, 5, C.green)) + f.TK("t" + i, 38, y, "", 12.5, C.ink, "start") + markSVG(f, "m" + i, 222, y - 4, 0.72));
      }
      s += f.H("leg", O(26, 240, 5, C.navy) + T(36, 244, "Technical", 11.5, C.navy, "", "start") + O(120, 240, 5, C.green) + T(130, 244, "Operational", 11.5, C.green, "", "start"));
      s += R(250, 92, 8, 142, C.ink, 2) + R(384, 92, 8, 142, C.ink, 2) + R(244, 232, 154, 6, C.slate, 2);
      s += f.K("dL", R(259, 100, 62, 128, "#d9e4ee", 3, `stroke="${C.navy}" stroke-width="2"`) + P("M272 112 V216 M290 112 V216 M308 112 V216", C.muted, 2));
      s += f.K("dR", R(321, 100, 62, 128, "#d9e4ee", 3, `stroke="${C.navy}" stroke-width="2"`) + P("M334 112 V216 M352 112 V216 M370 112 V216", C.muted, 2));
      s += f.H("shut", R(254, 158, 134, 12, C.red, 4));
      s += R(262, 66, 120, 26, C.white, 6, `stroke="${C.navy}" stroke-width="2"`) + f.TK("sg", 322, 84, "GO / NO-GO", 13.5, C.navy);
      s += f.H("dm", person(262, 272, 0.95, C.navy) + chip(336, 270, "Decision owner", { sz: 12 }));
      s += f.H("date", calI(376, 40, C.navy, 1, "") + T(358, 45, "Date fixed", 12, C.navy, "", "end"));
      s += f.H("pre", `<g transform="rotate(-6 176 32)">${chip(176, 32, "Agreed in advance", { sz: 12, bg: C.green, st: C.green, fg: C.white })}</g>`);
      s += f.H("wv", R(26, 74, 200, 168, "#fffaf0", 8, `stroke="${C.amber}" stroke-width="2.4"`) + R(26, 74, 200, 26, C.amber, 8) + R(26, 90, 200, 10, C.amber) + T(126, 93, "WAIVER RECORD", 13, C.white) +
        T(38, 122, "Unmet condition", 11.5, C.amber, "", "start") + f.TK("w1", 38, 140, "", 12.5, C.ink, "start") + T(38, 166, "Why proceed anyway", 11.5, C.amber, "", "start") + f.TK("w2", 38, 184, "", 12.5, C.ink, "start") +
        T(38, 210, "Accepted by", 11.5, C.amber, "", "start") + f.TK("w3", 38, 228, "", 12.5, C.ink, "start"));
      s += f.H("party", rep(12, (i) => R(262 + (i * 37) % 120, 104 + (i * 53) % 100, 7, 4, [C.gold, C.orange, C.green, C.plum][i % 4], 1, `transform="rotate(${i * 31} ${266 + (i * 37) % 120} ${106 + (i * 53) % 100})"`)) + chip(322, 140, "Celebrate?", { sz: 13, st: C.amber, fg: C.amber }));
      s += f.H("partyX", cross(322, 140, 1.6, C.red, 4));
      s += f.H("push", P("M150 22 C214 22 236 44 252 74", C.orange, 3.4, 'class="a-flow"') + F("M246 70 L256 80 L258 66 Z", C.orange));
      s += noteSVG(f, "nt", 200, 20) + noteSVG(f, "nb", 200, 286);
      return s;
    },
    render(c, s) {
      c.tx("ti", s.t || "Go / no-go criteria");
      const it = s.items || [];
      for (let i = 0; i < 6; i++) {
        const r = it[i];
        c.op("r" + i, r ? 1 : 0, { dl: i * 0.08 });
        if (!r) { setMark(c, "m" + i, ""); continue; }
        c.tx("t" + i, r[0]); c.op("dt" + i, r[1] ? 0 : 1); c.op("do" + i, r[1] ? 1 : 0);
        setMark(c, "m" + i, r[2] || "");
      }
      c.op("leg", it.length ? 1 : 0);
      const open = !!s.open;
      c.mv("dL", { sx: open ? 0.12 : 1, pv: [259, 164] }, { d: 1.1 }); c.mv("dR", { sx: open ? 0.12 : 1, pv: [383, 164] }, { d: 1.1 });
      c.op("shut", s.shut ? 1 : 0);
      c.tx("sg", s.sign || "GO / NO-GO"); c.fl("sg", s.sign === "GO" ? C.green : s.sign === "NO-GO" || s.sign === "HOLD" ? C.red : C.navy);
      c.vis({ dm: s.dm, date: s.date, pre: s.pre, wv: s.wv, party: s.party, partyX: s.partyX, push: s.push });
      c.op("brd", s.wv ? 0.5 : 1);
      c.tx("w1", s.w1 || ""); c.tx("w2", s.w2 || ""); c.tx("w3", s.w3 || "");
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: REHEARSE — the only rollback rehearsal: 11 hours at
// Marina, no live corporate bookings; records already made in the new
// process must travel back safely.
// template: 5s countdown — https://lottiefiles.com/free-animation/5s-countdown-XZv1P0rDCu
// template: Git Workflow 1 — https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5
// =====================================================================
function F_REHEARSE(p) {
  const f = pfx(p);
  return {
    p, bench: "5s countdown + Git Workflow 1 (LottieFiles)",
    draw() {
      let s = O(100, 140, 60, C.white, `stroke="#e3e8ee" stroke-width="12"`);
      s += rep(12, (i) => { const a = i * Math.PI / 6; return P(`M${100 + 46 * Math.sin(a)} ${140 - 46 * Math.cos(a)} L${100 + 40 * Math.sin(a)} ${140 - 40 * Math.cos(a)}`, C.slate, i % 3 ? 1.4 : 2.6); });
      s += f.D("arc", "M100 80 A60 60 0 1 1 99.9 80", C.plum, 12);
      s += f.TK("hh", 100, 151, "", 30, C.plum);
      s += f.K("ml", T(100, 222, "Marina rehearsal", 13, C.navy) + house(100, 246, C.green, 0.9));
      s += f.H("cov", R(196, 50, 196, 150, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + R(196, 50, 196, 26, C.navy, 10) + R(196, 66, 196, 10, C.navy) + T(294, 68, "What the test covered", 12.5, C.white) +
        rep(3, (i) => f.TK("ct" + i, 208, 104 + i * 34, "", 12.5, C.ink, "start") + markSVG(f, "cm" + i, 372, 100 + i * 34, 0.8)));
      s += f.H("old", R(12, 248, 104, 40, C.white, 8, `stroke="${C.green}" stroke-width="2"`) + T(64, 273, "Previous way", 12.5, C.green));
      s += markSVG(f, "om", 112, 248, 0.7);
      s += f.H("new", R(286, 248, 106, 40, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + T(339, 273, "New process", 12.5, C.navy));
      s += f.H("lane", P("M118 268 H284", C.slate, 2, 'stroke-dasharray="4 5"'));
      for (let i = 0; i < 3; i++) s += f.H("rc" + i, R(-12, -9, 24, 18, C.white, 3, `stroke="${C.orange}" stroke-width="1.8"`) + P("M-7 -3 H7 M-7 3 H4", C.orange, 1.6));
      s += f.H("cf", O(200, 244, 10, C.red) + T(200, 248.5, "!", 13, C.white));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "no", 100, 44, 13) + noteSVG(f, "nm", 294, 222);
      return s;
    },
    render(c, s) {
      c.dr("arc", s.arc || 0, { d: 1.6 });
      c.tx("hh", s.hh || "");
      c.op("ml", s.ml === 0 ? 0 : 1);
      c.op("cov", s.cov ? 1 : 0);
      const rows = s.rows || [];
      for (let i = 0; i < 3; i++) { c.tx("ct" + i, rows[i] || ""); setMark(c, "cm" + i, s.cov ? ((s.mk || [])[i] || "") : ""); }
      const rb = !!s.recs;
      c.vis({ old: rb || s.old, new: rb || s.old, lane: rb, cf: s.conf });
      setMark(c, "om", s.om || "");
      for (let i = 0; i < 3; i++) {
        c.op("rc" + i, rb ? 1 : 0);
        let x = 304 + i * 30, y = 268;
        if (s.back) { x = s.conf && i === 1 ? 200 : 30 + i * 30; }
        c.mv("rc" + i, { x, y }, { d: 1.3, dl: i * 0.2, e: "power2.inOut" });
      }
      c.cl("rc1", "a-shake", !!s.conf);
      setNote(c, "nt", s.nt); setNote(c, "no", s.no); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: TRIGGER — a numerical stop / rollback trigger: backlog
// gauge with a proposed threshold, two distinct actions, named decision
// rights, and the point after which rollback is no longer possible.
// template: Health risk assessment — https://lottiefiles.com/free-animation/health-risk-assessment-bOhC3au0wY
// template: Wrong feedback — https://lottiefiles.com/free-animation/wrong-feedback-s8Ijly21K0
// =====================================================================
function F_TRIGGER(p) {
  const f = pfx(p);
  return {
    p, bench: "Health risk assessment + Wrong feedback (LottieFiles)",
    draw() {
      let s = T(64, 28, "Unresolved", 12, C.navy) + T(64, 42, "exceptions", 12, C.navy);
      s += R(46, 52, 36, 176, C.white, 18, `stroke="${C.slate}" stroke-width="2.5"`) + O(64, 236, 22, C.white, `stroke="${C.slate}" stroke-width="2.5"`) + O(64, 236, 16, C.orange);
      s += rep(5, (i) => P(`M84 ${70 + i * 34} H92`, C.slate, 1.6));
      s += `<rect data-k="${p}lv" x="52" y="58" width="24" height="176" rx="12" fill="${C.orange}"/>`;
      s += f.H("th", P("M36 130 H98", C.red, 3, 'stroke-dasharray="6 4"') + chip(150, 130, "Proposed trigger", { sz: 12, st: C.red, fg: C.red }) + T(150, 152, "not yet approved", 11, C.amber));
      s += f.H("vg", cloudI(150, 92) + T(150, 96, "Feels bad?", 11, C.slate));
      s += f.H("vgX", cross(150, 92, 1.8, C.red, 4));
      s += f.K("ps", R(214, 50, 178, 84, C.white, 10, `stroke="${C.red}" stroke-width="2"`) + barrierI(244, 82, 0.85) + T(274, 80, "STOP", 15, C.red, "", "start") + T(274, 98, "the next wave", 12, C.ink, "", "start") + f.TK("ws", 228, 124, "", 12, C.slate, "start"));
      s += f.K("pr", R(214, 146, 178, 84, C.white, 10, `stroke="${C.plum}" stroke-width="2"`) + undoI(244, 182, C.plum, 1) + T(274, 176, "ROLL BACK", 15, C.plum, "", "start") + T(274, 194, "a live site", 12, C.ink, "", "start") + f.TK("wr", 228, 220, "", 12, C.slate, "start"));
      s += f.H("hS", R(210, 46, 186, 92, "none", 13, `stroke="${C.gold}" stroke-width="3.5" class="a-pulse"`));
      s += f.H("hR", R(210, 142, 186, 92, "none", 13, `stroke="${C.gold}" stroke-width="3.5" class="a-pulse"`));
      s += f.H("kS", keyI(360, 114, C.amber, 1)) + f.H("kR", keyI(360, 210, C.amber, 1));
      s += f.H("rX", cross(303, 188, 3, C.red, 5));
      s += f.H("pnr", P("M110 262 H392", C.slate, 3) + P("M300 252 V272", C.red, 3) + T(300, 246, "No return", 12, C.red));
      s += f.H("mk", O(0, 262, 8, C.navy, `stroke="${C.white}" stroke-width="2"`));
      s += f.H("wait", rep(3, (i) => buddy(132 + i * 26, 254, 10, C.navy2)) + clockI(212, 248, 10, C.red));
      s += noteSVG(f, "nt", 240, 22) + noteSVG(f, "nb", 240, 286);
      return s;
    },
    render(c, s) {
      const lv = clamp(s.lv == null ? 0.3 : s.lv, 0.02, 1);
      c.mv("lv", { sy: lv, pv: [64, 234] }, { d: 1.2 });
      c.fl("lv", s.th != null && lv >= s.th ? C.red : C.orange);
      c.op("th", s.th != null ? 1 : 0); c.mv("th", { y: s.th != null ? (234 - s.th * 176) - 130 : 0 }, { d: 0.9 });
      c.vis({ vg: s.vg, vgX: s.vgX, hS: s.hl === "s", hR: s.hl === "r", kS: s.whoS === "ok", kR: s.whoR === "ok", rX: s.past, pnr: s.pnr, mk: s.pnr, wait: s.wait });
      c.op("ps", s.ps === 0 ? 0.25 : 1); c.op("pr", s.pr === 0 ? 0.25 : 1);
      c.tx("ws", s.whoS === "ok" ? "Decided by: named" : s.whoS === "q" ? "Decided by: ?" : "");
      c.tx("wr", s.whoR === "ok" ? "Decided by: named" : s.whoR === "q" ? "Decided by: ?" : "");
      c.mv("mk", { x: 110 + (s.pos || 0) * 282 }, { d: 1.2 });
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: CHECK — a titled checklist that ticks itself.
// template: Checklist — https://lottiefiles.com/free-animation/checklist-c1qt4p98BW
// template: Success — https://lottiefiles.com/free-animation/success-he8DVHwbzM
// =====================================================================
function F_CHECK(p) {
  const f = pfx(p);
  return {
    p, bench: "Checklist + Success (LottieFiles)",
    draw() {
      let s = R(36, 34, 328, 230, C.white, 12, `stroke="${C.navy}" stroke-width="2"`) + R(36, 34, 328, 30, C.navy, 12) + R(36, 52, 328, 12, C.navy) + f.TK("ti", 200, 55, "", 14, C.white);
      s += f.H("hl", R(44, 0, 312, 28, "rgba(229,183,108,.32)", 6));
      for (let i = 0; i < 6; i++) {
        const y = 92 + i * 30;
        s += f.H("r" + i, O(62, y - 5, 11, C.navy) + T(62, y - 0.5, String(i + 1), 12, C.white) + f.TK("t" + i, 82, y, "", 13.5, C.ink, "start") + markSVG(f, "m" + i, 338, y - 5, 0.8));
      }
      s += `<g transform="rotate(-6 290 250)">${noteSVG(f, "st", 290, 250, 13)}</g>`;
      s += noteSVG(f, "nb", 200, 286);
      return s;
    },
    render(c, s) {
      c.tx("ti", s.t || "");
      const it = s.items || [];
      for (let i = 0; i < 6; i++) {
        c.op("r" + i, it[i] ? (s.dimTo != null && i > s.dimTo ? 0.35 : 1) : 0, { dl: i * 0.08 });
        c.tx("t" + i, it[i] || "");
        setMark(c, "m" + i, it[i] ? ((s.mk || [])[i] || "") : "");
      }
      c.op("hl", s.hl != null ? 1 : 0); c.mv("hl", { y: 92 + (s.hl || 0) * 30 - 20 }, { d: 0.6 });
      setNote(c, "st", s.st); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: HAND — handover from the project team to operations:
// ownership, measures, exceptions, procedures and defects travel across;
// the project team can leave only when nothing depends on it.
// template: teamwork — https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6
// template: Business Solution conveyor — https://lottiefiles.com/free-animation/business-solution-pNyNfkcRsa
// =====================================================================
function F_HAND(p) {
  const f = pfx(p);
  const IT = [["Ownership", C.navy], ["Measures", C.teal], ["Exceptions", C.orange], ["Procedures", C.green], ["Defects", C.red]];
  return {
    p, bench: "teamwork + Business Solution conveyor (LottieFiles)",
    draw() {
      let s = R(10, 40, 146, 192, "rgba(255,255,255,.6)", 12, `stroke="${C.plum}" stroke-width="2" stroke-dasharray="6 4"`) + T(83, 60, "Project team", 13.5, C.plum);
      s += R(244, 40, 148, 192, "rgba(255,255,255,.75)", 12, `stroke="${C.green}" stroke-width="2.2"`) + T(318, 60, "Operations", 13.5, C.green);
      s += R(156, 206, 88, 10, C.slate, 5) + rep(4, (i) => O(168 + i * 21, 211, 3, C.white));
      s += f.K("pt", person(46, 214, 1, C.plum) + person(83, 214, 1, C.plum) + person(120, 214, 1, C.plum));
      s += person(278, 214, 1.1, C.green) + person(320, 214, 1, C.navy2) + person(358, 214, 1, C.navy2);
      IT.forEach(([l, col], i) => { s += f.H("i" + i, R(-44, -10, 88, 20, C.white, 10, `stroke="${col}" stroke-width="2"`) + T(0, 4.5, l, 12, col)); });
      s += f.H("hl", R(-50, -14, 100, 28, "none", 13, `stroke="${C.gold}" stroke-width="3" class="a-pulse"`));
      s += f.H("stk", P("M322 186 C262 150 160 150 118 186", C.orange, 2.6, 'class="a-flow"') + O(340, 178, 9, C.white, `stroke="${C.orange}" stroke-width="2"`) + T(340, 182.5, "?", 12, C.orange));
      s += f.H("onm", R(252, 240, 132, 30, "#eef0f3", 6, `stroke="${C.slate}" stroke-width="1.8" stroke-dasharray="4 3"`) + T(318, 260, "Owner: name only", 12, C.slate));
      s += f.H("oac", `<g class="a-spin">${gearI(298, 182, 10, C.amber, C.white)}</g>` + chip(318, 256, "Active owner", { sz: 12, bg: C.green, st: C.green, fg: C.white }));
      s += noteSVG(f, "nt", 200, 20) + noteSVG(f, "nb", 200, 287);
      return s;
    },
    render(c, s) {
      const mvd = s.mv || [], shown = s.items == null ? 5 : s.items;
      IT.forEach((_, i) => {
        const moved = mvd.indexOf(i) >= 0;
        c.op("i" + i, i < shown ? 1 : 0, { dl: i * 0.08 });
        c.mv("i" + i, { x: moved ? 318 : 83, y: 82 + i * 24 }, { d: 1.2, dl: moved ? i * 0.12 : 0, e: "power2.inOut" });
      });
      const hp = s.hl != null ? [mvd.indexOf(s.hl) >= 0 ? 318 : 83, 82 + s.hl * 24] : null;
      c.op("hl", hp ? 1 : 0); if (hp) c.mv("hl", { x: hp[0], y: hp[1] }, { d: 1.2 });
      c.op("pt", s.leave ? 0 : 1, { dl: s.leave ? 0.4 : 0 }); c.mv("pt", s.leave ? { x: -150 } : {}, { d: 1.4 });
      c.vis({ stk: s.stuck, onm: s.own === "name", oac: s.own === "active" });
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: DEFECT — the open-defect register that must survive
// project closure: every defect with a named owner and a date.
// template: Project Dashboard — https://lottiefiles.com/free-animation/project-dashboard-PeJUc2p1iB
// template: Man with task list — https://lottiefiles.com/free-animation/man-with-task-list-Z2XrIU43bQ
// =====================================================================
function F_DEFECT(p) {
  const f = pfx(p);
  return {
    p, bench: "Project Dashboard + Man with task list (LottieFiles)",
    draw() {
      let s = R(16, 46, 368, 192, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + R(16, 46, 368, 30, C.navy, 10) + R(16, 66, 368, 10, C.navy) +
        T(30, 66, "Open defect", 13, C.white, "", "start") + T(250, 66, "Owner", 13, C.white) + T(342, 66, "Date", 13, C.white);
      s += f.H("hl", R(20, 0, 360, 34, "rgba(229,183,108,.32)", 6));
      for (let i = 0; i < 4; i++) {
        const y = 104 + i * 36;
        s += f.H("r" + i, f.TK("d" + i, 30, y, "", 12.5, C.ink, "start") + f.TK("o" + i, 250, y, "", 12.5, C.navy) + f.TK("t" + i, 342, y, "", 12.5, C.navy) + P(`M24 ${y + 14} H376`, "#e4e9ef", 1.2) +
          markSVG(f, "mo" + i, 250, y - 4, 0.7) + markSVG(f, "mt" + i, 342, y - 4, 0.7));
      }
      s += f.H("lost", chip(200, 262, "Lost when the team leaves", { sz: 12.5, bg: C.red, st: C.red, fg: C.white }));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 200, 286);
      return s;
    },
    render(c, s) {
      const rows = s.rows || [];
      for (let i = 0; i < 4; i++) {
        const r = rows[i];
        c.op("r" + i, r ? (s.drop === i ? 0 : 1) : 0, { dl: s.drop === i ? 0.6 : i * 0.1, d: s.drop === i ? 1.2 : 0.6 });
        c.mv("r" + i, s.drop === i ? { y: 60 } : {}, { d: 1.4 });
        c.tx("d" + i, r ? r[0] : ""); c.tx("o" + i, r && r[1] ? r[1] : ""); c.tx("t" + i, r && r[2] ? r[2] : "");
        setMark(c, "mo" + i, r && !r[1] ? "q" : ""); setMark(c, "mt" + i, r && !r[2] ? "q" : "");
      }
      c.op("hl", s.hl != null ? 1 : 0); c.mv("hl", { y: 104 + (s.hl || 0) * 36 - 22 }, { d: 0.6 });
      c.op("lost", s.drop != null ? 1 : 0, { dl: 0.8 });
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: PHASES — the ten-phase framework as a snake of stations,
// with Implement (8), Realize Value (9) and Sustainable Performance (10)
// and the three continuous threads beneath.
// template: Multi-Step Icon Animation — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
// template: SVG Timeline + ScrollTrigger + Paths — https://codepen.io/ruru_wang/pen/VwOPzgy
// =====================================================================
function F_PHASES(p) {
  const f = pfx(p);
  const PX = [60, 130, 200, 270, 340, 340, 270, 200, 130, 60], PY = (n) => (n < 5 ? 82 : 170);
  const NM = ["Strategy", "Architecture", "Launch pad", "Understand", "Innovate", "People", "Develop", "Implement", "Realize value", "Sustain"];
  return {
    p, bench: "Multi-Step Icon Animation (LottieFiles) + SVG Timeline paths (CodePen)",
    draw() {
      let s = P("M60 82 H340 C384 82 384 170 340 170 H60", C.muted, 6);
      for (let n = 0; n < 10; n++) {
        const x = PX[n], y = PY(n);
        s += f.K("c" + n, O(x, y, 19, C.white, `stroke="${C.slate}" stroke-width="2.5"`) + T(x, y + 5, String(n + 1), 14, C.slate));
        s += f.H("o" + n, O(x, y, 19, n === 7 ? C.orange : n > 7 ? C.green : C.navy) + T(x, y + 5, String(n + 1), 14, C.white));
        s += T(x, y + 36, NM[n], 11.5, n === 7 ? C.orange : C.slate);
      }
      s += f.H("cu", O(0, 0, 27, "none", `stroke="${C.gold}" stroke-width="3.5" class="a-pulse"`));
      s += f.H("thr", P("M18 236 H382", C.navy, 4) + P("M18 252 H382", C.teal, 4) + P("M18 268 H382", C.amber, 4) +
        chip(80, 236, "Project mgmt", { sz: 11, st: C.navy, fg: C.navy }) + chip(200, 252, "Change mgmt", { sz: 11, st: C.teal, fg: C.teal }) + chip(320, 268, "Leadership", { sz: 11, st: C.amber, fg: C.amber }));
      s += noteSVG(f, "nt", 200, 24) + noteSVG(f, "nb", 200, 286);
      return s;
    },
    render(c, s) {
      const hl = s.hl || [];
      for (let n = 0; n < 10; n++) { c.op("o" + n, hl.indexOf(n + 1) >= 0 ? 1 : 0, { dl: hl.indexOf(n + 1) * 0.12 }); c.op("c" + n, s.dim && hl.indexOf(n + 1) < 0 ? 0.35 : 1); }
      c.op("cu", s.cur ? 1 : 0); if (s.cur) c.mv("cu", { x: PX[s.cur - 1], y: PY(s.cur - 1) }, { d: 0.9 });
      c.op("thr", s.thr ? 1 : 0);
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: FORUM — the asynchronous forum: post your own
// recommendation first, then reply to two classmates, disagreeing with
// at least one; Assessment Three is separate.
// template: Service Experience Feedback — https://lottiefiles.com/free-animation/service-experience-feedback-vxEY8nkHzh
// template: Join your team — https://lottiefiles.com/free-animation/join-your-team-qaD4U7x6Ml
// =====================================================================
function F_FORUM(p) {
  const f = pfx(p);
  const post = (y, col, a, b, av) => R(70, y, 296, 40, C.white, 10, `stroke="${col}" stroke-width="2"`) + person(48, y + 30, 0.85, av) + T(84, y + 17, a, 12.5, col, "", "start") + T(84, y + 33, b, 11.5, C.slate, "", "start");
  return {
    p, bench: "Service Experience Feedback + Join your team (LottieFiles)",
    draw() {
      let s = f.K("card", R(24, 36, 352, 222, "rgba(255,255,255,.8)", 12, `stroke="${C.navy}" stroke-width="2"`) + R(24, 36, 352, 30, C.navy, 12) + R(24, 54, 352, 12, C.navy) + T(200, 57, "Forum: One Weekend or Nine Months", 13, C.white));
      s += f.H("p0", post(78, C.navy, "Your recommendation", "posted before reading others", C.navy) + O(356, 84, 10, C.green) + tick(356, 84, 0.55, C.white, 2.2));
      s += f.H("lk", R(70, 128, 296, 86, "#eef0f3", 10) + rep(3, (i) => R(86, 142 + i * 22, 220 - i * 40, 10, "#d5dbe2", 5)) + lockI(340, 170, C.slate, 1.2));
      s += f.H("p1", post(128, C.green, "Reply 1: builds on it", "uses go / no-go criteria", C.teal));
      s += f.H("p2", post(176, C.red, "Reply 2: I disagree…", "uses rollback evidence", C.plum));
      s += f.H("cn", chip(200, 236, "Use this week's concepts", { sz: 12, st: C.amber, fg: C.amber }));
      s += f.H("a3", R(24, 70, 170, 150, C.navy, 12) + T(109, 112, "Assessment 3", 15, C.white) + T(109, 138, "Group research", 12.5, C.white) + T(109, 156, "project", 12.5, C.white) + T(109, 196, "Graded", 12, C.gold) +
        R(206, 70, 170, 150, C.white, 12, `stroke="${C.green}" stroke-width="2.4"`) + T(291, 112, "VoiceLearn", 15, C.green) + T(291, 138, "Questions for", 12.5, C.ink) + T(291, 156, "practice", 12.5, C.ink) + T(291, 196, "Formative", 12, C.green));
      s += noteSVG(f, "nt", 200, 18) + noteSVG(f, "nb", 200, 284);
      return s;
    },
    render(c, s) {
      const k = s.k || 0;
      c.op("card", s.a3 ? 0.12 : 1);
      c.vis({ p0: !s.a3 && k >= 1, lk: !s.a3 && k === 1, p1: !s.a3 && k >= 2, p2: !s.a3 && k >= 3, cn: !s.a3 && k >= 4, a3: s.a3 });
      c.mv("p1", k >= 2 ? {} : { x: 30 }); c.mv("p2", k >= 3 ? {} : { x: 30 });
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: BALANCE — the steering group's scale: the programme
// director's deadline against the operations director's contingency.
// template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
// template: Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p
// =====================================================================
function F_BALANCE(p) {
  const f = pfx(p);
  return {
    p, bench: "Comparison Chart + Choosing a path (LottieFiles)",
    draw() {
      let s = R(176, 250, 48, 8, C.ink, 3) + P("M200 100 V250", C.ink, 5);
      s += f.K("bm", P("M70 100 H330", C.ink, 5) + O(200, 100, 7, C.ink) + P("M70 100 L34 176 M70 100 L106 176 M330 100 L294 176 M330 100 L366 176", C.slate, 1.8) +
        R(24, 174, 92, 7, C.orange, 3) + R(284, 174, 92, 7, C.green, 3) + noteSVG(f, "pl0", 70, 160, 12.5) + noteSVG(f, "pl1", 70, 132, 12.5) + noteSVG(f, "pr0", 330, 160, 12.5) + noteSVG(f, "pr1", 330, 132, 12.5));
      s += f.H("who", person(70, 236, 1.1, C.orange) + T(70, 266, "Programme", 12, C.orange) + T(70, 280, "director", 12, C.orange) + person(330, 236, 1.1, C.green) + T(330, 266, "Operations", 12, C.green) + T(330, 280, "director", 12, C.green));
      s += noteSVG(f, "nt", 200, 24) + noteSVG(f, "nm", 200, 214);
      return s;
    },
    render(c, s) {
      c.mv("bm", { r: (s.tilt || 0) * 7, pv: [200, 100] }, { d: 1.3, e: "power2.inOut" });
      const l = s.l || [], r = s.r || [];
      setNote(c, "pl0", l[0]); setNote(c, "pl1", l[1]); setNote(c, "pr0", r[0]); setNote(c, "pr1", r[1]);
      c.op("who", s.who === 0 ? 0 : 1);
      setNote(c, "nt", s.nt); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: DIP — the implementation dip (compact): performance
// falls after go-live, support props the valley, recovery follows.
// template: Line Chart — https://lottiefiles.com/free-animation/line-chart-q9Ehbk6l4y
// template: Easing Animations — https://observablehq.com/@d3/easing-animations
// =====================================================================
function F_DIP(p) {
  const f = pfx(p);
  return {
    p, bench: "Line Chart (LottieFiles) + Easing Animations (Observable)",
    draw() {
      let s = R(20, 40, 370, 192, "#fffdf8", 10, `stroke="${C.slate}" stroke-width="1.6"`) + T(30, 60, "Performance", 12, C.slate, "", "start");
      s += rep(7, (i) => P(`M${70 + i * 50} 44 V228`, "#f0e6d6", 1));
      s += P("M120 70 V226", C.slate, 2, 'stroke-dasharray="4 4"') + T(120, 248, "Go-live", 12, C.slate);
      s += f.H("al", P("M28 214 H382", C.red, 2.4, 'stroke-dasharray="7 5"') + T(382, 208, "Failure line", 12, C.red, "", "end"));
      s += f.H("sup", P("M172 226 V176 M205 226 V192 M238 226 V178", C.amber, 5) + chip(205, 140, "Training + support", { sz: 12, st: C.amber, fg: C.amber }));
      s += f.D("cv", "M30 110 H120 C150 110 165 190 205 190 C245 190 255 120 290 110 C320 100 350 80 382 70", C.navy, 4.5);
      s += f.H("rec", O(382, 70, 10, C.green) + tick(382, 70, 0.6, C.white, 2.4));
      s += noteSVG(f, "nt", 200, 22) + noteSVG(f, "nb", 200, 278);
      return s;
    },
    render(c, s) {
      c.dr("cv", s.dr == null ? 1 : s.dr, { d: 1.5 });
      c.vis({ al: s.al, sup: s.sup, rec: s.rec });
      setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}


// =====================================================================
// W12O3c · When can the project team leave? (29 lines)
// Shots: GATE, HAND, CHECK, COMPARE, MAP, BOARD, PHASES, LOBBY,
// WAFFLE, CHART, DEFECT
// =====================================================================
{
  const id = "W12O3c";
  const FIVE = ["Active process owner", "Measure produced, reviewed", "Exceptions in designed range", "Procedures run by operations", "Defects: owner and date"];
  const DEF_MISSING = [["Corporate rejections", "Process owner", "Agreed date"], ["Defect 2 (example)", "", ""], ["Defect 3 (example)", "", ""]];
  const DEF_OWNED = [["Corporate rejections", "Named owner", "Agreed date"], ["Defect 2 (example)", "Named owner", "Agreed date"], ["Defect 3 (example)", "Named owner", "Agreed date"]];
  const plan = [
    ["gate", { sign: "GO", open: 1, nb: { t: "It works. Now what?", c: "G" } }, "When implementation succeeds"],
    ["hand", { nt: { t: "Not responsible forever", c: "O" } }, "The team can't stay forever"],
    ["hand", { leave: 1, nb: { t: "Leave too soon: nobody owns it", c: "R" } }, "Leaving too early"],
    ["check", { t: "Five closure conditions", items: FIVE, mk: [] }, "Five closure conditions"],
    ["hand", { mv: [0, 1, 2, 3, 4], nt: { t: "Five things to hand over", c: "N" } }, "What must transfer"],
    ["hand", { mv: [0], hl: 0, nt: { t: "Someone stays accountable", c: "N" } }, "Process ownership"],
    ["compare", { lt: "Appointed", li: "doc", l: ["A name on", "the chart"], lm: "x", rt: "Exercising it", ri: "person", r: ["Decides, reviews,", "follows up"], rm: "ok", hl: "r", mid: "≠" }, "A name isn't ownership"],
    ["map", { grp: 1, mk: { pil: "ok", std: "ok", her: "ok", peak: "ok" }, nt: { t: "One owner, 14 properties", c: "N" } }, "Coordinating across properties"],
    ["board", { cards: [["Corp rejected", 0], ["Corp rejected", 0], ["Corp rejected", 0]], recur: 0, nm: { t: "No owner: problems recur", c: "R" } }, "Without an owner, problems recur"],
    ["phases", { hl: [8, 9, 10], cur: 10, nb: { t: "Phase 10 needs an active owner", c: "R" } }, "No owner, no Sustainable Performance"],
    ["compare", { lt: "Defined", li: "doc", l: ["Written in a", "project document"], lm: "x", rt: "Produced, reviewed", ri: "chart", r: ["Reported and", "acted upon"], rm: "ok", hl: "r", mid: "≠" }, "A measure that is really used"],
    ["lobby", { g: "done", tK: 1, tA: 1, route: 1, nt: { t: "Measure the whole arrival", c: "N" } }, "End-to-end guest arrival"],
    ["waffle", { sort: 1, dimO: 1, nb: { t: "Kiosk-only data hides 35%", c: "R" } }, "Kiosk-only data hides exceptions"],
    ["chart", { mode: "exc", band: 1, ein: 1, nt: { t: "Within the designed range", c: "G" } }, "Exceptions within design"],
    ["chart", { mode: "exc", band: 1, ein: 1, eov: 1, nt: { t: "Controlled, or overflowing?", c: "O" } }, "Controlled or a capacity problem?"],
    ["chart", { mode: "exc", band: 1, eov: 1, ovr: 1, nt: { t: "The exception path becomes the process", c: "R" } }, "When exceptions become the process"],
    ["compare", { lt: "Adoption %", li: "chart", l: ["65% looks", "convenient"], lm: "w", rt: "Exception range", ri: "shield", r: ["Inside the", "designed range?"], rm: "q", mid: "≠" }, "A percentage isn't enough"],
    ["hand", { mv: [0, 1, 2, 3], hl: 3, nt: { t: "Procedures → operations", c: "G" } }, "Procedures move to operations"],
    ["check", { t: "Reception procedures", items: ["Kiosk handling", "Assisted exceptions", "Escalation responsibilities"], mk: ["ok", "ok", "ok"], st: { t: "Maintained by operations", c: "G" } }, "Maintained, up-to-date procedures"],
    ["hand", { mv: [0, 1, 2, 3], stuck: 1, nb: { t: "Not the permanent helpdesk", c: "O" } }, "Not the permanent source of answers"],
    ["phases", { hl: [6, 8], cur: 6, nb: { t: "People-phase roles carry on", c: "N" } }, "Links back to the People phase"],
    ["defect", { rows: DEF_MISSING, drop: 1, nt: { t: "Defects mustn't vanish", c: "R" } }, "Defects mustn't disappear"],
    ["defect", { rows: DEF_OWNED, nb: { t: "An owner and a date, every one", c: "G" } }, "Owner and date for each"],
    ["defect", { rows: DEF_OWNED, hl: 0, nb: { t: "Understood and tracked", c: "G" } }, "Understood and tracked"],
    ["compare", { lt: "Honest closure", li: "doc", l: ["Open items listed,", "each one owned"], lm: "ok", rt: "Pretend closure", ri: "cloud", r: ["'Everything", "is fixed'"], rm: "x", hl: "l", mid: "≠" }, "Close without pretending"],
    ["hand", { mv: [0, 1, 2, 3, 4], leave: 1, own: "active", nb: { t: "Runs without the project", c: "G" } }, "No continued project dependence"],
    ["phases", { hl: [8], cur: 9, nb: { t: "Closed ≠ value realised", c: "O" } }, "Closure isn't realised value"],
    ["phases", { hl: [8, 9, 10], cur: 9, nb: { t: "9: realise value · 10: sustain it", c: "G" } }, "Realize Value, then sustain"],
    ["check", { t: "One integrated decision", items: ["Deployment sequence", "Stopping conditions", "Operational responsibility"], mk: ["q", "q", "q"], st: { t: "Next: decide", c: "P" } }, "Next: one integrated decision"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#eff4f1", plan,
    desc: "Five closure conditions before Qasr's project team can leave: an owner who actively exercises the role, an end-to-end measure that is produced and reviewed, exception volumes inside the designed range, procedures maintained by operations, and every open defect with a named owner and date.",
    shots: { gate: F_GATE("ga_"), hand: F_HAND("hd_"), check: F_CHECK("ck_"), compare: F_COMPARE("cp_"), map: F_MAP("mp_"), board: F_BOARD("bo_"), phases: F_PHASES("ph_"), lobby: F_LOBBY("lo_"), waffle: F_WAFFLE("wf_"), chart: F_CHART("ch_"), defect: F_DEFECT("df_") }
  });
  SCENE_BG.push([id, "#eff4f1"]);
}

// =====================================================================
// W12O3d · Fourteen properties, one defensible decision (33 lines)
// Shots: PHASES, BALANCE, MAP, CHART, WAFFLE, GAUGE, COMPARE, BARS, ARCH,
// GANTT, REHEARSE, GATE, TRIGGER, DIP, BOARD, HAND, DEFECT, CHECK, FORUM
// =====================================================================
{
  const id = "W12O3d";
  const H11 = { arc: 11 / 12, hh: "11 h", cov: 1, rows: ["Marina only", "Live corporate bookings", "Other properties"], mk: ["ok", "x", "q"] };
  const plan = [
    ["phases", { hl: [8], cur: 8, nt: { t: "Implement: the decision", c: "N" } }, "Everything comes together"],
    ["balance", { l: [{ t: "Deploy before January", c: "O" }], r: [{ t: "Contingency?", c: "G" }] }, "Two directors, two concerns"],
    ["balance", { l: [{ t: "Regulatory compliance", c: "R" }], r: [{ t: "Dependable service", c: "G" }], nm: { t: "Both must be protected", c: "N" } }, "Both concerns matter"],
    ["map", { grp: 1, mk: { pil: "ok", std: "q", her: "q", peak: "q" }, nb: { t: "Useful, not universal", c: "O" } }, "Start with the pilot evidence"],
    ["chart", { dr: 1, t100: 1, gap: 1, plat: 1, big: 1 }, "Adoption: 65%, desk: 35%"],
    ["waffle", { sort: 1, corp: 1, nb: { t: "Rejection, not resistance", c: "O" } }, "Corporate bookings, not resistance"],
    ["gauge", { v: 7.9, v0: 6.8, big: "7.9", bigc: "g", nL: { t: "Before: 6.8", c: "N" }, nR: { t: "Pilot: 7.9", c: "G" }, nb: { t: "Measures tell different stories", c: "P" } }, "Satisfaction still rose"],
    ["compare", { lt: "Controlled", li: "shield", l: ["Assisted path", "by design"], lm: "q", rt: "Unresolved", ri: "wrench", r: ["A limitation", "still open"], rm: "q", mid: "or" }, "Controlled or unresolved?"],
    ["bars", { ti: "Evidence still needed", rows: [["Exception volumes", 0, "s", "?", "q"], ["Desk capacity", 0, "s", "?", "q"], ["Cost of keeping the path", 0, "s", "?", "q"]], max: 10, nm: { t: "Judge with evidence", c: "N" } }, "Volumes, capacity, consequences"],
    ["map", { grp: 1, lit: ["std", "her", "peak"], pop: 1, nb: { t: "No uniform rollout", c: "O" } }, "Twelve properties, three realities"],
    ["map", { grp: 1, lit: ["std"], mk: { std: "ok" }, nb: { t: "Standard: when readiness shown", c: "G" } }, "Standard: straightforward if ready"],
    ["arch", { tr: 1, vr: 1, reg: 1, ps: 1, pv: 1, hl: "var", nb: { t: "Heritage: registered variant", c: "P" } }, "Heritage: the registered variant"],
    ["gauge", { mode: "occ", v: 93, big: "> 90%", bigc: "r", nt: { t: "Peak ×4 through January", c: "N" }, nb: { t: "No January dip possible", c: "R" } }, "Peak: no room for a dip"],
    ["gantt", { wk: 3, wc: ["g", "g", "g"], wv: 1, wvq: 1, gt: 1, dl: 1, nt: { t: "A conditional sequence", c: "N" } }, "A conditional recommendation"],
    ["gantt", { wk: 3, wc: ["g", "g", "g"], wv: 1, wvq: 1, dl: 1, buf: 1, nb: { t: "Depends on evidence and time", c: "O" } }, "Still a proposal"],
    ["gantt", { wk: 8, dl: 1, buf: 1, nq: { t: "8 weeks + 3 spare: enough?", c: "O" } }, "Challenge eight weeks and the buffer"],
    ["gantt", { wk: 8, dl: 1, buf: 1, fail: 1, rec: 4, ovf: 1, nm: { t: "A late failure eats the buffer", c: "R" } }, "A late failure"],
    ["rehearse", Object.assign({ nt: { t: "The only rehearsal", c: "N" } }, H11), "Eleven hours, Marina, no corporate"],
    ["rehearse", Object.assign({ no: { t: "Not a guarantee", c: "R" }, nm: { t: "12 properties untested", c: "O" } }, H11), "No guaranteed recovery time"],
    ["gate", { items: [["Technology verified", 0, "q"], ["Employees prepared", 1, "q"], ["Support in place", 1, "q"], ["Contingency ready", 1, "q"]], pre: 1, nb: { t: "Objective, agreed in advance", c: "N" } }, "Readiness criteria for each go-live"],
    ["trigger", { lv: 0.45, th: 0.6, whoS: "ok", whoR: "ok", nt: { t: "Numbers + named authority", c: "N" } }, "Triggers, authority, waivers"],
    ["compare", { lt: "Stop", li: "stop", l: ["Halt further", "deployment"], rt: "Roll back", ri: "undo", r: ["Restore the", "earlier way"], mid: "≠" }, "Stopping isn't restoring"],
    ["gate", { t: "Evidence to resume", items: [["Problem corrected", 1, "q"], ["Fix verified", 0, "q"], ["Staff briefed", 1, "q"]], sign: "HOLD", shut: 1 }, "Evidence before resuming"],
    ["dip", { dr: 1, sup: 1, rec: 1, nt: { t: "Train + support through the dip", c: "G" } }, "Training and support in the dip"],
    ["board", { cards: [["Corp rejected", 1], ["Unclear step", 2], ["Group arrival", 2]], told: 1, cred: 0.8, nt: { t: "Monitor, investigate, tell", c: "G" } }, "Monitor, investigate, communicate"],
    ["hand", { mv: [0, 1, 2], own: "active", nt: { t: "Owner, measures, exceptions", c: "G" } }, "Transfer into operations"],
    ["defect", { rows: [["Corporate rejections", "Named owner", "Agreed date"], ["Defect 2 (example)", "Named owner", "Agreed date"]], nt: { t: "Procedures to ops, defects owned", c: "G" } }, "Procedures and defects"],
    ["balance", { l: [{ t: "Deadline 1 Jan", c: "R" }, { t: "Satisfaction 7.9", c: "G" }], r: [{ t: "Untested rollback", c: "R" }, { t: "65% plateau", c: "O" }], nm: { t: "No approved resolution", c: "P" } }, "Competing evidence, no verdict"],
    ["check", { t: "Your recommendation", items: ["State it, with conditions", "Name the binding constraint", "Say what would change it"], mk: ["q", "q", "q"], st: { t: "Defend it", c: "P" } }, "Defend a conditional recommendation"],
    ["forum", { k: 0, nb: { t: "Apply it to a new organisation", c: "N" } }, "Forum: One Weekend or Nine Months"],
    ["forum", { k: 4, nt: { t: "Post first, reply to two", c: "N" } }, "Post, reply twice, disagree once"],
    ["forum", { a3: 1, nb: { t: "Separate, not the same", c: "N" } }, "Assessment 3 is separate"],
    ["phases", { hl: [8, 9], cur: 9, nb: { t: "Week 13: Realize Value", c: "G" } }, "Next: Realize Value"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#f5f2ec", plan,
    desc: "The steering group's integrated decision: pilot evidence (65 percent adoption, corporate rejections, satisfaction 6.8 to 7.9), three property groups, a conditional sequence against the 1 January deadline and three-week buffer, the eleven-hour Marina rehearsal, readiness gates, numerical triggers, support through the dip, handover with owners, and the forum task.",
    shots: { phases: F_PHASES("ph_"), balance: F_BALANCE("bl_"), map: F_MAP("mp_"), chart: F_CHART("ch_"), waffle: F_WAFFLE("wf_"), gauge: F_GAUGE("gg_"), compare: F_COMPARE("cp_"), bars: F_BARS("ba_"), arch: F_ARCH("ar_"), gantt: F_GANTT("gt_"), rehearse: F_REHEARSE("rh_"), gate: F_GATE("ga_"), trigger: F_TRIGGER("tg_"), dip: F_DIP("di_"), board: F_BOARD("bo_"), hand: F_HAND("hd_"), defect: F_DEFECT("df_"), check: F_CHECK("ck_"), forum: F_FORUM("fo_") }
  });
  SCENE_BG.push([id, "#f5f2ec"]);
}

addStyles(SCENE_BG);
})();
