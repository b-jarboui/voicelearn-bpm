// OPER621 · Week 4 · BPM and Organisational Change — animated teaching scenes (v2)
// File: w04-claude-v2-part1.js  ·  Scenes: O1a, O1b, O2a
// Standalone part: registers its own scenes and appends its own scoped rules into the
// single shared <style id="vl-sc-w04">. Parts may be loaded in any order or concatenated.
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
// Design rule for v2: every narration moment k maps to exactly one visual (8-11 visuals per
// section, a new one every 2-4 sentences); each visual names the benchmark template whose
// motion grammar it adapts (URL in a comment). Artwork and code are original.
(() => {
"use strict";
window.VL_SCENES = window.VL_SCENES || {};
const VS = window.VL_SCENES;
const PART = "part1";

// ---------- palette ----------
const C = {
  navy: "#173f6b", ink: "#14263b", blue: "#2c6ea6", sky: "#e4eef7", teal: "#12858c",
  green: "#2f7d55", mint: "#e2f2e8", amber: "#a86f0a", gold: "#efc25a", coral: "#cf4b3a",
  rose: "#fbe3dd", plum: "#664a8f", lilac: "#ece6f5", slate: "#5b6f85", mist: "#cfd9e4",
  paper: "#fffdf8", white: "#ffffff", sand: "#f3ead9", red: "#b3302f", wood: "#9a7349", night: "#10263d"
};

// ---------- small utilities ----------
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const num = (v, f) => { const x = Number(v); return Number.isFinite(x) ? x : f; };
const reduced = () => {
  try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
  catch (_) { return false; }
};
const gsapOK = () => !!(window.gsap && typeof window.gsap.to === "function" && typeof window.gsap.set === "function") && !reduced();
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");
const inR = (k, a, b) => k >= a && k <= b;
const r1 = (v) => Math.round(v * 10) / 10;
const lerp = (a, b, t) => a + (b - a) * t;
const warn = (m) => { try { if (window.console) window.console.warn("[VL W04 " + PART + "] " + m); } catch (_) {} };

// ---------- SVG string builders ----------
const R = (x, y, w, h, f, rx = 0, ex = "") => `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${r1(rx)}" fill="${f}" ${ex}/>`;
const O = (cx, cy, r, f, ex = "") => `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}" fill="${f}" ${ex}/>`;
const E = (cx, cy, rx, ry, f, ex = "") => `<ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="${f}" ${ex}/>`;
const P = (d, s, w = 2, ex = "") => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const F = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
const D = (k, d, s, w = 3, ex = "") => `<path data-k="${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100" ${ex}/>`;
const T = (x, y, s, sz = 15, f = C.ink, a = "middle", ex = "") => `<text x="${r1(x)}" y="${r1(y)}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const NT = (k, x, y, s, sz = 15, f = C.ink, a = "middle", ex = "") => `<text data-k="${k}" x="${r1(x)}" y="${r1(y)}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const K = (k, b, ex = "") => `<g data-k="${k}" ${ex}>${b}</g>`;
const H = (k, b, ex = "") => `<g data-k="${k}" style="opacity:0" ${ex}>${b}</g>`;
const tw = (s, sz) => Math.round(String(s).length * sz * 0.58 + sz * 1.3);
const pill = (x, y, s, o = {}) => {
  const sz = o.sz || 14, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.85);
  return R(x - w / 2, y - h / 2, w, h, o.bg || C.white, o.rx == null ? h / 2 : o.rx,
    `stroke="${o.st || C.navy}" stroke-width="${o.sw || 1.8}"${o.dash ? ' stroke-dasharray="5 4"' : ""}`) +
    T(x, y + sz * 0.36, s, sz, o.fg || o.st || C.navy);
};
const arw = (x1, y1, x2, y2, col = C.navy, w = 2.4, ex = "") => {
  const a = Math.atan2(y2 - y1, x2 - x1), L = 8 + w * 1.6, Wd = 4 + w * 1.1;
  const bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
  return P(`M${r1(x1)} ${r1(y1)} L${r1(bx)} ${r1(by)}`, col, w, ex) +
    F(`M${r1(x2)} ${r1(y2)} L${r1(bx + Wd * Math.sin(a))} ${r1(by - Wd * Math.cos(a))} L${r1(bx - Wd * Math.sin(a))} ${r1(by + Wd * Math.cos(a))} Z`, col);
};

// ---------- icon library (all coordinates absolute; no transform attributes on keyed nodes) ----------
const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${r1(x - 7 * s)} ${r1(y)} l${r1(5 * s)} ${r1(5 * s)} l${r1(10 * s)} ${r1(-11 * s)}`, col, w);
const cross = (x, y, s = 1, col = C.coral, w = 3) => P(`M${r1(x - 6 * s)} ${r1(y - 6 * s)} l${r1(12 * s)} ${r1(12 * s)} M${r1(x + 6 * s)} ${r1(y - 6 * s)} l${r1(-12 * s)} ${r1(12 * s)}`, col, w);
const okDot = (x, y, r = 10, col = C.green) => O(x, y, r, col) + tick(x, y, r / 15, C.white, Math.max(2, r / 5));
const noDot = (x, y, r = 10, col = C.coral) => O(x, y, r, col) + cross(x, y, r / 15, C.white, Math.max(2, r / 5));
const bang = (x, y, r = 10, col = C.coral) => O(x, y, r, col) + T(x, y + r * 0.45, "!", Math.max(13, Math.round(r * 1.3)), C.white);
const qDot = (x, y, r = 10, col = C.plum) => O(x, y, r, col) + T(x, y + r * 0.45, "?", Math.max(13, Math.round(r * 1.3)), C.white);
const man = (x, y, s = 1, col = C.navy) => O(x, y - 17 * s, 8 * s, col) +
  F(`M${r1(x - 13 * s)} ${r1(y + 12 * s)} Q${r1(x - 13 * s)} ${r1(y - 5 * s)} ${r1(x)} ${r1(y - 5 * s)} Q${r1(x + 13 * s)} ${r1(y - 5 * s)} ${r1(x + 13 * s)} ${r1(y + 12 * s)} Z`, col);
const traveller = (x, y, s = 1, col = C.blue) => man(x, y, s, col) + R(x + 12 * s, y - 1 * s, 12 * s, 14 * s, C.amber, 2 * s) +
  P(`M${r1(x + 15 * s)} ${r1(y - 1 * s)} v${r1(-4 * s)} h${r1(6 * s)} v${r1(4 * s)}`, C.amber, 1.6 * s);
const face = (x, y, r = 9, col = C.blue) => O(x, y, r, col) + O(x - r * 0.34, y - r * 0.15, r * 0.15, C.white) + O(x + r * 0.34, y - r * 0.15, r * 0.15, C.white) +
  P(`M${r1(x - r * 0.36)} ${r1(y + r * 0.3)} Q${r1(x)} ${r1(y + r * 0.58)} ${r1(x + r * 0.36)} ${r1(y + r * 0.3)}`, C.white, Math.max(1.2, r * 0.13));
const kiosk = (x, y, s = 1, col = C.navy) => R(x - 14 * s, y - 52 * s, 28 * s, 52 * s, col, 5 * s) + R(x - 10 * s, y - 47 * s, 20 * s, 15 * s, "#bfe3f2", 2 * s) +
  R(x - 7 * s, y - 25 * s, 14 * s, 4 * s, "#9fb4c8", 1) + R(x - 18 * s, y, 36 * s, 5 * s, col, 2 * s);
const desk = (x, y, w = 90, col = C.wood) => R(x - w / 2 - 4, y - 6, w + 8, 8, "#6f5233", 3) + R(x - w / 2, y, w, 26, col, 3);
const clock = (x, y, r, col = C.coral, bg = C.white) => O(x, y, r, bg, `stroke="${col}" stroke-width="${r1(Math.max(2, r / 6))}"`) +
  P(`M${r1(x)} ${r1(y - r * 0.6)} V${r1(y)} L${r1(x + r * 0.42)} ${r1(y + r * 0.28)}`, col, r1(Math.max(2, r / 7)));
const paper = (x, y, w, h, col = C.navy, n = 3) => R(x, y, w, h, C.white, 4, `stroke="${col}" stroke-width="1.8"`) +
  rep(n, (i) => P(`M${r1(x + 7)} ${r1(y + 12 + i * (h - 18) / Math.max(1, n))} H${r1(x + w - 7 - (i === n - 1 ? w * 0.3 : 0))}`, C.mist, 2.2));
const env = (x, y, w, h, col = C.navy, bg = C.white) => R(x, y, w, h, bg, 3, `stroke="${col}" stroke-width="1.8"`) +
  P(`M${r1(x)} ${r1(y)} L${r1(x + w / 2)} ${r1(y + h * 0.55)} L${r1(x + w)} ${r1(y)}`, col, 1.8);
const coin = (x, y, r = 12, col = C.gold) => E(x, y, r, r * 0.42, col, `stroke="${C.amber}" stroke-width="1.5"`);
const star = (x, y, r, col = C.gold) => {
  let d = "";
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; d += (i ? "L" : "M") + r1(x + rr * Math.cos(a)) + " " + r1(y + rr * Math.sin(a)); }
  return F(d + "Z", col);
};
const bulb = (x, y, s = 1, col = C.gold) => O(x, y, 10 * s, col) + R(x - 5 * s, y + 8 * s, 10 * s, 7 * s, C.slate, 2) +
  P(`M${r1(x - 16 * s)} ${r1(y - 8 * s)} l${r1(-5 * s)} ${r1(-4 * s)} M${r1(x + 16 * s)} ${r1(y - 8 * s)} l${r1(5 * s)} ${r1(-4 * s)} M${r1(x)} ${r1(y - 16 * s)} v${r1(-6 * s)}`, col, 2.2);
const mega = (x, y, s = 1, col = C.plum) => R(x - 9 * s, y - 6 * s, 9 * s, 12 * s, col, 2) +
  F(`M${r1(x)} ${r1(y - 6 * s)} L${r1(x + 24 * s)} ${r1(y - 16 * s)} V${r1(y + 16 * s)} L${r1(x)} ${r1(y + 6 * s)} Z`, col) +
  P(`M${r1(x - 4 * s)} ${r1(y + 6 * s)} l${r1(3 * s)} ${r1(12 * s)}`, col, 3 * s);
const waves = (x, y, s = 1, col = C.plum) => rep(3, (i) => P(`M${r1(x + (8 + i * 9) * s)} ${r1(y - (8 + i * 6) * s)} Q${r1(x + (14 + i * 11) * s)} ${r1(y)} ${r1(x + (8 + i * 9) * s)} ${r1(y + (8 + i * 6) * s)}`, col, 2.4));
const cal = (x, y, w, h, col = C.navy, title = "") => R(x, y, w, h, C.white, 6, `stroke="${col}" stroke-width="1.8"`) + R(x, y, w, 18, col, 6) + R(x, y + 9, w, 9, col) +
  (title ? T(x + w / 2, y + 14, title, 13, C.white) : "");
const lockI = (x, y, s = 1, col = C.red) => R(x - 9 * s, y - 2 * s, 18 * s, 14 * s, col, 2) +
  P(`M${r1(x - 5 * s)} ${r1(y - 2 * s)} v${r1(-5 * s)} a${r1(5 * s)} ${r1(5 * s)} 0 0 1 ${r1(10 * s)} 0 v${r1(5 * s)}`, col, r1(2.2 * s));
const shieldI = (x, y, s = 1, col = C.green) => F(`M${r1(x)} ${r1(y - 14 * s)} L${r1(x + 12 * s)} ${r1(y - 9 * s)} V${r1(y + 1 * s)} Q${r1(x + 12 * s)} ${r1(y + 11 * s)} ${r1(x)} ${r1(y + 15 * s)} Q${r1(x - 12 * s)} ${r1(y + 11 * s)} ${r1(x - 12 * s)} ${r1(y + 1 * s)} V${r1(y - 9 * s)} Z`, col);
const heart = (x, y, s = 1, col = C.coral) => F(`M${r1(x)} ${r1(y + 9 * s)} C${r1(x - 15 * s)} ${r1(y - 1 * s)} ${r1(x - 9 * s)} ${r1(y - 13 * s)} ${r1(x)} ${r1(y - 5 * s)} C${r1(x + 9 * s)} ${r1(y - 13 * s)} ${r1(x + 15 * s)} ${r1(y - 1 * s)} ${r1(x)} ${r1(y + 9 * s)} Z`, col);
const cog = (x, y, r, col = C.slate, hole = C.white) => {
  let d = "";
  for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, rr = i % 2 ? r * 0.8 : r; d += (i ? "L" : "M") + r1(x + rr * Math.cos(a)) + " " + r1(y + rr * Math.sin(a)); }
  return F(d + "Z", col) + O(x, y, r * 0.35, hole);
};
const ptag = (x, y, s, col = C.amber) => {
  const sz = 13, w = tw(s, sz) + 12, h = 26;
  return F(`M${r1(x - w / 2)} ${r1(y)} L${r1(x - w / 2 + 12)} ${r1(y - h / 2)} H${r1(x + w / 2)} V${r1(y + h / 2)} H${r1(x - w / 2 + 12)} Z`, C.white, `stroke="${col}" stroke-width="2"`) +
    O(x - w / 2 + 11, y, 3, col) + T(x + 6, y + 4.7, s, sz, col);
};
const bubble = (x, y, w, h, col = C.navy, bg = C.white, tx = 0.2) => R(x, y, w, h, bg, 12, `stroke="${col}" stroke-width="1.8"`) +
  F(`M${r1(x + w * tx)} ${r1(y + h - 1)} l-6 13 l16 -13 Z`, bg, `stroke="${col}" stroke-width="1.8" stroke-linejoin="round"`) + R(x + w * tx - 7, y + h - 4, 20, 4, bg);
const cloudI = (x, y, s = 1, col = "#9aa9b8") => O(x - 14 * s, y, 11 * s, col) + O(x, y - 7 * s, 14 * s, col) + O(x + 15 * s, y, 11 * s, col) + R(x - 25 * s, y, 51 * s, 11 * s, col, 5 * s);
const book = (x, y, w, h, col = C.green, t = "") => R(x, y, w, h, col, 4) + R(x + 5, y + 4, w - 10, h - 8, "rgba(255,255,255,.18)", 3) + P(`M${r1(x + 9)} ${r1(y + 3)} V${r1(y + h - 3)}`, "rgba(0,0,0,.25)", 2) + (t ? T(x + w / 2 + 4, y + h / 2 + 5, t, 13, C.white) : "");
const grid4 = (x, y, w, h, col = C.slate) => R(x, y, w, h, "none", 6, `stroke="${col}" stroke-width="2"`) + P(`M${r1(x + w / 2)} ${r1(y)} V${r1(y + h)} M${r1(x)} ${r1(y + h / 2)} H${r1(x + w)}`, col, 1.8, 'stroke-dasharray="5 4"');

// ---------- stylesheet (scoped per scene, appended once per part into <style id="vl-sc-w04">) ----------
function sceneCSS(id, bg) {
  const s = ".vls-w04-" + id;
  return `
${s}{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:200px;overflow:hidden!important;box-sizing:border-box;border-radius:16px;background:${bg};color:${C.ink};font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w04-stage{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w04-stage>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}
${s} svg text{font-family:inherit;font-weight:700;letter-spacing:.15px}
${s} [data-k],${s} [data-v]{transform-box:fill-box;transform-origin:50% 50%}
${s}.w04-css [data-k],${s}.w04-css [data-v]{transition-property:transform,opacity,fill,stroke-dashoffset;transition-duration:.8s;transition-timing-function:cubic-bezier(.2,.8,.25,1)}
${s}.w04-snap [data-k],${s}.w04-snap [data-v],${s}.w04-rm [data-k],${s}.w04-rm [data-v]{transition:none!important}
${s}.w04-rm *,${s}.w04-snap *{animation:none!important}
${s} .w04-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:38px;padding:6px 12px 8px;font-size:15px;font-weight:800;line-height:1.2;color:${C.navy};background:rgba(255,255,255,.66);border-top:1px solid rgba(23,63,107,.14)}
${s} .w04-no{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w04-txt{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.2px}
${s} .w04-txt.w04-in{animation:vlsw04In .45s cubic-bezier(.2,.8,.25,1)}
${s} .w04-pr{flex:0 0 56px;height:5px;border-radius:5px;background:rgba(23,63,107,.15);overflow:hidden}
${s} .w04-pr i{display:block;height:100%;width:0;background:${C.coral};transition:width .6s ease}
${s}.w04-intro .w04-stage>svg{animation:vlsw04Intro .65s cubic-bezier(.2,.8,.25,1)}
${s} .a-dash{stroke-dasharray:6 7;animation:vlsw04Dash 1.2s linear infinite}
${s} .a-bob,${s} .a-pulse,${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%}
${s} .a-bob{animation:vlsw04Bob 2.4s ease-in-out infinite}
${s} .a-pulse{animation:vlsw04Pulse 1.8s ease-in-out infinite}
${s} .a-spin{animation:vlsw04Spin 6s linear infinite}
${s} .a-blink{animation:vlsw04Blink 1.3s ease-in-out infinite}
@media (max-width:420px){${s} .w04-cap{font-size:14px;min-height:34px;padding:5px 10px 7px}${s} .w04-pr{flex-basis:40px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
}
const KEYFRAMES = `
@keyframes vlsw04In{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes vlsw04Intro{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
@keyframes vlsw04Dash{to{stroke-dashoffset:-26}}
@keyframes vlsw04Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes vlsw04Pulse{0%,100%{opacity:.4;transform:scale(.94)}50%{opacity:1;transform:scale(1.06)}}
@keyframes vlsw04Spin{to{transform:rotate(360deg)}}
@keyframes vlsw04Blink{0%,100%{opacity:1}50%{opacity:.3}}
`;
function addStyles(list) {
  if (typeof document === "undefined" || !document.createElement) return;
  let st = document.getElementById("vl-sc-w04");
  if (!st) { st = document.createElement("style"); st.id = "vl-sc-w04"; (document.head || document.documentElement).appendChild(st); }
  const flag = "data-w04v2-" + PART;
  if (st.getAttribute(flag)) return;
  st.setAttribute(flag, "1");
  st.appendChild(document.createTextNode(KEYFRAMES + list.map((p) => sceneCSS(p[0], p[1])).join("\n")));
}

// ---------- scene factory ----------
// cfg = { id, N, labels[N], bg, desc, deco?(), vis: [{ r:[from,to], art(), play(c, j, k), pre?(c) }] }
// pre(c) runs instantly while a visual is hidden (never during its own fade-out) to stage its entry state.
function makeScene(cfg) {
  const id = cfg.id, N = cfg.N, labels = cfg.labels, V = cfg.vis;
  if (labels.length !== N) warn(id + ": " + labels.length + " labels for " + N + " moments");
  labels.forEach((l, i) => { const w = String(l).trim().split(/\s+/).length; if (w < 2 || w > 4) warn(id + " label " + i + " has " + w + " words"); });
  for (let k = 0; k < N; k++) { const hits = V.filter((v) => inR(k, v.r[0], v.r[1])).length; if (hits !== 1) warn(id + " moment " + k + " covered by " + hits + " visuals"); }
  let root = null, useG = false, counters = [], lastK = -1;
  const mapK = (i, n) => {
    const nn = Math.max(1, Math.floor(num(n, N)));
    const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
    return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
  };
  const q = (sel) => (root ? Array.prototype.slice.call(root.querySelectorAll(sel)) : []);
  function timing(el, t) { el.style.transitionDuration = (t.d == null ? 0.8 : t.d) + "s"; el.style.transitionDelay = (t.dl || 0) + "s"; }
  function tf(el, st, t, snap) {
    const x = st.x || 0, y = st.y || 0, r = st.r || 0;
    const sx = st.sx != null ? st.sx : (st.s != null ? st.s : 1);
    const sy = st.sy != null ? st.sy : (st.s != null ? st.s : 1);
    if (useG) {
      const v = { x, y, rotation: r, scaleX: sx, scaleY: sy };
      if (st.pv) v.svgOrigin = st.pv[0] + " " + st.pv[1]; else v.transformOrigin = "50% 50%";
      if (snap) window.gsap.set(el, v);
      else window.gsap.to(el, Object.assign(v, { duration: t.d == null ? 0.8 : t.d, delay: t.dl || 0, ease: t.e || "power3.out", overwrite: "auto" }));
    } else {
      if (st.pv) { el.style.transformBox = "view-box"; el.style.transformOrigin = st.pv[0] + "px " + st.pv[1] + "px"; }
      else { el.style.transformBox = ""; el.style.transformOrigin = ""; }
      timing(el, t);
      el.style.transform = "translate(" + x + "px," + y + "px) rotate(" + r + "deg) scale(" + sx + "," + sy + ")";
    }
  }
  function op(el, o, t, snap) {
    if (useG) { if (snap) window.gsap.set(el, { opacity: o }); else window.gsap.to(el, { opacity: o, duration: t.d == null ? 0.55 : t.d, delay: t.dl || 0, ease: "power1.out", overwrite: "auto" }); }
    else { timing(el, t); el.style.opacity = String(o); }
  }
  function dash(el, f, t, snap) {
    const v = 100 * (1 - clamp(f, 0, 1));
    if (useG) { if (snap) window.gsap.set(el, { strokeDashoffset: v }); else window.gsap.to(el, { strokeDashoffset: v, duration: t.d == null ? 1.1 : t.d, delay: t.dl || 0, ease: "power2.inOut", overwrite: "auto" }); }
    else { timing(el, t); el.style.strokeDashoffset = String(v); }
  }
  function fill(el, col, t, snap) {
    if (useG) { if (snap) window.gsap.set(el, { fill: col }); else window.gsap.to(el, { fill: col, duration: t.d == null ? 0.55 : t.d, delay: t.dl || 0, overwrite: "auto" }); }
    else { timing(el, t); el.style.fill = col; }
  }
  function count(el, to, fmt, t, snap) {
    const from = num(el.__w04v, to);
    el.__w04v = to;
    if (useG && !snap && from !== to) {
      const o = { v: from };
      counters.push(window.gsap.to(o, { v: to, duration: t.d == null ? 1.2 : t.d, delay: t.dl || 0, ease: "power2.out", onUpdate: () => { el.textContent = fmt(o.v); } }));
    } else el.textContent = fmt(to);
  }
  function ctx(scope, snap) {
    const nodes = (k) => q(scope + ' [data-k="' + k + '"]');
    const each = (k, f) => nodes(k).forEach(f);
    return {
      snap,
      op: (k, o, t = {}) => each(k, (el) => op(el, o, t, snap)),
      mv: (k, st, t = {}) => each(k, (el) => tf(el, st || {}, t, snap)),
      dr: (k, f, t = {}) => each(k, (el) => dash(el, f, t, snap)),
      fl: (k, col, t = {}) => each(k, (el) => fill(el, col, t, snap)),
      tx: (k, s) => each(k, (el) => { if (el.textContent !== String(s)) el.textContent = String(s); }),
      nm: (k, v, fmt, t = {}) => each(k, (el) => count(el, v, fmt || ((x) => String(Math.round(x))), t, snap)),
      vis: (m, t = {}) => Object.keys(m).forEach((k) => each(k, (el) => op(el, m[k] === true ? 1 : m[k] === false ? 0 : num(m[k], 0), t, snap))),
      all: (sel) => q(scope + " " + sel),
      opEl: (el, o, t = {}) => op(el, o, t, snap),
      mvEl: (el, st, t = {}) => tf(el, st || {}, t, snap),
      flEl: (el, col, t = {}) => fill(el, col, t, snap)
    };
  }
  function caption(k, snap) {
    const lab = root.querySelector(".w04-txt"), no = root.querySelector(".w04-no"), bar = root.querySelector(".w04-pr i");
    const txt = labels[k] || "";
    if (lab && lab.textContent !== txt) {
      lab.textContent = txt;
      if (!snap && !reduced()) { lab.classList.remove("w04-in"); void lab.offsetWidth; lab.classList.add("w04-in"); }
    }
    if (no) no.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
    if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
  }
  function render(k, snap) {
    if (!root) return;
    if (snap) root.classList.add("w04-snap");
    V.forEach((v, i) => {
      const g = root.querySelector('[data-v="' + i + '"]');
      if (!g) return;
      const on = inR(k, v.r[0], v.r[1]);
      op(g, on ? 1 : 0, { d: on ? 0.55 : 0.3, dl: on ? 0.12 : 0 }, snap);
      tf(g, on ? {} : { x: k < v.r[0] ? 28 : -28, s: 0.985 }, { d: 0.6 }, snap);
      g.setAttribute("aria-hidden", on ? "false" : "true");
      const wasOn = lastK >= 0 && inR(lastK, v.r[0], v.r[1]);
      if (!on && v.pre && !wasOn) {
        try { v.pre(ctx('[data-v="' + i + '"]', true)); } catch (e) { warn(id + " pre " + i + ": " + (e && e.message)); }
      }
      if (on) {
        try { v.play(ctx('[data-v="' + i + '"]', snap), k - v.r[0], k); }
        catch (e) { warn(id + " visual " + i + ": " + (e && e.message)); }
      }
    });
    caption(k, snap);
    lastK = k;
    if (snap) { void root.offsetWidth; root.classList.remove("w04-snap"); }
    root.setAttribute("data-moment", String(k));
  }
  function kill() {
    counters.forEach((tw0) => { try { tw0.kill(); } catch (_) {} });
    counters = [];
    if (root && window.gsap && typeof window.gsap.killTweensOf === "function") {
      try { window.gsap.killTweensOf(root.querySelectorAll("[data-k],[data-v]")); } catch (_) {}
    }
  }
  function mount(el) {
    const r = document.createElement("div");
    const rm = reduced();
    r.className = "vls-w04-" + id + " w04-root" + (useG ? " w04-gsap" : " w04-css") + (rm ? " w04-rm" : " w04-intro");
    r.setAttribute("data-scene", id);
    const art = R(-400, -300, 1200, 900, cfg.bg) + (cfg.deco ? cfg.deco() : "") +
      V.map((v, i) => `<g data-v="${i}" style="opacity:0">${v.art()}</g>`).join("");
    r.innerHTML = '<div class="w04-stage"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
      esc(cfg.desc) + '">' + art + '</svg></div><div class="w04-cap" aria-hidden="true"><span class="w04-no"></span><span class="w04-txt"></span><span class="w04-pr"><i></i></span></div>';
    if (typeof el.replaceChildren === "function") el.replaceChildren(r);
    else { el.innerHTML = ""; el.appendChild(r); }
    return r;
  }
  return {
    build(el) {
      if (!el || el.nodeType !== 1) return;
      kill();
      lastK = -1;
      useG = gsapOK();
      root = mount(el);
      render(0, true);
    },
    step(i, n) {
      if (!root) return;
      if (reduced()) { root.classList.add("w04-rm"); }
      render(mapK(i, n), !useG && reduced());
    },
    reset() {
      if (!root) return;
      kill();
      lastK = -1;
      render(0, true);
    }
  };
}
// merge(a, b): joins two adjacent visuals into one two-phase visual (cross-fade inside one stage).
const merge = (a, b) => {
  const na = a.r[1] - a.r[0] + 1;
  return {
    r: [a.r[0], b.r[1]],
    art: () => `<g data-k="mA">${a.art()}</g><g data-k="mB" style="opacity:0">${b.art()}</g>`,
    pre: (c) => { if (a.pre) a.pre(c); if (b.pre) b.pre(c); },
    play: (c, j, k) => {
      c.op("mA", j < na ? 1 : 0, { d: 0.4 }); c.op("mB", j < na ? 0 : 1, { d: 0.5, dl: j < na ? 0 : 0.15 });
      if (j < na) a.play(c, j, k); else b.play(c, j - na, k);
    }
  };
};
const BG = [];

// ============================================================
// O1a · Why good process designs fail on adoption · 29 moments · 11 visuals
// Story: a lobby journey, a redesign blueprint, hard numbers, three letters,
// hidden floor knowledge, two layers of change, the role shift, an adoption
// fork, a change ribbon under all BPM phases, and the conditions for success.
// ============================================================
{
  const id = "O1a", N = 29;
  const labels = [
    "Back at Qasr Marina", "Twenty-three minute wait", "Targets met, room unready", "Manage the whole journey",
    "A redesigned check-in", "ID moves to kiosk", "Twenty-three to five", "Forty percent fewer keystrokes",
    "Expected: a welcome", "Three formal objections", "Just explain benefits?", "What do supervisors know?",
    "Benefits clear, risks open", "Unused design, no value", "Process versus people change", "Routines, roles, expertise",
    "More than ID location", "When staff step in", "Adoption means genuine use", "Installed, but bypassed",
    "Benefits not received", "Change runs throughout", "Understand, shape, learn, sustain", "Every phase, not last",
    "Explanation is not enough", "Concerns found too late", "Not just persuasion", "Create conditions for success",
    "A dip is coming"
  ];
  const vis = [];

  // V1 (0-3) · adapted from https://dribbble.com/shots/3791748-Workflow-Animation — handoff tokens across departments
  vis.push({ r: [0, 3], art: () => {
    const DN = ["Reservations", "Housekeeping", "Front desk"];
    let s = R(-400, 238, 1200, 300, "#dbe4ec");
    s += K("sign", R(136, 12, 168, 36, C.navy, 10) + T(220, 36, "Qasr Marina", 18, C.white));
    [70, 200, 330].forEach((x, i) => {
      s += K("dp" + i, R(x - 58, 66, 116, 66, C.white, 12, `stroke="${C.mist}" stroke-width="2"`) + T(x, 92, DN[i], 14, C.navy) +
        R(x - 40, 106, 80, 10, "#e3e9ef", 5) + R(x - 40, 106, 80, 10, C.green, 5));
      s += H("ok" + i, okDot(x + 46, 70, 11));
    });
    s += D("jl", "M40 212 C60 176 80 152 110 152 H280 C296 152 300 160 300 168", C.teal, 4);
    s += H("jt", pill(175, 186, "One guest journey", { st: C.teal }));
    s += H("door", R(300, 160, 80, 78, "#b98c55", 4) + R(308, 168, 64, 70, "#c9a06a", 2) + O(366, 206, 3.5, C.paper) +
      R(304, 176, 72, 24, C.coral, 5) + T(340, 193, "Not ready", 13, C.white));
    s += H("clk", clock(34, 30, 17));
    s += NT("min", 60, 36, "0 min", 16, C.coral, "start", 'style="opacity:0"');
    s += H("trav", traveller(34, 222, 1.15, C.blue));
    return s;
  }, play: (c, j) => {
    c.vis({ sign: 1, trav: j >= 1, clk: j >= 1, min: j >= 1, door: j >= 2, jt: j === 3 });
    [0, 1, 2].forEach((i) => {
      c.op("dp" + i, j >= 2 ? 1 : 0.22);
      c.op("ok" + i, j === 2 ? 1 : j === 3 ? 0.35 : 0, { dl: j === 2 ? 0.2 + i * 0.2 : 0 });
      c.mv("ok" + i, j >= 2 ? {} : { s: 0.3 });
    });
    c.mv("trav", { x: j >= 3 ? 230 : j >= 1 ? 120 : 0 }, { d: 1.3 });
    c.nm("min", j >= 1 ? 23 : 0, (v) => Math.round(v) + " min", { d: 1.6 });
    c.dr("jl", j === 3 ? 1 : 0);
  } });

  // V2 (4-5) · adapted from https://codepen.io/WebGuyJeff/pen/rNdmqdO — node-by-node flow reveal
  vis.push({ r: [4, 5], art: () => {
    const NODES = ["Arrive", "Kiosk ID", "Confirm", "Room key"];
    let s = R(16, 14, 368, 152, "#1d4f80", 14) + rep(8, (i) => P(`M${56 + i * 40} 20 V160`, "#2b5f92", 1)) + rep(3, (i) => P(`M22 ${56 + i * 34} H378`, "#2b5f92", 1));
    s += T(200, 42, "Redesigned check-in", 17, C.white);
    [70, 157, 243, 330].forEach((x, i) => { s += K("n" + i, R(x - 37, 78, 74, 46, "#e9f2fb", 10) + T(x, 106, NODES[i], 14, C.navy)); });
    s += D("fl", "M107 101 H120 M194 101 H206 M280 101 H293", C.gold, 3.5);
    s += H("kh", R(117, 72, 80, 58, "none", 13, `stroke="${C.gold}" stroke-width="3.5"`));
    s += H("mgmt", man(54, 262, 1.2, C.plum) + pill(175, 252, "Management proposal", { st: C.plum }));
    s += H("dsk", man(70, 236, 1.05, C.teal) + desk(70, 250, 92));
    s += H("kio", kiosk(330, 280, 1.15, C.navy) + T(330, 206, "Kiosk", 14, C.navy));
    s += H("kb", R(150, 250, 98, 32, "#cdd8e3", 6) + rep(10, (i) => R(156 + (i % 5) * 18, 255 + Math.floor(i / 5) * 13, 14, 9, C.white, 2)) +
      pill(199, 226, "Repeat typing", { st: C.coral, sz: 13 }));
    s += H("kbx", cross(199, 266, 1.9, C.coral, 4.5));
    s += H("card", R(56, 226, 30, 20, C.gold, 3) + O(64, 236, 4, C.white) + P("M71 233 H81 M71 239 H79", C.white, 1.8));
    return s;
  }, play: (c, j) => {
    [0, 1, 2, 3].forEach((i) => { c.op("n" + i, 1, { dl: j === 0 ? i * 0.18 : 0 }); c.mv("n" + i, j === 0 || j === 1 ? {} : { s: 0.6 }); });
    c.dr("fl", 1, { dl: j === 0 ? 0.5 : 0 });
    c.vis({ mgmt: j === 0, dsk: j === 1, kio: j === 1, kb: j === 1, kbx: j === 1, card: j === 1, kh: j === 1 });
    c.mv("card", j === 1 ? { x: 258, y: -54 } : {}, { d: 1.4, dl: 0.4, e: "power2.inOut" });
    c.mv("kbx", j === 1 ? {} : { s: 0.2 }, { dl: 0.9 });
  } });

  // V3 (6-7) · adapted from https://observablehq.com/@d3/learn-d3-animation and https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/ — counter + scaled bars, unit-grid subtraction
  vis.push({ r: [6, 7], art: () => {
    let s = "";
    let cv = NT("big", 200, 66, "23 min", 42, C.coral);
    cv += T(30, 112, "Current check-in", 14, C.navy, "start") + R(30, 120, 340, 28, "#e1e8ef", 9) + K("b1", R(30, 120, 340, 28, C.coral, 9)) + T(360, 139, "23 min", 14, C.white, "end");
    cv += T(30, 184, "Proposed check-in", 14, C.navy, "start") + R(30, 192, 340, 28, "#e1e8ef", 9) + K("b2", R(30, 192, 74, 28, C.teal, 9)) + H("b2t", T(114, 211, "about 5 min", 14, C.teal, "start"));
    cv += H("dv", arw(200, 152, 200, 186, C.teal, 2.6));
    s += K("cv", cv);
    let kg = T(115, 58, "Front-desk keystrokes", 14, C.navy);
    kg += rep(100, (i) => `<rect data-k="ks" data-i="${i}" x="${30 + (i % 10) * 17}" y="${70 + Math.floor(i / 10) * 17}" width="14" height="14" rx="3" fill="${C.blue}"/>`);
    kg += H("pct", T(300, 150, "40%", 54, C.teal) + T(300, 184, "fewer keystrokes", 15, C.navy) + T(300, 208, "low-value work", 13, C.slate));
    s += H("kg", kg);
    return s;
  }, play: (c, j) => {
    c.op("cv", j === 0 ? 1 : 0); c.op("kg", j === 1 ? 1 : 0);
    c.mv("b1", { sx: j === 0 ? 1 : 0.02, pv: [30, 134] }, { d: 1 });
    c.mv("b2", { sx: j === 0 ? 1 : 0.02, pv: [30, 206] }, { d: 1, dl: 0.5 });
    c.vis({ b2t: j === 0, dv: j === 0 }, { dl: j === 0 ? 1.1 : 0 });
    c.nm("big", j === 0 ? 5 : 23, (v) => Math.round(v) + " min", { d: 1.6, dl: 0.4 });
    c.all('[data-k="ks"]').forEach((el) => {
      const i = +el.getAttribute("data-i"), gone = j === 1 && i >= 60;
      c.opEl(el, gone ? 0.12 : 1, { dl: gone ? (i - 60) * 0.02 : 0 });
      c.flEl(el, gone ? C.coral : C.blue, { dl: gone ? (i - 60) * 0.02 : 0 });
      c.mvEl(el, gone ? { y: 14 } : {}, { dl: gone ? (i - 60) * 0.02 : 0 });
    });
    c.op("pct", j === 1 ? 1 : 0, { dl: 0.8 });
  } });

  // V4 (8-10) · adapted from https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8 — documents travelling to an approver
  vis.push({ r: [8, 10], art: () => {
    const NM = ["Marina", "Corniche", "Old Town"];
    let s = man(200, 62, 1.15, C.navy) + desk(200, 76, 130);
    s += H("bang", bang(234, 30, 11));
    [80, 200, 320].forEach((x, i) => {
      s += man(x, 252, 1.2, C.teal) + T(x, 288, NM[i], 14, C.slate);
      s += H("tb" + i, E(x, 196, 46, 18, C.white, `stroke="${C.green}" stroke-width="1.8" stroke-dasharray="5 4"`) + T(x, 201, "Welcome?", 13, C.green));
      s += H("lt" + i, env(x - 17, 196, 34, 22, C.coral) + R(x - 9, 210, 18, 5, C.coral, 2));
    });
    s += H("exp", pill(200, 148, "Expected: a welcome", { st: C.green, dash: 1 }));
    s += H("stp", pill(200, 148, "Formal objections", { bg: C.coral, st: C.coral, fg: C.white }));
    s += H("adv", man(46, 150, 1.15, C.plum) + mega(66, 134, 1, C.plum) + waves(90, 134, 1, C.plum));
    s += H("advp", pill(240, 150, "Explain the benefits", { st: C.plum }) + pill(300, 192, "Misunderstanding?", { st: C.coral, dash: 1, sz: 13 }));
    return s;
  }, play: (c, j) => {
    [0, 1, 2].forEach((i) => {
      const x = [80, 200, 320][i];
      c.op("tb" + i, j === 0 ? 1 : 0, { dl: j === 0 ? i * 0.15 : 0 });
      c.op("lt" + i, j >= 1 ? 1 : 0);
      c.mv("lt" + i, j >= 1 ? { x: 200 + (i - 1) * 40 - x, y: -100 } : {}, { d: 1.2, dl: i * 0.2, e: "power2.inOut" });
    });
    c.vis({ exp: j === 0, stp: j === 1, bang: j >= 1, adv: j === 2, advp: j === 2 });
  } });

  // V5 (11-13) · adapted from https://dribbble.com/shots/27247003-Data-Workflow-Animation — hidden nodes activating in sequence
  vis.push({ r: [11, 13], art: () => {
    let s = H("sup", man(78, 216, 1.8, C.teal));
    s += H("thk", O(110, 172, 6, C.white, `stroke="${C.navy}" stroke-width="1.6"`) + O(126, 156, 9, C.white, `stroke="${C.navy}" stroke-width="1.6"`) +
      E(240, 104, 140, 72, C.white, `stroke="${C.navy}" stroke-width="2"`) +
      [170, 240, 310].map((x) => R(x - 26, 72, 52, 40, C.sky, 8, `stroke="${C.slate}" stroke-width="1.6" stroke-dasharray="4 3"`) + T(x, 100, "?", 22, C.slate)).join("") +
      T(240, 146, "Floor knowledge", 14, C.navy));
    s += H("cols", R(154, 50, 110, 160, C.mint, 14) + T(209, 76, "Benefits", 15, C.green) + okDot(209, 124, 24) + T(209, 182, "Understood", 14, C.green) +
      R(278, 50, 110, 160, C.rose, 14) + T(333, 76, "Risks", 15, C.coral) + bang(333, 124, 24) + T(333, 182, "Unaddressed", 14, C.coral));
    s += H("kio", kiosk(150, 250, 2, C.navy) + star(196, 120, 9) + star(108, 150, 7) + pill(150, 52, "Well designed", { st: C.green }));
    s += H("web", P("M178 150 L214 150 M178 150 L206 130 M178 150 L196 120", C.slate, 1.2) + P("M188 150 Q194 140 200 141 M196 150 Q200 136 206 136", C.slate, 1));
    s += H("met", T(300, 92, "Value", 15, C.navy) + R(280, 104, 40, 126, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + T(300, 222, "0", 18, C.coral) + pill(300, 256, "Not used", { st: C.coral }));
    return s;
  }, play: (c, j) => {
    c.vis({ sup: j <= 1, thk: j === 0, cols: j === 1, kio: j === 2, web: j === 2, met: j === 2 });
    c.mv("thk", j === 0 ? {} : { s: 0.7 });
    c.mv("cols", j === 1 ? {} : { x: 40 });
    c.mv("web", j === 2 ? {} : { s: 0.3 }, { dl: 0.6 });
  } });

  // V6 (14-15) · adapted from https://observablehq.com/@d3/path-tween — identity-preserving re-ordering
  vis.push({ r: [14, 15], art: () => {
    const ST = ["Arrive", "Type", "Verify", "Key"];
    let lay = R(14, 14, 372, 118, "#e8f1f9", 12) + T(28, 38, "Process redesign", 15, C.navy, "start");
    ST.forEach((t, i) => { lay += K("st" + i, R(70 + i * 85 - 34, 64, 68, 44, C.white, 9, `stroke="${C.navy}" stroke-width="2"`) + T(70 + i * 85, 91, t, 14, C.navy)); });
    lay += R(14, 146, 372, 142, "#f4ecdc", 12) + T(28, 170, "Organisational change", 15, C.amber, "start");
    lay += K("rcp", man(110, 248, 1.3, C.teal)) + desk(110, 262, 80) + kiosk(330, 282, 0.95, C.navy);
    lay += H("wd", pill(214, 200, "Works differently", { st: C.amber }));
    let s = K("lay", lay);
    const B = [["Routines", 90, 66], ["Responsibilities", 296, 66], ["Relationships", 96, 236], ["Expertise", 306, 236]];
    let orb = B.map((b) => P(`M200 160 L${b[1]} ${b[2]}`, C.mist, 2, 'stroke-dasharray="4 4"')).join("") + O(200, 168, 40, C.white, `stroke="${C.mist}" stroke-width="2"`) + man(200, 182, 1.7, C.teal);
    B.forEach((b, i) => { orb += K("ob" + i, pill(b[1], b[2], b[0], { st: i === 3 ? C.coral : C.navy, bg: C.white })); });
    orb += T(200, 284, "Confidence", 13, C.slate) + R(150, 258, 100, 10, "#dfe6ed", 5) + K("cf", R(150, 258, 100, 10, C.green, 5));
    s += H("orb", orb);
    return s;
  }, play: (c, j) => {
    c.op("lay", j === 0 ? 1 : 0); c.op("orb", j === 1 ? 1 : 0);
    const X = j === 0 ? [0, 0, -85, -85] : [0, 0, 0, 0];
    c.mv("st0", {}); c.mv("st3", { x: j === 0 ? -85 : 0 }, { dl: 0.9 });
    c.mv("st2", { x: X[2] }, { dl: 0.5, d: 1 });
    c.op("st1", j === 0 ? 0.15 : 1, { dl: 0.2 }); c.mv("st1", j === 0 ? { y: 30, s: 0.8 } : {}, { dl: 0.2 });
    c.mv("rcp", j === 0 ? { x: 150 } : {}, { d: 1.4, dl: 1 });
    c.op("wd", j === 0 ? 1 : 0, { dl: 1.8 });
    [0, 1, 2, 3].forEach((i) => c.op("ob" + i, j === 1 ? 1 : 0, { dl: j === 1 ? 0.2 + i * 0.2 : 0 }));
    c.mv("ob3", j === 1 ? { r: -5, y: 4 } : {}, { dl: 1.2 });
    c.mv("cf", { sx: j === 1 ? 0.35 : 1, pv: [150, 263] }, { dl: 1.2, d: 1.2 });
  } });

  // V7 (16-17) · adapted from https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5 — branch and merge
  vis.push({ r: [16, 17], art: () => {
    let s = H("ba", R(14, 24, 180, 252, C.white, 14, `stroke="${C.mist}" stroke-width="2"`) + T(104, 52, "Before", 16, C.navy) +
      traveller(52, 196, 1.15, C.blue) + man(146, 186, 1.15, C.teal) + desk(146, 200, 68) + R(84, 160, 26, 17, C.gold, 3) + arw(76, 168, 124, 168, C.slate, 2) +
      T(104, 260, "Staff check ID", 14, C.slate) +
      R(206, 24, 180, 252, C.white, 14, `stroke="${C.mist}" stroke-width="2"`) + T(296, 52, "After", 16, C.navy) +
      traveller(240, 196, 1.15, C.blue) + kiosk(330, 222, 1.1, C.navy) + man(360, 130, 0.95, C.teal) + qDot(378, 96, 10) +
      T(296, 260, "Kiosk checks ID", 14, C.slate));
    let f = D("m1", "M44 140 H360", C.navy, 4) + D("m2", "M112 140 C150 140 160 210 190 210 H280 C320 210 336 140 360 140", C.coral, 4);
    f += face(44, 140, 13, C.blue) + T(44, 116, "Guest", 13, C.navy) + O(112, 140, 13, C.navy) + T(112, 116, "Kiosk", 13, C.navy);
    f += O(360, 140, 13, C.green) + T(360, 116, "Helped", 13, C.green);
    f += H("ex", O(190, 210, 13, C.coral) + T(190, 244, "Exception", 13, C.coral));
    f += H("sf", O(280, 210, 13, C.teal) + T(280, 244, "Staff step in", 13, C.teal));
    f += H("rp", pill(200, 282, "Role expectations change", { st: C.amber, sz: 13 }));
    f += H("tok", face(112, 140, 8, C.gold));
    s += H("fl", f);
    return s;
  }, play: (c, j) => {
    c.op("ba", j === 0 ? 1 : 0); c.op("fl", j === 1 ? 1 : 0);
    c.dr("m1", j === 1 ? 1 : 0, { d: 0.9 }); c.dr("m2", j === 1 ? 1 : 0, { d: 1.2, dl: 0.6 });
    c.vis({ ex: j === 1, sf: j === 1, rp: j === 1, tok: j === 1 }, { dl: j === 1 ? 1 : 0 });
    c.mv("tok", j === 1 ? { x: 168, y: 70 } : {}, { d: 1.6, dl: 1.2, e: "power2.inOut" });
  } });

  // V8 (18-20) · adapted from https://observablehq.com/@d3/pie-chart-update — re-routing shares between two paths
  vis.push({ r: [18, 20], art: () => {
    let s = H("pth", P("M30 150 H130", C.slate, 4) + P("M130 150 L300 92", C.teal, 5) + P("M130 150 L300 216", C.slate, 5, 'stroke-dasharray="7 6"') +
      pill(206, 76, "New process", { st: C.teal }) + pill(210, 236, "Familiar practice", { st: C.slate }) +
      man(338, 232, 1.05, C.teal) + desk(338, 244, 64));
    s += H("k1", kiosk(330, 116, 0.85, C.navy));
    s += H("k3", kiosk(300, 116, 0.75, C.navy) + kiosk(360, 116, 0.75, C.navy) + okDot(300, 60, 9) + okDot(330, 52, 9) + okDot(360, 60, 9));
    s += H("t1", pill(200, 26, "Adoption = genuine use", { st: C.navy }));
    s += H("t2", pill(200, 26, "Kiosks idle, desk busy", { st: C.coral }));
    for (let i = 0; i < 6; i++) s += H("g" + i, face(40 + (i % 3) * 18, 140 + Math.floor(i / 3) * 20, 8, C.blue));
    s += H("inv", T(100, 70, "Investment", 15, C.navy) + rep(8, (i) => coin(100, 240 - i * 13, 26)) +
      arw(150, 180, 240, 180, C.slate, 2.6) + R(250, 110, 100, 130, C.white, 10, `stroke="${C.navy}" stroke-width="2.4"`) +
      K("lvl", R(252, 112, 96, 126, C.green, 8)) + T(300, 96, "Benefits", 15, C.green) + pill(300, 268, "Kiosks working", { st: C.teal, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ pth: j <= 1, k1: j === 0, k3: j === 1, t1: j === 0, t2: j === 1, inv: j === 2 });
    for (let i = 0; i < 6; i++) {
      const toNew = j === 0 && i < 4;
      const idx = toNew ? i : (j === 0 ? i - 4 : i);
      const t = 0.48 + idx * 0.08;
      const tx = lerp(130, 300, t), ty = (toNew ? lerp(150, 92, t) : lerp(150, 216, t)) - 12;
      const bx = 40 + (i % 3) * 18, by = 140 + Math.floor(i / 3) * 20;
      c.op("g" + i, j <= 1 ? 1 : 0, { dl: i * 0.08 });
      c.mv("g" + i, j <= 1 ? { x: tx - bx, y: ty - by } : {}, { d: 1.2, dl: 0.3 + i * 0.12, e: "power2.inOut" });
    }
    c.mv("lvl", { sy: j === 2 ? 0.22 : 1, pv: [300, 238] }, { d: 1.3, dl: 0.5 });
  } });

  // V9 (21-23) · adapted from https://motionarray.com/after-effects-templates/project-timeline-2424919/ — milestone strip with a travelling band
  vis.push({ r: [21, 23], art: () => {
    let s = T(200, 58, "BPM phases", 16, C.navy) + P("M30 104 H370", C.mist, 4);
    for (let i = 0; i < 10; i++) { const x = 30 + i * 37.8; s += K("ph" + i, O(x, 104, 13, C.navy) + T(x, 109, String(i + 1), 13, C.white)); }
    s += K("rib", R(20, 140, 360, 42, C.teal, 21));
    s += H("ribT", T(200, 167, "People change management", 15, C.white));
    const VB = [["Understand", 64], ["Shape", 154], ["Learn", 246], ["Sustain", 338]];
    VB.forEach((v, i) => { s += H("vb" + i, pill(v[1], 232, v[0], { bg: C.mint, st: C.green })); });
    s += H("cmp", pill(110, 236, "Finishing step", { st: C.coral, dash: 1 }) + cross(110, 268, 1.2, C.coral) +
      pill(290, 236, "Every phase", { bg: C.green, st: C.green, fg: C.white }) + okDot(290, 270, 11));
    s += H("late", R(330, 130, 48, 62, "none", 10, `stroke="${C.coral}" stroke-width="3" stroke-dasharray="6 4"`));
    return s;
  }, play: (c, j) => {
    for (let i = 0; i < 10; i++) c.op("ph" + i, 1, { dl: j === 0 ? i * 0.07 : 0 });
    c.mv("rib", { sx: j >= 0 ? 1 : 0, pv: [20, 161] }, { d: 1.4, dl: 0.4 });
    c.op("ribT", 1, { dl: 1 });
    [0, 1, 2, 3].forEach((i) => c.op("vb" + i, j === 1 ? 1 : 0, { dl: j === 1 ? i * 0.35 : 0 }));
    c.vis({ cmp: j === 2, late: j === 2 });
  } });

  // V10 (24-25) · adapted from https://observablehq.com/@d3/transition-end — chained transition: emit, hit, stay
  vis.push({ r: [24, 25], art: () => {
    let s = H("mg", mega(56, 150, 1.7, C.plum) + K("wv", waves(98, 150, 1.6, C.plum) + P("M150 120 L226 98 M150 150 H226 M150 180 L226 202", C.plum, 2, 'stroke-dasharray="5 6"')) +
      R(240, 70, 132, 56, C.white, 12, `stroke="${C.coral}" stroke-width="2.4"`) + T(306, 104, "Missing skills", 14, C.coral) +
      R(240, 174, 132, 56, C.white, 12, `stroke="${C.coral}" stroke-width="2.4"`) + T(306, 208, "Real concerns", 14, C.coral) +
      pill(130, 262, "Explanation alone", { st: C.plum }));
    s += H("wx", cross(232, 98, 1.3, C.coral, 4) + cross(232, 202, 1.3, C.coral, 4));
    s += H("tl", T(200, 62, "Programme health", 15, C.navy) + R(80, 74, 240, 22, "#e1e8ef", 11) + K("hb", R(80, 74, 240, 22, C.green, 11)) +
      P("M40 210 H360", C.navy, 3) + O(40, 210, 7, C.navy) + T(40, 240, "Today", 14, C.navy) + R(352, 192, 16, 36, C.coral, 3) + T(320, 252, "Launch day", 14, C.coral) +
      rep(5, (i) => H("cn" + i, bang(300 + (i % 3) * 22, 150 + Math.floor(i / 3) * 24, 10))));
    return s;
  }, play: (c, j) => {
    c.vis({ mg: j === 0, wx: j === 0, tl: j === 1 });
    c.mv("wx", j === 0 ? {} : { s: 0.2 }, { dl: 0.9 });
    for (let i = 0; i < 5; i++) { c.op("cn" + i, j === 1 ? 1 : 0, { dl: j === 1 ? 0.6 + i * 0.12 : 0 }); c.mv("cn" + i, j === 1 ? {} : { y: -50 }, { d: 0.8, dl: 0.6 + i * 0.12, e: "bounce.out" }); }
    c.mv("hb", { sx: j === 1 ? 0.3 : 1, pv: [80, 85] }, { d: 1.2, dl: 1.2 });
    c.fl("hb", j === 1 ? C.coral : C.green, { dl: 1.2 });
  } });

  // V11 (26-28) · adapted from https://dribbble.com/shots/27476599-Creative-Design-Workflow-Animation — assembling supports, then a line-chart teaser (https://observablehq.com/@d3/learn-d3-animation)
  vis.push({ r: [26, 28], art: () => {
    let s = H("ps", pill(130, 62, "Kiosk is faster", { sz: 18, st: C.teal }) + arw(180, 84, 284, 176, C.teal, 3) + man(306, 236, 1.5, C.teal) +
      pill(110, 182, "Not just persuasion", { bg: C.coral, st: C.coral, fg: C.white }));
    s += H("cd", K("plk", R(60, 112, 280, 30, C.navy, 8) + T(200, 132, "Redesigned process", 15, C.white)) +
      K("p1", R(96, 142, 48, 112, "#c9d6e3", 4)) + K("p2", R(256, 142, 48, 112, "#c9d6e3", 4)) + R(40, 254, 320, 8, C.slate, 3) +
      H("pp", pill(120, 280, "Understand work", { st: C.navy, sz: 13 }) + pill(280, 280, "Build conditions", { st: C.navy, sz: 13 })) +
      H("wk", man(200, 100, 1.1, C.teal) + okDot(222, 72, 10)));
    s += H("ch", P("M40 64 V244 H370", C.navy, 2.4) + P("M40 132 H370", C.slate, 1.6, 'stroke-dasharray="5 5"') + T(366, 124, "Baseline", 13, C.slate, "end") +
      D("ln", "M40 132 H170 C200 132 210 206 244 206 C270 206 286 162 300 150", C.coral, 4.5) + H("qm", qDot(244, 232, 13, C.coral)) +
      pill(200, 282, "Something uncomfortable", { st: C.coral, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ ps: j === 0, cd: j === 1, ch: j === 2 });
    c.mv("p1", { sy: j === 1 ? 1 : 0.02, pv: [120, 254] }, { d: 0.9, dl: 0.3 });
    c.mv("p2", { sy: j === 1 ? 1 : 0.02, pv: [280, 254] }, { d: 0.9, dl: 0.6 });
    c.mv("plk", j === 1 ? {} : { y: 40 }, { d: 0.9, dl: 0.9 });
    c.op("pp", j === 1 ? 1 : 0, { dl: 0.6 }); c.op("wk", j === 1 ? 1 : 0, { dl: 1.4 });
    c.dr("ln", j === 2 ? 1 : 0, { d: 1.6 }); c.op("qm", j === 2 ? 1 : 0, { dl: 1.4 });
  } });

  vis.splice(1, 2, merge(vis[1], vis[2])); // V2+V3: the proposal, then its numbers (10 visuals)
  VS[id] = makeScene({ id, N, labels, vis, bg: "#eef3f7",
    desc: "Qasr Marina's redesigned check-in: a guest's 23-minute wait, a kiosk design that cuts time to about 5 minutes and 40 percent of keystrokes, three supervisors' objections, and why adoption by people decides whether the design delivers value." });
  BG.push([id, "#eef3f7"]);
}

// ============================================================
// O1b · The performance dip: a cost to plan for · 31 moments · 11 visuals
// Story: the GM's timetable, learning at the desk, the dip named, the new-car
// analogy, a change curve drawn stage by stage, the cost area below baseline,
// the board's broken-promise trap, a costed change plan, and the hand-off.
// ============================================================
{
  const id = "O1b", N = 31;
  const labels = [
    "Reviewing the timetable", "Benefits wanted immediately", "Learning unfamiliar procedures", "Hesitation, questions, help",
    "Worse before better", "The performance dip", "A different car", "Unfamiliar controls slow you",
    "Practice restores confidence", "Guests feel the mistakes", "Before the announcement", "The baseline",
    "Uncertainty and resistance", "Performance falls", "Exploration builds confidence", "Recovery above baseline",
    "The cost below baseline", "Queues, staffing, slower service", "Manage it, not failure", "Promising immediate gains",
    "A broken promise?", "Support at risk", "Forecast depth and duration", "Resource the transition",
    "Ignored costs remain", "Measure the recovery", "Visible recovery convinces", "Shallower, shorter, not gone",
    "Judged by worst week", "Prepare people and sponsors", "Next: reception objections"
  ];
  const CURVE = "M40 120 H110 C140 120 150 130 170 140 C200 156 210 220 240 220 C270 220 282 170 300 120 C318 90 340 84 380 80";
  const AREA = "M110 120 C140 120 150 130 170 140 C200 156 210 220 240 220 C270 220 282 170 300 120 Z";
  const axes = (lab = true) => P("M40 40 V250 H382", C.navy, 2.4) + (lab ? T(22, 150, "Performance", 14, C.navy, "middle", 'transform="rotate(-90 22 150)"') + T(380, 272, "Time", 14, C.navy, "end") : "");
  const base = () => P("M40 120 H382", C.slate, 1.8, 'stroke-dasharray="6 5"') + T(380, 112, "Baseline", 13, C.slate, "end");
  const arcG = (cx, cy, r, col, w = 12) => P(`M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy}`, col, w);
  const car = (x, y, s, col) => F(`M${r1(x - 42 * s)} ${r1(y)} L${r1(x - 36 * s)} ${r1(y - 18 * s)} L${r1(x - 14 * s)} ${r1(y - 32 * s)} H${r1(x + 16 * s)} L${r1(x + 32 * s)} ${r1(y - 18 * s)} L${r1(x + 44 * s)} ${r1(y - 15 * s)} V${r1(y)} Z`, col) +
    F(`M${r1(x - 10 * s)} ${r1(y - 28 * s)} H${r1(x + 13 * s)} L${r1(x + 25 * s)} ${r1(y - 18 * s)} H${r1(x - 26 * s)} Z`, "#cfe6f3") + O(x - 24 * s, y, 9 * s, C.ink) + O(x + 26 * s, y, 9 * s, C.ink) + O(x - 24 * s, y, 3.5 * s, C.mist) + O(x + 26 * s, y, 3.5 * s, C.mist);
  const vis = [];

  // V1 (0-1) · adapted from https://motionarray.com/after-effects-templates/corporate-timeline-1939632/ — milestones revealed one by one
  vis.push({ r: [0, 1], art: () => {
    let s = man(70, 150, 1.5, C.plum) + pill(70, 200, "General manager", { st: C.plum, sz: 13 });
    s += R(146, 34, 238, 186, C.white, 14, `stroke="${C.mist}" stroke-width="2"`) + T(265, 60, "Check-in timetable", 15, C.navy);
    const RW = [["Design", 210, 40], ["Build", 244, 56], ["Train", 290, 46]];
    RW.forEach((r, i) => { s += T(158, 98 + i * 34, r[0], 14, C.slate, "start") + R(210, 86 + i * 34, 160, 16, "#edf1f5", 8) + K("gb" + i, R(r[1], 86 + i * 34, r[2], 16, C.blue, 8)); });
    s += T(158, 200, "Go-live", 14, C.coral, "start") + K("gl", P("M346 188 V208", C.coral, 3) + F("M346 188 l16 5 -16 5 Z", C.coral));
    s += H("up", arw(346, 286, 346, 230, C.gold, 4) + star(310, 252, 9) + star(372, 262, 7) + pill(214, 262, "Benefits immediately?", { st: C.coral, dash: 1 }));
    return s;
  }, play: (c, j) => {
    [0, 1, 2].forEach((i) => c.mv("gb" + i, { sx: 1, pv: [[210, 244, 290][i], 94 + i * 34] }, { d: 0.8, dl: i * 0.3 }));
    c.op("up", j === 1 ? 1 : 0); c.mv("up", j === 1 ? {} : { y: 30 }, { d: 0.9 });
  } });

  // V2 (2-3) · adapted from https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm — workers revealed with their actions
  vis.push({ r: [2, 3], art: () => {
    let s = H("lrn", pill(200, 36, "Learning new procedures", { st: C.amber }) + kiosk(110, 262, 1.6, C.navy) + man(220, 246, 1.5, C.teal) +
      book(240, 210, 34, 44, C.amber) + qDot(236, 178, 13) + T(110, 150, "New kiosk", 14, C.navy));
    const CD = [["Unusual booking", 71], ["Guest questions", 198], ["Supervisor helps", 325]];
    let v = "";
    CD.forEach((cd, i) => { v += K("cd" + i, R(cd[1] - 61, 40, 122, 214, C.white, 14, `stroke="${C.mist}" stroke-width="2"`) + T(cd[1], 238, cd[0], 13, C.navy)); });
    v += man(71, 170, 1.3, C.teal) + paper(78, 118, 34, 42, C.coral) + qDot(48, 100, 11);
    v += traveller(184, 182, 1.3, C.blue) + bubble(186, 70, 50, 40, C.plum, C.white, 0.2) + T(211, 98, "?", 22, C.plum);
    v += man(300, 182, 1.2, C.green) + man(352, 186, 1.1, C.teal) + arw(312, 128, 344, 140, C.green, 2.4) + T(312, 112, "Help", 14, C.green);
    s += H("vig", v);
    return s;
  }, play: (c, j) => {
    c.vis({ lrn: j === 0, vig: j === 1 });
    [0, 1, 2].forEach((i) => c.mv("cd" + i, j === 1 ? {} : { y: 20 }, { dl: i * 0.2 }));
  } });

  // V3 (4-5) · adapted from https://observablehq.com/@d3/arc-tween — gauge endpoints tweening to new values
  vis.push({ r: [4, 5], art: () => {
    let g = pill(200, 36, "Slower for a while", { st: C.coral });
    [[105, "Familiar way", C.green, 50], [295, "New way, today", C.coral, -45]].forEach((d, i) => {
      g += arcG(d[0], 180, 74, "#dfe6ed", 14) + T(d[0], 214, d[1], 14, d[2]) + K("nd" + i, P(`M${d[0]} 180 V${180 - 62}`, d[2], 5) + O(d[0], 180, 8, d[2]));
    });
    let s = H("gg", g);
    s += H("dp", P("M30 110 H370", C.slate, 1.8, 'stroke-dasharray="6 5"') + D("dc", "M30 110 H120 C160 110 170 210 210 210 C250 210 262 120 290 96 C310 80 340 76 370 74", C.coral, 5) +
      T(210, 244, "Performance dip", 22, C.coral) + pill(210, 278, "A normal change cost", { st: C.navy, sz: 13 }) + T(368, 102, "Baseline", 13, C.slate, "end"));
    return s;
  }, play: (c, j) => {
    c.vis({ gg: j === 0, dp: j === 1 });
    c.mv("nd0", { r: j === 0 ? 50 : 0, pv: [105, 180] }, { d: 1.2 });
    c.mv("nd1", { r: j === 0 ? -45 : 0, pv: [295, 180] }, { d: 1.2, dl: 0.3, e: "back.out(1.6)" });
    c.dr("dc", j === 1 ? 1 : 0, { d: 1.6 });
  } });

  // V4 (6-9) · adapted from https://lottiefiles.com/free-animation/delivery-truck-road-animation-K9xyRiku9v — vehicle on a road, then a cockpit gauge
  vis.push({ r: [6, 9], art: () => {
    let s = H("cars", R(-400, 232, 1200, 70, "#c9d2db") + P("M-400 262 H800", C.white, 3, 'stroke-dasharray="18 14"') +
      car(110, 228, 1.3, "#8a97a6") + T(110, 160, "Familiar car", 15, C.slate) + K("nc", car(290, 228, 1.3, C.teal)) + T(290, 160, "New car", 15, C.teal) +
      pill(200, 52, "Years of habit", { st: C.slate }));
    let d = R(24, 40, 352, 210, C.night, 18) + arcG(140, 190, 78, "#2c4560", 14) + K("ndl", P("M140 190 V124", C.gold, 5) + O(140, 190, 9, C.gold)) + T(140, 228, "Speed", 14, C.white);
    for (let i = 0; i < 6; i++) { const x = 258 + (i % 2) * 58, y = 78 + Math.floor(i / 2) * 50; d += R(x - 22, y - 16, 44, 32, "#2c4560", 8) + H("bq" + i, T(x, y + 7, "?", 18, C.gold)) + H("bk" + i, tick(x, y, 0.8, "#7fd6a0", 3)); }
    d += H("swt", F("M188 82 q8 12 0 18 q-8 -6 0 -18 Z", "#8fd3f4") + pill(200, 270, "Slower, less confident", { st: C.coral, sz: 13 }));
    d += H("prc", pill(200, 270, "Practice builds confidence", { st: C.green, sz: 13 }) + star(66, 66, 9) + star(214, 64, 9));
    s += H("dsh", d);
    s += H("dk", desk(150, 210, 150) + man(150, 198, 1.3, C.teal) + paper(170, 160, 30, 34, C.coral) + cross(185, 177, 0.9, C.coral) +
      rep(4, (i) => face(260 + i * 34, 214, 12, C.blue)) + T(310, 252, "Guests waiting", 14, C.coral) + pill(200, 50, "Mistakes reach guests", { st: C.coral }));
    return s;
  }, play: (c, j) => {
    c.vis({ cars: j === 0, dsh: j === 1 || j === 2, dk: j === 3 });
    c.mv("nc", j === 0 ? { x: 0 } : { x: 40 }, { d: 1 });
    c.mv("ndl", { r: j === 1 ? -62 : j === 2 ? 58 : 0, pv: [140, 190] }, { d: 1.4, e: "power2.out" });
    for (let i = 0; i < 6; i++) { c.op("bq" + i, j === 1 ? 1 : 0); c.op("bk" + i, j === 2 ? 1 : 0, { dl: j === 2 ? i * 0.12 : 0 }); }
    c.vis({ swt: j === 1, prc: j === 2 });
  } });

  // V5 (10-12) · adapted from https://observablehq.com/@d3/learn-d3-animation — axes and a series traced left to right
  vis.push({ r: [10, 12], art: () => {
    let s = axes() + H("ann", P("M110 50 V250", C.plum, 2, 'stroke-dasharray="5 4"') + pill(110, 34, "Announced", { st: C.plum, sz: 13 }));
    s += H("bl", base());
    s += D("s1", "M40 120 H110", C.navy, 5) + D("s2", "M110 120 C140 120 150 130 170 140", C.navy, 5);
    s += H("rz", R(112, 52, 60, 196, "rgba(102,74,143,.10)", 4) + man(126, 196, 0.9, C.teal) + man(156, 206, 0.9, C.teal) + qDot(126, 160, 9) + qDot(156, 170, 9) +
      pill(250, 200, "Uncertainty grows", { st: C.plum, sz: 13 }));
    s += H("bln", pill(232, 160, "Today's performance", { st: C.navy, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ ann: true, bl: j >= 1, rz: j === 2, bln: j === 1 });
    c.dr("s1", j >= 1 ? 1 : 0, { d: 0.9 }); c.dr("s2", j === 2 ? 1 : 0, { d: 0.9, dl: 0.4 });
  } });

  // V6 (13-15) · adapted from https://observablehq.com/@d3/hierarchy-traversal-animated — a marker visiting stages in order
  vis.push({ r: [13, 15], art: () => {
    let s = axes() + base();
    s += D("c1", "M40 120 H110 C140 120 150 130 170 140 C200 156 210 220 240 220", C.coral, 5);
    s += D("c2", "M240 220 C270 220 282 170 300 120", C.amber, 5);
    s += D("c3", "M300 120 C318 90 340 84 380 80", C.green, 5);
    s += H("up", F("M300 120 C318 90 340 84 380 80 V120 Z", "rgba(47,125,85,.18)"));
    s += H("l1", T(240, 248, "Performance dip", 15, C.coral));
    s += H("l2", bulb(212, 172, 0.9) + bulb(260, 160, 0.9) + pill(330, 196, "Exploration", { st: C.amber, sz: 13 }));
    s += H("l3", pill(320, 56, "Commitment", { bg: C.green, st: C.green, fg: C.white, sz: 13 }));
    s += K("mk", O(0, 0, 9, C.navy, `stroke="${C.white}" stroke-width="3"`));
    return s;
  }, play: (c, j) => {
    c.dr("c1", 1, { d: 1.2 }); c.dr("c2", j >= 1 ? 1 : 0, { d: 1 }); c.dr("c3", j >= 2 ? 1 : 0, { d: 1 });
    c.vis({ l1: j >= 0, l2: j >= 1, l3: j === 2, up: j === 2 });
    const M = [[240, 220], [300, 120], [380, 80]][j];
    c.mv("mk", { x: M[0], y: M[1] }, { d: 1.2, e: "power2.inOut" });
  } });

  // V7 (16-18) · adapted from https://observablehq.com/@d3/streamgraph-transitions — an area layer filling and taking labels
  vis.push({ r: [16, 18], art: () => {
    let s = axes(false) + base() + P(CURVE, C.navy, 4);
    s += K("ar", F(AREA, "rgba(207,75,58,.28)"));
    s += H("lo", T(240, 160, "Lost", 15, C.coral) + T(240, 178, "output", 15, C.coral));
    s += H("ic", rep(3, (i) => face(152 + i * 16, 162, 6, C.blue)) + man(232, 196, 0.75, C.green) + T(246, 186, "+", 16, C.green) + clock(268, 160, 10));
    s += H("pl", pill(72, 280, "Longer queues", { st: C.coral, sz: 13 }) + pill(200, 280, "Extra staffing", { st: C.coral, sz: 13 }) + pill(328, 280, "Slower service", { st: C.coral, sz: 13 }));
    s += H("st", pill(110, 60, "Failure?", { st: C.slate, dash: 1 }) + cross(110, 60, 2.2, C.coral, 4) + pill(290, 60, "Manage the dip", { bg: C.green, st: C.green, fg: C.white }));
    return s;
  }, play: (c, j) => {
    c.mv("ar", { sy: 1, pv: [200, 120] }, { d: 1 });
    c.vis({ lo: j === 0, ic: j >= 1, pl: j === 1, st: j === 2 });
    c.mv("ic", j >= 1 ? {} : { y: -60 }, { d: 0.9, e: "bounce.out" });
    c.mv("st", j === 2 ? {} : { s: 1.4 }, { d: 0.6 });
  } });

  // V8 (19-21) · adapted from https://lottiefiles.com/free-animation/project-dashboard-PeJUc2p1iB — data and collaborators revealed together
  vis.push({ r: [19, 21], art: () => {
    let s = rep(4, (i) => man(140 + i * 52, 160, 1.1, C.slate)) + E(220, 196, 150, 30, C.wood) + E(220, 192, 146, 26, "#b48a5c");
    s += man(46, 214, 1.35, C.plum);
    s += H("prm", bubble(20, 34, 176, 52, C.plum, C.white, 0.2) + T(108, 66, "Immediate gains", 15, C.plum) + arw(210, 84, 210, 40, C.green, 3.5));
    s += H("wk", cal(176, 168, 90, 46, C.coral, "Week 1") + P("M186 198 L204 194 L218 208 L236 206 L254 202", C.coral, 2.6));
    s += H("bg", rep(4, (i) => bang(150 + i * 52, 124, 9)) + pill(220, 52, "A broken promise?", { st: C.coral }));
    s += H("emp", rep(3, (i) => man(130 + i * 36, 284, 1, C.teal)) + T(300, 288, "Learning staff", 14, C.teal));
    s += D("rope", "M220 218 V256", C.green, 4);
    s += H("cut", P("M200 236 L240 246", C.coral, 4) + pill(310, 238, "Support at risk", { st: C.coral, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ prm: j === 0, wk: j >= 1, bg: j >= 1, emp: j === 2, cut: j === 2 });
    c.mv("wk", j >= 1 ? {} : { y: -40 }, { d: 0.8 });
    c.dr("rope", j === 2 ? 1 : 0, { d: 0.6 });
  } });

  // V9 (22-25) · adapted from https://motionarray.com/after-effects-templates/infographics-pack-135055/ — callouts, counters and chart primitives
  vis.push({ r: [22, 25], art: () => {
    const TB = [["1 Forecast", 80], ["2 Resource", 200], ["3 Measure", 320]];
    let s = "";
    TB.forEach((t, i) => { s += K("tb" + i, pill(t[1], 26, t[0], { st: C.navy, sz: 14 })) + H("ta" + i, pill(t[1], 26, t[0], { bg: C.navy, st: C.navy, fg: C.white, sz: 14 })); });
    s += H("fc", P("M40 70 V250 H382", C.navy, 2) + P("M40 110 H382", C.slate, 1.6, 'stroke-dasharray="6 5"') +
      P("M40 110 H110 C150 110 170 210 210 210 C250 210 262 120 300 104 H382", C.coral, 4) +
      arw(210, 112, 210, 204, C.plum, 2.4) + arw(210, 204, 210, 114, C.plum, 2.4) + T(226, 176, "Depth", 15, C.plum, "start") +
      arw(110, 232, 300, 232, C.plum, 2.4) + arw(300, 232, 110, 232, C.plum, 2.4) + T(205, 260, "Duration", 15, C.plum));
    const RC = [["Extra capacity", 70], ["Practical help", 200], ["Slower is OK", 330]];
    let rc = "";
    RC.forEach((r, i) => { rc += R(r[1] - 60, 64, 120, 150, C.white, 14, `stroke="${C.mist}" stroke-width="2"`) + T(r[1], 196, r[0], 13, C.navy); });
    rc += man(56, 150, 1.1, C.teal) + man(84, 150, 1.1, C.teal) + T(70, 106, "+2", 18, C.green);
    rc += man(186, 152, 1.1, C.green) + man(214, 156, 1, C.teal) + P("M196 140 Q200 130 206 140", C.green, 2.4);
    rc += clock(330, 134, 26, C.green) + okDot(352, 106, 10);
    rc += H("tags", ptag(70, 240, "Cost") + ptag(200, 240, "Cost") + ptag(330, 240, "Cost"));
    rc += H("dis", pill(200, 276, "Disruption remains anyway", { st: C.coral, sz: 13 }));
    s += H("rc", rc);
    s += H("ms", P("M40 70 V250 H382", C.navy, 2) + P("M40 110 H382", C.slate, 1.6, 'stroke-dasharray="6 5"') +
      rep(8, (i) => O(70 + i * 40, [150, 186, 200, 188, 166, 140, 120, 104][i], 6, C.green)) +
      rep(8, (i) => O(70 + i * 40, [150, 190, 206, 208, 207, 209, 206, 208][i], 6, C.coral)) +
      pill(290, 70, "Temporary learning", { st: C.green, sz: 13 }) + pill(300, 236, "Persistent problem", { st: C.coral, sz: 13 }) + T(60, 270, "Weekly", 13, C.slate, "start"));
    return s;
  }, play: (c, j) => {
    const a = j === 0 ? 0 : j <= 2 ? 1 : 2;
    [0, 1, 2].forEach((i) => { c.op("ta" + i, a === i ? 1 : 0); c.op("tb" + i, a === i ? 0 : 1); });
    c.vis({ fc: j === 0, rc: j === 1 || j === 2, ms: j === 3 });
    c.op("tags", j === 2 ? 1 : 0); c.mv("tags", j === 2 ? {} : { y: -30 }, { d: 0.7, e: "bounce.out" });
    c.op("dis", j === 2 ? 1 : 0, { dl: 0.8 });
  } });

  // V10 (26-28) · adapted from https://observablehq.com/@d3/path-tween — one path morphing into a shallower path
  vis.push({ r: [26, 28], art: () => {
    let s = H("rec", P("M40 70 V250 H382", C.navy, 2) + P("M40 150 H382", C.slate, 1.6, 'stroke-dasharray="6 5"') +
      D("rl", "M40 150 H90 C120 150 130 220 160 220 C200 220 230 150 260 130 C290 110 330 100 380 96", C.green, 5) +
      man(300, 228, 1.2, C.teal) + okDot(318, 196, 10) + T(300, 266, "Staff", 14, C.teal) + man(360, 228, 1.2, C.plum) + okDot(378, 196, 10) + T(360, 266, "Sponsor", 14, C.plum));
    s += H("two", P("M40 70 V250 H382", C.navy, 2) + P("M40 110 H382", C.slate, 1.6, 'stroke-dasharray="6 5"') +
      P("M40 110 H90 C130 110 140 236 200 236 C260 236 300 120 382 104", C.coral, 4, 'stroke-dasharray="8 6"') +
      D("mg", "M40 110 H90 C120 110 130 168 160 168 C200 168 220 116 280 98 C320 90 350 88 382 86", C.green, 5) +
      pill(300, 238, "Unmanaged", { st: C.coral, sz: 13 }) + pill(200, 60, "Managed", { bg: C.green, st: C.green, fg: C.white, sz: 13 }) + pill(118, 262, "Never zero", { st: C.navy, sz: 13 }));
    let w = T(200, 46, "Programme weeks", 15, C.navy);
    for (let i = 0; i < 8; i++) w += R(28 + i * 44, 70, 38, 60, i === 1 ? C.coral : i < 5 ? "#e7edf3" : C.mint, 6) + (i >= 5 ? star(47 + i * 44, 100, 10) : "");
    w += T(91, 150, "Worst week", 14, C.coral) + K("cutl", P("M250 60 V140", C.coral, 4, 'stroke-dasharray="7 5"')) + pill(250, 186, "Cancelled here?", { bg: C.coral, st: C.coral, fg: C.white }) +
      T(316, 150, "Benefits", 14, C.green) + pill(200, 252, "Judged too early", { st: C.navy });
    s += H("wks", w);
    return s;
  }, play: (c, j) => {
    c.vis({ rec: j === 0, two: j === 1, wks: j === 2 });
    c.dr("rl", j === 0 ? 1 : 0, { d: 1.6 }); c.dr("mg", j === 1 ? 1 : 0, { d: 1.6, dl: 0.3 });
    c.mv("cutl", j === 2 ? {} : { y: -60 }, { d: 0.8 });
  } });

  // V11 (29-30) · adapted from https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6 — people appear and assemble as a team
  vis.push({ r: [29, 30], art: () => {
    let s = H("cmp", R(20, 50, 170, 200, C.rose, 16) + T(105, 84, "Celebrate", 16, C.coral) + rep(7, (i) => O(50 + (i * 23) % 120, 120 + (i * 17) % 50, 4, [C.gold, C.coral, C.blue][i % 3])) +
      noDot(105, 200, 18) + R(210, 50, 170, 200, C.mint, 16) + T(295, 84, "Prepare", 16, C.green) + man(260, 160, 1.3, C.teal) + man(330, 160, 1.3, C.plum) +
      T(260, 196, "People", 13, C.teal) + T(330, 196, "Sponsors", 13, C.plum) + okDot(295, 226, 16));
    s += H("obj", desk(200, 210, 200) + man(150, 198, 1.2, C.teal) + man(200, 196, 1.2, C.teal) + man(250, 198, 1.2, C.teal) +
      rep(3, (i) => H("ob" + i, env(126 + i * 52, 118, 40, 28, C.coral))) + pill(200, 60, "Objections at reception", { st: C.coral }));
    return s;
  }, play: (c, j) => {
    c.vis({ cmp: j === 0, obj: j === 1 });
    [0, 1, 2].forEach((i) => { c.op("ob" + i, j === 1 ? 1 : 0, { dl: 0.4 + i * 0.2 }); c.mv("ob" + i, j === 1 ? {} : { y: 40, s: 0.5 }, { dl: 0.4 + i * 0.2, e: "back.out(1.8)" }); });
  } });

  vis.splice(0, 2, merge(vis[0], vis[1])); // V1+V2: the timetable, then learning at the desk (10 visuals)
  VS[id] = makeScene({ id, N, labels, vis, bg: "#f2f4f7",
    desc: "The performance dip at Qasr: learning the new check-in first lowers performance below the baseline, the area below baseline is a real cost, and a credible plan forecasts, resources and measures the recovery." });
  BG.push([id, "#f2f4f7"]);
}

// ============================================================
// O2a · What employees stand to lose · 27 moments · 10 visuals
// Every survey figure is drawn to scale and labelled exactly (79, 71, 14, 18, 62,
// 34, 41, 11, 83 percent of 84 staff); Marina's 30% is shown as a claim.
// ============================================================
{
  const id = "O2a", N = 27;
  const labels = [
    "The supervisors heard", "Three hotels object", "Exhibit 4: survey", "79% see frustration",
    "71% expect faster", "Just explain more?", "Exceptions: 18% vs 62%", "Role: 34% vs 41%",
    "Consulted: 11% vs 83%", "Resistance is elsewhere", "Open or quiet", "Weighing personal losses",
    "30% wrong bookings", "A case designers missed", "Cause: design fails", "Years of rescue skill",
    "Status looks worthless", "Four fewer agents", "41% fear job loss", "The last promise",
    "Organisational memory", "Heard through experience", "Shared cause: no involvement", "No part, no ownership",
    "Five minutes changes nothing", "Resistance as data", "A test is needed"
  ];
  const HOT = [["Marina", 92, 190], ["Corniche", 300, 120], ["Old Town", 250, 240]];
  const vis = [];

  // V1 (0-1) · adapted from https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy — routes traced between hubs
  vis.push({ r: [0, 1], art: () => {
    let s = H("tbl", E(200, 200, 150, 36, C.wood) + E(200, 196, 146, 32, "#b48a5c") + man(120, 160, 1.3, C.teal) + man(200, 154, 1.3, C.teal) + man(280, 160, 1.3, C.teal) +
      man(200, 262, 1.3, C.navy) + pill(200, 52, "Finally heard properly", { st: C.green }) +
      P("M232 250 q10 -8 0 -16 M240 254 q16 -12 0 -24", C.green, 2.4));
    let m = R(20, 20, 360, 260, "#dfeaf2", 18) + P("M20 110 Q120 90 200 120 T380 100 V20 H20 Z", "#c9dbe8", 0) + F("M20 110 Q120 90 200 120 T380 100 V20 H20 Z", "#cfe1ed");
    m += O(200, 160, 20, C.navy) + T(200, 166, "HQ", 14, C.white);
    HOT.forEach((h, i) => {
      m += D("rt" + i, `M${h[1]} ${h[2]} L200 160`, C.coral, 3) + F(`M${h[1]} ${h[2] - 2} c-10 -14 -12 -22 0 -30 c12 8 10 16 0 30 Z`, C.coral) + O(h[1], h[2] - 22, 4, C.white) +
        T(h[1], h[2] + 20, h[0], 14, C.navy) + H("le" + i, env(h[1] - 14, h[2] - 64, 28, 20, C.coral));
    });
    s += H("map", m);
    return s;
  }, play: (c, j) => {
    c.vis({ tbl: j === 0, map: j === 1 });
    [0, 1, 2].forEach((i) => { c.dr("rt" + i, j === 1 ? 1 : 0, { dl: i * 0.2 }); c.op("le" + i, j === 1 ? 1 : 0, { dl: 0.6 + i * 0.2 });
      c.mv("le" + i, j === 1 ? { x: 200 - HOT[i][1] + (i - 1) * 32, y: 160 - HOT[i][2] + 96 } : {}, { d: 1.2, dl: 0.9 + i * 0.2, e: "power2.inOut" }); });
  } });

  // V2 (2-5) · adapted from https://motionarray.com/after-effects-templates/infographics-v2-556482/ — statistic modules with numeric tweens
  vis.push({ r: [2, 5], art: () => {
    let s = R(18, 34, 196, 220, C.white, 14, `stroke="${C.mist}" stroke-width="2"`) + T(116, 58, "Exhibit 4: 84 staff", 14, C.navy);
    s += rep(100, (i) => `<rect data-k="wf" data-i="${i}" x="${30 + (i % 10) * 17.4}" y="${70 + Math.floor(i / 10) * 17.4}" width="14" height="14" rx="3" fill="#d9e1e9"/>`);
    s += T(116, 248, "1 square = 1%", 13, C.slate);
    s += NT("pc", 306, 120, "", 48, C.coral);
    s += H("t3", T(306, 156, "frustrates guests", 15, C.coral) + T(306, 178, "today's check-in", 13, C.slate));
    s += H("t4", T(306, 156, "expect faster", 15, C.teal) + T(306, 178, "14% disagree", 13, C.slate));
    s += H("t2", T(306, 120, "84", 52, C.navy) + T(306, 156, "front-desk staff", 15, C.navy) + T(306, 178, "surveyed", 13, C.slate));
    s += H("t5", bubble(228, 196, 158, 52, C.plum, C.white, 0.3) + T(307, 228, "Just explain more?", 14, C.plum));
    return s;
  }, play: (c, j) => {
    const v = j === 1 ? 79 : j >= 2 ? 71 : 0, col = j === 1 ? C.coral : C.teal;
    c.all('[data-k="wf"]').forEach((el) => { const i = +el.getAttribute("data-i"); c.flEl(el, i < v ? col : "#d9e1e9", { dl: i < v ? i * 0.008 : 0 }); });
    c.vis({ t2: j === 0, t3: j === 1, t4: j >= 2, t5: j === 3 });
    c.op("pc", j >= 1 ? 1 : 0); c.fl("pc", col);
    c.nm("pc", v, (x) => Math.round(x) + "%", { d: 1 });
  } });

  // V3 (6-8) · adapted from https://observablehq.com/@d3/stacked-to-grouped-bars — keyed bars growing from a shared axis
  vis.push({ r: [6, 8], art: () => {
    const SC = 1.7, RW = [["New design faster", 71, 14, 78], ["Handles our exceptions", 18, 62, 128], ["Role exists next year", 34, 41, 178], ["Was consulted", 11, 83, 228]];
    let s = T(120, 30, "Agree", 15, C.green) + T(280, 30, "Disagree", 15, C.coral) + P("M200 40 V246", C.navy, 2);
    RW.forEach((r, i) => {
      const g = R(200 - tw(r[0], 13) / 2, r[3] - 29, tw(r[0], 13), 18, "#f1f4f6", 6) + T(200, r[3] - 15, r[0], 13, C.navy) + K("a" + i, R(200 - r[1] * SC, r[3] - 9, r[1] * SC, 18, C.green, 4)) + K("d" + i, R(200, r[3] - 9, r[2] * SC, 18, C.coral, 4)) +
        T(200 - r[1] * SC - 6, r[3] + 5, r[1] + "%", 14, C.green, "end") + T(200 + r[2] * SC + 6, r[3] + 5, r[2] + "%", 14, C.coral, "start");
      s += (i === 0 ? K : H)("row" + i, g);
    });
    s += T(200, 278, "% of 84 staff", 13, C.slate);
    s += H("hl", R(14, 0, 372, 30, "none", 10, `stroke="${C.gold}" stroke-width="3"`));
    return s;
  }, play: (c, j) => {
    c.op("row0", 0.4);
    [1, 2, 3].forEach((i) => {
      const on = j >= i - 1;
      c.op("row" + i, on ? (i - 1 === j ? 1 : 0.55) : 0);
      c.mv("a" + i, { sx: on ? 1 : 0.01, pv: [200, 0] }, { d: 1, dl: 0.2 }); c.mv("d" + i, { sx: on ? 1 : 0.01, pv: [200, 0] }, { d: 1, dl: 0.2 });
    });
    c.op("hl", 1); c.mv("hl", { y: [128, 178, 228][j] - 24 }, { d: 0.7 });
  } });

  // V4 (9-11) · adapted from https://observablehq.com/@d3/transition-end — chained move, wait, recolour
  vis.push({ r: [9, 11], art: () => {
    let s = H("el", pill(100, 70, "Benefit believed", { bg: C.mint, st: C.green }) + okDot(176, 70, 12) + man(100, 180, 1.6, C.teal) + pill(100, 236, "Still opposed", { st: C.coral }) +
      arw(170, 180, 250, 180, C.slate, 3) + R(262, 128, 120, 104, C.white, 14, `stroke="${C.plum}" stroke-width="2.4" stroke-dasharray="6 5"`) + T(322, 172, "Something", 15, C.plum) + T(322, 194, "else", 15, C.plum) + qDot(322, 112, 12));
    s += H("oq", R(20, 40, 170, 220, C.white, 16, `stroke="${C.mist}" stroke-width="2"`) + T(105, 70, "Open objection", 15, C.coral) + man(90, 182, 1.6, C.teal) + P("M106 150 L120 100", C.teal, 6) + env(104, 196, 46, 30, C.coral) +
      R(210, 40, 170, 220, C.white, 16, `stroke="${C.mist}" stroke-width="2"`) + T(295, 70, "Quiet delay", 15, C.slate) + man(270, 182, 1.6, C.slate) + clock(334, 140, 22, C.slate) + T(334, 200, "Later...", 14, C.slate));
    s += H("bal", P("M200 250 V120", C.navy, 5) + F("M180 254 H220 L200 236 Z", C.navy) +
      K("beam", P("M90 120 H310", C.navy, 5) + P("M90 120 L60 170 M90 120 L120 170 M310 120 L280 170 M310 120 L340 170", C.slate, 1.6) +
        R(50, 170, 80, 12, C.green, 4) + T(90, 160, "Gains", 14, C.green) + R(270, 170, 80, 12, C.coral, 4) + R(276, 140, 68, 30, C.coral, 6) + T(310, 160, "Losses", 14, C.white)) +
      T(90, 268, "Organisation", 14, C.green) + T(310, 268, "Employee", 14, C.coral) + pill(200, 40, "Usually rational", { st: C.navy }));
    return s;
  }, play: (c, j) => {
    c.vis({ el: j === 0, oq: j === 1, bal: j === 2 });
    c.mv("beam", { r: j === 2 ? 12 : 0, pv: [200, 120] }, { d: 1.4, dl: 0.3, e: "elastic.out(1,0.5)" });
  } });

  // V5 (12-14) · adapted from https://codepen.io/WebGuyJeff/pen/rNdmqdO — tokens entering a kiosk flow and failing a branch
  vis.push({ r: [12, 14], art: () => {
    let s = "";
    for (let i = 0; i < 10; i++) s += K("tk" + i, face(38 + i * 36, 78, 13, C.blue) + R(30 + i * 36, 94, 16, 11, C.amber, 2));
    s += H("pc", pill(200, 32, "Marina: 30% wrong details", { st: C.coral, sz: 13 }));
    s += H("ks", kiosk(150, 262, 1.9, C.navy) + T(150, 134, "Kiosk", 15, C.navy) + R(244, 150, 136, 104, C.white, 12, `stroke="${C.slate}" stroke-width="2" stroke-dasharray="6 4"`) +
      T(312, 176, "Designers' map", 14, C.slate) + P("M262 210 H296 M296 210 H324", C.navy, 3) + P("M296 210 V236", C.coral, 3, 'stroke-dasharray="4 4"') + qDot(296, 236, 10) + bulb(48, 170, 1.3) + man(48, 250, 1.3, C.teal));
    s += H("jb", book(40, 140, 96, 126, C.green, "Jeston") + R(160, 160, 220, 80, C.white, 14, `stroke="${C.coral}" stroke-width="2.4"`) + T(270, 192, "Design fails", 17, C.coral) + T(270, 218, "a real case", 17, C.coral) +
      pill(270, 270, "One cause of resistance", { st: C.navy, sz: 13 }));
    return s;
  }, play: (c, j) => {
    for (let i = 0; i < 10; i++) {
      const bad = i === 2 || i === 5 || i === 8;
      c.op("tk" + i, j === 2 ? 0.25 : 1);
      c.all('[data-k="tk' + i + '"] circle').slice(0, 1).forEach((el) => c.flEl(el, bad ? C.coral : C.blue, { dl: i * 0.05 }));
      const n = [2, 5, 8].indexOf(i);
      c.mv("tk" + i, bad && j === 1 ? { x: 212 - (38 + i * 36), y: 150 + n * 40 - 78 } : {}, { d: 1.1, dl: i * 0.05 });
    }
    c.vis({ pc: j <= 1, ks: j === 1, jb: j === 2 });
  } });

  // V6 (15-16) · adapted from https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6 — a character group gains then loses a role marker
  vis.push({ r: [15, 16], art: () => {
    let s = man(110, 230, 2, C.teal) + K("badge", star(140, 168, 16) + O(140, 168, 21, "none", `stroke="${C.gold}" stroke-width="2"`));
    s += H("rep", R(200, 70, 120, 74, C.white, 8, `stroke="${C.coral}" stroke-width="2.4"`) + P("M206 88 H300 M206 104 H290 M206 120 H280", C.mist, 3) + K("crk", P("M262 70 L252 96 L268 110 L256 144", C.coral, 3)) +
      R(176, 186, 70, 44, C.slate, 6) + P("M196 186 v-8 h30 v8", C.slate, 3) + T(260, 50, "Broken booking", 15, C.coral));
    s += H("yrs", T(110, 286, "Years of skill", 14, C.teal) + rep(8, (i) => R(40 + i * 18, 256, 12, 12, C.teal, 2)));
    s += H("kio", kiosk(320, 262, 2, C.navy) + arw(250, 110, 296, 140, C.navy, 2.4));
    s += H("lost", pill(200, 28, "Status looks worthless", { st: C.coral }));
    return s;
  }, play: (c, j) => {
    c.vis({ rep: j === 0, yrs: j === 0, kio: j === 1, lost: j === 1 });
    c.mv("badge", j === 1 ? { s: 0.45, y: 30 } : { s: 1 }, { d: 1.2, dl: 0.4 }); c.op("badge", j === 1 ? 0.35 : 1, { dl: 0.4 });
  } });

  // V7 (17-18) · adapted from https://motionarray.com/after-effects-templates/infographics-3844461/ — statistic graphics in sequence
  vis.push({ r: [17, 18], art: () => {
    let s = H("cor", bubble(24, 24, 178, 54, C.coral, C.white, 0.2) + T(113, 57, "Costed on four fewer", 13, C.coral) +
      man(70, 196, 1.4, C.teal) + T(70, 240, "Corniche", 14, C.slate) + R(150, 110, 230, 120, C.white, 14, `stroke="${C.mist}" stroke-width="2"`) + T(265, 134, "Agents per shift", 14, C.navy) +
      rep(4, (i) => K("ag" + i, man(186 + i * 52, 196, 1.2, C.blue))) + pill(265, 262, "Four fewer: say so", { bg: C.coral, st: C.coral, fg: C.white }));
    let g = "";
    for (let i = 0; i < 100; i++) { const x = 32 + (i % 10) * 17, y = 66 + Math.floor(i / 10) * 20; g += `<g data-k="pp" data-i="${i}">${man(x, y + 6, 0.42, "#b9c6d3")}</g>`; }
    s += H("svy", T(116, 40, "Role gone next year", 14, C.navy) + g + NT("p41", 300, 150, "41%", 52, C.coral) + T(300, 192, "Role gone", 16, C.navy) + pill(300, 254, "A shared fear", { st: C.coral }));
    return s;
  }, play: (c, j) => {
    c.vis({ cor: j === 0, svy: j === 1 });
    [0, 1, 2, 3].forEach((i) => { c.op("ag" + i, j === 0 ? 0.25 : 1, { dl: 0.6 + i * 0.2 }); c.mv("ag" + i, j === 0 ? { y: 10 } : {}, { dl: 0.6 + i * 0.2 }); });
    c.all('[data-k="pp"]').forEach((el) => { const i = +el.getAttribute("data-i"); c.all('[data-k="pp"][data-i="' + i + '"] *').forEach((p) => c.flEl(p, j === 1 && i < 41 ? C.coral : "#b9c6d3", { dl: i * 0.012 })); });
  } });

  // V8 (19-21) · adapted from https://motionarray.com/after-effects-templates/scrolling-timeline-1223172/ — a strip scrolling back to a past event
  vis.push({ r: [19, 21], art: () => {
    let s = H("old", R(40, 70, 150, 110, C.slate, 10) + R(52, 82, 126, 76, "#a9b8c7", 4) + R(100, 180, 30, 20, C.slate) + R(76, 198, 78, 8, C.slate, 3) + T(115, 126, "Last system", 15, C.white) +
      bubble(210, 64, 168, 60, C.plum, C.white, 0.15) + T(294, 100, "Jobs will be easier", 14, C.plum) + man(300, 250, 1.4, C.teal) + T(300, 286, "Old Town", 14, C.slate));
    let f = R(-10, 70, 420, 130, C.ink, 4) + rep(22, (i) => R(-6 + i * 20, 76, 10, 8, C.white, 1) + R(-6 + i * 20, 186, 10, 8, C.white, 1));
    [["Promise", C.plum], ["Rollout", C.blue], ["Outcome", C.coral]].forEach((p, i) => { f += R(28 + i * 120, 92, 104, 86, "#2a3d55", 4) + T(80 + i * 120, 142, p[0], 15, p[1] === C.coral ? "#ff9b8a" : C.white); });
    s += H("film", K("strip", f) + pill(200, 240, "Organisational memory", { st: C.navy }));
    s += H("lens", pill(80, 60, "Today's promise", { st: C.plum }) + arw(80, 82, 160, 150, C.plum, 2.6) + O(200, 170, 50, "rgba(207,75,58,.18)", `stroke="${C.coral}" stroke-width="4"`) +
      T(200, 166, "Memory", 15, C.coral) + T(200, 186, "filter", 15, C.coral) + arw(250, 170, 330, 120, C.coral, 2.6) + pill(310, 90, "Heard with doubt", { st: C.coral, sz: 13 }) +
      pill(200, 264, "If redundancies followed", { st: C.slate, sz: 13, dash: 1 }));
    return s;
  }, play: (c, j) => {
    c.vis({ old: j === 0, film: j === 1, lens: j === 2 });
    c.mv("strip", j === 1 ? { x: 0 } : { x: -120 }, { d: 1.4 });
  } });

  // V9 (22-24) · adapted from https://old.observablehq.com/@d3/hierarchy-traversal-animated — leaves traced down to a shared root
  vis.push({ r: [22, 24], art: () => {
    const CS = [["Marina", 70], ["Corniche", 200], ["Old Town", 330]];
    let s = "";
    CS.forEach((cs, i) => { s += K("cc" + i, R(cs[1] - 56, 30, 112, 46, C.white, 10, `stroke="${C.coral}" stroke-width="2"`) + T(cs[1], 59, cs[0], 15, C.coral)); });
    s += H("rt", D("r0", "M70 76 C70 150 200 150 200 196", C.navy, 4) + D("r1", "M200 76 V196", C.navy, 4) + D("r2", "M330 76 C330 150 200 150 200 196", C.navy, 4) +
      R(110, 196, 180, 62, C.navy, 14) + T(200, 222, "No involvement", 16, C.white) + T(200, 246, "83%", 15, C.gold));
    s += H("own", R(110, 110, 180, 120, "rgba(228,238,247,.9)", 12, `stroke="${C.blue}" stroke-width="3"`) + T(200, 140, "The design", 15, C.navy) + P("M136 176 H264", C.navy, 4) + P("M150 196 H250", C.navy, 4) +
      man(56, 230, 1.3, C.teal) + man(344, 230, 1.3, C.teal) + T(200, 272, "Ownership", 14, C.navy) + R(250, 262, 110, 12, "#dfe6ed", 6) + noDot(372, 268, 10));
    s += H("five", mega(40, 160, 1.6, C.plum) + pill(110, 230, "Just 5 minutes", { st: C.plum, sz: 13 }) + K("wv", waves(80, 160, 1.6, C.plum)) +
      R(190, 102, 180, 36, C.white, 10, `stroke="${C.coral}" stroke-width="2"`) + T(280, 126, "Lost expertise", 14, C.coral) +
      R(190, 146, 180, 36, C.white, 10, `stroke="${C.coral}" stroke-width="2"`) + T(280, 170, "Job fear", 14, C.coral) +
      R(190, 190, 180, 36, C.white, 10, `stroke="${C.coral}" stroke-width="2"`) + T(280, 214, "Broken trust", 14, C.coral) +
      pill(280, 262, "Causes unchanged", { bg: C.coral, st: C.coral, fg: C.white, sz: 13 }));
    return s;
  }, play: (c, j) => {
    [0, 1, 2].forEach((i) => { c.op("cc" + i, j === 0 ? 1 : 0); c.dr("r" + i, j === 0 ? 1 : 0, { dl: i * 0.2 }); });
    c.vis({ rt: j === 0, own: j === 1, five: j === 2 });
  } });

  // V10 (25-26) · adapted from https://dribbble.com/shots/26275497-Workflow-AI-Animation — data ingested, cleaned and charted
  vis.push({ r: [25, 26], art: () => {
    let s = H("dat", rep(3, (i) => env(26, 50 + i * 54, 56, 38, C.coral)) + F("M100 50 H170 L150 150 V230 H120 V150 Z", "#d6e2ec") + T(135, 100, "Data", 14, C.navy) +
      R(200, 50, 180, 180, C.white, 12, `stroke="${C.mist}" stroke-width="2"`) + rep(5, (i) => K("cb" + i, R(222 + i * 30, 200 - [40, 70, 50, 110, 60][i], 20, [40, 70, 50, 110, 60][i], i === 3 ? C.coral : C.blue, 3))) +
      P("M312 84 V70", C.ink, 2) + F("M312 70 l16 5 -16 5 Z", C.coral) + pill(290, 262, "Design wrong?", { st: C.coral }));
    s += H("tst", pill(200, 46, "Marina objection", { st: C.coral, sz: 15 }) + P("M200 64 V110 M200 110 L110 170 M200 110 L290 170", C.navy, 3) +
      R(40, 170, 140, 60, C.white, 14, `stroke="${C.plum}" stroke-width="2.4"`) + T(110, 206, "Resistance?", 16, C.plum) +
      R(220, 170, 140, 60, C.white, 14, `stroke="${C.coral}" stroke-width="2.4"`) + T(290, 206, "Design defect?", 16, C.coral) + pill(200, 270, "A proper test", { bg: C.navy, st: C.navy, fg: C.white }));
    return s;
  }, play: (c, j) => {
    c.vis({ dat: j === 0, tst: j === 1 });
    for (let i = 0; i < 5; i++) c.mv("cb" + i, { sy: j === 0 ? 1 : 0.05, pv: [0, 200] }, { d: 0.8, dl: 0.3 + i * 0.12 });
  } });

  VS[id] = makeScene({ id, N, labels, vis, bg: "#f1f4f6",
    desc: "The staff survey at Qasr: 79 percent say check-in frustrates guests and 71 percent expect the new design to be faster, yet only 18 percent trust it with exceptions, 41 percent fear for their role and 83 percent were never consulted; the three objections share a root in no involvement." });
  BG.push([id, "#f1f4f6"]);
}

addStyles(BG);
})();
// END FILE w04-claude-v2-part1.js

// OPER621 · Week 4 · BPM and Organisational Change — animated teaching scenes (v2)
// File: w04-claude-v2-part2.js  ·  Scenes: O2b, O2c, O3a
// Standalone part: registers its own scenes and appends its own scoped rules into the
// single shared <style id="vl-sc-w04">. Parts may be loaded in any order or concatenated.
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
// Design rule for v2: every narration moment k maps to exactly one visual (8-11 visuals per
// section, a new one every 2-4 sentences); each visual names the benchmark template whose
// motion grammar it adapts (URL in a comment). Artwork and code are original.
(() => {
"use strict";
window.VL_SCENES = window.VL_SCENES || {};
const VS = window.VL_SCENES;
const PART = "part2";

// ---------- palette ----------
const C = {
  navy: "#173f6b", ink: "#14263b", blue: "#2c6ea6", sky: "#e4eef7", teal: "#12858c",
  green: "#2f7d55", mint: "#e2f2e8", amber: "#a86f0a", gold: "#efc25a", coral: "#cf4b3a",
  rose: "#fbe3dd", plum: "#664a8f", lilac: "#ece6f5", slate: "#5b6f85", mist: "#cfd9e4",
  paper: "#fffdf8", white: "#ffffff", sand: "#f3ead9", red: "#b3302f", wood: "#9a7349", night: "#10263d"
};

// ---------- small utilities ----------
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const num = (v, f) => { const x = Number(v); return Number.isFinite(x) ? x : f; };
const reduced = () => {
  try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
  catch (_) { return false; }
};
const gsapOK = () => !!(window.gsap && typeof window.gsap.to === "function" && typeof window.gsap.set === "function") && !reduced();
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");
const inR = (k, a, b) => k >= a && k <= b;
const r1 = (v) => Math.round(v * 10) / 10;
const lerp = (a, b, t) => a + (b - a) * t;
const warn = (m) => { try { if (window.console) window.console.warn("[VL W04 " + PART + "] " + m); } catch (_) {} };

// ---------- SVG string builders ----------
const R = (x, y, w, h, f, rx = 0, ex = "") => `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${r1(rx)}" fill="${f}" ${ex}/>`;
const O = (cx, cy, r, f, ex = "") => `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}" fill="${f}" ${ex}/>`;
const E = (cx, cy, rx, ry, f, ex = "") => `<ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="${f}" ${ex}/>`;
const P = (d, s, w = 2, ex = "") => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const F = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
const D = (k, d, s, w = 3, ex = "") => `<path data-k="${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100" ${ex}/>`;
const T = (x, y, s, sz = 15, f = C.ink, a = "middle", ex = "") => `<text x="${r1(x)}" y="${r1(y)}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const NT = (k, x, y, s, sz = 15, f = C.ink, a = "middle", ex = "") => `<text data-k="${k}" x="${r1(x)}" y="${r1(y)}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const K = (k, b, ex = "") => `<g data-k="${k}" ${ex}>${b}</g>`;
const H = (k, b, ex = "") => `<g data-k="${k}" style="opacity:0" ${ex}>${b}</g>`;
const tw = (s, sz) => Math.round(String(s).length * sz * 0.58 + sz * 1.3);
const pill = (x, y, s, o = {}) => {
  const sz = o.sz || 14, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.85);
  return R(x - w / 2, y - h / 2, w, h, o.bg || C.white, o.rx == null ? h / 2 : o.rx,
    `stroke="${o.st || C.navy}" stroke-width="${o.sw || 1.8}"${o.dash ? ' stroke-dasharray="5 4"' : ""}`) +
    T(x, y + sz * 0.36, s, sz, o.fg || o.st || C.navy);
};
const arw = (x1, y1, x2, y2, col = C.navy, w = 2.4, ex = "") => {
  const a = Math.atan2(y2 - y1, x2 - x1), L = 8 + w * 1.6, Wd = 4 + w * 1.1;
  const bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
  return P(`M${r1(x1)} ${r1(y1)} L${r1(bx)} ${r1(by)}`, col, w, ex) +
    F(`M${r1(x2)} ${r1(y2)} L${r1(bx + Wd * Math.sin(a))} ${r1(by - Wd * Math.cos(a))} L${r1(bx - Wd * Math.sin(a))} ${r1(by + Wd * Math.cos(a))} Z`, col);
};

// ---------- icon library (all coordinates absolute; no transform attributes on keyed nodes) ----------
const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${r1(x - 7 * s)} ${r1(y)} l${r1(5 * s)} ${r1(5 * s)} l${r1(10 * s)} ${r1(-11 * s)}`, col, w);
const cross = (x, y, s = 1, col = C.coral, w = 3) => P(`M${r1(x - 6 * s)} ${r1(y - 6 * s)} l${r1(12 * s)} ${r1(12 * s)} M${r1(x + 6 * s)} ${r1(y - 6 * s)} l${r1(-12 * s)} ${r1(12 * s)}`, col, w);
const okDot = (x, y, r = 10, col = C.green) => O(x, y, r, col) + tick(x, y, r / 15, C.white, Math.max(2, r / 5));
const noDot = (x, y, r = 10, col = C.coral) => O(x, y, r, col) + cross(x, y, r / 15, C.white, Math.max(2, r / 5));
const bang = (x, y, r = 10, col = C.coral) => O(x, y, r, col) + T(x, y + r * 0.45, "!", Math.max(13, Math.round(r * 1.3)), C.white);
const qDot = (x, y, r = 10, col = C.plum) => O(x, y, r, col) + T(x, y + r * 0.45, "?", Math.max(13, Math.round(r * 1.3)), C.white);
const man = (x, y, s = 1, col = C.navy) => O(x, y - 17 * s, 8 * s, col) +
  F(`M${r1(x - 13 * s)} ${r1(y + 12 * s)} Q${r1(x - 13 * s)} ${r1(y - 5 * s)} ${r1(x)} ${r1(y - 5 * s)} Q${r1(x + 13 * s)} ${r1(y - 5 * s)} ${r1(x + 13 * s)} ${r1(y + 12 * s)} Z`, col);
const traveller = (x, y, s = 1, col = C.blue) => man(x, y, s, col) + R(x + 12 * s, y - 1 * s, 12 * s, 14 * s, C.amber, 2 * s) +
  P(`M${r1(x + 15 * s)} ${r1(y - 1 * s)} v${r1(-4 * s)} h${r1(6 * s)} v${r1(4 * s)}`, C.amber, 1.6 * s);
const face = (x, y, r = 9, col = C.blue) => O(x, y, r, col) + O(x - r * 0.34, y - r * 0.15, r * 0.15, C.white) + O(x + r * 0.34, y - r * 0.15, r * 0.15, C.white) +
  P(`M${r1(x - r * 0.36)} ${r1(y + r * 0.3)} Q${r1(x)} ${r1(y + r * 0.58)} ${r1(x + r * 0.36)} ${r1(y + r * 0.3)}`, C.white, Math.max(1.2, r * 0.13));
const kiosk = (x, y, s = 1, col = C.navy) => R(x - 14 * s, y - 52 * s, 28 * s, 52 * s, col, 5 * s) + R(x - 10 * s, y - 47 * s, 20 * s, 15 * s, "#bfe3f2", 2 * s) +
  R(x - 7 * s, y - 25 * s, 14 * s, 4 * s, "#9fb4c8", 1) + R(x - 18 * s, y, 36 * s, 5 * s, col, 2 * s);
const desk = (x, y, w = 90, col = C.wood) => R(x - w / 2 - 4, y - 6, w + 8, 8, "#6f5233", 3) + R(x - w / 2, y, w, 26, col, 3);
const clock = (x, y, r, col = C.coral, bg = C.white) => O(x, y, r, bg, `stroke="${col}" stroke-width="${r1(Math.max(2, r / 6))}"`) +
  P(`M${r1(x)} ${r1(y - r * 0.6)} V${r1(y)} L${r1(x + r * 0.42)} ${r1(y + r * 0.28)}`, col, r1(Math.max(2, r / 7)));
const paper = (x, y, w, h, col = C.navy, n = 3) => R(x, y, w, h, C.white, 4, `stroke="${col}" stroke-width="1.8"`) +
  rep(n, (i) => P(`M${r1(x + 7)} ${r1(y + 12 + i * (h - 18) / Math.max(1, n))} H${r1(x + w - 7 - (i === n - 1 ? w * 0.3 : 0))}`, C.mist, 2.2));
const env = (x, y, w, h, col = C.navy, bg = C.white) => R(x, y, w, h, bg, 3, `stroke="${col}" stroke-width="1.8"`) +
  P(`M${r1(x)} ${r1(y)} L${r1(x + w / 2)} ${r1(y + h * 0.55)} L${r1(x + w)} ${r1(y)}`, col, 1.8);
const coin = (x, y, r = 12, col = C.gold) => E(x, y, r, r * 0.42, col, `stroke="${C.amber}" stroke-width="1.5"`);
const star = (x, y, r, col = C.gold) => {
  let d = "";
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; d += (i ? "L" : "M") + r1(x + rr * Math.cos(a)) + " " + r1(y + rr * Math.sin(a)); }
  return F(d + "Z", col);
};
const bulb = (x, y, s = 1, col = C.gold) => O(x, y, 10 * s, col) + R(x - 5 * s, y + 8 * s, 10 * s, 7 * s, C.slate, 2) +
  P(`M${r1(x - 16 * s)} ${r1(y - 8 * s)} l${r1(-5 * s)} ${r1(-4 * s)} M${r1(x + 16 * s)} ${r1(y - 8 * s)} l${r1(5 * s)} ${r1(-4 * s)} M${r1(x)} ${r1(y - 16 * s)} v${r1(-6 * s)}`, col, 2.2);
const mega = (x, y, s = 1, col = C.plum) => R(x - 9 * s, y - 6 * s, 9 * s, 12 * s, col, 2) +
  F(`M${r1(x)} ${r1(y - 6 * s)} L${r1(x + 24 * s)} ${r1(y - 16 * s)} V${r1(y + 16 * s)} L${r1(x)} ${r1(y + 6 * s)} Z`, col) +
  P(`M${r1(x - 4 * s)} ${r1(y + 6 * s)} l${r1(3 * s)} ${r1(12 * s)}`, col, 3 * s);
const waves = (x, y, s = 1, col = C.plum) => rep(3, (i) => P(`M${r1(x + (8 + i * 9) * s)} ${r1(y - (8 + i * 6) * s)} Q${r1(x + (14 + i * 11) * s)} ${r1(y)} ${r1(x + (8 + i * 9) * s)} ${r1(y + (8 + i * 6) * s)}`, col, 2.4));
const cal = (x, y, w, h, col = C.navy, title = "") => R(x, y, w, h, C.white, 6, `stroke="${col}" stroke-width="1.8"`) + R(x, y, w, 18, col, 6) + R(x, y + 9, w, 9, col) +
  (title ? T(x + w / 2, y + 14, title, 13, C.white) : "");
const lockI = (x, y, s = 1, col = C.red) => R(x - 9 * s, y - 2 * s, 18 * s, 14 * s, col, 2) +
  P(`M${r1(x - 5 * s)} ${r1(y - 2 * s)} v${r1(-5 * s)} a${r1(5 * s)} ${r1(5 * s)} 0 0 1 ${r1(10 * s)} 0 v${r1(5 * s)}`, col, r1(2.2 * s));
const shieldI = (x, y, s = 1, col = C.green) => F(`M${r1(x)} ${r1(y - 14 * s)} L${r1(x + 12 * s)} ${r1(y - 9 * s)} V${r1(y + 1 * s)} Q${r1(x + 12 * s)} ${r1(y + 11 * s)} ${r1(x)} ${r1(y + 15 * s)} Q${r1(x - 12 * s)} ${r1(y + 11 * s)} ${r1(x - 12 * s)} ${r1(y + 1 * s)} V${r1(y - 9 * s)} Z`, col);
const heart = (x, y, s = 1, col = C.coral) => F(`M${r1(x)} ${r1(y + 9 * s)} C${r1(x - 15 * s)} ${r1(y - 1 * s)} ${r1(x - 9 * s)} ${r1(y - 13 * s)} ${r1(x)} ${r1(y - 5 * s)} C${r1(x + 9 * s)} ${r1(y - 13 * s)} ${r1(x + 15 * s)} ${r1(y - 1 * s)} ${r1(x)} ${r1(y + 9 * s)} Z`, col);
const cog = (x, y, r, col = C.slate, hole = C.white) => {
  let d = "";
  for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, rr = i % 2 ? r * 0.8 : r; d += (i ? "L" : "M") + r1(x + rr * Math.cos(a)) + " " + r1(y + rr * Math.sin(a)); }
  return F(d + "Z", col) + O(x, y, r * 0.35, hole);
};
const ptag = (x, y, s, col = C.amber) => {
  const sz = 13, w = tw(s, sz) + 12, h = 26;
  return F(`M${r1(x - w / 2)} ${r1(y)} L${r1(x - w / 2 + 12)} ${r1(y - h / 2)} H${r1(x + w / 2)} V${r1(y + h / 2)} H${r1(x - w / 2 + 12)} Z`, C.white, `stroke="${col}" stroke-width="2"`) +
    O(x - w / 2 + 11, y, 3, col) + T(x + 6, y + 4.7, s, sz, col);
};
const bubble = (x, y, w, h, col = C.navy, bg = C.white, tx = 0.2) => R(x, y, w, h, bg, 12, `stroke="${col}" stroke-width="1.8"`) +
  F(`M${r1(x + w * tx)} ${r1(y + h - 1)} l-6 13 l16 -13 Z`, bg, `stroke="${col}" stroke-width="1.8" stroke-linejoin="round"`) + R(x + w * tx - 7, y + h - 4, 20, 4, bg);
const cloudI = (x, y, s = 1, col = "#9aa9b8") => O(x - 14 * s, y, 11 * s, col) + O(x, y - 7 * s, 14 * s, col) + O(x + 15 * s, y, 11 * s, col) + R(x - 25 * s, y, 51 * s, 11 * s, col, 5 * s);
const book = (x, y, w, h, col = C.green, t = "") => R(x, y, w, h, col, 4) + R(x + 5, y + 4, w - 10, h - 8, "rgba(255,255,255,.18)", 3) + P(`M${r1(x + 9)} ${r1(y + 3)} V${r1(y + h - 3)}`, "rgba(0,0,0,.25)", 2) + (t ? T(x + w / 2 + 4, y + h / 2 + 5, t, 13, C.white) : "");
const grid4 = (x, y, w, h, col = C.slate) => R(x, y, w, h, "none", 6, `stroke="${col}" stroke-width="2"`) + P(`M${r1(x + w / 2)} ${r1(y)} V${r1(y + h)} M${r1(x)} ${r1(y + h / 2)} H${r1(x + w)}`, col, 1.8, 'stroke-dasharray="5 4"');

// ---------- stylesheet (scoped per scene, appended once per part into <style id="vl-sc-w04">) ----------
function sceneCSS(id, bg) {
  const s = ".vls-w04-" + id;
  return `
${s}{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:200px;overflow:hidden!important;box-sizing:border-box;border-radius:16px;background:${bg};color:${C.ink};font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w04-stage{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w04-stage>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}
${s} svg text{font-family:inherit;font-weight:700;letter-spacing:.15px}
${s} [data-k],${s} [data-v]{transform-box:fill-box;transform-origin:50% 50%}
${s}.w04-css [data-k],${s}.w04-css [data-v]{transition-property:transform,opacity,fill,stroke-dashoffset;transition-duration:.8s;transition-timing-function:cubic-bezier(.2,.8,.25,1)}
${s}.w04-snap [data-k],${s}.w04-snap [data-v],${s}.w04-rm [data-k],${s}.w04-rm [data-v]{transition:none!important}
${s}.w04-rm *,${s}.w04-snap *{animation:none!important}
${s} .w04-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:38px;padding:6px 12px 8px;font-size:15px;font-weight:800;line-height:1.2;color:${C.navy};background:rgba(255,255,255,.66);border-top:1px solid rgba(23,63,107,.14)}
${s} .w04-no{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w04-txt{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.2px}
${s} .w04-txt.w04-in{animation:vlsw04In .45s cubic-bezier(.2,.8,.25,1)}
${s} .w04-pr{flex:0 0 56px;height:5px;border-radius:5px;background:rgba(23,63,107,.15);overflow:hidden}
${s} .w04-pr i{display:block;height:100%;width:0;background:${C.coral};transition:width .6s ease}
${s}.w04-intro .w04-stage>svg{animation:vlsw04Intro .65s cubic-bezier(.2,.8,.25,1)}
${s} .a-dash{stroke-dasharray:6 7;animation:vlsw04Dash 1.2s linear infinite}
${s} .a-bob,${s} .a-pulse,${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%}
${s} .a-bob{animation:vlsw04Bob 2.4s ease-in-out infinite}
${s} .a-pulse{animation:vlsw04Pulse 1.8s ease-in-out infinite}
${s} .a-spin{animation:vlsw04Spin 6s linear infinite}
${s} .a-blink{animation:vlsw04Blink 1.3s ease-in-out infinite}
@media (max-width:420px){${s} .w04-cap{font-size:14px;min-height:34px;padding:5px 10px 7px}${s} .w04-pr{flex-basis:40px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
}
const KEYFRAMES = `
@keyframes vlsw04In{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes vlsw04Intro{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
@keyframes vlsw04Dash{to{stroke-dashoffset:-26}}
@keyframes vlsw04Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes vlsw04Pulse{0%,100%{opacity:.4;transform:scale(.94)}50%{opacity:1;transform:scale(1.06)}}
@keyframes vlsw04Spin{to{transform:rotate(360deg)}}
@keyframes vlsw04Blink{0%,100%{opacity:1}50%{opacity:.3}}
`;
function addStyles(list) {
  if (typeof document === "undefined" || !document.createElement) return;
  let st = document.getElementById("vl-sc-w04");
  if (!st) { st = document.createElement("style"); st.id = "vl-sc-w04"; (document.head || document.documentElement).appendChild(st); }
  const flag = "data-w04v2-" + PART;
  if (st.getAttribute(flag)) return;
  st.setAttribute(flag, "1");
  st.appendChild(document.createTextNode(KEYFRAMES + list.map((p) => sceneCSS(p[0], p[1])).join("\n")));
}

// ---------- scene factory ----------
// cfg = { id, N, labels[N], bg, desc, deco?(), vis: [{ r:[from,to], art(), play(c, j, k), pre?(c) }] }
// pre(c) runs instantly while a visual is hidden (never during its own fade-out) to stage its entry state.
function makeScene(cfg) {
  const id = cfg.id, N = cfg.N, labels = cfg.labels, V = cfg.vis;
  if (labels.length !== N) warn(id + ": " + labels.length + " labels for " + N + " moments");
  labels.forEach((l, i) => { const w = String(l).trim().split(/\s+/).length; if (w < 2 || w > 4) warn(id + " label " + i + " has " + w + " words"); });
  for (let k = 0; k < N; k++) { const hits = V.filter((v) => inR(k, v.r[0], v.r[1])).length; if (hits !== 1) warn(id + " moment " + k + " covered by " + hits + " visuals"); }
  let root = null, useG = false, counters = [], lastK = -1;
  const mapK = (i, n) => {
    const nn = Math.max(1, Math.floor(num(n, N)));
    const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
    return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
  };
  const q = (sel) => (root ? Array.prototype.slice.call(root.querySelectorAll(sel)) : []);
  function timing(el, t) { el.style.transitionDuration = (t.d == null ? 0.8 : t.d) + "s"; el.style.transitionDelay = (t.dl || 0) + "s"; }
  function tf(el, st, t, snap) {
    const x = st.x || 0, y = st.y || 0, r = st.r || 0;
    const sx = st.sx != null ? st.sx : (st.s != null ? st.s : 1);
    const sy = st.sy != null ? st.sy : (st.s != null ? st.s : 1);
    if (useG) {
      const v = { x, y, rotation: r, scaleX: sx, scaleY: sy };
      if (st.pv) v.svgOrigin = st.pv[0] + " " + st.pv[1]; else v.transformOrigin = "50% 50%";
      if (snap) window.gsap.set(el, v);
      else window.gsap.to(el, Object.assign(v, { duration: t.d == null ? 0.8 : t.d, delay: t.dl || 0, ease: t.e || "power3.out", overwrite: "auto" }));
    } else {
      if (st.pv) { el.style.transformBox = "view-box"; el.style.transformOrigin = st.pv[0] + "px " + st.pv[1] + "px"; }
      else { el.style.transformBox = ""; el.style.transformOrigin = ""; }
      timing(el, t);
      el.style.transform = "translate(" + x + "px," + y + "px) rotate(" + r + "deg) scale(" + sx + "," + sy + ")";
    }
  }
  function op(el, o, t, snap) {
    if (useG) { if (snap) window.gsap.set(el, { opacity: o }); else window.gsap.to(el, { opacity: o, duration: t.d == null ? 0.55 : t.d, delay: t.dl || 0, ease: "power1.out", overwrite: "auto" }); }
    else { timing(el, t); el.style.opacity = String(o); }
  }
  function dash(el, f, t, snap) {
    const v = 100 * (1 - clamp(f, 0, 1));
    if (useG) { if (snap) window.gsap.set(el, { strokeDashoffset: v }); else window.gsap.to(el, { strokeDashoffset: v, duration: t.d == null ? 1.1 : t.d, delay: t.dl || 0, ease: "power2.inOut", overwrite: "auto" }); }
    else { timing(el, t); el.style.strokeDashoffset = String(v); }
  }
  function fill(el, col, t, snap) {
    if (useG) { if (snap) window.gsap.set(el, { fill: col }); else window.gsap.to(el, { fill: col, duration: t.d == null ? 0.55 : t.d, delay: t.dl || 0, overwrite: "auto" }); }
    else { timing(el, t); el.style.fill = col; }
  }
  function count(el, to, fmt, t, snap) {
    const from = num(el.__w04v, to);
    el.__w04v = to;
    if (useG && !snap && from !== to) {
      const o = { v: from };
      counters.push(window.gsap.to(o, { v: to, duration: t.d == null ? 1.2 : t.d, delay: t.dl || 0, ease: "power2.out", onUpdate: () => { el.textContent = fmt(o.v); } }));
    } else el.textContent = fmt(to);
  }
  function ctx(scope, snap) {
    const nodes = (k) => q(scope + ' [data-k="' + k + '"]');
    const each = (k, f) => nodes(k).forEach(f);
    return {
      snap,
      op: (k, o, t = {}) => each(k, (el) => op(el, o, t, snap)),
      mv: (k, st, t = {}) => each(k, (el) => tf(el, st || {}, t, snap)),
      dr: (k, f, t = {}) => each(k, (el) => dash(el, f, t, snap)),
      fl: (k, col, t = {}) => each(k, (el) => fill(el, col, t, snap)),
      tx: (k, s) => each(k, (el) => { if (el.textContent !== String(s)) el.textContent = String(s); }),
      nm: (k, v, fmt, t = {}) => each(k, (el) => count(el, v, fmt || ((x) => String(Math.round(x))), t, snap)),
      vis: (m, t = {}) => Object.keys(m).forEach((k) => each(k, (el) => op(el, m[k] === true ? 1 : m[k] === false ? 0 : num(m[k], 0), t, snap))),
      all: (sel) => q(scope + " " + sel),
      opEl: (el, o, t = {}) => op(el, o, t, snap),
      mvEl: (el, st, t = {}) => tf(el, st || {}, t, snap),
      flEl: (el, col, t = {}) => fill(el, col, t, snap)
    };
  }
  function caption(k, snap) {
    const lab = root.querySelector(".w04-txt"), no = root.querySelector(".w04-no"), bar = root.querySelector(".w04-pr i");
    const txt = labels[k] || "";
    if (lab && lab.textContent !== txt) {
      lab.textContent = txt;
      if (!snap && !reduced()) { lab.classList.remove("w04-in"); void lab.offsetWidth; lab.classList.add("w04-in"); }
    }
    if (no) no.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
    if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
  }
  function render(k, snap) {
    if (!root) return;
    if (snap) root.classList.add("w04-snap");
    V.forEach((v, i) => {
      const g = root.querySelector('[data-v="' + i + '"]');
      if (!g) return;
      const on = inR(k, v.r[0], v.r[1]);
      op(g, on ? 1 : 0, { d: on ? 0.55 : 0.3, dl: on ? 0.12 : 0 }, snap);
      tf(g, on ? {} : { x: k < v.r[0] ? 28 : -28, s: 0.985 }, { d: 0.6 }, snap);
      g.setAttribute("aria-hidden", on ? "false" : "true");
      const wasOn = lastK >= 0 && inR(lastK, v.r[0], v.r[1]);
      if (!on && v.pre && !wasOn) {
        try { v.pre(ctx('[data-v="' + i + '"]', true)); } catch (e) { warn(id + " pre " + i + ": " + (e && e.message)); }
      }
      if (on) {
        try { v.play(ctx('[data-v="' + i + '"]', snap), k - v.r[0], k); }
        catch (e) { warn(id + " visual " + i + ": " + (e && e.message)); }
      }
    });
    caption(k, snap);
    lastK = k;
    if (snap) { void root.offsetWidth; root.classList.remove("w04-snap"); }
    root.setAttribute("data-moment", String(k));
  }
  function kill() {
    counters.forEach((tw0) => { try { tw0.kill(); } catch (_) {} });
    counters = [];
    if (root && window.gsap && typeof window.gsap.killTweensOf === "function") {
      try { window.gsap.killTweensOf(root.querySelectorAll("[data-k],[data-v]")); } catch (_) {}
    }
  }
  function mount(el) {
    const r = document.createElement("div");
    const rm = reduced();
    r.className = "vls-w04-" + id + " w04-root" + (useG ? " w04-gsap" : " w04-css") + (rm ? " w04-rm" : " w04-intro");
    r.setAttribute("data-scene", id);
    const art = R(-400, -300, 1200, 900, cfg.bg) + (cfg.deco ? cfg.deco() : "") +
      V.map((v, i) => `<g data-v="${i}" style="opacity:0">${v.art()}</g>`).join("");
    r.innerHTML = '<div class="w04-stage"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
      esc(cfg.desc) + '">' + art + '</svg></div><div class="w04-cap" aria-hidden="true"><span class="w04-no"></span><span class="w04-txt"></span><span class="w04-pr"><i></i></span></div>';
    if (typeof el.replaceChildren === "function") el.replaceChildren(r);
    else { el.innerHTML = ""; el.appendChild(r); }
    return r;
  }
  return {
    build(el) {
      if (!el || el.nodeType !== 1) return;
      kill();
      lastK = -1;
      useG = gsapOK();
      root = mount(el);
      render(0, true);
    },
    step(i, n) {
      if (!root) return;
      if (reduced()) { root.classList.add("w04-rm"); }
      render(mapK(i, n), !useG && reduced());
    },
    reset() {
      if (!root) return;
      kill();
      lastK = -1;
      render(0, true);
    }
  };
}
// merge(a, b): joins two adjacent visuals into one two-phase visual (cross-fade inside one stage).
const merge = (a, b) => {
  const na = a.r[1] - a.r[0] + 1;
  return {
    r: [a.r[0], b.r[1]],
    art: () => `<g data-k="mA">${a.art()}</g><g data-k="mB" style="opacity:0">${b.art()}</g>`,
    pre: (c) => { if (a.pre) a.pre(c); if (b.pre) b.pre(c); },
    play: (c, j, k) => {
      c.op("mA", j < na ? 1 : 0, { d: 0.4 }); c.op("mB", j < na ? 0 : 1, { d: 0.5, dl: j < na ? 0 : 0.15 });
      if (j < na) a.play(c, j, k); else b.play(c, j - na, k);
    }
  };
};
const BG = [];

// ============================================================
// O2b · Resistance or a genuine design defect? · 29 moments · 10 visuals
// Verdicts are objection-specific: Marina = design defect, Corniche = rational
// resistance (job fear), Old Town = no checkable case, a trust signal.
// ============================================================
{
  const id = "O2b", N = 29;
  const labels = [
    "Resistance or defect?", "Defect: unhandled real case", "Resistance: opposed anyway", "Both sound like no",
    "Use a test", "Test one: checkable case", "Test two: no stake", "Watch the test work",
    "A specific claim: 30%", "Count last month's arrivals", "Records confirm about 30%", "A third without path",
    "Passes both tests", "Verdict: design defect", "62% back her", "Persuasion can't repair",
    "Corniche: four fewer agents", "Checkable in business case", "Flow works either way", "Rational job fear",
    "Old Town: no case", "A signal about trust", "The director's trap", "Assumes misunderstanding",
    "71% already convinced", "Defect missed: costliest", "Fear treated as defect", "Protects both directions",
    "Fit response to cause"
  ];
  const gate = (x, k, lab) => P(`M${x - 36} 262 V128 Q${x - 36} 98 ${x} 98 Q${x + 36} 98 ${x + 36} 128 V262`, C.navy, 9) +
    K("lp" + k, O(x, 80, 13, "#c3cdd8", `stroke="${C.navy}" stroke-width="2.4"`)) + T(x, 52, lab, 14, C.navy);
  const card = (x, y, t, col) => R(x - 64, y - 26, 128, 52, C.white, 10, `stroke="${col}" stroke-width="2.6"`) + T(x, y + 5, t, 14, col);
  const vis = [];

  // V1 (0-3) · adapted from https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5 — a branch that splits the flow
  vis.push({ r: [0, 3], art: () => {
    let s = H("fork", card(200, 44, "Marina objection", C.coral) + P("M200 70 V110 M200 110 L110 150 M200 110 L290 150", C.navy, 3) +
      R(46, 150, 128, 120, C.lilac, 12) + T(110, 216, "Resistance?", 16, C.plum) + R(226, 150, 128, 120, C.rose, 12) + T(290, 216, "Defect?", 16, C.coral));
    s += H("p1", R(30, 136, 190, 28, C.mist, 14) + R(250, 136, 120, 28, C.mist, 14) + T(200, 62, "Design defect", 18, C.coral) + T(200, 88, "real case fails", 14, C.slate));
    s += H("p2", R(30, 136, 340, 28, C.mist, 14) + T(200, 62, "Resistance", 18, C.plum) + T(200, 88, "opposed even if working", 14, C.slate) +
      man(330, 254, 1.4, C.teal) + bubble(268, 186, 52, 34, C.plum, C.white, 0.7) + T(294, 209, "No", 15, C.plum) + okDot(370, 130, 11));
    for (let i = 0; i < 5; i++) s += H("tk" + i, face(46 + i * 26, 150, 10, i === 2 ? C.coral : C.blue));
    s += H("hole", P("M220 164 L236 214", C.coral, 2.4, 'stroke-dasharray="4 4"') + T(250, 240, "Falls through", 14, C.coral, "start"));
    s += H("twin", man(120, 220, 1.9, C.slate) + man(280, 220, 1.9, C.slate) + bubble(150, 90, 64, 40, C.navy, C.white, 0.2) + T(182, 117, "No", 17, C.navy) +
      bubble(310, 90, 64, 40, C.navy, C.white, 0.2) + T(342, 117, "No", 17, C.navy) + pill(200, 274, "Same words, different cause", { st: C.navy, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ fork: j === 0, p1: j === 1, p2: j === 2, hole: j === 1, twin: j === 3 });
    for (let i = 0; i < 5; i++) {
      const show = j === 1 || j === 2;
      c.op("tk" + i, show ? 1 : 0);
      const fall = j === 1 && i === 2;
      c.mv("tk" + i, fall ? { x: 228 - (46 + i * 26), y: 80 } : show ? { x: j === 2 ? 186 : (i < 2 ? 150 : i > 2 ? 200 : 0) } : {}, { d: 1.4, dl: i * 0.1, e: fall ? "bounce.out" : "power2.inOut" });
    }
  } });

  // V2 (4-6) · adapted from https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU — one step activating after another
  vis.push({ r: [4, 6], art: () => {
    let s = H("ins", R(30, 70, 150, 160, C.white, 16, `stroke="${C.mist}" stroke-width="2"`) + heart(105, 130, 2.4, "#d9a3a0") + T(105, 200, "Instinct", 16, C.slate) + cross(105, 130, 3, C.coral, 5) +
      R(220, 70, 150, 160, C.white, 16, `stroke="${C.green}" stroke-width="2.4"`) + paper(258, 96, 74, 90, C.green, 4) + okDot(332, 96, 14) + T(295, 212, "A test", 16, C.green));
    s += H("gts", gate(130, "a", "Checkable case?") + gate(280, "b", "True without a stake?"));
    s += H("g1", paper(108, 150, 44, 66, C.blue, 3) + O(146, 172, 18, "rgba(255,255,255,.4)", `stroke="${C.ink}" stroke-width="4"`) + P("M159 185 L176 202", C.ink, 6) + T(130, 286, "Real operating data", 13, C.blue));
    s += H("g2", man(280, 214, 1.5, C.teal) + K("stk", coin(318, 236, 14) + T(318, 262, "Stake", 13, C.amber)) + T(280, 286, "Remove the stake", 13, C.teal));
    return s;
  }, play: (c, j) => {
    c.vis({ ins: j === 0, gts: j >= 1, g1: j === 1, g2: j === 2 });
    c.all('[data-k="lpa"] circle').forEach((el) => c.flEl(el, j === 1 ? C.gold : "#c3cdd8"));
    c.all('[data-k="lpb"] circle').forEach((el) => c.flEl(el, j === 2 ? C.gold : "#c3cdd8"));
    c.mv("stk", j === 2 ? { x: 50, y: 20, s: 0.6 } : {}, { d: 1.2, dl: 0.6 }); c.op("stk", j === 2 ? 0.35 : 1, { dl: 0.6 });
  } });

  // V3 (7-9) · adapted from https://lottiefiles.com/free-animation/business-solution-pNyNfkcRsa — boxes on a conveyor through a control station
  vis.push({ r: [7, 9], art: () => {
    let s = R(-400, 218, 1200, 22, C.slate) + rep(30, (i) => O(-390 + i * 40, 229, 6, "#8798aa")) + R(210, 70, 150, 148, "#dbe5ee", 12) + R(226, 86, 118, 60, C.night, 8) + T(285, 122, "Gate 1", 16, C.gold);
      s += K("mc", card(90, 264, "Marina claim", C.coral));
    s += H("spec", R(220, 152, 130, 52, C.white, 8, `stroke="${C.coral}" stroke-width="2"`) + T(285, 174, "30% of corporate", 12.5, C.coral) + T(285, 194, "arrivals", 13, C.coral) + okDot(350, 86, 13));
    s += H("rec", R(20, 40, 150, 150, C.wood, 10) + R(32, 52, 126, 38, "#c79e6c", 6) + R(32, 98, 126, 38, "#c79e6c", 6) + R(32, 144, 126, 38, "#c79e6c", 6) + R(80, 66, 30, 8, C.ink, 3) +
      T(95, 30, "Last month", 15, C.navy) + rep(6, (i) => H("sl" + i, R(60 + (i % 3) * 30, 200, 24, 16, C.white, 2, `stroke="${C.navy}" stroke-width="1.4"`))) +
      T(285, 268, "Corrected bookings", 14, C.navy) + rep(8, (i) => H("ty" + i, P(`M${226 + i * 16} 278 v18`, C.coral, 3.5))));
    return s;
  }, play: (c, j) => {
    c.mv("mc", j >= 1 ? { x: 225, y: -10, s: 0.8 } : {}, { d: 1.4, e: "power2.inOut" });
    c.op("mc", j === 2 ? 0 : 1);
    c.vis({ spec: j === 1, rec: j === 2 });
    for (let i = 0; i < 6; i++) { c.op("sl" + i, j === 2 ? 1 : 0, { dl: i * 0.15 }); c.mv("sl" + i, j === 2 ? { x: 170 - (i % 3) * 30 + 40, y: -40 } : {}, { d: 1, dl: 0.4 + i * 0.15 }); }
    for (let i = 0; i < 8; i++) c.op("ty" + i, j === 2 ? 1 : 0, { dl: 0.8 + i * 0.15 });
  } });

  // V4 (10-12) · adapted from https://observablehq.com/@d3/pie-chart-update — a donut sector tweening to the measured share
  vis.push({ r: [10, 12], art: () => {
    let s = H("cmpb", T(200, 46, "Suppose the records say", 15, C.navy) +
      T(40, 100, "Claim", 15, C.coral, "start") + R(120, 84, 240, 26, "#e1e8ef", 8) + K("bc", R(120, 84, 72, 26, C.coral, 8)) + T(200, 103, "30%", 14, C.coral, "start") +
      T(40, 160, "Records", 15, C.blue, "start") + R(120, 144, 240, 26, "#e1e8ef", 8) + K("br", R(120, 144, 70, 26, C.blue, 8)) + T(198, 163, "about 30%", 14, C.blue, "start") +
      pill(200, 230, "Close match", { bg: C.green, st: C.green, fg: C.white }));
    const a = 0.3 * 2 * Math.PI, rr = 84, cx = 140, cy = 160;
    const ex = r1(cx + rr * Math.sin(a)), ey = r1(cy - rr * Math.cos(a));
    s += H("don", O(cx, cy, rr, C.teal) + K("wd", F(`M${cx} ${cy} L${cx} ${cy - rr} A${rr} ${rr} 0 0 1 ${ex} ${ey} Z`, C.coral)) + O(cx, cy, 46, "#f3f5f7") + kiosk(cx, cy + 26, 0.85, C.navy) +
      T(310, 130, "Almost a third", 17, C.coral) + pill(310, 196, "No kiosk path", { bg: C.coral, st: C.coral, fg: C.white }));
    s += H("both", gate(120, "x", "Checkable?") + gate(280, "y", "No stake?") + okDot(120, 80, 14) + okDot(280, 80, 14) +
      card(200, 190, "Marina claim", C.coral) + K("who", man(330, 214, 1.3, C.slate)) + pill(200, 284, "Holds whoever says it", { st: C.green, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ cmpb: j === 0, don: j === 1, both: j === 2 });
    c.mv("bc", { sx: j === 0 ? 1 : 0.02, pv: [120, 97] }, { d: 1 }); c.mv("br", { sx: j === 0 ? 1 : 0.02, pv: [120, 157] }, { d: 1, dl: 0.5 });
    c.mv("wd", { s: j === 1 ? 1 : 0.2, pv: [140, 160] }, { d: 1.1, e: "back.out(1.5)" });
    c.op("who", j === 2 ? 0.15 : 1, { dl: 0.8 }); c.mv("who", j === 2 ? { x: 30 } : {}, { dl: 0.8 });
  } });

  // V5 (13-15) · adapted from https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP — activity transforming into a confirmed state
  vis.push({ r: [13, 15], art: () => {
    let s = H("vd", card(200, 90, "Marina claim", C.coral) + K("stp", R(110, 128, 180, 46, C.coral, 8) + T(200, 158, "Design defect", 19, C.white)) +
      man(90, 254, 1.4, C.teal) + star(126, 206, 12) + pill(270, 246, "A real favour", { st: C.green }));
    s += H("sv", T(200, 60, "Staff survey", 15, C.navy) + R(50, 96, 300, 40, "#e1e8ef", 10) + K("b62", R(50, 96, 186, 40, C.coral, 10)) + T(143, 122, "62%", 18, C.white) +
      T(200, 182, "Exceptions not handled", 15, C.navy) + pill(200, 246, "Supports Marina", { st: C.green }));
    s += H("pr", kiosk(286, 262, 2, C.navy) + K("err", R(268, 166, 36, 30, C.coral, 3) + T(286, 188, "?", 18, C.white)) + mega(60, 150, 1.5, C.plum) + waves(100, 150, 1.4, C.plum) +
      arw(150, 150, 236, 176, C.plum, 2) + pill(130, 250, "No message repairs it", { st: C.coral, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ vd: j === 0, sv: j === 1, pr: j === 2 });
    c.mv("stp", j === 0 ? {} : { s: 1.6 }, { d: 0.5, e: "back.out(2)" });
    c.mv("b62", { sx: j === 1 ? 1 : 0.02, pv: [50, 116] }, { d: 1.1 });
  } });

  // V6 (16-19) · adapted from https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8 — document opened, clause highlighted, signed state
  vis.push({ r: [16, 19], art: () => {
    let s = H("cc", card(200, 60, "Corniche claim", C.plum) + man(80, 200, 1.6, C.teal) + bubble(120, 110, 190, 54, C.plum, C.white, 0.15) + T(215, 143, "Four fewer per shift", 15, C.plum));
    s += H("bc", R(110, 40, 180, 230, C.white, 8, `stroke="${C.navy}" stroke-width="2.4"`) + T(200, 70, "Business case", 15, C.navy) + rep(5, (i) => P(`M128 ${100 + i * 26} H272`, C.mist, 4)) +
      K("hlt", R(122, 146, 156, 22, "rgba(239,194,90,.55)", 4)) + T(200, 162, "Staffing assumption", 12.5, C.ink) + okDot(300, 44, 13) + T(334, 90, "Checkable", 14, C.green));
    s += H("fl", T(200, 40, "Check-in flow", 15, C.navy) + T(30, 96, "Today's staff", 14, C.slate, "start") + P("M150 92 H330", C.navy, 5) + okDot(352, 92, 12) +
      T(30, 166, "Four fewer", 14, C.slate, "start") + P("M150 162 H330", C.navy, 5) + okDot(352, 162, 12) +
      rep(4, (i) => K("ft" + i, face(150, 92 + (i % 2) * 70, 8, C.blue))) + pill(200, 236, "Not a flow defect", { bg: C.navy, st: C.navy, fg: C.white }));
    s += H("rr", card(200, 70, "Corniche claim", C.plum) + K("stp2", R(96, 112, 208, 46, C.plum, 8) + T(200, 142, "Rational resistance", 17, C.white)) +
      man(200, 250, 1.4, C.teal) + bang(226, 196, 11, C.plum) + T(316, 248, "Fear for jobs", 15, C.plum));
    return s;
  }, play: (c, j) => {
    c.vis({ cc: j === 0, bc: j === 1, fl: j === 2, rr: j === 3 });
    c.mv("hlt", { sx: j === 1 ? 1 : 0.02, pv: [122, 157] }, { d: 1, dl: 0.4 });
    for (let i = 0; i < 4; i++) c.mv("ft" + i, j === 2 ? { x: 160 } : {}, { d: 1.6, dl: i * 0.25, e: "none" });
    c.mv("stp2", j === 3 ? {} : { s: 1.6 }, { d: 0.5, e: "back.out(2)" });
  } });

  // V7 (20-21) · adapted from https://observablehq.com/@d3/arc-tween — a gauge settling at a low value
  vis.push({ r: [20, 21], art: () => {
    let s = H("ot", card(110, 70, "Old Town claim", C.amber) + T(110, 120, "Last promise failed", 14, C.amber) + gate(290, "z", "Checkable case?") +
      O(250, 184, 24, "rgba(255,255,255,.5)", `stroke="${C.ink}" stroke-width="4"`) + P("M266 202 L284 222", C.ink, 6) + noDot(290, 80, 14) + pill(110, 240, "No case named", { st: C.coral }));
    s += H("tr", P("M80 210 A120 120 0 0 1 320 210", "#dfe6ed", 22) + P("M80 210 A120 120 0 0 1 128 120", C.coral, 22) + K("nd", P("M200 210 V112", C.ink, 5) + O(200, 210, 10, C.ink)) +
      T(200, 250, "Trust", 18, C.navy) + T(76, 236, "Low", 13, C.coral) + T(324, 236, "High", 13, C.green) + pill(200, 46, "Still important data", { st: C.navy }));
    return s;
  }, play: (c, j) => {
    c.vis({ ot: j === 0, tr: j === 1 });
    c.mv("nd", { r: j === 1 ? -62 : 0, pv: [200, 210] }, { d: 1.4, e: "power2.out" });
  } });

  // V8 (22-24) · adapted from https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design — interface cards shifting state
  vis.push({ r: [22, 24], art: () => {
    let s = H("trp", R(-400, 230, 1200, 80, "#dfe6ed") + R(230, 226, 100, 10, C.ink, 3) + K("lid", R(230, 226, 100, 10, C.coral, 3)) + T(280, 262, "Explain more", 14, C.coral) +
      K("dir", man(110, 214, 1.5, C.navy)) + pill(160, 60, "The adviser's advice", { st: C.plum }));
    const CS = [["Marina", 70], ["Corniche", 200], ["Old Town", 330]];
    let m = "";
    CS.forEach((cs, i) => { m += R(cs[1] - 58, 60, 116, 150, C.white, 12, `stroke="${C.mist}" stroke-width="2"`) + T(cs[1], 90, cs[0], 15, C.navy) +
      T(cs[1], 130, ["Defect", "Job fear", "Trust"][i], 14, C.slate) + H("mu" + i, R(cs[1] - 52, 150, 104, 40, C.plum, 8) + T(cs[1], 168, "Misunder-", 13, C.white) + T(cs[1], 184, "standing?", 13, C.white)); });
    s += H("mis", m + pill(200, 252, "One wrong label", { st: C.coral }));
    s += H("all", T(200, 60, "Already agree: faster", 15, C.navy) + R(40, 90, 320, 44, "#e1e8ef", 10) + K("b71", R(40, 90, 227, 44, C.teal, 10)) + T(154, 119, "71%", 20, C.white) +
      T(200, 186, "Left to explain", 15, C.slate) + R(150, 200, 100, 24, C.white, 8, `stroke="${C.slate}" stroke-width="2" stroke-dasharray="4 4"`) + R(150, 200, 12, 24, C.gold, 6));
    return s;
  }, play: (c, j) => {
    c.vis({ trp: j === 0, mis: j === 1, all: j === 2 });
    c.mv("dir", j === 0 ? { x: 110 } : {}, { d: 1.8 });
    [0, 1, 2].forEach((i) => { c.op("mu" + i, j === 1 ? 1 : 0, { dl: 0.3 + i * 0.25 }); c.mv("mu" + i, j === 1 ? {} : { y: -40 }, { dl: 0.3 + i * 0.25, e: "back.out(1.6)" }); });
    c.mv("b71", { sx: j === 2 ? 1 : 0.02, pv: [40, 112] }, { d: 1.1 });
  } });

  // V9 (25-27) · adapted from https://observablehq.com/@d3/easing-animations — the same motion replayed with contrasting outcomes
  vis.push({ r: [25, 27], art: () => {
    let s = H("e1", P("M30 150 H370", C.navy, 3) + T(40, 180, "Design", 14, C.navy, "start") + R(342, 120, 16, 60, C.coral, 3) + T(350, 200, "Go-live", 14, C.coral) +
      K("fl", R(40, 136, 54, 28, C.coral, 6) + T(67, 155, "Flaw", 13, C.white)) + pill(110, 70, "Labelled resistance", { st: C.plum, sz: 13 }) +
      H("hit", rep(3, (i) => face(300 + i * 26, 250, 10, C.blue)) + bang(326, 220, 11)) + pill(200, 282, "Guests meet the flaw", { st: C.coral, sz: 13 }));
    s += H("e2", P("M170 50 V250 M170 50 H310 M300 50 V110", C.amber, 6) + R(150, 250, 40, 10, C.amber, 2) + R(276, 110, 48, 36, C.navy, 5) +
      R(40, 200, 110, 50, C.white, 8, `stroke="${C.green}" stroke-width="2"`) + T(95, 230, "Sound process", 13, C.green) +
      pill(110, 70, "Labelled defect", { st: C.coral, sz: 13 }) + ptag(300, 196, "Wasted redesign"));
    s += H("e3", R(16, 70, 140, 120, C.rose, 14) + T(86, 120, "Defect", 15, C.coral) + T(86, 142, "caught", 15, C.coral) + R(244, 70, 140, 120, C.lilac, 14) + T(314, 120, "Fear", 15, C.plum) + T(314, 142, "answered", 15, C.plum) +
      shieldI(200, 128, 3.2, C.green) + tick(200, 128, 1.4, C.white, 4) + heart(200, 236, 1.6, C.coral) + T(200, 278, "Respects who raised it", 14, C.navy));
    return s;
  }, play: (c, j) => {
    c.vis({ e1: j === 0, e2: j === 1, e3: j === 2 });
    c.mv("fl", j === 0 ? { x: 290 } : {}, { d: 2, e: "none" }); c.op("hit", j === 0 ? 1 : 0, { dl: 1.8 });
  } });

  // V10 (28) · adapted from https://lottiefiles.com/free-animation/automated-workflows-XR2hxXOdEK — triggers routed to matching actions
  vis.push({ r: [28, 28], art: () => {
    const RW = [["Marina", "Defect", C.coral], ["Corniche", "Job fear", C.plum], ["Old Town", "Trust", C.amber]];
    let s = T(200, 34, "Diagnosis first, then response", 15, C.navy);
    RW.forEach((r, i) => {
      const y = 82 + i * 76;
      s += R(20, y - 26, 110, 52, C.white, 10, `stroke="${r[2]}" stroke-width="2.4"`) + T(75, y + 5, r[0], 14, r[2]) + D("a" + i, `M132 ${y} H170`, C.navy, 3) +
        R(172, y - 22, 96, 44, r[2], 10) + T(220, y + 5, r[1], 14, C.white) + D("b" + i, `M270 ${y} H300`, C.navy, 3) + K("q" + i, R(302, y - 24, 80, 48, C.white, 10, `stroke="${C.navy}" stroke-width="2" stroke-dasharray="5 4"`) + T(342, y + 7, "?", 20, C.navy));
    });
    s += pill(200, 282, "Fit the response", { bg: C.navy, st: C.navy, fg: C.white });
    return s;
  }, play: (c) => {
    [0, 1, 2].forEach((i) => { c.dr("a" + i, 1, { dl: i * 0.3 }); c.dr("b" + i, 1, { dl: 0.4 + i * 0.3 }); });
  } });

  VS[id] = makeScene({ id, N, labels, vis, bg: "#f3f3f7",
    desc: "A two-gate test separates resistance from a design defect: Marina's checkable 30 percent claim passes both gates and is a defect, Corniche's job fear is rational resistance, and Old Town's objection names no case but signals low trust." });
  BG.push([id, "#f3f3f7"]);
}

// ============================================================
// O2c · Match the response to the cause · 29 moments · 9 visuals
// Each cause is shown with the response that fails and the response that works,
// and every working response changes something real (design, role, document, schedule).
// ============================================================
{
  const id = "O2c", N = 29;
  const labels = [
    "Eleven weeks to go-live", "One message fails", "Fails versus works", "Defects need redesign",
    "A staffed exception path", "Credit the Marina team", "Speaking up works", "Expert status at risk",
    "Training insults experts", "Experts design the standard", "Know-how built in", "Reassurance worsens fear",
    "Cheap words, no weight", "Written redeployment position", "Say where people go", "Silence breeds worst fears",
    "Change fatigue", "Same show again", "Fewer, larger, spaced changes", "Hold unrelated updates",
    "83% never consulted", "Campaigns don't give ownership", "Co-design the process", "Input changes decisions",
    "Something real changes", "Every response costs", "Cheaper than failure", "Other groups matter",
    "Next: stakeholder grid"
  ];
  const CA = [["Defect", C.coral], ["Job fear", C.plum], ["Memory", C.amber]];
  const vis = [];

  // V1 (0-2) · adapted from https://motionarray.com/after-effects-templates/project-timeline-2424919/ — countdown with milestone cards
  vis.push({ r: [0, 2], art: () => {
    let s = H("cd", P("M110 50 A70 70 0 1 1 109.9 50", "#dfe6ed", 16) + D("ring", "M110 50 A70 70 0 1 1 109.9 50", C.coral, 16) + T(110, 126, "11", 40, C.coral) + T(110, 150, "weeks", 15, C.navy) + T(110, 222, "to go-live", 14, C.slate));
    CA.forEach((ca, i) => { s += K("ca" + i, R(240, 50 + i * 66, 130, 50, C.white, 12, `stroke="${ca[1]}" stroke-width="2.6"`) + T(305, 81 + i * 66, ca[0], 16, ca[1])); });
    s += H("mg", mega(40, 140, 1.7, C.plum) + waves(80, 140, 1.6, C.plum) + pill(110, 230, "One confident message", { st: C.plum, sz: 13 }) +
      rep(3, (i) => cross(220, 75 + i * 66, 1.2, C.coral, 4)));
    let m = T(150, 40, "Fails", 16, C.coral) + T(300, 40, "Works", 16, C.green);
    CA.forEach((ca, i) => { m += R(30, 60 + i * 70, 76, 50, ca[1], 10) + T(68, 90 + i * 70, ca[0], 13, C.white) + R(116, 60 + i * 70, 120, 50, C.rose, 10) + T(176, 92 + i * 70, "?", 20, C.coral) +
      R(250, 60 + i * 70, 120, 50, C.mint, 10) + T(310, 92 + i * 70, "?", 20, C.green); });
    s += H("mx", m);
    return s;
  }, play: (c, j) => {
    c.vis({ cd: j === 0, mg: j === 1, mx: j === 2 });
    c.dr("ring", j === 0 ? 0.21 : 0, { d: 1.4 });
    CA.forEach((ca, i) => { c.op("ca" + i, j <= 1 ? 1 : 0); c.mv("ca" + i, j === 1 ? { x: 12, r: 6 } : {}, { d: 0.5, dl: 0.5 + i * 0.12, e: "back.out(3)" }); });
  } });

  // V2 (3-6) · adapted from https://codepen.io/WebGuyJeff/pen/rNdmqdO — a new branch added to a flow and traversed
  vis.push({ r: [3, 6], art: () => {
    let s = H("bp", kiosk(250, 250, 2, C.navy) + K("err", R(232, 156, 36, 28, C.coral, 3) + T(250, 177, "?", 18, C.white)) + bubble(30, 70, 150, 54, C.plum, C.white, 0.7) + T(105, 103, "Trust us", 17, C.plum) +
      K("bx", noDot(196, 96, 14)) + pill(110, 250, "Persuasion bounces off", { st: C.coral, sz: 13 }));
    const ND = [["Guest", 40, 90], ["Kiosk", 130, 90], ["Wrong details?", 220, 90], ["Agent corrects", 220, 200], ["Settled", 352, 90]];
    let f = D("m", "M40 90 H352", C.navy, 4) + D("br", "M220 104 V186 M234 200 H330 C352 200 352 160 352 104", C.green, 4);
    ND.forEach((n, i) => { f += O(n[1], n[2], 13, i === 3 ? C.green : i === 2 ? C.coral : C.navy) + T(n[1], n[2] + (i === 3 ? 38 : -22), n[0], 13, i === 3 ? C.green : C.navy); });
    f += H("tok", face(40, 90, 8, C.gold)) + pill(200, 270, "New staffed path", { bg: C.green, st: C.green, fg: C.white });
    s += H("fl", f);
    s += H("nb", R(60, 40, 280, 200, "#c9a06a", 14) + R(74, 54, 252, 172, C.paper, 8) + T(200, 90, "Design changed", 18, C.navy) + T(200, 126, "Gap found by", 15, C.slate) +
      T(200, 154, "the Marina team", 16, C.green) + star(110, 196, 14) + star(290, 196, 14) + O(200, 54, 6, C.coral));
    s += H("lp", man(80, 200, 1.5, C.teal) + P("M96 160 L104 124", C.teal, 6) + D("cy", "M120 110 C200 30 320 60 320 140 C320 220 200 250 130 220", C.green, 4) +
      R(250, 70, 110, 40, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + T(305, 95, "Design fixed", 14, C.navy) + pill(200, 274, "Raising problems works", { st: C.green }));
    return s;
  }, play: (c, j) => {
    c.vis({ bp: j === 0, fl: j === 1, nb: j === 2, lp: j === 3 });
    c.mv("bx", j === 0 ? {} : { s: 0.2 }, { dl: 0.7, e: "back.out(2)" });
    c.dr("m", j === 1 ? 1 : 0, { d: 0.8 }); c.dr("br", j === 1 ? 1 : 0, { d: 1.2, dl: 0.6 });
    c.op("tok", j === 1 ? 1 : 0, { dl: 1 }); c.mv("tok", j === 1 ? { x: 180, y: 110 } : {}, { d: 1.6, dl: 1.2 });
    c.dr("cy", j === 3 ? 1 : 0, { d: 1.4 });
  } });

  // V3 (7-10) · adapted from https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6 — people joined into a working group
  vis.push({ r: [7, 10], art: () => {
    let s = H("es", man(140, 236, 2.4, C.teal) + K("bd", star(196, 150, 20) + P("M190 132 L198 150 L188 166", C.coral, 3)) + T(200, 56, "Expert status", 18, C.navy) +
      paper(250, 170, 90, 64, C.coral, 3) + T(295, 256, "Broken booking", 14, C.coral));
    s += H("cl", R(60, 40, 280, 100, "#2c4a3a", 8) + T(200, 82, "Kiosk basics", 20, C.white) + T(200, 112, "Lesson 1", 15, "#cfe8d8") +
      R(150, 220, 100, 12, C.wood, 3) + man(200, 210, 1.5, C.teal) + star(222, 168, 10, "#c9c9c9") + noDot(300, 200, 16) + pill(200, 274, "Deepens the insult", { st: C.coral }));
    s += H("dt", R(40, 150, 320, 20, C.wood, 6) + R(80, 92, 240, 60, "#e9f2fb", 6, `stroke="${C.blue}" stroke-width="2"`) + D("pen", "M100 130 H170 L200 108 H300", C.blue, 3.5) +
      man(90, 214, 1.5, C.teal) + man(310, 214, 1.5, C.teal) + T(200, 76, "Exception standard", 15, C.blue) + okDot(200, 236, 14) + pill(200, 274, "A design role", { st: C.green }));
    s += H("kh", R(170, 80, 200, 150, C.slate, 18) + O(250, 155, 44, "#4a5f76") + K("gr", cog(250, 155, 34, C.gold, C.slate)) + T(270, 252, "The process", 15, C.navy) +
      man(70, 214, 1.5, C.teal) + K("kg", cog(110, 150, 22, C.gold, C.paper)) + pill(200, 40, "Know-how built in", { bg: C.green, st: C.green, fg: C.white }));
    return s;
  }, play: (c, j) => {
    c.vis({ es: j === 0, cl: j === 1, dt: j === 2, kh: j === 3 });
    c.mv("bd", j === 0 ? { r: -10, y: 6 } : {}, { d: 1, dl: 0.6 });
    c.dr("pen", j === 2 ? 1 : 0, { d: 1.4, dl: 0.4 });
    c.mv("kg", j === 3 ? { x: 140, y: 5, s: 1.5 } : {}, { d: 1.3, dl: 0.4, e: "power2.inOut" });
  } });

  // V4 (11-12) · adapted from https://motionarray.com/after-effects-templates/infographics-elements-789489/ — shapes and data revealed in a balance
  vis.push({ r: [11, 12], art: () => {
    let s = P("M200 250 V120", C.navy, 5) + F("M178 256 H222 L200 236 Z", C.navy);
    s += K("bm", P("M80 120 H320", C.navy, 5) + P("M80 120 L50 172 M80 120 L110 172 M320 120 L290 172 M320 120 L350 172", C.slate, 1.6) +
      R(40, 172, 80, 12, C.plum, 4) + R(48, 136, 64, 36, C.plum, 6) + T(80, 160, "Fear", 15, C.white) + R(280, 172, 80, 12, C.mist, 4) +
      F("M300 168 Q320 140 344 150 Q326 160 300 168 Z", "#b7c3cf"));
    s += T(320, 214, "Reassurance", 14, C.slate);
    s += H("bb", bubble(176, 30, 200, 50, C.plum, C.white, 0.3) + T(276, 62, "No need to worry", 15, C.plum));
    s += H("tg", ptag(88, 46, "Costs nothing", C.slate) + pill(200, 286, "Staff give no weight", { st: C.coral, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.mv("bm", { r: j === 0 ? -14 : -18, pv: [200, 120] }, { d: 1.3, e: "elastic.out(1,0.5)" });
    c.vis({ bb: true, tg: j === 1 });
  } });

  // V5 (13-15) · adapted from https://dribbble.com/shots/27600376-Clean-Workflow-Visualization-with-Motion-Graphics — journey steps connected by transitions
  vis.push({ r: [13, 15], art: () => {
    let s = H("dc", R(110, 30, 180, 240, C.white, 8, `stroke="${C.navy}" stroke-width="2.4"`) + T(200, 62, "Redeployment", 16, C.navy) + T(200, 82, "position", 16, C.navy) +
      rep(5, (i) => D("ln" + i, `M130 ${112 + i * 26} H${i === 4 ? 230 : 270}`, C.slate, 4)) + D("sig", "M150 250 q12 -16 24 0 t24 0 t24 -4", C.blue, 2.6) + T(320, 252, "In writing", 14, C.green, "start"));
    let d = T(200, 36, "Four fewer per shift", 15, C.navy);
    for (let i = 0; i < 4; i++) d += man(48, 80 + i * 56, 0.95, C.teal) + D("ar" + i, `M70 ${74 + i * 56} H210`, C.green, 3);
    d += R(222, 70, 158, 190, C.mint, 14) + T(301, 150, "Stated", 16, C.green) + T(301, 172, "destination", 16, C.green) + T(301, 196, "and timing", 14, C.slate);
    s += H("dst", d);
    s += H("sl", R(20, 40, 170, 220, "#e6e9ee", 14) + T(105, 70, "Silence", 16, C.slate) + man(105, 210, 1.5, C.slate) + cloudI(105, 120, 1.8, "#6d7a88") + T(105, 128, "Worst case", 13, C.white) +
      R(210, 40, 170, 220, C.mint, 14) + T(295, 70, "Clear news", 16, C.green) + man(295, 210, 1.5, C.teal) + paper(270, 96, 50, 60, C.green, 3) + okDot(322, 96, 11) +
      pill(200, 284, "Ambiguity hurts more", { st: C.coral, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ dc: j === 0, dst: j === 1, sl: j === 2 });
    for (let i = 0; i < 5; i++) c.dr("ln" + i, j === 0 ? 1 : 0, { d: 0.5, dl: i * 0.2 });
    c.dr("sig", j === 0 ? 1 : 0, { d: 0.8, dl: 1.2 });
    for (let i = 0; i < 4; i++) c.dr("ar" + i, j === 1 ? 1 : 0, { d: 0.8, dl: i * 0.2 });
  } });

  // V6 (16-19) · adapted from https://motionarray.com/after-effects-templates/corporate-timeline-255459/ — events introduced, then focus shifts
  vis.push({ r: [16, 19], art: () => {
    let s = H("ft", man(80, 230, 1.8, C.amber) + T(80, 282, "Old Town", 14, C.slate) + rep(4, (i) => K("bn" + i, R(150 + i * 16, 60 + i * 30, 170, 34, ["#9fb4c8", "#b8c6d4", "#c9d4df", "#dbe3ea"][i], 6) + T(235 + i * 16, 82 + i * 30, "New initiative", 13, C.navy))) +
      R(150, 210, 70, 34, C.white, 6, `stroke="${C.coral}" stroke-width="2.4"`) + R(220, 220, 6, 14, C.coral, 2) + R(154, 214, 14, 26, C.coral, 2) + T(290, 233, "Fatigue", 16, C.coral, "start"));
    s += H("ev", R(70, 140, 260, 120, "#3d4f66", 8) + R(90, 60, 220, 50, C.gold, 8) + T(200, 92, "Launch event!", 17, C.ink) + rep(10, (i) => R(80 + i * 26, 120 + (i % 3) * 8, 6, 10, [C.coral, C.blue, C.green][i % 3], 1)) +
      man(320, 240, 1.4, C.amber) + bubble(240, 156, 120, 36, C.amber, C.white, 0.7) + T(300, 180, "Same show", 14, C.amber));
    let tl = T(36, 68, "Many small", 14, C.coral, "start") + P("M36 96 H370", C.slate, 2) + rep(14, (i) => R(40 + i * 23, 82, 10, 28, C.coral, 2)) +
      T(36, 176, "Fewer, larger", 14, C.green, "start") + P("M36 206 H370", C.slate, 2) + R(40, 186, 70, 40, C.green, 6) + R(170, 186, 70, 40, C.green, 6) + R(300, 186, 70, 40, C.green, 6) +
      arw(118, 206, 162, 206, C.slate, 2) + arw(248, 206, 292, 206, C.slate, 2) + T(205, 262, "Time to absorb", 14, C.navy);
    s += H("tl", tl);
    s += H("hd", R(200, 60, 12, 200, C.coral, 3) + R(120, 150, 180, 14, C.coral, 4) + rep(4, (i) => K("up" + i, R(30 + (i % 2) * 44, 100 + Math.floor(i / 2) * 50, 38, 36, C.white, 6, `stroke="${C.blue}" stroke-width="2"`) + T(49 + (i % 2) * 44, 123 + Math.floor(i / 2) * 50, "Upd", 12.5, C.blue))) +
      T(90, 230, "Unrelated", 14, C.blue) + T(90, 248, "updates", 14, C.blue) + kiosk(310, 220, 1.4, C.navy) + okDot(340, 130, 13) + pill(300, 268, "Let check-in settle", { st: C.green, sz: 13 }) + T(206, 48, "Hold", 16, C.coral));
    return s;
  }, play: (c, j) => {
    c.vis({ ft: j === 0, ev: j === 1, tl: j === 2, hd: j === 3 });
    for (let i = 0; i < 4; i++) { c.op("bn" + i, j === 0 ? 1 : 0, { dl: i * 0.2 }); c.mv("bn" + i, j === 0 ? {} : { x: -30 }, { dl: i * 0.2 }); c.mv("up" + i, j === 3 ? { x: 60 } : {}, { d: 1, dl: i * 0.1, e: "back.out(1.4)" }); }
  } });

  // V7 (20-23) · adapted from https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion — layers built and revised
  vis.push({ r: [20, 23], art: () => {
    let s = H("pc", T(200, 50, "Front-desk staff", 15, C.navy) + R(40, 70, 320, 40, "#e1e8ef", 10) + K("b83", R(40, 70, 266, 40, C.coral, 10)) + T(173, 97, "83% never consulted", 15, C.white) +
      rep(12, (i) => man(52 + i * 28, 200, 0.9, i < 10 ? C.coral : C.teal)) + pill(200, 262, "No involvement", { st: C.coral }));
    s += H("cp", mega(40, 120, 1.6, C.plum) + rep(9, (i) => K("lf" + i, paper(110 + (i % 3) * 70, 40 + Math.floor(i / 3) * 50, 34, 40, C.plum, 2))) +
      man(300, 250, 1.3, C.navy) + K("key", R(330, 238, 30, 10, C.gold, 3) + O(326, 243, 9, "none", `stroke="${C.gold}" stroke-width="4"`)) + pill(120, 268, "Ownership not moved", { st: C.coral, sz: 13 }));
    let cd = R(30, 160, 340, 22, C.wood, 6) + man(70, 250, 1.3, C.teal) + man(330, 250, 1.3, C.teal) + man(200, 262, 1.3, C.teal);
    ["Arrive", "Check", "Fix", "Settle"].forEach((t, i) => { cd += K("bk" + i, R(54 + i * 78, 112, 64, 40, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + T(86 + i * 78, 137, t, 14, C.navy)); });
    cd += H("ap", R(46, 100, 316, 64, "none", 10, `stroke="${C.coral}" stroke-width="3" stroke-dasharray="6 5"`) + pill(200, 64, "Approve this?", { st: C.coral, sz: 13 }) + cross(282, 64, 1.3, C.coral, 4));
    cd += H("cg", pill(200, 64, "Input changes decisions", { bg: C.green, st: C.green, fg: C.white, sz: 13 }));
    s += H("co", cd + T(200, 36, "Co-design", 17, C.green));
    return s;
  }, play: (c, j) => {
      c.vis({ pc: j === 0, cp: j === 1, co: j >= 2, ap: j === 2, cg: j === 3 });
    // The superseded approval caption shares the co-design caption's position.
    c.op("ap", j === 2 ? 1 : 0);
    c.mv("b83", { sx: j === 0 ? 1 : 0.02, pv: [40, 90] }, { d: 1.1 });
    for (let i = 0; i < 9; i++) c.mv("lf" + i, j === 1 ? { y: 10 } : { y: -20 }, { d: 1, dl: i * 0.08 });
    c.mv("bk1", j === 3 ? { x: 78 } : {}, { d: 1, dl: 0.8 }); c.mv("bk2", j === 3 ? { x: -78 } : {}, { d: 1, dl: 0.8 });
    [0, 3].forEach((i) => c.mv("bk" + i, {}));
  } });

  // V8 (24-26) · adapted from https://motionarray.com/after-effects-templates/infographics-pack-100132/ — per-element metric timelines
  vis.push({ r: [24, 26], art: () => {
    const TL = [["Design", 52], ["Role", 148], ["Document", 252], ["Schedule", 348]];
    let s = "";
    TL.forEach((t, i) => { s += K("tl" + i, R(t[1] - 44, 40, 88, 110, C.white, 12, `stroke="${C.green}" stroke-width="2.4"`) + T(t[1], 136, t[0], 14, C.green)); });
    s += K("icn", P("M30 92 H74 M52 70 V114", C.blue, 4) + man(148, 104, 1.1, C.teal) + paper(234, 66, 36, 44, C.navy, 3) + cal(326, 66, 44, 44, C.navy));
    s += H("tags", ptag(80, 196, "Supervisor time") + ptag(250, 196, "Design effort") + ptag(170, 240, "Firm commitment"));
    s += H("cmp", P("M200 270 V200", C.navy, 4) + K("bm2", P("M90 200 H310", C.navy, 4) + rep(2, (i) => R(70, 186 - i * 10, 40, 10, C.gold, 2)) + rep(9, (i) => R(270, 186 - i * 10, 60, 10, C.coral, 2))) +
      T(90, 250, "Adoption costs", 13, C.amber) + T(300, 250, "Failed go-live", 13, C.coral));
    return s;
  }, play: (c, j) => {
    for (let i = 0; i < 4; i++) { c.op("tl" + i, j === 2 ? 0 : 1, { dl: i * 0.1 }); c.mv("tl" + i, j === 0 ? {} : { y: 0 }, { dl: i * 0.15 }); }
    c.op("icn", j === 2 ? 0 : 1);
    c.vis({ tags: j === 1, cmp: j === 2 });
    c.mv("tags", j === 1 ? {} : { y: -20 }, { e: "bounce.out" });
    c.mv("bm2", { r: j === 2 ? 10 : 0, pv: [200, 200] }, { d: 1.3, dl: 0.4, e: "elastic.out(1,0.5)" });
  } });

  // V9 (27-28) · adapted from https://observablehq.com/@d3/animated-quadtree — a region subdividing into quadrants
  vis.push({ r: [27, 28], art: () => {
    let s = H("zo", K("fd", R(150, 120, 100, 60, C.white, 10, `stroke="${C.teal}" stroke-width="2.4"`) + T(200, 155, "Front desk", 14, C.teal)) +
      [[60, 70], [340, 70], [60, 240], [340, 240], [200, 50]].map((p) => man(p[0], p[1], 1.2, C.slate) + qDot(p[0] + 18, p[1] - 30, 9)).join("") + pill(200, 270, "Others decide too", { st: C.navy, sz: 13 }));
    s += H("gr", D("ax", "M60 260 V40 M60 260 H370", C.navy, 3) + D("v", "M215 50 V255", C.slate, 2) + D("h", "M65 150 H365", C.slate, 2) +
      T(30, 150, "Power", 14, C.navy, "middle", 'transform="rotate(-90 30 150)"') + T(214, 284, "Interest", 14, C.navy) + pill(214, 24, "Where effort counts", { st: C.green, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ zo: j === 0, gr: j === 1 });
    c.mv("fd", j === 0 ? { s: 0.8 } : {}, { d: 1.2 });
    c.dr("ax", j === 1 ? 1 : 0, { d: 0.8 }); c.dr("v", j === 1 ? 1 : 0, { d: 0.7, dl: 0.6 }); c.dr("h", j === 1 ? 1 : 0, { d: 0.7, dl: 0.9 });
  } });

  VS[id] = makeScene({ id, N, labels, vis, bg: "#f3f5f2",
    desc: "Eleven weeks before go-live, each diagnosed cause gets its own response: redesign for Marina's defect, a design role for experts, a written redeployment position for job fear, fewer and better-spaced changes for fatigue, and co-design for no involvement, each with a stated cost." });
  BG.push([id, "#f3f5f2"]);
}

// ============================================================
// O3a · The stakeholder power-interest grid · 27 moments · 10 visuals
// Named markers move to the exact quadrant the narration states:
// COO + process owner -> manage closely, legal -> keep satisfied,
// 84 front-line staff -> keep informed, external auditor -> monitor.
// ============================================================
{
  const id = "O3a", N = 27;
  const labels = [
    "Looking beyond reception", "Others decide quietly", "Who are stakeholders?", "Six stakeholder groups",
    "Attention is limited", "The power-interest grid", "Power: affect the outcome", "Interest: touches their work",
    "Place them honestly", "Top right: manage closely", "Frequent contact, co-design", "Legal: keep satisfied",
    "Late objections stop everything", "Manage expectations early", "Staff: high interest", "Consult and explain",
    "A neglected corner", "Auditor: monitor", "Periodic updates suffice", "The auditor may move",
    "Attention, not respect", "Power beyond titles", "Colleagues follow her", "Her shift drifts back",
    "Judge real influence", "Pictures must change action", "How to engage?"
  ];
  const Q = { TL: [147, 88], TR: [302, 88], BL: [147, 204], BR: [302, 204] };
  const grid = (lab = true) => R(70, 30, 310, 232, C.white, 10, `stroke="${C.mist}" stroke-width="2"`) + P("M225 34 V258 M74 146 H376", C.slate, 1.8, 'stroke-dasharray="5 5"') +
    P("M70 262 V24 M70 262 H386", C.navy, 3) + T(44, 146, "Power", 14, C.navy, "middle", 'transform="rotate(-90 44 146)"') + T(225, 288, "Interest", 14, C.navy) +
    (lab ? T(147, 54, "Keep satisfied", 13, C.plum) + T(302, 54, "Manage closely", 13, C.coral) + T(147, 250, "Monitor", 13, C.slate) + T(302, 250, "Keep informed", 13, C.teal) : "");
  const vis = [];

  // V1 (0-1) · adapted from https://www.behance.net/gallery/159045079/Process-What-is-a-Motion-Designer- — illustrated vignettes advanced beat by beat
  vis.push({ r: [0, 1], art: () => {
    let s = K("sp", F("M200 0 L120 240 H280 Z", "rgba(239,194,90,.28)") + desk(200, 236, 170) + man(150, 222, 1.2, C.teal) + man(200, 220, 1.2, C.teal) + man(250, 222, 1.2, C.teal));
    s += H("dg", pill(200, 40, "Front desk diagnosed", { bg: C.green, st: C.green, fg: C.white }));
    s += H("oth", [[40, 120], [90, 70], [310, 70], [360, 120], [60, 200], [340, 200]].map((p) => man(p[0], p[1], 1.1, "#7d8ea0") + P(`M${p[0]} ${p[1] + 14} Q200 160 200 196`, "#9fb0c2", 1.6, 'stroke-dasharray="4 4"')).join("") +
      pill(200, 40, "Others decide its fate", { st: C.plum, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ dg: j === 0, oth: j === 1 });
    c.mv("sp", j === 1 ? { s: 0.6, y: 50 } : {}, { d: 1.4 }); c.op("sp", j === 1 ? 0.7 : 1);
  } });

  // V2 (2-3) · adapted from https://lottiefiles.com/free-animation/process-fmpDUgNx8K — connections drawn and joined
  vis.push({ r: [2, 3], art: () => {
    let s = H("aff", arw(80, 70, 160, 120, C.coral, 3) + T(80, 56, "Can affect it", 15, C.coral) + arw(240, 180, 320, 230, C.teal, 3) + T(320, 264, "Affected by it", 15, C.teal));
    const SH = [["COO", 200, 52], ["Process owner", 330, 92], ["Finance", 340, 206], ["Legal", 200, 252], ["External auditor", 72, 206], ["Front-line staff", 74, 92]];
    SH.forEach((h, i) => { s += H("sh" + i, P(`M200 150 L${h[1]} ${h[2]}`, C.mist, 2) + pill(h[1], h[2], h[0], { st: C.navy, sz: 13 })); });
    s += O(200, 150, 46, C.navy) + T(200, 146, "The", 15, C.white) + T(200, 166, "change", 15, C.white);
    return s;
  }, play: (c, j) => {
    c.op("aff", j === 0 ? 1 : 0);
    for (let i = 0; i < 6; i++) { c.op("sh" + i, j === 1 ? 1 : 0, { dl: j === 1 ? i * 0.15 : 0 }); c.mv("sh" + i, j === 1 ? {} : { s: 0.5 }, { dl: i * 0.15, e: "back.out(1.6)" }); }
  } });

  // V3 (4-5) · adapted from https://lottiefiles.com/free-animation/process-para-qujCEQ2AKT — rotate, wait, finish
  vis.push({ r: [4, 5], art: () => {
    let s = H("hg", F("M60 50 H140 L104 140 L140 230 H60 L96 140 Z", "#e7edf3", `stroke="${C.navy}" stroke-width="3"`) + K("sand", F("M70 60 H130 L100 130 Z", C.gold)) + F("M80 226 H120 L100 200 Z", C.gold) +
      rep(6, (i) => man(190 + (i % 3) * 70, 110 + Math.floor(i / 3) * 90, 1, C.slate) + R(176 + (i % 3) * 70, 132 + Math.floor(i / 3) * 90, 28, 6, C.gold, 2)) +
      pill(270, 270, "Equal attention: too thin", { st: C.coral, sz: 13 }));
    s += H("gt", K("q0", R(80, 40, 116, 100, C.lilac, 8)) + K("q1", R(204, 40, 116, 100, C.rose, 8)) + K("q2", R(80, 148, 116, 100, "#e6ebf0", 8)) + K("q3", R(204, 148, 116, 100, C.mint, 8)) +
      P("M70 258 V30 M70 258 H330", C.navy, 3) + T(200, 284, "The power-interest grid", 16, C.navy) + T(355, 150, "Tool", 15, C.slate));
    return s;
  }, play: (c, j) => {
    c.vis({ hg: j === 0, gt: j === 1 });
    c.mv("sand", { sy: j === 0 ? 0.4 : 1, pv: [100, 130] }, { d: 2 });
    const OFF = [[-60, -40], [60, -40], [-60, 40], [60, 40]];
    for (let i = 0; i < 4; i++) c.mv("q" + i, j === 1 ? {} : { x: OFF[i][0], y: OFF[i][1], s: 0.6 }, { d: 0.9, dl: i * 0.15, e: "back.out(1.5)" });
  } });

  // V4 (6-7) · adapted from https://motionarray.com/after-effects-templates/infographics-for-everything-2593374/ — full-screen graphic and text brought in together
  vis.push({ r: [6, 7], art: () => {
    let s = H("pw", R(40, 30, 54, 240, "#e1e8ef", 27) + K("pf", R(40, 30, 54, 240, C.plum, 27)) + T(67, 290, "Power", 15, C.plum) +
      [["Authority", 60], ["Budget", 115], ["Approval", 170], ["Ability to block", 225]].map((a, i) => O(140, a[1], 18, C.lilac) + T(170, a[1] + 5, a[0], 15, C.plum, "start")).join("") +
      star(140, 60, 10, C.plum) + coin(140, 116, 11) + R(130, 160, 20, 18, C.plum, 3) + R(126, 222, 28, 8, C.coral, 3));
    s += H("in", R(30, 120, 340, 54, "#e1e8ef", 27) + K("if", R(30, 120, 340, 54, C.teal, 27)) + T(200, 153, "Interest", 17, C.white) +
      [["Their work", 80], ["Their goals", 200], ["Their worries", 320]].map((a) => T(a[1], 262, a[0], 15, C.teal)).join("") +
      desk(80, 206, 50) + O(200, 210, 14, "none", `stroke="${C.teal}" stroke-width="3"`) + O(200, 210, 5, C.teal) + cloudI(320, 208, 0.9, C.teal) +
      pill(200, 66, "How it touches them", { st: C.teal, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ pw: j === 0, in: j === 1 });
    c.mv("pf", { sy: j === 0 ? 1 : 0.02, pv: [67, 270] }, { d: 1.4 });
    c.mv("if", { sx: j === 1 ? 1 : 0.02, pv: [30, 147] }, { d: 1.4 });
  } });

  // V5 (8-10) · adapted from https://observablehq.com/@d3/animated-quadtree — points dropped into subdivided regions
  vis.push({ r: [8, 10], art: () => {
    let s = grid(false) + H("ql", T(302, 54, "Manage closely", 13, C.coral)) + H("dt", pill(120, 284, "Placed as of today", { st: C.slate, sz: 13 }));
    s += K("coo", pill(286, 92, "COO", { bg: C.coral, st: C.coral, fg: C.white }));
    s += K("po", pill(310, 124, "Process owner", { bg: C.coral, st: C.coral, fg: C.white, sz: 13 }));
    s += H("en", cal(250, 160, 110, 70, C.coral, "Every week") + rep(6, (i) => O(266 + (i % 3) * 34, 196 + Math.floor(i / 3) * 18, 5, C.coral)) +
      R(104, 184, 100, 12, C.wood, 3) + T(154, 176, "Design table", 13, C.navy) + arw(204, 190, 246, 190, C.navy, 2));
    return s;
  }, play: (c, j) => {
    c.vis({ ql: j >= 1, dt: j === 0, en: j === 2 });
    c.mv("coo", j >= 1 ? {} : { x: -250, y: 160 }, { d: 1.2, e: "power3.inOut" }); c.op("coo", j >= 1 ? 1 : 0);
    c.mv("po", j >= 1 ? {} : { x: -250, y: 130 }, { d: 1.2, dl: 0.25, e: "power3.inOut" }); c.op("po", j >= 1 ? 1 : 0);
  } });

  // V6 (11-13) · adapted from https://motionarray.com/after-effects-templates/corporate-timeline-77666/ — milestones with path and text transitions
  vis.push({ r: [11, 13], art: () => {
    let s = H("gl", grid(false) + T(147, 54, "Keep satisfied", 13, C.plum) + K("lg", pill(147, 92, "Legal", { bg: C.plum, st: C.plum, fg: C.white })) +
      T(147, 122, "High power", 13, C.plum) + T(147, 138, "Lower interest", 13, C.slate));
    s += H("tl", P("M30 200 H370", C.navy, 4) + T(40, 236, "Week 1", 14, C.navy, "start") + T(360, 236, "Go-live", 14, C.green, "end") + R(352, 170, 14, 30, C.green, 3) +
      K("bar", R(300, 80, 16, 120, C.coral, 3) + R(270, 80, 76, 14, C.coral, 3)) + K("note", env(40, 140, 40, 28, C.plum)) +
      H("lo", pill(250, 40, "Late objection", { bg: C.coral, st: C.coral, fg: C.white })) + H("ok", pill(250, 40, "Expectations managed", { bg: C.green, st: C.green, fg: C.white, sz: 13 })));
    return s;
  }, play: (c, j) => {
    c.vis({ gl: j === 0, tl: j >= 1, lo: j === 1, ok: j === 2 });
    c.mv("lg", j === 0 ? {} : { x: -80 }, { d: 1.1 });
    c.mv("bar", { r: j === 1 ? 0 : -80, pv: [308, 200] }, { d: 0.9, e: j === 1 ? "bounce.out" : "power2.out" });
    c.mv("note", j === 2 ? { x: 40, y: 12 } : j === 1 ? { x: 240, y: 10 } : {}, { d: 1.3, e: "power2.inOut" });
  } });

  // V7 (14-16) · adapted from https://dribbble.com/shots/27247003-Data-Workflow-Animation — many nodes flowing into one region
  vis.push({ r: [14, 16], art: () => {
    let s = grid(false) + T(302, 250, "Keep informed", 13, C.teal);
    for (let i = 0; i < 84; i++) s += `<circle data-k="sd" data-i="${i}" cx="${236 + (i % 14) * 10}" cy="${164 + Math.floor(i / 14) * 11}" r="3.6" fill="${C.teal}"/>`;
    s += H("lb", pill(302, 132, "84 front-line staff", { st: C.teal, sz: 13 }));
    s += H("tw", man(140, 150, 1.4, C.navy) + arw(170, 134, 250, 160, C.teal, 3) + arw(250, 186, 170, 164, C.green, 3) + T(196, 128, "Consult", 14, C.teal) + T(206, 206, "Explain", 14, C.green));
    s += H("ng", R(228, 150, 148, 106, "rgba(160,160,160,.35)", 6) + P("M376 150 L330 196 M376 150 L346 210 M376 150 L362 214 M340 190 Q356 186 360 196", C.slate, 1.3) +
      pill(150, 200, "83% not consulted", { bg: C.coral, st: C.coral, fg: C.white, sz: 13 }) + T(150, 236, "A neglected corner", 14, C.coral));
    return s;
  }, pre: (c) => {
    c.all('[data-k="sd"]').forEach((el) => { const i = +el.getAttribute("data-i"); c.mvEl(el, { x: -150 - (i % 7) * 6, y: -110 + (i % 5) * 8, s: 0.4 }); });
  }, play: (c, j) => {
    c.all('[data-k="sd"]').forEach((el) => { const i = +el.getAttribute("data-i"); c.mvEl(el, {}, { d: 1.1, dl: (i % 14) * 0.03 + Math.floor(i / 14) * 0.05 }); c.opEl(el, j === 2 ? 0.5 : 1); });
    c.vis({ lb: j === 0, tw: j === 1, ng: j === 2 });
  } });

  // V8 (17-20) · adapted from https://lottiefiles.com/free-animation/dashboard-M05MmlnoOP — a graph filling and a metric highlighted
  vis.push({ r: [17, 20], art: () => {
    let s = grid(true) + K("au", pill(147, 170, "External auditor", { bg: C.slate, st: C.slate, fg: C.white, sz: 13 }));
    s += H("pu", rep(4, (i) => env(84 + i * 34, 196, 26, 18, C.slate)) + T(147, 228, "Periodic updates", 13, C.slate) +
      arw(196, 150, 260, 104, C.gold, 3) + arw(196, 160, 258, 186, C.gold, 3) + T(330, 146, "Effort freed", 14, C.amber));
    s += H("mv", P("M206 170 C250 170 270 200 296 200", C.slate, 2.6, 'stroke-dasharray="6 5"') + qDot(306, 196, 11) + pill(300, 128, "If audit reaches desk", { st: C.slate, sz: 13 }));
    s += H("rs", [[147, 104], [302, 104], [147, 196], [302, 196]].map((p) => heart(p[0], p[1] + 8, 1.3, C.coral)).join("") + pill(225, 146, "Attention, not respect", { bg: C.white, st: C.navy, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.mv("au", j === 0 ? {} : {}, {}); c.op("au", j === 3 ? 0.3 : 1);
    c.vis({ pu: j === 1, mv: j === 2, rs: j === 3 });
  } });

  // V9 (21-24) · adapted from https://old.observablehq.com/@d3/hierarchy-traversal-animated — a tree visited node by node
  vis.push({ r: [21, 24], art: () => {
    const box = (x, y, t, col = C.navy) => R(x - 48, y - 16, 96, 32, C.white, 8, `stroke="${col}" stroke-width="2"`) + T(x, y + 5, t, 13, col);
    let s = H("oc", P("M200 56 V76 M90 76 H310 M90 76 V96 M200 76 V96 M310 76 V96 M90 128 V150 M60 150 H120 M60 150 V168 M120 150 V168", C.slate, 2) +
      box(200, 40, "COO") + box(90, 112, "Manager") + box(200, 112, "Manager") + box(310, 112, "Manager") + K("ms", O(120, 184, 15, C.teal) + T(120, 214, "Marina sup.", 13, C.teal)) + O(60, 184, 12, "#9fb0c2") +
      pill(250, 184, "Little formal authority", { st: C.slate, sz: 13 }));
    s += H("fl", rep(6, (i) => D("il" + i, `M${30 + i * 18} 268 Q${70 + i * 8} 230 120 200`, C.gold, 2.4)) + rep(6, (i) => man(30 + i * 18, 280, 0.6, C.teal)) + O(120, 184, 26, "none", `stroke="${C.gold}" stroke-width="3"`) +
      pill(280, 250, "Colleagues follow her", { bg: C.gold, st: C.gold, fg: C.ink, sz: 13 }));
    s += H("dr", O(70, 214, 16, C.teal) + T(70, 248, "Her shift", 13, C.teal) + arw(90, 214, 214, 214, C.slate, 2) + P("M220 180 H370", C.green, 6) + T(370, 166, "New process", 13, C.green, "end") + P("M220 250 H370", C.slate, 6, 'stroke-dasharray="8 6"') + T(370, 274, "Old routine", 13, C.slate, "end") +
      rep(5, (i) => K("st" + i, face(236 + i * 24, 180, 8, C.teal))) + T(296, 214, "After go-live", 13, C.coral));
    const ST = ["List", "Judge power", "Judge interest", "Place", "Plan"];
    let p = "";
    ST.forEach((t, i) => { p += K("ps" + i, R(10 + i * 78, 110, 70, 80, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + T(45 + i * 78, 144, t.split(" ")[0], 13, C.navy) + (t.split(" ")[1] ? T(45 + i * 78, 162, t.split(" ")[1], 13, C.navy) : "")) +
      (i < 4 ? arw(80 + i * 78, 150, 88 + i * 78, 150, C.slate, 2) : ""); });
    s += H("pr", p + pill(200, 240, "Real influence, honestly", { st: C.navy }));
    return s;
  }, play: (c, j) => {
    c.vis({ oc: j <= 2, fl: j === 1, dr: j === 2, pr: j === 3 });
    c.op("oc", j <= 1 ? 1 : 0);
    for (let i = 0; i < 6; i++) c.dr("il" + i, j === 1 ? 1 : 0, { d: 0.8, dl: i * 0.12 });
    for (let i = 0; i < 5; i++) c.mv("st" + i, j === 2 ? { y: 70 } : {}, { d: 1.2, dl: 0.4 + i * 0.15, e: "power2.inOut" });
    for (let i = 0; i < 5; i++) c.mv("ps" + i, j === 3 ? {} : { y: 20 }, { dl: i * 0.15 });
  } });

  // V10 (25-26) · adapted from https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ — transitions between dashboard panels
  vis.push({ r: [25, 26], art: () => {
    let s = H("pa", R(30, 70, 140, 120, "#c9a06a", 8) + R(40, 80, 120, 100, C.white, 4) + grid4(52, 92, 96, 76) + T(100, 214, "A picture", 15, C.navy) +
      arw(184, 130, 226, 130, C.navy, 3) + cal(240, 70, 130, 120, C.green, "Her week") + rep(6, (i) => R(254 + (i % 3) * 38, 102 + Math.floor(i / 3) * 40, 28, 28, [C.coral, C.plum, C.teal, C.slate, C.coral, C.teal][i], 4)) +
      T(305, 214, "Changed actions", 15, C.green));
    s += H("hw", grid(true) + [[147, 100], [302, 100], [147, 196], [302, 196]].map((p) => qDot(p[0], p[1], 15, C.navy)).join("") + pill(225, 146, "How to engage?", { bg: C.white, st: C.navy }));
    return s;
  }, play: (c, j) => { c.vis({ pa: j === 0, hw: j === 1 }); } });

  VS[id] = makeScene({ id, N, labels, vis, bg: "#f2f3f8",
    desc: "The power-interest grid at Qasr: the COO and process owner are managed closely, legal is kept satisfied, the 84 front-line staff are kept informed through consultation, the external auditor is monitored, and informal power such as the Marina supervisor's must be judged honestly." });
  BG.push([id, "#f2f3f8"]);
}

addStyles(BG);
})();
// END FILE w04-claude-v2-part2.js

// OPER621 · Week 4 · BPM and Organisational Change — animated teaching scenes (v2)
// File: w04-claude-v2-part3.js  ·  Scenes: O3b, O3c, O3d
// Standalone part: registers its own scenes and appends its own scoped rules into the
// single shared <style id="vl-sc-w04">. Parts may be loaded in any order or concatenated.
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
// Design rule for v2: every narration moment k maps to exactly one visual (8-11 visuals per
// section, a new one every 2-4 sentences); each visual names the benchmark template whose
// motion grammar it adapts (URL in a comment). Artwork and code are original.
(() => {
"use strict";
window.VL_SCENES = window.VL_SCENES || {};
const VS = window.VL_SCENES;
const PART = "part3";

// ---------- palette ----------
const C = {
  navy: "#173f6b", ink: "#14263b", blue: "#2c6ea6", sky: "#e4eef7", teal: "#12858c",
  green: "#2f7d55", mint: "#e2f2e8", amber: "#a86f0a", gold: "#efc25a", coral: "#cf4b3a",
  rose: "#fbe3dd", plum: "#664a8f", lilac: "#ece6f5", slate: "#5b6f85", mist: "#cfd9e4",
  paper: "#fffdf8", white: "#ffffff", sand: "#f3ead9", red: "#b3302f", wood: "#9a7349", night: "#10263d"
};

// ---------- small utilities ----------
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const num = (v, f) => { const x = Number(v); return Number.isFinite(x) ? x : f; };
const reduced = () => {
  try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
  catch (_) { return false; }
};
const gsapOK = () => !!(window.gsap && typeof window.gsap.to === "function" && typeof window.gsap.set === "function") && !reduced();
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");
const inR = (k, a, b) => k >= a && k <= b;
const r1 = (v) => Math.round(v * 10) / 10;
const lerp = (a, b, t) => a + (b - a) * t;
const warn = (m) => { try { if (window.console) window.console.warn("[VL W04 " + PART + "] " + m); } catch (_) {} };

// ---------- SVG string builders ----------
const R = (x, y, w, h, f, rx = 0, ex = "") => `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${r1(rx)}" fill="${f}" ${ex}/>`;
const O = (cx, cy, r, f, ex = "") => `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}" fill="${f}" ${ex}/>`;
const E = (cx, cy, rx, ry, f, ex = "") => `<ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="${f}" ${ex}/>`;
const P = (d, s, w = 2, ex = "") => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const F = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
const D = (k, d, s, w = 3, ex = "") => `<path data-k="${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100" ${ex}/>`;
const T = (x, y, s, sz = 15, f = C.ink, a = "middle", ex = "") => `<text x="${r1(x)}" y="${r1(y)}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const NT = (k, x, y, s, sz = 15, f = C.ink, a = "middle", ex = "") => `<text data-k="${k}" x="${r1(x)}" y="${r1(y)}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const K = (k, b, ex = "") => `<g data-k="${k}" ${ex}>${b}</g>`;
const H = (k, b, ex = "") => `<g data-k="${k}" style="opacity:0" ${ex}>${b}</g>`;
const tw = (s, sz) => Math.round(String(s).length * sz * 0.58 + sz * 1.3);
const pill = (x, y, s, o = {}) => {
  const sz = o.sz || 14, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.85);
  return R(x - w / 2, y - h / 2, w, h, o.bg || C.white, o.rx == null ? h / 2 : o.rx,
    `stroke="${o.st || C.navy}" stroke-width="${o.sw || 1.8}"${o.dash ? ' stroke-dasharray="5 4"' : ""}`) +
    T(x, y + sz * 0.36, s, sz, o.fg || o.st || C.navy);
};
const arw = (x1, y1, x2, y2, col = C.navy, w = 2.4, ex = "") => {
  const a = Math.atan2(y2 - y1, x2 - x1), L = 8 + w * 1.6, Wd = 4 + w * 1.1;
  const bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
  return P(`M${r1(x1)} ${r1(y1)} L${r1(bx)} ${r1(by)}`, col, w, ex) +
    F(`M${r1(x2)} ${r1(y2)} L${r1(bx + Wd * Math.sin(a))} ${r1(by - Wd * Math.cos(a))} L${r1(bx - Wd * Math.sin(a))} ${r1(by + Wd * Math.cos(a))} Z`, col);
};

// ---------- icon library (all coordinates absolute; no transform attributes on keyed nodes) ----------
const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${r1(x - 7 * s)} ${r1(y)} l${r1(5 * s)} ${r1(5 * s)} l${r1(10 * s)} ${r1(-11 * s)}`, col, w);
const cross = (x, y, s = 1, col = C.coral, w = 3) => P(`M${r1(x - 6 * s)} ${r1(y - 6 * s)} l${r1(12 * s)} ${r1(12 * s)} M${r1(x + 6 * s)} ${r1(y - 6 * s)} l${r1(-12 * s)} ${r1(12 * s)}`, col, w);
const okDot = (x, y, r = 10, col = C.green) => O(x, y, r, col) + tick(x, y, r / 15, C.white, Math.max(2, r / 5));
const noDot = (x, y, r = 10, col = C.coral) => O(x, y, r, col) + cross(x, y, r / 15, C.white, Math.max(2, r / 5));
const bang = (x, y, r = 10, col = C.coral) => O(x, y, r, col) + T(x, y + r * 0.45, "!", Math.max(13, Math.round(r * 1.3)), C.white);
const qDot = (x, y, r = 10, col = C.plum) => O(x, y, r, col) + T(x, y + r * 0.45, "?", Math.max(13, Math.round(r * 1.3)), C.white);
const man = (x, y, s = 1, col = C.navy) => O(x, y - 17 * s, 8 * s, col) +
  F(`M${r1(x - 13 * s)} ${r1(y + 12 * s)} Q${r1(x - 13 * s)} ${r1(y - 5 * s)} ${r1(x)} ${r1(y - 5 * s)} Q${r1(x + 13 * s)} ${r1(y - 5 * s)} ${r1(x + 13 * s)} ${r1(y + 12 * s)} Z`, col);
const traveller = (x, y, s = 1, col = C.blue) => man(x, y, s, col) + R(x + 12 * s, y - 1 * s, 12 * s, 14 * s, C.amber, 2 * s) +
  P(`M${r1(x + 15 * s)} ${r1(y - 1 * s)} v${r1(-4 * s)} h${r1(6 * s)} v${r1(4 * s)}`, C.amber, 1.6 * s);
const face = (x, y, r = 9, col = C.blue) => O(x, y, r, col) + O(x - r * 0.34, y - r * 0.15, r * 0.15, C.white) + O(x + r * 0.34, y - r * 0.15, r * 0.15, C.white) +
  P(`M${r1(x - r * 0.36)} ${r1(y + r * 0.3)} Q${r1(x)} ${r1(y + r * 0.58)} ${r1(x + r * 0.36)} ${r1(y + r * 0.3)}`, C.white, Math.max(1.2, r * 0.13));
const kiosk = (x, y, s = 1, col = C.navy) => R(x - 14 * s, y - 52 * s, 28 * s, 52 * s, col, 5 * s) + R(x - 10 * s, y - 47 * s, 20 * s, 15 * s, "#bfe3f2", 2 * s) +
  R(x - 7 * s, y - 25 * s, 14 * s, 4 * s, "#9fb4c8", 1) + R(x - 18 * s, y, 36 * s, 5 * s, col, 2 * s);
const desk = (x, y, w = 90, col = C.wood) => R(x - w / 2 - 4, y - 6, w + 8, 8, "#6f5233", 3) + R(x - w / 2, y, w, 26, col, 3);
const clock = (x, y, r, col = C.coral, bg = C.white) => O(x, y, r, bg, `stroke="${col}" stroke-width="${r1(Math.max(2, r / 6))}"`) +
  P(`M${r1(x)} ${r1(y - r * 0.6)} V${r1(y)} L${r1(x + r * 0.42)} ${r1(y + r * 0.28)}`, col, r1(Math.max(2, r / 7)));
const paper = (x, y, w, h, col = C.navy, n = 3) => R(x, y, w, h, C.white, 4, `stroke="${col}" stroke-width="1.8"`) +
  rep(n, (i) => P(`M${r1(x + 7)} ${r1(y + 12 + i * (h - 18) / Math.max(1, n))} H${r1(x + w - 7 - (i === n - 1 ? w * 0.3 : 0))}`, C.mist, 2.2));
const env = (x, y, w, h, col = C.navy, bg = C.white) => R(x, y, w, h, bg, 3, `stroke="${col}" stroke-width="1.8"`) +
  P(`M${r1(x)} ${r1(y)} L${r1(x + w / 2)} ${r1(y + h * 0.55)} L${r1(x + w)} ${r1(y)}`, col, 1.8);
const coin = (x, y, r = 12, col = C.gold) => E(x, y, r, r * 0.42, col, `stroke="${C.amber}" stroke-width="1.5"`);
const star = (x, y, r, col = C.gold) => {
  let d = "";
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; d += (i ? "L" : "M") + r1(x + rr * Math.cos(a)) + " " + r1(y + rr * Math.sin(a)); }
  return F(d + "Z", col);
};
const bulb = (x, y, s = 1, col = C.gold) => O(x, y, 10 * s, col) + R(x - 5 * s, y + 8 * s, 10 * s, 7 * s, C.slate, 2) +
  P(`M${r1(x - 16 * s)} ${r1(y - 8 * s)} l${r1(-5 * s)} ${r1(-4 * s)} M${r1(x + 16 * s)} ${r1(y - 8 * s)} l${r1(5 * s)} ${r1(-4 * s)} M${r1(x)} ${r1(y - 16 * s)} v${r1(-6 * s)}`, col, 2.2);
const mega = (x, y, s = 1, col = C.plum) => R(x - 9 * s, y - 6 * s, 9 * s, 12 * s, col, 2) +
  F(`M${r1(x)} ${r1(y - 6 * s)} L${r1(x + 24 * s)} ${r1(y - 16 * s)} V${r1(y + 16 * s)} L${r1(x)} ${r1(y + 6 * s)} Z`, col) +
  P(`M${r1(x - 4 * s)} ${r1(y + 6 * s)} l${r1(3 * s)} ${r1(12 * s)}`, col, 3 * s);
const waves = (x, y, s = 1, col = C.plum) => rep(3, (i) => P(`M${r1(x + (8 + i * 9) * s)} ${r1(y - (8 + i * 6) * s)} Q${r1(x + (14 + i * 11) * s)} ${r1(y)} ${r1(x + (8 + i * 9) * s)} ${r1(y + (8 + i * 6) * s)}`, col, 2.4));
const cal = (x, y, w, h, col = C.navy, title = "") => R(x, y, w, h, C.white, 6, `stroke="${col}" stroke-width="1.8"`) + R(x, y, w, 18, col, 6) + R(x, y + 9, w, 9, col) +
  (title ? T(x + w / 2, y + 14, title, 13, C.white) : "");
const lockI = (x, y, s = 1, col = C.red) => R(x - 9 * s, y - 2 * s, 18 * s, 14 * s, col, 2) +
  P(`M${r1(x - 5 * s)} ${r1(y - 2 * s)} v${r1(-5 * s)} a${r1(5 * s)} ${r1(5 * s)} 0 0 1 ${r1(10 * s)} 0 v${r1(5 * s)}`, col, r1(2.2 * s));
const shieldI = (x, y, s = 1, col = C.green) => F(`M${r1(x)} ${r1(y - 14 * s)} L${r1(x + 12 * s)} ${r1(y - 9 * s)} V${r1(y + 1 * s)} Q${r1(x + 12 * s)} ${r1(y + 11 * s)} ${r1(x)} ${r1(y + 15 * s)} Q${r1(x - 12 * s)} ${r1(y + 11 * s)} ${r1(x - 12 * s)} ${r1(y + 1 * s)} V${r1(y - 9 * s)} Z`, col);
const heart = (x, y, s = 1, col = C.coral) => F(`M${r1(x)} ${r1(y + 9 * s)} C${r1(x - 15 * s)} ${r1(y - 1 * s)} ${r1(x - 9 * s)} ${r1(y - 13 * s)} ${r1(x)} ${r1(y - 5 * s)} C${r1(x + 9 * s)} ${r1(y - 13 * s)} ${r1(x + 15 * s)} ${r1(y - 1 * s)} ${r1(x)} ${r1(y + 9 * s)} Z`, col);
const cog = (x, y, r, col = C.slate, hole = C.white) => {
  let d = "";
  for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, rr = i % 2 ? r * 0.8 : r; d += (i ? "L" : "M") + r1(x + rr * Math.cos(a)) + " " + r1(y + rr * Math.sin(a)); }
  return F(d + "Z", col) + O(x, y, r * 0.35, hole);
};
const ptag = (x, y, s, col = C.amber) => {
  const sz = 13, w = tw(s, sz) + 12, h = 26;
  return F(`M${r1(x - w / 2)} ${r1(y)} L${r1(x - w / 2 + 12)} ${r1(y - h / 2)} H${r1(x + w / 2)} V${r1(y + h / 2)} H${r1(x - w / 2 + 12)} Z`, C.white, `stroke="${col}" stroke-width="2"`) +
    O(x - w / 2 + 11, y, 3, col) + T(x + 6, y + 4.7, s, sz, col);
};
const bubble = (x, y, w, h, col = C.navy, bg = C.white, tx = 0.2) => R(x, y, w, h, bg, 12, `stroke="${col}" stroke-width="1.8"`) +
  F(`M${r1(x + w * tx)} ${r1(y + h - 1)} l-6 13 l16 -13 Z`, bg, `stroke="${col}" stroke-width="1.8" stroke-linejoin="round"`) + R(x + w * tx - 7, y + h - 4, 20, 4, bg);
const cloudI = (x, y, s = 1, col = "#9aa9b8") => O(x - 14 * s, y, 11 * s, col) + O(x, y - 7 * s, 14 * s, col) + O(x + 15 * s, y, 11 * s, col) + R(x - 25 * s, y, 51 * s, 11 * s, col, 5 * s);
const book = (x, y, w, h, col = C.green, t = "") => R(x, y, w, h, col, 4) + R(x + 5, y + 4, w - 10, h - 8, "rgba(255,255,255,.18)", 3) + P(`M${r1(x + 9)} ${r1(y + 3)} V${r1(y + h - 3)}`, "rgba(0,0,0,.25)", 2) + (t ? T(x + w / 2 + 4, y + h / 2 + 5, t, 13, C.white) : "");
const grid4 = (x, y, w, h, col = C.slate) => R(x, y, w, h, "none", 6, `stroke="${col}" stroke-width="2"`) + P(`M${r1(x + w / 2)} ${r1(y)} V${r1(y + h)} M${r1(x)} ${r1(y + h / 2)} H${r1(x + w)}`, col, 1.8, 'stroke-dasharray="5 4"');

// ---------- stylesheet (scoped per scene, appended once per part into <style id="vl-sc-w04">) ----------
function sceneCSS(id, bg) {
  const s = ".vls-w04-" + id;
  return `
${s}{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:200px;overflow:hidden!important;box-sizing:border-box;border-radius:16px;background:${bg};color:${C.ink};font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w04-stage{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w04-stage>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}
${s} svg text{font-family:inherit;font-weight:700;letter-spacing:.15px}
${s} [data-k],${s} [data-v]{transform-box:fill-box;transform-origin:50% 50%}
${s}.w04-css [data-k],${s}.w04-css [data-v]{transition-property:transform,opacity,fill,stroke-dashoffset;transition-duration:.8s;transition-timing-function:cubic-bezier(.2,.8,.25,1)}
${s}.w04-snap [data-k],${s}.w04-snap [data-v],${s}.w04-rm [data-k],${s}.w04-rm [data-v]{transition:none!important}
${s}.w04-rm *,${s}.w04-snap *{animation:none!important}
${s} .w04-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:38px;padding:6px 12px 8px;font-size:15px;font-weight:800;line-height:1.2;color:${C.navy};background:rgba(255,255,255,.66);border-top:1px solid rgba(23,63,107,.14)}
${s} .w04-no{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w04-txt{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.2px}
${s} .w04-txt.w04-in{animation:vlsw04In .45s cubic-bezier(.2,.8,.25,1)}
${s} .w04-pr{flex:0 0 56px;height:5px;border-radius:5px;background:rgba(23,63,107,.15);overflow:hidden}
${s} .w04-pr i{display:block;height:100%;width:0;background:${C.coral};transition:width .6s ease}
${s}.w04-intro .w04-stage>svg{animation:vlsw04Intro .65s cubic-bezier(.2,.8,.25,1)}
${s} .a-dash{stroke-dasharray:6 7;animation:vlsw04Dash 1.2s linear infinite}
${s} .a-bob,${s} .a-pulse,${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%}
${s} .a-bob{animation:vlsw04Bob 2.4s ease-in-out infinite}
${s} .a-pulse{animation:vlsw04Pulse 1.8s ease-in-out infinite}
${s} .a-spin{animation:vlsw04Spin 6s linear infinite}
${s} .a-blink{animation:vlsw04Blink 1.3s ease-in-out infinite}
@media (max-width:420px){${s} .w04-cap{font-size:14px;min-height:34px;padding:5px 10px 7px}${s} .w04-pr{flex-basis:40px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
}
const KEYFRAMES = `
@keyframes vlsw04In{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes vlsw04Intro{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
@keyframes vlsw04Dash{to{stroke-dashoffset:-26}}
@keyframes vlsw04Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes vlsw04Pulse{0%,100%{opacity:.4;transform:scale(.94)}50%{opacity:1;transform:scale(1.06)}}
@keyframes vlsw04Spin{to{transform:rotate(360deg)}}
@keyframes vlsw04Blink{0%,100%{opacity:1}50%{opacity:.3}}
`;
function addStyles(list) {
  if (typeof document === "undefined" || !document.createElement) return;
  let st = document.getElementById("vl-sc-w04");
  if (!st) { st = document.createElement("style"); st.id = "vl-sc-w04"; (document.head || document.documentElement).appendChild(st); }
  const flag = "data-w04v2-" + PART;
  if (st.getAttribute(flag)) return;
  st.setAttribute(flag, "1");
  st.appendChild(document.createTextNode(KEYFRAMES + list.map((p) => sceneCSS(p[0], p[1])).join("\n")));
}

// ---------- scene factory ----------
// cfg = { id, N, labels[N], bg, desc, deco?(), vis: [{ r:[from,to], art(), play(c, j, k), pre?(c) }] }
// pre(c) runs instantly while a visual is hidden (never during its own fade-out) to stage its entry state.
function makeScene(cfg) {
  const id = cfg.id, N = cfg.N, labels = cfg.labels, V = cfg.vis;
  if (labels.length !== N) warn(id + ": " + labels.length + " labels for " + N + " moments");
  labels.forEach((l, i) => { const w = String(l).trim().split(/\s+/).length; if (w < 2 || w > 4) warn(id + " label " + i + " has " + w + " words"); });
  for (let k = 0; k < N; k++) { const hits = V.filter((v) => inR(k, v.r[0], v.r[1])).length; if (hits !== 1) warn(id + " moment " + k + " covered by " + hits + " visuals"); }
  let root = null, useG = false, counters = [], lastK = -1;
  const mapK = (i, n) => {
    const nn = Math.max(1, Math.floor(num(n, N)));
    const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
    return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
  };
  const q = (sel) => (root ? Array.prototype.slice.call(root.querySelectorAll(sel)) : []);
  function timing(el, t) { el.style.transitionDuration = (t.d == null ? 0.8 : t.d) + "s"; el.style.transitionDelay = (t.dl || 0) + "s"; }
  function tf(el, st, t, snap) {
    const x = st.x || 0, y = st.y || 0, r = st.r || 0;
    const sx = st.sx != null ? st.sx : (st.s != null ? st.s : 1);
    const sy = st.sy != null ? st.sy : (st.s != null ? st.s : 1);
    if (useG) {
      const v = { x, y, rotation: r, scaleX: sx, scaleY: sy };
      if (st.pv) v.svgOrigin = st.pv[0] + " " + st.pv[1]; else v.transformOrigin = "50% 50%";
      if (snap) window.gsap.set(el, v);
      else window.gsap.to(el, Object.assign(v, { duration: t.d == null ? 0.8 : t.d, delay: t.dl || 0, ease: t.e || "power3.out", overwrite: "auto" }));
    } else {
      if (st.pv) { el.style.transformBox = "view-box"; el.style.transformOrigin = st.pv[0] + "px " + st.pv[1] + "px"; }
      else { el.style.transformBox = ""; el.style.transformOrigin = ""; }
      timing(el, t);
      el.style.transform = "translate(" + x + "px," + y + "px) rotate(" + r + "deg) scale(" + sx + "," + sy + ")";
    }
  }
  function op(el, o, t, snap) {
    if (useG) { if (snap) window.gsap.set(el, { opacity: o }); else window.gsap.to(el, { opacity: o, duration: t.d == null ? 0.55 : t.d, delay: t.dl || 0, ease: "power1.out", overwrite: "auto" }); }
    else { timing(el, t); el.style.opacity = String(o); }
  }
  function dash(el, f, t, snap) {
    const v = 100 * (1 - clamp(f, 0, 1));
    if (useG) { if (snap) window.gsap.set(el, { strokeDashoffset: v }); else window.gsap.to(el, { strokeDashoffset: v, duration: t.d == null ? 1.1 : t.d, delay: t.dl || 0, ease: "power2.inOut", overwrite: "auto" }); }
    else { timing(el, t); el.style.strokeDashoffset = String(v); }
  }
  function fill(el, col, t, snap) {
    if (useG) { if (snap) window.gsap.set(el, { fill: col }); else window.gsap.to(el, { fill: col, duration: t.d == null ? 0.55 : t.d, delay: t.dl || 0, overwrite: "auto" }); }
    else { timing(el, t); el.style.fill = col; }
  }
  function count(el, to, fmt, t, snap) {
    const from = num(el.__w04v, to);
    el.__w04v = to;
    if (useG && !snap && from !== to) {
      const o = { v: from };
      counters.push(window.gsap.to(o, { v: to, duration: t.d == null ? 1.2 : t.d, delay: t.dl || 0, ease: "power2.out", onUpdate: () => { el.textContent = fmt(o.v); } }));
    } else el.textContent = fmt(to);
  }
  function ctx(scope, snap) {
    const nodes = (k) => q(scope + ' [data-k="' + k + '"]');
    const each = (k, f) => nodes(k).forEach(f);
    return {
      snap,
      op: (k, o, t = {}) => each(k, (el) => op(el, o, t, snap)),
      mv: (k, st, t = {}) => each(k, (el) => tf(el, st || {}, t, snap)),
      dr: (k, f, t = {}) => each(k, (el) => dash(el, f, t, snap)),
      fl: (k, col, t = {}) => each(k, (el) => fill(el, col, t, snap)),
      tx: (k, s) => each(k, (el) => { if (el.textContent !== String(s)) el.textContent = String(s); }),
      nm: (k, v, fmt, t = {}) => each(k, (el) => count(el, v, fmt || ((x) => String(Math.round(x))), t, snap)),
      vis: (m, t = {}) => Object.keys(m).forEach((k) => each(k, (el) => op(el, m[k] === true ? 1 : m[k] === false ? 0 : num(m[k], 0), t, snap))),
      all: (sel) => q(scope + " " + sel),
      opEl: (el, o, t = {}) => op(el, o, t, snap),
      mvEl: (el, st, t = {}) => tf(el, st || {}, t, snap),
      flEl: (el, col, t = {}) => fill(el, col, t, snap)
    };
  }
  function caption(k, snap) {
    const lab = root.querySelector(".w04-txt"), no = root.querySelector(".w04-no"), bar = root.querySelector(".w04-pr i");
    const txt = labels[k] || "";
    if (lab && lab.textContent !== txt) {
      lab.textContent = txt;
      if (!snap && !reduced()) { lab.classList.remove("w04-in"); void lab.offsetWidth; lab.classList.add("w04-in"); }
    }
    if (no) no.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
    if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
  }
  function render(k, snap) {
    if (!root) return;
    if (snap) root.classList.add("w04-snap");
    V.forEach((v, i) => {
      const g = root.querySelector('[data-v="' + i + '"]');
      if (!g) return;
      const on = inR(k, v.r[0], v.r[1]);
      op(g, on ? 1 : 0, { d: on ? 0.55 : 0.3, dl: on ? 0.12 : 0 }, snap);
      tf(g, on ? {} : { x: k < v.r[0] ? 28 : -28, s: 0.985 }, { d: 0.6 }, snap);
      g.setAttribute("aria-hidden", on ? "false" : "true");
      const wasOn = lastK >= 0 && inR(lastK, v.r[0], v.r[1]);
      if (!on && v.pre && !wasOn) {
        try { v.pre(ctx('[data-v="' + i + '"]', true)); } catch (e) { warn(id + " pre " + i + ": " + (e && e.message)); }
      }
      if (on) {
        try { v.play(ctx('[data-v="' + i + '"]', snap), k - v.r[0], k); }
        catch (e) { warn(id + " visual " + i + ": " + (e && e.message)); }
      }
    });
    caption(k, snap);
    lastK = k;
    if (snap) { void root.offsetWidth; root.classList.remove("w04-snap"); }
    root.setAttribute("data-moment", String(k));
  }
  function kill() {
    counters.forEach((tw0) => { try { tw0.kill(); } catch (_) {} });
    counters = [];
    if (root && window.gsap && typeof window.gsap.killTweensOf === "function") {
      try { window.gsap.killTweensOf(root.querySelectorAll("[data-k],[data-v]")); } catch (_) {}
    }
  }
  function mount(el) {
    const r = document.createElement("div");
    const rm = reduced();
    r.className = "vls-w04-" + id + " w04-root" + (useG ? " w04-gsap" : " w04-css") + (rm ? " w04-rm" : " w04-intro");
    r.setAttribute("data-scene", id);
    const art = R(-400, -300, 1200, 900, cfg.bg) + (cfg.deco ? cfg.deco() : "") +
      V.map((v, i) => `<g data-v="${i}" style="opacity:0">${v.art()}</g>`).join("");
    r.innerHTML = '<div class="w04-stage"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
      esc(cfg.desc) + '">' + art + '</svg></div><div class="w04-cap" aria-hidden="true"><span class="w04-no"></span><span class="w04-txt"></span><span class="w04-pr"><i></i></span></div>';
    if (typeof el.replaceChildren === "function") el.replaceChildren(r);
    else { el.innerHTML = ""; el.appendChild(r); }
    return r;
  }
  return {
    build(el) {
      if (!el || el.nodeType !== 1) return;
      kill();
      lastK = -1;
      useG = gsapOK();
      root = mount(el);
      render(0, true);
    },
    step(i, n) {
      if (!root) return;
      if (reduced()) { root.classList.add("w04-rm"); }
      render(mapK(i, n), !useG && reduced());
    },
    reset() {
      if (!root) return;
      kill();
      lastK = -1;
      render(0, true);
    }
  };
}
// merge(a, b): joins two adjacent visuals into one two-phase visual (cross-fade inside one stage).
const merge = (a, b) => {
  const na = a.r[1] - a.r[0] + 1;
  return {
    r: [a.r[0], b.r[1]],
    art: () => `<g data-k="mA">${a.art()}</g><g data-k="mB" style="opacity:0">${b.art()}</g>`,
    pre: (c) => { if (a.pre) a.pre(c); if (b.pre) b.pre(c); },
    play: (c, j, k) => {
      c.op("mA", j < na ? 1 : 0, { d: 0.4 }); c.op("mB", j < na ? 0 : 1, { d: 0.5, dl: j < na ? 0 : 0.15 });
      if (j < na) a.play(c, j, k); else b.play(c, j - na, k);
    }
  };
};
const BG = [];

// ============================================================
// O3b · Four engagement strategies · 28 moments · 10 visuals
// One real week in the director's calendar: Sunday co-design, Monday legal note,
// Tuesday Corniche consultation, Thursday auditor update and the kept promise.
// ============================================================
{
  const id = "O3b", N = 28;
  const labels = [
    "One week, new calendar", "Sunday: redraw exceptions", "Co-design, not approval", "Unseen cases improve it",
    "Sponsor sees trade-offs", "Frequent contact, cheaper fixes", "Monday: note to legal", "Any data worries?",
    "Brief, answers their question", "Week ten could freeze", "Satisfied, never hidden", "Tuesday: Corniche desk",
    "Show, ask, write down", "Changed or not, why", "Night desk? Thursday answer", "A no beats silence",
    "Not a newsletter", "Thursday: auditor paragraph", "Promise kept in writing", "Minimal effort, deliberately",
    "Look back over week", "Not one message", "Purpose, depth, channel", "Four different needs",
    "Effort follows the grid", "Diary redraws grid", "Drawn at one moment", "People keep moving"
  ];
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  const strip = (on) => DAYS.map((d, i) => R(28 + i * 70, 14, 64, 32, i === on ? C.navy : C.white, 8, `stroke="${C.navy}" stroke-width="1.8"`) + T(60 + i * 70, 35, d, 14, i === on ? C.white : C.navy)).join("");
  const vis = [];

  // V1 (0-1) · adapted from https://motionarray.com/after-effects-templates/timeline/ — milestones revealed with a travelling marker
  vis.push({ r: [0, 1], art: () => {
    let s = "";
    DAYS.forEach((d, i) => { s += K("dc" + i, R(28 + i * 70, 40, 64, 200, C.white, 10, `stroke="${C.mist}" stroke-width="2"`) + R(28 + i * 70, 40, 64, 30, C.navy, 10) + R(28 + i * 70, 58, 64, 12, C.navy) + T(60 + i * 70, 62, d, 14, C.white)); });
    s += H("blk", R(34, 84, 52, 60, C.coral, 6) + R(104, 84, 52, 28, C.plum, 6) + R(174, 84, 52, 90, C.teal, 6) + R(314, 84, 52, 18, C.slate, 6) + pill(200, 270, "Follows the grid", { st: C.navy, sz: 13 }));
    s += H("sun", R(14, 70, 372, 220, C.white, 16, `stroke="${C.coral}" stroke-width="2.4"`) + T(200, 98, "Sunday morning", 16, C.coral) + R(60, 210, 280, 16, C.wood, 5) +
      man(100, 200, 1.2, C.navy) + man(200, 196, 1.2, C.teal) + man(300, 200, 1.2, C.teal) + T(100, 250, "Process owner", 13, C.navy) + T(250, 250, "Two Marina agents", 13, C.teal) +
      R(130, 112, 140, 56, "#e9f2fb", 6, `stroke="${C.blue}" stroke-width="2"`) + D("ep", "M146 150 H190 L210 128 H254", C.blue, 3));
    return s;
  }, play: (c, j) => {
    DAYS.forEach((d, i) => { c.op("dc" + i, j === 0 ? 1 : 0.15, { dl: j === 0 ? i * 0.12 : 0 }); c.mv("dc" + i, j === 0 ? {} : { y: -20 }, { dl: i * 0.12 }); });
    c.vis({ blk: j === 0, sun: j === 1 }, { dl: j === 0 ? 0.7 : 0 });
    c.dr("ep", j === 1 ? 1 : 0, { dl: 0.6 });
  } });

  // V2 (2-3) · adapted from https://www.behance.net/gallery/190390491/Creative-process-Motion-design-creative-project — an idea moved through iterations
  vis.push({ r: [2, 3], art: () => {
    let s = strip(0) + R(30, 70, 340, 120, "#e9f2fb", 12, `stroke="${C.blue}" stroke-width="2"`) + T(200, 94, "Exceptions path", 15, C.blue);
    ["Arrive", "Kiosk", "Agent", "Settled"].forEach((t, i) => { s += K("pb" + i, R(46 + i * 82, 112, 70, 36, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + T(81 + i * 82, 135, t, 13, C.navy)); });
    s += H("ap", pill(290, 222, "Approve finished plan", { st: C.slate, sz: 13, dash: 1 }) + cross(290, 222, 1.8, C.coral, 4) + pill(100, 222, "Change it together", { bg: C.green, st: C.green, fg: C.white, sz: 13 }));
    s += H("cs", rep(3, (i) => K("cc" + i, R(44 + i * 50, 214, 40, 50, C.gold, 6) + T(64 + i * 50, 245, "Case", 12.5, C.ink))) + D("nb", "M242 148 V176 H330 V148", C.green, 3.5) +
      T(330, 214, "Improved early", 13, C.green) + man(300, 270, 1, C.navy) + T(350, 280, "Defend?", 13, C.slate));
    return s;
  }, play: (c, j) => {
    c.mv("pb1", j >= 0 ? { x: 0 } : {}); c.mv("pb2", j === 0 ? { y: -6 } : {}, { dl: 0.3 });
    c.vis({ ap: j === 0, cs: j === 1 });
    for (let i = 0; i < 3; i++) c.mv("cc" + i, j === 1 ? { x: 150 - i * 20, y: -40, s: 0.6 } : {}, { d: 1, dl: 0.3 + i * 0.25, e: "power2.inOut" });
    c.dr("nb", j === 1 ? 1 : 0, { dl: 1.2 });
  } });

  // V3 (4-5) · adapted from https://lottiefiles.com/free-animation/infographics-dashboard-X6P5rVLZAB — a pie arc growing beside a metric
  vis.push({ r: [4, 5], art: () => {
    let s = strip(0);
    s += H("coo", O(90, 150, 60, "#e1e8ef") + F("M90 150 L90 90 A60 60 0 0 1 150 150 Z", C.coral) + O(90, 150, 6, C.navy) + T(90, 236, "Last half hour", 14, C.coral) +
      man(250, 200, 1.4, C.coral) + T(250, 236, "COO joins", 14, C.coral) + P("M190 110 H330", C.navy, 4) + P("M260 110 V150", C.navy, 4) + R(186, 110, 40, 22, C.blue, 4) + R(294, 110, 40, 30, C.gold, 4) +
      T(206, 98, "Speed", 13, C.blue) + T(314, 98, "Cost", 13, C.amber) + pill(260, 272, "Sees the trade-offs", { st: C.navy, sz: 13 }));
    s += H("tl", P("M30 170 H370", C.navy, 3) + T(40, 196, "Found early", 14, C.green, "start") + T(360, 196, "Found late", 14, C.coral, "end") +
      coin(80, 150, 14) + rep(9, (i) => coin(330, 154 - i * 10, 14)) + pill(200, 250, "Frequent contact", { bg: C.green, st: C.green, fg: C.white }) + T(200, 98, "Cost of a problem", 15, C.navy));
    return s;
  }, play: (c, j) => { c.vis({ coo: j === 0, tl: j === 1 }); } });

  // V4 (6-8) · adapted from https://lottiefiles.com/free-animation/supply-chain-and-logistics-8PtoYRCbiu — dispatch, transit and receipt
  vis.push({ r: [6, 8], art: () => {
    let s = strip(1) + man(60, 210, 1.4, C.navy) + T(60, 250, "Director", 13, C.navy) + shieldI(330, 170, 3, C.plum) + T(330, 236, "Legal", 15, C.plum);
    s += K("nt", R(84, 160, 70, 52, C.white, 6, `stroke="${C.plum}" stroke-width="2"`) + R(94, 172, 26, 16, C.gold, 3) + lockI(136, 186, 0.8, C.plum));
    s += H("cap", T(200, 84, "ID documents", 15, C.plum) + T(200, 104, "Guest data", 15, C.plum));
    s += H("q", bubble(250, 66, 120, 44, C.plum, C.white, 0.5) + T(310, 94, "Any worries?", 14, C.plum));
    s += H("bd", R(150, 200, 70, 70, C.slate, 4) + rep(6, (i) => P(`M154 ${206 + i * 10} H216`, "#8a9bb0", 2)) + cross(185, 235, 1.6, C.coral, 4) + T(185, 286, "Workflow", 13, C.slate) +
      okDot(368, 140, 13) + pill(200, 60, "Short, answers early", { bg: C.green, st: C.green, fg: C.white, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.mv("nt", j >= 0 ? { x: 190, y: -10 } : {}, { d: 1.4, e: "power2.inOut" });
    c.vis({ cap: j === 0, q: j === 1, bd: j === 2 });
  } });

  // V5 (9-10) · adapted from https://observablehq.com/@d3/transition-end — move, wait, then change state
  vis.push({ r: [9, 10], art: () => {
    let s = H("fz", P("M30 150 H370", C.navy, 3) + rep(11, (i) => O(40 + i * 32, 150, 5, C.navy) + T(40 + i * 32, 178, String(i + 1), 13, C.slate)) + T(200, 206, "Weeks to go-live", 14, C.slate) +
      R(320, 100, 50, 30, C.green, 4) + T(345, 120, "Live", 13, C.white) + K("ice", R(296, 92, 90, 46, "rgba(160,210,240,.6)", 6, `stroke="#7fc0e6" stroke-width="2"`) + star(380, 96, 7, C.white)) +
      qDot(328, 60, 13) + T(270, 52, "Week ten question", 14, C.coral, "end") + pill(120, 260, "Asked early instead", { bg: C.green, st: C.green, fg: C.white, sz: 13 }));
    s += H("hd", R(40, 190, 320, 40, "#c9a06a", 8) + K("bump", F("M130 190 Q170 160 210 190 Z", "#c9a06a") + bang(170, 170, 10)) + T(200, 216, "Hidden problems", 14, C.white) +
      man(110, 120, 1.4, C.plum) + bubble(140, 40, 130, 40, C.plum, C.white, 0.2) + T(205, 66, "All fine!", 15, C.plum) + cross(290, 90, 2, C.coral, 5) +
      pill(200, 268, "Honest, not concealed", { st: C.navy, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ fz: j === 0, hd: j === 1 });
    c.op("ice", j === 0 ? 0.25 : 0, { dl: 1 });
  } });

  // V6 (11-13) · adapted from https://observablehq.com/@d3/stacked-to-grouped-bars — keyed items re-sorted into groups
  vis.push({ r: [11, 13], art: () => {
    let s = strip(2) + H("vs", O(340, 80, 22, C.gold) + desk(150, 220, 200) + man(110, 208, 1.2, C.teal) + man(170, 206, 1.2, C.teal) + man(230, 208, 1.2, C.teal) + man(320, 230, 1.4, C.navy) +
      T(150, 270, "Corniche desk", 14, C.slate) + T(312, 84, "Afternoon", 13, C.amber, "end"));
    s += H("nb", R(250, 70, 130, 130, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + rep(5, (i) => D("w" + i, `M262 ${96 + i * 20} H${360 - (i % 2) * 20}`, C.navy, 3)) +
      rep(3, (i) => bubble(30 + i * 70, 76 + (i % 2) * 20, 56, 34, C.teal, C.white, 0.4) + T(58 + i * 70, 98 + (i % 2) * 20, "...", 14, C.teal)) + T(316, 222, "Every answer", 13, C.navy));
    let so = T(110, 76, "Changed", 15, C.green) + T(290, 76, "Not possible", 15, C.coral) + R(30, 86, 160, 150, C.mint, 12) + R(210, 86, 160, 150, C.rose, 12);
    for (let i = 0; i < 4; i++) so += K("sg" + i, R(150, 270, 100, 30, C.white, 6, `stroke="${C.navy}" stroke-width="2"`) + T(200, 290, "Suggestion", 13, C.navy));
    so += H("rs", ptag(290, 254, "Reason given", C.coral) + ptag(110, 254, "Reason given", C.green));
    s += H("so", so);
    return s;
  }, play: (c, j) => {
    c.vis({ vs: j === 0, nb: j === 1, so: j === 2 });
    for (let i = 0; i < 5; i++) c.dr("w" + i, j === 1 ? 1 : 0, { d: 0.5, dl: 0.3 + i * 0.25 });
    const TG = [[-90, -170], [-90, -130], [90, -170], [-90, -90]];
    for (let i = 0; i < 4; i++) c.mv("sg" + i, j === 2 ? { x: TG[i][0], y: TG[i][1] } : {}, { d: 1, dl: 0.2 + i * 0.25, e: "power2.inOut" });
    c.op("rs", j === 2 ? 1 : 0, { dl: 1.4 });
  } });

  // V7 (14-16) · adapted from https://observablehq.com/@d3/easing-animations — the same transfer replayed with different timing
  vis.push({ r: [14, 16], art: () => {
    let s = H("nd", man(80, 200, 1.4, C.teal) + bubble(30, 70, 180, 50, C.teal, C.white, 0.3) + T(120, 101, "Night desk open?", 15, C.teal) + F("M226 64 a10 10 0 1 0 8 16 a8 8 0 1 1 -8 -16 Z", C.gold) +
      cal(250, 110, 110, 100, C.navy, "Thursday") + K("pin", O(305, 166, 12, C.coral) + P("M305 178 V196", C.coral, 3)) + pill(300, 240, "Answer in writing", { st: C.navy, sz: 13 }));
    s += H("ns", R(30, 60, 160, 170, C.mint, 14) + T(110, 92, "A reasoned no", 15, C.green) + man(110, 190, 1.4, C.teal) + okDot(150, 140, 12) +
      R(210, 60, 160, 170, "#e6e9ee", 14) + T(290, 92, "Silence", 15, C.slate) + man(290, 190, 1.4, C.slate) + bubble(250, 112, 80, 34, C.slate, C.white, 0.5) + noDot(332, 140, 12) +
      pill(200, 266, "Easier to accept", { st: C.green, sz: 13 }));
    s += H("nl", T(110, 52, "Newsletter", 15, C.slate) + paper(60, 70, 100, 120, C.slate, 5) + arw(110, 200, 110, 262, C.slate, 3) + T(110, 286, "One way", 13, C.slate) +
      T(290, 52, "Consult, explain", 15, C.green) + man(250, 160, 1.4, C.navy) + man(340, 160, 1.4, C.teal) + arw(270, 128, 320, 128, C.green, 3) + arw(320, 182, 270, 182, C.green, 3) + T(295, 230, "Both ways", 13, C.green));
    return s;
  }, play: (c, j) => {
    c.vis({ nd: j === 0, ns: j === 1, nl: j === 2 });
    c.mv("pin", j === 0 ? {} : { y: -40 }, { d: 0.8, e: "bounce.out" });
  } });

  // V8 (17-19) · adapted from https://lottiefiles.com/free-animation/logistics-trucks-DHvuLcYVdQ — a delivery marker moving to its destination
  vis.push({ r: [17, 19], art: () => {
    let s = strip(4);
    s += H("au", man(330, 210, 1.4, C.slate) + T(330, 250, "External auditor", 13, C.slate) + man(60, 210, 1.4, C.navy) + K("ap", R(80, 150, 56, 38, C.white, 4, `stroke="${C.slate}" stroke-width="2"`) + P("M88 164 H128 M88 174 H120", C.mist, 3)) +
      pill(200, 90, "One paragraph", { st: C.slate }));
    s += H("cn", desk(310, 230, 120) + man(290, 218, 1.1, C.teal) + man(332, 218, 1.1, C.teal) + T(310, 280, "Corniche team", 13, C.teal) + K("lt", env(60, 180, 54, 36, C.green)) +
      T(87, 150, "Night-desk answer", 13, C.green) + H("kp", okDot(360, 160, 14) + pill(200, 90, "Promise kept", { bg: C.green, st: C.green, fg: C.white })));
    s += H("hg", F("M60 70 H140 L104 160 L140 250 H60 L96 160 Z", "#e7edf3", `stroke="${C.navy}" stroke-width="3"`) + F("M70 80 H130 L100 150 Z", C.gold) +
      arw(150, 200, 196, 250, C.slate, 2) + T(210, 268, "Auditor: a grain", 13, C.slate, "start") + arw(150, 130, 230, 100, C.gold, 4) + T(240, 90, "Corners that decide", 13, C.amber, "start") + T(240, 110, "adoption", 13, C.amber, "start"));
    return s;
  }, play: (c, j) => {
    c.vis({ au: j === 0, cn: j === 1, hg: j === 2 });
    c.mv("ap", j === 0 ? { x: 190 } : {}, { d: 1.3, e: "power2.inOut" });
    c.mv("lt", j === 1 ? { x: 210, y: 0 } : {}, { d: 1.4, e: "power2.inOut" }); c.op("kp", j === 1 ? 1 : 0, { dl: 1.4 });
  } });

  // V9 (20-23) · adapted from https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design — interface states swapping in place
  vis.push({ r: [20, 23], art: () => {
    let s = H("rp", strip(-1) + rep(5, (i) => K("ck" + i, okDot(60 + i * 70, 76, 11))) + T(200, 160, "Week in review", 20, C.navy));
    s += H("id", rep(4, (i) => paper(40 + i * 86, 60, 70, 90, C.slate, 4)) + T(200, 190, "Same message for all", 15, C.slate) + cross(200, 110, 4, C.coral, 6) + pill(200, 240, "Not engagement", { st: C.coral }));
    const DL = [["Purpose", 70], ["Depth", 200], ["Channel", 330]];
    let dl = "";
    DL.forEach((d, i) => { dl += O(d[1], 140, 46, C.white, `stroke="${C.navy}" stroke-width="3"`) + K("nd" + i, P(`M${d[1]} 140 V${104}`, C.coral, 4)) + O(d[1], 140, 6, C.coral) + T(d[1], 214, d[0], 15, C.navy); });
    s += H("dl", dl + pill(200, 262, "Different for each group", { st: C.navy, sz: 13 }));
    s += H("nd4", grid4(40, 40, 320, 220, C.slate) + T(120, 110, "Reassurance", 15, C.plum) + T(120, 130, "Legal", 13, C.slate) + T(280, 110, "Decisions", 15, C.coral) + T(280, 130, "Sponsor", 13, C.slate) +
      T(120, 210, "Awareness", 15, C.slate) + T(120, 230, "Auditor", 13, C.slate) + T(280, 210, "Influence", 15, C.teal) + T(280, 230, "Staff", 13, C.slate));
    return s;
  }, play: (c, j) => {
    c.vis({ rp: j === 0, id: j === 1, dl: j === 2, nd4: j === 3 });
    for (let i = 0; i < 5; i++) c.op("ck" + i, j === 0 ? 1 : 0, { dl: i * 0.2 });
    [0, 1, 2].forEach((i) => c.mv("nd" + i, { r: j === 2 ? [-50, 30, 70][i] : 0, pv: [[70, 200, 330][i], 140] }, { d: 1.2, dl: i * 0.2, e: "back.out(1.6)" }));
  } });

  // V10 (24-27) · adapted from https://dribbble.com/shots/27247003-Data-Workflow-Animation — nodes re-laid into a new structure
  vis.push({ r: [24, 27], art: () => {
    const BL = [[C.coral, 28, 70, 64, 80], [C.plum, 98, 70, 64, 30], [C.teal, 168, 70, 64, 100], [C.slate, 308, 70, 64, 18]];
    const GP = [[302, 88], [147, 88], [302, 204], [147, 204]];
    let s = strip(-1) + H("gr", grid4(70, 54, 310, 214, C.slate) + P("M70 268 V48 M70 268 H386", C.navy, 2.4));
    BL.forEach((b, i) => { s += `<g data-k="bl${i}">${R(b[1], b[2], b[3], b[4], b[0], 6)}</g>`; });
    s += H("cam", R(150, 100, 100, 70, C.navy, 12) + O(200, 135, 24, C.white) + O(200, 135, 14, C.blue) + R(160, 92, 30, 12, C.navy, 3) + T(200, 200, "Snapshot", 16, C.navy) + T(200, 222, "of one moment", 14, C.slate));
    s += H("dr", rep(4, (i) => K("tk" + i, O(GP[i][0], GP[i][1], 12, BL[i][0]))) + pill(225, 284, "The programme moves", { st: C.navy, sz: 13 }));
    return s;
  }, play: (c, j) => {
    const GP = [[302, 88], [147, 88], [302, 204], [147, 204]], BL0 = [[60, 110], [130, 85], [200, 120], [340, 79]];
    c.vis({ gr: j >= 1 && j !== 2, cam: j === 2, dr: j === 3 });
    for (let i = 0; i < 4; i++) {
      c.op("bl" + i, j <= 1 ? 1 : 0);
      c.mv("bl" + i, j === 1 ? { x: GP[i][0] - BL0[i][0], y: GP[i][1] - BL0[i][1], s: 0.5 } : {}, { d: 1.3, dl: i * 0.15, e: "power3.inOut" });
    }
    const DR = [[0, 0], [-40, 20], [20, -60], [60, 0]];
    for (let i = 0; i < 4; i++) c.mv("tk" + i, j === 3 ? { x: DR[i][0], y: DR[i][1] } : {}, { d: 1.6, dl: i * 0.2, e: "power2.inOut" });
  } });

  VS[id] = makeScene({ id, N, labels, vis, bg: "#f4f2f6",
    desc: "One week in the director's calendar: Sunday co-design with the process owner and Marina agents, a short Monday note to legal, a Tuesday consultation at the Corniche desk, a Thursday paragraph for the auditor and a kept promise, so her diary mirrors the grid." });
  BG.push([id, "#f4f2f6"]);
}

// ============================================================
// O3c · Stakeholders move: revisit the grid · 29 moments · 9 visuals
// Finance travels from keep satisfied to manage closely when invoicing enters
// scope; the Corniche shift gains informal power; the grid is re-run at every
// phase boundary and the engagement plan changes with it.
// ============================================================
{
  const id = "O3c", N = 29;
  const labels = [
    "Four months later", "Finance: keep satisfied", "High power, low interest", "Invoicing enters scope",
    "Interest rises sharply", "Now: manage closely", "Briefing becomes co-design", "If nobody redraws",
    "Settled without finance", "Built, tested, scheduled", "A late, powerful objection", "Unnoticed moves, late objections",
    "An old picture", "Position is a snapshot", "Ideas become real", "When to redraw?",
    "Every phase boundary", "One stage ends", "Scope widens, people shift", "Drift toward monitor",
    "Front desk moves too", "Their shift is named", "Now said in writing", "Informal power grows",
    "Closer to co-design", "Plan changes with grid", "Before switch-on", "Nodding, old habits",
    "Next: measuring adoption"
  ];
  const grid = () => R(70, 30, 310, 232, C.white, 10, `stroke="${C.mist}" stroke-width="2"`) + P("M225 34 V258 M74 146 H376", C.slate, 1.8, 'stroke-dasharray="5 5"') +
    P("M70 262 V24 M70 262 H386", C.navy, 3) + T(44, 146, "Power", 14, C.navy, "middle", 'transform="rotate(-90 44 146)"') + T(225, 288, "Interest", 14, C.navy) +
    T(147, 54, "Keep satisfied", 13, C.plum) + T(302, 54, "Manage closely", 13, C.coral) + T(147, 250, "Monitor", 13, C.slate) + T(302, 250, "Keep informed", 13, C.teal);
  const fin = (x, y) => pill(x, y, "Finance", { bg: C.amber, st: C.amber, fg: C.white });
  const vis = [];

  // V1 (0-2) · adapted from https://motionarray.com/after-effects-templates/scrolling-timeline-1223172/ — a scale that scrolls and settles on an event
  vis.push({ r: [0, 2], art: () => {
    let s = H("tm", P("M30 70 H370", C.navy, 3) + rep(5, (i) => O(40 + i * 80, 70, 6, C.navy) + T(40 + i * 80, 50, "M" + i, 14, C.navy)) + K("mk", O(40, 70, 12, C.coral)) +
      K("sc", O(200, 190, 40, "rgba(18,133,140,.12)", `stroke="${C.teal}" stroke-width="3" stroke-dasharray="6 5"`)) + R(170, 176, 60, 28, C.teal, 6) + T(200, 195, "Desk", 13, C.white) +
      H("more", R(80, 160, 70, 28, C.slate, 6) + T(115, 179, "Rooms", 13, C.white) + R(250, 210, 70, 28, C.slate, 6) + T(285, 229, "Billing", 13, C.white)) + pill(200, 282, "Programme has grown", { st: C.teal, sz: 13 }));
    s += H("gk", grid() + K("f1", fin(147, 100)) + H("bars", R(110, 168, 74, 10, "#e1e8ef", 5) + R(110, 168, 66, 10, C.plum, 5) + T(147, 162, "Power", 13, C.plum) +
      R(110, 200, 74, 10, "#e1e8ef", 5) + R(110, 200, 14, 10, C.teal, 5) + T(147, 194, "Interest", 13, C.teal) + T(147, 228, "In check-in", 13, C.slate)));
    return s;
  }, play: (c, j) => {
    c.vis({ tm: j === 0, gk: j >= 1, bars: j === 2 });
    c.mv("mk", j === 0 ? { x: 320 } : {}, { d: 1.6, e: "power2.inOut" });
    c.mv("sc", { s: j === 0 ? 2 : 1, pv: [200, 190] }, { d: 1.6, dl: 0.5 }); c.op("more", j === 0 ? 1 : 0, { dl: 1.2 });
  } });

  // V2 (3-6) · adapted from https://observablehq.com/@d3/animated-quadtree — a point re-inserted into a new region
  vis.push({ r: [3, 6], art: () => {
    let s = H("sm", O(200, 150, 120, "rgba(18,133,140,.08)") + K("bnd", O(200, 150, 80, "none", `stroke="${C.teal}" stroke-width="3" stroke-dasharray="7 5"`)) +
      R(160, 120, 80, 30, C.teal, 6) + T(200, 140, "Check-in", 13, C.white) + R(160, 160, 80, 30, C.teal, 6) + T(200, 180, "Rooms", 13, C.white) +
      K("inv", R(300, 60, 86, 34, C.amber, 6) + T(343, 82, "Invoicing", 14, C.white)) + fin(343, 30) + T(200, 284, "Programme scope", 14, C.teal));
    s += H("gr", grid() + pill(302, 92, "COO", { bg: C.coral, st: C.coral, fg: C.white, sz: 13 }) + pill(302, 120, "Process owner", { bg: C.coral, st: C.coral, fg: C.white, sz: 13 }) +
      D("trail", "M147 168 C200 168 240 150 296 160", C.amber, 3, 'stroke-dasharray="4 5"') + K("f2", fin(147, 168)));
    s += H("eng", R(100, 196, 70, 44, C.white, 6, `stroke="${C.slate}" stroke-width="2"`) + P("M100 196 L135 220 L170 196", C.slate, 2) + T(135, 282, "Briefing", 13, C.slate) +
      arw(182, 218, 222, 218, C.navy, 2.4) + R(238, 216, 100, 12, C.wood, 4) + man(258, 210, 0.8, C.amber) + man(318, 210, 0.8, C.coral) + T(288, 282, "Co-design", 13, C.green));
    return s;
  }, play: (c, j) => {
    c.vis({ sm: j === 0, eng: j === 3 }); c.op("gr", j === 3 ? 0.18 : j >= 1 ? 1 : 0);
    c.mv("inv", j === 0 ? { x: -143, y: 138 } : {}, { d: 1.4, e: "power2.inOut" }); c.mv("bnd", { s: j === 0 ? 1.25 : 1, pv: [200, 150] }, { d: 1.2, dl: 0.4 });
    c.dr("trail", j >= 1 ? 1 : 0, { d: 1.2 });
    c.mv("f2", j >= 2 ? { x: 150, y: -10 } : j === 1 ? { x: 70, y: 0 } : {}, { d: 1.3, e: "power3.inOut" });
  } });

  // V3 (7-9) · adapted from https://lottiefiles.com/free-animation/3d-isometric-factory-process-TJAlBgYcXw — robotic stages sequenced
  vis.push({ r: [7, 9], art: () => {
    let s = pill(200, 24, "What if nobody redraws?", { st: C.slate, sz: 13, dash: 1 });
    s += H("mo", rep(4, (i) => K("ev" + i, env(40 + i * 86, 84, 60, 40, C.slate))) + rep(4, (i) => T(70 + i * 86, 146, "Month " + (i + 1), 13, C.slate)) + fin(200, 220) + T(200, 256, "Same polite summary", 14, C.slate));
    s += H("lk", R(40, 70, 170, 120, "#e9f2fb", 10, `stroke="${C.blue}" stroke-width="2"`) + T(125, 100, "Invoicing design", 14, C.blue) + P("M60 140 H190 M60 160 H160", C.blue, 3) + lockI(125, 208, 2, C.navy) +
      R(250, 90, 110, 140, C.white, 6, `stroke="${C.slate}" stroke-width="2"`) + T(305, 120, "Steering pack", 13, C.slate) + rep(4, (i) => P(`M264 ${144 + i * 18} H346`, C.mist, 3)) + man(305, 280, 1.1, C.amber));
    s += H("bt", [["Built", 70], ["Tested", 200], ["Scheduled", 330]].map((b) => T(b[1], 160, b[0], 15, C.navy)).join("") +
      K("g1", cog(70, 110, 30, C.slate)) + K("g2", cog(200, 110, 30, C.slate)) + K("g3", cog(330, 110, 30, C.slate)) +
      T(56, 216, "Cost of a change", 14, C.coral, "start") + R(56, 230, 290, 20, "#e1e8ef", 10) + K("cm", R(56, 230, 290, 20, C.coral, 10)));
    return s;
  }, play: (c, j) => {
    c.vis({ mo: j === 0, lk: j === 1, bt: j === 2 });
    for (let i = 0; i < 4; i++) c.mv("ev" + i, j === 0 ? {} : { y: -20 }, { dl: i * 0.2 });
    ["g1", "g2", "g3"].forEach((g, i) => c.mv(g, { r: j === 2 ? 180 : 0 }, { d: 1.5, dl: i * 0.3 }));
    c.mv("cm", { sx: j === 2 ? 1 : 0.05, pv: [56, 240] }, { d: 1.4, dl: 0.8, e: "power3.in" });
  } });

  // V4 (10-12) · adapted from https://observablehq.com/@d3/path-tween — comparing a stored path with the current one
  vis.push({ r: [10, 12], art: () => {
    let s = H("lo", P("M30 230 H370", C.navy, 4) + R(350, 200, 16, 30, C.green, 3) + T(358, 256, "Go-live", 14, C.green) + fin(90, 60) + K("bar", R(300, 90, 16, 140, C.coral, 3) + R(260, 90, 96, 16, C.coral, 3)) +
      pill(150, 150, "Late objection", { bg: C.coral, st: C.coral, fg: C.white }) + T(90, 96, "High power", 13, C.plum));
    s += H("cp", R(24, 50, 160, 140, "#c9a06a", 6) + R(32, 58, 144, 108, C.white, 2) + grid4(44, 66, 120, 92) + O(74, 90, 7, C.amber) + T(104, 182, "Old picture", 14, C.ink) +
      R(216, 50, 160, 140, C.white, 6, `stroke="${C.teal}" stroke-width="2"`) + grid4(236, 66, 120, 92) + O(326, 90, 7, C.amber) + T(296, 182, "Today", 14, C.teal) +
      D("mm", "M74 90 C150 30 260 40 326 90", C.coral, 3) + pill(200, 240, "Movement unnoticed", { st: C.coral, sz: 13 }));
    s += H("op", R(110, 40, 180, 180, C.white, 6, `stroke="${C.mist}" stroke-width="2"`) + R(124, 54, 152, 120, "#dfe6ed", 2) + grid4(140, 66, 120, 96) + T(200, 200, "Kickoff grid", 14, C.slate) +
      rep(3, (i) => man(110 + i * 90, 280, 1.1, C.teal)) + pill(200, 238, "Nobody behaved badly", { st: C.green, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ lo: j === 0, cp: j === 1, op: j === 2 });
    c.mv("bar", { r: j === 0 ? 0 : -80, pv: [308, 230] }, { d: 0.9, e: "bounce.out" });
    c.dr("mm", j === 1 ? 1 : 0, { d: 1.2 });
  } });

  // V5 (13-15) · adapted from https://observablehq.com/@d3/shape-tweening — one shape morphing into another
  vis.push({ r: [13, 15], art: () => {
    let s = H("sn", R(130, 70, 140, 100, C.navy, 16) + O(200, 120, 34, C.white) + O(200, 120, 22, C.blue) + R(146, 60, 40, 14, C.navy, 4) + K("fl", O(200, 120, 70, "rgba(255,255,255,.85)")) +
      T(200, 206, "A snapshot", 18, C.navy) + T(200, 230, "not fixed", 15, C.slate));
    s += H("ir", K("cl", cloudI(110, 130, 2.4, "#b9c6d3")) + T(110, 200, "Idea", 15, C.slate) + arw(170, 140, 230, 140, C.navy, 3) + K("bk", R(250, 90, 100, 90, C.teal, 8) + P("M250 120 H350 M250 150 H350 M283 90 V180 M316 90 V180", "rgba(255,255,255,.4)", 2)) +
      T(300, 200, "Something real", 15, C.teal) + pill(200, 258, "Power and interest move", { st: C.navy, sz: 13 }));
    s += H("wn", cal(130, 60, 140, 130, C.navy, "Redraw when?") + qDot(200, 130, 26, C.plum));
    return s;
  }, play: (c, j) => {
    c.vis({ sn: j === 0, ir: j === 1, wn: j === 2 });
    c.op("fl", j === 0 ? 0 : 1, { d: 0.4 });
    c.mv("cl", j === 1 ? { s: 0.8 } : {}, { d: 1 }); c.mv("bk", j === 1 ? {} : { s: 0.4 }, { d: 1, dl: 0.4, e: "back.out(1.5)" });
  } });

  // V6 (16-18) · adapted from https://motionarray.com/after-effects-templates/project-timeline-2424919/ — advancing along time markers
  vis.push({ r: [16, 18], art: () => {
    let s = P("M20 80 H380", C.navy, 4);
    for (let i = 0; i < 4; i++) s += R(24 + i * 90, 64, 82, 32, ["#dbe7f2", "#cfe6e0", "#efe1c9", "#e6dcef"][i], 8) + T(65 + i * 90, 86, "Phase " + (i + 1), 13, C.navy);
    for (let i = 1; i < 4; i++) s += K("bd" + i, P(`M${20 + i * 90} 54 V108`, C.coral, 3) + O(20 + i * 90, 124, 11, C.coral) + P(`M${14 + i * 90} 124 a6 6 0 1 1 6 6`, C.white, 2));
    s += H("zm", R(110, 150, 180, 100, C.white, 12, `stroke="${C.coral}" stroke-width="2"`) + T(160, 180, "Ends", 14, C.navy) + T(240, 180, "Begins", 14, C.navy) + P("M200 160 V240", C.coral, 3) +
      arw(130, 210, 190, 210, C.slate, 2) + arw(210, 210, 270, 210, C.slate, 2) + T(200, 274, "Re-run the grid here", 14, C.coral));
    s += H("sw", K("sc", O(200, 210, 46, "rgba(18,133,140,.12)", `stroke="${C.teal}" stroke-width="3" stroke-dasharray="6 5"`)) + R(176, 198, 48, 24, C.teal, 5) +
      rep(3, (i) => H("np" + i, R([90, 270, 200][i] - 30, [176, 176, 254][i] - 12, 60, 24, C.slate, 5) + man([90, 270, 200][i] + 46, [186, 186, 264][i], 0.7, C.amber))) + T(66, 150, "New processes", 13, C.slate, "start"));
    return s;
  }, play: (c, j) => {
    for (let i = 1; i < 4; i++) c.op("bd" + i, 1, { dl: j === 0 ? i * 0.3 : 0 });
    c.vis({ zm: j === 1, sw: j === 2 });
    c.mv("sc", { s: j === 2 ? 1.9 : 1, pv: [200, 210] }, { d: 1.4 });
    for (let i = 0; i < 3; i++) c.op("np" + i, j === 2 ? 1 : 0, { dl: 0.8 + i * 0.2 });
  } });

  // V7 (19-20) · adapted from https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy — tracing a route between hubs
  vis.push({ r: [19, 20], art: () => {
    let s = grid() + D("dt", "M302 92 C270 140 200 180 160 204", C.slate, 3) + K("dk", pill(302, 92, "Process left scope", { bg: C.slate, st: C.slate, fg: C.white, sz: 13 }));
    s += H("fd", R(232, 152, 144, 104, "rgba(18,133,140,.12)", 8, `stroke="${C.teal}" stroke-width="3"`) + rep(4, (i) => face(254 + i * 32, 196, 10, C.teal)) + T(302, 226, "Front desk", 13, C.teal));
    return s;
  }, play: (c, j) => {
    c.dr("dt", j === 0 ? 1 : 0, { d: 1.2 });
    c.mv("dk", j === 0 ? { x: -150, y: 112 } : {}, { d: 1.6, e: "power2.inOut" }); c.op("dk", j === 0 ? 1 : 0.3);
    c.op("fd", j === 1 ? 1 : 0);
  } });

  // V8 (21-24) · adapted from https://lottiefiles.com/free-animation/workflow-Jt52qpU9fj — stages of a cycle advancing
  vis.push({ r: [21, 24], art: () => {
    let s = H("dc", R(120, 30, 160, 210, C.white, 8, `stroke="${C.navy}" stroke-width="2.4"`) + T(200, 58, "Redeployment", 14, C.navy) + T(200, 76, "position", 14, C.navy) +
      rep(5, (i) => P(`M138 ${104 + i * 24} H262`, C.mist, 4)) + K("hl", R(132, 142, 136, 24, "rgba(239,194,90,.6)", 4)) + T(200, 159, "Corniche shift", 13, C.ink) + man(330, 220, 1.4, C.teal) + qDot(352, 176, 11));
    s += H("sw", bubble(20, 60, 120, 44, C.teal, C.white, 0.6) + T(80, 88, "Say so", 15, C.teal) + arw(150, 90, 196, 120, C.slate, 2.4) + R(200, 100, 150, 100, C.white, 8, `stroke="${C.green}" stroke-width="2.4"`) +
      T(275, 140, "In writing", 16, C.green) + okDot(275, 172, 13) + T(80, 140, "Earlier", 13, C.slate));
    s += H("ip", grid() + K("cs", pill(302, 212, "Corniche shift", { bg: C.teal, st: C.teal, fg: C.white, sz: 13 })) + rep(5, (i) => H("ey" + i, E(110 + i * 50, 14, 9, 5, C.white, `stroke="${C.navy}" stroke-width="1.6"`) + O(110 + i * 50, 14, 2.5, C.navy))) +
      H("ct", rep(2, (i) => K("od" + i, pill(258 + i * 82, 230, ["Marina", "Old Town"][i], { st: C.teal, sz: 13 })))));
    return s;
  }, play: (c, j) => {
    c.vis({ dc: j === 0, sw: j === 1, ip: j >= 2, ct: j === 3 });
    c.mv("hl", { sx: j === 0 ? 1 : 0.02, pv: [132, 154] }, { d: 1, dl: 0.4 });
    c.mv("cs", j === 2 ? { y: -64 } : j === 3 ? { y: -100 } : {}, { d: 1.3, e: "power2.inOut" });
    for (let i = 0; i < 5; i++) c.op("ey" + i, j === 2 ? 1 : 0, { dl: i * 0.1 });
    [0, 1].forEach((i) => c.mv("od" + i, j === 3 ? { y: -80, x: i === 0 ? -10 : 10 } : {}, { d: 1.3, dl: 0.6 + i * 0.2 }));
  } });

  // V9 (25-28) · adapted from https://lottiefiles.com/free-animation/dashboard-krY5yHjJRp — a dashboard screen brought into focus
  vis.push({ r: [25, 28], art: () => {
    let s = H("pl", R(20, 50, 160, 160, C.white, 10, `stroke="${C.mist}" stroke-width="2"`) + grid4(34, 64, 132, 132) + K("gt", O(70, 100, 8, C.amber)) + T(100, 234, "Grid redrawn", 14, C.navy) +
      arw(190, 130, 220, 130, C.navy, 3) + R(226, 50, 160, 160, C.white, 10, `stroke="${C.green}" stroke-width="2"`) + T(306, 76, "Engagement plan", 13, C.green) +
      rep(4, (i) => P(`M240 ${100 + i * 26} H372`, C.mist, 8)) + K("rw", R(240, 122, 132, 16, C.gold, 4)) + T(306, 135, "Finance: co-design", 12.5, C.ink));
    s += H("bf", P("M30 160 H370", C.navy, 4) + T(30, 190, "Today", 14, C.navy, "start") + R(300, 140, 14, 40, C.green, 3) + T(306, 206, "Switch-on", 14, C.green) + kiosk(300, 132, 1.1, "#9aa8b6") + pill(150, 100, "Everything so far", { st: C.navy, sz: 13 }));
    s += H("nd", E(130, 210, 110, 24, C.wood) + rep(4, (i) => K("hd" + i, man(60 + i * 46, 186, 1, C.teal))) + T(130, 260, "Nodding in meetings", 13, C.teal) +
      P("M260 90 H380", C.green, 5) + P("M260 190 H380", C.slate, 5, 'stroke-dasharray="8 6"') + T(320, 76, "New process", 13, C.green) + T(320, 216, "Old way", 13, C.slate) +
      rep(4, (i) => K("gg" + i, face(268 + i * 26, 178, 8, C.blue))));
    s += H("ad", P("M90 220 A110 110 0 0 1 310 220", "#dfe6ed", 24) + K("an", P("M200 220 V128", C.ink, 5) + O(200, 220, 10, C.ink)) + T(200, 262, "Adoption?", 18, C.navy) + pill(200, 50, "A measurable reality", { st: C.green }));
    return s;
  }, play: (c, j) => {
    c.vis({ pl: j === 0, bf: j === 1, nd: j === 2, ad: j === 3 });
    c.mv("gt", j === 0 ? { x: 60, y: -6 } : {}, { d: 1 }); c.mv("rw", { sx: j === 0 ? 1 : 0.02, pv: [240, 130] }, { d: 1, dl: 0.8 });
    for (let i = 0; i < 4; i++) { c.mv("hd" + i, j === 2 ? { y: 4 } : {}, { d: 0.4, dl: i * 0.15 }); c.mv("gg" + i, j === 2 ? { x: 30 } : {}, { d: 1.6, dl: i * 0.2 }); }
    c.mv("an", { r: j === 3 ? -20 : -80, pv: [200, 220] }, { d: 1.6, e: "elastic.out(1,0.4)" });
  } });

  VS[id] = makeScene({ id, N, labels, vis, bg: "#f1f4f4",
    desc: "Stakeholder positions are snapshots: when invoicing enters scope, finance moves from keep satisfied to manage closely; unnoticed moves bring late objections; the grid is re-run at every phase boundary and engagement changes with it." });
  BG.push([id, "#f1f4f4"]);
}

// ============================================================
// O3d · Adoption, workarounds and parallel processes · 27 moments · 9 visuals
// The 16-week chart labels only the figures in the narration: adoption plateaus
// at about 65%; workarounds peak near 42% and settle near 9% (curve shape is
// illustrative between those labelled points).
// ============================================================
{
  const id = "O3d", N = 27;
  const labels = [
    "Kiosks switched on", "Staff seem positive", "Feeling isn't measure", "Share of real cases",
    "Tracked weekly, day one", "Sixteen weeks of data", "Plateau near 65%", "Workarounds: 42% to 9%",
    "What a workaround is", "Typed in by hand", "Not disobedience", "A defect reporting itself",
    "Evidence, not discipline", "Agents suggest fixes", "The improvement backlog", "Nearly there?",
    "A third still old", "Two processes indefinitely", "Double training, double errors", "60% after three months",
    "Looks finished, isn't", "Every milestone green", "Report adoption monthly", "Eyes on the plateau",
    "Weeks 13 and 14", "Track adoption seriously", "Where, not what"
  ];
  const AD = [5, 22, 38, 50, 58, 62, 64, 65, 65, 65, 65, 65, 65, 65, 65, 65];
  const WK = [20, 42, 38, 30, 22, 16, 12, 10, 9, 9, 9, 9, 9, 9, 9, 9];
  const X = (i) => 56 + i * 20.6, Y = (v) => 250 - v * 2.1;
  const line = (a) => a.map((v, i) => (i ? "L" : "M") + r1(X(i)) + " " + r1(Y(v))).join(" ");
  const vis = [];

  // V1 (0-2) · adapted from https://lottiefiles.com/free-animation/deliver-better-optimized-lottie-json-animation-Qgvgddnv8J — UI introduced, then the outcome emphasised
  vis.push({ r: [0, 2], art: () => {
    let s = H("on", rep(3, (i) => kiosk(110 + i * 90, 250, 1.6, C.navy) + K("sc" + i, R(110 + i * 90 - 16, 250 - 75, 32, 24, C.gold, 3))) + pill(200, 50, "Go-live", { bg: C.green, st: C.green, fg: C.white, sz: 16 }));
    s += H("st", E(200, 200, 150, 30, C.wood) + rep(5, (i) => K("hd" + i, man(90 + i * 55, 172, 1.1, C.slate))) + cloudI(200, 80, 2.2, "#b9c6d3") + T(200, 92, "Seem positive", 15, C.navy));
    s += H("fm", cloudI(110, 120, 2.4, "#b9c6d3") + T(110, 132, "Feeling", 15, C.navy) + cross(110, 126, 3.2, C.coral, 5) + T(110, 200, "Cannot count guests", 13, C.slate) +
      R(220, 100, 160, 40, C.gold, 6) + rep(9, (i) => P(`M${236 + i * 16} 100 v${i % 2 ? 12 : 20}`, C.ink, 2)) + T(300, 170, "Measure", 17, C.green) + okDot(300, 210, 14));
    return s;
  }, play: (c, j) => {
    c.vis({ on: j === 0, st: j === 1, fm: j === 2 });
    for (let i = 0; i < 3; i++) c.fl("sc" + i, C.gold);
    for (let i = 0; i < 3; i++) c.op("sc" + i, j === 0 ? 1 : 0.2, { dl: 0.3 + i * 0.25 });
    for (let i = 0; i < 5; i++) c.mv("hd" + i, j === 1 ? { y: 4 } : {}, { d: 0.4, dl: i * 0.12 });
  } });

  // V2 (3-4) · adapted from https://lottiefiles.com/free-animation/data-factory-animation-I6dMAfEyrl — inputs fed in, a counter output
  vis.push({ r: [3, 4], art: () => {
    let s = H("fr", T(70, 40, "Real cases", 15, C.navy) + kiosk(320, 112, 1.1, C.navy) + T(320, 136, "New process", 13, C.green) + desk(320, 196, 70) + T(320, 240, "Old process", 13, C.slate) +
      R(110, 254, 180, 40, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + T(200, 274, "Adoption =", 14, C.navy, "end") + T(206, 274, "new ÷ all", 14, C.green, "start"));
    for (let i = 0; i < 8; i++) s += H("g" + i, face(30 + (i % 4) * 24, 70 + Math.floor(i / 4) * 26, 9, C.blue));
    s += H("cl", cal(30, 40, 340, 190, C.navy, "Weekly tracking") + rep(16, (i) => R(46 + (i % 8) * 40, 74 + Math.floor(i / 8) * 70, 30, 50, "#eef2f6", 4) + T(61 + (i % 8) * 40, 94 + Math.floor(i / 8) * 70, "W" + (i + 1), 12.5, C.slate)) +
      rep(16, (i) => H("d" + i, O(61 + (i % 8) * 40, 112 + Math.floor(i / 8) * 70, 6, C.teal))) + pill(120, 262, "From day one", { st: C.green }));
    return s;
  }, play: (c, j) => {
    c.vis({ fr: j === 0, cl: j === 1 });
    for (let i = 0; i < 8; i++) {
      const toNew = i < 5, bx = 30 + (i % 4) * 24, by = 70 + Math.floor(i / 4) * 26;
      c.op("g" + i, j === 0 ? 1 : 0);
      const n = toNew ? i : i - 5;
      c.mv("g" + i, j === 0 ? { x: 236 + (n % 3) * 18 - bx, y: (toNew ? 92 : 182) + Math.floor(n / 3) * 20 - by } : {}, { d: 1.3, dl: 0.3 + i * 0.12, e: "power2.inOut" });
    }
    for (let i = 0; i < 16; i++) c.op("d" + i, j === 1 ? 1 : 0, { dl: j === 1 ? 0.3 + i * 0.08 : 0 });
  } });

  // V3 (5-7) · adapted from https://observablehq.com/@d3/learn-d3-animation — two series traced across the same axes
  vis.push({ r: [5, 7], art: () => {
    let s = P("M56 40 V250 H370", C.navy, 2.4) + T(212, 280, "Weeks after go-live (1-16)", 13, C.slate) + T(50, 46, "100%", 12.5, C.slate, "end") + T(50, 254, "0%", 12.5, C.slate, "end");
    s += rep(16, (i) => P(`M${r1(X(i))} 250 v5`, C.slate, 1.5));
    s += H("opp", pill(250, 26, "Two lines, opposite ways", { st: C.navy, sz: 13 }));
    s += D("ad", line(AD), C.green, 4.5) + H("adl", P(`M56 ${r1(Y(65))} H370`, C.green, 1.4, 'stroke-dasharray="4 4"') + pill(300, Y(65) - 22, "Plateau about 65%", { bg: C.green, st: C.green, fg: C.white, sz: 13 }) + T(150, Y(65) - 8, "Adoption", 14, C.green));
    s += D("wk", line(WK), C.coral, 4.5) + H("wkl", O(X(1), Y(42), 7, C.coral) + pill(X(1) + 66, Y(42) - 4, "Peak near 42%", { st: C.coral, sz: 13 }) +
      O(X(15), Y(9), 7, C.coral) + pill(300, Y(9) - 22, "Settles near 9%", { st: C.coral, sz: 13 }) + T(160, Y(20) + 22, "Workarounds", 14, C.coral));
    return s;
  }, play: (c, j) => {
    c.op("opp", j === 0 ? 1 : 0);
    c.dr("ad", j >= 1 ? 1 : 0, { d: 1.8 }); c.op("adl", j >= 1 ? 1 : 0, { dl: j === 1 ? 1.4 : 0 });
    c.dr("wk", j >= 2 ? 1 : 0, { d: 1.8 }); c.op("wkl", j === 2 ? 1 : 0, { dl: 1.2 });
    c.op("ad", j === 2 ? 0.45 : 1);
  } });

  // V4 (8-10) · adapted from https://lottiefiles.com/free-animation/cro-process-RaUu5ps2to — moving across business steps
  vis.push({ r: [8, 10], art: () => {
    let s = H("df", P("M30 120 H160", C.navy, 8) + P("M240 120 H370", C.navy, 8) + T(200, 76, "Official process", 15, C.navy) + T(200, 100, "Does not fit", 13, C.coral) +
      D("dt", "M150 130 C170 220 230 220 250 130", C.amber, 5, 'stroke-dasharray="8 6"') + T(200, 236, "Workaround", 16, C.amber) + K("tk", face(40, 120, 10, C.blue)) + T(200, 270, "Unofficial way", 13, C.slate));
    s += H("mr", kiosk(80, 240, 1.8, C.navy) + noDot(80, 140, 14) + R(150, 180, 96, 60, C.slate, 6) + R(158, 188, 80, 36, "#a9b8c7", 3) + T(198, 212, "Old system", 12.5, C.ink) +
      man(290, 226, 1.4, C.teal) + R(250, 236, 80, 18, "#cdd8e3", 4) + rep(5, (i) => H("ky" + i, R(254 + i * 15, 240, 11, 10, C.amber, 2))) + T(290, 280, "Typed by hand", 14, C.teal) +
      pill(110, 50, "Corporate guest rejected", { st: C.coral, sz: 13 }));
    s += H("ds", K("stp", R(80, 90, 240, 60, "rgba(207,75,58,.12)", 10, `stroke="${C.coral}" stroke-width="3"`) + T(200, 128, "Disobedience?", 22, C.coral)) +
      K("lens", O(200, 210, 34, "rgba(255,255,255,.5)", `stroke="${C.ink}" stroke-width="5"`) + P("M224 234 L250 260", C.ink, 8)) + T(310, 214, "Look closer", 15, C.navy));
    return s;
  }, play: (c, j) => {
    c.vis({ df: j === 0, mr: j === 1, ds: j === 2 });
    c.dr("dt", j === 0 ? 1 : 0, { d: 1.2 }); c.mv("tk", j === 0 ? { x: 160, y: 70 } : {}, { d: 1.6, dl: 0.6 });
    for (let i = 0; i < 5; i++) c.op("ky" + i, j === 1 ? 1 : 0.2, { dl: 0.4 + i * 0.15 });
    c.mv("stp", j === 2 ? { r: -6, s: 0.85 } : {}, { d: 0.8, dl: 0.6 }); c.op("stp", j === 2 ? 0.4 : 1, { dl: 0.9 });
    c.mv("lens", j === 2 ? {} : { x: -60 }, { d: 1 });
  } });

  // V5 (11-14) · adapted from https://dribbble.com/shots/3791748-Workflow-Animation — action, trigger, notification
  vis.push({ r: [11, 14], art: () => {
    let s = H("rp", P("M30 110 H160", C.navy, 8) + P("M240 110 H370", C.navy, 8) + P("M150 120 C170 210 230 210 250 120", C.amber, 5, 'stroke-dasharray="8 6"') +
      K("fl", O(200, 110, 26, "rgba(239,194,90,.5)") + star(200, 110, 16, C.coral)) + arw(200, 196, 200, 140, C.coral, 3) + pill(200, 250, "Defect reporting itself", { bg: C.coral, st: C.coral, fg: C.white }));
    s += H("lg", R(40, 40, 180, 220, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + T(130, 66, "Workaround log", 15, C.navy) +
      rep(5, (i) => H("le" + i, O(60, 92 + i * 34, 6, C.amber) + P(`M74 ${92 + i * 34} H${190 - (i % 2) * 30}`, C.mist, 5))) +
      R(260, 120, 70, 22, C.wood, 4) + R(286, 142, 14, 50, C.wood, 3) + cross(300, 150, 3, C.coral, 5) + T(300, 222, "Not discipline", 14, C.coral) + T(130, 282, "Evidence", 15, C.green));
    s += H("sg", R(250, 60, 130, 190, C.white, 10, `stroke="${C.green}" stroke-width="2"`) + T(315, 86, "Backlog", 15, C.green) + rep(3, (i) => man(60 + i * 60, 240, 1.2, C.teal)) + rep(3, (i) => K("bb" + i, bubble(36 + i * 60, 120, 52, 34, C.teal, C.white, 0.4) + T(62 + i * 60, 143, "Fix", 13, C.teal))));
    s += H("bl", R(70, 40, 260, 220, C.white, 10, `stroke="${C.green}" stroke-width="2.4"`) + T(200, 70, "Improvement backlog", 16, C.green) +
      rep(5, (i) => R(92, 92 + i * 32, 18, 18, C.white, 3, `stroke="${C.navy}" stroke-width="2"`) + P(`M122 ${101 + i * 32} H${300 - (i % 3) * 30}`, C.mist, 6) + (i < 2 ? tick(101, 101 + i * 32, 0.7, C.green, 3) : "")) +
      T(200, 286, "Running list of fixes", 14, C.navy));
    return s;
  }, play: (c, j) => {
    c.vis({ rp: j === 0, lg: j === 1, sg: j === 2, bl: j === 3 });
    c.mv("fl", j === 0 ? { s: 1.2 } : {}, { d: 0.6, e: "back.out(3)" });
    for (let i = 0; i < 5; i++) c.op("le" + i, j === 1 ? 1 : 0, { dl: i * 0.2 });
    for (let i = 0; i < 3; i++) c.mv("bb" + i, j === 2 ? { x: 250 - i * 60 + 4, y: -40 + i * 50, s: 0.9 } : {}, { d: 1.2, dl: 0.4 + i * 0.25, e: "power2.inOut" });
  } });

  // V6 (15-17) · adapted from https://lottiefiles.com/free-animation/bottling-factory-53Q3SoGu0x — items advancing on parallel lines
  vis.push({ r: [15, 17], art: () => {
    let s = H("nb", T(200, 80, "Adoption", 16, C.navy) + R(40, 100, 320, 44, "#e1e8ef", 12) + K("b65", R(40, 100, 208, 44, C.green, 12)) + T(144, 129, "65%", 20, C.white) +
      pill(300, 196, "Nearly there?", { st: C.plum, sz: 16 }) + qDot(370, 196, 12));
    let g = "";
    for (let i = 0; i < 100; i++) g += `<circle data-k="gd" data-i="${i}" cx="${40 + (i % 10) * 18}" cy="${60 + Math.floor(i / 10) * 20}" r="7" fill="${C.green}"/>`;
    s += H("gr", g + T(130, 280, "100 check-ins", 13, C.slate) + T(300, 150, "A third: old process", 15, C.slate));
    s += H("tr", P("M20 110 H380", C.green, 6) + P("M20 200 H380", C.slate, 6) + rep(2, (i) => K("tn" + i, R(40, [96, 186][i], 70, 28, [C.green, C.slate][i], 6) + O(56, [124, 214][i], 5, C.ink) + O(94, [124, 214][i], 5, C.ink))) +
      T(200, 90, "New process", 14, C.green) + T(200, 180, "Old process", 14, C.slate) + P("M180 252 C160 232 140 232 140 252 C140 272 160 272 200 252 C240 232 260 232 260 252 C260 272 240 272 220 252", C.coral, 4) + T(200, 290, "Indefinitely", 14, C.coral));
    return s;
  }, play: (c, j) => {
    c.vis({ nb: j === 0, gr: j === 1, tr: j === 2 });
    c.mv("b65", { sx: j === 0 ? 1 : 0.02, pv: [40, 122] }, { d: 1.2 });
    c.all('[data-k="gd"]').forEach((el) => { const i = +el.getAttribute("data-i"); c.flEl(el, j === 1 && i >= 65 ? "#9aa8b6" : C.green, { dl: i >= 65 ? (i - 65) * 0.03 : 0 }); });
    c.mv("tn0", j === 2 ? { x: 260 } : {}, { d: 2.4, e: "none" }); c.mv("tn1", j === 2 ? { x: 260 } : {}, { d: 2.4, e: "none" });
  } });

  // V7 (18-19) · adapted from https://observablehq.com/@d3/arc-tween — a gauge arc tweening to its value
  vis.push({ r: [18, 19], art: () => {
    let s = H("dbl", book(30, 50, 50, 70, C.green) + book(90, 50, 50, 70, C.slate) + T(85, 140, "Two trainings", 14, C.navy) + bang(230, 80, 16) + bang(270, 80, 16, C.amber) + T(250, 140, "Two kinds of error", 14, C.navy) +
      R(140, 170, 120, 100, C.white, 12, `stroke="${C.navy}" stroke-width="2.4"`) + K("jar", R(144, 230, 112, 36, C.gold, 8)) + T(200, 196, "Benefits", 15, C.amber) + T(330, 240, "Never full", 14, C.coral));
    s += H("g60", P("M90 220 A110 110 0 0 1 310 220", "#dfe6ed", 24) + K("ndl", P("M200 220 V124", C.ink, 5) + O(200, 220, 10, C.ink)) + T(200, 96, "60%", 30, C.coral) + T(200, 262, "After three months", 15, C.navy) +
      pill(200, 46, "Same verdict", { st: C.coral }));
    return s;
  }, play: (c, j) => {
    c.vis({ dbl: j === 0, g60: j === 1 });
    c.mv("jar", { sy: j === 0 ? 1 : 0.1, pv: [200, 266] }, { d: 1.2, dl: 0.4 });
    c.mv("ndl", { r: j === 1 ? 18 : -90, pv: [200, 220] }, { d: 1.6, e: "power2.out" });
  } });

  // V8 (20-23) · adapted from https://motionarray.com/after-effects-templates/infographics-pack-100132/ — per-element metric reveals
  vis.push({ r: [20, 23], art: () => {
    let s = R(70, 30, 260, 230, C.white, 12, `stroke="${C.navy}" stroke-width="2.4"`) + T(200, 58, "Programme report", 16, C.navy);
    const RW = ["Kiosks installed", "Training complete", "Milestones on time"];
    RW.forEach((t, i) => { s += K("r" + i, T(90, 96 + i * 36, t, 14, C.ink, "start") + okDot(304, 91 + i * 36, 11)); });
    s += H("ar", R(80, 196, 240, 40, C.rose, 8) + T(90, 222, "Adoption 65%", 15, C.coral, "start") + bang(304, 216, 11, C.amber));
    s += H("fin", pill(200, 282, "Looks finished", { bg: C.green, st: C.green, fg: C.white }) + K("q", cross(286, 282, 1.4, C.coral, 4)));
    s += H("mo", cal(10, 196, 58, 54, C.navy, "Monthly"));
    s += H("eye", E(360, 140, 26, 16, C.white, `stroke="${C.navy}" stroke-width="2.4"`) + O(360, 140, 8, C.navy) + arw(334, 150, 322, 196, C.navy, 2.4) + T(366, 100, "Sponsor", 13, C.navy) +
      P("M10 80 L40 80 M14 70 L36 90 M14 90 L36 70", "#c9c9c9", 3) + T(30, 114, "Ribbon", 12.5, "#9aa8b6"));
    return s;
  }, play: (c, j) => {
    [0, 1, 2].forEach((i) => c.op("r" + i, 1, { dl: j <= 1 ? i * 0.25 : 0 }));
    c.vis({ fin: j === 0, ar: j >= 2, mo: j >= 2, eye: j === 3 });
    c.op("q", j === 0 ? 1 : 0, { dl: 1.2 });
    c.mv("ar", j >= 2 ? {} : { x: 40 }, { d: 0.9 });
  } });

  // V9 (24-26) · adapted from https://motionarray.com/after-effects-templates/corporate-timeline-1939632/ — events revealed one by one
  vis.push({ r: [24, 26], art: () => {
    let s = H("cr", P("M20 150 H380", C.navy, 3) + rep(14, (i) => O(30 + i * 26.5, 150, i === 3 || i >= 12 ? 9 : 5, i === 3 ? C.coral : i >= 12 ? C.green : C.navy)) +
      T(110, 120, "Week 4", 14, C.coral) + T(350, 120, "Weeks 13-14", 14, C.green, "end") + pill(290, 262, "Governance keeps it", { st: C.green, sz: 13 }) + D("ar", "M110 170 C180 240 300 240 344 170", C.green, 3));
    s += H("eq", P("M200 250 V110", C.navy, 5) + P("M80 110 H320", C.navy, 5) + R(40, 150, 90, 50, C.blue, 8) + T(85, 180, "Delivery", 14, C.white) + T(85, 222, "Before go-live", 13, C.slate) +
      R(270, 150, 90, 50, C.green, 8) + T(315, 180, "Adoption", 14, C.white) + T(315, 222, "After go-live", 13, C.slate) + pill(200, 60, "Equally serious", { st: C.navy }));
    s += H("cp", F("M120 90 c-26 -34 -26 -60 0 -60 c26 0 26 26 0 60 Z", C.coral) + O(120, 54, 9, C.white) + T(120, 140, "Where she stands", 15, C.coral) +
      R(220, 40, 150, 120, C.white, 12, `stroke="${C.plum}" stroke-width="2" stroke-dasharray="6 5"`) + qDot(295, 90, 22) + T(295, 140, "What to change", 15, C.plum) +
      pill(200, 230, "Measuring is only half", { st: C.navy, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ cr: j === 0, eq: j === 1, cp: j === 2 });
    c.dr("ar", j === 0 ? 1 : 0, { d: 1.4 });
  } });

  VS[id] = makeScene({ id, N, labels, vis, bg: "#f2f5f3",
    desc: "After go-live at Qasr, adoption is measured weekly: it rises then plateaus at about 65 percent while workarounds peak near 42 percent and settle near 9 percent; each workaround is a defect reporting itself, and a plateau means two processes running at once." });
  BG.push([id, "#f2f5f3"]);
}

addStyles(BG);
})();
// END FILE w04-claude-v2-part3.js

// OPER621 · Week 4 · BPM and Organisational Change — animated teaching scenes (v2)
// File: w04-claude-v2-part4.js  ·  Scenes: O3e, O3f, O3g
// Standalone part: registers its own scenes and appends its own scoped rules into the
// single shared <style id="vl-sc-w04">. Parts may be loaded in any order or concatenated.
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
// Design rule for v2: every narration moment k maps to exactly one visual (8-11 visuals per
// section, a new one every 2-4 sentences); each visual names the benchmark template whose
// motion grammar it adapts (URL in a comment). Artwork and code are original.
(() => {
"use strict";
window.VL_SCENES = window.VL_SCENES || {};
const VS = window.VL_SCENES;
const PART = "part4";

// ---------- palette ----------
const C = {
  navy: "#173f6b", ink: "#14263b", blue: "#2c6ea6", sky: "#e4eef7", teal: "#12858c",
  green: "#2f7d55", mint: "#e2f2e8", amber: "#a86f0a", gold: "#efc25a", coral: "#cf4b3a",
  rose: "#fbe3dd", plum: "#664a8f", lilac: "#ece6f5", slate: "#5b6f85", mist: "#cfd9e4",
  paper: "#fffdf8", white: "#ffffff", sand: "#f3ead9", red: "#b3302f", wood: "#9a7349", night: "#10263d"
};

// ---------- small utilities ----------
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const num = (v, f) => { const x = Number(v); return Number.isFinite(x) ? x : f; };
const reduced = () => {
  try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
  catch (_) { return false; }
};
const gsapOK = () => !!(window.gsap && typeof window.gsap.to === "function" && typeof window.gsap.set === "function") && !reduced();
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");
const inR = (k, a, b) => k >= a && k <= b;
const r1 = (v) => Math.round(v * 10) / 10;
const lerp = (a, b, t) => a + (b - a) * t;
const warn = (m) => { try { if (window.console) window.console.warn("[VL W04 " + PART + "] " + m); } catch (_) {} };

// ---------- SVG string builders ----------
const R = (x, y, w, h, f, rx = 0, ex = "") => `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${r1(rx)}" fill="${f}" ${ex}/>`;
const O = (cx, cy, r, f, ex = "") => `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}" fill="${f}" ${ex}/>`;
const E = (cx, cy, rx, ry, f, ex = "") => `<ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="${f}" ${ex}/>`;
const P = (d, s, w = 2, ex = "") => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const F = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
const D = (k, d, s, w = 3, ex = "") => `<path data-k="${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100" ${ex}/>`;
const T = (x, y, s, sz = 15, f = C.ink, a = "middle", ex = "") => `<text x="${r1(x)}" y="${r1(y)}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const NT = (k, x, y, s, sz = 15, f = C.ink, a = "middle", ex = "") => `<text data-k="${k}" x="${r1(x)}" y="${r1(y)}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const K = (k, b, ex = "") => `<g data-k="${k}" ${ex}>${b}</g>`;
const H = (k, b, ex = "") => `<g data-k="${k}" style="opacity:0" ${ex}>${b}</g>`;
const tw = (s, sz) => Math.round(String(s).length * sz * 0.58 + sz * 1.3);
const pill = (x, y, s, o = {}) => {
  const sz = o.sz || 14, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.85);
  return R(x - w / 2, y - h / 2, w, h, o.bg || C.white, o.rx == null ? h / 2 : o.rx,
    `stroke="${o.st || C.navy}" stroke-width="${o.sw || 1.8}"${o.dash ? ' stroke-dasharray="5 4"' : ""}`) +
    T(x, y + sz * 0.36, s, sz, o.fg || o.st || C.navy);
};
const arw = (x1, y1, x2, y2, col = C.navy, w = 2.4, ex = "") => {
  const a = Math.atan2(y2 - y1, x2 - x1), L = 8 + w * 1.6, Wd = 4 + w * 1.1;
  const bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
  return P(`M${r1(x1)} ${r1(y1)} L${r1(bx)} ${r1(by)}`, col, w, ex) +
    F(`M${r1(x2)} ${r1(y2)} L${r1(bx + Wd * Math.sin(a))} ${r1(by - Wd * Math.cos(a))} L${r1(bx - Wd * Math.sin(a))} ${r1(by + Wd * Math.cos(a))} Z`, col);
};

// ---------- icon library (all coordinates absolute; no transform attributes on keyed nodes) ----------
const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${r1(x - 7 * s)} ${r1(y)} l${r1(5 * s)} ${r1(5 * s)} l${r1(10 * s)} ${r1(-11 * s)}`, col, w);
const cross = (x, y, s = 1, col = C.coral, w = 3) => P(`M${r1(x - 6 * s)} ${r1(y - 6 * s)} l${r1(12 * s)} ${r1(12 * s)} M${r1(x + 6 * s)} ${r1(y - 6 * s)} l${r1(-12 * s)} ${r1(12 * s)}`, col, w);
const okDot = (x, y, r = 10, col = C.green) => O(x, y, r, col) + tick(x, y, r / 15, C.white, Math.max(2, r / 5));
const noDot = (x, y, r = 10, col = C.coral) => O(x, y, r, col) + cross(x, y, r / 15, C.white, Math.max(2, r / 5));
const bang = (x, y, r = 10, col = C.coral) => O(x, y, r, col) + T(x, y + r * 0.45, "!", Math.max(13, Math.round(r * 1.3)), C.white);
const qDot = (x, y, r = 10, col = C.plum) => O(x, y, r, col) + T(x, y + r * 0.45, "?", Math.max(13, Math.round(r * 1.3)), C.white);
const man = (x, y, s = 1, col = C.navy) => O(x, y - 17 * s, 8 * s, col) +
  F(`M${r1(x - 13 * s)} ${r1(y + 12 * s)} Q${r1(x - 13 * s)} ${r1(y - 5 * s)} ${r1(x)} ${r1(y - 5 * s)} Q${r1(x + 13 * s)} ${r1(y - 5 * s)} ${r1(x + 13 * s)} ${r1(y + 12 * s)} Z`, col);
const traveller = (x, y, s = 1, col = C.blue) => man(x, y, s, col) + R(x + 12 * s, y - 1 * s, 12 * s, 14 * s, C.amber, 2 * s) +
  P(`M${r1(x + 15 * s)} ${r1(y - 1 * s)} v${r1(-4 * s)} h${r1(6 * s)} v${r1(4 * s)}`, C.amber, 1.6 * s);
const face = (x, y, r = 9, col = C.blue) => O(x, y, r, col) + O(x - r * 0.34, y - r * 0.15, r * 0.15, C.white) + O(x + r * 0.34, y - r * 0.15, r * 0.15, C.white) +
  P(`M${r1(x - r * 0.36)} ${r1(y + r * 0.3)} Q${r1(x)} ${r1(y + r * 0.58)} ${r1(x + r * 0.36)} ${r1(y + r * 0.3)}`, C.white, Math.max(1.2, r * 0.13));
const kiosk = (x, y, s = 1, col = C.navy) => R(x - 14 * s, y - 52 * s, 28 * s, 52 * s, col, 5 * s) + R(x - 10 * s, y - 47 * s, 20 * s, 15 * s, "#bfe3f2", 2 * s) +
  R(x - 7 * s, y - 25 * s, 14 * s, 4 * s, "#9fb4c8", 1) + R(x - 18 * s, y, 36 * s, 5 * s, col, 2 * s);
const desk = (x, y, w = 90, col = C.wood) => R(x - w / 2 - 4, y - 6, w + 8, 8, "#6f5233", 3) + R(x - w / 2, y, w, 26, col, 3);
const clock = (x, y, r, col = C.coral, bg = C.white) => O(x, y, r, bg, `stroke="${col}" stroke-width="${r1(Math.max(2, r / 6))}"`) +
  P(`M${r1(x)} ${r1(y - r * 0.6)} V${r1(y)} L${r1(x + r * 0.42)} ${r1(y + r * 0.28)}`, col, r1(Math.max(2, r / 7)));
const paper = (x, y, w, h, col = C.navy, n = 3) => R(x, y, w, h, C.white, 4, `stroke="${col}" stroke-width="1.8"`) +
  rep(n, (i) => P(`M${r1(x + 7)} ${r1(y + 12 + i * (h - 18) / Math.max(1, n))} H${r1(x + w - 7 - (i === n - 1 ? w * 0.3 : 0))}`, C.mist, 2.2));
const env = (x, y, w, h, col = C.navy, bg = C.white) => R(x, y, w, h, bg, 3, `stroke="${col}" stroke-width="1.8"`) +
  P(`M${r1(x)} ${r1(y)} L${r1(x + w / 2)} ${r1(y + h * 0.55)} L${r1(x + w)} ${r1(y)}`, col, 1.8);
const coin = (x, y, r = 12, col = C.gold) => E(x, y, r, r * 0.42, col, `stroke="${C.amber}" stroke-width="1.5"`);
const star = (x, y, r, col = C.gold) => {
  let d = "";
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; d += (i ? "L" : "M") + r1(x + rr * Math.cos(a)) + " " + r1(y + rr * Math.sin(a)); }
  return F(d + "Z", col);
};
const bulb = (x, y, s = 1, col = C.gold) => O(x, y, 10 * s, col) + R(x - 5 * s, y + 8 * s, 10 * s, 7 * s, C.slate, 2) +
  P(`M${r1(x - 16 * s)} ${r1(y - 8 * s)} l${r1(-5 * s)} ${r1(-4 * s)} M${r1(x + 16 * s)} ${r1(y - 8 * s)} l${r1(5 * s)} ${r1(-4 * s)} M${r1(x)} ${r1(y - 16 * s)} v${r1(-6 * s)}`, col, 2.2);
const mega = (x, y, s = 1, col = C.plum) => R(x - 9 * s, y - 6 * s, 9 * s, 12 * s, col, 2) +
  F(`M${r1(x)} ${r1(y - 6 * s)} L${r1(x + 24 * s)} ${r1(y - 16 * s)} V${r1(y + 16 * s)} L${r1(x)} ${r1(y + 6 * s)} Z`, col) +
  P(`M${r1(x - 4 * s)} ${r1(y + 6 * s)} l${r1(3 * s)} ${r1(12 * s)}`, col, 3 * s);
const waves = (x, y, s = 1, col = C.plum) => rep(3, (i) => P(`M${r1(x + (8 + i * 9) * s)} ${r1(y - (8 + i * 6) * s)} Q${r1(x + (14 + i * 11) * s)} ${r1(y)} ${r1(x + (8 + i * 9) * s)} ${r1(y + (8 + i * 6) * s)}`, col, 2.4));
const cal = (x, y, w, h, col = C.navy, title = "") => R(x, y, w, h, C.white, 6, `stroke="${col}" stroke-width="1.8"`) + R(x, y, w, 18, col, 6) + R(x, y + 9, w, 9, col) +
  (title ? T(x + w / 2, y + 14, title, 13, C.white) : "");
const lockI = (x, y, s = 1, col = C.red) => R(x - 9 * s, y - 2 * s, 18 * s, 14 * s, col, 2) +
  P(`M${r1(x - 5 * s)} ${r1(y - 2 * s)} v${r1(-5 * s)} a${r1(5 * s)} ${r1(5 * s)} 0 0 1 ${r1(10 * s)} 0 v${r1(5 * s)}`, col, r1(2.2 * s));
const shieldI = (x, y, s = 1, col = C.green) => F(`M${r1(x)} ${r1(y - 14 * s)} L${r1(x + 12 * s)} ${r1(y - 9 * s)} V${r1(y + 1 * s)} Q${r1(x + 12 * s)} ${r1(y + 11 * s)} ${r1(x)} ${r1(y + 15 * s)} Q${r1(x - 12 * s)} ${r1(y + 11 * s)} ${r1(x - 12 * s)} ${r1(y + 1 * s)} V${r1(y - 9 * s)} Z`, col);
const heart = (x, y, s = 1, col = C.coral) => F(`M${r1(x)} ${r1(y + 9 * s)} C${r1(x - 15 * s)} ${r1(y - 1 * s)} ${r1(x - 9 * s)} ${r1(y - 13 * s)} ${r1(x)} ${r1(y - 5 * s)} C${r1(x + 9 * s)} ${r1(y - 13 * s)} ${r1(x + 15 * s)} ${r1(y - 1 * s)} ${r1(x)} ${r1(y + 9 * s)} Z`, col);
const cog = (x, y, r, col = C.slate, hole = C.white) => {
  let d = "";
  for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, rr = i % 2 ? r * 0.8 : r; d += (i ? "L" : "M") + r1(x + rr * Math.cos(a)) + " " + r1(y + rr * Math.sin(a)); }
  return F(d + "Z", col) + O(x, y, r * 0.35, hole);
};
const ptag = (x, y, s, col = C.amber) => {
  const sz = 13, w = tw(s, sz) + 12, h = 26;
  return F(`M${r1(x - w / 2)} ${r1(y)} L${r1(x - w / 2 + 12)} ${r1(y - h / 2)} H${r1(x + w / 2)} V${r1(y + h / 2)} H${r1(x - w / 2 + 12)} Z`, C.white, `stroke="${col}" stroke-width="2"`) +
    O(x - w / 2 + 11, y, 3, col) + T(x + 6, y + 4.7, s, sz, col);
};
const bubble = (x, y, w, h, col = C.navy, bg = C.white, tx = 0.2) => R(x, y, w, h, bg, 12, `stroke="${col}" stroke-width="1.8"`) +
  F(`M${r1(x + w * tx)} ${r1(y + h - 1)} l-6 13 l16 -13 Z`, bg, `stroke="${col}" stroke-width="1.8" stroke-linejoin="round"`) + R(x + w * tx - 7, y + h - 4, 20, 4, bg);
const cloudI = (x, y, s = 1, col = "#9aa9b8") => O(x - 14 * s, y, 11 * s, col) + O(x, y - 7 * s, 14 * s, col) + O(x + 15 * s, y, 11 * s, col) + R(x - 25 * s, y, 51 * s, 11 * s, col, 5 * s);
const book = (x, y, w, h, col = C.green, t = "") => R(x, y, w, h, col, 4) + R(x + 5, y + 4, w - 10, h - 8, "rgba(255,255,255,.18)", 3) + P(`M${r1(x + 9)} ${r1(y + 3)} V${r1(y + h - 3)}`, "rgba(0,0,0,.25)", 2) + (t ? T(x + w / 2 + 4, y + h / 2 + 5, t, 13, C.white) : "");
const grid4 = (x, y, w, h, col = C.slate) => R(x, y, w, h, "none", 6, `stroke="${col}" stroke-width="2"`) + P(`M${r1(x + w / 2)} ${r1(y)} V${r1(y + h)} M${r1(x)} ${r1(y + h / 2)} H${r1(x + w)}`, col, 1.8, 'stroke-dasharray="5 4"');

// ---------- stylesheet (scoped per scene, appended once per part into <style id="vl-sc-w04">) ----------
function sceneCSS(id, bg) {
  const s = ".vls-w04-" + id;
  return `
${s}{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:200px;overflow:hidden!important;box-sizing:border-box;border-radius:16px;background:${bg};color:${C.ink};font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w04-stage{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w04-stage>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}
${s} svg text{font-family:inherit;font-weight:700;letter-spacing:.15px}
${s} [data-k],${s} [data-v]{transform-box:fill-box;transform-origin:50% 50%}
${s}.w04-css [data-k],${s}.w04-css [data-v]{transition-property:transform,opacity,fill,stroke-dashoffset;transition-duration:.8s;transition-timing-function:cubic-bezier(.2,.8,.25,1)}
${s}.w04-snap [data-k],${s}.w04-snap [data-v],${s}.w04-rm [data-k],${s}.w04-rm [data-v]{transition:none!important}
${s}.w04-rm *,${s}.w04-snap *{animation:none!important}
${s} .w04-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:38px;padding:6px 12px 8px;font-size:15px;font-weight:800;line-height:1.2;color:${C.navy};background:rgba(255,255,255,.66);border-top:1px solid rgba(23,63,107,.14)}
${s} .w04-no{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w04-txt{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.2px}
${s} .w04-txt.w04-in{animation:vlsw04In .45s cubic-bezier(.2,.8,.25,1)}
${s} .w04-pr{flex:0 0 56px;height:5px;border-radius:5px;background:rgba(23,63,107,.15);overflow:hidden}
${s} .w04-pr i{display:block;height:100%;width:0;background:${C.coral};transition:width .6s ease}
${s}.w04-intro .w04-stage>svg{animation:vlsw04Intro .65s cubic-bezier(.2,.8,.25,1)}
${s} .a-dash{stroke-dasharray:6 7;animation:vlsw04Dash 1.2s linear infinite}
${s} .a-bob,${s} .a-pulse,${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%}
${s} .a-bob{animation:vlsw04Bob 2.4s ease-in-out infinite}
${s} .a-pulse{animation:vlsw04Pulse 1.8s ease-in-out infinite}
${s} .a-spin{animation:vlsw04Spin 6s linear infinite}
${s} .a-blink{animation:vlsw04Blink 1.3s ease-in-out infinite}
@media (max-width:420px){${s} .w04-cap{font-size:14px;min-height:34px;padding:5px 10px 7px}${s} .w04-pr{flex-basis:40px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
}
const KEYFRAMES = `
@keyframes vlsw04In{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes vlsw04Intro{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
@keyframes vlsw04Dash{to{stroke-dashoffset:-26}}
@keyframes vlsw04Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes vlsw04Pulse{0%,100%{opacity:.4;transform:scale(.94)}50%{opacity:1;transform:scale(1.06)}}
@keyframes vlsw04Spin{to{transform:rotate(360deg)}}
@keyframes vlsw04Blink{0%,100%{opacity:1}50%{opacity:.3}}
`;
function addStyles(list) {
  if (typeof document === "undefined" || !document.createElement) return;
  let st = document.getElementById("vl-sc-w04");
  if (!st) { st = document.createElement("style"); st.id = "vl-sc-w04"; (document.head || document.documentElement).appendChild(st); }
  const flag = "data-w04v2-" + PART;
  if (st.getAttribute(flag)) return;
  st.setAttribute(flag, "1");
  st.appendChild(document.createTextNode(KEYFRAMES + list.map((p) => sceneCSS(p[0], p[1])).join("\n")));
}

// ---------- scene factory ----------
// cfg = { id, N, labels[N], bg, desc, deco?(), vis: [{ r:[from,to], art(), play(c, j, k), pre?(c) }] }
// pre(c) runs instantly while a visual is hidden (never during its own fade-out) to stage its entry state.
function makeScene(cfg) {
  const id = cfg.id, N = cfg.N, labels = cfg.labels, V = cfg.vis;
  if (labels.length !== N) warn(id + ": " + labels.length + " labels for " + N + " moments");
  labels.forEach((l, i) => { const w = String(l).trim().split(/\s+/).length; if (w < 2 || w > 4) warn(id + " label " + i + " has " + w + " words"); });
  for (let k = 0; k < N; k++) { const hits = V.filter((v) => inR(k, v.r[0], v.r[1])).length; if (hits !== 1) warn(id + " moment " + k + " covered by " + hits + " visuals"); }
  let root = null, useG = false, counters = [], lastK = -1;
  const mapK = (i, n) => {
    const nn = Math.max(1, Math.floor(num(n, N)));
    const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
    return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
  };
  const q = (sel) => (root ? Array.prototype.slice.call(root.querySelectorAll(sel)) : []);
  function timing(el, t) { el.style.transitionDuration = (t.d == null ? 0.8 : t.d) + "s"; el.style.transitionDelay = (t.dl || 0) + "s"; }
  function tf(el, st, t, snap) {
    const x = st.x || 0, y = st.y || 0, r = st.r || 0;
    const sx = st.sx != null ? st.sx : (st.s != null ? st.s : 1);
    const sy = st.sy != null ? st.sy : (st.s != null ? st.s : 1);
    if (useG) {
      const v = { x, y, rotation: r, scaleX: sx, scaleY: sy };
      if (st.pv) v.svgOrigin = st.pv[0] + " " + st.pv[1]; else v.transformOrigin = "50% 50%";
      if (snap) window.gsap.set(el, v);
      else window.gsap.to(el, Object.assign(v, { duration: t.d == null ? 0.8 : t.d, delay: t.dl || 0, ease: t.e || "power3.out", overwrite: "auto" }));
    } else {
      if (st.pv) { el.style.transformBox = "view-box"; el.style.transformOrigin = st.pv[0] + "px " + st.pv[1] + "px"; }
      else { el.style.transformBox = ""; el.style.transformOrigin = ""; }
      timing(el, t);
      el.style.transform = "translate(" + x + "px," + y + "px) rotate(" + r + "deg) scale(" + sx + "," + sy + ")";
    }
  }
  function op(el, o, t, snap) {
    if (useG) { if (snap) window.gsap.set(el, { opacity: o }); else window.gsap.to(el, { opacity: o, duration: t.d == null ? 0.55 : t.d, delay: t.dl || 0, ease: "power1.out", overwrite: "auto" }); }
    else { timing(el, t); el.style.opacity = String(o); }
  }
  function dash(el, f, t, snap) {
    const v = 100 * (1 - clamp(f, 0, 1));
    if (useG) { if (snap) window.gsap.set(el, { strokeDashoffset: v }); else window.gsap.to(el, { strokeDashoffset: v, duration: t.d == null ? 1.1 : t.d, delay: t.dl || 0, ease: "power2.inOut", overwrite: "auto" }); }
    else { timing(el, t); el.style.strokeDashoffset = String(v); }
  }
  function fill(el, col, t, snap) {
    if (useG) { if (snap) window.gsap.set(el, { fill: col }); else window.gsap.to(el, { fill: col, duration: t.d == null ? 0.55 : t.d, delay: t.dl || 0, overwrite: "auto" }); }
    else { timing(el, t); el.style.fill = col; }
  }
  function count(el, to, fmt, t, snap) {
    const from = num(el.__w04v, to);
    el.__w04v = to;
    if (useG && !snap && from !== to) {
      const o = { v: from };
      counters.push(window.gsap.to(o, { v: to, duration: t.d == null ? 1.2 : t.d, delay: t.dl || 0, ease: "power2.out", onUpdate: () => { el.textContent = fmt(o.v); } }));
    } else el.textContent = fmt(to);
  }
  function ctx(scope, snap) {
    const nodes = (k) => q(scope + ' [data-k="' + k + '"]');
    const each = (k, f) => nodes(k).forEach(f);
    return {
      snap,
      op: (k, o, t = {}) => each(k, (el) => op(el, o, t, snap)),
      mv: (k, st, t = {}) => each(k, (el) => tf(el, st || {}, t, snap)),
      dr: (k, f, t = {}) => each(k, (el) => dash(el, f, t, snap)),
      fl: (k, col, t = {}) => each(k, (el) => fill(el, col, t, snap)),
      tx: (k, s) => each(k, (el) => { if (el.textContent !== String(s)) el.textContent = String(s); }),
      nm: (k, v, fmt, t = {}) => each(k, (el) => count(el, v, fmt || ((x) => String(Math.round(x))), t, snap)),
      vis: (m, t = {}) => Object.keys(m).forEach((k) => each(k, (el) => op(el, m[k] === true ? 1 : m[k] === false ? 0 : num(m[k], 0), t, snap))),
      all: (sel) => q(scope + " " + sel),
      opEl: (el, o, t = {}) => op(el, o, t, snap),
      mvEl: (el, st, t = {}) => tf(el, st || {}, t, snap),
      flEl: (el, col, t = {}) => fill(el, col, t, snap)
    };
  }
  function caption(k, snap) {
    const lab = root.querySelector(".w04-txt"), no = root.querySelector(".w04-no"), bar = root.querySelector(".w04-pr i");
    const txt = labels[k] || "";
    if (lab && lab.textContent !== txt) {
      lab.textContent = txt;
      if (!snap && !reduced()) { lab.classList.remove("w04-in"); void lab.offsetWidth; lab.classList.add("w04-in"); }
    }
    if (no) no.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
    if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
  }
  function render(k, snap) {
    if (!root) return;
    if (snap) root.classList.add("w04-snap");
    V.forEach((v, i) => {
      const g = root.querySelector('[data-v="' + i + '"]');
      if (!g) return;
      const on = inR(k, v.r[0], v.r[1]);
      op(g, on ? 1 : 0, { d: on ? 0.55 : 0.3, dl: on ? 0.12 : 0 }, snap);
      tf(g, on ? {} : { x: k < v.r[0] ? 28 : -28, s: 0.985 }, { d: 0.6 }, snap);
      g.setAttribute("aria-hidden", on ? "false" : "true");
      const wasOn = lastK >= 0 && inR(lastK, v.r[0], v.r[1]);
      if (!on && v.pre && !wasOn) {
        try { v.pre(ctx('[data-v="' + i + '"]', true)); } catch (e) { warn(id + " pre " + i + ": " + (e && e.message)); }
      }
      if (on) {
        try { v.play(ctx('[data-v="' + i + '"]', snap), k - v.r[0], k); }
        catch (e) { warn(id + " visual " + i + ": " + (e && e.message)); }
      }
    });
    caption(k, snap);
    lastK = k;
    if (snap) { void root.offsetWidth; root.classList.remove("w04-snap"); }
    root.setAttribute("data-moment", String(k));
  }
  function kill() {
    counters.forEach((tw0) => { try { tw0.kill(); } catch (_) {} });
    counters = [];
    if (root && window.gsap && typeof window.gsap.killTweensOf === "function") {
      try { window.gsap.killTweensOf(root.querySelectorAll("[data-k],[data-v]")); } catch (_) {}
    }
  }
  function mount(el) {
    const r = document.createElement("div");
    const rm = reduced();
    r.className = "vls-w04-" + id + " w04-root" + (useG ? " w04-gsap" : " w04-css") + (rm ? " w04-rm" : " w04-intro");
    r.setAttribute("data-scene", id);
    const art = R(-400, -300, 1200, 900, cfg.bg) + (cfg.deco ? cfg.deco() : "") +
      V.map((v, i) => `<g data-v="${i}" style="opacity:0">${v.art()}</g>`).join("");
    r.innerHTML = '<div class="w04-stage"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
      esc(cfg.desc) + '">' + art + '</svg></div><div class="w04-cap" aria-hidden="true"><span class="w04-no"></span><span class="w04-txt"></span><span class="w04-pr"><i></i></span></div>';
    if (typeof el.replaceChildren === "function") el.replaceChildren(r);
    else { el.innerHTML = ""; el.appendChild(r); }
    return r;
  }
  return {
    build(el) {
      if (!el || el.nodeType !== 1) return;
      kill();
      lastK = -1;
      useG = gsapOK();
      root = mount(el);
      render(0, true);
    },
    step(i, n) {
      if (!root) return;
      if (reduced()) { root.classList.add("w04-rm"); }
      render(mapK(i, n), !useG && reduced());
    },
    reset() {
      if (!root) return;
      kill();
      lastK = -1;
      render(0, true);
    }
  };
}
// merge(a, b): joins two adjacent visuals into one two-phase visual (cross-fade inside one stage).
const merge = (a, b) => {
  const na = a.r[1] - a.r[0] + 1;
  return {
    r: [a.r[0], b.r[1]],
    art: () => `<g data-k="mA">${a.art()}</g><g data-k="mB" style="opacity:0">${b.art()}</g>`,
    pre: (c) => { if (a.pre) a.pre(c); if (b.pre) b.pre(c); },
    play: (c, j, k) => {
      c.op("mA", j < na ? 1 : 0, { d: 0.4 }); c.op("mB", j < na ? 0 : 1, { d: 0.5, dl: j < na ? 0 : 0.15 });
      if (j < na) a.play(c, j, k); else b.play(c, j - na, k);
    }
  };
};
const BG = [];

// ============================================================
// O3e · Design an intervention with explicit costs · 27 moments · 9 visuals
// Only costs stated in the narration are shown: supervisor time and two weeks of
// workshops; a firm management commitment; rehearsal shifts and desk cover; a
// scorecard revision. No amounts are invented.
// ============================================================
{
  const id = "O3e", N = 27;
  const labels = [
    "Rewind: eleven weeks", "Communicate more?", "71% already agree", "Change the work",
    "Three desks co-design", "Cost: time, workshops", "A Week 9 habit", "Corniche: four fewer",
    "Where and when", "Cost: firm commitment", "Screens-only training", "System is one part",
    "Train the process", "Cost: rehearsal and cover", "The old measure", "Kiosk looks unproductive",
    "Old behaviour stays rational", "New scorecard measures", "Real changes at desk", "Costs the sponsor approves",
    "No costs, surprise bill", "Track adoption after go-live", "Weekly proof it works", "Advice versus plan",
    "Your plan may differ", "What, who pays, proof", "Next: the decision"
  ];
  const vis = [];

  // V1 (0-2) · adapted from https://lottiefiles.com/free-animation/process-in-cub-9iNG7QP0qC — cycling states, then settling
  vis.push({ r: [0, 2], art: () => {
    let s = H("rw", O(130, 150, 80, C.white, `stroke="${C.navy}" stroke-width="5"`) + K("hand", P("M130 150 V86", C.coral, 6)) + O(130, 150, 8, C.coral) +
      P("M60 64 a90 90 0 0 0 -10 40", C.slate, 4) + F("M44 96 l8 14 l8 -14 Z", C.slate) + T(300, 130, "11 weeks", 30, C.coral) + T(300, 160, "before go-live", 15, C.navy));
    s += H("ad", man(80, 220, 1.6, C.plum) + mega(104, 196, 1.3, C.plum) + waves(136, 196, 1.3, C.plum) + bubble(160, 60, 210, 54, C.plum, C.white, 0.15) + T(265, 93, "Communicate more", 16, C.plum) + qDot(366, 64, 12));
    s += H("pc", T(200, 70, "Already agree: faster", 15, C.navy) + R(40, 96, 320, 44, "#e1e8ef", 10) + K("b71", R(40, 96, 227, 44, C.teal, 10)) + T(154, 125, "71%", 20, C.white) +
      K("sl", R(267, 96, 10, 44, C.gold, 3)) + T(300, 180, "More explanation", 14, C.amber) + T(300, 200, "adds little", 14, C.amber) + arw(296, 166, 276, 146, C.amber, 2));
    return s;
  }, play: (c, j) => {
    c.vis({ rw: j === 0, ad: j === 1, pc: j === 2 });
    c.mv("hand", { r: j === 0 ? -330 : 0, pv: [130, 150] }, { d: 1.6, e: "power2.out" });
    c.mv("b71", { sx: j === 2 ? 1 : 0.02, pv: [40, 118] }, { d: 1 }); c.op("sl", j === 2 ? 1 : 0, { dl: 1 });
  } });

  // V2 (3-6) · adapted from https://www.behance.net/gallery/53752435/Motion-Design-Process — production stages and team work
  vis.push({ r: [3, 6], art: () => {
    let s = H("mw", env(40, 80, 120, 80, C.slate) + T(100, 196, "A message", 16, C.slate) + cross(100, 120, 3, C.coral, 5) +
      R(230, 90, 130, 70, C.amber, 10) + P("M270 90 v-14 h50 v14", C.amber, 5) + cog(270, 125, 16, C.white, C.amber) + R(298, 116, 44, 10, C.white, 3) + T(295, 196, "Change the work", 16, C.green) + okDot(360, 80, 14));
    let cd = R(60, 160, 280, 18, C.wood, 6) + R(110, 70, 180, 70, "#e9f2fb", 8, `stroke="${C.blue}" stroke-width="2"`) + T(200, 96, "Exceptions path", 14, C.blue) + D("ep", "M126 122 H190 L210 104 H274", C.blue, 3);
    [["Marina", 80], ["Corniche", 200], ["Old Town", 320]].forEach((d, i) => { cd += K("ag" + i, man(d[1], 228, 1.3, C.teal) + T(d[1], 268, d[0], 13, C.teal)); });
    s += H("cd", cd);
    s += H("tg", ptag(95, 28, "Supervisor time") + ptag(285, 28, "Two weeks' workshops"));
    s += H("p83", pill(330, 120, "Answers the 83%", { bg: C.coral, st: C.coral, fg: C.white, sz: 13 }));
    s += H("w9", P("M30 150 H370", C.navy, 3) + rep(10, (i) => O(40 + i * 36, 150, i === 0 || i === 5 ? 10 : 5, i === 0 ? C.coral : i === 5 ? C.green : C.navy)) +
      T(40, 182, "Week 4", 14, C.coral) + T(220, 182, "Week 9", 14, C.green) + T(220, 202, "To-be design", 13, C.green) + D("hb", "M40 130 C90 70 170 70 220 130", C.green, 3) + pill(130, 70, "Same habit", { st: C.green, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ mw: j === 0, cd: j === 1 || j === 2, tg: j === 2, p83: j === 2, w9: j === 3 });
    for (let i = 0; i < 3; i++) c.mv("ag" + i, j >= 1 ? {} : { y: 60 }, { d: 1, dl: i * 0.2 });
    c.dr("ep", j >= 1 && j <= 2 ? 1 : 0, { dl: 0.8 }); c.dr("hb", j === 3 ? 1 : 0, { d: 1.2 });
  } });

  // V3 (7-9) · adapted from https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8 — proposal, agreement and signature states
  vis.push({ r: [7, 9], art: () => {
    let s = H("rs", T(200, 44, "Business case: Corniche", 15, C.navy) + rep(4, (i) => K("a" + i, man(80 + i * 80, 150, 1.4, C.teal))) + pill(200, 230, "Four fewer per shift", { bg: C.plum, st: C.plum, fg: C.white }));
    let t = R(30, 30, 340, 230, C.white, 8, `stroke="${C.navy}" stroke-width="2.4"`) + T(200, 58, "Redeployment position", 15, C.navy) + T(90, 86, "Agent", 13, C.slate) + T(210, 86, "Goes to", 13, C.slate) + T(320, 86, "When", 13, C.slate);
    for (let i = 0; i < 4; i++) t += K("rw" + i, man(90, 124 + i * 36, 0.7, C.teal) + R(160, 108 + i * 36, 100, 24, C.mint, 6) + R(290, 108 + i * 36, 60, 24, C.sky, 6) + tick(210, 120 + i * 36, 0.6, C.green, 2.4) + tick(320, 120 + i * 36, 0.6, C.blue, 2.4));
    s += H("tb", t + pill(200, 282, "Published early", { st: C.green, sz: 13 }));
    s += H("cm", ptag(120, 50, "Firm commitment") + P("M200 260 V120", C.navy, 5) + K("bm", P("M80 120 H320", C.navy, 5) + R(50, 120, 80, 50, "#5a6a80", 8) + T(90, 150, "Ambiguity", 13, C.white) + R(280, 128, 80, 34, C.coral, 8) + T(320, 150, "Bad news", 13, C.white)) +
      pill(200, 286, "Ambiguity hurts more", { st: C.coral, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ rs: j === 0, tb: j === 1, cm: j === 2 });
    for (let i = 0; i < 4; i++) { c.op("a" + i, j === 0 ? 0.3 : 1, { dl: 0.6 + i * 0.15 }); c.op("rw" + i, j === 1 ? 1 : 0, { dl: 0.3 + i * 0.25 }); }
    c.mv("bm", { r: j === 2 ? -12 : 0, pv: [200, 120] }, { d: 1.3, dl: 0.4, e: "elastic.out(1,0.5)" });
  } });

  // V4 (10-13) · adapted from https://lottiefiles.com/free-animation/3d-camera-factory-2I4Nonw7Ad — an item progressing through production stations
  vis.push({ r: [10, 13], art: () => {
    let s = H("sl", R(50, 40, 300, 190, "#2c4560", 12) + R(66, 56, 268, 150, C.white, 6) + kiosk(130, 190, 2, C.navy) + R(200, 80, 110, 34, C.blue, 8) + T(255, 102, "Press here", 13, C.white) +
      R(200, 130, 110, 34, C.slate, 8) + T(255, 152, "Then here", 13, C.white) + pill(200, 262, "System training only", { st: C.slate }));
    const PZ = [["System", C.blue], ["Roles", C.teal], ["Exceptions", C.coral], ["Hand-offs", C.plum]];
    let pz = "";
    PZ.forEach((p, i) => { pz += K("pz" + i, R(80 + (i % 2) * 124, 50 + Math.floor(i / 2) * 104, 116, 96, p[1], 10) + T(138 + (i % 2) * 124, 104 + Math.floor(i / 2) * 104, p[0], 15, C.white)); });
    s += H("pz", pz + T(200, 284, "New way of working", 14, C.navy));
    s += H("dm", R(150, 40, 100, 40, C.navy, 8) + T(200, 66, "Arrival", 14, C.white) + P("M200 80 V104 L200 104", C.navy, 3) +
      F("M200 104 L250 134 L200 164 L150 134 Z", C.gold) + T(200, 139, "Step in?", 13, C.ink) + arw(150, 134, 80, 134, C.navy, 2.4) + T(70, 160, "Kiosk", 13, C.navy) +
      arw(250, 134, 320, 134, C.coral, 2.4) + T(330, 160, "Exception", 13, C.coral) + R(270, 190, 120, 40, C.white, 8, `stroke="${C.coral}" stroke-width="2"`) + T(330, 215, "Resolve it", 13, C.coral) + P("M330 168 V190", C.coral, 2) +
      pill(130, 250, "Process training", { bg: C.green, st: C.green, fg: C.white, sz: 13 }));
    s += H("cv", man(110, 210, 1.6, C.teal) + book(90, 110, 40, 50, C.amber) + T(110, 260, "Learning", 14, C.amber) + P("M200 80 V250", C.slate, 2, 'stroke-dasharray="5 5"') +
      man(290, 210, 1.6, C.green) + desk(290, 222, 90) + T(290, 270, "Desk cover", 14, C.green) + ptag(110, 50, "Rehearsal shifts") + ptag(290, 50, "Desk cover"));
    return s;
  }, play: (c, j) => {
    c.vis({ sl: j === 0, pz: j === 1, dm: j === 2, cv: j === 3 });
    const OF = [[0, 0], [60, -40], [-50, 40], [70, 50]];
    for (let i = 0; i < 4; i++) c.mv("pz" + i, j === 1 ? {} : { x: OF[i][0], y: OF[i][1], r: i * 12 }, { d: 1, dl: i * 0.2, e: "back.out(1.4)" });
  } });

  // V5 (14-17) · adapted from https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/ — columns and labels updating
  vis.push({ r: [14, 17], art: () => {
    let s = R(40, 30, 180, 230, C.white, 10, `stroke="${C.navy}" stroke-width="2.4"`) + T(130, 58, "Agent scorecard", 15, C.navy);
    s += H("old", T(130, 96, "Guests I checked in", 13, C.slate) + R(70, 120, 120, 40, "#e1e8ef", 8) + K("cb", R(70, 120, 120, 40, C.blue, 8)) + H("dn", arw(130, 176, 130, 212, C.coral, 3) + T(130, 236, "Looks lower", 14, C.coral)));
    s += H("new", T(130, 96, "Resolved arrivals", 13, C.green) + O(130, 136, 22, C.green) + tick(130, 136, 1, C.white, 4) + T(130, 192, "Exceptions fixed", 13, C.green) + O(130, 226, 18, C.coral) + tick(130, 226, 0.8, C.white, 3.4));
    s += H("ks", kiosk(320, 220, 1.6, C.navy) + K("gst", face(250, 150, 12, C.blue)) + man(250, 236, 1.2, C.teal) + T(300, 270, "Sends to kiosk", 13, C.slate));
    s += H("rat", bulb(310, 90, 1.6) + T(310, 156, "Old way", 15, C.navy) + T(310, 178, "stays rational", 15, C.navy));
    s += H("rv", ptag(306, 80, "Scorecard revision") + pill(306, 180, "Reward new behaviour", { bg: C.green, st: C.green, fg: C.white, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ old: j <= 2, new: j === 3, ks: j === 1, rat: j === 2, rv: j === 3 });
    c.mv("cb", { sx: j >= 1 ? 0.6 : 1, pv: [70, 140] }, { d: 1, dl: 0.8 }); c.op("dn", j >= 1 ? 1 : 0, { dl: 1 });
    c.mv("gst", j === 1 ? { x: 60, y: 10 } : {}, { d: 1 });
  } });

  // V6 (18-20) · adapted from https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP — activity transforming into an approved state
  vis.push({ r: [18, 20], art: () => {
    const IT = [["Co-design", "Supervisor time"], ["Written position", "Commitment"], ["Process training", "Rehearsal, cover"], ["New measures", "Scorecard work"]];
    let s = H("dk", desk(200, 210, 300) + rep(4, (i) => K("gl" + i, O(80 + i * 80, 160, 30, "rgba(239,194,90,.35)") + T(80 + i * 80, 166, ["Design", "Role", "Doc", "Score"][i], 13, C.navy))) + pill(200, 270, "Something real changes", { st: C.green }));
    let r = R(60, 26, 280, 230, C.white, 6, `stroke="${C.navy}" stroke-width="2.4"`) + T(200, 52, "Intervention plan", 15, C.navy);
    IT.forEach((it, i) => { r += K("ri" + i, T(76, 92 + i * 40, it[0], 14, C.ink, "start") + T(326, 92 + i * 40, it[1], 12.5, C.amber, "end")); });
    r += H("ok", R(110, 240, 180, 40, C.green, 8) + T(200, 266, "Sponsor approves", 15, C.white));
    s += H("rc", r);
    s += H("sp", R(40, 50, 140, 160, C.white, 8, `stroke="${C.slate}" stroke-width="2"`) + T(110, 80, "Plan, no costs", 13, C.slate) + T(110, 140, "Cheap", 22, C.green) +
      K("bill", env(230, 60, 130, 90, C.coral) + T(295, 176, "Bill arrives", 15, C.coral)) + pill(200, 250, "A surprise later", { bg: C.coral, st: C.coral, fg: C.white }));
    return s;
  }, play: (c, j) => {
    c.vis({ dk: j === 0, rc: j === 1, sp: j === 2 });
    for (let i = 0; i < 4; i++) { c.mv("gl" + i, j === 0 ? { s: 1.15 } : {}, { d: 0.6, dl: i * 0.2 }); c.op("ri" + i, j === 1 ? 1 : 0, { dl: i * 0.25 }); }
    c.op("ok", j === 1 ? 1 : 0, { dl: 1.2 }); c.mv("ok", j === 1 ? {} : { s: 1.5 }, { dl: 1.2, e: "back.out(2)" });
    c.mv("bill", j === 2 ? {} : { y: -80 }, { d: 0.9, dl: 0.6, e: "bounce.out" });
  } });

  // V7 (21-22) · adapted from https://observablehq.com/@d3/learn-d3-animation — a weekly series traced point by point
  vis.push({ r: [21, 22], art: () => {
    let s = R(60, 40, 280, 120, C.white, 6, `stroke="${C.navy}" stroke-width="2"`) + T(200, 62, "Intervention plan", 14, C.navy) + rep(4, (i) => P(`M80 ${80 + i * 14} H${300 - i * 20}`, C.mist, 5));
    s += K("nl", R(70, 130, 260, 24, C.mint, 6) + T(200, 147, "Track adoption weekly", 13, C.green));
    s += H("ch", P("M60 270 V180 H360", C.navy, 2) + D("ln", "M70 255 L110 245 L150 232 L190 222 L230 206 L270 196 L310 188 L350 184", C.green, 4) +
      rep(8, (i) => H("ck" + i, okDot(70 + i * 40, [255, 245, 232, 222, 206, 196, 188, 184][i] - 0, 7))) + T(360, 290, "Week by week", 13, C.slate, "end"));
    return s;
  }, play: (c, j) => {
    c.mv("nl", { sx: 1, pv: [70, 142] }, { d: 0.9 }); c.op("nl", 1);
    c.op("ch", j === 1 ? 1 : 0); c.dr("ln", j === 1 ? 1 : 0, { d: 1.6 });
    for (let i = 0; i < 8; i++) c.op("ck" + i, j === 1 ? 1 : 0, { dl: 0.3 + i * 0.18 });
  } });

  // V8 (23-25) · adapted from https://observablehq.com/@d3/stacked-to-grouped-bars — the same items regrouped for comparison
  vis.push({ r: [23, 25], art: () => {
    let s = H("vs", R(20, 40, 160, 210, C.lilac, 14) + T(100, 70, "Communicate", 15, C.plum) + mega(70, 140, 1.4, C.plum) + T(100, 200, "Says more", 14, C.plum) + T(100, 222, "Changes little", 14, C.plum) +
      R(200, 40, 180, 210, C.mint, 14) + T(290, 70, "Change the work", 15, C.green) + rep(4, (i) => R(216, 86 + i * 36, 148, 28, C.white, 6, `stroke="${C.green}" stroke-width="1.8"`) + T(290, 105 + i * 36, ["Co-design", "Written position", "Process training", "New measures"][i], 12.5, C.green)));
    s += H("yp", R(120, 50, 160, 200, C.white, 10, `stroke="${C.blue}" stroke-width="2.4"`) + T(200, 80, "Your plan", 16, C.blue) + rep(4, (i) => P(`M140 ${110 + i * 28} H${260 - (i % 2) * 30}`, C.mist, 6)) + okDot(270, 60, 14) + pill(200, 280, "Different is fine", { st: C.green, sz: 13 }));
    s += H("tq", [["What changes?", C.navy], ["Who pays?", C.amber], ["How will you know?", C.green]].map((q, i) => R(50, 50 + i * 74, 300, 56, C.white, 12, `stroke="${q[1]}" stroke-width="2.4"`) + T(200, 85 + i * 74, q[0], 17, q[1])).join(""));
    return s;
  }, play: (c, j) => { c.vis({ vs: j === 0, yp: j === 1, tq: j === 2 }); } });

  // V9 (26) · adapted from https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6 — figures converging into one group
  vis.push({ r: [26, 26], art: () => {
    let s = E(200, 220, 150, 34, C.wood) + E(200, 216, 146, 30, "#b48a5c") + T(200, 222, "Decision", 16, C.white);
    [["Marina", 60, 60, C.coral], ["Corniche", 200, 40, C.plum], ["Old Town", 340, 60, C.amber]].forEach((o, i) => { s += K("oc" + i, R(o[1] - 50, o[2] - 22, 100, 44, C.white, 10, `stroke="${o[3]}" stroke-width="2.4"`) + T(o[1], o[2] + 5, o[0], 14, o[3])); });
    return s;
  }, play: (c) => {
    [[60, 60], [200, 40], [340, 60]].forEach((p, i) => c.mv("oc" + i, { x: (200 + (i - 1) * 104) - p[0], y: 150 - p[1] }, { d: 1.4, dl: i * 0.2, e: "power2.inOut" }));
  } });

  VS[id] = makeScene({ id, N, labels, vis, bg: "#f4f3ef",
    desc: "An intervention that changes the work, each with a stated cost: co-design costs supervisor time and two weeks of workshops, a written redeployment position costs a firm commitment, process training costs rehearsal shifts and cover, new measures cost a scorecard revision, and adoption is tracked weekly." });
  BG.push([id, "#f4f3ef"]);
}

// ============================================================
// O3f · The case: three objections, one decision · 26 moments · 8 visuals
// Three questions, answered in order: which objections communication could fix,
// which are defects versus rational resistance, and what to change at what cost.
// ============================================================
{
  const id = "O3f", N = 26;
  const labels = [
    "Decision time", "Objections, survey, deadline", "Test the advice", "Three questions",
    "Group by cause", "Marina: 30%, no path", "Cause: design fails", "Corniche: four fewer",
    "Fear: written position", "Old Town: memory", "83% beneath all", "Communication fixes which?",
    "Almost none: 71%", "Question two: test", "Checkable, no stake", "One defect, two resistances",
    "None dismissed", "Question three: costs", "Marina: change design", "Corniche: commit in writing",
    "Old Town: co-design, space", "Real changes, stated costs", "Still explain decisions", "Explanation follows change",
    "Match the diagnosed cause", "Your turn now"
  ];
  const OB = [["Marina", C.coral], ["Corniche", C.plum], ["Old Town", C.amber]];
  const card = (x, y, t, col, w = 110) => R(x - w / 2, y - 22, w, 44, C.white, 10, `stroke="${col}" stroke-width="2.4"`) + T(x, y + 5, t, 14, col);
  const vis = [];

  // V1 (0-3) · adapted from https://motionarray.com/after-effects-templates/flat-infographics-17982/ — flat elements animated into place
  vis.push({ r: [0, 3], art: () => {
    let s = R(20, 30, 360, 240, C.wood, 16) + R(30, 40, 340, 220, "#b48a5c", 12);
    s += K("tt", T(200, 150, "The decision", 22, C.white));
    s += H("it", rep(3, (i) => K("lt" + i, env(46 + i * 50, 60, 44, 30, OB[i][1], C.white))) + K("sv", paper(220, 56, 60, 80, C.navy, 4)) + T(250, 154, "Survey", 13, C.white) +
      K("cl", cal(296, 56, 64, 64, C.coral, "Go-live")) + T(328, 104, "11 wks", 13, C.coral) + T(114, 116, "Objections", 13, C.white));
    s += H("adv", R(60, 170, 140, 70, "#fff3b0", 4) + T(130, 200, "Communicate", 14, C.ink) + T(130, 220, "more clearly", 14, C.ink) +
      O(250, 205, 30, "rgba(255,255,255,.3)", `stroke="${C.ink}" stroke-width="4"`) + P("M272 227 L296 251", C.ink, 7) + T(320, 190, "Test it", 14, C.white));
    s += H("qs", rep(3, (i) => K("q" + i, R(52 + i * 104, 172, 92, 76, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + O(98 + i * 104, 196, 13, C.navy) + T(98 + i * 104, 201, String(i + 1), 14, C.white) +
      T(98 + i * 104, 232, ["Fixable?", "Test", "Costs"][i], 14, C.navy))));
    return s;
  }, play: (c, j) => {
    c.op("tt", j === 0 ? 1 : 0);
    c.op("it", j >= 1 ? 1 : 0);
    for (let i = 0; i < 3; i++) c.mv("lt" + i, j >= 1 ? {} : { y: -80 }, { d: 0.8, dl: i * 0.15, e: "bounce.out" });
    c.mv("sv", j >= 1 ? {} : { y: -80 }, { d: 0.8, dl: 0.5, e: "bounce.out" }); c.mv("cl", j >= 1 ? {} : { y: -80 }, { d: 0.8, dl: 0.7, e: "bounce.out" });
    c.vis({ adv: j === 2, qs: j === 3 });
    for (let i = 0; i < 3; i++) c.mv("q" + i, j === 3 ? {} : { y: 40 }, { dl: i * 0.2, e: "back.out(1.6)" });
  } });

  // V2 (4-6) · adapted from https://observablehq.com/@d3/stacked-to-grouped-bars — keyed items moved from one grouping to another
  vis.push({ r: [4, 6], art: () => {
    let s = H("gp", T(200, 40, "Group by cause", 15, C.navy) + rep(3, (i) => R(24 + i * 124, 60, 110, 190, "#eef1f5", 12) + T(79 + i * 124, 238, ["Design fails", "Job fear", "Memory"][i], 14, OB[i][1])) +
      rep(3, (i) => K("cd" + i, card(79 + i * 124, 110, OB[i][0], OB[i][1]))));
    const a = 0.3 * 2 * Math.PI, rr = 70, cx = 110, cy = 150, ex = r1(cx + rr * Math.sin(a)), ey = r1(cy - rr * Math.cos(a));
    s += H("mr", O(cx, cy, rr, C.teal) + F(`M${cx} ${cy} L${cx} ${cy - rr} A${rr} ${rr} 0 0 1 ${ex} ${ey} Z`, C.coral) + O(cx, cy, 36, "#f2f3f6") + T(cx, cy + 6, "30%", 16, C.coral) +
      T(cx, 250, "Corporate arrivals", 13, C.slate) + kiosk(300, 220, 1.6, C.navy) + noDot(300, 112, 13) + T(300, 254, "No kiosk path", 14, C.coral) + card(200, 34, "Marina", C.coral));
    s += H("cs", R(60, 90, 280, 70, C.white, 12, `stroke="${C.coral}" stroke-width="2.4"`) + T(200, 132, "Fails a real case", 17, C.coral) +
      bubble(40, 190, 120, 40, C.plum, C.white, 0.6) + T(100, 215, "A message", 14, C.plum) + K("bx", noDot(176, 206, 13)) + pill(290, 214, "Needs a redesign", { bg: C.coral, st: C.coral, fg: C.white, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ gp: j === 0, mr: j === 1, cs: j === 2 });
    for (let i = 0; i < 3; i++) c.mv("cd" + i, j === 0 ? { y: 70 } : {}, { d: 1.1, dl: 0.3 + i * 0.25, e: "power3.inOut" });
    c.mv("bx", j === 2 ? {} : { s: 0.2 }, { dl: 0.8, e: "back.out(2)" });
  } });

  // V3 (7-9) · adapted from https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm — actors revealed with their workflow actions
  vis.push({ r: [7, 9], art: () => {
    let s = H("cn", card(200, 36, "Corniche", C.plum) + T(200, 80, "Costed on", 14, C.slate) + rep(4, (i) => K("ag" + i, man(110 + i * 60, 160, 1.4, C.teal))) + pill(200, 230, "Four fewer per shift", { bg: C.plum, st: C.plum, fg: C.white }));
    s += H("fr", R(30, 50, 150, 190, C.lilac, 14) + T(105, 80, "Cause", 15, C.plum) + man(105, 180, 1.5, C.plum) + bang(130, 130, 12, C.plum) + T(105, 226, "Fear of job loss", 13, C.plum) +
      arw(190, 145, 222, 145, C.navy, 3) + R(232, 50, 140, 190, C.white, 8, `stroke="${C.green}" stroke-width="2.4"`) + T(302, 80, "Answer", 15, C.green) + rep(4, (i) => P(`M250 ${110 + i * 22} H354`, C.mist, 4)) +
      T(302, 212, "Written position", 13, C.green) + okDot(356, 56, 12));
    s += H("ot", card(200, 36, "Old Town", C.amber) + R(40, 80, 140, 100, C.slate, 8) + R(52, 92, 116, 64, "#a9b8c7", 4) + T(110, 130, "Last system", 14, C.white) + bubble(200, 80, 170, 50, C.amber, C.white, 0.15) +
      T(285, 111, "Promised the same", 14, C.amber) + pill(200, 240, "Organisational memory", { bg: C.amber, st: C.amber, fg: C.white }));
    return s;
  }, play: (c, j) => {
    c.vis({ cn: j === 0, fr: j === 1, ot: j === 2 });
    for (let i = 0; i < 4; i++) c.op("ag" + i, j === 0 ? 0.3 : 1, { dl: 0.6 + i * 0.15 });
  } });

  // V4 (10-12) · adapted from https://old.observablehq.com/@d3/hierarchy-traversal-animated — paths traced from leaves to a common root
  vis.push({ r: [10, 12], art: () => {
    let s = rep(3, (i) => K("lf" + i, card(70 + i * 130, 40, OB[i][0], OB[i][1])));
    s += H("rt", D("r0", "M70 62 C70 140 200 130 200 190", C.navy, 3.5) + D("r1", "M200 62 V190", C.navy, 3.5) + D("r2", "M330 62 C330 140 200 130 200 190", C.navy, 3.5) +
      R(100, 190, 200, 60, C.navy, 14) + T(200, 226, "83% not consulted", 16, C.white));
    s += H("cm", mega(40, 170, 1.6, C.plum) + waves(80, 170, 1.6, C.plum) + pill(110, 250, "Communicate benefits", { st: C.plum, sz: 13 }) + rep(3, (i) => qDot(70 + i * 130 + 50, 24, 10)) + T(290, 180, "Fixes which?", 18, C.plum));
    s += H("nn", R(160, 150, 220, 34, "#e1e8ef", 8) + R(160, 150, 156, 34, C.teal, 8) + T(238, 173, "71% already believe", 13, C.white) + rep(3, (i) => noDot(70 + i * 130 + 50, 24, 11)) +
      T(270, 220, "Almost none", 20, C.coral) + mega(40, 170, 1.6, C.plum));
    return s;
  }, play: (c, j) => {
    c.vis({ rt: j === 0, cm: j === 1, nn: j === 2 });
    for (let i = 0; i < 3; i++) c.dr("r" + i, j === 0 ? 1 : 0, { dl: i * 0.2 });
  } });

  // V5 (13-16) · adapted from https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU — steps activating one after another
  vis.push({ r: [13, 16], art: () => {
    let s = H("q2", R(110, 70, 180, 120, C.white, 12, `stroke="${C.navy}" stroke-width="2.4"`) + O(200, 70, 18, C.navy) + T(200, 76, "2", 18, C.white) + T(200, 128, "Resistance", 16, C.plum) + T(200, 152, "or defect?", 16, C.coral));
    s += H("gt", [[120, "Checkable case?"], [280, "No personal stake?"]].map((g) => P(`M${g[0] - 40} 250 V120 Q${g[0] - 40} 88 ${g[0]} 88 Q${g[0] + 40} 88 ${g[0] + 40} 120 V250`, C.navy, 9) + T(g[0], 66, g[1], 14, C.navy)).join("") +
      paper(100, 150, 40, 54, C.blue, 3) + man(280, 220, 1.3, C.teal) + coin(312, 236, 11));
    s += H("bn", R(20, 150, 170, 136, C.rose, 14) + T(105, 174, "Design defect", 15, C.coral) + R(210, 150, 170, 136, C.lilac, 14) + T(295, 174, "Rational resistance", 14, C.plum) + rep(3, (i) => K("sc" + i, card(70 + i * 130, 50, OB[i][0], OB[i][1], 100))));
    s += H("rp", rep(2, (i) => K("ev" + i, env(250 + i * 70, 40, 44, 30, C.green))) + pill(295, 104, "Answered, not dismissed", { st: C.green, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ q2: j === 0, gt: j === 1, bn: j >= 2, rp: j === 3 });
    const TG = [[105 - 70, 220 - 50], [295 - 200, 206 - 50], [295 - 330, 254 - 50]];
    for (let i = 0; i < 3; i++) c.mv("sc" + i, j >= 2 ? { x: TG[i][0], y: TG[i][1] } : {}, { d: 1.2, dl: 0.3 + i * 0.25, e: "power3.inOut" });
    for (let i = 0; i < 2; i++) c.mv("ev" + i, j === 3 ? { x: [86, 16][i], y: [150, 198][i] } : {}, { d: 1.2, dl: i * 0.2, e: "power2.inOut" });
  } });

  // V6 (17-20) · adapted from https://motionarray.com/after-effects-templates/project-timeline-2424919/ — a track with items placed on time markers
  vis.push({ r: [17, 20], art: () => {
    let s = P("M30 250 H370", C.navy, 3) + rep(12, (i) => O(30 + i * 30.9, 250, i === 11 ? 9 : 4, i === 11 ? C.green : C.navy)) + T(370, 278, "Go-live", 13, C.green, "end") + T(30, 278, "Today", 13, C.navy, "start");
    s += H("q3", R(110, 60, 180, 110, C.white, 12, `stroke="${C.navy}" stroke-width="2.4"`) + O(200, 60, 18, C.navy) + T(200, 66, "3", 18, C.white) + T(200, 112, "Next 11 weeks", 16, C.navy) + T(200, 140, "and each cost", 15, C.amber));
    s += H("m1", R(20, 40, 110, 150, C.white, 10, `stroke="${C.coral}" stroke-width="2.4"`) + T(75, 64, "Marina", 14, C.coral) + P("M36 100 H114 M75 100 V140 H114", C.green, 3) + T(75, 162, "Staffed path", 12.5, C.green) + star(110, 176, 8) + P("M75 192 V244", C.coral, 2, 'stroke-dasharray="4 4"'));
    s += H("m2", R(145, 40, 110, 150, C.white, 10, `stroke="${C.plum}" stroke-width="2.4"`) + T(200, 64, "Corniche", 14, C.plum) + paper(176, 78, 48, 60, C.plum, 3) + T(200, 162, "In writing", 12.5, C.plum) + ptag(200, 212, "Commitment", C.plum) + P("M200 226 V244", C.plum, 2, 'stroke-dasharray="4 4"'));
    s += H("m3", R(270, 40, 110, 150, C.white, 10, `stroke="${C.amber}" stroke-width="2.4"`) + T(325, 64, "Old Town", 14, C.amber) + R(290, 108, 70, 10, C.wood, 3) + man(300, 100, 0.7, C.teal) + man(350, 100, 0.7, C.teal) +
      T(325, 142, "Co-design", 12.5, C.teal) + R(300, 152, 50, 22, C.coral, 4) + T(325, 168, "Hold", 13, C.white) + P("M325 192 V244", C.amber, 2, 'stroke-dasharray="4 4"'));
    return s;
  }, play: (c, j) => {
    c.vis({ q3: j === 0, m1: j >= 1, m2: j >= 2, m3: j >= 3 });
    ["m1", "m2", "m3"].forEach((m, i) => c.mv(m, j >= i + 1 ? {} : { y: -30 }, { d: 0.8, e: "back.out(1.6)" }));
  } });

  // V7 (21-23) · adapted from https://observablehq.com/@d3/transition-end — move first, then the follow-up state
  vis.push({ r: [21, 23], art: () => {
    let s = "";
    [["Design change", "Design effort", C.coral], ["Written position", "Commitment", C.plum], ["Co-design", "Supervisor time", C.amber]].forEach((m, i) => {
      s += K("ch" + i, R(20 + i * 128, 40, 112, 70, C.white, 10, `stroke="${m[2]}" stroke-width="2.4"`) + T(76 + i * 128, 72, m[0], 13, m[2]) + T(76 + i * 128, 94, m[1], 12.5, C.amber));
    });
    s += H("rc", rep(3, (i) => ptag(76 + i * 128, 150, "Stated")) + pill(200, 230, "Real, not just said", { bg: C.green, st: C.green, fg: C.white }));
    s += H("ex", rep(3, (i) => bubble(30 + i * 128, 140, 92, 34, C.navy, C.white, 0.5) + T(76 + i * 128, 162, "Why", 13, C.navy)) + pill(200, 240, "Every decision explained", { st: C.navy, sz: 13 }));
    s += H("ord", R(30, 210, 140, 50, C.green, 10) + T(100, 240, "1. Change", 15, C.white) + arw(178, 235, 222, 235, C.navy, 3) + R(230, 210, 140, 50, C.navy, 10) + T(300, 240, "2. Explain", 15, C.white) +
      man(200, 168, 1.1, C.teal) + bubble(222, 120, 110, 30, C.green, C.white, 0.1) + T(277, 140, "Evidence", 13, C.green));
    return s;
  }, pre: (c) => { for (let i = 0; i < 3; i++) c.mv("ch" + i, { y: 40 }); }, play: (c, j) => {
    for (let i = 0; i < 3; i++) c.mv("ch" + i, {}, { dl: i * 0.2, e: "back.out(1.5)" });
    c.vis({ rc: j === 0, ex: j === 1, ord: j === 2 });
  } });

  // V8 (24-25) · adapted from https://lottiefiles.com/free-animation/supply-chain-and-shipping-Gd8ZsVZpXq — shipments advancing to a new node
  vis.push({ r: [24, 25], art: () => {
    let s = H("mt", T(100, 40, "Diagnosed cause", 14, C.navy) + T(300, 40, "Your response", 14, C.navy) +
      rep(3, (i) => R(30, 60 + i * 66, 140, 46, C.white, 10, `stroke="${OB[i][1]}" stroke-width="2.4"`) + T(100, 89 + i * 66, ["Design fails", "Job fear", "Memory, no say"][i], 13, OB[i][1]) +
        R(230, 60 + i * 66, 140, 46, C.mint, 10) + T(300, 89 + i * 66, ["Your fix A", "Your fix B", "Your fix C"][i], 13, C.green) + D("mm" + i, `M172 ${83 + i * 66} H228`, C.green, 3)) +
      pill(200, 270, "Different, but matched", { st: C.green, sz: 13 }));
    s += H("dr", R(150, 50, 100, 190, C.navy, 6) + K("lf", R(154, 54, 92, 182, C.blue, 4)) + O(232, 150, 5, C.gold) + traveller(80, 220, 1.4, C.teal) + T(310, 140, "Unfamiliar", 15, C.navy) + T(310, 162, "organisation", 15, C.navy));
    return s;
  }, play: (c, j) => {
    c.vis({ mt: j === 0, dr: j === 1 });
    for (let i = 0; i < 3; i++) c.dr("mm" + i, j === 0 ? 1 : 0, { dl: i * 0.3 });
    c.mv("lf", { sx: j === 1 ? 0.25 : 1, pv: [154, 145] }, { d: 1.3, dl: 0.4 });
  } });

  VS[id] = makeScene({ id, N, labels, vis, bg: "#f2f3f6",
    desc: "The director's decision: the three objections are grouped by cause, communication alone fixes almost none because 71 percent already believe the design is faster, Marina is a defect while Corniche and Old Town are rational resistance, and each gets a real, costed change." });
  BG.push([id, "#f2f3f6"]);
}

// ============================================================
// O3g · The forum and the week ahead · 26 moments · 9 visuals
// Concrete forum actions in order: read the case and exhibit, post first by
// mid-week, diagnose and cost, cite Jeston Ch. 25, reply to two peers and
// disagree with one; then the week's four ideas and the step to Week 5.
// ============================================================
{
  const id = "O3g", N = 26;
  const labels = [
    "Into a new case", "Twenty-Two Years forum", "Test methods elsewhere", "Don't copy Qasr",
    "Read case and exhibit", "Post first", "Protect your thinking", "Drafts can be imperfect",
    "Post by mid-week", "Causes, losses, defects", "Changes with costs", "Cite Jeston, Chapter 25",
    "Two replies, one disagreement", "Challenge strengthens arguments", "Respectful and specific", "More than 'great post'",
    "Facilitator summary", "Counts toward Week 14", "The week in one", "Adoption decides value",
    "Resistance is data", "Stakeholders move", "Adoption is measured", "Next: Organization Strategy",
    "Effort where it counts", "Thank you, Qasr"
  ];
  const post = (x, y, w, h, col, title) => R(x, y, w, h, C.white, 10, `stroke="${col}" stroke-width="2.2"`) + R(x, y, w, 24, col, 10) + R(x, y + 12, w, 12, col) + T(x + w / 2, y + 17, title, 13, C.white);
  const vis = [];

  // V1 (0-3) · adapted from https://lottiefiles.com/free-animation/delivery-truck-road-animation-K9xyRiku9v — carrying a load along a route to a new place
  vis.push({ r: [0, 3], art: () => {
    let s = H("tr", R(20, 120, 90, 120, C.navy, 6) + rep(6, (i) => R(32 + (i % 3) * 26, 136 + Math.floor(i / 3) * 34, 16, 20, C.gold, 2)) + T(65, 262, "Qasr", 14, C.navy) +
      R(290, 100, 90, 140, C.plum, 6) + rep(6, (i) => R(302 + (i % 3) * 26, 116 + Math.floor(i / 3) * 40, 16, 22, "#cdbfe0", 2)) + T(335, 262, "New case", 14, C.plum) +
      P("M110 236 H290", C.slate, 3, 'stroke-dasharray="8 6"') + K("tv", traveller(124, 222, 1.2, C.teal)) + pill(200, 60, "Take the method", { st: C.teal }));
    s += H("bk", R(120, 30, 160, 220, C.plum, 8) + R(132, 42, 136, 196, "rgba(255,255,255,.12)", 4) + T(200, 110, "22 Years", 26, C.white) + T(200, 156, "Knowing How", 20, C.white) +
      T(200, 222, "Forum case", 14, C.gold) + T(330, 150, "Different", 14, C.plum) + T(330, 170, "organisation", 14, C.plum));
    s += H("ky", R(230, 90, 120, 130, C.plum, 12) + O(290, 140, 14, C.night) + R(284, 146, 12, 30, C.night, 3) + K("key", O(70, 155, 18, "none", `stroke="${C.gold}" stroke-width="6"`) + R(86, 151, 70, 10, C.gold, 3) + R(140, 161, 8, 12, C.gold, 2)) +
      T(110, 210, "Your method", 14, C.amber) + T(290, 250, "Unseen setting", 14, C.plum));
    s += H("cp", R(120, 90, 160, 100, C.slate, 10) + R(130, 70, 140, 26, "#8a9bb0", 6) + paper(150, 120, 46, 56, C.navy, 3) + paper(206, 120, 46, 56, C.navy, 3) + cross(200, 140, 4, C.coral, 6) +
      T(200, 226, "Qasr's answers", 15, C.navy) + T(200, 250, "may not fit here", 14, C.coral));
    return s;
  }, play: (c, j) => {
    c.vis({ tr: j === 0, bk: j === 1, ky: j === 2, cp: j === 3 });
    c.mv("tv", j === 0 ? { x: 140 } : {}, { d: 1.8, e: "power1.inOut" });
    c.mv("key", j === 2 ? { x: 130, y: -12 } : {}, { d: 1.2, dl: 0.3 });
  } });

  // V2 (4-6) · adapted from https://dribbble.com/shots/27600376-Clean-Workflow-Visualization-with-Motion-Graphics — journey steps connected in order
  vis.push({ r: [4, 6], art: () => {
    let s = H("rd", R(30, 40, 150, 200, C.white, 8, `stroke="${C.plum}" stroke-width="2.4"`) + T(105, 66, "The case", 15, C.plum) + rep(6, (i) => P(`M46 ${92 + i * 22} H${164 - (i % 2) * 24}`, C.mist, 4)) +
      R(210, 60, 160, 160, C.white, 8, `stroke="${C.navy}" stroke-width="2.4"`) + T(290, 84, "Exhibit", 15, C.navy) + rep(4, (i) => K("eb" + i, R(234 + i * 30, 200 - [40, 70, 55, 100][i], 20, [40, 70, 55, 100][i], C.blue, 3))) +
      K("lens", O(320, 130, 30, "rgba(255,255,255,.3)", `stroke="${C.ink}" stroke-width="4"`) + P("M342 152 L364 174", C.ink, 7)) + pill(200, 268, "May hold the argument", { st: C.navy, sz: 13 }));
    s += H("pf", post(40, 40, 320, 60, C.green, "1 · Your diagnosis") + T(200, 86, "Posted first", 15, C.green) +
      rep(3, (i) => post(40, 116 + i * 52, 320, 44, "#9aa8b6", "Classmate post") + lockI(340, 140 + i * 52, 0.8, C.slate)));
    s += H("mg", man(90, 200, 1.6, C.teal) + K("arw", arw(90, 150, 90, 90, C.teal, 3)) + T(90, 70, "Your view", 14, C.teal) + man(300, 200, 1.6, C.coral) + T(300, 70, "Confident classmate", 13, C.coral) +
      F("M250 150 a30 30 0 0 1 0 -60 h10 v16 h-10 a14 14 0 0 0 0 28 h10 v16 Z", C.coral) + shieldI(170, 150, 2, C.green) + T(170, 250, "Posting first", 13, C.green));
    return s;
  }, play: (c, j) => {
    c.vis({ rd: j === 0, pf: j === 1, mg: j === 2 });
    for (let i = 0; i < 4; i++) c.mv("eb" + i, { sy: j === 0 ? 1 : 0.05, pv: [0, 200] }, { d: 0.8, dl: 0.3 + i * 0.15 });
    c.mv("lens", j === 0 ? { x: -30, y: 20 } : {}, { d: 1.4, dl: 0.6 });
    c.mv("arw", j === 2 ? {} : { r: 30 }, { d: 0.8, dl: 0.5, e: "elastic.out(1,0.4)" });
  } });

  // V3 (7-8) · adapted from https://motionarray.com/after-effects-templates/corporate-timeline-1939632/ — events revealed one by one on a strip
  vis.push({ r: [7, 8], art: () => {
    let s = H("dr", R(110, 40, 180, 210, C.white, 8, `stroke="${C.navy}" stroke-width="2.4"`) + T(200, 68, "First draft", 15, C.navy) +
      rep(6, (i) => P(`M128 ${96 + i * 24} H${270 - (i % 3) * 20}`, C.mist, 4)) + P("M150 120 L250 128", C.coral, 2.4) + P("M140 168 q20 -14 40 0", C.coral, 2.4) + T(258, 176, "edit", 13, C.coral) + okDot(286, 44, 14) +
      pill(200, 278, "Imperfect is fine", { st: C.green, sz: 13 }));
    const D7 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    s += H("wk", rep(7, (i) => R(14 + i * 54, 110, 48, 80, i === 3 ? C.gold : C.white, 8, `stroke="${C.navy}" stroke-width="1.8"`) + T(38 + i * 54, 140, D7[i], 13, C.navy)) +
      K("pin", O(200, 170, 12, C.coral) + P("M200 182 V198", C.coral, 3)) + T(200, 230, "Post by mid-week", 16, C.coral));
    return s;
  }, play: (c, j) => { c.vis({ dr: j === 0, wk: j === 1 }); c.mv("pin", j === 1 ? {} : { y: -60 }, { d: 0.9, dl: 0.4, e: "bounce.out" }); } });

  // V4 (9-11) · adapted from https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU — steps activated in sequence
  vis.push({ r: [9, 11], art: () => {
    let s = post(40, 24, 320, 252, C.green, "Your forum post");
    const RW = [["Sources of resistance", C.plum], ["What people lose", C.coral], ["Any design defect?", C.amber], ["Proposed changes", C.green], ["Cost of each", C.amber]];
    RW.forEach((r, i) => { s += H("rw" + i, O(66, 72 + i * 36, 9, r[1]) + T(84, 77 + i * 36, r[0], 14, C.ink, "start")); });
    s += H("cst", ptag(296, 214, "Cost") + ptag(296, 178, "Cost"));
    s += H("ct", book(250, 236, 100, 34, C.green) + T(304, 258, "Jeston Ch. 25", 13, C.white));
    return s;
  }, play: (c, j) => {
    for (let i = 0; i < 5; i++) c.op("rw" + i, (i < 3 && j >= 0) || (i >= 3 && j >= 1) ? (j === 0 && i < 3) || (j === 1 && i >= 3) ? 1 : 0.45 : 0, { dl: (i % 3) * 0.25 });
    c.op("cst", j >= 1 ? 1 : 0, { dl: 0.6 }); c.op("ct", j === 2 ? 1 : 0); c.mv("ct", j === 2 ? {} : { y: 30 }, { e: "back.out(1.6)" });
  } });

  // V5 (12-15) · adapted from https://observablehq.com/@d3/easing-animations — the same motion under contrasting easing
  vis.push({ r: [12, 15], art: () => {
    let s = H("rp", post(130, 30, 140, 60, C.green, "Your post") + T(200, 76, "Posted", 13, C.green) + post(20, 180, 150, 70, C.slate, "Peer A") + post(230, 180, 150, 70, C.slate, "Peer B") +
      D("a1", "M180 92 C180 140 100 140 96 176", C.green, 3) + D("a2", "M220 92 C220 140 300 140 304 176", C.coral, 3) + T(95, 236, "Extend", 14, C.green) + T(305, 236, "Disagree", 14, C.coral));
    s += H("fg", R(40, 190, 140, 30, C.slate, 4) + K("hm", R(90, 100, 60, 26, C.ink, 4) + R(116, 126, 8, 60, C.wood, 3)) + R(60, 160, 100, 30, C.coral, 4) + T(110, 250, "Challenged", 15, C.coral) +
      O(300, 120, 40, "#f6c9d6") + P("M300 160 Q296 200 304 240", C.slate, 1.5) + T(300, 128, "Praise", 14, C.plum) + T(300, 266, "Floats away", 14, C.plum) + pill(200, 40, "Challenge strengthens arguments", { st: C.navy, sz: 13 }));
    s += H("tn", O(110, 150, 70, C.white, `stroke="${C.navy}" stroke-width="3"`) + K("d1", P("M110 150 L110 94", C.green, 5)) + T(110, 250, "Respectful tone", 15, C.green) +
      O(290, 150, 70, C.white, `stroke="${C.navy}" stroke-width="3"`) + K("d2", P("M290 150 L290 94", C.blue, 5)) + T(290, 250, "Specific substance", 15, C.blue));
    s += H("gp", R(20, 50, 170, 150, C.white, 10, `stroke="${C.slate}" stroke-width="2"`) + T(105, 100, "Great post!", 18, C.slate) + T(105, 150, "Adds nothing", 14, C.coral) + noDot(170, 56, 12) +
      R(210, 50, 170, 150, C.white, 10, `stroke="${C.green}" stroke-width="2"`) + T(295, 110, "Stops here...", 14, C.green) + T(295, 150, "Goes further...", 14, C.green) + okDot(372, 56, 12) +
      pill(200, 250, "Reasoned reply", { bg: C.green, st: C.green, fg: C.white }));
    return s;
  }, play: (c, j) => {
    c.vis({ rp: j === 0, fg: j === 1, tn: j === 2, gp: j === 3 });
    c.dr("a1", j === 0 ? 1 : 0, { dl: 0.3 }); c.dr("a2", j === 0 ? 1 : 0, { dl: 0.7 });
    c.mv("hm", { r: j === 1 ? 30 : 0, pv: [120, 186] }, { d: 0.5, e: "back.in(3)" });
    c.mv("d1", { r: j === 2 ? 50 : -60, pv: [110, 150] }, { d: 1.2 }); c.mv("d2", { r: j === 2 ? 55 : -60, pv: [290, 150] }, { d: 1.2, dl: 0.3 });
  } });

  // V6 (16-17) · adapted from https://lottiefiles.com/free-animation/project-dashboard-PeJUc2p1iB — data and collaborators gathered into one view
  vis.push({ r: [16, 17], art: () => {
    let s = H("fs", rep(5, (i) => K("th" + i, post(20 + (i % 3) * 120, 40 + Math.floor(i / 3) * 70, 110, 50, C.slate, "Thread"))) + R(130, 200, 140, 80, C.white, 8, `stroke="${C.navy}" stroke-width="2.4"`) +
      T(200, 226, "Facilitator", 14, C.navy) + T(200, 246, "summary", 14, C.navy) + T(200, 268, "Group's thinking", 12.5, C.slate));
    s += H("tl", P("M30 150 H370", C.navy, 3) + rep(11, (i) => O(40 + i * 32, 150, i === 0 || i === 10 ? 10 : 5, i === 0 ? C.coral : i === 10 ? C.green : C.navy)) +
      T(40, 182, "Week 4", 14, C.coral) + T(360, 182, "Week 14", 14, C.green) + R(250, 200, 130, 50, C.mint, 10) + T(315, 222, "Assessment 4", 13, C.green) + T(315, 240, "Participation", 13, C.green) + pill(110, 90, "Formative", { st: C.navy }));
    return s;
  }, play: (c, j) => {
    c.vis({ fs: j === 0, tl: j === 1 });
    for (let i = 0; i < 5; i++) c.mv("th" + i, j === 0 ? { x: 200 - (75 + (i % 3) * 120), y: 170 - i * 10 - (65 + Math.floor(i / 3) * 70), s: 0.5 } : {}, { d: 1.2, dl: 0.4 + i * 0.15, e: "power2.in" });
  } });

  // V7 (18-20) · adapted from https://lottiefiles.com/free-animation/process-fmpDUgNx8K — connections drawn and joined into one line
  vis.push({ r: [18, 20], art: () => {
    let s = D("th", "M20 60 C120 40 280 40 380 60", C.slate, 3);
    for (let i = 0; i < 4; i++) s += K("bd" + i, O(70 + i * 87, 52, 16, [C.teal, C.plum, C.amber, C.green][i]) + T(70 + i * 87, 57, String(i + 1), 14, C.white));
    s += H("b1", kiosk(110, 220, 1.6, C.navy) + okDot(110, 116, 12) + man(200, 210, 1.6, C.teal) + qDot(222, 160, 11) + R(40, 240, 320, 24, C.teal, 12) + T(200, 257, "Change management, every phase", 13, C.white) +
      T(300, 140, "Sound design", 13, C.navy) + T(300, 160, "needs adoption", 13, C.navy));
    s += H("b2", rep(3, (i) => env(30 + i * 36, 120, 30, 22, C.coral)) + arw(140, 132, 180, 132, C.slate, 2.4) + R(184, 108, 80, 50, C.white, 8, `stroke="${C.blue}" stroke-width="2"`) + T(224, 138, "Data", 15, C.blue) +
      arw(268, 132, 300, 132, C.slate, 2.4) + R(304, 108, 80, 50, C.mint, 8) + T(344, 130, "Matched", 13, C.green) + T(344, 148, "response", 13, C.green) + pill(200, 230, "Usually rational", { st: C.plum }));
    return s;
  }, play: (c, j) => {
    c.dr("th", 1, { d: 1.2 });
    for (let i = 0; i < 4; i++) { c.op("bd" + i, j === 0 ? 1 : (i === j - 1 ? 1 : 0.3), { dl: j === 0 ? i * 0.2 : 0 }); c.mv("bd" + i, i === j - 1 ? { s: 1.3 } : {}, { e: "back.out(2)" }); }
    c.vis({ b1: j === 1, b2: j === 2 });
  } });

  // V8 (21-22) · adapted from https://observablehq.com/@d3/animated-quadtree and https://observablehq.com/@d3/learn-d3-animation — a point moving between regions, then a traced series
  vis.push({ r: [21, 22], art: () => {
    let s = rep(4, (i) => O(70 + i * 87, 40, 14, [C.teal, C.plum, C.amber, C.green][i], `opacity="${i === 2 || i === 3 ? 1 : 0.3}"`) + T(70 + i * 87, 45, String(i + 1), 13, C.white));
    s += H("g", grid4(40, 70, 270, 200, C.slate) + K("tk", O(110, 120, 12, C.amber)) + D("tr", "M110 120 C180 110 220 120 250 128", C.amber, 3, 'stroke-dasharray="5 5"') + O(352, 100, 16, C.coral) + P("M344 100 a8 8 0 1 1 8 8", C.white, 2.4) +
      T(352, 140, "Re-run", 13, C.coral) + T(352, 158, "each phase", 13, C.coral));
    s += H("a", P("M60 270 V80 H360", C.navy, 2) + D("ad", "M60 250 L100 210 L140 172 L180 150 L220 140 L260 136 L300 135 L340 135", C.green, 4) + T(340, 124, "Weekly", 13, C.green, "end") +
      pill(200, 290, "Measured, not felt", { st: C.green, sz: 13 }));
    return s;
  }, play: (c, j) => {
    c.vis({ g: j === 0, a: j === 1 });
    c.mv("tk", j === 0 ? { x: 140, y: 8 } : {}, { d: 1.6, dl: 0.4 }); c.dr("tr", j === 0 ? 1 : 0, { d: 1.6, dl: 0.4 });
    c.dr("ad", j === 1 ? 1 : 0, { d: 1.6 });
  } });

  // V9 (23-25) · adapted from https://motionarray.com/after-effects-templates/timeline/ — a marker travelling to the next milestone
  vis.push({ r: [23, 25], art: () => {
    let s = H("nx", P("M30 150 H370", C.navy, 4) + O(80, 150, 14, C.coral) + T(80, 190, "Week 4", 15, C.coral) + K("mk", O(80, 150, 9, C.white)) + O(320, 150, 18, C.green) + T(320, 194, "Week 5", 15, C.green) +
      R(220, 60, 170, 50, C.green, 10) + T(305, 82, "Organization", 15, C.white) + T(305, 100, "Strategy phase", 14, C.white));
    s += H("cps", O(110, 150, 70, C.white, `stroke="${C.navy}" stroke-width="3"`) + K("nd", F("M110 96 L120 150 L110 204 L100 150 Z", C.coral)) + T(110, 250, "Strategy", 15, C.navy) +
      rep(5, (i) => K("pr" + i, R(220, 60 + i * 40, 150, 30, i === 1 || i === 3 ? C.gold : "#e1e8ef", 6) + T(295, 80 + i * 40, i === 1 || i === 3 ? "Matters most" : "Process", 13, C.ink))));
    s += H("ty", desk(200, 220, 220) + man(150, 206, 1.3, C.teal) + man(250, 206, 1.3, C.teal) + rep(3, (i) => K("fp" + i, env(120 + i * 60, 90, 44, 30, C.green))) +
      T(200, 60, "Thank you", 22, C.navy) + T(200, 280, "Join the forum", 14, C.green));
    return s;
  }, play: (c, j) => {
    c.vis({ nx: j === 0, cps: j === 1, ty: j === 2 });
    c.mv("mk", j === 0 ? { x: 240 } : {}, { d: 1.6, e: "power2.inOut" });
    c.mv("nd", { r: j === 1 ? 70 : 0, pv: [110, 150] }, { d: 1.4, e: "elastic.out(1,0.4)" });
    for (let i = 0; i < 3; i++) c.mv("fp" + i, j === 2 ? {} : { y: -40 }, { d: 0.8, dl: i * 0.2, e: "bounce.out" });
  } });

  VS[id] = makeScene({ id, N, labels, vis, bg: "#f3f2f7",
    desc: "The forum case Twenty-Two Years of Knowing How: read the case and exhibit, post your own diagnosis first by mid-week, propose costed changes citing Jeston Chapter 25, reply to two peers and disagree with one, then the week's four ideas and the move to the Organization Strategy phase." });
  BG.push([id, "#f3f2f7"]);
}

addStyles(BG);
})();
// END FILE w04-claude-v2-part4.js
