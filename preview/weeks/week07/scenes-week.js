// FILE w07-claude-v2-part1.js
// OPER621 · Week 7 · The Launch Pad Phase — animated teaching scenes v2, part 1 of 4 (O1a, O1b, O1c).
// Standalone: defines every helper it uses, registers its own scenes, appends its own rules to <style id="vl-sc-w07">.
// Parts 1-4 load in any order. Rebuilt from the GPT-6 content audit: every narration line now has its own visible
// state change, and every section is split into 8-11 distinct shots (a new visual every 2-5 lines).
//
// Contract: window.VL_SCENES['<secId>'] = { build(el), step(i, n), reset() }
//   step(i, n): n === narration line count -> one state per line; n === visual-moment count -> that moment's line;
//   any other n -> proportional. Every state is rebuilt from scratch, so seek, replay and going back are safe.
//   Motion: window.gsap drives the tween when present, otherwise requestAnimationFrame. Elements entering on a line
//   are staggered; shots push left/right; prefers-reduced-motion jumps straight to each state with no ambient loops.
// Layout: one 400x380 stage, "meet" fit, dotted backdrop extends into any spare space, so the figure fills the phone
//   slot above the text and the left 60% on a laptop. Labels are 2-4 words, 16-19 units; the narration is never shown.
// QA: every label was checked against the 400x380 frame and against every other label visible on the same line
//   (estimated glyph widths), for every narration line of every section.
// Each shot names the benchmark template it adapts (number, title, exact URL) in the comment above it.
(() => {
  "use strict";
  if (typeof window === "undefined" || typeof document === "undefined") return;
  window.VL_SCENES = window.VL_SCENES || {};
  const REG = window.VL_SCENES;
  // ---------- palette (exact values: the look engines remap them) ----------
  const C = {
    navy: "#1f4e79", orange: "#c0502a", paper: "#fbf8f1", ink: "#1b2a3a",
    blue: "#dbe7f2", green: "#317c61", pale: "#edf3f7", gold: "#d7a45c"
  };
  const NS = "http://www.w3.org/2000/svg";
  const VW = 400, VH = 380;
  // ---------- maths ----------
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const r1 = (v) => Math.round(v * 10) / 10;
  const r3 = (v) => Math.round(v * 1000) / 1000;
  const rad = (d) => (d * Math.PI) / 180;
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeBack = (t) => { const c1 = 1.5, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
  const reduced = () => {
    try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    catch (e) { return false; }
  };
  // ---------- SVG string primitives (absolute coordinates everywhere) ----------
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const at = (o) => Object.keys(o).filter((k) => o[k] !== undefined && o[k] !== null && o[k] !== false && o[k] !== "")
    .map((k) => `${k}="${o[k]}"`).join(" ");
  const R = (x, y, w, h, rx, f, s, sw, ex = "") =>
    `<rect ${at({ x: r1(x), y: r1(y), width: r1(w), height: r1(h), rx, fill: f || "none", stroke: s, "stroke-width": sw })} ${ex}/>`;
  const Ci = (x, y, r, f, s, sw, ex = "") =>
    `<circle ${at({ cx: r1(x), cy: r1(y), r: r1(r), fill: f || "none", stroke: s, "stroke-width": sw })} ${ex}/>`;
  const El = (x, y, rx, ry, f, s, sw, ex = "") =>
    `<ellipse ${at({ cx: r1(x), cy: r1(y), rx: r1(rx), ry: r1(ry), fill: f || "none", stroke: s, "stroke-width": sw })} ${ex}/>`;
  const Pa = (d, s, sw = 3, ex = "") =>
    `<path d="${d}" fill="none" stroke="${s}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
  const Fi = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
  // Self-drawing stroke (keys starting with "L"): progress in P["k.d"].
  const Ln = (k, d, s, sw = 4, ex = "") =>
    `<path data-k="${k}" d="${d}" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" fill="none" stroke="${s}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
  // Animated group; (ox, oy) is the pivot for scale and rotation.
  const G = (k, ox, oy, inner, ex = "") => `<g data-k="${k}" data-ox="${r1(ox)}" data-oy="${r1(oy)}" ${ex}>${inner}</g>`;
  // Mover (keys starting with "M"): drawn around (0,0), travels along a polyline with P["k.t"].
  const Mv = (k, pts, inner) =>
    `<g data-k="${k}" data-ox="0" data-oy="0" data-path="${pts.map((p) => p.join(",")).join(" ")}" transform="translate(${pts[0][0]} ${pts[0][1]})">${inner}</g>`;
  // Static icon placement.
  const Gs = (x, y, s, inner, ex = "") => `<g transform="translate(${r1(x)} ${r1(y)}) scale(${s})" ${ex}>${inner}</g>`;
  // Labels: 2-4 words, never narration, minimum 16 units.
  const T = (x, y, s, o = {}) =>
    `<text ${at({ x: r1(x), y: r1(y), "font-size": Math.max(16, o.z || 18), fill: o.c || C.ink, "text-anchor": o.a || "middle",
      "font-weight": 800, class: "vlw-t" + (o.nh ? " vlw-nh" : ""), "data-lab": "1" })}>${esc(s)}</text>`;
  const T2 = (x, y, a, b, o = {}) => {
    const z = Math.max(16, o.z || 18), lh = Math.round(z * 1.1);
    return `<text ${at({ x: r1(x), y: r1(y), "font-size": z, fill: o.c || C.ink, "text-anchor": o.a || "middle", "font-weight": 800,
      class: "vlw-t" + (o.nh ? " vlw-nh" : ""), "data-lab": "2" })}><tspan x="${r1(x)}" dy="0">${esc(a)}</tspan><tspan x="${r1(x)}" dy="${lh}">${esc(b)}</tspan></text>`;
  };
  // Glyphs (symbols and numerals inside icons; not labels).
  const Gl = (x, y, s, z = 18, c = C.ink) =>
    `<text x="${r1(x)}" y="${r1(y)}" font-size="${r1(z)}" fill="${c}" text-anchor="middle" font-weight="800" class="vlw-t vlw-gl">${esc(s)}</text>`;
  // Live counter text (keys starting with "N").
  const Num = (k, x, y, v, z = 30, c = C.navy, suf = "") =>
    `<text data-k="${k}" data-ox="${x}" data-oy="${y}" data-suf="${esc(suf)}" x="${x}" y="${y}" font-size="${z}" fill="${c}" text-anchor="middle" font-weight="800" class="vlw-t vlw-gl">${v}${esc(suf)}</text>`;
  const pillW = (s, z = 17) => Math.round(s.length * z * 0.66 + 28);
  const pill = (x, y, s, c = C.navy, f = C.paper, z = 17) => {
    const w = pillW(s, z);
    return R(x - w / 2, y - 18, w, 36, 18, f, c, 2.5) + T(x, y + 6, s, { z, c: f === C.paper ? c : C.paper, nh: f !== C.paper });
  };
  // Pill with a status badge inside its left end: badge(x, y) draws the badge.
  const bpill = (x, y, s, c, badge, dash = false, z = 17) => {
    const w = Math.round(s.length * z * 0.66 + 62), x0 = x - w / 2;
    return R(x0, y - 19, w, 38, 19, C.paper, c, 3, dash ? 'stroke-dasharray="7 5"' : "") + badge(x0 + 21, y) + T(x0 + 42, y + 6, s, { a: "start", z, c });
  };
  const hl = (k, s, c = C.navy, y = 32) => G(k, 200, y - 7, T(200, y, s, { z: s.length > 26 ? 18 : 20, c }));
  // ---------- icon library (centred on x, y) ----------
  const person = (x, y, s = 1, c = C.navy) => Gs(x, y, s, Ci(0, -13, 8.5, c) + Fi("M-15 17Q-15 0 0 0Q15 0 15 17Z", c));
  const hotel = (x, y, s = 1, c = C.navy, f = C.paper) => Gs(x, y, s, R(-13, -20, 26, 40, 3, f, c, 2.5) +
    [-7, 2].map((dx) => [-14, -5].map((dy) => R(dx, dy, 5, 5, 1, c)).join("")).join("") + R(-4, 9, 8, 11, 1.5, c));
  const doc = (x, y, s = 1, c = C.navy, n = 3, f = C.paper) => Gs(x, y, s,
    Fi("M-15 -20H8L15 -13V20H-15Z", f, `stroke="${c}" stroke-width="2.5" stroke-linejoin="round"`) + Pa("M8 -20V-13H15", c, 2) +
    Array.from({ length: n }, (_, i) => Pa(`M-9 ${-8 + i * 8}H${i % 2 ? 4 : 9}`, c, 2.5)).join(""));
  const ck = (x, y, s = 1, c = C.green, sw = 4) => Pa(`M${r1(x - 9 * s)} ${r1(y)}l${r1(6 * s)} ${r1(7 * s)}l${r1(13 * s)} ${r1(-15 * s)}`, c, sw);
  const xx = (x, y, s = 1, c = C.orange, sw = 4) => Pa(`M${r1(x - 8 * s)} ${r1(y - 8 * s)}l${r1(16 * s)} ${r1(16 * s)}m0 ${r1(-16 * s)}l${r1(-16 * s)} ${r1(16 * s)}`, c, sw);
  const okB = (x, y, r = 12, c = C.green) => Ci(x, y, r, c) + ck(x + 1, y + 1, r / 15, C.paper, 3);
  const noB = (x, y, r = 12, c = C.orange) => Ci(x, y, r, c) + xx(x, y, r / 17, C.paper, 3);
  const qB = (x, y, r = 14, c = C.orange) => Ci(x, y, r, C.paper, c, 3) + Gl(x, y + r * 0.45, "?", r * 1.3, c);
  const exB = (x, y, r = 12, c = C.orange) => Ci(x, y, r, c) + Pa(`M${x} ${r1(y - r * 0.5)}V${r1(y + r * 0.12)}`, C.paper, 3) + Ci(x, y + r * 0.45, 1.8, C.paper);
  const clock = (x, y, r, c = C.navy, a = 60) => Ci(x, y, r, C.paper, c, 3) +
    Pa(`M${x} ${y}V${r1(y - r * 0.6)}M${x} ${y}L${r1(x + r * 0.5 * Math.cos(rad(a - 90)))} ${r1(y + r * 0.5 * Math.sin(rad(a - 90)))}`, c, 3);
  const starD = (x, y, r) => { let d = ""; for (let i = 0; i < 10; i++) { const a = rad(-90 + i * 36), q = i % 2 ? r * 0.45 : r; d += (i ? "L" : "M") + r1(x + q * Math.cos(a)) + " " + r1(y + q * Math.sin(a)); } return d + "Z"; };
  const star = (x, y, r, c = C.gold) => Fi(starD(x, y, r), c);
  const target = (x, y, r, c = C.navy) => Ci(x, y, r, C.paper, c, 2.5) + Ci(x, y, r * 0.58, "none", c, 2.5) + Ci(x, y, r * 0.2, c);
  const shield = (x, y, s = 1, c = C.green) => Gs(x, y, s, Fi("M0 -18L15 -12V1Q15 13 0 19Q-15 13 -15 1V-12Z", C.paper, `stroke="${c}" stroke-width="3" stroke-linejoin="round"`) + ck(0, 0, 0.7, c, 3));
  const keyI = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Ci(-8, 0, 7, "none", c, 3.5) + Pa("M-1 0H16M11 0V6M16 0V5", c, 3.5));
  const crown = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Fi("M-14 8L-12 -8L-5 0L0 -12L5 0L12 -8L14 8Z", c) + R(-14, 8, 28, 5, 2, c));
  const lens = (x, y, r = 16, c = C.navy) => Ci(x, y, r, C.paper, c, 4, 'fill-opacity=".45"') + Pa(`M${r1(x + r * 0.7)} ${r1(y + r * 0.7)}L${r1(x + r * 1.5)} ${r1(y + r * 1.5)}`, c, 6);
  const flag = (x, y, s = 1, c = C.green) => Gs(x, y, s, Pa("M0 0V-34", C.ink, 3) + Fi("M0 -34L22 -28L0 -21Z", c));
  const pin = (x, y, s = 1, c = C.orange) => Gs(x, y, s, Fi("M0 0C-5 -12 -16 -18 -16 -31A16 16 0 1 1 16 -31C16 -18 5 -12 0 0Z", c) + Ci(0, -31, 6, C.paper));
  const bub = (x, y, w, h, c = C.navy, f = C.paper, tail = -1) =>
    Fi(`M${r1(x + tail * w * 0.25 - 7)} ${r1(y + h / 2 - 2)}L${r1(x + tail * w * 0.25 + tail * 12)} ${r1(y + h / 2 + 13)}L${r1(x + tail * w * 0.25 + 7)} ${r1(y + h / 2 - 2)}Z`, f, `stroke="${c}" stroke-width="2.5" stroke-linejoin="round"`) +
    R(x - w / 2, y - h / 2, w, h, 12, f, c, 2.5);
  const cloud = (x, y, s = 1, f = C.blue, c = C.navy) => Gs(x, y, s, Fi("M-30 12Q-42 12 -40 0Q-38 -12 -24 -10Q-20 -26 -2 -24Q14 -30 22 -14Q38 -14 38 0Q38 12 26 12Z", f, `stroke="${c}" stroke-width="2.5"`));
  const cal = (x, y, s = 1, c = C.navy, f = C.paper) => Gs(x, y, s, R(-18, -16, 36, 34, 5, f, c, 2.5) + R(-18, -16, 36, 10, 4, c) + Pa("M-10 -20V-12M10 -20V-12", c, 3) +
    [0, 1, 2].map((i) => R(-12 + i * 9, 0, 6, 5, 1, c)).join("") + [0, 1].map((i) => R(-12 + i * 9, 8, 6, 5, 1, c)).join(""));
  const truck = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-30, -20, 38, 26, 3, c) + Fi("M8 -12H22L30 -2V6H8Z", c) + R(13, -9, 9, 7, 1.5, C.pale) +
    Ci(-18, 8, 6, C.ink) + Ci(-18, 8, 2.5, C.pale) + Ci(20, 8, 6, C.ink) + Ci(20, 8, 2.5, C.pale));
  const bed = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-20, -2, 40, 10, 3, C.blue, c, 2.5) + R(-20, -10, 12, 9, 3, C.paper, c, 2) + Pa("M-20 -14V14M20 0V14", c, 3));
  const scr = (x, y, w, h, c = C.ink) => R(x - w / 2, y - h / 2, w, h, 5, c) + R(x - w / 2 + 4, y - h / 2 + 4, w - 8, h - 8, 3, C.pale) + R(x - 5, y + h / 2, 10, 6, 1, c) + R(x - 15, y + h / 2 + 5, 30, 4, 2, c);
  const gavel = (x, y, s = 1, c = C.ink) => Gs(x, y, s, `<g transform="rotate(-35)">${R(-18, -9, 36, 18, 4, c) + R(-3, 9, 6, 34, 3, c)}</g>` + R(-16, 30, 32, 7, 3, c));
  const sciss = (x, y, s = 1, c = C.ink) => Gs(x, y, s, Ci(-9, 12, 7, "none", c, 3) + Ci(9, 12, 7, "none", c, 3) + Pa("M-5 6L12 -20M5 6L-12 -20", c, 3.5));
  const lockI = (x, y, s = 1, c = C.navy, open = false) => Gs(x, y, s, R(-12, -4, 24, 20, 4, c) +
    Pa(open ? "M-7 -4V-12Q-7 -20 0 -20Q7 -20 7 -14" : "M-7 -4V-11Q-7 -19 0 -19Q7 -19 7 -11V-4", c, 3.5) + Ci(0, 5, 3, C.paper));
  const mega = (x, y, s = 1, c = C.orange) => Gs(x, y, s, Fi("M-14 -6L8 -16V16L-14 6Z", c) + R(-22, -7, 9, 14, 2, c) + Pa("M14 -10Q22 0 14 10M19 -16Q31 0 19 16", c, 2.5) + Pa("M-16 7L-12 18", c, 4));
  const warn = (x, y, s = 1, c = C.orange) => Gs(x, y, s, Fi("M0 -16L16 12H-16Z", C.paper, `stroke="${c}" stroke-width="3" stroke-linejoin="round"`) + Pa("M0 -5V3", c, 3.2) + Ci(0, 8, 1.9, c));
  const gear = (x, y, r, c = C.navy) => Gs(x, y, 1, [0, 45, 90, 135].map((a) => R(-r * 1.28, -r * 0.24, r * 2.56, r * 0.48, 2, c, "", "", `transform="rotate(${a})"`)).join("") + Ci(0, 0, r, c) + Ci(0, 0, r * 0.42, C.paper));
  const suit = (x, y, s = 1, c = C.orange) => Gs(x, y, s, R(-13, -10, 26, 22, 4, c) + Pa("M-5 -10V-15H5V-10", c, 3) + Pa("M-13 -1H13", C.paper, 2));
  const bell = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Fi("M-14 6A14 14 0 0 1 14 6Z", c) + R(-18, 6, 36, 5, 2, C.ink) + Ci(0, -10, 3, C.ink));
  const bulb = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Ci(0, -6, 13, c) + R(-6, 6, 12, 9, 2, C.ink) + Pa("M-4 -6L0 0L4 -6", C.paper, 2));
  const rocket = (x, y, s = 1, c = C.orange) => Gs(x, y, s, Fi("M0 -34Q12 -22 12 0V12H-12V0Q-12 -22 0 -34Z", C.paper, `stroke="${C.navy}" stroke-width="3"`) +
    Ci(0, -12, 5, C.blue, C.navy, 2.5) + Fi("M-12 0L-22 14H-12ZM12 0L22 14H12Z", c));
  const trophy = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Fi("M-14 -18H14V-6Q14 8 0 10Q-14 8 -14 -6Z", c) + Pa("M-14 -12Q-24 -12 -20 -2Q-17 4 -12 2M14 -12Q24 -12 20 -2Q17 4 12 2", c, 3) + R(-3, 10, 6, 8, 1, c) + R(-11, 18, 22, 6, 2, c));
  const book = (x, y, s = 1, c = C.navy) => Gs(x, y, s, Fi("M0 -12Q-10 -18 -22 -14V14Q-10 10 0 16Q10 10 22 14V-14Q10 -18 0 -12Z", C.paper, `stroke="${c}" stroke-width="2.5" stroke-linejoin="round"`) + Pa("M0 -12V16", c, 2.5));
  const server = (x, y, s = 1, c = C.navy) => Gs(x, y, s, [0, 1, 2].map((i) => R(-16, -18 + i * 12, 32, 10, 2, C.paper, c, 2.5) + Ci(10, -13 + i * 12, 2, c)).join(""));
  const eye = (x, y, s = 1, c = C.navy) => Gs(x, y, s, Pa("M-16 0Q0 -13 16 0Q0 13 -16 0Z", c, 3) + Ci(0, 0, 5, c));
  const arr = (x1, y1, x2, y2, c = C.navy, sw = 3.5, ex = "") => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 11;
    return Pa(`M${r1(x1)} ${r1(y1)}L${r1(x2 - Math.cos(a) * 4)} ${r1(y2 - Math.sin(a) * 4)}`, c, sw, ex) +
      Fi(`M${r1(x2 + Math.cos(a) * 2)} ${r1(y2 + Math.sin(a) * 2)}L${r1(x2 - Math.cos(a - 0.45) * h)} ${r1(y2 - Math.sin(a - 0.45) * h)}L${r1(x2 - Math.cos(a + 0.45) * h)} ${r1(y2 - Math.sin(a + 0.45) * h)}Z`, c);
  };
  const wall = (x, y, w, h, c = C.orange) => {
    let s = ""; const bw = w / 3, bh = h / 4;
    for (let r = 0; r < 4; r++) for (let i = 0; i < 4; i++) {
      const a = x + i * bw - (r % 2 ? bw / 2 : 0), x0 = Math.max(x, a), x1 = Math.min(x + w, a + bw);
      if (x1 - x0 > 3) s += R(x0 + 1, y + r * bh + 1, x1 - x0 - 2, bh - 2, 2, C.paper, c, 2);
    }
    return s;
  };
  const desk = (x, y, w, c = C.navy) => R(x - w / 2, y, w, 14, 4, c) + R(x - w / 2 + 6, y + 14, w - 12, 24, 3, C.blue, c, 2);
  const chairE = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-14, -24, 28, 26, 6, "none", c, 2.5, 'stroke-dasharray="4 4"') +
    R(-17, 2, 34, 7, 3, "none", c, 2.5, 'stroke-dasharray="4 4"') + Pa("M-14 9V22M14 9V22", c, 2.5, 'stroke-dasharray="4 4"'));
  const cab = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-18, -26, 36, 52, 4, C.paper, c, 2.5) + [0, 1, 2].map((i) => R(-13, -21 + i * 16, 26, 13, 2, C.blue, c, 2) + R(-5, -16 + i * 16, 10, 3, 1.5, c)).join(""));
  const env = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-18, -12, 36, 24, 3, C.paper, c, 2.5) + Pa("M-18 -12L0 2L18 -12", c, 2.5));
  const cam = (x, y, s = 1, c = C.ink) => Gs(x, y, s, R(-18, -10, 36, 24, 4, c) + R(-8, -15, 14, 6, 2, c) + Ci(0, 2, 7, C.pale) + Ci(0, 2, 3.5, c));
  const wrench = (x, y, s = 1, c = C.navy) => Gs(x, y, s, `<g transform="rotate(45)">${R(-3.5, -4, 7, 30, 3, c) + Fi("M-10 -14A10 10 0 1 0 10 -14L5 -14L5 -6L-5 -6L-5 -14Z", c)}</g>`);
  const coin = (x, y, r = 9, c = C.gold) => Ci(x, y, r, c, C.ink, 1.5) + Pa(`M${x} ${r1(y - r * 0.5)}V${r1(y + r * 0.5)}`, C.paper, 2.5);
  const link = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-16, -7, 20, 14, 7, "none", c, 3.5) + R(-4, -7, 20, 14, 7, "none", c, 3.5));
  const face = (x, y, r, c = C.navy, mood = 0) => Ci(x, y, r, C.paper, c, 3) + Ci(x - r * 0.35, y - r * 0.2, r * 0.1 + 1, c) + Ci(x + r * 0.35, y - r * 0.2, r * 0.1 + 1, c) +
    Pa(mood > 0 ? `M${r1(x - r * 0.4)} ${r1(y + r * 0.2)}Q${x} ${r1(y + r * 0.6)} ${r1(x + r * 0.4)} ${r1(y + r * 0.2)}` :
      mood < 0 ? `M${r1(x - r * 0.4)} ${r1(y + r * 0.48)}Q${x} ${r1(y + r * 0.08)} ${r1(x + r * 0.4)} ${r1(y + r * 0.48)}` : `M${r1(x - r * 0.4)} ${r1(y + r * 0.35)}H${r1(x + r * 0.4)}`, c, 3);
  const compass = (x, y, r, c = C.navy) => Ci(x, y, r, C.paper, c, 3) + Fi(`M${x} ${r1(y - r * 0.75)}L${r1(x + r * 0.2)} ${y}L${x} ${r1(y + r * 0.1)}L${r1(x - r * 0.2)} ${y}Z`, C.orange) +
    Fi(`M${x} ${r1(y + r * 0.75)}L${r1(x + r * 0.2)} ${y}L${x} ${r1(y - r * 0.1)}L${r1(x - r * 0.2)} ${y}Z`, c);
  const brk = (x1, x2, y, c = C.green, sw = 4, down = true) => Pa(`M${x1} ${y + (down ? 12 : -12)}V${y}H${x2}V${y + (down ? 12 : -12)}`, c, sw);
  const node = (x, y, r, c, inner = "") => Ci(x, y, r, C.paper, c, 3.5) + inner;
  const card = (x, y, w, h, c, inner = "", f = C.paper) => R(x - w / 2, y - h / 2, w, h, 12, f, c, 3) + inner;
  const ring = (x, y, r, c = C.blue, sw = 8) => Ci(x, y, r, "none", c, sw);
  const ringD = (k, x, y, r, c = C.orange, sw = 8) => Ln(k, `M${x} ${y - r}A${r} ${r} 0 1 1 ${r1(x - 0.1)} ${y - r}`, c, sw, 'stroke-linecap="butt"');
  // Candidate process icons (Qasr's four candidates), centred on (x, y).
  const CAND = [
    (x, y, s = 1) => Gs(x, y, s, person(-8, 6, 0.85, C.green) + suit(13, 12, 0.6, C.orange)),
    (x, y, s = 1) => Gs(x, y, s, doc(-6, 0, 0.85, C.navy) + coin(12, 10, 8)),
    (x, y, s = 1) => Gs(x, y, s, scr(0, -4, 38, 28, C.ink) + Ci(0, -4, 6, C.orange)),
    (x, y, s = 1) => Gs(x, y, s, bed(0, 2, 0.95, C.navy) + keyI(10, -14, 0.5, C.gold))
  ];
  const CCOL = [C.green, C.navy, C.orange, C.gold];
  // Journey node icons.
  const JI = {
    book: (x, y) => cal(x, y, 0.62, C.navy),
    rate: (x, y) => coin(x, y, 9),
    room: (x, y) => bed(x, y, 0.55, C.navy),
    desk: (x, y) => bell(x, y + 2, 0.62, C.gold),
    bill: (x, y) => doc(x, y, 0.55, C.navy, 2),
    out: (x, y) => suit(x, y, 0.7, C.orange),
    key: (x, y) => keyI(x + 2, y, 0.6, C.gold),
    guest: (x, y) => person(x, y + 4, 0.55, C.green)
  };
  // ---------- engine ----------
  // Pose = flat map "<key>.<prop>" -> number. Props: o x y s sx sy r d t n.
  // Key kinds by first letter: L drawable stroke, B vertical bar (sy), H horizontal bar (sx), M mover (t), N counter (n).
  function initKey(P, k, local) {
    const kind = local[0];
    if (kind === "L") { P[k + ".o"] = 1; P[k + ".d"] = 0; }
    else if (kind === "B") { P[k + ".o"] = 0; P[k + ".sy"] = 0.04; }
    else if (kind === "H") { P[k + ".o"] = 0; P[k + ".sx"] = 0.04; }
    else if (kind === "M") { P[k + ".o"] = 0; P[k + ".t"] = 0; P[k + ".x"] = 0; P[k + ".y"] = 0; P[k + ".s"] = 1; }
    else if (kind === "N") { P[k + ".o"] = 0; P[k + ".n"] = 0; P[k + ".s"] = 1; }
    else { P[k + ".o"] = 0; P[k + ".s"] = 0.86; P[k + ".x"] = 0; P[k + ".y"] = 8; P[k + ".r"] = 0; }
  }
  function showKey(P, k, local) {
    const kind = local[0];
    P[k + ".o"] = 1;
    if (kind === "L") P[k + ".d"] = 1;
    else if (kind === "B") P[k + ".sy"] = 1;
    else if (kind === "H") P[k + ".sx"] = 1;
    else if (kind !== "M" && kind !== "N") { P[k + ".s"] = 1; P[k + ".x"] = 0; P[k + ".y"] = 0; P[k + ".r"] = 0; }
  }
  // Step DSL: "+k" show, "-k" hide, "~k" dim, "*k" emphasise, "=k" normal size, "k@0.5" move along path,
  // "k.p=v" set any prop, "!k" ping target, "@x,y" ping point.
  function runStep(str, P, pre, ord, pg) {
    if (!str) return;
    let idx = 0;
    str.trim().split(/\s+/).forEach((tok) => {
      let m;
      if (tok[0] === "@") { const v = tok.slice(1).split(",").map(Number); if (pg) pg.xy = v; return; }
      if (tok[0] === "!") { if (pg) pg.k = pre + tok.slice(1); return; }
      if ((m = tok.match(/^([+\-~*=])(\w+)$/))) {
        const local = m[2], k = pre + local;
        if (m[1] === "+") showKey(P, k, local);
        else if (m[1] === "-") { P[k + ".o"] = 0; if (local[0] === "L") P[k + ".d"] = 0; }
        else if (m[1] === "~") P[k + ".o"] = 0.28;
        else if (m[1] === "*") { P[k + ".o"] = 1; P[k + ".s"] = 1.14; }
        else if (m[1] === "=") P[k + ".s"] = 1;
        if (ord && !(k in ord)) ord[k] = idx++;
        if (pg && !pg.first && (m[1] === "+" || m[1] === "*")) pg.first = k;
        return;
      }
      if ((m = tok.match(/^(\w+)@(-?[\d.]+)$/))) {
        const k = pre + m[1]; P[k + ".t"] = Number(m[2]); P[k + ".o"] = 1;
        if (ord && !(k in ord)) ord[k] = idx++;
        if (pg && !pg.first) pg.first = k;
        return;
      }
      if ((m = tok.match(/^(\w+)\.(o|x|y|s|sx|sy|r|d|t|n)=(-?[\d.]+)$/))) {
        const k = pre + m[1]; P[k + "." + m[2]] = Number(m[3]);
        if (ord && !(k in ord)) ord[k] = idx++;
        return;
      }
      if (typeof console !== "undefined") console.warn("VL w07: bad step token", tok);
    });
  }
  const along = (pts, t) => {
    if (pts.length < 2) return pts[0] || [0, 0];
    const seg = []; let tot = 0;
    for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); tot += l; }
    let d = clamp(t, 0, 1) * tot;
    for (let i = 0; i < seg.length; i++) {
      if (d <= seg[i] || i === seg.length - 1) { const u = seg[i] ? clamp(d / seg[i], 0, 1) : 0; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u]; }
      d -= seg[i];
    }
    return pts[pts.length - 1];
  };
  function applyP(P, R) {
    for (const k in R) {
      const e = R[k];
      const o = P[k + ".o"], d = P[k + ".d"], t = P[k + ".t"];
      if (o !== undefined) e.setAttribute("opacity", r3(clamp(o, 0, 1)));
      if (o !== undefined || d !== undefined) {
        const vis = (o === undefined || o >= 0.01) && (d === undefined || d >= 0.004);
        e.style.visibility = vis ? "" : "hidden";
      }
      const x = P[k + ".x"], y = P[k + ".y"], s = P[k + ".s"], r = P[k + ".r"], sx = P[k + ".sx"], sy = P[k + ".sy"];
      const mv = e._pts && t !== undefined;
      if (mv || x !== undefined || y !== undefined || s !== undefined || r !== undefined || sx !== undefined || sy !== undefined) {
        const b = mv ? along(e._pts, t) : [0, 0];
        const ss = s === undefined ? 1 : Math.max(0.001, s);
        const kx = ss * (sx === undefined ? 1 : Math.max(0.001, sx)), ky = ss * (sy === undefined ? 1 : Math.max(0.001, sy));
        e.setAttribute("transform", `translate(${r1(b[0] + (x || 0) + e._ox)} ${r1(b[1] + (y || 0) + e._oy)}) rotate(${r1(r || 0)}) scale(${r3(kx)} ${r3(ky)}) translate(${-e._ox} ${-e._oy})`);
      }
      if (d !== undefined) e.setAttribute("stroke-dashoffset", r3(1 - clamp(d, 0, 1)));
      const n = P[k + ".n"];
      if (n !== undefined) e.textContent = String(Math.round(n)) + e._suf;
    }
  }
  function lineOf(i, n, L, M) {
    let ii = Number(i), nn = Number(n);
    if (!Number.isFinite(ii)) ii = 0;
    if (!Number.isFinite(nn) || nn < 1) nn = L;
    ii = clamp(Math.floor(ii), 0, Math.floor(nn) - 1); nn = Math.floor(nn);
    if (nn === L) return ii;
    if (M && nn === M.length) return M[ii];
    if (nn <= 1) return 0;
    return clamp(Math.round((ii * (L - 1)) / (nn - 1)), 0, L - 1);
  }
  const PUSH = 34;
  function section(id, title, L, M, shotDefs) {
    let a = 0;
    const S = shotDefs.map((s, i) => {
      const pre = `s${i}_`;
      const raw = s.svg();
      const svg = raw.replace(/data-k="(\w+)"/g, (m0, k) => `data-k="${pre}${k}"`);
      const keys = [];
      raw.replace(/data-k="(\w+)"/g, (m0, k) => { keys.push(k); return m0; });
      const sh = { i, a, n: s.n, cap: s.cap, ref: s.ref, base: s.base || "", steps: s.steps, svg, raw, keys, pre };
      const p0 = {};
      keys.forEach((k) => initKey(p0, pre + k, k));
      runStep(sh.base.split(/\s+/).filter(Boolean).map((k) => "+" + k).join(" "), p0, pre, null, null);
      sh.p0 = p0;
      a += s.n;
      return sh;
    });
    const pose = (line) => {
      const si = Math.max(0, S.findIndex((s) => line >= s.a && line < s.a + s.n));
      const sh = S[si], P = Object.assign({}, sh.p0), ord = {}, pg = {};
      S.forEach((s, i) => {
        P[`S${i}.o`] = i === si ? 1 : 0;
        P[`S${i}.x`] = i === si ? 0 : (i < si ? -PUSH : PUSH);
        P[`S${i}.s`] = i === si ? 1 : 0.97;
      });
      const loc = clamp(line - sh.a, 0, sh.n - 1);
      for (let j = 0; j <= loc; j++) runStep(sh.steps[j], P, sh.pre, j === loc ? ord : null, j === loc ? pg : null);
      return { P, si, ord, pg };
    };
    let root = null, Rm = {}, cur = null, anim = null, raf = 0, lastLine = -1;
    const stop = () => {
      if (anim && anim.kill) { try { anim.kill(); } catch (e) { /* ignore */ } }
      anim = null;
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
    };
    const ping = (pg) => {
      if (!root || reduced()) return;
      const c = root.querySelector(".vlw-ping");
      if (!c) return;
      let x = null, y = null;
      if (pg.xy) { x = pg.xy[0]; y = pg.xy[1]; }
      else {
        const e = Rm[pg.k || pg.first];
        if (e && e.getBBox) { try { const b = e.getBBox(); x = b.x + b.width / 2; y = b.y + b.height / 2; } catch (er) { x = null; } }
      }
      if (x === null || !Number.isFinite(x)) return;
      c.setAttribute("cx", r1(x)); c.setAttribute("cy", r1(y));
      try {
        if (window.gsap && window.gsap.fromTo) {
          window.gsap.killTweensOf(c);
          window.gsap.fromTo(c, { attr: { r: 8 }, opacity: 0.8 }, { attr: { r: 40 }, opacity: 0, duration: 0.95, delay: 0.35, ease: "power2.out" });
        } else if (c.animate) {
          c.animate([{ r: "8px", opacity: 0.8 }, { r: "40px", opacity: 0 }], { duration: 950, delay: 350, easing: "ease-out" });
        }
      } catch (er) { /* static state already correct */ }
    };
    const show = (line, live) => {
      if (!root) return;
      const { P: tgt, si, ord, pg } = pose(line);
      const chip = root.querySelector(".vlw-chip");
      if (chip) chip.textContent = S[si].cap;
      const bar = root.querySelector(".vlw-bar i");
      if (bar) bar.style.width = `${L <= 1 ? 100 : r1((100 * line) / (L - 1))}%`;
      root.setAttribute("data-line", String(line));
      stop();
      if (!live || reduced() || !cur) { cur = tgt; applyP(cur, Rm); lastLine = line; return; }
      const from = cur, keys = Object.keys(tgt), p0 = S[si].p0;
      const delay = {};
      for (const k in ord) delay[k] = Math.min(0.42, ord[k] * 0.085);
      const base = keys.map((key) => key.slice(0, key.lastIndexOf(".")));
      const prop = keys.map((key) => key.slice(key.lastIndexOf(".") + 1));
      const frame = (t) => {
        const P = {};
        for (let j = 0; j < keys.length; j++) {
          const key = keys[j], b = tgt[key];
          let a0 = from[key];
          if (a0 === undefined) a0 = p0[key];
          if (a0 === undefined) a0 = b;
          const dl = delay[base[j]] || 0, u = clamp((t - dl) / (1 - dl), 0, 1);
          P[key] = a0 + (b - a0) * (prop[j] === "s" && base[j][0] !== "S" ? easeBack(u) : easeIO(u));
        }
        cur = P; applyP(P, Rm);
      };
      const dur = 1.15;
      if (window.gsap && window.gsap.to) {
        const proxy = { t: 0 };
        anim = window.gsap.to(proxy, { t: 1, duration: dur, ease: "none", onUpdate: () => frame(proxy.t), onComplete: () => frame(1) });
      } else {
        const t0 = performance.now();
        const loop = (now) => { const t = clamp((now - t0) / (dur * 1000), 0, 1); frame(t); raf = t < 1 ? requestAnimationFrame(loop) : 0; };
        raf = requestAnimationFrame(loop);
      }
      if (line !== lastLine) ping(pg);
      lastLine = line;
    };
    const api = {
      build(el) {
        if (!el) return;
        stop();
        root = document.createElement("div");
        root.className = `vls-w07-${id}`;
        root.innerHTML =
          `<div class="vlw-stage"><svg xmlns="${NS}" viewBox="-24 -12 ${VW + 48} ${VH + 24}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(title)}">` +
          `<defs><pattern id="vlw7v2dots-${id}" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="${C.blue}"/></pattern></defs>` +
          `<rect x="-800" y="-800" width="2000" height="2000" fill="url(#vlw7v2dots-${id})" opacity=".7"/>` +
          S.map((s) => `<g data-k="S${s.i}" data-ox="200" data-oy="190">${s.svg}</g>`).join("") +
          `<circle class="vlw-ping" cx="200" cy="190" r="8" fill="none" stroke="${C.orange}" stroke-width="3" opacity="0"/>` +
          `</svg></div>` +
          `<div class="vlw-foot"><span class="vlw-kick">${esc(title)}</span><span class="vlw-chip" aria-live="polite"></span></div>` +
          `<div class="vlw-bar"><i></i></div>`;
        el.replaceChildren(root);
        // Safety net for wider host fonts: nudge any label that would cross the frame edge back inside it.
        root.querySelectorAll("text[data-lab]").forEach((t) => {
          try {
            const b = t.getBBox(); if (!b || !b.width) return;
            let dx = 0;
            if (b.width > VW - 8) { t.setAttribute("textLength", VW - 8); t.setAttribute("lengthAdjust", "spacingAndGlyphs"); }
            else if (b.x < 4) dx = 4 - b.x; else if (b.x + b.width > VW - 4) dx = VW - 4 - (b.x + b.width);
            if (dx) [t, ...t.querySelectorAll("tspan")].forEach((e) => { const x = Number(e.getAttribute("x")); if (Number.isFinite(x)) e.setAttribute("x", r1(x + dx)); });
          } catch (er) { /* layout not available: keep authored positions */ }
        });
        Rm = {};
        root.querySelectorAll("[data-k]").forEach((e) => {
          Rm[e.getAttribute("data-k")] = e;
          e._ox = Number(e.getAttribute("data-ox")) || 0;
          e._oy = Number(e.getAttribute("data-oy")) || 0;
          e._suf = e.getAttribute("data-suf") || "";
          const p = e.getAttribute("data-path");
          e._pts = p ? p.split(" ").map((q) => q.split(",").map(Number)) : null;
        });
        cur = null; lastLine = -1;
        show(0, false);
      },
      step(i, n) { show(lineOf(i, n, L, M), true); },
      reset() { stop(); cur = null; lastLine = -1; show(0, false); }
    };
    Object.defineProperty(api, "_vlw", { value: { id, title, L, M, shots: S, pose }, enumerable: false });
    REG[id] = api;
  }
  // ---------- one shared stylesheet, every rule scoped under .vls-w07-<secId> ----------
  const baseCss = (id) => {
    const S = `.vls-w07-${id}`;
    return `
${S}{position:relative;width:100%;height:100%;min-height:0;display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr) auto auto;box-sizing:border-box;overflow:hidden;color:${C.ink};font-family:inherit}
${S} *,${S} *::before,${S} *::after{box-sizing:border-box}
${S} .vlw-stage{position:relative;min-height:0;overflow:hidden}
${S} .vlw-stage svg{display:block;width:100%;height:100%;font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;text-rendering:geometricPrecision}
${S} .vlw-t{paint-order:stroke;stroke:${C.paper};stroke-width:5px;stroke-linejoin:round;pointer-events:none;letter-spacing:.02em}
${S} .vlw-nh,${S} .vlw-gl{stroke:none}
${S} .vlw-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:5px 10px 4px;min-height:32px;min-width:0}
${S} .vlw-kick{min-width:0;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:${C.navy};opacity:.75;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
${S} .vlw-chip{font-size:14px;font-weight:800;letter-spacing:.03em;color:${C.paper};background:${C.navy};border-radius:999px;padding:4px 12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;margin-left:auto}
${S} .vlw-bar{height:3px;background:${C.blue}}
${S} .vlw-bar i{display:block;height:100%;width:0;background:${C.orange};transition:width .6s ease}
${S} .vlw-pulse{animation:vlw7v2-pulse 2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
${S} .vlw-bob{animation:vlw7v2-bob 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
${S} .vlw-spin{animation:vlw7v2-spin 8s linear infinite;transform-box:fill-box;transform-origin:center}
${S} .vlw-flow{stroke-dasharray:8 9;animation:vlw7v2-flow 1.3s linear infinite}
${S} .vlw-shake{animation:vlw7v2-shake .9s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
${S} .vlw-blink{animation:vlw7v2-blink 1.6s ease-in-out infinite}
@media (max-width:420px){${S} .vlw-kick{display:none}${S} .vlw-chip{margin:0 auto}}
@media (prefers-reduced-motion:reduce){${S} *,${S} *::before,${S} *::after{animation:none!important;transition:none!important}}`;
  };
  const KEYFRAMES = `
@keyframes vlw7v2-pulse{0%,100%{transform:scale(.94);opacity:.65}50%{transform:scale(1.06);opacity:1}}
@keyframes vlw7v2-bob{0%,100%{transform:translateY(-3px)}50%{transform:translateY(3px)}}
@keyframes vlw7v2-spin{to{transform:rotate(360deg)}}
@keyframes vlw7v2-flow{to{stroke-dashoffset:-34}}
@keyframes vlw7v2-shake{0%,100%{transform:rotate(0)}25%{transform:rotate(-4deg)}75%{transform:rotate(4deg)}}
@keyframes vlw7v2-blink{0%,100%{opacity:1}50%{opacity:.35}}`;
  const addStyle = (mark, ids) => {
    let st = document.getElementById("vl-sc-w07");
    if (!st) { st = document.createElement("style"); st.id = "vl-sc-w07"; document.head.appendChild(st); }
    const tag = `/* ${mark} */`;
    if (st.textContent.indexOf(tag) >= 0) return;
    st.textContent += `\n${tag}\n${KEYFRAMES}\n${ids.map(baseCss).join("\n")}\n`;
  };
  // ---------- benchmark registry (animation-benchmark-part2: number -> exact URL) ----------
  const U = {
    76: "https://dribbble.com/shots/3791748-Workflow-Animation", // Workflow Animation
    77: "https://dribbble.com/shots/26275497-Workflow-AI-Animation", // Workflow AI Animation
    78: "https://dribbble.com/shots/27247003-Data-Workflow-Animation", // Data Workflow Animation
    79: "https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design", // Product Workflow Animation & UI Motion Design
    80: "https://dribbble.com/shots/27476599-Creative-Design-Workflow-Animation", // Creative Design Workflow Animation
    81: "https://dribbble.com/shots/27600376-Clean-Workflow-Visualization-with-Motion-Graphics", // Clean Workflow Visualization with Motion Graphics
    82: "https://www.behance.net/gallery/53752435/Motion-Design-Process", // Motion Design Process
    83: "https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion", // The Process Architectural Motion
    84: "https://www.behance.net/gallery/159045079/Process-What-is-a-Motion-Designer-", // Process - What is a Motion Designer?
    85: "https://www.behance.net/gallery/190390491/Creative-process-Motion-design-creative-project", // Creative process Motion design creative project
    86: "https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm", // Workflow by a
    87: "https://lottiefiles.com/free-animation/workflow-Jt52qpU9fj", // Workflow by Muammar Faiq
    88: "https://lottiefiles.com/free-animation/automated-workflows-XR2hxXOdEK", // Automated Workflows
    89: "https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5", // Git Workflow 1
    90: "https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU", // Multi-Step Icon Animation
    91: "https://lottiefiles.com/free-animation/cro-process-RaUu5ps2to", // cro process
    92: "https://lottiefiles.com/free-animation/process-fmpDUgNx8K", // process connecting
    93: "https://lottiefiles.com/free-animation/process-para-qujCEQ2AKT", // Process-Para
    94: "https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP", // Process - Success
    95: "https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8", // contract process
    96: "https://lottiefiles.com/free-animation/process-in-cub-9iNG7QP0qC", // Process in cub
    97: "https://lottiefiles.com/free-animation/business-solution-pNyNfkcRsa", // Business Solution conveyor
    98: "https://lottiefiles.com/free-animation/factory-4XJZcnPgAb", // Factory
    99: "https://lottiefiles.com/free-animation/bottling-factory-53Q3SoGu0x", // Bottling factory
    100: "https://lottiefiles.com/free-animation/3d-statistics-factory-lRiHNeU9Y4", // 3D Statistics Factory
    101: "https://lottiefiles.com/free-animation/3d-camera-factory-2I4Nonw7Ad", // 3D Camera Factory
    102: "https://lottiefiles.com/free-animation/3d-isometric-factory-process-TJAlBgYcXw", // 3D Isometric Factory Process
    103: "https://lottiefiles.com/free-animation/data-factory-animation-I6dMAfEyrl", // Data Factory Animation
    104: "https://lottiefiles.com/free-animation/logistics-trucks-DHvuLcYVdQ", // Logistics Trucks
    105: "https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy", // World map with logistics
    106: "https://lottiefiles.com/free-animation/supply-chain-and-logistics-8PtoYRCbiu", // Supply Chain and logistics
    107: "https://lottiefiles.com/free-animation/supply-chain-and-shipping-Gd8ZsVZpXq", // Supply Chain and Shipping
    108: "https://lottiefiles.com/free-animation/delivery-truck-road-animation-K9xyRiku9v", // Delivery Truck - Road Animation
    109: "https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6", // teamwork
    110: "https://observablehq.com/@d3/animated-quadtree", // Animated quadtree
    111: "https://old.observablehq.com/@d3/hierarchy-traversal-animated", // Hierarchy traversal animated
    112: "https://motionarray.com/after-effects-templates/infographics-pack-135055/", // Infographics Pack by ARstudio
    113: "https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/", // Infographic Chart Creator
    114: "https://motionarray.com/after-effects-templates/infographics-pack-100132/", // Infographics Pack by JVARTS STUDIO
    115: "https://motionarray.com/after-effects-templates/infographics-for-everything-2593374/", // Infographics For Everything
    116: "https://motionarray.com/after-effects-templates/infographics-3844461/", // Infographics by Ruslan Klimovich
    117: "https://motionarray.com/after-effects-templates/infographics-elements-789489/", // Infographics Elements by TarZanchik
    118: "https://motionarray.com/after-effects-templates/flat-infographics-17982/", // Flat Infographics by zevs
    119: "https://motionarray.com/after-effects-templates/infographics-v2-556482/", // Infographics V2 by Typoland
    120: "https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ", // Animated Dashboards
    121: "https://lottiefiles.com/free-animation/dashboard-M05MmlnoOP", // Dashboard by RAKIBUZZAMAN
    122: "https://lottiefiles.com/free-animation/deliver-better-optimized-lottie-json-animation-Qgvgddnv8J", // Dashboard by Weblodge
    123: "https://lottiefiles.com/free-animation/dashboard-krY5yHjJRp", // DashBoard by Amit Prajapati
    124: "https://lottiefiles.com/free-animation/project-dashboard-PeJUc2p1iB", // Project Dashboard
    125: "https://lottiefiles.com/free-animation/infographics-dashboard-X6P5rVLZAB", // Infographics Dashboard
    126: "https://observablehq.com/@d3/stacked-to-grouped-bars", // Stacked-to-grouped bars
    127: "https://observablehq.com/@d3/streamgraph-transitions", // Streamgraph transitions
    128: "https://observablehq.com/@d3/pie-chart-update", // Pie chart update
    129: "https://observablehq.com/@d3/arc-tween", // Arc tween
    130: "https://observablehq.com/@d3/learn-d3-animation", // Animated line chart lesson
    131: "https://observablehq.com/@d3/transition-end", // Transition end
    132: "https://observablehq.com/@d3/easing-animations", // Easing Animations
    133: "https://observablehq.com/@d3/path-tween", // Path tween
    134: "https://observablehq.com/@d3/shape-tweening", // Shape tweening
    135: "https://motionarray.com/after-effects-templates/timeline/", // Timeline by The Creators
    136: "https://motionarray.com/after-effects-templates/project-timeline-2424919/", // Project TimeLine
    137: "https://motionarray.com/after-effects-templates/corporate-timeline-1939632/", // Corporate Timeline by HenlyFx
    138: "https://motionarray.com/after-effects-templates/scrolling-timeline-1223172/", // Scrolling Timeline
    139: "https://motionarray.com/after-effects-templates/corporate-timeline-255459/", // Corporate Timeline by Zargones
    140: "https://motionarray.com/after-effects-templates/corporate-timeline-77666/", // Corporate Timeline by MotionTores
  };

  // =====================================================================
  // O1a — Why the Launch Pad matters (31 lines, 10 shots). Audit score 4.5 -> rebuilt.
  // From the course timeline to Qasr's headquarters and network, the queue of problems at one team, the
  // framework phases, the Dubai road map, the commitment card, the measure, Understand, and you.
  // =====================================================================
  section("O1a", "Why the Launch Pad matters", 31, [0, 2, 4, 6, 8, 10, 12, 14, 16, 19, 21, 23, 25, 27, 29], [
    // Template 137 · Corporate Timeline by HenlyFx (Motion Array) — https://motionarray.com/after-effects-templates/corporate-timeline-1939632/
    // Adapted: "reveal events one by one" -> a marker runs along the course weeks to Week 7's open question,
    // then the earlier milestones light up as the two things already learned.
    { ref: U[137], cap: "Week 7 begins", n: 2,
      svg: () => {
        const X = Array.from({ length: 7 }, (_, i) => 40 + i * 53);
        return hl("h0", "WEEK SEVEN: A DECISION", C.orange) + hl("h1", "WHAT WE ALREADY KNOW", C.navy) +
          G("tl", 200, 240, Pa("M24 240H376", C.navy, 5) + X.map((x, i) => Ci(x, 240, i === 6 ? 20 : 13, C.paper, C.navy, 3.5) + (i < 6 ? Gl(x, 246, String(i + 1), 15, C.navy) : "")).join("")) +
          Mv("Mk", [[40, 206], [358, 206]], Fi("M0 10L-9 -6H9Z", C.orange)) +
          G("q", 358, 240, qB(358, 240, 22, C.orange) + T2(330, 296, "WHAT TO", "IMPROVE?", { c: C.orange })) +
          G("a", 120, 190, Pa("M30 214V202H210V214", C.green, 4) + [0, 1, 2, 3].map((i) => Ci(X[i], 240, 13, C.green)).join("") + T(120, 186, "WHY PROCESSES MATTER", { z: 17, c: C.green }) +
            Gs(120, 150, 1, gear(-16, 0, 11, C.green) + gear(12, 6, 8, C.green))) +
          G("b", 278, 140, Pa("M240 214V202H316V214", C.navy, 4) + [4, 5].map((i) => Ci(X[i], 240, 13, C.navy)).join("") + T(278, 134, "LINKED TO STRATEGY", { z: 17, c: C.navy }) +
            compass(278, 172, 20, C.navy));
      },
      steps: ["+h0 +tl +Mk Mk@1 +q", "-h0 +h1 +a +b"] },

    // Template 105 · World map with logistics (LottieFiles) — https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy
    // Adapted: "trace routes between hubs" -> Qasr HQ is the hub, fourteen hotels are the nodes, guests travel the
    // routes; then the routes break and both the guest's face and the performance line fall.
    { ref: U[105], cap: "Inside Qasr Hospitality", n: 3,
      svg: () => {
        const H = Array.from({ length: 14 }, (_, j) => { const a = rad(-90 + (j * 360) / 14); return [r1(200 + 168 * Math.cos(a)), r1(208 + 118 * Math.sin(a))]; });
        return hl("h0", "INSIDE QASR HEADQUARTERS", C.navy) + hl("h1", "FOURTEEN PROPERTIES", C.green) + hl("h2", "DISCONNECTED PROCESSES", C.orange) +
          G("hq", 200, 208, hotel(200, 196, 3, C.navy) + R(150, 262, 100, 22, 11, C.navy)) + G("hql", 200, 310, T(200, 314, "QASR HEADQUARTERS", { z: 19, c: C.navy })) +
          G("tb", 200, 208, El(200, 250, 54, 14, C.blue, C.navy, 2) + person(176, 236, 0.6, C.green) + person(200, 232, 0.6, C.navy) + person(224, 236, 0.6, C.orange)) +
          Ln("Lr", H.map((p) => `M200 208L${p[0]} ${p[1]}`).join(""), C.green, 2.5) +
          G("ht", 200, 208, H.map(([x, y], j) => hotel(x, y, 0.75, j % 3 ? C.navy : C.green)).join("")) +
          Mv("Mg1", [[200, 208], H[3]], Ci(0, 0, 6, C.gold, C.ink, 1.5)) + Mv("Mg2", [[200, 208], H[9]], Ci(0, 0, 6, C.gold, C.ink, 1.5)) + Mv("Mg3", [[200, 208], H[12]], Ci(0, 0, 6, C.gold, C.ink, 1.5)) +
          G("lc", 80, 70, T(16, 72, "14 PROPERTIES", { a: "start", c: C.green }) + T(16, 372, "THOUSANDS OF GUESTS", { a: "start", c: C.green })) +
          G("br", 200, 208, [1, 4, 6, 9, 12].map((j) => noB(r1((200 + H[j][0]) / 2), r1((208 + H[j][1]) / 2), 10)).join("")) +
          G("fx", 340, 70, face(352, 76, 22, C.orange, -1) + Pa("M14 90L44 70L64 96L92 112", C.orange, 4) + T(384, 372, "EXPERIENCE SUFFERS", { a: "end", z: 17, c: C.orange }));
      },
      steps: [
        "+h0 +hq +tb +hql",
        "-h0 +h1 -hql hq.s=0.45 tb.o=0 +Lr +ht +Mg1 Mg1@1 +Mg2 Mg2@1 +Mg3 Mg3@1 +lc",
        "-h1 +h2 -lc Lr.o=0.35 -Mg1 -Mg2 -Mg3 +br +fx"] },

    // Template 085 · Creative process Motion design creative project (Behance) — https://www.behance.net/gallery/190390491/Creative-process-Motion-design-creative-project
    // Adapted: "move the idea through iterations" -> the board already holds strategy and a process map; another
    // diagram is drawn, the question stays; then every department head pushes an urgent bubble.
    { ref: U[85], cap: "The steering question", n: 3,
      svg: () => hl("h0", "STRATEGY AND PROCESS MAP", C.navy) + hl("h1", "WHICH PROCESS FIRST?", C.orange) + hl("h2", "EVERYONE SAYS URGENT", C.orange) +
        G("bd", 200, 112, R(36, 54, 328, 118, 10, C.paper, C.navy, 3) + Ci(96, 112, 34, C.paper, C.green, 3) + Ci(96, 112, 20, "none", C.green, 3) + Ci(96, 112, 7, C.green) +
          [0, 1, 2, 3].map((i) => R(168 + i * 46, 98, 34, 28, 5, C.pale, C.navy, 2)).join("") + Pa("M202 112H214M248 112H260M294 112H306", C.navy, 2.5)) +
        G("d2", 270, 120, R(176, 66, 176, 100, 8, C.paper, C.orange, 3) + Pa("M196 92H236L256 116H300L320 142", C.orange, 3) + Ci(196, 92, 7, C.orange) + Ci(320, 142, 7, C.orange)) +
        G("qq", 200, 116, qB(200, 116, 34, C.orange)) +
        G("tb", 200, 300, El(200, 316, 150, 32, C.blue, C.navy, 3)) +
        [[70, C.orange, JI.book], [150, C.gold, JI.rate], [250, C.navy, JI.desk], [330, C.green, JI.room]].map(([x, c, f], i) =>
          G("m" + i, x, 268, person(x, 276, 1.45, c))).join("") +
        [[70, C.orange, JI.book], [150, C.gold, JI.rate], [250, C.navy, JI.desk], [330, C.green, JI.room]].map(([x, c, f], i) =>
          G("u" + i, x, 214, bub(x, 214, 64, 40, c) + f(x - 12, 214) + Gl(x + 16, 222, "!", 22, c))).join(""),
      steps: [
        "+h0 +bd +tb +m0 +m1 +m2 +m3",
        "-h0 +h1 +d2 +qq",
        "-h1 +h2 -qq bd.o=0.3 d2.o=0.3 +u0 +u1 +u2 +u3"] },

    // Template 099 · Bottling factory (LottieFiles) — https://lottiefiles.com/free-animation/bottling-factory-53Q3SoGu0x
    // Adapted: "advance bottles to the filling station and hold" -> every process waits on the belt for the single
    // delivery-team station; the six-month clock runs; a poor pick drains capacity and outputs nothing.
    { ref: U[99], cap: "One team, six months", n: 3,
      svg: () => hl("h0", "NOT EVERYTHING AT ONCE", C.orange) + hl("h1", "ONE TEAM, SIX MONTHS", C.navy) + hl("h2", "A POOR CHOICE COSTS", C.orange) +
        Pa("M14 272H258", C.ink, 6) + G("belt", 136, 282, [0, 1, 2, 3, 4, 5, 6].map((i) => Ci(26 + i * 36, 284, 7, C.paper, C.ink, 2.5, 'class="vlw-spin"')).join("")) +
        [0, 1, 2, 3, 4, 5].map((i) => G("b" + i, 34 + i * 38, 250, R(18 + i * 38, 232, 32, 38, 6, [C.navy, C.orange, C.gold, C.green, C.navy, C.orange][i]) +
          Pa(`M${24 + i * 38} 246H${44 + i * 38}M${24 + i * 38} 256H${40 + i * 38}`, C.paper, 2.5))).join("") +
        G("st", 320, 248, R(262, 188, 118, 110, 12, C.pale, C.navy, 3.5) + person(300, 246, 1.1, C.navy) + person(342, 246, 1.1, C.navy) + T2(320, 320, "ONE DELIVERY", "TEAM", { z: 17, c: C.navy })) +
        G("qt", 120, 210, T(130, 204, "ALL WAITING", { c: C.orange })) +
        G("ck", 320, 104, ring(320, 104, 36, C.blue, 10) + hotel(320, 104, 0.8, C.navy) + T2(320, 162, "SIX-MONTH", "REVIEW", { z: 17, c: C.navy })) +
        ringD("Lck", 320, 104, 36, C.orange, 10) +
        G("pk", 320, 240, R(300, 220, 40, 40, 8, C.orange) + Gl(320, 248, "?", 26, C.paper)) +
        G("bt", 90, 112, R(22, 92, 120, 46, 8, C.paper, C.ink, 3) + R(142, 106, 8, 18, 2, C.ink) + T(20, 166, "CAPACITY USED UP", { a: "start", z: 17, c: C.orange })) +
        G("H1", 30, 115, R(30, 100, 104, 30, 4, C.green)) +
        G("ot", 130, 340, T(130, 344, "NO VISIBLE RESULT", { c: C.orange }) + arr(232, 338, 260, 338, C.orange, 3)),
      steps: [
        "+h0 +belt +b0 +b1 +b2 +b3 +b4 +b5 +st +qt",
        "-h0 +h1 -qt +ck +Lck",
        "-h1 +h2 b5.x=96 b5.o=0 +pk Lck.d=0.15 +bt +H1 H1.sx=0.15 +ot"] },

    // Template 135 · Timeline by The Creators (Motion Array) — https://motionarray.com/after-effects-templates/timeline/
    // Adapted: "reveal milestones and media" -> the launch pad rocket docks on phase three of the framework strip;
    // phases one and two light up with their weeks; both point at an empty project slot.
    { ref: U[135], cap: "The framework so far", n: 5,
      svg: () => {
        const X = Array.from({ length: 10 }, (_, i) => 30 + i * 38);
        return hl("h0", "A PRACTICAL STARTING POINT", C.orange) + hl("h1", "PHASE THREE: LAUNCH PAD", C.orange) + hl("h2", "WEEK 5: STRATEGY", C.navy) + hl("h3", "WEEK 6: ARCHITECTURE", C.navy) + hl("h4", "WHICH PROJECT FIRST?", C.orange) +
          G("rk", 200, 196, rocket(200, 190, 2.4, C.orange) + R(140, 248, 120, 14, 5, C.ink) + Pa("M160 262L148 300M240 262L252 300", C.ink, 5)) +
          G("fw", 200, 236, Pa("M20 236H380", C.navy, 4) + X.map((x, i) => Ci(x, 236, 14, C.paper, C.navy, 3) + Gl(x, 242, String(i + 1), 14, C.navy)).join("") + T(200, 362, "TEN FRAMEWORK PHASES", { z: 17, c: C.navy })) +
          G("p3", 106, 236, Ci(106, 236, 20, C.orange) + Gl(106, 243, "3", 20, C.paper) + T2(106, 168, "LAUNCH", "PAD", { c: C.orange })) +
          G("p1", 30, 236, Ci(30, 236, 20, C.navy) + Gl(30, 243, "1", 20, C.paper)) + G("q1", 120, 300, compass(60, 300, 22, C.navy) + T2(96, 296, "ORGANISATION", "STRATEGY", { a: "start", c: C.navy })) +
          G("p2", 68, 236, Ci(68, 236, 20, C.navy) + Gl(68, 243, "2", 20, C.paper)) + G("q2", 120, 300, Gs(60, 300, 1, [0, 1, 2].map((i) => R(-22 + i * 16, -10, 12, 20, 3, C.blue, C.navy, 2)).join("")) + T2(96, 296, "PROCESS", "ARCHITECTURE", { a: "start", c: C.navy })) +
          Ln("La", "M30 214Q68 150 100 206", C.navy, 3) + Ln("Lb", "M68 214Q86 180 102 210", C.navy, 3) +
          G("sl", 250, 130, R(186, 96, 128, 70, 12, "none", C.orange, 3, 'stroke-dasharray="7 5"') + qB(250, 131, 20)) + Ln("Lc", "M126 228Q170 200 188 160", C.orange, 3, 'stroke-dasharray="5 5"');
      },
      steps: [
        "+h0 +rk",
        "-h0 +h1 rk.x=-94 rk.y=-108 rk.s=0.3 +fw +p3",
        "-h1 +h2 +p1 +q1",
        "-h2 +h3 -q1 +p2 +q2",
        "-h3 +h4 -q2 +La +Lb +sl +Lc"] },

    // Template 108 · Delivery Truck - Road Animation (LottieFiles) — https://lottiefiles.com/free-animation/delivery-truck-road-animation-K9xyRiku9v
    // Adapted: "translate the truck along a route" -> a road map with every road lit but no destination; a pin drops,
    // one route is drawn within the fuel available; the pin becomes a commitment card.
    { ref: U[108], cap: "Map without destination", n: 3,
      svg: () => hl("h0", "EVERY ROAD, NO DESTINATION", C.navy) + hl("h1", "CHOOSE A DESTINATION", C.green) + hl("h2", "A MANAGEABLE COMMITMENT", C.green) +
        G("mp", 200, 200, R(16, 54, 368, 290, 16, C.paper, C.blue, 3) + Fi("M16 290Q90 270 140 300T260 290T384 300V344H16Z", C.blue) +
          ["M30 120C100 100 150 160 230 130S340 90 370 110", "M40 230C110 210 170 250 240 220S330 180 370 200", "M90 64C100 120 80 200 120 330", "M210 64C230 140 200 220 240 330", "M320 64C300 130 340 220 310 330"]
            .map((d) => Pa(d, C.navy, 5, 'opacity=".28"')).join("") + T(200, 324, "DUBAI ROAD MAP", { c: C.navy })) +
        G("car", 60, 230, truck(60, 226, 0.75, C.navy) + qB(92, 196, 13)) +
        G("pn", 320, 166, pin(320, 170, 1.3, C.orange)) +
        Ln("Lrt", "M64 236C110 214 170 250 240 220S300 190 316 172", C.green, 6) +
        G("fu", 120, 92, Pa("M96 104A24 24 0 0 1 144 104", C.navy, 5) + Pa("M120 104L134 88", C.orange, 4) + T2(160, 88, "PURPOSE AND", "RESOURCES", { a: "start", z: 17, c: C.navy })) +
        G("cm", 300, 150, R(240, 110, 128, 84, 12, C.paper, C.green, 3.5) + CAND[0](276, 152, 0.9) + Pa("M302 140H352M302 156H344M302 172H352", C.green, 3) + okB(360, 112, 12)),
      steps: [
        "+h0 +mp +car",
        "-h0 +h1 +pn +Lrt +fu car.x=230 car.y=-70",
        "-h1 +h2 -pn +cm"] },

    // Template 115 · Infographics For Everything (Motion Array) — https://motionarray.com/after-effects-templates/infographics-for-everything-2593374/
    // Adapted: "bring the graphic and text into view" -> the commitment card's four fields fill in; the card is then
    // lifted onto pillars of support; one pillar (the sponsor who cannot resolve disputes) cracks.
    { ref: U[115], cap: "What the commitment needs", n: 3,
      svg: () => hl("h0", "THE COMMITMENT'S FOUR PARTS", C.green) + hl("h1", "ENOUGH SUPPORT?", C.navy) + hl("h2", "SPONSOR CAN'T RESOLVE", C.orange) +
        G("cd", 200, 156, R(30, 54, 340, 204, 16, C.paper, C.green, 3.5) +
          [["THE PROCESS", (x, y) => CAND[0](x, y, 0.6)], ["ITS BOUNDARIES", (x, y) => brk(x - 12, x + 12, y - 4, C.green, 3.5)], ["RESPONSIBLE PEOPLE", (x, y) => person(x, y + 5, 0.62, C.navy)], ["EVIDENCE OF SUCCESS", (x, y) => Pa(`M${x - 12} ${y + 8}L${x - 2} ${y - 2}L${x + 4} ${y + 3}L${x + 13} ${y - 9}`, C.green, 3.5)]]
            .map(([s, f], i) => G("f" + i, 200, 86 + i * 46, f(66, 86 + i * 46) + T(94, 92 + i * 46, s, { a: "start", c: C.ink }) + okB(340, 86 + i * 46, 12))).join("")) +
        G("pl", 200, 316, [60, 150, 250, 340].map((x, i) => i === 2 ? R(x - 16, 270, 32, 90, 4, "none", C.navy, 2.5, 'stroke-dasharray="5 4"') + qB(x, 314, 12) : R(x - 16, 270, 32, 90, 4, C.blue, C.navy, 2.5) + person(x, 330, 0.7, C.navy)).join("")) +
        G("sp", 200, 316, person(200, 330, 1.25, C.gold) + crown(200, 300, 0.7) + person(96, 330, 1.25, C.orange) + person(304, 330, 1.25, C.navy) +
          arr(124, 330, 70, 330, C.orange, 4) + arr(276, 330, 330, 330, C.navy, 4) + noB(226, 300, 12)) +
        G("cr", 326, 156, Pa("M326 54L334 100L318 140L332 190L320 258", C.orange, 4)),
      steps: [
        "+h0 +cd +f0 +f1 +f2 +f3",
        "-h0 +h1 cd.y=-10 +pl",
        "-h1 +h2 -pl +sp +cr"] },

    // Template 129 · Arc tween (Observable) — https://observablehq.com/@d3/arc-tween
    // Adapted: "rotate the arc endpoint to a new value" -> a finished project with a blank gauge; the gauge gains a
    // scale and its needle is fixed at a baseline before any wrench touches the process; one problem is chosen.
    { ref: U[129], cap: "Evidence before redesign", n: 3,
      svg: () => hl("h0", "DONE, BUT NO MEASURE", C.orange) + hl("h1", "BASELINE BEFORE REDESIGN", C.green) + hl("h2", "NOT EVERY PROBLEM NOW", C.navy) +
        G("tr", 80, 200, trophy(80, 196, 2.2, C.gold) + T2(80, 270, "PROJECT", "COMPLETED", { c: C.navy })) +
        G("ga", 270, 210, Pa("M190 230A80 80 0 0 1 350 230", C.blue, 18) + qB(270, 196, 24) + T2(270, 274, "NO AGREED", "MEASURE", { c: C.orange })) +
        G("sc", 270, 210, Pa("M190 230A80 80 0 0 1 350 230", C.green, 18, 'opacity=".9"') + [0, 1, 2, 3, 4].map((i) => { const a = rad(180 + i * 45); return Pa(`M${r1(270 + 62 * Math.cos(a))} ${r1(230 + 62 * Math.sin(a))}L${r1(270 + 50 * Math.cos(a))} ${r1(230 + 50 * Math.sin(a))}`, C.navy, 3); }).join("") +
          T2(270, 274, "STARTING", "EVIDENCE", { c: C.green })) +
        G("nd", 270, 230, Pa("M270 230L270 166", C.ink, 5) + Ci(270, 230, 9, C.ink)) +
        G("wr", 80, 200, wrench(80, 200, 1.6, C.navy) + lockI(116, 236, 1, C.orange) + T2(80, 280, "REDESIGN", "WAITS", { c: C.orange })) +
        G("pb", 200, 200, [[60, 110], [140, 90], [220, 110], [300, 90], [80, 290], [170, 310], [250, 290], [330, 310]].map(([x, y], i) => warn(x, y, 1.15, i === 2 ? C.green : C.orange)).join("") +
          Ci(220, 108, 28, "none", C.green, 4) + T(200, 206, "ONE AGREED AREA", { c: C.green }) + T(200, 236, "THE REST WAITS", { c: C.orange })),
      steps: [
        "+h0 +tr +ga",
        "-h0 +h1 -tr -ga +sc +nd nd.r=-38 +wr",
        "-h1 +h2 -sc -nd -wr +pb"] },

    // Template 138 · Scrolling Timeline (Motion Array) — https://motionarray.com/after-effects-templates/scrolling-timeline-1223172/
    // Adapted: "scroll the dates and settle on an event" -> the framework scrolls on to Understand, carrying one
    // agreed area; a lens opens the process to show delays; then the two jobs of the Launch Pad are named.
    { ref: U[138], cap: "Preparing for Understand", n: 3,
      svg: () => hl("h0", "ONE AREA, NEXT PHASE", C.green) + hl("h1", "WHAT HAPPENS, AND WHY", C.navy) + hl("h2", "FOR NOW: CHOOSE WELL", C.green) +
        G("st", 200, 120, Pa("M20 120H380", C.navy, 4) + [60, 200, 340].map((x, i) => Ci(x, 120, 26, i === 1 ? C.orange : i === 2 ? C.green : C.paper, C.navy, 3) +
          Gl(x, 128, String(i + 2), 22, i ? C.paper : C.navy)).join("") + T2(200, 66, "LAUNCH", "PAD", { z: 17, c: C.orange }) + T2(340, 170, "UNDERSTAND", "PHASE", { z: 17, c: C.green })) +
        Mv("Ma", [[200, 260], [340, 260]], R(-66, -40, 132, 80, 12, C.paper, C.green, 3.5) + CAND[0](0, 0, 1.1)) +
        G("ag", 200, 330, T(200, 336, "ONE AGREED AREA", { c: C.green })) +
        G("zm", 200, 250, R(20, 196, 360, 120, 14, C.paper, C.green, 3) + [0, 1, 2, 3].map((i) => node(70 + i * 86, 250, 20, C.navy) + (i < 3 ? Pa(`M${92 + i * 86} 250H${134 + i * 86}`, C.navy, 3) : "")).join("") +
          clock(156, 290, 13, C.orange, 120) + clock(242, 290, 13, C.orange, 200) + qB(328, 214, 13) + lens(60, 236, 26, C.green) +
          T(200, 356, "DELAYS INVESTIGATED", { c: C.orange })) +
        G("w", 200, 270, R(16, 206, 180, 140, 16, C.paper, C.green, 3.5) + Ci(106, 254, 28, C.paper, C.green, 3) + Ci(106, 254, 15, "none", C.green, 3) + Ci(106, 254, 5, C.green) + T(106, 318, "RIGHT WORK", { c: C.green }) +
          R(204, 206, 180, 140, 16, C.paper, C.navy, 3.5) + person(262, 262, 1.1, C.navy) + shield(322, 254, 1.1, C.green) + T(294, 318, "RIGHT CONDITIONS", { z: 17, c: C.navy })),
      steps: [
        "+h0 +st +Ma Ma@1 +ag",
        "-h0 +h1 -Ma -ag +zm",
        "-h1 +h2 -zm +w"] },

    // Template 140 · Corporate Timeline by MotionTores (Motion Array) — https://motionarray.com/after-effects-templates/corporate-timeline-77666/
    // Adapted: "transition milestones along a path with typography" -> threads run from the steering group to the
    // four lesson stops; the path ends at you, defending the decision; the idea then becomes a launch-ready project.
    { ref: U[140], cap: "Your week ahead", n: 3,
      svg: () => hl("h0", "THE STEERING GROUP'S DECISIONS", C.navy) + hl("h1", "YOU WILL DEFEND THEM", C.orange) + hl("h2", "FROM IDEA TO PROJECT", C.green) +
        G("sg", 200, 112, El(200, 128, 96, 24, C.blue, C.navy, 3) + [150, 184, 216, 250].map((x, i) => person(x, 110, 0.95, [C.green, C.navy, C.orange, C.gold][i])).join("")) +
        Ln("Lth", "M140 140Q80 220 60 280M180 150Q160 240 150 280M220 150Q240 240 250 280M260 140Q320 220 340 280", C.navy, 2.5, 'stroke-dasharray="4 5"') +
        G("ls", 200, 296, Pa("M40 296H360", C.green, 5) + [60, 150, 250, 340].map((x, i) => Ci(x, 296, 18, C.green) + Gl(x, 303, String(i + 1), 18, C.paper)).join("") + T(200, 350, "EVERY LESSON CONNECTED", { c: C.green })) +
        G("yo", 200, 230, person(150, 236, 2, C.orange) + R(196, 220, 92, 120, 8, C.navy) + doc(242, 210, 1.1, C.paper, 3, C.paper) + T(200, 368, "EXPLAIN AND DEFEND", { c: C.orange })) +
        G("id", 200, 210, bulb(80, 196, 2.4, C.gold) + T2(80, 268, "IMPROVEMENT", "IDEA", { c: C.navy }) + arr(140, 196, 236, 196, C.navy, 5) +
          rocket(300, 200, 1.7, C.green) + T2(300, 268, "READY TO", "BEGIN", { c: C.green }) + okB(340, 140, 14)),
      steps: [
        "+h0 +sg +Lth +ls",
        "-h0 +h1 -Lth -ls sg.o=0.3 +yo",
        "-h1 +h2 -sg -yo +id"] }
  ]);

  // =====================================================================
  // O1b — The five decisions that make a project possible (31 lines, 10 shots). Audit score 4.6 -> rebuilt.
  // Each decision is shown through Qasr's own example: two proposals, the criteria, the reception-only boundary,
  // the proposed scope, the people, the measures, the benefits and risks, and why all five must be written down.
  // =====================================================================
  const dTrack = (k, n) => G(k, 200, 368, [1, 2, 3, 4, 5].map((i) => Ci(150 + (i - 1) * 25, 368, 9, i <= n ? C.green : C.paper, C.green, 2.5) + Gl(150 + (i - 1) * 25, 373, String(i), 12, i <= n ? C.paper : C.green)).join(""));
  section("O1b", "The five decisions", 31, [0, 2, 4, 6, 8, 10, 13, 15, 17, 19, 21, 23, 25, 27, 29], [
    // Template 100 · 3D Statistics Factory (LottieFiles) — https://lottiefiles.com/free-animation/3d-statistics-factory-lRiHNeU9Y4
    // Adapted: "stage the equipment, then the output" -> the steering group switches the programme to GO; the board
    // watches for output, but the commitment card that should define it is still blank.
    { ref: U[100], cap: "The programme must begin", n: 2,
      svg: () => hl("h0", "THE PROGRAMME MUST BEGIN", C.green) + hl("h1", "COMMITTED TO WHAT?", C.orange) +
        G("tb", 130, 250, El(130, 286, 110, 30, C.blue, C.navy, 3) + [74, 112, 150, 188].map((x, i) => person(x, 256, 1.2, CCOL[i])).join("") + T2(130, 340, "STEERING", "GROUP", { c: C.navy })) +
        G("lt", 320, 180, R(286, 72, 68, 200, 18, C.ink) + Ci(320, 112, 22, C.blue) + Ci(320, 172, 22, C.blue) + Ci(320, 232, 22, C.green, "", 0, 'class="vlw-pulse"') + R(314, 272, 12, 70, 3, C.ink)) +
        G("bd", 90, 200, hotel(80, 190, 2.6, C.navy) + Gs(150, 140, 1.4, Ci(-6, 0, 7, C.paper, C.ink, 3) + Ci(8, 0, 7, C.paper, C.ink, 3)) + T2(90, 274, "BOARD WANTS", "VISIBLE PROGRESS", { z: 17, c: C.navy })) +
        G("cd", 290, 200, R(206, 96, 168, 200, 16, C.paper, C.orange, 3.5, 'stroke-dasharray="9 6"') + qB(290, 180, 30) + T2(290, 250, "COMMITMENT", "UNDEFINED", { c: C.orange })),
      steps: ["+h0 +tb +lt", "-h0 +h1 -tb -lt +bd +cd"] },

    // Template 079 · Product Workflow Animation & UI Motion Design (Dribbble) — https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design
    // Adapted: "shift between product states" -> the programme director's guest-arrival card, the Week 1 traveller behind
    // it, the finance director's billing card with its damaged relationships, then the two cards meet as decision one.
    { ref: U[79], cap: "Decision 1: which process", n: 4,
      svg: () => hl("h0", "COMPLAINTS STARTED IT", C.green) + hl("h1", "THE WEEK 1 TRAVELLER", C.green) + hl("h2", "BILLING DAMAGED RELATIONSHIPS", C.navy) + hl("h3", "WHICH PROCESS, AND WHY?", C.orange) +
        G("pa", 104, 170, person(60, 196, 1.6, C.green) + R(96, 92, 100, 110, 12, C.paper, C.green, 3.5) + CAND[0](146, 132, 1.2) + T2(146, 174, "GUEST", "ARRIVAL", { z: 17, c: C.green }) +
          [0, 1, 2].map((i) => exB(30 + i * 22, 104 - i * 14, 10)).join("")) +
        G("tv", 104, 300, person(70, 312, 1.3, C.green) + suit(98, 322, 0.9) + Gl(44, 282, "Z", 18, C.navy) + Gl(56, 270, "z", 15, C.navy) + desk(160, 300, 70, C.navy) + T(130, 362, "EXHAUSTED GUEST", { c: C.green })) +
        G("pb", 296, 170, person(352, 196, 1.6, C.navy) + R(204, 92, 110, 110, 12, C.paper, C.navy, 3.5) + CAND[1](259, 132, 1.2) + T2(259, 174, "CORPORATE", "BILLING", { z: 17, c: C.navy })) +
        G("hs", 296, 300, person(250, 312, 1.1, C.navy) + person(340, 312, 1.1, C.gold) + Pa("M266 300L284 294M314 294L326 300", C.gold, 4) + Fi("M294 284L300 300L292 304L302 318", "none", `stroke="${C.orange}" stroke-width="3"`) + T(296, 362, "DAMAGED TRUST", { c: C.orange })) +
        G("d1", 200, 250, R(116, 226, 168, 50, 25, C.orange) + T(200, 258, "DECISION ONE", { c: C.paper, nh: true })) + dTrack("tk", 1),
      steps: ["+h0 +pa", "-h0 +h1 +tv", "-h1 +h2 -tv +pb +hs", "-h2 +h3 -tv -hs +d1 +tk"] },

    // Template 113 · Infographic Chart Creator (Motion Array) — https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/
    // Adapted: "grow columns, update the axis and labels" -> the four criteria appear as tiles, then two imagined
    // candidates grow their four columns: a big-benefit option blocked by dependencies, and an easy but trivial one.
    { ref: U[113], cap: "Criteria for choosing", n: 3,
      svg: () => {
        const ic = [(x, y) => target(x, y, 15, C.green), (x, y) => Gs(x, y, 1.1, Pa("M-14 6A14 14 0 0 1 14 6", C.navy, 3) + Pa("M0 6L8 -4", C.orange, 3)), (x, y) => person(x, y + 5, 0.75, C.gold), (x, y) => eye(x, y, 0.9, C.navy)];
        const cols = [C.green, C.navy, C.gold, C.navy];
        const bars = (k, H) => H.map((h, i) => G(k + i, 70 + i * 86, 300, R(48 + i * 86, 300 - h, 44, h, 6, cols[i]))).join("");
        return hl("h0", "FOUR THINGS TO WEIGH", C.navy) + hl("h1", "BIG BENEFITS, BLOCKED DELIVERY", C.orange) + hl("h2", "EASY, BUT TRIVIAL", C.orange) +
          [["STRATEGIC", "VALUE"], ["REALISTIC", "DELIVERY"], ["SPONSOR", "COMMITMENT"], ["VISIBLE", "SUCCESS"]].map(([a, b], i) => {
            const x = i % 2 ? 204 : 12, y = i < 2 ? 64 : 204;
            return G("t" + i, x + 88, y + 64, R(x, y, 184, 128, 16, C.paper, cols[i], 3.5) + Gs(x + 92, y + 40, 1.4, ic[i](0, 0)) + T2(x + 92, y + 90, a, b, { c: C.ink }));
          }).join("") +
          G("ax", 200, 320, Pa("M24 300H376", C.navy, 3) + ic.map((f, i) => f(70 + i * 86, 326)).join("")) +
          bars("A", [200, 40, 110, 130]) + G("chn", 156, 220, link(156, 236, 1.2, C.orange) + link(156, 206, 1.2, C.orange) + server(156, 170, 1, C.orange) + server(156, 130, 1, C.orange)) +
          bars("Z", [24, 200, 90, 30]) + G("nz", 70, 250, noB(70, 250, 16));
      },
      steps: [
        "+h0 +t0 +t1 +t2 +t3",
        "-h0 +h1 -t0 -t1 -t2 -t3 +ax +A0 +A1 +A2 +A3 +chn",
        "-h1 +h2 -A0 -A1 -A2 -A3 -chn +Z0 +Z1 +Z2 +Z3 +nz"] },

    // Template 078 · Data Workflow Animation (Dribbble) — https://dribbble.com/shots/27247003-Data-Workflow-Animation
    // Adapted: "activate nodes and links in sequence" -> the arrival steps appear, a reception-only box is drawn, a
    // rate error is born at booking and travels into the box as a delay, then start, end and handoffs are marked.
    { ref: U[78], cap: "Decision 2: the boundary", n: 4,
      svg: () => {
        const X = [52, 124, 200, 276, 340], Y = [150, 220, 150, 220, 150];
        const lab = [["BOOKING", "CONFIRMED"], ["RATE", "SHARED"], ["FRONT", "DESK"], ["ROOM", "ALLOCATED"], ["FIRST NIGHT", "BILLED"]], ic = [JI.book, JI.rate, JI.desk, JI.room, JI.bill];
        return hl("h0", "WHICH ACTIVITIES ARE INSIDE?", C.navy) + hl("h1", "RECEPTION ONLY?", C.orange) + hl("h2", "THE ERROR STARTS EARLIER", C.orange) + hl("h3", "START, END, HANDOFFS", C.green) +
          Pa(X.map((x, i) => `${i ? "L" : "M"}${x} ${Y[i]}`).join(""), C.blue, 6) +
          X.map((x, i) => G("n" + i, x, Y[i], R(x - 30, Y[i] - 26, 60, 52, 12, C.paper, i === 2 ? C.orange : C.navy, 3) + Gs(x, Y[i], 1.3, ic[i](0, 0)) +
            T2(i === 0 ? x - 34 : i === 4 ? x + 34 : x, Y[i] + (i % 2 ? 50 : -56), lab[i][0], lab[i][1], { z: 17, a: i === 0 ? "start" : i === 4 ? "end" : "middle" }))).join("") +
          G("q", 200, 300, qB(200, 300, 22)) +
          G("nb", 200, 150, R(160, 116, 80, 70, 12, "none", C.orange, 4, 'stroke-dasharray="8 6"')) +
          Mv("Me", [[52, 150], [124, 220], [200, 150]], Ci(0, 0, 11, C.orange, C.paper, 2.5) + Gl(0, 5, "!", 15, C.paper)) +
          G("dl", 200, 300, clock(200, 300, 22, C.orange, 220) + T(200, 350, "DELAY AT ARRIVAL", { c: C.orange })) +
          G("ou", 52, 150, noB(78, 124, 12)) +
          G("fs", 52, 150, flag(26, 122, 0.9, C.green)) + G("fe", 340, 150, flag(368, 122, 0.9, C.green)) +
          G("hd", 200, 190, [[88, 189], [162, 189], [238, 189], [308, 189]].map(([x, y], i) => Ci(x + 3, y - 4, 8, C.gold, C.ink, 2)).join("") + T(200, 350, "HANDOFFS DECIDED", { c: C.green })) + dTrack("tk", 2);
      },
      steps: [
        "+h0 +n0 +n1 +n2 +n3 +n4 +q +tk",
        "-h0 +h1 -q +nb n0.o=0.35 n1.o=0.35 n3.o=0.35 n4.o=0.35",
        "-h1 +h2 n0.o=1 +Me Me@1 +dl +ou",
        "-h2 +h3 -Me -dl -ou -nb n1.o=1 n3.o=1 n4.o=1 +fs +fe +hd"] },

    // Template 090 · Multi-Step Icon Animation (LottieFiles) — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
    // Adapted: "activate one step after another" -> the proposed scope capsule lights from booking to the first bill;
    // the later stay, checkout and post-stay steps sit outside; promises beyond the capsule pop.
    { ref: U[90], cap: "The proposed boundary", n: 3,
      svg: () => hl("h0", "BOOKING TO FIRST BILL", C.green) + hl("h1", "OUTSIDE THE BOUNDARY", C.orange) + hl("h2", "NO PROMISES BEYOND IT", C.navy) +
        G("ca", 200, 140, R(16, 104, 368, 76, 38, C.pale, C.green, 4) + [JI.book, JI.rate, JI.guest, JI.room, JI.bill].map((f, i) => Gs(56 + i * 72, 142, 1.5, f(0, 0))).join("") +
          brk(30, 370, 92, C.green, 4) + T(200, 82, "PROPOSED PROJECT SCOPE", { z: 17, c: C.green })) +
        G("cb", 200, 266, R(64, 230, 272, 72, 36, C.paper, C.navy, 3, 'stroke-dasharray="8 6" opacity=".7"') + [(x, y) => bed(x, y, 0.9, C.navy), JI.out, (x, y) => doc(x, y, 0.8, C.orange, 2)].map((f, i) => Gs(120 + i * 80, 266, 1.4, f(0, 0)) + noB(140 + i * 80, 242, 10)).join("") +
          T(200, 330, "STAY, CHECKOUT, POST-STAY", { z: 17, c: C.navy })) +
        G("pin", 200, 60, [80, 200, 320].map((x) => star(x, 210, 12)).join("") + Pa("M80 222V182M200 222V182M320 222V182", C.green, 2)) +
        G("pout", 200, 280, [120, 280].map((x) => Ci(x, 216, 15, C.orange, "", 0, 'opacity=".75"') + xx(x, 216, 0.9, C.paper, 3)).join("") + T(200, 362, "NOT DELIVERABLE HERE", { c: C.orange })),
      steps: ["+h0 +ca ca.y=70", "-h0 +h1 +cb ca.y=0", "-h1 +h2 +pin +pout"] },

    // Template 109 · teamwork (LottieFiles) — https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6
    // Adapted: "add people and reveal the team" -> Reservations blocks the booking step, the table has an empty seat
    // for whoever can settle it, then the three kinds of people fill their places as decision three.
    { ref: U[109], cap: "Decision 3: the people", n: 3,
      svg: () => hl("h0", "RESERVATIONS DISAGREES", C.orange) + hl("h1", "WHO CAN SETTLE IT?", C.navy) + hl("h2", "SPONSOR, OWNER, WORKERS", C.green) +
        G("rb", 200, 200, R(40, 120, 150, 120, 14, C.paper, C.green, 3) + cal(115, 172, 1.4, C.navy) + T2(115, 270, "BOOKING", "INFORMATION", { c: C.navy }) +
          person(290, 212, 2.2, C.orange) + Fi("M226 150H246V196H226Z", C.orange) + Pa("M222 150V140M230 150V136M238 150V136M246 150V140", C.orange, 4) + T2(290, 296, "RESERVATIONS", "MANAGER", { c: C.orange })) +
        G("tb", 200, 230, El(200, 262, 150, 40, C.blue, C.navy, 3) + [90, 150, 250, 310].map((x, i) => person(x, 226, 1.3, CCOL[i])).join("") + chairE(200, 214, 1.4, C.orange) + qB(234, 168, 16)) +
        [["EXECUTIVE", "SPONSOR", C.gold], ["PROCESS", "OWNER", C.green], ["PEOPLE DOING", "THE WORK", C.navy]].map(([a, b, c], i) =>
          G("r" + i, 70 + i * 130, 210, person(70 + i * 130, 200, 1.8, c) + (i === 0 ? crown(70, 158, 1.1) : i === 1 ? gear(222, 162, 10, C.navy) : person(360, 214, 1.1, c)) + T2(70 + i * 130, 276, a, b, { z: 17, c }))).join("") + dTrack("tk", 3),
      steps: ["+h0 +rb", "-h0 +h1 -rb +tb", "-h1 +h2 -tb +r0 +r1 +r2 +tk"] },

    // Template 076 · Workflow Animation (Dribbble) — https://dribbble.com/shots/3791748-Workflow-Animation
    // Adapted: "reveal the action, transfer the trigger, show the notification" -> each role triggers something
    // different: the sponsor's key opens a barrier while the owner's gauge runs on; front-line staff expose the hidden
    // exceptions; the customer's voice flags an internal shortcut that hurts the guest.
    { ref: U[76], cap: "Different responsibilities", n: 3,
      svg: () => hl("h0", "AUTHORITY AND ACCOUNTABILITY", C.navy) + hl("h1", "THE HIDDEN EXCEPTIONS", C.navy) + hl("h2", "THE CUSTOMER'S VOICE", C.orange) +
        G("sp", 100, 180, person(70, 160, 1.6, C.gold) + crown(70, 120, 1) + keyI(120, 164, 1.2) + wall(150, 120, 40, 80, C.orange) + T2(100, 244, "REMOVES", "BARRIERS", { c: C.gold })) +
        G("ow", 300, 180, person(260, 160, 1.6, C.green) + Pa("M300 172A26 26 0 0 1 352 172", C.green, 6) + Pa("M326 172L340 152", C.ink, 3) + T2(300, 244, "OWNS", "PERFORMANCE", { c: C.green }) +
          Pa("M230 300H380", C.navy, 3) + R(230, 288, 80, 14, 4, C.orange) + T2(300, 326, "OWNER STAYS", "AFTER PROJECT", { z: 17, c: C.navy })) +
        G("ib", 200, 210, Fi("M20 170H380V370H20Z", C.blue, 'opacity=".6"') + Fi("M150 170L180 110L210 130L240 100L270 170Z", C.paper, `stroke="${C.navy}" stroke-width="3"`) +
          Fi("M120 170L270 170L310 260L250 340L150 330L100 250Z", C.pale, `stroke="${C.navy}" stroke-width="3" stroke-dasharray="7 5"`) +
          T(70, 156, "MANAGERS SEE", { a: "start", z: 17, c: C.navy }) + [[170, 220], [230, 250], [190, 300]].map(([x, y]) => exB(x, y, 13)).join("") +
          person(340, 220, 1.5, C.green) + bub(336, 140, 70, 40, C.green) + Gl(336, 148, "…", 22, C.green) + T(200, 362, "FRONT-LINE EMPLOYEES KNOW", { z: 17, c: C.green })) +
        G("cu", 200, 210, gear(90, 160, 34, C.navy) + T2(90, 230, "SIMPLER", "INSIDE", { c: C.navy }) + arr(150, 160, 230, 160, C.navy, 4) + face(290, 160, 38, C.orange, -1) + T2(290, 230, "WORSE FOR", "THE GUEST", { c: C.orange }) +
          person(200, 316, 1.5, C.green) + flag(226, 302, 1.1, C.orange) + T(92, 330, "CUSTOMER REP", { c: C.green })),
      steps: ["+h0 +sp +ow", "-h0 +h1 -sp -ow +ib", "-h1 +h2 -ib +cu"] },

    // Template 119 · Infographics V2 by Typoland (Motion Array) — https://motionarray.com/after-effects-templates/infographics-v2-556482/
    // Adapted: "reveal statistic modules" -> an unproven trophy, a promise with an unknown starting bar, the four
    // measurement modules (decision four), and a before/after pair on one ruler.
    { ref: U[119], cap: "Decision 4: measures", n: 4,
      svg: () => hl("h0", "SUPPORTED, BUT BETTER?", C.navy) + hl("h1", "TODAY IS UNKNOWN", C.orange) + hl("h2", "FOUR MEASUREMENT STEPS", C.green) + hl("h3", "A FAIR COMPARISON", C.green) +
        G("tr", 110, 200, trophy(110, 190, 2.2, C.gold) + T2(110, 274, "WELL", "SUPPORTED", { c: C.navy })) +
        G("ev", 290, 200, Pa("M220 260H360M220 260V110", C.navy, 3) + R(240, 140, 40, 120, 6, "none", C.navy, 2.5, 'stroke-dasharray="6 5"') + R(300, 140, 40, 120, 6, "none", C.navy, 2.5, 'stroke-dasharray="6 5"') +
          qB(290, 120, 14) + T2(290, 296, "EVIDENCE", "NEEDED", { c: C.orange })) +
        G("pr", 200, 200, pill(200, 92, "FEWER RATE CORRECTIONS", C.green) + Pa("M40 300H360", C.navy, 3) + R(100, 150, 70, 150, 8, "none", C.orange, 3, 'stroke-dasharray="7 5"') + Gl(135, 236, "?", 44, C.orange) +
          arr(200, 180, 250, 240, C.green, 4) + R(240, 240, 70, 60, 8, C.green, "", 0, 'opacity=".45"') + T2(135, 336, "TODAY'S", "RATE?", { c: C.orange }) + T2(275, 336, "PROMISED", "LEVEL", { c: C.green })) +
        ["DEFINE THE MEASURE", "SET THE BASELINE", "AGREE THE TARGET", "NAME THE REPORTER"].map((s, i) => G("m" + i, 200, 94 + i * 62, bpill(200, 94 + i * 62, s, i % 2 ? C.green : C.navy, (x, y) => Ci(x, y, 12, C.navy) + Gl(x, y + 5, String(i + 1), 14, C.paper)))).join("") +
        G("cp", 200, 200, Pa("M40 300H360", C.navy, 3) + Gs(30, 200, 1, R(-6, -100, 12, 200, 3, C.gold) + [0, 1, 2, 3, 4].map((i) => Pa(`M6 ${-90 + i * 45}H14`, C.ink, 2)).join("")) +
          G("B0", 130, 300, R(96, 160, 68, 140, 8, C.navy)) + G("B1", 270, 300, R(236, 200, 68, 100, 8, C.green)) +
          T2(130, 336, "BEFORE", "REDESIGN", { c: C.navy }) + T2(270, 336, "AFTER", "REDESIGN", { c: C.green }) + Pa("M60 160H360", C.navy, 2, 'stroke-dasharray="5 5"')) + dTrack("tk", 4),
      steps: [
        "+h0 +tr +ev",
        "-h0 +h1 -tr -ev +pr",
        "-h1 +h2 -pr +m0 +m1 +m2 +m3 +tk",
        "-h2 +h3 -m0 -m1 -m2 -m3 -tk +cp +B0 +B1"] },

    // Template 108 · Delivery Truck - Road Animation (LottieFiles) — https://lottiefiles.com/free-animation/delivery-truck-road-animation-K9xyRiku9v
    // Adapted: "translate the truck along the route" -> the project heads for its expected benefit (decision five);
    // then two named risks land on the road: disconnected systems and departmental opposition.
    { ref: U[108], cap: "Decision 5: benefits, risks", n: 2,
      svg: () => hl("h0", "THE EXPECTED BENEFIT", C.green) + hl("h1", "WHAT COULD STOP IT", C.orange) +
        G("rd", 200, 240, Fi("M0 300L170 150H230L400 300Z", C.blue) + Pa("M200 160V290", C.paper, 5, 'stroke-dasharray="14 12"') + star(200, 118, 30) + T2(200, 60, "BETTER GUEST", "EXPERIENCES", { c: C.green })) +
        Mv("Mt", [[200, 330], [200, 236]], truck(0, 0, 1.2, C.navy)) +
        G("o1", 120, 250, server(90, 246, 1.2, C.orange) + Pa("M108 246Q130 236 140 256M150 260Q160 276 176 266", C.orange, 3) + noB(120, 214, 11) + T2(86, 296, "DISCONNECTED", "SYSTEMS", { z: 17, c: C.orange })) +
        G("o2", 300, 250, person(316, 250, 1.6, C.orange) + Pa("M292 254L340 266M292 266L340 254", C.paper, 4) + T2(316, 310, "DEPARTMENT", "OPPOSITION", { z: 17, c: C.orange })) + dTrack("tk", 5),
      steps: ["+h0 +rd +Mt Mt@0.75 +tk", "-h0 +h1 Mt@0.2 +o1 +o2"] },

    // Template 083 · The Process Architectural Motion (Behance) — https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion
    // Adapted: "build and revise successive layers" -> the five decisions form one arch that cracks when a stone is
    // missing; people leave with different pictures of the agreement; the written document holds all five.
    { ref: U[83], cap: "All five, written down", n: 3,
      svg: () => {
        const st = [[64, 270], [92, 190], [200, 128], [308, 190], [336, 270]];
        return hl("h0", "FRAGILE WITH ONE MISSING", C.orange) + hl("h1", "WRITE IT DOWN", C.navy) + hl("h2", "THE LAUNCH PAD DOCUMENT", C.green) +
          G("ar", 200, 220, st.map(([x, y], i) => i === 3 ? R(x - 34, y - 30, 68, 60, 10, "none", C.orange, 3, 'stroke-dasharray="7 5"') :
            R(x - 34, y - 30, 68, 60, 10, C.paper, C.green, 3.5) + Gl(x, y + 9, String(i + 1), 26, C.green)).join("") +
            Pa("M248 210L262 236L250 252L266 280", C.orange, 4) + Pa("M30 330H370", C.navy, 4) + qB(308, 190, 18)) +
          G("pp", 200, 220, [[80, "M0 -14L14 10H-14Z"], [200, "M-12 -12H12V12H-12Z"], [320, "M0 -14A14 14 0 1 1 -0.1 -14Z"]].map(([x, d], i) =>
            person(x, 280, 1.6, CCOL[i]) + cloud(x, 180, 0.9, C.paper, CCOL[i]) + Gs(x, 178, 1, Fi(d, CCOL[i]))).join("") + T(200, 352, "THREE DIFFERENT MEMORIES", { c: C.orange })) +
          G("dc", 200, 200, R(70, 58, 260, 290, 14, C.paper, C.green, 3.5) +
            ["WHICH PROCESS", "THE BOUNDARY", "THE PEOPLE", "THE MEASURES", "BENEFITS, RISKS"].map((s, i) => Ci(100, 96 + i * 54, 13, C.green) + Gl(100, 102 + i * 54, String(i + 1), 16, C.paper) + T(124, 102 + i * 54, s, { a: "start", c: C.ink })).join(""));
      },
      steps: ["+h0 +ar", "-h0 +h1 -ar +pp", "-h1 +h2 -pp +dc"] }
  ]);

  // =====================================================================
  // O1c — What a completed Launch Pad must deliver (33 lines, 10 shots). Audit score 4.5 -> rebuilt.
  // The handover document is built item by item, each with its own picture: the meetings, the deck that
  // nobody owns, the vague note, the boundary, the two roles, the people, the measure, the risks, the handover.
  // =====================================================================
  section("O1c", "What a Launch Pad delivers", 33, [0, 2, 4, 6, 8, 11, 13, 16, 18, 20, 22, 24, 26, 28, 31], [
    // Template 139 · Corporate Timeline by Zargones (Motion Array) — https://motionarray.com/after-effects-templates/corporate-timeline-255459/
    // Adapted: "introduce events and shift focus" -> meeting dates pile up at headquarters, the director asks what
    // was agreed, and the focus shifts to a thick deck of ambitions with no owner on any of them.
    { ref: U[139], cap: "After many meetings", n: 3,
      svg: () => hl("h0", "BACK AT HEADQUARTERS", C.navy) + hl("h1", "SHOW WHAT WAS AGREED", C.green) + hl("h2", "AMBITIONS WITHOUT OWNERS", C.orange) +
        G("hq", 90, 200, hotel(90, 196, 3.2, C.navy) + T2(96, 290, "QASR", "HEADQUARTERS", { c: C.navy })) +
        G("cl", 280, 196, [0, 1, 2].map((i) => cal(256 + i * 22, 180 + i * 14, 1.6, C.navy)).join("") + T(290, 300, "SEVERAL MEETINGS", { c: C.navy })) +
        G("dr", 316, 250, person(316, 262, 1.8, C.green) + bub(300, 156, 150, 56, C.green) + T2(300, 152, "WHAT WAS", "AGREED?", { c: C.green })) +
        G("mg", 110, 270, [60, 120, 180].map((x, i) => person(x, 300, 1.25, [C.orange, C.gold, C.navy][i]) + cloud(x, 238, 0.55, C.paper, [C.orange, C.gold, C.navy][i]) +
          [(a, b) => coin(a, b, 7), (a, b) => star(a, b, 8), (a, b) => cal(a, b, 0.35, C.navy)][i](x, 236)).join("")) +
        G("dk", 200, 186, [4, 3, 2, 1, 0].map((i) => R(110 + i * 6, 96 + i * 6, 200, 130, 10, C.paper, C.navy, 2.5)).join("") +
          star(150, 150, 18) + rocket(210, 160, 0.9, C.orange) + Pa("M250 182L270 160L284 170L300 140", C.green, 4) +
          [0, 1, 2].map((i) => R(120 + i * 70, 252, 60, 30, 6, "none", C.orange, 2.5, 'stroke-dasharray="5 4"') + qB(150 + i * 70, 267, 10)).join("") +
          T(200, 316, "NO OWNERS NAMED", { c: C.orange })),
      steps: [
        "+h0 +hq +cl",
        "-h0 +h1 -hq -cl +dr +mg",
        "-h1 +h2 -dr -mg +dk"] },

    // Template 122 · Dashboard by Weblodge (LottieFiles) — https://lottiefiles.com/free-animation/deliver-better-optimized-lottie-json-animation-Qgvgddnv8J
    // Adapted: "introduce the UI and emphasise the outcome" -> the deck compresses into one usable page that slides to
    // the next team; then a defined process is set beside a tangle of conflicting intentions.
    { ref: U[122], cap: "A usable document", n: 2,
      svg: () => hl("h0", "A PAGE TEAMS USE", C.green) + hl("h1", "INVESTIGATE, NOT INTERPRET", C.navy) +
        G("pg", 120, 196, doc(120, 190, 3, C.green, 3) + T(120, 298, "CONCISE PAGE", { c: C.green })) +
        Ln("Lgo", "M186 196H262", C.green, 5) + G("ah", 268, 196, Fi("M262 184L280 196L262 208Z", C.green)) +
        G("tm", 330, 196, person(310, 196, 1.3, C.green) + person(352, 196, 1.3, C.green) + T2(330, 248, "UNDERSTAND", "TEAM", { c: C.green })) +
        G("df", 104, 200, R(16, 76, 176, 210, 14, C.paper, C.green, 3) + [0, 1, 2].map((i) => node(52 + i * 52, 170, 16, C.green) + (i < 2 ? Pa(`M${68 + i * 52} 170H${88 + i * 52}`, C.green, 3) : "")).join("") +
          lens(104, 230, 20, C.green) + okB(176, 92, 13) + T2(104, 320, "DEFINED", "PROCESS", { c: C.green })) +
        G("cf", 296, 200, R(208, 76, 176, 210, 14, C.paper, C.orange, 3) +
          Pa("M230 120C300 90 360 200 280 190S220 260 330 250M240 240C260 150 350 140 360 110M250 100C330 160 230 200 350 270", C.orange, 3.5) + noB(368, 92, 13) + T2(296, 320, "CONFLICTING", "INTENTIONS", { c: C.orange })),
      steps: ["+h0 +pg +Lgo +ah +tm", "-h0 +h1 -pg -Lgo -ah -tm +df +cf"] },

    // Template 133 · Path tween (Observable) — https://observablehq.com/@d3/path-tween
    // Adapted: "sample the paths and morph the geometry" -> the vague note, the lens finding nothing to aim at,
    // then the shapeless cloud collapsing into one named process card with its reason attached.
    { ref: U[133], cap: "Vague will not do", n: 3,
      svg: () => hl("h0", "A VAGUE INSTRUCTION", C.orange) + hl("h1", "WHERE WOULD WE LOOK?", C.orange) + hl("h2", "NAME IT, SAY WHY", C.green) +
        G("nt", 200, 190, R(80, 90, 240, 190, 8, C.gold, "", 0, 'fill-opacity=".5"') + R(80, 90, 240, 26, 8, C.gold) + T2(200, 180, "IMPROVE CUSTOMER", "SERVICE", { z: 22, c: C.ink })) +
        G("ls", 200, 190, lens(200, 186, 32, C.navy) + [0, 1, 2, 3, 4, 5].map((i) => { const a = rad(i * 60 + 20); return arr(200 + 60 * Math.cos(a), 186 + 60 * Math.sin(a), 200 + 112 * Math.cos(a), 186 + 112 * Math.sin(a), C.orange, 3); }).join("") +
          qB(70, 110, 14) + qB(330, 110, 14) + qB(70, 286, 14) + qB(330, 286, 14)) +
        G("cl", 200, 196, cloud(200, 196, 2.6, C.blue, C.navy)) +
        G("cd", 200, 190, R(70, 92, 260, 168, 16, C.paper, C.green, 4) + CAND[0](140, 170, 1.8) + T2(250, 160, "GUEST", "ARRIVAL", { z: 22, c: C.green }) + pill(200, 300, "WHY IT COMES FIRST", C.green, C.green)),
      steps: ["+h0 +nt", "-h0 +h1 nt.o=0.25 +ls", "-h1 +h2 -nt -ls +cl cl.s=0.1 cl.o=0 +cd"] },

    // Template 090 · Multi-Step Icon Animation (LottieFiles) — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
    // Adapted: "activate one step after another" -> a vertical step stack from booking to the first night's bill, with
    // start and end flags; the excluded steps sit outside; a written exclusion list stops scope creep.
    { ref: U[90], cap: "Where it begins, ends", n: 4,
      svg: () => {
        const Y = [96, 164, 232, 300], lab = [["BOOKING", "INFORMATION"], ["ROOM", "ALLOCATION"], ["GUEST", "CHECK-IN"], ["FIRST-NIGHT", "BILLING"]], ic = [JI.book, JI.room, JI.key, JI.bill];
        return hl("h0", "START, END, HANDOFFS", C.green) + hl("h1", "WHAT IS INSIDE", C.green) + hl("h2", "WHAT STAYS OUTSIDE", C.orange) + hl("h3", "WRITTEN EXCLUSIONS HOLD", C.navy) +
          Pa("M60 96V300", C.blue, 8) + Ln("Lst", "M60 96V300", C.green, 5) +
          Y.map((y, i) => G("n" + i, 60, y, node(60, y, 24, C.green, Gs(60, y, 1.25, ic[i](0, 0))))).join("") +
          Y.map((y, i) => G("t" + i, 150, y, T2(92, y - 4, lab[i][0], lab[i][1], { a: "start", z: 17, c: C.ink }))).join("") +
          G("fs", 30, 96, flag(24, 84, 0.9, C.green)) + G("fe", 30, 300, flag(24, 288, 0.9, C.green)) +
          G("ho", 60, 200, [130, 198, 266].map((y) => arr(84, y - 8, 84, y + 8, C.gold, 3)).join("")) +
          G("bx", 122, 198, R(18, 64, 214, 268, 16, "none", C.green, 3.5, 'stroke-dasharray="8 6"') + T(125, 360, "INSIDE THE PROJECT", { z: 17, c: C.green })) +
          G("o0", 312, 130, node(312, 120, 22, C.navy, JI.out(312, 120)) + noB(332, 100, 11) + T2(312, 166, "GUEST", "CHECKOUT", { z: 17, c: C.navy })) +
          G("o1", 312, 250, node(312, 240, 22, C.navy, JI.desk(312, 240)) + noB(332, 220, 11) + T2(312, 286, "LATER", "SERVICE ISSUES", { z: 17, c: C.navy })) +
          [0, 1, 2].map((i) => Mv("Mc" + i, [[400, 110 + i * 80], [262, 110 + i * 80]], R(-18, -14, 36, 28, 5, C.orange) + Gl(0, 7, "!", 18, C.paper))).join("") +
          G("wl", 246, 200, doc(246, 200, 1.6, C.navy, 4) + shield(246, 262, 0.8, C.navy) + T2(320, 330, "EXCLUSIONS", "WRITTEN", { z: 17, c: C.navy }));
      },
      steps: [
        "+h0 +n0 +n1 +n2 +n3 +Lst +fs +fe +ho",
        "-h0 +h1 +t0 +t1 +t2 +t3 +bx",
        "-h1 +h2 +o0 +o1",
        "-h2 +h3 -o0 -o1 +wl +Mc0 Mc0@0.7 +Mc1 Mc1@0.85 +Mc2 Mc2@0.7"] },

    // Template 104 · Logistics Trucks (LottieFiles) — https://lottiefiles.com/free-animation/logistics-trucks-DHvuLcYVdQ
    // Adapted: "move the truck and the delivery marker" -> two role cards share a goal; the sponsor lifts the barrier
    // the team truck cannot pass; the truck's trip (the project) ends, but the owner keeps running the depot.
    { ref: U[104], cap: "Sponsor and owner", n: 5,
      svg: () => hl("h0", "SPONSOR AND OWNER", C.navy) + hl("h1", "SAME GOAL, DIFFERENT JOBS", C.navy) + hl("h2", "SPONSOR REMOVES BARRIERS", C.gold) + hl("h3", "OWNER STILL ACCOUNTABLE", C.green) + hl("h4", "NOBODY SUSTAINS RESULTS", C.orange) +
        G("cs", 105, 150, R(30, 70, 150, 160, 14, C.paper, C.gold, 3.5) + person(105, 140, 1.6, C.gold) + crown(105, 98, 1) + T2(105, 194, "EXECUTIVE", "SPONSOR", { c: C.ink })) +
        G("co", 295, 150, R(220, 70, 150, 160, 14, C.paper, C.green, 3.5) + person(295, 140, 1.6, C.green) + gear(330, 98, 10, C.navy) + T2(295, 194, "PROCESS", "OWNER", { c: C.ink })) +
        G("gl", 200, 266, star(200, 262, 20) + arr(140, 236, 184, 256, C.gold, 3) + arr(260, 236, 216, 256, C.green, 3) + keyI(52, 262, 1.1) + Pa("M330 268A16 16 0 0 1 362 268", C.green, 4) + Pa("M346 268L354 256", C.ink, 3)) +
        Pa("M14 334H386", C.ink, 6) + G("gp", 200, 316, R(196, 284, 8, 50, 2, C.ink)) +
        G("arm", 200, 292, R(200, 286, 120, 12, 4, C.orange) + R(232, 286, 14, 12, 0, C.paper) + R(268, 286, 14, 12, 0, C.paper)) +
        Mv("Mt", [[60, 316], [168, 316], [330, 316]], truck(0, 0, 0.85, C.navy)) +
        Ln("Lky", "M120 236Q160 270 196 288", C.gold, 3, 'stroke-dasharray="5 5"') +
        G("pe", 356, 300, flag(372, 334, 1, C.orange) + T(314, 262, "PROJECT ENDS", { c: C.orange })) +
        G("dp", 296, 210, clock(372, 108, 14, C.green, 90)) +
        G("fd", 295, 150, noB(354, 80, 14) + Pa("M230 260L270 236L310 250L360 300", C.orange, 4, 'stroke-dasharray="6 5"')),
      steps: [
        "+h0 +cs +co",
        "-h0 +h1 +gl",
        "-h1 +h2 -gl co.o=0.3 +gp +arm +Mt Mt@0.62 +Lky arm.r=-70",
        "-h2 +h3 cs.o=0.3 co.o=1 -Lky Mt@1 +pe +dp",
        "-h3 +h4 co.o=0.25 +fd -dp"] },

    // Template 113 · Infographic Chart Creator (Motion Array) — https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/
    // Adapted: "grow columns, update the axis and labels" -> four departments hold pieces of one problem; their
    // influence and interest columns grow; then a list of names is replaced by an engagement plan.
    { ref: U[113], cap: "Who takes part", n: 4,
      svg: () => hl("h0", "WHO, AND HOW INVOLVED", C.navy) + hl("h1", "PIECES OF ONE PROBLEM", C.navy) + hl("h2", "INFLUENCE AND INTEREST", C.navy) + hl("h3", "A PLAN, NOT NAMES", C.green) +
        G("hd", 200, 190, R(30, 70, 160, 220, 14, C.paper, C.navy, 3) + person(110, 160, 1.8, C.navy) + T2(110, 240, "WHO", "PARTICIPATES", { c: C.navy }) +
          R(210, 70, 160, 220, 14, C.paper, C.green, 3) + Gs(290, 160, 1, bub(0, -10, 80, 50, C.green) + Pa("M-20 -10H20", C.green, 3)) + T2(290, 240, "HOW THEY'RE", "INVOLVED", { c: C.green })) +
        G("pz", 200, 200, R(150, 150, 48, 48, 4, C.orange) + R(202, 150, 48, 48, 4, C.gold) + R(150, 202, 48, 48, 4, C.navy) + R(202, 202, 48, 48, 4, C.green) + CAND[0](200, 200, 0.9)) +
        [[64, 100, C.orange, "RESERVATIONS", "TEAM"], [336, 100, C.gold, "REVENUE", "TEAM"], [64, 290, C.navy, "FRONT", "DESK"], [336, 290, C.green, "HOUSEKEEPING", "TEAM"]].map(([x, y, c, a, b], i) =>
          G("d" + i, x, y, person(x, y, 1.4, c) + T2(x < 200 ? x + 8 : x - 8, y + 42, a, b, { z: 17, c }))).join("") +
        G("ax", 200, 330, Pa("M20 318H380", C.navy, 3) + T(30, 80, "INFLUENCE LEVEL", { a: "start", z: 17, c: C.navy }) + R(220, 66, 16, 16, 3, C.orange) + T(244, 80, "INTEREST LEVEL", { a: "start", z: 17, c: C.orange }) +
          R(10, 66, 16, 16, 3, C.navy) + [JI.book, JI.rate, JI.desk, JI.room].map((f, i) => Gs(70 + i * 88, 344, 1.3, f(0, 0))).join("")) +
        [[150, 210], [120, 110], [90, 220], [170, 150]].map(([a, b], i) => G("B" + i, 60 + i * 88, 318, R(46 + i * 88, 318 - a, 20, a, 4, C.navy)) + G("B" + (i + 4), 80 + i * 88, 318, R(70 + i * 88, 318 - b, 20, b, 4, C.orange))).join("") +
        G("ls", 100, 210, doc(100, 196, 2.4, C.navy, 5) + noB(140, 146, 14) + T2(100, 284, "LIST OF", "NAMES", { c: C.navy })) +
        G("pl", 290, 200, R(206, 92, 176, 210, 14, C.paper, C.green, 3.5) + [0, 1, 2, 3].map((i) => person(232, 128 + i * 46, 0.75, CCOL[i]) + arr(252, 124 + i * 46, 280, 124 + i * 46, C.green, 2.5) +
          [bub(318, 122, 46, 28, C.green), env(318, 170, 0.8, C.navy), R(300, 202, 36, 26, 4, C.paper, C.navy, 2) + Pa("M306 214H330", C.navy, 2.5), Gs(318, 262, 0.8, gear(0, 0, 10, C.navy))][i]).join("") +
          okB(370, 96, 13) + T2(294, 330, "ENGAGEMENT", "PLAN", { c: C.green })) + G("ar", 190, 200, arr(160, 200, 200, 200, C.green, 4)),
      steps: [
        "+h0 +hd",
        "-h0 +h1 -hd +pz +d0 +d1 +d2 +d3",
        "-h1 +h2 -pz -d0 -d1 -d2 -d3 +ax +B0 +B4 +B1 +B5 +B2 +B6 +B3 +B7",
        "-h2 +h3 -ax -B0 -B1 -B2 -B3 -B4 -B5 -B6 -B7 +ls +ar +pl"] },

    // Template 128 · Pie chart update (Observable) — https://observablehq.com/@d3/pie-chart-update
    // Adapted: "tween the sector angles between datasets" -> the announced promise, a donut whose sectors are still
    // unknown, the four measurement entries, and an invented sector being painted in and struck out.
    { ref: U[128], cap: "Measure, then target", n: 4,
      svg: () => hl("h0", "AN ANNOUNCED PROMISE", C.navy) + hl("h1", "KNOW TODAY'S PERCENTAGE", C.orange) + hl("h2", "FOUR MEASUREMENT ENTRIES", C.green) + hl("h3", "NO INVENTED BASELINE", C.orange) +
        G("mg", 200, 190, mega(110, 190, 3, C.navy) + pill(214, 92, "FEWER RATE CORRECTIONS", C.green, C.green) + JI.key(250, 230) + Gs(286, 230, 1.2, Pa("M-10 0H10M4 -6L10 0L4 6", C.orange, 3)) + T(250, 280, "CHECK-IN FIXES", { c: C.orange })) +
        G("dn", 120, 200, ring(120, 196, 76, C.blue, 28) + Gl(120, 210, "?%", 40, C.orange) + T2(120, 304, "CURRENT", "PERCENTAGE", { c: C.orange })) +
        G("jg", 300, 200, Pa("M300 120V270M240 150H360", C.navy, 4) + Pa("M240 150L220 200H260ZM360 150L340 200H380Z", C.navy, 3) + qB(300, 110, 14) + T2(300, 304, "HOW JUDGED", "LATER?", { c: C.navy })) +
        ["PRECISE MEASURE", "RELIABLE BASELINE", "AGREED TARGET", "REPORTING RESPONSIBILITY"].map((s, i) => G("r" + i, 200, 96 + i * 66, bpill(200, 96 + i * 66, s, [C.navy, C.green, C.green, C.navy][i], (x, y) => okB(x, y, 12)))).join("") +
        G("fk", 200, 200, R(60, 180, 280, 44, 10, C.gold) + star(330, 168, 16) + star(80, 236, 12) + Gs(330, 250, 1.2, R(-4, -30, 8, 40, 3, C.ink) + Fi("M-8 10H8L4 26H-4Z", C.orange)) + T(200, 208, "ATTRACTIVE NUMBER", { c: C.ink }) +
          Pa("M50 202H350", C.orange, 5) + person(70, 316, 1.3, C.navy) + T(110, 322, "BOARD EXPECTS", { a: "start", c: C.navy })),
      steps: [
        "+h0 +mg",
        "-h0 +h1 -mg +dn +jg",
        "-h1 +h2 -dn -jg +r0 +r1 +r2 +r3",
        "-h2 +h3 -r0 -r1 -r2 -r3 +fk"] },

    // Template 132 · Easing Animations (Observable) — https://observablehq.com/@d3/easing-animations
    // Adapted: "replay motions with varied timing" -> benefits wait at the finish line behind named risks; two
    // departments then move at different speeds so the decision gate stays shut; the sponsor sees where to step in.
    { ref: U[132], cap: "Name the risks", n: 3,
      svg: () => hl("h0", "BENEFITS AND RISKS", C.navy) + hl("h1", "PRIORITIES DELAY DECISIONS", C.orange) + hl("h2", "WHERE TO INTERVENE", C.gold) +
        G("tr", 200, 150, Pa("M20 150H380", C.blue, 26) + flag(360, 150, 1.2, C.green) + star(330, 108, 18) + T2(300, 80, "EXPECTED", "BENEFITS", { a: "end", c: C.green }) +
          warn(150, 150, 1.3) + warn(250, 150, 1.3) + T(200, 206, "RISKS ON THE ROUTE", { c: C.orange })) +
        G("ln", 200, 300, Pa("M20 266H330M20 326H330", C.blue, 18) + R(250, 244, 12, 104, 3, C.orange)) + G("tf", 90, 96, gear(36, 98, 14, C.green) + okB(54, 80, 10) + T2(66, 94, "TECH FIX", "IS SIMPLE", { a: "start", z: 17, c: C.green })) +
        Mv("Ma", [[30, 266], [320, 266]], person(0, 0, 0.8, C.orange)) + Mv("Mb", [[30, 326], [320, 326]], person(0, 0, 0.8, C.navy)) +
        G("cl", 352, 296, cal(352, 290, 1, C.orange) + T2(352, 334, "WEEKS", "PASS", { c: C.orange })) +
        G("sp", 330, 290, person(352, 300, 1.4, C.gold) + crown(352, 266, 0.8) + Ci(290, 250, 10, C.orange, "", 0, 'class="vlw-blink"') + arr(330, 270, 296, 256, C.gold, 3) + T(200, 370, "SPONSOR ALERTED", { c: C.gold })),
      steps: [
        "+h0 +tr",
        "-h0 +h1 tr.o=0.35 +ln +Ma Ma@0.75 +Mb Mb@0.25 +cl +tf",
        "-h1 +h2 -cl +sp"] },

    // Template 088 · Automated Workflows (LottieFiles) — https://lottiefiles.com/free-animation/automated-workflows-XR2hxXOdEK
    // Adapted: "trigger repeated actions and complete" -> the practical page (not the glossy report) triggers the
    // Understand investigation; meanwhile four candidates still wait for the one delivery team.
    { ref: U[88], cap: "A practical handover", n: 3,
      svg: () => hl("h0", "PRACTICAL, NOT IMPRESSIVE", C.green) + hl("h1", "UNDERSTAND INVESTIGATES", C.green) + hl("h2", "CANDIDATES STILL COMPETE", C.navy) +
        G("gl", 104, 196, R(40, 96, 128, 170, 10, C.gold, C.ink, 3) + R(40, 96, 22, 170, 6, C.ink) + trophy(110, 160, 1.4, C.paper) + noB(160, 100, 14) + T2(104, 300, "GLOSSY", "REPORT", { c: C.orange })) +
        G("pp", 296, 196, doc(296, 176, 2.6, C.green, 4) + okB(340, 112, 14) + T2(296, 300, "PRACTICAL", "HANDOVER", { c: C.green })) +
        G("iv", 200, 210, [0, 1, 2, 3].map((i) => node(60 + i * 94, 200, 22, C.navy, [JI.book, JI.room, JI.key, JI.bill][i](60 + i * 94, 200)) + (i < 3 ? Pa(`M${84 + i * 94} 200H${130 + i * 94}`, C.navy, 3) : "")).join("") +
          clock(200, 150, 14, C.orange, 150) + lens(110, 250, 22, C.green) + T(104, 316, "HOW IT WORKS", { c: C.green }) + T(296, 350, "WHY PROBLEMS OCCUR", { a: "middle", z: 17, c: C.orange })) +
        G("cc", 200, 220, [0, 1, 2, 3].map((i) => node(70 + i * 87, 140, 30, CCOL[i], CAND[i](70 + i * 87, 142, 0.95))).join("") +
          person(200, 290, 1.6, C.navy) + Pa("M70 172L190 258M157 172L196 256M244 172L204 256M331 172L210 258", C.navy, 2, 'stroke-dasharray="4 5"') + T(200, 352, "ONE DELIVERY TEAM", { c: C.navy })),
      steps: [
        "+h0 +gl +pp",
        "-h0 +h1 -gl -pp +iv",
        "-h1 +h2 -iv +cc"] },

    // Template 116 · Infographics by Ruslan Klimovich (Motion Array) — https://motionarray.com/after-effects-templates/infographics-3844461/
    // Adapted: "sequence statistic graphics" -> four candidate doors for the next lesson; then the closing test:
    // the impressive document fades and the investigation it enables lights up.
    { ref: U[116], cap: "What success means", n: 2,
      svg: () => hl("h0", "NEXT: FOUR CANDIDATES", C.navy) + hl("h1", "SUCCESS ENABLES INVESTIGATION", C.green) +
        G("dr", 200, 210, [0, 1, 2, 3].map((i) => R(22 + i * 96, 110, 76, 170, 10, C.pale, CCOL[i], 3.5) + CAND[i](60 + i * 96, 180, 1.1) + Ci(84 + i * 96, 200, 4, C.navy)).join("") +
          Fi("M140 60L60 110H340L260 60Z", C.gold, 'opacity=".25"') + T(200, 326, "WHICH ONE FIRST?", { c: C.orange })) +
        G("im", 104, 200, doc(104, 186, 2.6, C.navy, 4) + star(140, 120, 16) + noB(140, 240, 14) + T2(104, 290, "LOOKS", "IMPRESSIVE", { c: C.navy })) +
        G("en", 296, 200, lens(286, 184, 44, C.green) + okB(350, 120, 14) + T2(296, 290, "ENABLES", "INVESTIGATION", { c: C.green })),
      steps: ["+h0 +dr", "-h0 +h1 -dr +im im.o=0.45 +en"] }
  ]);

  addStyle("w07-claude-v2-part1", ["O1a","O1b","O1c"]);
})();

// FILE w07-claude-v2-part2.js
// OPER621 · Week 7 · The Launch Pad Phase — animated teaching scenes v2, part 2 of 4 (O2a, O2b, O2c).
// Standalone: defines every helper it uses, registers its own scenes, appends its own rules to <style id="vl-sc-w07">.
// Parts 1-4 load in any order. Rebuilt from the GPT-6 content audit: every narration line now has its own visible
// state change, and every section is split into 8-11 distinct shots (a new visual every 2-5 lines).
//
// Contract: window.VL_SCENES['<secId>'] = { build(el), step(i, n), reset() }
//   step(i, n): n === narration line count -> one state per line; n === visual-moment count -> that moment's line;
//   any other n -> proportional. Every state is rebuilt from scratch, so seek, replay and going back are safe.
//   Motion: window.gsap drives the tween when present, otherwise requestAnimationFrame. Elements entering on a line
//   are staggered; shots push left/right; prefers-reduced-motion jumps straight to each state with no ambient loops.
// Layout: one 400x380 stage, "meet" fit, dotted backdrop extends into any spare space, so the figure fills the phone
//   slot above the text and the left 60% on a laptop. Labels are 2-4 words, 16-19 units; the narration is never shown.
// QA: every label was checked against the 400x380 frame and against every other label visible on the same line
//   (estimated glyph widths), for every narration line of every section.
// Each shot names the benchmark template it adapts (number, title, exact URL) in the comment above it.
(() => {
  "use strict";
  if (typeof window === "undefined" || typeof document === "undefined") return;
  window.VL_SCENES = window.VL_SCENES || {};
  const REG = window.VL_SCENES;
  // ---------- palette (exact values: the look engines remap them) ----------
  const C = {
    navy: "#1f4e79", orange: "#c0502a", paper: "#fbf8f1", ink: "#1b2a3a",
    blue: "#dbe7f2", green: "#317c61", pale: "#edf3f7", gold: "#d7a45c"
  };
  const NS = "http://www.w3.org/2000/svg";
  const VW = 400, VH = 380;
  // ---------- maths ----------
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const r1 = (v) => Math.round(v * 10) / 10;
  const r3 = (v) => Math.round(v * 1000) / 1000;
  const rad = (d) => (d * Math.PI) / 180;
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeBack = (t) => { const c1 = 1.5, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
  const reduced = () => {
    try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    catch (e) { return false; }
  };
  // ---------- SVG string primitives (absolute coordinates everywhere) ----------
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const at = (o) => Object.keys(o).filter((k) => o[k] !== undefined && o[k] !== null && o[k] !== false && o[k] !== "")
    .map((k) => `${k}="${o[k]}"`).join(" ");
  const R = (x, y, w, h, rx, f, s, sw, ex = "") =>
    `<rect ${at({ x: r1(x), y: r1(y), width: r1(w), height: r1(h), rx, fill: f || "none", stroke: s, "stroke-width": sw })} ${ex}/>`;
  const Ci = (x, y, r, f, s, sw, ex = "") =>
    `<circle ${at({ cx: r1(x), cy: r1(y), r: r1(r), fill: f || "none", stroke: s, "stroke-width": sw })} ${ex}/>`;
  const El = (x, y, rx, ry, f, s, sw, ex = "") =>
    `<ellipse ${at({ cx: r1(x), cy: r1(y), rx: r1(rx), ry: r1(ry), fill: f || "none", stroke: s, "stroke-width": sw })} ${ex}/>`;
  const Pa = (d, s, sw = 3, ex = "") =>
    `<path d="${d}" fill="none" stroke="${s}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
  const Fi = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
  // Self-drawing stroke (keys starting with "L"): progress in P["k.d"].
  const Ln = (k, d, s, sw = 4, ex = "") =>
    `<path data-k="${k}" d="${d}" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" fill="none" stroke="${s}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
  // Animated group; (ox, oy) is the pivot for scale and rotation.
  const G = (k, ox, oy, inner, ex = "") => `<g data-k="${k}" data-ox="${r1(ox)}" data-oy="${r1(oy)}" ${ex}>${inner}</g>`;
  // Mover (keys starting with "M"): drawn around (0,0), travels along a polyline with P["k.t"].
  const Mv = (k, pts, inner) =>
    `<g data-k="${k}" data-ox="0" data-oy="0" data-path="${pts.map((p) => p.join(",")).join(" ")}" transform="translate(${pts[0][0]} ${pts[0][1]})">${inner}</g>`;
  // Static icon placement.
  const Gs = (x, y, s, inner, ex = "") => `<g transform="translate(${r1(x)} ${r1(y)}) scale(${s})" ${ex}>${inner}</g>`;
  // Labels: 2-4 words, never narration, minimum 16 units.
  const T = (x, y, s, o = {}) =>
    `<text ${at({ x: r1(x), y: r1(y), "font-size": Math.max(16, o.z || 18), fill: o.c || C.ink, "text-anchor": o.a || "middle",
      "font-weight": 800, class: "vlw-t" + (o.nh ? " vlw-nh" : ""), "data-lab": "1" })}>${esc(s)}</text>`;
  const T2 = (x, y, a, b, o = {}) => {
    const z = Math.max(16, o.z || 18), lh = Math.round(z * 1.1);
    return `<text ${at({ x: r1(x), y: r1(y), "font-size": z, fill: o.c || C.ink, "text-anchor": o.a || "middle", "font-weight": 800,
      class: "vlw-t" + (o.nh ? " vlw-nh" : ""), "data-lab": "2" })}><tspan x="${r1(x)}" dy="0">${esc(a)}</tspan><tspan x="${r1(x)}" dy="${lh}">${esc(b)}</tspan></text>`;
  };
  // Glyphs (symbols and numerals inside icons; not labels).
  const Gl = (x, y, s, z = 18, c = C.ink) =>
    `<text x="${r1(x)}" y="${r1(y)}" font-size="${r1(z)}" fill="${c}" text-anchor="middle" font-weight="800" class="vlw-t vlw-gl">${esc(s)}</text>`;
  // Live counter text (keys starting with "N").
  const Num = (k, x, y, v, z = 30, c = C.navy, suf = "") =>
    `<text data-k="${k}" data-ox="${x}" data-oy="${y}" data-suf="${esc(suf)}" x="${x}" y="${y}" font-size="${z}" fill="${c}" text-anchor="middle" font-weight="800" class="vlw-t vlw-gl">${v}${esc(suf)}</text>`;
  const pillW = (s, z = 17) => Math.round(s.length * z * 0.66 + 28);
  const pill = (x, y, s, c = C.navy, f = C.paper, z = 17) => {
    const w = pillW(s, z);
    return R(x - w / 2, y - 18, w, 36, 18, f, c, 2.5) + T(x, y + 6, s, { z, c: f === C.paper ? c : C.paper, nh: f !== C.paper });
  };
  // Pill with a status badge inside its left end: badge(x, y) draws the badge.
  const bpill = (x, y, s, c, badge, dash = false, z = 17) => {
    const w = Math.round(s.length * z * 0.66 + 62), x0 = x - w / 2;
    return R(x0, y - 19, w, 38, 19, C.paper, c, 3, dash ? 'stroke-dasharray="7 5"' : "") + badge(x0 + 21, y) + T(x0 + 42, y + 6, s, { a: "start", z, c });
  };
  const hl = (k, s, c = C.navy, y = 32) => G(k, 200, y - 7, T(200, y, s, { z: s.length > 26 ? 18 : 20, c }));
  // ---------- icon library (centred on x, y) ----------
  const person = (x, y, s = 1, c = C.navy) => Gs(x, y, s, Ci(0, -13, 8.5, c) + Fi("M-15 17Q-15 0 0 0Q15 0 15 17Z", c));
  const hotel = (x, y, s = 1, c = C.navy, f = C.paper) => Gs(x, y, s, R(-13, -20, 26, 40, 3, f, c, 2.5) +
    [-7, 2].map((dx) => [-14, -5].map((dy) => R(dx, dy, 5, 5, 1, c)).join("")).join("") + R(-4, 9, 8, 11, 1.5, c));
  const doc = (x, y, s = 1, c = C.navy, n = 3, f = C.paper) => Gs(x, y, s,
    Fi("M-15 -20H8L15 -13V20H-15Z", f, `stroke="${c}" stroke-width="2.5" stroke-linejoin="round"`) + Pa("M8 -20V-13H15", c, 2) +
    Array.from({ length: n }, (_, i) => Pa(`M-9 ${-8 + i * 8}H${i % 2 ? 4 : 9}`, c, 2.5)).join(""));
  const ck = (x, y, s = 1, c = C.green, sw = 4) => Pa(`M${r1(x - 9 * s)} ${r1(y)}l${r1(6 * s)} ${r1(7 * s)}l${r1(13 * s)} ${r1(-15 * s)}`, c, sw);
  const xx = (x, y, s = 1, c = C.orange, sw = 4) => Pa(`M${r1(x - 8 * s)} ${r1(y - 8 * s)}l${r1(16 * s)} ${r1(16 * s)}m0 ${r1(-16 * s)}l${r1(-16 * s)} ${r1(16 * s)}`, c, sw);
  const okB = (x, y, r = 12, c = C.green) => Ci(x, y, r, c) + ck(x + 1, y + 1, r / 15, C.paper, 3);
  const noB = (x, y, r = 12, c = C.orange) => Ci(x, y, r, c) + xx(x, y, r / 17, C.paper, 3);
  const qB = (x, y, r = 14, c = C.orange) => Ci(x, y, r, C.paper, c, 3) + Gl(x, y + r * 0.45, "?", r * 1.3, c);
  const exB = (x, y, r = 12, c = C.orange) => Ci(x, y, r, c) + Pa(`M${x} ${r1(y - r * 0.5)}V${r1(y + r * 0.12)}`, C.paper, 3) + Ci(x, y + r * 0.45, 1.8, C.paper);
  const clock = (x, y, r, c = C.navy, a = 60) => Ci(x, y, r, C.paper, c, 3) +
    Pa(`M${x} ${y}V${r1(y - r * 0.6)}M${x} ${y}L${r1(x + r * 0.5 * Math.cos(rad(a - 90)))} ${r1(y + r * 0.5 * Math.sin(rad(a - 90)))}`, c, 3);
  const starD = (x, y, r) => { let d = ""; for (let i = 0; i < 10; i++) { const a = rad(-90 + i * 36), q = i % 2 ? r * 0.45 : r; d += (i ? "L" : "M") + r1(x + q * Math.cos(a)) + " " + r1(y + q * Math.sin(a)); } return d + "Z"; };
  const star = (x, y, r, c = C.gold) => Fi(starD(x, y, r), c);
  const target = (x, y, r, c = C.navy) => Ci(x, y, r, C.paper, c, 2.5) + Ci(x, y, r * 0.58, "none", c, 2.5) + Ci(x, y, r * 0.2, c);
  const shield = (x, y, s = 1, c = C.green) => Gs(x, y, s, Fi("M0 -18L15 -12V1Q15 13 0 19Q-15 13 -15 1V-12Z", C.paper, `stroke="${c}" stroke-width="3" stroke-linejoin="round"`) + ck(0, 0, 0.7, c, 3));
  const keyI = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Ci(-8, 0, 7, "none", c, 3.5) + Pa("M-1 0H16M11 0V6M16 0V5", c, 3.5));
  const crown = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Fi("M-14 8L-12 -8L-5 0L0 -12L5 0L12 -8L14 8Z", c) + R(-14, 8, 28, 5, 2, c));
  const lens = (x, y, r = 16, c = C.navy) => Ci(x, y, r, C.paper, c, 4, 'fill-opacity=".45"') + Pa(`M${r1(x + r * 0.7)} ${r1(y + r * 0.7)}L${r1(x + r * 1.5)} ${r1(y + r * 1.5)}`, c, 6);
  const flag = (x, y, s = 1, c = C.green) => Gs(x, y, s, Pa("M0 0V-34", C.ink, 3) + Fi("M0 -34L22 -28L0 -21Z", c));
  const pin = (x, y, s = 1, c = C.orange) => Gs(x, y, s, Fi("M0 0C-5 -12 -16 -18 -16 -31A16 16 0 1 1 16 -31C16 -18 5 -12 0 0Z", c) + Ci(0, -31, 6, C.paper));
  const bub = (x, y, w, h, c = C.navy, f = C.paper, tail = -1) =>
    Fi(`M${r1(x + tail * w * 0.25 - 7)} ${r1(y + h / 2 - 2)}L${r1(x + tail * w * 0.25 + tail * 12)} ${r1(y + h / 2 + 13)}L${r1(x + tail * w * 0.25 + 7)} ${r1(y + h / 2 - 2)}Z`, f, `stroke="${c}" stroke-width="2.5" stroke-linejoin="round"`) +
    R(x - w / 2, y - h / 2, w, h, 12, f, c, 2.5);
  const cloud = (x, y, s = 1, f = C.blue, c = C.navy) => Gs(x, y, s, Fi("M-30 12Q-42 12 -40 0Q-38 -12 -24 -10Q-20 -26 -2 -24Q14 -30 22 -14Q38 -14 38 0Q38 12 26 12Z", f, `stroke="${c}" stroke-width="2.5"`));
  const cal = (x, y, s = 1, c = C.navy, f = C.paper) => Gs(x, y, s, R(-18, -16, 36, 34, 5, f, c, 2.5) + R(-18, -16, 36, 10, 4, c) + Pa("M-10 -20V-12M10 -20V-12", c, 3) +
    [0, 1, 2].map((i) => R(-12 + i * 9, 0, 6, 5, 1, c)).join("") + [0, 1].map((i) => R(-12 + i * 9, 8, 6, 5, 1, c)).join(""));
  const truck = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-30, -20, 38, 26, 3, c) + Fi("M8 -12H22L30 -2V6H8Z", c) + R(13, -9, 9, 7, 1.5, C.pale) +
    Ci(-18, 8, 6, C.ink) + Ci(-18, 8, 2.5, C.pale) + Ci(20, 8, 6, C.ink) + Ci(20, 8, 2.5, C.pale));
  const bed = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-20, -2, 40, 10, 3, C.blue, c, 2.5) + R(-20, -10, 12, 9, 3, C.paper, c, 2) + Pa("M-20 -14V14M20 0V14", c, 3));
  const scr = (x, y, w, h, c = C.ink) => R(x - w / 2, y - h / 2, w, h, 5, c) + R(x - w / 2 + 4, y - h / 2 + 4, w - 8, h - 8, 3, C.pale) + R(x - 5, y + h / 2, 10, 6, 1, c) + R(x - 15, y + h / 2 + 5, 30, 4, 2, c);
  const gavel = (x, y, s = 1, c = C.ink) => Gs(x, y, s, `<g transform="rotate(-35)">${R(-18, -9, 36, 18, 4, c) + R(-3, 9, 6, 34, 3, c)}</g>` + R(-16, 30, 32, 7, 3, c));
  const sciss = (x, y, s = 1, c = C.ink) => Gs(x, y, s, Ci(-9, 12, 7, "none", c, 3) + Ci(9, 12, 7, "none", c, 3) + Pa("M-5 6L12 -20M5 6L-12 -20", c, 3.5));
  const lockI = (x, y, s = 1, c = C.navy, open = false) => Gs(x, y, s, R(-12, -4, 24, 20, 4, c) +
    Pa(open ? "M-7 -4V-12Q-7 -20 0 -20Q7 -20 7 -14" : "M-7 -4V-11Q-7 -19 0 -19Q7 -19 7 -11V-4", c, 3.5) + Ci(0, 5, 3, C.paper));
  const mega = (x, y, s = 1, c = C.orange) => Gs(x, y, s, Fi("M-14 -6L8 -16V16L-14 6Z", c) + R(-22, -7, 9, 14, 2, c) + Pa("M14 -10Q22 0 14 10M19 -16Q31 0 19 16", c, 2.5) + Pa("M-16 7L-12 18", c, 4));
  const warn = (x, y, s = 1, c = C.orange) => Gs(x, y, s, Fi("M0 -16L16 12H-16Z", C.paper, `stroke="${c}" stroke-width="3" stroke-linejoin="round"`) + Pa("M0 -5V3", c, 3.2) + Ci(0, 8, 1.9, c));
  const gear = (x, y, r, c = C.navy) => Gs(x, y, 1, [0, 45, 90, 135].map((a) => R(-r * 1.28, -r * 0.24, r * 2.56, r * 0.48, 2, c, "", "", `transform="rotate(${a})"`)).join("") + Ci(0, 0, r, c) + Ci(0, 0, r * 0.42, C.paper));
  const suit = (x, y, s = 1, c = C.orange) => Gs(x, y, s, R(-13, -10, 26, 22, 4, c) + Pa("M-5 -10V-15H5V-10", c, 3) + Pa("M-13 -1H13", C.paper, 2));
  const bell = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Fi("M-14 6A14 14 0 0 1 14 6Z", c) + R(-18, 6, 36, 5, 2, C.ink) + Ci(0, -10, 3, C.ink));
  const bulb = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Ci(0, -6, 13, c) + R(-6, 6, 12, 9, 2, C.ink) + Pa("M-4 -6L0 0L4 -6", C.paper, 2));
  const rocket = (x, y, s = 1, c = C.orange) => Gs(x, y, s, Fi("M0 -34Q12 -22 12 0V12H-12V0Q-12 -22 0 -34Z", C.paper, `stroke="${C.navy}" stroke-width="3"`) +
    Ci(0, -12, 5, C.blue, C.navy, 2.5) + Fi("M-12 0L-22 14H-12ZM12 0L22 14H12Z", c));
  const trophy = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Fi("M-14 -18H14V-6Q14 8 0 10Q-14 8 -14 -6Z", c) + Pa("M-14 -12Q-24 -12 -20 -2Q-17 4 -12 2M14 -12Q24 -12 20 -2Q17 4 12 2", c, 3) + R(-3, 10, 6, 8, 1, c) + R(-11, 18, 22, 6, 2, c));
  const book = (x, y, s = 1, c = C.navy) => Gs(x, y, s, Fi("M0 -12Q-10 -18 -22 -14V14Q-10 10 0 16Q10 10 22 14V-14Q10 -18 0 -12Z", C.paper, `stroke="${c}" stroke-width="2.5" stroke-linejoin="round"`) + Pa("M0 -12V16", c, 2.5));
  const server = (x, y, s = 1, c = C.navy) => Gs(x, y, s, [0, 1, 2].map((i) => R(-16, -18 + i * 12, 32, 10, 2, C.paper, c, 2.5) + Ci(10, -13 + i * 12, 2, c)).join(""));
  const eye = (x, y, s = 1, c = C.navy) => Gs(x, y, s, Pa("M-16 0Q0 -13 16 0Q0 13 -16 0Z", c, 3) + Ci(0, 0, 5, c));
  const arr = (x1, y1, x2, y2, c = C.navy, sw = 3.5, ex = "") => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 11;
    return Pa(`M${r1(x1)} ${r1(y1)}L${r1(x2 - Math.cos(a) * 4)} ${r1(y2 - Math.sin(a) * 4)}`, c, sw, ex) +
      Fi(`M${r1(x2 + Math.cos(a) * 2)} ${r1(y2 + Math.sin(a) * 2)}L${r1(x2 - Math.cos(a - 0.45) * h)} ${r1(y2 - Math.sin(a - 0.45) * h)}L${r1(x2 - Math.cos(a + 0.45) * h)} ${r1(y2 - Math.sin(a + 0.45) * h)}Z`, c);
  };
  const wall = (x, y, w, h, c = C.orange) => {
    let s = ""; const bw = w / 3, bh = h / 4;
    for (let r = 0; r < 4; r++) for (let i = 0; i < 4; i++) {
      const a = x + i * bw - (r % 2 ? bw / 2 : 0), x0 = Math.max(x, a), x1 = Math.min(x + w, a + bw);
      if (x1 - x0 > 3) s += R(x0 + 1, y + r * bh + 1, x1 - x0 - 2, bh - 2, 2, C.paper, c, 2);
    }
    return s;
  };
  const desk = (x, y, w, c = C.navy) => R(x - w / 2, y, w, 14, 4, c) + R(x - w / 2 + 6, y + 14, w - 12, 24, 3, C.blue, c, 2);
  const chairE = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-14, -24, 28, 26, 6, "none", c, 2.5, 'stroke-dasharray="4 4"') +
    R(-17, 2, 34, 7, 3, "none", c, 2.5, 'stroke-dasharray="4 4"') + Pa("M-14 9V22M14 9V22", c, 2.5, 'stroke-dasharray="4 4"'));
  const cab = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-18, -26, 36, 52, 4, C.paper, c, 2.5) + [0, 1, 2].map((i) => R(-13, -21 + i * 16, 26, 13, 2, C.blue, c, 2) + R(-5, -16 + i * 16, 10, 3, 1.5, c)).join(""));
  const env = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-18, -12, 36, 24, 3, C.paper, c, 2.5) + Pa("M-18 -12L0 2L18 -12", c, 2.5));
  const cam = (x, y, s = 1, c = C.ink) => Gs(x, y, s, R(-18, -10, 36, 24, 4, c) + R(-8, -15, 14, 6, 2, c) + Ci(0, 2, 7, C.pale) + Ci(0, 2, 3.5, c));
  const wrench = (x, y, s = 1, c = C.navy) => Gs(x, y, s, `<g transform="rotate(45)">${R(-3.5, -4, 7, 30, 3, c) + Fi("M-10 -14A10 10 0 1 0 10 -14L5 -14L5 -6L-5 -6L-5 -14Z", c)}</g>`);
  const coin = (x, y, r = 9, c = C.gold) => Ci(x, y, r, c, C.ink, 1.5) + Pa(`M${x} ${r1(y - r * 0.5)}V${r1(y + r * 0.5)}`, C.paper, 2.5);
  const link = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-16, -7, 20, 14, 7, "none", c, 3.5) + R(-4, -7, 20, 14, 7, "none", c, 3.5));
  const face = (x, y, r, c = C.navy, mood = 0) => Ci(x, y, r, C.paper, c, 3) + Ci(x - r * 0.35, y - r * 0.2, r * 0.1 + 1, c) + Ci(x + r * 0.35, y - r * 0.2, r * 0.1 + 1, c) +
    Pa(mood > 0 ? `M${r1(x - r * 0.4)} ${r1(y + r * 0.2)}Q${x} ${r1(y + r * 0.6)} ${r1(x + r * 0.4)} ${r1(y + r * 0.2)}` :
      mood < 0 ? `M${r1(x - r * 0.4)} ${r1(y + r * 0.48)}Q${x} ${r1(y + r * 0.08)} ${r1(x + r * 0.4)} ${r1(y + r * 0.48)}` : `M${r1(x - r * 0.4)} ${r1(y + r * 0.35)}H${r1(x + r * 0.4)}`, c, 3);
  const compass = (x, y, r, c = C.navy) => Ci(x, y, r, C.paper, c, 3) + Fi(`M${x} ${r1(y - r * 0.75)}L${r1(x + r * 0.2)} ${y}L${x} ${r1(y + r * 0.1)}L${r1(x - r * 0.2)} ${y}Z`, C.orange) +
    Fi(`M${x} ${r1(y + r * 0.75)}L${r1(x + r * 0.2)} ${y}L${x} ${r1(y - r * 0.1)}L${r1(x - r * 0.2)} ${y}Z`, c);
  const brk = (x1, x2, y, c = C.green, sw = 4, down = true) => Pa(`M${x1} ${y + (down ? 12 : -12)}V${y}H${x2}V${y + (down ? 12 : -12)}`, c, sw);
  const node = (x, y, r, c, inner = "") => Ci(x, y, r, C.paper, c, 3.5) + inner;
  const card = (x, y, w, h, c, inner = "", f = C.paper) => R(x - w / 2, y - h / 2, w, h, 12, f, c, 3) + inner;
  const ring = (x, y, r, c = C.blue, sw = 8) => Ci(x, y, r, "none", c, sw);
  const ringD = (k, x, y, r, c = C.orange, sw = 8) => Ln(k, `M${x} ${y - r}A${r} ${r} 0 1 1 ${r1(x - 0.1)} ${y - r}`, c, sw, 'stroke-linecap="butt"');
  // Candidate process icons (Qasr's four candidates), centred on (x, y).
  const CAND = [
    (x, y, s = 1) => Gs(x, y, s, person(-8, 6, 0.85, C.green) + suit(13, 12, 0.6, C.orange)),
    (x, y, s = 1) => Gs(x, y, s, doc(-6, 0, 0.85, C.navy) + coin(12, 10, 8)),
    (x, y, s = 1) => Gs(x, y, s, scr(0, -4, 38, 28, C.ink) + Ci(0, -4, 6, C.orange)),
    (x, y, s = 1) => Gs(x, y, s, bed(0, 2, 0.95, C.navy) + keyI(10, -14, 0.5, C.gold))
  ];
  const CCOL = [C.green, C.navy, C.orange, C.gold];
  // Journey node icons.
  const JI = {
    book: (x, y) => cal(x, y, 0.62, C.navy),
    rate: (x, y) => coin(x, y, 9),
    room: (x, y) => bed(x, y, 0.55, C.navy),
    desk: (x, y) => bell(x, y + 2, 0.62, C.gold),
    bill: (x, y) => doc(x, y, 0.55, C.navy, 2),
    out: (x, y) => suit(x, y, 0.7, C.orange),
    key: (x, y) => keyI(x + 2, y, 0.6, C.gold),
    guest: (x, y) => person(x, y + 4, 0.55, C.green)
  };
  // ---------- engine ----------
  // Pose = flat map "<key>.<prop>" -> number. Props: o x y s sx sy r d t n.
  // Key kinds by first letter: L drawable stroke, B vertical bar (sy), H horizontal bar (sx), M mover (t), N counter (n).
  function initKey(P, k, local) {
    const kind = local[0];
    if (kind === "L") { P[k + ".o"] = 1; P[k + ".d"] = 0; }
    else if (kind === "B") { P[k + ".o"] = 0; P[k + ".sy"] = 0.04; }
    else if (kind === "H") { P[k + ".o"] = 0; P[k + ".sx"] = 0.04; }
    else if (kind === "M") { P[k + ".o"] = 0; P[k + ".t"] = 0; P[k + ".x"] = 0; P[k + ".y"] = 0; P[k + ".s"] = 1; }
    else if (kind === "N") { P[k + ".o"] = 0; P[k + ".n"] = 0; P[k + ".s"] = 1; }
    else { P[k + ".o"] = 0; P[k + ".s"] = 0.86; P[k + ".x"] = 0; P[k + ".y"] = 8; P[k + ".r"] = 0; }
  }
  function showKey(P, k, local) {
    const kind = local[0];
    P[k + ".o"] = 1;
    if (kind === "L") P[k + ".d"] = 1;
    else if (kind === "B") P[k + ".sy"] = 1;
    else if (kind === "H") P[k + ".sx"] = 1;
    else if (kind !== "M" && kind !== "N") { P[k + ".s"] = 1; P[k + ".x"] = 0; P[k + ".y"] = 0; P[k + ".r"] = 0; }
  }
  // Step DSL: "+k" show, "-k" hide, "~k" dim, "*k" emphasise, "=k" normal size, "k@0.5" move along path,
  // "k.p=v" set any prop, "!k" ping target, "@x,y" ping point.
  function runStep(str, P, pre, ord, pg) {
    if (!str) return;
    let idx = 0;
    str.trim().split(/\s+/).forEach((tok) => {
      let m;
      if (tok[0] === "@") { const v = tok.slice(1).split(",").map(Number); if (pg) pg.xy = v; return; }
      if (tok[0] === "!") { if (pg) pg.k = pre + tok.slice(1); return; }
      if ((m = tok.match(/^([+\-~*=])(\w+)$/))) {
        const local = m[2], k = pre + local;
        if (m[1] === "+") showKey(P, k, local);
        else if (m[1] === "-") { P[k + ".o"] = 0; if (local[0] === "L") P[k + ".d"] = 0; }
        else if (m[1] === "~") P[k + ".o"] = 0.28;
        else if (m[1] === "*") { P[k + ".o"] = 1; P[k + ".s"] = 1.14; }
        else if (m[1] === "=") P[k + ".s"] = 1;
        if (ord && !(k in ord)) ord[k] = idx++;
        if (pg && !pg.first && (m[1] === "+" || m[1] === "*")) pg.first = k;
        return;
      }
      if ((m = tok.match(/^(\w+)@(-?[\d.]+)$/))) {
        const k = pre + m[1]; P[k + ".t"] = Number(m[2]); P[k + ".o"] = 1;
        if (ord && !(k in ord)) ord[k] = idx++;
        if (pg && !pg.first) pg.first = k;
        return;
      }
      if ((m = tok.match(/^(\w+)\.(o|x|y|s|sx|sy|r|d|t|n)=(-?[\d.]+)$/))) {
        const k = pre + m[1]; P[k + "." + m[2]] = Number(m[3]);
        if (ord && !(k in ord)) ord[k] = idx++;
        return;
      }
      if (typeof console !== "undefined") console.warn("VL w07: bad step token", tok);
    });
  }
  const along = (pts, t) => {
    if (pts.length < 2) return pts[0] || [0, 0];
    const seg = []; let tot = 0;
    for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); tot += l; }
    let d = clamp(t, 0, 1) * tot;
    for (let i = 0; i < seg.length; i++) {
      if (d <= seg[i] || i === seg.length - 1) { const u = seg[i] ? clamp(d / seg[i], 0, 1) : 0; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u]; }
      d -= seg[i];
    }
    return pts[pts.length - 1];
  };
  function applyP(P, R) {
    for (const k in R) {
      const e = R[k];
      const o = P[k + ".o"], d = P[k + ".d"], t = P[k + ".t"];
      if (o !== undefined) e.setAttribute("opacity", r3(clamp(o, 0, 1)));
      if (o !== undefined || d !== undefined) {
        const vis = (o === undefined || o >= 0.01) && (d === undefined || d >= 0.004);
        e.style.visibility = vis ? "" : "hidden";
      }
      const x = P[k + ".x"], y = P[k + ".y"], s = P[k + ".s"], r = P[k + ".r"], sx = P[k + ".sx"], sy = P[k + ".sy"];
      const mv = e._pts && t !== undefined;
      if (mv || x !== undefined || y !== undefined || s !== undefined || r !== undefined || sx !== undefined || sy !== undefined) {
        const b = mv ? along(e._pts, t) : [0, 0];
        const ss = s === undefined ? 1 : Math.max(0.001, s);
        const kx = ss * (sx === undefined ? 1 : Math.max(0.001, sx)), ky = ss * (sy === undefined ? 1 : Math.max(0.001, sy));
        e.setAttribute("transform", `translate(${r1(b[0] + (x || 0) + e._ox)} ${r1(b[1] + (y || 0) + e._oy)}) rotate(${r1(r || 0)}) scale(${r3(kx)} ${r3(ky)}) translate(${-e._ox} ${-e._oy})`);
      }
      if (d !== undefined) e.setAttribute("stroke-dashoffset", r3(1 - clamp(d, 0, 1)));
      const n = P[k + ".n"];
      if (n !== undefined) e.textContent = String(Math.round(n)) + e._suf;
    }
  }
  function lineOf(i, n, L, M) {
    let ii = Number(i), nn = Number(n);
    if (!Number.isFinite(ii)) ii = 0;
    if (!Number.isFinite(nn) || nn < 1) nn = L;
    ii = clamp(Math.floor(ii), 0, Math.floor(nn) - 1); nn = Math.floor(nn);
    if (nn === L) return ii;
    if (M && nn === M.length) return M[ii];
    if (nn <= 1) return 0;
    return clamp(Math.round((ii * (L - 1)) / (nn - 1)), 0, L - 1);
  }
  const PUSH = 34;
  function section(id, title, L, M, shotDefs) {
    let a = 0;
    const S = shotDefs.map((s, i) => {
      const pre = `s${i}_`;
      const raw = s.svg();
      const svg = raw.replace(/data-k="(\w+)"/g, (m0, k) => `data-k="${pre}${k}"`);
      const keys = [];
      raw.replace(/data-k="(\w+)"/g, (m0, k) => { keys.push(k); return m0; });
      const sh = { i, a, n: s.n, cap: s.cap, ref: s.ref, base: s.base || "", steps: s.steps, svg, raw, keys, pre };
      const p0 = {};
      keys.forEach((k) => initKey(p0, pre + k, k));
      runStep(sh.base.split(/\s+/).filter(Boolean).map((k) => "+" + k).join(" "), p0, pre, null, null);
      sh.p0 = p0;
      a += s.n;
      return sh;
    });
    const pose = (line) => {
      const si = Math.max(0, S.findIndex((s) => line >= s.a && line < s.a + s.n));
      const sh = S[si], P = Object.assign({}, sh.p0), ord = {}, pg = {};
      S.forEach((s, i) => {
        P[`S${i}.o`] = i === si ? 1 : 0;
        P[`S${i}.x`] = i === si ? 0 : (i < si ? -PUSH : PUSH);
        P[`S${i}.s`] = i === si ? 1 : 0.97;
      });
      const loc = clamp(line - sh.a, 0, sh.n - 1);
      for (let j = 0; j <= loc; j++) runStep(sh.steps[j], P, sh.pre, j === loc ? ord : null, j === loc ? pg : null);
      return { P, si, ord, pg };
    };
    let root = null, Rm = {}, cur = null, anim = null, raf = 0, lastLine = -1;
    const stop = () => {
      if (anim && anim.kill) { try { anim.kill(); } catch (e) { /* ignore */ } }
      anim = null;
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
    };
    const ping = (pg) => {
      if (!root || reduced()) return;
      const c = root.querySelector(".vlw-ping");
      if (!c) return;
      let x = null, y = null;
      if (pg.xy) { x = pg.xy[0]; y = pg.xy[1]; }
      else {
        const e = Rm[pg.k || pg.first];
        if (e && e.getBBox) { try { const b = e.getBBox(); x = b.x + b.width / 2; y = b.y + b.height / 2; } catch (er) { x = null; } }
      }
      if (x === null || !Number.isFinite(x)) return;
      c.setAttribute("cx", r1(x)); c.setAttribute("cy", r1(y));
      try {
        if (window.gsap && window.gsap.fromTo) {
          window.gsap.killTweensOf(c);
          window.gsap.fromTo(c, { attr: { r: 8 }, opacity: 0.8 }, { attr: { r: 40 }, opacity: 0, duration: 0.95, delay: 0.35, ease: "power2.out" });
        } else if (c.animate) {
          c.animate([{ r: "8px", opacity: 0.8 }, { r: "40px", opacity: 0 }], { duration: 950, delay: 350, easing: "ease-out" });
        }
      } catch (er) { /* static state already correct */ }
    };
    const show = (line, live) => {
      if (!root) return;
      const { P: tgt, si, ord, pg } = pose(line);
      const chip = root.querySelector(".vlw-chip");
      if (chip) chip.textContent = S[si].cap;
      const bar = root.querySelector(".vlw-bar i");
      if (bar) bar.style.width = `${L <= 1 ? 100 : r1((100 * line) / (L - 1))}%`;
      root.setAttribute("data-line", String(line));
      stop();
      if (!live || reduced() || !cur) { cur = tgt; applyP(cur, Rm); lastLine = line; return; }
      const from = cur, keys = Object.keys(tgt), p0 = S[si].p0;
      const delay = {};
      for (const k in ord) delay[k] = Math.min(0.42, ord[k] * 0.085);
      const base = keys.map((key) => key.slice(0, key.lastIndexOf(".")));
      const prop = keys.map((key) => key.slice(key.lastIndexOf(".") + 1));
      const frame = (t) => {
        const P = {};
        for (let j = 0; j < keys.length; j++) {
          const key = keys[j], b = tgt[key];
          let a0 = from[key];
          if (a0 === undefined) a0 = p0[key];
          if (a0 === undefined) a0 = b;
          const dl = delay[base[j]] || 0, u = clamp((t - dl) / (1 - dl), 0, 1);
          P[key] = a0 + (b - a0) * (prop[j] === "s" && base[j][0] !== "S" ? easeBack(u) : easeIO(u));
        }
        cur = P; applyP(P, Rm);
      };
      const dur = 1.15;
      if (window.gsap && window.gsap.to) {
        const proxy = { t: 0 };
        anim = window.gsap.to(proxy, { t: 1, duration: dur, ease: "none", onUpdate: () => frame(proxy.t), onComplete: () => frame(1) });
      } else {
        const t0 = performance.now();
        const loop = (now) => { const t = clamp((now - t0) / (dur * 1000), 0, 1); frame(t); raf = t < 1 ? requestAnimationFrame(loop) : 0; };
        raf = requestAnimationFrame(loop);
      }
      if (line !== lastLine) ping(pg);
      lastLine = line;
    };
    const api = {
      build(el) {
        if (!el) return;
        stop();
        root = document.createElement("div");
        root.className = `vls-w07-${id}`;
        root.innerHTML =
          `<div class="vlw-stage"><svg xmlns="${NS}" viewBox="-24 -12 ${VW + 48} ${VH + 24}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(title)}">` +
          `<defs><pattern id="vlw7v2dots-${id}" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="${C.blue}"/></pattern></defs>` +
          `<rect x="-800" y="-800" width="2000" height="2000" fill="url(#vlw7v2dots-${id})" opacity=".7"/>` +
          S.map((s) => `<g data-k="S${s.i}" data-ox="200" data-oy="190">${s.svg}</g>`).join("") +
          `<circle class="vlw-ping" cx="200" cy="190" r="8" fill="none" stroke="${C.orange}" stroke-width="3" opacity="0"/>` +
          `</svg></div>` +
          `<div class="vlw-foot"><span class="vlw-kick">${esc(title)}</span><span class="vlw-chip" aria-live="polite"></span></div>` +
          `<div class="vlw-bar"><i></i></div>`;
        el.replaceChildren(root);
        // Safety net for wider host fonts: nudge any label that would cross the frame edge back inside it.
        root.querySelectorAll("text[data-lab]").forEach((t) => {
          try {
            const b = t.getBBox(); if (!b || !b.width) return;
            let dx = 0;
            if (b.width > VW - 8) { t.setAttribute("textLength", VW - 8); t.setAttribute("lengthAdjust", "spacingAndGlyphs"); }
            else if (b.x < 4) dx = 4 - b.x; else if (b.x + b.width > VW - 4) dx = VW - 4 - (b.x + b.width);
            if (dx) [t, ...t.querySelectorAll("tspan")].forEach((e) => { const x = Number(e.getAttribute("x")); if (Number.isFinite(x)) e.setAttribute("x", r1(x + dx)); });
          } catch (er) { /* layout not available: keep authored positions */ }
        });
        Rm = {};
        root.querySelectorAll("[data-k]").forEach((e) => {
          Rm[e.getAttribute("data-k")] = e;
          e._ox = Number(e.getAttribute("data-ox")) || 0;
          e._oy = Number(e.getAttribute("data-oy")) || 0;
          e._suf = e.getAttribute("data-suf") || "";
          const p = e.getAttribute("data-path");
          e._pts = p ? p.split(" ").map((q) => q.split(",").map(Number)) : null;
        });
        cur = null; lastLine = -1;
        show(0, false);
      },
      step(i, n) { show(lineOf(i, n, L, M), true); },
      reset() { stop(); cur = null; lastLine = -1; show(0, false); }
    };
    Object.defineProperty(api, "_vlw", { value: { id, title, L, M, shots: S, pose }, enumerable: false });
    REG[id] = api;
  }
  // ---------- one shared stylesheet, every rule scoped under .vls-w07-<secId> ----------
  const baseCss = (id) => {
    const S = `.vls-w07-${id}`;
    return `
${S}{position:relative;width:100%;height:100%;min-height:0;display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr) auto auto;box-sizing:border-box;overflow:hidden;color:${C.ink};font-family:inherit}
${S} *,${S} *::before,${S} *::after{box-sizing:border-box}
${S} .vlw-stage{position:relative;min-height:0;overflow:hidden}
${S} .vlw-stage svg{display:block;width:100%;height:100%;font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;text-rendering:geometricPrecision}
${S} .vlw-t{paint-order:stroke;stroke:${C.paper};stroke-width:5px;stroke-linejoin:round;pointer-events:none;letter-spacing:.02em}
${S} .vlw-nh,${S} .vlw-gl{stroke:none}
${S} .vlw-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:5px 10px 4px;min-height:32px;min-width:0}
${S} .vlw-kick{min-width:0;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:${C.navy};opacity:.75;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
${S} .vlw-chip{font-size:14px;font-weight:800;letter-spacing:.03em;color:${C.paper};background:${C.navy};border-radius:999px;padding:4px 12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;margin-left:auto}
${S} .vlw-bar{height:3px;background:${C.blue}}
${S} .vlw-bar i{display:block;height:100%;width:0;background:${C.orange};transition:width .6s ease}
${S} .vlw-pulse{animation:vlw7v2-pulse 2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
${S} .vlw-bob{animation:vlw7v2-bob 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
${S} .vlw-spin{animation:vlw7v2-spin 8s linear infinite;transform-box:fill-box;transform-origin:center}
${S} .vlw-flow{stroke-dasharray:8 9;animation:vlw7v2-flow 1.3s linear infinite}
${S} .vlw-shake{animation:vlw7v2-shake .9s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
${S} .vlw-blink{animation:vlw7v2-blink 1.6s ease-in-out infinite}
@media (max-width:420px){${S} .vlw-kick{display:none}${S} .vlw-chip{margin:0 auto}}
@media (prefers-reduced-motion:reduce){${S} *,${S} *::before,${S} *::after{animation:none!important;transition:none!important}}`;
  };
  const KEYFRAMES = `
@keyframes vlw7v2-pulse{0%,100%{transform:scale(.94);opacity:.65}50%{transform:scale(1.06);opacity:1}}
@keyframes vlw7v2-bob{0%,100%{transform:translateY(-3px)}50%{transform:translateY(3px)}}
@keyframes vlw7v2-spin{to{transform:rotate(360deg)}}
@keyframes vlw7v2-flow{to{stroke-dashoffset:-34}}
@keyframes vlw7v2-shake{0%,100%{transform:rotate(0)}25%{transform:rotate(-4deg)}75%{transform:rotate(4deg)}}
@keyframes vlw7v2-blink{0%,100%{opacity:1}50%{opacity:.35}}`;
  const addStyle = (mark, ids) => {
    let st = document.getElementById("vl-sc-w07");
    if (!st) { st = document.createElement("style"); st.id = "vl-sc-w07"; document.head.appendChild(st); }
    const tag = `/* ${mark} */`;
    if (st.textContent.indexOf(tag) >= 0) return;
    st.textContent += `\n${tag}\n${KEYFRAMES}\n${ids.map(baseCss).join("\n")}\n`;
  };
  // ---------- benchmark registry (animation-benchmark-part2: number -> exact URL) ----------
  const U = {
    76: "https://dribbble.com/shots/3791748-Workflow-Animation", // Workflow Animation
    77: "https://dribbble.com/shots/26275497-Workflow-AI-Animation", // Workflow AI Animation
    78: "https://dribbble.com/shots/27247003-Data-Workflow-Animation", // Data Workflow Animation
    79: "https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design", // Product Workflow Animation & UI Motion Design
    80: "https://dribbble.com/shots/27476599-Creative-Design-Workflow-Animation", // Creative Design Workflow Animation
    81: "https://dribbble.com/shots/27600376-Clean-Workflow-Visualization-with-Motion-Graphics", // Clean Workflow Visualization with Motion Graphics
    82: "https://www.behance.net/gallery/53752435/Motion-Design-Process", // Motion Design Process
    83: "https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion", // The Process Architectural Motion
    84: "https://www.behance.net/gallery/159045079/Process-What-is-a-Motion-Designer-", // Process - What is a Motion Designer?
    85: "https://www.behance.net/gallery/190390491/Creative-process-Motion-design-creative-project", // Creative process Motion design creative project
    86: "https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm", // Workflow by a
    87: "https://lottiefiles.com/free-animation/workflow-Jt52qpU9fj", // Workflow by Muammar Faiq
    88: "https://lottiefiles.com/free-animation/automated-workflows-XR2hxXOdEK", // Automated Workflows
    89: "https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5", // Git Workflow 1
    90: "https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU", // Multi-Step Icon Animation
    91: "https://lottiefiles.com/free-animation/cro-process-RaUu5ps2to", // cro process
    92: "https://lottiefiles.com/free-animation/process-fmpDUgNx8K", // process connecting
    93: "https://lottiefiles.com/free-animation/process-para-qujCEQ2AKT", // Process-Para
    94: "https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP", // Process - Success
    95: "https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8", // contract process
    96: "https://lottiefiles.com/free-animation/process-in-cub-9iNG7QP0qC", // Process in cub
    97: "https://lottiefiles.com/free-animation/business-solution-pNyNfkcRsa", // Business Solution conveyor
    98: "https://lottiefiles.com/free-animation/factory-4XJZcnPgAb", // Factory
    99: "https://lottiefiles.com/free-animation/bottling-factory-53Q3SoGu0x", // Bottling factory
    100: "https://lottiefiles.com/free-animation/3d-statistics-factory-lRiHNeU9Y4", // 3D Statistics Factory
    101: "https://lottiefiles.com/free-animation/3d-camera-factory-2I4Nonw7Ad", // 3D Camera Factory
    102: "https://lottiefiles.com/free-animation/3d-isometric-factory-process-TJAlBgYcXw", // 3D Isometric Factory Process
    103: "https://lottiefiles.com/free-animation/data-factory-animation-I6dMAfEyrl", // Data Factory Animation
    104: "https://lottiefiles.com/free-animation/logistics-trucks-DHvuLcYVdQ", // Logistics Trucks
    105: "https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy", // World map with logistics
    106: "https://lottiefiles.com/free-animation/supply-chain-and-logistics-8PtoYRCbiu", // Supply Chain and logistics
    107: "https://lottiefiles.com/free-animation/supply-chain-and-shipping-Gd8ZsVZpXq", // Supply Chain and Shipping
    108: "https://lottiefiles.com/free-animation/delivery-truck-road-animation-K9xyRiku9v", // Delivery Truck - Road Animation
    109: "https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6", // teamwork
    110: "https://observablehq.com/@d3/animated-quadtree", // Animated quadtree
    111: "https://old.observablehq.com/@d3/hierarchy-traversal-animated", // Hierarchy traversal animated
    112: "https://motionarray.com/after-effects-templates/infographics-pack-135055/", // Infographics Pack by ARstudio
    113: "https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/", // Infographic Chart Creator
    114: "https://motionarray.com/after-effects-templates/infographics-pack-100132/", // Infographics Pack by JVARTS STUDIO
    115: "https://motionarray.com/after-effects-templates/infographics-for-everything-2593374/", // Infographics For Everything
    116: "https://motionarray.com/after-effects-templates/infographics-3844461/", // Infographics by Ruslan Klimovich
    117: "https://motionarray.com/after-effects-templates/infographics-elements-789489/", // Infographics Elements by TarZanchik
    118: "https://motionarray.com/after-effects-templates/flat-infographics-17982/", // Flat Infographics by zevs
    119: "https://motionarray.com/after-effects-templates/infographics-v2-556482/", // Infographics V2 by Typoland
    120: "https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ", // Animated Dashboards
    121: "https://lottiefiles.com/free-animation/dashboard-M05MmlnoOP", // Dashboard by RAKIBUZZAMAN
    122: "https://lottiefiles.com/free-animation/deliver-better-optimized-lottie-json-animation-Qgvgddnv8J", // Dashboard by Weblodge
    123: "https://lottiefiles.com/free-animation/dashboard-krY5yHjJRp", // DashBoard by Amit Prajapati
    124: "https://lottiefiles.com/free-animation/project-dashboard-PeJUc2p1iB", // Project Dashboard
    125: "https://lottiefiles.com/free-animation/infographics-dashboard-X6P5rVLZAB", // Infographics Dashboard
    126: "https://observablehq.com/@d3/stacked-to-grouped-bars", // Stacked-to-grouped bars
    127: "https://observablehq.com/@d3/streamgraph-transitions", // Streamgraph transitions
    128: "https://observablehq.com/@d3/pie-chart-update", // Pie chart update
    129: "https://observablehq.com/@d3/arc-tween", // Arc tween
    130: "https://observablehq.com/@d3/learn-d3-animation", // Animated line chart lesson
    131: "https://observablehq.com/@d3/transition-end", // Transition end
    132: "https://observablehq.com/@d3/easing-animations", // Easing Animations
    133: "https://observablehq.com/@d3/path-tween", // Path tween
    134: "https://observablehq.com/@d3/shape-tweening", // Shape tweening
    135: "https://motionarray.com/after-effects-templates/timeline/", // Timeline by The Creators
    136: "https://motionarray.com/after-effects-templates/project-timeline-2424919/", // Project TimeLine
    137: "https://motionarray.com/after-effects-templates/corporate-timeline-1939632/", // Corporate Timeline by HenlyFx
    138: "https://motionarray.com/after-effects-templates/scrolling-timeline-1223172/", // Scrolling Timeline
    139: "https://motionarray.com/after-effects-templates/corporate-timeline-255459/", // Corporate Timeline by Zargones
    140: "https://motionarray.com/after-effects-templates/corporate-timeline-77666/", // Corporate Timeline by MotionTores
  };

  // =====================================================================
  // O2a — Choosing a process that matters and can be delivered (29 lines, 9 shots). Audit score 5.2 -> rebuilt.
  // Kept from the matched moments: one ruler for every candidate, value at the centre, the sponsor who acts,
  // the trapped team, and "one strong bar cannot cancel a missing one". Every other line gets a new picture.
  // =====================================================================
  section("O2a", "A process that matters", 29, [0, 2, 4, 6, 8, 11, 13, 15, 16, 18, 20, 22, 25, 27], [
    // Template 098 · Factory (LottieFiles) — https://lottiefiles.com/free-animation/factory-4XJZcnPgAb
    // Adapted: "animate output and an environmental signal" -> a capacity tank with one outlet; real proposals queue
    // up; one team and a six-month clock; the team cannot split into four.
    { ref: U[98], cap: "Limited delivery capacity", n: 4,
      svg: () => hl("h0", "WHO GETS THE CAPACITY?", C.navy) + hl("h1", "GENUINE PROBLEMS, ALL", C.orange) + hl("h2", "ONE TEAM, SIX MONTHS", C.navy) + hl("h3", "NOT ALL AT ONCE", C.orange) +
        G("sg", 110, 260, El(110, 290, 92, 26, C.blue, C.navy, 3) + [60, 96, 132, 166].map((x, i) => person(x, 262, 1.1, CCOL[i])).join("") + T2(110, 338, "STEERING", "GROUP", { c: C.navy })) +
        G("tk", 300, 220, R(250, 90, 100, 200, 14, C.paper, C.navy, 3.5) + R(256, 230, 88, 54, 10, C.green) + Pa("M300 290V320", C.navy, 8) + T2(300, 346, "DELIVERY", "CAPACITY", { c: C.navy })) +
        [0, 1, 2, 3].map((i) => G("c" + i, 56 + i * 96, 110, R(18 + i * 96, 66, 78, 88, 12, C.paper, CCOL[i], 3.5) + CAND[i](57 + i * 96, 102, 1) + exB(57 + i * 96, 138, 10))).join("") +
        G("tm", 200, 290, person(170, 300, 1.7, C.navy) + person(220, 300, 1.7, C.navy) + clock(320, 290, 30, C.orange, 180) + T2(320, 344, "BOARD IN", "SIX MONTHS", { c: C.orange }) + T(190, 360, "ONE TEAM", { c: C.navy })) +
        G("ar", 200, 200, [0, 1, 2, 3].map((i) => (i === 1 ? arr(196, 256, 156, 162, C.green, 4) : arr(196, 256, 57 + i * 96, 162, C.orange, 3, 'stroke-dasharray="6 5"') + noB((196 + 57 + i * 96) / 2, 210, 10))).join("")),
      steps: [
        "+h0 +sg +tk",
        "-h0 +h1 +c0 +c1 +c2 +c3 sg.o=0 tk.o=0",
        "-h1 +h2 +tm",
        "-h2 +h3 +ar"] },

    // Template 114 · Infographics Pack by JVARTS STUDIO (Motion Array) — https://motionarray.com/after-effects-templates/infographics-pack-100132/
    // Adapted: "reveal the selected metric element" -> a severity dial pinned at maximum is not a ticket to be first; the
    // problem's demands on authority, knowledge and time overshoot the team's line; then one ruler marks every card.
    { ref: U[114], cap: "Serious is not enough", n: 3,
      svg: () => hl("h0", "SERIOUS ISN'T ENOUGH", C.orange) + hl("h1", "BEYOND THE TEAM'S REACH", C.orange) + hl("h2", "SAME CRITERIA FOR ALL", C.green) +
        G("dl", 200, 210, Pa("M90 250A110 110 0 0 1 310 250", C.blue, 26) + Pa("M90 250A110 110 0 0 1 280 172", C.orange, 26) + Pa("M200 250L300 196", C.ink, 6) + Ci(200, 250, 12, C.ink) +
          T2(200, 300, "SOUNDS MOST", "SERIOUS", { c: C.orange }) + R(300, 96, 80, 56, 10, C.paper, C.navy, 3) + Gl(340, 132, "1ST?", 20, C.navy) + noB(374, 98, 12)) +
        G("ax", 200, 210, Pa("M30 320H280", C.navy, 3) + Pa("M30 190H290", C.green, 3, 'stroke-dasharray="8 6"') + T2(336, 186, "TEAM CAN", "DELIVER", { c: C.green }) +
          [["AUTHORITY", (x, y) => crown(x, y, 1.1)], ["KNOWLEDGE", (x, y) => book(x, y, 1)], ["TIME", (x, y) => clock(x, y, 15, C.navy, 90)]].map(([s, f], i) => f(80 + i * 80, 344)).join("") +
          T2(336, 300, "WHAT IT", "REQUIRES", { c: C.orange })) +
        [0, 1, 2].map((i) => G("B" + i, 80 + i * 80, 320, R(58 + i * 80, 320 - [220, 190, 240][i], 44, [220, 190, 240][i], 6, C.orange, "", 0, 'opacity=".85"'))).join("") +
        G("rl", 200, 200, [0, 1, 2, 3].map((i) => R(18 + i * 96, 90, 78, 150, 12, C.paper, CCOL[i], 3.5) + CAND[i](57 + i * 96, 130, 1)).join("") +
          Gs(200, 200, 1, R(-190, -14, 380, 28, 4, C.gold) + Array.from({ length: 20 }, (_, i) => Pa(`M${-180 + i * 19} -14V${i % 2 ? -4 : 2}`, C.ink, 2)).join("")) +
          [0, 1, 2, 3].map((i) => Gs(57 + i * 96, 236, 0.7, target(-24, 0, 12, C.green) + Pa("M-6 6A10 10 0 0 1 14 6", C.navy, 3) + person(28, 4, 0.5, C.gold))).join("") + T(200, 290, "ONE RULER, EVERY CARD", { c: C.green })),
      steps: ["+h0 +dl", "-h0 +h1 -dl +ax +B0 +B1 +B2", "-h1 +h2 -ax -B0 -B1 -B2 +rl"] },

    // Template 111 · Hierarchy traversal animated (Observable) — https://old.observablehq.com/@d3/hierarchy-traversal-animated
    // Adapted: "visit one node then the next" -> the target sits at the centre; Qasr's three objectives are visited one by
    // one; a noisy complaint misses; a proposal is linked to an objective instead of to someone's frustration.
    { ref: U[111], cap: "Strategic value", n: 4,
      svg: () => hl("h0", "VALUE AT THE CENTRE", C.green) + hl("h1", "QASR'S OBJECTIVES", C.green) + hl("h2", "VISIBLE ISN'T STRATEGIC", C.orange) + hl("h3", "AN OBJECTIVE, NOT FRUSTRATION", C.navy) +
        G("tg", 200, 200, target(200, 200, 74, C.green)) +
        [["PROTECT", "RELATIONSHIPS", 80, 96, (x, y) => person(x - 8, y, 0.7, C.navy) + person(x + 10, y, 0.7, C.green)], ["BETTER GUEST", "EXPERIENCES", 330, 96, (x, y) => face(x, y, 14, C.green, 1)], ["FEWER AVOIDABLE", "LOSSES", 316, 300, (x, y) => coin(x, y, 12)]].map(([a, b, x, y, f], i) =>
          G("o" + i, x, y, f(x, y) + T2(Math.min(x, 300), y + 34, a, b, { z: 17, c: C.navy }) + arr(x + (x < 200 ? 30 : -30), y + (y < 200 ? 30 : -30), 200 + (x - 200) * 0.32, 200 + (y - 200) * 0.32, C.green, 3.5))).join("") +
        G("mg", 80, 300, mega(70, 296, 1.8, C.orange) + T2(90, 352, "VISIBLE", "INCONVENIENCE", { z: 17, c: C.orange }) + Pa("M110 280Q180 240 300 260", C.orange, 3, 'stroke-dasharray="6 5"') + noB(300, 260, 12)) +
        G("lk", 200, 200, R(18, 300, 120, 60, 10, C.paper, C.navy, 3) + CAND[1](78, 330, 0.9) + Pa("M138 320Q200 280 250 214", C.green, 4) + okB(250, 214, 10) +
          face(330, 330, 20, C.orange, -1) + noB(354, 312, 10) + T(384, 372, "PERSONAL FRUSTRATION", { a: "end", z: 17, c: C.orange })),
      steps: ["+h0 +tg", "-h0 +h1 +o0 +o1 +o2", "-h1 +h2 o2.o=0 +mg", "-h2 +h3 -mg +lk"] },

    // Template 104 · Logistics Trucks (LottieFiles) — https://lottiefiles.com/free-animation/logistics-trucks-DHvuLcYVdQ
    // Adapted: "move the truck and the delivery marker" -> can the team truck reach the prize? A wall of systems that must
    // be replaced blocks the big prize; a shorter road reaches a real prize and the confidence meter rises.
    { ref: U[104], cap: "Can we deliver it?", n: 4,
      svg: () => hl("h0", "CAN QASR DELIVER IT?", C.navy) + hl("h1", "SYSTEMS REPLACED FIRST", C.orange) + hl("h2", "TOO MANY DEPENDENCIES", C.orange) + hl("h3", "PROGRESS BUILDS CONFIDENCE", C.green) +
        G("rd", 200, 150, Pa("M20 150H380", C.blue, 34) + Pa("M30 150H370", C.paper, 3, 'stroke-dasharray="14 12"') + trophy(352, 112, 1.8, C.gold) + T2(342, 196, "BIG", "BENEFIT", { z: 17, c: C.navy })) +
        Mv("Mt", [[50, 146], [180, 146]], truck(0, 0, 0.9, C.navy)) +
        G("sv", 250, 140, [0, 1, 2].map((i) => server(236 + i * 30, 132 + (i % 2) * 10, 1.1, C.orange)).join("") + T(260, 92, "OLD SYSTEMS", { c: C.orange })) +
        G("wl", 250, 150, wall(232, 100, 60, 104, C.orange) + noB(262, 92, 12)) +
        G("r2", 200, 300, Pa("M20 300H250", C.blue, 34) + Pa("M30 300H240", C.paper, 3, 'stroke-dasharray="14 12"') + trophy(282, 276, 1, C.gold) + T2(300, 340, "REAL, SMALLER", "RESULT", { z: 17, c: C.green })) +
        Mv("Mu", [[50, 296], [236, 296]], truck(0, 0, 0.9, C.green)) +
        G("cf", 370, 300, Pa("M376 344V250", C.blue, 14) + Pa("M376 344V280", C.green, 14) + T(388, 236, "MORE CONFIDENCE", { a: "end", z: 17, c: C.green })),
      steps: [
        "+h0 +rd +Mt Mt@0.5",
        "-h0 +h1 +sv Mt@1",
        "-h1 +h2 +wl",
        "-h2 +h3 rd.o=0.35 sv.o=0.35 wl.o=0.35 Mt.o=0.35 +r2 +Mu Mu@1 +cf"] },

    // Template 113 · Infographic Chart Creator (Motion Array) — https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/
    // Adapted: "grow columns, update the axis" -> an easy option grows a tall delivery column but almost no value column;
    // then the axes become importance by feasibility, with the sweet spot top-right.
    { ref: U[113], cap: "Importance and feasibility", n: 2,
      svg: () => hl("h0", "EASY, BUT NO DIFFERENCE", C.orange) + hl("h1", "VALUABLE AND DELIVERABLE", C.green) +
        G("ez", 200, 220, Pa("M60 320H340", C.navy, 3) + T2(130, 352, "EASY TO", "DELIVER", { c: C.navy }) + T2(270, 352, "ITS", "DIFFERENCE", { c: C.orange })) +
        G("B0", 130, 320, R(100, 110, 60, 210, 8, C.navy)) + G("B1", 270, 320, R(240, 304, 60, 16, 4, C.orange)) +
        G("pl", 200, 200, arr(40, 330, 40, 66, C.navy, 3.5) + arr(40, 330, 380, 330, C.navy, 3.5) + T(52, 66, "MORE IMPORTANT", { a: "start", z: 17, c: C.navy }) + T(380, 360, "MORE FEASIBLE", { a: "end", z: 17, c: C.navy }) +
          R(214, 80, 160, 120, 14, C.green, "", 0, 'opacity=".18"') + T(294, 130, "START HERE", { c: C.green }) +
          [[110, 120, C.orange], [320, 290, C.gold], [290, 160, C.green], [150, 270, C.navy]].map(([x, y, c]) => Ci(x, y, 13, c, C.paper, 3)).join("") + okB(310, 150, 10)),
      steps: ["+h0 +ez +B0 +B1", "-h0 +h1 -ez -B0 -B1 +pl"] },

    // Template 089 · Git Workflow 1 (LottieFiles) — https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5
    // Adapted: "branch, merge and reconnect" -> the merge needs someone with rights: Reservations and Finance must agree on
    // shared information; without a sponsor the team is squeezed between them; a nameplate alone does not merge anything.
    { ref: U[89], cap: "A sponsor who acts", n: 4,
      svg: () => hl("h0", "DECISIONS NEED AUTHORITY", C.navy) + hl("h1", "TWO FUNCTIONS MUST AGREE", C.navy) + hl("h2", "WITHOUT A SPONSOR: TRAPPED", C.orange) + hl("h3", "MORE THAN A TITLE", C.gold) +
        G("gt", 200, 200, Pa("M20 220H380", C.blue, 30) + R(214, 150, 14, 120, 4, C.ink) + R(228, 196, 110, 14, 4, C.orange) + person(110, 214, 1.6, C.navy) + noB(140, 170, 12) +
          person(330, 300, 1.6, C.gold) + crown(330, 266, 0.9) + keyI(290, 296, 1.1) + T2(110, 280, "EMPLOYEES", "CANNOT", { c: C.navy })) +
        G("mg", 200, 200, Pa("M20 120H140C180 120 190 200 230 200H380M20 280H140C180 280 190 200 230 200", C.navy, 5) + Ci(20, 120, 8, C.orange) + Ci(20, 280, 8, C.gold) +
          T(30, 100, "RESERVATIONS TEAM", { a: "start", z: 17, c: C.orange }) + T(30, 312, "FINANCE TEAM", { a: "start", z: 17, c: C.gold }) + doc(230, 200, 1.2, C.navy, 3) + qB(262, 168, 12) + T2(320, 250, "SHARED", "INFORMATION", { z: 17, c: C.navy })) +
        G("tp", 200, 210, person(200, 216, 1.8, C.navy) + arr(150, 216, 70, 216, C.orange, 6) + arr(250, 216, 330, 216, C.gold, 6) + person(46, 216, 1.4, C.orange) + person(354, 216, 1.4, C.gold) +
          Pa("M186 180l-6 -12M200 176v-14M214 180l6 -12", C.orange, 3) + T2(200, 300, "CAPABLE TEAM", "STUCK", { c: C.orange })) +
        G("tt", 200, 210, R(20, 120, 156, 50, 8, C.gold) + T(98, 152, "EXEC SPONSOR", { z: 17, c: C.ink }) + noB(170, 116, 12) + T2(98, 220, "TITLE", "ALONE", { c: C.orange }) +
          [["TIME", (x, y) => clock(x, y, 16, C.green, 90)], ["AUTHORITY", (x, y) => keyI(x, y, 1)], ["SUPPORT", (x, y) => person(x, y + 6, 0.8, C.green)]].map(([s, f], i) => f(226, 110 + i * 60) + T(244, 116 + i * 60, "REAL " + s, { a: "start", z: 16, c: C.green })).join("")),
      steps: ["+h0 +gt", "-h0 +h1 -gt +mg", "-h1 +h2 -mg +tp", "-h2 +h3 -tp +tt"] },

    // Template 120 · Animated Dashboards (LottieFiles) — https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ
    // Adapted: "transition between dashboard panels" -> stakeholders recognise a rising result; the board prefers evidence
    // to a glossy deck; noise and publicity are struck out; the result must show inside the six-month window.
    { ref: U[120], cap: "Results people can see", n: 4,
      svg: () => hl("h0", "RESULTS PEOPLE RECOGNISE", C.green) + hl("h1", "CREDIBLE EVIDENCE", C.green) + hl("h2", "NOT NOISE OR PUBLICITY", C.orange) + hl("h3", "SHOWN IN TIME", C.navy) +
        G("db", 200, 180, R(60, 70, 280, 170, 12, C.ink) + R(70, 80, 260, 150, 6, C.pale) + Pa("M90 210L150 190L210 160L310 110", C.green, 5) + okB(310, 110, 10) +
          [90, 150, 250, 310].map((x, i) => person(x, 300, 1.2, CCOL[i])).join("") + T(200, 360, "STAKEHOLDERS SEE IT", { c: C.navy })) +
        G("ev", 200, 200, R(30, 100, 150, 120, 10, C.gold) + star(70, 130, 14) + rocket(130, 170, 0.8, C.orange) + noB(170, 104, 13) + T2(105, 254, "ATTRACTIVE", "PRESENTATION", { z: 17, c: C.orange }) +
          R(220, 100, 150, 120, 10, C.paper, C.green, 3) + Pa("M236 200L276 176L316 160L356 120", C.green, 4) + okB(356, 104, 13) + T2(295, 254, "CREDIBLE", "EVIDENCE", { c: C.green }) + hotel(200, 330, 1.4, C.navy)) +
        G("nz", 200, 200, mega(100, 190, 2.4, C.orange) + noB(140, 130, 15) + T2(100, 280, "LOUDEST", "COMPLAINT", { c: C.orange }) + cam(300, 190, 2, C.ink) + noB(340, 140, 15) + T2(300, 280, "PUBLICITY", "STUNTS", { c: C.orange })) +
        G("tl", 200, 220, Pa("M30 220H370", C.navy, 5) + ["M1", "M2", "M3", "M4", "M5", "M6"].map((m, i) => Ci(40 + i * 64, 220, 8, C.navy)).join("") + R(30, 190, 340, 60, 14, "none", C.green, 3, 'stroke-dasharray="7 5"') +
          flag(304, 212, 1.4, C.green) + T(200, 290, "SIX-MONTH WINDOW", { c: C.navy }) + T2(304, 140, "OUTCOME", "DEMONSTRATED", { z: 17, c: C.green })),
      steps: ["+h0 +db", "-h0 +h1 -db +ev", "-h1 +h2 -ev +nz", "-h2 +h3 -nz +tl"] },

    // Template 116 · Infographics by Ruslan Klimovich (Motion Array) — https://motionarray.com/after-effects-templates/infographics-3844461/
    // Adapted: "sequence statistic graphics" -> one candidate's four bars: the tallest cannot fill the empty sponsor slot;
    // then two candidates are compared by risk: big value without a sponsor versus smaller value with committed leadership.
    { ref: U[116], cap: "Criteria work together", n: 2,
      svg: () => hl("h0", "NO CANCELLING OUT", C.orange) + hl("h1", "SPONSORSHIP LOWERS RISK", C.green) +
        G("ax", 200, 300, Pa("M30 300H370", C.navy, 3) + [(x) => target(x, 326, 12, C.green), (x) => Gs(x, 330, 1, Pa("M-12 4A12 12 0 0 1 12 4", C.navy, 3)), (x) => person(x, 332, 0.6, C.gold), (x) => eye(x, 326, 0.8, C.navy)].map((f, i) => f(80 + i * 80)).join("") +
          R(222, 120, 36, 180, 6, "none", C.orange, 3, 'stroke-dasharray="7 5"') + noB(240, 110, 13) + T(240, 370, "NO SPONSOR", { c: C.orange })) +
        [[260, C.green], [150, C.navy], [0, C.gold], [170, C.navy]].map(([h, c], i) => G("B" + i, 80 + i * 80, 300, R(62 + i * 80, 300 - Math.max(h, 2), 36, Math.max(h, 2), 6, c))).join("") +
        G("cp", 200, 200, R(16, 70, 176, 230, 14, C.paper, C.orange, 3) + trophy(104, 130, 1.8, C.gold) + chairE(104, 222, 1, C.orange) + T2(104, 266, "BIGGER VALUE,", "NO SPONSOR", { z: 17, c: C.orange }) +
          R(208, 70, 176, 230, 14, C.paper, C.green, 3) + trophy(296, 136, 1.3, C.gold) + person(296, 222, 1.1, C.gold) + crown(296, 198, 0.6) + T2(296, 266, "SMALLER, BUT", "SPONSORED", { z: 17, c: C.green }) +
          Gs(104, 340, 1, Pa("M-30 6A30 30 0 0 1 30 6", C.blue, 10) + Pa("M0 6L22 -14", C.orange, 4)) + Gs(296, 340, 1, Pa("M-30 6A30 30 0 0 1 30 6", C.blue, 10) + Pa("M0 6L-22 -14", C.green, 4))),
      steps: ["+h0 +ax +B0 +B1 +B2 +B3", "-h0 +h1 -ax -B0 -B1 -B2 -B3 +cp"] },

    // Template 095 · contract process (LottieFiles) — https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8
    // Adapted: "reveal the proposal and the agreement" -> the podium of an obvious ranking is struck out and a written
    // ledger of trade-offs replaces it; then the four real candidates are dealt for the next section.
    { ref: U[95], cap: "Record the trade-offs", n: 2,
      svg: () => hl("h0", "RECORD THE TRADE-OFFS", C.green) + hl("h1", "FOUR CANDIDATES NEXT", C.navy) +
        G("pd", 100, 220, R(30, 220, 46, 60, 4, C.gold) + R(76, 190, 46, 90, 4, C.gold) + R(122, 240, 46, 40, 4, C.gold) + Gl(99, 232, "1", 22, C.ink) + Pa("M24 160L176 300M176 160L24 300", C.orange, 5) +
          T2(100, 330, "OBVIOUS", "RANKING", { c: C.orange })) +
        G("lg", 290, 210, R(206, 80, 176, 230, 12, C.paper, C.green, 3.5) + [0, 1, 2, 3].map((i) => Gs(230, 120 + i * 50, 0.55, CAND[i](0, 0)) + Ci(258, 112 + i * 50, 7, C.green) + Ci(258, 130 + i * 50, 7, C.orange) + Pa(`M272 ${112 + i * 50}H360M272 ${130 + i * 50}H340`, C.ink, 2.5)).join("") +
          T2(294, 340, "PLUSES AND", "MINUSES WRITTEN", { z: 17, c: C.green })) +
        G("dk", 200, 210, [0, 1, 2, 3].map((i) => R(18 + i * 96, 120, 78, 120, 12, C.paper, CCOL[i], 3.5) + CAND[i](57 + i * 96, 170, 1.2)).join("") + T(200, 290, "QASR'S REAL PROPOSALS", { c: C.navy })),
      steps: ["+h0 +pd +lg", "-h0 +h1 -pd -lg +dk"] }
  ]);

  // =====================================================================
  // O2b — Qasr's four competing candidates (29 lines, 9 shots). Audit score 4.6 -> rebuilt.
  // Each candidate gets its own shots built from the narration's evidence: the guest's arrival, the lost corporate
  // accounts and the opposed director, the January deadline without a sponsor, and the volume of room releases.
  // =====================================================================
  section("O2b", "Qasr's four candidates", 29, [0, 2, 4, 6, 8, 10, 12, 15, 17, 19, 21, 23, 25, 27], [
    // Template 079 · Product Workflow Animation & UI Motion Design (Dribbble) — https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design
    // Adapted: "shift between product states" -> four proposal cards, each held by its manager; the director's evidence
    // lens passes over all four; the cards give way to the two tests every argument must pass.
    { ref: U[79], cap: "Four proposals", n: 3,
      svg: () => hl("h0", "FOUR PROPOSALS", C.navy) + hl("h1", "EVIDENCE BEFORE LOYALTY", C.green) + hl("h2", "IMPORTANCE AND DELIVERY", C.navy) +
        [["GUEST", "ARRIVAL"], ["CORPORATE", "BILLING"], ["DIGITAL", "RECORD"], ["ROOM", "RELEASE"]].map(([a, b], i) => {
          const x = i % 2 ? 204 : 12, y = i < 2 ? 56 : 188;
          return G("c" + i, x + 88, y + 62, R(x, y, 184, 124, 16, C.paper, CCOL[i], 3.5) + person(x + 34, y + 92, 1.15, CCOL[i]) + CAND[i](x + 34, y + 40, 0.95) +
            T2(x + 66, y + 58, a, b, { a: "start", z: 17, c: C.ink }));
        }).join("") +
        Mv("Ml", [[150, 90], [350, 90], [150, 222], [350, 222]], lens(0, 0, 18, C.green)) +
        G("ev", 200, 344, person(40, 350, 1.15, C.green) + doc(76, 344, 0.8, C.green, 3) + T(100, 352, "THE EVIDENCE FIRST", { a: "start", c: C.green })) +
        G("bal", 200, 210, R(194, 110, 12, 160, 4, C.navy) + R(140, 266, 120, 12, 6, C.navy) + R(60, 104, 280, 12, 6, C.navy) +
          Pa("M100 116L76 170M100 116L124 170M300 116L276 170M300 116L324 170", C.ink, 2) +
          Fi("M64 170H136Q130 190 100 190Q70 190 64 170Z", C.pale, `stroke="${C.navy}" stroke-width="3"`) + Fi("M264 170H336Q330 190 300 190Q270 190 264 170Z", C.pale, `stroke="${C.navy}" stroke-width="3"`) +
          target(100, 152, 15, C.green) + Gs(300, 158, 1, Pa("M-14 6A14 14 0 0 1 14 6", C.navy, 3) + Ci(0, 6, 3, C.navy)) +
          T2(100, 222, "ORGANISATIONAL", "IMPORTANCE", { z: 17, c: C.green }) + T2(300, 222, "PRACTICAL", "DELIVERY", { c: C.navy }) + clock(200, 322, 20, C.orange, 180) + T(232, 330, "SIX MONTHS", { a: "start", c: C.orange })),
      steps: [
        "+h0 +c0 +c1 +c2 +c3",
        "-h0 +h1 +Ml Ml@1 +ev",
        "-h1 +h2 -Ml -ev -c0 -c1 -c2 -c3 +bal"] },

    // Template 081 · Clean Workflow Visualization with Motion Graphics (Dribbble) — https://dribbble.com/shots/27600376-Clean-Workflow-Visualization-with-Motion-Graphics
    // Adapted: "connect journey steps with transitions" -> the guest walks up to the hotel (first impression), waits at
    // reception between two conflicting screens, then the camera pulls back to the departments that feed reception.
    { ref: U[81], cap: "Candidate: guest arrival", n: 3,
      svg: () => hl("h0", "THE FIRST IMPRESSION", C.green) + hl("h1", "DELAYS, CONFLICTING INFO", C.orange) + hl("h2", "IT CROSSES DEPARTMENTS", C.navy) +
        G("ht", 290, 200, hotel(290, 196, 4.4, C.navy) + star(352, 96, 12) + star(228, 110, 9) + T(280, 334, "QASR HOTEL ENTRANCE", { c: C.navy })) +
        Mv("Mg", [[30, 270], [190, 270]], person(0, 0, 1.6, C.green) + suit(26, 10, 0.9)) +
        G("rc", 200, 220, desk(200, 250, 220, C.navy) + person(200, 232, 1.4, C.navy) + scr(120, 196, 64, 44, C.ink) + scr(280, 196, 64, 44, C.ink) + coin(120, 194, 11) + coin(280, 194, 11, C.orange) +
          Gl(200, 160, "≠", 34, C.orange) + clock(338, 120, 18, C.orange, 210)) +
        G("q", 60, 300, [40, 80, 120].map((x, i) => person(x, 316, 1.1, i ? C.navy : C.green)).join("") + T(30, 366, "TIRED GUESTS QUEUE", { a: "start", c: C.orange })) +
        G("dp", 200, 200, [[60, 100, C.orange, JI.book, "RESERVATIONS", "TEAM"], [60, 200, C.navy, JI.room, "HOUSEKEEPING", "TEAM"], [60, 300, C.gold, JI.bill, "FINANCE", "TEAM"]].map(([x, y, c, f, a, b]) =>
          node(x - 20, y, 22, c, f(x - 20, y)) + T2(x + 12, y - 4, a, b, { a: "start", z: 17, c }) + arr(x + 130, y, 268, 200 + (y - 200) * 0.15, c, 3.5)).join("") +
          R(270, 150, 112, 100, 14, C.paper, C.navy, 3.5) + bell(326, 196, 1.3) + T2(326, 274, "FRONT", "DESK", { c: C.navy })),
      steps: [
        "+h0 +ht +Mg Mg@1",
        "-h0 +h1 -ht -Mg +rc +q",
        "-h1 +h2 -rc -q +dp"] },

    // Template 089 · Git Workflow 1 (LottieFiles) — https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5
    // Adapted: "branch, merge and reconnect" -> the departmental branches merge into one guest journey, merge conflicts
    // appear on responsibility, authority and scope; then a sponsor volunteers and the director recommends.
    { ref: U[89], cap: "Guest arrival's case", n: 3,
      svg: () => hl("h0", "NO ONE DEPARTMENT ALONE", C.green) + hl("h1", "LIKELY DISAGREEMENTS", C.orange) + hl("h2", "SPONSOR AND RECOMMENDATION", C.green) +
        G("br", 200, 200, [[96, C.orange], [160, C.gold], [240, C.navy], [304, C.green]].map(([y, c], i) => Pa(`M20 ${y}H120C170 ${y} 170 200 220 200`, c, 6) + Ci(20, y, 8, c)).join("") +
          Pa("M220 200H330", C.green, 9) + face(354, 200, 26, C.green, 1)) +
        G("cf", 200, 200, [["WHO'S RESPONSIBLE?", 96], ["WHO DECIDES?", 200], ["WHICH ACTIVITIES?", 304]].map(([s, y]) => R(150, y - 22, 236, 44, 12, C.paper, C.orange, 3) + exB(174, y, 12) + T(196, y + 6, s, { a: "start", z: 17, c: C.orange })).join("")) +
        G("sp", 100, 200, person(100, 210, 2, C.green) + crown(100, 160, 1.1) + Pa("M126 196L146 150", C.green, 6) + T2(100, 284, "FRONT-OFFICE", "DIRECTOR", { c: C.green })) +
        G("rd", 300, 200, person(300, 210, 2, C.navy) + Pa("M326 210L340 190L352 196", C.navy, 5) + okB(340, 160, 14) + T2(300, 284, "PROGRAMME", "DIRECTOR", { c: C.navy })) +
        G("cmp", 200, 352, pill(200, 352, "STILL MUST BE COMPARED", C.orange)),
      steps: [
        "+h0 +br",
        "-h0 +h1 br.o=0.25 +cf",
        "-h1 +h2 -br -cf +sp +rd +cmp"] },

    // Template 130 · Animated line chart lesson (Observable) — https://observablehq.com/@d3/learn-d3-animation
    // Adapted: "trace a time series" -> two corporate accounts are stamped LOST, the revenue line traces their fall,
    // then a shield shows the future revenue an improvement might protect.
    { ref: U[130], cap: "Candidate: corporate billing", n: 3,
      svg: () => hl("h0", "TWO ACCOUNTS LOST", C.orange) + hl("h1", "STRATEGIC IMPORTANCE", C.navy) + hl("h2", "PROTECT FUTURE REVENUE", C.green) +
        G("ac", 200, 180, hotel(110, 170, 3.2, C.navy) + hotel(290, 170, 3.2, C.navy) + [110, 290].map((x) => R(x - 72, 154, 144, 34, 6, C.paper, C.orange, 4) + T(x, 178, "ACCOUNT LOST", { z: 17, c: C.orange })).join("") +
          doc(200, 290, 1.4, C.navy, 3) + noB(222, 266, 12) + T(200, 350, "INVOICE ERRORS", { c: C.orange })) +
        G("ax", 200, 220, Pa("M40 320H370M40 320V90", C.navy, 3) + T(48, 86, "CORPORATE REVENUE", { a: "start", c: C.navy })) +
        Ln("Ld", "M40 130L120 140L180 150L220 230L300 260L360 280", C.orange, 5) +
        G("tg", 300, 150, target(310, 140, 26, C.navy) + T2(310, 196, "CUSTOMER", "RELATIONSHIPS", { z: 17, c: C.navy })) +
        Ln("Lu", "M220 230L300 190L360 170", C.green, 5, 'stroke-dasharray="9 7"') +
        G("sh", 300, 150, shield(330, 120, 1.8, C.green) + person(240, 116, 0.9, C.navy) + person(270, 116, 0.9, C.green) + Pa("M250 112H262", C.gold, 4) + T(250, 62, "TRUST REBUILT", { c: C.green })),
      steps: [
        "+h0 +ac",
        "-h0 +h1 -ac +ax +Ld +tg",
        "-h1 +h2 -tg +Lu +sh"] },

    // Template 131 · Transition end (Observable) — https://observablehq.com/@d3/transition-end
    // Adapted: "move, await, then recolour" -> the opposing director blocks the move; the heavy value weight lands, but
    // the team token waits instead of moving automatically.
    { ref: U[131], cap: "Billing's missing support", n: 2,
      svg: () => hl("h0", "A DIRECTOR OPPOSES", C.orange) + hl("h1", "IMPORTANT, NOT AUTOMATIC", C.navy) +
        G("op", 110, 220, person(110, 232, 2.4, C.orange) + Pa("M84 236L136 248M84 248L136 236", C.paper, 4) + noB(156, 176, 16) + T2(110, 312, "BILLING", "DIRECTOR", { c: C.orange })) +
        G("ch", 290, 220, chairE(290, 236, 1.8, C.navy) + T2(290, 312, "NO LEADERSHIP", "SUPPORT", { c: C.navy })) +
        G("wt", 110, 200, Fi("M70 250L86 170H134L150 250Z", C.gold) + Ci(110, 164, 14, "none", C.gold, 6) + CAND[1](110, 214, 1.2) + T2(110, 296, "SERIOUS", "HARM", { c: C.navy })) +
        G("tm", 300, 200, Ci(300, 220, 46, C.paper, C.navy, 3.5) + person(300, 228, 1.4, C.navy) + T2(300, 296, "THE ONLY", "TEAM", { c: C.navy })) +
        Ln("Lw", "M160 210H246", C.navy, 4, 'stroke-dasharray="7 6"') + G("hold", 204, 186, R(194, 186, 8, 26, 2, C.orange) + R(208, 186, 8, 26, 2, C.orange)),
      steps: ["+h0 +op +ch", "-h0 +h1 -op -ch +wt +tm +Lw +hold"] },

    // Template 136 · Project TimeLine (Motion Array) — https://motionarray.com/after-effects-templates/project-timeline-2424919/
    // Adapted: "advance along the time markers" -> the digital guest record arrives, the timeline runs to a January
    // regulatory deadline that flips the switch from optional to mandatory, and the sponsor seat is empty.
    { ref: U[136], cap: "Candidate: digital record", n: 3,
      svg: () => hl("h0", "DIGITAL GUEST RECORD", C.orange) + hl("h1", "A REGULATORY DEADLINE", C.orange) + hl("h2", "URGENT, BUT NO SPONSOR", C.orange) +
        G("cd", 200, 190, R(110, 90, 180, 170, 16, C.paper, C.orange, 4) + CAND[2](200, 160, 2.2) + T2(200, 296, "RAISED BY", "A MANAGER", { c: C.navy }) + person(330, 210, 1.6, C.navy)) +
        G("tl", 200, 160, Pa("M24 160H376", C.navy, 4) + ["SEP", "OCT", "NOV", "DEC", "JAN"].map((m, i) => Ci(40 + i * 80, 160, 8, i === 4 ? C.orange : C.navy) + Gl(40 + i * 80, 196, m, 16, i === 4 ? C.orange : C.navy)).join("") + flag(360, 152, 1.3, C.orange)) +
        Mv("Mn", [[40, 132], [360, 132]], Fi("M0 10L-8 -4H8Z", C.orange)) +
        G("sw", 200, 290, R(20, 262, 164, 56, 28, C.pale, C.navy, 3, 'opacity=".6"') + T(102, 296, "AN OPTION", { c: C.navy }) + Pa("M40 290H164", C.navy, 3) + R(200, 262, 184, 56, 28, C.orange) + T(292, 296, "AN OBLIGATION", { z: 17, c: C.paper, nh: true })) +
        G("al", 120, 220, Gs(120, 214, 1.3, bell(0, 0, 1.6, C.orange)) + Pa("M70 170Q60 200 70 230M170 170Q180 200 170 230", C.orange, 4, 'class="vlw-blink"') + T(120, 300, "HIGH URGENCY", { c: C.orange })) +
        G("es", 290, 220, chairE(290, 230, 1.7, C.navy) + qB(330, 170, 16) + T2(290, 300, "NO SPONSOR", "YET", { c: C.navy })),
      steps: [
        "+h0 +cd",
        "-h0 +h1 -cd +tl +Mn Mn@1 +sw",
        "-h1 +h2 -tl -Mn -sw +al +es"] },

    // Template 087 · Workflow by Muammar Faiq (LottieFiles) — https://lottiefiles.com/free-animation/workflow-Jt52qpU9fj
    // Adapted: "cycle the stages of the workflow glyph" -> the mandatory work card gets its leader slot; the question
    // splits into two separate stages; a parallel compliance cycle keeps running beside the BPM choice.
    { ref: U[87], cap: "Obligation versus choice", n: 3,
      svg: () => hl("h0", "NEEDS ACCOUNTABLE LEADERSHIP", C.orange) + hl("h1", "TWO SEPARATE QUESTIONS", C.navy) + hl("h2", "A SEPARATE COMPLIANCE TRACK", C.orange) +
        G("mw", 200, 200, R(70, 80, 260, 190, 16, C.paper, C.orange, 4) + CAND[2](140, 150, 1.6) + lockI(140, 226, 1.1, C.orange) + chairE(260, 176, 1.5, C.orange) + T(260, 246, "LEADER SLOT", { c: C.orange }) +
          T(200, 316, "LIMITED RESOURCES", { c: C.navy }) + coin(100, 350, 8) + coin(122, 350, 8)) +
        G("fk", 200, 200, R(20, 90, 170, 200, 16, C.paper, C.green, 3.5) + CAND[0](105, 150, 1.3) + T2(105, 220, "WHICH BPM", "PROJECT?", { c: C.green }) +
          R(210, 90, 170, 200, 16, C.paper, C.orange, 3.5) + cal(295, 150, 1.4, C.orange) + T2(295, 220, "MEET THE", "DEADLINE", { c: C.orange }) + Gl(200, 200, "≠", 30, C.navy)) +
        G("tk", 200, 220, Pa("M30 170H370", C.green, 8) + Pa("M30 280H370", C.orange, 8) + CAND[0](110, 170, 1) + CAND[2](110, 280, 1) +
          T(30, 150, "BPM PROGRAMME", { a: "start", c: C.green }) + T(30, 324, "COMPLIANCE RESPONSE", { a: "start", c: C.orange }) +
          Mv("Mx", [[150, 170], [340, 170]], Ci(0, 0, 9, C.green)) + Mv("My", [[150, 280], [340, 280]], Ci(0, 0, 9, C.orange)) + cal(330, 250, 0.7, C.orange)),
      steps: [
        "+h0 +mw",
        "-h0 +h1 -mw +fk",
        "-h1 +h2 -fk +tk +Mx Mx@1 +My My@0.8"] },

    // Template 097 · Business Solution conveyor (LottieFiles) — https://lottiefiles.com/free-animation/business-solution-pNyNfkcRsa
    // Adapted: "move boxes on the conveyor, rotate the gear, repeat" -> rooms ride the housekeeping belt in volume; a slow
    // belt keeps guests waiting; the contained scope and neutral sponsor are weighed against the others' benefits.
    { ref: U[97], cap: "Candidate: room release", n: 5,
      svg: () => hl("h0", "HIGH DAILY VOLUME", C.navy) + hl("h1", "SLOW ROOMS, WAITING GUESTS", C.orange) + hl("h2", "EASIER, NEUTRAL SPONSOR", C.gold) + hl("h3", "DOES IT OUTWEIGH OTHERS?", C.navy) + hl("h4", "EASY ISN'T STRONGEST", C.orange) +
        G("bt", 200, 180, Pa("M20 200H300", C.ink, 7) + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => Ci(30 + i * 38, 210, 7, C.paper, C.ink, 2.5, 'class="vlw-spin"')).join("") +
          [0, 1, 2, 3, 4, 5].map((i) => bed(46 + i * 46, 180, 0.8, C.navy)).join("") + gear(340, 180, 22, C.navy) + person(80, 120, 1.2, C.gold) + person(120, 120, 1.2, C.gold) + T(200, 266, "ROOMS RELEASED DAILY", { c: C.navy })) +
        G("wt", 280, 300, person(250, 316, 1.2, C.green) + person(290, 316, 1.2, C.green) + person(330, 316, 1.2, C.green) + clock(370, 270, 16, C.orange, 240) + T(30, 300, "ROOMS NOT READY", { a: "start", c: C.orange }) +
          T(30, 360, "ARRIVING GUESTS WAIT", { a: "start", c: C.orange })) +
        G("ez", 200, 200, R(20, 70, 176, 230, 16, C.paper, C.gold, 3.5, 'stroke-dasharray="9 6"') + CAND[3](108, 140, 1.5) + T2(108, 210, "ONE", "DEPARTMENT", { c: C.navy }) +
          person(70, 268, 0.9, C.navy) + person(100, 268, 0.9, C.navy) + Pa("M120 258L132 238", C.green, 4) +
          R(204, 70, 176, 230, 16, C.paper, C.navy, 3) + Ci(292, 150, 30, C.paper, C.navy, 3) + Fi("M292 120A30 30 0 0 1 292 180Z", C.gold) + T2(292, 220, "NEUTRAL", "SPONSORSHIP", { c: C.navy })) +
        G("sc", 200, 200, R(194, 120, 12, 160, 4, C.navy) + R(150, 276, 100, 12, 6, C.navy) + G("bm", 200, 120, R(60, 114, 280, 12, 6, C.navy) + CAND[3](100, 96, 1) + T2(100, 156, "EASIER TO", "ORGANISE", { z: 17, c: C.navy }) +
          star(270, 92, 14) + eye(318, 96, 0.9, C.green) + T2(300, 156, "STRATEGIC,", "VISIBLE GAINS", { z: 17, c: C.green }))) +
        G("tp", 200, 220, trophy(110, 220, 1.4, C.gold) + T2(110, 296, "EASY", "OPENING", { c: C.navy }) + trophy(290, 210, 2.8, C.gold) + T2(290, 296, "STRONGER", "OPENING", { c: C.green })),
      steps: [
        "+h0 +bt",
        "-h0 +h1 bt.o=0.35 +wt",
        "-h1 +h2 -bt -wt +ez",
        "-h2 +h3 -ez +sc +bm bm.r=6",
        "-h3 +h4 -sc +tp"] },

    // Template 126 · Stacked-to-grouped bars (Observable) — https://observablehq.com/@d3/stacked-to-grouped-bars
    // Adapted: "reposition bars while preserving identity" -> the complaint pile and the size ruler are rejected;
    // the four candidates regroup as four different profiles; a loud argument is set against a complete case.
    { ref: U[126], cap: "Four different profiles", n: 4,
      svg: () => hl("h0", "NOT BY COUNTING COMPLAINTS", C.orange) + hl("h1", "VISIBLE VERSUS SERIOUS", C.navy) + hl("h2", "DEADLINE VERSUS MANAGEABLE", C.navy) + hl("h3", "ARGUMENT VERSUS CASE", C.navy) +
        G("ct", 200, 200, [0, 1, 2, 3].map((i) => G("B" + i, 70 + i * 86, 300, R(46 + i * 86, 300 - [150, 90, 60, 120][i], 48, [150, 90, 60, 120][i], 6, CCOL[i]))).join("") +
          Pa("M24 300H376", C.navy, 3) + [0, 1, 2, 3].map((i) => CAND[i](70 + i * 86, 330, 0.75)).join("") + Pa("M30 120L370 300M30 300L370 120", C.orange, 6) + T(200, 370, "COMPLAINT COUNTS, SIZE", { c: C.orange })) +
        [["VISIBLE,", "CROSS-FUNCTIONAL", (x, y) => eye(x, y, 1.4, C.green)], ["SERIOUS", "CUSTOMER LOSSES", (x, y) => hotel(x, y, 1.3, C.navy) + noB(x + 16, y - 16, 10)],
          ["MANDATORY", "DEADLINE", (x, y) => cal(x, y, 1.1, C.orange)], ["MANAGEABLE", "SCOPE", (x, y) => brk(x - 18, x + 18, y - 6, C.green, 4)]].map(([a, b, f], i) => {
          const x = i % 2 ? 204 : 12, y = i < 2 ? 70 : 214;
          return G("p" + i, x + 88, y + 64, R(x, y, 184, 130, 16, C.paper, CCOL[i], 3.5) + CAND[i](x + 40, y + 40, 1.1) + f(x + 140, y + 40) + T2(x + 92, y + 92, a, b, { z: 17, c: C.ink }));
        }).join("") +
        G("ac", 200, 210, mega(100, 190, 2.6, C.orange) + T2(100, 290, "STRONG", "ARGUMENT", { c: C.orange }) + Gl(200, 204, "≠", 40, C.navy) +
          R(244, 110, 112, 150, 10, C.paper, C.green, 3.5) + [0, 1, 2, 3].map((i) => okB(270, 138 + i * 32, 10) + Pa(`M286 ${138 + i * 32}H340`, C.green, 3)).join("") + T2(300, 290, "COMPLETE", "BUSINESS CASE", { c: C.green })),
      steps: [
        "+h0 +ct +B0 +B1 +B2 +B3",
        "-h0 +h1 -ct +p0 +p1",
        "-h1 +h2 ~p0 ~p1 +p2 +p3",
        "-h2 +h3 -p0 -p1 -p2 -p3 +ac"] }
  ]);

  // =====================================================================
  // O2c — Making a defensible first choice (30 lines, 8 shots). Audit score 4.5 -> rebuilt.
  // Arguments become a decision: one shared criteria grid, then each candidate gets its own test picture,
  // followed by what is deferred and why, and the written decision record.
  // =====================================================================
  const marks = {
    y: (x, y) => okB(x, y, 13), n: (x, y) => noB(x, y, 13), q: (x, y) => Ci(x, y, 13, C.navy) + Gl(x, y + 6, "?", 16, C.paper),
    m: (x, y) => Ci(x, y, 13, C.gold) + Pa(`M${x - 7} ${y + 1}q3.5 -6 7 0t7 0`, C.paper, 3), "!": (x, y) => exB(x, y, 13)
  };
  section("O2c", "A defensible first choice", 30, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28], [
    // Template 103 · Data Factory Animation (LottieFiles) — https://lottiefiles.com/free-animation/data-factory-animation-I6dMAfEyrl
    // Adapted: "feed inputs, output converted leads" -> arguments are fed into the funnel and must come out as one
    // decision; then the four inputs are named: two favourites, a deadline and a contained fix.
    { ref: U[103], cap: "Arguments to decision", n: 3,
      svg: () => hl("h0", "ARGUMENTS INTO A DECISION", C.navy) + hl("h1", "TWO FAVOURITES CLASH", C.orange) + hl("h2", "DEADLINE AND CONTAINED SCOPE", C.navy) +
        G("fn", 200, 190, Fi("M86 120H314L230 230V270H170V230Z", C.pale, `stroke="${C.navy}" stroke-width="3" stroke-linejoin="round"`) +
          [[110, 80], [170, 64], [230, 72], [290, 84], [140, 100], [260, 104]].map(([x, y], i) => bub(x, y, 46, 28, CCOL[i % 4]) + Gl(x, y + 6, "…", 18, CCOL[i % 4])).join("") +
          R(140, 286, 120, 50, 12, C.green) + T(200, 318, "ONE DECISION", { c: C.paper, nh: true })) +
        [[0, 92, 210, "GUEST", "ARRIVAL"], [1, 308, 210, "CORPORATE", "BILLING"], [2, 92, 110, "DIGITAL", "RECORD"], [3, 308, 110, "ROOM", "RELEASE"]].map(([i, x, y, a, b]) =>
          G("c" + i, x, y, R(x - 86, y - 38, 172, 76, 14, C.paper, CCOL[i], 3.5) + CAND[i](x - 52, y, 0.95) + T2(x - 26, y - 4, a, b, { a: "start", z: 16, c: C.ink }))).join("") +
        G("pd", 92, 300, person(92, 304, 1.6, C.green) + T2(104, 346, "PROGRAMME", "DIRECTOR", { z: 16, c: C.green })) +
        G("fr", 308, 300, person(308, 304, 1.6, C.navy) + T(308, 362, "FINANCE REP", { c: C.navy })) +
        G("tug", 200, 290, arr(150, 290, 120, 290, C.green, 4) + arr(250, 290, 280, 290, C.navy, 4) + Fi("M206 270L192 292H202L194 314L212 286H202L210 270Z", C.orange)) +
        G("dl", 92, 110, cal(160, 92, 0.7, C.orange)) + G("ct", 308, 110, brk(358, 386, 86, C.green, 3.5)),
      steps: [
        "+h0 +fn",
        "-h0 +h1 -fn +c0 +c1 +pd +fr +tug",
        "-h1 +h2 +c2 +c3 +dl +ct"] },

    // Template 118 · Flat Infographics by zevs (Motion Array) — https://motionarray.com/after-effects-templates/flat-infographics-17982/
    // Adapted: "animate charts into place" -> the loudest voice is struck out, the four-by-four criteria grid
    // assembles, each cell takes a judgement with its evidence clip, and fog shows where a score would mislead.
    { ref: U[118], cap: "One shared framework", n: 4,
      svg: () => {
        const CX = [136, 200, 264, 328], RY = [128, 186, 244, 302];
        const PROF = [["y", "m", "y", "y"], ["y", "q", "n", "q"], ["!", "q", "n", "q"], ["m", "y", "m", "m"]];
        return hl("h0", "CRITERIA, NOT VOLUME", C.navy) + hl("h1", "ONE SHARED FRAMEWORK", C.navy) + hl("h2", "EVIDENCE FOR EACH JUDGEMENT", C.green) + hl("h3", "BEWARE FALSE CERTAINTY", C.orange) +
          G("vo", 200, 200, mega(110, 190, 3.2, C.orange) + [0, 1, 2].map((i) => Pa(`M${210 + i * 26} ${150 - i * 14}V${230 + i * 14}`, C.orange, 7)).join("") + noB(200, 120, 18) +
            Gs(200, 300, 1, R(-150, -14, 300, 28, 4, C.gold) + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => Pa(`M${-140 + i * 28} -14V${i % 2 ? -4 : 2}`, C.ink, 2)).join("")) + T(200, 350, "SAME RULER FOR ALL", { c: C.navy })) +
          G("gd", 200, 210, R(20, 92, 360, 248, 14, C.paper, C.navy, 3) + [target, (x, y) => Gs(x, y, 1, Pa("M-14 6A14 14 0 0 1 14 6", C.navy, 3) + Ci(0, 6, 3, C.navy)), (x, y) => person(x, y + 4, 0.6, C.navy), (x, y) => eye(x, y, 0.75, C.navy)]
            .map((f, j) => (j === 0 ? f(CX[j], 100 + 2, 10, C.navy) : f(CX[j], 102))).join("") +
            RY.map((y, i) => CAND[i](62, y, 0.9) + Pa(`M100 ${y + 29}H368`, C.blue, 2)).join("")) +
          RY.map((y, i) => G("r" + i, 230, y, CX.map((x, j) => marks[PROF[i][j]](x, y)).join(""))).join("") +
          G("clip", 230, 210, RY.map((y) => CX.map((x) => Pa(`M${x + 12} ${y - 16}l4 -6l4 6v10`, C.ink, 1.8)).join("")).join("")) +
          G("fog", 260, 230, cloud(270, 236, 2.4, C.blue, C.navy) + T(270, 270, "UNKNOWN FACTS", { z: 17, c: C.navy })) +
          G("sc", 106, 210, R(34, 166, 144, 84, 12, C.ink) + Gl(106, 224, "#.#", 40, C.gold) + noB(172, 170, 14) + T(106, 280, "PRECISE SCORE?", { c: C.orange }));
      },
      steps: [
        "+h0 +vo",
        "-h0 +h1 -vo +gd",
        "-h1 +h2 +r0 +r1 +r2 +r3 +clip",
        "-h2 +h3 -clip +fog +sc"] },

    // Template — Workflow path (CodePen, cited in the content audit) — https://codepen.io/WebGuyJeff/pen/rNdmqdO
    // Adapted: the audit's "slide value and delivery cards onto a balanced scale" -> billing's two lost accounts
    // load the value pan; the delivery pan holds only a question; four unknowns are listed; then risks pop.
    { ref: "https://codepen.io/WebGuyJeff/pen/rNdmqdO", cap: "Weighing billing", n: 4,
      svg: () => hl("h0", "STRONG VALUE EVIDENCE", C.navy) + hl("h1", "DELIVER IT QUICKLY?", C.orange) + hl("h2", "FOUR UNKNOWNS", C.orange) + hl("h3", "RISKS LEFT UNRESOLVED", C.orange) +
        G("pst", 200, 180, R(194, 120, 12, 120, 4, C.navy) + R(150, 236, 100, 12, 6, C.navy) + Ci(200, 120, 9, C.gold, C.navy, 3)) +
        G("bm", 200, 120, R(64, 114, 272, 12, 6, C.navy) +
          Pa("M90 126L64 176M90 126L116 176M310 126L284 176M310 126L336 176", C.ink, 2) +
          Fi("M54 176H126Q120 196 90 196Q60 196 54 176Z", C.pale, `stroke="${C.navy}" stroke-width="3"`) + Fi("M274 176H346Q340 196 310 196Q280 196 274 176Z", C.pale, `stroke="${C.navy}" stroke-width="3"`) +
          hotel(76, 156, 0.8, C.navy) + hotel(104, 156, 0.8, C.navy) + noB(90, 136, 8)) +
        G("qd", 310, 160, Pa("M292 172A18 18 0 0 1 328 172", C.orange, 4) + Gl(310, 170, "?", 18, C.orange)) +
        G("lv", 90, 236, T(24, 250, "TWO ACCOUNTS LOST", { a: "start", z: 17, c: C.navy })) +
        G("ld", 310, 240, T2(310, 236, "DELIVER", "QUICKLY?", { c: C.orange })) +
        [["WHAT", "BOUNDARIES?", 106, 294], ["WHICH", "DEPENDENCIES?", 294, 294], ["LEADER", "SUPPORT?", 106, 348], ["WHAT", "OPPORTUNITIES?", 294, 348]].map(([a, b, x, y], i) =>
          G("u" + i, x, y, R(x - 92, y - 25, 184, 50, 10, C.paper, C.orange, 2.5, 'stroke-dasharray="6 4"') + T2(x, y - 4, a, b, { z: 17, c: C.ink }))).join("") +
        [0, 1, 2, 3].map((i) => G("w" + i, i % 2 ? 378 : 190, i < 2 ? 272 : 326, warn(i % 2 ? 378 : 190, i < 2 ? 272 : 326, 0.8))).join(""),
      steps: [
        "+h0 +pst +bm bm.r=-11 +lv",
        "-h0 +h1 +qd +ld",
        "-h1 +h2 -ld -lv +u0 +u1 +u2 +u3",
        "-h2 +h3 +w0 +w1 +w2 +w3"] },

    // Template 102 · 3D Isometric Factory Process (LottieFiles) — https://lottiefiles.com/free-animation/3d-isometric-factory-process-TJAlBgYcXw
    // Adapted: "sequence the robotic activity" -> one contained housekeeping cell, then the same small gain repeated
    // across every property, then the question of the only team, then the credibility cost of an easy win.
    { ref: U[102], cap: "Weighing room release", n: 4,
      svg: () => hl("h0", "NARROW, MANAGEABLE SCOPE", C.green) + hl("h1", "MODEST GAINS MULTIPLY", C.green) + hl("h2", "WORTH THE ONLY TEAM?", C.orange) + hl("h3", "EASY WIN, WEAKER CREDIBILITY", C.orange) +
        G("cell", 200, 190, R(110, 86, 180, 170, 16, C.pale, C.green, 4, 'stroke-dasharray="9 6"') + CAND[3](200, 170, 2.2) + T(200, 290, "ONE DEPARTMENT", { c: C.green })) +
        G("hs", 200, 200, Array.from({ length: 14 }, (_, i) => hotel(42 + (i % 7) * 52, 112 + Math.floor(i / 7) * 92, 1, C.navy) + Gl(62 + (i % 7) * 52, 98 + Math.floor(i / 7) * 92, "+", 20, C.green)).join("")) +
        G("H0", 24, 300, R(24, 286, 352, 28, 8, C.green)) + G("hl", 200, 340, T(200, 346, "SMALL GAINS ADD UP", { c: C.green })) +
        G("tm", 70, 210, person(70, 214, 1.8, C.navy) + T2(70, 270, "ONE", "TEAM", { c: C.navy })) +
        Ln("Lt", "M110 200Q200 140 290 196", C.navy, 4, 'stroke-dasharray="7 6"') +
        G("rr", 310, 210, CAND[3](310, 214, 1.4) + qB(340, 160, 16) + T2(310, 270, "BENEFITS", "ENOUGH?", { c: C.orange })) +
        G("tp", 110, 210, trophy(110, 196, 2.2, C.gold) + T2(110, 280, "QUICK", "SUCCESS", { c: C.navy })) +
        G("cr", 290, 220, Pa("M220 240A70 70 0 0 1 360 240", C.blue, 16) + Pa("M220 240A70 70 0 0 1 250 184", C.orange, 16)) +
        G("nd", 290, 240, Pa("M290 240L246 210", C.ink, 5) + Ci(290, 240, 8, C.ink) + T2(290, 284, "STRATEGIC", "CREDIBILITY", { c: C.orange })),
      steps: [
        "+h0 +cell",
        "-h0 +h1 -cell +hs +H0 +hl",
        "-h1 +h2 -hs -H0 -hl +tm +Lt +rr",
        "-h2 +h3 -tm -Lt -rr +tp +cr +nd"] },

    // Template 093 · Process-Para (LottieFiles) — https://lottiefiles.com/free-animation/process-para-qujCEQ2AKT
    // Adapted: "rotate, wait, finish" -> a countdown ring to January locks the obligation; a higher score cannot
    // unlock it; a separate workstream still needs a sponsor; the selection door does not open onto "ignore".
    { ref: U[93], cap: "Mandatory, not optional", n: 4,
      svg: () => hl("h0", "A JANUARY OBLIGATION", C.orange) + hl("h1", "MANDATORY STAYS MANDATORY", C.orange) + hl("h2", "SPONSOR STILL NEEDED", C.orange) + hl("h3", "NO PERMISSION TO IGNORE", C.orange) +
        G("rg", 200, 196, ring(200, 196, 92, C.blue, 18) + cal(200, 190, 2, C.orange) + Gl(200, 208, "JAN", 22, C.orange) + lockI(262, 252, 1.5, C.orange) + T(200, 334, "NOT AN OPTION", { c: C.orange })) +
        ringD("Lrg", 200, 196, 92, C.orange, 18) +
        G("sb", 200, 200, R(24, 90, 160, 120, 14, C.paper, C.green, 3) + CAND[0](70, 150, 1.1) + star(140, 130, 18) + T2(104, 184, "HIGHER", "SCORE", { z: 17, c: C.green }) +
          R(216, 90, 160, 120, 14, C.paper, C.orange, 3) + CAND[2](262, 150, 1.1) + lockI(332, 150, 1.2, C.orange) + T2(296, 184, "STILL", "REQUIRED", { z: 17, c: C.orange }) +
          arr(186, 150, 212, 150, C.green, 3) + noB(200, 120, 12)) +
        G("ln", 200, 300, Pa("M24 290H376", C.orange, 8, 'opacity=".7"') + T(24, 270, "COMPLIANCE WORKSTREAM", { a: "start", z: 17, c: C.orange }) + CAND[2](70, 330, 0.9)) +
        G("es", 300, 326, chairE(300, 334, 1, C.orange) + qB(330, 300, 11)) + G("fs", 300, 326, person(300, 334, 1.2, C.gold) + crown(300, 304, 0.7)) +
        G("dr", 200, 200, R(30, 80, 150, 210, 12, C.pale, C.navy, 3) + Ci(160, 190, 5, C.navy) + T2(105, 140, "SELECTION", "DECISION", { c: C.navy }) +
          R(220, 80, 150, 210, 12, C.pale, C.orange, 3) + shield(295, 190, 1.4, C.orange) + T2(295, 140, "REGULATORY", "DUTY", { c: C.orange }) +
          pill(200, 334, "NOT A WAIVER", C.orange) + arr(150, 250, 250, 250, C.navy, 4, 'stroke-dasharray="6 5"') + noB(200, 250, 14)),
      steps: [
        "+h0 +rg +Lrg",
        "-h0 +h1 -rg -Lrg +sb",
        "-h1 +h2 +ln +es",
        "-h2 +h3 -sb -ln -es +dr"] },

    // Template 077 · Workflow AI Animation (Dribbble) — https://dribbble.com/shots/26275497-Workflow-AI-Animation
    // Adapted: "advance data through stages" -> guest arrival's evidence flows through stages: visible impact
    // across departments, the link back to weeks 5 and 6, the conditional sponsor test, then measures and cooperation.
    { ref: U[77], cap: "Weighing guest arrival", n: 4,
      svg: () => hl("h0", "VISIBLE, CROSS-FUNCTIONAL", C.green) + hl("h1", "THE STORY CONNECTS", C.green) + hl("h2", "CONDITIONAL ON THE SPONSOR", C.orange) + hl("h3", "MEASURES AND COOPERATION", C.navy) +
        G("ga", 200, 190, [0, 1, 2, 3].map((i) => R(20, 96 + i * 50, 360, 38, 10, i % 2 ? C.pale : C.paper, CCOL[i], 2)).join("") +
          Ln("Lx2", "M60 115C160 115 160 265 340 265", C.green, 6) + eye(330, 90, 1.6, C.green) +
          person(60, 120, 1, C.green) + T(200, 330, "FOUR DEPARTMENTS CROSSED", { z: 17, c: C.green })) +
        G("ch", 200, 200, [["WEEK 5", "STRATEGY", C.navy], ["WEEK 6", "ARCHITECTURE", C.navy], ["GUEST", "ARRIVAL", C.green]].map(([a, b, c], i) =>
            R(52, 76 + i * 84, 296, 68, 9, C.paper, c, 3.5) + T2(200, 102 + i * 84, a, b, { z: 18, c }) + (i < 2 ? Ci(200, 152 + i * 84, 6, C.navy) : "")).join("") + link(200, 350, 1.3, C.green)) +
        G("cd", 200, 210, brk(40, 360, 250, C.green, 4) + Pa("M60 250Q200 120 340 250", C.gold, 3, 'stroke-dasharray="6 5"') + person(200, 180, 1.4, C.gold) + crown(200, 148, 0.8) + qB(244, 150, 14) +
          pill(200, 300, "CONDITIONAL APPROVAL", C.orange)) +
        G("mc", 200, 210, Pa("M60 220A60 60 0 0 1 180 220", C.navy, 10) + Pa("M120 220L150 180", C.orange, 4) + Ci(120, 220, 7, C.ink) + T2(120, 262, "REALISTIC", "MEASURES", { c: C.navy }) +
          person(250, 214, 1.1, C.orange) + person(300, 214, 1.1, C.navy) + person(350, 214, 1.1, C.gold) + Pa("M262 214H288M312 214H338", C.green, 4) + T2(300, 262, "DEPARTMENTS", "COOPERATE", { c: C.green })),
      steps: [
        "+h0 +ga +Lx2",
        "-h0 +h1 -ga -Lx2 +ch",
        "-h1 +h2 -ch +cd",
        "-h2 +h3 -cd +mc"] },

    // Template 107 · Supply Chain and Shipping (LottieFiles) — https://lottiefiles.com/free-animation/supply-chain-and-shipping-Gd8ZsVZpXq
    // Adapted: "advance the shipment through nodes" -> each candidate that is not chosen is routed somewhere explicit:
    // billing is acknowledged and deferred with a reason and a date; room release stays on the board; the record goes to compliance.
    { ref: U[107], cap: "Deferred, with reasons", n: 3,
      svg: () => hl("h0", "ACKNOWLEDGE THE RIVAL", C.navy) + hl("h1", "WHY DEFERRED, AND WHEN", C.navy) + hl("h2", "NOTHING QUIETLY DROPPED", C.green) +
        G("bc", 120, 196, R(36, 110, 168, 170, 16, C.paper, C.navy, 3.5) + CAND[1](120, 176, 1.8) + [80, 160, 120].map((x, i) => star(x, 132 + (i === 2 ? -6 : 0), 11)).join("") + T2(120, 244, "BENEFITS WE", "MAY MISS", { z: 17, c: C.navy })) +
        G("ga", 300, 196, R(222, 110, 156, 170, 16, C.paper, C.green, 3.5) + CAND[0](300, 176, 1.8) + T2(300, 244, "CHOSEN", "START", { c: C.green })) +
        G("fr", 90, 260, person(80, 282, 1.6, C.navy) + T(80, 344, "FINANCE REP", { c: C.navy })) +
        G("lt", 270, 200, env(184, 210, 1.6, C.navy) + T2(250, 112, "WHY", "DEFERRED", { a: "start", c: C.navy }) + cal(262, 220, 1.3, C.green) + T2(292, 210, "WHEN", "REVISITED", { a: "start", z: 17, c: C.green }) +
          Mv("Me", [[340, 300], [130, 270]], env(0, 0, 0.8, C.navy))) +
        G("bd", 200, 200, R(16, 76, 176, 182, 12, C.pale, C.navy, 3) + T2(104, 104, "CONCERNS", "BOARD", { z: 17, c: C.navy }) + R(52, 150, 104, 80, 6, C.paper, C.gold, 3) + CAND[3](104, 190, 1.1) + Ci(104, 152, 5, C.orange) +
          Pa("M210 296H384", C.orange, 8, 'opacity=".7"') + CAND[2](250, 270, 0.9) + cal(352, 262, 0.8, C.orange) + T(296, 336, "COMPLIANCE TRACK", { z: 17, c: C.orange }) +
          R(212, 76, 172, 150, 12, C.paper, C.green, 3) + CAND[0](298, 138, 1.4) + T(298, 204, "BPM START", { c: C.green })),
      steps: [
        "+h0 +bc +ga",
        "-h0 +h1 -ga bc.o=0 +fr +lt",
        "-h1 +h2 -bc -fr -lt +bd"] },

    // Template 121 · Dashboard by RAKIBUZZAMAN (LottieFiles) — https://lottiefiles.com/free-animation/dashboard-M05MmlnoOP
    // Adapted: "fill the graph and highlight the metric" -> the decision record fills row by row; the other problems
    // stay on the dashboard; the next lesson's two panels preview; every option keeps its plus and minus.
    { ref: U[121], cap: "The decision record", n: 4,
      svg: () => hl("h0", "THE DECISION RECORD", C.green) + hl("h1", "PROBLEMS STILL LISTED", C.navy) + hl("h2", "NEXT: BOUNDARY AND SUPPORT", C.navy) + hl("h3", "CHOOSE RESPONSIBLY", C.green) +
        G("rc", 200, 200, R(28, 66, 344, 270, 14, C.paper, C.green, 3.5) +
          ["ASSUMPTIONS STATED", "OPEN RISKS LISTED", "LEADERS NAMED", "READINESS EVIDENCE"].map((s, i) => G("r" + i, 200, 110 + i * 60, okB(62, 110 + i * 60, 14) + T(90, 116 + i * 60, s, { a: "start", c: C.ink }))).join("")) +
        G("st", 200, 200, [1, 2, 3].map((i, j) => R(36 + j * 116, 90, 98, 120, 12, C.paper, CCOL[i], 3) + CAND[i](85 + j * 116, 150, 1.2)).join("") +
          Fi("M30 290Q120 250 200 280T370 286V320H30Z", C.blue, `stroke="${C.navy}" stroke-width="2"`) + T(200, 350, "STILL ON THE LIST", { c: C.navy })) +
        G("nx", 200, 210, R(26, 90, 168, 200, 14, C.paper, C.green, 3) + brk(46, 174, 150, C.green, 5) + Gs(110, 210, 1.3, [0, 1, 2].map((i) => Ci(-30 + i * 30, 0, 8, C.navy)).join("")) + T2(110, 252, "WORKABLE", "BOUNDARY", { z: 17, c: C.green }) +
          R(206, 90, 168, 200, 14, C.paper, C.gold, 3) + [250, 290, 330].map((x) => R(x - 8, 150, 16, 80, 3, C.blue, C.navy, 2)).join("") + R(232, 140, 116, 12, 4, C.navy) + T2(290, 252, "SUPPORT", "SECURED", { z: 17, c: C.navy })) +
        G("all", 200, 210, [0, 1, 2, 3].map((i) => R(18 + i * 96, 100, 80, 200, 12, C.paper, CCOL[i], 3) + CAND[i](58 + i * 96, 150, 1) +
          Ci(44 + i * 96, 220, 12, C.green) + Pa(`M${38 + i * 96} 220H${50 + i * 96}M${44 + i * 96} 214V226`, C.paper, 3) + Ci(72 + i * 96, 260, 12, C.orange) + Pa(`M${66 + i * 96} 260H${78 + i * 96}`, C.paper, 3)).join("") +
          T(200, 340, "EVERY OPTION: TRADE-OFFS", { c: C.navy })),
      steps: [
        "+h0 +rc +r0 +r1 +r2 +r3",
        "-h0 +h1 -rc +st",
        "-h1 +h2 -st +nx",
        "-h2 +h3 -nx +all"] }
  ]);

  addStyle("w07-claude-v2-part2", ["O2a","O2b","O2c"]);
})();

// FILE w07-claude-v2-part3.js
// OPER621 · Week 7 · The Launch Pad Phase — animated teaching scenes v2, part 3 of 4 (O3a, O3b, O3c).
// Standalone: defines every helper it uses, registers its own scenes, appends its own rules to <style id="vl-sc-w07">.
// Parts 1-4 load in any order. Rebuilt from the GPT-6 content audit: every narration line now has its own visible
// state change, and every section is split into 8-11 distinct shots (a new visual every 2-5 lines).
//
// Contract: window.VL_SCENES['<secId>'] = { build(el), step(i, n), reset() }
//   step(i, n): n === narration line count -> one state per line; n === visual-moment count -> that moment's line;
//   any other n -> proportional. Every state is rebuilt from scratch, so seek, replay and going back are safe.
//   Motion: window.gsap drives the tween when present, otherwise requestAnimationFrame. Elements entering on a line
//   are staggered; shots push left/right; prefers-reduced-motion jumps straight to each state with no ambient loops.
// Layout: one 400x380 stage, "meet" fit, dotted backdrop extends into any spare space, so the figure fills the phone
//   slot above the text and the left 60% on a laptop. Labels are 2-4 words, 16-19 units; the narration is never shown.
// QA: every label was checked against the 400x380 frame and against every other label visible on the same line
//   (estimated glyph widths), for every narration line of every section.
// Each shot names the benchmark template it adapts (number, title, exact URL) in the comment above it.
(() => {
  "use strict";
  if (typeof window === "undefined" || typeof document === "undefined") return;
  window.VL_SCENES = window.VL_SCENES || {};
  const REG = window.VL_SCENES;
  // ---------- palette (exact values: the look engines remap them) ----------
  const C = {
    navy: "#1f4e79", orange: "#c0502a", paper: "#fbf8f1", ink: "#1b2a3a",
    blue: "#dbe7f2", green: "#317c61", pale: "#edf3f7", gold: "#d7a45c"
  };
  const NS = "http://www.w3.org/2000/svg";
  const VW = 400, VH = 380;
  // ---------- maths ----------
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const r1 = (v) => Math.round(v * 10) / 10;
  const r3 = (v) => Math.round(v * 1000) / 1000;
  const rad = (d) => (d * Math.PI) / 180;
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeBack = (t) => { const c1 = 1.5, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
  const reduced = () => {
    try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    catch (e) { return false; }
  };
  // ---------- SVG string primitives (absolute coordinates everywhere) ----------
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const at = (o) => Object.keys(o).filter((k) => o[k] !== undefined && o[k] !== null && o[k] !== false && o[k] !== "")
    .map((k) => `${k}="${o[k]}"`).join(" ");
  const R = (x, y, w, h, rx, f, s, sw, ex = "") =>
    `<rect ${at({ x: r1(x), y: r1(y), width: r1(w), height: r1(h), rx, fill: f || "none", stroke: s, "stroke-width": sw })} ${ex}/>`;
  const Ci = (x, y, r, f, s, sw, ex = "") =>
    `<circle ${at({ cx: r1(x), cy: r1(y), r: r1(r), fill: f || "none", stroke: s, "stroke-width": sw })} ${ex}/>`;
  const El = (x, y, rx, ry, f, s, sw, ex = "") =>
    `<ellipse ${at({ cx: r1(x), cy: r1(y), rx: r1(rx), ry: r1(ry), fill: f || "none", stroke: s, "stroke-width": sw })} ${ex}/>`;
  const Pa = (d, s, sw = 3, ex = "") =>
    `<path d="${d}" fill="none" stroke="${s}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
  const Fi = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
  // Self-drawing stroke (keys starting with "L"): progress in P["k.d"].
  const Ln = (k, d, s, sw = 4, ex = "") =>
    `<path data-k="${k}" d="${d}" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" fill="none" stroke="${s}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
  // Animated group; (ox, oy) is the pivot for scale and rotation.
  const G = (k, ox, oy, inner, ex = "") => `<g data-k="${k}" data-ox="${r1(ox)}" data-oy="${r1(oy)}" ${ex}>${inner}</g>`;
  // Mover (keys starting with "M"): drawn around (0,0), travels along a polyline with P["k.t"].
  const Mv = (k, pts, inner) =>
    `<g data-k="${k}" data-ox="0" data-oy="0" data-path="${pts.map((p) => p.join(",")).join(" ")}" transform="translate(${pts[0][0]} ${pts[0][1]})">${inner}</g>`;
  // Static icon placement.
  const Gs = (x, y, s, inner, ex = "") => `<g transform="translate(${r1(x)} ${r1(y)}) scale(${s})" ${ex}>${inner}</g>`;
  // Labels: 2-4 words, never narration, minimum 16 units.
  const T = (x, y, s, o = {}) =>
    `<text ${at({ x: r1(x), y: r1(y), "font-size": Math.max(16, o.z || 18), fill: o.c || C.ink, "text-anchor": o.a || "middle",
      "font-weight": 800, class: "vlw-t" + (o.nh ? " vlw-nh" : ""), "data-lab": "1" })}>${esc(s)}</text>`;
  const T2 = (x, y, a, b, o = {}) => {
    const z = Math.max(16, o.z || 18), lh = Math.round(z * 1.1);
    return `<text ${at({ x: r1(x), y: r1(y), "font-size": z, fill: o.c || C.ink, "text-anchor": o.a || "middle", "font-weight": 800,
      class: "vlw-t" + (o.nh ? " vlw-nh" : ""), "data-lab": "2" })}><tspan x="${r1(x)}" dy="0">${esc(a)}</tspan><tspan x="${r1(x)}" dy="${lh}">${esc(b)}</tspan></text>`;
  };
  // Glyphs (symbols and numerals inside icons; not labels).
  const Gl = (x, y, s, z = 18, c = C.ink) =>
    `<text x="${r1(x)}" y="${r1(y)}" font-size="${r1(z)}" fill="${c}" text-anchor="middle" font-weight="800" class="vlw-t vlw-gl">${esc(s)}</text>`;
  // Live counter text (keys starting with "N").
  const Num = (k, x, y, v, z = 30, c = C.navy, suf = "") =>
    `<text data-k="${k}" data-ox="${x}" data-oy="${y}" data-suf="${esc(suf)}" x="${x}" y="${y}" font-size="${z}" fill="${c}" text-anchor="middle" font-weight="800" class="vlw-t vlw-gl">${v}${esc(suf)}</text>`;
  const pillW = (s, z = 17) => Math.round(s.length * z * 0.66 + 28);
  const pill = (x, y, s, c = C.navy, f = C.paper, z = 17) => {
    const w = pillW(s, z);
    return R(x - w / 2, y - 18, w, 36, 18, f, c, 2.5) + T(x, y + 6, s, { z, c: f === C.paper ? c : C.paper, nh: f !== C.paper });
  };
  // Pill with a status badge inside its left end: badge(x, y) draws the badge.
  const bpill = (x, y, s, c, badge, dash = false, z = 17) => {
    const w = Math.round(s.length * z * 0.66 + 62), x0 = x - w / 2;
    return R(x0, y - 19, w, 38, 19, C.paper, c, 3, dash ? 'stroke-dasharray="7 5"' : "") + badge(x0 + 21, y) + T(x0 + 42, y + 6, s, { a: "start", z, c });
  };
  const hl = (k, s, c = C.navy, y = 32) => G(k, 200, y - 7, T(200, y, s, { z: s.length > 26 ? 18 : 20, c }));
  // ---------- icon library (centred on x, y) ----------
  const person = (x, y, s = 1, c = C.navy) => Gs(x, y, s, Ci(0, -13, 8.5, c) + Fi("M-15 17Q-15 0 0 0Q15 0 15 17Z", c));
  const hotel = (x, y, s = 1, c = C.navy, f = C.paper) => Gs(x, y, s, R(-13, -20, 26, 40, 3, f, c, 2.5) +
    [-7, 2].map((dx) => [-14, -5].map((dy) => R(dx, dy, 5, 5, 1, c)).join("")).join("") + R(-4, 9, 8, 11, 1.5, c));
  const doc = (x, y, s = 1, c = C.navy, n = 3, f = C.paper) => Gs(x, y, s,
    Fi("M-15 -20H8L15 -13V20H-15Z", f, `stroke="${c}" stroke-width="2.5" stroke-linejoin="round"`) + Pa("M8 -20V-13H15", c, 2) +
    Array.from({ length: n }, (_, i) => Pa(`M-9 ${-8 + i * 8}H${i % 2 ? 4 : 9}`, c, 2.5)).join(""));
  const ck = (x, y, s = 1, c = C.green, sw = 4) => Pa(`M${r1(x - 9 * s)} ${r1(y)}l${r1(6 * s)} ${r1(7 * s)}l${r1(13 * s)} ${r1(-15 * s)}`, c, sw);
  const xx = (x, y, s = 1, c = C.orange, sw = 4) => Pa(`M${r1(x - 8 * s)} ${r1(y - 8 * s)}l${r1(16 * s)} ${r1(16 * s)}m0 ${r1(-16 * s)}l${r1(-16 * s)} ${r1(16 * s)}`, c, sw);
  const okB = (x, y, r = 12, c = C.green) => Ci(x, y, r, c) + ck(x + 1, y + 1, r / 15, C.paper, 3);
  const noB = (x, y, r = 12, c = C.orange) => Ci(x, y, r, c) + xx(x, y, r / 17, C.paper, 3);
  const qB = (x, y, r = 14, c = C.orange) => Ci(x, y, r, C.paper, c, 3) + Gl(x, y + r * 0.45, "?", r * 1.3, c);
  const exB = (x, y, r = 12, c = C.orange) => Ci(x, y, r, c) + Pa(`M${x} ${r1(y - r * 0.5)}V${r1(y + r * 0.12)}`, C.paper, 3) + Ci(x, y + r * 0.45, 1.8, C.paper);
  const clock = (x, y, r, c = C.navy, a = 60) => Ci(x, y, r, C.paper, c, 3) +
    Pa(`M${x} ${y}V${r1(y - r * 0.6)}M${x} ${y}L${r1(x + r * 0.5 * Math.cos(rad(a - 90)))} ${r1(y + r * 0.5 * Math.sin(rad(a - 90)))}`, c, 3);
  const starD = (x, y, r) => { let d = ""; for (let i = 0; i < 10; i++) { const a = rad(-90 + i * 36), q = i % 2 ? r * 0.45 : r; d += (i ? "L" : "M") + r1(x + q * Math.cos(a)) + " " + r1(y + q * Math.sin(a)); } return d + "Z"; };
  const star = (x, y, r, c = C.gold) => Fi(starD(x, y, r), c);
  const target = (x, y, r, c = C.navy) => Ci(x, y, r, C.paper, c, 2.5) + Ci(x, y, r * 0.58, "none", c, 2.5) + Ci(x, y, r * 0.2, c);
  const shield = (x, y, s = 1, c = C.green) => Gs(x, y, s, Fi("M0 -18L15 -12V1Q15 13 0 19Q-15 13 -15 1V-12Z", C.paper, `stroke="${c}" stroke-width="3" stroke-linejoin="round"`) + ck(0, 0, 0.7, c, 3));
  const keyI = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Ci(-8, 0, 7, "none", c, 3.5) + Pa("M-1 0H16M11 0V6M16 0V5", c, 3.5));
  const crown = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Fi("M-14 8L-12 -8L-5 0L0 -12L5 0L12 -8L14 8Z", c) + R(-14, 8, 28, 5, 2, c));
  const lens = (x, y, r = 16, c = C.navy) => Ci(x, y, r, C.paper, c, 4, 'fill-opacity=".45"') + Pa(`M${r1(x + r * 0.7)} ${r1(y + r * 0.7)}L${r1(x + r * 1.5)} ${r1(y + r * 1.5)}`, c, 6);
  const flag = (x, y, s = 1, c = C.green) => Gs(x, y, s, Pa("M0 0V-34", C.ink, 3) + Fi("M0 -34L22 -28L0 -21Z", c));
  const pin = (x, y, s = 1, c = C.orange) => Gs(x, y, s, Fi("M0 0C-5 -12 -16 -18 -16 -31A16 16 0 1 1 16 -31C16 -18 5 -12 0 0Z", c) + Ci(0, -31, 6, C.paper));
  const bub = (x, y, w, h, c = C.navy, f = C.paper, tail = -1) =>
    Fi(`M${r1(x + tail * w * 0.25 - 7)} ${r1(y + h / 2 - 2)}L${r1(x + tail * w * 0.25 + tail * 12)} ${r1(y + h / 2 + 13)}L${r1(x + tail * w * 0.25 + 7)} ${r1(y + h / 2 - 2)}Z`, f, `stroke="${c}" stroke-width="2.5" stroke-linejoin="round"`) +
    R(x - w / 2, y - h / 2, w, h, 12, f, c, 2.5);
  const cloud = (x, y, s = 1, f = C.blue, c = C.navy) => Gs(x, y, s, Fi("M-30 12Q-42 12 -40 0Q-38 -12 -24 -10Q-20 -26 -2 -24Q14 -30 22 -14Q38 -14 38 0Q38 12 26 12Z", f, `stroke="${c}" stroke-width="2.5"`));
  const cal = (x, y, s = 1, c = C.navy, f = C.paper) => Gs(x, y, s, R(-18, -16, 36, 34, 5, f, c, 2.5) + R(-18, -16, 36, 10, 4, c) + Pa("M-10 -20V-12M10 -20V-12", c, 3) +
    [0, 1, 2].map((i) => R(-12 + i * 9, 0, 6, 5, 1, c)).join("") + [0, 1].map((i) => R(-12 + i * 9, 8, 6, 5, 1, c)).join(""));
  const truck = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-30, -20, 38, 26, 3, c) + Fi("M8 -12H22L30 -2V6H8Z", c) + R(13, -9, 9, 7, 1.5, C.pale) +
    Ci(-18, 8, 6, C.ink) + Ci(-18, 8, 2.5, C.pale) + Ci(20, 8, 6, C.ink) + Ci(20, 8, 2.5, C.pale));
  const bed = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-20, -2, 40, 10, 3, C.blue, c, 2.5) + R(-20, -10, 12, 9, 3, C.paper, c, 2) + Pa("M-20 -14V14M20 0V14", c, 3));
  const scr = (x, y, w, h, c = C.ink) => R(x - w / 2, y - h / 2, w, h, 5, c) + R(x - w / 2 + 4, y - h / 2 + 4, w - 8, h - 8, 3, C.pale) + R(x - 5, y + h / 2, 10, 6, 1, c) + R(x - 15, y + h / 2 + 5, 30, 4, 2, c);
  const gavel = (x, y, s = 1, c = C.ink) => Gs(x, y, s, `<g transform="rotate(-35)">${R(-18, -9, 36, 18, 4, c) + R(-3, 9, 6, 34, 3, c)}</g>` + R(-16, 30, 32, 7, 3, c));
  const sciss = (x, y, s = 1, c = C.ink) => Gs(x, y, s, Ci(-9, 12, 7, "none", c, 3) + Ci(9, 12, 7, "none", c, 3) + Pa("M-5 6L12 -20M5 6L-12 -20", c, 3.5));
  const lockI = (x, y, s = 1, c = C.navy, open = false) => Gs(x, y, s, R(-12, -4, 24, 20, 4, c) +
    Pa(open ? "M-7 -4V-12Q-7 -20 0 -20Q7 -20 7 -14" : "M-7 -4V-11Q-7 -19 0 -19Q7 -19 7 -11V-4", c, 3.5) + Ci(0, 5, 3, C.paper));
  const mega = (x, y, s = 1, c = C.orange) => Gs(x, y, s, Fi("M-14 -6L8 -16V16L-14 6Z", c) + R(-22, -7, 9, 14, 2, c) + Pa("M14 -10Q22 0 14 10M19 -16Q31 0 19 16", c, 2.5) + Pa("M-16 7L-12 18", c, 4));
  const warn = (x, y, s = 1, c = C.orange) => Gs(x, y, s, Fi("M0 -16L16 12H-16Z", C.paper, `stroke="${c}" stroke-width="3" stroke-linejoin="round"`) + Pa("M0 -5V3", c, 3.2) + Ci(0, 8, 1.9, c));
  const gear = (x, y, r, c = C.navy) => Gs(x, y, 1, [0, 45, 90, 135].map((a) => R(-r * 1.28, -r * 0.24, r * 2.56, r * 0.48, 2, c, "", "", `transform="rotate(${a})"`)).join("") + Ci(0, 0, r, c) + Ci(0, 0, r * 0.42, C.paper));
  const suit = (x, y, s = 1, c = C.orange) => Gs(x, y, s, R(-13, -10, 26, 22, 4, c) + Pa("M-5 -10V-15H5V-10", c, 3) + Pa("M-13 -1H13", C.paper, 2));
  const bell = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Fi("M-14 6A14 14 0 0 1 14 6Z", c) + R(-18, 6, 36, 5, 2, C.ink) + Ci(0, -10, 3, C.ink));
  const bulb = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Ci(0, -6, 13, c) + R(-6, 6, 12, 9, 2, C.ink) + Pa("M-4 -6L0 0L4 -6", C.paper, 2));
  const rocket = (x, y, s = 1, c = C.orange) => Gs(x, y, s, Fi("M0 -34Q12 -22 12 0V12H-12V0Q-12 -22 0 -34Z", C.paper, `stroke="${C.navy}" stroke-width="3"`) +
    Ci(0, -12, 5, C.blue, C.navy, 2.5) + Fi("M-12 0L-22 14H-12ZM12 0L22 14H12Z", c));
  const trophy = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Fi("M-14 -18H14V-6Q14 8 0 10Q-14 8 -14 -6Z", c) + Pa("M-14 -12Q-24 -12 -20 -2Q-17 4 -12 2M14 -12Q24 -12 20 -2Q17 4 12 2", c, 3) + R(-3, 10, 6, 8, 1, c) + R(-11, 18, 22, 6, 2, c));
  const book = (x, y, s = 1, c = C.navy) => Gs(x, y, s, Fi("M0 -12Q-10 -18 -22 -14V14Q-10 10 0 16Q10 10 22 14V-14Q10 -18 0 -12Z", C.paper, `stroke="${c}" stroke-width="2.5" stroke-linejoin="round"`) + Pa("M0 -12V16", c, 2.5));
  const server = (x, y, s = 1, c = C.navy) => Gs(x, y, s, [0, 1, 2].map((i) => R(-16, -18 + i * 12, 32, 10, 2, C.paper, c, 2.5) + Ci(10, -13 + i * 12, 2, c)).join(""));
  const eye = (x, y, s = 1, c = C.navy) => Gs(x, y, s, Pa("M-16 0Q0 -13 16 0Q0 13 -16 0Z", c, 3) + Ci(0, 0, 5, c));
  const arr = (x1, y1, x2, y2, c = C.navy, sw = 3.5, ex = "") => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 11;
    return Pa(`M${r1(x1)} ${r1(y1)}L${r1(x2 - Math.cos(a) * 4)} ${r1(y2 - Math.sin(a) * 4)}`, c, sw, ex) +
      Fi(`M${r1(x2 + Math.cos(a) * 2)} ${r1(y2 + Math.sin(a) * 2)}L${r1(x2 - Math.cos(a - 0.45) * h)} ${r1(y2 - Math.sin(a - 0.45) * h)}L${r1(x2 - Math.cos(a + 0.45) * h)} ${r1(y2 - Math.sin(a + 0.45) * h)}Z`, c);
  };
  const wall = (x, y, w, h, c = C.orange) => {
    let s = ""; const bw = w / 3, bh = h / 4;
    for (let r = 0; r < 4; r++) for (let i = 0; i < 4; i++) {
      const a = x + i * bw - (r % 2 ? bw / 2 : 0), x0 = Math.max(x, a), x1 = Math.min(x + w, a + bw);
      if (x1 - x0 > 3) s += R(x0 + 1, y + r * bh + 1, x1 - x0 - 2, bh - 2, 2, C.paper, c, 2);
    }
    return s;
  };
  const desk = (x, y, w, c = C.navy) => R(x - w / 2, y, w, 14, 4, c) + R(x - w / 2 + 6, y + 14, w - 12, 24, 3, C.blue, c, 2);
  const chairE = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-14, -24, 28, 26, 6, "none", c, 2.5, 'stroke-dasharray="4 4"') +
    R(-17, 2, 34, 7, 3, "none", c, 2.5, 'stroke-dasharray="4 4"') + Pa("M-14 9V22M14 9V22", c, 2.5, 'stroke-dasharray="4 4"'));
  const cab = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-18, -26, 36, 52, 4, C.paper, c, 2.5) + [0, 1, 2].map((i) => R(-13, -21 + i * 16, 26, 13, 2, C.blue, c, 2) + R(-5, -16 + i * 16, 10, 3, 1.5, c)).join(""));
  const env = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-18, -12, 36, 24, 3, C.paper, c, 2.5) + Pa("M-18 -12L0 2L18 -12", c, 2.5));
  const cam = (x, y, s = 1, c = C.ink) => Gs(x, y, s, R(-18, -10, 36, 24, 4, c) + R(-8, -15, 14, 6, 2, c) + Ci(0, 2, 7, C.pale) + Ci(0, 2, 3.5, c));
  const wrench = (x, y, s = 1, c = C.navy) => Gs(x, y, s, `<g transform="rotate(45)">${R(-3.5, -4, 7, 30, 3, c) + Fi("M-10 -14A10 10 0 1 0 10 -14L5 -14L5 -6L-5 -6L-5 -14Z", c)}</g>`);
  const coin = (x, y, r = 9, c = C.gold) => Ci(x, y, r, c, C.ink, 1.5) + Pa(`M${x} ${r1(y - r * 0.5)}V${r1(y + r * 0.5)}`, C.paper, 2.5);
  const link = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-16, -7, 20, 14, 7, "none", c, 3.5) + R(-4, -7, 20, 14, 7, "none", c, 3.5));
  const face = (x, y, r, c = C.navy, mood = 0) => Ci(x, y, r, C.paper, c, 3) + Ci(x - r * 0.35, y - r * 0.2, r * 0.1 + 1, c) + Ci(x + r * 0.35, y - r * 0.2, r * 0.1 + 1, c) +
    Pa(mood > 0 ? `M${r1(x - r * 0.4)} ${r1(y + r * 0.2)}Q${x} ${r1(y + r * 0.6)} ${r1(x + r * 0.4)} ${r1(y + r * 0.2)}` :
      mood < 0 ? `M${r1(x - r * 0.4)} ${r1(y + r * 0.48)}Q${x} ${r1(y + r * 0.08)} ${r1(x + r * 0.4)} ${r1(y + r * 0.48)}` : `M${r1(x - r * 0.4)} ${r1(y + r * 0.35)}H${r1(x + r * 0.4)}`, c, 3);
  const compass = (x, y, r, c = C.navy) => Ci(x, y, r, C.paper, c, 3) + Fi(`M${x} ${r1(y - r * 0.75)}L${r1(x + r * 0.2)} ${y}L${x} ${r1(y + r * 0.1)}L${r1(x - r * 0.2)} ${y}Z`, C.orange) +
    Fi(`M${x} ${r1(y + r * 0.75)}L${r1(x + r * 0.2)} ${y}L${x} ${r1(y - r * 0.1)}L${r1(x - r * 0.2)} ${y}Z`, c);
  const brk = (x1, x2, y, c = C.green, sw = 4, down = true) => Pa(`M${x1} ${y + (down ? 12 : -12)}V${y}H${x2}V${y + (down ? 12 : -12)}`, c, sw);
  const node = (x, y, r, c, inner = "") => Ci(x, y, r, C.paper, c, 3.5) + inner;
  const card = (x, y, w, h, c, inner = "", f = C.paper) => R(x - w / 2, y - h / 2, w, h, 12, f, c, 3) + inner;
  const ring = (x, y, r, c = C.blue, sw = 8) => Ci(x, y, r, "none", c, sw);
  const ringD = (k, x, y, r, c = C.orange, sw = 8) => Ln(k, `M${x} ${y - r}A${r} ${r} 0 1 1 ${r1(x - 0.1)} ${y - r}`, c, sw, 'stroke-linecap="butt"');
  // Candidate process icons (Qasr's four candidates), centred on (x, y).
  const CAND = [
    (x, y, s = 1) => Gs(x, y, s, person(-8, 6, 0.85, C.green) + suit(13, 12, 0.6, C.orange)),
    (x, y, s = 1) => Gs(x, y, s, doc(-6, 0, 0.85, C.navy) + coin(12, 10, 8)),
    (x, y, s = 1) => Gs(x, y, s, scr(0, -4, 38, 28, C.ink) + Ci(0, -4, 6, C.orange)),
    (x, y, s = 1) => Gs(x, y, s, bed(0, 2, 0.95, C.navy) + keyI(10, -14, 0.5, C.gold))
  ];
  const CCOL = [C.green, C.navy, C.orange, C.gold];
  // Journey node icons.
  const JI = {
    book: (x, y) => cal(x, y, 0.62, C.navy),
    rate: (x, y) => coin(x, y, 9),
    room: (x, y) => bed(x, y, 0.55, C.navy),
    desk: (x, y) => bell(x, y + 2, 0.62, C.gold),
    bill: (x, y) => doc(x, y, 0.55, C.navy, 2),
    out: (x, y) => suit(x, y, 0.7, C.orange),
    key: (x, y) => keyI(x + 2, y, 0.6, C.gold),
    guest: (x, y) => person(x, y + 4, 0.55, C.green)
  };
  // ---------- engine ----------
  // Pose = flat map "<key>.<prop>" -> number. Props: o x y s sx sy r d t n.
  // Key kinds by first letter: L drawable stroke, B vertical bar (sy), H horizontal bar (sx), M mover (t), N counter (n).
  function initKey(P, k, local) {
    const kind = local[0];
    if (kind === "L") { P[k + ".o"] = 1; P[k + ".d"] = 0; }
    else if (kind === "B") { P[k + ".o"] = 0; P[k + ".sy"] = 0.04; }
    else if (kind === "H") { P[k + ".o"] = 0; P[k + ".sx"] = 0.04; }
    else if (kind === "M") { P[k + ".o"] = 0; P[k + ".t"] = 0; P[k + ".x"] = 0; P[k + ".y"] = 0; P[k + ".s"] = 1; }
    else if (kind === "N") { P[k + ".o"] = 0; P[k + ".n"] = 0; P[k + ".s"] = 1; }
    else { P[k + ".o"] = 0; P[k + ".s"] = 0.86; P[k + ".x"] = 0; P[k + ".y"] = 8; P[k + ".r"] = 0; }
  }
  function showKey(P, k, local) {
    const kind = local[0];
    P[k + ".o"] = 1;
    if (kind === "L") P[k + ".d"] = 1;
    else if (kind === "B") P[k + ".sy"] = 1;
    else if (kind === "H") P[k + ".sx"] = 1;
    else if (kind !== "M" && kind !== "N") { P[k + ".s"] = 1; P[k + ".x"] = 0; P[k + ".y"] = 0; P[k + ".r"] = 0; }
  }
  // Step DSL: "+k" show, "-k" hide, "~k" dim, "*k" emphasise, "=k" normal size, "k@0.5" move along path,
  // "k.p=v" set any prop, "!k" ping target, "@x,y" ping point.
  function runStep(str, P, pre, ord, pg) {
    if (!str) return;
    let idx = 0;
    str.trim().split(/\s+/).forEach((tok) => {
      let m;
      if (tok[0] === "@") { const v = tok.slice(1).split(",").map(Number); if (pg) pg.xy = v; return; }
      if (tok[0] === "!") { if (pg) pg.k = pre + tok.slice(1); return; }
      if ((m = tok.match(/^([+\-~*=])(\w+)$/))) {
        const local = m[2], k = pre + local;
        if (m[1] === "+") showKey(P, k, local);
        else if (m[1] === "-") { P[k + ".o"] = 0; if (local[0] === "L") P[k + ".d"] = 0; }
        else if (m[1] === "~") P[k + ".o"] = 0.28;
        else if (m[1] === "*") { P[k + ".o"] = 1; P[k + ".s"] = 1.14; }
        else if (m[1] === "=") P[k + ".s"] = 1;
        if (ord && !(k in ord)) ord[k] = idx++;
        if (pg && !pg.first && (m[1] === "+" || m[1] === "*")) pg.first = k;
        return;
      }
      if ((m = tok.match(/^(\w+)@(-?[\d.]+)$/))) {
        const k = pre + m[1]; P[k + ".t"] = Number(m[2]); P[k + ".o"] = 1;
        if (ord && !(k in ord)) ord[k] = idx++;
        if (pg && !pg.first) pg.first = k;
        return;
      }
      if ((m = tok.match(/^(\w+)\.(o|x|y|s|sx|sy|r|d|t|n)=(-?[\d.]+)$/))) {
        const k = pre + m[1]; P[k + "." + m[2]] = Number(m[3]);
        if (ord && !(k in ord)) ord[k] = idx++;
        return;
      }
      if (typeof console !== "undefined") console.warn("VL w07: bad step token", tok);
    });
  }
  const along = (pts, t) => {
    if (pts.length < 2) return pts[0] || [0, 0];
    const seg = []; let tot = 0;
    for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); tot += l; }
    let d = clamp(t, 0, 1) * tot;
    for (let i = 0; i < seg.length; i++) {
      if (d <= seg[i] || i === seg.length - 1) { const u = seg[i] ? clamp(d / seg[i], 0, 1) : 0; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u]; }
      d -= seg[i];
    }
    return pts[pts.length - 1];
  };
  function applyP(P, R) {
    for (const k in R) {
      const e = R[k];
      const o = P[k + ".o"], d = P[k + ".d"], t = P[k + ".t"];
      if (o !== undefined) e.setAttribute("opacity", r3(clamp(o, 0, 1)));
      if (o !== undefined || d !== undefined) {
        const vis = (o === undefined || o >= 0.01) && (d === undefined || d >= 0.004);
        e.style.visibility = vis ? "" : "hidden";
      }
      const x = P[k + ".x"], y = P[k + ".y"], s = P[k + ".s"], r = P[k + ".r"], sx = P[k + ".sx"], sy = P[k + ".sy"];
      const mv = e._pts && t !== undefined;
      if (mv || x !== undefined || y !== undefined || s !== undefined || r !== undefined || sx !== undefined || sy !== undefined) {
        const b = mv ? along(e._pts, t) : [0, 0];
        const ss = s === undefined ? 1 : Math.max(0.001, s);
        const kx = ss * (sx === undefined ? 1 : Math.max(0.001, sx)), ky = ss * (sy === undefined ? 1 : Math.max(0.001, sy));
        e.setAttribute("transform", `translate(${r1(b[0] + (x || 0) + e._ox)} ${r1(b[1] + (y || 0) + e._oy)}) rotate(${r1(r || 0)}) scale(${r3(kx)} ${r3(ky)}) translate(${-e._ox} ${-e._oy})`);
      }
      if (d !== undefined) e.setAttribute("stroke-dashoffset", r3(1 - clamp(d, 0, 1)));
      const n = P[k + ".n"];
      if (n !== undefined) e.textContent = String(Math.round(n)) + e._suf;
    }
  }
  function lineOf(i, n, L, M) {
    let ii = Number(i), nn = Number(n);
    if (!Number.isFinite(ii)) ii = 0;
    if (!Number.isFinite(nn) || nn < 1) nn = L;
    ii = clamp(Math.floor(ii), 0, Math.floor(nn) - 1); nn = Math.floor(nn);
    if (nn === L) return ii;
    if (M && nn === M.length) return M[ii];
    if (nn <= 1) return 0;
    return clamp(Math.round((ii * (L - 1)) / (nn - 1)), 0, L - 1);
  }
  const PUSH = 34;
  function section(id, title, L, M, shotDefs) {
    let a = 0;
    const S = shotDefs.map((s, i) => {
      const pre = `s${i}_`;
      const raw = s.svg();
      const svg = raw.replace(/data-k="(\w+)"/g, (m0, k) => `data-k="${pre}${k}"`);
      const keys = [];
      raw.replace(/data-k="(\w+)"/g, (m0, k) => { keys.push(k); return m0; });
      const sh = { i, a, n: s.n, cap: s.cap, ref: s.ref, base: s.base || "", steps: s.steps, svg, raw, keys, pre };
      const p0 = {};
      keys.forEach((k) => initKey(p0, pre + k, k));
      runStep(sh.base.split(/\s+/).filter(Boolean).map((k) => "+" + k).join(" "), p0, pre, null, null);
      sh.p0 = p0;
      a += s.n;
      return sh;
    });
    const pose = (line) => {
      const si = Math.max(0, S.findIndex((s) => line >= s.a && line < s.a + s.n));
      const sh = S[si], P = Object.assign({}, sh.p0), ord = {}, pg = {};
      S.forEach((s, i) => {
        P[`S${i}.o`] = i === si ? 1 : 0;
        P[`S${i}.x`] = i === si ? 0 : (i < si ? -PUSH : PUSH);
        P[`S${i}.s`] = i === si ? 1 : 0.97;
      });
      const loc = clamp(line - sh.a, 0, sh.n - 1);
      for (let j = 0; j <= loc; j++) runStep(sh.steps[j], P, sh.pre, j === loc ? ord : null, j === loc ? pg : null);
      return { P, si, ord, pg };
    };
    let root = null, Rm = {}, cur = null, anim = null, raf = 0, lastLine = -1;
    const stop = () => {
      if (anim && anim.kill) { try { anim.kill(); } catch (e) { /* ignore */ } }
      anim = null;
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
    };
    const ping = (pg) => {
      if (!root || reduced()) return;
      const c = root.querySelector(".vlw-ping");
      if (!c) return;
      let x = null, y = null;
      if (pg.xy) { x = pg.xy[0]; y = pg.xy[1]; }
      else {
        const e = Rm[pg.k || pg.first];
        if (e && e.getBBox) { try { const b = e.getBBox(); x = b.x + b.width / 2; y = b.y + b.height / 2; } catch (er) { x = null; } }
      }
      if (x === null || !Number.isFinite(x)) return;
      c.setAttribute("cx", r1(x)); c.setAttribute("cy", r1(y));
      try {
        if (window.gsap && window.gsap.fromTo) {
          window.gsap.killTweensOf(c);
          window.gsap.fromTo(c, { attr: { r: 8 }, opacity: 0.8 }, { attr: { r: 40 }, opacity: 0, duration: 0.95, delay: 0.35, ease: "power2.out" });
        } else if (c.animate) {
          c.animate([{ r: "8px", opacity: 0.8 }, { r: "40px", opacity: 0 }], { duration: 950, delay: 350, easing: "ease-out" });
        }
      } catch (er) { /* static state already correct */ }
    };
    const show = (line, live) => {
      if (!root) return;
      const { P: tgt, si, ord, pg } = pose(line);
      const chip = root.querySelector(".vlw-chip");
      if (chip) chip.textContent = S[si].cap;
      const bar = root.querySelector(".vlw-bar i");
      if (bar) bar.style.width = `${L <= 1 ? 100 : r1((100 * line) / (L - 1))}%`;
      root.setAttribute("data-line", String(line));
      stop();
      if (!live || reduced() || !cur) { cur = tgt; applyP(cur, Rm); lastLine = line; return; }
      const from = cur, keys = Object.keys(tgt), p0 = S[si].p0;
      const delay = {};
      for (const k in ord) delay[k] = Math.min(0.42, ord[k] * 0.085);
      const base = keys.map((key) => key.slice(0, key.lastIndexOf(".")));
      const prop = keys.map((key) => key.slice(key.lastIndexOf(".") + 1));
      const frame = (t) => {
        const P = {};
        for (let j = 0; j < keys.length; j++) {
          const key = keys[j], b = tgt[key];
          let a0 = from[key];
          if (a0 === undefined) a0 = p0[key];
          if (a0 === undefined) a0 = b;
          const dl = delay[base[j]] || 0, u = clamp((t - dl) / (1 - dl), 0, 1);
          P[key] = a0 + (b - a0) * (prop[j] === "s" && base[j][0] !== "S" ? easeBack(u) : easeIO(u));
        }
        cur = P; applyP(P, Rm);
      };
      const dur = 1.15;
      if (window.gsap && window.gsap.to) {
        const proxy = { t: 0 };
        anim = window.gsap.to(proxy, { t: 1, duration: dur, ease: "none", onUpdate: () => frame(proxy.t), onComplete: () => frame(1) });
      } else {
        const t0 = performance.now();
        const loop = (now) => { const t = clamp((now - t0) / (dur * 1000), 0, 1); frame(t); raf = t < 1 ? requestAnimationFrame(loop) : 0; };
        raf = requestAnimationFrame(loop);
      }
      if (line !== lastLine) ping(pg);
      lastLine = line;
    };
    const api = {
      build(el) {
        if (!el) return;
        stop();
        root = document.createElement("div");
        root.className = `vls-w07-${id}`;
        root.innerHTML =
          `<div class="vlw-stage"><svg xmlns="${NS}" viewBox="-24 -12 ${VW + 48} ${VH + 24}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(title)}">` +
          `<defs><pattern id="vlw7v2dots-${id}" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="${C.blue}"/></pattern></defs>` +
          `<rect x="-800" y="-800" width="2000" height="2000" fill="url(#vlw7v2dots-${id})" opacity=".7"/>` +
          S.map((s) => `<g data-k="S${s.i}" data-ox="200" data-oy="190">${s.svg}</g>`).join("") +
          `<circle class="vlw-ping" cx="200" cy="190" r="8" fill="none" stroke="${C.orange}" stroke-width="3" opacity="0"/>` +
          `</svg></div>` +
          `<div class="vlw-foot"><span class="vlw-kick">${esc(title)}</span><span class="vlw-chip" aria-live="polite"></span></div>` +
          `<div class="vlw-bar"><i></i></div>`;
        el.replaceChildren(root);
        // Safety net for wider host fonts: nudge any label that would cross the frame edge back inside it.
        root.querySelectorAll("text[data-lab]").forEach((t) => {
          try {
            const b = t.getBBox(); if (!b || !b.width) return;
            let dx = 0;
            if (b.width > VW - 8) { t.setAttribute("textLength", VW - 8); t.setAttribute("lengthAdjust", "spacingAndGlyphs"); }
            else if (b.x < 4) dx = 4 - b.x; else if (b.x + b.width > VW - 4) dx = VW - 4 - (b.x + b.width);
            if (dx) [t, ...t.querySelectorAll("tspan")].forEach((e) => { const x = Number(e.getAttribute("x")); if (Number.isFinite(x)) e.setAttribute("x", r1(x + dx)); });
          } catch (er) { /* layout not available: keep authored positions */ }
        });
        Rm = {};
        root.querySelectorAll("[data-k]").forEach((e) => {
          Rm[e.getAttribute("data-k")] = e;
          e._ox = Number(e.getAttribute("data-ox")) || 0;
          e._oy = Number(e.getAttribute("data-oy")) || 0;
          e._suf = e.getAttribute("data-suf") || "";
          const p = e.getAttribute("data-path");
          e._pts = p ? p.split(" ").map((q) => q.split(",").map(Number)) : null;
        });
        cur = null; lastLine = -1;
        show(0, false);
      },
      step(i, n) { show(lineOf(i, n, L, M), true); },
      reset() { stop(); cur = null; lastLine = -1; show(0, false); }
    };
    Object.defineProperty(api, "_vlw", { value: { id, title, L, M, shots: S, pose }, enumerable: false });
    REG[id] = api;
  }
  // ---------- one shared stylesheet, every rule scoped under .vls-w07-<secId> ----------
  const baseCss = (id) => {
    const S = `.vls-w07-${id}`;
    return `
${S}{position:relative;width:100%;height:100%;min-height:0;display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr) auto auto;box-sizing:border-box;overflow:hidden;color:${C.ink};font-family:inherit}
${S} *,${S} *::before,${S} *::after{box-sizing:border-box}
${S} .vlw-stage{position:relative;min-height:0;overflow:hidden}
${S} .vlw-stage svg{display:block;width:100%;height:100%;font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;text-rendering:geometricPrecision}
${S} .vlw-t{paint-order:stroke;stroke:${C.paper};stroke-width:5px;stroke-linejoin:round;pointer-events:none;letter-spacing:.02em}
${S} .vlw-nh,${S} .vlw-gl{stroke:none}
${S} .vlw-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:5px 10px 4px;min-height:32px;min-width:0}
${S} .vlw-kick{min-width:0;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:${C.navy};opacity:.75;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
${S} .vlw-chip{font-size:14px;font-weight:800;letter-spacing:.03em;color:${C.paper};background:${C.navy};border-radius:999px;padding:4px 12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;margin-left:auto}
${S} .vlw-bar{height:3px;background:${C.blue}}
${S} .vlw-bar i{display:block;height:100%;width:0;background:${C.orange};transition:width .6s ease}
${S} .vlw-pulse{animation:vlw7v2-pulse 2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
${S} .vlw-bob{animation:vlw7v2-bob 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
${S} .vlw-spin{animation:vlw7v2-spin 8s linear infinite;transform-box:fill-box;transform-origin:center}
${S} .vlw-flow{stroke-dasharray:8 9;animation:vlw7v2-flow 1.3s linear infinite}
${S} .vlw-shake{animation:vlw7v2-shake .9s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
${S} .vlw-blink{animation:vlw7v2-blink 1.6s ease-in-out infinite}
@media (max-width:420px){${S} .vlw-kick{display:none}${S} .vlw-chip{margin:0 auto}}
@media (prefers-reduced-motion:reduce){${S} *,${S} *::before,${S} *::after{animation:none!important;transition:none!important}}`;
  };
  const KEYFRAMES = `
@keyframes vlw7v2-pulse{0%,100%{transform:scale(.94);opacity:.65}50%{transform:scale(1.06);opacity:1}}
@keyframes vlw7v2-bob{0%,100%{transform:translateY(-3px)}50%{transform:translateY(3px)}}
@keyframes vlw7v2-spin{to{transform:rotate(360deg)}}
@keyframes vlw7v2-flow{to{stroke-dashoffset:-34}}
@keyframes vlw7v2-shake{0%,100%{transform:rotate(0)}25%{transform:rotate(-4deg)}75%{transform:rotate(4deg)}}
@keyframes vlw7v2-blink{0%,100%{opacity:1}50%{opacity:.35}}`;
  const addStyle = (mark, ids) => {
    let st = document.getElementById("vl-sc-w07");
    if (!st) { st = document.createElement("style"); st.id = "vl-sc-w07"; document.head.appendChild(st); }
    const tag = `/* ${mark} */`;
    if (st.textContent.indexOf(tag) >= 0) return;
    st.textContent += `\n${tag}\n${KEYFRAMES}\n${ids.map(baseCss).join("\n")}\n`;
  };
  // ---------- benchmark registry (animation-benchmark-part2: number -> exact URL) ----------
  const U = {
    76: "https://dribbble.com/shots/3791748-Workflow-Animation", // Workflow Animation
    77: "https://dribbble.com/shots/26275497-Workflow-AI-Animation", // Workflow AI Animation
    78: "https://dribbble.com/shots/27247003-Data-Workflow-Animation", // Data Workflow Animation
    79: "https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design", // Product Workflow Animation & UI Motion Design
    80: "https://dribbble.com/shots/27476599-Creative-Design-Workflow-Animation", // Creative Design Workflow Animation
    81: "https://dribbble.com/shots/27600376-Clean-Workflow-Visualization-with-Motion-Graphics", // Clean Workflow Visualization with Motion Graphics
    82: "https://www.behance.net/gallery/53752435/Motion-Design-Process", // Motion Design Process
    83: "https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion", // The Process Architectural Motion
    84: "https://www.behance.net/gallery/159045079/Process-What-is-a-Motion-Designer-", // Process - What is a Motion Designer?
    85: "https://www.behance.net/gallery/190390491/Creative-process-Motion-design-creative-project", // Creative process Motion design creative project
    86: "https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm", // Workflow by a
    87: "https://lottiefiles.com/free-animation/workflow-Jt52qpU9fj", // Workflow by Muammar Faiq
    88: "https://lottiefiles.com/free-animation/automated-workflows-XR2hxXOdEK", // Automated Workflows
    89: "https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5", // Git Workflow 1
    90: "https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU", // Multi-Step Icon Animation
    91: "https://lottiefiles.com/free-animation/cro-process-RaUu5ps2to", // cro process
    92: "https://lottiefiles.com/free-animation/process-fmpDUgNx8K", // process connecting
    93: "https://lottiefiles.com/free-animation/process-para-qujCEQ2AKT", // Process-Para
    94: "https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP", // Process - Success
    95: "https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8", // contract process
    96: "https://lottiefiles.com/free-animation/process-in-cub-9iNG7QP0qC", // Process in cub
    97: "https://lottiefiles.com/free-animation/business-solution-pNyNfkcRsa", // Business Solution conveyor
    98: "https://lottiefiles.com/free-animation/factory-4XJZcnPgAb", // Factory
    99: "https://lottiefiles.com/free-animation/bottling-factory-53Q3SoGu0x", // Bottling factory
    100: "https://lottiefiles.com/free-animation/3d-statistics-factory-lRiHNeU9Y4", // 3D Statistics Factory
    101: "https://lottiefiles.com/free-animation/3d-camera-factory-2I4Nonw7Ad", // 3D Camera Factory
    102: "https://lottiefiles.com/free-animation/3d-isometric-factory-process-TJAlBgYcXw", // 3D Isometric Factory Process
    103: "https://lottiefiles.com/free-animation/data-factory-animation-I6dMAfEyrl", // Data Factory Animation
    104: "https://lottiefiles.com/free-animation/logistics-trucks-DHvuLcYVdQ", // Logistics Trucks
    105: "https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy", // World map with logistics
    106: "https://lottiefiles.com/free-animation/supply-chain-and-logistics-8PtoYRCbiu", // Supply Chain and logistics
    107: "https://lottiefiles.com/free-animation/supply-chain-and-shipping-Gd8ZsVZpXq", // Supply Chain and Shipping
    108: "https://lottiefiles.com/free-animation/delivery-truck-road-animation-K9xyRiku9v", // Delivery Truck - Road Animation
    109: "https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6", // teamwork
    110: "https://observablehq.com/@d3/animated-quadtree", // Animated quadtree
    111: "https://old.observablehq.com/@d3/hierarchy-traversal-animated", // Hierarchy traversal animated
    112: "https://motionarray.com/after-effects-templates/infographics-pack-135055/", // Infographics Pack by ARstudio
    113: "https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/", // Infographic Chart Creator
    114: "https://motionarray.com/after-effects-templates/infographics-pack-100132/", // Infographics Pack by JVARTS STUDIO
    115: "https://motionarray.com/after-effects-templates/infographics-for-everything-2593374/", // Infographics For Everything
    116: "https://motionarray.com/after-effects-templates/infographics-3844461/", // Infographics by Ruslan Klimovich
    117: "https://motionarray.com/after-effects-templates/infographics-elements-789489/", // Infographics Elements by TarZanchik
    118: "https://motionarray.com/after-effects-templates/flat-infographics-17982/", // Flat Infographics by zevs
    119: "https://motionarray.com/after-effects-templates/infographics-v2-556482/", // Infographics V2 by Typoland
    120: "https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ", // Animated Dashboards
    121: "https://lottiefiles.com/free-animation/dashboard-M05MmlnoOP", // Dashboard by RAKIBUZZAMAN
    122: "https://lottiefiles.com/free-animation/deliver-better-optimized-lottie-json-animation-Qgvgddnv8J", // Dashboard by Weblodge
    123: "https://lottiefiles.com/free-animation/dashboard-krY5yHjJRp", // DashBoard by Amit Prajapati
    124: "https://lottiefiles.com/free-animation/project-dashboard-PeJUc2p1iB", // Project Dashboard
    125: "https://lottiefiles.com/free-animation/infographics-dashboard-X6P5rVLZAB", // Infographics Dashboard
    126: "https://observablehq.com/@d3/stacked-to-grouped-bars", // Stacked-to-grouped bars
    127: "https://observablehq.com/@d3/streamgraph-transitions", // Streamgraph transitions
    128: "https://observablehq.com/@d3/pie-chart-update", // Pie chart update
    129: "https://observablehq.com/@d3/arc-tween", // Arc tween
    130: "https://observablehq.com/@d3/learn-d3-animation", // Animated line chart lesson
    131: "https://observablehq.com/@d3/transition-end", // Transition end
    132: "https://observablehq.com/@d3/easing-animations", // Easing Animations
    133: "https://observablehq.com/@d3/path-tween", // Path tween
    134: "https://observablehq.com/@d3/shape-tweening", // Shape tweening
    135: "https://motionarray.com/after-effects-templates/timeline/", // Timeline by The Creators
    136: "https://motionarray.com/after-effects-templates/project-timeline-2424919/", // Project TimeLine
    137: "https://motionarray.com/after-effects-templates/corporate-timeline-1939632/", // Corporate Timeline by HenlyFx
    138: "https://motionarray.com/after-effects-templates/scrolling-timeline-1223172/", // Scrolling Timeline
    139: "https://motionarray.com/after-effects-templates/corporate-timeline-255459/", // Corporate Timeline by Zargones
    140: "https://motionarray.com/after-effects-templates/corporate-timeline-77666/", // Corporate Timeline by MotionTores
  };

  // =====================================================================
  // O3a — Drawing a boundary that solves the problem (29 lines, 10 shots). Audit score 4.8 -> rebuilt.
  // The reception-only proposal, the wrong rate that starts upstream, symptom versus cause, the wider journey
  // boundary with its start and end, Reservations' objection, and the documented boundary.
  // =====================================================================
  section("O3a", "Drawing the boundary", 29, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 25, 27], [
    // Template 091 · cro process (LottieFiles) — https://lottiefiles.com/free-animation/cro-process-RaUu5ps2to
    // Adapted: "move across the business steps" -> the chosen card gets its pin, then a CONDITIONAL tag and an empty
    // lens, then two flags with question marks slide along the journey looking for its start and end.
    { ref: U[91], cap: "Guest arrival chosen", n: 3,
      svg: () => hl("h0", "A PROMISING START", C.green) + hl("h1", "STILL CONDITIONAL", C.orange) + hl("h2", "WHERE DOES IT BEGIN?", C.navy) +
        G("cd", 200, 190, R(110, 90, 180, 160, 16, C.paper, C.green, 4) + CAND[0](200, 160, 2) + T2(200, 222, "GUEST", "ARRIVAL", { c: C.green }) + pin(282, 104, 1.1, C.green)) +
        G("cn", 200, 290, pill(200, 296, "CONDITIONAL CHOICE", C.orange)) +
        G("ln", 330, 180, lens(338, 170, 30, C.navy) + qB(338, 170, 14)) +
        G("jr", 200, 230, Pa("M20 230H380", C.navy, 6) + [60, 130, 200, 270, 340].map((x) => Ci(x, 230, 9, C.paper, C.navy, 3)).join("")) +
        Mv("Ms", [[200, 200], [80, 200]], flag(0, 0, 1.2, C.green) + qB(26, -40, 11)) + Mv("Me", [[200, 200], [320, 200]], flag(0, 0, 1.2, C.green) + qB(26, -40, 11)) +
        G("lb", 200, 300, T(94, 300, "STARTS WHERE?", { z: 16, c: C.green }) + T(310, 300, "ENDS WHERE?", { z: 16, c: C.green })),
      steps: ["+h0 +cd", "-h0 +h1 +cn +ln cd.x=-60", "-h1 +h2 -cd -cn -ln +jr +Ms Ms@1 +Me Me@1 +lb"] },

    // Template 099 · Bottling factory (LottieFiles) — https://lottiefiles.com/free-animation/bottling-factory-53Q3SoGu0x
    // Adapted: "advance bottles to the station and hold" -> guests queue at the reception station; the front-desk staff
    // see it every day; a tight dashed box around reception shows why that boundary looks easy to manage.
    { ref: U[99], cap: "Reception only?", n: 3,
      svg: () => hl("h0", "RECEPTION ONLY?", C.orange) + hl("h1", "THEY SEE IT DAILY", C.navy) + hl("h2", "EASIER TO MANAGE", C.green) +
        G("dk", 270, 220, desk(270, 230, 170, C.navy) + person(270, 214, 1.5, C.navy) + scr(330, 196, 50, 36, C.ink) + Pa("M226 196L250 172", C.orange, 5) + clock(330, 120, 18, C.orange, 210)) +
        G("qu", 90, 250, [40, 80, 120, 160].map((x, i) => person(x, 262 - (i % 2) * 4, 1.25, i ? C.navy : C.green)).join("") + T(100, 330, "QUEUES AND DELAYS", { c: C.orange })) +
        G("fm", 90, 140, person(60, 140, 1.6, C.orange) + Pa("M84 130L130 112", C.orange, 5) + T2(90, 196, "FRONT-DESK", "MANAGER", { c: C.orange })) +
        G("st", 270, 214, [244, 296].map((x) => Pa(`M${x} 160l-6 -12M${x + 6} 156l0 -14M${x + 12} 160l6 -12`, C.orange, 3)).join("") + eye(270, 110, 1.6, C.navy) + T(270, 340, "DIRECT EXPERIENCE", { c: C.navy })) +
        G("bx", 270, 220, R(178, 90, 186, 190, 16, "none", C.green, 4, 'stroke-dasharray="9 6"')) +
        ["ORGANISE", "MEASURE", "COMPLETE"].map((s, i) => G("k" + i, 90, 300 + i * 30, okB(30, 300 + i * 30, 11) + T(50, 306 + i * 30, "EASY TO " + s, { a: "start", z: 17, c: C.green }))).join(""),
      steps: ["+h0 +dk +qu +fm", "-h0 +h1 -fm -qu +st", "-h1 +h2 -st -qu +bx +k0 +k1 +k2"] },

    // Template 076 · Workflow Animation (Dribbble) — https://dribbble.com/shots/3791748-Workflow-Animation
    // Adapted: "reveal the action, transfer the trigger, show the notification" -> the booking is made far away, the rate
    // travels to the hotel, the confirmation and the screen disagree, and the receptionist's fix leaves the cause untouched.
    { ref: U[76], cap: "A wrong rate arrives", n: 3,
      svg: () => hl("h0", "IT STARTS BEFORE ARRIVAL", C.orange) + hl("h1", "TWO DIFFERENT RATES", C.orange) + hl("h2", "FIXED, NOT EXPLAINED", C.orange) +
        G("bk", 70, 200, scr(70, 190, 90, 64, C.ink) + cal(70, 186, 0.9, C.navy) + T2(70, 268, "BOOKING", "MADE", { c: C.navy })) +
        Ln("Lp", "M120 190C180 120 240 120 300 180", C.navy, 4, 'stroke-dasharray="8 7"') +
        Mv("Mr", [[120, 190], [210, 140], [300, 180]], coin(0, 0, 12)) +
        G("ht", 320, 200, hotel(330, 196, 2.4, C.navy) + T2(330, 268, "THE HOTEL", "DAYS LATER", { c: C.navy })) +
        G("cf", 200, 220, person(80, 240, 1.8, C.green) + doc(130, 232, 1.4, C.green, 2) + coin(130, 248, 12, C.green) + Gl(200, 228, "≠", 46, C.orange) +
          scr(300, 214, 110, 80, C.ink) + coin(300, 210, 18, C.orange) + T2(130, 310, "CONFIRMED", "RATE", { c: C.green }) + T2(300, 310, "SYSTEM", "RATE", { c: C.orange })) +
        G("fx", 200, 220, person(300, 300, 1.4, C.navy) + Pa("M320 266L346 236", C.navy, 6) + R(342, 222, 16, 16, 3, C.pale, C.navy, 2) + okB(330, 176, 12) +
          scr(80, 150, 90, 64, C.ink) + qB(80, 146, 16) + T2(80, 230, "CAUSE", "UNKNOWN", { c: C.orange }) + T(300, 352, "RATE CORRECTED", { c: C.navy })),
      steps: ["+h0 +bk +Lp +Mr Mr@1 +ht", "-h0 +h1 -bk -Lp -Mr -ht +cf", "-h1 +h2 cf.o=0.2 +fx"] },

    // Template 092 · process connecting (LottieFiles) — https://lottiefiles.com/free-animation/process-fmpDUgNx8K
    // Adapted: "draw and join the connections" -> a spotlight falls on reception where the symptom shows, then a line
    // is drawn back through the departments to where the cause sits.
    { ref: U[92], cap: "Symptom is not cause", n: 2,
      svg: () => hl("h0", "THE SYMPTOM SHOWS HERE", C.orange) + hl("h1", "THE CAUSE SITS ELSEWHERE", C.navy) +
        G("dp", 200, 220, [["RESERVATIONS", JI.book, C.orange], ["REVENUE", JI.rate, C.gold], ["HOUSEKEEPING", JI.room, C.navy], ["RECEPTION", JI.desk, C.green]].map(([s, f, c], i) =>
          R(16 + i * 96, 190, 80, 110, 12, C.pale, c, 3) + Gs(56 + i * 96, 236, 1.6, f(0, 0))).join("") + T(200, 334, "FOUR DEPARTMENTS", { c: C.navy })) +
        G("sp", 344, 150, Fi("M344 60L300 190H388Z", C.gold, 'opacity=".35"') + exB(344, 160, 18) + T2(300, 92, "SYMPTOM", "HERE", { a: "end", c: C.orange })) +
        Ln("Lt", "M336 250C300 160 120 160 60 222", C.navy, 4) + G("cz", 56, 160, lens(56, 160, 22, C.navy) + T2(96, 150, "CAUSE", "UPSTREAM", { a: "start", c: C.navy })),
      steps: ["+h0 +dp +sp", "-h0 +h1 +Lt +cz"] },

    // Template 078 · Data Workflow Animation (Dribbble) — https://dribbble.com/shots/27247003-Data-Workflow-Animation
    // Adapted: "activate nodes and links in sequence" -> the boundary widens to follow the journey across handoffs,
    // then the start event and the end event are planted.
    { ref: U[78], cap: "Follow the journey", n: 3,
      svg: () => {
        const X = [50, 125, 200, 275, 350], Y = 200, ic = [JI.book, JI.rate, JI.room, JI.guest, JI.bill];
        return hl("h0", "A WIDER BOUNDARY", C.green) + hl("h1", "START: BOOKING CONFIRMED", C.green) + hl("h2", "END: FIRST NIGHT BILLED", C.green) +
          Pa(`M${X[0]} ${Y}H${X[4]}`, C.blue, 9) + Ln("Lf", `M${X[0]} ${Y}H${X[4]}`, C.green, 6) +
          X.map((x, i) => G("n" + i, x, Y, node(x, Y, 25, C.navy, Gs(x, Y, 1.3, ic[i](0, 0))))).join("") +
          G("bw", 200, 200, R(18, 150, 364, 100, 50, "none", C.green, 4, 'stroke-dasharray="10 7"') + [88, 162, 238, 312].map((x) => Ci(x, Y, 7, C.gold, C.ink, 2)).join("") + T(200, 290, "ACROSS THE HANDOFFS", { c: C.green })) +
          G("fs", 50, 200, flag(46, 172, 1.2, C.green) + T2(64, 112, "INFORMATION", "AVAILABLE", { z: 17, c: C.green })) +
          G("fe", 350, 200, flag(346, 172, 1.2, C.green) + T2(320, 112, "FIRST NIGHT", "BILLING", { z: 17, c: C.green }));
      },
      steps: ["+h0 +n0 +n1 +n2 +n3 +n4 +Lf +bw", "-h0 +h1 +fs", "-h1 +h2 +fe"] },

    // Template 137 · Corporate Timeline by HenlyFx (Motion Array) — https://motionarray.com/after-effects-templates/corporate-timeline-1939632/
    // Adapted: "reveal events one by one" -> the five functions take their places under the journey, then the whole
    // stay is laid out as a timeline where only the first segment is in scope, and the rest greys out.
    { ref: U[137], cap: "Inside, and outside", n: 3,
      svg: () => hl("h0", "FIVE FUNCTIONS INCLUDED", C.navy) + hl("h1", "A CLEAR DESTINATION", C.green) + hl("h2", "OUTSIDE THIS PROJECT", C.orange) +
        G("fn", 200, 200, [["RESERVATIONS TEAM", JI.book, C.orange], ["REVENUE TEAM", JI.rate, C.gold], ["FRONT DESK", JI.desk, C.green], ["HOUSEKEEPING TEAM", JI.room, C.navy], ["FINANCE TEAM", JI.bill, C.navy]].map(([s, f, c], i) =>
          node(48, 80 + i * 60, 22, c, f(48, 80 + i * 60)) + T(80, 86 + i * 60, s, { a: "start", z: 17, c: C.ink }) + Pa(`M310 ${80 + i * 60}H372`, c, 6)).join("") + R(298, 56, 86, 296, 14, "none", C.green, 3, 'stroke-dasharray="7 5"')) +
        G("tl", 200, 210, Pa("M24 210H376", C.navy, 6) + ["ARRIVE", "", "", "", "LEAVE"].map((d, i) => Ci(40 + i * 80, 210, 10, C.paper, C.navy, 3)).join("") +
          R(24, 180, 104, 60, 14, C.green, "", 0, 'opacity=".25"') + R(24, 180, 104, 60, 14, "none", C.green, 4) + T(76, 160, "THIS PROJECT", { c: C.green }) + T(250, 160, "REST OF THE STAY", { c: C.navy })) +
        G("ou", 250, 280, [["LATER", "SERVICES", JI.desk], ["GUEST", "CHECKOUT", JI.out], ["POST-STAY", "COMPLAINTS", (x, y) => doc(x, y, 0.7, C.orange, 2)]].map(([a, b, f], i) =>
          node([90, 200, 316][i], 280, 20, C.navy, f([90, 200, 316][i], 280)) + noB([106, 216, 332][i], 264, 9) + T2([90, 200, 316][i], 322, a, b, { z: 17, c: C.navy })).join("")),
      steps: ["+h0 +fn", "-h0 +h1 -fn +tl", "-h1 +h2 +ou"] },

    // Template 084 · Process - What is a Motion Designer? (Behance) — https://www.behance.net/gallery/159045079/Process-What-is-a-Motion-Designer-
    // Adapted: "reveal the concept and advance illustrative beats" -> Reservations steps in, plants its flag on booking,
    // the director weighs responsibility and workload, then asks what excluding booking would do to the known problems.
    { ref: U[84], cap: "Reservations objects", n: 4,
      svg: () => hl("h0", "RESERVATIONS CHALLENGES", C.orange) + hl("h1", "\"BOOKING IS OURS\"", C.orange) + hl("h2", "A LEGITIMATE QUESTION", C.navy) + hl("h3", "WOULD EXCLUDING IT WORK?", C.navy) +
        G("rm", 90, 220, person(90, 226, 2.2, C.orange) + Fi("M136 158H156V204H136Z", C.orange) + T2(90, 300, "RESERVATIONS", "MANAGER", { c: C.orange })) +
        G("bn", 280, 200, node(280, 200, 40, C.navy, Gs(280, 200, 2, JI.book(0, 0))) + T2(280, 268, "BOOKING", "CONFIRMATION", { c: C.navy })) +
        G("fl", 300, 170, flag(304, 164, 1.6, C.orange)) +
        G("dr", 200, 200, person(320, 230, 1.8, C.green) + Pa("M290 196Q284 206 290 216", C.green, 3) + T2(320, 300, "PROGRAMME", "DIRECTOR", { c: C.green }) +
          R(155, 120, 10, 140, 3, C.navy) + R(100, 116, 120, 10, 4, C.navy) + T2(130, 92, "RESPONSIBILITY,", "WORKLOAD", { z: 17, c: C.navy })) +
        G("ex", 200, 210, node(110, 170, 36, C.navy, Gs(110, 170, 1.8, JI.book(0, 0))) + noB(140, 140, 14) + arr(160, 170, 220, 170, C.navy, 4) +
          R(230, 90, 150, 180, 12, C.paper, C.orange, 3) + [0, 1, 2].map((i) => noB(256, 130 + i * 48, 11) + Pa(`M276 ${130 + i * 48}H360`, C.ink, 3)).join("") + T2(305, 300, "DOCUMENTED", "PROBLEMS STAY", { z: 17, c: C.orange })),
      steps: ["+h0 +rm", "-h0 +h1 +bn +fl", "-h1 +h2 -bn -fl rm.o=0.35 +dr", "-h2 +h3 -rm -dr +ex"] },

    // Template 126 · Stacked-to-grouped bars (Observable) — https://observablehq.com/@d3/stacked-to-grouped-bars
    // Adapted: "reposition the bars, preserving identity" -> Reservations' activities are a stack; only the booking
    // handoff layer moves across into the project group; then coverage and capacity are weighed.
    { ref: U[126], cap: "Handoff, not department", n: 3,
      svg: () => hl("h0", "EVIDENCE, NOT TERRITORY", C.green) + hl("h1", "ONE HANDOFF, NOT ALL", C.green) + hl("h2", "COVERAGE AND CAPACITY", C.navy) +
        G("ev", 200, 200, flag(110, 230, 2, C.orange) + noB(140, 150, 16) + arr(170, 200, 220, 200, C.green, 4) + doc(290, 196, 2.6, C.green, 4) + T2(290, 290, "WHAT THE", "EVIDENCE SAYS", { c: C.green })) +
        G("st", 110, 220, [0, 1, 2, 3, 4].map((i) => G("s" + i, 110, 120 + i * 50, R(30, 100 + i * 50, 160, 40, 9, i ? C.pale : C.paper, i ? C.navy : C.green, i ? 2 : 3.5))).join("") +
          Pa("M56 170H160M56 220H140M56 270H160M56 320H130", C.navy, 4, 'opacity=".35"') + T2(110, 64, "RESERVATIONS", "ACTIVITIES", { z: 17, c: C.orange })) +
        G("hf", 110, 120, T(110, 126, "BOOKING HANDOFF", { z: 17, c: C.green })) +
        G("pj", 300, 200, R(226, 120, 156, 200, 16, C.pale, C.green, 3.5, 'stroke-dasharray="9 6"') + CAND[0](304, 260, 1.4) + T2(304, 340, "ARRIVAL", "PROJECT", { c: C.green })) +
        G("sc", 200, 210, R(194, 120, 12, 160, 4, C.navy) + R(150, 276, 100, 12, 6, C.navy) + R(64, 114, 272, 12, 6, C.navy) +
          [0, 1, 2].map((i) => R(78 + i * 24, 92, 20, 20, 3, C.green)).join("") + T2(110, 164, "PROBLEM", "COVERAGE", { c: C.green }) +
          person(290, 96, 0.9, C.navy) + person(318, 96, 0.9, C.navy) + T2(300, 164, "DELIVERY", "CAPACITY", { c: C.navy })),
      steps: ["+h0 +ev", "-h0 +h1 -ev +st +s0 +s1 +s2 +s3 +s4 +hf +pj hf.x=192 hf.y=40 s0.x=192 s0.y=40", "-h1 +h2 -st -hf -pj +sc"] },

    // Template 133 · Path tween (Observable) — https://observablehq.com/@d3/path-tween
    // Adapted: "morph one path into another" -> a boundary lasso too tight around reception and one too loose around the
    // whole stay, then the lasso settles on the meaningful, manageable shape.
    { ref: U[133], cap: "Neither narrow nor broad", n: 2,
      svg: () => {
        const X = [40, 110, 180, 250, 320, 370];
        return hl("h0", "TOO NARROW, TOO BROAD", C.orange) + hl("h1", "MEANINGFUL AND MANAGEABLE", C.green) +
          Pa("M20 200H384", C.blue, 8) + G("nd", 200, 200, X.map((x, i) => Ci(x, 200, 14, i < 5 ? C.paper : C.pale, i < 5 ? C.navy : C.blue, 3)).join("")) +
          G("na", 180, 200, R(156, 176, 48, 48, 18, "none", C.orange, 4, 'stroke-dasharray="7 5"') + T2(180, 120, "TREATS", "SYMPTOMS", { c: C.orange })) +
          G("br", 200, 200, R(14, 160, 376, 80, 34, "none", C.orange, 4, 'stroke-dasharray="7 5"') + person(330, 300, 1.4, C.navy) + Pa("M310 266l-6 -10M330 262v-12M350 266l6 -10", C.orange, 3) + T2(250, 320, "TEAM", "OVERWHELMED", { a: "end", c: C.orange })) +
          G("ok", 200, 200, R(18, 164, 324, 72, 30, C.green, "", 0, 'opacity=".12"') + R(18, 164, 324, 72, 30, "none", C.green, 5) + T2(180, 290, "CAUSES COVERED,", "CAPACITY PROTECTED", { c: C.green }));
      },
      steps: ["+h0 +nd +na +br", "-h0 +h1 -na -br +ok"] },

    // Template 095 · contract process (LottieFiles) — https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8
    // Adapted: "reveal the proposal and the agreement" -> the boundary record fills five rows, the steering group's
    // discuss, challenge and approve marks land on it, then the people whose commitment matters gather round.
    { ref: U[95], cap: "Document the boundary", n: 3,
      svg: () => hl("h0", "THE BOUNDARY RECORD", C.green) + hl("h1", "DISCUSS, CHALLENGE, APPROVE", C.navy) + hl("h2", "WHO MUST COMMIT?", C.orange) +
        G("rc", 160, 200, R(20, 56, 270, 300, 14, C.paper, C.green, 3.5) + ["START EVENT", "END EVENT", "HANDOFFS INCLUDED", "EXCLUSIONS LISTED", "OPEN ASSUMPTIONS"].map((s, i) =>
          okB(50, 98 + i * 56, 13) + T(74, 104 + i * 56, s, { a: "start", z: 17, c: C.ink })).join("")) +
        G("cm", 340, 200, [["DISCUSS", "IT", C.navy], ["CHALLENGE", "IT", C.orange], ["APPROVE", "IT", C.green]].map(([a, b, c], i) => bub(342, 100 + i * 90, 100, 56, c) + T2(342, 96 + i * 90, a, b, { z: 17, c })).join("")) +
        G("pp", 200, 250, [60, 130, 200, 270, 340].map((x, i) => person(x, 300, 1.4, [C.gold, C.green, C.orange, C.navy, C.green][i]) + qB(x, 250, 11)).join("")),
      steps: ["+h0 +rc", "-h0 +h1 +cm", "-h1 +h2 -cm -rc +pp"] }
  ]);

  // =====================================================================
  // O3b — The people who can make the project succeed (29 lines, 10 shots). Audit score 4.3 -> rebuilt.
  // Named Qasr stakeholders are placed in their own quadrant shots (sponsor, finance director, owner, legal team,
  // front-desk staff, external auditor), then sponsor versus owner, front-line knowledge and the coalition.
  // =====================================================================
  const miniMap = (x, y, hi, c) => [0, 1, 2, 3].map((q) => R(x + (q % 2) * 48, y + Math.floor(q / 2) * 48, 44, 44, 6, q === hi ? c : C.pale, q === hi ? c : C.navy, 2)).join("") +
    arr(x - 8, y + 96, x - 8, y - 6, C.navy, 2.5) + arr(x - 8, y + 100, x + 100, y + 100, C.navy, 2.5);
  section("O3b", "People who make it work", 29, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28], [
    // Template 082 · Motion Design Process (Behance) — https://www.behance.net/gallery/53752435/Motion-Design-Process
    // Adapted: "show production stages and the team working on them" -> the approved diagram sits above closed
    // department doors; then the project bar crosses four columns where each manager sees it from a different place.
    { ref: U[82], cap: "Diagram versus support", n: 3,
      svg: () => hl("h0", "DIAGRAMS DON'T COOPERATE", C.orange) + hl("h1", "DIFFERENT POSITIONS", C.navy) + hl("h2", "WORRY AND HOPE", C.navy) +
        G("sh", 200, 100, R(96, 58, 208, 86, 10, C.paper, C.navy, 3) + [0, 1, 2, 3, 4].map((i) => Ci(126 + i * 37, 106, 9, C.green)).join("") +
          Pa("M126 106H274", C.green, 3) + brk(114, 286, 82, C.green, 3)) +
        G("dr", 200, 250, [JI.book, JI.rate, JI.desk, JI.room].map((f, i) => R(36 + i * 88, 178, 64, 118, 8, C.pale, CCOL[i], 3) +
          Ci(88 + i * 88, 240, 4, C.navy) + Gs(68 + i * 88, 160, 1.2, f(0, 0)) + lockI(68 + i * 88, 256, 0.8, C.navy)).join("") + T(200, 336, "DOORS STILL CLOSED", { c: C.orange })) +
        G("cols", 200, 210, [0, 1, 2, 3].map((i) => R(22 + i * 92, 66, 80, 290, 10, C.pale, CCOL[i], 2)).join("")) +
        Ln("Lp", "M14 214H386", C.green, 10) +
        G("m0", 62, 150, person(62, 156, 1.45, C.orange) + eye(62, 196, 0.8, C.orange)) + G("m1", 154, 280, person(154, 282, 1.45, C.gold) + eye(154, 240, 0.8, C.gold)) +
        G("m2", 246, 150, person(246, 156, 1.45, C.navy) + eye(246, 196, 0.8, C.navy)) + G("m3", 338, 280, person(338, 282, 1.45, C.green) + eye(338, 240, 0.8, C.green)) +
        G("bw", 92, 96, bub(92, 96, 150, 42, C.orange, C.paper, -1) + T(92, 102, "MORE WORK?", { c: C.orange })) +
        G("bh", 300, 96, bub(300, 96, 168, 54, C.green, C.paper, -1) + T2(300, 92, "FEWER", "FRUSTRATIONS", { z: 17, c: C.green })),
      steps: [
        "+h0 +sh +dr",
        "-h0 +h1 -sh -dr +cols +Lp +m0 +m1 +m2 +m3",
        "-h1 +h2 +bw +bh m1.o=0.3 m3.o=0.3"] },

    // Template 084 · Process - What is a Motion Designer? (Behance) — https://www.behance.net/gallery/159045079/Process-What-is-a-Motion-Designer-
    // Adapted: "reveal the concept and advance illustrative beats" -> four short vignettes: the director reads each
    // position, the approval stamp fails to move people, the two-way definition, then decisions versus knowledge.
    { ref: U[84], cap: "Who is a stakeholder", n: 4,
      svg: () => hl("h0", "UNDERSTAND POSITIONS FIRST", C.green) + hl("h1", "APPROVAL IS NOT SUPPORT", C.orange) + hl("h2", "WHAT A STAKEHOLDER IS", C.navy) + hl("h3", "DECISIONS AND KNOWLEDGE", C.navy) +
        G("v0", 200, 180, [[80, C.orange, (x, y) => R(x - 10, y - 8, 20, 16, 3, C.ink)], [200, C.navy, (x, y) => star(x, y, 10)], [320, C.gold, (x, y) => Gl(x, y + 7, "?", 22, C.navy)]].map(([x, c, f]) =>
          person(x, 160, 1.4, c) + cloud(x, 96, 0.7, C.paper, c) + f(x, 96)).join("") + person(200, 314, 1.6, C.green) + T(200, 368, "PROGRAMME DIRECTOR", { z: 17, c: C.green })) +
        Mv("Ml", [[80, 96], [200, 96], [320, 96]], lens(0, 0, 26, C.green)) +
        G("v1", 200, 200, doc(200, 150, 2.2, C.navy, 4) + G("stamp", 200, 170, R(122, 152, 156, 40, 8, C.paper, C.green, 4) + T(200, 179, "PLAN APPROVED", { z: 19, c: C.green })) +
          [70, 200, 330].map((x, i) => person(x, 318, 1.2, [C.orange, C.navy, C.gold][i]) + noB(x + 20, 290, 11)).join("") +
          arr(170, 236, 90, 280, C.navy, 3, 'stroke-dasharray="5 5"') + arr(230, 236, 310, 280, C.navy, 3, 'stroke-dasharray="5 5"')) +
        G("v2", 200, 200, Ci(200, 196, 48, C.paper, C.green, 4) + CAND[0](200, 198, 1.2) + person(60, 204, 1.7, C.navy) + person(340, 204, 1.7, C.orange) +
          arr(92, 196, 146, 196, C.navy, 4) + arr(254, 196, 308, 196, C.orange, 4) + T(118, 146, "CAN INFLUENCE", { c: C.navy }) + T(286, 146, "IS AFFECTED", { c: C.orange })) +
        G("v3", 200, 290, keyI(60, 312, 1.4) + T2(60, 254, "CONTROLS", "DECISIONS", { c: C.navy }) + book(340, 314, 1.3, C.navy) + T2(340, 254, "HOLDS", "KNOWLEDGE", { c: C.orange })),
      steps: [
        "+h0 +v0 +Ml Ml@1",
        "-h0 +h1 -v0 -Ml +v1 stamp.r=-6",
        "-h1 +h2 -v1 +v2",
        "-h2 +h3 +v3"] },

    // Template 110 · Animated quadtree (Observable) — https://observablehq.com/@d3/animated-quadtree
    // Adapted: "add a point, subdivide the region, repeat" -> named stakeholders drop onto the influence-interest
    // plane, then the plane subdivides into four regions, each with its own way of engaging people.
    { ref: U[110], cap: "Influence and interest", n: 2,
      svg: () => hl("h0", "PLACE EVERY STAKEHOLDER", C.navy) + hl("h1", "FOUR ENGAGEMENT APPROACHES", C.navy) +
        G("ax", 200, 200, arr(40, 336, 40, 70, C.navy, 3.5) + arr(40, 336, 384, 336, C.navy, 3.5) + T(52, 66, "MORE INFLUENCE", { a: "start", z: 17, c: C.navy }) + T(380, 362, "MORE INTEREST", { a: "end", z: 17, c: C.navy })) +
        G("qd", 212, 204, R(46, 76, 164, 124, 8, C.gold, "", 0, 'fill-opacity=".16"') + R(214, 76, 164, 124, 8, C.green, "", 0, 'fill-opacity=".16"') +
          R(46, 204, 164, 124, 8, C.navy, "", 0, 'fill-opacity=".08"') + R(214, 204, 164, 124, 8, C.orange, "", 0, 'fill-opacity=".12"') +
          T(128, 104, "KEEP SATISFIED", { z: 17, c: C.ink }) + T(296, 104, "MANAGE CLOSELY", { z: 17, c: C.green }) +
          T(128, 320, "MONITOR ONLY", { z: 17, c: C.navy }) + T(296, 320, "KEEP INFORMED", { z: 17, c: C.orange }) +
          env(128, 150, 1.1, C.gold) + person(282, 158, 0.8, C.green) + person(310, 158, 0.8, C.green) + eye(128, 268, 1.3, C.navy) + bub(296, 262, 54, 34, C.orange)) +
        [[300, 126, C.gold, "S"], [344, 166, C.navy, "F"], [256, 166, C.green, "O"], [96, 136, C.navy, "L"], [330, 262, C.orange, "D"], [110, 290, C.navy, "A"]].map(([x, y, c, k]) =>
          G("p" + k, x, y, Ci(x, y, 13, c, C.paper, 3) + Gl(x, y + 6, k, 15, C.paper))).join(""),
      steps: [
        "+h0 +ax +pS +pF +pO +pL +pD +pA",
        "-h0 +h1 +qd pS.o=0.25 pF.o=0.25 pO.o=0.25 pL.o=0.25 pD.o=0.25 pA.o=0.25"] },

    // Template 120 · Animated Dashboards (LottieFiles) — https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ
    // Adapted: "transition between dashboard panels" -> the mini-map highlights one panel and the full panel opens:
    // three reserved seats at the decision table fill with the sponsor, the finance director and the process owner.
    { ref: U[120], cap: "Manage closely", n: 2,
      svg: () => hl("h0", "HIGH INFLUENCE, HIGH INTEREST", C.green) + hl("h1", "MANAGE CLOSELY", C.green) +
        G("mm", 70, 104, miniMap(24, 56, 1, C.green)) +
        [0, 1, 2].map((i) => G("e" + i, 172, 104 + i * 76, chairE(172, 112 + i * 76, 1, C.navy) + R(204, 92 + i * 76, 184, 26, 8, "none", C.navy, 2, 'stroke-dasharray="5 5"'))).join("") +
        G("s0", 172, 104, person(172, 112, 1.3, C.gold) + crown(172, 80, 0.75) + T(200, 112, "EXECUTIVE SPONSOR", { a: "start", z: 16, c: C.ink })) +
        G("s1", 172, 180, person(172, 188, 1.3, C.navy) + coin(192, 164, 8) + T(200, 188, "FINANCE DIRECTOR", { a: "start", c: C.ink })) +
        G("s2", 172, 256, person(172, 264, 1.3, C.green) + gear(194, 238, 7, C.navy) + T(200, 264, "PROCESS OWNER", { a: "start", c: C.ink })) +
        G("dz", 200, 336, doc(48, 336, 0.9, C.navy, 2) + pill(200, 338, "IMPORTANT DECISIONS", C.navy) + doc(352, 336, 0.9, C.navy, 2)) +
        G("db", 200, 336, R(58, 316, 284, 44, 22, C.green) + T(200, 344, "SCOPE AND BENEFITS", { c: C.paper, nh: true })),
      steps: ["+h0 +mm +e0 +e1 +e2 +dz", "-h0 +h1 -e0 -e1 -e2 +s0 +s1 +s2 -dz +db"] },

    // Template 114 · Infographics Pack by JVARTS STUDIO (Motion Array) — https://motionarray.com/after-effects-templates/infographics-pack-100132/
    // Adapted: "reveal the selected metric element" -> the keep-satisfied panel: an influential person whose key
    // opens a barrier only when one appears, then the legal team receiving short, occasional updates.
    { ref: U[114], cap: "Keep satisfied", n: 2,
      svg: () => hl("h0", "AUTHORITY WHEN NEEDED", C.gold) + hl("h1", "LEGAL TEAM: KEEP SATISFIED", C.navy) +
        G("mm", 70, 104, miniMap(24, 56, 0, C.gold)) +
        Pa("M20 290H380", C.blue, 14) + Ln("Lr", "M20 290H240", C.green, 6) +
        G("tm", 70, 284, person(70, 270, 1, C.green)) +
        G("wl", 266, 290, wall(250, 252, 36, 76, C.orange)) +
        G("vip", 300, 150, person(300, 156, 1.7, C.gold) + Ci(300, 150, 42, "none", C.gold, 3, 'stroke-dasharray="6 5"') + keyI(344, 196, 1.1)) +
        Ln("Lk", "M340 206Q320 240 290 256", C.gold, 3, 'stroke-dasharray="5 5"') +
        G("lg", 300, 160, person(310, 166, 1.7, C.navy) + Gs(350, 128, 1, Pa("M0 -12V12M-12 -6H12", C.navy, 2.5) + Pa("M-12 -6L-16 4H-8ZM12 -6L8 4H16Z", C.navy, 2)) + T2(310, 230, "LEGAL", "TEAM", { c: C.navy })) +
        [0, 1, 2].map((i) => Mv("Me" + i, [[40, 330 - i * 0], [250, 196]], env(0, 0, 0.7, C.navy))).join("") +
        G("lb", 120, 356, T(120, 360, "CONCISE UPDATES", { c: C.navy }) + cal(250, 352, 0.7, C.navy) + T(272, 360, "NOT DAILY", { a: "start", c: C.navy })),
      steps: [
        "+h0 +mm +Lr +tm +wl +vip +Lk",
        "-h0 +h1 -vip -Lk -wl -Lr -tm +lg +Me0 Me0@1 +Me1 Me1@0.55 +Me2 Me2@0.12 +lb"] },

    // Template 123 · DashBoard by Amit Prajapati (LottieFiles) — https://lottiefiles.com/free-animation/dashboard-krY5yHjJRp
    // Adapted: "bring the dashboard screen into focus" -> the keep-informed panel: interested staff receive
    // information and raise hands to contribute; then the front-desk staff test both the current and the new process.
    { ref: U[123], cap: "Keep informed", n: 2,
      svg: () => hl("h0", "HIGH INTEREST, LESS AUTHORITY", C.orange) + hl("h1", "FRONT DESK: CONSULT, TEST", C.orange) +
        G("mm", 70, 104, miniMap(24, 56, 3, C.orange)) +
        G("st", 250, 230, [180, 250, 320].map((x, i) => person(x, 240, 1.5, i === 1 ? C.navy : C.orange)).join("") + Pa("M330 206L346 168", C.orange, 5) +
          bub(190, 140, 64, 40, C.navy) + Gl(190, 150, "i", 26, C.navy) + T(250, 320, "INFORMATION SHARED", { c: C.navy }) + T(250, 352, "CHANCES TO CONTRIBUTE", { c: C.orange })) +
        G("ts", 250, 240, person(70, 260, 1.6, C.orange) + bell(70, 318, 1, C.gold) +
          R(140, 150, 236, 70, 12, C.paper, C.navy, 3) + T(152, 176, "CURRENT PROCESS", { a: "start", z: 17, c: C.navy }) + [0, 1, 2, 3].map((i) => Ci(170 + i * 50, 200, 8, C.navy)).join("") +
          R(140, 248, 236, 70, 12, C.paper, C.green, 3) + T(152, 274, "PROPOSED CHANGES", { a: "start", z: 17, c: C.green }) + [0, 1, 2].map((i) => Ci(170 + i * 66, 298, 8, C.green)).join("") + Pa("M170 200H320M170 298H302", C.navy, 2)) +
        G("t1", 360, 200, okB(358, 166, 13)) + G("t2", 360, 296, okB(358, 264, 13)),
      steps: ["+h0 +mm +st", "-h0 +h1 -st +ts +t1 +t2"] },

    // Template 130 · Animated line chart lesson (Observable) — https://observablehq.com/@d3/learn-d3-animation
    // Adapted: "trace a time series left to right" -> as the project timeline advances, the external auditor's
    // position is traced across the map; the map then refuses verdict stickers and turns into an engagement plan.
    { ref: U[130], cap: "Monitor, then review", n: 4,
      svg: () => hl("h0", "LOW AND LOW: MONITOR", C.navy) + hl("h1", "POSITIONS CAN CHANGE", C.orange) + hl("h2", "NO VERDICTS ON PEOPLE", C.navy) + hl("h3", "A BASIS FOR ENGAGEMENT", C.green) +
        G("map", 120, 170, [0, 1, 2, 3].map((q) => R(20 + (q % 2) * 104, 64 + Math.floor(q / 2) * 104, 100, 100, 8, [C.gold, C.green, C.navy, C.orange][q], "", 0, `fill-opacity="${q === 2 ? 0.18 : 0.1}"`)).join("") +
          arr(14, 274, 14, 62, C.navy, 2.5) + arr(14, 274, 232, 274, C.navy, 2.5) + env(70, 112, 0.9, C.gold) + person(164, 118, 0.6, C.green) + person(186, 118, 0.6, C.green) + eye(70, 216, 0.9, C.navy) + bub(176, 214, 40, 26, C.orange)) +
        G("ey", 300, 170, eye(300, 160, 2.6, C.navy) + T2(300, 216, "WATCH, NOT", "INTENSIVE", { c: C.navy })) +
        Mv("Ma", [[70, 238], [70, 200], [72, 150], [74, 110]], Ci(0, 0, 14, C.navy, C.paper, 3) + Gl(0, 6, "A", 15, C.paper)) +
        Ln("Lat", "M70 238C70 200 72 150 74 110", C.navy, 3, 'stroke-dasharray="4 5"') +
        G("tl", 200, 330, Pa("M30 330H370", C.navy, 4) + [30, 150, 270, 370].map((x) => Ci(x, 330, 6, C.navy)).join("") + T(270, 362, "AUDITED WORK", { c: C.orange }) + T(30, 362, "PROJECT START", { a: "start", c: C.navy })) +
        Mv("Mt", [[30, 316], [270, 316]], Fi("M0 8L-8 -6H8Z", C.orange)) +
        G("au", 310, 130, T2(310, 116, "EXTERNAL", "AUDITOR", { c: C.navy }) + cab(310, 196, 0.9, C.navy)) +
        G("sk", 314, 190, [["GOOD", "PERSON?"], ["DIFFICULT", "PERSON?"], ["PERSONALLY", "SUPPORTIVE?"]].map(([a, b], i) => { const y = 106 + i * 74;
          return R(240, y - 30, 150, 60, 10, C.paper, C.orange, 3, 'stroke-dasharray="6 4"') + T2(315, y - 4, a, b, { z: 17, c: C.orange }) + Pa(`M246 ${y + 22}L384 ${y - 22}`, C.orange, 3.5); }).join("")) +
        G("pl", 310, 200, R(244, 86, 146, 198, 12, C.paper, C.green, 3) + T2(317, 118, "HOW TO", "COMMUNICATE", { z: 17, c: C.green }) + T2(317, 188, "HOW TO", "INVOLVE", { z: 17, c: C.green }) +
          Pa("M262 236H372M262 256H350", C.green, 3) + arr(232, 170, 250, 170, C.green, 3)),
      steps: [
        "+h0 +map +ey +Ma Ma@0",
        "-h0 +h1 -ey +tl +Mt Mt@1 Ma@1 +Lat +au",
        "-h1 +h2 -tl -Mt -au +sk",
        "-h2 +h3 -sk +pl"] },

    // Template 136 · Project TimeLine (Motion Array) — https://motionarray.com/after-effects-templates/project-timeline-2424919/
    // Adapted: "advance along time markers" -> sponsor and owner side by side, the sponsor's shield over the
    // project, then the timeline runs past the project's end with only the owner still on it, and benefits fade without one.
    { ref: U[136], cap: "Sponsor and owner", n: 4,
      svg: () => hl("h0", "TWO DIFFERENT ROLES", C.navy) + hl("h1", "SPONSOR PROTECTS THE PROJECT", C.gold) + hl("h2", "OWNER STAYS ACCOUNTABLE", C.green) + hl("h3", "NOBODY SUSTAINS BENEFITS", C.orange) +
        G("sp", 104, 126, person(104, 132, 1.7, C.gold) + crown(104, 89, 1.05) + T2(104, 186, "EXECUTIVE", "SPONSOR", { c: C.ink })) +
        G("ow", 296, 126, person(296, 132, 1.7, C.green) + gear(330, 96, 10, C.navy) + T2(296, 186, "PROCESS", "OWNER", { c: C.ink })) +
        G("pr", 200, 296, R(150, 266, 100, 60, 10, C.paper, C.navy, 3) + CAND[0](200, 298, 1) + Ci(200, 296, 70, "none", C.gold, 5, 'stroke-dasharray="9 6"') +
          arr(40, 300, 116, 300, C.orange, 4) + arr(360, 290, 284, 290, C.orange, 4) + noB(116, 274, 11) + noB(284, 266, 11)) +
        G("tl", 200, 300, Pa("M24 312H380", C.navy, 4) + R(24, 286, 190, 20, 6, C.orange) + T(118, 272, "IMPROVEMENT PROJECT", { z: 17, c: C.orange }) +
          Pa("M214 278V322", C.ink, 3) + T(300, 352, "AFTER THE PROJECT", { z: 17, c: C.green })) +
        Mv("Mo", [[214, 330], [370, 330]], person(0, -16, 0.7, C.green) + gear(14, -32, 5, C.navy)) +
        G("gr", 200, 300, Pa("M24 352H380M24 352V250", C.navy, 3) + Pa("M24 340L120 300L200 270", C.green, 4) + T(98, 266, "CHANGES MADE", { z: 17, c: C.green })) +
        Ln("Ld", "M200 270Q280 280 376 344", C.orange, 4, 'stroke-dasharray="8 6"') +
        G("x", 300, 260, person(300, 250, 1, C.navy) + noB(318, 228, 11)),
      steps: [
        "+h0 +sp +ow",
        "-h0 +h1 +pr ow.o=0.3",
        "-h1 +h2 -pr ow.o=1 sp.o=0.3 +tl +Mo Mo@1",
        "-h2 +h3 -tl -Mo +gr +Ld +x ow.o=0.3"] },

    // Template 081 · Clean Workflow Visualization with Motion Graphics (Dribbble) — https://dribbble.com/shots/27600376-Clean-Workflow-Visualization-with-Motion-Graphics
    // Adapted: "connect journey steps with transitions" -> four front-line experts each own one step of the journey,
    // the written procedure is laid against the real path, and the guest's view is added as its own step.
    { ref: U[81], cap: "Front-line knowledge", n: 3,
      svg: () => hl("h0", "WHO KNOWS THE WORK", C.navy) + hl("h1", "PROCEDURE VERSUS REALITY", C.orange) + hl("h2", "THE GUEST'S VIEW MATTERS", C.green) +
        [[["BOOKING", "ERRORS"], JI.book, C.orange], [["ROOM", "READINESS"], JI.room, C.navy], [["CHECK-IN", "EXCEPTIONS"], JI.key, C.green], [["BILLING", "HANDOFFS"], JI.bill, C.gold]].map(([l, f, c], i) => {
          const x = i % 2 ? 212 : 12, y = i < 2 ? 100 : 230;
          return G("e" + i, x + 80, y + 40, R(x, y, 176, 104, 14, C.paper, c, 3) + person(x + 34, y + 56, 1.15, c) + Gs(x + 34, y + 18, 1.1, f(0, 0)) + T2(x + 66, y + 48, l[0], l[1], { a: "start", z: 17, c: C.ink }));
        }).join("") +
        G("pd", 200, 200, doc(56, 120, 1.4, C.navy, 4) + T(84, 92, "WRITTEN PROCEDURE", { a: "start", c: C.navy }) + Pa("M90 140H360", C.navy, 4) + arr(340, 140, 370, 140, C.navy, 4)) +
        Ln("Lre", "M90 250C140 200 170 320 220 250S300 190 370 260", C.orange, 5) +
        G("rl", 200, 300, T(200, 330, "WHAT REALLY HAPPENS", { c: C.orange }) + person(56, 262, 1.3, C.orange) + bub(56, 200, 52, 34, C.orange) + Gl(56, 208, "…", 20, C.orange)) +
        G("gv", 200, 220, gear(110, 176, 30, C.navy) + T(110, 250, "FASTER INSIDE", { c: C.navy }) + arr(160, 176, 236, 176, C.navy, 4) +
          face(290, 176, 34, C.orange, -1) + T(290, 250, "WORSE FOR GUEST", { c: C.orange }) + person(200, 314, 1.3, C.green) + flag(226, 300, 1, C.green) + T(200, 368, "CUSTOMER VOICE", { c: C.green })),
      steps: [
        "+h0 +e0 +e1 +e2 +e3",
        "-h0 +h1 -e0 -e1 -e2 -e3 +pd +Lre +rl",
        "-h1 +h2 -pd -Lre -rl +gv"] },

    // Template 134 · Shape tweening (Observable) — https://observablehq.com/@d3/shape-tweening
    // Adapted: "transform a source polygon to a target" -> three corners (authority, knowledge, customer) are joined
    // into one triangle, the triangle keeps circulating, then splits along the line of a coming disagreement.
    { ref: U[134], cap: "Building the coalition", n: 3,
      svg: () => hl("h0", "CONNECT THE THREE", C.green) + hl("h1", "MANAGE IT THROUGHOUT", C.navy) + hl("h2", "WHEN THEY DISAGREE", C.orange) +
        G("c0", 200, 96, person(200, 104, 1.5, C.gold) + crown(200, 66, 0.95) + T2(244, 92, "DECISION", "AUTHORITY", { a: "start", c: C.ink })) +
        G("c1", 70, 280, book(70, 282, 1.4, C.navy) + T2(80, 326, "OPERATIONAL", "KNOWLEDGE", { c: C.ink })) +
        G("c2", 330, 280, person(330, 286, 1.4, C.green) + suit(354, 296, 0.7) + T2(320, 326, "CUSTOMER", "EXPERIENCE", { c: C.ink })) +
        Ln("Lt", "M200 136L104 268M120 286H290M300 268L214 136", C.green, 5) +
        G("pl", 200, 222, pill(200, 222, "ENGAGEMENT PLAN", C.green, C.green)) +
        G("rg", 200, 222, El(200, 222, 124, 40, "none", C.navy, 4, 'class="vlw-flow"') + arr(300, 192, 312, 197, C.navy, 3.5) + arr(100, 252, 88, 247, C.navy, 3.5)) +
        G("cf", 200, 220, person(120, 236, 1.8, C.orange) + person(280, 236, 1.8, C.navy) + Fi("M210 190L188 226H204L190 262L220 218H204L216 190Z", C.orange, 'class="vlw-blink"') +
          T(200, 316, "SCOPE AND ROLES", { c: C.navy })),
      steps: [
        "+h0 +c0 +c1 +c2 +Lt +pl",
        "-h0 +h1 +rg",
        "-h1 +h2 -rg -c0 -c1 -c2 -Lt -pl +cf"] }
  ]);

  // =====================================================================
  // O3c — Turning disagreement into an agreed commitment (30 lines, 10 shots). Audit score 4.2 -> rebuilt.
  // Every move in the dispute gets its own picture: the two positions, the two weak responses (an order,
  // a removal), tracing the handoff, joint ownership, the other functions, escalation, objections, the record.
  // =====================================================================
  section("O3c", "Disagreement to commitment", 30, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28], [
    // Template 111 · Hierarchy traversal animated (Observable) — https://old.observablehq.com/@d3/hierarchy-traversal-animated
    // Adapted: "visit one node then the next" -> the camera visits the director, then Reservations, then the front desk,
    // each node lighting up with its own position.
    { ref: U[111], cap: "Two managers disagree", n: 3,
      svg: () => hl("h0", "A DISAGREEMENT SURFACES", C.orange) + hl("h1", "RESERVATIONS QUESTIONS SCOPE", C.orange) + hl("h2", "THE FRONT DESK'S POINT", C.navy) +
        G("dir", 200, 90, person(200, 88, 1.45, C.green) + T(200, 136, "PROGRAMME DIRECTOR", { c: C.green })) +
        Ln("Lt1", "M150 146L120 200", C.navy, 2.5, 'stroke-dasharray="4 5"') + Ln("Lt2", "M250 146L280 200", C.navy, 2.5, 'stroke-dasharray="4 5"') +
        G("res", 80, 252, person(80, 256, 1.9, C.orange) + T2(80, 316, "RESERVATIONS", "MANAGER", { c: C.orange })) +
        G("fd", 320, 252, person(320, 256, 1.9, C.navy) + T2(320, 316, "FRONT-DESK", "MANAGER", { c: C.navy })) +
        G("bolt", 200, 250, Fi("M210 214L186 252H204L190 290L222 244H204L218 214Z", C.orange, 'class="vlw-blink"')) +
        G("bk", 152, 236, cal(152, 238, 0.85, C.navy)) + G("ln", 120, 200, lens(150, 232, 22, C.green)) +
        G("bq", 90, 184, bub(90, 186, 164, 40, C.orange, C.paper, 1) + T(90, 192, "WHY OUR WORK?", { z: 17, c: C.orange })) +
        Mv("Mr", [[152, 236], [200, 206], [258, 232]], coin(0, 0, 11)) +
        G("ba", 306, 184, bub(306, 186, 176, 54, C.navy) + T2(306, 182, "ERRORS ARRIVE", "FROM UPSTREAM", { z: 17, c: C.navy })) +
        G("ex", 268, 214, exB(268, 214, 12)),
      steps: [
        "+h0 +dir +res +fd +bolt",
        "-h0 +h1 +Lt1 +bk +ln +bq ~bolt",
        "-h1 +h2 -ln +Mr Mr@1 +ba +ex"] },

    // Template 092 · process connecting (LottieFiles) — https://lottiefiles.com/free-animation/process-fmpDUgNx8K
    // Adapted: "draw and join connections" -> both concerns stay standing (each gets a check), then a connection is
    // drawn straight through the walls that separate the departments.
    { ref: U[92], cap: "Both have a point", n: 2,
      svg: () => hl("h0", "BOTH CONCERNS ARE LEGITIMATE", C.green) + hl("h1", "COOPERATE ACROSS WALLS", C.green) +
        G("pref", 200, 82, star(130, 84, 16) + T(146, 90, "DIRECTOR'S PREFERENCE", { a: "start", z: 17, c: C.gold })) +
        G("cA", 104, 200, bub(104, 196, 176, 96, C.orange, C.paper, 1) + person(54, 196, 1, C.orange) + T2(124, 190, "MORE", "WORKLOAD", { c: C.orange }) + okB(176, 152, 15)) +
        G("cB", 296, 200, bub(296, 196, 176, 96, C.navy, C.paper, -1) + person(246, 196, 1, C.navy) + T2(316, 190, "UPSTREAM", "ERRORS", { c: C.navy }) + okB(368, 152, 15)) +
        G("nx", 200, 300, T(200, 306, "NEITHER DISAPPEARS", { c: C.navy })) +
        G("silo", 200, 220, [["RESERVATIONS", JI.book], ["REVENUE", JI.rate], ["FRONT DESK", JI.desk], ["HOUSEKEEPING", JI.room]].map(([s, f], i) =>
          R(16 + i * 96, 96, 80, 210, 10, C.pale, CCOL[i], 2.5) + Gs(56 + i * 96, 126, 1.4, f(0, 0))).join("") +
          [0, 1, 2].map((i) => wall(97 + i * 96, 160, 14, 120, C.orange)).join("")) +
        Ln("Lbr", "M24 226H376", C.green, 7) +
        Mv("Mg", [[24, 226], [376, 226]], person(0, 4, 0.75, C.green)) +
        G("bl", 200, 346, T(200, 350, "CHART LINES, NOT LIMITS", { c: C.green })),
      steps: [
        "+h0 +pref +cA +cB +nx",
        "-h0 +h1 -pref -cA -cB -nx +silo +Lbr +Mg Mg@1 +bl"] },

    // Template 131 · Transition end (Observable) — https://observablehq.com/@d3/transition-end
    // Adapted: "move the circle, await, then recolour" -> the order lands, everyone waits, and the team recolours
    // grey: formal agreement with resentment, low participation and the problem still there.
    { ref: U[131], cap: "Weak response: order", n: 2,
      svg: () => hl("h0", "AN ORDER, NO REASON", C.orange) + hl("h1", "COMPLIANCE, NOT COMMITMENT", C.orange) +
        G("res", 104, 250, person(104, 252, 1.9, C.orange) + T2(104, 312, "RESERVATIONS", "MANAGER", { c: C.orange })) +
        G("dir", 312, 252, person(312, 254, 1.7, C.green) + bub(300, 144, 180, 46, C.green, C.paper, 1) + T(300, 150, "JUST COOPERATE", { c: C.green })) +
        G("gav", 200, 230, gavel(206, 222, 1.3, C.ink)) +
        G("why", 156, 170, qB(156, 172, 18)) +
        G("cl", 104, 140, cloud(104, 158, 1.25, C.blue, C.navy) + Pa("M92 180L84 198M108 180L100 198", C.navy, 3) + T(104, 112, "QUIET RESENTMENT", { z: 17, c: C.navy })) +
        G("r0", 300, 128, Ci(226, 128, 15, C.blue, C.navy, 2.5) + ck(227, 129, 0.8, C.navy, 3) + T2(252, 124, "FORMAL", "AGREEMENT", { a: "start", c: C.navy })) +
        G("r1", 300, 206, R(212, 192, 30, 28, 4, C.paper, C.navy, 2.5) + R(216, 210, 22, 6, 2, C.orange) + T2(252, 202, "LOW", "PARTICIPATION", { a: "start", z: 17, c: C.orange })) +
        G("r2", 300, 284, warn(226, 284, 1.1) + T2(252, 280, "PROBLEM", "UNSOLVED", { a: "start", c: C.orange })),
      steps: [
        "+h0 +res +dir +gav gav.r=-18 +why",
        "-h0 +h1 -dir -gav -why +cl +r0 +r1 +r2 res.x=-4"] },

    // Template 106 · Supply Chain and logistics (LottieFiles) — https://lottiefiles.com/free-animation/supply-chain-and-logistics-8PtoYRCbiu
    // Adapted: "connect dispatch, transit and receipt" -> booking information is dispatched from Reservations to the
    // improvement team; cutting Reservations out cuts the supply line and the information never arrives.
    { ref: U[106], cap: "Weak response: removal", n: 2,
      svg: () => hl("h0", "REMOVE RESERVATIONS?", C.orange) + hl("h1", "THE TEAM CANNOT SEE", C.orange) +
        G("rs", 76, 200, hotel(70, 196, 2, C.orange) + T2(76, 262, "RESERVATIONS", "TEAM", { z: 17, c: C.orange })) +
        Ln("LpA", "M110 200H186", C.navy, 8) + Ln("LpB", "M214 200H270", C.navy, 8) +
        Mv("Md", [[110, 200], [186, 200], [214, 200], [270, 200]], doc(0, 0, 0.7, C.navy, 2)) +
        G("tm", 330, 200, Ci(330, 200, 56, C.pale, C.green, 3, 'stroke-dasharray="7 5"') + person(312, 204, 1.05, C.green) + person(348, 204, 1.05, C.green) + T2(330, 280, "IMPROVEMENT", "TEAM", { c: C.green })) +
        G("sc", 200, 196, sciss(200, 196, 1.6, C.ink)) +
        G("lk", 160, 232, lockI(160, 236, 1.1, C.orange)) +
        G("ln", 262, 168, lens(250, 158, 18, C.navy) + noB(280, 138, 12)) +
        G("lb", 200, 336, T(200, 340, "BOOKING DATA UNREACHABLE", { c: C.orange })),
      steps: [
        "+h0 +rs +LpA +LpB +Md Md@0.85 +tm +sc",
        "-h0 +h1 -LpB Md@0.32 rs.o=0.4 sc.r=-30 sc.o=0.3 +lk +ln +lb"] },

    // Template 076 · Workflow Animation (Dribbble) — https://dribbble.com/shots/3791748-Workflow-Animation
    // Adapted: "reveal the action, transfer the trigger, show the notification" -> the rate packet is traced from
    // booking to check-in; three questions pin to the handoffs; blame arrows are withdrawn; changes wait.
    { ref: U[76], cap: "Follow the evidence", n: 4,
      svg: () => {
        const X = [58, 150, 250, 342], Y = 200, lab = [["BOOKING", "CONFIRMED"], ["RATE", "INFORMATION"], ["FRONT-DESK", "SYSTEM"], ["GUEST", "CHECK-IN"]];
        const ic = [JI.book, JI.rate, (x, y) => scr(x, y - 3, 26, 20, C.ink), JI.key];
        return hl("h0", "BACK TO THE GUEST", C.green) + hl("h1", "THREE QUESTIONS", C.navy) + hl("h2", "NO ASSUMED BLAME", C.navy) + hl("h3", "INVESTIGATE BEFORE CHANGING", C.green) +
          G("gs", 200, 312, person(176, 314, 1.6, C.green) + suit(206, 326, 0.9) + doc(250, 312, 1, C.navy, 3) + T(214, 366, "GUEST EVIDENCE", { c: C.green })) +
          Pa(`M${X[0]} ${Y}H${X[3]}`, C.blue, 8) + Ln("Lf", `M${X[0]} ${Y}H${X[3]}`, C.navy, 5) +
          X.map((x, i) => G("n" + i, x, Y, node(x, Y, 24, i === 1 ? C.orange : C.navy, Gs(x, Y, 1.2, ic[i](0, 0))) + T2(x, i % 2 ? 136 : 246, lab[i][0], lab[i][1], { z: 17 }))).join("") +
          Mv("Mr", X.map((x) => [x, Y - 34]), coin(0, 0, 10)) +
          G("q1", 30, 166, qB(30, 166, 13)) + G("q2", 200, 200, qB(200, 200, 14)) + G("q3", 296, 200, qB(296, 200, 14)) +
          G("bl", 200, 316, person(70, 320, 1.3, C.orange) + person(330, 320, 1.3, C.navy) + arr(100, 306, 180, 306, C.orange, 3.5) + arr(300, 324, 220, 324, C.navy, 3.5) + noB(200, 314, 16)) +
          G("lnv", 150, 200, lens(146, 196, 30, C.green)) +
          G("wr", 300, 316, wrench(270, 318, 1.3, C.navy) + lockI(318, 322, 1.3, C.orange) + T(200, 366, "CHANGES WAIT", { c: C.orange }));
      },
      steps: [
        "+h0 +gs +n0 +n1 +n2 +n3 n0.o=0.35 n1.o=0.35 n2.o=0.35 n3.o=0.35",
        "-h0 +h1 -gs +n0 +n1 +n2 +n3 +Lf +Mr Mr@1 +q1 +q2 +q3",
        "-h1 +h2 -q1 -q2 -q3 +bl",
        "-h2 +h3 -bl +lnv +wr"] },

    // Template 083 · The Process Architectural Motion (Behance) — https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion
    // Adapted: "build and revise successive layers" -> Reservations is a stack of activity layers; only the booking
    // handoff layer is tied into the project as a joint owner, every other layer stays outside the scope.
    { ref: U[83], cap: "Joint owners", n: 2,
      svg: () => hl("h0", "RESERVATIONS: JOINT OWNER", C.green) + hl("h1", "IN SCOPE VERSUS OUT", C.navy) +
        G("st", 120, 210, [0, 1, 2, 3, 4].map((i) => R(30, 92 + i * 50, 180, 40, 9, i ? C.pale : C.paper, i ? C.navy : C.green, i ? 2 : 3.5)).join("") +
          T(120, 118, "BOOKING HANDOFF", { z: 17, c: C.green }) + [1, 2, 3, 4].map((i) => Pa(`M58 ${112 + i * 50}H182`, C.navy, 4, 'opacity=".35"')).join("")) +
        G("pj", 316, 118, Ci(316, 118, 42, C.paper, C.green, 4) + CAND[0](316, 120, 1.05)) +
        Ln("Lj", "M210 112H274", C.green, 5) + G("kn", 242, 112, Ci(242, 112, 10, C.gold, C.ink, 2)) +
        G("jo", 316, 202, pill(316, 202, "JOINT OWNER", C.green, C.green)) +
        G("nr", 316, 290, Gs(316, 282, 1, R(-30, -14, 44, 24, 5, C.navy) + R(14, -6, 20, 16, 3, C.navy) + Ci(-18, 14, 7, C.ink) + Ci(10, 14, 7, C.ink)) + noB(346, 262, 13) + T2(316, 330, "NOT A FULL", "REDESIGN", { c: C.orange })) +
        G("bk", 120, 112, brk(22, 218, 82, C.green, 4)) +
        G("ou", 120, 260, R(20, 136, 200, 222, 12, "none", C.orange, 3, 'stroke-dasharray="7 6"') + T(120, 378 - 6, "UNRELATED DUTIES", { z: 17, c: C.orange })),
      steps: [
        "+h0 +st +pj +Lj +kn +jo +nr",
        "-h0 +h1 +bk +ou -nr"] },

    // Template 086 · Workflow by a (LottieFiles) — https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm
    // Adapted: "reveal workers and workflow actions" -> lanes for each function appear one by one, their
    // information tokens travel to check-in, Finance joins at the bill, and every lane receives a clear task.
    { ref: U[86], cap: "More functions join", n: 4,
      svg: () => {
        const Y = [96, 152, 208, 264, 320], lab = [["RESERVATIONS", "TEAM"], ["REVENUE", "TEAM"], ["HOUSEKEEPING", "TEAM"], ["FRONT", "DESK"], ["FINANCE", "TEAM"]];
        const NX = [204, 246, 290, 332, 372], ic = [JI.book, JI.rate, JI.room, JI.key, JI.bill];
        return hl("h0", "MORE FUNCTIONS JOIN", C.navy) + hl("h1", "RATES AND ROOM READINESS", C.navy) + hl("h2", "FINANCE AT THE BILL", C.navy) + hl("h3", "EVERY ROLE IS CLEAR", C.green) +
          Y.map((y, i) => G("l" + i, 200, y, R(8, y - 22, 384, 44, 12, i % 2 ? C.pale : C.paper, [C.orange, C.gold, C.navy, C.green, C.navy][i], 2) +
            T2(14, y - 4, lab[i][0], lab[i][1], { a: "start", z: 17, c: C.ink }) + node(NX[i], y, 17, [C.orange, C.gold, C.navy, C.green, C.navy][i], ic[i](NX[i], y)))).join("") +
          Ln("La", `M${NX[1]} ${Y[1] + 16}Q${NX[1] + 40} ${Y[1] + 60} ${NX[3] - 14} ${Y[3] - 10}`, C.gold, 4) +
          Ln("Lb", `M${NX[2]} ${Y[2] + 16}Q${NX[2] + 20} ${Y[2] + 40} ${NX[3] - 6} ${Y[3] - 14}`, C.navy, 4) +
          G("ck", 330, 264, clock(300, 264, 13, C.orange, 120)) +
          G("bd", 290, 210, R(186, 72, 208, 278, 16, "none", C.green, 3.5, 'stroke-dasharray="8 6"')) +
          Y.map((y, i) => G("ok" + i, 166, y, okB(166, y, 11))).join("");
      },
      steps: [
        "+h0 +l0 +l3 +l1 +l2 +l4 l0.o=0.4 l3.o=0.4",
        "-h0 +h1 +La +Lb +ck l2.o=1 l1.o=1",
        "-h1 +h2 +bd l0.o=0.4 l1.o=0.4 l2.o=0.4 l3.o=0.4",
        "-h2 +h3 l0.o=1 l1.o=1 l2.o=1 l3.o=1 +ok0 +ok1 +ok2 +ok3 +ok4"] },

    // Template 091 · cro process (LottieFiles) — https://lottiefiles.com/free-animation/cro-process-RaUu5ps2to
    // Adapted: "move across business steps" -> an unresolved issue climbs the escalation route from operational
    // discussion to a recorded commitment, with the owner and the employees placed at the steps they affect.
    { ref: U[91], cap: "Who decides when stuck", n: 4,
      svg: () => {
        const Y = [320, 246, 172, 98], S = ["OPERATIONAL DISCUSSION", "EVIDENCE REVIEW", "SPONSOR DECISION", "RECORDED COMMITMENT"];
        return hl("h0", "WHO APPROVES CHANGES?", C.orange) + hl("h1", "THE SPONSOR DECIDES", C.green) + hl("h2", "OWNER STAYS ACCOUNTABLE", C.navy) + hl("h3", "HEAR CONSEQUENCES FIRST", C.navy) +
          Y.map((y, i) => G("p" + i, 160, y, pill(160, y, S[i], [C.navy, C.navy, C.green, C.green][i], i === 2 ? C.paper : C.paper) +
            (i ? Pa(`M160 ${y + 20}V${y + 54}`, C.navy, 2.5, 'stroke-dasharray="4 4"') : ""))).join("") +
          Mv("Mx", [[330, 320], [330, 246], [330, 172], [330, 98]], exB(0, 0, 14)) +
          G("cl", 340, 340, person(318, 352, 0.9, C.orange) + person(362, 352, 0.9, C.navy) + Fi("M336 322L344 334H338L346 344", C.orange)) +
          G("sp", 372, 166, person(372, 176, 1, C.green) + crown(372, 148, 0.75)) +
          G("ow", 372, 96, person(372, 106, 1, C.navy) + gear(392, 84, 7, C.navy)) + Ln("Lo", "M372 128V150", C.navy, 3, 'stroke-dasharray="3 4"') +
          G("em", 300, 318, bub(330, 296, 44, 28, C.navy, C.paper, -1) + Gl(330, 303, "…", 20, C.navy) + bub(374, 296, 40, 28, C.navy, C.paper, 1) + Gl(374, 303, "…", 20, C.navy) +
            person(330, 350, 0.9, C.green) + person(374, 350, 0.9, C.green));
      },
      steps: [
        "+h0 +p0 +Mx Mx@0 +cl ~p1 ~p2 ~p3",
        "-h0 +h1 +p1 +p2 Mx@0.67 +sp",
        "-h1 +h2 +p3 Mx@1 +ow +Lo",
        "-h2 +h3 -cl +em *p0"] },

    // Template 080 · Creative Design Workflow Animation (Dribbble) — https://dribbble.com/shots/27476599-Creative-Design-Workflow-Animation
    // Adapted: "assemble shapes and refine the composition" -> an objection reveals a missing piece of the plan,
    // the gap is patched, and every objection is answered with a reply and a check.
    { ref: U[80], cap: "Objections improve it", n: 2,
      svg: () => hl("h0", "OBJECTIONS EXPOSE GAPS", C.orange) + hl("h1", "A FAIR, CLEAR RESPONSE", C.green) +
        G("pl", 230, 200, R(150, 62, 220, 262, 14, C.paper, C.navy, 3) + T(260, 94, "PROJECT PLAN", { c: C.navy }) +
          [0, 1, 3, 4].map((i) => R(172, 112 + i * 44, 176, 30, 8, C.pale, C.navy, 2) + Pa(`M186 ${127 + i * 44}H${300 - (i % 2) * 30}`, C.navy, 3)).join("")) +
        G("hole", 260, 215, R(172, 200, 176, 30, 8, C.paper, C.orange, 3, 'stroke-dasharray="6 5"') + qB(260, 215, 12)) +
        G("ob", 70, 214, person(66, 236, 1.6, C.orange) + bub(76, 150, 70, 40, C.orange, C.paper, -1) + Gl(76, 160, "!", 24, C.orange) + arr(112, 196, 166, 212, C.orange, 3.5)) +
        G("pt", 260, 215, R(172, 200, 176, 30, 8, C.green) + Pa("M186 215H330", C.paper, 3)) +
        G("rp", 120, 300, okB(104, 150, 14) + arr(170, 290, 112, 270, C.green, 3.5) + T(20, 352, "OBJECTION ANSWERED", { a: "start", c: C.green })),
      steps: ["+h0 +pl +hole +ob *hole", "-h0 +h1 =hole +pt +rp"] },

    // Template 112 · Infographics Pack by ARstudio (Motion Array) — https://motionarray.com/after-effects-templates/infographics-pack-135055/
    // Adapted: "reveal chart primitives and labels" -> the commitment record fills row by row, the open-concerns box
    // opens, the original positions sign anyway, a later expansion bounces off the record, and measures come next.
    { ref: U[112], cap: "Record the commitment", n: 5,
      svg: () => hl("h0", "WRITE THE COMMITMENT", C.green) + hl("h1", "OPEN CONCERNS STAY VISIBLE", C.orange) + hl("h2", "NOT EVERYONE AGREED FIRST", C.navy) + hl("h3", "A SHARED REFERENCE", C.green) + hl("h4", "MEASURES COME NEXT", C.navy) +
        G("dc", 200, 170, R(26, 56, 348, 236, 14, C.paper, C.navy, 3) +
          ["AGREED BOUNDARY", "DEPARTMENT CONTRIBUTIONS", "DECISION RIGHTS", "ESCALATION ROUTE", "OWNERS FOR ACTIONS"].map((s, i) =>
            G("r" + i, 200, 90 + i * 44, okB(56, 90 + i * 44, 12) + T(80, 96 + i * 44, s, { a: "start", z: 16, c: C.ink }))).join("")) +
        G("oc", 200, 334, R(30, 306, 340, 58, 12, C.pale, C.orange, 3, 'stroke-dasharray="7 5"') + lens(64, 330, 13, C.orange) + T(100, 342, "OPEN CONCERNS TRACKED", { a: "start", c: C.orange })) +
        G("sg", 200, 336, [C.orange, C.navy, C.gold].map((c, i) => person(110 + i * 90, 352, 0.95, c) + ck(132 + i * 90, 326, 0.7, C.green, 3.5)).join("") +
          Ci(96, 318, 7, C.orange) + R(190, 311, 14, 14, 2, C.navy) + Fi("M286 310L294 324H278Z", C.gold)) +
        G("ex", 360, 160, arr(398, 160, 382, 160, C.orange, 5) + Fi("M380 140L392 150L380 160L392 170L380 180", "none", `stroke="${C.orange}" stroke-width="3"`)) +
        G("nx", 200, 336, R(60, 308, 280, 56, 14, C.navy) + Gs(110, 340, 1, Pa("M-16 6A16 16 0 0 1 16 6", C.paper, 4) + Pa("M0 6L8 -6", C.gold, 4)) + T(220, 342, "BASELINE AND TARGET", { z: 17, c: C.paper, nh: true })),
      steps: [
        "+h0 +dc +r0 +r1 +r2 +r3 +r4",
        "-h0 +h1 +oc",
        "-h1 +h2 -oc +sg",
        "-h2 +h3 -sg +ex ex.x=-10 dc.x=-6",
        "-h3 +h4 dc.x=0 -ex +nx"] }
  ]);

  addStyle("w07-claude-v2-part3", ["O3a","O3b","O3c"]);
})();

// FILE w07-claude-v2-part4.js
// OPER621 · Week 7 · The Launch Pad Phase — animated teaching scenes v2, part 4 of 4 (O3d, O3e, O3f).
// Standalone: defines every helper it uses, registers its own scenes, appends its own rules to <style id="vl-sc-w07">.
// Parts 1-4 load in any order. Rebuilt from the GPT-6 content audit: every narration line now has its own visible
// state change, and every section is split into 8-11 distinct shots (a new visual every 2-5 lines).
//
// Contract: window.VL_SCENES['<secId>'] = { build(el), step(i, n), reset() }
//   step(i, n): n === narration line count -> one state per line; n === visual-moment count -> that moment's line;
//   any other n -> proportional. Every state is rebuilt from scratch, so seek, replay and going back are safe.
//   Motion: window.gsap drives the tween when present, otherwise requestAnimationFrame. Elements entering on a line
//   are staggered; shots push left/right; prefers-reduced-motion jumps straight to each state with no ambient loops.
// Layout: one 400x380 stage, "meet" fit, dotted backdrop extends into any spare space, so the figure fills the phone
//   slot above the text and the left 60% on a laptop. Labels are 2-4 words, 16-19 units; the narration is never shown.
// QA: every label was checked against the 400x380 frame and against every other label visible on the same line
//   (estimated glyph widths), for every narration line of every section.
// Each shot names the benchmark template it adapts (number, title, exact URL) in the comment above it.
(() => {
  "use strict";
  if (typeof window === "undefined" || typeof document === "undefined") return;
  window.VL_SCENES = window.VL_SCENES || {};
  const REG = window.VL_SCENES;
  // ---------- palette (exact values: the look engines remap them) ----------
  const C = {
    navy: "#1f4e79", orange: "#c0502a", paper: "#fbf8f1", ink: "#1b2a3a",
    blue: "#dbe7f2", green: "#317c61", pale: "#edf3f7", gold: "#d7a45c"
  };
  const NS = "http://www.w3.org/2000/svg";
  const VW = 400, VH = 380;
  // ---------- maths ----------
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const r1 = (v) => Math.round(v * 10) / 10;
  const r3 = (v) => Math.round(v * 1000) / 1000;
  const rad = (d) => (d * Math.PI) / 180;
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeBack = (t) => { const c1 = 1.5, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
  const reduced = () => {
    try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    catch (e) { return false; }
  };
  // ---------- SVG string primitives (absolute coordinates everywhere) ----------
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const at = (o) => Object.keys(o).filter((k) => o[k] !== undefined && o[k] !== null && o[k] !== false && o[k] !== "")
    .map((k) => `${k}="${o[k]}"`).join(" ");
  const R = (x, y, w, h, rx, f, s, sw, ex = "") =>
    `<rect ${at({ x: r1(x), y: r1(y), width: r1(w), height: r1(h), rx, fill: f || "none", stroke: s, "stroke-width": sw })} ${ex}/>`;
  const Ci = (x, y, r, f, s, sw, ex = "") =>
    `<circle ${at({ cx: r1(x), cy: r1(y), r: r1(r), fill: f || "none", stroke: s, "stroke-width": sw })} ${ex}/>`;
  const El = (x, y, rx, ry, f, s, sw, ex = "") =>
    `<ellipse ${at({ cx: r1(x), cy: r1(y), rx: r1(rx), ry: r1(ry), fill: f || "none", stroke: s, "stroke-width": sw })} ${ex}/>`;
  const Pa = (d, s, sw = 3, ex = "") =>
    `<path d="${d}" fill="none" stroke="${s}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
  const Fi = (d, f, ex = "") => `<path d="${d}" fill="${f}" ${ex}/>`;
  // Self-drawing stroke (keys starting with "L"): progress in P["k.d"].
  const Ln = (k, d, s, sw = 4, ex = "") =>
    `<path data-k="${k}" d="${d}" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" fill="none" stroke="${s}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
  // Animated group; (ox, oy) is the pivot for scale and rotation.
  const G = (k, ox, oy, inner, ex = "") => `<g data-k="${k}" data-ox="${r1(ox)}" data-oy="${r1(oy)}" ${ex}>${inner}</g>`;
  // Mover (keys starting with "M"): drawn around (0,0), travels along a polyline with P["k.t"].
  const Mv = (k, pts, inner) =>
    `<g data-k="${k}" data-ox="0" data-oy="0" data-path="${pts.map((p) => p.join(",")).join(" ")}" transform="translate(${pts[0][0]} ${pts[0][1]})">${inner}</g>`;
  // Static icon placement.
  const Gs = (x, y, s, inner, ex = "") => `<g transform="translate(${r1(x)} ${r1(y)}) scale(${s})" ${ex}>${inner}</g>`;
  // Labels: 2-4 words, never narration, minimum 16 units.
  const T = (x, y, s, o = {}) =>
    `<text ${at({ x: r1(x), y: r1(y), "font-size": Math.max(16, o.z || 18), fill: o.c || C.ink, "text-anchor": o.a || "middle",
      "font-weight": 800, class: "vlw-t" + (o.nh ? " vlw-nh" : ""), "data-lab": "1" })}>${esc(s)}</text>`;
  const T2 = (x, y, a, b, o = {}) => {
    const z = Math.max(16, o.z || 18), lh = Math.round(z * 1.1);
    return `<text ${at({ x: r1(x), y: r1(y), "font-size": z, fill: o.c || C.ink, "text-anchor": o.a || "middle", "font-weight": 800,
      class: "vlw-t" + (o.nh ? " vlw-nh" : ""), "data-lab": "2" })}><tspan x="${r1(x)}" dy="0">${esc(a)}</tspan><tspan x="${r1(x)}" dy="${lh}">${esc(b)}</tspan></text>`;
  };
  // Glyphs (symbols and numerals inside icons; not labels).
  const Gl = (x, y, s, z = 18, c = C.ink) =>
    `<text x="${r1(x)}" y="${r1(y)}" font-size="${r1(z)}" fill="${c}" text-anchor="middle" font-weight="800" class="vlw-t vlw-gl">${esc(s)}</text>`;
  // Live counter text (keys starting with "N").
  const Num = (k, x, y, v, z = 30, c = C.navy, suf = "") =>
    `<text data-k="${k}" data-ox="${x}" data-oy="${y}" data-suf="${esc(suf)}" x="${x}" y="${y}" font-size="${z}" fill="${c}" text-anchor="middle" font-weight="800" class="vlw-t vlw-gl">${v}${esc(suf)}</text>`;
  const pillW = (s, z = 17) => Math.round(s.length * z * 0.66 + 28);
  const pill = (x, y, s, c = C.navy, f = C.paper, z = 17) => {
    const w = pillW(s, z);
    return R(x - w / 2, y - 18, w, 36, 18, f, c, 2.5) + T(x, y + 6, s, { z, c: f === C.paper ? c : C.paper, nh: f !== C.paper });
  };
  // Pill with a status badge inside its left end: badge(x, y) draws the badge.
  const bpill = (x, y, s, c, badge, dash = false, z = 17) => {
    const w = Math.round(s.length * z * 0.66 + 62), x0 = x - w / 2;
    return R(x0, y - 19, w, 38, 19, C.paper, c, 3, dash ? 'stroke-dasharray="7 5"' : "") + badge(x0 + 21, y) + T(x0 + 42, y + 6, s, { a: "start", z, c });
  };
  const hl = (k, s, c = C.navy, y = 32) => G(k, 200, y - 7, T(200, y, s, { z: s.length > 26 ? 18 : 20, c }));
  // ---------- icon library (centred on x, y) ----------
  const person = (x, y, s = 1, c = C.navy) => Gs(x, y, s, Ci(0, -13, 8.5, c) + Fi("M-15 17Q-15 0 0 0Q15 0 15 17Z", c));
  const hotel = (x, y, s = 1, c = C.navy, f = C.paper) => Gs(x, y, s, R(-13, -20, 26, 40, 3, f, c, 2.5) +
    [-7, 2].map((dx) => [-14, -5].map((dy) => R(dx, dy, 5, 5, 1, c)).join("")).join("") + R(-4, 9, 8, 11, 1.5, c));
  const doc = (x, y, s = 1, c = C.navy, n = 3, f = C.paper) => Gs(x, y, s,
    Fi("M-15 -20H8L15 -13V20H-15Z", f, `stroke="${c}" stroke-width="2.5" stroke-linejoin="round"`) + Pa("M8 -20V-13H15", c, 2) +
    Array.from({ length: n }, (_, i) => Pa(`M-9 ${-8 + i * 8}H${i % 2 ? 4 : 9}`, c, 2.5)).join(""));
  const ck = (x, y, s = 1, c = C.green, sw = 4) => Pa(`M${r1(x - 9 * s)} ${r1(y)}l${r1(6 * s)} ${r1(7 * s)}l${r1(13 * s)} ${r1(-15 * s)}`, c, sw);
  const xx = (x, y, s = 1, c = C.orange, sw = 4) => Pa(`M${r1(x - 8 * s)} ${r1(y - 8 * s)}l${r1(16 * s)} ${r1(16 * s)}m0 ${r1(-16 * s)}l${r1(-16 * s)} ${r1(16 * s)}`, c, sw);
  const okB = (x, y, r = 12, c = C.green) => Ci(x, y, r, c) + ck(x + 1, y + 1, r / 15, C.paper, 3);
  const noB = (x, y, r = 12, c = C.orange) => Ci(x, y, r, c) + xx(x, y, r / 17, C.paper, 3);
  const qB = (x, y, r = 14, c = C.orange) => Ci(x, y, r, C.paper, c, 3) + Gl(x, y + r * 0.45, "?", r * 1.3, c);
  const exB = (x, y, r = 12, c = C.orange) => Ci(x, y, r, c) + Pa(`M${x} ${r1(y - r * 0.5)}V${r1(y + r * 0.12)}`, C.paper, 3) + Ci(x, y + r * 0.45, 1.8, C.paper);
  const clock = (x, y, r, c = C.navy, a = 60) => Ci(x, y, r, C.paper, c, 3) +
    Pa(`M${x} ${y}V${r1(y - r * 0.6)}M${x} ${y}L${r1(x + r * 0.5 * Math.cos(rad(a - 90)))} ${r1(y + r * 0.5 * Math.sin(rad(a - 90)))}`, c, 3);
  const starD = (x, y, r) => { let d = ""; for (let i = 0; i < 10; i++) { const a = rad(-90 + i * 36), q = i % 2 ? r * 0.45 : r; d += (i ? "L" : "M") + r1(x + q * Math.cos(a)) + " " + r1(y + q * Math.sin(a)); } return d + "Z"; };
  const star = (x, y, r, c = C.gold) => Fi(starD(x, y, r), c);
  const target = (x, y, r, c = C.navy) => Ci(x, y, r, C.paper, c, 2.5) + Ci(x, y, r * 0.58, "none", c, 2.5) + Ci(x, y, r * 0.2, c);
  const shield = (x, y, s = 1, c = C.green) => Gs(x, y, s, Fi("M0 -18L15 -12V1Q15 13 0 19Q-15 13 -15 1V-12Z", C.paper, `stroke="${c}" stroke-width="3" stroke-linejoin="round"`) + ck(0, 0, 0.7, c, 3));
  const keyI = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Ci(-8, 0, 7, "none", c, 3.5) + Pa("M-1 0H16M11 0V6M16 0V5", c, 3.5));
  const crown = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Fi("M-14 8L-12 -8L-5 0L0 -12L5 0L12 -8L14 8Z", c) + R(-14, 8, 28, 5, 2, c));
  const lens = (x, y, r = 16, c = C.navy) => Ci(x, y, r, C.paper, c, 4, 'fill-opacity=".45"') + Pa(`M${r1(x + r * 0.7)} ${r1(y + r * 0.7)}L${r1(x + r * 1.5)} ${r1(y + r * 1.5)}`, c, 6);
  const flag = (x, y, s = 1, c = C.green) => Gs(x, y, s, Pa("M0 0V-34", C.ink, 3) + Fi("M0 -34L22 -28L0 -21Z", c));
  const pin = (x, y, s = 1, c = C.orange) => Gs(x, y, s, Fi("M0 0C-5 -12 -16 -18 -16 -31A16 16 0 1 1 16 -31C16 -18 5 -12 0 0Z", c) + Ci(0, -31, 6, C.paper));
  const bub = (x, y, w, h, c = C.navy, f = C.paper, tail = -1) =>
    Fi(`M${r1(x + tail * w * 0.25 - 7)} ${r1(y + h / 2 - 2)}L${r1(x + tail * w * 0.25 + tail * 12)} ${r1(y + h / 2 + 13)}L${r1(x + tail * w * 0.25 + 7)} ${r1(y + h / 2 - 2)}Z`, f, `stroke="${c}" stroke-width="2.5" stroke-linejoin="round"`) +
    R(x - w / 2, y - h / 2, w, h, 12, f, c, 2.5);
  const cloud = (x, y, s = 1, f = C.blue, c = C.navy) => Gs(x, y, s, Fi("M-30 12Q-42 12 -40 0Q-38 -12 -24 -10Q-20 -26 -2 -24Q14 -30 22 -14Q38 -14 38 0Q38 12 26 12Z", f, `stroke="${c}" stroke-width="2.5"`));
  const cal = (x, y, s = 1, c = C.navy, f = C.paper) => Gs(x, y, s, R(-18, -16, 36, 34, 5, f, c, 2.5) + R(-18, -16, 36, 10, 4, c) + Pa("M-10 -20V-12M10 -20V-12", c, 3) +
    [0, 1, 2].map((i) => R(-12 + i * 9, 0, 6, 5, 1, c)).join("") + [0, 1].map((i) => R(-12 + i * 9, 8, 6, 5, 1, c)).join(""));
  const truck = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-30, -20, 38, 26, 3, c) + Fi("M8 -12H22L30 -2V6H8Z", c) + R(13, -9, 9, 7, 1.5, C.pale) +
    Ci(-18, 8, 6, C.ink) + Ci(-18, 8, 2.5, C.pale) + Ci(20, 8, 6, C.ink) + Ci(20, 8, 2.5, C.pale));
  const bed = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-20, -2, 40, 10, 3, C.blue, c, 2.5) + R(-20, -10, 12, 9, 3, C.paper, c, 2) + Pa("M-20 -14V14M20 0V14", c, 3));
  const scr = (x, y, w, h, c = C.ink) => R(x - w / 2, y - h / 2, w, h, 5, c) + R(x - w / 2 + 4, y - h / 2 + 4, w - 8, h - 8, 3, C.pale) + R(x - 5, y + h / 2, 10, 6, 1, c) + R(x - 15, y + h / 2 + 5, 30, 4, 2, c);
  const gavel = (x, y, s = 1, c = C.ink) => Gs(x, y, s, `<g transform="rotate(-35)">${R(-18, -9, 36, 18, 4, c) + R(-3, 9, 6, 34, 3, c)}</g>` + R(-16, 30, 32, 7, 3, c));
  const sciss = (x, y, s = 1, c = C.ink) => Gs(x, y, s, Ci(-9, 12, 7, "none", c, 3) + Ci(9, 12, 7, "none", c, 3) + Pa("M-5 6L12 -20M5 6L-12 -20", c, 3.5));
  const lockI = (x, y, s = 1, c = C.navy, open = false) => Gs(x, y, s, R(-12, -4, 24, 20, 4, c) +
    Pa(open ? "M-7 -4V-12Q-7 -20 0 -20Q7 -20 7 -14" : "M-7 -4V-11Q-7 -19 0 -19Q7 -19 7 -11V-4", c, 3.5) + Ci(0, 5, 3, C.paper));
  const mega = (x, y, s = 1, c = C.orange) => Gs(x, y, s, Fi("M-14 -6L8 -16V16L-14 6Z", c) + R(-22, -7, 9, 14, 2, c) + Pa("M14 -10Q22 0 14 10M19 -16Q31 0 19 16", c, 2.5) + Pa("M-16 7L-12 18", c, 4));
  const warn = (x, y, s = 1, c = C.orange) => Gs(x, y, s, Fi("M0 -16L16 12H-16Z", C.paper, `stroke="${c}" stroke-width="3" stroke-linejoin="round"`) + Pa("M0 -5V3", c, 3.2) + Ci(0, 8, 1.9, c));
  const gear = (x, y, r, c = C.navy) => Gs(x, y, 1, [0, 45, 90, 135].map((a) => R(-r * 1.28, -r * 0.24, r * 2.56, r * 0.48, 2, c, "", "", `transform="rotate(${a})"`)).join("") + Ci(0, 0, r, c) + Ci(0, 0, r * 0.42, C.paper));
  const suit = (x, y, s = 1, c = C.orange) => Gs(x, y, s, R(-13, -10, 26, 22, 4, c) + Pa("M-5 -10V-15H5V-10", c, 3) + Pa("M-13 -1H13", C.paper, 2));
  const bell = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Fi("M-14 6A14 14 0 0 1 14 6Z", c) + R(-18, 6, 36, 5, 2, C.ink) + Ci(0, -10, 3, C.ink));
  const bulb = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Ci(0, -6, 13, c) + R(-6, 6, 12, 9, 2, C.ink) + Pa("M-4 -6L0 0L4 -6", C.paper, 2));
  const rocket = (x, y, s = 1, c = C.orange) => Gs(x, y, s, Fi("M0 -34Q12 -22 12 0V12H-12V0Q-12 -22 0 -34Z", C.paper, `stroke="${C.navy}" stroke-width="3"`) +
    Ci(0, -12, 5, C.blue, C.navy, 2.5) + Fi("M-12 0L-22 14H-12ZM12 0L22 14H12Z", c));
  const trophy = (x, y, s = 1, c = C.gold) => Gs(x, y, s, Fi("M-14 -18H14V-6Q14 8 0 10Q-14 8 -14 -6Z", c) + Pa("M-14 -12Q-24 -12 -20 -2Q-17 4 -12 2M14 -12Q24 -12 20 -2Q17 4 12 2", c, 3) + R(-3, 10, 6, 8, 1, c) + R(-11, 18, 22, 6, 2, c));
  const book = (x, y, s = 1, c = C.navy) => Gs(x, y, s, Fi("M0 -12Q-10 -18 -22 -14V14Q-10 10 0 16Q10 10 22 14V-14Q10 -18 0 -12Z", C.paper, `stroke="${c}" stroke-width="2.5" stroke-linejoin="round"`) + Pa("M0 -12V16", c, 2.5));
  const server = (x, y, s = 1, c = C.navy) => Gs(x, y, s, [0, 1, 2].map((i) => R(-16, -18 + i * 12, 32, 10, 2, C.paper, c, 2.5) + Ci(10, -13 + i * 12, 2, c)).join(""));
  const eye = (x, y, s = 1, c = C.navy) => Gs(x, y, s, Pa("M-16 0Q0 -13 16 0Q0 13 -16 0Z", c, 3) + Ci(0, 0, 5, c));
  const arr = (x1, y1, x2, y2, c = C.navy, sw = 3.5, ex = "") => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 11;
    return Pa(`M${r1(x1)} ${r1(y1)}L${r1(x2 - Math.cos(a) * 4)} ${r1(y2 - Math.sin(a) * 4)}`, c, sw, ex) +
      Fi(`M${r1(x2 + Math.cos(a) * 2)} ${r1(y2 + Math.sin(a) * 2)}L${r1(x2 - Math.cos(a - 0.45) * h)} ${r1(y2 - Math.sin(a - 0.45) * h)}L${r1(x2 - Math.cos(a + 0.45) * h)} ${r1(y2 - Math.sin(a + 0.45) * h)}Z`, c);
  };
  const wall = (x, y, w, h, c = C.orange) => {
    let s = ""; const bw = w / 3, bh = h / 4;
    for (let r = 0; r < 4; r++) for (let i = 0; i < 4; i++) {
      const a = x + i * bw - (r % 2 ? bw / 2 : 0), x0 = Math.max(x, a), x1 = Math.min(x + w, a + bw);
      if (x1 - x0 > 3) s += R(x0 + 1, y + r * bh + 1, x1 - x0 - 2, bh - 2, 2, C.paper, c, 2);
    }
    return s;
  };
  const desk = (x, y, w, c = C.navy) => R(x - w / 2, y, w, 14, 4, c) + R(x - w / 2 + 6, y + 14, w - 12, 24, 3, C.blue, c, 2);
  const chairE = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-14, -24, 28, 26, 6, "none", c, 2.5, 'stroke-dasharray="4 4"') +
    R(-17, 2, 34, 7, 3, "none", c, 2.5, 'stroke-dasharray="4 4"') + Pa("M-14 9V22M14 9V22", c, 2.5, 'stroke-dasharray="4 4"'));
  const cab = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-18, -26, 36, 52, 4, C.paper, c, 2.5) + [0, 1, 2].map((i) => R(-13, -21 + i * 16, 26, 13, 2, C.blue, c, 2) + R(-5, -16 + i * 16, 10, 3, 1.5, c)).join(""));
  const env = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-18, -12, 36, 24, 3, C.paper, c, 2.5) + Pa("M-18 -12L0 2L18 -12", c, 2.5));
  const cam = (x, y, s = 1, c = C.ink) => Gs(x, y, s, R(-18, -10, 36, 24, 4, c) + R(-8, -15, 14, 6, 2, c) + Ci(0, 2, 7, C.pale) + Ci(0, 2, 3.5, c));
  const wrench = (x, y, s = 1, c = C.navy) => Gs(x, y, s, `<g transform="rotate(45)">${R(-3.5, -4, 7, 30, 3, c) + Fi("M-10 -14A10 10 0 1 0 10 -14L5 -14L5 -6L-5 -6L-5 -14Z", c)}</g>`);
  const coin = (x, y, r = 9, c = C.gold) => Ci(x, y, r, c, C.ink, 1.5) + Pa(`M${x} ${r1(y - r * 0.5)}V${r1(y + r * 0.5)}`, C.paper, 2.5);
  const link = (x, y, s = 1, c = C.navy) => Gs(x, y, s, R(-16, -7, 20, 14, 7, "none", c, 3.5) + R(-4, -7, 20, 14, 7, "none", c, 3.5));
  const face = (x, y, r, c = C.navy, mood = 0) => Ci(x, y, r, C.paper, c, 3) + Ci(x - r * 0.35, y - r * 0.2, r * 0.1 + 1, c) + Ci(x + r * 0.35, y - r * 0.2, r * 0.1 + 1, c) +
    Pa(mood > 0 ? `M${r1(x - r * 0.4)} ${r1(y + r * 0.2)}Q${x} ${r1(y + r * 0.6)} ${r1(x + r * 0.4)} ${r1(y + r * 0.2)}` :
      mood < 0 ? `M${r1(x - r * 0.4)} ${r1(y + r * 0.48)}Q${x} ${r1(y + r * 0.08)} ${r1(x + r * 0.4)} ${r1(y + r * 0.48)}` : `M${r1(x - r * 0.4)} ${r1(y + r * 0.35)}H${r1(x + r * 0.4)}`, c, 3);
  const compass = (x, y, r, c = C.navy) => Ci(x, y, r, C.paper, c, 3) + Fi(`M${x} ${r1(y - r * 0.75)}L${r1(x + r * 0.2)} ${y}L${x} ${r1(y + r * 0.1)}L${r1(x - r * 0.2)} ${y}Z`, C.orange) +
    Fi(`M${x} ${r1(y + r * 0.75)}L${r1(x + r * 0.2)} ${y}L${x} ${r1(y - r * 0.1)}L${r1(x - r * 0.2)} ${y}Z`, c);
  const brk = (x1, x2, y, c = C.green, sw = 4, down = true) => Pa(`M${x1} ${y + (down ? 12 : -12)}V${y}H${x2}V${y + (down ? 12 : -12)}`, c, sw);
  const node = (x, y, r, c, inner = "") => Ci(x, y, r, C.paper, c, 3.5) + inner;
  const card = (x, y, w, h, c, inner = "", f = C.paper) => R(x - w / 2, y - h / 2, w, h, 12, f, c, 3) + inner;
  const ring = (x, y, r, c = C.blue, sw = 8) => Ci(x, y, r, "none", c, sw);
  const ringD = (k, x, y, r, c = C.orange, sw = 8) => Ln(k, `M${x} ${y - r}A${r} ${r} 0 1 1 ${r1(x - 0.1)} ${y - r}`, c, sw, 'stroke-linecap="butt"');
  // Candidate process icons (Qasr's four candidates), centred on (x, y).
  const CAND = [
    (x, y, s = 1) => Gs(x, y, s, person(-8, 6, 0.85, C.green) + suit(13, 12, 0.6, C.orange)),
    (x, y, s = 1) => Gs(x, y, s, doc(-6, 0, 0.85, C.navy) + coin(12, 10, 8)),
    (x, y, s = 1) => Gs(x, y, s, scr(0, -4, 38, 28, C.ink) + Ci(0, -4, 6, C.orange)),
    (x, y, s = 1) => Gs(x, y, s, bed(0, 2, 0.95, C.navy) + keyI(10, -14, 0.5, C.gold))
  ];
  const CCOL = [C.green, C.navy, C.orange, C.gold];
  // Journey node icons.
  const JI = {
    book: (x, y) => cal(x, y, 0.62, C.navy),
    rate: (x, y) => coin(x, y, 9),
    room: (x, y) => bed(x, y, 0.55, C.navy),
    desk: (x, y) => bell(x, y + 2, 0.62, C.gold),
    bill: (x, y) => doc(x, y, 0.55, C.navy, 2),
    out: (x, y) => suit(x, y, 0.7, C.orange),
    key: (x, y) => keyI(x + 2, y, 0.6, C.gold),
    guest: (x, y) => person(x, y + 4, 0.55, C.green)
  };
  // ---------- engine ----------
  // Pose = flat map "<key>.<prop>" -> number. Props: o x y s sx sy r d t n.
  // Key kinds by first letter: L drawable stroke, B vertical bar (sy), H horizontal bar (sx), M mover (t), N counter (n).
  function initKey(P, k, local) {
    const kind = local[0];
    if (kind === "L") { P[k + ".o"] = 1; P[k + ".d"] = 0; }
    else if (kind === "B") { P[k + ".o"] = 0; P[k + ".sy"] = 0.04; }
    else if (kind === "H") { P[k + ".o"] = 0; P[k + ".sx"] = 0.04; }
    else if (kind === "M") { P[k + ".o"] = 0; P[k + ".t"] = 0; P[k + ".x"] = 0; P[k + ".y"] = 0; P[k + ".s"] = 1; }
    else if (kind === "N") { P[k + ".o"] = 0; P[k + ".n"] = 0; P[k + ".s"] = 1; }
    else { P[k + ".o"] = 0; P[k + ".s"] = 0.86; P[k + ".x"] = 0; P[k + ".y"] = 8; P[k + ".r"] = 0; }
  }
  function showKey(P, k, local) {
    const kind = local[0];
    P[k + ".o"] = 1;
    if (kind === "L") P[k + ".d"] = 1;
    else if (kind === "B") P[k + ".sy"] = 1;
    else if (kind === "H") P[k + ".sx"] = 1;
    else if (kind !== "M" && kind !== "N") { P[k + ".s"] = 1; P[k + ".x"] = 0; P[k + ".y"] = 0; P[k + ".r"] = 0; }
  }
  // Step DSL: "+k" show, "-k" hide, "~k" dim, "*k" emphasise, "=k" normal size, "k@0.5" move along path,
  // "k.p=v" set any prop, "!k" ping target, "@x,y" ping point.
  function runStep(str, P, pre, ord, pg) {
    if (!str) return;
    let idx = 0;
    str.trim().split(/\s+/).forEach((tok) => {
      let m;
      if (tok[0] === "@") { const v = tok.slice(1).split(",").map(Number); if (pg) pg.xy = v; return; }
      if (tok[0] === "!") { if (pg) pg.k = pre + tok.slice(1); return; }
      if ((m = tok.match(/^([+\-~*=])(\w+)$/))) {
        const local = m[2], k = pre + local;
        if (m[1] === "+") showKey(P, k, local);
        else if (m[1] === "-") { P[k + ".o"] = 0; if (local[0] === "L") P[k + ".d"] = 0; }
        else if (m[1] === "~") P[k + ".o"] = 0.28;
        else if (m[1] === "*") { P[k + ".o"] = 1; P[k + ".s"] = 1.14; }
        else if (m[1] === "=") P[k + ".s"] = 1;
        if (ord && !(k in ord)) ord[k] = idx++;
        if (pg && !pg.first && (m[1] === "+" || m[1] === "*")) pg.first = k;
        return;
      }
      if ((m = tok.match(/^(\w+)@(-?[\d.]+)$/))) {
        const k = pre + m[1]; P[k + ".t"] = Number(m[2]); P[k + ".o"] = 1;
        if (ord && !(k in ord)) ord[k] = idx++;
        if (pg && !pg.first) pg.first = k;
        return;
      }
      if ((m = tok.match(/^(\w+)\.(o|x|y|s|sx|sy|r|d|t|n)=(-?[\d.]+)$/))) {
        const k = pre + m[1]; P[k + "." + m[2]] = Number(m[3]);
        if (ord && !(k in ord)) ord[k] = idx++;
        return;
      }
      if (typeof console !== "undefined") console.warn("VL w07: bad step token", tok);
    });
  }
  const along = (pts, t) => {
    if (pts.length < 2) return pts[0] || [0, 0];
    const seg = []; let tot = 0;
    for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); tot += l; }
    let d = clamp(t, 0, 1) * tot;
    for (let i = 0; i < seg.length; i++) {
      if (d <= seg[i] || i === seg.length - 1) { const u = seg[i] ? clamp(d / seg[i], 0, 1) : 0; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u]; }
      d -= seg[i];
    }
    return pts[pts.length - 1];
  };
  function applyP(P, R) {
    for (const k in R) {
      const e = R[k];
      const o = P[k + ".o"], d = P[k + ".d"], t = P[k + ".t"];
      if (o !== undefined) e.setAttribute("opacity", r3(clamp(o, 0, 1)));
      if (o !== undefined || d !== undefined) {
        const vis = (o === undefined || o >= 0.01) && (d === undefined || d >= 0.004);
        e.style.visibility = vis ? "" : "hidden";
      }
      const x = P[k + ".x"], y = P[k + ".y"], s = P[k + ".s"], r = P[k + ".r"], sx = P[k + ".sx"], sy = P[k + ".sy"];
      const mv = e._pts && t !== undefined;
      if (mv || x !== undefined || y !== undefined || s !== undefined || r !== undefined || sx !== undefined || sy !== undefined) {
        const b = mv ? along(e._pts, t) : [0, 0];
        const ss = s === undefined ? 1 : Math.max(0.001, s);
        const kx = ss * (sx === undefined ? 1 : Math.max(0.001, sx)), ky = ss * (sy === undefined ? 1 : Math.max(0.001, sy));
        e.setAttribute("transform", `translate(${r1(b[0] + (x || 0) + e._ox)} ${r1(b[1] + (y || 0) + e._oy)}) rotate(${r1(r || 0)}) scale(${r3(kx)} ${r3(ky)}) translate(${-e._ox} ${-e._oy})`);
      }
      if (d !== undefined) e.setAttribute("stroke-dashoffset", r3(1 - clamp(d, 0, 1)));
      const n = P[k + ".n"];
      if (n !== undefined) e.textContent = String(Math.round(n)) + e._suf;
    }
  }
  function lineOf(i, n, L, M) {
    let ii = Number(i), nn = Number(n);
    if (!Number.isFinite(ii)) ii = 0;
    if (!Number.isFinite(nn) || nn < 1) nn = L;
    ii = clamp(Math.floor(ii), 0, Math.floor(nn) - 1); nn = Math.floor(nn);
    if (nn === L) return ii;
    if (M && nn === M.length) return M[ii];
    if (nn <= 1) return 0;
    return clamp(Math.round((ii * (L - 1)) / (nn - 1)), 0, L - 1);
  }
  const PUSH = 34;
  function section(id, title, L, M, shotDefs) {
    let a = 0;
    const S = shotDefs.map((s, i) => {
      const pre = `s${i}_`;
      const raw = s.svg();
      const svg = raw.replace(/data-k="(\w+)"/g, (m0, k) => `data-k="${pre}${k}"`);
      const keys = [];
      raw.replace(/data-k="(\w+)"/g, (m0, k) => { keys.push(k); return m0; });
      const sh = { i, a, n: s.n, cap: s.cap, ref: s.ref, base: s.base || "", steps: s.steps, svg, raw, keys, pre };
      const p0 = {};
      keys.forEach((k) => initKey(p0, pre + k, k));
      runStep(sh.base.split(/\s+/).filter(Boolean).map((k) => "+" + k).join(" "), p0, pre, null, null);
      sh.p0 = p0;
      a += s.n;
      return sh;
    });
    const pose = (line) => {
      const si = Math.max(0, S.findIndex((s) => line >= s.a && line < s.a + s.n));
      const sh = S[si], P = Object.assign({}, sh.p0), ord = {}, pg = {};
      S.forEach((s, i) => {
        P[`S${i}.o`] = i === si ? 1 : 0;
        P[`S${i}.x`] = i === si ? 0 : (i < si ? -PUSH : PUSH);
        P[`S${i}.s`] = i === si ? 1 : 0.97;
      });
      const loc = clamp(line - sh.a, 0, sh.n - 1);
      for (let j = 0; j <= loc; j++) runStep(sh.steps[j], P, sh.pre, j === loc ? ord : null, j === loc ? pg : null);
      return { P, si, ord, pg };
    };
    let root = null, Rm = {}, cur = null, anim = null, raf = 0, lastLine = -1;
    const stop = () => {
      if (anim && anim.kill) { try { anim.kill(); } catch (e) { /* ignore */ } }
      anim = null;
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
    };
    const ping = (pg) => {
      if (!root || reduced()) return;
      const c = root.querySelector(".vlw-ping");
      if (!c) return;
      let x = null, y = null;
      if (pg.xy) { x = pg.xy[0]; y = pg.xy[1]; }
      else {
        const e = Rm[pg.k || pg.first];
        if (e && e.getBBox) { try { const b = e.getBBox(); x = b.x + b.width / 2; y = b.y + b.height / 2; } catch (er) { x = null; } }
      }
      if (x === null || !Number.isFinite(x)) return;
      c.setAttribute("cx", r1(x)); c.setAttribute("cy", r1(y));
      try {
        if (window.gsap && window.gsap.fromTo) {
          window.gsap.killTweensOf(c);
          window.gsap.fromTo(c, { attr: { r: 8 }, opacity: 0.8 }, { attr: { r: 40 }, opacity: 0, duration: 0.95, delay: 0.35, ease: "power2.out" });
        } else if (c.animate) {
          c.animate([{ r: "8px", opacity: 0.8 }, { r: "40px", opacity: 0 }], { duration: 950, delay: 350, easing: "ease-out" });
        }
      } catch (er) { /* static state already correct */ }
    };
    const show = (line, live) => {
      if (!root) return;
      const { P: tgt, si, ord, pg } = pose(line);
      const chip = root.querySelector(".vlw-chip");
      if (chip) chip.textContent = S[si].cap;
      const bar = root.querySelector(".vlw-bar i");
      if (bar) bar.style.width = `${L <= 1 ? 100 : r1((100 * line) / (L - 1))}%`;
      root.setAttribute("data-line", String(line));
      stop();
      if (!live || reduced() || !cur) { cur = tgt; applyP(cur, Rm); lastLine = line; return; }
      const from = cur, keys = Object.keys(tgt), p0 = S[si].p0;
      const delay = {};
      for (const k in ord) delay[k] = Math.min(0.42, ord[k] * 0.085);
      const base = keys.map((key) => key.slice(0, key.lastIndexOf(".")));
      const prop = keys.map((key) => key.slice(key.lastIndexOf(".") + 1));
      const frame = (t) => {
        const P = {};
        for (let j = 0; j < keys.length; j++) {
          const key = keys[j], b = tgt[key];
          let a0 = from[key];
          if (a0 === undefined) a0 = p0[key];
          if (a0 === undefined) a0 = b;
          const dl = delay[base[j]] || 0, u = clamp((t - dl) / (1 - dl), 0, 1);
          P[key] = a0 + (b - a0) * (prop[j] === "s" && base[j][0] !== "S" ? easeBack(u) : easeIO(u));
        }
        cur = P; applyP(P, Rm);
      };
      const dur = 1.15;
      if (window.gsap && window.gsap.to) {
        const proxy = { t: 0 };
        anim = window.gsap.to(proxy, { t: 1, duration: dur, ease: "none", onUpdate: () => frame(proxy.t), onComplete: () => frame(1) });
      } else {
        const t0 = performance.now();
        const loop = (now) => { const t = clamp((now - t0) / (dur * 1000), 0, 1); frame(t); raf = t < 1 ? requestAnimationFrame(loop) : 0; };
        raf = requestAnimationFrame(loop);
      }
      if (line !== lastLine) ping(pg);
      lastLine = line;
    };
    const api = {
      build(el) {
        if (!el) return;
        stop();
        root = document.createElement("div");
        root.className = `vls-w07-${id}`;
        root.innerHTML =
          `<div class="vlw-stage"><svg xmlns="${NS}" viewBox="-24 -12 ${VW + 48} ${VH + 24}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(title)}">` +
          `<defs><pattern id="vlw7v2dots-${id}" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="${C.blue}"/></pattern></defs>` +
          `<rect x="-800" y="-800" width="2000" height="2000" fill="url(#vlw7v2dots-${id})" opacity=".7"/>` +
          S.map((s) => `<g data-k="S${s.i}" data-ox="200" data-oy="190">${s.svg}</g>`).join("") +
          `<circle class="vlw-ping" cx="200" cy="190" r="8" fill="none" stroke="${C.orange}" stroke-width="3" opacity="0"/>` +
          `</svg></div>` +
          `<div class="vlw-foot"><span class="vlw-kick">${esc(title)}</span><span class="vlw-chip" aria-live="polite"></span></div>` +
          `<div class="vlw-bar"><i></i></div>`;
        el.replaceChildren(root);
        // Safety net for wider host fonts: nudge any label that would cross the frame edge back inside it.
        root.querySelectorAll("text[data-lab]").forEach((t) => {
          try {
            const b = t.getBBox(); if (!b || !b.width) return;
            let dx = 0;
            if (b.width > VW - 8) { t.setAttribute("textLength", VW - 8); t.setAttribute("lengthAdjust", "spacingAndGlyphs"); }
            else if (b.x < 4) dx = 4 - b.x; else if (b.x + b.width > VW - 4) dx = VW - 4 - (b.x + b.width);
            if (dx) [t, ...t.querySelectorAll("tspan")].forEach((e) => { const x = Number(e.getAttribute("x")); if (Number.isFinite(x)) e.setAttribute("x", r1(x + dx)); });
          } catch (er) { /* layout not available: keep authored positions */ }
        });
        Rm = {};
        root.querySelectorAll("[data-k]").forEach((e) => {
          Rm[e.getAttribute("data-k")] = e;
          e._ox = Number(e.getAttribute("data-ox")) || 0;
          e._oy = Number(e.getAttribute("data-oy")) || 0;
          e._suf = e.getAttribute("data-suf") || "";
          const p = e.getAttribute("data-path");
          e._pts = p ? p.split(" ").map((q) => q.split(",").map(Number)) : null;
        });
        cur = null; lastLine = -1;
        show(0, false);
      },
      step(i, n) { show(lineOf(i, n, L, M), true); },
      reset() { stop(); cur = null; lastLine = -1; show(0, false); }
    };
    Object.defineProperty(api, "_vlw", { value: { id, title, L, M, shots: S, pose }, enumerable: false });
    REG[id] = api;
  }
  // ---------- one shared stylesheet, every rule scoped under .vls-w07-<secId> ----------
  const baseCss = (id) => {
    const S = `.vls-w07-${id}`;
    return `
${S}{position:relative;width:100%;height:100%;min-height:0;display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr) auto auto;box-sizing:border-box;overflow:hidden;color:${C.ink};font-family:inherit}
${S} *,${S} *::before,${S} *::after{box-sizing:border-box}
${S} .vlw-stage{position:relative;min-height:0;overflow:hidden}
${S} .vlw-stage svg{display:block;width:100%;height:100%;font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;text-rendering:geometricPrecision}
${S} .vlw-t{paint-order:stroke;stroke:${C.paper};stroke-width:5px;stroke-linejoin:round;pointer-events:none;letter-spacing:.02em}
${S} .vlw-nh,${S} .vlw-gl{stroke:none}
${S} .vlw-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:5px 10px 4px;min-height:32px;min-width:0}
${S} .vlw-kick{min-width:0;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:${C.navy};opacity:.75;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
${S} .vlw-chip{font-size:14px;font-weight:800;letter-spacing:.03em;color:${C.paper};background:${C.navy};border-radius:999px;padding:4px 12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;margin-left:auto}
${S} .vlw-bar{height:3px;background:${C.blue}}
${S} .vlw-bar i{display:block;height:100%;width:0;background:${C.orange};transition:width .6s ease}
${S} .vlw-pulse{animation:vlw7v2-pulse 2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
${S} .vlw-bob{animation:vlw7v2-bob 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
${S} .vlw-spin{animation:vlw7v2-spin 8s linear infinite;transform-box:fill-box;transform-origin:center}
${S} .vlw-flow{stroke-dasharray:8 9;animation:vlw7v2-flow 1.3s linear infinite}
${S} .vlw-shake{animation:vlw7v2-shake .9s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
${S} .vlw-blink{animation:vlw7v2-blink 1.6s ease-in-out infinite}
@media (max-width:420px){${S} .vlw-kick{display:none}${S} .vlw-chip{margin:0 auto}}
@media (prefers-reduced-motion:reduce){${S} *,${S} *::before,${S} *::after{animation:none!important;transition:none!important}}`;
  };
  const KEYFRAMES = `
@keyframes vlw7v2-pulse{0%,100%{transform:scale(.94);opacity:.65}50%{transform:scale(1.06);opacity:1}}
@keyframes vlw7v2-bob{0%,100%{transform:translateY(-3px)}50%{transform:translateY(3px)}}
@keyframes vlw7v2-spin{to{transform:rotate(360deg)}}
@keyframes vlw7v2-flow{to{stroke-dashoffset:-34}}
@keyframes vlw7v2-shake{0%,100%{transform:rotate(0)}25%{transform:rotate(-4deg)}75%{transform:rotate(4deg)}}
@keyframes vlw7v2-blink{0%,100%{opacity:1}50%{opacity:.35}}`;
  const addStyle = (mark, ids) => {
    let st = document.getElementById("vl-sc-w07");
    if (!st) { st = document.createElement("style"); st.id = "vl-sc-w07"; document.head.appendChild(st); }
    const tag = `/* ${mark} */`;
    if (st.textContent.indexOf(tag) >= 0) return;
    st.textContent += `\n${tag}\n${KEYFRAMES}\n${ids.map(baseCss).join("\n")}\n`;
  };
  // ---------- benchmark registry (animation-benchmark-part2: number -> exact URL) ----------
  const U = {
    76: "https://dribbble.com/shots/3791748-Workflow-Animation", // Workflow Animation
    77: "https://dribbble.com/shots/26275497-Workflow-AI-Animation", // Workflow AI Animation
    78: "https://dribbble.com/shots/27247003-Data-Workflow-Animation", // Data Workflow Animation
    79: "https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design", // Product Workflow Animation & UI Motion Design
    80: "https://dribbble.com/shots/27476599-Creative-Design-Workflow-Animation", // Creative Design Workflow Animation
    81: "https://dribbble.com/shots/27600376-Clean-Workflow-Visualization-with-Motion-Graphics", // Clean Workflow Visualization with Motion Graphics
    82: "https://www.behance.net/gallery/53752435/Motion-Design-Process", // Motion Design Process
    83: "https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion", // The Process Architectural Motion
    84: "https://www.behance.net/gallery/159045079/Process-What-is-a-Motion-Designer-", // Process - What is a Motion Designer?
    85: "https://www.behance.net/gallery/190390491/Creative-process-Motion-design-creative-project", // Creative process Motion design creative project
    86: "https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm", // Workflow by a
    87: "https://lottiefiles.com/free-animation/workflow-Jt52qpU9fj", // Workflow by Muammar Faiq
    88: "https://lottiefiles.com/free-animation/automated-workflows-XR2hxXOdEK", // Automated Workflows
    89: "https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5", // Git Workflow 1
    90: "https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU", // Multi-Step Icon Animation
    91: "https://lottiefiles.com/free-animation/cro-process-RaUu5ps2to", // cro process
    92: "https://lottiefiles.com/free-animation/process-fmpDUgNx8K", // process connecting
    93: "https://lottiefiles.com/free-animation/process-para-qujCEQ2AKT", // Process-Para
    94: "https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP", // Process - Success
    95: "https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8", // contract process
    96: "https://lottiefiles.com/free-animation/process-in-cub-9iNG7QP0qC", // Process in cub
    97: "https://lottiefiles.com/free-animation/business-solution-pNyNfkcRsa", // Business Solution conveyor
    98: "https://lottiefiles.com/free-animation/factory-4XJZcnPgAb", // Factory
    99: "https://lottiefiles.com/free-animation/bottling-factory-53Q3SoGu0x", // Bottling factory
    100: "https://lottiefiles.com/free-animation/3d-statistics-factory-lRiHNeU9Y4", // 3D Statistics Factory
    101: "https://lottiefiles.com/free-animation/3d-camera-factory-2I4Nonw7Ad", // 3D Camera Factory
    102: "https://lottiefiles.com/free-animation/3d-isometric-factory-process-TJAlBgYcXw", // 3D Isometric Factory Process
    103: "https://lottiefiles.com/free-animation/data-factory-animation-I6dMAfEyrl", // Data Factory Animation
    104: "https://lottiefiles.com/free-animation/logistics-trucks-DHvuLcYVdQ", // Logistics Trucks
    105: "https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy", // World map with logistics
    106: "https://lottiefiles.com/free-animation/supply-chain-and-logistics-8PtoYRCbiu", // Supply Chain and logistics
    107: "https://lottiefiles.com/free-animation/supply-chain-and-shipping-Gd8ZsVZpXq", // Supply Chain and Shipping
    108: "https://lottiefiles.com/free-animation/delivery-truck-road-animation-K9xyRiku9v", // Delivery Truck - Road Animation
    109: "https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6", // teamwork
    110: "https://observablehq.com/@d3/animated-quadtree", // Animated quadtree
    111: "https://old.observablehq.com/@d3/hierarchy-traversal-animated", // Hierarchy traversal animated
    112: "https://motionarray.com/after-effects-templates/infographics-pack-135055/", // Infographics Pack by ARstudio
    113: "https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/", // Infographic Chart Creator
    114: "https://motionarray.com/after-effects-templates/infographics-pack-100132/", // Infographics Pack by JVARTS STUDIO
    115: "https://motionarray.com/after-effects-templates/infographics-for-everything-2593374/", // Infographics For Everything
    116: "https://motionarray.com/after-effects-templates/infographics-3844461/", // Infographics by Ruslan Klimovich
    117: "https://motionarray.com/after-effects-templates/infographics-elements-789489/", // Infographics Elements by TarZanchik
    118: "https://motionarray.com/after-effects-templates/flat-infographics-17982/", // Flat Infographics by zevs
    119: "https://motionarray.com/after-effects-templates/infographics-v2-556482/", // Infographics V2 by Typoland
    120: "https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ", // Animated Dashboards
    121: "https://lottiefiles.com/free-animation/dashboard-M05MmlnoOP", // Dashboard by RAKIBUZZAMAN
    122: "https://lottiefiles.com/free-animation/deliver-better-optimized-lottie-json-animation-Qgvgddnv8J", // Dashboard by Weblodge
    123: "https://lottiefiles.com/free-animation/dashboard-krY5yHjJRp", // DashBoard by Amit Prajapati
    124: "https://lottiefiles.com/free-animation/project-dashboard-PeJUc2p1iB", // Project Dashboard
    125: "https://lottiefiles.com/free-animation/infographics-dashboard-X6P5rVLZAB", // Infographics Dashboard
    126: "https://observablehq.com/@d3/stacked-to-grouped-bars", // Stacked-to-grouped bars
    127: "https://observablehq.com/@d3/streamgraph-transitions", // Streamgraph transitions
    128: "https://observablehq.com/@d3/pie-chart-update", // Pie chart update
    129: "https://observablehq.com/@d3/arc-tween", // Arc tween
    130: "https://observablehq.com/@d3/learn-d3-animation", // Animated line chart lesson
    131: "https://observablehq.com/@d3/transition-end", // Transition end
    132: "https://observablehq.com/@d3/easing-animations", // Easing Animations
    133: "https://observablehq.com/@d3/path-tween", // Path tween
    134: "https://observablehq.com/@d3/shape-tweening", // Shape tweening
    135: "https://motionarray.com/after-effects-templates/timeline/", // Timeline by The Creators
    136: "https://motionarray.com/after-effects-templates/project-timeline-2424919/", // Project TimeLine
    137: "https://motionarray.com/after-effects-templates/corporate-timeline-1939632/", // Corporate Timeline by HenlyFx
    138: "https://motionarray.com/after-effects-templates/scrolling-timeline-1223172/", // Scrolling Timeline
    139: "https://motionarray.com/after-effects-templates/corporate-timeline-255459/", // Corporate Timeline by Zargones
    140: "https://motionarray.com/after-effects-templates/corporate-timeline-77666/", // Corporate Timeline by MotionTores
  };

  // =====================================================================
  // O3d — Establishing the baseline before redesign (31 lines, 10 shots). Audit score 5.5 -> rebuilt.
  // Kept from the matched moments: the baseline gauge, the precise percentage, two hotels disagreeing, the verified
  // baseline, the intended target, the owner and the reporter. Every weak or mismatched line gets a new picture.
  // =====================================================================
  const waffle = (x0, y0, cell, pick) => Array.from({ length: 100 }, (_, i) => { const c = pick(i); return Ci(x0 + (i % 10) * cell, y0 + Math.floor(i / 10) * cell, cell * 0.36, c === "hole" ? C.paper : c, c === "hole" ? C.navy : "", c === "hole" ? 1.5 : 0, c === "hole" ? 'stroke-dasharray="2 2"' : ""); }).join("");
  const corr = (i) => (i * 37 + 11) % 100 < 22, miss = (i) => (i * 53 + 7) % 100 < 10;
  section("O3d", "Baseline before redesign", 31, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 21, 23, 25, 27, 28, 30], [
    // Template 094 · Process - Success (LottieFiles) — https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP
    // Adapted: "transform the activity into a check" -> the trophy waits behind a question; the three things already
    // settled turn into checks; the finance director flips the conversation from intentions to evidence.
    { ref: U[94], cap: "Recognising real improvement", n: 3,
      svg: () => hl("h0", "GENUINE IMPROVEMENT?", C.navy) + hl("h1", "ALREADY SETTLED", C.green) + hl("h2", "FROM INTENTIONS TO EVIDENCE", C.navy) +
        G("tr", 200, 200, trophy(200, 190, 3.4, C.gold) + qB(260, 120, 22) + lens(120, 270, 22, C.navy)) +
        ["PROCESS CHOSEN", "BOUNDARY CONSIDERED", "PEOPLE DISCUSSED"].map((s, i) => G("k" + i, 200, 110 + i * 70, bpill(200, 110 + i * 70, s, C.green, (x, y) => okB(x, y, 12)))).join("") +
        G("fd", 200, 210, person(60, 300, 1.6, C.gold) + coin(84, 268, 9) + T2(70, 350, "FINANCE", "DIRECTOR", { z: 17, c: C.gold }) +
          R(130, 90, 110, 120, 12, C.paper, C.navy, 3, 'stroke-dasharray="7 5"') + cloud(185, 134, 0.9, C.blue, C.navy) + T2(185, 186, "GOOD", "INTENTIONS", { z: 17, c: C.navy }) +
          arr(246, 150, 274, 150, C.green, 4) + R(280, 90, 110, 120, 12, C.paper, C.green, 3.5) + Pa("M296 160L320 140L344 146L376 104", C.green, 4) + T2(335, 186, "HARD", "EVIDENCE", { z: 17, c: C.green })),
      steps: ["+h0 +tr", "-h0 +h1 -tr +k0 +k1 +k2", "-h1 +h2 -k0 -k1 -k2 +fd"] },

    // Template 125 · Infographics Dashboard (LottieFiles) — https://lottiefiles.com/free-animation/infographics-dashboard-X6P5rVLZAB
    // Adapted: "grow the pie arc and the metric graph" -> the proposed metric (fewer rate corrections at check-in), why it
    // matters to guests and staff, and the empty 'today' column that makes any later result unprovable.
    { ref: U[125], cap: "The proposed measure", n: 3,
      svg: () => hl("h0", "FEWER RATE CORRECTIONS", C.green) + hl("h1", "WHY IT MATTERS", C.orange) + hl("h2", "TODAY'S LEVEL UNKNOWN", C.orange) +
        G("dk", 200, 220, desk(160, 240, 200, C.navy) + person(160, 222, 1.5, C.navy) + scr(240, 206, 60, 42, C.ink) + coin(240, 204, 10, C.orange) + Pa("M220 184L262 222", C.orange, 4) +
          arr(330, 150, 330, 260, C.green, 6) + T2(330, 296, "FEWER", "CORRECTIONS", { c: C.green })) +
        G("im", 200, 220, face(100, 170, 36, C.orange, -1) + T2(100, 236, "GUEST", "FRUSTRATION", { c: C.orange }) + doc(290, 160, 1.6, C.navy, 4) + doc(310, 176, 1.6, C.navy, 4) + T2(300, 236, "EXTRA RECEPTION", "WORK", { z: 17, c: C.navy })) +
        G("bc", 200, 220, Pa("M40 300H360", C.navy, 3) + R(80, 120, 90, 180, 10, "none", C.orange, 3, 'stroke-dasharray="7 5"') + Gl(125, 226, "?", 50, C.orange) + R(230, 180, 90, 120, 10, C.green, "", 0, 'opacity=".55"') +
          T2(125, 334, "TODAY", "UNKNOWN", { c: C.orange }) + T2(275, 334, "LATER", "RESULT", { c: C.green }) + Gl(200, 214, "≠", 30, C.navy) + qB(200, 170, 14)),
      steps: ["+h0 +dk", "-h0 +h1 -dk +im", "-h1 +h2 -dk -im +bc"] },

    // Template 121 · Dashboard by RAKIBUZZAMAN (LottieFiles) — https://lottiefiles.com/free-animation/dashboard-M05MmlnoOP
    // Adapted: "fill the graph and highlight the metric" -> a baseline gauge is filled before redesign starts; the manager's
    // report arrives as second-hand staff remarks; the word "frequently" has no number on the gauge.
    { ref: U[121], cap: "A baseline first", n: 3,
      svg: () => hl("h0", "BASELINE BEFORE REDESIGN", C.navy) + hl("h1", "WHAT STAFF HAVE SAID", C.orange) + hl("h2", "NOT A FREQUENCY", C.orange) +
        G("tb", 120, 200, R(96, 70, 48, 260, 24, C.paper, C.navy, 3.5) + R(104, 200, 32, 122, 16, C.green) + Pa("M84 200H156", C.navy, 4) + T2(270, 196, "MEASURED", "BEFORE REDESIGN", { c: C.navy }) +
          wrench(300, 290, 1.4, C.navy) + lockI(340, 300, 1, C.orange) + T(296, 352, "REDESIGN WAITS", { c: C.orange })) +
        G("hs", 200, 220, person(300, 270, 2, C.orange) + T2(300, 342, "FRONT-DESK", "MANAGER", { c: C.orange }) + [60, 110, 160].map((x, i) => person(x, 300, 1.2, C.navy) + bub(x, 240, 44, 30, C.navy) + Gl(x, 248, "…", 18, C.navy)).join("") +
          arr(184, 266, 266, 250, C.orange, 3, 'stroke-dasharray="5 5"')) +
        G("fq", 200, 210, bub(130, 150, 210, 64, C.orange) + T2(130, 146, "\u201CIT HAPPENS", "FREQUENTLY\u201D", { c: C.orange }) +
          R(250, 220, 120, 90, 12, C.ink) + Gl(310, 280, "?%", 40, C.gold) + noB(370, 214, 14) + T2(130, 290, "A POSSIBLE", "PROBLEM", { c: C.navy })),
      steps: ["+h0 +tb", "-h0 +h1 tb.o=0 +hs", "-h1 +h2 -hs +fq"] },

    // Template 112 · Infographics Pack by ARstudio (Motion Array) — https://motionarray.com/after-effects-templates/infographics-pack-135055/
    // Adapted: "reveal chart primitives and labels" -> one calculation for every hotel, a hundred check-ins as a unit
    // chart with the fraction beside it, the two definitions it needs, and two hotels disagreeing on the same case.
    { ref: U[112], cap: "A precise measure", n: 4,
      svg: () => hl("h0", "SAME CALCULATION, EVERY HOTEL", C.navy) + hl("h1", "CHECK-INS WITHOUT CORRECTION", C.green) + hl("h2", "DEFINE BOTH TERMS", C.navy) + hl("h3", "SAME CASE, TWO ANSWERS", C.orange) +
        G("ht", 200, 200, [80, 200, 320].map((x) => hotel(x, 180, 2.2, C.navy) + R(x - 20, 246, 40, 48, 6, C.ink) + R(x - 14, 252, 28, 12, 2, C.pale) + Gl(x, 286, "%", 16, C.paper)).join("") + T(200, 340, "ONE SHARED FORMULA", { c: C.navy })) +
        G("wf", 120, 200, waffle(30, 90, 20, (i) => (corr(i) ? C.orange : C.green)) + T2(120, 304, "ILLUSTRATIVE", "CHECK-INS", { z: 17, c: C.navy })) +
        G("fr", 310, 200, pill(310, 130, "NO CORRECTION", C.green, C.green) + Pa("M236 180H384", C.ink, 3) + pill(310, 226, "ALL CHECK-INS", C.navy, C.navy) + Gl(310, 290, "× 100 = %", 22, C.ink)) +
        G("df", 200, 220, R(20, 90, 360, 90, 14, C.paper, C.orange, 3) + qB(52, 135, 14) + T(78, 141, "WHAT IS A CORRECTION?", { a: "start", z: 17, c: C.orange }) +
          R(20, 210, 360, 90, 14, C.paper, C.navy, 3) + qB(52, 255, 14) + T(78, 261, "WHICH CHECK-INS COUNT?", { a: "start", z: 17, c: C.navy })) +
        G("tw", 200, 210, hotel(80, 170, 2.2, C.navy) + Ci(80, 270, 20, C.green) + ck(81, 271, 1, C.paper, 4) + T2(80, 320, "HOTEL A:", "NO CORRECTION", { z: 17, c: C.green }) + Gl(200, 230, "≠", 50, C.orange) +
          hotel(320, 170, 2.2, C.navy) + Ci(320, 270, 20, C.orange) + xx(320, 270, 1, C.paper, 4) + T2(320, 320, "HOTEL B:", "CORRECTION", { z: 17, c: C.orange }) + doc(200, 130, 1.3, C.navy, 3) + T(200, 90, "ONE GUEST CASE", { z: 17, c: C.navy })),
      steps: ["+h0 +ht", "-h0 +h1 -ht +wf +fr", "-h1 +h2 -wf -fr +df", "-h2 +h3 -df +tw"] },

    // Template 110 · Animated quadtree (Observable) — https://observablehq.com/@d3/animated-quadtree
    // Adapted: "add points, subdivide the region" -> the record cabinet is opened before any target, a defined period is
    // carved out and filled with enough transactions, and each property's sheet is checked against the same columns.
    { ref: U[110], cap: "Check the records", n: 3,
      svg: () => hl("h0", "RECORDS BEFORE TARGETS", C.navy) + hl("h1", "A PERIOD, ENOUGH DATA", C.navy) + hl("h2", "CONSISTENT ACROSS HOTELS?", C.orange) +
        G("cb", 200, 210, cab(110, 210, 2.6, C.navy) + lens(230, 180, 32, C.green) + Ci(310, 270, 22, C.paper, C.green, 3, 'stroke-dasharray="5 4"') + Ci(310, 270, 9, C.green) + lockI(340, 300, 0.9, C.orange) +
          T2(310, 334, "TARGET", "LATER", { c: C.orange }) + T2(110, 334, "BOOKING AND", "CHECK-IN RECORDS", { z: 17, c: C.navy })) +
        G("pd", 200, 200, cal(60, 120, 1.4, C.navy) + Pa("M96 110H380", C.navy, 3) + brk(110, 370, 96, C.green, 4) + T2(240, 62, "DEFINED", "PERIOD", { z: 17, c: C.green }) +
          Array.from({ length: 60 }, (_, i) => Ci(120 + (i % 15) * 17, 150 + Math.floor(i / 15) * 22, 6, i % 7 ? C.navy : C.green)).join("") + T(240, 270, "ENOUGH TRANSACTIONS", { c: C.navy })) +
        G("cs", 200, 220, [70, 200, 330].map((x, i) => R(x - 54, 110, 108, 150, 10, C.paper, C.navy, 3) + Pa(`M${x - 40} 140H${x + 40}M${x - 40} 170H${x + 40}M${x - 40} 200H${x + 40}M${x - 40} 230H${x + 40}`, C.navy, 2.5) +
          (i === 2 ? qB(x, 292, 14) : okB(x, 292, 14))).join("") + T(200, 346, "SAME FIELDS, SAME RULES", { c: C.navy })),
      steps: ["+h0 +cb", "-h0 +h1 -cb +pd", "-h1 +h2 -pd +cs"] },

    // Template 134 · Shape tweening (Observable) — https://observablehq.com/@d3/shape-tweening
    // Adapted: "transform the source shape into the target" -> a unit chart with holes produces a polished-looking
    // percentage that is cracked; a collection method fills the holes; the dashed baseline marker becomes solid.
    { ref: U[134], cap: "Reliable or misleading", n: 3,
      svg: () => hl("h0", "PRECISE BUT MISLEADING", C.orange) + hl("h1", "COLLECT, DON'T INVENT", C.green) + hl("h2", "VERIFIED, THEN CONFIRMED", C.green) +
        G("wh", 120, 200, waffle(30, 90, 20, (i) => (miss(i) ? "hole" : corr(i) ? C.orange : C.green))) +
        G("pc", 310, 200, R(240, 120, 140, 110, 14, C.ink) + Gl(310, 194, "##.#%", 30, C.gold) + Pa("M276 120L300 160L286 190L310 230", C.paper, 3) + T2(310, 270, "LOOKS", "EXACT", { c: C.orange })) +
        G("fl", 120, 200, waffle(30, 90, 20, (i) => (corr(i) ? C.orange : C.green))) +
        G("cm", 310, 200, R(266, 96, 90, 120, 8, C.paper, C.green, 3) + R(290, 88, 42, 16, 4, C.green) + [0, 1, 2].map((i) => ck(290, 130 + i * 28, 0.6, C.green, 3) + Pa(`M304 ${130 + i * 28}H344`, C.green, 3)).join("") +
          T2(310, 248, "COLLECTION", "METHOD", { c: C.green }) + R(260, 290, 100, 40, 8, C.gold) + Gl(310, 318, "!!", 22, C.ink) + Pa("M254 284L366 336", C.orange, 4) + T(310, 362, "NEVER INVENTED", { z: 17, c: C.orange })) +
        G("bl", 200, 210, R(96, 70, 48, 260, 24, C.paper, C.navy, 3.5) + R(104, 210, 32, 112, 16, C.green)) +
        G("bu", 200, 210, Pa("M80 210H160", C.navy, 4, 'stroke-dasharray="8 6"') + T2(250, 206, "BASELINE", "UNCONFIRMED", { c: C.orange })) +
        G("bv", 280, 290, R(240, 260, 80, 64, 8, C.paper, C.navy, 3) + [0, 1].map((i) => ck(262, 280 + i * 22, 0.55, C.green, 3) + Pa(`M276 ${280 + i * 22}H306`, C.navy, 3)).join("") + T2(280, 350, "UNTIL GATHERED", "AND CHECKED", { z: 17, c: C.navy })),
      steps: ["+h0 +wh +pc", "-h0 +h1 -wh -pc +fl +cm", "-h1 +h2 -fl -cm +bl +bu +bv"] },

    // Template 129 · Arc tween (Observable) — https://observablehq.com/@d3/arc-tween
    // Adapted: "rotate the arc endpoint to a new value" -> the managers agree where the target sits on the gauge; the
    // target stays dashed (intended) beside the solid baseline (shown); three inputs set where it lands.
    { ref: U[129], cap: "Set a realistic target", n: 3,
      svg: () => hl("h0", "AGREE A REALISTIC TARGET", C.green) + hl("h1", "INTENDED, NOT ACHIEVED", C.navy) + hl("h2", "WHAT SHAPES THE TARGET", C.green) +
        G("ga", 200, 200, Pa("M80 240A120 120 0 0 1 320 240", C.blue, 26) + Pa("M80 240A120 120 0 0 1 150 140", C.navy, 26) + Ci(200, 240, 10, C.ink)) +
        G("nd", 200, 240, Pa("M200 240L120 164", C.ink, 5)) +
        G("tg", 200, 200, Pa("M262 134L280 112", C.green, 6, 'stroke-dasharray="5 4"') + T2(330, 90, "AGREED", "TARGET", { z: 17, c: C.green }) + person(120, 320, 1.2, C.navy) + person(280, 320, 1.2, C.gold) + Pa("M140 316H260", C.green, 4) + ck(200, 300, 1, C.green, 4)) +
        G("cp", 200, 200, R(84, 266, 100, 40, 8, C.navy) + T2(134, 334, "BASELINE", "SHOWN", { z: 17, c: C.navy }) +
          R(216, 252, 100, 54, 8, "none", C.green, 3.5, 'stroke-dasharray="7 5"') + T2(266, 334, "TARGET", "INTENDED", { z: 17, c: C.green })) +
        G("in", 200, 200, [["ORGANISATIONAL AMBITION", (x, y) => star(x, y, 18)], ["AVAILABLE RESOURCES", (x, y) => coin(x, y, 15)], ["WHAT INVESTIGATION SUGGESTS", (x, y) => lens(x - 4, y - 4, 13, C.green)]].map(([s, f], i) =>
          f(50, 120 + i * 80) + T(80, 126 + i * 80, s, { a: "start", z: 17, c: C.ink }) + arr(330, 120 + i * 80, 360, 200, C.green, 2.5)).join("") + Ci(370, 210, 16, C.paper, C.green, 3, 'stroke-dasharray="4 3"') + Ci(370, 210, 6, C.green)),
      steps: ["+h0 +ga +nd nd.r=110 +tg", "-h0 +h1 -tg +cp", "-h1 +h2 -cp -ga -nd +in"] },

    // Template 093 · Process-Para (LottieFiles) — https://lottiefiles.com/free-animation/process-para-qujCEQ2AKT
    // Adapted: "rotate, wait, finish" -> the reporting cycle turns on a calendar with a named reporter; the process owner
    // stands above it, accountable for the result the cycle reports.
    { ref: U[93], cap: "Reporting the figures", n: 2,
      svg: () => hl("h0", "WHO REPORTS, HOW OFTEN", C.navy) + hl("h1", "OWNER AND REPORTER", C.green) +
        G("cy", 200, 210, Ci(200, 210, 90, "none", C.navy, 4, 'stroke-dasharray="16 10" class="vlw-spin"') + cal(200, 210, 2, C.navy) + [0, 1, 2, 3].map((i) => { const a = rad(-90 + i * 90); return Ci(200 + 90 * Math.cos(a), 210 + 90 * Math.sin(a), 10, C.green); }).join("") +
          person(70, 300, 1.4, C.navy) + T2(80, 350, "NAMED", "REPORTER", { c: C.navy }) + T2(320, 340, "REGULAR", "REVIEW", { c: C.navy })) +
        G("ow", 200, 200, person(110, 160, 2, C.green) + gear(150, 120, 12, C.navy) + T2(110, 238, "PROCESS OWNER:", "ACCOUNTABLE", { z: 17, c: C.green }) +
          person(290, 170, 1.6, C.navy) + doc(330, 186, 1, C.navy, 3) + T2(296, 238, "REPORTER:", "EVIDENCE READY", { z: 17, c: C.navy }) + arr(130, 290, 270, 290, C.green, 3) + T(200, 330, "FIGURES FLOW UP", { c: C.green })),
      steps: ["+h0 +cy", "-h0 +h1 -cy +ow"] },

    // Template 127 · Streamgraph transitions (Observable) — https://observablehq.com/@d3/streamgraph-transitions
    // Adapted: "morph the series areas over time" -> the correction count can fall because the recording changed or because
    // guests are better off; the complaint and delay series are added to tell the two apart.
    { ref: U[127], cap: "Does the guest benefit?", n: 2,
      svg: () => hl("h0", "REAL CHANGE OR RELABELLING?", C.orange) + hl("h1", "CHECK THE GUEST'S SIDE", C.green) +
        G("rl", 200, 210, Ci(80, 170, 22, C.orange) + arr(110, 170, 160, 170, C.navy, 4) + Ci(190, 170, 22, C.green) + Gs(150, 130, 1.2, R(-4, -24, 8, 34, 2, C.ink) + Fi("M-6 10H6L0 22Z", C.orange)) +
          T2(136, 236, "RECORDED", "DIFFERENTLY", { c: C.orange }) + face(310, 170, 34, C.navy, 0) + qB(344, 130, 13) + T2(310, 236, "SAME GUEST", "EXPERIENCE?", { c: C.navy })) +
        G("sg", 200, 210, Pa("M30 300H370", C.navy, 3) + Fi("M30 300L30 200Q120 190 200 230T370 270V300Z", C.orange, 'opacity=".55"') + Fi("M30 300L30 240Q120 236 200 262T370 286V300Z", C.gold, 'opacity=".7"') +
          T(40, 186, "GUEST COMPLAINTS", { a: "start", z: 17, c: C.orange }) + T(220, 196, "ARRIVAL DELAYS", { a: "start", z: 17, c: C.gold }) + face(340, 140, 26, C.green, 1) + okB(370, 110, 12)),
      steps: ["+h0 +rl", "-h0 +h1 -rl +sg"] },

    // Template 139 · Corporate Timeline by Zargones (Motion Array) — https://motionarray.com/after-effects-templates/corporate-timeline-255459/
    // Adapted: "introduce events and shift focus" -> defining a measure is not an improvement; the honest test waits at
    // the end; the baseline is carried to Realise Value; the pieces gather; the one-page record comes next.
    { ref: U[139], cap: "Promise, then proof", n: 5,
      svg: () => hl("h0", "NO IMPROVEMENT SHOWN YET", C.orange) + hl("h1", "AN HONEST TEST LATER", C.navy) + hl("h2", "CARRIED TO REALISE VALUE", C.green) + hl("h3", "BRING IT TOGETHER", C.navy) + hl("h4", "THE DECISION RECORD NEXT", C.green) +
        G("ny", 200, 210, R(20, 110, 120, 80, 12, C.paper, C.navy, 3) + T2(80, 146, "MEASURE", "DEFINED", { z: 17, c: C.navy }) + Gl(150, 160, "+", 30, C.navy) +
          R(160, 110, 100, 80, 12, C.paper, C.green, 3, 'stroke-dasharray="7 5"') + T2(210, 146, "TARGET", "SET", { z: 17, c: C.green }) + Gl(276, 160, "≠", 30, C.orange) +
          R(290, 110, 100, 80, 12, "none", C.orange, 3, 'stroke-dasharray="7 5"') + T2(340, 146, "PROVEN", "GAIN", { z: 17, c: C.orange }) + R(84, 240, 232, 54, 10, C.paper, C.orange, 4) + T(200, 275, "NOT YET PROVEN", { z: 22, c: C.orange })) +
        G("hn", 200, 220, Pa("M30 300H300", C.navy, 5) + Mv("Mw", [[40, 280], [250, 280]], wrench(0, 0, 1, C.navy)) +
          Pa("M340 150V300M290 170H390", C.navy, 4) + Pa("M290 170L276 210H304ZM390 170L376 210H404Z", C.navy, 3) + T2(330, 340, "RESULTS", "JUDGED", { c: C.navy }) + T(150, 340, "WORK COMPLETED", { c: C.green })) +
        G("rv", 200, 210, Pa("M40 230H360", C.navy, 5) + Ci(60, 230, 24, C.orange) + Gl(60, 238, "3", 22, C.paper) + Ci(340, 230, 24, C.green) + Gl(340, 238, "9", 22, C.paper) +
          T2(60, 286, "LAUNCH", "PAD", { c: C.orange }) + T2(340, 286, "REALISE", "VALUE", { c: C.green }) + Mv("Mb", [[90, 200], [310, 200]], R(-22, -14, 44, 28, 6, C.navy) + Pa("M-14 0H14", C.paper, 3)) + T(200, 150, "AGREED BASELINE", { c: C.navy })) +
        G("pc", 200, 210, [[90, 120, C.green, CAND[0]], [310, 120, C.green, (x, y) => brk(x - 20, x + 20, y - 6, C.green, 4)], [90, 290, C.navy, (x, y) => person(x, y + 6, 0.9, C.navy)], [310, 290, C.navy, (x, y) => coin(x, y, 14)]].map(([x, y, c, f]) =>
          R(x - 50, y - 40, 100, 80, 12, C.paper, c, 3) + f(x, y) + arr(x + (x < 200 ? 54 : -54), y + (y < 200 ? 40 : -40), 200 + (x - 200) * 0.3, 205 + (y - 205) * 0.3, c, 3)).join("") + Ci(200, 205, 26, C.gold, C.ink, 2)) +
        G("dr", 200, 210, R(110, 70, 180, 240, 14, C.paper, C.green, 4) + [0, 1, 2, 3, 4].map((i) => okB(136, 104 + i * 40, 10) + Pa(`M154 ${104 + i * 40}H${270 - (i % 2) * 24}`, C.ink, 3)).join("") + T(200, 346, "ONE-PAGE RECORD", { c: C.green })),
      steps: ["+h0 +ny", "-h0 +h1 -ny +hn Mw@1", "-h1 +h2 -hn +rv Mb@1", "-h2 +h3 -rv +pc", "-h3 +h4 -pc +dr"] }
  ]);

  // =====================================================================
  // O3e — The one-page Launch Pad decision (32 lines, 10 shots). Audit score 3.5 -> rebuilt first.
  // Each commitment named in the narration gets its own picture: the closing meeting, the recommendation,
  // the billing trade-off, the three kinds of work, the boundary, the people, the measure, benefits and
  // risks, confirmed versus assumed, and the hand-over to the Understand team.
  // =====================================================================
  section("O3e", "The one-page decision", 32, [0, 2, 4, 6, 7, 8, 10, 12, 13, 15, 17, 19, 21, 23, 25, 27, 28, 30], [
    // Template 124 · Project Dashboard (LottieFiles) — https://lottiefiles.com/free-animation/project-dashboard-PeJUc2p1iB
    // Adapted: "reveal data, then collaborators" -> the steering table fills, then the four candidate cards and the
    // two constraints (one delivery team, six-month review) drop onto the board.
    { ref: U[124], cap: "Closing the Launch Pad", n: 2,
      svg: () => hl("h0", "CLOSING THE LAUNCH PAD") + hl("h1", "FOUR CANDIDATES, ONE TEAM") +
        G("mgr", 200, 222, [98, 160, 240, 302].map((x, i) => person(x, 222, 1.55, i % 2 ? C.navy : C.green)).join("")) +
        G("tbl", 200, 268, El(200, 268, 165, 40, C.blue, C.navy, 3) + doc(156, 264, 0.85, C.navy, 2) + doc(244, 264, 0.85, C.navy, 2)) +
        G("dir", 360, 240, person(360, 236, 1.6, C.orange) + doc(386, 254, 0.8, C.orange, 3)) +
        G("sg", 200, 346, pill(200, 346, "STEERING GROUP", C.navy)) +
        [0, 1, 2, 3].map((i) => G("c" + i, 58 + i * 95, 116, card(58 + i * 95, 116, 84, 82, CCOL[i], CAND[i](58 + i * 95, 118, 1.3)))).join("") +
        G("team", 100, 348, person(44, 352, 1.2, C.navy) + T(70, 358, "ONE TEAM", { a: "start", c: C.navy })) +
        G("six", 300, 348, clock(244, 350, 22, C.orange, 180) + T(274, 357, "SIX MONTHS", { a: "start", c: C.orange })),
      steps: ["+mgr +tbl +dir +h0 +sg !dir", "-h0 +h1 -sg +c0 +c1 +c2 +c3 +team +six"] },

    // Template 119 · Infographics V2 by Typoland (Motion Array) — https://motionarray.com/after-effects-templates/infographics-v2-556482/
    // Adapted: "reveal statistic modules" -> one module per reason: complaints that started the programme,
    // four functions x fourteen properties, the sponsor-support bars, the three strengths, then the risks left.
    { ref: U[119], cap: "Recommending guest arrival", n: 4,
      svg: () => hl("h0", "RECOMMEND GUEST ARRIVAL", C.green) + hl("h1", "STRONGEST SPONSOR SUPPORT") + hl("h2", "WHY IT LEADS", C.green) + hl("h3", "RISKS STILL REMAIN", C.orange) +
        G("gst", 72, 108, CAND[0](72, 106, 1.8) + T2(72, 160, "GUEST", "COMPLAINTS", { c: C.green })) +
        Ln("Lc", "M120 96Q200 34 280 96", C.orange, 3, 'stroke-dasharray="6 7"') +
        G("cm", 200, 70, exB(156, 74, 13) + exB(200, 58, 13) + exB(244, 74, 13)) +
        G("rk", 330, 108, rocket(330, 112, 1.35, C.orange) + T2(330, 160, "PROGRAMME", "STARTED", { c: C.orange })) +
        G("lanes", 200, 255, T(30, 207, "FOUR FUNCTIONS", { a: "start", c: C.navy }) +
          [JI.book, JI.rate, JI.desk, JI.room].map((f, i) => R(74, 216 + i * 25, 300, 18, 9, C.pale, CCOL[i], 3) + f(50, 225 + i * 25)).join("")) +
        G("hot", 200, 330, Array.from({ length: 14 }, (_, i) => hotel(40 + i * 24.6, 330, 0.55, i % 2 ? C.navy : C.green)).join("") + T(200, 370, "14 PROPERTIES", { c: C.navy })) +
        G("spg", 200, 250, Pa("M36 326H372", C.navy, 3) +
          G("B0", 80, 326, R(54, 156, 52, 170, 7, C.green)) + G("B1", 160, 326, R(134, 282, 52, 44, 7, C.navy)) +
          G("B2", 240, 326, R(214, 320, 52, 6, 3, C.orange)) + G("B3", 320, 326, R(294, 240, 52, 86, 7, C.gold)) +
          [0, 1, 2, 3].map((i) => CAND[i](80 + i * 80, 354, 0.72)).join("") +
          noB(160, 258, 14) + qB(240, 292, 16) + Ci(320, 214, 14, C.paper, C.navy, 2.5) + Fi("M320 200A14 14 0 0 1 320 228Z", C.gold)) +
        G("spn", 80, 120, person(80, 128, 1.25, C.orange) + crown(80, 93, 1) + T2(180, 128, "FRONT-OFFICE", "DIRECTOR", { c: C.orange })) +
        ["STRATEGIC RELEVANCE", "VISIBLE PROBLEMS", "MANAGEABLE OPPORTUNITY"].map((s, i) => G("k" + i, 200, 96 + i * 66, bpill(200, 96 + i * 66, s, C.green, (x, y) => okB(x, y, 12)))).join("") +
        G("gbig", 200, 316, CAND[0](200, 318, 2)) +
        [0, 1, 2].map((i) => G("w" + i, 374, 96 + i * 66, warn(374, 98 + i * 66, 1, C.orange))).join(""),
      steps: [
        "+h0 +gst +Lc +cm +rk +lanes +hot",
        "-h0 +h1 -gst -Lc -cm -rk -lanes -hot +spg +B0 +B1 +B2 +B3 +spn",
        "-h1 +h2 -spg -spn +k0 +k1 +k2 +gbig",
        "-h2 +h3 +w0 +w1 +w2 ~gbig"] },

    // Template 126 · Stacked-to-grouped bars (Observable) — https://observablehq.com/@d3/stacked-to-grouped-bars
    // Adapted: "reposition bars while preserving identity" -> billing (left) and guest arrival (right) are compared
    // side by side; each criterion bar keeps its column; the trade-off is then written into one ledger.
    { ref: U[126], cap: "Weighing the rival", n: 4,
      svg: () => hl("h0", "THE STRONGEST RIVAL", C.orange) + hl("h1", "VALUE, BUT OPPOSED", C.orange) + hl("h2", "SPONSOR, NEEDS COOPERATION", C.green) + hl("h3", "TRADE-OFF RECORDED", C.navy) +
        G("hdA", 105, 70, T2(105, 70, "CORPORATE", "BILLING", { c: C.navy })) + G("hdB", 295, 70, T2(295, 70, "GUEST", "ARRIVAL", { c: C.green })) +
        G("dv", 200, 210, Pa("M200 60V360", C.navy, 2, 'stroke-dasharray="5 7" opacity=".5"')) +
        G("tw", 104, 150, hotel(70, 150, 1.5, C.navy) + hotel(138, 150, 1.5, C.navy) + noB(90, 120, 12) + noB(158, 120, 12)) +
        G("twl", 105, 210, T2(105, 208, "TWO ACCOUNTS", "LOST", { c: C.orange })) +
        G("B0", 62, 336, R(41, 246, 42, 90, 6, C.navy)) + G("vl", 82, 360, T(82, 362, "STRONG VALUE", { c: C.navy })) +
        G("opp", 150, 296, person(150, 306, 1.4, C.orange) + Pa("M135 308L165 316M135 316L165 308", C.paper, 3) + noB(176, 284, 12) + T2(152, 248, "DIRECTOR", "OPPOSES", { c: C.orange })) +
        G("sp", 270, 150, person(258, 162, 1.45, C.green) + crown(258, 124, 1) + T2(334, 150, "VOLUNTEER", "SPONSOR", { c: C.green })) +
        Ln("Lch", "M236 262H282M328 262H374", C.green, 5) +
        G("nodes", 305, 262, [JI.book, JI.rate, JI.desk, JI.room].map((f, i) => node(236 + i * 46, 262, 18, CCOL[i]) + f(236 + i * 46, 262)).join("")) +
        G("coop", 300, 300, Pa("M286 262H324", C.orange, 4, 'stroke-dasharray="4 5"') + qB(305, 232, 12) + T2(300, 308, "NEEDS", "COOPERATION", { c: C.orange })) +
        G("led", 200, 205, card(200, 205, 250, 210, C.navy, Pa("M200 125V285", C.navy, 2) +
          hotel(150, 170, 1, C.navy) + noB(163, 152, 9) + crown(250, 166, 0.9) + person(250, 196, 0.8, C.green) +
          [0, 1, 2].map((i) => Pa(`M110 ${222 + i * 20}H188M212 ${222 + i * 20}H290`, C.ink, 3)).join("") + ck(150, 278, 0.8) + ck(250, 278, 0.8))),
      steps: [
        "+h0 +hdA +hdB +dv +tw +twl !tw",
        "-h0 +h1 +B0 +vl +opp",
        "-h1 +h2 +sp +Lch +nodes +coop",
        "-h2 +h3 ~tw ~twl ~B0 ~vl ~opp ~sp ~Lch ~nodes ~coop +led"] },

    // Template 089 · Git Workflow 1 (LottieFiles) — https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5
    // Adapted: "branch, merge and reconnect" -> each remaining candidate is examined, then the work branches into
    // three separate lines: the BPM project, deferred improvements and mandatory compliance.
    { ref: U[89], cap: "Three kinds of work", n: 4,
      svg: () => hl("h0", "ROOM RELEASE PLACED", C.navy) + hl("h1", "DIGITAL RECORD: MANDATORY", C.orange) + hl("h2", "ACCOUNTABLE LEADERSHIP", C.orange) + hl("h3", "THREE KINDS OF WORK", C.navy) +
        G("hr", 200, 196, CAND[3](92, 196, 2.3) + bed(194, 112, 0.6) + bed(194, 134, 0.6) + T(222, 132, "HIGH VOLUME", { a: "start", c: C.navy }) +
          Pa("M180 206V192H210V206", C.green, 4) + T(222, 206, "NARROW SCOPE", { a: "start", c: C.green }) +
          Ci(196, 270, 15, C.paper, C.navy, 2.5) + Fi("M196 255A15 15 0 0 1 196 285Z", C.gold) + T2(222, 266, "NEUTRAL", "SPONSORSHIP", { a: "start", c: C.navy })) +
        G("hd", 200, 190, cal(92, 180, 2.3, C.orange) + Gl(92, 200, "JAN", 24, C.orange) + lockI(144, 230, 1.25, C.orange) +
          exB(198, 132, 14) + T2(222, 128, "JANUARY", "DEADLINE", { a: "start", c: C.orange }) +
          Ci(198, 222, 14, C.orange) + Pa("M191 222H205", C.paper, 3) + T2(222, 218, "CANNOT BE", "POSTPONED", { a: "start", c: C.orange })) +
        Ln("Lcl", "M36 320H364", C.orange, 7) +
        G("hc", 200, 320, person(66, 314, 1.3, C.orange) + shield(100, 298, 0.9, C.orange) + T(238, 356, "SEPARATE WORKSTREAM", { c: C.orange })) +
        G("lanes", 200, 210, [["BPM PROJECT", 110, C.green], ["DEFERRED FOR NOW", 210, C.navy], ["COMPLIANCE TRACK", 310, C.orange]].map(([s, y, c]) =>
          Pa(`M26 ${y}H384`, c, 7, 'opacity=".75"') + Ci(26, y, 8, c) + T(26, y - 20, s, { a: "start", c })).join("")) +
        G("t0", 300, 110, node(300, 110, 26, C.green, CAND[0](300, 112, 0.85))) +
        G("t1", 262, 210, node(262, 210, 26, C.navy, CAND[1](262, 212, 0.85))) +
        G("t3", 338, 210, node(338, 210, 26, C.gold, CAND[3](338, 212, 0.85))) +
        G("t2", 300, 310, node(300, 310, 26, C.orange, CAND[2](300, 312, 0.85))),
      steps: [
        "+h0 +hr",
        "-h0 +h1 -hr +hd",
        "-h1 +h2 +Lcl +hc",
        "-h2 +h3 -hd -Lcl -hc +lanes +t0 +t1 +t3 +t2"] },

    // Template 078 · Data Workflow Animation (Dribbble) — https://dribbble.com/shots/27247003-Data-Workflow-Animation
    // Adapted: "activate nodes and links in sequence" -> the booking packet runs from booking confirmed to the
    // first night's bill; start and end flags plant, exclusions grey out, and only Reservations' handoff joins.
    { ref: U[78], cap: "Boundary on the page", n: 4,
      svg: () => {
        const X = [64, 132, 200, 268, 336], Y = 200, ic = [JI.book, JI.rate, JI.guest, JI.key, JI.bill];
        const lab = [["BOOKING", "CONFIRMED"], ["RATE AND", "ROOM"], ["GUEST", "ARRIVES"], ["CHECK-IN", "DONE"], ["FIRST NIGHT", "BILLED"]];
        return hl("h0", "WHERE IT BEGINS", C.green) + hl("h1", "WHERE IT ENDS", C.green) + hl("h2", "OUTSIDE THIS PROJECT", C.orange) + hl("h3", "UPSTREAM INFO ONLY", C.navy) +
          Pa(`M${X[0]} ${Y}H${X[4]}`, C.blue, 9) + Ln("Lfl", `M${X[0]} ${Y}H${X[4]}`, C.green, 6) +
          X.map((x, i) => G("n" + i, x, Y, node(x, Y, 25, i === 0 || i === 4 ? C.green : C.navy, Gs(x, Y, 1.25, [ic[i]][0](0, 0))) +
            T2(x, i % 2 ? 144 : 246, lab[i][0], lab[i][1], { z: 17, c: C.ink }))).join("") +
          G("fS", 50, 172, flag(48, 176, 1.05, C.green)) + G("fE", 350, 172, flag(352, 176, 1.05, C.green)) +
          G("brk", 200, 110, brk(30, 370, 114, C.green, 4) + T(200, 102, "GUEST-ARRIVAL PROJECT", { c: C.green })) +
          Mv("Mp", X.map((x) => [x, Y - 36]), Ci(0, 0, 10, C.gold, C.ink, 2) + Pa("M-5 0H5M0 -5V5", C.ink, 2)) +
          G("out", 200, 322, `<g opacity=".6">${R(26, 280, 348, 96, 14, "none", C.navy, 2, 'stroke-dasharray="6 6"')}</g>` +
            [["LATER", "SERVICES"], ["GUEST", "CHECKOUT"], ["POST-STAY", "ISSUES"]].map(([a, b], i) =>
              node(88 + i * 112, 306, 20, C.navy, [JI.desk, JI.out, JI.bill][i](88 + i * 112, 306)) + noB(104 + i * 112, 290, 10) + T2(88 + i * 112, 344, a, b, { z: 17, c: C.navy })).join("")) +
          G("res", 200, 322, hotel(44, 322, 1.3, C.orange) + R(80, 302, 56, 40, 9, C.paper, C.green, 3) + cal(108, 322, 0.62, C.green) +
            [0, 1, 2].map((i) => R(150 + i * 64, 302, 54, 40, 9, C.pale, C.navy, 2, 'opacity=".6"') + Pa(`M${163 + i * 64} 322H${173 + i * 64}M${179 + i * 64} 322H${189 + i * 64}`, C.navy, 3, 'opacity=".6"')).join("") +
            T(250, 366, "REST UNTOUCHED", { c: C.navy })) +
          Ln("Lup", "M104 300Q92 270 70 228", C.green, 3.5, 'stroke-dasharray="5 5"');
      },
      steps: [
        "+h0 +n0 +n1 +n2 +n3 +n4 +fS +Mp Mp@0",
        "-h0 +h1 +Lfl Mp@1 +fE +brk",
        "-h1 +h2 +out",
        "-h2 +h3 -out +res +Lup n0.s=1.1"] },

    // Template 109 · teamwork (LottieFiles) — https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6
    // Adapted: "add people and reveal team" -> sponsor first (key opens the barrier), the empty owner chair,
    // the six groups that must be involved, then the three-part engagement plan.
    { ref: U[109], cap: "People and authority", n: 4,
      svg: () => hl("h0", "SPONSOR REMOVES BARRIERS", C.green) + hl("h1", "OWNER STILL UNCONFIRMED", C.orange) + hl("h2", "WHO MUST BE INVOLVED", C.navy) + hl("h3", "ENGAGEMENT PLAN", C.green) +
        G("sp", 78, 110, person(78, 116, 1.6, C.green) + crown(78, 74, 1.05) + T2(78, 168, "PROPOSED", "SPONSOR", { c: C.green })) +
        G("key", 148, 112, keyI(150, 114, 1.2)) +
        G("wl", 204, 112, wall(172, 76, 66, 72, C.orange)) +
        G("own", 318, 112, chairE(318, 120, 1.45, C.orange) + gear(360, 84, 10, C.navy) + T2(318, 168, "OWNER TO", "CONFIRM", { c: C.orange })) +
        G("stk", 200, 280, [["RESERVATIONS", "TEAM", JI.book], ["REVENUE", "TEAM", JI.rate], ["HOUSEKEEPING", "TEAM", JI.room],
          ["FRONT-DESK", "STAFF", JI.desk], ["FINANCE", "TEAM", JI.bill], ["CUSTOMER", "REPS", JI.guest]].map(([a, b, f], i) => {
          const x = 70 + (i % 3) * 130, y = i < 3 ? 226 : 304;
          return node(x, y, 19, CCOL[i % 4], f(x, y)) + T2(x, y + 36, a, b, { z: 17, c: C.ink });
        }).join("")) +
        ["WHAT EACH CONTRIBUTES", "DECISION RIGHTS", "ESCALATION ROUTE"].map((s, i) => G("p" + i, 200, 232 + i * 54, bpill(200, 232 + i * 54, s, C.green, (x, y) => okB(x, y, 12)))).join(""),
      steps: [
        "+h0 +sp +key +wl wl.y=60 wl.o=0.15 key.x=40 !wl",
        "-h0 +h1 +own",
        "-h1 +h2 +stk",
        "-h2 +h3 -stk +p0 +p1 +p2"] },

    // Template 125 · Infographics Dashboard (LottieFiles) — https://lottiefiles.com/free-animation/infographics-dashboard-X6P5rVLZAB
    // Adapted: "grow pie arc and metric graph" -> a check-in donut and its fraction, then the three measurement
    // commitments: baseline from verified records, target and reporting owner still to be agreed.
    { ref: U[125], cap: "The measurement commitment", n: 2,
      svg: () => hl("h0", "THE PROPOSED MEASURE", C.navy) + hl("h1", "VERIFY, THEN AGREE", C.green) +
        G("dn", 108, 196, ring(108, 190, 72, C.orange, 26) + Gl(108, 204, "%", 40, C.navy) + T2(108, 298, "CHECK-INS", "WITHOUT CORRECTION", { z: 17, c: C.green })) +
        Ln("Lar", "M108 118A72 72 0 1 1 50 232", C.green, 26, 'stroke-linecap="butt"') +
        G("fr", 296, 200, pill(296, 150, "NO CORRECTION", C.green) + Pa("M212 196H380", C.ink, 3) + pill(296, 242, "ALL CHECK-INS", C.navy) + Gl(296, 300, "× 100", 24, C.ink)) +
        G("r0", 200, 110, cab(48, 108, 1, C.navy) + T(86, 116, "BASELINE FROM RECORDS", { a: "start", c: C.navy }) + okB(368, 110, 15)) +
        G("r1", 200, 200, Ci(48, 200, 22, C.paper, C.green, 3, 'stroke-dasharray="5 4"') + Ci(48, 200, 9, C.green) + T(86, 206, "TARGET TO AGREE", { a: "start", c: C.green }) +
          R(326, 182, 58, 36, 7, "none", C.orange, 2.5, 'stroke-dasharray="5 4"') + qB(355, 200, 12)) +
        G("r2", 200, 290, person(48, 296, 1.25, C.navy) + T(86, 296, "REPORTER TO AGREE", { a: "start", c: C.navy }) +
          R(326, 272, 58, 36, 7, "none", C.orange, 2.5, 'stroke-dasharray="5 4"') + qB(355, 290, 12)),
      steps: ["+h0 +dn +Lar +fr", "-h0 +h1 -dn -Lar -fr +r0 +r1 +r2"] },

    // Template 117 · Infographics Elements by TarZanchik (Motion Array) — https://motionarray.com/after-effects-templates/infographics-elements-789489/
    // Adapted: "reveal shapes and data" -> a benefits column and a risks column; the sponsor then hangs an owner
    // tag on every risk and the "automatic approval" stamp is struck through.
    { ref: U[117], cap: "Benefits and risks", n: 2,
      svg: () => hl("h0", "BENEFITS AND RISKS", C.navy) + hl("h1", "OWNERS FOR EVERY RISK", C.orange) +
        G("bh", 100, 72, T(100, 78, "EXPECTED BENEFITS", { z: 17, c: C.green })) + G("rh", 300, 72, T(300, 78, "RISKS TO MANAGE", { c: C.orange })) +
        G("b0", 100, 146, star(36, 146, 22) + T2(64, 142, "FEWER", "CORRECTIONS", { a: "start", c: C.green })) +
        G("b1", 100, 236, star(36, 236, 22) + T2(64, 232, "SMOOTHER", "ARRIVALS", { a: "start", c: C.green })) +
        G("k0", 300, 146, warn(222, 146, 1.25) + T2(246, 142, "DEPARTMENT", "RESISTANCE", { a: "start", c: C.orange })) +
        G("k1", 300, 236, warn(222, 236, 1.25) + T2(246, 232, "UNRELIABLE", "INFORMATION", { a: "start", c: C.orange })) +
        G("sp", 52, 316, person(52, 320, 1.5, C.green) + crown(52, 279, 0.9)) +
        Ln("La", "M80 300Q200 250 374 186", C.green, 3, 'stroke-dasharray="5 5"') + Ln("Lb", "M80 308Q230 290 374 272", C.green, 3, 'stroke-dasharray="5 5"') +
        G("o0", 376, 180, person(378, 190, 0.7, C.navy)) + G("o1", 376, 266, person(378, 276, 0.7, C.navy)) +
        G("st", 246, 336, pill(246, 340, "NOT AUTOMATIC APPROVAL", C.orange) + Pa("M112 340H380", C.orange, 3)),
      steps: ["+h0 +bh +rh +b0 +b1 +k0 +k1", "-h0 +h1 +sp +La +Lb +o0 +o1 +st"] },

    // Template 094 · Process - Success (LottieFiles) — https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP
    // Adapted: "transform activity into check" -> confirmed items become solid checks, assumptions stay as dashed
    // question marks, and the decision receives a CONDITIONAL stamp instead of a plain approval.
    { ref: U[94], cap: "Confirmed versus assumed", n: 2,
      svg: () => hl("h0", "CONFIRMED VERSUS ASSUMED", C.navy) + hl("h1", "ENDORSED CONDITIONALLY", C.orange) +
        G("cA", 105, 74, T(105, 80, "CONFIRMED NOW", { c: C.green })) + G("cB", 300, 74, T(300, 80, "STILL ASSUMED", { c: C.orange })) +
        [["CHOSEN", "PROCESS"], ["AGREED", "BOUNDARY"], ["MEASURE", "DEFINED"]].map(([a, b], i) => G("a" + i, 105, 132 + i * 66,
          R(12, 104 + i * 66, 186, 56, 14, C.paper, C.green, 3) + okB(36, 132 + i * 66, 13) + T2(60, 128 + i * 66, a, b, { a: "start", z: 17, c: C.green }))).join("") +
        [["PROCESS", "OWNER"], ["BASELINE", "DATA"], ["FULL", "COOPERATION"]].map(([a, b], i) => G("q" + i, 300, 132 + i * 66,
          R(204, 104 + i * 66, 186, 56, 14, C.paper, C.orange, 3, 'stroke-dasharray="7 5"') + qB(228, 132 + i * 66, 13) + T2(252, 128 + i * 66, a, b, { a: "start", z: 17, c: C.orange }))).join("") +
        G("stp", 200, 338, R(84, 310, 232, 56, 10, C.paper, C.orange, 5) + T(200, 346, "CONDITIONAL YES", { z: 24, c: C.orange })),
      steps: ["+h0 +cA +cB +a0 +a1 +a2 +q0 +q1 +q2", "-h0 +h1 +stp stp.r=-4 q0.x=-4 q1.x=-4 q2.x=-4"] },

    // Template 095 · contract process (LottieFiles) — https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8
    // Adapted: "reveal proposal and agreement" -> the one-page record travels to the Understand team, the crystal
    // ball (predicted solution) is struck out, the open evidence is listed, and the same page template turns to you.
    { ref: U[95], cap: "Hand it to Understand", n: 4,
      svg: () => hl("h0", "THE ONE-PAGE HANDOVER", C.navy) + hl("h1", "INVESTIGATE, DON'T PREDICT", C.green) + hl("h2", "REASONS AND GAPS", C.navy) + hl("h3", "THE STANDARD FOR YOU", C.orange) +
        G("pg", 98, 162, R(14, 58, 178, 212, 14, C.paper, C.navy, 3) +
          [["THE PROCESS", (x, y) => person(x, y + 5, 0.62, C.green)], ["THE BOUNDARY", (x, y) => brk(x - 11, x + 11, y - 4, C.green, 3.5)], ["THE PEOPLE", (x, y) => person(x, y + 5, 0.62, C.navy)], ["THE MEASURES", (x, y) => coin(x, y, 10)]]
            .map(([s, f], i) => f(36, 100 + i * 48) + T(56, 106 + i * 48, s, { a: "start", z: 17, c: C.navy })).join("")) +
        Ln("Lgo", "M198 162H262", C.green, 5) + G("ah", 270, 162, Fi("M262 151L278 162L262 173Z", C.green)) +
        G("ut", 334, 160, person(314, 152, 1.25, C.green) + person(354, 152, 1.25, C.green) + T2(334, 206, "UNDERSTAND", "TEAM", { c: C.green })) +
        G("utk", 376, 108, okB(376, 108, 13)) +
        G("cb", 100, 314, Ci(100, 300, 26, C.blue, C.navy, 3) + R(80, 324, 40, 9, 3, C.navy) + noB(124, 280, 12) + T(100, 362, "NOT PREDICTING", { c: C.orange })) +
        G("ln", 290, 314, lens(282, 298, 22, C.green) + T(290, 362, "INVESTIGATE FIRST", { c: C.green })) +
        G("why", 104, 312, bub(104, 306, 184, 50, C.navy) + T(104, 312, "OUR REASONING", { c: C.navy })) +
        G("gap", 300, 312, qB(216, 306, 13) + qB(242, 306, 13) + T2(262, 302, "EVIDENCE", "STILL NEEDED", { a: "start", z: 17, c: C.orange })) +
        G("you", 316, 160, R(232, 58, 150, 212, 14, C.paper, C.orange, 3, 'stroke-dasharray="7 5"') +
          [0, 1, 2, 3].map((i) => R(248, 88 + i * 46, 24, 24, 6, "none", C.orange, 2.5) + Pa(`M284 ${100 + i * 46}H364`, C.orange, 3, 'opacity=".5"')).join("") +
          person(306, 312, 1.35, C.orange) + T(306, 366, "YOUR ANALYSIS", { c: C.orange })),
      steps: [
        "+h0 +pg +Lgo +ah +ut",
        "-h0 +h1 +cb +ln +utk",
        "-h1 +h2 -cb -ln +why +gap",
        "-h2 +h3 -ut -utk -Lgo -ah -why -gap +you"] }
  ]);

  // =====================================================================
  // O3f — From Qasr's decision to your forum (35 lines, 10 shots). Audit score 4.6 -> rebuilt.
  // Recap of Qasr's choice, then the forum task step by step (case, criteria, boundary, objections, posting
  // rules), then Week 8: investigating the chosen process, with new evidence allowed to send us back.
  // =====================================================================
  section("O3f", "From Qasr to your forum", 35, [0, 2, 4, 6, 7, 8, 10, 12, 14, 16, 18, 20, 21, 23, 24, 26, 27, 29, 31, 33], [
    // Template 138 · Scrolling Timeline (Motion Array) — https://motionarray.com/after-effects-templates/scrolling-timeline-1223172/
    // Adapted: "scroll the dates and settle on an event" -> Qasr's road ends at its flag and a new road starts at you;
    // the recap scrolls back to the four problems, one team and six months, and every candidate keeps its tick.
    { ref: U[138], cap: "Qasr's journey ends", n: 3,
      svg: () => hl("h0", "QASR ENDS, YOU BEGIN", C.orange) + hl("h1", "FOUR PROBLEMS, ONE TEAM", C.navy) + hl("h2", "EVERY CASE LEGITIMATE", C.green) +
        G("rd", 200, 220, Pa("M20 260C80 260 120 200 200 200", C.navy, 8) + flag(200, 196, 1.4, C.green) + T(110, 300, "QASR'S LAUNCH PAD", { c: C.navy }) +
          Pa("M200 200C260 200 300 150 370 150", C.orange, 8, 'stroke-dasharray="12 10"') + person(350, 120, 1.5, C.orange) + T(300, 92, "YOUR CHALLENGE", { c: C.orange })) +
        G("rc", 200, 200, [0, 1, 2, 3].map((i) => warn(60 + i * 50, 140, 1.4)).join("") + person(110, 270, 1.8, C.navy) + T2(110, 330, "ONE DELIVERY", "TEAM", { c: C.navy }) +
          clock(290, 270, 34, C.orange, 180) + T2(290, 330, "SIX-MONTH", "REVIEW", { c: C.orange }) + T(320, 146, "FOUR PROBLEMS", { z: 17, c: C.orange })) +
        G("lg", 200, 200, [0, 1, 2, 3].map((i) => node(70 + i * 87, 190, 32, CCOL[i], CAND[i](70 + i * 87, 192, 1)) + okB(94 + i * 87, 164, 11)).join("") + T(200, 270, "A REAL REASON EACH", { c: C.green })),
      steps: ["+h0 +rd", "-h0 +h1 -rd +rc", "-h1 +h2 -rc +lg"] },

    // Template 096 · Process in cub (LottieFiles) — https://lottiefiles.com/free-animation/process-in-cub-9iNG7QP0qC
    // Adapted: "cycle the cube states" -> guest arrival steps forward with its two advantages, then three locks show
    // the conditions it still depended on.
    { ref: U[96], cap: "Arrival, with conditions", n: 2,
      svg: () => hl("h0", "WHY GUEST ARRIVAL LED", C.green) + hl("h1", "IT DEPENDED ON THREE", C.orange) +
        G("ga", 200, 190, Fi("M140 60L60 120H340L260 60Z", C.gold, 'opacity=".25"') + R(120, 110, 160, 130, 16, C.paper, C.green, 4) + CAND[0](200, 170, 2)) + G("gv", 200, 300,
          eye(80, 280, 1.6, C.green) + T2(80, 320, "VISIBLE", "VALUE", { c: C.green }) + person(320, 282, 1.3, C.gold) + crown(320, 252, 0.8) + T2(320, 324, "VOLUNTEER", "SPONSOR", { c: C.gold })) +
        [["SECURE", "COOPERATION"], ["CONFIRM", "OWNERSHIP"], ["RELIABLE", "EVIDENCE"]].map(([a, b], i) => G("l" + i, 70 + i * 130, 300, lockI(70 + i * 130, 290, 1.4, C.orange) + T2(70 + i * 130, 334, a, b, { z: 17, c: C.orange }))).join(""),
      steps: ["+h0 +ga +gv", "-h0 +h1 -gv ga.y=-40 ga.s=0.75 +l0 +l1 +l2"] },

    // Template 117 · Infographics Elements by TarZanchik (Motion Array) — https://motionarray.com/after-effects-templates/infographics-elements-789489/
    // Adapted: "reveal shapes and data" -> billing is deferred but still important, room release and the digital
    // record take their places, the waiting managers receive the reasoning, and four criteria lock into one argument.
    { ref: U[117], cap: "Others still matter", n: 4,
      svg: () => hl("h0", "DEFERRED, STILL IMPORTANT", C.navy) + hl("h1", "MANAGEABLE AND MANDATORY", C.navy) + hl("h2", "EXPLAIN THE TRADE-OFFS", C.green) + hl("h3", "A CONVINCING RECOMMENDATION", C.green) +
        G("bl", 200, 200, R(110, 80, 180, 170, 16, C.paper, C.navy, 4) + CAND[1](200, 140, 1.8) + hotel(160, 210, 1.1, C.navy) + hotel(240, 210, 1.1, C.navy) + noB(172, 194, 9) + noB(252, 194, 9) +
          cal(110, 300, 1, C.navy) + T(140, 306, "RECONSIDER LATER", { a: "start", c: C.navy })) +
        G("ot", 200, 200, R(20, 80, 176, 200, 16, C.paper, C.gold, 3.5) + CAND[3](108, 140, 1.6) + T2(108, 220, "MANAGEABLE", "OPTION", { c: C.navy }) +
          R(204, 80, 176, 200, 16, C.paper, C.orange, 3.5) + CAND[2](292, 140, 1.6) + T2(292, 220, "COMPLIANCE", "RESPONSE", { c: C.orange }) + Pa("M220 310H380", C.orange, 8, 'opacity=".7"')) +
        G("ex", 200, 210, [70, 140].map((x, i) => person(x, 270, 1.4, [C.navy, C.gold][i])).join("") + env(110, 180, 1.6, C.green) + arr(150, 180, 210, 180, C.green, 3) +
          R(222, 110, 150, 150, 14, C.paper, C.green, 3) + Pa("M297 140V230M252 160H342", C.navy, 3) + Pa("M252 160L238 196H266ZM342 160L328 196H356Z", C.navy, 2.5) + T2(297, 290, "EVIDENCE AND", "TRADE-OFFS", { z: 17, c: C.green })) +
        G("cv", 200, 210, [(x, y) => target(x, y, 18, C.green), (x, y) => Gs(x, y, 1.3, Pa("M-14 6A14 14 0 0 1 14 6", C.navy, 3) + Pa("M0 6L8 -4", C.orange, 3)), (x, y) => person(x, y + 6, 0.9, C.gold), (x, y) => eye(x, y, 1.1, C.navy)]
          .map((f, i) => node(60 + i * 93, 140, 30, CCOL[i]) + f(60 + i * 93, 140) + (i < 3 ? link(106 + i * 93, 140, 0.9, C.green) : "")).join("") +
          doc(200, 270, 1.8, C.green, 4) + okB(232, 230, 13) + arr(200, 180, 200, 220, C.green, 3)),
      steps: ["+h0 +bl", "-h0 +h1 -bl +ot", "-h1 +h2 -ot +ex", "-h2 +h3 -ex +cv"] },

    // Template 105 · World map with logistics (LottieFiles) — https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy
    // Adapted: "trace routes between hubs" -> the reasoning travels from Qasr to a different organisation in your
    // forum; its case arrives with a title; you read the case and its exhibit closely.
    { ref: U[105], cap: "Your forum begins", n: 3,
      svg: () => hl("h0", "A DIFFERENT ORGANISATION", C.orange) + hl("h1", "YOUR WEEK 7 CASE", C.orange) + hl("h2", "READ CASE AND EXHIBIT", C.navy) +
        G("mp", 200, 200, hotel(70, 200, 2.6, C.navy) + T2(70, 270, "QASR", "HOSPITALITY", { z: 17, c: C.navy }) + Pa("M110 180Q200 90 290 180", C.orange, 4, 'stroke-dasharray="8 7"') +
          Gs(320, 196, 1, R(-40, -30, 80, 60, 4, C.paper, C.orange, 3) + Fi("M-40 -30L-20 -50L0 -30L20 -50L40 -30Z", C.orange) + R(-10, 6, 20, 24, 2, C.orange)) + T2(320, 270, "NEW", "ORGANISATION", { z: 17, c: C.orange }) +
          bub(200, 318, 120, 44, C.green) + T(200, 324, "THE FORUM", { c: C.green })) +
        G("ti", 200, 200, R(50, 80, 300, 200, 16, C.paper, C.orange, 4) + T(200, 140, "WHERE TO START", { z: 24, c: C.navy }) + T(200, 178, "EVERYTHING IS BROKEN", { z: 20, c: C.orange }) +
          [100, 200, 300].map((x) => gear(x, 236, 16, C.navy) + Pa(`M${x - 6} 220L${x + 4} 236L${x - 4} 244L${x + 6} 256`, C.orange, 3)).join("")) +
        G("rd", 200, 200, doc(110, 186, 3, C.navy, 4) + T(110, 300, "COMPLETE CASE", { c: C.navy }) +
          R(220, 110, 140, 150, 10, C.paper, C.navy, 3) + [0, 1, 2, 3].map((i) => R(240 + i * 28, 230 - [50, 90, 30, 70][i], 18, [50, 90, 30, 70][i], 3, CCOL[i])).join("") + T(290, 300, "THE EXHIBIT", { c: C.navy }) +
          lens(280, 170, 26, C.green)),
      steps: ["+h0 +mp", "-h0 +h1 -mp +ti", "-h1 +h2 -ti +rd"] },

    // Template 116 · Infographics by Ruslan Klimovich (Motion Array) — https://motionarray.com/after-effects-templates/infographics-3844461/
    // Adapted: "sequence statistic graphics" -> Qasr's answer is refused at the border, the organisation's own goals
    // become the target, the four criteria are applied with evidence, and the two classic traps appear in turn.
    { ref: U[116], cap: "Weigh your options", n: 5,
      svg: () => hl("h0", "DON'T COPY QASR", C.orange) + hl("h1", "WHAT IT MUST ACHIEVE", C.green) + hl("h2", "SAME FOUR CRITERIA", C.navy) + hl("h3", "VALUABLE, HARD TO DELIVER", C.orange) + hl("h4", "EASY, TOO LITTLE VALUE", C.orange) +
        G("cp", 200, 200, R(30, 100, 140, 160, 14, C.paper, C.green, 3.5) + CAND[0](100, 160, 1.4) + T2(100, 222, "QASR'S", "ANSWER", { c: C.green }) + arr(180, 180, 236, 180, C.navy, 4) +
          Gs(310, 186, 1, R(-50, -36, 100, 72, 4, C.paper, C.orange, 3) + Fi("M-50 -36L-25 -60L0 -36L25 -60L50 -36Z", C.orange)) + noB(208, 150, 16) + T(200, 330, "DIFFERENT CONSTRAINTS", { c: C.orange })) +
        G("tg", 200, 200, target(200, 196, 70, C.green) + [[50, 100], [350, 100], [60, 320], [340, 320]].map(([x, y], i) => arr(x, y, 200 + (x - 200) * 0.38, 196 + (y - 196) * 0.38, CCOL[i], 3.5) + Ci(x, y, 14, CCOL[i])).join("") + T(200, 300, "ITS OBJECTIVES", { c: C.green })) +
        G("gd", 200, 210, R(30, 80, 340, 240, 14, C.paper, C.navy, 3) + [0, 1, 2, 3].map((i) => Gs(130 + i * 64, 108, 1, [target(0, 0, 13, C.green), Pa("M-14 6A14 14 0 0 1 14 6", C.navy, 3), person(0, 4, 0.6, C.gold), eye(0, 0, 0.8, C.navy)][i])).join("") +
          [0, 1, 2].map((r) => Ci(70, 160 + r * 56, 16, C.paper, C.navy, 2.5) + Gl(70, 166 + r * 56, String.fromCharCode(65 + r), 16, C.navy) + [0, 1, 2, 3].map((c) => R(116 + c * 64, 146 + r * 56, 28, 28, 6, C.pale, C.navy, 2) + Pa(`M${136 + c * 64} ${144 + r * 56}l4 -6l4 6v10`, C.ink, 1.8)).join("")).join("")) +
        G("hv", 200, 210, trophy(300, 190, 3, C.gold) + wall(160, 110, 54, 190, C.orange) + person(80, 220, 1.6, C.navy) + T2(100, 300, "LIMITED", "AUTHORITY", { c: C.orange })) +
        G("ez", 200, 210, trophy(110, 220, 0.9, C.gold) + person(70, 230, 1.4, C.navy) + Pa("M200 300H360", C.navy, 3) + R(220, 290, 40, 10, 2, C.gold) + R(300, 130, 40, 170, 6, "none", C.navy, 2.5, 'stroke-dasharray="6 5"') +
          T2(300, 106, "MAIN", "PRIORITIES", { c: C.navy }) + T2(240, 330, "TINY", "CONTRIBUTION", { c: C.orange })),
      steps: ["+h0 +cp", "-h0 +h1 -cp +tg", "-h1 +h2 -tg +gd", "-h2 +h3 -gd +hv", "-h3 +h4 -hv +ez"] },

    // Template 090 · Multi-Step Icon Animation (LottieFiles) — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
    // Adapted: "activate one step after another" -> your own process is bracketed with the problem it addresses, then
    // its four boundary markers are placed one after another.
    { ref: U[90], cap: "Your boundary", n: 2,
      svg: () => hl("h0", "YOUR BOUNDARY, YOUR PROBLEM", C.navy) + hl("h1", "FOUR BOUNDARY MARKERS", C.green) +
        Pa("M40 200H360", C.blue, 8) + G("fl", 200, 200, [50, 125, 200, 275, 350].map((x, i) => node(x, 200, 20, C.navy) + Gl(x, 206, String.fromCharCode(65 + i), 16, C.navy)).join("")) +
        G("bk", 200, 140, brk(40, 284, 152, C.green, 4) + T(162, 136, "RECOMMENDED SCOPE", { c: C.green })) +
        G("pb", 200, 300, exB(80, 300, 16) + T(110, 306, "THE PROBLEM IT FIXES", { a: "start", c: C.orange })) +
        G("m0", 50, 200, flag(48, 176, 1, C.green) + T2(50, 252, "STARTING", "EVENT", { z: 17, c: C.green })) +
        G("m1", 275, 200, flag(273, 176, 1, C.green) + T2(275, 252, "FINAL", "RESULT", { z: 17, c: C.green })) +
        G("m2", 162, 200, [88, 162, 238].map((x) => Ci(x, 200, 8, C.gold, C.ink, 2)).join("") + T2(162, 302, "KEY", "HANDOFFS", { z: 17, c: C.gold })) +
        G("m3", 350, 200, noB(350, 200, 20) + T2(350, 302, "OUT OF", "SCOPE", { z: 17, c: C.orange })),
      steps: ["+h0 +fl +bk +pb", "-h0 +h1 -pb +m0 +m1 +m2 +m3"] },

    // Template 080 · Creative Design Workflow Animation (Dribbble) — https://dribbble.com/shots/27476599-Creative-Design-Workflow-Animation
    // Adapted: "assemble shapes and refine the composition" -> objectors appear around your recommendation, one
    // objection opens into what it may reveal, and the louder repeat is replaced by weighing the evidence.
    { ref: U[80], cap: "Welcome the challenge", n: 3,
      svg: () => hl("h0", "WHO MIGHT OBJECT?", C.orange) + hl("h1", "WHAT OBJECTIONS REVEAL", C.navy) + hl("h2", "EXAMINE, DON'T REPEAT", C.green) +
        G("rc", 200, 200, R(140, 150, 120, 100, 12, C.paper, C.green, 3.5) + doc(200, 200, 1.4, C.green, 3) +
          [[60, 120], [340, 120], [60, 290], [340, 290]].map(([x, y], i) => person(x, y, 1.4, [C.orange, C.navy, C.gold, C.orange][i]) + bub(x + (x < 200 ? 40 : -40), y - 40, 40, 30, C.orange) + Gl(x + (x < 200 ? 40 : -40), y - 32, "!", 18, C.orange)).join("") +
          T2(200, 270, "YOUR", "RECOMMENDATION", { z: 17, c: C.green })) +
        G("op", 200, 210, bub(200, 110, 120, 60, C.orange) + Gl(200, 124, "!", 36, C.orange) +
          [["MISSING", "DEPENDENCY"], ["UNREALISTIC", "WORKLOAD"], ["OVERLOOKED", "PRIORITY"]].map(([a, b], i) => R(8 + i * 128, 200, 124, 100, 12, C.paper, C.navy, 3) + T2(70 + i * 128, 240, a, b, { z: 17, c: C.navy }) +
            arr(200, 146, 70 + i * 128, 196, C.orange, 2.5)).join("")) +
        G("ev", 200, 210, mega(80, 190, 2.4, C.orange) + Gl(140, 120, "!!", 30, C.orange) + noB(110, 130, 15) + T2(90, 290, "LOUDER", "REPEATS", { c: C.orange }) +
          R(294, 100, 12, 160, 4, C.navy) + R(230, 96, 140, 12, 6, C.navy) + Fi("M230 108L214 160H246ZM370 108L354 160H386Z", C.navy) + T2(300, 290, "COMPETING", "EVIDENCE", { c: C.green })),
      steps: ["+h0 +rc", "-h0 +h1 -rc +op", "-h1 +h2 -op +ev"] },

    // Template 086 · Workflow by a (LottieFiles) — https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm
    // Adapted: "reveal workers and workflow actions" -> the forum thread is built action by action: your post first
    // (others hidden), two replies including a challenge, the Jeston citation, the facilitator's summary, the mark type.
    { ref: U[86], cap: "Post, reply, cite", n: 5,
      svg: () => hl("h0", "POST FIRST, THEN READ", C.orange) + hl("h1", "TWO REPLIES, ONE CHALLENGE", C.navy) + hl("h2", "CITE JESTON, CHAPTER 15", C.navy) + hl("h3", "READ THE SUMMARY", C.green) + hl("h4", "FORMATIVE PARTICIPATION", C.navy) +
        G("me", 200, 110, R(20, 64, 360, 84, 14, C.paper, C.orange, 3.5) + person(56, 112, 1.3, C.orange) + Pa("M96 92H340M96 112H320M96 132H280", C.orange, 4) + T(370, 140, "YOUR POST", { a: "end", z: 17, c: C.orange })) +
        G("ot", 200, 250, [0, 1].map((i) => R(20, 170 + i * 96, 360, 84, 14, C.pale, C.navy, 2.5) + person(56, 216 + i * 96, 1.2, i ? C.gold : C.navy) + Pa(`M96 ${196 + i * 96}H340M96 ${216 + i * 96}H300`, C.navy, 4, 'opacity=".35"')).join("") +
          lockI(330, 250, 1.1, C.navy) + T(200, 370, "OTHERS AFTER YOURS", { c: C.navy })) +
        G("r1", 200, 212, arr(60, 152, 60, 186, C.green, 3) + R(80, 176, 300, 40, 10, C.paper, C.green, 3) + T(100, 202, "BUILDS ON THIS", { a: "start", z: 17, c: C.green })) +
        G("r2", 200, 306, arr(60, 152, 60, 280, C.orange, 3) + R(80, 270, 300, 40, 10, C.paper, C.orange, 3) + T(100, 296, "CONSTRUCTIVE CHALLENGE", { a: "start", z: 17, c: C.orange })) +
        G("bk", 200, 230, book(110, 230, 2.6, C.navy) + T2(110, 300, "JESTON", "CHAPTER 15", { c: C.navy }) + Pa("M180 230Q240 190 300 140", C.green, 3, 'stroke-dasharray="6 6"') + okB(300, 140, 14) + T2(300, 230, "ARGUMENT", "SUPPORTED", { c: C.green })) +
        G("fs", 200, 230, cal(90, 220, 1.6, C.navy) + T2(90, 290, "END OF", "WEEK", { c: C.navy }) + doc(270, 220, 2.2, C.green, 4) + person(320, 260, 1.1, C.green) + T(270, 330, "FACILITATOR SUMMARY", { c: C.green })) +
        G("fm", 200, 230, R(20, 120, 190, 70, 14, C.green) + T(115, 162, "FORMATIVE TASK", { c: C.paper, nh: true }) +
          Pa("M230 250H370", C.blue, 18) + Pa("M230 250H300", C.green, 18) + [230, 265, 300, 335, 370].map((x) => Ci(x, 250, 5, C.paper)).join("") + T2(290, 296, "TERM", "PARTICIPATION", { c: C.navy })),
      steps: [
        "+h0 +me +ot",
        "-h0 +h1 -ot +r1 +r2",
        "-h1 +h2 -r1 -r2 me.o=0.35 +bk",
        "-h2 +h3 -bk +fs",
        "-h3 +h4 -fs +fm"] },

    // Template 135 · Timeline by The Creators (Motion Array) — https://motionarray.com/after-effects-templates/timeline/
    // Adapted: "reveal milestones and media" -> the framework advances to Understand; the lens opens the process; new
    // evidence can send the route back; observation replaces assumption; observed and expected bars meet the baseline.
    { ref: U[135], cap: "On to Understand", n: 5,
      svg: () => hl("h0", "WEEK 8: UNDERSTAND", C.green) + hl("h1", "INVESTIGATE THE PROCESS", C.green) + hl("h2", "ROUTE, NOT RATCHET", C.orange) + hl("h3", "INVESTIGATE, DON'T ASSUME", C.navy) + hl("h4", "OBSERVED VERSUS EXPECTED", C.navy) +
        G("fw", 200, 110, Pa("M30 110H370", C.navy, 4) + [80, 200, 320].map((x, i) => Ci(x, 110, 26, [C.paper, C.orange, C.green][i], C.navy, 3) + Gl(x, 118, String(i + 2), 22, i ? C.paper : C.navy)).join("") +
          T2(200, 168, "LAUNCH", "PAD", { z: 17, c: C.orange }) + T2(320, 168, "UNDERSTAND", "PHASE", { z: 17, c: C.green })) +
        Mv("Mk", [[200, 70], [320, 70]], Fi("M0 10L-9 -6H9Z", C.green)) +
        G("iv", 200, 280, [0, 1, 2, 3].map((i) => node(60 + i * 94, 280, 22, C.navy, [JI.book, JI.room, JI.key, JI.bill][i](60 + i * 94, 280)) + (i < 3 ? Pa(`M${84 + i * 94} 280H${130 + i * 94}`, C.navy, 3) : "")).join("") +
          clock(154, 236, 13, C.orange, 120) + clock(248, 236, 13, C.orange, 220) + qB(342, 236, 13) + lens(60, 262, 22, C.green)) +
        G("bk", 200, 280, doc(290, 280, 1.5, C.orange, 3) + exB(316, 252, 12) + T2(290, 336, "NEW", "EVIDENCE", { c: C.orange }) + Pa("M270 240Q220 200 214 140", C.orange, 4) + Fi("M206 146L214 128L222 146Z", C.orange)) +
        G("as", 200, 280, person(80, 290, 1.4, C.navy) + bub(80, 220, 120, 44, C.navy) + T(80, 226, "WE BELIEVE…", { c: C.navy }) + noB(132, 202, 11) +
          person(320, 290, 1.4, C.green) + lens(300, 230, 18, C.green) + T2(320, 336, "WHAT ACTUALLY", "HAPPENS", { c: C.green })) +
        G("ob", 200, 280, Pa("M40 330H360", C.navy, 3) + R(110, 240, 60, 90, 6, C.navy) + R(230, 210, 60, 120, 6, "none", C.green, 3, 'stroke-dasharray="7 5"') + Pa("M40 270H360", C.orange, 3, 'stroke-dasharray="4 4"') +
          T2(140, 352, "OBSERVED", "NOW", { c: C.navy }) + T2(260, 352, "EXPECTED", "LEVEL", { c: C.green }) + T(376, 262, "AGREED BASELINE", { a: "end", z: 17, c: C.orange })),
      steps: [
        "+h0 +fw +Mk Mk@1",
        "-h0 +h1 +iv",
        "-h1 +h2 -iv +bk",
        "-h2 +h3 -bk +as",
        "-h3 +h4 -as +ob"] },

    // Template 140 · Corporate Timeline by MotionTores (Motion Array) — https://motionarray.com/after-effects-templates/corporate-timeline-77666/
    // Adapted: "transition milestones along a path with typography" -> the course path turns from choosing where to
    // understanding why; the people around the decision nod; you carry your questions through the Week 8 door.
    { ref: U[140], cap: "On to Week 8", n: 3,
      svg: () => hl("h0", "FROM WHERE TO WHY", C.navy) + hl("h1", "EXPLAINED AND SUPPORTED", C.green) + hl("h2", "ON TO WEEK 8", C.orange) +
        G("ww", 200, 200, pin(100, 210, 2, C.orange) + T2(100, 270, "CHOOSING", "WHERE", { c: C.orange }) + arr(150, 180, 250, 180, C.navy, 5) + lens(300, 170, 34, C.green) + T2(300, 270, "UNDERSTANDING", "WHY", { c: C.green })) +
        G("sp", 200, 210, doc(200, 190, 2.4, C.green, 4) + [[80, 250], [130, 300], [270, 300], [320, 250]].map(([x, y], i) => person(x, y, 1.3, CCOL[i]) + ck(x + 16, y - 36, 0.7, C.green, 3.5)).join("")) +
        G("go", 200, 210, person(110, 250, 2, C.orange) + R(84, 236, 24, 40, 6, C.navy) + qB(150, 160, 14) + qB(176, 190, 12) + R(250, 100, 110, 230, 10, C.pale, C.navy, 4) + Ci(340, 220, 6, C.navy) +
          T2(305, 196, "WEEK", "EIGHT", { c: C.navy }) + T2(110, 320, "FORUM, THEN", "QUESTIONS", { z: 17, c: C.orange })),
      steps: ["+h0 +ww", "-h0 +h1 -ww +sp", "-h1 +h2 -sp +go"] }
  ]);

  addStyle("w07-claude-v2-part4", ["O3d","O3e","O3f"]);
})();
