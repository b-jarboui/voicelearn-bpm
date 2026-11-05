// OPER621 · Week 10 · The People Phase — animated teaching scenes (round 2, Claude)
// File: w10-claude-part1.js  ·  Lesson 1 · The design is not the work  ·  Scenes: W10O1a, W10O1b, W10O1c
// Standalone part: loads AFTER the older Week 10 scene file and re-registers the same
// section ids so these scenes override it. Registers VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
// and appends its scoped rules (.vls-w10-<secId>) into the single shared <style id="vl-sc-w10">.
// Uses window.gsap when present (CSS transitions otherwise); honours prefers-reduced-motion.
// Every visual names the benchmark template it adapts, with its URL, in a code comment.
(() => {
"use strict";
// ================================================================
// Shared engine (self-contained copy in every part file).
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
// i = narration moment index (0-based), n = number of narration moments.
// Each scene is a sequence of 8-12 distinct VISUALS ("panels"); every panel
// covers 2-5 narration moments and re-stages itself at each moment so the
// figure always shows what the current narration line says.
// ================================================================
window.VL_SCENES = window.VL_SCENES || {};
const VL_SCENES = window.VL_SCENES;
const PART = "p1";
const C = {
  navy: "#1f4e79", navy2: "#2d6a9f", orange: "#c0502a", paper: "#fbf8f1",
  ink: "#1b2a3a", blue: "#dbe7f2", green: "#317c61", gold: "#e5b76c",
  muted: "#91aabd", plum: "#6b4e8a", sand: "#efe4cf", sky: "#eaf2f8",
  red: "#b0362b", white: "#ffffff", mint: "#e1f0e8", peach: "#f8e3d8",
  lilac: "#ece6f3", slate: "#5d7389", night: "#14263a", amber: "#a8741a",
  teal: "#2a7f8f", cream: "#fffaf0", grey: "#c5ced8", wall: "#efe7d8"
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
const inR = (k, a, b) => k >= a && k <= b;
// ---- SVG string builders ----
const R = (x, y, w, h, f, rx = 0, ex = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${ex}/>`;
const O = (cx, cy, r, f, ex = "") => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${ex}/>`;
const E = (cx, cy, rx, ry, f, ex = "") => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${ex}/>`;
const P = (d, s, w = 2, ex = "") => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const F = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
const D = (k, d, s, w = 3, ex = "") => `<path data-k="${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 101" stroke-dashoffset="100" ${ex}/>`;
const T = (x, y, s, sz = 14, f = C.ink, ex = "", a = "middle") => `<text x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const TK = (k, x, y, s, sz = 14, f = C.ink, a = "middle", ex = "") => `<text data-k="${k}" x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const K = (k, body, ex = "") => `<g data-k="${k}" ${ex}>${body}</g>`;
const H = (k, body, ex = "") => `<g data-k="${k}" style="opacity:0" ${ex}>${body}</g>`;
const tw = (s, sz) => Math.round(String(s).length * sz * 0.6 + sz * 1.3);
// chip = rounded label; grouped (data-chip) so layout QA treats it as one box
const chip = (x, y, s, o = {}) => {
  const sz = o.sz || 14, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.8);
  return `<g data-chip="1">` + R(x - w / 2, y - h / 2, w, h, o.bg || C.paper, o.rx == null ? h / 2 : o.rx,
    `stroke="${o.st || C.navy}" stroke-width="${o.sw || 1.6}"${o.dash ? ' stroke-dasharray="4 3"' : ""}`) +
    T(x, y + sz * 0.36, s, sz, o.fg || C.navy) + `</g>`;
};
// left-anchored chip (x = left edge)
const chipL = (x, y, s, o = {}) => { const sz = o.sz || 14, w = o.w || tw(s, sz); return chip(x + w / 2, y, s, Object.assign({}, o, { w })); };
const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${x - 7 * s} ${y} l${5 * s} ${5 * s} l${10 * s} ${-11 * s}`, col, w);
const cross = (x, y, s = 1, col = C.orange, w = 3) => P(`M${x - 6 * s} ${y - 6 * s} l${12 * s} ${12 * s} M${x + 6 * s} ${y - 6 * s} l${-12 * s} ${12 * s}`, col, w);
const okDot = (x, y, r = 10) => O(x, y, r, C.green) + tick(x, y, r / 18, C.white, 2.2);
const noDot = (x, y, r = 10, col = C.red) => O(x, y, r, col) + cross(x, y, r / 16, C.white, 2.2);
const qDot = (x, y, r = 10, col = C.orange) => O(x, y, r, col) + T(x, y + r * 0.45, "?", r * 1.3, C.white);
const xDot = (x, y, r = 10, col = C.orange) => O(x, y, r, col) + T(x, y + r * 0.45, "!", r * 1.3, C.white);
const person = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}</g>`;
// Guest Host: green figure with lanyard and badge
const hostP = (x, y, s = 1, col = C.green) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}${P("M-5 -3 L0 4 L5 -3", C.gold, 1.6)}${R(-3, 3, 6, 5, C.gold, 1)}</g>`;
// Manager: figure with a tie
const mgrP = (x, y, s = 1, col = C.plum) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}${F("M0 -3 L3 2 L0 10 L-3 2 Z", C.gold)}</g>`;
// Guest: figure with a suitcase
const guestP = (x, y, s = 1, col = C.navy2) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}${R(13, 0, 10, 12, C.orange, 2)}${P("M16 0 V-3 H20 V0", C.orange, 1.4)}</g>`;
const clock = (x, y, r, col = C.orange, bg = C.paper) => O(x, y, r, bg, `stroke="${col}" stroke-width="${Math.max(2, r / 6)}"`) + P(`M${x} ${y - r * 0.62} V${y} L${x + r * 0.45} ${y + r * 0.3}`, col, Math.max(2, r / 7));
const gear = (x, y, r, col, hole = C.paper) => {
  let d = ""; const n = 8;
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n * 0.55, a2 = a0 + Math.PI / n, a3 = a2 + Math.PI / n * 0.45;
    const p = (a, rr) => `${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`;
    d += (i ? "L" : "M") + p(a0, r) + "L" + p(a1, r) + "L" + p(a2, r * 0.78) + "L" + p(a3, r * 0.78);
  }
  return F(d + "Z", col) + O(x, y, r * 0.34, hole);
};
const keyI = (x, y, s = 1, col = C.amber) => `<g transform="translate(${x} ${y}) scale(${s})">${O(-10, 0, 8, "none", `stroke="${col}" stroke-width="4"`)}${P("M-2 0 H18 M12 0 V7 M17 0 V5", col, 4)}</g>`;
const lockI = (x, y, s = 1, col = C.red) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-11, -4, 22, 17, col, 3)}${P("M-7 -4 V-10 A7 7 0 0 1 7 -10 V-4", col, 3.4)}${O(0, 4, 2.6, C.white)}</g>`;
const shieldI = (x, y, s = 1, col = C.green, inner = "") => `<g transform="translate(${x} ${y}) scale(${s})">${F("M0 -20 L17 -13 V0 Q17 14 0 22 Q-17 14 -17 0 V-13 Z", col)}${inner}</g>`;
const docI = (x, y, w, h, col = C.navy, lines = 4, bg = C.white) => R(x, y, w, h, bg, 6, `stroke="${col}" stroke-width="1.8"`) + R(x, y, w, Math.min(16, h * 0.2), col, 6) + R(x, y + Math.min(16, h * 0.2) - 6, w, 6, col) +
  rep(lines, (i) => R(x + 10, y + Math.min(16, h * 0.2) + 12 + i * ((h - Math.min(16, h * 0.2) - 18) / Math.max(1, lines)), (w - 20) * (i % 3 === 2 ? 0.6 : 0.9), 4, "#d9e1ea", 2));
const envI = (x, y, w, h, col = C.navy) => R(x, y, w, h, C.white, 4, `stroke="${col}" stroke-width="2"`) + P(`M${x} ${y} L${x + w / 2} ${y + h * 0.55} L${x + w} ${y}`, col, 2);
const magI = (x, y, r, col = C.ink) => O(x, y, r, "rgba(255,255,255,.35)", `stroke="${col}" stroke-width="${Math.max(3, r / 9)}"`) + P(`M${x + r * 0.72} ${y + r * 0.72} L${x + r * 1.25} ${y + r * 1.25}`, col, Math.max(5, r / 5));
const starI = (x, y, r = 10, col = C.gold) => { let d = ""; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; d += (i ? "L" : "M") + (x + rr * Math.cos(a)).toFixed(1) + " " + (y + rr * Math.sin(a)).toFixed(1); } return F(d + "Z", col); };
const bldg = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-20, -34, 40, 46, col, 3)}${F("M-24 -34 L0 -48 L24 -34 Z", col)}${rep(6, (i) => R(-14 + (i % 3) * 11, -26 + Math.floor(i / 3) * 13, 6, 8, C.gold, 1))}${R(-5, 2, 10, 10, C.paper, 1)}</g>`;
const kioskI = (x, y, s = 1, scr = C.sky) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-22, -62, 44, 84, C.navy, 8)}${R(-17, -55, 34, 30, scr, 4)}${R(-11, -16, 22, 5, "#9cc0e0", 2)}${R(-6, -6, 12, 6, "#0f2f4f", 2)}${R(-27, 22, 54, 6, C.navy, 3)}</g>`;
const arrowH = (x1, y, x2, col = C.navy, w = 3) => P(`M${x1} ${y} H${x2}`, col, w) + F(`M${x2 + (x2 > x1 ? 2 : -2)} ${y} l${x2 > x1 ? -10 : 10} -6 v12 Z`, col);
const arrowV = (x, y1, y2, col = C.navy, w = 3) => P(`M${x} ${y1} V${y2}`, col, w) + F(`M${x} ${y2 + (y2 > y1 ? 2 : -2)} l-6 ${y2 > y1 ? -10 : 10} h12 Z`, col);
const bubble = (x, y, w, h, tx, sz = 14, col = C.navy, tail = "bl") => R(x, y, w, h, C.white, 10, `stroke="${col}" stroke-width="1.8"`) +
  F(tail === "bl" ? `M${x + 14} ${y + h - 1} L${x + 8} ${y + h + 12} L${x + 26} ${y + h - 1} Z` : `M${x + w - 14} ${y + h - 1} L${x + w - 8} ${y + h + 12} L${x + w - 26} ${y + h - 1} Z`, C.white, `stroke="${col}" stroke-width="1.8"`) +
  R(tail === "bl" ? x + 9 : x + w - 27, y + h - 3, 18, 4, C.white) + `<g data-chip="1">${R(x + 2, y + 2, w - 4, h - 4, "none")}${T(x + w / 2, y + h / 2 + sz * 0.36, tx, sz, col)}</g>`;
const stampI = (x, y, s, col = C.green, rot = -8, sz = 15) => { const w = tw(s, sz) + 10; return `<g transform="rotate(${rot} ${x} ${y})"><g data-chip="1">${R(x - w / 2, y - 16, w, 32, "rgba(255,255,255,.92)", 5, `stroke="${col}" stroke-width="3"`)}${T(x, y + 5.5, s, sz, col)}</g></g>`; };
const gaugeArc = (cx, cy, r, f) => { const a0 = Math.PI, a1 = Math.PI + Math.PI * clamp(f, 0, 1); return `M${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)}`; };
const bleed = (bg, deco = "") => R(-400, -300, 1200, 900, bg) + deco;
const grid = (col, step = 40) => rep(Math.ceil(1200 / step), (i) => P(`M${-400 + i * step} -300 V600`, col, 1)) + rep(Math.ceil(900 / step), (i) => P(`M-400 ${-300 + i * step} H800`, col, 1));
const dots = (col) => rep(46, (i) => O(-380 + (i * 97) % 1160, -280 + ((i * 53) % 860), 2.2, col));
// ---- per-scene stylesheet, appended once per part into the shared <style id="vl-sc-w10"> ----
function sceneCSS(id, bg) {
  const s = ".vls-w10-" + id;
  return `
${s}{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:230px;overflow:hidden!important;box-sizing:border-box;border-radius:14px;background:${bg};color:${C.ink};font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w10-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w10-fig>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}
${s} svg text{font-family:inherit;font-weight:700;letter-spacing:.1px}
${s} [data-k],${s} [data-pn]{transform-box:fill-box;transform-origin:50% 50%}
${s}.w10-css [data-k],${s}.w10-css [data-pn]{transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.85s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}
${s}.w10-snap [data-k],${s}.w10-snap [data-pn],${s}.w10-rm [data-k],${s}.w10-rm [data-pn]{transition:none!important}
${s}.w10-rm *,${s}.w10-snap *{animation:none!important}
${s} .w10-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:36px;padding:6px 12px 8px;font-size:14px;font-weight:700;line-height:1.25;color:${C.navy};background:rgba(255,255,255,.62);border-top:1px solid rgba(31,78,121,.14)}
${s} .w10-num{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w10-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.2px}
${s} .w10-lab.w10-in{animation:vlsw10CapIn .5s cubic-bezier(.22,.8,.24,1)}
${s} .w10-dots{flex:0 0 64px;display:grid;gap:2px;align-items:center}
${s} .w10-dots i{display:block;height:5px;border-radius:3px;background:rgba(31,78,121,.18);transition:background .4s ease,transform .4s ease}
${s} .w10-dots i.on{background:${C.orange};transform:scaleY(1.6)}
${s} .w10-dots i.done{background:rgba(31,78,121,.55)}
${s}.w10-intro .w10-fig>svg{animation:vlsw10Intro .7s cubic-bezier(.22,.8,.24,1)}
${s} .a-flow{stroke-dasharray:5 7;animation:vlsw10Flow 1.1s linear infinite}
${s} .a-stream{stroke-dasharray:0 13;animation:vlsw10Stream .9s linear infinite}
${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Spin 7s linear infinite}
${s} .a-spinr{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Spin 9s linear infinite reverse}
${s} .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Bob 2.6s ease-in-out infinite}
${s} .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Pulse 2s ease-in-out infinite}
${s} .a-blink{animation:vlsw10Blink 1.4s ease-in-out infinite}
${s} .a-shake{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Shake 1.6s ease-in-out infinite}
${s} .a-run{animation:vlsw10Run 1.4s linear infinite}
${s} .a-tick{transform-box:fill-box;transform-origin:50% 100%;animation:vlsw10Spin 4s linear infinite}
@media (max-width:420px){${s} .w10-cap{font-size:13px;min-height:32px;padding:5px 10px 7px;gap:8px}${s} .w10-dots{flex-basis:52px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
}
const KEYFRAMES = `
@keyframes vlsw10CapIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes vlsw10Intro{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
@keyframes vlsw10Flow{to{stroke-dashoffset:-24}}
@keyframes vlsw10Stream{to{stroke-dashoffset:-26}}
@keyframes vlsw10Spin{to{transform:rotate(360deg)}}
@keyframes vlsw10Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes vlsw10Pulse{0%,100%{opacity:.35;transform:scale(.94)}50%{opacity:.95;transform:scale(1.06)}}
@keyframes vlsw10Blink{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes vlsw10Run{from{transform:translateX(0)}to{transform:translateX(40px)}}
@keyframes vlsw10Shake{0%,100%{transform:rotate(0)}20%{transform:rotate(-4deg)}40%{transform:rotate(4deg)}60%{transform:rotate(-2deg)}80%{transform:rotate(2deg)}}
`;
function addStyles(list) {
  if (typeof document === "undefined") return;
  let st = document.getElementById("vl-sc-w10");
  if (!st) { st = document.createElement("style"); st.id = "vl-sc-w10"; (document.head || document.documentElement).appendChild(st); }
  const flag = "data-w10claude-" + PART;
  if (st.getAttribute(flag)) return;
  st.setAttribute(flag, "1");
  st.appendChild(document.createTextNode(KEYFRAMES + list.map(([id, bg, extra]) => sceneCSS(id, bg) + (extra || "")).join("\n")));
}
// ---- scene factory ----
function makeScene(cfg) {
  const { id, panels } = cfg;
  const labels = [];
  panels.forEach((p) => { p.a = labels.length; p.labels.forEach((l) => labels.push(l)); p.b = labels.length - 1; });
  const N = labels.length;
  let root = null, useG = false, active = -1;
  const raf = (f) => (window.requestAnimationFrame ? window.requestAnimationFrame(f) : setTimeout(f, 16));
  const panelOf = (k) => { for (let p = 0; p < panels.length; p++) if (k >= panels[p].a && k <= panels[p].b) return p; return panels.length - 1; };
  const mapK = (i, n) => {
    const nn = Math.max(1, Math.floor(num(n, N)));
    const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
    return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
  };
  const pEl = (p) => (root ? root.querySelector('[data-pn="' + p + '"]') : null);
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
  function count(el, v, pre, suf, snap) {
    const from = num(el.getAttribute("data-v"), 0);
    el.setAttribute("data-v", String(v));
    const fmt = (x) => pre + Math.round(x).toLocaleString("en-US") + suf;
    const tok = (el._w10tok = (el._w10tok || 0) + 1);
    if (snap || reduced() || from === v) { el.textContent = fmt(v); return; }
    if (useG) { const o = { x: from }; window.gsap.to(o, { x: v, duration: 0.9, ease: "power2.out", onUpdate: () => { if (el._w10tok === tok) el.textContent = fmt(o.x); } }); return; }
    const t0 = Date.now();
    const stepF = () => { if (el._w10tok !== tok) return; const u = clamp((Date.now() - t0) / 900, 0, 1), e = 1 - Math.pow(1 - u, 3); el.textContent = fmt(from + (v - from) * e); if (u < 1) raf(stepF); };
    stepF();
  }
  function ctx(scope, snap) {
    const nodes = (k) => (scope ? Array.prototype.slice.call(scope.querySelectorAll('[data-k="' + k + '"]')) : []);
    return {
      snap,
      op: (k, o, t = {}) => nodes(k).forEach((el) => op(el, o, t, snap)),
      mv: (k, st, t = {}) => nodes(k).forEach((el) => tf(el, st, t, snap)),
      dr: (k, f, t = {}) => nodes(k).forEach((el) => dash(el, f, t, snap)),
      fl: (k, col, t = {}) => nodes(k).forEach((el) => fill(el, col, t, snap)),
      tx: (k, s) => nodes(k).forEach((el) => { if (el.textContent !== String(s)) el.textContent = String(s); }),
      num: (k, v, pre = "", suf = "") => nodes(k).forEach((el) => count(el, v, pre, suf, snap)),
      vis: (map, t = {}) => Object.keys(map).forEach((k) => nodes(k).forEach((el) => op(el, map[k] === true ? 1 : map[k] === false ? 0 : map[k], t, snap))),
      all: (sel) => (scope ? Array.prototype.slice.call(scope.querySelectorAll(sel)) : []),
      opEl: (el, o, t = {}) => op(el, o, t, snap),
      mvEl: (el, st, t = {}) => tf(el, st, t, snap),
      flEl: (el, col, t = {}) => fill(el, col, t, snap)
    };
  }
  function caption(k, p, snap) {
    const lab = root.querySelector(".w10-lab"), nn = root.querySelector(".w10-num");
    const txt = labels[k] || "";
    if (lab && lab.textContent !== txt) {
      lab.textContent = txt;
      if (!snap && !reduced()) { lab.classList.remove("w10-in"); void lab.offsetWidth; lab.classList.add("w10-in"); }
    }
    if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
    Array.prototype.slice.call(root.querySelectorAll(".w10-dots i")).forEach((d, q) => { d.className = q === p ? "on" : q < p ? "done" : ""; });
  }
  function safe(f) { try { f(); } catch (e) { if (window.console) console.warn("[VL W10 " + id + "]", e); } }
  function render(k, snap) {
    if (!root) return;
    const p = panelOf(k), pg = pEl(p), pc = panels[p];
    if (snap) root.classList.add("w10-snap");
    if (p !== active) {
      // stage the incoming visual in its pre-state, then let it animate in
      if (!snap) {
        root.classList.add("w10-snap");
        safe(() => pc.render(ctx(pg, true), k - pc.a - 1, k - 1));
        if (pg) tf(pg, { s: 1.035, y: 6, pv: [200, 150] }, {}, true);
        void root.offsetWidth;
        root.classList.remove("w10-snap");
      }
      panels.forEach((_, q) => {
        const el = pEl(q); if (!el) return;
        if (q === p) { op(el, 1, { d: 0.55, dl: snap ? 0 : 0.18 }, snap); tf(el, { pv: [200, 150] }, { d: 0.8, dl: snap ? 0 : 0.18 }, snap); }
        else { op(el, 0, { d: 0.4 }, snap); tf(el, { s: q < p ? 0.97 : 1.03, pv: [200, 150] }, { d: 0.5 }, snap); }
      });
      active = p;
    }
    safe(() => pc.render(ctx(pg, snap), k - pc.a, k));
    caption(k, p, snap);
    if (snap) { void root.offsetWidth; root.classList.remove("w10-snap"); }
    root.setAttribute("data-moment", String(k));
    root.setAttribute("data-visual", String(p + 1));
  }
  function kill() {
    if (root && useG) { try { window.gsap.killTweensOf(root.querySelectorAll("[data-k],[data-pn]")); } catch (_) {} }
  }
  function mount(el) {
    const r = document.createElement("div");
    const rm = reduced();
    r.className = "vls-w10-" + id + " w10-root" + (useG ? " w10-gsap" : " w10-css") + (rm ? " w10-rm" : " w10-intro");
    r.setAttribute("data-scene", id);
    const body = panels.map((pc, q) => `<g data-pn="${q}" style="opacity:0">${pc.draw()}</g>`).join("");
    r.innerHTML = '<div class="w10-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
      esc(cfg.desc) + '">' + bleed(cfg.bg) + body + '</svg></div><div class="w10-cap" aria-hidden="true"><span class="w10-num"></span><span class="w10-lab"></span><span class="w10-dots" style="grid-template-columns:repeat(' + panels.length + ',1fr)">' + rep(panels.length, () => "<i></i>") + "</span></div>";
    if (typeof el.replaceChildren === "function") el.replaceChildren(r);
    else { el.innerHTML = ""; el.appendChild(r); }
    return r;
  }
  return {
    build(el) {
      if (!el || el.nodeType !== 1) return;
      kill();
      useG = hasG();
      active = -1;
      root = mount(el);
      render(0, true);
    },
    step(i, n) {
      if (!root) return;
      render(mapK(i, n), false);
    },
    reset() {
      if (!root) return;
      kill();
      active = -1;
      render(0, true);
    },
    _meta: { id, N, visuals: panels.map((p) => ({ a: p.a, b: p.b, src: p.src })) }
  };
}
const SCENE_BG = [];
function mirror(id) {
  // The older Week 10 host reads window.W10_SCENES; keep it pointing at the same scene.
  try { if (window.W10_SCENES && window.W10_SCENES !== VL_SCENES) window.W10_SCENES[id] = VL_SCENES[id]; } catch (_) {}
}

// ============================================================
// W10O1a · "A process redesign changes people's jobs"  (24 narration moments, 9 visuals)
// Story spine: a smooth kiosk arrival stops on a rate mismatch → a person must decide →
// the job behind the kiosk has changed → the AED 400 permission is missing → the People
// phase (6 of 10) must build the people system, or the old process quietly returns.
// ============================================================
{
  const id = "W10O1a";
  const FLOOR = () => R(-400, 232, 1200, 400, "#e3d7c3") + rep(10, (i) => P(`M${-30 + i * 50} 232 L${-80 + i * 58} 300`, "#d6c8b0", 1.5));
  const ARCH = (x, col = "#ebe2d1") => F(`M${x} 214 V84 Q${x} 46 ${x + 30} 46 Q${x + 60} 46 ${x + 60} 84 V214 Z`, col);
  const panels = [
    // V1 · moments 0–1 · Explainer Video Kit (Motion Array) — https://motionarray.com/after-effects-templates/explainer-video-18242/
    // Adapted beat: an actor walks into frame, the device shows the problem, the actor freezes.
    {
      src: "https://motionarray.com/after-effects-templates/explainer-video-18242/",
      labels: ["A smooth arrival", "The arrival stops"],
      draw: () => FLOOR() + ARCH(24) + ARCH(104) +
        K("kiosk", R(262, 52, 76, 172, C.navy, 10) + R(270, 62, 60, 66, C.sky, 6) + R(276, 140, 48, 8, "#9cc0e0", 4) + R(286, 158, 28, 10, "#0f2f4f", 3) + R(250, 224, 100, 10, C.navy, 4)) +
        H("sOk", okDot(300, 95, 19)) +
        H("sBad", R(270, 62, 60, 66, C.orange, 6) + T(300, 108, "≠", 38, C.white)) +
        H("title", chip(122, 26, "Week 10 · People phase", { sz: 14, bg: C.navy, fg: C.white, st: C.navy })) +
        H("found", chip(166, 84, "Booking found", { sz: 15, st: C.green, fg: C.green }) + P("M240 84 H266", C.green, 2, 'stroke-dasharray="4 3"')) +
        H("rates", chip(146, 64, "Confirmed rate", { sz: 15 }) + T(146, 108, "≠", 24, C.red) + chip(146, 138, "Displayed rate", { sz: 15, st: C.orange, fg: C.orange }) +
          P("M222 64 Q248 64 268 84 M222 138 Q248 138 268 112", C.navy, 2, 'stroke-dasharray="4 3"')) +
        H("pause", O(206, 150, 15, C.orange) + R(200, 143, 4, 14, C.white, 1) + R(208, 143, 4, 14, C.white, 1)) +
        K("guest", guestP(0, 0, 1.5), 'style="opacity:0"'),
      render: (c, j) => {
        c.vis({ title: j === 0, found: j === 0, sOk: j === 0, sBad: j === 1, rates: j === 1, pause: j === 1 });
        c.mv("guest", j < 0 ? { x: -30, y: 206 } : j === 0 ? { x: 124, y: 206 } : { x: 206, y: 206 }, { d: 1.3, e: "power2.out" });
        c.op("guest", j < 0 ? 0 : 1);
        c.mv("kiosk", j === 1 ? { x: 2 } : {}, { d: 0.3 });
      }
    },
    // V2 · moments 2–3 · Animated Planning Dashboard Workflow (Dribbble) — https://dribbble.com/shots/27184988-Animated-Planning-Dashboard-Workflow
    // Adapted: a character steps in while panels slide and pulse beside them; here a process
    // diagram slides down and is checked, row by row, against what a person can actually do.
    {
      src: "https://dribbble.com/shots/27184988-Animated-Planning-Dashboard-Workflow",
      labels: ["Can this host decide?", "Diagrams cannot serve"],
      draw: () => FLOOR() + ARCH(250) + ARCH(320) +
        K("kio", kioskI(64, 206, 1.15, C.orange) + chip(92, 104, "Technology works", { sz: 14, st: C.green, fg: C.green })) +
        K("gst", guestP(176, 214, 1.45) + R(150, 196, 10, 15, C.ink, 2)) +
        K("host", hostP(0, 0, 1.5), 'style="opacity:0"') +
        H("ask", chip(222, 40, "Can this host decide?", { sz: 16, st: C.orange, fg: C.orange, bg: C.white })) +
        H("hq", qDot(0, 0, 12)) +
        H("sheet", R(14, 22, 168, 250, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + R(14, 22, 168, 30, C.navy, 10) + R(14, 42, 168, 10, C.navy) + T(98, 43, "Process diagram", 14, C.white) +
          rep(4, (i) => R(34, 66 + i * 50, 56, 26, C.sky, 5, `stroke="${C.navy2}" stroke-width="1.5"`) + (i < 3 ? arrowV(62, 93 + i * 50, 112 + i * 50, C.navy2, 2) : "")) +
          P("M106 80 H160 M106 130 H150 M106 180 H162 M106 230 H144", "#d9e1ea", 5)) +
        [["Welcome guests", 92], ["Investigate cases", 152], ["Own the decision", 212]].map(([t, y], i) =>
          H("row" + i, noDot(176, y, 11) + chip(258, y, t, { sz: 14 }) + okDot(332, y, 11))).join(""),
      render: (c, j) => {
        const two = j >= 1;
        c.op("kio", j >= 0 && !two ? 1 : 0); c.op("gst", j >= 0 && !two ? 1 : 0);
        c.vis({ ask: j === 0, hq: j === 0 });
        c.mv("host", j < 0 ? { x: 430, y: 214 } : two ? { x: 366, y: 214 } : { x: 262, y: 214 }, { d: 1.1 });
        c.op("host", j >= 0 ? 1 : 0);
        c.mv("hq", { x: 262, y: 168 });
        c.op("sheet", two ? 1 : 0); c.mv("sheet", two ? {} : { y: -260 }, { d: 0.9, e: "power3.out" });
        for (let i = 0; i < 3; i++) { c.op("row" + i, two ? 1 : 0, { dl: two ? 0.5 + i * 0.25 : 0 }); c.mv("row" + i, two ? {} : { x: 30 }, { dl: two ? 0.5 + i * 0.25 : 0 }); }
      }
    },
    // V3 · moments 4–5 · Path tween (Observable/D3) — https://observablehq.com/@d3/path-tween
    // Adapted: the tangled original journey path dissolves and is redrawn as a clean
    // fork (routine → kiosk, exception → Guest Host) across four pilot properties.
    {
      src: "https://observablehq.com/@d3/path-tween",
      labels: ["The original problem", "Four pilot properties"],
      draw: () => {
        const silo = (x) => R(x, 18, 112, 266, "rgba(31,78,121,.06)", 14, `stroke="${C.muted}" stroke-width="1.4" stroke-dasharray="5 5"`);
        return H("old", silo(24) + silo(144) + silo(264)) +
          D("oldP", "M95 64 H300 Q352 64 334 108 L118 150 Q58 162 92 204 L300 232", C.orange, 5) +
          H("oldC", chip(95, 64, "Guest arrives", { sz: 15 }) + chip(300, 64, "Booking checked", { sz: 15 }) +
            chip(95, 150, "Rate disputed", { sz: 15, st: C.red, fg: C.red }) + chip(290, 232, "Room not ready", { sz: 15, st: C.red, fg: C.red }) +
            xDot(180, 150, 11, C.red) + xDot(384, 232, 11, C.red)) +
          H("tok", O(0, 0, 10, C.navy2, `stroke="${C.white}" stroke-width="3"`) + clock(0, -26, 11, C.red)) +
          H("props", [70, 160, 250, 340].map((x, i) => bldg(x, 72, 0.8, i % 2 ? C.navy2 : C.navy)).join("") + chip(205, 104, "Four pilot properties", { sz: 15, bg: C.navy, fg: C.white })) +
          D("newA", "M140 196 C190 196 196 150 240 150", C.green, 9) +
          D("newB", "M140 196 C190 196 186 250 214 250", C.orange, 5) +
          H("newC", chip(76, 196, "Guest arrives", { sz: 14 }) + chip(318, 150, "Routine to kiosk", { sz: 14, st: C.green, fg: C.green }) +
            chip(305, 250, "Exceptions to hosts", { sz: 14, st: C.orange, fg: C.orange }));
      },
      render: (c, j) => {
        const old = j === 0, nw = j >= 1;
        c.op("old", old ? 1 : 0); c.op("oldC", old ? 1 : 0, { dl: old ? 0.2 : 0 });
        c.dr("oldP", old ? 1 : 0, { d: 1.6 }); c.op("oldP", old ? 1 : 0);
        c.op("tok", old ? 1 : 0); c.mv("tok", old ? { x: 226, y: 129 } : { x: 95, y: 64 }, { d: 1.8, dl: 0.3, e: "power2.inOut" });
        c.op("props", nw ? 1 : 0); c.mv("props", nw ? {} : { y: -30 });
        c.dr("newA", nw ? 1 : 0, { dl: 0.5 }); c.dr("newB", nw ? 1 : 0, { dl: 0.8 });
        c.op("newA", nw ? 1 : 0); c.op("newB", nw ? 1 : 0);
        c.op("newC", nw ? 1 : 0, { dl: nw ? 0.4 : 0 });
      }
    },
    // V4 · moments 6–8 · teamwork (LottieFiles) — https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6
    //  + Stacked-to-grouped bars (Observable) — https://observablehq.com/@d3/stacked-to-grouped-bars
    // Adapted: 22 figures appear and change role one by one; then two job-mix bars compare the work.
    {
      src: "https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6",
      labels: ["Twenty-two Guest Hosts", "The old job", "A different job"],
      draw: () => {
        let s = H("t1", chip(200, 18, "22 Front Desk Agents", { sz: 14, bg: C.navy, fg: C.white })) + H("t2", chip(200, 18, "22 Guest Hosts", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
        for (let i = 0; i < 22; i++) {
          const x = 30 + (i % 11) * 34, y = 56 + Math.floor(i / 11) * 46;
          s += `<g data-k="fda" data-i="${i}">${person(x, y, 0.8, C.navy)}</g><g data-k="gh" data-i="${i}" style="opacity:0">${hostP(x, y, 0.8)}</g>`;
        }
        s += H("b1", chip(80, 150, "Front Desk Agent", { sz: 13 }) + R(162, 136, 228, 30, "#e3e8ee", 6) + K("b1s", R(162, 136, 172, 30, C.navy, 6) + T(248, 156, "Routine check-ins", 13, C.white)));
        s += H("b2", chip(80, 200, "Guest Host", { sz: 13, st: C.green, fg: C.green }) + K("b2a", R(162, 186, 114, 30, C.orange, 6) + T(219, 206, "Exceptions", 13, C.white)) +
          K("b2b", R(278, 186, 112, 30, C.green, 6) + T(334, 206, "Guest support", 13, C.white)));
        s += H("sk", chip(62, 260, "Judgement", { sz: 13 }) + chip(175, 260, "Coordination", { sz: 13 }) + chip(318, 260, "Within authority", { sz: 13, st: C.amber, fg: C.amber }));
        return s;
      },
      render: (c, j) => {
        c.all('[data-k="fda"]').forEach((el) => { const i = +el.getAttribute("data-i"); c.opEl(el, j >= 0 ? 1 : 0, { dl: j === 0 ? i * 0.03 : 0 }); });
        c.all('[data-k="gh"]').forEach((el) => { const i = +el.getAttribute("data-i"); c.opEl(el, j >= 0 ? 1 : 0, { dl: j === 0 ? 0.6 + i * 0.05 : 0 }); c.mvEl(el, j >= 0 ? {} : { y: -8 }, { dl: j === 0 ? 0.6 + i * 0.05 : 0 }); });
        c.op("t1", j < 0 ? 1 : 0, { dl: j === 0 ? 1.4 : 0 }); c.op("t2", j >= 0 ? 1 : 0, { dl: j === 0 ? 1.4 : 0 });
        c.op("b1", j >= 1 ? (j === 2 ? 0.55 : 1) : 0);
        c.mv("b1s", { sx: j >= 1 ? 1 : 0.01, pv: [162, 151] }, { d: 1 });
        c.op("b2", j >= 2 ? 1 : 0);
        c.mv("b2a", { sx: j >= 2 ? 1 : 0.01, pv: [162, 201] }, { d: 0.9 });
        c.mv("b2b", { sx: j >= 2 ? 1 : 0.01, pv: [278, 201] }, { d: 0.9, dl: 0.35 });
        c.op("sk", j >= 2 ? 1 : 0, { dl: j === 2 ? 0.8 : 0 }); c.mv("sk", j >= 2 ? {} : { y: 16 }, { dl: j === 2 ? 0.8 : 0 });
      }
    },
    // V5 · moments 9–11 · The Trouble With Food Safety Audits (NYT) — https://www.nytimes.com/interactive/projects/documents/food-safety-peanut-inspection
    // Adapted: two documents laid side by side, a highlight sweeps the official one and exposes
    // the missing line; then the reader is placed in the employee's shoes.
    {
      src: "https://www.nytimes.com/interactive/projects/documents/food-safety-peanut-inspection",
      labels: ["The AED 400 waiver", "Missing from delegation", "Would you waive it?"],
      draw: () =>
        K("docs",
          R(16, 26, 176, 136, C.white, 6, `stroke="${C.navy}" stroke-width="2"`) + F("M16 26 L104 70 L192 26 Z", C.sky, `stroke="${C.navy}" stroke-width="2"`) + T(104, 112, "Waive ≤ AED 400", 18, C.navy) + T(104, 140, "Eligible cases", 14, C.slate) +
          R(212, 22, 176, 186, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + R(212, 22, 176, 28, C.navy, 8) + R(212, 42, 176, 8, C.navy) + T(300, 41, "Delegation schedule", 13, C.white) +
          rep(4, (i) => R(226, 64 + i * 22, 148, 9, "#d9e1ea", 4)) + rep(1, () => R(226, 182, 120, 9, "#d9e1ea", 4)) +
          K("row", R(222, 150, 156, 26, "none", 6, `stroke="${C.red}" stroke-width="2" stroke-dasharray="5 4"`) + T(300, 168, "AED 400 waiver", 14, C.muted))) +
        H("rule", P("M40 262 H360", C.navy, 4) + rep(5, (i) => P(`M${40 + i * 80} 254 V270`, C.navy, 2)) + T(40, 290, "AED 0", 13, C.navy) + T(360, 290, "AED 400", 13, C.navy) +
          K("mk", O(296, 262, 9, C.green, `stroke="${C.white}" stroke-width="3"`) + chip(296, 232, "AED 320", { sz: 15, bg: C.green, st: C.green, fg: C.white })) + chip(150, 232, "Eligible case", { sz: 14, st: C.green, fg: C.green })) +
        H("mag", magI(300, 163, 24, C.red)) +
        H("miss", stampI(300, 244, "Not listed", C.red, -6, 16) + stampI(104, 182, "Heard only", C.amber, 6, 15)) +
        H("shoes", chip(200, 34, "Waive it?", { sz: 18, bg: C.orange, st: C.orange, fg: C.white }) +
          chip(118, 92, "Email: yes", { sz: 14, st: C.green, fg: C.green }) + chip(286, 92, "Schedule: silent", { sz: 14, st: C.red, fg: C.red }) +
          guestP(58, 268, 1.8) + clock(58, 196, 20) + hostP(200, 266, 2.1) + mgrP(342, 268, 1.8) +
          bubble(250, 150, 134, 34, "Decide yourself", 14, C.plum, "br")),
      render: (c, j) => {
        const sh = j >= 2;
        c.op("docs", j < 0 ? 0 : sh ? 0 : 1); c.mv("docs", sh ? { y: -20, s: 0.96 } : {});
        c.op("rule", j === 0 ? 1 : 0); c.mv("mk", j === 0 ? {} : { x: -256 }, { d: 1.2, dl: 0.2 });
        c.op("row", j < 0 ? 0 : 1); c.mv("row", j === 1 ? { s: 1.05 } : {});
        c.op("mag", j === 1 ? 1 : 0); c.mv("mag", j === 1 ? {} : { x: 60, y: 60 }, { d: 1 });
        c.op("miss", j === 1 ? 1 : 0, { dl: j === 1 ? 0.8 : 0 }); c.mv("miss", j === 1 ? {} : { s: 1.4 }, { dl: j === 1 ? 0.8 : 0 });
        c.op("shoes", sh ? 1 : 0); c.mv("shoes", sh ? {} : { y: 24 });
      }
    },
    // V6 · moments 12–13 · Interactive Computer Assembly Sequence (CodePen) — https://codepen.io/karlhorning/pen/OJqNMVR
    // Adapted: a case card climbs to the manager; then three missing components fly in and lock
    // into sockets around the redesigned workflow, like parts assembling into a working machine.
    {
      src: "https://codepen.io/karlhorning/pen/OJqNMVR",
      labels: ["Escalation feels safer", "Design the people system"],
      draw: () =>
        H("esc", hostP(96, 262, 2.1) + mgrP(96, 74, 2.1) + T(96, 124, "Duty manager", 14, C.plum) + arrowV(96, 214, 138, C.slate, 4) +
          chip(290, 92, "Resistance?", { sz: 16, st: C.slate, fg: C.slate }) + P("M238 92 H342", C.red, 3) +
          chip(290, 160, "Created uncertainty", { sz: 15, st: C.orange, fg: C.orange }) + chip(290, 222, "Escalation feels safer", { sz: 14, bg: C.peach, st: C.orange, fg: C.orange })) +
        H("card", R(-20, -13, 40, 26, C.white, 4, `stroke="${C.orange}" stroke-width="2"`) + T(0, 5, "AED", 13, C.orange)) +
        H("asm", `<g class="a-spin">${gear(200, 150, 46, C.navy, C.sky)}</g>` + chip(200, 216, "Redesigned workflow", { sz: 14, bg: C.navy, fg: C.white }) +
          D("l0", "M200 76 V100", C.slate, 2.5) + D("l1", "M118 236 L160 184", C.slate, 2.5) + D("l2", "M282 236 L240 184", C.slate, 2.5)) +
        H("cA", keyI(140, 56, 0.9) + chip(232, 56, "Decision authority", { sz: 14, st: C.amber, fg: C.amber })) +
        H("cB", chip(92, 262, "Capability", { sz: 14, st: C.green, fg: C.green })) +
        H("cC", chip(290, 262, "Performance expectations", { sz: 13, st: C.plum, fg: C.plum })),
      render: (c, j) => {
        const e = j === 0, a = j >= 1;
        c.op("esc", e ? 1 : 0);
        c.op("card", e ? 1 : 0); c.mv("card", e ? { x: 160, y: 80 } : { x: 140, y: 226 }, { d: 1.4, dl: 0.3, e: "power2.inOut" });
        c.op("asm", a ? 1 : 0); c.mv("asm", a ? {} : { s: 0.8 });
        ["l0", "l1", "l2"].forEach((k, i) => c.dr(k, a ? 1 : 0, { dl: a ? 0.9 + i * 0.3 : 0, d: 0.5 }));
        [["cA", { y: -70 }], ["cB", { x: -120, y: 30 }], ["cC", { x: 120, y: 30 }]].forEach(([k, off], i) => {
          c.op(k, a ? 1 : 0, { dl: a ? 0.3 + i * 0.3 : 0 }); c.mv(k, a ? {} : off, { d: 0.9, dl: a ? 0.3 + i * 0.3 : 0, e: "back.out(1.4)" });
        });
      }
    },
    // V7 · moments 14–17 · SVG Timeline + ScrollTrigger + Paths (CodePen) — https://codepen.io/ruru_wang/pen/VwOPzgy
    // Adapted: a serpentine track draws itself node by node (scroll progress replaced by narration
    // progress), lighting Phase 6, then the rest of the framework, then the People–Develop link.
    {
      src: "https://codepen.io/ruru_wang/pen/VwOPzgy",
      labels: ["Phase 6: People", "The phases ahead", "People meets Develop", "No authority, no flow"],
      draw: () => {
        const X1 = [50, 125, 200, 275, 350], X2 = [350, 275, 200, 125, 50];
        let s = P("M50 62 H350 Q386 62 386 115 Q386 168 350 168 H50", "#e2dbcf", 6, 'stroke-dasharray="2 9"');
        s += D("pA", "M50 62 H350 Q386 62 386 115 Q386 168 350 168", C.navy, 6);
        s += D("pB", "M350 168 H50", C.navy, 6);
        s += X1.map((x, i) => O(x, 62, 13, i === 4 ? C.navy2 : "#b9c6d3") + T(x, 67, String(i + 1), 13, C.white)).join("");
        s += T(350, 96, "Innovate", 14, C.navy2);
        s += K("n6", O(350, 168, 19, C.orange) + T(350, 174, "6", 17, C.white));
        s += H("n6r", O(350, 168, 28, "none", `stroke="${C.orange}" stroke-width="3" class="a-pulse"`));
        s += T(350, 210, "People", 16, C.orange);
        const L2 = [["Develop", 140], ["Implement", 206], ["Realize Value", 140]];
        s += H("rest", [1, 2, 3, 4].map((i) => O(X2[i], 168, 13, C.navy) + T(X2[i], 173, String(i + 6), 13, C.white)).join("") +
          L2.map(([t, y], i) => T(X2[i + 1], y, t, 14, C.navy)).join("") + T(50, 200, "Sustainable", 13, C.navy) + T(50, 215, "Performance", 13, C.navy));
        s += H("ph", chip(200, 24, "Phase 6 of 10", { sz: 15, bg: C.orange, st: C.orange, fg: C.white }));
        s += H("link", P("M350 168 Q312 124 275 168", C.green, 5) + O(275, 168, 19, "none", `stroke="${C.green}" stroke-width="4"`) +
          chip(100, 262, "Authorised decisions", { sz: 13, st: C.orange, fg: C.orange }) + chip(300, 262, "Supporting technology", { sz: 13, st: C.green, fg: C.green }));
        s += H("stuck", kioskI(46, 266, 0.55) + hostP(318, 276, 1.05) + lockI(352, 252, 0.95) + noDot(286, 248, 10));
        s += H("rc", chip(0, 0, "Rate discrepancy", { sz: 14, st: C.orange, fg: C.orange }));
        return s;
      },
      render: (c, j) => {
        c.dr("pA", j >= 0 ? 1 : 0, { d: 1.6 }); c.dr("pB", j >= 1 ? 1 : 0, { d: 1.4 });
        c.mv("n6", j >= 0 ? { s: j === 0 ? 1.15 : 1 } : { s: 0.5 }, { dl: j === 0 ? 1.2 : 0 });
        c.vis({ n6r: j === 0, ph: j === 0, rest: j >= 1 }, { dl: 0 });
        c.op("rest", j >= 1 ? (j >= 2 ? 0.85 : 1) : 0, { dl: j === 1 ? 0.6 : 0 });
        c.op("link", j === 2 ? 1 : 0);
        c.op("stuck", j === 3 ? 1 : 0); c.op("rc", j === 3 ? 1 : 0);
        c.mv("rc", j === 3 ? { x: 196, y: 262 } : { x: 118, y: 262 }, { d: 1.4, dl: 0.2, e: "power2.inOut" });
      }
    },
    // V8 · moments 18–20 · Idea Flow Animation (Behance) — https://www.behance.net/gallery/247762027/Idea-Flow-Animation-Infographic-Motion-Design
    // Adapted: a hub with orbiting idea nodes that connect to it; nodes then re-label and finally
    // give way to three continuous orbit rings.
    {
      src: "https://www.behance.net/gallery/247762027/Idea-Flow-Animation-Infographic-Motion-Design",
      labels: ["What the phase examines", "Permission, ability, recognition", "Continuous throughout"],
      draw: () => {
        const N6 = [["Responsibilities", 200, 50], ["Accountability", 318, 100], ["Authority", 318, 204], ["Capability", 200, 256], ["Measures", 82, 204], ["Incentives", 82, 100]];
        let s = H("hub", O(200, 152, 44, C.white, `stroke="${C.green}" stroke-width="3"`) + hostP(200, 166, 1.7));
        s += N6.map(([t, x, y], i) => D("sp" + i, `M200 152 L${x} ${y}`, C.muted, 2)).join("");
        s += N6.map(([t, x, y], i) => H("n" + i, chip(x, y, t, { sz: 14 }))).join("");
        s += H("h2", chip(296, 204, "Permission to decide", { sz: 14, bg: C.amber, st: C.amber, fg: C.white }));
        s += H("h3", chip(200, 256, "Ability to decide", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
        s += H("h4", chip(86, 204, "Recognised work", { sz: 14, bg: C.plum, st: C.plum, fg: C.white }));
        s += H("rings", `<g class="a-spin">${O(200, 152, 66, "none", `stroke="${C.plum}" stroke-width="3" stroke-dasharray="10 8"`)}</g>` +
          `<g class="a-spinr">${O(200, 152, 96, "none", `stroke="${C.teal}" stroke-width="3" stroke-dasharray="14 9"`)}</g>` +
          `<g class="a-spin">${O(200, 152, 126, "none", `stroke="${C.navy}" stroke-width="3" stroke-dasharray="18 10"`)}</g>` +
          chip(200, 86, "Leadership", { sz: 13, st: C.plum, fg: C.plum }) + chip(200, 56, "Change management", { sz: 13, st: C.teal, fg: C.teal }) +
          chip(200, 26, "Project management", { sz: 13 }) + chip(200, 284, "Never finished once", { sz: 13, bg: C.navy, fg: C.white }));
        return s;
      },
      render: (c, j) => {
        c.op("hub", j >= 0 ? 1 : 0);
        for (let i = 0; i < 6; i++) {
          const hi = i === 2 || i === 3 || i === 4;
          c.dr("sp" + i, j >= 0 && j < 2 ? 1 : 0, { dl: j === 0 ? i * 0.15 : 0, d: 0.6 });
          c.op("sp" + i, j === 1 && !hi ? 0.25 : 1);
          c.op("n" + i, j === 0 ? 1 : j === 1 ? (hi ? 0 : 0.3) : 0, { dl: j === 0 ? 0.2 + i * 0.15 : 0 });
          c.mv("n" + i, j >= 0 ? {} : { s: 0.6 }, { dl: j === 0 ? 0.2 + i * 0.15 : 0, e: "back.out(1.6)" });
        }
        ["h2", "h3", "h4"].forEach((k, i) => { c.op(k, j === 1 ? 1 : 0, { dl: j === 1 ? i * 0.2 : 0 }); c.mv(k, j === 1 ? {} : { s: 0.7 }, { dl: j === 1 ? i * 0.2 : 0 }); });
        c.op("rings", j === 2 ? 1 : 0); c.mv("rings", j === 2 ? {} : { s: 0.85 });
      }
    },
    // V9 · moments 21–23 · Celonis process analysis — https://www.celonis.com/platform/process-analysis
    // Adapted: the observed flow is overlaid on the intended one and deviations glow red; the
    // overlay then becomes an evidence board, and finally the conforming path lights green.
    {
      src: "https://www.celonis.com/platform/process-analysis",
      labels: ["The old process returns", "This week's contradictions", "A dependable arrival"],
      draw: () =>
        H("ret", R(14, 20, 182, 262, "#f1ebe0", 12, `stroke="${C.muted}" stroke-width="1.5"`) + kioskI(104, 206, 1.35, C.mint) + chip(105, 46, "New kiosk", { sz: 15, st: C.green, fg: C.green }) +
          R(204, 20, 184, 262, "#e9edf3", 12, `stroke="${C.red}" stroke-width="2" stroke-dasharray="6 4"`) + chip(296, 46, "Same approvals", { sz: 15, st: C.red, fg: C.red }) +
          hostP(244, 150, 1.25) + mgrP(346, 150, 1.25) + stampI(346, 196, "Approve?", C.plum, -6, 13) + clock(296, 244, 22, C.red) +
          `<g class="a-flow">${P("M262 136 Q296 104 330 136", C.red, 3)}${P("M330 164 Q296 196 262 164", C.red, 3)}</g>`) +
        H("board", R(14, 14, 372, 272, "#d9b98a", 14) + R(24, 24, 352, 252, "#e7cfa6", 10) +
          D("s0", "M104 74 L200 150", C.red, 2.4) + D("s1", "M296 74 L200 150", C.red, 2.4) + D("s2", "M104 226 L200 150", C.red, 2.4) + D("s3", "M296 226 L200 150", C.red, 2.4) +
          [["22 Guest Hosts", 104, 74], ["65% kiosk use", 296, 74], ["9 always refer", 104, 226], ["2 departures", 296, 226]].map(([t, x, y], i) =>
            H("pin" + i, chip(x, y, t, { sz: 15, bg: C.cream, st: C.ink, fg: C.ink, rx: 4 }) + O(x, y - 15, 5, C.red))).join("") +
          chip(200, 150, "Contradictions", { sz: 16, bg: C.red, st: C.red, fg: C.white })) +
        H("ok", FLOOR() + guestP(78, 214, 1.5) + hostP(140, 214, 1.5) + D("okP", "M178 200 C230 200 250 150 300 150", C.green, 7) +
          okDot(326, 150, 26) + chip(300, 210, "Dependable arrival", { sz: 14, bg: C.green, st: C.green, fg: C.white }) +
          chip(160, 52, "What must change?", { sz: 17, st: C.navy, bg: C.white })),
      render: (c, j) => {
        c.op("ret", j === 0 ? 1 : 0);
        c.op("board", j === 1 ? 1 : 0); c.mv("board", j === 1 ? {} : { s: 0.94 });
        for (let i = 0; i < 4; i++) { c.op("pin" + i, j === 1 ? 1 : 0, { dl: j === 1 ? 0.2 + i * 0.25 : 0 }); c.dr("s" + i, j === 1 ? 1 : 0, { dl: j === 1 ? 0.5 + i * 0.25 : 0, d: 0.6 }); }
        c.op("ok", j === 2 ? 1 : 0); c.dr("okP", j === 2 ? 1 : 0, { dl: 0.4 });
      }
    }
  ];
  VL_SCENES["W10O1a"] = makeScene({ id, panels, bg: "#f4efe6", desc: "A smooth kiosk arrival stops on a rate mismatch; a Guest Host must decide; twenty-two Front Desk Agents become Guest Hosts with a different job; the AED 400 waiver is missing from formal delegation; the People phase, phase 6 of 10, must build roles, authority, capability and measures or the old approvals quietly return." });
  mirror("W10O1a"); SCENE_BG.push([id, "#f4efe6"]);
}

// ============================================================
// W10O1b · "What the People phase must deliver"  (22 narration moments, 8 visuals)
// Story spine: three tempting "proofs" flip over → five connected arrangements → each
// deliverable gets its own visual (role card, key & schedule, scorecard gauges, growing
// capability, adoption streams) → the five stack into one design handed to Develop.
// ============================================================
{
  const id = "W10O1b";
  const COLS = [C.navy, C.amber, C.plum, C.green, C.teal];
  const NAMES = ["Defined roles", "Formal authority", "Aligned measures", "Shown capability", "Tracked adoption"];
  const badge = (n) => O(26, 26, 17, C.orange) + T(26, 32, String(n), 17, C.white);
  const panels = [
    // V1 · moments 0–1 · SVGator animated UI templates (flip cards & toggles) — https://www.svgator.com/blog/animated-ui-templates-you-can-customize/
    // Adapted: three feature cards flip over in sequence to reveal their reverse side while a
    // readiness dial swings back down.
    {
      src: "https://www.svgator.com/blog/animated-ui-templates-you-can-customize/",
      labels: ["What proves readiness?", "Not proof yet"],
      draw: () => {
        let s = mgrP(52, 104, 1.8) + bubble(84, 18, 126, 34, "Ready yet?", 16, C.plum, "bl");
        s += `<path d="M246 104 A60 60 0 0 1 276 52" fill="none" stroke="#e7b9a9" stroke-width="16"/>` +
          `<path d="M276 52 A60 60 0 0 1 336 52" fill="none" stroke="#efd9a8" stroke-width="16"/>` +
          `<path d="M336 52 A60 60 0 0 1 366 104" fill="none" stroke="#b9dcc8" stroke-width="16"/>` +
          K("needle", P("M306 104 V56", C.ink, 5) + O(306, 104, 8, C.ink)) + T(306, 132, "Readiness", 15, C.ink);
        const FR = [["New titles", (x) => R(x - 26, 176, 52, 40, C.sky, 6, `stroke="${C.navy}" stroke-width="2"`) + P(`M${x - 10} 176 L${x} 160 L${x + 10} 176`, C.navy, 2.5) + starI(x, 196, 11, C.gold)],
          ["Kiosks running", (x) => kioskI(x, 232, 0.85, C.mint)],
          ["Training done", (x) => docI(x - 28, 162, 56, 66, C.green, 3) + starI(x + 22, 222, 12, C.gold)]];
        const BK = [["capability"], ["authority"], ["right decisions"]];
        FR.forEach(([t, ic], i) => {
          const x = 75 + i * 125;
          s += `<g data-k="f${i}">${R(x - 59, 146, 118, 146, C.white, 12, `stroke="${C.navy}" stroke-width="2"`)}${ic(x)}${T(x, 274, t, 14, C.navy)}</g>`;
          s += H("b" + i, R(x - 59, 146, 118, 146, C.orange, 12) + noDot(x, 188, 18) + T(x, 240, "Not proof of", 14, C.white) + T(x, 262, BK[i][0], 14, C.white));
        });
        return s;
      },
      render: (c, j) => {
        c.mv("needle", { r: j >= 1 ? -64 : j === 0 ? 34 : -80, pv: [306, 104] }, { d: 1.4, dl: j === 1 ? 1.2 : 0.3, e: "elastic.out(1,0.5)" });
        for (let i = 0; i < 3; i++) {
          const x = 75 + i * 125, f = j >= 1;
          c.mv("f" + i, { sx: f ? 0.02 : 1, y: j < 0 ? 24 : 0, pv: [x, 219] }, { d: 0.35, dl: f ? i * 0.3 : 0.1 * i });
          c.op("f" + i, j < 0 ? 0 : f ? 0 : 1, { d: 0.2, dl: f ? 0.3 + i * 0.3 : 0.1 * i });
          c.mv("b" + i, { sx: f ? 1 : 0.02, pv: [x, 219] }, { d: 0.4, dl: f ? 0.35 + i * 0.3 : 0 });
          c.op("b" + i, f ? 1 : 0, { d: 0.15, dl: f ? 0.33 + i * 0.3 : 0 });
        }
      }
    },
    // V2 · moments 2–3 · Business Strategy Round Infographic (Envato) — https://elements.envato.com/business-strategy-round-infographic-4-steps-templa-ZS2NQ92
    // Adapted: arcs draw clockwise around a ring (five instead of four), each lighting its legend row;
    // the legend then gives way to the twenty-two people the ring must serve.
    {
      src: "https://elements.envato.com/business-strategy-round-infographic-4-steps-templa-ZS2NQ92",
      labels: ["Five connected arrangements", "Twenty-two Guest Hosts"],
      draw: () => {
        const cx = 122, cy = 158, r = 82;
        let s = O(cx, cy, r, "none", `stroke="#e6e1d8" stroke-width="26"`);
        for (let i = 0; i < 5; i++) {
          const a0 = (-90 + i * 72 + 2) * Math.PI / 180, a1 = (-90 + (i + 1) * 72 - 2) * Math.PI / 180;
          s += D("a" + i, `M${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)}`, COLS[i], 26, 'stroke-linecap="butt"');
        }
        s += H("ring0", O(cx, cy - r, 22, "none", `stroke="${C.navy}" stroke-width="3" class="a-pulse"`));
        s += T(cx, cy - 2, "Readiness", 18, C.ink) + T(cx, cy + 20, "needs all five", 14, C.slate);
        s += NAMES.map((t, i) => H("lg" + i, O(250, 64 + i * 42, 9, COLS[i]) + T(266, 69 + i * 42, t, 14, C.ink, "", "start"))).join("");
        s += H("team", chip(316, 34, "22 Guest Hosts", { sz: 14, bg: C.green, st: C.green, fg: C.white }) +
          rep(22, (i) => hostP(252 + (i % 6) * 26, 84 + Math.floor(i / 6) * 38, 0.64)) +
          chip(316, 250, "Support arrivals", { sz: 13, st: C.green, fg: C.green }) + chip(300, 282, "Investigate exceptions", { sz: 13, st: C.orange, fg: C.orange }));
        return s;
      },
      render: (c, j) => {
        for (let i = 0; i < 5; i++) {
          c.dr("a" + i, j >= 0 ? 1 : 0, { d: 0.55, dl: j === 0 ? i * 0.45 : 0 });
          c.op("a" + i, j === 1 && i > 0 ? 0.35 : 1);
          c.op("lg" + i, j === 0 ? 1 : 0, { dl: j === 0 ? 0.3 + i * 0.45 : 0 });
          c.mv("lg" + i, j === 0 ? {} : { x: 20 }, { dl: j === 0 ? 0.3 + i * 0.45 : 0 });
        }
        c.op("ring0", j === 1 ? 1 : 0);
        c.op("team", j === 1 ? 1 : 0); c.mv("team", j === 1 ? {} : { x: 30 });
      }
    },
    // V3 · moments 4–6 · contract process (LottieFiles) — https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8
    // Adapted: a contract-style document fills clause by clause; then the clauses blur and the
    // employee drifts back to old work; finally the document feeds a job-evaluation funnel.
    {
      src: "https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8",
      labels: ["1 · Define the role", "Unclear roles drift", "Review grades properly"],
      draw: () => {
        const F4 = ["The work", "Boundaries", "Reporting line", "Contribution"];
        let s = R(18, 22, 192, 264, C.white, 12, `stroke="${C.navy}" stroke-width="2"`) + R(18, 22, 192, 36, C.navy, 12) + R(18, 46, 192, 12, C.navy) + T(114, 46, "Guest Host role", 15, C.white);
        s += F4.map((t, i) => { const y = 92 + i * 52; return K("fd" + i, okDot(40, y - 5, 10) + T(58, y, t, 15, C.ink, "", "start") + R(58, y + 10, 132, 8, "#e3e8ee", 4) + K("fb" + i, R(58, y + 10, 132, 8, C.navy, 4))) + H("fq" + i, qDot(190, y - 5, 10)); }).join("");
        s += badge(1);
        s += H("me", hostP(310, 206, 2.6) + chip(306, 52, "Step 1 of 5", { sz: 16, bg: C.orange, st: C.orange, fg: C.white }));
        s += H("drift", D("dp", "M220 120 C290 110 330 150 318 200", C.orange, 3) +
          R(252, 236, 132, 16, C.slate, 4) + R(262, 252, 8, 30, C.slate) + R(366, 252, 8, 30, C.slate) + hostP(318, 232, 1.6) +
          chip(306, 60, "Back to old tasks", { sz: 15, st: C.orange, fg: C.orange }));
        s += H("eval", chip(306, 40, "Changed judgement", { sz: 14 }) + chip(306, 76, "More accountability", { sz: 14 }) + arrowV(306, 92, 114, C.slate, 3) +
          chip(306, 136, "Job evaluation", { sz: 16, bg: C.navy, fg: C.white }) + arrowV(306, 152, 176, C.slate, 3) +
          chip(306, 200, "Grade reviewed", { sz: 15, st: C.green, fg: C.green }) + chip(306, 250, "Automatic raise", { sz: 14, st: C.red, fg: C.red }) + P("M242 250 H370", C.red, 3));
        return s;
      },
      render: (c, j) => {
        for (let i = 0; i < 4; i++) {
          c.mv("fb" + i, { sx: j >= 0 ? (j === 1 ? 0.25 : 1) : 0.02, pv: [58, 0] }, { d: 0.7, dl: j === 0 ? 0.3 + i * 0.35 : 0 });
          c.op("fd" + i, j === 1 ? 0.45 : 1);
          c.op("fq" + i, j === 1 ? 1 : 0, { dl: j === 1 ? i * 0.15 : 0 });
        }
        c.op("me", j === 0 ? 1 : 0); c.mv("me", j === 0 ? {} : { x: 30 });
        c.op("drift", j === 1 ? 1 : 0); c.dr("dp", j === 1 ? 1 : 0, { dl: 0.3 });
        c.op("eval", j === 2 ? 1 : 0); c.mv("eval", j === 2 ? {} : { y: -16 });
      }
    },
    // V4 · moments 7–9 · Stripe Connect onboarding quickstart (verification checkpoints) — https://docs.stripe.com/connect/onboarding/quickstart
    // Adapted: a verification step that will not pass (key cannot turn), the official record that
    // is checked, and a protected vs unprotected outcome side by side.
    {
      src: "https://docs.stripe.com/connect/onboarding/quickstart",
      labels: ["2 · Document authority", "Missing from delegation", "Briefing versus boundary"],
      draw: () =>
        badge(2) +
        H("kl", lockI(124, 150, 3.4) + K("key", keyI(0, 0, 2.4)) + H("klq", qDot(166, 98, 14)) + chip(200, 34, "Permission to decide", { sz: 16, bg: C.amber, st: C.amber, fg: C.white }) +
          chip(200, 266, "Permission uncertain", { sz: 15, st: C.red, fg: C.red })) +
        H("sch", envI(22, 74, 150, 92, C.navy) + T(97, 190, "Email instruction", 14, C.navy) +
          R(198, 24, 188, 262, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + R(198, 24, 188, 30, C.navy, 8) + R(198, 46, 188, 8, C.navy) + T(292, 45, "Delegation schedule", 14, C.white) +
          rep(4, (i) => R(214, 72 + i * 24, 156, 9, "#d9e1ea", 4)) + rep(3, (i) => R(214, 216 + i * 24, 140, 9, "#d9e1ea", 4)) +
          R(206, 168, 172, 32, C.peach, 6, `stroke="${C.red}" stroke-width="2.4" stroke-dasharray="6 4"`) + T(292, 189, "AED 400 waiver", 15, C.red) +
          D("ln", "M172 120 C190 140 190 176 204 184", C.orange, 3)) +
        H("must", stampI(110, 250, "Must appear", C.green, -7, 16)) +
        H("cmp", chip(104, 34, "Briefing only", { sz: 15, st: C.slate, fg: C.slate }) + chip(298, 34, "Approved boundary", { sz: 15, st: C.green, fg: C.green }) +
          F("M40 150 Q104 70 168 150", "none", `stroke="${C.slate}" stroke-width="3" stroke-dasharray="7 9"`) + hostP(104, 262, 2.1) +
          `<g class="a-flow">${P("M70 64 L86 214 M136 64 L120 214", C.orange, 3)}</g>` +
          shieldI(298, 150, 3.4, C.green, tick(0, 0, 1.3, C.white, 3.5)) + hostP(298, 268, 1.8) +
          P("M240 70 L262 100 L236 104 M356 70 L334 100 L360 104", C.orange, 3) + P("M200 40 V292", C.muted, 2, 'stroke-dasharray="4 6"')),
      render: (c, j) => {
        c.op("kl", j === 0 ? 1 : 0);
        c.mv("key", j >= 0 ? { x: 236, y: 152 } : { x: 330, y: 152 }, { d: 1.2, e: "power2.out" });
        c.op("klq", j === 0 ? 1 : 0, { dl: 1.1 });
        c.op("sch", j === 1 ? 1 : 0); c.dr("ln", j === 1 ? 1 : 0, { dl: 0.5 });
        c.op("must", j === 1 ? 1 : 0, { dl: j === 1 ? 1.1 : 0 }); c.mv("must", j === 1 ? {} : { s: 1.5 }, { dl: j === 1 ? 1.1 : 0 });
        c.op("cmp", j === 2 ? 1 : 0);
      }
    },
    // V5 · moments 10–13 · Arc tween (Observable/D3) — https://observablehq.com/@d3/arc-tween
    // Adapted: four gauge arcs tween to new values as the scorecard changes; the old speed gauge
    // finally drops while the new resolution gauge rises.
    {
      src: "https://observablehq.com/@d3/arc-tween",
      labels: ["3 · Old measures", "Recognise the new work", "Measures support contribution", "Good work, poor score"],
      draw: () => {
        const G = [[110, 112, "Check-ins", C.navy], [290, 112, "Speed", C.navy], [110, 240, "Guest assistance", C.green], [290, 240, "Exceptions resolved", C.green]];
        let s = badge(3);
        G.forEach(([x, y, t, col], i) => {
          s += K("g" + i, P(gaugeArc(x, y, 52, 1), "#e4e0d8", 16) + D("v" + i, gaugeArc(x, y, 52, 1), col, 16, 'stroke-linecap="butt"') + T(x, y + 24, t, 14, col) + O(x, y, 6, col));
        });
        s += D("vR", gaugeArc(290, 112, 52, 1), C.red, 16, 'stroke-linecap="butt"');
        s += chip(200, 22, "Old scorecard", { sz: 15, bg: C.navy, fg: C.white });
        s += H("band", chip(200, 162, "Redesigned contribution", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
        s += H("q2", qDot(110, 222, 11) + qDot(290, 222, 11));
        s += H("al", P("M168 222 Q200 196 232 222", C.green, 3) + P("M200 176 V192", C.green, 3));
        s += H("poor", stampI(290, 86, "Poor score", C.red, -8, 15));
        return s;
      },
      render: (c, j) => {
        const V = [[0.85, 0.82, 0, 0], [0.85, 0.82, 0.04, 0.04], [0.85, 0.82, 0.8, 0.78], [0.85, 0.2, 0.8, 0.9]][Math.max(0, j)] || [0, 0, 0, 0];
        for (let i = 0; i < 4; i++) {
          c.dr("v" + i, j < 0 ? 0 : V[i], { d: 1.2, dl: i >= 2 && j === 1 ? 0.3 : 0 });
          c.op("g" + i, i < 2 ? (j === 2 ? 0.4 : 1) : (j >= 1 ? 1 : 0), { dl: i >= 2 && j === 1 ? 0.2 : 0 });
        }
        c.op("v1", j === 3 ? 0 : 1, { d: 0.4 });
        c.dr("vR", j === 3 ? 0.2 : 0.82, { d: 0.9 }); c.op("vR", j === 3 ? 1 : 0, { d: 0.4 });
        c.vis({ band: j >= 1, q2: j === 1, al: j === 2, poor: j === 3 });
        c.mv("poor", j === 3 ? {} : { s: 1.5 }, { dl: j === 3 ? 0.9 : 0 });
      }
    },
    // V6 · moments 14–16 · GSAP SVG Research — plant growth (CodePen) — https://codepen.io/FabioG/post/svg-animation-research-gsap
    // Adapted: an empty pot, then a stem that grows and leaves that unfold with each practice cycle;
    // finally an attendance sheet that cannot tell us how tall the plant has grown.
    {
      src: "https://codepen.io/FabioG/post/svg-animation-research-gsap",
      labels: ["4 · Responsibility isn't skill", "Practise and assess", "Attendance isn't ability"],
      draw: () => {
        const leaf = (x, y, dir) => F(`M${x} ${y} Q${x + dir * 26} ${y - 26} ${x + dir * 50} ${y - 6} Q${x + dir * 26} ${y + 10} ${x} ${y} Z`, C.green);
        let s = badge(4) + F("M262 254 H338 L328 292 H272 Z", "#b0693f") + R(258, 248, 84, 10, "#c97b4c", 3);
        s += D("stem", "M300 250 C300 220 290 196 300 160 C308 132 298 108 300 84", C.green, 6);
        s += H("lf0", leaf(298, 214, -1)) + H("lc0", chip(222, 206, "Investigate", { sz: 14, st: C.green, fg: C.green }));
        s += H("lf1", leaf(302, 172, 1)) + H("lc1", chip(350, 160, "Judgement", { sz: 14, st: C.green, fg: C.green }));
        s += H("lf2", leaf(299, 122, -1)) + H("lc2", chip(232, 112, "Escalate wisely", { sz: 13, st: C.green, fg: C.green }));
        s += H("empty", chip(300, 200, "Skill not given", { sz: 15, st: C.red, fg: C.red }));
        s += H("me", hostP(84, 250, 2.4));
        s += H("box", chip(0, 0, "New responsibility", { sz: 14, bg: C.amber, st: C.amber, fg: C.white }));
        s += H("cyc", chip(118, 62, "Realistic practice", { sz: 14 }) + arrowV(118, 78, 94, C.slate, 2.5) + chip(118, 112, "Feedback", { sz: 14 }) + arrowV(118, 128, 144, C.slate, 2.5) +
          chip(118, 162, "Assessment", { sz: 14, bg: C.navy, fg: C.white }) + `<g class="a-flow">${P("M172 162 Q236 170 262 196", C.teal, 3)}</g>`);
        s += H("att", R(20, 34, 160, 214, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + R(20, 34, 160, 30, C.navy, 8) + R(20, 56, 160, 8, C.navy) + T(100, 55, "Attendance", 15, C.white) +
          rep(22, (i) => tick(44 + (i % 4) * 36, 84 + Math.floor(i / 4) * 27, 0.8, C.green, 3)) + chip(100, 276, "All attended", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
        s += H("fog", E(300, 170, 78, 110, "rgba(244,239,230,.86)") + T(300, 190, "?", 64, C.orange) + chip(300, 40, "Ability unknown", { sz: 15, st: C.orange, fg: C.orange }) + arrowH(186, 150, 214, C.slate, 3));
        return s;
      },
      render: (c, j) => {
        const g = j >= 1;
        c.dr("stem", g ? 1 : 0, { d: 1.4, dl: 0.2 });
        ["lf0", "lf1", "lf2"].forEach((k, i) => { c.op(k, g ? 1 : 0, { dl: g && j === 1 ? 0.8 + i * 0.4 : 0 }); c.mv(k, g ? {} : { s: 0.3 }, { dl: g && j === 1 ? 0.8 + i * 0.4 : 0, e: "back.out(1.8)" }); c.op("lc" + i, j === 1 ? 1 : 0, { dl: j === 1 ? 1 + i * 0.4 : 0 }); });
        c.op("empty", j === 0 ? 1 : 0, { dl: j === 0 ? 0.8 : 0 });
        c.op("me", j >= 0 && j < 2 ? 1 : 0);
        c.op("box", j === 0 ? 1 : 0); c.mv("box", j === 0 ? { x: 112, y: 176 } : { x: 300, y: 60 }, { d: 1.2, e: "power2.out" });
        c.op("cyc", j === 1 ? 1 : 0); c.mv("cyc", j === 1 ? {} : { y: -16 });
        c.op("att", j === 2 ? 1 : 0); c.mv("att", j === 2 ? {} : { x: -30 });
        c.op("fog", j === 2 ? 1 : 0, { dl: j === 2 ? 0.6 : 0 });
      }
    },
    // V7 · moments 17–18 · Sankey animation – particles generation (Observable) — https://observablehq.com/@joaormendes/sankey-animation-particles-generation
    // Adapted: particles emitted from one source choose weighted routes; an owner inspects the
    // thinner alternative route.
    {
      src: "https://observablehq.com/@joaormendes/sankey-animation-particles-generation",
      labels: ["5 · Track adoption", "Own the evidence"],
      draw: () =>
        badge(5) +
        D("up", "M144 150 C210 150 214 84 258 84", C.green, 26, 'stroke-linecap="butt"') + D("dn", "M144 150 C210 150 214 218 258 218", C.orange, 12, 'stroke-linecap="butt"') +
        H("pts", `<g class="a-stream">${P("M144 150 C210 150 214 84 258 84", C.white, 6)}${P("M144 150 C210 150 214 218 258 218", C.white, 5)}</g>`) +
        chip(78, 150, "Real arrivals", { sz: 15, bg: C.navy, fg: C.white }) +
        H("dst", chip(324, 84, "Redesigned path", { sz: 13, st: C.green, fg: C.green }) + chip(324, 218, "Alternative path", { sz: 13, st: C.orange, fg: C.orange })) +
        H("why", qDot(210, 252, 13) + chip(300, 268, "Why this path?", { sz: 14, st: C.orange, fg: C.orange })) +
        H("own", magI(216, 206, 22, C.ink) + person(150, 262, 1.6, C.navy) + starI(150, 224, 9, C.gold) + chip(60, 268, "Named owner", { sz: 13 }) +
          chip(132, 34, "Explain deviations", { sz: 14 }) + chip(306, 34, "Coordinate action", { sz: 14 })),
      render: (c, j) => {
        c.dr("up", j >= 0 ? 1 : 0, { d: 1.1 }); c.dr("dn", j >= 0 ? 1 : 0, { d: 1.1, dl: 0.3 });
        c.op("pts", j >= 0 ? 1 : 0, { dl: 1 });
        c.op("dst", j >= 0 ? 1 : 0, { dl: 0.9 });
        c.op("why", j === 0 ? 1 : 0, { dl: 1.3 });
        c.op("own", j === 1 ? 1 : 0); c.mv("own", j === 1 ? {} : { y: 20 });
      }
    },
    // V8 · moments 19–21 · The Process Architectural Motion (Behance) — https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion
    // Adapted: isometric layers build up into one structure that connects to the next phase; then
    // the paperwork is weighed against evidence and the whole team lights up.
    {
      src: "https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion",
      labels: ["Connect with Develop", "Evidence, not documents", "Consistent everyday work"],
      draw: () => {
        const cx = 116, A = 88, B = 28, TH = 14;
        const slab = (y, col) => F(`M${cx - A} ${y} L${cx} ${y + B} L${cx} ${y + B + TH} L${cx - A} ${y + TH} Z`, col, 'opacity=".72"') +
          F(`M${cx} ${y + B} L${cx + A} ${y} L${cx + A} ${y + TH} L${cx} ${y + B + TH} Z`, col, 'opacity=".9"') +
          F(`M${cx - A} ${y} L${cx} ${y - B} L${cx + A} ${y} L${cx} ${y + B} Z`, col, `stroke="${C.white}" stroke-width="1.5"`);
        let s = "";
        [236, 204, 172, 140, 108].forEach((y, i) => { s += H("sl" + i, slab(y, COLS[i])); });
        s += H("stk", chip(cx, 42, "One people design", { sz: 15, bg: C.ink, st: C.ink, fg: C.white }));
        s += H("dev", `<g class="a-spin">${gear(310, 144, 46, C.navy, C.sky)}</g>` + chip(310, 222, "Develop phase", { sz: 16, bg: C.navy, fg: C.white }) + D("cn", "M212 150 H252", C.ink, 4) + F("M258 150 l-10 -7 v14 Z", C.ink));
        s += H("docs", rep(4, (i) => docI(32 + i * 10, 64 + i * 12, 118, 140, C.slate, 5, C.white)) + noDot(150, 84, 16) + chip(104, 266, "Approved documents", { sz: 14, st: C.slate, fg: C.slate }));
        s += H("ev", P(gaugeArc(300, 186, 70, 1), "#e4e0d8", 18) + P(gaugeArc(300, 186, 70, 0.86), C.green, 18) + P("M300 186 L352 146", C.ink, 5) + O(300, 186, 9, C.ink) + okDot(300, 100, 16) +
          chip(300, 232, "Operating evidence", { sz: 14, st: C.green, fg: C.green }) + P("M200 50 V280", C.muted, 2, 'stroke-dasharray="4 6"'));
        s += H("team", chip(200, 28, "Consistent everyday work", { sz: 15, bg: C.green, st: C.green, fg: C.white }) +
          rep(22, (i) => hostP(30 + (i % 11) * 34, 102 + Math.floor(i / 11) * 64, 0.95)) +
          rep(22, (i) => H("tk" + i, okDot(30 + (i % 11) * 34, 70 + Math.floor(i / 11) * 64, 8))) +
          chip(200, 268, "Which gap hurts most?", { sz: 15, st: C.orange, fg: C.orange }));
        return s;
      },
      render: (c, j) => {
        for (let i = 0; i < 5; i++) { c.op("sl" + i, j === 0 ? 1 : 0, { dl: j === 0 ? i * 0.22 : 0 }); c.mv("sl" + i, j === 0 ? {} : { y: -40 }, { d: 0.8, dl: j === 0 ? i * 0.22 : 0, e: "bounce.out" }); }
        c.op("stk", j === 0 ? 1 : 0, { dl: j === 0 ? 1.2 : 0 });
        c.op("dev", j === 0 ? 1 : 0, { dl: j === 0 ? 0.9 : 0 }); c.dr("cn", j === 0 ? 1 : 0, { dl: 1.3 });
        c.op("docs", j === 1 ? 1 : 0); c.op("ev", j === 1 ? 1 : 0, { dl: j === 1 ? 0.4 : 0 });
        c.op("team", j === 2 ? 1 : 0);
        for (let i = 0; i < 22; i++) c.op("tk" + i, j === 2 ? 1 : 0, { dl: j === 2 ? 0.4 + i * 0.05 : 0 });
      }
    }
  ];
  VL_SCENES["W10O1b"] = makeScene({ id, panels, bg: "#f2f0ea", desc: "Titles, kiosks and training flip over as not proof of readiness; five connected arrangements form a ring; a role card, a delegation schedule, scorecard gauges, a growing capability plant and adoption streams show each deliverable; together they stack into one people design handed to Develop." });
  mirror("W10O1b"); SCENE_BG.push([id, "#f2f0ea"]);
}

// ============================================================
// W10O1c · "Who does the work, and who answers for it?"  (24 narration moments, 9 visuals)
// Story spine: a guest is passed between lanes → R, A, C, I each get a stage of their own →
// Qasr's RACI matrix exposes a missing accountable owner → RACI (ownership) and formal
// delegation (permission) must agree before handoffs become understandable.
// ============================================================
{
  const id = "W10O1c";
  const TILE = [["R", "Responsible", C.navy], ["A", "Accountable", C.orange], ["C", "Consulted", C.green], ["I", "Informed", C.plum]];
  const tile = (x, y, s, i) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-34, -34, 68, 68, TILE[i][2], 14)}${T(0, 15, TILE[i][0], 42, C.white)}</g>`;
  const EXTRA = `
.vls-w10-W10O1c .a-ping{transform-box:view-box;animation:vlsw10O1cPing 3.6s ease-in-out infinite}
@keyframes vlsw10O1cPing{0%,100%{transform:translate(0,0)}25%{transform:translate(70px,86px)}50%{transform:translate(140px,172px)}75%{transform:translate(70px,86px)}}
@media (prefers-reduced-motion:reduce){.vls-w10-W10O1c .a-ping{animation:none}}`;
  const panels = [
    // V1 · moments 0–2 · SaaS Platform & Workflow Motion UI Concept (Dribbble) — https://dribbble.com/shots/27719724-SaaS-Platform-Workflow-Motion-UI-Concept
    // Adapted: cards transition between role lanes; here one guest case crosses three lanes and
    // keeps bouncing because no lane owns the final answer.
    {
      src: "https://dribbble.com/shots/27719724-SaaS-Platform-Workflow-Motion-UI-Concept",
      labels: ["One guest, one answer", "Several functions involved", "Passed between people"],
      draw: () => {
        const LN = [["Guest", "Host", C.green, 22], ["Revenue", "policy", C.amber, 108], ["Manager", "authority", C.plum, 194]];
        let s = LN.map(([a, b, col, y], i) => K("ln" + i, R(10, y, 380, 80, "rgba(255,255,255,.6)", 12, `stroke="${col}" stroke-width="2"`) + R(10, y, 98, 80, col, 12) + R(96, y, 12, 80, col) +
          T(59, y + 36, a, 15, C.white) + T(59, y + 56, b, 15, C.white))).join("");
        s += H("meet", guestP(150, 96, 1.5) + hostP(226, 96, 1.5) + bubble(252, 28, 134, 34, "One clear answer", 13, C.navy, "bl"));
        s += H("ic1", F("M300 124 h44 v44 h-44 Z", C.white, `stroke="${C.amber}" stroke-width="2"`) + T(322, 154, "%", 22, C.amber) + mgrP(220, 270, 1.5) + chip(314, 236, "Authority?", { sz: 14, st: C.plum, fg: C.plum }));
        s += H("case", chip(0, 0, "Rate case", { sz: 14, bg: C.orange, st: C.orange, fg: C.white }));
        s += D("hop", "M300 70 C340 90 236 120 236 148", C.orange, 3);
        s += H("zig", P("M128 62 L184 148 L240 234 L296 148 L352 62", C.red, 3, 'stroke-dasharray="6 5"') + qDot(184, 132, 12, C.red) + qDot(240, 218, 12, C.red) + qDot(352, 46, 12, C.red) +
          clock(352, 128, 16, C.red) + `<g class="a-ping">${chip(140, 62, "Rate case", { sz: 14, bg: C.orange, st: C.orange, fg: C.white })}</g>`);
        return s;
      },
      render: (c, j) => {
        for (let i = 0; i < 3; i++) c.op("ln" + i, j <= 0 && i > 0 ? 0.35 : 1);
        c.op("meet", j === 0 ? 1 : j === 1 ? 0.35 : 0);
        c.op("ic1", j === 1 ? 1 : 0);
        c.op("case", j === 1 ? 1 : 0); c.mv("case", j === 1 ? { x: 236, y: 148 } : { x: 300, y: 64 }, { d: 1.3, dl: 0.3, e: "power2.inOut" });
        c.dr("hop", j === 1 ? 1 : 0, { dl: 0.2 });
        c.op("zig", j === 2 ? 1 : 0);
      }
    },
    // V2 · moments 3–5 · Multi-Step Icon Animation (LottieFiles) — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
    // Adapted: four step-tiles activate one after another, then shrink into a legend while the
    // first step (R) plays out underneath.
    {
      src: "https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU",
      labels: ["Four RACI contributions", "R · Responsible performs", "Doing isn't deciding"],
      draw: () =>
        H("hd", chip(200, 30, "Four RACI contributions", { sz: 16, bg: C.navy, fg: C.white })) +
        TILE.map((t, i) => K("t" + i, tile(62 + i * 92, 128, 1.15, i), 'style="opacity:0"') + H("w" + i, T(62 + i * 92, 192, t[1], 14, t[2]))).join("") +
        H("rwork", hostP(98, 262, 2.3) + docI(160, 196, 70, 84, C.navy, 4) + K("mg", magI(206, 222, 20, C.ink)) +
          chip(310, 190, "Investigates rate", { sz: 15 }) + chip(310, 236, "Gathers evidence", { sz: 15 })) +
        H("gap", chip(300, 120, "Policy decisions", { sz: 15, st: C.plum, fg: C.plum }) + lockI(300, 170, 1.7, C.plum) +
          P("M150 214 L262 134", C.red, 3, 'stroke-dasharray="6 5"') + noDot(206, 174, 13)),
      render: (c, j) => {
        const big = j <= 0;
        c.op("hd", j === 0 ? 1 : 0);
        for (let i = 0; i < 4; i++) {
          c.op("t" + i, j < 0 ? 0 : big ? 1 : (i === 0 ? 1 : 0.35), { dl: j === 0 ? i * 0.3 : 0 });
          c.mv("t" + i, j < 0 ? { y: 20, s: 0.7 } : big ? {} : { x: (30 + i * 52) - (62 + i * 92), y: 42 - 128, s: 0.5 }, { d: 0.9, dl: j === 0 ? i * 0.3 : 0, e: big ? "back.out(1.6)" : "power3.inOut" });
          c.op("w" + i, j === 0 ? 1 : 0, { dl: j === 0 ? 0.2 + i * 0.3 : 0 });
        }
        c.op("rwork", j >= 1 ? 1 : 0); c.mv("mg", j === 1 ? { x: 6, y: -6 } : {}, { d: 1.4 });
        c.op("gap", j === 2 ? 1 : 0);
      }
    },
    // V3 · moments 6–9 · Transition end (Observable/D3) — https://observablehq.com/@d3/transition-end
    // Adapted: chained transitions (move → wait → recolour): the owner settles above the decision,
    // contributors gather, a second owner arrives and the decision shakes, then the guest waits.
    {
      src: "https://observablehq.com/@d3/transition-end",
      labels: ["A · Accountable answers", "One accountable owner", "Two owners collide", "The guest waits again"],
      draw: () =>
        tile(36, 36, 0.62, 1) +
        H("ans", chip(240, 30, "Ultimately answerable", { sz: 15, st: C.orange, fg: C.orange })) +
        K("dec", chip(200, 166, "Rate decision", { sz: 18, bg: C.white, st: C.ink, fg: C.ink })) +
        K("own", mgrP(0, 0, 1.9) + starI(0, -44, 10, C.gold), 'style="opacity:0"') +
        D("gl", "M200 104 V146", C.gold, 5) +
        H("one", chip(302, 122, "One accountable role", { sz: 13, bg: C.gold, st: C.amber, fg: C.ink })) +
        H("crowd", person(84, 248, 1.4, C.slate) + person(200, 266, 1.4, C.slate) + person(316, 248, 1.4, C.slate) + P("M100 232 L180 182 M200 244 V184 M300 232 L220 182", C.muted, 2)) +
        H("two", mgrP(320, 120, 1.9) + starI(320, 76, 10, C.gold) + bubble(64, 30, 104, 32, "Waive it", 15, C.plum, "bl") + bubble(232, 30, 104, 32, "Refer it", 15, C.red, "br") +
          `<g class="a-flow">${P("M102 144 L128 160 M298 144 L272 160", C.red, 4)}</g>`) +
        H("wait", guestP(54, 270, 1.4) + hostP(118, 270, 1.4) + clock(178, 246, 18, C.red) + chip(300, 262, "Another delay", { sz: 16, bg: C.red, st: C.red, fg: C.white })),
      render: (c, j) => {
        const two = j >= 2;
        c.op("ans", j === 0 ? 1 : 0);
        c.op("own", j >= 0 ? 1 : 0); c.mv("own", two ? { x: 80, y: 120 } : { x: 200, y: 84 }, { d: 1 });
        c.dr("gl", j >= 0 && !two ? 1 : 0, { dl: 0.5 });
        c.op("one", j === 1 ? 1 : 0); c.op("crowd", j === 1 ? 1 : 0);
        c.op("two", two ? (j === 3 ? 0.6 : 1) : 0);
        c.mv("dec", two ? { r: j === 2 ? 4 : -3 } : {}, { d: 0.25 });
        c.op("wait", j === 3 ? 1 : 0); c.mv("wait", j === 3 ? {} : { y: 20 });
      }
    },
    // V4 · moments 10–11 · Workflow Animation (Dribbble) — https://dribbble.com/shots/3791748-Workflow-Animation
    // Adapted: an event token travels from stage to stage and triggers a notification; here advice
    // flows from the revenue manager to the decision owner, while ownership stays put.
    {
      src: "https://dribbble.com/shots/3791748-Workflow-Animation",
      labels: ["C · Consulted advises", "Advice keeps ownership"],
      draw: () =>
        tile(36, 36, 0.62, 2) +
        hostP(72, 236, 1.9) + chip(72, 280, "Guest Host", { sz: 14, st: C.green, fg: C.green }) +
        mgrP(200, 92, 1.9, C.navy) + chip(200, 138, "Revenue manager", { sz: 14 }) +
        mgrP(328, 236, 1.9) + starI(328, 192, 10, C.gold) + chip(328, 280, "Decision owner", { sz: 14, st: C.plum, fg: C.plum }) +
        D("f1", "M96 210 Q120 130 156 110", C.slate, 3) + D("f2", "M246 110 Q286 130 306 206", C.green, 4) +
        H("adv", `<g class="a-flow">${P("M246 110 Q286 130 306 206", C.white, 3)}</g>` + bubble(250, 40, 112, 32, "Rate policy", 14, C.green, "bl")) +
        H("still", chip(310, 166, "Still accountable", { sz: 13, bg: C.gold, st: C.amber, fg: C.ink }) + P("M290 230 Q200 200 190 160", C.red, 3, 'stroke-dasharray="5 5"') + noDot(220, 196, 12)),
      render: (c, j) => {
        c.dr("f1", j >= 0 ? 1 : 0); c.dr("f2", j >= 0 ? 1 : 0, { dl: 0.5 });
        c.op("adv", j >= 0 ? 1 : 0, { dl: j === 0 ? 0.9 : 0 });
        c.op("still", j === 1 ? 1 : 0); c.mv("still", j === 1 ? {} : { s: 0.8 });
      }
    },
    // V5 · moments 12–13 · Dashboard (LottieFiles) — https://lottiefiles.com/free-animation/dashboard-M05MmlnoOP
    // Adapted: a notification lands on a dashboard whose graph fills and whose key metric is
    // highlighted — information arrives without creating another approval gate.
    {
      src: "https://lottiefiles.com/free-animation/dashboard-M05MmlnoOP",
      labels: ["I · Informed receives", "Visibility, not approval"],
      draw: () =>
        tile(36, 36, 0.62, 3) +
        okDot(78, 136, 28) + chip(78, 192, "Decision made", { sz: 15, st: C.green, fg: C.green }) +
        H("waves", `<g class="a-blink">${P("M126 120 Q138 136 126 152 M142 110 Q160 136 142 162 M158 100 Q182 136 158 172", C.plum, 3)}</g>`) +
        R(210, 30, 178, 150, C.white, 12, `stroke="${C.plum}" stroke-width="2.5"`) + T(299, 54, "Exception patterns", 14, C.plum) + P("M226 160 H372", C.muted, 2) +
        rep(6, (i) => K("bar" + i, R(232 + i * 24, 70, 16, 88, i === 4 ? C.orange : C.plum, 3))) +
        mgrP(300, 258, 1.8) + chip(300, 198, "Senior manager", { sz: 14, st: C.plum, fg: C.plum }) +
        H("nogate", R(40, 228, 132, 54, "none", 8, `stroke="${C.slate}" stroke-width="3" stroke-dasharray="6 5"`) + T(106, 252, "Approval", 14, C.slate) + T(106, 270, "step", 14, C.slate) + P("M34 222 L178 288", C.red, 4)),
      render: (c, j) => {
        const H6 = [0.35, 0.55, 0.4, 0.7, 0.95, 0.5];
        c.op("waves", j >= 0 ? 1 : 0);
        for (let i = 0; i < 6; i++) c.mv("bar" + i, { sy: j >= 0 ? (j === 1 ? H6[i] : 0.15) : 0.02, pv: [0, 158] }, { d: 0.9, dl: i * 0.08 });
        c.op("nogate", j === 1 ? 1 : 0);
      }
    },
    // V6 · moments 14–16 · Hierarchy traversal animated (Observable/D3) — https://old.observablehq.com/@d3/hierarchy-traversal-animated
    // Adapted: nodes are visited one after another; here columns, then rows of the RACI exhibit
    // are visited in order and every accountable cell is finally checked.
    {
      src: "https://old.observablehq.com/@d3/hierarchy-traversal-animated",
      labels: ["Qasr's RACI roles", "Six key activities", "One owner per activity"],
      draw: () => {
        const W = [56, 44, 40, 50, 44], X0 = 162;
        const cx = W.map((w, i) => X0 + W.slice(0, i).reduce((a, b) => a + b, 0) + w / 2);
        const HD = [["Process", "owner"], ["Front", "desk"], ["IT", ""], ["Revenue", "manager"], ["COO", ""]];
        const ROWS = ["Define standards", "Approve redesign", "Build workflows", "Run operations", "Monitor performance", "Escalate exceptions"];
        const M = [["A", "R", "C", "C", "I"], ["R", "C", "C", "C", "A"], ["C", "C", "R", "C", "I"], ["A", "R", "C", "I", "I"], ["A", "C", "R", "I", "I"], ["A", "R", "", "C", "I"]];
        const COLR = { R: C.navy, A: C.orange, C: C.green, I: C.plum };
        let s = HD.map(([a, b], i) => H("hc" + i, T(cx[i], 26, a, 13, C.ink) + (b ? T(cx[i], 42, b, 13, C.ink) : ""))).join("");
        s += H("trav", R(6, -14, 388, 30, "rgba(229,183,108,.35)", 6));
        ROWS.forEach((t, r) => {
          const y = 74 + r * 34;
          s += H("rl" + r, T(10, y + 5, t, 13, C.ink, "", "start"));
          s += K("rc" + r, M[r].map((v, i) => v ? R(cx[i] - 15, y - 12, 30, 24, COLR[v], 6) + T(cx[i], y + 6, v, 15, C.white) : R(cx[i] - 15, y - 12, 30, 24, "none", 6, `stroke="${C.muted}" stroke-width="1.4" stroke-dasharray="3 3"`)).join(""), 'style="opacity:0"');
          const ai = M[r].indexOf("A");
          if (ai >= 0) s += H("ga" + r, R(cx[ai] - 19, y - 16, 38, 32, "none", 8, `stroke="${C.gold}" stroke-width="3.5"`));
        });
        s += H("bad", R(6, 74 + 2 * 34 - 16, 388, 32, "none", 6, `stroke="${C.red}" stroke-width="2.4" stroke-dasharray="6 4"`));
        s += H("ill", chip(200, 282, "Illustrative assignments", { sz: 14, st: C.slate, fg: C.slate }));
        s += H("one", chip(200, 282, "One A per activity", { sz: 15, bg: C.orange, st: C.orange, fg: C.white }));
        return s;
      },
      render: (c, j) => {
        for (let i = 0; i < 5; i++) c.op("hc" + i, j >= 0 ? 1 : 0, { dl: j === 0 ? i * 0.25 : 0 });
        for (let r = 0; r < 6; r++) {
          c.op("rl" + r, j >= 0 ? 1 : 0, { dl: j === 0 ? 0.8 + r * 0.12 : 0 });
          c.op("rc" + r, j >= 1 ? 1 : 0, { dl: j === 1 ? r * 0.4 : 0 });
          c.mv("rc" + r, j >= 1 ? {} : { x: 16 }, { dl: j === 1 ? r * 0.4 : 0 });
          c.op("ga" + r, j === 2 ? 1 : 0, { dl: j === 2 ? r * 0.15 : 0 });
        }
        c.op("trav", j === 1 ? 1 : 0); c.mv("trav", { y: j === 1 ? 74 + 5 * 34 : 74 }, { d: 2.4, e: "steps(6)" });
        c.op("bad", j === 2 ? 1 : 0, { dl: j === 2 ? 1 : 0 });
        c.op("ill", j >= 0 && j < 2 ? 1 : 0); c.op("one", j === 2 ? 1 : 0);
      }
    },
    // V7 · moments 17–18 · Supply chain design animation (Behance) — https://www.behance.net/gallery/7392601/Supply-chain-design-animation
    // Adapted: sites appear on a planning grid and links are calculated between them; then two
    // networks are overlaid to compare them (old hierarchy vs redesigned process).
    {
      src: "https://www.behance.net/gallery/7392601/Supply-chain-design-animation",
      labels: ["Missing accountable owner", "Follow the process"],
      draw: () => {
        const ST = [[55, "Workflow", "requirements", C.navy], [150, "Responsible", "builder", C.navy], [250, "Accountable", "owner", C.red], [345, "Approval", "unclear", C.slate]];
        let s = H("flow", P("M55 140 H345", C.muted, 4, 'stroke-dasharray="2 8"') +
          ST.map(([x, a, b, col], i) => (i === 2 ? O(x, 140, 32, C.peach, `stroke="${C.red}" stroke-width="3" stroke-dasharray="6 5"`) + T(x, 152, "?", 32, C.red) : O(x, 140, 30, col) + (i === 0 ? docI(x - 13, 124, 26, 32, C.white, 2, C.sky) : i === 1 ? person(x, 150, 1, C.white) : T(x, 150, "?", 28, C.white))) +
            T(x, 196, a, 14, col) + T(x, 213, b, 14, col)).join("") +
          D("fl", "M85 140 H120 M180 140 H218 M282 140 H315", C.navy, 4) + stampI(250, 64, "No accountable owner", C.red, -5, 16) + chip(200, 262, "Workflow building", { sz: 15, bg: C.navy, fg: C.white }));
        s += H("cmp", chip(104, 30, "Old hierarchy", { sz: 15, st: C.red, fg: C.red }) + chip(300, 30, "Follow the process", { sz: 15, st: C.green, fg: C.green }) +
          R(80, 64, 48, 28, C.slate, 5) + [40, 104, 168].map((x) => R(x - 22, 128, 44, 26, C.slate, 5)).join("") + [40, 104, 168].map((x) => R(x - 22, 192, 44, 26, C.muted, 5)).join("") +
          P("M104 92 V110 M40 110 H168 M40 110 V128 M104 110 V128 M168 110 V128 M40 154 V192 M104 154 V192 M168 154 V192", C.slate, 2) +
          `<g class="a-flow">${P("M62 206 Q72 170 92 140 Q116 104 128 142 Q140 180 150 206 Q160 230 168 218", C.red, 3)}</g>` + chip(104, 268, "Many handoffs", { sz: 14, bg: C.red, st: C.red, fg: C.white }) +
          P("M200 50 V286", C.muted, 2, 'stroke-dasharray="4 6"') +
          [228, 280, 332, 378].map((x, i) => O(x, 150, 15, C.green) + (i < 3 ? arrowH(x + 17, 150, x + 34, C.green, 3) : "")).join("") + guestP(228, 112, 0.9) + okDot(378, 112, 11) +
          chip(300, 268, "Fewer handoffs", { sz: 14, bg: C.green, st: C.green, fg: C.white }));
        return s;
      },
      render: (c, j) => {
        c.op("flow", j === 0 ? 1 : 0); c.dr("fl", j === 0 ? 1 : 0, { dl: 0.3 });
        c.op("cmp", j === 1 ? 1 : 0); c.mv("cmp", j === 1 ? {} : { s: 0.95 });
      }
    },
    // V8 · moments 19–21 · Action Security Systems – Infographic & Motion Design (Behance) — https://www.behance.net/gallery/104646575/Action-Security-Systems-Infographic-Motion-Design
    // Adapted: risks are revealed, then the control that answers each one; here cases are sorted
    // into local vs escalate, RACI is shown as ownership only, and delegation draws the boundary.
    {
      src: "https://www.behance.net/gallery/104646575/Action-Security-Systems-Infographic-Motion-Design",
      labels: ["Local or escalate?", "RACI isn't permission", "Delegation sets boundaries"],
      draw: () =>
        H("sort", hostP(200, 160, 2.3) + R(26, 222, 144, 64, C.mint, 10, `stroke="${C.green}" stroke-width="2.5"`) + T(98, 262, "Resolve locally", 15, C.green) +
          R(230, 222, 144, 64, C.peach, 10, `stroke="${C.orange}" stroke-width="2.5"`) + T(302, 262, "Escalate", 15, C.orange) +
          K("cA", chip(0, 0, "Eligible ≤ AED 400", { sz: 14, st: C.green, fg: C.green })) + K("cB", chip(0, 0, "Above AED 400", { sz: 14, st: C.orange, fg: C.orange }))) +
        H("raci", R(18, 40, 170, 186, C.white, 12, `stroke="${C.navy}" stroke-width="2.5"`) + T(103, 70, "RACI", 22, C.navy) +
          rep(4, (i) => R(36 + i * 36, 90, 28, 22, TILE[i][2], 5) + T(50 + i * 36, 106, TILE[i][0], 14, C.white)) +
          rep(3, (r) => rep(4, (i) => R(36 + i * 36, 120 + r * 30, 28, 20, "#e3e8ee", 5))) + chip(103, 252, "Who owns it", { sz: 15 }) +
          chip(103, 286, "Not permission", { sz: 14, st: C.red, fg: C.red })) +
        H("dlg", chip(298, 40, "Formal delegation", { sz: 15, bg: C.navy, fg: C.white }) + O(298, 150, 76, "rgba(49,124,97,.1)", `stroke="${C.green}" stroke-width="3" stroke-dasharray="8 6"`) +
          hostP(298, 152, 1.6) + T(298, 196, "Permitted decisions", 13, C.green) + arrowH(374, 150, 396, C.orange, 3) + chip(298, 262, "Authorised boundary", { sz: 14, st: C.green, fg: C.green })),
      render: (c, j) => {
        c.op("sort", j === 0 ? 1 : 0);
        c.mv("cA", j === 0 ? { x: 98, y: 200 } : { x: 120, y: 40 }, { d: 1.2, dl: 0.3, e: "power2.in" });
        c.mv("cB", j === 0 ? { x: 302, y: 200 } : { x: 280, y: 40 }, { d: 1.2, dl: 0.9, e: "power2.in" });
        c.op("raci", j >= 1 ? (j === 2 ? 0.55 : 1) : 0); c.mv("raci", j >= 1 ? {} : { x: -30 });
        c.op("dlg", j === 2 ? 1 : 0); c.mv("dlg", j === 2 ? {} : { s: 0.85 });
      }
    },
    // V9 · moments 22–23 · Product Workflow Animation & UI Motion Design (Dribbble) — https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design
    // Adapted: two UI screens slide in and lock together (Flip-style); then the full chain of
    // handoffs is laid out with every connector highlighted.
    {
      src: "https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design",
      labels: ["RACI and delegation agree", "Clear handoffs first"],
      draw: () =>
        H("sh", K("sL", R(60, 30, 130, 130, "rgba(31,78,121,.12)", 12, `stroke="${C.navy}" stroke-width="2.5"`) + rep(4, (i) => R(76 + i * 26, 56, 20, 16, TILE[i][2], 4)) + T(125, 108, "RACI", 22, C.navy) + T(125, 132, "ownership", 14, C.navy)) +
          K("sR", R(210, 30, 130, 130, "rgba(49,124,97,.12)", 12, `stroke="${C.green}" stroke-width="2.5"`) + O(275, 74, 22, "none", `stroke="${C.green}" stroke-width="3" stroke-dasharray="5 4"`) + T(275, 116, "Delegation", 18, C.green) + T(275, 138, "permission", 14, C.green)) +
          H("snap", okDot(200, 96, 18)) + guestP(76, 262, 1.6) + hostP(150, 262, 1.6) + D("go", "M182 250 C230 250 250 230 290 230", C.green, 5) + chip(300, 266, "Acts without searching", { sz: 13, bg: C.green, st: C.green, fg: C.white })) +
        H("map", chip(200, 34, "Understandable handoffs", { sz: 16, bg: C.navy, fg: C.white }) +
          [[50, hostP(50, 152, 1.3), "Guest Host", "investigates"], [150, mgrP(150, 152, 1.3, C.navy), "Revenue", "advises"], [250, mgrP(250, 152, 1.3), "Owner", "decides"], [350, guestP(346, 152, 1.3), "Guest", "informed"]]
            .map(([x, ic, a, b], i) => O(x, 140, 34, C.white, `stroke="${C.navy}" stroke-width="2"`) + ic + T(x, 196, a, 14, C.navy) + T(x, 213, b, 14, C.slate) + (i < 3 ? D("m" + i, `M${x + 36} 140 H${x + 62}`, C.green, 4) : "")).join("") +
          chip(200, 266, "Investigate ≠ own everything", { sz: 14, st: C.orange, fg: C.orange })),
      render: (c, j) => {
        c.op("sh", j === 0 ? 1 : 0);
        c.mv("sL", j === 0 ? { x: 10 } : { x: -90 }, { d: 1, e: "power3.out" }); c.mv("sR", j === 0 ? { x: -10 } : { x: 90 }, { d: 1, e: "power3.out" });
        c.op("snap", j === 0 ? 1 : 0, { dl: j === 0 ? 0.9 : 0 }); c.dr("go", j === 0 ? 1 : 0, { dl: 1.2 });
        c.op("map", j === 1 ? 1 : 0);
        for (let i = 0; i < 3; i++) c.dr("m" + i, j === 1 ? 1 : 0, { dl: j === 1 ? 0.4 + i * 0.35 : 0, d: 0.5 });
      }
    }
  ];
  VL_SCENES["W10O1c"] = makeScene({ id, panels, bg: "#f1f2f6", desc: "A guest case bounces between Guest Host, revenue policy and manager lanes; Responsible, Accountable, Consulted and Informed each get their own stage; Qasr's RACI matrix exposes a missing accountable owner for workflow building; RACI shows ownership while formal delegation sets the decision boundary, and together they make handoffs understandable." });
  mirror("W10O1c"); SCENE_BG.push([id, "#f1f2f6", EXTRA]);
}

addStyles(SCENE_BG);
})();

// OPER621 · Week 10 · The People Phase — animated teaching scenes (round 2, Claude)
// File: w10-claude-part2.js  ·  Lesson 2 · The job must match the process  ·  Scenes: W10O2a, W10O2b, W10O2c
// Standalone part: loads AFTER the older Week 10 scene file and re-registers the same
// section ids so these scenes override it. Registers VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
// and appends its scoped rules (.vls-w10-<secId>) into the single shared <style id="vl-sc-w10">.
// Uses window.gsap when present (CSS transitions otherwise); honours prefers-reduced-motion.
// Every visual names the benchmark template it adapts, with its URL, in a code comment.
(() => {
"use strict";
// ================================================================
// Shared engine (self-contained copy in every part file).
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
// i = narration moment index (0-based), n = number of narration moments.
// Each scene is a sequence of 8-12 distinct VISUALS ("panels"); every panel
// covers 2-5 narration moments and re-stages itself at each moment so the
// figure always shows what the current narration line says.
// ================================================================
window.VL_SCENES = window.VL_SCENES || {};
const VL_SCENES = window.VL_SCENES;
const PART = "p2";
const C = {
  navy: "#1f4e79", navy2: "#2d6a9f", orange: "#c0502a", paper: "#fbf8f1",
  ink: "#1b2a3a", blue: "#dbe7f2", green: "#317c61", gold: "#e5b76c",
  muted: "#91aabd", plum: "#6b4e8a", sand: "#efe4cf", sky: "#eaf2f8",
  red: "#b0362b", white: "#ffffff", mint: "#e1f0e8", peach: "#f8e3d8",
  lilac: "#ece6f3", slate: "#5d7389", night: "#14263a", amber: "#a8741a",
  teal: "#2a7f8f", cream: "#fffaf0", grey: "#c5ced8", wall: "#efe7d8"
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
const inR = (k, a, b) => k >= a && k <= b;
// ---- SVG string builders ----
const R = (x, y, w, h, f, rx = 0, ex = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${ex}/>`;
const O = (cx, cy, r, f, ex = "") => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${ex}/>`;
const E = (cx, cy, rx, ry, f, ex = "") => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${ex}/>`;
const P = (d, s, w = 2, ex = "") => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const F = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
const D = (k, d, s, w = 3, ex = "") => `<path data-k="${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 101" stroke-dashoffset="100" ${ex}/>`;
const T = (x, y, s, sz = 14, f = C.ink, ex = "", a = "middle") => `<text x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const TK = (k, x, y, s, sz = 14, f = C.ink, a = "middle", ex = "") => `<text data-k="${k}" x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const K = (k, body, ex = "") => `<g data-k="${k}" ${ex}>${body}</g>`;
const H = (k, body, ex = "") => `<g data-k="${k}" style="opacity:0" ${ex}>${body}</g>`;
const tw = (s, sz) => Math.round(String(s).length * sz * 0.6 + sz * 1.3);
// chip = rounded label; grouped (data-chip) so layout QA treats it as one box
const chip = (x, y, s, o = {}) => {
  const sz = o.sz || 14, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.8);
  return `<g data-chip="1">` + R(x - w / 2, y - h / 2, w, h, o.bg || C.paper, o.rx == null ? h / 2 : o.rx,
    `stroke="${o.st || C.navy}" stroke-width="${o.sw || 1.6}"${o.dash ? ' stroke-dasharray="4 3"' : ""}`) +
    T(x, y + sz * 0.36, s, sz, o.fg || C.navy) + `</g>`;
};
// left-anchored chip (x = left edge)
const chipL = (x, y, s, o = {}) => { const sz = o.sz || 14, w = o.w || tw(s, sz); return chip(x + w / 2, y, s, Object.assign({}, o, { w })); };
const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${x - 7 * s} ${y} l${5 * s} ${5 * s} l${10 * s} ${-11 * s}`, col, w);
const cross = (x, y, s = 1, col = C.orange, w = 3) => P(`M${x - 6 * s} ${y - 6 * s} l${12 * s} ${12 * s} M${x + 6 * s} ${y - 6 * s} l${-12 * s} ${12 * s}`, col, w);
const okDot = (x, y, r = 10) => O(x, y, r, C.green) + tick(x, y, r / 18, C.white, 2.2);
const noDot = (x, y, r = 10, col = C.red) => O(x, y, r, col) + cross(x, y, r / 16, C.white, 2.2);
const qDot = (x, y, r = 10, col = C.orange) => O(x, y, r, col) + T(x, y + r * 0.45, "?", r * 1.3, C.white);
const xDot = (x, y, r = 10, col = C.orange) => O(x, y, r, col) + T(x, y + r * 0.45, "!", r * 1.3, C.white);
const person = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}</g>`;
// Guest Host: green figure with lanyard and badge
const hostP = (x, y, s = 1, col = C.green) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}${P("M-5 -3 L0 4 L5 -3", C.gold, 1.6)}${R(-3, 3, 6, 5, C.gold, 1)}</g>`;
// Manager: figure with a tie
const mgrP = (x, y, s = 1, col = C.plum) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}${F("M0 -3 L3 2 L0 10 L-3 2 Z", C.gold)}</g>`;
// Guest: figure with a suitcase
const guestP = (x, y, s = 1, col = C.navy2) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}${R(13, 0, 10, 12, C.orange, 2)}${P("M16 0 V-3 H20 V0", C.orange, 1.4)}</g>`;
const clock = (x, y, r, col = C.orange, bg = C.paper) => O(x, y, r, bg, `stroke="${col}" stroke-width="${Math.max(2, r / 6)}"`) + P(`M${x} ${y - r * 0.62} V${y} L${x + r * 0.45} ${y + r * 0.3}`, col, Math.max(2, r / 7));
const gear = (x, y, r, col, hole = C.paper) => {
  let d = ""; const n = 8;
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n * 0.55, a2 = a0 + Math.PI / n, a3 = a2 + Math.PI / n * 0.45;
    const p = (a, rr) => `${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`;
    d += (i ? "L" : "M") + p(a0, r) + "L" + p(a1, r) + "L" + p(a2, r * 0.78) + "L" + p(a3, r * 0.78);
  }
  return F(d + "Z", col) + O(x, y, r * 0.34, hole);
};
const keyI = (x, y, s = 1, col = C.amber) => `<g transform="translate(${x} ${y}) scale(${s})">${O(-10, 0, 8, "none", `stroke="${col}" stroke-width="4"`)}${P("M-2 0 H18 M12 0 V7 M17 0 V5", col, 4)}</g>`;
const lockI = (x, y, s = 1, col = C.red) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-11, -4, 22, 17, col, 3)}${P("M-7 -4 V-10 A7 7 0 0 1 7 -10 V-4", col, 3.4)}${O(0, 4, 2.6, C.white)}</g>`;
const shieldI = (x, y, s = 1, col = C.green, inner = "") => `<g transform="translate(${x} ${y}) scale(${s})">${F("M0 -20 L17 -13 V0 Q17 14 0 22 Q-17 14 -17 0 V-13 Z", col)}${inner}</g>`;
const docI = (x, y, w, h, col = C.navy, lines = 4, bg = C.white) => R(x, y, w, h, bg, 6, `stroke="${col}" stroke-width="1.8"`) + R(x, y, w, Math.min(16, h * 0.2), col, 6) + R(x, y + Math.min(16, h * 0.2) - 6, w, 6, col) +
  rep(lines, (i) => R(x + 10, y + Math.min(16, h * 0.2) + 12 + i * ((h - Math.min(16, h * 0.2) - 18) / Math.max(1, lines)), (w - 20) * (i % 3 === 2 ? 0.6 : 0.9), 4, "#d9e1ea", 2));
const envI = (x, y, w, h, col = C.navy) => R(x, y, w, h, C.white, 4, `stroke="${col}" stroke-width="2"`) + P(`M${x} ${y} L${x + w / 2} ${y + h * 0.55} L${x + w} ${y}`, col, 2);
const magI = (x, y, r, col = C.ink) => O(x, y, r, "rgba(255,255,255,.35)", `stroke="${col}" stroke-width="${Math.max(3, r / 9)}"`) + P(`M${x + r * 0.72} ${y + r * 0.72} L${x + r * 1.25} ${y + r * 1.25}`, col, Math.max(5, r / 5));
const starI = (x, y, r = 10, col = C.gold) => { let d = ""; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; d += (i ? "L" : "M") + (x + rr * Math.cos(a)).toFixed(1) + " " + (y + rr * Math.sin(a)).toFixed(1); } return F(d + "Z", col); };
const bldg = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-20, -34, 40, 46, col, 3)}${F("M-24 -34 L0 -48 L24 -34 Z", col)}${rep(6, (i) => R(-14 + (i % 3) * 11, -26 + Math.floor(i / 3) * 13, 6, 8, C.gold, 1))}${R(-5, 2, 10, 10, C.paper, 1)}</g>`;
const kioskI = (x, y, s = 1, scr = C.sky) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-22, -62, 44, 84, C.navy, 8)}${R(-17, -55, 34, 30, scr, 4)}${R(-11, -16, 22, 5, "#9cc0e0", 2)}${R(-6, -6, 12, 6, "#0f2f4f", 2)}${R(-27, 22, 54, 6, C.navy, 3)}</g>`;
const arrowH = (x1, y, x2, col = C.navy, w = 3) => P(`M${x1} ${y} H${x2}`, col, w) + F(`M${x2 + (x2 > x1 ? 2 : -2)} ${y} l${x2 > x1 ? -10 : 10} -6 v12 Z`, col);
const arrowV = (x, y1, y2, col = C.navy, w = 3) => P(`M${x} ${y1} V${y2}`, col, w) + F(`M${x} ${y2 + (y2 > y1 ? 2 : -2)} l-6 ${y2 > y1 ? -10 : 10} h12 Z`, col);
const bubble = (x, y, w, h, tx, sz = 14, col = C.navy, tail = "bl") => R(x, y, w, h, C.white, 10, `stroke="${col}" stroke-width="1.8"`) +
  F(tail === "bl" ? `M${x + 14} ${y + h - 1} L${x + 8} ${y + h + 12} L${x + 26} ${y + h - 1} Z` : `M${x + w - 14} ${y + h - 1} L${x + w - 8} ${y + h + 12} L${x + w - 26} ${y + h - 1} Z`, C.white, `stroke="${col}" stroke-width="1.8"`) +
  R(tail === "bl" ? x + 9 : x + w - 27, y + h - 3, 18, 4, C.white) + `<g data-chip="1">${R(x + 2, y + 2, w - 4, h - 4, "none")}${T(x + w / 2, y + h / 2 + sz * 0.36, tx, sz, col)}</g>`;
const stampI = (x, y, s, col = C.green, rot = -8, sz = 15) => { const w = tw(s, sz) + 10; return `<g transform="rotate(${rot} ${x} ${y})"><g data-chip="1">${R(x - w / 2, y - 16, w, 32, "rgba(255,255,255,.92)", 5, `stroke="${col}" stroke-width="3"`)}${T(x, y + 5.5, s, sz, col)}</g></g>`; };
const gaugeArc = (cx, cy, r, f) => { const a0 = Math.PI, a1 = Math.PI + Math.PI * clamp(f, 0, 1); return `M${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)}`; };
const bleed = (bg, deco = "") => R(-400, -300, 1200, 900, bg) + deco;
const grid = (col, step = 40) => rep(Math.ceil(1200 / step), (i) => P(`M${-400 + i * step} -300 V600`, col, 1)) + rep(Math.ceil(900 / step), (i) => P(`M-400 ${-300 + i * step} H800`, col, 1));
const dots = (col) => rep(46, (i) => O(-380 + (i * 97) % 1160, -280 + ((i * 53) % 860), 2.2, col));
// ---- per-scene stylesheet, appended once per part into the shared <style id="vl-sc-w10"> ----
function sceneCSS(id, bg) {
  const s = ".vls-w10-" + id;
  return `
${s}{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:230px;overflow:hidden!important;box-sizing:border-box;border-radius:14px;background:${bg};color:${C.ink};font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w10-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w10-fig>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}
${s} svg text{font-family:inherit;font-weight:700;letter-spacing:.1px}
${s} [data-k],${s} [data-pn]{transform-box:fill-box;transform-origin:50% 50%}
${s}.w10-css [data-k],${s}.w10-css [data-pn]{transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.85s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}
${s}.w10-snap [data-k],${s}.w10-snap [data-pn],${s}.w10-rm [data-k],${s}.w10-rm [data-pn]{transition:none!important}
${s}.w10-rm *,${s}.w10-snap *{animation:none!important}
${s} .w10-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:36px;padding:6px 12px 8px;font-size:14px;font-weight:700;line-height:1.25;color:${C.navy};background:rgba(255,255,255,.62);border-top:1px solid rgba(31,78,121,.14)}
${s} .w10-num{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w10-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.2px}
${s} .w10-lab.w10-in{animation:vlsw10CapIn .5s cubic-bezier(.22,.8,.24,1)}
${s} .w10-dots{flex:0 0 64px;display:grid;gap:2px;align-items:center}
${s} .w10-dots i{display:block;height:5px;border-radius:3px;background:rgba(31,78,121,.18);transition:background .4s ease,transform .4s ease}
${s} .w10-dots i.on{background:${C.orange};transform:scaleY(1.6)}
${s} .w10-dots i.done{background:rgba(31,78,121,.55)}
${s}.w10-intro .w10-fig>svg{animation:vlsw10Intro .7s cubic-bezier(.22,.8,.24,1)}
${s} .a-flow{stroke-dasharray:5 7;animation:vlsw10Flow 1.1s linear infinite}
${s} .a-stream{stroke-dasharray:0 13;animation:vlsw10Stream .9s linear infinite}
${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Spin 7s linear infinite}
${s} .a-spinr{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Spin 9s linear infinite reverse}
${s} .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Bob 2.6s ease-in-out infinite}
${s} .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Pulse 2s ease-in-out infinite}
${s} .a-blink{animation:vlsw10Blink 1.4s ease-in-out infinite}
${s} .a-shake{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Shake 1.6s ease-in-out infinite}
${s} .a-run{animation:vlsw10Run 1.4s linear infinite}
${s} .a-tick{transform-box:fill-box;transform-origin:50% 100%;animation:vlsw10Spin 4s linear infinite}
@media (max-width:420px){${s} .w10-cap{font-size:13px;min-height:32px;padding:5px 10px 7px;gap:8px}${s} .w10-dots{flex-basis:52px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
}
const KEYFRAMES = `
@keyframes vlsw10CapIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes vlsw10Intro{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
@keyframes vlsw10Flow{to{stroke-dashoffset:-24}}
@keyframes vlsw10Stream{to{stroke-dashoffset:-26}}
@keyframes vlsw10Spin{to{transform:rotate(360deg)}}
@keyframes vlsw10Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes vlsw10Pulse{0%,100%{opacity:.35;transform:scale(.94)}50%{opacity:.95;transform:scale(1.06)}}
@keyframes vlsw10Blink{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes vlsw10Run{from{transform:translateX(0)}to{transform:translateX(40px)}}
@keyframes vlsw10Shake{0%,100%{transform:rotate(0)}20%{transform:rotate(-4deg)}40%{transform:rotate(4deg)}60%{transform:rotate(-2deg)}80%{transform:rotate(2deg)}}
`;
function addStyles(list) {
  if (typeof document === "undefined") return;
  let st = document.getElementById("vl-sc-w10");
  if (!st) { st = document.createElement("style"); st.id = "vl-sc-w10"; (document.head || document.documentElement).appendChild(st); }
  const flag = "data-w10claude-" + PART;
  if (st.getAttribute(flag)) return;
  st.setAttribute(flag, "1");
  st.appendChild(document.createTextNode(KEYFRAMES + list.map(([id, bg, extra]) => sceneCSS(id, bg) + (extra || "")).join("\n")));
}
// ---- scene factory ----
function makeScene(cfg) {
  const { id, panels } = cfg;
  const labels = [];
  panels.forEach((p) => { p.a = labels.length; p.labels.forEach((l) => labels.push(l)); p.b = labels.length - 1; });
  const N = labels.length;
  let root = null, useG = false, active = -1;
  const raf = (f) => (window.requestAnimationFrame ? window.requestAnimationFrame(f) : setTimeout(f, 16));
  const panelOf = (k) => { for (let p = 0; p < panels.length; p++) if (k >= panels[p].a && k <= panels[p].b) return p; return panels.length - 1; };
  const mapK = (i, n) => {
    const nn = Math.max(1, Math.floor(num(n, N)));
    const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
    return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
  };
  const pEl = (p) => (root ? root.querySelector('[data-pn="' + p + '"]') : null);
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
  function count(el, v, pre, suf, snap) {
    const from = num(el.getAttribute("data-v"), 0);
    el.setAttribute("data-v", String(v));
    const fmt = (x) => pre + Math.round(x).toLocaleString("en-US") + suf;
    const tok = (el._w10tok = (el._w10tok || 0) + 1);
    if (snap || reduced() || from === v) { el.textContent = fmt(v); return; }
    if (useG) { const o = { x: from }; window.gsap.to(o, { x: v, duration: 0.9, ease: "power2.out", onUpdate: () => { if (el._w10tok === tok) el.textContent = fmt(o.x); } }); return; }
    const t0 = Date.now();
    const stepF = () => { if (el._w10tok !== tok) return; const u = clamp((Date.now() - t0) / 900, 0, 1), e = 1 - Math.pow(1 - u, 3); el.textContent = fmt(from + (v - from) * e); if (u < 1) raf(stepF); };
    stepF();
  }
  function ctx(scope, snap) {
    const nodes = (k) => (scope ? Array.prototype.slice.call(scope.querySelectorAll('[data-k="' + k + '"]')) : []);
    return {
      snap,
      op: (k, o, t = {}) => nodes(k).forEach((el) => op(el, o, t, snap)),
      mv: (k, st, t = {}) => nodes(k).forEach((el) => tf(el, st, t, snap)),
      dr: (k, f, t = {}) => nodes(k).forEach((el) => dash(el, f, t, snap)),
      fl: (k, col, t = {}) => nodes(k).forEach((el) => fill(el, col, t, snap)),
      tx: (k, s) => nodes(k).forEach((el) => { if (el.textContent !== String(s)) el.textContent = String(s); }),
      num: (k, v, pre = "", suf = "") => nodes(k).forEach((el) => count(el, v, pre, suf, snap)),
      vis: (map, t = {}) => Object.keys(map).forEach((k) => nodes(k).forEach((el) => op(el, map[k] === true ? 1 : map[k] === false ? 0 : map[k], t, snap))),
      all: (sel) => (scope ? Array.prototype.slice.call(scope.querySelectorAll(sel)) : []),
      opEl: (el, o, t = {}) => op(el, o, t, snap),
      mvEl: (el, st, t = {}) => tf(el, st, t, snap),
      flEl: (el, col, t = {}) => fill(el, col, t, snap)
    };
  }
  function caption(k, p, snap) {
    const lab = root.querySelector(".w10-lab"), nn = root.querySelector(".w10-num");
    const txt = labels[k] || "";
    if (lab && lab.textContent !== txt) {
      lab.textContent = txt;
      if (!snap && !reduced()) { lab.classList.remove("w10-in"); void lab.offsetWidth; lab.classList.add("w10-in"); }
    }
    if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
    Array.prototype.slice.call(root.querySelectorAll(".w10-dots i")).forEach((d, q) => { d.className = q === p ? "on" : q < p ? "done" : ""; });
  }
  function safe(f) { try { f(); } catch (e) { if (window.console) console.warn("[VL W10 " + id + "]", e); } }
  function render(k, snap) {
    if (!root) return;
    const p = panelOf(k), pg = pEl(p), pc = panels[p];
    if (snap) root.classList.add("w10-snap");
    if (p !== active) {
      // stage the incoming visual in its pre-state, then let it animate in
      if (!snap) {
        root.classList.add("w10-snap");
        safe(() => pc.render(ctx(pg, true), k - pc.a - 1, k - 1));
        if (pg) tf(pg, { s: 1.035, y: 6, pv: [200, 150] }, {}, true);
        void root.offsetWidth;
        root.classList.remove("w10-snap");
      }
      panels.forEach((_, q) => {
        const el = pEl(q); if (!el) return;
        if (q === p) { op(el, 1, { d: 0.55, dl: snap ? 0 : 0.18 }, snap); tf(el, { pv: [200, 150] }, { d: 0.8, dl: snap ? 0 : 0.18 }, snap); }
        else { op(el, 0, { d: 0.4 }, snap); tf(el, { s: q < p ? 0.97 : 1.03, pv: [200, 150] }, { d: 0.5 }, snap); }
      });
      active = p;
    }
    safe(() => pc.render(ctx(pg, snap), k - pc.a, k));
    caption(k, p, snap);
    if (snap) { void root.offsetWidth; root.classList.remove("w10-snap"); }
    root.setAttribute("data-moment", String(k));
    root.setAttribute("data-visual", String(p + 1));
  }
  function kill() {
    if (root && useG) { try { window.gsap.killTweensOf(root.querySelectorAll("[data-k],[data-pn]")); } catch (_) {} }
  }
  function mount(el) {
    const r = document.createElement("div");
    const rm = reduced();
    r.className = "vls-w10-" + id + " w10-root" + (useG ? " w10-gsap" : " w10-css") + (rm ? " w10-rm" : " w10-intro");
    r.setAttribute("data-scene", id);
    const body = panels.map((pc, q) => `<g data-pn="${q}" style="opacity:0">${pc.draw()}</g>`).join("");
    r.innerHTML = '<div class="w10-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
      esc(cfg.desc) + '">' + bleed(cfg.bg) + body + '</svg></div><div class="w10-cap" aria-hidden="true"><span class="w10-num"></span><span class="w10-lab"></span><span class="w10-dots" style="grid-template-columns:repeat(' + panels.length + ',1fr)">' + rep(panels.length, () => "<i></i>") + "</span></div>";
    if (typeof el.replaceChildren === "function") el.replaceChildren(r);
    else { el.innerHTML = ""; el.appendChild(r); }
    return r;
  }
  return {
    build(el) {
      if (!el || el.nodeType !== 1) return;
      kill();
      useG = hasG();
      active = -1;
      root = mount(el);
      render(0, true);
    },
    step(i, n) {
      if (!root) return;
      render(mapK(i, n), false);
    },
    reset() {
      if (!root) return;
      kill();
      active = -1;
      render(0, true);
    },
    _meta: { id, N, visuals: panels.map((p) => ({ a: p.a, b: p.b, src: p.src })) }
  };
}
const SCENE_BG = [];
function mirror(id) {
  // The older Week 10 host reads window.W10_SCENES; keep it pointing at the same scene.
  try { if (window.W10_SCENES && window.W10_SCENES !== VL_SCENES) window.W10_SCENES[id] = VL_SCENES[id]; } catch (_) {}
}

// ============================================================
// W10O2a · "The AED 400 decision"  (24 narration moments, 9 visuals)
// Story spine: one illustrative AED 320 case → eligibility first → an email is not formal
// delegation → referral feels safer → delegation approved (a proposed correction) → AED 460
// crosses the limit → three checks → the rule lives inside the workflow → same case, new support.
// AED 320 and AED 460 are illustrative teaching amounts, never observed Qasr transactions.
// ============================================================
{
  const id = "W10O2a";
  const FLOOR = () => R(-400, 238, 1200, 400, "#e6e9e2");
  const tokenC = (x, y, t, col, ex = "") => O(x, y, 18, col, `stroke="${C.white}" stroke-width="3" ${ex}`) + T(x, y + 5, t, 14, C.white);
  const panels = [
    // V1 · moments 0–1 · Infographic Chart Creator (Motion Array) — https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/
    // Adapted: a column grows while its numeric label counts up, measured against a dashed limit line.
    {
      src: "https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/",
      labels: ["Follow the decision", "An illustrative AED 320"],
      draw: () => FLOOR() +
        chip(200, 28, "The AED 400 decision", { sz: 17, bg: C.navy, fg: C.white }) +
        guestP(56, 262, 1.7) + hostP(124, 262, 1.9) +
        H("dia", F("M290 96 L352 158 L290 220 L228 158 Z", C.white, `stroke="${C.orange}" stroke-width="3"`) + T(290, 172, "?", 40, C.orange) + D("dp", "M150 230 C190 230 200 160 226 158", C.orange, 3) + chip(290, 252, "Follow the decision", { sz: 14, st: C.orange, fg: C.orange })) +
        H("col", P("M330 250 H392", C.ink, 2) + P("M322 70 H392", C.red, 2.5, 'stroke-dasharray="6 4"') + T(357, 62, "AED 400", 14, C.red) +
          K("bar", R(338, 90, 40, 160, C.green, 4)) + TK("amt", 236, 150, "AED 0", 40, C.green) + stampI(236, 206, "Illustrative only", C.slate, -5, 14)),
      render: (c, j) => {
        c.op("dia", j === 0 ? 1 : 0); c.dr("dp", j === 0 ? 1 : 0, { dl: 0.4 });
        c.op("col", j === 1 ? 1 : 0);
        c.mv("bar", { sy: j === 1 ? 1 : 0.01, pv: [358, 250] }, { d: 1.1 });
        c.num("amt", j === 1 ? 320 : 0, "AED ");
      }
    },
    // V2 · moments 2–3 · Process Infographic Widget (Envato) — https://elements.envato.com/process-infographic-widget-C3TVD9H
    // Adapted: a segmented progress widget fills segment by segment and settles on a marker.
    {
      src: "https://elements.envato.com/process-infographic-widget-C3TVD9H",
      labels: ["Establish eligibility first", "Within the limit"],
      draw: () =>
        docI(16, 24, 166, 136, C.navy, 4) + T(99, 39, "Booking confirmation", 13, C.white) + R(26, 104, 146, 22, "rgba(229,183,108,.45)", 4) + T(99, 120, "Confirmed rate", 14, C.navy) +
        R(218, 24, 166, 136, C.navy, 12) + R(228, 54, 146, 96, C.sky, 6) + T(301, 44, "Displayed rate", 14, C.white) + R(238, 104, 126, 22, "rgba(192,80,42,.25)", 4) + T(301, 120, "Different amount", 14, C.orange) +
        D("cmp", "M182 115 H218", C.ink, 3) + T(200, 104, "≠", 22, C.red) +
        H("elig", okDot(152, 194, 14) + chip(232, 194, "Eligible case", { sz: 16, st: C.green, fg: C.green })) +
        H("rule", R(40, 236, 320, 26, "#e3e6ea", 6) + rep(4, (i) => K("sg" + i, R(42 + i * 80, 238, i === 3 ? 14 : 76, 22, C.green, 4))) +
          rep(3, (i) => P(`M${120 + i * 80} 232 V266`, C.white, 3)) + T(40, 284, "AED 0", 14, C.navy) + T(354, 284, "AED 400", 14, C.navy) +
          chip(296, 210, "AED 320", { sz: 15, bg: C.green, st: C.green, fg: C.white }) + bubble(30, 176, 132, 32, "Resolve now?", 15, C.navy, "bl")),
      render: (c, j) => {
        c.dr("cmp", j >= 0 ? 1 : 0);
        c.op("elig", j === 0 ? 1 : 0, { dl: j === 0 ? 0.6 : 0 }); c.mv("elig", j === 0 ? {} : { s: 0.7 });
        c.op("rule", j === 1 ? 1 : 0);
        for (let i = 0; i < 4; i++) c.mv("sg" + i, { sx: j === 1 ? 1 : 0.02, pv: [42 + i * 80, 249] }, { d: 0.35, dl: j === 1 ? 0.2 + i * 0.35 : 0 });
      }
    },
    // V3 · moments 4–6 · SVGator UI templates (toggles, cards, form steps) — https://www.svgator.com/animation-templates/ui-elements
    // Adapted: UI states — a contradiction between two cards, two toggles in different states,
    // and a form whose four fields fill one by one.
    {
      src: "https://www.svgator.com/animation-templates/ui-elements",
      labels: ["Email, not delegation", "Encouraged isn't authorised", "What delegation states"],
      draw: () =>
        H("two", envI(14, 46, 172, 112, C.navy) + T(100, 184, "Up to AED 400", 18, C.navy) + T(100, 206, "Email instruction", 14, C.slate) +
          R(214, 34, 172, 228, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + R(214, 34, 172, 30, C.navy, 8) + R(214, 56, 172, 8, C.navy) + T(300, 55, "Delegation schedule", 13, C.white) +
          rep(6, (i) => R(228, 80 + i * 26, 144, 9, "#d9e1ea", 4)) + stampI(300, 200, "Not updated", C.red, -7, 16) +
          `<g class="a-blink">${F("M206 96 L194 128 H206 L196 160 L218 120 H206 L214 96 Z", C.gold)}</g>`) +
        H("tg", T(30, 112, "Encouraged", 22, C.green, "", "start") + R(290, 88, 78, 40, C.green, 20) + O(348, 108, 16, C.white) +
          T(30, 202, "Formally authorised", 22, C.slate, "", "start") + R(290, 178, 78, 40, C.grey, 20) + O(310, 198, 16, C.white) +
          chip(200, 262, "Not the same thing", { sz: 16, bg: C.orange, st: C.orange, fg: C.white })) +
        H("form", R(30, 20, 340, 262, C.white, 14, `stroke="${C.navy}" stroke-width="2.5"`) + T(200, 50, "Formal delegation states", 17, C.navy) +
          [["Authorised role", 92], ["Permitted decision", 144], ["Conditions", 196], ["Escalation boundary", 248]].map(([t, y], i) =>
            T(48, y + 5, t, 15, C.ink, "", "start") + R(232, y - 13, 120, 26, "#eef2f6", 6) + K("ff" + i, R(232, y - 13, 120, 26, C.sky, 6, `stroke="${C.navy2}" stroke-width="1.5"`) + tick(292, y, 0.8, C.green, 3))).join("")),
      render: (c, j) => {
        c.op("two", j === 0 ? 1 : 0); c.op("tg", j === 1 ? 1 : 0); c.op("form", j === 2 ? 1 : 0);
        for (let i = 0; i < 4; i++) { c.op("ff" + i, j === 2 ? 1 : 0, { dl: j === 2 ? 0.3 + i * 0.35 : 0 }); c.mv("ff" + i, { sx: j === 2 ? 1 : 0.05, pv: [232, 0] }, { dl: j === 2 ? 0.3 + i * 0.35 : 0 }); }
      }
    },
    // V4 · moments 7–8 · Celonis Process Explorer animation (cases as moving bubbles) — https://help.celonis.com/cpm46/en/process-components
    // Adapted: case bubbles stream along the edge that is actually taken (referral), while the
    // intended edge stays empty; the waiting time then accumulates at the old handoff.
    {
      src: "https://help.celonis.com/cpm46/en/process-components",
      labels: ["Referral feels safer", "The handoff returns"],
      draw: () =>
        O(84, 150, 34, C.green) + hostP(84, 160, 1.4, C.white) + T(84, 204, "Guest Host", 14, C.green) +
        P("M118 140 C190 100 220 84 264 80", "#cfd8e2", 10) + P("M118 160 C190 200 220 216 264 220", C.orange, 10) +
        R(266, 54, 120, 52, C.white, 12, `stroke="${C.muted}" stroke-width="2" stroke-dasharray="6 4"`) + T(326, 86, "Local decision", 14, C.muted) + lockI(374, 50, 0.9, C.slate) +
        R(266, 194, 120, 52, C.peach, 12, `stroke="${C.orange}" stroke-width="2.5"`) + T(326, 226, "Duty manager", 14, C.orange) +
        H("bub", `<g class="a-stream">${P("M118 160 C190 200 220 216 264 220", C.white, 7)}</g>`) +
        H("safe", chip(150, 30, "Referral feels safer", { sz: 15, st: C.orange, fg: C.orange })) +
        H("wait", guestP(46, 266, 1.4) + clock(118, 262, 22, C.red) + `<g class="a-flow">${P("M290 250 Q326 290 362 250", C.red, 3)}</g>` + chip(150, 30, "Old handoff returns", { sz: 15, bg: C.red, st: C.red, fg: C.white })),
      render: (c, j) => {
        c.op("bub", j >= 0 ? 1 : 0, { dl: 0.3 });
        c.op("safe", j === 0 ? 1 : 0); c.op("wait", j === 1 ? 1 : 0);
      }
    },
    // V5 · moments 9–12 · Process - Success (LottieFiles) — https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP
    // Adapted: an activity indicator resolves into a confirmation check — an approval stamp, a gate,
    // four steps that tick in sequence, and a resolved guest.
    {
      src: "https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP",
      labels: ["Delegation formally approved", "Still check eligibility", "Decide and record", "No needless referral"],
      draw: () =>
        H("sch", R(90, 22, 220, 246, C.white, 10, `stroke="${C.navy}" stroke-width="2.5"`) + R(90, 22, 220, 32, C.navy, 10) + R(90, 46, 220, 8, C.navy) + T(200, 44, "Delegation schedule", 15, C.white) +
          rep(3, (i) => R(108, 72 + i * 24, 184, 9, "#d9e1ea", 4)) + R(102, 148, 196, 34, C.mint, 6, `stroke="${C.green}" stroke-width="2.5"`) + T(200, 171, "Waive eligible ≤ AED 400", 14, C.green) +
          rep(2, (i) => R(108, 198 + i * 24, 184, 9, "#d9e1ea", 4)) + K("stamp", stampI(272, 246, "Approved", C.green, -10, 18)) + chip(200, 288, "Proposed correction", { sz: 13, st: C.slate, fg: C.slate })) +
        H("gate", hostP(60, 236, 2.2) + R(170, 40, 60, 200, C.navy, 8) + R(176, 92, 48, 96, C.sky, 4) + T(200, 30, "Eligibility check", 15, C.navy) + K("coin", tokenC(0, 0, "320", C.green)) +
          chip(320, 230, "Not automatic", { sz: 15, st: C.orange, fg: C.orange }) + P("M40 140 H170 M230 140 H360", C.muted, 3, 'stroke-dasharray="4 6"')) +
        H("steps", [[55, "Evidence", "checked"], [150, "Eligibility", "confirmed"], [250, "Authority", "verified"], [345, "Decision", "recorded"]].map(([x, a, b], i) =>
          O(x, 130, 30, C.white, `stroke="${C.green}" stroke-width="3"`) + H("st" + i, okDot(x, 130, 26)) + T(x, 186, a, 14, C.green) + T(x, 204, b, 14, C.slate) + (i < 3 ? D("sl" + i, `M${x + 32} 130 H${x + 62}`, C.green, 4) : "")).join("") +
          chip(200, 262, "Local decision", { sz: 16, bg: C.green, st: C.green, fg: C.white })) +
        H("res", FLOOR() + guestP(96, 232, 2.8) + hostP(230, 232, 2.8) + bubble(246, 60, 140, 34, "Clear explanation", 14, C.green, "bl") + okDot(340, 160, 24) + chip(180, 278, "No referral needed", { sz: 15, st: C.green, fg: C.green })),
      render: (c, j) => {
        c.op("sch", j === 0 ? 1 : 0); c.op("stamp", j === 0 ? 1 : 0, { dl: j === 0 ? 0.6 : 0 }); c.mv("stamp", j === 0 ? {} : { s: 1.8 }, { dl: j === 0 ? 0.6 : 0, e: "back.out(2)" });
        c.op("gate", j === 1 ? 1 : 0); c.mv("coin", j === 1 ? { x: 200, y: 140 } : { x: 60, y: 140 }, { d: 1.2, dl: 0.3 });
        c.op("steps", j === 2 ? 1 : 0);
        for (let i = 0; i < 4; i++) { c.op("st" + i, j === 2 ? 1 : 0, { dl: j === 2 ? 0.3 + i * 0.45 : 0 }); if (i < 3) c.dr("sl" + i, j === 2 ? 1 : 0, { dl: j === 2 ? 0.5 + i * 0.45 : 0, d: 0.4 }); }
        c.op("res", j === 3 ? 1 : 0);
      }
    },
    // V6 · moments 13–15 · Easing Animations (Observable/D3) — https://observablehq.com/@d3/easing-animations
    // Adapted: the same marker replayed with an overshooting ease — it flies past the delegated wall.
    {
      src: "https://observablehq.com/@d3/easing-animations",
      labels: ["AED 460 exceeds", "Investigate, document, refer", "Escalation is control"],
      draw: () =>
        H("ov", TK("amt", 200, 74, "AED 320", 42, C.orange) + P("M40 190 H360", C.navy, 5) + rep(6, (i) => P(`M${40 + i * 64} 180 V200`, C.navy, 2.5)) +
          T(40, 224, "AED 0", 14, C.navy) + T(296, 224, "AED 400", 14, C.red) + R(294, 120, 4, 104, C.red) + R(298, 120, 62, 70, "rgba(176,54,43,.12)") + T(330, 112, "Beyond", 14, C.red) +
          K("mk", O(0, 190, 13, C.orange, `stroke="${C.white}" stroke-width="3"`)) + chip(200, 272, "Delegated limit exceeded", { sz: 15, bg: C.red, st: C.red, fg: C.white })) +
        H("ref", [[64, "Investigate"], [190, "Document"], [316, "Refer upward"]].map(([x, t], i) => K("rs" + i, O(x, 120, 32, i === 2 ? C.plum : C.navy) +
          (i === 0 ? magI(x - 4, 116, 12, C.white) : i === 1 ? docI(x - 12, 104, 24, 30, C.white, 2, C.sky) : arrowV(x, 136, 104, C.white, 4)) + chip(x, 180, t, { sz: 15 }))).join("") +
          D("r0", "M98 120 H156", C.slate, 3) + D("r1", "M224 120 H282", C.slate, 3) + mgrP(316, 262, 1.6) + chip(160, 262, "Authorised role decides", { sz: 14, st: C.plum, fg: C.plum })) +
        H("sh", shieldI(200, 140, 4.4, C.green, tick(0, 0, 1.2, C.white, 4)) + guestP(70, 260, 1.6) + bldg(330, 270, 1) + chip(200, 268, "A necessary control", { sz: 16, bg: C.green, st: C.green, fg: C.white }) +
          chip(76, 40, "Protects guest", { sz: 14, st: C.green, fg: C.green }) + chip(318, 40, "Protects Qasr", { sz: 14, st: C.green, fg: C.green })),
      render: (c, j) => {
        c.op("ov", j === 0 ? 1 : 0); c.num("amt", j === 0 ? 460 : 320, "AED ");
        c.mv("mk", j === 0 ? { x: 334.4 } : { x: 40 }, { d: 1.4, e: "back.out(2.2)" });
        c.op("ref", j === 1 ? 1 : 0);
        for (let i = 0; i < 3; i++) { c.op("rs" + i, j === 1 ? 1 : 0, { dl: j === 1 ? i * 0.4 : 0 }); c.mv("rs" + i, j === 1 ? {} : { y: 14 }, { dl: j === 1 ? i * 0.4 : 0 }); }
        c.dr("r0", j === 1 ? 1 : 0, { dl: 0.3 }); c.dr("r1", j === 1 ? 1 : 0, { dl: 0.7 });
        c.op("sh", j === 2 ? 1 : 0); c.mv("sh", j === 2 ? {} : { s: 0.85 });
      }
    },
    // V7 · moments 16–17 · Git Workflow 1 (LottieFiles) — https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5
    // Adapted: a main line with branch points; tokens travel the line and peel off at the branch
    // where a condition fails.
    {
      src: "https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5",
      labels: ["Small but ineligible", "Three checks"],
      draw: () => {
        const G = [[70, "Eligible?"], [150, "≤ AED 400?"], [230, "Authority?"]];
        let s = P("M20 130 H330", C.navy, 6) + P("M70 130 V214", C.red, 5) + P("M150 130 Q150 214 190 214 M230 130 Q230 214 190 214", C.orange, 5);
        s += G.map(([x, t]) => F(`M${x} 108 L${x + 22} 130 L${x} 152 L${x - 22} 130 Z`, C.white, `stroke="${C.navy}" stroke-width="3"`) + T(x, 136, "?", 16, C.navy) + T(x, 96, t, 14, C.navy)).join("");
        s += okDot(334, 130, 20) + chip(334, 82, "Local decision", { sz: 13, st: C.green, fg: C.green });
        s += chip(70, 238, "Not approved", { sz: 14, st: C.red, fg: C.red }) + chip(190, 238, "Escalate", { sz: 14, st: C.orange, fg: C.orange });
        s += K("k0", tokenC(0, 0, "320", C.slate) + cross(14, -14, 0.6, C.red, 3), 'style="opacity:0"');
        s += K("k1", tokenC(0, 0, "320", C.green), 'style="opacity:0"') + K("k2", tokenC(0, 0, "460", C.orange), 'style="opacity:0"');
        s += H("leg", chip(78, 282, "Ineligible 320", { sz: 13, st: C.slate, fg: C.slate }) + chip(204, 282, "Eligible 320", { sz: 13, st: C.green, fg: C.green }) + chip(326, 282, "Eligible 460", { sz: 13, st: C.orange, fg: C.orange }));
        s += H("t0", chip(200, 30, "Small amount, wrong case", { sz: 15, st: C.red, fg: C.red }));
        s += H("t1", chip(200, 30, "Eligible · within · authorised", { sz: 15, bg: C.navy, fg: C.white }));
        return s;
      },
      render: (c, j) => {
        c.op("k0", j >= 0 ? 1 : 0); c.mv("k0", j >= 0 ? { x: 70, y: 190 } : { x: 20, y: 130 }, { d: 1.4, e: "power2.inOut" });
        c.op("k1", j === 1 ? 1 : 0); c.mv("k1", j === 1 ? { x: 334, y: 172 } : { x: 20, y: 130 }, { d: 1.8, dl: 0.2, e: "power2.inOut" });
        c.op("k2", j === 1 ? 1 : 0); c.mv("k2", j === 1 ? { x: 190, y: 180 } : { x: 20, y: 130 }, { d: 1.6, dl: 0.7, e: "power2.inOut" });
        c.vis({ leg: j === 1, t0: j === 0, t1: j === 1 });
      }
    },
    // V8 · moments 18–20 · Animated Dashboards (LottieFiles) — https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ
    // Adapted: dashboard panels transition in place — a decision guide on the Guest Host's screen,
    // its hand-off to Develop, and a sampling panel for managers.
    {
      src: "https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ",
      labels: ["Guide inside the workflow", "A Develop requirement", "Sample the decisions"],
      draw: () =>
        K("tab", R(128, 22, 256, 220, C.ink, 16) + R(140, 34, 232, 196, C.white, 8) + T(256, 58, "Decision guide", 16, C.navy) +
          [["Eligible case", 92], ["Within AED 400", 128], ["Authority on file", 164]].map(([t, y], i) => H("gr" + i, okDot(162, y - 5, 10) + T(180, y, t, 14, C.ink, "", "start"))).join("") +
          K("btn", R(176, 186, 160, 32, C.green, 16) + T(256, 207, "Waive and record", 14, C.white))) +
        H("far", R(24, 150, 70, 92, C.slate, 6) + rep(3, (i) => R(32, 160 + i * 28, 54, 20, "#8396a8", 3)) + chip(64, 128, "Distant file", { sz: 14, st: C.slate, fg: C.slate }) + noDot(92, 162, 12)) +
        H("dev", `<g class="a-spin">${gear(60, 150, 40, C.navy, C.sky)}</g>` + chip(68, 262, "Develop phase", { sz: 14, bg: C.navy, fg: C.white }) + D("dl", "M126 140 H104", C.ink, 4) + chip(256, 268, "Workflow requirement", { sz: 15, st: C.navy })) +
        H("samp", rep(5, (i) => R(36 + i * 8, 92 + i * 12, 90, 60, C.white, 6, `stroke="${C.navy}" stroke-width="1.6"`)) + K("lens", magI(88, 176, 26, C.ink)) + okDot(122, 140, 13) + chip(84, 260, "Managers sample", { sz: 15, st: C.plum, fg: C.plum })),
      render: (c, j) => {
        for (let i = 0; i < 3; i++) c.op("gr" + i, j >= 0 ? 1 : 0, { dl: j === 0 ? 0.3 + i * 0.35 : 0 });
        c.mv("btn", j >= 0 ? {} : { s: 0.8 }, { dl: 1.3 });
        c.op("far", j === 0 ? 1 : 0); c.op("dev", j === 1 ? 1 : 0); c.dr("dl", j === 1 ? 1 : 0, { dl: 0.3 });
        c.op("samp", j === 2 ? 1 : 0); c.mv("lens", j === 2 ? { x: 10, y: -20 } : {}, { d: 1.6 });
        c.op("tab", j === 2 ? 0.25 : 1);
      }
    },
    // V9 · moments 21–23 · Stacked-to-grouped bars (Observable/D3) — https://observablehq.com/@d3/stacked-to-grouped-bars
    // Adapted: the same blocks keep their identity while moving from one arrangement to another —
    // a balance, a sequence of repairs, and the support pillars that move under the same case.
    {
      src: "https://observablehq.com/@d3/stacked-to-grouped-bars",
      labels: ["Governed independence", "Qasr's immediate repair", "Same case, new support"],
      draw: () =>
        H("bal", F("M200 132 L178 248 H222 Z", C.navy) + K("beam", P("M70 132 H330", C.navy, 7) + O(200, 132, 9, C.orange) +
          chip(96, 104, "Independence", { sz: 15, bg: C.green, st: C.green, fg: C.white }) + chip(304, 104, "Clear limits", { sz: 15, bg: C.plum, st: C.plum, fg: C.white })) +
          chip(200, 34, "Governed independence", { sz: 17, st: C.navy }) + chip(200, 274, "Not unlimited freedom", { sz: 14, st: C.red, fg: C.red })) +
        H("rep", [["Align delegation", 60], ["Communicate rules", 140], ["Practise decisions", 220]].map(([t, y], i) =>
          K("rp" + i, O(70, y, 22, C.navy) + T(70, y + 7, String(i + 1), 20, C.white) + chip(220, y, t, { sz: 17, w: 230 }))).join("") + D("rpl", "M70 84 V196", C.navy, 3)) +
        H("ba", T(100, 32, "Before", 18, C.slate) + T(300, 32, "After", 18, C.green) + P("M200 20 V290", C.muted, 2, 'stroke-dasharray="4 6"') +
          tokenC(100, 80, "320", C.green) + tokenC(300, 80, "320", C.green) + R(40, 110, 120, 12, C.slate, 4) + R(240, 110, 120, 12, C.green, 4) +
          [["Formal authority", C.amber], ["Clear rule", C.navy], ["Practice", C.teal]].map(([t, col], i) =>
            K("pl" + i, R(244, 128 + i * 44, 112, 38, col, 6) + T(300, 152 + i * 44, t, 14, C.white))).join("") +
          noDot(100, 180, 22) + chip(100, 240, "Escalate", { sz: 15, st: C.orange, fg: C.orange }) + chip(200, 284, "Only the support changed", { sz: 14, bg: C.navy, fg: C.white })),
      render: (c, j) => {
        c.op("bal", j === 0 ? 1 : 0); c.mv("beam", { r: j === 0 ? 0 : -8, pv: [200, 132] }, { d: 1.4, e: "elastic.out(1,0.4)" });
        c.op("rep", j === 1 ? 1 : 0); c.dr("rpl", j === 1 ? 1 : 0, { d: 1.6 });
        for (let i = 0; i < 3; i++) { c.op("rp" + i, j === 1 ? 1 : 0, { dl: j === 1 ? i * 0.5 : 0 }); c.mv("rp" + i, j === 1 ? {} : { x: -20 }, { dl: j === 1 ? i * 0.5 : 0 }); }
        c.op("ba", j === 2 ? 1 : 0);
        for (let i = 0; i < 3; i++) c.mv("pl" + i, j === 2 ? {} : { x: -200, y: 60 - i * 20, s: 0.6 }, { d: 1, dl: j === 2 ? 0.4 + i * 0.3 : 0, e: "power3.inOut" });
      }
    }
  ];
  VL_SCENES["W10O2a"] = makeScene({ id, panels, bg: "#f3f4f0", desc: "An illustrative AED 320 case: eligibility is checked first, an email is not formal delegation, so referral feels safer and the old handoff returns; once delegation is approved the same case is resolved and recorded; AED 460 overshoots the limit and is escalated; three checks decide; the rule lives inside the workflow; only the organisational support changed." });
  mirror("W10O2a"); SCENE_BG.push([id, "#f3f4f0"]);
}

// ============================================================
// W10O2b · "Measures and incentives must reward the new work"  (26 narration moments, 9 visuals)
// Story spine: a valuable resolution looks slow on the old dashboard → measures steer
// behaviour (old job vs new job on a conveyor) → a speed-only race ranks the wrong host →
// a balanced set of PROPOSED measures (local resolution with the right denominator, quality
// sampling, guest experience, rework) → fairness → one consistent message, rewarding the new work.
// All measures shown are design proposals, not reported Qasr results.
// ============================================================
{
  const id = "W10O2b";
  const FLOOR = () => R(-400, 240, 1200, 400, "#ece7dc");
  const tile = (x, y, w, h, col, title, icon) => R(x, y, w, h, C.white, 12, `stroke="${col}" stroke-width="2.5"`) + R(x, y, 8, h, col, 4) + icon + T(x + w / 2 + 4, y + h - 18, title, 15, col);
  const panels = [
    // V1 · moments 0–2 · Workflow Dashboard – Interactive Motion Design (Dribbble) — https://dribbble.com/shots/27538364-Workflow-Dashboard-Interactive-Motion-Design
    // Adapted: task bars fill and a dashboard chart animates on load — here the dashboard grades a
    // careful resolution with the old throughput bars.
    {
      src: "https://dribbble.com/shots/27538364-Workflow-Dashboard-Interactive-Motion-Design",
      labels: ["Valuable work done", "The old dashboard", "Looks inefficient"],
      draw: () => FLOOR() +
        guestP(52, 246, 2) + hostP(130, 246, 2.2) +
        H("sw", O(296, 124, 62, C.white, `stroke="${C.navy}" stroke-width="6"`) + R(286, 52, 20, 12, C.navy, 3) + rep(12, (i) => P(`M${296 + 54 * Math.cos(i * Math.PI / 6)} ${124 + 54 * Math.sin(i * Math.PI / 6)} L${296 + 46 * Math.cos(i * Math.PI / 6)} ${124 + 46 * Math.sin(i * Math.PI / 6)}`, C.navy, 2.5)) +
          `<g class="a-tick">${P("M296 124 V82", C.orange, 5)}</g>` + O(296, 124, 6, C.navy) + chip(296, 216, "Several minutes", { sz: 15, st: C.orange, fg: C.orange })) +
        H("ok", okDot(90, 136, 18) + chip(90, 92, "Resolved properly", { sz: 14, st: C.green, fg: C.green })) +
        H("dash", R(206, 24, 184, 214, C.white, 12, `stroke="${C.navy}" stroke-width="2.5"`) + R(206, 24, 184, 34, C.navy, 12) + R(206, 48, 184, 10, C.navy) + T(298, 47, "Performance dashboard", 13, C.white) +
          T(222, 92, "Check-ins done", 14, C.ink, "", "start") + R(222, 102, 150, 16, "#e6e9ee", 6) + K("d1", R(222, 102, 150, 16, C.orange, 6)) +
          T(222, 152, "Average speed", 14, C.ink, "", "start") + R(222, 162, 150, 16, "#e6e9ee", 6) + K("d2", R(222, 162, 150, 16, C.red, 6)) +
          K("ot", T(298, 226, "Old targets", 14, C.slate))) +
        H("bad", stampI(298, 200, "Looks inefficient", C.red, -6, 16) + chip(96, 34, "Valuable work", { sz: 15, bg: C.green, st: C.green, fg: C.white })),
      render: (c, j) => {
        c.op("sw", j === 0 ? 1 : 0); c.op("ok", j >= 0 ? 1 : 0, { dl: j === 0 ? 0.8 : 0 });
        c.op("dash", j >= 1 ? 1 : 0); c.mv("dash", j >= 1 ? {} : { x: 30 });
        c.mv("d1", { sx: j >= 1 ? 0.28 : 0.02, pv: [222, 110] }, { d: 1, dl: 0.4 }); c.mv("d2", { sx: j >= 1 ? 0.2 : 0.02, pv: [222, 170] }, { d: 1, dl: 0.6 });
        c.op("bad", j === 2 ? 1 : 0); c.op("ot", j === 2 ? 0 : 1); c.mv("bad", j === 2 ? {} : { s: 1.4 });
      }
    },
    // V2 · moments 3–6 · Business Solution conveyor (LottieFiles) — https://lottiefiles.com/free-animation/business-solution-pNyNfkcRsa
    // Adapted: boxes ride a conveyor past a control panel and turning gear; the measure acts like a
    // magnet pulling the worker's attention toward whatever it counts.
    {
      src: "https://lottiefiles.com/free-animation/business-solution-pNyNfkcRsa",
      labels: ["Measures steer behaviour", "The old job", "The new job", "Old measures discourage"],
      draw: () => {
        const magnet = (x, y, col) => `<g transform="translate(${x} ${y})">${P("M-22 -26 V4 A22 22 0 0 0 22 4 V-26", col, 14)}${R(-29, -34, 14, 14, C.grey, 2)}${R(15, -34, 14, 14, C.grey, 2)}</g>`;
        let s = R(16, 196, 368, 18, C.slate, 9) + rep(9, (i) => O(32 + i * 42, 205, 6, C.grey));
        s += `<g class="a-run">${rep(9, (i) => K("tk" + i, R(-40 + i * 46, 172, 30, 22, i % 2 ? C.sky : C.white, 4, `stroke="${C.navy}" stroke-width="1.6"`)))}</g>`;
        s += H("mg", magnet(336, 70, C.red) + chip(300, 128, "What gets measured", { sz: 13, st: C.red, fg: C.red }) + `<g class="a-blink">${P("M300 70 Q240 80 196 100 M300 82 Q244 96 200 112", C.red, 2.5, 'stroke-dasharray="4 4"')}</g>`);
        s += K("who", person(0, 0, 2, C.navy), 'style="opacity:0"') + K("gh", hostP(0, 0, 2.1), 'style="opacity:0"');
        s += H("old", chip(130, 36, "Old job: fast check-ins", { sz: 14 }) + `<g class="a-spin">${gear(330, 120, 28, C.navy, C.sky)}</g>` + T(330, 168, "Speed target", 14, C.navy));
        s += H("kio", kioskI(300, 172, 0.95, C.mint) + chip(316, 40, "Kiosk: routine", { sz: 14, st: C.green, fg: C.green }));
        s += H("ex", R(52, 236, 46, 40, C.orange, 6) + R(108, 244, 38, 32, C.orange, 6) + T(100, 296, "Exceptions", 14, C.orange) + chip(130, 36, "New job: exceptions", { sz: 14, st: C.orange, fg: C.orange }));
        s += H("pull", P("M140 110 Q220 150 250 180", C.red, 3) + noDot(110, 248, 16) + chip(290, 262, "Discourages new work", { sz: 14, bg: C.red, st: C.red, fg: C.white }));
        return s;
      },
      render: (c, j) => {
        c.op("mg", j === 0 || j === 3 ? 1 : 0);
        c.op("who", j === 1 || j === 0 ? 1 : 0); c.mv("who", j === 0 ? { x: 150, y: 140, r: 10 } : { x: 150, y: 150 }, { d: 0.8 });
        c.op("gh", j >= 2 ? 1 : 0); c.mv("gh", j === 3 ? { x: 190, y: 150, r: 12 } : { x: 100, y: 160 }, { d: 0.9 });
        c.op("old", j === 1 ? 1 : 0);
        c.op("kio", j === 2 ? 1 : 0);
        c.op("ex", j === 2 ? 1 : j === 3 ? 0.5 : 0);
        c.op("pull", j === 3 ? 1 : 0);
        for (let i = 0; i < 9; i++) c.op("tk" + i, j < 0 ? 0 : 1, { dl: i * 0.05 });
      }
    },
    // V3 · moments 7–8 · Bar Chart Race, Explained (Observable/D3) — https://observablehq.com/@d3/bar-chart-race-explained
    // Adapted: keyed bars grow and re-rank — the throughput race puts the quick host first and hides
    // the value of the difficult dispute.
    {
      src: "https://observablehq.com/@d3/bar-chart-race-explained",
      labels: ["Two kinds of work", "Speed-only ranking"],
      draw: () =>
        H("lanes", hostP(46, 98, 1.6) + chip(46, 140, "Host A", { sz: 14 }) + hostP(46, 220, 1.6) + chip(46, 262, "Host B", { sz: 14 }) +
          rep(8, (i) => K("q" + i, R(96 + i * 34, 82, 24, 24, C.green, 5) + tick(108 + i * 34, 94, 0.55, C.white, 2))) + T(232, 136, "Quick routine interactions", 14, C.green) +
          K("big", R(96, 190, 120, 56, C.orange, 10) + T(156, 224, "Rate dispute", 15, C.white)) + D("bp", "M220 218 H300", C.green, 4) + okDot(318, 218, 16) + T(300, 266, "Referrals avoided", 14, C.green)) +
        H("race", chip(200, 30, "Throughput-only scorecard", { sz: 15, bg: C.navy, fg: C.white }) +
          T(58, 104, "Host A", 16, C.navy, "", "end") + K("r1", R(70, 84, 300, 30, C.navy, 6)) + T(354, 104, "1st", 16, C.white, "", "end") +
          T(58, 174, "Host B", 16, C.navy, "", "end") + K("r2", R(70, 154, 300, 30, C.orange, 6)) + T(130, 174, "2nd", 16, C.white, "", "end") +
          starI(160, 226, 14, C.gold) + chip(270, 226, "Guest value unseen", { sz: 15, st: C.orange, fg: C.orange }) + chip(200, 274, "Wrong host ranked first", { sz: 14, bg: C.red, st: C.red, fg: C.white })),
      render: (c, j) => {
        c.op("lanes", j === 0 ? 1 : 0);
        for (let i = 0; i < 8; i++) c.op("q" + i, j === 0 ? 1 : 0, { dl: j === 0 ? i * 0.18 : 0 });
        c.dr("bp", j === 0 ? 1 : 0, { dl: 1, d: 1.4 });
        c.op("race", j === 1 ? 1 : 0);
        c.mv("r1", { sx: j === 1 ? 1 : 0.02, pv: [70, 99] }, { d: 1.4 }); c.mv("r2", { sx: j === 1 ? 0.22 : 0.02, pv: [70, 169] }, { d: 1.4 });
      }
    },
    // V4 · moments 9–11 · Infographics For Everything (Motion Array) — https://motionarray.com/after-effects-templates/infographics-for-everything-2593374/
    // Adapted: full-screen infographic beats — a three-way balance, then a fraction built from unit
    // blocks, then blocks that physically leave the denominator.
    {
      src: "https://motionarray.com/after-effects-templates/infographics-for-everything-2593374/",
      labels: ["Balance, don't abandon", "Appropriate local resolution", "The denominator matters"],
      draw: () => {
        let s = H("tri", F("M200 64 L330 238 H70 Z", "none", `stroke="${C.muted}" stroke-width="3" stroke-dasharray="6 6"`) + O(200, 168, 10, C.orange) +
          chip(200, 50, "Efficiency", { sz: 16, bg: C.navy, fg: C.white }) + chip(86, 250, "Resolution", { sz: 16, bg: C.green, st: C.green, fg: C.white }) + chip(306, 250, "Decision quality", { sz: 16, bg: C.plum, st: C.plum, fg: C.white }) +
          chip(200, 140, "Keep, then balance", { sz: 14, st: C.slate, fg: C.slate }));
        s += H("pm", chip(200, 26, "Proposed measure", { sz: 14, st: C.slate, fg: C.slate })) + H("frac", T(200, 70, "Resolved correctly, locally", 16, C.green) + P("M40 92 H360", C.ink, 4) +
          T(200, 280, "Eligible exceptions within authority", 15, C.navy) + R(40, 104, 320, 150, "rgba(31,78,121,.06)", 12, `stroke="${C.navy}" stroke-width="2"`));
        for (let i = 0; i < 12; i++) {
          const x = 62 + (i % 6) * 48, y = 120 + Math.floor(i / 6) * 64, out = i === 5 || i === 11;
          s += `<g data-k="u" data-i="${i}" style="opacity:0">${R(x, y, 40, 48, out ? C.grey : i % 6 < 4 ? C.green : C.sky, 6)}${out ? T(x + 20, y + 30, "↑", 18, C.slate) : i % 6 < 4 ? tick(x + 20, y + 24, 0.8, C.white, 3) : ""}</g>`;
        }
        s += H("bin", R(286, 40, 104, 46, C.white, 8, `stroke="${C.slate}" stroke-width="2" stroke-dasharray="5 4"`) + T(338, 60, "Beyond", 13, C.slate) + T(338, 77, "authority", 13, C.slate));
        s += H("np", chip(110, 26, "Not penalised", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
        return s;
      },
      render: (c, j) => {
        c.op("tri", j === 0 ? 1 : 0);
        c.op("frac", j >= 1 ? 1 : 0);
        c.all('[data-k="u"]').forEach((el) => {
          const i = +el.getAttribute("data-i"), out = i === 5 || i === 11;
          c.opEl(el, j >= 1 ? 1 : 0, { dl: j === 1 ? i * 0.08 : 0 });
          c.mvEl(el, j === 2 && out ? { x: 30, y: (i === 5 ? -60 : -124), s: 0.4 } : {}, { d: 1, dl: j === 2 ? 0.2 : 0 }); if (out) c.opEl(el, j === 1 ? 1 : 0, { dl: j === 2 ? 0.9 : j === 1 ? i * 0.08 : 0 });
        });
        c.op("pm", j === 1 ? 1 : 0); c.op("bin", j === 2 ? 1 : 0); c.op("np", j === 2 ? 1 : 0, { dl: j === 2 ? 0.9 : 0 });
      }
    },
    // V5 · moments 12–13 · Sankey animation – acyclic graph (Observable) — https://observablehq.com/@joaormendes/sankey-animation-acyclic-graph
    // Adapted: particles route through an acyclic network and accumulate at their destination.
    {
      src: "https://observablehq.com/@joaormendes/sankey-animation-acyclic-graph",
      labels: ["Correct escalations", "Necessary or avoidable?"],
      draw: () =>
        H("ok", [["Ineligible case", 60], ["Above AED 400", 150], ["Specialist judgement", 240]].map(([t, y], i) =>
          chip(100, y, t, { sz: 14, st: C.green, fg: C.green }) + D("e" + i, `M${100 + tw(t, 14) / 2} ${y} C240 ${y} 250 150 300 150`, C.green, 6)).join("") +
          O(330, 150, 32, C.green) + tick(330, 150, 1.4, C.white, 4) + T(330, 206, "Correct escalation", 14, C.green)) +
        H("br", chip(80, 150, "Why escalated?", { sz: 15, bg: C.navy, fg: C.white }) +
          P("M150 150 C220 150 220 80 280 80", C.green, 22, 'stroke-linecap="butt"') + P("M150 150 C220 150 220 220 280 220", C.orange, 22, 'stroke-linecap="butt"') +
          `<g class="a-stream">${P("M150 150 C220 150 220 80 280 80", C.white, 6)}${P("M150 150 C220 150 220 220 280 220", C.white, 6)}</g>` +
          chip(326, 80, "Legitimate", { sz: 15, st: C.green, fg: C.green }) + T(326, 112, "authority boundary", 13, C.green) +
          chip(326, 220, "Avoidable", { sz: 15, st: C.orange, fg: C.orange }) + T(326, 252, "organisational barrier", 13, C.orange) +
          chip(200, 286, "Not every escalation fails", { sz: 14, st: C.slate, fg: C.slate })),
      render: (c, j) => {
        c.op("ok", j === 0 ? 1 : 0);
        for (let i = 0; i < 3; i++) c.dr("e" + i, j === 0 ? 1 : 0, { dl: j === 0 ? i * 0.3 : 0 });
        c.op("br", j === 1 ? 1 : 0); c.mv("br", j === 1 ? {} : { x: -20 });
      }
    },
    // V6 · moments 14–15 · Factory Manufacturing Animation Pack (LottieFiles) — https://lottiefiles.com/marketplace/factory-manufacturing
    // Adapted: items flow along a line and pause at an inspection gate before release; without the
    // gate, output piles up unchecked.
    {
      src: "https://lottiefiles.com/marketplace/factory-manufacturing",
      labels: ["Sample decision quality", "Without a safeguard"],
      draw: () =>
        R(10, 150, 380, 14, C.slate, 7) +
        `<g class="a-run">${rep(8, (i) => R(-30 + i * 50, 122, 32, 26, C.white, 4, `stroke="${C.navy}" stroke-width="1.6"`) + tick(-14 + i * 50, 135, 0.6, C.green, 2.2))}</g>` +
        H("gate", R(176, 70, 48, 94, "rgba(31,78,121,.12)", 6, `stroke="${C.navy}" stroke-width="3"`) + magI(200, 100, 18, C.navy) +
          [["Case resolved", 66], ["Decision sampled", 150], ["Rule verified", 250], ["Feedback given", 334]].map(([t, x], i) => chip(x, i % 2 ? 260 : 222, t, { sz: 13, st: i === 1 ? C.navy : C.slate, fg: i === 1 ? C.navy : C.slate })).join("") +
          chip(200, 34, "Quality sampling", { sz: 16, bg: C.navy, fg: C.white })) +
        H("pile", rep(9, (i) => `<g transform="rotate(${(i * 23) % 30 - 15} ${300 + (i % 3) * 22} ${222 - Math.floor(i / 3) * 22})">${R(286 + (i % 3) * 22, 210 - Math.floor(i / 3) * 22, 30, 22, C.white, 4, `stroke="${C.red}" stroke-width="1.6"`)}${T(301 + (i % 3) * 22, 226 - Math.floor(i / 3) * 22, "✓", 13, C.red)}</g>`) +
          P(gaugeArc(110, 252, 56, 1), "#e4e0d8", 14) + P(gaugeArc(110, 252, 56, 0.95), C.orange, 14) + T(110, 232, "Local score", 13, C.orange) +
          chip(200, 34, "Approvals pile up", { sz: 16, bg: C.red, st: C.red, fg: C.white }) + chip(290, 96, "Inappropriate approvals", { sz: 13, st: C.red, fg: C.red })),
      render: (c, j) => {
        c.op("gate", j === 0 ? 1 : 0);
        c.op("pile", j === 1 ? 1 : 0); c.mv("pile", j === 1 ? {} : { y: -30 }, { e: "bounce.out" });
      }
    },
    // V7 · moments 16–18 · Infographics Pack by ARstudio (Motion Array) — https://motionarray.com/after-effects-templates/infographics-pack-135055/
    // Adapted: chart elements and callouts reveal one module at a time on a tiled board, then a
    // stamp-style callout qualifies the whole board.
    {
      src: "https://motionarray.com/after-effects-templates/infographics-pack-135055/",
      labels: ["Guest experience", "Rework reveals quality", "Proposed, not observed"],
      draw: () =>
        K("m1", tile(16, 20, 178, 108, C.green, "Local resolution", okDot(105, 62, 22))) +
        K("m2", tile(206, 20, 178, 108, C.plum, "Decision quality", magI(288, 60, 18, C.plum))) +
        K("m3", tile(16, 172, 178, 108, C.orange, "Guest experience", F("M105 222 C85 206 80 190 92 182 C100 176 105 182 105 188 C105 182 110 176 118 182 C130 190 125 206 105 222 Z", C.orange))) +
        K("m4", tile(206, 172, 178, 108, C.teal, "Rework", `<g class="a-spin">${P("M268 214 A22 22 0 1 1 290 236", C.teal, 6)}${F("M262 202 L268 216 L278 206 Z", C.teal)}</g>`)) +
        H("stp", stampI(200, 150, "Proposed, not results", C.red, -8, 18)),
      render: (c, j) => {
        c.op("m1", j < 0 ? 0 : j === 2 ? 1 : 0.4); c.op("m2", j < 0 ? 0 : j === 2 ? 1 : 0.4);
        c.op("m3", j >= 0 ? (j === 1 ? 0.4 : 1) : 0); c.mv("m3", j === 0 ? { s: 1.04 } : {}, { e: "back.out(2)" });
        c.op("m4", j >= 1 ? 1 : 0); c.mv("m4", j === 1 ? { s: 1.04 } : j >= 1 ? {} : { x: 30 }, { e: "back.out(2)" });
        c.op("stp", j === 2 ? 1 : 0); c.mv("stp", j === 2 ? {} : { s: 1.6 }, { dl: j === 2 ? 0.3 : 0 });
      }
    },
    // V8 · moments 19–21 · Infographics V2 by Typoland (Motion Array) — https://motionarray.com/after-effects-templates/infographics-v2-556482/
    // Adapted: scale and numeric tweens on statistic modules — a balance of what employees control,
    // a score that moves the wrong way, and a barrier removed before scoring.
    {
      src: "https://motionarray.com/after-effects-templates/infographics-v2-556482/",
      labels: ["Fair measures", "Don't punish correct referrals", "Fix barriers first"],
      draw: () =>
        H("fair", F("M200 120 L180 246 H220 Z", C.navy) + K("beam", P("M60 120 H340", C.navy, 7) + O(200, 120, 9, C.orange) +
          R(36, 126, 110, 72, C.mint, 8, `stroke="${C.green}" stroke-width="2"`) + T(91, 152, "Within their", 13, C.green) + T(91, 180, "control", 13, C.green) +
          R(254, 126, 110, 72, C.peach, 8, `stroke="${C.red}" stroke-width="2"`) + T(309, 152, "Missing", 13, C.red) + T(309, 180, "permissions", 13, C.red)) +
          chip(200, 36, "Judge what they control", { sz: 16, st: C.navy }) + chip(306, 270, "Policy contradictions", { sz: 13, st: C.red, fg: C.red })) +
        H("pen", hostP(64, 132, 1.8) + arrowV(64, 160, 210, C.green, 4) + mgrP(64, 262, 1.6) + chip(150, 220, "Correct referral", { sz: 14, st: C.green, fg: C.green }) +
          R(222, 30, 162, 106, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + T(303, 56, "Scorecard", 15, C.navy) + TK("sc", 303, 106, "0", 40, C.red) +
          chip(296, 182, "Risky approval rewarded", { sz: 13, bg: C.red, st: C.red, fg: C.white }) + chip(150, 40, "AED 320, no authority", { sz: 13, st: C.orange, fg: C.orange })) +
        H("fix", lockI(110, 150, 3.2, C.slate) + K("shk", P("M96 116 V96 A14 14 0 0 1 124 96", C.green, 7)) +
          `<g transform="rotate(-30 200 150)">${R(170, 140, 70, 18, C.slate, 6)}${O(178, 149, 16, "none", `stroke="${C.slate}" stroke-width="8"`)}</g>` +
          chip(290, 104, "1 · Fix authority gap", { sz: 15, bg: C.green, st: C.green, fg: C.white }) + chip(290, 160, "2 · Then judge", { sz: 15, st: C.navy }) +
          chip(200, 262, "Barrier before behaviour", { sz: 15, st: C.green, fg: C.green })),
      render: (c, j) => {
        c.op("fair", j === 0 ? 1 : 0); c.mv("beam", { r: j === 0 ? -6 : 0, pv: [200, 120] }, { d: 1.3, e: "elastic.out(1,0.45)" });
        c.op("pen", j === 1 ? 1 : 0); c.num("sc", j === 1 ? -5 : 0);
        c.op("fix", j === 2 ? 1 : 0); c.mv("shk", j === 2 ? { y: -14 } : {}, { dl: 0.8 });
      }
    },
    // V9 · moments 22–25 · Workflow AI Animation (Dribbble) — https://dribbble.com/shots/26275497-Workflow-AI-Animation
    // Adapted: an input travels through sequential processing stages, each stage lighting as it
    // transforms the data — here process requirements become operating behaviour.
    {
      src: "https://dribbble.com/shots/26275497-Workflow-AI-Animation",
      labels: ["One consistent message", "Coordinate the system", "Review inherited targets", "Reward the new work"],
      draw: () => {
        const ST = [["Process", "requirements", C.navy], ["Performance", "measures", C.plum], ["Recognition", "and rewards", C.amber], ["Operating", "behaviour", C.green]];
        let s = H("msg", chip(100, 60, "Process design", { sz: 15 }) + chip(300, 60, "Performance system", { sz: 15, st: C.plum, fg: C.plum }) +
          D("m1", "M100 76 Q120 160 186 196", C.navy, 4) + D("m2", "M300 76 Q280 160 214 196", C.plum, 4) + hostP(200, 236, 2.2) +
          chip(200, 140, "Same message", { sz: 16, bg: C.green, st: C.green, fg: C.white }));
        s += H("pipe", ST.map(([a, b, col], i) => { const x = 52 + i * 99; return K("p" + i, O(x, 150, 30, col) + T(x, 157, String(i + 1), 20, C.white) + T(x, 202, a, 13, col) + T(x, 219, b, 13, col)) + (i < 3 ? D("pl" + i, `M${x + 32} 150 H${x + 66}`, C.ink, 3) : ""); }).join("") +
          [["Process owners", 70], ["Operations", 200], ["HR", 330]].map(([t, x]) => chip(x, 46, t, { sz: 14, st: C.slate, fg: C.slate })).join("") + `<g class="a-stream">${P("M86 150 H117 M185 150 H216 M284 150 H315", C.white, 5)}</g>` +
          chip(200, 270, "Coordinated, not siloed", { sz: 14, bg: C.navy, fg: C.white }));
        s += H("rev", R(60, 40, 280, 200, C.white, 12, `stroke="${C.navy}" stroke-width="2.5"`) + T(200, 72, "Inherited targets", 18, C.navy) +
          chip(200, 120, "Check-ins per shift", { sz: 16 }) + chip(200, 172, "Average speed", { sz: 16 }) + P("M110 120 H290 M130 172 H270", C.red, 4) + stampI(276, 228, "Under review", C.orange, -8, 16));
        s += H("pr", F("M200 120 L180 246 H220 Z", C.navy) + K("pb", P("M50 120 H350", C.navy, 7) + O(200, 120, 9, C.orange) +
          rep(10, (i) => R(52 + (i % 5) * 18, 84 - Math.floor(i / 5) * 18, 14, 14, C.grey, 3)) + R(278, 64, 60, 50, C.orange, 8) + T(308, 95, "Hard case", 13, C.white)) +
          chip(90, 170, "Easy transactions", { sz: 14, st: C.slate, fg: C.slate }) + chip(310, 170, "Right exceptions", { sz: 14, st: C.orange, fg: C.orange }) +
          chip(200, 34, "Reward the new work", { sz: 17, bg: C.green, st: C.green, fg: C.white }));
        return s;
      },
      render: (c, j) => {
        c.op("msg", j === 0 ? 1 : 0); c.dr("m1", j === 0 ? 1 : 0, { dl: 0.2 }); c.dr("m2", j === 0 ? 1 : 0, { dl: 0.4 });
        c.op("pipe", j === 1 ? 1 : 0);
        for (let i = 0; i < 4; i++) { c.mv("p" + i, j === 1 ? {} : { s: 0.6 }, { dl: j === 1 ? i * 0.35 : 0, e: "back.out(1.8)" }); if (i < 3) c.dr("pl" + i, j === 1 ? 1 : 0, { dl: j === 1 ? 0.2 + i * 0.35 : 0, d: 0.4 }); }
        c.op("rev", j === 2 ? 1 : 0);
        c.op("pr", j === 3 ? 1 : 0); c.mv("pb", { r: j === 3 ? 8 : 0, pv: [200, 120] }, { d: 1.4, dl: 0.3, e: "elastic.out(1,0.45)" });
      }
    }
  ];
  VL_SCENES["W10O2b"] = makeScene({ id, panels, bg: "#f6f3ec", desc: "A careful rate resolution looks inefficient on the old dashboard; measures steer behaviour from fast check-ins toward exceptions; a speed-only race ranks the wrong host first; proposed balanced measures add appropriate local resolution with the right denominator, quality sampling, guest experience and rework; fairness means fixing barriers first, so the whole people system rewards the new work." });
  mirror("W10O2b"); SCENE_BG.push([id, "#f6f3ec"]);
}

// ============================================================
// W10O2c · "Write the real job"  (21 narration moments, 9 visuals)
// Story spine: a title is not a description → the description arrived three weeks after go-live
// (observed) → old work morphs into new work → the description is written section by section
// (purpose, 1 responsibilities, 2 decision rights, 3 accountability, 4 capability,
// 5 performance) → job evaluation, not automatic grades → reviewed, explained, recognisable.
// Proposed role wording is an instructional example, not Qasr's actual document.
// ============================================================
{
  const id = "W10O2c";
  const FLOOR = () => R(-400, 244, 1200, 400, "#e9e4f0");
  const num5 = (n) => O(26, 26, 17, C.orange) + T(26, 32, String(n), 17, C.white);
  const panels = [
    // V1 · moments 0–2 · Project TimeLine (Motion Array) — https://motionarray.com/after-effects-templates/project-timeline-2424919/
    // Adapted: a horizontal project timeline whose marker advances along time ticks and drops a
    // milestone card where it lands.
    {
      src: "https://motionarray.com/after-effects-templates/project-timeline-2424919/",
      labels: ["Title isn't description", "Three weeks late", "Working without a description"],
      draw: () =>
        H("tit", R(26, 60, 150, 96, C.green, 14) + R(86, 44, 30, 22, C.gold, 4) + T(101, 104, "Guest Host", 20, C.white) + T(101, 132, "new title", 14, C.mint) +
          docI(226, 34, 150, 196, C.slate, 0) + rep(5, (i) => R(242, 76 + i * 28, 118, 9, "#eef1f4", 4, `stroke="${C.muted}" stroke-width="1" stroke-dasharray="3 3"`)) + T(301, 50, "Role description", 13, C.white) +
          T(200, 118, "≠", 34, C.red) + chip(200, 262, "Must match the work", { sz: 16, bg: C.navy, fg: C.white })) +
        H("tl", P("M30 200 H370", C.navy, 5) + [[60, "Go-live"], [160, "Week 1"], [250, "Week 2"], [340, "Week 3"]].map(([x, t], i) =>
          P(`M${x} 190 V210`, C.navy, 3) + T(x, 234, t, 14, i === 0 ? C.orange : C.navy)).join("") + O(60, 200, 10, C.orange) +
          rep(22, (i) => hostP(26 + (i % 11) * 15, 150 + Math.floor(i / 11) * 22, 0.42)) + K("doc", docI(-22, -30, 44, 56, C.green, 3) + okDot(16, -26, 9))) +
        H("gap", K("gb", R(60, 192, 280, 16, C.red, 8)) + chip(200, 34, "Three-week gap", { sz: 18, bg: C.red, st: C.red, fg: C.white }) +
          hostP(200, 150, 1.6) + docI(232, 92, 40, 50, C.slate, 0, C.white) + T(252, 128, "?", 22, C.orange) + chip(110, 270, "Observed at Qasr", { sz: 14, st: C.slate, fg: C.slate })),
      render: (c, j) => {
        c.op("tit", j === 0 ? 1 : 0);
        c.op("tl", j >= 1 ? 1 : 0);
        c.mv("doc", j >= 1 ? { x: 340, y: 150 } : { x: 60, y: 60 }, { d: 1.6, dl: 0.3, e: "power2.inOut" }); c.op("doc", j >= 1 ? 1 : 0);
        c.op("gap", j === 2 ? 1 : 0); c.mv("gb", { sx: j === 2 ? 1 : 0.02, pv: [60, 200] }, { d: 1.2 });
      }
    },
    // V2 · moments 3–4 · Shape tweening (Observable/D3) — https://observablehq.com/@d3/shape-tweening
    // Adapted: one set of shapes interpolates into another; the pile of identical check-in tickets
    // turns into three different kinds of work.
    {
      src: "https://observablehq.com/@d3/shape-tweening",
      labels: ["The former work", "The Guest Host's work"],
      draw: () =>
        K("fda", person(70, 214, 2.4, C.navy)) + K("gh", hostP(70, 214, 2.5), 'style="opacity:0"') +
        H("c1", chip(118, 40, "Former Front Desk Agent", { sz: 14 })) + H("c2", chip(84, 40, "Guest Host", { sz: 16, bg: C.green, st: C.green, fg: C.white })) +
        rep(6, (i) => K("tk" + i, R(170 + (i % 3) * 66, 70 + Math.floor(i / 3) * 70, 56, 46, C.sky, 6, `stroke="${C.navy}" stroke-width="2"`) + P(`M${180 + (i % 3) * 66} ${88 + Math.floor(i / 3) * 70} h36 M${180 + (i % 3) * 66} ${100 + Math.floor(i / 3) * 70} h24`, C.navy, 3))) +
        H("ot", chip(266, 236, "Routine check-ins", { sz: 15 })) +
        [[magI(168, 70, 20, C.orange), "Exception judgement", 76, C.orange], [P("M146 156 a14 14 0 0 1 20 -16 l10 10 a14 14 0 0 1 -16 20 M196 156 a14 14 0 0 1 -20 16 l-10 -10 a14 14 0 0 1 16 -20", C.teal, 6), "Coordination", 156, C.teal]]
          .map(([ic, t, y, col], i) => H("n" + i, ic + chip(292, y, t, { sz: 15, st: col, fg: col }))).join("") +
        H("n2", keyI(172, 236, 1.6, C.amber) + chip(292, 236, "Authorised decisions", { sz: 15, st: C.amber, fg: C.amber })),
      render: (c, j) => {
        const nw = j >= 1;
        c.op("fda", nw ? 0 : j < 0 ? 0 : 1); c.op("gh", nw ? 1 : 0); c.mv("gh", nw ? {} : { s: 0.8 });
        c.op("c1", j === 0 ? 1 : 0); c.op("c2", nw ? 1 : 0);
        for (let i = 0; i < 6; i++) { c.op("tk" + i, j === 0 ? 1 : 0, { dl: j === 0 ? i * 0.1 : 0 }); c.mv("tk" + i, nw ? { s: 0.2, x: (i % 3 - 1) * 20, y: 20 } : j < 0 ? { y: -20 } : {}, { d: 0.8 }); }
        c.op("ot", j === 0 ? 1 : 0);
        for (let i = 0; i < 3; i++) { c.op("n" + i, nw ? 1 : 0, { dl: nw ? 0.5 + i * 0.35 : 0 }); c.mv("n" + i, nw ? {} : { s: 0.3 }, { dl: nw ? 0.5 + i * 0.35 : 0, e: "back.out(1.8)" }); }
      }
    },
    // V3 · moments 5–7 · Outline – Explainer Kit (Motion Array) — https://motionarray.com/after-effects-templates/outline-explainer-kit-36706/
    // Adapted: outlines draw themselves, then role/action cards appear inside each outlined block.
    {
      src: "https://motionarray.com/after-effects-templates/outline-explainer-kit-36706/",
      labels: ["Start with purpose", "1 · Responsibilities", "2 · Decision rights"],
      draw: () =>
        R(20, 12, 360, 280, C.white, 14, `stroke="${C.navy}" stroke-width="2.5"`) + R(20, 12, 360, 34, C.navy, 14) + R(20, 34, 360, 12, C.navy) + T(200, 36, "Guest Host · job description", 15, C.white) +
        D("o0", "M30 52 H370 V118 H30 Z", C.green, 2.5) + D("o1", "M30 124 H370 V206 H30 Z", C.navy, 2.5) + D("o2", "M30 212 H370 V286 H30 Z", C.amber, 2.5) +
        H("s0", T(42, 74, "Purpose", 15, C.green, "", "start") + chip(270, 72, "Help guests arrive", { sz: 13, st: C.green, fg: C.green }) + chip(214, 100, "Resolve eligible exceptions", { sz: 13, st: C.green, fg: C.green })) +
        H("s1", T(42, 144, "1 · Responsibilities", 15, C.navy, "", "start") + chip(290, 140, "Assist with kiosks", { sz: 13 }) + chip(102, 176, "Explain decisions", { sz: 13 }) +
          chip(288, 176, "Investigate discrepancies", { sz: 13 })) +
        H("s2", T(42, 232, "2 · Decision rights", 15, C.amber, "", "start") + chip(126, 262, "Permitted decisions", { sz: 13, st: C.amber, fg: C.amber }) + chip(292, 262, "Escalation limits", { sz: 13, st: C.amber, fg: C.amber }) + keyI(334, 230, 0.8, C.amber)),
      render: (c, j) => {
        for (let i = 0; i < 3; i++) {
          c.dr("o" + i, j >= i ? 1 : 0, { d: 0.9 });
          c.op("s" + i, j >= i ? (j === i ? 1 : 0.5) : 0, { dl: j === i ? 0.6 : 0 });
          c.mv("s" + i, j >= i ? {} : { y: 10 }, { dl: j === i ? 0.6 : 0 });
        }
      }
    },
    // V4 · moments 8–9 · Interactive SVG Path & GSAP Animation (CodePen) — https://codepen.io/WebGuyJeff/pen/rNdmqdO
    // Adapted: a path is traced, a marker moves along it, and the destination is highlighted.
    {
      src: "https://codepen.io/WebGuyJeff/pen/rNdmqdO",
      labels: ["Align with delegation", "Decision responsibilities"],
      draw: () =>
        H("al", R(16, 40, 160, 150, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + T(96, 66, "Job description", 15, C.navy) + R(28, 96, 136, 36, C.sky, 6) + T(96, 119, "≤ AED 400 clause", 14, C.navy) +
          R(224, 40, 160, 150, C.white, 10, `stroke="${C.green}" stroke-width="2.5"`) + T(304, 66, "Delegation schedule", 13, C.green) + R(236, 96, 136, 36, C.mint, 6) + T(304, 119, "Approved limit", 14, C.green) +
          D("ln", "M164 114 C190 100 210 100 236 114", C.green, 5) + okDot(200, 82, 13) +
          envI(150, 222, 100, 58, C.slate) + P("M136 214 L264 290", C.red, 4) + chip(76, 258, "Not an email", { sz: 15, st: C.red, fg: C.red }) + chip(326, 258, "Formal source", { sz: 15, bg: C.green, st: C.green, fg: C.white })) +
        H("pth", P("M40 220 C100 220 90 90 160 90 C230 90 230 220 300 220 C340 220 350 120 360 80", "#d4dbe3", 10) +
          D("tr", "M40 220 C100 220 90 90 160 90 C230 90 230 220 300 220 C340 220 350 120 360 80", C.navy, 5) +
          [[40, 220, "Check evidence", 78, 262], [160, 90, "Establish eligibility", 128, 40], [300, 220, "Verify authority", 300, 262], [360, 80, "Resolve or escalate", 310, 40]].map(([x, y, t, lx, ly], i) =>
            H("p" + i, O(x, y, 14, i === 3 ? C.green : C.navy, `stroke="${C.white}" stroke-width="3"`) + chip(lx, ly, t, { sz: 13, st: i === 3 ? C.green : C.navy, fg: i === 3 ? C.green : C.navy }))).join("")),
      render: (c, j) => {
        c.op("al", j === 0 ? 1 : 0); c.dr("ln", j === 0 ? 1 : 0, { dl: 0.3 });
        c.op("pth", j === 1 ? 1 : 0); c.dr("tr", j === 1 ? 1 : 0, { d: 2.2 });
        for (let i = 0; i < 4; i++) { c.op("p" + i, j === 1 ? 1 : 0, { dl: j === 1 ? i * 0.6 : 0 }); c.mv("p" + i, j === 1 ? {} : { s: 0.5 }, { dl: j === 1 ? i * 0.6 : 0, e: "back.out(2)" }); }
      }
    },
    // V5 · moments 10–11 · Celonis Process Explorer map (activity nodes, weighted edges) — https://help.celonis.com/cpm47/en/process-explorer
    // Adapted: nodes and frequency-weighted edges; the edges that belong to the role thicken,
    // the ones that belong elsewhere thin out behind a boundary.
    {
      src: "https://help.celonis.com/cpm47/en/process-explorer",
      labels: ["3 · Accountability", "Not every decision"],
      draw: () =>
        num5(3) +
        O(150, 168, 36, C.green) + hostP(150, 180, 1.5, C.white) +
        D("e0", "M150 132 V90", C.plum, 7) + mgrP(150, 64, 1.5) + chip(256, 56, "Process owner", { sz: 15, st: C.plum, fg: C.plum }) +
        D("e1", "M118 186 Q84 226 70 246", C.green, 7) + chip(70, 266, "Guest assisted", { sz: 14, st: C.green, fg: C.green }) +
        D("e2", "M182 186 Q216 226 230 246", C.green, 7) + chip(230, 266, "Exceptions resolved", { sz: 14, st: C.green, fg: C.green }) +
        H("bd", O(150, 196, 128, "none", `stroke="${C.green}" stroke-width="2.5" stroke-dasharray="8 6"`)) +
        H("out", P("M188 160 L292 128 M188 176 L292 196", C.muted, 2, 'stroke-dasharray="4 5"') + chip(320, 120, "Revenue policy", { sz: 13, st: C.muted, fg: C.slate }) + chip(318, 204, "Technical systems", { sz: 13, st: C.muted, fg: C.slate }) +
          noDot(240, 144, 11) + noDot(240, 186, 11) + chip(330, 162, "Not controlled", { sz: 13, bg: C.slate, st: C.slate, fg: C.white })),
      render: (c, j) => {
        c.dr("e0", j >= 0 ? 1 : 0, { dl: 0.2 }); c.dr("e1", j >= 0 ? 1 : 0, { dl: 0.5 }); c.dr("e2", j >= 0 ? 1 : 0, { dl: 0.7 });
        c.op("bd", j === 1 ? 1 : 0); c.op("out", j === 1 ? 1 : 0); c.mv("out", j === 1 ? {} : { x: 20 });
      }
    },
    // V6 · moments 12–13 · 3D Statistics Factory (LottieFiles) — https://lottiefiles.com/free-animation/3d-statistics-factory-lRiHNeU9Y4
    // Adapted: isometric equipment blocks are staged one at a time on a plinth and labelled by leaders.
    {
      src: "https://lottiefiles.com/free-animation/3d-statistics-factory-lRiHNeU9Y4",
      labels: ["4 · Capability", "More than the kiosk"],
      draw: () => {
        const cx = 120, A = 80, B = 26, TH = 16;
        const slab = (y, col) => F(`M${cx - A} ${y} L${cx} ${y + B} L${cx} ${y + B + TH} L${cx - A} ${y + TH} Z`, col, 'opacity=".7"') +
          F(`M${cx} ${y + B} L${cx + A} ${y} L${cx + A} ${y + TH} L${cx} ${y + B + TH} Z`, col, 'opacity=".88"') +
          F(`M${cx - A} ${y} L${cx} ${y - B} L${cx + A} ${y} L${cx} ${y + B} Z`, col, `stroke="${C.white}" stroke-width="1.5"`);
        const L = [["Arrival workflow", C.navy], ["Booking rules", C.plum], ["Waiver boundary", C.amber], ["Specialist support", C.teal]];
        let s = num5(4) + K("k0", slab(236, C.grey) + kioskI(120, 230, 0.45, C.sky));
        s += H("kl", chip(296, 246, "Kiosk interface", { sz: 15, st: C.slate, fg: C.slate }) + chip(290, 130, "Knowledge and judgement", { sz: 13, bg: C.navy, fg: C.white }) +
          [196, 156, 116, 76].map((y) => F(`M${cx - A} ${y} L${cx} ${y - B} L${cx + A} ${y} L${cx} ${y + B} Z`, "none", `stroke="${C.muted}" stroke-width="2" stroke-dasharray="6 5"`)).join("") + qDot(cx, 116, 14) + hostP(344, 194, 1.8));
        L.forEach(([t, col], i) => { const y = 196 - i * 40; s += H("b" + i, slab(y, col)) + H("l" + i, P(`M${cx + A + 4} ${y} H230`, col, 2, 'stroke-dasharray="3 3"') + chip(306, y, t, { sz: 14, st: col, fg: col })); });
        s += H("more", chip(300, 272, "More than the kiosk", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
        return s;
      },
      render: (c, j) => {
        c.op("kl", j === 0 ? 1 : 0);
        for (let i = 0; i < 4; i++) {
          c.op("b" + i, j === 1 ? 1 : 0, { dl: j === 1 ? i * 0.35 : 0 }); c.mv("b" + i, j === 1 ? {} : { y: -50 }, { d: 0.8, dl: j === 1 ? i * 0.35 : 0, e: "bounce.out" });
          c.op("l" + i, j === 1 ? 1 : 0, { dl: j === 1 ? 0.4 + i * 0.35 : 0 });
        }
        c.op("more", j === 1 ? 1 : 0, { dl: j === 1 ? 1.6 : 0 });
      }
    },
    // V7 · moments 14–16 · SaaS Dashboard Workflow UI Motion Concept (Dribbble) — https://dribbble.com/shots/27719715-SaaS-Dashboard-Workflow-UI-Motion-Concept
    // Adapted: cards reveal, panels reorganise (Flip-style) and the KPI that matters is highlighted.
    {
      src: "https://dribbble.com/shots/27719715-SaaS-Dashboard-Workflow-UI-Motion-Concept",
      labels: ["5 · Performance expectations", "Old targets mismatch", "Review them together"],
      draw: () =>
        num5(5) +
        H("pe", R(70, 40, 260, 210, C.white, 14, `stroke="${C.plum}" stroke-width="2.5"`) + T(200, 76, "Performance expectations", 16, C.plum) +
          chip(200, 120, "How success is seen", { sz: 15, st: C.plum, fg: C.plum }) + chip(200, 168, "How it is assessed", { sz: 15, st: C.plum, fg: C.plum }) + starI(200, 214, 16, C.gold)) +
        K("dL", R(20, 48, 168, 196, C.white, 12, `stroke="${C.navy}" stroke-width="2.5"`) + T(104, 76, "Job description", 15, C.navy) + chip(104, 128, "Careful exceptions", { sz: 13 }) + chip(104, 172, "Guest assistance", { sz: 13 })) +
        K("dR", R(212, 48, 168, 196, C.white, 12, `stroke="${C.orange}" stroke-width="2.5"`) + T(296, 76, "Scorecard", 15, C.orange) +
          K("old", chip(296, 128, "Check-in volume", { sz: 13, st: C.orange, fg: C.orange }) + chip(296, 172, "Transaction speed", { sz: 13, st: C.orange, fg: C.orange })) +
          H("new", chip(296, 128, "Exception outcomes", { sz: 13, st: C.green, fg: C.green }) + chip(296, 172, "Guest assistance", { sz: 13, st: C.green, fg: C.green }))) +
        H("neq", O(200, 150, 18, C.red) + T(200, 158, "≠", 22, C.white) + chip(200, 274, "Poorly aligned", { sz: 15, bg: C.red, st: C.red, fg: C.white })) +
        H("eq", O(200, 150, 18, C.green) + T(200, 158, "=", 22, C.white) + chip(200, 274, "Written role = measured role", { sz: 14, bg: C.green, st: C.green, fg: C.white })),
      render: (c, j) => {
        c.op("pe", j === 0 ? 1 : 0);
        c.op("dL", j >= 1 ? 1 : 0); c.op("dR", j >= 1 ? 1 : 0);
        c.mv("dL", j >= 1 ? (j === 2 ? { x: 6 } : {}) : { x: -40 }); c.mv("dR", j >= 1 ? (j === 2 ? { x: -6 } : {}) : { x: 40 });
        c.op("old", j === 2 ? 0 : 1); c.op("new", j === 2 ? 1 : 0, { dl: j === 2 ? 0.4 : 0 });
        c.op("neq", j === 1 ? 1 : 0); c.op("eq", j === 2 ? 1 : 0, { dl: j === 2 ? 0.6 : 0 });
      }
    },
    // V8 · moments 17–18 · Infographics by Ruslan Klimovich (Motion Array) — https://motionarray.com/after-effects-templates/infographics-3844461/
    // Adapted: statistic graphics sequence — input bars fill, feed one evaluation, and resolve
    // into an outcome callout.
    {
      src: "https://motionarray.com/after-effects-templates/infographics-3844461/",
      labels: ["Evaluate the work", "Not an automatic grade"],
      draw: () =>
        H("ev", [["Responsibility", 60], ["Judgement", 112], ["Accountability", 164]].map(([t, y], i) =>
          T(20, y - 10, t, 15, C.navy, "", "start") + R(20, y, 150, 16, "#e3e8ee", 8) + K("fb" + i, R(20, y, 150, 16, C.navy2, 8))).join("") +
          D("fl", "M178 112 H222", C.ink, 4) + F("M228 112 l-10 -7 v14 Z", C.ink) +
          R(234, 70, 152, 84, C.navy, 12) + T(310, 106, "Job", 18, C.white) + T(310, 130, "evaluation", 18, C.white) +
          arrowV(310, 156, 186, C.ink, 4) + chip(310, 212, "Grade decision", { sz: 16, st: C.green, fg: C.green }) + chip(200, 268, "Established procedure", { sz: 14, st: C.slate, fg: C.slate })) +
        H("na", R(40, 70, 130, 90, C.green, 14) + T(105, 112, "New title", 18, C.white) + T(105, 136, "alone", 14, C.mint) +
          P("M180 116 H236", C.red, 4) + F("M244 116 l-10 -7 v14 Z", C.red) + chip(310, 116, "Higher grade", { sz: 16, st: C.red, fg: C.red }) + P("M244 96 L376 136", C.red, 4) +
          chip(200, 216, "Evaluate the actual work", { sz: 17, bg: C.navy, fg: C.white })),
      render: (c, j) => {
        c.op("ev", j === 0 ? 1 : 0);
        for (let i = 0; i < 3; i++) c.mv("fb" + i, { sx: j === 0 ? [0.85, 0.75, 0.9][i] : 0.02, pv: [20, 0] }, { d: 1, dl: j === 0 ? i * 0.3 : 0 });
        c.dr("fl", j === 0 ? 1 : 0, { dl: 1 });
        c.op("na", j === 1 ? 1 : 0);
      }
    },
    // V9 · moments 19–20 · Design process timeline – Animation (Dribbble) — https://dribbble.com/shots/9892691-Design-process-timeline-Animation
    // Adapted: milestones reveal in order along a timeline — first the review loop, then a shift's
    // decisions each matched to a line of the description.
    {
      src: "https://dribbble.com/shots/9892691-Design-process-timeline-Animation",
      labels: ["Review and explain", "Recognisable on shift"],
      draw: () =>
        H("rv", docI(158, 92, 84, 108, C.navy, 5) + `<g class="a-spin">${O(200, 146, 96, "none", `stroke="${C.muted}" stroke-width="2.5" stroke-dasharray="10 8"`)}</g>` +
          mgrP(200, 52, 1.5, C.navy) + chip(316, 40, "Operations manager", { sz: 13 }) + mgrP(98, 220, 1.5) + chip(84, 270, "Process owner", { sz: 13, st: C.plum, fg: C.plum }) +
          hostP(302, 220, 1.5) + chip(316, 270, "Guest Hosts", { sz: 13, st: C.green, fg: C.green }) + chip(80, 40, "Practical examples", { sz: 13, st: C.amber, fg: C.amber })) +
        H("sh", P("M24 200 H376", C.navy, 4) + [[56, kioskI(56, 168, 0.4, C.sky), "Kiosk help"], [152, magI(150, 146, 14, C.orange), "Rate check"], [248, P("M234 140 h28 v20 h-18 l-10 8 z", C.green, 3), "Explain"], [344, arrowV(344, 160, 132, C.plum, 4), "Escalate"]]
          .map(([x, ic, t], i) => K("sv" + i, ic + O(x, 200, 9, C.navy) + chip(x, 230, t, { sz: 13 }) + okDot(x + 22, 120, 9))).join("") +
          chip(200, 274, "Old description enough?", { sz: 14, st: C.orange, fg: C.orange }) + chip(200, 40, "Matches a real shift", { sz: 16, bg: C.green, st: C.green, fg: C.white })),
      render: (c, j) => {
        c.op("rv", j === 0 ? 1 : 0);
        c.op("sh", j === 1 ? 1 : 0);
        for (let i = 0; i < 4; i++) { c.op("sv" + i, j === 1 ? 1 : 0, { dl: j === 1 ? i * 0.4 : 0 }); c.mv("sv" + i, j === 1 ? {} : { y: 16 }, { dl: j === 1 ? i * 0.4 : 0 }); }
      }
    }
  ];
  VL_SCENES["W10O2c"] = makeScene({ id, panels, bg: "#f4f2f7", desc: "A new Guest Host title is not a role description; the revised descriptions arrived three weeks after go-live; routine check-ins morph into exception judgement, coordination and authorised decisions; the description is written section by section — purpose, responsibilities, decision rights, accountability, capability and performance — then evaluated, reviewed and recognisable on a real shift." });
  mirror("W10O2c"); SCENE_BG.push([id, "#f4f2f7"]);
}

addStyles(SCENE_BG);
})();

// OPER621 · Week 10 · The People Phase — animated teaching scenes (round 2, Claude)
// File: w10-claude-part3.js  ·  Lesson 3 · Training is not capability  ·  Scenes: W10O3a, W10O3b, W10O3c
// Standalone part: loads AFTER the older Week 10 scene file and re-registers the same
// section ids so these scenes override it. Registers VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
// and appends its scoped rules (.vls-w10-<secId>) into the single shared <style id="vl-sc-w10">.
// Uses window.gsap when present (CSS transitions otherwise); honours prefers-reduced-motion.
// Every visual names the benchmark template it adapts, with its URL, in a code comment.
(() => {
"use strict";
// ================================================================
// Shared engine (self-contained copy in every part file).
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
// i = narration moment index (0-based), n = number of narration moments.
// Each scene is a sequence of 8-12 distinct VISUALS ("panels"); every panel
// covers 2-5 narration moments and re-stages itself at each moment so the
// figure always shows what the current narration line says.
// ================================================================
window.VL_SCENES = window.VL_SCENES || {};
const VL_SCENES = window.VL_SCENES;
const PART = "p3";
const C = {
  navy: "#1f4e79", navy2: "#2d6a9f", orange: "#c0502a", paper: "#fbf8f1",
  ink: "#1b2a3a", blue: "#dbe7f2", green: "#317c61", gold: "#e5b76c",
  muted: "#91aabd", plum: "#6b4e8a", sand: "#efe4cf", sky: "#eaf2f8",
  red: "#b0362b", white: "#ffffff", mint: "#e1f0e8", peach: "#f8e3d8",
  lilac: "#ece6f3", slate: "#5d7389", night: "#14263a", amber: "#a8741a",
  teal: "#2a7f8f", cream: "#fffaf0", grey: "#c5ced8", wall: "#efe7d8"
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
const inR = (k, a, b) => k >= a && k <= b;
// ---- SVG string builders ----
const R = (x, y, w, h, f, rx = 0, ex = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${ex}/>`;
const O = (cx, cy, r, f, ex = "") => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${ex}/>`;
const E = (cx, cy, rx, ry, f, ex = "") => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${ex}/>`;
const P = (d, s, w = 2, ex = "") => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const F = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
const D = (k, d, s, w = 3, ex = "") => `<path data-k="${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 101" stroke-dashoffset="100" ${ex}/>`;
const T = (x, y, s, sz = 14, f = C.ink, ex = "", a = "middle") => `<text x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const TK = (k, x, y, s, sz = 14, f = C.ink, a = "middle", ex = "") => `<text data-k="${k}" x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const K = (k, body, ex = "") => `<g data-k="${k}" ${ex}>${body}</g>`;
const H = (k, body, ex = "") => `<g data-k="${k}" style="opacity:0" ${ex}>${body}</g>`;
const tw = (s, sz) => Math.round(String(s).length * sz * 0.6 + sz * 1.3);
// chip = rounded label; grouped (data-chip) so layout QA treats it as one box
const chip = (x, y, s, o = {}) => {
  const sz = o.sz || 14, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.8);
  return `<g data-chip="1">` + R(x - w / 2, y - h / 2, w, h, o.bg || C.paper, o.rx == null ? h / 2 : o.rx,
    `stroke="${o.st || C.navy}" stroke-width="${o.sw || 1.6}"${o.dash ? ' stroke-dasharray="4 3"' : ""}`) +
    T(x, y + sz * 0.36, s, sz, o.fg || C.navy) + `</g>`;
};
// left-anchored chip (x = left edge)
const chipL = (x, y, s, o = {}) => { const sz = o.sz || 14, w = o.w || tw(s, sz); return chip(x + w / 2, y, s, Object.assign({}, o, { w })); };
const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${x - 7 * s} ${y} l${5 * s} ${5 * s} l${10 * s} ${-11 * s}`, col, w);
const cross = (x, y, s = 1, col = C.orange, w = 3) => P(`M${x - 6 * s} ${y - 6 * s} l${12 * s} ${12 * s} M${x + 6 * s} ${y - 6 * s} l${-12 * s} ${12 * s}`, col, w);
const okDot = (x, y, r = 10) => O(x, y, r, C.green) + tick(x, y, r / 18, C.white, 2.2);
const noDot = (x, y, r = 10, col = C.red) => O(x, y, r, col) + cross(x, y, r / 16, C.white, 2.2);
const qDot = (x, y, r = 10, col = C.orange) => O(x, y, r, col) + T(x, y + r * 0.45, "?", r * 1.3, C.white);
const xDot = (x, y, r = 10, col = C.orange) => O(x, y, r, col) + T(x, y + r * 0.45, "!", r * 1.3, C.white);
const person = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}</g>`;
// Guest Host: green figure with lanyard and badge
const hostP = (x, y, s = 1, col = C.green) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}${P("M-5 -3 L0 4 L5 -3", C.gold, 1.6)}${R(-3, 3, 6, 5, C.gold, 1)}</g>`;
// Manager: figure with a tie
const mgrP = (x, y, s = 1, col = C.plum) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}${F("M0 -3 L3 2 L0 10 L-3 2 Z", C.gold)}</g>`;
// Guest: figure with a suitcase
const guestP = (x, y, s = 1, col = C.navy2) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}${R(13, 0, 10, 12, C.orange, 2)}${P("M16 0 V-3 H20 V0", C.orange, 1.4)}</g>`;
const clock = (x, y, r, col = C.orange, bg = C.paper) => O(x, y, r, bg, `stroke="${col}" stroke-width="${Math.max(2, r / 6)}"`) + P(`M${x} ${y - r * 0.62} V${y} L${x + r * 0.45} ${y + r * 0.3}`, col, Math.max(2, r / 7));
const gear = (x, y, r, col, hole = C.paper) => {
  let d = ""; const n = 8;
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n * 0.55, a2 = a0 + Math.PI / n, a3 = a2 + Math.PI / n * 0.45;
    const p = (a, rr) => `${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`;
    d += (i ? "L" : "M") + p(a0, r) + "L" + p(a1, r) + "L" + p(a2, r * 0.78) + "L" + p(a3, r * 0.78);
  }
  return F(d + "Z", col) + O(x, y, r * 0.34, hole);
};
const keyI = (x, y, s = 1, col = C.amber) => `<g transform="translate(${x} ${y}) scale(${s})">${O(-10, 0, 8, "none", `stroke="${col}" stroke-width="4"`)}${P("M-2 0 H18 M12 0 V7 M17 0 V5", col, 4)}</g>`;
const lockI = (x, y, s = 1, col = C.red) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-11, -4, 22, 17, col, 3)}${P("M-7 -4 V-10 A7 7 0 0 1 7 -10 V-4", col, 3.4)}${O(0, 4, 2.6, C.white)}</g>`;
const shieldI = (x, y, s = 1, col = C.green, inner = "") => `<g transform="translate(${x} ${y}) scale(${s})">${F("M0 -20 L17 -13 V0 Q17 14 0 22 Q-17 14 -17 0 V-13 Z", col)}${inner}</g>`;
const docI = (x, y, w, h, col = C.navy, lines = 4, bg = C.white) => R(x, y, w, h, bg, 6, `stroke="${col}" stroke-width="1.8"`) + R(x, y, w, Math.min(16, h * 0.2), col, 6) + R(x, y + Math.min(16, h * 0.2) - 6, w, 6, col) +
  rep(lines, (i) => R(x + 10, y + Math.min(16, h * 0.2) + 12 + i * ((h - Math.min(16, h * 0.2) - 18) / Math.max(1, lines)), (w - 20) * (i % 3 === 2 ? 0.6 : 0.9), 4, "#d9e1ea", 2));
const envI = (x, y, w, h, col = C.navy) => R(x, y, w, h, C.white, 4, `stroke="${col}" stroke-width="2"`) + P(`M${x} ${y} L${x + w / 2} ${y + h * 0.55} L${x + w} ${y}`, col, 2);
const magI = (x, y, r, col = C.ink) => O(x, y, r, "rgba(255,255,255,.35)", `stroke="${col}" stroke-width="${Math.max(3, r / 9)}"`) + P(`M${x + r * 0.72} ${y + r * 0.72} L${x + r * 1.25} ${y + r * 1.25}`, col, Math.max(5, r / 5));
const starI = (x, y, r = 10, col = C.gold) => { let d = ""; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; d += (i ? "L" : "M") + (x + rr * Math.cos(a)).toFixed(1) + " " + (y + rr * Math.sin(a)).toFixed(1); } return F(d + "Z", col); };
const bldg = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-20, -34, 40, 46, col, 3)}${F("M-24 -34 L0 -48 L24 -34 Z", col)}${rep(6, (i) => R(-14 + (i % 3) * 11, -26 + Math.floor(i / 3) * 13, 6, 8, C.gold, 1))}${R(-5, 2, 10, 10, C.paper, 1)}</g>`;
const kioskI = (x, y, s = 1, scr = C.sky) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-22, -62, 44, 84, C.navy, 8)}${R(-17, -55, 34, 30, scr, 4)}${R(-11, -16, 22, 5, "#9cc0e0", 2)}${R(-6, -6, 12, 6, "#0f2f4f", 2)}${R(-27, 22, 54, 6, C.navy, 3)}</g>`;
const arrowH = (x1, y, x2, col = C.navy, w = 3) => P(`M${x1} ${y} H${x2}`, col, w) + F(`M${x2 + (x2 > x1 ? 2 : -2)} ${y} l${x2 > x1 ? -10 : 10} -6 v12 Z`, col);
const arrowV = (x, y1, y2, col = C.navy, w = 3) => P(`M${x} ${y1} V${y2}`, col, w) + F(`M${x} ${y2 + (y2 > y1 ? 2 : -2)} l-6 ${y2 > y1 ? -10 : 10} h12 Z`, col);
const bubble = (x, y, w, h, tx, sz = 14, col = C.navy, tail = "bl") => R(x, y, w, h, C.white, 10, `stroke="${col}" stroke-width="1.8"`) +
  F(tail === "bl" ? `M${x + 14} ${y + h - 1} L${x + 8} ${y + h + 12} L${x + 26} ${y + h - 1} Z` : `M${x + w - 14} ${y + h - 1} L${x + w - 8} ${y + h + 12} L${x + w - 26} ${y + h - 1} Z`, C.white, `stroke="${col}" stroke-width="1.8"`) +
  R(tail === "bl" ? x + 9 : x + w - 27, y + h - 3, 18, 4, C.white) + `<g data-chip="1">${R(x + 2, y + 2, w - 4, h - 4, "none")}${T(x + w / 2, y + h / 2 + sz * 0.36, tx, sz, col)}</g>`;
const stampI = (x, y, s, col = C.green, rot = -8, sz = 15) => { const w = tw(s, sz) + 10; return `<g transform="rotate(${rot} ${x} ${y})"><g data-chip="1">${R(x - w / 2, y - 16, w, 32, "rgba(255,255,255,.92)", 5, `stroke="${col}" stroke-width="3"`)}${T(x, y + 5.5, s, sz, col)}</g></g>`; };
const gaugeArc = (cx, cy, r, f) => { const a0 = Math.PI, a1 = Math.PI + Math.PI * clamp(f, 0, 1); return `M${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)}`; };
const bleed = (bg, deco = "") => R(-400, -300, 1200, 900, bg) + deco;
const grid = (col, step = 40) => rep(Math.ceil(1200 / step), (i) => P(`M${-400 + i * step} -300 V600`, col, 1)) + rep(Math.ceil(900 / step), (i) => P(`M-400 ${-300 + i * step} H800`, col, 1));
const dots = (col) => rep(46, (i) => O(-380 + (i * 97) % 1160, -280 + ((i * 53) % 860), 2.2, col));
// ---- per-scene stylesheet, appended once per part into the shared <style id="vl-sc-w10"> ----
function sceneCSS(id, bg) {
  const s = ".vls-w10-" + id;
  return `
${s}{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:230px;overflow:hidden!important;box-sizing:border-box;border-radius:14px;background:${bg};color:${C.ink};font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w10-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w10-fig>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}
${s} svg text{font-family:inherit;font-weight:700;letter-spacing:.1px}
${s} [data-k],${s} [data-pn]{transform-box:fill-box;transform-origin:50% 50%}
${s}.w10-css [data-k],${s}.w10-css [data-pn]{transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.85s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}
${s}.w10-snap [data-k],${s}.w10-snap [data-pn],${s}.w10-rm [data-k],${s}.w10-rm [data-pn]{transition:none!important}
${s}.w10-rm *,${s}.w10-snap *{animation:none!important}
${s} .w10-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:36px;padding:6px 12px 8px;font-size:14px;font-weight:700;line-height:1.25;color:${C.navy};background:rgba(255,255,255,.62);border-top:1px solid rgba(31,78,121,.14)}
${s} .w10-num{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w10-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.2px}
${s} .w10-lab.w10-in{animation:vlsw10CapIn .5s cubic-bezier(.22,.8,.24,1)}
${s} .w10-dots{flex:0 0 64px;display:grid;gap:2px;align-items:center}
${s} .w10-dots i{display:block;height:5px;border-radius:3px;background:rgba(31,78,121,.18);transition:background .4s ease,transform .4s ease}
${s} .w10-dots i.on{background:${C.orange};transform:scaleY(1.6)}
${s} .w10-dots i.done{background:rgba(31,78,121,.55)}
${s}.w10-intro .w10-fig>svg{animation:vlsw10Intro .7s cubic-bezier(.22,.8,.24,1)}
${s} .a-flow{stroke-dasharray:5 7;animation:vlsw10Flow 1.1s linear infinite}
${s} .a-stream{stroke-dasharray:0 13;animation:vlsw10Stream .9s linear infinite}
${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Spin 7s linear infinite}
${s} .a-spinr{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Spin 9s linear infinite reverse}
${s} .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Bob 2.6s ease-in-out infinite}
${s} .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Pulse 2s ease-in-out infinite}
${s} .a-blink{animation:vlsw10Blink 1.4s ease-in-out infinite}
${s} .a-shake{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Shake 1.6s ease-in-out infinite}
${s} .a-run{animation:vlsw10Run 1.4s linear infinite}
${s} .a-tick{transform-box:fill-box;transform-origin:50% 100%;animation:vlsw10Spin 4s linear infinite}
@media (max-width:420px){${s} .w10-cap{font-size:13px;min-height:32px;padding:5px 10px 7px;gap:8px}${s} .w10-dots{flex-basis:52px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
}
const KEYFRAMES = `
@keyframes vlsw10CapIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes vlsw10Intro{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
@keyframes vlsw10Flow{to{stroke-dashoffset:-24}}
@keyframes vlsw10Stream{to{stroke-dashoffset:-26}}
@keyframes vlsw10Spin{to{transform:rotate(360deg)}}
@keyframes vlsw10Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes vlsw10Pulse{0%,100%{opacity:.35;transform:scale(.94)}50%{opacity:.95;transform:scale(1.06)}}
@keyframes vlsw10Blink{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes vlsw10Run{from{transform:translateX(0)}to{transform:translateX(40px)}}
@keyframes vlsw10Shake{0%,100%{transform:rotate(0)}20%{transform:rotate(-4deg)}40%{transform:rotate(4deg)}60%{transform:rotate(-2deg)}80%{transform:rotate(2deg)}}
`;
function addStyles(list) {
  if (typeof document === "undefined") return;
  let st = document.getElementById("vl-sc-w10");
  if (!st) { st = document.createElement("style"); st.id = "vl-sc-w10"; (document.head || document.documentElement).appendChild(st); }
  const flag = "data-w10claude-" + PART;
  if (st.getAttribute(flag)) return;
  st.setAttribute(flag, "1");
  st.appendChild(document.createTextNode(KEYFRAMES + list.map(([id, bg, extra]) => sceneCSS(id, bg) + (extra || "")).join("\n")));
}
// ---- scene factory ----
function makeScene(cfg) {
  const { id, panels } = cfg;
  const labels = [];
  panels.forEach((p) => { p.a = labels.length; p.labels.forEach((l) => labels.push(l)); p.b = labels.length - 1; });
  const N = labels.length;
  let root = null, useG = false, active = -1;
  const raf = (f) => (window.requestAnimationFrame ? window.requestAnimationFrame(f) : setTimeout(f, 16));
  const panelOf = (k) => { for (let p = 0; p < panels.length; p++) if (k >= panels[p].a && k <= panels[p].b) return p; return panels.length - 1; };
  const mapK = (i, n) => {
    const nn = Math.max(1, Math.floor(num(n, N)));
    const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
    return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
  };
  const pEl = (p) => (root ? root.querySelector('[data-pn="' + p + '"]') : null);
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
  function count(el, v, pre, suf, snap) {
    const from = num(el.getAttribute("data-v"), 0);
    el.setAttribute("data-v", String(v));
    const fmt = (x) => pre + Math.round(x).toLocaleString("en-US") + suf;
    const tok = (el._w10tok = (el._w10tok || 0) + 1);
    if (snap || reduced() || from === v) { el.textContent = fmt(v); return; }
    if (useG) { const o = { x: from }; window.gsap.to(o, { x: v, duration: 0.9, ease: "power2.out", onUpdate: () => { if (el._w10tok === tok) el.textContent = fmt(o.x); } }); return; }
    const t0 = Date.now();
    const stepF = () => { if (el._w10tok !== tok) return; const u = clamp((Date.now() - t0) / 900, 0, 1), e = 1 - Math.pow(1 - u, 3); el.textContent = fmt(from + (v - from) * e); if (u < 1) raf(stepF); };
    stepF();
  }
  function ctx(scope, snap) {
    const nodes = (k) => (scope ? Array.prototype.slice.call(scope.querySelectorAll('[data-k="' + k + '"]')) : []);
    return {
      snap,
      op: (k, o, t = {}) => nodes(k).forEach((el) => op(el, o, t, snap)),
      mv: (k, st, t = {}) => nodes(k).forEach((el) => tf(el, st, t, snap)),
      dr: (k, f, t = {}) => nodes(k).forEach((el) => dash(el, f, t, snap)),
      fl: (k, col, t = {}) => nodes(k).forEach((el) => fill(el, col, t, snap)),
      tx: (k, s) => nodes(k).forEach((el) => { if (el.textContent !== String(s)) el.textContent = String(s); }),
      num: (k, v, pre = "", suf = "") => nodes(k).forEach((el) => count(el, v, pre, suf, snap)),
      vis: (map, t = {}) => Object.keys(map).forEach((k) => nodes(k).forEach((el) => op(el, map[k] === true ? 1 : map[k] === false ? 0 : map[k], t, snap))),
      all: (sel) => (scope ? Array.prototype.slice.call(scope.querySelectorAll(sel)) : []),
      opEl: (el, o, t = {}) => op(el, o, t, snap),
      mvEl: (el, st, t = {}) => tf(el, st, t, snap),
      flEl: (el, col, t = {}) => fill(el, col, t, snap)
    };
  }
  function caption(k, p, snap) {
    const lab = root.querySelector(".w10-lab"), nn = root.querySelector(".w10-num");
    const txt = labels[k] || "";
    if (lab && lab.textContent !== txt) {
      lab.textContent = txt;
      if (!snap && !reduced()) { lab.classList.remove("w10-in"); void lab.offsetWidth; lab.classList.add("w10-in"); }
    }
    if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
    Array.prototype.slice.call(root.querySelectorAll(".w10-dots i")).forEach((d, q) => { d.className = q === p ? "on" : q < p ? "done" : ""; });
  }
  function safe(f) { try { f(); } catch (e) { if (window.console) console.warn("[VL W10 " + id + "]", e); } }
  function render(k, snap) {
    if (!root) return;
    const p = panelOf(k), pg = pEl(p), pc = panels[p];
    if (snap) root.classList.add("w10-snap");
    if (p !== active) {
      // stage the incoming visual in its pre-state, then let it animate in
      if (!snap) {
        root.classList.add("w10-snap");
        safe(() => pc.render(ctx(pg, true), k - pc.a - 1, k - 1));
        if (pg) tf(pg, { s: 1.035, y: 6, pv: [200, 150] }, {}, true);
        void root.offsetWidth;
        root.classList.remove("w10-snap");
      }
      panels.forEach((_, q) => {
        const el = pEl(q); if (!el) return;
        if (q === p) { op(el, 1, { d: 0.55, dl: snap ? 0 : 0.18 }, snap); tf(el, { pv: [200, 150] }, { d: 0.8, dl: snap ? 0 : 0.18 }, snap); }
        else { op(el, 0, { d: 0.4 }, snap); tf(el, { s: q < p ? 0.97 : 1.03, pv: [200, 150] }, { d: 0.5 }, snap); }
      });
      active = p;
    }
    safe(() => pc.render(ctx(pg, snap), k - pc.a, k));
    caption(k, p, snap);
    if (snap) { void root.offsetWidth; root.classList.remove("w10-snap"); }
    root.setAttribute("data-moment", String(k));
    root.setAttribute("data-visual", String(p + 1));
  }
  function kill() {
    if (root && useG) { try { window.gsap.killTweensOf(root.querySelectorAll("[data-k],[data-pn]")); } catch (_) {} }
  }
  function mount(el) {
    const r = document.createElement("div");
    const rm = reduced();
    r.className = "vls-w10-" + id + " w10-root" + (useG ? " w10-gsap" : " w10-css") + (rm ? " w10-rm" : " w10-intro");
    r.setAttribute("data-scene", id);
    const body = panels.map((pc, q) => `<g data-pn="${q}" style="opacity:0">${pc.draw()}</g>`).join("");
    r.innerHTML = '<div class="w10-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
      esc(cfg.desc) + '">' + bleed(cfg.bg) + body + '</svg></div><div class="w10-cap" aria-hidden="true"><span class="w10-num"></span><span class="w10-lab"></span><span class="w10-dots" style="grid-template-columns:repeat(' + panels.length + ',1fr)">' + rep(panels.length, () => "<i></i>") + "</span></div>";
    if (typeof el.replaceChildren === "function") el.replaceChildren(r);
    else { el.innerHTML = ""; el.appendChild(r); }
    return r;
  }
  return {
    build(el) {
      if (!el || el.nodeType !== 1) return;
      kill();
      useG = hasG();
      active = -1;
      root = mount(el);
      render(0, true);
    },
    step(i, n) {
      if (!root) return;
      render(mapK(i, n), false);
    },
    reset() {
      if (!root) return;
      kill();
      active = -1;
      render(0, true);
    },
    _meta: { id, N, visuals: panels.map((p) => ({ a: p.a, b: p.b, src: p.src })) }
  };
}
const SCENE_BG = [];
function mirror(id) {
  // The older Week 10 host reads window.W10_SCENES; keep it pointing at the same scene.
  try { if (window.W10_SCENES && window.W10_SCENES !== VL_SCENES) window.W10_SCENES[id] = VL_SCENES[id]; } catch (_) {}
}

// ============================================================
// W10O3a · "Twenty-two attended. Nine still refer everything."  (29 narration moments, 10 visuals)
// Story spine: 22/22 attended a four-hour induction (observed) → no capability assessment
// (observed) → 9 of 22 refer every discrepancy (observed) → causes are hypotheses, never
// verdicts → four diagnostic questions → four realistic practice cases → five assessment
// criteria → capability gap vs organisational gap → listen; a signal, not a verdict.
// ============================================================
{
  const id = "W10O3a";
  const HX = (i) => 28 + (i % 11) * 34.4, HY = (i) => 120 + Math.floor(i / 11) * 64;
  const card = (x, y, w, h, title, col, rows) => R(x, y, w, h, C.white, 12, `stroke="${col}" stroke-width="2.5"`) + R(x, y, w, 30, col, 12) + R(x, y + 18, w, 12, col) + T(x + w / 2, y + 21, title, 15, C.white) +
    rows.map(([t, st], i) => (st === 1 ? okDot(x + 22, y + 52 + i * 34, 10) : st === 0 ? noDot(x + 22, y + 52 + i * 34, 10) : qDot(x + 22, y + 52 + i * 34, 10)) + T(x + 40, y + 57 + i * 34, t, 14, C.ink, "", "start")).join("");
  const panels = [
    // V1 · moments 0–2 · Project Dashboard (LottieFiles) — https://lottiefiles.com/free-animation/project-dashboard-PeJUc2p1iB
    // Adapted: collaborators and project data reveal together; a milestone card turns green.
    {
      src: "https://lottiefiles.com/free-animation/project-dashboard-PeJUc2p1iB",
      labels: ["All 22 attended", "Milestone complete", "Present isn't capable"],
      draw: () =>
        H("room", R(110, 20, 180, 70, C.navy, 10) + R(118, 28, 164, 54, C.sky, 6) + T(200, 52, "Induction", 17, C.navy) + T(200, 72, "four hours", 14, C.slate) + clock(318, 52, 20, C.orange) +
          rep(22, (i) => K("s" + i, hostP(HX(i), HY(i), 0.95))) + TK("att", 200, 268, "0 / 22 attended", 20, C.green)) +
        H("dash", R(40, 30, 320, 236, C.white, 14, `stroke="${C.navy}" stroke-width="2.5"`) + R(40, 30, 320, 36, C.navy, 14) + R(40, 54, 320, 12, C.navy) + T(200, 54, "Project dashboard", 16, C.white) +
          T(66, 104, "Training milestone", 16, C.ink, "", "start") + R(66, 118, 268, 22, "#e3e8ee", 11) + K("pb", R(66, 118, 268, 22, C.green, 11)) +
          okDot(306, 186, 24) + T(150, 194, "Complete", 26, C.green) + rep(8, (i) => O(78 + i * 30, 236, 11, i % 2 ? C.green : C.navy2))) +
        H("two", T(100, 50, "Present", 20, C.green) + R(70, 70, 60, 180, "#e3e8ee", 8) + K("m1", R(70, 70, 60, 180, C.green, 8)) + T(100, 276, "22 / 22", 18, C.green) +
          T(300, 50, "Can decide", 20, C.orange) + R(270, 70, 60, 180, "none", 8, `stroke="${C.orange}" stroke-width="3" stroke-dasharray="7 6"`) + T(300, 180, "?", 56, C.orange) +
          chip(200, 160, "≠", { sz: 22, bg: C.white, st: C.red, fg: C.red, w: 46 })),
      render: (c, j) => {
        c.op("room", j === 0 ? 1 : 0);
        for (let i = 0; i < 22; i++) c.op("s" + i, j >= 0 ? 1 : 0, { dl: j === 0 ? i * 0.06 : 0 });
        c.num("att", j === 0 ? 22 : 0, "", " / 22 attended");
        c.op("dash", j === 1 ? 1 : 0); c.mv("pb", { sx: j === 1 ? 1 : 0.02, pv: [66, 129] }, { d: 1.2, dl: 0.3 });
        c.op("two", j === 2 ? 1 : 0); c.mv("m1", { sy: j === 2 ? 1 : 0.02, pv: [100, 250] }, { d: 1 });
      }
    },
    // V2 · moments 3–5 · Celonis Process Animation update (cases grouped, pausing at nodes) — https://community.celonis.com/product-updates/what-s-new-in-the-celonis-platform-5560
    // Adapted: case bubbles leave a subset of nodes and accumulate at one destination node.
    {
      src: "https://community.celonis.com/product-updates/what-s-new-in-the-celonis-platform-5560",
      labels: ["No capability check", "Nine always refer", "The contrast"],
      draw: () => {
        let s = rep(22, (i) => `<g data-k="h" data-i="${i}">${hostP(HX(i), 196 + Math.floor(i / 11) * 54, 0.95)}</g><g data-k="ho" data-i="${i}" style="opacity:0">${hostP(HX(i), 196 + Math.floor(i / 11) * 54, 0.95, C.orange)}</g>`);
        s += H("noa", R(118, 30, 164, 74, C.white, 12, `stroke="${C.slate}" stroke-width="2.5" stroke-dasharray="7 5"`) + T(200, 62, "Capability", 17, C.slate) + T(200, 86, "assessment", 17, C.slate) + P("M110 24 L290 110", C.red, 5) + chip(200, 134, "None after induction", { sz: 15, st: C.red, fg: C.red }));
        s += H("dm", mgrP(200, 74, 1.9) + chip(310, 60, "Duty manager", { sz: 15, st: C.plum, fg: C.plum }) + chip(90, 60, "9 of 22", { sz: 20, bg: C.orange, st: C.orange, fg: C.white }));
        s += H("arr", rep(9, (i) => D("a" + i, `M${HX(13 + i)} ${226} Q${(HX(13 + i) + 200) / 2} ${150} 200 ${108}`, C.orange, 2.5)));
        s += H("vs", R(30, 20, 340, 120, C.white, 14, `stroke="${C.ink}" stroke-width="2"`) + T(50, 56, "Attended", 16, C.green, "", "start") + R(150, 42, 200, 20, C.green, 8) + T(344, 58, "22", 15, C.white, "", "end") +
          T(50, 104, "Refer all", 16, C.orange, "", "start") + R(150, 90, 82, 20, C.orange, 8) + T(226, 106, "9", 15, C.white, "", "end") +
          `<g class="a-blink">${F("M262 74 L250 102 H262 L254 128 L276 94 H264 L272 74 Z", C.gold)}</g>`);
        return s;
      },
      render: (c, j) => {
        c.all('[data-k="h"]').forEach((el) => c.opEl(el, j < 0 ? 0 : 1));
        c.all('[data-k="ho"]').forEach((el) => { const i = +el.getAttribute("data-i"); c.opEl(el, j >= 1 && i >= 13 ? 1 : 0, { dl: j === 1 ? (i - 13) * 0.08 : 0 }); });
        c.op("noa", j === 0 ? 1 : 0);
        c.op("dm", j === 1 ? 1 : 0); c.op("arr", j === 1 ? 1 : 0);
        for (let i = 0; i < 9; i++) c.dr("a" + i, j === 1 ? 1 : 0, { dl: j === 1 ? 0.4 + i * 0.08 : 0, d: 0.7 });
        c.op("vs", j === 2 ? 1 : 0); c.mv("vs", j === 2 ? {} : { y: -16 });
      }
    },
    // V3 · moments 6–9 · Sankey With Animated Gradients (Observable) — https://old.observablehq.com/@jarrettmeyer/sankey-with-animated-gradients
    // Adapted: one node is highlighted and only its connected flows light up; the highlight moves
    // from link to link as each hypothesis is discussed.
    {
      src: "https://old.observablehq.com/@jarrettmeyer/sankey-with-animated-gradients",
      labels: ["Behaviour isn't cause", "Possible explanations", "Authority unclear?", "Old scorecard?"],
      draw: () => {
        const HYP = [["Rule not understood", 50, C.navy], ["Low confidence", 110, C.teal], ["Authority unclear", 170, C.amber], ["Old measure rewarded", 230, C.plum]];
        let s = K("src", R(16, 112, 104, 76, C.orange, 12) + T(68, 146, "9 refer", 18, C.white) + T(68, 170, "everything", 14, C.white));
        s += H("claims", chip(260, 90, "Lack ability?", { sz: 16, st: C.slate, fg: C.slate }) + chip(260, 150, "Oppose redesign?", { sz: 16, st: C.slate, fg: C.slate }) +
          P("M196 90 H324 M184 150 H336", C.red, 3.5) + stampI(260, 220, "Not proven", C.red, -6, 18));
        s += HYP.map(([t, y, col], i) => H("f" + i, P(`M120 150 C170 150 170 ${y} 214 ${y}`, col, 10, 'stroke-linecap="butt" opacity=".25"') + K("fl" + i, `<g class="a-stream">${P(`M120 150 C170 150 170 ${y} 214 ${y}`, col, 6)}</g>`) + chip(304, y, t, { sz: 14, st: col, fg: col, w: 174 }))).join("");
        s += H("hyp", chip(200, 284, "Hypotheses, not verdicts", { sz: 14, bg: C.navy, fg: C.white }));
        s += H("x2", lockI(372, 170, 0.8, C.amber));
        s += H("x3", O(372, 230, 11, "none", `stroke="${C.plum}" stroke-width="3"`) + P("M372 230 L378 222", C.plum, 2.5));
        return s;
      },
      render: (c, j) => {
        c.op("claims", j === 0 ? 1 : 0);
        const lit = j === 1 ? [0, 1] : j === 2 ? [2] : j === 3 ? [3] : [];
        for (let i = 0; i < 4; i++) { c.op("f" + i, j >= 1 ? (lit.indexOf(i) >= 0 ? 1 : 0.35) : 0, { dl: j === 1 ? i * 0.2 : 0 }); c.op("fl" + i, lit.indexOf(i) >= 0 ? 1 : 0); }
        c.op("hyp", j >= 1 ? 1 : 0); c.op("x2", j === 2 ? 1 : 0); c.op("x3", j === 3 ? 1 : 0);
      }
    },
    // V4 · moments 10–11 · Infographics Elements by TarZanchik (Motion Array) — https://motionarray.com/after-effects-templates/infographics-elements-789489/
    // Adapted: four infographic modules reveal their shapes and data one by one; a single
    // intervention is then tested against all four.
    {
      src: "https://motionarray.com/after-effects-templates/infographics-elements-789489/",
      labels: ["Four diagnostic questions", "More induction won't fix"],
      draw: () => {
        const Q = [["Knows the rule?", 20, 24, C.navy, docI(36, 44, 34, 42, C.navy, 3)], ["Can apply it?", 206, 24, C.teal, magI(240, 62, 16, C.teal)], ["Formally authorised?", 20, 152, C.amber, keyI(52, 196, 1.2, C.amber)], ["Rewarded for it?", 206, 152, C.plum, starI(240, 196, 18, C.gold)]];
        return Q.map(([t, x, y, col, ic], i) => H("q" + i, R(x, y, 174, 116, C.white, 12, `stroke="${col}" stroke-width="2.5"`) + ic + T(x + 108, y + 76, t.split(" ")[0], 16, col) + T(x + 108, y + 98, t.split(" ").slice(1).join(" "), 16, col)) +
          H("r" + i, i === 0 ? okDot(x + 152, y + 22, 13) : noDot(x + 152, y + 22, 13))).join("") +
          H("ham", chip(200, 140, "Repeat the induction", { sz: 15, bg: C.orange, st: C.orange, fg: C.white }));
      },
      render: (c, j) => {
        for (let i = 0; i < 4; i++) { c.op("q" + i, j >= 0 ? 1 : 0, { dl: j === 0 ? i * 0.35 : 0 }); c.mv("q" + i, j >= 0 ? {} : { s: 0.8 }, { dl: j === 0 ? i * 0.35 : 0, e: "back.out(1.6)" }); c.op("r" + i, j === 1 ? 1 : 0, { dl: j === 1 ? 0.5 + i * 0.25 : 0 }); }
        c.op("ham", j === 1 ? 1 : 0); c.mv("ham", j === 1 ? {} : { y: -40 }, { e: "bounce.out" });
      }
    },
    // V5 · moments 12–14 · Motion Graphics: Design Thinking Process (Behance) — https://www.behance.net/gallery/108659899/Motion-Graphics-Design-Thinking-Process
    // Adapted: a scene-state storyboard advancing from setup to test — the assessment room, the
    // first case card, then the answer being checked.
    {
      src: "https://www.behance.net/gallery/108659899/Motion-Graphics-Design-Thinking-Process",
      labels: ["Test realistic cases", "Practice case one", "Spot the authority gap"],
      draw: () =>
        H("room", R(-400, 214, 1200, 400, "#e9ece4") + R(110, 176, 180, 14, "#8a6a3a", 4) + hostP(160, 168, 1.9) + mgrP(250, 168, 1.9, C.navy) + chip(250, 104, "Assessor", { sz: 14 }) +
          rep(4, (i) => `<g transform="rotate(${-12 + i * 8} ${70 + i * 86} 256)">${R(42 + i * 86, 232, 56, 46, C.white, 6, `stroke="${C.orange}" stroke-width="2"`)}${T(70 + i * 86, 262, "Case " + (i + 1), 13, C.orange)}</g>`) +
          chip(200, 30, "Realistic cases, not recall", { sz: 15, bg: C.navy, fg: C.white })) +
        H("c1", card(30, 26, 340, 176, "Practice case one", C.orange, [["AED 320 difference", 1], ["Case is eligible", 1], ["Delegation not updated", 0], ["Approve straight away?", 2]])) +
        H("ans", R(30, 212, 340, 76, C.mint, 12, `stroke="${C.green}" stroke-width="2.5"`) + T(200, 240, "Good answer", 16, C.green) + T(200, 266, "names the authority gap", 15, C.green)) +
        H("bad", P("M70 172 H260", C.red, 4)),
      render: (c, j) => {
        c.op("room", j === 0 ? 1 : 0);
        c.op("c1", j >= 1 ? 1 : 0); c.mv("c1", j >= 1 ? {} : { y: 40, s: 0.85 });
        c.op("ans", j === 2 ? 1 : 0); c.op("bad", j === 2 ? 1 : 0, { dl: j === 2 ? 0.5 : 0 });
      }
    },
    // V6 · moments 15–18 · cro process (LottieFiles) — https://lottiefiles.com/free-animation/cro-process-RaUu5ps2to
    // Adapted: an item moves across business steps and each step lights as it is reached.
    {
      src: "https://lottiefiles.com/free-animation/cro-process-RaUu5ps2to",
      labels: ["Practice case two", "Explain and record", "Practice case three", "Investigate, document, escalate"],
      draw: () =>
        H("c2", card(20, 20, 220, 146, "Case two", C.green, [["Eligible AED 320", 1], ["Delegation approved", 1], ["Within the limit", 1]]) +
          D("rt", "M240 94 C290 94 300 150 300 180", C.green, 5) + okDot(300, 206, 26) + chip(300, 254, "Resolve locally", { sz: 16, bg: C.green, st: C.green, fg: C.white })) +
        H("er", bubble(248, 34, 142, 34, "Clear explanation", 14, C.green, "bl")) +
        H("log", R(20, 190, 220, 92, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + T(130, 214, "Decision record", 15, C.navy) + K("lg", R(36, 228, 188, 12, C.sky, 4) + R(36, 250, 140, 12, C.sky, 4))) +
        H("c3", card(20, 20, 220, 146, "Case three", C.orange, [["Eligible case", 1], ["Rate differs AED 460", 1], ["Above AED 400", 0]]) +
          P("M262 120 H388", C.navy, 4) + P("M346 104 V136", C.red, 4) + T(346, 96, "400", 14, C.red) + K("mk", O(0, 120, 11, C.orange, `stroke="${C.white}" stroke-width="3"`))) +
        H("esc", [["Investigate", 210], ["Document", 248], ["Escalate", 286]].map(([t, y], i) => K("e" + i, chip(110 + i * 100, y - 14, t, { sz: 15, st: i === 2 ? C.plum : C.navy, fg: i === 2 ? C.plum : C.navy }))).join("") + mgrP(354, 220, 1.4)),
      render: (c, j) => {
        c.op("c2", j === 0 || j === 1 ? 1 : 0); c.dr("rt", j >= 0 && j < 2 ? 1 : 0, { dl: 0.4 });
        c.op("er", j === 1 ? 1 : 0); c.op("log", j === 1 ? 1 : 0); c.mv("lg", { sx: j === 1 ? 1 : 0.05, pv: [36, 0] }, { dl: 0.6 });
        c.op("c3", j >= 2 ? 1 : 0);
        c.mv("mk", j >= 2 ? { x: 374 } : { x: 262 }, { d: 1.3, e: "back.out(2)" });
        c.op("esc", j === 3 ? 1 : 0);
        for (let i = 0; i < 3; i++) c.op("e" + i, j === 3 ? 1 : 0, { dl: j === 3 ? i * 0.35 : 0 });
      }
    },
    // V7 · moments 19–20 · process connecting (LottieFiles) — https://lottiefiles.com/free-animation/process-fmpDUgNx8K
    // Adapted: connections draw and join one by one into a hub.
    {
      src: "https://lottiefiles.com/free-animation/process-fmpDUgNx8K",
      labels: ["Practice case four", "What scenarios reveal"],
      draw: () =>
        H("c4", card(20, 20, 230, 146, "Case four", C.slate, [["Within AED 400", 1], ["Fails eligibility", 0], ["Approve it?", 2]]) +
          R(286, 30, 40, 150, C.navy, 8) + R(292, 70, 28, 70, C.red, 4) + T(306, 110, "✕", 20, C.white) + chip(306, 206, "Not approved", { sz: 15, st: C.red, fg: C.red }) +
          chip(160, 258, "Small isn't eligible", { sz: 17, bg: C.slate, st: C.slate, fg: C.white })) +
        H("hub", O(200, 150, 40, C.navy) + T(200, 146, "Four", 15, C.white) + T(200, 166, "cases", 15, C.white) +
          [["Spot authority gap", 96, 40], ["Decide locally", 304, 40], ["Escalate above limit", 96, 260], ["Check eligibility", 304, 260]].map(([t, x, y], i) =>
            D("k" + i, `M${x < 200 ? 168 : 232} ${y < 150 ? 124 : 176} L${x} ${y < 150 ? y + 14 : y - 14}`, C.teal, 3) + H("kc" + i, chip(x, y, t, { sz: 14, st: C.teal, fg: C.teal }))).join("") +
          chip(70, 150, "Attendance", { sz: 13, st: C.slate, fg: C.slate }) + chip(330, 150, "Presence only", { sz: 13, st: C.red, fg: C.red })),
      render: (c, j) => {
        c.op("c4", j === 0 ? 1 : 0);
        c.op("hub", j === 1 ? 1 : 0);
        for (let i = 0; i < 4; i++) { c.dr("k" + i, j === 1 ? 1 : 0, { dl: j === 1 ? 0.2 + i * 0.3 : 0, d: 0.5 }); c.op("kc" + i, j === 1 ? 1 : 0, { dl: j === 1 ? 0.5 + i * 0.3 : 0 }); }
      }
    },
    // V8 · moments 21–22 · Steps infographic (Envato) — https://elements.envato.com/steps-infographic-BUNKM3A
    // Adapted: numbered milestones are revealed and then activated in sequence by a moving indicator.
    {
      src: "https://elements.envato.com/steps-infographic-BUNKM3A",
      labels: ["Five assessment criteria", "Observe, feedback, retry"],
      draw: () =>
        [["Establish facts", 44], ["Apply eligibility", 92], ["Check authority", 140], ["Choose action", 188], ["Explain decision", 236]].map(([t, y], i) =>
          H("st" + i, O(48, y, 18, C.navy) + T(48, y + 6, String(i + 1), 17, C.white) + chip(158, y, t, { sz: 16, w: 176 }))).join("") +
        K("ind", R(-8, -20, 6, 40, C.orange, 3), 'style="opacity:0"') +
        H("obs", mgrP(326, 120, 1.7, C.navy) + chip(322, 60, "Assessor watches", { sz: 13 }) + `<g class="a-spin">${P("M296 196 A30 30 0 1 1 356 196", C.green, 5)}${F("M350 186 L360 200 L366 186 Z", C.green)}</g>` +
          chip(322, 252, "Feedback loop", { sz: 13, st: C.green, fg: C.green })),
      render: (c, j) => {
        for (let i = 0; i < 5; i++) c.op("st" + i, j >= 0 ? 1 : 0, { dl: j === 0 ? i * 0.3 : 0 });
        c.op("ind", j >= 0 ? 1 : 0); c.mv("ind", { x: 24, y: j === 1 ? 236 : 44 }, { d: j === 1 ? 2 : 0.5, e: "steps(4)" });
        c.op("obs", j === 1 ? 1 : 0);
      }
    },
    // V9 · moments 23–25 · SVGator icon templates (idle → action → completion) — https://www.svgator.com/animation-templates/icons
    // Adapted: icon sets animate from idle to action; each gap type gets its own set of remedies.
    {
      src: "https://www.svgator.com/animation-templates/icons",
      labels: ["Capability gap", "Organisational gap", "Observe real shifts"],
      draw: () =>
        H("cg", R(16, 22, 176, 236, C.mint, 14, `stroke="${C.green}" stroke-width="2.5"`) + T(104, 52, "Capability gap", 16, C.green) +
          [["Practice", 100], ["Feedback", 160], ["Reassessment", 220]].map(([t, y], i) => K("ci" + i, O(46, y, 16, C.green) + T(46, y + 6, String(i + 1), 15, C.white) + T(70, y + 5, t, 15, C.ink, "", "start"))).join("")) +
        H("og", R(208, 22, 176, 236, C.peach, 14, `stroke="${C.orange}" stroke-width="2.5"`) + T(296, 52, "Organisational gap", 15, C.orange) +
          [["Authority", 100], ["Workflow", 160], ["Incentives", 220]].map(([t, y], i) => K("oi" + i, O(238, y, 16, C.orange) + T(238, y + 6, "⚙", 15, C.white) + T(262, y + 5, t, 15, C.ink, "", "start"))).join("") +
          chip(296, 278, "Training won't fix", { sz: 13, st: C.orange, fg: C.orange })) +
        H("obs", R(-400, 214, 1200, 400, "#e9ece4") + P("M30 150 H370", C.navy, 4) + chip(84, 120, "Practice case", { sz: 14 }) + chip(296, 120, "Real shift", { sz: 14, bg: C.navy, fg: C.white }) +
          arrowH(150, 150, 236, C.navy, 4) + hostP(296, 206, 1.9) + guestP(350, 206, 1.6) + E(84, 196, 26, 14, C.white, `stroke="${C.ink}" stroke-width="3"`) + O(84, 196, 7, C.ink) + chip(110, 260, "Managers observe", { sz: 15, st: C.plum, fg: C.plum })),
      render: (c, j) => {
        c.op("cg", j >= 0 && j < 2 ? (j === 1 ? 0.45 : 1) : 0);
        for (let i = 0; i < 3; i++) c.op("ci" + i, j >= 0 ? 1 : 0, { dl: j === 0 ? 0.3 + i * 0.3 : 0 });
        c.op("og", j === 1 ? 1 : 0);
        for (let i = 0; i < 3; i++) c.op("oi" + i, j === 1 ? 1 : 0, { dl: j === 1 ? 0.3 + i * 0.3 : 0 });
        c.op("obs", j === 2 ? 1 : 0);
      }
    },
    // V10 · moments 26–28 · Workflow by Muammar Faiq (LottieFiles) — https://lottiefiles.com/free-animation/workflow-Jt52qpU9fj
    // Adapted: a compact glyph cycles through its stages — listen, read the signal, decide.
    {
      src: "https://lottiefiles.com/free-animation/workflow-Jt52qpU9fj",
      labels: ["Listen first", "Signal, not verdict", "Ready because attended?"],
      draw: () =>
        H("ls", mgrP(90, 210, 2.2, C.navy) + P("M126 120 q14 -16 26 0 q10 16 -6 28", C.navy, 4) + rep(3, (i) => hostP(250 + i * 50, 220, 1.6)) +
          bubble(196, 58, 120, 34, "Feels risky", 14, C.green, "bl") + bubble(282, 110, 110, 34, "Unclear rule", 14, C.green, "br") + chip(110, 34, "Listen first", { sz: 16, bg: C.navy, fg: C.white })) +
        H("sg", rep(9, (i) => hostP(46 + i * 38, 210, 1.15, C.orange)) + `<g class="a-pulse">${O(200, 96, 40, "rgba(229,183,108,.4)")}</g>` + O(200, 96, 22, C.gold) + R(190, 118, 20, 16, C.slate, 3) +
          chip(296, 150, "Signal to investigate", { sz: 13, st: C.amber, fg: C.amber }) + chip(100, 150, "Verdict", { sz: 15, st: C.red, fg: C.red }) + P("M60 150 H140", C.red, 3.5)) +
        H("rd", mgrP(70, 220, 2, C.plum) + R(150, 40, 230, 100, C.white, 12, `stroke="${C.green}" stroke-width="2.5"`) + T(265, 76, "Induction", 18, C.green) + okDot(330, 108, 16) + T(240, 114, "Complete", 16, C.green) +
          chip(256, 196, "Ready because attended?", { sz: 15, st: C.orange, fg: C.orange }) + chip(256, 252, "Ask for stronger evidence", { sz: 14, bg: C.navy, fg: C.white })),
      render: (c, j) => {
        c.op("ls", j === 0 ? 1 : 0); c.op("sg", j === 1 ? 1 : 0); c.op("rd", j === 2 ? 1 : 0);
      }
    }
  ];
  VL_SCENES["W10O3a"] = makeScene({ id, panels, bg: "#f2f4ee", desc: "All twenty-two Guest Hosts attend a four-hour induction and the milestone turns green, but no capability assessment follows; nine of twenty-two refer every discrepancy; their causes are hypotheses, not verdicts; four diagnostic questions and four realistic practice cases test judgement against five criteria, separating capability gaps from organisational gaps." });
  mirror("W10O3a"); SCENE_BG.push([id, "#f2f4ee"]);
}

// ============================================================
// W10O3b · "The lobby runs two processes"  (27 narration moments, 9 visuals)
// Story spine: the designed single route vs the real lobby → 65% kiosk / 29% desk (observed;
// the remainder is NOT classified) → a desk visit can be legitimate or an avoidable
// workaround → one property's permanent desk (cause unknown) → compare properties → define the
// adoption measure → record reasons and route fixes → a named owner and a balanced review.
// ============================================================
{
  const id = "W10O3b";
  const FLOOR = () => R(-400, 238, 1200, 400, "#e4e9ee");
  const wheel = (x, y, s = 1, col = C.navy2) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -26, 7, col)}${P("M0 -18 V0 H14 L20 14", col, 5)}${O(-2, 8, 13, "none", `stroke="${col}" stroke-width="4"`)}</g>`;
  const panels = [
    // V1 · moments 0–2 · Animated treemap (Observable/D3) — https://observablehq.com/@d3/animated-treemap
    // Adapted: one block re-partitions into proportional blocks that resize over time; labels follow.
    {
      src: "https://observablehq.com/@d3/animated-treemap",
      labels: ["Diagram versus lobby", "65% kiosk, 29% desk", "Channels, not reasons"],
      draw: () =>
        H("hd", chip(200, 22, "Week eleven · arrivals", { sz: 15, bg: C.navy, fg: C.white })) +
        K("k", R(20, 44, 360, 196, C.green, 10)) + H("kt0", T(200, 132, "Designed route", 22, C.white) + T(200, 160, "all arrivals via kiosk", 15, C.mint)) +
        H("kt1", TK("kp", 137, 140, "0%", 40, C.white) + T(137, 172, "kiosk", 18, C.white)) +
        K("d", R(254, 44, 104, 196, C.orange, 10), 'style="opacity:0"') + H("dt", TK("dp", 306, 140, "0%", 26, C.white) + T(306, 166, "desk", 16, C.white)) +
        K("u", R(360, 44, 20, 196, C.grey, 6), 'style="opacity:0"') + H("ut", chip(306, 268, "6% not reported", { sz: 14, st: C.slate, fg: C.slate }) + P("M370 240 V254", C.slate, 2)) +
        H("q", `<g class="a-pulse">${qDot(306, 86, 16)}</g>` + qDot(137, 86, 14, C.navy) + chip(110, 268, "Channels, not reasons", { sz: 14, bg: C.white, st: C.navy })),
      render: (c, j) => {
        c.op("hd", j >= 0 ? 1 : 0);
        c.mv("k", { sx: j >= 1 ? 0.65 : 1, pv: [20, 0] }, { d: 1.2 });
        c.op("kt0", j === 0 ? 1 : 0); c.op("kt1", j >= 1 ? 1 : 0, { dl: j === 1 ? 0.6 : 0 }); c.num("kp", j >= 1 ? 65 : 0, "", "%");
        c.op("d", j >= 1 ? 1 : 0, { dl: j === 1 ? 0.5 : 0 }); c.mv("d", { sx: j >= 1 ? 1 : 0.02, pv: [254, 0] }, { d: 0.9, dl: j === 1 ? 0.5 : 0 });
        c.op("dt", j >= 1 ? 1 : 0, { dl: j === 1 ? 1 : 0 }); c.num("dp", j >= 1 ? 29 : 0, "", "%");
        c.op("u", j >= 1 ? 1 : 0, { dl: j === 1 ? 1.1 : 0 }); c.op("ut", j >= 1 ? 1 : 0, { dl: j === 1 ? 1.3 : 0 });
        c.op("q", j === 2 ? 1 : 0);
      }
    },
    // V2 · moments 3–5 · Process – What is a Motion Designer? (Behance) — https://www.behance.net/gallery/159045079/Process-What-is-a-Motion-Designer-
    // Adapted: short illustrated vignettes advance beat by beat; two desk stories, then the block
    // that contains both.
    {
      src: "https://www.behance.net/gallery/159045079/Process-What-is-a-Motion-Designer-",
      labels: ["A legitimate desk visit", "A possible workaround", "Mixed inside 29%"],
      draw: () =>
        H("v1", FLOOR() + R(196, 176, 150, 18, "#8a6a3a", 5) + R(206, 194, 10, 44, "#8a6a3a") + R(326, 194, 10, 44, "#8a6a3a") + hostP(272, 166, 1.9) + wheel(130, 222, 1.7) +
          docI(26, 40, 96, 92, C.navy, 3) + T(74, 150, "Unusual booking", 14, C.navy) + chip(282, 40, "Legitimate desk help", { sz: 15, bg: C.green, st: C.green, fg: C.white }) + okDot(360, 92, 16)) +
        H("v2", FLOOR() + kioskI(96, 214, 1.4, C.mint) + okDot(96, 108, 14) + T(96, 278, "Kiosk available", 14, C.green) +
          R(250, 176, 130, 18, C.slate, 5) + hostP(316, 166, 1.9) + guestP(204, 228, 1.8) + D("wv", "M150 160 C190 130 230 130 270 150", C.orange, 3) +
          chip(250, 40, "Possible workaround", { sz: 15, st: C.orange, fg: C.orange }) + qDot(354, 92, 14)) +
        H("v3", R(120, 40, 160, 210, C.orange, 12) + R(120, 40, 90, 210, "rgba(255,255,255,.18)", 12) + P("M210 40 V250", C.white, 3, 'stroke-dasharray="6 6"') + T(200, 156, "29%", 40, C.white) +
          chip(66, 100, "Legitimate", { sz: 15, st: C.green, fg: C.green }) + chip(334, 100, "Avoidable", { sz: 15, st: C.orange, fg: C.orange }) + qDot(210, 270, 14) + chip(200, 24, "Same number, mixed cases", { sz: 14 })),
      render: (c, j) => {
        c.op("v1", j === 0 ? 1 : 0); c.op("v2", j === 1 ? 1 : 0); c.dr("wv", j === 1 ? 1 : 0, { dl: 0.4 }); c.op("v3", j === 2 ? 1 : 0);
      }
    },
    // V3 · moments 6–8 · Modern Data Infographics templates (Motion Array) — https://motionarray.com/after-effects-templates/infographics/
    // Adapted: reveal one chart card, then its counterpart, then emphasise the outlier question.
    {
      src: "https://motionarray.com/after-effects-templates/infographics/",
      labels: ["Legitimate alternative", "Avoidable workaround", "Investigate first"],
      draw: () =>
        H("a", R(16, 30, 176, 220, C.mint, 14, `stroke="${C.green}" stroke-width="2.5"`) + T(104, 62, "Legitimate", 18, C.green) + T(104, 84, "alternative", 18, C.green) +
          wheel(64, 160, 1.3, C.green) + docI(104, 118, 54, 64, C.green, 3) + T(104, 214, "Real guest need", 14, C.ink) + T(104, 234, "or authorised route", 14, C.ink) + okDot(170, 46, 14)) +
        H("b", R(208, 30, 176, 220, C.peach, 14, `stroke="${C.orange}" stroke-width="2.5"`) + T(296, 62, "Avoidable", 18, C.orange) + T(296, 84, "workaround", 18, C.orange) +
          kioskI(258, 186, 0.9, C.mint) + arrowH(282, 150, 344, C.orange, 3) + R(330, 166, 40, 10, C.slate, 3) + T(296, 214, "Suitable route", 14, C.ink) + T(296, 234, "left unused", 14, C.ink) + O(362, 46, 14, C.orange) + arrowV(362, 38, 54, C.white, 2.5)) +
        H("inv", magI(186, 150, 46, C.ink) + chip(200, 278, "Investigate before judging", { sz: 15, bg: C.navy, fg: C.white }) + chip(200, 20, "Resistance", { sz: 15, st: C.red, fg: C.red }) + P("M150 20 H250", C.red, 3.5)),
      render: (c, j) => {
        c.op("a", j >= 0 ? (j === 2 ? 0.6 : 1) : 0); c.mv("a", j >= 0 ? {} : { x: -30 });
        c.op("b", j >= 1 ? (j === 2 ? 0.6 : 1) : 0); c.mv("b", j >= 1 ? {} : { x: 30 });
        c.op("inv", j === 2 ? 1 : 0); c.mv("inv", j === 2 ? {} : { s: 0.6 }, { e: "back.out(1.6)" });
      }
    },
    // V4 · moments 9–11 · Process in cub (LottieFiles) — https://lottiefiles.com/free-animation/process-in-cub-9iNG7QP0qC
    // Adapted: a cube drops into place and cycles through its states; here an isometric desk lands
    // in one property and is then examined from four sides.
    {
      src: "https://lottiefiles.com/free-animation/process-in-cub-9iNG7QP0qC",
      labels: ["A permanent desk returns", "Why did it return?", "Ask what happens"],
      draw: () => {
        const desk = (x, y) => F(`M${x - 50} ${y} L${x} ${y + 18} L${x} ${y + 40} L${x - 50} ${y + 22} Z`, "#7a5a32") + F(`M${x} ${y + 18} L${x + 50} ${y} L${x + 50} ${y + 22} L${x} ${y + 40} Z`, "#94703f") + F(`M${x - 50} ${y} L${x} ${y - 18} L${x + 50} ${y} L${x} ${y + 18} Z`, "#b8915a");
        let s = [70, 155, 245, 330].map((x, i) => K("b" + i, bldg(x, 98, 1.05, i === 2 ? C.orange : C.navy))).join("") + H("one", chip(245, 22, "One pilot property", { sz: 14, st: C.orange, fg: C.orange }));
        s += K("desk", desk(245, 190), 'style="opacity:0"') + H("dl", chip(110, 200, "Permanent desk", { sz: 16, bg: C.orange, st: C.orange, fg: C.white }) + chip(245, 268, "Cause not established", { sz: 14, st: C.slate, fg: C.slate }));
        s += H("hy", [["Service need", 80, 160], ["Workflow friction", 90, 230], ["Capability gap", 330, 160], ["Guest preference", 322, 230]].map(([t, x, y]) => chip(x, y, t, { sz: 14, st: C.navy })).join("") + qDot(245, 150, 14));
        s += H("ask", chip(84, 160, "Which arrivals?", { sz: 14, st: C.plum, fg: C.plum }) + chip(330, 160, "What happens?", { sz: 14, st: C.plum, fg: C.plum }) + chip(245, 270, "Kiosk possible?", { sz: 14, st: C.plum, fg: C.plum }) + mgrP(36, 252, 1.4) + magI(360, 230, 18, C.plum));
        return s;
      },
      render: (c, j) => {
        for (let i = 0; i < 4; i++) c.op("b" + i, j < 0 ? 0 : i === 2 ? 1 : 0.45, { dl: j === 0 ? i * 0.15 : 0 });
        c.op("one", j === 0 ? 1 : 0);
        c.op("desk", j >= 0 ? 1 : 0, { dl: j === 0 ? 0.5 : 0 }); c.mv("desk", j >= 0 ? {} : { y: -90 }, { d: 1, dl: j === 0 ? 0.5 : 0, e: "bounce.out" });
        c.op("dl", j === 0 ? 1 : 0, { dl: j === 0 ? 1.2 : 0 });
        c.op("hy", j === 1 ? 1 : 0); c.op("ask", j === 2 ? 1 : 0);
      }
    },
    // V5 · moments 12–13 · World map with logistics (LottieFiles) — https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy
    // Adapted: routes are traced between hubs on a map; four property hubs feed one comparison hub.
    {
      src: "https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy",
      labels: ["Compare four properties", "Differences are clues"],
      draw: () => {
        const PTS = [[66, 70], [334, 70], [66, 236], [334, 236]];
        let s = F("M30 120 Q80 40 170 60 Q240 30 330 54 Q380 90 360 160 Q390 230 320 262 Q220 290 120 268 Q30 250 40 190 Z", "#dfe8e2");
        s += PTS.map(([x, y], i) => D("r" + i, `M${x} ${y} Q${(x + 200) / 2 + (i % 2 ? -20 : 20)} ${(y + 150) / 2} 200 150`, C.navy, 3) + K("p" + i, bldg(x, y + 14, 0.85, C.navy) + chip(x, y + 34, "Property " + (i + 1), { sz: 13 }))).join("");
        s += O(200, 150, 34, C.navy) + T(200, 146, "Compare", 14, C.white) + T(200, 164, "evidence", 14, C.white);
        s += H("cl", [["Local set-up", 66, 150], ["Guest needs", 334, 150], ["Tech reliability", 200, 286], ["Employee support", 260, 18]].map(([t, x, y]) => chip(x, y, t, { sz: 13, st: C.teal, fg: C.teal })).join(""));
        return s;
      },
      render: (c, j) => {
        for (let i = 0; i < 4; i++) { c.dr("r" + i, j >= 0 ? 1 : 0, { dl: j === 0 ? i * 0.3 : 0 }); c.mv("p" + i, j >= 0 ? {} : { s: 0.6 }, { dl: j === 0 ? i * 0.3 : 0, e: "back.out(1.6)" }); }
        c.op("cl", j === 1 ? 1 : 0);
      }
    },
    // V6 · moments 14–17 · Infographic MOGRT templates (Motion Array) — https://motionarray.com/motion-graphics-templates/infographics/
    // Adapted: chart components (axes, bars, labels, numbers) progressively reveal; a definition
    // panel then assembles numerator, denominator and qualifiers.
    {
      src: "https://motionarray.com/motion-graphics-templates/infographics/",
      labels: ["What counts as kiosk use?", "Definitions differ", "Define the measure", "Agree before judging"],
      draw: () =>
        H("j3", [["Started at kiosk", 70], ["Completed at kiosk", 140], ["Later needed help", 210]].map(([t, y], i) =>
          K("jr" + i, guestP(36, y + 10, 1.1) + P(`M62 ${y} H${i === 2 ? 250 : 300}`, i === 2 ? C.orange : C.green, 6) + kioskI(120, y + 14, 0.38, C.mint) + (i === 1 ? okDot(320, y, 12) : i === 2 ? hostP(274, y + 10, 1) : "") + T(200, y - 14, t, 14, C.ink))).join("") +
          chip(200, 272, "Which one counts?", { sz: 16, st: C.orange, fg: C.orange })) +
        H("df", T(110, 46, "Property A", 16, C.navy) + T(290, 46, "Property B", 16, C.navy) + T(110, 66, "counts starts", 13, C.slate) + T(290, 66, "counts completions", 13, C.slate) +
          P("M40 240 H180 M220 240 H360", C.ink, 2) + K("ba", R(80, 90, 60, 150, C.green, 6)) + K("bb", R(260, 150, 60, 90, C.green, 6)) +
          chip(200, 272, "Similar journeys, different figures", { sz: 13, bg: C.red, st: C.red, fg: C.white })) +
        H("fm", T(200, 74, "Completed via kiosk path", 17, C.green) + P("M40 92 H360", C.ink, 4) + T(200, 124, "Eligible arrivals", 17, C.navy) +
          chip(110, 174, "Same period", { sz: 14 }) + chip(290, 174, "Incomplete?", { sz: 14, st: C.orange, fg: C.orange }) + chip(200, 218, "Assisted journeys?", { sz: 14, st: C.orange, fg: C.orange }) +
          chip(200, 30, "Illustrative definition", { sz: 14, st: C.slate, fg: C.slate })) +
        H("ag", stampI(200, 268, "Agree before judging", C.green, -4, 17)),
      render: (c, j) => {
        c.op("j3", j === 0 ? 1 : 0);
        for (let i = 0; i < 3; i++) c.op("jr" + i, j === 0 ? 1 : 0, { dl: j === 0 ? i * 0.35 : 0 });
        c.op("df", j === 1 ? 1 : 0); c.mv("ba", { sy: j === 1 ? 1 : 0.02, pv: [110, 240] }, { d: 1 }); c.mv("bb", { sy: j === 1 ? 1 : 0.02, pv: [290, 240] }, { d: 1, dl: 0.2 });
        c.op("fm", j >= 2 ? 1 : 0);
        c.op("ag", j === 3 ? 1 : 0); c.mv("ag", j === 3 ? {} : { s: 1.6 });
      }
    },
    // V7 · moments 18–20 · Steps Infographic (Envato) — https://elements.envato.com/steps-infographic-5NHT2YG
    // Adapted: step cards are introduced in sequence, each routing to its own outcome.
    {
      src: "https://elements.envato.com/steps-infographic-5NHT2YG",
      labels: ["Record desk reasons", "Technical or authority", "Capability or real need"],
      draw: () =>
        K("dk", R(128, 116, 144, 60, C.orange, 12) + T(200, 142, "Desk", 16, C.white) + T(200, 162, "interaction", 16, C.white)) +
        [["Accessibility", 86, 46, C.green], ["Tech interruption", 314, 46, C.navy], ["Booking exception", 86, 246, C.plum], ["Avoidable bypass", 314, 246, C.orange]].map(([t, x, y, col], i) =>
          H("rc" + i, chip(x, y, t, { sz: 14, st: col, fg: col }) + P(`M${x < 200 ? x + 40 : x - 40} ${y < 150 ? y + 14 : y - 14} L${x < 200 ? 140 : 260} ${y < 150 ? 116 : 176}`, col, 2, 'stroke-dasharray="4 4"'))).join("") +
        H("f1", R(16, 30, 176, 110, C.white, 12, `stroke="${C.navy}" stroke-width="2.5"`) + `<g class="a-spin">${gear(54, 84, 22, C.navy, C.sky)}</g>` + T(122, 72, "Technical", 15, C.navy) + T(122, 96, "→ Develop", 16, C.navy) +
          R(208, 30, 176, 110, C.white, 12, `stroke="${C.amber}" stroke-width="2.5"`) + keyI(246, 84, 1.1, C.amber) + T(318, 72, "Authority", 15, C.amber) + T(318, 96, "→ People", 16, C.amber)) +
        H("f2", R(16, 184, 176, 100, C.white, 12, `stroke="${C.teal}" stroke-width="2.5"`) + T(104, 220, "Capability", 15, C.teal) + T(104, 246, "→ practice", 16, C.teal) +
          R(208, 184, 176, 100, C.white, 12, `stroke="${C.green}" stroke-width="2.5"`) + T(296, 220, "Real guest need", 15, C.green) + T(296, 246, "→ design for it", 16, C.green)),
      render: (c, j) => {
        c.op("dk", j === 0 ? 1 : 0);
        for (let i = 0; i < 4; i++) c.op("rc" + i, j === 0 ? 1 : 0, { dl: j === 0 ? 0.3 + i * 0.3 : 0 });
        c.op("f1", j >= 1 ? 1 : 0); c.op("f2", j === 2 ? 1 : 0); c.mv("f2", j === 2 ? {} : { y: 20 });
      }
    },
    // V8 · moments 21–23 · SAP Signavio Transformation HUB (process owner, gates, improvement loop) — https://www.signavio.com/wiki/
    // Adapted: a process owner is introduced at the centre of an improvement loop, a wrong gate is
    // rejected, and a governance dashboard of four views closes the beat.
    {
      src: "https://www.signavio.com/wiki/",
      labels: ["A named adoption owner", "Not kiosk at any cost", "A balanced review"],
      draw: () =>
        H("own", `<g class="a-spin">${O(200, 150, 92, "none", `stroke="${C.teal}" stroke-width="3" stroke-dasharray="12 8"`)}</g>` + person(200, 160, 2.2, C.navy) + starI(200, 108, 11, C.gold) +
          chip(200, 30, "Named adoption owner", { sz: 16, bg: C.navy, fg: C.white }) + chip(66, 150, "Investigate", { sz: 14, st: C.teal, fg: C.teal }) + chip(334, 150, "Coordinate", { sz: 14, st: C.teal, fg: C.teal }) +
          chip(200, 274, "Across boundaries", { sz: 14, st: C.teal, fg: C.teal })) +
        H("cost", P(gaugeArc(110, 190, 80, 1), "#e4e0d8", 22) + P(gaugeArc(110, 190, 80, 1), C.red, 22, 'opacity=".85"') + T(110, 176, "100%", 26, C.red) + T(110, 212, "kiosk target", 14, C.red) +
          wheel(300, 196, 1.6) + noDot(330, 112, 16) + chip(300, 254, "Help denied", { sz: 15, st: C.red, fg: C.red }) + chip(200, 34, "The wrong target", { sz: 17, bg: C.red, st: C.red, fg: C.white })) +
        H("bal", [["Channel use", 104, 92, C.green], ["Exception reasons", 296, 92, C.navy], ["Guest outcome", 104, 208, C.orange], ["Rework", 296, 208, C.teal]].map(([t, x, y, col], i) =>
          K("bq" + i, R(x - 88, y - 52, 176, 104, C.white, 12, `stroke="${col}" stroke-width="2.5"`) + P(gaugeArc(x, y + 20, 34, 1), "#e4e0d8", 10) + P(gaugeArc(x, y + 20, 34, 0.5 + i * 0.1), col, 10) + T(x, y - 22, t, 15, col))).join("")),
      render: (c, j) => {
        c.op("own", j === 0 ? 1 : 0); c.op("cost", j === 1 ? 1 : 0); c.op("bal", j === 2 ? 1 : 0);
        for (let i = 0; i < 4; i++) c.op("bq" + i, j === 2 ? 1 : 0, { dl: j === 2 ? i * 0.25 : 0 });
      }
    },
    // V9 · moments 24–26 · Streamgraph transitions (Observable/D3) — https://observablehq.com/@d3/streamgraph-transitions
    // Adapted: stacked flowing layers morph between states; two arrival streams keep flowing side
    // by side through the lobby.
    {
      src: "https://observablehq.com/@d3/streamgraph-transitions",
      labels: ["Known: channels, not causes", "Old and new coexist", "Make it practical"],
      draw: () =>
        K("st", F("M20 70 C120 60 200 92 380 80 L380 190 C260 200 140 170 20 186 Z", C.green, 'opacity=".85"') + F("M20 186 C140 170 260 200 380 190 L380 250 C260 262 140 240 20 248 Z", C.orange, 'opacity=".85"') +
          `<g class="a-stream">${P("M20 128 C120 118 220 140 380 134", C.white, 5)}${P("M20 216 C140 206 260 228 380 220", C.white, 5)}</g>`) +
        H("lab", chip(300, 132, "65% kiosk", { sz: 16, bg: C.white, st: C.green, fg: C.green }) + chip(300, 220, "29% desk", { sz: 16, bg: C.white, st: C.orange, fg: C.orange }) +
          qDot(120, 130, 14, C.navy) + qDot(120, 218, 14) + chip(200, 34, "Why each route?", { sz: 16, st: C.navy })) +
        H("co", chip(200, 34, "The real process", { sz: 17, bg: C.navy, fg: C.white }) + chip(110, 284, "Old habits", { sz: 14, st: C.orange, fg: C.orange }) + chip(290, 284, "Legitimate routes", { sz: 14, st: C.green, fg: C.green })) +
        H("mk", R(40, 70, 320, 170, "rgba(255,255,255,.92)", 14, `stroke="${C.navy}" stroke-width="2.5"`) + T(200, 102, "People phase makes it", 16, C.navy) +
          chip(110, 150, "Practical", { sz: 16, bg: C.green, st: C.green, fg: C.white }) + chip(290, 150, "Safe", { sz: 16, bg: C.navy, fg: C.white }) + chip(200, 204, "Worthwhile", { sz: 16, bg: C.amber, st: C.amber, fg: C.white })),
      render: (c, j) => {
        c.mv("st", { sx: j >= 0 ? 1 : 0.02, pv: [20, 160] }, { d: 1.4 });
        c.op("lab", j === 0 ? 1 : 0, { dl: j === 0 ? 0.9 : 0 }); c.op("co", j === 1 ? 1 : 0); c.op("mk", j === 2 ? 1 : 0); c.mv("mk", j === 2 ? {} : { s: 0.9 });
      }
    }
  ];
  VL_SCENES["W10O3b"] = makeScene({ id, panels, bg: "#f1f4f7", desc: "At week eleven one designed route splits into 65 percent kiosk and 29 percent desk, with the rest not reported; a desk visit may be legitimate or an avoidable workaround; one property's permanent desk has no established cause; properties are compared, the adoption measure is defined before judging, desk reasons are recorded and routed to the right fix, and a named owner reviews channels, reasons, outcomes and rework." });
  mirror("W10O3b"); SCENE_BG.push([id, "#f1f4f7"]);
}

// ============================================================
// W10O3c · "The knowledge people carry"  (24 narration moments, 8 visuals)
// Story spine: experience notices more than the rule → the iceberg (explicit above, experience
// below) → the workflow quietly depends on uncaptured judgement → make judgement teachable
// (worked examples AED 320 vs AED 460, peer learning) → two resignations, motives unknown, no
// invented causes → protect operational knowledge → repeatable, consistent, supported judgement.
// ============================================================
{
  const id = "W10O3c";
  const SEA = 150;
  const panels = [
    // V1 · moments 0–2 · Awwwards — Kairon Labs SVG animation on scroll — https://www.awwwards.com/inspiration/svg-animation-on-scroll-https-kaironlabs-com
    // Adapted: scrubbed visual states reveal the next composition — the camera drops below the
    // waterline to reveal what the visible tip rests on.
    {
      src: "https://www.awwwards.com/inspiration/svg-animation-on-scroll-https-kaironlabs-com",
      labels: ["Experience notices more", "Explicit knowledge", "Experience-based judgement"],
      draw: () =>
        H("ins", docI(176, 34, 160, 200, C.navy, 0) + T(256, 54, "Booking confirmation", 13, C.white) + rep(6, (i) => R(192, 80 + i * 24, 128, 9, i === 3 ? C.gold : "#d9e1ea", 4)) +
          K("mg", magI(276, 156, 26, C.ink)) + xDot(352, 150, 13) + hostP(78, 230, 2.5) + chip(84, 40, "Experienced host", { sz: 14, st: C.green, fg: C.green }) + chip(256, 268, "Small inconsistency", { sz: 15, st: C.orange, fg: C.orange })) +
        H("ice", R(-400, SEA, 1200, 600, "#2f6690") + R(-400, SEA + 90, 1200, 500, "#26557a") + P(`M-400 ${SEA} H800`, "#9cc6e2", 3) +
          F(`M200 34 L250 ${SEA} H150 Z`, C.white, `stroke="#9cc6e2" stroke-width="2"`) +
          K("deep", F(`M150 ${SEA} H250 L322 220 L268 290 H132 L78 220 Z`, "rgba(234,244,251,.88)", `stroke="#cfe6f6" stroke-width="2"`)) +
          chip(84, 70, "Rule", { sz: 15 }) + chip(322, 70, "Checklist", { sz: 15 }) + chip(200, 22, "Decision guide", { sz: 15 })) +
        H("ex", chip(200, 186, "How cases arise", { sz: 14, st: C.teal, fg: C.teal }) + chip(200, 222, "Useful evidence", { sz: 14, st: C.teal, fg: C.teal }) + chip(200, 258, "Explaining decisions", { sz: 14, st: C.teal, fg: C.teal }) +
          chip(60, 200, "Experience", { sz: 15, bg: C.teal, st: C.teal, fg: C.white })),
      render: (c, j) => {
        c.op("ins", j === 0 ? 1 : 0); c.mv("mg", j === 0 ? { x: -20, y: -20 } : {}, { d: 1.6 });
        c.op("ice", j >= 1 ? 1 : 0);
        c.op("deep", j === 2 ? 1 : 0.15);
        c.op("ex", j === 2 ? 1 : 0, { dl: j === 2 ? 0.5 : 0 });
      }
    },
    // V2 · moments 3–5 · Data Workflow Animation (Dribbble) — https://dribbble.com/shots/27247003-Data-Workflow-Animation
    // Adapted: nodes activate one after another and data traces the connectors between them.
    {
      src: "https://dribbble.com/shots/27247003-Data-Workflow-Animation",
      labels: ["Uncaptured knowledge", "Judgement within rules", "What a colleague knows"],
      draw: () => {
        const N4 = [["Guest raises", 50], ["Evidence", 150], ["Policy applied", 250], ["Judgement", 350]];
        let s = N4.map(([t, x], i) => K("n" + i, O(x, 110, 28, i === 3 ? C.amber : C.navy) + T(x, 116, String(i + 1), 18, C.white) + T(x, 162, t, 14, i === 3 ? C.amber : C.navy)) + (i < 3 ? D("l" + i, `M${x + 30} 110 H${x + 70}`, C.ink, 3) : "")).join("");
        s += H("hid", O(350, 110, 40, "none", `stroke="${C.orange}" stroke-width="3" stroke-dasharray="6 5"`) + chip(300, 214, "Never written down", { sz: 15, st: C.orange, fg: C.orange }) + chip(110, 214, "New workflow", { sz: 15 }));
        s += H("pol", R(214, 64, 72, 92, "none", 10, `stroke="${C.navy}" stroke-width="2.5" stroke-dasharray="5 4"`) + chip(150, 214, "Policy sets boundaries", { sz: 15 }) + chip(150, 256, "Not every situation", { sz: 14, st: C.orange, fg: C.orange }));
        s += H("col", hostP(84, 260, 1.7) + hostP(300, 260, 1.7, C.teal) + bubble(170, 186, 140, 34, "These details matter", 13, C.teal, "br") + T(84, 296, "Newer host", 13, C.green) + T(300, 296, "Experienced", 13, C.teal));
        return s;
      },
      render: (c, j) => {
        for (let i = 0; i < 4; i++) { c.mv("n" + i, j >= 0 ? (j === 1 && i === 3 ? { s: 1.15 } : {}) : { s: 0.6 }, { dl: j === 0 ? i * 0.3 : 0, e: "back.out(1.8)" }); if (i < 3) c.dr("l" + i, j >= 0 ? 1 : 0, { dl: j === 0 ? 0.2 + i * 0.3 : 0, d: 0.4 }); }
        c.op("hid", j === 0 ? 1 : 0); c.op("pol", j === 1 ? 1 : 0); c.op("col", j === 2 ? 1 : 0);
      }
    },
    // V3 · moments 6–7 · Workflow by a (LottieFiles) — https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm
    // Adapted: workers are revealed and workflow actions pass between them.
    {
      src: "https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm",
      labels: ["Knowledge stuck personal", "Make judgement teachable"],
      draw: () =>
        hostP(80, 160, 2.4, C.teal) + `<g class="a-pulse">${O(80, 96, 24, "rgba(229,183,108,.55)")}</g>` + O(80, 96, 12, C.gold) +
        [[250, 70], [320, 150], [250, 230]].map(([x, y], i) => hostP(x, y + 16, 1.6) + H("q" + i, qDot(x + 22, y - 18, 11))).join("") +
        H("risk", chip(110, 262, "Personal knowledge", { sz: 15, st: C.orange, fg: C.orange }) + P("M110 120 L230 80 M112 160 L298 160 M110 200 L230 240", C.muted, 2, 'stroke-dasharray="3 6"')) +
        H("ch", [["Worked examples", 250, 70, 150, 52], ["Realistic practice", 320, 150, 210, 136], ["Peer learning", 250, 230, 150, 232]].map(([t, x, y, cx, cy], i) =>
          D("c" + i, `M110 ${120 + i * 40} L${x - 24} ${y + 4}`, C.teal, 4) + chip(cx, cy, t, { sz: 13, st: C.teal, fg: C.teal })).join("") +
          `<g class="a-stream">${P("M110 120 L226 74 M110 160 L296 154 M110 200 L226 234", C.white, 4)}</g>` + chip(110, 262, "Teachable judgement", { sz: 15, bg: C.teal, st: C.teal, fg: C.white })),
      render: (c, j) => {
        for (let i = 0; i < 3; i++) c.op("q" + i, j === 0 ? 1 : 0, { dl: j === 0 ? 0.3 + i * 0.2 : 0 });
        c.op("risk", j === 0 ? 1 : 0);
        c.op("ch", j === 1 ? 1 : 0);
        for (let i = 0; i < 3; i++) c.dr("c" + i, j === 1 ? 1 : 0, { dl: j === 1 ? i * 0.3 : 0 });
      }
    },
    // V4 · moments 8–11 · Design thinking process (Behance) — https://www.behance.net/gallery/209502471/Design-thinking-process
    // Adapted: one stage is emphasised, then the focus transitions to the next — five parts of a
    // worked example, then two contrasting examples, then what they teach together.
    {
      src: "https://www.behance.net/gallery/209502471/Design-thinking-process",
      labels: ["A useful worked example", "Worked local decision", "Worked escalation", "Why, not just 400"],
      draw: () =>
        H("we", R(20, 16, 360, 268, C.white, 14, `stroke="${C.navy}" stroke-width="2.5"`) + T(200, 44, "Worked example", 18, C.navy) +
          [["Case facts", C.navy], ["Relevant rule", C.plum], ["Authority boundary", C.amber], ["Decision reasoning", C.teal], ["Guest explanation", C.green]].map(([t, col], i) =>
            K("w" + i, O(56, 76 + i * 44, 16, col) + T(56, 82 + i * 44, String(i + 1), 15, C.white) + R(82, 62 + i * 44, 280, 28, "#f1f4f7", 6) + T(94, 82 + i * 44, t, 16, col, "", "start"))).join("")) +
        H("ea", R(20, 30, 170, 230, C.mint, 14, `stroke="${C.green}" stroke-width="2.5"`) + T(105, 62, "AED 320", 24, C.green) + T(105, 90, "eligible", 15, C.ink) + T(105, 114, "authority approved", 14, C.ink) +
          okDot(105, 160, 26) + T(105, 216, "Waive locally", 16, C.green) + T(105, 240, "record why", 14, C.slate)) +
        H("eb", R(210, 30, 170, 230, C.peach, 14, `stroke="${C.orange}" stroke-width="2.5"`) + T(295, 62, "AED 460", 24, C.orange) + T(295, 90, "eligible", 15, C.ink) + T(295, 114, "above AED 400", 14, C.ink) +
          O(295, 160, 26, C.plum) + arrowV(295, 176, 144, C.white, 4) + T(295, 216, "Escalate", 16, C.plum) + T(295, 240, "document first", 14, C.slate)) +
        H("vn", R(0, 0, 400, 300, "rgba(241,244,247,.94)") + O(160, 130, 66, "rgba(49,124,97,.25)", `stroke="${C.green}" stroke-width="2.5"`) + O(240, 130, 66, "rgba(31,78,121,.2)", `stroke="${C.navy}" stroke-width="2.5"`) + O(200, 196, 66, "rgba(168,116,26,.22)", `stroke="${C.amber}" stroke-width="2.5"`) +
          T(130, 112, "Eligibility", 15, C.green) + T(270, 112, "Evidence", 15, C.navy) + T(200, 236, "Authority", 15, C.amber) + chip(200, 158, "Interact", { sz: 14, bg: C.ink, st: C.ink, fg: C.white }) +
          chip(84, 272, "Not just 400", { sz: 14, st: C.red, fg: C.red })),
      render: (c, j) => {
        c.op("we", j === 0 ? 1 : 0);
        for (let i = 0; i < 5; i++) c.op("w" + i, j === 0 ? 1 : 0, { dl: j === 0 ? 0.2 + i * 0.3 : 0 });
        c.op("ea", j >= 1 && j < 3 ? 1 : 0); c.mv("ea", j >= 1 ? {} : { x: -30 });
        c.op("eb", j === 2 ? 1 : 0); c.mv("eb", j >= 2 ? {} : { x: 30 });
        c.op("vn", j === 3 ? 1 : 0); c.mv("vn", j === 3 ? {} : { s: 0.94 });
      }
    },
    // V5 · moments 12–13 · Creative process – Motion design creative project (Behance) — https://www.behance.net/gallery/190390491/Creative-process-Motion-design-creative-project
    // Adapted: an idea moves through iterations around a table and is finally filed as the
    // finished artefact.
    {
      src: "https://www.behance.net/gallery/190390491/Creative-process-Motion-design-creative-project",
      labels: ["Peer learning", "Capture in guidance"],
      draw: () =>
        H("tb", E(200, 170, 120, 56, "#b8915a") + E(200, 164, 120, 56, "#d2ad75") + R(166, 140, 68, 46, C.white, 6, `stroke="${C.orange}" stroke-width="2"`) + T(200, 168, "Case", 15, C.orange) +
          hostP(70, 140, 1.5) + hostP(330, 140, 1.5, C.teal) + hostP(110, 262, 1.5) + hostP(290, 262, 1.5) +
          bubble(28, 38, 120, 32, "My reasoning", 13, C.green, "bl") + bubble(252, 38, 120, 32, "Compare ours", 13, C.teal, "br") + chip(200, 286, "Where guidance is unclear", { sz: 13, st: C.orange, fg: C.orange })) +
        H("bk", R(130, 70, 140, 180, C.navy, 10) + R(140, 80, 120, 160, C.sky, 6) + T(200, 140, "Shared", 18, C.navy) + T(200, 164, "guidance", 18, C.navy) +
          rep(4, (i) => K("pg" + i, R(-24, -16, 48, 32, C.white, 4, `stroke="${C.orange}" stroke-width="1.6"`) + P("M-14 -4 H14 M-14 6 H6", C.muted, 2))) + chip(200, 278, "Not one person's memory", { sz: 14, bg: C.green, st: C.green, fg: C.white })),
      render: (c, j) => {
        c.op("tb", j === 0 ? 1 : 0); c.op("bk", j === 1 ? 1 : 0);
        const ST = [[50, 60], [350, 60], [50, 230], [350, 230]];
        for (let i = 0; i < 4; i++) c.mv("pg" + i, j === 1 ? { x: 200, y: 200 - i * 6, s: 0.6 } : { x: ST[i][0], y: ST[i][1] }, { d: 1, dl: j === 1 ? 0.3 + i * 0.25 : 0, e: "power2.in" });
      }
    },
    // V6 · moments 14–17 · Supply Chain Animation (Behance) — https://www.behance.net/gallery/121206799/Supply-Chain-Animation
    // Adapted: object-to-object handoff — knowledge parcels either transfer to the team before a
    // departure or leave with the person.
    {
      src: "https://www.behance.net/gallery/121206799/Supply-Chain-Animation",
      labels: ["Two resignations", "No invented causes", "A continuity risk", "Check what's documented"],
      draw: () =>
        R(318, 60, 64, 170, C.slate, 6) + R(326, 68, 48, 162, "#e8eef3", 4) + O(364, 150, 3.5, C.slate) +
        rep(20, (i) => hostP(30 + (i % 10) * 28, 216 + Math.floor(i / 10) * 40, 0.85)) +
        K("lv", hostP(0, 0, 1.4, C.slate) + hostP(30, 0, 1.4, C.slate), 'style="opacity:0"') +
        H("unk", chip(150, 44, "2 Guest Hosts resigned", { sz: 15, bg: C.slate, st: C.slate, fg: C.white }) + chip(150, 92, "Reasons unknown", { sz: 15, st: C.slate, fg: C.slate })) +
        H("nc", [["Redesign?", 70, 44], ["New role?", 200, 44], ["Training?", 70, 104], ["Measures?", 200, 104]].map(([t, x, y]) => chip(x, y, t, { sz: 15, st: C.slate, fg: C.slate }) + P(`M${x - 46} ${y} H${x + 46}`, C.red, 3)).join("") +
          stampI(140, 160, "No causal claim", C.red, -5, 16)) +
        H("ko", rep(3, (i) => K("kp" + i, O(0, 0, 11, C.gold) + T(0, 5, "?", 13, C.ink)))) +
        H("rsk", chip(150, 44, "Undocumented knowledge", { sz: 15, st: C.orange, fg: C.orange }) + chip(150, 92, "Continuity risk", { sz: 15, bg: C.orange, st: C.orange, fg: C.white })) +
        H("chk", R(20, 24, 220, 166, C.white, 12, `stroke="${C.navy}" stroke-width="2.5"`) + T(130, 50, "Is it documented?", 15, C.navy) +
          [["Critical cases", 1], ["Worked examples", 2], ["Decision reasoning", 2]].map(([t, st], i) => (st === 1 ? okDot(46, 82 + i * 36, 10) : qDot(46, 82 + i * 36, 10)) + T(64, 87 + i * 36, t, 14, C.ink, "", "start")).join("") + magI(214, 160, 16, C.navy)),
      render: (c, j) => {
        c.op("lv", j >= 0 ? 1 : 0); c.mv("lv", j >= 0 ? { x: j === 0 ? 330 : 334, y: 150 } : { x: 260, y: 150 }, { d: 1.3 });
        c.op("lv", j === 0 ? 1 : j > 0 ? 0.5 : 0);
        c.op("unk", j === 0 ? 1 : 0); c.op("nc", j === 1 ? 1 : 0);
        c.op("ko", j === 2 ? 1 : 0); c.op("rsk", j === 2 ? 1 : 0);
        for (let i = 0; i < 3; i++) c.mv("kp" + i, j === 2 ? { x: 336 + i * 10, y: 116 - i * 14 } : { x: 120 + i * 60, y: 186 }, { d: 1.4, dl: i * 0.2, e: "power2.in" });
        c.op("chk", j === 3 ? 1 : 0);
      }
    },
    // V7 · moments 18–20 · Process Infographics (Envato) — https://elements.envato.com/process-infographics-FYE5ZGW
    // Adapted: steps are staged and the active state advances along them; feedback then flows back
    // into two destinations.
    {
      src: "https://elements.envato.com/process-infographics-FYE5ZGW",
      labels: ["Protect operational knowledge", "Ask where procedures fail", "Answers improve design"],
      draw: () =>
        H("st", [["Identify critical cases", 40], ["Capture reasoning", 92], ["Practise decisions", 144], ["Share guidance", 196], ["Review learning", 248]].map(([t, y], i) =>
          K("s" + i, O(62, y, 18, C.navy) + T(62, y + 6, String(i + 1), 16, C.white) + chip(176, y, t, { sz: 15, w: 196 }) + (i < 4 ? P(`M62 ${y + 19} V${y + 33}`, C.navy, 3) : ""))).join("") +
          person(336, 160, 2.2, C.navy) + starI(336, 110, 11, C.gold) + chip(336, 216, "Process owner", { sz: 13 })) +
        H("ask", mgrP(70, 220, 2, C.navy) + bubble(40, 40, 170, 36, "Where doesn't it fit?", 14, C.navy, "bl") + rep(3, (i) => hostP(220 + i * 56, 230, 1.6)) +
          bubble(236, 120, 142, 34, "Odd bookings", 14, C.green, "br")) +
        H("fb", [["Missing examples", 60], ["Confusing rules", 130], ["Needless handoffs", 200]].map(([t, y], i) => K("f" + i, chip(100, y, t, { sz: 14, st: C.orange, fg: C.orange }))).join("") +
          D("fa", "M176 60 C230 60 230 100 262 100 M168 130 C230 130 230 100 262 100 M178 200 C230 200 230 220 262 220", C.slate, 3) +
          chip(320, 100, "Better training", { sz: 14, bg: C.teal, st: C.teal, fg: C.white }) + chip(320, 220, "Better design", { sz: 14, bg: C.navy, fg: C.white })),
      render: (c, j) => {
        c.op("st", j === 0 ? 1 : 0);
        for (let i = 0; i < 5; i++) c.op("s" + i, j === 0 ? 1 : 0, { dl: j === 0 ? i * 0.3 : 0 });
        c.op("ask", j === 1 ? 1 : 0); c.op("fb", j === 2 ? 1 : 0); c.dr("fa", j === 2 ? 1 : 0, { dl: 0.6 });
        for (let i = 0; i < 3; i++) c.op("f" + i, j === 2 ? 1 : 0, { dl: j === 2 ? i * 0.25 : 0 });
      }
    },
    // V8 · moments 21–23 · Clean Workflow Visualization with Motion Graphics (Dribbble) — https://dribbble.com/shots/27600376-Clean-Workflow-Visualization-with-Motion-Graphics
    // Adapted: journey steps are connected with smooth transitions — the same case reaches the same
    // sound outcome through every host, at every property, resting on supports.
    {
      src: "https://dribbble.com/shots/27600376-Clean-Workflow-Visualization-with-Motion-Graphics",
      labels: ["Repeatable performance", "Consistent across properties", "Support, not replace, judgement"],
      draw: () =>
        H("rp", R(18, 120, 70, 60, C.white, 8, `stroke="${C.orange}" stroke-width="2.5"`) + T(53, 156, "Case", 16, C.orange) +
          rep(4, (i) => D("r" + i, `M88 150 C150 150 150 ${48 + i * 68} 200 ${48 + i * 68} H300`, C.teal, 3) + hostP(230, 62 + i * 68, 1.2) + H("ok" + i, okDot(330, 48 + i * 68, 14))) +
          chip(200, 286, "Not one person's memory", { sz: 13, st: C.teal, fg: C.teal })) +
        H("pr", [60, 150, 240, 330].map((x, i) => bldg(x, 160, 1.15, C.navy) + K("pk" + i, okDot(x, 70, 14))).join("") + chip(200, 232, "Same sound decisions", { sz: 16, bg: C.green, st: C.green, fg: C.white }) +
          chip(200, 274, "Experience preserved", { sz: 14, st: C.teal, fg: C.teal })) +
        H("sp", R(70, 74, 260, 46, C.green, 10) + T(200, 104, "Human judgement", 18, C.white) +
          [["Clear rules", 110], ["Examples", 200], ["Boundaries", 290]].map(([t, x], i) => K("pl" + i, R(x - 36, 126, 72, 110, [C.navy, C.teal, C.amber][i], 6) + T(x, 258, t, 14, [C.navy, C.teal, C.amber][i]))).join("") +
          chip(200, 34, "Supported, not replaced", { sz: 15, st: C.green, fg: C.green })),
      render: (c, j) => {
        c.op("rp", j === 0 ? 1 : 0);
        for (let i = 0; i < 4; i++) { c.dr("r" + i, j === 0 ? 1 : 0, { dl: j === 0 ? i * 0.2 : 0 }); c.op("ok" + i, j === 0 ? 1 : 0, { dl: j === 0 ? 0.9 + i * 0.2 : 0 }); }
        c.op("pr", j === 1 ? 1 : 0);
        for (let i = 0; i < 4; i++) c.mv("pk" + i, j === 1 ? {} : { s: 0.3 }, { dl: j === 1 ? 0.3 + i * 0.25 : 0, e: "back.out(2)" });
        c.op("sp", j === 2 ? 1 : 0);
        for (let i = 0; i < 3; i++) c.mv("pl" + i, { sy: j === 2 ? 1 : 0.05, pv: [0, 236] }, { d: 0.8, dl: j === 2 ? i * 0.25 : 0 });
      }
    }
  ];
  VL_SCENES["W10O3c"] = makeScene({ id, panels, bg: "#f1f4f7", desc: "An experienced Guest Host notices what the rule does not say; an iceberg shows explicit rules above and experience-based judgement below; worked examples comparing AED 320 and AED 460 and peer learning make judgement teachable; two resignations are shown with reasons unknown and no causal claim; the process owner protects knowledge so decisions become repeatable and consistent while judgement stays supported." });
  mirror("W10O3c"); SCENE_BG.push([id, "#f1f4f7"]);
}

addStyles(SCENE_BG);
})();

// OPER621 · Week 10 · The People Phase — animated teaching scenes (round 2, Claude)
// File: w10-claude-part4.js  ·  Lesson 4 · The green dashboard is not the truth  ·  Scenes: W10O2d, W10O3d, W10O3e
// Standalone part: loads AFTER the older Week 10 scene file and re-registers the same
// section ids so these scenes override it. Registers VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
// and appends its scoped rules (.vls-w10-<secId>) into the single shared <style id="vl-sc-w10">.
// Uses window.gsap when present (CSS transitions otherwise); honours prefers-reduced-motion.
// Every visual names the benchmark template it adapts, with its URL, in a code comment.
(() => {
"use strict";
// ================================================================
// Shared engine (self-contained copy in every part file).
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
// i = narration moment index (0-based), n = number of narration moments.
// Each scene is a sequence of 8-12 distinct VISUALS ("panels"); every panel
// covers 2-5 narration moments and re-stages itself at each moment so the
// figure always shows what the current narration line says.
// ================================================================
window.VL_SCENES = window.VL_SCENES || {};
const VL_SCENES = window.VL_SCENES;
const PART = "p4";
const C = {
  navy: "#1f4e79", navy2: "#2d6a9f", orange: "#c0502a", paper: "#fbf8f1",
  ink: "#1b2a3a", blue: "#dbe7f2", green: "#317c61", gold: "#e5b76c",
  muted: "#91aabd", plum: "#6b4e8a", sand: "#efe4cf", sky: "#eaf2f8",
  red: "#b0362b", white: "#ffffff", mint: "#e1f0e8", peach: "#f8e3d8",
  lilac: "#ece6f3", slate: "#5d7389", night: "#14263a", amber: "#a8741a",
  teal: "#2a7f8f", cream: "#fffaf0", grey: "#c5ced8", wall: "#efe7d8"
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
const inR = (k, a, b) => k >= a && k <= b;
// ---- SVG string builders ----
const R = (x, y, w, h, f, rx = 0, ex = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${ex}/>`;
const O = (cx, cy, r, f, ex = "") => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${ex}/>`;
const E = (cx, cy, rx, ry, f, ex = "") => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${ex}/>`;
const P = (d, s, w = 2, ex = "") => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const F = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
const D = (k, d, s, w = 3, ex = "") => `<path data-k="${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 101" stroke-dashoffset="100" ${ex}/>`;
const T = (x, y, s, sz = 14, f = C.ink, ex = "", a = "middle") => `<text x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const TK = (k, x, y, s, sz = 14, f = C.ink, a = "middle", ex = "") => `<text data-k="${k}" x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const K = (k, body, ex = "") => `<g data-k="${k}" ${ex}>${body}</g>`;
const H = (k, body, ex = "") => `<g data-k="${k}" style="opacity:0" ${ex}>${body}</g>`;
const tw = (s, sz) => Math.round(String(s).length * sz * 0.6 + sz * 1.3);
// chip = rounded label; grouped (data-chip) so layout QA treats it as one box
const chip = (x, y, s, o = {}) => {
  const sz = o.sz || 14, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.8);
  return `<g data-chip="1">` + R(x - w / 2, y - h / 2, w, h, o.bg || C.paper, o.rx == null ? h / 2 : o.rx,
    `stroke="${o.st || C.navy}" stroke-width="${o.sw || 1.6}"${o.dash ? ' stroke-dasharray="4 3"' : ""}`) +
    T(x, y + sz * 0.36, s, sz, o.fg || C.navy) + `</g>`;
};
// left-anchored chip (x = left edge)
const chipL = (x, y, s, o = {}) => { const sz = o.sz || 14, w = o.w || tw(s, sz); return chip(x + w / 2, y, s, Object.assign({}, o, { w })); };
const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${x - 7 * s} ${y} l${5 * s} ${5 * s} l${10 * s} ${-11 * s}`, col, w);
const cross = (x, y, s = 1, col = C.orange, w = 3) => P(`M${x - 6 * s} ${y - 6 * s} l${12 * s} ${12 * s} M${x + 6 * s} ${y - 6 * s} l${-12 * s} ${12 * s}`, col, w);
const okDot = (x, y, r = 10) => O(x, y, r, C.green) + tick(x, y, r / 18, C.white, 2.2);
const noDot = (x, y, r = 10, col = C.red) => O(x, y, r, col) + cross(x, y, r / 16, C.white, 2.2);
const qDot = (x, y, r = 10, col = C.orange) => O(x, y, r, col) + T(x, y + r * 0.45, "?", r * 1.3, C.white);
const xDot = (x, y, r = 10, col = C.orange) => O(x, y, r, col) + T(x, y + r * 0.45, "!", r * 1.3, C.white);
const person = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}</g>`;
// Guest Host: green figure with lanyard and badge
const hostP = (x, y, s = 1, col = C.green) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}${P("M-5 -3 L0 4 L5 -3", C.gold, 1.6)}${R(-3, 3, 6, 5, C.gold, 1)}</g>`;
// Manager: figure with a tie
const mgrP = (x, y, s = 1, col = C.plum) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}${F("M0 -3 L3 2 L0 10 L-3 2 Z", C.gold)}</g>`;
// Guest: figure with a suitcase
const guestP = (x, y, s = 1, col = C.navy2) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}${R(13, 0, 10, 12, C.orange, 2)}${P("M16 0 V-3 H20 V0", C.orange, 1.4)}</g>`;
const clock = (x, y, r, col = C.orange, bg = C.paper) => O(x, y, r, bg, `stroke="${col}" stroke-width="${Math.max(2, r / 6)}"`) + P(`M${x} ${y - r * 0.62} V${y} L${x + r * 0.45} ${y + r * 0.3}`, col, Math.max(2, r / 7));
const gear = (x, y, r, col, hole = C.paper) => {
  let d = ""; const n = 8;
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n * 0.55, a2 = a0 + Math.PI / n, a3 = a2 + Math.PI / n * 0.45;
    const p = (a, rr) => `${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`;
    d += (i ? "L" : "M") + p(a0, r) + "L" + p(a1, r) + "L" + p(a2, r * 0.78) + "L" + p(a3, r * 0.78);
  }
  return F(d + "Z", col) + O(x, y, r * 0.34, hole);
};
const keyI = (x, y, s = 1, col = C.amber) => `<g transform="translate(${x} ${y}) scale(${s})">${O(-10, 0, 8, "none", `stroke="${col}" stroke-width="4"`)}${P("M-2 0 H18 M12 0 V7 M17 0 V5", col, 4)}</g>`;
const lockI = (x, y, s = 1, col = C.red) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-11, -4, 22, 17, col, 3)}${P("M-7 -4 V-10 A7 7 0 0 1 7 -10 V-4", col, 3.4)}${O(0, 4, 2.6, C.white)}</g>`;
const shieldI = (x, y, s = 1, col = C.green, inner = "") => `<g transform="translate(${x} ${y}) scale(${s})">${F("M0 -20 L17 -13 V0 Q17 14 0 22 Q-17 14 -17 0 V-13 Z", col)}${inner}</g>`;
const docI = (x, y, w, h, col = C.navy, lines = 4, bg = C.white) => R(x, y, w, h, bg, 6, `stroke="${col}" stroke-width="1.8"`) + R(x, y, w, Math.min(16, h * 0.2), col, 6) + R(x, y + Math.min(16, h * 0.2) - 6, w, 6, col) +
  rep(lines, (i) => R(x + 10, y + Math.min(16, h * 0.2) + 12 + i * ((h - Math.min(16, h * 0.2) - 18) / Math.max(1, lines)), (w - 20) * (i % 3 === 2 ? 0.6 : 0.9), 4, "#d9e1ea", 2));
const envI = (x, y, w, h, col = C.navy) => R(x, y, w, h, C.white, 4, `stroke="${col}" stroke-width="2"`) + P(`M${x} ${y} L${x + w / 2} ${y + h * 0.55} L${x + w} ${y}`, col, 2);
const magI = (x, y, r, col = C.ink) => O(x, y, r, "rgba(255,255,255,.35)", `stroke="${col}" stroke-width="${Math.max(3, r / 9)}"`) + P(`M${x + r * 0.72} ${y + r * 0.72} L${x + r * 1.25} ${y + r * 1.25}`, col, Math.max(5, r / 5));
const starI = (x, y, r = 10, col = C.gold) => { let d = ""; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; d += (i ? "L" : "M") + (x + rr * Math.cos(a)).toFixed(1) + " " + (y + rr * Math.sin(a)).toFixed(1); } return F(d + "Z", col); };
const bldg = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-20, -34, 40, 46, col, 3)}${F("M-24 -34 L0 -48 L24 -34 Z", col)}${rep(6, (i) => R(-14 + (i % 3) * 11, -26 + Math.floor(i / 3) * 13, 6, 8, C.gold, 1))}${R(-5, 2, 10, 10, C.paper, 1)}</g>`;
const kioskI = (x, y, s = 1, scr = C.sky) => `<g transform="translate(${x} ${y}) scale(${s})">${R(-22, -62, 44, 84, C.navy, 8)}${R(-17, -55, 34, 30, scr, 4)}${R(-11, -16, 22, 5, "#9cc0e0", 2)}${R(-6, -6, 12, 6, "#0f2f4f", 2)}${R(-27, 22, 54, 6, C.navy, 3)}</g>`;
const arrowH = (x1, y, x2, col = C.navy, w = 3) => P(`M${x1} ${y} H${x2}`, col, w) + F(`M${x2 + (x2 > x1 ? 2 : -2)} ${y} l${x2 > x1 ? -10 : 10} -6 v12 Z`, col);
const arrowV = (x, y1, y2, col = C.navy, w = 3) => P(`M${x} ${y1} V${y2}`, col, w) + F(`M${x} ${y2 + (y2 > y1 ? 2 : -2)} l-6 ${y2 > y1 ? -10 : 10} h12 Z`, col);
const bubble = (x, y, w, h, tx, sz = 14, col = C.navy, tail = "bl") => R(x, y, w, h, C.white, 10, `stroke="${col}" stroke-width="1.8"`) +
  F(tail === "bl" ? `M${x + 14} ${y + h - 1} L${x + 8} ${y + h + 12} L${x + 26} ${y + h - 1} Z` : `M${x + w - 14} ${y + h - 1} L${x + w - 8} ${y + h + 12} L${x + w - 26} ${y + h - 1} Z`, C.white, `stroke="${col}" stroke-width="1.8"`) +
  R(tail === "bl" ? x + 9 : x + w - 27, y + h - 3, 18, 4, C.white) + `<g data-chip="1">${R(x + 2, y + 2, w - 4, h - 4, "none")}${T(x + w / 2, y + h / 2 + sz * 0.36, tx, sz, col)}</g>`;
const stampI = (x, y, s, col = C.green, rot = -8, sz = 15) => { const w = tw(s, sz) + 10; return `<g transform="rotate(${rot} ${x} ${y})"><g data-chip="1">${R(x - w / 2, y - 16, w, 32, "rgba(255,255,255,.92)", 5, `stroke="${col}" stroke-width="3"`)}${T(x, y + 5.5, s, sz, col)}</g></g>`; };
const gaugeArc = (cx, cy, r, f) => { const a0 = Math.PI, a1 = Math.PI + Math.PI * clamp(f, 0, 1); return `M${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)}`; };
const bleed = (bg, deco = "") => R(-400, -300, 1200, 900, bg) + deco;
const grid = (col, step = 40) => rep(Math.ceil(1200 / step), (i) => P(`M${-400 + i * step} -300 V600`, col, 1)) + rep(Math.ceil(900 / step), (i) => P(`M-400 ${-300 + i * step} H800`, col, 1));
const dots = (col) => rep(46, (i) => O(-380 + (i * 97) % 1160, -280 + ((i * 53) % 860), 2.2, col));
// ---- per-scene stylesheet, appended once per part into the shared <style id="vl-sc-w10"> ----
function sceneCSS(id, bg) {
  const s = ".vls-w10-" + id;
  return `
${s}{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:230px;overflow:hidden!important;box-sizing:border-box;border-radius:14px;background:${bg};color:${C.ink};font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w10-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w10-fig>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}
${s} svg text{font-family:inherit;font-weight:700;letter-spacing:.1px}
${s} [data-k],${s} [data-pn]{transform-box:fill-box;transform-origin:50% 50%}
${s}.w10-css [data-k],${s}.w10-css [data-pn]{transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.85s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}
${s}.w10-snap [data-k],${s}.w10-snap [data-pn],${s}.w10-rm [data-k],${s}.w10-rm [data-pn]{transition:none!important}
${s}.w10-rm *,${s}.w10-snap *{animation:none!important}
${s} .w10-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:36px;padding:6px 12px 8px;font-size:14px;font-weight:700;line-height:1.25;color:${C.navy};background:rgba(255,255,255,.62);border-top:1px solid rgba(31,78,121,.14)}
${s} .w10-num{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w10-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.2px}
${s} .w10-lab.w10-in{animation:vlsw10CapIn .5s cubic-bezier(.22,.8,.24,1)}
${s} .w10-dots{flex:0 0 64px;display:grid;gap:2px;align-items:center}
${s} .w10-dots i{display:block;height:5px;border-radius:3px;background:rgba(31,78,121,.18);transition:background .4s ease,transform .4s ease}
${s} .w10-dots i.on{background:${C.orange};transform:scaleY(1.6)}
${s} .w10-dots i.done{background:rgba(31,78,121,.55)}
${s}.w10-intro .w10-fig>svg{animation:vlsw10Intro .7s cubic-bezier(.22,.8,.24,1)}
${s} .a-flow{stroke-dasharray:5 7;animation:vlsw10Flow 1.1s linear infinite}
${s} .a-stream{stroke-dasharray:0 13;animation:vlsw10Stream .9s linear infinite}
${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Spin 7s linear infinite}
${s} .a-spinr{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Spin 9s linear infinite reverse}
${s} .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Bob 2.6s ease-in-out infinite}
${s} .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Pulse 2s ease-in-out infinite}
${s} .a-blink{animation:vlsw10Blink 1.4s ease-in-out infinite}
${s} .a-shake{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw10Shake 1.6s ease-in-out infinite}
${s} .a-run{animation:vlsw10Run 1.4s linear infinite}
${s} .a-tick{transform-box:fill-box;transform-origin:50% 100%;animation:vlsw10Spin 4s linear infinite}
@media (max-width:420px){${s} .w10-cap{font-size:13px;min-height:32px;padding:5px 10px 7px;gap:8px}${s} .w10-dots{flex-basis:52px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
}
const KEYFRAMES = `
@keyframes vlsw10CapIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes vlsw10Intro{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
@keyframes vlsw10Flow{to{stroke-dashoffset:-24}}
@keyframes vlsw10Stream{to{stroke-dashoffset:-26}}
@keyframes vlsw10Spin{to{transform:rotate(360deg)}}
@keyframes vlsw10Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes vlsw10Pulse{0%,100%{opacity:.35;transform:scale(.94)}50%{opacity:.95;transform:scale(1.06)}}
@keyframes vlsw10Blink{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes vlsw10Run{from{transform:translateX(0)}to{transform:translateX(40px)}}
@keyframes vlsw10Shake{0%,100%{transform:rotate(0)}20%{transform:rotate(-4deg)}40%{transform:rotate(4deg)}60%{transform:rotate(-2deg)}80%{transform:rotate(2deg)}}
`;
function addStyles(list) {
  if (typeof document === "undefined") return;
  let st = document.getElementById("vl-sc-w10");
  if (!st) { st = document.createElement("style"); st.id = "vl-sc-w10"; (document.head || document.documentElement).appendChild(st); }
  const flag = "data-w10claude-" + PART;
  if (st.getAttribute(flag)) return;
  st.setAttribute(flag, "1");
  st.appendChild(document.createTextNode(KEYFRAMES + list.map(([id, bg, extra]) => sceneCSS(id, bg) + (extra || "")).join("\n")));
}
// ---- scene factory ----
function makeScene(cfg) {
  const { id, panels } = cfg;
  const labels = [];
  panels.forEach((p) => { p.a = labels.length; p.labels.forEach((l) => labels.push(l)); p.b = labels.length - 1; });
  const N = labels.length;
  let root = null, useG = false, active = -1;
  const raf = (f) => (window.requestAnimationFrame ? window.requestAnimationFrame(f) : setTimeout(f, 16));
  const panelOf = (k) => { for (let p = 0; p < panels.length; p++) if (k >= panels[p].a && k <= panels[p].b) return p; return panels.length - 1; };
  const mapK = (i, n) => {
    const nn = Math.max(1, Math.floor(num(n, N)));
    const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
    return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
  };
  const pEl = (p) => (root ? root.querySelector('[data-pn="' + p + '"]') : null);
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
  function count(el, v, pre, suf, snap) {
    const from = num(el.getAttribute("data-v"), 0);
    el.setAttribute("data-v", String(v));
    const fmt = (x) => pre + Math.round(x).toLocaleString("en-US") + suf;
    const tok = (el._w10tok = (el._w10tok || 0) + 1);
    if (snap || reduced() || from === v) { el.textContent = fmt(v); return; }
    if (useG) { const o = { x: from }; window.gsap.to(o, { x: v, duration: 0.9, ease: "power2.out", onUpdate: () => { if (el._w10tok === tok) el.textContent = fmt(o.x); } }); return; }
    const t0 = Date.now();
    const stepF = () => { if (el._w10tok !== tok) return; const u = clamp((Date.now() - t0) / 900, 0, 1), e = 1 - Math.pow(1 - u, 3); el.textContent = fmt(from + (v - from) * e); if (u < 1) raf(stepF); };
    stepF();
  }
  function ctx(scope, snap) {
    const nodes = (k) => (scope ? Array.prototype.slice.call(scope.querySelectorAll('[data-k="' + k + '"]')) : []);
    return {
      snap,
      op: (k, o, t = {}) => nodes(k).forEach((el) => op(el, o, t, snap)),
      mv: (k, st, t = {}) => nodes(k).forEach((el) => tf(el, st, t, snap)),
      dr: (k, f, t = {}) => nodes(k).forEach((el) => dash(el, f, t, snap)),
      fl: (k, col, t = {}) => nodes(k).forEach((el) => fill(el, col, t, snap)),
      tx: (k, s) => nodes(k).forEach((el) => { if (el.textContent !== String(s)) el.textContent = String(s); }),
      num: (k, v, pre = "", suf = "") => nodes(k).forEach((el) => count(el, v, pre, suf, snap)),
      vis: (map, t = {}) => Object.keys(map).forEach((k) => nodes(k).forEach((el) => op(el, map[k] === true ? 1 : map[k] === false ? 0 : map[k], t, snap))),
      all: (sel) => (scope ? Array.prototype.slice.call(scope.querySelectorAll(sel)) : []),
      opEl: (el, o, t = {}) => op(el, o, t, snap),
      mvEl: (el, st, t = {}) => tf(el, st, t, snap),
      flEl: (el, col, t = {}) => fill(el, col, t, snap)
    };
  }
  function caption(k, p, snap) {
    const lab = root.querySelector(".w10-lab"), nn = root.querySelector(".w10-num");
    const txt = labels[k] || "";
    if (lab && lab.textContent !== txt) {
      lab.textContent = txt;
      if (!snap && !reduced()) { lab.classList.remove("w10-in"); void lab.offsetWidth; lab.classList.add("w10-in"); }
    }
    if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
    Array.prototype.slice.call(root.querySelectorAll(".w10-dots i")).forEach((d, q) => { d.className = q === p ? "on" : q < p ? "done" : ""; });
  }
  function safe(f) { try { f(); } catch (e) { if (window.console) console.warn("[VL W10 " + id + "]", e); } }
  function render(k, snap) {
    if (!root) return;
    const p = panelOf(k), pg = pEl(p), pc = panels[p];
    if (snap) root.classList.add("w10-snap");
    if (p !== active) {
      // stage the incoming visual in its pre-state, then let it animate in
      if (!snap) {
        root.classList.add("w10-snap");
        safe(() => pc.render(ctx(pg, true), k - pc.a - 1, k - 1));
        if (pg) tf(pg, { s: 1.035, y: 6, pv: [200, 150] }, {}, true);
        void root.offsetWidth;
        root.classList.remove("w10-snap");
      }
      panels.forEach((_, q) => {
        const el = pEl(q); if (!el) return;
        if (q === p) { op(el, 1, { d: 0.55, dl: snap ? 0 : 0.18 }, snap); tf(el, { pv: [200, 150] }, { d: 0.8, dl: snap ? 0 : 0.18 }, snap); }
        else { op(el, 0, { d: 0.4 }, snap); tf(el, { s: q < p ? 0.97 : 1.03, pv: [200, 150] }, { d: 0.5 }, snap); }
      });
      active = p;
    }
    safe(() => pc.render(ctx(pg, snap), k - pc.a, k));
    caption(k, p, snap);
    if (snap) { void root.offsetWidth; root.classList.remove("w10-snap"); }
    root.setAttribute("data-moment", String(k));
    root.setAttribute("data-visual", String(p + 1));
  }
  function kill() {
    if (root && useG) { try { window.gsap.killTweensOf(root.querySelectorAll("[data-k],[data-pn]")); } catch (_) {} }
  }
  function mount(el) {
    const r = document.createElement("div");
    const rm = reduced();
    r.className = "vls-w10-" + id + " w10-root" + (useG ? " w10-gsap" : " w10-css") + (rm ? " w10-rm" : " w10-intro");
    r.setAttribute("data-scene", id);
    const body = panels.map((pc, q) => `<g data-pn="${q}" style="opacity:0">${pc.draw()}</g>`).join("");
    r.innerHTML = '<div class="w10-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
      esc(cfg.desc) + '">' + bleed(cfg.bg) + body + '</svg></div><div class="w10-cap" aria-hidden="true"><span class="w10-num"></span><span class="w10-lab"></span><span class="w10-dots" style="grid-template-columns:repeat(' + panels.length + ',1fr)">' + rep(panels.length, () => "<i></i>") + "</span></div>";
    if (typeof el.replaceChildren === "function") el.replaceChildren(r);
    else { el.innerHTML = ""; el.appendChild(r); }
    return r;
  }
  return {
    build(el) {
      if (!el || el.nodeType !== 1) return;
      kill();
      useG = hasG();
      active = -1;
      root = mount(el);
      render(0, true);
    },
    step(i, n) {
      if (!root) return;
      render(mapK(i, n), false);
    },
    reset() {
      if (!root) return;
      kill();
      active = -1;
      render(0, true);
    },
    _meta: { id, N, visuals: panels.map((p) => ({ a: p.a, b: p.b, src: p.src })) }
  };
}
const SCENE_BG = [];
function mirror(id) {
  // The older Week 10 host reads window.W10_SCENES; keep it pointing at the same scene.
  try { if (window.W10_SCENES && window.W10_SCENES !== VL_SCENES) window.W10_SCENES[id] = VL_SCENES[id]; } catch (_) {}
}

// ============================================================
// W10O2d · "Repairing the Guest Host specification"  (49 narration moments, 16 visuals)
// Story spine: the sponsor's request → the process outpaced the people system → three confirmed
// contradictions + no assessment → five connected repairs, each built and then locked into a
// recurring five-segment repair ring: 1 role, 2 authority, 3 performance, 4 capability,
// 5 adoption → one coherent (proposed) design → start with the confirmed AED 400 gap, then test.
// AED 320 / AED 460 are illustrative. Reporting line is deliberately left unspecified.
// ============================================================
{
  const id = "W10O2d";
  const RC = [C.navy, C.amber, C.plum, C.teal, C.green];
  const RN = ["Defined role", "Formal authority", "Aligned performance", "Tested capability", "Owned adoption"];
  const FLOOR = () => R(-400, 240, 1200, 400, "#e8e4dc");
  // recurring motif: the five-segment repair ring (pie-update style sectors)
  const ring = (cx, cy, r, w = 22) => rep(5, (i) => {
    const a0 = (-90 + i * 72 + 2) * Math.PI / 180, a1 = (-90 + (i + 1) * 72 - 2) * Math.PI / 180;
    const d = `M${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)}`;
    return P(d, "#e2ddd3", w, 'stroke-linecap="butt"') + D("rg" + i, d, RC[i], w, 'stroke-linecap="butt"');
  });
  const ringLit = (c, k, j, now) => { for (let i = 0; i < 5; i++) c.dr("rg" + i, j >= 0 && i < k ? 1 : 0, { d: 0.7, dl: i === k - 1 && now ? 0.4 : 0 }); };
  const legend = (x, y, k) => rep(5, (i) => K("lg" + i, O(x, y + i * 34, 9, RC[i]) + T(x + 16, y + 5 + i * 34, (i + 1) + " · " + RN[i], 14, i < k ? RC[i] : C.muted, "", "start")));
  const ringPanel = (k, title) => H("rp", ring(100, 150, 70) + T(100, 146, k + " of 5", 22, C.ink) + T(100, 170, "repairs", 14, C.slate) + legend(206, 82, k) + chip(270, 34, title, { sz: 15, bg: RC[k - 1], st: RC[k - 1], fg: C.white }));
  const panels = [
    // V1 · moments 0–2 · SVGator motion graphics assets — https://www.svgator.com/animation-templates/assets
    // Adapted: reveal → emphasise → exit asset beats; a document lands on the desk, the team
    // appears, then two gears turn at different speeds.
    {
      src: "https://www.svgator.com/animation-templates/assets",
      labels: ["Make the role workable", "Twenty-two Guest Hosts", "Process outpaced people"],
      draw: () =>
        H("desk", FLOOR() + R(150, 196, 230, 18, "#8a6a3a", 5) + R(160, 214, 12, 30, "#8a6a3a") + R(358, 214, 12, 30, "#8a6a3a") + mgrP(70, 236, 2.3) +
          K("doc", R(-58, -66, 116, 132, C.white, 8, `stroke="${C.slate}" stroke-width="2"`) + R(-58, -66, 116, 26, C.slate, 8) + R(-58, -48, 116, 8, C.slate) + T(0, -48, "Job description", 13, C.white) + rep(5, (i) => R(-46, -28 + i * 18, i % 3 === 2 ? 60 : 92, 7, "#d9e1ea", 3))) + bubble(150, 30, 160, 34, "Make it workable", 15, C.plum, "bl")) +
        H("team", [60, 150, 250, 340].map((x) => bldg(x, 70, 0.85, C.navy)).join("") + rep(22, (i) => hostP(30 + (i % 11) * 34.4, 140 + Math.floor(i / 11) * 52, 0.95)) +
          kioskI(60, 290, 0.4, C.mint) + kioskI(340, 290, 0.4, C.mint) + chip(200, 270, "Kiosks routine, hosts exceptions", { sz: 13 })) +
        H("gears", `<g class="a-spin">${gear(130, 140, 70, C.green, C.mint)}</g>` + `<g class="a-spinr" style="animation-duration:30s">${gear(282, 150, 62, C.slate, C.sky)}</g>` +
          chip(110, 252, "Redesigned process", { sz: 14, bg: C.green, st: C.green, fg: C.white }) + chip(290, 252, "People system", { sz: 14, bg: C.slate, st: C.slate, fg: C.white }) + chip(200, 30, "Out of step", { sz: 16, st: C.red, fg: C.red })),
      render: (c, j) => {
        c.op("desk", j === 0 ? 1 : 0); c.mv("doc", j === 0 ? { x: 266, y: 150 } : { x: 266, y: -80 }, { d: 1.1, e: "power3.out" });
        c.op("team", j === 1 ? 1 : 0); c.op("gears", j === 2 ? 1 : 0);
      }
    },
    // V2 · moments 3–5 · Infographics motion design (Behance) — https://www.behance.net/gallery/210506051/Infographics-motion-design
    // Adapted: graphic components reveal on storyboard beats — evidence cards, a verdict, then a
    // five-part ring that becomes the spine of the whole section.
    {
      src: "https://www.behance.net/gallery/210506051/Infographics-motion-design",
      labels: ["Three confirmed contradictions", "Attended, not assessed", "Five connected repairs"],
      draw: () =>
        [["Descriptions", "3 weeks late", C.navy], ["AED 400 waiver", "not delegated", C.amber], ["Old objectives", "still rewarded", C.plum]].map(([a, b, col], i) =>
          H("cd" + i, R(16 + i * 128, 40, 112, 150, C.white, 12, `stroke="${col}" stroke-width="2.5"`) + R(16 + i * 128, 40, 112, 30, col, 12) + R(16 + i * 128, 58, 112, 12, col) + T(72 + i * 128, 61, "Confirmed", 13, C.white) +
            T(72 + i * 128, 116, a, 14, col) + T(72 + i * 128, 140, b, 14, C.ink) + xDot(72 + i * 128, 170, 11, C.red))).join("") +
        H("as", chip(110, 230, "22 / 22 attended", { sz: 16, bg: C.green, st: C.green, fg: C.white }) + chip(290, 230, "Assessed: none", { sz: 16, bg: C.red, st: C.red, fg: C.white }) + chip(200, 274, "Coherent repair needed", { sz: 15, st: C.navy })) +
        H("rp", ring(100, 150, 70) + T(100, 146, "Five", 22, C.ink) + T(100, 170, "repairs", 14, C.slate) + legend(206, 82, 5) + chip(270, 34, "Built one by one", { sz: 15, bg: C.navy, fg: C.white })),
      render: (c, j) => {
        for (let i = 0; i < 3; i++) { c.op("cd" + i, j === 0 || j === 1 ? (j === 1 ? 0.45 : 1) : 0, { dl: j === 0 ? i * 0.3 : 0 }); c.mv("cd" + i, j >= 0 ? {} : { y: -30 }, { dl: j === 0 ? i * 0.3 : 0, e: "bounce.out" }); }
        c.op("as", j === 1 ? 1 : 0); c.op("rp", j === 2 ? 1 : 0);
        for (let i = 0; i < 5; i++) { c.dr("rg" + i, j === 2 ? 1 : 0, { dl: j === 2 ? i * 0.3 : 0, d: 0.5 }); c.op("lg" + i, j === 2 ? 1 : 0, { dl: j === 2 ? i * 0.3 : 0 }); }
      }
    },
    // V3 · moments 6–9 · Modern Business Process Infographics Animation Pack (Envato) — https://elements.envato.com/flow-processes-infographic-scenes-pack-ZNAYHQ5
    // Adapted: stages are introduced, steps are connected, completion is emphasised — the work list,
    // its split from other functions' decisions, the cross-functional chain, an open reporting line.
    {
      src: "https://elements.envato.com/flow-processes-infographic-scenes-pack-ZNAYHQ5",
      labels: ["1 · Define the work", "Work versus decisions", "A cross-functional decision", "Reporting line unknown"],
      draw: () =>
        H("wk", hostP(70, 200, 2.6) + [["Support arrivals", 52], ["Investigate discrepancies", 102], ["Explain decisions", 152], ["Coordinate exceptions", 202]].map(([t, y], i) =>
          K("v" + i, okDot(150, y, 11) + chip(270, y, t, { sz: 14, w: 210, st: C.navy }))).join("") + chip(200, 268, "The actual work", { sz: 15, bg: C.navy, fg: C.white })) +
        H("wd", R(16, 50, 176, 190, C.mint, 14, `stroke="${C.green}" stroke-width="2.5"`) + T(104, 80, "Host performs", 16, C.green) + T(104, 120, "Investigates", 14, C.ink) + T(104, 146, "Explains", 14, C.ink) + T(104, 172, "Coordinates", 14, C.ink) +
          R(208, 50, 176, 190, C.lilac, 14, `stroke="${C.plum}" stroke-width="2.5"`) + T(296, 80, "Others decide", 16, C.plum) + T(296, 120, "Revenue policy", 14, C.ink) + T(296, 146, "Over the limit", 14, C.ink) +
          chip(200, 268, "Process owner accountable", { sz: 14, st: C.plum, fg: C.plum })) +
        H("cf", [["Guest Host", "investigates", hostP(54, 132, 1.5)], ["Revenue", "advises", mgrP(150, 132, 1.5, C.navy)], ["Authorised role", "decides", mgrP(250, 132, 1.5)], ["Guest", "informed", guestP(342, 132, 1.5)]]
          .map(([a, b, ic], i) => O(54 + i * 96 + (i === 3 ? -8 : 0), 118, 34, C.white, `stroke="${C.navy}" stroke-width="2"`) + ic + T(54 + i * 96 - (i === 3 ? 8 : 0), 180, a, 14, C.navy) + T(54 + i * 96 - (i === 3 ? 8 : 0), 198, b, 14, C.slate) +
            (i < 3 ? D("cl" + i, `M${90 + i * 96} 118 H${114 + i * 96}`, C.green, 4) : "")).join("") + chip(200, 256, "Ownership made explicit", { sz: 15, st: C.green, fg: C.green })) +
        H("rl", hostP(200, 236, 2.2) + P("M200 180 V112", C.muted, 4, 'stroke-dasharray="6 6"') + R(140, 50, 120, 60, "none", 10, `stroke="${C.muted}" stroke-width="3" stroke-dasharray="7 6"`) + T(200, 90, "?", 34, C.orange) +
          chip(76, 150, "Not in case", { sz: 15, st: C.orange, fg: C.orange }) + chip(306, 150, "Justify, document", { sz: 14, st: C.green, fg: C.green }) + chip(200, 286, "Don't invent one", { sz: 14, bg: C.red, st: C.red, fg: C.white })),
      render: (c, j) => {
        c.op("wk", j === 0 ? 1 : 0); for (let i = 0; i < 4; i++) c.op("v" + i, j === 0 ? 1 : 0, { dl: j === 0 ? i * 0.3 : 0 });
        c.op("wd", j === 1 ? 1 : 0); c.op("cf", j === 2 ? 1 : 0); for (let i = 0; i < 3; i++) c.dr("cl" + i, j === 2 ? 1 : 0, { dl: j === 2 ? 0.3 + i * 0.35 : 0, d: 0.4 });
        c.op("rl", j === 3 ? 1 : 0);
      }
    },
    // V4 · moments 10–13 · SAP Signavio Process Transformation Suite — https://www.signavio.com/products/process-transformation-suite/
    // Adapted: move from the process model to analysis to a control state — the ring locks repair
    // one, then the authority gap is analysed down to the referral it causes.
    {
      src: "https://www.signavio.com/products/process-transformation-suite/",
      labels: ["Repair one complete", "2 · Formalise authority", "AED 320, no delegation", "Referral feels safer"],
      draw: () =>
        ringPanel(1, "Work understandable") +
        H("tv", envI(20, 60, 160, 100, C.navy) + T(100, 186, "Told: ≤ AED 400", 15, C.navy) + R(212, 40, 172, 200, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + R(212, 40, 172, 28, C.navy, 8) + R(212, 60, 172, 8, C.navy) +
          T(298, 60, "Delegation schedule", 13, C.white) + rep(5, (i) => R(226, 86 + i * 30, 144, 9, "#d9e1ea", 4)) + R(220, 140, 156, 30, C.peach, 6, `stroke="${C.red}" stroke-width="2" stroke-dasharray="5 4"`) + T(298, 160, "No permission", 14, C.red) +
          chip(200, 272, "Told is not authorised", { sz: 15, bg: C.amber, st: C.amber, fg: C.white })) +
        H("g3", O(110, 140, 46, C.green) + T(110, 136, "AED 320", 17, C.white) + T(110, 156, "eligible", 13, C.mint) + lockI(250, 140, 2.8, C.red) + P("M160 140 H216", C.muted, 4, 'stroke-dasharray="6 6"') +
          chip(110, 230, "Within the limit", { sz: 15, st: C.green, fg: C.green }) + chip(290, 230, "Delegation gap", { sz: 15, st: C.red, fg: C.red }) + chip(200, 34, "Illustrative case", { sz: 14, st: C.slate, fg: C.slate })) +
        H("rf", hostP(80, 238, 2.2) + mgrP(310, 110, 2) + chip(310, 168, "Duty manager", { sz: 14, st: C.plum, fg: C.plum }) + D("ra", "M110 200 C170 190 230 150 280 126", C.orange, 4) +
          bubble(30, 60, 180, 36, "Could be challenged", 14, C.orange, "bl") + chip(250, 262, "Referral feels safer", { sz: 15, bg: C.orange, st: C.orange, fg: C.white })),
      render: (c, j) => {
        c.op("rp", j === 0 ? 1 : 0); ringLit(c, 1, j === 0 ? 0 : -1, true); for (let i = 0; i < 5; i++) c.op("lg" + i, j === 0 ? 1 : 0);
        c.op("tv", j === 1 ? 1 : 0); c.op("g3", j === 2 ? 1 : 0); c.op("rf", j === 3 ? 1 : 0); c.dr("ra", j === 3 ? 1 : 0, { dl: 0.4 });
      }
    },
    // V5 · moments 14–17 · Stripe Connect (funds routed buyer → platform → seller) — https://stripe.com/ae/connect
    // Adapted: value tokens are routed through a platform to different destinations by rules; here
    // cases are routed by the approved rule to local resolution or escalation.
    {
      src: "https://stripe.com/ae/connect",
      labels: ["Approve the rule", "Decide, explain, record", "Small isn't automatic", "AED 460 escalates"],
      draw: () =>
        R(150, 96, 100, 108, C.navy, 14) + T(200, 138, "Approved", 15, C.white) + T(200, 160, "rule", 15, C.white) + K("st", stampI(200, 80, "Proposed", C.amber, -6, 13)) +
        H("rule", chip(72, 40, "Who may decide", { sz: 13 }) + chip(194, 40, "Which cases", { sz: 13 }) + chip(322, 40, "When to escalate", { sz: 13 }) + P("M72 54 L170 96 M200 54 V96 M330 54 L230 96", C.navy, 2, 'stroke-dasharray="4 4"')) +
        P("M250 150 C300 150 300 90 340 90", C.green, 6) + P("M250 150 C300 150 300 210 340 210", C.plum, 6) + P("M150 150 H60", C.navy, 6) +
        okDot(356, 90, 18) + chip(330, 128, "Resolve locally", { sz: 13, st: C.green, fg: C.green }) + O(356, 210, 18, C.plum) + arrowV(356, 222, 198, C.white, 3) + chip(330, 248, "Escalate", { sz: 13, st: C.plum, fg: C.plum }) +
        K("t1", O(0, 0, 20, C.green, `stroke="${C.white}" stroke-width="3"`) + T(0, 5, "320", 13, C.white), 'style="opacity:0"') +
        K("t2", O(0, 0, 20, C.slate, `stroke="${C.white}" stroke-width="3"`) + T(0, 5, "320", 13, C.white) + cross(16, -16, 0.6, C.red, 3), 'style="opacity:0"') +
        K("t3", O(0, 0, 20, C.orange, `stroke="${C.white}" stroke-width="3"`) + T(0, 5, "460", 13, C.white), 'style="opacity:0"') +
        H("rec", chip(100, 252, "Explain and record", { sz: 14, bg: C.green, st: C.green, fg: C.white })) +
        H("ine", chip(100, 252, "Ineligible: no", { sz: 14, bg: C.red, st: C.red, fg: C.white })) +
        H("ov", chip(100, 252, "Above AED 400", { sz: 14, bg: C.plum, st: C.plum, fg: C.white })),
      render: (c, j) => {
        c.op("rule", j === 0 ? 1 : 0); c.op("st", j >= 0 ? 1 : 0);
        c.op("t1", j === 1 ? 1 : 0); c.mv("t1", j === 1 ? { x: 356, y: 90 } : { x: 60, y: 150 }, { d: 1.6, e: "power2.inOut" });
        c.op("t2", j === 2 ? 1 : 0); c.mv("t2", j === 2 ? { x: 128, y: 150 } : { x: 60, y: 150 }, { d: 1, e: "back.out(2)" });
        c.op("t3", j === 3 ? 1 : 0); c.mv("t3", j === 3 ? { x: 356, y: 210 } : { x: 60, y: 150 }, { d: 1.6, e: "power2.inOut" });
        c.vis({ rec: j === 1, ine: j === 2, ov: j === 3 });
      }
    },
    // V6 · moments 18–19 · Pie chart update (Observable/D3) — https://observablehq.com/@d3/pie-chart-update
    // Adapted: sectors tween between datasets — first a two-sector balance of independence and
    // control, then the repair ring updating to two of five.
    {
      src: "https://observablehq.com/@d3/pie-chart-update",
      labels: ["Empowerment with limits", "Repair two complete"],
      draw: () =>
        H("pie", O(200, 150, 92, C.green) + F("M200 150 L200 58 A92 92 0 0 1 280 196 Z", C.plum) + O(200, 150, 46, "#f4f1ea") + T(200, 146, "Governed", 15, C.ink) + T(200, 166, "independence", 13, C.ink) +
          chip(84, 60, "Decide locally", { sz: 15, bg: C.green, st: C.green, fg: C.white }) + chip(322, 60, "Clear limits", { sz: 15, bg: C.plum, st: C.plum, fg: C.white }) + chip(200, 274, "Not approve everything", { sz: 15, st: C.red, fg: C.red })) +
        ringPanel(2, "Responsibility = authority"),
      render: (c, j) => {
        c.op("pie", j === 0 ? 1 : 0); c.mv("pie", j === 0 ? { r: 0 } : { r: -30 }, { d: 1.2 });
        c.op("rp", j === 1 ? 1 : 0); ringLit(c, 2, j === 1 ? 0 : -1, true); for (let i = 0; i < 5; i++) c.op("lg" + i, j === 1 ? 1 : 0);
      }
    },
    // V7 · moments 20–22 · Bar Chart Race (Observable/D3) — https://observablehq.com/@d3/bar-chart-race
    // Adapted: keyframed bars advance and re-rank; the inherited targets race ahead of the work
    // the Guest Host now does.
    {
      src: "https://observablehq.com/@d3/bar-chart-race",
      labels: ["3 · Repair performance", "Built for the old job", "Valuable, looks slow"],
      draw: () =>
        chip(200, 26, "Inherited objectives", { sz: 16, bg: C.plum, st: C.plum, fg: C.white }) +
        T(30, 82, "Check-ins per shift", 15, C.ink, "", "start") + R(30, 92, 340, 26, "#e6e1ea", 8) + K("b1", R(30, 92, 340, 26, C.plum, 8)) +
        T(30, 150, "Average transaction time", 15, C.ink, "", "start") + R(30, 160, 340, 26, "#e6e1ea", 8) + K("b2", R(30, 160, 340, 26, C.plum, 8)) +
        H("old", person(330, 268, 1.4, C.navy) + chip(230, 262, "Previous job", { sz: 15 }) + R(30, 230, 120, 50, "none", 8, `stroke="${C.navy}" stroke-width="2"`) + rep(5, (i) => R(40 + i * 22, 244, 16, 22, C.sky, 3, `stroke="${C.navy}" stroke-width="1.4"`))) +
        H("slow", hostP(60, 270, 1.5) + guestP(110, 270, 1.4) + clock(170, 248, 18, C.orange) + chip(296, 250, "Disputed booking solved", { sz: 13, st: C.green, fg: C.green }) + chip(296, 282, "Scores as slow", { sz: 13, bg: C.red, st: C.red, fg: C.white })),
      render: (c, j) => {
        c.mv("b1", { sx: j >= 0 ? (j === 2 ? 0.3 : 0.9) : 0.02, pv: [30, 105] }, { d: 1.2 }); c.mv("b2", { sx: j >= 0 ? (j === 2 ? 0.25 : 0.8) : 0.02, pv: [30, 173] }, { d: 1.2, dl: 0.15 });
        c.op("old", j === 1 ? 1 : 0); c.op("slow", j === 2 ? 1 : 0);
      }
    },
    // V8 · moments 23–25 · Stripe Connect features (payments workflow as a state machine) — https://stripe.com/ae/connect/features
    // Adapted: a state machine with verification states; the replacement measure passes a quality
    // state, the old target is removed, and the sample state checks four things.
    {
      src: "https://stripe.com/ae/connect/features",
      labels: ["Measure resolution and quality", "Replace, don't add", "Sample decision quality"],
      draw: () =>
        H("nm", R(20, 60, 170, 120, C.white, 12, `stroke="${C.green}" stroke-width="2.5"`) + T(105, 92, "Appropriate", 16, C.green) + T(105, 114, "local resolution", 16, C.green) + okDot(105, 150, 14) +
          arrowH(194, 120, 226, C.ink, 3) + R(230, 60, 150, 120, C.white, 12, `stroke="${C.navy}" stroke-width="2.5"`) + T(305, 98, "Quality", 16, C.navy) + T(305, 120, "check", 16, C.navy) + magI(305, 150, 12, C.navy) +
          chip(200, 246, "No unsuitable approvals", { sz: 15, st: C.navy })) +
        H("rp2", R(20, 40, 160, 150, C.white, 12, `stroke="${C.slate}" stroke-width="2"`) + T(100, 70, "Old targets", 15, C.slate) + T(100, 108, "Check-ins", 14, C.slate) + T(100, 134, "Speed", 14, C.slate) + P("M30 40 L170 190", C.red, 4) +
          R(220, 40, 160, 150, C.white, 12, `stroke="${C.green}" stroke-width="2.5"`) + T(300, 70, "New scorecard", 15, C.green) + T(300, 108, "Resolution", 14, C.ink) + T(300, 134, "Quality", 14, C.ink) + T(300, 160, "Guest outcome", 14, C.ink) +
          chip(200, 246, "One definition of success", { sz: 15, bg: C.green, st: C.green, fg: C.white })) +
        H("sm", rep(6, (i) => R(24 + i * 8, 54 + i * 10, 100, 70, C.white, 6, `stroke="${C.navy}" stroke-width="1.5"`)) + magI(110, 130, 30, C.ink) +
          [["Eligibility", 54], ["Authority", 104], ["Evidence", 154], ["Escalation", 204]].map(([t, y], i) => K("sc" + i, okDot(232, y, 11) + chip(306, y, t, { sz: 15, w: 120 }))).join("") + chip(110, 262, "Quality sample", { sz: 15, st: C.plum, fg: C.plum })),
      render: (c, j) => {
        c.op("nm", j === 0 ? 1 : 0); c.op("rp2", j === 1 ? 1 : 0); c.op("sm", j === 2 ? 1 : 0);
        for (let i = 0; i < 4; i++) c.op("sc" + i, j === 2 ? 1 : 0, { dl: j === 2 ? 0.3 + i * 0.3 : 0 });
      }
    },
    // V9 · moments 26–28 · Infographics Pack by JVARTS STUDIO (Motion Array) — https://motionarray.com/after-effects-templates/infographics-pack-100132/
    // Adapted: one infographic element at a time — a review gauge, a title-vs-work comparison and the
    // ring updating to three of five.
    {
      src: "https://motionarray.com/after-effects-templates/infographics-pack-100132/",
      labels: ["Review grade and rewards", "Evaluate the actual work", "Repair three complete"],
      draw: () =>
        H("gr", R(40, 50, 140, 190, C.white, 12, `stroke="${C.navy}" stroke-width="2.5"`) + T(110, 82, "Job grade", 17, C.navy) + rep(5, (i) => R(70, 100 + i * 24, 80, 16, i < 2 ? C.navy2 : "#e3e8ee", 4)) +
          R(220, 50, 140, 190, C.white, 12, `stroke="${C.amber}" stroke-width="2.5"`) + T(290, 82, "Rewards", 17, C.amber) + starI(290, 150, 34, C.gold) + chip(200, 274, "Unchanged · review due", { sz: 15, st: C.orange, fg: C.orange })) +
        H("aw", R(30, 60, 140, 80, C.green, 12) + T(100, 96, "New title", 17, C.white) + T(100, 120, "alone", 14, C.mint) + P("M180 100 H230", C.red, 4) + chip(300, 100, "Higher pay", { sz: 15, st: C.red, fg: C.red }) + P("M246 84 L356 116", C.red, 4) +
          chip(200, 196, "Evaluate actual work", { sz: 17, bg: C.navy, fg: C.white })) +
        ringPanel(3, "Measures fit the role"),
      render: (c, j) => {
        c.op("gr", j === 0 ? 1 : 0); c.op("aw", j === 1 ? 1 : 0);
        c.op("rp", j === 2 ? 1 : 0); ringLit(c, 3, j === 2 ? 0 : -1, true); for (let i = 0; i < 5; i++) c.op("lg" + i, j === 2 ? 1 : 0);
      }
    },
    // V10 · moments 29–31 · Data Analysis Animation (LottieFiles) — https://lottiefiles.com/free-animation/data-analysis-animation-visualize-insights-effectively-JTyygZuvbP
    // Adapted: an analytics glyph reveals its indicator — readiness evidence is read, found missing,
    // and replaced by four observable decision steps.
    {
      src: "https://lottiefiles.com/free-animation/data-analysis-animation-visualize-insights-effectively-JTyygZuvbP",
      labels: ["4 · Establish capability", "Attended, never assessed", "Realistic decisions"],
      draw: () =>
        H("bf", hostP(90, 220, 2.6) + bubble(150, 60, 120, 34, "Kiosk briefing", 14, C.slate, "bl") + docI(210, 120, 90, 110, C.slate, 4) + T(255, 250, "Job description", 13, C.slate) +
          chip(334, 104, "Not enough", { sz: 15, st: C.red, fg: C.red })) +
        H("na", T(110, 60, "Attendance", 17, C.green) + R(70, 80, 80, 160, C.green, 8) + T(110, 168, "22/22", 18, C.white) +
          T(290, 60, "Capability", 17, C.orange) + R(250, 80, 80, 160, "none", 8, `stroke="${C.orange}" stroke-width="3" stroke-dasharray="7 6"`) + T(290, 176, "?", 52, C.orange) + chip(200, 270, "Readiness unverified", { sz: 15, bg: C.red, st: C.red, fg: C.white })) +
        H("rd", [["Investigate evidence", magI(40, 52, 12, C.navy)], ["Establish eligibility", okDot(40, 104, 12)], ["Recognise the boundary", lockI(40, 156, 0.9, C.amber)], ["Explain the action", P("M28 198 h24 v18 h-14 l-8 8 z", C.green, 3)]]
          .map(([t, ic], i) => K("s" + i, ic + chip(190, 52 + i * 52, t, { sz: 15, w: 240 }))).join("") + chip(200, 272, "Practice and feedback", { sz: 14, bg: C.teal, st: C.teal, fg: C.white })),
      render: (c, j) => {
        c.op("bf", j === 0 ? 1 : 0); c.op("na", j === 1 ? 1 : 0); c.op("rd", j === 2 ? 1 : 0);
        for (let i = 0; i < 4; i++) c.op("s" + i, j === 2 ? 1 : 0, { dl: j === 2 ? i * 0.3 : 0 });
      }
    },
    // V11 · moments 32–34 · Sankey animation – graph variant (Observable) — https://observablehq.com/@oluckyman/sankey-animation-acyclic-graph
    // Adapted: routes are traversed and destination counters update; here each assessment case
    // travels to its correct destination and the reasoning is scored, not just the endpoint.
    {
      src: "https://observablehq.com/@oluckyman/sankey-animation-acyclic-graph",
      labels: ["Assess: local decision", "Assess: escalation", "Judge the reasoning"],
      draw: () =>
        K("base", chip(80, 150, "Scenario", { sz: 16, bg: C.navy, fg: C.white }) + P("M130 150 C190 150 200 80 260 80", C.green, 14, 'stroke-linecap="butt" opacity=".35"') + P("M130 150 C190 150 200 220 260 220", C.plum, 14, 'stroke-linecap="butt" opacity=".35"') +
        chip(326, 80, "Local decision", { sz: 14, st: C.green, fg: C.green }) + chip(326, 220, "Escalate", { sz: 14, st: C.plum, fg: C.plum })) +
        K("a1", O(0, 0, 20, C.green, `stroke="${C.white}" stroke-width="3"`) + T(0, 5, "320", 13, C.white), 'style="opacity:0"') + K("a2", O(0, 0, 20, C.orange, `stroke="${C.white}" stroke-width="3"`) + T(0, 5, "460", 13, C.white), 'style="opacity:0"') +
        H("why1", chip(200, 34, "Explain why it's local", { sz: 14, st: C.green, fg: C.green })) + H("why2", chip(200, 272, "Recognise the boundary", { sz: 14, st: C.plum, fg: C.plum })) +
        H("rz", R(20, 20, 360, 260, "rgba(244,241,234,.95)", 14) + chip(110, 90, "Right answer", { sz: 16, st: C.slate, fg: C.slate }) + T(200, 98, "+", 26, C.ink) + chip(290, 90, "Sound reasoning", { sz: 16, bg: C.green, st: C.green, fg: C.white }) +
          chip(200, 170, "Not memorised responses", { sz: 16, st: C.red, fg: C.red }) + mgrP(200, 258, 1.6, C.navy)),
      render: (c, j) => {
        c.op("base", j === 2 ? 0 : 1); c.op("a1", j === 0 ? 1 : 0); c.mv("a1", j === 0 ? { x: 232, y: 84 } : { x: 130, y: 150 }, { d: 1.4, e: "power2.inOut" });
        c.op("a2", j === 1 ? 1 : 0); c.mv("a2", j === 1 ? { x: 232, y: 216 } : { x: 130, y: 150 }, { d: 1.4, e: "power2.inOut" });
        c.op("why1", j === 0 ? 1 : 0); c.op("why2", j === 1 ? 1 : 0); c.op("rz", j === 2 ? 1 : 0);
      }
    },
    // V12 · moments 35–37 · Flat Infographics by zevs (Motion Array) — https://motionarray.com/after-effects-templates/flat-infographics-17982/
    // Adapted: flat panels animate into place one after another — two diagnoses, then the ring at 4/5.
    {
      src: "https://motionarray.com/after-effects-templates/flat-infographics-17982/",
      labels: ["Capability gap", "Organisational gap", "Repair four complete"],
      draw: () =>
        H("cg", R(16, 30, 176, 220, C.mint, 14, `stroke="${C.green}" stroke-width="2.5"`) + T(104, 62, "Capability gap", 16, C.green) + T(104, 92, "misreads eligibility", 13, C.ink) +
          chip(104, 140, "Practice", { sz: 15, st: C.green, fg: C.green }) + chip(104, 180, "Feedback", { sz: 15, st: C.green, fg: C.green }) + chip(104, 220, "Reassess", { sz: 15, st: C.green, fg: C.green })) +
        H("og", R(208, 30, 176, 220, C.peach, 14, `stroke="${C.orange}" stroke-width="2.5"`) + T(296, 62, "Organisational gap", 15, C.orange) + T(296, 92, "knows rule, no permission", 13, C.ink) +
          chip(296, 140, "Fix authority", { sz: 15, st: C.orange, fg: C.orange }) + chip(296, 180, "Fix workflow", { sz: 15, st: C.orange, fg: C.orange }) + chip(296, 220, "Fix incentives", { sz: 15, st: C.orange, fg: C.orange }) +
          chip(200, 278, "Training can't delegate", { sz: 14, bg: C.red, st: C.red, fg: C.white })) +
        ringPanel(4, "Evidence of capability"),
      render: (c, j) => {
        c.op("cg", j === 0 || j === 1 ? (j === 1 ? 0.45 : 1) : 0); c.op("og", j === 1 ? 1 : 0); c.mv("og", j === 1 ? {} : { x: 30 });
        c.op("rp", j === 2 ? 1 : 0); ringLit(c, 4, j === 2 ? 0 : -1, true); for (let i = 0; i < 5; i++) c.op("lg" + i, j === 2 ? 1 : 0);
      }
    },
    // V13 · moments 38–40 · Celonis "pink dots" (bubble size = case count) — https://community.celonis.com/general-product-q-a-2/what-does-pink-dots-represent-in-process-explorer-when-we-press-icon-play-button-is-it-a-case-758
    // Adapted: different-sized bubbles move along routes at different rates; the bubble size encodes
    // the share of arrivals on each route.
    {
      src: "https://community.celonis.com/general-product-q-a-2/what-does-pink-dots-represent-in-process-explorer-when-we-press-icon-play-button-is-it-a-case-758",
      labels: ["5 · Own adoption", "65% kiosk, 29% desk", "Why the desk?"],
      draw: () =>
        H("ow", person(90, 200, 2.6, C.navy) + starI(90, 132, 13, C.gold) + chip(260, 90, "Corrected on paper", { sz: 15, st: C.slate, fg: C.slate }) + chip(260, 150, "Proven in practice?", { sz: 15, st: C.orange, fg: C.orange }) +
          chip(260, 210, "Owner measures use", { sz: 15, bg: C.green, st: C.green, fg: C.white })) +
        H("bb", P("M40 150 C140 150 160 76 260 76", C.green, 4, 'stroke-dasharray="3 7"') + P("M40 150 C140 150 160 224 260 224", C.orange, 4, 'stroke-dasharray="3 7"') +
          K("kb", O(310, 76, 52, C.green) + T(310, 82, "65%", 22, C.white)) + K("db", O(310, 224, 34, C.orange) + T(310, 230, "29%", 16, C.white)) + chip(80, 268, "Week eleven", { sz: 14 }) + chip(80, 40, "Observed", { sz: 14, st: C.slate, fg: C.slate })) +
        H("why", O(120, 150, 36, C.orange) + T(120, 156, "Desk", 15, C.white) + [["Legitimate exception", 60], ["Accessibility help", 120], ["Workflow barrier", 180], ["Avoidable workaround", 240]].map(([t, y], i) =>
          P(`M156 150 L230 ${y}`, C.muted, 2) + chip(306, y, t, { sz: 13, st: i === 3 ? C.orange : C.navy, fg: i === 3 ? C.orange : C.navy })).join("")),
      render: (c, j) => {
        c.op("ow", j === 0 ? 1 : 0); c.op("bb", j === 1 ? 1 : 0);
        c.mv("kb", j === 1 ? {} : { s: 0.1 }, { e: "back.out(1.6)" }); c.mv("db", j === 1 ? {} : { s: 0.1 }, { dl: 0.3, e: "back.out(1.6)" });
        c.op("why", j === 2 ? 1 : 0);
      }
    },
    // V14 · moments 41–43 · Supply Chain and Shipping (LottieFiles) — https://lottiefiles.com/free-animation/supply-chain-and-shipping-Gd8ZsVZpXq
    // Adapted: a shipment advances through network nodes; the owner visits every property, then the
    // nine referral signals, then the ring closes at five of five.
    {
      src: "https://lottiefiles.com/free-animation/supply-chain-and-shipping-Gd8ZsVZpXq",
      labels: ["A named owner", "Investigate the nine", "Repair five complete"],
      draw: () =>
        H("no", P("M60 110 H340", C.navy, 3, 'stroke-dasharray="6 6"') + [60, 153, 247, 340].map((x) => bldg(x, 120, 0.95, C.navy)).join("") + K("own", person(0, 0, 1.6, C.green) + starI(0, -38, 9, C.gold)) +
          [["Measure", 70], ["Classify", 200], ["Investigate", 330]].map(([t, x]) => chip(x, 236, t, { sz: 16, st: C.green, fg: C.green })).join("") + chip(200, 34, "Across four properties", { sz: 15, bg: C.navy, fg: C.white })) +
        H("nn", rep(22, (i) => hostP(28 + (i % 11) * 34.4, 140 + Math.floor(i / 11) * 54, 0.95, i >= 13 ? C.orange : C.green)) + magI(320, 60, 22, C.ink) + chip(140, 50, "9 always refer", { sz: 16, bg: C.orange, st: C.orange, fg: C.white }) +
          chip(200, 270, "Reasons not established", { sz: 15, st: C.slate, fg: C.slate })) +
        ringPanel(5, "Evidence in operation"),
      render: (c, j) => {
        c.op("no", j === 0 ? 1 : 0); c.mv("own", j === 0 ? { x: 340, y: 186 } : { x: 60, y: 186 }, { d: 2.2, e: "power1.inOut" });
        c.op("nn", j === 1 ? 1 : 0);
        c.op("rp", j === 2 ? 1 : 0); ringLit(c, 5, j === 2 ? 0 : -1, true); for (let i = 0; i < 5; i++) c.op("lg" + i, j === 2 ? 1 : 0);
      }
    },
    // V15 · moments 44–45 · GSAP SVG animation gallery (draw · morph · path) — https://gsap.com/svg/
    // Adapted: strokes draw and shapes morph into one connected figure; then the figure is stamped
    // as a proposal with four steps still to come.
    {
      src: "https://gsap.com/svg/",
      labels: ["One coherent design", "Proposed, not done"],
      draw: () =>
        `<g class="a-spin" style="animation-duration:40s">${ring(200, 150, 96, 30)}</g>` + hostP(200, 168, 2.2) +
        H("lb", [["Work", 200, 30], ["Permission", 344, 104], ["Contribution", 322, 254], ["Capability", 78, 254], ["Practice", 56, 104]].map(([t, x, y], i) => chip(x, y, t, { sz: 14, bg: RC[i], st: RC[i], fg: C.white })).join("")) +
        H("pr", R(20, 20, 360, 260, "rgba(244,241,234,.93)", 14) + stampI(200, 70, "Proposed corrections", C.orange, -5, 17) +
          [["Approve", 64], ["Assign owners", 150], ["Implement", 240], ["Examine evidence", 326]].map(([t, x], i) => K("ps" + i, O(x, 160, 22, C.navy) + T(x, 167, String(i + 1), 17, C.white) + chip(x, 210 + (i % 2) * 34, t, { sz: 13 }))).join("")),
      render: (c, j) => {
        for (let i = 0; i < 5; i++) c.dr("rg" + i, j >= 0 ? 1 : 0, { dl: j === 0 ? i * 0.25 : 0, d: 0.5 });
        c.op("lb", j === 0 ? 1 : 0, { dl: j === 0 ? 0.6 : 0 });
        c.op("pr", j === 1 ? 1 : 0);
        for (let i = 0; i < 4; i++) c.op("ps" + i, j === 1 ? 1 : 0, { dl: j === 1 ? 0.5 + i * 0.3 : 0 });
      }
    },
    // V16 · moments 46–48 · Animating SVG with GSAP 3 (CodePen) — https://codepen.io/designcourse/pen/yLOxoyP
    // Adapted: staged shape reveal, move and settle — the confirmed gap is picked first, the test
    // sequence follows, and the final question settles on screen.
    {
      src: "https://codepen.io/designcourse/pen/yLOxoyP",
      labels: ["Start with the confirmed gap", "Then test the correction", "Prove it works"],
      draw: () =>
        H("pk", [["AED 400 delegation", 60, C.amber, "Confirmed"], ["Unwilling staff?", 150, C.slate, "Assumption"], ["Nine referrals", 240, C.orange, "Causes open"]].map(([t, y, col, tag], i) =>
          K("pc" + i, R(30, y - 34, 250, 68, C.white, 12, `stroke="${col}" stroke-width="2.5"`) + T(155, y - 4, t, 17, col) + T(155, y + 20, tag, 13, C.slate))).join("") +
          K("pin", O(330, 60, 26, C.amber) + T(330, 68, "1st", 18, C.white)) + P("M60 150 H250", C.red, 3)) +
        H("ts", [["Confirmed weakness", C.amber], ["Approved correction", C.navy], ["Capability tested", C.teal], ["Behaviour observed", C.plum], ["Result reviewed", C.green]].map(([t, col], i) =>
          K("tt" + i, O(46, 40 + i * 54, 18, col) + T(46, 46 + i * 54, String(i + 1), 16, col === C.amber ? C.ink : C.white) + chip(186, 40 + i * 54, t, { sz: 15, w: 230, st: col, fg: col }))).join("")) +
        H("fq", R(30, 50, 340, 200, C.white, 16, `stroke="${C.navy}" stroke-width="2.5"`) + T(200, 96, "Which repair first?", 20, C.navy) + T(200, 132, "What evidence proves it?", 18, C.orange) +
          okDot(112, 198, 18) + T(214, 204, "Prove it works", 17, C.green) + guestP(320, 236, 1.2) + hostP(354, 236, 1.2)),
      render: (c, j) => {
        c.op("pk", j === 0 ? 1 : 0);
        for (let i = 0; i < 3; i++) c.mv("pc" + i, j === 0 && i === 0 ? { s: 1.04 } : {}, { e: "back.out(2)" });
        c.op("pin", j === 0 ? 1 : 0, { dl: j === 0 ? 0.6 : 0 });
        c.op("ts", j === 1 ? 1 : 0);
        for (let i = 0; i < 5; i++) { c.op("tt" + i, j === 1 ? 1 : 0, { dl: j === 1 ? i * 0.3 : 0 }); c.mv("tt" + i, j === 1 ? {} : { x: -20 }, { dl: j === 1 ? i * 0.3 : 0 }); }
        c.op("fq", j === 2 ? 1 : 0); c.mv("fq", j === 2 ? {} : { s: 0.9 });
      }
    }
  ];
  VL_SCENES["W10O2d"] = makeScene({ id, panels, bg: "#f4f1ea", desc: "The sponsor asks for a workable Guest Host role; the process has outpaced the people system; three confirmed contradictions and no capability assessment lead to five connected repairs — defined work, formal authority with an illustrative AED 320 and AED 460, aligned performance measures, tested capability and owned adoption — locked into one proposed design that starts with the confirmed AED 400 gap and must be proven in practice." });
  mirror("W10O2d"); SCENE_BG.push([id, "#f4f1ea"]);
}

// ============================================================
// W10O3d · "Turn the dashboard over"  (34 narration moments, 10 visuals)
// Story spine: a green People workstream → flip it over → observed evidence tiles (65/29, 9 of 22,
// AED 400 gap, inherited objectives, no assessment, late descriptions, permanent desk, two
// resignations) → no resistance story: facts vs hypotheses → more training is tempting but
// cannot fix authority or measures → coordinated repair, owner, decision records → readiness.
// ============================================================
{
  const id = "W10O3d";
  const BOARD = "#14263a";
  const tile = (x, y, w, h, col, title) => R(x, y, w, h, "#1d3550", 12, `stroke="${col}" stroke-width="2.5"`) + R(x + 12, y + 12, 4, 20, col, 2) + T(x + w / 2 + 4, y + 26, title, 15, C.white);
  const panels = [
    // V1 · moments 0–3 · SVGator animation templates (keyframed states) — https://www.svgator.com/animation-templates
    // Adapted: a template card cycles through keyframed states and finally flips to its reverse.
    {
      src: "https://www.svgator.com/animation-templates",
      labels: ["A green People workstream", "It looks ready", "What happens in use?", "Turn the dashboard over"],
      draw: () =>
        mgrP(46, 250, 1.9) +
        K("front", R(96, 26, 290, 230, C.white, 14, `stroke="${C.navy}" stroke-width="2.5"`) + R(96, 26, 290, 36, C.navy, 14) + R(96, 50, 290, 12, C.navy) + T(241, 51, "People workstream", 16, C.white) +
          [["New Guest Host role", 92], ["Induction delivered", 132], ["Kiosks live", 172]].map(([t, y], i) => K("fr" + i, okDot(124, y - 5, 12) + T(146, y, t, 16, C.ink, "", "start"))).join("") +
          R(170, 200, 142, 40, C.green, 20) + T(241, 226, "Complete", 18, C.white)) +
        H("glow", `<g class="a-pulse">${R(90, 20, 302, 242, "none", 18, `stroke="${C.green}" stroke-width="5"`)}</g>` + chip(96, 22, "Looks ready", { sz: 15, bg: C.green, st: C.green, fg: C.white })) +
        H("ask", bubble(100, 252, 172, 34, "What happens in use?", 14, C.orange, "bl") + magI(352, 210, 22, C.orange)) +
        K("back", R(96, 26, 290, 230, BOARD, 14) + T(241, 58, "Operating evidence", 17, C.gold) + rep(6, (i) => R(118 + (i % 3) * 88, 82 + Math.floor(i / 3) * 78, 70, 58, "#1d3550", 8, `stroke="${C.muted}" stroke-width="1.5" stroke-dasharray="5 4"`)), 'style="opacity:0"'),
      render: (c, j) => {
        const fl = j >= 3;
        for (let i = 0; i < 3; i++) c.op("fr" + i, j >= 0 ? 1 : 0, { dl: j === 0 ? 0.3 + i * 0.3 : 0 });
        c.mv("front", { sx: fl ? 0.02 : 1, pv: [241, 141] }, { d: 0.4 }); c.op("front", fl ? 0 : 1, { d: 0.2, dl: fl ? 0.35 : 0 });
        c.mv("back", { sx: fl ? 1 : 0.02, pv: [241, 141] }, { d: 0.45, dl: fl ? 0.4 : 0 }); c.op("back", fl ? 1 : 0, { d: 0.15, dl: fl ? 0.38 : 0 });
        c.op("glow", j === 1 ? 1 : 0); c.op("ask", j === 2 ? 1 : 0);
      }
    },
    // V2 · moments 4–7 · GSAP Demo Hub (individual demo elements revealed and transformed) — https://demos.gsap.com/explore/
    // Adapted: tiles on a dark board reveal one by one, each animating its own small chart.
    {
      src: "https://demos.gsap.com/explore/",
      labels: ["65% kiosk, 29% desk", "Use isn't quality", "Nine always refer", "Expected local decisions"],
      draw: () =>
        R(-400, -300, 1200, 900, BOARD) +
        H("t1", tile(16, 20, 180, 150, C.gold, "Arrival channels") + R(36, 60, 140, 20, "#2a4766", 6) + K("k1", R(36, 60, 140, 20, C.green, 6)) + T(36, 100, "Kiosk 65%", 15, C.mint, "", "start") +
          R(36, 114, 140, 20, "#2a4766", 6) + K("k2", R(36, 114, 140, 20, C.orange, 6)) + T(36, 154, "Desk 29%", 15, C.peach, "", "start")) +
        H("t1n", chip(106, 200, "Use ≠ quality", { sz: 16, bg: C.gold, st: C.gold, fg: C.ink }) + T(106, 236, "Not every desk visit", 13, C.white) + T(106, 254, "is a failure", 13, C.white)) +
        H("t2", tile(212, 20, 172, 236, C.gold, "Referral pattern") + rep(22, (i) => hostP(232 + (i % 6) * 26, 72 + Math.floor(i / 6) * 40, 0.62, i >= 13 ? C.orange : "#8fb5a2")) + T(298, 236, "9 of 22 refer", 15, C.peach)) +
        H("t2n", `<g class="a-pulse">${R(206, 14, 184, 248, "none", 14, `stroke="${C.orange}" stroke-width="4"`)}</g>` + chip(298, 284, "Role expects local", { sz: 13, bg: C.orange, st: C.orange, fg: C.white })),
      render: (c, j) => {
        c.op("t1", j >= 0 ? 1 : 0); c.mv("k1", { sx: j >= 0 ? 0.65 : 0.02, pv: [36, 0] }, { d: 1 }); c.mv("k2", { sx: j >= 0 ? 0.29 : 0.02, pv: [36, 0] }, { d: 1, dl: 0.2 });
        c.op("t1n", j >= 1 ? (j >= 2 ? 0.5 : 1) : 0);
        c.op("t2", j >= 2 ? 1 : 0); c.mv("t2", j >= 2 ? {} : { y: 20 });
        c.op("t2n", j === 3 ? 1 : 0);
      }
    },
    // V3 · moments 8–11 · Infographics Dashboard (LottieFiles) — https://lottiefiles.com/free-animation/infographics-dashboard-X6P5rVLZAB
    // Adapted: a pie arc grows and metric panels appear in turn on one dashboard.
    {
      src: "https://lottiefiles.com/free-animation/infographics-dashboard-X6P5rVLZAB",
      labels: ["AED 400 not delegated", "Old objectives remain", "Attended, not assessed", "Descriptions three weeks late"],
      draw: () =>
        R(-400, -300, 1200, 900, BOARD) +
        [["Waiver authority", 16, 16, C.amber], ["Objectives", 208, 16, C.plum], ["Capability", 16, 156, C.teal], ["Role descriptions", 208, 156, C.gold]].map(([t, x, y, col], i) => K("b" + i, tile(x, y, 176, 128, col, t), 'style="opacity:.25"')).join("") +
        H("c0", lockI(66, 92, 1.8, C.red) + T(140, 86, "AED 400", 16, C.white) + T(140, 108, "not in schedule", 13, C.peach)) +
        H("c1", P(gaugeArc(296, 116, 46, 1), "#2a4766", 12) + P(gaugeArc(296, 116, 46, 0.9), C.plum, 12) + T(296, 110, "Volume", 13, C.white) + T(296, 134, "and speed", 13, C.white)) +
        H("c2", O(66, 226, 30, C.green) + T(66, 232, "22", 16, C.white) + O(140, 226, 30, "none", `stroke="${C.red}" stroke-width="3" stroke-dasharray="6 5"`) + T(140, 232, "0", 16, C.peach) +
          T(66, 272, "attended", 13, C.mint) + T(140, 272, "assessed", 13, C.peach)) +
        H("c3", R(232, 196, 54, 50, C.white, 6) + R(232, 196, 54, 14, C.red, 6) + T(259, 236, "+3", 16, C.red) + T(334, 214, "weeks after", 14, C.white) + T(334, 234, "go-live", 14, C.white)),
      render: (c, j) => {
        for (let i = 0; i < 4; i++) { c.op("b" + i, j >= i ? 1 : 0.25); c.op("c" + i, j >= i ? 1 : 0, { dl: j === i ? 0.3 : 0 }); c.mv("c" + i, j >= i ? {} : { s: 0.7 }, { dl: j === i ? 0.3 : 0, e: "back.out(1.6)" }); }
      }
    },
    // V4 · moments 12–14 · Animated Sankey (Observable) — https://old.observablehq.com/@chekos/animated-sankey
    // Adapted: branches reveal and link emphasis changes — first a tempting single story is struck
    // out, then the referral node branches into four open explanations.
    {
      src: "https://old.observablehq.com/@chekos/animated-sankey",
      labels: ["Desk back, two resigned", "No resistance story", "Competing explanations"],
      draw: () =>
        H("ob", bldg(90, 150, 1.6, C.orange) + R(56, 190, 70, 14, "#8a6a3a", 4) + chip(90, 236, "Permanent desk", { sz: 15, st: C.orange, fg: C.orange }) +
          hostP(270, 140, 1.7, C.slate) + hostP(320, 140, 1.7, C.slate) + chip(296, 196, "2 resignations", { sz: 15, st: C.slate, fg: C.slate }) + chip(296, 236, "Reasons unknown", { sz: 14, st: C.slate, fg: C.slate }) +
          chip(200, 30, "Observations, not causes", { sz: 15, bg: C.navy, fg: C.white })) +
        H("rs", R(60, 70, 280, 90, C.white, 14, `stroke="${C.slate}" stroke-width="2.5"`) + T(200, 108, "\u201cStaff resist change\u201d", 19, C.slate) + T(200, 136, "an easy story", 14, C.slate) + P("M70 150 L330 80", C.red, 5) +
          chip(200, 230, "Evidence ≠ explanation", { sz: 17, bg: C.navy, fg: C.white })) +
        H("br", chip(70, 150, "9 refer all", { sz: 15, bg: C.orange, st: C.orange, fg: C.white }) +
          [["Authority gap", 52, C.amber], ["Capability doubt", 116, C.teal], ["Conflicting incentives", 180, C.plum], ["Other barrier", 244, C.slate]].map(([t, y, col], i) =>
            D("bl" + i, `M124 150 C180 150 180 ${y} 214 ${y}`, col, 6) + chip(306, y, t, { sz: 14, st: col, fg: col, w: 176 })).join("")),
      render: (c, j) => {
        c.op("ob", j === 0 ? 1 : 0); c.op("rs", j === 1 ? 1 : 0); c.op("br", j === 2 ? 1 : 0);
        for (let i = 0; i < 4; i++) c.dr("bl" + i, j === 2 ? 1 : 0, { dl: j === 2 ? i * 0.25 : 0 });
      }
    },
    // V5 · moments 15–17 · Awwwards — background SVG animation on scroll (Henning Tillmann) — https://www.awwwards.com/inspiration/background-svg-animation-on-scroll-henning-tillmann
    // Adapted: background shapes reposition with progress; a solid fact card and a dashed hypothesis
    // card separate, then causes are re-wired to their interventions.
    {
      src: "https://www.awwwards.com/inspiration/background-svg-animation-on-scroll-henning-tillmann",
      labels: ["Confirmed observation", "Plausible hypothesis", "Match cause to intervention"],
      draw: () =>
        H("fa", R(16, 40, 176, 190, C.white, 14, `stroke="${C.navy}" stroke-width="3"`) + T(104, 72, "Confirmed", 17, C.navy) + T(104, 96, "observation", 17, C.navy) +
          rep(9, (i) => hostP(40 + (i % 5) * 32, 140 + Math.floor(i / 5) * 40, 0.7, C.orange)) + T(104, 214, "9 refer every case", 14, C.ink)) +
        H("hy", R(208, 40, 176, 190, C.white, 14, `stroke="${C.amber}" stroke-width="3" stroke-dasharray="8 6"`) + T(296, 72, "Hypothesis", 17, C.amber) + T(296, 96, "not established", 14, C.slate) +
          lockI(296, 150, 1.8, C.amber) + T(296, 214, "Unsure of delegation", 14, C.ink)) +
        H("mt", [["Authority gap", "Approve delegation", 60, C.amber], ["Capability doubt", "Practise and assess", 150, C.teal], ["Old incentives", "Revise measures", 240, C.plum]].map(([a, b, y, col], i) =>
          chip(92, y, a, { sz: 14, st: col, fg: col, w: 150 }) + D("m" + i, `M168 ${y} H226`, col, 4) + chip(308, y, b, { sz: 14, bg: col, st: col, fg: C.white, w: 160 })).join("")),
      render: (c, j) => {
        c.op("fa", j === 0 || j === 1 ? 1 : 0); c.op("hy", j === 1 ? 1 : 0); c.mv("hy", j === 1 ? {} : { x: 30 });
        c.op("mt", j === 2 ? 1 : 0);
        for (let i = 0; i < 3; i++) c.dr("m" + i, j === 2 ? 1 : 0, { dl: j === 2 ? 0.3 + i * 0.3 : 0, d: 0.5 });
      }
    },
    // V6 · moments 18–20 · Awwwards — SVG lines scroll animation (FEED Agency) — https://www.awwwards.com/inspiration/svg-lines-scroll-animation-feed-agency
    // Adapted: lines trace progressively; the training line reaches three barriers and stops, then
    // repair lines reach the two confirmed gaps.
    {
      src: "https://www.awwwards.com/inspiration/svg-lines-scroll-animation-feed-agency",
      labels: ["Tempting: more training", "Training can't fix these", "Repair confirmed gaps"],
      draw: () =>
        H("tr", R(110, 40, 180, 150, C.white, 12, `stroke="${C.green}" stroke-width="2.5"`) + R(110, 40, 180, 30, C.green, 12) + R(110, 58, 180, 12, C.green) + T(200, 62, "Another induction", 15, C.white) +
          T(200, 110, "four hours", 18, C.ink) + T(200, 138, "for everyone", 15, C.slate) + okDot(250, 168, 13) + chip(200, 236, "Easy to mark complete", { sz: 15, st: C.green, fg: C.green })) +
        H("bl", R(14, 120, 110, 60, C.green, 10) + T(69, 156, "Training", 16, C.white) +
          [["Formal authority", 50, C.amber], ["Old measures", 150, C.plum], ["Permanent desk", 250, C.orange]].map(([t, y, col], i) =>
            D("tl" + i, `M124 150 C180 150 200 ${y} 250 ${y}`, C.green, 4) + R(254, y - 22, 136, 44, C.white, 10, `stroke="${col}" stroke-width="2.5"`) + T(322, y + 5, t, 14, col) + noDot(254, y - 22, 11)).join("")) +
        H("rp", [["Approve delegation", 70, C.amber], ["Review objectives", 150, C.plum]].map(([t, y, col]) => R(60, y - 30, 280, 60, C.white, 12, `stroke="${col}" stroke-width="3"`) + T(200, y + 6, t, 18, col) + okDot(330, y - 30, 14)).join("") +
          chip(200, 236, "Fix what's confirmed first", { sz: 16, bg: C.navy, fg: C.white })),
      render: (c, j) => {
        c.op("tr", j === 0 ? 1 : 0); c.op("bl", j === 1 ? 1 : 0);
        for (let i = 0; i < 3; i++) c.dr("tl" + i, j === 1 ? 0.92 : 0, { dl: j === 1 ? i * 0.25 : 0 });
        c.op("rp", j === 2 ? 1 : 0);
      }
    },
    // V7 · moments 21–24 · MotionPath plugin (GSAP docs) — https://gsap.com/docs/v3/Plugins/MotionPathPlugin/
    // Adapted: an object travels an SVG path, aligned to it, stopping at each station in turn.
    {
      src: "https://gsap.com/docs/v3/Plugins/MotionPathPlugin/",
      labels: ["A coordinated repair", "Assess and investigate", "Desks and properties", "Better evidence to decide"],
      draw: () => {
        const ST = [[60, 210, "Clarify role", 68], [125, 110, "Approve delegation", 125], [200, 200, "Align measures", 196], [275, 100, "Assess capability", 284], [340, 200, "Review adoption", 328]];
        let s = P("M60 210 C90 160 95 110 125 110 C165 110 170 200 200 200 C240 200 245 100 275 100 C310 100 320 200 340 200", "#dcd6cc", 8);
        s += D("pt", "M60 210 C90 160 95 110 125 110 C165 110 170 200 200 200 C240 200 245 100 275 100 C310 100 320 200 340 200", C.navy, 5);
        s += ST.map(([x, y, t, cx], i) => O(x, y, 16, C.navy) + T(x, y + 6, String(i + 1), 15, C.white) + chip(cx, y < 150 ? y - 36 : y + 36, t, { sz: 13 })).join("");
        s += K("tok", O(0, 0, 11, C.orange, `stroke="${C.white}" stroke-width="3"`), 'style="opacity:0"');
        s += H("inv", magI(296, 152, 18, C.orange) + chip(200, 34, "Nine: investigate", { sz: 14, st: C.orange, fg: C.orange }));
        s += H("pp", [60, 150, 250, 340].map((x) => bldg(x, 286, 0.6, C.navy)).join("") + chip(200, 34, "Desk reasons, four sites", { sz: 14, st: C.teal, fg: C.teal }));
        s += H("dec", chip(200, 34, "Training, workflow or other?", { sz: 14, bg: C.navy, fg: C.white }));
        return s;
      },
      render: (c, j) => {
        c.dr("pt", j >= 0 ? 1 : 0, { d: 1.8 });
        const TP = [[60, 210], [275, 100], [340, 200], [340, 200]];
        c.op("tok", j >= 0 ? 1 : 0); c.mv("tok", j >= 0 ? { x: TP[j][0], y: TP[j][1] } : { x: 60, y: 210 }, { d: 1.2 });
        c.vis({ inv: j === 1, pp: j === 2, dec: j === 3 });
      }
    },
    // V8 · moments 25–26 · Dashboard by Weblodge (business dashboard landing animation) — https://lottiefiles.com/free-animation/deliver-better-optimized-lottie-json-animation-Qgvgddnv8J
    // Adapted: the interface is introduced and the outcome panel is emphasised — an accountability
    // row, then a five-field decision record.
    {
      src: "https://lottiefiles.com/free-animation/deliver-better-optimized-lottie-json-animation-Qgvgddnv8J",
      labels: ["Who owns the improvement?", "A decision record"],
      draw: () =>
        H("ra", R(20, 50, 360, 150, C.white, 14, `stroke="${C.navy}" stroke-width="2.5"`) + T(200, 82, "Resolve readiness gaps", 17, C.navy) +
          R(46, 106, 40, 32, C.navy, 6) + T(66, 128, "R", 18, C.white) + T(96, 128, "Operational team", 15, C.ink, "", "start") +
          R(46, 150, 40, 32, C.orange, 6) + T(66, 172, "A", 18, C.white) + T(96, 172, "Process owner", 15, C.ink, "", "start") + mgrP(320, 180, 1.6) + starI(320, 136, 9, C.gold) +
          chip(200, 248, "Concerns need an owner", { sz: 15, st: C.orange, fg: C.orange })) +
        H("dr", R(40, 16, 320, 270, C.white, 14, `stroke="${C.navy}" stroke-width="2.5"`) + T(200, 46, "Decision record", 18, C.navy) +
          [["Observed issue", C.navy], ["Evidence", C.teal], ["Corrective action", C.green], ["Accountable owner", C.orange], ["Follow-up measure", C.plum]].map(([t, col], i) =>
            K("f" + i, R(60, 62 + i * 42, 6, 30, col, 3) + T(76, 82 + i * 42, t, 15, col, "", "start") + R(232, 66 + i * 42, 108, 22, "#eef2f6", 5))).join("")),
      render: (c, j) => {
        c.op("ra", j === 0 ? 1 : 0); c.op("dr", j === 1 ? 1 : 0);
        for (let i = 0; i < 5; i++) c.op("f" + i, j === 1 ? 1 : 0, { dl: j === 1 ? 0.2 + i * 0.25 : 0 });
      }
    },
    // V9 · moments 27–30 · Timeline by The Creators (Motion Array) — https://motionarray.com/after-effects-templates/timeline/
    // Adapted: milestones reveal along a timeline and the active one is enlarged with its media card.
    {
      src: "https://motionarray.com/after-effects-templates/timeline/",
      labels: ["Waiver: repair it", "Referrals: investigate", "Desk: which need?", "Departures: continuity"],
      draw: () => {
        const RECS = [["Waiver gap", "Evidence: clear", "Approve delegation", C.amber], ["Nine referrals", "Causes: open", "Investigate, assess", C.orange], ["Permanent desk", "Need: unclear", "Classify its use", C.teal], ["Two departures", "Motives: unknown", "Protect knowledge", C.slate]];
        let s = P("M30 262 H370", C.navy, 4) + RECS.map((r, i) => K("dot" + i, O(60 + i * 93, 262, 10, r[3]))).join("");
        s += RECS.map(([a, b, c2, col], i) => H("rc" + i, R(60, 24, 280, 196, C.white, 14, `stroke="${col}" stroke-width="3"`) + R(60, 24, 280, 40, col, 14) + R(60, 50, 280, 14, col) +
          T(200, 52, a, 19, C.white) + T(200, 104, b, 17, C.ink) + arrowV(200, 120, 146, col, 3) + chip(200, 180, c2, { sz: 17, bg: col, st: col, fg: C.white }) + P(`M${60 + i * 93} 252 L200 222`, col, 2, 'stroke-dasharray="3 4"'))).join("");
        return s;
      },
      render: (c, j) => {
        for (let i = 0; i < 4; i++) { c.op("rc" + i, j === i ? 1 : 0); c.mv("rc" + i, j === i ? {} : { s: 0.9, y: 20 }); c.mv("dot" + i, j === i ? { s: 1.6 } : {}); }
      }
    },
    // V10 · moments 31–33 · Awwwards — scroll animation (Mubasic) — https://www.awwwards.com/inspiration/scroll-animation
    // Adapted: shapes reveal in stages — a split between activity and consequence, a readiness ring
    // that closes, and a two-column first decision.
    {
      src: "https://www.awwwards.com/inspiration/scroll-animation",
      labels: ["Dashboard versus process", "When it's ready", "Your first decision"],
      draw: () =>
        H("vs", R(16, 40, 170, 190, C.white, 12, `stroke="${C.slate}" stroke-width="2"`) + T(101, 70, "Dashboard", 17, C.slate) + rep(3, (i) => okDot(46, 104 + i * 36, 10) + R(64, 98 + i * 36, 100, 10, "#e3e8ee", 4)) +
          T(101, 214, "reports activities", 14, C.slate) + R(214, 40, 170, 190, C.white, 12, `stroke="${C.navy}" stroke-width="2.5"`) + T(299, 70, "The process", 17, C.navy) +
          guestP(250, 150, 1.3) + hostP(300, 150, 1.4) + D("pr", "M330 140 H364", C.green, 4) + T(299, 214, "shows consequences", 14, C.navy) + chip(200, 268, "Manage the process", { sz: 16, bg: C.navy, fg: C.white })) +
        H("rd", [["Responsibilities", C.navy], ["Authority", C.amber], ["Capability", C.teal], ["Measures", C.plum]].map(([t, col], i) => {
          const a0 = (-90 + i * 90 + 3) * Math.PI / 180, a1 = (-90 + (i + 1) * 90 - 3) * Math.PI / 180, r = 78;
          return D("q" + i, `M${(200 + r * Math.cos(a0)).toFixed(1)} ${(150 + r * Math.sin(a0)).toFixed(1)} A${r} ${r} 0 0 1 ${(200 + r * Math.cos(a1)).toFixed(1)} ${(150 + r * Math.sin(a1)).toFixed(1)}`, col, 22, 'stroke-linecap="butt"') +
            chip([316, 316, 84, 84][i], [70, 230, 230, 70][i], t, { sz: 14, st: col, fg: col }); }).join("") + hostP(200, 164, 1.8) + chip(200, 284, "Supports the process", { sz: 14, bg: C.green, st: C.green, fg: C.white })) +
        H("fd", R(16, 24, 176, 230, C.mint, 14, `stroke="${C.green}" stroke-width="2.5"`) + T(104, 54, "Repair now", 18, C.green) + chip(104, 98, "AED 400 delegation", { sz: 13, st: C.green, fg: C.green }) + chip(104, 140, "Old objectives", { sz: 13, st: C.green, fg: C.green }) +
          R(208, 24, 176, 230, C.lilac, 14, `stroke="${C.plum}" stroke-width="2.5"`) + T(296, 54, "Investigate first", 18, C.plum) + chip(296, 98, "Nine referrals", { sz: 13, st: C.plum, fg: C.plum }) +
          chip(296, 140, "Permanent desk", { sz: 13, st: C.plum, fg: C.plum }) + chip(296, 182, "Two departures", { sz: 13, st: C.plum, fg: C.plum }) + chip(200, 280, "Then choose interventions", { sz: 14, bg: C.navy, fg: C.white })),
      render: (c, j) => {
        c.op("vs", j === 0 ? 1 : 0); c.dr("pr", j === 0 ? 1 : 0, { dl: 0.5 });
        c.op("rd", j === 1 ? 1 : 0); for (let i = 0; i < 4; i++) c.dr("q" + i, j === 1 ? 1 : 0, { dl: j === 1 ? i * 0.3 : 0, d: 0.5 });
        c.op("fd", j === 2 ? 1 : 0);
      }
    }
  ];
  VL_SCENES["W10O3d"] = makeScene({ id, panels, bg: "#f3f1ec", desc: "A green People workstream dashboard flips over to reveal operating evidence: 65 percent kiosk and 29 percent desk, nine of twenty-two always referring, the missing AED 400 delegation, inherited objectives, no capability assessment, late role descriptions, a permanent desk and two resignations with unknown reasons; facts are separated from hypotheses, more training is shown unable to fix authority or measures, and confirmed gaps are repaired with owners and decision records." });
  mirror("W10O3d"); SCENE_BG.push([id, "#f3f1ec"]);
}

// ============================================================
// W10O3e · "The handover that changes tomorrow"  (27 narration moments, 10 visuals)
// Story spine: back to the waiting traveller → four handover outputs that only work together →
// a named owner → the approved rule built into the Develop workflow → open issues stay visible
// in a handover record → the framework continues → the next traveller (a proposed future
// scenario) is served or properly escalated → three learning outcomes → ready for Develop.
// ============================================================
{
  const id = "W10O3e";
  const OC = [C.navy, C.amber, C.teal, C.plum];
  const ON = ["Role definition", "Decision rights", "Capability evidence", "Aligned measures"];
  const FLOOR = () => R(-400, 240, 1200, 400, "#e3dccf");
  const panels = [
    // V1 · moments 0–1 · Motion Design Process (Behance) — https://www.behance.net/gallery/53752435/Motion-Design-Process
    // Adapted: a production pipeline opens on its starting brief — here the waiting traveller —
    // then strikes out the deliverables that do not count.
    {
      src: "https://www.behance.net/gallery/53752435/Motion-Design-Process",
      labels: ["Before the next guest", "Readiness, not paperwork"],
      draw: () =>
        H("lob", FLOOR() + kioskI(300, 210, 1.5, C.orange) + T(300, 136, "≠", 30, C.white) + guestP(160, 224, 2) + hostP(226, 224, 2) + clock(84, 110, 26, C.red) +
          chip(110, 40, "Before the next guest", { sz: 15, bg: C.navy, fg: C.white })) +
        H("pp", R(30, 50, 150, 110, C.green, 14) + T(105, 98, "New title", 18, C.white) + R(220, 40, 150, 130, C.white, 10, `stroke="${C.slate}" stroke-width="2"`) + T(295, 66, "Training register", 13, C.slate) +
          rep(4, (i) => tick(250 + (i % 2) * 60, 96 + Math.floor(i / 2) * 34, 0.8, C.green, 3)) + P("M24 44 L186 166 M214 34 L376 176", C.red, 4) +
          chip(200, 230, "Operating readiness", { sz: 18, bg: C.green, st: C.green, fg: C.white })),
      render: (c, j) => { c.op("lob", j === 0 ? 1 : 0); c.op("pp", j === 1 ? 1 : 0); }
    },
    // V2 · moments 2–5 · Automated Workflows (LottieFiles) — https://lottiefiles.com/free-animation/automated-workflows-XR2hxXOdEK
    // Adapted: repeated actions trigger one after another and each completes with a tick.
    {
      src: "https://lottiefiles.com/free-animation/automated-workflows-XR2hxXOdEK",
      labels: ["Output 1: role", "Output 2: authority", "Output 3: capability", "Output 4: measures"],
      draw: () => {
        const IC = [(x, y) => docI(x - 18, y - 22, 36, 44, C.white, 3, C.sky), (x, y) => keyI(x + 4, y, 1.1, C.white), (x, y) => magI(x - 2, y - 2, 13, C.white), (x, y) => P(gaugeArc(x, y + 8, 16, 1), C.white, 5) + P(`M${x} ${y + 8} L${x + 10} ${y - 4}`, C.white, 3)];
        const SUB = ["Responsibilities, boundaries", "Approved AED 400 rule", "Realistic decisions", "Recognise the new work"];
        return ON.map((t, i) => { const x = 50 + i * 100; return K("o" + i, R(x - 42, 40, 84, 84, OC[i], 14) + IC[i](x, 82) + T(x, 150, t.split(" ")[0], 14, OC[i]) + T(x, 168, t.split(" ")[1], 14, OC[i]), 'style="opacity:.2"') + H("ok" + i, okDot(x + 34, 42, 12)); }).join("") +
          SUB.map((t, i) => H("sb" + i, chip(200, 230, t, { sz: 16, st: OC[i], fg: OC[i] }))).join("");
      },
      render: (c, j) => {
        for (let i = 0; i < 4; i++) { c.op("o" + i, j >= i ? 1 : 0.2); c.mv("o" + i, j === i ? { s: 1.1, y: -4 } : {}); c.op("ok" + i, j >= i ? 1 : 0, { dl: j === i ? 0.5 : 0 }); c.op("sb" + i, j === i ? 1 : 0); }
      }
    },
    // V3 · moments 6–7 · Creative Design Workflow Animation (Dribbble) — https://dribbble.com/shots/27476599-Creative-Design-Workflow-Animation
    // Adapted: rough pieces assemble and refine into one finished layout; the finished piece is then
    // handed to an owner who keeps it running.
    {
      src: "https://dribbble.com/shots/27476599-Creative-Design-Workflow-Animation",
      labels: ["Four outputs, one system", "Ownership continues"],
      draw: () =>
        H("ch", ON.map((t, i) => { const x = 54 + i * 98; return R(x - 40, 60, 80, 60, OC[i], 12) + T(x, 86, t.split(" ")[0], 13, C.white) + T(x, 104, t.split(" ")[1], 13, C.white) + (i < 3 ? D("lk" + i, `M${x + 40} 90 H${x + 58}`, C.ink, 5) : ""); }).join("") +
          [["No authority", "uncertainty"], ["No capability", "risk"], ["No measures", "inconsistency"]].map(([a, b], i) => chip(200, 160 + i * 36, a + " → " + b, { sz: 13, st: C.red, fg: C.red })).join("") +
          chip(200, 270, "Reinforce one another", { sz: 15, bg: C.navy, fg: C.white })) +
        H("ow", person(90, 200, 2.6, C.navy) + starI(90, 132, 13, C.gold) + R(170, 60, 210, 150, C.white, 12, `stroke="${C.green}" stroke-width="2.5"`) + T(275, 88, "Adoption after launch", 14, C.green) +
          P("M190 180 L230 160 L270 168 L310 130 L350 120", C.green, 4) + rep(5, (i) => O(190 + i * 40, [180, 160, 168, 130, 120][i], 4, C.green)) + chip(275, 250, "Named owner", { sz: 16, bg: C.green, st: C.green, fg: C.white })),
      render: (c, j) => {
        c.op("ch", j === 0 ? 1 : 0); for (let i = 0; i < 3; i++) c.dr("lk" + i, j === 0 ? 1 : 0, { dl: j === 0 ? 0.3 + i * 0.25 : 0, d: 0.4 });
        c.op("ow", j === 1 ? 1 : 0);
      }
    },
    // V4 · moments 8–10 · 3D Isometric Factory Process (LottieFiles) — https://lottiefiles.com/free-animation/3d-isometric-factory-process-TJAlBgYcXw
    // Adapted: robotic stations act in sequence on a product moving down the line; here the People
    // outputs enter Develop and the workflow applies the approved checks in order.
    {
      src: "https://lottiefiles.com/free-animation/3d-isometric-factory-process-TJAlBgYcXw",
      labels: ["Into Develop", "The rule in the workflow", "The system supports decisions"],
      draw: () =>
        H("hd", R(10, 180, 300, 16, C.slate, 8) + rep(4, (i) => K("pk" + i, R(-22, -18, 44, 36, OC[i], 6) + T(0, 6, String(i + 1), 16, C.white))) +
          `<g class="a-spin">${gear(330, 150, 48, C.navy, C.sky)}</g>` + chip(326, 226, "Develop phase", { sz: 15, bg: C.navy, fg: C.white }) + chip(120, 40, "People outputs", { sz: 16, st: C.navy })) +
        H("wf", R(120, 24, 260, 210, C.ink, 14) + R(132, 36, 236, 186, C.white, 8) + T(250, 62, "Arrival workflow", 16, C.navy) + R(146, 80, 208, 40, C.mint, 6, `stroke="${C.green}" stroke-width="2"`) + T(250, 106, "Approved waiver rule", 14, C.green) +
          okDot(250, 160, 18) + envI(18, 50, 84, 56, C.slate) + P("M12 44 L108 112", C.red, 4) + T(60, 136, "Informal email", 13, C.slate) +
          R(22, 170, 80, 70, C.slate, 8) + P("M30 186 H94 M30 206 H94 M30 226 H80", C.white, 2) + P("M14 166 L110 246", C.red, 4) + T(62, 266, "Old hierarchy", 13, C.slate)) +
        H("ss", [["Evidence captured", C.navy], ["Eligibility checked", C.green], ["Authority verified", C.amber], ["Decision recorded", C.teal], ["Exception escalated", C.plum]].map(([t, col], i) =>
          K("s" + i, O(48, 34 + i * 54, 17, col) + T(48, 40 + i * 54, String(i + 1), 15, C.white) + chip(186, 34 + i * 54, t, { sz: 15, w: 226, st: col, fg: col }))).join("") + kioskI(352, 200, 1.1, C.mint)),
      render: (c, j) => {
        c.op("hd", j === 0 ? 1 : 0);
        for (let i = 0; i < 4; i++) c.mv("pk" + i, j === 0 ? { x: 250 - i * 56, y: 158 } : { x: 30 - i * 56, y: 158 }, { d: 1.6, dl: i * 0.1, e: "power1.inOut" });
        c.op("wf", j === 1 ? 1 : 0); c.op("ss", j === 2 ? 1 : 0);
        for (let i = 0; i < 5; i++) c.op("s" + i, j === 2 ? 1 : 0, { dl: j === 2 ? i * 0.3 : 0 });
      }
    },
    // V5 · moments 11–12 · Corporate Timeline by HenlyFx (Motion Array) — https://motionarray.com/after-effects-templates/corporate-timeline-1939632/
    // Adapted: events are revealed one by one with text transitions; the open issue stays pinned
    // as the record moves towards Develop.
    {
      src: "https://motionarray.com/after-effects-templates/corporate-timeline-1939632/",
      labels: ["Keep gaps visible", "The handover record"],
      draw: () =>
        H("gap", R(60, 40, 280, 180, C.white, 12, `stroke="${C.navy}" stroke-width="2.5"`) + T(200, 72, "Handover package", 17, C.navy) + rep(3, (i) => okDot(90, 104 + i * 32, 10) + R(108, 98 + i * 32, 180, 10, "#e3e8ee", 4)) +
          `<g class="a-blink">${R(250, 200, 128, 60, C.red, 8)}</g>` + T(314, 226, "Capability", 14, C.white) + T(314, 246, "not assessed", 14, C.white) + P("M300 200 V180", C.red, 3) + O(300, 178, 5, C.red) +
          chip(120, 262, "No silent closure", { sz: 15, st: C.red, fg: C.red })) +
        H("rec", [["Approved decisions", C.green], ["Open issues", C.red], ["Named owners", C.navy], ["Closure evidence", C.teal]].map(([t, col], i) =>
          K("r" + i, R(24, 30 + i * 52, 230, 40, C.white, 8, `stroke="${col}" stroke-width="2.5"`) + R(24, 30 + i * 52, 10, 40, col, 4) + T(144, 56 + i * 52, t, 15, col))).join("") +
          D("rl", "M258 128 H300", C.ink, 4) + F("M306 128 l-10 -7 v14 Z", C.ink) + `<g class="a-spin">${gear(346, 128, 34, C.navy, C.sky)}</g>` + T(346, 186, "Develop", 15, C.navy)),
      render: (c, j) => {
        c.op("gap", j === 0 ? 1 : 0); c.op("rec", j === 1 ? 1 : 0); c.dr("rl", j === 1 ? 1 : 0, { dl: 1.1 });
        for (let i = 0; i < 4; i++) c.op("r" + i, j === 1 ? 1 : 0, { dl: j === 1 ? i * 0.25 : 0 });
      }
    },
    // V6 · moments 13–15 · Scrolling Timeline (Motion Array) — https://motionarray.com/after-effects-templates/scrolling-timeline-1223172/
    // Adapted: a variable-scale timeline scrolls horizontally and settles on each event in turn.
    {
      src: "https://motionarray.com/after-effects-templates/scrolling-timeline-1223172/",
      labels: ["Owner stays involved", "Value and sustainability", "Continuous threads"],
      draw: () =>
        P("M20 150 H380", C.navy, 5) + [["People", 6, C.orange, 50], ["Develop", 7, C.navy, 125], ["Implement", 8, C.navy, 200], ["Realize Value", 9, C.green, 275], ["Sustainable", 10, C.teal, 340]].map(([t, n, col, x], i) =>
          K("st" + i, O(x, 150, 22, col) + T(x, 157, String(n), 17, C.white) + chip(x, i % 2 ? 106 : 194, t, { sz: 13, st: col, fg: col }))).join("") +
        K("po", person(0, 0, 1.6, C.plum) + starI(0, -40, 9, C.gold), 'style="opacity:0"') + H("pol", chip(200, 40, "Process owner stays", { sz: 15, st: C.plum, fg: C.plum })) +
        H("th", [["Project management", 236, C.navy], ["Change management", 260, C.teal], ["Leadership", 284, C.plum]].map(([t, y, col]) => P(`M10 ${y} H230`, col, 5, 'class="a-flow"') + T(238, y + 5, t, 13, col, "", "start")).join("")),
      render: (c, j) => {
        for (let i = 0; i < 5; i++) c.op("st" + i, j === 2 ? 0.5 : (j === 0 ? (i <= 2 ? 1 : 0.35) : (i >= 3 ? 1 : 0.35)));
        c.op("po", j >= 0 && j < 2 ? 1 : 0); c.mv("po", j <= 0 ? { x: 125, y: 262 } : { x: 300, y: 262 }, { d: 1.6 });
        c.op("pol", j === 0 ? 1 : 0); c.op("th", j === 2 ? 1 : 0);
      }
    },
    // V7 · moments 16–18 · Supply Chain and logistics (LottieFiles) — https://lottiefiles.com/free-animation/supply-chain-and-logistics-8PtoYRCbiu
    // Adapted: dispatch, transit and receipt connect; here arrival, three checks and completion.
    {
      src: "https://lottiefiles.com/free-animation/supply-chain-and-logistics-8PtoYRCbiu",
      labels: ["The next traveller", "Check, confirm, verify", "No unnecessary wait"],
      draw: () =>
        FLOOR() + K("gst", guestP(0, 0, 1.9), 'style="opacity:0"') + hostP(200, 226, 2.1) +
        H("fut", chip(200, 34, "Proposed future scenario", { sz: 14, st: C.slate, fg: C.slate }) + O(78, 120, 30, C.green) + T(78, 126, "AED 320", 13, C.white) + T(78, 168, "eligible", 14, C.green)) +
        H("ch", [["Booking checked", 70], ["Eligibility confirmed", 116], ["Authority verified", 162]].map(([t, y], i) => K("c" + i, okDot(196, y, 12) + chip(300, y, t, { sz: 13 }))).join("")) +
        H("dn", bubble(232, 70, 150, 34, "Here's why", 15, C.green, "bl") + docI(258, 128, 70, 64, C.teal, 3) + T(293, 214, "Recorded", 14, C.teal) + chip(110, 40, "No needless wait", { sz: 16, bg: C.green, st: C.green, fg: C.white })),
      render: (c, j) => {
        c.op("gst", j >= 0 ? 1 : 0); c.mv("gst", j < 2 ? { x: 110, y: 226 } : { x: -90, y: 226 }, { d: 1.6, dl: j === 2 ? 0.8 : 0 });
        c.op("fut", j === 0 ? 1 : 0); c.op("ch", j === 1 ? 1 : 0);
        for (let i = 0; i < 3; i++) c.op("c" + i, j === 1 ? 1 : 0, { dl: j === 1 ? i * 0.4 : 0 });
        c.op("dn", j === 2 ? 1 : 0);
      }
    },
    // V8 · moments 19–21 · DashBoard by Amit Prajapati (LottieFiles) — https://lottiefiles.com/free-animation/dashboard-krY5yHjJRp
    // Adapted: a dashboard screen comes into focus; first two routes on it, then the monitor view.
    {
      src: "https://lottiefiles.com/free-animation/dashboard-krY5yHjJRp",
      labels: ["Escalate when required", "Empowerment, properly", "Monitor real arrivals"],
      draw: () =>
        H("esc", O(70, 150, 48, C.orange) + T(70, 146, "AED 460", 15, C.white) + T(70, 166, "or ineligible", 13, C.white) + D("ep", "M120 150 C180 150 200 80 270 80", C.plum, 5) + mgrP(310, 96, 1.8) +
          chip(310, 152, "Approved route", { sz: 15, st: C.plum, fg: C.plum }) + chip(200, 250, "Escalate, don't decide", { sz: 15, bg: C.plum, st: C.plum, fg: C.white })) +
        H("emp", hostP(200, 170, 2.4) + arrowH(170, 120, 60, C.green, 5) + arrowH(230, 120, 340, C.plum, 5) + chip(90, 80, "Act when authorised", { sz: 13, st: C.green, fg: C.green }) +
          chip(310, 80, "Know when not", { sz: 13, st: C.plum, fg: C.plum }) + chip(200, 260, "Successful empowerment", { sz: 16, bg: C.green, st: C.green, fg: C.white })) +
        H("mon", R(110, 24, 270, 200, C.ink, 14) + R(122, 36, 246, 176, C.white, 8) + [["Real arrivals", C.green], ["Decision quality", C.navy], ["Recurring barriers", C.orange]].map(([t, col], i) =>
          T(140, 72 + i * 52, t, 14, col, "", "start") + R(140, 80 + i * 52, 210, 10, "#e3e8ee", 5) + K("mb" + i, R(140, 80 + i * 52, 210, 10, col, 5))).join("") + mgrP(56, 236, 2) + chip(200, 266, "Sponsor keeps watching", { sz: 15 })),
      render: (c, j) => {
        c.op("esc", j === 0 ? 1 : 0); c.dr("ep", j === 0 ? 1 : 0, { dl: 0.3 });
        c.op("emp", j === 1 ? 1 : 0); c.op("mon", j === 2 ? 1 : 0);
        for (let i = 0; i < 3; i++) c.mv("mb" + i, { sx: j === 2 ? [0.7, 0.55, 0.35][i] : 0.02, pv: [140, 0] }, { d: 1, dl: i * 0.2 });
      }
    },
    // V9 · moments 22–24 · Corporate Timeline by Zargones (Motion Array) — https://motionarray.com/after-effects-templates/corporate-timeline-255459/
    // Adapted: events and media placeholders are introduced while the focus shifts between them.
    {
      src: "https://motionarray.com/after-effects-templates/corporate-timeline-255459/",
      labels: ["Qasr's lesson", "Confidently, correctly, consistently", "Three learning outcomes"],
      draw: () =>
        H("ls", [["65% kiosk", 80, 70], ["9 always refer", 300, 70], ["22 attended", 80, 150], ["0 assessed", 300, 150]].map(([t, x, y]) => chip(x, y, t, { sz: 16, st: C.slate, fg: C.slate })).join("") +
          `<g class="a-spin" style="animation-duration:18s">${gear(200, 110, 34, C.green, C.mint)}</g>` + chip(200, 238, "Technology alone incomplete", { sz: 15, bg: C.navy, fg: C.white })) +
        H("cc", [["Confidently", C.amber], ["Correctly", C.green], ["Consistently", C.navy]].map(([t, col], i) => K("w" + i, R(30, 30 + i * 74, 340, 60, C.white, 12, `stroke="${col}" stroke-width="3"`) + T(200, 68 + i * 74, t, 24, col))).join("")) +
        H("lo", [["O1", "People-phase", "contribution", C.navy], ["O2", "Roles and", "measures", C.amber], ["O3", "Coordinated", "adoption", C.green]].map(([a, b, c2, col], i) =>
          K("l" + i, R(16 + i * 128, 50, 112, 180, C.white, 14, `stroke="${col}" stroke-width="3"`) + O(72 + i * 128, 94, 26, col) + T(72 + i * 128, 102, a, 18, C.white) + T(72 + i * 128, 156, b, 14, col) + T(72 + i * 128, 176, c2, 14, col))).join("")),
      render: (c, j) => {
        c.op("ls", j === 0 ? 1 : 0); c.op("cc", j === 1 ? 1 : 0); c.op("lo", j === 2 ? 1 : 0);
        for (let i = 0; i < 3; i++) { c.op("w" + i, j === 1 ? 1 : 0, { dl: j === 1 ? i * 0.4 : 0 }); c.op("l" + i, j === 2 ? 1 : 0, { dl: j === 2 ? i * 0.35 : 0 }); }
      }
    },
    // V10 · moments 25–26 · Corporate Timeline by MotionTores (Motion Array) — https://motionarray.com/after-effects-templates/corporate-timeline-77666/
    // Adapted: a path draws to the next milestone with typography fades; the story closes where it began.
    {
      src: "https://motionarray.com/after-effects-templates/corporate-timeline-77666/",
      labels: ["Ready for Develop", "Back to the traveller"],
      draw: () =>
        H("rd", ON.map((t, i) => R(20, 34 + i * 54, 150, 44, OC[i], 10) + T(95, 62 + i * 54, t, 13, C.white)).join("") + D("dp", "M176 140 C230 140 240 140 280 140", C.ink, 5) + F("M288 140 l-12 -8 v16 Z", C.ink) +
          `<g class="a-spin">${gear(336, 140, 46, C.navy, C.sky)}</g>` + chip(310, 236, "Ready for Develop", { sz: 14, bg: C.navy, fg: C.white })) +
        H("bk", FLOOR() + kioskI(330, 206, 1.4, C.mint) + guestP(110, 226, 2) + hostP(196, 226, 2.2) +
          [["Responsibility", 44], ["Authority", 80], ["Capability", 116], ["Support", 152]].map(([t, y], i) => chip(250, y, t, { sz: 13, st: OC[i], fg: OC[i] })).join("") + D("tie", "M210 170 C228 150 232 120 250 90", C.green, 3) +
          chip(96, 40, "Ready next time?", { sz: 15, st: C.orange, fg: C.orange })),
      render: (c, j) => {
        c.op("rd", j === 0 ? 1 : 0); c.dr("dp", j === 0 ? 1 : 0, { dl: 0.3 });
        c.op("bk", j === 1 ? 1 : 0); c.dr("tie", j === 1 ? 1 : 0, { dl: 0.6 });
      }
    }
  ];
  VL_SCENES["W10O3e"] = makeScene({ id, panels, bg: "#f5f1ea", desc: "Back at the kiosk, a title and a training register are not readiness; four handover outputs — role definition, decision rights, capability evidence and aligned measures — reinforce each other under a named owner; the approved rule enters the Develop workflow with open issues kept visible; the framework continues; the next traveller is served or properly escalated, closing the three learning outcomes." });
  mirror("W10O3e"); SCENE_BG.push([id, "#f5f1ea"]);
}

addStyles(SCENE_BG);
})();
