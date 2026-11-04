// OPER621 · Week 8 · The Understand Phase — animated teaching scenes (round 2, Claude)
// File: w08-claude-part1.js · Lesson 1 · What really happens at Qasr? · Scenes: W8O1a, W8O1b, W8O1c
// Standalone part: defines its own engine and helpers, registers its scenes and appends its own
// rules (all scoped under .vls-w08-<secId>) into the single shared <style id="vl-sc-w08">.
// Parts may be loaded in any order or concatenated.
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }; i = narration moment index.
// Each section is a sequence of beats (a new visual every 3-4 narration lines); each beat names the
// benchmark template it adapts (number, title, URL). All drawing code is original.
(() => {
  "use strict";
  // ================= shared engine (self-contained copy for this part) =================
  window.VL_SCENES = window.VL_SCENES || {};
  const VL_SCENES = window.VL_SCENES;
  const PART = "p1";
  const C = {
    navy: "#1f4e79", navy2: "#2d6a9f", orange: "#c0502a", paper: "#fbf8f1", ink: "#1b2a3a",
    blue: "#dbe7f2", green: "#317c61", gold: "#e5b76c", amber: "#a8741a", plum: "#6b4e8a",
    red: "#b0362b", white: "#ffffff", slate: "#5d7389", muted: "#9fb3c4", mint: "#e1f0e8",
    peach: "#f8e3d8", lilac: "#ece6f3", sky: "#eaf2f8", sand: "#efe4cf", night: "#14263a", teal: "#2a7f86"
  };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const num = (v, f) => { const x = Number(v); return Number.isFinite(x) ? x : f; };
  const reduced = () => { try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (_) { return false; } };
  const hasG = () => !!(window.gsap && typeof window.gsap.to === "function" && typeof window.gsap.set === "function") && !reduced();
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");
  const inR = (k, a, b) => k >= a && k <= b;
  // ---- SVG string builders ----
  const R = (x, y, w, h, f, rx = 0, ex = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${ex}/>`;
  const O = (cx, cy, r, f, ex = "") => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${ex}/>`;
  const E = (cx, cy, rx, ry, f, ex = "") => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${ex}/>`;
  const P = (d, s, w = 2, ex = "") => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
  const F = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
  const D = (k, d, s, w = 3, ex = "") => `<path data-k="${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100" ${ex}/>`;
  const T = (x, y, s, sz = 14, f = C.ink, ex = "", a = "middle") => `<text x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
  const TK = (k, x, y, s, sz = 14, f = C.ink, a = "middle", ex = "") => `<text data-k="${k}" x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
  const K = (k, body, ex = "") => `<g data-k="${k}" ${ex}>${body}</g>`;
  const H = (k, body, ex = "") => `<g data-k="${k}" style="opacity:0" ${ex}>${body}</g>`;
  const tw = (s, sz) => Math.round(String(s).length * sz * 0.6 + sz * 1.3);
  const chip = (x, y, s, o = {}) => {
    const sz = o.sz || 14, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.85);
    return `<g class="w8c">` + R(x - w / 2, y - h / 2, w, h, o.bg || C.paper, o.rx == null ? h / 2 : o.rx,
      `stroke="${o.st || C.navy}" stroke-width="${o.sw || 1.8}"${o.dash ? ' stroke-dasharray="5 4"' : ""}`) +
      T(x, y + sz * 0.36, s, sz, o.fg || C.navy) + `</g>`;
  };
  // process box with 1-2 lines ("Line one|line two")
  const node = (x, y, w, h, s, o = {}) => {
    const sz = o.sz || 13, L = String(s).split("|"), lh = sz * 1.15, y0 = y + h / 2 - (L.length - 1) * lh / 2 + sz * 0.36;
    return `<g class="w8c">` + R(x, y, w, h, o.bg || C.white, o.rx == null ? 8 : o.rx, `stroke="${o.st || C.navy}" stroke-width="${o.sw || 2}"${o.dash ? ' stroke-dasharray="5 4"' : ""}`) +
      L.map((t, i) => T(x + w / 2, y0 + i * lh, t, sz, o.fg || C.ink)).join("") + `</g>`;
  };
  const head = (x, y, ang, col, s = 1) => { const a = ang * Math.PI / 180, c = Math.cos(a), si = Math.sin(a), p = (dx, dy) => `${(x + dx * c - dy * si).toFixed(1)} ${(y + dx * si + dy * c).toFixed(1)}`; return F(`M${p(2 * s, 0)} L${p(-8 * s, -5.5 * s)} L${p(-8 * s, 5.5 * s)} Z`, col); };
  const arrow = (x1, y1, x2, y2, col = C.slate, w = 2.4, ex = "") => P(`M${x1} ${y1} L${x2} ${y2}`, col, w, ex) + head(x2, y2, Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, col);
  const darrow = (k, x1, y1, x2, y2, col = C.slate, w = 2.6) => { const L = Math.hypot(x2 - x1, y2 - y1) || 1, ex = x2 - (x2 - x1) / L * 6, ey = y2 - (y2 - y1) / L * 6; return D(k, `M${x1} ${y1} L${ex.toFixed(1)} ${ey.toFixed(1)}`, col, w) + H(k + "g", head(x2, y2, Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, col)); };
  const dcurve = (k, d, x2, y2, ang, col = C.slate, w = 2.6) => D(k, d, col, w) + H(k + "g", head(x2, y2, ang, col));
  const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${x - 7 * s} ${y} l${5 * s} ${5 * s} l${10 * s} ${-11 * s}`, col, w);
  const cross = (x, y, s = 1, col = C.red, w = 3) => P(`M${x - 6 * s} ${y - 6 * s} l${12 * s} ${12 * s} M${x + 6 * s} ${y - 6 * s} l${-12 * s} ${12 * s}`, col, w);
  const badge = (x, y, r, col, ok = true) => O(x, y, r, col) + (ok ? tick(x, y, r / 13, C.white, Math.max(2, r / 5)) : cross(x, y, r / 14, C.white, Math.max(2, r / 5)));
  const person = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}</g>`;
  const guest = (x, y, s = 1, col = C.navy2, bag = C.orange) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -17, 8, col)}${F("M-12 14 Q-12 -6 0 -6 Q12 -6 12 14 Z", col)}${R(13, -2, 12, 16, bag, 3)}${P("M16 -2 v-4 h6 v4", bag, 1.6)}</g>`;
  const clock = (x, y, r, col = C.orange, bg = C.paper) => O(x, y, r, bg, `stroke="${col}" stroke-width="${Math.max(2, r / 6)}"`) + P(`M${x} ${y - r * 0.62} V${y} L${x + r * 0.45} ${y + r * 0.3}`, col, Math.max(2, r / 7));
  const hand = (x, y, len, col, dur = 4, w = 3) => `<path class="a-hand" style="transform-origin:${x}px ${y}px;animation-duration:${dur}s" d="M${x} ${y} V${y - len}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
  const watch = (x, y, r, col = C.navy, bg = C.white) => R(x - r * 0.22, y - r - 9, r * 0.44, 7, col, 2) + O(x, y, r, bg, `stroke="${col}" stroke-width="${Math.max(3, r / 7)}"`) + rep(12, (i) => { const a = i * Math.PI / 6; return P(`M${(x + r * 0.78 * Math.sin(a)).toFixed(1)} ${(y - r * 0.78 * Math.cos(a)).toFixed(1)} L${(x + r * 0.9 * Math.sin(a)).toFixed(1)} ${(y - r * 0.9 * Math.cos(a)).toFixed(1)}`, col, i % 3 ? 1.2 : 2.4); });
  const phone = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M-12 -6 Q-12 -12 -6 -12 L-2 -12 L0 -5 L-4 -2 Q-2 4 4 8 L7 4 L13 6 L13 10 Q13 15 7 15 Q-12 13 -12 -6 Z", col)}</g>`;
  const doc = (x, y, w, h, col = C.navy, bg = C.white, lines = 3) => R(x, y, w, h, bg, 4, `stroke="${col}" stroke-width="2"`) + (lines === 0 ? R(x, y, w, 7, col, 3) : "") + rep(lines, (i) => P(`M${x + 7} ${y + 11 + i * ((h - 16) / Math.max(1, lines))} H${x + w - 7 - (i === lines - 1 ? w * 0.25 : 0)}`, col, 2, 'opacity=".55"'));
  const desk = (x, y, w, col = C.navy) => R(x, y, w, 10, C.orange, 3) + R(x + 6, y + 10, w - 12, 26, col, 3);
  const monitor = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-18, -14, 36, 24, col, 3)}${R(-15, -11, 30, 18, "#cfe0f0", 2)}${R(-3, 10, 6, 6, col)}${R(-10, 15, 20, 3, col, 1)}</g>`;
  const lens = (x, y, r, col = C.ink) => O(x, y, r, "rgba(255,255,255,.22)", `stroke="${col}" stroke-width="${Math.max(3, r / 9)}"`) + P(`M${x + r * 0.72} ${y + r * 0.72} L${x + r * 1.25} ${y + r * 1.25}`, col, Math.max(5, r / 4.5));
  const gear = (x, y, r, col, hole = C.paper) => { let d = ""; const n = 8; for (let i = 0; i < n; i++) { const a0 = (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n * 0.55, a2 = a0 + Math.PI / n, a3 = a2 + Math.PI / n * 0.45, p = (a, rr) => `${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`; d += (i ? "L" : "M") + p(a0, r) + "L" + p(a1, r) + "L" + p(a2, r * 0.78) + "L" + p(a3, r * 0.78); } return F(d + "Z", col) + O(x, y, r * 0.34, hole); };
  const star = (x, y, r, col = C.gold, st = C.amber) => { let d = ""; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; d += (i ? "L" : "M") + (x + rr * Math.cos(a)).toFixed(1) + " " + (y + rr * Math.sin(a)).toFixed(1); } return F(d + "Z", col, `stroke="${st}" stroke-width="1"`); };
  const hotel = (x, y, w, h, col = C.navy, win = "#cfe0f0") => R(x, y, w, h, col, 6) + F(`M${x - 8} ${y + 2} L${x + w / 2} ${y - 22} L${x + w + 8} ${y + 2} Z`, C.navy2) + rep(Math.floor((h - 34) / 22) * 4, (i) => R(x + 10 + (i % 4) * ((w - 20) / 4), y + 12 + Math.floor(i / 4) * 22, (w - 20) / 4 - 8, 13, win, 2)) + R(x + w / 2 - 13, y + h - 30, 26, 30, C.gold, 3);
  const door = (x, y, w, h, col = C.green, bg = "#d7ebdf") => R(x, y, w, h, col, 4) + R(x + 5, y + 5, w - 10, h - 5, bg, 2) + O(x + w - 11, y + h / 2 + 4, 2.6, col);
  const key = (x, y, s = 1, col = C.gold) => `<g transform="translate(${x} ${y}) scale(${s})">${O(-9, 0, 7, "none", `stroke="${col}" stroke-width="3.4"`)}${P("M-2 0 H14 M10 0 V5 M14 0 V6", col, 3.4)}</g>`;
  const bubble = (x, y, w, h, s, o = {}) => `<g class="w8c">` + R(x, y, w, h, o.bg || C.white, 10, `stroke="${o.st || C.navy}" stroke-width="1.8"`) + F(`M${x + (o.tx || 16)} ${y + h - 1} L${x + (o.tx || 16) - 4} ${y + h + 10} L${x + (o.tx || 16) + 10} ${y + h - 1} Z`, o.bg || C.white, `stroke="${o.st || C.navy}" stroke-width="1.8" stroke-linejoin="round"`) + R(x + (o.tx || 16) - 3, y + h - 3, 14, 4, o.bg || C.white) + T(x + w / 2, y + h / 2 + (o.sz || 13) * 0.36, s, o.sz || 13, o.fg || C.navy) + `</g>`;
  const coin = (x, y, r = 8) => O(x, y, r, C.gold, `stroke="${C.amber}" stroke-width="2"`) + T(x, y + r * 0.42, "$", r * 1.2, C.amber);
  const shield = (x, y, s = 1, col = C.green) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M0 -18 L15 -12 V0 Q15 13 0 20 Q-15 13 -15 0 V-12 Z", col)}${tick(0, 0, 0.8, C.white, 3)}</g>`;
  const lock = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-11, -3, 22, 17, col, 3)}${P("M-7 -3 v-6 a7 7 0 0 1 14 0 v6", col, 3)}${O(0, 5, 2.6, C.white)}</g>`;
  const cal = (x, y, w, h, col = C.red) => R(x, y, w, h, C.white, 5, `stroke="${col}" stroke-width="2"`) + R(x, y, w, h * 0.28, col, 5) + R(x, y + h * 0.18, w, h * 0.1, col);
  const moon = (x, y, r, col = C.gold) => F(`M${x} ${y - r} A${r} ${r} 0 1 0 ${x} ${y + r} A${r * 1.3} ${r * 1.3} 0 0 1 ${x} ${y - r} Z`, col);
  const scale = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${P("M0 -26 V22 M-16 22 H16 M-30 -18 H30", col, 3)}${P("M-30 -18 L-40 2 M-30 -18 L-20 2 M30 -18 L20 2 M30 -18 L40 2", col, 1.6)}${F("M-42 2 Q-30 14 -18 2 Z", col)}${F("M18 2 Q30 14 42 2 Z", col)}</g>`;
  // ---- per-scene stylesheet (all rules scoped under .vls-w08-<secId>) ----
  function sceneCSS(id, bg) {
    const s = ".vls-w08-" + id;
    return `
${s}{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:220px;overflow:hidden!important;box-sizing:border-box;border-radius:14px;background:${bg};color:${C.ink};font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w08-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w08-fig>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}
${s} svg text{font-family:inherit;font-weight:700;letter-spacing:.1px}
${s} [data-k],${s} [data-beat]{transform-box:fill-box;transform-origin:50% 50%}
${s}.w08-css [data-k],${s}.w08-css [data-beat]{transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.8s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}
${s}.w08-snap [data-k],${s}.w08-snap [data-beat],${s}.w08-rm [data-k],${s}.w08-rm [data-beat]{transition:none!important}
${s}.w08-rm *{animation:none!important}
${s} .w08-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:36px;padding:6px 12px 8px;font-size:14px;font-weight:700;line-height:1.25;color:${C.navy};background:rgba(255,255,255,.6);border-top:1px solid rgba(31,78,121,.12)}
${s} .w08-num{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w08-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.2px}
${s} .w08-lab.w08-in{animation:vlsw08CapIn .5s cubic-bezier(.22,.8,.24,1)}
${s} .w08-bar{flex:0 0 54px;height:4px;border-radius:4px;background:rgba(31,78,121,.15);overflow:hidden}
${s} .w08-bar i{display:block;height:100%;width:0;background:${C.orange};transition:width .6s ease}
${s} .a-flow{stroke-dasharray:6 7;animation:vlsw08Flow 1.1s linear infinite}
${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw08Spin 7s linear infinite}
${s} .a-hand{transform-box:view-box;animation-name:vlsw08Spin;animation-timing-function:linear;animation-iteration-count:infinite}
${s} .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw08Bob 2.6s ease-in-out infinite}
${s} .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw08Pulse 2s ease-in-out infinite}
${s} .a-blink{animation:vlsw08Blink 1.4s ease-in-out infinite}
${s} .a-ring{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw08Ring .9s ease-in-out infinite}
${s} .a-walk{animation:vlsw08Walk 2.4s ease-in-out infinite}
@media (max-width:420px){${s} .w08-cap{font-size:13px;min-height:32px;padding:5px 10px 7px}${s} .w08-bar{flex-basis:40px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
  }
  const KEYFRAMES = `
@keyframes vlsw08CapIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes vlsw08Flow{to{stroke-dashoffset:-26}}
@keyframes vlsw08Spin{to{transform:rotate(360deg)}}
@keyframes vlsw08Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes vlsw08Pulse{0%,100%{opacity:.35;transform:scale(.94)}50%{opacity:.95;transform:scale(1.06)}}
@keyframes vlsw08Blink{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes vlsw08Ring{0%,100%{transform:rotate(0)}25%{transform:rotate(-12deg)}75%{transform:rotate(12deg)}}
@keyframes vlsw08Walk{0%,100%{transform:translateX(0)}50%{transform:translateX(6px)}}
`;
  function addStyles(list) {
    if (typeof document === "undefined") return;
    let st = document.getElementById("vl-sc-w08");
    if (!st) { st = document.createElement("style"); st.id = "vl-sc-w08"; (document.head || document.documentElement).appendChild(st); }
    const flag = "data-w08claude" + PART;
    if (st.getAttribute(flag)) return;
    st.setAttribute(flag, "1");
    const kf = st.getAttribute("data-w08kf") ? "" : KEYFRAMES;
    st.setAttribute("data-w08kf", "1");
    st.appendChild(document.createTextNode(kf + list.map((p) => sceneCSS(p[0], p[1])).join("\n")));
  }
  // ---- scene factory: beats (a new visual every 3-4 moments) + per-moment builds ----
  function makeScene(cfg) {
    const { id, N, labels, beats } = cfg;
    let root = null, useG = false, beatNow = -1;
    const mapK = (i, n) => {
      const nn = Math.max(1, Math.floor(num(n, N)));
      const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
      return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
    };
    const beatOf = (k) => { for (let b = 0; b < beats.length; b++) if (k >= beats[b].from && k <= beats[b].to) return b; return beats.length - 1; };
    const dur = (t, d) => (t.d == null ? d : t.d);
    function timing(el, t, d) { el.style.transitionDuration = dur(t, d) + "s"; el.style.transitionDelay = (t.dl || 0) + "s"; }
    function tf(el, st, t, snap) {
      const x = st.x || 0, y = st.y || 0, r = st.r || 0;
      const sx = st.sx != null ? st.sx : (st.s != null ? st.s : 1), sy = st.sy != null ? st.sy : (st.s != null ? st.s : 1);
      if (useG) {
        const v = { x, y, rotation: r, scaleX: sx, scaleY: sy };
        if (st.pv) v.svgOrigin = st.pv[0] + " " + st.pv[1]; else v.transformOrigin = "50% 50%";
        if (snap) window.gsap.set(el, v);
        else window.gsap.to(el, Object.assign(v, { duration: dur(t, 0.85), delay: t.dl || 0, ease: t.e || "power3.out", overwrite: "auto" }));
      } else {
        if (st.pv) { el.style.transformBox = "view-box"; el.style.transformOrigin = st.pv[0] + "px " + st.pv[1] + "px"; }
        timing(el, t, 0.85);
        el.style.transform = "translate(" + x + "px," + y + "px) rotate(" + r + "deg) scale(" + sx + "," + sy + ")";
      }
    }
    function op(el, o, t, snap) {
      if (useG) { if (snap) window.gsap.set(el, { opacity: o }); else window.gsap.to(el, { opacity: o, duration: dur(t, 0.6), delay: t.dl || 0, ease: "power1.out", overwrite: false }); }
      else { timing(el, t, 0.6); el.style.opacity = String(o); }
    }
    function dash(el, f, t, snap) {
      const v = 100 * (1 - clamp(f, 0, 1));
      if (useG) { if (snap) window.gsap.set(el, { strokeDashoffset: v }); else window.gsap.to(el, { strokeDashoffset: v, duration: dur(t, 1.1), delay: t.dl || 0, ease: "power2.inOut" }); }
      else { timing(el, t, 1.1); el.style.strokeDashoffset = String(v); }
    }
    function fill(el, col, t, snap) {
      if (useG) { if (snap) window.gsap.set(el, { fill: col }); else window.gsap.to(el, { fill: col, duration: dur(t, 0.6), delay: t.dl || 0 }); }
      else { timing(el, t, 0.6); el.style.fill = col; }
    }
    function count(el, to, o, snap) {
      const fmt = (v) => (o.pre || "") + (o.dec ? v.toFixed(o.dec) : Math.round(v).toLocaleString("en-US")) + (o.suf || "");
      if (el._raf) cancelAnimationFrame(el._raf);
      const from = el._v != null ? el._v : (o.from || 0);
      el._v = to;
      if (snap || reduced() || typeof requestAnimationFrame !== "function") { el.textContent = fmt(to); return; }
      const t0 = performance.now(), d = (o.d || 1.1) * 1000, dl = (o.dl || 0) * 1000;
      const stepF = (now) => { const p = clamp((now - t0 - dl) / d, 0, 1), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(from + (to - from) * e); if (p < 1) el._raf = requestAnimationFrame(stepF); };
      el._raf = requestAnimationFrame(stepF);
    }
    function ctx(scope, snap) {
      const q = (k) => (scope ? Array.prototype.slice.call(scope.querySelectorAll('[data-k="' + k + '"]')) : []);
      const c = {
        snap,
        op: (k, o, t = {}) => q(k).forEach((el) => op(el, o, t, snap)),
        mv: (k, st, t = {}) => q(k).forEach((el) => tf(el, st, t, snap)),
        dr: (k, f, t = {}) => { q(k).forEach((el) => dash(el, f, t, snap)); q(k + "g").forEach((el) => op(el, f >= 1 ? 1 : 0, { dl: f >= 1 ? (t.dl || 0) + dur(t, 1.1) * 0.8 : 0, d: 0.3 }, snap)); },
        fl: (k, col, t = {}) => q(k).forEach((el) => fill(el, col, t, snap)),
        tx: (k, s) => q(k).forEach((el) => { if (el.textContent !== String(s)) el.textContent = String(s); }),
        cnt: (k, to, o = {}) => q(k).forEach((el) => count(el, to, o, snap)),
        // show/hide with an entrance offset (default: rise 12)
        in: (k, on, from, t = {}) => q(k).forEach((el) => { op(el, on ? 1 : 0, t, snap); tf(el, on ? {} : (from || { y: 12 }), t, snap); }),
        vis: (map, t = {}) => Object.keys(map).forEach((k) => q(k).forEach((el) => op(el, map[k] === true ? 1 : map[k] === false ? 0 : map[k], t, snap))),
        // reveal a numbered sequence p0..p(n-1) with connectors pa0..; upto = how many are visible
        seq: (p, n, upto, from) => { for (let i = 0; i < n; i++) { q(p + i).forEach((el) => { op(el, i < upto ? 1 : 0, { dl: i < upto ? 0.08 * i : 0 }, snap); tf(el, i < upto ? {} : (from || { y: 14 }), { dl: i < upto ? 0.08 * i : 0 }, snap); }); c.dr(p + "a" + i, i < upto - 1 ? 1 : 0, { dl: 0.1 * i }); } },
        all: (sel) => (scope ? Array.prototype.slice.call(scope.querySelectorAll(sel)) : []),
        opEl: (el, o, t = {}) => op(el, o, t, snap),
        mvEl: (el, st, t = {}) => tf(el, st, t, snap),
        flEl: (el, col, t = {}) => fill(el, col, t, snap)
      };
      return c;
    }
    function caption(k, snap) {
      const lab = root.querySelector(".w08-lab"), nn = root.querySelector(".w08-num"), bar = root.querySelector(".w08-bar i");
      const txt = labels[k] || "";
      if (lab && lab.textContent !== txt) { lab.textContent = txt; if (!snap && !reduced()) { lab.classList.remove("w08-in"); void lab.offsetWidth; lab.classList.add("w08-in"); } }
      if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
      if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
    }
    function render(k, snap) {
      if (!root) return;
      const b = beatOf(k), entering = b !== beatNow;
      const groups = Array.prototype.slice.call(root.querySelectorAll("[data-beat]"));
      if (snap) root.classList.add("w08-snap");
      groups.forEach((g, gi) => {
        const on = gi === b;
        op(g, on ? 1 : 0, { d: on ? 0.7 : 0.4, dl: on && entering && !snap ? 0.12 : 0 }, snap);
        tf(g, on ? {} : { x: gi < b ? -28 : 28, s: 0.97 }, { d: 0.8 }, snap);
        g.setAttribute("aria-hidden", on ? "false" : "true");
      });
      const B = beats[b], scope = groups[b];
      try {
        if (entering && !snap) {
          root.classList.add("w08-snap");
          B.render(ctx(scope, true), -1, k);
          void root.getBoundingClientRect();
          root.classList.remove("w08-snap");
        }
        B.render(ctx(scope, snap), k - B.from, k);
        if (cfg.always) cfg.always(ctx(root, snap), k, b);
      } catch (e) { if (window.console) console.warn("[VL W08 " + id + "]", e); }
      caption(k, snap);
      if (snap) { void root.getBoundingClientRect(); root.classList.remove("w08-snap"); }
      beatNow = b;
      root.setAttribute("data-moment", String(k));
    }
    function kill() { if (root && useG) { try { window.gsap.killTweensOf(root.querySelectorAll("[data-k],[data-beat]")); } catch (_) {} } }
    function mount(el) {
      const r = document.createElement("div");
      const rm = reduced();
      r.className = "vls-w08-" + id + " w08-root" + (useG ? " w08-gsap" : " w08-css") + (rm ? " w08-rm" : "");
      r.setAttribute("data-scene", id);
      const body = (cfg.back ? cfg.back() : "") + beats.map((B, b) => `<g data-beat="${b}" style="opacity:0">${B.draw()}</g>`).join("") + (cfg.front ? cfg.front() : "");
      r.innerHTML = '<div class="w08-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' + esc(cfg.desc) + '">' + body +
        '</svg></div><div class="w08-cap" aria-hidden="true"><span class="w08-num"></span><span class="w08-lab"></span><span class="w08-bar"><i></i></span></div>';
      if (typeof el.replaceChildren === "function") el.replaceChildren(r); else { el.innerHTML = ""; el.appendChild(r); }
      return r;
    }
    return {
      build(el) {
        if (!el || el.nodeType !== 1) return;
        kill(); useG = hasG(); beatNow = -1;
        root = mount(el);
        render(0, true);
      },
      step(i, n) { if (!root) return; render(mapK(i, n), false); },
      reset() { if (!root) return; kill(); beatNow = -1; render(0, true); }
    };
  }
  const SCENE_BG = [];
  // backdrop builder: bleed colour + soft pattern (keeps the figure full-bleed on any aspect ratio)
  const backdrop = (bg, line, kind = "grid") => R(-400, -300, 1200, 900, bg) + (kind === "grid"
    ? rep(30, (i) => P(`M${-400 + i * 40} -300 V700`, line, 1)) + rep(24, (i) => P(`M-400 ${-300 + i * 40} H800`, line, 1))
    : kind === "dots" ? rep(60, (i) => O(-380 + (i % 12) * 100, -270 + Math.floor(i / 12) * 180 + (i % 2) * 40, 2.4, line))
    : rep(34, (i) => P(`M${-400 + i * 40} -300 L${-160 + i * 40} 700`, line, 1)));

  // ============================================================
  // W8O1a · "UNDERSTAND BEFORE YOU IMPROVE"  ·  31 moments · 9 beats
  // Story: the hotel is rebuilt as an evidence question; the traveller's
  // 23 minutes trigger the investigation; the ten-phase road reaches
  // Understand; premature fixes are stamped "?"; the written procedure
  // misses the telephone call; the baseline dashboard, work vs waiting,
  // symptom vs cause, employees' corrections, and the evidence chain that
  // makes the later redesign defensible.
  // ============================================================
  {
    const id = "W8O1a", N = 31;
    const labels = [
      "Week 8: Understand", "Back at Qasr", "The difficult arrival", "Twenty-three minutes waiting",
      "A reason to investigate", "Strategy and architecture", "The Launch Pad", "Phase four of ten",
      "Evidence, not assumptions", "Redesign right now?", "Software or staffing?", "Neither yet justified",
      "Money on wrong problem", "The as-is model", "Work beyond procedures", "A telephone workaround",
      "The call belongs", "Measure the baseline", "Five baseline measures", "Visible work misleads",
      "Waiting between departments", "Value and delays", "Causes versus symptoms", "Employees disagree",
      "Exceptions and workarounds", "Findings both accept", "Baseline later challenged", "Evidence feeds Innovate",
      "Baseline proves value", "Defensible redesign", "How guests really arrive"
    ];
    const beats = [
      // Beat 1 · moments 0–1 · Adapted from benchmark 083 "The Process Architectural Motion"
      // https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion — an idea grows layer by layer into a structure.
      {
        from: 0, to: 1,
        draw: () => {
          let s = R(-400, 262, 1200, 400, "#dfe6ee") + P("M-400 262 H800", C.slate, 2);
          for (let i = 0; i < 5; i++) {
            const y = 226 - i * 36;
            s += H("f" + i, R(48, y, 150, 36, i % 2 ? C.navy : C.navy2, 3) + rep(4, (w) => R(60 + w * 35, y + 10, 22, 16, "#cfe0f0", 2)));
          }
          s += H("lit", rep(16, (i) => R(60 + (i % 4) * 35, 226 - Math.floor(i / 4) * 36 + 10, 22, 16, C.gold, 2, i % 3 === 1 ? 'class="a-blink"' : "")));
          s += H("roof", F("M38 82 L123 48 L208 82 Z", C.navy) + R(108, 230, 30, 32, C.gold, 3));
          s += H("sign", chip(123, 30, "Qasr Marina", { sz: 13, bg: C.gold, st: C.amber, fg: C.ink }));
          s += H("wk", chip(300, 48, "Week 8", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("tt", T(300, 104, "The Understand", 21, C.navy) + T(300, 132, "Phase", 21, C.navy));
          s += H("sub", chip(300, 176, "What happens today?", { sz: 14, st: C.orange, fg: C.orange }));
          s += H("post", P("M300 262 V206", C.amber, 4) + chip(300, 228, "Turning point", { sz: 14, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("gst", `<g class="a-walk">${guest(236, 240, 1.1)}</g>`);
          return s;
        },
        render: (c, j) => {
          for (let i = 0; i < 5; i++) c.in("f" + i, j >= 0, { y: 40 }, { dl: i * 0.12 });
          c.in("roof", j >= 0, { y: -20 }, { dl: 0.6 });
          c.in("wk", j >= 0, { x: 20 }); c.in("tt", j >= 0, { x: 30 }, { dl: 0.2 }); c.in("sub", j >= 0, { y: 10 }, { dl: 0.4 });
          c.in("sign", j >= 1, { y: -14 }); c.op("lit", j >= 1 ? 1 : 0, { dl: 0.3 });
          c.in("post", j >= 1, { y: 20 }, { dl: 0.2 }); c.in("gst", j >= 1, { x: 40 }, { dl: 0.4 });
          c.op("sub", j >= 1 ? 0 : j >= 0 ? 1 : 0);
        }
      },
      // Beat 2 · moments 2–4 · Adapted from benchmark 001 "Interactive SVG Path & GSAP Animation"
      // https://codepen.io/WebGuyJeff/pen/rNdmqdO — trace a path, move a marker, highlight the destination.
      {
        from: 2, to: 4,
        draw: () => {
          const L = ["Guest|arrives", "Booking|checked", "Rate|confirmed", "Room not|ready"];
          let s = "";
          L.forEach((t, i) => {
            s += H("p" + i, node(8 + i * 98, 20, 84, 48, t, i === 3 ? { st: C.red, bg: C.peach, fg: C.red, sz: 14 } : { sz: 14 }));
            if (i < 3) s += darrow("pa" + i, 93 + i * 98, 44, 105 + i * 98, 44, C.slate, 2.6);
          });
          s += H("bad", badge(386, 22, 11, C.red, false));
          s += H("sw", watch(116, 188, 62) + hand(116, 172, 26, C.orange, 3, 3.4) + O(116, 172, 4, C.orange));
          s += H("swt", T(116, 242, "minutes", 14, C.navy));
          s += TK("mins", 116, 220, "0", 32, C.orange, "middle", 'style="opacity:0"');
          s += H("dr", door(262, 116, 76, 136) + P("M286 116 L300 98 L314 116", C.slate, 2));
          s += H("nr", chip(300, 160, "Not ready", { sz: 14, bg: C.red, st: C.red, fg: C.white, rx: 6 }));
          s += K("tok", guest(0, 0, 1.15));
          s += H("lz", lens(346, 44, 40, C.ink));
          s += H("why", chip(200, 282, "A reason to investigate", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.seq("p", 4, j >= 0 ? 4 : 0);
          c.in("bad", j >= 0, { s: 0.3 }, { dl: 1.1 });
          c.mv("tok", j < 0 ? { x: 20, y: 110 } : j === 0 ? { x: 340, y: 110 } : { x: 226, y: 236 }, { d: j === 0 ? 1.6 : 1.1, e: "power2.inOut" });
          c.op("tok", j >= 0 ? 1 : 0);
          c.in("sw", j >= 1, { s: 0.6 }); c.in("swt", j >= 1); c.op("mins", j >= 1 ? 1 : 0); c.cnt("mins", j >= 1 ? 23 : 0, { d: 1.6 });
          c.in("dr", j >= 1, { x: 30 }, { dl: 0.2 }); c.in("nr", j >= 1, { y: -30, r: -12 }, { dl: 0.9, e: "bounce.out" });
          c.in("lz", j >= 2, { s: 0.4, x: -60 }); c.in("why", j >= 2, { y: 16 }, { dl: 0.3 });
        }
      },
      // Beat 3 · moments 5–8 · Adapted from benchmark 017 "Design process timeline - Animation"
      // https://dribbble.com/shots/9892691-Design-process-timeline-Animation — milestones revealed in order along a road.
      {
        from: 5, to: 8,
        draw: () => {
          const X = [50, 125, 200, 275, 350];
          let s = P("M50 228 H350 Q386 228 386 178 Q386 128 350 128 H50", "#c9d5e1", 12) + P("M50 228 H350 Q386 228 386 178 Q386 128 350 128 H50", C.white, 2, 'stroke-dasharray="6 8"');
          s += D("road", "M50 228 H275", C.navy, 12);
          for (let i = 0; i < 10; i++) {
            const x = i < 5 ? X[i] : X[9 - i], y = i < 5 ? 228 : 128;
            s += O(x, y, 16, C.white, `stroke="${C.slate}" stroke-width="2"`) + T(x, y + 5, String(i + 1), 14, C.slate);
          }
          for (let i = 0; i < 3; i++) s += H("s" + i, O(X[i], 228, 16, C.navy) + T(X[i], 233, String(i + 1), 14, C.white));
          s += H("u4", O(275, 228, 22, C.orange) + T(275, 234, "4", 18, C.white));
          s += H("ring", O(0, 0, 25, "none", `stroke="${C.gold}" stroke-width="3" class="a-pulse"`));
          s += H("l0", chip(50, 268, "Strategy", { sz: 13 }));
          s += H("l1", chip(125, 188, "Architecture", { sz: 13 }));
          s += H("l2", chip(200, 268, "Launch Pad", { sz: 13 }) + P("M200 252 V246", C.navy, 2));
          s += H("l3", chip(275, 186, "Understand", { sz: 14, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("l4", chip(350, 268, "Innovate", { sz: 13, st: C.slate, fg: C.slate, dash: 1 }) + P("M300 228 H330", C.slate, 2, 'class="a-flow"'));
          s += H("ph", chip(100, 60, "Phase 4 of 10", { sz: 16, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("ev", chip(300, 46, "Evidence", { sz: 15, bg: C.green, st: C.green, fg: C.white }) + badge(364, 46, 10, C.green));
          s += H("as", chip(300, 88, "Assumptions", { sz: 14, st: C.slate, fg: C.slate }) + P("M244 88 H356", C.red, 3));
          return s;
        },
        render: (c, j) => {
          c.dr("road", j < 0 ? 0 : j === 0 ? 0.36 : j === 1 ? 0.68 : 1, { d: 1.2 });
          c.in("s0", j >= 0, { s: 0.3 }); c.in("s1", j >= 0, { s: 0.3 }, { dl: 0.3 }); c.in("s2", j >= 1, { s: 0.3 }, { dl: 0.4 });
          c.in("u4", j >= 2, { s: 0.3 }, { dl: 0.5, e: "back.out(2)" });
          c.in("l0", j >= 0); c.in("l1", j >= 0, { y: -12 }, { dl: 0.3 }); c.in("l2", j >= 1, {}, { dl: 0.4 }); c.in("l3", j >= 2, { y: -12 }, { dl: 0.6 });
          const rx = j <= 0 ? 125 : j === 1 ? 200 : 275;
          c.mv("ring", { x: rx, y: 228 }, { d: 1 }); c.op("ring", j >= 0 ? 1 : 0);
          c.in("ph", j >= 2, { x: -30 }); c.in("ev", j >= 3, { x: 30 }); c.in("as", j >= 3, { x: 30 }, { dl: 0.25 }); c.in("l4", j >= 3, {}, { dl: 0.4 });
        }
      },
      // Beat 4 · moments 9–12 · Adapted from benchmark 035 "Explainer Video Kit"
      // https://motionarray.com/after-effects-templates/explainer-video-18242/ — introduce actor, show the problem, switch to (premature) solutions.
      {
        from: 9, to: 12,
        draw: () => {
          let s = H("gm", person(64, 186, 1.9, C.plum) + F("M92 150 L118 136 L118 168 Z", C.plum) + R(84, 146, 10, 10, C.plum, 2) + P("M124 140 q8 12 0 24 M132 134 q12 18 0 36", C.plum, 2.4, 'class="a-blink"'));
          s += H("bb", bubble(14, 50, 150, 40, "Redesign now!", { sz: 16, st: C.plum, fg: C.plum, tx: 40 }));
          s += H("cl", R(36, 220, 52, 36, C.white, 3, `stroke="${C.orange}" stroke-width="2"`) + P("M36 220 L62 240 L88 220", C.orange, 2) + chip(62, 276, "Guest complaint", { sz: 13, st: C.orange, fg: C.orange }));
          s += H("ca", R(186, 36, 96, 114, C.white, 10, `stroke="${C.navy}" stroke-width="2.4"`) + monitor(234, 76, 1.5) + T(234, 124, "New", 15, C.navy) + T(234, 140, "software", 15, C.navy));
          s += H("cb", R(294, 36, 96, 114, C.white, 10, `stroke="${C.navy}" stroke-width="2.4"`) + person(320, 88, 0.8, C.green) + person(342, 84, 0.8, C.navy2) + person(364, 88, 0.8, C.green) + T(342, 124, "Staffing", 15, C.navy) + T(342, 140, "change", 15, C.navy));
          s += H("qa", O(276, 40, 16, C.orange) + T(276, 47, "?", 20, C.white));
          s += H("qb", O(384, 40, 16, C.orange) + T(384, 47, "?", 20, C.white));
          s += H("nj", chip(288, 176, "Not yet justified", { sz: 14, st: C.orange, fg: C.orange, dash: 1 }));
          s += rep(5, (i) => H("co" + i, coin(150 + i * 34, 238 + (i % 2 ? 8 : -6), 9)));
          s += H("tg", O(346, 240, 32, C.white, `stroke="${C.red}" stroke-width="4"`) + O(346, 240, 20, C.white, `stroke="${C.red}" stroke-width="4"`) + O(346, 240, 7, C.red));
          s += H("dart", P("M300 196 L372 214", C.ink, 3) + head(374, 214, 14, C.ink));
          s += H("wp", chip(236, 282, "Wrong problem?", { sz: 14, bg: C.red, st: C.red, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.in("gm", j >= 0, { x: -40 }); c.in("bb", j >= 0, { s: 0.5 }, { dl: 0.3, e: "back.out(2)" }); c.in("cl", j >= 0 && j < 3, { y: 30, r: -20 }, { dl: 0.5 });
          c.in("ca", j >= 1, { y: -60, r: -8 }, { e: "back.out(1.6)" }); c.in("cb", j >= 1, { y: -60, r: 8 }, { dl: 0.2, e: "back.out(1.6)" });
          c.op("ca", j >= 1 ? (j >= 3 ? 0.45 : 1) : 0); c.op("cb", j >= 1 ? (j >= 3 ? 0.45 : 1) : 0);
          c.in("qa", j >= 2, { s: 2.2 }, { e: "back.out(2)" }); c.in("qb", j >= 2, { s: 2.2 }, { dl: 0.15, e: "back.out(2)" }); c.in("nj", j >= 2, {}, { dl: 0.3 });
          for (let i = 0; i < 5; i++) c.in("co" + i, j >= 3, { x: -110 + i * 4, y: 20 }, { dl: 0.12 * i });
          c.in("tg", j >= 3, { s: 0.5 }); c.in("dart", j >= 3, { x: -60, y: -20 }, { dl: 0.7 }); c.in("wp", j >= 3, {}, { dl: 1 });
        }
      },
      // Beat 5 · moments 13–16 · Adapted from benchmark 089 "Git Workflow 1"
      // https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5 — a branch appears off the main line, then merges back.
      {
        from: 13, to: 16,
        draw: () => {
          let s = H("wp", chip(80, 22, "Written procedure", { sz: 13, st: C.slate, fg: C.slate }));
          s += H("pr", node(12, 36, 86, 46, "Find|booking", { st: C.slate }) + node(204, 36, 86, 46, "Confirm|rate", { st: C.slate }) + node(300, 36, 86, 46, "Continue|check-in", { st: C.slate }) + arrow(99, 59, 202, 59, C.slate, 2.2) + arrow(291, 59, 298, 59, C.slate, 2));
          s += H("gap", R(108, 36, 86, 46, "none", 8, `stroke="${C.orange}" stroke-width="2" stroke-dasharray="5 4"`) + O(151, 59, 13, C.orange) + T(151, 64, "?", 15, C.white));
          s += H("aw", chip(62, 262, "As-is model", { sz: 14, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("a0", node(12, 190, 86, 46, "Find|booking", { sz: 13 }));
          s += H("a1u", node(108, 190, 86, 46, "Unwritten|step", { st: C.orange, fg: C.orange, dash: 1 }));
          s += H("a1t", node(108, 190, 86, 46, "Telephone|colleague", { st: C.orange, bg: C.peach, fg: C.ink, sw: 2.6 }));
          s += H("a2", node(204, 190, 86, 46, "Confirm|rate"));
          s += H("a3", node(300, 190, 86, 46, "Continue|check-in"));
          s += darrow("aa0", 99, 213, 106, 213) + darrow("aa1", 195, 213, 202, 213) + darrow("aa2", 291, 213, 298, 213);
          s += H("rec", person(84, 158, 1.15, C.navy) + monitor(124, 150, 1) + cross(124, 146, 0.8, C.red, 3));
          s += H("ph", `<g class="a-ring">${phone(162, 132, 1.1, C.orange)}</g>`);
          s += D("call", "M178 132 Q240 108 296 132", C.orange, 2.6, 'stroke-dasharray="5 5"');
          s += H("col", person(318, 158, 1.15, C.green) + doc(336, 126, 24, 30, C.green));
          s += H("nis", chip(232, 166, "Info not in system", { sz: 13, st: C.red, fg: C.red }));
          s += H("gw", clock(196, 262, 13) + chip(272, 262, "Guest waits", { sz: 14, st: C.orange, fg: C.orange }));
          return s;
        },
        render: (c, j) => {
          c.in("wp", j >= 0); c.in("pr", j >= 0, { y: -12 }); c.in("aw", j >= 0, { x: -20 }, { dl: 0.3 });
          ["a0", "a2", "a3"].forEach((k, i) => c.in(k, j >= 0, { y: 14 }, { dl: 0.3 + i * 0.1 }));
          c.dr("aa0", j >= 1 ? 1 : 0); c.dr("aa1", j >= 1 ? 1 : 0, { dl: 0.2 }); c.dr("aa2", j >= 0 ? 1 : 0, { dl: 0.4 });
          c.in("a1u", j >= 1 && j < 3, { y: 30, s: 0.6 }, { e: "back.out(1.8)" }); c.in("gap", j >= 1, { s: 0.6 }, { dl: 0.4 });
          c.in("rec", j >= 2, { x: -20 }); c.in("ph", j >= 2, { s: 0.3 }, { dl: 0.2 }); c.dr("call", j >= 2 ? 1 : 0, { dl: 0.4 }); c.in("col", j >= 2, { x: 20 }, { dl: 0.6 }); c.in("nis", j >= 2, { y: -10 }, { dl: 0.8 });
          c.op("rec", j >= 2 ? (j >= 3 ? 0.35 : 1) : 0); c.op("col", j >= 2 ? (j >= 3 ? 0.35 : 1) : 0);
          c.in("a1t", j >= 3, { y: -80, s: 0.8 }, { e: "back.out(1.4)" }); c.in("gw", j >= 3, {}, { dl: 0.5 });
        }
      },
      // Beat 6 · moments 17–19 · Adapted from benchmark 037 "Workflow Dashboard – Interactive Motion Design"
      // https://dribbble.com/shots/27538364-Workflow-Dashboard-Interactive-Motion-Design — tiles load, progress bars fill.
      {
        from: 17, to: 19,
        draw: () => {
          const TL = [[10, 48, "Volumes"], [140, 48, "Elapsed time"], [270, 48, "Costs"], [75, 112, "Errors"], [205, 112, "Repeated|work"]];
          const ico = (i, x, y) => i === 0 ? O(x - 5, y + 3, 4, C.navy) + O(x + 5, y + 3, 4, C.navy) + O(x, y - 5, 4, C.navy)
            : i === 1 ? clock(x, y, 10, C.navy) : i === 2 ? coin(x, y, 10) : i === 3 ? O(x, y, 10, C.red) + cross(x, y, 0.6, C.white, 2.4)
            : P(`M${x - 8} ${y} a8 8 0 1 1 3 6`, C.orange, 3) + head(x - 6, y + 7, 140, C.orange, 0.8);
          let s = H("hd", chip(200, 22, "Baseline: before changes", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }));
          TL.forEach(([x, y, t], i) => {
            const L = t.split("|");
            s += H("t" + i, R(x, y, 120, 56, C.white, 10, `stroke="${C.navy}" stroke-width="1.8"`) + ico(i, x + 20, y + 22) + L.map((l, li) => T(x + 74, y + (L.length > 1 ? 21 : 28) + li * 15, l, 13, C.ink)).join("") + R(x + 10, y + 44, 100, 6, "#e3e9ef", 3));
            s += H("m" + i, R(x + 10, y + 44, 100, 6, i === 1 || i === 4 ? C.orange : C.green, 3));
          });
          s += H("clip", R(150, 56, 100, 118, C.white, 8, `stroke="${C.navy}" stroke-width="3"`) + R(178, 48, 44, 16, C.navy, 4) + P("M166 96 H234 M166 118 H234 M166 140 H214", C.muted, 4) + tick(176, 96, 0.6, C.green, 2.6) + chip(200, 190, "Today's performance", { sz: 13, st: C.navy }));
          s += H("tl", P("M40 234 H360", C.slate, 3) + O(100, 234, 7, C.navy) + chip(100, 262, "Before", { sz: 14, bg: C.navy, st: C.navy, fg: C.white }) + O(300, 234, 7, C.white, `stroke="${C.slate}" stroke-width="2" stroke-dasharray="3 3"`) + chip(300, 262, "After", { sz: 14, st: C.slate, fg: C.slate, dash: 1 }));
          s += H("dark", R(-400, 180, 1200, 400, C.night, 0, 'opacity=".92"') + F("M262 182 L214 292 L330 292 Z", "rgba(255,236,170,.30)"));
          s += H("desk", desk(232, 256, 64) + person(264, 252, 0.9, C.navy2));
          s += H("bino", person(52, 268, 1.1, C.plum) + R(66, 236, 16, 9, C.plum, 3) + R(66, 247, 16, 9, C.plum, 3));
          s += H("le", chip(264, 206, "Looks efficient", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
          s += H("ov", chip(110, 206, "Visible work only", { sz: 13, bg: C.night, st: C.gold, fg: C.gold }));
          return s;
        },
        render: (c, j) => {
          c.in("hd", j >= 0, { y: -10 });
          c.in("tl", j >= 0 && j < 2, { y: 14 }, { dl: 0.3 }); c.in("clip", j === 0, { s: 0.7 });
          for (let i = 0; i < 5; i++) {
            c.in("t" + i, j >= 1, { y: 18, s: 0.9 }, { dl: 0.1 * i });
            c.op("m" + i, j >= 1 ? 1 : 0, { dl: 0.1 * i });
            c.mv("m" + i, { sx: j >= 1 ? [0.55, 0.85, 0.45, 0.3, 0.6][i] : 0.02, pv: [(i < 3 ? [10, 140, 270][i] : [75, 205][i - 3]) + 10, 0] }, { d: 1.2, dl: 0.3 + 0.1 * i });
          }
          c.vis({ dark: j >= 2 ? 1 : 0, desk: j >= 2, bino: j >= 2 });
          c.in("le", j >= 2, { y: -10 }, { dl: 0.4 }); c.in("ov", j >= 2, { x: -20 }, { dl: 0.6 });
        }
      },
      // Beat 7 · moments 20–22 · Adapted from benchmark 126 "Stacked-to-grouped bars"
      // https://observablehq.com/@d3/stacked-to-grouped-bars — segments keep identity while they grow and regroup.
      {
        from: 20, to: 22,
        draw: () => {
          const SEG = [[20, 50, C.navy, "Work"], [70, 120, C.orange, "Waiting"], [190, 50, C.navy, "Work"], [240, 100, C.orange, "Waiting"], [340, 40, C.green, "Outcome"]];
          let s = "";
          SEG.forEach(([x, w, col, t], i) => {
            s += H("g" + i, R(x, 90, w, 30, col, 4));
            s += H("gl" + i, T(x + w / 2, 80, t, 13, col));
          });
          s += H("dp", person(45, 156, 0.85, C.navy) + person(215, 156, 0.85, C.green));
          s += H("bt", chip(130, 140, "Between teams", { sz: 13, st: C.orange, fg: C.orange }) + chip(290, 140, "Between teams", { sz: 13, st: C.orange, fg: C.orange }));
          s += H("v", star(45, 46, 11) + star(215, 46, 11) + chip(130, 20, "Value created", { sz: 13, st: C.green, fg: C.green }));
          s += H("x", P("M120 46 h10 m8 0 h10", C.red, 3) + P("M280 46 h10 m8 0 h10", C.red, 3) + chip(300, 20, "Info delayed", { sz: 13, st: C.red, fg: C.red }));
          s += H("br", P("M70 186 V196 H190 V186 M240 186 V196 H340 V186 M130 196 V212 M290 196 V212 M130 212 H290", C.orange, 2.4) + chip(210, 236, "Most of the time", { sz: 15, bg: C.orange, st: C.orange, fg: C.white }) + clock(108, 236, 16));
          s += H("gr", R(-400, 226, 1200, 400, "#e9dfcc") + P("M-400 226 H800", C.amber, 3));
          s += H("sy", guest(176, 208, 1, C.navy2) + clock(214, 196, 11) + chip(70, 200, "Symptom", { sz: 14, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("ca", R(150, 246, 56, 36, "none", 6, `stroke="${C.navy}" stroke-width="2" stroke-dasharray="5 4"`) + T(178, 270, "?", 20, C.navy) + P("M178 226 V246", C.navy, 2, 'stroke-dasharray="3 3"') + chip(70, 264, "Cause", { sz: 14, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("lz", `<g class="a-bob">${lens(300, 258, 22, C.ink)}</g>` + chip(318, 200, "Look beneath", { sz: 13, st: C.ink, fg: C.ink }));
          return s;
        },
        render: (c, j) => {
          const SX = [20, 70, 190, 240, 340];
          for (let i = 0; i < 5; i++) {
            c.op("g" + i, j >= 0 ? 1 : 0, { dl: 0.25 * i });
            c.mv("g" + i, { sx: j >= 0 ? 1 : 0.02, pv: [SX[i], 105] }, { d: 0.7, dl: 0.25 * i });
            c.in("gl" + i, j >= 0, { y: 8 }, { dl: 0.25 * i + 0.2 });
          }
          c.in("dp", j >= 0 && j < 2, {}, { dl: 0.8 }); c.in("bt", j >= 0 && j < 2, {}, { dl: 1 }); c.in("br", j === 0, { y: 16 }, { dl: 1.4 });
          c.in("v", j >= 1, { y: -14 }); c.in("x", j >= 1, { y: -14 }, { dl: 0.3 });
          c.in("gr", j >= 2, { y: 40 }); c.in("sy", j >= 2, { x: -20 }, { dl: 0.2 }); c.in("ca", j >= 2, { y: 20 }, { dl: 0.4 }); c.in("lz", j >= 2, { x: 40 }, { dl: 0.6 });
        }
      },
      // Beat 8 · moments 23–26 · Adapted from benchmark 109 "teamwork"
      // https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6 — people appear and assemble into one team.
      {
        from: 23, to: 26,
        draw: () => {
          let s = H("bd", chip(91, 26, "Official version", { sz: 13, st: C.plum, fg: C.plum }) + R(16, 40, 150, 96, C.white, 8, `stroke="${C.plum}" stroke-width="2"`) + R(28, 74, 30, 22, C.lilac, 3) + R(76, 74, 30, 22, C.lilac, 3) + R(124, 74, 30, 22, C.lilac, 3) + P("M58 85 H76 M106 85 H124", C.plum, 2));
          s += H("bx", R(52, 104, 30, 22, "none", 3, `stroke="${C.orange}" stroke-width="2" stroke-dasharray="4 3"`) + R(100, 104, 30, 22, "none", 3, `stroke="${C.orange}" stroke-width="2" stroke-dasharray="4 3"`) + P("M67 96 V104 M115 96 V104", C.orange, 2));
          s += K("mg", person(52, 196, 1.4, C.plum));
          s += K("em", person(258, 196, 1.3, C.navy2) + person(306, 196, 1.3, C.green) + person(354, 196, 1.3, C.orange), 'style="opacity:0"');
          s += H("eb", bubble(232, 98, 150, 40, "Not how it works", { sz: 14, st: C.orange, fg: C.orange, tx: 70 }));
          s += H("c1", chip(180, 254, "Exceptions", { sz: 14, st: C.orange, fg: C.orange }));
          s += H("c2", chip(300, 254, "Workarounds", { sz: 14, st: C.orange, fg: C.orange }));
          s += H("tb", R(150, 216, 120, 12, C.amber, 4) + R(160, 228, 8, 26, C.amber) + R(252, 228, 8, 26, C.amber) + doc(186, 196, 48, 20, C.green, C.white, 1));
          s += H("sf", chip(210, 282, "Shared findings", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
          s += H("pl", R(240, 30, 140, 56, "#e8e2d4", 8, `stroke="${C.slate}" stroke-width="2"`) + T(310, 64, "Baseline", 18, C.slate) + P("M300 30 L292 48 L306 58 L296 86", C.red, 3));
          s += H("bc", chip(310, 112, "Challenged later", { sz: 14, bg: C.red, st: C.red, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.in("bd", j >= 0, { x: -20 }); c.op("mg", 1); c.op("em", j >= 0 ? 1 : 0, { dl: 0.2 });
          c.in("eb", j >= 0 && j < 2, { s: 0.5 }, { dl: 0.5, e: "back.out(2)" });
          c.in("c1", j === 1, { x: 60, y: -50, s: 0.5 }, { dl: 0.1 }); c.in("c2", j === 1, { x: 30, y: -50, s: 0.5 }, { dl: 0.3 });
          c.in("bx", j >= 1, { s: 0.5 }, { dl: 0.6 });
          c.mv("mg", j >= 2 ? { x: 70 } : {}, { d: 1 }); c.mv("em", j >= 2 ? { x: -30 } : {}, { d: 1 });
          c.in("tb", j >= 2, { y: 20 }, { dl: 0.4 }); c.in("sf", j >= 2, {}, { dl: 0.7 });
          c.op("sf", j === 2 ? 1 : j === 3 ? 0.35 : 0);
          c.in("pl", j >= 3, { y: -20 }); c.in("bc", j >= 3, { s: 0.6 }, { dl: 0.5, e: "back.out(2)" });
        }
      },
      // Beat 9 · moments 27–30 · Adapted from benchmark 004 "SVG Timeline + ScrollTrigger + Paths"
      // https://codepen.io/ruru_wang/pen/VwOPzgy — successive paths draw and expose connected nodes (here driven by narration, not scroll).
      {
        from: 27, to: 30,
        draw: () => {
          const L = ["Understand|baseline", "Innovate|design", "Implement|changes", "Realize|Value"];
          let s = "";
          L.forEach((t, i) => {
            s += H("n" + i, node(10 + i * 98, 36, 86, 50, t, i === 0 ? { bg: C.orange, st: C.orange, fg: C.white, sz: 14 } : { sz: 14 }));
            if (i < 3) s += darrow("na" + i, 97 + i * 98, 61, 107 + i * 98, 61, C.navy, 2.6);
          });
          s += dcurve("ret", "M347 88 Q347 140 200 140 Q53 140 53 94", 53, 88, -90, C.green, 2.8);
          s += H("cmp", chip(200, 140, "Compare results", { sz: 13, st: C.green, fg: C.green }));
          s += H("evf", doc(40, 168, 74, 96, C.orange, C.white, 4) + chip(77, 282, "Evidence", { sz: 13, bg: C.orange, st: C.orange, fg: C.white }) + P("M124 216 H246", C.orange, 3, 'class="a-flow"') + head(252, 216, 0, C.orange) + R(262, 168, 110, 96, "#2d6a9f", 6) + P("M276 190 H356 M276 210 H330 M300 230 H356", "#cfe0f0", 2) + R(276, 222, 18, 18, "none", 2, 'stroke="#cfe0f0" stroke-width="2"') + chip(317, 282, "New design", { sz: 13, st: C.navy }));
          s += H("sh", shield(110, 214, 2.2, C.green));
          s += H("dr", chip(258, 214, "Defensible redesign", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
          s += H("ht", hotel(30, 196, 120, 98));
          s += H("lz", `<g class="a-bob">${lens(90, 262, 26, C.orange)}</g>`);
          s += H("q", chip(270, 236, "How do guests arrive?", { sz: 15, st: C.orange, fg: C.orange }));
          return s;
        },
        render: (c, j) => {
          c.in("n0", j >= 0, { s: 0.6 }); c.in("evf", j === 0, { y: 20 }, { dl: 0.6 }); c.in("n1", j >= 0, { x: -20 }, { dl: 0.5 }); c.dr("na0", j >= 0 ? 1 : 0, { dl: 0.2 });
          c.in("n2", j >= 1, { x: -20 }); c.dr("na1", j >= 1 ? 1 : 0); c.in("n3", j >= 1, { x: -20 }, { dl: 0.4 }); c.dr("na2", j >= 1 ? 1 : 0, { dl: 0.3 });
          c.dr("ret", j >= 1 ? 1 : 0, { dl: 0.8, d: 1.3 }); c.in("cmp", j >= 1, {}, { dl: 1.4 });
          c.in("sh", j === 2, { s: 0.3 }, { e: "back.out(2)" }); c.in("dr", j === 2, { x: 30 }, { dl: 0.3 });
          c.in("ht", j >= 3, { y: 40 }); c.in("lz", j >= 3, { s: 0.4 }, { dl: 0.4 }); c.in("q", j >= 3, { x: 30 }, { dl: 0.6 });
        }
      }
    ];
    VL_SCENES[id] = makeScene({ id, N, labels, beats, back: () => backdrop("#eef3f8", "#dde6ef"),
      desc: "Understand before you improve: Qasr's hotel, the traveller's 23-minute arrival, the ten-phase road reaching Understand, premature fixes questioned, the written procedure missing a telephone workaround, a baseline dashboard, work versus waiting, symptom versus cause, employees' corrections and the evidence chain to Realize Value." });
    SCENE_BG.push([id, "#eef3f8"]);
  }

  // ============================================================
  // W8O1b · "THE PROCESS NOBODY WROTE DOWN"  ·  29 moments · 10 beats
  // Story: a tidy procedure binder opens to reveal hidden machinery; the
  // manager's four-step line; a four-lane swimlane builds itself and its
  // handoffs light up; eight steps, four handoffs, data typed three times;
  // the telephone workaround and its purpose; exception paths routed like
  // particles; the right level of detail; evidence vs explanation; staff
  // validation; and the observe-model-validate-investigate route.
  // ============================================================
  {
    const id = "W8O1b", N = 29;
    const labels = [
      "Why understand first", "Procedures hide work", "Ask the manager", "A tidy sequence",
      "Intended versus actual", "Follow every department", "A swimlane model", "Who performs what",
      "Handoffs exposed", "Eight steps, four handoffs", "Work waits at handoffs", "Rate needs a colleague",
      "A quick phone call", "This is a workaround", "Workarounds have purposes", "Omission looks faster",
      "Observe real arrivals", "Exceptional paths", "Discrepancies and approvals", "Complete yet clear",
      "The right detail", "Observed versus explained", "Accounts conflict", "Staff know dependencies",
      "Validation builds trust", "Not redesigning yet", "Then investigate performance", "Simple diagram? Ask",
      "Convenient or defensible?"
    ];
    const LN = [["Guest", C.navy2, "#e3edf7"], ["Reception", C.green, "#e3f1e9"], ["Revenue", C.orange, "#f8e6dc"], ["Rooms", C.plum, "#ece6f3"]];
    const LY = (i) => 34 + i * 62;
    const beats = [
      // Beat 1 · moments 0–2 · Adapted from benchmark 081 "Clean Workflow Visualization with Motion Graphics"
      // https://dribbble.com/shots/27600376-Clean-Workflow-Visualization-with-Motion-Graphics — a clean card opens to reveal the connected journey inside.
      {
        from: 0, to: 2,
        draw: () => {
          let s = H("inside", R(40, 40, 170, 220, "#22384f", 10) + `<g class="a-spin">${gear(92, 110, 26, C.gold, "#22384f")}</g>` + `<g class="a-spin" style="animation-direction:reverse">${gear(150, 150, 20, C.orange, "#22384f")}</g>` + `<g class="a-spin">${gear(98, 196, 18, C.green, "#22384f")}</g>` + phone(160, 220, 1.1, C.gold) + P("M60 240 Q120 228 190 244", C.gold, 2, 'class="a-flow"'));
          s += H("hid", chip(125, 282, "Hidden activity", { sz: 14, bg: C.orange, st: C.orange, fg: C.white }));
          s += K("cover", R(40, 40, 170, 220, C.navy, 10) + R(52, 52, 146, 196, "#2d6a9f", 6) + R(66, 92, 118, 50, C.white, 6) + T(125, 114, "Official", 16, C.navy) + T(125, 134, "procedure", 16, C.navy) + rep(3, (i) => P(`M76 ${172 + i * 18} H174`, "#9cc0e0", 3)), 'style="opacity:0"');
          s += H("t1", T(300, 96, "The process", 20, C.navy) + T(300, 122, "nobody", 20, C.orange) + T(300, 148, "wrote down", 20, C.navy));
          s += H("mgr", person(300, 236, 1.6, C.plum) + R(286, 250, 28, 4, C.plum));
          s += H("mb", bubble(234, 60, 156, 44, "Here is how...", { sz: 15, st: C.plum, fg: C.plum, tx: 60 }));
          s += H("q", O(352, 168, 18, C.orange) + T(352, 176, "?", 22, C.white) + chip(300, 136, "Busy evening too?", { sz: 13, st: C.orange, fg: C.orange }));
          return s;
        },
        render: (c, j) => {
          c.op("inside", j >= 0 ? 1 : 0);
          c.op("cover", j >= 0 ? 1 : 0); c.mv("cover", j >= 1 ? { sx: 0.06, pv: [40, 150] } : {}, { d: 1.1, e: "power2.inOut" });
          c.in("hid", j >= 1, { y: 14 }, { dl: 0.8 });
          c.in("t1", j === 0, { x: 30 }, { dl: 0.2 });
          c.in("mgr", j >= 2, { x: 30 }); c.in("mb", j >= 2, { s: 0.5 }, { dl: 0.3, e: "back.out(2)" }); c.in("q", j >= 2, { s: 0.5 }, { dl: 0.8 });
        }
      },
      // Beat 2 · moments 3–4 · Adapted from benchmark 009 "Modern Process Infographic Steps Animation Template"
      // https://elements.envato.com/steps-infographic-BUNKM3A — numbered milestones reveal, then activate one by one.
      {
        from: 3, to: 4,
        draw: () => {
          const L = ["Reservation|check", "Rate|confirmation", "Room|assignment", "Key|preparation"];
          let s = H("mh", chip(200, 22, "Manager's description", { sz: 14, bg: C.plum, st: C.plum, fg: C.white }));
          L.forEach((t, i) => {
            const x = 50 + i * 100;
            s += H("p" + i, O(x, 74, 20, C.plum) + T(x, 81, String(i + 1), 17, C.white) + node(x - 46, 102, 92, 46, t, { st: C.plum, sz: 13 }));
            if (i < 3) s += darrow("pa" + i, x + 22, 74, x + 78, 74, C.plum, 2.6);
          });
          s += H("st", `<g transform="rotate(-6 110 200)">${R(40, 180, 140, 34, "rgba(255,255,255,.9)", 6, `stroke="${C.plum}" stroke-width="2.6"`)}${T(110, 203, "Intended work", 16, C.plum)}</g>`);
          s += H("aw", R(220, 170, 160, 110, "none", 10, `stroke="${C.orange}" stroke-width="2.4" stroke-dasharray="7 5"`) + T(300, 214, "Actual work", 16, C.orange) + O(300, 246, 16, C.orange) + T(300, 253, "?", 19, C.white));
          return s;
        },
        render: (c, j) => {
          c.in("mh", j >= 0, { y: -10 }); c.seq("p", 4, j >= 0 ? 4 : 0, { x: -20 });
          c.in("st", j >= 1, { s: 1.6 }, { e: "back.out(1.6)" }); c.in("aw", j >= 1, { x: 30 }, { dl: 0.4 });
        }
      },
      // Beat 3 · moments 5–8 · Adapted from benchmark 034 "SaaS Platform & Workflow Motion"
      // https://dribbble.com/shots/27719724-SaaS-Platform-Workflow-Motion-UI-Concept — cards transition between states and re-flow across role lanes.
      {
        from: 5, to: 8,
        draw: () => {
          let s = "";
          LN.forEach(([n, col, bg], i) => { s += H("ln" + i, R(4, LY(i) - 26, 392, 56, bg, 8) + R(4, LY(i) - 26, 84, 56, col, 8) + T(46, LY(i) + 6, n, 14, C.white)); });
          const CD = [[0, 140, "Guest|arrives"], [1, 210, "Checks|booking"], [2, 280, "Rate|confirmed"], [3, 340, "Room|released"]];
          CD.forEach(([l, x, t], i) => { s += H("cd" + i, node(x - 34, LY(l) - 20, 68, 40, t, { st: LN[l][1], sz: 12 })); });
          s += dcurve("e0", `M158 ${LY(0) + 20} Q170 ${LY(1)} 176 ${LY(1)}`, 176, LY(1), 0, C.slate) + dcurve("e1", `M228 ${LY(1) + 20} Q240 ${LY(2)} 246 ${LY(2)}`, 246, LY(2), 0, C.slate) + dcurve("e2", `M298 ${LY(2) + 20} Q304 ${LY(3)} 306 ${LY(3)}`, 306, LY(3), 0, C.slate);
          s += H("hand", [[170, LY(1) - 30], [240, LY(2) - 30], [302, LY(3) - 30]].map(([x, y]) => O(x, y + 18, 13, C.gold, 'class="a-pulse"') + O(x, y + 18, 6, C.amber)).join(""));
          s += H("hlab", chip(300, LY(0), "Four handoffs", { sz: 13, bg: C.gold, st: C.amber, fg: C.ink }));
          s += H("eye", `<g class="a-bob">${lens(120, LY(1), 18, C.ink)}</g>`);
          return s;
        },
        render: (c, j) => {
          for (let i = 0; i < 4; i++) { c.in("ln" + i, j >= 0, { x: -60 }, { dl: 0.12 * i }); c.in("cd" + i, j >= 1, { y: -30 }, { dl: 0.2 + 0.18 * i, e: "back.out(1.4)" }); }
          for (let i = 0; i < 3; i++) c.dr("e" + i, j >= 1 ? 1 : 0, { dl: 0.6 + 0.2 * i });
          c.in("eye", j === 0, { s: 0.5 }, { dl: 0.6 });
          c.op("ln0", j >= 0 ? (j === 2 ? 1 : 1) : 0);
          c.vis({ hand: j >= 3 }); c.in("hlab", j >= 3, { x: 20 }, { dl: 0.3 });
          if (j === 2) for (let i = 0; i < 4; i++) c.mv("ln" + i, { x: 6 }, { dl: 0.15 * i, d: 0.4 });
        }
      },
      // Beat 4 · moments 9–10 · Adapted from benchmark 113 "Infographic Chart Creator"
      // https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/ — counters roll up and columns grow.
      {
        from: 9, to: 10,
        draw: () => {
          const CT = [[70, "8", "steps", C.navy], [200, "4", "lanes", C.green], [330, "4", "handoffs", C.orange]];
          let s = "";
          CT.forEach(([x, v, t, col], i) => { s += H("ct" + i, O(x, 66, 44, C.white, `stroke="${col}" stroke-width="4"`) + T(x, 102 + 26, t, 15, col)) + TK("cn" + i, x, 82, "0", 40, col, "middle", 'style="opacity:0"'); });
          s += rep(3, (i) => H("fm" + i, R(40 + i * 120, 160, 90, 96, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + T(85 + i * 120, 182, "Guest data", 13, C.navy) + rep(3, (r) => R(52 + i * 120, 192 + r * 18, 66, 10, "#e3e9ef", 3)) + P(`M52 ${266} h66`, C.slate, 0)));
          s += rep(3, (i) => H("ty" + i, rep(3, (r) => R(52 + i * 120, 192 + r * 18, 66, 10, C.orange, 3)) + chip(85 + i * 120, 276, "Typed " + ["once", "again", "again"][i], { sz: 12, st: C.orange, fg: C.orange })));
          s += H("wt", R(20, 150, 360, 140, "rgba(255,255,255,.96)", 12, `stroke="${C.slate}" stroke-width="1.6"`) + node(36, 186, 100, 50, "Reception|done", { st: C.green, sz: 13 }) + badge(130, 190, 10, C.green) + arrow(140, 211, 210, 211, C.slate, 2.6) + person(250, 232, 1.4, C.orange) + clock(296, 186, 16) + chip(286, 272, "Can't proceed yet", { sz: 13, bg: C.orange, st: C.orange, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          const V = [8, 4, 4];
          for (let i = 0; i < 3; i++) { c.in("ct" + i, j >= 0, { s: 0.5 }, { dl: 0.15 * i, e: "back.out(1.6)" }); c.op("cn" + i, j >= 0 ? 1 : 0, { dl: 0.15 * i }); c.cnt("cn" + i, j >= 0 ? V[i] : 0, { d: 1.2, dl: 0.2 * i }); }
          for (let i = 0; i < 3; i++) { c.in("fm" + i, j === 0, { y: 30 }, { dl: 0.6 + 0.2 * i }); c.in("ty" + i, j === 0, { y: 0 }, { dl: 1 + 0.4 * i }); }
          c.in("wt", j >= 1, { y: 40 }, { e: "power2.out" });
        }
      },
      // Beat 5 · moments 11–13 · Adapted from benchmark 013 "Workflow Animation"
      // https://dribbble.com/shots/3791748-Workflow-Animation — an event token transfers to the next stage and a notification returns.
      {
        from: 11, to: 13,
        draw: () => {
          let s = desk(30, 214, 120) + person(90, 206, 1.5, C.green) + monitor(60, 168, 1.6);
          s += H("lk", lock(60, 166, 1.1, C.red) + chip(78, 124, "Corporate rate?", { sz: 13, st: C.red, fg: C.red }));
          s += H("need", P("M120 200 H286", C.slate, 2.4, 'stroke-dasharray="6 6"') + chip(204, 82, "Needs authority", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }) + key(204, 120, 1.6, C.gold));
          s += person(320, 206, 1.5, C.orange) + desk(270, 214, 110) + T(325, 272, "Authorised", 13, C.orange) + T(325, 288, "colleague", 13, C.orange);
          s += H("ph", `<g class="a-ring">${phone(130, 148, 1.3, C.orange)}</g>`);
          s += dcurve("go", "M150 140 Q220 80 300 140", 300, 140, 40, C.orange, 2.8);
          s += K("tok", R(-14, -9, 28, 18, C.white, 4, `stroke="${C.orange}" stroke-width="2"`) + P("M-14 -9 L0 2 L14 -9", C.orange, 2), 'style="opacity:0"');
          s += H("ok", bubble(250, 48, 120, 36, "Rate confirmed", { sz: 13, st: C.green, fg: C.green, tx: 70 }) + badge(64, 166, 14, C.green));
          s += H("wd", R(110, 6, 260, 40, C.white, 10, `stroke="${C.orange}" stroke-width="2.4"`) + T(240, 32, "Workaround: informal fix", 15, C.orange));
          s += H("gk", `<g class="a-walk">${guest(196, 250, 1.1)}</g>`);
          return s;
        },
        render: (c, j) => {
          c.in("lk", j >= 0 && j < 2, { s: 0.4 }, { e: "back.out(2)" }); c.in("need", j === 0, { y: -16 }, { dl: 0.4 });
          c.in("ph", j >= 1, { s: 0.3 });
          c.dr("go", j >= 1 ? 1 : 0, { dl: 0.3 });
          c.op("tok", j >= 1 ? 1 : 0); c.mv("tok", j >= 1 ? { x: 300, y: 120 } : { x: 150, y: 130 }, { d: 1.4, dl: 0.3, e: "power2.inOut" });
          c.in("ok", j >= 1, { s: 0.5 }, { dl: 1.6, e: "back.out(2)" });
          c.in("wd", j >= 2, { y: -20 }); c.in("gk", j >= 0, { x: -40 }, { dl: 0.4 });
        }
      },
      // Beat 6 · moments 14–16 · Adapted from benchmark 058 "SVGator animated UI templates" (before/after toggle)
      // https://www.svgator.com/blog/animated-ui-templates-you-can-customize/ — a toggle flips between two states of the same object.
      {
        from: 14, to: 16,
        draw: () => {
          let s = H("br", R(30, 130, 120, 22, C.navy2, 4) + R(250, 130, 120, 22, C.navy2, 4) + chip(90, 100, "Reception system", { sz: 12 }) + chip(310, 100, "Rate information", { sz: 12 }) + R(150, 136, 100, 10, C.orange, 3, 'class="a-pulse"') + T(200, 176, "Missing link", 15, C.red));
          s += H("wr", `<g transform="rotate(-20 200 120)">${R(170, 112, 60, 14, C.slate, 6)}${O(166, 119, 13, "none", `stroke="${C.slate}" stroke-width="6"`)}</g>` + chip(200, 222, "Practical response", { sz: 15, bg: C.green, st: C.green, fg: C.white }) + chip(200, 262, "Not a mistake", { sz: 14, st: C.green, fg: C.green }));
          s += H("cmp", T(30, 76, "Model without call", 14, C.slate, "", "start") + R(30, 86, 150, 26, C.slate, 5) + T(30, 156, "What guests live", 14, C.orange, "", "start") + R(30, 166, 300, 26, C.orange, 5) + R(180, 166, 150, 26, "#e9a184", 0) + T(255, 184, "+ call", 14, C.white) + chip(200, 236, "Simpler, faster, wrong", { sz: 15, bg: C.red, st: C.red, fg: C.white }));
          s += H("ob", person(56, 230, 1.7, C.plum) + doc(80, 196, 32, 42, C.plum) + R(130, 92, 256, 170, C.white, 12, `stroke="${C.navy}" stroke-width="2.4"`) + R(130, 92, 256, 26, C.navy, 12) + R(130, 106, 256, 12, C.navy) + T(258, 111, "Live: lobby", 13, C.white) + `<g class="a-blink">${O(370, 105, 5, C.red)}</g>` + desk(220, 200, 110) + person(275, 194, 1.3, C.green) + `<g class="a-walk">${guest(176, 240, 1.3)}</g>` + guest(150, 240, 1, C.slate) + phone(320, 160, 1, C.orange) + chip(258, 282, "Real arrivals", { sz: 14 }) + chip(110, 44, "Interviews only?", { sz: 13, st: C.slate, fg: C.slate, dash: 1 }) + P("M50 44 H170", C.red, 3) + chip(300, 44, "Procedure only?", { sz: 13, st: C.slate, fg: C.slate, dash: 1 }) + P("M242 44 H358", C.red, 3));
          return s;
        },
        render: (c, j) => {
          c.in("br", j === 0, { y: -16 }); c.in("wr", j === 0, { y: -60, r: 30 }, { dl: 0.5, e: "back.out(1.5)" });
          c.in("cmp", j === 1, { x: -30 });
          c.in("ob", j === 2, { x: 30 });
        }
      },
      // Beat 7 · moments 17–18 · Adapted from benchmark 030 "Sankey particles generation"
      // https://observablehq.com/@joaormendes/sankey-animation-particles-generation — particles choose weighted routes and travel to destinations.
      {
        from: 17, to: 18,
        draw: () => {
          let s = P("M20 96 H380", "#cbd7e3", 22) + P("M160 96 Q200 96 210 150 Q220 200 250 200 H300 Q330 200 340 150 Q348 108 380 96", "#f2d6c8", 18);
          s += H("dm", F("M160 72 L184 96 L160 120 L136 96 Z", C.navy) + T(160, 101, "?", 15, C.white) + chip(110, 40, "Information complete?", { sz: 13 }));
          s += H("nl", chip(310, 62, "Normal processing", { sz: 13, st: C.green, fg: C.green }));
          s += H("el", chip(275, 236, "Exception resolution", { sz: 13, bg: C.orange, st: C.orange, fg: C.white }));
          s += rep(10, (i) => `<circle data-k="pt${i}" cx="0" cy="0" r="6" fill="${i % 4 === 3 ? C.orange : C.navy2}" style="opacity:0"/>`);
          s += H("i0", R(28, 186, 76, 70, C.white, 8, `stroke="${C.orange}" stroke-width="2"`) + doc(48, 196, 22, 28, C.orange) + doc(58, 202, 22, 28, C.red) + T(66, 248, "Discrepancy", 11.5, C.orange));
          s += H("i1", R(28, 186, 76, 70, C.white, 8, `stroke="${C.orange}" stroke-width="2"`) + door(50, 196, 32, 38, C.slate, "#e3e9ef") + cross(66, 214, 0.9) + T(66, 248, "No room", 12, C.orange), 'transform="translate(0 0)"');
          s += H("i2", R(28, 186, 76, 70, C.white, 8, `stroke="${C.orange}" stroke-width="2"`) + `<g transform="rotate(-10 66 214)">${R(46, 204, 40, 20, "none", 4, `stroke="${C.red}" stroke-width="2.4"`)}${T(66, 219, "OK?", 12, C.red)}</g>` + T(66, 248, "No approval", 12, C.orange));
          return s;
        },
        render: (c, j) => {
          c.in("dm", j >= 0, { s: 0.4 }); c.in("nl", j >= 0, { x: 20 }, { dl: 0.3 }); c.in("el", j >= 0, { x: 20 }, { dl: 0.5 });
          for (let i = 0; i < 10; i++) {
            const ex = i === 3 || i === 7, XN = [40, 76, 112, 0, 210, 250, 290, 0, 330, 366];
            let x = j < 0 ? 20 : ex ? (i === 3 ? 236 : 296) : XN[i], y = j >= 0 && ex ? 200 : 96;
            c.op("pt" + i, j >= 0 ? 1 : 0, { dl: 0.05 * i }); c.mv("pt" + i, { x, y }, { d: 1.2, dl: 0.06 * i, e: "power1.inOut" });
          }
          c.in("i0", j >= 1, { x: -30 }); c.in("i1", j >= 1, { x: -30 }, { dl: 0.2 }); c.in("i2", j >= 1, { x: -30 }, { dl: 0.4 });
          c.mv("i1", j >= 1 ? { x: 86 } : {}, { dl: 0.2 }); c.mv("i2", j >= 1 ? { x: 172 } : {}, { dl: 0.4 });
          c.op("el", j >= 0 ? (j >= 1 ? 0 : 1) : 0);
        }
      },
      // Beat 8 · moments 19–21 · Adapted from benchmark 110 "Animated quadtree"
      // https://observablehq.com/@d3/animated-quadtree — regions subdivide to finer and finer levels of detail.
      {
        from: 19, to: 21,
        draw: () => {
          let s = H("lv0", R(20, 40, 110, 110, C.white, 8, `stroke="${C.slate}" stroke-width="2"`) + T(75, 100, "Arrival", 15, C.slate) + chip(75, 172, "Too vague", { sz: 13, st: C.slate, fg: C.slate }));
          s += H("lv2", R(270, 40, 110, 110, C.white, 8, `stroke="${C.slate}" stroke-width="2"`) + rep(64, (i) => R(274 + (i % 8) * 13, 44 + Math.floor(i / 8) * 13, 10, 10, i % 5 ? "#dfe6ee" : C.muted, 1)) + chip(325, 172, "Every keystroke", { sz: 13, st: C.slate, fg: C.slate }));
          s += H("lv1", R(145, 40, 110, 110, C.white, 8, `stroke="${C.green}" stroke-width="3"`) + R(152, 48, 46, 44, C.mint, 4) + R(202, 48, 46, 44, C.mint, 4) + R(152, 98, 46, 44, C.peach, 4) + R(202, 98, 46, 44, C.mint, 4) + arrow(198, 70, 202, 70, C.green, 2) + chip(200, 172, "Just right", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
          s += H("knob", P("M40 210 H360", C.slate, 4) + O(0, 0, 0, "none"));
          s += K("kn", O(0, 210, 11, C.orange, `stroke="${C.white}" stroke-width="3"`), 'style="opacity:0"');
          const TG = [["Activities", C.navy], ["Responsibilities", C.green], ["Handoffs", C.amber], ["Delays", C.orange]];
          TG.forEach(([t, col], i) => { s += H("tg" + i, chip(i < 2 ? 110 + i * 180 : 110 + (i - 2) * 180, i < 2 ? 238 : 274, t, { sz: 14, st: col, fg: col })); });
          s += H("sort", R(14, 40, 180, 230, C.white, 12, `stroke="${C.green}" stroke-width="2.4"`) + R(206, 40, 180, 230, C.white, 12, `stroke="${C.plum}" stroke-width="2.4" stroke-dasharray="7 5"`) + O(104, 104, 30, C.mint) + E(104, 104, 20, 11, C.white, `stroke="${C.green}" stroke-width="3"`) + O(104, 104, 6, C.green) + T(104, 166, "Observed", 17, C.green) + bubble(250, 76, 92, 46, "...", { sz: 20, st: C.plum, fg: C.plum, tx: 30 }) + T(296, 166, "Explained", 17, C.plum) + doc(70, 192, 34, 44, C.green) + doc(110, 196, 34, 44, C.green) + person(270, 236, 1, C.plum) + person(320, 236, 1, C.plum));
          return s;
        },
        render: (c, j) => {
          c.in("lv0", j >= 0 && j < 2, { s: 0.6 }); c.in("lv2", j >= 0 && j < 2, { s: 0.6 }, { dl: 0.2 }); c.in("lv1", j >= 0 && j < 2, { s: 0.6 }, { dl: 0.5 });
          c.op("lv0", j === 0 ? 1 : j === 1 ? 0.35 : 0); c.op("lv2", j === 0 ? 1 : j === 1 ? 0.35 : 0);
          c.op("knob", j >= 0 && j < 2 ? 1 : 0); c.op("kn", j >= 0 && j < 2 ? 1 : 0); c.mv("kn", { x: j === 0 ? 330 : 200 }, { d: 1.2, e: "back.out(1.2)" });
          for (let i = 0; i < 4; i++) c.in("tg" + i, j === 1, { y: 14 }, { dl: 0.4 + 0.15 * i });
          c.in("sort", j === 2, { s: 0.9 });
        }
      },
      // Beat 9 · moments 22–24 · Adapted from benchmark 073 "The Trouble With Food Safety Audits" (NYT)
      // https://www.nytimes.com/interactive/projects/documents/food-safety-peanut-inspection — annotated document highlights reveal discrepancies.
      {
        from: 22, to: 24,
        draw: () => {
          let s = H("ac", R(16, 30, 170, 120, C.white, 10, `stroke="${C.green}" stroke-width="2.4"`) + T(101, 56, "Observed activity", 14, C.green) + E(60, 98, 18, 10, C.white, `stroke="${C.green}" stroke-width="3"`) + O(60, 98, 5, C.green) + doc(96, 76, 34, 44, C.green) + badge(152, 98, 12, C.green));
          s += H("ex", R(214, 30, 170, 120, C.white, 10, `stroke="${C.plum}" stroke-width="2.4" stroke-dasharray="6 4"`) + T(299, 56, "Reported account", 14, C.plum) + person(254, 112, 1.2, C.plum) + bubble(280, 72, 80, 36, "Usually...", { sz: 13, st: C.plum, fg: C.plum, tx: 18 }));
          s += H("vs", O(200, 90, 16, C.orange) + T(200, 95, "≠", 16, C.white));
          s += H("more", chip(200, 178, "Check more cases", { sz: 14, bg: C.navy, st: C.navy, fg: C.white }) + rep(4, (i) => doc(120 + i * 44, 200, 30, 38, C.navy)));
          s += H("mdl", R(40, 30, 320, 150, C.white, 10, `stroke="${C.navy}" stroke-width="2.4"`) + T(200, 54, "Draft as-is model", 15, C.navy) + rep(4, (i) => R(62 + i * 76, 82, 56, 30, C.blue, 5) + (i < 3 ? arrow(118 + i * 76, 97, 136 + i * 76, 97, C.navy, 2) : "")));
          s += H("st0", `<g transform="rotate(-6 120 150)">${R(84, 132, 76, 36, "#fff1b8", 2)}${T(122, 155, "Add check", 12, C.ink)}</g>`);
          s += H("st1", `<g transform="rotate(5 270 150)">${R(232, 132, 80, 36, "#fff1b8", 2)}${T(272, 155, "Wait here", 12, C.ink)}</g>`);
          s += H("st2", P("M190 82 v30", C.orange, 3) + O(190, 74, 7, C.orange));
          s += H("ppl", person(110, 250, 1.4, C.navy2) + person(200, 250, 1.4, C.green) + person(290, 250, 1.4, C.orange));
          s += H("nr", chip(200, 282, "Model nobody recognises?", { sz: 14, bg: C.red, st: C.red, fg: C.white }));
          s += H("rc", chip(200, 282, "We recognise this", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.in("ac", j === 0, { x: -30 }); c.in("ex", j === 0, { x: 30 }, { dl: 0.2 }); c.in("vs", j === 0, { s: 0.3 }, { dl: 0.5, e: "back.out(2)" }); c.in("more", j === 0, { y: 20 }, { dl: 0.8 });
          c.in("mdl", j >= 1, { y: -20 }); c.in("ppl", j >= 1, { y: 30 }, { dl: 0.2 });
          c.in("st0", j >= 1, { y: 60, r: 20 }, { dl: 0.6, e: "back.out(1.5)" }); c.in("st1", j >= 1, { y: 60, r: -20 }, { dl: 0.9, e: "back.out(1.5)" }); c.in("st2", j >= 1, { s: 0.3 }, { dl: 1.1 });
          c.in("nr", j === 1, { y: 10 }, { dl: 1.4 }); c.in("rc", j === 2, { s: 0.6 }, { e: "back.out(1.8)" });
        }
      },
      // Beat 10 · moments 25–28 · Adapted from benchmark 136 "Project TimeLine"
      // https://motionarray.com/after-effects-templates/project-timeline-2424919/ — a marker advances along time markers.
      {
        from: 25, to: 28,
        draw: () => {
          const L = ["Observe|real work", "Model|activities", "Validate|with staff", "Investigate|performance"];
          let s = "";
          L.forEach((t, i) => { s += H("p" + i, node(8 + i * 98, 30, 88, 50, t, { sz: 13, st: i === 3 ? C.orange : C.navy })); if (i < 3) s += darrow("pa" + i, 97 + i * 98, 55, 105 + i * 98, 55, C.navy, 2.4); });
          s += H("stop", chip(110, 150, "Understand now", { sz: 16, bg: C.orange, st: C.orange, fg: C.white }) + arrow(186, 150, 226, 150, C.slate, 3) + chip(300, 150, "Redesign", { sz: 15, st: C.slate, fg: C.slate, dash: 1 }) + F("M276 186 l48 0 l34 34 l0 48 l-34 34 l-48 0 l-34 -34 l0 -48 Z", C.red, 'transform="translate(0 -6) scale(1)"') + T(300, 252, "NOT YET", 17, C.white));
          s += H("inv", `<g class="a-bob">${lens(130, 190, 34, C.orange)}</g>` + chip(280, 170, "Handoffs", { sz: 14, st: C.amber, fg: C.amber }) + chip(280, 210, "Exceptions", { sz: 14, st: C.orange, fg: C.orange }) + chip(280, 250, "Delays", { sz: 14, st: C.red, fg: C.red }));
          s += H("simp", R(30, 108, 160, 70, C.white, 10, `stroke="${C.slate}" stroke-width="2"`) + R(46, 132, 30, 22, C.blue, 4) + R(124, 132, 30, 22, C.blue, 4) + arrow(76, 143, 122, 143, C.slate, 2) + O(176, 116, 15, C.orange) + T(176, 122, "?", 17, C.white) + chip(280, 143, "Real work?", { sz: 15, st: C.orange, fg: C.orange }));
          s += H("sc", scale(200, 236, 1.5, C.navy) + chip(110, 262, "Convenient", { sz: 13, st: C.slate, fg: C.slate }) + chip(290, 262, "Defensible", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.seq("p", 4, j < 0 ? 0 : j === 0 ? 0 : 4);
          c.in("stop", j === 0, { s: 0.4 }, { e: "back.out(2)" });
          c.in("simp", j === 2, { x: -30 }); c.in("inv", j === 1, { y: 20 }, { dl: 0.5 });
          c.in("sc", j >= 3, { y: 30 });
          c.mv("sc", j >= 3 ? { r: 0 } : {}, {});
        }
      }
    ];
    VL_SCENES[id] = makeScene({ id, N, labels, beats, back: () => backdrop("#f2f4f7", "#e4e9ef", "dots"),
      desc: "The process nobody wrote down: a procedure binder reveals hidden work, a four-lane swimlane exposes four handoffs and data typed three times, a telephone workaround is drawn into the model, exceptions branch off the normal path, the right level of detail is chosen, and staff validate the as-is model before investigation." });
    SCENE_BG.push([id, "#f2f4f7"]);
  }

  // ============================================================
  // W8O1c · "FINDING EVIDENCE THAT PEOPLE CAN TRUST"  ·  33 moments · 10 beats
  // Story: the drawn model is challenged by the director; three sincere
  // perspectives; walking one real case end to end; receptionist vs
  // supervisor heard in separate rooms; interviews and observation
  // overlap; system timestamps hide unrecorded gaps; one quiet case vs a
  // meaningful sample; two accurate clocks with different boundaries;
  // staff correct the model and protect controls; transparent evidence
  // earns credibility, and the next lesson's clocks appear.
  // ============================================================
  {
    const id = "W8O1c", N = 33;
    const labels = [
      "Evidence people trust", "How do we know?", "The director objects", "Different memories",
      "Three sincere perspectives", "Evidence, not confidence", "Follow one arrival", "Walking a case",
      "Gaps between teams", "Receptionist needs help", "Supervisor: rare", "Interview them separately",
      "Pressure hides disagreement", "Compare with observation", "Recollection or variation?", "System timestamps",
      "Events, not everything", "Key time, not lobby", "Accurate but incomplete", "One quiet arrival",
      "One case isn't enough", "What sampling means", "Busy periods, approvals", "Explain the disagreement",
      "Boundaries explain conflicts", "Document the reasoning", "Staff correct the model", "Recognisable or worthless",
      "Controls, not delays", "No need to welcome", "Transparent, defensible", "Ready to measure",
      "Conflicting figures next"
    ];
    const beats = [
      // Beat 1 · moments 0–2 · Adapted from benchmark 033 "Animated Planning Dashboard Workflow"
      // https://dribbble.com/shots/27184988-Animated-Planning-Dashboard-Workflow — a character works beside sliding, pulsing panels.
      {
        from: 0, to: 2,
        draw: () => {
          let s = R(16, 30, 236, 170, C.white, 12, `stroke="${C.navy}" stroke-width="2.4"`) + T(134, 54, "Qasr as-is model", 15, C.navy);
          const NX = [[30, 80], [110, 80], [190, 80], [70, 140], [150, 140]];
          NX.forEach(([x, y], i) => { s += H("m" + i, R(x, y, 64, 34, i === 3 ? C.peach : C.blue, 6, `stroke="${i === 3 ? C.orange : C.navy}" stroke-width="1.6"`)); });
          s += H("ma", arrow(94, 97, 108, 97, C.navy, 2) + arrow(174, 97, 188, 97, C.navy, 2) + P("M222 114 V126 Q222 134 214 140 L222 140", C.navy, 2) + arrow(150, 157, 136, 157, C.navy, 2));
          s += H("hk", chip(134, 232, "How do we know?", { sz: 16, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("ev", rep(5, (i) => O(NX[i][0] + 58, NX[i][1] + 4, 9, C.gold) + T(NX[i][0] + 58, NX[i][1] + 9, "?", 12, C.ink)));
          s += H("dir", person(326, 220, 2, C.plum) + P("M300 222 L352 222", C.plum, 6) + chip(326, 284, "Director", { sz: 12, st: C.plum, fg: C.plum }));
          s += H("db", bubble(270, 60, 120, 50, "Really?", { sz: 18, st: C.plum, fg: C.plum, tx: 60 }));
          s += H("bolt", F("M262 130 L250 160 L262 160 L254 186 L276 150 L264 150 L272 130 Z", C.orange));
          return s;
        },
        render: (c, j) => {
          for (let i = 0; i < 5; i++) c.in("m" + i, j >= 0, { s: 0.5 }, { dl: 0.1 * i });
          c.in("ma", j >= 0, {}, { dl: 0.6 });
          c.in("hk", j >= 1, { y: 20 }); c.in("ev", j >= 1, { s: 0.3 }, { dl: 0.3 });
          c.in("dir", j >= 2, { x: 40 }); c.in("db", j >= 2, { s: 0.4 }, { dl: 0.4, e: "back.out(2)" }); c.in("bolt", j >= 2, { s: 0.3 }, { dl: 0.7 });
        }
      },
      // Beat 2 · moments 3–5 · Adapted from benchmark 124 "Project Dashboard"
      // https://lottiefiles.com/free-animation/project-dashboard-PeJUc2p1iB — data panels reveal alongside the collaborators who own them.
      {
        from: 3, to: 5,
        draw: () => {
          const P3 = [[70, "Director", C.plum, "Smooth arrivals"], [200, "Receptionists", C.green, "Interruptions"], [330, "Guests", C.navy2, "Waiting"]];
          let s = "";
          P3.forEach(([x, n, col, t], i) => {
            s += H("c" + i, R(x - 62, 34, 124, 196, C.white, 12, `stroke="${col}" stroke-width="2.4"`) + R(x - 62, 34, 124, 30, col, 12) + R(x - 62, 50, 124, 14, col) + T(x, 55, n, 14, C.white) + person(x, 132, 1.8, col) + chip(x, 206, t, { sz: 12, st: col, fg: col }));
          });
          s += H("i0", P("M40 92 Q70 80 100 92", C.plum, 3) + tick(70, 90, 0.8, C.green));
          s += H("i1", F("M196 76 L186 98 L196 98 L190 116 L208 92 L198 92 L204 76 Z", C.orange) + F("M222 80 L214 96 L222 96 L218 108 L230 92 L222 92 L226 80 Z", C.orange));
          s += H("i2", clock(330, 90, 16));
          s += H("sin", chip(200, 260, "All sincere, all different", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("mega", R(10, 240, 380, 56, "rgba(255,255,255,.96)", 12, `stroke="${C.slate}" stroke-width="1.6"`) + F("M40 256 L70 248 L70 284 L40 276 Z", C.slate) + T(120, 274, "Loudest voice", 14, C.slate) + P("M70 268 H170", C.red, 3) + scale(250, 268, 0.55, C.green) + T(330, 274, "Evidence", 16, C.green));
          return s;
        },
        render: (c, j) => {
          for (let i = 0; i < 3; i++) { c.in("c" + i, j >= 0, { y: 40 }, { dl: 0.18 * i }); c.in("i" + i, j >= 0, { s: 0.3 }, { dl: 0.6 + 0.2 * i }); }
          c.in("sin", j === 1, { y: 14 }); c.in("mega", j >= 2, { y: 30 });
        }
      },
      // Beat 3 · moments 6–8 · Adapted from benchmark 005 "MotionPath plugin demonstration"
      // https://gsap.com/docs/v3/Plugins/MotionPathPlugin/ — an object travels and turns along an arbitrary SVG path.
      {
        from: 6, to: 8,
        draw: () => {
          const ST = [[40, 230, "Enters|lobby"], [130, 120, "Reservation|checked"], [210, 210, "Rate|confirmed"], [290, 110, "Room|released"], [360, 210, "Enters|room"]];
          let s = P("M40 230 C80 230 90 120 130 120 S170 210 210 210 S250 110 290 110 S340 210 360 210", "#cfd9e4", 14);
          s += D("walk", "M40 230 C80 230 90 120 130 120 S170 210 210 210 S250 110 290 110 S340 210 360 210", C.orange, 4, 'stroke-dasharray="3 9"');
          ST.forEach(([x, y, t], i) => { s += H("s" + i, O(x, y, 14, C.white, `stroke="${C.navy}" stroke-width="3"`) + O(x, y, 5, C.navy)); s += H("t" + i, node(x - 40, y + (y > 160 ? 20 : -62), 80, 40, t, { sz: 12 })); });
          s += K("g", guest(0, 0, 1.1), 'style="opacity:0"');
          s += H("wc", chip(200, 28, "Walking a case", { sz: 16, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("gap", [[86, 176], [170, 166], [250, 160], [326, 160]].map(([x, y]) => O(x, y, 15, "none", `stroke="${C.red}" stroke-width="3" class="a-pulse"`)).join("") + chip(200, 286, "Delays between teams", { sz: 14, bg: C.red, st: C.red, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          const PTS = [[40, 230], [130, 120], [210, 210], [290, 110], [360, 210]];
          for (let i = 0; i < 5; i++) { c.in("s" + i, j >= 0, { s: 0.3 }, { dl: 0.12 * i }); c.in("t" + i, j >= 0, { y: 8 }, { dl: 0.2 + 0.12 * i }); }
          const at = j <= 0 ? 0 : j === 1 ? 4 : 4;
          c.dr("walk", j <= 0 ? 0.02 : 1, { d: 2 });
          c.op("g", j >= 0 ? 1 : 0); c.mv("g", { x: PTS[at][0] - 16, y: PTS[at][1] - 24 }, { d: 2, e: "power1.inOut" });
          c.in("wc", j >= 1, { y: -14 }); c.in("gap", j >= 2, { s: 0.6 });
        }
      },
      // Beat 4 · moments 9–11 · Adapted from benchmark 086 "Workflow by a" (teamwork workflow)
      // https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm — workers appear, each performing their part of the workflow.
      {
        from: 9, to: 11,
        draw: () => {
          let s = H("rc", person(90, 150, 2, C.green) + chip(90, 206, "Receptionist", { sz: 13, st: C.green, fg: C.green }) + bubble(20, 34, 150, 52, "I need help", { sz: 15, st: C.green, fg: C.green, tx: 70 }) + key(150, 140, 1.3, C.gold) + cross(150, 140, 1, C.red));
          s += H("sv", person(310, 150, 2, C.plum) + chip(310, 206, "Supervisor", { sz: 13, st: C.plum, fg: C.plum }) + bubble(232, 34, 156, 52, "Occasional only", { sz: 15, st: C.plum, fg: C.plum, tx: 80 }));
          s += H("vs", O(200, 130, 20, C.orange) + T(200, 136, "vs", 15, C.white));
          s += H("rooms", R(20, 228, 170, 66, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + R(210, 228, 170, 66, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + T(105, 268, "Room A", 15, C.navy) + T(295, 268, "Room B", 15, C.navy) + door(150, 236, 30, 50, C.navy, "#cfe0f0") + door(340, 236, 30, 50, C.navy, "#cfe0f0"));
          s += H("sep", chip(200, 228, "Separate interviews", { sz: 14, bg: C.navy, st: C.navy, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.in("rc", j >= 0, { x: -40 }); c.in("sv", j >= 1, { x: 40 }); c.in("vs", j >= 1, { s: 0.3 }, { dl: 0.4 });
          c.in("rooms", j >= 2, { y: 30 }); c.in("sep", j >= 2, { s: 0.5 }, { dl: 0.4 });
          c.mv("rc", j >= 2 ? { y: -26 } : {}, { dl: 0 }); c.mv("sv", j >= 2 ? { y: -26 } : {});
        }
      },
      // Beat 5 · moments 12–14 · Adapted from benchmark 067 "Idea Flow Animation | Infographic Motion Design"
      // https://www.behance.net/gallery/247762027/Idea-Flow-Animation-Infographic-Motion-Design — orbiting idea nodes connect into structure.
      {
        from: 12, to: 14,
        draw: () => {
          let s = H("pr", person(80, 190, 1.8, C.green) + person(150, 176, 2.2, C.plum) + bubble(30, 100, 80, 34, "fine...", { sz: 12, st: C.green, fg: C.green, tx: 40 }) + chip(110, 256, "Supervisor present", { sz: 13, st: C.plum, fg: C.plum }));
          s += H("al", person(300, 190, 1.8, C.green) + bubble(230, 70, 150, 64, "Every busy night", { sz: 14, st: C.green, fg: C.green, tx: 66 }) + chip(300, 256, "Speaking alone", { sz: 13, st: C.green, fg: C.green }));
          s += H("vn", O(150, 150, 84, "rgba(107,78,138,.16)", `stroke="${C.plum}" stroke-width="3"`) + O(250, 150, 84, "rgba(49,124,97,.16)", `stroke="${C.green}" stroke-width="3"`) + T(118, 126, "Interviews", 15, C.plum) + T(118, 146, "explain", 14, C.plum) + T(290, 126, "Observation", 14, C.green) + T(286, 146, "shows", 14, C.green) + T(200, 160, "Match?", 14, C.ink));
          s += H("vq", chip(200, 268, "Ask about differences", { sz: 14, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("fork", chip(110, 270, "Faulty memory", { sz: 14, st: C.red, fg: C.red }) + chip(290, 270, "Real variation", { sz: 14, st: C.green, fg: C.green }) + T(200, 275, "or", 14, C.ink));
          return s;
        },
        render: (c, j) => {
          c.in("pr", j === 0, { x: -30 }); c.in("al", j === 0, { x: 30 }, { dl: 0.3 });
          c.in("vn", j >= 1, { s: 0.6 }); c.mv("vn", j >= 1 ? {} : { s: 0.6 });
          c.in("vq", j === 1, { y: 14 }, { dl: 0.5 }); c.in("fork", j === 2, { y: 14 });
        }
      },
      // Beat 6 · moments 15–18 · Adapted from benchmark 050 "Learn D3: Animation"
      // https://observablehq.com/@d3/learn-d3-animation — a time series draws progressively with a playback marker.
      {
        from: 15, to: 18,
        draw: () => {
          let s = H("ax", P("M20 150 H380", C.navy, 3) + T(26, 176, "Lobby", 12, C.slate, "", "start") + T(374, 176, "Room", 12, C.slate, "", "end"));
          const EV = [[110, "Booking"], [200, "Rate"], [290, "Key"]];
          EV.forEach(([x, t], i) => { s += H("e" + i, R(x - 30, 92, 60, 36, C.navy, 6) + T(x, 116, t, 13, C.white) + P(`M${x} 128 V150`, C.navy, 2) + O(x, 150, 6, C.navy)); });
          s += H("pms", monitor(60, 70, 1.4, C.navy) + chip(60, 30, "System log", { sz: 13 }));
          s += H("re", chip(200, 236, "Recorded system events", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("gp", [[20, 80], [140, 170], [230, 260], [320, 380]].map(([a, b]) => R(a, 140, b - a, 20, "rgba(192,80,42,.28)", 3, `stroke="${C.orange}" stroke-width="1.6" stroke-dasharray="4 3"`)).join("") + T(155, 196, "Unrecorded", 13, C.orange) + T(245, 196, "Unrecorded", 13, C.orange));
          s += H("ph", phone(155, 222, 1, C.orange) + clock(245, 222, 11));
          s += H("lb", `<g class="a-walk">${guest(30, 112, 1)}</g>` + O(30, 150, 6, "none", `stroke="${C.red}" stroke-width="2.4"`) + T(30, 246, "?", 28, C.red));
          s += H("kt", O(290, 150, 16, "none", `stroke="${C.gold}" stroke-width="4" class="a-pulse"`) + key(290, 70, 1.6) + P("M290 150 C240 260 80 260 36 160", C.red, 2.4, 'stroke-dasharray="5 5"') + chip(180, 278, "Key time ≠ lobby time", { sz: 13, st: C.red, fg: C.red }));
          s += H("ai", R(60, 214, 280, 70, C.white, 10, `stroke="${C.red}" stroke-width="2.4"`) + badge(96, 238, 12, C.green) + T(120, 243, "Precise", 15, C.green, "", "start") + badge(96, 266, 12, C.red, false) + T(120, 271, "Incomplete boundary", 15, C.red, "", "start"));
          return s;
        },
        render: (c, j) => {
          c.in("ax", j >= 0); c.in("pms", j >= 0, { x: -20 }); c.in("re", j === 0, { y: 14 }, { dl: 0.9 });
          for (let i = 0; i < 3; i++) c.in("e" + i, j >= 0, { y: -30 }, { dl: 0.3 + 0.2 * i, e: "back.out(1.5)" });
          c.in("gp", j >= 1, { s: 0.8 }); c.in("ph", j === 1, { s: 0.4 }, { dl: 0.4 });
          c.in("lb", j === 2, { x: -20 }); c.in("kt", j === 2, {}, { dl: 0.3 });
          c.in("ai", j === 3, { y: 30 });
        }
      },
      // Beat 7 · moments 19–22 · Adapted from benchmark 052 "Data Analysis Animation"
      // https://lottiefiles.com/free-animation/data-analysis-animation-visualize-insights-effectively-JTyygZuvbP — analytics icons reveal and indicators move.
      {
        from: 19, to: 22,
        draw: () => {
          let s = H("one", R(120, 40, 160, 150, C.white, 12, `stroke="${C.green}" stroke-width="2.6"`) + O(160, 76, 15, C.gold) + `<g class="a-walk">${guest(200, 150, 1.3)}</g>` + door(234, 98, 30, 66, C.green) + chip(200, 214, "Quiet, room ready", { sz: 14, st: C.green, fg: C.green }));
          s += H("one2", R(116, 36, 168, 158, "none", 14, `stroke="${C.orange}" stroke-width="3" stroke-dasharray="8 6"`) + chip(200, 262, "Representative?", { sz: 15, bg: C.orange, st: C.orange, fg: C.white }));
          const cell = (i) => [40 + (i % 8) * 46, 46 + Math.floor(i / 8) * 46];
          s += rep(32, (i) => { const [x, y] = cell(i), t = i % 8; const bad = i % 5 === 2, busy = t > 4; return `<g data-k="sm${i}" style="opacity:0">${R(x - 19, y - 19, 38, 38, busy ? "#fbe7dc" : "#e3edf7", 6, `stroke="${bad ? C.orange : C.muted}" stroke-width="${bad ? 2.4 : 1.2}"`)}${busy ? moon(x - 6, y - 6, 6) : O(x - 7, y - 7, 5, C.gold)}${O(x + 4, y + 4, 6, bad ? C.orange : C.navy2)}</g>`; });
          s += H("sl", chip(200, 236, "Sample: chosen cases", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("cat", chip(74, 270, "Quiet", { sz: 13 }) + chip(160, 270, "Busy", { sz: 13, st: C.orange, fg: C.orange }) + chip(270, 270, "Extra approvals", { sz: 13, st: C.orange, fg: C.orange, bg: C.peach }));
          return s;
        },
        render: (c, j) => {
          c.in("one", j >= 0 && j < 2, { s: 0.7 }); c.mv("one", j === 1 ? { s: 0.9 } : {});
          c.in("one2", j === 1, { s: 1.2 });
          for (let i = 0; i < 32; i++) { c.op("sm" + i, j >= 2 ? (j === 3 && !((i % 8) > 4 || i % 5 === 2) ? 0.35 : 1) : 0, { dl: j === 2 ? 0.03 * i : 0 }); c.mv("sm" + i, j >= 2 ? {} : { s: 0.3 }, { dl: j === 2 ? 0.03 * i : 0 }); }
          c.in("sl", j === 2, { y: 14 }, { dl: 0.6 }); c.in("cat", j === 3, { y: 14 });
        }
      },
      // Beat 8 · moments 23–25 · Adapted from benchmark 129 "Arc tween"
      // https://observablehq.com/@d3/arc-tween — an arc gauge sweeps to a new angular value.
      {
        from: 23, to: 25,
        draw: () => {
          let s = H("dis", R(20, 40, 160, 80, C.white, 10, `stroke="${C.plum}" stroke-width="2"`) + T(100, 70, "Interviews", 14, C.plum) + T(100, 98, "\"Fast\"", 18, C.plum) + R(220, 40, 160, 80, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + T(300, 70, "Records", 14, C.navy) + T(300, 98, "\"Slow\"", 18, C.navy) + O(200, 80, 14, C.red) + T(200, 85, "≠", 15, C.white));
          s += H("why", chip(200, 150, "Why do they differ?", { sz: 16, bg: C.orange, st: C.orange, fg: C.white }) + `<g class="a-bob">${lens(200, 222, 28, C.ink)}</g>`);
          const arc = (cx, cy, r, a0, a1) => { const p = (a) => `${(cx + r * Math.cos(a * Math.PI / 180)).toFixed(1)} ${(cy + r * Math.sin(a * Math.PI / 180)).toFixed(1)}`; return `M${p(a0)} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${p(a1)}`; };
          s += H("g1", O(110, 150, 66, C.white, `stroke="${C.navy}" stroke-width="2"`) + P(arc(110, 150, 54, -90, 270), "#e3e9ef", 12) + T(110, 156, "Desk clock", 13, C.navy) + chip(110, 238, "Starts at desk", { sz: 13 }));
          s += H("g2", O(290, 150, 66, C.white, `stroke="${C.orange}" stroke-width="2"`) + P(arc(290, 150, 54, -90, 270), "#e3e9ef", 12) + T(290, 156, "Guest clock", 13, C.orange) + chip(290, 238, "Starts at lobby", { sz: 13, st: C.orange, fg: C.orange }));
          s += D("a1", arc(110, 150, 54, -90, 30), C.navy, 12) + D("a2", arc(290, 150, 54, -90, 200), C.orange, 12);
          s += H("both", chip(200, 282, "Both accurate", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
          s += H("fold", R(30, 50, 340, 200, C.white, 12, `stroke="${C.navy}" stroke-width="2.4"`) + R(30, 50, 120, 26, C.navy, 10) + T(90, 69, "Evidence file", 13, C.white) + [["Sources", C.navy], ["Definitions", C.green], ["Uncertainties", C.orange]].map(([t, col], i) => doc(60 + i * 104, 100, 76, 96, col) + chip(98 + i * 104, 224, t, { sz: 12, st: col, fg: col })).join(""));
          s += H("eye", chip(200, 282, "Open to scrutiny", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.in("dis", j === 0, { y: -20 }); c.in("why", j === 0, { y: 20 }, { dl: 0.3 });
          c.in("g1", j === 1, { x: -30 }); c.in("g2", j === 1, { x: 30 }); c.dr("a1", j === 1 ? 1 : 0, { dl: 0.4 }); c.dr("a2", j === 1 ? 1 : 0, { dl: 0.6 }); c.in("both", j === 1, { y: 14 }, { dl: 1.2 });
          c.in("fold", j === 2, { y: 30 }); c.in("eye", j === 2, { y: 14 }, { dl: 0.5 });
        }
      },
      // Beat 9 · moments 26–29 · Adapted from benchmark 015 "Data Workflow Animation"
      // https://dribbble.com/shots/27247003-Data-Workflow-Animation — nodes activate, then data traces along connectors.
      {
        from: 26, to: 29,
        draw: () => {
          const L = ["Observe|cases", "Interview|people", "Examine|records", "Reconcile|differences", "Validate|model"];
          let s = "";
          L.forEach((t, i) => { s += H("p" + i, node(4 + i * 79, 30, 74, 50, t, { sz: 12, st: i === 4 ? C.green : C.navy, bg: i === 4 ? C.mint : C.white })); if (i < 4) s += darrow("pa" + i, 78 + i * 79, 55, 83 + i * 79, 55, C.navy, 2.2); });
          s += H("mdl", R(40, 110, 320, 90, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + rep(4, (i) => R(58 + i * 78, 136, 54, 34, i === 2 ? C.peach : C.blue, 5) + (i < 3 ? arrow(112 + i * 78, 153, 134 + i * 78, 153, C.navy, 2) : "")));
          s += H("fix", P("M210 132 L250 174 M250 132 L210 174", C.red, 4) + `<g transform="rotate(-5 230 230)">${R(176, 214, 108, 34, "#fff1b8", 2)}${T(230, 236, "Actually: two steps", 12, C.ink)}</g>`);
          s += H("ppl", person(56, 260, 1.2, C.green) + person(344, 260, 1.2, C.navy2));
          s += H("wl", chip(200, 236, "Unrecognisable = worthless", { sz: 14, bg: C.red, st: C.red, fg: C.white }));
          s += H("sh", shield(230, 154, 1.2, C.green) + chip(300, 236, "Necessary control", { sz: 14, st: C.green, fg: C.green }) + chip(100, 236, "Not just a delay", { sz: 14, st: C.slate, fg: C.slate }));
          s += H("nw", R(30, 212, 340, 74, C.white, 10, `stroke="${C.plum}" stroke-width="2"`) + person(70, 274, 1, C.plum) + T(220, 244, "Agree it's accurate", 15, C.green) + T(220, 270, "Liking it: optional", 14, C.plum));
          return s;
        },
        render: (c, j) => {
          c.seq("p", 5, j >= 0 ? 5 : 0, { y: -14 });
          c.in("mdl", j >= 0, { y: 20 }, { dl: 0.4 }); c.in("ppl", j >= 0 && j < 2, { y: 20 }, { dl: 0.6 });
          c.in("fix", j === 0, { s: 0.5 }, { dl: 1 });
          c.in("wl", j === 1, { y: 14 });
          c.in("sh", j === 2, { s: 0.4 }, { e: "back.out(2)" });
          c.in("nw", j === 3, { y: 30 });
        }
      },
      // Beat 10 · moments 30–32 · Adapted from benchmark 075 "Action Security Systems - Infographic & Motion Design"
      // https://www.behance.net/gallery/104646575/Action-Security-Systems-Infographic-Motion-Design — risks reveal, then controls and verification.
      {
        from: 30, to: 32,
        draw: () => {
          let s = H("glass", R(110, 40, 180, 150, "rgba(219,231,242,.55)", 14, `stroke="${C.navy}" stroke-width="3"`) + doc(150, 70, 40, 52, C.navy) + doc(206, 70, 40, 52, C.green) + chip(200, 160, "Clear definitions", { sz: 13 }));
          s += H("qs", [[50, 70], [350, 90], [56, 170]].map(([x, y]) => O(x, y, 16, C.plum) + T(x, y + 6, "?", 17, C.white)).join(""));
          s += H("bn", [[96, 80], [306, 96], [98, 164]].map(([x, y]) => P(`M${x} ${y} l-14 -10`, C.plum, 2.4)).join(""));
          s += H("cr", chip(200, 232, "Withstands questioning", { sz: 16, bg: C.green, st: C.green, fg: C.white }));
          s += H("rd", R(30, 40, 340, 170, C.white, 12, `stroke="${C.green}" stroke-width="2.4"`) + badge(70, 80, 14, C.green) + T(96, 86, "Process understood", 16, C.green, "", "start") + badge(70, 124, 14, C.green) + T(96, 130, "Evidence checked", 16, C.green, "", "start") + R(54, 156, 292, 36, C.blue, 8) + T(200, 180, "Next: measure it", 16, C.navy));
          s += H("ck", watch(110, 212, 40) + hand(110, 212, 28, C.navy, 6) + watch(290, 212, 40, C.orange) + hand(290, 212, 28, C.orange, 3) + T(200, 220, "≠", 30, C.red) + chip(200, 284, "Conflicting figures?", { sz: 15, st: C.red, fg: C.red }));
          return s;
        },
        render: (c, j) => {
          c.in("glass", j === 0, { s: 0.7 }); c.in("qs", j === 0, { s: 0.3 }, { dl: 0.3 }); c.in("bn", j === 0, {}, { dl: 0.8 }); c.in("cr", j === 0, { y: 20 }, { dl: 1 });
          c.in("rd", j >= 1, { y: -20 }); c.op("rd", j === 1 ? 1 : 0);
          c.in("ck", j === 2, { y: 30 });
        }
      }
    ];
    VL_SCENES[id] = makeScene({ id, N, labels, beats, back: () => backdrop("#f4f1ea", "#e9e3d6"),
      desc: "Finding evidence people can trust: the director challenges the model, three sincere perspectives differ, one real arrival is walked end to end, receptionist and supervisor are interviewed separately, system timestamps miss unrecorded gaps, a single quiet case is replaced by a meaningful sample, two accurate clocks with different boundaries are reconciled, and staff validate the model." });
    SCENE_BG.push([id, "#f4f1ea"]);
  }

  addStyles(SCENE_BG);
})();

// OPER621 · Week 8 · The Understand Phase — animated teaching scenes (round 2, Claude)
// File: w08-claude-part2.js · Lesson 2 · Three clocks, three different answers · Scenes: W8O2a, W8O2b, W8O2c
// Standalone part: defines its own engine and helpers, registers its scenes and appends its own
// rules (all scoped under .vls-w08-<secId>) into the single shared <style id="vl-sc-w08">.
// Parts may be loaded in any order or concatenated.
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }; i = narration moment index.
// Each section is a sequence of beats (a new visual every 3-4 narration lines); each beat names the
// benchmark template it adapts (number, title, URL). All drawing code is original.
(() => {
  "use strict";
  // ================= shared engine (self-contained copy for this part) =================
  window.VL_SCENES = window.VL_SCENES || {};
  const VL_SCENES = window.VL_SCENES;
  const PART = "p2";
  const C = {
    navy: "#1f4e79", navy2: "#2d6a9f", orange: "#c0502a", paper: "#fbf8f1", ink: "#1b2a3a",
    blue: "#dbe7f2", green: "#317c61", gold: "#e5b76c", amber: "#a8741a", plum: "#6b4e8a",
    red: "#b0362b", white: "#ffffff", slate: "#5d7389", muted: "#9fb3c4", mint: "#e1f0e8",
    peach: "#f8e3d8", lilac: "#ece6f3", sky: "#eaf2f8", sand: "#efe4cf", night: "#14263a", teal: "#2a7f86"
  };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const num = (v, f) => { const x = Number(v); return Number.isFinite(x) ? x : f; };
  const reduced = () => { try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (_) { return false; } };
  const hasG = () => !!(window.gsap && typeof window.gsap.to === "function" && typeof window.gsap.set === "function") && !reduced();
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");
  const inR = (k, a, b) => k >= a && k <= b;
  // ---- SVG string builders ----
  const R = (x, y, w, h, f, rx = 0, ex = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${ex}/>`;
  const O = (cx, cy, r, f, ex = "") => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${ex}/>`;
  const E = (cx, cy, rx, ry, f, ex = "") => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${ex}/>`;
  const P = (d, s, w = 2, ex = "") => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
  const F = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
  const D = (k, d, s, w = 3, ex = "") => `<path data-k="${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100" ${ex}/>`;
  const T = (x, y, s, sz = 14, f = C.ink, ex = "", a = "middle") => `<text x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
  const TK = (k, x, y, s, sz = 14, f = C.ink, a = "middle", ex = "") => `<text data-k="${k}" x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
  const K = (k, body, ex = "") => `<g data-k="${k}" ${ex}>${body}</g>`;
  const H = (k, body, ex = "") => `<g data-k="${k}" style="opacity:0" ${ex}>${body}</g>`;
  const tw = (s, sz) => Math.round(String(s).length * sz * 0.6 + sz * 1.3);
  const chip = (x, y, s, o = {}) => {
    const sz = o.sz || 14, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.85);
    return `<g class="w8c">` + R(x - w / 2, y - h / 2, w, h, o.bg || C.paper, o.rx == null ? h / 2 : o.rx,
      `stroke="${o.st || C.navy}" stroke-width="${o.sw || 1.8}"${o.dash ? ' stroke-dasharray="5 4"' : ""}`) +
      T(x, y + sz * 0.36, s, sz, o.fg || C.navy) + `</g>`;
  };
  // process box with 1-2 lines ("Line one|line two")
  const node = (x, y, w, h, s, o = {}) => {
    const sz = o.sz || 13, L = String(s).split("|"), lh = sz * 1.15, y0 = y + h / 2 - (L.length - 1) * lh / 2 + sz * 0.36;
    return `<g class="w8c">` + R(x, y, w, h, o.bg || C.white, o.rx == null ? 8 : o.rx, `stroke="${o.st || C.navy}" stroke-width="${o.sw || 2}"${o.dash ? ' stroke-dasharray="5 4"' : ""}`) +
      L.map((t, i) => T(x + w / 2, y0 + i * lh, t, sz, o.fg || C.ink)).join("") + `</g>`;
  };
  const head = (x, y, ang, col, s = 1) => { const a = ang * Math.PI / 180, c = Math.cos(a), si = Math.sin(a), p = (dx, dy) => `${(x + dx * c - dy * si).toFixed(1)} ${(y + dx * si + dy * c).toFixed(1)}`; return F(`M${p(2 * s, 0)} L${p(-8 * s, -5.5 * s)} L${p(-8 * s, 5.5 * s)} Z`, col); };
  const arrow = (x1, y1, x2, y2, col = C.slate, w = 2.4, ex = "") => P(`M${x1} ${y1} L${x2} ${y2}`, col, w, ex) + head(x2, y2, Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, col);
  const darrow = (k, x1, y1, x2, y2, col = C.slate, w = 2.6) => { const L = Math.hypot(x2 - x1, y2 - y1) || 1, ex = x2 - (x2 - x1) / L * 6, ey = y2 - (y2 - y1) / L * 6; return D(k, `M${x1} ${y1} L${ex.toFixed(1)} ${ey.toFixed(1)}`, col, w) + H(k + "g", head(x2, y2, Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, col)); };
  const dcurve = (k, d, x2, y2, ang, col = C.slate, w = 2.6) => D(k, d, col, w) + H(k + "g", head(x2, y2, ang, col));
  const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${x - 7 * s} ${y} l${5 * s} ${5 * s} l${10 * s} ${-11 * s}`, col, w);
  const cross = (x, y, s = 1, col = C.red, w = 3) => P(`M${x - 6 * s} ${y - 6 * s} l${12 * s} ${12 * s} M${x + 6 * s} ${y - 6 * s} l${-12 * s} ${12 * s}`, col, w);
  const badge = (x, y, r, col, ok = true) => O(x, y, r, col) + (ok ? tick(x, y, r / 13, C.white, Math.max(2, r / 5)) : cross(x, y, r / 14, C.white, Math.max(2, r / 5)));
  const person = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}</g>`;
  const guest = (x, y, s = 1, col = C.navy2, bag = C.orange) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -17, 8, col)}${F("M-12 14 Q-12 -6 0 -6 Q12 -6 12 14 Z", col)}${R(13, -2, 12, 16, bag, 3)}${P("M16 -2 v-4 h6 v4", bag, 1.6)}</g>`;
  const clock = (x, y, r, col = C.orange, bg = C.paper) => O(x, y, r, bg, `stroke="${col}" stroke-width="${Math.max(2, r / 6)}"`) + P(`M${x} ${y - r * 0.62} V${y} L${x + r * 0.45} ${y + r * 0.3}`, col, Math.max(2, r / 7));
  const hand = (x, y, len, col, dur = 4, w = 3) => `<path class="a-hand" style="transform-origin:${x}px ${y}px;animation-duration:${dur}s" d="M${x} ${y} V${y - len}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
  const watch = (x, y, r, col = C.navy, bg = C.white) => R(x - r * 0.22, y - r - 9, r * 0.44, 7, col, 2) + O(x, y, r, bg, `stroke="${col}" stroke-width="${Math.max(3, r / 7)}"`) + rep(12, (i) => { const a = i * Math.PI / 6; return P(`M${(x + r * 0.78 * Math.sin(a)).toFixed(1)} ${(y - r * 0.78 * Math.cos(a)).toFixed(1)} L${(x + r * 0.9 * Math.sin(a)).toFixed(1)} ${(y - r * 0.9 * Math.cos(a)).toFixed(1)}`, col, i % 3 ? 1.2 : 2.4); });
  const phone = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M-12 -6 Q-12 -12 -6 -12 L-2 -12 L0 -5 L-4 -2 Q-2 4 4 8 L7 4 L13 6 L13 10 Q13 15 7 15 Q-12 13 -12 -6 Z", col)}</g>`;
  const doc = (x, y, w, h, col = C.navy, bg = C.white, lines = 3) => R(x, y, w, h, bg, 4, `stroke="${col}" stroke-width="2"`) + (lines === 0 ? R(x, y, w, 7, col, 3) : "") + rep(lines, (i) => P(`M${x + 7} ${y + 11 + i * ((h - 16) / Math.max(1, lines))} H${x + w - 7 - (i === lines - 1 ? w * 0.25 : 0)}`, col, 2, 'opacity=".55"'));
  const desk = (x, y, w, col = C.navy) => R(x, y, w, 10, C.orange, 3) + R(x + 6, y + 10, w - 12, 26, col, 3);
  const monitor = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-18, -14, 36, 24, col, 3)}${R(-15, -11, 30, 18, "#cfe0f0", 2)}${R(-3, 10, 6, 6, col)}${R(-10, 15, 20, 3, col, 1)}</g>`;
  const lens = (x, y, r, col = C.ink) => O(x, y, r, "rgba(255,255,255,.22)", `stroke="${col}" stroke-width="${Math.max(3, r / 9)}"`) + P(`M${x + r * 0.72} ${y + r * 0.72} L${x + r * 1.25} ${y + r * 1.25}`, col, Math.max(5, r / 4.5));
  const gear = (x, y, r, col, hole = C.paper) => { let d = ""; const n = 8; for (let i = 0; i < n; i++) { const a0 = (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n * 0.55, a2 = a0 + Math.PI / n, a3 = a2 + Math.PI / n * 0.45, p = (a, rr) => `${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`; d += (i ? "L" : "M") + p(a0, r) + "L" + p(a1, r) + "L" + p(a2, r * 0.78) + "L" + p(a3, r * 0.78); } return F(d + "Z", col) + O(x, y, r * 0.34, hole); };
  const star = (x, y, r, col = C.gold, st = C.amber) => { let d = ""; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; d += (i ? "L" : "M") + (x + rr * Math.cos(a)).toFixed(1) + " " + (y + rr * Math.sin(a)).toFixed(1); } return F(d + "Z", col, `stroke="${st}" stroke-width="1"`); };
  const hotel = (x, y, w, h, col = C.navy, win = "#cfe0f0") => R(x, y, w, h, col, 6) + F(`M${x - 8} ${y + 2} L${x + w / 2} ${y - 22} L${x + w + 8} ${y + 2} Z`, C.navy2) + rep(Math.floor((h - 34) / 22) * 4, (i) => R(x + 10 + (i % 4) * ((w - 20) / 4), y + 12 + Math.floor(i / 4) * 22, (w - 20) / 4 - 8, 13, win, 2)) + R(x + w / 2 - 13, y + h - 30, 26, 30, C.gold, 3);
  const door = (x, y, w, h, col = C.green, bg = "#d7ebdf") => R(x, y, w, h, col, 4) + R(x + 5, y + 5, w - 10, h - 5, bg, 2) + O(x + w - 11, y + h / 2 + 4, 2.6, col);
  const key = (x, y, s = 1, col = C.gold) => `<g transform="translate(${x} ${y}) scale(${s})">${O(-9, 0, 7, "none", `stroke="${col}" stroke-width="3.4"`)}${P("M-2 0 H14 M10 0 V5 M14 0 V6", col, 3.4)}</g>`;
  const bubble = (x, y, w, h, s, o = {}) => `<g class="w8c">` + R(x, y, w, h, o.bg || C.white, 10, `stroke="${o.st || C.navy}" stroke-width="1.8"`) + F(`M${x + (o.tx || 16)} ${y + h - 1} L${x + (o.tx || 16) - 4} ${y + h + 10} L${x + (o.tx || 16) + 10} ${y + h - 1} Z`, o.bg || C.white, `stroke="${o.st || C.navy}" stroke-width="1.8" stroke-linejoin="round"`) + R(x + (o.tx || 16) - 3, y + h - 3, 14, 4, o.bg || C.white) + T(x + w / 2, y + h / 2 + (o.sz || 13) * 0.36, s, o.sz || 13, o.fg || C.navy) + `</g>`;
  const coin = (x, y, r = 8) => O(x, y, r, C.gold, `stroke="${C.amber}" stroke-width="2"`) + T(x, y + r * 0.42, "$", r * 1.2, C.amber);
  const shield = (x, y, s = 1, col = C.green) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M0 -18 L15 -12 V0 Q15 13 0 20 Q-15 13 -15 0 V-12 Z", col)}${tick(0, 0, 0.8, C.white, 3)}</g>`;
  const lock = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-11, -3, 22, 17, col, 3)}${P("M-7 -3 v-6 a7 7 0 0 1 14 0 v6", col, 3)}${O(0, 5, 2.6, C.white)}</g>`;
  const cal = (x, y, w, h, col = C.red) => R(x, y, w, h, C.white, 5, `stroke="${col}" stroke-width="2"`) + R(x, y, w, h * 0.28, col, 5) + R(x, y + h * 0.18, w, h * 0.1, col);
  const moon = (x, y, r, col = C.gold) => F(`M${x} ${y - r} A${r} ${r} 0 1 0 ${x} ${y + r} A${r * 1.3} ${r * 1.3} 0 0 1 ${x} ${y - r} Z`, col);
  const scale = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${P("M0 -26 V22 M-16 22 H16 M-30 -18 H30", col, 3)}${P("M-30 -18 L-40 2 M-30 -18 L-20 2 M30 -18 L20 2 M30 -18 L40 2", col, 1.6)}${F("M-42 2 Q-30 14 -18 2 Z", col)}${F("M18 2 Q30 14 42 2 Z", col)}</g>`;
  // ---- per-scene stylesheet (all rules scoped under .vls-w08-<secId>) ----
  function sceneCSS(id, bg) {
    const s = ".vls-w08-" + id;
    return `
${s}{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:220px;overflow:hidden!important;box-sizing:border-box;border-radius:14px;background:${bg};color:${C.ink};font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w08-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w08-fig>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}
${s} svg text{font-family:inherit;font-weight:700;letter-spacing:.1px}
${s} [data-k],${s} [data-beat]{transform-box:fill-box;transform-origin:50% 50%}
${s}.w08-css [data-k],${s}.w08-css [data-beat]{transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.8s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}
${s}.w08-snap [data-k],${s}.w08-snap [data-beat],${s}.w08-rm [data-k],${s}.w08-rm [data-beat]{transition:none!important}
${s}.w08-rm *{animation:none!important}
${s} .w08-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:36px;padding:6px 12px 8px;font-size:14px;font-weight:700;line-height:1.25;color:${C.navy};background:rgba(255,255,255,.6);border-top:1px solid rgba(31,78,121,.12)}
${s} .w08-num{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w08-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.2px}
${s} .w08-lab.w08-in{animation:vlsw08CapIn .5s cubic-bezier(.22,.8,.24,1)}
${s} .w08-bar{flex:0 0 54px;height:4px;border-radius:4px;background:rgba(31,78,121,.15);overflow:hidden}
${s} .w08-bar i{display:block;height:100%;width:0;background:${C.orange};transition:width .6s ease}
${s} .a-flow{stroke-dasharray:6 7;animation:vlsw08Flow 1.1s linear infinite}
${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw08Spin 7s linear infinite}
${s} .a-hand{transform-box:view-box;animation-name:vlsw08Spin;animation-timing-function:linear;animation-iteration-count:infinite}
${s} .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw08Bob 2.6s ease-in-out infinite}
${s} .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw08Pulse 2s ease-in-out infinite}
${s} .a-blink{animation:vlsw08Blink 1.4s ease-in-out infinite}
${s} .a-ring{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw08Ring .9s ease-in-out infinite}
${s} .a-walk{animation:vlsw08Walk 2.4s ease-in-out infinite}
@media (max-width:420px){${s} .w08-cap{font-size:13px;min-height:32px;padding:5px 10px 7px}${s} .w08-bar{flex-basis:40px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
  }
  const KEYFRAMES = `
@keyframes vlsw08CapIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes vlsw08Flow{to{stroke-dashoffset:-26}}
@keyframes vlsw08Spin{to{transform:rotate(360deg)}}
@keyframes vlsw08Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes vlsw08Pulse{0%,100%{opacity:.35;transform:scale(.94)}50%{opacity:.95;transform:scale(1.06)}}
@keyframes vlsw08Blink{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes vlsw08Ring{0%,100%{transform:rotate(0)}25%{transform:rotate(-12deg)}75%{transform:rotate(12deg)}}
@keyframes vlsw08Walk{0%,100%{transform:translateX(0)}50%{transform:translateX(6px)}}
`;
  function addStyles(list) {
    if (typeof document === "undefined") return;
    let st = document.getElementById("vl-sc-w08");
    if (!st) { st = document.createElement("style"); st.id = "vl-sc-w08"; (document.head || document.documentElement).appendChild(st); }
    const flag = "data-w08claude" + PART;
    if (st.getAttribute(flag)) return;
    st.setAttribute(flag, "1");
    const kf = st.getAttribute("data-w08kf") ? "" : KEYFRAMES;
    st.setAttribute("data-w08kf", "1");
    st.appendChild(document.createTextNode(kf + list.map((p) => sceneCSS(p[0], p[1])).join("\n")));
  }
  // ---- scene factory: beats (a new visual every 3-4 moments) + per-moment builds ----
  function makeScene(cfg) {
    const { id, N, labels, beats } = cfg;
    let root = null, useG = false, beatNow = -1;
    const mapK = (i, n) => {
      const nn = Math.max(1, Math.floor(num(n, N)));
      const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
      return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
    };
    const beatOf = (k) => { for (let b = 0; b < beats.length; b++) if (k >= beats[b].from && k <= beats[b].to) return b; return beats.length - 1; };
    const dur = (t, d) => (t.d == null ? d : t.d);
    function timing(el, t, d) { el.style.transitionDuration = dur(t, d) + "s"; el.style.transitionDelay = (t.dl || 0) + "s"; }
    function tf(el, st, t, snap) {
      const x = st.x || 0, y = st.y || 0, r = st.r || 0;
      const sx = st.sx != null ? st.sx : (st.s != null ? st.s : 1), sy = st.sy != null ? st.sy : (st.s != null ? st.s : 1);
      if (useG) {
        const v = { x, y, rotation: r, scaleX: sx, scaleY: sy };
        if (st.pv) v.svgOrigin = st.pv[0] + " " + st.pv[1]; else v.transformOrigin = "50% 50%";
        if (snap) window.gsap.set(el, v);
        else window.gsap.to(el, Object.assign(v, { duration: dur(t, 0.85), delay: t.dl || 0, ease: t.e || "power3.out", overwrite: "auto" }));
      } else {
        if (st.pv) { el.style.transformBox = "view-box"; el.style.transformOrigin = st.pv[0] + "px " + st.pv[1] + "px"; }
        timing(el, t, 0.85);
        el.style.transform = "translate(" + x + "px," + y + "px) rotate(" + r + "deg) scale(" + sx + "," + sy + ")";
      }
    }
    function op(el, o, t, snap) {
      if (useG) { if (snap) window.gsap.set(el, { opacity: o }); else window.gsap.to(el, { opacity: o, duration: dur(t, 0.6), delay: t.dl || 0, ease: "power1.out", overwrite: false }); }
      else { timing(el, t, 0.6); el.style.opacity = String(o); }
    }
    function dash(el, f, t, snap) {
      const v = 100 * (1 - clamp(f, 0, 1));
      if (useG) { if (snap) window.gsap.set(el, { strokeDashoffset: v }); else window.gsap.to(el, { strokeDashoffset: v, duration: dur(t, 1.1), delay: t.dl || 0, ease: "power2.inOut" }); }
      else { timing(el, t, 1.1); el.style.strokeDashoffset = String(v); }
    }
    function fill(el, col, t, snap) {
      if (useG) { if (snap) window.gsap.set(el, { fill: col }); else window.gsap.to(el, { fill: col, duration: dur(t, 0.6), delay: t.dl || 0 }); }
      else { timing(el, t, 0.6); el.style.fill = col; }
    }
    function count(el, to, o, snap) {
      const fmt = (v) => (o.pre || "") + (o.dec ? v.toFixed(o.dec) : Math.round(v).toLocaleString("en-US")) + (o.suf || "");
      if (el._raf) cancelAnimationFrame(el._raf);
      const from = el._v != null ? el._v : (o.from || 0);
      el._v = to;
      if (snap || reduced() || typeof requestAnimationFrame !== "function") { el.textContent = fmt(to); return; }
      const t0 = performance.now(), d = (o.d || 1.1) * 1000, dl = (o.dl || 0) * 1000;
      const stepF = (now) => { const p = clamp((now - t0 - dl) / d, 0, 1), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(from + (to - from) * e); if (p < 1) el._raf = requestAnimationFrame(stepF); };
      el._raf = requestAnimationFrame(stepF);
    }
    function ctx(scope, snap) {
      const q = (k) => (scope ? Array.prototype.slice.call(scope.querySelectorAll('[data-k="' + k + '"]')) : []);
      const c = {
        snap,
        op: (k, o, t = {}) => q(k).forEach((el) => op(el, o, t, snap)),
        mv: (k, st, t = {}) => q(k).forEach((el) => tf(el, st, t, snap)),
        dr: (k, f, t = {}) => { q(k).forEach((el) => dash(el, f, t, snap)); q(k + "g").forEach((el) => op(el, f >= 1 ? 1 : 0, { dl: f >= 1 ? (t.dl || 0) + dur(t, 1.1) * 0.8 : 0, d: 0.3 }, snap)); },
        fl: (k, col, t = {}) => q(k).forEach((el) => fill(el, col, t, snap)),
        tx: (k, s) => q(k).forEach((el) => { if (el.textContent !== String(s)) el.textContent = String(s); }),
        cnt: (k, to, o = {}) => q(k).forEach((el) => count(el, to, o, snap)),
        // show/hide with an entrance offset (default: rise 12)
        in: (k, on, from, t = {}) => q(k).forEach((el) => { op(el, on ? 1 : 0, t, snap); tf(el, on ? {} : (from || { y: 12 }), t, snap); }),
        vis: (map, t = {}) => Object.keys(map).forEach((k) => q(k).forEach((el) => op(el, map[k] === true ? 1 : map[k] === false ? 0 : map[k], t, snap))),
        // reveal a numbered sequence p0..p(n-1) with connectors pa0..; upto = how many are visible
        seq: (p, n, upto, from) => { for (let i = 0; i < n; i++) { q(p + i).forEach((el) => { op(el, i < upto ? 1 : 0, { dl: i < upto ? 0.08 * i : 0 }, snap); tf(el, i < upto ? {} : (from || { y: 14 }), { dl: i < upto ? 0.08 * i : 0 }, snap); }); c.dr(p + "a" + i, i < upto - 1 ? 1 : 0, { dl: 0.1 * i }); } },
        all: (sel) => (scope ? Array.prototype.slice.call(scope.querySelectorAll(sel)) : []),
        opEl: (el, o, t = {}) => op(el, o, t, snap),
        mvEl: (el, st, t = {}) => tf(el, st, t, snap),
        flEl: (el, col, t = {}) => fill(el, col, t, snap)
      };
      return c;
    }
    function caption(k, snap) {
      const lab = root.querySelector(".w08-lab"), nn = root.querySelector(".w08-num"), bar = root.querySelector(".w08-bar i");
      const txt = labels[k] || "";
      if (lab && lab.textContent !== txt) { lab.textContent = txt; if (!snap && !reduced()) { lab.classList.remove("w08-in"); void lab.offsetWidth; lab.classList.add("w08-in"); } }
      if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
      if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
    }
    function render(k, snap) {
      if (!root) return;
      const b = beatOf(k), entering = b !== beatNow;
      const groups = Array.prototype.slice.call(root.querySelectorAll("[data-beat]"));
      if (snap) root.classList.add("w08-snap");
      groups.forEach((g, gi) => {
        const on = gi === b;
        op(g, on ? 1 : 0, { d: on ? 0.7 : 0.4, dl: on && entering && !snap ? 0.12 : 0 }, snap);
        tf(g, on ? {} : { x: gi < b ? -28 : 28, s: 0.97 }, { d: 0.8 }, snap);
        g.setAttribute("aria-hidden", on ? "false" : "true");
      });
      const B = beats[b], scope = groups[b];
      try {
        if (entering && !snap) {
          root.classList.add("w08-snap");
          B.render(ctx(scope, true), -1, k);
          void root.getBoundingClientRect();
          root.classList.remove("w08-snap");
        }
        B.render(ctx(scope, snap), k - B.from, k);
        if (cfg.always) cfg.always(ctx(root, snap), k, b);
      } catch (e) { if (window.console) console.warn("[VL W08 " + id + "]", e); }
      caption(k, snap);
      if (snap) { void root.getBoundingClientRect(); root.classList.remove("w08-snap"); }
      beatNow = b;
      root.setAttribute("data-moment", String(k));
    }
    function kill() { if (root && useG) { try { window.gsap.killTweensOf(root.querySelectorAll("[data-k],[data-beat]")); } catch (_) {} } }
    function mount(el) {
      const r = document.createElement("div");
      const rm = reduced();
      r.className = "vls-w08-" + id + " w08-root" + (useG ? " w08-gsap" : " w08-css") + (rm ? " w08-rm" : "");
      r.setAttribute("data-scene", id);
      const body = (cfg.back ? cfg.back() : "") + beats.map((B, b) => `<g data-beat="${b}" style="opacity:0">${B.draw()}</g>`).join("") + (cfg.front ? cfg.front() : "");
      r.innerHTML = '<div class="w08-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' + esc(cfg.desc) + '">' + body +
        '</svg></div><div class="w08-cap" aria-hidden="true"><span class="w08-num"></span><span class="w08-lab"></span><span class="w08-bar"><i></i></span></div>';
      if (typeof el.replaceChildren === "function") el.replaceChildren(r); else { el.innerHTML = ""; el.appendChild(r); }
      return r;
    }
    return {
      build(el) {
        if (!el || el.nodeType !== 1) return;
        kill(); useG = hasG(); beatNow = -1;
        root = mount(el);
        render(0, true);
      },
      step(i, n) { if (!root) return; render(mapK(i, n), false); },
      reset() { if (!root) return; kill(); beatNow = -1; render(0, true); }
    };
  }
  const SCENE_BG = [];
  // backdrop builder: bleed colour + soft pattern (keeps the figure full-bleed on any aspect ratio)
  const backdrop = (bg, line, kind = "grid") => R(-400, -300, 1200, 900, bg) + (kind === "grid"
    ? rep(30, (i) => P(`M${-400 + i * 40} -300 V700`, line, 1)) + rep(24, (i) => P(`M-400 ${-300 + i * 40} H800`, line, 1))
    : kind === "dots" ? rep(60, (i) => O(-380 + (i % 12) * 100, -270 + Math.floor(i / 12) * 180 + (i % 2) * 40, 2.4, line))
    : rep(34, (i) => P(`M${-400 + i * 40} -300 L${-160 + i * 40} 700`, line, 1)));

  // ============================================================
  // W8O2a · "WHOSE CLOCK ARE WE USING?"  ·  33 moments · 10 beats
  // Story: a stopwatch whose start and stop buttons matter; two rulers
  // over one journey; 21.1 elapsed days vs 4.1 days of work, 17 days
  // outside work split into mailbox, guest documents and payment run;
  // Qasr's 23 minutes inside a wider arrival; touch vs elapsed time;
  // internal vs customer-attributable time reported side by side; the
  // front-office window that hides waiting; an explicit arrival-to-room
  // boundary; moving goalposts; and the clocks waiting in the next section.
  // ============================================================
  {
    const id = "W8O2a", N = 33;
    const labels = [
      "Whose clock?", "When does it run?", "How long, exactly?", "Employee working time",
      "The guest's journey", "Different questions", "Start and stop events", "A simple example",
      "21.1 versus 4.1", "Both are true", "Seventeen days outside", "Where those days went",
      "Not all waste", "Back to Qasr", "A wider journey", "Shorter, still correct",
      "Touch versus elapsed", "Waiting while unserved", "Faster desk enough?", "Internal or customer?",
      "Two kinds of delay", "Report three numbers", "The guest feels all", "Front office only",
      "Hidden waiting", "Match the objective", "Arrival to room", "Document the definitions",
      "Moved clock, fake gain", "Timestamps need meaning", "Shared understanding", "Conflicting figures ahead",
      "Whose clock runs?"
    ];
    const beats = [
      // Beat 1 · moments 0–2 · Adapted from benchmark 131 "Transition end"
      // https://observablehq.com/@d3/transition-end — move, wait for the transition to end, then recolour.
      {
        from: 0, to: 2,
        draw: () => {
          let s = K("w", watch(140, 160, 96) + R(122, 50, 36, 12, C.navy, 3) + R(70, 64, 22, 16, C.green, 4, 'transform="rotate(-35 81 72)"') + R(190, 64, 22, 16, C.red, 4, 'transform="rotate(35 201 72)"'));
          s += K("hnd", `<path d="M140 160 V84" stroke="${C.orange}" stroke-width="5" stroke-linecap="round"/>` + O(140, 160, 8, C.orange));
          s += H("st", chip(54, 34, "Start?", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
          s += H("sp", chip(232, 34, "Stop?", { sz: 15, bg: C.red, st: C.red, fg: C.white }));
          s += H("tt", T(318, 110, "Whose", 22, C.navy) + T(318, 140, "clock?", 22, C.orange));
          s += H("mg", person(320, 236, 1.6, C.green) + desk(286, 246, 70));
          s += H("bb", bubble(250, 130, 140, 44, "How long?", { sz: 17, st: C.navy, fg: C.navy, tx: 70 }));
          return s;
        },
        render: (c, j) => {
          c.mv("hnd", { r: j < 0 ? 0 : j === 0 ? 90 : j === 1 ? 250 : 400, pv: [140, 160] }, { d: 1.4, e: "power2.inOut" });
          c.in("tt", j === 0, { x: 30 });
          c.in("st", j >= 1, { y: -14 }); c.in("sp", j >= 1, { y: -14 }, { dl: 0.3 });
          c.in("mg", j >= 2, { x: 40 }); c.in("bb", j >= 2, { s: 0.4 }, { dl: 0.3, e: "back.out(2)" });
        }
      },
      // Beat 2 · moments 3–6 · Adapted from benchmark 135 "Timeline by The Creators"
      // https://motionarray.com/after-effects-templates/timeline/ — milestones reveal along a line with a travelling marker.
      {
        from: 3, to: 6,
        draw: () => {
          const ST = [[40, "Arrive"], [120, "Check"], [200, "Confirm"], [280, "Key"], [360, "Room"]];
          let s = P("M30 140 H370", C.slate, 4);
          ST.forEach(([x, t], i) => { s += O(x, 140, 9, C.white, `stroke="${C.slate}" stroke-width="3"`) + T(x, 172, t, 13, C.slate); });
          s += H("dpt", R(108, 92, 184, 26, C.green, 6) + T(200, 110, "Employee work", 14, C.white));
          s += H("gst", R(28, 196, 344, 26, C.orange, 6) + T(200, 214, "Guest's whole journey", 14, C.white));
          s += H("ic1", person(80, 84, 1.1, C.green) + chip(340, 70, "Department", { sz: 13, st: C.green, fg: C.green }));
          s += H("ic2", `<g class="a-walk">${guest(14, 264, 0.95)}</g>` + chip(320, 256, "Customer", { sz: 13, st: C.orange, fg: C.orange }));
          s += H("nd", chip(200, 40, "Neither is dishonest", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("fl", P("M120 92 V60", C.green, 3) + F("M120 60 L146 68 L120 76 Z", C.green) + P("M280 92 V60", C.red, 3) + F("M280 60 L306 68 L280 76 Z", C.red) + chip(120, 40, "Start event", { sz: 13, st: C.green, fg: C.green }) + chip(282, 40, "Stop event", { sz: 13, st: C.red, fg: C.red }));
          s += H("bd", chip(200, 286, "Measurement boundaries", { sz: 15, bg: C.plum, st: C.plum, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.op("dpt", j >= 0 ? 1 : 0); c.mv("dpt", { sx: j >= 0 ? 1 : 0.02, pv: [108, 105] }, { d: 1.1 }); c.in("ic1", j >= 0 && j < 3, { x: -20 }, { dl: 0.5 });
          c.op("gst", j >= 1 ? 1 : 0); c.mv("gst", { sx: j >= 1 ? 1 : 0.02, pv: [28, 209] }, { d: 1.4 }); c.in("ic2", j >= 1 && j < 3, { x: -20 }, { dl: 0.5 });
          c.in("nd", j === 2, { y: -14 });
          c.in("fl", j === 3, { y: -20 }); c.in("bd", j === 3, { y: 14 }, { dl: 0.4 });
        }
      },
      // Beat 3 · moments 7–10 · Adapted from benchmark 038 "Bar Chart Race, Explained"
      // https://observablehq.com/@d3/bar-chart-race-explained — values interpolate, bars grow and a ticker updates.
      {
        from: 7, to: 10,
        draw: () => {
          let s = H("ex", chip(200, 30, "A simple example", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }) + doc(170, 76, 60, 76, C.navy) + T(200, 186, "One process", 16, C.navy));
          s += H("ax", P("M30 76 V230", C.slate, 2) + T(34, 66, "Elapsed", 14, C.orange, "", "start") + T(34, 156, "Work", 14, C.green, "", "start"));
          s += H("b1", R(30, 82, 340, 46, C.orange, 6));
          s += H("b2", R(30, 172, 66, 46, C.green, 6));
          s += TK("n1", 360, 113, "0", 20, C.white, "end", 'style="opacity:0"');
          s += TK("n2", 112, 203, "0", 20, C.green, "start", 'style="opacity:0"');
          s += H("both", chip(260, 196, "Both true", { sz: 16, bg: C.green, st: C.green, fg: C.white }));
          s += H("gap", R(96, 172, 274, 46, "none", 6, `stroke="${C.orange}" stroke-width="2.4" stroke-dasharray="6 5"`) + T(250, 200, "No active work", 14, C.orange));
          s += H("fm", R(40, 238, 320, 50, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + T(200, 271, "21.1 − 4.1 = 17.0 days", 20, C.navy));
          return s;
        },
        render: (c, j) => {
          c.in("ex", j === 0, { s: 0.7 });
          c.op("ax", j >= 1 ? 1 : 0);
          c.op("b1", j >= 1 ? 1 : 0); c.mv("b1", { sx: j >= 1 ? 1 : 0.01, pv: [30, 105] }, { d: 1.4 });
          c.op("b2", j >= 1 ? 1 : 0); c.mv("b2", { sx: j >= 1 ? 1 : 0.01, pv: [30, 195] }, { d: 1.4, dl: 0.2 });
          c.op("n1", j >= 1 ? 1 : 0); c.cnt("n1", j >= 1 ? 21.1 : 0, { dec: 1, suf: " days", d: 1.4 });
          c.op("n2", j >= 1 ? 1 : 0); c.cnt("n2", j >= 1 ? 4.1 : 0, { dec: 1, suf: " days", d: 1.4, dl: 0.2 });
          c.in("both", j === 2, { s: 0.5 }, { e: "back.out(2)" });
          c.in("gap", j >= 3, { s: 0.9 }); c.in("fm", j >= 3, { y: 20 }, { dl: 0.3 });
        }
      },
      // Beat 4 · moments 11–12 · Adapted from benchmark 040 "Animated treemap"
      // https://observablehq.com/@d3/animated-treemap — blocks resize and relabel as the layout recomputes.
      {
        from: 11, to: 12,
        draw: () => {
          let s = H("tot", R(20, 30, 360, 190, C.peach, 10, `stroke="${C.orange}" stroke-width="2"`));
          s += H("t0", R(20, 30, 190, 190, "#f2c4ae", 10, `stroke="${C.white}" stroke-width="3"`) + R(56, 70, 120, 66, C.white, 6, `stroke="${C.orange}" stroke-width="2"`) + P("M56 70 L116 108 L176 70", C.orange, 2) + T(115, 166, "9 days", 22, C.ink) + T(115, 192, "Shared mailbox", 14, C.ink));
          s += H("t1", R(210, 30, 170, 104, "#c9dcef", 10, `stroke="${C.white}" stroke-width="3"`) + doc(226, 46, 30, 38, C.navy) + T(320, 72, "5 days", 20, C.navy) + T(295, 118, "Guest documents", 13, C.navy));
          s += H("t2", R(210, 134, 170, 86, "#d8e8d0", 10, `stroke="${C.white}" stroke-width="3"`) + coin(240, 160, 11) + T(320, 168, "3 days", 20, C.green) + T(295, 206, "Payment run", 13, C.green));
          s += H("q", chip(110, 252, "Waste?", { sz: 15, st: C.red, fg: C.red }) + chip(290, 252, "Purpose?", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }) + P("M80 252 H140", C.red, 3) + T(200, 257, "→", 18, C.slate) + chip(200, 288, "Investigate each interval", { sz: 13, st: C.navy }));
          return s;
        },
        render: (c, j) => {
          c.op("tot", j >= 0 ? 1 : 0, { d: 0.3 });
          c.in("t0", j >= 0, { s: 0.6 }, { dl: 0.4 }); c.in("t1", j >= 0, { s: 0.6 }, { dl: 0.8 }); c.in("t2", j >= 0, { s: 0.6 }, { dl: 1.2 });
          c.in("q", j >= 1, { y: 20 });
        }
      },
      // Beat 5 · moments 13–15 · Adapted from benchmark 108 "Delivery Truck - Road Animation"
      // https://lottiefiles.com/free-animation/delivery-truck-road-animation-K9xyRiku9v — a vehicle translates along its route.
      {
        from: 13, to: 15,
        draw: () => {
          const ST = [[36, "Enter|lobby"], [116, "Join|queue"], [196, "Complete|reception"], [276, "Await|room"], [356, "Enter|room"]];
          let s = R(-400, 150, 1200, 34, "#d6dde5") + P("M-400 167 H800", C.white, 2, 'stroke-dasharray="14 12"');
          ST.forEach(([x, t], i) => { s += H("s" + i, node(x - 36, 70, 72, 46, t, { sz: 12, st: i === 1 || i === 2 ? C.orange : C.navy })); });
          s += H("br", P("M80 196 V208 H232 V196", C.orange, 3) + chip(156, 230, "23 minutes", { sz: 16, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("bw", P("M4 250 V262 H396 V250", C.navy, 3) + chip(200, 284, "Whole arrival: longer?", { sz: 14, st: C.navy }));
          s += K("g", guest(0, 0, 1.2), 'style="opacity:0"');
          s += H("cmp", R(20, 196, 360, 96, "rgba(255,255,255,.97)", 10, `stroke="${C.slate}" stroke-width="1.6"`) + person(46, 236, 0.9, C.green) + R(70, 222, 110, 18, C.green, 4) + T(190, 237, "Receptionist", 13, C.green, "", "start") + guest(46, 276, 0.8) + R(70, 260, 280, 18, C.orange, 4) + T(210, 275, "Guest", 13, C.white) + badge(360, 230, 11, C.green) + badge(370, 268, 11, C.green));
          return s;
        },
        render: (c, j) => {
          for (let i = 0; i < 5; i++) c.in("s" + i, j >= 0, { y: -20 }, { dl: 0.1 * i });
          c.op("g", j >= 0 ? 1 : 0); c.mv("g", j <= 0 ? { x: 116, y: 158 } : j === 1 ? { x: 340, y: 158 } : { x: 196, y: 158 }, { d: 1.6, e: "power1.inOut" });
          c.in("br", j >= 0 && j < 2, { y: 14 }, { dl: 0.6 }); c.in("bw", j === 1, { y: 14 }, { dl: 0.3 });
          c.in("cmp", j === 2, { y: 30 });
        }
      },
      // Beat 6 · moments 16–18 · Adapted from benchmark 093 "Process-Para"
      // https://lottiefiles.com/free-animation/process-para-qujCEQ2AKT — a ring rotates, waits, then finishes.
      {
        from: 16, to: 18,
        draw: () => {
          const arc = (cx, cy, r, a0, a1) => { const p = (a) => `${(cx + r * Math.cos(a * Math.PI / 180)).toFixed(1)} ${(cy + r * Math.sin(a * Math.PI / 180)).toFixed(1)}`; return `M${p(a0)} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${p(a1)}`; };
          let s = H("rg", O(120, 140, 86, C.white, `stroke="#e3e9ef" stroke-width="18"`) + T(120, 132, "Elapsed", 16, C.orange) + T(120, 156, "vs touch", 15, C.green));
          s += D("el", arc(120, 140, 86, -90, 262), C.orange, 18) + D("tc", arc(120, 140, 62, -90, -10), C.green, 14);
          s += H("lg", chip(300, 90, "Touch: active work", { sz: 13, bg: C.green, st: C.green, fg: C.white }) + chip(300, 130, "Elapsed: everything", { sz: 13, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("sc", R(220, 160, 170, 120, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + desk(260, 226, 90) + person(305, 222, 1.1, C.green) + guest(250, 270, 0.9, C.slate) + `<g class="a-bob">${guest(372, 252, 0.9)}</g>` + clock(372, 194, 12) + T(298, 186, "Serving another", 12, C.navy));
          s += H("ff", R(20, 40, 360, 240, "rgba(255,255,255,.97)", 12, `stroke="${C.slate}" stroke-width="1.6"`) + T(36, 80, "Reception", 15, C.green, "", "start") + R(130, 66, 60, 20, C.green, 4) + F("M196 66 l12 10 l-12 10 Z M210 66 l12 10 l-12 10 Z", C.green) + T(36, 130, "Longest wait", 15, C.orange, "", "start") + R(150, 116, 210, 20, C.orange, 4) + T(255, 131, "unchanged", 13, C.white) + O(200, 210, 34, C.orange) + T(200, 220, "?", 30, C.white) + chip(200, 264, "Faster desk enough?", { sz: 15, st: C.orange, fg: C.orange }));
          return s;
        },
        render: (c, j) => {
          c.in("rg", j >= 0 && j < 2, { s: 0.7 }); c.dr("el", j >= 0 && j < 2 ? 1 : 0, { d: 1.6 }); c.dr("tc", j >= 0 && j < 2 ? 1 : 0, { d: 0.8, dl: 0.4 });
          c.in("lg", j === 0, { x: 30 }, { dl: 0.6 });
          c.in("sc", j === 1, { x: 30 });
          c.in("ff", j === 2, { y: 30 });
        }
      },
      // Beat 7 · moments 19–22 · Adapted from benchmark 128 "Pie chart update"
      // https://observablehq.com/@d3/pie-chart-update — a donut tweens its sectors between two datasets.
      {
        from: 19, to: 22,
        draw: () => {
          let s = H("bar", R(20, 50, 360, 40, "#e3e9ef", 6) + R(20, 50, 230, 40, C.orange, 6) + R(250, 50, 130, 40, C.navy2, 0) + T(135, 76, "Internal", 15, C.white) + T(315, 76, "Customer", 15, C.white));
          s += H("ic", person(135, 140, 1.2, C.orange) + R(110, 158, 50, 8, C.orange, 3) + chip(135, 186, "Organisation", { sz: 13, st: C.orange, fg: C.orange }) + guest(315, 140, 1.1) + doc(340, 116, 20, 26, C.navy) + chip(315, 186, "Guest action", { sz: 13, st: C.navy2, fg: C.navy2 }));
          s += H("cards", [[70, "Internal", C.orange], [200, "Customer", C.navy2], [330, "Total", C.ink]].map(([x, t, col]) => R(x - 58, 120, 116, 84, C.white, 10, `stroke="${col}" stroke-width="2.4"`) + T(x, 150, t, 15, col) + R(x - 34, 166, 68, 20, col, 4)).join("") + person(200, 266, 1.3, C.plum) + chip(296, 260, "Owner sets target", { sz: 13, st: C.plum, fg: C.plum }));
          s += H("fel", R(20, 110, 360, 160, C.white, 12, `stroke="${C.orange}" stroke-width="2"`) + `<g class="a-bob">${guest(80, 220, 1.6)}</g>` + R(130, 160, 230, 30, C.orange, 6) + R(270, 160, 90, 30, C.navy2, 0) + T(245, 216, "Every minute felt", 15, C.ink) + clock(130, 140, 13));
          return s;
        },
        render: (c, j) => {
          c.in("bar", j >= 0, { s: 0.8 });
          c.in("ic", j === 0 || j === 1, { y: 20 }, { dl: 0.3 });
          c.mv("bar", j === 1 ? { y: -6 } : {});
          c.in("cards", j === 2, { y: 30 });
          c.in("fel", j === 3, { y: 30 });
        }
      },
      // Beat 8 · moments 23–25 · Adapted from benchmark 063 "Awwwards SVG lines scroll animation (FEED Agency)"
      // https://www.awwwards.com/inspiration/svg-lines-scroll-animation-feed-agency — lines trace progressively as the view advances.
      {
        from: 23, to: 25,
        draw: () => {
          let s = P("M20 150 H380", "#cfd9e4", 26);
          s += D("ln", "M20 150 H380", C.orange, 26);
          s += H("win", R(120, 104, 110, 92, "rgba(255,255,255,.35)", 10, `stroke="${C.green}" stroke-width="4"`) + chip(175, 80, "Front office", { sz: 14, bg: C.green, st: C.green, fg: C.white }) + chip(175, 222, "Looks fast", { sz: 14, st: C.green, fg: C.green }));
          s += H("dim", R(-400, 100, 520, 100, "rgba(20,38,58,.55)") + R(230, 100, 570, 100, "rgba(20,38,58,.55)") + chip(60, 252, "Hidden wait", { sz: 13, bg: C.red, st: C.red, fg: C.white }) + chip(310, 252, "Hidden wait", { sz: 13, bg: C.red, st: C.red, fg: C.white }));
          s += H("tg", O(200, 70, 34, C.white, `stroke="${C.red}" stroke-width="5"`) + O(200, 70, 20, C.white, `stroke="${C.red}" stroke-width="5"`) + O(200, 70, 7, C.red) + chip(200, 222, "Objective decides boundary", { sz: 14, bg: C.navy, st: C.navy, fg: C.white }) + P("M20 186 V196 H380 V186", C.navy, 3));
          return s;
        },
        render: (c, j) => {
          c.dr("ln", j >= 0 ? 1 : 0, { d: 1.4 });
          c.in("win", j >= 0 && j < 2, { s: 0.6 }, { dl: 0.6 });
          c.op("dim", j === 1 ? 1 : 0);
          c.in("tg", j === 2, { y: -20 });
        }
      },
      // Beat 9 · moments 26–28 · Adapted from benchmark 137 "Corporate Timeline by HenlyFx"
      // https://motionarray.com/after-effects-templates/corporate-timeline-1939632/ — events reveal one by one along a line.
      {
        from: 26, to: 28,
        draw: () => {
          const L = ["Guest|arrives", "Reception|activities", "Other|waits", "Room|available", "Enters|room"];
          let s = "";
          L.forEach((t, i) => { s += H("p" + i, node(4 + i * 79, 40, 74, 50, t, { sz: 12, st: i === 2 ? C.orange : C.navy })); if (i < 4) s += darrow("pa" + i, 78 + i * 79, 65, 83 + i * 79, 65, C.navy, 2.2); });
          s += H("bk", P("M6 100 V112 H394 V100", C.green, 3) + chip(200, 132, "Arrival to room access", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
          s += H("card", R(60, 160, 280, 120, C.white, 10, `stroke="${C.navy}" stroke-width="2.4"`) + R(60, 160, 280, 28, C.navy, 10) + R(60, 176, 280, 12, C.navy) + T(200, 180, "Measure definition", 14, C.white) + P("M84 210 V198", C.green, 3) + F("M84 198 L100 203 L84 208 Z", C.green) + T(110, 214, "Start event", 14, C.ink, "", "start") + P("M84 240 V228", C.red, 3) + F("M84 228 L100 233 L84 238 Z", C.red) + T(110, 244, "End event", 14, C.ink, "", "start") + O(90, 266, 6, C.orange) + T(110, 271, "Exception rules", 14, C.ink, "", "start"));
          s += H("bf", T(30, 186, "Before", 14, C.navy, "", "start") + R(100, 172, 280, 22, C.navy2, 5) + T(30, 236, "After", 14, C.navy, "", "start"));
          s += H("af", R(220, 222, 160, 22, C.green, 5) + P("M100 233 H210", C.red, 2, 'stroke-dasharray="4 4"') + P("M220 214 V252", C.red, 3) + F("M220 214 L236 220 L220 226 Z", C.red) + chip(160, 278, "Moved start, fake gain", { sz: 13, bg: C.red, st: C.red, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.seq("p", 5, j >= 0 ? 5 : 0, { y: -14 });
          c.in("bk", j >= 0 && j < 2, { y: 14 }, { dl: 0.6 });
          c.in("card", j === 1, { y: 30 });
          c.in("bf", j === 2, { x: -20 }); c.in("af", j === 2, { x: 30 }, { dl: 0.5 });
        }
      },
      // Beat 10 · moments 29–32 · Adapted from benchmark 120 "Animated Dashboards"
      // https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ — panels transition between dashboard states.
      {
        from: 29, to: 32,
        draw: () => {
          let s = H("ts", R(30, 40, 180, 160, C.night, 10) + rep(5, (i) => T(46, 76 + i * 26, ["18:02:11", "18:09:47", "18:31:05", "18:56:40", "19:24:02"][i], 15, "#9fe0bf", 'font-family="monospace"', "start")) + O(300, 120, 44, C.orange) + T(300, 134, "?", 40, C.white) + chip(300, 196, "What does it mean?", { sz: 13, st: C.orange, fg: C.orange }));
          s += H("sh", person(110, 260, 1.3, C.navy) + person(160, 260, 1.3, C.green) + person(210, 260, 1.3, C.plum) + chip(310, 254, "Agreed meaning", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
          s += H("tri", [[80, "12.4", C.navy], [200, "23", C.orange], [320, "82.0", C.green]].map(([x, v, col]) => watch(x, 150, 52, col) + T(x, 160, "?", 34, col)).join(""));
          s += H("ttl", chip(200, 40, "Three Qasr figures", { sz: 16, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("q", chip(200, 260, "Whose clock is running?", { sz: 16, bg: C.orange, st: C.orange, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.in("ts", j >= 0 && j < 2, { x: -30 });
          c.in("sh", j === 1, { y: 20 });
          c.in("tri", j >= 2, { s: 0.6 }); c.in("ttl", j >= 2, { y: -14 }, { dl: 0.3 });
          c.in("q", j === 3, { s: 0.6 }, { e: "back.out(2)" });
        }
      }
    ];
    VL_SCENES[id] = makeScene({ id, N, labels, beats, back: () => backdrop("#eef2f6", "#dfe6ee"),
      desc: "Whose clock are we using: a stopwatch's start and stop events, a departmental ruler against the guest's journey, 21.1 elapsed days against 4.1 days of work with 17 days broken down, touch versus elapsed time, internal versus customer-attributable delay, a front-office window hiding waiting, and an explicit arrival-to-room boundary." });
    SCENE_BG.push([id, "#eef2f6"]);
  }

  // ============================================================
  // W8O2b · "WHEN THE STORY AND THE DATA DISAGREE"  ·  33 moments · 10 beats
  // Story: one bright guest-star over fourteen properties; one case vs a
  // measured population; three stormy evenings that dominate memory; a
  // sample net across quiet, busy and approval arrivals; an average line
  // that no single guest lives; a distribution with a long tail; rare vs
  // recurring; the hardship hidden behind a comfortable average; pattern
  // and mechanism as two halves of one picture; consistent boundaries;
  // and the story-to-baseline route that leads into the three figures.
  // ============================================================
  {
    const id = "W8O2b", N = 33;
    const labels = [
      "Story versus data", "One memorable guest", "Twenty-three minutes", "Real and important",
      "One guest, fourteen properties?", "Pattern proved worse", "One case only", "Complaint still matters",
      "Story gives direction", "Three hard evenings", "Memory amplifies drama", "Unusual feels typical",
      "Seek wider evidence", "Take a sample", "Capture real variation", "Quiet, busy, approvals",
      "Routine or conditional?", "The average arrives", "Nobody is average", "Faster and slower",
      "See the distribution", "Rare or recurring?", "Different interventions", "Averages can dismiss",
      "Hardship stays real", "Pattern plus case", "Prevalence and mechanism", "Same boundaries everywhere",
      "Don't mix clocks", "Keep her story", "Story, then baseline", "Three figures next",
      "Neither tells all"
    ];
    const H8 = [3, 6, 8, 7, 5, 3, 2, 1, 1, 2];
    const MAP = [[60, 70], [120, 50], [180, 80], [250, 56], [320, 74], [70, 140], [140, 130], [210, 150], [280, 128], [345, 150], [90, 210], [170, 214], [250, 206], [330, 220]];
    const beats = [
      // Beat 1 · moments 0–2 · Adapted from benchmark 105 "World map with logistics"
      // https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy — routes trace between hubs on a map.
      {
        from: 0, to: 2,
        draw: () => {
          let s = H("ttl", T(200, 128, "One story", 26, C.orange) + T(200, 160, "many arrivals", 22, C.navy));
          s += H("hub", MAP.map(([x, y], i) => hotel(x - 14, y - 12, 28, 26, i === 6 ? C.orange : C.navy2)).join(""));
          s += H("rt", P("M60 70 L120 50 L180 80 L250 56 L320 74 M70 140 L140 130 L210 150 L280 128 L345 150 M90 210 L170 214 L250 206 L330 220", C.muted, 1.6, 'stroke-dasharray="4 5"'));
          s += H("spot", O(140, 130, 46, "rgba(229,183,108,.35)", `stroke="${C.gold}" stroke-width="3" class="a-pulse"`) + guest(140, 136, 1.2));
          s += H("tm", watch(310, 200, 40, C.orange) + T(310, 210, "23 min", 18, C.orange) + chip(150, 262, "Room not ready", { sz: 14, bg: C.red, st: C.red, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.in("ttl", j === 0, { s: 0.8 });
          c.op("hub", j >= 1 ? (j === 2 ? 0.25 : 0.55) : 0); c.op("rt", j >= 1 ? 0.6 : 0);
          c.in("spot", j >= 1, { s: 0.3 }, { dl: 0.3, e: "back.out(1.8)" });
          c.in("tm", j === 2, { x: 30 });
        }
      },
      // Beat 2 · moments 3–5 · Adapted from benchmark 106 "Supply Chain and logistics"
      // https://lottiefiles.com/free-animation/supply-chain-and-logistics-8PtoYRCbiu — dispatch, transit and receipt connect across a network.
      {
        from: 3, to: 5,
        draw: () => {
          let s = H("hub", MAP.map(([x, y]) => hotel(x - 16, y - 14, 32, 30, C.navy2)).join(""));
          s += H("st", O(140, 130, 30, "rgba(192,80,42,.25)", `stroke="${C.orange}" stroke-width="3"`) + guest(140, 136, 1));
          s += H("real", chip(200, 266, "Real, frustrating, important", { sz: 14, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("q", MAP.map(([x, y], i) => i === 6 ? "" : O(x + 14, y - 14, 9, C.white, `stroke="${C.navy}" stroke-width="2"`) + T(x + 14, y - 10, "?", 11, C.navy)).join("") + chip(200, 268, "Typical of all 14?", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("bars", R(20, 40, 360, 210, "rgba(255,255,255,.97)", 12, `stroke="${C.slate}" stroke-width="1.6"`) + T(36, 82, "Her story", 15, C.orange, "", "start") + R(140, 66, 110, 24, C.orange, 4) + T(36, 152, "Measured", 15, C.navy, "", "start") + T(36, 172, "pattern", 15, C.navy, "", "start"));
          s += H("bar2", R(140, 140, 230, 40, C.navy, 4));
          s += H("worse", chip(255, 222, "Far worse overall", { sz: 15, bg: C.red, st: C.red, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.op("hub", j >= 0 && j < 2 ? 1 : 0); c.in("st", j >= 0 && j < 2, { s: 0.5 });
          c.in("real", j === 0, { y: 14 }, { dl: 0.3 }); c.in("q", j === 1, { s: 0.5 });
          c.in("bars", j === 2, { y: 20 }); c.op("bar2", j === 2 ? 1 : 0); c.mv("bar2", { sx: j === 2 ? 1 : 0.02, pv: [140, 160] }, { d: 1.6, dl: 0.5 });
          c.in("worse", j === 2, { y: 14 }, { dl: 1.6 });
        }
      },
      // Beat 3 · moments 6–8 · Adapted from benchmark 064 "Awwwards Kairon Labs SVG animation"
      // https://www.awwwards.com/inspiration/svg-animation-on-scroll-https-kaironlabs-com — visual states are scrubbed to reveal the next composition (zoom out).
      {
        from: 6, to: 8,
        draw: () => {
          let s = H("one", O(110, 140, 70, C.white, `stroke="${C.orange}" stroke-width="3"`) + guest(110, 150, 1.6) + chip(110, 238, "Individual case", { sz: 14, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("many", R(214, 60, 170, 160, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + rep(40, (i) => O(232 + (i % 8) * 19, 80 + Math.floor(i / 8) * 28, 6, i === 21 ? C.orange : C.navy2)) + chip(299, 238, "Process measure", { sz: 14, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("vs", O(185, 140, 16, C.slate) + T(185, 145, "vs", 13, C.white));
          s += H("bell", F("M80 66 Q80 40 110 40 Q140 40 140 66 L146 92 H74 Z", C.gold) + O(110, 98, 6, C.amber) + chip(110, 22, "Signals a problem", { sz: 13, st: C.amber, fg: C.amber }));
          s += H("cmp", R(20, 34, 360, 52, C.white, 10, `stroke="${C.green}" stroke-width="2"`) + F("M44 60 l14 -12 v24 Z", C.green) + T(200, 66, "Story points the way", 17, C.green));
          return s;
        },
        render: (c, j) => {
          c.in("one", j >= 0, { s: 0.6 }); c.in("many", j >= 0, { x: 30 }, { dl: 0.4 }); c.in("vs", j >= 0, { s: 0.3 }, { dl: 0.7 });
          c.in("bell", j === 1, { y: -20 }); c.mv("bell", j === 1 ? { r: 0 } : {});
          c.in("cmp", j === 2, { y: -20 });
        }
      },
      // Beat 4 · moments 9–12 · Adapted from benchmark 065 "Awwwards background SVG animation (Henning Tillmann)"
      // https://www.awwwards.com/inspiration/background-svg-animation-on-scroll-henning-tillmann — background elements re-position and re-weight with progress.
      {
        from: 9, to: 12,
        draw: () => {
          let s = H("mgr", person(54, 230, 1.6, C.plum) + bubble(10, 130, 110, 50, "Terrible!", { sz: 16, st: C.plum, fg: C.plum, tx: 40 }));
          s += H("mem", O(70, 70, 44, C.lilac, `stroke="${C.plum}" stroke-width="2" stroke-dasharray="5 4"`) + T(70, 76, "Memory", 14, C.plum));
          s += rep(3, (i) => H("cl" + i, `<g transform="translate(${170 + i * 74} ${70 + (i % 2) * 12})">${E(0, 0, 32, 20, "#5d7389")}${E(-16, 6, 18, 13, "#5d7389")}${E(18, 6, 18, 13, "#5d7389")}${F("M-4 18 L-12 38 L-2 38 L-8 54 L8 32 L-2 32 L4 18 Z", C.gold)}</g>`));
          s += H("calm", rep(24, (i) => `<g transform="translate(${150 + (i % 8) * 30} ${170 + Math.floor(i / 8) * 34})">${O(0, 0, 9, C.green)}${tick(0, 0, 0.5, C.white, 2)}</g>`) + chip(270, 282, "Routine arrivals", { sz: 13, st: C.green, fg: C.green }));
          s += H("ev", chip(170, 26, "Busy evening: 3 arrivals", { sz: 13, st: C.slate, fg: C.slate }));
          s += H("seek", R(130, 40, 260, 230, "rgba(255,255,255,.96)", 12, `stroke="${C.navy}" stroke-width="2"`) + `<g class="a-bob">${lens(220, 130, 44, C.navy)}</g>` + chip(260, 240, "Wider evidence?", { sz: 16, bg: C.navy, st: C.navy, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.in("mgr", j >= 0, { x: -30 }); c.in("ev", j === 0, { y: -14 }, { dl: 0.2 });
          for (let i = 0; i < 3; i++) { c.in("cl" + i, j >= 0, { y: -40 }, { dl: 0.2 + 0.2 * i }); c.mv("cl" + i, j >= 1 && j < 3 ? { s: 1.25 } : j >= 0 ? {} : { y: -40 }, { d: 1 }); }
          c.in("calm", j >= 1, { s: 0.7 }); c.op("calm", j >= 1 ? (j >= 2 ? 0.3 : 0.7) : 0);
          c.in("mem", j >= 1, { s: 0.5 }); c.mv("mem", j === 2 ? { s: 1.3 } : {});
          c.in("seek", j === 3, { s: 0.8 });
        }
      },
      // Beat 5 · moments 13–16 · Adapted from benchmark 027 "Logistic - Warehouse"
      // https://lottiefiles.com/free-animation/logistic-warehouse-json-animation-2kz8lGzNGD — items cycle through intake, holding and dispatch.
      {
        from: 13, to: 16,
        draw: () => {
          let s = rep(36, (i) => { const x = 30 + (i % 12) * 30, y = 50 + Math.floor(i / 12) * 34, t = i % 12; const col = t < 4 ? C.navy2 : t < 8 ? C.orange : C.plum; return `<g data-k="a${i}" style="opacity:0">${O(x, y, 10, col)}${t >= 8 ? O(x, y, 4, C.white) : ""}</g>`; });
          s += H("net", R(20, 32, 360, 106, "none", 12, `stroke="${C.green}" stroke-width="3" stroke-dasharray="8 6"`) + chip(200, 160, "Sample", { sz: 16, bg: C.green, st: C.green, fg: C.white }));
          s += H("bias", R(20, 32, 70, 106, "none", 10, `stroke="${C.red}" stroke-width="3"`) + chip(120, 196, "Convenient only?", { sz: 13, st: C.red, fg: C.red }) + cross(55, 18, 0.9, C.red));
          s += H("cols", [[80, "Quiet", C.navy2, O(80, 210, 12, C.gold)], [200, "Busy", C.orange, moon(200, 210, 13)], [320, "Approvals", C.plum, doc(308, 196, 24, 30, C.plum)]].map(([x, t, col, ic]) => ic + chip(x, 250, t, { sz: 14, bg: col, st: col, fg: C.white })).join(""));
          s += H("cmp", R(30, 196, 340, 90, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + T(48, 226, "Routine?", 15, C.navy, "", "start") + T(48, 262, "Conditional?", 15, C.orange, "", "start") + R(170, 214, 180, 14, C.navy2, 4) + R(170, 250, 60, 14, C.navy2, 4) + R(230, 250, 120, 14, C.orange, 4));
          return s;
        },
        render: (c, j) => {
          for (let i = 0; i < 36; i++) { const t = i % 12; const on = j >= 0; c.op("a" + i, on ? (j === 3 ? (t < 4 ? 0.5 : 1) : 1) : 0, { dl: 0.02 * i }); c.mv("a" + i, on ? {} : { y: -30 }, { dl: 0.02 * i }); }
          c.in("net", j >= 0 && j < 3, { s: 1.2 }, { dl: 0.6 });
          c.in("bias", j === 1, { s: 0.6 });
          c.in("cols", j === 2, { y: 20 });
          c.in("cmp", j === 3, { y: 30 });
        }
      },
      // Beat 6 · moments 17–19 · Adapted from benchmark 112 "Infographics Pack by ARstudio"
      // https://motionarray.com/after-effects-templates/infographics-pack-135055/ — chart primitives, guides and callouts reveal in sequence.
      {
        from: 17, to: 19,
        draw: () => {
          const V = [62, 140, 96, 210, 74, 118, 170, 88, 230, 104, 130, 82];
          let s = P("M24 250 H380", C.slate, 2);
          V.forEach((v, i) => { s += `<g data-k="d${i}" style="opacity:0">${O(44 + i * 30, 250 - v, 9, v > 150 ? C.orange : C.navy2)}${P(`M${44 + i * 30} 250 V${259 - v}`, v > 150 ? C.orange : C.navy2, 2, 'opacity=".4"')}</g>`; });
          s += H("mean", P("M24 132 H380", C.green, 3, 'stroke-dasharray="8 6"') + chip(84, 112, "Average", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
          s += H("no", chip(300, 40, "Nobody exactly here", { sz: 14, st: C.red, fg: C.red }) + P("M300 54 V122", C.red, 2, 'stroke-dasharray="3 3"'));
          s += H("fs", chip(110, 280, "Faster", { sz: 14, st: C.navy2, fg: C.navy2 }) + chip(290, 40, "Much slower", { sz: 14, bg: C.orange, st: C.orange, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          for (let i = 0; i < 12; i++) { c.op("d" + i, j >= 0 ? 1 : 0, { dl: 0.06 * i }); c.mv("d" + i, j < 0 ? { y: 30 } : j === 2 ? { s: 1.2 } : {}, { dl: 0.06 * i }); }
          c.in("mean", j >= 0, { x: -40 }, { dl: 0.9 });
          c.in("no", j === 1, { y: -14 });
          c.in("fs", j === 2, { s: 0.6 });
        }
      },
      // Beat 7 · moments 20–22 · Adapted from benchmark 116 "Infographics by Ruslan Klimovich"
      // https://motionarray.com/after-effects-templates/infographics-3844461/ — statistic graphics build and sequence.
      {
        from: 20, to: 22,
        draw: () => {
          let s = P("M24 236 H380", C.slate, 2) + T(30, 260, "Short", 13, C.slate, "", "start") + T(374, 260, "Long", 13, C.slate, "", "end");
          H8.forEach((h, i) => { s += rep(h, (r) => `<g data-k="h${i}_${r}" style="opacity:0">${R(30 + i * 35, 222 - r * 18, 30, 15, i >= 7 ? C.orange : C.navy2, 3)}</g>`); });
          s += H("tail", R(272, 150, 112, 92, "none", 10, `stroke="${C.orange}" stroke-width="3" stroke-dasharray="6 4"`) + chip(328, 130, "Long tail", { sz: 14, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("two", R(20, 30, 170, 90, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + T(105, 56, "Rare event", 15, C.navy) + O(105, 88, 10, C.orange) + R(210, 30, 170, 90, C.white, 10, `stroke="${C.red}" stroke-width="2"`) + T(295, 56, "Recurring", 15, C.red) + rep(6, (i) => O(250 + i * 16, 88, 7, C.orange)));
          s += H("act", chip(105, 120, "Proportionate fix", { sz: 13, st: C.navy }) + chip(295, 120, "System fix", { sz: 13, bg: C.red, st: C.red, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          H8.forEach((h, i) => { for (let r = 0; r < h; r++) { c.op(`h${i}_${r}`, j >= 0 ? 1 : 0, { dl: 0.03 * (i * 3 + r) }); c.mv(`h${i}_${r}`, j >= 0 ? {} : { y: -60 }, { dl: 0.03 * (i * 3 + r), e: "bounce.out" }); } });
          c.in("tail", j === 0, { s: 0.6 }, { dl: 1.2 });
          c.in("two", j >= 1, { y: -20 }); c.in("act", j === 2, { y: 14 });
        }
      },
      // Beat 8 · moments 23–24 · Adapted from benchmark 125 "Infographics Dashboard"
      // https://lottiefiles.com/free-animation/infographics-dashboard-X6P5rVLZAB — a pie arc grows beside a metric graph.
      {
        from: 23, to: 24,
        draw: () => {
          let s = H("rep", R(20, 30, 200, 120, C.white, 10, `stroke="${C.green}" stroke-width="2.4"`) + T(120, 58, "Average arrival", 14, C.green) + T(120, 104, "Acceptable", 22, C.green) + badge(120, 130, 12, C.green));
          s += H("mg", person(300, 120, 1.6, C.plum) + bubble(240, 30, 140, 42, "Complaints overstated", { sz: 12, st: C.plum, fg: C.plum, tx: 60 }));
          s += H("hid", R(20, 170, 360, 116, "#f8e3d8", 12, `stroke="${C.orange}" stroke-width="2.4"`) + guest(60, 250, 1.3) + guest(110, 250, 1.3) + guest(160, 250, 1.3) + clock(60, 196, 12) + clock(110, 196, 12) + clock(160, 196, 12));
          s += H("hs", chip(290, 228, "Hardship stays real", { sz: 15, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("cur", R(20, 170, 360, 116, "#5d7389", 12) + T(200, 236, "Hidden behind average", 15, C.white));
          return s;
        },
        render: (c, j) => {
          c.in("rep", j >= 0, { x: -30 }); c.in("mg", j >= 0, { x: 30 }, { dl: 0.3 });
          c.in("hid", j >= 0, { y: 30 }, { dl: 0.5 });
          c.op("cur", j === 0 ? 1 : 0); c.in("hs", j === 1, { s: 0.6 }, { dl: 0.6 }); c.mv("cur", j === 1 ? { sy: 0.02, pv: [200, 170] } : {}, { d: 1 });
        }
      },
      // Beat 9 · moments 25–28 · Adapted from benchmark 094 "Process - Success"
      // https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP — an activity transforms into a completed check.
      {
        from: 25, to: 28,
        draw: () => {
          let s = H("pz", F("M30 60 H180 V110 a18 18 0 1 1 0 36 V200 H30 Z", C.navy2) + F("M220 60 H370 V200 H220 V146 a18 18 0 1 0 0 -36 Z", C.orange) + T(105, 120, "Measured", 17, C.white) + T(105, 144, "pattern", 17, C.white) + T(295, 120, "Detailed", 17, C.white) + T(295, 144, "case", 17, C.white));
          s += H("lb", chip(105, 230, "How often", { sz: 15, st: C.navy2, fg: C.navy2 }) + chip(295, 230, "Why it happened", { sz: 15, st: C.orange, fg: C.orange }));
          s += H("ok", badge(200, 128, 22, C.green) + chip(200, 272, "Complementary evidence", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
          s += H("rul", T(30, 82, "Arrival A", 14, C.navy, "", "start") + R(110, 66, 270, 22, C.navy2, 5) + T(30, 132, "Arrival B", 14, C.navy, "", "start") + R(110, 116, 270, 22, C.navy2, 5) + T(30, 182, "Arrival C", 14, C.navy, "", "start") + R(110, 166, 270, 22, C.navy2, 5) + P("M110 50 V200 M380 50 V200", C.green, 3) + chip(200, 240, "Same start, same stop", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
          s += H("mix", T(30, 82, "Guest 1", 14, C.navy, "", "start") + R(110, 66, 100, 22, C.orange, 5) + T(220, 82, "reception only", 13, C.orange, "", "start") + T(30, 132, "Guest 2", 14, C.navy, "", "start") + R(110, 116, 270, 22, C.navy2, 5) + T(245, 132, "full arrival", 13, C.white) + O(200, 190, 22, C.red) + T(200, 197, "≠", 20, C.white) + chip(200, 250, "Not comparable", { sz: 15, bg: C.red, st: C.red, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.in("pz", j >= 0 && j < 2, {}); c.mv("pz", j === 1 ? { s: 0.95 } : {});
          c.in("lb", j === 0, { y: 14 }, { dl: 0.4 });
          c.in("ok", j === 1, { s: 0.4 }, { e: "back.out(2)" });
          c.in("rul", j === 2, { x: -30 }); c.in("mix", j === 3, { x: 30 });
        }
      },
      // Beat 10 · moments 29–32 · Adapted from benchmark 091 "cro process"
      // https://lottiefiles.com/free-animation/cro-process-RaUu5ps2to — a marker moves across successive business steps.
      {
        from: 29, to: 32,
        draw: () => {
          const L = ["Guest|experience", "Investigate|cases", "Measure|patterns", "Explain|variation", "Establish|baseline"];
          let s = "";
          L.forEach((t, i) => { s += H("p" + i, node(4 + i * 79, 40, 74, 50, t, { sz: 12, st: i === 0 ? C.orange : i === 4 ? C.green : C.navy, bg: i === 4 ? C.mint : C.white })); if (i < 4) s += darrow("pa" + i, 78 + i * 79, 65, 83 + i * 79, 65, C.navy, 2.2); });
          s += H("hold", O(200, 180, 60, "rgba(229,183,108,.3)", `stroke="${C.gold}" stroke-width="3" class="a-pulse"`) + guest(200, 196, 1.8) + star(250, 136, 16) + chip(200, 268, "Her story stays", { sz: 16, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("keep", star(41, 22, 12) + chip(120, 130, "Story kept", { sz: 14, bg: C.orange, st: C.orange, fg: C.white }) + chip(290, 130, "Data decides", { sz: 14, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("fig", [[80, "12.4", C.navy], [200, "23", C.orange], [320, "82.0", C.green]].map(([x, v, col]) => R(x - 52, 152, 104, 74, C.white, 10, `stroke="${col}" stroke-width="2.4"`) + T(x, 196, v, 26, col) + T(x, 216, "min", 13, col)).join(""));
          s += H("q", chip(200, 262, "Neither alone is enough", { sz: 15, bg: C.plum, st: C.plum, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.seq("p", 5, j < 0 ? 0 : j === 0 ? 1 : 5, { y: -14 });
          c.in("hold", j === 0, { s: 0.6 }, { dl: 0.3 });
          c.in("keep", j === 1, { y: 14 }); c.in("fig", j >= 2, { y: 30 }); c.in("q", j === 3, { s: 0.6 }, { e: "back.out(2)" });
        }
      }
    ];
    VL_SCENES[id] = makeScene({ id, N, labels, beats, back: () => backdrop("#f3f1f7", "#e5e0ee", "dots"),
      desc: "When the story and the data disagree: one memorable guest among fourteen properties, an individual case against a measured population, stormy evenings that dominate memory, a sample across quiet, busy and approval arrivals, an average no guest lives, a long-tailed distribution, hardship hidden by averages, and pattern plus case leading to a baseline." });
    SCENE_BG.push([id, "#f3f1f7"]);
  }

  // ============================================================
  // W8O2c · "TWENTY-THREE MINUTES OR EIGHTY-TWO?"  ·  33 moments · 10 beats
  // Story: three dials argue; the traveller's 23 minutes (her rate found
  // by phone in seven); the 12.4-minute system window from booking-open
  // to key; 310 arrivals over fourteen properties and six weeks; the
  // 82.0-minute mean and what a mean is; three boundaries side by side;
  // the 47-minute approval wait in 61% of arrivals, the largest piece;
  // the director's fair objection vs the programme question; and the
  // validated end-to-end baseline that keeps all three numbers.
  // ============================================================
  {
    const id = "W8O2c", N = 33;
    const labels = [
      "23 or 82?", "Three measurements", "Which one, and why?", "Back to the traveller",
      "Queue to desk: 23", "Rate by phone: 7", "System says 12.4", "Booking to key",
      "Outside the window", "Accurate, but narrow", "Fourteen properties", "Lobby to room",
      "Mean: 82.0 minutes", "What a mean is", "Not everyone's 82", "Disagreement explained",
      "Boundaries and populations", "More than the numbers", "47 minutes, 61%", "The biggest piece",
      "Faster desk won't fix", "Purpose still matters", "Excluding hides experience", "The director objects",
      "Two legitimate questions", "Accountability is fair", "Boundary versus blame", "The baseline candidate",
      "Validate, then agree", "Narrow measures stay", "Local success, guests wait", "Answer the question",
      "Keep all three"
    ];
    const DIAL = (x, y, r, v, col, lab, key) => watch(x, y, r, col) + T(x, y + 10, v, Math.round(r * 0.5), col) + T(x, y + r + 26, lab, 13, col);
    const beats = [
      // Beat 1 · moments 0–2 · Adapted from benchmark 119 "Infographics V2 by Typoland"
      // https://motionarray.com/after-effects-templates/infographics-v2-556482/ — statistic modules scale in with numeric tweens.
      {
        from: 0, to: 2,
        draw: () => {
          let s = H("d0", DIAL(72, 130, 56, "12.4", C.navy, "System"));
          s += H("d1", DIAL(200, 130, 56, "23", C.orange, "One guest"));
          s += H("d2", DIAL(328, 130, 56, "82.0", C.green, "Programme"));
          s += H("ttl", chip(200, 28, "Same process?", { sz: 16, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("q", O(200, 252, 24, C.orange) + T(200, 261, "?", 26, C.white) + chip(96, 252, "Which baseline", { sz: 14, st: C.orange, fg: C.orange }) + chip(306, 252, "Different boundaries", { sz: 13, st: C.navy }));
          return s;
        },
        render: (c, j) => {
          for (let i = 0; i < 3; i++) c.in("d" + i, j >= 0, { s: 0.3, y: 30 }, { dl: 0.2 * i, e: "back.out(1.6)" });
          c.in("ttl", j >= 1, { y: -14 });
          c.in("q", j >= 2, { y: 20 });
          if (j === 1) for (let i = 0; i < 3; i++) c.mv("d" + i, { r: i === 1 ? 0 : i === 0 ? -6 : 6 }, { d: 0.6 });
        }
      },
      // Beat 2 · moments 3–5 · Adapted from benchmark 022 "Steps Infographic"
      // https://elements.envato.com/steps-infographic-5NHT2YG — steps introduced in sequence.
      {
        from: 3, to: 5,
        draw: () => {
          let s = desk(240, 170, 130) + person(305, 162, 1.6, C.green);
          s += rep(4, (i) => guest(60 + i * 40, 200, 1, i === 3 ? C.navy2 : C.slate));
          s += K("g", `<g class="a-walk">${guest(0, 0, 1.4)}</g>`, 'style="opacity:0"');
          s += H("br", P("M40 228 V240 H360 V228", C.orange, 3) + chip(200, 262, "Queue to leaving desk", { sz: 14, st: C.orange, fg: C.orange }));
          s += H("w", watch(90, 80, 44, C.orange) + T(90, 90, "23", 26, C.orange) + T(150, 86, "minutes", 15, C.orange, "", "start"));
          s += H("ph", `<g class="a-ring">${phone(330, 70, 1.4, C.green)}</g>` + chip(250, 40, "Rate by phone", { sz: 13, st: C.green, fg: C.green }) + watch(250, 96, 26, C.green) + T(250, 103, "7", 18, C.green));
          s += H("lk", chip(200, 286, "Revenue answered: lucky", { sz: 13, bg: C.green, st: C.green, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.op("g", j >= 0 ? 1 : 0); c.mv("g", j <= 0 ? { x: 40, y: 200 } : { x: 222, y: 200 }, { d: 1.6 });
          c.in("br", j >= 1, { y: 14 }); c.in("w", j >= 1, { s: 0.4 }, { e: "back.out(2)" });
          c.in("ph", j === 2, { s: 0.4 }); c.in("lk", j === 2, { y: 14 }, { dl: 0.5 });
          c.op("br", j === 1 ? 1 : 0);
        }
      },
      // Beat 3 · moments 6–9 · Adapted from benchmark 123 "DashBoard by Amit Prajapati"
      // https://lottiefiles.com/free-animation/dashboard-krY5yHjJRp — an IT dashboard screen comes into focus.
      {
        from: 6, to: 9,
        draw: () => {
          let s = H("mon", R(90, 26, 220, 140, C.night, 12) + R(100, 36, 200, 110, "#1e4566", 6) + T(200, 70, "Processing", 14, "#9cc6e2") + R(184, 166, 32, 20, C.night) + R(150, 186, 100, 8, C.night, 3));
          s += TK("v", 200, 120, "0", 36, "#9fe0bf", "middle", 'style="opacity:0"');
          const ST = [[30, "Enter|lobby"], [110, "Booking|opened"], [200, "Rate|set"], [290, "Key|encoded"], [370, "Enter|room"]];
          s += H("tl", P("M20 236 H380", C.slate, 3) + ST.map(([x, t]) => O(x, 236, 7, C.white, `stroke="${C.slate}" stroke-width="2.4"`) + T(x, 266, t.split("|")[0], 12, C.slate) + T(x, 281, t.split("|")[1], 12, C.slate)).join(""));
          s += H("win", R(110, 220, 180, 32, "rgba(31,78,121,.18)", 6, `stroke="${C.navy}" stroke-width="3"`) + chip(200, 206, "12.4 min window", { sz: 13, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("out", R(20, 222, 86, 28, "rgba(192,80,42,.25)", 5, `stroke="${C.orange}" stroke-width="2" stroke-dasharray="4 3"`) + R(294, 222, 86, 28, "rgba(192,80,42,.25)", 5, `stroke="${C.orange}" stroke-width="2" stroke-dasharray="4 3"`) + T(63, 212, "Not counted", 12, C.orange) + T(337, 212, "Not counted", 12, C.orange));
          s += H("acc", badge(330, 80, 18, C.green) + chip(330, 124, "Accurate", { sz: 13, st: C.green, fg: C.green }) + chip(70, 124, "Narrow question", { sz: 13, st: C.orange, fg: C.orange }));
          return s;
        },
        render: (c, j) => {
          c.in("mon", j >= 0, { y: -20 }); c.op("v", j >= 0 ? 1 : 0); c.cnt("v", j >= 0 ? 12.4 : 0, { dec: 1, suf: " min", d: 1.4 });
          c.in("tl", j >= 1, { y: 20 }); c.in("win", j >= 1, { sx: 0.1 }, { dl: 0.4 });
          c.in("out", j >= 2, { s: 0.8 });
          c.in("acc", j === 3, { s: 0.5 }, { e: "back.out(2)" });
        }
      },
      // Beat 4 · moments 10–11 · Adapted from benchmark 031 "Supply chain design animation"
      // https://www.behance.net/gallery/7392601/Supply-chain-design-animation — sites reveal on a planning grid and links calculate.
      {
        from: 10, to: 11,
        draw: () => {
          let s = rep(14, (i) => H("h" + i, hotel(18 + (i % 7) * 54, 34 + Math.floor(i / 7) * 62, 40, 40, C.navy2)));
          s += H("cnt", chip(110, 178, "14 properties", { sz: 14, bg: C.navy, st: C.navy, fg: C.white }) + chip(290, 178, "6 weeks", { sz: 14, bg: C.plum, st: C.plum, fg: C.white }));
          s += TK("n", 200, 236, "0", 34, C.orange, "middle", 'style="opacity:0"');
          s += H("nl", T(200, 262, "corporate arrivals", 14, C.orange));
          s += H("bd", R(20, 196, 360, 92, "rgba(255,255,255,.97)", 12, `stroke="${C.green}" stroke-width="2.4"`) + door(40, 212, 36, 60, C.navy, "#cfe0f0") + `<g class="a-walk">${guest(100, 266, 1.1)}</g>` + P("M120 242 H286", C.green, 3, 'class="a-flow"') + head(296, 242, 0, C.green) + door(320, 212, 36, 60, C.green) + chip(200, 222, "Lobby to released room", { sz: 13, bg: C.green, st: C.green, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          for (let i = 0; i < 14; i++) c.in("h" + i, j >= 0, { y: -30 }, { dl: 0.05 * i, e: "back.out(1.6)" });
          c.in("cnt", j >= 0, { y: 14 }, { dl: 0.6 });
          c.op("n", j === 0 ? 1 : 0); c.cnt("n", j >= 0 ? 310 : 0, { d: 1.4, dl: 0.4 }); c.in("nl", j === 0, {}, { dl: 0.6 });
          c.in("bd", j === 1, { y: 30 });
        }
      },
      // Beat 5 · moments 12–14 · Adapted from benchmark 039 "Bar Chart Race"
      // https://observablehq.com/@d3/bar-chart-race — keyframes advance and values animate to rank.
      {
        from: 12, to: 14,
        draw: () => {
          let s = H("big", watch(110, 140, 82, C.green));
          s += TK("m", 110, 156, "0", 40, C.green, "middle", 'style="opacity:0"');
          s += H("bl", T(110, 248, "mean minutes", 15, C.green));
          s += H("fm", R(214, 60, 176, 120, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + T(302, 96, "Total minutes", 14, C.navy) + P("M232 112 H372", C.navy, 2.4) + T(302, 138, "÷ 310 arrivals", 14, C.navy) + chip(302, 200, "Arithmetic average", { sz: 13, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("sp", rep(18, (i) => { const v = [30, 45, 52, 60, 66, 70, 74, 78, 82, 85, 90, 96, 104, 112, 125, 140, 160, 185][i]; return O(222 + i * 9.4, 260 - v * 0.9, 4.5, v > 120 ? C.orange : C.navy2); }) + P("M216 186 H392", C.green, 2.4, 'stroke-dasharray="5 4"') + T(388, 180, "82", 13, C.green, "", "end") + chip(304, 280, "Every guest differs", { sz: 13, st: C.orange, fg: C.orange }));
          return s;
        },
        render: (c, j) => {
          c.in("big", j >= 0, { s: 0.6 }); c.op("m", j >= 0 ? 1 : 0); c.cnt("m", j >= 0 ? 82 : 0, { dec: 1, d: 1.6 }); c.in("bl", j >= 0, {}, { dl: 0.6 });
          c.in("fm", j === 1, { x: 30 });
          c.in("sp", j === 2, { x: 30 });
        }
      },
      // Beat 6 · moments 15–17 · Adapted from benchmark 126 "Stacked-to-grouped bars"
      // https://observablehq.com/@d3/stacked-to-grouped-bars — bars reposition between layouts while preserving identity.
      {
        from: 15, to: 17,
        draw: () => {
          let s = P("M20 210 H380", C.slate, 2);
          s += H("b0", R(60, 210 - 12.4 * 2, 70, 12.4 * 2, C.navy, 4) + T(95, 200 - 12.4 * 2, "12.4", 16, C.navy) + T(95, 230, "System", 13, C.navy) + T(95, 246, "booking→key", 11, C.slate));
          s += H("b1", R(165, 210 - 46, 70, 46, C.orange, 4) + T(200, 156, "23", 16, C.orange) + T(200, 230, "One guest", 13, C.orange) + T(200, 246, "queue→desk", 11, C.slate));
          s += H("b2", R(270, 210 - 164, 70, 164, C.green, 4) + T(305, 38, "82.0", 16, C.green) + T(305, 230, "310 arrivals", 13, C.green) + T(305, 246, "lobby→room", 11, C.slate));
          s += H("pop", chip(200, 280, "Different boundary, different population", { sz: 12, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("mag", `<g class="a-bob">${lens(305, 120, 30, C.ink)}</g>`);
          return s;
        },
        render: (c, j) => {
          for (let i = 0; i < 3; i++) { c.op("b" + i, j >= 0 ? 1 : 0, { dl: 0.2 * i }); c.mv("b" + i, { sy: j >= 0 ? 1 : 0.02, pv: [0, 210] }, { d: 1.2, dl: 0.2 * i }); }
          c.in("pop", j >= 1, { y: 14 });
          c.in("mag", j === 2, { s: 0.4 });
          c.op("b0", j === 2 ? 0.35 : j >= 0 ? 1 : 0); c.op("b1", j === 2 ? 0.35 : j >= 0 ? 1 : 0);
        }
      },
      // Beat 7 · moments 18–22 · Adapted from benchmark 025 "Celonis Process Animation update"
      // https://community.celonis.com/product-updates/what-s-new-in-the-celonis-platform-5560 — cases play and aggregate as bubbles at a node.
      {
        from: 18, to: 22,
        draw: () => {
          let s = P("M20 120 H380", "#cfd9e4", 18) + node(14, 62, 84, 36, "Reception", { sz: 13, st: C.green }) + node(300, 62, 84, 36, "Room", { sz: 13 }) + node(196, 56, 92, 44, "Rate|approval", { sz: 12, st: C.orange, bg: C.peach }) + P("M56 98 V112 M342 98 V112 M242 100 V112", C.slate, 2) + R(232, 106, 20, 28, C.orange, 4);
          s += rep(14, (i) => `<g data-k="c${i}" style="opacity:0">${O(0, 0, 8, i < 9 ? C.orange : C.navy2)}</g>`);
          s += H("ck", watch(200, 196, 36, C.orange) + T(200, 204, "47", 22, C.orange) + T(200, 246, "minutes", 13, C.orange));
          s += H("pct", R(260, 172, 120, 60, C.white, 10, `stroke="${C.orange}" stroke-width="2"`) + T(320, 208, "61%", 26, C.orange) + T(320, 250, "of arrivals", 13, C.orange));
          s += H("pie", R(20, 166, 160, 26, C.green, 4) + R(20, 166, 92, 26, C.orange, 4) + T(66, 184, "47 approval", 12, C.white) + T(30, 214, "Largest single part", 13, C.orange, "", "start"));
          s += H("fd", chip(110, 30, "Faster reception", { sz: 14, st: C.green, fg: C.green }) + F("M176 30 l10 -8 v16 Z M190 30 l10 -8 v16 Z", C.green) + chip(300, 30, "Wait unchanged", { sz: 14, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("sh", shield(200, 200, 1.4, C.navy) + chip(200, 262, "Approval may protect contracts", { sz: 13, st: C.navy }));
          s += H("hd", R(20, 160, 360, 126, "rgba(255,255,255,.97)", 12, `stroke="${C.red}" stroke-width="2"`) + T(40, 196, "Baseline without wait", 14, C.slate, "", "start") + R(40, 206, 140, 18, C.slate, 4) + T(40, 250, "Guest experience", 14, C.orange, "", "start") + R(40, 260, 320, 18, C.orange, 4) + chip(290, 206, "Hides experience", { sz: 13, bg: C.red, st: C.red, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          for (let i = 0; i < 14; i++) {
            const stuck = i < 9 && j >= 0;
            const x = stuck ? 218 - (i % 9) * 15 : (i % 2 ? 40 + (i * 23) % 70 : 270 + (i * 29) % 100);
            const y = 120;
            c.op("c" + i, j >= 0 ? 1 : 0, { dl: 0.04 * i }); c.mv("c" + i, { x, y }, { d: 1.2, dl: 0.04 * i });
          }
          c.in("ck", j === 0, { s: 0.4 }, { dl: 0.6 }); c.in("pct", j === 0, { x: 30 }, { dl: 0.9 });
          c.in("pie", j === 1, { x: -30 });
          c.in("fd", j === 2, { y: -14 });
          c.in("sh", j === 3, { s: 0.4 }, { e: "back.out(2)" });
          c.in("hd", j === 4, { y: 30 });
        }
      },
      // Beat 8 · moments 23–26 · Adapted from benchmark 035 "Explainer Video Kit"
      // https://motionarray.com/after-effects-templates/explainer-video-18242/ — actor introduced, problem shown, switch to resolution.
      {
        from: 23, to: 26,
        draw: () => {
          let s = H("dir", person(80, 160, 2.2, C.plum) + chip(80, 220, "Director", { sz: 14, bg: C.plum, st: C.plum, fg: C.white }) + bubble(140, 40, 240, 64, "Not my department's delay", { sz: 15, st: C.plum, fg: C.plum, tx: 50 }));
          s += H("two", R(150, 120, 230, 60, C.white, 10, `stroke="${C.green}" stroke-width="2"`) + T(265, 146, "Front office:", 14, C.green) + T(265, 166, "how efficient?", 14, C.green) + R(150, 196, 230, 60, C.white, 10, `stroke="${C.orange}" stroke-width="2"`) + T(265, 222, "Programme:", 14, C.orange) + T(265, 242, "whole journey?", 14, C.orange));
          s += H("fair", scale(270, 160, 1.3, C.plum) + chip(270, 250, "Fair concern", { sz: 15, bg: C.plum, st: C.plum, fg: C.white }));
          s += H("bvb", R(150, 112, 110, 150, C.white, 10, `stroke="${C.navy}" stroke-width="2.4"`) + P("M160 140 V230 M250 140 V230", C.navy, 3) + T(205, 190, "Boundary", 15, C.navy) + R(270, 112, 110, 150, C.white, 10, `stroke="${C.plum}" stroke-width="2.4"`) + person(325, 196, 1.2, C.plum) + T(325, 248, "Accountability", 12, C.plum) + T(265, 190, "≠", 22, C.red));
          return s;
        },
        render: (c, j) => {
          c.in("dir", j >= 0, { x: -40 });
          c.in("two", j === 1, { x: 30 }); c.in("fair", j === 2, { s: 0.5 }); c.in("bvb", j === 3, { y: 30 });
        }
      },
      // Beat 9 · moments 27–31 · Adapted from benchmark 072 "Stripe Connect onboarding quickstart"
      // https://docs.stripe.com/connect/onboarding/quickstart — move through checks, then confirm the outcome.
      {
        from: 27, to: 31,
        draw: () => {
          const L = ["Define|boundary", "Validate|310 cases", "Explain|differences", "Agree|baseline", "Track|results"];
          let s = "";
          L.forEach((t, i) => { s += H("p" + i, node(4 + i * 79, 30, 74, 50, t, { sz: 12, st: i === 3 ? C.green : C.navy, bg: i === 3 ? C.mint : C.white })); if (i < 4) s += darrow("pa" + i, 78 + i * 79, 55, 83 + i * 79, 55, C.navy, 2.2); });
          s += H("cand", watch(200, 170, 56, C.green) + T(200, 180, "82.0", 26, C.green) + chip(200, 260, "Baseline candidate", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
          s += H("keep", watch(70, 170, 34, C.navy) + T(70, 177, "12.4", 15, C.navy) + chip(70, 226, "Diagnosis", { sz: 12, st: C.navy }) + watch(330, 170, 34, C.orange) + T(330, 177, "23", 16, C.orange) + chip(330, 226, "Insight", { sz: 12, st: C.orange, fg: C.orange }));
          s += H("loc", R(20, 110, 360, 176, "rgba(255,255,255,.97)", 12, `stroke="${C.red}" stroke-width="2"`) + T(40, 146, "Reception metric", 14, C.green, "", "start") + F("M200 132 l10 14 h-6 v14 h-8 v-14 h-6 Z", C.green) + T(40, 196, "Guest waiting", 14, C.orange, "", "start") + R(200, 182, 160, 18, C.orange, 4) + chip(200, 250, "Local success, guests wait", { sz: 14, bg: C.red, st: C.red, fg: C.white }));
          s += H("ans", R(110, 104, 180, 50, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + T(200, 134, "Programme question?", 14, C.navy) + arrow(200, 156, 200, 186, C.navy, 3));
          return s;
        },
        render: (c, j) => {
          c.seq("p", 5, j < 0 ? 0 : j === 0 ? 0 : j === 1 ? 5 : 5, { y: -14 });
          c.in("cand", j >= 0 && j !== 3, { s: 0.6 }); c.mv("cand", j === 4 ? { y: 40, s: 0.85 } : {});
          c.in("keep", j === 2, { s: 0.5 });
          c.in("loc", j === 3, { y: 30 });
          c.in("ans", j === 4, { y: -14 });
        }
      },
      // Beat 10 · moments 32–35 · Adapted from benchmark 002 "Interactive Computer Assembly Sequence"
      // https://codepen.io/karlhorning/pen/OJqNMVR — components reveal, translate into an assembly and settle.
      {
        from: 32, to: 32,
        draw: () => {
          let s = H("tri", watch(80, 120, 50, C.navy) + T(80, 128, "12.4", 18, C.navy) + chip(80, 196, "Department", { sz: 13 }) + watch(200, 120, 50, C.orange) + T(200, 128, "23", 20, C.orange) + chip(200, 196, "Individual", { sz: 13, st: C.orange, fg: C.orange }) + watch(320, 120, 50, C.green) + T(320, 128, "82.0", 18, C.green) + chip(320, 196, "End to end", { sz: 13, bg: C.green, st: C.green, fg: C.white }));
          s += H("def", chip(300, 262, "Defend the 82", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
          s += H("rs", chip(110, 262, "Fair accountability", { sz: 14, bg: C.plum, st: C.plum, fg: C.white }));
          s += H("one", R(30, 30, 340, 34, C.navy, 10) + T(200, 53, "One process", 17, C.white));
          return s;
        },
        render: (c, j) => {
          c.in("one", j >= 0, { y: -20 });
          c.in("tri", j >= 0, { y: 30 }, { dl: 0.3 });
          c.in("def", j >= 0, { x: 30 }, { dl: 1 }); c.in("rs", j >= 0, { x: -30 }, { dl: 1.4 });
        }
      }
    ];
    VL_SCENES[id] = makeScene({ id, N, labels, beats, back: () => backdrop("#f1f4ef", "#e2e9df"),
      desc: "Twenty-three minutes or eighty-two: three dials for the system's 12.4-minute booking-to-key window, one guest's 23 minutes, and the programme's 82.0-minute mean across 310 arrivals, explained by boundaries and populations, with the 47-minute approval wait in 61 percent of arrivals and the director's fair objection, leading to a validated end-to-end baseline." });
    SCENE_BG.push([id, "#f1f4ef"]);
  }

  addStyles(SCENE_BG);
})();

// OPER621 · Week 8 · The Understand Phase — animated teaching scenes (round 2, Claude)
// File: w08-claude-part3.js · Lesson 3 · Where the time disappears · Scenes: W8O1d, W8O1e, W8O2d
// Standalone part: defines its own engine and helpers, registers its scenes and appends its own
// rules (all scoped under .vls-w08-<secId>) into the single shared <style id="vl-sc-w08">.
// Parts may be loaded in any order or concatenated.
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }; i = narration moment index.
// Each section is a sequence of beats (a new visual every 3-4 narration lines); each beat names the
// benchmark template it adapts (number, title, URL). All drawing code is original.
(() => {
  "use strict";
  // ================= shared engine (self-contained copy for this part) =================
  window.VL_SCENES = window.VL_SCENES || {};
  const VL_SCENES = window.VL_SCENES;
  const PART = "p3";
  const C = {
    navy: "#1f4e79", navy2: "#2d6a9f", orange: "#c0502a", paper: "#fbf8f1", ink: "#1b2a3a",
    blue: "#dbe7f2", green: "#317c61", gold: "#e5b76c", amber: "#a8741a", plum: "#6b4e8a",
    red: "#b0362b", white: "#ffffff", slate: "#5d7389", muted: "#9fb3c4", mint: "#e1f0e8",
    peach: "#f8e3d8", lilac: "#ece6f3", sky: "#eaf2f8", sand: "#efe4cf", night: "#14263a", teal: "#2a7f86"
  };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const num = (v, f) => { const x = Number(v); return Number.isFinite(x) ? x : f; };
  const reduced = () => { try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (_) { return false; } };
  const hasG = () => !!(window.gsap && typeof window.gsap.to === "function" && typeof window.gsap.set === "function") && !reduced();
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");
  const inR = (k, a, b) => k >= a && k <= b;
  // ---- SVG string builders ----
  const R = (x, y, w, h, f, rx = 0, ex = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${ex}/>`;
  const O = (cx, cy, r, f, ex = "") => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${ex}/>`;
  const E = (cx, cy, rx, ry, f, ex = "") => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${ex}/>`;
  const P = (d, s, w = 2, ex = "") => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
  const F = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
  const D = (k, d, s, w = 3, ex = "") => `<path data-k="${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100" ${ex}/>`;
  const T = (x, y, s, sz = 14, f = C.ink, ex = "", a = "middle") => `<text x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
  const TK = (k, x, y, s, sz = 14, f = C.ink, a = "middle", ex = "") => `<text data-k="${k}" x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
  const K = (k, body, ex = "") => `<g data-k="${k}" ${ex}>${body}</g>`;
  const H = (k, body, ex = "") => `<g data-k="${k}" style="opacity:0" ${ex}>${body}</g>`;
  const tw = (s, sz) => Math.round(String(s).length * sz * 0.6 + sz * 1.3);
  const chip = (x, y, s, o = {}) => {
    const sz = o.sz || 14, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.85);
    return `<g class="w8c">` + R(x - w / 2, y - h / 2, w, h, o.bg || C.paper, o.rx == null ? h / 2 : o.rx,
      `stroke="${o.st || C.navy}" stroke-width="${o.sw || 1.8}"${o.dash ? ' stroke-dasharray="5 4"' : ""}`) +
      T(x, y + sz * 0.36, s, sz, o.fg || C.navy) + `</g>`;
  };
  // process box with 1-2 lines ("Line one|line two")
  const node = (x, y, w, h, s, o = {}) => {
    const sz = o.sz || 13, L = String(s).split("|"), lh = sz * 1.15, y0 = y + h / 2 - (L.length - 1) * lh / 2 + sz * 0.36;
    return `<g class="w8c">` + R(x, y, w, h, o.bg || C.white, o.rx == null ? 8 : o.rx, `stroke="${o.st || C.navy}" stroke-width="${o.sw || 2}"${o.dash ? ' stroke-dasharray="5 4"' : ""}`) +
      L.map((t, i) => T(x + w / 2, y0 + i * lh, t, sz, o.fg || C.ink)).join("") + `</g>`;
  };
  const head = (x, y, ang, col, s = 1) => { const a = ang * Math.PI / 180, c = Math.cos(a), si = Math.sin(a), p = (dx, dy) => `${(x + dx * c - dy * si).toFixed(1)} ${(y + dx * si + dy * c).toFixed(1)}`; return F(`M${p(2 * s, 0)} L${p(-8 * s, -5.5 * s)} L${p(-8 * s, 5.5 * s)} Z`, col); };
  const arrow = (x1, y1, x2, y2, col = C.slate, w = 2.4, ex = "") => P(`M${x1} ${y1} L${x2} ${y2}`, col, w, ex) + head(x2, y2, Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, col);
  const darrow = (k, x1, y1, x2, y2, col = C.slate, w = 2.6) => { const L = Math.hypot(x2 - x1, y2 - y1) || 1, ex = x2 - (x2 - x1) / L * 6, ey = y2 - (y2 - y1) / L * 6; return D(k, `M${x1} ${y1} L${ex.toFixed(1)} ${ey.toFixed(1)}`, col, w) + H(k + "g", head(x2, y2, Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, col)); };
  const dcurve = (k, d, x2, y2, ang, col = C.slate, w = 2.6) => D(k, d, col, w) + H(k + "g", head(x2, y2, ang, col));
  const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${x - 7 * s} ${y} l${5 * s} ${5 * s} l${10 * s} ${-11 * s}`, col, w);
  const cross = (x, y, s = 1, col = C.red, w = 3) => P(`M${x - 6 * s} ${y - 6 * s} l${12 * s} ${12 * s} M${x + 6 * s} ${y - 6 * s} l${-12 * s} ${12 * s}`, col, w);
  const badge = (x, y, r, col, ok = true) => O(x, y, r, col) + (ok ? tick(x, y, r / 13, C.white, Math.max(2, r / 5)) : cross(x, y, r / 14, C.white, Math.max(2, r / 5)));
  const person = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}</g>`;
  const guest = (x, y, s = 1, col = C.navy2, bag = C.orange) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -17, 8, col)}${F("M-12 14 Q-12 -6 0 -6 Q12 -6 12 14 Z", col)}${R(13, -2, 12, 16, bag, 3)}${P("M16 -2 v-4 h6 v4", bag, 1.6)}</g>`;
  const clock = (x, y, r, col = C.orange, bg = C.paper) => O(x, y, r, bg, `stroke="${col}" stroke-width="${Math.max(2, r / 6)}"`) + P(`M${x} ${y - r * 0.62} V${y} L${x + r * 0.45} ${y + r * 0.3}`, col, Math.max(2, r / 7));
  const hand = (x, y, len, col, dur = 4, w = 3) => `<path class="a-hand" style="transform-origin:${x}px ${y}px;animation-duration:${dur}s" d="M${x} ${y} V${y - len}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
  const watch = (x, y, r, col = C.navy, bg = C.white) => R(x - r * 0.22, y - r - 9, r * 0.44, 7, col, 2) + O(x, y, r, bg, `stroke="${col}" stroke-width="${Math.max(3, r / 7)}"`) + rep(12, (i) => { const a = i * Math.PI / 6; return P(`M${(x + r * 0.78 * Math.sin(a)).toFixed(1)} ${(y - r * 0.78 * Math.cos(a)).toFixed(1)} L${(x + r * 0.9 * Math.sin(a)).toFixed(1)} ${(y - r * 0.9 * Math.cos(a)).toFixed(1)}`, col, i % 3 ? 1.2 : 2.4); });
  const phone = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M-12 -6 Q-12 -12 -6 -12 L-2 -12 L0 -5 L-4 -2 Q-2 4 4 8 L7 4 L13 6 L13 10 Q13 15 7 15 Q-12 13 -12 -6 Z", col)}</g>`;
  const doc = (x, y, w, h, col = C.navy, bg = C.white, lines = 3) => R(x, y, w, h, bg, 4, `stroke="${col}" stroke-width="2"`) + (lines === 0 ? R(x, y, w, 7, col, 3) : "") + rep(lines, (i) => P(`M${x + 7} ${y + 11 + i * ((h - 16) / Math.max(1, lines))} H${x + w - 7 - (i === lines - 1 ? w * 0.25 : 0)}`, col, 2, 'opacity=".55"'));
  const desk = (x, y, w, col = C.navy) => R(x, y, w, 10, C.orange, 3) + R(x + 6, y + 10, w - 12, 26, col, 3);
  const monitor = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-18, -14, 36, 24, col, 3)}${R(-15, -11, 30, 18, "#cfe0f0", 2)}${R(-3, 10, 6, 6, col)}${R(-10, 15, 20, 3, col, 1)}</g>`;
  const lens = (x, y, r, col = C.ink) => O(x, y, r, "rgba(255,255,255,.22)", `stroke="${col}" stroke-width="${Math.max(3, r / 9)}"`) + P(`M${x + r * 0.72} ${y + r * 0.72} L${x + r * 1.25} ${y + r * 1.25}`, col, Math.max(5, r / 4.5));
  const gear = (x, y, r, col, hole = C.paper) => { let d = ""; const n = 8; for (let i = 0; i < n; i++) { const a0 = (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n * 0.55, a2 = a0 + Math.PI / n, a3 = a2 + Math.PI / n * 0.45, p = (a, rr) => `${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`; d += (i ? "L" : "M") + p(a0, r) + "L" + p(a1, r) + "L" + p(a2, r * 0.78) + "L" + p(a3, r * 0.78); } return F(d + "Z", col) + O(x, y, r * 0.34, hole); };
  const star = (x, y, r, col = C.gold, st = C.amber) => { let d = ""; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; d += (i ? "L" : "M") + (x + rr * Math.cos(a)).toFixed(1) + " " + (y + rr * Math.sin(a)).toFixed(1); } return F(d + "Z", col, `stroke="${st}" stroke-width="1"`); };
  const hotel = (x, y, w, h, col = C.navy, win = "#cfe0f0") => R(x, y, w, h, col, 6) + F(`M${x - 8} ${y + 2} L${x + w / 2} ${y - 22} L${x + w + 8} ${y + 2} Z`, C.navy2) + rep(Math.floor((h - 34) / 22) * 4, (i) => R(x + 10 + (i % 4) * ((w - 20) / 4), y + 12 + Math.floor(i / 4) * 22, (w - 20) / 4 - 8, 13, win, 2)) + R(x + w / 2 - 13, y + h - 30, 26, 30, C.gold, 3);
  const door = (x, y, w, h, col = C.green, bg = "#d7ebdf") => R(x, y, w, h, col, 4) + R(x + 5, y + 5, w - 10, h - 5, bg, 2) + O(x + w - 11, y + h / 2 + 4, 2.6, col);
  const key = (x, y, s = 1, col = C.gold) => `<g transform="translate(${x} ${y}) scale(${s})">${O(-9, 0, 7, "none", `stroke="${col}" stroke-width="3.4"`)}${P("M-2 0 H14 M10 0 V5 M14 0 V6", col, 3.4)}</g>`;
  const bubble = (x, y, w, h, s, o = {}) => `<g class="w8c">` + R(x, y, w, h, o.bg || C.white, 10, `stroke="${o.st || C.navy}" stroke-width="1.8"`) + F(`M${x + (o.tx || 16)} ${y + h - 1} L${x + (o.tx || 16) - 4} ${y + h + 10} L${x + (o.tx || 16) + 10} ${y + h - 1} Z`, o.bg || C.white, `stroke="${o.st || C.navy}" stroke-width="1.8" stroke-linejoin="round"`) + R(x + (o.tx || 16) - 3, y + h - 3, 14, 4, o.bg || C.white) + T(x + w / 2, y + h / 2 + (o.sz || 13) * 0.36, s, o.sz || 13, o.fg || C.navy) + `</g>`;
  const coin = (x, y, r = 8) => O(x, y, r, C.gold, `stroke="${C.amber}" stroke-width="2"`) + T(x, y + r * 0.42, "$", r * 1.2, C.amber);
  const shield = (x, y, s = 1, col = C.green) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M0 -18 L15 -12 V0 Q15 13 0 20 Q-15 13 -15 0 V-12 Z", col)}${tick(0, 0, 0.8, C.white, 3)}</g>`;
  const lock = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-11, -3, 22, 17, col, 3)}${P("M-7 -3 v-6 a7 7 0 0 1 14 0 v6", col, 3)}${O(0, 5, 2.6, C.white)}</g>`;
  const cal = (x, y, w, h, col = C.red) => R(x, y, w, h, C.white, 5, `stroke="${col}" stroke-width="2"`) + R(x, y, w, h * 0.28, col, 5) + R(x, y + h * 0.18, w, h * 0.1, col);
  const moon = (x, y, r, col = C.gold) => F(`M${x} ${y - r} A${r} ${r} 0 1 0 ${x} ${y + r} A${r * 1.3} ${r * 1.3} 0 0 1 ${x} ${y - r} Z`, col);
  const scale = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${P("M0 -26 V22 M-16 22 H16 M-30 -18 H30", col, 3)}${P("M-30 -18 L-40 2 M-30 -18 L-20 2 M30 -18 L20 2 M30 -18 L40 2", col, 1.6)}${F("M-42 2 Q-30 14 -18 2 Z", col)}${F("M18 2 Q30 14 42 2 Z", col)}</g>`;
  // ---- per-scene stylesheet (all rules scoped under .vls-w08-<secId>) ----
  function sceneCSS(id, bg) {
    const s = ".vls-w08-" + id;
    return `
${s}{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:220px;overflow:hidden!important;box-sizing:border-box;border-radius:14px;background:${bg};color:${C.ink};font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w08-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w08-fig>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}
${s} svg text{font-family:inherit;font-weight:700;letter-spacing:.1px}
${s} [data-k],${s} [data-beat]{transform-box:fill-box;transform-origin:50% 50%}
${s}.w08-css [data-k],${s}.w08-css [data-beat]{transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.8s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}
${s}.w08-snap [data-k],${s}.w08-snap [data-beat],${s}.w08-rm [data-k],${s}.w08-rm [data-beat]{transition:none!important}
${s}.w08-rm *{animation:none!important}
${s} .w08-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:36px;padding:6px 12px 8px;font-size:14px;font-weight:700;line-height:1.25;color:${C.navy};background:rgba(255,255,255,.6);border-top:1px solid rgba(31,78,121,.12)}
${s} .w08-num{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w08-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.2px}
${s} .w08-lab.w08-in{animation:vlsw08CapIn .5s cubic-bezier(.22,.8,.24,1)}
${s} .w08-bar{flex:0 0 54px;height:4px;border-radius:4px;background:rgba(31,78,121,.15);overflow:hidden}
${s} .w08-bar i{display:block;height:100%;width:0;background:${C.orange};transition:width .6s ease}
${s} .a-flow{stroke-dasharray:6 7;animation:vlsw08Flow 1.1s linear infinite}
${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw08Spin 7s linear infinite}
${s} .a-hand{transform-box:view-box;animation-name:vlsw08Spin;animation-timing-function:linear;animation-iteration-count:infinite}
${s} .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw08Bob 2.6s ease-in-out infinite}
${s} .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw08Pulse 2s ease-in-out infinite}
${s} .a-blink{animation:vlsw08Blink 1.4s ease-in-out infinite}
${s} .a-ring{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw08Ring .9s ease-in-out infinite}
${s} .a-walk{animation:vlsw08Walk 2.4s ease-in-out infinite}
@media (max-width:420px){${s} .w08-cap{font-size:13px;min-height:32px;padding:5px 10px 7px}${s} .w08-bar{flex-basis:40px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
  }
  const KEYFRAMES = `
@keyframes vlsw08CapIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes vlsw08Flow{to{stroke-dashoffset:-26}}
@keyframes vlsw08Spin{to{transform:rotate(360deg)}}
@keyframes vlsw08Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes vlsw08Pulse{0%,100%{opacity:.35;transform:scale(.94)}50%{opacity:.95;transform:scale(1.06)}}
@keyframes vlsw08Blink{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes vlsw08Ring{0%,100%{transform:rotate(0)}25%{transform:rotate(-12deg)}75%{transform:rotate(12deg)}}
@keyframes vlsw08Walk{0%,100%{transform:translateX(0)}50%{transform:translateX(6px)}}
`;
  function addStyles(list) {
    if (typeof document === "undefined") return;
    let st = document.getElementById("vl-sc-w08");
    if (!st) { st = document.createElement("style"); st.id = "vl-sc-w08"; (document.head || document.documentElement).appendChild(st); }
    const flag = "data-w08claude" + PART;
    if (st.getAttribute(flag)) return;
    st.setAttribute(flag, "1");
    const kf = st.getAttribute("data-w08kf") ? "" : KEYFRAMES;
    st.setAttribute("data-w08kf", "1");
    st.appendChild(document.createTextNode(kf + list.map((p) => sceneCSS(p[0], p[1])).join("\n")));
  }
  // ---- scene factory: beats (a new visual every 3-4 moments) + per-moment builds ----
  function makeScene(cfg) {
    const { id, N, labels, beats } = cfg;
    let root = null, useG = false, beatNow = -1;
    const mapK = (i, n) => {
      const nn = Math.max(1, Math.floor(num(n, N)));
      const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
      return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
    };
    const beatOf = (k) => { for (let b = 0; b < beats.length; b++) if (k >= beats[b].from && k <= beats[b].to) return b; return beats.length - 1; };
    const dur = (t, d) => (t.d == null ? d : t.d);
    function timing(el, t, d) { el.style.transitionDuration = dur(t, d) + "s"; el.style.transitionDelay = (t.dl || 0) + "s"; }
    function tf(el, st, t, snap) {
      const x = st.x || 0, y = st.y || 0, r = st.r || 0;
      const sx = st.sx != null ? st.sx : (st.s != null ? st.s : 1), sy = st.sy != null ? st.sy : (st.s != null ? st.s : 1);
      if (useG) {
        const v = { x, y, rotation: r, scaleX: sx, scaleY: sy };
        if (st.pv) v.svgOrigin = st.pv[0] + " " + st.pv[1]; else v.transformOrigin = "50% 50%";
        if (snap) window.gsap.set(el, v);
        else window.gsap.to(el, Object.assign(v, { duration: dur(t, 0.85), delay: t.dl || 0, ease: t.e || "power3.out", overwrite: "auto" }));
      } else {
        if (st.pv) { el.style.transformBox = "view-box"; el.style.transformOrigin = st.pv[0] + "px " + st.pv[1] + "px"; }
        timing(el, t, 0.85);
        el.style.transform = "translate(" + x + "px," + y + "px) rotate(" + r + "deg) scale(" + sx + "," + sy + ")";
      }
    }
    function op(el, o, t, snap) {
      if (useG) { if (snap) window.gsap.set(el, { opacity: o }); else window.gsap.to(el, { opacity: o, duration: dur(t, 0.6), delay: t.dl || 0, ease: "power1.out", overwrite: false }); }
      else { timing(el, t, 0.6); el.style.opacity = String(o); }
    }
    function dash(el, f, t, snap) {
      const v = 100 * (1 - clamp(f, 0, 1));
      if (useG) { if (snap) window.gsap.set(el, { strokeDashoffset: v }); else window.gsap.to(el, { strokeDashoffset: v, duration: dur(t, 1.1), delay: t.dl || 0, ease: "power2.inOut" }); }
      else { timing(el, t, 1.1); el.style.strokeDashoffset = String(v); }
    }
    function fill(el, col, t, snap) {
      if (useG) { if (snap) window.gsap.set(el, { fill: col }); else window.gsap.to(el, { fill: col, duration: dur(t, 0.6), delay: t.dl || 0 }); }
      else { timing(el, t, 0.6); el.style.fill = col; }
    }
    function count(el, to, o, snap) {
      const fmt = (v) => (o.pre || "") + (o.dec ? v.toFixed(o.dec) : Math.round(v).toLocaleString("en-US")) + (o.suf || "");
      if (el._raf) cancelAnimationFrame(el._raf);
      const from = el._v != null ? el._v : (o.from || 0);
      el._v = to;
      if (snap || reduced() || typeof requestAnimationFrame !== "function") { el.textContent = fmt(to); return; }
      const t0 = performance.now(), d = (o.d || 1.1) * 1000, dl = (o.dl || 0) * 1000;
      const stepF = (now) => { const p = clamp((now - t0 - dl) / d, 0, 1), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(from + (to - from) * e); if (p < 1) el._raf = requestAnimationFrame(stepF); };
      el._raf = requestAnimationFrame(stepF);
    }
    function ctx(scope, snap) {
      const q = (k) => (scope ? Array.prototype.slice.call(scope.querySelectorAll('[data-k="' + k + '"]')) : []);
      const c = {
        snap,
        op: (k, o, t = {}) => q(k).forEach((el) => op(el, o, t, snap)),
        mv: (k, st, t = {}) => q(k).forEach((el) => tf(el, st, t, snap)),
        dr: (k, f, t = {}) => { q(k).forEach((el) => dash(el, f, t, snap)); q(k + "g").forEach((el) => op(el, f >= 1 ? 1 : 0, { dl: f >= 1 ? (t.dl || 0) + dur(t, 1.1) * 0.8 : 0, d: 0.3 }, snap)); },
        fl: (k, col, t = {}) => q(k).forEach((el) => fill(el, col, t, snap)),
        tx: (k, s) => q(k).forEach((el) => { if (el.textContent !== String(s)) el.textContent = String(s); }),
        cnt: (k, to, o = {}) => q(k).forEach((el) => count(el, to, o, snap)),
        // show/hide with an entrance offset (default: rise 12)
        in: (k, on, from, t = {}) => q(k).forEach((el) => { op(el, on ? 1 : 0, t, snap); tf(el, on ? {} : (from || { y: 12 }), t, snap); }),
        vis: (map, t = {}) => Object.keys(map).forEach((k) => q(k).forEach((el) => op(el, map[k] === true ? 1 : map[k] === false ? 0 : map[k], t, snap))),
        // reveal a numbered sequence p0..p(n-1) with connectors pa0..; upto = how many are visible
        seq: (p, n, upto, from) => { for (let i = 0; i < n; i++) { q(p + i).forEach((el) => { op(el, i < upto ? 1 : 0, { dl: i < upto ? 0.08 * i : 0 }, snap); tf(el, i < upto ? {} : (from || { y: 14 }), { dl: i < upto ? 0.08 * i : 0 }, snap); }); c.dr(p + "a" + i, i < upto - 1 ? 1 : 0, { dl: 0.1 * i }); } },
        all: (sel) => (scope ? Array.prototype.slice.call(scope.querySelectorAll(sel)) : []),
        opEl: (el, o, t = {}) => op(el, o, t, snap),
        mvEl: (el, st, t = {}) => tf(el, st, t, snap),
        flEl: (el, col, t = {}) => fill(el, col, t, snap)
      };
      return c;
    }
    function caption(k, snap) {
      const lab = root.querySelector(".w08-lab"), nn = root.querySelector(".w08-num"), bar = root.querySelector(".w08-bar i");
      const txt = labels[k] || "";
      if (lab && lab.textContent !== txt) { lab.textContent = txt; if (!snap && !reduced()) { lab.classList.remove("w08-in"); void lab.offsetWidth; lab.classList.add("w08-in"); } }
      if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
      if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
    }
    function render(k, snap) {
      if (!root) return;
      const b = beatOf(k), entering = b !== beatNow;
      const groups = Array.prototype.slice.call(root.querySelectorAll("[data-beat]"));
      if (snap) root.classList.add("w08-snap");
      groups.forEach((g, gi) => {
        const on = gi === b;
        op(g, on ? 1 : 0, { d: on ? 0.7 : 0.4, dl: on && entering && !snap ? 0.12 : 0 }, snap);
        tf(g, on ? {} : { x: gi < b ? -28 : 28, s: 0.97 }, { d: 0.8 }, snap);
        g.setAttribute("aria-hidden", on ? "false" : "true");
      });
      const B = beats[b], scope = groups[b];
      try {
        if (entering && !snap) {
          root.classList.add("w08-snap");
          B.render(ctx(scope, true), -1, k);
          void root.getBoundingClientRect();
          root.classList.remove("w08-snap");
        }
        B.render(ctx(scope, snap), k - B.from, k);
        if (cfg.always) cfg.always(ctx(root, snap), k, b);
      } catch (e) { if (window.console) console.warn("[VL W08 " + id + "]", e); }
      caption(k, snap);
      if (snap) { void root.getBoundingClientRect(); root.classList.remove("w08-snap"); }
      beatNow = b;
      root.setAttribute("data-moment", String(k));
    }
    function kill() { if (root && useG) { try { window.gsap.killTweensOf(root.querySelectorAll("[data-k],[data-beat]")); } catch (_) {} } }
    function mount(el) {
      const r = document.createElement("div");
      const rm = reduced();
      r.className = "vls-w08-" + id + " w08-root" + (useG ? " w08-gsap" : " w08-css") + (rm ? " w08-rm" : "");
      r.setAttribute("data-scene", id);
      const body = (cfg.back ? cfg.back() : "") + beats.map((B, b) => `<g data-beat="${b}" style="opacity:0">${B.draw()}</g>`).join("") + (cfg.front ? cfg.front() : "");
      r.innerHTML = '<div class="w08-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' + esc(cfg.desc) + '">' + body +
        '</svg></div><div class="w08-cap" aria-hidden="true"><span class="w08-num"></span><span class="w08-lab"></span><span class="w08-bar"><i></i></span></div>';
      if (typeof el.replaceChildren === "function") el.replaceChildren(r); else { el.innerHTML = ""; el.appendChild(r); }
      return r;
    }
    return {
      build(el) {
        if (!el || el.nodeType !== 1) return;
        kill(); useG = hasG(); beatNow = -1;
        root = mount(el);
        render(0, true);
      },
      step(i, n) { if (!root) return; render(mapK(i, n), false); },
      reset() { if (!root) return; kill(); beatNow = -1; render(0, true); }
    };
  }
  const SCENE_BG = [];
  // backdrop builder: bleed colour + soft pattern (keeps the figure full-bleed on any aspect ratio)
  const backdrop = (bg, line, kind = "grid") => R(-400, -300, 1200, 900, bg) + (kind === "grid"
    ? rep(30, (i) => P(`M${-400 + i * 40} -300 V700`, line, 1)) + rep(24, (i) => P(`M-400 ${-300 + i * 40} H800`, line, 1))
    : kind === "dots" ? rep(60, (i) => O(-380 + (i % 12) * 100, -270 + Math.floor(i / 12) * 180 + (i % 2) * 40, 2.4, line))
    : rep(34, (i) => P(`M${-400 + i * 40} -300 L${-160 + i * 40} 700`, line, 1)));

  // ============================================================
  // W8O1d · "WAITING IS NOT WORKING"  ·  33 moments · 10 beats
  // Story: a guest sits still while the clock runs; elapsed time is
  // poured into four labelled jars (work, waiting, rework, checking);
  // the 47-minute approval in 61% of arrivals; a finished desk task that
  // still waits; cases piling up at a handoff; don't assume staffing;
  // the illustrative 82 → 22 decomposition (never an achieved result);
  // Qasr's separate 8.1 observed minutes kept apart; necessary checks;
  // and the bridge to "why do these activities exist?".
  // ============================================================
  {
    const id = "W8O1d", N = 33;
    const labels = [
      "Waiting is not working", "Long isn't busy", "Nobody is processing", "The clock keeps running",
      "Four kinds of time", "Different explanations", "Value-adding work", "Waiting for something",
      "Rework: doing again", "Checking protects", "Not every minute equal", "Back to the approval",
      "47 minutes, 61%", "A dependency, not slowness", "Done, yet waiting", "Work piles at handoffs",
      "What a queue is", "Longer queue, longer journey", "More staff won't fix", "Decompose the time",
      "14 work, 47 waiting", "12 rework, 9 checking", "Illustrative 22, not achieved", "Waiting and rework shrink",
      "Flow beats speed", "Don't mix exhibits", "Qasr observed 8.1", "Separate presentations",
      "Understand where time goes", "Keep necessary checks", "Purpose versus delay", "Effort versus experience",
      "Why do they exist?"
    ];
    const JAR = (x, col, lab, k) => R(x - 34, 120, 68, 120, "rgba(255,255,255,.7)", 10, `stroke="${col}" stroke-width="3"`) + T(x, 266, lab, 13, col);
    const beats = [
      // Beat 1 · moments 0–3 · Adapted from benchmark 096 "Process in cub"
      // https://lottiefiles.com/free-animation/process-in-cub-9iNG7QP0qC — a cube cycles states while the loader keeps turning.
      {
        from: 0, to: 3,
        draw: () => {
          let s = H("ttl", T(260, 70, "Waiting", 24, C.orange) + T(260, 102, "is not", 20, C.navy) + T(260, 134, "working", 24, C.green));
          s += K("chair", R(60, 190, 80, 12, C.slate, 4) + R(66, 202, 8, 40, C.slate) + R(126, 202, 8, 40, C.slate) + R(60, 150, 10, 46, C.slate, 3));
          s += K("g", guest(100, 186, 1.6));
          s += H("zz", T(140, 120, "z", 18, C.muted) + T(154, 104, "z", 14, C.muted));
          s += H("w", watch(300, 190, 54, C.orange) + hand(300, 190, 40, C.orange, 3, 4));
          s += H("st", rep(3, (i) => person(220 + i * 60, 250, 1, C.slate)) + chip(280, 286, "Busy elsewhere", { sz: 13, st: C.slate, fg: C.slate }));
          s += H("bd", R(30, 40, 340, 220, "none", 14, `stroke="${C.navy}" stroke-width="2.4" stroke-dasharray="8 6"`) + chip(200, 40, "Inside the boundary", { sz: 14, bg: C.navy, st: C.navy, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.in("ttl", j === 0, { x: 30 });
          c.in("w", j >= 1, { s: 0.5 }); c.in("zz", j >= 1, { y: 10 }, { dl: 0.4 });
          c.in("st", j === 2, { y: 20 });
          c.in("bd", j === 3, { s: 1.1 });
        }
      },
      // Beat 2 · moments 4–5 · Adapted from benchmark 099 "Bottling factory"
      // https://lottiefiles.com/free-animation/bottling-factory-53Q3SoGu0x — bottles advance to a filling station and fill.
      {
        from: 4, to: 5,
        draw: () => {
          const J = [[62, C.green, "Work"], [154, C.orange, "Waiting"], [246, C.plum, "Rework"], [338, C.navy, "Checking"]];
          let s = H("pipe", R(20, 50, 360, 22, C.slate, 8) + T(200, 66, "Elapsed time", 14, C.white) + J.map(([x]) => R(x - 6, 72, 12, 40, C.slate, 3)).join(""));
          J.forEach(([x, col, lab], i) => { s += H("j" + i, JAR(x, col, lab)); s += H("f" + i, R(x - 30, 124, 60, 112, col, 7, 'opacity=".85"')); });
          s += H("q", chip(200, 290, "Different causes", { sz: 14, bg: C.navy, st: C.navy, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          const FILL = [0.2, 0.62, 0.18, 0.14];
          c.in("pipe", j >= 0, { y: -20 });
          for (let i = 0; i < 4; i++) { c.in("j" + i, j >= 0, { y: 30 }, { dl: 0.12 * i }); c.op("f" + i, j >= 0 ? 1 : 0); c.mv("f" + i, { sy: j >= 0 ? FILL[i] : 0.01, pv: [0, 236] }, { d: 1.4, dl: 0.4 + 0.15 * i }); }
          c.in("q", j === 1, { y: 14 });
        }
      },
      // Beat 3 · moments 6–10 · Adapted from benchmark 061 "SVGator icon templates"
      // https://www.svgator.com/animation-templates/icons — an icon animates from idle to action to completion.
      {
        from: 6, to: 10,
        draw: () => {
          const CARD = (k, x, y, col, title, icon) => H(k, R(x, y, 170, 112, C.white, 12, `stroke="${col}" stroke-width="2.6"`) + R(x, y, 170, 30, col, 12) + R(x, y + 16, 170, 14, col) + T(x + 85, y + 21, title, 15, C.white) + icon);
          let s = CARD("c0", 18, 22, C.green, "Value-adding", key(80, 90, 1.8, C.gold) + door(118, 56, 34, 62, C.green));
          s += CARD("c1", 212, 22, C.orange, "Waiting", clock(260, 86, 20) + doc(300, 66, 28, 36, C.orange) + O(314, 66, 7, C.orange) + T(314, 71, "?", 12, C.white));
          s += CARD("c2", 18, 150, C.plum, "Rework", doc(54, 190, 34, 44, C.plum) + P("M110 196 a20 20 0 1 1 -2 30", C.plum, 3.4) + head(106, 228, 160, C.plum) + cross(70, 212, 0.8, C.red));
          s += CARD("c3", 212, 150, C.navy, "Checking", lens(268, 206, 20, C.navy) + shield(330, 210, 1.1, C.navy));
          s += H("eq", R(40, 120, 320, 64, "rgba(255,255,255,.97)", 12, `stroke="${C.red}" stroke-width="2.4"`) + T(200, 150, "Minute = minute?", 18, C.red) + T(200, 172, "Wrong decisions follow", 13, C.red));
          return s;
        },
        render: (c, j) => {
          for (let i = 0; i < 4; i++) { c.in("c" + i, j >= i, { s: 0.6 }, { e: "back.out(1.6)" }); c.op("c" + i, j >= i ? (j === 4 ? 0.2 : j === i ? 1 : 0.55) : 0); }
          c.in("eq", j === 4, { s: 0.7 });
        }
      },
      // Beat 4 · moments 11–14 · Adapted from benchmark 088 "Automated Workflows"
      // https://lottiefiles.com/free-animation/automated-workflows-XR2hxXOdEK — an action triggers, repeats, then completes.
      {
        from: 11, to: 14,
        draw: () => {
          let s = H("rate", node(140, 30, 120, 50, "Corporate rate|approval", { sz: 13, st: C.orange, bg: C.peach }));
          s += H("ctx", hotel(40, 150, 90, 110, C.navy) + rep(5, (i) => guest(170 + i * 42, 236, 1.1)) + chip(260, 140, "310 corporate arrivals", { sz: 14, st: C.navy }) + P("M200 90 V118", C.orange, 3, 'stroke-dasharray="4 4"'));
          s += H("st", watch(90, 170, 46, C.orange) + T(90, 180, "47", 26, C.orange) + T(90, 240, "minutes", 13, C.orange));
          s += H("pct", rep(10, (i) => O(200 + (i % 5) * 36, 150 + Math.floor(i / 5) * 40, 13, i < 6 ? C.orange : "#d5dce3")) + T(272, 250, "≈ 61% of 310", 14, C.orange));
          s += H("dep", node(30, 110, 110, 48, "Reception|done", { sz: 13, st: C.green }) + badge(130, 112, 11, C.green) + P("M140 134 H250", C.slate, 3, 'stroke-dasharray="6 6"') + node(250, 110, 120, 48, "Authorised|decision", { sz: 13, st: C.orange }) + chip(200, 196, "Dependency, not slowness", { sz: 14, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("rd", desk(30, 210, 140) + person(100, 202, 1.5, C.green) + badge(150, 168, 13, C.green) + `<g class="a-bob">${guest(260, 250, 1.4)}</g>` + clock(306, 196, 15) + chip(300, 160, "Still waiting", { sz: 14, st: C.orange, fg: C.orange }));
          return s;
        },
        render: (c, j) => {
          c.in("rate", j >= 0, { y: -20 }); c.in("ctx", j === 0, { y: 30 });
          c.in("st", j === 1, { s: 0.4 }); c.in("pct", j === 1, { x: 30 }, { dl: 0.3 });
          c.in("dep", j === 2, { y: 20 });
          c.in("rd", j === 3, { y: 20 });
        }
      },
      // Beat 5 · moments 15–18 · Adapted from benchmark 028 "Factory Manufacturing Animation Pack"
      // https://lottiefiles.com/marketplace/factory-manufacturing — boxes feed in, pause at an inspection gate, release to packing.
      {
        from: 15, to: 18,
        draw: () => {
          let s = R(-400, 150, 1200, 20, "#cfd9e4") + node(14, 92, 92, 44, "Reception", { sz: 13, st: C.green }) + node(294, 92, 92, 44, "Revenue", { sz: 13, st: C.orange });
          s += R(250, 140, 10, 40, C.orange, 3);
          s += rep(10, (i) => `<g data-k="b${i}" style="opacity:0">${R(-12, -10, 24, 20, C.white, 3, `stroke="${C.navy}" stroke-width="2"`)}${P("M-6 -2 H6 M-6 4 H4", C.muted, 2)}</g>`);
          s += H("qb", P("M110 190 V200 H246 V190", C.orange, 3) + chip(178, 222, "Queue", { sz: 16, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("nb", chip(200, 40, "Nobody working on them", { sz: 13, st: C.slate, fg: C.slate }));
          s += H("gr", R(30, 240, 340, 22, "#e3e9ef", 6) + R(30, 240, 340, 22, C.orange, 6, 'data-k="grw"'));
          s += H("ns", person(80, 280, 1, C.green) + person(110, 280, 1, C.green) + T(150, 286, "+ staff?", 14, C.green, "", "start") + O(290, 270, 16, C.orange) + T(290, 276, "?", 18, C.white) + chip(340, 236, "Find the cause", { sz: 12, bg: C.navy, st: C.navy, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          for (let i = 0; i < 10; i++) {
            const n = j < 0 ? 0 : j === 0 ? 4 : j === 1 ? 6 : 10;
            const on = i < n;
            c.op("b" + i, on ? 1 : 0, { dl: 0.06 * i }); c.mv("b" + i, on ? { x: 234 - (i % 5) * 26, y: 160 - Math.floor(i / 5) * 22 } : { x: -20, y: 160 }, { d: 1.1, dl: 0.06 * i });
          }
          c.in("nb", j >= 0 && j < 2, { y: -14 }, { dl: 0.6 });
          c.in("qb", j >= 1, { y: 14 });
          c.in("gr", j === 2, { y: 14 });
          c.in("ns", j === 3, { y: 20 });
        }
      },
      // Beat 6 · moments 19–21 · Adapted from benchmark 127 "Streamgraph transitions"
      // https://observablehq.com/@d3/streamgraph-transitions — stacked layers morph as their values change.
      {
        from: 19, to: 21,
        draw: () => {
          let s = H("ttl", chip(200, 32, "Illustrative example", { sz: 14, st: C.plum, fg: C.plum, dash: true }));
          const SEG = [[14, C.green, "Work 14"], [47, C.orange, "Waiting 47"], [12, C.plum, "Rework 12"], [9, C.navy, "Check 9"]];
          let x = 20;
          SEG.forEach(([v, col, lab], i) => { const w = v / 82 * 360; s += H("s" + i, R(x, 90, w, 70, col, 3) + (w > 60 ? T(x + w / 2, 132, lab, 14, C.white) : "")); x += w; });
          s += H("small", T(20 + (73 / 82) * 360 + (9 / 82) * 180, 186, "Check 9", 12, C.navy) + T(20 + (61 / 82) * 360 + (12 / 82) * 180, 76, "Rework 12", 12, C.plum));
          s += H("tot", P("M20 200 V210 H380 V200", C.ink, 3) + T(200, 236, "82 minutes", 20, C.ink));
          s += H("whole", R(20, 90, 360, 70, C.slate, 4) + T(200, 132, "82 minutes", 18, C.white) + rep(3, (i) => P(`M${100 + i * 90} 80 V170`, C.white, 2.4, 'stroke-dasharray="5 5"')) + chip(200, 210, "Split into parts", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.in("ttl", j >= 0, { y: -14 }); c.in("whole", j === 0, { s: 0.8 });
          c.in("s0", j >= 1, { sx: 0.05 }); c.in("s1", j >= 1, { sx: 0.05 }, { dl: 0.3 });
          c.in("s2", j >= 2, { sx: 0.05 }); c.in("s3", j >= 2, { sx: 0.05 }, { dl: 0.3 }); c.in("small", j >= 2, {}, { dl: 0.6 });
          c.in("tot", j >= 2, { y: 14 }, { dl: 0.8 });
          if (j === 0) c.in("s0", false, { sx: 0.05 });
        }
      },
      // Beat 7 · moments 22–24 · Adapted from benchmark 133 "Path tween"
      // https://observablehq.com/@d3/path-tween — one shape interpolates smoothly into another.
      {
        from: 22, to: 24,
        draw: () => {
          let s = T(20, 52, "Before", 14, C.ink, "", "start") + R(20, 60, 360, 40, "#e3e9ef", 4);
          s += R(20, 60, 61, 40, C.green, 3) + R(81, 60, 206, 40, C.orange, 0) + R(287, 60, 53, 40, C.plum, 0) + R(340, 60, 40, 40, C.navy, 3) + T(200, 86, "82", 16, C.white);
          s += H("af", T(380, 142, "After (illustrative)", 14, C.ink, "", "end") + R(20, 150, 53, 40, C.green, 3) + R(73, 150, 26, 40, C.orange, 0) + R(99, 150, 18, 40, C.navy, 3) + T(140, 176, "22", 18, C.green, "", "start"));
          s += H("na", `<g transform="rotate(-8 290 180)">${R(220, 160, 150, 40, "rgba(255,255,255,.95)", 6, `stroke="${C.red}" stroke-width="3"`)}${T(295, 186, "Not achieved", 16, C.red)}</g>`);
          s += H("arr", P("M184 100 C184 130 90 120 86 148", C.orange, 2.6, 'stroke-dasharray="5 4"') + P("M310 100 C310 140 120 130 108 148", C.plum, 2.6, 'stroke-dasharray="5 4"') + chip(200, 236, "Waiting and rework shrink", { sz: 14, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("fl", chip(110, 270, "Improve flow", { sz: 15, bg: C.green, st: C.green, fg: C.white }) + chip(290, 270, "Work faster?", { sz: 14, st: C.slate, fg: C.slate }) + P("M240 270 H340", C.red, 3) + T(200, 275, ">", 18, C.ink));
          return s;
        },
        render: (c, j) => {
          c.in("af", j >= 0, { x: -30 }); c.in("na", j >= 0, { s: 1.6 }, { dl: 0.6, e: "back.out(1.4)" });
          c.in("arr", j >= 1, {}); c.in("fl", j === 2, { y: 14 });
        }
      },
      // Beat 8 · moments 25–27 · Adapted from benchmark 058 "SVGator animated UI templates" (card flip)
      // https://www.svgator.com/blog/animated-ui-templates-you-can-customize/ — two cards flip to show their separate faces.
      {
        from: 25, to: 27,
        draw: () => {
          let s = H("l", R(20, 40, 170, 180, C.white, 12, `stroke="${C.plum}" stroke-width="2.6" stroke-dasharray="7 5"`) + T(105, 70, "Illustration", 15, C.plum) + T(105, 120, "14", 40, C.plum) + T(105, 146, "work minutes", 13, C.plum) + chip(105, 190, "Example only", { sz: 13, st: C.plum, fg: C.plum }));
          s += H("r", R(210, 40, 170, 180, C.white, 12, `stroke="${C.green}" stroke-width="2.6"`) + T(295, 70, "Qasr exhibit", 15, C.green) + T(295, 120, "8.1", 40, C.green) + T(295, 146, "of 82 minutes", 13, C.green) + chip(295, 190, "Observed", { sz: 13, bg: C.green, st: C.green, fg: C.white }));
          s += H("wall", R(196, 30, 8, 200, C.red, 3) + cross(200, 252, 1.4, C.red, 4) + chip(200, 284, "Never combine", { sz: 14, bg: C.red, st: C.red, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.in("l", j >= 0, { sx: 0.05 }); c.op("l", j >= 0 ? (j === 1 ? 0.35 : 1) : 0);
          c.in("r", j >= 1, { sx: 0.05 });
          c.in("wall", j === 2, { sy: 0.1 });
        }
      },
      // Beat 9 · moments 28–30 · Adapted from benchmark 021 "Process Infographics"
      // https://elements.envato.com/process-infographics-FYE5ZGW — process steps stage in and the active state advances.
      {
        from: 28, to: 30,
        draw: () => {
          const L = ["Measure|elapsed", "Classify|activities", "Locate|waiting", "Investigate|causes", "Inform|Innovate"];
          let s = "";
          L.forEach((t, i) => { s += H("p" + i, node(4 + i * 79, 30, 74, 50, t, { sz: 12, st: i === 4 ? C.green : C.navy })); if (i < 4) s += darrow("pa" + i, 78 + i * 79, 55, 83 + i * 79, 55, C.navy, 2.2); });
          s += H("map", R(20, 120, 360, 50, C.slate, 4) + R(20, 120, 61, 50, C.green, 4) + R(81, 120, 206, 50, C.orange) + R(287, 120, 53, 50, C.plum) + R(340, 120, 40, 50, C.navy, 4) + `<g class="a-bob">${lens(184, 145, 34, C.ink)}</g>` + chip(200, 240, "Before any redesign", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
          s += H("chk", shield(120, 170, 2.2, C.navy) + chip(120, 240, "Prevents errors", { sz: 14, st: C.navy }) + P("M210 170 H330", C.red, 4) + T(270, 160, "Remove?", 15, C.red) + cross(270, 190, 1, C.red));
          s += H("pq", R(30, 120, 160, 120, C.white, 12, `stroke="${C.green}" stroke-width="2.4"`) + T(110, 150, "Purpose?", 17, C.green) + badge(110, 196, 18, C.green) + R(210, 120, 160, 120, C.white, 12, `stroke="${C.orange}" stroke-width="2.4"`) + T(290, 150, "Avoidable delay?", 15, C.orange) + clock(290, 196, 20));
          return s;
        },
        render: (c, j) => {
          c.seq("p", 5, j >= 0 ? 5 : 0, { y: -14 });
          c.in("map", j === 0, { y: 20 }); c.in("chk", j === 1, { y: 20 }); c.in("pq", j === 2, { y: 20 });
        }
      },
      // Beat 10 · moments 31–32 · Adapted from benchmark 083 "The Process Architectural Motion"
      // https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion — an idea grows into layered structure.
      {
        from: 31, to: 32,
        draw: () => {
          let s = H("cmp", person(90, 150, 2, C.green) + chip(90, 210, "Employee effort", { sz: 14, st: C.green, fg: C.green }) + T(200, 156, "≠", 34, C.red) + guest(300, 150, 2) + chip(300, 210, "Guest experience", { sz: 14, st: C.orange, fg: C.orange }));
          s += H("why", R(40, 40, 320, 230, C.white, 14, `stroke="${C.navy}" stroke-width="2.4"`) + T(200, 90, "Why does each", 20, C.navy) + T(200, 120, "activity exist?", 20, C.navy) + `<g class="a-bob">${lens(200, 186, 38, C.orange)}</g>`);
          return s;
        },
        render: (c, j) => {
          c.in("cmp", j === 0, { y: 20 }); c.in("why", j === 1, { s: 0.7 });
        }
      }
    ];
    VL_SCENES[id] = makeScene({ id, N, labels, beats, back: () => backdrop("#f6f2ec", "#ebe3d6", "diag"),
      desc: "Waiting is not working: a seated guest while the clock runs, elapsed time poured into jars for work, waiting, rework and checking, the 47-minute approval wait in 61 percent of arrivals, cases piling up at a handoff, an illustrative 82-to-22-minute decomposition labelled not achieved, and Qasr's separate observed 8.1 value-adding minutes kept apart." });
    SCENE_BG.push([id, "#f6f2ec"]);
  }

  // ============================================================
  // W8O1e · "SYMPTOMS, CAUSES AND NECESSARY CONTROLS"  ·  31 moments · 9 beats
  // Story: a visible delay is only a symptom (a warning light); approval
  // may protect contracts, so removing it can swap one problem for a
  // worse one; three purposes of activity (value, enabling, checking);
  // separate the control from the delay around it; two hypotheses to
  // test with cases and interviews; root-cause digging that stops at
  // evidence; one cause feeding several symptoms; safeguards born from
  // past failures; document purpose and evidence, then hand to Innovate.
  // ============================================================
  {
    const id = "W8O1e", N = 31;
    const labels = [
      "Purpose before change", "Delay isn't cause", "61% still wait", "A symptom signals",
      "Why does it exist?", "It may protect", "Worse problem possible", "Three purposes",
      "Value for the guest", "Enabling activity", "Checking prevents errors", "Time isn't the test",
      "Control versus delay", "Ask why approval", "Two hypotheses", "Cases and interviews",
      "Hypothesis, not cause", "Root cause analysis", "Ask why, then deeper", "Stop at evidence",
      "One cause, many symptoms", "Shared information gap", "Solve it once", "Born from failures",
      "Don't recreate errors", "Document the purpose", "Control or duplication", "Still in Understand",
      "Innovate keeps controls", "Explain, not just find", "Treat causes, not symptoms"
    ];
    const beats = [
      // Beat 1 · moments 0–3 · Adapted from benchmark 075 "Action Security Systems — Infographic & Motion Design"
      // https://www.behance.net/gallery/104646575/Action-Security-Systems-Infographic-Motion-Design — risks reveal, then controls and verification.
      {
        from: 0, to: 3,
        draw: () => {
          let s = K("dash", R(40, 40, 320, 150, C.night, 18) + R(54, 54, 292, 122, "#1e3448", 12));
          s += H("lamp", O(200, 112, 42, "rgba(229,183,108,.25)", 'class="a-pulse"') + F("M200 82 L230 136 H170 Z", C.gold) + T(200, 130, "!", 26, C.night));
          s += H("ttl", T(200, 118, "Why does it", 18, "#cfe0f0") + T(200, 146, "happen?", 18, "#cfe0f0"));
          s += H("pct", chip(200, 220, "61% of arrivals wait", { sz: 15, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("sym", chip(110, 262, "Symptom: visible", { sz: 14, st: C.orange, fg: C.orange }) + chip(290, 262, "Cause: hidden", { sz: 14, bg: C.navy, st: C.navy, fg: C.white }) + arrow(178, 262, 214, 262, C.ink, 2.4));
          s += H("eng", gear(330, 250, 22, C.slate, "#f2f0ea") + O(330, 250, 30, "none", `stroke="${C.slate}" stroke-width="2" stroke-dasharray="4 4"`));
          return s;
        },
        render: (c, j) => {
          c.in("ttl", j === 0, {}); c.in("lamp", j >= 1, { s: 0.4 }, { e: "back.out(2)" });
          c.in("pct", j >= 2, { y: 14 }); c.in("sym", j === 3, { y: 14 }); c.in("eng", false);
        }
      },
      // Beat 2 · moments 4–6 · Adapted from benchmark 095 "contract process"
      // https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8 — a proposal is reviewed and an agreement sealed.
      {
        from: 4, to: 6,
        draw: () => {
          let s = H("con", doc(130, 40, 140, 170, C.navy, C.white, 0) + T(200, 70, "Corporate", 14, C.navy) + T(200, 88, "agreement", 14, C.navy));
          s += H("q", O(310, 70, 24, C.orange) + T(310, 79, "?", 26, C.white) + chip(310, 116, "Why approve?", { sz: 13, st: C.orange, fg: C.orange }));
          s += H("seal", O(240, 180, 30, C.green) + tick(240, 180, 1.6, C.white, 5) + chip(90, 150, "Correct terms", { sz: 14, bg: C.green, st: C.green, fg: C.white }) + chip(90, 196, "Right charges", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
          s += H("rm", R(20, 222, 360, 70, "rgba(255,255,255,.97)", 12, `stroke="${C.red}" stroke-width="2.4"`) + T(40, 250, "Remove approval", 14, C.slate, "", "start") + P("M40 262 H170", C.slate, 2) + arrow(184, 254, 216, 254, C.ink, 2.4) + coin(250, 252, 12) + cross(250, 252, 1.6, C.red, 4) + T(370, 252, "Wrong bills", 15, C.red, "", "end") + T(370, 276, "Worse problem", 13, C.red, "", "end"));
          return s;
        },
        render: (c, j) => {
          c.in("con", j >= 0, { y: 20 }); c.in("q", j === 0, { s: 0.4 });
          c.in("seal", j >= 1, { s: 0.5 }, { e: "back.out(1.8)" });
          c.in("rm", j === 2, { y: 30 });
        }
      },
      // Beat 3 · moments 7–11 · Adapted from benchmark 109 "teamwork"
      // https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6 — people appear one by one and form a team.
      {
        from: 7, to: 11,
        draw: () => {
          let s = H("p0", O(70, 120, 54, C.mint, `stroke="${C.green}" stroke-width="3"`) + key(62, 116, 2, C.gold) + chip(70, 200, "Value-adding", { sz: 14, bg: C.green, st: C.green, fg: C.white }) + T(70, 230, "room access", 13, C.green));
          s += H("p1", O(200, 120, 54, "#e2ecf6", `stroke="${C.navy2}" stroke-width="3"`) + monitor(200, 116, 2, C.navy2) + chip(200, 200, "Enabling", { sz: 14, bg: C.navy2, st: C.navy2, fg: C.white }) + T(200, 230, "makes it possible", 13, C.navy2));
          s += H("p2", O(330, 120, 54, "#ece6f3", `stroke="${C.plum}" stroke-width="3"`) + shield(330, 120, 1.8, C.plum) + chip(330, 200, "Checking", { sz: 14, bg: C.plum, st: C.plum, fg: C.white }) + T(330, 230, "prevents errors", 13, C.plum));
          s += H("not", R(40, 254, 320, 40, C.white, 10, `stroke="${C.red}" stroke-width="2"`) + clock(70, 274, 12, C.red) + T(210, 280, "Time alone can't judge", 15, C.red));
          return s;
        },
        render: (c, j) => {
          c.in("p0", j >= 0 && j !== 0 ? true : j === 0, { y: 30 }, { dl: 0 });
          c.in("p1", j >= 2 || j === 0, { y: 30 }, { dl: j === 0 ? 0.2 : 0 });
          c.in("p2", j >= 3 || j === 0, { y: 30 }, { dl: j === 0 ? 0.4 : 0 });
          c.op("p0", j < 0 ? 0 : j === 2 || j === 3 ? 0.4 : 1); c.op("p1", j < 0 ? 0 : (j === 0 || j === 2 || j === 4) ? 1 : j === 3 ? 0.4 : 0); c.op("p2", j < 0 ? 0 : (j === 0 || j === 3 || j === 4) ? 1 : 0);
          c.mv("p0", j === 1 ? { s: 1.08 } : {}); c.mv("p1", j === 2 ? { s: 1.08 } : {}); c.mv("p2", j === 3 ? { s: 1.08 } : {});
          c.in("not", j === 4, { y: 14 });
        }
      },
      // Beat 4 · moments 12–12 · Adapted from benchmark 041 "Sankey With Animated Gradients"
      // https://old.observablehq.com/@jarrettmeyer/sankey-with-animated-gradients — one flow is highlighted by an animated gradient.
      {
        from: 12, to: 12,
        draw: () => {
          let s = node(10, 120, 80, 54, "Rate|requested", { sz: 13 }) + node(160, 112, 92, 70, "Await|approval", { sz: 13, st: C.orange, bg: C.peach }) + node(310, 120, 80, 54, "Rate|verified", { sz: 13, st: C.green }) + arrow(90, 147, 156, 147, C.slate, 2.6) + arrow(252, 147, 306, 147, C.slate, 2.6);
          s += H("ctl", shield(330, 82, 1.4, C.green) + chip(330, 40, "Keep control", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
          s += H("dl", O(206, 147, 54, "none", `stroke="${C.orange}" stroke-width="3" stroke-dasharray="6 5" class="a-spin"`) + chip(206, 240, "Fix the delay", { sz: 15, bg: C.orange, st: C.orange, fg: C.white }) + P("M80 196 Q150 210 140 230", C.navy, 2, 'stroke-dasharray="4 4"') + chip(80, 280, "How info arrives", { sz: 13, st: C.navy }));
          return s;
        },
        render: (c, j) => { c.in("ctl", j >= 0, { s: 0.4 }); c.in("dl", j >= 0, { s: 0.6 }, { dl: 0.5 }); }
      },
      // Beat 5 · moments 13–16 · Adapted from benchmark 089 "Git Workflow 1"
      // https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5 — a line branches, then merges back.
      {
        from: 13, to: 16,
        draw: () => {
          let s = H("rt", node(140, 20, 120, 50, "Why ask|approval?", { sz: 14, st: C.orange, bg: C.peach }));
          s += dcurve("b0", "M200 70 C200 110 90 100 90 140", 90, 140, 90, C.navy, 3) + dcurve("b1", "M200 70 C200 110 310 100 310 140", 310, 140, 90, C.plum, 3);
          s += H("h0", R(20, 144, 140, 70, C.white, 12, `stroke="${C.navy}" stroke-width="2.4"`) + doc(34, 158, 32, 42, C.navy) + O(60, 158, 9, C.orange) + T(60, 162, "?", 12, C.white) + T(116, 176, "Missing", 13, C.navy) + T(116, 194, "information", 13, C.navy));
          s += H("h1", R(240, 144, 140, 70, C.white, 12, `stroke="${C.plum}" stroke-width="2.4"`) + person(270, 190, 1.2, C.plum) + star(270, 156, 8) + T(336, 176, "Authority", 13, C.plum) + T(336, 194, "to confirm", 13, C.plum));
          s += H("ev", lens(80, 258, 20, C.ink) + T(118, 262, "Real cases", 13, C.ink, "", "start") + bubble(230, 236, 140, 40, "Interviews", { sz: 13, st: C.navy, fg: C.navy }));
          s += H("hyp", `<g transform="rotate(-6 200 112)">${R(110, 90, 180, 44, "rgba(255,255,255,.96)", 8, `stroke="${C.red}" stroke-width="3" stroke-dasharray="6 4"`)}${T(200, 118, "Hypothesis only", 17, C.red)}</g>`);
          return s;
        },
        render: (c, j) => {
          c.in("rt", j >= 0, { y: -14 });
          c.dr("b0", j >= 1 ? 1 : 0); c.dr("b1", j >= 1 ? 1 : 0, { dl: 0.2 }); c.op("b0g", j >= 1 ? 1 : 0); c.op("b1g", j >= 1 ? 1 : 0);
          c.in("h0", j >= 1, { s: 0.5 }, { dl: 0.6 }); c.in("h1", j >= 1, { s: 0.5 }, { dl: 0.8 });
          c.in("ev", j >= 2, { y: 20 }); c.in("hyp", j === 3, { s: 1.5 }, { e: "back.out(1.4)" });
        }
      },
      // Beat 6 · moments 17–19 · Adapted from benchmark 111 "Hierarchy traversal animated"
      // https://old.observablehq.com/@d3/hierarchy-traversal-animated — nodes are visited one after another down the tree.
      {
        from: 17, to: 19,
        draw: () => {
          let s = H("l0", node(130, 14, 140, 42, "Observed delay", { sz: 14, st: C.orange, bg: C.peach }));
          s += darrow("a1", 200, 56, 200, 84, C.slate, 2.4) + H("l1", node(120, 86, 160, 42, "Immediate reason", { sz: 14 }));
          s += darrow("a2", 200, 128, 200, 156, C.slate, 2.4) + H("l2", node(110, 158, 180, 42, "Underlying dependency", { sz: 13 }));
          s += darrow("a3", 200, 200, 200, 228, C.slate, 2.4) + H("l3", node(120, 230, 160, 42, "Evidence checked", { sz: 14, st: C.green, bg: C.mint }));
          s += H("why", rep(3, (i) => O(330, 72 + i * 72, 15, C.navy) + T(330, 77 + i * 72, "?", 15, C.white)) + T(330, 46, "Why?", 15, C.navy));
          s += H("stop", badge(310, 251, 18, C.green) + chip(60, 251, "Stop here", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
          s += H("dig", R(-400, 150, 1200, 400, "#d9c9ad") + P("M-400 150 H800", "#a8916b", 3) + rep(5, (i) => O(40 + i * 80, 200 + (i % 2) * 40, 5, "#bfa982")) + P("M200 60 V250", C.navy, 3, 'stroke-dasharray="6 6" class="a-flow"') + `<g class="a-bob">${lens(200, 250, 26, C.navy)}</g>` + chip(310, 110, "Dig below", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.in("l0", j >= 0, { y: -14 });
          c.dr("a1", j >= 1 ? 1 : 0); c.in("l1", j >= 1, { y: -10 }, { dl: 0.3 });
          c.dr("a2", j >= 1 ? 1 : 0, { dl: 0.5 }); c.in("l2", j >= 1, { y: -10 }, { dl: 0.8 });
          c.in("why", j >= 1, { x: 20 }, { dl: 0.4 });
          c.dr("a3", j >= 2 ? 1 : 0); c.in("l3", j >= 2, { y: -10 }, { dl: 0.3 }); c.in("stop", j === 2, { s: 0.5 }, { dl: 0.6 }); c.in("dig", j === 0, { y: 30 });
        }
      },
      // Beat 7 · moments 20–22 · Adapted from benchmark 043 "Sankey animation — acyclic graph"
      // https://observablehq.com/@joaormendes/sankey-animation-acyclic-graph — particles route along branches from one source.
      {
        from: 20, to: 22,
        draw: () => {
          let s = H("src", O(80, 150, 46, C.navy) + doc(62, 128, 36, 44, C.navy, "#cfe0f0") + O(98, 128, 10, C.orange) + T(98, 133, "?", 13, C.white) + T(80, 222, "Rate info gap", 14, C.navy));
          const Y = [60, 150, 240], L = ["Clarification calls", "Inconsistent rates", "Approval waits"];
          Y.forEach((y, i) => { s += D("e" + i, `M126 150 C200 150 200 ${y} 250 ${y}`, C.orange, 4); s += H("s" + i, chip(316, y, L[i], { sz: 13, st: C.orange, fg: C.orange })); });
          s += rep(6, (i) => `<g data-k="d${i}" style="opacity:0">${O(0, 0, 5, C.orange)}</g>`);
          s += H("one", R(30, 96, 104, 108, "none", 14, `stroke="${C.green}" stroke-width="3.4" class="a-pulse"`) + chip(80, 270, "Fix once", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.in("src", j >= 1 || j === 0, { s: 0.6 });
          for (let i = 0; i < 3; i++) { c.dr("e" + i, j >= 0 ? 1 : 0, { dl: 0.2 * i }); c.in("s" + i, j >= 0, { x: 20 }, { dl: 0.4 + 0.2 * i }); }
          for (let i = 0; i < 6; i++) { const y = [60, 150, 240][i % 3]; c.op("d" + i, j === 1 ? 1 : 0); c.mv("d" + i, j === 1 ? { x: 240 - (i > 2 ? 40 : 0), y: y - (i > 2 ? 8 * (i % 3 - 1) : 0) } : { x: 130, y: 150 }, { d: 1.2, dl: 0.1 * i }); }
          c.in("one", j === 2, { s: 1.2 });
          c.op("src", j < 0 ? 0 : 1);
        }
      },
      // Beat 8 · moments 23–26 · Adapted from benchmark 073 "The Trouble With Food Safety Audits" (NYT)
      // https://www.nytimes.com/interactive/projects/documents/food-safety-peanut-inspection — document evidence highlighted, discrepancy revealed.
      {
        from: 23, to: 26,
        draw: () => {
          let s = H("past", R(20, 30, 150, 130, C.white, 10, `stroke="${C.red}" stroke-width="2.4"`) + T(95, 56, "Past failure", 14, C.red) + coin(70, 104, 16) + cross(70, 104, 2, C.red, 4) + doc(104, 80, 46, 56, C.red) + arrow(176, 96, 220, 96, C.ink, 3) + shield(276, 96, 2, C.navy) + chip(276, 152, "Safeguard added", { sz: 13, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("loop", R(20, 196, 360, 92, "rgba(255,255,255,.97)", 12, `stroke="${C.red}" stroke-width="2.4"`) + shield(60, 240, 1.2, C.slate) + cross(60, 240, 1.6, C.red, 4) + arrow(92, 240, 140, 240, C.ink, 2.4) + coin(176, 240, 13) + cross(176, 240, 1.4, C.red, 3) + T(300, 236, "Errors return", 17, C.red) + T(300, 262, "Faster, but wrong", 13, C.red));
          s += H("log", R(20, 190, 360, 100, C.white, 12, `stroke="${C.green}" stroke-width="2.4"`) + T(40, 218, "Activity", 13, C.navy, "", "start") + T(140, 218, "Purpose", 13, C.navy, "", "start") + T(240, 218, "Evidence", 13, C.navy, "", "start") + P("M30 228 H370", C.muted, 1.4) + T(40, 252, "Rate check", 13, C.ink, "", "start") + T(140, 252, "Contracts", 13, C.ink, "", "start") + T(240, 252, "Cases, staff", 13, C.ink, "", "start") + badge(352, 248, 11, C.green));
          s += H("dup", chip(110, 180, "Necessary control", { sz: 14, bg: C.green, st: C.green, fg: C.white }) + chip(296, 180, "Duplication?", { sz: 14, st: C.orange, fg: C.orange, dash: true }));
          return s;
        },
        render: (c, j) => {
          c.in("past", j >= 0, { y: -20 }); c.op("past", j < 0 ? 0 : j >= 2 ? 0.5 : 1);
          c.in("loop", j === 1, { y: 30 }); c.in("log", j >= 2, { y: 30 }); c.in("dup", j === 3, { s: 0.7 });
          c.op("past", j === 3 ? 0 : j < 0 ? 0 : j >= 2 ? 0.5 : 1);
        }
      },
      // Beat 9 · moments 27–30 · Adapted from benchmark 068 "Design thinking process"
      // https://www.behance.net/gallery/209502471/Design-thinking-process — one stage is emphasised, then the focus moves to the next.
      {
        from: 27, to: 30,
        draw: () => {
          let s = H("ph", R(20, 40, 170, 90, C.mint, 12, `stroke="${C.green}" stroke-width="3"`) + T(105, 78, "Understand", 18, C.green) + T(105, 104, "explain today", 13, C.green) + R(210, 40, 170, 90, C.white, 12, `stroke="${C.slate}" stroke-width="2" stroke-dasharray="6 5"`) + T(295, 78, "Innovate", 18, C.slate) + T(295, 104, "design later", 13, C.slate) + arrow(190, 85, 208, 85, C.slate, 2.4));
          s += H("map", R(20, 196, 360, 92, C.white, 12, `stroke="${C.green}" stroke-width="2"`) + `<g class="a-walk">${guest(60, 254, 1.2)}</g>` + P("M90 246 H330", C.slate, 3, 'stroke-dasharray="6 6"') + `<g class="a-bob">${lens(220, 240, 22, C.green)}</g>` + T(330, 222, "Current reality", 13, C.green, "", "end"));
          s += H("you", O(105, 150, 10, C.orange) + T(105, 180, "We are here", 13, C.orange));
          s += H("kc", shield(295, 186, 1.6, C.green) + chip(295, 240, "Controls protected", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
          s += H("ex", R(20, 150, 360, 70, C.white, 12, `stroke="${C.navy}" stroke-width="2.4"`) + clock(56, 185, 16) + T(120, 190, "Slow", 14, C.slate) + arrow(150, 185, 190, 185, C.ink, 2.4) + T(290, 180, "Purpose + cause", 16, C.navy) + T(290, 202, "explained", 13, C.navy));
          s += H("tr", R(20, 236, 170, 52, C.white, 10, `stroke="${C.red}" stroke-width="2"`) + T(105, 268, "Treat symptom", 14, C.red) + cross(30, 262, 0.8, C.red) + R(210, 236, 170, 52, C.mint, 10, `stroke="${C.green}" stroke-width="2.4"`) + T(295, 268, "Treat cause", 15, C.green) + badge(370, 246, 10, C.green));
          return s;
        },
        render: (c, j) => {
          c.in("ph", j >= 0, { y: -20 }); c.in("you", j === 0, { y: 10 }); c.in("map", j === 0, { y: 20 });
          c.in("kc", j === 1, { s: 0.5 }); c.in("ex", j >= 2, { y: 20 }); c.in("tr", j === 3, { y: 20 });
        }
      }
    ];
    VL_SCENES[id] = makeScene({ id, N, labels, beats, back: () => backdrop("#f2f0ea", "#e4e0d6", "dots"),
      desc: "Symptoms, causes and necessary controls: the approval wait as a warning light, the contract it may protect, value-adding, enabling and checking activities, separating the control from its delay, two hypotheses tested by cases and interviews, a root-cause descent that stops at evidence, one information gap feeding several symptoms, safeguards born from past failures, and a documented handover to Innovate." });
    SCENE_BG.push([id, "#f2f0ea"]);
  }

  // ============================================================
  // W8O2d · "THE BASELINE THAT FUTURE RESULTS MUST BEAT"  ·  33 moments · 10 beats
  // Story: findings become usable outputs; a pile of notes is not enough;
  // a validated as-is model (staff confirm it); a baseline that the model
  // alone cannot give; the 82.0-minute mean for 310 arrivals as the
  // programme measure, 12.4 and 23 kept for what they answer; a later
  // "faster" claim that may just be a different clock; preserving the
  // definitions; root causes (47 min, 61%); an exception register; quick
  // wins that are not results; the bridge to Innovate and Realize Value.
  // ============================================================
  {
    const id = "W8O2d", N = 33;
    const labels = [
      "The bar to beat", "Findings into outputs", "The sponsor asks", "Notes aren't enough",
      "Model plus baseline", "How work really moves", "Staff validate it", "A model can't measure",
      "Measure before change", "310 arrivals, 14 hotels", "82.0, lobby to room", "The programme's measure",
      "12.4 answers less", "23 is one guest", "Don't compare clocks", "Arrival got faster?",
      "Better, or redefined?", "Freeze the definitions", "Compare like with like", "Root cause analysis",
      "47 minutes, 61%", "Why, not just remove", "Protect, then streamline", "Exception register",
      "Frequency beats memory", "Possible quick wins", "Not yet results", "Foundation for Innovate",
      "Realize Value compares", "Proof needs measurement", "No celebrating activity", "Agreement gets harder",
      "Next: resistance"
    ];
    const beats = [
      // Beat 1 · moments 0–3 · Adapted from benchmark 002 "Interactive Computer Assembly Sequence"
      // https://codepen.io/karlhorning/pen/OJqNMVR — components reveal and translate into one assembly.
      {
        from: 0, to: 3,
        draw: () => {
          let s = H("bar", P("M20 150 H380", C.green, 6) + T(200, 136, "Baseline", 18, C.green) + `<g class="a-walk">${guest(60, 200, 1.4)}</g>` + F("M300 160 l18 -40 18 40 Z", C.gold) + chip(200, 240, "Future results must beat", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
          s += rep(6, (i) => `<g data-k="n${i}" style="opacity:0">${doc(0, 0, 44, 54, [C.navy, C.orange, C.plum, C.green, C.navy2, C.slate][i])}</g>`);
          s += H("sp", person(70, 250, 1.6, C.plum) + star(70, 196, 10) + bubble(110, 196, 170, 44, "What do we know?", { sz: 14, st: C.plum, fg: C.plum }));
          s += H("mess", O(304, 260, 22, C.orange) + T(304, 268, "?", 22, C.white) + chip(310, 210, "Just a pile", { sz: 14, st: C.orange, fg: C.orange }));
          return s;
        },
        render: (c, j) => {
          c.in("bar", j === 0, { sx: 0.1 });
          const POS = [[30, 30], [90, 50], [150, 26], [210, 46], [270, 22], [330, 40]], PILE = [[230, 110], [250, 96], [238, 82], [262, 108], [244, 70], [256, 88]];
          for (let i = 0; i < 6; i++) { const on = j >= 1; const p = j >= 3 ? PILE[i] : POS[i]; c.op("n" + i, on ? 1 : 0, { dl: 0.08 * i }); c.mv("n" + i, on ? { x: p[0], y: p[1], r: j >= 3 ? (i * 17) % 30 - 15 : 0 } : { x: p[0], y: -80 }, { d: 1, dl: 0.08 * i }); }
          c.in("sp", j >= 2, { x: -30 }); c.in("mess", j === 3, { s: 0.4 });
        }
      },
      // Beat 2 · moments 4–6 · Adapted from benchmark 036 "Outline — Explainer Kit"
      // https://motionarray.com/after-effects-templates/outline-explainer-kit-36706/ — outlines draw, role cards appear, the scene resolves.
      {
        from: 4, to: 6,
        draw: () => {
          let s = H("two", R(20, 30, 170, 80, C.white, 12, `stroke="${C.navy}" stroke-width="2.6"`) + T(105, 66, "As-is model", 17, C.navy) + T(105, 90, "validated", 13, C.navy) + R(210, 30, 170, 80, C.white, 12, `stroke="${C.green}" stroke-width="2.6"`) + T(295, 66, "Baseline", 17, C.green) + T(295, 90, "quantified", 13, C.green));
          s += H("plus", T(200, 78, "+", 30, C.ink) + doc(70, 140, 70, 90, C.navy) + P("M82 170 H128 M82 190 H120", C.orange, 3) + watch(296, 186, 46, C.green) + T(296, 194, "82.0", 18, C.green) + chip(200, 270, "Two outputs", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("lane", R(20, 130, 360, 50, "#e2ecf6", 6) + R(20, 186, 360, 50, C.mint, 6) + T(30, 160, "Reception", 12, C.navy, "", "start") + T(30, 216, "Revenue", 12, C.green, "", "start"));
          s += D("fl", "M110 155 H190 V211 H270 V155 H350", C.orange, 3.4);
          s += H("nodes", O(110, 155, 8, C.navy) + O(190, 211, 8, C.green) + O(270, 155, 8, C.navy) + O(350, 155, 8, C.green) + chip(230, 268, "Handoffs, exceptions", { sz: 14, st: C.orange, fg: C.orange }));
          s += H("val", rep(3, (i) => person(70 + i * 40, 280, 1, C.green)) + rep(3, (i) => badge(70 + i * 40, 248, 10, C.green)) + chip(290, 268, "Staff confirm", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.in("two", j >= 0, { y: -20 }); c.op("two", j < 0 ? 0 : 1); c.in("plus", j === 0, { y: 20 });
          c.in("lane", j >= 1, { y: 20 }); c.dr("fl", j >= 1 ? 1 : 0, { d: 1.6 }); c.in("nodes", j === 1, {}, { dl: 0.8 });
          c.in("val", j === 2, { y: 20 });
        }
      },
      // Beat 3 · moments 7–8 · Adapted from benchmark 135 "Timeline by The Creators"
      // https://motionarray.com/after-effects-templates/timeline/ — milestones reveal along a line with a travelling marker.
      {
        from: 7, to: 8,
        draw: () => {
          let s = P("M20 170 H380", C.slate, 4) + O(110, 170, 12, C.green) + T(90, 206, "Before", 15, C.green) + O(300, 170, 12, C.navy) + T(320, 206, "After", 15, C.navy) + R(196, 150, 8, 40, C.orange, 3) + T(200, 212, "Change", 13, C.orange);
          s += H("q", doc(80, 40, 60, 74, C.navy) + T(110, 132, "Model only", 12, C.navy) + O(300, 80, 30, C.orange) + T(300, 90, "?", 30, C.white) + chip(300, 130, "Better by how much?", { sz: 13, st: C.orange, fg: C.orange }));
          s += H("m", watch(110, 76, 34, C.green) + T(110, 84, "82.0", 15, C.green) + chip(110, 250, "Measured first", { sz: 15, bg: C.green, st: C.green, fg: C.white }) + lock(160, 76, 1, C.green));
          return s;
        },
        render: (c, j) => { c.in("q", j === 0, { y: -14 }); c.in("m", j === 1, { s: 0.5 }, { e: "back.out(1.8)" }); }
      },
      // Beat 4 · moments 9–14 · Adapted from benchmark 129 "Arc tween"
      // https://observablehq.com/@d3/arc-tween — a gauge's arc rotates to a new value.
      {
        from: 9, to: 14,
        draw: () => {
          let s = H("ctx", rep(14, (i) => hotel(10 + (i % 7) * 56, 28 + Math.floor(i / 7) * 54, 34, 30, C.navy2)) + chip(110, 150, "310 arrivals", { sz: 14, bg: C.navy, st: C.navy, fg: C.white }) + chip(290, 150, "6 weeks", { sz: 14, bg: C.plum, st: C.plum, fg: C.white }));
          s += H("g", F("M60 260 A140 140 0 0 1 340 260", "none", `stroke="#e3e9ef" stroke-width="26"`) + F("M60 260 A140 140 0 0 1 340 260", "none", `stroke="${C.green}" stroke-width="26" stroke-dasharray="440" stroke-dashoffset="440" data-k="arc"`));
          s += H("gv", T(200, 240, "82.0", 38, C.green) + T(200, 268, "lobby to room", 13, C.green));
          s += H("pm", chip(200, 140, "Programme baseline", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
          s += H("s12", watch(70, 80, 34, C.navy) + T(70, 88, "12.4", 15, C.navy) + chip(70, 134, "Departmental", { sz: 12, st: C.navy }));
          s += H("s23", watch(330, 80, 34, C.orange) + T(330, 88, "23", 17, C.orange) + chip(330, 134, "One guest", { sz: 12, st: C.orange, fg: C.orange }));
          s += H("ne", T(140, 92, "≠", 26, C.red) + T(260, 92, "≠", 26, C.red));
          return s;
        },
        render: (c, j) => {
          c.in("ctx", j === 0, { y: -20 });
          c.in("g", j >= 1, { s: 0.8 }); c.in("gv", j >= 1, { s: 0.7 }, { dl: 0.6 });
          c.all('[data-k="arc"]').forEach((el) => { el.style.transition = "stroke-dashoffset 1.6s ease"; el.style.strokeDashoffset = j >= 1 ? "0" : "440"; });
          c.in("pm", j === 2, { y: -14 });
          c.in("s12", j >= 3, { x: -30 }); c.in("s23", j >= 4, { x: 30 }); c.in("ne", j === 5, { s: 0.4 });
        }
      },
      // Beat 5 · moments 15–18 · Adapted from benchmark 131 "Transition end"
      // https://observablehq.com/@d3/transition-end — move, await, then change state in a chained sequence.
      {
        from: 15, to: 18,
        draw: () => {
          let s = H("cl", chip(200, 34, "Arrival 40% faster!", { sz: 16, bg: C.gold, st: C.amber, fg: C.ink }) + rep(6, (i) => star(60 + i * 56, 74, 7)));
          s += H("bar", T(30, 128, "Before", 13, C.ink, "", "start") + R(110, 114, 270, 22, C.green, 4) + T(30, 172, "After", 13, C.ink, "", "start") + R(110, 158, 162, 22, C.navy2, 4));
          s += H("diff", R(108, 112, 274, 26, "none", 6, `stroke="${C.green}" stroke-width="2" stroke-dasharray="4 3"`) + T(245, 104, "lobby → room", 12, C.green) + R(108, 156, 166, 26, "none", 6, `stroke="${C.navy2}" stroke-width="2" stroke-dasharray="4 3"`) + T(190, 200, "booking → key", 12, C.navy2) + chip(200, 236, "Different clock?", { sz: 15, bg: C.red, st: C.red, fg: C.white }));
          s += H("fz", R(20, 210, 360, 80, C.white, 12, `stroke="${C.navy}" stroke-width="2.4"`) + lock(46, 250, 1.3, C.navy) + T(70, 236, "Start event", 12, C.navy, "", "start") + T(70, 256, "End event", 12, C.navy, "", "start") + T(70, 276, "Sampling rules", 12, C.navy, "", "start") + T(220, 236, "Exceptions", 12, C.navy, "", "start") + T(220, 256, "Population", 12, C.navy, "", "start") + T(220, 276, "Conditions", 12, C.navy, "", "start"));
          s += H("eq", chip(200, 186, "Same ruler, both times", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.in("cl", j >= 0, { y: -20 }); c.op("cl", j < 0 ? 0 : j >= 2 ? 0.3 : 1);
          c.in("bar", j >= 0, { x: -20 }, { dl: 0.3 });
          c.in("diff", j === 1, { s: 0.9 });
          c.in("fz", j >= 2, { y: 30 }); c.in("eq", j === 3, { s: 0.6 });
        }
      },
      // Beat 6 · moments 19–22 · Adapted from benchmark 071 "Celonis process analysis"
      // https://www.celonis.com/platform/process-analysis — observed flow revealed, deviations overlaid in colour.
      {
        from: 19, to: 22,
        draw: () => {
          let s = node(10, 40, 80, 48, "Arrive", { sz: 13 }) + node(110, 40, 80, 48, "Reception", { sz: 13, st: C.green }) + node(210, 40, 80, 48, "Approval", { sz: 13, st: C.orange, bg: C.peach }) + node(310, 40, 80, 48, "Room", { sz: 13 });
          s += arrow(90, 64, 106, 64) + arrow(190, 64, 206, 64) + arrow(290, 64, 306, 64);
          s += H("rc", O(250, 140, 42, "none", `stroke="${C.orange}" stroke-width="3" stroke-dasharray="6 5" class="a-spin"`) + T(250, 146, "47 min", 15, C.orange) + chip(100, 140, "61% of arrivals", { sz: 15, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("ttl", chip(200, 140, "Why does it recur?", { sz: 16, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("why", R(20, 200, 360, 86, C.white, 12, `stroke="${C.navy}" stroke-width="2.4"`) + lens(56, 240, 18, C.navy) + T(210, 236, "Document why it waits", 15, C.navy) + T(210, 262, "not just delete it", 13, C.slate));
          s += H("pr", R(20, 200, 360, 86, C.white, 12, `stroke="${C.green}" stroke-width="2.4"`) + shield(70, 244, 1.4, C.green) + T(130, 236, "Contract accuracy", 13, C.green, "", "start") + clock(100, 270, 10) + T(130, 274, "Delay around it", 13, C.orange, "", "start") + chip(320, 244, "Both true", { sz: 14, st: C.navy }));
          return s;
        },
        render: (c, j) => { c.in("ttl", j === 0, { y: 14 }); c.in("rc", j >= 1, { s: 0.6 }); c.in("why", j === 2, { y: 20 }); c.in("pr", j === 3, { y: 20 }); }
      },
      // Beat 7 · moments 23–24 · Adapted from benchmark 038 "Bar Chart Race, Explained"
      // https://observablehq.com/@d3/bar-chart-race-explained — values interpolate and the bars reorder by rank.
      {
        from: 23, to: 24,
        draw: () => {
          let s = H("reg", R(20, 20, 360, 30, C.navy, 8) + T(200, 41, "Exception register", 16, C.white));
          const E = [["Rate unclear", 61, C.orange], ["Room not ready", 18, C.navy2], ["Group booking", 9, C.plum], ["Missing ID", 4, C.slate]];
          E.forEach(([t, v, col], i) => { s += H("e" + i, T(24, 86 + i * 44, t, 14, C.ink, "", "start") + R(150, 70 + i * 44, 0.03 * 220, 24, col, 4, `data-k="eb${i}"`) + T(150 + v / 61 * 200 + 8, 88 + i * 44, v + "%", 13, col, "", "start")); });
          s += H("mem", bubble(210, 236, 170, 40, "Loudest complaint", { sz: 13, st: C.slate, fg: C.slate }) + P("M20 260 H150", C.red, 3) + chip(90, 260, "Memory", { sz: 13, st: C.slate, fg: C.slate }) + chip(200, 290, "Frequency decides", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          const V = [61, 18, 9, 4];
          c.in("reg", j >= 0, { y: -14 });
          for (let i = 0; i < 4; i++) { c.in("e" + i, j >= 0, { x: -20 }, { dl: 0.12 * i }); c.mv("eb" + i, { sx: j >= 0 ? V[i] / 61 * 200 / 6.6 : 1, pv: [150, 0] }, { d: 1.2, dl: 0.12 * i }); }
          c.in("mem", j === 1, { y: 14 });
        }
      },
      // Beat 8 · moments 25–26 · Adapted from benchmark 057 "GSAP SVG Research" (plant growth)
      // https://codepen.io/FabioG/post/svg-animation-research-gsap — a stem grows, leaves reveal.
      {
        from: 25, to: 26,
        draw: () => {
          let s = P("M120 270 H280", "#a8916b", 6);
          s += D("stem", "M200 270 C200 220 190 190 200 140", C.green, 5);
          s += H("lv", F("M200 210 C170 190 150 200 140 220 C165 225 185 222 200 210 Z", C.green) + F("M200 180 C230 160 250 170 258 190 C232 194 214 190 200 180 Z", C.green) + O(200, 132, 14, C.gold) + chip(310, 120, "Quick win idea", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
          s += H("nr", `<g transform="rotate(-6 200 64)">${R(90, 40, 220, 46, "rgba(255,255,255,.96)", 8, `stroke="${C.red}" stroke-width="3"`)}${T(200, 70, "Not implemented yet", 16, C.red)}</g>` + chip(80, 200, "No benefit shown", { sz: 13, st: C.slate, fg: C.slate }));
          return s;
        },
        render: (c, j) => { c.dr("stem", j >= 0 ? 1 : 0, { d: 1.2 }); c.in("lv", j >= 0, { s: 0.3 }, { dl: 0.8 }); c.in("nr", j === 1, { s: 1.5 }, { e: "back.out(1.4)" }); }
      },
      // Beat 9 · moments 27–29 · Adapted from benchmark 017 "Design process timeline — Animation"
      // https://dribbble.com/shots/9892691-Design-process-timeline-Animation — timeline milestones reveal in order.
      {
        from: 27, to: 29,
        draw: () => {
          const L = ["Understand|baseline", "Innovate|design", "Implement|changes", "Realize|Value"];
          let s = "";
          L.forEach((t, i) => { s += H("p" + i, node(8 + i * 98, 40, 88, 52, t, { sz: 13, st: i === 0 ? C.green : i === 3 ? C.plum : C.navy, bg: i === 0 ? C.mint : C.white })); if (i < 3) s += darrow("pa" + i, 96 + i * 98, 66, 104 + i * 98, 66, C.navy, 2.4); });
          s += H("arc", P("M52 96 C52 190 348 190 348 96", C.green, 3, 'stroke-dasharray="6 5" class="a-flow"') + chip(200, 196, "Same baseline", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
          s += H("cmp", R(30, 220, 340, 64, C.white, 10, `stroke="${C.plum}" stroke-width="2.4"`) + T(60, 258, "Proposal", 14, C.slate, "", "start") + T(200, 258, "≠", 20, C.red) + T(240, 250, "Comparable", 13, C.plum, "", "start") + T(240, 270, "measurement", 13, C.plum, "", "start"));
          return s;
        },
        render: (c, j) => { c.seq("p", 4, j < 0 ? 0 : j === 0 ? 2 : 4, { y: -14 }); c.in("arc", j >= 1, {}); c.in("cmp", j === 2, { y: 20 }); }
      },
      // Beat 10 · moments 30–32 · Adapted from benchmark 074 "Awwwards scroll animations — Ember House"
      // https://www.awwwards.com/inspiration/scroll-animations — a statement reveals, then transitions to supporting proof.
      {
        from: 30, to: 32,
        draw: () => {
          let s = H("pt", rep(8, (i) => `<g transform="rotate(${(i * 45) % 360} ${120 + (i % 4) * 50} ${60 + Math.floor(i / 4) * 40})">${R(110 + (i % 4) * 50, 56 + Math.floor(i / 4) * 40, 14, 6, [C.gold, C.orange, C.green, C.plum][i % 4], 2)}</g>`) + chip(200, 160, "Activity changed", { sz: 15, st: C.slate, fg: C.slate }) + chip(200, 206, "Guests no better?", { sz: 15, bg: C.red, st: C.red, fg: C.white }));
          s += H("res", person(80, 180, 1.8, C.plum) + bubble(130, 70, 200, 52, "Not my figure", { sz: 15, st: C.plum, fg: C.plum }) + watch(300, 200, 34, C.green) + T(300, 208, "82.0", 15, C.green));
          s += H("nx", R(40, 50, 320, 200, C.white, 14, `stroke="${C.navy}" stroke-width="2.4"`) + T(200, 104, "Next lesson", 16, C.navy) + T(200, 142, "When numbers", 20, C.orange) + T(200, 170, "feel personal", 20, C.orange) + person(200, 226, 1.2, C.plum));
          return s;
        },
        render: (c, j) => { c.in("pt", j === 0, { y: -20 }); c.in("res", j === 1, { x: -20 }); c.in("nx", j === 2, { s: 0.8 }); }
      }
    ];
    VL_SCENES[id] = makeScene({ id, N, labels, beats, back: () => backdrop("#eef2f6", "#dfe6ee"),
      desc: "The baseline future results must beat: scattered notes become a validated as-is model and a quantified baseline, the 82.0-minute gauge for 310 arrivals with 12.4 and 23 kept for their own questions, a later faster claim tested for a different clock, frozen definitions, the 47-minute root cause, an exception register, quick wins that are not yet results, and the bridge to Innovate and Realize Value." });
    SCENE_BG.push([id, "#eef2f6"]);
  }

  addStyles(SCENE_BG);
})();

// OPER621 · Week 8 · The Understand Phase — animated teaching scenes (round 2, Claude)
// File: w08-claude-part4.js · Lesson 4 · When the numbers become personal · Scenes: W8O3a, W8O3b, W8O3c
// Standalone part: defines its own engine and helpers, registers its scenes and appends its own
// rules (all scoped under .vls-w08-<secId>) into the single shared <style id="vl-sc-w08">.
// Parts may be loaded in any order or concatenated.
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }; i = narration moment index.
// Each section is a sequence of beats (a new visual every 3-4 narration lines); each beat names the
// benchmark template it adapts (number, title, URL). All drawing code is original.
(() => {
  "use strict";
  // ================= shared engine (self-contained copy for this part) =================
  window.VL_SCENES = window.VL_SCENES || {};
  const VL_SCENES = window.VL_SCENES;
  const PART = "p4";
  const C = {
    navy: "#1f4e79", navy2: "#2d6a9f", orange: "#c0502a", paper: "#fbf8f1", ink: "#1b2a3a",
    blue: "#dbe7f2", green: "#317c61", gold: "#e5b76c", amber: "#a8741a", plum: "#6b4e8a",
    red: "#b0362b", white: "#ffffff", slate: "#5d7389", muted: "#9fb3c4", mint: "#e1f0e8",
    peach: "#f8e3d8", lilac: "#ece6f3", sky: "#eaf2f8", sand: "#efe4cf", night: "#14263a", teal: "#2a7f86"
  };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const num = (v, f) => { const x = Number(v); return Number.isFinite(x) ? x : f; };
  const reduced = () => { try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (_) { return false; } };
  const hasG = () => !!(window.gsap && typeof window.gsap.to === "function" && typeof window.gsap.set === "function") && !reduced();
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");
  const inR = (k, a, b) => k >= a && k <= b;
  // ---- SVG string builders ----
  const R = (x, y, w, h, f, rx = 0, ex = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${ex}/>`;
  const O = (cx, cy, r, f, ex = "") => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${ex}/>`;
  const E = (cx, cy, rx, ry, f, ex = "") => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${ex}/>`;
  const P = (d, s, w = 2, ex = "") => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
  const F = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
  const D = (k, d, s, w = 3, ex = "") => `<path data-k="${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100" ${ex}/>`;
  const T = (x, y, s, sz = 14, f = C.ink, ex = "", a = "middle") => `<text x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
  const TK = (k, x, y, s, sz = 14, f = C.ink, a = "middle", ex = "") => `<text data-k="${k}" x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
  const K = (k, body, ex = "") => `<g data-k="${k}" ${ex}>${body}</g>`;
  const H = (k, body, ex = "") => `<g data-k="${k}" style="opacity:0" ${ex}>${body}</g>`;
  const tw = (s, sz) => Math.round(String(s).length * sz * 0.6 + sz * 1.3);
  const chip = (x, y, s, o = {}) => {
    const sz = o.sz || 14, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.85);
    return `<g class="w8c">` + R(x - w / 2, y - h / 2, w, h, o.bg || C.paper, o.rx == null ? h / 2 : o.rx,
      `stroke="${o.st || C.navy}" stroke-width="${o.sw || 1.8}"${o.dash ? ' stroke-dasharray="5 4"' : ""}`) +
      T(x, y + sz * 0.36, s, sz, o.fg || C.navy) + `</g>`;
  };
  // process box with 1-2 lines ("Line one|line two")
  const node = (x, y, w, h, s, o = {}) => {
    const sz = o.sz || 13, L = String(s).split("|"), lh = sz * 1.15, y0 = y + h / 2 - (L.length - 1) * lh / 2 + sz * 0.36;
    return `<g class="w8c">` + R(x, y, w, h, o.bg || C.white, o.rx == null ? 8 : o.rx, `stroke="${o.st || C.navy}" stroke-width="${o.sw || 2}"${o.dash ? ' stroke-dasharray="5 4"' : ""}`) +
      L.map((t, i) => T(x + w / 2, y0 + i * lh, t, sz, o.fg || C.ink)).join("") + `</g>`;
  };
  const head = (x, y, ang, col, s = 1) => { const a = ang * Math.PI / 180, c = Math.cos(a), si = Math.sin(a), p = (dx, dy) => `${(x + dx * c - dy * si).toFixed(1)} ${(y + dx * si + dy * c).toFixed(1)}`; return F(`M${p(2 * s, 0)} L${p(-8 * s, -5.5 * s)} L${p(-8 * s, 5.5 * s)} Z`, col); };
  const arrow = (x1, y1, x2, y2, col = C.slate, w = 2.4, ex = "") => P(`M${x1} ${y1} L${x2} ${y2}`, col, w, ex) + head(x2, y2, Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, col);
  const darrow = (k, x1, y1, x2, y2, col = C.slate, w = 2.6) => { const L = Math.hypot(x2 - x1, y2 - y1) || 1, ex = x2 - (x2 - x1) / L * 6, ey = y2 - (y2 - y1) / L * 6; return D(k, `M${x1} ${y1} L${ex.toFixed(1)} ${ey.toFixed(1)}`, col, w) + H(k + "g", head(x2, y2, Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, col)); };
  const dcurve = (k, d, x2, y2, ang, col = C.slate, w = 2.6) => D(k, d, col, w) + H(k + "g", head(x2, y2, ang, col));
  const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${x - 7 * s} ${y} l${5 * s} ${5 * s} l${10 * s} ${-11 * s}`, col, w);
  const cross = (x, y, s = 1, col = C.red, w = 3) => P(`M${x - 6 * s} ${y - 6 * s} l${12 * s} ${12 * s} M${x + 6 * s} ${y - 6 * s} l${-12 * s} ${12 * s}`, col, w);
  const badge = (x, y, r, col, ok = true) => O(x, y, r, col) + (ok ? tick(x, y, r / 13, C.white, Math.max(2, r / 5)) : cross(x, y, r / 14, C.white, Math.max(2, r / 5)));
  const person = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}</g>`;
  const guest = (x, y, s = 1, col = C.navy2, bag = C.orange) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -17, 8, col)}${F("M-12 14 Q-12 -6 0 -6 Q12 -6 12 14 Z", col)}${R(13, -2, 12, 16, bag, 3)}${P("M16 -2 v-4 h6 v4", bag, 1.6)}</g>`;
  const clock = (x, y, r, col = C.orange, bg = C.paper) => O(x, y, r, bg, `stroke="${col}" stroke-width="${Math.max(2, r / 6)}"`) + P(`M${x} ${y - r * 0.62} V${y} L${x + r * 0.45} ${y + r * 0.3}`, col, Math.max(2, r / 7));
  const hand = (x, y, len, col, dur = 4, w = 3) => `<path class="a-hand" style="transform-origin:${x}px ${y}px;animation-duration:${dur}s" d="M${x} ${y} V${y - len}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
  const watch = (x, y, r, col = C.navy, bg = C.white) => R(x - r * 0.22, y - r - 9, r * 0.44, 7, col, 2) + O(x, y, r, bg, `stroke="${col}" stroke-width="${Math.max(3, r / 7)}"`) + rep(12, (i) => { const a = i * Math.PI / 6; return P(`M${(x + r * 0.78 * Math.sin(a)).toFixed(1)} ${(y - r * 0.78 * Math.cos(a)).toFixed(1)} L${(x + r * 0.9 * Math.sin(a)).toFixed(1)} ${(y - r * 0.9 * Math.cos(a)).toFixed(1)}`, col, i % 3 ? 1.2 : 2.4); });
  const phone = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M-12 -6 Q-12 -12 -6 -12 L-2 -12 L0 -5 L-4 -2 Q-2 4 4 8 L7 4 L13 6 L13 10 Q13 15 7 15 Q-12 13 -12 -6 Z", col)}</g>`;
  const doc = (x, y, w, h, col = C.navy, bg = C.white, lines = 3) => R(x, y, w, h, bg, 4, `stroke="${col}" stroke-width="2"`) + (lines === 0 ? R(x, y, w, 7, col, 3) : "") + rep(lines, (i) => P(`M${x + 7} ${y + 11 + i * ((h - 16) / Math.max(1, lines))} H${x + w - 7 - (i === lines - 1 ? w * 0.25 : 0)}`, col, 2, 'opacity=".55"'));
  const desk = (x, y, w, col = C.navy) => R(x, y, w, 10, C.orange, 3) + R(x + 6, y + 10, w - 12, 26, col, 3);
  const monitor = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-18, -14, 36, 24, col, 3)}${R(-15, -11, 30, 18, "#cfe0f0", 2)}${R(-3, 10, 6, 6, col)}${R(-10, 15, 20, 3, col, 1)}</g>`;
  const lens = (x, y, r, col = C.ink) => O(x, y, r, "rgba(255,255,255,.22)", `stroke="${col}" stroke-width="${Math.max(3, r / 9)}"`) + P(`M${x + r * 0.72} ${y + r * 0.72} L${x + r * 1.25} ${y + r * 1.25}`, col, Math.max(5, r / 4.5));
  const gear = (x, y, r, col, hole = C.paper) => { let d = ""; const n = 8; for (let i = 0; i < n; i++) { const a0 = (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n * 0.55, a2 = a0 + Math.PI / n, a3 = a2 + Math.PI / n * 0.45, p = (a, rr) => `${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`; d += (i ? "L" : "M") + p(a0, r) + "L" + p(a1, r) + "L" + p(a2, r * 0.78) + "L" + p(a3, r * 0.78); } return F(d + "Z", col) + O(x, y, r * 0.34, hole); };
  const star = (x, y, r, col = C.gold, st = C.amber) => { let d = ""; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; d += (i ? "L" : "M") + (x + rr * Math.cos(a)).toFixed(1) + " " + (y + rr * Math.sin(a)).toFixed(1); } return F(d + "Z", col, `stroke="${st}" stroke-width="1"`); };
  const hotel = (x, y, w, h, col = C.navy, win = "#cfe0f0") => R(x, y, w, h, col, 6) + F(`M${x - 8} ${y + 2} L${x + w / 2} ${y - 22} L${x + w + 8} ${y + 2} Z`, C.navy2) + rep(Math.floor((h - 34) / 22) * 4, (i) => R(x + 10 + (i % 4) * ((w - 20) / 4), y + 12 + Math.floor(i / 4) * 22, (w - 20) / 4 - 8, 13, win, 2)) + R(x + w / 2 - 13, y + h - 30, 26, 30, C.gold, 3);
  const door = (x, y, w, h, col = C.green, bg = "#d7ebdf") => R(x, y, w, h, col, 4) + R(x + 5, y + 5, w - 10, h - 5, bg, 2) + O(x + w - 11, y + h / 2 + 4, 2.6, col);
  const key = (x, y, s = 1, col = C.gold) => `<g transform="translate(${x} ${y}) scale(${s})">${O(-9, 0, 7, "none", `stroke="${col}" stroke-width="3.4"`)}${P("M-2 0 H14 M10 0 V5 M14 0 V6", col, 3.4)}</g>`;
  const bubble = (x, y, w, h, s, o = {}) => `<g class="w8c">` + R(x, y, w, h, o.bg || C.white, 10, `stroke="${o.st || C.navy}" stroke-width="1.8"`) + F(`M${x + (o.tx || 16)} ${y + h - 1} L${x + (o.tx || 16) - 4} ${y + h + 10} L${x + (o.tx || 16) + 10} ${y + h - 1} Z`, o.bg || C.white, `stroke="${o.st || C.navy}" stroke-width="1.8" stroke-linejoin="round"`) + R(x + (o.tx || 16) - 3, y + h - 3, 14, 4, o.bg || C.white) + T(x + w / 2, y + h / 2 + (o.sz || 13) * 0.36, s, o.sz || 13, o.fg || C.navy) + `</g>`;
  const coin = (x, y, r = 8) => O(x, y, r, C.gold, `stroke="${C.amber}" stroke-width="2"`) + T(x, y + r * 0.42, "$", r * 1.2, C.amber);
  const shield = (x, y, s = 1, col = C.green) => `<g transform="translate(${x} ${y}) scale(${s})">${F("M0 -18 L15 -12 V0 Q15 13 0 20 Q-15 13 -15 0 V-12 Z", col)}${tick(0, 0, 0.8, C.white, 3)}</g>`;
  const lock = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-11, -3, 22, 17, col, 3)}${P("M-7 -3 v-6 a7 7 0 0 1 14 0 v6", col, 3)}${O(0, 5, 2.6, C.white)}</g>`;
  const cal = (x, y, w, h, col = C.red) => R(x, y, w, h, C.white, 5, `stroke="${col}" stroke-width="2"`) + R(x, y, w, h * 0.28, col, 5) + R(x, y + h * 0.18, w, h * 0.1, col);
  const moon = (x, y, r, col = C.gold) => F(`M${x} ${y - r} A${r} ${r} 0 1 0 ${x} ${y + r} A${r * 1.3} ${r * 1.3} 0 0 1 ${x} ${y - r} Z`, col);
  const scale = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${P("M0 -26 V22 M-16 22 H16 M-30 -18 H30", col, 3)}${P("M-30 -18 L-40 2 M-30 -18 L-20 2 M30 -18 L20 2 M30 -18 L40 2", col, 1.6)}${F("M-42 2 Q-30 14 -18 2 Z", col)}${F("M18 2 Q30 14 42 2 Z", col)}</g>`;
  // ---- per-scene stylesheet (all rules scoped under .vls-w08-<secId>) ----
  function sceneCSS(id, bg) {
    const s = ".vls-w08-" + id;
    return `
${s}{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:220px;overflow:hidden!important;box-sizing:border-box;border-radius:14px;background:${bg};color:${C.ink};font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w08-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w08-fig>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}
${s} svg text{font-family:inherit;font-weight:700;letter-spacing:.1px}
${s} [data-k],${s} [data-beat]{transform-box:fill-box;transform-origin:50% 50%}
${s}.w08-css [data-k],${s}.w08-css [data-beat]{transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.8s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}
${s}.w08-snap [data-k],${s}.w08-snap [data-beat],${s}.w08-rm [data-k],${s}.w08-rm [data-beat]{transition:none!important}
${s}.w08-rm *{animation:none!important}
${s} .w08-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:36px;padding:6px 12px 8px;font-size:14px;font-weight:700;line-height:1.25;color:${C.navy};background:rgba(255,255,255,.6);border-top:1px solid rgba(31,78,121,.12)}
${s} .w08-num{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w08-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.2px}
${s} .w08-lab.w08-in{animation:vlsw08CapIn .5s cubic-bezier(.22,.8,.24,1)}
${s} .w08-bar{flex:0 0 54px;height:4px;border-radius:4px;background:rgba(31,78,121,.15);overflow:hidden}
${s} .w08-bar i{display:block;height:100%;width:0;background:${C.orange};transition:width .6s ease}
${s} .a-flow{stroke-dasharray:6 7;animation:vlsw08Flow 1.1s linear infinite}
${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw08Spin 7s linear infinite}
${s} .a-hand{transform-box:view-box;animation-name:vlsw08Spin;animation-timing-function:linear;animation-iteration-count:infinite}
${s} .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw08Bob 2.6s ease-in-out infinite}
${s} .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw08Pulse 2s ease-in-out infinite}
${s} .a-blink{animation:vlsw08Blink 1.4s ease-in-out infinite}
${s} .a-ring{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw08Ring .9s ease-in-out infinite}
${s} .a-walk{animation:vlsw08Walk 2.4s ease-in-out infinite}
@media (max-width:420px){${s} .w08-cap{font-size:13px;min-height:32px;padding:5px 10px 7px}${s} .w08-bar{flex-basis:40px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
  }
  const KEYFRAMES = `
@keyframes vlsw08CapIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes vlsw08Flow{to{stroke-dashoffset:-26}}
@keyframes vlsw08Spin{to{transform:rotate(360deg)}}
@keyframes vlsw08Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes vlsw08Pulse{0%,100%{opacity:.35;transform:scale(.94)}50%{opacity:.95;transform:scale(1.06)}}
@keyframes vlsw08Blink{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes vlsw08Ring{0%,100%{transform:rotate(0)}25%{transform:rotate(-12deg)}75%{transform:rotate(12deg)}}
@keyframes vlsw08Walk{0%,100%{transform:translateX(0)}50%{transform:translateX(6px)}}
`;
  function addStyles(list) {
    if (typeof document === "undefined") return;
    let st = document.getElementById("vl-sc-w08");
    if (!st) { st = document.createElement("style"); st.id = "vl-sc-w08"; (document.head || document.documentElement).appendChild(st); }
    const flag = "data-w08claude" + PART;
    if (st.getAttribute(flag)) return;
    st.setAttribute(flag, "1");
    const kf = st.getAttribute("data-w08kf") ? "" : KEYFRAMES;
    st.setAttribute("data-w08kf", "1");
    st.appendChild(document.createTextNode(kf + list.map((p) => sceneCSS(p[0], p[1])).join("\n")));
  }
  // ---- scene factory: beats (a new visual every 3-4 moments) + per-moment builds ----
  function makeScene(cfg) {
    const { id, N, labels, beats } = cfg;
    let root = null, useG = false, beatNow = -1;
    const mapK = (i, n) => {
      const nn = Math.max(1, Math.floor(num(n, N)));
      const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
      return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
    };
    const beatOf = (k) => { for (let b = 0; b < beats.length; b++) if (k >= beats[b].from && k <= beats[b].to) return b; return beats.length - 1; };
    const dur = (t, d) => (t.d == null ? d : t.d);
    function timing(el, t, d) { el.style.transitionDuration = dur(t, d) + "s"; el.style.transitionDelay = (t.dl || 0) + "s"; }
    function tf(el, st, t, snap) {
      const x = st.x || 0, y = st.y || 0, r = st.r || 0;
      const sx = st.sx != null ? st.sx : (st.s != null ? st.s : 1), sy = st.sy != null ? st.sy : (st.s != null ? st.s : 1);
      if (useG) {
        const v = { x, y, rotation: r, scaleX: sx, scaleY: sy };
        if (st.pv) v.svgOrigin = st.pv[0] + " " + st.pv[1]; else v.transformOrigin = "50% 50%";
        if (snap) window.gsap.set(el, v);
        else window.gsap.to(el, Object.assign(v, { duration: dur(t, 0.85), delay: t.dl || 0, ease: t.e || "power3.out", overwrite: "auto" }));
      } else {
        if (st.pv) { el.style.transformBox = "view-box"; el.style.transformOrigin = st.pv[0] + "px " + st.pv[1] + "px"; }
        timing(el, t, 0.85);
        el.style.transform = "translate(" + x + "px," + y + "px) rotate(" + r + "deg) scale(" + sx + "," + sy + ")";
      }
    }
    function op(el, o, t, snap) {
      if (useG) { if (snap) window.gsap.set(el, { opacity: o }); else window.gsap.to(el, { opacity: o, duration: dur(t, 0.6), delay: t.dl || 0, ease: "power1.out", overwrite: false }); }
      else { timing(el, t, 0.6); el.style.opacity = String(o); }
    }
    function dash(el, f, t, snap) {
      const v = 100 * (1 - clamp(f, 0, 1));
      if (useG) { if (snap) window.gsap.set(el, { strokeDashoffset: v }); else window.gsap.to(el, { strokeDashoffset: v, duration: dur(t, 1.1), delay: t.dl || 0, ease: "power2.inOut" }); }
      else { timing(el, t, 1.1); el.style.strokeDashoffset = String(v); }
    }
    function fill(el, col, t, snap) {
      if (useG) { if (snap) window.gsap.set(el, { fill: col }); else window.gsap.to(el, { fill: col, duration: dur(t, 0.6), delay: t.dl || 0 }); }
      else { timing(el, t, 0.6); el.style.fill = col; }
    }
    function count(el, to, o, snap) {
      const fmt = (v) => (o.pre || "") + (o.dec ? v.toFixed(o.dec) : Math.round(v).toLocaleString("en-US")) + (o.suf || "");
      if (el._raf) cancelAnimationFrame(el._raf);
      const from = el._v != null ? el._v : (o.from || 0);
      el._v = to;
      if (snap || reduced() || typeof requestAnimationFrame !== "function") { el.textContent = fmt(to); return; }
      const t0 = performance.now(), d = (o.d || 1.1) * 1000, dl = (o.dl || 0) * 1000;
      const stepF = (now) => { const p = clamp((now - t0 - dl) / d, 0, 1), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(from + (to - from) * e); if (p < 1) el._raf = requestAnimationFrame(stepF); };
      el._raf = requestAnimationFrame(stepF);
    }
    function ctx(scope, snap) {
      const q = (k) => (scope ? Array.prototype.slice.call(scope.querySelectorAll('[data-k="' + k + '"]')) : []);
      const c = {
        snap,
        op: (k, o, t = {}) => q(k).forEach((el) => op(el, o, t, snap)),
        mv: (k, st, t = {}) => q(k).forEach((el) => tf(el, st, t, snap)),
        dr: (k, f, t = {}) => { q(k).forEach((el) => dash(el, f, t, snap)); q(k + "g").forEach((el) => op(el, f >= 1 ? 1 : 0, { dl: f >= 1 ? (t.dl || 0) + dur(t, 1.1) * 0.8 : 0, d: 0.3 }, snap)); },
        fl: (k, col, t = {}) => q(k).forEach((el) => fill(el, col, t, snap)),
        tx: (k, s) => q(k).forEach((el) => { if (el.textContent !== String(s)) el.textContent = String(s); }),
        cnt: (k, to, o = {}) => q(k).forEach((el) => count(el, to, o, snap)),
        // show/hide with an entrance offset (default: rise 12)
        in: (k, on, from, t = {}) => q(k).forEach((el) => { op(el, on ? 1 : 0, t, snap); tf(el, on ? {} : (from || { y: 12 }), t, snap); }),
        vis: (map, t = {}) => Object.keys(map).forEach((k) => q(k).forEach((el) => op(el, map[k] === true ? 1 : map[k] === false ? 0 : map[k], t, snap))),
        // reveal a numbered sequence p0..p(n-1) with connectors pa0..; upto = how many are visible
        seq: (p, n, upto, from) => { for (let i = 0; i < n; i++) { q(p + i).forEach((el) => { op(el, i < upto ? 1 : 0, { dl: i < upto ? 0.08 * i : 0 }, snap); tf(el, i < upto ? {} : (from || { y: 14 }), { dl: i < upto ? 0.08 * i : 0 }, snap); }); c.dr(p + "a" + i, i < upto - 1 ? 1 : 0, { dl: 0.1 * i }); } },
        all: (sel) => (scope ? Array.prototype.slice.call(scope.querySelectorAll(sel)) : []),
        opEl: (el, o, t = {}) => op(el, o, t, snap),
        mvEl: (el, st, t = {}) => tf(el, st, t, snap),
        flEl: (el, col, t = {}) => fill(el, col, t, snap)
      };
      return c;
    }
    function caption(k, snap) {
      const lab = root.querySelector(".w08-lab"), nn = root.querySelector(".w08-num"), bar = root.querySelector(".w08-bar i");
      const txt = labels[k] || "";
      if (lab && lab.textContent !== txt) { lab.textContent = txt; if (!snap && !reduced()) { lab.classList.remove("w08-in"); void lab.offsetWidth; lab.classList.add("w08-in"); } }
      if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
      if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
    }
    function render(k, snap) {
      if (!root) return;
      const b = beatOf(k), entering = b !== beatNow;
      const groups = Array.prototype.slice.call(root.querySelectorAll("[data-beat]"));
      if (snap) root.classList.add("w08-snap");
      groups.forEach((g, gi) => {
        const on = gi === b;
        op(g, on ? 1 : 0, { d: on ? 0.7 : 0.4, dl: on && entering && !snap ? 0.12 : 0 }, snap);
        tf(g, on ? {} : { x: gi < b ? -28 : 28, s: 0.97 }, { d: 0.8 }, snap);
        g.setAttribute("aria-hidden", on ? "false" : "true");
      });
      const B = beats[b], scope = groups[b];
      try {
        if (entering && !snap) {
          root.classList.add("w08-snap");
          B.render(ctx(scope, true), -1, k);
          void root.getBoundingClientRect();
          root.classList.remove("w08-snap");
        }
        B.render(ctx(scope, snap), k - B.from, k);
        if (cfg.always) cfg.always(ctx(root, snap), k, b);
      } catch (e) { if (window.console) console.warn("[VL W08 " + id + "]", e); }
      caption(k, snap);
      if (snap) { void root.getBoundingClientRect(); root.classList.remove("w08-snap"); }
      beatNow = b;
      root.setAttribute("data-moment", String(k));
    }
    function kill() { if (root && useG) { try { window.gsap.killTweensOf(root.querySelectorAll("[data-k],[data-beat]")); } catch (_) {} } }
    function mount(el) {
      const r = document.createElement("div");
      const rm = reduced();
      r.className = "vls-w08-" + id + " w08-root" + (useG ? " w08-gsap" : " w08-css") + (rm ? " w08-rm" : "");
      r.setAttribute("data-scene", id);
      const body = (cfg.back ? cfg.back() : "") + beats.map((B, b) => `<g data-beat="${b}" style="opacity:0">${B.draw()}</g>`).join("") + (cfg.front ? cfg.front() : "");
      r.innerHTML = '<div class="w08-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' + esc(cfg.desc) + '">' + body +
        '</svg></div><div class="w08-cap" aria-hidden="true"><span class="w08-num"></span><span class="w08-lab"></span><span class="w08-bar"><i></i></span></div>';
      if (typeof el.replaceChildren === "function") el.replaceChildren(r); else { el.innerHTML = ""; el.appendChild(r); }
      return r;
    }
    return {
      build(el) {
        if (!el || el.nodeType !== 1) return;
        kill(); useG = hasG(); beatNow = -1;
        root = mount(el);
        render(0, true);
      },
      step(i, n) { if (!root) return; render(mapK(i, n), false); },
      reset() { if (!root) return; kill(); beatNow = -1; render(0, true); }
    };
  }
  const SCENE_BG = [];
  // backdrop builder: bleed colour + soft pattern (keeps the figure full-bleed on any aspect ratio)
  const backdrop = (bg, line, kind = "grid") => R(-400, -300, 1200, 900, bg) + (kind === "grid"
    ? rep(30, (i) => P(`M${-400 + i * 40} -300 V700`, line, 1)) + rep(24, (i) => P(`M-400 ${-300 + i * 40} H800`, line, 1))
    : kind === "dots" ? rep(60, (i) => O(-380 + (i % 12) * 100, -270 + Math.floor(i / 12) * 180 + (i % 2) * 40, 2.4, line))
    : rep(34, (i) => P(`M${-400 + i * 40} -300 L${-160 + i * 40} 700`, line, 1)));

  // ============================================================
  // W8O3a · "WHY MEASURING A PROCESS FEELS THREATENING"  ·  33 moments · 10 beats
  // Story: a defensible number is not yet an accepted one; the director
  // who knows how hard reception works meets the 82.0-minute figure and
  // reaches for the 12.4; his fear of being blamed for the whole journey
  // is legitimate; process vs individual performance; fear makes people
  // hide workarounds; the 47-minute wait sits in the revenue office; the
  // need for an end-to-end owner; old flattering indicators; listen,
  // explain, clarify use, build trust; keep both integrity and fairness.
  // ============================================================
  {
    const id = "W8O3a", N = 33;
    const labels = [
      "Defensible isn't accepted", "A sensitive area", "Meet the director", "Reception works hard",
      "82.0 across 310", "He challenges it", "He prefers 12.4", "Why it matters",
      "Fear of unfair blame", "A legitimate concern", "Process versus individual", "Investigation feels like blame",
      "Workarounds go hidden", "Baselining is contentious", "Visibility touches reputations", "Back to the approval",
      "47 minutes, 61%", "Wait sits in revenue", "Excluding conceals it", "Department versus journey",
      "Someone owns the whole", "Flattering old indicators", "Broader view unsettles", "Neither dismiss nor abandon",
      "Real weaknesses?", "Explain what's measured", "Say how it's used", "Trust brings knowledge",
      "Fear brings silence", "82 still stands", "Concerns still count", "Integrity and fairness",
      "Next: building acceptance"
    ];
    const beats = [
      // Beat 1 · moments 0–1 · Adapted from benchmark 062 "SVGator motion graphics assets"
      // https://www.svgator.com/animation-templates/assets — an element reveals, is emphasised, then exits.
      {
        from: 0, to: 1,
        draw: () => {
          let s = H("num", watch(120, 140, 70, C.green) + T(120, 152, "82.0", 32, C.green) + badge(176, 86, 16, C.green) + chip(120, 244, "Defensible", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
          s += H("acc", R(232, 96, 140, 90, C.white, 12, `stroke="${C.orange}" stroke-width="2.6" stroke-dasharray="7 5"`) + T(302, 132, "Accepted?", 17, C.orange) + O(302, 162, 12, C.orange) + T(302, 167, "?", 14, C.white));
          s += H("sens", rep(4, (i) => person(250 + i * 34, 270, 1.1, [C.navy, C.green, C.plum, C.orange][i])) + chip(302, 222, "People's roles", { sz: 14, st: C.plum, fg: C.plum }));
          return s;
        },
        render: (c, j) => { c.in("num", j >= 0, { s: 0.6 }); c.in("acc", j === 0, { x: 30 }, { dl: 0.6 }); c.in("sens", j === 1, { y: 20 }); }
      },
      // Beat 2 · moments 2–4 · Adapted from benchmark 016 "Product Workflow Animation & UI Motion Design"
      // https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design — screens transition and active controls highlight.
      {
        from: 2, to: 4,
        draw: () => {
          let s = K("dir", desk(30, 210, 130) + person(95, 200, 1.8, C.plum) + chip(95, 270, "Front-office director", { sz: 12, bg: C.plum, st: C.plum, fg: C.white }));
          s += H("yrs", cal(20, 40, 60, 54) + T(50, 84, "Years", 12, C.red) + rep(4, (i) => star(110 + i * 22, 66, 8)));
          s += H("busy", R(190, 40, 190, 150, C.white, 12, `stroke="${C.green}" stroke-width="2.4"`) + desk(210, 130, 150) + person(250, 122, 1.2, C.green) + person(320, 122, 1.2, C.green) + `<g class="a-ring">${phone(364, 160, 1.1, C.green)}</g>` + guest(216, 114, 0.9) + T(285, 62, "Hard-working team", 13, C.green));
          s += H("scr", R(190, 30, 196, 140, C.night, 12) + R(200, 40, 176, 104, "#1e4566", 6) + T(288, 70, "Programme report", 13, "#9cc6e2") + T(288, 116, "82.0 min", 30, "#ffb59c") + T(288, 160, "310 arrivals", 12, "#cfe0f0"));
          return s;
        },
        render: (c, j) => { c.in("yrs", j >= 0 && j < 2, { y: -14 }); c.in("busy", j === 1, { x: 30 }); c.in("scr", j === 2, { s: 0.7 }); }
      },
      // Beat 3 · moments 5–7 · Adapted from benchmark 049 "Workflow Dashboard UI Motion Concept"
      // https://dribbble.com/shots/27719715-SaaS-Dashboard-Workflow-UI-Motion-Concept — cards reveal, panels reorganise, one KPI is highlighted.
      {
        from: 5, to: 7,
        draw: () => {
          let s = K("dir", person(70, 200, 1.9, C.plum));
          s += H("obj", bubble(120, 40, 260, 56, "Includes other teams' delays", { sz: 15, st: C.plum, fg: C.plum, tx: 30 }));
          s += H("cards", R(150, 130, 100, 100, C.white, 12, `stroke="${C.green}" stroke-width="2.4"`) + T(200, 186, "82.0", 22, C.green) + T(200, 212, "lobby→room", 11, C.green) + R(270, 130, 100, 100, C.white, 12, `stroke="${C.navy}" stroke-width="2.4"`) + T(320, 186, "12.4", 22, C.navy) + T(320, 212, "booking→key", 11, C.navy));
          s += H("pick", R(264, 124, 112, 112, "none", 14, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`) + F("M120 196 Q200 260 280 236", "none") + P("M110 190 Q190 270 270 236", C.plum, 2.6, 'stroke-dasharray="5 4"') + head(270, 236, -20, C.plum) + chip(320, 270, "His preference", { sz: 13, st: C.plum, fg: C.plum }));
          s += H("why", R(140, 120, 240, 120, C.white, 12, `stroke="${C.navy}" stroke-width="2.4"`) + T(260, 160, "Defensive?", 18, C.slate) + P("M196 154 H324", C.red, 3) + T(260, 206, "Or a real worry?", 17, C.navy));
          return s;
        },
        render: (c, j) => {
          c.in("obj", j >= 0, { y: -14 }); c.in("cards", j >= 0 && j < 2, { x: 30 }, { dl: 0.3 }); c.in("pick", j === 1, {});
          c.in("why", j === 2, { s: 0.7 });
        }
      },
      // Beat 4 · moments 8–10 · Adapted from benchmark 042 "Animated Sankey"
      // https://old.observablehq.com/@chekos/animated-sankey — branches reveal and link emphasis changes.
      {
        from: 8, to: 10,
        draw: () => {
          let s = H("bl", rep(3, (i) => person(60 + i * 50, 80, 1.2, C.slate)) + P("M150 96 C200 130 230 170 268 192", C.red, 3) + head(268, 192, 40, C.red) + desk(250, 210, 130) + person(315, 204, 1.4, C.green) + chip(110, 150, "Reception's fault?", { sz: 14, bg: C.red, st: C.red, fg: C.white }));
          const PARTS = [["Reception", 22, C.green], ["Revenue approval", 47, C.orange], ["Housekeeping", 13, C.navy2]];
          let y = 30, ty = 110;
          PARTS.forEach(([t, v, col], i) => { const h = v * 2.6, th = v * 98 / 82; s += H("sk" + i, R(20, y, 130, h - 4, col, 6) + T(85, y + h / 2 + 4, t, 12, C.white) + F(`M150 ${y} C225 ${y} 225 ${ty} 300 ${ty} V${ty + th} C225 ${ty + th} 225 ${y + h - 4} 150 ${y + h - 4} Z`, col, 'opacity=".35"')); y += h; ty += th; });
          s += H("tot", R(300, 110, 80, 98, C.ink, 8) + T(340, 154, "82.0", 18, C.white) + T(340, 176, "journey", 12, "#cfe0f0") + T(190, 290, "Illustrative split", 12, C.slate));
          s += H("pv", R(20, 40, 170, 180, C.white, 12, `stroke="${C.navy}" stroke-width="2.6"`) + T(105, 74, "Process", 18, C.navy) + T(105, 98, "performance", 14, C.navy) + P("M40 150 H170", C.navy, 4, 'class="a-flow"') + R(210, 40, 170, 180, C.white, 12, `stroke="${C.plum}" stroke-width="2.6"`) + T(295, 74, "Individual", 18, C.plum) + T(295, 98, "performance", 14, C.plum) + person(295, 172, 1.6, C.plum) + chip(200, 260, "Different questions", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.in("bl", j === 0, { y: 20 });
          for (let i = 0; i < 3; i++) c.in("sk" + i, j === 1, { x: -20 }, { dl: 0.15 * i });
          c.in("tot", j === 1, { x: 20 }, { dl: 0.5 });
          c.in("pv", j === 2, { s: 0.8 });
        }
      },
      // Beat 5 · moments 11–14 · Adapted from benchmark 066 "Awwwards Mubasic scroll animation"
      // https://www.awwwards.com/inspiration/scroll-animation — shapes reveal in stages as the story advances.
      {
        from: 11, to: 14,
        draw: () => {
          let s = H("lens", `<g class="a-bob">${lens(110, 130, 50, C.ink)}</g>` + rep(3, (i) => person(250 + i * 44, 150, 1.4, C.green)) + bubble(220, 50, 160, 44, "Hunting for blame?", { sz: 14, st: C.red, fg: C.red }));
          s += H("hide", R(20, 40, 360, 160, C.white, 12, `stroke="${C.slate}" stroke-width="2"`) + doc(50, 70, 50, 66, C.orange) + T(75, 156, "Workaround", 12, C.orange) + doc(170, 70, 50, 66, C.red) + T(195, 156, "Error", 12, C.red) + doc(290, 70, 50, 66, C.navy) + T(315, 156, "Delay", 12, C.navy));
          s += H("cur", R(20, 40, 360, 160, C.slate, 12) + T(200, 130, "Hidden", 22, C.white));
          s += H("ct", person(90, 190, 2.4, C.plum) + F("M210 110 L180 166 H204 L188 216 L232 146 H206 Z", C.orange) + watch(310, 160, 52, C.green) + T(310, 170, "82", 24, C.green) + chip(200, 262, "Not just technical", { sz: 16, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("vis", O(200, 150, 100, "rgba(229,183,108,.22)") + F("M200 20 L140 150 H260 Z", "rgba(229,183,108,.4)") + rep(3, (i) => person(150 + i * 50, 190, 1.4, [C.green, C.plum, C.navy][i])) + chip(80, 70, "Reputation", { sz: 13, st: C.plum, fg: C.plum }) + chip(320, 70, "Authority", { sz: 13, st: C.navy }) + chip(200, 250, "Expectations", { sz: 13, st: C.green, fg: C.green }));
          return s;
        },
        render: (c, j) => {
          c.in("lens", j === 0, { x: -30 });
          c.in("hide", j === 1, { y: 20 }); c.op("cur", j === 1 ? 0.86 : 0, { dl: 0.9 }); c.mv("cur", { sy: j === 1 ? 1 : 0.02, pv: [0, 40] }, { d: 1.2, dl: 0.9 });
          c.in("ct", j === 2, { y: 20 }); c.in("vis", j === 3, { s: 0.8 });
        }
      },
      // Beat 6 · moments 15–18 · Adapted from benchmark 023 "Celonis Process Explorer animation"
      // https://help.celonis.com/cpm46/en/process-components — cases move along the graph and pause at a node.
      {
        from: 15, to: 18,
        draw: () => {
          let s = R(10, 30, 180, 120, "#e2f0e8", 12) + T(100, 52, "Front office", 13, C.green) + R(210, 30, 180, 120, C.peach, 12) + T(300, 52, "Revenue office", 13, C.orange);
          s += node(40, 74, 110, 46, "Reception|checks", { sz: 13, st: C.green }) + node(240, 74, 120, 46, "Rate|approval", { sz: 13, st: C.orange });
          s += arrow(150, 97, 236, 97, C.slate, 3);
          s += rep(8, (i) => `<g data-k="c${i}" style="opacity:0">${O(0, 0, 7, C.orange)}</g>`);
          s += H("n", watch(300, 220, 40, C.orange) + T(300, 228, "47", 22, C.orange) + chip(110, 220, "61% of arrivals", { sz: 15, bg: C.orange, st: C.orange, fg: C.white }));
          s += H("arg", person(80, 240, 1.4, C.plum) + bubble(120, 180, 170, 44, "Not ours to fix", { sz: 15, st: C.plum, fg: C.plum }) + R(206, 26, 188, 128, "none", 14, `stroke="${C.orange}" stroke-width="3.4" class="a-pulse"`));
          s += H("hid", R(20, 170, 360, 116, "rgba(255,255,255,.97)", 12, `stroke="${C.red}" stroke-width="2.4"`) + T(40, 204, "Journey shown", 13, C.slate, "", "start") + R(150, 192, 80, 18, C.green, 4) + T(40, 250, "Journey lived", 13, C.ink, "", "start") + R(150, 238, 80, 18, C.green, 4) + R(230, 238, 130, 18, C.orange, 4) + chip(300, 204, "Wait hidden", { sz: 13, bg: C.red, st: C.red, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          for (let i = 0; i < 8; i++) { const on = j >= 0; c.op("c" + i, on && j < 3 ? 1 : 0, { dl: 0.07 * i }); c.mv("c" + i, on ? { x: 250 + (i % 4) * 26, y: 136 + Math.floor(i / 4) * 0 - (i > 3 ? 0 : 0) } : { x: 90, y: 136 }, { d: 1.3, dl: 0.07 * i }); }
          c.in("n", j === 1, { s: 0.6 }); c.in("arg", j === 2, { x: -20 }); c.in("hid", j === 3, { y: 20 });
        }
      },
      // Beat 7 · moments 19–20 · Adapted from benchmark 070 "SAP Signavio Transformation HUB"
      // https://www.signavio.com/wiki/ — a process owner, gates and an improvement loop are introduced.
      {
        from: 19, to: 20,
        draw: () => {
          let s = rep(3, (i) => R(20 + i * 124, 110, 112, 70, ["#e2f0e8", C.peach, "#e2ecf6"][i], 10) + T(76 + i * 124, 150, ["Reception", "Revenue", "Housekeeping"][i], 13, [C.green, C.orange, C.navy2][i]));
          s += H("tug", P("M30 220 H370", C.amber, 4) + person(40, 252, 1.3, C.plum) + chip(80, 280, "Department", { sz: 13, st: C.plum, fg: C.plum }) + person(360, 252, 1.3, C.navy) + chip(316, 280, "Whole journey", { sz: 13, st: C.navy }) + T(200, 206, "Tension", 15, C.red));
          s += H("own", P("M24 90 H376", C.navy, 4, 'class="a-flow"') + head(376, 90, 0, C.navy) + person(200, 60, 1.6, C.navy) + star(200, 22, 10) + chip(200, 230, "End-to-end owner", { sz: 16, bg: C.navy, st: C.navy, fg: C.white }) + P("M200 76 V108 M140 76 L76 108 M260 76 L324 108", C.navy, 2, 'stroke-dasharray="4 4"'));
          return s;
        },
        render: (c, j) => { c.in("tug", j === 0, { y: 20 }); c.in("own", j === 1, { y: -30 }); }
      },
      // Beat 8 · moments 21–24 · Adapted from benchmark 121 "Dashboard by RAKIBUZZAMAN"
      // https://lottiefiles.com/free-animation/dashboard-M05MmlnoOP — a chart fills and one metric is highlighted.
      {
        from: 21, to: 24,
        draw: () => {
          let s = H("old", R(20, 30, 200, 150, C.night, 12) + T(120, 60, "Reception KPI", 13, "#cfe0f0") + rep(5, (i) => R(40 + i * 34, 150 - [50, 60, 66, 72, 80][i], 22, [50, 60, 66, 72, 80][i], "#6fc39b", 3)) + star(200, 50, 12) + chip(120, 210, "Always looked good", { sz: 13, bg: C.green, st: C.green, fg: C.white }));
          s += H("new", R(236, 30, 150, 150, C.white, 12, `stroke="${C.orange}" stroke-width="2.4"`) + T(311, 60, "Whole journey", 13, C.orange) + T(311, 120, "82.0", 30, C.orange) + chip(311, 210, "Unsettling", { sz: 13, st: C.orange, fg: C.orange }) + person(311, 270, 1.3, C.plum));
          s += H("ndt", person(110, 140, 1.8, C.plum) + bubble(150, 60, 120, 40, "Concern", { sz: 14, st: C.plum, fg: C.plum }) + watch(300, 130, 44, C.green) + T(300, 138, "82.0", 16, C.green) + T(200, 140, "+", 26, C.ink));
          s += H("nd", R(20, 222, 170, 64, C.white, 10, `stroke="${C.red}" stroke-width="2"`) + T(105, 250, "Dismiss as", 13, C.red) + T(105, 270, "obstruction", 13, C.red) + cross(176, 236, 0.9, C.red) + R(210, 222, 170, 64, C.white, 10, `stroke="${C.red}" stroke-width="2"`) + T(295, 250, "Drop the", 13, C.red) + T(295, 270, "baseline", 13, C.red) + cross(366, 236, 0.9, C.red));
          s += H("ex", R(20, 30, 366, 186, C.white, 12, `stroke="${C.navy}" stroke-width="2.4"`) + `<g class="a-bob">${lens(90, 120, 40, C.navy)}</g>` + T(270, 100, "Definitions weak?", 15, C.navy) + T(270, 130, "Accountability unfair?", 15, C.navy) + T(270, 160, "Evidence gaps?", 15, C.navy));
          return s;
        },
        render: (c, j) => {
          c.in("old", j >= 0 && j < 3, { x: -30 }); c.op("old", j === 2 ? 0 : j >= 0 && j < 3 ? 1 : 0);
          c.in("new", j === 1, { x: 30 }); c.in("nd", j === 2, { y: 20 }); c.in("ndt", j === 2, { y: -20 }); c.in("ex", j === 3, { s: 0.8 });
        }
      },
      // Beat 9 · moments 25–28 · Adapted from benchmark 018 "Motion Graphics: Design Thinking Process"
      // https://www.behance.net/gallery/108659899/Motion-Graphics-Design-Thinking-Process — an eight-scene explainer advancing stage by stage.
      {
        from: 25, to: 28,
        draw: () => {
          let s = H("exp", person(70, 200, 1.6, C.navy) + R(130, 50, 250, 120, C.white, 12, `stroke="${C.navy}" stroke-width="2.4"`) + T(255, 84, "Department figure", 13, C.navy) + T(255, 110, "≠", 18, C.red) + T(255, 136, "Guest's journey", 13, C.orange) + chip(255, 200, "Explain the measure", { sz: 14, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("use", doc(150, 40, 100, 130, C.green, C.white, 0) + T(200, 70, "Use of data", 13, C.green) + tick(180, 104, 0.8) + T(214, 108, "Improve", 12, C.green) + cross(180, 138, 0.6, C.red) + T(214, 142, "Blame", 12, C.red) + chip(200, 200, "Said up front", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
          s += H("tr", rep(3, (i) => person(60 + i * 40, 230, 1.2, C.green)) + P("M180 220 C230 160 260 160 300 140", C.green, 3) + head(300, 140, -30, C.green) + doc(300, 90, 60, 74, C.navy) + T(330, 180, "Real model", 13, C.navy) + chip(110, 80, "Trust", { sz: 18, bg: C.green, st: C.green, fg: C.white }));
          s += H("fr", rep(3, (i) => person(60 + i * 40, 230, 1.2, C.slate)) + R(30, 150, 140, 40, C.slate, 6) + T(100, 176, "Silence", 15, C.white) + doc(260, 80, 80, 100, C.green) + tick(300, 120, 1.4) + T(300, 200, "All fine!", 15, C.green) + chip(300, 240, "Weakness hidden", { sz: 13, bg: C.red, st: C.red, fg: C.white }));
          return s;
        },
        render: (c, j) => { c.in("exp", j === 0, { y: 20 }); c.in("use", j === 1, { s: 0.6 }); c.in("tr", j === 2, { x: -20 }); c.in("fr", j === 3, { x: 20 }); }
      },
      // Beat 10 · moments 29–32 · Adapted from benchmark 054 "Animated Process Infographic with Geometric Circles and Arrows"
      // https://elements.envato.com/business-strategy-round-infographic-4-steps-templa-ZS2NQ92 — arcs reveal and progress clockwise.
      {
        from: 29, to: 32,
        draw: () => {
          let s = H("st", watch(110, 140, 60, C.green) + T(110, 150, "82", 30, C.green) + shield(170, 90, 1.2, C.green) + bubble(200, 60, 170, 44, "Objection heard", { sz: 14, st: C.plum, fg: C.plum }) + chip(110, 236, "Still valid", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
          s += H("cc", person(290, 180, 1.8, C.plum) + scale(290, 250, 0.7, C.plum) + chip(290, 110, "Concerns count", { sz: 14, bg: C.plum, st: C.plum, fg: C.white }));
          s += H("both", scale(200, 160, 2.4, C.navy) + chip(90, 230, "Measurement integrity", { sz: 13, bg: C.green, st: C.green, fg: C.white }) + chip(310, 230, "Fair accountability", { sz: 13, bg: C.plum, st: C.plum, fg: C.white }));
          s += H("nx", R(40, 40, 320, 220, C.white, 14, `stroke="${C.navy}" stroke-width="2.4"`) + T(200, 88, "Next", 15, C.navy) + T(200, 124, "Building acceptance", 19, C.green) + bubble(90, 150, 100, 40, "Explain", { sz: 13, st: C.navy }) + bubble(210, 150, 100, 40, "Involve", { sz: 13, st: C.green, fg: C.green }) + rep(4, (i) => person(130 + i * 46, 240, 1, C.green)));
          return s;
        },
        render: (c, j) => {
          c.in("st", j >= 0 && j < 2, { s: 0.7 }); c.op("st", j === 1 ? 0.35 : j === 0 ? 1 : 0);
          c.in("cc", j === 1, { x: 30 }); c.in("both", j === 2, { s: 0.6 }); c.in("nx", j === 3, { s: 0.8 });
        }
      }
    ];
    VL_SCENES[id] = makeScene({ id, N, labels, beats, back: () => backdrop("#f5f0f6", "#e8dfea", "dots"),
      desc: "Why measuring a process feels threatening: the 82.0-minute figure meets an experienced front-office director who prefers 12.4, fears blame for other teams' delays, and sees investigators as blame-hunters; staff hide workarounds; the 47-minute wait sits in the revenue office; an end-to-end owner is needed; old flattering indicators are challenged; explanation and trust balance measurement integrity with fair accountability." });
    SCENE_BG.push([id, "#f5f0f6"]);
  }

  // ============================================================
  // W8O3b · "BUILDING A BASELINE PEOPLE WILL ACCEPT"  ·  35 moments · 10 beats
  // Story: repeating 82 won't convince; start with purpose (process, not
  // people); honour promises or disclosure stops; reconcile 12.4 and 82.0
  // as different questions; share the model with frontline staff before
  // escalating; corrections tested against evidence; disclose sampling;
  // separate departmental responsibility from end-to-end ownership; agree
  // owner and preserve definitions; record disagreement; informed
  // agreement, not comfortable consensus.
  // ============================================================
  {
    const id = "W8O3b", N = 35;
    const labels = [
      "From threat to trust", "Protect the evidence", "Repeating 82 fails", "Start with purpose",
      "Process, not people", "Purpose opens doors", "Keep the promises", "Report as promised",
      "Broken promise, silence", "Three numbers again", "12.4: booking to key", "82.0: lobby to room",
      "Explain, don't declare", "Keep 12.4 for reception", "Both kept, nothing hidden", "Is the model right?",
      "Share before escalating", "Staff spot omissions", "Test each correction", "Influence accuracy, not results",
      "Show the sampling", "310 arrivals, 6 weeks", "47 minutes, 61%", "Reception's to answer?",
      "Two levels of duty", "An end-to-end owner", "All green, still slow", "Agree who owns it",
      "Freeze the definitions", "No redefined clocks", "Record disagreements", "Accurate, still disputed",
      "Informed agreement", "No personal accusation", "Concerns shape governance"
    ];
    const beats = [
      // Beat 1 · moments 0–2 · Adapted from benchmark 033 "Animated Planning Dashboard Workflow"
      // https://dribbble.com/shots/27184988-Animated-Planning-Dashboard-Workflow — panels slide and pulse as a character works.
      {
        from: 0, to: 2,
        draw: () => {
          let s = K("tbl", R(60, 200, 280, 14, "#8a6a3a", 4) + P("M90 214 V280 M310 214 V280", "#8a6a3a", 5) + person(70, 190, 1.8, C.plum) + person(330, 190, 1.8, C.navy));
          s += H("tt", P("M110 120 C170 60 230 60 290 120", C.green, 3, 'class="a-flow"') + chip(200, 50, "Threat to trust", { sz: 16, bg: C.green, st: C.green, fg: C.white }));
          s += H("pr", shield(200, 120, 2.2, C.navy) + T(200, 128, "82", 16, C.white) + chip(200, 50, "Evidence protected", { sz: 14, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("rp", bubble(210, 40, 160, 46, "82! 82! 82!", { sz: 16, st: C.navy }) + bubble(30, 70, 130, 42, "Still unfair", { sz: 14, st: C.plum, fg: C.plum }) + cross(200, 150, 2, C.red, 5));
          return s;
        },
        render: (c, j) => { c.in("tt", j === 0, { y: -14 }); c.in("pr", j === 1, { s: 0.5 }); c.in("rp", j === 2, { y: -14 }); }
      },
      // Beat 2 · moments 3–5 · Adapted from benchmark 058 "SVGator animated UI templates"
      // https://www.svgator.com/blog/animated-ui-templates-you-can-customize/ — a toggle flips between two states; a card flips.
      {
        from: 3, to: 5,
        draw: () => {
          let s = H("pur", R(40, 40, 320, 140, C.white, 14, `stroke="${C.navy}" stroke-width="2.6"`) + T(200, 76, "What it's for", 18, C.navy) + T(130, 120, "Use", 15, C.green) + tick(100, 120, 0.8) + T(280, 120, "Not for", 15, C.red) + cross(240, 116, 0.8, C.red));
          s += H("tg", R(120, 204, 160, 48, "#e3e9ef", 24) + T(100, 234, "People", 15, C.slate, "", "end") + T(300, 234, "Process", 15, C.navy, "", "start") + `<g data-k="knob">${O(146, 228, 20, C.white, `stroke="${C.navy}" stroke-width="2"`)}</g>`);
          s += H("op", rep(3, (i) => person(270 + i * 36, 270, 1.1, C.green)) + bubble(260, 196, 130, 40, "Here's a fix", { sz: 13, st: C.green, fg: C.green }) + doc(60, 196, 54, 70, C.orange) + T(87, 286, "Workarounds", 12, C.orange));
          return s;
        },
        render: (c, j) => {
          c.in("pur", j >= 0, { y: -20 }); c.op("pur", j < 0 ? 0 : j === 2 ? 0.35 : 1);
          c.in("tg", j === 1, { y: 14 }); c.mv("knob", j >= 1 ? { x: 108 } : {}, { d: 0.9, dl: 0.3, e: "back.out(1.6)" });
          c.in("op", j === 2, { y: 20 });
        }
      },
      // Beat 3 · moments 6–8 · Adapted from benchmark 072 "Stripe Connect onboarding quickstart"
      // https://docs.stripe.com/connect/onboarding/quickstart — move through verification checks to a confirmed outcome.
      {
        from: 6, to: 8,
        draw: () => {
          let s = H("pm", doc(40, 40, 140, 170, C.green, C.white, 0) + T(110, 76, "Our promise", 15, C.green) + T(110, 110, "Confidential", 13, C.navy) + T(110, 136, "Fair reading", 13, C.navy) + T(110, 162, "For improvement", 13, C.navy) + O(150, 190, 20, C.green) + tick(150, 190, 1, C.white, 3));
          s += H("rp", arrow(190, 125, 230, 125, C.ink, 3) + doc(240, 40, 140, 170, C.navy, C.white, 0) + T(310, 76, "Report", 15, C.navy) + T(310, 124, "Matches", 15, C.green) + T(310, 148, "the promise", 15, C.green) + badge(310, 182, 14, C.green));
          s += H("br", R(20, 40, 360, 170, "rgba(255,255,255,.97)", 14, `stroke="${C.red}" stroke-width="2.6"`) + doc(40, 60, 70, 90, C.red) + P("M50 60 L100 150", C.red, 4) + T(75, 176, "Promise broken", 12, C.red) + rep(3, (i) => person(190 + i * 50, 150, 1.4, C.slate)) + R(160, 166, 170, 34, C.slate, 6) + T(245, 189, "Workarounds hidden", 13, C.white));
          return s;
        },
        render: (c, j) => { c.in("pm", j >= 0, { x: -20 }); c.op("pm", j < 0 ? 0 : j === 2 ? 0 : 1); c.in("rp", j === 1, { x: 30 }); c.in("br", j === 2, { s: 0.85 }); }
      },
      // Beat 4 · moments 9–14 · Adapted from benchmark 126 "Stacked-to-grouped bars"
      // https://observablehq.com/@d3/stacked-to-grouped-bars — bars reposition between layouts while keeping identity.
      {
        from: 9, to: 14,
        draw: () => {
          let s = H("thr", watch(70, 80, 40, C.navy) + T(70, 88, "12.4", 16, C.navy) + watch(200, 80, 40, C.orange) + T(200, 88, "23", 18, C.orange) + watch(330, 80, 40, C.green) + T(330, 88, "82.0", 16, C.green));
          s += H("b12", R(20, 150, 360, 14, "#e3e9ef", 4) + R(180, 150, 80, 14, C.navy, 4) + T(180, 182, "Booking", 12, C.navy) + T(260, 182, "Key", 12, C.navy) + chip(110, 212, "12.4 min", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("b82", R(20, 240, 360, 14, C.green, 4) + T(20, 276, "Lobby", 12, C.green, "", "start") + T(380, 276, "Room", 12, C.green, "", "end") + chip(290, 212, "82.0 min", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
          s += H("ex", R(176, 144, 88, 26, "none", 6, `stroke="${C.gold}" stroke-width="3" class="a-pulse"`) + P("M220 170 V236", C.gold, 2, 'stroke-dasharray="4 4"') + chip(200, 120, "Different question", { sz: 14, bg: C.gold, st: C.amber, fg: C.ink }));
          s += H("keep", desk(40, 110, 110) + person(95, 102, 1.2, C.plum) + chip(95, 60, "Reception tool", { sz: 13, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("both", badge(370, 212, 14, C.green) + badge(30, 212, 14, C.green) + chip(200, 290, "Nothing excluded", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
          return s;
        },
        render: (c, j) => {
          c.in("thr", j === 0, { y: -20 });
          c.in("b12", j >= 1, { x: -30 }); c.in("b82", j >= 2, { x: 30 }); c.in("ex", j >= 3 && j < 4, { s: 0.7 });
          c.in("keep", j >= 4, { y: -20 }); c.in("both", j === 5, { s: 0.6 });
        }
      },
      // Beat 5 · moments 15–19 · Adapted from benchmark 034 "SaaS Platform & Workflow Motion"
      // https://dribbble.com/shots/27719724-SaaS-Platform-Workflow-Motion-UI-Concept — cards transition between states and the hierarchy reflows.
      {
        from: 15, to: 19,
        draw: () => {
          let s = K("mdl", R(120, 30, 160, 110, C.white, 12, `stroke="${C.navy}" stroke-width="2.6"`) + T(200, 56, "As-is model", 14, C.navy) + node(136, 70, 54, 32, "Check", { sz: 11 }) + node(210, 70, 54, 32, "Rate", { sz: 11 }) + arrow(190, 86, 206, 86, C.slate, 2) + O(200, 124, 6, C.slate));
          s += H("q", O(296, 40, 16, C.orange) + T(296, 46, "?", 16, C.white) + rep(3, (i) => person(130 + i * 70, 240, 1.4, C.green)) + chip(200, 184, "Recognisable?", { sz: 14, st: C.orange, fg: C.orange }));
          s += H("sh", rep(3, (i) => person(60 + i * 46, 260, 1.4, C.green)) + P("M200 140 C190 190 160 200 130 220", C.green, 3) + head(130, 220, 140, C.green) + person(320, 260, 1.4, C.plum) + star(320, 220, 8) + P("M270 250 H300", C.slate, 2, 'stroke-dasharray="3 3"') + T(320, 196, "Later", 13, C.slate));
          s += H("cr", bubble(20, 160, 110, 40, "Missing step", { sz: 12, st: C.orange, fg: C.orange }) + bubble(146, 160, 110, 40, "Exception", { sz: 12, st: C.orange, fg: C.orange }) + bubble(272, 160, 110, 40, "Needed check", { sz: 12, st: C.orange, fg: C.orange }));
          s += H("tst", R(20, 150, 360, 140, C.white, 12, `stroke="${C.navy}" stroke-width="2.4"`) + lens(60, 190, 18, C.navy) + T(100, 196, "Check evidence", 14, C.navy, "", "start") + chip(110, 252, "Supported: add", { sz: 13, bg: C.green, st: C.green, fg: C.white }) + chip(290, 252, "Not: explain why", { sz: 13, st: C.orange, fg: C.orange }));
          s += H("acc", R(20, 160, 170, 100, C.mint, 12, `stroke="${C.green}" stroke-width="2.4"`) + T(105, 200, "Influence", 15, C.green) + T(105, 224, "accuracy", 15, C.green) + R(210, 160, 170, 100, C.white, 12, `stroke="${C.red}" stroke-width="2.4"`) + T(295, 200, "Control", 15, C.red) + T(295, 224, "conclusions", 15, C.red) + cross(370, 172, 0.8, C.red));
          return s;
        },
        render: (c, j) => {
          c.mv("mdl", j >= 2 ? { s: 0.92 } : {});
          c.in("q", j === 0, { y: 20 }); c.in("sh", j === 1, { y: 20 }); c.in("cr", j === 2, { y: 20 }); c.in("tst", j === 3, { y: 20 }); c.in("acc", j === 4, { y: 20 });
          c.mv("mdl", j === 2 ? { y: 0 } : {});
        }
      },
      // Beat 6 · moments 20–22 · Adapted from benchmark 040 "Animated treemap"
      // https://observablehq.com/@d3/animated-treemap — blocks resize within a stable layout.
      {
        from: 20, to: 22,
        draw: () => {
          let s = H("smp", R(20, 30, 360, 160, C.white, 12, `stroke="${C.navy}" stroke-width="2.4"`) + T(200, 56, "How we sampled", 15, C.navy) + rep(14, (i) => R(40 + (i % 7) * 46, 72 + Math.floor(i / 7) * 54, 40, 46, [C.navy2, C.green, C.plum, C.orange][i % 4], 6, 'opacity=".75"')));
          s += H("nm", chip(80, 220, "310 arrivals", { sz: 14, bg: C.navy, st: C.navy, fg: C.white }) + chip(200, 220, "14 hotels", { sz: 14, bg: C.green, st: C.green, fg: C.white }) + chip(320, 220, "6 weeks", { sz: 14, bg: C.plum, st: C.plum, fg: C.white }) + chip(200, 268, "Lobby to room", { sz: 13, st: C.navy }));
          s += H("ap", R(20, 30, 360, 160, C.white, 12, `stroke="${C.orange}" stroke-width="2.4"`) + R(40, 50, 196, 120, C.orange, 8) + T(138, 116, "61% wait", 20, C.white) + R(240, 50, 120, 120, C.slate, 8, 'opacity=".5"') + T(300, 116, "39%", 16, C.white) + watch(200, 252, 30, C.orange) + T(200, 258, "47", 15, C.orange));
          return s;
        },
        render: (c, j) => { c.in("smp", j <= 1 && j >= 0, { y: -14 }); c.op("smp", j === 2 ? 0 : j >= 0 ? 1 : 0); c.in("nm", j === 1, { y: 20 }); c.in("ap", j === 2, { s: 0.85 }); }
      },
      // Beat 7 · moments 23–26 · Adapted from benchmark 031 "Supply chain design animation"
      // https://www.behance.net/gallery/7392601/Supply-chain-design-animation — sites reveal on a grid, links calculate, networks overlay.
      {
        from: 23, to: 26,
        draw: () => {
          let s = rep(3, (i) => R(20 + i * 124, 120, 112, 70, ["#e2f0e8", C.peach, "#e2ecf6"][i], 10) + T(76 + i * 124, 160, ["Reception", "Revenue", "Housekeeping"][i], 13, [C.green, C.orange, C.navy2][i]));
          s += H("q", person(76, 250, 1.4, C.plum) + bubble(110, 220, 220, 44, "Revenue's wait, our score?", { sz: 13, st: C.plum, fg: C.plum }) + R(140, 116, 120, 78, "none", 12, `stroke="${C.orange}" stroke-width="3" class="a-pulse"`));
          s += H("lv", rep(3, (i) => chip(76 + i * 124, 210, "Own activities", { sz: 11, st: [C.green, C.orange, C.navy2][i], fg: [C.green, C.orange, C.navy2][i] })) + P("M24 70 H376", C.navy, 4) + head(376, 70, 0, C.navy) + T(80, 56, "Whole outcome", 14, C.navy));
          s += H("ow", person(200, 46, 1.6, C.navy) + star(200, 10, 9) + P("M200 62 V116 M140 62 L76 116 M260 62 L324 116", C.navy, 2, 'stroke-dasharray="4 4"') + chip(200, 260, "Coordinates, doesn't control", { sz: 13, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("gr", rep(3, (i) => O(76 + i * 124, 100, 12, C.green) + tick(76 + i * 124, 100, 0.6, C.white, 2)) + R(20, 230, 360, 50, C.white, 10, `stroke="${C.red}" stroke-width="2.4"`) + `<g class="a-walk">${guest(52, 266, 1)}</g>` + clock(100, 256, 12, C.red) + T(260, 262, "Guest still waits", 16, C.red));
          return s;
        },
        render: (c, j) => { c.in("q", j === 0, { y: 20 }); c.in("lv", j >= 1, { y: 14 }); c.in("ow", j === 2, { y: -30 }); c.in("gr", j === 3, { y: 20 }); c.op("lv", j === 3 ? 0 : j >= 1 ? 1 : 0); }
      },
      // Beat 8 · moments 27–29 · Adapted from benchmark 137 "Corporate Timeline by HenlyFx"
      // https://motionarray.com/after-effects-templates/corporate-timeline-1939632/ — events reveal one by one with text transitions.
      {
        from: 27, to: 29,
        draw: () => {
          let s = H("ag", doc(120, 30, 160, 180, C.navy, C.white, 0) + T(200, 62, "Baseline agreement", 14, C.navy) + T(150, 100, "Owner:", 13, C.ink, "", "start") + person(240, 104, 0.8, C.navy) + T(150, 132, "Departments:", 13, C.ink, "", "start") + rep(3, (i) => O(150 + i * 22, 150, 8, [C.green, C.orange, C.navy2][i])));
          s += H("df", lock(310, 160, 1.6, C.green) + T(150, 182, "Definitions", 13, C.green, "", "start") + chip(200, 250, "Frozen for later", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
          s += H("nr", R(20, 30, 360, 230, "rgba(255,255,255,.97)", 14, `stroke="${C.red}" stroke-width="2.4"`) + watch(100, 120, 40, C.green) + T(100, 128, "82", 16, C.green) + arrow(150, 120, 200, 120, C.ink, 3) + watch(260, 120, 40, C.navy) + T(260, 128, "12?", 16, C.navy) + P("M220 70 L300 170", C.red, 5) + chip(200, 216, "Same clock after", { sz: 15, bg: C.red, st: C.red, fg: C.white }));
          return s;
        },
        render: (c, j) => { c.in("ag", j >= 0 && j < 2, { y: -20 }); c.in("df", j === 1, { s: 0.6 }); c.in("nr", j === 2, { s: 0.85 }); }
      },
      // Beat 9 · moments 30–32 · Adapted from benchmark 067 "Idea Flow Animation | Infographic Motion Design"
      // https://www.behance.net/gallery/247762027/Idea-Flow-Animation-Infographic-Motion-Design — orbiting ideas connect into one structure.
      {
        from: 30, to: 32,
        draw: () => {
          let s = H("rec", doc(40, 40, 150, 190, C.slate, C.white, 0) + T(115, 70, "Disagreements", 14, C.slate) + T(115, 92, "recorded", 13, C.slate) + rep(3, (i) => P(`M60 ${120 + i * 26} H170`, C.muted, 2)) + O(170, 200, 12, C.orange) + T(170, 205, "!", 13, C.white));
          s += H("acc", watch(290, 120, 50, C.green) + T(290, 130, "82.0", 18, C.green) + badge(334, 78, 14, C.green) + chip(290, 196, "Accurate", { sz: 14, bg: C.green, st: C.green, fg: C.white }) + bubble(220, 220, 160, 40, "Best fix? Debated", { sz: 13, st: C.plum, fg: C.plum }));
          s += H("orb", O(200, 150, 90, "none", `stroke="${C.navy}" stroke-width="2" stroke-dasharray="5 6" class="a-spin"`) + chip(200, 50, "Evidence", { sz: 14, bg: C.navy, st: C.navy, fg: C.white }) + chip(96, 200, "Boundaries", { sz: 14, bg: C.green, st: C.green, fg: C.white }) + chip(304, 200, "Ownership", { sz: 14, bg: C.plum, st: C.plum, fg: C.white }) + O(200, 150, 34, C.gold) + tick(200, 150, 1.4, C.ink, 4) + chip(200, 280, "Informed agreement", { sz: 15, st: C.navy }));
          return s;
        },
        render: (c, j) => { c.in("rec", j >= 0 && j < 2, { x: -20 }); c.in("acc", j === 1, { x: 20 }); c.in("orb", j === 2, { s: 0.6 }); }
      },
      // Beat 10 · moments 33–34 · Adapted from benchmark 086 "Workflow by a"
      // https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm — teamwork: workers revealed performing workflow actions together.
      {
        from: 33, to: 34,
        draw: () => {
          let s = H("na", rep(4, (i) => person(80 + i * 80, 200, 1.6, [C.green, C.plum, C.navy, C.orange][i])) + `<g class="a-bob">${lens(200, 90, 34, C.navy)}</g>` + chip(200, 268, "Finding, not accusation", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("gv", R(40, 30, 320, 230, C.white, 14, `stroke="${C.plum}" stroke-width="2.4"`) + T(200, 62, "Fair governance", 17, C.plum) + person(110, 140, 1.6, C.plum) + bubble(150, 84, 120, 36, "Concern", { sz: 12, st: C.plum, fg: C.plum }) + arrow(160, 160, 220, 160, C.ink, 3) + doc(240, 100, 90, 110, C.green, C.white, 0) + T(285, 140, "Roles", 12, C.green) + T(285, 162, "Rules", 12, C.green) + T(285, 184, "Review", 12, C.green) + chip(200, 236, "Guest stays visible", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
          return s;
        },
        render: (c, j) => { c.in("na", j === 0, { y: 20 }); c.in("gv", j === 1, { s: 0.85 }); }
      }
    ];
    VL_SCENES[id] = makeScene({ id, N, labels, beats, back: () => backdrop("#eef4f1", "#dde9e2"),
      desc: "Building a baseline people will accept: purpose stated up front, promises kept so staff keep disclosing, 12.4 and 82.0 reconciled as answers to different questions, the model shared with frontline staff and corrections tested against evidence, sampling disclosed, departmental duty separated from end-to-end ownership, definitions frozen, disagreements recorded, and informed agreement replacing comfortable consensus." });
    SCENE_BG.push([id, "#eef4f1"]);
  }

  // ============================================================
  // W8O3c · "THE DECISION, THE FORUM AND THE NEXT PHASE"  ·  35 moments · 10 beats
  // Story: the sponsor's review; 12.4 vs 82.0 vs 23 in their places; the
  // decision (82.0 subject to validation) without blaming reception; an
  // end-to-end owner for the 47-minute dependency; the five Understand
  // outputs packed for handover; why they matter together; honesty about
  // open questions; the forum "Whose Number Is Right"; post, then
  // challenge two classmates; the separate Virtual Lab; the bridge to
  // Innovate and a defensible starting point.
  // ============================================================
  {
    const id = "W8O3c", N = 35;
    const labels = [
      "Building trust done", "Evidence into decision", "The sponsor's review", "Director prefers 12.4",
      "82.0 covers 310", "Both legitimate", "23 stays valuable", "Support 82.0",
      "Not reception's blame", "End-to-end ownership", "47 minutes, 61%", "Concerns shape roles",
      "What we carry forward", "Validated as-is model", "Quantified baseline", "Root cause analysis",
      "Exceptions and volumes", "Potential quick wins", "Not yet implemented", "Outputs work together",
      "Avoid the wrong fix", "Name open questions", "Honesty helps Innovate", "Your self-paced activity",
      "Whose Number Is Right?", "Defend the measure", "Boundaries, evidence, consequences", "Engage two classmates",
      "Survive scrutiny", "Virtual Lab, separately", "Judgement, not terms", "On to Innovate",
      "Today, then better", "No improvement claimed", "A defensible start"
    ];
    const beats = [
      // Beat 1 · moments 0–2 · Adapted from benchmark 024 "Celonis Process Explorer map"
      // https://help.celonis.com/cpm47/en/process-explorer — activity nodes expand, edges thicken, metric switches.
      {
        from: 0, to: 2,
        draw: () => {
          let s = H("rec", rep(5, (i) => O(60 + i * 70, 110, 22, [C.navy, C.green, C.orange, C.plum, C.navy2][i]) + (i < 4 ? P(`M${82 + i * 70} 110 H${108 + i * 70}`, C.slate, 3) : "")) + badge(340, 70, 14, C.green) + chip(200, 180, "Trust built", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
          s += H("fun", F("M60 60 H340 L240 170 V230 H160 V170 Z", "#e2ecf6", `stroke="${C.navy}" stroke-width="2.4"`) + rep(6, (i) => doc(90 + i * 40, 76, 26, 32, [C.navy, C.green, C.orange, C.plum, C.navy2, C.slate][i])) + O(200, 268, 22, C.gold) + tick(200, 268, 1.1, C.ink, 3.4) + T(270, 274, "Decision", 15, C.ink, "", "start"));
          s += H("rv", R(40, 150, 320, 16, "#8a6a3a", 4) + person(80, 140, 1.8, C.plum) + star(80, 84, 10) + chip(80, 210, "Sponsor", { sz: 13, bg: C.plum, st: C.plum, fg: C.white }) + person(320, 140, 1.8, C.navy) + chip(320, 210, "Director", { sz: 13, bg: C.navy, st: C.navy, fg: C.white }) + doc(170, 90, 60, 50, C.green) + chip(200, 50, "Ready to explain?", { sz: 14, st: C.orange, fg: C.orange }));
          return s;
        },
        render: (c, j) => { c.in("rec", j === 0, { y: -14 }); c.in("fun", j === 1, { y: -20 }); c.in("rv", j === 2, { y: 20 }); }
      },
      // Beat 2 · moments 3–6 · Adapted from benchmark 120 "Animated Dashboards"
      // https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ — dashboard panels transition one to the next.
      {
        from: 3, to: 6,
        draw: () => {
          let s = H("p12", R(20, 40, 112, 150, C.white, 12, `stroke="${C.navy}" stroke-width="2.6"`) + watch(76, 100, 34, C.navy) + T(76, 108, "12.4", 15, C.navy) + T(76, 156, "Booking", 12, C.navy) + T(76, 172, "to key", 12, C.navy));
          s += H("p82", R(144, 40, 112, 150, C.white, 12, `stroke="${C.green}" stroke-width="2.6"`) + watch(200, 100, 34, C.green) + T(200, 108, "82.0", 15, C.green) + T(200, 156, "310 arrivals", 12, C.green) + T(200, 172, "lobby to room", 12, C.green));
          s += H("p23", R(268, 40, 112, 150, C.white, 12, `stroke="${C.orange}" stroke-width="2.6"`) + watch(324, 100, 34, C.orange) + T(324, 108, "23", 17, C.orange) + T(324, 156, "One traveller", 12, C.orange) + T(324, 172, "reception", 12, C.orange));
          s += H("pd", person(76, 260, 1.4, C.navy) + bubble(110, 220, 120, 36, "I prefer 12.4", { sz: 12, st: C.navy }));
          s += H("fit", R(140, 36, 120, 158, "none", 14, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`) + chip(200, 236, "Fits the objective", { sz: 14, bg: C.green, st: C.green, fg: C.white }) + badge(76, 214, 11, C.green) + badge(324, 214, 11, C.green));
          s += H("st", chip(324, 270, "Story, not baseline", { sz: 12, st: C.orange, fg: C.orange }));
          return s;
        },
        render: (c, j) => {
          c.in("p12", j >= 0, { y: 20 }); c.in("pd", j === 0, { y: 20 });
          c.in("p82", j >= 1, { y: 20 }); c.in("fit", j === 2 || j === 3, {}); c.in("p23", j >= 3, { y: 20 });
          c.in("st", j === 3, { y: 10 });
        }
      },
      // Beat 3 · moments 7–8 · Adapted from benchmark 094 "Process — Success"
      // https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP — an activity transforms into a confirming check.
      {
        from: 7, to: 8,
        draw: () => {
          let s = H("dec", O(200, 120, 70, C.green) + T(200, 116, "82.0", 30, C.white) + T(200, 144, "minutes", 13, C.mint) + chip(200, 222, "Subject to validation", { sz: 15, st: C.green, fg: C.green }) + person(56, 110, 1.4, C.plum) + star(56, 66, 8));
          s += H("nb", desk(250, 210, 120) + person(310, 202, 1.4, C.green) + O(310, 140, 26, C.white, `stroke="${C.green}" stroke-width="3"`) + shield(310, 140, 1, C.green) + chip(310, 270, "Not every delay", { sz: 13, bg: C.green, st: C.green, fg: C.white }));
          return s;
        },
        render: (c, j) => { c.in("dec", j >= 0, { s: 0.4 }, { e: "back.out(1.6)" }); c.mv("dec", j === 1 ? { x: -60, s: 0.8 } : {}); c.in("nb", j === 1, { x: 40 }); }
      },
      // Beat 4 · moments 9–11 · Adapted from benchmark 092 "process connecting"
      // https://lottiefiles.com/free-animation/process-fmpDUgNx8K — connections draw and join.
      {
        from: 9, to: 11,
        draw: () => {
          let s = rep(3, (i) => R(20 + i * 124, 150, 112, 64, ["#e2f0e8", C.peach, "#e2ecf6"][i], 10) + T(76 + i * 124, 188, ["Reception", "Revenue", "Housekeeping"][i], 13, [C.green, C.orange, C.navy2][i]));
          s += person(200, 70, 1.6, C.navy) + star(200, 34, 9) + T(226, 64, "End-to-end owner", 13, C.navy, "", "start");
          s += D("w0", "M200 86 C200 120 76 120 76 150", C.navy, 2.6) + D("w1", "M200 86 V150", C.navy, 2.6) + D("w2", "M200 86 C200 120 324 120 324 150", C.navy, 2.6);
          s += H("ap", watch(200, 252, 30, C.orange) + T(200, 258, "47", 15, C.orange) + chip(80, 254, "61% of arrivals", { sz: 13, bg: C.orange, st: C.orange, fg: C.white }) + R(140, 146, 120, 72, "none", 12, `stroke="${C.orange}" stroke-width="3" class="a-pulse"`));
          s += H("cn", bubble(250, 236, 140, 44, "Fair roles", { sz: 14, st: C.plum, fg: C.plum }) + lock(40, 254, 1.2, C.green) + T(60, 286, "Measure fixed", 12, C.green, "", "start"));
          return s;
        },
        render: (c, j) => { for (let i = 0; i < 3; i++) c.dr("w" + i, j >= 0 ? 1 : 0, { dl: 0.2 * i }); c.in("ap", j === 1, { y: 20 }); c.in("cn", j === 2, { y: 20 }); }
      },
      // Beat 5 · moments 12–18 · Adapted from benchmark 100 "3D Statistics Factory"
      // https://lottiefiles.com/free-animation/3d-statistics-factory-lRiHNeU9Y4 — isometric equipment staged, output emerging.
      {
        from: 12, to: 18,
        draw: () => {
          let s = K("case", F("M70 180 L200 150 L330 180 L200 210 Z", "#cfdbe7") + F("M70 180 V262 L200 294 V210 Z", "#9fb4c8") + F("M330 180 V262 L200 294 V210 Z", "#7f97ad") + T(200, 186, "Handover kit", 14, C.navy));
          const IT = [["As-is model", C.navy, 100, 34], ["Baseline 82.0", C.green, 300, 34], ["Root causes", C.orange, 100, 80], ["Exceptions", C.plum, 300, 80], ["Quick wins?", C.amber, 200, 124]];
          IT.forEach(([t, col, x, y], i) => { s += H("it" + i, chip(x, y, t, { sz: 15, bg: col, st: col, fg: C.white })); });
          s += H("nyi", `<g transform="rotate(-6 200 240)">${R(80, 218, 240, 44, "rgba(255,255,255,.97)", 8, `stroke="${C.red}" stroke-width="3"`)}${T(200, 248, "Not implemented yet", 17, C.red)}</g>`);
          s += H("q", O(200, 84, 26, C.orange) + T(200, 93, "?", 24, C.white) + T(200, 44, "Before redesign", 15, C.orange));
          return s;
        },
        render: (c, j) => {
          c.in("q", j === 0, { s: 0.5 });
          for (let i = 0; i < 5; i++) { const on = j >= i + 1; c.op("it" + i, on ? 1 : 0); c.mv("it" + i, on ? (j === i + 1 ? { s: 1.1 } : {}) : { y: 60 }, { d: 0.9, e: "back.out(1.4)" }); }
          c.in("nyi", j === 6, { s: 1.5 }, { e: "back.out(1.4)" });
        }
      },
      // Beat 6 · moments 19–22 · Adapted from benchmark 090 "Multi-Step Icon Animation"
      // https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU — steps activate one after another, connectors traced.
      {
        from: 19, to: 22,
        draw: () => {
          let s = H("tg", node(20, 60, 160, 60, "Process|description", { sz: 14, st: C.navy }) + T(200, 98, "+", 26, C.ink) + node(220, 60, 160, 60, "Performance|explanation", { sz: 14, st: C.green }) + arrow(200, 130, 200, 170, C.ink, 3) + chip(200, 196, "Defensible redesign", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("wf", desk(30, 230, 110) + person(85, 222, 1.3, C.green) + T(85, 286, "Faster desk", 13, C.green) + clock(250, 250, 22, C.red) + T(320, 256, "Wait stays", 15, C.red));
          s += H("oq", R(20, 40, 360, 180, C.white, 12, `stroke="${C.navy}" stroke-width="2.4"`) + T(200, 72, "Findings", 15, C.navy) + tick(50, 104, 0.8) + T(70, 108, "Supported", 13, C.green, "", "start") + O(50, 144, 10, C.orange) + T(50, 148, "?", 12, C.white) + T(70, 148, "Open questions", 13, C.orange, "", "start") + R(220, 90, 140, 70, C.peach, 8) + T(290, 132, "Not certain yet", 13, C.orange));
          s += H("hn", P("M30 250 H370", C.green, 4) + head(370, 250, 0, C.green) + chip(110, 250, "Honest findings", { sz: 13, bg: C.white, st: C.green, fg: C.green }) + chip(290, 250, "Better tests", { sz: 13, bg: C.green, st: C.green, fg: C.white }));
          return s;
        },
        render: (c, j) => { c.in("tg", j === 0 || j === 1, { y: -20 }); c.op("tg", j === 1 ? 0.35 : j === 0 ? 1 : 0); c.in("wf", j === 1, { y: 20 }); c.in("oq", j >= 2, { y: -20 }); c.in("hn", j === 3, { y: 20 }); }
      },
      // Beat 7 · moments 23–26 · Adapted from benchmark 081 "Clean Workflow Visualization with Motion Graphics"
      // https://dribbble.com/shots/27600376-Clean-Workflow-Visualization-with-Motion-Graphics — journey steps connected by transitions.
      {
        from: 23, to: 26,
        draw: () => {
          let s = H("lap", R(80, 40, 240, 150, C.night, 12) + R(92, 52, 216, 126, "#e9eef4", 6) + R(60, 190, 280, 12, "#5d7389", 4) + T(200, 86, "Self-paced", 14, C.navy) + T(200, 112, "learning activity", 14, C.navy) + rep(3, (i) => R(110 + i * 64, 130, 52, 34, [C.navy2, C.green, C.plum][i], 4, 'opacity=".7"')));
          s += H("fr", R(20, 30, 360, 60, C.navy, 12) + T(200, 68, "Whose Number Is Right?", 19, C.white) + rep(3, (i) => watch(80 + i * 120, 150, 34, [C.navy, C.green, C.orange][i]) + T(80 + i * 120, 158, "?", 18, [C.navy, C.green, C.orange][i])) + "") + H("fru", chip(200, 222, "Unfamiliar case", { sz: 14, st: C.navy }));
          s += H("df", R(20, 220, 360, 66, C.white, 12, `stroke="${C.green}" stroke-width="2.4"`) + doc(36, 230, 34, 44, C.navy) + T(100, 258, "Exhibit", 13, C.navy, "", "start") + arrow(170, 252, 210, 252, C.ink, 2.4) + shield(240, 252, 1.1, C.green) + T(262, 258, "Defend one", 13, C.green, "", "start"));
          s += H("bc", R(20, 220, 360, 66, C.white, 12, `stroke="${C.navy}" stroke-width="2.4"`) + chip(84, 253, "Boundaries", { sz: 13, bg: C.navy, st: C.navy, fg: C.white }) + chip(200, 253, "Evidence", { sz: 13, bg: C.green, st: C.green, fg: C.white }) + chip(316, 253, "Consequences", { sz: 13, bg: C.orange, st: C.orange, fg: C.white }));
          return s;
        },
        render: (c, j) => { c.in("lap", j === 0, { y: 20 }); c.in("fr", j >= 1, { y: -20 }); c.in("df", j === 2, { y: 20 }); c.in("bc", j === 3, { y: 20 }); c.op("fru", j === 1 ? 1 : 0); }
      },
      // Beat 8 · moments 27–28 · Adapted from benchmark 109 "teamwork"
      // https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6 — people join one by one to form a team.
      {
        from: 27, to: 28,
        draw: () => {
          let s = person(200, 220, 1.8, C.navy2) + T(200, 268, "Your post", 13, C.navy2);
          s += H("c0", person(70, 140, 1.4, C.green) + bubble(20, 54, 130, 40, "Challenge", { sz: 13, st: C.green, fg: C.green }) + P("M100 150 C140 170 160 190 176 200", C.green, 2.4, 'stroke-dasharray="4 4" class="a-flow"'));
          s += H("c1", person(330, 140, 1.4, C.plum) + bubble(250, 54, 130, 40, "Extend", { sz: 13, st: C.plum, fg: C.plum }) + P("M300 150 C260 170 240 190 224 200", C.plum, 2.4, 'stroke-dasharray="4 4" class="a-flow"'));
          s += H("t2", chip(200, 34, "At least two", { sz: 15, bg: C.navy, st: C.navy, fg: C.white }));
          s += H("sv", shield(200, 140, 2, C.green) + chip(200, 34, "Survives scrutiny", { sz: 15, bg: C.green, st: C.green, fg: C.white }) + rep(4, (i) => P(`M${120 + (i % 2) * 160} ${100 + Math.floor(i / 2) * 60} l${i % 2 ? -14 : 14} 10`, C.slate, 2.4)));
          return s;
        },
        render: (c, j) => { c.in("c0", j >= 0, { x: -30 }); c.in("c1", j >= 0, { x: 30 }, { dl: 0.3 }); c.in("t2", j === 0, { y: -14 }); c.in("sv", j === 1, { s: 0.5 }); }
      },
      // Beat 9 · moments 29–30 · Adapted from benchmark 123 "DashBoard by Amit Prajapati"
      // https://lottiefiles.com/free-animation/dashboard-krY5yHjJRp — a dashboard screen comes into focus.
      {
        from: 29, to: 30,
        draw: () => {
          let s = H("vl", R(40, 30, 320, 170, C.night, 12) + R(52, 42, 296, 146, "#1e3448", 6) + T(200, 82, "Virtual Lab", 22, "#cfe0f0") + T(200, 112, "Assessment", 14, "#9cc6e2") + chip(200, 150, "Moodle instructions", { sz: 13, bg: "#1e3448", st: "#9cc6e2", fg: "#cfe0f0" }) + R(170, 200, 60, 14, "#5d7389", 3) + R(130, 214, 140, 8, "#5d7389", 3));
          s += H("sep", R(20, 244, 170, 46, C.white, 10, `stroke="${C.slate}" stroke-width="2" stroke-dasharray="5 4"`) + T(105, 273, "Formative practice", 13, C.slate) + P("M200 248 V286", C.red, 3) + R(210, 244, 170, 46, C.navy, 10) + T(295, 273, "Separate", 14, C.white));
          s += H("jd", R(20, 236, 360, 56, C.white, 12, `stroke="${C.green}" stroke-width="2.4"`) + T(110, 270, "Repeat terms", 14, C.slate) + P("M60 266 H160", C.red, 3) + T(290, 270, "Show judgement", 15, C.green) + badge(370, 246, 10, C.green));
          return s;
        },
        render: (c, j) => { c.in("vl", j >= 0, { s: 0.8 }); c.in("sep", j === 0, { y: 20 }); c.in("jd", j === 1, { y: 20 }); }
      },
      // Beat 10 · moments 31–34 · Adapted from benchmark 136 "Project TimeLine"
      // https://motionarray.com/after-effects-templates/project-timeline-2424919/ — the view advances along time markers.
      {
        from: 31, to: 34,
        draw: () => {
          const L = ["Understand", "Innovate", "Implement", "Realize Value"], X = [60, 160, 260, 350];
          let s = P("M30 170 H380", C.slate, 4);
          L.forEach((t, i) => { s += O(X[i], 170, 12, i === 0 ? C.green : C.white, `stroke="${[C.green, C.navy, C.navy, C.plum][i]}" stroke-width="3"`) + T(X[i], 204, t, 12, [C.green, C.navy, C.navy, C.plum][i]); });
          s += K("gst", `<g class="a-walk">${guest(0, 0, 1.3)}</g>`);
          s += H("tg", chip(110, 60, "What happens today", { sz: 13, bg: C.green, st: C.green, fg: C.white }) + chip(290, 60, "How it could improve", { sz: 13, st: C.navy }) + P("M110 76 L60 150 M290 76 L160 150", C.slate, 2, 'stroke-dasharray="4 4"'));
          s += H("nc", `<g transform="rotate(-5 200 260)">${R(70, 236, 260, 46, "rgba(255,255,255,.97)", 8, `stroke="${C.red}" stroke-width="3"`)}${T(200, 266, "No improvement yet", 17, C.red)}</g>`);
          s += H("ds", P("M60 120 V250", C.green, 4) + F("M60 120 L96 132 L60 144 Z", C.green) + watch(200, 260, 30, C.green) + T(200, 266, "82.0", 13, C.green) + chip(310, 260, "Defensible start", { sz: 15, bg: C.green, st: C.green, fg: C.white }) + chip(250, 110, "Future results judged here", { sz: 12, st: C.green, fg: C.green }));
          return s;
        },
        render: (c, j) => {
          c.in("tg", j === 1, { y: -14 }); c.in("nc", j === 2, { s: 1.5 }, { e: "back.out(1.4)" }); c.in("ds", j === 3, { y: 20 });
          c.mv("gst", { x: j === 3 ? 110 : j >= 1 ? 160 : 60, y: 140 }, { d: 1.4 });
        }
      }
    ];
    VL_SCENES[id] = makeScene({ id, N, labels, beats, back: () => backdrop("#f1f3f7", "#e2e7ef"),
      desc: "The decision, the forum and the next phase: the sponsor's review places 12.4, 82.0 and 23 in their roles, supports 82.0 subject to validation without blaming reception, links an end-to-end owner to the 47-minute dependency, packs five Understand outputs with quick wins marked not implemented, keeps open questions honest, introduces the Whose Number Is Right forum and the separate Virtual Lab, and walks the guest on to Innovate from a defensible starting point." });
    SCENE_BG.push([id, "#f1f3f7"]);
  }

  addStyles(SCENE_BG);
})();

