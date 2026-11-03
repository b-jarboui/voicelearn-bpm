// OPER621 · Week 5 · Organization Strategy · animated teaching scenes, version 1 (claude)
// File: w05-claude-part1.js · Sections: W5O1a, W5O1b, W5O1c
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }.
// step(i, n): one plan entry per narration line of the section (n = number of
// lines maps 1:1; any other n is mapped proportionally). Absolute states, so
// repeated, skipped and backward steps render the same picture.
// Each section uses 8-10 shot families (distinct pictures); every family names
// its benchmark template in a "// template: <name> — <url>" comment.
// Standalone: every helper is defined below; CSS goes once into
// <style id="vl-sc-w05">, all rules scoped under .vls-w05-<secId>.
// GSAP is used when window.gsap exists, CSS transitions otherwise;
// prefers-reduced-motion renders end states without animation.
(() => {
"use strict";
const PART = "p1";
// ===== shared engine (identical copy in every Week 5 part; each part runs standalone) =====
window.VL_SCENES = window.VL_SCENES || {};
const REG = window.VL_SCENES;
const C = {
  ink: "#1b2a3a", navy: "#1f4e79", navy2: "#2d6a9f", teal: "#178f80", gold: "#d39418", coral: "#de5a3a",
  red: "#c0392b", green: "#2e8b57", plum: "#7a5aa6", slate: "#5d7389", muted: "#a3b3c2", line: "#cfd8e0",
  paper: "#fffdf7", white: "#ffffff", sky: "#e8f1f8", sand: "#f5eddd", mint: "#e2f3eb", rose: "#fbe4dd",
  lilac: "#eee8f6", cream: "#fff4dc", night: "#16304d", amber: "#a8741a", skin: "#f0c9a6", wood: "#b9814f"
};
// Objective colours used all week: service = teal, cost = gold, corporate growth = coral.
const OC = [C.teal, C.gold, C.coral];
const OBJN = ["Service", "Cost", "Growth"];
const NC = { N: C.navy, R: C.red, G: C.green, O: C.coral, P: C.plum, T: C.teal, A: C.amber, S: C.slate };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const num = (v, f) => { const x = Number(v); return Number.isFinite(x) ? x : f; };
const RM = () => { try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; } };
const GS = () => (!RM() && window.gsap && typeof window.gsap.to === "function" && typeof window.gsap.set === "function") ? window.gsap : null;
const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");
const r1 = (v) => Math.round(v * 10) / 10;
const has = (arr, v) => Array.isArray(arr) && arr.indexOf(v) > -1;
const tw = (s, sz) => Math.round(String(s).length * sz * 0.58 + sz * 1.5);
function wrap(s, max) {
  const words = String(s || "").split(/\s+/).filter(Boolean), out = [];
  let cur = "";
  words.forEach((w) => { if (!cur) cur = w; else if ((cur + " " + w).length <= max) cur += " " + w; else { out.push(cur); cur = w; } });
  if (cur) out.push(cur);
  return out;
}

// ---- SVG string builders ----
const R = (x, y, w, h, f, rx = 0, ex = "") => `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${rx}" fill="${f}" ${ex}/>`;
const O = (cx, cy, r, f, ex = "") => `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}" fill="${f}" ${ex}/>`;
const E = (cx, cy, rx, ry, f, ex = "") => `<ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="${f}" ${ex}/>`;
const P = (d, s, w = 2, ex = "") => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const F = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
const T = (x, y, s, sz = 14, f = C.ink, ex = "", a = "middle") => `<text x="${r1(x)}" y="${r1(y)}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const G = (tr, body, ex = "") => `<g transform="${tr}" ${ex}>${body}</g>`;
// Text that shrinks (never below 9) so it fits the given width.
const fitSz = (s, max, wid) => Math.max(9, Math.min(max, Math.floor(10 * wid / Math.max(1, String(s).length * 0.58)) / 10));
const TF = (x, y, s, max, wid, f = C.ink, a = "middle") => T(x, y, s, fitSz(s, max, wid), f, "", a);
const chip = (x, y, s, o = {}) => {
  const sz = o.sz || 13, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.95);
  const cx = o.free ? x : clamp(x, w / 2 + 3, 397 - w / 2);
  return R(cx - w / 2, y - h / 2, w, h, o.bg || C.white, o.rx == null ? h / 2 : o.rx,
    `stroke="${o.st || C.navy}" stroke-width="${o.sw || 2}"${o.dash ? ' stroke-dasharray="5 4"' : ""}`) +
    T(cx, y + sz * 0.36, s, sz, o.fg || o.st || C.navy);
};
const arrowHead = (x, y, ang, col, s = 1) => {
  const a = ang * Math.PI / 180, l = 9 * s, w = 5.5 * s;
  const p1 = [x - Math.cos(a) * l + Math.sin(a) * w, y - Math.sin(a) * l - Math.cos(a) * w];
  const p2 = [x - Math.cos(a) * l - Math.sin(a) * w, y - Math.sin(a) * l + Math.cos(a) * w];
  return F(`M${r1(x)} ${r1(y)} L${r1(p1[0])} ${r1(p1[1])} L${r1(p2[0])} ${r1(p2[1])} Z`, col);
};

// ---- icon library (each icon fits a 40 x 40 box centred on 0,0) ----
function ICO(name, x, y, s = 1, col = C.navy) {
  const g = (b) => `<g transform="translate(${r1(x)} ${r1(y)}) scale(${s})">${b}</g>`;
  const W = C.white;
  switch (name) {
    case "star": return g(F("M0 -18 L5.3 -6.5 L17.8 -5.6 L8.3 2.6 L11.2 14.8 L0 8.3 L-11.2 14.8 L-8.3 2.6 L-17.8 -5.6 L-5.3 -6.5 Z", col));
    case "coin": return g(O(0, 0, 16, C.gold, `stroke="${C.amber}" stroke-width="2.5"`) + O(0, 0, 9.5, "none", `stroke="#fff1c7" stroke-width="2.2"`));
    case "costdown": return g(O(-5, -2, 13, C.gold, `stroke="${C.amber}" stroke-width="2.2"`) + O(-5, -2, 7, "none", `stroke="#fff1c7" stroke-width="2"`) + P("M12 -6 V14 M6 8 L12 15 L18 8", C.red, 3.5));
    case "growth": return g(R(-16, 4, 8, 12, col, 1.5) + R(-5, -3, 8, 19, col, 1.5) + R(6, -10, 8, 26, col, 1.5) + P("M-17 -6 L-4 -14 L4 -9 L16 -19", C.green, 3) + arrowHead(17, -19.5, -35, C.green));
    case "guest": return g(O(-4, -13, 6.5, col) + F("M-15 16 Q-15 -3 -4 -3 Q7 -3 7 16 Z", col) + R(8, 0, 11, 15, C.wood, 2) + P("M11 0 V-4 H16 V0", C.ink, 1.6));
    case "person": return g(O(0, -11, 7.5, col) + F("M-13 17 Q-13 -1 0 -1 Q13 -1 13 17 Z", col));
    case "sponsor": return g(O(0, -11, 7.5, col) + F("M-13 17 Q-13 -1 0 -1 Q13 -1 13 17 Z", col) + F("M0 3 L2.4 8 L7.6 8.4 L3.6 11.6 L5 16.6 L0 13.8 L-5 16.6 L-3.6 11.6 L-7.6 8.4 L-2.4 8 Z", C.gold));
    case "people": return g(O(-11, -7, 5.5, col, `opacity=".7"`) + F("M-21 14 Q-21 0 -11 0 Q-1 0 -1 14 Z", col, `opacity=".7"`) + O(11, -7, 5.5, col, `opacity=".7"`) + F("M1 14 Q1 0 11 0 Q21 0 21 14 Z", col, `opacity=".7"`) + O(0, -10, 6.5, col) + F("M-11 17 Q-11 0 0 0 Q11 0 11 17 Z", col));
    case "clock": return g(O(0, 0, 16, W, `stroke="${col}" stroke-width="3"`) + P("M0 -9 V0 L7 5", col, 3));
    case "bed": return g(R(-17, -2, 34, 10, col, 2) + R(-17, -12, 5, 24, col, 1.5) + R(-10, -9, 10, 7, "#dfe9f6", 2) + R(-17, 8, 4, 6, col) + R(13, 8, 4, 6, col));
    case "doc": return g(F("M-12 -17 H6 L13 -10 V17 H-12 Z", W, `stroke="${col}" stroke-width="2.5"`) + P("M-6 -6 H7 M-6 1 H7 M-6 8 H3", col, 2.2));
    case "gear": { let d = ""; for (let i = 0; i < 8; i++) { const a0 = i * Math.PI / 4, a1 = a0 + 0.3, a2 = a0 + 0.5, a3 = a0 + 0.78; const q = (a, r) => r1(Math.cos(a) * r) + " " + r1(Math.sin(a) * r); d += (i ? "L" : "M") + q(a0, 12) + " L" + q(a1, 17) + " L" + q(a2, 17) + " L" + q(a3, 12) + " "; } return g(F(d + "Z", col) + O(0, 0, 5, W)); }
    case "compass": return g(O(0, 0, 17, W, `stroke="${col}" stroke-width="3"`) + F("M0 -13 L4 0 L-4 0 Z", C.red) + F("M0 13 L4 0 L-4 0 Z", col) + O(0, 0, 2.5, col));
    case "key": return g(O(-9, 0, 8, "none", `stroke="${col}" stroke-width="4"`) + P("M-1 0 H17 M11 0 V6 M16 0 V5", col, 4));
    case "scale": return g(P("M0 -15 V14 M-10 15 H10 M-16 -9 H16", col, 2.8) + P("M-16 -9 L-21 3 H-11 Z M16 -9 L11 3 H21 Z", col, 2) + O(0, -16, 2.6, col));
    case "shield": return g(F("M0 -17 L14 -11 V0 Q14 12 0 18 Q-14 12 -14 0 V-11 Z", col) + P("M-6 0 L-1 5 L7 -5", W, 3));
    case "gavel": return g(G("rotate(-35)", R(-12, -13, 22, 9, col, 2) + R(-3, -4, 5, 20, col, 2)) + R(-14, 12, 22, 5, col, 2));
    case "flag": return g(P("M-10 17 V-17", col, 3) + F("M-9 -16 H13 L8 -9 L13 -2 H-9 Z", C.coral));
    case "chat": return g(R(-17, -15, 24, 17, col, 5) + F("M-12 2 L-14 9 L-6 2 Z", col) + R(-2, -4, 20, 15, C.teal, 5) + F("M13 11 L15 17 L8 11 Z", C.teal));
    case "target": return g(O(0, 0, 16, W, `stroke="${C.red}" stroke-width="3"`) + O(0, 0, 10, W, `stroke="${C.red}" stroke-width="3"`) + O(0, 0, 4, C.red) + P("M3 -3 L17 -17", col, 2.5));
    case "mag": return g(O(-3, -3, 11, "rgba(255,255,255,.6)", `stroke="${col}" stroke-width="3.5"`) + P("M5 5 L15 15", col, 5));
    case "hotel": return g(R(-15, -16, 30, 33, col, 2) + rep(3, (r) => rep(3, (c2) => R(-10 + c2 * 8, -11 + r * 8, 5, 5, C.gold, 1))) + R(-4, 9, 8, 8, W, 1));
    case "invoice": return g(F("M-12 -17 H12 V17 L8 13 L4 17 L0 13 L-4 17 L-8 13 L-12 17 Z", W, `stroke="${col}" stroke-width="2.5"`) + P("M-6 -8 H6 M-6 -1 H6", col, 2.2) + T(0, 11, "AED", 7, col));
    case "box": return g(F("M-16 -6 L0 -14 L16 -6 L16 12 L0 19 L-16 12 Z", "#d9a066", `stroke="${C.amber}" stroke-width="2"`) + P("M-16 -6 L0 2 L16 -6 M0 2 V19", C.amber, 2));
    case "spa": return g(F("M0 14 Q-16 4 -12 -12 Q-1 -6 0 14 Z", C.teal) + F("M0 14 Q16 4 12 -12 Q1 -6 0 14 Z", "#55b7a8") + F("M0 14 Q-5 -4 0 -17 Q5 -4 0 14 Z", C.green));
    case "kiosk": return g(R(-12, -18, 24, 22, col, 3) + R(-8, -14, 16, 13, "#bfe3ff", 2) + R(-3, 4, 6, 10, col) + R(-10, 14, 20, 4, col, 2));
    case "lock": return g(P("M-8 -4 V-10 A8 8 0 0 1 8 -10 V-4", col, 3.5) + R(-12, -4, 24, 20, col, 3) + O(0, 5, 3, W));
    case "chart": return g(P("M-17 -16 V15 H17", col, 2.5) + P("M-12 8 L-4 -1 L3 4 L14 -11", C.teal, 3));
    case "crown": return g(F("M-16 10 L-16 -8 L-8 0 L0 -12 L8 0 L16 -8 L16 10 Z", C.gold, `stroke="${C.amber}" stroke-width="2"`) + R(-16, 10, 32, 5, C.amber, 1));
    case "calendar": return g(R(-15, -12, 30, 28, W, 3, `stroke="${col}" stroke-width="2.5"`) + R(-15, -12, 30, 8, col, 3) + P("M-8 -16 V-9 M8 -16 V-9", col, 3) + rep(3, (i) => R(-9 + i * 7, 2, 4, 4, col)));
    case "link": return g(R(-17, -6, 18, 12, "none", 6, `stroke="${col}" stroke-width="3.5"`) + R(-1, -6, 18, 12, "none", 6, `stroke="${C.teal}" stroke-width="3.5"`));
    case "ruler": return g(G("rotate(-30)", R(-18, -6, 36, 12, C.gold, 2) + rep(6, (i) => P(`M${-13 + i * 5} -6 V${i % 2 ? -1 : 1}`, C.ink, 1.4))));
    case "fence": return g(rep(4, (i) => F(`M${-15 + i * 9} 15 V-9 L${-12 + i * 9} -15 L${-9 + i * 9} -9 V15 Z`, col)) + R(-18, -4, 36, 3, col) + R(-18, 7, 36, 3, col));
    case "hourglass": return g(P("M-10 -16 H10 M-10 16 H10", col, 3) + F("M-8 -14 H8 L1 0 L8 14 H-8 L-1 0 Z", "none", `stroke="${col}" stroke-width="2.5"`) + F("M-5 11 H5 L0 6 Z", C.gold));
    case "map": return g(F("M-17 -12 L-6 -16 L6 -12 L17 -16 V12 L6 16 L-6 12 L-17 16 Z", W, `stroke="${col}" stroke-width="2.4"`) + P("M-6 -16 V12 M6 -12 V16", col, 1.6) + P("M-12 6 Q-4 -6 4 2 T14 -8", C.red, 2.4, 'stroke-dasharray="3 3"'));
    case "check": return g(O(0, 0, 15, C.green) + P("M-7 0 L-2 6 L8 -6", W, 3.5));
    case "cross": return g(O(0, 0, 15, C.red) + P("M-6 -6 L6 6 M6 -6 L-6 6", W, 3.5));
    case "warn": return g(F("M0 -16 L17 14 H-17 Z", C.gold, `stroke="${C.amber}" stroke-width="2"`) + R(-1.8, -6, 3.6, 11, C.ink, 1.5) + O(0, 9, 2.2, C.ink));
    case "q": return g(O(0, 0, 15, C.coral) + T(0, 6.5, "?", 19, W));
    case "stamp": return g(R(-16, 6, 32, 9, col, 2) + R(-5, -6, 10, 13, col, 2) + O(0, -11, 7, col));
    case "eye": return g(F("M-17 0 Q0 -14 17 0 Q0 14 -17 0 Z", W, `stroke="${col}" stroke-width="2.5"`) + O(0, 0, 5.5, col));
    case "handshake": return g(P("M-18 -2 L-8 -8 L2 -2 M18 -2 L8 -8 L-4 2 Q-1 6 3 3 L8 7 Q11 9 13 6", col, 3) + P("M-18 -2 L-8 8 Q-5 11 -2 8", col, 3));
    case "bell": return g(F("M-12 8 Q-12 -12 0 -12 Q12 -12 12 8 Z", C.gold, `stroke="${C.amber}" stroke-width="2"`) + R(-16, 8, 32, 5, col, 2) + O(0, -14, 3, col));
    case "wallet": return g(R(-17, -10, 34, 24, col, 4) + R(4, -3, 15, 10, C.gold, 3) + O(10, 2, 2.2, col));
    default: return g(O(0, 0, 12, col));
  }
}
const person = (x, y, s = 1, col = C.navy) => ICO("person", x, y, s, col);
const guest = (x, y, s = 1, col = C.navy2) => ICO("guest", x, y, s, col);
const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${r1(x - 7 * s)} ${r1(y)} l${r1(5 * s)} ${r1(5 * s)} l${r1(10 * s)} ${r1(-11 * s)}`, col, w);
const xmark = (x, y, s = 1, col = C.red, w = 3) => P(`M${r1(x - 6 * s)} ${r1(y - 6 * s)} l${r1(12 * s)} ${r1(12 * s)} M${r1(x + 6 * s)} ${r1(y - 6 * s)} l${r1(-12 * s)} ${r1(12 * s)}`, col, w);
const arcD = (cx, cy, r, a0, a1) => {
  const p0 = [cx + Math.cos(a0) * r, cy + Math.sin(a0) * r], p1 = [cx + Math.cos(a1) * r, cy + Math.sin(a1) * r];
  return `M${r1(p0[0])} ${r1(p0[1])} A${r} ${r} 0 ${Math.abs(a1 - a0) > Math.PI ? 1 : 0} 1 ${r1(p1[0])} ${r1(p1[1])}`;
};

// ---- prefixed keyed builders handed to every shot family ----
function pfx(p) {
  return {
    p,
    K: (k, b, ex = "") => `<g data-k="${p}${k}" ${ex}>${b}</g>`,
    H: (k, b, ex = "") => `<g data-k="${p}${k}" style="opacity:0" ${ex}>${b}</g>`,
    D: (k, d, s, w = 3, ex = "") => `<path data-k="${p}${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100" ${ex}/>`,
    TK: (k, x, y, s, sz = 14, f = C.ink, a = "middle", ex = "") => `<text data-k="${p}${k}" x="${r1(x)}" y="${r1(y)}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`,
    // An auto-sized label chip whose text, colour and width are set by c.note().
    N: (k, x, y, sz = 13) => `<g data-k="${p}${k}" data-cx="${x}" data-sz="${sz}" style="opacity:0">` +
      R(x - 40, y - sz * 0.98, 80, sz * 1.95, C.white, sz, `stroke="${C.navy}" stroke-width="2"`) +
      `<text x="${x}" y="${r1(y + sz * 0.36)}" font-size="${sz}" fill="${C.navy}" text-anchor="middle"></text></g>`
  };
}

// ---- per-part stylesheet, appended once into the shared <style id="vl-sc-w05"> ----
function sceneCSS(id, bg) {
  const s = ".vls-w05-" + id;
  return `
${s}{position:relative;display:flex;flex-direction:column;width:100%;height:100%;min-height:200px;overflow:hidden;box-sizing:border-box;border-radius:14px;background:${bg};color:${C.ink};isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w05-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w05-fig>svg{position:absolute;inset:0;display:block;width:100%;height:100%;max-width:none;max-height:none;overflow:hidden}
${s} svg text{font-family:"Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif;font-weight:700;letter-spacing:.1px;pointer-events:none}
${s} [data-k]{transform-box:fill-box;transform-origin:50% 50%;transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.8s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}
${s}.w05-snap [data-k]{transition:none!important}
${s} .w05-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:36px;padding:6px 12px 8px;font:700 14px/1.25 "Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif;color:${C.navy};background:rgba(255,255,255,.72);border-top:1px solid rgba(31,78,121,.14)}
${s} .w05-num{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w05-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
${s} .w05-lab.w05-in{animation:vlsw05Cap .5s cubic-bezier(.22,.8,.24,1)}
${s} .w05-bar{flex:0 0 56px;height:4px;border-radius:4px;background:rgba(31,78,121,.15);overflow:hidden}
${s} .w05-bar i{display:block;height:100%;width:0;background:${C.coral};transition:width .6s ease}
${s} .a-flow{stroke-dasharray:6 7;animation:vlsw05Flow 1.2s linear infinite}
${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw05Spin 9s linear infinite}
${s} .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw05Bob 2.4s ease-in-out infinite}
${s} .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw05Pulse 1.8s ease-in-out infinite}
${s} .a-shake{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw05Shake .8s ease-in-out infinite}
${s} .a-blink{animation:vlsw05Blink 1.3s ease-in-out infinite}
@media (max-width:420px){${s} .w05-cap{font-size:13px;min-height:32px;padding:5px 10px 7px}${s} .w05-bar{flex-basis:40px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
}
const KEYFRAMES = `
@keyframes vlsw05Cap{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes vlsw05Flow{to{stroke-dashoffset:-26}}
@keyframes vlsw05Spin{to{transform:rotate(360deg)}}
@keyframes vlsw05Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes vlsw05Pulse{0%,100%{opacity:.45;transform:scale(.94)}50%{opacity:1;transform:scale(1.06)}}
@keyframes vlsw05Shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}
@keyframes vlsw05Blink{0%,100%{opacity:1}50%{opacity:.35}}
`;
const SCENE_BG = [];
function addStyles() {
  if (typeof document === "undefined") return;
  let st = document.getElementById("vl-sc-w05");
  if (!st) { st = document.createElement("style"); st.id = "vl-sc-w05"; (document.head || document.documentElement).appendChild(st); }
  const flag = "data-w05claude-" + PART;
  if (st.getAttribute(flag)) return;
  st.setAttribute(flag, "1");
  st.appendChild(document.createTextNode(KEYFRAMES + SCENE_BG.map((a) => sceneCSS(a[0], a[1])).join("\n")));
}

// Re-labels a family instance with the benchmark template it is modelled on in this section.
const BENCH = (fam, bench) => { fam.bench = bench; return fam; };

// ---- scene factory: one plan entry per narration line -> [family, state, caption] ----
function makeScene(cfg) {
  const { id, plan, fams } = cfg;
  const N = plan.length, names = Object.keys(fams);
  let root = null, useG = false;
  const nodes = (k) => (root ? Array.prototype.slice.call(root.querySelectorAll('[data-k="' + k + '"]')) : []);
  const mapK = (i, n) => {
    const nn = Math.max(1, Math.floor(num(n, N)));
    const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
    return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
  };
  const dur = (t, d) => (t.d == null ? d : t.d);
  function timing(el, t, d) { el.style.transitionDuration = dur(t, d) + "s"; el.style.transitionDelay = (t.dl || 0) + "s"; }
  function tf(el, st, t, snap) {
    const x = st.x || 0, y = st.y || 0, r = st.r || 0;
    const sx = st.sx != null ? st.sx : (st.s != null ? st.s : 1), sy = st.sy != null ? st.sy : (st.s != null ? st.s : 1);
    const g = useG ? GS() : null;
    if (g) {
      const v = { x, y, rotation: r, scaleX: sx, scaleY: sy };
      if (st.pv) v.svgOrigin = st.pv[0] + " " + st.pv[1]; else v.transformOrigin = "50% 50%";
      if (snap) g.set(el, v); else g.to(el, Object.assign(v, { duration: dur(t, 0.8), delay: t.dl || 0, ease: t.e || "power3.out", overwrite: "auto" }));
      return;
    }
    if (st.pv) { el.style.transformBox = "view-box"; el.style.transformOrigin = st.pv[0] + "px " + st.pv[1] + "px"; }
    timing(el, t, 0.8);
    el.style.transform = "translate(" + x + "px," + y + "px) rotate(" + r + "deg) scale(" + sx + "," + sy + ")";
  }
  function op(el, o, t, snap) {
    const g = useG ? GS() : null;
    if (g) { if (snap) g.set(el, { opacity: o }); else g.to(el, { opacity: o, duration: dur(t, 0.55), delay: t.dl || 0, ease: "power1.out", overwrite: false }); return; }
    timing(el, t, 0.55); el.style.opacity = String(o);
  }
  function dash(el, f, t, snap) {
    const v = 100 * (1 - clamp(f, 0, 1)), g = useG ? GS() : null;
    if (g) { if (snap) g.set(el, { strokeDashoffset: v }); else g.to(el, { strokeDashoffset: v, duration: dur(t, 1), delay: t.dl || 0, ease: "power2.inOut" }); return; }
    timing(el, t, 1); el.style.strokeDashoffset = String(v);
  }
  function paint(el, prop, col, t, snap) {
    const g = useG ? GS() : null;
    if (g) { const v = {}; v[prop] = col; if (snap) g.set(el, v); else g.to(el, Object.assign(v, { duration: dur(t, 0.5), delay: t.dl || 0 })); return; }
    timing(el, t, 0.5); el.style[prop] = col;
  }
  function ctx(snap, p) {
    const K = (k) => nodes(p + k);
    const c = {
      snap,
      op: (k, o, t = {}) => K(k).forEach((el) => op(el, typeof o === "number" ? clamp(o, 0, 1) : (o ? 1 : 0), t, snap)),
      mv: (k, st, t = {}) => K(k).forEach((el) => tf(el, st || {}, t, snap)),
      dr: (k, f, t = {}) => K(k).forEach((el) => dash(el, f, t, snap)),
      fl: (k, col, t = {}) => K(k).forEach((el) => paint(el, "fill", col, t, snap)),
      sk: (k, col, t = {}) => K(k).forEach((el) => paint(el, "stroke", col, t, snap)),
      sw: (k, w) => K(k).forEach((el) => { el.style.strokeWidth = String(w); }),
      tx: (k, s) => K(k).forEach((el) => { const v = s == null ? "" : String(s); if (el.textContent !== v) el.textContent = v; }),
      at: (k, a, v) => K(k).forEach((el) => el.setAttribute(a, String(v))),
      cl: (k, cls, on) => K(k).forEach((el) => el.classList.toggle(cls, !!on)),
      vis: (map, t = {}) => Object.keys(map).forEach((k) => c.op(k, map[k], t)),
      note: (k, n, t = {}) => K(k).forEach((g) => {
        if (!n) { op(g, 0, t, snap); return; }
        const s = typeof n === "string" ? n : n.t, col = NC[(typeof n === "string" ? "N" : n.c) || "N"] || C.navy;
        const filled = typeof n === "object" && n.f;
        const sz = num(g.getAttribute("data-sz"), 13), cx0 = num(g.getAttribute("data-cx"), 200);
        const w = tw(s, sz), cx = clamp(cx0, w / 2 + 3, 397 - w / 2);
        const r = g.querySelector("rect"), tx = g.querySelector("text");
        if (r) { r.setAttribute("x", String(r1(cx - w / 2))); r.setAttribute("width", String(w)); r.setAttribute("stroke", col); r.setAttribute("fill", filled ? col : C.white); }
        if (tx) { tx.setAttribute("x", String(r1(cx))); tx.setAttribute("fill", filled ? C.white : col); if (tx.textContent !== s) tx.textContent = s; }
        op(g, 1, t, snap);
      })
    };
    return c;
  }
  function caption(k, snap) {
    const lab = root.querySelector(".w05-lab"), nn = root.querySelector(".w05-num"), bar = root.querySelector(".w05-bar i");
    const txt = plan[k][2] || "";
    if (lab && lab.textContent !== txt) {
      lab.textContent = txt;
      if (!snap && !RM()) { lab.classList.remove("w05-in"); void lab.offsetWidth; lab.classList.add("w05-in"); }
    }
    if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
    if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
  }
  function render(k, snap) {
    if (!root) return;
    if (snap) root.classList.add("w05-snap");
    try {
      const [act, st] = plan[k];
      const top = ctx(snap, "");
      names.forEach((nm) => {
        const on = nm === act;
        top.op("SH_" + nm, on ? 1 : 0, { d: on ? 0.55 : 0.3, dl: on ? 0.15 : 0 });
        top.mv("SH_" + nm, on ? {} : { y: 10, s: 0.98 }, { d: 0.6 });
      });
      const fam = fams[act];
      if (fam) { fam.render(ctx(snap, act + "_"), st || {}, k); root.setAttribute("data-template", fam.bench); }
      root.setAttribute("data-shot", act);
    } catch (e) { if (window.console) console.warn("[VL W05 " + id + "]", e); }
    caption(k, snap);
    if (snap) { void root.offsetWidth; root.classList.remove("w05-snap"); }
    root.setAttribute("data-moment", String(k));
  }
  function kill() {
    const g = GS();
    if (root && g && typeof g.killTweensOf === "function") { try { g.killTweensOf(root.querySelectorAll("[data-k]")); } catch (e) { /* ignore */ } }
  }
  function draw() {
    return R(-400, -300, 1200, 900, cfg.bg) + names.map((nm) => `<g data-k="SH_${nm}" style="opacity:0">${fams[nm].draw(pfx(nm + "_"))}</g>`).join("");
  }
  SCENE_BG.push([id, cfg.bg]);
  return {
    build(el) {
      if (!el || el.nodeType !== 1) return;
      kill();
      addStyles();
      useG = !!GS();
      const r = document.createElement("div");
      r.className = "vls-w05-" + id + " vls-w05-scene";
      r.setAttribute("data-vls-scene", id);
      r.innerHTML = '<div class="w05-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
        esc(cfg.desc) + '">' + draw() + '</svg></div><div class="w05-cap" aria-hidden="true"><span class="w05-num"></span><span class="w05-lab"></span><span class="w05-bar"><i></i></span></div>';
      if (typeof el.replaceChildren === "function") el.replaceChildren(r); else { el.innerHTML = ""; el.appendChild(r); }
      root = r;
      render(0, true);
    },
    step(i, n) { if (!root) return; render(mapK(i, n), false); },
    reset() { if (!root) return; kill(); render(0, true); }
  };
}

// =====================================================================
// SHOT FAMILY LIBRARY. Each family is one kind of picture; a section
// instantiates 8-10 of them with its own content, and every narration line
// sets one family's state. Each family names its benchmark template.
// =====================================================================

// template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
// Title card: spinning orbit, icon badge, two-line headline, kicker and subtitle chips.
function F_TITLE(cfg) {
  const col = cfg.col || C.navy;
  return {
    bench: "Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/",
    draw(f) {
      let s = O(200, 112, 92, "none", `stroke="${C.line}" stroke-width="1.5" stroke-dasharray="2 7"`);
      s += f.K("ring", `<g class="a-spin">${O(200, 112, 74, "none", `stroke="${col}" stroke-width="3" stroke-dasharray="14 10"`)}</g>`);
      s += f.H("orb", O(126, 112, 10, OC[0], `stroke="#fff" stroke-width="2.5"`) + O(237, 48, 10, OC[1], `stroke="#fff" stroke-width="2.5"`) + O(237, 176, 10, OC[2], `stroke="#fff" stroke-width="2.5"`));
      s += f.K("badge", O(200, 112, 54, C.white, `stroke="${col}" stroke-width="4"`) + ICO(cfg.icon || "compass", 200, 112, 1.9, col));
      s += f.N("k", 200, 22, 13);
      s += f.TK("t1", 200, 212, "", 24, C.ink);
      s += f.TK("t2", 200, 240, "", 24, col);
      s += f.N("sub", 200, 274, 14);
      return s;
    },
    render(c, s) {
      c.note("k", s.k ? { t: s.k, c: "N", f: 1 } : null);
      c.tx("t1", s.t1 || ""); c.tx("t2", s.t2 || "");
      c.mv("t1", { y: s.t1 ? 0 : 8 }); c.op("t1", s.t1 ? 1 : 0);
      c.mv("t2", { y: s.t2 ? 0 : 8 }, { dl: 0.1 }); c.op("t2", s.t2 ? 1 : 0, { dl: 0.1 });
      c.note("sub", s.sub ? { t: s.sub, c: s.sc || "T" } : null, { dl: 0.3 });
      c.op("orb", s.orb ? 1 : 0, { dl: 0.2 });
      c.mv("badge", { s: s.pop ? 1.1 : 1 });
    }
  };
}

// template: Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD
// The narrator's question in a speech bubble, the options on the table, and a team thinking.
function F_ASK(cfg = {}) {
  const col = cfg.col || C.coral;
  return {
    bench: "Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD",
    draw(f) {
      let s = R(24, 16, 352, 140, C.white, 18, `stroke="${col}" stroke-width="3"`);
      s += F("M150 154 L134 182 L182 154 Z", C.white, `stroke="${col}" stroke-width="3" stroke-linejoin="round"`) + R(148, 150, 38, 6, C.white);
      s += `<g class="a-pulse">${O(52, 46, 19, col)}${T(52, 54, "?", 24, C.white)}</g>`;
      for (let i = 0; i < 4; i++) s += f.TK("q" + i, 218, 60 + i * 26, "", 17, C.ink);
      [[110, 200], [290, 200], [110, 232], [290, 232]].forEach((p, i) => { s += f.N("o" + i, p[0], p[1], 13); });
      [80, 200, 320].forEach((x, i) => {
        s += f.K("p" + i, person(x, 274, 1.05, [C.teal, C.navy, C.coral][i]));
        s += f.H("th" + i, O(x + 14, 246, 2.6, C.slate) + O(x + 20, 239, 3.4, C.slate) + O(x + 28, 230, 4.4, C.slate));
      });
      return s;
    },
    render(c, s) {
      let lines = wrap(s.q, 28), sz = 17, lh = 26;
      if (lines.length > 3) { lines = wrap(s.q, 34); sz = 15; lh = 23; }
      if (lines.length > 4) { lines = wrap(s.q, 40); sz = 13; lh = 20; }
      const L = Math.min(4, lines.length), y0 = 86 - (L - 1) * lh / 2 + sz * 0.35;
      for (let i = 0; i < 4; i++) {
        c.tx("q" + i, lines[i] || ""); c.at("q" + i, "font-size", sz); c.at("q" + i, "y", r1(y0 + i * lh));
        c.op("q" + i, i < L ? 1 : 0, { dl: 0.08 * i });
      }
      const o = s.o || [], oc = s.oc || [];
      for (let i = 0; i < 4; i++) c.note("o" + i, o[i] ? { t: o[i], c: oc[i] || "N" } : null, { dl: 0.25 + i * 0.12 });
      for (let i = 0; i < 3; i++) {
        c.mv("p" + i, { y: s.who === i ? -5 : 0, s: s.who === i ? 1.12 : 1 });
        c.op("th" + i, !(s.o && s.o.length) && (s.who == null || s.who === i) ? 1 : 0, { dl: 0.2 * i });
      }
    }
  };
}

// template: Waiting Queue — https://lottiefiles.com/free-animation/waiting-queue-xoNutPl764
// Qasr's reception: queue length, staff on duty, waiting clock, guest rating, alerts and cost tag.
function F_DESK(cfg = {}) {
  return {
    bench: "Waiting Queue — https://lottiefiles.com/free-animation/waiting-queue-xoNutPl764",
    draw(f) {
      let s = R(0, 0, 400, 246, "#f7efe2") + R(0, 246, 400, 54, "#e6d4ba") + P("M0 246 H400", "#cdb593", 2);
      s += R(282, 118, 98, 26, C.navy, 6) + T(331, 136, cfg.sign || "Qasr Marina", 13, C.white);
      s += f.K("clock", O(44, 50, 25, C.white, `stroke="${C.navy}" stroke-width="3.5"`) + rep(12, (i) => { const a = i * Math.PI / 6; return P(`M${r1(44 + Math.cos(a) * 19)} ${r1(50 + Math.sin(a) * 19)} L${r1(44 + Math.cos(a) * 22)} ${r1(50 + Math.sin(a) * 22)}`, C.navy, 1.6); }));
      s += f.K("hand", P("M44 50 L44 32", C.red, 3.5), `data-pv="44 50"`) + O(44, 50, 3.5, C.navy);
      s += f.TK("wt", 78, 58, "", 19, C.red, "start");
      s += f.K("stars", T(220, 66, "Guest rating", 12, C.slate) + rep(5, (i) => ICO("star", 172 + i * 24, 38, 0.58, "#d4d9de")));
      for (let i = 0; i < 5; i++) s += f.H("sg" + i, ICO("star", 172 + i * 24, 38, 0.58, C.gold));
      s += f.N("cost", 338, 38, 13);
      for (let i = 0; i < 3; i++) {
        s += f.K("st" + i, person(300 + i * 30, 168, 0.9, C.teal) + R(292 + i * 30, 176, 16, 5, C.white, 2));
      }
      s += R(276, 178, 112, 50, C.wood, 6) + R(276, 178, 112, 8, "#9a6a3f", 4) + T(332, 212, "Reception", 13, C.white);
      s += f.K("gq", rep(6, (i) => f.K("g" + i, guest(240 - i * 36, 226, 1.05, i ? C.navy2 : C.navy))), `class="a-bob"`);
      s += f.H("sad", O(240, 186, 11, C.white, `stroke="${C.red}" stroke-width="2"`) + O(236, 184, 1.6, C.ink) + O(244, 184, 1.6, C.ink) + P("M235 192 Q240 187 245 192", C.ink, 1.8));
      s += f.H("happy", O(240, 186, 11, C.white, `stroke="${C.green}" stroke-width="2"`) + O(236, 184, 1.6, C.ink) + O(244, 184, 1.6, C.ink) + P("M235 189 Q240 194 245 189", C.ink, 1.8));
      s += f.H("exp", R(24, 254, 250, 16, C.gold, 8, `opacity=".55"`) + guest(196, 262, 0.75, C.amber) + guest(232, 262, 0.75, C.amber) + P("M250 262 H272", C.amber, 3) + arrowHead(276, 262, 0, C.amber));
      s += f.N("ex", 96, 262, 12);
      for (let i = 0; i < 3; i++) s += f.N("a" + i, [72, 196, 320][i], 100, 12);
      s += f.N("nt", 200, 286, 13);
      return s;
    },
    render(c, s) {
      const n = s.n == null ? 4 : s.n, st = s.staff == null ? 3 : s.staff;
      for (let i = 0; i < 6; i++) { c.op("g" + i, i < n ? 1 : 0, { dl: 0.05 * i }); c.mv("g" + i, { x: i < n ? 0 : -24 }); }
      c.cl("gq", "a-bob", n > 2);
      for (let i = 0; i < 3; i++) { c.op("st" + i, i < st ? 1 : 0.14); c.cl("st" + i, "a-shake", !!s.rush && i < st); }
      const m = parseFloat(s.wait) || 0;
      c.tx("wt", s.wait || ""); c.fl("wt", m >= 10 ? C.red : C.green);
      c.mv("hand", { r: m * 30, pv: [44, 50] }, { d: 1.2 });
      c.op("clock", s.wait ? 1 : 0.35);
      c.op("stars", s.stars == null ? 0 : 1);
      for (let i = 0; i < 5; i++) c.op("sg" + i, s.stars != null && i < s.stars ? 1 : 0, { dl: 0.06 * i });
      c.note("cost", s.cost ? { t: s.cost, c: s.cc || "A" } : null);
      c.op("sad", s.mood === "sad" ? 1 : 0); c.op("happy", s.mood === "happy" ? 1 : 0);
      c.op("exp", s.exp ? 1 : 0); c.note("ex", s.exp ? { t: "Corporate lane", c: "A" } : null);
      const a = s.alerts || [];
      for (let i = 0; i < 3; i++) c.note("a" + i, a[i] ? { t: a[i], c: (s.acs && s.acs[i]) || s.ac || "R", f: s.af } : null, { dl: 0.15 + i * 0.15 });
      c.note("nt", s.nt);
    }
  };
}

// template: Business Analytics Meeting — https://lottiefiles.com/free-animation/business-analytics-C1COKzrIkL
// The steering table: directors with their asks, the shared budget jar, pulls in different directions.
function F_BOARD(cfg) {
  const who = cfg.who; // [[name, colourLetter], x4]
  const X = [62, 150, 250, 338], B = [[96, 36], [126, 78], [274, 78], [304, 36]];
  return {
    bench: "Business Analytics Meeting — https://lottiefiles.com/free-animation/business-analytics-C1COKzrIkL",
    draw(f) {
      let s = "";
      for (let i = 0; i < 4; i++) s += f.H("pl" + i, P(`M200 158 L${X[i]} 150`, C.red, 3, 'stroke-dasharray="6 5"') + arrowHead(X[i] + (i < 2 ? 14 : -14), 150, i < 2 ? 180 : 0, C.red));
      for (let i = 0; i < 4; i++) {
        s += f.H("ring" + i, O(X[i], 158, 30, "none", `stroke="${NC[who[i][1]]}" stroke-width="3" class="a-pulse"`));
        s += f.K("d" + i, person(X[i], 176, 1.35, NC[who[i][1]]));
      }
      s += E(200, 214, 172, 34, C.wood) + E(200, 208, 172, 30, "#c99463");
      s += f.K("jar", F("M176 128 Q176 120 184 120 H216 Q224 120 224 128 V182 Q224 192 214 192 H186 Q176 192 176 182 Z", "rgba(232,241,248,.85)", `stroke="${C.slate}" stroke-width="2.5"`) + R(180, 112, 40, 9, C.slate, 3));
      for (let i = 0; i < 4; i++) s += f.H("c" + i, ICO("coin", 200, 178 - i * 15, 0.62));
      s += f.N("jl", 200, 238, 13);
      for (let i = 0; i < 4; i++) {
        s += T(X[i], 266, who[i][0], 13, NC[who[i][1]]);
        s += f.N("b" + i, B[i][0], B[i][1], 13);
      }
      s += f.N("nt", 200, 289, 13);
      return s;
    },
    render(c, s) {
      const on = s.on == null ? 4 : s.on, say = s.say || [];
      for (let i = 0; i < 4; i++) {
        const vis = Array.isArray(on) ? has(on, i) : i < on;
        c.op("d" + i, vis ? (s.spk == null || s.spk === i || has(s.also, i) ? 1 : 0.35) : 0.1);
        c.mv("d" + i, { y: s.spk === i ? -6 : 0 });
        c.op("ring" + i, s.spk === i ? 1 : 0);
        c.note("b" + i, say[i] ? { t: say[i], c: who[i][1], f: s.spk === i } : null, { dl: 0.1 * i });
        c.op("pl" + i, s.tug && vis ? 1 : 0); c.mv("pl" + i, { x: s.tug ? 0 : 0 });
      }
      const coins = s.coins == null ? 2 : s.coins;
      for (let i = 0; i < 4; i++) { c.op("c" + i, i < coins ? 1 : 0, { dl: 0.1 * i }); c.mv("c" + i, { y: i < coins ? 0 : -30 }); }
      c.op("jar", s.jar === false ? 0 : 1);
      c.note("jl", s.jl || null);
      c.note("nt", s.nt);
    }
  };
}

// template: Map Route Animation — https://lottiefiles.com/free-animation/map-route-animation-gMVg8kCqCD
// The BPM implementation framework as a road: Organization Strategy is the first stop.
function F_ROUTE() {
  const S = [[48, 236], [104, 206], [154, 192], [200, 170], [240, 146], [276, 126], [308, 104], [336, 84], [360, 64], [380, 44]];
  const road = "M48 236 C80 214 96 208 104 206 S140 196 154 192 S186 178 200 170 S228 154 240 146 S266 132 276 126 S298 112 308 104 S328 90 336 84 S352 70 360 64 S372 52 380 44";
  return {
    bench: "Map Route Animation — https://lottiefiles.com/free-animation/map-route-animation-gMVg8kCqCD",
    draw(f) {
      let s = R(0, 0, 400, 300, "#eef4ea") + P("M0 270 Q120 250 210 262 T400 250", "#d7e6cf", 18) + P("M0 40 Q80 24 160 40", "#e2ecdd", 22);
      s += P(road, "#d5d9dc", 14) + f.D("road", road, "#7e8f9c", 14) + P(road, C.white, 2, 'stroke-dasharray="6 8"');
      S.forEach((p, i) => { s += f.K("s" + i, O(p[0], p[1], i ? 8 : 14, C.muted, `stroke="${C.white}" stroke-width="3"`)); });
      s += f.H("beam", P("M48 74 L48 214", C.gold, 3, 'class="a-flow"'));
      s += f.H("star", `<g class="a-pulse">${O(48, 56, 24, C.gold, 'opacity=".25"')}</g>` + ICO("star", 48, 56, 1, C.gold));
      s += f.H("gate", R(96, 168, 4, 38, C.ink) + R(98, 172, 64, 8, C.red, 2) + R(112, 172, 10, 8, C.white) + R(134, 172, 10, 8, C.white));
      s += f.K("tok", O(48, 222, 9, C.coral, `stroke="${C.white}" stroke-width="3"`));
      s += f.N("l0", 106, 268, 14); s += f.N("l1", 150, 224, 12); s += f.N("lr", 300, 26, 13); s += f.N("gt", 196, 150, 12);
      s += f.N("nt", 300, 232, 13);
      return s;
    },
    render(c, s) {
      c.dr("road", s.road == null ? 1 : s.road, { d: 1.4 });
      const lit = s.lit == null ? 0 : s.lit;
      S.forEach((p, i) => { c.fl("s" + i, i < lit ? (i === 0 ? C.gold : C.navy2) : C.muted, { dl: 0.06 * i }); c.mv("s" + i, { s: i === 0 && s.first ? 1.25 : 1 }); });
      const at = clamp(s.at == null ? 0 : s.at, 0, 9);
      c.mv("tok", { x: S[at][0] - 48, y: S[at][1] - 236 - 14 }, { d: 1.2 });
      c.op("tok", s.at == null ? 0 : 1);
      c.op("star", s.star ? 1 : 0); c.op("beam", s.star ? 1 : 0, { dl: 0.3 });
      c.op("gate", s.gate ? 1 : 0); c.note("gt", s.gate ? { t: "Design waits", c: "R" } : null);
      c.note("l0", s.l0 ? { t: "Organization Strategy", c: "A", f: 1 } : null);
      c.note("l1", s.l1 ? { t: "Process Architecture", c: "N" } : null);
      c.note("lr", s.lr ? { t: "Later BPM phases", c: "S" } : null);
      c.note("nt", s.nt);
    }
  };
}

// template: Infographics Pack by ARstudio — https://motionarray.com/after-effects-templates/infographics-pack-135055/
// Qasr's three strategic objectives as cards, with a proposal linked to each by strength.
function F_OBJ(cfg = {}) {
  const X = [72, 200, 328], IC = ["star", "costdown", "growth"];
  const FIG = cfg.figs || ["#1", "−10%", "+25%"], NAME = cfg.names || ["Service rating", "Cost per room", "Corporate growth"];
  return {
    bench: "Infographics Pack by ARstudio — https://motionarray.com/after-effects-templates/infographics-pack-135055/",
    draw(f) {
      let s = "";
      for (let i = 0; i < 3; i++) {
        s += f.D("l" + i, `M200 252 C200 200 ${X[i]} 190 ${X[i]} 126`, OC[i], 4);
        s += f.N("w" + i, [112, 200, 288][i], [196, 176, 196][i], 12);
      }
      for (let i = 0; i < 3; i++) {
        s += f.H("hl" + i, R(X[i] - 64, 16, 128, 116, "none", 16, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
        s += f.K("cd" + i, R(X[i] - 58, 22, 116, 104, C.white, 12, `stroke="${OC[i]}" stroke-width="3"`) + R(X[i] - 58, 22, 116, 8, OC[i], 4) +
          ICO(IC[i], X[i], 52, 0.95, OC[i]) + f.TK("f" + i, X[i], 94, FIG[i], 25, OC[i]) + T(X[i], 116, NAME[i], 12, C.ink));
        s += f.H("ok" + i, ICO("check", X[i] + 50, 26, 0.75));
        s += f.H("rk" + i, ICO("warn", X[i] + 50, 28, 0.8));
      }
      s += f.H("ten", P("M96 142 H176", C.red, 4) + arrowHead(182, 142, 0, C.red) + arrowHead(90, 142, 180, C.red) + chip(136, 160, "Tension", { st: C.red, sz: 12 }));
      s += f.N("prop", 200, 262, 15);
      s += f.N("nt", 200, 287, 12);
      return s;
    },
    render(c, s) {
      const show = s.show == null ? 3 : s.show, L = s.links || [0, 0, 0], sg = s.sign || [1, 1, 1], wl = s.wl || [];
      for (let i = 0; i < 3; i++) {
        c.op("cd" + i, i < show ? (has(s.dim, i) ? 0.3 : 1) : 0, { dl: 0.12 * i });
        c.mv("cd" + i, { y: i < show ? 0 : 14, s: s.hl === i ? 1.06 : 1 });
        c.op("hl" + i, s.hl === i ? 1 : 0);
        c.op("ok" + i, has(s.ok, i) ? 1 : 0, { dl: 0.3 }); c.op("rk" + i, has(s.rk, i) ? 1 : 0, { dl: 0.3 });
        if (s.figs && s.figs[i] != null) c.tx("f" + i, s.figs[i]);
        c.dr("l" + i, s.prop && L[i] > 0 ? 1 : 0, { dl: 0.2 + 0.15 * i });
        c.sw("l" + i, L[i] > 0 ? 2 + L[i] * 2.5 : 2);
        c.sk("l" + i, sg[i] < 0 ? C.red : sg[i] === 0 ? C.muted : OC[i]);
        c.note("w" + i, s.prop && wl[i] ? { t: wl[i], c: sg[i] < 0 ? "R" : sg[i] === 0 ? "S" : "G" } : null, { dl: 0.5 + 0.1 * i });
      }
      c.op("ten", s.ten ? 1 : 0);
      c.note("prop", s.prop ? { t: s.prop, c: "N", f: 1 } : null);
      c.note("nt", s.nt);
    }
  };
}

// template: Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO
// A cause-and-effect chain: cards appear, arrows draw, a token travels; cards can turn red, green or break.
function F_CHAIN(cfg) {
  const nodes = cfg.nodes, n = nodes.length, slot = 376 / n, w = Math.min(104, slot - 14);
  const X = nodes.map((_, i) => 12 + slot * i + slot / 2), fs = w < 82 ? 12 : 13;
  return {
    bench: "Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO",
    draw(f) {
      let s = "";
      for (let i = 0; i < n - 1; i++) {
        const x1 = X[i] + w / 2 + 3, x2 = X[i + 1] - w / 2 - 5;
        s += f.D("a" + i, `M${r1(x1)} 152 H${r1(x2)}`, C.navy, 3.5);
        s += f.H("ah" + i, arrowHead(x2 + 4, 152, 0, C.navy));
        s += f.H("gap" + i, P(`M${r1((x1 + x2) / 2)} 120 V184`, C.red, 3, 'stroke-dasharray="5 4"') + ICO("q", (x1 + x2) / 2, 108, 0.65));
      }
      nodes.forEach((nd, i) => {
        const col = nd[3] ? NC[nd[3]] : C.navy, x = X[i];
        s += f.H("hr" + i, R(x - w / 2 - 5, 95, w + 10, 114, "none", 14, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
        s += f.K("c" + i,
          R(x - w / 2, 100, w, 104, C.white, 11, `stroke="${col}" stroke-width="2.5"`) + R(x - w / 2, 100, w, 7, col, 3) +
          f.H("rb" + i, R(x - w / 2, 100, w, 104, C.rose, 11, `stroke="${C.red}" stroke-width="3"`)) +
          f.H("gb" + i, R(x - w / 2, 100, w, 104, C.mint, 11, `stroke="${C.green}" stroke-width="3"`)) +
          ICO(nd[2] || "gear", x, 132, 0.9, col) + TF(x, 172, nd[0], fs, w - 8) + TF(x, 189, nd[1] || "", fs, w - 8));
        s += f.H("bad" + i, ICO("warn", x + w / 2 - 6, 102, 0.7));
        s += f.H("good" + i, ICO("check", x + w / 2 - 6, 102, 0.7));
      });
      s += f.K("tok", O(X[0], 84, 9, C.gold, `stroke="${C.white}" stroke-width="3"`) + P(`M${r1(X[0])} 93 V98`, C.gold, 2));
      s += f.N("ttl", 200, 38, 15); s += f.N("nt", 200, 240, 13); s += f.N("n2", 200, 272, 13);
      return s;
    },
    render(c, s) {
      const up = s.up == null ? n : s.up, dr = s.dr == null ? up - 1 : s.dr;
      for (let i = 0; i < n; i++) {
        c.op("c" + i, i < up ? (s.dim && s.hl != null && s.hl !== i ? 0.35 : 1) : 0, { dl: 0.1 * i });
        c.mv("c" + i, { y: i < up ? 0 : 14, s: s.hl === i ? 1.06 : 1 });
        c.op("hr" + i, s.hl === i ? 1 : 0);
        c.op("rb" + i, has(s.bad, i) ? 1 : 0); c.op("bad" + i, has(s.bad, i) ? 1 : 0, { dl: 0.2 });
        c.op("gb" + i, has(s.good, i) ? 1 : 0); c.op("good" + i, has(s.good, i) ? 1 : 0, { dl: 0.2 });
      }
      for (let i = 0; i < n - 1; i++) {
        const on = i < dr && s.gap !== i;
        c.dr("a" + i, on ? 1 : 0, { dl: 0.15 * i }); c.op("ah" + i, on ? 1 : 0, { dl: 0.15 * i + 0.4 });
        c.sk("a" + i, has(s.bad, i + 1) ? C.red : C.navy);
        c.op("gap" + i, s.gap === i ? 1 : 0);
      }
      const at = s.at == null ? -1 : s.at;
      c.op("tok", at >= 0 ? 1 : 0); c.mv("tok", { x: at >= 0 ? X[at] - X[0] : 0 }, { d: 1.1 });
      c.note("ttl", s.ttl ? (typeof s.ttl === "string" ? { t: s.ttl, c: "N", f: 1 } : s.ttl) : null);
      c.note("nt", s.nt); c.note("n2", s.n2, { dl: 0.3 });
    }
  };
}

// template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
// Two panels side by side, each with a header, an icon, evidence chips and a verdict.
function F_VS(cfg) {
  const side = (f, k, d, x0) => {
    const col = NC[d.c || "N"], cx = x0 + 91;
    let s = R(x0, 46, 182, 206, C.white, 14, `stroke="${col}" stroke-width="2.5"`) + R(x0, 46, 182, 34, col, 12) + R(x0, 68, 182, 12, col);
    s += T(cx, 68, d.t, 13, C.white) + ICO(d.icon || "doc", cx, 114, 1.25, col);
    (d.items || []).forEach((it, i) => { s += f.H(k + "i" + i, chip(cx, 160 + i * 31, it, { st: col, sz: 12, free: 1 })); });
    return f.K(k, s) + f.H(k + "ok", ICO("check", x0 + 160, 112, 0.8)) + f.H(k + "x", ICO("cross", x0 + 160, 112, 0.8)) + f.H(k + "w", ICO("warn", x0 + 160, 112, 0.8));
  };
  return {
    bench: "Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3",
    draw(f) {
      return side(f, "A", cfg.a, 10) + side(f, "B", cfg.b, 208) + f.K("vs", O(200, 148, 16, C.navy, `stroke="${C.white}" stroke-width="3"`) + T(200, 153, "vs", 13, C.white)) +
        f.N("ttl", 200, 22, 14) + f.N("nt", 200, 278, 13);
    },
    render(c, s) {
      const show = s.show || "ab";
      ["A", "B"].forEach((k) => {
        const lk = k.toLowerCase(), vis = show.indexOf(lk) > -1;
        c.op(k, vis ? (s.hl && s.hl !== lk ? 0.35 : 1) : 0, { dl: lk === "b" ? 0.15 : 0 });
        c.mv(k, { x: vis ? 0 : (lk === "a" ? -24 : 24), s: s.hl === lk ? 1.03 : 1 });
        const cnt = s["i" + lk] == null ? 3 : s["i" + lk];
        (cfg[lk].items || []).forEach((_, i) => c.op(k + "i" + i, vis && i < cnt ? 1 : 0, { dl: 0.25 + 0.12 * i }));
        const v = s["v" + lk];
        c.op(k + "ok", vis && v === "ok" ? 1 : 0, { dl: 0.4 }); c.op(k + "x", vis && v === "x" ? 1 : 0, { dl: 0.4 }); c.op(k + "w", vis && v === "w" ? 1 : 0, { dl: 0.4 });
      });
      c.op("vs", show === "ab" ? 1 : 0);
      c.note("ttl", s.ttl ? { t: s.ttl, c: "N", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p
// A balance: what is gained on one pan, what may be sacrificed on the other, a safeguard at the pivot.
function F_SCALE(cfg) {
  const pan = (f, k, d, x) => {
    const col = NC[d.c || "N"];
    let s = P(`M${x} 96 L${x - 52} 186 M${x} 96 L${x + 52} 186`, C.slate, 1.6) + F(`M${x - 62} 186 H${x + 62} Q${x + 56} 206 ${x} 206 Q${x - 56} 206 ${x - 62} 186 Z`, col);
    (d.items || []).forEach((it, i) => { s += f.H(k + i, chip(x, 172 - i * 28, it, { st: col, sz: 12 })); });
    s += TF(x, 228, d.t, 14, 128, col);
    return f.K(k, s);
  };
  return {
    bench: "Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p",
    draw(f) {
      let s = R(194, 96, 12, 150, C.slate, 3) + F("M168 252 H232 L220 238 H180 Z", C.slate);
      s += f.K("beam", R(60, 90, 280, 10, C.ink, 5) + O(200, 95, 8, C.gold), `data-pv="200 95"`);
      s += pan(f, "L", cfg.L, 70) + pan(f, "R", cfg.R, 330);
      s += f.H("guard", ICO("shield", 200, 132, 1.1, C.teal)); s += f.N("gT", 200, 249, 12);
      s += f.N("ttl", 200, 24, 14); s += f.N("mid", 200, 283, 13);
      return s;
    },
    render(c, s) {
      const t = s.t || 0;
      c.mv("beam", { r: 11 * t, pv: [200, 95] }, { d: 1.2, e: "elastic.out(1,0.6)" });
      c.mv("L", { y: -26 * t, s: s.hl === "L" ? 1.04 : 1 }, { d: 1.2 }); c.mv("R", { y: 26 * t, s: s.hl === "R" ? 1.04 : 1 }, { d: 1.2 });
      const nl = s.nl == null ? 3 : s.nl, nr = s.nr == null ? 3 : s.nr;
      (cfg.L.items || []).forEach((_, i) => c.op("L" + i, i < nl ? 1 : 0, { dl: 0.15 * i })); (cfg.R.items || []).forEach((_, i) => c.op("R" + i, i < nr ? 1 : 0, { dl: 0.15 * i }));
      c.op("guard", s.guard ? 1 : 0); c.note("gT", s.guard ? { t: s.guard === true ? "Safeguard" : s.guard, c: "T", f: 1 } : null);
      c.note("ttl", s.ttl ? { t: s.ttl, c: "N", f: 1 } : null); c.note("mid", s.mid);
    }
  };
}

// template: Animated Dashboards — https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ
// Three gauges whose needles and readings show how a process performs on different measures.
function F_GAUGE(cfg) {
  const X = [72, 200, 328], Y = 146, Rr = 48;
  return {
    bench: "Animated Dashboards — https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ",
    draw(f) {
      let s = "";
      cfg.g.forEach((g, i) => {
        const x = X[i];
        s += f.K("g" + i,
          R(x - 62, 82, 124, 130, C.white, 14, `stroke="${C.line}" stroke-width="2"`) +
          P(arcD(x, Y, Rr - 6, Math.PI, Math.PI * 1.33), C.red, 9) + P(arcD(x, Y, Rr - 6, Math.PI * 1.36, Math.PI * 1.64), C.gold, 9) + P(arcD(x, Y, Rr - 6, Math.PI * 1.67, Math.PI * 2), C.green, 9) +
          f.K("nd" + i, P(`M${x} ${Y} L${x} ${Y - Rr + 10}`, C.ink, 4), `data-pv="${x} ${Y}"`) + O(x, Y, 6, C.ink) +
          f.TK("v" + i, x, Y + 26, "", 17, C.ink) + chip(x, 232, g[0], { st: NC[g[1] || "N"], sz: 12, free: 1 }));
        s += f.H("wr" + i, R(x - 66, 78, 132, 138, "none", 16, `stroke="${C.red}" stroke-width="3" stroke-dasharray="7 5"`));
        s += f.H("hr" + i, R(x - 66, 78, 132, 138, "none", 16, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
      });
      s += f.N("ttl", 200, 40, 15); s += f.N("nt", 200, 272, 13);
      return s;
    },
    render(c, s) {
      const show = s.show == null ? 3 : s.show, v = s.val || [0, 0, 0], t = s.txt || [];
      for (let i = 0; i < cfg.g.length; i++) {
        c.op("g" + i, i < show ? (s.hl != null && s.hl !== i && s.dim ? 0.35 : 1) : 0, { dl: 0.12 * i });
        c.mv("nd" + i, { r: clamp(v[i] || 0, -1, 1) * 84, pv: [X[i], Y] }, { d: 1.2, dl: 0.1 * i });
        c.tx("v" + i, t[i] || "");
        c.op("wr" + i, has(s.warn, i) ? 1 : 0); c.op("hr" + i, s.hl === i ? 1 : 0);
      }
      c.note("ttl", s.ttl ? { t: s.ttl, c: "N", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: Bar chart transitions — https://observablehq.com/@d3/bar-chart-transitions/2
// A ratio built from coins over beds, its result, and baseline vs target bars.
function F_FRAC(cfg) {
  return {
    bench: "Bar chart transitions — https://observablehq.com/@d3/bar-chart-transitions/2",
    draw(f) {
      let s = R(10, 12, 222, 168, C.white, 14, `stroke="${C.line}" stroke-width="2"`);
      s += f.K("num", chip(121, 34, cfg.num, { st: C.amber, sz: 13, free: 1 }) + rep(5, (i) => ICO("coin", 57 + i * 32, 66, 0.72)));
      s += f.K("bar", P("M30 94 H212", C.ink, 4));
      s += f.K("den", rep(4, (i) => ICO("bed", 66 + i * 36, 120, 0.82, C.navy2)) + chip(121, 156, cfg.den, { st: C.navy2, sz: 13, free: 1 }));
      s += f.K("eq", T(250, 104, "=", 34, C.ink));
      s += f.K("res", R(270, 66, 120, 62, C.white, 14, `stroke="${C.coral}" stroke-width="3"`) + f.TK("rv", 330, 106, cfg.res || "", 24, C.coral));
      s += f.H("rl", T(330, 148, cfg.resl || "per room-night", 12, C.slate));
      s += T(24, 204, cfg.base[1], 13, C.ink, "", "start") + R(24, 212, 340, 18, "#edf1f4", 9);
      s += f.K("bb", R(24, 212, 340 * cfg.base[0], 18, C.coral, 9), `data-pv="24 221"`);
      s += f.TK("bT", 30 + 340 * cfg.base[0], 226, "", 13, C.white, "end");
      s += T(24, 250, cfg.tgt[1], 13, C.ink, "", "start") + R(24, 258, 340, 18, "#edf1f4", 9);
      s += f.K("tb", R(24, 258, 340 * cfg.tgt[0], 18, C.green, 9), `data-pv="24 267"`);
      s += f.H("cut", R(24 + 340 * cfg.tgt[0], 258, 340 * (cfg.base[0] - cfg.tgt[0]), 18, "none", 4, `stroke="${C.red}" stroke-width="2" stroke-dasharray="4 3"`));
      s += f.H("warn", ICO("warn", 384, 267, 0.7));
      s += f.N("calc", 200, 286, 13);
      s += f.N("nt", 310, 186, 12);
      return s;
    },
    render(c, s) {
      const st = s.stage == null ? 5 : s.stage;
      c.op("num", st >= 0 ? 1 : 0); c.op("bar", st >= 1 ? 1 : 0); c.op("den", st >= 1 ? 1 : 0, { dl: 0.2 });
      c.op("eq", st >= 2 ? 1 : 0); c.op("res", st >= 2 ? 1 : 0, { dl: 0.2 }); c.op("rl", st >= 2 ? 1 : 0, { dl: 0.3 });
      const rv = s.rv || cfg.res || ""; c.tx("rv", rv); c.at("rv", "font-size", Math.min(24, Math.floor(108 / Math.max(1, rv.length * 0.58))));
      c.mv("bb", { sx: st >= 3 ? 1 : 0.001, pv: [24, 221] }, { d: 1 }); c.op("bb", st >= 3 ? 1 : 0);
      c.tx("bT", st >= 3 ? (s.bT || "") : "");
      c.mv("tb", { sx: st >= 4 ? 1 : 0.001, pv: [24, 267] }, { d: 1, dl: 0.2 }); c.op("tb", st >= 4 ? 1 : 0);
      c.op("cut", st >= 4 && s.cut ? 1 : 0, { dl: 0.6 });
      c.op("warn", s.warn ? 1 : 0); c.cl("warn", "a-pulse", !!s.warn);
      c.note("calc", s.calc ? { t: s.calc, c: s.cc || "G", f: 1 } : null, { dl: 0.3 });
      c.note("nt", s.nt);
    }
  };
}

// template: Stacked-to-grouped bars — https://observablehq.com/@d3/stacked-to-grouped-bars
// The Exhibit 5 alignment matrix: four proposals by three objectives, strengths as sized dots.
const EX5 = { rows: [["Guest arrival", "guest"], ["Stock counting", "box"], ["Corporate billing", "invoice"], ["Spa booking", "spa"]], v: [[3, 2, 3], [0, 2, 0], [2, 1, 3], [2, 0, 0]] };
function F_MATRIX() {
  const CX = [196, 254, 312], RY = [100, 146, 192, 238], RS = [0, 5.5, 9.5, 13.5];
  return {
    bench: "Stacked-to-grouped bars — https://observablehq.com/@d3/stacked-to-grouped-bars",
    draw(f) {
      let s = R(4, 30, 392, 234, C.white, 14, `stroke="${C.line}" stroke-width="2"`);
      for (let j = 0; j < 3; j++) s += f.H("cb" + j, R(CX[j] - 27, 34, 54, 228, OC[j], 10, 'opacity=".16"'));
      ["star", "costdown", "growth"].forEach((ic, j) => { s += ICO(ic, CX[j], 50, 0.62, OC[j]) + T(CX[j], 76, OBJN[j], 12, OC[j]); });
      s += T(356, 76, "Total", 12, C.slate);
      for (let i = 0; i < 4; i++) {
        const y = RY[i];
        s += f.H("rb" + i, R(8, y - 21, 384, 42, C.gold, 10, 'opacity=".2"'));
        s += f.H("rg" + i, R(8, y - 21, 384, 42, "none", 10, `stroke="${C.green}" stroke-width="3"`));
        s += f.K("r" + i, ICO(EX5.rows[i][1], 26, y, 0.62, C.navy) + T(44, y + 5, EX5.rows[i][0], 13, C.ink, "", "start") + P(`M12 ${y + 21} H388`, C.line, 1));
        for (let j = 0; j < 3; j++) {
          const v = EX5.v[i][j];
          s += f.H("c" + i + j, v ? O(CX[j], y, RS[v], OC[j]) : P(`M${CX[j] - 8} ${y} H${CX[j] + 8}`, C.muted, 3));
        }
        s += f.TK("t" + i, 356, y + 6, String(EX5.v[i].reduce((a, b) => a + b, 0)), 18, C.navy, "middle", 'style="opacity:0"');
        s += f.H("fd" + i, ICO("coin", 386, y, 0.55));
        s += f.H("df" + i, ICO("hourglass", 386, y, 0.5, C.slate));
      }
      s += f.H("cr", ICO("crown", 136, RY[3] - 2, 0.55));
      s += f.K("lg", O(70, 282, 7, C.slate) + T(80, 287, "Strong", 12, C.slate, "", "start") + O(150, 282, 5, C.slate) + T(158, 287, "Moderate", 12, C.slate, "", "start") +
        O(244, 282, 3, C.slate) + T(250, 287, "Weak", 12, C.slate, "", "start") + P("M300 282 H312", C.muted, 3) + T(318, 287, "None", 12, C.slate, "", "start"));
      s += f.N("nt", 200, 16, 12);
      return s;
    },
    render(c, s) {
      const rows = s.rows == null ? 4 : s.rows, cells = s.cells == null ? rows : s.cells;
      for (let i = 0; i < 4; i++) {
        const vis = Array.isArray(rows) ? has(rows, i) : i < rows;
        const dim = s.hl != null && s.hl !== i && (s.dim !== false) && !has(s.also, i);
        c.op("r" + i, vis ? (dim ? 0.35 : 1) : 0.12, { dl: 0.08 * i });
        c.op("rb" + i, s.hl === i || has(s.also, i) ? 1 : 0); c.op("rg" + i, has(s.fund, i) ? 1 : 0);
        const cv = Array.isArray(cells) ? has(cells, i) : i < cells;
        for (let j = 0; j < 3; j++) { c.op("c" + i + j, cv ? (dim ? 0.35 : 1) : 0, { dl: 0.2 + 0.15 * j }); c.mv("c" + i + j, { s: cv ? (has(s.colhl, j) && !dim ? 1.2 : 1) : 0.2 }, { dl: 0.2 + 0.15 * j }); }
        c.op("t" + i, s.tot && cv ? 1 : 0, { dl: 0.6 });
        c.op("fd" + i, has(s.fund, i) ? 1 : 0, { dl: 0.4 }); c.mv("fd" + i, { y: has(s.fund, i) ? 0 : -30 }, { dl: 0.4 });
        c.op("df" + i, has(s.def, i) ? 1 : 0, { dl: 0.4 });
      }
      for (let j = 0; j < 3; j++) c.op("cb" + j, has(s.colhl, j) ? 1 : 0);
      c.op("cr", s.crown ? 1 : 0); c.cl("cr", "a-pulse", !!s.crown);
      c.note("nt", s.nt);
    }
  };
}

// template: Multi-Step Icon Animation — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
// An objective as a key: four cuts (result, measure, boundary, authority) before it opens the lock.
function F_KEY() {
  const NX = [160, 196, 232, 268], LB = ["1 Result", "2 Measure", "3 Boundary", "4 Authority"], LC = [C.teal, C.navy2, C.coral, C.plum];
  return {
    bench: "Multi-Step Icon Animation — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU",
    draw(f) {
      let s = R(0, 0, 400, 300, "#1d3b42") + rep(14, (i) => rep(9, (j) => O(14 + i * 28, 14 + j * 28, 1.4, "#2f5a62")));
      s += f.H("dep", chip(70, 30, "Reception", { st: C.teal, sz: 12 }) + chip(165, 30, "Housekeeping", { st: C.navy2, sz: 12 }) + chip(262, 30, "Finance", { st: C.gold, sz: 12 }) + chip(344, 30, "Sales", { st: C.coral, sz: 12 }));
      s += f.K("lock", R(312, 96, 80, 104, "#9aa7b0", 12, `stroke="#5d6b75" stroke-width="3"`) + O(352, 140, 10, "#26333b") + R(348, 142, 8, 18, "#26333b", 2));
      s += f.K("lamp", O(352, 184, 7, C.muted));
      s += f.K("sh", P("M328 96 V74 A24 24 0 0 1 376 74 V96", "#5d6b75", 9));
      s += f.K("key",
        O(70, 140, 30, "#e3b04b", `stroke="#b6862a" stroke-width="3"`) + O(70, 140, 11, "#1d3b42") +
        R(98, 131, 192, 18, "#e3b04b", 3) + R(150, 109, 140, 24, "#e3b04b", 2) + F("M290 131 L302 140 L290 149 Z", "#e3b04b") +
        NX.map((x, i) => f.K("n" + i, R(x, 109, 20, 22, "#1d3b42"), `data-pv="${x + 10} 109"`) + R(x, 109, 20, 22, "none", 2, `stroke="#ffffff" stroke-width="1.3" stroke-dasharray="3 3" opacity=".7"`) + T(x + 10, 102, String(i + 1), 12, "#ffe7a8")).join(""));
      s += f.K("cut", G("translate(0 0)", P("M170 26 V60", "#8796a0", 6) + `<g class="a-spin">${O(170, 70, 18, "#c9d2d8", `stroke="#5d6b75" stroke-width="3"`) + P("M170 54 V86 M154 70 H186", "#5d6b75", 2.5)}</g>` +
        f.H("spk", P("M160 92 L150 104 M170 94 V108 M180 92 L190 104", "#ffd36b", 2.5))));
      s += f.H("fx", ICO("cross", 352, 140, 1.1));
      s += f.H("sp", ICO("sponsor", 30, 194, 1.1, C.plum) + T(30, 226, "Sponsor", 11, "#e7dcf7"));
      LB.forEach((t, i) => { s += f.K("lg" + i, chip([52, 146, 252, 350][i], 262, t, { st: LC[i], sz: 12, free: 1 })); });
      s += f.N("nt", 200, 228, 13);
      return s;
    },
    render(c, s) {
      const cuts = s.cuts || 0;
      for (let i = 0; i < 4; i++) {
        c.mv("n" + i, { sy: i < cuts ? 1 : 0.02, pv: [NX[i] + 10, 109] }, { dl: i === cuts - 1 ? 0.4 : 0 });
        c.op("lg" + i, i < cuts ? 1 : (s.legend ? 0.35 : 0)); c.mv("lg" + i, { s: s.hl === i ? 1.12 : 1 });
      }
      const at = s.at == null ? -1 : s.at;
      c.mv("cut", { x: at >= 0 ? NX[at] - 160 : 200, y: at >= 0 ? 0 : -90 }, { d: 0.9 });
      c.op("spk", at >= 0 ? 1 : 0, { dl: 0.6 });
      c.mv("key", { x: s.inLock ? 44 : 0, y: s.drop ? 40 : 0 }, { d: 1 });
      c.op("key", s.ghost ? 0.45 : 1);
      c.fl("lamp", s.open ? C.green : s.fail ? C.red : C.muted);
      c.mv("sh", { y: s.open ? -16 : 0 }, { dl: 0.6 });
      c.op("fx", s.fail ? 1 : 0, { dl: 0.5 });
      c.op("dep", s.dep ? 1 : 0); c.op("sp", s.sp ? 1 : 0);
      c.note("nt", s.nt);
    }
  };
}

// template: Process - Success — https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP
// The mechanism: a proposal turns a gear train (change -> effect -> objective) that moves a dial.
function gearPath(cx, cy, r, n, skip) {
  let d = ""; const st = 2 * Math.PI / n, dp = 7;
  for (let k = 0; k < n; k++) {
    const a = k * st, pts = has(skip, k) ? [[a, r - dp], [a + st * 0.65, r - dp]] : [[a, r - dp], [a + st * 0.15, r], [a + st * 0.5, r], [a + st * 0.65, r - dp]];
    pts.forEach((p, j) => { d += (k === 0 && j === 0 ? "M" : "L") + r1(cx + Math.cos(p[0]) * p[1]) + " " + r1(cy + Math.sin(p[0]) * p[1]) + " "; });
  }
  return d + "Z";
}
function F_GEAR(cfg) {
  const G1 = [70, 176, 40], G2 = [144, 176, 32], G3 = [218, 176, 40], DL = [334, 140];
  const lab = cfg.labels || ["Change", "Effect", "Contribution"];
  return {
    bench: "Process - Success — https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP",
    draw(f) {
      let s = rep(20, (i) => P(`M${i * 20} 0 V300`, "#21426a", 1)) + rep(15, (i) => P(`M0 ${i * 20} H400`, "#21426a", 1));
      s = R(0, 0, 400, 300, "#173250") + s;
      s += f.D("belt", "M232 140 C262 112 290 112 300 118", "#f4cf6b", 5);
      s += f.K("g1", F(gearPath(G1[0], G1[1], G1[2], 12), C.teal, `stroke="#0f2440" stroke-width="2"`) + O(G1[0], G1[1], 8, "#0f2440") + P(`M${G1[0]} ${G1[1]} L${G1[0] - 28} ${G1[1] - 30}`, "#e8eef5", 6) + O(G1[0] - 28, G1[1] - 30, 7, "#e8eef5"), `data-pv="${G1[0]} ${G1[1]}"`);
      s += f.K("g2", F(gearPath(G2[0], G2[1], G2[2], 10, [2, 3]), C.gold, `stroke="#0f2440" stroke-width="2"`) + O(G2[0], G2[1], 7, "#0f2440") +
        f.H("gap", P(arcD(G2[0], G2[1], 38, 2 * 2 * Math.PI / 10 - 0.1, 4 * 2 * Math.PI / 10 + 0.1), C.red, 4)) +
        f.H("fix", F(gearPath(G2[0], G2[1], G2[2], 10, [0, 1, 4, 5, 6, 7, 8, 9]), C.green, `stroke="#0f2440" stroke-width="1.5"`)), `data-pv="${G2[0]} ${G2[1]}"`);
      s += f.K("g3", F(gearPath(G3[0], G3[1], G3[2], 12), C.coral, `stroke="#0f2440" stroke-width="2"`) + O(G3[0], G3[1], 8, "#0f2440"), `data-pv="${G3[0]} ${G3[1]}"`);
      lab.forEach((t, i) => { s += f.K("lb" + i, chip([70, 144, 218][i], 240, t, { st: [C.teal, C.gold, C.coral][i], sz: 12, free: 1 })); });
      s += O(DL[0], DL[1], 44, "#0f2440", `stroke="${C.sky}" stroke-width="3"`) + P(arcD(DL[0], DL[1], 34, Math.PI * 1.08, Math.PI * 1.5), C.red, 6) + P(arcD(DL[0], DL[1], 34, Math.PI * 1.5, Math.PI * 1.92), C.green, 6);
      s += f.K("nd", P(`M${DL[0]} ${DL[1]} L${DL[0]} ${DL[1] - 32}`, C.white, 4), `data-pv="${DL[0]} ${DL[1]}"`) + O(DL[0], DL[1], 5, C.white);
      s += chip(DL[0], 202, cfg.dial || "Objective", { st: cfg.dc || C.teal, sz: 13, free: 1 });
      s += f.H("gain", ICO("coin", 300, 250, 0.6) + ICO("coin", 326, 250, 0.6) + ICO("coin", 352, 250, 0.6) + T(326, 280, "Savings", 12, C.gold));
      s += f.H("minus", ICO("cross", 300, 250, 0.5) + ICO("cross", 326, 250, 0.5) + T(374, 255, "New costs", 12, C.red, "", "end"));
      s += f.N("prop", 200, 28, 15); s += f.N("nt", 200, 66, 13);
      return s;
    },
    render(c, s) {
      const T0 = (s.turn || 0) * 120;
      c.mv("g1", { r: T0, pv: [G1[0], G1[1]] }, { d: 1.4 });
      c.mv("g2", { r: -T0 * 40 / 32 + (s.gap ? 10 : 0), pv: [G2[0], G2[1]] }, { d: 1.4 });
      c.mv("g3", { r: s.gap && !s.fix ? 0 : T0, pv: [G3[0], G3[1]] }, { d: 1.4 });
      c.op("gap", s.gap && !s.fix ? 1 : 0); c.op("fix", s.fix ? 1 : 0);
      c.dr("belt", s.belt ? 1 : 0);
      c.mv("nd", { r: clamp(s.dial || -0.8, -1, 1) * 80, pv: [DL[0], DL[1]] }, { d: 1.2, dl: 0.3 });
      for (let i = 0; i < 3; i++) c.op("lb" + i, s.lab === false ? 0.25 : (s.hl == null || s.hl === i ? 1 : 0.4));
      c.op("gain", s.coins === "gain" || s.coins === "net" ? 1 : 0); c.op("minus", s.coins === "net" ? 1 : 0, { dl: 0.3 });
      c.note("prop", s.prop ? { t: s.prop, c: "T", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: Hierarchy traversal animated — https://old.observablehq.com/@d3/hierarchy-traversal-animated
// Governance tiers: who recommends, who approves, and an escalation that climbs to the right level.
function F_LADDER(cfg) {
  const Y = [52, 112, 172, 232];
  return {
    bench: "Hierarchy traversal animated — https://old.observablehq.com/@d3/hierarchy-traversal-animated",
    draw(f) {
      let s = "";
      cfg.tiers.forEach((t, i) => {
        const col = NC[t[2] || "N"];
        s += f.H("h" + i, R(14, Y[i] - 27, 240, 54, "none", 14, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
        s += f.K("t" + i, R(18, Y[i] - 23, 232, 46, C.white, 12, `stroke="${col}" stroke-width="2.5"`) + R(18, Y[i] - 23, 10, 46, col, 4) + ICO(t[1], 52, Y[i], 0.9, col) + TF(80, Y[i] + 5, t[0], 15, 162, C.ink, "start"));
        if (i < 3) s += P(`M150 ${Y[i] + 23} V${Y[i + 1] - 23}`, C.line, 2.5);
        s += f.N("tg" + i, 334, Y[i], 12);
      });
      s += f.D("esc", `M262 ${Y[3] + 10} C276 ${Y[3] - 10} 268 ${Y[0] + 40} 262 ${Y[0] + 6}`, C.red, 4);
      s += f.H("eh", arrowHead(262, Y[0] + 2, -90, C.red));
      s += f.H("cf", person(210, Y[3] - 2, 0.8, C.teal) + person(258, Y[3] - 2, 0.8, C.coral) + P(`M226 ${Y[3] - 12} L232 ${Y[3] - 4} L236 ${Y[3] - 14} L242 ${Y[3] - 6}`, C.red, 3));
      s += f.H("stp", G("rotate(-8 334 82)", R(282, 67, 104, 30, "rgba(255,255,255,.94)", 6, `stroke="${C.green}" stroke-width="3.5"`) + f.TK("stT", 334, 88, "", 15, C.green)));
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      const show = s.show == null ? 4 : s.show, tg = s.tags || {};
      for (let i = 0; i < 4; i++) {
        c.op("t" + i, i < show ? (s.hl != null && s.hl !== i && s.dim ? 0.35 : 1) : 0, { dl: 0.12 * i });
        c.mv("t" + i, { x: i < show ? 0 : -20, s: s.hl === i ? 1.03 : 1 });
        c.op("h" + i, s.hl === i ? 1 : 0);
        c.note("tg" + i, tg[i] ? (typeof tg[i] === "string" ? { t: tg[i], c: "N" } : tg[i]) : null, { dl: 0.3 + 0.1 * i });
      }
      c.dr("esc", s.esc || 0, { d: 1.3 }); c.op("eh", (s.esc || 0) >= 1 ? 1 : 0, { dl: 1 });
      c.op("cf", s.cf ? 1 : 0);
      c.tx("stT", s.stamp || ""); c.op("stp", s.stamp ? 1 : 0, { dl: 0.5 }); c.mv("stp", { s: s.stamp ? 1 : 1.4 }, { dl: 0.5 });
      c.note("nt", s.nt);
    }
  };
}

// template: Animated treemap — https://observablehq.com/@d3/animated-treemap
// Qasr's processes as tiles; a scope boundary that can be narrow, focused or broad; exclusions and dependencies.
function F_SCOPE(cfg) {
  const X = [72, 200, 328], Y = [72, 140, 208];
  const BOX = { n: [138, 108, 124, 64], f: [10, 40, 252, 134], b: [6, 40, 388, 202] };
  return {
    bench: "Animated treemap — https://observablehq.com/@d3/animated-treemap",
    draw(f) {
      let s = "";
      ["n", "f", "b"].forEach((k) => { const b = BOX[k]; s += f.H("b" + k, R(b[0], b[1], b[2], b[3], "rgba(23,143,128,.08)", 16, `stroke="${C.teal}" stroke-width="3.5" stroke-dasharray="9 6"`)); });
      cfg.tiles.forEach((t, i) => {
        const x = X[i % 3], y = Y[Math.floor(i / 3)];
        s += f.K("tl" + i, R(x - 56, y - 26, 112, 52, C.white, 10, `stroke="${C.navy2}" stroke-width="2"`) + ICO(t[1], x - 40, y, 0.55, C.navy2) + (t[0].indexOf("|") > -1 ? TF(x + 10, y - 2, t[0].split("|")[0], 12, 84) + TF(x + 10, y + 13, t[0].split("|")[1], 12, 84) : TF(x + 10, y + 5, t[0], 12, 84)));
        s += f.H("x" + i, R(x - 56, y - 26, 112, 52, "rgba(93,115,137,.55)", 10) + xmark(x + 40, y - 12, 0.7, C.white, 3));
        s += f.H("w" + i, R(x - 60, y - 30, 120, 60, "none", 12, `stroke="${C.red}" stroke-width="3" class="a-pulse"`));
      });
      s += f.H("dep", P(`M256 ${Y[1]} H270`, C.red, 3) + arrowHead(272, Y[1], 0, C.red) + P(`M200 ${Y[1] - 26} V${Y[0] + 28}`, C.red, 3) + arrowHead(200, Y[0] + 26, -90, C.red));
      s += f.N("bl", 200, 22, 14); s += f.N("nt", 200, 276, 13);
      return s;
    },
    render(c, s) {
      ["n", "f", "b"].forEach((k) => c.op("b" + k, s.box === k ? 1 : 0));
      cfg.tiles.forEach((_, i) => {
        c.op("tl" + i, has(s.hide, i) ? 0.15 : 1, { dl: 0.04 * i });
        c.op("x" + i, has(s.x, i) ? 1 : 0, { dl: 0.2 }); c.op("w" + i, has(s.w, i) ? 1 : 0);
        c.mv("tl" + i, { s: s.hl === i ? 1.08 : 1 });
      });
      c.op("dep", s.dep ? 1 : 0);
      c.note("bl", s.bl ? { t: s.bl, c: "T", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: contract process — https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8
// The strategy mandate as a document: scattered notes become sections, sections get ticked, a stamp, a handover.
function F_DOC(cfg) {
  const rows = cfg.rows;
  return {
    bench: "contract process — https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8",
    draw(f) {
      let s = f.H("sc", G("rotate(-12 70 70)", R(36, 52, 70, 46, C.cream, 4, `stroke="${C.gold}" stroke-width="2"`) + P("M44 66 H96 M44 76 H86", C.amber, 2)) +
        G("rotate(9 330 70)", R(296, 50, 72, 48, C.white, 4, `stroke="${C.navy2}" stroke-width="2"`) + P("M304 64 H358 M304 74 H340", C.navy2, 2)) +
        G("rotate(6 60 220)", R(24, 196, 70, 46, C.rose, 4, `stroke="${C.coral}" stroke-width="2"`) + P("M32 210 H84 M32 220 H72", C.coral, 2)) +
        G("rotate(-8 340 220)", R(304, 198, 70, 46, C.mint, 4, `stroke="${C.green}" stroke-width="2"`) + P("M312 212 H364 M312 222 H350", C.green, 2)) +
        T(200, 150, "?", 40, C.slate, 'class="a-pulse"'));
      s += f.K("pg", F("M112 26 H268 L288 46 V262 H112 Z", C.white, `stroke="${C.navy}" stroke-width="2.5"`) + F("M268 26 V46 H288", C.sky, `stroke="${C.navy}" stroke-width="2"`) +
        R(112, 46, 176, 30, C.navy) + T(200, 66, cfg.title, 14, C.white) +
        rows.map((r, i) => { const y = rows.length > 4 ? 92 + i * 30 : 96 + i * 34; return f.K("r" + i, R(122, y - 13, 156, 28, "#f1f4f7", 7) + ICO(r[1], 138, y + 1, 0.5, C.navy2) + TF(152, y + 6, r[0], 12, 112, C.ink, "start")) + f.H("k" + i, ICO("check", 279, y + 1, 0.55)) + f.H("q" + i, ICO("warn", 279, y + 1, 0.55)); }).join(""));
      s += f.H("sA", G("rotate(-12 200 252)", R(140, 235, 120, 34, "rgba(255,255,255,.92)", 6, `stroke="${C.green}" stroke-width="3.5"`) + T(200, 258, "ACCEPTED", 16, C.green)));
      s += f.H("sC", G("rotate(-12 200 252)", R(128, 235, 144, 34, "rgba(255,255,255,.92)", 6, `stroke="${C.amber}" stroke-width="3.5"`) + T(200, 258, "CONDITIONAL", 16, C.amber)));
      s += f.H("sX", G("rotate(-12 200 252)", R(140, 235, 120, 34, "rgba(255,255,255,.92)", 6, `stroke="${C.red}" stroke-width="3.5"`) + T(200, 258, "UNCLEAR", 16, C.red)));
      s += f.H("ho", P("M292 150 H330", C.teal, 4, 'class="a-flow"') + arrowHead(338, 150, 0, C.teal) + ICO("people", 364, 150, 0.95, C.teal) + T(364, 182, "Teams", 12, C.teal));
      s += f.H("sp", ICO("sponsor", 48, 150, 1.15, C.plum) + T(48, 182, "Sponsor", 12, C.plum));
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      const n = s.rows == null ? rows.length : s.rows, ok = s.ok || [], q = s.q || [];
      c.op("sc", s.scat ? 1 : 0); c.op("pg", s.scat ? 0.15 : 1); c.mv("pg", { s: s.scat ? 0.92 : 1 });
      for (let i = 0; i < rows.length; i++) {
        c.op("r" + i, i < n && !s.scat ? (s.hl != null && s.hl !== i ? 0.4 : 1) : 0, { dl: 0.1 * i }); c.mv("r" + i, { x: i < n ? 0 : 16 });
        c.op("k" + i, ok === "all" || has(ok, i) ? 1 : 0, { dl: 0.3 + 0.12 * i }); c.op("q" + i, has(q, i) ? 1 : 0, { dl: 0.3 });
      }
      ["A", "C", "X"].forEach((k) => { c.op("s" + k, s.stamp === k ? 1 : 0, { dl: 0.4 }); c.mv("s" + k, { s: s.stamp === k ? 1 : 1.5 }, { dl: 0.4 }); });
      c.op("ho", s.ho ? 1 : 0); c.op("sp", s.sp ? 1 : 0);
      c.note("nt", s.nt);
    }
  };
}

// template: Animated line chart lesson — https://observablehq.com/@d3/learn-d3-animation
// Baseline, target and measured line over time, with the spread of individual results.
function F_CHART(cfg) {
  const x0 = 54, x1 = 372, y0 = 236, y1 = 56, mx = cfg.max;
  const Yv = (v) => r1(y0 - (v / mx) * (y0 - y1));
  const pts = cfg.series.map((v, i) => [r1(x0 + i * (x1 - x0) / (cfg.series.length - 1)), Yv(v)]);
  const line = "M" + pts.map((p) => p[0] + " " + p[1]).join(" L");
  const band = "M" + pts.map((p, i) => p[0] + " " + r1(p[1] - cfg.spread[i])).join(" L") + " L" + pts.slice().reverse().map((p, i) => p[0] + " " + r1(p[1] + cfg.spread[cfg.spread.length - 1 - i])).join(" L") + " Z";
  return {
    bench: "Animated line chart lesson — https://observablehq.com/@d3/learn-d3-animation",
    draw(f) {
      let s = R(8, 24, 384, 248, C.white, 14, `stroke="${C.line}" stroke-width="2"`);
      s += P(`M${x0} ${y1 - 6} V${y0} H${x1 + 6}`, C.slate, 2.5) + T(x0 - 8, Yv(0) + 4, "0", 12, C.slate, "", "end") + T(x0 - 8, Yv(mx / 2) + 4, String(mx / 2), 12, C.slate, "", "end") + T(x0 - 8, Yv(mx) + 4, String(mx), 12, C.slate, "", "end");
      s += T((x0 + x1) / 2, 258, cfg.xl || "Weeks", 12, C.slate) + T(18, 46, cfg.unit, 12, C.slate, "", "start");
      s += f.H("band", F(band, "rgba(192,57,43,.14)"));
      s += f.H("go", P(`M${pts[cfg.live][0]} ${y1} V${y0}`, C.plum, 2.5, 'stroke-dasharray="5 4"') + chip(pts[cfg.live][0], y1 - 6, "Redesign live", { st: C.plum, sz: 11, free: 1 }));
      s += f.K("bl", P(`M${x0} ${Yv(cfg.base)} H${x1}`, C.coral, 3, 'stroke-dasharray="8 6"'));
      s += f.K("tl", P(`M${x0} ${Yv(cfg.tgt)} H${x1}`, C.green, 3.5));
      s += f.D("ml", line, C.navy, 4);
      s += f.H("ol", cfg.out.map((o) => O(pts[o[0]][0], Yv(o[1]), 5, C.red, `stroke="${C.white}" stroke-width="1.5"`)).join(""));
      s += f.N("bT", 300, Yv(cfg.base) - 14, 12); s += f.N("tT", 300, Yv(cfg.tgt) + 16, 12);
      s += f.N("nt", 200, 287, 13);
      return s;
    },
    render(c, s) {
      c.op("bl", s.bl ? 1 : 0); c.op("tl", s.tl ? 1 : 0);
      c.note("bT", s.bl ? { t: cfg.bT, c: "O", f: 1 } : null); c.note("tT", s.tl ? { t: cfg.tT, c: "G", f: 1 } : null);
      c.dr("ml", s.ml || 0, { d: 1.6 }); c.op("band", s.band ? 1 : 0); c.op("ol", s.ol ? 1 : 0, { dl: 0.3 }); c.cl("ol", "a-blink", !!s.ol);
      c.op("go", s.go ? 1 : 0);
      c.note("nt", s.nt);
    }
  };
}

// template: Payment Successful — https://lottiefiles.com/free-animation/payment-successful-5uXFkB4jix
// Four proposal cards and a budget of two coins: coins drop on the funded pair; the rest are deferred, not discarded.
function F_BUDGET() {
  const X = [56, 152, 248, 344], NM = [["Guest", "arrival", "guest"], ["Stock", "counting", "box"], ["Corporate", "billing", "invoice"], ["Spa", "booking", "spa"]];
  return {
    bench: "Payment Successful — https://lottiefiles.com/free-animation/payment-successful-5uXFkB4jix",
    draw(f) {
      let s = R(120, 14, 160, 30, C.navy, 15) + T(200, 34, "Budget: 2 of 4", 15, C.white);
      X.forEach((x, i) => {
        s += f.H("fg" + i, R(x - 48, 110, 96, 128, "none", 14, `stroke="${C.green}" stroke-width="4" class="a-pulse"`));
        s += f.K("cd" + i, R(x - 43, 116, 86, 116, C.white, 12, `stroke="${C.navy2}" stroke-width="2.5"`) + ICO(NM[i][2], x, 152, 1, C.navy2) + T(x, 196, NM[i][0], 13, C.ink) + T(x, 213, NM[i][1], 13, C.ink));
        s += f.H("df" + i, G(`rotate(-14 ${x} 146)`, R(x - 40, 134, 80, 22, "rgba(255,255,255,.94)", 5, `stroke="${C.slate}" stroke-width="2.5"`) + T(x, 150, "DEFERRED", 12, C.slate)));
        s += f.N("vk" + i, x, 252, 11);
      });
      s += f.H("cr", ICO("crown", 344, 106, 0.7));
      for (let k = 0; k < 2; k++) s += f.K("c" + k, ICO("coin", 176 + k * 48, 70, 0.95));
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      const n = s.cards == null ? 4 : s.cards, fund = s.fund || [];
      for (let i = 0; i < 4; i++) {
        c.op("cd" + i, i < n ? (s.hl != null && s.hl !== i ? 0.4 : 1) : 0, { dl: 0.1 * i });
        c.mv("cd" + i, { y: i < n ? 0 : 16, s: s.hl === i ? 1.06 : 1 });
        c.op("fg" + i, has(fund, i) ? 1 : 0, { dl: 0.6 }); c.op("df" + i, has(s.def, i) ? 1 : 0, { dl: 0.5 });
        c.note("vk" + i, s.vk && s.vk[i] ? { t: s.vk[i], c: "S" } : null);
      }
      for (let k = 0; k < 2; k++) {
        const tgt = fund[k];
        c.mv("c" + k, tgt == null ? {} : { x: X[tgt] - (176 + k * 48), y: 30 }, { d: 1, dl: 0.15 * k, e: "bounce.out" });
      }
      c.op("cr", s.crown ? 1 : 0); c.cl("cr", "a-pulse", !!s.crown);
      c.note("nt", s.nt);
    }
  };
}

// template: Interactive Computer Assembly Sequence — https://codepen.io/karlhorning/pen/OJqNMVR
// A concept assembled from its parts: the term on top, its components slide in and lock underneath.
function F_DEFINE(cfg) {
  const parts = cfg.parts, n = parts.length, slot = Math.min(98, 384 / n), w = slot - 10;
  const X = parts.map((_, i) => r1(200 + (i - (n - 1) / 2) * slot));
  const col = NC[cfg.c || "N"];
  return {
    bench: "Interactive Computer Assembly Sequence — https://codepen.io/karlhorning/pen/OJqNMVR",
    draw(f) {
      const tw0 = Math.min(372, tw(cfg.term, 17) + 40);
      let s = f.K("term", R(200 - tw0 / 2, 26, tw0, 44, col, 22) + ICO(cfg.icon || "doc", 200 - tw0 / 2 + 24, 48, 0.62, C.white) + T(200 + 12, 54, cfg.term, 17, C.white));
      parts.forEach((p, i) => {
        const pc = NC[p[3] || "N"];
        s += f.D("ln" + i, `M200 70 C200 100 ${X[i]} 104 ${X[i]} 132`, pc, 2.5);
        s += f.H("hr" + i, R(X[i] - w / 2 - 5, 129, w + 10, 112, "none", 14, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
        s += f.K("p" + i, R(X[i] - w / 2, 134, w, 102, C.white, 12, `stroke="${pc}" stroke-width="2.5"`) + R(X[i] - w / 2, 134, w, 7, pc, 3) + ICO(p[2], X[i], 166, 0.9, pc) + TF(X[i], 206, p[0], 13, w - 8) + TF(X[i], 222, p[1] || "", 13, w - 8));
      });
      s += f.N("nt", 200, 266, 13); s += f.N("n2", 200, 102, 12);
      return s;
    },
    render(c, s) {
      const k = s.n == null ? n : s.n;
      c.mv("term", { s: s.pop ? 1.05 : 1 });
      for (let i = 0; i < n; i++) {
        c.op("p" + i, i < k ? (s.hl != null && s.hl !== i ? 0.4 : 1) : 0, { dl: 0.12 * i });
        c.mv("p" + i, { y: i < k ? 0 : 50, s: s.hl === i ? 1.06 : 1 }, { dl: 0.12 * i });
        c.dr("ln" + i, i < k ? 1 : 0, { dl: 0.12 * i + 0.2 }); c.op("hr" + i, s.hl === i ? 1 : 0);
      }
      c.note("nt", s.nt); c.note("n2", s.n2);
    }
  };
}

// template: Sankey animation - acyclic graph — https://observablehq.com/@joaormendes/sankey-animation-acyclic-graph
// Several influences flowing into one result: a single cause cannot claim the whole outcome.
function F_SANKEY(cfg) {
  const src = cfg.src, Ys = src.map((_, i) => 64 + i * 56), OX = 318, OY = 150;
  return {
    bench: "Sankey animation - acyclic graph — https://observablehq.com/@joaormendes/sankey-animation-acyclic-graph",
    draw(f) {
      let s = "";
      src.forEach((sr, i) => {
        const col = NC[sr[2] || "N"];
        s += f.D("fl" + i, `M150 ${Ys[i]} C230 ${Ys[i]} 220 ${OY + (i - (src.length - 1) / 2) * 12} ${OX - 46} ${OY + (i - (src.length - 1) / 2) * 12}`, col, sr[1], 'stroke-linecap="butt" opacity=".55"');
        s += f.K("s" + i, R(12, Ys[i] - 21, 138, 42, C.white, 10, `stroke="${col}" stroke-width="2.5"`) + ICO(sr[3] || "gear", 32, Ys[i], 0.55, col) + TF(48, Ys[i] + 5, sr[0], 13, 96, C.ink, "start"));
        s += f.H("q" + i, ICO("q", 210, Ys[i] + (OY - Ys[i]) * 0.4, 0.7));
      });
      s += f.K("out", O(OX, OY, 48, C.white, `stroke="${C.coral}" stroke-width="4"`) + ICO(cfg.icon || "growth", OX, OY - 8, 1.1, C.coral) + T(OX, OY + 30, cfg.out, 12, C.coral));
      s += f.N("ttl", 200, 22, 14); s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      const n = s.show == null ? src.length : s.show;
      src.forEach((_, i) => {
        c.op("s" + i, i < n ? (s.hl != null && s.hl !== i ? 0.45 : 1) : 0, { dl: 0.12 * i });
        c.dr("fl" + i, i < n ? 1 : 0, { dl: 0.2 + 0.12 * i });
        c.op("q" + i, s.q === i ? 1 : 0, { dl: 0.5 });
      });
      c.mv("out", { s: s.pop ? 1.08 : 1 });
      c.note("ttl", s.ttl ? { t: s.ttl, c: "N", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: Celonis Process Explorer map — https://help.celonis.com/cpm47/en/process-explorer
// Local optimisation: one department hits its target in the spotlight while the connected parts turn red.
function F_SPOT(cfg) {
  const P4 = [[78, 64], [322, 64], [78, 236], [322, 236]];
  return {
    bench: "Celonis Process Explorer map — https://help.celonis.com/cpm47/en/process-explorer",
    draw(f) {
      let s = R(0, 0, 400, 300, "#22344a");
      s += f.H("cone", F("M170 -10 H230 L292 196 H108 Z", "rgba(255,240,180,.22)"));
      P4.forEach((p, i) => { s += f.K("ln" + i, P(`M200 150 L${p[0]} ${p[1]}`, C.muted, 3, 'stroke-dasharray="6 6" class="a-flow"')); });
      s += f.H("rp", `<g class="a-pulse">${O(200, 150, 92, "none", `stroke="${C.red}" stroke-width="3" opacity=".7"`)}</g>`);
      s += f.K("ctr", R(132, 118, 136, 64, C.white, 14, `stroke="${C.teal}" stroke-width="3"`) + ICO(cfg.center[1], 160, 150, 0.8, C.teal) + T(214, 156, cfg.center[0], 14, C.ink));
      s += f.H("met", chip(200, 202, "Target met", { st: C.green, bg: C.green, fg: C.white, sz: 13, free: 1 }));
      cfg.around.forEach((a, i) => {
        const p = P4[i];
        s += f.K("o" + i, R(p[0] - 70, p[1] - 26, 140, 52, C.white, 12, `stroke="${C.navy2}" stroke-width="2.5"`) + ICO(a[1], p[0] - 50, p[1], 0.6, C.navy2) + TF(p[0] + 12, p[1] + 5, a[0], 13, 104));
        s += f.H("b" + i, R(p[0] - 70, p[1] - 26, 140, 52, "rgba(192,57,43,.2)", 12, `stroke="${C.red}" stroke-width="3"`) + ICO("warn", p[0] + 62, p[1] - 24, 0.6));
      });
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      c.op("cone", s.spot ? 1 : 0); c.op("met", s.met ? 1 : 0, { dl: 0.3 }); c.op("rp", s.rp ? 1 : 0);
      for (let i = 0; i < 4; i++) {
        c.op("o" + i, s.dim ? 0.35 : 1); c.op("b" + i, has(s.bad, i) ? 1 : 0, { dl: 0.2 + 0.2 * i });
        c.sk("ln" + i, has(s.bad, i) ? C.red : C.muted);
      }
      c.note("nt", s.nt);
    }
  };
}

// template: Roadmap / Project schedule — https://lottiefiles.com/free-animation/roadmapproject-schedule-krKjaLHUr0
// The assessed forum week: post by mid-week, reply to two peers (one disagreement), read the summary.
function F_FORUM() {
  const DX = [40, 93, 147, 200, 253, 307, 360], DN = ["M", "T", "W", "T", "F", "S", "S"];
  return {
    bench: "Roadmap / Project schedule — https://lottiefiles.com/free-animation/roadmapproject-schedule-krKjaLHUr0",
    draw(f) {
      let s = P("M40 34 H360", C.line, 4) + DX.map((x, i) => O(x, 34, 8, C.white, `stroke="${C.navy2}" stroke-width="2.5"`) + T(x, 16, DN[i], 12, C.slate)).join("");
      s += f.H("mid", ICO("flag", 200, 30, 0.75) + chip(200, 60, "Post by mid-week", { st: C.coral, sz: 11, free: 1 }));
      s += f.K("day", O(40, 34, 11, C.coral, `stroke="${C.white}" stroke-width="3"`));
      s += f.H("post", R(12, 80, 176, 88, C.white, 12, `stroke="${C.navy}" stroke-width="2.5"`) + ICO("person", 36, 104, 0.8, C.navy) + T(56, 109, "Your position", 13, C.ink, "", "start") + P("M28 132 H170 M28 146 H150", C.line, 5));
      s += f.H("ev", chip(100, 178, "Concepts + evidence", { st: C.teal, sz: 11, free: 1 }));
      for (let i = 0; i < 2; i++) {
        const y = 80 + i * 78;
        s += f.H("p" + i, R(212, y, 176, 62, C.white, 12, `stroke="${C.slate}" stroke-width="2"`) + ICO("person", 234, y + 22, 0.7, [C.plum, C.gold][i]) + T(252, y + 27, "Peer " + (i + 1), 13, C.ink, "", "start") + P(`M228 ${y + 46} H368`, C.line, 5));
        s += f.D("r" + i, `M188 ${124} C200 ${124} 200 ${y + 31} 210 ${y + 31}`, C.teal, 3);
      }
      s += f.H("dis", chip(330, 228, "Reasoned disagreement", { st: C.red, sz: 11 }));
      s += f.H("sum", R(12, 200, 176, 56, C.cream, 12, `stroke="${C.gold}" stroke-width="2.5"`) + ICO("doc", 34, 228, 0.7, C.amber) + T(54, 225, "Facilitator", 13, C.ink, "", "start") + T(54, 242, "summary", 13, C.ink, "", "start"));
      s += f.H("pct", O(336, 268, 25, C.coral) + T(336, 274, "15%", 16, C.white));
      s += f.H("lo", chip(244, 262, "K1 · K2 · S1", { st: C.plum, sz: 12, free: 1 }));
      s += f.N("nt", 200, 288, 12);
      return s;
    },
    render(c, s) {
      const d = s.day == null ? 0 : s.day;
      c.mv("day", { x: DX[clamp(d, 0, 6)] - 40 }, { d: 1 });
      c.op("mid", s.mid ? 1 : 0); c.op("post", s.post ? 1 : 0); c.op("ev", s.ev ? 1 : 0, { dl: 0.3 });
      for (let i = 0; i < 2; i++) { c.op("p" + i, (s.peers || 0) > i ? 1 : 0, { dl: 0.15 * i }); c.dr("r" + i, (s.rep || 0) > i ? 1 : 0, { dl: 0.3 + 0.2 * i }); }
      c.op("dis", s.dis ? 1 : 0, { dl: 0.5 }); c.op("sum", s.sum ? 1 : 0); c.op("pct", s.pct ? 1 : 0); c.op("lo", s.lo ? 1 : 0, { dl: 0.2 });
      c.note("nt", s.nt);
    }
  };
}

// template: Success — https://lottiefiles.com/free-animation/success-he8DVHwbzM
// Delivery versus benefit: the change is installed (tick) but the benefit meter needs evidence, with owners for each.
function F_BENEFIT(cfg = {}) {
  return {
    bench: "Success — https://lottiefiles.com/free-animation/success-he8DVHwbzM",
    draw(f) {
      let s = R(26, 64, 140, 122, C.white, 14, `stroke="${C.navy2}" stroke-width="2.5"`) + ICO("gear", 96, 112, 1.3, C.navy2) + T(96, 168, cfg.left || "Delivered", 15, C.navy2);
      s += f.H("dk", ICO("check", 150, 72, 0.9));
      s += f.D("ar", "M172 126 H226", C.slate, 4); s += f.H("ah", arrowHead(232, 126, 0, C.slate));
      s += f.H("mg", ICO("mag", 200, 100, 0.8, C.ink));
      s += R(262, 40, 44, 160, C.white, 22, `stroke="${C.green}" stroke-width="3"`) + O(284, 206, 24, C.white, `stroke="${C.green}" stroke-width="3"`);
      s += f.K("mf", R(270, 48, 28, 148, C.green, 14), `data-pv="284 196"`) + O(284, 206, 18, C.green);
      s += f.H("mq", T(284, 132, "?", 40, C.coral, 'class="a-pulse"'));
      s += T(284, 26, cfg.right || "Benefit", 15, C.green);
      s += f.H("m2", R(334, 70, 30, 120, C.white, 15, `stroke="${C.red}" stroke-width="2.5"`) + R(340, 146, 18, 38, C.red, 9) + T(349, 58, cfg.m2 || "Rating", 12, C.red) + P("M372 120 V160", C.red, 3) + arrowHead(372, 166, 90, C.red));
      s += f.N("ol", 96, 220, 12); s += f.N("or", 284, 252, 12);
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      c.op("dk", s.done ? 1 : 0); c.dr("ar", s.ar ? 1 : 0); c.op("ah", s.ar ? 1 : 0, { dl: 0.6 }); c.op("mg", s.mg ? 1 : 0);
      c.mv("mf", { sy: Math.max(0.02, s.meter || 0), pv: [284, 196] }, { d: 1.2 });
      c.op("mq", s.q ? 1 : 0); c.op("m2", s.m2 ? 1 : 0);
      c.note("ol", s.own ? { t: cfg.lo || "Programme manager", c: "N" } : null); c.note("or", s.own ? { t: cfg.ro || "Line owner", c: "G", f: 1 } : null, { dl: 0.2 });
      c.note("nt", s.nt);
    }
  };
}

// =====================================================================
// W5O1a · Why the framework begins with strategy (34 narration lines)
// Story: Qasr's tired traveller -> three directors, one budget -> the BPM
// road starts at Organization Strategy -> three objectives in tension ->
// agreement before design -> a useful saving deferred, value kept -> traceable.
// =====================================================================
{
  const id = "W5O1a";
  const plan = [
    ["title", { k: "OPER621 · Week 5", t1: "Organization", t2: "Strategy", sub: "First phase of BPM", orb: 1 }, "Week 5: Organization Strategy"],
    ["desk", { n: 1, staff: 3, wait: "3 min", stars: 5, mood: "happy", nt: { t: "Connected work serves guests", c: "G" } }, "Better outcomes for customers"],
    ["ask", { q: "How do we know which improvements an organisation should pursue?", o: ["Faster check-in", "Lower costs", "Corporate billing"], oc: ["T", "A", "O"] }, "Which improvements first?"],
    ["desk", { n: 3, staff: 2, wait: "9 min", stars: 3, nt: "Back to Qasr Marina" }, "Back to Qasr Hospitality"],
    ["desk", { n: 5, staff: 1, wait: "25 min", stars: 2, mood: "sad", alerts: ["Booking delay", "Rate check", "Room not ready"], nt: { t: "Tired business traveller", c: "R" } }, "The traveller's difficult arrival"],
    ["board", { on: 3, coins: 2, jl: "Next year's budget", nt: "Management team meets" }, "Deciding where to invest"],
    ["board", { on: 3, spk: 0, also: [1], say: ["Faster check-in", "Lower costs"] }, "Operations versus finance"],
    ["board", { on: 3, spk: 2, also: [0, 1], say: ["Faster check-in", "Lower costs", "Reliable billing"], tug: true, nt: { t: "Cannot fund every proposal", c: "R" } }, "Three directors, three asks"],
    ["board", { on: 3, say: ["Real benefit", "Real benefit", "Real benefit"], coins: 2, jl: "Only so much", nt: "Each concern is reasonable" }, "Every ask has merit"],
    ["ask", { q: "If every proposal offers a benefit, how should Qasr decide which deserves funding?", o: ["Limited resources", "Competing ambitions"], oc: ["R", "R"] }, "Equal benefit, unequal priority"],
    ["route", { lit: 1, at: 0, first: 1, l0: 1, l1: 1, lr: 1, gate: 1 }, "The framework starts with strategy"],
    ["route", { lit: 1, at: 0, first: 1, l0: 1, star: 1, nt: "What Qasr wants to achieve" }, "Strategy: where Qasr is heading"],
    ["define", { n: 0, nt: { t: "More than a vision statement", c: "R" } }, "Not just a vision statement"],
    ["define", { n: 4, nt: { t: "Specific enough to decide", c: "G" } }, "Ambitions made usable"],
    ["obj", { show: 1, hl: 0, nt: "Highest-rated for service" }, "Objective 1: service leadership"],
    ["obj", { show: 3, nt: "Three published objectives" }, "Cost −10%, corporate accounts +25%"],
    ["obj", { show: 3, prop: "One improvement", links: [3, 1, 1], sign: [1, 0, 0], wl: ["Serves", "Maybe", "Maybe"] }, "One gain, unequal effects"],
    ["desk", { n: 4, staff: 1, wait: "18 min", stars: 3, mood: "sad", cost: "Labour −20%", cc: "G", nt: { t: "Fewer reception staff", c: "R" } }, "Cheaper, but less personal"],
    ["obj", { show: 3, prop: "Cut reception staff", links: [2, 3, 0], sign: [-1, 1, 0], wl: ["Risk", "Saves", "None"], ok: [1], ten: 1 }, "The saving looks attractive"],
    ["ask", { q: "Could an efficient process actually move Qasr away from its chosen strategy?", o: ["Faster", "Cheaper", "Off course?"], oc: ["G", "G", "R"] }, "Efficient, yet off course?"],
    ["desk", { n: 1, staff: 1, wait: "4 min", stars: 2, mood: "sad", cost: "Cost −20%", cc: "G", alerts: ["Faster", "Cheaper", "Rating down"], acs: ["G", "G", "R"] }, "Better process, weaker position"],
    ["desk", { n: 1, staff: 1, wait: "4 min", stars: 2, mood: "sad", cost: "Cost −20%", cc: "G", alerts: ["Faster", "Cheaper", "Rating down"], acs: ["G", "G", "R"], nt: { t: "Efficiency is not priority", c: "R" } }, "Efficiency does not set priority"],
    ["chain", { up: 4, dr: 3, at: 3, good: [3], ttl: "Strategic alignment" }, "Alignment links decisions to objectives"],
    ["chain", { up: 2, dr: 1, hl: 1, ttl: "Shared understanding", nt: "Agree what objectives mean" }, "Executives agree on meaning"],
    ["chain", { up: 4, dr: 3, at: 1, hl: 1, ttl: "Agreement before design", nt: { t: "Disagreement found early", c: "G" } }, "Settle disagreement before design"],
    ["board", { on: 3, say: ["Guest experience", "Cost: later", "Corporate growth"], coins: 2, jl: "Agreed priorities", nt: "Steering group agrees" }, "Priorities: experience and growth"],
    ["vs", { show: "a", va: "x", nt: { t: "Loudest voice wins", c: "R" } }, "Not the most forceful director"],
    ["budget", { fund: [0, 2], def: [1], hl: 1, nt: "Useful saving, deferred" }, "A cost saving can wait"],
    ["budget", { fund: [0, 2], def: [1], vk: ["", "Value kept"], nt: { t: "Deferred is not worthless", c: "S" } }, "Deferring is not denying value"],
    ["vs", { show: "ab", va: "x", vb: "ok" }, "Scarce resources follow direction"],
    ["budget", { fund: [0, 2], def: [1, 3], nt: { t: "Strategy can say no", c: "R" } }, "Decisions constrain later work"],
    ["chain", { up: 4, dr: 3, at: 0, good: [3], ttl: "Traceable decisions", nt: "Why this process was funded" }, "Keep decisions traceable"],
    ["obj", { show: 3, ok: [0, 1, 2], nt: "Next: make them measurable" }, "Next: measurable objectives"],
    ["ask", { q: "Before asking how to improve a process, can you explain which strategic objective that improvement should serve?", o: ["Service", "Cost", "Growth"], oc: ["T", "A", "O"] }, "Which objective does it serve?"]
  ];
  window.VL_SCENES["W5O1a"] = makeScene({
    id, bg: "#f4efe5", plan,
    desc: "Qasr's directors compete for one budget; the BPM road begins at Organization Strategy, which turns three objectives into agreed criteria for choosing, deferring and tracing improvements.",
    fams: {
      title: F_TITLE({ icon: "compass", col: C.navy }), // template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
      desk: F_DESK({ sign: "Qasr Marina" }), // template: Waiting Queue — https://lottiefiles.com/free-animation/waiting-queue-xoNutPl764
      ask: F_ASK(), // template: Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD
      board: F_BOARD({ who: [["Operations", "T"], ["Finance", "A"], ["Commercial", "O"], ["Spa", "P"]] }), // template: Business Analytics Meeting — https://lottiefiles.com/free-animation/business-analytics-C1COKzrIkL
      route: F_ROUTE(), // template: Map Route Animation — https://lottiefiles.com/free-animation/map-route-animation-gMVg8kCqCD
      define: F_DEFINE({ term: "Organization Strategy", icon: "compass", c: "N", parts: [["Ambitions", "made specific", "target", "T"], ["Agreed", "criteria", "ruler", "N"], ["Choose", "improvements", "scale", "A"], ["Guide", "the design", "map", "P"]] }), // template: Interactive Computer Assembly Sequence — https://codepen.io/karlhorning/pen/OJqNMVR
      obj: F_OBJ(), // template: Infographics Pack by ARstudio — https://motionarray.com/after-effects-templates/infographics-pack-135055/
      chain: F_CHAIN({ nodes: [["Published", "strategy", "doc"], ["Executive", "agreement", "people"], ["Improvement", "criteria", "ruler"], ["Process", "decisions", "gear", "G"]] }), // template: Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO
      budget: F_BUDGET(), // template: Payment Successful — https://lottiefiles.com/free-animation/payment-successful-5uXFkB4jix
      vs: F_VS({ a: { t: "Without alignment", icon: "people", c: "R", items: ["Loudest director", "Isolated benefits", "Every opportunity"] }, b: { t: "With alignment", icon: "compass", c: "G", items: ["Agreed objectives", "Resource limits", "Explicit trade-offs"] } }) // template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
    }
  });
}


// =====================================================================
// W5O1b · From strategic intent to process measures (30 narration lines)
// Story: "service leadership" read two ways -> intent becomes observable
// arrival measures -> a fast but unwelcoming desk -> cost per occupied room,
// baseline 400 and target 360 -> growth outcome vs process measures ->
// several causes -> the measure card (definition, source, owner, period).
// =====================================================================
{
  const id = "W5O1b";
  const plan = [
    ["title", { k: "Week 5 · Lesson 1", t1: "From strategic intent", t2: "to process measures", sub: "Make ambitions observable" }, "From intent to measures"],
    ["intent", { n: 0, nt: { t: "What exactly should change?", c: "R" } }, "Broad ambitions, vague instructions"],
    ["ask", { q: "What would service leadership actually require Qasr's processes to deliver?", o: ["Shorter queues?", "Personal attention?", "Accurate bookings?"] }, "What does service leadership need?"],
    ["intent", { n: 2, hl: 0, n2: "Reception manager vs guest relations" }, "Queues or personal attention?"],
    ["intent", { n: 2, n2: "Different investments and staffing", nt: { t: "An unclear mandate", c: "R" } }, "Same objective, two readings"],
    ["meas", { up: 1, dr: 0, ttl: "Strategic intent", nt: "Must become operationally meaningful" }, "Intent must become measurable"],
    ["meas", { up: 1, hl: 0, ttl: "Strategic intent", nt: "Direction and position sought" }, "Intent: the direction chosen"],
    ["meas", { up: 4, dr: 0, hl: 2, dim: 1, ttl: "Process measure", nt: "An observable performance indicator" }, "A process measure is observable"],
    ["meas", { up: 4, dr: 3, at: 3, ttl: "Making service measurable" }, "Waiting, accuracy, feedback"],
    ["gauge", { val: [0.45, 0.5, 0.45], txt: ["6 min", "97%", "4.4 / 5"], ttl: "Arrival measures", nt: "Different aspects of performance" }, "Fast is not always welcoming"],
    ["desk", { n: 1, staff: 2, wait: "3 min", rush: 1, stars: 2, mood: "sad", alerts: ["Rushed talk", "Guest ignored"], nt: { t: "Quick, but not welcoming", c: "R" } }, "Rushing hides poorer service"],
    ["gauge", { val: [0.85, 0.15, -0.7], txt: ["3 min", "91%", "2.6 / 5"], warn: [2], ttl: "Read them together", nt: { t: "Not one convenient indicator", c: "R" } }, "A balanced view of success"],
    ["frac", { stage: 0, nt: "Goal: 10% lower" }, "Cost per occupied room"],
    ["frac", { stage: 1, nt: "Cost relative to activity" }, "Cost ÷ occupied room-nights"],
    ["frac", { stage: 2, rv: "Cost / night", nt: { t: "Spend tracks occupancy", c: "A" } }, "Why not total spending?"],
    ["frac", { stage: 3, rv: "400 AED", bT: "400" }, "Baseline: documented start"],
    ["frac", { stage: 4, rv: "400 AED", bT: "400", cut: 1, calc: "400 × (1 − 0.10) = 360 AED" }, "Target: 360 AED"],
    ["frac", { stage: 4, rv: "400 AED", bT: "400", cut: 1, calc: "400 × (1 − 0.10) = 360 AED", nt: { t: "Illustrative: verify data", c: "P" } }, "Real targets need verified data"],
    ["frac", { stage: 4, rv: "400 AED", bT: "400", cut: 1, warn: 1, calc: "Not at service's expense", cc: "R" }, "Savings cannot override service"],
    ["ask", { q: "What additional evidence would you examine before celebrating a reduction in room operating costs?", o: ["Guest feedback", "Waiting time", "Booking accuracy"], oc: ["O", "T", "N"] }, "What else would you check?"],
    ["growth", { up: 1, ttl: "Corporate growth +25%", nt: { t: "More accounts is an outcome", c: "O" } }, "Growth is a result, not a process"],
    ["growth", { up: 4, dr: 3, at: 3, ttl: "Connecting growth to process" }, "Quotes, contracts, billing"],
    ["growth", { up: 4, dr: 3, hl: 0, dim: 1, nt: "Indicators explain, not replace" }, "Indicators support the goal"],
    ["growth", { up: 4, dr: 3, hl: 0, dim: 1, ttl: { t: "Strategic outcome", c: "O", f: 1 }, nt: "Is Qasr achieving its ambition?" }, "Outcome measure"],
    ["growth", { up: 4, dr: 3, hl: 2, good: [2, 3], ttl: { t: "Process performance", c: "N", f: 1 }, nt: "Work managers can improve" }, "Process measures"],
    ["sankey", { show: 4, q: 0, ttl: "Test the link, don't assume" }, "Several factors drive results"],
    ["doc", { rows: 4, ok: "all", nt: "Definition, source, owner, period" }, "Every measure needs an owner"],
    ["doc", { scat: 1, nt: { t: "Incompatible figures", c: "R" } }, "Otherwise departments' figures clash"],
    ["doc", { rows: 4, ok: "all", stamp: "A", nt: "Evidence tied to objectives" }, "Ready for evidence-based debate"],
    ["ask", { q: "Can you connect a strategic ambition to a meaningful process measure without confusing activity with organisational success?", o: ["Ambition", "Measure", "Success"], oc: ["T", "N", "G"] }, "Activity is not success"]
  ];
  window.VL_SCENES["W5O1b"] = makeScene({
    id, bg: "#eef3f6", plan,
    desc: "Qasr's service, cost and growth ambitions become observable measures: arrival gauges, cost per occupied room with a 400 to 360 AED target, outcome versus process measures, and a measure card.",
    fams: {
      title: F_TITLE({ icon: "ruler", col: C.navy2 }), // template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
      intent: F_DEFINE({ term: "Highest regional service rating", icon: "star", c: "T", parts: [["Shorter", "queues", "clock", "T"], ["Personal", "attention", "people", "P"], ["Accurate", "bookings", "doc", "N"], ["Guest", "feedback", "chat", "O"]] }), // template: Interactive Computer Assembly Sequence — https://codepen.io/karlhorning/pen/OJqNMVR
      ask: F_ASK(), // template: Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD
      meas: F_CHAIN({ nodes: [["Service", "leadership", "star", "T"], ["Guest arrival", "experience", "guest"], ["Waiting time", "and accuracy", "clock"], ["Guest", "feedback", "chat", "O"]] }), // template: Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO
      gauge: F_GAUGE({ g: [["Waiting time", "T"], ["Booking accuracy", "N"], ["Guest feedback", "O"]] }), // template: Animated Dashboards — https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ
      desk: F_DESK({ sign: "Qasr Marina" }), // template: Waiting Queue — https://lottiefiles.com/free-animation/waiting-queue-xoNutPl764
      frac: F_FRAC({ num: "Relevant operating cost", den: "Occupied room-nights", res: "Cost / night", resl: "per occupied room", base: [1, "Baseline 400 AED"], tgt: [0.9, "Target 360 AED"] }), // template: Bar chart transitions — https://observablehq.com/@d3/bar-chart-transitions/2
      growth: F_CHAIN({ nodes: [["Corporate", "growth 25%", "growth", "O"], ["Sales and", "contracting", "handshake"], ["Quotation", "turnaround", "clock"], ["Billing", "accuracy", "invoice"]] }), // template: Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO
      sankey: F_SANKEY({ out: "Corporate growth", icon: "growth", src: [["Billing accuracy", 12, "N", "invoice"], ["Sales activity", 18, "T", "handshake"], ["Pricing", 10, "A", "coin"], ["Market demand", 16, "P", "chart"]] }), // template: Sankey animation - acyclic graph — https://observablehq.com/@joaormendes/sankey-animation-acyclic-graph
      doc: F_DOC({ title: "Measure card", rows: [["Clear definition", "ruler"], ["Data source", "doc"], ["Accountable owner", "person"], ["Review period", "calendar"]] }) // template: contract process — https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8
    }
  });
}


// =====================================================================
// W5O1c · Making strategic objectives usable (33 narration lines)
// Story: four departments, one agreed word "service" -> an uncut key opens
// nothing -> cut 1 result (rating basis), cut 2 criteria (guest expectations),
// cost target = baseline x 0.90, cut 3 strategic constraint (service
// safeguard), growth across four processes, cut 4 sponsor authority -> opens.
// =====================================================================
{
  const id = "W5O1c";
  const Q90 = "Target = Baseline × 0.90";
  const plan = [
    ["title", { k: "Week 5 · Lesson 1", t1: "Making strategic", t2: "objectives usable", sub: "Agreed meaning guides decisions" }, "Making objectives usable"],
    ["key", { cuts: 0, nt: "Agreed by all, opens nothing" }, "From ambition to instruction"],
    ["ask", { q: "How can Qasr make consistent decisions when every department believes its improvement deserves attention?", o: ["Reception", "Housekeeping", "Finance", "Corporate sales"], oc: ["T", "N", "A", "O"] }, "Four departments, one budget"],
    ["board", { on: 4, say: ["Service matters", "", "Service matters", ""], also: [0, 2], nt: "Agreed in words" }, "Everyone agrees service matters"],
    ["board", { on: 4, spk: 0, also: [2], say: ["More guest staff", "", "Automate labour", ""], tug: 1, nt: { t: "Both claim alignment", c: "R" } }, "Agreement is not yet enough"],
    ["key", { cuts: 0, inLock: 1, fail: 1, legend: 1, nt: { t: "Uncut objective fails", c: "R" } }, "Interpret before investing"],
    ["key", { cuts: 0, legend: 1, nt: "Result, measure, boundary, authority" }, "What a usable objective states"],
    ["rating", { up: 1, ttl: "Clarifying service leadership", nt: "An agreed basis for comparison" }, "Leadership compared with whom?"],
    ["rating", { up: 4, dr: 3, at: 3, ttl: "Clarifying service leadership" }, "Which rating, which rivals, when"],
    ["key", { cuts: 1, at: 0, hl: 0, legend: 1, nt: { t: "Or many versions of success", c: "R" } }, "Cut 1: define the result"],
    ["crit", { up: 2, dr: 1, ttl: "From objective to criteria" }, "What do guests actually value?"],
    ["crit", { up: 4, dr: 3, at: 3, nt: "Reliable · clear · personal · quick" }, "Reliability, clarity, attention"],
    ["key", { cuts: 2, at: 1, hl: 1, legend: 1, nt: "Criteria judge each proposal" }, "Cut 2: evaluation criteria"],
    ["ask", { q: "Would you approve faster check-in if guests became less confident about their reservations?", o: ["Shorter queue", "Less confidence"], oc: ["G", "R"] }, "Faster, but more confusing?"],
    ["frac", { stage: 2, rv: "Cost / night", nt: "The 10% needs meaning" }, "Interpreting the cost objective"],
    ["frac", { stage: 4, rv: "Cost / night", cut: 1, calc: Q90, nt: "Which costs count?" }, "Agree costs and occupancy data"],
    ["frac", { stage: 4, rv: "Cost / night", cut: 1, warn: 1, calc: Q90, nt: { t: "Rule change ≠ saving", c: "R" } }, "Real savings, not accounting"],
    ["scale", { t: -0.7, nl: 2, nr: 2, ttl: "Strategic boundaries", mid: { t: "Cheaper may cost service", c: "R" } }, "Savings versus service"],
    ["key", { cuts: 3, at: 2, hl: 2, legend: 1, nt: "A condition to respect" }, "Cut 3: a strategic constraint"],
    ["scale", { t: 0, nl: 2, nr: 2, guard: "Service standards", ttl: "Strategic constraint", mid: "Savings must keep standards" }, "Protect agreed guest standards"],
    ["scale", { t: 0, nl: 2, nr: 2, guard: "Proposed rule", ttl: "Strategic constraint", mid: { t: "Policy only once sponsors approve", c: "P" } }, "A proposal until sponsors approve"],
    ["growth", { up: 1, ttl: "Making growth actionable" }, "Growth needs the same discipline"],
    ["growth", { up: 4, dr: 3, at: 3, ttl: "Making growth actionable", nt: "Each team sees its part" }, "Sales, reservations, billing"],
    ["growth", { up: 4, dr: 3, hl: 1, dim: 1, nt: { t: "Faster quotes, accurate contracts?", c: "A" } }, "Speed without contract errors?"],
    ["scale", { t: 0, nl: 2, nr: 2, guard: "Safeguards", ttl: "Measures + safeguards", mid: "Guard against side effects" }, "Measures need safeguards"],
    ["key", { cuts: 4, at: 3, hl: 3, sp: 1, legend: 1, nt: "Authority to settle conflicts" }, "Cut 4: sponsor authority"],
    ["key", { cuts: 4, sp: 1, legend: 1, nt: { t: "Owners recommend, sponsors decide", c: "P" } }, "Owners recommend, sponsors decide"],
    ["vs", { show: "a", va: "x" }, "Ambiguous objective"],
    ["vs", { show: "ab", va: "x", vb: "ok", nt: "Documented, applied consistently" }, "Usable, documented criteria"],
    ["vs", { show: "ab", hl: "b", vb: "w", nt: { t: "Judgement is still needed", c: "P" } }, "Numbers do not decide alone"],
    ["key", { cuts: 4, inLock: 1, open: 1, sp: 1, legend: 1, nt: { t: "Transparent, explainable choices", c: "G" } }, "Judgement made transparent"],
    ["key", { cuts: 4, inLock: 1, open: 1, legend: 1, nt: "Ready to compare proposals" }, "Ready to compare proposals"],
    ["ask", { q: "Can you explain what evidence and decision rules would make a strategic objective genuinely usable?", o: ["Evidence", "Decision rules", "Next: fund two"], oc: ["T", "N", "O"] }, "Next: only two can be funded"]
  ];
  window.VL_SCENES["W5O1c"] = makeScene({
    id, bg: "#eaf1ef", plan,
    desc: "A shared objective is a blank key; Qasr cuts it with a defined result, evaluation criteria, a strategic constraint and sponsor authority until it can guide improvement decisions.",
    fams: {
      title: F_TITLE({ icon: "key", col: C.teal }), // template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
      key: F_KEY(), // template: Multi-Step Icon Animation — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
      ask: F_ASK(), // template: Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD
      board: F_BOARD({ who: [["Reception", "T"], ["Housekeeping", "N"], ["Finance", "A"], ["Corporate sales", "O"]] }), // template: Business Analytics Meeting — https://lottiefiles.com/free-animation/business-analytics-C1COKzrIkL
      rating: F_CHAIN({ nodes: [["Service", "ambition", "star", "T"], ["Rating", "definition", "ruler"], ["Comparison", "basis", "scale"], ["Review", "period", "calendar"]] }), // template: Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO
      crit: BENCH(F_CHAIN({ nodes: [["Service", "leadership", "star", "T"], ["Guest", "expectations", "guest"], ["Arrival", "requirements", "clock"], ["Improvement", "criteria", "ruler", "G"]] }), "Workflow Animation — https://dribbble.com/shots/3791748-Workflow-Animation"), // template: Workflow Animation — https://dribbble.com/shots/3791748-Workflow-Animation
      frac: F_FRAC({ num: "Agreed cost definition", den: "Verified occupancy", res: "Cost / night", resl: "consistent definition", base: [1, "Verified baseline cost"], tgt: [0.9, "Target: 10% lower"] }), // template: Bar chart transitions — https://observablehq.com/@d3/bar-chart-transitions/2
      scale: F_SCALE({ L: { t: "Cost saving", c: "A", items: ["Lower labour", "Cheaper process"] }, R: { t: "Service outcome", c: "T", items: ["Guest standards", "Personal attention"] } }), // template: Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p
      growth: BENCH(F_CHAIN({ nodes: [["Corporate", "growth 25%", "growth", "O"], ["Sales and", "contracting", "handshake"], ["Reservations", "and delivery", "bed"], ["Billing and", "relationships", "invoice"]] }), "Sankey particles generation — https://observablehq.com/@joaormendes/sankey-animation-particles-generation"), // template: Sankey particles generation — https://observablehq.com/@joaormendes/sankey-animation-particles-generation
      vs: F_VS({ a: { t: "Ambiguous objective", icon: "warn", c: "R", items: ["Own definitions", "Departmental pull", "Endless renegotiation"] }, b: { t: "Usable objective", icon: "key", c: "G", items: ["Agreed measures", "Strategic limits", "Authorised criteria"] } }) // template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
    }
  });
}

})();
// END w05-claude-part1.js

// OPER621 · Week 5 · Organization Strategy · animated teaching scenes, version 1 (claude)
// File: w05-claude-part2.js · Sections: W5O2a, W5O2b, W5O2c
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }.
// step(i, n): one plan entry per narration line of the section (n = number of
// lines maps 1:1; any other n is mapped proportionally). Absolute states, so
// repeated, skipped and backward steps render the same picture.
// Each section uses 8-10 shot families (distinct pictures); every family names
// its benchmark template in a "// template: <name> — <url>" comment.
// Standalone: every helper is defined below; CSS goes once into
// <style id="vl-sc-w05">, all rules scoped under .vls-w05-<secId>.
// GSAP is used when window.gsap exists, CSS transitions otherwise;
// prefers-reduced-motion renders end states without animation.
(() => {
"use strict";
const PART = "p2";
// ===== shared engine (identical copy in every Week 5 part; each part runs standalone) =====
window.VL_SCENES = window.VL_SCENES || {};
const REG = window.VL_SCENES;
const C = {
  ink: "#1b2a3a", navy: "#1f4e79", navy2: "#2d6a9f", teal: "#178f80", gold: "#d39418", coral: "#de5a3a",
  red: "#c0392b", green: "#2e8b57", plum: "#7a5aa6", slate: "#5d7389", muted: "#a3b3c2", line: "#cfd8e0",
  paper: "#fffdf7", white: "#ffffff", sky: "#e8f1f8", sand: "#f5eddd", mint: "#e2f3eb", rose: "#fbe4dd",
  lilac: "#eee8f6", cream: "#fff4dc", night: "#16304d", amber: "#a8741a", skin: "#f0c9a6", wood: "#b9814f"
};
// Objective colours used all week: service = teal, cost = gold, corporate growth = coral.
const OC = [C.teal, C.gold, C.coral];
const OBJN = ["Service", "Cost", "Growth"];
const NC = { N: C.navy, R: C.red, G: C.green, O: C.coral, P: C.plum, T: C.teal, A: C.amber, S: C.slate };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const num = (v, f) => { const x = Number(v); return Number.isFinite(x) ? x : f; };
const RM = () => { try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; } };
const GS = () => (!RM() && window.gsap && typeof window.gsap.to === "function" && typeof window.gsap.set === "function") ? window.gsap : null;
const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");
const r1 = (v) => Math.round(v * 10) / 10;
const has = (arr, v) => Array.isArray(arr) && arr.indexOf(v) > -1;
const tw = (s, sz) => Math.round(String(s).length * sz * 0.58 + sz * 1.5);
function wrap(s, max) {
  const words = String(s || "").split(/\s+/).filter(Boolean), out = [];
  let cur = "";
  words.forEach((w) => { if (!cur) cur = w; else if ((cur + " " + w).length <= max) cur += " " + w; else { out.push(cur); cur = w; } });
  if (cur) out.push(cur);
  return out;
}

// ---- SVG string builders ----
const R = (x, y, w, h, f, rx = 0, ex = "") => `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${rx}" fill="${f}" ${ex}/>`;
const O = (cx, cy, r, f, ex = "") => `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}" fill="${f}" ${ex}/>`;
const E = (cx, cy, rx, ry, f, ex = "") => `<ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="${f}" ${ex}/>`;
const P = (d, s, w = 2, ex = "") => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const F = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
const T = (x, y, s, sz = 14, f = C.ink, ex = "", a = "middle") => `<text x="${r1(x)}" y="${r1(y)}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const G = (tr, body, ex = "") => `<g transform="${tr}" ${ex}>${body}</g>`;
// Text that shrinks (never below 9) so it fits the given width.
const fitSz = (s, max, wid) => Math.max(9, Math.min(max, Math.floor(10 * wid / Math.max(1, String(s).length * 0.58)) / 10));
const TF = (x, y, s, max, wid, f = C.ink, a = "middle") => T(x, y, s, fitSz(s, max, wid), f, "", a);
const chip = (x, y, s, o = {}) => {
  const sz = o.sz || 13, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.95);
  const cx = o.free ? x : clamp(x, w / 2 + 3, 397 - w / 2);
  return R(cx - w / 2, y - h / 2, w, h, o.bg || C.white, o.rx == null ? h / 2 : o.rx,
    `stroke="${o.st || C.navy}" stroke-width="${o.sw || 2}"${o.dash ? ' stroke-dasharray="5 4"' : ""}`) +
    T(cx, y + sz * 0.36, s, sz, o.fg || o.st || C.navy);
};
const arrowHead = (x, y, ang, col, s = 1) => {
  const a = ang * Math.PI / 180, l = 9 * s, w = 5.5 * s;
  const p1 = [x - Math.cos(a) * l + Math.sin(a) * w, y - Math.sin(a) * l - Math.cos(a) * w];
  const p2 = [x - Math.cos(a) * l - Math.sin(a) * w, y - Math.sin(a) * l + Math.cos(a) * w];
  return F(`M${r1(x)} ${r1(y)} L${r1(p1[0])} ${r1(p1[1])} L${r1(p2[0])} ${r1(p2[1])} Z`, col);
};

// ---- icon library (each icon fits a 40 x 40 box centred on 0,0) ----
function ICO(name, x, y, s = 1, col = C.navy) {
  const g = (b) => `<g transform="translate(${r1(x)} ${r1(y)}) scale(${s})">${b}</g>`;
  const W = C.white;
  switch (name) {
    case "star": return g(F("M0 -18 L5.3 -6.5 L17.8 -5.6 L8.3 2.6 L11.2 14.8 L0 8.3 L-11.2 14.8 L-8.3 2.6 L-17.8 -5.6 L-5.3 -6.5 Z", col));
    case "coin": return g(O(0, 0, 16, C.gold, `stroke="${C.amber}" stroke-width="2.5"`) + O(0, 0, 9.5, "none", `stroke="#fff1c7" stroke-width="2.2"`));
    case "costdown": return g(O(-5, -2, 13, C.gold, `stroke="${C.amber}" stroke-width="2.2"`) + O(-5, -2, 7, "none", `stroke="#fff1c7" stroke-width="2"`) + P("M12 -6 V14 M6 8 L12 15 L18 8", C.red, 3.5));
    case "growth": return g(R(-16, 4, 8, 12, col, 1.5) + R(-5, -3, 8, 19, col, 1.5) + R(6, -10, 8, 26, col, 1.5) + P("M-17 -6 L-4 -14 L4 -9 L16 -19", C.green, 3) + arrowHead(17, -19.5, -35, C.green));
    case "guest": return g(O(-4, -13, 6.5, col) + F("M-15 16 Q-15 -3 -4 -3 Q7 -3 7 16 Z", col) + R(8, 0, 11, 15, C.wood, 2) + P("M11 0 V-4 H16 V0", C.ink, 1.6));
    case "person": return g(O(0, -11, 7.5, col) + F("M-13 17 Q-13 -1 0 -1 Q13 -1 13 17 Z", col));
    case "sponsor": return g(O(0, -11, 7.5, col) + F("M-13 17 Q-13 -1 0 -1 Q13 -1 13 17 Z", col) + F("M0 3 L2.4 8 L7.6 8.4 L3.6 11.6 L5 16.6 L0 13.8 L-5 16.6 L-3.6 11.6 L-7.6 8.4 L-2.4 8 Z", C.gold));
    case "people": return g(O(-11, -7, 5.5, col, `opacity=".7"`) + F("M-21 14 Q-21 0 -11 0 Q-1 0 -1 14 Z", col, `opacity=".7"`) + O(11, -7, 5.5, col, `opacity=".7"`) + F("M1 14 Q1 0 11 0 Q21 0 21 14 Z", col, `opacity=".7"`) + O(0, -10, 6.5, col) + F("M-11 17 Q-11 0 0 0 Q11 0 11 17 Z", col));
    case "clock": return g(O(0, 0, 16, W, `stroke="${col}" stroke-width="3"`) + P("M0 -9 V0 L7 5", col, 3));
    case "bed": return g(R(-17, -2, 34, 10, col, 2) + R(-17, -12, 5, 24, col, 1.5) + R(-10, -9, 10, 7, "#dfe9f6", 2) + R(-17, 8, 4, 6, col) + R(13, 8, 4, 6, col));
    case "doc": return g(F("M-12 -17 H6 L13 -10 V17 H-12 Z", W, `stroke="${col}" stroke-width="2.5"`) + P("M-6 -6 H7 M-6 1 H7 M-6 8 H3", col, 2.2));
    case "gear": { let d = ""; for (let i = 0; i < 8; i++) { const a0 = i * Math.PI / 4, a1 = a0 + 0.3, a2 = a0 + 0.5, a3 = a0 + 0.78; const q = (a, r) => r1(Math.cos(a) * r) + " " + r1(Math.sin(a) * r); d += (i ? "L" : "M") + q(a0, 12) + " L" + q(a1, 17) + " L" + q(a2, 17) + " L" + q(a3, 12) + " "; } return g(F(d + "Z", col) + O(0, 0, 5, W)); }
    case "compass": return g(O(0, 0, 17, W, `stroke="${col}" stroke-width="3"`) + F("M0 -13 L4 0 L-4 0 Z", C.red) + F("M0 13 L4 0 L-4 0 Z", col) + O(0, 0, 2.5, col));
    case "key": return g(O(-9, 0, 8, "none", `stroke="${col}" stroke-width="4"`) + P("M-1 0 H17 M11 0 V6 M16 0 V5", col, 4));
    case "scale": return g(P("M0 -15 V14 M-10 15 H10 M-16 -9 H16", col, 2.8) + P("M-16 -9 L-21 3 H-11 Z M16 -9 L11 3 H21 Z", col, 2) + O(0, -16, 2.6, col));
    case "shield": return g(F("M0 -17 L14 -11 V0 Q14 12 0 18 Q-14 12 -14 0 V-11 Z", col) + P("M-6 0 L-1 5 L7 -5", W, 3));
    case "gavel": return g(G("rotate(-35)", R(-12, -13, 22, 9, col, 2) + R(-3, -4, 5, 20, col, 2)) + R(-14, 12, 22, 5, col, 2));
    case "flag": return g(P("M-10 17 V-17", col, 3) + F("M-9 -16 H13 L8 -9 L13 -2 H-9 Z", C.coral));
    case "chat": return g(R(-17, -15, 24, 17, col, 5) + F("M-12 2 L-14 9 L-6 2 Z", col) + R(-2, -4, 20, 15, C.teal, 5) + F("M13 11 L15 17 L8 11 Z", C.teal));
    case "target": return g(O(0, 0, 16, W, `stroke="${C.red}" stroke-width="3"`) + O(0, 0, 10, W, `stroke="${C.red}" stroke-width="3"`) + O(0, 0, 4, C.red) + P("M3 -3 L17 -17", col, 2.5));
    case "mag": return g(O(-3, -3, 11, "rgba(255,255,255,.6)", `stroke="${col}" stroke-width="3.5"`) + P("M5 5 L15 15", col, 5));
    case "hotel": return g(R(-15, -16, 30, 33, col, 2) + rep(3, (r) => rep(3, (c2) => R(-10 + c2 * 8, -11 + r * 8, 5, 5, C.gold, 1))) + R(-4, 9, 8, 8, W, 1));
    case "invoice": return g(F("M-12 -17 H12 V17 L8 13 L4 17 L0 13 L-4 17 L-8 13 L-12 17 Z", W, `stroke="${col}" stroke-width="2.5"`) + P("M-6 -8 H6 M-6 -1 H6", col, 2.2) + T(0, 11, "AED", 7, col));
    case "box": return g(F("M-16 -6 L0 -14 L16 -6 L16 12 L0 19 L-16 12 Z", "#d9a066", `stroke="${C.amber}" stroke-width="2"`) + P("M-16 -6 L0 2 L16 -6 M0 2 V19", C.amber, 2));
    case "spa": return g(F("M0 14 Q-16 4 -12 -12 Q-1 -6 0 14 Z", C.teal) + F("M0 14 Q16 4 12 -12 Q1 -6 0 14 Z", "#55b7a8") + F("M0 14 Q-5 -4 0 -17 Q5 -4 0 14 Z", C.green));
    case "kiosk": return g(R(-12, -18, 24, 22, col, 3) + R(-8, -14, 16, 13, "#bfe3ff", 2) + R(-3, 4, 6, 10, col) + R(-10, 14, 20, 4, col, 2));
    case "lock": return g(P("M-8 -4 V-10 A8 8 0 0 1 8 -10 V-4", col, 3.5) + R(-12, -4, 24, 20, col, 3) + O(0, 5, 3, W));
    case "chart": return g(P("M-17 -16 V15 H17", col, 2.5) + P("M-12 8 L-4 -1 L3 4 L14 -11", C.teal, 3));
    case "crown": return g(F("M-16 10 L-16 -8 L-8 0 L0 -12 L8 0 L16 -8 L16 10 Z", C.gold, `stroke="${C.amber}" stroke-width="2"`) + R(-16, 10, 32, 5, C.amber, 1));
    case "calendar": return g(R(-15, -12, 30, 28, W, 3, `stroke="${col}" stroke-width="2.5"`) + R(-15, -12, 30, 8, col, 3) + P("M-8 -16 V-9 M8 -16 V-9", col, 3) + rep(3, (i) => R(-9 + i * 7, 2, 4, 4, col)));
    case "link": return g(R(-17, -6, 18, 12, "none", 6, `stroke="${col}" stroke-width="3.5"`) + R(-1, -6, 18, 12, "none", 6, `stroke="${C.teal}" stroke-width="3.5"`));
    case "ruler": return g(G("rotate(-30)", R(-18, -6, 36, 12, C.gold, 2) + rep(6, (i) => P(`M${-13 + i * 5} -6 V${i % 2 ? -1 : 1}`, C.ink, 1.4))));
    case "fence": return g(rep(4, (i) => F(`M${-15 + i * 9} 15 V-9 L${-12 + i * 9} -15 L${-9 + i * 9} -9 V15 Z`, col)) + R(-18, -4, 36, 3, col) + R(-18, 7, 36, 3, col));
    case "hourglass": return g(P("M-10 -16 H10 M-10 16 H10", col, 3) + F("M-8 -14 H8 L1 0 L8 14 H-8 L-1 0 Z", "none", `stroke="${col}" stroke-width="2.5"`) + F("M-5 11 H5 L0 6 Z", C.gold));
    case "map": return g(F("M-17 -12 L-6 -16 L6 -12 L17 -16 V12 L6 16 L-6 12 L-17 16 Z", W, `stroke="${col}" stroke-width="2.4"`) + P("M-6 -16 V12 M6 -12 V16", col, 1.6) + P("M-12 6 Q-4 -6 4 2 T14 -8", C.red, 2.4, 'stroke-dasharray="3 3"'));
    case "check": return g(O(0, 0, 15, C.green) + P("M-7 0 L-2 6 L8 -6", W, 3.5));
    case "cross": return g(O(0, 0, 15, C.red) + P("M-6 -6 L6 6 M6 -6 L-6 6", W, 3.5));
    case "warn": return g(F("M0 -16 L17 14 H-17 Z", C.gold, `stroke="${C.amber}" stroke-width="2"`) + R(-1.8, -6, 3.6, 11, C.ink, 1.5) + O(0, 9, 2.2, C.ink));
    case "q": return g(O(0, 0, 15, C.coral) + T(0, 6.5, "?", 19, W));
    case "stamp": return g(R(-16, 6, 32, 9, col, 2) + R(-5, -6, 10, 13, col, 2) + O(0, -11, 7, col));
    case "eye": return g(F("M-17 0 Q0 -14 17 0 Q0 14 -17 0 Z", W, `stroke="${col}" stroke-width="2.5"`) + O(0, 0, 5.5, col));
    case "handshake": return g(P("M-18 -2 L-8 -8 L2 -2 M18 -2 L8 -8 L-4 2 Q-1 6 3 3 L8 7 Q11 9 13 6", col, 3) + P("M-18 -2 L-8 8 Q-5 11 -2 8", col, 3));
    case "bell": return g(F("M-12 8 Q-12 -12 0 -12 Q12 -12 12 8 Z", C.gold, `stroke="${C.amber}" stroke-width="2"`) + R(-16, 8, 32, 5, col, 2) + O(0, -14, 3, col));
    case "wallet": return g(R(-17, -10, 34, 24, col, 4) + R(4, -3, 15, 10, C.gold, 3) + O(10, 2, 2.2, col));
    default: return g(O(0, 0, 12, col));
  }
}
const person = (x, y, s = 1, col = C.navy) => ICO("person", x, y, s, col);
const guest = (x, y, s = 1, col = C.navy2) => ICO("guest", x, y, s, col);
const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${r1(x - 7 * s)} ${r1(y)} l${r1(5 * s)} ${r1(5 * s)} l${r1(10 * s)} ${r1(-11 * s)}`, col, w);
const xmark = (x, y, s = 1, col = C.red, w = 3) => P(`M${r1(x - 6 * s)} ${r1(y - 6 * s)} l${r1(12 * s)} ${r1(12 * s)} M${r1(x + 6 * s)} ${r1(y - 6 * s)} l${r1(-12 * s)} ${r1(12 * s)}`, col, w);
const arcD = (cx, cy, r, a0, a1) => {
  const p0 = [cx + Math.cos(a0) * r, cy + Math.sin(a0) * r], p1 = [cx + Math.cos(a1) * r, cy + Math.sin(a1) * r];
  return `M${r1(p0[0])} ${r1(p0[1])} A${r} ${r} 0 ${Math.abs(a1 - a0) > Math.PI ? 1 : 0} 1 ${r1(p1[0])} ${r1(p1[1])}`;
};

// ---- prefixed keyed builders handed to every shot family ----
function pfx(p) {
  return {
    p,
    K: (k, b, ex = "") => `<g data-k="${p}${k}" ${ex}>${b}</g>`,
    H: (k, b, ex = "") => `<g data-k="${p}${k}" style="opacity:0" ${ex}>${b}</g>`,
    D: (k, d, s, w = 3, ex = "") => `<path data-k="${p}${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100" ${ex}/>`,
    TK: (k, x, y, s, sz = 14, f = C.ink, a = "middle", ex = "") => `<text data-k="${p}${k}" x="${r1(x)}" y="${r1(y)}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`,
    // An auto-sized label chip whose text, colour and width are set by c.note().
    N: (k, x, y, sz = 13) => `<g data-k="${p}${k}" data-cx="${x}" data-sz="${sz}" style="opacity:0">` +
      R(x - 40, y - sz * 0.98, 80, sz * 1.95, C.white, sz, `stroke="${C.navy}" stroke-width="2"`) +
      `<text x="${x}" y="${r1(y + sz * 0.36)}" font-size="${sz}" fill="${C.navy}" text-anchor="middle"></text></g>`
  };
}

// ---- per-part stylesheet, appended once into the shared <style id="vl-sc-w05"> ----
function sceneCSS(id, bg) {
  const s = ".vls-w05-" + id;
  return `
${s}{position:relative;display:flex;flex-direction:column;width:100%;height:100%;min-height:200px;overflow:hidden;box-sizing:border-box;border-radius:14px;background:${bg};color:${C.ink};isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w05-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w05-fig>svg{position:absolute;inset:0;display:block;width:100%;height:100%;max-width:none;max-height:none;overflow:hidden}
${s} svg text{font-family:"Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif;font-weight:700;letter-spacing:.1px;pointer-events:none}
${s} [data-k]{transform-box:fill-box;transform-origin:50% 50%;transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.8s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}
${s}.w05-snap [data-k]{transition:none!important}
${s} .w05-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:36px;padding:6px 12px 8px;font:700 14px/1.25 "Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif;color:${C.navy};background:rgba(255,255,255,.72);border-top:1px solid rgba(31,78,121,.14)}
${s} .w05-num{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w05-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
${s} .w05-lab.w05-in{animation:vlsw05Cap .5s cubic-bezier(.22,.8,.24,1)}
${s} .w05-bar{flex:0 0 56px;height:4px;border-radius:4px;background:rgba(31,78,121,.15);overflow:hidden}
${s} .w05-bar i{display:block;height:100%;width:0;background:${C.coral};transition:width .6s ease}
${s} .a-flow{stroke-dasharray:6 7;animation:vlsw05Flow 1.2s linear infinite}
${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw05Spin 9s linear infinite}
${s} .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw05Bob 2.4s ease-in-out infinite}
${s} .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw05Pulse 1.8s ease-in-out infinite}
${s} .a-shake{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw05Shake .8s ease-in-out infinite}
${s} .a-blink{animation:vlsw05Blink 1.3s ease-in-out infinite}
@media (max-width:420px){${s} .w05-cap{font-size:13px;min-height:32px;padding:5px 10px 7px}${s} .w05-bar{flex-basis:40px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
}
const KEYFRAMES = `
@keyframes vlsw05Cap{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes vlsw05Flow{to{stroke-dashoffset:-26}}
@keyframes vlsw05Spin{to{transform:rotate(360deg)}}
@keyframes vlsw05Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes vlsw05Pulse{0%,100%{opacity:.45;transform:scale(.94)}50%{opacity:1;transform:scale(1.06)}}
@keyframes vlsw05Shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}
@keyframes vlsw05Blink{0%,100%{opacity:1}50%{opacity:.35}}
`;
const SCENE_BG = [];
function addStyles() {
  if (typeof document === "undefined") return;
  let st = document.getElementById("vl-sc-w05");
  if (!st) { st = document.createElement("style"); st.id = "vl-sc-w05"; (document.head || document.documentElement).appendChild(st); }
  const flag = "data-w05claude-" + PART;
  if (st.getAttribute(flag)) return;
  st.setAttribute(flag, "1");
  st.appendChild(document.createTextNode(KEYFRAMES + SCENE_BG.map((a) => sceneCSS(a[0], a[1])).join("\n")));
}

// Re-labels a family instance with the benchmark template it is modelled on in this section.
const BENCH = (fam, bench) => { fam.bench = bench; return fam; };

// ---- scene factory: one plan entry per narration line -> [family, state, caption] ----
function makeScene(cfg) {
  const { id, plan, fams } = cfg;
  const N = plan.length, names = Object.keys(fams);
  let root = null, useG = false;
  const nodes = (k) => (root ? Array.prototype.slice.call(root.querySelectorAll('[data-k="' + k + '"]')) : []);
  const mapK = (i, n) => {
    const nn = Math.max(1, Math.floor(num(n, N)));
    const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
    return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
  };
  const dur = (t, d) => (t.d == null ? d : t.d);
  function timing(el, t, d) { el.style.transitionDuration = dur(t, d) + "s"; el.style.transitionDelay = (t.dl || 0) + "s"; }
  function tf(el, st, t, snap) {
    const x = st.x || 0, y = st.y || 0, r = st.r || 0;
    const sx = st.sx != null ? st.sx : (st.s != null ? st.s : 1), sy = st.sy != null ? st.sy : (st.s != null ? st.s : 1);
    const g = useG ? GS() : null;
    if (g) {
      const v = { x, y, rotation: r, scaleX: sx, scaleY: sy };
      if (st.pv) v.svgOrigin = st.pv[0] + " " + st.pv[1]; else v.transformOrigin = "50% 50%";
      if (snap) g.set(el, v); else g.to(el, Object.assign(v, { duration: dur(t, 0.8), delay: t.dl || 0, ease: t.e || "power3.out", overwrite: "auto" }));
      return;
    }
    if (st.pv) { el.style.transformBox = "view-box"; el.style.transformOrigin = st.pv[0] + "px " + st.pv[1] + "px"; }
    timing(el, t, 0.8);
    el.style.transform = "translate(" + x + "px," + y + "px) rotate(" + r + "deg) scale(" + sx + "," + sy + ")";
  }
  function op(el, o, t, snap) {
    const g = useG ? GS() : null;
    if (g) { if (snap) g.set(el, { opacity: o }); else g.to(el, { opacity: o, duration: dur(t, 0.55), delay: t.dl || 0, ease: "power1.out", overwrite: false }); return; }
    timing(el, t, 0.55); el.style.opacity = String(o);
  }
  function dash(el, f, t, snap) {
    const v = 100 * (1 - clamp(f, 0, 1)), g = useG ? GS() : null;
    if (g) { if (snap) g.set(el, { strokeDashoffset: v }); else g.to(el, { strokeDashoffset: v, duration: dur(t, 1), delay: t.dl || 0, ease: "power2.inOut" }); return; }
    timing(el, t, 1); el.style.strokeDashoffset = String(v);
  }
  function paint(el, prop, col, t, snap) {
    const g = useG ? GS() : null;
    if (g) { const v = {}; v[prop] = col; if (snap) g.set(el, v); else g.to(el, Object.assign(v, { duration: dur(t, 0.5), delay: t.dl || 0 })); return; }
    timing(el, t, 0.5); el.style[prop] = col;
  }
  function ctx(snap, p) {
    const K = (k) => nodes(p + k);
    const c = {
      snap,
      op: (k, o, t = {}) => K(k).forEach((el) => op(el, typeof o === "number" ? clamp(o, 0, 1) : (o ? 1 : 0), t, snap)),
      mv: (k, st, t = {}) => K(k).forEach((el) => tf(el, st || {}, t, snap)),
      dr: (k, f, t = {}) => K(k).forEach((el) => dash(el, f, t, snap)),
      fl: (k, col, t = {}) => K(k).forEach((el) => paint(el, "fill", col, t, snap)),
      sk: (k, col, t = {}) => K(k).forEach((el) => paint(el, "stroke", col, t, snap)),
      sw: (k, w) => K(k).forEach((el) => { el.style.strokeWidth = String(w); }),
      tx: (k, s) => K(k).forEach((el) => { const v = s == null ? "" : String(s); if (el.textContent !== v) el.textContent = v; }),
      at: (k, a, v) => K(k).forEach((el) => el.setAttribute(a, String(v))),
      cl: (k, cls, on) => K(k).forEach((el) => el.classList.toggle(cls, !!on)),
      vis: (map, t = {}) => Object.keys(map).forEach((k) => c.op(k, map[k], t)),
      note: (k, n, t = {}) => K(k).forEach((g) => {
        if (!n) { op(g, 0, t, snap); return; }
        const s = typeof n === "string" ? n : n.t, col = NC[(typeof n === "string" ? "N" : n.c) || "N"] || C.navy;
        const filled = typeof n === "object" && n.f;
        const sz = num(g.getAttribute("data-sz"), 13), cx0 = num(g.getAttribute("data-cx"), 200);
        const w = tw(s, sz), cx = clamp(cx0, w / 2 + 3, 397 - w / 2);
        const r = g.querySelector("rect"), tx = g.querySelector("text");
        if (r) { r.setAttribute("x", String(r1(cx - w / 2))); r.setAttribute("width", String(w)); r.setAttribute("stroke", col); r.setAttribute("fill", filled ? col : C.white); }
        if (tx) { tx.setAttribute("x", String(r1(cx))); tx.setAttribute("fill", filled ? C.white : col); if (tx.textContent !== s) tx.textContent = s; }
        op(g, 1, t, snap);
      })
    };
    return c;
  }
  function caption(k, snap) {
    const lab = root.querySelector(".w05-lab"), nn = root.querySelector(".w05-num"), bar = root.querySelector(".w05-bar i");
    const txt = plan[k][2] || "";
    if (lab && lab.textContent !== txt) {
      lab.textContent = txt;
      if (!snap && !RM()) { lab.classList.remove("w05-in"); void lab.offsetWidth; lab.classList.add("w05-in"); }
    }
    if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
    if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
  }
  function render(k, snap) {
    if (!root) return;
    if (snap) root.classList.add("w05-snap");
    try {
      const [act, st] = plan[k];
      const top = ctx(snap, "");
      names.forEach((nm) => {
        const on = nm === act;
        top.op("SH_" + nm, on ? 1 : 0, { d: on ? 0.55 : 0.3, dl: on ? 0.15 : 0 });
        top.mv("SH_" + nm, on ? {} : { y: 10, s: 0.98 }, { d: 0.6 });
      });
      const fam = fams[act];
      if (fam) { fam.render(ctx(snap, act + "_"), st || {}, k); root.setAttribute("data-template", fam.bench); }
      root.setAttribute("data-shot", act);
    } catch (e) { if (window.console) console.warn("[VL W05 " + id + "]", e); }
    caption(k, snap);
    if (snap) { void root.offsetWidth; root.classList.remove("w05-snap"); }
    root.setAttribute("data-moment", String(k));
  }
  function kill() {
    const g = GS();
    if (root && g && typeof g.killTweensOf === "function") { try { g.killTweensOf(root.querySelectorAll("[data-k]")); } catch (e) { /* ignore */ } }
  }
  function draw() {
    return R(-400, -300, 1200, 900, cfg.bg) + names.map((nm) => `<g data-k="SH_${nm}" style="opacity:0">${fams[nm].draw(pfx(nm + "_"))}</g>`).join("");
  }
  SCENE_BG.push([id, cfg.bg]);
  return {
    build(el) {
      if (!el || el.nodeType !== 1) return;
      kill();
      addStyles();
      useG = !!GS();
      const r = document.createElement("div");
      r.className = "vls-w05-" + id + " vls-w05-scene";
      r.setAttribute("data-vls-scene", id);
      r.innerHTML = '<div class="w05-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
        esc(cfg.desc) + '">' + draw() + '</svg></div><div class="w05-cap" aria-hidden="true"><span class="w05-num"></span><span class="w05-lab"></span><span class="w05-bar"><i></i></span></div>';
      if (typeof el.replaceChildren === "function") el.replaceChildren(r); else { el.innerHTML = ""; el.appendChild(r); }
      root = r;
      render(0, true);
    },
    step(i, n) { if (!root) return; render(mapK(i, n), false); },
    reset() { if (!root) return; kill(); render(0, true); }
  };
}

// =====================================================================
// SHOT FAMILY LIBRARY. Each family is one kind of picture; a section
// instantiates 8-10 of them with its own content, and every narration line
// sets one family's state. Each family names its benchmark template.
// =====================================================================

// template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
// Title card: spinning orbit, icon badge, two-line headline, kicker and subtitle chips.
function F_TITLE(cfg) {
  const col = cfg.col || C.navy;
  return {
    bench: "Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/",
    draw(f) {
      let s = O(200, 112, 92, "none", `stroke="${C.line}" stroke-width="1.5" stroke-dasharray="2 7"`);
      s += f.K("ring", `<g class="a-spin">${O(200, 112, 74, "none", `stroke="${col}" stroke-width="3" stroke-dasharray="14 10"`)}</g>`);
      s += f.H("orb", O(126, 112, 10, OC[0], `stroke="#fff" stroke-width="2.5"`) + O(237, 48, 10, OC[1], `stroke="#fff" stroke-width="2.5"`) + O(237, 176, 10, OC[2], `stroke="#fff" stroke-width="2.5"`));
      s += f.K("badge", O(200, 112, 54, C.white, `stroke="${col}" stroke-width="4"`) + ICO(cfg.icon || "compass", 200, 112, 1.9, col));
      s += f.N("k", 200, 22, 13);
      s += f.TK("t1", 200, 212, "", 24, C.ink);
      s += f.TK("t2", 200, 240, "", 24, col);
      s += f.N("sub", 200, 274, 14);
      return s;
    },
    render(c, s) {
      c.note("k", s.k ? { t: s.k, c: "N", f: 1 } : null);
      c.tx("t1", s.t1 || ""); c.tx("t2", s.t2 || "");
      c.mv("t1", { y: s.t1 ? 0 : 8 }); c.op("t1", s.t1 ? 1 : 0);
      c.mv("t2", { y: s.t2 ? 0 : 8 }, { dl: 0.1 }); c.op("t2", s.t2 ? 1 : 0, { dl: 0.1 });
      c.note("sub", s.sub ? { t: s.sub, c: s.sc || "T" } : null, { dl: 0.3 });
      c.op("orb", s.orb ? 1 : 0, { dl: 0.2 });
      c.mv("badge", { s: s.pop ? 1.1 : 1 });
    }
  };
}

// template: Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD
// The narrator's question in a speech bubble, the options on the table, and a team thinking.
function F_ASK(cfg = {}) {
  const col = cfg.col || C.coral;
  return {
    bench: "Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD",
    draw(f) {
      let s = R(24, 16, 352, 140, C.white, 18, `stroke="${col}" stroke-width="3"`);
      s += F("M150 154 L134 182 L182 154 Z", C.white, `stroke="${col}" stroke-width="3" stroke-linejoin="round"`) + R(148, 150, 38, 6, C.white);
      s += `<g class="a-pulse">${O(52, 46, 19, col)}${T(52, 54, "?", 24, C.white)}</g>`;
      for (let i = 0; i < 4; i++) s += f.TK("q" + i, 218, 60 + i * 26, "", 17, C.ink);
      [[110, 200], [290, 200], [110, 232], [290, 232]].forEach((p, i) => { s += f.N("o" + i, p[0], p[1], 13); });
      [80, 200, 320].forEach((x, i) => {
        s += f.K("p" + i, person(x, 274, 1.05, [C.teal, C.navy, C.coral][i]));
        s += f.H("th" + i, O(x + 14, 246, 2.6, C.slate) + O(x + 20, 239, 3.4, C.slate) + O(x + 28, 230, 4.4, C.slate));
      });
      return s;
    },
    render(c, s) {
      let lines = wrap(s.q, 28), sz = 17, lh = 26;
      if (lines.length > 3) { lines = wrap(s.q, 34); sz = 15; lh = 23; }
      if (lines.length > 4) { lines = wrap(s.q, 40); sz = 13; lh = 20; }
      const L = Math.min(4, lines.length), y0 = 86 - (L - 1) * lh / 2 + sz * 0.35;
      for (let i = 0; i < 4; i++) {
        c.tx("q" + i, lines[i] || ""); c.at("q" + i, "font-size", sz); c.at("q" + i, "y", r1(y0 + i * lh));
        c.op("q" + i, i < L ? 1 : 0, { dl: 0.08 * i });
      }
      const o = s.o || [], oc = s.oc || [];
      for (let i = 0; i < 4; i++) c.note("o" + i, o[i] ? { t: o[i], c: oc[i] || "N" } : null, { dl: 0.25 + i * 0.12 });
      for (let i = 0; i < 3; i++) {
        c.mv("p" + i, { y: s.who === i ? -5 : 0, s: s.who === i ? 1.12 : 1 });
        c.op("th" + i, !(s.o && s.o.length) && (s.who == null || s.who === i) ? 1 : 0, { dl: 0.2 * i });
      }
    }
  };
}

// template: Waiting Queue — https://lottiefiles.com/free-animation/waiting-queue-xoNutPl764
// Qasr's reception: queue length, staff on duty, waiting clock, guest rating, alerts and cost tag.
function F_DESK(cfg = {}) {
  return {
    bench: "Waiting Queue — https://lottiefiles.com/free-animation/waiting-queue-xoNutPl764",
    draw(f) {
      let s = R(0, 0, 400, 246, "#f7efe2") + R(0, 246, 400, 54, "#e6d4ba") + P("M0 246 H400", "#cdb593", 2);
      s += R(282, 118, 98, 26, C.navy, 6) + T(331, 136, cfg.sign || "Qasr Marina", 13, C.white);
      s += f.K("clock", O(44, 50, 25, C.white, `stroke="${C.navy}" stroke-width="3.5"`) + rep(12, (i) => { const a = i * Math.PI / 6; return P(`M${r1(44 + Math.cos(a) * 19)} ${r1(50 + Math.sin(a) * 19)} L${r1(44 + Math.cos(a) * 22)} ${r1(50 + Math.sin(a) * 22)}`, C.navy, 1.6); }));
      s += f.K("hand", P("M44 50 L44 32", C.red, 3.5), `data-pv="44 50"`) + O(44, 50, 3.5, C.navy);
      s += f.TK("wt", 78, 58, "", 19, C.red, "start");
      s += f.K("stars", T(220, 66, "Guest rating", 12, C.slate) + rep(5, (i) => ICO("star", 172 + i * 24, 38, 0.58, "#d4d9de")));
      for (let i = 0; i < 5; i++) s += f.H("sg" + i, ICO("star", 172 + i * 24, 38, 0.58, C.gold));
      s += f.N("cost", 338, 38, 13);
      for (let i = 0; i < 3; i++) {
        s += f.K("st" + i, person(300 + i * 30, 168, 0.9, C.teal) + R(292 + i * 30, 176, 16, 5, C.white, 2));
      }
      s += R(276, 178, 112, 50, C.wood, 6) + R(276, 178, 112, 8, "#9a6a3f", 4) + T(332, 212, "Reception", 13, C.white);
      s += f.K("gq", rep(6, (i) => f.K("g" + i, guest(240 - i * 36, 226, 1.05, i ? C.navy2 : C.navy))), `class="a-bob"`);
      s += f.H("sad", O(240, 186, 11, C.white, `stroke="${C.red}" stroke-width="2"`) + O(236, 184, 1.6, C.ink) + O(244, 184, 1.6, C.ink) + P("M235 192 Q240 187 245 192", C.ink, 1.8));
      s += f.H("happy", O(240, 186, 11, C.white, `stroke="${C.green}" stroke-width="2"`) + O(236, 184, 1.6, C.ink) + O(244, 184, 1.6, C.ink) + P("M235 189 Q240 194 245 189", C.ink, 1.8));
      s += f.H("exp", R(24, 254, 250, 16, C.gold, 8, `opacity=".55"`) + guest(196, 262, 0.75, C.amber) + guest(232, 262, 0.75, C.amber) + P("M250 262 H272", C.amber, 3) + arrowHead(276, 262, 0, C.amber));
      s += f.N("ex", 96, 262, 12);
      for (let i = 0; i < 3; i++) s += f.N("a" + i, [72, 196, 320][i], 100, 12);
      s += f.N("nt", 200, 286, 13);
      return s;
    },
    render(c, s) {
      const n = s.n == null ? 4 : s.n, st = s.staff == null ? 3 : s.staff;
      for (let i = 0; i < 6; i++) { c.op("g" + i, i < n ? 1 : 0, { dl: 0.05 * i }); c.mv("g" + i, { x: i < n ? 0 : -24 }); }
      c.cl("gq", "a-bob", n > 2);
      for (let i = 0; i < 3; i++) { c.op("st" + i, i < st ? 1 : 0.14); c.cl("st" + i, "a-shake", !!s.rush && i < st); }
      const m = parseFloat(s.wait) || 0;
      c.tx("wt", s.wait || ""); c.fl("wt", m >= 10 ? C.red : C.green);
      c.mv("hand", { r: m * 30, pv: [44, 50] }, { d: 1.2 });
      c.op("clock", s.wait ? 1 : 0.35);
      c.op("stars", s.stars == null ? 0 : 1);
      for (let i = 0; i < 5; i++) c.op("sg" + i, s.stars != null && i < s.stars ? 1 : 0, { dl: 0.06 * i });
      c.note("cost", s.cost ? { t: s.cost, c: s.cc || "A" } : null);
      c.op("sad", s.mood === "sad" ? 1 : 0); c.op("happy", s.mood === "happy" ? 1 : 0);
      c.op("exp", s.exp ? 1 : 0); c.note("ex", s.exp ? { t: "Corporate lane", c: "A" } : null);
      const a = s.alerts || [];
      for (let i = 0; i < 3; i++) c.note("a" + i, a[i] ? { t: a[i], c: (s.acs && s.acs[i]) || s.ac || "R", f: s.af } : null, { dl: 0.15 + i * 0.15 });
      c.note("nt", s.nt);
    }
  };
}

// template: Business Analytics Meeting — https://lottiefiles.com/free-animation/business-analytics-C1COKzrIkL
// The steering table: directors with their asks, the shared budget jar, pulls in different directions.
function F_BOARD(cfg) {
  const who = cfg.who; // [[name, colourLetter], x4]
  const X = [62, 150, 250, 338], B = [[96, 36], [126, 78], [274, 78], [304, 36]];
  return {
    bench: "Business Analytics Meeting — https://lottiefiles.com/free-animation/business-analytics-C1COKzrIkL",
    draw(f) {
      let s = "";
      for (let i = 0; i < 4; i++) s += f.H("pl" + i, P(`M200 158 L${X[i]} 150`, C.red, 3, 'stroke-dasharray="6 5"') + arrowHead(X[i] + (i < 2 ? 14 : -14), 150, i < 2 ? 180 : 0, C.red));
      for (let i = 0; i < 4; i++) {
        s += f.H("ring" + i, O(X[i], 158, 30, "none", `stroke="${NC[who[i][1]]}" stroke-width="3" class="a-pulse"`));
        s += f.K("d" + i, person(X[i], 176, 1.35, NC[who[i][1]]));
      }
      s += E(200, 214, 172, 34, C.wood) + E(200, 208, 172, 30, "#c99463");
      s += f.K("jar", F("M176 128 Q176 120 184 120 H216 Q224 120 224 128 V182 Q224 192 214 192 H186 Q176 192 176 182 Z", "rgba(232,241,248,.85)", `stroke="${C.slate}" stroke-width="2.5"`) + R(180, 112, 40, 9, C.slate, 3));
      for (let i = 0; i < 4; i++) s += f.H("c" + i, ICO("coin", 200, 178 - i * 15, 0.62));
      s += f.N("jl", 200, 238, 13);
      for (let i = 0; i < 4; i++) {
        s += T(X[i], 266, who[i][0], 13, NC[who[i][1]]);
        s += f.N("b" + i, B[i][0], B[i][1], 13);
      }
      s += f.N("nt", 200, 289, 13);
      return s;
    },
    render(c, s) {
      const on = s.on == null ? 4 : s.on, say = s.say || [];
      for (let i = 0; i < 4; i++) {
        const vis = Array.isArray(on) ? has(on, i) : i < on;
        c.op("d" + i, vis ? (s.spk == null || s.spk === i || has(s.also, i) ? 1 : 0.35) : 0.1);
        c.mv("d" + i, { y: s.spk === i ? -6 : 0 });
        c.op("ring" + i, s.spk === i ? 1 : 0);
        c.note("b" + i, say[i] ? { t: say[i], c: who[i][1], f: s.spk === i } : null, { dl: 0.1 * i });
        c.op("pl" + i, s.tug && vis ? 1 : 0); c.mv("pl" + i, { x: s.tug ? 0 : 0 });
      }
      const coins = s.coins == null ? 2 : s.coins;
      for (let i = 0; i < 4; i++) { c.op("c" + i, i < coins ? 1 : 0, { dl: 0.1 * i }); c.mv("c" + i, { y: i < coins ? 0 : -30 }); }
      c.op("jar", s.jar === false ? 0 : 1);
      c.note("jl", s.jl || null);
      c.note("nt", s.nt);
    }
  };
}

// template: Map Route Animation — https://lottiefiles.com/free-animation/map-route-animation-gMVg8kCqCD
// The BPM implementation framework as a road: Organization Strategy is the first stop.
function F_ROUTE() {
  const S = [[48, 236], [104, 206], [154, 192], [200, 170], [240, 146], [276, 126], [308, 104], [336, 84], [360, 64], [380, 44]];
  const road = "M48 236 C80 214 96 208 104 206 S140 196 154 192 S186 178 200 170 S228 154 240 146 S266 132 276 126 S298 112 308 104 S328 90 336 84 S352 70 360 64 S372 52 380 44";
  return {
    bench: "Map Route Animation — https://lottiefiles.com/free-animation/map-route-animation-gMVg8kCqCD",
    draw(f) {
      let s = R(0, 0, 400, 300, "#eef4ea") + P("M0 270 Q120 250 210 262 T400 250", "#d7e6cf", 18) + P("M0 40 Q80 24 160 40", "#e2ecdd", 22);
      s += P(road, "#d5d9dc", 14) + f.D("road", road, "#7e8f9c", 14) + P(road, C.white, 2, 'stroke-dasharray="6 8"');
      S.forEach((p, i) => { s += f.K("s" + i, O(p[0], p[1], i ? 8 : 14, C.muted, `stroke="${C.white}" stroke-width="3"`)); });
      s += f.H("beam", P("M48 74 L48 214", C.gold, 3, 'class="a-flow"'));
      s += f.H("star", `<g class="a-pulse">${O(48, 56, 24, C.gold, 'opacity=".25"')}</g>` + ICO("star", 48, 56, 1, C.gold));
      s += f.H("gate", R(96, 168, 4, 38, C.ink) + R(98, 172, 64, 8, C.red, 2) + R(112, 172, 10, 8, C.white) + R(134, 172, 10, 8, C.white));
      s += f.K("tok", O(48, 222, 9, C.coral, `stroke="${C.white}" stroke-width="3"`));
      s += f.N("l0", 106, 268, 14); s += f.N("l1", 150, 224, 12); s += f.N("lr", 300, 26, 13); s += f.N("gt", 196, 150, 12);
      s += f.N("nt", 300, 232, 13);
      return s;
    },
    render(c, s) {
      c.dr("road", s.road == null ? 1 : s.road, { d: 1.4 });
      const lit = s.lit == null ? 0 : s.lit;
      S.forEach((p, i) => { c.fl("s" + i, i < lit ? (i === 0 ? C.gold : C.navy2) : C.muted, { dl: 0.06 * i }); c.mv("s" + i, { s: i === 0 && s.first ? 1.25 : 1 }); });
      const at = clamp(s.at == null ? 0 : s.at, 0, 9);
      c.mv("tok", { x: S[at][0] - 48, y: S[at][1] - 236 - 14 }, { d: 1.2 });
      c.op("tok", s.at == null ? 0 : 1);
      c.op("star", s.star ? 1 : 0); c.op("beam", s.star ? 1 : 0, { dl: 0.3 });
      c.op("gate", s.gate ? 1 : 0); c.note("gt", s.gate ? { t: "Design waits", c: "R" } : null);
      c.note("l0", s.l0 ? { t: "Organization Strategy", c: "A", f: 1 } : null);
      c.note("l1", s.l1 ? { t: "Process Architecture", c: "N" } : null);
      c.note("lr", s.lr ? { t: "Later BPM phases", c: "S" } : null);
      c.note("nt", s.nt);
    }
  };
}

// template: Infographics Pack by ARstudio — https://motionarray.com/after-effects-templates/infographics-pack-135055/
// Qasr's three strategic objectives as cards, with a proposal linked to each by strength.
function F_OBJ(cfg = {}) {
  const X = [72, 200, 328], IC = ["star", "costdown", "growth"];
  const FIG = cfg.figs || ["#1", "−10%", "+25%"], NAME = cfg.names || ["Service rating", "Cost per room", "Corporate growth"];
  return {
    bench: "Infographics Pack by ARstudio — https://motionarray.com/after-effects-templates/infographics-pack-135055/",
    draw(f) {
      let s = "";
      for (let i = 0; i < 3; i++) {
        s += f.D("l" + i, `M200 252 C200 200 ${X[i]} 190 ${X[i]} 126`, OC[i], 4);
        s += f.N("w" + i, [112, 200, 288][i], [196, 176, 196][i], 12);
      }
      for (let i = 0; i < 3; i++) {
        s += f.H("hl" + i, R(X[i] - 64, 16, 128, 116, "none", 16, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
        s += f.K("cd" + i, R(X[i] - 58, 22, 116, 104, C.white, 12, `stroke="${OC[i]}" stroke-width="3"`) + R(X[i] - 58, 22, 116, 8, OC[i], 4) +
          ICO(IC[i], X[i], 52, 0.95, OC[i]) + f.TK("f" + i, X[i], 94, FIG[i], 25, OC[i]) + T(X[i], 116, NAME[i], 12, C.ink));
        s += f.H("ok" + i, ICO("check", X[i] + 50, 26, 0.75));
        s += f.H("rk" + i, ICO("warn", X[i] + 50, 28, 0.8));
      }
      s += f.H("ten", P("M96 142 H176", C.red, 4) + arrowHead(182, 142, 0, C.red) + arrowHead(90, 142, 180, C.red) + chip(136, 160, "Tension", { st: C.red, sz: 12 }));
      s += f.N("prop", 200, 262, 15);
      s += f.N("nt", 200, 287, 12);
      return s;
    },
    render(c, s) {
      const show = s.show == null ? 3 : s.show, L = s.links || [0, 0, 0], sg = s.sign || [1, 1, 1], wl = s.wl || [];
      for (let i = 0; i < 3; i++) {
        c.op("cd" + i, i < show ? (has(s.dim, i) ? 0.3 : 1) : 0, { dl: 0.12 * i });
        c.mv("cd" + i, { y: i < show ? 0 : 14, s: s.hl === i ? 1.06 : 1 });
        c.op("hl" + i, s.hl === i ? 1 : 0);
        c.op("ok" + i, has(s.ok, i) ? 1 : 0, { dl: 0.3 }); c.op("rk" + i, has(s.rk, i) ? 1 : 0, { dl: 0.3 });
        if (s.figs && s.figs[i] != null) c.tx("f" + i, s.figs[i]);
        c.dr("l" + i, s.prop && L[i] > 0 ? 1 : 0, { dl: 0.2 + 0.15 * i });
        c.sw("l" + i, L[i] > 0 ? 2 + L[i] * 2.5 : 2);
        c.sk("l" + i, sg[i] < 0 ? C.red : sg[i] === 0 ? C.muted : OC[i]);
        c.note("w" + i, s.prop && wl[i] ? { t: wl[i], c: sg[i] < 0 ? "R" : sg[i] === 0 ? "S" : "G" } : null, { dl: 0.5 + 0.1 * i });
      }
      c.op("ten", s.ten ? 1 : 0);
      c.note("prop", s.prop ? { t: s.prop, c: "N", f: 1 } : null);
      c.note("nt", s.nt);
    }
  };
}

// template: Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO
// A cause-and-effect chain: cards appear, arrows draw, a token travels; cards can turn red, green or break.
function F_CHAIN(cfg) {
  const nodes = cfg.nodes, n = nodes.length, slot = 376 / n, w = Math.min(104, slot - 14);
  const X = nodes.map((_, i) => 12 + slot * i + slot / 2), fs = w < 82 ? 12 : 13;
  return {
    bench: "Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO",
    draw(f) {
      let s = "";
      for (let i = 0; i < n - 1; i++) {
        const x1 = X[i] + w / 2 + 3, x2 = X[i + 1] - w / 2 - 5;
        s += f.D("a" + i, `M${r1(x1)} 152 H${r1(x2)}`, C.navy, 3.5);
        s += f.H("ah" + i, arrowHead(x2 + 4, 152, 0, C.navy));
        s += f.H("gap" + i, P(`M${r1((x1 + x2) / 2)} 120 V184`, C.red, 3, 'stroke-dasharray="5 4"') + ICO("q", (x1 + x2) / 2, 108, 0.65));
      }
      nodes.forEach((nd, i) => {
        const col = nd[3] ? NC[nd[3]] : C.navy, x = X[i];
        s += f.H("hr" + i, R(x - w / 2 - 5, 95, w + 10, 114, "none", 14, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
        s += f.K("c" + i,
          R(x - w / 2, 100, w, 104, C.white, 11, `stroke="${col}" stroke-width="2.5"`) + R(x - w / 2, 100, w, 7, col, 3) +
          f.H("rb" + i, R(x - w / 2, 100, w, 104, C.rose, 11, `stroke="${C.red}" stroke-width="3"`)) +
          f.H("gb" + i, R(x - w / 2, 100, w, 104, C.mint, 11, `stroke="${C.green}" stroke-width="3"`)) +
          ICO(nd[2] || "gear", x, 132, 0.9, col) + TF(x, 172, nd[0], fs, w - 8) + TF(x, 189, nd[1] || "", fs, w - 8));
        s += f.H("bad" + i, ICO("warn", x + w / 2 - 6, 102, 0.7));
        s += f.H("good" + i, ICO("check", x + w / 2 - 6, 102, 0.7));
      });
      s += f.K("tok", O(X[0], 84, 9, C.gold, `stroke="${C.white}" stroke-width="3"`) + P(`M${r1(X[0])} 93 V98`, C.gold, 2));
      s += f.N("ttl", 200, 38, 15); s += f.N("nt", 200, 240, 13); s += f.N("n2", 200, 272, 13);
      return s;
    },
    render(c, s) {
      const up = s.up == null ? n : s.up, dr = s.dr == null ? up - 1 : s.dr;
      for (let i = 0; i < n; i++) {
        c.op("c" + i, i < up ? (s.dim && s.hl != null && s.hl !== i ? 0.35 : 1) : 0, { dl: 0.1 * i });
        c.mv("c" + i, { y: i < up ? 0 : 14, s: s.hl === i ? 1.06 : 1 });
        c.op("hr" + i, s.hl === i ? 1 : 0);
        c.op("rb" + i, has(s.bad, i) ? 1 : 0); c.op("bad" + i, has(s.bad, i) ? 1 : 0, { dl: 0.2 });
        c.op("gb" + i, has(s.good, i) ? 1 : 0); c.op("good" + i, has(s.good, i) ? 1 : 0, { dl: 0.2 });
      }
      for (let i = 0; i < n - 1; i++) {
        const on = i < dr && s.gap !== i;
        c.dr("a" + i, on ? 1 : 0, { dl: 0.15 * i }); c.op("ah" + i, on ? 1 : 0, { dl: 0.15 * i + 0.4 });
        c.sk("a" + i, has(s.bad, i + 1) ? C.red : C.navy);
        c.op("gap" + i, s.gap === i ? 1 : 0);
      }
      const at = s.at == null ? -1 : s.at;
      c.op("tok", at >= 0 ? 1 : 0); c.mv("tok", { x: at >= 0 ? X[at] - X[0] : 0 }, { d: 1.1 });
      c.note("ttl", s.ttl ? (typeof s.ttl === "string" ? { t: s.ttl, c: "N", f: 1 } : s.ttl) : null);
      c.note("nt", s.nt); c.note("n2", s.n2, { dl: 0.3 });
    }
  };
}

// template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
// Two panels side by side, each with a header, an icon, evidence chips and a verdict.
function F_VS(cfg) {
  const side = (f, k, d, x0) => {
    const col = NC[d.c || "N"], cx = x0 + 91;
    let s = R(x0, 46, 182, 206, C.white, 14, `stroke="${col}" stroke-width="2.5"`) + R(x0, 46, 182, 34, col, 12) + R(x0, 68, 182, 12, col);
    s += T(cx, 68, d.t, 13, C.white) + ICO(d.icon || "doc", cx, 114, 1.25, col);
    (d.items || []).forEach((it, i) => { s += f.H(k + "i" + i, chip(cx, 160 + i * 31, it, { st: col, sz: 12, free: 1 })); });
    return f.K(k, s) + f.H(k + "ok", ICO("check", x0 + 160, 112, 0.8)) + f.H(k + "x", ICO("cross", x0 + 160, 112, 0.8)) + f.H(k + "w", ICO("warn", x0 + 160, 112, 0.8));
  };
  return {
    bench: "Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3",
    draw(f) {
      return side(f, "A", cfg.a, 10) + side(f, "B", cfg.b, 208) + f.K("vs", O(200, 148, 16, C.navy, `stroke="${C.white}" stroke-width="3"`) + T(200, 153, "vs", 13, C.white)) +
        f.N("ttl", 200, 22, 14) + f.N("nt", 200, 278, 13);
    },
    render(c, s) {
      const show = s.show || "ab";
      ["A", "B"].forEach((k) => {
        const lk = k.toLowerCase(), vis = show.indexOf(lk) > -1;
        c.op(k, vis ? (s.hl && s.hl !== lk ? 0.35 : 1) : 0, { dl: lk === "b" ? 0.15 : 0 });
        c.mv(k, { x: vis ? 0 : (lk === "a" ? -24 : 24), s: s.hl === lk ? 1.03 : 1 });
        const cnt = s["i" + lk] == null ? 3 : s["i" + lk];
        (cfg[lk].items || []).forEach((_, i) => c.op(k + "i" + i, vis && i < cnt ? 1 : 0, { dl: 0.25 + 0.12 * i }));
        const v = s["v" + lk];
        c.op(k + "ok", vis && v === "ok" ? 1 : 0, { dl: 0.4 }); c.op(k + "x", vis && v === "x" ? 1 : 0, { dl: 0.4 }); c.op(k + "w", vis && v === "w" ? 1 : 0, { dl: 0.4 });
      });
      c.op("vs", show === "ab" ? 1 : 0);
      c.note("ttl", s.ttl ? { t: s.ttl, c: "N", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p
// A balance: what is gained on one pan, what may be sacrificed on the other, a safeguard at the pivot.
function F_SCALE(cfg) {
  const pan = (f, k, d, x) => {
    const col = NC[d.c || "N"];
    let s = P(`M${x} 96 L${x - 52} 186 M${x} 96 L${x + 52} 186`, C.slate, 1.6) + F(`M${x - 62} 186 H${x + 62} Q${x + 56} 206 ${x} 206 Q${x - 56} 206 ${x - 62} 186 Z`, col);
    (d.items || []).forEach((it, i) => { s += f.H(k + i, chip(x, 172 - i * 28, it, { st: col, sz: 12 })); });
    s += TF(x, 228, d.t, 14, 128, col);
    return f.K(k, s);
  };
  return {
    bench: "Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p",
    draw(f) {
      let s = R(194, 96, 12, 150, C.slate, 3) + F("M168 252 H232 L220 238 H180 Z", C.slate);
      s += f.K("beam", R(60, 90, 280, 10, C.ink, 5) + O(200, 95, 8, C.gold), `data-pv="200 95"`);
      s += pan(f, "L", cfg.L, 70) + pan(f, "R", cfg.R, 330);
      s += f.H("guard", ICO("shield", 200, 132, 1.1, C.teal)); s += f.N("gT", 200, 249, 12);
      s += f.N("ttl", 200, 24, 14); s += f.N("mid", 200, 283, 13);
      return s;
    },
    render(c, s) {
      const t = s.t || 0;
      c.mv("beam", { r: 11 * t, pv: [200, 95] }, { d: 1.2, e: "elastic.out(1,0.6)" });
      c.mv("L", { y: -26 * t, s: s.hl === "L" ? 1.04 : 1 }, { d: 1.2 }); c.mv("R", { y: 26 * t, s: s.hl === "R" ? 1.04 : 1 }, { d: 1.2 });
      const nl = s.nl == null ? 3 : s.nl, nr = s.nr == null ? 3 : s.nr;
      (cfg.L.items || []).forEach((_, i) => c.op("L" + i, i < nl ? 1 : 0, { dl: 0.15 * i })); (cfg.R.items || []).forEach((_, i) => c.op("R" + i, i < nr ? 1 : 0, { dl: 0.15 * i }));
      c.op("guard", s.guard ? 1 : 0); c.note("gT", s.guard ? { t: s.guard === true ? "Safeguard" : s.guard, c: "T", f: 1 } : null);
      c.note("ttl", s.ttl ? { t: s.ttl, c: "N", f: 1 } : null); c.note("mid", s.mid);
    }
  };
}

// template: Animated Dashboards — https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ
// Three gauges whose needles and readings show how a process performs on different measures.
function F_GAUGE(cfg) {
  const X = [72, 200, 328], Y = 146, Rr = 48;
  return {
    bench: "Animated Dashboards — https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ",
    draw(f) {
      let s = "";
      cfg.g.forEach((g, i) => {
        const x = X[i];
        s += f.K("g" + i,
          R(x - 62, 82, 124, 130, C.white, 14, `stroke="${C.line}" stroke-width="2"`) +
          P(arcD(x, Y, Rr - 6, Math.PI, Math.PI * 1.33), C.red, 9) + P(arcD(x, Y, Rr - 6, Math.PI * 1.36, Math.PI * 1.64), C.gold, 9) + P(arcD(x, Y, Rr - 6, Math.PI * 1.67, Math.PI * 2), C.green, 9) +
          f.K("nd" + i, P(`M${x} ${Y} L${x} ${Y - Rr + 10}`, C.ink, 4), `data-pv="${x} ${Y}"`) + O(x, Y, 6, C.ink) +
          f.TK("v" + i, x, Y + 26, "", 17, C.ink) + chip(x, 232, g[0], { st: NC[g[1] || "N"], sz: 12, free: 1 }));
        s += f.H("wr" + i, R(x - 66, 78, 132, 138, "none", 16, `stroke="${C.red}" stroke-width="3" stroke-dasharray="7 5"`));
        s += f.H("hr" + i, R(x - 66, 78, 132, 138, "none", 16, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
      });
      s += f.N("ttl", 200, 40, 15); s += f.N("nt", 200, 272, 13);
      return s;
    },
    render(c, s) {
      const show = s.show == null ? 3 : s.show, v = s.val || [0, 0, 0], t = s.txt || [];
      for (let i = 0; i < cfg.g.length; i++) {
        c.op("g" + i, i < show ? (s.hl != null && s.hl !== i && s.dim ? 0.35 : 1) : 0, { dl: 0.12 * i });
        c.mv("nd" + i, { r: clamp(v[i] || 0, -1, 1) * 84, pv: [X[i], Y] }, { d: 1.2, dl: 0.1 * i });
        c.tx("v" + i, t[i] || "");
        c.op("wr" + i, has(s.warn, i) ? 1 : 0); c.op("hr" + i, s.hl === i ? 1 : 0);
      }
      c.note("ttl", s.ttl ? { t: s.ttl, c: "N", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: Bar chart transitions — https://observablehq.com/@d3/bar-chart-transitions/2
// A ratio built from coins over beds, its result, and baseline vs target bars.
function F_FRAC(cfg) {
  return {
    bench: "Bar chart transitions — https://observablehq.com/@d3/bar-chart-transitions/2",
    draw(f) {
      let s = R(10, 12, 222, 168, C.white, 14, `stroke="${C.line}" stroke-width="2"`);
      s += f.K("num", chip(121, 34, cfg.num, { st: C.amber, sz: 13, free: 1 }) + rep(5, (i) => ICO("coin", 57 + i * 32, 66, 0.72)));
      s += f.K("bar", P("M30 94 H212", C.ink, 4));
      s += f.K("den", rep(4, (i) => ICO("bed", 66 + i * 36, 120, 0.82, C.navy2)) + chip(121, 156, cfg.den, { st: C.navy2, sz: 13, free: 1 }));
      s += f.K("eq", T(250, 104, "=", 34, C.ink));
      s += f.K("res", R(270, 66, 120, 62, C.white, 14, `stroke="${C.coral}" stroke-width="3"`) + f.TK("rv", 330, 106, cfg.res || "", 24, C.coral));
      s += f.H("rl", T(330, 148, cfg.resl || "per room-night", 12, C.slate));
      s += T(24, 204, cfg.base[1], 13, C.ink, "", "start") + R(24, 212, 340, 18, "#edf1f4", 9);
      s += f.K("bb", R(24, 212, 340 * cfg.base[0], 18, C.coral, 9), `data-pv="24 221"`);
      s += f.TK("bT", 30 + 340 * cfg.base[0], 226, "", 13, C.white, "end");
      s += T(24, 250, cfg.tgt[1], 13, C.ink, "", "start") + R(24, 258, 340, 18, "#edf1f4", 9);
      s += f.K("tb", R(24, 258, 340 * cfg.tgt[0], 18, C.green, 9), `data-pv="24 267"`);
      s += f.H("cut", R(24 + 340 * cfg.tgt[0], 258, 340 * (cfg.base[0] - cfg.tgt[0]), 18, "none", 4, `stroke="${C.red}" stroke-width="2" stroke-dasharray="4 3"`));
      s += f.H("warn", ICO("warn", 384, 267, 0.7));
      s += f.N("calc", 200, 286, 13);
      s += f.N("nt", 310, 186, 12);
      return s;
    },
    render(c, s) {
      const st = s.stage == null ? 5 : s.stage;
      c.op("num", st >= 0 ? 1 : 0); c.op("bar", st >= 1 ? 1 : 0); c.op("den", st >= 1 ? 1 : 0, { dl: 0.2 });
      c.op("eq", st >= 2 ? 1 : 0); c.op("res", st >= 2 ? 1 : 0, { dl: 0.2 }); c.op("rl", st >= 2 ? 1 : 0, { dl: 0.3 });
      const rv = s.rv || cfg.res || ""; c.tx("rv", rv); c.at("rv", "font-size", Math.min(24, Math.floor(108 / Math.max(1, rv.length * 0.58))));
      c.mv("bb", { sx: st >= 3 ? 1 : 0.001, pv: [24, 221] }, { d: 1 }); c.op("bb", st >= 3 ? 1 : 0);
      c.tx("bT", st >= 3 ? (s.bT || "") : "");
      c.mv("tb", { sx: st >= 4 ? 1 : 0.001, pv: [24, 267] }, { d: 1, dl: 0.2 }); c.op("tb", st >= 4 ? 1 : 0);
      c.op("cut", st >= 4 && s.cut ? 1 : 0, { dl: 0.6 });
      c.op("warn", s.warn ? 1 : 0); c.cl("warn", "a-pulse", !!s.warn);
      c.note("calc", s.calc ? { t: s.calc, c: s.cc || "G", f: 1 } : null, { dl: 0.3 });
      c.note("nt", s.nt);
    }
  };
}

// template: Stacked-to-grouped bars — https://observablehq.com/@d3/stacked-to-grouped-bars
// The Exhibit 5 alignment matrix: four proposals by three objectives, strengths as sized dots.
const EX5 = { rows: [["Guest arrival", "guest"], ["Stock counting", "box"], ["Corporate billing", "invoice"], ["Spa booking", "spa"]], v: [[3, 2, 3], [0, 2, 0], [2, 1, 3], [2, 0, 0]] };
function F_MATRIX() {
  const CX = [196, 254, 312], RY = [100, 146, 192, 238], RS = [0, 5.5, 9.5, 13.5];
  return {
    bench: "Stacked-to-grouped bars — https://observablehq.com/@d3/stacked-to-grouped-bars",
    draw(f) {
      let s = R(4, 30, 392, 234, C.white, 14, `stroke="${C.line}" stroke-width="2"`);
      for (let j = 0; j < 3; j++) s += f.H("cb" + j, R(CX[j] - 27, 34, 54, 228, OC[j], 10, 'opacity=".16"'));
      ["star", "costdown", "growth"].forEach((ic, j) => { s += ICO(ic, CX[j], 50, 0.62, OC[j]) + T(CX[j], 76, OBJN[j], 12, OC[j]); });
      s += T(356, 76, "Total", 12, C.slate);
      for (let i = 0; i < 4; i++) {
        const y = RY[i];
        s += f.H("rb" + i, R(8, y - 21, 384, 42, C.gold, 10, 'opacity=".2"'));
        s += f.H("rg" + i, R(8, y - 21, 384, 42, "none", 10, `stroke="${C.green}" stroke-width="3"`));
        s += f.K("r" + i, ICO(EX5.rows[i][1], 26, y, 0.62, C.navy) + T(44, y + 5, EX5.rows[i][0], 13, C.ink, "", "start") + P(`M12 ${y + 21} H388`, C.line, 1));
        for (let j = 0; j < 3; j++) {
          const v = EX5.v[i][j];
          s += f.H("c" + i + j, v ? O(CX[j], y, RS[v], OC[j]) : P(`M${CX[j] - 8} ${y} H${CX[j] + 8}`, C.muted, 3));
        }
        s += f.TK("t" + i, 356, y + 6, String(EX5.v[i].reduce((a, b) => a + b, 0)), 18, C.navy, "middle", 'style="opacity:0"');
        s += f.H("fd" + i, ICO("coin", 386, y, 0.55));
        s += f.H("df" + i, ICO("hourglass", 386, y, 0.5, C.slate));
      }
      s += f.H("cr", ICO("crown", 136, RY[3] - 2, 0.55));
      s += f.K("lg", O(70, 282, 7, C.slate) + T(80, 287, "Strong", 12, C.slate, "", "start") + O(150, 282, 5, C.slate) + T(158, 287, "Moderate", 12, C.slate, "", "start") +
        O(244, 282, 3, C.slate) + T(250, 287, "Weak", 12, C.slate, "", "start") + P("M300 282 H312", C.muted, 3) + T(318, 287, "None", 12, C.slate, "", "start"));
      s += f.N("nt", 200, 16, 12);
      return s;
    },
    render(c, s) {
      const rows = s.rows == null ? 4 : s.rows, cells = s.cells == null ? rows : s.cells;
      for (let i = 0; i < 4; i++) {
        const vis = Array.isArray(rows) ? has(rows, i) : i < rows;
        const dim = s.hl != null && s.hl !== i && (s.dim !== false) && !has(s.also, i);
        c.op("r" + i, vis ? (dim ? 0.35 : 1) : 0.12, { dl: 0.08 * i });
        c.op("rb" + i, s.hl === i || has(s.also, i) ? 1 : 0); c.op("rg" + i, has(s.fund, i) ? 1 : 0);
        const cv = Array.isArray(cells) ? has(cells, i) : i < cells;
        for (let j = 0; j < 3; j++) { c.op("c" + i + j, cv ? (dim ? 0.35 : 1) : 0, { dl: 0.2 + 0.15 * j }); c.mv("c" + i + j, { s: cv ? (has(s.colhl, j) && !dim ? 1.2 : 1) : 0.2 }, { dl: 0.2 + 0.15 * j }); }
        c.op("t" + i, s.tot && cv ? 1 : 0, { dl: 0.6 });
        c.op("fd" + i, has(s.fund, i) ? 1 : 0, { dl: 0.4 }); c.mv("fd" + i, { y: has(s.fund, i) ? 0 : -30 }, { dl: 0.4 });
        c.op("df" + i, has(s.def, i) ? 1 : 0, { dl: 0.4 });
      }
      for (let j = 0; j < 3; j++) c.op("cb" + j, has(s.colhl, j) ? 1 : 0);
      c.op("cr", s.crown ? 1 : 0); c.cl("cr", "a-pulse", !!s.crown);
      c.note("nt", s.nt);
    }
  };
}

// template: Multi-Step Icon Animation — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
// An objective as a key: four cuts (result, measure, boundary, authority) before it opens the lock.
function F_KEY() {
  const NX = [160, 196, 232, 268], LB = ["1 Result", "2 Measure", "3 Boundary", "4 Authority"], LC = [C.teal, C.navy2, C.coral, C.plum];
  return {
    bench: "Multi-Step Icon Animation — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU",
    draw(f) {
      let s = R(0, 0, 400, 300, "#1d3b42") + rep(14, (i) => rep(9, (j) => O(14 + i * 28, 14 + j * 28, 1.4, "#2f5a62")));
      s += f.H("dep", chip(70, 30, "Reception", { st: C.teal, sz: 12 }) + chip(165, 30, "Housekeeping", { st: C.navy2, sz: 12 }) + chip(262, 30, "Finance", { st: C.gold, sz: 12 }) + chip(344, 30, "Sales", { st: C.coral, sz: 12 }));
      s += f.K("lock", R(312, 96, 80, 104, "#9aa7b0", 12, `stroke="#5d6b75" stroke-width="3"`) + O(352, 140, 10, "#26333b") + R(348, 142, 8, 18, "#26333b", 2));
      s += f.K("lamp", O(352, 184, 7, C.muted));
      s += f.K("sh", P("M328 96 V74 A24 24 0 0 1 376 74 V96", "#5d6b75", 9));
      s += f.K("key",
        O(70, 140, 30, "#e3b04b", `stroke="#b6862a" stroke-width="3"`) + O(70, 140, 11, "#1d3b42") +
        R(98, 131, 192, 18, "#e3b04b", 3) + R(150, 109, 140, 24, "#e3b04b", 2) + F("M290 131 L302 140 L290 149 Z", "#e3b04b") +
        NX.map((x, i) => f.K("n" + i, R(x, 109, 20, 22, "#1d3b42"), `data-pv="${x + 10} 109"`) + R(x, 109, 20, 22, "none", 2, `stroke="#ffffff" stroke-width="1.3" stroke-dasharray="3 3" opacity=".7"`) + T(x + 10, 102, String(i + 1), 12, "#ffe7a8")).join(""));
      s += f.K("cut", G("translate(0 0)", P("M170 26 V60", "#8796a0", 6) + `<g class="a-spin">${O(170, 70, 18, "#c9d2d8", `stroke="#5d6b75" stroke-width="3"`) + P("M170 54 V86 M154 70 H186", "#5d6b75", 2.5)}</g>` +
        f.H("spk", P("M160 92 L150 104 M170 94 V108 M180 92 L190 104", "#ffd36b", 2.5))));
      s += f.H("fx", ICO("cross", 352, 140, 1.1));
      s += f.H("sp", ICO("sponsor", 30, 194, 1.1, C.plum) + T(30, 226, "Sponsor", 11, "#e7dcf7"));
      LB.forEach((t, i) => { s += f.K("lg" + i, chip([52, 146, 252, 350][i], 262, t, { st: LC[i], sz: 12, free: 1 })); });
      s += f.N("nt", 200, 228, 13);
      return s;
    },
    render(c, s) {
      const cuts = s.cuts || 0;
      for (let i = 0; i < 4; i++) {
        c.mv("n" + i, { sy: i < cuts ? 1 : 0.02, pv: [NX[i] + 10, 109] }, { dl: i === cuts - 1 ? 0.4 : 0 });
        c.op("lg" + i, i < cuts ? 1 : (s.legend ? 0.35 : 0)); c.mv("lg" + i, { s: s.hl === i ? 1.12 : 1 });
      }
      const at = s.at == null ? -1 : s.at;
      c.mv("cut", { x: at >= 0 ? NX[at] - 160 : 200, y: at >= 0 ? 0 : -90 }, { d: 0.9 });
      c.op("spk", at >= 0 ? 1 : 0, { dl: 0.6 });
      c.mv("key", { x: s.inLock ? 44 : 0, y: s.drop ? 40 : 0 }, { d: 1 });
      c.op("key", s.ghost ? 0.45 : 1);
      c.fl("lamp", s.open ? C.green : s.fail ? C.red : C.muted);
      c.mv("sh", { y: s.open ? -16 : 0 }, { dl: 0.6 });
      c.op("fx", s.fail ? 1 : 0, { dl: 0.5 });
      c.op("dep", s.dep ? 1 : 0); c.op("sp", s.sp ? 1 : 0);
      c.note("nt", s.nt);
    }
  };
}

// template: Process - Success — https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP
// The mechanism: a proposal turns a gear train (change -> effect -> objective) that moves a dial.
function gearPath(cx, cy, r, n, skip) {
  let d = ""; const st = 2 * Math.PI / n, dp = 7;
  for (let k = 0; k < n; k++) {
    const a = k * st, pts = has(skip, k) ? [[a, r - dp], [a + st * 0.65, r - dp]] : [[a, r - dp], [a + st * 0.15, r], [a + st * 0.5, r], [a + st * 0.65, r - dp]];
    pts.forEach((p, j) => { d += (k === 0 && j === 0 ? "M" : "L") + r1(cx + Math.cos(p[0]) * p[1]) + " " + r1(cy + Math.sin(p[0]) * p[1]) + " "; });
  }
  return d + "Z";
}
function F_GEAR(cfg) {
  const G1 = [70, 176, 40], G2 = [144, 176, 32], G3 = [218, 176, 40], DL = [334, 140];
  const lab = cfg.labels || ["Change", "Effect", "Contribution"];
  return {
    bench: "Process - Success — https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP",
    draw(f) {
      let s = rep(20, (i) => P(`M${i * 20} 0 V300`, "#21426a", 1)) + rep(15, (i) => P(`M0 ${i * 20} H400`, "#21426a", 1));
      s = R(0, 0, 400, 300, "#173250") + s;
      s += f.D("belt", "M232 140 C262 112 290 112 300 118", "#f4cf6b", 5);
      s += f.K("g1", F(gearPath(G1[0], G1[1], G1[2], 12), C.teal, `stroke="#0f2440" stroke-width="2"`) + O(G1[0], G1[1], 8, "#0f2440") + P(`M${G1[0]} ${G1[1]} L${G1[0] - 28} ${G1[1] - 30}`, "#e8eef5", 6) + O(G1[0] - 28, G1[1] - 30, 7, "#e8eef5"), `data-pv="${G1[0]} ${G1[1]}"`);
      s += f.K("g2", F(gearPath(G2[0], G2[1], G2[2], 10, [2, 3]), C.gold, `stroke="#0f2440" stroke-width="2"`) + O(G2[0], G2[1], 7, "#0f2440") +
        f.H("gap", P(arcD(G2[0], G2[1], 38, 2 * 2 * Math.PI / 10 - 0.1, 4 * 2 * Math.PI / 10 + 0.1), C.red, 4)) +
        f.H("fix", F(gearPath(G2[0], G2[1], G2[2], 10, [0, 1, 4, 5, 6, 7, 8, 9]), C.green, `stroke="#0f2440" stroke-width="1.5"`)), `data-pv="${G2[0]} ${G2[1]}"`);
      s += f.K("g3", F(gearPath(G3[0], G3[1], G3[2], 12), C.coral, `stroke="#0f2440" stroke-width="2"`) + O(G3[0], G3[1], 8, "#0f2440"), `data-pv="${G3[0]} ${G3[1]}"`);
      lab.forEach((t, i) => { s += f.K("lb" + i, chip([70, 144, 218][i], 240, t, { st: [C.teal, C.gold, C.coral][i], sz: 12, free: 1 })); });
      s += O(DL[0], DL[1], 44, "#0f2440", `stroke="${C.sky}" stroke-width="3"`) + P(arcD(DL[0], DL[1], 34, Math.PI * 1.08, Math.PI * 1.5), C.red, 6) + P(arcD(DL[0], DL[1], 34, Math.PI * 1.5, Math.PI * 1.92), C.green, 6);
      s += f.K("nd", P(`M${DL[0]} ${DL[1]} L${DL[0]} ${DL[1] - 32}`, C.white, 4), `data-pv="${DL[0]} ${DL[1]}"`) + O(DL[0], DL[1], 5, C.white);
      s += chip(DL[0], 202, cfg.dial || "Objective", { st: cfg.dc || C.teal, sz: 13, free: 1 });
      s += f.H("gain", ICO("coin", 300, 250, 0.6) + ICO("coin", 326, 250, 0.6) + ICO("coin", 352, 250, 0.6) + T(326, 280, "Savings", 12, C.gold));
      s += f.H("minus", ICO("cross", 300, 250, 0.5) + ICO("cross", 326, 250, 0.5) + T(374, 255, "New costs", 12, C.red, "", "end"));
      s += f.N("prop", 200, 28, 15); s += f.N("nt", 200, 66, 13);
      return s;
    },
    render(c, s) {
      const T0 = (s.turn || 0) * 120;
      c.mv("g1", { r: T0, pv: [G1[0], G1[1]] }, { d: 1.4 });
      c.mv("g2", { r: -T0 * 40 / 32 + (s.gap ? 10 : 0), pv: [G2[0], G2[1]] }, { d: 1.4 });
      c.mv("g3", { r: s.gap && !s.fix ? 0 : T0, pv: [G3[0], G3[1]] }, { d: 1.4 });
      c.op("gap", s.gap && !s.fix ? 1 : 0); c.op("fix", s.fix ? 1 : 0);
      c.dr("belt", s.belt ? 1 : 0);
      c.mv("nd", { r: clamp(s.dial || -0.8, -1, 1) * 80, pv: [DL[0], DL[1]] }, { d: 1.2, dl: 0.3 });
      for (let i = 0; i < 3; i++) c.op("lb" + i, s.lab === false ? 0.25 : (s.hl == null || s.hl === i ? 1 : 0.4));
      c.op("gain", s.coins === "gain" || s.coins === "net" ? 1 : 0); c.op("minus", s.coins === "net" ? 1 : 0, { dl: 0.3 });
      c.note("prop", s.prop ? { t: s.prop, c: "T", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: Hierarchy traversal animated — https://old.observablehq.com/@d3/hierarchy-traversal-animated
// Governance tiers: who recommends, who approves, and an escalation that climbs to the right level.
function F_LADDER(cfg) {
  const Y = [52, 112, 172, 232];
  return {
    bench: "Hierarchy traversal animated — https://old.observablehq.com/@d3/hierarchy-traversal-animated",
    draw(f) {
      let s = "";
      cfg.tiers.forEach((t, i) => {
        const col = NC[t[2] || "N"];
        s += f.H("h" + i, R(14, Y[i] - 27, 240, 54, "none", 14, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
        s += f.K("t" + i, R(18, Y[i] - 23, 232, 46, C.white, 12, `stroke="${col}" stroke-width="2.5"`) + R(18, Y[i] - 23, 10, 46, col, 4) + ICO(t[1], 52, Y[i], 0.9, col) + TF(80, Y[i] + 5, t[0], 15, 162, C.ink, "start"));
        if (i < 3) s += P(`M150 ${Y[i] + 23} V${Y[i + 1] - 23}`, C.line, 2.5);
        s += f.N("tg" + i, 334, Y[i], 12);
      });
      s += f.D("esc", `M262 ${Y[3] + 10} C276 ${Y[3] - 10} 268 ${Y[0] + 40} 262 ${Y[0] + 6}`, C.red, 4);
      s += f.H("eh", arrowHead(262, Y[0] + 2, -90, C.red));
      s += f.H("cf", person(210, Y[3] - 2, 0.8, C.teal) + person(258, Y[3] - 2, 0.8, C.coral) + P(`M226 ${Y[3] - 12} L232 ${Y[3] - 4} L236 ${Y[3] - 14} L242 ${Y[3] - 6}`, C.red, 3));
      s += f.H("stp", G("rotate(-8 334 82)", R(282, 67, 104, 30, "rgba(255,255,255,.94)", 6, `stroke="${C.green}" stroke-width="3.5"`) + f.TK("stT", 334, 88, "", 15, C.green)));
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      const show = s.show == null ? 4 : s.show, tg = s.tags || {};
      for (let i = 0; i < 4; i++) {
        c.op("t" + i, i < show ? (s.hl != null && s.hl !== i && s.dim ? 0.35 : 1) : 0, { dl: 0.12 * i });
        c.mv("t" + i, { x: i < show ? 0 : -20, s: s.hl === i ? 1.03 : 1 });
        c.op("h" + i, s.hl === i ? 1 : 0);
        c.note("tg" + i, tg[i] ? (typeof tg[i] === "string" ? { t: tg[i], c: "N" } : tg[i]) : null, { dl: 0.3 + 0.1 * i });
      }
      c.dr("esc", s.esc || 0, { d: 1.3 }); c.op("eh", (s.esc || 0) >= 1 ? 1 : 0, { dl: 1 });
      c.op("cf", s.cf ? 1 : 0);
      c.tx("stT", s.stamp || ""); c.op("stp", s.stamp ? 1 : 0, { dl: 0.5 }); c.mv("stp", { s: s.stamp ? 1 : 1.4 }, { dl: 0.5 });
      c.note("nt", s.nt);
    }
  };
}

// template: Animated treemap — https://observablehq.com/@d3/animated-treemap
// Qasr's processes as tiles; a scope boundary that can be narrow, focused or broad; exclusions and dependencies.
function F_SCOPE(cfg) {
  const X = [72, 200, 328], Y = [72, 140, 208];
  const BOX = { n: [138, 108, 124, 64], f: [10, 40, 252, 134], b: [6, 40, 388, 202] };
  return {
    bench: "Animated treemap — https://observablehq.com/@d3/animated-treemap",
    draw(f) {
      let s = "";
      ["n", "f", "b"].forEach((k) => { const b = BOX[k]; s += f.H("b" + k, R(b[0], b[1], b[2], b[3], "rgba(23,143,128,.08)", 16, `stroke="${C.teal}" stroke-width="3.5" stroke-dasharray="9 6"`)); });
      cfg.tiles.forEach((t, i) => {
        const x = X[i % 3], y = Y[Math.floor(i / 3)];
        s += f.K("tl" + i, R(x - 56, y - 26, 112, 52, C.white, 10, `stroke="${C.navy2}" stroke-width="2"`) + ICO(t[1], x - 40, y, 0.55, C.navy2) + (t[0].indexOf("|") > -1 ? TF(x + 10, y - 2, t[0].split("|")[0], 12, 84) + TF(x + 10, y + 13, t[0].split("|")[1], 12, 84) : TF(x + 10, y + 5, t[0], 12, 84)));
        s += f.H("x" + i, R(x - 56, y - 26, 112, 52, "rgba(93,115,137,.55)", 10) + xmark(x + 40, y - 12, 0.7, C.white, 3));
        s += f.H("w" + i, R(x - 60, y - 30, 120, 60, "none", 12, `stroke="${C.red}" stroke-width="3" class="a-pulse"`));
      });
      s += f.H("dep", P(`M256 ${Y[1]} H270`, C.red, 3) + arrowHead(272, Y[1], 0, C.red) + P(`M200 ${Y[1] - 26} V${Y[0] + 28}`, C.red, 3) + arrowHead(200, Y[0] + 26, -90, C.red));
      s += f.N("bl", 200, 22, 14); s += f.N("nt", 200, 276, 13);
      return s;
    },
    render(c, s) {
      ["n", "f", "b"].forEach((k) => c.op("b" + k, s.box === k ? 1 : 0));
      cfg.tiles.forEach((_, i) => {
        c.op("tl" + i, has(s.hide, i) ? 0.15 : 1, { dl: 0.04 * i });
        c.op("x" + i, has(s.x, i) ? 1 : 0, { dl: 0.2 }); c.op("w" + i, has(s.w, i) ? 1 : 0);
        c.mv("tl" + i, { s: s.hl === i ? 1.08 : 1 });
      });
      c.op("dep", s.dep ? 1 : 0);
      c.note("bl", s.bl ? { t: s.bl, c: "T", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: contract process — https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8
// The strategy mandate as a document: scattered notes become sections, sections get ticked, a stamp, a handover.
function F_DOC(cfg) {
  const rows = cfg.rows;
  return {
    bench: "contract process — https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8",
    draw(f) {
      let s = f.H("sc", G("rotate(-12 70 70)", R(36, 52, 70, 46, C.cream, 4, `stroke="${C.gold}" stroke-width="2"`) + P("M44 66 H96 M44 76 H86", C.amber, 2)) +
        G("rotate(9 330 70)", R(296, 50, 72, 48, C.white, 4, `stroke="${C.navy2}" stroke-width="2"`) + P("M304 64 H358 M304 74 H340", C.navy2, 2)) +
        G("rotate(6 60 220)", R(24, 196, 70, 46, C.rose, 4, `stroke="${C.coral}" stroke-width="2"`) + P("M32 210 H84 M32 220 H72", C.coral, 2)) +
        G("rotate(-8 340 220)", R(304, 198, 70, 46, C.mint, 4, `stroke="${C.green}" stroke-width="2"`) + P("M312 212 H364 M312 222 H350", C.green, 2)) +
        T(200, 150, "?", 40, C.slate, 'class="a-pulse"'));
      s += f.K("pg", F("M112 26 H268 L288 46 V262 H112 Z", C.white, `stroke="${C.navy}" stroke-width="2.5"`) + F("M268 26 V46 H288", C.sky, `stroke="${C.navy}" stroke-width="2"`) +
        R(112, 46, 176, 30, C.navy) + T(200, 66, cfg.title, 14, C.white) +
        rows.map((r, i) => { const y = rows.length > 4 ? 92 + i * 30 : 96 + i * 34; return f.K("r" + i, R(122, y - 13, 156, 28, "#f1f4f7", 7) + ICO(r[1], 138, y + 1, 0.5, C.navy2) + TF(152, y + 6, r[0], 12, 112, C.ink, "start")) + f.H("k" + i, ICO("check", 279, y + 1, 0.55)) + f.H("q" + i, ICO("warn", 279, y + 1, 0.55)); }).join(""));
      s += f.H("sA", G("rotate(-12 200 252)", R(140, 235, 120, 34, "rgba(255,255,255,.92)", 6, `stroke="${C.green}" stroke-width="3.5"`) + T(200, 258, "ACCEPTED", 16, C.green)));
      s += f.H("sC", G("rotate(-12 200 252)", R(128, 235, 144, 34, "rgba(255,255,255,.92)", 6, `stroke="${C.amber}" stroke-width="3.5"`) + T(200, 258, "CONDITIONAL", 16, C.amber)));
      s += f.H("sX", G("rotate(-12 200 252)", R(140, 235, 120, 34, "rgba(255,255,255,.92)", 6, `stroke="${C.red}" stroke-width="3.5"`) + T(200, 258, "UNCLEAR", 16, C.red)));
      s += f.H("ho", P("M292 150 H330", C.teal, 4, 'class="a-flow"') + arrowHead(338, 150, 0, C.teal) + ICO("people", 364, 150, 0.95, C.teal) + T(364, 182, "Teams", 12, C.teal));
      s += f.H("sp", ICO("sponsor", 48, 150, 1.15, C.plum) + T(48, 182, "Sponsor", 12, C.plum));
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      const n = s.rows == null ? rows.length : s.rows, ok = s.ok || [], q = s.q || [];
      c.op("sc", s.scat ? 1 : 0); c.op("pg", s.scat ? 0.15 : 1); c.mv("pg", { s: s.scat ? 0.92 : 1 });
      for (let i = 0; i < rows.length; i++) {
        c.op("r" + i, i < n && !s.scat ? (s.hl != null && s.hl !== i ? 0.4 : 1) : 0, { dl: 0.1 * i }); c.mv("r" + i, { x: i < n ? 0 : 16 });
        c.op("k" + i, ok === "all" || has(ok, i) ? 1 : 0, { dl: 0.3 + 0.12 * i }); c.op("q" + i, has(q, i) ? 1 : 0, { dl: 0.3 });
      }
      ["A", "C", "X"].forEach((k) => { c.op("s" + k, s.stamp === k ? 1 : 0, { dl: 0.4 }); c.mv("s" + k, { s: s.stamp === k ? 1 : 1.5 }, { dl: 0.4 }); });
      c.op("ho", s.ho ? 1 : 0); c.op("sp", s.sp ? 1 : 0);
      c.note("nt", s.nt);
    }
  };
}

// template: Animated line chart lesson — https://observablehq.com/@d3/learn-d3-animation
// Baseline, target and measured line over time, with the spread of individual results.
function F_CHART(cfg) {
  const x0 = 54, x1 = 372, y0 = 236, y1 = 56, mx = cfg.max;
  const Yv = (v) => r1(y0 - (v / mx) * (y0 - y1));
  const pts = cfg.series.map((v, i) => [r1(x0 + i * (x1 - x0) / (cfg.series.length - 1)), Yv(v)]);
  const line = "M" + pts.map((p) => p[0] + " " + p[1]).join(" L");
  const band = "M" + pts.map((p, i) => p[0] + " " + r1(p[1] - cfg.spread[i])).join(" L") + " L" + pts.slice().reverse().map((p, i) => p[0] + " " + r1(p[1] + cfg.spread[cfg.spread.length - 1 - i])).join(" L") + " Z";
  return {
    bench: "Animated line chart lesson — https://observablehq.com/@d3/learn-d3-animation",
    draw(f) {
      let s = R(8, 24, 384, 248, C.white, 14, `stroke="${C.line}" stroke-width="2"`);
      s += P(`M${x0} ${y1 - 6} V${y0} H${x1 + 6}`, C.slate, 2.5) + T(x0 - 8, Yv(0) + 4, "0", 12, C.slate, "", "end") + T(x0 - 8, Yv(mx / 2) + 4, String(mx / 2), 12, C.slate, "", "end") + T(x0 - 8, Yv(mx) + 4, String(mx), 12, C.slate, "", "end");
      s += T((x0 + x1) / 2, 258, cfg.xl || "Weeks", 12, C.slate) + T(18, 46, cfg.unit, 12, C.slate, "", "start");
      s += f.H("band", F(band, "rgba(192,57,43,.14)"));
      s += f.H("go", P(`M${pts[cfg.live][0]} ${y1} V${y0}`, C.plum, 2.5, 'stroke-dasharray="5 4"') + chip(pts[cfg.live][0], y1 - 6, "Redesign live", { st: C.plum, sz: 11, free: 1 }));
      s += f.K("bl", P(`M${x0} ${Yv(cfg.base)} H${x1}`, C.coral, 3, 'stroke-dasharray="8 6"'));
      s += f.K("tl", P(`M${x0} ${Yv(cfg.tgt)} H${x1}`, C.green, 3.5));
      s += f.D("ml", line, C.navy, 4);
      s += f.H("ol", cfg.out.map((o) => O(pts[o[0]][0], Yv(o[1]), 5, C.red, `stroke="${C.white}" stroke-width="1.5"`)).join(""));
      s += f.N("bT", 300, Yv(cfg.base) - 14, 12); s += f.N("tT", 300, Yv(cfg.tgt) + 16, 12);
      s += f.N("nt", 200, 287, 13);
      return s;
    },
    render(c, s) {
      c.op("bl", s.bl ? 1 : 0); c.op("tl", s.tl ? 1 : 0);
      c.note("bT", s.bl ? { t: cfg.bT, c: "O", f: 1 } : null); c.note("tT", s.tl ? { t: cfg.tT, c: "G", f: 1 } : null);
      c.dr("ml", s.ml || 0, { d: 1.6 }); c.op("band", s.band ? 1 : 0); c.op("ol", s.ol ? 1 : 0, { dl: 0.3 }); c.cl("ol", "a-blink", !!s.ol);
      c.op("go", s.go ? 1 : 0);
      c.note("nt", s.nt);
    }
  };
}

// template: Payment Successful — https://lottiefiles.com/free-animation/payment-successful-5uXFkB4jix
// Four proposal cards and a budget of two coins: coins drop on the funded pair; the rest are deferred, not discarded.
function F_BUDGET() {
  const X = [56, 152, 248, 344], NM = [["Guest", "arrival", "guest"], ["Stock", "counting", "box"], ["Corporate", "billing", "invoice"], ["Spa", "booking", "spa"]];
  return {
    bench: "Payment Successful — https://lottiefiles.com/free-animation/payment-successful-5uXFkB4jix",
    draw(f) {
      let s = R(120, 14, 160, 30, C.navy, 15) + T(200, 34, "Budget: 2 of 4", 15, C.white);
      X.forEach((x, i) => {
        s += f.H("fg" + i, R(x - 48, 110, 96, 128, "none", 14, `stroke="${C.green}" stroke-width="4" class="a-pulse"`));
        s += f.K("cd" + i, R(x - 43, 116, 86, 116, C.white, 12, `stroke="${C.navy2}" stroke-width="2.5"`) + ICO(NM[i][2], x, 152, 1, C.navy2) + T(x, 196, NM[i][0], 13, C.ink) + T(x, 213, NM[i][1], 13, C.ink));
        s += f.H("df" + i, G(`rotate(-14 ${x} 146)`, R(x - 40, 134, 80, 22, "rgba(255,255,255,.94)", 5, `stroke="${C.slate}" stroke-width="2.5"`) + T(x, 150, "DEFERRED", 12, C.slate)));
        s += f.N("vk" + i, x, 252, 11);
      });
      s += f.H("cr", ICO("crown", 344, 106, 0.7));
      for (let k = 0; k < 2; k++) s += f.K("c" + k, ICO("coin", 176 + k * 48, 70, 0.95));
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      const n = s.cards == null ? 4 : s.cards, fund = s.fund || [];
      for (let i = 0; i < 4; i++) {
        c.op("cd" + i, i < n ? (s.hl != null && s.hl !== i ? 0.4 : 1) : 0, { dl: 0.1 * i });
        c.mv("cd" + i, { y: i < n ? 0 : 16, s: s.hl === i ? 1.06 : 1 });
        c.op("fg" + i, has(fund, i) ? 1 : 0, { dl: 0.6 }); c.op("df" + i, has(s.def, i) ? 1 : 0, { dl: 0.5 });
        c.note("vk" + i, s.vk && s.vk[i] ? { t: s.vk[i], c: "S" } : null);
      }
      for (let k = 0; k < 2; k++) {
        const tgt = fund[k];
        c.mv("c" + k, tgt == null ? {} : { x: X[tgt] - (176 + k * 48), y: 30 }, { d: 1, dl: 0.15 * k, e: "bounce.out" });
      }
      c.op("cr", s.crown ? 1 : 0); c.cl("cr", "a-pulse", !!s.crown);
      c.note("nt", s.nt);
    }
  };
}

// template: Interactive Computer Assembly Sequence — https://codepen.io/karlhorning/pen/OJqNMVR
// A concept assembled from its parts: the term on top, its components slide in and lock underneath.
function F_DEFINE(cfg) {
  const parts = cfg.parts, n = parts.length, slot = Math.min(98, 384 / n), w = slot - 10;
  const X = parts.map((_, i) => r1(200 + (i - (n - 1) / 2) * slot));
  const col = NC[cfg.c || "N"];
  return {
    bench: "Interactive Computer Assembly Sequence — https://codepen.io/karlhorning/pen/OJqNMVR",
    draw(f) {
      const tw0 = Math.min(372, tw(cfg.term, 17) + 40);
      let s = f.K("term", R(200 - tw0 / 2, 26, tw0, 44, col, 22) + ICO(cfg.icon || "doc", 200 - tw0 / 2 + 24, 48, 0.62, C.white) + T(200 + 12, 54, cfg.term, 17, C.white));
      parts.forEach((p, i) => {
        const pc = NC[p[3] || "N"];
        s += f.D("ln" + i, `M200 70 C200 100 ${X[i]} 104 ${X[i]} 132`, pc, 2.5);
        s += f.H("hr" + i, R(X[i] - w / 2 - 5, 129, w + 10, 112, "none", 14, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
        s += f.K("p" + i, R(X[i] - w / 2, 134, w, 102, C.white, 12, `stroke="${pc}" stroke-width="2.5"`) + R(X[i] - w / 2, 134, w, 7, pc, 3) + ICO(p[2], X[i], 166, 0.9, pc) + TF(X[i], 206, p[0], 13, w - 8) + TF(X[i], 222, p[1] || "", 13, w - 8));
      });
      s += f.N("nt", 200, 266, 13); s += f.N("n2", 200, 102, 12);
      return s;
    },
    render(c, s) {
      const k = s.n == null ? n : s.n;
      c.mv("term", { s: s.pop ? 1.05 : 1 });
      for (let i = 0; i < n; i++) {
        c.op("p" + i, i < k ? (s.hl != null && s.hl !== i ? 0.4 : 1) : 0, { dl: 0.12 * i });
        c.mv("p" + i, { y: i < k ? 0 : 50, s: s.hl === i ? 1.06 : 1 }, { dl: 0.12 * i });
        c.dr("ln" + i, i < k ? 1 : 0, { dl: 0.12 * i + 0.2 }); c.op("hr" + i, s.hl === i ? 1 : 0);
      }
      c.note("nt", s.nt); c.note("n2", s.n2);
    }
  };
}

// template: Sankey animation - acyclic graph — https://observablehq.com/@joaormendes/sankey-animation-acyclic-graph
// Several influences flowing into one result: a single cause cannot claim the whole outcome.
function F_SANKEY(cfg) {
  const src = cfg.src, Ys = src.map((_, i) => 64 + i * 56), OX = 318, OY = 150;
  return {
    bench: "Sankey animation - acyclic graph — https://observablehq.com/@joaormendes/sankey-animation-acyclic-graph",
    draw(f) {
      let s = "";
      src.forEach((sr, i) => {
        const col = NC[sr[2] || "N"];
        s += f.D("fl" + i, `M150 ${Ys[i]} C230 ${Ys[i]} 220 ${OY + (i - (src.length - 1) / 2) * 12} ${OX - 46} ${OY + (i - (src.length - 1) / 2) * 12}`, col, sr[1], 'stroke-linecap="butt" opacity=".55"');
        s += f.K("s" + i, R(12, Ys[i] - 21, 138, 42, C.white, 10, `stroke="${col}" stroke-width="2.5"`) + ICO(sr[3] || "gear", 32, Ys[i], 0.55, col) + TF(48, Ys[i] + 5, sr[0], 13, 96, C.ink, "start"));
        s += f.H("q" + i, ICO("q", 210, Ys[i] + (OY - Ys[i]) * 0.4, 0.7));
      });
      s += f.K("out", O(OX, OY, 48, C.white, `stroke="${C.coral}" stroke-width="4"`) + ICO(cfg.icon || "growth", OX, OY - 8, 1.1, C.coral) + T(OX, OY + 30, cfg.out, 12, C.coral));
      s += f.N("ttl", 200, 22, 14); s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      const n = s.show == null ? src.length : s.show;
      src.forEach((_, i) => {
        c.op("s" + i, i < n ? (s.hl != null && s.hl !== i ? 0.45 : 1) : 0, { dl: 0.12 * i });
        c.dr("fl" + i, i < n ? 1 : 0, { dl: 0.2 + 0.12 * i });
        c.op("q" + i, s.q === i ? 1 : 0, { dl: 0.5 });
      });
      c.mv("out", { s: s.pop ? 1.08 : 1 });
      c.note("ttl", s.ttl ? { t: s.ttl, c: "N", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: Celonis Process Explorer map — https://help.celonis.com/cpm47/en/process-explorer
// Local optimisation: one department hits its target in the spotlight while the connected parts turn red.
function F_SPOT(cfg) {
  const P4 = [[78, 64], [322, 64], [78, 236], [322, 236]];
  return {
    bench: "Celonis Process Explorer map — https://help.celonis.com/cpm47/en/process-explorer",
    draw(f) {
      let s = R(0, 0, 400, 300, "#22344a");
      s += f.H("cone", F("M170 -10 H230 L292 196 H108 Z", "rgba(255,240,180,.22)"));
      P4.forEach((p, i) => { s += f.K("ln" + i, P(`M200 150 L${p[0]} ${p[1]}`, C.muted, 3, 'stroke-dasharray="6 6" class="a-flow"')); });
      s += f.H("rp", `<g class="a-pulse">${O(200, 150, 92, "none", `stroke="${C.red}" stroke-width="3" opacity=".7"`)}</g>`);
      s += f.K("ctr", R(132, 118, 136, 64, C.white, 14, `stroke="${C.teal}" stroke-width="3"`) + ICO(cfg.center[1], 160, 150, 0.8, C.teal) + T(214, 156, cfg.center[0], 14, C.ink));
      s += f.H("met", chip(200, 202, "Target met", { st: C.green, bg: C.green, fg: C.white, sz: 13, free: 1 }));
      cfg.around.forEach((a, i) => {
        const p = P4[i];
        s += f.K("o" + i, R(p[0] - 70, p[1] - 26, 140, 52, C.white, 12, `stroke="${C.navy2}" stroke-width="2.5"`) + ICO(a[1], p[0] - 50, p[1], 0.6, C.navy2) + TF(p[0] + 12, p[1] + 5, a[0], 13, 104));
        s += f.H("b" + i, R(p[0] - 70, p[1] - 26, 140, 52, "rgba(192,57,43,.2)", 12, `stroke="${C.red}" stroke-width="3"`) + ICO("warn", p[0] + 62, p[1] - 24, 0.6));
      });
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      c.op("cone", s.spot ? 1 : 0); c.op("met", s.met ? 1 : 0, { dl: 0.3 }); c.op("rp", s.rp ? 1 : 0);
      for (let i = 0; i < 4; i++) {
        c.op("o" + i, s.dim ? 0.35 : 1); c.op("b" + i, has(s.bad, i) ? 1 : 0, { dl: 0.2 + 0.2 * i });
        c.sk("ln" + i, has(s.bad, i) ? C.red : C.muted);
      }
      c.note("nt", s.nt);
    }
  };
}

// template: Roadmap / Project schedule — https://lottiefiles.com/free-animation/roadmapproject-schedule-krKjaLHUr0
// The assessed forum week: post by mid-week, reply to two peers (one disagreement), read the summary.
function F_FORUM() {
  const DX = [40, 93, 147, 200, 253, 307, 360], DN = ["M", "T", "W", "T", "F", "S", "S"];
  return {
    bench: "Roadmap / Project schedule — https://lottiefiles.com/free-animation/roadmapproject-schedule-krKjaLHUr0",
    draw(f) {
      let s = P("M40 34 H360", C.line, 4) + DX.map((x, i) => O(x, 34, 8, C.white, `stroke="${C.navy2}" stroke-width="2.5"`) + T(x, 16, DN[i], 12, C.slate)).join("");
      s += f.H("mid", ICO("flag", 200, 30, 0.75) + chip(200, 60, "Post by mid-week", { st: C.coral, sz: 11, free: 1 }));
      s += f.K("day", O(40, 34, 11, C.coral, `stroke="${C.white}" stroke-width="3"`));
      s += f.H("post", R(12, 80, 176, 88, C.white, 12, `stroke="${C.navy}" stroke-width="2.5"`) + ICO("person", 36, 104, 0.8, C.navy) + T(56, 109, "Your position", 13, C.ink, "", "start") + P("M28 132 H170 M28 146 H150", C.line, 5));
      s += f.H("ev", chip(100, 178, "Concepts + evidence", { st: C.teal, sz: 11, free: 1 }));
      for (let i = 0; i < 2; i++) {
        const y = 80 + i * 78;
        s += f.H("p" + i, R(212, y, 176, 62, C.white, 12, `stroke="${C.slate}" stroke-width="2"`) + ICO("person", 234, y + 22, 0.7, [C.plum, C.gold][i]) + T(252, y + 27, "Peer " + (i + 1), 13, C.ink, "", "start") + P(`M228 ${y + 46} H368`, C.line, 5));
        s += f.D("r" + i, `M188 ${124} C200 ${124} 200 ${y + 31} 210 ${y + 31}`, C.teal, 3);
      }
      s += f.H("dis", chip(330, 228, "Reasoned disagreement", { st: C.red, sz: 11 }));
      s += f.H("sum", R(12, 200, 176, 56, C.cream, 12, `stroke="${C.gold}" stroke-width="2.5"`) + ICO("doc", 34, 228, 0.7, C.amber) + T(54, 225, "Facilitator", 13, C.ink, "", "start") + T(54, 242, "summary", 13, C.ink, "", "start"));
      s += f.H("pct", O(336, 268, 25, C.coral) + T(336, 274, "15%", 16, C.white));
      s += f.H("lo", chip(244, 262, "K1 · K2 · S1", { st: C.plum, sz: 12, free: 1 }));
      s += f.N("nt", 200, 288, 12);
      return s;
    },
    render(c, s) {
      const d = s.day == null ? 0 : s.day;
      c.mv("day", { x: DX[clamp(d, 0, 6)] - 40 }, { d: 1 });
      c.op("mid", s.mid ? 1 : 0); c.op("post", s.post ? 1 : 0); c.op("ev", s.ev ? 1 : 0, { dl: 0.3 });
      for (let i = 0; i < 2; i++) { c.op("p" + i, (s.peers || 0) > i ? 1 : 0, { dl: 0.15 * i }); c.dr("r" + i, (s.rep || 0) > i ? 1 : 0, { dl: 0.3 + 0.2 * i }); }
      c.op("dis", s.dis ? 1 : 0, { dl: 0.5 }); c.op("sum", s.sum ? 1 : 0); c.op("pct", s.pct ? 1 : 0); c.op("lo", s.lo ? 1 : 0, { dl: 0.2 });
      c.note("nt", s.nt);
    }
  };
}

// template: Success — https://lottiefiles.com/free-animation/success-he8DVHwbzM
// Delivery versus benefit: the change is installed (tick) but the benefit meter needs evidence, with owners for each.
function F_BENEFIT(cfg = {}) {
  return {
    bench: "Success — https://lottiefiles.com/free-animation/success-he8DVHwbzM",
    draw(f) {
      let s = R(26, 64, 140, 122, C.white, 14, `stroke="${C.navy2}" stroke-width="2.5"`) + ICO("gear", 96, 112, 1.3, C.navy2) + T(96, 168, cfg.left || "Delivered", 15, C.navy2);
      s += f.H("dk", ICO("check", 150, 72, 0.9));
      s += f.D("ar", "M172 126 H226", C.slate, 4); s += f.H("ah", arrowHead(232, 126, 0, C.slate));
      s += f.H("mg", ICO("mag", 200, 100, 0.8, C.ink));
      s += R(262, 40, 44, 160, C.white, 22, `stroke="${C.green}" stroke-width="3"`) + O(284, 206, 24, C.white, `stroke="${C.green}" stroke-width="3"`);
      s += f.K("mf", R(270, 48, 28, 148, C.green, 14), `data-pv="284 196"`) + O(284, 206, 18, C.green);
      s += f.H("mq", T(284, 132, "?", 40, C.coral, 'class="a-pulse"'));
      s += T(284, 26, cfg.right || "Benefit", 15, C.green);
      s += f.H("m2", R(334, 70, 30, 120, C.white, 15, `stroke="${C.red}" stroke-width="2.5"`) + R(340, 146, 18, 38, C.red, 9) + T(349, 58, cfg.m2 || "Rating", 12, C.red) + P("M372 120 V160", C.red, 3) + arrowHead(372, 166, 90, C.red));
      s += f.N("ol", 96, 220, 12); s += f.N("or", 284, 252, 12);
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      c.op("dk", s.done ? 1 : 0); c.dr("ar", s.ar ? 1 : 0); c.op("ah", s.ar ? 1 : 0, { dl: 0.6 }); c.op("mg", s.mg ? 1 : 0);
      c.mv("mf", { sy: Math.max(0.02, s.meter || 0), pv: [284, 196] }, { d: 1.2 });
      c.op("mq", s.q ? 1 : 0); c.op("m2", s.m2 ? 1 : 0);
      c.note("ol", s.own ? { t: cfg.lo || "Programme manager", c: "N" } : null); c.note("or", s.own ? { t: cfg.ro || "Line owner", c: "G", f: 1 } : null, { dl: 0.2 });
      c.note("nt", s.nt);
    }
  };
}

// =====================================================================
// W5O2a · Tracing proposals to strategic objectives (30 narration lines)
// Story: automated check-in claims service and cost -> traceability =
// change -> effect -> objective -> guests differ, so evidence is needed ->
// the mechanism gear train, savings minus new costs -> direct vs indirect
// links and their strength -> one objective gains, another is put at risk.
// =====================================================================
{
  const id = "W5O2a";
  const AC = "Automated check-in";
  const plan = [
    ["title", { k: "Week 5 · Lesson 2", t1: "Tracing proposals", t2: "to objectives", sub: "Show the link, not a label" }, "Tracing proposals to objectives"],
    ["obj", { show: 3, nt: { t: "Does it really contribute?", c: "P" } }, "From strategy to contribution"],
    ["ask", { q: "Which of Qasr's strategic objectives would automated check-in actually support?", o: ["Shorter queues", "Fewer staff"], oc: ["T", "A"] }, "The automated check-in proposal"],
    ["obj", { show: 3, prop: AC, links: [3, 0, 0], sign: [1, 0, 0], wl: ["Claimed", "", ""], hl: 0 }, "Claim 1: service leadership"],
    ["obj", { show: 3, prop: AC, links: [3, 3, 0], sign: [1, 1, 0], wl: ["Claimed", "Claimed", ""], nt: { t: "Two alignment claims", c: "A" } }, "Claim 2: lower costs"],
    ["obj", { show: 3, prop: AC, links: [2, 2, 0], sign: [0, 0, 0], wl: ["Plausible?", "Plausible?", ""], nt: { t: "Plausible is not proven", c: "R" } }, "Plausible is not priority"],
    ["define", { n: 3, nt: "Change → effect → objective" }, "Traceability: an explained link"],
    ["chain", { up: 1, ttl: "Tracing the check-in proposal", nt: "Eligible guests check in digitally" }, "The change: digital check-in"],
    ["chain", { up: 2, dr: 1, at: 1, nt: "Shorter waits at peak arrivals" }, "The effect: shorter queues"],
    ["chain", { up: 4, dr: 3, at: 3, nt: { t: "Only if guests value it", c: "A" } }, "Value depends on experience"],
    ["desk", { n: 3, staff: 1, wait: "5 min", alerts: ["Likes self-service", "Needs reassurance"], acs: ["G", "R"], nt: "Guests differ" }, "Some guests need a person"],
    ["desk", { n: 3, staff: 1, wait: "5 min", alerts: ["Preferences?", "Service outcomes?"], acs: ["P", "P"], nt: { t: "Evidence before judging", c: "P" } }, "Evidence before judging alignment"],
    ["obj", { show: 3, prop: "Kiosk + \"service\" label", links: [1, 0, 0], sign: [0, 0, 0], wl: ["Label only", "", ""], nt: { t: "A label is not a link", c: "R" } }, "A label is not alignment"],
    ["gear", { turn: 1, belt: 1, dial: 0.3, prop: AC, nt: "How does value arise?" }, "Explain the mechanism"],
    ["gear", { turn: 2, belt: 1, dial: 0.5, coins: "gain", prop: "Finance's cost claim", nt: "Lower staffing costs" }, "Finance claims a cost benefit"],
    ["vs", { show: "a", va: "w" }, "Claimed: lower labour cost"],
    ["vs", { show: "ab", va: "w", vb: "ok", nt: "Net effect = savings − new costs" }, "Evidence: the net effect"],
    ["gear", { turn: 3, belt: 1, coins: "net", dial: 0.15, prop: "Net saving", nt: "Measured per occupied room?" }, "Compare with cost per room"],
    ["ask", { q: "What evidence would convince you that automation genuinely reduces cost per occupied room?", o: ["Net savings", "Room-nights", "Agreed cost rules"], oc: ["A", "N", "P"] }, "What evidence convinces you?"],
    ["strength", { up: 4, dr: 3, ttl: "Direct or indirect?", nt: "Distinguish the links" }, "Direct versus indirect links"],
    ["obj", { show: 3, prop: "Billing accuracy", links: [0, 0, 3], sign: [0, 0, 1], wl: ["", "", "Direct"], nt: "Housekeeping speed: indirect" }, "Billing: a clearer link"],
    ["strength", { up: 4, dr: 3, hl: 2, dim: 1, nt: { t: "Direct is not automatically large", c: "A" } }, "Benefit depends on implementation"],
    ["strength", { up: 4, dr: 3, hl: 3, dim: 1, nt: "Judge strength, not decimals" }, "Strength is a judgement"],
    ["scale", { t: -0.6, nl: 1, nr: 0, ttl: "Conflicting contributions" }, "One objective gains…"],
    ["scale", { t: -0.6, nl: 1, nr: 1, ttl: "Conflicting contributions", mid: { t: "Cheaper, less personal", c: "R" } }, "…another is put at risk"],
    ["obj", { show: 3, prop: AC, links: [2, 2, 0], sign: [-1, 1, 0], wl: ["Risk", "Saves", ""], rk: [0], ok: [1], nt: "Document both effects" }, "Document competing effects"],
    ["obj", { show: 3, prop: AC, links: [2, 2, 0], sign: [-1, 1, 0], wl: ["Risk", "Saves", ""], rk: [0], ok: [1], nt: { t: "A transparent basis to compare", c: "G" } }, "A transparent comparison"],
    ["scale", { t: 0, nl: 1, nr: 1, guard: "Sponsor decides", ttl: "Evidence informs", mid: { t: "Sponsors set the priorities", c: "P" } }, "Sponsors decide what matters"],
    ["chain", { up: 4, dr: 3, at: 3, ttl: "Every proposer explains", nt: "Change and consequences" }, "Each proposer traces their case"],
    ["ask", { q: "Can you trace a proposal from its operational change to strategic value while recognising uncertainty and competing effects?", o: ["Four proposals", "Funding for two"], oc: ["N", "O"] }, "Next: four proposals, two funded"]
  ];
  window.VL_SCENES["W5O2a"] = makeScene({
    id, bg: "#edf1f6", plan,
    desc: "Automated check-in is traced from change to effect to objective: plausible claims are tested, the mechanism and net savings are shown, link strength is judged and conflicting effects are documented for sponsors.",
    fams: {
      title: F_TITLE({ icon: "link", col: C.navy }), // template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
      obj: F_OBJ(), // template: Infographics Pack by ARstudio — https://motionarray.com/after-effects-templates/infographics-pack-135055/
      ask: F_ASK(), // template: Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD
      define: F_DEFINE({ term: "Strategic traceability", icon: "link", c: "N", parts: [["Proposed", "change", "gear", "T"], ["Expected", "effect", "clock", "A"], ["Objective", "supported", "target", "O"]] }), // template: Interactive Computer Assembly Sequence — https://codepen.io/karlhorning/pen/OJqNMVR
      chain: F_CHAIN({ nodes: [["Digital", "check-in", "kiosk", "N"], ["Shorter", "queues", "clock"], ["Better arrival", "experience", "guest"], ["Service", "leadership", "star", "T"]] }), // template: Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO
      desk: F_DESK({ sign: "Self check-in" }), // template: Waiting Queue — https://lottiefiles.com/free-animation/waiting-queue-xoNutPl764
      gear: F_GEAR({ labels: ["Change", "Effect", "Contribution"], dial: "Objective served" }), // template: Process - Success — https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP
      vs: F_VS({ a: { t: "Claimed benefit", icon: "coin", c: "A", items: ["Less reception labour", "Lower expenditure"] }, b: { t: "Evidence required", icon: "mag", c: "N", items: ["Labour savings", "Software and upkeep", "Training and support"] } }), // template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
      strength: BENCH(F_CHAIN({ nodes: [["Proposed", "change", "gear"], ["Expected", "process effect", "clock"], ["Strategic", "contribution", "target", "O"], ["Evidence", "confidence", "mag", "P"]] }), "Data Workflow Animation — https://dribbble.com/shots/27247003-Data-Workflow-Animation"), // template: Data Workflow Animation — https://dribbble.com/shots/27247003-Data-Workflow-Animation
      scale: F_SCALE({ L: { t: "Cost objective", c: "A", items: ["Lower labour cost"] }, R: { t: "Service objective", c: "T", items: ["Less personal care"] } }) // template: Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p
    }
  });
}


// =====================================================================
// W5O2b · Qasr's three strategies and four proposals (31 narration lines)
// Story: four directors, budget for two -> three objectives -> Exhibit 5
// builds row by row (arrival 3-2-3, stock 0-2-0, billing 2-1-3, spa 2-0-0)
// -> mechanisms for arrival and billing -> a budget holder's narrow proposal
// -> broader vs narrower alignment -> a starting point, not a formula.
// =====================================================================
{
  const id = "W5O2b";
  const P4 = ["Guest arrival", "Stock counting", "Corporate billing", "Spa booking"];
  const plan = [
    ["title", { k: "Week 5 · Lesson 2", t1: "Three strategies,", t2: "four proposals", sub: "Funding for only two", sc: "O" }, "Three strategies, four proposals"],
    ["board", { on: 4, say: ["Arrival redesign", "Stock automation", "Billing rebuild", "Spa refit"], coins: 2, jl: "Funds two of four" }, "Four proposals, budget for two"],
    ["ask", { q: "Which two improvements should Qasr fund, and what evidence would justify that choice?", o: P4 }, "Evidence before preferences"],
    ["obj", { show: 3, nt: "Service · cost −10% · growth" }, "Qasr's three objectives"],
    ["obj", { show: 3, hl: 2, nt: { t: "Test each proposal three ways", c: "N" } }, "+25% corporate accounts"],
    ["matrix", { rows: 4, cells: 0, nt: "Exhibit 5" }, "Exhibit 5: alignment by objective"],
    ["matrix", { rows: 4, cells: 4, nt: "None · weak · moderate · strong" }, "Four strengths of relationship"],
    ["matrix", { cells: 4, tot: 1, hl: 0, also: [2], nt: { t: "Totals are judgement, not return", c: "R" } }, "Totals 8 and 6: a judgement"],
    ["ask", { q: "Which proposal supports several strategic objectives rather than concentrating its benefits in one area?", o: P4 }, "Read the pattern, not confidence"],
    ["matrix", { cells: [0], hl: 0, colhl: [0, 2], nt: "Strong: service and growth" }, "Guest arrival: strong twice"],
    ["matrix", { cells: [0], hl: 0, colhl: [1], tot: 1, nt: "Moderate on cost" }, "A broad strategic contribution"],
    ["arr", { up: 4, dr: 3, at: 3, ttl: "Why the pattern makes sense" }, "Dependable arrivals, loyal travellers"],
    ["matrix", { cells: [0], hl: 0, colhl: [1], tot: 1, nt: { t: "Cost benefit still needs evidence", c: "A" } }, "Cost link still unproven"],
    ["board", { on: 4, spk: 1, say: ["", "No more manual counts", "", ""], coins: 2, jl: "Funds two of four" }, "Automate stock counting"],
    ["matrix", { cells: [0, 1], hl: 1, colhl: [1], tot: 1, nt: "Moderate cost, nothing else" }, "Stock counting: cost only"],
    ["budget", { cards: 4, hl: 1, vk: ["", "Genuine saving"], nt: "Narrower than claimed" }, "A real but narrow saving"],
    ["ask", { q: "Should Qasr fund a genuine saving when other proposals support more of its strategic ambitions?", o: ["Genuine saving", "Broader support"], oc: ["A", "T"] }, "Savings alone don't set priority"],
    ["matrix", { cells: [0, 1, 2], hl: 2, colhl: [2], tot: 1, nt: "Strong growth, moderate service" }, "Corporate billing's pattern"],
    ["matrix", { cells: [0, 1, 2], hl: 2, colhl: [1], tot: 1, nt: { t: "Weak on cost: not an efficiency play", c: "A" } }, "Not mainly an efficiency project"],
    ["bill", { up: 4, dr: 3, at: 3, ttl: "Billing's mechanism" }, "Clear invoices, fewer disputes"],
    ["bill", { up: 4, dr: 3, hl: 3, dim: 1, nt: { t: "Growth must still be shown", c: "A" } }, "Credible, not yet demonstrated"],
    ["board", { on: 4, spk: 3, say: ["", "", "", "Refit spa booking"], coins: 2, jl: "Spa director holds budget" }, "The spa booking refit"],
    ["matrix", { cells: 4, hl: 3, crown: 1, colhl: [0], tot: 1, nt: "Moderate service only" }, "Spa: moderate service only"],
    ["scale", { t: -0.5, ttl: "Influence versus evidence", mid: { t: "Authority is not evidence", c: "R" } }, "Sponsorship cannot replace evidence"],
    ["scale", { t: 0, guard: "Same criteria", ttl: "Influence versus evidence", mid: { t: "Same rules for every director", c: "P" } }, "Same criteria for everyone"],
    ["matrix", { cells: 4, tot: 1, nt: "Compare all four honestly" }, "Comparing all four"],
    ["vs", { show: "a", va: "ok" }, "Arrival and billing: broader"],
    ["vs", { show: "ab", va: "ok", vb: "w", nt: { t: "Broader is not automatically decisive", c: "A" } }, "Priorities and risks still matter"],
    ["matrix", { cells: 4, tot: 1, nt: { t: "A starting point, not a formula", c: "P" } }, "A starting point, not a formula"],
    ["budget", { cards: 4, nt: { t: "State priorities and sacrifices", c: "P" } }, "Explain priorities and sacrifices"],
    ["ask", { q: "Which two proposals would you recommend, and which strategic trade-offs would your recommendation create?", o: P4 }, "Your two, and their trade-offs"]
  ];
  window.VL_SCENES["W5O2b"] = makeScene({
    id, bg: "#f3f0ea", plan,
    desc: "Exhibit 5 is built row by row: guest arrival strong-moderate-strong, stock counting moderate on cost only, corporate billing moderate-weak-strong, spa booking moderate on service only, with budget-holder influence held to the same criteria.",
    fams: {
      title: F_TITLE({ icon: "scale", col: C.coral }), // template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
      board: F_BOARD({ who: [["Arrival", "T"], ["Operations", "A"], ["Commercial", "O"], ["Spa", "P"]] }), // template: Business Analytics Meeting — https://lottiefiles.com/free-animation/business-analytics-C1COKzrIkL
      ask: F_ASK(), // template: Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD
      obj: F_OBJ(), // template: Infographics Pack by ARstudio — https://motionarray.com/after-effects-templates/infographics-pack-135055/
      matrix: F_MATRIX(), // template: Stacked-to-grouped bars — https://observablehq.com/@d3/stacked-to-grouped-bars
      arr: F_CHAIN({ nodes: [["Dependable", "arrivals", "guest", "T"], ["Better guest", "experience", "star", "T"], ["Business", "travellers return", "handshake", "O"], ["Corporate", "growth", "growth", "O"]] }), // template: Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO
      bill: BENCH(F_CHAIN({ nodes: [["Accurate", "invoices", "invoice", "N"], ["Fewer", "disputes", "check", "N"], ["Easier", "accounts", "handshake", "O"], ["Corporate", "growth", "growth", "O"]] }), "Workflow AI Animation — https://dribbble.com/shots/26275497-Workflow-AI-Animation"), // template: Workflow AI Animation — https://dribbble.com/shots/26275497-Workflow-AI-Animation
      budget: F_BUDGET(), // template: Payment Successful — https://lottiefiles.com/free-animation/payment-successful-5uXFkB4jix
      scale: F_SCALE({ L: { t: "Budget authority", c: "P", items: ["Controls funds", "Sponsor's wish"] }, R: { t: "Strategic evidence", c: "G", items: ["Moderate service", "No cost or growth"] } }), // template: Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p
      vs: F_VS({ a: { t: "Broader alignment", icon: "growth", c: "G", items: ["Guest arrival: 8", "Corporate billing: 6"] }, b: { t: "Narrower alignment", icon: "box", c: "S", items: ["Stock counting: 2", "Spa booking: 2"] } }) // template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
    }
  });
}


// =====================================================================
// W5O2c · Making a defensible funding decision (29 narration lines)
// Story: re-read Exhibit 5 -> an illustrative sponsor priority (service +
// growth) -> arrival and billing become candidates -> 8 vs 6 is false
// precision -> feasibility can overrule -> fund now vs defer for review ->
// the budget holder objects, same criteria apply -> the decision is recorded.
// =====================================================================
{
  const id = "W5O2c";
  const plan = [
    ["title", { k: "Week 5 · Lesson 2", t1: "A defensible", t2: "funding decision", sub: "Priorities, evidence, risks, deferrals" }, "Making a defensible decision"],
    ["budget", { cards: 4, nt: { t: "Approve one, postpone another", c: "A" } }, "Two funded means two wait"],
    ["ask", { q: "Could you defend your recommendation without simply claiming that your preferred projects are better?", o: ["Unfunded directors", "Your reasons"], oc: ["R", "G"] }, "Defend it to those who lose"],
    ["matrix", { cells: 4, nt: "Re-read the evidence first" }, "Evidence before costs and preferences"],
    ["matrix", { cells: 4, hl: 0, colhl: [0, 2], nt: "Strong · moderate · strong" }, "Guest arrival: broad support"],
    ["matrix", { cells: 4, hl: 2, colhl: [2], nt: "Strong growth, weak cost" }, "Corporate billing: growth strong"],
    ["matrix", { cells: 4, hl: 1, also: [3], nt: "Narrower contributions" }, "Stock and spa: narrower"],
    ["obj", { show: 3, nt: { t: "Directors choose the emphasis", c: "P" } }, "Evidence still needs priorities"],
    ["obj", { show: 3, ok: [0, 2], dim: [1], nt: "Illustrative sponsor priority" }, "Priority: service and growth"],
    ["obj", { show: 3, ok: [0, 2], dim: [1], prop: "This round's priority", links: [3, 0, 3], sign: [1, 0, 1], wl: ["Experience", "", "Reliable accounts"] }, "What this priority favours"],
    ["matrix", { cells: 4, hl: 0, colhl: [0, 2], fund: [0], nt: "Strong on both priorities" }, "Guest arrival: a credible candidate"],
    ["chain", { up: 3, dr: 2, at: 2, good: [2], ttl: "An illustrative recommendation" }, "Billing supports growth too"],
    ["chain", { up: 3, dr: 2, hl: 2, ttl: "Follows the stated priority", nt: "Not a mechanical calculation" }, "Priority-led, not formula-led"],
    ["matrix", { cells: 4, tot: 1, hl: 0, also: [2], nt: { t: "Adding ratings looks precise", c: "R" } }, "8 versus 6: false precision"],
    ["scale", { t: 0, nl: 2, nr: 3, ttl: "Also weigh", mid: "Feasibility · cost · dependencies" }, "Feasibility and dependencies matter"],
    ["ask", { q: "What evidence could change your recommendation even if the strategic alignment ratings remained unchanged?", o: ["Cost estimates", "Delivery capacity", "Dependencies"], oc: ["A", "N", "P"] }, "What could change your mind?"],
    ["scale", { t: 0.7, nl: 2, nr: 3, ttl: "Billing needs a costly system", mid: { t: "Exceeds delivery capacity", c: "R" } }, "Billing exceeds capacity"],
    ["scale", { t: 0.2, nl: 2, nr: 3, guard: "Timing · scope · mix", ttl: "Respond, don't ignore", mid: "Aligned ≠ able to proceed" }, "Rethink timing, scope or mix"],
    ["budget", { cards: 4, fund: [0, 2], hl: 1, vk: ["", "Useful savings"], nt: "Narrower strategic contribution" }, "Stock counting: useful savings"],
    ["vs", { show: "a", va: "ok" }, "Fund now: arrival and billing"],
    ["vs", { show: "ab", va: "ok", vb: "w", nt: { t: "If cost led, another answer", c: "A" } }, "Different priority, different answer"],
    ["budget", { cards: 4, fund: [0, 2], def: [1, 3], nt: "Declared priorities, not a ranking" }, "No universal project ranking"],
    ["gov", { show: 4, hl: 2, tags: { 2: { t: "Objects", c: "R" } }, nt: { t: "Budget holder backs spa", c: "R" } }, "The budget holder objects"],
    ["gov", { show: 4, hl: 1, tags: { 1: { t: "Same evidence", c: "T" }, 2: { t: "Objects", c: "R" } }, nt: "Acknowledge, then apply criteria" }, "Same evidence from every sponsor"],
    ["gov", { show: 4, hl: 0, tags: { 0: { t: "Applies criteria", c: "G" }, 2: { t: "Authority ≠ value", c: "P" } }, stamp: "Criteria" }, "Authority is not strategic value"],
    ["doc", { rows: 4, ok: [0, 1, 2], q: [3] }, "Record rationale and risks"],
    ["doc", { rows: 5, ok: [0, 1, 2], q: [3], hl: 2, nt: "What Qasr gives up" }, "State what is sacrificed"],
    ["doc", { rows: 5, ok: "all", stamp: "A", nt: "Revisit if evidence changes" }, "Revisit when evidence changes"],
    ["ask", { q: "Can you defend two investments while explaining why the rejected proposals still have genuine value?", o: ["Choose deliberately", "Accept consequences", "Stay accountable"], oc: ["N", "A", "G"] }, "Strategic discipline"]
  ];
  window.VL_SCENES["W5O2c"] = makeScene({
    id, bg: "#eef2ec", plan,
    desc: "Qasr's illustrative recommendation funds guest arrival and corporate billing under a stated service-and-growth priority, tests feasibility, defers stock counting and spa booking without denying their value, and records the decision.",
    fams: {
      title: F_TITLE({ icon: "gavel", col: C.green }), // template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
      budget: F_BUDGET(), // template: Payment Successful — https://lottiefiles.com/free-animation/payment-successful-5uXFkB4jix
      ask: F_ASK(), // template: Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD
      matrix: F_MATRIX(), // template: Stacked-to-grouped bars — https://observablehq.com/@d3/stacked-to-grouped-bars
      obj: F_OBJ(), // template: Infographics Pack by ARstudio — https://motionarray.com/after-effects-templates/infographics-pack-135055/
      chain: F_CHAIN({ nodes: [["Guest arrival", "redesign", "guest", "T"], ["Corporate", "billing", "invoice", "O"], ["Service and", "growth priority", "target", "G"]] }), // template: Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO
      scale: F_SCALE({ L: { t: "Strategic alignment", c: "G", items: ["Relevant", "Strong growth"] }, R: { t: "Feasibility", c: "R", items: ["Capacity", "Cost estimate", "Dependencies"] } }), // template: Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p
      vs: F_VS({ a: { t: "Fund now", icon: "coin", c: "G", items: ["Guest arrival", "Corporate billing", "Serve the priority"] }, b: { t: "Defer for review", icon: "hourglass", c: "S", items: ["Stock counting", "Spa booking", "Still useful"] } }), // template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
      gov: F_LADDER({ tiers: [["Steering group", "people", "N"], ["Programme director", "person", "T"], ["Budget holder", "crown", "P"], ["Other sponsors", "people", "S"]] }), // template: Hierarchy traversal animated — https://old.observablehq.com/@d3/hierarchy-traversal-animated
      doc: F_DOC({ title: "Funding decision", rows: [["Strategic priority", "target"], ["Supporting evidence", "mag"], ["Accepted trade-offs", "scale"], ["Open assumptions", "warn"], ["Accountable approval", "sponsor"]] }) // template: contract process — https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8
    }
  });
}

})();
// END w05-claude-part2.js

// OPER621 · Week 5 · Organization Strategy · animated teaching scenes, version 1 (claude)
// File: w05-claude-part3.js · Sections: W5O3a, W5O3b, W5O3c
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }.
// step(i, n): one plan entry per narration line of the section (n = number of
// lines maps 1:1; any other n is mapped proportionally). Absolute states, so
// repeated, skipped and backward steps render the same picture.
// Each section uses 8-10 shot families (distinct pictures); every family names
// its benchmark template in a "// template: <name> — <url>" comment.
// Standalone: every helper is defined below; CSS goes once into
// <style id="vl-sc-w05">, all rules scoped under .vls-w05-<secId>.
// GSAP is used when window.gsap exists, CSS transitions otherwise;
// prefers-reduced-motion renders end states without animation.
(() => {
"use strict";
const PART = "p3";
// ===== shared engine (identical copy in every Week 5 part; each part runs standalone) =====
window.VL_SCENES = window.VL_SCENES || {};
const REG = window.VL_SCENES;
const C = {
  ink: "#1b2a3a", navy: "#1f4e79", navy2: "#2d6a9f", teal: "#178f80", gold: "#d39418", coral: "#de5a3a",
  red: "#c0392b", green: "#2e8b57", plum: "#7a5aa6", slate: "#5d7389", muted: "#a3b3c2", line: "#cfd8e0",
  paper: "#fffdf7", white: "#ffffff", sky: "#e8f1f8", sand: "#f5eddd", mint: "#e2f3eb", rose: "#fbe4dd",
  lilac: "#eee8f6", cream: "#fff4dc", night: "#16304d", amber: "#a8741a", skin: "#f0c9a6", wood: "#b9814f"
};
// Objective colours used all week: service = teal, cost = gold, corporate growth = coral.
const OC = [C.teal, C.gold, C.coral];
const OBJN = ["Service", "Cost", "Growth"];
const NC = { N: C.navy, R: C.red, G: C.green, O: C.coral, P: C.plum, T: C.teal, A: C.amber, S: C.slate };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const num = (v, f) => { const x = Number(v); return Number.isFinite(x) ? x : f; };
const RM = () => { try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; } };
const GS = () => (!RM() && window.gsap && typeof window.gsap.to === "function" && typeof window.gsap.set === "function") ? window.gsap : null;
const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");
const r1 = (v) => Math.round(v * 10) / 10;
const has = (arr, v) => Array.isArray(arr) && arr.indexOf(v) > -1;
const tw = (s, sz) => Math.round(String(s).length * sz * 0.58 + sz * 1.5);
function wrap(s, max) {
  const words = String(s || "").split(/\s+/).filter(Boolean), out = [];
  let cur = "";
  words.forEach((w) => { if (!cur) cur = w; else if ((cur + " " + w).length <= max) cur += " " + w; else { out.push(cur); cur = w; } });
  if (cur) out.push(cur);
  return out;
}

// ---- SVG string builders ----
const R = (x, y, w, h, f, rx = 0, ex = "") => `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${rx}" fill="${f}" ${ex}/>`;
const O = (cx, cy, r, f, ex = "") => `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}" fill="${f}" ${ex}/>`;
const E = (cx, cy, rx, ry, f, ex = "") => `<ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="${f}" ${ex}/>`;
const P = (d, s, w = 2, ex = "") => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const F = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
const T = (x, y, s, sz = 14, f = C.ink, ex = "", a = "middle") => `<text x="${r1(x)}" y="${r1(y)}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const G = (tr, body, ex = "") => `<g transform="${tr}" ${ex}>${body}</g>`;
// Text that shrinks (never below 9) so it fits the given width.
const fitSz = (s, max, wid) => Math.max(9, Math.min(max, Math.floor(10 * wid / Math.max(1, String(s).length * 0.58)) / 10));
const TF = (x, y, s, max, wid, f = C.ink, a = "middle") => T(x, y, s, fitSz(s, max, wid), f, "", a);
const chip = (x, y, s, o = {}) => {
  const sz = o.sz || 13, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.95);
  const cx = o.free ? x : clamp(x, w / 2 + 3, 397 - w / 2);
  return R(cx - w / 2, y - h / 2, w, h, o.bg || C.white, o.rx == null ? h / 2 : o.rx,
    `stroke="${o.st || C.navy}" stroke-width="${o.sw || 2}"${o.dash ? ' stroke-dasharray="5 4"' : ""}`) +
    T(cx, y + sz * 0.36, s, sz, o.fg || o.st || C.navy);
};
const arrowHead = (x, y, ang, col, s = 1) => {
  const a = ang * Math.PI / 180, l = 9 * s, w = 5.5 * s;
  const p1 = [x - Math.cos(a) * l + Math.sin(a) * w, y - Math.sin(a) * l - Math.cos(a) * w];
  const p2 = [x - Math.cos(a) * l - Math.sin(a) * w, y - Math.sin(a) * l + Math.cos(a) * w];
  return F(`M${r1(x)} ${r1(y)} L${r1(p1[0])} ${r1(p1[1])} L${r1(p2[0])} ${r1(p2[1])} Z`, col);
};

// ---- icon library (each icon fits a 40 x 40 box centred on 0,0) ----
function ICO(name, x, y, s = 1, col = C.navy) {
  const g = (b) => `<g transform="translate(${r1(x)} ${r1(y)}) scale(${s})">${b}</g>`;
  const W = C.white;
  switch (name) {
    case "star": return g(F("M0 -18 L5.3 -6.5 L17.8 -5.6 L8.3 2.6 L11.2 14.8 L0 8.3 L-11.2 14.8 L-8.3 2.6 L-17.8 -5.6 L-5.3 -6.5 Z", col));
    case "coin": return g(O(0, 0, 16, C.gold, `stroke="${C.amber}" stroke-width="2.5"`) + O(0, 0, 9.5, "none", `stroke="#fff1c7" stroke-width="2.2"`));
    case "costdown": return g(O(-5, -2, 13, C.gold, `stroke="${C.amber}" stroke-width="2.2"`) + O(-5, -2, 7, "none", `stroke="#fff1c7" stroke-width="2"`) + P("M12 -6 V14 M6 8 L12 15 L18 8", C.red, 3.5));
    case "growth": return g(R(-16, 4, 8, 12, col, 1.5) + R(-5, -3, 8, 19, col, 1.5) + R(6, -10, 8, 26, col, 1.5) + P("M-17 -6 L-4 -14 L4 -9 L16 -19", C.green, 3) + arrowHead(17, -19.5, -35, C.green));
    case "guest": return g(O(-4, -13, 6.5, col) + F("M-15 16 Q-15 -3 -4 -3 Q7 -3 7 16 Z", col) + R(8, 0, 11, 15, C.wood, 2) + P("M11 0 V-4 H16 V0", C.ink, 1.6));
    case "person": return g(O(0, -11, 7.5, col) + F("M-13 17 Q-13 -1 0 -1 Q13 -1 13 17 Z", col));
    case "sponsor": return g(O(0, -11, 7.5, col) + F("M-13 17 Q-13 -1 0 -1 Q13 -1 13 17 Z", col) + F("M0 3 L2.4 8 L7.6 8.4 L3.6 11.6 L5 16.6 L0 13.8 L-5 16.6 L-3.6 11.6 L-7.6 8.4 L-2.4 8 Z", C.gold));
    case "people": return g(O(-11, -7, 5.5, col, `opacity=".7"`) + F("M-21 14 Q-21 0 -11 0 Q-1 0 -1 14 Z", col, `opacity=".7"`) + O(11, -7, 5.5, col, `opacity=".7"`) + F("M1 14 Q1 0 11 0 Q21 0 21 14 Z", col, `opacity=".7"`) + O(0, -10, 6.5, col) + F("M-11 17 Q-11 0 0 0 Q11 0 11 17 Z", col));
    case "clock": return g(O(0, 0, 16, W, `stroke="${col}" stroke-width="3"`) + P("M0 -9 V0 L7 5", col, 3));
    case "bed": return g(R(-17, -2, 34, 10, col, 2) + R(-17, -12, 5, 24, col, 1.5) + R(-10, -9, 10, 7, "#dfe9f6", 2) + R(-17, 8, 4, 6, col) + R(13, 8, 4, 6, col));
    case "doc": return g(F("M-12 -17 H6 L13 -10 V17 H-12 Z", W, `stroke="${col}" stroke-width="2.5"`) + P("M-6 -6 H7 M-6 1 H7 M-6 8 H3", col, 2.2));
    case "gear": { let d = ""; for (let i = 0; i < 8; i++) { const a0 = i * Math.PI / 4, a1 = a0 + 0.3, a2 = a0 + 0.5, a3 = a0 + 0.78; const q = (a, r) => r1(Math.cos(a) * r) + " " + r1(Math.sin(a) * r); d += (i ? "L" : "M") + q(a0, 12) + " L" + q(a1, 17) + " L" + q(a2, 17) + " L" + q(a3, 12) + " "; } return g(F(d + "Z", col) + O(0, 0, 5, W)); }
    case "compass": return g(O(0, 0, 17, W, `stroke="${col}" stroke-width="3"`) + F("M0 -13 L4 0 L-4 0 Z", C.red) + F("M0 13 L4 0 L-4 0 Z", col) + O(0, 0, 2.5, col));
    case "key": return g(O(-9, 0, 8, "none", `stroke="${col}" stroke-width="4"`) + P("M-1 0 H17 M11 0 V6 M16 0 V5", col, 4));
    case "scale": return g(P("M0 -15 V14 M-10 15 H10 M-16 -9 H16", col, 2.8) + P("M-16 -9 L-21 3 H-11 Z M16 -9 L11 3 H21 Z", col, 2) + O(0, -16, 2.6, col));
    case "shield": return g(F("M0 -17 L14 -11 V0 Q14 12 0 18 Q-14 12 -14 0 V-11 Z", col) + P("M-6 0 L-1 5 L7 -5", W, 3));
    case "gavel": return g(G("rotate(-35)", R(-12, -13, 22, 9, col, 2) + R(-3, -4, 5, 20, col, 2)) + R(-14, 12, 22, 5, col, 2));
    case "flag": return g(P("M-10 17 V-17", col, 3) + F("M-9 -16 H13 L8 -9 L13 -2 H-9 Z", C.coral));
    case "chat": return g(R(-17, -15, 24, 17, col, 5) + F("M-12 2 L-14 9 L-6 2 Z", col) + R(-2, -4, 20, 15, C.teal, 5) + F("M13 11 L15 17 L8 11 Z", C.teal));
    case "target": return g(O(0, 0, 16, W, `stroke="${C.red}" stroke-width="3"`) + O(0, 0, 10, W, `stroke="${C.red}" stroke-width="3"`) + O(0, 0, 4, C.red) + P("M3 -3 L17 -17", col, 2.5));
    case "mag": return g(O(-3, -3, 11, "rgba(255,255,255,.6)", `stroke="${col}" stroke-width="3.5"`) + P("M5 5 L15 15", col, 5));
    case "hotel": return g(R(-15, -16, 30, 33, col, 2) + rep(3, (r) => rep(3, (c2) => R(-10 + c2 * 8, -11 + r * 8, 5, 5, C.gold, 1))) + R(-4, 9, 8, 8, W, 1));
    case "invoice": return g(F("M-12 -17 H12 V17 L8 13 L4 17 L0 13 L-4 17 L-8 13 L-12 17 Z", W, `stroke="${col}" stroke-width="2.5"`) + P("M-6 -8 H6 M-6 -1 H6", col, 2.2) + T(0, 11, "AED", 7, col));
    case "box": return g(F("M-16 -6 L0 -14 L16 -6 L16 12 L0 19 L-16 12 Z", "#d9a066", `stroke="${C.amber}" stroke-width="2"`) + P("M-16 -6 L0 2 L16 -6 M0 2 V19", C.amber, 2));
    case "spa": return g(F("M0 14 Q-16 4 -12 -12 Q-1 -6 0 14 Z", C.teal) + F("M0 14 Q16 4 12 -12 Q1 -6 0 14 Z", "#55b7a8") + F("M0 14 Q-5 -4 0 -17 Q5 -4 0 14 Z", C.green));
    case "kiosk": return g(R(-12, -18, 24, 22, col, 3) + R(-8, -14, 16, 13, "#bfe3ff", 2) + R(-3, 4, 6, 10, col) + R(-10, 14, 20, 4, col, 2));
    case "lock": return g(P("M-8 -4 V-10 A8 8 0 0 1 8 -10 V-4", col, 3.5) + R(-12, -4, 24, 20, col, 3) + O(0, 5, 3, W));
    case "chart": return g(P("M-17 -16 V15 H17", col, 2.5) + P("M-12 8 L-4 -1 L3 4 L14 -11", C.teal, 3));
    case "crown": return g(F("M-16 10 L-16 -8 L-8 0 L0 -12 L8 0 L16 -8 L16 10 Z", C.gold, `stroke="${C.amber}" stroke-width="2"`) + R(-16, 10, 32, 5, C.amber, 1));
    case "calendar": return g(R(-15, -12, 30, 28, W, 3, `stroke="${col}" stroke-width="2.5"`) + R(-15, -12, 30, 8, col, 3) + P("M-8 -16 V-9 M8 -16 V-9", col, 3) + rep(3, (i) => R(-9 + i * 7, 2, 4, 4, col)));
    case "link": return g(R(-17, -6, 18, 12, "none", 6, `stroke="${col}" stroke-width="3.5"`) + R(-1, -6, 18, 12, "none", 6, `stroke="${C.teal}" stroke-width="3.5"`));
    case "ruler": return g(G("rotate(-30)", R(-18, -6, 36, 12, C.gold, 2) + rep(6, (i) => P(`M${-13 + i * 5} -6 V${i % 2 ? -1 : 1}`, C.ink, 1.4))));
    case "fence": return g(rep(4, (i) => F(`M${-15 + i * 9} 15 V-9 L${-12 + i * 9} -15 L${-9 + i * 9} -9 V15 Z`, col)) + R(-18, -4, 36, 3, col) + R(-18, 7, 36, 3, col));
    case "hourglass": return g(P("M-10 -16 H10 M-10 16 H10", col, 3) + F("M-8 -14 H8 L1 0 L8 14 H-8 L-1 0 Z", "none", `stroke="${col}" stroke-width="2.5"`) + F("M-5 11 H5 L0 6 Z", C.gold));
    case "map": return g(F("M-17 -12 L-6 -16 L6 -12 L17 -16 V12 L6 16 L-6 12 L-17 16 Z", W, `stroke="${col}" stroke-width="2.4"`) + P("M-6 -16 V12 M6 -12 V16", col, 1.6) + P("M-12 6 Q-4 -6 4 2 T14 -8", C.red, 2.4, 'stroke-dasharray="3 3"'));
    case "check": return g(O(0, 0, 15, C.green) + P("M-7 0 L-2 6 L8 -6", W, 3.5));
    case "cross": return g(O(0, 0, 15, C.red) + P("M-6 -6 L6 6 M6 -6 L-6 6", W, 3.5));
    case "warn": return g(F("M0 -16 L17 14 H-17 Z", C.gold, `stroke="${C.amber}" stroke-width="2"`) + R(-1.8, -6, 3.6, 11, C.ink, 1.5) + O(0, 9, 2.2, C.ink));
    case "q": return g(O(0, 0, 15, C.coral) + T(0, 6.5, "?", 19, W));
    case "stamp": return g(R(-16, 6, 32, 9, col, 2) + R(-5, -6, 10, 13, col, 2) + O(0, -11, 7, col));
    case "eye": return g(F("M-17 0 Q0 -14 17 0 Q0 14 -17 0 Z", W, `stroke="${col}" stroke-width="2.5"`) + O(0, 0, 5.5, col));
    case "handshake": return g(P("M-18 -2 L-8 -8 L2 -2 M18 -2 L8 -8 L-4 2 Q-1 6 3 3 L8 7 Q11 9 13 6", col, 3) + P("M-18 -2 L-8 8 Q-5 11 -2 8", col, 3));
    case "bell": return g(F("M-12 8 Q-12 -12 0 -12 Q12 -12 12 8 Z", C.gold, `stroke="${C.amber}" stroke-width="2"`) + R(-16, 8, 32, 5, col, 2) + O(0, -14, 3, col));
    case "wallet": return g(R(-17, -10, 34, 24, col, 4) + R(4, -3, 15, 10, C.gold, 3) + O(10, 2, 2.2, col));
    default: return g(O(0, 0, 12, col));
  }
}
const person = (x, y, s = 1, col = C.navy) => ICO("person", x, y, s, col);
const guest = (x, y, s = 1, col = C.navy2) => ICO("guest", x, y, s, col);
const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${r1(x - 7 * s)} ${r1(y)} l${r1(5 * s)} ${r1(5 * s)} l${r1(10 * s)} ${r1(-11 * s)}`, col, w);
const xmark = (x, y, s = 1, col = C.red, w = 3) => P(`M${r1(x - 6 * s)} ${r1(y - 6 * s)} l${r1(12 * s)} ${r1(12 * s)} M${r1(x + 6 * s)} ${r1(y - 6 * s)} l${r1(-12 * s)} ${r1(12 * s)}`, col, w);
const arcD = (cx, cy, r, a0, a1) => {
  const p0 = [cx + Math.cos(a0) * r, cy + Math.sin(a0) * r], p1 = [cx + Math.cos(a1) * r, cy + Math.sin(a1) * r];
  return `M${r1(p0[0])} ${r1(p0[1])} A${r} ${r} 0 ${Math.abs(a1 - a0) > Math.PI ? 1 : 0} 1 ${r1(p1[0])} ${r1(p1[1])}`;
};

// ---- prefixed keyed builders handed to every shot family ----
function pfx(p) {
  return {
    p,
    K: (k, b, ex = "") => `<g data-k="${p}${k}" ${ex}>${b}</g>`,
    H: (k, b, ex = "") => `<g data-k="${p}${k}" style="opacity:0" ${ex}>${b}</g>`,
    D: (k, d, s, w = 3, ex = "") => `<path data-k="${p}${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100" ${ex}/>`,
    TK: (k, x, y, s, sz = 14, f = C.ink, a = "middle", ex = "") => `<text data-k="${p}${k}" x="${r1(x)}" y="${r1(y)}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`,
    // An auto-sized label chip whose text, colour and width are set by c.note().
    N: (k, x, y, sz = 13) => `<g data-k="${p}${k}" data-cx="${x}" data-sz="${sz}" style="opacity:0">` +
      R(x - 40, y - sz * 0.98, 80, sz * 1.95, C.white, sz, `stroke="${C.navy}" stroke-width="2"`) +
      `<text x="${x}" y="${r1(y + sz * 0.36)}" font-size="${sz}" fill="${C.navy}" text-anchor="middle"></text></g>`
  };
}

// ---- per-part stylesheet, appended once into the shared <style id="vl-sc-w05"> ----
function sceneCSS(id, bg) {
  const s = ".vls-w05-" + id;
  return `
${s}{position:relative;display:flex;flex-direction:column;width:100%;height:100%;min-height:200px;overflow:hidden;box-sizing:border-box;border-radius:14px;background:${bg};color:${C.ink};isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w05-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w05-fig>svg{position:absolute;inset:0;display:block;width:100%;height:100%;max-width:none;max-height:none;overflow:hidden}
${s} svg text{font-family:"Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif;font-weight:700;letter-spacing:.1px;pointer-events:none}
${s} [data-k]{transform-box:fill-box;transform-origin:50% 50%;transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.8s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}
${s}.w05-snap [data-k]{transition:none!important}
${s} .w05-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:36px;padding:6px 12px 8px;font:700 14px/1.25 "Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif;color:${C.navy};background:rgba(255,255,255,.72);border-top:1px solid rgba(31,78,121,.14)}
${s} .w05-num{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w05-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
${s} .w05-lab.w05-in{animation:vlsw05Cap .5s cubic-bezier(.22,.8,.24,1)}
${s} .w05-bar{flex:0 0 56px;height:4px;border-radius:4px;background:rgba(31,78,121,.15);overflow:hidden}
${s} .w05-bar i{display:block;height:100%;width:0;background:${C.coral};transition:width .6s ease}
${s} .a-flow{stroke-dasharray:6 7;animation:vlsw05Flow 1.2s linear infinite}
${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw05Spin 9s linear infinite}
${s} .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw05Bob 2.4s ease-in-out infinite}
${s} .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw05Pulse 1.8s ease-in-out infinite}
${s} .a-shake{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw05Shake .8s ease-in-out infinite}
${s} .a-blink{animation:vlsw05Blink 1.3s ease-in-out infinite}
@media (max-width:420px){${s} .w05-cap{font-size:13px;min-height:32px;padding:5px 10px 7px}${s} .w05-bar{flex-basis:40px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
}
const KEYFRAMES = `
@keyframes vlsw05Cap{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes vlsw05Flow{to{stroke-dashoffset:-26}}
@keyframes vlsw05Spin{to{transform:rotate(360deg)}}
@keyframes vlsw05Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes vlsw05Pulse{0%,100%{opacity:.45;transform:scale(.94)}50%{opacity:1;transform:scale(1.06)}}
@keyframes vlsw05Shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}
@keyframes vlsw05Blink{0%,100%{opacity:1}50%{opacity:.35}}
`;
const SCENE_BG = [];
function addStyles() {
  if (typeof document === "undefined") return;
  let st = document.getElementById("vl-sc-w05");
  if (!st) { st = document.createElement("style"); st.id = "vl-sc-w05"; (document.head || document.documentElement).appendChild(st); }
  const flag = "data-w05claude-" + PART;
  if (st.getAttribute(flag)) return;
  st.setAttribute(flag, "1");
  st.appendChild(document.createTextNode(KEYFRAMES + SCENE_BG.map((a) => sceneCSS(a[0], a[1])).join("\n")));
}

// Re-labels a family instance with the benchmark template it is modelled on in this section.
const BENCH = (fam, bench) => { fam.bench = bench; return fam; };

// ---- scene factory: one plan entry per narration line -> [family, state, caption] ----
function makeScene(cfg) {
  const { id, plan, fams } = cfg;
  const N = plan.length, names = Object.keys(fams);
  let root = null, useG = false;
  const nodes = (k) => (root ? Array.prototype.slice.call(root.querySelectorAll('[data-k="' + k + '"]')) : []);
  const mapK = (i, n) => {
    const nn = Math.max(1, Math.floor(num(n, N)));
    const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
    return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
  };
  const dur = (t, d) => (t.d == null ? d : t.d);
  function timing(el, t, d) { el.style.transitionDuration = dur(t, d) + "s"; el.style.transitionDelay = (t.dl || 0) + "s"; }
  function tf(el, st, t, snap) {
    const x = st.x || 0, y = st.y || 0, r = st.r || 0;
    const sx = st.sx != null ? st.sx : (st.s != null ? st.s : 1), sy = st.sy != null ? st.sy : (st.s != null ? st.s : 1);
    const g = useG ? GS() : null;
    if (g) {
      const v = { x, y, rotation: r, scaleX: sx, scaleY: sy };
      if (st.pv) v.svgOrigin = st.pv[0] + " " + st.pv[1]; else v.transformOrigin = "50% 50%";
      if (snap) g.set(el, v); else g.to(el, Object.assign(v, { duration: dur(t, 0.8), delay: t.dl || 0, ease: t.e || "power3.out", overwrite: "auto" }));
      return;
    }
    if (st.pv) { el.style.transformBox = "view-box"; el.style.transformOrigin = st.pv[0] + "px " + st.pv[1] + "px"; }
    timing(el, t, 0.8);
    el.style.transform = "translate(" + x + "px," + y + "px) rotate(" + r + "deg) scale(" + sx + "," + sy + ")";
  }
  function op(el, o, t, snap) {
    const g = useG ? GS() : null;
    if (g) { if (snap) g.set(el, { opacity: o }); else g.to(el, { opacity: o, duration: dur(t, 0.55), delay: t.dl || 0, ease: "power1.out", overwrite: false }); return; }
    timing(el, t, 0.55); el.style.opacity = String(o);
  }
  function dash(el, f, t, snap) {
    const v = 100 * (1 - clamp(f, 0, 1)), g = useG ? GS() : null;
    if (g) { if (snap) g.set(el, { strokeDashoffset: v }); else g.to(el, { strokeDashoffset: v, duration: dur(t, 1), delay: t.dl || 0, ease: "power2.inOut" }); return; }
    timing(el, t, 1); el.style.strokeDashoffset = String(v);
  }
  function paint(el, prop, col, t, snap) {
    const g = useG ? GS() : null;
    if (g) { const v = {}; v[prop] = col; if (snap) g.set(el, v); else g.to(el, Object.assign(v, { duration: dur(t, 0.5), delay: t.dl || 0 })); return; }
    timing(el, t, 0.5); el.style[prop] = col;
  }
  function ctx(snap, p) {
    const K = (k) => nodes(p + k);
    const c = {
      snap,
      op: (k, o, t = {}) => K(k).forEach((el) => op(el, typeof o === "number" ? clamp(o, 0, 1) : (o ? 1 : 0), t, snap)),
      mv: (k, st, t = {}) => K(k).forEach((el) => tf(el, st || {}, t, snap)),
      dr: (k, f, t = {}) => K(k).forEach((el) => dash(el, f, t, snap)),
      fl: (k, col, t = {}) => K(k).forEach((el) => paint(el, "fill", col, t, snap)),
      sk: (k, col, t = {}) => K(k).forEach((el) => paint(el, "stroke", col, t, snap)),
      sw: (k, w) => K(k).forEach((el) => { el.style.strokeWidth = String(w); }),
      tx: (k, s) => K(k).forEach((el) => { const v = s == null ? "" : String(s); if (el.textContent !== v) el.textContent = v; }),
      at: (k, a, v) => K(k).forEach((el) => el.setAttribute(a, String(v))),
      cl: (k, cls, on) => K(k).forEach((el) => el.classList.toggle(cls, !!on)),
      vis: (map, t = {}) => Object.keys(map).forEach((k) => c.op(k, map[k], t)),
      note: (k, n, t = {}) => K(k).forEach((g) => {
        if (!n) { op(g, 0, t, snap); return; }
        const s = typeof n === "string" ? n : n.t, col = NC[(typeof n === "string" ? "N" : n.c) || "N"] || C.navy;
        const filled = typeof n === "object" && n.f;
        const sz = num(g.getAttribute("data-sz"), 13), cx0 = num(g.getAttribute("data-cx"), 200);
        const w = tw(s, sz), cx = clamp(cx0, w / 2 + 3, 397 - w / 2);
        const r = g.querySelector("rect"), tx = g.querySelector("text");
        if (r) { r.setAttribute("x", String(r1(cx - w / 2))); r.setAttribute("width", String(w)); r.setAttribute("stroke", col); r.setAttribute("fill", filled ? col : C.white); }
        if (tx) { tx.setAttribute("x", String(r1(cx))); tx.setAttribute("fill", filled ? C.white : col); if (tx.textContent !== s) tx.textContent = s; }
        op(g, 1, t, snap);
      })
    };
    return c;
  }
  function caption(k, snap) {
    const lab = root.querySelector(".w05-lab"), nn = root.querySelector(".w05-num"), bar = root.querySelector(".w05-bar i");
    const txt = plan[k][2] || "";
    if (lab && lab.textContent !== txt) {
      lab.textContent = txt;
      if (!snap && !RM()) { lab.classList.remove("w05-in"); void lab.offsetWidth; lab.classList.add("w05-in"); }
    }
    if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
    if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
  }
  function render(k, snap) {
    if (!root) return;
    if (snap) root.classList.add("w05-snap");
    try {
      const [act, st] = plan[k];
      const top = ctx(snap, "");
      names.forEach((nm) => {
        const on = nm === act;
        top.op("SH_" + nm, on ? 1 : 0, { d: on ? 0.55 : 0.3, dl: on ? 0.15 : 0 });
        top.mv("SH_" + nm, on ? {} : { y: 10, s: 0.98 }, { d: 0.6 });
      });
      const fam = fams[act];
      if (fam) { fam.render(ctx(snap, act + "_"), st || {}, k); root.setAttribute("data-template", fam.bench); }
      root.setAttribute("data-shot", act);
    } catch (e) { if (window.console) console.warn("[VL W05 " + id + "]", e); }
    caption(k, snap);
    if (snap) { void root.offsetWidth; root.classList.remove("w05-snap"); }
    root.setAttribute("data-moment", String(k));
  }
  function kill() {
    const g = GS();
    if (root && g && typeof g.killTweensOf === "function") { try { g.killTweensOf(root.querySelectorAll("[data-k]")); } catch (e) { /* ignore */ } }
  }
  function draw() {
    return R(-400, -300, 1200, 900, cfg.bg) + names.map((nm) => `<g data-k="SH_${nm}" style="opacity:0">${fams[nm].draw(pfx(nm + "_"))}</g>`).join("");
  }
  SCENE_BG.push([id, cfg.bg]);
  return {
    build(el) {
      if (!el || el.nodeType !== 1) return;
      kill();
      addStyles();
      useG = !!GS();
      const r = document.createElement("div");
      r.className = "vls-w05-" + id + " vls-w05-scene";
      r.setAttribute("data-vls-scene", id);
      r.innerHTML = '<div class="w05-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
        esc(cfg.desc) + '">' + draw() + '</svg></div><div class="w05-cap" aria-hidden="true"><span class="w05-num"></span><span class="w05-lab"></span><span class="w05-bar"><i></i></span></div>';
      if (typeof el.replaceChildren === "function") el.replaceChildren(r); else { el.innerHTML = ""; el.appendChild(r); }
      root = r;
      render(0, true);
    },
    step(i, n) { if (!root) return; render(mapK(i, n), false); },
    reset() { if (!root) return; kill(); render(0, true); }
  };
}

// =====================================================================
// SHOT FAMILY LIBRARY. Each family is one kind of picture; a section
// instantiates 8-10 of them with its own content, and every narration line
// sets one family's state. Each family names its benchmark template.
// =====================================================================

// template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
// Title card: spinning orbit, icon badge, two-line headline, kicker and subtitle chips.
function F_TITLE(cfg) {
  const col = cfg.col || C.navy;
  return {
    bench: "Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/",
    draw(f) {
      let s = O(200, 112, 92, "none", `stroke="${C.line}" stroke-width="1.5" stroke-dasharray="2 7"`);
      s += f.K("ring", `<g class="a-spin">${O(200, 112, 74, "none", `stroke="${col}" stroke-width="3" stroke-dasharray="14 10"`)}</g>`);
      s += f.H("orb", O(126, 112, 10, OC[0], `stroke="#fff" stroke-width="2.5"`) + O(237, 48, 10, OC[1], `stroke="#fff" stroke-width="2.5"`) + O(237, 176, 10, OC[2], `stroke="#fff" stroke-width="2.5"`));
      s += f.K("badge", O(200, 112, 54, C.white, `stroke="${col}" stroke-width="4"`) + ICO(cfg.icon || "compass", 200, 112, 1.9, col));
      s += f.N("k", 200, 22, 13);
      s += f.TK("t1", 200, 212, "", 24, C.ink);
      s += f.TK("t2", 200, 240, "", 24, col);
      s += f.N("sub", 200, 274, 14);
      return s;
    },
    render(c, s) {
      c.note("k", s.k ? { t: s.k, c: "N", f: 1 } : null);
      c.tx("t1", s.t1 || ""); c.tx("t2", s.t2 || "");
      c.mv("t1", { y: s.t1 ? 0 : 8 }); c.op("t1", s.t1 ? 1 : 0);
      c.mv("t2", { y: s.t2 ? 0 : 8 }, { dl: 0.1 }); c.op("t2", s.t2 ? 1 : 0, { dl: 0.1 });
      c.note("sub", s.sub ? { t: s.sub, c: s.sc || "T" } : null, { dl: 0.3 });
      c.op("orb", s.orb ? 1 : 0, { dl: 0.2 });
      c.mv("badge", { s: s.pop ? 1.1 : 1 });
    }
  };
}

// template: Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD
// The narrator's question in a speech bubble, the options on the table, and a team thinking.
function F_ASK(cfg = {}) {
  const col = cfg.col || C.coral;
  return {
    bench: "Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD",
    draw(f) {
      let s = R(24, 16, 352, 140, C.white, 18, `stroke="${col}" stroke-width="3"`);
      s += F("M150 154 L134 182 L182 154 Z", C.white, `stroke="${col}" stroke-width="3" stroke-linejoin="round"`) + R(148, 150, 38, 6, C.white);
      s += `<g class="a-pulse">${O(52, 46, 19, col)}${T(52, 54, "?", 24, C.white)}</g>`;
      for (let i = 0; i < 4; i++) s += f.TK("q" + i, 218, 60 + i * 26, "", 17, C.ink);
      [[110, 200], [290, 200], [110, 232], [290, 232]].forEach((p, i) => { s += f.N("o" + i, p[0], p[1], 13); });
      [80, 200, 320].forEach((x, i) => {
        s += f.K("p" + i, person(x, 274, 1.05, [C.teal, C.navy, C.coral][i]));
        s += f.H("th" + i, O(x + 14, 246, 2.6, C.slate) + O(x + 20, 239, 3.4, C.slate) + O(x + 28, 230, 4.4, C.slate));
      });
      return s;
    },
    render(c, s) {
      let lines = wrap(s.q, 28), sz = 17, lh = 26;
      if (lines.length > 3) { lines = wrap(s.q, 34); sz = 15; lh = 23; }
      if (lines.length > 4) { lines = wrap(s.q, 40); sz = 13; lh = 20; }
      const L = Math.min(4, lines.length), y0 = 86 - (L - 1) * lh / 2 + sz * 0.35;
      for (let i = 0; i < 4; i++) {
        c.tx("q" + i, lines[i] || ""); c.at("q" + i, "font-size", sz); c.at("q" + i, "y", r1(y0 + i * lh));
        c.op("q" + i, i < L ? 1 : 0, { dl: 0.08 * i });
      }
      const o = s.o || [], oc = s.oc || [];
      for (let i = 0; i < 4; i++) c.note("o" + i, o[i] ? { t: o[i], c: oc[i] || "N" } : null, { dl: 0.25 + i * 0.12 });
      for (let i = 0; i < 3; i++) {
        c.mv("p" + i, { y: s.who === i ? -5 : 0, s: s.who === i ? 1.12 : 1 });
        c.op("th" + i, !(s.o && s.o.length) && (s.who == null || s.who === i) ? 1 : 0, { dl: 0.2 * i });
      }
    }
  };
}

// template: Waiting Queue — https://lottiefiles.com/free-animation/waiting-queue-xoNutPl764
// Qasr's reception: queue length, staff on duty, waiting clock, guest rating, alerts and cost tag.
function F_DESK(cfg = {}) {
  return {
    bench: "Waiting Queue — https://lottiefiles.com/free-animation/waiting-queue-xoNutPl764",
    draw(f) {
      let s = R(0, 0, 400, 246, "#f7efe2") + R(0, 246, 400, 54, "#e6d4ba") + P("M0 246 H400", "#cdb593", 2);
      s += R(282, 118, 98, 26, C.navy, 6) + T(331, 136, cfg.sign || "Qasr Marina", 13, C.white);
      s += f.K("clock", O(44, 50, 25, C.white, `stroke="${C.navy}" stroke-width="3.5"`) + rep(12, (i) => { const a = i * Math.PI / 6; return P(`M${r1(44 + Math.cos(a) * 19)} ${r1(50 + Math.sin(a) * 19)} L${r1(44 + Math.cos(a) * 22)} ${r1(50 + Math.sin(a) * 22)}`, C.navy, 1.6); }));
      s += f.K("hand", P("M44 50 L44 32", C.red, 3.5), `data-pv="44 50"`) + O(44, 50, 3.5, C.navy);
      s += f.TK("wt", 78, 58, "", 19, C.red, "start");
      s += f.K("stars", T(220, 66, "Guest rating", 12, C.slate) + rep(5, (i) => ICO("star", 172 + i * 24, 38, 0.58, "#d4d9de")));
      for (let i = 0; i < 5; i++) s += f.H("sg" + i, ICO("star", 172 + i * 24, 38, 0.58, C.gold));
      s += f.N("cost", 338, 38, 13);
      for (let i = 0; i < 3; i++) {
        s += f.K("st" + i, person(300 + i * 30, 168, 0.9, C.teal) + R(292 + i * 30, 176, 16, 5, C.white, 2));
      }
      s += R(276, 178, 112, 50, C.wood, 6) + R(276, 178, 112, 8, "#9a6a3f", 4) + T(332, 212, "Reception", 13, C.white);
      s += f.K("gq", rep(6, (i) => f.K("g" + i, guest(240 - i * 36, 226, 1.05, i ? C.navy2 : C.navy))), `class="a-bob"`);
      s += f.H("sad", O(240, 186, 11, C.white, `stroke="${C.red}" stroke-width="2"`) + O(236, 184, 1.6, C.ink) + O(244, 184, 1.6, C.ink) + P("M235 192 Q240 187 245 192", C.ink, 1.8));
      s += f.H("happy", O(240, 186, 11, C.white, `stroke="${C.green}" stroke-width="2"`) + O(236, 184, 1.6, C.ink) + O(244, 184, 1.6, C.ink) + P("M235 189 Q240 194 245 189", C.ink, 1.8));
      s += f.H("exp", R(24, 254, 250, 16, C.gold, 8, `opacity=".55"`) + guest(196, 262, 0.75, C.amber) + guest(232, 262, 0.75, C.amber) + P("M250 262 H272", C.amber, 3) + arrowHead(276, 262, 0, C.amber));
      s += f.N("ex", 96, 262, 12);
      for (let i = 0; i < 3; i++) s += f.N("a" + i, [72, 196, 320][i], 100, 12);
      s += f.N("nt", 200, 286, 13);
      return s;
    },
    render(c, s) {
      const n = s.n == null ? 4 : s.n, st = s.staff == null ? 3 : s.staff;
      for (let i = 0; i < 6; i++) { c.op("g" + i, i < n ? 1 : 0, { dl: 0.05 * i }); c.mv("g" + i, { x: i < n ? 0 : -24 }); }
      c.cl("gq", "a-bob", n > 2);
      for (let i = 0; i < 3; i++) { c.op("st" + i, i < st ? 1 : 0.14); c.cl("st" + i, "a-shake", !!s.rush && i < st); }
      const m = parseFloat(s.wait) || 0;
      c.tx("wt", s.wait || ""); c.fl("wt", m >= 10 ? C.red : C.green);
      c.mv("hand", { r: m * 30, pv: [44, 50] }, { d: 1.2 });
      c.op("clock", s.wait ? 1 : 0.35);
      c.op("stars", s.stars == null ? 0 : 1);
      for (let i = 0; i < 5; i++) c.op("sg" + i, s.stars != null && i < s.stars ? 1 : 0, { dl: 0.06 * i });
      c.note("cost", s.cost ? { t: s.cost, c: s.cc || "A" } : null);
      c.op("sad", s.mood === "sad" ? 1 : 0); c.op("happy", s.mood === "happy" ? 1 : 0);
      c.op("exp", s.exp ? 1 : 0); c.note("ex", s.exp ? { t: "Corporate lane", c: "A" } : null);
      const a = s.alerts || [];
      for (let i = 0; i < 3; i++) c.note("a" + i, a[i] ? { t: a[i], c: (s.acs && s.acs[i]) || s.ac || "R", f: s.af } : null, { dl: 0.15 + i * 0.15 });
      c.note("nt", s.nt);
    }
  };
}

// template: Business Analytics Meeting — https://lottiefiles.com/free-animation/business-analytics-C1COKzrIkL
// The steering table: directors with their asks, the shared budget jar, pulls in different directions.
function F_BOARD(cfg) {
  const who = cfg.who; // [[name, colourLetter], x4]
  const X = [62, 150, 250, 338], B = [[96, 36], [126, 78], [274, 78], [304, 36]];
  return {
    bench: "Business Analytics Meeting — https://lottiefiles.com/free-animation/business-analytics-C1COKzrIkL",
    draw(f) {
      let s = "";
      for (let i = 0; i < 4; i++) s += f.H("pl" + i, P(`M200 158 L${X[i]} 150`, C.red, 3, 'stroke-dasharray="6 5"') + arrowHead(X[i] + (i < 2 ? 14 : -14), 150, i < 2 ? 180 : 0, C.red));
      for (let i = 0; i < 4; i++) {
        s += f.H("ring" + i, O(X[i], 158, 30, "none", `stroke="${NC[who[i][1]]}" stroke-width="3" class="a-pulse"`));
        s += f.K("d" + i, person(X[i], 176, 1.35, NC[who[i][1]]));
      }
      s += E(200, 214, 172, 34, C.wood) + E(200, 208, 172, 30, "#c99463");
      s += f.K("jar", F("M176 128 Q176 120 184 120 H216 Q224 120 224 128 V182 Q224 192 214 192 H186 Q176 192 176 182 Z", "rgba(232,241,248,.85)", `stroke="${C.slate}" stroke-width="2.5"`) + R(180, 112, 40, 9, C.slate, 3));
      for (let i = 0; i < 4; i++) s += f.H("c" + i, ICO("coin", 200, 178 - i * 15, 0.62));
      s += f.N("jl", 200, 238, 13);
      for (let i = 0; i < 4; i++) {
        s += T(X[i], 266, who[i][0], 13, NC[who[i][1]]);
        s += f.N("b" + i, B[i][0], B[i][1], 13);
      }
      s += f.N("nt", 200, 289, 13);
      return s;
    },
    render(c, s) {
      const on = s.on == null ? 4 : s.on, say = s.say || [];
      for (let i = 0; i < 4; i++) {
        const vis = Array.isArray(on) ? has(on, i) : i < on;
        c.op("d" + i, vis ? (s.spk == null || s.spk === i || has(s.also, i) ? 1 : 0.35) : 0.1);
        c.mv("d" + i, { y: s.spk === i ? -6 : 0 });
        c.op("ring" + i, s.spk === i ? 1 : 0);
        c.note("b" + i, say[i] ? { t: say[i], c: who[i][1], f: s.spk === i } : null, { dl: 0.1 * i });
        c.op("pl" + i, s.tug && vis ? 1 : 0); c.mv("pl" + i, { x: s.tug ? 0 : 0 });
      }
      const coins = s.coins == null ? 2 : s.coins;
      for (let i = 0; i < 4; i++) { c.op("c" + i, i < coins ? 1 : 0, { dl: 0.1 * i }); c.mv("c" + i, { y: i < coins ? 0 : -30 }); }
      c.op("jar", s.jar === false ? 0 : 1);
      c.note("jl", s.jl || null);
      c.note("nt", s.nt);
    }
  };
}

// template: Map Route Animation — https://lottiefiles.com/free-animation/map-route-animation-gMVg8kCqCD
// The BPM implementation framework as a road: Organization Strategy is the first stop.
function F_ROUTE() {
  const S = [[48, 236], [104, 206], [154, 192], [200, 170], [240, 146], [276, 126], [308, 104], [336, 84], [360, 64], [380, 44]];
  const road = "M48 236 C80 214 96 208 104 206 S140 196 154 192 S186 178 200 170 S228 154 240 146 S266 132 276 126 S298 112 308 104 S328 90 336 84 S352 70 360 64 S372 52 380 44";
  return {
    bench: "Map Route Animation — https://lottiefiles.com/free-animation/map-route-animation-gMVg8kCqCD",
    draw(f) {
      let s = R(0, 0, 400, 300, "#eef4ea") + P("M0 270 Q120 250 210 262 T400 250", "#d7e6cf", 18) + P("M0 40 Q80 24 160 40", "#e2ecdd", 22);
      s += P(road, "#d5d9dc", 14) + f.D("road", road, "#7e8f9c", 14) + P(road, C.white, 2, 'stroke-dasharray="6 8"');
      S.forEach((p, i) => { s += f.K("s" + i, O(p[0], p[1], i ? 8 : 14, C.muted, `stroke="${C.white}" stroke-width="3"`)); });
      s += f.H("beam", P("M48 74 L48 214", C.gold, 3, 'class="a-flow"'));
      s += f.H("star", `<g class="a-pulse">${O(48, 56, 24, C.gold, 'opacity=".25"')}</g>` + ICO("star", 48, 56, 1, C.gold));
      s += f.H("gate", R(96, 168, 4, 38, C.ink) + R(98, 172, 64, 8, C.red, 2) + R(112, 172, 10, 8, C.white) + R(134, 172, 10, 8, C.white));
      s += f.K("tok", O(48, 222, 9, C.coral, `stroke="${C.white}" stroke-width="3"`));
      s += f.N("l0", 106, 268, 14); s += f.N("l1", 150, 224, 12); s += f.N("lr", 300, 26, 13); s += f.N("gt", 196, 150, 12);
      s += f.N("nt", 300, 232, 13);
      return s;
    },
    render(c, s) {
      c.dr("road", s.road == null ? 1 : s.road, { d: 1.4 });
      const lit = s.lit == null ? 0 : s.lit;
      S.forEach((p, i) => { c.fl("s" + i, i < lit ? (i === 0 ? C.gold : C.navy2) : C.muted, { dl: 0.06 * i }); c.mv("s" + i, { s: i === 0 && s.first ? 1.25 : 1 }); });
      const at = clamp(s.at == null ? 0 : s.at, 0, 9);
      c.mv("tok", { x: S[at][0] - 48, y: S[at][1] - 236 - 14 }, { d: 1.2 });
      c.op("tok", s.at == null ? 0 : 1);
      c.op("star", s.star ? 1 : 0); c.op("beam", s.star ? 1 : 0, { dl: 0.3 });
      c.op("gate", s.gate ? 1 : 0); c.note("gt", s.gate ? { t: "Design waits", c: "R" } : null);
      c.note("l0", s.l0 ? { t: "Organization Strategy", c: "A", f: 1 } : null);
      c.note("l1", s.l1 ? { t: "Process Architecture", c: "N" } : null);
      c.note("lr", s.lr ? { t: "Later BPM phases", c: "S" } : null);
      c.note("nt", s.nt);
    }
  };
}

// template: Infographics Pack by ARstudio — https://motionarray.com/after-effects-templates/infographics-pack-135055/
// Qasr's three strategic objectives as cards, with a proposal linked to each by strength.
function F_OBJ(cfg = {}) {
  const X = [72, 200, 328], IC = ["star", "costdown", "growth"];
  const FIG = cfg.figs || ["#1", "−10%", "+25%"], NAME = cfg.names || ["Service rating", "Cost per room", "Corporate growth"];
  return {
    bench: "Infographics Pack by ARstudio — https://motionarray.com/after-effects-templates/infographics-pack-135055/",
    draw(f) {
      let s = "";
      for (let i = 0; i < 3; i++) {
        s += f.D("l" + i, `M200 252 C200 200 ${X[i]} 190 ${X[i]} 126`, OC[i], 4);
        s += f.N("w" + i, [112, 200, 288][i], [196, 176, 196][i], 12);
      }
      for (let i = 0; i < 3; i++) {
        s += f.H("hl" + i, R(X[i] - 64, 16, 128, 116, "none", 16, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
        s += f.K("cd" + i, R(X[i] - 58, 22, 116, 104, C.white, 12, `stroke="${OC[i]}" stroke-width="3"`) + R(X[i] - 58, 22, 116, 8, OC[i], 4) +
          ICO(IC[i], X[i], 52, 0.95, OC[i]) + f.TK("f" + i, X[i], 94, FIG[i], 25, OC[i]) + T(X[i], 116, NAME[i], 12, C.ink));
        s += f.H("ok" + i, ICO("check", X[i] + 50, 26, 0.75));
        s += f.H("rk" + i, ICO("warn", X[i] + 50, 28, 0.8));
      }
      s += f.H("ten", P("M96 142 H176", C.red, 4) + arrowHead(182, 142, 0, C.red) + arrowHead(90, 142, 180, C.red) + chip(136, 160, "Tension", { st: C.red, sz: 12 }));
      s += f.N("prop", 200, 262, 15);
      s += f.N("nt", 200, 287, 12);
      return s;
    },
    render(c, s) {
      const show = s.show == null ? 3 : s.show, L = s.links || [0, 0, 0], sg = s.sign || [1, 1, 1], wl = s.wl || [];
      for (let i = 0; i < 3; i++) {
        c.op("cd" + i, i < show ? (has(s.dim, i) ? 0.3 : 1) : 0, { dl: 0.12 * i });
        c.mv("cd" + i, { y: i < show ? 0 : 14, s: s.hl === i ? 1.06 : 1 });
        c.op("hl" + i, s.hl === i ? 1 : 0);
        c.op("ok" + i, has(s.ok, i) ? 1 : 0, { dl: 0.3 }); c.op("rk" + i, has(s.rk, i) ? 1 : 0, { dl: 0.3 });
        if (s.figs && s.figs[i] != null) c.tx("f" + i, s.figs[i]);
        c.dr("l" + i, s.prop && L[i] > 0 ? 1 : 0, { dl: 0.2 + 0.15 * i });
        c.sw("l" + i, L[i] > 0 ? 2 + L[i] * 2.5 : 2);
        c.sk("l" + i, sg[i] < 0 ? C.red : sg[i] === 0 ? C.muted : OC[i]);
        c.note("w" + i, s.prop && wl[i] ? { t: wl[i], c: sg[i] < 0 ? "R" : sg[i] === 0 ? "S" : "G" } : null, { dl: 0.5 + 0.1 * i });
      }
      c.op("ten", s.ten ? 1 : 0);
      c.note("prop", s.prop ? { t: s.prop, c: "N", f: 1 } : null);
      c.note("nt", s.nt);
    }
  };
}

// template: Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO
// A cause-and-effect chain: cards appear, arrows draw, a token travels; cards can turn red, green or break.
function F_CHAIN(cfg) {
  const nodes = cfg.nodes, n = nodes.length, slot = 376 / n, w = Math.min(104, slot - 14);
  const X = nodes.map((_, i) => 12 + slot * i + slot / 2), fs = w < 82 ? 12 : 13;
  return {
    bench: "Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO",
    draw(f) {
      let s = "";
      for (let i = 0; i < n - 1; i++) {
        const x1 = X[i] + w / 2 + 3, x2 = X[i + 1] - w / 2 - 5;
        s += f.D("a" + i, `M${r1(x1)} 152 H${r1(x2)}`, C.navy, 3.5);
        s += f.H("ah" + i, arrowHead(x2 + 4, 152, 0, C.navy));
        s += f.H("gap" + i, P(`M${r1((x1 + x2) / 2)} 120 V184`, C.red, 3, 'stroke-dasharray="5 4"') + ICO("q", (x1 + x2) / 2, 108, 0.65));
      }
      nodes.forEach((nd, i) => {
        const col = nd[3] ? NC[nd[3]] : C.navy, x = X[i];
        s += f.H("hr" + i, R(x - w / 2 - 5, 95, w + 10, 114, "none", 14, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
        s += f.K("c" + i,
          R(x - w / 2, 100, w, 104, C.white, 11, `stroke="${col}" stroke-width="2.5"`) + R(x - w / 2, 100, w, 7, col, 3) +
          f.H("rb" + i, R(x - w / 2, 100, w, 104, C.rose, 11, `stroke="${C.red}" stroke-width="3"`)) +
          f.H("gb" + i, R(x - w / 2, 100, w, 104, C.mint, 11, `stroke="${C.green}" stroke-width="3"`)) +
          ICO(nd[2] || "gear", x, 132, 0.9, col) + TF(x, 172, nd[0], fs, w - 8) + TF(x, 189, nd[1] || "", fs, w - 8));
        s += f.H("bad" + i, ICO("warn", x + w / 2 - 6, 102, 0.7));
        s += f.H("good" + i, ICO("check", x + w / 2 - 6, 102, 0.7));
      });
      s += f.K("tok", O(X[0], 84, 9, C.gold, `stroke="${C.white}" stroke-width="3"`) + P(`M${r1(X[0])} 93 V98`, C.gold, 2));
      s += f.N("ttl", 200, 38, 15); s += f.N("nt", 200, 240, 13); s += f.N("n2", 200, 272, 13);
      return s;
    },
    render(c, s) {
      const up = s.up == null ? n : s.up, dr = s.dr == null ? up - 1 : s.dr;
      for (let i = 0; i < n; i++) {
        c.op("c" + i, i < up ? (s.dim && s.hl != null && s.hl !== i ? 0.35 : 1) : 0, { dl: 0.1 * i });
        c.mv("c" + i, { y: i < up ? 0 : 14, s: s.hl === i ? 1.06 : 1 });
        c.op("hr" + i, s.hl === i ? 1 : 0);
        c.op("rb" + i, has(s.bad, i) ? 1 : 0); c.op("bad" + i, has(s.bad, i) ? 1 : 0, { dl: 0.2 });
        c.op("gb" + i, has(s.good, i) ? 1 : 0); c.op("good" + i, has(s.good, i) ? 1 : 0, { dl: 0.2 });
      }
      for (let i = 0; i < n - 1; i++) {
        const on = i < dr && s.gap !== i;
        c.dr("a" + i, on ? 1 : 0, { dl: 0.15 * i }); c.op("ah" + i, on ? 1 : 0, { dl: 0.15 * i + 0.4 });
        c.sk("a" + i, has(s.bad, i + 1) ? C.red : C.navy);
        c.op("gap" + i, s.gap === i ? 1 : 0);
      }
      const at = s.at == null ? -1 : s.at;
      c.op("tok", at >= 0 ? 1 : 0); c.mv("tok", { x: at >= 0 ? X[at] - X[0] : 0 }, { d: 1.1 });
      c.note("ttl", s.ttl ? (typeof s.ttl === "string" ? { t: s.ttl, c: "N", f: 1 } : s.ttl) : null);
      c.note("nt", s.nt); c.note("n2", s.n2, { dl: 0.3 });
    }
  };
}

// template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
// Two panels side by side, each with a header, an icon, evidence chips and a verdict.
function F_VS(cfg) {
  const side = (f, k, d, x0) => {
    const col = NC[d.c || "N"], cx = x0 + 91;
    let s = R(x0, 46, 182, 206, C.white, 14, `stroke="${col}" stroke-width="2.5"`) + R(x0, 46, 182, 34, col, 12) + R(x0, 68, 182, 12, col);
    s += T(cx, 68, d.t, 13, C.white) + ICO(d.icon || "doc", cx, 114, 1.25, col);
    (d.items || []).forEach((it, i) => { s += f.H(k + "i" + i, chip(cx, 160 + i * 31, it, { st: col, sz: 12, free: 1 })); });
    return f.K(k, s) + f.H(k + "ok", ICO("check", x0 + 160, 112, 0.8)) + f.H(k + "x", ICO("cross", x0 + 160, 112, 0.8)) + f.H(k + "w", ICO("warn", x0 + 160, 112, 0.8));
  };
  return {
    bench: "Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3",
    draw(f) {
      return side(f, "A", cfg.a, 10) + side(f, "B", cfg.b, 208) + f.K("vs", O(200, 148, 16, C.navy, `stroke="${C.white}" stroke-width="3"`) + T(200, 153, "vs", 13, C.white)) +
        f.N("ttl", 200, 22, 14) + f.N("nt", 200, 278, 13);
    },
    render(c, s) {
      const show = s.show || "ab";
      ["A", "B"].forEach((k) => {
        const lk = k.toLowerCase(), vis = show.indexOf(lk) > -1;
        c.op(k, vis ? (s.hl && s.hl !== lk ? 0.35 : 1) : 0, { dl: lk === "b" ? 0.15 : 0 });
        c.mv(k, { x: vis ? 0 : (lk === "a" ? -24 : 24), s: s.hl === lk ? 1.03 : 1 });
        const cnt = s["i" + lk] == null ? 3 : s["i" + lk];
        (cfg[lk].items || []).forEach((_, i) => c.op(k + "i" + i, vis && i < cnt ? 1 : 0, { dl: 0.25 + 0.12 * i }));
        const v = s["v" + lk];
        c.op(k + "ok", vis && v === "ok" ? 1 : 0, { dl: 0.4 }); c.op(k + "x", vis && v === "x" ? 1 : 0, { dl: 0.4 }); c.op(k + "w", vis && v === "w" ? 1 : 0, { dl: 0.4 });
      });
      c.op("vs", show === "ab" ? 1 : 0);
      c.note("ttl", s.ttl ? { t: s.ttl, c: "N", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p
// A balance: what is gained on one pan, what may be sacrificed on the other, a safeguard at the pivot.
function F_SCALE(cfg) {
  const pan = (f, k, d, x) => {
    const col = NC[d.c || "N"];
    let s = P(`M${x} 96 L${x - 52} 186 M${x} 96 L${x + 52} 186`, C.slate, 1.6) + F(`M${x - 62} 186 H${x + 62} Q${x + 56} 206 ${x} 206 Q${x - 56} 206 ${x - 62} 186 Z`, col);
    (d.items || []).forEach((it, i) => { s += f.H(k + i, chip(x, 172 - i * 28, it, { st: col, sz: 12 })); });
    s += TF(x, 228, d.t, 14, 128, col);
    return f.K(k, s);
  };
  return {
    bench: "Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p",
    draw(f) {
      let s = R(194, 96, 12, 150, C.slate, 3) + F("M168 252 H232 L220 238 H180 Z", C.slate);
      s += f.K("beam", R(60, 90, 280, 10, C.ink, 5) + O(200, 95, 8, C.gold), `data-pv="200 95"`);
      s += pan(f, "L", cfg.L, 70) + pan(f, "R", cfg.R, 330);
      s += f.H("guard", ICO("shield", 200, 132, 1.1, C.teal)); s += f.N("gT", 200, 249, 12);
      s += f.N("ttl", 200, 24, 14); s += f.N("mid", 200, 283, 13);
      return s;
    },
    render(c, s) {
      const t = s.t || 0;
      c.mv("beam", { r: 11 * t, pv: [200, 95] }, { d: 1.2, e: "elastic.out(1,0.6)" });
      c.mv("L", { y: -26 * t, s: s.hl === "L" ? 1.04 : 1 }, { d: 1.2 }); c.mv("R", { y: 26 * t, s: s.hl === "R" ? 1.04 : 1 }, { d: 1.2 });
      const nl = s.nl == null ? 3 : s.nl, nr = s.nr == null ? 3 : s.nr;
      (cfg.L.items || []).forEach((_, i) => c.op("L" + i, i < nl ? 1 : 0, { dl: 0.15 * i })); (cfg.R.items || []).forEach((_, i) => c.op("R" + i, i < nr ? 1 : 0, { dl: 0.15 * i }));
      c.op("guard", s.guard ? 1 : 0); c.note("gT", s.guard ? { t: s.guard === true ? "Safeguard" : s.guard, c: "T", f: 1 } : null);
      c.note("ttl", s.ttl ? { t: s.ttl, c: "N", f: 1 } : null); c.note("mid", s.mid);
    }
  };
}

// template: Animated Dashboards — https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ
// Three gauges whose needles and readings show how a process performs on different measures.
function F_GAUGE(cfg) {
  const X = [72, 200, 328], Y = 146, Rr = 48;
  return {
    bench: "Animated Dashboards — https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ",
    draw(f) {
      let s = "";
      cfg.g.forEach((g, i) => {
        const x = X[i];
        s += f.K("g" + i,
          R(x - 62, 82, 124, 130, C.white, 14, `stroke="${C.line}" stroke-width="2"`) +
          P(arcD(x, Y, Rr - 6, Math.PI, Math.PI * 1.33), C.red, 9) + P(arcD(x, Y, Rr - 6, Math.PI * 1.36, Math.PI * 1.64), C.gold, 9) + P(arcD(x, Y, Rr - 6, Math.PI * 1.67, Math.PI * 2), C.green, 9) +
          f.K("nd" + i, P(`M${x} ${Y} L${x} ${Y - Rr + 10}`, C.ink, 4), `data-pv="${x} ${Y}"`) + O(x, Y, 6, C.ink) +
          f.TK("v" + i, x, Y + 26, "", 17, C.ink) + chip(x, 232, g[0], { st: NC[g[1] || "N"], sz: 12, free: 1 }));
        s += f.H("wr" + i, R(x - 66, 78, 132, 138, "none", 16, `stroke="${C.red}" stroke-width="3" stroke-dasharray="7 5"`));
        s += f.H("hr" + i, R(x - 66, 78, 132, 138, "none", 16, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
      });
      s += f.N("ttl", 200, 40, 15); s += f.N("nt", 200, 272, 13);
      return s;
    },
    render(c, s) {
      const show = s.show == null ? 3 : s.show, v = s.val || [0, 0, 0], t = s.txt || [];
      for (let i = 0; i < cfg.g.length; i++) {
        c.op("g" + i, i < show ? (s.hl != null && s.hl !== i && s.dim ? 0.35 : 1) : 0, { dl: 0.12 * i });
        c.mv("nd" + i, { r: clamp(v[i] || 0, -1, 1) * 84, pv: [X[i], Y] }, { d: 1.2, dl: 0.1 * i });
        c.tx("v" + i, t[i] || "");
        c.op("wr" + i, has(s.warn, i) ? 1 : 0); c.op("hr" + i, s.hl === i ? 1 : 0);
      }
      c.note("ttl", s.ttl ? { t: s.ttl, c: "N", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: Bar chart transitions — https://observablehq.com/@d3/bar-chart-transitions/2
// A ratio built from coins over beds, its result, and baseline vs target bars.
function F_FRAC(cfg) {
  return {
    bench: "Bar chart transitions — https://observablehq.com/@d3/bar-chart-transitions/2",
    draw(f) {
      let s = R(10, 12, 222, 168, C.white, 14, `stroke="${C.line}" stroke-width="2"`);
      s += f.K("num", chip(121, 34, cfg.num, { st: C.amber, sz: 13, free: 1 }) + rep(5, (i) => ICO("coin", 57 + i * 32, 66, 0.72)));
      s += f.K("bar", P("M30 94 H212", C.ink, 4));
      s += f.K("den", rep(4, (i) => ICO("bed", 66 + i * 36, 120, 0.82, C.navy2)) + chip(121, 156, cfg.den, { st: C.navy2, sz: 13, free: 1 }));
      s += f.K("eq", T(250, 104, "=", 34, C.ink));
      s += f.K("res", R(270, 66, 120, 62, C.white, 14, `stroke="${C.coral}" stroke-width="3"`) + f.TK("rv", 330, 106, cfg.res || "", 24, C.coral));
      s += f.H("rl", T(330, 148, cfg.resl || "per room-night", 12, C.slate));
      s += T(24, 204, cfg.base[1], 13, C.ink, "", "start") + R(24, 212, 340, 18, "#edf1f4", 9);
      s += f.K("bb", R(24, 212, 340 * cfg.base[0], 18, C.coral, 9), `data-pv="24 221"`);
      s += f.TK("bT", 30 + 340 * cfg.base[0], 226, "", 13, C.white, "end");
      s += T(24, 250, cfg.tgt[1], 13, C.ink, "", "start") + R(24, 258, 340, 18, "#edf1f4", 9);
      s += f.K("tb", R(24, 258, 340 * cfg.tgt[0], 18, C.green, 9), `data-pv="24 267"`);
      s += f.H("cut", R(24 + 340 * cfg.tgt[0], 258, 340 * (cfg.base[0] - cfg.tgt[0]), 18, "none", 4, `stroke="${C.red}" stroke-width="2" stroke-dasharray="4 3"`));
      s += f.H("warn", ICO("warn", 384, 267, 0.7));
      s += f.N("calc", 200, 286, 13);
      s += f.N("nt", 310, 186, 12);
      return s;
    },
    render(c, s) {
      const st = s.stage == null ? 5 : s.stage;
      c.op("num", st >= 0 ? 1 : 0); c.op("bar", st >= 1 ? 1 : 0); c.op("den", st >= 1 ? 1 : 0, { dl: 0.2 });
      c.op("eq", st >= 2 ? 1 : 0); c.op("res", st >= 2 ? 1 : 0, { dl: 0.2 }); c.op("rl", st >= 2 ? 1 : 0, { dl: 0.3 });
      const rv = s.rv || cfg.res || ""; c.tx("rv", rv); c.at("rv", "font-size", Math.min(24, Math.floor(108 / Math.max(1, rv.length * 0.58))));
      c.mv("bb", { sx: st >= 3 ? 1 : 0.001, pv: [24, 221] }, { d: 1 }); c.op("bb", st >= 3 ? 1 : 0);
      c.tx("bT", st >= 3 ? (s.bT || "") : "");
      c.mv("tb", { sx: st >= 4 ? 1 : 0.001, pv: [24, 267] }, { d: 1, dl: 0.2 }); c.op("tb", st >= 4 ? 1 : 0);
      c.op("cut", st >= 4 && s.cut ? 1 : 0, { dl: 0.6 });
      c.op("warn", s.warn ? 1 : 0); c.cl("warn", "a-pulse", !!s.warn);
      c.note("calc", s.calc ? { t: s.calc, c: s.cc || "G", f: 1 } : null, { dl: 0.3 });
      c.note("nt", s.nt);
    }
  };
}

// template: Stacked-to-grouped bars — https://observablehq.com/@d3/stacked-to-grouped-bars
// The Exhibit 5 alignment matrix: four proposals by three objectives, strengths as sized dots.
const EX5 = { rows: [["Guest arrival", "guest"], ["Stock counting", "box"], ["Corporate billing", "invoice"], ["Spa booking", "spa"]], v: [[3, 2, 3], [0, 2, 0], [2, 1, 3], [2, 0, 0]] };
function F_MATRIX() {
  const CX = [196, 254, 312], RY = [100, 146, 192, 238], RS = [0, 5.5, 9.5, 13.5];
  return {
    bench: "Stacked-to-grouped bars — https://observablehq.com/@d3/stacked-to-grouped-bars",
    draw(f) {
      let s = R(4, 30, 392, 234, C.white, 14, `stroke="${C.line}" stroke-width="2"`);
      for (let j = 0; j < 3; j++) s += f.H("cb" + j, R(CX[j] - 27, 34, 54, 228, OC[j], 10, 'opacity=".16"'));
      ["star", "costdown", "growth"].forEach((ic, j) => { s += ICO(ic, CX[j], 50, 0.62, OC[j]) + T(CX[j], 76, OBJN[j], 12, OC[j]); });
      s += T(356, 76, "Total", 12, C.slate);
      for (let i = 0; i < 4; i++) {
        const y = RY[i];
        s += f.H("rb" + i, R(8, y - 21, 384, 42, C.gold, 10, 'opacity=".2"'));
        s += f.H("rg" + i, R(8, y - 21, 384, 42, "none", 10, `stroke="${C.green}" stroke-width="3"`));
        s += f.K("r" + i, ICO(EX5.rows[i][1], 26, y, 0.62, C.navy) + T(44, y + 5, EX5.rows[i][0], 13, C.ink, "", "start") + P(`M12 ${y + 21} H388`, C.line, 1));
        for (let j = 0; j < 3; j++) {
          const v = EX5.v[i][j];
          s += f.H("c" + i + j, v ? O(CX[j], y, RS[v], OC[j]) : P(`M${CX[j] - 8} ${y} H${CX[j] + 8}`, C.muted, 3));
        }
        s += f.TK("t" + i, 356, y + 6, String(EX5.v[i].reduce((a, b) => a + b, 0)), 18, C.navy, "middle", 'style="opacity:0"');
        s += f.H("fd" + i, ICO("coin", 386, y, 0.55));
        s += f.H("df" + i, ICO("hourglass", 386, y, 0.5, C.slate));
      }
      s += f.H("cr", ICO("crown", 136, RY[3] - 2, 0.55));
      s += f.K("lg", O(70, 282, 7, C.slate) + T(80, 287, "Strong", 12, C.slate, "", "start") + O(150, 282, 5, C.slate) + T(158, 287, "Moderate", 12, C.slate, "", "start") +
        O(244, 282, 3, C.slate) + T(250, 287, "Weak", 12, C.slate, "", "start") + P("M300 282 H312", C.muted, 3) + T(318, 287, "None", 12, C.slate, "", "start"));
      s += f.N("nt", 200, 16, 12);
      return s;
    },
    render(c, s) {
      const rows = s.rows == null ? 4 : s.rows, cells = s.cells == null ? rows : s.cells;
      for (let i = 0; i < 4; i++) {
        const vis = Array.isArray(rows) ? has(rows, i) : i < rows;
        const dim = s.hl != null && s.hl !== i && (s.dim !== false) && !has(s.also, i);
        c.op("r" + i, vis ? (dim ? 0.35 : 1) : 0.12, { dl: 0.08 * i });
        c.op("rb" + i, s.hl === i || has(s.also, i) ? 1 : 0); c.op("rg" + i, has(s.fund, i) ? 1 : 0);
        const cv = Array.isArray(cells) ? has(cells, i) : i < cells;
        for (let j = 0; j < 3; j++) { c.op("c" + i + j, cv ? (dim ? 0.35 : 1) : 0, { dl: 0.2 + 0.15 * j }); c.mv("c" + i + j, { s: cv ? (has(s.colhl, j) && !dim ? 1.2 : 1) : 0.2 }, { dl: 0.2 + 0.15 * j }); }
        c.op("t" + i, s.tot && cv ? 1 : 0, { dl: 0.6 });
        c.op("fd" + i, has(s.fund, i) ? 1 : 0, { dl: 0.4 }); c.mv("fd" + i, { y: has(s.fund, i) ? 0 : -30 }, { dl: 0.4 });
        c.op("df" + i, has(s.def, i) ? 1 : 0, { dl: 0.4 });
      }
      for (let j = 0; j < 3; j++) c.op("cb" + j, has(s.colhl, j) ? 1 : 0);
      c.op("cr", s.crown ? 1 : 0); c.cl("cr", "a-pulse", !!s.crown);
      c.note("nt", s.nt);
    }
  };
}

// template: Multi-Step Icon Animation — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
// An objective as a key: four cuts (result, measure, boundary, authority) before it opens the lock.
function F_KEY() {
  const NX = [160, 196, 232, 268], LB = ["1 Result", "2 Measure", "3 Boundary", "4 Authority"], LC = [C.teal, C.navy2, C.coral, C.plum];
  return {
    bench: "Multi-Step Icon Animation — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU",
    draw(f) {
      let s = R(0, 0, 400, 300, "#1d3b42") + rep(14, (i) => rep(9, (j) => O(14 + i * 28, 14 + j * 28, 1.4, "#2f5a62")));
      s += f.H("dep", chip(70, 30, "Reception", { st: C.teal, sz: 12 }) + chip(165, 30, "Housekeeping", { st: C.navy2, sz: 12 }) + chip(262, 30, "Finance", { st: C.gold, sz: 12 }) + chip(344, 30, "Sales", { st: C.coral, sz: 12 }));
      s += f.K("lock", R(312, 96, 80, 104, "#9aa7b0", 12, `stroke="#5d6b75" stroke-width="3"`) + O(352, 140, 10, "#26333b") + R(348, 142, 8, 18, "#26333b", 2));
      s += f.K("lamp", O(352, 184, 7, C.muted));
      s += f.K("sh", P("M328 96 V74 A24 24 0 0 1 376 74 V96", "#5d6b75", 9));
      s += f.K("key",
        O(70, 140, 30, "#e3b04b", `stroke="#b6862a" stroke-width="3"`) + O(70, 140, 11, "#1d3b42") +
        R(98, 131, 192, 18, "#e3b04b", 3) + R(150, 109, 140, 24, "#e3b04b", 2) + F("M290 131 L302 140 L290 149 Z", "#e3b04b") +
        NX.map((x, i) => f.K("n" + i, R(x, 109, 20, 22, "#1d3b42"), `data-pv="${x + 10} 109"`) + R(x, 109, 20, 22, "none", 2, `stroke="#ffffff" stroke-width="1.3" stroke-dasharray="3 3" opacity=".7"`) + T(x + 10, 102, String(i + 1), 12, "#ffe7a8")).join(""));
      s += f.K("cut", G("translate(0 0)", P("M170 26 V60", "#8796a0", 6) + `<g class="a-spin">${O(170, 70, 18, "#c9d2d8", `stroke="#5d6b75" stroke-width="3"`) + P("M170 54 V86 M154 70 H186", "#5d6b75", 2.5)}</g>` +
        f.H("spk", P("M160 92 L150 104 M170 94 V108 M180 92 L190 104", "#ffd36b", 2.5))));
      s += f.H("fx", ICO("cross", 352, 140, 1.1));
      s += f.H("sp", ICO("sponsor", 30, 194, 1.1, C.plum) + T(30, 226, "Sponsor", 11, "#e7dcf7"));
      LB.forEach((t, i) => { s += f.K("lg" + i, chip([52, 146, 252, 350][i], 262, t, { st: LC[i], sz: 12, free: 1 })); });
      s += f.N("nt", 200, 228, 13);
      return s;
    },
    render(c, s) {
      const cuts = s.cuts || 0;
      for (let i = 0; i < 4; i++) {
        c.mv("n" + i, { sy: i < cuts ? 1 : 0.02, pv: [NX[i] + 10, 109] }, { dl: i === cuts - 1 ? 0.4 : 0 });
        c.op("lg" + i, i < cuts ? 1 : (s.legend ? 0.35 : 0)); c.mv("lg" + i, { s: s.hl === i ? 1.12 : 1 });
      }
      const at = s.at == null ? -1 : s.at;
      c.mv("cut", { x: at >= 0 ? NX[at] - 160 : 200, y: at >= 0 ? 0 : -90 }, { d: 0.9 });
      c.op("spk", at >= 0 ? 1 : 0, { dl: 0.6 });
      c.mv("key", { x: s.inLock ? 44 : 0, y: s.drop ? 40 : 0 }, { d: 1 });
      c.op("key", s.ghost ? 0.45 : 1);
      c.fl("lamp", s.open ? C.green : s.fail ? C.red : C.muted);
      c.mv("sh", { y: s.open ? -16 : 0 }, { dl: 0.6 });
      c.op("fx", s.fail ? 1 : 0, { dl: 0.5 });
      c.op("dep", s.dep ? 1 : 0); c.op("sp", s.sp ? 1 : 0);
      c.note("nt", s.nt);
    }
  };
}

// template: Process - Success — https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP
// The mechanism: a proposal turns a gear train (change -> effect -> objective) that moves a dial.
function gearPath(cx, cy, r, n, skip) {
  let d = ""; const st = 2 * Math.PI / n, dp = 7;
  for (let k = 0; k < n; k++) {
    const a = k * st, pts = has(skip, k) ? [[a, r - dp], [a + st * 0.65, r - dp]] : [[a, r - dp], [a + st * 0.15, r], [a + st * 0.5, r], [a + st * 0.65, r - dp]];
    pts.forEach((p, j) => { d += (k === 0 && j === 0 ? "M" : "L") + r1(cx + Math.cos(p[0]) * p[1]) + " " + r1(cy + Math.sin(p[0]) * p[1]) + " "; });
  }
  return d + "Z";
}
function F_GEAR(cfg) {
  const G1 = [70, 176, 40], G2 = [144, 176, 32], G3 = [218, 176, 40], DL = [334, 140];
  const lab = cfg.labels || ["Change", "Effect", "Contribution"];
  return {
    bench: "Process - Success — https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP",
    draw(f) {
      let s = rep(20, (i) => P(`M${i * 20} 0 V300`, "#21426a", 1)) + rep(15, (i) => P(`M0 ${i * 20} H400`, "#21426a", 1));
      s = R(0, 0, 400, 300, "#173250") + s;
      s += f.D("belt", "M232 140 C262 112 290 112 300 118", "#f4cf6b", 5);
      s += f.K("g1", F(gearPath(G1[0], G1[1], G1[2], 12), C.teal, `stroke="#0f2440" stroke-width="2"`) + O(G1[0], G1[1], 8, "#0f2440") + P(`M${G1[0]} ${G1[1]} L${G1[0] - 28} ${G1[1] - 30}`, "#e8eef5", 6) + O(G1[0] - 28, G1[1] - 30, 7, "#e8eef5"), `data-pv="${G1[0]} ${G1[1]}"`);
      s += f.K("g2", F(gearPath(G2[0], G2[1], G2[2], 10, [2, 3]), C.gold, `stroke="#0f2440" stroke-width="2"`) + O(G2[0], G2[1], 7, "#0f2440") +
        f.H("gap", P(arcD(G2[0], G2[1], 38, 2 * 2 * Math.PI / 10 - 0.1, 4 * 2 * Math.PI / 10 + 0.1), C.red, 4)) +
        f.H("fix", F(gearPath(G2[0], G2[1], G2[2], 10, [0, 1, 4, 5, 6, 7, 8, 9]), C.green, `stroke="#0f2440" stroke-width="1.5"`)), `data-pv="${G2[0]} ${G2[1]}"`);
      s += f.K("g3", F(gearPath(G3[0], G3[1], G3[2], 12), C.coral, `stroke="#0f2440" stroke-width="2"`) + O(G3[0], G3[1], 8, "#0f2440"), `data-pv="${G3[0]} ${G3[1]}"`);
      lab.forEach((t, i) => { s += f.K("lb" + i, chip([70, 144, 218][i], 240, t, { st: [C.teal, C.gold, C.coral][i], sz: 12, free: 1 })); });
      s += O(DL[0], DL[1], 44, "#0f2440", `stroke="${C.sky}" stroke-width="3"`) + P(arcD(DL[0], DL[1], 34, Math.PI * 1.08, Math.PI * 1.5), C.red, 6) + P(arcD(DL[0], DL[1], 34, Math.PI * 1.5, Math.PI * 1.92), C.green, 6);
      s += f.K("nd", P(`M${DL[0]} ${DL[1]} L${DL[0]} ${DL[1] - 32}`, C.white, 4), `data-pv="${DL[0]} ${DL[1]}"`) + O(DL[0], DL[1], 5, C.white);
      s += chip(DL[0], 202, cfg.dial || "Objective", { st: cfg.dc || C.teal, sz: 13, free: 1 });
      s += f.H("gain", ICO("coin", 300, 250, 0.6) + ICO("coin", 326, 250, 0.6) + ICO("coin", 352, 250, 0.6) + T(326, 280, "Savings", 12, C.gold));
      s += f.H("minus", ICO("cross", 300, 250, 0.5) + ICO("cross", 326, 250, 0.5) + T(374, 255, "New costs", 12, C.red, "", "end"));
      s += f.N("prop", 200, 28, 15); s += f.N("nt", 200, 66, 13);
      return s;
    },
    render(c, s) {
      const T0 = (s.turn || 0) * 120;
      c.mv("g1", { r: T0, pv: [G1[0], G1[1]] }, { d: 1.4 });
      c.mv("g2", { r: -T0 * 40 / 32 + (s.gap ? 10 : 0), pv: [G2[0], G2[1]] }, { d: 1.4 });
      c.mv("g3", { r: s.gap && !s.fix ? 0 : T0, pv: [G3[0], G3[1]] }, { d: 1.4 });
      c.op("gap", s.gap && !s.fix ? 1 : 0); c.op("fix", s.fix ? 1 : 0);
      c.dr("belt", s.belt ? 1 : 0);
      c.mv("nd", { r: clamp(s.dial || -0.8, -1, 1) * 80, pv: [DL[0], DL[1]] }, { d: 1.2, dl: 0.3 });
      for (let i = 0; i < 3; i++) c.op("lb" + i, s.lab === false ? 0.25 : (s.hl == null || s.hl === i ? 1 : 0.4));
      c.op("gain", s.coins === "gain" || s.coins === "net" ? 1 : 0); c.op("minus", s.coins === "net" ? 1 : 0, { dl: 0.3 });
      c.note("prop", s.prop ? { t: s.prop, c: "T", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: Hierarchy traversal animated — https://old.observablehq.com/@d3/hierarchy-traversal-animated
// Governance tiers: who recommends, who approves, and an escalation that climbs to the right level.
function F_LADDER(cfg) {
  const Y = [52, 112, 172, 232];
  return {
    bench: "Hierarchy traversal animated — https://old.observablehq.com/@d3/hierarchy-traversal-animated",
    draw(f) {
      let s = "";
      cfg.tiers.forEach((t, i) => {
        const col = NC[t[2] || "N"];
        s += f.H("h" + i, R(14, Y[i] - 27, 240, 54, "none", 14, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
        s += f.K("t" + i, R(18, Y[i] - 23, 232, 46, C.white, 12, `stroke="${col}" stroke-width="2.5"`) + R(18, Y[i] - 23, 10, 46, col, 4) + ICO(t[1], 52, Y[i], 0.9, col) + TF(80, Y[i] + 5, t[0], 15, 162, C.ink, "start"));
        if (i < 3) s += P(`M150 ${Y[i] + 23} V${Y[i + 1] - 23}`, C.line, 2.5);
        s += f.N("tg" + i, 334, Y[i], 12);
      });
      s += f.D("esc", `M262 ${Y[3] + 10} C276 ${Y[3] - 10} 268 ${Y[0] + 40} 262 ${Y[0] + 6}`, C.red, 4);
      s += f.H("eh", arrowHead(262, Y[0] + 2, -90, C.red));
      s += f.H("cf", person(210, Y[3] - 2, 0.8, C.teal) + person(258, Y[3] - 2, 0.8, C.coral) + P(`M226 ${Y[3] - 12} L232 ${Y[3] - 4} L236 ${Y[3] - 14} L242 ${Y[3] - 6}`, C.red, 3));
      s += f.H("stp", G("rotate(-8 334 82)", R(282, 67, 104, 30, "rgba(255,255,255,.94)", 6, `stroke="${C.green}" stroke-width="3.5"`) + f.TK("stT", 334, 88, "", 15, C.green)));
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      const show = s.show == null ? 4 : s.show, tg = s.tags || {};
      for (let i = 0; i < 4; i++) {
        c.op("t" + i, i < show ? (s.hl != null && s.hl !== i && s.dim ? 0.35 : 1) : 0, { dl: 0.12 * i });
        c.mv("t" + i, { x: i < show ? 0 : -20, s: s.hl === i ? 1.03 : 1 });
        c.op("h" + i, s.hl === i ? 1 : 0);
        c.note("tg" + i, tg[i] ? (typeof tg[i] === "string" ? { t: tg[i], c: "N" } : tg[i]) : null, { dl: 0.3 + 0.1 * i });
      }
      c.dr("esc", s.esc || 0, { d: 1.3 }); c.op("eh", (s.esc || 0) >= 1 ? 1 : 0, { dl: 1 });
      c.op("cf", s.cf ? 1 : 0);
      c.tx("stT", s.stamp || ""); c.op("stp", s.stamp ? 1 : 0, { dl: 0.5 }); c.mv("stp", { s: s.stamp ? 1 : 1.4 }, { dl: 0.5 });
      c.note("nt", s.nt);
    }
  };
}

// template: Animated treemap — https://observablehq.com/@d3/animated-treemap
// Qasr's processes as tiles; a scope boundary that can be narrow, focused or broad; exclusions and dependencies.
function F_SCOPE(cfg) {
  const X = [72, 200, 328], Y = [72, 140, 208];
  const BOX = { n: [138, 108, 124, 64], f: [10, 40, 252, 134], b: [6, 40, 388, 202] };
  return {
    bench: "Animated treemap — https://observablehq.com/@d3/animated-treemap",
    draw(f) {
      let s = "";
      ["n", "f", "b"].forEach((k) => { const b = BOX[k]; s += f.H("b" + k, R(b[0], b[1], b[2], b[3], "rgba(23,143,128,.08)", 16, `stroke="${C.teal}" stroke-width="3.5" stroke-dasharray="9 6"`)); });
      cfg.tiles.forEach((t, i) => {
        const x = X[i % 3], y = Y[Math.floor(i / 3)];
        s += f.K("tl" + i, R(x - 56, y - 26, 112, 52, C.white, 10, `stroke="${C.navy2}" stroke-width="2"`) + ICO(t[1], x - 40, y, 0.55, C.navy2) + (t[0].indexOf("|") > -1 ? TF(x + 10, y - 2, t[0].split("|")[0], 12, 84) + TF(x + 10, y + 13, t[0].split("|")[1], 12, 84) : TF(x + 10, y + 5, t[0], 12, 84)));
        s += f.H("x" + i, R(x - 56, y - 26, 112, 52, "rgba(93,115,137,.55)", 10) + xmark(x + 40, y - 12, 0.7, C.white, 3));
        s += f.H("w" + i, R(x - 60, y - 30, 120, 60, "none", 12, `stroke="${C.red}" stroke-width="3" class="a-pulse"`));
      });
      s += f.H("dep", P(`M256 ${Y[1]} H270`, C.red, 3) + arrowHead(272, Y[1], 0, C.red) + P(`M200 ${Y[1] - 26} V${Y[0] + 28}`, C.red, 3) + arrowHead(200, Y[0] + 26, -90, C.red));
      s += f.N("bl", 200, 22, 14); s += f.N("nt", 200, 276, 13);
      return s;
    },
    render(c, s) {
      ["n", "f", "b"].forEach((k) => c.op("b" + k, s.box === k ? 1 : 0));
      cfg.tiles.forEach((_, i) => {
        c.op("tl" + i, has(s.hide, i) ? 0.15 : 1, { dl: 0.04 * i });
        c.op("x" + i, has(s.x, i) ? 1 : 0, { dl: 0.2 }); c.op("w" + i, has(s.w, i) ? 1 : 0);
        c.mv("tl" + i, { s: s.hl === i ? 1.08 : 1 });
      });
      c.op("dep", s.dep ? 1 : 0);
      c.note("bl", s.bl ? { t: s.bl, c: "T", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: contract process — https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8
// The strategy mandate as a document: scattered notes become sections, sections get ticked, a stamp, a handover.
function F_DOC(cfg) {
  const rows = cfg.rows;
  return {
    bench: "contract process — https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8",
    draw(f) {
      let s = f.H("sc", G("rotate(-12 70 70)", R(36, 52, 70, 46, C.cream, 4, `stroke="${C.gold}" stroke-width="2"`) + P("M44 66 H96 M44 76 H86", C.amber, 2)) +
        G("rotate(9 330 70)", R(296, 50, 72, 48, C.white, 4, `stroke="${C.navy2}" stroke-width="2"`) + P("M304 64 H358 M304 74 H340", C.navy2, 2)) +
        G("rotate(6 60 220)", R(24, 196, 70, 46, C.rose, 4, `stroke="${C.coral}" stroke-width="2"`) + P("M32 210 H84 M32 220 H72", C.coral, 2)) +
        G("rotate(-8 340 220)", R(304, 198, 70, 46, C.mint, 4, `stroke="${C.green}" stroke-width="2"`) + P("M312 212 H364 M312 222 H350", C.green, 2)) +
        T(200, 150, "?", 40, C.slate, 'class="a-pulse"'));
      s += f.K("pg", F("M112 26 H268 L288 46 V262 H112 Z", C.white, `stroke="${C.navy}" stroke-width="2.5"`) + F("M268 26 V46 H288", C.sky, `stroke="${C.navy}" stroke-width="2"`) +
        R(112, 46, 176, 30, C.navy) + T(200, 66, cfg.title, 14, C.white) +
        rows.map((r, i) => { const y = rows.length > 4 ? 92 + i * 30 : 96 + i * 34; return f.K("r" + i, R(122, y - 13, 156, 28, "#f1f4f7", 7) + ICO(r[1], 138, y + 1, 0.5, C.navy2) + TF(152, y + 6, r[0], 12, 112, C.ink, "start")) + f.H("k" + i, ICO("check", 279, y + 1, 0.55)) + f.H("q" + i, ICO("warn", 279, y + 1, 0.55)); }).join(""));
      s += f.H("sA", G("rotate(-12 200 252)", R(140, 235, 120, 34, "rgba(255,255,255,.92)", 6, `stroke="${C.green}" stroke-width="3.5"`) + T(200, 258, "ACCEPTED", 16, C.green)));
      s += f.H("sC", G("rotate(-12 200 252)", R(128, 235, 144, 34, "rgba(255,255,255,.92)", 6, `stroke="${C.amber}" stroke-width="3.5"`) + T(200, 258, "CONDITIONAL", 16, C.amber)));
      s += f.H("sX", G("rotate(-12 200 252)", R(140, 235, 120, 34, "rgba(255,255,255,.92)", 6, `stroke="${C.red}" stroke-width="3.5"`) + T(200, 258, "UNCLEAR", 16, C.red)));
      s += f.H("ho", P("M292 150 H330", C.teal, 4, 'class="a-flow"') + arrowHead(338, 150, 0, C.teal) + ICO("people", 364, 150, 0.95, C.teal) + T(364, 182, "Teams", 12, C.teal));
      s += f.H("sp", ICO("sponsor", 48, 150, 1.15, C.plum) + T(48, 182, "Sponsor", 12, C.plum));
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      const n = s.rows == null ? rows.length : s.rows, ok = s.ok || [], q = s.q || [];
      c.op("sc", s.scat ? 1 : 0); c.op("pg", s.scat ? 0.15 : 1); c.mv("pg", { s: s.scat ? 0.92 : 1 });
      for (let i = 0; i < rows.length; i++) {
        c.op("r" + i, i < n && !s.scat ? (s.hl != null && s.hl !== i ? 0.4 : 1) : 0, { dl: 0.1 * i }); c.mv("r" + i, { x: i < n ? 0 : 16 });
        c.op("k" + i, ok === "all" || has(ok, i) ? 1 : 0, { dl: 0.3 + 0.12 * i }); c.op("q" + i, has(q, i) ? 1 : 0, { dl: 0.3 });
      }
      ["A", "C", "X"].forEach((k) => { c.op("s" + k, s.stamp === k ? 1 : 0, { dl: 0.4 }); c.mv("s" + k, { s: s.stamp === k ? 1 : 1.5 }, { dl: 0.4 }); });
      c.op("ho", s.ho ? 1 : 0); c.op("sp", s.sp ? 1 : 0);
      c.note("nt", s.nt);
    }
  };
}

// template: Animated line chart lesson — https://observablehq.com/@d3/learn-d3-animation
// Baseline, target and measured line over time, with the spread of individual results.
function F_CHART(cfg) {
  const x0 = 54, x1 = 372, y0 = 236, y1 = 56, mx = cfg.max;
  const Yv = (v) => r1(y0 - (v / mx) * (y0 - y1));
  const pts = cfg.series.map((v, i) => [r1(x0 + i * (x1 - x0) / (cfg.series.length - 1)), Yv(v)]);
  const line = "M" + pts.map((p) => p[0] + " " + p[1]).join(" L");
  const band = "M" + pts.map((p, i) => p[0] + " " + r1(p[1] - cfg.spread[i])).join(" L") + " L" + pts.slice().reverse().map((p, i) => p[0] + " " + r1(p[1] + cfg.spread[cfg.spread.length - 1 - i])).join(" L") + " Z";
  return {
    bench: "Animated line chart lesson — https://observablehq.com/@d3/learn-d3-animation",
    draw(f) {
      let s = R(8, 24, 384, 248, C.white, 14, `stroke="${C.line}" stroke-width="2"`);
      s += P(`M${x0} ${y1 - 6} V${y0} H${x1 + 6}`, C.slate, 2.5) + T(x0 - 8, Yv(0) + 4, "0", 12, C.slate, "", "end") + T(x0 - 8, Yv(mx / 2) + 4, String(mx / 2), 12, C.slate, "", "end") + T(x0 - 8, Yv(mx) + 4, String(mx), 12, C.slate, "", "end");
      s += T((x0 + x1) / 2, 258, cfg.xl || "Weeks", 12, C.slate) + T(18, 46, cfg.unit, 12, C.slate, "", "start");
      s += f.H("band", F(band, "rgba(192,57,43,.14)"));
      s += f.H("go", P(`M${pts[cfg.live][0]} ${y1} V${y0}`, C.plum, 2.5, 'stroke-dasharray="5 4"') + chip(pts[cfg.live][0], y1 - 6, "Redesign live", { st: C.plum, sz: 11, free: 1 }));
      s += f.K("bl", P(`M${x0} ${Yv(cfg.base)} H${x1}`, C.coral, 3, 'stroke-dasharray="8 6"'));
      s += f.K("tl", P(`M${x0} ${Yv(cfg.tgt)} H${x1}`, C.green, 3.5));
      s += f.D("ml", line, C.navy, 4);
      s += f.H("ol", cfg.out.map((o) => O(pts[o[0]][0], Yv(o[1]), 5, C.red, `stroke="${C.white}" stroke-width="1.5"`)).join(""));
      s += f.N("bT", 300, Yv(cfg.base) - 14, 12); s += f.N("tT", 300, Yv(cfg.tgt) + 16, 12);
      s += f.N("nt", 200, 287, 13);
      return s;
    },
    render(c, s) {
      c.op("bl", s.bl ? 1 : 0); c.op("tl", s.tl ? 1 : 0);
      c.note("bT", s.bl ? { t: cfg.bT, c: "O", f: 1 } : null); c.note("tT", s.tl ? { t: cfg.tT, c: "G", f: 1 } : null);
      c.dr("ml", s.ml || 0, { d: 1.6 }); c.op("band", s.band ? 1 : 0); c.op("ol", s.ol ? 1 : 0, { dl: 0.3 }); c.cl("ol", "a-blink", !!s.ol);
      c.op("go", s.go ? 1 : 0);
      c.note("nt", s.nt);
    }
  };
}

// template: Payment Successful — https://lottiefiles.com/free-animation/payment-successful-5uXFkB4jix
// Four proposal cards and a budget of two coins: coins drop on the funded pair; the rest are deferred, not discarded.
function F_BUDGET() {
  const X = [56, 152, 248, 344], NM = [["Guest", "arrival", "guest"], ["Stock", "counting", "box"], ["Corporate", "billing", "invoice"], ["Spa", "booking", "spa"]];
  return {
    bench: "Payment Successful — https://lottiefiles.com/free-animation/payment-successful-5uXFkB4jix",
    draw(f) {
      let s = R(120, 14, 160, 30, C.navy, 15) + T(200, 34, "Budget: 2 of 4", 15, C.white);
      X.forEach((x, i) => {
        s += f.H("fg" + i, R(x - 48, 110, 96, 128, "none", 14, `stroke="${C.green}" stroke-width="4" class="a-pulse"`));
        s += f.K("cd" + i, R(x - 43, 116, 86, 116, C.white, 12, `stroke="${C.navy2}" stroke-width="2.5"`) + ICO(NM[i][2], x, 152, 1, C.navy2) + T(x, 196, NM[i][0], 13, C.ink) + T(x, 213, NM[i][1], 13, C.ink));
        s += f.H("df" + i, G(`rotate(-14 ${x} 146)`, R(x - 40, 134, 80, 22, "rgba(255,255,255,.94)", 5, `stroke="${C.slate}" stroke-width="2.5"`) + T(x, 150, "DEFERRED", 12, C.slate)));
        s += f.N("vk" + i, x, 252, 11);
      });
      s += f.H("cr", ICO("crown", 344, 106, 0.7));
      for (let k = 0; k < 2; k++) s += f.K("c" + k, ICO("coin", 176 + k * 48, 70, 0.95));
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      const n = s.cards == null ? 4 : s.cards, fund = s.fund || [];
      for (let i = 0; i < 4; i++) {
        c.op("cd" + i, i < n ? (s.hl != null && s.hl !== i ? 0.4 : 1) : 0, { dl: 0.1 * i });
        c.mv("cd" + i, { y: i < n ? 0 : 16, s: s.hl === i ? 1.06 : 1 });
        c.op("fg" + i, has(fund, i) ? 1 : 0, { dl: 0.6 }); c.op("df" + i, has(s.def, i) ? 1 : 0, { dl: 0.5 });
        c.note("vk" + i, s.vk && s.vk[i] ? { t: s.vk[i], c: "S" } : null);
      }
      for (let k = 0; k < 2; k++) {
        const tgt = fund[k];
        c.mv("c" + k, tgt == null ? {} : { x: X[tgt] - (176 + k * 48), y: 30 }, { d: 1, dl: 0.15 * k, e: "bounce.out" });
      }
      c.op("cr", s.crown ? 1 : 0); c.cl("cr", "a-pulse", !!s.crown);
      c.note("nt", s.nt);
    }
  };
}

// template: Interactive Computer Assembly Sequence — https://codepen.io/karlhorning/pen/OJqNMVR
// A concept assembled from its parts: the term on top, its components slide in and lock underneath.
function F_DEFINE(cfg) {
  const parts = cfg.parts, n = parts.length, slot = Math.min(98, 384 / n), w = slot - 10;
  const X = parts.map((_, i) => r1(200 + (i - (n - 1) / 2) * slot));
  const col = NC[cfg.c || "N"];
  return {
    bench: "Interactive Computer Assembly Sequence — https://codepen.io/karlhorning/pen/OJqNMVR",
    draw(f) {
      const tw0 = Math.min(372, tw(cfg.term, 17) + 40);
      let s = f.K("term", R(200 - tw0 / 2, 26, tw0, 44, col, 22) + ICO(cfg.icon || "doc", 200 - tw0 / 2 + 24, 48, 0.62, C.white) + T(200 + 12, 54, cfg.term, 17, C.white));
      parts.forEach((p, i) => {
        const pc = NC[p[3] || "N"];
        s += f.D("ln" + i, `M200 70 C200 100 ${X[i]} 104 ${X[i]} 132`, pc, 2.5);
        s += f.H("hr" + i, R(X[i] - w / 2 - 5, 129, w + 10, 112, "none", 14, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
        s += f.K("p" + i, R(X[i] - w / 2, 134, w, 102, C.white, 12, `stroke="${pc}" stroke-width="2.5"`) + R(X[i] - w / 2, 134, w, 7, pc, 3) + ICO(p[2], X[i], 166, 0.9, pc) + TF(X[i], 206, p[0], 13, w - 8) + TF(X[i], 222, p[1] || "", 13, w - 8));
      });
      s += f.N("nt", 200, 266, 13); s += f.N("n2", 200, 102, 12);
      return s;
    },
    render(c, s) {
      const k = s.n == null ? n : s.n;
      c.mv("term", { s: s.pop ? 1.05 : 1 });
      for (let i = 0; i < n; i++) {
        c.op("p" + i, i < k ? (s.hl != null && s.hl !== i ? 0.4 : 1) : 0, { dl: 0.12 * i });
        c.mv("p" + i, { y: i < k ? 0 : 50, s: s.hl === i ? 1.06 : 1 }, { dl: 0.12 * i });
        c.dr("ln" + i, i < k ? 1 : 0, { dl: 0.12 * i + 0.2 }); c.op("hr" + i, s.hl === i ? 1 : 0);
      }
      c.note("nt", s.nt); c.note("n2", s.n2);
    }
  };
}

// template: Sankey animation - acyclic graph — https://observablehq.com/@joaormendes/sankey-animation-acyclic-graph
// Several influences flowing into one result: a single cause cannot claim the whole outcome.
function F_SANKEY(cfg) {
  const src = cfg.src, Ys = src.map((_, i) => 64 + i * 56), OX = 318, OY = 150;
  return {
    bench: "Sankey animation - acyclic graph — https://observablehq.com/@joaormendes/sankey-animation-acyclic-graph",
    draw(f) {
      let s = "";
      src.forEach((sr, i) => {
        const col = NC[sr[2] || "N"];
        s += f.D("fl" + i, `M150 ${Ys[i]} C230 ${Ys[i]} 220 ${OY + (i - (src.length - 1) / 2) * 12} ${OX - 46} ${OY + (i - (src.length - 1) / 2) * 12}`, col, sr[1], 'stroke-linecap="butt" opacity=".55"');
        s += f.K("s" + i, R(12, Ys[i] - 21, 138, 42, C.white, 10, `stroke="${col}" stroke-width="2.5"`) + ICO(sr[3] || "gear", 32, Ys[i], 0.55, col) + TF(48, Ys[i] + 5, sr[0], 13, 96, C.ink, "start"));
        s += f.H("q" + i, ICO("q", 210, Ys[i] + (OY - Ys[i]) * 0.4, 0.7));
      });
      s += f.K("out", O(OX, OY, 48, C.white, `stroke="${C.coral}" stroke-width="4"`) + ICO(cfg.icon || "growth", OX, OY - 8, 1.1, C.coral) + T(OX, OY + 30, cfg.out, 12, C.coral));
      s += f.N("ttl", 200, 22, 14); s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      const n = s.show == null ? src.length : s.show;
      src.forEach((_, i) => {
        c.op("s" + i, i < n ? (s.hl != null && s.hl !== i ? 0.45 : 1) : 0, { dl: 0.12 * i });
        c.dr("fl" + i, i < n ? 1 : 0, { dl: 0.2 + 0.12 * i });
        c.op("q" + i, s.q === i ? 1 : 0, { dl: 0.5 });
      });
      c.mv("out", { s: s.pop ? 1.08 : 1 });
      c.note("ttl", s.ttl ? { t: s.ttl, c: "N", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: Celonis Process Explorer map — https://help.celonis.com/cpm47/en/process-explorer
// Local optimisation: one department hits its target in the spotlight while the connected parts turn red.
function F_SPOT(cfg) {
  const P4 = [[78, 64], [322, 64], [78, 236], [322, 236]];
  return {
    bench: "Celonis Process Explorer map — https://help.celonis.com/cpm47/en/process-explorer",
    draw(f) {
      let s = R(0, 0, 400, 300, "#22344a");
      s += f.H("cone", F("M170 -10 H230 L292 196 H108 Z", "rgba(255,240,180,.22)"));
      P4.forEach((p, i) => { s += f.K("ln" + i, P(`M200 150 L${p[0]} ${p[1]}`, C.muted, 3, 'stroke-dasharray="6 6" class="a-flow"')); });
      s += f.H("rp", `<g class="a-pulse">${O(200, 150, 92, "none", `stroke="${C.red}" stroke-width="3" opacity=".7"`)}</g>`);
      s += f.K("ctr", R(132, 118, 136, 64, C.white, 14, `stroke="${C.teal}" stroke-width="3"`) + ICO(cfg.center[1], 160, 150, 0.8, C.teal) + T(214, 156, cfg.center[0], 14, C.ink));
      s += f.H("met", chip(200, 202, "Target met", { st: C.green, bg: C.green, fg: C.white, sz: 13, free: 1 }));
      cfg.around.forEach((a, i) => {
        const p = P4[i];
        s += f.K("o" + i, R(p[0] - 70, p[1] - 26, 140, 52, C.white, 12, `stroke="${C.navy2}" stroke-width="2.5"`) + ICO(a[1], p[0] - 50, p[1], 0.6, C.navy2) + TF(p[0] + 12, p[1] + 5, a[0], 13, 104));
        s += f.H("b" + i, R(p[0] - 70, p[1] - 26, 140, 52, "rgba(192,57,43,.2)", 12, `stroke="${C.red}" stroke-width="3"`) + ICO("warn", p[0] + 62, p[1] - 24, 0.6));
      });
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      c.op("cone", s.spot ? 1 : 0); c.op("met", s.met ? 1 : 0, { dl: 0.3 }); c.op("rp", s.rp ? 1 : 0);
      for (let i = 0; i < 4; i++) {
        c.op("o" + i, s.dim ? 0.35 : 1); c.op("b" + i, has(s.bad, i) ? 1 : 0, { dl: 0.2 + 0.2 * i });
        c.sk("ln" + i, has(s.bad, i) ? C.red : C.muted);
      }
      c.note("nt", s.nt);
    }
  };
}

// template: Roadmap / Project schedule — https://lottiefiles.com/free-animation/roadmapproject-schedule-krKjaLHUr0
// The assessed forum week: post by mid-week, reply to two peers (one disagreement), read the summary.
function F_FORUM() {
  const DX = [40, 93, 147, 200, 253, 307, 360], DN = ["M", "T", "W", "T", "F", "S", "S"];
  return {
    bench: "Roadmap / Project schedule — https://lottiefiles.com/free-animation/roadmapproject-schedule-krKjaLHUr0",
    draw(f) {
      let s = P("M40 34 H360", C.line, 4) + DX.map((x, i) => O(x, 34, 8, C.white, `stroke="${C.navy2}" stroke-width="2.5"`) + T(x, 16, DN[i], 12, C.slate)).join("");
      s += f.H("mid", ICO("flag", 200, 30, 0.75) + chip(200, 60, "Post by mid-week", { st: C.coral, sz: 11, free: 1 }));
      s += f.K("day", O(40, 34, 11, C.coral, `stroke="${C.white}" stroke-width="3"`));
      s += f.H("post", R(12, 80, 176, 88, C.white, 12, `stroke="${C.navy}" stroke-width="2.5"`) + ICO("person", 36, 104, 0.8, C.navy) + T(56, 109, "Your position", 13, C.ink, "", "start") + P("M28 132 H170 M28 146 H150", C.line, 5));
      s += f.H("ev", chip(100, 178, "Concepts + evidence", { st: C.teal, sz: 11, free: 1 }));
      for (let i = 0; i < 2; i++) {
        const y = 80 + i * 78;
        s += f.H("p" + i, R(212, y, 176, 62, C.white, 12, `stroke="${C.slate}" stroke-width="2"`) + ICO("person", 234, y + 22, 0.7, [C.plum, C.gold][i]) + T(252, y + 27, "Peer " + (i + 1), 13, C.ink, "", "start") + P(`M228 ${y + 46} H368`, C.line, 5));
        s += f.D("r" + i, `M188 ${124} C200 ${124} 200 ${y + 31} 210 ${y + 31}`, C.teal, 3);
      }
      s += f.H("dis", chip(330, 228, "Reasoned disagreement", { st: C.red, sz: 11 }));
      s += f.H("sum", R(12, 200, 176, 56, C.cream, 12, `stroke="${C.gold}" stroke-width="2.5"`) + ICO("doc", 34, 228, 0.7, C.amber) + T(54, 225, "Facilitator", 13, C.ink, "", "start") + T(54, 242, "summary", 13, C.ink, "", "start"));
      s += f.H("pct", O(336, 268, 25, C.coral) + T(336, 274, "15%", 16, C.white));
      s += f.H("lo", chip(244, 262, "K1 · K2 · S1", { st: C.plum, sz: 12, free: 1 }));
      s += f.N("nt", 200, 288, 12);
      return s;
    },
    render(c, s) {
      const d = s.day == null ? 0 : s.day;
      c.mv("day", { x: DX[clamp(d, 0, 6)] - 40 }, { d: 1 });
      c.op("mid", s.mid ? 1 : 0); c.op("post", s.post ? 1 : 0); c.op("ev", s.ev ? 1 : 0, { dl: 0.3 });
      for (let i = 0; i < 2; i++) { c.op("p" + i, (s.peers || 0) > i ? 1 : 0, { dl: 0.15 * i }); c.dr("r" + i, (s.rep || 0) > i ? 1 : 0, { dl: 0.3 + 0.2 * i }); }
      c.op("dis", s.dis ? 1 : 0, { dl: 0.5 }); c.op("sum", s.sum ? 1 : 0); c.op("pct", s.pct ? 1 : 0); c.op("lo", s.lo ? 1 : 0, { dl: 0.2 });
      c.note("nt", s.nt);
    }
  };
}

// template: Success — https://lottiefiles.com/free-animation/success-he8DVHwbzM
// Delivery versus benefit: the change is installed (tick) but the benefit meter needs evidence, with owners for each.
function F_BENEFIT(cfg = {}) {
  return {
    bench: "Success — https://lottiefiles.com/free-animation/success-he8DVHwbzM",
    draw(f) {
      let s = R(26, 64, 140, 122, C.white, 14, `stroke="${C.navy2}" stroke-width="2.5"`) + ICO("gear", 96, 112, 1.3, C.navy2) + T(96, 168, cfg.left || "Delivered", 15, C.navy2);
      s += f.H("dk", ICO("check", 150, 72, 0.9));
      s += f.D("ar", "M172 126 H226", C.slate, 4); s += f.H("ah", arrowHead(232, 126, 0, C.slate));
      s += f.H("mg", ICO("mag", 200, 100, 0.8, C.ink));
      s += R(262, 40, 44, 160, C.white, 22, `stroke="${C.green}" stroke-width="3"`) + O(284, 206, 24, C.white, `stroke="${C.green}" stroke-width="3"`);
      s += f.K("mf", R(270, 48, 28, 148, C.green, 14), `data-pv="284 196"`) + O(284, 206, 18, C.green);
      s += f.H("mq", T(284, 132, "?", 40, C.coral, 'class="a-pulse"'));
      s += T(284, 26, cfg.right || "Benefit", 15, C.green);
      s += f.H("m2", R(334, 70, 30, 120, C.white, 15, `stroke="${C.red}" stroke-width="2.5"`) + R(340, 146, 18, 38, C.red, 9) + T(349, 58, cfg.m2 || "Rating", 12, C.red) + P("M372 120 V160", C.red, 3) + arrowHead(372, 166, 90, C.red));
      s += f.N("ol", 96, 220, 12); s += f.N("or", 284, 252, 12);
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      c.op("dk", s.done ? 1 : 0); c.dr("ar", s.ar ? 1 : 0); c.op("ah", s.ar ? 1 : 0, { dl: 0.6 }); c.op("mg", s.mg ? 1 : 0);
      c.mv("mf", { sy: Math.max(0.02, s.meter || 0), pv: [284, 196] }, { d: 1.2 });
      c.op("mq", s.q ? 1 : 0); c.op("m2", s.m2 ? 1 : 0);
      c.note("ol", s.own ? { t: cfg.lo || "Programme manager", c: "N" } : null); c.note("or", s.own ? { t: cfg.ro || "Line owner", c: "G", f: 1 } : null, { dl: 0.2 });
      c.note("nt", s.nt);
    }
  };
}

// =====================================================================
// W5O3a · Efficiency without strategic alignment (30 narration lines)
// Story: finance cuts peak reception staff -> it fits the cost objective but
// threatens service -> efficiency vs effectiveness -> labour cost falls,
// queues grow -> two accurate reports -> local optimisation spreads harm to
// corporate confidence and growth -> compare cutting guest-facing capacity
// with removing admin work -> efficiency must serve strategy.
// =====================================================================
{
  const id = "W5O3a";
  const RS = "Reduce reception staff";
  const plan = [
    ["title", { k: "Week 5 · Lesson 3", t1: "Efficiency without", t2: "strategic alignment", sub: "Cheaper can mean further away", sc: "R" }, "Efficiency without alignment"],
    ["obj", { show: 3, prop: "Savings delivered", links: [2, 3, 0], sign: [-1, 1, 0], wl: ["Further away?", "On target", ""], rk: [0] }, "Promised savings, wrong direction?"],
    ["ask", { q: "Can a process improvement succeed operationally while failing strategically?", o: ["Operational success", "Strategic failure"], oc: ["G", "R"] }, "Investigate before scoping"],
    ["desk", { n: 5, staff: 3, wait: "8 min", stars: 4, nt: "Peak arrivals: three staff" }, "Finance proposes fewer staff"],
    ["desk", { n: 5, staff: 1, wait: "8 min", stars: 4, cost: "Labour −30%", cc: "G", nt: { t: "Fewer staff at peaks", c: "A" } }, "Expected: lower labour cost"],
    ["obj", { show: 3, prop: RS, links: [0, 3, 0], sign: [0, 1, 0], wl: ["", "Supports", ""], ok: [1] }, "It fits the cost objective"],
    ["obj", { show: 3, prop: RS, links: [3, 3, 0], sign: [-1, 1, 0], wl: ["At risk", "Supports", ""], ok: [1], rk: [0], hl: 0 }, "But service leadership matters"],
    ["vs", { show: "a", va: "ok" }, "Efficiency: fewer resources"],
    ["vs", { show: "ab", va: "ok" }, "Effectiveness: the intended result"],
    ["vs", { show: "ab", va: "ok", vb: "x", nt: { t: "One can improve without the other", c: "R" } }, "Saving is not a better outcome"],
    ["cons", { up: 2, dr: 1, at: 1, good: [1], ttl: "The saving succeeds" }, "Labour costs fall"],
    ["cons", { up: 4, dr: 3, at: 3, good: [1], bad: [2, 3], ttl: "The unintended consequence" }, "Queues lengthen, problems linger"],
    ["gauge", { val: [0.8, -0.6, -0.7], txt: ["−30%", "16 min", "2.8 / 5"], warn: [1, 2], ttl: "Two accurate reports" }, "Finance celebrates, guests complain"],
    ["ask", { q: "Which result should Qasr celebrate when financial efficiency improves but guest experience deteriorates?", o: ["Saving achieved", "Experience worse"], oc: ["G", "R"] }, "Interpretation matters most"],
    ["spot", { spot: 1, met: 1, nt: "Improving one activity" }, "Local optimisation"],
    ["spot", { spot: 1, met: 1, rp: 1, bad: [0, 1], nt: { t: "Problems pushed elsewhere", c: "R" } }, "Target met, others suffer"],
    ["wider", { up: 3, dr: 2, at: 2, good: [0], bad: [1, 2], ttl: "Consequences beyond reception" }, "Corporate travellers lose confidence"],
    ["wider", { up: 4, dr: 3, at: 3, good: [0], bad: [1, 2, 3], nt: { t: "Growth target: +25% accounts", c: "O" } }, "The growth objective is at risk"],
    ["gauge", { val: [0, 0, 0], txt: ["?", "?", "?"], ttl: "Investigate first", nt: "Possible, not inevitable" }, "Check before approving"],
    ["gauge", { val: [0.6, -0.3, -0.2], txt: ["−18%", "11 min", "3.9 / 5"], ttl: "Evidence to examine", nt: "Plus employee workload" }, "Waits, feedback, workload, savings"],
    ["gauge", { val: [0.6, -0.3, -0.2], txt: ["−18%", "11 min", "3.9 / 5"], warn: [1], ttl: "Compatible with strategy?", nt: { t: "Judge against all objectives", c: "P" } }, "Compatible with other commitments?"],
    ["vs2", { show: "b", ib: 1, vb: "ok" }, "Alternative: remove admin work"],
    ["vs2", { show: "ab", va: "x", vb: "ok" }, "Savings that keep personal attention"],
    ["vs2", { show: "ab", va: "x", vb: "ok", nt: "Not every cut is equivalent" }, "Compare the approaches"],
    ["obj", { show: 3, prop: "Boundaries set first", links: [3, 3, 3], sign: [1, 1, 1], wl: ["Protect", "Pursue", "Protect"], nt: "Before detailed redesign" }, "Strategy sets the boundaries"],
    ["obj", { show: 3, prop: "Attractive saving", links: [3, 3, 0], sign: [-1, 1, 0], wl: ["Conflict", "Measurable", ""], rk: [0], nt: { t: "Measurable is not approved", c: "R" } }, "Spot the conflict early"],
    ["desk", { n: 2, staff: 2, wait: "6 min", stars: 4, cost: "Cost goal −10%", cc: "A", nt: { t: "Responsible savings matter", c: "G" } }, "Efficiency is still valuable"],
    ["obj", { show: 3, prop: "Efficiency serving strategy", links: [2, 3, 2], sign: [1, 1, 1], wl: ["Kept", "Saves", "Kept"], ok: [0, 1, 2] }, "Efficiency must serve strategy"],
    ["vs", { show: "ab", va: "w", vb: "w", nt: { t: "Which trade-offs will you accept?", c: "P" } }, "Decide acceptable trade-offs"],
    ["ask", { q: "Can you explain why a financially successful process change might still represent a strategic failure?", o: ["Isolated activity", "Whole organisation"], oc: ["R", "G"] }, "Optimise the whole, not a part"]
  ];
  window.VL_SCENES["W5O3a"] = makeScene({
    id, bg: "#f5eeea", plan,
    desc: "Cutting peak reception staff lowers labour cost but lengthens queues and weakens arrivals; local optimisation spreads harm to corporate confidence and growth, while removing admin work saves without losing service.",
    fams: {
      title: F_TITLE({ icon: "costdown", col: C.red }), // template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
      obj: F_OBJ(), // template: Infographics Pack by ARstudio — https://motionarray.com/after-effects-templates/infographics-pack-135055/
      ask: F_ASK(), // template: Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD
      desk: F_DESK({ sign: "Qasr Marina" }), // template: Waiting Queue — https://lottiefiles.com/free-animation/waiting-queue-xoNutPl764
      vs: F_VS({ a: { t: "Operational efficiency", icon: "gear", c: "A", items: ["Fewer staff hours", "Lower expenditure", "Same output"] }, b: { t: "Strategic effectiveness", icon: "target", c: "T", items: ["Dependable arrival", "Welcoming service", "Objectives achieved"] } }), // template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
      cons: F_CHAIN({ nodes: [["Fewer", "reception staff", "people", "A"], ["Lower", "labour cost", "coin", "A"], ["Longer", "guest queues", "clock"], ["Weaker arrival", "experience", "guest"]] }), // template: Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO
      gauge: F_GAUGE({ g: [["Labour cost", "A"], ["Waiting time", "T"], ["Guest feedback", "O"]] }), // template: Animated Dashboards — https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ
      spot: F_SPOT({ center: ["Reception", "bell"], around: [["Guest relations", "chat"], ["Corporate accounts", "handshake"], ["Service rating", "star"], ["Repeat business", "growth"]] }), // template: Celonis Process Explorer map — https://help.celonis.com/cpm47/en/process-explorer
      wider: BENCH(F_CHAIN({ nodes: [["Reception", "cost saving", "coin", "G"], ["Arrival", "reliability", "clock"], ["Corporate guest", "confidence", "handshake"], ["Growth", "at risk", "growth", "O"]] }), "Celonis Process Animation update — https://community.celonis.com/product-updates/what-s-new-in-the-celonis-platform-5560"), // template: Celonis Process Animation update — https://community.celonis.com/product-updates/what-s-new-in-the-celonis-platform-5560
      vs2: BENCH(F_VS({ a: { t: "Cut guest-facing staff", icon: "people", c: "R", items: ["Labour savings", "Longer waits", "Less personal"] }, b: { t: "Remove admin work", icon: "doc", c: "G", items: ["Efficiency gains", "Staff free for guests", "Service kept"] } }), "Interactive AI Customer Support vs Old Way — https://lottiefiles.com/free-animation/interactive-ai-optimised-customer-support-vs-old-way-yKSecPTuwL") // template: Interactive AI Customer Support vs Old Way — https://lottiefiles.com/free-animation/interactive-ai-optimised-customer-support-vs-old-way-yKSecPTuwL
    }
  });
}


// =====================================================================
// W5O3b · Competing objectives and explicit trade-offs (29 narration lines)
// Story: express check-in for corporate travellers vs waiting for others ->
// a trade-off defined -> a service safeguard with sponsor approval ->
// dedicated vs flexible capacity -> funding two means forgoing two
// (opportunity cost) -> benefit, sacrifice, boundary, sponsor decision ->
// unmanaged conflict vs explicit trade-off.
// =====================================================================
{
  const id = "W5O3b";
  const plan = [
    ["title", { k: "Week 5 · Lesson 3", t1: "Competing objectives,", t2: "explicit trade-offs", sub: "Name the sacrifice, own the choice", sc: "P" }, "Competing objectives, explicit trade-offs"],
    ["scale", { t: 0, nl: 0, nr: 0, ttl: "What will Qasr sacrifice?" }, "Recognising is easier than choosing"],
    ["ask", { q: "What should Qasr do when two desirable strategic outcomes cannot both be maximised?", o: ["Corporate growth", "Service rating"], oc: ["O", "T"] }, "Two goods, one reception"],
    ["desk", { n: 4, staff: 3, wait: "10 min", exp: 1, nt: "Express lane for corporate guests" }, "Express corporate check-in"],
    ["desk", { n: 6, staff: 2, wait: "16 min", exp: 1, mood: "sad", alerts: ["Corporate: fast", "Others: wait"], acs: ["G", "R"] }, "Other guests may wait longer"],
    ["scale", { t: 0, nl: 2, nr: 2, ttl: "Both concerns are legitimate" }, "Growth and service both count"],
    ["define", { n: 3 }, "A trade-off: gain here, cost there"],
    ["scale", { t: -0.5, nl: 2, nr: 2, ttl: "Neither becomes irrelevant", mid: "Service still counts" }, "Emphasis does not erase an objective"],
    ["express", { up: 4, dr: 3, at: 3, bad: [3], ttl: "The express check-in trade-off" }, "What improves, what may worsen"],
    ["express", { up: 4, dr: 3, hl: 0, dim: 1, nt: "Tight business schedules" }, "Corporate guests need predictability"],
    ["ask", { q: "How much inconvenience for other guests would be acceptable, and who should authorise that decision?", o: ["How much?", "Who decides?"], oc: ["A", "P"] }, "Growth does not justify poor service"],
    ["scale", { t: -0.2, nl: 2, nr: 2, guard: "Service safeguard", ttl: "A condition to respect", mid: "Pursue growth within limits" }, "A service safeguard"],
    ["desk", { n: 4, staff: 3, wait: "9 min", exp: 1, alerts: ["All groups ≤ 10 min"], acs: ["G"], af: 1, nt: "Not corporate averages alone" }, "Acceptable waits for every group"],
    ["scale", { t: 0, nl: 2, nr: 2, guard: "Needs sponsor approval", ttl: "Evidence first", mid: "Staffing, arrival patterns, expectations" }, "Evidence and sponsor approval"],
    ["vs", { show: "a", va: "w" }, "Dedicated corporate capacity"],
    ["vs", { show: "ab", va: "w", vb: "ok", nt: "Design can shrink conflicts" }, "Better design may reduce conflict"],
    ["scale", { t: -0.4, nl: 2, nr: 2, ttl: "Limits remain", mid: { t: "Money, staff and time are finite", c: "R" } }, "Not every conflict disappears"],
    ["budget", { fund: [0, 2], def: [1, 3], nt: { t: "Funding two postpones two", c: "A" } }, "The unavoidable sacrifice"],
    ["budget", { fund: [0, 2], def: [1, 3], vk: ["", "Lower costs", "", "Spa experience"], nt: "Benefits given up" }, "What stock and spa offered"],
    ["budget", { fund: [0, 2], def: [1, 3], vk: ["", "Forgone", "", "Forgone"], hl: 1, nt: { t: "Opportunity cost", c: "P" } }, "Opportunity cost: the alternative lost"],
    ["budget", { fund: [0, 2], def: [1, 3], vk: ["", "Not worthless", "", "Not worthless"], nt: "Say what you give up" }, "Rejected is not worthless"],
    ["explicit", { up: 2, dr: 1, ttl: "Making a trade-off explicit", nt: "Deliberate, not unforeseen" }, "Deliberate sacrifice, not surprise"],
    ["explicit", { up: 4, dr: 3, at: 3, good: [3], nt: "Why this balance serves priorities" }, "A reasoned, recorded balance"],
    ["vs2", { show: "a", va: "x" }, "Unmanaged: consequences emerge later"],
    ["vs2", { show: "ab", va: "x", vb: "ok", nt: { t: "Vital under pressure for quick wins", c: "A" } }, "Explicit: acknowledged and recorded"],
    ["explicit", { up: 4, dr: 3, hl: 1, dim: 1, nt: { t: "Ratings can't size acceptable harm", c: "R" } }, "Ratings cannot decide the sacrifice"],
    ["explicit", { up: 4, dr: 3, hl: 3, dim: 1, nt: "Authorised sponsors judge" }, "Judgement belongs to sponsors"],
    ["explicit", { up: 4, dr: 3, at: 3, good: [0, 3], nt: "Each sponsor states both" }, "State the benefit and the accepted cost"],
    ["ask", { q: "Can you defend a strategic trade-off by explaining its benefit, sacrifice, safeguard, and accountable decision-maker?", o: ["Benefit", "Sacrifice", "Safeguard", "Decision-maker"], oc: ["G", "R", "T", "P"] }, "Benefit, sacrifice, safeguard, owner"]
  ];
  window.VL_SCENES["W5O3b"] = makeScene({
    id, bg: "#f1eef6", plan,
    desc: "Express check-in for corporate travellers is weighed against waiting for other guests: a service safeguard, flexible capacity, the opportunity cost of deferring two proposals, and an explicit, sponsor-owned trade-off.",
    fams: {
      title: F_TITLE({ icon: "scale", col: C.plum }), // template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
      scale: F_SCALE({ L: { t: "Corporate growth", c: "O", items: ["Predictable arrivals", "Business loyalty"] }, R: { t: "Service for all", c: "T", items: ["Fair waiting", "Every guest valued"] } }), // template: Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p
      ask: F_ASK(), // template: Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD
      desk: F_DESK({ sign: "Qasr Marina" }), // template: Waiting Queue — https://lottiefiles.com/free-animation/waiting-queue-xoNutPl764
      define: F_DEFINE({ term: "Strategic trade-off", icon: "scale", c: "P", parts: [["Gain one", "valued outcome", "growth", "G"], ["Accept a", "cost or risk", "warn", "R"], ["Choose", "deliberately", "gavel", "P"]] }), // template: Interactive Computer Assembly Sequence — https://codepen.io/karlhorning/pen/OJqNMVR
      express: F_CHAIN({ nodes: [["Corporate", "priority", "handshake", "O"], ["Faster business", "arrivals", "clock", "G"], ["Shared reception", "capacity", "bell"], ["Other guests", "wait longer", "guest"]] }), // template: Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO
      vs: F_VS({ a: { t: "Dedicated capacity", icon: "lock", c: "A", items: ["Reliable for business", "Less flexible"] }, b: { t: "Flexible capacity", icon: "people", c: "T", items: ["Follows demand", "Service for all groups"] } }), // template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
      budget: F_BUDGET(), // template: Payment Successful — https://lottiefiles.com/free-animation/payment-successful-5uXFkB4jix
      explicit: BENCH(F_CHAIN({ nodes: [["Expected", "benefit", "growth", "G"], ["Possible", "sacrifice", "warn", "R"], ["Acceptable", "boundary", "fence", "T"], ["Sponsor", "decision", "gavel", "P"]] }), "Modern Process Infographic Steps Animation Template — https://elements.envato.com/steps-infographic-BUNKM3A"), // template: Modern Process Infographic Steps Animation Template — https://elements.envato.com/steps-infographic-BUNKM3A
      vs2: BENCH(F_VS({ a: { t: "Unmanaged conflict", icon: "warn", c: "R", items: ["Separate targets", "Surprise consequences", "No agreed limits"] }, b: { t: "Explicit trade-off", icon: "scale", c: "G", items: ["Outcomes named", "Safeguards set", "Rationale recorded"] } }), "Infographic Chart Creator — https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/") // template: Infographic Chart Creator — https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/
    }
  });
}


// =====================================================================
// W5O3c · Sponsors, decision rights and strategic scope (30 narration lines)
// Story: the arrival redesign reaches reservations and corporate arrivals ->
// reception vs corporate sales -> governance tiers and the sponsor's role ->
// budget authority is not strategic priority -> operational vs strategic
// decisions -> narrow, broader, too broad scope -> escalation up the tiers
// -> the decision is recorded and becomes a mandate.
// =====================================================================
{
  const id = "W5O3c";
  const plan = [
    ["title", { k: "Week 5 · Lesson 3", t1: "Sponsors, decision", t2: "rights and scope", sub: "Who may decide what" }, "Sponsors, decision rights, scope"],
    ["ladder", { show: 4, nt: { t: "Will priorities survive delivery?", c: "P" } }, "Trade-offs need an authoriser"],
    ["scope", { box: "n", hl: 4, w: [0, 1], bl: "Arrival team's redesign", nt: { t: "Also needs reception staffing", c: "R" } }, "The redesign reaches other teams"],
    ["board", { on: [0, 1], spk: 0, say: ["Our responsibility"], nt: "Reception wants to proceed" }, "Reception wants to go ahead"],
    ["board", { on: [0, 1], spk: 1, also: [0], say: ["Our responsibility", "Our client promises"], tug: 1, nt: { t: "A decision-rights conflict", c: "R" } }, "Corporate sales objects"],
    ["board", { on: [0, 1], also: [0, 1], say: ["Legitimate", "Legitimate"], nt: "Neither should decide alone" }, "Neither may settle strategy alone"],
    ["define", { n: 3 }, "Governance: authority and accountability"],
    ["ladder", { show: 4, hl: 0, tags: { 0: { t: "Gives authority", c: "P" } } }, "A sponsor provides authority"],
    ["ladder", { show: 4, tags: { 0: "Sets direction", 1: "Coordinates", 2: "Own processes", 3: "Deliver change" } }, "Changes cross department lines"],
    ["ladder", { show: 4, hl: 0, dim: 1, tags: { 0: { t: "Keeps priorities", c: "P" } } }, "Keep choices on strategy"],
    ["ladder", { show: 4, hl: 0, dim: 1, tags: { 0: { t: "Own dept first?", c: "R" } }, nt: { t: "Sponsorship is not self-interest", c: "R" } }, "Not for the sponsor's own benefit"],
    ["scale", { t: -0.5, ttl: "Remember the spa proposal" }, "The spa director holds the budget"],
    ["scale", { t: 0, guard: "Evidence + justification", ttl: "Two different things", mid: { t: "Money does not set priority", c: "P" } }, "Budget authority is not priority"],
    ["vs", { show: "ab", ia: 0, ib: 0, nt: "Who decides which choices?" }, "Decision rights"],
    ["vs", { show: "a", va: "ok" }, "Owners adjust within scope"],
    ["vs", { show: "ab", va: "ok", vb: "ok" }, "Strategic changes need sponsors"],
    ["vs", { show: "ab", hl: "b", nt: { t: "Not just a technical fix", c: "R" } }, "Teams must not decide strategy"],
    ["ask", { q: "How far should the guest arrival team be allowed to change Qasr's operations?", o: ["Reception only", "Plus reservations", "Whole arrival journey"], oc: ["T", "N", "P"] }, "Strategic scope: boundaries and outcomes"],
    ["scope", { box: "f", bl: "Broader: four processes", nt: "Narrow = reception procedures only" }, "Narrow or broader scope"],
    ["scope", { box: "f", nt: "Depends on intended outcomes" }, "No boundary is always better"],
    ["scope", { box: "n", hl: 4, w: [0, 1, 3], bl: "Too narrow", nt: { t: "Causes lie outside reception", c: "R" } }, "Too narrow misses the causes"],
    ["scope", { box: "b", x: [7, 8], bl: "Too broad", nt: { t: "Unrelated changes, lost focus", c: "R" } }, "Too broad wastes resources"],
    ["scope", { box: "f", x: [2, 5, 6, 7, 8], dep: 1, bl: "In · out · dependencies", nt: "Renewed approval if it changes" }, "Define in, out and dependencies"],
    ["esc", { up: 4, dr: 3, at: 3, ttl: "Escalating a strategic conflict" }, "Escalate beyond delegated authority"],
    ["ladder", { show: 4, hl: 3, esc: 0.3, tags: { 3: { t: "Needs more staff", c: "R" } }, nt: { t: "Exceeds the agreed budget", c: "R" } }, "Faster corporate arrivals cost more"],
    ["ladder", { show: 4, hl: 2, esc: 0.65, tags: { 3: { t: "Over budget", c: "R" }, 2: { t: "Evidence, options", c: "T" } } }, "Escalate, don't exceed authority"],
    ["ladder", { show: 4, hl: 0, esc: 1, tags: { 0: { t: "Revise or reject", c: "P" } }, stamp: "Decided" }, "The sponsor decides"],
    ["doc", { rows: 4, ok: "all", stamp: "A", nt: "Later teams know the limits" }, "Record the decision and its limits"],
    ["doc", { rows: 4, ok: "all", ho: 1, sp: 1, nt: "Choices become a mandate" }, "Towards an explicit mandate"],
    ["ask", { q: "Can you distinguish who may recommend a change, who may approve it, and what the programme is authorised to change?", o: ["Recommend", "Approve", "Scope"], oc: ["T", "P", "N"] }, "Recommend, approve, scope"]
  ];
  window.VL_SCENES["W5O3c"] = makeScene({
    id, bg: "#eef0f5", plan,
    desc: "Governance at Qasr: reception and corporate sales clash, a sponsor holds strategic authority, budget control is not priority, scope is set neither too narrow nor too broad, and conflicts escalate to an authorised, recorded decision.",
    fams: {
      title: F_TITLE({ icon: "sponsor", col: C.plum }), // template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
      ladder: F_LADDER({ tiers: [["Sponsor · steering group", "sponsor", "P"], ["Programme director", "person", "N"], ["Process owners", "people", "T"], ["Delivery teams", "gear", "S"]] }), // template: Hierarchy traversal animated — https://old.observablehq.com/@d3/hierarchy-traversal-animated
      scope: F_SCOPE({ tiles: [["Reservations", "calendar"], ["Corporate|arrivals", "handshake"], ["Contracts", "doc"], ["Housekeeping", "bed"], ["Reception", "bell"], ["Billing", "invoice"], ["Finance", "coin"], ["Spa", "spa"], ["IT systems", "gear"]] }), // template: Animated treemap — https://observablehq.com/@d3/animated-treemap
      board: F_BOARD({ who: [["Reception", "T"], ["Corporate sales", "O"], ["Programme", "N"], ["Sponsor", "P"]] }), // template: Business Analytics Meeting — https://lottiefiles.com/free-animation/business-analytics-C1COKzrIkL
      define: F_DEFINE({ term: "Governance", icon: "gavel", c: "P", parts: [["Who", "recommends", "person", "T"], ["Who", "approves", "sponsor", "P"], ["Who is", "accountable", "target", "N"]] }), // template: Interactive Computer Assembly Sequence — https://codepen.io/karlhorning/pen/OJqNMVR
      scale: F_SCALE({ L: { t: "Budget authority", c: "P", items: ["Spa director", "Controls funds"] }, R: { t: "Strategic case", c: "G", items: ["Narrow alignment", "Moderate service"] } }), // template: Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p
      vs: F_VS({ a: { t: "Operational decision", icon: "gear", c: "T", items: ["Process owner", "Within approved scope", "Routine adjustment"] }, b: { t: "Strategic decision", icon: "gavel", c: "P", items: ["Sponsor or steering", "Priorities, investment", "Accepted risks"] } }), // template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
      ask: F_ASK(), // template: Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD
      esc: BENCH(F_CHAIN({ nodes: [["Process team", "finds conflict", "people"], ["Process owner", "assesses impact", "person"], ["Sponsor", "reviews trade-off", "sponsor", "P"], ["Authorised", "decision", "gavel", "G"]] }), "Approval Waiting — https://lottiefiles.com/free-animation/approval-waiting-5AHrbFareV"), // template: Approval Waiting — https://lottiefiles.com/free-animation/approval-waiting-5AHrbFareV
      doc: F_DOC({ title: "Decision record", rows: [["Decision taken", "gavel"], ["Rationale", "doc"], ["Authority used", "sponsor"], ["Scope limits", "fence"]] }) // template: contract process — https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8
    }
  });
}

})();
// END w05-claude-part3.js

// OPER621 · Week 5 · Organization Strategy · animated teaching scenes, version 1 (claude)
// File: w05-claude-part4.js · Sections: W5O4a, W5O4b, W5O4c
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }.
// step(i, n): one plan entry per narration line of the section (n = number of
// lines maps 1:1; any other n is mapped proportionally). Absolute states, so
// repeated, skipped and backward steps render the same picture.
// Each section uses 8-10 shot families (distinct pictures); every family names
// its benchmark template in a "// template: <name> — <url>" comment.
// Standalone: every helper is defined below; CSS goes once into
// <style id="vl-sc-w05">, all rules scoped under .vls-w05-<secId>.
// GSAP is used when window.gsap exists, CSS transitions otherwise;
// prefers-reduced-motion renders end states without animation.
(() => {
"use strict";
const PART = "p4";
// ===== shared engine (identical copy in every Week 5 part; each part runs standalone) =====
window.VL_SCENES = window.VL_SCENES || {};
const REG = window.VL_SCENES;
const C = {
  ink: "#1b2a3a", navy: "#1f4e79", navy2: "#2d6a9f", teal: "#178f80", gold: "#d39418", coral: "#de5a3a",
  red: "#c0392b", green: "#2e8b57", plum: "#7a5aa6", slate: "#5d7389", muted: "#a3b3c2", line: "#cfd8e0",
  paper: "#fffdf7", white: "#ffffff", sky: "#e8f1f8", sand: "#f5eddd", mint: "#e2f3eb", rose: "#fbe4dd",
  lilac: "#eee8f6", cream: "#fff4dc", night: "#16304d", amber: "#a8741a", skin: "#f0c9a6", wood: "#b9814f"
};
// Objective colours used all week: service = teal, cost = gold, corporate growth = coral.
const OC = [C.teal, C.gold, C.coral];
const OBJN = ["Service", "Cost", "Growth"];
const NC = { N: C.navy, R: C.red, G: C.green, O: C.coral, P: C.plum, T: C.teal, A: C.amber, S: C.slate };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const num = (v, f) => { const x = Number(v); return Number.isFinite(x) ? x : f; };
const RM = () => { try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; } };
const GS = () => (!RM() && window.gsap && typeof window.gsap.to === "function" && typeof window.gsap.set === "function") ? window.gsap : null;
const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");
const r1 = (v) => Math.round(v * 10) / 10;
const has = (arr, v) => Array.isArray(arr) && arr.indexOf(v) > -1;
const tw = (s, sz) => Math.round(String(s).length * sz * 0.58 + sz * 1.5);
function wrap(s, max) {
  const words = String(s || "").split(/\s+/).filter(Boolean), out = [];
  let cur = "";
  words.forEach((w) => { if (!cur) cur = w; else if ((cur + " " + w).length <= max) cur += " " + w; else { out.push(cur); cur = w; } });
  if (cur) out.push(cur);
  return out;
}

// ---- SVG string builders ----
const R = (x, y, w, h, f, rx = 0, ex = "") => `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${rx}" fill="${f}" ${ex}/>`;
const O = (cx, cy, r, f, ex = "") => `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}" fill="${f}" ${ex}/>`;
const E = (cx, cy, rx, ry, f, ex = "") => `<ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="${f}" ${ex}/>`;
const P = (d, s, w = 2, ex = "") => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const F = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
const T = (x, y, s, sz = 14, f = C.ink, ex = "", a = "middle") => `<text x="${r1(x)}" y="${r1(y)}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const G = (tr, body, ex = "") => `<g transform="${tr}" ${ex}>${body}</g>`;
// Text that shrinks (never below 9) so it fits the given width.
const fitSz = (s, max, wid) => Math.max(9, Math.min(max, Math.floor(10 * wid / Math.max(1, String(s).length * 0.58)) / 10));
const TF = (x, y, s, max, wid, f = C.ink, a = "middle") => T(x, y, s, fitSz(s, max, wid), f, "", a);
const chip = (x, y, s, o = {}) => {
  const sz = o.sz || 13, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.95);
  const cx = o.free ? x : clamp(x, w / 2 + 3, 397 - w / 2);
  return R(cx - w / 2, y - h / 2, w, h, o.bg || C.white, o.rx == null ? h / 2 : o.rx,
    `stroke="${o.st || C.navy}" stroke-width="${o.sw || 2}"${o.dash ? ' stroke-dasharray="5 4"' : ""}`) +
    T(cx, y + sz * 0.36, s, sz, o.fg || o.st || C.navy);
};
const arrowHead = (x, y, ang, col, s = 1) => {
  const a = ang * Math.PI / 180, l = 9 * s, w = 5.5 * s;
  const p1 = [x - Math.cos(a) * l + Math.sin(a) * w, y - Math.sin(a) * l - Math.cos(a) * w];
  const p2 = [x - Math.cos(a) * l - Math.sin(a) * w, y - Math.sin(a) * l + Math.cos(a) * w];
  return F(`M${r1(x)} ${r1(y)} L${r1(p1[0])} ${r1(p1[1])} L${r1(p2[0])} ${r1(p2[1])} Z`, col);
};

// ---- icon library (each icon fits a 40 x 40 box centred on 0,0) ----
function ICO(name, x, y, s = 1, col = C.navy) {
  const g = (b) => `<g transform="translate(${r1(x)} ${r1(y)}) scale(${s})">${b}</g>`;
  const W = C.white;
  switch (name) {
    case "star": return g(F("M0 -18 L5.3 -6.5 L17.8 -5.6 L8.3 2.6 L11.2 14.8 L0 8.3 L-11.2 14.8 L-8.3 2.6 L-17.8 -5.6 L-5.3 -6.5 Z", col));
    case "coin": return g(O(0, 0, 16, C.gold, `stroke="${C.amber}" stroke-width="2.5"`) + O(0, 0, 9.5, "none", `stroke="#fff1c7" stroke-width="2.2"`));
    case "costdown": return g(O(-5, -2, 13, C.gold, `stroke="${C.amber}" stroke-width="2.2"`) + O(-5, -2, 7, "none", `stroke="#fff1c7" stroke-width="2"`) + P("M12 -6 V14 M6 8 L12 15 L18 8", C.red, 3.5));
    case "growth": return g(R(-16, 4, 8, 12, col, 1.5) + R(-5, -3, 8, 19, col, 1.5) + R(6, -10, 8, 26, col, 1.5) + P("M-17 -6 L-4 -14 L4 -9 L16 -19", C.green, 3) + arrowHead(17, -19.5, -35, C.green));
    case "guest": return g(O(-4, -13, 6.5, col) + F("M-15 16 Q-15 -3 -4 -3 Q7 -3 7 16 Z", col) + R(8, 0, 11, 15, C.wood, 2) + P("M11 0 V-4 H16 V0", C.ink, 1.6));
    case "person": return g(O(0, -11, 7.5, col) + F("M-13 17 Q-13 -1 0 -1 Q13 -1 13 17 Z", col));
    case "sponsor": return g(O(0, -11, 7.5, col) + F("M-13 17 Q-13 -1 0 -1 Q13 -1 13 17 Z", col) + F("M0 3 L2.4 8 L7.6 8.4 L3.6 11.6 L5 16.6 L0 13.8 L-5 16.6 L-3.6 11.6 L-7.6 8.4 L-2.4 8 Z", C.gold));
    case "people": return g(O(-11, -7, 5.5, col, `opacity=".7"`) + F("M-21 14 Q-21 0 -11 0 Q-1 0 -1 14 Z", col, `opacity=".7"`) + O(11, -7, 5.5, col, `opacity=".7"`) + F("M1 14 Q1 0 11 0 Q21 0 21 14 Z", col, `opacity=".7"`) + O(0, -10, 6.5, col) + F("M-11 17 Q-11 0 0 0 Q11 0 11 17 Z", col));
    case "clock": return g(O(0, 0, 16, W, `stroke="${col}" stroke-width="3"`) + P("M0 -9 V0 L7 5", col, 3));
    case "bed": return g(R(-17, -2, 34, 10, col, 2) + R(-17, -12, 5, 24, col, 1.5) + R(-10, -9, 10, 7, "#dfe9f6", 2) + R(-17, 8, 4, 6, col) + R(13, 8, 4, 6, col));
    case "doc": return g(F("M-12 -17 H6 L13 -10 V17 H-12 Z", W, `stroke="${col}" stroke-width="2.5"`) + P("M-6 -6 H7 M-6 1 H7 M-6 8 H3", col, 2.2));
    case "gear": { let d = ""; for (let i = 0; i < 8; i++) { const a0 = i * Math.PI / 4, a1 = a0 + 0.3, a2 = a0 + 0.5, a3 = a0 + 0.78; const q = (a, r) => r1(Math.cos(a) * r) + " " + r1(Math.sin(a) * r); d += (i ? "L" : "M") + q(a0, 12) + " L" + q(a1, 17) + " L" + q(a2, 17) + " L" + q(a3, 12) + " "; } return g(F(d + "Z", col) + O(0, 0, 5, W)); }
    case "compass": return g(O(0, 0, 17, W, `stroke="${col}" stroke-width="3"`) + F("M0 -13 L4 0 L-4 0 Z", C.red) + F("M0 13 L4 0 L-4 0 Z", col) + O(0, 0, 2.5, col));
    case "key": return g(O(-9, 0, 8, "none", `stroke="${col}" stroke-width="4"`) + P("M-1 0 H17 M11 0 V6 M16 0 V5", col, 4));
    case "scale": return g(P("M0 -15 V14 M-10 15 H10 M-16 -9 H16", col, 2.8) + P("M-16 -9 L-21 3 H-11 Z M16 -9 L11 3 H21 Z", col, 2) + O(0, -16, 2.6, col));
    case "shield": return g(F("M0 -17 L14 -11 V0 Q14 12 0 18 Q-14 12 -14 0 V-11 Z", col) + P("M-6 0 L-1 5 L7 -5", W, 3));
    case "gavel": return g(G("rotate(-35)", R(-12, -13, 22, 9, col, 2) + R(-3, -4, 5, 20, col, 2)) + R(-14, 12, 22, 5, col, 2));
    case "flag": return g(P("M-10 17 V-17", col, 3) + F("M-9 -16 H13 L8 -9 L13 -2 H-9 Z", C.coral));
    case "chat": return g(R(-17, -15, 24, 17, col, 5) + F("M-12 2 L-14 9 L-6 2 Z", col) + R(-2, -4, 20, 15, C.teal, 5) + F("M13 11 L15 17 L8 11 Z", C.teal));
    case "target": return g(O(0, 0, 16, W, `stroke="${C.red}" stroke-width="3"`) + O(0, 0, 10, W, `stroke="${C.red}" stroke-width="3"`) + O(0, 0, 4, C.red) + P("M3 -3 L17 -17", col, 2.5));
    case "mag": return g(O(-3, -3, 11, "rgba(255,255,255,.6)", `stroke="${col}" stroke-width="3.5"`) + P("M5 5 L15 15", col, 5));
    case "hotel": return g(R(-15, -16, 30, 33, col, 2) + rep(3, (r) => rep(3, (c2) => R(-10 + c2 * 8, -11 + r * 8, 5, 5, C.gold, 1))) + R(-4, 9, 8, 8, W, 1));
    case "invoice": return g(F("M-12 -17 H12 V17 L8 13 L4 17 L0 13 L-4 17 L-8 13 L-12 17 Z", W, `stroke="${col}" stroke-width="2.5"`) + P("M-6 -8 H6 M-6 -1 H6", col, 2.2) + T(0, 11, "AED", 7, col));
    case "box": return g(F("M-16 -6 L0 -14 L16 -6 L16 12 L0 19 L-16 12 Z", "#d9a066", `stroke="${C.amber}" stroke-width="2"`) + P("M-16 -6 L0 2 L16 -6 M0 2 V19", C.amber, 2));
    case "spa": return g(F("M0 14 Q-16 4 -12 -12 Q-1 -6 0 14 Z", C.teal) + F("M0 14 Q16 4 12 -12 Q1 -6 0 14 Z", "#55b7a8") + F("M0 14 Q-5 -4 0 -17 Q5 -4 0 14 Z", C.green));
    case "kiosk": return g(R(-12, -18, 24, 22, col, 3) + R(-8, -14, 16, 13, "#bfe3ff", 2) + R(-3, 4, 6, 10, col) + R(-10, 14, 20, 4, col, 2));
    case "lock": return g(P("M-8 -4 V-10 A8 8 0 0 1 8 -10 V-4", col, 3.5) + R(-12, -4, 24, 20, col, 3) + O(0, 5, 3, W));
    case "chart": return g(P("M-17 -16 V15 H17", col, 2.5) + P("M-12 8 L-4 -1 L3 4 L14 -11", C.teal, 3));
    case "crown": return g(F("M-16 10 L-16 -8 L-8 0 L0 -12 L8 0 L16 -8 L16 10 Z", C.gold, `stroke="${C.amber}" stroke-width="2"`) + R(-16, 10, 32, 5, C.amber, 1));
    case "calendar": return g(R(-15, -12, 30, 28, W, 3, `stroke="${col}" stroke-width="2.5"`) + R(-15, -12, 30, 8, col, 3) + P("M-8 -16 V-9 M8 -16 V-9", col, 3) + rep(3, (i) => R(-9 + i * 7, 2, 4, 4, col)));
    case "link": return g(R(-17, -6, 18, 12, "none", 6, `stroke="${col}" stroke-width="3.5"`) + R(-1, -6, 18, 12, "none", 6, `stroke="${C.teal}" stroke-width="3.5"`));
    case "ruler": return g(G("rotate(-30)", R(-18, -6, 36, 12, C.gold, 2) + rep(6, (i) => P(`M${-13 + i * 5} -6 V${i % 2 ? -1 : 1}`, C.ink, 1.4))));
    case "fence": return g(rep(4, (i) => F(`M${-15 + i * 9} 15 V-9 L${-12 + i * 9} -15 L${-9 + i * 9} -9 V15 Z`, col)) + R(-18, -4, 36, 3, col) + R(-18, 7, 36, 3, col));
    case "hourglass": return g(P("M-10 -16 H10 M-10 16 H10", col, 3) + F("M-8 -14 H8 L1 0 L8 14 H-8 L-1 0 Z", "none", `stroke="${col}" stroke-width="2.5"`) + F("M-5 11 H5 L0 6 Z", C.gold));
    case "map": return g(F("M-17 -12 L-6 -16 L6 -12 L17 -16 V12 L6 16 L-6 12 L-17 16 Z", W, `stroke="${col}" stroke-width="2.4"`) + P("M-6 -16 V12 M6 -12 V16", col, 1.6) + P("M-12 6 Q-4 -6 4 2 T14 -8", C.red, 2.4, 'stroke-dasharray="3 3"'));
    case "check": return g(O(0, 0, 15, C.green) + P("M-7 0 L-2 6 L8 -6", W, 3.5));
    case "cross": return g(O(0, 0, 15, C.red) + P("M-6 -6 L6 6 M6 -6 L-6 6", W, 3.5));
    case "warn": return g(F("M0 -16 L17 14 H-17 Z", C.gold, `stroke="${C.amber}" stroke-width="2"`) + R(-1.8, -6, 3.6, 11, C.ink, 1.5) + O(0, 9, 2.2, C.ink));
    case "q": return g(O(0, 0, 15, C.coral) + T(0, 6.5, "?", 19, W));
    case "stamp": return g(R(-16, 6, 32, 9, col, 2) + R(-5, -6, 10, 13, col, 2) + O(0, -11, 7, col));
    case "eye": return g(F("M-17 0 Q0 -14 17 0 Q0 14 -17 0 Z", W, `stroke="${col}" stroke-width="2.5"`) + O(0, 0, 5.5, col));
    case "handshake": return g(P("M-18 -2 L-8 -8 L2 -2 M18 -2 L8 -8 L-4 2 Q-1 6 3 3 L8 7 Q11 9 13 6", col, 3) + P("M-18 -2 L-8 8 Q-5 11 -2 8", col, 3));
    case "bell": return g(F("M-12 8 Q-12 -12 0 -12 Q12 -12 12 8 Z", C.gold, `stroke="${C.amber}" stroke-width="2"`) + R(-16, 8, 32, 5, col, 2) + O(0, -14, 3, col));
    case "wallet": return g(R(-17, -10, 34, 24, col, 4) + R(4, -3, 15, 10, C.gold, 3) + O(10, 2, 2.2, col));
    default: return g(O(0, 0, 12, col));
  }
}
const person = (x, y, s = 1, col = C.navy) => ICO("person", x, y, s, col);
const guest = (x, y, s = 1, col = C.navy2) => ICO("guest", x, y, s, col);
const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${r1(x - 7 * s)} ${r1(y)} l${r1(5 * s)} ${r1(5 * s)} l${r1(10 * s)} ${r1(-11 * s)}`, col, w);
const xmark = (x, y, s = 1, col = C.red, w = 3) => P(`M${r1(x - 6 * s)} ${r1(y - 6 * s)} l${r1(12 * s)} ${r1(12 * s)} M${r1(x + 6 * s)} ${r1(y - 6 * s)} l${r1(-12 * s)} ${r1(12 * s)}`, col, w);
const arcD = (cx, cy, r, a0, a1) => {
  const p0 = [cx + Math.cos(a0) * r, cy + Math.sin(a0) * r], p1 = [cx + Math.cos(a1) * r, cy + Math.sin(a1) * r];
  return `M${r1(p0[0])} ${r1(p0[1])} A${r} ${r} 0 ${Math.abs(a1 - a0) > Math.PI ? 1 : 0} 1 ${r1(p1[0])} ${r1(p1[1])}`;
};

// ---- prefixed keyed builders handed to every shot family ----
function pfx(p) {
  return {
    p,
    K: (k, b, ex = "") => `<g data-k="${p}${k}" ${ex}>${b}</g>`,
    H: (k, b, ex = "") => `<g data-k="${p}${k}" style="opacity:0" ${ex}>${b}</g>`,
    D: (k, d, s, w = 3, ex = "") => `<path data-k="${p}${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100" ${ex}/>`,
    TK: (k, x, y, s, sz = 14, f = C.ink, a = "middle", ex = "") => `<text data-k="${p}${k}" x="${r1(x)}" y="${r1(y)}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`,
    // An auto-sized label chip whose text, colour and width are set by c.note().
    N: (k, x, y, sz = 13) => `<g data-k="${p}${k}" data-cx="${x}" data-sz="${sz}" style="opacity:0">` +
      R(x - 40, y - sz * 0.98, 80, sz * 1.95, C.white, sz, `stroke="${C.navy}" stroke-width="2"`) +
      `<text x="${x}" y="${r1(y + sz * 0.36)}" font-size="${sz}" fill="${C.navy}" text-anchor="middle"></text></g>`
  };
}

// ---- per-part stylesheet, appended once into the shared <style id="vl-sc-w05"> ----
function sceneCSS(id, bg) {
  const s = ".vls-w05-" + id;
  return `
${s}{position:relative;display:flex;flex-direction:column;width:100%;height:100%;min-height:200px;overflow:hidden;box-sizing:border-box;border-radius:14px;background:${bg};color:${C.ink};isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w05-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w05-fig>svg{position:absolute;inset:0;display:block;width:100%;height:100%;max-width:none;max-height:none;overflow:hidden}
${s} svg text{font-family:"Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif;font-weight:700;letter-spacing:.1px;pointer-events:none}
${s} [data-k]{transform-box:fill-box;transform-origin:50% 50%;transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.8s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}
${s}.w05-snap [data-k]{transition:none!important}
${s} .w05-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:36px;padding:6px 12px 8px;font:700 14px/1.25 "Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif;color:${C.navy};background:rgba(255,255,255,.72);border-top:1px solid rgba(31,78,121,.14)}
${s} .w05-num{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w05-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
${s} .w05-lab.w05-in{animation:vlsw05Cap .5s cubic-bezier(.22,.8,.24,1)}
${s} .w05-bar{flex:0 0 56px;height:4px;border-radius:4px;background:rgba(31,78,121,.15);overflow:hidden}
${s} .w05-bar i{display:block;height:100%;width:0;background:${C.coral};transition:width .6s ease}
${s} .a-flow{stroke-dasharray:6 7;animation:vlsw05Flow 1.2s linear infinite}
${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw05Spin 9s linear infinite}
${s} .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw05Bob 2.4s ease-in-out infinite}
${s} .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw05Pulse 1.8s ease-in-out infinite}
${s} .a-shake{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw05Shake .8s ease-in-out infinite}
${s} .a-blink{animation:vlsw05Blink 1.3s ease-in-out infinite}
@media (max-width:420px){${s} .w05-cap{font-size:13px;min-height:32px;padding:5px 10px 7px}${s} .w05-bar{flex-basis:40px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
}
const KEYFRAMES = `
@keyframes vlsw05Cap{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes vlsw05Flow{to{stroke-dashoffset:-26}}
@keyframes vlsw05Spin{to{transform:rotate(360deg)}}
@keyframes vlsw05Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes vlsw05Pulse{0%,100%{opacity:.45;transform:scale(.94)}50%{opacity:1;transform:scale(1.06)}}
@keyframes vlsw05Shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}
@keyframes vlsw05Blink{0%,100%{opacity:1}50%{opacity:.35}}
`;
const SCENE_BG = [];
function addStyles() {
  if (typeof document === "undefined") return;
  let st = document.getElementById("vl-sc-w05");
  if (!st) { st = document.createElement("style"); st.id = "vl-sc-w05"; (document.head || document.documentElement).appendChild(st); }
  const flag = "data-w05claude-" + PART;
  if (st.getAttribute(flag)) return;
  st.setAttribute(flag, "1");
  st.appendChild(document.createTextNode(KEYFRAMES + SCENE_BG.map((a) => sceneCSS(a[0], a[1])).join("\n")));
}

// Re-labels a family instance with the benchmark template it is modelled on in this section.
const BENCH = (fam, bench) => { fam.bench = bench; return fam; };

// ---- scene factory: one plan entry per narration line -> [family, state, caption] ----
function makeScene(cfg) {
  const { id, plan, fams } = cfg;
  const N = plan.length, names = Object.keys(fams);
  let root = null, useG = false;
  const nodes = (k) => (root ? Array.prototype.slice.call(root.querySelectorAll('[data-k="' + k + '"]')) : []);
  const mapK = (i, n) => {
    const nn = Math.max(1, Math.floor(num(n, N)));
    const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
    return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
  };
  const dur = (t, d) => (t.d == null ? d : t.d);
  function timing(el, t, d) { el.style.transitionDuration = dur(t, d) + "s"; el.style.transitionDelay = (t.dl || 0) + "s"; }
  function tf(el, st, t, snap) {
    const x = st.x || 0, y = st.y || 0, r = st.r || 0;
    const sx = st.sx != null ? st.sx : (st.s != null ? st.s : 1), sy = st.sy != null ? st.sy : (st.s != null ? st.s : 1);
    const g = useG ? GS() : null;
    if (g) {
      const v = { x, y, rotation: r, scaleX: sx, scaleY: sy };
      if (st.pv) v.svgOrigin = st.pv[0] + " " + st.pv[1]; else v.transformOrigin = "50% 50%";
      if (snap) g.set(el, v); else g.to(el, Object.assign(v, { duration: dur(t, 0.8), delay: t.dl || 0, ease: t.e || "power3.out", overwrite: "auto" }));
      return;
    }
    if (st.pv) { el.style.transformBox = "view-box"; el.style.transformOrigin = st.pv[0] + "px " + st.pv[1] + "px"; }
    timing(el, t, 0.8);
    el.style.transform = "translate(" + x + "px," + y + "px) rotate(" + r + "deg) scale(" + sx + "," + sy + ")";
  }
  function op(el, o, t, snap) {
    const g = useG ? GS() : null;
    if (g) { if (snap) g.set(el, { opacity: o }); else g.to(el, { opacity: o, duration: dur(t, 0.55), delay: t.dl || 0, ease: "power1.out", overwrite: false }); return; }
    timing(el, t, 0.55); el.style.opacity = String(o);
  }
  function dash(el, f, t, snap) {
    const v = 100 * (1 - clamp(f, 0, 1)), g = useG ? GS() : null;
    if (g) { if (snap) g.set(el, { strokeDashoffset: v }); else g.to(el, { strokeDashoffset: v, duration: dur(t, 1), delay: t.dl || 0, ease: "power2.inOut" }); return; }
    timing(el, t, 1); el.style.strokeDashoffset = String(v);
  }
  function paint(el, prop, col, t, snap) {
    const g = useG ? GS() : null;
    if (g) { const v = {}; v[prop] = col; if (snap) g.set(el, v); else g.to(el, Object.assign(v, { duration: dur(t, 0.5), delay: t.dl || 0 })); return; }
    timing(el, t, 0.5); el.style[prop] = col;
  }
  function ctx(snap, p) {
    const K = (k) => nodes(p + k);
    const c = {
      snap,
      op: (k, o, t = {}) => K(k).forEach((el) => op(el, typeof o === "number" ? clamp(o, 0, 1) : (o ? 1 : 0), t, snap)),
      mv: (k, st, t = {}) => K(k).forEach((el) => tf(el, st || {}, t, snap)),
      dr: (k, f, t = {}) => K(k).forEach((el) => dash(el, f, t, snap)),
      fl: (k, col, t = {}) => K(k).forEach((el) => paint(el, "fill", col, t, snap)),
      sk: (k, col, t = {}) => K(k).forEach((el) => paint(el, "stroke", col, t, snap)),
      sw: (k, w) => K(k).forEach((el) => { el.style.strokeWidth = String(w); }),
      tx: (k, s) => K(k).forEach((el) => { const v = s == null ? "" : String(s); if (el.textContent !== v) el.textContent = v; }),
      at: (k, a, v) => K(k).forEach((el) => el.setAttribute(a, String(v))),
      cl: (k, cls, on) => K(k).forEach((el) => el.classList.toggle(cls, !!on)),
      vis: (map, t = {}) => Object.keys(map).forEach((k) => c.op(k, map[k], t)),
      note: (k, n, t = {}) => K(k).forEach((g) => {
        if (!n) { op(g, 0, t, snap); return; }
        const s = typeof n === "string" ? n : n.t, col = NC[(typeof n === "string" ? "N" : n.c) || "N"] || C.navy;
        const filled = typeof n === "object" && n.f;
        const sz = num(g.getAttribute("data-sz"), 13), cx0 = num(g.getAttribute("data-cx"), 200);
        const w = tw(s, sz), cx = clamp(cx0, w / 2 + 3, 397 - w / 2);
        const r = g.querySelector("rect"), tx = g.querySelector("text");
        if (r) { r.setAttribute("x", String(r1(cx - w / 2))); r.setAttribute("width", String(w)); r.setAttribute("stroke", col); r.setAttribute("fill", filled ? col : C.white); }
        if (tx) { tx.setAttribute("x", String(r1(cx))); tx.setAttribute("fill", filled ? C.white : col); if (tx.textContent !== s) tx.textContent = s; }
        op(g, 1, t, snap);
      })
    };
    return c;
  }
  function caption(k, snap) {
    const lab = root.querySelector(".w05-lab"), nn = root.querySelector(".w05-num"), bar = root.querySelector(".w05-bar i");
    const txt = plan[k][2] || "";
    if (lab && lab.textContent !== txt) {
      lab.textContent = txt;
      if (!snap && !RM()) { lab.classList.remove("w05-in"); void lab.offsetWidth; lab.classList.add("w05-in"); }
    }
    if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
    if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
  }
  function render(k, snap) {
    if (!root) return;
    if (snap) root.classList.add("w05-snap");
    try {
      const [act, st] = plan[k];
      const top = ctx(snap, "");
      names.forEach((nm) => {
        const on = nm === act;
        top.op("SH_" + nm, on ? 1 : 0, { d: on ? 0.55 : 0.3, dl: on ? 0.15 : 0 });
        top.mv("SH_" + nm, on ? {} : { y: 10, s: 0.98 }, { d: 0.6 });
      });
      const fam = fams[act];
      if (fam) { fam.render(ctx(snap, act + "_"), st || {}, k); root.setAttribute("data-template", fam.bench); }
      root.setAttribute("data-shot", act);
    } catch (e) { if (window.console) console.warn("[VL W05 " + id + "]", e); }
    caption(k, snap);
    if (snap) { void root.offsetWidth; root.classList.remove("w05-snap"); }
    root.setAttribute("data-moment", String(k));
  }
  function kill() {
    const g = GS();
    if (root && g && typeof g.killTweensOf === "function") { try { g.killTweensOf(root.querySelectorAll("[data-k]")); } catch (e) { /* ignore */ } }
  }
  function draw() {
    return R(-400, -300, 1200, 900, cfg.bg) + names.map((nm) => `<g data-k="SH_${nm}" style="opacity:0">${fams[nm].draw(pfx(nm + "_"))}</g>`).join("");
  }
  SCENE_BG.push([id, cfg.bg]);
  return {
    build(el) {
      if (!el || el.nodeType !== 1) return;
      kill();
      addStyles();
      useG = !!GS();
      const r = document.createElement("div");
      r.className = "vls-w05-" + id + " vls-w05-scene";
      r.setAttribute("data-vls-scene", id);
      r.innerHTML = '<div class="w05-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
        esc(cfg.desc) + '">' + draw() + '</svg></div><div class="w05-cap" aria-hidden="true"><span class="w05-num"></span><span class="w05-lab"></span><span class="w05-bar"><i></i></span></div>';
      if (typeof el.replaceChildren === "function") el.replaceChildren(r); else { el.innerHTML = ""; el.appendChild(r); }
      root = r;
      render(0, true);
    },
    step(i, n) { if (!root) return; render(mapK(i, n), false); },
    reset() { if (!root) return; kill(); render(0, true); }
  };
}

// =====================================================================
// SHOT FAMILY LIBRARY. Each family is one kind of picture; a section
// instantiates 8-10 of them with its own content, and every narration line
// sets one family's state. Each family names its benchmark template.
// =====================================================================

// template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
// Title card: spinning orbit, icon badge, two-line headline, kicker and subtitle chips.
function F_TITLE(cfg) {
  const col = cfg.col || C.navy;
  return {
    bench: "Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/",
    draw(f) {
      let s = O(200, 112, 92, "none", `stroke="${C.line}" stroke-width="1.5" stroke-dasharray="2 7"`);
      s += f.K("ring", `<g class="a-spin">${O(200, 112, 74, "none", `stroke="${col}" stroke-width="3" stroke-dasharray="14 10"`)}</g>`);
      s += f.H("orb", O(126, 112, 10, OC[0], `stroke="#fff" stroke-width="2.5"`) + O(237, 48, 10, OC[1], `stroke="#fff" stroke-width="2.5"`) + O(237, 176, 10, OC[2], `stroke="#fff" stroke-width="2.5"`));
      s += f.K("badge", O(200, 112, 54, C.white, `stroke="${col}" stroke-width="4"`) + ICO(cfg.icon || "compass", 200, 112, 1.9, col));
      s += f.N("k", 200, 22, 13);
      s += f.TK("t1", 200, 212, "", 24, C.ink);
      s += f.TK("t2", 200, 240, "", 24, col);
      s += f.N("sub", 200, 274, 14);
      return s;
    },
    render(c, s) {
      c.note("k", s.k ? { t: s.k, c: "N", f: 1 } : null);
      c.tx("t1", s.t1 || ""); c.tx("t2", s.t2 || "");
      c.mv("t1", { y: s.t1 ? 0 : 8 }); c.op("t1", s.t1 ? 1 : 0);
      c.mv("t2", { y: s.t2 ? 0 : 8 }, { dl: 0.1 }); c.op("t2", s.t2 ? 1 : 0, { dl: 0.1 });
      c.note("sub", s.sub ? { t: s.sub, c: s.sc || "T" } : null, { dl: 0.3 });
      c.op("orb", s.orb ? 1 : 0, { dl: 0.2 });
      c.mv("badge", { s: s.pop ? 1.1 : 1 });
    }
  };
}

// template: Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD
// The narrator's question in a speech bubble, the options on the table, and a team thinking.
function F_ASK(cfg = {}) {
  const col = cfg.col || C.coral;
  return {
    bench: "Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD",
    draw(f) {
      let s = R(24, 16, 352, 140, C.white, 18, `stroke="${col}" stroke-width="3"`);
      s += F("M150 154 L134 182 L182 154 Z", C.white, `stroke="${col}" stroke-width="3" stroke-linejoin="round"`) + R(148, 150, 38, 6, C.white);
      s += `<g class="a-pulse">${O(52, 46, 19, col)}${T(52, 54, "?", 24, C.white)}</g>`;
      for (let i = 0; i < 4; i++) s += f.TK("q" + i, 218, 60 + i * 26, "", 17, C.ink);
      [[110, 200], [290, 200], [110, 232], [290, 232]].forEach((p, i) => { s += f.N("o" + i, p[0], p[1], 13); });
      [80, 200, 320].forEach((x, i) => {
        s += f.K("p" + i, person(x, 274, 1.05, [C.teal, C.navy, C.coral][i]));
        s += f.H("th" + i, O(x + 14, 246, 2.6, C.slate) + O(x + 20, 239, 3.4, C.slate) + O(x + 28, 230, 4.4, C.slate));
      });
      return s;
    },
    render(c, s) {
      let lines = wrap(s.q, 28), sz = 17, lh = 26;
      if (lines.length > 3) { lines = wrap(s.q, 34); sz = 15; lh = 23; }
      if (lines.length > 4) { lines = wrap(s.q, 40); sz = 13; lh = 20; }
      const L = Math.min(4, lines.length), y0 = 86 - (L - 1) * lh / 2 + sz * 0.35;
      for (let i = 0; i < 4; i++) {
        c.tx("q" + i, lines[i] || ""); c.at("q" + i, "font-size", sz); c.at("q" + i, "y", r1(y0 + i * lh));
        c.op("q" + i, i < L ? 1 : 0, { dl: 0.08 * i });
      }
      const o = s.o || [], oc = s.oc || [];
      for (let i = 0; i < 4; i++) c.note("o" + i, o[i] ? { t: o[i], c: oc[i] || "N" } : null, { dl: 0.25 + i * 0.12 });
      for (let i = 0; i < 3; i++) {
        c.mv("p" + i, { y: s.who === i ? -5 : 0, s: s.who === i ? 1.12 : 1 });
        c.op("th" + i, !(s.o && s.o.length) && (s.who == null || s.who === i) ? 1 : 0, { dl: 0.2 * i });
      }
    }
  };
}

// template: Waiting Queue — https://lottiefiles.com/free-animation/waiting-queue-xoNutPl764
// Qasr's reception: queue length, staff on duty, waiting clock, guest rating, alerts and cost tag.
function F_DESK(cfg = {}) {
  return {
    bench: "Waiting Queue — https://lottiefiles.com/free-animation/waiting-queue-xoNutPl764",
    draw(f) {
      let s = R(0, 0, 400, 246, "#f7efe2") + R(0, 246, 400, 54, "#e6d4ba") + P("M0 246 H400", "#cdb593", 2);
      s += R(282, 118, 98, 26, C.navy, 6) + T(331, 136, cfg.sign || "Qasr Marina", 13, C.white);
      s += f.K("clock", O(44, 50, 25, C.white, `stroke="${C.navy}" stroke-width="3.5"`) + rep(12, (i) => { const a = i * Math.PI / 6; return P(`M${r1(44 + Math.cos(a) * 19)} ${r1(50 + Math.sin(a) * 19)} L${r1(44 + Math.cos(a) * 22)} ${r1(50 + Math.sin(a) * 22)}`, C.navy, 1.6); }));
      s += f.K("hand", P("M44 50 L44 32", C.red, 3.5), `data-pv="44 50"`) + O(44, 50, 3.5, C.navy);
      s += f.TK("wt", 78, 58, "", 19, C.red, "start");
      s += f.K("stars", T(220, 66, "Guest rating", 12, C.slate) + rep(5, (i) => ICO("star", 172 + i * 24, 38, 0.58, "#d4d9de")));
      for (let i = 0; i < 5; i++) s += f.H("sg" + i, ICO("star", 172 + i * 24, 38, 0.58, C.gold));
      s += f.N("cost", 338, 38, 13);
      for (let i = 0; i < 3; i++) {
        s += f.K("st" + i, person(300 + i * 30, 168, 0.9, C.teal) + R(292 + i * 30, 176, 16, 5, C.white, 2));
      }
      s += R(276, 178, 112, 50, C.wood, 6) + R(276, 178, 112, 8, "#9a6a3f", 4) + T(332, 212, "Reception", 13, C.white);
      s += f.K("gq", rep(6, (i) => f.K("g" + i, guest(240 - i * 36, 226, 1.05, i ? C.navy2 : C.navy))), `class="a-bob"`);
      s += f.H("sad", O(240, 186, 11, C.white, `stroke="${C.red}" stroke-width="2"`) + O(236, 184, 1.6, C.ink) + O(244, 184, 1.6, C.ink) + P("M235 192 Q240 187 245 192", C.ink, 1.8));
      s += f.H("happy", O(240, 186, 11, C.white, `stroke="${C.green}" stroke-width="2"`) + O(236, 184, 1.6, C.ink) + O(244, 184, 1.6, C.ink) + P("M235 189 Q240 194 245 189", C.ink, 1.8));
      s += f.H("exp", R(24, 254, 250, 16, C.gold, 8, `opacity=".55"`) + guest(196, 262, 0.75, C.amber) + guest(232, 262, 0.75, C.amber) + P("M250 262 H272", C.amber, 3) + arrowHead(276, 262, 0, C.amber));
      s += f.N("ex", 96, 262, 12);
      for (let i = 0; i < 3; i++) s += f.N("a" + i, [72, 196, 320][i], 100, 12);
      s += f.N("nt", 200, 286, 13);
      return s;
    },
    render(c, s) {
      const n = s.n == null ? 4 : s.n, st = s.staff == null ? 3 : s.staff;
      for (let i = 0; i < 6; i++) { c.op("g" + i, i < n ? 1 : 0, { dl: 0.05 * i }); c.mv("g" + i, { x: i < n ? 0 : -24 }); }
      c.cl("gq", "a-bob", n > 2);
      for (let i = 0; i < 3; i++) { c.op("st" + i, i < st ? 1 : 0.14); c.cl("st" + i, "a-shake", !!s.rush && i < st); }
      const m = parseFloat(s.wait) || 0;
      c.tx("wt", s.wait || ""); c.fl("wt", m >= 10 ? C.red : C.green);
      c.mv("hand", { r: m * 30, pv: [44, 50] }, { d: 1.2 });
      c.op("clock", s.wait ? 1 : 0.35);
      c.op("stars", s.stars == null ? 0 : 1);
      for (let i = 0; i < 5; i++) c.op("sg" + i, s.stars != null && i < s.stars ? 1 : 0, { dl: 0.06 * i });
      c.note("cost", s.cost ? { t: s.cost, c: s.cc || "A" } : null);
      c.op("sad", s.mood === "sad" ? 1 : 0); c.op("happy", s.mood === "happy" ? 1 : 0);
      c.op("exp", s.exp ? 1 : 0); c.note("ex", s.exp ? { t: "Corporate lane", c: "A" } : null);
      const a = s.alerts || [];
      for (let i = 0; i < 3; i++) c.note("a" + i, a[i] ? { t: a[i], c: (s.acs && s.acs[i]) || s.ac || "R", f: s.af } : null, { dl: 0.15 + i * 0.15 });
      c.note("nt", s.nt);
    }
  };
}

// template: Business Analytics Meeting — https://lottiefiles.com/free-animation/business-analytics-C1COKzrIkL
// The steering table: directors with their asks, the shared budget jar, pulls in different directions.
function F_BOARD(cfg) {
  const who = cfg.who; // [[name, colourLetter], x4]
  const X = [62, 150, 250, 338], B = [[96, 36], [126, 78], [274, 78], [304, 36]];
  return {
    bench: "Business Analytics Meeting — https://lottiefiles.com/free-animation/business-analytics-C1COKzrIkL",
    draw(f) {
      let s = "";
      for (let i = 0; i < 4; i++) s += f.H("pl" + i, P(`M200 158 L${X[i]} 150`, C.red, 3, 'stroke-dasharray="6 5"') + arrowHead(X[i] + (i < 2 ? 14 : -14), 150, i < 2 ? 180 : 0, C.red));
      for (let i = 0; i < 4; i++) {
        s += f.H("ring" + i, O(X[i], 158, 30, "none", `stroke="${NC[who[i][1]]}" stroke-width="3" class="a-pulse"`));
        s += f.K("d" + i, person(X[i], 176, 1.35, NC[who[i][1]]));
      }
      s += E(200, 214, 172, 34, C.wood) + E(200, 208, 172, 30, "#c99463");
      s += f.K("jar", F("M176 128 Q176 120 184 120 H216 Q224 120 224 128 V182 Q224 192 214 192 H186 Q176 192 176 182 Z", "rgba(232,241,248,.85)", `stroke="${C.slate}" stroke-width="2.5"`) + R(180, 112, 40, 9, C.slate, 3));
      for (let i = 0; i < 4; i++) s += f.H("c" + i, ICO("coin", 200, 178 - i * 15, 0.62));
      s += f.N("jl", 200, 238, 13);
      for (let i = 0; i < 4; i++) {
        s += T(X[i], 266, who[i][0], 13, NC[who[i][1]]);
        s += f.N("b" + i, B[i][0], B[i][1], 13);
      }
      s += f.N("nt", 200, 289, 13);
      return s;
    },
    render(c, s) {
      const on = s.on == null ? 4 : s.on, say = s.say || [];
      for (let i = 0; i < 4; i++) {
        const vis = Array.isArray(on) ? has(on, i) : i < on;
        c.op("d" + i, vis ? (s.spk == null || s.spk === i || has(s.also, i) ? 1 : 0.35) : 0.1);
        c.mv("d" + i, { y: s.spk === i ? -6 : 0 });
        c.op("ring" + i, s.spk === i ? 1 : 0);
        c.note("b" + i, say[i] ? { t: say[i], c: who[i][1], f: s.spk === i } : null, { dl: 0.1 * i });
        c.op("pl" + i, s.tug && vis ? 1 : 0); c.mv("pl" + i, { x: s.tug ? 0 : 0 });
      }
      const coins = s.coins == null ? 2 : s.coins;
      for (let i = 0; i < 4; i++) { c.op("c" + i, i < coins ? 1 : 0, { dl: 0.1 * i }); c.mv("c" + i, { y: i < coins ? 0 : -30 }); }
      c.op("jar", s.jar === false ? 0 : 1);
      c.note("jl", s.jl || null);
      c.note("nt", s.nt);
    }
  };
}

// template: Map Route Animation — https://lottiefiles.com/free-animation/map-route-animation-gMVg8kCqCD
// The BPM implementation framework as a road: Organization Strategy is the first stop.
function F_ROUTE() {
  const S = [[48, 236], [104, 206], [154, 192], [200, 170], [240, 146], [276, 126], [308, 104], [336, 84], [360, 64], [380, 44]];
  const road = "M48 236 C80 214 96 208 104 206 S140 196 154 192 S186 178 200 170 S228 154 240 146 S266 132 276 126 S298 112 308 104 S328 90 336 84 S352 70 360 64 S372 52 380 44";
  return {
    bench: "Map Route Animation — https://lottiefiles.com/free-animation/map-route-animation-gMVg8kCqCD",
    draw(f) {
      let s = R(0, 0, 400, 300, "#eef4ea") + P("M0 270 Q120 250 210 262 T400 250", "#d7e6cf", 18) + P("M0 40 Q80 24 160 40", "#e2ecdd", 22);
      s += P(road, "#d5d9dc", 14) + f.D("road", road, "#7e8f9c", 14) + P(road, C.white, 2, 'stroke-dasharray="6 8"');
      S.forEach((p, i) => { s += f.K("s" + i, O(p[0], p[1], i ? 8 : 14, C.muted, `stroke="${C.white}" stroke-width="3"`)); });
      s += f.H("beam", P("M48 74 L48 214", C.gold, 3, 'class="a-flow"'));
      s += f.H("star", `<g class="a-pulse">${O(48, 56, 24, C.gold, 'opacity=".25"')}</g>` + ICO("star", 48, 56, 1, C.gold));
      s += f.H("gate", R(96, 168, 4, 38, C.ink) + R(98, 172, 64, 8, C.red, 2) + R(112, 172, 10, 8, C.white) + R(134, 172, 10, 8, C.white));
      s += f.K("tok", O(48, 222, 9, C.coral, `stroke="${C.white}" stroke-width="3"`));
      s += f.N("l0", 106, 268, 14); s += f.N("l1", 150, 224, 12); s += f.N("lr", 300, 26, 13); s += f.N("gt", 196, 150, 12);
      s += f.N("nt", 300, 232, 13);
      return s;
    },
    render(c, s) {
      c.dr("road", s.road == null ? 1 : s.road, { d: 1.4 });
      const lit = s.lit == null ? 0 : s.lit;
      S.forEach((p, i) => { c.fl("s" + i, i < lit ? (i === 0 ? C.gold : C.navy2) : C.muted, { dl: 0.06 * i }); c.mv("s" + i, { s: i === 0 && s.first ? 1.25 : 1 }); });
      const at = clamp(s.at == null ? 0 : s.at, 0, 9);
      c.mv("tok", { x: S[at][0] - 48, y: S[at][1] - 236 - 14 }, { d: 1.2 });
      c.op("tok", s.at == null ? 0 : 1);
      c.op("star", s.star ? 1 : 0); c.op("beam", s.star ? 1 : 0, { dl: 0.3 });
      c.op("gate", s.gate ? 1 : 0); c.note("gt", s.gate ? { t: "Design waits", c: "R" } : null);
      c.note("l0", s.l0 ? { t: "Organization Strategy", c: "A", f: 1 } : null);
      c.note("l1", s.l1 ? { t: "Process Architecture", c: "N" } : null);
      c.note("lr", s.lr ? { t: "Later BPM phases", c: "S" } : null);
      c.note("nt", s.nt);
    }
  };
}

// template: Infographics Pack by ARstudio — https://motionarray.com/after-effects-templates/infographics-pack-135055/
// Qasr's three strategic objectives as cards, with a proposal linked to each by strength.
function F_OBJ(cfg = {}) {
  const X = [72, 200, 328], IC = ["star", "costdown", "growth"];
  const FIG = cfg.figs || ["#1", "−10%", "+25%"], NAME = cfg.names || ["Service rating", "Cost per room", "Corporate growth"];
  return {
    bench: "Infographics Pack by ARstudio — https://motionarray.com/after-effects-templates/infographics-pack-135055/",
    draw(f) {
      let s = "";
      for (let i = 0; i < 3; i++) {
        s += f.D("l" + i, `M200 252 C200 200 ${X[i]} 190 ${X[i]} 126`, OC[i], 4);
        s += f.N("w" + i, [112, 200, 288][i], [196, 176, 196][i], 12);
      }
      for (let i = 0; i < 3; i++) {
        s += f.H("hl" + i, R(X[i] - 64, 16, 128, 116, "none", 16, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
        s += f.K("cd" + i, R(X[i] - 58, 22, 116, 104, C.white, 12, `stroke="${OC[i]}" stroke-width="3"`) + R(X[i] - 58, 22, 116, 8, OC[i], 4) +
          ICO(IC[i], X[i], 52, 0.95, OC[i]) + f.TK("f" + i, X[i], 94, FIG[i], 25, OC[i]) + T(X[i], 116, NAME[i], 12, C.ink));
        s += f.H("ok" + i, ICO("check", X[i] + 50, 26, 0.75));
        s += f.H("rk" + i, ICO("warn", X[i] + 50, 28, 0.8));
      }
      s += f.H("ten", P("M96 142 H176", C.red, 4) + arrowHead(182, 142, 0, C.red) + arrowHead(90, 142, 180, C.red) + chip(136, 160, "Tension", { st: C.red, sz: 12 }));
      s += f.N("prop", 200, 262, 15);
      s += f.N("nt", 200, 287, 12);
      return s;
    },
    render(c, s) {
      const show = s.show == null ? 3 : s.show, L = s.links || [0, 0, 0], sg = s.sign || [1, 1, 1], wl = s.wl || [];
      for (let i = 0; i < 3; i++) {
        c.op("cd" + i, i < show ? (has(s.dim, i) ? 0.3 : 1) : 0, { dl: 0.12 * i });
        c.mv("cd" + i, { y: i < show ? 0 : 14, s: s.hl === i ? 1.06 : 1 });
        c.op("hl" + i, s.hl === i ? 1 : 0);
        c.op("ok" + i, has(s.ok, i) ? 1 : 0, { dl: 0.3 }); c.op("rk" + i, has(s.rk, i) ? 1 : 0, { dl: 0.3 });
        if (s.figs && s.figs[i] != null) c.tx("f" + i, s.figs[i]);
        c.dr("l" + i, s.prop && L[i] > 0 ? 1 : 0, { dl: 0.2 + 0.15 * i });
        c.sw("l" + i, L[i] > 0 ? 2 + L[i] * 2.5 : 2);
        c.sk("l" + i, sg[i] < 0 ? C.red : sg[i] === 0 ? C.muted : OC[i]);
        c.note("w" + i, s.prop && wl[i] ? { t: wl[i], c: sg[i] < 0 ? "R" : sg[i] === 0 ? "S" : "G" } : null, { dl: 0.5 + 0.1 * i });
      }
      c.op("ten", s.ten ? 1 : 0);
      c.note("prop", s.prop ? { t: s.prop, c: "N", f: 1 } : null);
      c.note("nt", s.nt);
    }
  };
}

// template: Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO
// A cause-and-effect chain: cards appear, arrows draw, a token travels; cards can turn red, green or break.
function F_CHAIN(cfg) {
  const nodes = cfg.nodes, n = nodes.length, slot = 376 / n, w = Math.min(104, slot - 14);
  const X = nodes.map((_, i) => 12 + slot * i + slot / 2), fs = w < 82 ? 12 : 13;
  return {
    bench: "Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO",
    draw(f) {
      let s = "";
      for (let i = 0; i < n - 1; i++) {
        const x1 = X[i] + w / 2 + 3, x2 = X[i + 1] - w / 2 - 5;
        s += f.D("a" + i, `M${r1(x1)} 152 H${r1(x2)}`, C.navy, 3.5);
        s += f.H("ah" + i, arrowHead(x2 + 4, 152, 0, C.navy));
        s += f.H("gap" + i, P(`M${r1((x1 + x2) / 2)} 120 V184`, C.red, 3, 'stroke-dasharray="5 4"') + ICO("q", (x1 + x2) / 2, 108, 0.65));
      }
      nodes.forEach((nd, i) => {
        const col = nd[3] ? NC[nd[3]] : C.navy, x = X[i];
        s += f.H("hr" + i, R(x - w / 2 - 5, 95, w + 10, 114, "none", 14, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
        s += f.K("c" + i,
          R(x - w / 2, 100, w, 104, C.white, 11, `stroke="${col}" stroke-width="2.5"`) + R(x - w / 2, 100, w, 7, col, 3) +
          f.H("rb" + i, R(x - w / 2, 100, w, 104, C.rose, 11, `stroke="${C.red}" stroke-width="3"`)) +
          f.H("gb" + i, R(x - w / 2, 100, w, 104, C.mint, 11, `stroke="${C.green}" stroke-width="3"`)) +
          ICO(nd[2] || "gear", x, 132, 0.9, col) + TF(x, 172, nd[0], fs, w - 8) + TF(x, 189, nd[1] || "", fs, w - 8));
        s += f.H("bad" + i, ICO("warn", x + w / 2 - 6, 102, 0.7));
        s += f.H("good" + i, ICO("check", x + w / 2 - 6, 102, 0.7));
      });
      s += f.K("tok", O(X[0], 84, 9, C.gold, `stroke="${C.white}" stroke-width="3"`) + P(`M${r1(X[0])} 93 V98`, C.gold, 2));
      s += f.N("ttl", 200, 38, 15); s += f.N("nt", 200, 240, 13); s += f.N("n2", 200, 272, 13);
      return s;
    },
    render(c, s) {
      const up = s.up == null ? n : s.up, dr = s.dr == null ? up - 1 : s.dr;
      for (let i = 0; i < n; i++) {
        c.op("c" + i, i < up ? (s.dim && s.hl != null && s.hl !== i ? 0.35 : 1) : 0, { dl: 0.1 * i });
        c.mv("c" + i, { y: i < up ? 0 : 14, s: s.hl === i ? 1.06 : 1 });
        c.op("hr" + i, s.hl === i ? 1 : 0);
        c.op("rb" + i, has(s.bad, i) ? 1 : 0); c.op("bad" + i, has(s.bad, i) ? 1 : 0, { dl: 0.2 });
        c.op("gb" + i, has(s.good, i) ? 1 : 0); c.op("good" + i, has(s.good, i) ? 1 : 0, { dl: 0.2 });
      }
      for (let i = 0; i < n - 1; i++) {
        const on = i < dr && s.gap !== i;
        c.dr("a" + i, on ? 1 : 0, { dl: 0.15 * i }); c.op("ah" + i, on ? 1 : 0, { dl: 0.15 * i + 0.4 });
        c.sk("a" + i, has(s.bad, i + 1) ? C.red : C.navy);
        c.op("gap" + i, s.gap === i ? 1 : 0);
      }
      const at = s.at == null ? -1 : s.at;
      c.op("tok", at >= 0 ? 1 : 0); c.mv("tok", { x: at >= 0 ? X[at] - X[0] : 0 }, { d: 1.1 });
      c.note("ttl", s.ttl ? (typeof s.ttl === "string" ? { t: s.ttl, c: "N", f: 1 } : s.ttl) : null);
      c.note("nt", s.nt); c.note("n2", s.n2, { dl: 0.3 });
    }
  };
}

// template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
// Two panels side by side, each with a header, an icon, evidence chips and a verdict.
function F_VS(cfg) {
  const side = (f, k, d, x0) => {
    const col = NC[d.c || "N"], cx = x0 + 91;
    let s = R(x0, 46, 182, 206, C.white, 14, `stroke="${col}" stroke-width="2.5"`) + R(x0, 46, 182, 34, col, 12) + R(x0, 68, 182, 12, col);
    s += T(cx, 68, d.t, 13, C.white) + ICO(d.icon || "doc", cx, 114, 1.25, col);
    (d.items || []).forEach((it, i) => { s += f.H(k + "i" + i, chip(cx, 160 + i * 31, it, { st: col, sz: 12, free: 1 })); });
    return f.K(k, s) + f.H(k + "ok", ICO("check", x0 + 160, 112, 0.8)) + f.H(k + "x", ICO("cross", x0 + 160, 112, 0.8)) + f.H(k + "w", ICO("warn", x0 + 160, 112, 0.8));
  };
  return {
    bench: "Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3",
    draw(f) {
      return side(f, "A", cfg.a, 10) + side(f, "B", cfg.b, 208) + f.K("vs", O(200, 148, 16, C.navy, `stroke="${C.white}" stroke-width="3"`) + T(200, 153, "vs", 13, C.white)) +
        f.N("ttl", 200, 22, 14) + f.N("nt", 200, 278, 13);
    },
    render(c, s) {
      const show = s.show || "ab";
      ["A", "B"].forEach((k) => {
        const lk = k.toLowerCase(), vis = show.indexOf(lk) > -1;
        c.op(k, vis ? (s.hl && s.hl !== lk ? 0.35 : 1) : 0, { dl: lk === "b" ? 0.15 : 0 });
        c.mv(k, { x: vis ? 0 : (lk === "a" ? -24 : 24), s: s.hl === lk ? 1.03 : 1 });
        const cnt = s["i" + lk] == null ? 3 : s["i" + lk];
        (cfg[lk].items || []).forEach((_, i) => c.op(k + "i" + i, vis && i < cnt ? 1 : 0, { dl: 0.25 + 0.12 * i }));
        const v = s["v" + lk];
        c.op(k + "ok", vis && v === "ok" ? 1 : 0, { dl: 0.4 }); c.op(k + "x", vis && v === "x" ? 1 : 0, { dl: 0.4 }); c.op(k + "w", vis && v === "w" ? 1 : 0, { dl: 0.4 });
      });
      c.op("vs", show === "ab" ? 1 : 0);
      c.note("ttl", s.ttl ? { t: s.ttl, c: "N", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p
// A balance: what is gained on one pan, what may be sacrificed on the other, a safeguard at the pivot.
function F_SCALE(cfg) {
  const pan = (f, k, d, x) => {
    const col = NC[d.c || "N"];
    let s = P(`M${x} 96 L${x - 52} 186 M${x} 96 L${x + 52} 186`, C.slate, 1.6) + F(`M${x - 62} 186 H${x + 62} Q${x + 56} 206 ${x} 206 Q${x - 56} 206 ${x - 62} 186 Z`, col);
    (d.items || []).forEach((it, i) => { s += f.H(k + i, chip(x, 172 - i * 28, it, { st: col, sz: 12 })); });
    s += TF(x, 228, d.t, 14, 128, col);
    return f.K(k, s);
  };
  return {
    bench: "Choosing a path — https://lottiefiles.com/free-animation/choosing-a-path-LLdYTJwO5p",
    draw(f) {
      let s = R(194, 96, 12, 150, C.slate, 3) + F("M168 252 H232 L220 238 H180 Z", C.slate);
      s += f.K("beam", R(60, 90, 280, 10, C.ink, 5) + O(200, 95, 8, C.gold), `data-pv="200 95"`);
      s += pan(f, "L", cfg.L, 70) + pan(f, "R", cfg.R, 330);
      s += f.H("guard", ICO("shield", 200, 132, 1.1, C.teal)); s += f.N("gT", 200, 249, 12);
      s += f.N("ttl", 200, 24, 14); s += f.N("mid", 200, 283, 13);
      return s;
    },
    render(c, s) {
      const t = s.t || 0;
      c.mv("beam", { r: 11 * t, pv: [200, 95] }, { d: 1.2, e: "elastic.out(1,0.6)" });
      c.mv("L", { y: -26 * t, s: s.hl === "L" ? 1.04 : 1 }, { d: 1.2 }); c.mv("R", { y: 26 * t, s: s.hl === "R" ? 1.04 : 1 }, { d: 1.2 });
      const nl = s.nl == null ? 3 : s.nl, nr = s.nr == null ? 3 : s.nr;
      (cfg.L.items || []).forEach((_, i) => c.op("L" + i, i < nl ? 1 : 0, { dl: 0.15 * i })); (cfg.R.items || []).forEach((_, i) => c.op("R" + i, i < nr ? 1 : 0, { dl: 0.15 * i }));
      c.op("guard", s.guard ? 1 : 0); c.note("gT", s.guard ? { t: s.guard === true ? "Safeguard" : s.guard, c: "T", f: 1 } : null);
      c.note("ttl", s.ttl ? { t: s.ttl, c: "N", f: 1 } : null); c.note("mid", s.mid);
    }
  };
}

// template: Animated Dashboards — https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ
// Three gauges whose needles and readings show how a process performs on different measures.
function F_GAUGE(cfg) {
  const X = [72, 200, 328], Y = 146, Rr = 48;
  return {
    bench: "Animated Dashboards — https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ",
    draw(f) {
      let s = "";
      cfg.g.forEach((g, i) => {
        const x = X[i];
        s += f.K("g" + i,
          R(x - 62, 82, 124, 130, C.white, 14, `stroke="${C.line}" stroke-width="2"`) +
          P(arcD(x, Y, Rr - 6, Math.PI, Math.PI * 1.33), C.red, 9) + P(arcD(x, Y, Rr - 6, Math.PI * 1.36, Math.PI * 1.64), C.gold, 9) + P(arcD(x, Y, Rr - 6, Math.PI * 1.67, Math.PI * 2), C.green, 9) +
          f.K("nd" + i, P(`M${x} ${Y} L${x} ${Y - Rr + 10}`, C.ink, 4), `data-pv="${x} ${Y}"`) + O(x, Y, 6, C.ink) +
          f.TK("v" + i, x, Y + 26, "", 17, C.ink) + chip(x, 232, g[0], { st: NC[g[1] || "N"], sz: 12, free: 1 }));
        s += f.H("wr" + i, R(x - 66, 78, 132, 138, "none", 16, `stroke="${C.red}" stroke-width="3" stroke-dasharray="7 5"`));
        s += f.H("hr" + i, R(x - 66, 78, 132, 138, "none", 16, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
      });
      s += f.N("ttl", 200, 40, 15); s += f.N("nt", 200, 272, 13);
      return s;
    },
    render(c, s) {
      const show = s.show == null ? 3 : s.show, v = s.val || [0, 0, 0], t = s.txt || [];
      for (let i = 0; i < cfg.g.length; i++) {
        c.op("g" + i, i < show ? (s.hl != null && s.hl !== i && s.dim ? 0.35 : 1) : 0, { dl: 0.12 * i });
        c.mv("nd" + i, { r: clamp(v[i] || 0, -1, 1) * 84, pv: [X[i], Y] }, { d: 1.2, dl: 0.1 * i });
        c.tx("v" + i, t[i] || "");
        c.op("wr" + i, has(s.warn, i) ? 1 : 0); c.op("hr" + i, s.hl === i ? 1 : 0);
      }
      c.note("ttl", s.ttl ? { t: s.ttl, c: "N", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: Bar chart transitions — https://observablehq.com/@d3/bar-chart-transitions/2
// A ratio built from coins over beds, its result, and baseline vs target bars.
function F_FRAC(cfg) {
  return {
    bench: "Bar chart transitions — https://observablehq.com/@d3/bar-chart-transitions/2",
    draw(f) {
      let s = R(10, 12, 222, 168, C.white, 14, `stroke="${C.line}" stroke-width="2"`);
      s += f.K("num", chip(121, 34, cfg.num, { st: C.amber, sz: 13, free: 1 }) + rep(5, (i) => ICO("coin", 57 + i * 32, 66, 0.72)));
      s += f.K("bar", P("M30 94 H212", C.ink, 4));
      s += f.K("den", rep(4, (i) => ICO("bed", 66 + i * 36, 120, 0.82, C.navy2)) + chip(121, 156, cfg.den, { st: C.navy2, sz: 13, free: 1 }));
      s += f.K("eq", T(250, 104, "=", 34, C.ink));
      s += f.K("res", R(270, 66, 120, 62, C.white, 14, `stroke="${C.coral}" stroke-width="3"`) + f.TK("rv", 330, 106, cfg.res || "", 24, C.coral));
      s += f.H("rl", T(330, 148, cfg.resl || "per room-night", 12, C.slate));
      s += T(24, 204, cfg.base[1], 13, C.ink, "", "start") + R(24, 212, 340, 18, "#edf1f4", 9);
      s += f.K("bb", R(24, 212, 340 * cfg.base[0], 18, C.coral, 9), `data-pv="24 221"`);
      s += f.TK("bT", 30 + 340 * cfg.base[0], 226, "", 13, C.white, "end");
      s += T(24, 250, cfg.tgt[1], 13, C.ink, "", "start") + R(24, 258, 340, 18, "#edf1f4", 9);
      s += f.K("tb", R(24, 258, 340 * cfg.tgt[0], 18, C.green, 9), `data-pv="24 267"`);
      s += f.H("cut", R(24 + 340 * cfg.tgt[0], 258, 340 * (cfg.base[0] - cfg.tgt[0]), 18, "none", 4, `stroke="${C.red}" stroke-width="2" stroke-dasharray="4 3"`));
      s += f.H("warn", ICO("warn", 384, 267, 0.7));
      s += f.N("calc", 200, 286, 13);
      s += f.N("nt", 310, 186, 12);
      return s;
    },
    render(c, s) {
      const st = s.stage == null ? 5 : s.stage;
      c.op("num", st >= 0 ? 1 : 0); c.op("bar", st >= 1 ? 1 : 0); c.op("den", st >= 1 ? 1 : 0, { dl: 0.2 });
      c.op("eq", st >= 2 ? 1 : 0); c.op("res", st >= 2 ? 1 : 0, { dl: 0.2 }); c.op("rl", st >= 2 ? 1 : 0, { dl: 0.3 });
      const rv = s.rv || cfg.res || ""; c.tx("rv", rv); c.at("rv", "font-size", Math.min(24, Math.floor(108 / Math.max(1, rv.length * 0.58))));
      c.mv("bb", { sx: st >= 3 ? 1 : 0.001, pv: [24, 221] }, { d: 1 }); c.op("bb", st >= 3 ? 1 : 0);
      c.tx("bT", st >= 3 ? (s.bT || "") : "");
      c.mv("tb", { sx: st >= 4 ? 1 : 0.001, pv: [24, 267] }, { d: 1, dl: 0.2 }); c.op("tb", st >= 4 ? 1 : 0);
      c.op("cut", st >= 4 && s.cut ? 1 : 0, { dl: 0.6 });
      c.op("warn", s.warn ? 1 : 0); c.cl("warn", "a-pulse", !!s.warn);
      c.note("calc", s.calc ? { t: s.calc, c: s.cc || "G", f: 1 } : null, { dl: 0.3 });
      c.note("nt", s.nt);
    }
  };
}

// template: Stacked-to-grouped bars — https://observablehq.com/@d3/stacked-to-grouped-bars
// The Exhibit 5 alignment matrix: four proposals by three objectives, strengths as sized dots.
const EX5 = { rows: [["Guest arrival", "guest"], ["Stock counting", "box"], ["Corporate billing", "invoice"], ["Spa booking", "spa"]], v: [[3, 2, 3], [0, 2, 0], [2, 1, 3], [2, 0, 0]] };
function F_MATRIX() {
  const CX = [196, 254, 312], RY = [100, 146, 192, 238], RS = [0, 5.5, 9.5, 13.5];
  return {
    bench: "Stacked-to-grouped bars — https://observablehq.com/@d3/stacked-to-grouped-bars",
    draw(f) {
      let s = R(4, 30, 392, 234, C.white, 14, `stroke="${C.line}" stroke-width="2"`);
      for (let j = 0; j < 3; j++) s += f.H("cb" + j, R(CX[j] - 27, 34, 54, 228, OC[j], 10, 'opacity=".16"'));
      ["star", "costdown", "growth"].forEach((ic, j) => { s += ICO(ic, CX[j], 50, 0.62, OC[j]) + T(CX[j], 76, OBJN[j], 12, OC[j]); });
      s += T(356, 76, "Total", 12, C.slate);
      for (let i = 0; i < 4; i++) {
        const y = RY[i];
        s += f.H("rb" + i, R(8, y - 21, 384, 42, C.gold, 10, 'opacity=".2"'));
        s += f.H("rg" + i, R(8, y - 21, 384, 42, "none", 10, `stroke="${C.green}" stroke-width="3"`));
        s += f.K("r" + i, ICO(EX5.rows[i][1], 26, y, 0.62, C.navy) + T(44, y + 5, EX5.rows[i][0], 13, C.ink, "", "start") + P(`M12 ${y + 21} H388`, C.line, 1));
        for (let j = 0; j < 3; j++) {
          const v = EX5.v[i][j];
          s += f.H("c" + i + j, v ? O(CX[j], y, RS[v], OC[j]) : P(`M${CX[j] - 8} ${y} H${CX[j] + 8}`, C.muted, 3));
        }
        s += f.TK("t" + i, 356, y + 6, String(EX5.v[i].reduce((a, b) => a + b, 0)), 18, C.navy, "middle", 'style="opacity:0"');
        s += f.H("fd" + i, ICO("coin", 386, y, 0.55));
        s += f.H("df" + i, ICO("hourglass", 386, y, 0.5, C.slate));
      }
      s += f.H("cr", ICO("crown", 136, RY[3] - 2, 0.55));
      s += f.K("lg", O(70, 282, 7, C.slate) + T(80, 287, "Strong", 12, C.slate, "", "start") + O(150, 282, 5, C.slate) + T(158, 287, "Moderate", 12, C.slate, "", "start") +
        O(244, 282, 3, C.slate) + T(250, 287, "Weak", 12, C.slate, "", "start") + P("M300 282 H312", C.muted, 3) + T(318, 287, "None", 12, C.slate, "", "start"));
      s += f.N("nt", 200, 16, 12);
      return s;
    },
    render(c, s) {
      const rows = s.rows == null ? 4 : s.rows, cells = s.cells == null ? rows : s.cells;
      for (let i = 0; i < 4; i++) {
        const vis = Array.isArray(rows) ? has(rows, i) : i < rows;
        const dim = s.hl != null && s.hl !== i && (s.dim !== false) && !has(s.also, i);
        c.op("r" + i, vis ? (dim ? 0.35 : 1) : 0.12, { dl: 0.08 * i });
        c.op("rb" + i, s.hl === i || has(s.also, i) ? 1 : 0); c.op("rg" + i, has(s.fund, i) ? 1 : 0);
        const cv = Array.isArray(cells) ? has(cells, i) : i < cells;
        for (let j = 0; j < 3; j++) { c.op("c" + i + j, cv ? (dim ? 0.35 : 1) : 0, { dl: 0.2 + 0.15 * j }); c.mv("c" + i + j, { s: cv ? (has(s.colhl, j) && !dim ? 1.2 : 1) : 0.2 }, { dl: 0.2 + 0.15 * j }); }
        c.op("t" + i, s.tot && cv ? 1 : 0, { dl: 0.6 });
        c.op("fd" + i, has(s.fund, i) ? 1 : 0, { dl: 0.4 }); c.mv("fd" + i, { y: has(s.fund, i) ? 0 : -30 }, { dl: 0.4 });
        c.op("df" + i, has(s.def, i) ? 1 : 0, { dl: 0.4 });
      }
      for (let j = 0; j < 3; j++) c.op("cb" + j, has(s.colhl, j) ? 1 : 0);
      c.op("cr", s.crown ? 1 : 0); c.cl("cr", "a-pulse", !!s.crown);
      c.note("nt", s.nt);
    }
  };
}

// template: Multi-Step Icon Animation — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
// An objective as a key: four cuts (result, measure, boundary, authority) before it opens the lock.
function F_KEY() {
  const NX = [160, 196, 232, 268], LB = ["1 Result", "2 Measure", "3 Boundary", "4 Authority"], LC = [C.teal, C.navy2, C.coral, C.plum];
  return {
    bench: "Multi-Step Icon Animation — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU",
    draw(f) {
      let s = R(0, 0, 400, 300, "#1d3b42") + rep(14, (i) => rep(9, (j) => O(14 + i * 28, 14 + j * 28, 1.4, "#2f5a62")));
      s += f.H("dep", chip(70, 30, "Reception", { st: C.teal, sz: 12 }) + chip(165, 30, "Housekeeping", { st: C.navy2, sz: 12 }) + chip(262, 30, "Finance", { st: C.gold, sz: 12 }) + chip(344, 30, "Sales", { st: C.coral, sz: 12 }));
      s += f.K("lock", R(312, 96, 80, 104, "#9aa7b0", 12, `stroke="#5d6b75" stroke-width="3"`) + O(352, 140, 10, "#26333b") + R(348, 142, 8, 18, "#26333b", 2));
      s += f.K("lamp", O(352, 184, 7, C.muted));
      s += f.K("sh", P("M328 96 V74 A24 24 0 0 1 376 74 V96", "#5d6b75", 9));
      s += f.K("key",
        O(70, 140, 30, "#e3b04b", `stroke="#b6862a" stroke-width="3"`) + O(70, 140, 11, "#1d3b42") +
        R(98, 131, 192, 18, "#e3b04b", 3) + R(150, 109, 140, 24, "#e3b04b", 2) + F("M290 131 L302 140 L290 149 Z", "#e3b04b") +
        NX.map((x, i) => f.K("n" + i, R(x, 109, 20, 22, "#1d3b42"), `data-pv="${x + 10} 109"`) + R(x, 109, 20, 22, "none", 2, `stroke="#ffffff" stroke-width="1.3" stroke-dasharray="3 3" opacity=".7"`) + T(x + 10, 102, String(i + 1), 12, "#ffe7a8")).join(""));
      s += f.K("cut", G("translate(0 0)", P("M170 26 V60", "#8796a0", 6) + `<g class="a-spin">${O(170, 70, 18, "#c9d2d8", `stroke="#5d6b75" stroke-width="3"`) + P("M170 54 V86 M154 70 H186", "#5d6b75", 2.5)}</g>` +
        f.H("spk", P("M160 92 L150 104 M170 94 V108 M180 92 L190 104", "#ffd36b", 2.5))));
      s += f.H("fx", ICO("cross", 352, 140, 1.1));
      s += f.H("sp", ICO("sponsor", 30, 194, 1.1, C.plum) + T(30, 226, "Sponsor", 11, "#e7dcf7"));
      LB.forEach((t, i) => { s += f.K("lg" + i, chip([52, 146, 252, 350][i], 262, t, { st: LC[i], sz: 12, free: 1 })); });
      s += f.N("nt", 200, 228, 13);
      return s;
    },
    render(c, s) {
      const cuts = s.cuts || 0;
      for (let i = 0; i < 4; i++) {
        c.mv("n" + i, { sy: i < cuts ? 1 : 0.02, pv: [NX[i] + 10, 109] }, { dl: i === cuts - 1 ? 0.4 : 0 });
        c.op("lg" + i, i < cuts ? 1 : (s.legend ? 0.35 : 0)); c.mv("lg" + i, { s: s.hl === i ? 1.12 : 1 });
      }
      const at = s.at == null ? -1 : s.at;
      c.mv("cut", { x: at >= 0 ? NX[at] - 160 : 200, y: at >= 0 ? 0 : -90 }, { d: 0.9 });
      c.op("spk", at >= 0 ? 1 : 0, { dl: 0.6 });
      c.mv("key", { x: s.inLock ? 44 : 0, y: s.drop ? 40 : 0 }, { d: 1 });
      c.op("key", s.ghost ? 0.45 : 1);
      c.fl("lamp", s.open ? C.green : s.fail ? C.red : C.muted);
      c.mv("sh", { y: s.open ? -16 : 0 }, { dl: 0.6 });
      c.op("fx", s.fail ? 1 : 0, { dl: 0.5 });
      c.op("dep", s.dep ? 1 : 0); c.op("sp", s.sp ? 1 : 0);
      c.note("nt", s.nt);
    }
  };
}

// template: Process - Success — https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP
// The mechanism: a proposal turns a gear train (change -> effect -> objective) that moves a dial.
function gearPath(cx, cy, r, n, skip) {
  let d = ""; const st = 2 * Math.PI / n, dp = 7;
  for (let k = 0; k < n; k++) {
    const a = k * st, pts = has(skip, k) ? [[a, r - dp], [a + st * 0.65, r - dp]] : [[a, r - dp], [a + st * 0.15, r], [a + st * 0.5, r], [a + st * 0.65, r - dp]];
    pts.forEach((p, j) => { d += (k === 0 && j === 0 ? "M" : "L") + r1(cx + Math.cos(p[0]) * p[1]) + " " + r1(cy + Math.sin(p[0]) * p[1]) + " "; });
  }
  return d + "Z";
}
function F_GEAR(cfg) {
  const G1 = [70, 176, 40], G2 = [144, 176, 32], G3 = [218, 176, 40], DL = [334, 140];
  const lab = cfg.labels || ["Change", "Effect", "Contribution"];
  return {
    bench: "Process - Success — https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP",
    draw(f) {
      let s = rep(20, (i) => P(`M${i * 20} 0 V300`, "#21426a", 1)) + rep(15, (i) => P(`M0 ${i * 20} H400`, "#21426a", 1));
      s = R(0, 0, 400, 300, "#173250") + s;
      s += f.D("belt", "M232 140 C262 112 290 112 300 118", "#f4cf6b", 5);
      s += f.K("g1", F(gearPath(G1[0], G1[1], G1[2], 12), C.teal, `stroke="#0f2440" stroke-width="2"`) + O(G1[0], G1[1], 8, "#0f2440") + P(`M${G1[0]} ${G1[1]} L${G1[0] - 28} ${G1[1] - 30}`, "#e8eef5", 6) + O(G1[0] - 28, G1[1] - 30, 7, "#e8eef5"), `data-pv="${G1[0]} ${G1[1]}"`);
      s += f.K("g2", F(gearPath(G2[0], G2[1], G2[2], 10, [2, 3]), C.gold, `stroke="#0f2440" stroke-width="2"`) + O(G2[0], G2[1], 7, "#0f2440") +
        f.H("gap", P(arcD(G2[0], G2[1], 38, 2 * 2 * Math.PI / 10 - 0.1, 4 * 2 * Math.PI / 10 + 0.1), C.red, 4)) +
        f.H("fix", F(gearPath(G2[0], G2[1], G2[2], 10, [0, 1, 4, 5, 6, 7, 8, 9]), C.green, `stroke="#0f2440" stroke-width="1.5"`)), `data-pv="${G2[0]} ${G2[1]}"`);
      s += f.K("g3", F(gearPath(G3[0], G3[1], G3[2], 12), C.coral, `stroke="#0f2440" stroke-width="2"`) + O(G3[0], G3[1], 8, "#0f2440"), `data-pv="${G3[0]} ${G3[1]}"`);
      lab.forEach((t, i) => { s += f.K("lb" + i, chip([70, 144, 218][i], 240, t, { st: [C.teal, C.gold, C.coral][i], sz: 12, free: 1 })); });
      s += O(DL[0], DL[1], 44, "#0f2440", `stroke="${C.sky}" stroke-width="3"`) + P(arcD(DL[0], DL[1], 34, Math.PI * 1.08, Math.PI * 1.5), C.red, 6) + P(arcD(DL[0], DL[1], 34, Math.PI * 1.5, Math.PI * 1.92), C.green, 6);
      s += f.K("nd", P(`M${DL[0]} ${DL[1]} L${DL[0]} ${DL[1] - 32}`, C.white, 4), `data-pv="${DL[0]} ${DL[1]}"`) + O(DL[0], DL[1], 5, C.white);
      s += chip(DL[0], 202, cfg.dial || "Objective", { st: cfg.dc || C.teal, sz: 13, free: 1 });
      s += f.H("gain", ICO("coin", 300, 250, 0.6) + ICO("coin", 326, 250, 0.6) + ICO("coin", 352, 250, 0.6) + T(326, 280, "Savings", 12, C.gold));
      s += f.H("minus", ICO("cross", 300, 250, 0.5) + ICO("cross", 326, 250, 0.5) + T(374, 255, "New costs", 12, C.red, "", "end"));
      s += f.N("prop", 200, 28, 15); s += f.N("nt", 200, 66, 13);
      return s;
    },
    render(c, s) {
      const T0 = (s.turn || 0) * 120;
      c.mv("g1", { r: T0, pv: [G1[0], G1[1]] }, { d: 1.4 });
      c.mv("g2", { r: -T0 * 40 / 32 + (s.gap ? 10 : 0), pv: [G2[0], G2[1]] }, { d: 1.4 });
      c.mv("g3", { r: s.gap && !s.fix ? 0 : T0, pv: [G3[0], G3[1]] }, { d: 1.4 });
      c.op("gap", s.gap && !s.fix ? 1 : 0); c.op("fix", s.fix ? 1 : 0);
      c.dr("belt", s.belt ? 1 : 0);
      c.mv("nd", { r: clamp(s.dial || -0.8, -1, 1) * 80, pv: [DL[0], DL[1]] }, { d: 1.2, dl: 0.3 });
      for (let i = 0; i < 3; i++) c.op("lb" + i, s.lab === false ? 0.25 : (s.hl == null || s.hl === i ? 1 : 0.4));
      c.op("gain", s.coins === "gain" || s.coins === "net" ? 1 : 0); c.op("minus", s.coins === "net" ? 1 : 0, { dl: 0.3 });
      c.note("prop", s.prop ? { t: s.prop, c: "T", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: Hierarchy traversal animated — https://old.observablehq.com/@d3/hierarchy-traversal-animated
// Governance tiers: who recommends, who approves, and an escalation that climbs to the right level.
function F_LADDER(cfg) {
  const Y = [52, 112, 172, 232];
  return {
    bench: "Hierarchy traversal animated — https://old.observablehq.com/@d3/hierarchy-traversal-animated",
    draw(f) {
      let s = "";
      cfg.tiers.forEach((t, i) => {
        const col = NC[t[2] || "N"];
        s += f.H("h" + i, R(14, Y[i] - 27, 240, 54, "none", 14, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
        s += f.K("t" + i, R(18, Y[i] - 23, 232, 46, C.white, 12, `stroke="${col}" stroke-width="2.5"`) + R(18, Y[i] - 23, 10, 46, col, 4) + ICO(t[1], 52, Y[i], 0.9, col) + TF(80, Y[i] + 5, t[0], 15, 162, C.ink, "start"));
        if (i < 3) s += P(`M150 ${Y[i] + 23} V${Y[i + 1] - 23}`, C.line, 2.5);
        s += f.N("tg" + i, 334, Y[i], 12);
      });
      s += f.D("esc", `M262 ${Y[3] + 10} C276 ${Y[3] - 10} 268 ${Y[0] + 40} 262 ${Y[0] + 6}`, C.red, 4);
      s += f.H("eh", arrowHead(262, Y[0] + 2, -90, C.red));
      s += f.H("cf", person(210, Y[3] - 2, 0.8, C.teal) + person(258, Y[3] - 2, 0.8, C.coral) + P(`M226 ${Y[3] - 12} L232 ${Y[3] - 4} L236 ${Y[3] - 14} L242 ${Y[3] - 6}`, C.red, 3));
      s += f.H("stp", G("rotate(-8 334 82)", R(282, 67, 104, 30, "rgba(255,255,255,.94)", 6, `stroke="${C.green}" stroke-width="3.5"`) + f.TK("stT", 334, 88, "", 15, C.green)));
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      const show = s.show == null ? 4 : s.show, tg = s.tags || {};
      for (let i = 0; i < 4; i++) {
        c.op("t" + i, i < show ? (s.hl != null && s.hl !== i && s.dim ? 0.35 : 1) : 0, { dl: 0.12 * i });
        c.mv("t" + i, { x: i < show ? 0 : -20, s: s.hl === i ? 1.03 : 1 });
        c.op("h" + i, s.hl === i ? 1 : 0);
        c.note("tg" + i, tg[i] ? (typeof tg[i] === "string" ? { t: tg[i], c: "N" } : tg[i]) : null, { dl: 0.3 + 0.1 * i });
      }
      c.dr("esc", s.esc || 0, { d: 1.3 }); c.op("eh", (s.esc || 0) >= 1 ? 1 : 0, { dl: 1 });
      c.op("cf", s.cf ? 1 : 0);
      c.tx("stT", s.stamp || ""); c.op("stp", s.stamp ? 1 : 0, { dl: 0.5 }); c.mv("stp", { s: s.stamp ? 1 : 1.4 }, { dl: 0.5 });
      c.note("nt", s.nt);
    }
  };
}

// template: Animated treemap — https://observablehq.com/@d3/animated-treemap
// Qasr's processes as tiles; a scope boundary that can be narrow, focused or broad; exclusions and dependencies.
function F_SCOPE(cfg) {
  const X = [72, 200, 328], Y = [72, 140, 208];
  const BOX = { n: [138, 108, 124, 64], f: [10, 40, 252, 134], b: [6, 40, 388, 202] };
  return {
    bench: "Animated treemap — https://observablehq.com/@d3/animated-treemap",
    draw(f) {
      let s = "";
      ["n", "f", "b"].forEach((k) => { const b = BOX[k]; s += f.H("b" + k, R(b[0], b[1], b[2], b[3], "rgba(23,143,128,.08)", 16, `stroke="${C.teal}" stroke-width="3.5" stroke-dasharray="9 6"`)); });
      cfg.tiles.forEach((t, i) => {
        const x = X[i % 3], y = Y[Math.floor(i / 3)];
        s += f.K("tl" + i, R(x - 56, y - 26, 112, 52, C.white, 10, `stroke="${C.navy2}" stroke-width="2"`) + ICO(t[1], x - 40, y, 0.55, C.navy2) + (t[0].indexOf("|") > -1 ? TF(x + 10, y - 2, t[0].split("|")[0], 12, 84) + TF(x + 10, y + 13, t[0].split("|")[1], 12, 84) : TF(x + 10, y + 5, t[0], 12, 84)));
        s += f.H("x" + i, R(x - 56, y - 26, 112, 52, "rgba(93,115,137,.55)", 10) + xmark(x + 40, y - 12, 0.7, C.white, 3));
        s += f.H("w" + i, R(x - 60, y - 30, 120, 60, "none", 12, `stroke="${C.red}" stroke-width="3" class="a-pulse"`));
      });
      s += f.H("dep", P(`M256 ${Y[1]} H270`, C.red, 3) + arrowHead(272, Y[1], 0, C.red) + P(`M200 ${Y[1] - 26} V${Y[0] + 28}`, C.red, 3) + arrowHead(200, Y[0] + 26, -90, C.red));
      s += f.N("bl", 200, 22, 14); s += f.N("nt", 200, 276, 13);
      return s;
    },
    render(c, s) {
      ["n", "f", "b"].forEach((k) => c.op("b" + k, s.box === k ? 1 : 0));
      cfg.tiles.forEach((_, i) => {
        c.op("tl" + i, has(s.hide, i) ? 0.15 : 1, { dl: 0.04 * i });
        c.op("x" + i, has(s.x, i) ? 1 : 0, { dl: 0.2 }); c.op("w" + i, has(s.w, i) ? 1 : 0);
        c.mv("tl" + i, { s: s.hl === i ? 1.08 : 1 });
      });
      c.op("dep", s.dep ? 1 : 0);
      c.note("bl", s.bl ? { t: s.bl, c: "T", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: contract process — https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8
// The strategy mandate as a document: scattered notes become sections, sections get ticked, a stamp, a handover.
function F_DOC(cfg) {
  const rows = cfg.rows;
  return {
    bench: "contract process — https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8",
    draw(f) {
      let s = f.H("sc", G("rotate(-12 70 70)", R(36, 52, 70, 46, C.cream, 4, `stroke="${C.gold}" stroke-width="2"`) + P("M44 66 H96 M44 76 H86", C.amber, 2)) +
        G("rotate(9 330 70)", R(296, 50, 72, 48, C.white, 4, `stroke="${C.navy2}" stroke-width="2"`) + P("M304 64 H358 M304 74 H340", C.navy2, 2)) +
        G("rotate(6 60 220)", R(24, 196, 70, 46, C.rose, 4, `stroke="${C.coral}" stroke-width="2"`) + P("M32 210 H84 M32 220 H72", C.coral, 2)) +
        G("rotate(-8 340 220)", R(304, 198, 70, 46, C.mint, 4, `stroke="${C.green}" stroke-width="2"`) + P("M312 212 H364 M312 222 H350", C.green, 2)) +
        T(200, 150, "?", 40, C.slate, 'class="a-pulse"'));
      s += f.K("pg", F("M112 26 H268 L288 46 V262 H112 Z", C.white, `stroke="${C.navy}" stroke-width="2.5"`) + F("M268 26 V46 H288", C.sky, `stroke="${C.navy}" stroke-width="2"`) +
        R(112, 46, 176, 30, C.navy) + T(200, 66, cfg.title, 14, C.white) +
        rows.map((r, i) => { const y = rows.length > 4 ? 92 + i * 30 : 96 + i * 34; return f.K("r" + i, R(122, y - 13, 156, 28, "#f1f4f7", 7) + ICO(r[1], 138, y + 1, 0.5, C.navy2) + TF(152, y + 6, r[0], 12, 112, C.ink, "start")) + f.H("k" + i, ICO("check", 279, y + 1, 0.55)) + f.H("q" + i, ICO("warn", 279, y + 1, 0.55)); }).join(""));
      s += f.H("sA", G("rotate(-12 200 252)", R(140, 235, 120, 34, "rgba(255,255,255,.92)", 6, `stroke="${C.green}" stroke-width="3.5"`) + T(200, 258, "ACCEPTED", 16, C.green)));
      s += f.H("sC", G("rotate(-12 200 252)", R(128, 235, 144, 34, "rgba(255,255,255,.92)", 6, `stroke="${C.amber}" stroke-width="3.5"`) + T(200, 258, "CONDITIONAL", 16, C.amber)));
      s += f.H("sX", G("rotate(-12 200 252)", R(140, 235, 120, 34, "rgba(255,255,255,.92)", 6, `stroke="${C.red}" stroke-width="3.5"`) + T(200, 258, "UNCLEAR", 16, C.red)));
      s += f.H("ho", P("M292 150 H330", C.teal, 4, 'class="a-flow"') + arrowHead(338, 150, 0, C.teal) + ICO("people", 364, 150, 0.95, C.teal) + T(364, 182, "Teams", 12, C.teal));
      s += f.H("sp", ICO("sponsor", 48, 150, 1.15, C.plum) + T(48, 182, "Sponsor", 12, C.plum));
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      const n = s.rows == null ? rows.length : s.rows, ok = s.ok || [], q = s.q || [];
      c.op("sc", s.scat ? 1 : 0); c.op("pg", s.scat ? 0.15 : 1); c.mv("pg", { s: s.scat ? 0.92 : 1 });
      for (let i = 0; i < rows.length; i++) {
        c.op("r" + i, i < n && !s.scat ? (s.hl != null && s.hl !== i ? 0.4 : 1) : 0, { dl: 0.1 * i }); c.mv("r" + i, { x: i < n ? 0 : 16 });
        c.op("k" + i, ok === "all" || has(ok, i) ? 1 : 0, { dl: 0.3 + 0.12 * i }); c.op("q" + i, has(q, i) ? 1 : 0, { dl: 0.3 });
      }
      ["A", "C", "X"].forEach((k) => { c.op("s" + k, s.stamp === k ? 1 : 0, { dl: 0.4 }); c.mv("s" + k, { s: s.stamp === k ? 1 : 1.5 }, { dl: 0.4 }); });
      c.op("ho", s.ho ? 1 : 0); c.op("sp", s.sp ? 1 : 0);
      c.note("nt", s.nt);
    }
  };
}

// template: Animated line chart lesson — https://observablehq.com/@d3/learn-d3-animation
// Baseline, target and measured line over time, with the spread of individual results.
function F_CHART(cfg) {
  const x0 = 54, x1 = 372, y0 = 236, y1 = 56, mx = cfg.max;
  const Yv = (v) => r1(y0 - (v / mx) * (y0 - y1));
  const pts = cfg.series.map((v, i) => [r1(x0 + i * (x1 - x0) / (cfg.series.length - 1)), Yv(v)]);
  const line = "M" + pts.map((p) => p[0] + " " + p[1]).join(" L");
  const band = "M" + pts.map((p, i) => p[0] + " " + r1(p[1] - cfg.spread[i])).join(" L") + " L" + pts.slice().reverse().map((p, i) => p[0] + " " + r1(p[1] + cfg.spread[cfg.spread.length - 1 - i])).join(" L") + " Z";
  return {
    bench: "Animated line chart lesson — https://observablehq.com/@d3/learn-d3-animation",
    draw(f) {
      let s = R(8, 24, 384, 248, C.white, 14, `stroke="${C.line}" stroke-width="2"`);
      s += P(`M${x0} ${y1 - 6} V${y0} H${x1 + 6}`, C.slate, 2.5) + T(x0 - 8, Yv(0) + 4, "0", 12, C.slate, "", "end") + T(x0 - 8, Yv(mx / 2) + 4, String(mx / 2), 12, C.slate, "", "end") + T(x0 - 8, Yv(mx) + 4, String(mx), 12, C.slate, "", "end");
      s += T((x0 + x1) / 2, 258, cfg.xl || "Weeks", 12, C.slate) + T(18, 46, cfg.unit, 12, C.slate, "", "start");
      s += f.H("band", F(band, "rgba(192,57,43,.14)"));
      s += f.H("go", P(`M${pts[cfg.live][0]} ${y1} V${y0}`, C.plum, 2.5, 'stroke-dasharray="5 4"') + chip(pts[cfg.live][0], y1 - 6, "Redesign live", { st: C.plum, sz: 11, free: 1 }));
      s += f.K("bl", P(`M${x0} ${Yv(cfg.base)} H${x1}`, C.coral, 3, 'stroke-dasharray="8 6"'));
      s += f.K("tl", P(`M${x0} ${Yv(cfg.tgt)} H${x1}`, C.green, 3.5));
      s += f.D("ml", line, C.navy, 4);
      s += f.H("ol", cfg.out.map((o) => O(pts[o[0]][0], Yv(o[1]), 5, C.red, `stroke="${C.white}" stroke-width="1.5"`)).join(""));
      s += f.N("bT", 300, Yv(cfg.base) - 14, 12); s += f.N("tT", 300, Yv(cfg.tgt) + 16, 12);
      s += f.N("nt", 200, 287, 13);
      return s;
    },
    render(c, s) {
      c.op("bl", s.bl ? 1 : 0); c.op("tl", s.tl ? 1 : 0);
      c.note("bT", s.bl ? { t: cfg.bT, c: "O", f: 1 } : null); c.note("tT", s.tl ? { t: cfg.tT, c: "G", f: 1 } : null);
      c.dr("ml", s.ml || 0, { d: 1.6 }); c.op("band", s.band ? 1 : 0); c.op("ol", s.ol ? 1 : 0, { dl: 0.3 }); c.cl("ol", "a-blink", !!s.ol);
      c.op("go", s.go ? 1 : 0);
      c.note("nt", s.nt);
    }
  };
}

// template: Payment Successful — https://lottiefiles.com/free-animation/payment-successful-5uXFkB4jix
// Four proposal cards and a budget of two coins: coins drop on the funded pair; the rest are deferred, not discarded.
function F_BUDGET() {
  const X = [56, 152, 248, 344], NM = [["Guest", "arrival", "guest"], ["Stock", "counting", "box"], ["Corporate", "billing", "invoice"], ["Spa", "booking", "spa"]];
  return {
    bench: "Payment Successful — https://lottiefiles.com/free-animation/payment-successful-5uXFkB4jix",
    draw(f) {
      let s = R(120, 14, 160, 30, C.navy, 15) + T(200, 34, "Budget: 2 of 4", 15, C.white);
      X.forEach((x, i) => {
        s += f.H("fg" + i, R(x - 48, 110, 96, 128, "none", 14, `stroke="${C.green}" stroke-width="4" class="a-pulse"`));
        s += f.K("cd" + i, R(x - 43, 116, 86, 116, C.white, 12, `stroke="${C.navy2}" stroke-width="2.5"`) + ICO(NM[i][2], x, 152, 1, C.navy2) + T(x, 196, NM[i][0], 13, C.ink) + T(x, 213, NM[i][1], 13, C.ink));
        s += f.H("df" + i, G(`rotate(-14 ${x} 146)`, R(x - 40, 134, 80, 22, "rgba(255,255,255,.94)", 5, `stroke="${C.slate}" stroke-width="2.5"`) + T(x, 150, "DEFERRED", 12, C.slate)));
        s += f.N("vk" + i, x, 252, 11);
      });
      s += f.H("cr", ICO("crown", 344, 106, 0.7));
      for (let k = 0; k < 2; k++) s += f.K("c" + k, ICO("coin", 176 + k * 48, 70, 0.95));
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      const n = s.cards == null ? 4 : s.cards, fund = s.fund || [];
      for (let i = 0; i < 4; i++) {
        c.op("cd" + i, i < n ? (s.hl != null && s.hl !== i ? 0.4 : 1) : 0, { dl: 0.1 * i });
        c.mv("cd" + i, { y: i < n ? 0 : 16, s: s.hl === i ? 1.06 : 1 });
        c.op("fg" + i, has(fund, i) ? 1 : 0, { dl: 0.6 }); c.op("df" + i, has(s.def, i) ? 1 : 0, { dl: 0.5 });
        c.note("vk" + i, s.vk && s.vk[i] ? { t: s.vk[i], c: "S" } : null);
      }
      for (let k = 0; k < 2; k++) {
        const tgt = fund[k];
        c.mv("c" + k, tgt == null ? {} : { x: X[tgt] - (176 + k * 48), y: 30 }, { d: 1, dl: 0.15 * k, e: "bounce.out" });
      }
      c.op("cr", s.crown ? 1 : 0); c.cl("cr", "a-pulse", !!s.crown);
      c.note("nt", s.nt);
    }
  };
}

// template: Interactive Computer Assembly Sequence — https://codepen.io/karlhorning/pen/OJqNMVR
// A concept assembled from its parts: the term on top, its components slide in and lock underneath.
function F_DEFINE(cfg) {
  const parts = cfg.parts, n = parts.length, slot = Math.min(98, 384 / n), w = slot - 10;
  const X = parts.map((_, i) => r1(200 + (i - (n - 1) / 2) * slot));
  const col = NC[cfg.c || "N"];
  return {
    bench: "Interactive Computer Assembly Sequence — https://codepen.io/karlhorning/pen/OJqNMVR",
    draw(f) {
      const tw0 = Math.min(372, tw(cfg.term, 17) + 40);
      let s = f.K("term", R(200 - tw0 / 2, 26, tw0, 44, col, 22) + ICO(cfg.icon || "doc", 200 - tw0 / 2 + 24, 48, 0.62, C.white) + T(200 + 12, 54, cfg.term, 17, C.white));
      parts.forEach((p, i) => {
        const pc = NC[p[3] || "N"];
        s += f.D("ln" + i, `M200 70 C200 100 ${X[i]} 104 ${X[i]} 132`, pc, 2.5);
        s += f.H("hr" + i, R(X[i] - w / 2 - 5, 129, w + 10, 112, "none", 14, `stroke="${C.gold}" stroke-width="4" class="a-pulse"`));
        s += f.K("p" + i, R(X[i] - w / 2, 134, w, 102, C.white, 12, `stroke="${pc}" stroke-width="2.5"`) + R(X[i] - w / 2, 134, w, 7, pc, 3) + ICO(p[2], X[i], 166, 0.9, pc) + TF(X[i], 206, p[0], 13, w - 8) + TF(X[i], 222, p[1] || "", 13, w - 8));
      });
      s += f.N("nt", 200, 266, 13); s += f.N("n2", 200, 102, 12);
      return s;
    },
    render(c, s) {
      const k = s.n == null ? n : s.n;
      c.mv("term", { s: s.pop ? 1.05 : 1 });
      for (let i = 0; i < n; i++) {
        c.op("p" + i, i < k ? (s.hl != null && s.hl !== i ? 0.4 : 1) : 0, { dl: 0.12 * i });
        c.mv("p" + i, { y: i < k ? 0 : 50, s: s.hl === i ? 1.06 : 1 }, { dl: 0.12 * i });
        c.dr("ln" + i, i < k ? 1 : 0, { dl: 0.12 * i + 0.2 }); c.op("hr" + i, s.hl === i ? 1 : 0);
      }
      c.note("nt", s.nt); c.note("n2", s.n2);
    }
  };
}

// template: Sankey animation - acyclic graph — https://observablehq.com/@joaormendes/sankey-animation-acyclic-graph
// Several influences flowing into one result: a single cause cannot claim the whole outcome.
function F_SANKEY(cfg) {
  const src = cfg.src, Ys = src.map((_, i) => 64 + i * 56), OX = 318, OY = 150;
  return {
    bench: "Sankey animation - acyclic graph — https://observablehq.com/@joaormendes/sankey-animation-acyclic-graph",
    draw(f) {
      let s = "";
      src.forEach((sr, i) => {
        const col = NC[sr[2] || "N"];
        s += f.D("fl" + i, `M150 ${Ys[i]} C230 ${Ys[i]} 220 ${OY + (i - (src.length - 1) / 2) * 12} ${OX - 46} ${OY + (i - (src.length - 1) / 2) * 12}`, col, sr[1], 'stroke-linecap="butt" opacity=".55"');
        s += f.K("s" + i, R(12, Ys[i] - 21, 138, 42, C.white, 10, `stroke="${col}" stroke-width="2.5"`) + ICO(sr[3] || "gear", 32, Ys[i], 0.55, col) + TF(48, Ys[i] + 5, sr[0], 13, 96, C.ink, "start"));
        s += f.H("q" + i, ICO("q", 210, Ys[i] + (OY - Ys[i]) * 0.4, 0.7));
      });
      s += f.K("out", O(OX, OY, 48, C.white, `stroke="${C.coral}" stroke-width="4"`) + ICO(cfg.icon || "growth", OX, OY - 8, 1.1, C.coral) + T(OX, OY + 30, cfg.out, 12, C.coral));
      s += f.N("ttl", 200, 22, 14); s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      const n = s.show == null ? src.length : s.show;
      src.forEach((_, i) => {
        c.op("s" + i, i < n ? (s.hl != null && s.hl !== i ? 0.45 : 1) : 0, { dl: 0.12 * i });
        c.dr("fl" + i, i < n ? 1 : 0, { dl: 0.2 + 0.12 * i });
        c.op("q" + i, s.q === i ? 1 : 0, { dl: 0.5 });
      });
      c.mv("out", { s: s.pop ? 1.08 : 1 });
      c.note("ttl", s.ttl ? { t: s.ttl, c: "N", f: 1 } : null); c.note("nt", s.nt);
    }
  };
}

// template: Celonis Process Explorer map — https://help.celonis.com/cpm47/en/process-explorer
// Local optimisation: one department hits its target in the spotlight while the connected parts turn red.
function F_SPOT(cfg) {
  const P4 = [[78, 64], [322, 64], [78, 236], [322, 236]];
  return {
    bench: "Celonis Process Explorer map — https://help.celonis.com/cpm47/en/process-explorer",
    draw(f) {
      let s = R(0, 0, 400, 300, "#22344a");
      s += f.H("cone", F("M170 -10 H230 L292 196 H108 Z", "rgba(255,240,180,.22)"));
      P4.forEach((p, i) => { s += f.K("ln" + i, P(`M200 150 L${p[0]} ${p[1]}`, C.muted, 3, 'stroke-dasharray="6 6" class="a-flow"')); });
      s += f.H("rp", `<g class="a-pulse">${O(200, 150, 92, "none", `stroke="${C.red}" stroke-width="3" opacity=".7"`)}</g>`);
      s += f.K("ctr", R(132, 118, 136, 64, C.white, 14, `stroke="${C.teal}" stroke-width="3"`) + ICO(cfg.center[1], 160, 150, 0.8, C.teal) + T(214, 156, cfg.center[0], 14, C.ink));
      s += f.H("met", chip(200, 202, "Target met", { st: C.green, bg: C.green, fg: C.white, sz: 13, free: 1 }));
      cfg.around.forEach((a, i) => {
        const p = P4[i];
        s += f.K("o" + i, R(p[0] - 70, p[1] - 26, 140, 52, C.white, 12, `stroke="${C.navy2}" stroke-width="2.5"`) + ICO(a[1], p[0] - 50, p[1], 0.6, C.navy2) + TF(p[0] + 12, p[1] + 5, a[0], 13, 104));
        s += f.H("b" + i, R(p[0] - 70, p[1] - 26, 140, 52, "rgba(192,57,43,.2)", 12, `stroke="${C.red}" stroke-width="3"`) + ICO("warn", p[0] + 62, p[1] - 24, 0.6));
      });
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      c.op("cone", s.spot ? 1 : 0); c.op("met", s.met ? 1 : 0, { dl: 0.3 }); c.op("rp", s.rp ? 1 : 0);
      for (let i = 0; i < 4; i++) {
        c.op("o" + i, s.dim ? 0.35 : 1); c.op("b" + i, has(s.bad, i) ? 1 : 0, { dl: 0.2 + 0.2 * i });
        c.sk("ln" + i, has(s.bad, i) ? C.red : C.muted);
      }
      c.note("nt", s.nt);
    }
  };
}

// template: Roadmap / Project schedule — https://lottiefiles.com/free-animation/roadmapproject-schedule-krKjaLHUr0
// The assessed forum week: post by mid-week, reply to two peers (one disagreement), read the summary.
function F_FORUM() {
  const DX = [40, 93, 147, 200, 253, 307, 360], DN = ["M", "T", "W", "T", "F", "S", "S"];
  return {
    bench: "Roadmap / Project schedule — https://lottiefiles.com/free-animation/roadmapproject-schedule-krKjaLHUr0",
    draw(f) {
      let s = P("M40 34 H360", C.line, 4) + DX.map((x, i) => O(x, 34, 8, C.white, `stroke="${C.navy2}" stroke-width="2.5"`) + T(x, 16, DN[i], 12, C.slate)).join("");
      s += f.H("mid", ICO("flag", 200, 30, 0.75) + chip(200, 60, "Post by mid-week", { st: C.coral, sz: 11, free: 1 }));
      s += f.K("day", O(40, 34, 11, C.coral, `stroke="${C.white}" stroke-width="3"`));
      s += f.H("post", R(12, 80, 176, 88, C.white, 12, `stroke="${C.navy}" stroke-width="2.5"`) + ICO("person", 36, 104, 0.8, C.navy) + T(56, 109, "Your position", 13, C.ink, "", "start") + P("M28 132 H170 M28 146 H150", C.line, 5));
      s += f.H("ev", chip(100, 178, "Concepts + evidence", { st: C.teal, sz: 11, free: 1 }));
      for (let i = 0; i < 2; i++) {
        const y = 80 + i * 78;
        s += f.H("p" + i, R(212, y, 176, 62, C.white, 12, `stroke="${C.slate}" stroke-width="2"`) + ICO("person", 234, y + 22, 0.7, [C.plum, C.gold][i]) + T(252, y + 27, "Peer " + (i + 1), 13, C.ink, "", "start") + P(`M228 ${y + 46} H368`, C.line, 5));
        s += f.D("r" + i, `M188 ${124} C200 ${124} 200 ${y + 31} 210 ${y + 31}`, C.teal, 3);
      }
      s += f.H("dis", chip(330, 228, "Reasoned disagreement", { st: C.red, sz: 11 }));
      s += f.H("sum", R(12, 200, 176, 56, C.cream, 12, `stroke="${C.gold}" stroke-width="2.5"`) + ICO("doc", 34, 228, 0.7, C.amber) + T(54, 225, "Facilitator", 13, C.ink, "", "start") + T(54, 242, "summary", 13, C.ink, "", "start"));
      s += f.H("pct", O(336, 268, 25, C.coral) + T(336, 274, "15%", 16, C.white));
      s += f.H("lo", chip(244, 262, "K1 · K2 · S1", { st: C.plum, sz: 12, free: 1 }));
      s += f.N("nt", 200, 288, 12);
      return s;
    },
    render(c, s) {
      const d = s.day == null ? 0 : s.day;
      c.mv("day", { x: DX[clamp(d, 0, 6)] - 40 }, { d: 1 });
      c.op("mid", s.mid ? 1 : 0); c.op("post", s.post ? 1 : 0); c.op("ev", s.ev ? 1 : 0, { dl: 0.3 });
      for (let i = 0; i < 2; i++) { c.op("p" + i, (s.peers || 0) > i ? 1 : 0, { dl: 0.15 * i }); c.dr("r" + i, (s.rep || 0) > i ? 1 : 0, { dl: 0.3 + 0.2 * i }); }
      c.op("dis", s.dis ? 1 : 0, { dl: 0.5 }); c.op("sum", s.sum ? 1 : 0); c.op("pct", s.pct ? 1 : 0); c.op("lo", s.lo ? 1 : 0, { dl: 0.2 });
      c.note("nt", s.nt);
    }
  };
}

// template: Success — https://lottiefiles.com/free-animation/success-he8DVHwbzM
// Delivery versus benefit: the change is installed (tick) but the benefit meter needs evidence, with owners for each.
function F_BENEFIT(cfg = {}) {
  return {
    bench: "Success — https://lottiefiles.com/free-animation/success-he8DVHwbzM",
    draw(f) {
      let s = R(26, 64, 140, 122, C.white, 14, `stroke="${C.navy2}" stroke-width="2.5"`) + ICO("gear", 96, 112, 1.3, C.navy2) + T(96, 168, cfg.left || "Delivered", 15, C.navy2);
      s += f.H("dk", ICO("check", 150, 72, 0.9));
      s += f.D("ar", "M172 126 H226", C.slate, 4); s += f.H("ah", arrowHead(232, 126, 0, C.slate));
      s += f.H("mg", ICO("mag", 200, 100, 0.8, C.ink));
      s += R(262, 40, 44, 160, C.white, 22, `stroke="${C.green}" stroke-width="3"`) + O(284, 206, 24, C.white, `stroke="${C.green}" stroke-width="3"`);
      s += f.K("mf", R(270, 48, 28, 148, C.green, 14), `data-pv="284 196"`) + O(284, 206, 18, C.green);
      s += f.H("mq", T(284, 132, "?", 40, C.coral, 'class="a-pulse"'));
      s += T(284, 26, cfg.right || "Benefit", 15, C.green);
      s += f.H("m2", R(334, 70, 30, 120, C.white, 15, `stroke="${C.red}" stroke-width="2.5"`) + R(340, 146, 18, 38, C.red, 9) + T(349, 58, cfg.m2 || "Rating", 12, C.red) + P("M372 120 V160", C.red, 3) + arrowHead(372, 166, 90, C.red));
      s += f.N("ol", 96, 220, 12); s += f.N("or", 284, 252, 12);
      s += f.N("nt", 200, 284, 13);
      return s;
    },
    render(c, s) {
      c.op("dk", s.done ? 1 : 0); c.dr("ar", s.ar ? 1 : 0); c.op("ah", s.ar ? 1 : 0, { dl: 0.6 }); c.op("mg", s.mg ? 1 : 0);
      c.mv("mf", { sy: Math.max(0.02, s.meter || 0), pv: [284, 196] }, { d: 1.2 });
      c.op("mq", s.q ? 1 : 0); c.op("m2", s.m2 ? 1 : 0);
      c.note("ol", s.own ? { t: cfg.lo || "Programme manager", c: "N" } : null); c.note("or", s.own ? { t: cfg.ro || "Line owner", c: "G", f: 1 } : null, { dl: 0.2 });
      c.note("nt", s.nt);
    }
  };
}

// =====================================================================
// W5O4a · Deliverables and acceptance criteria (30 narration lines)
// Story: decisions scattered across slides -> deliverables as tangible
// outputs -> the mandate document fills row by row -> without boundaries
// the team over-reaches -> rationale kept per initiative -> acceptance
// criteria, produced vs accepted -> conditional acceptance for billing ->
// controlled handover; the mandate becomes the yardstick for later phases.
// =====================================================================
{
  const id = "W5O4a";
  const plan = [
    ["title", { k: "Week 5 · Lesson 4", t1: "Deliverables and", t2: "acceptance criteria", sub: "A mandate later phases can use" }, "Deliverables and acceptance criteria"],
    ["doc", { scat: 1, nt: { t: "How will decisions reach teams?", c: "P" } }, "Getting decisions to the teams"],
    ["ask", { q: "What must Qasr produce before its improvement teams can begin working with confidence?", o: ["Slides?", "Memories?", "A mandate?"], oc: ["S", "S", "G"] }, "A good meeting is not enough"],
    ["deliv", { n: 3 }, "Deliverables: tangible outputs"],
    ["doc", { rows: 4, nt: "Objectives, map, trade-offs, exclusions" }, "What Qasr must produce"],
    ["doc", { rows: 5, sp: 1, ho: 1, nt: "Leaders ↔ improvement teams" }, "An agreement between leaders and teams"],
    ["flow", { up: 4, dr: 3, at: 3, good: [3], ttl: "From agreement to mandate", nt: { t: "Else: incompatible solutions", c: "R" } }, "Without it, teams diverge"],
    ["scope", { hl: 4, bl: "\"Improve service\"", nt: "No investment boundaries given" }, "Instructions without boundaries"],
    ["scope", { box: "b", w: [0, 8], bl: "Replace every system?", nt: { t: "Beyond the intended purpose", c: "R" } }, "The team over-reaches"],
    ["scope", { box: "f", bl: "Outcomes + processes", nt: "Which processes to investigate" }, "Name outcomes and processes"],
    ["scope", { box: "f", x: [2, 6, 7, 8], dep: 1, bl: "Exclusions · dependencies", nt: "Changes need sponsor approval" }, "Exclusions, dependencies, approvals"],
    ["just", { up: 1, ttl: "Arrival + billing, if approved", nt: "Still subject to sponsors" }, "The recommendation awaits approval"],
    ["just", { up: 4, dr: 3, at: 3, ttl: "Documenting the justification" }, "Each initiative keeps its rationale"],
    ["just", { up: 4, dr: 3, hl: 1, dim: 1, nt: { t: "Tempting options appear later", c: "A" } }, "Attractive alternatives will appear"],
    ["just", { up: 4, dr: 3, at: 1, hl: 1, dim: 1, nt: { t: "Still the original purpose?", c: "G" } }, "Test them against the purpose"],
    ["ask", { q: "How can Qasr determine whether its strategy-phase deliverables are actually ready for use?", o: ["Documents exist", "Ready for use"], oc: ["S", "G"] }, "Documents are not completion"],
    ["acc", { n: 3 }, "Acceptance criteria"],
    ["doc", { rows: 5, ok: [0], hl: 0, nt: "One agreed interpretation" }, "Objectives mean one thing"],
    ["vs", { show: "a", va: "w" }, "Boundaries and trade-offs explained"],
    ["vs", { show: "ab", va: "w", vb: "ok", nt: "More than a submitted report" }, "Accepted means confirmed clarity"],
    ["doc", { rows: 5, ok: [0, 1, 2, 3], q: [4], hl: 4, nt: "Record and assign assumptions" }, "Unresolved assumptions recorded"],
    ["doc", { rows: 5, ok: [0, 1, 2, 3], q: [4], hl: 4, nt: { t: "Billing costs uncertain", c: "A" } }, "Don't hide uncertainty"],
    ["just", { up: 4, dr: 3, gap: 1, ttl: "Billing: systems unverified", nt: { t: "Compatibility not yet tested", c: "R" } }, "Billing depends on unverified systems"],
    ["doc", { rows: 5, ok: [0, 1, 2, 3], q: [4], stamp: "C", nt: "Investigate, don't commit yet" }, "Conditional acceptance"],
    ["doc", { rows: 5, ok: [0, 1, 2, 3], q: [4], stamp: "C", nt: { t: "Approval ≠ proceed regardless", c: "R" } }, "Approval is not a blank cheque"],
    ["handover", { up: 4, dr: 3, at: 2, hl: 2, ttl: "Acceptance and controlled handover", nt: "Who approves revisions?" }, "Name who approves revisions"],
    ["handover", { up: 4, dr: 3, at: 3, good: [3], nt: "Later phases judged against it" }, "The yardstick for every later phase"],
    ["doc", { rows: 5, ok: "all", stamp: "A", ho: 1, nt: "Purpose and limits understood" }, "Teams work with confidence"],
    ["doc", { rows: 5, ok: "all", stamp: "A", ho: 1, sp: 1, nt: "More than meeting agreement" }, "More than agreement in a meeting"],
    ["ask", { q: "What would you require before accepting Qasr's strategy-phase mandate as ready for handover?", o: ["Clear objectives", "Scope, exclusions", "Named owners"], oc: ["N", "T", "P"] }, "A direction later phases can test"]
  ];
  window.VL_SCENES["W5O4a"] = makeScene({
    id, bg: "#eff1f4", plan,
    desc: "Qasr's scattered strategy decisions become a mandate: objectives with measures, an objective-process map, signed trade-offs, exclusions and assumptions, accepted against criteria (conditionally for billing) before a controlled handover.",
    fams: {
      title: F_TITLE({ icon: "doc", col: C.navy }), // template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
      doc: F_DOC({ title: "Improvement mandate", rows: [["Objectives + measures", "target"], ["Objective-process map", "map"], ["Signed trade-offs", "scale"], ["Agreed exclusions", "fence"], ["Assumptions, owners", "warn"]] }), // template: contract process — https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8
      ask: F_ASK(), // template: Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD
      deliv: F_DEFINE({ term: "Deliverables", icon: "doc", c: "N", parts: [["Tangible", "outputs", "doc", "N"], ["Communicate", "decisions", "chat", "T"], ["Basis for", "later work", "map", "G"]] }), // template: Interactive Computer Assembly Sequence — https://codepen.io/karlhorning/pen/OJqNMVR
      flow: F_CHAIN({ nodes: [["Strategic", "objectives", "target", "N"], ["Investment", "priorities", "coin", "A"], ["Approved", "scope", "fence", "T"], ["Improvement", "mandate", "doc", "G"]] }), // template: Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO
      scope: F_SCOPE({ tiles: [["Reservations|system", "gear"], ["Corporate|arrivals", "handshake"], ["Contracts", "doc"], ["Housekeeping", "bed"], ["Guest|arrival", "bell"], ["Billing", "invoice"], ["Finance", "coin"], ["Spa", "spa"], ["IT systems", "gear"]] }), // template: Animated treemap — https://observablehq.com/@d3/animated-treemap
      just: BENCH(F_CHAIN({ nodes: [["Selected", "initiative", "guest", "T"], ["Strategic", "contribution", "target", "O"], ["Expected", "benefits", "growth", "G"], ["Sponsor", "approval", "sponsor", "P"]] }), "Git Workflow 1 — https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5"), // template: Git Workflow 1 — https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5
      acc: BENCH(F_DEFINE({ term: "Acceptance criteria", icon: "check", c: "G", parts: [["Complete", "enough", "doc", "N"], ["Clear", "to everyone", "eye", "T"], ["Usable", "by teams", "gear", "G"]] }), "Checklist — https://lottiefiles.com/free-animation/checklist-c1qt4p98BW"), // template: Checklist — https://lottiefiles.com/free-animation/checklist-c1qt4p98BW
      vs: F_VS({ a: { t: "Document produced", icon: "doc", c: "S", items: ["It exists", "Still ambiguous", "Who decides?"] }, b: { t: "Deliverable accepted", icon: "check", c: "G", items: ["Sponsors confirm", "Clear scope", "Clear roles"] } }), // template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
      handover: BENCH(F_CHAIN({ nodes: [["Review", "deliverables", "mag", "N"], ["Resolve or", "record gaps", "warn", "A"], ["Authorised", "acceptance", "sponsor", "P"], ["Controlled", "handover", "people", "G"]] }), "Approved Seal — https://lottiefiles.com/free-animation/approved-seal-seal-approval-loader-6o8fKZVBbx") // template: Approved Seal — https://lottiefiles.com/free-animation/approved-seal-seal-approval-loader-6o8fKZVBbx
    }
  });
}


// =====================================================================
// W5O4b · Benefits, baselines, targets and accountability (28 lines)
// Story: the redesign is live but is anyone better off? -> a benefit is
// valuable change linked to objectives -> arrival waits: baseline 12 min,
// provisional target 8, the spread behind the average -> billing benefits
// and the many forces behind growth -> delivery vs benefits accountability
// -> a benefits conflict -> an accountable review loop.
// =====================================================================
{
  const id = "W5O4b";
  const plan = [
    ["title", { k: "Week 5 · Lesson 4", t1: "Benefits, baselines,", t2: "targets, accountability", sub: "Prove the value, name the owner" }, "Benefits, baselines, targets, owners"],
    ["benefit", { meter: 0.04, q: 1, nt: "Will the promised value appear?" }, "How will anyone know it worked?"],
    ["ask", { q: "What evidence would convince you that Qasr's investment has actually delivered its intended benefits?", o: ["Redesign finished", "Guests better off"], oc: ["S", "G"] }, "Activity is not improvement"],
    ["benefit", { done: 1, meter: 0.04, nt: "Live in participating hotels" }, "The redesign is introduced"],
    ["benefit", { done: 1, ar: 1, mg: 1, meter: 0.04, q: 1, nt: { t: "Delivered, benefit unverified", c: "R" } }, "Delivery versus benefit"],
    ["define", { n: 3 }, "A benefit is valuable change"],
    ["define", { n: 3, nt: { t: "Not tasks done or tech installed", c: "R" } }, "Benefits connect to objectives"],
    ["arr", { up: 3, dr: 2, at: 2, ttl: "Fewer avoidable delays" }, "The proposed arrival benefit"],
    ["arr", { up: 4, dr: 3, at: 3, ttl: "Connecting delivery to benefits", nt: "Evidence after go-live" }, "Evidence after the redesign"],
    ["chart", { bl: 1, nt: "Documented before the change" }, "Baseline: starting performance"],
    ["chart", { bl: 1, nt: "Defined peak periods" }, "12 minutes at peak (illustrative)"],
    ["chart", { bl: 1, tl: 1, nt: { t: "Provisional: check feasibility", c: "A" } }, "Provisional target: 8 minutes"],
    ["chart", { bl: 1, tl: 1, nt: "Intended, not predicted" }, "A target is an intention"],
    ["chart", { bl: 1, tl: 1, go: 1, ml: 1, band: 1, ol: 1, nt: { t: "Averages can hide long waits", c: "R" } }, "Watch the variation"],
    ["chart", { bl: 1, tl: 1, go: 1, ml: 1, band: 1, ol: 1, nt: { t: "Safeguards: feedback, accuracy", c: "P" } }, "Speed without rushed service"],
    ["bill", { up: 1, ttl: "Billing needs its own logic" }, "Corporate billing benefits"],
    ["bill", { up: 4, dr: 3, at: 3, ttl: "Corporate billing benefits", nt: "Disputes, resolution time, feedback" }, "Disputes, resolution times, feedback"],
    ["sankey", { show: 1, q: 0, ttl: "Contribution, not proof" }, "Indicators, not proof of cause"],
    ["sankey", { show: 4, q: 0, nt: "Many forces move growth" }, "Other forces shape growth"],
    ["review", { up: 3, dr: 2, ttl: "Measurement arrangements", nt: "Definitions, sources, periods" }, "Definitions, data, review periods"],
    ["vs", { show: "a", va: "ok" }, "Delivery accountability"],
    ["vs", { show: "ab", va: "ok", vb: "ok", hl: "b", nt: "Line owner, not project manager" }, "The benefit belongs to the line owner"],
    ["benefit", { done: 1, meter: 0.5, own: 1, nt: "Agree it, don't assume it" }, "Ownership must be agreed"],
    ["benefit", { done: 1, meter: 0.7, m2: 1, own: 1, nt: { t: "Waits better, satisfaction worse", c: "R" } }, "A benefits conflict"],
    ["benefit", { done: 1, meter: 0.7, m2: 1, own: 1, mg: 1, nt: "Investigate, report both" }, "Report both results"],
    ["review", { up: 4, dr: 3, at: 3, hl: 3, nt: { t: "Sponsor authorises corrections", c: "P" } }, "Sponsors authorise corrective action"],
    ["review", { up: 4, dr: 3, at: 3, good: [3], ttl: "Accountable benefits review" }, "Benefits, measures, owners, reviews"],
    ["ask", { q: "Can you distinguish a completed deliverable from a realised benefit and identify who should account for each?", o: ["Deliverable: manager", "Benefit: line owner"], oc: ["N", "G"] }, "Demonstrate value, not activity"]
  ];
  window.VL_SCENES["W5O4b"] = makeScene({
    id, bg: "#edf3ee", plan,
    desc: "A finished arrival redesign is not yet a benefit: a 12-minute peak baseline and provisional 8-minute target with their spread, billing benefits among many causes of growth, and benefits owned by the line owner.",
    fams: {
      title: F_TITLE({ icon: "target", col: C.green }), // template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
      benefit: F_BENEFIT({ left: "Delivered", right: "Benefit", m2: "Rating", lo: "Programme manager", ro: "Line owner" }), // template: Success — https://lottiefiles.com/free-animation/success-he8DVHwbzM
      ask: F_ASK(), // template: Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD
      define: F_DEFINE({ term: "Benefit", icon: "growth", c: "G", parts: [["Valuable", "change", "star", "G"], ["e.g. greater", "reliability", "clock", "T"], ["or lower", "costs", "costdown", "A"]] }), // template: Interactive Computer Assembly Sequence — https://codepen.io/karlhorning/pen/OJqNMVR
      arr: F_CHAIN({ nodes: [["Redesigned", "arrival process", "gear", "N"], ["More reliable", "arrivals", "clock", "T"], ["Improved guest", "experience", "guest", "T"], ["Strategic", "contribution", "target", "O"]] }), // template: Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO
      chart: F_CHART({ max: 16, base: 12, tgt: 8, unit: "Minutes", xl: "Weeks", bT: "Baseline 12 min", tT: "Target 8 min", series: [12.2, 11.8, 12.3, 12, 10.6, 9.7, 9.1, 8.6, 8.4], spread: [3, 3.4, 3, 3.2, 3, 2.8, 2.6, 2.4, 2.4], out: [[6, 14.5], [7, 13.8]], live: 3 }), // template: Animated line chart lesson — https://observablehq.com/@d3/learn-d3-animation
      bill: BENCH(F_CHAIN({ nodes: [["Billing", "redesign", "invoice", "N"], ["Fewer invoice", "disputes", "check", "N"], ["More reliable", "relationships", "handshake", "O"], ["Corporate", "growth support", "growth", "O"]] }), "Product Workflow Animation & UI Motion Design — https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design"), // template: Product Workflow Animation & UI Motion Design — https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design
      sankey: F_SANKEY({ out: "Account growth", icon: "growth", src: [["Billing changes", 10, "N", "invoice"], ["Market conditions", 18, "P", "chart"], ["Pricing", 12, "A", "coin"], ["Sales activity", 16, "T", "handshake"]] }), // template: Sankey animation - acyclic graph — https://observablehq.com/@joaormendes/sankey-animation-acyclic-graph
      review: BENCH(F_CHAIN({ nodes: [["Verified", "baseline", "ruler", "O"], ["Agreed", "target", "target", "G"], ["Measured", "result", "chart", "N"], ["Owner", "review", "person", "P"]] }), "Circle Cycle animation — https://lottiefiles.com/free-animation/circle-cycle-animation-mToapdLFt0"), // template: Circle Cycle animation — https://lottiefiles.com/free-animation/circle-cycle-animation-mToapdLFt0
      vs: F_VS({ a: { t: "Delivery accountability", icon: "gear", c: "N", items: ["Programme manager", "Changes implemented", "Within boundaries"] }, b: { t: "Benefits accountability", icon: "target", c: "G", items: ["Line owner", "Monitors results", "Explains shortfalls"] } }) // template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
    }
  });
}


// =====================================================================
// W5O4c · Strategic discipline and forum preparation (34 narration lines)
// Story: what keeps priorities alive -> strategic discipline -> a cheaper
// redesign that drops personal help, tested against purpose and boundaries
// -> billing disputes fall, but is the relationship stronger? -> the
// strategy phase as foundation -> the assessed forum: read, post by
// mid-week, two replies, one reasoned disagreement, transfer the reasoning.
// =====================================================================
{
  const id = "W5O4c";
  const plan = [
    ["title", { k: "Week 5 · Lesson 4", t1: "Strategic discipline", t2: "and forum preparation", sub: "Keep choices tied to purpose" }, "Strategic discipline and the forum"],
    ["route", { lit: 1, at: 0, first: 1, l0: 1, lr: 1, nt: "Beyond this funding decision" }, "What makes this work valuable"],
    ["ask", { q: "What would prevent Qasr's strategic priorities from disappearing once detailed process improvement begins?", o: ["Question attractive ideas", "Keep real benefits"], oc: ["P", "G"] }, "Question without dismissing"],
    ["disc", { n: 3 }, "Strategic discipline"],
    ["disc", { n: 3, nt: { t: "Pressures can redirect a programme", c: "R" } }, "Pressure can pull a programme off course"],
    ["desk", { n: 5, staff: 1, wait: "14 min", cost: "Cheaper design", cc: "G", alerts: ["No help at peaks"], nt: "A cheaper arrival redesign" }, "A cheaper redesign appears"],
    ["desk", { n: 5, staff: 1, wait: "14 min", cost: "Cheaper design", cc: "G", stars: 2, mood: "sad", alerts: ["No help at peaks", "Service at risk"], nt: { t: "The reason we invested", c: "R" } }, "It undermines the original purpose"],
    ["adj", { up: 1, ttl: "Approval is not a blank cheque", nt: { t: "Not every efficiency is allowed", c: "R" } }, "An approved project still has limits"],
    ["adj", { up: 4, dr: 3, at: 2, hl: 2, ttl: "Testing a proposed adjustment" }, "Check purpose and boundaries"],
    ["adj", { up: 4, dr: 3, at: 3, hl: 3, nt: "Significant conflict → sponsor" }, "Escalate significant conflicts"],
    ["adj", { up: 4, dr: 3, at: 3, good: [3], nt: { t: "Adapt with the right authority", c: "G" } }, "Learning stays possible"],
    ["rev", { up: 1, good: [0], ttl: "Fewer billing disputes", nt: "An encouraging process result" }, "Billing disputes fall"],
    ["rev", { up: 3, dr: 2, at: 2, good: [0], hl: 2, nt: { t: "Relationships genuinely stronger?", c: "A" } }, "Are relationships stronger?"],
    ["rev", { up: 4, dr: 3, at: 1, good: [0, 1], nt: "Compare with agreed baselines" }, "Verified against baselines"],
    ["rev", { up: 4, dr: 3, at: 3, good: [0, 1], hl: 2, nt: { t: "Growth also needs sales, market", c: "A" } }, "Other factors shape growth"],
    ["route", { lit: 10, at: 0, first: 1, l0: 1, lr: 1, nt: "The foundation for later phases" }, "Organization Strategy, complete"],
    ["disc", { n: 3, nt: "Choices · trade-offs · governance · benefits" }, "What you have covered"],
    ["disc", { n: 3, nt: { t: "Reasoning, not terminology", c: "G" } }, "A defensible way to reason"],
    ["forum", { day: 0, nt: "Apply it to a new organisation" }, "Now: the discussion forum"],
    ["title", { k: "Week 5 · Session 2", t1: "Efficient in Every", t2: "Direction at Once", sub: "The assessed forum case", sc: "O" }, "The forum case"],
    ["forum", { day: 0, pct: 1, nt: "Assessment 1: Contribution to Discussions" }, "Assessment 1 · 15%"],
    ["forum", { day: 0, pct: 1, lo: 1, nt: "Week 5 focus: K2 and S1" }, "Outcomes K1, K2 and S1"],
    ["build", { up: 1, ttl: "Read the whole case and exhibit" }, "Read the case and its exhibit"],
    ["ask", { q: "Which improvements advance the organisation's strategy, and which might create conflicts that require explicit judgement?", o: ["Stated objectives", "Proposed efficiencies"], oc: ["N", "A"] }, "Objectives versus efficiencies"],
    ["build", { up: 3, dr: 2, at: 2, hl: 2, nt: { t: "Reasoning, not an attractive idea", c: "P" } }, "Explain your reasoning"],
    ["build", { up: 4, dr: 3, at: 3, ttl: "Building a reasoned contribution" }, "Evidence, effects, objectives"],
    ["build", { up: 4, dr: 3, hl: 3, dim: 1, nt: "What is sacrificed, and why" }, "Defend your balance"],
    ["build", { up: 4, dr: 3, hl: 0, dim: 1, nt: { t: "No invented returns", c: "R" } }, "Evidence, not invented numbers"],
    ["forum", { day: 2, mid: 1, post: 1, ev: 1, nt: { t: "Unsupported assertion earns no credit", c: "R" } }, "Post by mid-week, with concepts"],
    ["forum", { day: 4, mid: 1, post: 1, ev: 1, peers: 2, rep: 2, dis: 1, nt: "Reply to two; disagree with one" }, "Two replies, one disagreement"],
    ["vs", { show: "ab", va: "x", vb: "ok", hl: "b", nt: "Question · add · examine" }, "What a constructive reply does"],
    ["forum", { day: 6, post: 1, peers: 2, rep: 2, dis: 1, sum: 1, nt: "Compare with the summary" }, "Read the facilitator's summary"],
    ["build", { up: 4, dr: 3, at: 0, nt: { t: "Transfer reasoning, not Qasr's answer", c: "P" } }, "Transfer the reasoning, don't copy"],
    ["ask", { q: "Can you defend an improvement decision while recognising uncertainty, competing objectives, and the sacrifices your recommendation requires?", o: ["Uncertainty", "Competing objectives", "Sacrifices"], oc: ["P", "A", "R"] }, "Ready to evaluate proposals"]
  ];
  window.VL_SCENES["W5O4c"] = makeScene({
    id, bg: "#f2f0ea", plan,
    desc: "Strategic discipline keeps Qasr's redesigns tied to purpose and authority, benefits are reviewed against baselines, and the Week 5 forum asks learners to post by mid-week, reply to two peers and transfer the reasoning.",
    fams: {
      title: F_TITLE({ icon: "compass", col: C.navy }), // template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
      route: F_ROUTE(), // template: Map Route Animation — https://lottiefiles.com/free-animation/map-route-animation-gMVg8kCqCD
      ask: F_ASK(), // template: Problem Solving Team — https://lottiefiles.com/free-animation/problem-solving-team-uGRfhsIcfD
      disc: F_DEFINE({ term: "Strategic discipline", icon: "compass", c: "N", parts: [["Agreed", "objectives", "target", "N"], ["Authorised", "boundaries", "fence", "T"], ["Accountable", "choices", "gavel", "P"]] }), // template: Interactive Computer Assembly Sequence — https://codepen.io/karlhorning/pen/OJqNMVR
      desk: F_DESK({ sign: "New design" }), // template: Waiting Queue — https://lottiefiles.com/free-animation/waiting-queue-xoNutPl764
      adj: F_CHAIN({ nodes: [["Proposed", "change", "gear", "A"], ["Strategic", "purpose", "target", "N"], ["Approved", "boundaries", "fence", "T"], ["Authorised", "decision", "gavel", "P"]] }), // template: Interactive SVG Path & GSAP Animation — https://codepen.io/WebGuyJeff/pen/rNdmqdO
      rev: BENCH(F_CHAIN({ nodes: [["Process", "performance", "chart", "N"], ["Verified", "benefits", "check", "G"], ["Strategic", "contribution", "target", "O"], ["Sponsor", "review", "sponsor", "P"]] }), "Advanced Analytics — https://lottiefiles.com/free-animation/advanced-analytics-uYDxJcLFVe"), // template: Advanced Analytics — https://lottiefiles.com/free-animation/advanced-analytics-uYDxJcLFVe
      forum: F_FORUM(), // template: Roadmap / Project schedule — https://lottiefiles.com/free-animation/roadmapproject-schedule-krKjaLHUr0
      build: BENCH(F_CHAIN({ nodes: [["Case", "evidence", "doc", "N"], ["Strategic", "interpretation", "compass", "T"], ["Defended", "position", "shield", "P"], ["Acknowledged", "trade-offs", "scale", "A"]] }), "Idea Flow Animation | Infographic Motion Design — https://www.behance.net/gallery/247762027/Idea-Flow-Animation-Infographic-Motion-Design"), // template: Idea Flow Animation | Infographic Motion Design — https://www.behance.net/gallery/247762027/Idea-Flow-Animation-Infographic-Motion-Design
      vs: F_VS({ a: { t: "Limited response", icon: "chat", c: "R", items: ["Preferred idea only", "No consequences", "No engagement"] }, b: { t: "Substantive response", icon: "handshake", c: "G", items: ["Case evidence", "Tests assumptions", "Builds on peers"] } }) // template: Comparison Chart — https://lottiefiles.com/free-animation/comparison-chart-8Cfd0LkdJ3
    }
  });
}

})();
// END w05-claude-part4.js
