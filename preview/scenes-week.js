// ============================================================
// OPER621 · WEEK 1 · ANIMATED TEACHING SCENES · PART 1 of 3
// File: w01-claude-part1.js   Scenes: W1INTRO, O1a, O1b, O2a
// Standalone: registers its own scenes on window.VL_SCENES and appends
// its own scoped rules to <style id="vl-sc-w01">. Parts may be loaded in
// any order or concatenated. Contract per scene: { build(el), step(i, n), reset() }.
// GSAP (window.gsap) is used when present; CSS transitions otherwise.
// prefers-reduced-motion: every state is applied instantly, no ambient loops.
// ============================================================
(function () {
  "use strict";
  var W = window;
  W.VL_SCENES = W.VL_SCENES || {};
  var REG = W.VL_SCENES;
  var VW = 400, VH = 320;
  var C = {
    navy: "#1f4e79", deep: "#16324d", ink: "#1b2a3a", orange: "#c0502a",
    coral: "#e0734f", green: "#317c61", mint: "#6fbf9b", gold: "#d6a45e",
    sun: "#f2c46d", paper: "#fbf8f1", cream: "#f3ecdf", blue: "#dbe7f2",
    sky: "#eaf2f8", mute: "#8ba9bf", slate: "#5b7590", white: "#ffffff",
    night: "#13263b", violet: "#6b5ca5", red: "#b8402a", skin: "#f0c8a2",
    hair: "#3b2a22", wood: "#b98a5a", sand: "#efe1c4"
  };
  var UIDN = 0;

  function reduced() {
    try { return !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    catch (e) { return false; }
  }
  function gsapLib() {
    var g = W.gsap;
    return g && typeof g.to === "function" && typeof g.set === "function" ? g : null;
  }
  function esc(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function on(i, a, b) { return i >= a && i <= (b == null ? 1e9 : b); }
  function rnd(seed) {
    var s = seed % 2147483647; if (s <= 0) s += 2147483646;
    return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  }

  /* ---------- SVG string builders ---------- */
  function at(o) {
    var s = "";
    if (o) for (var k in o) if (o[k] != null && o[k] !== false) s += " " + k + '="' + esc(o[k]) + '"';
    return s;
  }
  function R(x, y, w, h, rx, fill, o) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx || 0) + '" fill="' + (fill || "none") + '"' + at(o) + "/>";
  }
  function Ci(cx, cy, r, fill, o) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (fill || "none") + '"' + at(o) + "/>";
  }
  function El(cx, cy, rx, ry, fill, o) {
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + (fill || "none") + '"' + at(o) + "/>";
  }
  function P(d, stroke, sw, o) {
    return '<path d="' + d + '" fill="none" stroke="' + stroke + '" stroke-width="' + (sw || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + at(o) + "/>";
  }
  function F(d, fill, o) { return '<path d="' + d + '" fill="' + fill + '"' + at(o) + "/>"; }
  function L(x1, y1, x2, y2, stroke, sw, o) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + stroke + '" stroke-width="' + (sw || 2) + '" stroke-linecap="round"' + at(o) + "/>";
  }
  /* Text label. Class "lb" adds a legibility halo. */
  function T(x, y, str, size, fill, o) {
    var a = { "text-anchor": "middle", "class": "lb" };
    if (o) for (var k in o) a[k] = o[k];
    return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 17) + '" fill="' + (fill || C.ink) + '"' + at(a) + ">" + esc(str) + "</text>";
  }
  function TK(k, x, y, str, size, fill, o) {
    var a = { "data-k": k }; if (o) for (var q in o) a[q] = o[q];
    return T(x, y, str, size, fill, a);
  }
  function G(k, inner, o) {
    var a = { "data-k": k }; if (o) for (var q in o) a[q] = o[q];
    return "<g" + at(a) + ">" + inner + "</g>";
  }
  function Gp(inner, o) { return "<g" + at(o) + ">" + inner + "</g>"; }
  function Tr(x, y, inner, s, r) {
    return '<g transform="translate(' + x + " " + y + ")" + (r ? " rotate(" + r + ")" : "") + (s && s !== 1 ? " scale(" + s + ")" : "") + '">' + inner + "</g>";
  }
  /* Keyed drawable stroke: animate with {draw: 0..1}. */
  function PD(k, d, stroke, sw, o) {
    var a = { "data-k": k, pathLength: 1, "stroke-dasharray": "1 2", "stroke-dashoffset": 1.05 };
    if (o) for (var q in o) a[q] = o[q];
    return P(d, stroke, sw, a);
  }
  /* Pill label. Width is fitted to the rendered text after mounting. */
  function pill(k, x, y, str, o) {
    o = o || {};
    var size = o.size || 16, h = size + 14, fill = o.fill || C.navy, tc = o.color || C.white;
    var w = Math.max(40, str.length * size * 0.66 + 26);
    return '<g data-k="' + k + '" data-pill="' + (o.anchor || "middle") + '" data-px="' + x + '"' + at(o.attrs) + ">" +
      R(x - w / 2, y - h / 2, w, h, h / 2, fill, o.stroke ? { stroke: o.stroke, "stroke-width": 2 } : null) +
      '<text x="' + x + '" y="' + (y + size * 0.36) + '" font-size="' + size + '" fill="' + tc + '" text-anchor="middle">' + esc(str) + "</text></g>";
  }
  function check(x, y, s, color, sw) {
    s = s || 1;
    return P("M" + (x - 8 * s) + " " + y + " l" + 6 * s + " " + 6 * s + " l" + 11 * s + " " + -13 * s, color || C.green, sw || 3.5);
  }
  function cross(x, y, s, color, sw) {
    s = s || 1; var d = 7 * s;
    return P("M" + (x - d) + " " + (y - d) + " L" + (x + d) + " " + (y + d) + " M" + (x + d) + " " + (y - d) + " L" + (x - d) + " " + (y + d), color || C.orange, sw || 3.5);
  }
  /* A friendly character, feet at (x,y). opts.k adds keyed mouths k-sm / k-fr. */
  function fig(x, y, s, body, opts) {
    opts = opts || {};
    var mouths;
    if (opts.k) {
      mouths = G(opts.k + "-sm", P("M-3.5 -41 Q0 -37.5 3.5 -41", C.ink, 1.6)) +
        G(opts.k + "-fr", P("M-3.5 -38.5 Q0 -42 3.5 -38.5", C.ink, 1.6), { opacity: 0 });
    } else {
      mouths = opts.mood === "frown" ? P("M-3.5 -38.5 Q0 -42 3.5 -38.5", C.ink, 1.6) :
        P("M-3.5 -41 Q0 -37.5 3.5 -41", C.ink, 1.6);
    }
    var hair = opts.hair === "long" ? F("M-11 -44 Q-12 -60 0 -59 Q12 -60 11 -44 L11 -33 Q8 -40 8 -48 Q0 -52 -8 -48 Q-8 -40 -11 -33 Z", opts.hc || C.hair) :
      F("M-10 -48 Q-9.5 -59 0 -58.5 Q10 -59 10 -48 Q5 -53 -10 -48 Z", opts.hc || C.hair);
    return Tr(x, y,
      F("M-14 0 L-14 -23 Q-14 -35 0 -35 Q14 -35 14 -23 L14 0 Z", body || C.navy) +
      (opts.badge ? Ci(7, -24, 4, opts.badge) : "") +
      Ci(0, -46, 10.5, opts.skin || C.skin) + hair +
      Ci(-3.6, -46.5, 1.6, C.ink) + Ci(3.6, -46.5, 1.6, C.ink) + mouths, s);
  }

  /* ---------- Icon library (centred at x,y; s = scale of a 24-unit icon) ---------- */
  var I = {
    bell: function (x, y, s, c) { return Tr(x, y, F("M-10 6 Q-10 -9 0 -9 Q10 -9 10 6 Z", c || C.gold) + R(-12, 6, 24, 3, 1.5, C.ink) + Ci(0, -11, 2.5, C.ink), s); },
    doc: function (x, y, s, c) { return Tr(x, y, R(-9, -12, 18, 24, 2, C.white, { stroke: c || C.navy, "stroke-width": 2 }) + P("M-5 -5 H5 M-5 0 H5 M-5 5 H2", c || C.navy, 1.6), s); },
    money: function (x, y, s, c) { return Tr(x, y, Ci(0, 0, 11, c || C.gold) + P("M3.5 -4.5 Q0 -7 -3.2 -4.8 Q-5.5 -1.8 0 0 Q5.5 1.8 3.2 4.8 Q0 7 -3.5 4.5 M0 -8.5 V8.5", C.white, 2), s); },
    bed: function (x, y, s, c) { return Tr(x, y, R(-12, -2, 24, 8, 2, c || C.navy) + R(-12, -8, 7, 6, 2, C.white, { stroke: c || C.navy, "stroke-width": 1.5 }) + P("M-12 6 V10 M12 6 V10", c || C.navy, 2), s); },
    key: function (x, y, s, c) { return Tr(x, y, Ci(-6, 0, 6, "none", { stroke: c || C.gold, "stroke-width": 3 }) + P("M0 0 H12 M8 0 V5 M11 0 V4", c || C.gold, 3), s); },
    receipt: function (x, y, s, c) { return Tr(x, y, F("M-8 -11 H8 V11 L5 9 L2 11 L-1 9 L-4 11 L-8 9 Z", C.white, { stroke: c || C.navy, "stroke-width": 1.6 }) + P("M-4 -5 H4 M-4 0 H4", c || C.navy, 1.4), s); },
    clock: function (x, y, s, c) { return Tr(x, y, Ci(0, 0, 11, C.white, { stroke: c || C.orange, "stroke-width": 2.5 }) + P("M0 -6 V0 L4 3", c || C.orange, 2), s); },
    phone: function (x, y, s, c) { return Tr(x, y, F("M-9 -6 Q-9 -10 -5 -10 L-3 -10 L-1 -5 L-4 -3 Q-2 3 4 4 L6 1 L10 3 L10 5 Q10 9 6 9 Q-9 8 -9 -6 Z", c || C.navy), s); },
    passport: function (x, y, s, c) { return Tr(x, y, R(-8, -11, 16, 22, 2, c || C.navy) + Ci(0, -2, 4, "none", { stroke: C.gold, "stroke-width": 1.4 }) + P("M-4 6 H4", C.gold, 1.4), s); },
    lock: function (x, y, s, c) { return Tr(x, y, P("M-5 -2 V-6 Q-5 -11 0 -11 Q5 -11 5 -6 V-2", c || C.orange, 2.4) + R(-8, -2, 16, 12, 2, c || C.orange) + Ci(0, 3, 1.8, C.white), s); },
    star: function (x, y, s, c) { return Tr(x, y, F("M0 -11 L3 -3.5 L11 -3.5 L4.5 1.5 L7 9.5 L0 4.5 L-7 9.5 L-4.5 1.5 L-11 -3.5 L-3 -3.5 Z", c || C.sun), s); },
    eye: function (x, y, s, c) { return Tr(x, y, F("M-12 0 Q0 -10 12 0 Q0 10 -12 0 Z", C.white, { stroke: c || C.navy, "stroke-width": 2 }) + Ci(0, 0, 3.5, c || C.navy), s); },
    bulb: function (x, y, s, c) { return Tr(x, y, Ci(0, -3, 8, c || C.sun) + R(-4, 5, 8, 5, 1, C.slate) + P("M0 -15 V-13 M-11 -7 L-9 -6 M11 -7 L9 -6", c || C.sun, 1.6), s); },
    wrench: function (x, y, s, c) { return Tr(x, y, P("M-8 8 L4 -4", c || C.slate, 4) + F("M2 -10 Q10 -12 10 -4 L6 -4 L4 -6 L4 -9 Z", c || C.slate), s); },
    flag: function (x, y, s, c) { return Tr(x, y, P("M-6 11 V-11", C.ink, 2) + F("M-6 -11 L9 -6 L-6 -1 Z", c || C.green), s); },
    mag: function (x, y, s, c) { return Tr(x, y, Ci(-2, -2, 8, C.white, { stroke: c || C.navy, "stroke-width": 3, "fill-opacity": 0.6 }) + P("M4 4 L10 10", c || C.navy, 4), s); },
    hotel: function (x, y, s, c) { return Tr(x, y, R(-9, -12, 18, 24, 1.5, c || C.navy) + R(-5, -8, 3, 3, 0, C.sun) + R(2, -8, 3, 3, 0, C.sun) + R(-5, -2, 3, 3, 0, C.sun) + R(2, -2, 3, 3, 0, C.sun) + R(-2, 6, 4, 6, 0, C.sun), s); },
    coin: function (x, y, s, c) { return Tr(x, y, Ci(0, 0, 8, c || C.gold, { stroke: "#a77b35", "stroke-width": 1.5 }) + P("M0 -4 V4", "#a77b35", 1.6), s); },
    gauge: function (x, y, s, c) { return Tr(x, y, P("M-11 4 A11 11 0 0 1 11 4", c || C.navy, 3) + P("M0 4 L6 -4", C.orange, 2.4) + Ci(0, 4, 2.5, C.ink), s); },
    heart: function (x, y, s, c) { return Tr(x, y, F("M0 8 L-8 0 Q-12 -5 -8 -9 Q-4 -12 0 -7 Q4 -12 8 -9 Q12 -5 8 0 Z", c || C.coral), s); },
    gear: function (x, y, s, c) {
      var d = "", n = 8, r1 = 11, r2 = 8, k;
      for (k = 0; k < n * 2; k++) { var a = k * Math.PI / n, r = k % 2 ? r2 : r1; d += (k ? "L" : "M") + (Math.cos(a) * r).toFixed(1) + " " + (Math.sin(a) * r).toFixed(1) + " "; }
      return Tr(x, y, F(d + "Z", c || C.slate) + Ci(0, 0, 3.5, C.white), s);
    },
    users: function (x, y, s, c) { return Tr(x, y, Ci(-5, -5, 4, c || C.navy) + Ci(5, -5, 4, c || C.navy) + F("M-11 8 Q-11 -1 -5 -1 Q1 -1 1 8 Z", c || C.navy) + F("M-1 8 Q-1 -1 5 -1 Q11 -1 11 8 Z", c || C.navy), s); },
    route: function (x, y, s, c) { return Tr(x, y, P("M-10 8 Q-10 -2 0 0 Q10 2 10 -8", c || C.orange, 2.6, { "stroke-dasharray": "3 3" }) + Ci(-10, 8, 3, C.green) + Ci(10, -8, 3, C.orange), s); },
    stairs: function (x, y, s, c) { return Tr(x, y, F("M-11 10 V4 H-5 V-2 H1 V-8 H7 V-12 H11 V10 Z", c || C.navy), s); },
    chain: function (x, y, s, c) { return Tr(x, y, R(-12, -4, 12, 8, 4, "none", { stroke: c || C.navy, "stroke-width": 2.5 }) + R(2, -4, 12, 8, 4, "none", { stroke: c || C.orange, "stroke-width": 2.5 }) + P("M0 -8 L2 -12 M1 8 L-1 12", C.orange, 1.8), s); },
    plane: function (x, y, s, c) { return Tr(x, y, F("M-12 1 L10 -1 Q14 0 10 1.5 L-12 3 Z M-2 0 L4 -9 L7 -9 L4 0 Z M-2 2 L4 10 L7 10 L4 2 Z M-11 0 L-13 -5 L-10 -5 L-7 0 Z", c || C.white), s); },
    shield: function (x, y, s, c) { return Tr(x, y, F("M0 -11 L9 -7 Q9 6 0 11 Q-9 6 -9 -7 Z", c || C.green) + check(0, 0, 0.55, C.white, 2.2), s); },
    cursor: function (x, y, s, c) { return Tr(x, y, F("M-6 -10 L8 2 L1 3 L5 11 L2 12 L-2 4 L-6 8 Z", c || C.ink, { stroke: C.white, "stroke-width": 1.2 }), s); },
    screen: function (x, y, s, c) { return Tr(x, y, R(-12, -9, 24, 16, 2, c || C.navy) + R(-10, -7, 20, 12, 1, C.sky) + P("M0 7 V11 M-5 11 H5", c || C.navy, 2), s); },
    chat: function (x, y, s, c) { return Tr(x, y, F("M-11 -8 Q-11 -11 -8 -11 H8 Q11 -11 11 -8 V3 Q11 6 8 6 H-2 L-7 11 L-6 6 H-8 Q-11 6 -11 3 Z", c || C.navy), s); },
    pencil: function (x, y, s, c) { return Tr(x, y, F("M-9 9 L-7 3 L5 -9 L9 -5 L-3 7 Z", c || C.gold, { stroke: C.ink, "stroke-width": 1.2 }), s); },
    trophy: function (x, y, s, c) { return Tr(x, y, F("M-7 -10 H7 V-3 Q7 4 0 4 Q-7 4 -7 -3 Z", c || C.gold) + P("M0 4 V8 M-5 10 H5", c || C.gold, 2.5) + P("M-7 -7 Q-11 -7 -10 -3 Q-9 0 -6 0 M7 -7 Q11 -7 10 -3 Q9 0 6 0", c || C.gold, 1.6), s); },
    box: function (x, y, s, c) { return Tr(x, y, R(-10, -8, 20, 16, 2, c || C.wood) + P("M-10 -2 H10 M0 -8 V-2", "#8a6340", 1.5), s); },
    van: function (x, y, s, c) { return Tr(x, y, R(-13, -7, 17, 12, 2, c || C.navy) + F("M4 -4 H9 L13 1 V5 H4 Z", c || C.navy) + Ci(-7, 6, 3, C.ink) + Ci(8, 6, 3, C.ink), s); },
    rocket: function (x, y, s, c) { return Tr(x, y, F("M0 -13 Q7 -6 6 6 H-6 Q-7 -6 0 -13 Z", c || C.coral) + Ci(0, -3, 2.6, C.white) + F("M-6 2 L-10 9 L-6 7 Z M6 2 L10 9 L6 7 Z", C.navy) + F("M-3 7 L0 14 L3 7 Z", C.sun), s); },
    steth: function (x, y, s, c) { return Tr(x, y, P("M-7 -11 V-3 Q-7 4 0 4 Q7 4 7 -3 V-11 M0 4 V7 Q0 11 5 11 Q9 11 9 7", c || C.navy, 2.2) + Ci(9, 5, 3, C.orange), s); },
    car: function (x, y, s, c) { return Tr(x, y, F("M-13 3 L-11 -3 Q-9 -8 -4 -8 H4 Q9 -8 11 -3 L13 3 V7 H-13 Z", c || C.coral) + R(-7, -6, 14, 5, 1, C.sky) + Ci(-7, 7, 3, C.ink) + Ci(7, 7, 3, C.ink), s); },
    pc: function (x, y, s, c) { return Tr(x, y, R(-11, -9, 22, 15, 2, c || C.slate) + R(-9, -7, 18, 11, 1, "#c9d3dc") + R(-4, 6, 8, 3, 0, c || C.slate) + R(-8, 9, 16, 2, 1, c || C.slate), s); }
  };

  /* ---------- Scene runtime ---------- */
  var EASE_CSS = { out: "cubic-bezier(.16,1,.3,1)", io: "cubic-bezier(.65,0,.35,1)", back: "cubic-bezier(.34,1.56,.64,1)", lin: "linear", in: "cubic-bezier(.55,0,1,.45)" };
  var EASE_GS = { out: "power3.out", io: "power2.inOut", back: "back.out(1.6)", lin: "none", in: "power2.in" };

  function baseCSS(id, bg, halo) {
    var r = ".vls-w01-" + id;
    return r + "{position:relative;display:block;width:100%;height:100%;min-height:200px;overflow:hidden;background:" + bg + ";contain:layout paint;-webkit-user-select:none;user-select:none;--vh:" + halo + "}" +
      r + ">svg{position:absolute;left:0;top:0;width:100%;height:100%;display:block;overflow:hidden}" +
      r + " text{font-family:inherit;font-weight:700;letter-spacing:.02em;dominant-baseline:auto}" +
      r + " .lb{paint-order:stroke fill;stroke:var(--vh);stroke-width:4.5px;stroke-linejoin:round}" +
      r + " .lb.hl{stroke:#fbf8f1}" + r + " .lb.hd{stroke:#13263b}" + r + " .lb.hn{stroke:none}" +
      r + " [data-k]{transform-box:view-box}" +
      r + " .vp{animation:vls-w01-pop .45s ease-out both}" +
      r + " .a-spin{transform-box:fill-box;transform-origin:center;animation:vls-w01-spin 6s linear infinite}" +
      r + " .a-bob{transform-box:fill-box;transform-origin:center;animation:vls-w01-bob 2.6s ease-in-out infinite}" +
      r + " .a-pulse{transform-box:fill-box;transform-origin:center;animation:vls-w01-pulse 1.8s ease-in-out infinite}" +
      r + " .a-twinkle{animation:vls-w01-twinkle 3s ease-in-out infinite}" +
      r + " .a-flow{animation:vls-w01-flow 1.2s linear infinite}" +
      r + " .a-flip{transform-box:fill-box;transform-origin:center;animation:vls-w01-flip .32s ease-in-out both}" +
      "@keyframes vls-w01-pop{from{opacity:.15}to{opacity:1}}" +
      "@keyframes vls-w01-spin{to{transform:rotate(360deg)}}" +
      "@keyframes vls-w01-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}" +
      "@keyframes vls-w01-pulse{0%,100%{transform:scale(1);opacity:.9}50%{transform:scale(1.12);opacity:.55}}" +
      "@keyframes vls-w01-twinkle{0%,100%{opacity:.9}50%{opacity:.3}}" +
      "@keyframes vls-w01-flow{to{stroke-dashoffset:-16}}" +
      "@keyframes vls-w01-flip{0%{transform:scaleY(1)}50%{transform:scaleY(.04)}100%{transform:scaleY(1)}}" +
      "@media (prefers-reduced-motion: reduce){" + r + " *{animation:none!important;transition:none!important}}";
  }
  function addCSS(key, css) {
    var d = W.document, st = d.getElementById("vl-sc-w01");
    if (!st) { st = d.createElement("style"); st.id = "vl-sc-w01"; (d.head || d.documentElement).appendChild(st); }
    var flag = "data-vls-" + key;
    if (st.getAttribute(flag)) return;
    st.setAttribute(flag, "1");
    st.appendChild(d.createTextNode(css));
  }

  function chipMarkup(color) {
    return G("chip", R(12, 10, 160, 30, 15, C.white, { "data-k": "chipR", stroke: color || C.navy, "stroke-width": 1.5, "fill-opacity": 0.94 }) +
      Ci(28, 25, 5, color || C.orange) +
      '<text data-k="chipT" x="40" y="31" font-size="16" fill="' + C.ink + '" text-anchor="start"> </text>');
  }

  /* Place a positioned child (<g data-pos>) of keyed group k at (x,y). */
  function placeAt(els, k, x, y) {
    els(k).forEach(function (g) { var p = g.querySelector("[data-pos]"); if (p) p.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ")"); });
  }
  function bboxOf(els, k) { var e = els(k)[0]; if (!e) return null; try { return e.getBBox(); } catch (x) { return null; } }
  function Pos(inner) { return '<g data-pos="1">' + inner + "</g>"; }

  function makeScene(id, cfg) {
    var S = { root: null, svg: null, keys: {}, timers: [], rafs: [], ro: null, cur: -1, chip: "", uid: "" };
    var Lm = cfg.n;

    function els(k) {
      if (!S.root) return [];
      var c = S.keys[k];
      if (!c) { c = Array.prototype.slice.call(S.root.querySelectorAll('[data-k="' + k + '"]')); S.keys[k] = c; }
      return c;
    }
    function clearAsync() {
      S.timers.forEach(function (t) { clearTimeout(t); }); S.timers = [];
      S.rafs.forEach(function (r) { cancelAnimationFrame(r); }); S.rafs = [];
      var g = gsapLib(); if (g && S.root && g.killTweensOf) { try { g.killTweensOf(S.root.querySelectorAll("[data-k]")); } catch (e) { } }
    }
    function fit() {
      if (!S.root || !S.svg) return;
      var r = S.root.getBoundingClientRect(), w = r.width, h = r.height;
      var a = (w > 8 && h > 8) ? w / h : VW / VH;
      a = clamp(a, 0.55, 3.2);
      var vx, vy, vw, vh;
      if (a >= VW / VH) { vh = VH; vw = VH * a; vx = (VW - vw) / 2; vy = 0; }
      else { vw = VW; vh = VW / a; vx = 0; vy = (VH - vh) / 2; }
      S.svg.setAttribute("viewBox", vx.toFixed(1) + " " + vy.toFixed(1) + " " + vw.toFixed(1) + " " + vh.toFixed(1));
      S.root.setAttribute("data-shape", a > 1.55 ? "wide" : a < 1 ? "tall" : "mid");
    }
    function fitPill(g) {
      var t = g.querySelector("text"), rc = g.querySelector("rect");
      if (!t || !rc) return;
      var len = 0; try { len = t.getComputedTextLength(); } catch (e) { }
      if (!(len > 0)) return;
      var fs = parseFloat(t.getAttribute("font-size")) || 16, h = parseFloat(rc.getAttribute("height")) || 30;
      var w = len + Math.max(22, fs * 1.5), x = parseFloat(g.getAttribute("data-px")) || 0, an = g.getAttribute("data-pill");
      var x0 = an === "start" ? x : an === "end" ? x - w : x - w / 2;
      rc.setAttribute("x", x0.toFixed(1)); rc.setAttribute("width", w.toFixed(1));
      t.setAttribute("x", (x0 + w / 2).toFixed(1));
      if (h) rc.setAttribute("rx", h / 2);
    }
    function fitChip() {
      var t = els("chipT")[0], rc = els("chipR")[0]; if (!t || !rc) return;
      var len = 0; try { len = t.getComputedTextLength(); } catch (e) { }
      if (len > 0) rc.setAttribute("width", (len + 44).toFixed(1));
    }
    function vOf(el) {
      if (el.__v) return el.__v;
      var v = { x: 0, y: 0, s: 1, sx: null, sy: null, r: 0, ox: 0, oy: 0 };
      var o = el.getAttribute("data-o");
      if (o) { var p = o.split(/[ ,]+/); v.ox = +p[0] || 0; v.oy = +p[1] || 0; }
      else { try { var b = el.getBBox(); v.ox = b.x + b.width / 2; v.oy = b.y + b.height / 2; } catch (e) { } }
      el.__v = v; return v;
    }

    function animator(instant) {
      var g = gsapLib(), inst = instant || reduced();
      function setEl(el, p, o) {
        o = o || {};
        var dur = o.t != null ? o.t : 0.8, dl = o.dl || 0, ez = o.e || "out";
        var hasT = false, v = vOf(el);
        ["x", "y", "s", "sx", "sy", "r"].forEach(function (k) { if (p[k] != null) { v[k] = p[k]; hasT = true; } });
        if (p.ox != null) { v.ox = p.ox; v.oy = p.oy; }
        var sx = v.sx != null ? v.sx : v.s, sy = v.sy != null ? v.sy : v.s;
        if (g) {
          var vars = {};
          if (hasT) { vars.x = v.x; vars.y = v.y; vars.rotation = v.r; vars.scaleX = sx; vars.scaleY = sy; vars.svgOrigin = v.ox + " " + v.oy; }
          if (p.o != null) vars.opacity = p.o;
          if (p.draw != null) vars.strokeDashoffset = (1.05 - p.draw * 1.05);
          if (inst) { g.set(el, vars); }
          else { vars.duration = dur; vars.delay = dl; vars.ease = EASE_GS[ez] || ez; vars.overwrite = "auto"; g.to(el, vars); }
          paint(el, p, function (t, pv) {
            if (inst) { g.set(t, pv); return; }
            pv.duration = dur; pv.delay = dl; pv.ease = EASE_GS[ez] || ez; pv.overwrite = "auto"; g.to(t, pv);
          });
          return;
        }
        var props = [];
        if (hasT) props.push("transform");
        if (p.o != null) props.push("opacity");
        if (p.draw != null) props.push("stroke-dashoffset");
        var selfPaint = !(el.tagName && el.tagName.toLowerCase() === "g");
        if (selfPaint && p.fill != null) props.push("fill");
        if (selfPaint && p.stroke != null) props.push("stroke");
        el.style.transition = inst ? "none" : props.map(function (q) { return q + " " + dur + "s " + (EASE_CSS[ez] || ez) + " " + dl + "s"; }).join(",");
        if (hasT) {
          el.style.transformOrigin = v.ox + "px " + v.oy + "px";
          el.style.transform = "translate(" + v.x.toFixed(2) + "px," + v.y.toFixed(2) + "px) rotate(" + v.r + "deg) scale(" + sx + "," + sy + ")";
        }
        if (p.o != null) el.style.opacity = p.o;
        if (p.draw != null) el.style.strokeDashoffset = (1.05 - p.draw * 1.05).toFixed(3);
        paint(el, p, function (t, pv) {
          if (t !== el) t.style.transition = inst ? "none" : "fill " + dur + "s ease " + dl + "s, stroke " + dur + "s ease " + dl + "s";
          if (pv.fill != null) t.style.fill = pv.fill;
          if (pv.stroke != null) t.style.stroke = pv.stroke;
        });
      }
      /* Recolour: a keyed <g> recolours its [data-paint] children; other elements recolour themselves. */
      function paint(el, p, fn) {
        if (p.fill == null && p.stroke == null) return;
        var pv = {}; if (p.fill != null) pv.fill = p.fill; if (p.stroke != null) pv.stroke = p.stroke;
        var tg = el.tagName && el.tagName.toLowerCase() === "g" ? el.querySelectorAll("[data-paint]") : [el];
        Array.prototype.forEach.call(tg, function (t) { fn(t, pv); });
      }
      var A = {
        inst: inst,
        el: function (k) { return els(k)[0] || null; },
        set: function (k, p, o) { els(k).forEach(function (el) { setEl(el, p, o); }); return A; },
        show: function (k, yes, o) { return A.set(k, { o: yes ? 1 : 0 }, o || { t: 0.5 }); },
        text: function (k, str) {
          els(k).forEach(function (el) {
            var t = el.tagName && el.tagName.toLowerCase() === "text" ? el : el.querySelector("text");
            if (!t || t.textContent === str) return;
            t.textContent = str;
            var pg = el.getAttribute && el.getAttribute("data-pill") ? el : (t.parentNode && t.parentNode.getAttribute && t.parentNode.getAttribute("data-pill") ? t.parentNode : null);
            if (pg) fitPill(pg);
            if (!inst) { t.classList.remove("vp"); void t.getBoundingClientRect(); t.classList.add("vp"); }
          });
          return A;
        },
        attr: function (k, p, o) {
          o = o || {}; var dur = (o.t != null ? o.t : 0.8) * 1000, dl = (o.dl || 0) * 1000;
          els(k).forEach(function (el) {
            var from = {}, keys = Object.keys(p);
            keys.forEach(function (q) { from[q] = parseFloat(el.getAttribute(q)) || 0; });
            if (inst || dur <= 0) { keys.forEach(function (q) { el.setAttribute(q, p[q]); }); return; }
            var t0 = null;
            function tick(ts) {
              if (t0 === null) t0 = ts + dl;
              var u = clamp((ts - t0) / dur, 0, 1), e = 1 - Math.pow(1 - u, 3);
              keys.forEach(function (q) { el.setAttribute(q, (from[q] + (p[q] - from[q]) * e).toFixed(2)); });
              if (u < 1) S.rafs.push(requestAnimationFrame(tick));
            }
            S.rafs.push(requestAnimationFrame(tick));
          });
          return A;
        },
        count: function (k, to, o) {
          o = o || {}; var fmt = o.fmt || function (v) { return String(Math.round(v)); }, dur = (o.t != null ? o.t : 1) * 1000;
          els(k).forEach(function (el) {
            var from = el.__n != null ? el.__n : 0; el.__n = to;
            if (inst || from === to) { el.textContent = fmt(to); return; }
            var t0 = null;
            function tick(ts) {
              if (t0 === null) t0 = ts;
              var u = clamp((ts - t0) / dur, 0, 1), e = 1 - Math.pow(1 - u, 3);
              el.textContent = fmt(from + (to - from) * e);
              if (u < 1) S.rafs.push(requestAnimationFrame(tick));
            }
            S.rafs.push(requestAnimationFrame(tick));
          });
          return A;
        },
        later: function (ms, fn) { if (inst) fn(); else S.timers.push(setTimeout(fn, ms)); return A; },
        /* Travel through offsets [[x,y],...]; o.t = total duration. */
        route: function (k, pts, o) {
          o = o || {}; var total = o.t || 1.6, n = pts.length;
          if (inst || n < 2) { A.set(k, { x: pts[n - 1][0], y: pts[n - 1][1] }, { t: 0 }); return A; }
          var leg = total / (n - 1);
          A.set(k, { x: pts[0][0], y: pts[0][1] }, { t: 0.25, e: "io" });
          for (var j = 1; j < n; j++) (function (j) {
            A.later(250 + (j - 1) * leg * 1000, function () { A.set(k, { x: pts[j][0], y: pts[j][1], r: pts[j][2] != null ? pts[j][2] : undefined }, { t: leg, e: o.e || "lin" }); });
          })(j);
          return A;
        },
        flip: function (k) {
          if (inst) return A;
          els(k).forEach(function (el) { el.classList.remove("a-flip"); void el.getBoundingClientRect(); el.classList.add("a-flip"); });
          return A;
        },
        chip: function (str) {
          if (S.chip !== str) {
            S.chip = str; A.text("chipT", str); fitChip();
            if (S.svg) S.svg.setAttribute("aria-label", cfg.title + ": " + str);
          }
          return A;
        }
      };
      return A;
    }

    function apply(i, instant) {
      if (!S.root) return;
      clearAsync();
      var A = animator(instant);
      S.cur = i;
      try { cfg.run(i, A, S); } catch (e) { if (W.console) console.warn("VL scene " + id + " step failed:", e); }
    }
    function mapI(i, n) {
      i = Number(i); n = Number(n);
      if (!isFinite(i)) i = 0;
      if (!isFinite(n) || n < 1) n = Lm;
      i = clamp(Math.floor(i), 0, Math.max(0, Math.floor(n) - 1));
      if (Math.floor(n) === Lm) return i;
      return n <= 1 ? 0 : Math.round(i * (Lm - 1) / (Math.floor(n) - 1));
    }

    addCSS("scene-" + id, baseCSS(id, cfg.bg || C.paper, cfg.halo || C.paper) + (cfg.css ? cfg.css(".vls-w01-" + id) : ""));

    return {
      build: function (el) {
        if (!el || !el.appendChild) return;
        clearAsync();
        if (S.ro) { try { S.ro.disconnect(); } catch (e) { } S.ro = null; }
        S.keys = {}; S.chip = ""; S.uid = "w01" + id + (++UIDN);
        var root = W.document.createElement("div");
        root.className = "vls-w01-" + id;
        root.setAttribute("data-vls-scene", id);
        root.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + VW + " " + VH + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(cfg.title) + '" focusable="false">' +
          cfg.draw(S.uid) + chipMarkup(cfg.chipColor) + "</svg>";
        if (typeof el.replaceChildren === "function") el.replaceChildren(root);
        else { while (el.firstChild) el.removeChild(el.firstChild); el.appendChild(root); }
        S.root = root; S.svg = root.querySelector("svg");
        Array.prototype.forEach.call(root.querySelectorAll("[data-pill]"), fitPill);
        fit();
        if (cfg.layout) { try { cfg.layout(els); } catch (e) { } }
        if (W.ResizeObserver) {
          S.ro = new ResizeObserver(function () { if (!S.root || !S.root.isConnected) { if (S.ro) S.ro.disconnect(); return; } fit(); });
          S.ro.observe(root);
        }
        apply(0, true);
      },
      step: function (i, n) { if (S.root) apply(mapI(i, n), false); },
      reset: function () { if (S.root) apply(0, true); }
    };
  }

  /* ==========================================================
     W1INTRO · "NIGHT ARRIVAL"
     Technique: multiplane parallax camera (sky / skyline / lobby move at
     different rates), a living character with a draining patience battery,
     a count-up map, and a constellation of the four learning goals.
     28 narration moments.
     ========================================================== */
  (function () {
    var N = 28;
    // Give the two unnumbered Week 1 sections stable ids (idempotent).
    try {
      var Ls = W.COURSE && W.COURSE.lessons;
      if (Ls && Ls.length) {
        var f = Ls[0].sections && Ls[0].sections[0];
        var ll = Ls[Ls.length - 1].sections; var lst = ll && ll[ll.length - 1];
        if (f && !f.sec) f.sec = "W1INTRO";
        if (lst && !lst.sec) lst.sec = "W1OUTRO";
      }
    } catch (e) { }

    var GX = 40;           // guest base x (feet)
    var HOTELS = [[205, 200], [236, 150], [262, 118], [300, 92], [338, 128], [372, 96], [250, 262], [288, 214], [330, 176], [366, 240], [312, 276], [226, 104], [350, 300], [280, 160]];

    function draw(u) {
      var r = rnd(7), stars = "", k, sky = "", win = "";
      for (k = 0; k < 70; k++) {
        var sx = -300 + r() * 1000, sy = -560 + r() * 680, sr = 0.6 + r() * 1.4;
        stars += Ci(sx.toFixed(1), sy.toFixed(1), sr.toFixed(1), "#e9f1ff", { "class": k % 3 ? "" : "a-twinkle", opacity: (0.4 + r() * 0.6).toFixed(2) });
      }
      // skyline silhouettes (mid layer)
      var bx = -320;
      while (bx < 720) {
        var bw = 26 + Math.round(r() * 40), bh = 50 + Math.round(r() * 110);
        sky += R(bx, 262 - bh, bw, bh + 300, 0, k % 2 ? "#1d3550" : "#203b58");
        for (var wy = 262 - bh + 8; wy < 252; wy += 12) for (var wx = bx + 5; wx < bx + bw - 6; wx += 9)
          if (r() > 0.62) win += R(wx, wy, 4, 5, 0, "#f7d48b", { opacity: (0.5 + r() * 0.5).toFixed(2) });
        bx += bw + 4; k++;
      }
      var pins = HOTELS.map(function (h, j) {
        return G("pin" + j, F("M" + h[0] + " " + h[1] + " q-9 -12 -9 -19 a9 9 0 0 1 18 0 q0 7 -9 19 z", j === 0 ? C.orange : C.navy) + Ci(h[0], h[1] - 19, 3.5, C.white), { "data-o": h[0] + " " + h[1] });
      }).join("");
      var star = function (k2, x, y, icon) {
        return G(k2, Ci(x, y, 34, "#f2c46d", { opacity: 0.18 }) + Ci(x, y, 24, "#21405f", { stroke: "#f2c46d", "stroke-width": 2.5 }) + icon, { "data-o": x + " " + y });
      };
      return "" +
        "<defs>" +
        '<linearGradient id="' + u + 'sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1c2e"/><stop offset=".7" stop-color="#1c3654"/><stop offset="1" stop-color="#2c4d6e"/></linearGradient>' +
        '<radialGradient id="' + u + 'warm" cx=".5" cy=".35" r=".8"><stop offset="0" stop-color="#fff3d9"/><stop offset="1" stop-color="#f1d9ae"/></radialGradient>' +
        '<linearGradient id="' + u + 'sea" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a6f97"/><stop offset="1" stop-color="#1f4e79"/></linearGradient>' +
        '<mask id="' + u + 'spot" maskUnits="userSpaceOnUse" x="-800" y="-800" width="2000" height="2000">' + R(-800, -800, 2000, 2000, 0, "#fff") + Ci(GX + 196, 222, 64, "#000") + "</mask>" +
        "</defs>" +
        // FAR LAYER: sky, stars, moon, plane
        G("far", R(-900, -900, 2200, 1500, 0, "url(#" + u + "sky)") + stars +
          G("moon", Ci(116, 60, 13, "#f6edd6") + Ci(121, 56, 11, "#1a3150")) +
          G("plane", I.plane(0, 0, 1.15, "#e8eef6") + P("M-16 1 H-60", "#e8eef6", 1.2, { opacity: 0.5, "stroke-dasharray": "3 4" }), { "data-o": "0 0" })) +
        // MID LAYER: skyline
        G("mid", sky + win) +
        // NEAR LAYER: street + Qasr Marina lobby
        G("near",
          R(-900, 262, 2200, 700, 0, "#22344a") + R(-900, 262, 2200, 5, 0, "#3a5370") +
          R(150, 70, 900, 192, 0, "#e7dac2") + R(150, 70, 900, 10, 0, "#cdbb98") +
          T(279, 96, "QASR MARINA", 18, "#a7742f", { "class": "lb hl", "letter-spacing": "3" }) +
          R(420, 112, 90, 150, 4, "#f1dcb4", { stroke: "#c9b48f", "stroke-width": 4 }) +
          R(166, 104, 226, 158, 3, "url(#" + u + "warm)", { stroke: "#c9b48f", "stroke-width": 4 }) +
          El(280, 262, 120, 14, "#e2c690", { opacity: 0.6 }) +
          // wall clock
          Ci(196, 128, 13, C.white, { stroke: C.navy, "stroke-width": 2.5 }) +
          G("clockH", L(196, 128, 196, 119, C.ink, 2) + L(196, 128, 202, 131, C.orange, 2), { "data-o": "196 128" }) +
          // housekeeping door + housekeeper
          R(174, 168, 36, 94, 2, "#d9c49c", { stroke: "#b49a6d", "stroke-width": 2 }) +
          G("hk", fig(192, 262, 0.78, C.green, { k: "hkm" })) +
          // remote revenue colleague (phone avatar)
          G("rev", Ci(360, 128, 17, C.white, { stroke: C.navy, "stroke-width": 2 }) + fig(360, 146, 0.5, C.slate, {}) + P("M352 148 Q340 166 352 182", C.navy, 1.6, { "stroke-dasharray": "3 3" })) +
          // receptionist behind desk
          G("rec", fig(350, 240, 1, C.navy, { k: "recm", hair: "long" })) +
          G("phone", I.phone(366, 196, 0.85, C.ink), { opacity: 0 }) +
          // desk
          R(270, 212, 130, 50, 3, C.navy) + R(268, 208, 134, 7, 2, C.gold) + I.bell(384, 202, 0.55) +
          G("scr", I.screen(310, 197, 1.2, C.ink)) +
          G("scrBad", R(298, 188, 24, 15, 1, C.red) + T(310, 201, "≠", 15, C.white, { "class": "lb hn" }), { opacity: 0 }) +
          G("pass", I.passport(0, 0, 0.8), { opacity: 0, "data-o": "0 0" }) +
          G("pass2", T(282, 182, "×2", 16, C.orange, { "class": "lb hl" }), { opacity: 0 }) +
          // emotional reactions
          G("hearts", I.heart(192, 150, 0.8) + I.heart(350, 170, 0.8) + I.heart(384, 108, 0.8), { opacity: 0 }) +
          G("oks", [[192, 150], [350, 170], [384, 108]].map(function (p) { return Ci(p[0], p[1], 10, C.green, { stroke: C.white, "stroke-width": 2 }) + check(p[0], p[1] + 1, 0.6, C.white, 2.6); }).join(""), { opacity: 0 }) +
          // the thread that connects the departments
          PD("thread", "M192 214 C220 150 300 104 344 128 C396 150 380 196 352 196", C.orange, 4) +
          PD("ring", "M280 112 C370 112 400 160 396 206 C392 252 330 258 280 258 C220 258 172 252 172 206 C172 150 200 112 280 112", C.sun, 3, { "stroke-dasharray": "1 2" }) +
          G("tok", Ci(192, 214, 9, C.sun, { stroke: C.white, "stroke-width": 2 }), { opacity: 0, "data-o": "192 214" }) +
          // room the guest really wants
          G("room", R(316, 116, 54, 74, 3, "#fff7e6", { stroke: C.green, "stroke-width": 3 }) + I.bed(343, 160, 1.15, C.green) + I.star(343, 132, 0.6, C.sun), { opacity: 0, "data-o": "343 153" }) +
          PD("goal", "M266 238 C300 236 330 214 340 192", C.green, 4, { "stroke-dasharray": "1 2" }) +
          G("qs", [[288, 232], [318, 220]].map(function (p) { return Ci(p[0], p[1], 10, C.white, { stroke: C.orange, "stroke-width": 2 }) + T(p[0], p[1] + 6, "?", 16, C.orange, { "class": "lb hn" }); }).join(""), { opacity: 0 }) +
          // "ON HOLD" and mismatch callouts
          pill("hold", 286, 132, "ON HOLD", { fill: C.orange, attrs: { opacity: 0 } }) +
          pill("mis", 300, 152, "DATA MISMATCH", { fill: C.red, attrs: { opacity: 0 } }) +
          // the guest
          G("guest",
            fig(GX, 262, 1.1, C.orange, { k: "gm", hair: "long" }) +
            R(GX + 16, 236, 14, 24, 3, C.navy) + P("M" + (GX + 19) + " 236 V231 H" + (GX + 27) + " V236", C.navy, 2) +
            G("batt", R(GX - 21, 168, 38, 16, 3, "#0f2236", { stroke: C.white, "stroke-width": 2 }) + R(GX + 17, 172, 4, 8, 1, C.white) +
              G("battF", R(GX - 18, 171, 32, 10, 1.5, C.mint, { "data-paint": 1 }), { "data-o": (GX - 18) + " 176" })) +
            G("sweat", F("M" + (GX + 12) + " 204 q3 5 0 7 q-3 -2 0 -7z", "#8fc6ee"), { opacity: 0 }) +
            G("gKey", I.key(GX + 20, 230, 0.8), { opacity: 0 }) +
            G("qOrb", Ci(GX + 24, 228, 9, C.sun, { "class": "a-pulse" }) + T(GX + 24, 233, "?", 14, C.ink, { "class": "lb hn" }), { opacity: 0 }),
            { "data-o": GX + " 230" }) +
          G("qBig", T(252, 160, "?", 56, C.orange, { "class": "lb hl" }), { opacity: 0, "data-o": "236 130" }) +
          G("dim", R(-900, -900, 2200, 2200, 0, "#0b1726", { mask: "url(#" + u + "spot)" }), { opacity: 0 }),
          { "data-o": (GX + 196) + " 222" }) +
        // MAP SET
        G("map",
          R(-900, 40, 2200, 900, 0, "url(#" + u + "sea)") +
          F("M196 330 C190 290 214 268 198 236 C186 206 214 178 206 150 C200 120 232 96 236 66 L1200 66 L1200 900 L196 900 Z", "#efe0bf") +
          P("M196 330 C190 290 214 268 198 236 C186 206 214 178 206 150 C200 120 232 96 236 66", "#fff6df", 3, { opacity: 0.8 }) +
          pins +
          G("mRing", Ci(205, 181, 22, "none", { stroke: C.orange, "stroke-width": 3 }), { opacity: 0, "data-o": "205 181" }) +
          pill("mPill", 108, 150, "QASR MARINA", { fill: C.orange, attrs: { opacity: 0 } }) +
          G("mPlane", I.plane(0, 0, 1.3, C.white), { opacity: 0, "data-o": "0 0" }) +
          pill("mDelay", 112, 82, "DELAYED FLIGHT", { fill: C.red, attrs: { opacity: 0 } }) +
          G("stats", R(14, 192, 174, 116, 12, "#0f2a44", { opacity: 0.88 }) +
            TK("nHotels", 50, 236, "0", 38, C.sun, { "class": "lb hn" }) + T(122, 230, "HOTELS &", 15, "#dfe9f3", { "class": "lb hn" }) + T(122, 247, "RESORTS", 15, "#dfe9f3", { "class": "lb hn" }) +
            TK("nStaff", 100, 282, "0", 32, C.white, { "class": "lb hn" }) + T(100, 302, "QASR EMPLOYEES", 15, "#dfe9f3", { "class": "lb hn" }), { opacity: 0 }) +
          G("bars", R(214, 196, 178, 112, 12, C.paper, { opacity: 0.96 }) +
            [0, 1, 2, 3].map(function (j) { return G("bar" + j, R(232 + j * 26, 220, 18, 64, 3, C.green), { "data-o": (241 + j * 26) + " 284" }) + I.hotel(241 + j * 26, 296, 0.5, C.navy); }).join("") +
            P("M342 212 V290", C.mute, 1.5, { "stroke-dasharray": "3 3" }) +
            G("barG", R(354, 220, 22, 64, 3, C.red), { "data-o": "365 284" }) + Ci(365, 296, 7, C.skin) +
            P("M361 299 Q365 296 369 299", C.ink, 1.4), { opacity: 0 }),
          { opacity: 0 }) +
        // CONSTELLATION SET: four goals and K1
        G("cons",
          PD("cl0", "M95 108 L305 108", "#f2c46d", 2, { opacity: 0.8 }) +
          PD("cl1", "M305 132 L305 202", "#f2c46d", 2, { opacity: 0.8 }) +
          PD("cl2", "M281 226 L119 226", "#f2c46d", 2, { opacity: 0.8 }) +
          PD("ck0", "M117 120 L176 152", C.sun, 2.5) + PD("ck1", "M283 120 L224 152", C.sun, 2.5) +
          PD("ck2", "M117 214 L176 182", C.sun, 2.5) + PD("ck3", "M283 214 L224 182", C.sun, 2.5) +
          PD("story", "M40 312 C60 290 80 262 95 250 L95 108 L305 108 L305 226 C292 250 246 236 222 192", "#ffe6a8", 3, { "stroke-dasharray": "1 2" }) +
          star("s0", 95, 108, I.flag(95, 108, 1, C.mint)) + T(95, 70, "SPOT A PROCESS", 16, "#f6edd6", { "class": "lb hd", "data-k": "sl0" }) +
          star("s1", 305, 108, I.chain(304, 108, 1)) + T(305, 70, "SEE THE GAP", 16, "#f6edd6", { "class": "lb hd", "data-k": "sl1" }) +
          star("s2", 95, 226, I.route(95, 226, 1.1)) + T(95, 276, "MANAGE JOURNEYS", 16, "#f6edd6", { "class": "lb hd", "data-k": "sl2" }) +
          star("s3", 305, 226, I.stairs(305, 226, 1, C.sun)) + T(305, 276, "BPM AND MATURITY", 16, "#f6edd6", { "class": "lb hd", "data-k": "sl3" }) +
          G("k1", Ci(200, 167, 31, C.sun) + Ci(200, 167, 25, "none", { stroke: "#8a5a17", "stroke-width": 2, "stroke-dasharray": "3 3" }) +
            T(200, 177, "K1", 26, "#5a3a10", { "class": "lb hn" }), { "data-o": "200 167" }),
          { opacity: 0 });
    }

    function run(i, A) {
      var lobby = i <= 14 || i >= 25, mapS = on(i, 15, 18), consS = on(i, 19, 24);
      // camera: three depth layers move at different rates
      var cam = lobby ? 0 : mapS ? 1 : 2;
      A.set("far", { y: [0, 70, 130][cam] }, { t: 1.4, e: "io" });
      A.show("moon", lobby, { t: 0.8 });
      A.set("mid", { y: [0, 210, 320][cam] }, { t: 1.4, e: "io" });
      var zoom = i === 9 ? 1.22 : i === 8 ? 1.08 : i === 10 ? 1.04 : 1;
      A.set("near", { y: [0, 380, 460][cam], s: zoom, o: lobby ? 1 : 0 }, { t: 1.2, e: "io" });
      A.set("map", { y: [-330, 0, 330][cam], o: mapS ? 1 : 0 }, { t: 1.2, e: "io" });
      A.set("cons", { y: [-330, -330, 0][cam], o: consS ? 1 : 0 }, { t: 1.2, e: "io" });

      // plane crosses the night sky in the opening
      A.set("plane", i === 0 ? { x: 250, y: 34, r: 8, o: 1 } : i === 1 ? { x: 470, y: 60, r: 14, o: 0 } : { x: -60, y: 40, r: 0, o: 0 }, { t: 1.6, e: "io" });

      // guest walks in: outside → entrance → desk
      var gx = [-110, 0, 86, 196][Math.min(i, 3)];
      var slump = on(i, 8, 9) ? 0.94 : 1;
      A.set("guest", { x: gx, sy: slump, sx: 1 }, { t: i <= 3 ? 1.4 : 0.6, e: "io" });
      var batt = i < 2 ? 0.9 : i < 5 ? 0.75 : i < 8 ? 0.5 : i < 11 ? 0.18 : on(i, 11, 14) ? 0.3 : i === 26 ? 0.95 : 0.4;
      A.set("battF", { sx: batt, fill: batt > 0.6 ? C.mint : batt > 0.3 ? C.sun : C.coral }, { t: 0.9 });
      A.show("batt", i >= 2);
      A.show("sweat", on(i, 8, 10));
      A.set("gm-sm", { o: on(i, 4, 25) ? 0 : 1 }, { t: 0.3 });
      A.set("gm-fr", { o: on(i, 4, 25) ? 1 : 0 }, { t: 0.3 });
      A.set("clockH", { r: i <= 2 ? 0 : i <= 9 ? (i - 2) * 75 : 600 }, { t: 1.2, e: "io" });

      // the desk drama
      A.show("scrBad", on(i, 4, 10));
      A.show("mis", i === 4);
      A.show("hold", i === 5);
      A.set("phone", { o: on(i, 5, 7) ? 1 : 0, r: i === 5 ? -12 : 0 }, { t: 0.4 });
      A.set("pass", i >= 5 && i <= 8 ? { x: 276, y: 196, o: 1, r: -8 } : { x: GX + 196 + 20, y: 236, o: 0, r: 0 }, { t: 0.9, e: "io" });
      A.show("pass2", on(i, 5, 8));
      var staffOn = i <= 24 ? 1 : 0.3;
      A.set("hk", { o: i >= 6 ? staffOn : 0, y: i >= 6 ? 0 : 8 }, { t: 0.6 });
      A.set("rev", { o: on(i, 5, 24) ? 1 : i >= 25 ? 0 : 0, s: i === 5 ? 1.08 : 1 }, { t: 0.6, e: "back" });
      A.set("rec", { o: i >= 3 ? staffOn : 0.0, y: i >= 3 ? 0 : 10 }, { t: 0.7, e: "out" });
      A.set("hearts", { o: i === 6 ? 1 : 0, y: i === 6 ? -6 : 4 }, { t: 0.6, e: "back" });
      A.set("oks", { o: on(i, 7, 10) || on(i, 12, 14) ? 1 : 0, s: i === 7 ? 1.06 : 1 }, { t: 0.5, e: "back" });
      A.set("dim", { o: i === 9 ? 0.62 : 0 }, { t: 0.8 });
      A.set("qBig", { o: i === 10 ? 1 : 0, s: i === 10 ? 1 : i === 11 ? 0.2 : 0.6, x: i === 11 ? 24 : 0, y: i === 11 ? 98 : 0 }, { t: 0.8, e: "back" });
      A.show("qOrb", on(i, 11, 14));

      // departments working together → BPM
      A.set("thread", { draw: on(i, 12, 14) ? 1 : 0 }, { t: 1.1, e: "io" });
      A.set("ring", { draw: on(i, 13, 14) ? 1 : 0, o: on(i, 13, 14) ? 1 : 0 }, { t: 1.2, e: "io" });
      if (i === 14) { A.set("tok", { o: 1 }, { t: 0.2 }); A.route("tok", [[0, 0], [70, -70], [152, -86], [160, -18], [74, 18]], { t: 2.2, e: "io" }); }
      else A.set("tok", { o: 0, x: 0, y: 0 }, { t: 0.3 });
      A.set("gKey", { o: i === 14 || i >= 26 ? 1 : 0 }, { t: 0.5, dl: i === 14 ? 2.3 : 0 });

      // closing: only her result matters
      A.set("room", { o: i >= 26 ? 1 : 0, s: i >= 26 ? 1 : 0.6 }, { t: 0.8, e: "back" });
      A.set("goal", { draw: i >= 26 ? 1 : 0, o: i >= 26 ? 1 : 0 }, { t: 1 });
      A.set("qs", { o: i === 27 ? 1 : 0, s: i === 27 ? 1 : 0.5 }, { t: 0.6, e: "back" });

      // map: 14 hotels, 3,100 people, the Marina
      HOTELS.forEach(function (h, j) {
        var vis = i >= 16 || (i === 15 && j === 0);
        A.set("pin" + j, { s: vis ? (i === 17 && j === 0 ? 1.35 : 1) : 0.01, o: vis ? (i === 18 && j !== 0 ? 0.25 : 1) : 0 }, { t: 0.5, dl: i === 16 ? j * 0.07 : 0, e: "back" });
      });
      A.show("stats", on(i, 16, 17));
      A.count("nHotels", i >= 16 ? 14 : 0, { t: 1 });
      A.count("nStaff", i >= 16 ? 3100 : 0, { t: 1.4, fmt: function (v) { return Math.round(v).toLocaleString("en-US"); } });
      A.set("mRing", { o: on(i, 17, 18) ? 1 : 0, s: i === 17 ? 1.3 : 1 }, { t: 0.7, e: "back" });
      A.show("mPill", i === 17);
      A.set("mPlane", i === 17 ? { x: 168, y: 150, r: 35, o: 1 } : { x: 20, y: 60, r: 20, o: 0 }, { t: 1.5, e: "io" });
      A.show("mDelay", i === 17);
      A.show("bars", i === 18);
      [0, 1, 2, 3].forEach(function (j) { A.set("bar" + j, { sy: i === 18 ? 1 : 0.05 }, { t: 0.7, dl: j * 0.1, e: "back" }); });
      A.set("barG", { sy: i === 18 ? 0.28 : 0.05 }, { t: 0.7, dl: 0.5 });

      // constellation of the four goals → K1 → one story
      for (var g = 0; g < 4; g++) {
        var lit = i >= 19 + g;
        A.set("s" + g, { s: lit ? (i === 19 + g ? 1.15 : 1) : 0.6, o: lit ? 1 : 0.25 }, { t: 0.7, e: "back" });
        A.set("sl" + g, { o: lit ? 1 : 0 }, { t: 0.5 });
        A.set("ck" + g, { draw: i >= 23 ? 1 : 0 }, { t: 0.8, dl: g * 0.12 });
      }
      for (var c = 0; c < 3; c++) A.set("cl" + c, { draw: i >= 20 + c ? 1 : 0 }, { t: 0.9 });
      A.set("k1", { s: i >= 23 ? 1 : 0.01, o: i >= 23 ? 1 : 0, r: i >= 23 ? 0 : -90 }, { t: 0.9, e: "back" });
      A.set("story", { draw: i === 24 ? 1 : 0, o: i === 24 ? 1 : 0 }, { t: 2, e: "io" });

      A.chip([
        "WELCOME TO WEEK 1", "A LONG JOURNEY", "A TIRED GUEST", "A WARM WELCOME", "THE DATA MISMATCH",
        "ONE MORE CALL", "NOBODY IS RUDE", "EVERY JOB DONE", "STILL WAITING", "PAUSE AND LOOK",
        "THE BIG QUESTION", "CARRY THIS QUESTION", "DEPARTMENTS WORK TOGETHER", "BUSINESS PROCESS MANAGEMENT", "WORK BECOMES VALUE",
        "QASR HOSPITALITY GROUP", "14 HOTELS, 3,100 PEOPLE", "QASR MARINA", "DEPARTMENTS PASS, GUEST FAILS",
        "GOAL 1", "GOAL 2", "GOAL 3", "GOAL 4", "OUTCOME K1", "ONE UNFOLDING STORY",
        "SHE IGNORES DEPARTMENTS", "THE RIGHT ROOM", "WHAT IS THE PROCESS?"][i]);
    }

    REG.W1INTRO = makeScene("W1INTRO", {
      n: N, title: "Night arrival at Qasr Marina: a tired guest, helpful staff, and the question of the whole process",
      bg: "#13263b", halo: "#13263b", chipColor: C.orange, draw: draw, run: run
    });
  })();

  /* ==========================================================
     O1a · "THE DOMINO RUN"
     Metaphor: a business process is a chain reaction. The guest's request
     rings the first bell (trigger); dominoes topple lane by lane (sequence);
     marbles drop down chutes between departments (handoffs); the last
     domino must open the room door (end state). The key falls early, the
     door stays shut: task done is not outcome delivered.
     Technique: physics-style staggered cascade across swim-lanes.
     34 narration moments.
     ========================================================== */
  (function () {
    var N = 34;
    var GA = 124, GB = 206, GC = 288;           // lane grounds
    var DA = [146, 168, 190], DB = [244, 264, 284], DC = [326, 344], DK = 304;

    function domino(k, x, g, col) {
      return G(k, R(x, g - 34, 12, 34, 2.5, col, { stroke: "rgba(0,0,0,.18)", "stroke-width": 1, "data-paint": 1 }) + Ci(x + 6, g - 25, 2, C.white) + Ci(x + 6, g - 12, 2, C.white), { "data-o": (x + 12) + " " + g });
    }
    function draw(u) {
      var lanes =
        G("lnA", R(-900, 48, 2200, 82, 0, "#fbf2e2")) +
        G("lnB", R(-900, 130, 2200, 82, 0, "#e9f2ea")) +
        G("lnC", R(-900, 212, 2200, 82, 0, "#e6eef7")) +
        L(-900, 130, 1300, 130, "#d3c4a7", 1.5) + L(-900, 212, 1300, 212, "#c4d3c6", 1.5) + L(-900, 294, 1300, 294, "#c3cfdc", 1.5) +
        L(-900, GA, 1300, GA, "#cdb58c", 2) + L(-900, GB, 1300, GB, "#a9c2ad", 2) + L(-900, GC, 1300, GC, "#a8bccf", 2);
      var labels =
        G("lhA", Pos(R(-8, -16, 1, 22, 11, C.sun)), { opacity: 0 }) + G("lhB", Pos(R(-8, -16, 1, 22, 11, C.sun)), { opacity: 0 }) + G("lhC", Pos(R(-8, -16, 1, 22, 11, C.sun)), { opacity: 0 }) +
        G("labA", T(386, 71, "FRONT DESK", 16, "#8a5a17", { "text-anchor": "end" })) +
        G("labB", T(386, 153, "REVENUE OFFICE", 16, C.green, { "text-anchor": "end" })) +
        G("labC", T(386, 235, "HOUSEKEEPING", 16, C.navy, { "text-anchor": "end" })) +
        G("icA", Pos(I.doc(0, 0, 0.8))) + G("icB", Pos(I.money(0, 0, 0.8))) + G("icC", Pos(I.bed(0, 0, 0.8))) +
        ["okA", "okB", "okC"].map(function (k) { return G(k, Pos(Ci(0, 0, 10, C.green) + check(0, 1, 0.55, C.white, 2.4)), { opacity: 0 }); }).join("");
      var doms = DA.map(function (x, j) { return domino("dA" + j, x, GA, "#c98b3a"); }).join("") +
        DB.map(function (x, j) { return domino("dB" + j, x, GB, C.green); }).join("") +
        DC.map(function (x, j) { return domino("dC" + j, x, GC, j === 1 ? C.navy : C.navy); }).join("") +
        domino("dK", DK, GA, C.gold);
      return lanes +
        G("board",
          labels +
          G("grpA", R(140, 84, 70, 44, 10, "none", { stroke: C.orange, "stroke-width": 2, "stroke-dasharray": "5 4" }), { opacity: 0 }) +
          G("grpB", R(238, 166, 64, 44, 10, "none", { stroke: C.orange, "stroke-width": 2, "stroke-dasharray": "5 4" }), { opacity: 0 }) +
          G("grpC", R(320, 248, 42, 44, 10, "none", { stroke: C.orange, "stroke-width": 2, "stroke-dasharray": "5 4" }), { opacity: 0 }) +
          PD("guide", "M64 110 C120 70 170 80 214 112 C240 150 230 170 250 196 C290 196 300 230 318 276 C330 286 350 280 372 264", C.orange, 3, { "stroke-dasharray": "1 2", opacity: 0.7 }) +
          // chutes between lanes (handoffs)
          G("chA", P("M206 121 C226 124 234 160 232 204", "#b9a27d", 9, { opacity: 0.55 }) + P("M206 121 C226 124 234 160 232 204", C.white, 3, { opacity: 0.8 })) +
          G("chB", P("M298 203 C318 208 322 250 318 286", "#9fb5a3", 9, { opacity: 0.55 }) + P("M298 203 C318 208 322 250 318 286", C.white, 3, { opacity: 0.8 })) +
          G("chGlow", P("M206 121 C226 124 234 160 232 204", C.orange, 4) + P("M298 203 C318 208 322 250 318 286", C.orange, 4), { opacity: 0 }) +
          // room door (end state)
          G("doorGlow", R(352, 236, 44, 56, 6, "none", { stroke: C.sun, "stroke-width": 4 }), { opacity: 0 }) +
          G("doorBad", R(352, 236, 44, 56, 6, "none", { stroke: C.red, "stroke-width": 4 }), { opacity: 0 }) +
          R(358, 241, 34, 47, 2, "#fff6e3") + I.bed(375, 270, 0.9, C.green) +
          G("door", R(358, 241, 34, 47, 2, "#a8743f", { stroke: "#7d532a", "stroke-width": 1.5 }) + Ci(364, 266, 2.4, C.sun), { "data-o": "392 264" }) +
          G("doorLock", I.lock(375, 262, 0.8, C.red), { opacity: 0 }) +
          G("ghost", fig(375, 288, 0.62, C.orange, { hair: "long" }), { opacity: 0 }) +
          // trigger bell
          G("bellRing", Ci(64, 112, 16, "none", { stroke: C.orange, "stroke-width": 2.5 }) + Ci(64, 112, 25, "none", { stroke: C.orange, "stroke-width": 1.5, opacity: 0.6 }), { opacity: 0, "data-o": "64 112" }) +
          G("bell", I.bell(64, 114, 0.85), { "data-o": "64 124" }) +
          doms +
          G("mb", Ci(212, 117, 6, C.orange, { stroke: C.white, "stroke-width": 1.5 }), { "data-o": "212 117" }) +
          G("docTok", I.doc(212, 108, 0.7), { opacity: 0, "data-o": "212 108" }) +
          // receptionist and her own task list
          G("rec", fig(346, GA, 0.85, C.navy, { k: "recm", hair: "long" })) +
          G("bub", R(206, 72, 92, 34, 10, C.white, { stroke: C.navy, "stroke-width": 1.5 }) + F("M286 106 L300 114 L292 104 Z", C.white) + I.doc(232, 89, 0.7) + I.key(268, 89, 0.85), { opacity: 0 }) +
          G("qB", T(214, 186, "?", 26, C.orange), { opacity: 0 }) + G("qC", T(246, 268, "?", 26, C.orange), { opacity: 0 }) +
          // pills
          P("M64 126 V134", C.orange, 2, { "data-k": "trigLn", opacity: 0 }) +
          pill("pTrig", 80, 148, "THE TRIGGER", { fill: C.orange, attrs: { opacity: 0 } }) +
          pill("pSeq", 112, 252, "THE SEQUENCE", { fill: C.green, attrs: { opacity: 0 } }) +
          pill("pH1", 168, 176, "HANDOFF", { fill: C.navy, attrs: { opacity: 0 } }) +
          pill("pH2", 262, 254, "HANDOFF", { fill: C.navy, attrs: { opacity: 0 } }) +
          pill("pEnd", 346, 172, "END STATE", { fill: "#a7742f", size: 15, attrs: { opacity: 0 } }) +
          pill("pMiss", 312, 172, "OUTCOME MISSING", { fill: C.red, size: 15, attrs: { opacity: 0 } }) +
          pill("pTask", 250, 94, "TASK DONE", { fill: C.green, attrs: { opacity: 0 } }) +
          G("brk", P("M14 298 V304 H386 V298", C.orange, 3) + T(200, 316, "ONE PROCESS", 16, C.orange), { opacity: 0 }) +
          // guest
          G("guest", fig(24, GA, 0.8, C.orange, { k: "gm", hair: "long" }), { "data-o": "24 " + GA }) +
          G("qG", T(240, 234, "?", 34, C.orange), { opacity: 0 }) +
          G("mag", I.mag(0, 0, 2.2, C.navy), { opacity: 0, "data-o": "0 0" }),
          { "data-o": "200 170" }) +
        G("vf", P("M40 40 H70 M40 40 V70 M360 40 H330 M360 40 V70 M40 300 H70 M40 300 V270 M360 300 H330 M360 300 V270", C.navy, 4) + T(200, 72, "?", 40, C.navy), { opacity: 0 }) +
        // Jeston's test card
        G("card",
          R(56, 66, 288, 206, 16, C.white, { stroke: C.navy, "stroke-width": 2.5 }) + R(56, 66, 288, 44, 16, C.navy) + R(56, 92, 288, 18, 0, C.navy) +
          T(200, 95, "JESTON'S TEST", 18, C.white, { "class": "lb hn" }) +
          R(76, 128, 34, 34, 6, "none", { stroke: C.navy, "stroke-width": 2.5 }) + R(76, 196, 34, 34, 6, "none", { stroke: C.navy, "stroke-width": 2.5 }) +
          G("c1q", T(124, 152, "THE CUSTOMER?", 17, C.ink, { "text-anchor": "start" })) + G("c2q", T(124, 220, "THE OUTCOME?", 17, C.ink, { "text-anchor": "start" })) +
          G("c1a", T(124, 152, "THE ARRIVING GUEST", 17, C.green, { "text-anchor": "start" }) + check(93, 145, 1, C.green, 4), { opacity: 0 }) +
          G("c2a", T(124, 220, "RIGHT ROOM, QUICKLY", 17, C.green, { "text-anchor": "start" }) + check(93, 213, 1, C.green, 4), { opacity: 0 }) +
          G("cRule", T(200, 258, "NO CUSTOMER, NO PROCESS", 15, C.orange), { opacity: 0 }),
          { opacity: 0, "data-o": "200 170" });
    }

    function layout(els) {
      [["A", 64], ["B", 146], ["C", 228]].forEach(function (p) {
        var b = bboxOf(els, "lab" + p[0]); if (!b || !b.width) return;
        placeAt(els, "ic" + p[0], b.x - 16, p[1]); placeAt(els, "ok" + p[0], b.x - 16, p[1]);
        els("lh" + p[0]).forEach(function (g) { var r = g.querySelector("rect"); if (r) { r.setAttribute("x", b.x - 8); r.setAttribute("y", b.y - 3); r.setAttribute("width", b.width + 16); r.setAttribute("height", b.height + 6); } });
      });
    }
    function fall(A, keys, deg, base, gap) {
      keys.forEach(function (k, j) { A.set(k, { r: deg[j] }, { t: 0.42, dl: base + j * (gap || 0.14), e: "in" }); });
    }
    function run(i, A) {
      // lanes and focus
      var focusA = on(i, 3, 4);
      A.set("lnB", { o: i >= 1 ? 1 : 0 }, { t: 0.6 });
      A.set("lnC", { o: i >= 1 ? 1 : 0 }, { t: 0.6, dl: 0.15 });
      A.set("board", { s: i === 33 ? 0.62 : 1, y: i <= 4 ? 4 : 0, o: on(i, 27, 30) ? 0.08 : 1 }, { t: 1.1, e: "io" });
      ["labA", "labB", "labC"].forEach(function (k, j) { A.set(k, { o: (j === 0 || i >= 1) ? (focusA && j > 0 ? 0.25 : 1) : 0 }, { t: 0.5 }); });
      ["icA", "icB", "icC"].forEach(function (k, j) { A.set(k, { o: i >= 2 && !on(i, 21, 26) ? (focusA && j > 0 ? 0.25 : 1) : 0, s: i === 2 ? 1.25 : 1 }, { t: 0.5, dl: i === 2 ? j * 0.3 : 0, e: "back" }); });
      ["okA", "okB", "okC"].forEach(function (k, j) { A.set(k, { o: on(i, 21, 26) ? 1 : 0, s: i === 21 ? 1.2 : 1 }, { t: 0.4, dl: i === 21 ? j * 0.25 : 0, e: "back" }); });
      ["lhA", "lhB", "lhC"].forEach(function (k, j) { A.set(k, { o: i === 17 || i === 32 ? 0.75 : 0 }, { t: 0.4, dl: i === 17 ? j * 0.35 : 0 }); });
      A.show("bub", i === 3);
      A.show("qB", i === 4); A.show("qC", i === 4);

      // the process as a whole
      A.set("guide", { draw: on(i, 6, 7) ? 1 : 0, o: on(i, 6, 7) ? 0.75 : 0 }, { t: 1.4, e: "io" });
      var standing = i >= 7;
      DA.concat(DB).forEach(function (x, j) { var k = j < 3 ? "dA" + j : "dB" + (j - 3); A.set(k, { o: standing ? 1 : 0, sy: standing ? 1 : 0.1 }, { t: 0.4, dl: i === 7 ? j * 0.07 : 0, e: "back" }); });
      A.set("dC0", { o: standing ? 1 : 0, sy: standing ? 1 : 0.1 }, { t: 0.4, dl: i === 7 ? 0.5 : 0, e: "back" });
      A.set("dC1", { o: standing ? 1 : 0, sy: standing ? 1 : 0.1, fill: on(i, 24, 26) ? C.red : C.navy }, { t: 0.4, dl: i === 7 ? 0.57 : 0, e: "back" });
      A.set("dK", { o: standing ? 1 : 0, sy: standing ? 1 : 0.1 }, { t: 0.4, dl: i === 7 ? 0.64 : 0, e: "back" });
      A.show("grpA", i === 8); A.show("grpB", i === 8); A.show("grpC", i === 8);
      A.set("doorGlow", { o: on(i, 8, 10) || i === 22 || i >= 30 ? 1 : 0 }, { t: 0.5 });
      A.set("ghost", { o: on(i, 10, 10) ? 0.55 : 0 }, { t: 0.5 });
      if (i === 11) { A.set("mag", { o: 1 }, { t: 0.2 }); A.route("mag", [[30, 100], [140, 180], [250, 250], [350, 250]], { t: 2.2, e: "io" }); }
      else A.set("mag", { o: 0, x: 30, y: 100 }, { t: 0.3 });

      // trigger
      A.set("guest", i <= 11 ? { x: 0, y: 0, s: 1 } : i <= 23 ? { x: 14, y: 0, s: 1 } : i <= 29 ? { x: 216, y: GC - GA, s: 1 } : { x: 351, y: GC - GA, s: 0.82 }, { t: i === 24 || i === 30 ? 1.6 : 0.8, e: "io" });
      A.set("gm-sm", { o: on(i, 24, 29) ? 0 : 1 }, { t: 0.3 }); A.set("gm-fr", { o: on(i, 24, 29) ? 1 : 0 }, { t: 0.3 });
      A.set("bell", { r: i === 13 ? 14 : i === 12 ? -6 : 0, s: i === 14 ? 1.3 : 1 }, { t: 0.35, e: "back" });
      A.set("bellRing", { o: on(i, 13, 14) || i === 31 ? 1 : 0, s: on(i, 13, 14) ? 1.15 : 0.6 }, { t: 0.6, e: "out" });
      A.show("pTrig", on(i, 13, 14) || i === 31); A.show("trigLn", on(i, 13, 14) || i === 31);
      var dimChain = i === 14 ? 0.35 : 1;
      if (i === 14) DA.concat(DB).forEach(function (x, j) { A.set(j < 3 ? "dA" + j : "dB" + (j - 3), { o: dimChain }, { t: 0.4 }); });

      // sequence: dominoes topple, marbles take the chutes
      var aDown = i >= 15, bDown = i >= 16, cDown = i >= 21, lastDown = i >= 30, keyDown = i >= 23;
      fall(A, ["dA0", "dA1", "dA2"], aDown ? [62, 62, 66] : [0, 0, 0], 0);
      fall(A, ["dB0", "dB1", "dB2"], bDown ? [62, 62, 66] : [0, 0, 0], i === 16 ? 0.1 : 0.9);
      A.set("dC0", { r: cDown ? 64 : 0 }, { t: 0.42, e: "in" });
      A.set("dC1", { r: lastDown ? 86 : 0 }, { t: 0.5, dl: i === 30 ? 1.2 : 0, e: "in" });
      A.set("dK", { r: keyDown ? 84 : 0 }, { t: 0.5, e: "in" });
      if (i === 15) A.route("mb", [[0, 0], [12, 6], [20, 42], [20, 83]], { t: 1.1, e: "in" });
      else if (i === 16) A.route("mb", [[20, 83], [80, 83], [102, 110], [106, 164]], { t: 1.5, e: "io" });
      else A.set("mb", i < 15 ? { x: 0, y: 0 } : i === 15 ? { x: 20, y: 83 } : { x: 106, y: 164 }, { t: 0.3 });
      A.set("mb", { o: i >= 30 ? 0 : 1 }, { t: 0.3 });
      A.show("pSeq", i === 16 || i === 31);
      if (i === 18) { A.set("docTok", { o: 1 }, { t: 0.2 }); A.route("docTok", [[0, 0], [20, 88], [86, 88], [106, 168]], { t: 2, e: "io" }); }
      else A.set("docTok", { o: 0, x: 0, y: 0 }, { t: 0.3 });
      A.set("chGlow", { o: on(i, 18, 19) ? 1 : 0 }, { t: 0.5 });
      A.show("pH1", i === 19); A.show("pH2", i === 19);
      A.show("brk", i === 20 || i === 32);

      // end state, key, locked room
      A.show("pEnd", i === 22 || i === 31);
      A.show("pTask", on(i, 23, 25));
      A.set("recm-sm", { o: 1 }, { t: 0.2 });
      A.set("doorLock", { o: on(i, 24, 26) ? 1 : 0, x: i === 25 ? 3 : 0 }, { t: 0.25, e: "back" });
      A.set("doorBad", { o: on(i, 24, 26) ? 1 : 0 }, { t: 0.4 });
      A.show("pMiss", i === 26);
      A.set("qG", { o: i === 25 ? 1 : 0, y: i === 25 ? -4 : 6 }, { t: 0.5, e: "back" });
      A.set("door", { sx: lastDown ? 0.12 : 1 }, { t: 0.9, dl: i === 30 ? 1.5 : 0, e: "io" });

      // Jeston's test
      A.set("card", { o: on(i, 27, 30) ? 1 : 0, s: on(i, 27, 30) ? (i === 29 ? 1.05 : 1) : 0.92 }, { t: 0.6, e: "back" });
      A.show("c1q", i <= 29); A.show("c2q", i <= 29);
      A.show("c1a", i >= 30); A.show("c2a", i >= 30);
      A.show("cRule", i >= 28);

      A.show("vf", i === 33);
      A.set("vf", { s: i === 33 ? 1 : 1.2 }, { t: 0.9, e: "out" });

      A.chip(["THE GUEST'S JOURNEY", "SEVERAL DEPARTMENTS", "WHO HOLDS WHAT", "HER OWN JOB", "ONLY PART OF IT",
        "LOOK BEYOND THE DESK", "FOLLOW THE WORK", "ONE CONNECTED JOURNEY", "ACTIVITIES → OUTCOME", "FOCUS ON THE RESULT",
        "OUTCOME OF VALUE", "HOW TO SPOT IT", "SHE ASKS FOR CHECK-IN", "THE TRIGGER", "NO TRIGGER, NO JOURNEY",
        "WORK BEGINS", "THE SEQUENCE", "NOT ONE DEPARTMENT", "INFORMATION MOVES", "THE HANDOFF",
        "BIGGER THAN TASKS", "ALL TASKS DONE?", "THE END STATE", "KEY ≠ OUTCOME", "ROOM NOT RELEASED",
        "COMPLETE?", "OF COURSE NOT", "JESTON'S TEST", "CUSTOMER AND OUTCOME", "APPLY THE TEST",
        "GUEST IN RIGHT ROOM", "TRIGGER, SEQUENCE, OUTCOME", "ACROSS DEPARTMENTS", "HOW MUCH TO MAP?"][i]);
    }

    REG.O1a = makeScene("O1a", {
      n: N, title: "A business process as a domino run: trigger, sequence across departments, and the end state of a guest in the right room",
      bg: "#fbf2e2", halo: C.paper, draw: draw, run: run, layout: layout
    });
  })();

  /* ==========================================================
     O1b · "NESTING DOLLS & THE FILM CROP"
     Metaphor 1 (levels): Russian nesting dolls. Each doll splits open and
     the next one zooms up to fill the stage: value chain → process →
     sub-process → activity → task. Same guest, finer grain.
     Metaphor 2 (boundaries): the guest's evening as a film strip; a
     viewfinder crop decides which frames are "in" the process.
     Technique: split-and-zoom unpacking, then a sliding crop with shading.
     33 narration moments.
     ========================================================== */
  (function () {
    var N = 33;
    var CX = 150, BY = 300, H = 232, SEAM = BY - H * 0.5;
    var LV = [
      { n: ["VALUE", "CHAIN"], ex: ["SERVE THE", "GUEST"], c: "#b8402a", a: "#f3d7c9" },
      { n: ["PROCESS"], ex: ["CHECK A", "GUEST IN"], c: "#1f4e79", a: "#d6e4f1" },
      { n: ["SUB-", "PROCESS"], ex: ["VERIFY THE", "BOOKING"], c: "#317c61", a: "#d4ebdf" },
      { n: ["ACTIVITY"], ex: ["CHECK RATE,", "GUARANTEE"], c: "#a7742f", a: "#f4e3c4" },
      { n: ["TASK"], ex: ["OPEN THE", "PORTAL"], c: "#6b5ca5", a: "#e2ddf2" }
    ];
    function dollPath(cx, by, h) {
      var w = h * 0.62, f = function (v) { return v.toFixed(1); };
      return "M" + f(cx) + " " + f(by) +
        " C" + f(cx - 0.62 * w) + " " + f(by) + " " + f(cx - 0.62 * w) + " " + f(by - 0.58 * h) + " " + f(cx - 0.3 * w) + " " + f(by - 0.66 * h) +
        " C" + f(cx - 0.44 * w) + " " + f(by - 0.8 * h) + " " + f(cx - 0.32 * w) + " " + f(by - h) + " " + f(cx) + " " + f(by - h) +
        " C" + f(cx + 0.32 * w) + " " + f(by - h) + " " + f(cx + 0.44 * w) + " " + f(by - 0.8 * h) + " " + f(cx + 0.3 * w) + " " + f(by - 0.66 * h) +
        " C" + f(cx + 0.62 * w) + " " + f(by - 0.58 * h) + " " + f(cx + 0.62 * w) + " " + f(by) + " " + f(cx) + " " + f(by) + " Z";
    }
    function dollArt(k, noText) {
      var L0 = LV[k], w = H * 0.62, fy = BY - H * 0.79, fr = w * 0.19;
      var txt = L0.n.length === 1 ? T(CX, BY - H * 0.27, L0.n[0], 19, L0.c, { "class": "lb hn" }) :
        T(CX, BY - H * 0.33, L0.n[0], 19, L0.c, { "class": "lb hn" }) + T(CX, BY - H * 0.33 + 22, L0.n[1], 19, L0.c, { "class": "lb hn" });
      return F(dollPath(CX, BY, H), L0.c) +
        El(CX, BY - H * 0.3, w * 0.4, H * 0.24, L0.a) +
        Ci(CX - w * 0.24, BY - H * 0.12, 7, L0.c, { opacity: 0.35 }) + Ci(CX + w * 0.24, BY - H * 0.12, 7, L0.c, { opacity: 0.35 }) +
        Ci(CX, fy, fr, C.skin) + F("M" + (CX - fr) + " " + (fy - 2) + " Q" + CX + " " + (fy - fr * 1.6) + " " + (CX + fr) + " " + (fy - 2) + " Q" + CX + " " + (fy - fr * 0.6) + " " + (CX - fr) + " " + (fy - 2) + "Z", C.hair) +
        Ci(CX - 8, fy + 2, 2.2, C.ink) + Ci(CX + 8, fy + 2, 2.2, C.ink) + Ci(CX - 13, fy + 9, 4, "#f2a39a", { opacity: 0.7 }) + Ci(CX + 13, fy + 9, 4, "#f2a39a", { opacity: 0.7 }) +
        P("M" + (CX - 5) + " " + (fy + 10) + " Q" + CX + " " + (fy + 14) + " " + (CX + 5) + " " + (fy + 10), C.ink, 1.8) +
        P("M" + (CX - w * 0.5) + " " + SEAM + " H" + (CX + w * 0.5), C.white, 1.5, { opacity: 0.55, "stroke-dasharray": "4 4" }) + (noText ? "" : txt);
    }
    var FX = function (k) { return 12 + k * 64; };
    function draw(u) {
      var dolls = "";
      for (var k = 4; k >= 0; k--) {
        dolls += G("d" + k, G("dT" + k, dollArt(k, true), { "clip-path": "url(#" + u + "top)", "data-o": CX + " " + SEAM }) +
          G("dB" + k, dollArt(k), { "clip-path": "url(#" + u + "bot)", "data-o": CX + " " + SEAM }), { "data-o": CX + " " + (BY - 4) });
      }
      var rings = "", list = "";
      [1, 0.8, 0.6, 0.4, 0.2].forEach(function (s, k) {
        var h = H * s, top = BY - h;
        rings += G("rg" + k, P(dollPath(110, BY, h), LV[k].c, 2.5, { "fill": LV[k].a, "fill-opacity": 0.35 }));
        var ry = top + 6;
        list += G("row" + k, R(226, ry - 17, 168, 30, 15, LV[k].a) + Ci(242, ry - 2, 11, LV[k].c) + T(242, ry + 4, String(k + 1), 14, C.white, { "class": "lb hn" }) +
          T(260, ry + 4, LV[k].n.join(" ").replace("- ", "-"), 16, LV[k].c, { "text-anchor": "start", "class": "lb hn" }) +
          P("M226 " + (ry - 2) + " H" + (116 + 0) + "", LV[k].c, 1.2, { "stroke-dasharray": "2 4", opacity: 0.7 }));
      });
      var frames = "", icons = [
        I.users(0, -6, 1.1) + I.users(-16, 8, 0.8, C.slate) + I.users(16, 8, 0.8, C.slate),
        I.bell(0, 2, 1.3), I.doc(0, 0, 1.2), I.money(0, 0, 1.3), I.key(0, 0, 1.5), I.bed(0, 4, 1.4, C.green)];
      for (var f = 0; f < 6; f++) {
        frames += R(FX(f), 124, 58, 64, 4, "#fffdf8") + G("fi" + f, Tr(FX(f) + 29, 156, icons[f]), { "data-o": (FX(f) + 29) + " 156" });
      }
      var icons2 = icons;
      var holes = "";
      for (var hx = -600; hx < 1000; hx += 16) holes += R(hx, 113, 8, 6, 1.5, "#fbf8f1", { opacity: 0.85 }) + R(hx, 193, 8, 6, 1.5, "#fbf8f1", { opacity: 0.85 });
      return "<defs>" +
        '<clipPath id="' + u + 'top">' + R(-900, -900, 2200, 900 + SEAM, 0, "#000") + "</clipPath>" +
        '<clipPath id="' + u + 'bot">' + R(-900, SEAM, 2200, 1200, 0, "#000") + "</clipPath>" +
        "</defs>" +
        R(-900, -900, 2200, 2200, 0, "#f6f1e7") +
        G("floor", El(200, 304, 260, 18, "#e8dcc7")) +
        // MEETING (0-3)
        G("meet",
          R(104, 108, 192, 124, 8, C.white, { stroke: C.slate, "stroke-width": 3 }) + R(196, 232, 8, 60, 2, C.slate) + R(160, 288, 80, 6, 3, C.slate) +
          T(200, 132, "CHECK-IN MAP", 16, C.slate) +
          PD("scrib", "M128 200 C150 150 170 220 190 160 C210 120 230 210 250 150 C262 120 280 200 268 210 C240 220 150 170 132 160 C120 150 170 140 200 190", C.orange, 3) +
          fig(52, 302, 1.15, C.navy, {}) + fig(350, 302, 1.0, C.green, { hair: "long" }) +
          G("bubL", R(18, 50, 104, 56, 14, C.white, { stroke: C.navy, "stroke-width": 2 }) + F("M50 104 L46 120 L62 104 Z", C.white) + I.hotel(48, 78, 1.1) + I.route(88, 78, 1.2), { "data-o": "70 78" }) +
          G("bubR", R(300, 56, 84, 50, 14, C.white, { stroke: C.green, "stroke-width": 2 }) + F("M346 104 L352 118 L336 104 Z", C.white) + I.screen(330, 80, 0.9) + I.cursor(356, 84, 0.7), { "data-o": "342 80" }) +
          G("neq", T(200, 88, "≠", 34, C.orange), { opacity: 0 })) +
        // DOLLS (4-13)
        G("orbit", [[44, 100, I.plane(0, 0, 1.1, C.navy)], [36, 160, I.bell(0, 0, 1.2)], [44, 220, I.bed(0, 0, 1.2)], [40, 278, I.coin(0, 0, 1.3)]].map(function (p, j) {
          return Tr(p[0], p[1], Ci(0, 0, 18, C.white, { stroke: j === 1 ? C.orange : C.mute, "stroke-width": j === 1 ? 3 : 1.5 }) + p[2]) + P("M" + (p[0] + 20) + " " + p[1] + " L" + (CX - 70) + " " + (BY - 120 + j * 12), C.mute, 1.2, { "stroke-dasharray": "2 4" });
        }).join(""), { opacity: 0 }) +
        G("dolls", dolls, { "data-o": CX + " " + BY }) +
        G("tag", R(256, 118, 136, 74, 12, C.white, { stroke: C.navy, "stroke-width": 1.5 }) + P("M256 160 L240 168 L256 172", C.white, 2) +
          TK("tg1", 324, 148, "", 17, C.ink, { "class": "lb hn" }) + TK("tg2", 324, 170, "", 17, C.ink, { "class": "lb hn" }), { opacity: 0 }) +
        G("wob", I.mag(300, 252, 1.6, C.navy) + T(300, 230, "?", 22, C.orange), { opacity: 0, "data-o": "300 252" }) +
        G("extra", I.money(272, 230, 1.1) + I.shield(310, 232, 1.1), { opacity: 0 }) +
        G("cur", I.cursor(300, 240, 1.4), { opacity: 0, "data-o": "300 240" }) +
        G("guestPin", fig(CX + 2, BY - 2, 0.5, C.orange, { hair: "long" }), { opacity: 0 }) +
        // CONCENTRIC HIERARCHY (14-17)
        G("rings", rings, { opacity: 0, "data-o": "110 300" }) +
        G("list", list, { opacity: 0 }) +
        G("clash", T(204, 170, "≠", 30, C.orange) + P("M214 70 Q196 120 204 146 M204 182 Q196 220 214 254", C.orange, 2.5, { "stroke-dasharray": "4 4" }), { opacity: 0 }) +
        // FILM STRIP (18-32)
        G("strip",
          R(-900, 108, 2200, 96, 0, "#2a3542") + holes + frames +
          G("frGuest", fig(FX(4) + 20, 186, 0.48, C.orange, { hair: "long" }) + I.lock(FX(5) + 46, 140, 0.6, C.red), { opacity: 0 }) +
          G("shL", R(0, 108, 400, 96, 0, "#f6f1e7", { opacity: 0.78 }), { "data-o": "0 156" }) +
          G("shR", R(0, 108, 400, 96, 0, "#f6f1e7", { opacity: 0.78 }), { "data-o": "400 156" }) +
          G("redQ", R(FX(0) - 2, 122, 62, 68, 6, "none", { stroke: C.red, "stroke-width": 3.5 }), { opacity: 0 }) +
          G("redR", R(FX(5) - 2, 122, 62, 68, 6, "none", { stroke: C.red, "stroke-width": 3.5 }), { opacity: 0 }) +
          G("bS", P("M10 104 H2 V208 H10", C.green, 5) + pill("pS", 6, 90, "START HERE", { fill: C.green, size: 15, anchor: "start" }), { "data-o": "0 156" }) +
          G("bE", P("M-10 104 H-2 V208 H-10", C.orange, 5) + pill("pE", -6, 90, "END HERE", { fill: C.orange, size: 15, anchor: "end" }), { "data-o": "0 156" }),
          { opacity: 0, "data-o": "330 156" }) +
        G("mapRow", R(4, 248, 392, 52, 12, C.white, { stroke: C.mute, "stroke-width": 1.2 }) +
          [0, 1, 2, 3, 4, 5].map(function (k) {
            var x = FX(k) + 29;
            return G("mb" + k, R(x - 22, 258, 44, 32, 7, "#eef3f8", { stroke: C.navy, "stroke-width": 1.5 }) + Tr(x, 274, icons2[k], 0.7) + (k < 5 ? P("M" + (x + 23) + " 274 H" + (x + 40), C.navy, 2) : ""), { "data-o": x + " 274" });
          }).join(""), { opacity: 0 }) +
        pill("cQ", 10, 232, "HIDDEN QUEUE", { fill: C.red, anchor: "start", attrs: { opacity: 0 } }) +
        pill("cR", 390, 232, "RESULT MISSING", { fill: C.red, anchor: "end", attrs: { opacity: 0 } }) +
        pill("cFin", 296, 232, "ALL FINISHED?", { fill: C.navy, attrs: { opacity: 0 } }) +
        G("team", [150, 200, 250].map(function (x) { return fig(x, 304, 0.7, C.navy, {}) + Ci(x + 12, 246, 9, C.green) + check(x + 12, 247, 0.5, C.white, 2.2); }).join(""), { opacity: 0 }) +
        G("weeks", pill("w6", 150, 248, "WEEK 6", { fill: C.violet }) + pill("w8", 250, 248, "WEEK 8", { fill: C.violet }), { opacity: 0 }) +
        G("recap", I.mag(84, 262, 1.6) + T(84, 300, "HOW CLOSELY", 16, C.navy) + P("M296 248 H288 V280 H296 M332 248 H340 V280 H332", C.orange, 4) + T(314, 300, "WHICH WORK", 16, C.orange) +
          T(84, 236, "THE LEVEL", 16, C.slate) + T(314, 236, "THE BOUNDARY", 16, C.slate), { opacity: 0 });
    }

    function crop(A, ks, ke, col) {
      var sx = FX(ks) - 6, ex = FX(ke) + 64;
      A.set("bS", { x: sx }, { t: 0.9, e: "io" }); A.set("bE", { x: ex }, { t: 0.9, e: "io" });
      A.set("shL", { sx: Math.max(0.001, sx / 400) }, { t: 0.9, e: "io" });
      A.set("shR", { sx: Math.max(0.001, (400 - ex) / 400) }, { t: 0.9, e: "io" });
    }
    function run(i, A) {
      // meeting
      A.set("meet", { o: i <= 3 ? 1 : 0, y: i <= 3 ? 0 : 30 }, { t: 0.7 });
      A.set("bubL", { s: i === 0 ? 0.4 : i === 2 ? 1.25 : 1, o: i >= 1 ? 1 : 0 }, { t: 0.7, e: "back" });
      A.set("bubR", { s: i === 0 ? 0.4 : i === 2 ? 0.7 : 1, o: i >= 1 ? 1 : 0 }, { t: 0.7, e: "back" });
      A.show("neq", i >= 2 && i <= 3);
      A.set("scrib", { draw: i === 3 ? 1 : 0 }, { t: 1.4, e: "io" });

      // dolls: c = level on stage
      var c = i < 4 ? -1 : i <= 6 ? 0 : i <= 8 ? 1 : i <= 10 ? 2 : i <= 12 ? 3 : 4;
      var dollsOn = on(i, 4, 13);
      A.set("dolls", { o: dollsOn ? 1 : 0, s: i === 4 ? 0.82 : 1, y: i === 4 ? -10 : 0 }, { t: 1, e: "io" });
      for (var k = 0; k < 5; k++) {
        var opened = k < c, cur = k === c, nxt = k === c + 1;
        A.set("d" + k, { s: cur || opened ? 1 : nxt ? 0.8 : 0.55, o: cur ? 1 : 0 }, { t: cur ? 0.9 : 0.5, dl: cur && k > 0 ? 0.35 : 0, e: "out" });
        A.set("dT" + k, opened ? { y: -170, r: -16, x: -30 } : { y: 0, r: (cur && (i === 8 || i === 10 || i === 12)) ? 4 : 0, x: 0 }, { t: 0.9, e: "io" });
        A.set("dB" + k, opened ? { y: 150, x: 20 } : { y: 0, x: 0 }, { t: 0.9, e: "io" });
      }
      A.show("orbit", i === 6);
      A.set("tag", { o: on(i, 5, 13) ? 1 : 0, x: 0 }, { t: 0.5 });
      if (c >= 0) { A.text("tg1", LV[c].ex[0]); A.text("tg2", LV[c].ex[1]); }
      A.set("wob", { o: i === 8 ? 1 : 0, r: i === 8 ? -10 : 0 }, { t: 0.5, e: "back" });
      A.show("extra", i === 10);
      A.set("cur", { o: i === 12 ? 1 : 0, x: i === 12 ? -6 : 10, y: i === 12 ? -4 : 6 }, { t: 0.6, e: "out" });
      A.show("guestPin", i === 13 || i === 14);

      // concentric view + list
      A.set("rings", { o: on(i, 14, 17) ? 1 : 0, s: on(i, 14, 17) ? 1 : 0.6 }, { t: 0.9, e: "out" });
      A.set("guestPin", { x: i === 14 ? -40 : 0 }, { t: 0.6 });
      A.show("list", on(i, 15, 17));
      for (var r = 0; r < 5; r++) {
        var hl = (i === 16 && r === 1) || (i === 17 && (r === 0 || r === 4));
        A.set("row" + r, { o: on(i, 15, 17) ? (i >= 16 && !hl ? 0.35 : 1) : 0, x: on(i, 15, 17) ? (hl ? -6 : 0) : 30 }, { t: 0.5, dl: i === 15 ? r * 0.12 : 0, e: "out" });
        A.set("rg" + r, { o: (i >= 16 && i <= 17) ? ((i === 16 && r === 1) || (i === 17 && (r === 0 || r === 4)) ? 1 : 0.3) : 1 }, { t: 0.5 });
      }
      A.show("clash", i === 17);

      // film strip and crop
      var stripOn = i >= 18;
      A.set("strip", { o: stripOn ? 1 : 0, s: i === 28 ? 1.7 : 1, y: stripOn ? 0 : 40 }, { t: 1, e: "io" });
      var ks = 0, ke = 5;
      if (on(i, 20, 22)) ks = 2;
      if (on(i, 23, 25) || i === 29) ke = 4;
      crop(A, ks, ke);
      A.set("bS", { o: i >= 19 && i !== 28 ? 1 : 0 }, { t: 0.4 }); A.set("bE", { o: i >= 19 && i !== 28 ? 1 : 0 }, { t: 0.4 });
      var good = i >= 26 && i !== 29 && i !== 32;
      A.set("bS", { s: good ? 1.04 : 1 }, { t: 0.5 });
      A.set("shL", { o: i >= 19 ? 1 : 0 }, { t: 0.4 }); A.set("shR", { o: i >= 19 ? 1 : 0 }, { t: 0.4 });
      A.set("fi0", { y: i === 21 ? -5 : 0, s: i === 21 ? 1.12 : 1 }, { t: 0.4, e: "back" });
      A.show("redQ", on(i, 21, 22)); A.show("cQ", i === 22);
      A.set("fi5", { r: i === 24 ? -8 : 0 }, { t: 0.4, e: "back" });
      A.show("redR", on(i, 24, 25) || i === 32); A.show("cR", i === 25);
      A.show("frGuest", on(i, 24, 25) || i === 28);
      A.show("team", i === 27);
      A.show("cFin", i === 29);
      A.show("weeks", i === 30);
      A.show("recap", i === 31);
      var mapOn = on(i, 19, 26) || i === 29 || i === 32;
      A.set("mapRow", { o: mapOn ? 1 : 0, y: mapOn ? 0 : 20 }, { t: 0.6 });
      for (var m = 0; m < 6; m++) A.set("mb" + m, { o: (m >= ks && m <= ke) ? 1 : 0.12, s: (m >= ks && m <= ke) ? 1 : 0.8 }, { t: 0.6, dl: 0.3 });

      A.chip(["DRAWING CHECK-IN", "TWO DESCRIPTIONS", "DIFFERENT SIZES", "AGREE THE LEVEL", "FROM HIGH ABOVE",
        "1 · VALUE CHAIN", "MANY JOURNEYS", "2 · PROCESS", "WHY SO MUCH EFFORT?", "3 · SUB-PROCESS",
        "RATE AND GUARANTEE", "4 · ACTIVITY", "EVEN CLOSER", "5 · TASK", "SAME GUEST INSIDE",
        "FIVE NESTED LEVELS", "AGREE BEFORE DRAWING", "OR ARGUE FOREVER", "A SECOND DECISION", "THE PROCESS BOUNDARY",
        "START AT THE BOOKING?", "SHE ALREADY QUEUED", "BOUNDARY STARTS LATE", "END AT THE KEY?", "ROOM NOT READY",
        "BOUNDARY ENDS EARLY", "CUSTOMER-CENTRED BOUNDARY", "SHARED MEANING", "KEY, LOCKED DOOR", "WHAT IS LEFT OUT?",
        "WEEKS 6 AND 8", "LEVEL AND BOUNDARY", "WHY IT WENT WRONG"][i]);
    }

    REG.O1b = makeScene("O1b", {
      n: N, title: "Levels as nesting dolls and boundaries as a film crop for the Qasr check-in process",
      bg: "#f6f1e7", halo: "#f6f1e7", draw: draw, run: run
    });
  })();

  /* ==========================================================
     O2a · "THE LOOM"
     Metaphor: an organisation is woven cloth. Departments are the vertical
     warp threads – strong, separately tensioned, each with its own green
     tag. The guest is the shuttle carrying the horizontal weft. Every
     crossing is where her journey can knot, snag or fray.
     Technique: thread drawing (warp/weft), knots, a sweeping spotlight.
     30 narration moments.
     ========================================================== */
  (function () {
    var N = 30, WY = 172;
    var XS = []; for (var q = 0; q < 9; q++) XS.push(62 + q * 34.5);
    var NAMES = ["FRONT DESK", "RESERVATIONS TEAM", "REVENUE OFFICE", "HOUSEKEEPING TEAM", "FINANCE TEAM"];
    function weftPath(x0, x1) {
      var d = "M" + x0 + " " + WY, x = x0, k = 0;
      XS.forEach(function (wx, j) {
        if (wx <= x0 || wx > x1) return;
        var a = j % 2 ? -5 : 5;
        d += " Q" + ((x + wx) / 2).toFixed(1) + " " + (WY + a) + " " + wx.toFixed(1) + " " + WY;
        x = wx; k++;
      });
      d += " L" + x1 + " " + WY;
      return d;
    }
    function draw(u) {
      var icons = [I.bell(0, 0, 0.75), I.doc(0, 0, 0.7), I.money(0, 0, 0.8), I.bed(0, 0, 0.75), I.receipt(0, 0, 0.75), I.users(0, 0, 0.75), I.screen(0, 0, 0.7), I.wrench(0, 0, 0.8), I.heart(0, 0, 0.75)];
      var warps = "", tags = "", ups = "";
      XS.forEach(function (x, k) {
        warps += G("wk" + k, L(x, 68, x, 262, C.slate, 3, { "data-paint": 1 }), { "data-o": x + " 68" }) +
          G("wi" + k, Ci(x, 86, 13, C.white, { stroke: C.slate, "stroke-width": 1.5 }) + Tr(x, 86, icons[k]));
        tags += G("tg" + k, Ci(x, 269, 9, C.green, { stroke: C.white, "stroke-width": 1.5 }) + check(x, 270, 0.5, C.white, 2.2), { opacity: 0, "data-o": x + " 269" });
        ups += P("M" + (x - 5) + " 116 L" + x + " 108 L" + (x + 5) + " 116", C.navy, 2.5);
      });
      var knots = [1, 2, 3, 4].map(function (k) {
        var x = XS[k];
        return G("kn" + k, P("M" + (x - 9) + " " + WY + " C" + (x - 14) + " " + (WY - 20) + " " + (x + 14) + " " + (WY - 20) + " " + (x + 4) + " " + (WY - 2) + " C" + (x - 6) + " " + (WY + 12) + " " + (x + 12) + " " + (WY + 14) + " " + (x + 9) + " " + WY, C.orange, 3), { opacity: 0, "data-o": x + " " + WY });
      }).join("");
      var txs = "";
      for (var t = 0; t < 5; t++) { var y0 = 104 + t * 30; txs += L(XS[0] + 7, y0, XS[0] + 7, y0 + 12, C.green, 5) + L(XS[0] + 7, y0 + 15, XS[0] + 7, y0 + 27, C.orange, 2.5, { "stroke-dasharray": "2 3" }); }
      return "<defs>" +
        '<radialGradient id="' + u + 'sp" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe9b0" stop-opacity=".85"/><stop offset="1" stop-color="#ffe9b0" stop-opacity="0"/></radialGradient>' +
        "</defs>" +
        R(-900, -900, 2200, 2200, 0, "#f4ede1") + R(-900, 290, 2200, 600, 0, "#e6d7bd") +
        G("night", R(-900, -900, 2200, 2200, 0, "#1f3550", { opacity: 0.12 }), { opacity: 0 }) +
        G("spot", El(0, 166, 30, 120, "url(#" + u + "sp)"), { opacity: 0, "data-o": "0 166" }) +
        // loom frame
        R(26, 54, 348, 14, 4, C.wood) + R(26, 262, 348, 14, 4, C.wood) + R(22, 50, 12, 232, 3, "#9a6d42") + R(366, 50, 12, 232, 3, "#9a6d42") +
        warps + G("ups", ups, { opacity: 0 }) +
        G("tx", txs, { opacity: 0 }) +
        G("txB", P("M" + (XS[0] + 16) + " 104 H" + (XS[0] + 22) + " V250 H" + (XS[0] + 16), C.orange, 2.5), { opacity: 0 }) +
        // destination
        G("dest", Ci(388, WY, 14, C.white, { stroke: C.green, "stroke-width": 2 }) + I.bed(388, WY + 1, 0.75, C.green), { "data-o": "388 " + WY }) +
        G("destBad", Ci(388, WY, 14, C.white, { stroke: C.red, "stroke-width": 2.5 }) + I.lock(388, WY + 2, 0.8, C.red), { opacity: 0 }) +
        // weft
        PD("weft1", weftPath(20, 214), C.orange, 4) +
        PD("weft2", weftPath(214, 338), C.orange, 4) +
        PD("weft3", "M338 " + WY + " L374 " + WY, C.orange, 4) +
        PD("weftS", "M20 " + (WY + 52) + " L380 " + (WY + 52), C.orange, 5) +
        knots +
        G("snag", cross(346, WY, 1, C.red, 4), { opacity: 0 }) +
        // data chips held in separate systems
        G("ch", [[1, I.doc(0, 0, 0.7), "#e9eef6"], [2, I.money(0, 0, 0.75), "#f6ecd9"], [3, I.bed(0, 0, 0.7), "#e4efe8"], [4, I.receipt(0, 0, 0.7), "#efe6f3"]].map(function (c) {
          return G("chp" + c[0], R(XS[c[0]] - 13, 116, 26, 24, 5, c[2], { stroke: C.slate, "stroke-width": 1.2 }) + Tr(XS[c[0]], 128, c[1]), { opacity: 0, "data-o": XS[c[0]] + " 128" });
        }).join("")) +
        G("noRate", Ci(XS[0], 112, 13, C.red) + T(XS[0], 119, "?", 18, C.white, { "class": "lb hn" }), { opacity: 0, "data-o": XS[0] + " 112" }) +
        // shuttle (the guest)
        G("sh", F("M-26 0 Q-14 -11 0 -11 Q14 -11 26 0 Q14 11 0 11 Q-14 11 -26 0 Z", C.orange, { stroke: "#8f3a1f", "stroke-width": 1.5 }) +
          Ci(0, 0, 8, C.skin) + Ci(-3, -1, 1.3, C.ink) + Ci(3, -1, 1.3, C.ink) +
          G("shSm", P("M-3 3 Q0 5.5 3 3", C.ink, 1.3)) + G("shFr", P("M-3 4.5 Q0 2 3 4.5", C.ink, 1.3), { opacity: 0 }), { "data-o": "0 0" }) +
        G("dream", R(-8, -46, 34, 26, 10, C.white, { stroke: C.mute, "stroke-width": 1.2 }) + I.bed(9, -33, 0.7, C.navy) + Ci(-2, -16, 2.5, C.white, { stroke: C.mute }), { opacity: 0 }) +
        pill("corp", -14, -30, "CORPORATE RATE", { fill: C.gold, size: 15, anchor: "start" }) +
        G("pp", I.passport(-8, -30, 0.8) + I.passport(8, -32, 0.8) + T(28, -24, "×2", 16, C.orange), { opacity: 0 }) +
        // badges and callouts
        pill("clock", 352, 25, "7:40 PM", { fill: C.deep, attrs: { opacity: 0 } }) +
        pill("m23", 131, 222, "23 MIN", { fill: C.orange, size: 18, attrs: { opacity: 0 } }) +
        G("score", Ci(300, 124, 32, C.white, { stroke: C.red, "stroke-width": 4 }) + T(300, 129, "4/10", 21, C.red, { "class": "lb hn" }) + P("M290 143 Q300 136 310 143", C.red, 2.5), { opacity: 0, "data-o": "300 124" }) +
        G("blame", F("M0 0 L-16 -9 L-16 -3 L-30 -3 L-30 3 L-16 3 L-16 9 Z", C.red), { opacity: 0, "data-o": "0 0" }) +
        pill("t0", XS[0], 244, "90 SEC", { fill: C.green, size: 15, attrs: { opacity: 0 } }) +
        pill("t2", XS[2], 244, "10 MIN", { fill: C.green, size: 15, attrs: { opacity: 0 } }) +
        pill("t3", XS[3] + 6, 220, "45 MIN", { fill: C.green, size: 15, attrs: { opacity: 0 } }) +
        pill("callout", 200, 302, "FRONT DESK", { fill: C.navy, attrs: { opacity: 0 } }) +
        G("qMid", T(214, 128, "?", 40, C.orange), { opacity: 0 }) +
        G("arV", P("M10 252 V92 M3 102 L10 90 L17 102", C.navy, 3.5), { opacity: 0 }) +
        G("arH", P("M40 300 H352 M342 293 L354 300 L342 307", C.orange, 3.5), { opacity: 0 }) +
        pill("pV", 200, 302, "VERTICAL VIEW", { fill: C.navy, attrs: { opacity: 0 } }) +
        pill("pH", 200, 302, "HORIZONTAL JOURNEY", { fill: C.orange, attrs: { opacity: 0 } }) +
        G("tiles", [0, 1, 2, 3, 4, 5, 6, 7].map(function (j) { return G("tl" + j, R(92 + j * 11, 236, 10, 10, 2, C.slate), { "data-o": (97 + j * 11) + " 241" }); }).join(""), { opacity: 0 }) +
        G("magG", I.mag(0, 0, 1.8, C.navy), { opacity: 0, "data-o": "0 0" });
    }

    function run(i, A) {
      A.show("night", i >= 1 && i <= 12);
      A.show("clock", on(i, 1, 2));
      // warps: only front desk before the scatter is revealed
      XS.forEach(function (x, k) {
        var vis = k === 0 || i >= 5;
        var col = C.slate;
        if (k === 0 && (on(i, 4, 4) || i === 14)) col = C.red;
        if (k === 2 && i === 18) col = C.red;
        if ((k === 0 && i >= 15) || (k === 2 && i >= 19) || (k === 3 && i >= 20)) col = C.green;
        if (i >= 21 && i !== 26) col = C.green;
        if (i === 24) col = C.navy;
        if (on(i, 25, 26)) col = "#b8c4cf";
        A.set("wk" + k, { sy: 1, o: vis ? 1 : 0.14, stroke: col }, { t: 0.7, dl: i === 5 ? k * 0.08 : 0, e: "out" });
        A.set("wi" + k, { o: vis ? (on(i, 25, 26) ? 0.4 : 1) : 0.14, s: vis ? 1 : 0.8 }, { t: 0.5, dl: i === 5 ? k * 0.08 : 0 });
        var tagOn = (k === 0 && i >= 15) || (k === 2 && i >= 19) || (k === 3 && i >= 20) || i >= 21;
        A.set("tg" + k, { o: tagOn ? (on(i, 25, 26) ? 0.25 : 1) : 0, s: tagOn ? 1 : 0.3 }, { t: 0.45, dl: i === 21 ? k * 0.08 : 0, e: "back" });
      });
      A.show("ups", i === 24);
      A.set("arV", { o: on(i, 23, 24) ? 1 : 0 }, { t: 0.5 });
      A.set("arH", { o: i === 23 || i === 25 ? 1 : 0 }, { t: 0.5 });
      A.show("pV", i === 24); A.show("pH", i === 25);

      // shuttle travels
      var sx = i <= 7 ? 20 : i <= 10 ? 214 : i <= 25 ? 326 : 372;
      if (i >= 28) sx = 372;
      A.set("sh", { x: sx, y: WY }, { t: i === 8 || i === 11 || i === 26 ? 1.6 : 0.6, e: "io" });
      A.set("shSm", { o: i <= 7 ? 1 : 0 }, { t: 0.3 }); A.set("shFr", { o: i <= 7 ? 0 : 1 }, { t: 0.3 });
      A.set("dream", { x: sx, y: WY, o: i === 2 ? 1 : 0 }, { t: 0.6 });
      A.set("corp", { x: sx, y: WY, o: on(i, 3, 4) ? 1 : 0 }, { t: 0.6 });
      A.set("pp", { x: sx, y: WY, o: i === 10 ? 1 : 0 }, { t: 0.6, e: "back" });
      A.set("noRate", { o: i === 4 ? 1 : 0, s: i === 4 ? 1 : 0.4 }, { t: 0.5, e: "back" });

      // scattered information in separate systems
      [1, 2, 3, 4].forEach(function (k) {
        var vis = (k <= 2 && i >= 6 && i <= 12) || (k >= 3 && i >= 7 && i <= 12);
        A.set("chp" + k, { o: vis ? 1 : 0, s: vis ? 1 : 0.4, y: vis ? 0 : -10 }, { t: 0.5, e: "back" });
        A.set("kn" + k, { o: on(i, 8, 12) ? 1 : 0, s: on(i, 8, 12) ? 1 : 0.2, r: on(i, 8, 12) ? (k % 2 ? 20 : -20) : 0 }, { t: 0.6, dl: i === 8 ? 0.3 + k * 0.25 : 0, e: "back" });
      });
      var fray = i >= 21 && i !== 26;
      var weftCol = (i === 11 || i === 12 || fray) ? C.red : C.orange;
      A.set("weft1", { draw: i >= 8 && i <= 27 ? 1 : 0, stroke: weftCol, o: i === 24 ? 0.35 : 1 }, { t: 1.6, e: "io" });
      A.set("weft2", { draw: i >= 11 && i <= 27 ? 1 : 0, stroke: weftCol, o: i === 24 ? 0.35 : 1 }, { t: 1.4, e: "io" });
      A.set("weft3", { draw: i >= 26 && i <= 27 ? 1 : 0, stroke: weftCol }, { t: 0.6 });
      A.set("weftS", { draw: i >= 29 ? 1 : 0 }, { t: 1.4, e: "io" });
      A.show("snag", on(i, 11, 25));
      A.show("destBad", on(i, 11, 25));
      A.show("m23", i === 9 || i === 17 || i === 28 || i === 29);
      A.set("m23", { x: i === 17 ? -20 : i === 29 ? 160 : 0, y: i === 17 ? -16 : i === 29 ? 30 : 0 }, { t: 0.9, e: "io" });
      A.set("score", { o: on(i, 12, 13) || i === 21 || i === 27 ? 1 : 0, s: on(i, 12, 13) || i === 21 || i === 27 ? 1 : 0.3 }, { t: 0.6, e: "back" });

      // the spotlight hunts for a culprit
      var spx = i === 13 ? XS[6] : on(i, 14, 17) ? XS[0] : i === 18 || i === 19 ? XS[2] : i === 20 ? XS[3] : XS[4];
      A.set("spot", { x: spx, o: on(i, 13, 20) ? 1 : 0 }, { t: i === 13 ? 1.6 : 0.9, e: "io" });
      A.set("blame", { x: XS[0] + (i === 14 ? 44 : 60), y: 150, o: i === 14 ? 1 : 0 }, { t: 0.5, e: "back" });
      A.show("callout", i === 14 || i === 18 || i === 20 || on(i, 6, 7));
      A.text("callout", i === 6 ? "RESERVATIONS, REVENUE" : i === 7 ? "HOUSEKEEPING, FINANCE" : i === 18 ? NAMES[2] : i === 20 ? NAMES[3] : NAMES[0]);
      A.show("t0", on(i, 15, 22) || i === 27); A.show("t2", on(i, 19, 22) || i === 27); A.show("t3", on(i, 20, 22) || i === 27);
      A.set("tx", { o: on(i, 16, 17) ? 1 : 0 }, { t: 0.6 });
      A.show("txB", i === 17);
      A.show("qMid", i === 22);

      // foreshadow: the 23 minutes start to spill
      A.set("tiles", { o: i === 28 ? 1 : 0 }, { t: 0.3 });
      for (var j = 0; j < 8; j++) A.set("tl" + j, { y: i === 28 ? 34 + (j % 3) * 6 : 0, r: i === 28 ? (j % 2 ? 40 : -30) : 0, o: i === 28 ? 0.9 : 0 }, { t: 0.9, dl: j * 0.08, e: "in" });
      A.set("magG", { x: i === 29 ? 300 : 120, y: WY + 40, o: i === 29 ? 1 : 0 }, { t: 1.2, e: "io" });

      A.chip(["ONE GUEST", "7:40 IN THE EVENING", "SHE WANTS HER ROOM", "A CORPORATE RATE", "RATE NOT ON SCREEN",
        "SCATTERED INFORMATION", "SEPARATE SYSTEMS", "FOUR SYSTEMS", "SEARCH, CALL, WAIT", "23 MINUTES AT DESK",
        "PASSPORT TWICE", "ROOM NOT READY", "SHE RATES 4/10", "WHO FAILED HER?", "BLAME RECEPTION?",
        "90 SECONDS: MET", "MANY TRANSACTIONS", "TARGET MET, 23 MIN", "BLAME REVENUE?", "10 MINUTES: MET",
        "45 MINUTES: MET", "EVERY TARGET PASSED", "HOW ARE BOTH TRUE?", "TWO DIRECTIONS", "MANAGED VERTICALLY",
        "SHE MOVES HORIZONTALLY", "ONE DIFFICULT ARRIVAL", "BOTH ARE TRUE", "WHERE DID TIME GO?", "FOLLOW THE 23 MINUTES"][i]);
    }

    REG.O2a = makeScene("O2a", {
      n: N, title: "The organisation as a loom: departments as vertical threads, the guest's journey as the horizontal thread that snags",
      bg: "#f4ede1", halo: "#f4ede1", draw: draw, run: run
    });
  })();

})();

// ============================================================
// OPER621 · WEEK 1 · ANIMATED TEACHING SCENES · PART 2 of 3
// File: w01-claude-part2.js   Scenes: O2b, O3a, O3b, O4a
// Standalone: registers its own scenes on window.VL_SCENES and appends
// its own scoped rules to <style id="vl-sc-w01">. Parts may be loaded in
// any order or concatenated. Contract per scene: { build(el), step(i, n), reset() }.
// GSAP (window.gsap) is used when present; CSS transitions otherwise.
// prefers-reduced-motion: every state is applied instantly, no ambient loops.
// ============================================================
(function () {
  "use strict";
  var W = window;
  W.VL_SCENES = W.VL_SCENES || {};
  var REG = W.VL_SCENES;
  var VW = 400, VH = 320;
  var C = {
    navy: "#1f4e79", deep: "#16324d", ink: "#1b2a3a", orange: "#c0502a",
    coral: "#e0734f", green: "#317c61", mint: "#6fbf9b", gold: "#d6a45e",
    sun: "#f2c46d", paper: "#fbf8f1", cream: "#f3ecdf", blue: "#dbe7f2",
    sky: "#eaf2f8", mute: "#8ba9bf", slate: "#5b7590", white: "#ffffff",
    night: "#13263b", violet: "#6b5ca5", red: "#b8402a", skin: "#f0c8a2",
    hair: "#3b2a22", wood: "#b98a5a", sand: "#efe1c4"
  };
  var UIDN = 0;

  function reduced() {
    try { return !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    catch (e) { return false; }
  }
  function gsapLib() {
    var g = W.gsap;
    return g && typeof g.to === "function" && typeof g.set === "function" ? g : null;
  }
  function esc(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function on(i, a, b) { return i >= a && i <= (b == null ? 1e9 : b); }
  function rnd(seed) {
    var s = seed % 2147483647; if (s <= 0) s += 2147483646;
    return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  }

  /* ---------- SVG string builders ---------- */
  function at(o) {
    var s = "";
    if (o) for (var k in o) if (o[k] != null && o[k] !== false) s += " " + k + '="' + esc(o[k]) + '"';
    return s;
  }
  function R(x, y, w, h, rx, fill, o) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx || 0) + '" fill="' + (fill || "none") + '"' + at(o) + "/>";
  }
  function Ci(cx, cy, r, fill, o) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (fill || "none") + '"' + at(o) + "/>";
  }
  function El(cx, cy, rx, ry, fill, o) {
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + (fill || "none") + '"' + at(o) + "/>";
  }
  function P(d, stroke, sw, o) {
    return '<path d="' + d + '" fill="none" stroke="' + stroke + '" stroke-width="' + (sw || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + at(o) + "/>";
  }
  function F(d, fill, o) { return '<path d="' + d + '" fill="' + fill + '"' + at(o) + "/>"; }
  function L(x1, y1, x2, y2, stroke, sw, o) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + stroke + '" stroke-width="' + (sw || 2) + '" stroke-linecap="round"' + at(o) + "/>";
  }
  /* Text label. Class "lb" adds a legibility halo. */
  function T(x, y, str, size, fill, o) {
    var a = { "text-anchor": "middle", "class": "lb" };
    if (o) for (var k in o) a[k] = o[k];
    return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 17) + '" fill="' + (fill || C.ink) + '"' + at(a) + ">" + esc(str) + "</text>";
  }
  function TK(k, x, y, str, size, fill, o) {
    var a = { "data-k": k }; if (o) for (var q in o) a[q] = o[q];
    return T(x, y, str, size, fill, a);
  }
  function G(k, inner, o) {
    var a = { "data-k": k }; if (o) for (var q in o) a[q] = o[q];
    return "<g" + at(a) + ">" + inner + "</g>";
  }
  function Gp(inner, o) { return "<g" + at(o) + ">" + inner + "</g>"; }
  function Tr(x, y, inner, s, r) {
    return '<g transform="translate(' + x + " " + y + ")" + (r ? " rotate(" + r + ")" : "") + (s && s !== 1 ? " scale(" + s + ")" : "") + '">' + inner + "</g>";
  }
  /* Keyed drawable stroke: animate with {draw: 0..1}. */
  function PD(k, d, stroke, sw, o) {
    var a = { "data-k": k, pathLength: 1, "stroke-dasharray": "1 2", "stroke-dashoffset": 1.05 };
    if (o) for (var q in o) a[q] = o[q];
    return P(d, stroke, sw, a);
  }
  /* Pill label. Width is fitted to the rendered text after mounting. */
  function pill(k, x, y, str, o) {
    o = o || {};
    var size = o.size || 16, h = size + 14, fill = o.fill || C.navy, tc = o.color || C.white;
    var w = Math.max(40, str.length * size * 0.66 + 26);
    return '<g data-k="' + k + '" data-pill="' + (o.anchor || "middle") + '" data-px="' + x + '"' + at(o.attrs) + ">" +
      R(x - w / 2, y - h / 2, w, h, h / 2, fill, o.stroke ? { stroke: o.stroke, "stroke-width": 2 } : null) +
      '<text x="' + x + '" y="' + (y + size * 0.36) + '" font-size="' + size + '" fill="' + tc + '" text-anchor="middle">' + esc(str) + "</text></g>";
  }
  function check(x, y, s, color, sw) {
    s = s || 1;
    return P("M" + (x - 8 * s) + " " + y + " l" + 6 * s + " " + 6 * s + " l" + 11 * s + " " + -13 * s, color || C.green, sw || 3.5);
  }
  function cross(x, y, s, color, sw) {
    s = s || 1; var d = 7 * s;
    return P("M" + (x - d) + " " + (y - d) + " L" + (x + d) + " " + (y + d) + " M" + (x + d) + " " + (y - d) + " L" + (x - d) + " " + (y + d), color || C.orange, sw || 3.5);
  }
  /* A friendly character, feet at (x,y). opts.k adds keyed mouths k-sm / k-fr. */
  function fig(x, y, s, body, opts) {
    opts = opts || {};
    var mouths;
    if (opts.k) {
      mouths = G(opts.k + "-sm", P("M-3.5 -41 Q0 -37.5 3.5 -41", C.ink, 1.6)) +
        G(opts.k + "-fr", P("M-3.5 -38.5 Q0 -42 3.5 -38.5", C.ink, 1.6), { opacity: 0 });
    } else {
      mouths = opts.mood === "frown" ? P("M-3.5 -38.5 Q0 -42 3.5 -38.5", C.ink, 1.6) :
        P("M-3.5 -41 Q0 -37.5 3.5 -41", C.ink, 1.6);
    }
    var hair = opts.hair === "long" ? F("M-11 -44 Q-12 -60 0 -59 Q12 -60 11 -44 L11 -33 Q8 -40 8 -48 Q0 -52 -8 -48 Q-8 -40 -11 -33 Z", opts.hc || C.hair) :
      F("M-10 -48 Q-9.5 -59 0 -58.5 Q10 -59 10 -48 Q5 -53 -10 -48 Z", opts.hc || C.hair);
    return Tr(x, y,
      F("M-14 0 L-14 -23 Q-14 -35 0 -35 Q14 -35 14 -23 L14 0 Z", body || C.navy) +
      (opts.badge ? Ci(7, -24, 4, opts.badge) : "") +
      Ci(0, -46, 10.5, opts.skin || C.skin) + hair +
      Ci(-3.6, -46.5, 1.6, C.ink) + Ci(3.6, -46.5, 1.6, C.ink) + mouths, s);
  }

  /* ---------- Icon library (centred at x,y; s = scale of a 24-unit icon) ---------- */
  var I = {
    bell: function (x, y, s, c) { return Tr(x, y, F("M-10 6 Q-10 -9 0 -9 Q10 -9 10 6 Z", c || C.gold) + R(-12, 6, 24, 3, 1.5, C.ink) + Ci(0, -11, 2.5, C.ink), s); },
    doc: function (x, y, s, c) { return Tr(x, y, R(-9, -12, 18, 24, 2, C.white, { stroke: c || C.navy, "stroke-width": 2 }) + P("M-5 -5 H5 M-5 0 H5 M-5 5 H2", c || C.navy, 1.6), s); },
    money: function (x, y, s, c) { return Tr(x, y, Ci(0, 0, 11, c || C.gold) + P("M3.5 -4.5 Q0 -7 -3.2 -4.8 Q-5.5 -1.8 0 0 Q5.5 1.8 3.2 4.8 Q0 7 -3.5 4.5 M0 -8.5 V8.5", C.white, 2), s); },
    bed: function (x, y, s, c) { return Tr(x, y, R(-12, -2, 24, 8, 2, c || C.navy) + R(-12, -8, 7, 6, 2, C.white, { stroke: c || C.navy, "stroke-width": 1.5 }) + P("M-12 6 V10 M12 6 V10", c || C.navy, 2), s); },
    key: function (x, y, s, c) { return Tr(x, y, Ci(-6, 0, 6, "none", { stroke: c || C.gold, "stroke-width": 3 }) + P("M0 0 H12 M8 0 V5 M11 0 V4", c || C.gold, 3), s); },
    receipt: function (x, y, s, c) { return Tr(x, y, F("M-8 -11 H8 V11 L5 9 L2 11 L-1 9 L-4 11 L-8 9 Z", C.white, { stroke: c || C.navy, "stroke-width": 1.6 }) + P("M-4 -5 H4 M-4 0 H4", c || C.navy, 1.4), s); },
    clock: function (x, y, s, c) { return Tr(x, y, Ci(0, 0, 11, C.white, { stroke: c || C.orange, "stroke-width": 2.5 }) + P("M0 -6 V0 L4 3", c || C.orange, 2), s); },
    phone: function (x, y, s, c) { return Tr(x, y, F("M-9 -6 Q-9 -10 -5 -10 L-3 -10 L-1 -5 L-4 -3 Q-2 3 4 4 L6 1 L10 3 L10 5 Q10 9 6 9 Q-9 8 -9 -6 Z", c || C.navy), s); },
    passport: function (x, y, s, c) { return Tr(x, y, R(-8, -11, 16, 22, 2, c || C.navy) + Ci(0, -2, 4, "none", { stroke: C.gold, "stroke-width": 1.4 }) + P("M-4 6 H4", C.gold, 1.4), s); },
    lock: function (x, y, s, c) { return Tr(x, y, P("M-5 -2 V-6 Q-5 -11 0 -11 Q5 -11 5 -6 V-2", c || C.orange, 2.4) + R(-8, -2, 16, 12, 2, c || C.orange) + Ci(0, 3, 1.8, C.white), s); },
    star: function (x, y, s, c) { return Tr(x, y, F("M0 -11 L3 -3.5 L11 -3.5 L4.5 1.5 L7 9.5 L0 4.5 L-7 9.5 L-4.5 1.5 L-11 -3.5 L-3 -3.5 Z", c || C.sun), s); },
    eye: function (x, y, s, c) { return Tr(x, y, F("M-12 0 Q0 -10 12 0 Q0 10 -12 0 Z", C.white, { stroke: c || C.navy, "stroke-width": 2 }) + Ci(0, 0, 3.5, c || C.navy), s); },
    bulb: function (x, y, s, c) { return Tr(x, y, Ci(0, -3, 8, c || C.sun) + R(-4, 5, 8, 5, 1, C.slate) + P("M0 -15 V-13 M-11 -7 L-9 -6 M11 -7 L9 -6", c || C.sun, 1.6), s); },
    wrench: function (x, y, s, c) { return Tr(x, y, P("M-8 8 L4 -4", c || C.slate, 4) + F("M2 -10 Q10 -12 10 -4 L6 -4 L4 -6 L4 -9 Z", c || C.slate), s); },
    flag: function (x, y, s, c) { return Tr(x, y, P("M-6 11 V-11", C.ink, 2) + F("M-6 -11 L9 -6 L-6 -1 Z", c || C.green), s); },
    mag: function (x, y, s, c) { return Tr(x, y, Ci(-2, -2, 8, C.white, { stroke: c || C.navy, "stroke-width": 3, "fill-opacity": 0.6 }) + P("M4 4 L10 10", c || C.navy, 4), s); },
    hotel: function (x, y, s, c) { return Tr(x, y, R(-9, -12, 18, 24, 1.5, c || C.navy) + R(-5, -8, 3, 3, 0, C.sun) + R(2, -8, 3, 3, 0, C.sun) + R(-5, -2, 3, 3, 0, C.sun) + R(2, -2, 3, 3, 0, C.sun) + R(-2, 6, 4, 6, 0, C.sun), s); },
    coin: function (x, y, s, c) { return Tr(x, y, Ci(0, 0, 8, c || C.gold, { stroke: "#a77b35", "stroke-width": 1.5 }) + P("M0 -4 V4", "#a77b35", 1.6), s); },
    gauge: function (x, y, s, c) { return Tr(x, y, P("M-11 4 A11 11 0 0 1 11 4", c || C.navy, 3) + P("M0 4 L6 -4", C.orange, 2.4) + Ci(0, 4, 2.5, C.ink), s); },
    heart: function (x, y, s, c) { return Tr(x, y, F("M0 8 L-8 0 Q-12 -5 -8 -9 Q-4 -12 0 -7 Q4 -12 8 -9 Q12 -5 8 0 Z", c || C.coral), s); },
    gear: function (x, y, s, c) {
      var d = "", n = 8, r1 = 11, r2 = 8, k;
      for (k = 0; k < n * 2; k++) { var a = k * Math.PI / n, r = k % 2 ? r2 : r1; d += (k ? "L" : "M") + (Math.cos(a) * r).toFixed(1) + " " + (Math.sin(a) * r).toFixed(1) + " "; }
      return Tr(x, y, F(d + "Z", c || C.slate) + Ci(0, 0, 3.5, C.white), s);
    },
    users: function (x, y, s, c) { return Tr(x, y, Ci(-5, -5, 4, c || C.navy) + Ci(5, -5, 4, c || C.navy) + F("M-11 8 Q-11 -1 -5 -1 Q1 -1 1 8 Z", c || C.navy) + F("M-1 8 Q-1 -1 5 -1 Q11 -1 11 8 Z", c || C.navy), s); },
    route: function (x, y, s, c) { return Tr(x, y, P("M-10 8 Q-10 -2 0 0 Q10 2 10 -8", c || C.orange, 2.6, { "stroke-dasharray": "3 3" }) + Ci(-10, 8, 3, C.green) + Ci(10, -8, 3, C.orange), s); },
    stairs: function (x, y, s, c) { return Tr(x, y, F("M-11 10 V4 H-5 V-2 H1 V-8 H7 V-12 H11 V10 Z", c || C.navy), s); },
    chain: function (x, y, s, c) { return Tr(x, y, R(-12, -4, 12, 8, 4, "none", { stroke: c || C.navy, "stroke-width": 2.5 }) + R(2, -4, 12, 8, 4, "none", { stroke: c || C.orange, "stroke-width": 2.5 }) + P("M0 -8 L2 -12 M1 8 L-1 12", C.orange, 1.8), s); },
    plane: function (x, y, s, c) { return Tr(x, y, F("M-12 1 L10 -1 Q14 0 10 1.5 L-12 3 Z M-2 0 L4 -9 L7 -9 L4 0 Z M-2 2 L4 10 L7 10 L4 2 Z M-11 0 L-13 -5 L-10 -5 L-7 0 Z", c || C.white), s); },
    shield: function (x, y, s, c) { return Tr(x, y, F("M0 -11 L9 -7 Q9 6 0 11 Q-9 6 -9 -7 Z", c || C.green) + check(0, 0, 0.55, C.white, 2.2), s); },
    cursor: function (x, y, s, c) { return Tr(x, y, F("M-6 -10 L8 2 L1 3 L5 11 L2 12 L-2 4 L-6 8 Z", c || C.ink, { stroke: C.white, "stroke-width": 1.2 }), s); },
    screen: function (x, y, s, c) { return Tr(x, y, R(-12, -9, 24, 16, 2, c || C.navy) + R(-10, -7, 20, 12, 1, C.sky) + P("M0 7 V11 M-5 11 H5", c || C.navy, 2), s); },
    chat: function (x, y, s, c) { return Tr(x, y, F("M-11 -8 Q-11 -11 -8 -11 H8 Q11 -11 11 -8 V3 Q11 6 8 6 H-2 L-7 11 L-6 6 H-8 Q-11 6 -11 3 Z", c || C.navy), s); },
    pencil: function (x, y, s, c) { return Tr(x, y, F("M-9 9 L-7 3 L5 -9 L9 -5 L-3 7 Z", c || C.gold, { stroke: C.ink, "stroke-width": 1.2 }), s); },
    trophy: function (x, y, s, c) { return Tr(x, y, F("M-7 -10 H7 V-3 Q7 4 0 4 Q-7 4 -7 -3 Z", c || C.gold) + P("M0 4 V8 M-5 10 H5", c || C.gold, 2.5) + P("M-7 -7 Q-11 -7 -10 -3 Q-9 0 -6 0 M7 -7 Q11 -7 10 -3 Q9 0 6 0", c || C.gold, 1.6), s); },
    box: function (x, y, s, c) { return Tr(x, y, R(-10, -8, 20, 16, 2, c || C.wood) + P("M-10 -2 H10 M0 -8 V-2", "#8a6340", 1.5), s); },
    van: function (x, y, s, c) { return Tr(x, y, R(-13, -7, 17, 12, 2, c || C.navy) + F("M4 -4 H9 L13 1 V5 H4 Z", c || C.navy) + Ci(-7, 6, 3, C.ink) + Ci(8, 6, 3, C.ink), s); },
    rocket: function (x, y, s, c) { return Tr(x, y, F("M0 -13 Q7 -6 6 6 H-6 Q-7 -6 0 -13 Z", c || C.coral) + Ci(0, -3, 2.6, C.white) + F("M-6 2 L-10 9 L-6 7 Z M6 2 L10 9 L6 7 Z", C.navy) + F("M-3 7 L0 14 L3 7 Z", C.sun), s); },
    steth: function (x, y, s, c) { return Tr(x, y, P("M-7 -11 V-3 Q-7 4 0 4 Q7 4 7 -3 V-11 M0 4 V7 Q0 11 5 11 Q9 11 9 7", c || C.navy, 2.2) + Ci(9, 5, 3, C.orange), s); },
    car: function (x, y, s, c) { return Tr(x, y, F("M-13 3 L-11 -3 Q-9 -8 -4 -8 H4 Q9 -8 11 -3 L13 3 V7 H-13 Z", c || C.coral) + R(-7, -6, 14, 5, 1, C.sky) + Ci(-7, 7, 3, C.ink) + Ci(7, 7, 3, C.ink), s); },
    pc: function (x, y, s, c) { return Tr(x, y, R(-11, -9, 22, 15, 2, c || C.slate) + R(-9, -7, 18, 11, 1, "#c9d3dc") + R(-4, 6, 8, 3, 0, c || C.slate) + R(-8, 9, 16, 2, 1, c || C.slate), s); }
  };

  /* ---------- Scene runtime ---------- */
  var EASE_CSS = { out: "cubic-bezier(.16,1,.3,1)", io: "cubic-bezier(.65,0,.35,1)", back: "cubic-bezier(.34,1.56,.64,1)", lin: "linear", in: "cubic-bezier(.55,0,1,.45)" };
  var EASE_GS = { out: "power3.out", io: "power2.inOut", back: "back.out(1.6)", lin: "none", in: "power2.in" };

  function baseCSS(id, bg, halo) {
    var r = ".vls-w01-" + id;
    return r + "{position:relative;display:block;width:100%;height:100%;min-height:200px;overflow:hidden;background:" + bg + ";contain:layout paint;-webkit-user-select:none;user-select:none;--vh:" + halo + "}" +
      r + ">svg{position:absolute;left:0;top:0;width:100%;height:100%;display:block;overflow:hidden}" +
      r + " text{font-family:inherit;font-weight:700;letter-spacing:.02em;dominant-baseline:auto}" +
      r + " .lb{paint-order:stroke fill;stroke:var(--vh);stroke-width:4.5px;stroke-linejoin:round}" +
      r + " .lb.hl{stroke:#fbf8f1}" + r + " .lb.hd{stroke:#13263b}" + r + " .lb.hn{stroke:none}" +
      r + " [data-k]{transform-box:view-box}" +
      r + " .vp{animation:vls-w01-pop .45s ease-out both}" +
      r + " .a-spin{transform-box:fill-box;transform-origin:center;animation:vls-w01-spin 6s linear infinite}" +
      r + " .a-bob{transform-box:fill-box;transform-origin:center;animation:vls-w01-bob 2.6s ease-in-out infinite}" +
      r + " .a-pulse{transform-box:fill-box;transform-origin:center;animation:vls-w01-pulse 1.8s ease-in-out infinite}" +
      r + " .a-twinkle{animation:vls-w01-twinkle 3s ease-in-out infinite}" +
      r + " .a-flow{animation:vls-w01-flow 1.2s linear infinite}" +
      r + " .a-flip{transform-box:fill-box;transform-origin:center;animation:vls-w01-flip .32s ease-in-out both}" +
      "@keyframes vls-w01-pop{from{opacity:.15}to{opacity:1}}" +
      "@keyframes vls-w01-spin{to{transform:rotate(360deg)}}" +
      "@keyframes vls-w01-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}" +
      "@keyframes vls-w01-pulse{0%,100%{transform:scale(1);opacity:.9}50%{transform:scale(1.12);opacity:.55}}" +
      "@keyframes vls-w01-twinkle{0%,100%{opacity:.9}50%{opacity:.3}}" +
      "@keyframes vls-w01-flow{to{stroke-dashoffset:-16}}" +
      "@keyframes vls-w01-flip{0%{transform:scaleY(1)}50%{transform:scaleY(.04)}100%{transform:scaleY(1)}}" +
      "@media (prefers-reduced-motion: reduce){" + r + " *{animation:none!important;transition:none!important}}";
  }
  function addCSS(key, css) {
    var d = W.document, st = d.getElementById("vl-sc-w01");
    if (!st) { st = d.createElement("style"); st.id = "vl-sc-w01"; (d.head || d.documentElement).appendChild(st); }
    var flag = "data-vls-" + key;
    if (st.getAttribute(flag)) return;
    st.setAttribute(flag, "1");
    st.appendChild(d.createTextNode(css));
  }

  function chipMarkup(color) {
    return G("chip", R(12, 10, 160, 30, 15, C.white, { "data-k": "chipR", stroke: color || C.navy, "stroke-width": 1.5, "fill-opacity": 0.94 }) +
      Ci(28, 25, 5, color || C.orange) +
      '<text data-k="chipT" x="40" y="31" font-size="16" fill="' + C.ink + '" text-anchor="start"> </text>');
  }

  /* Place a positioned child (<g data-pos>) of keyed group k at (x,y). */
  function placeAt(els, k, x, y) {
    els(k).forEach(function (g) { var p = g.querySelector("[data-pos]"); if (p) p.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ")"); });
  }
  function bboxOf(els, k) { var e = els(k)[0]; if (!e) return null; try { return e.getBBox(); } catch (x) { return null; } }
  function Pos(inner) { return '<g data-pos="1">' + inner + "</g>"; }

  function makeScene(id, cfg) {
    var S = { root: null, svg: null, keys: {}, timers: [], rafs: [], ro: null, cur: -1, chip: "", uid: "" };
    var Lm = cfg.n;

    function els(k) {
      if (!S.root) return [];
      var c = S.keys[k];
      if (!c) { c = Array.prototype.slice.call(S.root.querySelectorAll('[data-k="' + k + '"]')); S.keys[k] = c; }
      return c;
    }
    function clearAsync() {
      S.timers.forEach(function (t) { clearTimeout(t); }); S.timers = [];
      S.rafs.forEach(function (r) { cancelAnimationFrame(r); }); S.rafs = [];
      var g = gsapLib(); if (g && S.root && g.killTweensOf) { try { g.killTweensOf(S.root.querySelectorAll("[data-k]")); } catch (e) { } }
    }
    function fit() {
      if (!S.root || !S.svg) return;
      var r = S.root.getBoundingClientRect(), w = r.width, h = r.height;
      var a = (w > 8 && h > 8) ? w / h : VW / VH;
      a = clamp(a, 0.55, 3.2);
      var vx, vy, vw, vh;
      if (a >= VW / VH) { vh = VH; vw = VH * a; vx = (VW - vw) / 2; vy = 0; }
      else { vw = VW; vh = VW / a; vx = 0; vy = (VH - vh) / 2; }
      S.svg.setAttribute("viewBox", vx.toFixed(1) + " " + vy.toFixed(1) + " " + vw.toFixed(1) + " " + vh.toFixed(1));
      S.root.setAttribute("data-shape", a > 1.55 ? "wide" : a < 1 ? "tall" : "mid");
    }
    function fitPill(g) {
      var t = g.querySelector("text"), rc = g.querySelector("rect");
      if (!t || !rc) return;
      var len = 0; try { len = t.getComputedTextLength(); } catch (e) { }
      if (!(len > 0)) return;
      var fs = parseFloat(t.getAttribute("font-size")) || 16, h = parseFloat(rc.getAttribute("height")) || 30;
      var w = len + Math.max(22, fs * 1.5), x = parseFloat(g.getAttribute("data-px")) || 0, an = g.getAttribute("data-pill");
      var x0 = an === "start" ? x : an === "end" ? x - w : x - w / 2;
      rc.setAttribute("x", x0.toFixed(1)); rc.setAttribute("width", w.toFixed(1));
      t.setAttribute("x", (x0 + w / 2).toFixed(1));
      if (h) rc.setAttribute("rx", h / 2);
    }
    function fitChip() {
      var t = els("chipT")[0], rc = els("chipR")[0]; if (!t || !rc) return;
      var len = 0; try { len = t.getComputedTextLength(); } catch (e) { }
      if (len > 0) rc.setAttribute("width", (len + 44).toFixed(1));
    }
    function vOf(el) {
      if (el.__v) return el.__v;
      var v = { x: 0, y: 0, s: 1, sx: null, sy: null, r: 0, ox: 0, oy: 0 };
      var o = el.getAttribute("data-o");
      if (o) { var p = o.split(/[ ,]+/); v.ox = +p[0] || 0; v.oy = +p[1] || 0; }
      else { try { var b = el.getBBox(); v.ox = b.x + b.width / 2; v.oy = b.y + b.height / 2; } catch (e) { } }
      el.__v = v; return v;
    }

    function animator(instant) {
      var g = gsapLib(), inst = instant || reduced();
      function setEl(el, p, o) {
        o = o || {};
        var dur = o.t != null ? o.t : 0.8, dl = o.dl || 0, ez = o.e || "out";
        var hasT = false, v = vOf(el);
        ["x", "y", "s", "sx", "sy", "r"].forEach(function (k) { if (p[k] != null) { v[k] = p[k]; hasT = true; } });
        if (p.ox != null) { v.ox = p.ox; v.oy = p.oy; }
        var sx = v.sx != null ? v.sx : v.s, sy = v.sy != null ? v.sy : v.s;
        if (g) {
          var vars = {};
          if (hasT) { vars.x = v.x; vars.y = v.y; vars.rotation = v.r; vars.scaleX = sx; vars.scaleY = sy; vars.svgOrigin = v.ox + " " + v.oy; }
          if (p.o != null) vars.opacity = p.o;
          if (p.draw != null) vars.strokeDashoffset = (1.05 - p.draw * 1.05);
          if (inst) { g.set(el, vars); }
          else { vars.duration = dur; vars.delay = dl; vars.ease = EASE_GS[ez] || ez; vars.overwrite = "auto"; g.to(el, vars); }
          paint(el, p, function (t, pv) {
            if (inst) { g.set(t, pv); return; }
            pv.duration = dur; pv.delay = dl; pv.ease = EASE_GS[ez] || ez; pv.overwrite = "auto"; g.to(t, pv);
          });
          return;
        }
        var props = [];
        if (hasT) props.push("transform");
        if (p.o != null) props.push("opacity");
        if (p.draw != null) props.push("stroke-dashoffset");
        var selfPaint = !(el.tagName && el.tagName.toLowerCase() === "g");
        if (selfPaint && p.fill != null) props.push("fill");
        if (selfPaint && p.stroke != null) props.push("stroke");
        el.style.transition = inst ? "none" : props.map(function (q) { return q + " " + dur + "s " + (EASE_CSS[ez] || ez) + " " + dl + "s"; }).join(",");
        if (hasT) {
          el.style.transformOrigin = v.ox + "px " + v.oy + "px";
          el.style.transform = "translate(" + v.x.toFixed(2) + "px," + v.y.toFixed(2) + "px) rotate(" + v.r + "deg) scale(" + sx + "," + sy + ")";
        }
        if (p.o != null) el.style.opacity = p.o;
        if (p.draw != null) el.style.strokeDashoffset = (1.05 - p.draw * 1.05).toFixed(3);
        paint(el, p, function (t, pv) {
          if (t !== el) t.style.transition = inst ? "none" : "fill " + dur + "s ease " + dl + "s, stroke " + dur + "s ease " + dl + "s";
          if (pv.fill != null) t.style.fill = pv.fill;
          if (pv.stroke != null) t.style.stroke = pv.stroke;
        });
      }
      /* Recolour: a keyed <g> recolours its [data-paint] children; other elements recolour themselves. */
      function paint(el, p, fn) {
        if (p.fill == null && p.stroke == null) return;
        var pv = {}; if (p.fill != null) pv.fill = p.fill; if (p.stroke != null) pv.stroke = p.stroke;
        var tg = el.tagName && el.tagName.toLowerCase() === "g" ? el.querySelectorAll("[data-paint]") : [el];
        Array.prototype.forEach.call(tg, function (t) { fn(t, pv); });
      }
      var A = {
        inst: inst,
        el: function (k) { return els(k)[0] || null; },
        set: function (k, p, o) { els(k).forEach(function (el) { setEl(el, p, o); }); return A; },
        show: function (k, yes, o) { return A.set(k, { o: yes ? 1 : 0 }, o || { t: 0.5 }); },
        text: function (k, str) {
          els(k).forEach(function (el) {
            var t = el.tagName && el.tagName.toLowerCase() === "text" ? el : el.querySelector("text");
            if (!t || t.textContent === str) return;
            t.textContent = str;
            var pg = el.getAttribute && el.getAttribute("data-pill") ? el : (t.parentNode && t.parentNode.getAttribute && t.parentNode.getAttribute("data-pill") ? t.parentNode : null);
            if (pg) fitPill(pg);
            if (!inst) { t.classList.remove("vp"); void t.getBoundingClientRect(); t.classList.add("vp"); }
          });
          return A;
        },
        attr: function (k, p, o) {
          o = o || {}; var dur = (o.t != null ? o.t : 0.8) * 1000, dl = (o.dl || 0) * 1000;
          els(k).forEach(function (el) {
            var from = {}, keys = Object.keys(p);
            keys.forEach(function (q) { from[q] = parseFloat(el.getAttribute(q)) || 0; });
            if (inst || dur <= 0) { keys.forEach(function (q) { el.setAttribute(q, p[q]); }); return; }
            var t0 = null;
            function tick(ts) {
              if (t0 === null) t0 = ts + dl;
              var u = clamp((ts - t0) / dur, 0, 1), e = 1 - Math.pow(1 - u, 3);
              keys.forEach(function (q) { el.setAttribute(q, (from[q] + (p[q] - from[q]) * e).toFixed(2)); });
              if (u < 1) S.rafs.push(requestAnimationFrame(tick));
            }
            S.rafs.push(requestAnimationFrame(tick));
          });
          return A;
        },
        count: function (k, to, o) {
          o = o || {}; var fmt = o.fmt || function (v) { return String(Math.round(v)); }, dur = (o.t != null ? o.t : 1) * 1000;
          els(k).forEach(function (el) {
            var from = el.__n != null ? el.__n : 0; el.__n = to;
            if (inst || from === to) { el.textContent = fmt(to); return; }
            var t0 = null;
            function tick(ts) {
              if (t0 === null) t0 = ts;
              var u = clamp((ts - t0) / dur, 0, 1), e = 1 - Math.pow(1 - u, 3);
              el.textContent = fmt(from + (to - from) * e);
              if (u < 1) S.rafs.push(requestAnimationFrame(tick));
            }
            S.rafs.push(requestAnimationFrame(tick));
          });
          return A;
        },
        later: function (ms, fn) { if (inst) fn(); else S.timers.push(setTimeout(fn, ms)); return A; },
        /* Travel through offsets [[x,y],...]; o.t = total duration. */
        route: function (k, pts, o) {
          o = o || {}; var total = o.t || 1.6, n = pts.length;
          if (inst || n < 2) { A.set(k, { x: pts[n - 1][0], y: pts[n - 1][1] }, { t: 0 }); return A; }
          var leg = total / (n - 1);
          A.set(k, { x: pts[0][0], y: pts[0][1] }, { t: 0.25, e: "io" });
          for (var j = 1; j < n; j++) (function (j) {
            A.later(250 + (j - 1) * leg * 1000, function () { A.set(k, { x: pts[j][0], y: pts[j][1], r: pts[j][2] != null ? pts[j][2] : undefined }, { t: leg, e: o.e || "lin" }); });
          })(j);
          return A;
        },
        flip: function (k) {
          if (inst) return A;
          els(k).forEach(function (el) { el.classList.remove("a-flip"); void el.getBoundingClientRect(); el.classList.add("a-flip"); });
          return A;
        },
        chip: function (str) {
          if (S.chip !== str) {
            S.chip = str; A.text("chipT", str); fitChip();
            if (S.svg) S.svg.setAttribute("aria-label", cfg.title + ": " + str);
          }
          return A;
        }
      };
      return A;
    }

    function apply(i, instant) {
      if (!S.root) return;
      clearAsync();
      var A = animator(instant);
      S.cur = i;
      try { cfg.run(i, A, S); } catch (e) { if (W.console) console.warn("VL scene " + id + " step failed:", e); }
    }
    function mapI(i, n) {
      i = Number(i); n = Number(n);
      if (!isFinite(i)) i = 0;
      if (!isFinite(n) || n < 1) n = Lm;
      i = clamp(Math.floor(i), 0, Math.max(0, Math.floor(n) - 1));
      if (Math.floor(n) === Lm) return i;
      return n <= 1 ? 0 : Math.round(i * (Lm - 1) / (Math.floor(n) - 1));
    }

    addCSS("scene-" + id, baseCSS(id, cfg.bg || C.paper, cfg.halo || C.paper) + (cfg.css ? cfg.css(".vls-w01-" + id) : ""));

    return {
      build: function (el) {
        if (!el || !el.appendChild) return;
        clearAsync();
        if (S.ro) { try { S.ro.disconnect(); } catch (e) { } S.ro = null; }
        S.keys = {}; S.chip = ""; S.uid = "w01" + id + (++UIDN);
        var root = W.document.createElement("div");
        root.className = "vls-w01-" + id;
        root.setAttribute("data-vls-scene", id);
        root.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + VW + " " + VH + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(cfg.title) + '" focusable="false">' +
          cfg.draw(S.uid) + chipMarkup(cfg.chipColor) + "</svg>";
        if (typeof el.replaceChildren === "function") el.replaceChildren(root);
        else { while (el.firstChild) el.removeChild(el.firstChild); el.appendChild(root); }
        S.root = root; S.svg = root.querySelector("svg");
        Array.prototype.forEach.call(root.querySelectorAll("[data-pill]"), fitPill);
        fit();
        if (cfg.layout) { try { cfg.layout(els); } catch (e) { } }
        if (W.ResizeObserver) {
          S.ro = new ResizeObserver(function () { if (!S.root || !S.root.isConnected) { if (S.ro) S.ro.disconnect(); return; } fit(); });
          S.ro.observe(root);
        }
        apply(0, true);
      },
      step: function (i, n) { if (S.root) apply(mapI(i, n), false); },
      reset: function () { if (S.root) apply(0, true); }
    };
  }

  /* ==========================================================
     O2b · "TWENTY-THREE TILES"
     One tile = one minute of the guest's time at the desk. The SAME 23
     tiles travel through four physical metaphors without ever being
     replaced: a unit chart (Exhibit 1), water in a leaking pipe (handoffs),
     rooms piling up in a funnel (local optimisation), and marks on a tape
     measure (the end-to-end measure).
     Technique: object-continuity transformation (3Blue1Brown style).
     29 narration moments.
     ========================================================== */
  (function () {
    var N = 29;
    var ROWS = [["QUEUE WAIT", 6], ["FIND BOOKING", 4], ["RE-KEY DETAILS", 3], ["CALL REVENUE", 7], ["CHECK ROOM", 2], ["KEY, DIRECTIONS", 1]];
    var RY = [80, 114, 148, 182, 216, 250], TX0 = 156, TS = 24, TW = 21;
    var tiles = [];   // {r, c, x, y} chart centre
    ROWS.forEach(function (row, r) { for (var c = 0; c < row[1]; c++) tiles.push({ r: r, c: c, x: TX0 + c * TS + TW / 2, y: RY[r] }); });
    var VALUE = tiles.length - 1;   // the single value-adding minute
    // funnel stacking slots (22 grey tiles)
    var FUN = [];
    [[214, 2], [202, 4], [190, 5], [178, 7], [166, 4]].forEach(function (row) {
      for (var c = 0; c < row[1]; c++) FUN.push([240 + (c - (row[1] - 1) / 2) * 13, row[0]]);
    });
    var SPILL = [[142, 128], [334, 126], [128, 150], [350, 148]];

    function draw(u) {
      var labels = "", mins = "", tl = "";
      ROWS.forEach(function (row, r) {
        labels += T(146, RY[r] + 6, row[0], 16, C.ink, { "text-anchor": "end" });
        mins += G("mn" + r, T(330, RY[r] + 6, row[1] + " MIN", 15, r === 5 ? C.green : C.slate, { "text-anchor": "start" }), { opacity: 0 });
      });
      tiles.forEach(function (t, j) {
        var val = j === VALUE;
        tl += G("u" + j, R(t.x - TW / 2, t.y - TW / 2, TW, TW, 4, val ? C.green : C.navy, { stroke: C.white, "stroke-width": 1.5, "data-paint": 1 }) +
          (val ? I.star(t.x, t.y, 0.55, C.sun) : P("M" + (t.x - 4) + " " + t.y + " H" + (t.x + 4) + " M" + t.x + " " + (t.y - 4) + " V" + t.y, C.white, 1.6, { opacity: 0.7 })),
          { "data-o": t.x + " " + t.y });
      });
      return R(-900, -900, 2200, 2200, 0, "#f3f0ea") +
        // ACT 1: exhibit
        G("chart", labels + mins +
          G("br13", P("M322 64 H328 V164 H322", C.orange, 3) + pill("p13", 362, 114, "13 MIN", { fill: C.orange, size: 15 }), { opacity: 0 }) +
          pill("pVal", 244, 250, "ADDS VALUE", { fill: C.green, attrs: { opacity: 0 } }), { opacity: 1 }) +
        G("watch", I.clock(288, 24, 1.05, C.orange), { "data-o": "288 24" }) +
        '<text data-k="cnt" x="390" y="33" font-size="24" fill="' + C.orange + '" text-anchor="end" class="lb">0 MIN</text>' +
        G("q22", T(318, 92, "22 MIN?", 20, C.slate), { opacity: 0 }) +
        // ACT 2: pipe
        G("pipe",
          R(12, 138, 100, 24, 6, "#cfd8e2", { stroke: C.slate, "stroke-width": 2 }) + R(132, 138, 104, 24, 6, "#cfe0d4", { stroke: C.slate, "stroke-width": 2 }) + R(256, 138, 80, 24, 6, "#d6e1ee", { stroke: C.slate, "stroke-width": 2 }) +
          R(106, 132, 32, 36, 5, "#9fb0c1") + R(230, 132, 32, 36, 5, "#9fb0c1") +
          T(62, 122, "FRONT DESK", 16, "#8a5a17") + T(184, 104, "REVENUE OFFICE", 16, C.green) + T(296, 122, "HOUSEKEEPING", 16, C.navy) +
          G("recv", R(358, 128, 36, 44, 6, "#fff7e6", { stroke: C.green, "stroke-width": 2 }) + I.bed(376, 152, 0.8, C.green)) +
          G("valve", R(114, 126, 16, 6, 2, C.red) + L(122, 126, 122, 118, C.red, 3), { opacity: 0 }),
          { opacity: 0 }) +
        G("dr1", F("M122 168 q5 8 0 11 q-5 -3 0 -11z", "#6fa8d6"), { opacity: 0, "data-o": "122 172" }) +
        G("dr2", Tr(246, 176, I.doc(0, 0, 0.6)), { opacity: 0, "data-o": "246 176" }) +
        G("dr3", T(347, 158, "?", 22, C.red), { opacity: 0 }) +
        G("lk1", P("M122 168 V206", "#6fa8d6", 2, { "stroke-dasharray": "3 4" }) + pill("pT", 110, 222, "TIME LOST", { fill: C.red, size: 15 }), { opacity: 0 }) +
        G("lk2", P("M246 168 V206", C.slate, 2, { "stroke-dasharray": "3 4" }) + pill("pI", 250, 222, "INFO LOST", { fill: C.red, size: 15 }), { opacity: 0 }) +
        G("lk3", P("M347 170 V244", C.red, 2, { "stroke-dasharray": "3 4" }) + pill("pO", 334, 258, "OWNER LOST", { fill: C.red, size: 15 }), { opacity: 0 }) +
        G("counters", [96, 176, 256].map(function (x, j) { return R(x - 26, 280, 52, 32, 4, "#e5ddcf", { stroke: "#b49a6d", "stroke-width": 1.5 }) + R(x - 14, 260, 28, 20, 4, C.navy) + T(x, 276, String(j + 1), 16, C.white, { "class": "lb hn" }); }).join("") +
          G("hopper", fig(96, 312, 0.5, C.orange, { hair: "long" }) + I.doc(10, -40, 0.45), { "data-o": "96 312" }), { opacity: 0 }) +
        // ACT 3: tap and funnel
        G("fun",
          R(16, 54, 74, 30, 8, C.slate) + R(70, 70, 34, 18, 4, C.slate) + R(96, 84, 12, 14, 2, C.slate) + T(54, 120, "SALES TEAM", 16, C.navy) +
          F("M150 130 L330 130 L252 220 L252 244 L228 244 L228 220 Z", "#e6eef6", { stroke: C.navy, "stroke-width": 3 }) +
          T(262, 116, "HOUSEKEEPING", 16, C.navy) +
          R(176, 262, 128, 12, 4, C.green) + T(240, 298, "READY ROOMS", 16, C.green),
          { opacity: 0 }) +
        G("stream", P("M102 98 C112 120 150 112 196 134", C.navy, 6, { "class": "a-flow", "stroke-dasharray": "8 8", opacity: 0.85 }), { opacity: 0 }) +
        G("gauge", Tr(54, 160, Ci(0, 0, 22, C.white, { stroke: C.navy, "stroke-width": 2 }) + P("M-15 6 A16 16 0 0 1 15 6", C.mute, 4)) +
          G("needle", L(54, 166, 54, 146, C.orange, 3), { "data-o": "54 166" }) + Ci(54, 166, 3, C.ink), { opacity: 0 }) +
        pill("pRooms", 240, 152, "ROOMS NOT READY", { fill: C.red, size: 15, attrs: { opacity: 0 } }) +
        G("waiter", fig(352, 300, 0.75, C.orange, { mood: "frown", hair: "long" }) + I.clock(378, 236, 0.9, C.red), { opacity: 0 }) +
        // ACT 4: tape measure
        G("tapeW",
          G("tapeS", R(46, 164, 330, 14, 2, C.sun, { stroke: "#a77b35", "stroke-width": 1.2 }) + P(Array.apply(null, Array(33)).map(function (_, j) { return "M" + (50 + j * 10) + " 164 v" + (j % 5 ? 5 : 9); }).join(" "), "#7a5a22", 1.2), { "data-o": "46 171" }) +
          G("tapeSag", P("M46 171 Q210 250 376 171", C.sun, 14, { opacity: 0.95 }) + P("M46 171 Q210 250 376 171", "#a77b35", 1.2, { "stroke-dasharray": "2 8" }), { opacity: 0 }) +
          Ci(36, 171, 24, C.red) + Ci(36, 171, 9, "#7a1d10") + R(368, 158, 10, 26, 2, "#7a5a22"),
          { opacity: 0 }) +
        pill("pA", 14, 128, "GUEST ARRIVES", { fill: C.green, size: 15, anchor: "start", attrs: { opacity: 0 } }) +
        pill("pB", 390, 128, "GUEST IN ROOM", { fill: C.green, size: 15, anchor: "end", attrs: { opacity: 0 } }) +
        G("stops", I.bell(110, 206, 0.9) + I.money(180, 206, 0.9) + I.bed(250, 206, 0.95) + Tr(330, 206, R(-9, -12, 18, 24, 2, "#a8743f")), { opacity: 0 }) +
        G("segN", R(46, 160, 206, 22, 4, "none", { stroke: C.navy, "stroke-width": 3 }), { opacity: 0 }) +
        G("segO", R(254, 160, 122, 22, 4, "none", { stroke: C.red, "stroke-width": 3, "stroke-dasharray": "5 4" }), { opacity: 0 }) +
        pill("pDesk", 148, 244, "DESK: 23 MIN", { fill: C.navy, attrs: { opacity: 0 } }) +
        pill("pRest", 318, 244, "ROOM NOT READY", { fill: C.red, size: 15, attrs: { opacity: 0 } }) +
        G("ownerQ", Ci(210, 92, 18, C.white, { stroke: C.red, "stroke-width": 2.5, "stroke-dasharray": "4 3" }) + T(210, 100, "?", 22, C.red, { "class": "lb hn" }), { opacity: 0 }) +
        pill("pNo", 210, 60, "NO OWNER", { fill: C.red, attrs: { opacity: 0 } }) +
        G("speeds", [110, 180, 250].map(function (x) { return I.gauge(x, 250, 1.1, C.green) + Ci(x + 13, 240, 7, C.green) + check(x + 13, 241, 0.4, C.white, 2); }).join(""), { opacity: 0 }) +
        G("owner", fig(36, 300, 0.85, C.green, { badge: C.sun }), { opacity: 0 }) +
        pill("pOwn", 150, 296, "PROCESS OWNER?", { fill: C.green, attrs: { opacity: 0 } }) +
        tl;
    }

    function tileTargets(i) {
      // returns per-tile {x,y,s,o,fill}
      return tiles.map(function (t, j) {
        var val = j === VALUE, o = { x: 0, y: 0, s: 1, o: 1, fill: val ? C.green : C.navy };
        var filledAt = [2, 3, 3, 5, 6, 7][t.r];
        if (i < 9) {
          if (i < filledAt) { o.o = 0; o.y = -26; }
          if (i === 4 && t.r <= 2) o.fill = C.orange;
          if (i >= 8 && !val) o.fill = "#9aa9b8";
          if (i === 8 && val) o.s = 1.25;
          return o;
        }
        var g = val ? -1 : j;               // grey index 0..21
        if (i === 9) {
          if (val) { o.s = 1.3; return o; }
          o.x = 236 + (g % 6) * 24 - t.x; o.y = 112 + Math.floor(g / 6) * 24 - t.y; o.fill = "#9aa9b8"; return o;
        }
        if (i <= 16) {
          if (val) { o.x = 376 - t.x; o.y = 112 - t.y; o.s = 0.8; return o; }
          var px = 22 + g * 14.6, compress = i >= 12 && px < 112;
          if (compress) px = 22 + g * 7.5;
          o.x = px - t.x; o.y = 150 - t.y; o.s = 0.55; o.fill = compress ? C.orange : C.navy;
          return o;
        }
        if (i <= 21) {
          if (val) { o.o = 0; return o; }
          var inF = i >= 20 ? 22 : i === 19 ? 12 : 0;
          if (g < inF) {
            var slot = g < 18 ? FUN[g] : SPILL[g - 18];
            o.x = slot[0] - t.x; o.y = slot[1] - t.y; o.s = 0.55; o.fill = g >= 18 ? C.red : C.navy;
          } else { o.x = 86 - t.x; o.y = 70 - t.y; o.s = 0.4; o.o = 0; }
          return o;
        }
        // tape: 23 minutes laid along the desk portion
        var on24 = i >= 24 && i <= 27;
        o.x = 52 + j * 8.9 - t.x; o.y = 171 - t.y; o.s = 0.38; o.o = on24 && i !== 26 ? 1 : 0; o.fill = val ? C.green : C.navy;
        if (i === 26) o.y += 0;
        return o;
      });
    }

    function run(i, A) {
      var act = i <= 9 ? 1 : i <= 16 ? 2 : i <= 21 ? 3 : 4;
      A.set("chart", { o: act === 1 ? 1 : 0 }, { t: 0.6 });
      ROWS.forEach(function (row, r) { A.set("mn" + r, { o: i >= [2, 3, 3, 5, 6, 7][r] && i <= 8 && !(i === 4 && r <= 2) ? 1 : 0 }, { t: 0.4, dl: 0.4 }); });
      A.show("br13", i === 4);
      A.show("pVal", i === 8);
      var mins = [0, 0, 6, 13, 13, 20, 22, 23][Math.min(i, 7)];
      if (i >= 8) mins = 23;
      A.count("cnt", mins, { t: 0.9, fmt: function (v) { return Math.round(v) + " MIN"; } });
      A.set("cnt", { o: act === 1 ? 1 : 0 }, { t: 0.4 }); A.set("watch", { o: act === 1 ? 1 : 0, r: i >= 1 && i <= 8 ? i * 45 : 0 }, { t: 0.6 });
      A.show("q22", i === 9);

      tileTargets(i).forEach(function (p, j) {
        var fillAt = [2, 3, 3, 5, 6, 7][tiles[j].r];
        var dl = (i === fillAt && i <= 7) ? tiles[j].c * 0.09 + (i === 3 && tiles[j].r === 2 ? 0.45 : 0) :
          i === 9 || i === 10 || i === 17 ? j * 0.025 : (i === 19 || i === 20) ? j * 0.04 : i === 24 ? j * 0.03 : 0;
        A.set("u" + j, p, { t: i === fillAt ? 0.5 : 0.9, dl: dl, e: i === fillAt ? "back" : "io" });
      });
      A.set("u" + VALUE, { o: (act === 3) ? 0 : (act === 4 && !on(i, 24, 27)) ? 0 : undefined }, { t: 0.4 });

      // pipe
      A.set("pipe", { o: act === 2 ? 1 : 0 }, { t: 0.6 });
      A.set("dr1", { o: on(i, 11, 15) ? 1 : 0, y: on(i, 11, 15) ? 12 : 0 }, { t: 0.8 });
      A.set("dr2", { o: on(i, 11, 15) && i !== 12 ? 1 : 0, y: on(i, 11, 15) ? 12 : 0 }, { t: 0.8 });
      A.show("dr3", on(i, 15, 16));
      A.show("valve", on(i, 12, 13));
      A.show("lk1", on(i, 13, 15)); A.show("lk2", on(i, 14, 15)); A.show("lk3", i === 15);
      A.show("counters", i === 16);
      if (i === 16) A.route("hopper", [[0, 0], [40, -18], [80, 0], [120, -18], [160, 0], [120, -18], [160, 0]], { t: 2.4, e: "io" });
      else A.set("hopper", { x: 0, y: 0 }, { t: 0.2 });

      // funnel
      A.set("fun", { o: act === 3 ? 1 : 0 }, { t: 0.6 });
      A.set("stream", { o: on(i, 19, 21) ? 1 : 0 }, { t: 0.5 });
      A.set("gauge", { o: on(i, 18, 21) ? 1 : 0 }, { t: 0.5 });
      A.set("needle", { r: i >= 19 ? 62 : i === 18 ? 20 : -40 }, { t: 0.9, e: "back" });
      A.show("pRooms", on(i, 20, 21));
      A.show("waiter", i === 21);

      // tape
      A.set("tapeW", { o: act === 4 ? 1 : 0 }, { t: 0.6 });
      A.set("tapeS", { sx: i >= 22 ? (i === 22 ? 0.55 : 1) : 0.05, o: i === 26 ? 0 : 1 }, { t: 1.1, e: "io" });
      A.set("tapeSag", { o: i === 26 ? 1 : 0 }, { t: 0.6 });
      A.show("pA", act === 4); A.set("pB", { o: i >= 23 ? 1 : 0 }, { t: 0.5 });
      A.show("stops", on(i, 23, 25));
      A.show("segN", on(i, 24, 25)); A.show("pDesk", on(i, 24, 25));
      A.show("segO", i === 25); A.show("pRest", i === 25);
      A.set("ownerQ", { o: i === 26 ? 1 : 0, s: i === 26 ? 1 : 0.5 }, { t: 0.6, e: "back" }); A.show("pNo", i === 26);
      A.show("speeds", i === 27);
      A.set("owner", { o: i === 28 ? 1 : 0, x: i === 28 ? 0 : -30 }, { t: 0.8, e: "out" }); A.show("pOwn", i === 28);

      A.chip(["EXHIBIT 1", "STAND BESIDE HER", "6 MIN IN QUEUE", "+4, +3 MINUTES", "13 MIN, NO ROOM",
        "+7 MIN ON THE PHONE", "+2 MIN: ROOM?", "+1 MIN: THE KEY", "ONE VALUE MINUTE", "WHERE DID 22 GO?",
        "HANDOFFS", "EVERY TRANSFER LEAKS", "WAITING FOR REVENUE", "TIME LEAKS AWAY", "INFORMATION LEAKS",
        "RESPONSIBILITY LEAKS", "AN EVERYDAY HANDOFF", "ANOTHER DANGER", "LOCAL OPTIMISATION", "SALES BOOKS FASTER",
        "ROOMS PILE UP", "WHOLE FLOW WORSE", "END-TO-END MEASURE", "ARRIVAL TO ROOM", "DESK IS ONLY PART",
        "THEN AN UNREADY ROOM", "NOBODY OWNS IT", "SPEED ≠ OUTCOME", "WHO OWNS THE WHOLE?"][i]);
    }

    REG.O2b = makeScene("O2b", {
      n: N, title: "Twenty-three minute tiles move from an exhibit chart into a leaking pipe, an overflowing funnel and a tape measure",
      bg: "#f3f0ea", halo: "#f3f0ea", draw: draw, run: run
    });
  })();

  /* ==========================================================
     O3a · "THE TRACING-PAPER MAP"
     Metaphor (from the narration itself): the process view is a road map
     laid over a list of towns. Departments are towns that stay where they
     are; a translucent sheet carrying the guest's road slides over them.
     On that road we place the four differences: an owner (navigator pin),
     an end-to-end odometer, money that flows to the road, and staff who
     can see the whole map.
     Technique: layered overlay (tracing sheet) + motion-path travel.
     30 narration moments.
     ========================================================== */
  (function () {
    var N = 30;
    var CARDS = [
      { x: 14, y: 64, n: ["FRONT DESK"], r: ["THE COURIER"], ic: function (x, y) { return I.bell(x, y, 1); }, ri: function (x, y) { return I.van(x, y, 1.1); }, col: "#a7742f" },
      { x: 226, y: 64, n: ["REVENUE", "OFFICE"], r: ["THE", "WAREHOUSE"], ic: function (x, y) { return I.money(x, y, 1); }, ri: function (x, y) { return I.box(x, y, 1.1); }, col: C.green },
      { x: 14, y: 188, n: ["HOUSEKEEPING"], r: ["FINANCE TEAM"], ic: function (x, y) { return I.bed(x, y, 1); }, ri: function (x, y) { return I.receipt(x, y, 1.1); }, col: C.navy },
      { x: 226, y: 188, n: ["FINANCE TEAM"], r: ["FINANCE TEAM"], ic: function (x, y) { return I.receipt(x, y, 1); }, ri: function (x, y) { return I.receipt(x, y, 1); }, col: C.violet }
    ];
    var ROAD = "M-60 156 L24 156 C50 156 60 131 94 131 C128 131 116 181 150 181 C196 181 226 131 270 131 C306 131 298 181 330 181 C356 181 362 156 378 156 L480 156";
    var WAY = [[24, 156], [94, 131], [150, 181], [270, 131], [330, 181], [378, 156]];
    var MIDS = [[122, 156], [210, 156], [300, 156]];
    function off(p) { return [p[0] - 24, p[1] - 156]; }

    function card(k, c) {
      var two = c.n.length > 1;
      return G("card" + k,
        R(c.x, c.y, 160, 60, 10, C.white, { stroke: c.col, "stroke-width": 2 }) + R(c.x, c.y, 8, 60, 4, c.col) +
        G("ci" + k, Tr(c.x + 28, c.y + 30, c.ic(0, 0))) + G("cr" + k, Tr(c.x + 28, c.y + 30, c.ri(0, 0)), { opacity: 0 }) +
        G("cm" + k, Tr(c.x + 28, c.y + 30, I.route(0, 0, 1.1)), { opacity: 0 }) +
        TK("na" + k, c.x + 48, c.y + (two ? 27 : 36), c.n[0], 15, c.col, { "text-anchor": "start", "class": "lb hn" }) +
        TK("nb" + k, c.x + 48, c.y + 46, two ? c.n[1] : "", 15, c.col, { "text-anchor": "start", "class": "lb hn" }) +
        G("flag" + k, P("M" + (c.x + 150) + " " + (c.y + 4) + " V" + (c.y - 18), C.ink, 1.8) + F("M" + (c.x + 150) + " " + (c.y - 18) + " L" + (c.x + 136) + " " + (c.y - 13) + " L" + (c.x + 150) + " " + (c.y - 8) + " Z", C.green), { opacity: 0, "data-o": (c.x + 150) + " " + (c.y + 4) }) +
        G("vault" + k, Tr(c.x + 138, c.y + 40, I.coin(0, 0, 1) + I.lock(10, 6, 0.6, C.red)), { opacity: 0 }) +
        G("staff" + k, fig(c.x + 130, c.y + 58, 0.42, c.col, {}), { opacity: 0 }) +
        G("brd" + k, R(c.x - 3, c.y - 3, 166, 66, 12, "none", { stroke: C.orange, "stroke-width": 3 }), { opacity: 0 }),
        { "data-o": (c.x + 80) + " " + (c.y + 30) });
    }
    function draw(u) {
      return "<defs>" +
        '<pattern id="' + u + 'grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0 H0 V20" fill="none" stroke="#d9cfbd" stroke-width="1"/></pattern>' +
        '<filter id="' + u + 'sh" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="-3" dy="5" stdDeviation="4" flood-color="#1b2a3a" flood-opacity=".22"/></filter>' +
        "</defs>" +
        R(-900, -900, 2200, 2200, 0, "#f1eadc") + R(-900, -900, 2200, 2200, 0, "url(#" + u + "grid)") +
        CARDS.map(function (c, k) { return card(k, c); }).join("") +
        G("gm", fig(200, 180, 0.9, C.deep, {}) + G("gmQ", R(178, 104, 44, 36, 12, C.white, { stroke: C.deep, "stroke-width": 1.5 }) + T(200, 130, "?", 22, C.orange, { "class": "lb hn" }), { opacity: 0 }), { opacity: 0 }) +
        G("gaps", MIDS.map(function (p) { return Ci(p[0], p[1], 9, "none", { stroke: C.red, "stroke-width": 2, "stroke-dasharray": "3 3" }); }).join(""), { opacity: 0 }) +
        // guest record
        G("gst", fig(30, 312, 0.78, C.orange, { mood: "frown", hair: "long" }) + pill("g23", 54, 274, "23 MIN WAIT", { fill: C.red, size: 15, anchor: "start" }) + I.lock(170, 274, 0.9, C.red), { opacity: 0 }) +
        pill("g410", 54, 304, "RATED 4/10", { fill: C.red, size: 15, anchor: "start", attrs: { opacity: 0 } }) +
        // THE TRACING SHEET
        G("sheet",
          R(-6, 50, 412, 270, 6, "#ffffff", { opacity: 0.2, filter: "url(#" + u + "sh)" }) +
          F("M406 50 L406 84 L372 50 Z", "#e8e2d6") +
          P(ROAD, "#59636e", 13, { opacity: 0.9 }) + P(ROAD, "#f6f1e7", 2, { "stroke-dasharray": "7 7" }) +
          G("roadLit", P(ROAD, C.orange, 6, { opacity: 0.9 }), { opacity: 0 }),
          { "data-o": "200 185" }) +
        PD("roadDraw", ROAD, C.sun, 5) +
        G("delays", MIDS.map(function (p, j) { return G("dl" + j, I.clock(p[0], p[1], 0.85, C.red)); }).join(""), { opacity: 0 }) +
        G("fixes", MIDS.map(function (p) { return Ci(p[0], p[1], 10, C.green, { stroke: C.white, "stroke-width": 2 }) + check(p[0], p[1] + 1, 0.55, C.white, 2.4); }).join(""), { opacity: 0 }) +
        G("broken", R(194, 141, 32, 30, 4, "#f1eadc") + cross(210, 156, 1.1, C.red, 4), { opacity: 0 }) +
        G("bridge", R(190, 148, 40, 16, 3, C.green), { opacity: 0, "data-o": "210 156" }) +
        // start/destination
        G("startB", Ci(24, 156, 11, C.orange, { stroke: C.white, "stroke-width": 2.5 }), { opacity: 0 }) +
        G("destB", Ci(380, 156, 15, C.white, { stroke: C.green, "stroke-width": 2.5 }) + I.bed(380, 157, 0.75, C.green), { opacity: 0 }) +
        G("legS", P("M24 168 V262", C.orange, 2, { "stroke-dasharray": "3 4" }) + pill("pStart", 14, 276, "GUEST ARRIVES", { fill: C.orange, size: 15, anchor: "start" }), { opacity: 0 }) +
        G("legD", P("M380 172 V262", C.green, 2, { "stroke-dasharray": "3 4" }) + pill("pDest", 390, 276, "GUEST SETTLED", { fill: C.green, size: 15, anchor: "end" }), { opacity: 0 }) +
        // odometer
        G("odo", R(210, 258, 176, 50, 10, C.deep) + T(298, 278, "END-TO-END TIME", 15, "#dfe9f3", { "class": "lb hn" }) + R(224, 286, 148, 12, 6, "#2f4b68") +
          G("odoBar", R(224, 286, 148, 12, 6, C.sun), { "data-o": "224 292" }), { opacity: 0 }) +
        pill("t90", 70, 270, "DESK: 90 SEC", { fill: C.green, size: 15, attrs: { opacity: 0 } }) +
        pill("t45", 70, 304, "ROOMS: 45 MIN", { fill: C.green, size: 15, attrs: { opacity: 0 } }) +
        G("coins", [0, 1, 2].map(function (j) { return G("cn" + j, I.coin(0, 0, 1.1), { "data-o": "0 0" }); }).join(""), { opacity: 0 }) +
        pill("pMoney", 200, 300, "MONEY FOLLOWS PROCESS", { fill: "#a7742f", attrs: { opacity: 0 } }) +
        G("eyes", MIDS.map(function (p) { return I.eye(p[0], p[1] - 22, 0.75, C.navy); }).join(""), { opacity: 0 }) +
        // returns measures
        G("gA", R(110, 252, 180, 28, 14, "#e6e0d4") + T(200, 271, "PARCELS SCANNED", 15, C.slate, { "class": "lb hn" }) + L(120, 266, 280, 266, C.red, 2.5), { opacity: 0 }) +
        pill("gB", 200, 300, "DAYS TO REFUND", { fill: C.green, attrs: { opacity: 0 } }) +
        // four things
        G("four", [[80, I.flag(0, 0, 1, C.green)], [160, I.gauge(0, 2, 1.1)], [240, I.coin(0, 0, 1.3)], [320, I.route(0, 0, 1.2)]].map(function (p, j) {
          return G("f" + j, Ci(p[0], 292, 20, C.white, { stroke: C.navy, "stroke-width": 2 }) + Tr(p[0], 292, p[1]), { "data-o": p[0] + " 292" });
        }).join(""), { opacity: 0 }) +
        // owner pin (navigator)
        G("own", Tr(24, 156, F("M0 0 q-12 -16 -12 -25 a12 12 0 0 1 24 0 q0 9 -12 25z", C.green, { stroke: C.white, "stroke-width": 2 }) + Ci(0, -25, 5, C.white)) +
          G("ownKey", I.key(38, 132, 0.85, C.sun)) + G("ownBang", Ci(38, 132, 10, C.red) + T(38, 138, "!", 15, C.white, { "class": "lb hn" }), { opacity: 0 }),
          { opacity: 0, "data-o": "24 156" }) +
        pill("pOwner", 200, 300, "PROCESS OWNER", { fill: C.green, attrs: { opacity: 0 } }) +
        pill("pAuth", 200, 300, "NO AUTHORITY?", { fill: C.red, attrs: { opacity: 0 } });
    }

    function run(i, A) {
      var returns = on(i, 22, 24);
      CARDS.forEach(function (c, k) {
        A.set("card" + k, { o: (returns && k === 3) ? 0.25 : (i === 0 ? 1 : 1), sy: (i === 22 || i === 25) ? 1 : 1 }, { t: 0.5 });
        A.text("na" + k, returns ? c.r[0] : c.n[0]);
        A.text("nb" + k, returns ? (c.r[1] || "") : (c.n[1] || ""));
        A.show("ci" + k, !returns && !(i === 19 && k === 0) && i !== 20);
        A.show("cr" + k, returns);
        A.show("cm" + k, (i === 19 && k === 0) || i === 20);
        A.show("brd" + k, (i === 19 && k === 0) || i === 20);
        A.set("flag" + k, { o: on(i, 2, 5) || on(i, 25, 26) ? 1 : 0, r: i === 4 ? (k % 2 ? 12 : -12) : 0 }, { t: 0.5, dl: i === 2 ? k * 0.15 : i === 4 ? k * 0.2 : 0, e: "back" });
        A.show("vault" + k, i === 16);
        A.set("staff" + k, { o: on(i, 18, 21) ? 1 : 0, y: on(i, 18, 21) ? 0 : 6 }, { t: 0.5, dl: i === 18 ? k * 0.1 : 0 });
      });
      if (i === 22) CARDS.forEach(function (c, k) { A.flip("card" + k); });
      A.set("gm", { o: on(i, 0, 5) ? 1 : 0 }, { t: 0.5 });
      A.set("gmQ", { o: on(i, 3, 5) ? 1 : 0, s: i === 5 ? 1.2 : 1 }, { t: 0.5, e: "back" });
      A.show("gaps", i === 5);
      A.set("gst", { o: on(i, 1, 2) ? 1 : 0 }, { t: 0.5 }); A.show("g410", i === 2);

      // the sheet slides over the towns
      var sx = i < 6 ? 440 : i === 6 ? 330 : 0, sy = 0, sr = 0;
      if (on(i, 25, 26)) { sx = 26; sy = -18; sr = 3; }
      A.set("sheet", { x: sx, y: sy, r: sr, o: i >= 6 ? 1 : 0 }, { t: 1.2, e: i === 27 ? "back" : "io" });
      A.set("roadDraw", { draw: i === 7 ? 1 : 0, o: i === 7 ? 1 : 0 }, { t: 1.6, e: "io" });
      A.set("roadLit", { o: i === 13 || i === 20 || i === 23 || i === 27 ? 1 : 0 }, { t: 0.6 });
      A.show("startB", i >= 7 && !on(i, 25, 26)); A.show("destB", i >= 7 && !on(i, 25, 26));
      A.text("pStart", returns ? "CLICK RETURN" : "GUEST ARRIVES");
      A.text("pDest", returns ? "MONEY BACK" : "GUEST SETTLED");
      A.show("legS", on(i, 7, 8) || i === 22); A.show("legD", on(i, 7, 8) || i === 22);

      // owner pin travels the road
      var route = WAY.map(off);
      if (i === 10 || i === 23) { A.set("own", { o: 1 }, { t: 0.2 }); A.route("own", route, { t: 3, e: "io" }); }
      else A.set("own", { x: 0, y: 0, o: i >= 8 && !on(i, 25, 26) ? 1 : 0 }, { t: 0.6 });
      A.set("ownKey", { o: i >= 9 && i <= 28 ? 1 : 0, y: i === 29 ? 30 : 0, r: i === 29 ? 50 : 0 }, { t: 0.7, e: "in" });
      A.set("ownBang", { o: i === 29 ? 1 : 0 }, { t: 0.4 });
      A.show("pOwner", i === 9);
      A.show("pAuth", i === 29);

      // measures
      A.show("odo", on(i, 11, 15));
      A.set("odoBar", { sx: i >= 13 ? 1 : i >= 11 ? 0.04 : 0.04 }, { t: 2.6, e: "io" });
      A.show("t90", i === 12); A.show("t45", i === 12);
      A.set("delays", { o: on(i, 14, 20) ? 1 : 0 }, { t: 0.5 });
      [0, 1, 2].forEach(function (j) { A.set("dl" + j, { o: i === 21 ? 0 : 1 }, { t: 0.4 }); });
      A.set("broken", { o: on(i, 15, 16) ? 1 : 0 }, { t: 0.5 });
      A.set("bridge", { o: i >= 17 && i <= 21 ? 1 : 0, sx: i >= 17 ? 1 : 0.1 }, { t: 0.6, dl: i === 17 ? 1.4 : 0, e: "back" });
      A.set("coins", { o: i === 17 ? 1 : 0 }, { t: 0.3 });
      [[94, 104], [306, 104], [94, 228]].forEach(function (p, j) {
        A.set("cn" + j, i === 17 ? { x: 210, y: 156, s: 0.6 } : { x: p[0] + 58, y: p[1], s: 1 }, { t: 1.2, dl: j * 0.2, e: "io" });
      });
      A.show("pMoney", i === 17);
      A.show("eyes", i === 21);
      A.set("fixes", { o: i === 21 ? 1 : 0, s: i === 21 ? 1 : 0.4 }, { t: 0.5, dl: 0.5, e: "back" });

      A.show("gA", i === 24); A.show("gB", i === 24);
      A.show("four", i === 28);
      [0, 1, 2, 3].forEach(function (j) { A.set("f" + j, { s: i === 28 ? 1 : 0.3 }, { t: 0.5, dl: j * 0.15, e: "back" }); });

      A.chip(["THE MORNING AFTER", "23 MINUTES, NO ROOM", "EVERY TARGET MET", "WHO WAS RESPONSIBLE?", "EACH TOWN REPORTS",
        "NOBODY OWNS THE ROAD", "A DIFFERENT IDEA", "PROCESS-CENTRED", "APPOINT SOMEONE", "THE PROCESS OWNER",
        "ACROSS EVERY TOWN", "JUDGE SUCCESS DIFFERENTLY", "LOCAL TARGETS TODAY", "MEASURE THE WHOLE TRIP", "DELAYS REVEALED",
        "DISCONNECTED SYSTEMS", "BUDGETS LOCKED AWAY", "MONEY FOLLOWS PROCESS", "EVERYDAY DECISIONS", "SHE SEES THE ROAD",
        "EVERYONE SEES IT", "HIDDEN PROBLEMS FOUND", "ONLINE RETURNS", "THE RETURNS OWNER", "MEASURE DAYS TO REFUND",
        "KEEP THE DEPARTMENTS", "TOWNS STAY PUT", "ROAD MAP OVER TOWNS", "FOUR THINGS DIFFERENT", "A DANGEROUS MISTAKE"][i]);
    }

    REG.O3a = makeScene("O3a", {
      n: N, title: "Departments as towns and the process as a road on a tracing sheet laid over them",
      bg: "#f1eadc", halo: "#f1eadc", draw: draw, run: run
    });
  })();

  /* ==========================================================
     O3b · "TWO LENSES AND A WHEEL CONNECTED TO NOTHING"
     Act 1: the same organisation seen through two physical lenses. The
     navy lens shows vertical pillars; the orange lens, moved across the
     same picture, reveals the hidden horizontal journey (clip-path reveal).
     Act 2: the trap. A process owner gets a steering wheel, but its cables
     to the rate system, schedules and targets are cut: she turns, nothing
     moves. Real ownership reconnects flow, measures and budget.
     Technique: animated clip-path lens reveal + mechanical linkage.
     33 narration moments.
     ========================================================== */
  (function () {
    var N = 33;
    var PX = [92, 164, 236, 308], PY = 210;
    var BY = [92, 172, 252], HUB = [96, 206];
    var LBL = [[["RATE", "SYSTEM"], ["FLOW", "OF WORK"]], [["HOUSEKEEPING", "SCHEDULES"], ["THE", "MEASURES"]], [["TEAM", "TARGETS"], ["THE", "BUDGET"]]];

    function pillars(extra) {
      var icons = [I.bell(0, 0, 1.1), I.money(0, 0, 1.1), I.bed(0, 0, 1.1), I.receipt(0, 0, 1.1)];
      return PX.map(function (x, k) {
        return R(x - 26, 118, 52, 168, 4, "#e9edf2", { stroke: C.slate, "stroke-width": 2 }) + R(x - 32, 108, 64, 12, 3, "#c9d3de") +
          Tr(x, 156, Ci(0, 0, 15, C.white, { stroke: C.slate, "stroke-width": 1.5 }) + icons[k]) + (extra ? extra(x, k) : "");
      }).join("");
    }
    function journey() {
      var d = "M34 " + PY + " L376 " + PY, dots = "";
      for (var k = 0; k < 3; k++) { var a = PX[k] + 26, b = PX[k + 1] - 26; dots += L(a + 4, PY, b - 4, PY, C.white, 3, { "stroke-dasharray": "2 5" }); }
      return P(d, C.orange, 9) + dots + PX.map(function (x) { return Ci(x, PY, 9, C.white, { stroke: C.orange, "stroke-width": 3 }); }).join("") +
        P("M356 " + (PY - 10) + " L372 " + PY + " L356 " + (PY + 10), C.orange, 4);
    }
    function draw(u) {
      var managers = PX.map(function (x, k) { return G("mg" + k, fig(x, 108, 0.55, C.deep, {}) + G("mok" + k, Ci(x + 14, 72, 8, C.green) + check(x + 14, 73, 0.45, C.white, 2), { opacity: 0 }), { opacity: 0 }); }).join("");
      var cables = BY.map(function (y, j) {
        var mx = 150, my = HUB[1] + (y - HUB[1]) * ((mx - HUB[0]) / (222 - HUB[0]));
        var mx2 = 170, my2 = HUB[1] + (y - HUB[1]) * ((mx2 - HUB[0]) / (222 - HUB[0]));
        return G("cbA" + j, L(HUB[0], HUB[1], mx, my, C.slate, 4, { "data-paint": 1 })) + G("cbB" + j, L(mx2, my2, 222, y, C.slate, 4, { "data-paint": 1 })) +
          PD("cbC" + j, "M" + mx + " " + my + " L" + mx2 + " " + my2, C.green, 5) +
          G("cut" + j, cross((mx + mx2) / 2, (my + my2) / 2, 0.55, C.red, 3), { opacity: 0 });
      }).join("");
      var boxes = BY.map(function (y, j) {
        return G("bx" + j, R(222, y - 18, 40, 36, 7, C.white, { stroke: C.navy, "stroke-width": 2 }) + G("gr" + j, I.gear(242, y, 1.05, C.slate), { "data-o": "242 " + y }) +
          G("lk" + j, I.lock(258, y - 16, 0.7, C.red), { opacity: 0 }) +
          TK("la" + j, 272, y - 2, LBL[j][0][0], 15, C.navy, { "text-anchor": "start" }) + TK("lb" + j, 272, y + 16, LBL[j][0][1], 15, C.navy, { "text-anchor": "start" }) +
          G("hm" + j, fig(242, y - 20, 0.38, C.slate, {}), { opacity: 0, "data-o": "242 " + (y - 30) }));
      }).join("");
      var spokes = [0, 120, 240].map(function (a) { var r = a * Math.PI / 180; return L(HUB[0], HUB[1], HUB[0] + Math.cos(r) * 38, HUB[1] + Math.sin(r) * 38, C.ink, 5); }).join("");
      return "<defs>" +
        '<clipPath id="' + u + 'cf"><circle data-k="clipF" cx="-200" cy="180" r="60"/></clipPath>' +
        '<clipPath id="' + u + 'cp"><circle data-k="clipP" cx="-200" cy="' + PY + '" r="56"/></clipPath>' +
        "</defs>" +
        R(-900, -900, 2200, 2200, 0, "#eef1f5") + R(-900, 286, 2200, 600, 0, "#dde3ea") +
        // ACT 1
        G("act1",
          G("base", pillars()) + managers +
          G("funcL", G("fl", R(-900, -900, 2200, 2200, 0, "#1f4e79", { opacity: 0.16 }) + pillars(function (x) { return P("M" + x + " 270 V128 M" + (x - 8) + " 140 L" + x + " 126 L" + (x + 8) + " 140", C.navy, 4); })), { "clip-path": "url(#" + u + "cf)" }) +
          G("procL", R(-900, -900, 2200, 2200, 0, "#fff3ea", { opacity: 0.9 }) + pillars() + journey() +
            G("waitH", PX.slice(0, 3).map(function (x) { return R(x + 30, PY - 8, 64, 16, 8, "none", { stroke: C.red, "stroke-width": 2.5 }); }).join(""), { opacity: 0 }) +
            G("coinsP", PX.map(function (x) { return I.coin(x, PY + 30, 0.9) + I.coin(x + 5, PY + 26, 0.9); }).join(""), { opacity: 0 }) +
            G("redPath", P("M34 " + PY + " L376 " + PY, C.red, 9), { opacity: 0 }) +
            G("cycleB", P("M34 " + (PY + 22) + " V" + (PY + 30) + " H376 V" + (PY + 22), C.navy, 2.5), { opacity: 0 }),
            { "clip-path": "url(#" + u + "cp)" }) +
          G("lensF", Ci(0, 0, 60, "none", { stroke: C.navy, "stroke-width": 7 }) + L(42, 42, 70, 70, C.navy, 10), { opacity: 0, "data-o": "0 0" }) +
          G("lensP", Ci(0, 0, 56, "none", { stroke: C.orange, "stroke-width": 7 }) + L(40, 40, 66, 66, C.orange, 10), { opacity: 0, "data-o": "0 0" }) +
          G("divider", L(200, 50, 200, 290, C.ink, 3, { "stroke-dasharray": "6 5" }), { opacity: 0 }) +
          G("tools", Ci(330, 54, 15, C.white, { stroke: C.navy, "stroke-width": 4 }) + Ci(370, 54, 15, C.white, { stroke: C.orange, "stroke-width": 4 }), { opacity: 1 }) +
          G("gst", fig(34, 286, 0.85, C.orange, { k: "gm", hair: "long" }) + G("gq", T(34, 222, "?", 22, C.orange), { opacity: 0 }), { opacity: 0 }) +
          G("dest", Ci(380, PY, 14, C.white, { stroke: C.green, "stroke-width": 2 }) + I.bed(380, PY + 1, 0.7, C.green), { opacity: 0 }) +
          G("score", Ci(70, 232, 22, C.white, { stroke: C.red, "stroke-width": 3 }) + T(70, 238, "4/10", 16, C.red, { "class": "lb hn" }), { opacity: 0, "data-o": "70 232" }) +
          G("see", I.eye(40, 300, 1.1) + P("M58 300 H72", C.slate, 2.5) + I.doc(88, 300, 0.95) + P("M104 300 H118", C.slate, 2.5) + fig(136, 316, 0.4, C.orange, {}) +
            I.eye(244, 300, 1.1) + P("M262 300 H284", C.orange, 3.5) + fig(312, 320, 0.62, C.orange, { hair: "long" }), { opacity: 0 }) +
          pill("seeL", 100, 268, "THROUGH TARGETS", { fill: C.navy, size: 15, attrs: { opacity: 0 } }) +
          pill("seeR", 300, 268, "SEES HER DIRECTLY", { fill: C.orange, size: 15, attrs: { opacity: 0 } }),
          { "data-o": "200 170" }) +
        pill("pF", 200, 304, "FUNCTIONAL VIEW", { fill: C.navy, attrs: { opacity: 0 } }) +
        pill("pP", 200, 304, "PROCESS VIEW", { fill: C.orange, attrs: { opacity: 0 } }) +
        pill("mCT", 110, 252, "CYCLE TIME", { fill: C.navy, size: 15, attrs: { opacity: 0 } }) +
        pill("mCS", 290, 252, "COST TO SERVE", { fill: "#a7742f", size: 15, attrs: { opacity: 0 } }) +
        pill("mQ", 200, 300, "SERVICE QUALITY", { fill: C.green, size: 15, attrs: { opacity: 0 } }) +
        pill("pLW", 200, 304, "LOCAL WINS, GLOBAL LOSS", { fill: C.red, attrs: { opacity: 0 } }) +
        // ACT 2
        G("act2",
          R(-900, 288, 2200, 30, 0, "#c3ccd6") + P("M-900 302 H1300", C.white, 2, { "stroke-dasharray": "10 10" }) +
          G("car", I.car(46, 296, 1.5, C.coral), { "data-o": "46 296" }) +
          G("clocks", [0, 1, 2, 3, 4].map(function (j) { return G("ck" + j, I.clock(118 + j * 16, 272 - (j % 2) * 10, 0.75, C.red), { "data-o": (118 + j * 16) + " 272" }); }).join(""), { opacity: 0 }) +
          cables + boxes +
          G("owner", fig(32, 272, 1.0, C.green, { k: "om", badge: C.sun }) + P("M44 244 Q60 236 66 222", C.green, 6)) +
          G("wheel", Ci(HUB[0], HUB[1], 40, "none", { stroke: C.ink, "stroke-width": 7 }) + spokes + Ci(HUB[0], HUB[1], 9, C.ink) + Ci(HUB[0], HUB[1] - 40, 4, C.orange), { "data-o": HUB[0] + " " + HUB[1] }) +
          pill("pOwn", 96, 140, "PROCESS OWNER", { fill: C.green, attrs: { opacity: 0 } }) +
          G("claps", [[30, 150], [162, 150], [40, 104], [152, 104], [96, 92]].map(function (p) { return I.star(p[0], p[1], 0.7, C.sun); }).join(""), { opacity: 0 }) +
          G("warn", F("M96 60 L130 118 L62 118 Z", C.sun, { stroke: "#8a5a17", "stroke-width": 2 }) + T(96, 112, "!", 30, C.ink, { "class": "lb hn" }), { opacity: 0, "data-o": "96 100" }) +
          G("qq", T(150, 118, "?", 28, C.orange) + T(176, 96, "?", 22, C.orange), { opacity: 0 }) +
          pill("pGot", 300, 306, "SHE'S GOT IT", { fill: C.slate, attrs: { opacity: 0 } }) +
          G("carHollow", Tr(46, 296, F("M-13 3 L-11 -3 Q-9 -8 -4 -8 H4 Q9 -8 11 -3 L13 3 V7 H-13 Z", "#c3ccd6", { stroke: C.coral, "stroke-width": 1.5, "stroke-dasharray": "3 2" }), 1.5), { opacity: 0 }) +
          G("budget", [0, 1, 2].map(function (j) { return G("bc" + j, I.coin(0, 0, 0.9), { "data-o": "0 0" }); }).join(""), { opacity: 0 }),
          { opacity: 0 }) +
        // ACT 3
        G("act3",
          G("lzF", Ci(110, 160, 70, "#dfe8f2", { stroke: C.navy, "stroke-width": 7 }) + Tr(110, 168, R(-34, -32, 14, 60, 2, C.slate) + R(-7, -32, 14, 60, 2, C.slate) + R(20, -32, 14, 60, 2, C.slate)), { "data-o": "110 160" }) + G("lzLab", T(110, 262, "FUNCTIONAL LENS", 16, C.navy) + T(290, 262, "PROCESS LENS", 16, C.orange)) +
          G("lzP", Ci(290, 160, 70, "#fbe7dc", { stroke: C.orange, "stroke-width": 7, "fill-opacity": 0.85 }) + P("M236 166 H342", C.orange, 7) + Ci(260, 166, 6, C.white, { stroke: C.orange, "stroke-width": 2 }) + Ci(316, 166, 6, C.white, { stroke: C.orange, "stroke-width": 2 }), { "data-o": "290 160" }) +
          G("keyMid", Ci(200, 160, 18, C.sun, { stroke: C.white, "stroke-width": 2 }) + I.key(200, 160, 0.9, C.ink), { opacity: 0, "data-o": "200 160" }) +
          G("once", Ci(120, 150, 44, C.white, { stroke: C.slate, "stroke-width": 2 }) + I.wrench(120, 150, 2.2) + T(120, 226, "FIX IT ONCE", 16, C.slate) +
            Ci(280, 150, 44, C.white, { stroke: C.green, "stroke-width": 2 }) + P("M262 136 A22 22 0 1 1 260 160", C.green, 5) + P("M256 130 L263 137 L254 141", C.green, 4) + T(280, 226, "KEEP MANAGING", 16, C.green) +
            T(200, 160, "?", 34, C.orange), { opacity: 0 }),
          { opacity: 0 });
    }

    function lensF(A, cx, cy, r, show) {
      A.attr("clipF", { cx: cx, cy: cy, r: r }, { t: 1 });
      A.set("lensF", { x: cx, y: cy, s: r / 60, o: show ? 1 : 0 }, { t: 1, e: "out" });
    }
    function lensP(A, cx, cy, r, show) {
      A.attr("clipP", { cx: cx, cy: cy, r: r }, { t: 1 });
      A.set("lensP", { x: cx, y: cy, s: Math.min(r, 70) / 56, o: show ? 1 : 0 }, { t: 1, e: "out" });
    }
    function run(i, A) {
      var act = i <= 14 ? 1 : i <= 29 ? 2 : 3;
      A.set("act1", { o: act === 1 ? 1 : 0, y: act === 1 ? 0 : 30 }, { t: 0.7 });
      A.set("act2", { o: act === 2 ? 1 : 0 }, { t: 0.7 });
      A.set("act3", { o: act === 3 ? 1 : 0 }, { t: 0.7 });

      // ---- Act 1: lenses
      PX.forEach(function (x, k) {
        A.set("mg" + k, { o: i >= 1 ? 1 : 0, y: i >= 1 ? 0 : -8 }, { t: 0.5, dl: i === 1 ? k * 0.1 : 0 });
        A.set("mok" + k, { o: (on(i, 3, 4) && k < 3) || on(i, 13, 14) ? 1 : 0, s: i === 3 || i === 13 ? 1.2 : 1 }, { t: 0.45, dl: i === 3 ? k * 0.25 : i === 13 ? k * 0.1 : 0, e: "back" });
      });
      A.set("tools", { o: i <= 1 ? 1 : 0 }, { t: 0.5 });
      // functional lens
      if (i === 2) lensF(A, 236, 190, 66, true);
      else if (i === 10 || i === 11 || i === 12) lensF(A, -3800, 170, 4000, false);
      else if (i === 13) lensF(A, -3600, 170, 4000, false);
      else lensF(A, i < 2 ? -120 : 236, 190, 0.01, false);
      A.set("lensF", { o: i === 2 ? 1 : 0 }, { t: 0.5 });
      // process lens
      var pCx = -200, pCy = PY, pR = 56, pShow = false;
      if (i === 5) { pCx = 46; pShow = true; }
      if (i === 6) { pCx = 300; pShow = true; }
      if (on(i, 7, 9) || i === 14) { pCx = 200; pR = 420; }
      if (on(i, 10, 12)) { pCx = 4200; pR = 4000; pCy = 170; }
      A.attr("clipP", { cx: pCx, cy: pCy, r: pR }, { t: i === 6 ? 1.8 : 1 });
      A.set("lensP", { x: pCx, y: pCy, s: 1, o: pShow ? 1 : 0 }, { t: i === 6 ? 1.8 : 1, e: "out" });
      A.set("divider", { o: on(i, 10, 12) ? 1 : 0 }, { t: 0.5 });
      A.show("pF", i === 2); A.show("pP", i === 6);
      A.set("gst", { o: on(i, 4, 14) && !on(i, 11, 12) ? 1 : 0 }, { t: 0.6 });
      A.set("gm-sm", { o: on(i, 4, 14) ? 0 : 1 }, { t: 0.3 }); A.set("gm-fr", { o: on(i, 4, 14) ? 1 : 0 }, { t: 0.3 });
      A.show("gq", i === 4);
      A.set("dest", { o: on(i, 5, 14) ? 1 : 0 }, { t: 0.5 });
      A.show("mCT", on(i, 7, 8)); A.show("mCS", i === 7 || i === 9); A.show("mQ", i === 7);
      A.set("waitH", { o: i === 8 ? 1 : 0 }, { t: 0.5 }); A.set("cycleB", { o: i === 8 ? 1 : 0 }, { t: 0.5 });
      A.set("coinsP", { o: i === 9 ? 1 : 0 }, { t: 0.5 });
      A.show("see", on(i, 11, 12)); A.show("seeL", i === 12); A.show("seeR", i === 12);
      A.set("score", { o: on(i, 13, 14) ? 1 : 0, s: i === 13 ? 1.2 : 1 }, { t: 0.5, e: "back" });
      A.set("redPath", { o: i === 14 ? 1 : 0 }, { t: 0.6 });
      A.show("pLW", i === 14);

      // ---- Act 2: the steering wheel
      var linked = i >= 27;
      var wheelR = i === 18 ? 120 : i === 21 ? 300 : i === 28 ? 220 : i === 29 ? 260 : 0;
      A.set("wheel", { r: wheelR }, { t: i === 21 ? 1.8 : 1, e: "io" });
      A.set("owner", { o: i >= 16 ? 1 : 0 }, { t: 0.5 });
      A.set("om-sm", { o: on(i, 18, 26) ? 0 : 1 }, { t: 0.3 }); A.set("om-fr", { o: on(i, 18, 26) ? 1 : 0 }, { t: 0.3 });
      A.set("pOwn", { o: on(i, 16, 17) ? 1 : 0, s: i === 16 ? 1.08 : 1 }, { t: 0.5, e: "back" });
      A.set("claps", { o: i === 17 ? 1 : 0, s: i === 17 ? 1 : 0.6 }, { t: 0.5, e: "back" });
      BY.forEach(function (y, j) {
        var cutOn = on(i, 18, 26) && (j === 0 ? i >= 18 : i >= 19);
        A.set("cut" + j, { o: cutOn ? 1 : 0, s: cutOn ? 1 : 0.4 }, { t: 0.4, e: "back" });
        A.set("cbC" + j, { draw: linked ? 1 : 0 }, { t: 0.6, dl: i === 27 ? j * 0.25 : 0 });
        A.set("cbA" + j, { stroke: linked ? C.green : (i === 18 && j === 0) ? C.orange : C.slate }, { t: 0.4 });
        A.set("cbB" + j, { stroke: linked ? C.green : C.slate }, { t: 0.4 });
        A.set("lk" + j, { o: on(i, 19, 26) || (i === 18 && j === 0) ? 1 : 0 }, { t: 0.4, dl: i === 19 ? j * 0.2 : 0 });
        A.set("hm" + j, { o: on(i, 20, 23) ? 1 : 0, x: on(i, 24, 26) ? 40 : 0 }, { t: 0.6 });
        A.set("gr" + j, { r: linked ? (i - 26) * 120 : 0 }, { t: 1.1, e: "io" });
        A.text("la" + j, LBL[j][linked ? 1 : 0][0]); A.text("lb" + j, LBL[j][linked ? 1 : 0][1]);
        A.set("bx" + j, { o: i >= 18 ? 1 : 0.25 }, { t: 0.5 });
      });
      A.set("warn", { o: i === 22 ? 1 : 0, s: i === 22 ? 1 : 0.5 }, { t: 0.5, e: "back" });
      A.show("qq", i === 23);
      A.show("pGot", i === 24);
      A.set("clocks", { o: on(i, 25, 26) ? 1 : 0 }, { t: 0.4 });
      [0, 1, 2, 3, 4].forEach(function (j) { A.set("ck" + j, { s: on(i, 25, 26) ? 1 : 0.2 }, { t: 0.4, dl: i === 25 ? j * 0.15 : 0, e: "back" }); });
      A.set("car", { o: i === 26 ? 0 : 1, x: i >= 28 ? (i === 28 ? 90 : 140) : 0 }, { t: 1.4, e: "io" });
      A.set("carHollow", { o: i === 26 ? 1 : 0 }, { t: 0.5 });
      A.set("budget", { o: i === 29 ? 1 : 0 }, { t: 0.3 });
      [0, 1, 2].forEach(function (j) { A.set("bc" + j, i === 29 ? { x: HUB[0] + 10, y: HUB[1] + 10 } : { x: 222, y: 252 }, { t: 1.2, dl: j * 0.25, e: "io" }); });

      // ---- Act 3: both lenses, then once or always?
      A.set("lzF", { x: i === 31 ? 54 : 0, o: i <= 31 ? 1 : 0 }, { t: 0.9, e: "io" });
      A.set("lzP", { x: i === 31 ? -54 : 0, o: i <= 31 ? 1 : 0 }, { t: 0.9, e: "io" });
      A.set("keyMid", { o: i === 31 ? 1 : 0, s: i === 31 ? 1 : 0.4 }, { t: 0.5, dl: 0.6, e: "back" });
      A.show("once", i === 32); A.show("lzLab", i <= 31);

      A.chip(["TWO LENSES", "MANAGERS REPORT", "THE FUNCTIONAL VIEW", "EVERY TARGET MET", "NOT HER EXPERIENCE",
        "FOLLOW THE GUEST", "THE PROCESS VIEW", "TIME, QUALITY, COST", "CYCLE TIME", "COST TO SERVE",
        "OWN PART VS FLOW", "SEEING THE CUSTOMER", "INDIRECT VS DIRECT", "GREAT REPORTS, 4/10", "LOCAL WINS, GLOBAL LOSS",
        "THE TRAP", "AN OWNER IS NAMED", "EVERYONE APPLAUDS", "RATE SYSTEM: NO", "SCHEDULES, TARGETS: NO",
        "OTHERS CAN REFUSE", "OWNERSHIP WITHOUT AUTHORITY", "WORSE THAN NOTHING", "WHY MORE DANGEROUS?", "SOMEONE OWNS IT",
        "NOBODY ASKS ANYMORE", "A TITLE, NOT POWER", "REAL OWNERSHIP", "NOW IT STEERS", "RESOURCES TOO",
        "TWO LENSES, BOTH KEPT", "OWNER WITH AUTHORITY", "ONCE, OR ALWAYS?"][i]);
    }

    REG.O3b = makeScene("O3b", {
      n: N, title: "A functional and a process lens over the same organisation, then a process owner whose steering wheel is not connected",
      bg: "#eef1f5", halo: "#eef1f5", draw: draw, run: run
    });
  })();

  /* ==========================================================
     O4a · "THE SAWTOOTH AND THE STEADY LINE"
     Metaphor: check-in quality plotted over the years. A BPI project is a
     bounded column: the line jumps, the project closes, nobody watches,
     the line decays – and a new project is needed: a sawtooth (the crash
     diet). BPM is a second pen that stays high because an owner keeps
     watching and nudging it back (the healthy routine), with small
     projects nested inside it.
     Technique: data-pen plotting, live chart annotation (NYT style).
     33 narration moments.
     ========================================================== */
  (function () {
    var N = 33, X0 = 50, Y0 = 268, LOW = 236, HIGH = 104;
    var xk = function (k) { return X0 + k * 55; };
    var SEG = {
      o1: "M50 236 C70 236 84 120 105 104",
      o2: "M105 104 C140 110 172 222 215 232",
      o3: "M215 232 C234 232 250 120 270 106",
      o4: "M270 106 C306 112 340 196 384 210",
      g1: "M105 104 C140 100 180 112 214 104 C226 101 234 104 240 108",
      g2: "M240 108 C246 128 252 140 258 132 C262 124 264 110 270 106",
      g3: "M270 106 C284 102 296 106 302 102 L312 86 L322 100 C340 104 360 98 384 100"
    };
    function draw(u) {
      var ticks = "";
      for (var k = 0; k <= 6; k++) ticks += L(xk(k), Y0, xk(k), Y0 + 6, C.slate, 2) + T(xk(k), Y0 + 22, String(k), 15, C.slate);
      return "<defs>" +
        '<linearGradient id="' + u + 'bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7fbf8"/><stop offset="1" stop-color="#eef3f7"/></linearGradient>' +
        "</defs>" +
        R(-900, -900, 2200, 2200, 0, "url(#" + u + "bg)") +
        G("grid", [104, 148, 192, 236].map(function (y) { return L(-900, y, 1300, y, "#dbe3ea", 1, { "stroke-dasharray": "3 5" }); }).join("")) +
        L(X0, 70, X0, Y0, C.ink, 2.5) + L(X0, Y0, 392, Y0, C.ink, 2.5) +
        G("ticks", ticks + T(330, 312, "TIME IN YEARS", 15, C.slate)) +
        TK("yT", 58, 62, "CHECK-IN QUALITY", 15, C.slate, { "text-anchor": "start" }) +
        // project columns
        G("col1", R(50, 70, 55, 198, 0, C.navy, { opacity: 0.09 }) + L(105, 70, 105, Y0, C.navy, 2, { "stroke-dasharray": "5 4" }) + pill("pc1", 78, 88, "BPI PROJECT", { fill: C.navy, size: 15 }), { opacity: 0 }) +
        G("col2", R(215, 70, 55, 198, 0, C.navy, { opacity: 0.09 }) + L(215, 70, 215, Y0, C.navy, 2, { "stroke-dasharray": "5 4" }) + L(270, 70, 270, Y0, C.navy, 2, { "stroke-dasharray": "5 4" }) + pill("pc2", 242, 88, "BPI AGAIN", { fill: C.navy, size: 15 }), { opacity: 0 }) +
        G("flags", I.flag(56, 254, 0.9, C.green) + I.star(78, 196, 0.8, C.sun) + Tr(108, 254, P("M-5 11 V-11", C.ink, 2) + R(-5, -11, 14, 10, 0, C.ink) + R(-5, -11, 7, 5, 0, C.white) + R(2, -6, 7, 5, 0, C.white)), { opacity: 0 }) +
        G("lost", F("M105 104 C140 110 172 222 215 232 L215 104 Z", C.red, { opacity: 0.12 }), { opacity: 0 }) +
        // the lines
        PD("o1", SEG.o1, C.orange, 4.5) + PD("o2", SEG.o2, C.orange, 4.5) + PD("o3", SEG.o3, C.orange, 4.5) + PD("o4", SEG.o4, C.orange, 4.5) +
        PD("g1", SEG.g1, C.green, 5) + PD("g2", SEG.g2, C.green, 5) + PD("g3", SEG.g3, C.green, 5) +
        G("dot0", Ci(50, 236, 7, C.red, { stroke: C.white, "stroke-width": 2 }) + Ci(50, 236, 13, "none", { stroke: C.red, "stroke-width": 2, "class": "a-pulse" }), { opacity: 0 }) +
        pill("p410", 64, 210, "4/10 TODAY", { fill: C.red, size: 15, anchor: "start", attrs: { opacity: 0 } }) +
        G("team", [I.bell(0, 0, 0.9), I.money(0, 0, 0.9), I.bed(0, 0, 0.9), I.receipt(0, 0, 0.9)].map(function (ic, j) {
          return G("tm" + j, Ci(110 + j * 40, 170, 16, C.white, { stroke: C.slate, "stroke-width": 1.5 }) + Tr(110 + j * 40, 170, ic), { "data-o": (110 + j * 40) + " 170" });
        }).join(""), { opacity: 0 }) +
        G("waste", [["SEARCHING SYSTEMS", 112], ["REPEATED DATA", 148], ["WAITING TIME", 184]].map(function (w, j) {
          return G("ws" + j, pill("wsp" + j, 300, w[1], w[0], { fill: C.red, size: 15 }), { "data-o": "300 " + w[1] });
        }).join(""), { opacity: 0 }) +
        G("happy", fig(146, 104, 0.45, C.orange, { hair: "long" }), { opacity: 0 }) +
        G("eyeQ", I.eye(150, 78, 1.1) + T(176, 86, "?", 22, C.orange), { opacity: 0 }) +
        G("eyeShut", P("M138 78 Q150 86 162 78", C.slate, 2.5), { opacity: 0 }) +
        G("events", I.users(150, 252, 0.9, C.slate) + I.screen(182, 252, 0.85, C.slate) + I.chain(208, 236, 0.75), { opacity: 0 }) +
        pill("pFade", 150, 138, "GAINS FADE", { fill: C.red, size: 15, attrs: { opacity: 0 } }) +
        G("owner", fig(0, 0, 0.5, C.green, { badge: C.sun }), { opacity: 0, "data-o": "0 0" }) +
        G("blips", [150, 190, 230, 300, 350].map(function (x, j) { return G("bl" + j, Ci(x, x > 280 ? 101 : 106, 5, C.white, { stroke: C.green, "stroke-width": 2.5 }), { "data-o": x + " 104" }); }).join(""), { opacity: 0 }) +
        G("fixRing", Ci(252, 128, 18, "none", { stroke: C.green, "stroke-width": 2.5, "stroke-dasharray": "4 3" }) + I.wrench(276, 146, 0.8, C.green), { opacity: 0 }) +
        pill("pBPM", 286, 74, "MANAGED CONTINUOUSLY", { fill: C.green, size: 15, attrs: { opacity: 0 } }) +
        G("gov", [I.users(296, 66, 0.9, C.green), I.gauge(326, 68, 0.9, C.green), I.doc(356, 66, 0.8, C.green)].map(function (ic) { return ic; }).join(""), { opacity: 0 }) +
        G("band", R(100, 74, 292, 80, 16, "none", { stroke: C.green, "stroke-width": 2.5, "stroke-dasharray": "7 5" }), { opacity: 0 }) +
        pill("pBand", 300, 172, "BPM CONTAINS BPI", { fill: C.green, size: 15, attrs: { opacity: 0 } }) +
        G("spikeRing", Ci(312, 92, 16, "none", { stroke: C.sun, "stroke-width": 3 }), { opacity: 0 }) +
        pill("pSpike", 312, 52, "FOCUSED EFFORT", { fill: "#a7742f", size: 15, attrs: { opacity: 0 } }) +
        pill("pDiet", 110, 304, "CRASH DIET", { fill: C.orange, attrs: { opacity: 0 } }) +
        pill("pRoutine", 290, 304, "HEALTHY ROUTINE", { fill: C.green, attrs: { opacity: 0 } }) +
        G("scale", Tr(330, 244, R(-22, -12, 44, 24, 6, C.white, { stroke: C.slate, "stroke-width": 2 }) + P("M-10 -4 A10 10 0 0 1 10 -4", C.slate, 2)) + G("scaleN", L(330, 240, 330, 230, C.red, 2.5), { "data-o": "330 240" }), { opacity: 0 }) +
        G("empty", Ci(222, 196, 15, C.white, { stroke: C.red, "stroke-width": 2, "stroke-dasharray": "4 3" }) + T(222, 203, "?", 18, C.red, { "class": "lb hn" }), { opacity: 0 }) +
        G("bigEye", I.eye(150, 76, 1.4, C.green), { opacity: 0 }) +
        G("weeks", pill("w13", 140, 304, "WEEK 13", { fill: C.violet }) + pill("w14", 260, 304, "WEEK 14", { fill: C.violet }), { opacity: 0 }) +
        G("stairs", [0, 1, 2, 3, 4].map(function (j) { return G("st" + j, R(290 + j * 20, 250 - j * 22 - 22, 18, 22 + j * 22, 3, j === 0 ? C.sun : "#c9d6c9"), { "data-o": (299 + j * 20) + " 250" }); }).join("") + T(340, 132, "?", 30, C.orange), { opacity: 0 });
    }

    // position of the owner on the green line
    var OWN = [[130, 101], [190, 108], [244, 118], [300, 102]];
    function run(i, A) {
      var health = on(i, 23, 27);
      A.text("yT", health ? "YOUR HEALTH" : "CHECK-IN QUALITY");
      A.set("ticks", { o: on(i, 23, 30) ? 0 : 1 }, { t: 0.4 });
      A.set("dot0", { o: i <= 4 ? 1 : 0 }, { t: 0.4 });
      A.show("p410", on(i, 0, 1));
      A.set("team", { o: on(i, 2, 3) ? 1 : 0 }, { t: 0.5 });
      [0, 1, 2, 3].forEach(function (j) { A.set("tm" + j, { x: i === 2 ? -20 - j * 10 : 0, s: i === 2 ? 1.1 : 1 }, { t: 0.8, e: "back" }); });
      A.set("waste", { o: on(i, 3, 5) ? 1 : 0 }, { t: 0.4 });
      [0, 1, 2].forEach(function (j) { A.set("ws" + j, i === 5 ? { x: -222, y: [-24, 0, 24][j] + 40, s: 0.3, o: 0 } : { x: 0, y: 0, s: 1, o: i >= 3 ? 1 : 0 }, { t: 0.9, dl: i === 3 ? j * 0.25 : j * 0.12, e: "io" }); });

      // project 1
      A.set("col1", { o: on(i, 4, 9) ? 1 : (on(i, 10, 15) ? 0.45 : 0) }, { t: 0.6 });
      A.set("o1", { draw: i >= 5 ? 1 : 0, o: i >= 16 && i !== 24 && i !== 25 ? 0.3 : 1 }, { t: 1.2, e: "io" });
      A.show("happy", i === 6);
      A.set("flags", { o: on(i, 8, 9) ? 1 : 0 }, { t: 0.5 });
      A.set("eyeQ", { o: i === 10 ? 1 : 0 }, { t: 0.5 });
      A.set("eyeShut", { o: i === 11 ? 1 : 0 }, { t: 0.5 });
      // decay
      A.set("o2", { draw: i >= 11 ? (i === 11 ? 0.35 : i === 12 ? 0.75 : 1) : 0, o: i >= 16 && i !== 24 && i !== 25 ? 0.3 : 1 }, { t: 1.3, e: "io" });
      A.show("events", i === 12);
      A.set("lost", { o: i === 13 || i === 25 ? 1 : 0 }, { t: 0.6 });
      A.show("pFade", i === 13);
      A.set("col2", { o: on(i, 14, 15) ? 1 : 0 }, { t: 0.6 });
      A.set("o3", { draw: i >= 14 ? 1 : 0, o: i >= 16 && i !== 24 && i !== 25 ? 0.3 : 1 }, { t: 1.1, e: "io" });
      A.set("o4", { draw: i >= 15 ? 1 : 0, o: i >= 16 && i !== 24 && i !== 25 ? 0.3 : 1 }, { t: 1.3, e: "io" });

      // BPM pen
      A.set("g1", { draw: i >= 16 ? 1 : 0, o: i === 24 || i === 25 || i === 31 || i === 32 ? 0.35 : 1 }, { t: 1.3, e: "io" });
      A.set("g2", { draw: i >= 19 ? 1 : 0, o: i === 24 || i === 25 || i === 31 || i === 32 ? 0.35 : 1 }, { t: 1, e: "io" });
      A.set("g3", { draw: i >= 20 ? 1 : 0, o: i === 24 || i === 25 || i === 31 || i === 32 ? 0.35 : 1 }, { t: 1.3, e: "io" });
      var op = i === 17 ? OWN[0] : i === 18 ? OWN[1] : i === 19 ? OWN[2] : OWN[3];
      A.set("owner", { x: op[0], y: op[1], o: on(i, 17, 22) || i === 29 ? 1 : 0, s: i === 29 ? 1.3 : 1 }, { t: 1, e: "io" });
      A.set("blips", { o: i === 18 ? 1 : 0 }, { t: 0.4 });
      [0, 1, 2, 3, 4].forEach(function (j) { A.set("bl" + j, { s: i === 18 ? 1.3 : 0.6 }, { t: 0.4, dl: j * 0.18, e: "back" }); });
      A.show("fixRing", i === 19);
      A.show("pBPM", i === 20);
      A.show("gov", i === 21);
      A.set("band", { o: i === 22 || i === 28 ? 1 : 0 }, { t: 0.6 });
      A.show("pBand", i === 22);

      // health analogy
      A.show("pDiet", on(i, 23, 27)); A.show("pRoutine", on(i, 23, 27));
      A.set("pDiet", { s: on(i, 24, 25) ? 1.12 : 1 }, { t: 0.4, e: "back" });
      A.set("pRoutine", { s: on(i, 26, 27) ? 1.12 : 1, o: on(i, 23, 27) ? (on(i, 24, 25) ? 0.4 : 1) : 0 }, { t: 0.4, e: "back" });
      A.set("pDiet", { o: on(i, 23, 27) ? (on(i, 26, 27) ? 0.4 : 1) : 0 }, { t: 0.4 });
      A.set("scale", { o: on(i, 24, 25) ? 1 : 0 }, { t: 0.5 });
      A.set("scaleN", { r: i === 25 ? 50 : -40 }, { t: 0.9, e: "back" });
      A.set("spikeRing", { o: on(i, 27, 28) ? 1 : 0, s: i === 27 ? 1.2 : 1 }, { t: 0.5, e: "back" });
      A.show("pSpike", on(i, 27, 28));
      A.text("pSpike", i === 28 ? "BPI INSIDE BPM" : "FOCUSED EFFORT");
      A.show("empty", i === 29); A.show("bigEye", i === 29);
      A.show("weeks", i === 30);
      A.set("stairs", { o: on(i, 31, 32) ? 1 : 0 }, { t: 0.5 });
      [0, 1, 2, 3, 4].forEach(function (j) { A.set("st" + j, { sy: i === 32 || (i === 31 && j === 0) ? 1 : 0.05 }, { t: 0.6, dl: i === 32 ? j * 0.15 : 0, e: "back" }); });

      A.chip(["FIXING CHECK-IN", "4/10: CAN'T IGNORE", "EVERYONE TOGETHER", "WASTE DISCOVERED", "AN IMPROVEMENT PROJECT",
        "THE LINE JUMPS", "BETTER FOR GUESTS", "THE PROJECT CLOSES", "THIS IS BPI", "START, GOAL, END",
        "WHO KEEPS WATCHING?", "NOBODY WATCHES", "PEOPLE AND SYSTEMS CHANGE", "THE GAINS FADE", "ANOTHER PROJECT",
        "THE SAWTOOTH TRAP", "A DIFFERENT DECISION", "A NAMED OWNER", "REGULAR CHECKS", "SPOT AND CORRECT",
        "THIS IS BPM", "GOVERNANCE", "BPM CONTAINS BPI", "THINK ABOUT HEALTH", "CRASH DIET = BPI",
        "THE WEIGHT RETURNS", "ROUTINE = BPM", "FOCUSED EFFORT INSIDE", "SAME AT QASR", "GOVERNANCE DECIDES",
        "WEEKS 13 AND 14", "READY FOR MORE?", "HOW MATURE?"][i]);
    }

    REG.O4a = makeScene("O4a", {
      n: N, title: "Check-in quality over the years: one-off improvement projects decay into a sawtooth while managed processes stay high",
      bg: "#f2f6f4", halo: "#f4f8f6", draw: draw, run: run
    });
  })();

})();

// ============================================================
// OPER621 · WEEK 1 · ANIMATED TEACHING SCENES · PART 3 of 3
// File: w01-claude-part3.js   Scenes: O4b, O4c, W1OUTRO
// Standalone: registers its own scenes on window.VL_SCENES and appends
// its own scoped rules to <style id="vl-sc-w01">. Parts may be loaded in
// any order or concatenated. Contract per scene: { build(el), step(i, n), reset() }.
// GSAP (window.gsap) is used when present; CSS transitions otherwise.
// prefers-reduced-motion: every state is applied instantly, no ambient loops.
// ============================================================
(function () {
  "use strict";
  var W = window;
  W.VL_SCENES = W.VL_SCENES || {};
  var REG = W.VL_SCENES;
  var VW = 400, VH = 320;
  var C = {
    navy: "#1f4e79", deep: "#16324d", ink: "#1b2a3a", orange: "#c0502a",
    coral: "#e0734f", green: "#317c61", mint: "#6fbf9b", gold: "#d6a45e",
    sun: "#f2c46d", paper: "#fbf8f1", cream: "#f3ecdf", blue: "#dbe7f2",
    sky: "#eaf2f8", mute: "#8ba9bf", slate: "#5b7590", white: "#ffffff",
    night: "#13263b", violet: "#6b5ca5", red: "#b8402a", skin: "#f0c8a2",
    hair: "#3b2a22", wood: "#b98a5a", sand: "#efe1c4"
  };
  var UIDN = 0;

  function reduced() {
    try { return !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    catch (e) { return false; }
  }
  function gsapLib() {
    var g = W.gsap;
    return g && typeof g.to === "function" && typeof g.set === "function" ? g : null;
  }
  function esc(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function on(i, a, b) { return i >= a && i <= (b == null ? 1e9 : b); }
  function rnd(seed) {
    var s = seed % 2147483647; if (s <= 0) s += 2147483646;
    return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  }

  /* ---------- SVG string builders ---------- */
  function at(o) {
    var s = "";
    if (o) for (var k in o) if (o[k] != null && o[k] !== false) s += " " + k + '="' + esc(o[k]) + '"';
    return s;
  }
  function R(x, y, w, h, rx, fill, o) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx || 0) + '" fill="' + (fill || "none") + '"' + at(o) + "/>";
  }
  function Ci(cx, cy, r, fill, o) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (fill || "none") + '"' + at(o) + "/>";
  }
  function El(cx, cy, rx, ry, fill, o) {
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + (fill || "none") + '"' + at(o) + "/>";
  }
  function P(d, stroke, sw, o) {
    return '<path d="' + d + '" fill="none" stroke="' + stroke + '" stroke-width="' + (sw || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + at(o) + "/>";
  }
  function F(d, fill, o) { return '<path d="' + d + '" fill="' + fill + '"' + at(o) + "/>"; }
  function L(x1, y1, x2, y2, stroke, sw, o) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + stroke + '" stroke-width="' + (sw || 2) + '" stroke-linecap="round"' + at(o) + "/>";
  }
  /* Text label. Class "lb" adds a legibility halo. */
  function T(x, y, str, size, fill, o) {
    var a = { "text-anchor": "middle", "class": "lb" };
    if (o) for (var k in o) a[k] = o[k];
    return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 17) + '" fill="' + (fill || C.ink) + '"' + at(a) + ">" + esc(str) + "</text>";
  }
  function TK(k, x, y, str, size, fill, o) {
    var a = { "data-k": k }; if (o) for (var q in o) a[q] = o[q];
    return T(x, y, str, size, fill, a);
  }
  function G(k, inner, o) {
    var a = { "data-k": k }; if (o) for (var q in o) a[q] = o[q];
    return "<g" + at(a) + ">" + inner + "</g>";
  }
  function Gp(inner, o) { return "<g" + at(o) + ">" + inner + "</g>"; }
  function Tr(x, y, inner, s, r) {
    return '<g transform="translate(' + x + " " + y + ")" + (r ? " rotate(" + r + ")" : "") + (s && s !== 1 ? " scale(" + s + ")" : "") + '">' + inner + "</g>";
  }
  /* Keyed drawable stroke: animate with {draw: 0..1}. */
  function PD(k, d, stroke, sw, o) {
    var a = { "data-k": k, pathLength: 1, "stroke-dasharray": "1 2", "stroke-dashoffset": 1.05 };
    if (o) for (var q in o) a[q] = o[q];
    return P(d, stroke, sw, a);
  }
  /* Pill label. Width is fitted to the rendered text after mounting. */
  function pill(k, x, y, str, o) {
    o = o || {};
    var size = o.size || 16, h = size + 14, fill = o.fill || C.navy, tc = o.color || C.white;
    var w = Math.max(40, str.length * size * 0.66 + 26);
    return '<g data-k="' + k + '" data-pill="' + (o.anchor || "middle") + '" data-px="' + x + '"' + at(o.attrs) + ">" +
      R(x - w / 2, y - h / 2, w, h, h / 2, fill, o.stroke ? { stroke: o.stroke, "stroke-width": 2 } : null) +
      '<text x="' + x + '" y="' + (y + size * 0.36) + '" font-size="' + size + '" fill="' + tc + '" text-anchor="middle">' + esc(str) + "</text></g>";
  }
  function check(x, y, s, color, sw) {
    s = s || 1;
    return P("M" + (x - 8 * s) + " " + y + " l" + 6 * s + " " + 6 * s + " l" + 11 * s + " " + -13 * s, color || C.green, sw || 3.5);
  }
  function cross(x, y, s, color, sw) {
    s = s || 1; var d = 7 * s;
    return P("M" + (x - d) + " " + (y - d) + " L" + (x + d) + " " + (y + d) + " M" + (x + d) + " " + (y - d) + " L" + (x - d) + " " + (y + d), color || C.orange, sw || 3.5);
  }
  /* A friendly character, feet at (x,y). opts.k adds keyed mouths k-sm / k-fr. */
  function fig(x, y, s, body, opts) {
    opts = opts || {};
    var mouths;
    if (opts.k) {
      mouths = G(opts.k + "-sm", P("M-3.5 -41 Q0 -37.5 3.5 -41", C.ink, 1.6)) +
        G(opts.k + "-fr", P("M-3.5 -38.5 Q0 -42 3.5 -38.5", C.ink, 1.6), { opacity: 0 });
    } else {
      mouths = opts.mood === "frown" ? P("M-3.5 -38.5 Q0 -42 3.5 -38.5", C.ink, 1.6) :
        P("M-3.5 -41 Q0 -37.5 3.5 -41", C.ink, 1.6);
    }
    var hair = opts.hair === "long" ? F("M-11 -44 Q-12 -60 0 -59 Q12 -60 11 -44 L11 -33 Q8 -40 8 -48 Q0 -52 -8 -48 Q-8 -40 -11 -33 Z", opts.hc || C.hair) :
      F("M-10 -48 Q-9.5 -59 0 -58.5 Q10 -59 10 -48 Q5 -53 -10 -48 Z", opts.hc || C.hair);
    return Tr(x, y,
      F("M-14 0 L-14 -23 Q-14 -35 0 -35 Q14 -35 14 -23 L14 0 Z", body || C.navy) +
      (opts.badge ? Ci(7, -24, 4, opts.badge) : "") +
      Ci(0, -46, 10.5, opts.skin || C.skin) + hair +
      Ci(-3.6, -46.5, 1.6, C.ink) + Ci(3.6, -46.5, 1.6, C.ink) + mouths, s);
  }

  /* ---------- Icon library (centred at x,y; s = scale of a 24-unit icon) ---------- */
  var I = {
    bell: function (x, y, s, c) { return Tr(x, y, F("M-10 6 Q-10 -9 0 -9 Q10 -9 10 6 Z", c || C.gold) + R(-12, 6, 24, 3, 1.5, C.ink) + Ci(0, -11, 2.5, C.ink), s); },
    doc: function (x, y, s, c) { return Tr(x, y, R(-9, -12, 18, 24, 2, C.white, { stroke: c || C.navy, "stroke-width": 2 }) + P("M-5 -5 H5 M-5 0 H5 M-5 5 H2", c || C.navy, 1.6), s); },
    money: function (x, y, s, c) { return Tr(x, y, Ci(0, 0, 11, c || C.gold) + P("M3.5 -4.5 Q0 -7 -3.2 -4.8 Q-5.5 -1.8 0 0 Q5.5 1.8 3.2 4.8 Q0 7 -3.5 4.5 M0 -8.5 V8.5", C.white, 2), s); },
    bed: function (x, y, s, c) { return Tr(x, y, R(-12, -2, 24, 8, 2, c || C.navy) + R(-12, -8, 7, 6, 2, C.white, { stroke: c || C.navy, "stroke-width": 1.5 }) + P("M-12 6 V10 M12 6 V10", c || C.navy, 2), s); },
    key: function (x, y, s, c) { return Tr(x, y, Ci(-6, 0, 6, "none", { stroke: c || C.gold, "stroke-width": 3 }) + P("M0 0 H12 M8 0 V5 M11 0 V4", c || C.gold, 3), s); },
    receipt: function (x, y, s, c) { return Tr(x, y, F("M-8 -11 H8 V11 L5 9 L2 11 L-1 9 L-4 11 L-8 9 Z", C.white, { stroke: c || C.navy, "stroke-width": 1.6 }) + P("M-4 -5 H4 M-4 0 H4", c || C.navy, 1.4), s); },
    clock: function (x, y, s, c) { return Tr(x, y, Ci(0, 0, 11, C.white, { stroke: c || C.orange, "stroke-width": 2.5 }) + P("M0 -6 V0 L4 3", c || C.orange, 2), s); },
    phone: function (x, y, s, c) { return Tr(x, y, F("M-9 -6 Q-9 -10 -5 -10 L-3 -10 L-1 -5 L-4 -3 Q-2 3 4 4 L6 1 L10 3 L10 5 Q10 9 6 9 Q-9 8 -9 -6 Z", c || C.navy), s); },
    passport: function (x, y, s, c) { return Tr(x, y, R(-8, -11, 16, 22, 2, c || C.navy) + Ci(0, -2, 4, "none", { stroke: C.gold, "stroke-width": 1.4 }) + P("M-4 6 H4", C.gold, 1.4), s); },
    lock: function (x, y, s, c) { return Tr(x, y, P("M-5 -2 V-6 Q-5 -11 0 -11 Q5 -11 5 -6 V-2", c || C.orange, 2.4) + R(-8, -2, 16, 12, 2, c || C.orange) + Ci(0, 3, 1.8, C.white), s); },
    star: function (x, y, s, c) { return Tr(x, y, F("M0 -11 L3 -3.5 L11 -3.5 L4.5 1.5 L7 9.5 L0 4.5 L-7 9.5 L-4.5 1.5 L-11 -3.5 L-3 -3.5 Z", c || C.sun), s); },
    eye: function (x, y, s, c) { return Tr(x, y, F("M-12 0 Q0 -10 12 0 Q0 10 -12 0 Z", C.white, { stroke: c || C.navy, "stroke-width": 2 }) + Ci(0, 0, 3.5, c || C.navy), s); },
    bulb: function (x, y, s, c) { return Tr(x, y, Ci(0, -3, 8, c || C.sun) + R(-4, 5, 8, 5, 1, C.slate) + P("M0 -15 V-13 M-11 -7 L-9 -6 M11 -7 L9 -6", c || C.sun, 1.6), s); },
    wrench: function (x, y, s, c) { return Tr(x, y, P("M-8 8 L4 -4", c || C.slate, 4) + F("M2 -10 Q10 -12 10 -4 L6 -4 L4 -6 L4 -9 Z", c || C.slate), s); },
    flag: function (x, y, s, c) { return Tr(x, y, P("M-6 11 V-11", C.ink, 2) + F("M-6 -11 L9 -6 L-6 -1 Z", c || C.green), s); },
    mag: function (x, y, s, c) { return Tr(x, y, Ci(-2, -2, 8, C.white, { stroke: c || C.navy, "stroke-width": 3, "fill-opacity": 0.6 }) + P("M4 4 L10 10", c || C.navy, 4), s); },
    hotel: function (x, y, s, c) { return Tr(x, y, R(-9, -12, 18, 24, 1.5, c || C.navy) + R(-5, -8, 3, 3, 0, C.sun) + R(2, -8, 3, 3, 0, C.sun) + R(-5, -2, 3, 3, 0, C.sun) + R(2, -2, 3, 3, 0, C.sun) + R(-2, 6, 4, 6, 0, C.sun), s); },
    coin: function (x, y, s, c) { return Tr(x, y, Ci(0, 0, 8, c || C.gold, { stroke: "#a77b35", "stroke-width": 1.5 }) + P("M0 -4 V4", "#a77b35", 1.6), s); },
    gauge: function (x, y, s, c) { return Tr(x, y, P("M-11 4 A11 11 0 0 1 11 4", c || C.navy, 3) + P("M0 4 L6 -4", C.orange, 2.4) + Ci(0, 4, 2.5, C.ink), s); },
    heart: function (x, y, s, c) { return Tr(x, y, F("M0 8 L-8 0 Q-12 -5 -8 -9 Q-4 -12 0 -7 Q4 -12 8 -9 Q12 -5 8 0 Z", c || C.coral), s); },
    gear: function (x, y, s, c) {
      var d = "", n = 8, r1 = 11, r2 = 8, k;
      for (k = 0; k < n * 2; k++) { var a = k * Math.PI / n, r = k % 2 ? r2 : r1; d += (k ? "L" : "M") + (Math.cos(a) * r).toFixed(1) + " " + (Math.sin(a) * r).toFixed(1) + " "; }
      return Tr(x, y, F(d + "Z", c || C.slate) + Ci(0, 0, 3.5, C.white), s);
    },
    users: function (x, y, s, c) { return Tr(x, y, Ci(-5, -5, 4, c || C.navy) + Ci(5, -5, 4, c || C.navy) + F("M-11 8 Q-11 -1 -5 -1 Q1 -1 1 8 Z", c || C.navy) + F("M-1 8 Q-1 -1 5 -1 Q11 -1 11 8 Z", c || C.navy), s); },
    route: function (x, y, s, c) { return Tr(x, y, P("M-10 8 Q-10 -2 0 0 Q10 2 10 -8", c || C.orange, 2.6, { "stroke-dasharray": "3 3" }) + Ci(-10, 8, 3, C.green) + Ci(10, -8, 3, C.orange), s); },
    stairs: function (x, y, s, c) { return Tr(x, y, F("M-11 10 V4 H-5 V-2 H1 V-8 H7 V-12 H11 V10 Z", c || C.navy), s); },
    chain: function (x, y, s, c) { return Tr(x, y, R(-12, -4, 12, 8, 4, "none", { stroke: c || C.navy, "stroke-width": 2.5 }) + R(2, -4, 12, 8, 4, "none", { stroke: c || C.orange, "stroke-width": 2.5 }) + P("M0 -8 L2 -12 M1 8 L-1 12", C.orange, 1.8), s); },
    plane: function (x, y, s, c) { return Tr(x, y, F("M-12 1 L10 -1 Q14 0 10 1.5 L-12 3 Z M-2 0 L4 -9 L7 -9 L4 0 Z M-2 2 L4 10 L7 10 L4 2 Z M-11 0 L-13 -5 L-10 -5 L-7 0 Z", c || C.white), s); },
    shield: function (x, y, s, c) { return Tr(x, y, F("M0 -11 L9 -7 Q9 6 0 11 Q-9 6 -9 -7 Z", c || C.green) + check(0, 0, 0.55, C.white, 2.2), s); },
    cursor: function (x, y, s, c) { return Tr(x, y, F("M-6 -10 L8 2 L1 3 L5 11 L2 12 L-2 4 L-6 8 Z", c || C.ink, { stroke: C.white, "stroke-width": 1.2 }), s); },
    screen: function (x, y, s, c) { return Tr(x, y, R(-12, -9, 24, 16, 2, c || C.navy) + R(-10, -7, 20, 12, 1, C.sky) + P("M0 7 V11 M-5 11 H5", c || C.navy, 2), s); },
    chat: function (x, y, s, c) { return Tr(x, y, F("M-11 -8 Q-11 -11 -8 -11 H8 Q11 -11 11 -8 V3 Q11 6 8 6 H-2 L-7 11 L-6 6 H-8 Q-11 6 -11 3 Z", c || C.navy), s); },
    pencil: function (x, y, s, c) { return Tr(x, y, F("M-9 9 L-7 3 L5 -9 L9 -5 L-3 7 Z", c || C.gold, { stroke: C.ink, "stroke-width": 1.2 }), s); },
    trophy: function (x, y, s, c) { return Tr(x, y, F("M-7 -10 H7 V-3 Q7 4 0 4 Q-7 4 -7 -3 Z", c || C.gold) + P("M0 4 V8 M-5 10 H5", c || C.gold, 2.5) + P("M-7 -7 Q-11 -7 -10 -3 Q-9 0 -6 0 M7 -7 Q11 -7 10 -3 Q9 0 6 0", c || C.gold, 1.6), s); },
    box: function (x, y, s, c) { return Tr(x, y, R(-10, -8, 20, 16, 2, c || C.wood) + P("M-10 -2 H10 M0 -8 V-2", "#8a6340", 1.5), s); },
    van: function (x, y, s, c) { return Tr(x, y, R(-13, -7, 17, 12, 2, c || C.navy) + F("M4 -4 H9 L13 1 V5 H4 Z", c || C.navy) + Ci(-7, 6, 3, C.ink) + Ci(8, 6, 3, C.ink), s); },
    rocket: function (x, y, s, c) { return Tr(x, y, F("M0 -13 Q7 -6 6 6 H-6 Q-7 -6 0 -13 Z", c || C.coral) + Ci(0, -3, 2.6, C.white) + F("M-6 2 L-10 9 L-6 7 Z M6 2 L10 9 L6 7 Z", C.navy) + F("M-3 7 L0 14 L3 7 Z", C.sun), s); },
    steth: function (x, y, s, c) { return Tr(x, y, P("M-7 -11 V-3 Q-7 4 0 4 Q7 4 7 -3 V-11 M0 4 V7 Q0 11 5 11 Q9 11 9 7", c || C.navy, 2.2) + Ci(9, 5, 3, C.orange), s); },
    car: function (x, y, s, c) { return Tr(x, y, F("M-13 3 L-11 -3 Q-9 -8 -4 -8 H4 Q9 -8 11 -3 L13 3 V7 H-13 Z", c || C.coral) + R(-7, -6, 14, 5, 1, C.sky) + Ci(-7, 7, 3, C.ink) + Ci(7, 7, 3, C.ink), s); },
    pc: function (x, y, s, c) { return Tr(x, y, R(-11, -9, 22, 15, 2, c || C.slate) + R(-9, -7, 18, 11, 1, "#c9d3dc") + R(-4, 6, 8, 3, 0, c || C.slate) + R(-8, 9, 16, 2, 1, c || C.slate), s); }
  };

  /* ---------- Scene runtime ---------- */
  var EASE_CSS = { out: "cubic-bezier(.16,1,.3,1)", io: "cubic-bezier(.65,0,.35,1)", back: "cubic-bezier(.34,1.56,.64,1)", lin: "linear", in: "cubic-bezier(.55,0,1,.45)" };
  var EASE_GS = { out: "power3.out", io: "power2.inOut", back: "back.out(1.6)", lin: "none", in: "power2.in" };

  function baseCSS(id, bg, halo) {
    var r = ".vls-w01-" + id;
    return r + "{position:relative;display:block;width:100%;height:100%;min-height:200px;overflow:hidden;background:" + bg + ";contain:layout paint;-webkit-user-select:none;user-select:none;--vh:" + halo + "}" +
      r + ">svg{position:absolute;left:0;top:0;width:100%;height:100%;display:block;overflow:hidden}" +
      r + " text{font-family:inherit;font-weight:700;letter-spacing:.02em;dominant-baseline:auto}" +
      r + " .lb{paint-order:stroke fill;stroke:var(--vh);stroke-width:4.5px;stroke-linejoin:round}" +
      r + " .lb.hl{stroke:#fbf8f1}" + r + " .lb.hd{stroke:#13263b}" + r + " .lb.hn{stroke:none}" +
      r + " [data-k]{transform-box:view-box}" +
      r + " .vp{animation:vls-w01-pop .45s ease-out both}" +
      r + " .a-spin{transform-box:fill-box;transform-origin:center;animation:vls-w01-spin 6s linear infinite}" +
      r + " .a-bob{transform-box:fill-box;transform-origin:center;animation:vls-w01-bob 2.6s ease-in-out infinite}" +
      r + " .a-pulse{transform-box:fill-box;transform-origin:center;animation:vls-w01-pulse 1.8s ease-in-out infinite}" +
      r + " .a-twinkle{animation:vls-w01-twinkle 3s ease-in-out infinite}" +
      r + " .a-flow{animation:vls-w01-flow 1.2s linear infinite}" +
      r + " .a-flip{transform-box:fill-box;transform-origin:center;animation:vls-w01-flip .32s ease-in-out both}" +
      "@keyframes vls-w01-pop{from{opacity:.15}to{opacity:1}}" +
      "@keyframes vls-w01-spin{to{transform:rotate(360deg)}}" +
      "@keyframes vls-w01-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}" +
      "@keyframes vls-w01-pulse{0%,100%{transform:scale(1);opacity:.9}50%{transform:scale(1.12);opacity:.55}}" +
      "@keyframes vls-w01-twinkle{0%,100%{opacity:.9}50%{opacity:.3}}" +
      "@keyframes vls-w01-flow{to{stroke-dashoffset:-16}}" +
      "@keyframes vls-w01-flip{0%{transform:scaleY(1)}50%{transform:scaleY(.04)}100%{transform:scaleY(1)}}" +
      "@media (prefers-reduced-motion: reduce){" + r + " *{animation:none!important;transition:none!important}}";
  }
  function addCSS(key, css) {
    var d = W.document, st = d.getElementById("vl-sc-w01");
    if (!st) { st = d.createElement("style"); st.id = "vl-sc-w01"; (d.head || d.documentElement).appendChild(st); }
    var flag = "data-vls-" + key;
    if (st.getAttribute(flag)) return;
    st.setAttribute(flag, "1");
    st.appendChild(d.createTextNode(css));
  }

  function chipMarkup(color) {
    return G("chip", R(12, 10, 160, 30, 15, C.white, { "data-k": "chipR", stroke: color || C.navy, "stroke-width": 1.5, "fill-opacity": 0.94 }) +
      Ci(28, 25, 5, color || C.orange) +
      '<text data-k="chipT" x="40" y="31" font-size="16" fill="' + C.ink + '" text-anchor="start"> </text>');
  }

  /* Place a positioned child (<g data-pos>) of keyed group k at (x,y). */
  function placeAt(els, k, x, y) {
    els(k).forEach(function (g) { var p = g.querySelector("[data-pos]"); if (p) p.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ")"); });
  }
  function bboxOf(els, k) { var e = els(k)[0]; if (!e) return null; try { return e.getBBox(); } catch (x) { return null; } }
  function Pos(inner) { return '<g data-pos="1">' + inner + "</g>"; }

  function makeScene(id, cfg) {
    var S = { root: null, svg: null, keys: {}, timers: [], rafs: [], ro: null, cur: -1, chip: "", uid: "" };
    var Lm = cfg.n;

    function els(k) {
      if (!S.root) return [];
      var c = S.keys[k];
      if (!c) { c = Array.prototype.slice.call(S.root.querySelectorAll('[data-k="' + k + '"]')); S.keys[k] = c; }
      return c;
    }
    function clearAsync() {
      S.timers.forEach(function (t) { clearTimeout(t); }); S.timers = [];
      S.rafs.forEach(function (r) { cancelAnimationFrame(r); }); S.rafs = [];
      var g = gsapLib(); if (g && S.root && g.killTweensOf) { try { g.killTweensOf(S.root.querySelectorAll("[data-k]")); } catch (e) { } }
    }
    function fit() {
      if (!S.root || !S.svg) return;
      var r = S.root.getBoundingClientRect(), w = r.width, h = r.height;
      var a = (w > 8 && h > 8) ? w / h : VW / VH;
      a = clamp(a, 0.55, 3.2);
      var vx, vy, vw, vh;
      if (a >= VW / VH) { vh = VH; vw = VH * a; vx = (VW - vw) / 2; vy = 0; }
      else { vw = VW; vh = VW / a; vx = 0; vy = (VH - vh) / 2; }
      S.svg.setAttribute("viewBox", vx.toFixed(1) + " " + vy.toFixed(1) + " " + vw.toFixed(1) + " " + vh.toFixed(1));
      S.root.setAttribute("data-shape", a > 1.55 ? "wide" : a < 1 ? "tall" : "mid");
    }
    function fitPill(g) {
      var t = g.querySelector("text"), rc = g.querySelector("rect");
      if (!t || !rc) return;
      var len = 0; try { len = t.getComputedTextLength(); } catch (e) { }
      if (!(len > 0)) return;
      var fs = parseFloat(t.getAttribute("font-size")) || 16, h = parseFloat(rc.getAttribute("height")) || 30;
      var w = len + Math.max(22, fs * 1.5), x = parseFloat(g.getAttribute("data-px")) || 0, an = g.getAttribute("data-pill");
      var x0 = an === "start" ? x : an === "end" ? x - w : x - w / 2;
      rc.setAttribute("x", x0.toFixed(1)); rc.setAttribute("width", w.toFixed(1));
      t.setAttribute("x", (x0 + w / 2).toFixed(1));
      if (h) rc.setAttribute("rx", h / 2);
    }
    function fitChip() {
      var t = els("chipT")[0], rc = els("chipR")[0]; if (!t || !rc) return;
      var len = 0; try { len = t.getComputedTextLength(); } catch (e) { }
      if (len > 0) rc.setAttribute("width", (len + 44).toFixed(1));
    }
    function vOf(el) {
      if (el.__v) return el.__v;
      var v = { x: 0, y: 0, s: 1, sx: null, sy: null, r: 0, ox: 0, oy: 0 };
      var o = el.getAttribute("data-o");
      if (o) { var p = o.split(/[ ,]+/); v.ox = +p[0] || 0; v.oy = +p[1] || 0; }
      else { try { var b = el.getBBox(); v.ox = b.x + b.width / 2; v.oy = b.y + b.height / 2; } catch (e) { } }
      el.__v = v; return v;
    }

    function animator(instant) {
      var g = gsapLib(), inst = instant || reduced();
      function setEl(el, p, o) {
        o = o || {};
        var dur = o.t != null ? o.t : 0.8, dl = o.dl || 0, ez = o.e || "out";
        var hasT = false, v = vOf(el);
        ["x", "y", "s", "sx", "sy", "r"].forEach(function (k) { if (p[k] != null) { v[k] = p[k]; hasT = true; } });
        if (p.ox != null) { v.ox = p.ox; v.oy = p.oy; }
        var sx = v.sx != null ? v.sx : v.s, sy = v.sy != null ? v.sy : v.s;
        if (g) {
          var vars = {};
          if (hasT) { vars.x = v.x; vars.y = v.y; vars.rotation = v.r; vars.scaleX = sx; vars.scaleY = sy; vars.svgOrigin = v.ox + " " + v.oy; }
          if (p.o != null) vars.opacity = p.o;
          if (p.draw != null) vars.strokeDashoffset = (1.05 - p.draw * 1.05);
          if (inst) { g.set(el, vars); }
          else { vars.duration = dur; vars.delay = dl; vars.ease = EASE_GS[ez] || ez; vars.overwrite = "auto"; g.to(el, vars); }
          paint(el, p, function (t, pv) {
            if (inst) { g.set(t, pv); return; }
            pv.duration = dur; pv.delay = dl; pv.ease = EASE_GS[ez] || ez; pv.overwrite = "auto"; g.to(t, pv);
          });
          return;
        }
        var props = [];
        if (hasT) props.push("transform");
        if (p.o != null) props.push("opacity");
        if (p.draw != null) props.push("stroke-dashoffset");
        var selfPaint = !(el.tagName && el.tagName.toLowerCase() === "g");
        if (selfPaint && p.fill != null) props.push("fill");
        if (selfPaint && p.stroke != null) props.push("stroke");
        el.style.transition = inst ? "none" : props.map(function (q) { return q + " " + dur + "s " + (EASE_CSS[ez] || ez) + " " + dl + "s"; }).join(",");
        if (hasT) {
          el.style.transformOrigin = v.ox + "px " + v.oy + "px";
          el.style.transform = "translate(" + v.x.toFixed(2) + "px," + v.y.toFixed(2) + "px) rotate(" + v.r + "deg) scale(" + sx + "," + sy + ")";
        }
        if (p.o != null) el.style.opacity = p.o;
        if (p.draw != null) el.style.strokeDashoffset = (1.05 - p.draw * 1.05).toFixed(3);
        paint(el, p, function (t, pv) {
          if (t !== el) t.style.transition = inst ? "none" : "fill " + dur + "s ease " + dl + "s, stroke " + dur + "s ease " + dl + "s";
          if (pv.fill != null) t.style.fill = pv.fill;
          if (pv.stroke != null) t.style.stroke = pv.stroke;
        });
      }
      /* Recolour: a keyed <g> recolours its [data-paint] children; other elements recolour themselves. */
      function paint(el, p, fn) {
        if (p.fill == null && p.stroke == null) return;
        var pv = {}; if (p.fill != null) pv.fill = p.fill; if (p.stroke != null) pv.stroke = p.stroke;
        var tg = el.tagName && el.tagName.toLowerCase() === "g" ? el.querySelectorAll("[data-paint]") : [el];
        Array.prototype.forEach.call(tg, function (t) { fn(t, pv); });
      }
      var A = {
        inst: inst,
        el: function (k) { return els(k)[0] || null; },
        set: function (k, p, o) { els(k).forEach(function (el) { setEl(el, p, o); }); return A; },
        show: function (k, yes, o) { return A.set(k, { o: yes ? 1 : 0 }, o || { t: 0.5 }); },
        text: function (k, str) {
          els(k).forEach(function (el) {
            var t = el.tagName && el.tagName.toLowerCase() === "text" ? el : el.querySelector("text");
            if (!t || t.textContent === str) return;
            t.textContent = str;
            var pg = el.getAttribute && el.getAttribute("data-pill") ? el : (t.parentNode && t.parentNode.getAttribute && t.parentNode.getAttribute("data-pill") ? t.parentNode : null);
            if (pg) fitPill(pg);
            if (!inst) { t.classList.remove("vp"); void t.getBoundingClientRect(); t.classList.add("vp"); }
          });
          return A;
        },
        attr: function (k, p, o) {
          o = o || {}; var dur = (o.t != null ? o.t : 0.8) * 1000, dl = (o.dl || 0) * 1000;
          els(k).forEach(function (el) {
            var from = {}, keys = Object.keys(p);
            keys.forEach(function (q) { from[q] = parseFloat(el.getAttribute(q)) || 0; });
            if (inst || dur <= 0) { keys.forEach(function (q) { el.setAttribute(q, p[q]); }); return; }
            var t0 = null;
            function tick(ts) {
              if (t0 === null) t0 = ts + dl;
              var u = clamp((ts - t0) / dur, 0, 1), e = 1 - Math.pow(1 - u, 3);
              keys.forEach(function (q) { el.setAttribute(q, (from[q] + (p[q] - from[q]) * e).toFixed(2)); });
              if (u < 1) S.rafs.push(requestAnimationFrame(tick));
            }
            S.rafs.push(requestAnimationFrame(tick));
          });
          return A;
        },
        count: function (k, to, o) {
          o = o || {}; var fmt = o.fmt || function (v) { return String(Math.round(v)); }, dur = (o.t != null ? o.t : 1) * 1000;
          els(k).forEach(function (el) {
            var from = el.__n != null ? el.__n : 0; el.__n = to;
            if (inst || from === to) { el.textContent = fmt(to); return; }
            var t0 = null;
            function tick(ts) {
              if (t0 === null) t0 = ts;
              var u = clamp((ts - t0) / dur, 0, 1), e = 1 - Math.pow(1 - u, 3);
              el.textContent = fmt(from + (to - from) * e);
              if (u < 1) S.rafs.push(requestAnimationFrame(tick));
            }
            S.rafs.push(requestAnimationFrame(tick));
          });
          return A;
        },
        later: function (ms, fn) { if (inst) fn(); else S.timers.push(setTimeout(fn, ms)); return A; },
        /* Travel through offsets [[x,y],...]; o.t = total duration. */
        route: function (k, pts, o) {
          o = o || {}; var total = o.t || 1.6, n = pts.length;
          if (inst || n < 2) { A.set(k, { x: pts[n - 1][0], y: pts[n - 1][1] }, { t: 0 }); return A; }
          var leg = total / (n - 1);
          A.set(k, { x: pts[0][0], y: pts[0][1] }, { t: 0.25, e: "io" });
          for (var j = 1; j < n; j++) (function (j) {
            A.later(250 + (j - 1) * leg * 1000, function () { A.set(k, { x: pts[j][0], y: pts[j][1], r: pts[j][2] != null ? pts[j][2] : undefined }, { t: leg, e: o.e || "lin" }); });
          })(j);
          return A;
        },
        flip: function (k) {
          if (inst) return A;
          els(k).forEach(function (el) { el.classList.remove("a-flip"); void el.getBoundingClientRect(); el.classList.add("a-flip"); });
          return A;
        },
        chip: function (str) {
          if (S.chip !== str) {
            S.chip = str; A.text("chipT", str); fitChip();
            if (S.svg) S.svg.setAttribute("aria-label", cfg.title + ": " + str);
          }
          return A;
        }
      };
      return A;
    }

    function apply(i, instant) {
      if (!S.root) return;
      clearAsync();
      var A = animator(instant);
      S.cur = i;
      try { cfg.run(i, A, S); } catch (e) { if (W.console) console.warn("VL scene " + id + " step failed:", e); }
    }
    function mapI(i, n) {
      i = Number(i); n = Number(n);
      if (!isFinite(i)) i = 0;
      if (!isFinite(n) || n < 1) n = Lm;
      i = clamp(Math.floor(i), 0, Math.max(0, Math.floor(n) - 1));
      if (Math.floor(n) === Lm) return i;
      return n <= 1 ? 0 : Math.round(i * (Lm - 1) / (Math.floor(n) - 1));
    }

    addCSS("scene-" + id, baseCSS(id, cfg.bg || C.paper, cfg.halo || C.paper) + (cfg.css ? cfg.css(".vls-w01-" + id) : ""));

    return {
      build: function (el) {
        if (!el || !el.appendChild) return;
        clearAsync();
        if (S.ro) { try { S.ro.disconnect(); } catch (e) { } S.ro = null; }
        S.keys = {}; S.chip = ""; S.uid = "w01" + id + (++UIDN);
        var root = W.document.createElement("div");
        root.className = "vls-w01-" + id;
        root.setAttribute("data-vls-scene", id);
        root.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + VW + " " + VH + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(cfg.title) + '" focusable="false">' +
          cfg.draw(S.uid) + chipMarkup(cfg.chipColor) + "</svg>";
        if (typeof el.replaceChildren === "function") el.replaceChildren(root);
        else { while (el.firstChild) el.removeChild(el.firstChild); el.appendChild(root); }
        S.root = root; S.svg = root.querySelector("svg");
        Array.prototype.forEach.call(root.querySelectorAll("[data-pill]"), fitPill);
        fit();
        if (cfg.layout) { try { cfg.layout(els); } catch (e) { } }
        if (W.ResizeObserver) {
          S.ro = new ResizeObserver(function () { if (!S.root || !S.root.isConnected) { if (S.ro) S.ro.disconnect(); return; } fit(); });
          S.ro.observe(root);
        }
        apply(0, true);
      },
      step: function (i, n) { if (S.root) apply(mapI(i, n), false); },
      reset: function () { if (S.root) apply(0, true); }
    };
  }

  /* ==========================================================
     O4b · "THE VARIANCE CLOUD"
     Each dot is one guest's check-in, placed by how long it took. Maturity
     becomes visible as the behaviour of the cloud: scattered by whoever is
     on shift (Initial), tightened by a written procedure (Repeatable),
     identical across 14 hotels (Defined), held inside a target band
     (Managed), and drifting faster as staff improve it (Optimising).
     A rocket strapped to the scattered cloud shows why maturity is a
     diagnosis, not a score.
     Technique: particle cloud morphing between data-driven states.
     32 narration moments.
     ========================================================== */
  (function () {
    var N = 32, ND = 42, AY = 262;
    var r = rnd(4242), base = [];
    for (var j = 0; j < ND; j++) base.push({ a: r(), b: r(), c: (r() + r() + r() - 1.5) / 1.5, d: (r() + r() + r() - 1.5) / 1.5 });
    var HC = []; for (var h = 0; h < 14; h++) HC.push(110 + r() * 190);
    function yRand(p) { return 108 + p.b * 140; }
    function pos(state, j) {
      var p = base[j], h = Math.floor(j / 3), q = j % 3;
      switch (state) {
        case "wide": return [62 + p.a * 300, yRand(p)];
        case "split": return q === 0 ? [72 + p.a * 100, yRand(p)] : [210 + p.a * 160, yRand(p)];
        case "rep": return [205 + p.c * 44, yRand(p)];
        case "hotels": return [HC[h] + (q - 1) * 10, 108 + h * 10.6];
        case "defined": return [205 + (q - 1) * 10, 108 + h * 10.6];
        case "managed": return [205 + p.c * 24, yRand(p)];
        case "opt1": return [178 + p.c * 20, yRand(p)];
        case "opt2": return [150 + p.c * 14, yRand(p)];
        case "chaos": return [clamp(40 + p.a * 340 + p.c * 30, 30, 390), j % 5 === 0 ? 236 + p.b * 14 : 96 + p.b * 150];
        case "calm": return [90 + p.a * 240, yRand(p)];
        case "cmp": return j < 21 ? [52 + base[j].a * 136, yRand(p)] : [300 + p.c * 16, yRand(p)];
      }
      return [200, 170];
    }
    function stateAt(i) {
      if (i <= 3) return "wide";
      if (i <= 5) return "split";
      if (i === 6) return "split";
      if (i <= 8) return "rep";
      if (i === 9 || i === 10) return "hotels";
      if (i === 11) return "defined";
      if (i <= 16) return "managed";
      if (i === 17) return "opt1";
      if (i === 18) return "opt2";
      if (i === 19) return "wide";
      if (i === 20) return "chaos";
      if (i <= 24) return "calm";
      if (i <= 29) return "cmp";
      return "wide";
    }
    function draw(u) {
      var dots = "";
      for (var k = 0; k < ND; k++) {
        var p0 = pos("wide", k);
        dots += G("d" + k, Ci(p0[0], p0[1], 5.5, C.navy, { stroke: C.white, "stroke-width": 1.2, "data-paint": 1 }), { "data-o": p0[0].toFixed(1) + " " + p0[1].toFixed(1) });
      }
      var stair = [0, 1, 2, 3, 4].map(function (k) { return G("lv" + k, R(312 + k * 16, 44 - (k + 1) * 6, 13, (k + 1) * 6, 2, "#c9d3de", { "data-paint": 1 })); }).join("");
      return R(-900, -900, 2200, 2200, 0, "#f5f3ee") +
        R(-900, 96, 2200, 160, 0, "#ece8df") +
        L(-900, AY, 1300, AY, C.ink, 2) + P("M372 " + (AY - 6) + " L384 " + AY + " L372 " + (AY + 6), C.ink, 2) +
        G("axisL", T(40, 286, "QUICK CHECK-IN", 15, C.green, { "text-anchor": "start" }) + T(384, 286, "SLOW CHECK-IN", 15, C.red, { "text-anchor": "end" })) +
        stair +
        G("people", fig(40, 92, 0.6, C.navy, {}) + fig(72, 92, 0.6, C.orange, { hair: "long" }) + fig(104, 92, 0.6, C.orange, {}), { opacity: 0 }) +
        G("cape", F("M31 70 Q22 90 30 96 L40 88 L50 96 Q58 90 49 70 Z", C.red, { opacity: 0.85 }) + I.star(40, 52, 0.55, C.sun), { opacity: 0 }) +
        G("check3", [[250, I.route(0, 0, 0.8)], [290, I.doc(0, 0, 0.8)], [330, I.gauge(0, 0, 0.8)]].map(function (p) { return R(p[0] - 15, 62, 30, 30, 6, C.white, { stroke: C.slate, "stroke-width": 1.5 }) + Tr(p[0], 77, p[1]) + T(p[0] + 18, 70, "?", 14, C.orange); }).join(""), { opacity: 0 }) +
        G("docW", R(186, 54, 38, 46, 4, C.white, { stroke: C.navy, "stroke-width": 2 }) + PD("dw", "M194 66 H216 M194 75 H214 M194 84 H216 M194 92 H208", C.navy, 2)) +
        G("stamp", R(160, 86, 90, 28, 5, C.navy) + T(205, 106, "ONE METHOD", 15, C.white, { "class": "lb hn" }), { opacity: 0, "data-o": "205 100" }) +
        G("band", L(170, 96, 170, AY - 2, C.green, 2.5, { "stroke-dasharray": "6 5" }) + L(240, 96, 240, AY - 2, C.green, 2.5, { "stroke-dasharray": "6 5" }) + R(170, 96, 70, 166, 0, C.green, { opacity: 0.07 }), { "data-o": "205 180" }) +
        pill("pBand", 205, 80, "TARGET BAND", { fill: C.green, size: 15, attrs: { opacity: 0 } }) +
        G("alert", Ci(0, 0, 14, "none", { stroke: C.red, "stroke-width": 3 }), { opacity: 0, "data-o": "0 0" }) +
        G("bulbs", [[140, 84], [205, 78], [270, 84]].map(function (p, k) { return G("bu" + k, I.bulb(p[0], p[1], 1.1), { "data-o": p[0] + " " + p[1] }); }).join(""), { opacity: 0 }) +
        G("rocket", I.rocket(0, 0, 2), { opacity: 0, "data-o": "0 0" }) +
        G("boom", Ci(220, 176, 60, "none", { stroke: C.red, "stroke-width": 4, "stroke-dasharray": "10 8" }), { opacity: 0, "data-o": "220 176" }) +
        pill("pTop", 205, 80, "NOT READY", { fill: C.red, attrs: { opacity: 0 } }) +
        G("found", I.doc(54, 66, 1) + P("M84 58 A10 10 0 1 1 82 74", C.green, 3) + P("M78 54 L85 58 L80 64", C.green, 2.5), { opacity: 0 }) +
        G("learner", I.car(330, 74, 1.5, C.coral) + R(300, 58, 20, 20, 3, C.white, { stroke: C.red, "stroke-width": 2 }) + T(310, 74, "L", 16, C.red, { "class": "lb hn" }), { opacity: 0 }) +
        G("steth", I.steth(205, 72, 1.6), { opacity: 0 }) +
        pill("okFit", 108, 80, "DOCUMENT IT", { fill: C.green, size: 15, attrs: { opacity: 0 } }) +
        pill("noFit", 300, 80, "ADVANCED METHODS", { fill: C.red, size: 15, attrs: { opacity: 0 } }) +
        G("divider", L(232, 96, 232, AY + 30, C.ink, 2, { "stroke-dasharray": "5 5" }), { opacity: 0 }) +
        pill("cmpL", 116, 80, "CHECK-IN PROCESS", { fill: C.navy, size: 15, attrs: { opacity: 0 } }) +
        pill("cmpR", 316, 80, "BILLING PROCESS", { fill: C.green, size: 15, attrs: { opacity: 0 } }) +
        G("bandR", L(284, 96, 284, AY - 2, C.green, 2, { "stroke-dasharray": "5 4" }) + L(316, 96, 316, AY - 2, C.green, 2, { "stroke-dasharray": "5 4" }), { opacity: 0 }) +
        pill("lvL", 116, 290, "LEVEL 1", { fill: C.navy, size: 15, attrs: { opacity: 0 } }) +
        pill("lvR", 316, 290, "LEVEL 4", { fill: C.green, size: 15, attrs: { opacity: 0 } }) +
        G("mag", I.mag(0, 0, 2.4, C.ink), { opacity: 0, "data-o": "0 0" }) +
        G("claim", G("claimT", R(64, 156, 104, 30, 15, C.white, { stroke: C.navy, "stroke-width": 2 }) + T(116, 176, "MANAGED?", 15, C.navy, { "class": "lb hn" })) +
          R(84, 194, 64, 36, 6, "none", { stroke: C.slate, "stroke-width": 2, "stroke-dasharray": "4 4" }) + I.doc(116, 212, 0.8, C.mute), { opacity: 0 }) +
        G("noEv", Tr(116, 190, R(-62, -16, 124, 32, 6, "none", { stroke: C.red, "stroke-width": 3 }) + T(0, 7, "NO EVIDENCE", 16, C.red, { "class": "lb hn" }), 1, -10), { opacity: 0, "data-o": "116 190" }) +
        pill("pNext", 205, 80, "NEXT STEP: DOCUMENT", { fill: C.green, attrs: { opacity: 0 } }) +
        PD("road", "M300 176 C330 140 360 210 400 180 C430 160 450 170 470 172", C.orange, 4, { "stroke-dasharray": "1 2" }) +
        G("roadQ", T(370, 150, "?", 26, C.orange), { opacity: 0 }) +
        dots;
    }

    function level(i) {
      if (i <= 4) return 0;
      if (i <= 7) return i >= 5 ? 1 : 0;
      if (i <= 10) return 2;
      if (i <= 13) return 3;
      if (i <= 16) return 4;
      if (i <= 18) return 5;
      if (i <= 24) return 1;
      return 0;
    }
    function run(i, A) {
      var st = stateAt(i), lv = level(i);
      if (i === 5) lv = 1; if (i === 8) lv = 2; if (i === 11) lv = 3; if (i === 14) lv = 4; if (i === 18 || i === 17) lv = i === 18 ? 5 : 4;
      if (i === 6 || i === 7) lv = 1;
      for (var k = 0; k < 5; k++) A.set("lv" + k, { fill: k < lv ? (k === lv - 1 ? C.orange : C.navy) : (i === 2 ? C.sun : "#c9d3de"), sy: i === 2 ? 1.15 : 1 }, { t: 0.4, dl: i === 2 ? k * 0.12 : 0 });

      for (var j = 0; j < ND; j++) {
        var b0 = pos("wide", j), p = pos(st, j), q = j % 3;
        if (i === 13 && j === 7) p = [300, p[1]];
        var col = C.navy;
        if ((st === "wide" || st === "split" || st === "chaos") && i >= 3 && i <= 5) col = q === 0 ? C.navy : C.orange;
        if (st === "cmp" && j >= 21) col = C.green;
        if (st === "chaos") col = j % 5 === 0 ? C.red : C.orange;
        if (i === 13 && j === 7) col = C.red;
        var dl = (st === "hotels" || st === "defined") ? Math.floor(j / 3) * 0.04 : (j % 7) * 0.03;
        A.set("d" + j, { x: p[0] - b0[0], y: p[1] - b0[1], fill: col, o: (st === "chaos" && j % 5 === 0) ? 0.4 : 1 }, { t: i === 20 ? 0.7 : 1.1, dl: dl, e: i === 20 ? "out" : "io" });
      }
      var d7 = pos("managed", 7), b7 = pos("wide", 7);
      A.set("alert", { x: i === 13 ? 300 : d7[0], y: d7[1], o: on(i, 13, 14) ? 1 : 0, s: i === 13 ? 1.2 : 1 }, { t: 1.1, e: "io" });
      A.set("axisL", { o: on(i, 25, 29) ? 0 : 1 }, { t: 0.4 });
      A.set("people", { o: on(i, 3, 5) ? 1 : 0 }, { t: 0.5 });
      A.set("cape", { o: i === 5 ? 1 : 0, s: i === 5 ? 1 : 0.5 }, { t: 0.5, e: "back" });
      A.set("check3", { o: i === 1 ? 1 : 0 }, { t: 0.5 });
      A.set("docW", { o: on(i, 6, 8) || i === 21 ? 1 : 0 }, { t: 0.4 });
      A.set("dw", { draw: on(i, 6, 8) || i === 21 ? 1 : 0 }, { t: 1.2 });
      A.set("stamp", { o: on(i, 10, 11) ? 1 : 0, y: i === 10 ? 0 : i === 11 ? 150 : -20 }, { t: 1.3, e: "io" });
      A.set("band", { o: on(i, 12, 18) ? 1 : 0, x: i === 17 ? -27 : i === 18 ? -55 : 0, sx: i === 18 ? 0.7 : 1 }, { t: 1, e: "io" });
      A.show("pBand", on(i, 12, 14));
      A.set("bulbs", { o: on(i, 15, 18) ? 1 : 0 }, { t: 0.4 });
      [0, 1, 2].forEach(function (k) { A.set("bu" + k, { s: on(i, 16, 18) ? 1 : 0.4, y: on(i, 16, 18) ? 0 : 8 }, { t: 0.5, dl: k * 0.2, e: "back" }); });
      A.set("rocket", i === 19 ? { x: 330, y: 110, r: -40, o: 1 } : i === 20 ? { x: 230, y: 170, r: -10, o: 1, s: 1.1 } : { x: 420, y: 40, r: -40, o: 0 }, { t: 1, e: "io" });
      A.set("boom", { o: i === 20 ? 1 : 0, s: i === 20 ? 1.6 : 0.5 }, { t: 0.7, e: "out" });
      A.show("pTop", i === 20);
      A.show("found", i === 21);
      A.show("learner", i === 22);
      A.text("pTop", "NOT READY");
      A.show("steth", i === 23);
      A.show("okFit", i === 24); A.show("noFit", i === 24);
      A.show("divider", on(i, 25, 29));
      A.show("cmpL", on(i, 25, 29) && i !== 28 && i !== 29); A.show("cmpR", on(i, 26, 29));
      A.show("bandR", on(i, 26, 29));
      A.show("lvL", on(i, 26, 27)); A.show("lvR", on(i, 26, 29));
      A.set("mag", i === 27 ? { x: 316, y: 176, o: 1 } : { x: 116, y: 176, o: i === 26 ? 0 : 0 }, { t: 1.4, e: "io" });
      if (i === 27) A.route("mag", [[116, 176], [116, 176], [316, 176]], { t: 1.6, e: "io" });
      A.set("claim", { o: on(i, 28, 29) ? 1 : 0 }, { t: 0.5 }); A.set("claimT", { o: i === 29 ? 0.1 : 1 }, { t: 0.4, dl: i === 29 ? 0.3 : 0 });
      A.set("noEv", { o: i === 29 ? 1 : 0, s: i === 29 ? 1 : 1.6 }, { t: 0.45, e: "back" });
      A.show("pNext", i === 30);
      A.set("road", { draw: i === 31 ? 1 : 0, o: i === 31 ? 1 : 0 }, { t: 1.4, e: "io" });
      A.show("roadQ", i === 31);

      A.chip(["DIAGNOSE CHECK-IN", "CONSISTENT? WRITTEN? MEASURED?", "FIVE MATURITY LEVELS", "WHO IS ON SHIFT?", "HEROES AND NEWCOMERS",
        "LEVEL 1: INITIAL", "WRITE IT DOWN", "FOLLOWED MOSTLY", "LEVEL 2: REPEATABLE", "14 HOTELS, 14 VERSIONS",
        "ONE COMMON METHOD", "LEVEL 3: DEFINED", "JUDGE THE RESULTS", "A DRIFT IS SPOTTED", "LEVEL 4: MANAGED",
        "BEYOND WATCHING", "STAFF SPOT IMPROVEMENTS", "TEST BETTER WAYS", "LEVEL 5: OPTIMISING", "ADVANCED TOOLS NOW?",
        "NOTHING TO IMPROVE YET", "FOUNDATIONS FIRST", "BASICS BEFORE RACING", "A DIAGNOSIS", "WHAT WILL WORK",
        "EACH PROCESS DIFFERS", "INITIAL VS MANAGED", "ASSESS SEPARATELY", "SHOW THE EVIDENCE", "CLAIMS ARE NOT PROOF",
        "DIAGNOSE HONESTLY", "THE ROAD AHEAD"][i]);
    }

    REG.O4b = makeScene("O4b", {
      n: N, title: "Process maturity as the behaviour of a cloud of check-in times, from scattered to controlled and improving",
      bg: "#f5f3ee", halo: "#f5f3ee", draw: draw, run: run
    });
  })();

  /* ==========================================================
     O4c · "THE TRANSIT LINE AND THE RATCHET"
     Metaphor: the BPM framework is a metro line with ten stations, one per
     week from Week 5 to Week 14. A train carries Qasr through them; the
     three essentials are a power rail under the whole line. Then the key
     idea: a ratchet only turns one way, a route lets you go back. A pawl
     blocks the train until it is lifted, and the train returns to fix
     Process Architecture.
     Technique: transit-map choreography + a mechanical ratchet.
     35 narration moments.
     ========================================================== */
  (function () {
    var N = 35, R1 = 104, R2 = 214;
    var ST = [[60, R1], [130, R1], [200, R1], [270, R1], [340, R1], [340, R2], [270, R2], [200, R2], [130, R2], [60, R2]];
    var NAMES = ["ORGANISATION STRATEGY", "PROCESS ARCHITECTURE", "LAUNCH PAD", "UNDERSTAND", "INNOVATE", "PEOPLE", "DEVELOP", "IMPLEMENT", "REALISE VALUE", "SUSTAINABLE PERFORMANCE"];
    var TRACK = "M14 " + R1 + " L340 " + R1 + " C392 " + R1 + " 392 " + R2 + " 340 " + R2 + " L36 " + R2;
    var DEPOT = [22, R1];
    function sPos(k) { return [ST[k][0], ST[k][1]]; }

    function draw(u) {
      var stations = ST.map(function (p, k) {
        return G("s" + k, Ci(p[0], p[1], 14, C.white, { stroke: C.navy, "stroke-width": 3.5, "data-paint": 1 }) + T(p[0], p[1] + 5, String(k + 5), 14, C.navy, { "class": "lb hn" }), { "data-o": p[0] + " " + p[1] }) +
          G("cb" + k, R(p[0] - 13, p[1] - 13, 26, 26, 4, C.white, { stroke: C.slate, "stroke-width": 2.5 }) + check(p[0], p[1] + 1, 0.75, C.green, 3.2), { opacity: 0, "data-o": p[0] + " " + p[1] });
      }).join("");
      var icons = [I.star(0, 0, 1, C.sun), I.gear(0, 0, 0.9, C.navy), I.rocket(0, 0, 0.8), I.mag(0, 0, 0.9), I.bulb(0, 0, 0.9), I.users(0, 0, 0.9), I.wrench(0, 0, 0.9), I.flag(0, 0, 0.9, C.green), I.coin(0, 0, 1), F("M-9 2 A9 9 0 1 1 -7 7", "none", { stroke: C.green, "stroke-width": 3 })];
      var ic = ST.map(function (p, k) {
        var y = k < 5 ? p[1] - 30 : p[1] + 30;
        return G("ic" + k, Ci(p[0], y, 13, C.white, { stroke: C.mute, "stroke-width": 1.2 }) + Tr(p[0], y, icons[k]), { opacity: 0, "data-o": p[0] + " " + y });
      }).join("");
      var arrows2 = [0, 1, 2, 3].map(function (k) { var x = (ST[k][0] + ST[k + 1][0]) / 2; return P("M" + (x - 12) + " " + (R1 - 18) + " H" + (x + 12) + " M" + (x - 7) + " " + (R1 - 23) + " L" + (x - 13) + " " + (R1 - 18) + " L" + (x - 7) + " " + (R1 - 13) + " M" + (x + 7) + " " + (R1 - 23) + " L" + (x + 13) + " " + (R1 - 18) + " L" + (x + 7) + " " + (R1 - 13), C.orange, 2.2); }).join("");
      var teeth = "", nT = 12;
      for (var t = 0; t < nT; t++) { var a = t * 2 * Math.PI / nT, b = a + 2 * Math.PI / nT * 0.75; teeth += (t ? "L" : "M") + (90 + Math.cos(a) * 22).toFixed(1) + " " + (284 + Math.sin(a) * 22).toFixed(1) + " L" + (90 + Math.cos(b) * 30).toFixed(1) + " " + (284 + Math.sin(b) * 30).toFixed(1) + " "; }
      return "<defs>" +
        '<pattern id="' + u + 'dot" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#d4dbe3"/></pattern>' +
        "</defs>" +
        R(-900, -900, 2200, 2200, 0, "#f4f6f9") + R(-900, -900, 2200, 2200, 0, "url(#" + u + "dot)") +
        G("probs", Tr(26, 154, I.chain(0, 0, 1.1)) + Tr(26, 184, I.pc(0, 0, 0.9)) + T(26, 140, "!", 18, C.red), { opacity: 0 }) +
        G("learned", Tr(56, 154, I.flag(0, 0, 0.9, C.green)) + Tr(86, 154, I.gauge(0, 0, 1)) + Tr(116, 154, I.stairs(0, 0, 0.9)), { opacity: 0 }) +
        G("band", P(TRACK, C.violet, 30, { opacity: 0.18 }) + P(TRACK, C.violet, 2, { "stroke-dasharray": "8 8", "class": "a-flow" }), { opacity: 0 }) +
        G("trackDash", P(TRACK, C.mute, 7, { "stroke-dasharray": "4 8" })) +
        PD("track", TRACK, C.navy, 7) +
        G("found", ST.slice(0, 3).map(function (p) { return R(p[0] - 22, R1 + 18, 44, 6, 3, C.gold); }).join(""), { opacity: 0 }) +
        G("arr2", arrows2, { opacity: 0 }) +
        stations + ic +
        G("hl", Ci(0, 0, 21, "none", { stroke: C.orange, "stroke-width": 3 }), { opacity: 0, "data-o": "0 0" }) +
        G("grpHL", ST.map(function (p, k) { return G("gh" + k, Ci(p[0], p[1], 19, C.orange, { opacity: 0.22 })); }).join("")) +
        // station board
        G("board", R(54, 140, 292, 38, 8, C.deep) + TK("boardT", 200, 166, " ", 17, C.sun, { "class": "lb hn" }), { opacity: 0 }) +
        G("legend", R(54, 128, 292, 68, 8, "#3b3170") + T(200, 150, "PROJECT MANAGEMENT", 15, C.white, { "class": "lb hn" }) + T(200, 170, "PEOPLE CHANGE MANAGEMENT", 15, C.white, { "class": "lb hn" }) + T(200, 190, "AND LEADERSHIP", 15, C.white, { "class": "lb hn" }), { opacity: 0 }) +
        // fault in architecture and the return arc
        G("fault", Ci(130, R1, 20, "none", { stroke: C.red, "stroke-width": 3 }) + T(130, 76, "!", 26, C.red), { opacity: 0 }) +
        G("fixed", Ci(130, R1, 11, C.green) + check(130, R1 + 1, 0.6, C.white, 2.6), { opacity: 0 }) +
        PD("back", "M266 84 C236 48 164 48 136 84", C.orange, 3.5) +
        G("backHead", P("M138 72 L135 86 L149 82", C.orange, 3.5), { opacity: 0 }) +
        // trains
        G("train", R(-16, -9, 32, 18, 6, C.orange, { stroke: "#8f3a1f", "stroke-width": 1.5 }) + R(-10, -5, 8, 6, 1.5, C.sky) + R(2, -5, 8, 6, 1.5, C.sky), { opacity: 0, "data-o": "0 0", transform: null }) +
        G("train2", R(-16, -9, 32, 18, 6, C.green, { stroke: "#1d5743", "stroke-width": 1.5 }) + R(-10, -5, 8, 6, 1.5, C.sky) + R(2, -5, 8, 6, 1.5, C.sky), { opacity: 0, "data-o": "0 0" }) +
        G("blocked", cross(0, 0, 0.9, C.red, 3.5), { opacity: 0, "data-o": "0 0" }) +
        G("gq", Ci(200, R2 + 34, 14, C.white, { stroke: C.slate, "stroke-width": 2 }) + T(200, R2 + 40, "?", 17, C.slate, { "class": "lb hn" }), { opacity: 0 }) +
        // ratchet and route
        G("ratchet", G("rGear", F(teeth + "Z", C.slate) + Ci(90, 284, 10, C.white) + Ci(90, 284, 4, C.ink), { "data-o": "90 284" }) +
          G("pawl", P("M150 262 L118 274", C.ink, 6) + Ci(150, 262, 5, C.ink), { "data-o": "150 262" }) +
          pill("pR", 90, 248, "A RATCHET", { fill: C.slate, size: 15 }), { opacity: 0 }) +
        G("routeI", P("M232 280 H360 M244 270 L230 280 L244 290 M348 270 L362 280 L348 290", C.green, 4) + Ci(296, 280, 7, C.white, { stroke: C.green, "stroke-width": 3 }), { opacity: 0 }) +
        pill("pRo", 296, 254, "A ROUTE", { fill: C.green, size: 15, attrs: { opacity: 0 } }) +
        pill("pOne", 90, 254, "ONE WAY ONLY", { fill: C.slate, size: 15, attrs: { opacity: 0 } }) +
        pill("pBoth", 296, 254, "BOTH WAYS", { fill: C.green, size: 15, attrs: { opacity: 0 } }) +
        G("unused", I.pc(200, 274, 2) + P("M180 258 L186 266 M186 258 L180 266 M214 280 Q222 270 230 280", "#9aa5b1", 1.2) + pill("pUn", 200, 306, "UNUSED SYSTEM", { fill: C.red, size: 15 }), { opacity: 0 }) +
        PD("loop", "M30 70 H370 Q396 70 396 96 V222 Q396 248 370 248 H30 Q8 248 8 222 V96 Q8 70 30 70", C.green, 3.5, { "stroke-dasharray": "1 2" }) +
        G("guest", fig(200, 304, 0.95, C.orange, { hair: "long" }) + P("M212 262 L224 248", C.orange, 4), { opacity: 0 });
    }

    function trainAt(i) {
      if (i <= 6) return -1;
      var map = { 7: 0, 8: 1, 9: 1, 10: 2, 11: 2, 12: 3, 13: 3, 14: 4, 15: 5, 16: 5, 17: 6, 18: 6, 19: 7, 20: 7, 21: 8 };
      return map[i] != null ? map[i] : 9;
    }
    function boardText(i) {
      var m = { 5: "TEN PHASES", 7: NAMES[0], 8: NAMES[0], 9: NAMES[1], 10: NAMES[1], 11: NAMES[2], 12: NAMES[2], 13: NAMES[3], 14: NAMES[4], 15: NAMES[4], 16: NAMES[5], 17: NAMES[5], 18: NAMES[6], 19: NAMES[7], 20: NAMES[7], 21: NAMES[8], 22: NAMES[9] };
      return m[i] || " ";
    }
    function run(i, A) {
      A.set("probs", { o: i === 1 ? 1 : 0 }, { t: 0.5 });
      A.set("learned", { o: i === 2 ? 1 : 0 }, { t: 0.5 });
      A.set("trackDash", { o: i >= 3 ? 1 : 0.35 }, { t: 0.5 });
      A.set("track", { draw: i >= 4 ? 1 : 0, o: on(i, 25, 33) ? 0.5 : 1 }, { t: 1.6, e: "io" });
      ST.forEach(function (p, k) {
        var vis = i >= 5 || (i === 4);
        var done = (trainAt(i) >= k && i <= 24) || (i === 29 && k === 1);
        A.set("s" + k, { s: vis ? (i === 5 ? 1.15 : 1) : 0.3, o: vis ? (i === 32 ? 0 : 1) : 0, fill: done ? "#fde7d6" : C.white }, { t: 0.5, dl: i === 5 ? k * 0.08 : 0, e: "back" });
        A.set("cb" + k, { o: i === 32 ? 1 : 0, s: i === 32 ? 1 : 0.6 }, { t: 0.35, dl: i === 32 ? k * 0.09 : 0, e: "back" });
        var icOn = (trainAt(i) === k && on(i, 7, 22) && boardText(i) === NAMES[k]) || (i === 11 && k < 3);
        A.set("ic" + k, { o: icOn ? 1 : 0, s: icOn ? 1 : 0.5 }, { t: 0.5, e: "back" });
        var grp = (i === 11 && k <= 2) || (i === 16 && k >= 3 && k <= 5) || (on(i, 19, 20) && (k === 6 || k === 7)) || (i === 22 && k >= 6) || (i === 24);
        A.set("gh" + k, { o: grp ? 1 : 0 }, { t: 0.5, dl: i === 24 ? k * 0.08 : 0 });
      });
      A.set("found", { o: on(i, 11, 24) ? 1 : 0 }, { t: 0.6 });

      // train journey
      var ti = trainAt(i);
      var tp = ti < 0 ? DEPOT : sPos(ti);
      var rot = ti >= 5 ? 180 : 0;
      if (i === 15) A.route("train", [sPos(4), [374, 130, 60], [374, 188, 120], sPos(5).concat([180])], { t: 1.8, e: "io" });
      else A.set("train", { x: tp[0], y: tp[1], r: rot }, { t: 1.2, e: "io" });
      A.set("train", { o: on(i, 6, 24) ? 1 : 0 }, { t: 0.5 });
      A.set("hl", { x: ti < 0 ? 0 : ST[ti][0], y: ti < 0 ? 0 : ST[ti][1], o: ti >= 0 && i <= 22 ? 1 : 0 }, { t: 1.2, e: "io" });
      var bt = boardText(i);
      A.text("boardT", bt);
      A.set("board", { o: bt !== " " && i !== 23 ? 1 : 0 }, { t: 0.4 });
      A.show("gq", i === 20);

      // essentials
      A.set("band", { o: on(i, 23, 24) ? 1 : 0 }, { t: 0.6 });
      A.set("legend", { o: i === 23 ? 1 : 0, s: i === 23 ? 1 : 0.9 }, { t: 0.5, e: "back" });

      // route, not ratchet
      A.show("arr2", on(i, 26, 27));
      A.set("fault", { o: on(i, 27, 28) ? 1 : 0, s: i === 27 ? 1.15 : 1 }, { t: 0.5, e: "back" });
      A.set("fixed", { o: on(i, 29, 31) ? 1 : 0 }, { t: 0.5, dl: i === 29 ? 1.6 : 0 });
      var t2 = i >= 29 ? sPos(1) : sPos(3);
      A.set("train2", { x: t2[0] + (i === 28 ? -10 : 0), y: t2[1], o: on(i, 27, 31) ? 1 : 0 }, { t: i === 29 ? 1.6 : 0.5, e: i === 28 ? "back" : "io" });
      A.set("blocked", { x: ST[3][0] - 26, y: R1, o: i === 28 ? 1 : 0, s: i === 28 ? 1 : 0.4 }, { t: 0.4, dl: i === 28 ? 0.3 : 0, e: "back" });
      A.set("back", { draw: on(i, 29, 31) ? 1 : 0 }, { t: 1.4, e: "io" });
      A.show("backHead", on(i, 29, 31));
      A.set("ratchet", { o: on(i, 28, 31) ? 1 : 0 }, { t: 0.5 });
      A.set("rGear", { r: i === 28 ? 30 : i === 29 ? -30 : 0 }, { t: 0.6, e: "back" });
      A.set("pawl", { r: i >= 29 ? -28 : 0 }, { t: 0.4, e: "back" });
      A.set("pR", { o: on(i, 28, 30) ? 1 : 0 }, { t: 0.3 });
      A.show("routeI", on(i, 30, 31));
      A.show("pRo", i === 30);
      A.show("pOne", i === 31); A.show("pBoth", i === 31);
      A.show("unused", i === 32);
      A.set("loop", { draw: i >= 33 ? 1 : 0, o: i >= 33 ? 1 : 0 }, { t: 1.8, e: "io" });
      A.set("guest", { o: i === 34 ? 1 : 0, y: i === 34 ? 0 : 10 }, { t: 0.7, e: "out" });

      A.chip(["ONCE IS NOT ENOUGH", "PROBLEMS EVERYWHERE", "WHAT WE HAVE LEARNED", "HOW TO ORGANISE IT?", "A STRUCTURED ROUTE",
        "WEEKS 5 TO 14", "WHY IMPROVE AT ALL?", "STOP 1: STRATEGY", "HOW PROCESSES FIT", "STOP 2: ARCHITECTURE",
        "PREPARING TO START", "STOP 3: LAUNCH PAD", "BACK TO THE DESK", "STOP 4: UNDERSTAND", "STOP 5: INNOVATE",
        "READY TO CHANGE?", "STOP 6: PEOPLE", "TIME TO BUILD", "STOP 7: DEVELOP", "STOP 8: IMPLEMENT",
        "INSTALLED IS NOT PROVEN", "STOP 9: REALISE VALUE", "STOP 10: SUSTAIN", "THREE ESSENTIALS", "SUPPORT EVERY PHASE",
        "HOW TO USE IT", "ORDER, NOT A PRISON", "A MISTAKE FOUND", "IGNORE IT?", "OF COURSE NOT",
        "ROUTE, NOT RATCHET", "ONE WAY OR BOTH", "TICK-BOX THINKING", "LEARN, VERIFY, SUSTAIN", "BACK TO OUR GUEST"][i]);
    }

    REG.O4c = makeScene("O4c", {
      n: N, title: "The ten-phase BPM framework as a metro line from Week 5 to Week 14, and why it is a route rather than a ratchet",
      bg: "#f4f6f9", halo: "#f4f6f9", draw: draw, run: run
    });
  })();

  /* ==========================================================
     W1OUTRO · "THE DEPARTURES BOARD AND THE PINBALL COMPLAINT"
     Act 1: a split-flap arrivals board replays the guest's evening, then
     flips, letter by letter, into Week 1 in four lines, with a live
     illustration under each line.
     Act 2: the Al Madar complaint is a pinball. It hits six department
     bumpers – each lights green, KPI met – while the day counter runs to
     19 and the ball drains unanswered. An owner on the flippers changes it.
     Act 3: the forum rules as three cards, then the board points to Week 2.
     Technique: split-flap character flips + pinball choreography.
     35 narration moments.
     ========================================================== */
  (function () {
    var N = 35, COLS = 18, TW = 19.5, TX0 = 25;
    // Stable id for the unnumbered closing section (idempotent; same as Part 1).
    try {
      var Ls = W.COURSE && W.COURSE.lessons, ll = Ls && Ls.length && Ls[Ls.length - 1].sections, lst = ll && ll[ll.length - 1];
      if (lst && !lst.sec) lst.sec = "W1OUTRO";
    } catch (e) { }
    var BOARD_Y = [70, 104, 136, 168, 200];
    var MQ = 16;   // marquee tiles
    // [header, row1..row4] per moment (null = keep previous computed)
    var BRD = {
      0: ["QASR MARINA", "", "", "", ""],
      1: ["QASR MARINA", "FLIGHT DELAYED", "", "", ""],
      2: ["QASR MARINA", "FLIGHT DELAYED", "23 MIN AT DESK", "PASSPORT TWICE", "ROOM NOT READY"],
      3: ["SCORE 4/10", "ALL TARGETS MET", "23 MIN AT DESK", "PASSPORT TWICE", "ROOM NOT READY"],
      4: ["WEEK 1 RECAP", "", "", "", ""],
      5: ["WEEK 1 RECAP", "PROCESS = VALUE", "", "", ""],
      8: ["WEEK 1 RECAP", "PROCESS = VALUE", "SILOS HIDE FAILURE", "", ""],
      12: ["WEEK 1 RECAP", "PROCESS = VALUE", "SILOS HIDE FAILURE", "BPM OUTLASTS BPI", ""],
      14: ["WEEK 1 RECAP", "PROCESS = VALUE", "SILOS HIDE FAILURE", "BPM OUTLASTS BPI", "KNOW YOUR MATURITY"],
      18: ["THE REAL GOAL", "PROCESS = VALUE", "SILOS HIDE FAILURE", "BPM OUTLASTS BPI", "KNOW YOUR MATURITY"]
    };
    function boardAt(i) { var k = i; while (k >= 0 && !BRD[k]) k--; return BRD[Math.max(0, k)]; }
    var BUMP = [[96, 146], [200, 132], [304, 146], [304, 222], [200, 208], [96, 222]];
    var DEPTS = ["ACCOUNT MANAGER", "CUSTOMER SERVICE", "OPERATIONS", "COMPLIANCE", "VENDOR MANAGEMENT", "QUALITY TEAM"];
    var MQT = {
      19: "AL MADAR", 20: "COMPLAINT IN", 21: "OPERATIONS", 22: "QUALITY TEAM", 23: "SOUND FAMILIAR?",
      24: "NOBODY OWNS IT", 25: "END TO END?", 26: "ONE OWNER", 27: "YOUR FORUM", 28: "YOUR FORUM", 29: "YOUR FORUM",
      30: "YOUR FORUM", 31: "YOUR FORUM", 32: "NEXT: WEEK 2", 33: "THE OUTCOME", 34: "SEE YOU, OPER621"
    };
    function pad(s, n) { s = s || ""; var l = Math.max(0, Math.floor((n - s.length) / 2)); return (new Array(l + 1).join(" ") + s + new Array(n + 1).join(" ")).slice(0, n); }

    function tiles(prefix, n, x0, y, w, col) {
      var s = "";
      for (var c = 0; c < n; c++) {
        var x = x0 + c * w;
        s += G(prefix + c, R(x, y - 14, w - 2, 26, 3, "#2a3442") + L(x, y - 1, x + w - 2, y - 1, "#141b24", 1) +
          TK(prefix + "t" + c, x + (w - 2) / 2, y + 6, " ", 16, col, { "class": "lb hn" }), { "data-o": (x + (w - 2) / 2) + " " + y });
      }
      return s;
    }
    function draw(u) {
      var board = "";
      BOARD_Y.forEach(function (y, r) { board += tiles("b" + r + "_", COLS, TX0 - 6, y, TW, r === 0 ? C.sun : C.white); });
      var bumpers = BUMP.map(function (p, k) {
        var ic = [I.users(0, 0, 0.9, C.white), I.chat(0, 0, 0.8, C.white), I.gear(0, 0, 0.9, C.white), I.shield(0, 0, 0.9, "#2f5d8a"), I.van(0, 0, 0.9, C.white), I.star(0, 0, 0.9, C.white)][k];
        return G("bp" + k, Ci(p[0], p[1], 22, "#2f5d8a", { stroke: "#9cc3e6", "stroke-width": 3, "data-paint": 1 }) + Tr(p[0], p[1], ic), { "data-o": p[0] + " " + p[1] }) +
          G("bk" + k, Ci(p[0] + 17, p[1] - 17, 9, C.green, { stroke: C.white, "stroke-width": 1.5 }) + check(p[0] + 17, p[1] - 16, 0.45, C.white, 2.2), { opacity: 0, "data-o": (p[0] + 17) + " " + (p[1] - 17) });
      }).join("");
      var minis =
        G("m6", I.flag(70, 280, 1.1, C.green) + P("M86 284 H300", C.orange, 3, { "stroke-dasharray": "5 5" }) + I.bed(326, 284, 1.3, C.green)) +
        G("m7", P("M60 284 H340", C.orange, 4) + [130, 200, 270].map(function (x) { return L(x, 256, x, 312, C.navy, 3); }).join("")) +
        G("m8", [110, 170, 230].map(function (x) { return Ci(x, 282, 12, C.green) + check(x, 283, 0.6, C.white, 2.4); }).join("") + Ci(300, 282, 15, C.skin) + P("M294 289 Q300 284 306 289", C.ink, 2) + Ci(295, 279, 1.5, C.ink) + Ci(305, 279, 1.5, C.ink)) +
        G("m9", P("M60 300 H340", C.orange, 4) + fig(210, 300, 0.7, C.green, { badge: C.sun })) +
        G("m10", fig(200, 308, 0.85, C.green, { badge: C.sun }) + I.key(236, 268, 1.2, C.sun)) +
        G("m11", fig(110, 308, 0.85, C.green, { badge: C.sun }) + I.route(190, 280, 1.2) + I.gauge(250, 282, 1.2) + I.coin(310, 280, 1.3)) +
        G("m12", P("M60 300 L90 260 L150 296 L180 260 L240 296", C.orange, 3.5) + P("M60 270 H340", C.green, 4)) +
        G("m13", R(150, 262, 100, 40, 8, "none", { stroke: C.navy, "stroke-width": 3, "stroke-dasharray": "5 4" }) + P("M100 282 A100 30 0 1 1 300 282", C.green, 3) + P("M292 270 L300 282 L288 286", C.green, 3)) +
        G("m14", [0, 1, 2, 3, 4].map(function (j) { return R(140 + j * 26, 300 - (j + 1) * 10, 22, (j + 1) * 10, 3, j === 0 ? C.orange : "#9fb3c8"); }).join("")) +
        G("m15", R(140, 290, 22, 10, 3, C.orange) + I.doc(190, 286, 1.2) + P("M166 295 H176", C.ink, 2)) +
        G("m16", P("M70 272 H300 C330 272 330 300 300 300 H70", C.navy, 4) + [90, 150, 210, 270].map(function (x) { return Ci(x, 272, 6, C.white, { stroke: C.navy, "stroke-width": 2.5 }) + Ci(x, 300, 6, C.white, { stroke: C.navy, "stroke-width": 2.5 }); }).join("")) +
        G("m17", [110, 170, 230].map(function (x) { return Ci(x, 282, 12, "#c3cdd8"); }).join("")) +
        G("m18", fig(170, 310, 0.85, C.orange, { hair: "long" }) + I.bed(230, 290, 1.5, C.green) + Ci(270, 276, 14, C.green) + check(270, 277, 0.8, C.white, 3));
      return R(-900, -900, 2200, 2200, 0, "#12202e") +
        // ACT 1 board
        G("board", R(12, 52, 376, 166, 12, "#1b2633", { stroke: "#3b4a5c", "stroke-width": 2 }) + L(12, 86, 388, 86, "#3b4a5c", 1.5) + board, { "data-o": "200 140" }) +
        G("minis", minis) +
        // ACT 2 pinball + marquee
        G("mq", R(12, 46, 376, 34, 8, "#1b2633", { stroke: "#3b4a5c", "stroke-width": 2 }) + tiles("q", MQ, 18, 63, 17.9, C.sun) +
          G("dayBox", R(306, 50, 78, 26, 5, C.red) + TK("day", 345, 69, "DAY 0", 15, C.white, { "class": "lb hn" })), { opacity: 0 }) +
        G("table",
          R(14, 88, 372, 228, 16, "#1d4a40", { stroke: "#2e6b5d", "stroke-width": 3 }) + R(352, 100, 26, 210, 6, "#163a32") +
          P("M120 300 L176 286 M280 300 L224 286", "#e8d9a8", 8) +
          G("gaps", [0, 1, 2, 3, 4].map(function (k) { var a = BUMP[k], b = BUMP[k + 1]; return P("M" + (a[0] + (b[0] - a[0]) * 0.3) + " " + (a[1] + (b[1] - a[1]) * 0.3) + " L" + (a[0] + (b[0] - a[0]) * 0.7) + " " + (a[1] + (b[1] - a[1]) * 0.7), C.coral, 3, { "stroke-dasharray": "4 4" }); }).join(""), { opacity: 0 }) +
          bumpers +
          G("client", fig(44, 306, 0.8, C.sun, { mood: "frown" }) + I.clock(70, 252, 0.9, C.red), { opacity: 0 }) +
          G("qGuest", fig(78, 306, 0.8, C.orange, { mood: "frown", hair: "long" }), { opacity: 0 }) +
          G("tape", P("M365 110 C320 100 300 92 200 100 C120 106 60 120 56 170 C52 220 120 270 200 290", C.sun, 3, { "stroke-dasharray": "2 6" }), { opacity: 0 }) +
          pill("p19", 200, 171, "19 DAYS", { fill: C.red, size: 15, attrs: { opacity: 0 } }) +
          G("owner", fig(200, 312, 0.8, C.green, { badge: C.sun }), { opacity: 0 }) +
          PD("good", "M365 300 C365 200 300 176 200 176 C120 176 70 140 46 104", C.green, 4) +
          G("ans", Ci(46, 104, 13, C.green) + check(46, 105, 0.7, C.white, 2.6), { opacity: 0 }) +
          G("ball", Ci(0, 0, 7.5, "#e9edf2", { stroke: C.white, "stroke-width": 1.5 }) + Ci(-2, -2, 2.5, C.white), { "data-o": "0 0" }),
          { opacity: 0 }) +
        // ACT 3 forum cards
        G("cards", [
          [18, I.pencil(0, 0, 1.6), ["POST YOUR", "ANSWER"]],
          [142, I.chat(-8, 0, 1.1, C.navy) + I.chat(10, 6, 1.1, C.green), ["REPLY TO", "TWO"]],
          [266, I.chat(-10, 0, 1.1, C.orange) + I.chat(10, 4, 1.1, C.navy), ["DISAGREE,", "WITH REASONS"]]
        ].map(function (c, k) {
          return G("cd" + k, R(c[0], 104, 116, 170, 12, C.paper, { stroke: "#d7c9ad", "stroke-width": 2 }) + Ci(c[0] + 58, 152, 30, "#efe5d1") +
            G("ci" + k, Tr(c[0] + 58, 152, c[1])) + T(c[0] + 58, 216, c[2][0], 15, C.ink, { "class": "lb hl" }) + T(c[0] + 58, 238, c[2][1], 15, C.ink, { "class": "lb hl" }) +
            Ci(c[0] + 98, 120, 12, C.orange) + T(c[0] + 98, 126, String(k + 1), 15, C.white, { "class": "lb hn" }), { opacity: 0, "data-o": (c[0] + 58) + " 190" });
        }).join("") +
          G("bulb", I.bulb(324, 152, 2.2), { opacity: 0 }) +
          G("pin", Ci(30, 108, 14, C.white, { stroke: C.orange, "stroke-width": 2 }) + fig(30, 120, 0.42, C.orange, { hair: "long" }), { opacity: 0 })) +
        pill("wk2", 200, 180, "WHY START BPM?", { fill: C.violet, size: 20, attrs: { opacity: 0 } }) +
        G("end", fig(150, 260, 1.1, C.orange, { hair: "long" }) + I.bed(240, 236, 2.4, C.green) + Ci(300, 160, 22, C.green) + check(300, 162, 1.1, C.white, 4), { opacity: 0 }) +
        G("stars", [[40, 120], [360, 110], [80, 290], [330, 290], [200, 100]].map(function (p) { return I.star(p[0], p[1], 0.8, C.sun); }).join(""), { opacity: 0 });
    }

    function setFlaps(A, prefix, n, text, stagger) {
      var s = pad(text, n);
      for (var c = 0; c < n; c++) (function (c, ch) {
        A.later((stagger ? c * 28 : 0) + 140, function () { A.text(prefix + "t" + c, ch); });
        A.flip(prefix + c);
      })(c, s.charAt(c));
    }
    function setFlapsSmart(A, prefix, n, text) {
      var s = pad(text, n);
      for (var c = 0; c < n; c++) (function (c, ch) {
        var t = A.el(prefix + "t" + c), old = t ? t.textContent : "";
        if (ch === old) return;
        if (!A.inst) A.flip(prefix + c);
        A.later(c * 26 + 150, function () { A.text(prefix + "t" + c, ch); });
      })(c, s.charAt(c));
    }
    function run(i, A) {
      var act = i <= 18 ? 1 : i <= 26 ? 2 : 3;
      // board
      var B = boardAt(i);
      for (var r = 0; r < 5; r++) setFlapsSmart(A, "b" + r + "_", COLS, B[r]);
      var rowCol = [C.sun, C.white, C.white, C.white, C.white];
      if (i <= 3) rowCol = [C.sun, C.sun, C.coral, C.coral, C.coral];
      if (i === 3) rowCol[1] = C.mint;
      for (var r2 = 1; r2 < 5; r2++) for (var c = 0; c < COLS; c++) A.set("b" + r2 + "_t" + c, { fill: rowCol[r2] }, { t: 0.3 });
      var focus = { 5: 1, 6: 1, 7: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 3, 13: 3, 14: 4, 15: 4, 16: 4 }[i];
      for (var r3 = 1; r3 < 5; r3++) for (var c2 = 0; c2 < COLS; c2++) A.set("b" + r3 + "_" + c2, { o: (focus && r3 !== focus) || i === 17 ? 0.35 : 1 }, { t: 0.4 });
      A.set("board", { o: act === 1 ? 1 : 0, y: act === 1 ? 0 : -40, s: act === 1 ? 1 : 0.8 }, { t: 0.8, e: "io" });
      for (var m = 6; m <= 18; m++) A.set("m" + m, { o: i === m ? 1 : 0, y: i === m ? 0 : 8 }, { t: 0.5 });
      A.set("minis", { o: act === 1 ? 1 : 0 }, { t: 0.4 });

      // marquee
      var mt = MQT[i] || "";
      A.set("mq", { o: act >= 2 ? 1 : 0 }, { t: 0.6 });
      if (i === 21 || i === 22) {
        var seq = i === 21 ? DEPTS.slice(0, 3) : DEPTS.slice(3, 6).concat(["STILL UNANSWERED"]);
        if (A.inst) setFlapsSmart(A, "q", MQ, seq[seq.length - 1]);
        else seq.forEach(function (name, k) { A.later(k * 650, function () { setFlaps(A, "q", MQ, name.length > MQ ? name.replace(" MANAGER", " MGR").replace(" MANAGEMENT", " MGMT") : name, true); }); });
        mt = seq[seq.length - 1];
      } else setFlapsSmart(A, "q", MQ, mt);
      var dayTo = i < 21 ? 0 : i === 21 ? 7 : 19;
      if (i >= 26) dayTo = 19;
      A.count("day", dayTo, { t: i === 22 ? 2.2 : 1, fmt: function (v) { return "DAY " + Math.round(v); } });
      A.set("dayBox", { o: on(i, 20, 26) ? 1 : 0 }, { t: 0.4 });

      // pinball
      A.set("table", { o: act === 2 ? 1 : 0 }, { t: 0.6 });
      var lit = i < 21 ? 0 : i === 21 ? 3 : 6;
      BUMP.forEach(function (p, k) {
        var on1 = k < lit;
        A.set("bp" + k, { fill: on1 ? C.green : "#2f5d8a", s: on1 ? 1.06 : 1 }, { t: 0.35, dl: (i === 21 ? k : i === 22 ? k - 3 : 0) * 0.65 + 0.4, e: "back" });
        A.set("bk" + k, { o: on1 ? 1 : 0, s: on1 ? 1 : 0.3 }, { t: 0.35, dl: (i === 21 ? k : i === 22 ? k - 3 : 0) * 0.65 + 0.45, e: "back" });
      });
      var hitOff = function (k) { var p = BUMP[k]; return [p[0] + (k % 2 ? -26 : 26), p[1] + 18]; };
      if (i === 20) A.route("ball", [[365, 300], [365, 108]], { t: 0.9, e: "out" });
      else if (i === 21) A.route("ball", [[365, 108], hitOff(0), hitOff(1), hitOff(2)], { t: 1.95, e: "io" });
      else if (i === 22) A.route("ball", [hitOff(2), hitOff(3), hitOff(4), hitOff(5), [200, 312]], { t: 2.6, e: "io" });
      else if (i === 26) A.route("ball", [[365, 300], [365, 200], [200, 176], [46, 104]], { t: 2, e: "io" });
      else A.set("ball", i < 20 ? { x: 365, y: 300 } : i <= 25 ? { x: 200, y: 312 } : { x: 46, y: 104 }, { t: 0.4 });
      A.set("ball", { o: act === 2 && !(i === 25) ? 1 : 0 }, { t: 0.3 });
      A.set("client", { o: on(i, 22, 25) ? 1 : 0 }, { t: 0.5 });
      A.set("qGuest", { o: i === 23 ? 1 : 0, x: i === 23 ? 0 : -10 }, { t: 0.5 });
      A.show("gaps", i === 24);
      A.show("tape", i === 25); A.show("p19", i === 25);
      A.set("owner", { o: i === 26 ? 1 : 0 }, { t: 0.5 });
      A.set("good", { draw: i === 26 ? 1 : 0 }, { t: 1.6, e: "io" });
      A.set("ans", { o: i === 26 ? 1 : 0, s: i === 26 ? 1 : 0.3 }, { t: 0.5, dl: 1.6, e: "back" });

      // forum cards
      [0, 1, 2].forEach(function (k) {
        var vis = i >= 27 + k && i <= 31;
        A.set("cd" + k, { o: vis ? 1 : 0, y: vis ? 0 : 20, s: i === 27 + k ? 1.06 : 1 }, { t: 0.6, e: "back" });
      });
      A.set("ci2", { o: i === 30 ? 0 : 1 }, { t: 0.4 });
      A.set("bulb", { o: i === 30 ? 1 : 0, s: i === 30 ? 1 : 0.5 }, { t: 0.5, e: "back" });
      A.set("pin", { o: i === 31 ? 1 : 0, r: i === 31 ? -8 : 0 }, { t: 0.5, e: "back" });
      A.set("wk2", { o: i === 32 ? 1 : 0, s: i === 32 ? 1 : 0.8 }, { t: 0.6, e: "back" });
      A.set("end", { o: on(i, 33, 34) ? 1 : 0 }, { t: 0.6 });
      A.set("stars", { o: i === 34 ? 1 : 0 }, { t: 0.6 });

      A.chip(["BACK TO THAT EVENING", "A DELAYED FLIGHT", "WHAT WENT WRONG", "TARGETS MET, 4/10", "NOW, YOU SEE MORE",
        "LINE 1: PROCESS", "START AND END", "IT CROSSES DEPARTMENTS", "LINE 2: THE GAP", "MANAGE THE WHOLE",
        "A REAL OWNER", "WITH REAL AUTHORITY", "LINE 3: BPM VS BPI", "PROJECT VS DISCIPLINE", "LINE 4: MATURITY",
        "FOUNDATIONS FIRST", "THE FRAMEWORK ROUTE", "NOT LOOKING SUCCESSFUL", "WHAT CUSTOMERS NEED", "YOUR FORUM CASE",
        "AL MADAR LOGISTICS", "SIX DEPARTMENTS, SIX KPIS", "19 DAYS WAITING", "SOUND FAMILIAR?", "BETWEEN DEPARTMENTS",
        "THE END-TO-END VIEW", "GENUINE OWNERSHIP", "POST FIRST", "REPLY TO TWO", "DISAGREE, WITH REASONS",
        "DISAGREEMENT HELPS", "REMEMBER OUR GUEST", "NEXT WEEK", "OUTCOME OVER DEPARTMENTS", "CARRY THIS FORWARD"][i]);
    }

    REG.W1OUTRO = makeScene("W1OUTRO", {
      n: N, title: "Week 1 in four lines on a split-flap board, then the Al Madar complaint as a pinball that lights every KPI but is never answered",
      bg: "#12202e", halo: "#12202e", chipColor: C.sun, draw: draw, run: run
    });
  })();

})();
