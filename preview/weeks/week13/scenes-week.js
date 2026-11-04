// FILE: w13-claude-v2-part1.js
// OPER621 - Week 13 - The Realize Value Phase - animated teaching scenes, round 2 (full rebuild).
// Part 1 of 4. Sections: W13O1a W13O1b W13O1c. Standalone; load parts in any order.
// Contract: window.VL_SCENES[secId] = { build(el), step(i, n), reset() }.
// Styles: appended to one <style id="vl-sc-w13">, every rule scoped under .vls-w13-<secId>.
// Every board names the benchmark template it adapts, with its URL, in a comment.
(function () {
  "use strict";
  /* ------------------------------------------------------------------
     ENGINE (v2, written from scratch for Week 13 round 2).
     A section is a sequence of BOARDS. Each board is one complete visual
     that owns 2 to 5 consecutive narration lines; inside a board every
     line has its own deterministic state (view(b, S)), so the player can
     seek forwards or backwards to any moment. Entering a board snaps its
     actors to their drawn defaults, then animates them in.
     Motion: window.gsap when present, otherwise a small rAF tweener.
     prefers-reduced-motion: every state is applied instantly.
     Layout: 400 x 300 design canvas, scaled with "meet"; the outer
     viewBox widens or deepens (max 1.35x / 1.45x) to the host aspect
     and each scene paints a full-bleed background, so phone (figure
     above text) and laptop (figure in the left 60%) are both filled.
     ------------------------------------------------------------------ */
  var W = window;
  W.VL_SCENES = W.VL_SCENES || {};
  var VLS = W.VL_SCENES;
  var CW = 400, CH = 300;
  var C = {
    navy: "#1f4e79", ink: "#16263a", orange: "#c0502a", paper: "#fbf8f1",
    blue: "#dbe7f2", green: "#2f7d5f", gold: "#d9982b", plum: "#6b4f96",
    teal: "#2a8a8f", red: "#b23a3a", slate: "#5c6f84", sand: "#efe4cf",
    mist: "#c7d5e3", white: "#ffffff", pale: "#e3f1e8", rose: "#f6e1da",
    lilac: "#ece6f5", sky: "#e6f0f8", amber: "#fbecd0"
  };
  var CSS = [];
  var PFX = "";

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function at(o) {
    var r = [];
    for (var k in o) if (o[k] !== undefined && o[k] !== null && o[k] !== false) r.push(k + '="' + esc(o[k]) + '"');
    return r.join(" ");
  }
  function el(n, o, inner) {
    return inner === undefined ? "<" + n + " " + at(o || {}) + "/>" : "<" + n + " " + at(o || {}) + ">" + inner + "</" + n + ">";
  }
  /* ---------- primitive shapes ---------- */
  function R(x, y, w, h, f, o) {
    o = o || {};
    return el("rect", { x: x, y: y, width: w, height: h, rx: o.rx, fill: f, stroke: o.s, "stroke-width": o.sw,
      opacity: o.op, "stroke-dasharray": o.da, "class": o.c, "data-k": o.k ? PFX + o.k : undefined });
  }
  function O(cx, cy, r, f, o) {
    o = o || {};
    return el("circle", { cx: cx, cy: cy, r: r, fill: f, stroke: o.s, "stroke-width": o.sw, opacity: o.op,
      "stroke-dasharray": o.da, "class": o.c, "data-k": o.k ? PFX + o.k : undefined });
  }
  function E(cx, cy, rx, ry, f, o) {
    o = o || {};
    return el("ellipse", { cx: cx, cy: cy, rx: rx, ry: ry, fill: f, stroke: o.s, "stroke-width": o.sw, opacity: o.op, "class": o.c });
  }
  function P(d, s, sw, o) {
    o = o || {};
    return el("path", { d: d, fill: o.f || "none", stroke: s || "none", "stroke-width": sw, "stroke-linecap": "round",
      "stroke-linejoin": "round", opacity: o.op, "stroke-dasharray": o.da, "class": o.c,
      "data-k": o.k ? PFX + o.k : undefined });
  }
  /* Text. o.z size (16), o.w weight (800), o.f fill, o.a anchor, o.k key,
     o.num = {v:start, pre:"", suf:""} makes it a tweenable counter. */
  function T(x, y, s, o) {
    o = o || {};
    var a = { x: x, y: y, "font-size": o.z || 16, "font-weight": o.w || 800, fill: o.f || C.ink,
      "text-anchor": o.a || "middle", "dominant-baseline": "central", opacity: o.op, "class": o.c,
      "letter-spacing": o.ls, "data-k": o.k ? PFX + o.k : undefined };
    if (o.num) { a["data-n"] = o.num.v || 0; a["data-pre"] = o.num.pre || ""; a["data-suf"] = o.num.suf || ""; }
    return el("text", a, esc(s));
  }
  /* Group. A CSS ambient class never shares an element with a transform
     attribute (the animation would replace it), so both are nested. */
  function G(inner, t, c, op) {
    if (t && c) return el("g", { transform: t, opacity: op }, el("g", { "class": c }, inner));
    return el("g", { transform: t, "class": c, opacity: op }, inner);
  }
  /* Animated actor placed at (x, y); its own transform is engine-owned.
     o.o0 initial opacity, o.c extra class: "ob" (grow from bottom), "ol" (grow from left). */
  function M(k, x, y, inner, o) {
    o = o || {};
    return '<g transform="translate(' + x + " " + y + ')"><g class="mv ' + (o.c || "") + '" data-k="' + PFX + k + '"' +
      (o.o0 !== undefined ? ' data-o="' + o.o0 + '"' : "") + ">" + inner + "</g></g>";
  }
  /* Self-drawing stroke (property d: 0..1). */
  function D(k, d, s, sw, o) {
    o = o || {};
    return el("path", { d: d, fill: "none", stroke: s, "stroke-width": sw, "stroke-linecap": "round", "stroke-linejoin": "round",
      "class": "mv dr " + (o.c || ""), "data-k": PFX + k, pathLength: 100, "data-d": o.d0 || 0,
      "data-o": o.o0, "stroke-dasharray": "100 100", opacity: o.op });
  }
  /* Width estimate for a bold label; the browser re-measures every pill after build. */
  function tw(s, z) {
    var w = 0, str = String(s);
    for (var i = 0; i < str.length; i++) {
      var c = str[i];
      w += /[MW]/.test(c) ? 0.92 : /[A-Z0-9]/.test(c) ? 0.72 : /[ .,:'\u00B7]/.test(c) ? 0.32 : /[mw]/.test(c) ? 0.86 : /[a-z]/.test(c) ? 0.58 : 0.7;
    }
    return w * z;
  }
  /* Pill label centred on (x, y). o.z size, o.s stroke, o.f text, o.bg fill, o.k text key. */
  function L(x, y, s, o) {
    o = o || {};
    var z = o.z || 15, h = Math.round(z * 1.75), w = tw(s, z) + h * 0.95;
    return '<g class="pill" data-cx="' + x + '" data-pad="' + (h * 0.95).toFixed(1) + '">' +
      R(x - w / 2, y - h / 2, w, h, o.bg || C.paper, { rx: h / 2, s: o.s || C.navy, sw: o.sw || 2 }) +
      T(x, y + 0.5, s, { z: z, f: o.f || o.s || C.navy, k: o.k }) + "</g>";
  }
  /* ---------- pictograms (centred on the local origin) ---------- */
  function person(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + O(0, -15, 8, col) + P("M-13 14 Q-13 -4 0 -4 Q13 -4 13 14 Z", "none", 0, { f: col }) + "</g>";
  }
  function hotel(col, s, door) {
    s = s || 1;
    var g = R(-16, -26, 32, 44, C.paper, { rx: 3, s: col, sw: 2.5 });
    for (var r = 0; r < 3; r++) for (var c = 0; c < 2; c++) g += R(-11 + c * 13, -20 + r * 11, 9, 7, C.blue, { rx: 1.5 });
    return '<g transform="scale(' + s + ')">' + g + R(-5, 8, 10, 10, door || col, { rx: 1.5 }) + "</g>";
  }
  function coin(r, col, txt, z) {
    return O(0, 0, r, C.paper, { s: col, sw: Math.max(2, r / 6) }) + O(0, 0, r * 0.72, "none", { s: col, sw: 1.2, op: 0.5 }) +
      (txt ? T(0, 0.5, txt, { z: z || Math.round(r * 0.6), f: col }) : "");
  }
  function clock(r, col) {
    return O(0, 0, r, C.paper, { s: col, sw: Math.max(2, r / 6) }) +
      P("M0 " + (-r * 0.6) + " V0 L" + (r * 0.45) + " " + (r * 0.3), col, Math.max(2, r / 7));
  }
  function doc(w, h, col) {
    var s = R(-w / 2, -h / 2, w, h, C.white, { rx: 3, s: col, sw: 2 }), n = Math.max(2, Math.floor((h - 12) / 8));
    for (var i = 0; i < n; i++) s += P("M" + (-w / 2 + 6) + " " + (-h / 2 + 9 + i * 8) + " H" + (w / 2 - 6 - (i % 2) * 6), col, 1.8, { op: 0.55 });
    return s;
  }
  function contract(col) {
    return doc(34, 44, col) + P("M-10 16 q4 -7 8 0 t8 0", C.orange, 2);
  }
  function tick(s, col, sw) {
    s = s || 1;
    return P("M" + -9 * s + " 0 L" + -3 * s + " " + 7 * s + " L" + 10 * s + " " + -8 * s, col || C.green, sw || 4);
  }
  function cross(s, col, sw) {
    s = s || 1;
    return P("M" + -8 * s + " " + -8 * s + " L" + 8 * s + " " + 8 * s + " M" + 8 * s + " " + -8 * s + " L" + -8 * s + " " + 8 * s, col || C.red, sw || 4);
  }
  function qb(r, col) {
    return O(0, 0, r, col || C.orange) + T(0, 1, "?", { z: Math.max(14, Math.round(r * 1.3)), f: C.white, w: 900 });
  }
  function okb(r, col) { return O(0, 0, r, col || C.green) + tick(r / 13, C.white, Math.max(2.5, r / 5)); }
  function nob(r, col) { return O(0, 0, r, col || C.red) + cross(r / 15, C.white, Math.max(2.5, r / 5)); }
  function mag(r, col) {
    col = col || C.ink;
    return O(0, 0, r, "rgba(255,255,255,.55)", { s: col, sw: Math.max(3, r / 5) }) + P("M" + r * 0.72 + " " + r * 0.72 + " L" + r * 1.45 + " " + r * 1.45, col, Math.max(4, r / 3.5));
  }
  function shield(s, col, fill) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + P("M0 -20 L16 -13 V-1 Q16 14 0 21 Q-16 14 -16 -1 V-13 Z", col, 2.5, { f: fill || C.lilac }) + "</g>";
  }
  function keyI(s, col) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + O(-8, 0, 7, "none", { s: col, sw: 3.5 }) + P("M-1 0 H16 M11 0 V6 M16 0 V5", col, 3.5) + "</g>";
  }
  function flag(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + P("M0 0 V-34", C.ink, 2.5) + P("M0 -34 L22 -27 L0 -20 Z", col, 1, { f: col }) + "</g>";
  }
  function trophy(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + P("M-12 -14 H12 V-4 Q12 8 0 10 Q-12 8 -12 -4 Z", col, 2, { f: col }) +
      P("M-12 -10 h-6 v5 q0 5 6 5 M12 -10 h6 v5 q0 5 -6 5", col, 2.5) + R(-4, 10, 8, 6, col) + R(-11, 16, 22, 5, C.ink, { rx: 1.5 }) + "</g>";
  }
  function hourglass(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + P("M-12 -18 H12 M-12 18 H12", C.ink, 3) +
      P("M-9 -17 Q-9 -4 0 0 Q9 -4 9 -17 Z M-9 17 Q-9 4 0 0 Q9 4 9 17 Z", col, 2, { f: C.paper }) +
      P("M-5 -10 Q0 -3 5 -10 Z M-7 15 Q0 8 7 15 Z", "none", 0, { f: col }) + "</g>";
  }
  function cal(col, s) {
    s = s || 1;
    var g = R(-15, -13, 30, 28, C.white, { rx: 3, s: col, sw: 2 }) + R(-15, -13, 30, 8, col, { rx: 3 });
    for (var i = 0; i < 3; i++) for (var j = 0; j < 2; j++) g += R(-10 + i * 8, -1 + j * 7, 5, 4, col, { op: 0.6 });
    return '<g transform="scale(' + s + ')">' + g + "</g>";
  }
  function cloud(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + E(0, 4, 30, 14, col) + E(-18, 6, 16, 11, col) + E(18, 6, 17, 11, col) + E(-2, -8, 18, 14, col) + "</g>";
  }
  function target(r, col) {
    return O(0, 0, r, C.white, { s: col, sw: 3 }) + O(0, 0, r * 0.62, "none", { s: col, sw: 3 }) + O(0, 0, r * 0.25, col);
  }
  function gear(r, col) {
    var d = "", n = 8;
    for (var i = 0; i < n * 2; i++) {
      var a = (i / (n * 2)) * Math.PI * 2, rr = i % 2 ? r : r * 1.22, a2 = a + Math.PI / (n * 2);
      d += (i ? "L" : "M") + (rr * Math.cos(a)).toFixed(1) + " " + (rr * Math.sin(a)).toFixed(1) + " L" + (rr * Math.cos(a2)).toFixed(1) + " " + (rr * Math.sin(a2)).toFixed(1) + " ";
    }
    return P(d + "Z", col, 2, { f: C.paper }) + O(0, 0, r * 0.4, "none", { s: col, sw: 3 });
  }
  function arrowH(x1, y1, x2, y2, col, sw) {
    var a = Math.atan2(y2 - y1, x2 - x1), h = 9;
    return P("M" + x1 + " " + y1 + " L" + x2 + " " + y2 + " M" + (x2 - h * Math.cos(a - 0.5)).toFixed(1) + " " + (y2 - h * Math.sin(a - 0.5)).toFixed(1) +
      " L" + x2 + " " + y2 + " L" + (x2 - h * Math.cos(a + 0.5)).toFixed(1) + " " + (y2 - h * Math.sin(a + 0.5)).toFixed(1), col || C.ink, sw || 3);
  }
  function stamp(txt, col, z) {
    z = z || 16;
    var w = tw(txt, z) + 22, h = z + 14;
    return R(-w / 2, -h / 2, w, h, "rgba(255,255,255,.88)", { rx: 4, s: col, sw: 3 }) + T(0, 1, txt, { z: z, f: col, w: 900 });
  }
  function umbrella(col) {
    return P("M-34 0 Q-34 -30 0 -32 Q34 -30 34 0 Q25 -7 17 0 Q8 -7 0 0 Q-8 -7 -17 0 Q-25 -7 -34 0 Z", col, 2, { f: C.lilac }) + P("M0 -32 V26 q0 7 -7 7", col, 3);
  }
  function bell(col) {
    return P("M-11 8 Q-11 -12 0 -12 Q11 -12 11 8 L14 11 H-14 Z", col, 2.5, { f: C.amber }) + O(0, 14, 3.5, col);
  }
  function gavel(col) {
    return G(R(-14, -7, 28, 14, col, { rx: 3 }) + R(-3, 7, 6, 22, col, { rx: 2 }), "rotate(-35)") + R(-18, 26, 36, 6, C.ink, { rx: 2 });
  }
  function speech(w, h, col) {
    return P("M" + -w / 2 + " " + -h / 2 + " H" + w / 2 + " V" + h / 2 + " H-6 L-16 " + (h / 2 + 12) + " L-16 " + h / 2 + " H" + -w / 2 + " Z", col, 2, { f: C.white });
  }
  function bars3(vals, cols, x0, base, bw, gap, scale) {
    var s = "";
    vals.forEach(function (v, i) { s += R(x0 + i * (bw + gap), base - v * scale, bw, v * scale, cols[i], { rx: 3 }); });
    return s;
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function V(S, key, on, extra) {
    var p = { o: on ? 1 : 0, s: on ? 1 : 0.86 };
    if (extra) for (var q in extra) p[q] = extra[q];
    S(key, p);
  }
  function reduced() {
    try { return !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; }
  }
  function nowMs() { return W.performance && W.performance.now ? W.performance.now() : Date.now(); }
  var EASE = {
    io: function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; },
    out: function (t) { return 1 - Math.pow(1 - t, 3); },
    back: function (t) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }
  };
  var GSE = { io: "power3.inOut", out: "power3.out", back: "back.out(1.6)" };
  function fmtNum(v, n) {
    var x = Math.round(v), neg = x < 0, s = String(Math.abs(x)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (neg ? "\u2212" : "") + s;
  }
  /* Base stylesheet, entirely scoped under .vls-w13-<id>. */
  function baseCSS(id, bg) {
    var s = ".vls-w13-" + id;
    return [
      s + "{position:relative;width:100%;height:100%;min-height:180px;overflow:hidden;background:" + bg + ";color:#16263a;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}",
      s + ">svg{position:absolute;inset:0;width:100%;height:100%;display:block}",
      s + " text{font-family:inherit;paint-order:stroke fill}",
      s + " .mv{transform-box:fill-box;transform-origin:50% 50%}",
      s + " .mv.ob{transform-origin:50% 100%}",
      s + " .mv.ol{transform-origin:0% 50%}",
      s + " .mv.ot{transform-origin:50% 0%}",
      s + " .halo{stroke:#fbf8f1;stroke-width:5px;stroke-linejoin:round}",
      s + " .halo-d{stroke:#16263a;stroke-width:4px;stroke-linejoin:round}",
      s + " .chip.pop{animation:w13v2pop .45s cubic-bezier(.2,1.4,.4,1)}",
      s + " .chip{transform-box:fill-box;transform-origin:50% 50%}",
      s + " .bob{animation:w13v2bob 2.8s ease-in-out infinite}",
      s + " .pulse{animation:w13v2pulse 1.8s ease-in-out infinite}",
      s + " .march{animation:w13v2march 1.1s linear infinite}",
      s + " .spin{transform-box:fill-box;transform-origin:50% 50%;animation:w13v2spin 9s linear infinite}",
      s + " .sway{transform-box:fill-box;transform-origin:50% 0%;animation:w13v2sway 3.4s ease-in-out infinite}",
      s + " .walk{animation:w13v2walk 5s linear infinite}",
      s + " .drift{animation:w13v2drift 4s ease-in-out infinite}",
      s + " .blink{animation:w13v2blink 1.2s steps(2,end) infinite}",
      "@media (prefers-reduced-motion:reduce){" + s + " *{animation:none!important;transition:none!important}}"
    ].join("\n");
  }
  var KEYFRAMES = [
    "@keyframes w13v2pop{0%{transform:scale(.84);opacity:.3}100%{transform:scale(1);opacity:1}}",
    "@keyframes w13v2bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}",
    "@keyframes w13v2pulse{0%,100%{opacity:.35}50%{opacity:1}}",
    "@keyframes w13v2march{to{stroke-dashoffset:-24}}",
    "@keyframes w13v2spin{to{transform:rotate(360deg)}}",
    "@keyframes w13v2sway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}",
    "@keyframes w13v2walk{0%{transform:translateX(-40px);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateX(60px);opacity:0}}",
    "@keyframes w13v2drift{0%,100%{transform:translateX(-6px)}50%{transform:translateX(6px)}}",
    "@keyframes w13v2blink{0%{opacity:1}100%{opacity:.25}}"
  ].join("\n");

  /* ---------- scene factory ---------- */
  function scene(id, cfg) {
    var tags = cfg.tags, N = tags.length, boards = cfg.boards;
    var accent = cfg.accent || C.navy;
    var root = null, svg = null, core = null, nodes = [], last = -1, lastB = -1, ro = null, chipT = null, chipG = null;
    var DEF = { x: 0, y: 0, r: 0, s: 1, sx: 1, sy: 1, o: 1, d: 0, n: 0 };
    function boardOf(k) {
      for (var i = 0; i < boards.length; i++) if (k >= boards[i].a && k <= boards[i].b) return i;
      return boards.length - 1;
    }
    function fit() {
      if (!root || !svg) return;
      var w = root.clientWidth || CW, h = root.clientHeight || CH, a = w / Math.max(1, h), VW = CW, VH = CH;
      if (a > CW / CH) VW = Math.min(CH * a, CW * 1.35); else VH = Math.min(CW / a, CH * 1.45);
      svg.setAttribute("viewBox", "0 0 " + VW.toFixed(2) + " " + VH.toFixed(2));
      core.setAttribute("x", ((VW - CW) / 2).toFixed(2));
      core.setAttribute("y", ((VH - CH) / 2).toFixed(2));
    }
    function markup() {
      var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + CW + " " + CH + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(cfg.label) + '">' +
        '<svg class="core" x="0" y="0" width="' + CW + '" height="' + CH + '" viewBox="0 0 ' + CW + " " + CH + '" overflow="visible" style="overflow:visible">';
      PFX = "";
      s += cfg.bg();
      boards.forEach(function (bd, i) {
        PFX = "b" + i + "_";
        s += '<g class="mv bdg" data-k="B' + i + '" data-o="0">' + bd.draw() + "</g>";
      });
      PFX = "";
      s += '<g transform="translate(200 22)"><g class="chip">' + L(0, 0, tags[0], { z: 15, s: accent, f: C.ink, bg: C.paper }) + "</g></g>";
      s += M("__pg", 0, 297, R(0, -2, CW, 4, accent, { op: 0.9 }), { c: "ol" });
      return s + "</svg></svg>";
    }
    function paint(n) {
      var s = n._s;
      n.style.transform = "translate(" + s.x.toFixed(2) + "px," + s.y.toFixed(2) + "px) rotate(" + s.r.toFixed(2) + "deg) scale(" +
        (s.s * s.sx).toFixed(4) + "," + (s.s * s.sy).toFixed(4) + ")";
      n.style.opacity = String(clamp(s.o, 0, 1));
      if (n._dr) n.style.strokeDashoffset = (100 - 100 * clamp(s.d, 0, 1)).toFixed(2);
      if (n._num) n.textContent = n._pre + fmtNum(s.n) + n._suf;
    }
    function fitPill(g) {
      try {
        var t = g.querySelector("text"), r = g.querySelector("rect");
        var w = t.getComputedTextLength();
        if (!(w > 0)) return;
        var pad = Number(g.getAttribute("data-pad")) || 20, cx = Number(g.getAttribute("data-cx")) || 0;
        r.setAttribute("width", (w + pad).toFixed(1));
        r.setAttribute("x", (cx - (w + pad) / 2).toFixed(1));
      } catch (e) { /* layout not available yet */ }
    }
    function register() {
      nodes = [];
      var list = root.querySelectorAll("[data-k]");
      for (var i = 0; i < list.length; i++) {
        var n = list[i], k = n.getAttribute("data-k"), m = /^b(\d+)_/.exec(k);
        n._k = k; n._b = m ? Number(m[1]) : -1;
        n._dr = n.classList && n.classList.contains("dr");
        n._isT = n.tagName.toLowerCase() === "text";
        n._num = n._isT && n.hasAttribute("data-n");
        n._pre = n.getAttribute("data-pre") || ""; n._suf = n.getAttribute("data-suf") || "";
        n._anim = (n.classList && n.classList.contains("mv")) || n._num;
        var o0 = n.getAttribute("data-o"), d0 = n.getAttribute("data-d");
        n._d0 = {};
        for (var p in DEF) n._d0[p] = DEF[p];
        if (o0 !== null) n._d0.o = Number(o0);
        if (d0 !== null) n._d0.d = Number(d0);
        if (n._num) n._d0.n = Number(n.getAttribute("data-n")) || 0;
        n._s = {};
        for (var q in n._d0) n._s[q] = n._d0[q];
        n._t0 = n._isT && !n._num ? n.textContent : null;
        n._f0 = n.getAttribute("fill");
        n._st0 = n.getAttribute("stroke");
        n._tok = 0;
        if (n._anim) paint(n);
        nodes.push(n);
      }
      chipG = root.querySelector(".chip");
      chipT = chipG ? chipG.querySelector("text") : null;
      var pills = root.querySelectorAll(".pill");
      for (var j = 0; j < pills.length; j++) fitPill(pills[j]);
    }
    function kill(n) {
      n._tok++;
      if (W.gsap) { try { W.gsap.killTweensOf(n._s); } catch (e) { } }
    }
    function tween(n, to, dur, del, ease) {
      kill(n);
      if (W.gsap) {
        try {
          var v = {};
          for (var p in to) v[p] = to[p];
          v.duration = dur; v.delay = del; v.ease = GSE[ease] || GSE.io; v.overwrite = true;
          v.onUpdate = function () { paint(n); };
          W.gsap.to(n._s, v);
          return;
        } catch (e) { /* fall through to rAF */ }
      }
      var from = {}, tok = n._tok, t0 = nowMs() + del * 1000, ef = EASE[ease] || EASE.io;
      for (var q in to) from[q] = n._s[q];
      var raf = W.requestAnimationFrame || function (f) { return setTimeout(function () { f(nowMs()); }, 16); };
      function frame() {
        if (tok !== n._tok) return;
        var t = (nowMs() - t0) / (dur * 1000);
        if (t < 0) { raf(frame); return; }
        var e = ef(clamp(t, 0, 1));
        for (var r in to) n._s[r] = from[r] + (to[r] - from[r]) * e;
        paint(n);
        if (t < 1) raf(frame);
      }
      raf(frame);
    }
    function snap(n, to) {
      kill(n);
      for (var p in to) n._s[p] = to[p];
      paint(n);
    }
    function render(k, quick) {
      var bi = boardOf(k), bd = boards[bi], tg = {};
      function S(key, p) {
        var kk = PFX + key;
        tg[kk] = tg[kk] || {};
        for (var q in p) tg[kk][q] = p[q];
      }
      PFX = "b" + bi + "_";
      bd.view(k - bd.a, S);
      PFX = "";
      for (var j = 0; j < boards.length; j++) tg["B" + j] = { o: j === bi ? 1 : 0, s: j === bi ? 1 : 0.97, dur: 0.5, e: "out" };
      tg.__pg = { sx: (k + 1) / N, dur: 0.6 };
      var entering = bi !== lastB;
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (n._b >= 0 && n._b !== bi) continue;
        if (entering && n._b === bi) snap(n, n._d0);
        var t = tg[n._k] || {}, num = {}, diff = false;
        for (var p in n._d0) {
          var v = t[p] !== undefined ? t[p] : n._d0[p];
          num[p] = v;
          if (Math.abs(n._s[p] - v) > 1e-4) diff = true;
        }
        if (n._t0 !== null) {
          var txt = t.t !== undefined ? String(t.t) : n._t0;
          if (n.textContent !== txt) {
            n.textContent = txt;
            if (n.parentNode && n.parentNode.classList && n.parentNode.classList.contains("pill")) fitPill(n.parentNode);
          }
        }
        var f = t.f !== undefined ? t.f : n._f0;
        if (f !== null && n.getAttribute("fill") !== f) n.setAttribute("fill", f);
        var st = t.st !== undefined ? t.st : n._st0;
        if (st !== null && n.getAttribute("stroke") !== st) n.setAttribute("stroke", st);
        if (!n._anim || !diff) continue;
        if (quick) snap(n, num);
        else tween(n, num, t.dur !== undefined ? t.dur : 0.8, (t.del || 0) + (entering && n._b === bi ? 0.12 : 0), t.e || "io");
      }
      if (chipT) {
        var changed = chipT.textContent !== tags[k];
        chipT.textContent = tags[k];
        fitPill(chipG.querySelector(".pill"));
        if (changed && !quick) {
          chipG.classList.remove("pop");
          void chipG.getBoundingClientRect();
          chipG.classList.add("pop");
        }
      }
      if (svg) svg.setAttribute("aria-label", cfg.label + ": " + tags[k]);
      lastB = bi;
    }
    function show(k, instant) {
      if (!root) return;
      render(k, !!instant || reduced());
      last = k;
    }
    function index(i, n) {
      var ii = Math.floor(Number(i) || 0), nn = Math.floor(Number(n) || 0);
      if (!(nn > 0)) nn = N;
      ii = clamp(ii, 0, nn - 1);
      if (nn === N) return ii;
      if (nn === 1) return 0;
      return clamp(Math.round((ii * (N - 1)) / (nn - 1)), 0, N - 1);
    }
    VLS[id] = {
      build: function (host) {
        if (!host) return;
        if (ro) { try { ro.disconnect(); } catch (e) { } ro = null; }
        root = document.createElement("div");
        root.className = "vls-w13-" + id;
        root.innerHTML = markup();
        if (typeof host.replaceChildren === "function") host.replaceChildren(root);
        else { host.innerHTML = ""; host.appendChild(root); }
        if (host.clientHeight < 60) root.style.cssText = "height:auto;aspect-ratio:4/3";
        svg = root.querySelector("svg");
        core = root.querySelector("svg.core");
        register();
        fit();
        if (W.ResizeObserver) { ro = new W.ResizeObserver(fit); ro.observe(root); }
        last = -1; lastB = -1;
        show(0, true);
      },
      step: function (i, n) {
        if (!root) return;
        var k = index(i, n);
        if (k === last) return;
        show(k, false);
      },
      reset: function () {
        if (!root) return;
        last = -1; lastB = -1;
        show(0, true);
      },
      _meta: { n: N, boards: boards.map(function (b) { return [b.a, b.b, b.tpl]; }) }
    };
    CSS.push(baseCSS(id, cfg.bgc || "#f5f0e6") + (cfg.css ? "\n" + cfg.css : ""));
  }
  function installCSS(mark) {
    var st = document.getElementById("vl-sc-w13");
    if (!st) {
      st = document.createElement("style");
      st.id = "vl-sc-w13";
      (document.head || document.documentElement).appendChild(st);
    }
    var tagm = "/*" + mark + "*/";
    if (st.textContent.indexOf(tagm) === -1) st.textContent += "\n" + tagm + "\n" + (st.textContent.indexOf("w13v2pop{") === -1 ? KEYFRAMES + "\n" : "") + CSS.join("\n");
  }
  /* Board constructor: lines a..b, benchmark template, draw(), view(b, S). */
  function BD(a, b, tpl, draw, view) { return { a: a, b: b, tpl: tpl, draw: draw, view: view }; }
  /* Full-bleed backdrop helper (paints far beyond the 400 x 300 core). */
  function backdrop(top, bottom, floorY, floor, extra) {
    var id = "g" + Math.random().toString(36).slice(2, 8);
    return "<defs>" + el("linearGradient", { id: id, x1: 0, y1: 0, x2: 0, y2: 1 },
      el("stop", { offset: 0, "stop-color": top }) + el("stop", { offset: 1, "stop-color": bottom })) + "</defs>" +
      R(-400, -300, 1200, 900, "url(#" + id + ")") + (floor ? R(-400, floorY, 1200, 600, floor) : "") + (extra || "");
  }
  /* ==================================================================
     W13O1a  GOING LIVE IS NOT THE SAME AS DELIVERING VALUE  (29 lines)
     Rebuilt in full (audit 3.7/10: 17 WEAK, 9 MISMATCH). Ten boards,
     one per idea, each showing the objects the sentence names.
     ================================================================== */
  scene("W13O1a", {
    label: "Going live is not the same as delivering value",
    accent: C.orange,
    bgc: "#f3efe6",
    bg: function () { return backdrop("#e9f0f7", "#f6f1e7", 272, "#ece3d0"); },
    tags: ["Week 13 begins", "Committee wants evidence", "620 promised, 505 tracked", "Value captured?",
      "Phase 9: Realize Value", "Implement vs realise", "Then: sustain results", "\u201CIt is running\u201D",
      "Progress, not proof", "Benefit = valued outcome", "Faster is operational", "Time is not cash",
      "Salaries still paid", "Explain the use", "The labour claim", "4 fewer, not 11",
      "A conversion question", "Change to promise", "Benefits traceability", "Start at objectives",
      "No baseline set", "Baseline: agreed start", "Other influences?", "7 of 14 recent",
      "Timing is not proof", "Same figures, two lenses", "Investigate, don't assume", "Success = proven outcomes",
      "Next: define, measure, trace"],
    boards: [
      /* 1. Lines 0-3. The live hotel process, the committee and the two figures.
         Adapted from: 076 Workflow Animation (CRM action, trigger handed on, notification)
         https://dribbble.com/shots/3791748-Workflow-Animation  */
      BD(0, 3, "076", function () {
        var s = "";
        s += E(80, 250, 58, 6, "rgba(22,38,58,.12)");
        s += M("hotel", 80, 196, hotel(C.navy, 2.2, C.teal));
        s += G(G(person(C.orange, 0.55), "translate(20 262)") + G(person(C.teal, 0.55), "translate(44 262)"), "", "walk");
        s += M("live", 80, 116, L(0, 0, "PROCESS LIVE", { z: 15, s: C.green }), { o0: 0 });
        s += M("ok", 112, 150, okb(12), { o0: 0 });
        s += M("title", 268, 120, T(0, -26, "WEEK 13", { z: 18, f: C.slate }) + T(0, 4, "REALIZE VALUE", { z: 24, f: C.navy }) +
          T(0, 34, "QASR HOSPITALITY", { z: 15, f: C.orange }));
        s += D("flow", "M118 214 C158 226 190 262 228 266", C.orange, 3);
        s += M("cmte", 0, 0, R(222, 274, 160, 12, C.ink, { rx: 3 }) + G(person(C.slate, 0.8), "translate(258 266)") +
          G(person(C.slate, 0.8), "translate(302 266)") + G(person(C.slate, 0.8), "translate(346 266)"), { o0: 0 });
        s += M("ask", 290, 150, G(doc(30, 38, C.orange), "translate(0 -46)") + L(0, 0, "EVIDENCE OF VALUE?", { z: 15, s: C.orange }), { o0: 0 });
        s += M("bp", 205, 215, R(-22, -130, 44, 130, C.navy, { rx: 3 }), { c: "ob", o0: 0 });
        s += M("bt", 290, 215, R(-22, -106, 44, 106, C.green, { rx: 3 }), { c: "ob", o0: 0 });
        s += M("vpw", 0, 0, T(205, 99, "", { z: 16, f: C.white, k: "vp", num: { v: 0, suf: "k" } }), { o0: 0 });
        s += M("vtw", 0, 0, T(290, 123, "", { z: 16, f: C.white, k: "vt", num: { v: 0, suf: "k" } }), { o0: 0 });
        s += M("lbl", 0, 0, T(205, 230, "PROMISED", { z: 13, f: C.navy }) + T(290, 230, "TRACKED", { z: 13, f: C.green }), { o0: 0 });
        s += M("gap", 0, 0, P("M183 85 H318", C.navy, 1.6, { da: "4 3" }) + R(268, 85, 44, 24, C.rose, { s: C.red, sw: 1.5, da: "3 2" }) +
          T(290, 97, "115k", { z: 13, f: C.red }), { o0: 0 });
        s += M("bc", 365, 215, R(-22, -130, 44, 130, "rgba(92,111,132,.12)", { rx: 3, s: C.slate, sw: 2, da: "5 4" }) + T(0, -65, "?", { z: 34, f: C.slate }), { o0: 0 });
        s += M("cap", 300, 60, L(0, 0, "CAPTURED VALUE?", { z: 15, s: C.slate, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("title", { o: b === 0 ? 1 : 0, y: b === 0 ? 0 : -12 });
        V(S, "live", b >= 1); V(S, "ok", b >= 1, { e: "back" });
        V(S, "cmte", b >= 1, { y: b >= 1 ? 0 : 14 });
        S("flow", { d: b >= 1 ? 1 : 0 });
        V(S, "ask", b === 1);
        var on = b >= 2;
        S("bp", { o: on ? 1 : 0, sy: on ? 1 : 0.02 });
        S("bt", { o: on ? 1 : 0, sy: on ? 1 : 0.02, del: 0.15 });
        S("vpw", { o: on ? 1 : 0 }); S("vp", { n: on ? 620 : 0, dur: 1.1 });
        S("vtw", { o: on ? 1 : 0 }); S("vt", { n: on ? 505 : 0, dur: 1.1, del: 0.15 });
        V(S, "lbl", on);
        V(S, "gap", b === 3); V(S, "bc", b === 3, { del: 0.2 }); V(S, "cap", b === 3);
      }),
      /* 2. Lines 4-6. The ten-phase route with phases 8, 9 and 10 lit in turn.
         Adapted from: 090 Multi-Step Icon Animation (activate one step after another)
         https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU  */
      BD(4, 6, "090", function () {
        var s = "", PX = [60, 130, 200, 270, 340, 340, 270, 200, 130, 60], PY = [76, 76, 76, 76, 76, 146, 146, 146, 146, 146];
        s += D("route", "M60 76 H340 Q374 76 374 111 Q374 146 340 146 H60", C.slate, 4, { d0: 0 });
        for (var i = 0; i < 10; i++) {
          s += M("p" + i, PX[i], PY[i], O(0, 0, 18, C.white, { s: C.mist, sw: 3 }) + T(0, 1, String(i + 1), { z: 16, f: C.slate }));
        }
        var LC = { 7: C.slate, 8: C.green, 9: C.teal };
        [7, 8, 9].forEach(function (i) {
          s += M("l" + i, PX[i], PY[i], O(0, 0, 19, LC[i]) + T(0, 1, String(i + 1), { z: 17, f: C.white }), { o0: 0 });
        });
        s += M("ring", 130, 146, G(O(0, 0, 27, "none", { s: C.orange, sw: 3, da: "6 5" }), "", "spin"));
        s += R(18, 194, 364, 92, C.white, { rx: 14, s: C.mist, sw: 2 });
        s += M("d0", 0, 0, O(66, 240, 27, C.green) + T(66, 241, "9", { z: 26, f: C.white }) +
          T(106, 228, "REALIZE VALUE", { z: 24, a: "start", f: C.green }) + T(106, 258, "PHASE NINE OF TEN", { z: 14, a: "start", f: C.slate }), { o0: 0 });
        s += M("d1", 0, 0, G(hotel(C.slate, 0.95), "translate(48 242)") + T(76, 228, "IMPLEMENT", { z: 16, a: "start", f: C.slate }) +
          T(76, 254, "PROCESS IN USE", { z: 13, a: "start", f: C.ink }) + P("M200 206 V274", C.mist, 2) +
          G(coin(14, C.green, "") + G(mag(10), "translate(6 -6)"), "translate(226 242)") +
          T(252, 228, "REALIZE VALUE", { z: 15, a: "start", f: C.green }) + T(252, 254, "BENEFITS REAL?", { z: 13, a: "start", f: C.ink }), { o0: 0 });
        s += M("d2", 0, 0, O(62, 240, 25, C.teal) + T(62, 241, "10", { z: 20, f: C.white }) +
          T(98, 228, "SUSTAIN RESULTS", { z: 18, a: "start", f: C.teal }) + T(98, 256, "MAINTAIN, IMPROVE", { z: 13, a: "start", f: C.slate }) +
          P("M286 266 H370 M286 266 V214", C.mist, 2), { o0: 0 });
        s += D("line", "M290 258 L310 246 L326 234 L344 228 L366 226", C.teal, 4);
        return s;
      }, function (b, S) {
        S("route", { d: 1, dur: 1.2 });
        V(S, "l8", true, { e: "back" });
        V(S, "l7", b >= 1, { e: "back" });
        V(S, "l9", b >= 2, { e: "back" });
        S("ring", { x: b === 1 ? 70 : b === 2 ? -70 : 0, dur: 0.9 });
        V(S, "d0", b === 0); V(S, "d1", b === 1); V(S, "d2", b === 2);
        S("line", { d: b === 2 ? 1 : 0, del: 0.3, dur: 1.2 });
        for (var i = 0; i < 7; i++) S("p" + i, { o: b === 0 ? 1 : 0.55 });
      }),
      /* 3. Lines 7-8. Director's progress dashboard: every property live, budget meter empty.
         Adapted from: 124 Project Dashboard (reveal data and collaborators)
         https://lottiefiles.com/free-animation/project-dashboard-PeJUc2p1iB  */
      BD(7, 8, "124", function () {
        var s = "";
        s += M("dir", 66, 238, person(C.navy, 2.3));
        s += M("say", 104, 106, speech(156, 44, C.navy) + T(0, 0, "IT IS RUNNING", { z: 16, f: C.navy }), { o0: 0 });
        s += R(178, 50, 212, 238, C.white, { rx: 12, s: C.mist, sw: 2 });
        s += T(284, 68, "14 QASR PROPERTIES", { z: 14, f: C.slate });
        for (var i = 0; i < 14; i++) {
          var x = 199 + (i % 7) * 28, y = i < 7 ? 102 : 142;
          s += M("h" + i, x, y, hotel(C.navy, 0.55), { o0: 0 });
          s += M("t" + i, x + 8, y - 14, okb(6.5), { o0: 0 });
        }
        s += T(194, 176, "PROCESS IN USE", { z: 13, a: "start", f: C.ink });
        s += R(194, 186, 182, 12, C.mist, { rx: 6 });
        s += M("m1", 194, 192, R(0, -6, 182, 12, C.green, { rx: 6 }), { c: "ol" });
        s += M("pc", 0, 0, T(376, 176, "100%", { z: 13, a: "end", f: C.green }), { o0: 0 });
        s += T(194, 216, "BUDGET IMPROVED?", { z: 13, a: "start", f: C.ink });
        s += R(194, 226, 182, 12, C.mist, { rx: 6 });
        s += M("q2", 366, 216, qb(9), { o0: 0 });
        s += M("stamp", 284, 266, stamp("PROGRESS, NOT PROOF", C.red, 14), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "say", true, { e: "back" });
        for (var i = 0; i < 14; i++) {
          V(S, "h" + i, true, { del: i * 0.05 });
          V(S, "t" + i, true, { del: 0.4 + i * 0.05, e: "back" });
        }
        S("m1", { sx: 1, dur: 1.2, del: 0.4 });
        V(S, "pc", true, { del: 1 });
        V(S, "q2", b === 1, { e: "back" });
        V(S, "stamp", b === 1, { r: b === 1 ? -4 : 0, e: "back" });
        S("dir", { r: b === 1 ? -4 : 0 });
      }),
      /* 4. Lines 9-10. Activity versus valued outcome; then operational gain versus money test.
         Adapted from: 094 Process - Success (activity transforms into a check)
         https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP  */
      BD(9, 10, "094", function () {
        var s = "";
        s += R(16, 56, 170, 222, C.white, { rx: 14, s: C.mist, sw: 2 }) + R(214, 56, 170, 222, C.white, { rx: 14, s: C.mist, sw: 2 });
        var a = T(101, 80, "ACTIVITY DONE", { z: 15, f: C.slate });
        [0, 1, 2].forEach(function (i) {
          var y = 120 + i * 40;
          a += R(36, y - 11, 22, 22, C.paper, { rx: 4, s: C.slate, sw: 2 }) + R(70, y - 4, 92 - i * 14, 8, C.mist, { rx: 4 });
        });
        s += M("A", 0, 0, a);
        [0, 1, 2].forEach(function (i) { s += D("ck" + i, "M40 " + (120 + i * 40) + " l6 7 l12 -14", C.green, 4); });
        s += M("A2", 0, 0, T(101, 252, "NOT A BENEFIT", { z: 14, f: C.red }), { o0: 0 });
        s += M("B", 0, 0, T(299, 80, "VALUED OUTCOME", { z: 15, f: C.green }) + G(trophy(C.gold, 2.4), "translate(299 160)") +
          T(299, 236, "CAUSED BY CHANGE", { z: 14, f: C.green }));
        s += M("ne", 200, 166, O(0, 0, 17, C.paper, { s: C.red, sw: 2 }) + T(0, 1, "\u2260", { z: 24, f: C.red }));
        s += M("A3", 0, 0, T(101, 80, "OPERATIONAL GAIN", { z: 13, f: C.teal }) + G(clock(40, C.teal), "translate(101 156)") +
          T(101, 230, "FASTER CHECK-IN", { z: 14, f: C.teal }), { o0: 0 });
        s += M("hand", 101, 156, P("M0 0 L0 -30", C.orange, 4), { o0: 0 });
        s += M("B3", 0, 0, T(299, 80, "FINANCIAL EFFECT", { z: 14, f: C.navy }) + G(coin(34, C.gold, "AED", 16), "translate(299 154)") +
          G(mag(16, C.ink), "translate(324 176)") + T(299, 230, "SEPARATE TEST", { z: 14, f: C.navy }), { o0: 0 });
        s += D("div", "M200 70 V266", C.slate, 3, { c: "" });
        s += M("q3", 299, 252, L(0, 0, "NOT YET SHOWN", { z: 13, s: C.orange }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("A", { o: b === 0 ? 1 : 0 }); S("B", { o: b === 0 ? 1 : 0 });
        [0, 1, 2].forEach(function (i) { S("ck" + i, { d: b === 0 ? 1 : 0, del: 0.2 + i * 0.25, o: b === 0 ? 1 : 0 }); });
        V(S, "A2", b === 0, { del: 1 });
        V(S, "A3", b === 1); V(S, "B3", b === 1, { del: 0.15 }); V(S, "q3", b === 1, { del: 0.5 });
        S("hand", { o: b === 1 ? 1 : 0, r: b === 1 ? 300 : 0, dur: 1.6 });
        S("ne", { o: b === 0 ? 1 : 0, s: b === 0 ? 1 : 0.6 });
        S("div", { d: b === 1 ? 1 : 0 });
      }),
      /* 5. Lines 11-13. Time enters a conversion machine; nothing comes out by itself.
         Adapted from: 103 Data Factory Animation (inputs fed, converted outputs emitted)
         https://lottiefiles.com/free-animation/data-factory-animation-I6dMAfEyrl  */
      BD(11, 13, "103", function () {
        var s = "";
        s += R(14, 134, 160, 10, C.slate, { rx: 5 }) + P("M18 139 H170", C.white, 2, { da: "6 8", c: "march" });
        s += G(G(clock(12, C.teal), "translate(40 118)") + G(clock(12, C.teal), "translate(84 118)") + G(clock(12, C.teal), "translate(128 118)"), "", "drift");
        s += T(80, 92, "TIME RELEASED", { z: 14, f: C.teal });
        s += R(174, 74, 84, 80, C.ink, { rx: 10 }) + T(216, 92, "CONVERT", { z: 13, f: C.white });
        s += G(G(gear(13, C.gold), "", "spin"), "translate(216 126)");
        s += P("M258 114 H300", C.slate, 3, { da: "5 5" });
        s += R(300, 62, 86, 94, C.white, { rx: 10, s: C.navy, sw: 2 }) + T(343, 80, "BUDGET", { z: 14, f: C.navy });
        s += R(316, 96, 54, 50, C.blue, { rx: 4 }) + R(316, 96, 54, 50, "none", { rx: 4, s: C.navy, sw: 1.5 });
        s += M("same", 343, 121, T(0, 0, "SAME", { z: 14, f: C.navy }));
        s += M("blk", 279, 114, nob(11), { o0: 0 });
        s += M("tc", 200, 180, L(0, 0, "TIME \u2260 CASH", { z: 16, s: C.red }), { o0: 0 });
        s += M("staff", 0, 0, G(person(C.navy, 1.05), "translate(46 262)") + G(person(C.navy, 1.05), "translate(104 262)") +
          G(person(C.orange, 0.8), "translate(75 266)") + G(person(C.orange, 0.8), "translate(133 266)") +
          L(90, 214, "EXTRA SERVICE", { z: 14, s: C.teal }), { o0: 0 });
        s += D("pay", "M343 158 C343 220 250 250 176 258", C.gold, 3, { c: "" });
        s += M("coins", 0, 0, G(coin(8, C.gold, "") , "translate(300 222)") + G(coin(8, C.gold, ""), "translate(250 246)") +
          L(300, 274, "SALARIES STILL PAID", { z: 13, s: C.gold, f: C.ink }), { o0: 0 });
        s += M("mgr", 214, 214, person(C.green, 1.2) + G(doc(22, 28, C.green), "translate(22 2)"), { o0: 0 });
        s += M("exp", 300, 222, L(0, 0, "EXPLAIN USE FIRST", { z: 14, s: C.green }), { o0: 0 });
        s += M("sav", 343, 121, stamp("SAVING?", C.orange, 13), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "blk", b <= 1, { e: "back" });
        V(S, "tc", b === 0, { del: 0.3 });
        V(S, "staff", b >= 1);
        S("pay", { d: b === 1 ? 1 : 0, dur: 1.2 });
        V(S, "coins", b === 1, { del: 0.5 });
        V(S, "mgr", b === 2, { x: b === 2 ? 0 : -20 });
        V(S, "exp", b === 2, { del: 0.3 });
        S("same", { o: b === 2 ? 0 : 1 });
        V(S, "sav", b === 2, { r: -8, del: 0.6 });
      }),
      /* 6. Lines 14-16. Eleven assumed departures, four real ones, a conversion question.
         Adapted from: 109 teamwork (people appear and form a team)
         https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6  */
      BD(14, 16, "109", function () {
        var s = "";
        s += M("claim", 200, 56, L(0, 0, "LABOUR CLAIM AED 240k", { z: 16, s: C.navy }));
        s += R(16, 176, 368, 16, C.navy, { rx: 4 }) + R(16, 192, 368, 5, C.ink, { rx: 2 });
        for (var i = 0; i < 11; i++) {
          var x = 34 + i * 33.2;
          s += M("ol" + i, x, 158, person("rgba(192,80,42,.0)", 0.95) + P("M-12.4 13.3 Q-12.4 -3.8 0 -3.8 Q12.4 -3.8 12.4 13.3 Z", C.orange, 1.6, { da: "3 3" }), { o0: 0 });
          s += M("pp" + i, x, 158, person(C.navy, 0.95));
        }
        s += M("br", 0, 0, P("M24 116 V108 H366 V116", C.orange, 2.5) + L(195, 106, "11 ASSUMED TO GO", { z: 14, s: C.orange }), { o0: 0 });
        s += M("n11", 104, 238, T(0, 0, "11", { z: 44, f: C.orange }) + T(0, 34, "ASSUMED FEWER", { z: 13, f: C.orange }), { o0: 0 });
        s += M("n4", 296, 238, T(0, 0, "4", { z: 44, f: C.green }) + T(0, 34, "ACTUALLY FEWER", { z: 13, f: C.green }), { o0: 0 });
        s += M("conv", 200, 238, L(0, 0, "CONVERSION?", { z: 15, s: C.teal }), { o0: 0 });
        s += M("fail", 200, 106, stamp("CLAIM FAILED", C.slate, 15) + P("M-70 -2 L70 2", C.red, 4), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 11; i++) {
          var gone = b >= 1 && i < 4;
          V(S, "ol" + i, b >= 1, { del: i * 0.04 });
          S("pp" + i, { o: gone ? 0.08 : 1, x: gone ? 14 : 0, y: gone ? -6 : 0, del: gone ? 0.5 + i * 0.12 : 0 });
        }
        V(S, "br", b === 1);
        V(S, "n11", b >= 1); V(S, "n4", b >= 1, { del: 0.6 });
        V(S, "conv", b === 2, { e: "back" });
        V(S, "fail", b === 2, { r: -5, del: 0.3 });
        S("claim", { s: b === 0 ? 1.08 : 1 });
      }),
      /* 7. Lines 17-18. Connect the change to the promise, then trace a claim back node by node.
         Adapted from: 111 Hierarchy traversal animated (visit one node, then the next)
         https://old.observablehq.com/@d3/hierarchy-traversal-animated  */
      BD(17, 18, "111", function () {
        var s = "";
        s += M("two", 0, 0, O(92, 150, 46, C.white, { s: C.teal, sw: 4 }) + G(gear(20, C.teal), "translate(92 150)") +
          T(92, 214, "OPERATIONAL", { z: 14, f: C.teal }) + T(92, 232, "CHANGE", { z: 14, f: C.teal }) +
          O(308, 150, 46, C.white, { s: C.navy, sw: 4 }) + G(target(24, C.navy), "translate(308 150)") +
          T(308, 214, "PROMISED", { z: 14, f: C.navy }) + T(308, 232, "OUTCOME", { z: 14, f: C.navy }));
        s += D("link", "M140 150 H260", C.orange, 4);
        s += M("lq", 200, 150, G(mag(16, C.ink), "translate(-6 -6)"), { o0: 0 });
        s += M("lp", 200, 104, L(0, 0, "CONNECTED?", { z: 15, s: C.orange }), { o0: 0 });
        var NX = [52, 150, 250, 348], NC = [C.navy, C.green, C.teal, C.orange];
        var NL = [["STRATEGIC", "OBJECTIVE"], ["EXPECTED", "BENEFIT"], ["OPERATIONAL", "MEASURE"], ["FINANCIAL", "EVIDENCE"]];
        var IC = [flag(C.navy, 1), target(15, C.green), clock(15, C.teal), doc(22, 28, C.orange)];
        s += D("chain", "M52 140 H348", C.ink, 3);
        for (var i = 0; i < 4; i++) {
          s += M("n" + i, NX[i], 140, O(0, 0, 30, C.white, { s: NC[i], sw: 4 }) + G(IC[i], i === 0 ? "translate(-6 14)" : "") +
            T(0, 50, NL[i][0], { z: 13, f: NC[i] }) + T(0, 67, NL[i][1], { z: 13, f: NC[i] }), { o0: 0 });
        }
        s += M("tok", 348, 92, coin(15, C.gold, "CLAIM", 8), { o0: 0 });
        s += M("tp", 200, 250, L(0, 0, "TRACE IT BACK", { z: 15, s: C.ink, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("two", { o: b === 0 ? 1 : 0, s: b === 0 ? 1 : 0.9 });
        S("link", { d: b === 0 ? 1 : 0, o: b === 0 ? 1 : 0 });
        V(S, "lq", b === 0, { x: b === 0 ? 30 : -30, del: 0.6, dur: 1.4 });
        V(S, "lp", b === 0, { del: 0.4 });
        S("chain", { d: b === 1 ? 1 : 0, dur: 1 });
        for (var i = 0; i < 4; i++) V(S, "n" + i, b === 1, { del: 0.15 + (3 - i) * 0.35, e: "back" });
        V(S, "tok", b === 1);
        S("tok", { o: b === 1 ? 1 : 0, x: b === 1 ? -296 : 0, dur: 1.8, del: 0.3 });
        V(S, "tp", b === 1, { del: 1.4 });
      }),
      /* 8. Lines 19-22. Benefit management starts when objectives are agreed; baseline; other influences.
         Adapted from: 130 Animated line chart lesson (trace a time series left to right)
         https://observablehq.com/@d3/learn-d3-animation  */
      BD(19, 22, "130", function () {
        var s = "";
        s += P("M40 70 V236 H378", C.ink, 2.5);
        s += T(44, 62, "MEASURED RESULT", { z: 13, a: "start", f: C.slate });
        s += P("M232 76 V236", C.slate, 2, { da: "5 5" }) + T(232, 252, "GO-LIVE", { z: 13, f: C.slate });
        s += M("flg", 62, 236, flag(C.green, 1.2));
        s += M("start", 92, 262, L(0, 0, "OBJECTIVES AGREED", { z: 13, s: C.green }), { o0: 0 });
        s += M("late", 322, 278, L(0, 0, "AFTER GO-LIVE", { z: 13, s: C.red }) + P("M-58 0 H58", C.red, 3), { o0: 0 });
        s += D("pre", "M62 192 L100 188 L140 193 L180 189 L232 191", C.navy, 4);
        s += D("preg", "M62 192 L100 188 L140 193 L180 189 L232 191", C.mist, 4);
        s += D("post", "M232 191 L262 176 L292 160 L322 146 L362 132", C.green, 4);
        s += M("nob", 140, 162, L(0, 0, "NO BASELINE", { z: 14, s: C.red }), { o0: 0 });
        s += M("q", 362, 112, qb(12), { o0: 0 });
        s += M("base", 0, 0, P("M44 191 H372", C.navy, 2.5, { da: "8 5" }) + L(136, 168, "AGREED BASELINE", { z: 13, s: C.navy }), { o0: 0 });
        s += M("delta", 0, 0, P("M370 191 H376 V132 H370", C.green, 3) + T(372, 112, "CHANGE", { z: 13, a: "end", f: C.green }), { o0: 0 });
        s += M("inf", 0, 0, L(300, 100, "PRICE SHIFT", { z: 13, s: C.orange }) + arrowH(300, 113, 306, 150, C.orange, 3) +
          L(150, 112, "DEMAND SHIFT", { z: 13, s: C.plum }) + arrowH(196, 120, 266, 166, C.plum, 3), { o0: 0 });
        s += M("infq", 300, 66, L(0, 0, "OTHER CAUSES?", { z: 13, s: C.ink, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("flg", { s: b === 0 ? 1.15 : 1 });
        V(S, "start", b === 0); V(S, "late", b === 0, { del: 0.4 });
        S("pre", { d: b >= 2 ? 1 : 0 });
        S("preg", { d: b === 1 ? 1 : 0, o: b === 1 ? 0.8 : 0 });
        S("post", { d: b >= 1 ? 1 : 0, del: 0.2 });
        V(S, "nob", b === 1); V(S, "q", b === 1, { e: "back", del: 0.6 });
        V(S, "base", b >= 2); V(S, "delta", b === 2, { del: 0.5 });
        V(S, "inf", b === 3); V(S, "infq", b === 3, { del: 0.4 });
      }),
      /* 9. Lines 23-26. Fourteen go-live dates, seven recent; timing is not proof; two lenses.
         Adapted from: 136 Project TimeLine (advance along time markers)
         https://motionarray.com/after-effects-templates/project-timeline-2424919/  */
      BD(23, 26, "136", function () {
        var s = "";
        s += P("M24 122 H376", C.ink, 3);
        for (var m = 0; m < 12; m++) s += P("M" + (30 + m * 31) + " 116 V128", C.ink, 2);
        s += T(371, 140, "NOW", { z: 13, a: "end", f: C.ink });
        s += M("br", 0, 0, P("M266 64 V58 H374 V64", C.orange, 2.5) + L(320, 50, "LAST 4 MONTHS", { z: 13, s: C.orange }), { o0: 0 });
        var HX = [44, 70, 96, 128, 160, 194, 228, 270, 296, 322, 348, 283, 309, 335], HY = [104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 80, 80, 80];
        for (var i = 0; i < 14; i++) s += M("h" + i, HX[i], HY[i], hotel(i >= 7 ? C.orange : C.navy, 0.56), { o0: 0 });
        s += M("info", 0, 0, T(130, 204, "7", { z: 64, f: C.orange }) + T(250, 186, "OF 14 PROPERTIES", { z: 16, f: C.ink }) +
          T(250, 212, "LIVE UNDER 4 MONTHS", { z: 16, f: C.orange }) + P("M168 174 V236", C.mist, 2), { o0: 0 });
        s += M("hg", 112, 214, hourglass(C.orange, 1.5), { o0: 0 });
        s += M("tp", 252, 214, L(0, 0, "TIMING \u2260 PROOF", { z: 16, s: C.red }), { o0: 0 });
        s += M("dA", 58, 264, person(C.navy, 1.25) + L(30, -46, "TIMING VIEW", { z: 13, s: C.navy }), { o0: 0 });
        s += M("dB", 342, 264, person(C.orange, 1.25) + L(-30, -46, "EVIDENCE VIEW", { z: 13, s: C.orange }), { o0: 0 });
        s += M("card", 200, 250, R(-52, -24, 104, 48, C.white, { rx: 10, s: C.ink, sw: 2 }) + T(0, -6, "620 \u00B7 505", { z: 17, f: C.ink }) +
          T(0, 13, "SAME FIGURES", { z: 11, f: C.slate }), { o0: 0 });
        s += M("mg", 200, 246, mag(22, C.ink), { o0: 0 });
        s += M("inv", 200, 184, L(0, 0, "INVESTIGATE FIRST", { z: 15, s: C.ink, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 14; i++) V(S, "h" + i, true, { del: i * 0.07, y: 0, e: "back" });
        V(S, "br", true, { del: 0.9 });
        V(S, "info", b === 0, { del: 1.1 });
        V(S, "hg", b === 1, { r: b === 1 ? 180 : 0, dur: 1.2 }); V(S, "tp", b === 1, { del: 0.3 });
        V(S, "dA", b >= 2, { x: b >= 2 ? 0 : -20 }); V(S, "dB", b >= 2, { x: b >= 2 ? 0 : 20 });
        V(S, "card", b >= 2, { del: 0.2 });
        V(S, "mg", b === 3, { x: b === 3 ? 18 : -60, r: -10, dur: 1.2 });
        V(S, "inv", b === 3, { del: 0.3 });
      }),
      /* 10. Lines 27-28. Success is redefined; next: define, measure, trace.
         Adapted from: 120 Animated Dashboards (transition between dashboard panels)
         https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ  */
      BD(27, 28, "120", function () {
        var s = "";
        s += M("hd", 200, 64, T(0, 0, "SUCCESS MEANS", { z: 18, f: C.slate }));
        s += M("old", 112, 164, R(-82, -62, 164, 124, C.white, { rx: 12, s: C.slate, sw: 2 }) +
          R(-56, -34, 16, 16, C.paper, { s: C.slate, sw: 2 }) + R(-30, -30, 74, 8, C.mist, { rx: 4 }) +
          R(-56, -6, 16, 16, C.paper, { s: C.slate, sw: 2 }) + R(-30, -2, 60, 8, C.mist, { rx: 4 }) +
          T(0, 38, "TASKS COMPLETED", { z: 14, f: C.slate }));
        s += M("strike", 112, 202, P("M-74 0 H74", C.red, 4), { o0: 0 });
        s += M("new", 290, 164, R(-86, -66, 172, 132, C.pale, { rx: 12, s: C.green, sw: 3 }) + G(shield(1.6, C.green, C.white), "translate(0 -16)") +
          G(tick(1.1, C.green, 4), "translate(0 -16)") + T(0, 40, "OUTCOMES DEFENDED", { z: 14, f: C.green }), { o0: 0 });
        s += D("path", "M70 180 C140 136 260 224 330 180", C.ink, 4, { c: "" });
        var ST = [["DEFINE", target(18, C.navy), 70], ["MEASURE", clock(18, C.teal), 200], ["TRACE", O(-7, 0, 9, "none", { s: C.orange, sw: 4 }) + O(7, 0, 9, "none", { s: C.orange, sw: 4 }), 330]];
        ST.forEach(function (t, i) {
          s += M("st" + i, t[2], 180, O(0, 0, 40, C.white, { s: C.ink, sw: 3 }) + G(t[1], "scale(1.35)") + T(0, 62, t[0], { z: 18, f: C.ink }), { o0: 0 });
        });
        s += M("nx", 200, 84, L(0, 0, "NEXT DISCUSSION", { z: 17, s: C.orange }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("hd", { o: b === 0 ? 1 : 0 });
        S("old", { o: b === 0 ? 0.6 : 0, x: b === 0 ? -6 : -40, s: b === 0 ? 0.94 : 0.8 });
        V(S, "strike", b === 0, { sx: b === 0 ? 1 : 0.1, del: 0.4 });
        V(S, "new", b === 0, { x: b === 0 ? 0 : 40, del: 0.6, e: "back" });
        S("path", { d: b === 1 ? 1 : 0, dur: 1.2 });
        for (var i = 0; i < 3; i++) V(S, "st" + i, b === 1, { del: 0.3 + i * 0.35, e: "back" });
        V(S, "nx", b === 1);
      })
    ]
  });
  /* ==================================================================
     W13O1b  THE PROMISE, THE BASELINE AND THE MEASURED RESULT  (27 lines)
     Rebuilt (audit 4.5/10: 16 WEAK, 6 MISMATCH). Nine boards that walk
     the evidence chain phase by phase, then return to Qasr's figures.
     ================================================================== */
  scene("W13O1b", {
    label: "The promise, the baseline and the measured result",
    accent: C.green,
    bgc: "#eef3f1",
    bg: function () { return backdrop("#e6f0ec", "#f5f2ea", 274, "#e6e0cf"); },
    tags: ["Two figures to explain", "620 promised, 505 tracked", "Measurable and defensible", "The journey starts early",
      "Phase 1: Strategy", "Objective, not activity", "Done is not achieved", "Measure the outcome",
      "The baseline", "Phase 3: Launch Pad", "No baseline, no measure", "Other influences?",
      "Phase 5: Innovate", "A realistic estimate", "Case versus commitment", "Keep the reasoning",
      "Phase 9: Realize Value", "Can we recognise it?", "620: a reference point", "505: needs evidence",
      "115: what explains it?", "Seven recent go-lives", "Timing or reconciliation?", "Both questions matter",
      "Traceability links it all", "A missing link", "Next: different evidence"],
    boards: [
      /* 1. Lines 0-2. Two figure cards that refuse to line up; then the funnel to a defensible benefit.
         Adapted from: 115 Infographics For Everything (full-screen graphic and text brought into view)
         https://motionarray.com/after-effects-templates/infographics-for-everything-2593374/  */
      BD(0, 2, "115", function () {
        var s = "";
        s += M("ca", 108, 136, R(-84, -64, 168, 128, C.white, { rx: 14, s: C.navy, sw: 3 }) + T(0, -46, "AED", { z: 14, f: C.slate }) +
          T(0, 2, "", { z: 42, f: C.navy, k: "na", num: { v: 0, suf: "k" } }) + T(0, 48, "PROMISED", { z: 16, f: C.navy }));
        s += M("cb", 292, 136, R(-84, -64, 168, 128, C.white, { rx: 14, s: C.green, sw: 3 }) + T(0, -46, "AED", { z: 14, f: C.slate }) +
          T(0, 2, "", { z: 42, f: C.green, k: "nb", num: { v: 0, suf: "k" } }) + T(0, 48, "TRACKED", { z: 16, f: C.green }));
        s += M("crk", 200, 136, qb(15, C.red));
        s += M("hard", 200, 236, L(0, 0, "HARD TO RECONCILE", { z: 16, s: C.red }), { o0: 0 });
        s += M("subA", 108, 222, L(0, 0, "PER YEAR", { z: 14, s: C.navy }), { o0: 0 });
        s += M("subB", 292, 222, L(0, 0, "REPORTED SO FAR", { z: 14, s: C.green }), { o0: 0 });
        s += M("fun", 0, 0, P("M40 214 H360 L330 262 H70 Z", "none", 0, { f: "rgba(47,125,95,.10)" }) +
          L(74, 238, "BENEFIT", { z: 14, s: C.slate, f: C.ink }) + arrowH(118, 238, 140, 238, C.ink, 3) +
          L(200, 238, "MEASURABLE", { z: 14, s: C.teal }) + arrowH(260, 238, 274, 238, C.ink, 3) +
          L(330, 238, "DEFENSIBLE", { z: 14, s: C.green }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("na", { n: 620, dur: 1 }); S("nb", { n: 505, dur: 1, del: 0.2 });
        S("ca", { r: b === 0 ? -4 : 0, y: b === 2 ? -26 : 0, s: b === 2 ? 0.86 : 1 });
        S("cb", { r: b === 0 ? 4 : 0, y: b === 2 ? -26 : 0, s: b === 2 ? 0.86 : 1 });
        S("crk", { o: b <= 1 ? 1 : 0, y: b === 2 ? -26 : 0 });
        V(S, "hard", b === 0, { del: 0.4 });
        V(S, "subA", b === 1); V(S, "subB", b === 1, { del: 0.2 });
        V(S, "fun", b === 2, { y: b === 2 ? 0 : 16, del: 0.2 });
      }),
      /* 2. Lines 3-4. The benefits journey road starts long before go-live; phase 1 plants the objective.
         Adapted from: 081 Clean Workflow Visualization with Motion Graphics (journey steps joined by transitions)
         https://dribbble.com/shots/27600376-Clean-Workflow-Visualization-with-Motion-Graphics  */
      BD(3, 4, "081", function () {
        var s = "";
        s += P("M20 176 H380", "#d9cfbb", 22);
        s += D("rd", "M20 176 H380", C.white, 3);
        var MK = [[44, "OBJECTIVE", C.navy], [122, "BASELINE", C.teal], [200, "ESTIMATE", C.gold], [278, "RESULT", C.orange], [356, "VERIFIED", C.green]];
        MK.forEach(function (m, i) {
          s += M("m" + i, m[0], 176, O(0, 0, 16, C.white, { s: m[2], sw: 4 }) + O(0, 0, 6, m[2]) + T(0, 36, m[1], { z: 14, f: m[2] }), { o0: 0 });
        });
        s += M("gl", 239, 176, O(0, 0, 13, C.paper, { s: C.slate, sw: 2 }) + G(gear(8, C.slate), "", "spin"), { o0: 0 });
        s += M("glp", 239, 136, L(0, 0, "GO-LIVE", { z: 14, s: C.slate }) + P("M0 12 V24", C.slate, 2), { o0: 0 });
        s += M("walk", 44, 146, person(C.ink, 1));
        s += M("early", 130, 82, L(0, 0, "STARTS BEFORE GO-LIVE", { z: 15, s: C.orange }) + arrowH(-60, 14, -82, 52, C.orange, 3), { o0: 0 });
        s += M("fl", 50, 162, flag(C.navy, 1.6), { o0: 0 });
        s += M("p1", 62, 84, O(0, 0, 20, C.navy) + T(0, 1, "1", { z: 20, f: C.white }), { o0: 0 });
        s += M("obj", 190, 84, R(-100, -30, 200, 60, C.white, { rx: 12, s: C.navy, sw: 2.5 }) + T(0, -10, "LOWER COST,", { z: 16, f: C.navy }) +
          T(0, 12, "SAME SERVICE", { z: 16, f: C.navy }), { o0: 0 });
        s += M("os", 200, 256, L(0, 0, "ORGANIZATION STRATEGY", { z: 15, s: C.navy }), { o0: 0 });
        s += M("bw", 200, 256, L(0, 0, "WHAT SHOULD IT ACHIEVE?", { z: 15, s: C.ink, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("rd", { d: 1, dur: 1.4 });
        for (var i = 0; i < 5; i++) V(S, "m" + i, true, { del: 0.2 + i * 0.18, e: "back" });
        V(S, "gl", true, { del: 0.9 }); V(S, "glp", b === 0, { del: 1 });
        V(S, "early", b === 0, { del: 1.1 });
        V(S, "bw", b === 0, { del: 1.3 });
        S("walk", { o: b === 0 ? 1 : 0 });
        V(S, "fl", b === 1, { y: b === 1 ? 0 : -30, e: "back" });
        V(S, "p1", b === 1); V(S, "obj", b === 1, { del: 0.3 }); V(S, "os", b === 1, { del: 0.5 });
      }),
      /* 3. Lines 5-7. Objective versus activity: the checklist completes, the arrow can still miss.
         Adapted from: 117 Infographics Elements by TarZanchik (shapes and data revealed in turn)
         https://motionarray.com/after-effects-templates/infographics-elements-789489/  */
      BD(5, 7, "117", function () {
        var s = "";
        s += M("cl", 0, 0, R(14, 54, 178, 228, C.white, { rx: 14, s: C.green, sw: 3 }) + T(103, 76, "BUSINESS RESULT", { z: 15, f: C.green }) +
          T(103, 226, "LOWER COST,", { z: 14, f: C.ink }) + T(103, 246, "SAME SERVICE", { z: 14, f: C.ink }));
        s += M("cr", 0, 0, R(208, 54, 178, 228, C.white, { rx: 14, s: C.slate, sw: 2 }) + T(297, 76, "ACTIVITY", { z: 15, f: C.slate }) +
          G(G(gear(18, C.slate), "", "spin"), "translate(297 116)"));
        [0, 1, 2].forEach(function (i) {
          var y = 166 + i * 30;
          s += R(228, y - 10, 20, 20, C.paper, { rx: 4, s: C.slate, sw: 2 }) + R(258, y - 4, 102 - i * 18, 8, C.mist, { rx: 4 });
          s += D("ck" + i, "M232 " + y + " l5 6 l11 -13", C.green, 4);
        });
        s += M("tgt", 103, 150, target(46, C.green));
        s += M("arr", 103, 150, P("M-50 -28 L-4 -2", C.ink, 4) + P("M-4 -2 L-16 -2 M-4 -2 L-6 -14", C.ink, 4));
        s += M("hit", 103, 150, okb(13), { o0: 0 });
        s += M("miss", 166, 104, qb(13), { o0: 0 });
        s += M("mne", 297, 262, L(0, 0, "MEANS, NOT END", { z: 13, s: C.slate }), { o0: 0 });
        s += M("done", 200, 274, stamp("DONE \u2260 ACHIEVED", C.red, 15), { o0: 0 });
        s += M("bunt", 0, 0, P("M214 100 Q297 130 380 100", C.ink, 1.5) + [0, 1, 2, 3, 4].map(function (i) {
          var x = 230 + i * 34, y = 106 + (i === 0 || i === 4 ? 0 : 10);
          return P("M" + (x - 8) + " " + y + " L" + (x + 8) + " " + y + " L" + x + " " + (y + 16) + " Z", "none", 0, { f: [C.orange, C.gold, C.teal, C.plum, C.orange][i] });
        }).join("") + P("M220 92 L376 138", C.red, 4), { o0: 0 });
        s += M("gauge", 103, 140, P("M-44 10 A44 44 0 0 1 44 10", C.teal, 8) + P("M0 10 L26 -22", C.ink, 4) + O(0, 10, 6, C.ink), { o0: 0 });
        s += M("meas", 103, 196, L(0, 0, "MEASURE OUTCOMES", { z: 13, s: C.teal }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("cl", { s: b === 0 ? 1.03 : 1 });
        S("cr", { o: b === 2 ? 0.55 : 1 });
        [0, 1, 2].forEach(function (i) { S("ck" + i, { d: b >= 1 ? 1 : 0, del: 0.2 + i * 0.25 }); });
        S("arr", { x: b === 1 ? 34 : 0, y: b === 1 ? -26 : 0, o: b === 2 ? 0 : 1, dur: 0.9 });
        S("tgt", { o: b === 2 ? 0 : 1 });
        V(S, "hit", b === 0, { del: 0.5, e: "back" });
        V(S, "miss", b === 1, { del: 0.7, e: "back" });
        V(S, "mne", b === 0, { del: 0.3 });
        V(S, "done", b === 1, { r: -4, del: 1 });
        V(S, "bunt", b === 2);
        V(S, "gauge", b === 2, { del: 0.3 });
        S("gauge", { o: b === 2 ? 1 : 0, r: 0 });
        V(S, "meas", b === 2, { del: 0.5 });
        S("cl", { o: 1 });
      }),
      /* 4. Lines 8-11. The baseline stake: placed, documented at Launch Pad, missing, then tested.
         Adapted from: 138 Scrolling Timeline (dates scroll, then settle on an event)
         https://motionarray.com/after-effects-templates/scrolling-timeline-1223172/  */
      BD(8, 11, "138", function () {
        var s = "";
        s += P("M16 240 H384", C.ink, 3);
        s += M("stake", 96, 240, R(-6, -78, 12, 78, C.navy, { rx: 2 }) + P("M6 -74 L36 -66 L6 -58 Z", "none", 0, { f: C.navy }), { o0: 0 });
        s += M("ghost", 96, 240, R(-6, -78, 12, 78, "none", { rx: 2, s: C.slate, sw: 2, da: "4 3" }), { o0: 0 });
        s += M("lvl", 0, 0, P("M96 176 H372", C.navy, 2.5, { da: "8 5" }) + T(220, 164, "BEFORE", { z: 14, a: "start", f: C.navy }), { o0: 0 });
        s += M("bp", 170, 112, L(0, 0, "AGREED STARTING POINT", { z: 15, s: C.navy }), { o0: 0 });
        s += M("p3", 290, 78, O(-66, 0, 20, C.teal) + T(-66, 1, "3", { z: 20, f: C.white }) + T(-38, 0, "LAUNCH PAD", { z: 18, a: "start", f: C.teal }), { o0: 0 });
        s += M("clip", 168, 196, R(-30, -36, 60, 72, C.white, { rx: 6, s: C.teal, sw: 2.5 }) + R(-12, -42, 24, 10, C.teal, { rx: 3 }) +
          P("M-18 -16 H18 M-18 -4 H12 M-18 8 H18 M-18 20 H8", C.teal, 3, { op: 0.7 }), { o0: 0 });
        s += M("cond", 290, 140, L(0, 0, "STARTING CONDITIONS", { z: 15, s: C.teal }), { o0: 0 });
        s += M("after", 316, 240, R(-26, -114, 52, 114, C.green, { rx: 4 }) + T(0, -128, "AFTER", { z: 14, f: C.green }), { c: "ob", o0: 0 });
        s += M("qq", 210, 92, L(0, 0, "HOW MUCH CHANGE?", { z: 16, s: C.red }), { o0: 0 });
        s += M("qb", 360, 150, qb(13), { o0: 0 });
        s += M("delta", 0, 0, P("M350 176 H362 V126 H350", C.green, 3) + T(366, 151, "\u0394", { z: 18, a: "start", f: C.green }), { o0: 0 });
        s += M("wind", 0, 0, G(P("M150 76 q20 -10 40 0 t40 0 M170 100 q20 -10 40 0 t40 0", C.plum, 3, { da: "10 6", c: "march" })) +
          arrowH(232, 100, 282, 130, C.plum, 3) + L(150, 128, "OTHER DEVELOPMENTS?", { z: 14, s: C.plum }), { o0: 0 });
        return s;
      }, function (b, S) {
        var has = b !== 2;
        V(S, "stake", has, { y: has ? 0 : -40, e: "back" });
        V(S, "ghost", b === 2);
        S("lvl", { o: has ? 1 : 0 });
        V(S, "bp", b === 0, { del: 0.4 });
        V(S, "p3", b === 1); V(S, "clip", b === 1, { del: 0.3, e: "back" }); V(S, "cond", b === 1, { del: 0.5 });
        S("after", { o: b >= 2 ? 1 : 0, sy: b >= 2 ? 1 : 0.02 });
        V(S, "qq", b === 2, { del: 0.4 }); V(S, "qb", b === 2, { del: 0.6 });
        V(S, "delta", b === 3, { del: 0.3 }); V(S, "wind", b === 3, { del: 0.6 });
      }),
      /* 5. Lines 12-15. Innovate: a design emerges, the estimate is reshaped, and the reason is kept.
         Adapted from: 133 Path tween (sample paths, morph geometry)
         https://observablehq.com/@d3/path-tween  */
      BD(12, 15, "133", function () {
        var s = "";
        s += M("p5", 0, 0, O(46, 66, 20, C.gold) + T(46, 67, "5", { z: 20, f: C.white }) + T(74, 66, "INNOVATE", { z: 18, a: "start", f: C.gold }));
        var bp = R(26, 92, 348, 176, "#e3edf7", { rx: 12, s: C.navy, sw: 2 });
        for (var gx = 50; gx < 374; gx += 24) bp += P("M" + gx + " 94 V266", "#c9d9ea", 1);
        for (var gy = 116; gy < 268; gy += 24) bp += P("M28 " + gy + " H372", "#c9d9ea", 1);
        s += M("bp", 0, 0, bp + T(200, 250, "EMERGING DESIGN", { z: 14, f: C.navy }));
        s += D("d1", "M60 160 h70 v40 h-70 z", C.navy, 3);
        s += D("d2", "M165 160 h70 v40 h-70 z", C.navy, 3);
        s += D("d3", "M270 160 h70 v40 h-70 z", C.navy, 3);
        s += D("d4", "M130 180 H165 M235 180 H270", C.navy, 3);
        s += M("opt", 128, 262, R(-34, -150, 68, 150, "rgba(217,152,43,.15)", { rx: 4, s: C.gold, sw: 2.5, da: "6 4" }) +
          T(0, -162, "OPTIMISTIC", { z: 14, f: C.gold }), { c: "ob", o0: 0 });
        s += M("real", 128, 262, R(-34, -100, 68, 100, C.green, { rx: 4 }) + T(0, -50, "REAL", { z: 14, f: C.white }), { c: "ob", o0: 0 });
        s += M("rl", 286, 160, L(0, -22, "REALISTIC ESTIMATE", { z: 15, s: C.green }) + T(0, 14, "WHAT THE DESIGN", { z: 13, f: C.ink }) +
          T(0, 32, "CAN DELIVER", { z: 13, f: C.ink }), { o0: 0 });
        s += M("da", 104, 168, doc(84, 108, C.slate) + T(0, 72, "EARLY", { z: 15, f: C.slate }) + T(0, 90, "BUSINESS CASE", { z: 13, f: C.slate }), { o0: 0 });
        s += M("db", 296, 168, doc(84, 108, C.green) + G(okb(14), "translate(30 -46)") + T(0, 72, "ACCEPTED", { z: 15, f: C.green }) +
          T(0, 90, "COMMITMENT", { z: 13, f: C.green }), { o0: 0 });
        s += M("ab", 200, 168, P("M-40 0 H34", C.ink, 3) + P("M24 -8 L36 0 L24 8", C.ink, 3), { o0: 0 });
        s += D("thr", "M146 130 C180 70 220 70 254 130", C.orange, 3);
        s += M("note", 200, 102, R(-50, -20, 100, 40, "#fff3b0", { rx: 3, s: "#d4b84a", sw: 1.5 }) + T(0, 1, "WHY REVISED", { z: 13, f: C.ink }), { o0: 0 });
        s += M("tr", 300, 62, L(0, 0, "TRACEABLE CHANGE", { z: 14, s: C.orange }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("p5", { s: b === 0 ? 1.08 : 1 });
        S("bp", { o: b === 0 ? 1 : 0 });
        ["d1", "d2", "d3", "d4"].forEach(function (k, i) { S(k, { d: b === 0 ? 1 : 0, o: b === 0 ? 1 : 0, del: 0.2 + i * 0.3 }); });
        S("opt", { o: b === 1 ? 1 : 0, sy: b === 1 ? 1 : 0.02 });
        S("real", { o: b === 1 ? 1 : 0, sy: b === 1 ? 1 : 0.02, del: 0.6, dur: 1.1 });
        V(S, "rl", b === 1, { del: 0.9 });
        V(S, "da", b >= 2); V(S, "db", b >= 2, { del: 0.2 }); V(S, "ab", b === 2, { del: 0.4 });
        S("thr", { d: b === 3 ? 1 : 0, dur: 1.1 });
        V(S, "note", b === 3, { del: 0.6, r: -4, e: "back" }); V(S, "tr", b === 3, { del: 0.8 });
      }),
      /* 6. Lines 16-17. Phase 9 sets actual against commitment, then asks what can be recognised.
         Adapted from: 126 Stacked-to-grouped bars (bars reposition while keeping identity)
         https://observablehq.com/@d3/stacked-to-grouped-bars  */
      BD(16, 17, "126", function () {
        var s = "";
        s += M("p9", 0, 0, O(46, 66, 20, C.green) + T(46, 67, "9", { z: 20, f: C.white }) + T(74, 66, "REALIZE VALUE", { z: 18, a: "start", f: C.green }));
        s += M("cm", 120, 250, R(-40, -150, 80, 150, "rgba(31,78,121,.08)", { rx: 4, s: C.navy, sw: 2.5, da: "7 4" }) +
          T(0, 18, "COMMITMENT", { z: 14, f: C.navy }) + G(doc(40, 50, C.navy), "translate(0 -76)") + T(0, -36, "ASSUMPTIONS", { z: 11, f: C.navy }), { c: "ob", o0: 0 });
        s += M("ac", 280, 250, R(-40, -150, 80, 150, C.pale, { rx: 4, s: C.green, sw: 2.5 }) + T(0, 18, "ACTUAL RESULT", { z: 14, f: C.green }) +
          G(mag(22, C.green), "translate(-6 -80)"), { c: "ob", o0: 0 });
        s += M("vs", 200, 176, O(0, 0, 18, C.white, { s: C.ink, sw: 2 }) + T(0, 1, "VS", { z: 13, f: C.ink }), { o0: 0 });
        s += M("gate", 200, 168, R(-70, -56, 140, 16, C.ink, { rx: 4 }) + [0, 1, 2, 3, 4, 5].map(function (i) { return R(-62 + i * 24, -40, 8, 70, C.slate, { rx: 3 }); }).join("") +
          R(-70, 30, 140, 16, C.ink, { rx: 4 }), { o0: 0 });
        s += M("gl", 200, 90, L(0, 0, "RECOGNISE?", { z: 15, s: C.ink, f: C.ink }), { o0: 0 });
        s += M("in1", 82, 150, clock(18, C.teal), { o0: 0 });
        s += M("in2", 82, 196, G(gear(14, C.slate), "", "spin"), { o0: 0 });
        s += M("tray", 320, 214, R(-56, -10, 112, 34, C.pale, { rx: 6, s: C.green, sw: 2.5 }) + G(coin(13, C.gold, ""), "translate(0 -24)") +
          T(0, 8, "BENEFIT", { z: 13, f: C.green }) + G(qb(10), "translate(42 -26)"), { o0: 0 });
        return s;
      }, function (b, S) {
        S("cm", { o: b === 0 ? 1 : 0, sy: b === 0 ? 1 : 0.02 });
        S("ac", { o: b === 0 ? 1 : 0, sy: b === 0 ? 1 : 0.02, del: 0.25 });
        V(S, "vs", b === 0, { del: 0.6, e: "back" });
        V(S, "gate", b === 1); V(S, "gl", b === 1, { del: 0.2 });
        V(S, "in1", b === 1, { x: b === 1 ? 92 : 0, del: 0.3, dur: 1.2 });
        V(S, "in2", b === 1, { x: b === 1 ? 92 : 0, del: 0.6, dur: 1.2 });
        V(S, "tray", b === 1, { del: 1 });
      }),
      /* 7. Lines 18-20. Qasr's three figures, each asked its own question.
         Adapted from: 113 Infographic Chart Creator (columns grow, axis and labels update)
         https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/  */
      BD(18, 20, "113", function () {
        var s = "", base = 250, k = 150 / 620;
        s += P("M30 " + base + " H370", C.ink, 2.5);
        s += M("b620", 96, base, R(-34, -150, 68, 150, "rgba(31,78,121,.07)", { rx: 4, s: C.navy, sw: 3, da: "8 5" }) +
          T(0, -75, "620k", { z: 18, f: C.navy }), { c: "ob" });
        s += M("f620", 96, base - 150, flag(C.navy, 1.1));
        s += M("ref", 96, 66, L(0, 0, "REFERENCE POINT", { z: 15, s: C.navy }), { o0: 0 });
        s += M("nr", 96, 268, T(0, 0, "NOT REALISED", { z: 13, f: C.red }), { o0: 0 });
        s += M("b505", 210, base, R(-34, -505 * k, 68, 505 * k, C.green, { rx: 4 }) + T(0, -60, "505k", { z: 18, f: C.white }), { c: "ob", o0: 0 });
        s += M("docs", 272, 196, G(doc(36, 46, C.slate), "translate(6 6)") + doc(36, 46, C.slate) + G(mag(13, C.ink), "translate(10 4)"), { o0: 0 });
        s += M("nv", 210, 76, stamp("NOT YET VERIFIED", C.red, 14), { o0: 0 });
        s += M("gap", 0, 0, P("M250 " + (base - 150) + " H340", C.navy, 1.5, { da: "4 3" }) +
          R(318, base - 150, 40, 115 * k, C.rose, { s: C.red, sw: 2 }) + T(338, base - 150 + 14, "115", { z: 14, f: C.red }), { o0: 0 });
        s += M("eq", 220, 62, L(0, 0, "620 \u2212 505 = 115", { z: 16, s: C.ink, f: C.ink }), { o0: 0 });
        s += M("why", 0, 0, L(318, 172, "TIMING?", { z: 14, s: C.orange }) + L(318, 210, "UNREALISED?", { z: 14, s: C.plum }) +
          P("M338 132 V160", C.ink, 2, { da: "3 3" }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("b620", { sy: 1, o: b === 1 ? 0.5 : 1 });
        V(S, "ref", b === 0, { del: 0.3 }); V(S, "nr", b === 0, { del: 0.6 });
        S("f620", { s: b === 0 ? 1.2 : 1 });
        S("b505", { o: b >= 1 ? 1 : 0, sy: b >= 1 ? 1 : 0.02 });
        V(S, "docs", b === 1, { del: 0.4 }); V(S, "nv", b === 1, { r: -4, del: 0.7 });
        V(S, "gap", b === 2); V(S, "eq", b === 2, { del: 0.2 }); V(S, "why", b === 2, { del: 0.6 });
      }),
      /* 8. Lines 21-23. Fourteen properties, seven recent; two directors; two different questions.
         Adapted from: 110 Animated quadtree (region subdivides as points are added)
         https://observablehq.com/@d3/animated-quadtree  */
      BD(21, 23, "110", function () {
        var s = "";
        for (var i = 0; i < 14; i++) {
          var x = 40 + (i % 7) * 46, y = i < 7 ? 70 : 118, rec = i >= 7;
          s += M("c" + i, x, y, R(0, 0, 42, 42, rec ? C.amber : C.white, { rx: 6, s: rec ? C.orange : C.mist, sw: 2 }) +
            G(hotel(rec ? C.orange : C.navy, 0.6), "translate(21 23)"), { o0: 0 });
          if (rec) s += M("k" + i, x + 36, y + 6, clock(8, C.orange), { o0: 0 });
        }
        s += M("inv", 200, 196, L(0, 0, "7 RECENT: INVESTIGATE", { z: 16, s: C.orange }), { o0: 0 });
        s += M("dA", 64, 262, person(C.navy, 1.3), { o0: 0 });
        s += M("bA", 128, 206, speech(118, 34, C.navy) + T(0, 0, "TIMING", { z: 15, f: C.navy }), { o0: 0 });
        s += M("dB", 336, 262, person(C.orange, 1.3), { o0: 0 });
        s += M("bB", 272, 206, speech(118, 34, C.orange) + T(0, 0, "RECONCILE?", { z: 15, f: C.orange }), { o0: 0 });
        s += M("qA", 128, 252, L(0, 0, "MEASURED?", { z: 14, s: C.teal }), { o0: 0 });
        s += M("qB", 272, 252, L(0, 0, "RECOGNISED?", { z: 14, s: C.plum }), { o0: 0 });
        s += M("both", 200, 206, L(0, 0, "BOTH BELONG", { z: 15, s: C.green }), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 14; i++) {
          V(S, "c" + i, true, { del: i * 0.05, e: "back" });
          if (i >= 7) V(S, "k" + i, true, { del: 0.8 + (i - 7) * 0.06 });
        }
        V(S, "inv", b === 0, { del: 1 });
        V(S, "dA", b >= 1); V(S, "dB", b >= 1);
        V(S, "bA", b === 1, { del: 0.2 }); V(S, "bB", b === 1, { del: 0.4 });
        V(S, "qA", b === 2); V(S, "qB", b === 2, { del: 0.2 }); V(S, "both", b === 2, { del: 0.5, e: "back" });
      }),
      /* 9. Lines 24-26. The traceability chain; one link breaks; five kinds of evidence ahead.
         Adapted from: 092 process connecting (draw and join connections)
         https://lottiefiles.com/free-animation/process-fmpDUgNx8K  */
      BD(24, 26, "092", function () {
        var s = "", LX = [70, 156, 244, 330], LC = [C.navy, C.teal, C.gold, C.orange], LN = ["OBJECTIVE", "BASELINE", "REVISED", "OBSERVED"];
        for (var i = 0; i < 4; i++) {
          var dx = i >= 2 ? 1 : 0;
          s += M("L" + i, LX[i], 140, el("ellipse", { cx: 0, cy: 0, rx: 52, ry: 30, fill: "none", stroke: LC[i], "stroke-width": 9 }) +
            T(0, i % 2 ? -50 : 50, LN[i], { z: 15, f: LC[i] }), { o0: 0 });
        }
        s += M("spark", 200, 140, P("M-8 -16 L4 -2 L-4 2 L8 16", C.red, 4), { o0: 0 });
        s += M("cq", 200, 232, qb(16, C.red), { o0: 0 });
        s += M("ce", 200, 270, L(0, 0, "CAN'T EXPLAIN IT", { z: 15, s: C.red }), { o0: 0 });
        var IC = [coin(18, C.navy, "\u2212", 18), shield(1, C.orange, C.amber), P("M-14 10 L-4 0 L4 6 L16 -10 M8 -10 H16 V-2", C.green, 4),
          shield(1, C.plum, C.lilac), clock(18, C.teal)];
        var IN = ["REMOVED", "AVOIDED", "REVENUE", "RISK", "CAPACITY"];
        IC.forEach(function (ic, i) { s += M("i" + i, 60 + i * 70, 180, O(0, 0, 30, C.white, { s: C.mist, sw: 2 }) + G(ic, "scale(1.15)") + T(0, 50, IN[i], { z: 13, f: C.ink }), { o0: 0 }); });
        s += M("de", 200, 96, L(0, 0, "DIFFERENT EVIDENCE", { z: 16, s: C.ink, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 4; i++) {
          var shift = b === 1 ? (i >= 2 ? 16 : -16) : 0;
          V(S, "L" + i, b <= 1, { x: shift, del: b === 0 ? i * 0.2 : 0 });
        }
        V(S, "spark", b === 1, { e: "back" });
        V(S, "cq", b === 1, { del: 0.3 }); V(S, "ce", b === 1, { del: 0.5 });
        for (var j = 0; j < 5; j++) V(S, "i" + j, b === 2, { del: 0.3 + j * 0.12, e: "back" });
        V(S, "de", b === 2, { del: 0.2 });
      })
    ]
  });
  /* ==================================================================
     W13O1c  FIVE KINDS OF BENEFIT, FIVE DIFFERENT TESTS  (27 lines)
     Rebuilt (audit 4.1/10: 16 WEAK, 7 MISMATCH). Eight boards: the five
     categories are sorted, then each gets its own evidence test.
     ================================================================== */
  scene("W13O1c", {
    label: "Five kinds of benefit, five different tests",
    accent: C.plum,
    bgc: "#f1eef5",
    bg: function () { return backdrop("#ece8f3", "#f6f2ea", 274, "#e7e0d2"); },
    tags: ["Convincing until examined", "Every claim says AED", "Five forms of value", "Cost removed",
      "Did spending fall?", "Qasr's labour claim", "4 fewer, not 11", "Cost avoided",
      "Compared with what?", "Growing demand example", "Support the forecast", "Revenue gained",
      "Caused? What contribution?", "AED 180k retained", "Rates fell 4%", "Risk reduced",
      "AED 85k penalty", "Contingent on enforcement", "Exposure is not cash", "Capacity released",
      "Value only if redeployed", "Fewer staff than assumed", "What did it produce?", "One total hides five",
      "Test each claim", "Read every label", "Report only proven value"],
    boards: [
      /* 1. Lines 0-2. Identical AED notes on a conveyor; flipped, they differ; sorted into five bins.
         Adapted from: 097 Business Solution conveyor (boxes move along a belt, a gear turns)
         https://lottiefiles.com/free-animation/business-solution-pNyNfkcRsa  */
      BD(0, 2, "097", function () {
        var s = "", CAT = [[C.navy, "REMOVED"], [C.orange, "AVOIDED"], [C.green, "REVENUE"], [C.plum, "RISK"], [C.teal, "CAPACITY"]];
        s += R(16, 150, 368, 12, C.slate, { rx: 6 }) + P("M22 156 H378", C.white, 2, { da: "8 8", c: "march" });
        s += G(G(gear(9, C.slate), "", "spin"), "translate(28 156)") + G(G(gear(9, C.slate), "", "spin"), "translate(372 156)");
        CAT.forEach(function (c, i) {
          s += M("bin" + i, 56 + i * 72, 238, R(-32, -24, 64, 48, C.white, { rx: 8, s: c[0], sw: 3 }) + T(0, 36, c[1], { z: 13, f: c[0] }), { o0: 0 });
        });
        CAT.forEach(function (c, i) {
          var x = 56 + i * 72;
          s += M("n" + i, x, 120, R(-30, -22, 60, 44, "#e8f3ea", { rx: 5, s: C.green, sw: 2 }) + O(0, 0, 12, "none", { s: C.green, sw: 2 }) +
            T(0, 1, "AED", { z: 11, f: C.green }));
          s += M("f" + i, x, 120, R(-30, -22, 60, 44, C.white, { rx: 5, s: c[0], sw: 3 }) + R(-30, -22, 60, 10, c[0], { rx: 5 }) +
            T(0, 6, "AED", { z: 13, f: c[0] }), { o0: 0 });
        });
        s += M("mg", 200, 86, mag(20), { o0: 0 });
        s += M("conv", 200, 64, L(0, 0, "LOOKS CONVINCING", { z: 15, s: C.green }));
        s += M("diff", 200, 64, L(0, 0, "SAME LABEL, DIFFERENT EVIDENCE", { z: 14, s: C.plum }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("conv", { o: b === 0 ? 1 : 0 });
        V(S, "mg", b === 0, { x: b === 0 ? 120 : -120, dur: 1.6, del: 0.3 });
        V(S, "diff", b === 1);
        for (var i = 0; i < 5; i++) {
          S("n" + i, { o: b === 0 ? 1 : 0, sx: b === 0 ? 1 : 0.05, del: i * 0.1, dur: 0.4 });
          S("f" + i, { o: b >= 1 ? 1 : 0, sx: b >= 1 ? 1 : 0.05, del: 0.3 + i * 0.1, dur: 0.4, y: b === 2 ? 104 : 0 });
          if (b === 2) S("f" + i, { o: 1, sx: 0.8, s: 0.8, y: 116, del: 0.2 + i * 0.12, dur: 0.8 });
          V(S, "bin" + i, b === 2, { del: i * 0.08 });
        }
      }),
      /* 2. Lines 3-6. Cost removed: one row leaves the ledger; actual versus theoretical; Qasr's labour claim.
         Adapted from: 121 Dashboard by RAKIBUZZAMAN (fill graph, highlight metric)
         https://lottiefiles.com/free-animation/dashboard-M05MmlnoOP  */
      BD(3, 6, "121", function () {
        var s = "";
        s += M("led", 0, 0, R(22, 52, 170, 220, C.white, { rx: 12, s: C.navy, sw: 2 }) + T(107, 72, "ACCOUNTS", { z: 15, f: C.navy }) +
          [0, 1, 2, 3].map(function (i) { return R(40, 92 + i * 36, 134, 22, i === 1 ? C.blue : C.sky, { rx: 4 }); }).join(""));
        s += M("row", 107, 139, R(-67, -11, 134, 22, C.navy, { rx: 4 }) + T(0, 1, "SALARY COST", { z: 12, f: C.white }));
        s += M("gone", 107, 139, stamp("REMOVED", C.green, 13), { o0: 0 });
        s += M("bef", 252, 250, R(-24, -150, 48, 150, C.navy, { rx: 3 }) + T(0, 14, "BEFORE", { z: 13, f: C.navy }), { c: "ob", o0: 0 });
        s += M("act", 330, 250, R(-24, -96, 48, 96, C.green, { rx: 3 }) + T(0, 14, "ACTUAL", { z: 13, f: C.green }), { c: "ob", o0: 0 });
        s += M("th", 330, 250, R(-24, -150, 48, 150, "none", { rx: 3, s: C.slate, sw: 2, da: "5 4" }), { o0: 0 });
        s += M("thl", 330, 84, L(0, 0, "ON PAPER?", { z: 13, s: C.slate }), { o0: 0 });
        s += M("ok", 330, 130, okb(13), { o0: 0 });
        s += M("claim", 290, 92, L(0, 0, "LABOUR AED 240k", { z: 16, s: C.navy }), { o0: 0 });
        var dots = "";
        for (var i = 0; i < 11; i++) {
          var x = 222 + (i % 6) * 28, y = i < 6 ? 140 : 182;
          dots += M("d" + i, x, y, person(C.navy, 0.75), { o0: 0 });
          dots += M("x" + i, x, y, P("M-10 13 Q-10 -3 0 -3 Q10 -3 10 13 Z M6 -11 A6 6 0 1 1 5.9 -11.1", C.orange, 1.6, { da: "3 3" }), { o0: 0 });
        }
        s += dots;
        s += M("cap", 290, 230, L(0, 0, "11 ASSUMED, 4 ACTUAL", { z: 14, s: C.orange }), { o0: 0 });
        s += M("ex", 290, 266, L(0, 0, "EXAMINE, DON'T ACCEPT", { z: 14, s: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("row", { o: b === 0 ? 0 : 1, x: b === 0 ? 40 : 0, del: 0.6, dur: 1 });
        V(S, "gone", b === 0, { del: 1, r: -6 });
        S("led", { o: b >= 2 ? 0.35 : 1 }); S("row", { o: b >= 2 ? 0.35 : b === 0 ? 0 : 1 });
        S("bef", { o: b === 1 ? 1 : 0, sy: b === 1 ? 1 : 0.02 });
        S("act", { o: b === 1 ? 1 : 0, sy: b === 1 ? 1 : 0.02, del: 0.3 });
        V(S, "th", b === 1, { del: 0.6 }); V(S, "thl", b === 1, { del: 0.8 }); V(S, "ok", b === 1, { del: 1, e: "back" });
        V(S, "claim", b >= 2);
        for (var i = 0; i < 11; i++) {
          V(S, "x" + i, b >= 2, { del: i * 0.04 });
          var left = b === 3 && i < 4;
          V(S, "d" + i, b >= 2 && !left, { del: b === 2 ? i * 0.04 : 0.3 + i * 0.06 });
        }
        V(S, "cap", b === 3); V(S, "ex", b === 3, { del: 0.4 });
      }),
      /* 3. Lines 7-10. Cost avoided needs a counterfactual branch, backed by evidence, not a cloud.
         Adapted from: 089 Git Workflow 1 (branch, merge, reconnect)
         https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5  */
      BD(7, 10, "089", function () {
        var s = "";
        s += P("M30 252 H380 M30 252 V70", C.ink, 2.5) + T(36, 62, "STAFFING SPEND", { z: 13, a: "start", f: C.slate });
        s += P("M180 74 V252", C.slate, 2, { da: "5 5" }) + T(180, 268, "NOW", { z: 13, f: C.slate });
        s += D("hist", "M36 200 L80 198 L120 201 L180 198", C.navy, 4);
        s += D("with", "M180 198 L240 198 L300 199 L370 198", C.green, 4);
        s += D("wo", "M180 198 L240 176 L300 150 L370 122", C.orange, 4);
        s += M("wol", 330, 106, L(0, 0, "WITHOUT CHANGE?", { z: 13, s: C.orange }), { o0: 0 });
        s += M("wil", 318, 222, L(0, 0, "WITH CHANGE", { z: 13, s: C.green }), { o0: 0 });
        s += M("gapz", 0, 0, P("M180 198 L240 176 L300 150 L370 122 V198 Z", "none", 0, { f: "rgba(192,80,42,.14)" }) + T(310, 178, "AVOIDED", { z: 13, f: C.orange }), { o0: 0 });
        s += M("com", 104, 120, R(-62, -38, 124, 76, C.white, { rx: 10, s: C.orange, sw: 2.5 }) + G(person(C.orange, 0.9), "translate(-34 6)") +
          T(18, -12, "PLANNED", { z: 13, f: C.orange }) + T(18, 8, "HIRE", { z: 13, f: C.orange }), { o0: 0 });
        s += M("nh", 104, 178, stamp("DID NOT HAPPEN", C.green, 12), { o0: 0 });
        s += M("cw", 110, 96, L(0, 0, "COMPARED WITH WHAT?", { z: 14, s: C.ink, f: C.ink }), { o0: 0 });
        s += M("dem", 244, 104, P("M-30 30 L30 -20", C.plum, 5) + P("M14 -22 L30 -20 L28 -4", C.plum, 5) + T(-40, -14, "DEMAND", { z: 13, f: C.plum }), { o0: 0 });
        s += M("gh", 372, 96, G(person("none", 1), "") + P("M-13 14 Q-13 -4 0 -4 Q13 -4 13 14 Z M8 -15 A8 8 0 1 1 7.9 -15.1", C.orange, 2, { da: "3 3" }), { o0: 0 });
        s += M("ev", 0, 0, G(doc(30, 38, C.green), "translate(70 112)") + G(doc(30, 38, C.green), "translate(110 112)") +
          T(90, 150, "FORECAST, PLANS", { z: 12, f: C.green }), { o0: 0 });
        s += M("cl", 210, 96, G(cloud(C.mist, 1), "", "drift") + T(0, 4, "MAYBE", { z: 13, f: C.slate }) + P("M-34 -18 L34 22", C.red, 4), { o0: 0 });
        s += M("sup", 120, 228, L(0, 0, "SUPPORT THE FORECAST", { z: 13, s: C.green }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("hist", { d: 1 }); S("with", { d: b >= 1 ? 1 : 0, del: 0.2 });
        S("wo", { d: b >= 1 ? 1 : 0, del: 0.5 });
        V(S, "wol", b >= 1 && b !== 3, { del: 0.9 }); V(S, "wil", b >= 1, { del: 0.7 });
        V(S, "gapz", b >= 2, { del: 0.3 });
        V(S, "com", b === 0); V(S, "nh", b === 0, { del: 0.6, r: -6 });
        V(S, "cw", b === 1, { del: 0.6 });
        V(S, "dem", b === 2, { del: 0.2 }); V(S, "gh", b === 2, { del: 0.7, e: "back" });
        V(S, "ev", b === 3); V(S, "cl", b === 3, { del: 0.3 }); V(S, "sup", b === 3, { del: 0.5 });
      }),
      /* 4. Lines 11-14. Revenue is not profit; causation and contribution; Qasr's renewals and the rate cut.
         Adapted from: 118 Flat Infographics by zevs (charts animated into place)
         https://motionarray.com/after-effects-templates/flat-infographics-17982/  */
      BD(11, 14, "118", function () {
        var s = "";
        s += P("M30 250 H210", C.ink, 2.5);
        s += M("rev", 84, 250, R(-34, -170, 68, 170, C.green, { rx: 4 }) + T(0, -150, "SALES", { z: 13, f: C.white }), { c: "ob", o0: 0 });
        s += M("pro", 160, 250, R(-34, -56, 68, 56, C.navy, { rx: 4 }) + T(0, -70, "PROFIT", { z: 13, f: C.navy }), { c: "ob", o0: 0 });
        s += M("ne", 122, 150, L(0, 0, "SALES \u2260 PROFIT", { z: 14, s: C.red }), { o0: 0 });
        s += M("gr", 300, 112, O(0, 0, 30, C.white, { s: C.teal, sw: 3 }) + G(G(gear(15, C.teal), "", "spin")) + T(0, 46, "PROCESS", { z: 13, f: C.teal }), { o0: 0 });
        s += M("ca", 0, 0, arrowH(268, 120, 126, 98, C.teal, 3) + L(300, 196, "CAUSED IT?", { z: 14, s: C.teal }) +
          L(300, 232, "CONTRIBUTION?", { z: 14, s: C.navy }), { o0: 0 });
        s += M("ct", 290, 142, G(contract(C.green), "translate(-26 0) rotate(-6)") + G(contract(C.green), "translate(26 0) rotate(6)"), { o0: 0 });
        s += M("rt", 290, 214, L(0, 0, "AED 180k RETAINED", { z: 15, s: C.green }), { o0: 0 });
        s += M("tag", 290, 74, R(-40, -16, 80, 32, C.amber, { rx: 6, s: C.orange, sw: 2 }) + O(-28, 0, 4, C.orange) + T(6, 1, "RATE", { z: 13, f: C.orange }), { o0: 0 });
        s += M("pct", 356, 74, T(0, 0, "\u22124%", { z: 20, f: C.red }), { o0: 0 });
        s += M("why", 290, 256, L(0, 0, "SERVICE OR PRICE?", { z: 14, s: C.plum }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("rev", { o: 1, sy: 1 }); S("pro", { o: 1, sy: 1, del: 0.4 });
        V(S, "ne", b === 0, { del: 0.8 });
        V(S, "gr", b === 1); V(S, "ca", b === 1, { del: 0.4 });
        S("pro", { s: b === 1 ? 1.08 : 1, o: 1, sy: 1 });
        V(S, "ct", b >= 2, { e: "back" }); V(S, "rt", b >= 2, { del: 0.3 });
        V(S, "tag", b === 3, { y: b === 3 ? 0 : -16 }); V(S, "pct", b === 3, { del: 0.4, y: b === 3 ? 0 : -16 });
        V(S, "why", b === 3, { del: 0.6 });
        S("rt", { o: b >= 2 ? 1 : 0, y: b === 3 ? -6 : 0 });
      }),
      /* 5. Lines 15-18. Risk reduced: the dial falls, the 85k is exposure, contingent, not cash.
         Adapted from: 129 Arc tween (gauge rotates to a new value)
         https://observablehq.com/@d3/arc-tween  */
      BD(15, 18, "129", function () {
        var s = "";
        s += M("dial", 110, 176, P("M-80 0 A80 80 0 0 1 80 0", C.mist, 22) + P("M-80 0 A80 80 0 0 1 -40 -69", C.green, 22) +
          P("M40 -69 A80 80 0 0 1 80 0", C.red, 22) + T(-80, 18, "LOW", { z: 12, f: C.green }) + T(80, 18, "HIGH", { z: 12, f: C.red }) +
          T(0, 44, "LIKELIHOOD OF HARM", { z: 13, f: C.ink }));
        s += G(P("M0 0 L0 -66", C.red, 5, { op: 0.3 }), "translate(110 176) rotate(50)");
        s += M("ndl", 110, 176, P("M0 0 L0 -66", C.ink, 5) + O(0, 0, 8, C.ink), { c: "" });
        s += M("nc", 300, 112, coin(26, C.gold, "AED", 13) + P("M-30 30 L30 -30", C.red, 5), { o0: 0 });
        s += M("ncl", 300, 162, L(0, 0, "NOT IMMEDIATE CASH", { z: 13, s: C.red }), { o0: 0 });
        s += M("pen", 300, 120, G(cloud("#8a9bb0", 1.3), "", "bob") + T(0, 6, "AED 85k", { z: 15, f: C.white }), { o0: 0 });
        s += M("pl", 300, 176, L(0, 0, "POTENTIAL EXPOSURE", { z: 14, s: C.plum }), { o0: 0 });
        s += M("enf", 300, 236, R(-74, -24, 148, 48, C.white, { rx: 10, s: C.plum, sw: 2 }) + G(gavel(C.plum), "translate(-48 -6) scale(.7)") +
          T(14, -8, "IF ENFORCED", { z: 13, f: C.plum }) + T(14, 12, "ONLY THEN", { z: 13, f: C.plum }), { o0: 0 });
        s += M("val", 110, 258, L(0, 0, "VALUABLE", { z: 14, s: C.green }) + G(okb(10), "translate(54 0)"), { o0: 0 });
        s += M("rec", 300, 258, L(0, 0, "REALISED SAVING", { z: 14, s: C.red }) + G(nob(10), "translate(76 0)"), { o0: 0 });
        return s;
      }, function (b, S) {
        S("ndl", { r: -50, dur: 1.6, del: 0.3 });
        V(S, "nc", b === 0, { del: 0.6 }); V(S, "ncl", b === 0, { del: 0.9 });
        V(S, "pen", b >= 1 && b <= 3); V(S, "pl", b >= 1, { del: 0.3 });
        V(S, "enf", b === 2, { del: 0.3 });
        V(S, "val", b === 3); V(S, "rec", b === 3, { del: 0.3 });
      }),
      /* 6. Lines 19-22. Capacity released: a slice of the workday is freed, and counts only when redeployed.
         Adapted from: 125 Infographics Dashboard (pie arc grows, metric graph)
         https://lottiefiles.com/free-animation/infographics-dashboard-X6P5rVLZAB  */
      BD(19, 22, "125", function () {
        var s = "";
        s += M("pie", 110, 156, O(0, 0, 70, C.navy) + P("M0 0 L0 -70 A70 70 0 0 1 66.6 -21.6 Z", "none", 0, { f: C.teal }) +
          T(-18, 26, "WORK", { z: 15, f: C.white }));
        s += M("free", 136, 112, L(0, 0, "RELEASED", { z: 13, s: C.teal }), { o0: 0 });
        s += M("same", 110, 252, L(0, 0, "SAME STAFF", { z: 14, s: C.navy }), { o0: 0 });
        s += D("pa", "M180 120 C230 100 250 90 290 90", C.green, 4);
        s += D("pb", "M180 170 C230 190 250 214 290 214", C.slate, 4);
        s += M("ra", 330, 90, target(22, C.green) + T(0, 36, "MEASURED USE", { z: 13, f: C.green }), { o0: 0 });
        s += M("rb", 330, 214, O(0, 0, 22, C.white, { s: C.slate, sw: 3 }) + T(0, 1, "Zz", { z: 14, f: C.slate }) + T(0, 36, "UNUSED", { z: 13, f: C.slate }), { o0: 0 });
        s += M("only", 250, 152, L(0, 0, "ONLY IF REDEPLOYED", { z: 13, s: C.green }), { o0: 0 });
        var ppl = "";
        for (var i = 0; i < 11; i++) ppl += M("p" + i, 216 + (i % 6) * 30, i < 6 ? 110 : 152, person(i < 4 ? C.orange : C.navy, 0.75), { o0: 0 });
        s += ppl;
        s += M("ff", 300, 196, L(0, 0, "4 FEWER, NOT 11", { z: 14, s: C.orange }), { o0: 0 });
        s += M("qs", 0, 0, L(300, 104, "WHAT WAS RELEASED?", { z: 14, s: C.teal }) + L(300, 160, "WHAT VALUE FOLLOWED?", { z: 14, s: C.green }) +
          G(qb(12), "translate(300 214)"), { o0: 0 });
        return s;
      }, function (b, S) {
        S("pie", { r: b === 0 ? 0 : 0, s: b >= 2 ? 0.92 : 1 });
        V(S, "free", true, { del: 0.4 });
        V(S, "same", b === 0, { del: 0.6 });
        S("pa", { d: b === 1 ? 1 : 0, o: b === 1 ? 1 : 0 }); S("pb", { d: b === 1 ? 1 : 0, o: b === 1 ? 1 : 0, del: 0.2 });
        V(S, "ra", b === 1, { del: 0.6 }); V(S, "rb", b === 1, { del: 0.8 }); V(S, "only", b === 1, { del: 1 });
        for (var i = 0; i < 11; i++) V(S, "p" + i, b === 2, { del: i * 0.05, o: b === 2 ? (i < 4 ? 0.25 : 1) : 0 });
        V(S, "ff", b === 2, { del: 0.7 });
        V(S, "qs", b === 3);
      }),
      /* 7. Lines 23-24. Five coloured blocks merge into one grey total; the total splits back for testing.
         Adapted from: 114 Infographics Pack by JVARTS STUDIO (one metric element revealed at a time)
         https://motionarray.com/after-effects-templates/infographics-pack-100132/  */
      BD(23, 24, "114", function () {
        var s = "", CC = [C.navy, C.orange, C.green, C.plum, C.teal], HH = [46, 30, 40, 26, 34], NM = ["REMOVED", "AVOIDED", "REVENUE", "RISK", "CAPACITY"];
        var y = 250;
        for (var i = 0; i < 5; i++) {
          y -= HH[i];
          s += M("blk" + i, 110, y + HH[i] / 2, R(-50, -HH[i] / 2, 100, HH[i], CC[i], { s: C.white, sw: 2 }));
        }
        s += M("grey", 110, 250 - 88, R(-52, -88, 104, 176, "#8d99a8", { rx: 4 }) + T(0, 0, "TOTAL", { z: 18, f: C.white }), { o0: 0 });
        s += M("hide", 290, 150, L(0, 0, "ONE TOTAL HIDES", { z: 15, s: C.slate }) + T(0, 30, "FIVE KINDS OF EVIDENCE", { z: 13, f: C.slate }), { o0: 0 });
        for (var j = 0; j < 5; j++) {
          s += M("t" + j, 248, 76 + j * 40, R(-14, -14, 28, 28, CC[j], { rx: 6 }) + T(24, 0, NM[j], { z: 14, a: "start", f: CC[j] }) +
            G(mag(8, CC[j]), "translate(130 -2)"), { o0: 0 });
        }
        s += M("tst", 110, 56, L(0, 0, "TEST EACH CLAIM", { z: 15, s: C.ink, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        var y = 250, mid = 0;
        for (var i = 0; i < 5; i++) {
          S("blk" + i, { o: b === 0 ? 1 : 1, x: b === 1 ? (i - 2) * 6 : 0, y: b === 1 ? (i - 2) * -8 : 0 });
        }
        V(S, "grey", b === 0, { del: 0.8, dur: 0.6 });
        V(S, "hide", b === 0, { del: 1 });
        for (var j = 0; j < 5; j++) V(S, "t" + j, b === 1, { del: 0.2 + j * 0.15, x: b === 1 ? 0 : -20 });
        V(S, "tst", b === 1);
      }),
      /* 8. Lines 25-26. Every Qasr claim is read for its type; only verified value enters the savings tray.
         Adapted from: 095 contract process (document reveal and approval states)
         https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8  */
      BD(25, 26, "095", function () {
        var s = "", CL = [["LABOUR 240k", "COST REMOVED?", C.navy], ["RETAINED 180k", "REVENUE?", C.green], ["PENALTY 85k", "RISK?", C.plum]];
        s += M("tA", 104, 242, R(-92, -46, 184, 94, C.pale, { rx: 10, s: C.green, sw: 3 }) + T(0, -30, "ESTABLISHED SAVINGS", { z: 13, f: C.green }) +
          G(keyI(1.1, C.green), "translate(0 4)") + T(0, 32, "VERIFIED ONLY", { z: 12, f: C.green }), { o0: 0 });
        s += M("tB", 296, 242, R(-92, -46, 184, 94, C.amber, { rx: 10, s: C.orange, sw: 3 }) + T(0, -30, "QUALIFIED CLAIMS", { z: 13, f: C.orange }), { o0: 0 });
        CL.forEach(function (c, i) {
          var x = 72 + i * 128;
          s += M("cd" + i, x, 116, R(-60, -44, 120, 88, C.white, { rx: 10, s: c[2], sw: 2.5 }) + T(0, -18, c[0], { z: 13, f: c[2] }) +
            T(0, 14, "AED", { z: 22, f: c[2] }));
          s += M("ty" + i, x, 116, R(-60, -44, 120, 88, C.paper, { rx: 10, s: c[2], sw: 2.5 }) + T(0, -18, c[0], { z: 13, f: c[2] }) +
            T(0, 14, c[1], { z: 12, f: C.ink }), { o0: 0 });
        });
        s += M("mg", 72, 184, mag(16), { o0: 0 });
        s += M("gen", 200, 120, G(shield(1.4, C.green, C.pale), "translate(-96 0)") + G(tick(0.9, C.green, 4), "translate(-96 0)") +
          L(24, 0, "GENUINE GAINS KEPT", { z: 15, s: C.green }), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 3; i++) {
          S("cd" + i, { o: 0, sx: 0.05, del: b === 0 ? 0.4 + i * 0.4 : 0, dur: 0.35 });
          var into = b === 1;
          S("ty" + i, { o: 1, sx: 1, del: b === 0 ? 0.75 + i * 0.4 : 0.2 + i * 0.15, dur: 0.6,
            x: into ? 296 + (i - 1) * 58 - (72 + i * 128) : 0, y: into ? 140 : 0, s: into ? 0.46 : 1 });
          if (b === 0) S("ty" + i, { o: 1, sx: 1, x: 0, y: 0, s: 1, del: 0.75 + i * 0.4, dur: 0.35 });
        }
        V(S, "mg", b === 0, { x: b === 0 ? 256 : 0, dur: 1.8, del: 0.3 });
        V(S, "tA", b === 1); V(S, "gen", b === 1, { del: 0.8 }); V(S, "tB", b === 1, { del: 0.1 }); 
      })
    ]
  });
  installCSS("w13-claude-v2-part1");
})();
// END FILE: w13-claude-v2-part1.js

// FILE: w13-claude-v2-part2.js
// OPER621 - Week 13 - The Realize Value Phase - animated teaching scenes, round 2 (full rebuild).
// Part 2 of 4. Sections: W13O1d W13O2a W13O2b. Standalone; load parts in any order.
// Contract: window.VL_SCENES[secId] = { build(el), step(i, n), reset() }.
// Styles: appended to one <style id="vl-sc-w13">, every rule scoped under .vls-w13-<secId>.
// Every board names the benchmark template it adapts, with its URL, in a comment.
(function () {
  "use strict";
  /* ------------------------------------------------------------------
     ENGINE (v2, written from scratch for Week 13 round 2).
     A section is a sequence of BOARDS. Each board is one complete visual
     that owns 2 to 5 consecutive narration lines; inside a board every
     line has its own deterministic state (view(b, S)), so the player can
     seek forwards or backwards to any moment. Entering a board snaps its
     actors to their drawn defaults, then animates them in.
     Motion: window.gsap when present, otherwise a small rAF tweener.
     prefers-reduced-motion: every state is applied instantly.
     Layout: 400 x 300 design canvas, scaled with "meet"; the outer
     viewBox widens or deepens (max 1.35x / 1.45x) to the host aspect
     and each scene paints a full-bleed background, so phone (figure
     above text) and laptop (figure in the left 60%) are both filled.
     ------------------------------------------------------------------ */
  var W = window;
  W.VL_SCENES = W.VL_SCENES || {};
  var VLS = W.VL_SCENES;
  var CW = 400, CH = 300;
  var C = {
    navy: "#1f4e79", ink: "#16263a", orange: "#c0502a", paper: "#fbf8f1",
    blue: "#dbe7f2", green: "#2f7d5f", gold: "#d9982b", plum: "#6b4f96",
    teal: "#2a8a8f", red: "#b23a3a", slate: "#5c6f84", sand: "#efe4cf",
    mist: "#c7d5e3", white: "#ffffff", pale: "#e3f1e8", rose: "#f6e1da",
    lilac: "#ece6f5", sky: "#e6f0f8", amber: "#fbecd0"
  };
  var CSS = [];
  var PFX = "";

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function at(o) {
    var r = [];
    for (var k in o) if (o[k] !== undefined && o[k] !== null && o[k] !== false) r.push(k + '="' + esc(o[k]) + '"');
    return r.join(" ");
  }
  function el(n, o, inner) {
    return inner === undefined ? "<" + n + " " + at(o || {}) + "/>" : "<" + n + " " + at(o || {}) + ">" + inner + "</" + n + ">";
  }
  /* ---------- primitive shapes ---------- */
  function R(x, y, w, h, f, o) {
    o = o || {};
    return el("rect", { x: x, y: y, width: w, height: h, rx: o.rx, fill: f, stroke: o.s, "stroke-width": o.sw,
      opacity: o.op, "stroke-dasharray": o.da, "class": o.c, "data-k": o.k ? PFX + o.k : undefined });
  }
  function O(cx, cy, r, f, o) {
    o = o || {};
    return el("circle", { cx: cx, cy: cy, r: r, fill: f, stroke: o.s, "stroke-width": o.sw, opacity: o.op,
      "stroke-dasharray": o.da, "class": o.c, "data-k": o.k ? PFX + o.k : undefined });
  }
  function E(cx, cy, rx, ry, f, o) {
    o = o || {};
    return el("ellipse", { cx: cx, cy: cy, rx: rx, ry: ry, fill: f, stroke: o.s, "stroke-width": o.sw, opacity: o.op, "class": o.c });
  }
  function P(d, s, sw, o) {
    o = o || {};
    return el("path", { d: d, fill: o.f || "none", stroke: s || "none", "stroke-width": sw, "stroke-linecap": "round",
      "stroke-linejoin": "round", opacity: o.op, "stroke-dasharray": o.da, "class": o.c,
      "data-k": o.k ? PFX + o.k : undefined });
  }
  /* Text. o.z size (16), o.w weight (800), o.f fill, o.a anchor, o.k key,
     o.num = {v:start, pre:"", suf:""} makes it a tweenable counter. */
  function T(x, y, s, o) {
    o = o || {};
    var a = { x: x, y: y, "font-size": o.z || 16, "font-weight": o.w || 800, fill: o.f || C.ink,
      "text-anchor": o.a || "middle", "dominant-baseline": "central", opacity: o.op, "class": o.c,
      "letter-spacing": o.ls, "data-k": o.k ? PFX + o.k : undefined };
    if (o.num) { a["data-n"] = o.num.v || 0; a["data-pre"] = o.num.pre || ""; a["data-suf"] = o.num.suf || ""; }
    return el("text", a, esc(s));
  }
  /* Group. A CSS ambient class never shares an element with a transform
     attribute (the animation would replace it), so both are nested. */
  function G(inner, t, c, op) {
    if (t && c) return el("g", { transform: t, opacity: op }, el("g", { "class": c }, inner));
    return el("g", { transform: t, "class": c, opacity: op }, inner);
  }
  /* Animated actor placed at (x, y); its own transform is engine-owned.
     o.o0 initial opacity, o.c extra class: "ob" (grow from bottom), "ol" (grow from left). */
  function M(k, x, y, inner, o) {
    o = o || {};
    return '<g transform="translate(' + x + " " + y + ')"><g class="mv ' + (o.c || "") + '" data-k="' + PFX + k + '"' +
      (o.o0 !== undefined ? ' data-o="' + o.o0 + '"' : "") + ">" + inner + "</g></g>";
  }
  /* Self-drawing stroke (property d: 0..1). */
  function D(k, d, s, sw, o) {
    o = o || {};
    return el("path", { d: d, fill: "none", stroke: s, "stroke-width": sw, "stroke-linecap": "round", "stroke-linejoin": "round",
      "class": "mv dr " + (o.c || ""), "data-k": PFX + k, pathLength: 100, "data-d": o.d0 || 0,
      "data-o": o.o0, "stroke-dasharray": "100 100", opacity: o.op });
  }
  /* Width estimate for a bold label; the browser re-measures every pill after build. */
  function tw(s, z) {
    var w = 0, str = String(s);
    for (var i = 0; i < str.length; i++) {
      var c = str[i];
      w += /[MW]/.test(c) ? 0.92 : /[A-Z0-9]/.test(c) ? 0.72 : /[ .,:'\u00B7]/.test(c) ? 0.32 : /[mw]/.test(c) ? 0.86 : /[a-z]/.test(c) ? 0.58 : 0.7;
    }
    return w * z;
  }
  /* Pill label centred on (x, y). o.z size, o.s stroke, o.f text, o.bg fill, o.k text key. */
  function L(x, y, s, o) {
    o = o || {};
    var z = o.z || 15, h = Math.round(z * 1.75), w = tw(s, z) + h * 0.95;
    return '<g class="pill" data-cx="' + x + '" data-pad="' + (h * 0.95).toFixed(1) + '">' +
      R(x - w / 2, y - h / 2, w, h, o.bg || C.paper, { rx: h / 2, s: o.s || C.navy, sw: o.sw || 2 }) +
      T(x, y + 0.5, s, { z: z, f: o.f || o.s || C.navy, k: o.k }) + "</g>";
  }
  /* ---------- pictograms (centred on the local origin) ---------- */
  function person(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + O(0, -15, 8, col) + P("M-13 14 Q-13 -4 0 -4 Q13 -4 13 14 Z", "none", 0, { f: col }) + "</g>";
  }
  function hotel(col, s, door) {
    s = s || 1;
    var g = R(-16, -26, 32, 44, C.paper, { rx: 3, s: col, sw: 2.5 });
    for (var r = 0; r < 3; r++) for (var c = 0; c < 2; c++) g += R(-11 + c * 13, -20 + r * 11, 9, 7, C.blue, { rx: 1.5 });
    return '<g transform="scale(' + s + ')">' + g + R(-5, 8, 10, 10, door || col, { rx: 1.5 }) + "</g>";
  }
  function coin(r, col, txt, z) {
    return O(0, 0, r, C.paper, { s: col, sw: Math.max(2, r / 6) }) + O(0, 0, r * 0.72, "none", { s: col, sw: 1.2, op: 0.5 }) +
      (txt ? T(0, 0.5, txt, { z: z || Math.round(r * 0.6), f: col }) : "");
  }
  function clock(r, col) {
    return O(0, 0, r, C.paper, { s: col, sw: Math.max(2, r / 6) }) +
      P("M0 " + (-r * 0.6) + " V0 L" + (r * 0.45) + " " + (r * 0.3), col, Math.max(2, r / 7));
  }
  function doc(w, h, col) {
    var s = R(-w / 2, -h / 2, w, h, C.white, { rx: 3, s: col, sw: 2 }), n = Math.max(2, Math.floor((h - 12) / 8));
    for (var i = 0; i < n; i++) s += P("M" + (-w / 2 + 6) + " " + (-h / 2 + 9 + i * 8) + " H" + (w / 2 - 6 - (i % 2) * 6), col, 1.8, { op: 0.55 });
    return s;
  }
  function contract(col) {
    return doc(34, 44, col) + P("M-10 16 q4 -7 8 0 t8 0", C.orange, 2);
  }
  function tick(s, col, sw) {
    s = s || 1;
    return P("M" + -9 * s + " 0 L" + -3 * s + " " + 7 * s + " L" + 10 * s + " " + -8 * s, col || C.green, sw || 4);
  }
  function cross(s, col, sw) {
    s = s || 1;
    return P("M" + -8 * s + " " + -8 * s + " L" + 8 * s + " " + 8 * s + " M" + 8 * s + " " + -8 * s + " L" + -8 * s + " " + 8 * s, col || C.red, sw || 4);
  }
  function qb(r, col) {
    return O(0, 0, r, col || C.orange) + T(0, 1, "?", { z: Math.max(14, Math.round(r * 1.3)), f: C.white, w: 900 });
  }
  function okb(r, col) { return O(0, 0, r, col || C.green) + tick(r / 13, C.white, Math.max(2.5, r / 5)); }
  function nob(r, col) { return O(0, 0, r, col || C.red) + cross(r / 15, C.white, Math.max(2.5, r / 5)); }
  function mag(r, col) {
    col = col || C.ink;
    return O(0, 0, r, "rgba(255,255,255,.55)", { s: col, sw: Math.max(3, r / 5) }) + P("M" + r * 0.72 + " " + r * 0.72 + " L" + r * 1.45 + " " + r * 1.45, col, Math.max(4, r / 3.5));
  }
  function shield(s, col, fill) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + P("M0 -20 L16 -13 V-1 Q16 14 0 21 Q-16 14 -16 -1 V-13 Z", col, 2.5, { f: fill || C.lilac }) + "</g>";
  }
  function keyI(s, col) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + O(-8, 0, 7, "none", { s: col, sw: 3.5 }) + P("M-1 0 H16 M11 0 V6 M16 0 V5", col, 3.5) + "</g>";
  }
  function flag(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + P("M0 0 V-34", C.ink, 2.5) + P("M0 -34 L22 -27 L0 -20 Z", col, 1, { f: col }) + "</g>";
  }
  function trophy(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + P("M-12 -14 H12 V-4 Q12 8 0 10 Q-12 8 -12 -4 Z", col, 2, { f: col }) +
      P("M-12 -10 h-6 v5 q0 5 6 5 M12 -10 h6 v5 q0 5 -6 5", col, 2.5) + R(-4, 10, 8, 6, col) + R(-11, 16, 22, 5, C.ink, { rx: 1.5 }) + "</g>";
  }
  function hourglass(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + P("M-12 -18 H12 M-12 18 H12", C.ink, 3) +
      P("M-9 -17 Q-9 -4 0 0 Q9 -4 9 -17 Z M-9 17 Q-9 4 0 0 Q9 4 9 17 Z", col, 2, { f: C.paper }) +
      P("M-5 -10 Q0 -3 5 -10 Z M-7 15 Q0 8 7 15 Z", "none", 0, { f: col }) + "</g>";
  }
  function cal(col, s) {
    s = s || 1;
    var g = R(-15, -13, 30, 28, C.white, { rx: 3, s: col, sw: 2 }) + R(-15, -13, 30, 8, col, { rx: 3 });
    for (var i = 0; i < 3; i++) for (var j = 0; j < 2; j++) g += R(-10 + i * 8, -1 + j * 7, 5, 4, col, { op: 0.6 });
    return '<g transform="scale(' + s + ')">' + g + "</g>";
  }
  function cloud(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + E(0, 4, 30, 14, col) + E(-18, 6, 16, 11, col) + E(18, 6, 17, 11, col) + E(-2, -8, 18, 14, col) + "</g>";
  }
  function target(r, col) {
    return O(0, 0, r, C.white, { s: col, sw: 3 }) + O(0, 0, r * 0.62, "none", { s: col, sw: 3 }) + O(0, 0, r * 0.25, col);
  }
  function gear(r, col) {
    var d = "", n = 8;
    for (var i = 0; i < n * 2; i++) {
      var a = (i / (n * 2)) * Math.PI * 2, rr = i % 2 ? r : r * 1.22, a2 = a + Math.PI / (n * 2);
      d += (i ? "L" : "M") + (rr * Math.cos(a)).toFixed(1) + " " + (rr * Math.sin(a)).toFixed(1) + " L" + (rr * Math.cos(a2)).toFixed(1) + " " + (rr * Math.sin(a2)).toFixed(1) + " ";
    }
    return P(d + "Z", col, 2, { f: C.paper }) + O(0, 0, r * 0.4, "none", { s: col, sw: 3 });
  }
  function arrowH(x1, y1, x2, y2, col, sw) {
    var a = Math.atan2(y2 - y1, x2 - x1), h = 9;
    return P("M" + x1 + " " + y1 + " L" + x2 + " " + y2 + " M" + (x2 - h * Math.cos(a - 0.5)).toFixed(1) + " " + (y2 - h * Math.sin(a - 0.5)).toFixed(1) +
      " L" + x2 + " " + y2 + " L" + (x2 - h * Math.cos(a + 0.5)).toFixed(1) + " " + (y2 - h * Math.sin(a + 0.5)).toFixed(1), col || C.ink, sw || 3);
  }
  function stamp(txt, col, z) {
    z = z || 16;
    var w = tw(txt, z) + 22, h = z + 14;
    return R(-w / 2, -h / 2, w, h, "rgba(255,255,255,.88)", { rx: 4, s: col, sw: 3 }) + T(0, 1, txt, { z: z, f: col, w: 900 });
  }
  function umbrella(col) {
    return P("M-34 0 Q-34 -30 0 -32 Q34 -30 34 0 Q25 -7 17 0 Q8 -7 0 0 Q-8 -7 -17 0 Q-25 -7 -34 0 Z", col, 2, { f: C.lilac }) + P("M0 -32 V26 q0 7 -7 7", col, 3);
  }
  function bell(col) {
    return P("M-11 8 Q-11 -12 0 -12 Q11 -12 11 8 L14 11 H-14 Z", col, 2.5, { f: C.amber }) + O(0, 14, 3.5, col);
  }
  function gavel(col) {
    return G(R(-14, -7, 28, 14, col, { rx: 3 }) + R(-3, 7, 6, 22, col, { rx: 2 }), "rotate(-35)") + R(-18, 26, 36, 6, C.ink, { rx: 2 });
  }
  function speech(w, h, col) {
    return P("M" + -w / 2 + " " + -h / 2 + " H" + w / 2 + " V" + h / 2 + " H-6 L-16 " + (h / 2 + 12) + " L-16 " + h / 2 + " H" + -w / 2 + " Z", col, 2, { f: C.white });
  }
  function bars3(vals, cols, x0, base, bw, gap, scale) {
    var s = "";
    vals.forEach(function (v, i) { s += R(x0 + i * (bw + gap), base - v * scale, bw, v * scale, cols[i], { rx: 3 }); });
    return s;
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function V(S, key, on, extra) {
    var p = { o: on ? 1 : 0, s: on ? 1 : 0.86 };
    if (extra) for (var q in extra) p[q] = extra[q];
    S(key, p);
  }
  function reduced() {
    try { return !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; }
  }
  function nowMs() { return W.performance && W.performance.now ? W.performance.now() : Date.now(); }
  var EASE = {
    io: function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; },
    out: function (t) { return 1 - Math.pow(1 - t, 3); },
    back: function (t) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }
  };
  var GSE = { io: "power3.inOut", out: "power3.out", back: "back.out(1.6)" };
  function fmtNum(v, n) {
    var x = Math.round(v), neg = x < 0, s = String(Math.abs(x)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (neg ? "\u2212" : "") + s;
  }
  /* Base stylesheet, entirely scoped under .vls-w13-<id>. */
  function baseCSS(id, bg) {
    var s = ".vls-w13-" + id;
    return [
      s + "{position:relative;width:100%;height:100%;min-height:180px;overflow:hidden;background:" + bg + ";color:#16263a;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}",
      s + ">svg{position:absolute;inset:0;width:100%;height:100%;display:block}",
      s + " text{font-family:inherit;paint-order:stroke fill}",
      s + " .mv{transform-box:fill-box;transform-origin:50% 50%}",
      s + " .mv.ob{transform-origin:50% 100%}",
      s + " .mv.ol{transform-origin:0% 50%}",
      s + " .mv.ot{transform-origin:50% 0%}",
      s + " .halo{stroke:#fbf8f1;stroke-width:5px;stroke-linejoin:round}",
      s + " .halo-d{stroke:#16263a;stroke-width:4px;stroke-linejoin:round}",
      s + " .chip.pop{animation:w13v2pop .45s cubic-bezier(.2,1.4,.4,1)}",
      s + " .chip{transform-box:fill-box;transform-origin:50% 50%}",
      s + " .bob{animation:w13v2bob 2.8s ease-in-out infinite}",
      s + " .pulse{animation:w13v2pulse 1.8s ease-in-out infinite}",
      s + " .march{animation:w13v2march 1.1s linear infinite}",
      s + " .spin{transform-box:fill-box;transform-origin:50% 50%;animation:w13v2spin 9s linear infinite}",
      s + " .sway{transform-box:fill-box;transform-origin:50% 0%;animation:w13v2sway 3.4s ease-in-out infinite}",
      s + " .walk{animation:w13v2walk 5s linear infinite}",
      s + " .drift{animation:w13v2drift 4s ease-in-out infinite}",
      s + " .blink{animation:w13v2blink 1.2s steps(2,end) infinite}",
      "@media (prefers-reduced-motion:reduce){" + s + " *{animation:none!important;transition:none!important}}"
    ].join("\n");
  }
  var KEYFRAMES = [
    "@keyframes w13v2pop{0%{transform:scale(.84);opacity:.3}100%{transform:scale(1);opacity:1}}",
    "@keyframes w13v2bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}",
    "@keyframes w13v2pulse{0%,100%{opacity:.35}50%{opacity:1}}",
    "@keyframes w13v2march{to{stroke-dashoffset:-24}}",
    "@keyframes w13v2spin{to{transform:rotate(360deg)}}",
    "@keyframes w13v2sway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}",
    "@keyframes w13v2walk{0%{transform:translateX(-40px);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateX(60px);opacity:0}}",
    "@keyframes w13v2drift{0%,100%{transform:translateX(-6px)}50%{transform:translateX(6px)}}",
    "@keyframes w13v2blink{0%{opacity:1}100%{opacity:.25}}"
  ].join("\n");

  /* ---------- scene factory ---------- */
  function scene(id, cfg) {
    var tags = cfg.tags, N = tags.length, boards = cfg.boards;
    var accent = cfg.accent || C.navy;
    var root = null, svg = null, core = null, nodes = [], last = -1, lastB = -1, ro = null, chipT = null, chipG = null;
    var DEF = { x: 0, y: 0, r: 0, s: 1, sx: 1, sy: 1, o: 1, d: 0, n: 0 };
    function boardOf(k) {
      for (var i = 0; i < boards.length; i++) if (k >= boards[i].a && k <= boards[i].b) return i;
      return boards.length - 1;
    }
    function fit() {
      if (!root || !svg) return;
      var w = root.clientWidth || CW, h = root.clientHeight || CH, a = w / Math.max(1, h), VW = CW, VH = CH;
      if (a > CW / CH) VW = Math.min(CH * a, CW * 1.35); else VH = Math.min(CW / a, CH * 1.45);
      svg.setAttribute("viewBox", "0 0 " + VW.toFixed(2) + " " + VH.toFixed(2));
      core.setAttribute("x", ((VW - CW) / 2).toFixed(2));
      core.setAttribute("y", ((VH - CH) / 2).toFixed(2));
    }
    function markup() {
      var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + CW + " " + CH + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(cfg.label) + '">' +
        '<svg class="core" x="0" y="0" width="' + CW + '" height="' + CH + '" viewBox="0 0 ' + CW + " " + CH + '" overflow="visible" style="overflow:visible">';
      PFX = "";
      s += cfg.bg();
      boards.forEach(function (bd, i) {
        PFX = "b" + i + "_";
        s += '<g class="mv bdg" data-k="B' + i + '" data-o="0">' + bd.draw() + "</g>";
      });
      PFX = "";
      s += '<g transform="translate(200 22)"><g class="chip">' + L(0, 0, tags[0], { z: 15, s: accent, f: C.ink, bg: C.paper }) + "</g></g>";
      s += M("__pg", 0, 297, R(0, -2, CW, 4, accent, { op: 0.9 }), { c: "ol" });
      return s + "</svg></svg>";
    }
    function paint(n) {
      var s = n._s;
      n.style.transform = "translate(" + s.x.toFixed(2) + "px," + s.y.toFixed(2) + "px) rotate(" + s.r.toFixed(2) + "deg) scale(" +
        (s.s * s.sx).toFixed(4) + "," + (s.s * s.sy).toFixed(4) + ")";
      n.style.opacity = String(clamp(s.o, 0, 1));
      if (n._dr) n.style.strokeDashoffset = (100 - 100 * clamp(s.d, 0, 1)).toFixed(2);
      if (n._num) n.textContent = n._pre + fmtNum(s.n) + n._suf;
    }
    function fitPill(g) {
      try {
        var t = g.querySelector("text"), r = g.querySelector("rect");
        var w = t.getComputedTextLength();
        if (!(w > 0)) return;
        var pad = Number(g.getAttribute("data-pad")) || 20, cx = Number(g.getAttribute("data-cx")) || 0;
        r.setAttribute("width", (w + pad).toFixed(1));
        r.setAttribute("x", (cx - (w + pad) / 2).toFixed(1));
      } catch (e) { /* layout not available yet */ }
    }
    function register() {
      nodes = [];
      var list = root.querySelectorAll("[data-k]");
      for (var i = 0; i < list.length; i++) {
        var n = list[i], k = n.getAttribute("data-k"), m = /^b(\d+)_/.exec(k);
        n._k = k; n._b = m ? Number(m[1]) : -1;
        n._dr = n.classList && n.classList.contains("dr");
        n._isT = n.tagName.toLowerCase() === "text";
        n._num = n._isT && n.hasAttribute("data-n");
        n._pre = n.getAttribute("data-pre") || ""; n._suf = n.getAttribute("data-suf") || "";
        n._anim = (n.classList && n.classList.contains("mv")) || n._num;
        var o0 = n.getAttribute("data-o"), d0 = n.getAttribute("data-d");
        n._d0 = {};
        for (var p in DEF) n._d0[p] = DEF[p];
        if (o0 !== null) n._d0.o = Number(o0);
        if (d0 !== null) n._d0.d = Number(d0);
        if (n._num) n._d0.n = Number(n.getAttribute("data-n")) || 0;
        n._s = {};
        for (var q in n._d0) n._s[q] = n._d0[q];
        n._t0 = n._isT && !n._num ? n.textContent : null;
        n._f0 = n.getAttribute("fill");
        n._st0 = n.getAttribute("stroke");
        n._tok = 0;
        if (n._anim) paint(n);
        nodes.push(n);
      }
      chipG = root.querySelector(".chip");
      chipT = chipG ? chipG.querySelector("text") : null;
      var pills = root.querySelectorAll(".pill");
      for (var j = 0; j < pills.length; j++) fitPill(pills[j]);
    }
    function kill(n) {
      n._tok++;
      if (W.gsap) { try { W.gsap.killTweensOf(n._s); } catch (e) { } }
    }
    function tween(n, to, dur, del, ease) {
      kill(n);
      if (W.gsap) {
        try {
          var v = {};
          for (var p in to) v[p] = to[p];
          v.duration = dur; v.delay = del; v.ease = GSE[ease] || GSE.io; v.overwrite = true;
          v.onUpdate = function () { paint(n); };
          W.gsap.to(n._s, v);
          return;
        } catch (e) { /* fall through to rAF */ }
      }
      var from = {}, tok = n._tok, t0 = nowMs() + del * 1000, ef = EASE[ease] || EASE.io;
      for (var q in to) from[q] = n._s[q];
      var raf = W.requestAnimationFrame || function (f) { return setTimeout(function () { f(nowMs()); }, 16); };
      function frame() {
        if (tok !== n._tok) return;
        var t = (nowMs() - t0) / (dur * 1000);
        if (t < 0) { raf(frame); return; }
        var e = ef(clamp(t, 0, 1));
        for (var r in to) n._s[r] = from[r] + (to[r] - from[r]) * e;
        paint(n);
        if (t < 1) raf(frame);
      }
      raf(frame);
    }
    function snap(n, to) {
      kill(n);
      for (var p in to) n._s[p] = to[p];
      paint(n);
    }
    function render(k, quick) {
      var bi = boardOf(k), bd = boards[bi], tg = {};
      function S(key, p) {
        var kk = PFX + key;
        tg[kk] = tg[kk] || {};
        for (var q in p) tg[kk][q] = p[q];
      }
      PFX = "b" + bi + "_";
      bd.view(k - bd.a, S);
      PFX = "";
      for (var j = 0; j < boards.length; j++) tg["B" + j] = { o: j === bi ? 1 : 0, s: j === bi ? 1 : 0.97, dur: 0.5, e: "out" };
      tg.__pg = { sx: (k + 1) / N, dur: 0.6 };
      var entering = bi !== lastB;
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (n._b >= 0 && n._b !== bi) continue;
        if (entering && n._b === bi) snap(n, n._d0);
        var t = tg[n._k] || {}, num = {}, diff = false;
        for (var p in n._d0) {
          var v = t[p] !== undefined ? t[p] : n._d0[p];
          num[p] = v;
          if (Math.abs(n._s[p] - v) > 1e-4) diff = true;
        }
        if (n._t0 !== null) {
          var txt = t.t !== undefined ? String(t.t) : n._t0;
          if (n.textContent !== txt) {
            n.textContent = txt;
            if (n.parentNode && n.parentNode.classList && n.parentNode.classList.contains("pill")) fitPill(n.parentNode);
          }
        }
        var f = t.f !== undefined ? t.f : n._f0;
        if (f !== null && n.getAttribute("fill") !== f) n.setAttribute("fill", f);
        var st = t.st !== undefined ? t.st : n._st0;
        if (st !== null && n.getAttribute("stroke") !== st) n.setAttribute("stroke", st);
        if (!n._anim || !diff) continue;
        if (quick) snap(n, num);
        else tween(n, num, t.dur !== undefined ? t.dur : 0.8, (t.del || 0) + (entering && n._b === bi ? 0.12 : 0), t.e || "io");
      }
      if (chipT) {
        var changed = chipT.textContent !== tags[k];
        chipT.textContent = tags[k];
        fitPill(chipG.querySelector(".pill"));
        if (changed && !quick) {
          chipG.classList.remove("pop");
          void chipG.getBoundingClientRect();
          chipG.classList.add("pop");
        }
      }
      if (svg) svg.setAttribute("aria-label", cfg.label + ": " + tags[k]);
      lastB = bi;
    }
    function show(k, instant) {
      if (!root) return;
      render(k, !!instant || reduced());
      last = k;
    }
    function index(i, n) {
      var ii = Math.floor(Number(i) || 0), nn = Math.floor(Number(n) || 0);
      if (!(nn > 0)) nn = N;
      ii = clamp(ii, 0, nn - 1);
      if (nn === N) return ii;
      if (nn === 1) return 0;
      return clamp(Math.round((ii * (N - 1)) / (nn - 1)), 0, N - 1);
    }
    VLS[id] = {
      build: function (host) {
        if (!host) return;
        if (ro) { try { ro.disconnect(); } catch (e) { } ro = null; }
        root = document.createElement("div");
        root.className = "vls-w13-" + id;
        root.innerHTML = markup();
        if (typeof host.replaceChildren === "function") host.replaceChildren(root);
        else { host.innerHTML = ""; host.appendChild(root); }
        if (host.clientHeight < 60) root.style.cssText = "height:auto;aspect-ratio:4/3";
        svg = root.querySelector("svg");
        core = root.querySelector("svg.core");
        register();
        fit();
        if (W.ResizeObserver) { ro = new W.ResizeObserver(fit); ro.observe(root); }
        last = -1; lastB = -1;
        show(0, true);
      },
      step: function (i, n) {
        if (!root) return;
        var k = index(i, n);
        if (k === last) return;
        show(k, false);
      },
      reset: function () {
        if (!root) return;
        last = -1; lastB = -1;
        show(0, true);
      },
      _meta: { n: N, boards: boards.map(function (b) { return [b.a, b.b, b.tpl]; }) }
    };
    CSS.push(baseCSS(id, cfg.bgc || "#f5f0e6") + (cfg.css ? "\n" + cfg.css : ""));
  }
  function installCSS(mark) {
    var st = document.getElementById("vl-sc-w13");
    if (!st) {
      st = document.createElement("style");
      st.id = "vl-sc-w13";
      (document.head || document.documentElement).appendChild(st);
    }
    var tagm = "/*" + mark + "*/";
    if (st.textContent.indexOf(tagm) === -1) st.textContent += "\n" + tagm + "\n" + (st.textContent.indexOf("w13v2pop{") === -1 ? KEYFRAMES + "\n" : "") + CSS.join("\n");
  }
  /* Board constructor: lines a..b, benchmark template, draw(), view(b, S). */
  function BD(a, b, tpl, draw, view) { return { a: a, b: b, tpl: tpl, draw: draw, view: view }; }
  /* Full-bleed backdrop helper (paints far beyond the 400 x 300 core). */
  function backdrop(top, bottom, floorY, floor, extra) {
    var id = "g" + Math.random().toString(36).slice(2, 8);
    return "<defs>" + el("linearGradient", { id: id, x1: 0, y1: 0, x2: 0, y2: 1 },
      el("stop", { offset: 0, "stop-color": top }) + el("stop", { offset: 1, "stop-color": bottom })) + "</defs>" +
      R(-400, -300, 1200, 900, "url(#" + id + ")") + (floor ? R(-400, floorY, 1200, 600, floor) : "") + (extra || "");
  }
  /* ==================================================================
     W13O1d  WHEN TWO CAUSES CHANGE THE SAME RESULT  (27 lines)
     Rebuilt first (lowest audit score 3.4/10: 14 WEAK, 10 MISMATCH).
     Nine boards: the attribution question, the debtor-days example,
     comparison groups, then Qasr's retention and labour claims.
     ================================================================== */
  scene("W13O1d", {
    label: "When two causes change the same result",
    accent: C.teal,
    bgc: "#edf3f3",
    bg: function () { return backdrop("#e4eff0", "#f5f1e8", 274, "#e5dfcf"); },
    tags: ["Hard to prove", "Better after go-live", "Attribution: whose share?", "Debtor days",
      "47 \u2192 31 days", "Sixteen days faster", "A penalty, same period", "Reminders or penalty?",
      "Can't split by looking", "No borrowed credit", "Investigate alternatives", "Compare similar groups",
      "Redesign without penalty", "Differences are clues", "Clues, not certainty", "Back to Qasr",
      "180k retained, rates \u22124%", "Two plausible causes", "Not all to BPM", "Uncertain is not worthless",
      "Evidence sets the amount", "The labour claim", "Payroll, decisions, capacity", "Evidence for each claim",
      "Smaller but defensible", "Demonstrated, not credited", "Trust guides investment"],
    boards: [
      /* 1. Lines 0-2. A result improves; the gain is split into a process share and an unknown share.
         Adapted from: 128 Pie chart update (sector angles tween between datasets)
         https://observablehq.com/@d3/pie-chart-update  */
      BD(0, 2, "128", function () {
        var s = "";
        s += P("M24 250 H220", C.ink, 2.5);
        s += M("bef", 70, 250, R(-30, -80, 60, 80, C.slate, { rx: 4 }) + T(0, 16, "BEFORE", { z: 13, f: C.slate }), { c: "ob" });
        s += M("aft", 160, 250, R(-30, -80, 60, 80, C.navy, { rx: 4 }) + T(0, 16, "AFTER", { z: 13, f: C.navy }), { c: "ob" });
        s += M("gain", 160, 170, R(-30, -70, 60, 70, C.teal, { rx: 4 }), { c: "ob", o0: 0 });
        s += M("gq", 160, 135, R(-30, -35, 60, 35, "rgba(92,111,132,.35)", { s: C.slate, sw: 2, da: "4 3" }) + T(0, -17, "?", { z: 20, f: C.white }), { o0: 0 });
        s += M("gp", 160, 135, P("M-36 0 H36", C.white, 3, { da: "5 4" }), { o0: 0 });
        s += M("prove", 200, 66, stamp("HARD TO PROVE", C.red, 15), { o0: 0 });
        s += M("lab", 0, 0, L(296, 112, "PROCESS SHARE?", { z: 14, s: C.teal }) + P("M226 112 H196", C.teal, 2) +
          L(296, 150, "OTHER CAUSES?", { z: 14, s: C.slate }) + P("M230 150 H196", C.slate, 2), { o0: 0 });
        s += M("pie", 300, 168, O(0, 0, 62, C.slate) + P("M0 0 L0 -62 A62 62 0 0 1 58.9 19.2 Z", "none", 0, { f: C.teal }) +
          O(0, 0, 30, "#e9f0f0"), { o0: 0 });
        s += M("pq", 300, 168, T(0, 1, "WHOSE?", { z: 14, f: C.ink }), { o0: 0 });
        s += M("def", 300, 264, L(0, 0, "ATTRIBUTION", { z: 15, s: C.teal }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("aft", { sy: 1 });
        V(S, "gain", true, { sy: 1, del: 0.3 });
        S("gain", { o: 1, sy: 1, del: 0.3 });
        V(S, "prove", b === 0, { r: -5, del: 0.8 });
        V(S, "gq", b >= 1, { del: 0.2 }); V(S, "gp", b >= 1, { del: 0.4 });
        V(S, "lab", b === 1, { del: 0.5 });
        V(S, "pie", b === 2, { r: b === 2 ? 0 : -120, dur: 1.1 }); V(S, "pq", b === 2, { del: 0.5 });
        V(S, "def", b === 2, { del: 0.7 });
      }),
      /* 2. Lines 3-5. Debtor days: from invoice to cash; the payment marker slides from day 47 to day 31.
         Adapted from: 135 Timeline by The Creators (milestones revealed with a travelling marker)
         https://motionarray.com/after-effects-templates/timeline/  */
      BD(3, 5, "135", function () {
        var s = "", x0 = 40, k = 7;
        s += P("M" + x0 + " 178 H" + (x0 + 47 * k), C.ink, 3);
        for (var d = 0; d <= 47; d += 1) {
          var big = d % 10 === 0;
          s += P("M" + (x0 + d * k) + " 178 V" + (big ? 190 : 184), C.ink, big ? 2 : 1);
          if (big) s += T(x0 + d * k, 202, String(d), { z: 12, f: C.slate });
        }
        s += M("inv", x0, 140, doc(34, 44, C.navy));
        s += T(x0, 108, "INVOICE", { z: 13, f: C.navy });
        s += M("pay", x0 + 47 * k, 140, coin(20, C.green, "AED", 11) + T(0, -34, "PAID", { z: 13, f: C.green }), { o0: 0 });
        s += M("br", 0, 0, P("M" + x0 + " 226 V234 H" + (x0 + 47 * k) + " V226", C.orange, 2.5), { c: "ol", o0: 0 });
        s += M("cnt", 200, 252, T(0, 0, "", { z: 28, f: C.orange, k: "n", num: { v: 0, suf: " DAYS" } }), { o0: 0 });
        s += M("defn", 200, 74, L(0, 0, "DAYS TO GET PAID", { z: 15, s: C.navy }), { o0: 0 });
        s += M("ill", 200, 74, L(0, 0, "ILLUSTRATIVE EXAMPLE", { z: 14, s: C.slate }), { o0: 0 });
        s += M("old", x0 + 47 * k, 140, O(0, 0, 20, "none", { s: C.slate, sw: 2, da: "4 3" }), { o0: 0 });
        s += M("d16", 0, 0, P("M" + (x0 + 31 * k) + " 140 H" + (x0 + 47 * k - 24), C.green, 3, { da: "4 4" }) +
          L(x0 + 39 * k, 82, "16 DAYS SOONER", { z: 14, s: C.green }), { o0: 0 });
        return s;
      }, function (b, S) {
        var day = b === 0 ? 47 : 31;
        V(S, "pay", true, { x: b >= 1 ? -16 * 7 : 0, dur: 1.3, del: 0.3 });
        S("br", { o: 1, sx: b === 0 ? 1 : 31 / 47, del: 0.3, dur: 1.3 });
        V(S, "cnt", true); S("n", { n: day, dur: 1.3, del: 0.3 });
        V(S, "defn", b === 0); V(S, "ill", b === 1);
        V(S, "old", b >= 1);
        V(S, "d16", b === 2, { del: 0.3 });
        S("cnt", { o: 1, s: b === 2 ? 1.12 : 1 });
      }),
      /* 3. Lines 6-8. Two changes land in the same period; a customer pays early for one reason or both.
         Adapted from: 078 Data Workflow Animation (nodes and links activated in sequence)
         https://dribbble.com/shots/27247003-Data-Workflow-Animation  */
      BD(6, 8, "078", function () {
        var s = "";
        s += M("tl", 0, 0, P("M30 92 H370", C.ink, 3) + R(170, 78, 110, 28, "rgba(42,138,143,.15)", { rx: 6 }) + T(225, 120, "SAME PERIOD", { z: 13, f: C.teal }) +
          T(40, 72, "BEFORE", { z: 12, a: "start", f: C.slate }) + T(362, 72, "AFTER", { z: 12, a: "end", f: C.slate }));
        s += M("e1", 196, 92, O(0, 0, 15, C.white, { s: C.teal, sw: 3 }) + G(gear(7, C.teal), "", "spin"), { o0: 0 });
        s += M("e2", 254, 92, O(0, 0, 15, C.white, { s: C.red, sw: 3 }) + T(0, 1, "!", { z: 16, f: C.red }), { o0: 0 });
        s += M("l1", 120, 140, L(0, 0, "NEW COLLECTIONS", { z: 13, s: C.teal }), { o0: 0 });
        s += M("l2", 300, 140, L(0, 0, "LATE PENALTY", { z: 13, s: C.red }), { o0: 0 });
        s += M("cus", 200, 226, person(C.navy, 1.6));
        s += M("bell", 88, 206, bell(C.teal) + T(0, 34, "REMINDER", { z: 13, f: C.teal }), { o0: 0 });
        s += M("fee", 312, 206, R(-22, -16, 44, 32, C.rose, { rx: 6, s: C.red, sw: 2 }) + T(0, 1, "+FEE", { z: 13, f: C.red }) + T(0, 34, "PENALTY", { z: 13, f: C.red }), { o0: 0 });
        s += D("a1", "M112 206 C140 206 160 214 176 220", C.teal, 3);
        s += D("a2", "M288 206 C260 206 240 214 224 220", C.red, 3);
        s += M("coin", 200, 170, coin(14, C.green, ""), { o0: 0 });
        s += M("q1", 150, 180, qb(10, C.teal), { o0: 0 });
        s += M("q2", 250, 180, qb(10, C.red), { o0: 0 });
        s += M("bar", 200, 168, R(-150, -18, 300, 36, C.white, { rx: 6, s: C.ink, sw: 2 }) + R(-148, -16, 296, 32, C.teal, { rx: 5, op: 0.25 }), { o0: 0 });
        s += M("cut", 200, 168, G(P("M0 -24 V24", C.ink, 3, { da: "4 3" }), "", "drift") , { o0: 0 });
        s += M("cutl", 0, 0, T(120, 168, "PROCESS?", { z: 13, f: C.teal }) + T(280, 168, "PENALTY?", { z: 13, f: C.red }) +
          L(200, 124, "\u221216 DAYS, SPLIT UNKNOWN", { z: 14, s: C.ink, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "e1", true, { e: "back", del: 0.2 }); V(S, "e2", true, { e: "back", del: 0.5 });
        V(S, "l1", b === 0, { del: 0.4 }); V(S, "l2", b === 0, { del: 0.7 });
        S("tl", { o: b === 2 ? 0.25 : 1 });
        S("cus", { o: b === 2 ? 0.3 : 1 });
        V(S, "bell", b === 1); V(S, "fee", b === 1, { del: 0.2 });
        S("a1", { d: b === 1 ? 1 : 0, del: 0.3 }); S("a2", { d: b === 1 ? 1 : 0, del: 0.5 });
        V(S, "coin", b === 1, { y: b === 1 ? -6 : 0, del: 0.9 });
        V(S, "q1", b === 1, { del: 1.1 }); V(S, "q2", b === 1, { del: 1.2 });
        V(S, "bar", b === 2, { y: 30 }); V(S, "cut", b === 2, { y: 30, del: 0.3 });
        V(S, "cutl", b === 2, { y: 30, del: 0.4 });
        S("e1", { o: 1, s: 1, y: b === 2 ? 0 : 0 });
      }),
      /* 4. Lines 9-10. The credit belongs to whoever produced it; investigate the alternatives first.
         Adapted from: 131 Transition end (move, wait, then recolour)
         https://observablehq.com/@d3/transition-end  */
      BD(9, 10, "131", function () {
        var s = "";
        s += M("cA", 66, 230, person(C.teal, 1.4) + T(0, 34, "BPM PROGRAMME", { z: 13, f: C.teal }));
        s += M("cB", 334, 230, person(C.red, 1.4) + T(0, 34, "PENALTY POLICY", { z: 13, f: C.red }));
        s += M("tro", 200, 150, trophy(C.gold, 2.2) + T(0, 52, "\u221216 DAYS", { z: 15, f: C.ink }));
        s += M("hand", 120, 160, P("M-40 10 Q-10 0 10 -4", C.teal, 6) + O(14, -5, 6, C.teal), { o0: 0 });
        s += M("nb", 200, 72, stamp("NO BORROWED CREDIT", C.red, 15), { o0: 0 });
        var CS = [["PROCESS", C.teal, 72], ["PENALTY", C.red, 200], ["OTHER?", C.slate, 328]];
        CS.forEach(function (c, i) {
          s += M("cs" + i, c[2], 88, R(-50, -22, 100, 44, C.white, { rx: 8, s: c[1], sw: 2.5 }) + T(0, 1, c[0], { z: 14, f: c[1] }), { o0: 0 });
          s += D("st" + i, "M" + c[2] + " 110 L200 " + (i === 1 ? 132 : 140), c[1], 2);
        });
        s += M("mg", 72, 124, mag(16), { o0: 0 });
        s += M("inv", 200, 270, L(0, 0, "INVESTIGATE FIRST", { z: 15, s: C.ink, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("cA", { o: b === 0 ? 1 : 0, x: b === 0 ? 0 : -30 }); S("cB", { o: b === 0 ? 1 : 0, x: b === 0 ? 0 : 30 });
        V(S, "hand", b === 0, { x: b === 0 ? 20 : 0, del: 0.3 });
        V(S, "nb", b === 0, { del: 0.8, r: -4 });
        S("tro", { s: b === 1 ? 0.8 : 1, y: b === 1 ? 20 : 0 });
        for (var i = 0; i < 3; i++) { V(S, "cs" + i, b === 1, { del: 0.2 + i * 0.2 }); S("st" + i, { d: b === 1 ? 1 : 0, del: 0.4 + i * 0.2 }); }
        V(S, "mg", b === 1, { x: b === 1 ? 256 : 0, dur: 2, del: 0.6 });
        V(S, "inv", b === 1, { del: 0.4 });
      }),
      /* 5. Lines 11-14. Two comparable groups receive different combinations; their difference is a clue.
         Adapted from: 116 Infographics by Ruslan Klimovich (statistic graphics in sequence)
         https://motionarray.com/after-effects-templates/infographics-3844461/  */
      BD(11, 14, "116", function () {
        var s = "";
        [["A", 104, C.teal], ["B", 296, C.red]].forEach(function (g, gi) {
          var x = g[1];
          var box = R(-86, -58, 172, 116, C.white, { rx: 12, s: g[2], sw: 2.5 }) + T(0, -42, "GROUP " + g[0], { z: 15, f: g[2] });
          for (var i = 0; i < 6; i++) box += G(person(C.navy, 0.62), "translate(" + (-50 + (i % 3) * 50) + " " + (i < 3 ? -8 : 34) + ")");
          s += M("g" + gi, x, 130, box, { o0: 0 });
          s += M("ch" + gi, x, 214, O(-22, 0, 14, C.white, { s: C.teal, sw: 2.5 }) + G(gear(6, C.teal), "translate(-22 0)") +
            O(22, 0, 14, C.white, { s: C.red, sw: 2.5 }) + T(22, 1, "!", { z: 14, f: C.red }) + (gi === 0 ? P("M10 -12 L34 12", C.ink, 3) : ""), { o0: 0 });
          s += M("cl" + gi, x, 244, L(0, 0, gi === 0 ? "REDESIGN ONLY" : "REDESIGN + PENALTY", { z: 13, s: g[2] }), { o0: 0 });
          s += M("ob" + gi, x, 270, R(-60, -8, gi === 0 ? 70 : 110, 16, g[2], { rx: 4 }), { c: "ol", o0: 0 });
        });
        s += M("cmp", 200, 130, L(0, 0, "COMPARABLE?", { z: 13, s: C.ink, f: C.ink }), { o0: 0 });
        s += M("clue", 200, 66, L(0, 0, "DIFFERENCE = CLUE", { z: 15, s: C.orange }), { o0: 0 });
        s += M("mix", 200, 130, L(0, 0, "CUSTOMER MIX?", { z: 13, s: C.plum }), { o0: 0 });
        s += M("ill", 200, 288, T(0, 0, "ILLUSTRATIVE ONLY", { z: 11, f: C.slate }), { o0: 0 });
        s += M("cert", 0, 0, L(110, 66, "CERTAINTY", { z: 14, s: C.red }) + P("M64 66 H156", C.red, 3) + L(290, 66, "BETTER EXPLANATION", { z: 14, s: C.green }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "g0", true, { del: 0.1 }); V(S, "g1", true, { del: 0.3 });
        V(S, "cmp", b === 0, { del: 0.6 });
        V(S, "ch0", b >= 1); V(S, "ch1", b >= 1, { del: 0.2 });
        V(S, "cl0", b >= 1, { del: 0.3 }); V(S, "cl1", b >= 1, { del: 0.4 });
        S("ob0", { o: b >= 2 ? 1 : 0, sx: b >= 2 ? 1 : 0.02 }); S("ob1", { o: b >= 2 ? 1 : 0, sx: b >= 2 ? 1 : 0.02, del: 0.2 });
        V(S, "ill", b >= 2);
        V(S, "clue", b === 2, { del: 0.5 }); V(S, "mix", b === 2, { del: 0.7 });
        V(S, "cert", b === 3);
      }),
      /* 6. Lines 15-18. Qasr: two renewals, a 4% rate cut, two causes, and only part of the credit.
         Adapted from: 106 Supply Chain and logistics (dispatch, transit and receipt connected)
         https://lottiefiles.com/free-animation/supply-chain-and-logistics-8PtoYRCbiu  */
      BD(15, 18, "106", function () {
        var s = "";
        s += M("cli", 60, 150, R(-32, -50, 64, 100, C.sky, { rx: 4, s: C.navy, sw: 2.5 }) +
          [0, 1, 2, 3].map(function (i) { return R(-22 + (i % 2) * 24, -38 + Math.floor(i / 2) * 26, 20, 16, C.white, { rx: 2 }); }).join("") +
          T(0, 64, "CORPORATE", { z: 12, f: C.navy }) + T(0, 80, "CLIENTS", { z: 12, f: C.navy }));
        s += M("htl", 340, 150, hotel(C.orange, 2) + T(0, 66, "QASR", { z: 13, f: C.orange }));
        s += D("route", "M98 150 H296", C.slate, 3, { c: "" });
        s += M("c1", 120, 138, contract(C.green), { o0: 0 });
        s += M("c2", 150, 160, contract(C.green), { o0: 0 });
        s += M("amt", 200, 72, L(0, 0, "AED 180k RETAINED", { z: 16, s: C.green }), { o0: 0 });
        s += M("rate", 290, 262, R(-58, -18, 116, 36, C.amber, { rx: 8, s: C.orange, sw: 2 }) + T(0, 1, "RATES \u22124%", { z: 15, f: C.orange }), { o0: 0 });
        s += M("k1", 0, 0, L(150, 238, "ARRIVAL PROCESS", { z: 13, s: C.teal }) + arrowH(176, 224, 216, 180, C.teal, 3), { o0: 0 });
        s += M("k2", 0, 0, arrowH(280, 242, 246, 182, C.orange, 3), { o0: 0 });
        s += M("pie", 220, 158, O(0, 0, 34, C.white, { s: C.green, sw: 3 }) + P("M0 0 L0 -34 A34 34 0 0 1 32.3 10.5 Z", "none", 0, { f: C.teal, op: 0.8 }) +
          P("M0 0 L32.3 10.5", C.ink, 2, { da: "3 3" }) + T(0, 52, "BPM SHARE?", { z: 13, f: C.teal }), { o0: 0 });
        s += M("all", 200, 112, L(0, 0, "ALL TO BPM", { z: 14, s: C.red }) + P("M-50 0 H50", C.red, 3), { o0: 0 });
        return s;
      }, function (b, S) {
        S("route", { d: 1 });
        V(S, "c1", b <= 2, { x: b >= 0 ? 170 : 0, del: 0.3, dur: 1.4 });
        V(S, "c2", b <= 2, { x: b >= 0 ? 140 : 0, del: 0.6, dur: 1.4 });
        V(S, "amt", b >= 1);
        V(S, "rate", b >= 1, { del: 0.3, y: b >= 1 ? 0 : 20 });
        V(S, "k1", b >= 2, { del: 0.2 }); V(S, "k2", b >= 2, { del: 0.4 });
        V(S, "pie", b === 3, { del: 0.2 }); V(S, "all", b === 3, { del: 0.6 });
        S("htl", { s: b === 0 ? 1.06 : 1 });
      }),
      /* 7. Lines 19-20. Uncertain is not worthless; the claim may rise only as high as its evidence.
         Adapted from: 132 Easing Animations (the same motion replayed with different timing)
         https://observablehq.com/@d3/easing-animations  */
      BD(19, 20, "132", function () {
        var s = "";
        s += M("sl", 200, 120, R(-160, -8, 320, 16, C.mist, { rx: 8 }) + T(-160, 30, "NO VALUE", { z: 14, a: "start", f: C.red }) +
          T(160, 30, "FULL CLAIM", { z: 14, a: "end", f: C.slate }) + G(nob(10), "translate(-174 -22)"));
        s += M("knob", 200, 120, O(0, 0, 14, C.teal, { s: C.white, sw: 3 }), { o0: 0 });
        s += M("gv", 200, 214, O(0, 0, 30, C.white, { s: C.teal, sw: 3 }) + G(G(gear(14, C.teal), "", "spin")) + L(0, 50, "SOME VALUE CREATED", { z: 14, s: C.teal }), { o0: 0 });
        s += M("unc", 200, 74, L(0, 0, "UNCERTAIN \u2260 WORTHLESS", { z: 15, s: C.teal }), { o0: 0 });
        s += P("M40 262 H360", C.ink, 2.5);
        var st = "";
        for (var i = 0; i < 3; i++) st += R(-40, -26 - i * 26, 80, 24, C.white, { rx: 3, s: C.green, sw: 2 }) + P("M-28 " + (-14 - i * 26) + " H28", C.green, 2, { op: 0.6 });
        s += M("evs", 130, 262, st + T(0, 14, "EVIDENCE", { z: 13, f: C.green }), { o0: 0 });
        s += M("clm", 270, 262, R(-34, -78, 68, 78, C.teal, { rx: 4 }) + T(0, 14, "CLAIM", { z: 13, f: C.teal }), { c: "ob", o0: 0 });
        s += M("cap", 0, 0, P("M80 184 H330", C.green, 2.5, { da: "6 4" }), { o0: 0 });
        s += M("ghost", 270, 262, R(-34, -140, 68, 140, "none", { rx: 4, s: C.slate, sw: 2, da: "5 4" }), { o0: 0 });
        s += M("sets", 270, 98, L(0, 0, "EVIDENCE SETS AMOUNT", { z: 13, s: C.green }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("sl", { o: b === 0 ? 1 : 0, y: b === 1 ? -40 : 0 });
        V(S, "knob", b === 0, { x: b === 0 ? -20 : -160, dur: 1.4, del: 0.2 });
        V(S, "unc", b === 0, { del: 0.6 }); V(S, "gv", b === 0, { del: 0.9, e: "back" });
        V(S, "evs", b === 1); S("clm", { o: b === 1 ? 1 : 0, sy: b === 1 ? 1 : 0.02, del: 0.4 });
        V(S, "ghost", b === 1, { del: 0.2 }); V(S, "cap", b === 1, { del: 0.8 }); V(S, "sets", b === 1, { del: 1 });
      }),
      /* 8. Lines 21-23. The labour claim: eleven against four, three files to open, every claim tied to its cause.
         Adapted from: 107 Supply Chain and Shipping (shipment advanced through network nodes)
         https://lottiefiles.com/free-animation/supply-chain-and-shipping-Gd8ZsVZpXq  */
      BD(21, 23, "107", function () {
        var s = "";
        for (var i = 0; i < 11; i++) {
          s += M("p" + i, 40 + i * 32, 104, person(i < 4 ? C.orange : C.navy, 0.85), { o0: 0 });
        }
        s += M("lab", 200, 62, L(0, 0, "11 ASSUMED, 4 FEWER", { z: 15, s: C.orange }), { o0: 0 });
        var F = [["PAYROLL", C.navy, 80], ["DECISIONS", C.green, 200], ["CAPACITY", C.teal, 320]];
        F.forEach(function (f, i) {
          s += M("f" + i, f[2], 196, R(-50, -30, 100, 60, C.white, { rx: 6, s: f[1], sw: 2.5 }) + R(-50, -38, 40, 10, f[1], { rx: 3 }) +
            T(0, 2, f[0], { z: 14, f: f[1] }), { o0: 0 });
        });
        s += M("mg", 80, 240, mag(12), { o0: 0 });
        var CL = [["LABOUR", C.navy, 64], ["RETENTION", C.green, 200], ["PENALTY", C.plum, 336]];
        var CH = [["STAFFING", 64], ["SERVICE + PRICE", 200], ["EXPOSURE", 336]];
        CL.forEach(function (c, i) {
          s += M("cl" + i, c[2], 88, L(0, 0, c[0], { z: 14, s: c[1] }), { o0: 0 });
          s += D("ln" + i, "M" + c[2] + " 102 V176", c[1], 2.5);
          s += M("cc" + i, CH[i][1], 196, L(0, 0, CH[i][0], { z: 13, s: C.ink, f: C.ink }), { o0: 0 });
          s += M("ev" + i, c[2], 248, doc(26, 32, c[1]), { o0: 0 });
          s += D("le" + i, "M" + c[2] + " 210 V230", c[1], 2.5);
        });
        s += M("eac", 200, 286, T(0, 0, "EVIDENCE FOR EACH CLAIM", { z: 13, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 11; i++) V(S, "p" + i, b <= 1, { o: b <= 1 ? (i < 4 ? 0.25 : 1) : 0, del: i * 0.04, y: b === 1 ? -20 : 0 });
        V(S, "lab", b === 0, { del: 0.5 });
        for (var j = 0; j < 3; j++) {
          V(S, "f" + j, b === 1, { del: 0.2 + j * 0.15, y: b === 1 ? 0 : 20 });
          V(S, "cl" + j, b === 2, { del: j * 0.1 }); S("ln" + j, { d: b === 2 ? 1 : 0, del: 0.3 + j * 0.1 });
          V(S, "cc" + j, b === 2, { del: 0.5 + j * 0.1 }); S("le" + j, { d: b === 2 ? 1 : 0, del: 0.7 + j * 0.1 });
          V(S, "ev" + j, b === 2, { del: 0.9 + j * 0.1, e: "back" });
        }
        V(S, "mg", b === 1, { x: b === 1 ? 240 : 0, dur: 2, del: 0.5 });
        V(S, "eac", b === 2, { del: 1.2 });
      }),
      /* 9. Lines 24-26. A tall tower of assumptions against a short one of evidence; credit and investment follow proof.
         Adapted from: 083 The Process Architectural Motion (structure built and revised in layers)
         https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion  */
      BD(24, 26, "083", function () {
        var s = "";
        s += P("M30 262 H370", C.ink, 2.5);
        var tw = "";
        for (var i = 0; i < 6; i++) tw += G(cloud(i % 2 ? "#cfd8e2" : "#dfe6ee", 0.9), "translate(" + (i % 2 ? 6 : -6) + " " + (-18 - i * 30) + ")");
        s += M("tA", 110, 262, G(tw, "", "sway") + T(0, 16, "ASSUMPTIONS", { z: 13, f: C.slate }), { o0: 0 });
        var br = "";
        for (var j = 0; j < 3; j++) br += R(-40, -26 - j * 26, 80, 24, C.orange, { rx: 2, s: C.white, sw: 2 });
        s += M("tB", 290, 262, br + T(0, 16, "EVIDENCE", { z: 13, f: C.orange }) + G(okb(13), "translate(0 -98)"), { o0: 0 });
        s += M("sbd", 290, 66, L(0, 0, "SMALLER, DEFENSIBLE", { z: 15, s: C.green }), { o0: 0 });
        s += M("dc", 110, 150, R(-82, -44, 164, 88, C.pale, { rx: 10, s: C.green, sw: 3 }) + T(0, -14, "DEMONSTRATED", { z: 14, f: C.green }) +
          T(0, 8, "CONTRIBUTION", { z: 14, f: C.green }) + G(okb(11), "translate(0 32)"), { o0: 0 });
        s += M("uc", 290, 150, R(-82, -44, 164, 88, "none", { rx: 10, s: C.slate, sw: 2, da: "6 4" }) + T(0, -14, "UNSUPPORTED", { z: 14, f: C.slate }) +
          T(0, 8, "CREDIT", { z: 14, f: C.slate }) + G(nob(11), "translate(0 32)"), { o0: 0 });
        s += M("kept", 200, 236, L(0, 0, "ACHIEVEMENTS KEPT", { z: 14, s: C.green }), { o0: 0 });
        s += M("iA", 100, 196, R(-62, -30, 124, 60, C.white, { rx: 10, s: C.green, sw: 3 }) + T(0, -8, "PROVEN", { z: 14, f: C.green }) +
          T(0, 12, "INTERVENTION", { z: 12, f: C.green }), { o0: 0 });
        s += M("iB", 300, 196, R(-62, -30, 124, 60, C.white, { rx: 10, s: C.slate, sw: 2, da: "5 4" }) + T(0, -8, "UNPROVEN", { z: 14, f: C.slate }) +
          T(0, 12, "INTERVENTION", { z: 12, f: C.slate }), { o0: 0 });
        for (var k = 0; k < 3; k++) s += M("co" + k, 200, 90, coin(12, C.gold, ""), { o0: 0 });
        s += M("tr", 200, 66, L(0, 0, "INVEST WHERE PROVEN", { z: 15, s: C.ink, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "tA", b === 0); V(S, "tB", b === 0, { del: 0.3 }); V(S, "sbd", b === 0, { del: 0.7 });
        V(S, "dc", b === 1); V(S, "uc", b === 1, { del: 0.2 }); V(S, "kept", b === 1, { del: 0.6 });
        V(S, "iA", b === 2); V(S, "iB", b === 2, { del: 0.1 }); V(S, "tr", b === 2, { del: 0.2 });
        for (var k = 0; k < 3; k++) V(S, "co" + k, b === 2, { x: b === 2 ? -100 + k * 10 : 0, y: b === 2 ? 70 - k * 8 : 0, del: 0.5 + k * 0.25, dur: 1 });
      })
    ]
  });
  /* ==================================================================
     W13O2a  THE GAP BETWEEN PROMISED AND TRACKED  (28 lines)
     Rebuilt (audit 4.1/10: 19 WEAK, 6 MISMATCH). Ten boards: the gap,
     the three possible reasons tested one at a time, and the review.
     ================================================================== */
  scene("W13O2a", {
    label: "The gap between promised and tracked",
    accent: C.orange,
    bgc: "#f5efe9",
    bg: function () { return backdrop("#f3ebe3", "#f7f3ea", 274, "#ebe1cd"); },
    tags: ["A difference to explain", "620 promised, 505 tracked", "115: subtraction only", "Three possible reasons",
      "Reason 1: timing", "7 of 14 recent", "\u201CGive it time\u201D", "Possible, not proven",
      "When should it show?", "What would challenge it?", "Reason 2: action needed", "Capacity, same payroll",
      "Someone must decide", "Never in the accounts", "Eleven assumed", "Four happened",
      "Investigate the capacity", "Later decisions \u2260 savings", "Reason 3: unrealistic", "Pricing changed too",
      "Rates fell 4%", "Penalty is contingent", "Neither sizes the gap", "Finance: reconcile",
      "Dates, measures, decisions", "Not all timing", "Progress and uncertainty", "Credibility protected"],
    boards: [
      /* 1. Lines 0-2. Two bars and the block between them, which arithmetic names but cannot explain.
         Adapted from: 112 Infographics Pack by ARstudio (chart primitives and labels revealed)
         https://motionarray.com/after-effects-templates/infographics-pack-135055/  */
      BD(0, 2, "112", function () {
        var s = "", base = 252, k = 160 / 620;
        s += P("M30 " + base + " H370", C.ink, 2.5);
        s += M("cm", 0, 0, R(232, 266, 150, 10, C.ink, { rx: 3 }) + G(person(C.slate, 0.7), "translate(262 258)") +
          G(person(C.slate, 0.7), "translate(307 258)") + G(person(C.slate, 0.7), "translate(352 258)"));
        s += M("q", 200, 140, T(0, 0, "?", { z: 80, f: C.mist }));
        s += M("bp", 90, base, R(-36, -160, 72, 160, C.navy, { rx: 4 }) + T(0, 16, "PROMISED", { z: 13, f: C.navy }), { c: "ob", o0: 0 });
        s += M("bt", 190, base, R(-36, -505 * k, 72, 505 * k, C.green, { rx: 4 }) + T(0, 16, "TRACKED", { z: 13, f: C.green }), { c: "ob", o0: 0 });
        s += M("vp", 0, 0, T(90, base - 146, "", { z: 18, f: C.white, k: "np", num: { v: 0, suf: "k" } }), { o0: 0 });
        s += M("vt", 0, 0, T(190, base - 505 * k + 14, "", { z: 18, f: C.white, k: "nt", num: { v: 0, suf: "k" } }), { o0: 0 });
        s += M("line", 0, 0, P("M126 " + (base - 160) + " H310", C.navy, 2, { da: "5 4" }), { o0: 0 });
        s += M("gap", 290, base - 160 + 115 * k / 2, R(-36, -115 * k / 2, 72, 115 * k, C.rose, { rx: 4, s: C.red, sw: 2.5 }) + T(0, 1, "115k", { z: 16, f: C.red }), { o0: 0 });
        s += M("eq", 200, 64, L(0, 0, "620 \u2212 505 = 115", { z: 17, s: C.ink, f: C.ink }), { o0: 0 });
        s += M("why", 290, 150, L(0, 0, "WHY?", { z: 20, s: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("q", { o: b === 0 ? 1 : 0, s: b === 0 ? 1 : 0.6 });
        S("bp", { o: b >= 1 ? 1 : 0, sy: b >= 1 ? 1 : 0.02 }); S("bt", { o: b >= 1 ? 1 : 0, sy: b >= 1 ? 1 : 0.02, del: 0.2 });
        V(S, "vp", b >= 1); S("np", { n: b >= 1 ? 620 : 0, dur: 1.1 });
        V(S, "vt", b >= 1); S("nt", { n: b >= 1 ? 505 : 0, dur: 1.1, del: 0.2 });
        V(S, "line", b === 2); V(S, "gap", b === 2, { x: b === 2 ? 0 : -100, del: 0.2, dur: 1 });
        V(S, "eq", b === 2, { del: 0.4 }); V(S, "why", b === 2, { del: 0.9, e: "back" });
        S("cm", { o: b === 2 ? 0.4 : 1 });
      }),
      /* 2. Lines 3-4. Three possible reasons; the first, timing, steps forward.
         Adapted from: 082 Motion Design Process (production stages shown in turn)
         https://www.behance.net/gallery/53752435/Motion-Design-Process  */
      BD(3, 4, "082", function () {
        var s = "", CD = [["AWAITING", "TIME", C.navy], ["NEEDS", "ACTION", C.teal], ["MAY NEVER", "COME", C.plum]];
        CD.forEach(function (c, i) {
          var x = 72 + i * 128, ic = i === 0 ? hourglass(c[2], 1.4) : i === 1 ? G(gear(16, c[2]), "", "spin") : G(person("none", 1.3) +
            P("M-17 18 Q-17 -5 0 -5 Q17 -5 17 18 Z M10 -20 A10 10 0 1 1 9.9 -20.1", c[2], 2.5, { da: "4 3" }));
          s += M("c" + i, x, 148, R(-58, -80, 116, 160, C.white, { rx: 14, s: c[2], sw: 3 }) + G(ic, "translate(0 -20)") +
            T(0, 38, c[0], { z: 15, f: c[2] }) + T(0, 58, c[1], { z: 15, f: c[2] }), { o0: 0 });
        });
        s += M("pos", 200, 258, L(0, 0, "POSSIBLE, NOT ALLOCATED", { z: 14, s: C.ink, f: C.ink }), { o0: 0 });
        s += M("tt", 200, 258, L(0, 0, "RESULTS CAN TAKE TIME", { z: 15, s: C.navy }), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 3; i++) V(S, "c" + i, true, { del: i * 0.2, e: "back", s: b === 1 ? (i === 0 ? 1.12 : 0.9) : 1, o: b === 1 && i > 0 ? 0.35 : 1, x: b === 1 && i === 0 ? 10 : 0 });
        V(S, "pos", b === 0, { del: 0.8 }); V(S, "tt", b === 1, { del: 0.3 });
      }),
      /* 3. Lines 5-7. Fourteen go-lives, seven recent; the director's case; future value drawn only in outline.
         Adapted from: 137 Corporate Timeline by HenlyFx (events revealed one by one)
         https://motionarray.com/after-effects-templates/corporate-timeline-1939632/  */
      BD(5, 7, "137", function () {
        var s = "";
        s += P("M24 150 H376", C.ink, 3);
        s += R(258, 140, 118, 20, "rgba(192,80,42,.14)", { rx: 4 });
        s += T(317, 174, "LAST 4 MONTHS", { z: 13, f: C.orange }) + T(30, 174, "EARLIER", { z: 13, a: "start", f: C.slate });
        var X = [40, 72, 104, 136, 168, 200, 232, 268, 284, 300, 316, 332, 348, 364];
        for (var i = 0; i < 14; i++) {
          var rec = i >= 7, y = rec ? (i % 2 ? 120 : 96) : 120;
          s += M("h" + i, X[i], y, hotel(rec ? C.orange : C.navy, 0.5), { o0: 0 });
        }
        s += M("big", 120, 236, T(0, 0, "7 of 14", { z: 30, f: C.orange }) + T(0, 30, "WENT LIVE RECENTLY", { z: 13, f: C.ink }), { o0: 0 });
        s += M("dir", 290, 262, person(C.navy, 1.3), { o0: 0 });
        s += M("say", 232, 216, speech(156, 38, C.navy) + T(0, 0, "GIVE IT TIME", { z: 15, f: C.navy }), { o0: 0 });
        s += M("fut", 104, 228, R(-60, -44, 120, 88, "rgba(92,111,132,.08)", { rx: 8, s: C.slate, sw: 2.5, da: "6 5" }) +
          T(0, -20, "FUTURE BENEFITS?", { z: 13, f: C.slate }), { o0: 0 });
        s += M("np", 104, 246, stamp("NOT PROVEN", C.red, 14), { o0: 0 });
        s += M("inv", 290, 196, L(0, 0, "WORTH INVESTIGATING", { z: 13, s: C.green }), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 14; i++) V(S, "h" + i, true, { del: i * 0.06, e: "back" });
        V(S, "big", b === 0, { del: 0.9 });
        V(S, "dir", b >= 1); V(S, "say", b === 1, { del: 0.3, e: "back" });
        V(S, "fut", b === 2); V(S, "np", b === 2, { del: 0.6, r: -6 }); V(S, "inv", b === 2, { del: 0.9 });
      }),
      /* 4. Lines 8-9. A credible timing claim has a measurement window, emerging evidence and a challenge line.
         Adapted from: 136 Project TimeLine (advance along time markers)
         https://motionarray.com/after-effects-templates/project-timeline-2424919/  */
      BD(8, 9, "136", function () {
        var s = "";
        s += P("M30 246 H372 M30 246 V74", C.ink, 2.5) + T(36, 66, "BENEFIT MEASURE", { z: 13, a: "start", f: C.slate });
        s += M("gl", 80, 246, P("M0 0 V-168", C.slate, 2, { da: "5 5" }) + T(0, 16, "GO-LIVE", { z: 13, f: C.slate }));
        s += M("win", 0, 0, R(150, 78, 160, 168, "rgba(42,138,143,.12)", { s: C.teal, sw: 2, da: "6 4" }) +
          T(230, 92, "MEASUREMENT PERIOD", { z: 13, f: C.teal }), { o0: 0 });
        var pts = [[96, 214], [124, 206], [152, 196], [180, 190], [208, 176], [236, 170]];
        pts.forEach(function (p, i) { s += M("e" + i, p[0], p[1], O(0, 0, 6, C.green), { o0: 0 }); });
        s += M("eml", 160, 230, L(0, 0, "EMERGING EVIDENCE", { z: 13, s: C.green }), { o0: 0 });
        s += M("rev", 310, 246, P("M0 0 V-168", C.orange, 3) + G(flag(C.orange, 1), "translate(0 -168)") + T(0, 16, "REVIEW DATE", { z: 13, f: C.orange }), { o0: 0 });
        s += M("thr", 0, 0, P("M150 186 H310", C.red, 2.5, { da: "8 5" }) + L(230, 214, "CHALLENGE IF BELOW", { z: 13, s: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "win", true, { del: 0.2 });
        for (var i = 0; i < 6; i++) V(S, "e" + i, true, { del: 0.4 + i * 0.12, e: "back" });
        V(S, "eml", b === 0, { del: 1.1 });
        V(S, "rev", b === 1, { y: b === 1 ? 0 : 20 }); V(S, "thr", b === 1, { del: 0.4 });
      }),
      /* 5. Lines 10-13. Capacity fills a tank; the valve to the accounts needs a manager's decision.
         Adapted from: 099 Bottling factory (items advance to a station and wait there)
         https://lottiefiles.com/free-animation/bottling-factory-53Q3SoGu0x  */
      BD(10, 13, "099", function () {
        var s = "";
        s += O(54, 124, 30, C.white, { s: C.teal, sw: 3 }) + G(G(gear(14, C.teal), "", "spin"), "translate(54 124)") + T(54, 170, "FASTER", { z: 13, f: C.teal }) +
          T(54, 186, "PROCESS", { z: 13, f: C.teal });
        s += R(84, 118, 52, 12, C.slate) + P("M86 124 H134", C.white, 2, { da: "6 6", c: "march" });
        s += R(136, 74, 80, 112, C.white, { rx: 8, s: C.teal, sw: 3 }) + T(176, 200, "CAPACITY", { z: 13, f: C.teal });
        s += M("lvl", 176, 184, R(-38, -96, 76, 96, "rgba(42,138,143,.55)", { rx: 4 }), { c: "ob" });
        s += R(216, 118, 56, 12, C.slate);
        s += M("valve", 244, 124, O(0, 0, 16, C.white, { s: C.ink, sw: 3 }) + P("M-12 0 H12", C.red, 4));
        s += M("open", 244, 124, P("M0 -12 V12", C.green, 4), { o0: 0 });
        s += R(272, 118, 30, 12, C.slate, { op: 0.4 });
        s += R(302, 70, 82, 108, C.white, { rx: 8, s: C.navy, sw: 2.5 }) + T(343, 88, "ACCOUNTS", { z: 13, f: C.navy });
        s += M("ghost", 343, 134, O(0, 0, 20, "none", { s: C.slate, sw: 2, da: "4 3" }) + T(0, 1, "?", { z: 18, f: C.slate }), { o0: 0 });
        s += M("act", 244, 166, L(0, 0, "ACTION NEEDED", { z: 14, s: C.red }), { o0: 0 });
        s += M("pay", 0, 0, R(30, 232, 150, 40, C.white, { rx: 8, s: C.navy, sw: 2 }) + T(105, 244, "PAYROLL", { z: 12, f: C.navy }) +
          R(44, 254, 122, 10, C.navy, { rx: 4 }) + L(105, 214, "UNCHANGED", { z: 13, s: C.navy }), { o0: 0 });
        s += M("mgr", 244, 210, person(C.green, 1.3) + P("M10 -6 L0 -60", C.green, 4), { o0: 0 });
        s += M("who", 320, 226, L(0, 0, "WHO DECIDES?", { z: 14, s: C.green }), { o0: 0 });
        s += M("nev", 343, 210, stamp("NEVER APPEARS", C.red, 12), { o0: 0 });
        s += M("theo", 176, 250, L(0, 0, "THEORETICALLY AVAILABLE", { z: 13, s: C.teal }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("lvl", { sy: b === 0 ? 0.35 : 1, dur: 1.4 });
        V(S, "act", b === 0, { del: 0.3 });
        V(S, "pay", b === 1, { del: 0.3 });
        V(S, "mgr", b === 2, { x: b === 2 ? 0 : -20 }); V(S, "who", b === 2, { del: 0.4 });
        V(S, "ghost", b === 3); V(S, "nev", b === 3, { del: 0.4, r: -6 }); V(S, "theo", b === 3, { del: 0.6 });
        S("valve", { r: b === 2 ? 30 : 0 });
      }),
      /* 6. Lines 14-17. Eleven desks assumed empty, four actually; the rest is a question for management, not a saving.
         Adapted from: 119 Infographics V2 by Typoland (statistic modules with scale and numeric tweens)
         https://motionarray.com/after-effects-templates/infographics-v2-556482/  */
      BD(14, 17, "119", function () {
        var s = "";
        for (var i = 0; i < 11; i++) {
          var x = 40 + (i % 6) * 64, y = i < 6 ? 104 : 178;
          s += R(x - 22, y + 10, 44, 8, C.slate, { rx: 2 });
          s += M("pp" + i, x, y, person(C.navy, 0.95));
          s += M("ex" + i, x, y, person(C.orange, 0.95), { o0: 0 });
        }
        s += M("n11", 360, 182, T(0, 0, "11", { z: 34, f: C.orange }) + T(0, 26, "ASSUMED", { z: 12, f: C.orange }), { o0: 0 });
        s += M("n4", 360, 182, T(0, 0, "4", { z: 34, f: C.green }) + T(0, 26, "ACTUAL", { z: 12, f: C.green }), { o0: 0 });
        s += M("clm", 200, 58, L(0, 0, "AED 240k: EXAMINE", { z: 15, s: C.navy }), { o0: 0 });
        s += M("mg", 168, 184, mag(18), { o0: 0 });
        s += M("qs", 200, 252, L(0, 0, "SPARE CAPACITY? DECISIONS?", { z: 13, s: C.teal }), { o0: 0 });
        s += M("cal", 90, 250, cal(C.plum, 1.2) + T(34, 0, "LATER DECISION", { z: 13, a: "start", f: C.plum }), { o0: 0 });
        s += M("nr", 300, 250, coin(14, C.gold, "") + P("M-14 14 L14 -14", C.red, 4) + T(0, 26, "NOT RECOGNISED", { z: 12, f: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 11; i++) {
          var gone = b >= 1 && i < 4;
          V(S, "ex" + i, b === 0, { del: i * 0.05 });
          S("pp" + i, { o: gone ? 0.12 : 1, y: gone ? -8 : 0, del: gone ? 0.3 + i * 0.12 : 0 });
        }
        V(S, "n11", b === 0, { del: 0.5 }); V(S, "n4", b >= 1, { del: 0.8 });
        V(S, "clm", b === 1);
        V(S, "mg", b === 2, { x: b === 2 ? 120 : 0, dur: 1.8 });
        V(S, "qs", b === 2, { del: 0.4 });
        V(S, "cal", b === 3); V(S, "nr", b === 3, { del: 0.3 });
      }),
      /* 7. Lines 18-20. An assumption cracks: retained revenue may owe part of itself to a 4% price cut.
         Adapted from: 134 Shape tweening (source polygon transformed into a target)
         https://observablehq.com/@d3/shape-tweening  */
      BD(18, 20, "134", function () {
        var s = "";
        s += M("card", 110, 150, R(-84, -70, 168, 140, C.white, { rx: 12, s: C.plum, sw: 3 }) + T(0, -42, "ORIGINAL", { z: 14, f: C.plum }) +
          T(0, -22, "ASSUMPTION", { z: 14, f: C.plum }) + doc(60, 60, C.plum));
        s += M("crack", 110, 150, P("M-20 -70 L-6 -30 L-18 0 L4 30 L-8 70", C.red, 3.5), { o0: 0 });
        s += M("unr", 110, 252, L(0, 0, "UNREALISTIC?", { z: 15, s: C.red }), { o0: 0 });
        s += M("rev", 290, 160, R(-60, -60, 120, 120, C.pale, { rx: 12, s: C.green, sw: 3 }) + G(contract(C.green), "translate(-20 -6)") +
          G(contract(C.green), "translate(20 -2)") + T(0, 46, "AED 180k", { z: 15, f: C.green }), { o0: 0 });
        s += M("pr", 290, 66, R(-50, -18, 100, 36, C.amber, { rx: 8, s: C.orange, sw: 2 }) + T(0, 1, "PRICING", { z: 14, f: C.orange }), { o0: 0 });
        s += M("pa", 290, 92, arrowH(0, -4, 0, 6, C.orange, 3), { o0: 0 });
        s += M("pct", 290, 66, T(0, 0, "RATES \u22124%", { z: 17, f: C.red }), { o0: 0 });
        s += M("sh", 290, 252, L(0, 0, "SMALLER OR UNCERTAIN", { z: 13, s: C.plum }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("card", { s: b === 0 ? 1.04 : 0.92, x: b === 0 ? 40 : 0 });
        V(S, "crack", b >= 0, { del: 0.4 }); V(S, "unr", b === 0, { del: 0.7 });
        S("crack", { o: 1, x: b === 0 ? 40 : 0, s: b === 0 ? 1.04 : 0.92, del: 0.4 });
        S("unr", { x: b === 0 ? 40 : 0 });
        V(S, "rev", b >= 1); V(S, "pr", b === 1, { del: 0.3 }); V(S, "pa", b === 1, { del: 0.5 });
        V(S, "pct", b === 2, { e: "back" }); V(S, "sh", b >= 1, { del: 0.6 });
        S("rev", { o: b >= 1 ? 1 : 0, r: b === 2 ? -3 : 0 });
      }),
      /* 8. Lines 21-22. The penalty waits on enforcement; the 115k block stays whole, its size unexplained.
         Adapted from: 093 Process-Para (rotate, wait, finish)
         https://lottiefiles.com/free-animation/process-para-qujCEQ2AKT  */
      BD(21, 22, "093", function () {
        var s = "";
        s += M("ring", 110, 150, G(O(0, 0, 70, "none", { s: C.plum, sw: 6, da: "30 14" }), "", "spin") + G(cloud("#8a9bb0", 1.1), "translate(0 -6)") +
          T(0, -2, "AED 85k", { z: 15, f: C.white }) + G(gavel(C.plum), "translate(0 42) scale(.7)"));
        s += M("ct", 110, 252, L(0, 0, "CONTINGENT ON ENFORCEMENT", { z: 13, s: C.plum }), { o0: 0 });
        s += M("blk", 296, 150, R(-60, -50, 120, 100, C.rose, { rx: 8, s: C.red, sw: 3 }) + T(0, -8, "GAP", { z: 15, f: C.red }) + T(0, 16, "AED 115k", { z: 17, f: C.red }), { o0: 0 });
        s += M("ch", 0, 0, arrowH(176, 120, 230, 132, C.green, 3) + arrowH(176, 186, 230, 170, C.plum, 3) +
          L(296, 238, "SIZE STILL UNKNOWN", { z: 14, s: C.ink, f: C.ink }), { o0: 0 });
        s += M("ret", 110, 214, L(0, 0, "RETENTION DOUBT", { z: 13, s: C.green }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("ring", { s: b === 1 ? 0.78 : 1, y: b === 1 ? -20 : 0 });
        V(S, "ct", b === 0, { del: 0.4 });
        V(S, "blk", b === 1, { del: 0.2 }); V(S, "ch", b === 1, { del: 0.5 }); V(S, "ret", b === 1, { del: 0.4 });
      }),
      /* 9. Lines 23-25. Finance reconciles report to ledger, asks for four kinds of support, and blocks a timing-only label.
         Adapted from: 088 Automated Workflows (repeated triggered actions, then complete)
         https://lottiefiles.com/free-animation/automated-workflows-XR2hxXOdEK  */
      BD(23, 25, "088", function () {
        var s = "";
        s += M("rep", 96, 150, R(-70, -88, 140, 176, C.white, { rx: 10, s: C.green, sw: 2.5 }) + T(0, -70, "REPORTED", { z: 14, f: C.green }) +
          [0, 1, 2].map(function (i) { return R(-54, -48 + i * 40, 108, 26, C.pale, { rx: 4 }); }).join(""));
        s += M("led", 304, 150, R(-70, -88, 140, 176, C.white, { rx: 10, s: C.navy, sw: 2.5 }) + T(0, -70, "FINANCIAL", { z: 14, f: C.navy }) +
          [0, 1, 2].map(function (i) { return R(-54, -48 + i * 40, 108, 26, C.sky, { rx: 4 }); }).join(""));
        for (var i = 0; i < 3; i++) s += D("ln" + i, "M150 " + (115 + i * 40) + " H250", i === 0 ? C.green : C.orange, 3);
        s += M("m0", 200, 115, okb(10), { o0: 0 });
        s += M("m1", 200, 155, qb(10), { o0: 0 });
        s += M("m2", 200, 195, qb(10), { o0: 0 });
        var RQ = [["DATES", cal(C.navy, 1)], ["MEASURES", clock(14, C.teal)], ["ASSUMPTIONS", doc(24, 30, C.plum)], ["DECISIONS", G(gavel(C.ink), "scale(.7)")]];
        RQ.forEach(function (r, i) {
          s += M("r" + i, 56 + i * 96, 140, O(0, 0, 38, C.white, { s: C.ink, sw: 2.5 }) + G(r[1], "scale(1.3)") + T(0, 58, r[0], { z: 14, f: C.ink }), { o0: 0 });
        });
        s += M("blk", 110, 150, R(-50, -36, 100, 72, C.rose, { rx: 8, s: C.red, sw: 3 }) + T(0, 1, "115k", { z: 18, f: C.red }), { o0: 0 });
        s += M("bin", 300, 150, R(-60, -44, 120, 88, C.sky, { rx: 10, s: C.navy, sw: 3 }) + hourglass(C.navy, 1) + T(0, 30, "ALL TIMING", { z: 13, f: C.navy }), { o0: 0 });
        s += M("stop", 214, 150, nob(16), { o0: 0 });
        s += M("nat", 200, 250, L(0, 0, "EVIDENCE, NOT ASSUMPTION", { z: 14, s: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("rep", { o: b === 0 ? 1 : 0 }); S("led", { o: b === 0 ? 1 : 0 });
        for (var i = 0; i < 3; i++) S("ln" + i, { d: b === 0 ? 1 : 0, o: b === 0 ? 1 : 0, del: 0.2 + i * 0.3 });
        V(S, "m0", b === 0, { del: 0.6 }); V(S, "m1", b === 0, { del: 0.9 }); V(S, "m2", b === 0, { del: 1.2 });
        for (var j = 0; j < 4; j++) V(S, "r" + j, b === 1, { del: j * 0.2, e: "back" });
        V(S, "blk", b === 2, { x: b === 2 ? 40 : 0, dur: 1 }); V(S, "bin", b === 2); V(S, "stop", b === 2, { del: 0.8, e: "back" });
        V(S, "nat", b === 2, { del: 1 });
      }),
      /* 10. Lines 26-27. An honest review shows progress and uncertainty side by side; credibility grows.
         Adapted from: 122 Dashboard by Weblodge (UI introduced, outcome emphasised)
         https://lottiefiles.com/free-animation/deliver-better-optimized-lottie-json-animation-Qgvgddnv8J  */
      BD(26, 27, "122", function () {
        var s = "";
        s += M("pg", 108, 150, R(-86, -88, 172, 176, C.pale, { rx: 14, s: C.green, sw: 3 }) + G(okb(26), "translate(0 -26)") +
          T(0, 30, "REAL PROGRESS", { z: 15, f: C.green }) + T(0, 52, "RECOGNISED", { z: 13, f: C.green }), { o0: 0 });
        s += M("un", 292, 150, R(-86, -88, 172, 176, C.amber, { rx: 14, s: C.orange, sw: 3 }) + G(qb(26, C.orange), "translate(0 -26)") +
          T(0, 30, "STILL UNCERTAIN", { z: 15, f: C.orange }) + T(0, 52, "ACKNOWLEDGED", { z: 13, f: C.orange }), { o0: 0 });
        s += M("sh", 200, 150, shield(3.2, C.navy, C.white) + G(tick(1.6, C.navy, 5), "translate(0 -4)"), { o0: 0 });
        s += M("cr", 200, 248, L(0, 0, "CREDIBILITY PROTECTED", { z: 16, s: C.navy }), { o0: 0 });
        s += M("w1", 82, 92, L(0, 0, "WHAT HAPPENED", { z: 13, s: C.green }), { o0: 0 });
        s += M("w2", 318, 92, L(0, 0, "NEEDS ATTENTION", { z: 13, s: C.orange }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "pg", true, { x: b === 1 ? -14 : 0, s: b === 1 ? 0.6 : 1, o: b === 1 ? 0 : 1 });
        V(S, "un", true, { x: b === 1 ? 14 : 0, s: b === 1 ? 0.6 : 1, o: b === 1 ? 0 : 1, del: 0.2 });
        V(S, "sh", b === 1, { e: "back", del: 0.3 }); V(S, "cr", b === 1, { del: 0.6 });
        V(S, "w1", b === 1, { del: 0.8 }); V(S, "w2", b === 1, { del: 0.9 });
      })
    ]
  });
  /* ==================================================================
     W13O2b  WHY REAL IMPROVEMENTS DISAPPEAR FROM THE ACCOUNTS  (29 lines)
     Rebuilt first (audit 3.5/10: 16 WEAK, 10 MISMATCH). Ten boards that
     follow the benefit from the shop floor to the books, and show each
     organisational place where it can be lost.
     ================================================================== */
  scene("W13O2b", {
    label: "Why real improvements disappear from the accounts",
    accent: C.gold,
    bgc: "#f6f1e6",
    bg: function () { return backdrop("#f4eedf", "#f8f4ec", 274, "#ebe2cd"); },
    tags: ["Success can still vanish", "Better, but not booked", "The missing step", "Less effort, same work",
      "Capacity released", "Salaries still payable", "Nobody converted it", "Qasr's labour claim",
      "11 assumed, 4 happened", "Not failure, a challenge", "Two things to prove", "Benefit ownership",
      "Delivery vs decisions", "No owner, no action", "Project closes, costs stay", "The team disbands",
      "Assumptions vanish", "The sponsor changes", "Monitoring fades", "Rewarded for go-live",
      "Nobody chases it", "Fear of bad news", "Optimism hides gaps", "Timing vs reconciliation",
      "Investigate, don't pressure", "Owners, evidence, actions", "Better \u2260 money moved", "Organisation, not process",
      "Own it, act, report"],
    boards: [
      /* 1. Lines 0-2. The operations screen celebrates; the accounts screen stays flat; the step between is empty.
         Adapted from: 123 DashBoard by Amit Prajapati (dashboard screen brought into focus)
         https://lottiefiles.com/free-animation/dashboard-krY5yHjJRp  */
      BD(0, 2, "123", function () {
        var s = "";
        s += M("ops", 100, 140, R(-84, -70, 168, 120, C.ink, { rx: 10 }) + R(-74, -60, 148, 100, "#203449", { rx: 6 }) + R(-14, 50, 28, 16, C.slate) +
          R(-40, 66, 80, 6, C.slate, { rx: 3 }) + T(0, -46, "OPERATIONS", { z: 13, f: "#9fd3b6" }) +
          P("M-50 20 A50 50 0 0 1 50 20", "#38506a", 10));
        s += M("opn", 100, 160, P("M0 0 L-44 0", "#9fd3b6", 5) + O(0, 0, 6, "#9fd3b6"), { c: "" });
        s += M("opok", 160, 82, okb(14), { o0: 0 });
        s += M("acc", 300, 140, R(-84, -70, 168, 120, C.ink, { rx: 10 }) + R(-74, -60, 148, 100, "#203449", { rx: 6 }) + R(-14, 50, 28, 16, C.slate) +
          R(-40, 66, 80, 6, C.slate, { rx: 3 }) + T(0, -46, "ACCOUNTS", { z: 13, f: "#ffd59a" }));
        s += D("flat", "M236 160 H364", "#ffd59a", 4);
        s += M("nb", 300, 252, L(0, 0, "NOT IN THE BOOKS", { z: 15, s: C.red }), { o0: 0 });
        s += M("better", 100, 252, L(0, 0, "GENUINELY BETTER", { z: 15, s: C.green }), { o0: 0 });
        s += M("gap", 200, 140, R(-16, -30, 32, 60, "rgba(178,58,58,.12)", { rx: 6, s: C.red, sw: 2, da: "4 3" }) + T(0, 1, "?", { z: 22, f: C.red }), { o0: 0 });
        s += M("ms", 200, 58, L(0, 0, "WHAT HAPPENS BETWEEN?", { z: 15, s: C.ink, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("opn", { r: 135, dur: 1.4 });
        V(S, "opok", true, { e: "back", del: 0.5 });
        V(S, "better", b <= 1, { del: 0.4 });
        S("flat", { d: b >= 1 ? 1 : 0, dur: 1.2 });
        V(S, "nb", b >= 1, { del: 0.6 });
        V(S, "gap", b === 2, { e: "back" }); V(S, "ms", b === 2, { del: 0.3 });
      }),
      /* 2. Lines 3-5. Five workers: bars shrink, tasks still done, time freed, salaries still paid.
         Adapted from: 124 Project Dashboard (chart and collaborators revealed together)
         https://lottiefiles.com/free-animation/project-dashboard-PeJUc2p1iB  */
      BD(3, 5, "124", function () {
        var s = "";
        for (var i = 0; i < 5; i++) {
          var y = 70 + i * 40;
          s += G(person(C.navy, 0.75), "translate(36 " + (y + 4) + ")");
          s += R(64, y - 9, 200, 18, C.mist, { rx: 4 });
          s += M("w" + i, 64, y, R(0, -9, 200, 18, C.navy, { rx: 4 }), { c: "ol" });
          s += M("f" + i, 64 + 130, y, R(0, -9, 70, 18, C.teal, { rx: 4, op: 0.55 }) + P("M4 -6 L14 6 M18 -6 L28 6 M32 -6 L42 6 M46 -6 L56 6", C.white, 2), { o0: 0 });
          s += M("t" + i, 280, y, okb(9), { o0: 0 });
          s += M("c" + i, 312, y, coin(10, C.gold, ""), { o0: 0 });
        }
        s += M("sw", 140, 278, L(0, 0, "SAME WORK, LESS EFFORT", { z: 13, s: C.navy }), { o0: 0 });
        s += M("cr", 230, 278, L(0, 0, "CAPACITY RELEASED", { z: 14, s: C.teal }), { o0: 0 });
        s += M("sp", 330, 50, L(0, 0, "SALARIES PAID", { z: 13, s: C.gold, f: C.ink }), { o0: 0 });
        s += M("opt", 200, 278, L(0, 0, "UNLESS STAFFING OR USE CHANGES", { z: 12, s: C.ink, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 5; i++) {
          S("w" + i, { sx: 0.65, dur: 1.2, del: i * 0.08 });
          V(S, "t" + i, true, { del: 0.6 + i * 0.08, e: "back" });
          V(S, "f" + i, b >= 1, { del: i * 0.08 });
          V(S, "c" + i, b === 2, { del: 0.2 + i * 0.1, e: "back" });
        }
        V(S, "sw", b === 0, { del: 0.8 }); V(S, "cr", b === 1, { del: 0.4 }); V(S, "sp", b === 2); V(S, "opt", b === 2, { del: 0.6 });
      }),
      /* 3. Lines 6-7. An idle converter: capacity queues up, nobody turns it into value; then the labour claim.
         Adapted from: 100 3D Statistics Factory (equipment staged, output motion)
         https://lottiefiles.com/free-animation/3d-statistics-factory-lRiHNeU9Y4  */
      BD(6, 7, "100", function () {
        var s = "";
        s += R(20, 156, 120, 10, C.slate, { rx: 5 });
        for (var i = 0; i < 4; i++) s += G(clock(11, C.teal), "translate(" + (36 + i * 28) + " 142)");
        s += M("mach", 196, 140, R(-46, -50, 92, 92, C.ink, { rx: 10 }) + T(0, -30, "CONVERT", { z: 13, f: C.white }) + G(gear(16, C.slate), "translate(0 6)"));
        s += M("idle", 196, 72, L(0, 0, "IDLE", { z: 13, s: C.red }), { o0: 0 });
        s += R(242, 146, 60, 10, C.slate, { rx: 5, op: 0.4 });
        s += M("out", 340, 150, O(0, 0, 26, "none", { s: C.slate, sw: 2, da: "4 4" }) + T(0, 1, "AED?", { z: 13, f: C.slate }));
        s += M("nob", 196, 222, O(0, 0, 22, "none", { s: C.slate, sw: 2, da: "4 4" }) + T(0, 1, "?", { z: 18, f: C.slate }) +
          T(0, 38, "NO OPERATOR", { z: 13, f: C.slate }), { o0: 0 });
        s += M("lab", 0, 0, R(224, 186, 160, 92, C.white, { rx: 12, s: C.navy, sw: 2.5 }) + T(304, 206, "LABOUR CLAIM", { z: 14, f: C.navy }) +
          T(304, 234, "AED 240k", { z: 22, f: C.navy }) + T(304, 262, "STAFFING-BASED", { z: 12, f: C.slate }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "idle", true, { del: 0.4 });
        V(S, "nob", b === 0, { del: 0.6 });
        V(S, "lab", b === 1, { y: b === 1 ? 0 : 20 });
        S("mach", { x: b === 1 ? -60 : 0 }); S("idle", { x: b === 1 ? -60 : 0, o: 1, s: 1 });
      }),
      /* 4. Lines 8-10. Eleven against four; the calculation is challenged, not the process; two things to prove.
         Adapted from: 126 Stacked-to-grouped bars (bars reposition while keeping identity)
         https://observablehq.com/@d3/stacked-to-grouped-bars  */
      BD(8, 10, "126", function () {
        var s = "";
        s += P("M40 214 H200", C.ink, 2.5);
        s += M("b11", 84, 214, R(-26, -132, 52, 132, "rgba(192,80,42,.14)", { rx: 4, s: C.orange, sw: 2.5, da: "6 4" }) + T(0, -66, "11", { z: 26, f: C.orange }) +
          T(0, 16, "ASSUMED", { z: 13, f: C.orange }), { c: "ob", o0: 0 });
        s += M("b4", 156, 214, R(-26, -48, 52, 48, C.green, { rx: 4 }) + T(0, -24, "4", { z: 22, f: C.white }) + T(0, 16, "ACTUAL", { z: 13, f: C.green }), { c: "ob", o0: 0 });
        s += M("calc", 300, 136, R(-60, -76, 120, 152, C.ink, { rx: 12 }) + R(-48, -64, 96, 34, "#cfe3d6", { rx: 4 }) +
          T(40, -47, "240k?", { z: 15, a: "end", f: C.ink }) +
          [0, 1, 2, 3, 4, 5].map(function (i) { return R(-46 + (i % 3) * 32, -20 + Math.floor(i / 3) * 28, 26, 22, C.slate, { rx: 3 }); }).join(""), { o0: 0 });
        s += M("fail", 300, 62, L(0, 0, "PROCESS FAILED", { z: 13, s: C.slate }) + P("M-62 0 H62", C.red, 3), { o0: 0 });
        s += M("chal", 300, 238, L(0, 0, "CALCULATION CHALLENGED", { z: 13, s: C.red }), { o0: 0 });
        s += M("q1", 300, 116, R(-90, -24, 180, 48, C.white, { rx: 10, s: C.teal, sw: 2.5 }) + R(-78, -10, 20, 20, C.paper, { s: C.teal, sw: 2 }) +
          T(-48, 1, "CAPACITY USED?", { z: 14, a: "start", f: C.teal }), { o0: 0 });
        s += M("q2", 300, 186, R(-90, -24, 180, 48, C.white, { rx: 10, s: C.navy, sw: 2.5 }) + R(-78, -10, 20, 20, C.paper, { s: C.navy, sw: 2 }) +
          T(-48, 1, "SPEND CHANGED?", { z: 14, a: "start", f: C.navy }), { o0: 0 });
        s += M("tw", 300, 252, L(0, 0, "PROVE BOTH", { z: 14, s: C.ink, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("b11", { o: 1, sy: 1 }); S("b4", { o: 1, sy: 1, del: 0.3 });
        V(S, "calc", b === 1); V(S, "fail", b === 1, { del: 0.4 }); V(S, "chal", b === 1, { del: 0.7 });
        V(S, "q1", b === 2, { del: 0.1 }); V(S, "q2", b === 2, { del: 0.3 }); V(S, "tw", b === 2, { del: 0.6 });
      }),
      /* 5. Lines 11-14. Three swimlanes: the benefit token falls between programme and business; the project closes, costs stay.
         Adapted from: 086 Workflow by a (role icons and a workflow handoff)
         https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm  */
      BD(11, 14, "086", function () {
        var s = "", LN = [["PROGRAMME TEAM", C.navy, 92], ["BUSINESS OWNER", C.green, 160], ["FINANCE", C.orange, 228]];
        LN.forEach(function (l, i) {
          s += R(14, l[2] - 30, 372, 60, i === 0 ? "rgba(31,78,121,.10)" : i === 1 ? "rgba(47,125,95,.12)" : "rgba(192,80,42,.10)", { rx: 6, s: l[1], sw: 1.5 }) +
            G(person(l[1], 0.7), "translate(34 " + (l[2] + 6) + ")") + T(54, l[2] - 16, l[0], { z: 13, a: "start", f: l[1] });
        });
        s += M("d1", 0, 0, R(110, 86, 110, 30, C.white, { rx: 6, s: C.navy, sw: 2.5 }) + T(165, 101, "DELIVER", { z: 14, f: C.navy }), { o0: 0 });
        s += M("d2", 0, 0, P("M260 142 L282 160 L260 178 L238 160 Z", C.green, 2.5, { f: C.white }) + T(300, 160, "DECIDE", { z: 13, a: "start", f: C.green }), { o0: 0 });
        s += M("tok", 158, 130, coin(16, C.gold, "AED", 9) + T(0, -28, "BENEFIT", { z: 12, f: C.ink, c: "halo" }));
        s += M("own", 260, 160, L(0, 0, "OWNER?", { z: 13, s: C.red }), { o0: 0 });
        s += M("nob", 200, 268, L(0, 0, "NOBODY'S JOB", { z: 15, s: C.red }), { o0: 0 });
        s += M("cls", 290, 64, stamp("PROJECT CLOSED", C.navy, 13), { o0: 0 });
        s += M("cost", 300, 228, R(-56, -16, 112, 32, C.rose, { rx: 6, s: C.red, sw: 2 }) + T(0, 1, "COSTS REMAIN", { z: 13, f: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "d1", b >= 1); V(S, "d2", b >= 1, { del: 0.3 });
        S("tok", { x: b === 0 ? 0 : b === 1 ? 102 : 50, y: b === 0 ? 0 : b === 1 ? 30 : 100, dur: 1.2, o: b === 3 ? 0.4 : 1 });
        V(S, "own", b === 0 || b === 2, { del: 0.4 });
        V(S, "nob", b === 2, { del: 0.6 });
        V(S, "cls", b === 3, { r: -6 }); V(S, "cost", b === 3, { del: 0.4 });
      }),
      /* 6. Lines 15-18. Four vignettes of lost memory: the team leaves, assumptions blow away, the sponsor changes, the screen dims.
         Adapted from: 084 Process - What is a Motion Designer? (illustrated vignettes advanced beat by beat)
         https://www.behance.net/gallery/159045079/Process-What-is-a-Motion-Designer-  */
      BD(15, 18, "084", function () {
        var s = "";
        s += M("door", 340, 170, R(-28, -60, 56, 120, C.sand, { s: C.ink, sw: 2.5 }) + O(16, 0, 3, C.ink) + T(0, 78, "EXIT", { z: 13, f: C.ink }));
        for (var i = 0; i < 4; i++) s += M("tm" + i, 70 + i * 44, 200, person(C.navy, 1.05) + G(R(-10, -2, 20, 14, C.gold, { rx: 2 }), "translate(10 4)"));
        s += M("dis", 160, 92, L(0, 0, "TEAM DISBANDS", { z: 15, s: C.navy }), { o0: 0 });
        for (var j = 0; j < 3; j++) s += M("pa" + j, 120 + j * 40, 140, doc(30, 38, C.plum), { o0: 0 });
        s += M("gone", 200, 252, L(0, 0, "HOW WAS 240k CALCULATED?", { z: 13, s: C.plum }), { o0: 0 });
        s += M("chair", 120, 196, R(-34, -10, 68, 12, C.ink, { rx: 3 }) + R(-34, -60, 12, 62, C.ink, { rx: 3 }) + P("M-24 2 V40 M24 2 V40", C.ink, 4), { o0: 0 });
        s += M("sp1", 126, 176, person(C.plum, 1.1), { o0: 0 });
        s += M("fold", 230, 214, R(-40, -26, 80, 52, C.amber, { rx: 4, s: C.orange, sw: 2 }) + T(0, 1, "COMMITMENTS", { z: 11, f: C.orange }), { o0: 0 });
        s += M("nsp", 200, 92, L(0, 0, "NEW SPONSOR", { z: 15, s: C.plum }), { o0: 0 });
        s += M("mon", 200, 162, R(-90, -60, 180, 110, C.ink, { rx: 10 }) + R(-80, -50, 160, 90, "#203449", { rx: 6 }) +
          T(0, -30, "BENEFIT MONITOR", { z: 12, f: "#9fd3b6" }), { o0: 0 });
        s += M("sig", 200, 172, [0, 1, 2, 3].map(function (i) { return R(-36 + i * 20, 10 - i * 12, 14, 12 + i * 12, "#9fd3b6", { rx: 2 }); }).join(""), { o0: 0 });
        s += M("low", 200, 252, L(0, 0, "PRIORITY LOST", { z: 15, s: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("door", { o: b <= 1 ? 1 : 0 });
        for (var i = 0; i < 4; i++) S("tm" + i, { o: b === 0 ? 0.3 : 0, x: b === 0 ? 260 - i * 30 : 0, del: i * 0.2, dur: 1.4 });
        V(S, "dis", b === 0, { del: 0.3 });
        for (var j = 0; j < 3; j++) V(S, "pa" + j, b === 1, { x: b === 1 ? 120 + j * 30 : 0, y: b === 1 ? -50 + j * 20 : 0, r: b === 1 ? 40 + j * 30 : 0, o: b === 1 ? 0.45 : 0, del: 0.2 + j * 0.2, dur: 1.4 });
        V(S, "gone", b === 1, { del: 0.6 });
        V(S, "chair", b === 2); V(S, "sp1", b === 2, { del: 0.4, x: b === 2 ? 0 : -30 });
        V(S, "fold", b === 2, { y: b === 2 ? 40 : 0, r: b === 2 ? 20 : 0, o: b === 2 ? 0.5 : 0, del: 0.5 });
        V(S, "nsp", b === 2, { del: 0.6 });
        V(S, "mon", b === 3); S("sig", { o: b === 3 ? 0.25 : 0, del: 0.4 }); V(S, "low", b === 3, { del: 0.5 });
      }),
      /* 7. Lines 19-20. The trophy is handed out at go-live; the outcomes column stays empty and unchased.
         Adapted from: 091 cro process (movement across business steps)
         https://lottiefiles.com/free-animation/cro-process-RaUu5ps2to  */
      BD(19, 20, "091", function () {
        var s = "";
        s += P("M30 150 H370", C.ink, 3);
        [["BUILD", 60], ["GO-LIVE", 160], ["OUTCOMES", 300]].forEach(function (m, i) {
          s += O(m[1], 150, 12, C.white, { s: i === 2 ? C.slate : C.navy, sw: 3 }) + T(m[1], 176, m[0], { z: 13, f: i === 2 ? C.slate : C.navy });
        });
        s += M("tro", 160, 96, trophy(C.gold, 1.8), { o0: 0 });
        s += M("bon", 160, 236, coin(13, C.gold, "") , { o0: 0 });
        s += M("rw", 160, 236, L(0, 30, "REWARDED", { z: 13, s: C.gold, f: C.ink }), { o0: 0 });
        s += M("empty", 300, 96, R(-42, -36, 84, 72, "none", { rx: 8, s: C.slate, sw: 2, da: "5 4" }) + T(0, 1, "?", { z: 24, f: C.slate }), { o0: 0 });
        s += M("drawer", 300, 222, R(-62, -26, 124, 52, C.sand, { rx: 6, s: C.ink, sw: 2 }) + T(0, -6, "MISSING", { z: 13, f: C.ink }) + T(0, 12, "BENEFITS", { z: 13, f: C.ink }) +
          G(G(T(0, 0, "Zz", { z: 14, f: C.slate }), "", "bob"), "translate(56 -30)"), { o0: 0 });
        s += M("nc", 300, 266, L(0, 0, "NOBODY CHASES IT", { z: 13, s: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "tro", true, { e: "back", del: 0.3 }); V(S, "bon", true, { del: 0.5, e: "back" }); V(S, "rw", true, { del: 0.6 });
        V(S, "empty", true, { del: 0.8 });
        V(S, "drawer", b === 1); V(S, "nc", b === 1, { del: 0.4 });
      }),
      /* 8. Lines 21-22. Fear of bad news: an optimistic 620 card slides over the truthful labels.
         Adapted from: 080 Creative Design Workflow Animation (shapes assembled and composition refined)
         https://dribbble.com/shots/27476599-Creative-Design-Workflow-Animation  */
      BD(21, 22, "080", function () {
        var s = "";
        s += M("mgr", 70, 230, person(C.navy, 1.6));
        s += M("sw", 70, 130, G(P("M-6 0 q-4 8 0 12", C.teal, 2.5) + P("M8 -4 q-4 8 0 12", C.teal, 2.5), "", "bob"), { o0: 0 });
        s += M("fear", 100, 98, speech(170, 36, C.red) + T(0, 0, "LOOKS LIKE FAILURE", { z: 13, f: C.red }), { o0: 0 });
        var TL = [["DELAYED", C.navy], ["UNCERTAIN", C.orange], ["UNREALISED", C.plum]];
        TL.forEach(function (t, i) { s += M("l" + i, 270, 112 + i * 52, L(0, 0, t[0], { z: 15, s: t[1] }), { o0: 0 }); });
        s += M("opt", 270, 164, R(-86, -84, 172, 168, C.white, { rx: 12, s: C.green, sw: 3 }) + T(0, -40, "STILL", { z: 15, f: C.green }) +
          T(0, -4, "AED 620k", { z: 24, f: C.green }) + T(0, 30, "ON TRACK", { z: 15, f: C.green }), { o0: 0 });
        s += M("hid", 270, 268, L(0, 0, "GAPS HIDDEN", { z: 14, s: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "sw", true, { del: 0.3 }); V(S, "fear", b === 0, { del: 0.4 });
        for (var i = 0; i < 3; i++) V(S, "l" + i, b === 0, { del: 0.2 + i * 0.15 });
        V(S, "opt", b === 1, { x: b === 1 ? 0 : 160, dur: 1 }); V(S, "hid", b === 1, { del: 0.8 });
      }),
      /* 9. Lines 23-25. Two directors, pressure arrows replaced by a magnifier, and the committee's three-row checklist.
         Adapted from: 079 Product Workflow Animation & UI Motion Design (product states shift)
         https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design  */
      BD(23, 25, "079", function () {
        var s = "";
        s += M("dA", 62, 240, person(C.navy, 1.4));
        s += M("bA", 92, 168, speech(118, 34, C.navy) + T(0, 0, "TIMING", { z: 14, f: C.navy }));
        s += M("dB", 338, 240, person(C.orange, 1.4));
        s += M("bB", 308, 168, speech(130, 34, C.orange) + T(0, 0, "RECONCILE?", { z: 14, f: C.orange }));
        s += M("pr", 0, 0, arrowH(130, 100, 176, 100, C.red, 4) + arrowH(270, 100, 224, 100, C.red, 4) + L(200, 70, "JUST ACCEPT IT", { z: 13, s: C.red }) +
          P("M140 70 H260", C.red, 3), { o0: 0 });
        s += M("mg", 200, 104, mag(20), { o0: 0 });
        s += M("inv", 200, 150, L(0, 0, "INVESTIGATE", { z: 15, s: C.green }), { o0: 0 });
        var RW = [["OWNERS", C.green], ["EVIDENCE", C.navy], ["ACTIONS", C.orange]];
        s += M("tab", 200, 160, R(-110, -82, 220, 164, C.white, { rx: 12, s: C.ink, sw: 2.5 }) + T(0, -64, "COMMITTEE NEEDS", { z: 13, f: C.ink }), { o0: 0 });
        RW.forEach(function (r, i) {
          s += M("r" + i, 200, 130 + i * 40, R(-94, -15, 188, 30, C.paper, { rx: 6 }) + T(-80, 1, r[0], { z: 15, a: "start", f: r[1] }) +
            G(qb(10, r[1]), "translate(76 0)"), { o0: 0 });
        });
        return s;
      }, function (b, S) {
        S("dA", { o: b <= 1 ? 1 : 0 }); S("dB", { o: b <= 1 ? 1 : 0 });
        S("bA", { o: b === 0 ? 1 : 0 }); S("bB", { o: b === 0 ? 1 : 0 });
        V(S, "pr", b === 1); V(S, "mg", b === 1, { del: 0.6, e: "back" }); V(S, "inv", b === 1, { del: 0.8 });
        V(S, "tab", b === 2);
        for (var i = 0; i < 3; i++) V(S, "r" + i, b === 2, { del: 0.3 + i * 0.2 });
      }),
      /* 10. Lines 26-28. Better is not money moved; the process works but a decision link is broken; three pillars.
         Adapted from: 083 The Process Architectural Motion (structure built in successive layers)
         https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion  */
      BD(26, 28, "083", function () {
        var s = "";
        s += M("m1", 104, 150, R(-84, -62, 168, 124, C.pale, { rx: 12, s: C.green, sw: 3 }) + P("M-50 30 L-20 0 L6 14 L46 -30", C.green, 5) +
          T(0, -42, "OPERATIONS", { z: 14, f: C.green }) + T(0, 46, "BETTER", { z: 14, f: C.green }), { o0: 0 });
        s += M("m2", 296, 150, R(-84, -62, 168, 124, C.white, { rx: 12, s: C.navy, sw: 3 }) + P("M-50 10 H50", C.navy, 5) +
          T(0, -42, "FINANCES", { z: 14, f: C.navy }) + T(0, 46, "CHANGED?", { z: 14, f: C.navy }), { o0: 0 });
        s += M("ne", 200, 150, O(0, 0, 16, C.white, { s: C.red, sw: 2 }) + T(0, 1, "\u2260", { z: 20, f: C.red }), { o0: 0 });
        s += M("pg", 90, 140, O(0, 0, 36, C.white, { s: C.teal, sw: 3 }) + G(G(gear(18, C.teal), "", "spin")) + G(okb(11), "translate(30 -30)") +
          T(0, 54, "PROCESS WORKS", { z: 13, f: C.teal }), { o0: 0 });
        s += M("lk", 0, 0, P("M128 140 H170", C.ink, 4) + P("M230 140 H272", C.ink, 4) + P("M176 128 L190 152 M210 128 L224 152", C.red, 4) +
          O(310, 140, 36, C.white, { s: C.navy, sw: 3 }) + P("M298 152 L310 128 L322 152 Z", C.navy, 2.5, { f: C.sky }) +
          T(310, 194, "DECISION", { z: 13, f: C.navy }), { o0: 0 });
        s += M("org", 200, 252, L(0, 0, "ORGANISATION, NOT PROCESS", { z: 14, s: C.red }), { o0: 0 });
        s += P("M40 262 H360", C.ink, 0);
        var PL = [["OWN IT", C.green, 90], ["ACT", C.orange, 200], ["REPORT", C.navy, 310]];
        s += M("roof", 200, 80, P("M-150 20 L0 -24 L150 20 Z", C.ink, 3, { f: C.sand }), { o0: 0 });
        PL.forEach(function (p, i) {
          s += M("p" + i, p[2], 262, R(-38, -150, 76, 150, C.white, { rx: 4, s: p[1], sw: 3 }) + T(0, -75, p[0], { z: 14, f: p[1] }), { c: "ob", o0: 0 });
        });
        s += M("base", 200, 268, R(-170, -6, 340, 12, C.ink, { rx: 3 }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "m1", b === 0); V(S, "m2", b === 0, { del: 0.2 }); V(S, "ne", b === 0, { del: 0.6, e: "back" });
        V(S, "pg", b === 1); V(S, "lk", b === 1, { del: 0.3 }); V(S, "org", b === 1, { del: 0.7 });
        V(S, "base", b === 2);
        for (var i = 0; i < 3; i++) S("p" + i, { o: b === 2 ? 1 : 0, sy: b === 2 ? 1 : 0.02, del: 0.2 + i * 0.2 });
        V(S, "roof", b === 2, { del: 0.9, y: b === 2 ? 0 : -20 });
      })
    ]
  });
  installCSS("w13-claude-v2-part2");
})();
// END FILE: w13-claude-v2-part2.js

// FILE: w13-claude-v2-part3.js
// OPER621 - Week 13 - The Realize Value Phase - animated teaching scenes, round 2 (full rebuild).
// Part 3 of 4. Sections: W13O2c W13O2d W13O2e. Standalone; load parts in any order.
// Contract: window.VL_SCENES[secId] = { build(el), step(i, n), reset() }.
// Styles: appended to one <style id="vl-sc-w13">, every rule scoped under .vls-w13-<secId>.
// Every board names the benchmark template it adapts, with its URL, in a comment.
(function () {
  "use strict";
  /* ------------------------------------------------------------------
     ENGINE (v2, written from scratch for Week 13 round 2).
     A section is a sequence of BOARDS. Each board is one complete visual
     that owns 2 to 5 consecutive narration lines; inside a board every
     line has its own deterministic state (view(b, S)), so the player can
     seek forwards or backwards to any moment. Entering a board snaps its
     actors to their drawn defaults, then animates them in.
     Motion: window.gsap when present, otherwise a small rAF tweener.
     prefers-reduced-motion: every state is applied instantly.
     Layout: 400 x 300 design canvas, scaled with "meet"; the outer
     viewBox widens or deepens (max 1.35x / 1.45x) to the host aspect
     and each scene paints a full-bleed background, so phone (figure
     above text) and laptop (figure in the left 60%) are both filled.
     ------------------------------------------------------------------ */
  var W = window;
  W.VL_SCENES = W.VL_SCENES || {};
  var VLS = W.VL_SCENES;
  var CW = 400, CH = 300;
  var C = {
    navy: "#1f4e79", ink: "#16263a", orange: "#c0502a", paper: "#fbf8f1",
    blue: "#dbe7f2", green: "#2f7d5f", gold: "#d9982b", plum: "#6b4f96",
    teal: "#2a8a8f", red: "#b23a3a", slate: "#5c6f84", sand: "#efe4cf",
    mist: "#c7d5e3", white: "#ffffff", pale: "#e3f1e8", rose: "#f6e1da",
    lilac: "#ece6f5", sky: "#e6f0f8", amber: "#fbecd0"
  };
  var CSS = [];
  var PFX = "";

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function at(o) {
    var r = [];
    for (var k in o) if (o[k] !== undefined && o[k] !== null && o[k] !== false) r.push(k + '="' + esc(o[k]) + '"');
    return r.join(" ");
  }
  function el(n, o, inner) {
    return inner === undefined ? "<" + n + " " + at(o || {}) + "/>" : "<" + n + " " + at(o || {}) + ">" + inner + "</" + n + ">";
  }
  /* ---------- primitive shapes ---------- */
  function R(x, y, w, h, f, o) {
    o = o || {};
    return el("rect", { x: x, y: y, width: w, height: h, rx: o.rx, fill: f, stroke: o.s, "stroke-width": o.sw,
      opacity: o.op, "stroke-dasharray": o.da, "class": o.c, "data-k": o.k ? PFX + o.k : undefined });
  }
  function O(cx, cy, r, f, o) {
    o = o || {};
    return el("circle", { cx: cx, cy: cy, r: r, fill: f, stroke: o.s, "stroke-width": o.sw, opacity: o.op,
      "stroke-dasharray": o.da, "class": o.c, "data-k": o.k ? PFX + o.k : undefined });
  }
  function E(cx, cy, rx, ry, f, o) {
    o = o || {};
    return el("ellipse", { cx: cx, cy: cy, rx: rx, ry: ry, fill: f, stroke: o.s, "stroke-width": o.sw, opacity: o.op, "class": o.c });
  }
  function P(d, s, sw, o) {
    o = o || {};
    return el("path", { d: d, fill: o.f || "none", stroke: s || "none", "stroke-width": sw, "stroke-linecap": "round",
      "stroke-linejoin": "round", opacity: o.op, "stroke-dasharray": o.da, "class": o.c,
      "data-k": o.k ? PFX + o.k : undefined });
  }
  /* Text. o.z size (16), o.w weight (800), o.f fill, o.a anchor, o.k key,
     o.num = {v:start, pre:"", suf:""} makes it a tweenable counter. */
  function T(x, y, s, o) {
    o = o || {};
    var a = { x: x, y: y, "font-size": o.z || 16, "font-weight": o.w || 800, fill: o.f || C.ink,
      "text-anchor": o.a || "middle", "dominant-baseline": "central", opacity: o.op, "class": o.c,
      "letter-spacing": o.ls, "data-k": o.k ? PFX + o.k : undefined };
    if (o.num) { a["data-n"] = o.num.v || 0; a["data-pre"] = o.num.pre || ""; a["data-suf"] = o.num.suf || ""; }
    return el("text", a, esc(s));
  }
  /* Group. A CSS ambient class never shares an element with a transform
     attribute (the animation would replace it), so both are nested. */
  function G(inner, t, c, op) {
    if (t && c) return el("g", { transform: t, opacity: op }, el("g", { "class": c }, inner));
    return el("g", { transform: t, "class": c, opacity: op }, inner);
  }
  /* Animated actor placed at (x, y); its own transform is engine-owned.
     o.o0 initial opacity, o.c extra class: "ob" (grow from bottom), "ol" (grow from left). */
  function M(k, x, y, inner, o) {
    o = o || {};
    return '<g transform="translate(' + x + " " + y + ')"><g class="mv ' + (o.c || "") + '" data-k="' + PFX + k + '"' +
      (o.o0 !== undefined ? ' data-o="' + o.o0 + '"' : "") + ">" + inner + "</g></g>";
  }
  /* Self-drawing stroke (property d: 0..1). */
  function D(k, d, s, sw, o) {
    o = o || {};
    return el("path", { d: d, fill: "none", stroke: s, "stroke-width": sw, "stroke-linecap": "round", "stroke-linejoin": "round",
      "class": "mv dr " + (o.c || ""), "data-k": PFX + k, pathLength: 100, "data-d": o.d0 || 0,
      "data-o": o.o0, "stroke-dasharray": "100 100", opacity: o.op });
  }
  /* Width estimate for a bold label; the browser re-measures every pill after build. */
  function tw(s, z) {
    var w = 0, str = String(s);
    for (var i = 0; i < str.length; i++) {
      var c = str[i];
      w += /[MW]/.test(c) ? 0.92 : /[A-Z0-9]/.test(c) ? 0.72 : /[ .,:'\u00B7]/.test(c) ? 0.32 : /[mw]/.test(c) ? 0.86 : /[a-z]/.test(c) ? 0.58 : 0.7;
    }
    return w * z;
  }
  /* Pill label centred on (x, y). o.z size, o.s stroke, o.f text, o.bg fill, o.k text key. */
  function L(x, y, s, o) {
    o = o || {};
    var z = o.z || 15, h = Math.round(z * 1.75), w = tw(s, z) + h * 0.95;
    return '<g class="pill" data-cx="' + x + '" data-pad="' + (h * 0.95).toFixed(1) + '">' +
      R(x - w / 2, y - h / 2, w, h, o.bg || C.paper, { rx: h / 2, s: o.s || C.navy, sw: o.sw || 2 }) +
      T(x, y + 0.5, s, { z: z, f: o.f || o.s || C.navy, k: o.k }) + "</g>";
  }
  /* ---------- pictograms (centred on the local origin) ---------- */
  function person(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + O(0, -15, 8, col) + P("M-13 14 Q-13 -4 0 -4 Q13 -4 13 14 Z", "none", 0, { f: col }) + "</g>";
  }
  function hotel(col, s, door) {
    s = s || 1;
    var g = R(-16, -26, 32, 44, C.paper, { rx: 3, s: col, sw: 2.5 });
    for (var r = 0; r < 3; r++) for (var c = 0; c < 2; c++) g += R(-11 + c * 13, -20 + r * 11, 9, 7, C.blue, { rx: 1.5 });
    return '<g transform="scale(' + s + ')">' + g + R(-5, 8, 10, 10, door || col, { rx: 1.5 }) + "</g>";
  }
  function coin(r, col, txt, z) {
    return O(0, 0, r, C.paper, { s: col, sw: Math.max(2, r / 6) }) + O(0, 0, r * 0.72, "none", { s: col, sw: 1.2, op: 0.5 }) +
      (txt ? T(0, 0.5, txt, { z: z || Math.round(r * 0.6), f: col }) : "");
  }
  function clock(r, col) {
    return O(0, 0, r, C.paper, { s: col, sw: Math.max(2, r / 6) }) +
      P("M0 " + (-r * 0.6) + " V0 L" + (r * 0.45) + " " + (r * 0.3), col, Math.max(2, r / 7));
  }
  function doc(w, h, col) {
    var s = R(-w / 2, -h / 2, w, h, C.white, { rx: 3, s: col, sw: 2 }), n = Math.max(2, Math.floor((h - 12) / 8));
    for (var i = 0; i < n; i++) s += P("M" + (-w / 2 + 6) + " " + (-h / 2 + 9 + i * 8) + " H" + (w / 2 - 6 - (i % 2) * 6), col, 1.8, { op: 0.55 });
    return s;
  }
  function contract(col) {
    return doc(34, 44, col) + P("M-10 16 q4 -7 8 0 t8 0", C.orange, 2);
  }
  function tick(s, col, sw) {
    s = s || 1;
    return P("M" + -9 * s + " 0 L" + -3 * s + " " + 7 * s + " L" + 10 * s + " " + -8 * s, col || C.green, sw || 4);
  }
  function cross(s, col, sw) {
    s = s || 1;
    return P("M" + -8 * s + " " + -8 * s + " L" + 8 * s + " " + 8 * s + " M" + 8 * s + " " + -8 * s + " L" + -8 * s + " " + 8 * s, col || C.red, sw || 4);
  }
  function qb(r, col) {
    return O(0, 0, r, col || C.orange) + T(0, 1, "?", { z: Math.max(14, Math.round(r * 1.3)), f: C.white, w: 900 });
  }
  function okb(r, col) { return O(0, 0, r, col || C.green) + tick(r / 13, C.white, Math.max(2.5, r / 5)); }
  function nob(r, col) { return O(0, 0, r, col || C.red) + cross(r / 15, C.white, Math.max(2.5, r / 5)); }
  function mag(r, col) {
    col = col || C.ink;
    return O(0, 0, r, "rgba(255,255,255,.55)", { s: col, sw: Math.max(3, r / 5) }) + P("M" + r * 0.72 + " " + r * 0.72 + " L" + r * 1.45 + " " + r * 1.45, col, Math.max(4, r / 3.5));
  }
  function shield(s, col, fill) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + P("M0 -20 L16 -13 V-1 Q16 14 0 21 Q-16 14 -16 -1 V-13 Z", col, 2.5, { f: fill || C.lilac }) + "</g>";
  }
  function keyI(s, col) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + O(-8, 0, 7, "none", { s: col, sw: 3.5 }) + P("M-1 0 H16 M11 0 V6 M16 0 V5", col, 3.5) + "</g>";
  }
  function flag(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + P("M0 0 V-34", C.ink, 2.5) + P("M0 -34 L22 -27 L0 -20 Z", col, 1, { f: col }) + "</g>";
  }
  function trophy(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + P("M-12 -14 H12 V-4 Q12 8 0 10 Q-12 8 -12 -4 Z", col, 2, { f: col }) +
      P("M-12 -10 h-6 v5 q0 5 6 5 M12 -10 h6 v5 q0 5 -6 5", col, 2.5) + R(-4, 10, 8, 6, col) + R(-11, 16, 22, 5, C.ink, { rx: 1.5 }) + "</g>";
  }
  function hourglass(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + P("M-12 -18 H12 M-12 18 H12", C.ink, 3) +
      P("M-9 -17 Q-9 -4 0 0 Q9 -4 9 -17 Z M-9 17 Q-9 4 0 0 Q9 4 9 17 Z", col, 2, { f: C.paper }) +
      P("M-5 -10 Q0 -3 5 -10 Z M-7 15 Q0 8 7 15 Z", "none", 0, { f: col }) + "</g>";
  }
  function cal(col, s) {
    s = s || 1;
    var g = R(-15, -13, 30, 28, C.white, { rx: 3, s: col, sw: 2 }) + R(-15, -13, 30, 8, col, { rx: 3 });
    for (var i = 0; i < 3; i++) for (var j = 0; j < 2; j++) g += R(-10 + i * 8, -1 + j * 7, 5, 4, col, { op: 0.6 });
    return '<g transform="scale(' + s + ')">' + g + "</g>";
  }
  function cloud(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + E(0, 4, 30, 14, col) + E(-18, 6, 16, 11, col) + E(18, 6, 17, 11, col) + E(-2, -8, 18, 14, col) + "</g>";
  }
  function target(r, col) {
    return O(0, 0, r, C.white, { s: col, sw: 3 }) + O(0, 0, r * 0.62, "none", { s: col, sw: 3 }) + O(0, 0, r * 0.25, col);
  }
  function gear(r, col) {
    var d = "", n = 8;
    for (var i = 0; i < n * 2; i++) {
      var a = (i / (n * 2)) * Math.PI * 2, rr = i % 2 ? r : r * 1.22, a2 = a + Math.PI / (n * 2);
      d += (i ? "L" : "M") + (rr * Math.cos(a)).toFixed(1) + " " + (rr * Math.sin(a)).toFixed(1) + " L" + (rr * Math.cos(a2)).toFixed(1) + " " + (rr * Math.sin(a2)).toFixed(1) + " ";
    }
    return P(d + "Z", col, 2, { f: C.paper }) + O(0, 0, r * 0.4, "none", { s: col, sw: 3 });
  }
  function arrowH(x1, y1, x2, y2, col, sw) {
    var a = Math.atan2(y2 - y1, x2 - x1), h = 9;
    return P("M" + x1 + " " + y1 + " L" + x2 + " " + y2 + " M" + (x2 - h * Math.cos(a - 0.5)).toFixed(1) + " " + (y2 - h * Math.sin(a - 0.5)).toFixed(1) +
      " L" + x2 + " " + y2 + " L" + (x2 - h * Math.cos(a + 0.5)).toFixed(1) + " " + (y2 - h * Math.sin(a + 0.5)).toFixed(1), col || C.ink, sw || 3);
  }
  function stamp(txt, col, z) {
    z = z || 16;
    var w = tw(txt, z) + 22, h = z + 14;
    return R(-w / 2, -h / 2, w, h, "rgba(255,255,255,.88)", { rx: 4, s: col, sw: 3 }) + T(0, 1, txt, { z: z, f: col, w: 900 });
  }
  function umbrella(col) {
    return P("M-34 0 Q-34 -30 0 -32 Q34 -30 34 0 Q25 -7 17 0 Q8 -7 0 0 Q-8 -7 -17 0 Q-25 -7 -34 0 Z", col, 2, { f: C.lilac }) + P("M0 -32 V26 q0 7 -7 7", col, 3);
  }
  function bell(col) {
    return P("M-11 8 Q-11 -12 0 -12 Q11 -12 11 8 L14 11 H-14 Z", col, 2.5, { f: C.amber }) + O(0, 14, 3.5, col);
  }
  function gavel(col) {
    return G(R(-14, -7, 28, 14, col, { rx: 3 }) + R(-3, 7, 6, 22, col, { rx: 2 }), "rotate(-35)") + R(-18, 26, 36, 6, C.ink, { rx: 2 });
  }
  function speech(w, h, col) {
    return P("M" + -w / 2 + " " + -h / 2 + " H" + w / 2 + " V" + h / 2 + " H-6 L-16 " + (h / 2 + 12) + " L-16 " + h / 2 + " H" + -w / 2 + " Z", col, 2, { f: C.white });
  }
  function bars3(vals, cols, x0, base, bw, gap, scale) {
    var s = "";
    vals.forEach(function (v, i) { s += R(x0 + i * (bw + gap), base - v * scale, bw, v * scale, cols[i], { rx: 3 }); });
    return s;
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function V(S, key, on, extra) {
    var p = { o: on ? 1 : 0, s: on ? 1 : 0.86 };
    if (extra) for (var q in extra) p[q] = extra[q];
    S(key, p);
  }
  function reduced() {
    try { return !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; }
  }
  function nowMs() { return W.performance && W.performance.now ? W.performance.now() : Date.now(); }
  var EASE = {
    io: function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; },
    out: function (t) { return 1 - Math.pow(1 - t, 3); },
    back: function (t) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }
  };
  var GSE = { io: "power3.inOut", out: "power3.out", back: "back.out(1.6)" };
  function fmtNum(v, n) {
    var x = Math.round(v), neg = x < 0, s = String(Math.abs(x)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (neg ? "\u2212" : "") + s;
  }
  /* Base stylesheet, entirely scoped under .vls-w13-<id>. */
  function baseCSS(id, bg) {
    var s = ".vls-w13-" + id;
    return [
      s + "{position:relative;width:100%;height:100%;min-height:180px;overflow:hidden;background:" + bg + ";color:#16263a;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}",
      s + ">svg{position:absolute;inset:0;width:100%;height:100%;display:block}",
      s + " text{font-family:inherit;paint-order:stroke fill}",
      s + " .mv{transform-box:fill-box;transform-origin:50% 50%}",
      s + " .mv.ob{transform-origin:50% 100%}",
      s + " .mv.ol{transform-origin:0% 50%}",
      s + " .mv.ot{transform-origin:50% 0%}",
      s + " .halo{stroke:#fbf8f1;stroke-width:5px;stroke-linejoin:round}",
      s + " .halo-d{stroke:#16263a;stroke-width:4px;stroke-linejoin:round}",
      s + " .chip.pop{animation:w13v2pop .45s cubic-bezier(.2,1.4,.4,1)}",
      s + " .chip{transform-box:fill-box;transform-origin:50% 50%}",
      s + " .bob{animation:w13v2bob 2.8s ease-in-out infinite}",
      s + " .pulse{animation:w13v2pulse 1.8s ease-in-out infinite}",
      s + " .march{animation:w13v2march 1.1s linear infinite}",
      s + " .spin{transform-box:fill-box;transform-origin:50% 50%;animation:w13v2spin 9s linear infinite}",
      s + " .sway{transform-box:fill-box;transform-origin:50% 0%;animation:w13v2sway 3.4s ease-in-out infinite}",
      s + " .walk{animation:w13v2walk 5s linear infinite}",
      s + " .drift{animation:w13v2drift 4s ease-in-out infinite}",
      s + " .blink{animation:w13v2blink 1.2s steps(2,end) infinite}",
      "@media (prefers-reduced-motion:reduce){" + s + " *{animation:none!important;transition:none!important}}"
    ].join("\n");
  }
  var KEYFRAMES = [
    "@keyframes w13v2pop{0%{transform:scale(.84);opacity:.3}100%{transform:scale(1);opacity:1}}",
    "@keyframes w13v2bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}",
    "@keyframes w13v2pulse{0%,100%{opacity:.35}50%{opacity:1}}",
    "@keyframes w13v2march{to{stroke-dashoffset:-24}}",
    "@keyframes w13v2spin{to{transform:rotate(360deg)}}",
    "@keyframes w13v2sway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}",
    "@keyframes w13v2walk{0%{transform:translateX(-40px);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateX(60px);opacity:0}}",
    "@keyframes w13v2drift{0%,100%{transform:translateX(-6px)}50%{transform:translateX(6px)}}",
    "@keyframes w13v2blink{0%{opacity:1}100%{opacity:.25}}"
  ].join("\n");

  /* ---------- scene factory ---------- */
  function scene(id, cfg) {
    var tags = cfg.tags, N = tags.length, boards = cfg.boards;
    var accent = cfg.accent || C.navy;
    var root = null, svg = null, core = null, nodes = [], last = -1, lastB = -1, ro = null, chipT = null, chipG = null;
    var DEF = { x: 0, y: 0, r: 0, s: 1, sx: 1, sy: 1, o: 1, d: 0, n: 0 };
    function boardOf(k) {
      for (var i = 0; i < boards.length; i++) if (k >= boards[i].a && k <= boards[i].b) return i;
      return boards.length - 1;
    }
    function fit() {
      if (!root || !svg) return;
      var w = root.clientWidth || CW, h = root.clientHeight || CH, a = w / Math.max(1, h), VW = CW, VH = CH;
      if (a > CW / CH) VW = Math.min(CH * a, CW * 1.35); else VH = Math.min(CW / a, CH * 1.45);
      svg.setAttribute("viewBox", "0 0 " + VW.toFixed(2) + " " + VH.toFixed(2));
      core.setAttribute("x", ((VW - CW) / 2).toFixed(2));
      core.setAttribute("y", ((VH - CH) / 2).toFixed(2));
    }
    function markup() {
      var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + CW + " " + CH + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(cfg.label) + '">' +
        '<svg class="core" x="0" y="0" width="' + CW + '" height="' + CH + '" viewBox="0 0 ' + CW + " " + CH + '" overflow="visible" style="overflow:visible">';
      PFX = "";
      s += cfg.bg();
      boards.forEach(function (bd, i) {
        PFX = "b" + i + "_";
        s += '<g class="mv bdg" data-k="B' + i + '" data-o="0">' + bd.draw() + "</g>";
      });
      PFX = "";
      s += '<g transform="translate(200 22)"><g class="chip">' + L(0, 0, tags[0], { z: 15, s: accent, f: C.ink, bg: C.paper }) + "</g></g>";
      s += M("__pg", 0, 297, R(0, -2, CW, 4, accent, { op: 0.9 }), { c: "ol" });
      return s + "</svg></svg>";
    }
    function paint(n) {
      var s = n._s;
      n.style.transform = "translate(" + s.x.toFixed(2) + "px," + s.y.toFixed(2) + "px) rotate(" + s.r.toFixed(2) + "deg) scale(" +
        (s.s * s.sx).toFixed(4) + "," + (s.s * s.sy).toFixed(4) + ")";
      n.style.opacity = String(clamp(s.o, 0, 1));
      if (n._dr) n.style.strokeDashoffset = (100 - 100 * clamp(s.d, 0, 1)).toFixed(2);
      if (n._num) n.textContent = n._pre + fmtNum(s.n) + n._suf;
    }
    function fitPill(g) {
      try {
        var t = g.querySelector("text"), r = g.querySelector("rect");
        var w = t.getComputedTextLength();
        if (!(w > 0)) return;
        var pad = Number(g.getAttribute("data-pad")) || 20, cx = Number(g.getAttribute("data-cx")) || 0;
        r.setAttribute("width", (w + pad).toFixed(1));
        r.setAttribute("x", (cx - (w + pad) / 2).toFixed(1));
      } catch (e) { /* layout not available yet */ }
    }
    function register() {
      nodes = [];
      var list = root.querySelectorAll("[data-k]");
      for (var i = 0; i < list.length; i++) {
        var n = list[i], k = n.getAttribute("data-k"), m = /^b(\d+)_/.exec(k);
        n._k = k; n._b = m ? Number(m[1]) : -1;
        n._dr = n.classList && n.classList.contains("dr");
        n._isT = n.tagName.toLowerCase() === "text";
        n._num = n._isT && n.hasAttribute("data-n");
        n._pre = n.getAttribute("data-pre") || ""; n._suf = n.getAttribute("data-suf") || "";
        n._anim = (n.classList && n.classList.contains("mv")) || n._num;
        var o0 = n.getAttribute("data-o"), d0 = n.getAttribute("data-d");
        n._d0 = {};
        for (var p in DEF) n._d0[p] = DEF[p];
        if (o0 !== null) n._d0.o = Number(o0);
        if (d0 !== null) n._d0.d = Number(d0);
        if (n._num) n._d0.n = Number(n.getAttribute("data-n")) || 0;
        n._s = {};
        for (var q in n._d0) n._s[q] = n._d0[q];
        n._t0 = n._isT && !n._num ? n.textContent : null;
        n._f0 = n.getAttribute("fill");
        n._st0 = n.getAttribute("stroke");
        n._tok = 0;
        if (n._anim) paint(n);
        nodes.push(n);
      }
      chipG = root.querySelector(".chip");
      chipT = chipG ? chipG.querySelector("text") : null;
      var pills = root.querySelectorAll(".pill");
      for (var j = 0; j < pills.length; j++) fitPill(pills[j]);
    }
    function kill(n) {
      n._tok++;
      if (W.gsap) { try { W.gsap.killTweensOf(n._s); } catch (e) { } }
    }
    function tween(n, to, dur, del, ease) {
      kill(n);
      if (W.gsap) {
        try {
          var v = {};
          for (var p in to) v[p] = to[p];
          v.duration = dur; v.delay = del; v.ease = GSE[ease] || GSE.io; v.overwrite = true;
          v.onUpdate = function () { paint(n); };
          W.gsap.to(n._s, v);
          return;
        } catch (e) { /* fall through to rAF */ }
      }
      var from = {}, tok = n._tok, t0 = nowMs() + del * 1000, ef = EASE[ease] || EASE.io;
      for (var q in to) from[q] = n._s[q];
      var raf = W.requestAnimationFrame || function (f) { return setTimeout(function () { f(nowMs()); }, 16); };
      function frame() {
        if (tok !== n._tok) return;
        var t = (nowMs() - t0) / (dur * 1000);
        if (t < 0) { raf(frame); return; }
        var e = ef(clamp(t, 0, 1));
        for (var r in to) n._s[r] = from[r] + (to[r] - from[r]) * e;
        paint(n);
        if (t < 1) raf(frame);
      }
      raf(frame);
    }
    function snap(n, to) {
      kill(n);
      for (var p in to) n._s[p] = to[p];
      paint(n);
    }
    function render(k, quick) {
      var bi = boardOf(k), bd = boards[bi], tg = {};
      function S(key, p) {
        var kk = PFX + key;
        tg[kk] = tg[kk] || {};
        for (var q in p) tg[kk][q] = p[q];
      }
      PFX = "b" + bi + "_";
      bd.view(k - bd.a, S);
      PFX = "";
      for (var j = 0; j < boards.length; j++) tg["B" + j] = { o: j === bi ? 1 : 0, s: j === bi ? 1 : 0.97, dur: 0.5, e: "out" };
      tg.__pg = { sx: (k + 1) / N, dur: 0.6 };
      var entering = bi !== lastB;
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (n._b >= 0 && n._b !== bi) continue;
        if (entering && n._b === bi) snap(n, n._d0);
        var t = tg[n._k] || {}, num = {}, diff = false;
        for (var p in n._d0) {
          var v = t[p] !== undefined ? t[p] : n._d0[p];
          num[p] = v;
          if (Math.abs(n._s[p] - v) > 1e-4) diff = true;
        }
        if (n._t0 !== null) {
          var txt = t.t !== undefined ? String(t.t) : n._t0;
          if (n.textContent !== txt) {
            n.textContent = txt;
            if (n.parentNode && n.parentNode.classList && n.parentNode.classList.contains("pill")) fitPill(n.parentNode);
          }
        }
        var f = t.f !== undefined ? t.f : n._f0;
        if (f !== null && n.getAttribute("fill") !== f) n.setAttribute("fill", f);
        var st = t.st !== undefined ? t.st : n._st0;
        if (st !== null && n.getAttribute("stroke") !== st) n.setAttribute("stroke", st);
        if (!n._anim || !diff) continue;
        if (quick) snap(n, num);
        else tween(n, num, t.dur !== undefined ? t.dur : 0.8, (t.del || 0) + (entering && n._b === bi ? 0.12 : 0), t.e || "io");
      }
      if (chipT) {
        var changed = chipT.textContent !== tags[k];
        chipT.textContent = tags[k];
        fitPill(chipG.querySelector(".pill"));
        if (changed && !quick) {
          chipG.classList.remove("pop");
          void chipG.getBoundingClientRect();
          chipG.classList.add("pop");
        }
      }
      if (svg) svg.setAttribute("aria-label", cfg.label + ": " + tags[k]);
      lastB = bi;
    }
    function show(k, instant) {
      if (!root) return;
      render(k, !!instant || reduced());
      last = k;
    }
    function index(i, n) {
      var ii = Math.floor(Number(i) || 0), nn = Math.floor(Number(n) || 0);
      if (!(nn > 0)) nn = N;
      ii = clamp(ii, 0, nn - 1);
      if (nn === N) return ii;
      if (nn === 1) return 0;
      return clamp(Math.round((ii * (N - 1)) / (nn - 1)), 0, N - 1);
    }
    VLS[id] = {
      build: function (host) {
        if (!host) return;
        if (ro) { try { ro.disconnect(); } catch (e) { } ro = null; }
        root = document.createElement("div");
        root.className = "vls-w13-" + id;
        root.innerHTML = markup();
        if (typeof host.replaceChildren === "function") host.replaceChildren(root);
        else { host.innerHTML = ""; host.appendChild(root); }
        if (host.clientHeight < 60) root.style.cssText = "height:auto;aspect-ratio:4/3";
        svg = root.querySelector("svg");
        core = root.querySelector("svg.core");
        register();
        fit();
        if (W.ResizeObserver) { ro = new W.ResizeObserver(fit); ro.observe(root); }
        last = -1; lastB = -1;
        show(0, true);
      },
      step: function (i, n) {
        if (!root) return;
        var k = index(i, n);
        if (k === last) return;
        show(k, false);
      },
      reset: function () {
        if (!root) return;
        last = -1; lastB = -1;
        show(0, true);
      },
      _meta: { n: N, boards: boards.map(function (b) { return [b.a, b.b, b.tpl]; }) }
    };
    CSS.push(baseCSS(id, cfg.bgc || "#f5f0e6") + (cfg.css ? "\n" + cfg.css : ""));
  }
  function installCSS(mark) {
    var st = document.getElementById("vl-sc-w13");
    if (!st) {
      st = document.createElement("style");
      st.id = "vl-sc-w13";
      (document.head || document.documentElement).appendChild(st);
    }
    var tagm = "/*" + mark + "*/";
    if (st.textContent.indexOf(tagm) === -1) st.textContent += "\n" + tagm + "\n" + (st.textContent.indexOf("w13v2pop{") === -1 ? KEYFRAMES + "\n" : "") + CSS.join("\n");
  }
  /* Board constructor: lines a..b, benchmark template, draw(), view(b, S). */
  function BD(a, b, tpl, draw, view) { return { a: a, b: b, tpl: tpl, draw: draw, view: view }; }
  /* Full-bleed backdrop helper (paints far beyond the 400 x 300 core). */
  function backdrop(top, bottom, floorY, floor, extra) {
    var id = "g" + Math.random().toString(36).slice(2, 8);
    return "<defs>" + el("linearGradient", { id: id, x1: 0, y1: 0, x2: 0, y2: 1 },
      el("stop", { offset: 0, "stop-color": top }) + el("stop", { offset: 1, "stop-color": bottom })) + "</defs>" +
      R(-400, -300, 1200, 900, "url(#" + id + ")") + (floor ? R(-400, floorY, 1200, 600, floor) : "") + (extra || "");
  }
  /* ==================================================================
     W13O2c  FOUR FEWER EMPLOYEES, ELEVEN ASSUMED  (27 lines)
     Rebuilt first (audit 3.5/10: 12 WEAK, 11 MISMATCH). Nine boards:
     the shortcut and why it fails, capacity versus cost, who decides,
     and what an honest report shows.
     ================================================================== */
  scene("W13O2c", {
    label: "Four fewer employees, eleven assumed",
    accent: C.navy,
    bgc: "#eef1f5",
    bg: function () { return backdrop("#e7ecf3", "#f5f2ea", 274, "#e4ddcd"); },
    tags: ["An uncomfortable question", "Eleven fewer assumed", "Only four fewer", "The tempting shortcut",
      "\u2248 AED 87,273?", "Costs differ per person", "Evidence before numbers", "What did it achieve?",
      "Capacity for other work", "Potential, not proof", "What management does", "Finance asks questions",
      "Don't assume the answer", "\u201CIt's faster\u201D", "Payroll and budget", "Ownership matters",
      "The owner decides use", "No cuts to fit", "Service needs first", "Wrong estimate, or action?",
      "7 is not money", "Seven recent go-lives", "No guarantee", "A reconciled explanation",
      "Keep the uncertainty", "Established vs needed", "Three different things"],
    boards: [
      /* 1. Lines 0-2. The front desk: eleven departures assumed, four observed.
         Adapted from: 109 teamwork (people appear and form a team)
         https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6  */
      BD(0, 2, "109", function () {
        var s = "";
        s += M("spot", 200, 150, P("M-60 -110 L-180 70 H180 L60 -110 Z", "none", 0, { f: "rgba(217,152,43,.12)" }));
        s += R(16, 170, 368, 18, C.navy, { rx: 4 }) + R(16, 188, 368, 6, C.ink, { rx: 2 }) + T(200, 179, "FRONT DESK", { z: 11, f: C.white });
        for (var i = 0; i < 11; i++) {
          var x = 34 + i * 33.2;
          s += M("pp" + i, x, 150, person(C.navy, 0.95));
          s += M("po" + i, x, 150, person(C.orange, 0.95), { o0: 0 });
        }
        s += M("q", 200, 78, L(0, 0, "UNCOMFORTABLE QUESTION", { z: 15, s: C.gold, f: C.ink }), { o0: 0 });
        s += M("cl", 200, 78, L(0, 0, "AED 240k = 11 FEWER", { z: 16, s: C.orange }), { o0: 0 });
        s += M("n11", 110, 240, T(0, 0, "11", { z: 40, f: C.orange }) + T(0, 40, "ASSUMED", { z: 13, f: C.orange }), { o0: 0 });
        s += M("n4", 290, 240, T(0, 0, "4", { z: 40, f: C.green }) + T(0, 40, "OBSERVED", { z: 13, f: C.green }), { o0: 0 });
        s += M("gap", 200, 240, L(0, 0, "A LARGE GAP", { z: 14, s: C.ink, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "q", b === 0, { del: 0.3 });
        V(S, "cl", b >= 1);
        for (var i = 0; i < 11; i++) {
          var gone = b === 2 && i < 4;
          V(S, "po" + i, b === 1 || (b === 2 && i < 4), { del: i * 0.05, x: gone ? 18 : 0, y: gone ? -10 : 0, o: b === 1 ? 1 : gone ? 0.25 : 0 });
          S("pp" + i, { o: b === 2 && i < 4 ? 0 : 1 });
        }
        V(S, "n11", b >= 1, { del: 0.4 }); V(S, "n4", b === 2, { del: 0.5 }); V(S, "gap", b === 2, { del: 0.8 });
      }),
      /* 2. Lines 3-4. The calculator shortcut: 240,000 x 4 / 11 = 87,273, stamped unverified.
         Adapted from: 119 Infographics V2 by Typoland (scale and numeric tweens)
         https://motionarray.com/after-effects-templates/infographics-v2-556482/  */
      BD(3, 4, "119", function () {
        var s = "";
        s += M("calc", 200, 162, R(-150, -108, 300, 216, C.ink, { rx: 18 }) + R(-130, -90, 260, 70, "#cfe3d6", { rx: 8 }) +
          [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { return R(-124 + (i % 4) * 64, 2 + Math.floor(i / 4) * 44, 56, 36, i === 7 ? C.orange : C.slate, { rx: 6 }); }).join("") +
          T(-96, 20, "\u00D7", { z: 20, f: C.white }) + T(-32, 20, "\u00F7", { z: 20, f: C.white }) + T(96, 64, "=", { z: 22, f: C.white }));
        s += M("ex", 200, 108, T(0, 0, "240,000 \u00D7 4 \u00F7 11", { z: 22, f: C.ink }), { o0: 0 });
        s += M("res", 200, 108, T(0, 0, "", { z: 26, f: C.ink, k: "rv", num: { v: 240000, pre: "\u2248 " } }), { o0: 0 });
        s += M("tag", 200, 284, L(0, 0, "A RATIO SHORTCUT", { z: 13, s: C.slate }), { o0: 0 });
        s += M("st", 200, 146, stamp("NOT ACTUAL BENEFIT", C.red, 16), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "ex", b === 0, { del: 0.2 }); V(S, "tag", b === 0, { del: 0.6 });
        V(S, "res", b === 1); S("rv", { n: b === 1 ? 87273 : 240000, dur: 1.4 });
        V(S, "st", b === 1, { del: 1.2, r: -6, e: "back" });
      }),
      /* 3. Lines 5-6. Eleven equal slices become unequal (illustrative); evidence comes from two files.
         Adapted from: 133 Path tween (sampled geometry morphs from one shape to another)
         https://observablehq.com/@d3/path-tween  */
      (function () {
        var WT = [0.6, 0.8, 0.65, 0.75, 1.35, 1.1, 1.4, 0.95, 1.3, 1.05, 1.05], tot = 0, EQ = 340 / 11, UX = [], UW = [], x = 30;
        WT.forEach(function (w) { tot += w; });
        WT.forEach(function (w) { UX.push(x); UW.push(w / tot * 340); x += w / tot * 340; });
        return BD(5, 6, "133", function () {
          var s = "";
          for (var i = 0; i < 11; i++) {
            s += M("u" + i, 30 + i * EQ, 110, R(0, -26, EQ, 52, i % 2 ? C.plum : "#8468ad", { s: C.white, sw: 1.5 }), { c: "ol" });
          }
          s += T(200, 66, "11 EMPLOYMENT COSTS", { z: 14, f: C.slate });
          s += M("df", 200, 162, L(0, 0, "COSTS DIFFER", { z: 15, s: C.plum }), { o0: 0 });
          s += M("il", 200, 186, T(0, 0, "ILLUSTRATIVE WIDTHS", { z: 12, f: C.slate }), { o0: 0 });
          s += M("as", 200, 230, L(0, 0, "OTHER ASSUMPTIONS TOO", { z: 14, s: C.orange }), { o0: 0 });
          s += M("f1", 110, 222, R(-74, -38, 148, 76, C.white, { rx: 8, s: C.navy, sw: 2.5 }) + R(-74, -46, 52, 12, C.navy, { rx: 3 }) +
            T(0, -8, "STAFFING", { z: 14, f: C.navy }) + T(0, 14, "DECISIONS", { z: 14, f: C.navy }), { o0: 0 });
          s += M("f2", 290, 222, R(-74, -38, 148, 76, C.white, { rx: 8, s: C.green, sw: 2.5 }) + R(-74, -46, 52, 12, C.green, { rx: 3 }) +
            T(0, -8, "ACTUAL", { z: 14, f: C.green }) + T(0, 14, "EXPENDITURE", { z: 14, f: C.green }), { o0: 0 });
          s += M("mg", 110, 236, mag(16), { o0: 0 });
          return s;
        }, function (b, S) {
          for (var i = 0; i < 11; i++) S("u" + i, { x: UX[i] - (30 + i * EQ), sx: UW[i] / EQ, del: 0.3 + i * 0.05, dur: 1.2, o: b === 1 ? 0.35 : 1 });
          V(S, "df", b === 0, { del: 0.9 }); V(S, "il", b === 0, { del: 1.1 }); V(S, "as", b === 0, { del: 1.3 });
          V(S, "f1", b === 1); V(S, "f2", b === 1, { del: 0.2 }); V(S, "mg", b === 1, { x: b === 1 ? 180 : 0, dur: 1.8, del: 0.4 });
        });
      })(),
      /* 4. Lines 7-10. Arrivals move faster; staff gain time for other work; potential, not budget; management chooses.
         Adapted from: 097 Business Solution conveyor (boxes moved along a belt by a turning gear)
         https://lottiefiles.com/free-animation/business-solution-pNyNfkcRsa  */
      BD(7, 10, "097", function () {
        var s = "";
        s += R(16, 108, 368, 10, C.slate, { rx: 5 }) + P("M20 113 H380", C.white, 2, { da: "8 8", c: "march" });
        s += G(G(person(C.orange, 0.7) + G(person(C.orange, 0.7), "translate(60 0)") + G(person(C.orange, 0.7), "translate(120 0)"), "translate(60 96)"), "", "walk");
        s += M("fast", 300, 72, L(0, 0, "FASTER ARRIVALS", { z: 14, s: C.teal }) );
        s += M("ach", 100, 72, L(0, 0, "WHAT CHANGED?", { z: 14, s: C.ink, f: C.ink }), { o0: 0 });
        s += M("st", 110, 210, G(person(C.navy, 1.3), "translate(-30 0)") + G(person(C.navy, 1.3), "translate(30 0)"), { o0: 0 });
        s += M("bub", 140, 152, speech(150, 32, C.teal) + T(0, 0, "TIME FOR OTHER WORK", { z: 12, f: C.teal }), { o0: 0 });
        s += M("bat", 290, 208, R(-50, -24, 100, 48, C.white, { rx: 6, s: C.teal, sw: 3 }) + R(50, -10, 8, 20, C.teal, { rx: 2 }) +
          R(-44, -18, 60, 36, C.teal, { rx: 3, op: 0.6 }) + T(0, 40, "POTENTIAL", { z: 13, f: C.teal }), { o0: 0 });
        s += M("bud", 290, 208, R(-50, -32, 100, 64, C.white, { rx: 8, s: C.navy, sw: 2.5 }) + T(0, -14, "SALARY BUDGET", { z: 11, f: C.navy }) +
          T(0, 10, "UNCHANGED", { z: 13, f: C.navy }), { o0: 0 });
        s += M("mgr", 200, 252, person(C.green, 1.2), { o0: 0 });
        s += D("fa", "M214 240 C250 230 270 214 300 210", C.green, 3);
        s += D("fb", "M186 240 C150 230 130 214 100 210", C.slate, 3);
        s += M("oa", 320, 206, L(0, 0, "REDEPLOYED", { z: 13, s: C.green }), { o0: 0 });
        s += M("ob", 84, 206, L(0, 0, "NOTHING CHANGES", { z: 13, s: C.slate }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "ach", b === 0, { del: 0.3 });
        V(S, "st", b === 1 || b === 2, { x: b === 2 ? -40 : 0 });
        V(S, "bub", b === 1, { del: 0.4 });
        V(S, "bat", b === 2, { x: b === 2 ? -84 : 0 }); V(S, "bud", b === 2, { x: b === 2 ? 40 : 0, del: 0.3 });
        V(S, "mgr", b === 3); S("fa", { d: b === 3 ? 1 : 0, del: 0.3 }); S("fb", { d: b === 3 ? 1 : 0, del: 0.5 });
        V(S, "oa", b === 3, { del: 0.8 }); V(S, "ob", b === 3, { del: 0.9 });
      }),
      /* 5. Lines 11-14. Finance's three questions, unanswered on purpose; "it's faster"; then payroll and budget.
         Adapted from: 081 Clean Workflow Visualization with Motion Graphics (journey steps joined with transitions)
         https://dribbble.com/shots/27600376-Clean-Workflow-Visualization-with-Motion-Graphics  */
      BD(11, 14, "081", function () {
        var s = "";
        s += M("fd", 52, 236, person(C.orange, 1.5) + T(0, 36, "FINANCE", { z: 13, f: C.orange }));
        var Q = ["REASSIGNED?", "NEW SERVICES?", "SAME DUTIES?"];
        Q.forEach(function (q, i) {
          s += M("q" + i, 250, 92 + i * 56, R(-110, -22, 220, 44, C.white, { rx: 10, s: C.orange, sw: 2.5 }) + T(-90, 1, q, { z: 15, a: "start", f: C.ink }) +
            G(qb(11), "translate(88 0)"), { o0: 0 });
          s += D("ql" + i, "M80 210 C110 " + (92 + i * 56) + " 120 " + (92 + i * 56) + " 140 " + (92 + i * 56), C.orange, 2);
        });
        s += M("na", 250, 262, L(0, 0, "NONE ASSUMED", { z: 14, s: C.red }), { o0: 0 });
        s += M("pd", 70, 236, person(C.navy, 1.5) + T(0, 36, "PROGRAMME", { z: 13, f: C.navy }), { o0: 0 });
        s += M("fs", 102, 120, speech(140, 36, C.navy) + T(0, 0, "IT'S FASTER", { z: 15, f: C.navy }), { o0: 0 });
        s += M("c1", 270, 110, R(-80, -26, 160, 52, C.pale, { rx: 10, s: C.green, sw: 2.5 }) + T(-10, 1, "OPERATIONS", { z: 14, f: C.green }) + G(okb(10), "translate(60 0)"), { o0: 0 });
        s += M("c2", 270, 176, R(-80, -26, 160, 52, C.white, { rx: 10, s: C.navy, sw: 2.5 }) + T(-10, 1, "FINANCES", { z: 14, f: C.navy }) + G(qb(10), "translate(60 0)"), { o0: 0 });
        s += M("pb", 0, 0, G(doc(70, 90, C.navy), "translate(200 140)") + T(200, 204, "PAYROLL", { z: 14, f: C.navy }) +
          G(doc(70, 90, C.green), "translate(300 140)") + T(300, 204, "BUDGET", { z: 14, f: C.green }), { o0: 0 });
        s += M("mg", 200, 150, mag(22), { o0: 0 });
        s += M("dp", 250, 258, L(0, 0, "DEFENSIBLE PORTION?", { z: 14, s: C.ink, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("fd", { o: b <= 1 || b === 3 ? 1 : 0 });
        for (var i = 0; i < 3; i++) { V(S, "q" + i, b <= 1, { del: 0.2 + i * 0.2 }); S("ql" + i, { d: b <= 1 ? 1 : 0, o: b <= 1 ? 1 : 0, del: i * 0.2 }); }
        V(S, "na", b === 1, { del: 0.3 });
        V(S, "pd", b === 2); V(S, "fs", b === 2, { del: 0.3, e: "back" }); V(S, "c1", b === 2, { del: 0.5 }); V(S, "c2", b === 2, { del: 0.7 });
        V(S, "pb", b === 3); V(S, "mg", b === 3, { x: b === 3 ? 100 : 0, dur: 1.6, del: 0.4 }); V(S, "dp", b === 3, { del: 0.6 });
      }),
      /* 6. Lines 15-18. The business owner holds the lever; scissors that cut staff to fit an estimate are refused.
         Adapted from: 086 Workflow by a (role icons and handoff sequence)
         https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm  */
      BD(15, 18, "086", function () {
        var s = "";
        s += M("pt", 80, 210, person(C.slate, 1.3) + T(0, 36, "PROJECT TEAM", { z: 13, f: C.slate }));
        s += M("no", 80, 140, nob(14), { o0: 0 });
        s += M("bo", 300, 210, person(C.green, 1.5) + T(0, 38, "BUSINESS OWNER", { z: 13, f: C.green }));
        s += M("lev", 214, 196, R(-6, -2, 12, 46, C.ink, { rx: 3 }) + P("M0 0 L24 -54", C.ink, 6) + O(24, -54, 9, C.red), { o0: 0 });
        s += M("lt", 190, 96, L(0, 0, "STAFFING DECISIONS", { z: 14, s: C.ink, f: C.ink }), { o0: 0 });
        s += M("use", 0, 0, arrowH(160, 120, 228, 120, C.green, 3) + L(110, 120, "CAPACITY", { z: 14, s: C.teal }) + L(300, 120, "RESULT", { z: 14, s: C.green }), { o0: 0 });
        s += M("sc", 110, 150, G(O(-10, 14, 9, "none", { s: C.ink, sw: 3.5 }) + O(10, 14, 9, "none", { s: C.ink, sw: 3.5 }) + P("M-5 6 L14 -26 M5 6 L-14 -26", C.ink, 3.5)) +
          O(0, -4, 40, "none", { s: C.red, sw: 4 }) + P("M-28 24 L28 -32", C.red, 4), { o0: 0 });
        s += M("nf", 110, 226, L(0, 0, "NO CUTS TO FIT", { z: 15, s: C.red }), { o0: 0 });
        s += M("bal", 0, 0, L(80, 92, "OPERATIONS", { z: 13, s: C.navy }) + L(200, 72, "SERVICE", { z: 13, s: C.teal }) + L(320, 92, "BUSINESS NEEDS", { z: 13, s: C.plum }) +
          P("M120 102 L200 140 L280 102 M200 84 V140", C.ink, 2), { o0: 0 });
        return s;
      }, function (b, S) {
        S("pt", { o: b <= 1 ? 1 : 0 });
        V(S, "no", b === 0, { del: 0.6 });
        V(S, "lev", b === 0 || b === 1, { del: 0.3 }); V(S, "lt", b === 0, { del: 0.5 });
        V(S, "use", b === 1, { del: 0.3 });
        S("bo", { x: b === 3 ? -100 : 0 });
        V(S, "sc", b === 2, { del: 0.2 }); V(S, "nf", b === 2, { del: 0.5 });
        V(S, "bal", b === 3, { del: 0.2 });
        S("lev", { o: b <= 1 ? 1 : 0, r: b === 1 ? -20 : 0 });
      }),
      /* 7. Lines 19-20. Two diagnoses; 11 minus 4 is a headcount, not a monetary shortfall.
         Adapted from: 117 Infographics Elements by TarZanchik (shapes and data revealed)
         https://motionarray.com/after-effects-templates/infographics-elements-789489/  */
      BD(19, 20, "117", function () {
        var s = "";
        s += M("d1", 104, 150, R(-86, -70, 172, 140, C.white, { rx: 12, s: C.plum, sw: 3 }) + doc(46, 54, C.plum) + P("M-14 -30 L4 0 L-10 30", C.red, 3) +
          T(0, 46, "UNREALISTIC", { z: 13, f: C.plum }) + T(0, 62, "ASSUMPTION", { z: 13, f: C.plum }), { o0: 0 });
        s += M("d2", 296, 150, R(-86, -70, 172, 140, C.white, { rx: 12, s: C.teal, sw: 3 }) + G(G(gear(18, C.teal), "", "spin"), "translate(0 -6)") +
          T(0, 46, "NEEDS FURTHER", { z: 13, f: C.teal }) + T(0, 62, "ACTION", { z: 13, f: C.teal }), { o0: 0 });
        s += M("or", 200, 150, O(0, 0, 18, C.ink) + T(0, 1, "OR", { z: 13, f: C.white }), { o0: 0 });
        s += M("eq", 200, 124, T(0, 0, "11 \u2212 4 = 7", { z: 34, f: C.ink }), { o0: 0 });
        s += M("ne", 200, 196, L(0, 0, "7 PEOPLE \u2260 AED SHORTFALL", { z: 16, s: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "d1", b === 0); V(S, "d2", b === 0, { del: 0.2 }); V(S, "or", b === 0, { del: 0.5, e: "back" });
        V(S, "eq", b === 1); V(S, "ne", b === 1, { del: 0.5 });
      }),
      /* 8. Lines 21-22. Seven recent go-lives; future staffing exits drawn only in outline, with no guarantee.
         Adapted from: 135 Timeline by The Creators (milestones and a travelling marker)
         https://motionarray.com/after-effects-templates/timeline/  */
      BD(21, 22, "135", function () {
        var s = "";
        s += P("M24 120 H376", C.ink, 3) + R(256, 110, 120, 20, "rgba(192,80,42,.15)", { rx: 4 }) + T(316, 144, "LAST 4 MONTHS", { z: 13, f: C.orange });
        var X = [40, 70, 100, 130, 160, 190, 220, 268, 286, 304, 322, 340, 358, 376];
        for (var i = 0; i < 14; i++) s += M("h" + i, X[i] - (i === 13 ? 6 : 0), i >= 7 ? (i % 2 ? 98 : 76) : 98, hotel(i >= 7 ? C.orange : C.navy, 0.48), { o0: 0 });
        s += M("tm", 130, 210, L(0, 0, "TIMING MATTERS", { z: 15, s: C.orange }), { o0: 0 });
        for (var j = 0; j < 7; j++) {
          s += M("f" + j, 170 + j * 30, 222, P("M-11 13 Q-11 -4 0 -4 Q11 -4 11 13 Z M6 -13 A6 6 0 1 1 5.9 -13.1", C.slate, 2, { da: "3 3" }), { o0: 0 });
        }
        s += M("ng", 260, 262, L(0, 0, "NOT GUARANTEED", { z: 15, s: C.red }), { o0: 0 });
        s += M("rest", 84, 222, T(0, 0, "7 MORE?", { z: 16, f: C.slate }), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 14; i++) V(S, "h" + i, true, { del: i * 0.05, e: "back" });
        V(S, "tm", b === 0, { del: 0.8 });
        for (var j = 0; j < 7; j++) V(S, "f" + j, b === 1, { del: j * 0.08 });
        V(S, "ng", b === 1, { del: 0.7 }); V(S, "rest", b === 1, { del: 0.4 });
      }),
      /* 9. Lines 23-26. Three ways to report: the claim, the ratio, or a qualified figure pending evidence.
         Adapted from: 095 contract process (proposal revealed, then the agreement state)
         https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8  */
      BD(23, 26, "095", function () {
        var s = "", OP = [["AED 240k", "ORIGINAL CLAIM", C.navy], ["\u2248 87k", "RATIO ESTIMATE", C.slate], ["PENDING", "EVIDENCE NEEDED", C.green]];
        OP.forEach(function (o, i) {
          var x = 72 + i * 128;
          s += M("o" + i, x, 116, R(-58, -48, 116, 96, C.white, { rx: 12, s: o[2], sw: 3 }) + T(0, -10, o[0], { z: 20, f: o[2] }) + T(0, 22, o[1], { z: 11, f: o[2] }), { o0: 0 });
          s += M("m" + i, x + 44, 76, i === 2 ? okb(12) : nob(12), { o0: 0 });
        });
        s += M("band", 328, 116, R(-66, -56, 132, 112, "none", { rx: 14, s: C.orange, sw: 3, da: "6 5" }) , { o0: 0 });
        s += M("unc", 328, 196, L(0, 0, "UNCERTAINTY KEPT", { z: 13, s: C.orange }), { o0: 0 });
        s += M("cols", 0, 0, R(24, 168, 168, 110, C.pale, { rx: 10, s: C.green, sw: 2.5 }) + T(108, 186, "ESTABLISHED", { z: 14, f: C.green }) +
          T(108, 214, "4 FEWER STAFF", { z: 13, f: C.ink }) + T(108, 236, "FASTER ARRIVALS", { z: 13, f: C.ink }) +
          R(208, 168, 168, 110, C.amber, { rx: 10, s: C.orange, sw: 2.5 }) + T(292, 186, "EVIDENCE NEEDED", { z: 14, f: C.orange }) +
          T(292, 214, "PAYROLL", { z: 13, f: C.ink }) + T(292, 236, "USE OF TIME", { z: 13, f: C.ink }), { o0: 0 });
        var MT = [["HOURS", C.teal, 72], ["HEADCOUNT", C.navy, 200], ["EXPENDITURE", C.orange, 328]];
        MT.forEach(function (m, i) {
          s += M("mt" + i, m[2], 160, R(-58, -90, 116, 180, C.white, { rx: 12, s: m[1], sw: 3 }) + T(0, -70, m[0], { z: 13, f: m[1] }) +
            (i === 2 ? G(qb(20, m[1]), "translate(0 10)") : P("M0 -30 V40 M-16 24 L0 40 L16 24", m[1], 6)) +
            T(0, 70, i === 2 ? "NOT SHOWN" : "FEWER", { z: 13, f: m[1] }), { o0: 0 });
        });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 3; i++) {
          V(S, "o" + i, b <= 2, { del: i * 0.15, y: b === 2 ? -30 : 0, s: b === 2 ? 0.85 : 1 });
          V(S, "m" + i, b <= 1, { del: 0.6 + i * 0.15, e: "back" });
          V(S, "mt" + i, b === 3, { del: i * 0.2 });
        }
        V(S, "band", b === 1, { e: "back" }); V(S, "unc", b === 1, { del: 0.3 });
        V(S, "cols", b === 2, { del: 0.3 });
      })
    ]
  });
  /* ==================================================================
     W13O2d  TWO RENEWALS, A RATE CUT AND AN AVOIDED FINE  (26 lines)
     Rebuilt first (audit 3.5/10: 16 WEAK, 8 MISMATCH). Nine boards: the
     renewal claim is tested for cause and contribution, the penalty claim
     for exposure and counterfactual, and both are reported separately.
     ================================================================== */
  scene("W13O2d", {
    label: "Two renewals, a rate cut and an avoided fine",
    accent: C.plum,
    bgc: "#f2eff6",
    bg: function () { return backdrop("#ece8f4", "#f6f2ea", 274, "#e6dfd1"); },
    tags: ["Two claims, two puzzles", "180k and 85k", "Figures alone can't tell", "Two corporate renewals",
      "Renewed, but why?", "Rates cut by 4%", "Arrivals and price", "All credit to BPM?",
      "An attribution problem", "Ask, don't assume", "Retained \u2260 contribution", "Income minus costs",
      "Cheaper keeps less value", "Finance needs evidence", "Now the avoided fine", "Contingent, not certain",
      "No fine \u2260 saving", "Was it realistic?", "The counterfactual", "Keep the uncertainty",
      "Different evidence each", "Value, not yet realised", "Examine them separately", "Keep amounts, show doubts",
      "Neither proves zero", "Happened, contributed, recognised"],
    boards: [
      /* 1. Lines 0-2. Two claim tiles, two bars, and a lens that finds no answer in the numbers alone.
         Adapted from: 113 Infographic Chart Creator (columns grow, labels update)
         https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/  */
      BD(0, 2, "113", function () {
        var s = "", base = 250, k = 150 / 180;
        s += M("t1", 110, 120, R(-80, -56, 160, 112, C.white, { rx: 12, s: C.green, sw: 3 }) + G(contract(C.green), "translate(-34 -2)") +
          T(22, -10, "RETAINED", { z: 14, f: C.green }) + T(22, 10, "REVENUE", { z: 14, f: C.green }));
        s += M("t2", 290, 120, R(-80, -56, 160, 112, C.white, { rx: 12, s: C.plum, sw: 3 }) + G(shield(1.3, C.plum), "translate(-40 0)") +
          T(18, -10, "AVOIDED", { z: 14, f: C.plum }) + T(18, 10, "PENALTY", { z: 14, f: C.plum }));
        s += M("dif", 200, 220, L(0, 0, "DIFFERENT CHALLENGES", { z: 15, s: C.ink, f: C.ink }), { o0: 0 });
        s += M("ax", 0, 0, P("M60 " + base + " H340", C.ink, 2.5), { o0: 0 });
        s += M("b1", 140, base, R(-40, -150, 80, 150, C.green, { rx: 4 }), { c: "ob", o0: 0 });
        s += M("b2", 260, base, R(-40, -85 * k, 80, 85 * k, C.plum, { rx: 4 }), { c: "ob", o0: 0 });
        s += M("v1", 0, 0, T(140, base - 132, "", { z: 18, f: C.white, k: "n1", num: { v: 0, suf: "k" } }), { o0: 0 });
        s += M("v2", 0, 0, T(260, base - 85 * k + 18, "", { z: 18, f: C.white, k: "n2", num: { v: 0, suf: "k" } }), { o0: 0 });
        s += M("lb", 0, 0, T(140, base + 14, "RETAINED", { z: 13, f: C.green }) + T(260, base + 14, "PENALTY", { z: 13, f: C.plum }) +
          T(340, base - 140, "AED", { z: 13, a: "end", f: C.slate }), { o0: 0 });
        s += M("mg", 200, 120, mag(30), { o0: 0 });
        s += M("q1", 180, 70, qb(13), { o0: 0 });
        s += M("ev", 200, 64, L(0, 0, "EVIDENCE BEYOND FIGURES", { z: 14, s: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("t1", { o: b === 0 ? 1 : 0, y: b === 0 ? 0 : -20 }); S("t2", { o: b === 0 ? 1 : 0, y: b === 0 ? 0 : -20 });
        V(S, "dif", b === 0, { del: 0.5 });
        V(S, "ax", b >= 1);
        S("b1", { o: b >= 1 ? 1 : 0, sy: b >= 1 ? 1 : 0.02 }); S("b2", { o: b >= 1 ? 1 : 0, sy: b >= 1 ? 1 : 0.02, del: 0.2 });
        V(S, "v1", b >= 1); S("n1", { n: b >= 1 ? 180 : 0, dur: 1.1 });
        V(S, "v2", b >= 1); S("n2", { n: b >= 1 ? 85 : 0, dur: 1.1, del: 0.2 });
        V(S, "lb", b >= 1);
        V(S, "mg", b === 2, { x: b === 2 ? 0 : -80, dur: 1.2 }); V(S, "ev", b === 2, { del: 0.6 });
      }),
      /* 2. Lines 3-5. Two contracts are signed; the client keeps its reasons; a 4% rate tag drops in.
         Adapted from: 095 contract process (proposal revealed, agreement signed)
         https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8  */
      BD(3, 5, "095", function () {
        var s = "";
        [100, 210].forEach(function (x, i) {
          s += M("c" + i, x, 140, R(-46, -62, 92, 124, C.white, { rx: 6, s: C.green, sw: 2.5 }) +
            P("M-30 -40 H30 M-30 -26 H24 M-30 -12 H30 M-30 2 H18", C.green, 2, { op: 0.5 }) + T(0, 46, "RENEWAL " + (i + 1), { z: 13, f: C.green }));
          s += D("sg" + i, "M" + (x - 26) + " 162 q8 -14 16 0 t16 0 t16 -6", C.orange, 3);
        });
        s += M("ok", 155, 228, L(0, 0, "BOTH RENEWED", { z: 15, s: C.green }), { o0: 0 });
        s += M("cl", 320, 196, person(C.navy, 1.5) + T(0, 36, "CLIENT", { z: 13, f: C.navy }), { o0: 0 });
        s += M("why", 320, 120, speech(90, 40, C.navy) + T(0, 0, "WHY?", { z: 18, f: C.navy }), { o0: 0 });
        s += M("tag", 320, 106, R(-54, -24, 108, 48, C.amber, { rx: 8, s: C.orange, sw: 2.5 }) + O(-40, 0, 5, C.orange) + T(6, 1, "RATE \u22124%", { z: 15, f: C.orange }), { o0: 0 });
        s += M("same", 155, 268, T(0, 0, "SAME RENEWAL QUARTER", { z: 13, f: C.orange }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "c0", true, { e: "back" }); V(S, "c1", true, { del: 0.2, e: "back" });
        S("sg0", { d: 1, del: 0.5 }); S("sg1", { d: 1, del: 0.8 });
        V(S, "ok", b === 0, { del: 1.1 });
        V(S, "cl", b >= 1); V(S, "why", b === 1, { del: 0.3, e: "back" });
        V(S, "tag", b === 2, { y: b === 2 ? 0 : -60, e: "back" }); V(S, "same", b === 2, { del: 0.5 });
      }),
      /* 3. Lines 6-9. The client's balance holds two reasons; BPM's grab for all of it is stopped; ask the customers.
         Adapted from: 077 Workflow AI Animation (data advanced through stages)
         https://dribbble.com/shots/26275497-Workflow-AI-Animation  */
      BD(6, 9, "077", function () {
        var s = "";
        s += M("bal", 200, 120, P("M0 -40 V60", C.ink, 4) + R(-30, 60, 60, 10, C.ink, { rx: 3 }) + G(P("M-110 0 H110", C.ink, 4) +
          P("M-110 0 L-140 50 H-80 Z M110 0 L80 50 H140 Z", C.slate, 2, { f: "rgba(92,111,132,.12)" }) +
          L(-110, 38, "FASTER ARRIVAL", { z: 14, s: C.teal }) + L(110, 38, "LOWER PRICE", { z: 14, s: C.orange }), "translate(0 -36)") +
          O(0, -40, 6, C.ink));
        s += M("rn", 200, 250, L(0, 0, "DECISION: RENEW", { z: 15, s: C.green }), { o0: 0 });
        s += M("coin", 200, 150, coin(40, C.green, "180k", 18), { o0: 0 });
        s += M("hand", 80, 150, P("M-40 0 H10", C.teal, 8) + O(16, 0, 10, C.teal) + T(-30, -20, "BPM", { z: 14, f: C.teal }), { o0: 0 });
        s += M("stop", 140, 150, nob(14), { o0: 0 });
        s += M("evn", 200, 230, L(0, 0, "EVIDENCE NEEDED", { z: 15, s: C.red }), { o0: 0 });
        s += M("net", 0, 0, O(200, 210, 26, C.white, { s: C.green, sw: 3 }) + T(200, 211, "RENEW", { z: 11, f: C.green }) +
          arrowH(80, 100, 176, 196, C.teal, 3) + arrowH(200, 100, 200, 180, C.orange, 3) + arrowH(320, 100, 224, 196, C.slate, 3) +
          L(80, 84, "SERVICE", { z: 13, s: C.teal }) + L(200, 84, "PRICE", { z: 13, s: C.orange }) + L(320, 84, "OTHER?", { z: 13, s: C.slate }), { o0: 0 });
        s += M("ask", 0, 0, G(person(C.navy, 1.3), "translate(110 210)") + G(speech(110, 36, C.navy) + T(0, 0, "YOUR REASON?", { z: 12, f: C.navy }), "translate(140 140)") +
          G(person(C.slate, 1.3), "translate(290 210)") + G(speech(70, 36, C.slate) + T(0, 0, "\u2026", { z: 18, f: C.slate }), "translate(306 140)") +
          L(200, 268, "ASK, DON'T ASSUME", { z: 14, s: C.ink, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "bal", b === 0); V(S, "rn", b === 0, { del: 0.5 });
        V(S, "coin", b === 1, { e: "back" }); V(S, "hand", b === 1, { x: b === 1 ? 30 : 0, del: 0.4 });
        V(S, "stop", b === 1, { del: 0.9, e: "back" }); V(S, "evn", b === 1, { del: 1.1 });
        V(S, "net", b === 2); V(S, "ask", b === 3);
      }),
      /* 4. Lines 10-13. Revenue peels into costs and contribution; a cheaper rate keeps less value; finance waits for evidence.
         Adapted from: 127 Streamgraph transitions (stacked layers morph)
         https://observablehq.com/@d3/streamgraph-transitions  */
      BD(10, 13, "127", function () {
        var s = "";
        s += P("M30 250 H250", C.ink, 2.5);
        s += M("rev", 80, 250, R(-40, -170, 80, 170, C.green, { rx: 4 }) + T(0, -150, "RETAINED", { z: 12, f: C.white }) + T(0, -134, "REVENUE", { z: 12, f: C.white }), { c: "ob" });
        s += M("cost", 180, 250, R(-40, -100, 80, 100, C.slate, { rx: 4 }) + T(0, -50, "COSTS", { z: 13, f: C.white }), { c: "ob", o0: 0 });
        s += M("con", 180, 150, R(-40, -70, 80, 70, C.navy, { rx: 4 }) + T(0, -35, "CONTRIB.", { z: 12, f: C.white }), { c: "ob", o0: 0 });
        s += M("q", 180, 64, qb(13), { o0: 0 });
        s += M("eq", 312, 120, L(0, -20, "REVENUE", { z: 13, s: C.green }) + T(0, 4, "\u2212 COSTS", { z: 14, f: C.slate }) +
          L(0, 30, "CONTRIBUTION", { z: 13, s: C.navy }), { o0: 0 });
        s += M("rc", 312, 120, L(0, 0, "RETAINED \u2260 CONTRIBUTION", { z: 12, s: C.red }), { o0: 0 });
        s += M("tag", 312, 214, R(-54, -20, 108, 40, C.amber, { rx: 8, s: C.orange, sw: 2.5 }) + T(0, 1, "RATE \u22124%", { z: 15, f: C.orange }), { o0: 0 });
        s += M("fin", 312, 120, stamp("EVIDENCE BEFORE 180k", C.navy, 12), { o0: 0 });
        s += M("led", 312, 210, doc(60, 76, C.navy) + G(mag(14), "translate(20 10)"), { o0: 0 });
        return s;
      }, function (b, S) {
        var squeeze = b >= 2 ? 0.88 : 1;
        S("rev", { sy: squeeze });
        V(S, "rc", b === 0, { del: 0.3 }); V(S, "q", b === 0, { del: 0.6 });
        S("cost", { o: b >= 1 ? 1 : 0, sy: b >= 1 ? 1 : 0.02, del: 0.2 });
        S("con", { o: b >= 0 ? 1 : 0, sy: b >= 2 ? 0.66 : 1, del: 0.2 });
        S("q", { o: b === 0 ? 1 : 0, s: 1 });
        V(S, "eq", b === 1, { del: 0.4 });
        V(S, "tag", b === 2, { e: "back" });
        V(S, "fin", b === 3, { r: -5 }); V(S, "led", b === 3, { del: 0.3 });
        S("con", { o: 1, sy: b >= 2 ? 0.6 : 1, y: b >= 2 ? 0 : 0 });
      }),
      /* 5. Lines 14-16. A storm that may never break: the fine is a possible cost; no rain fell, yet nothing was banked.
         Adapted from: 098 Factory (industrial scene with an animated environmental signal)
         https://lottiefiles.com/free-animation/factory-4XJZcnPgAb  */
      BD(14, 16, "098", function () {
        var s = "";
        s += M("htl", 110, 222, hotel(C.navy, 1.9));
        s += M("cl", 200, 96, G(cloud("#7d8ea6", 1.5), "", "bob") + T(0, 6, "AED 85k", { z: 15, f: C.white }));
        s += M("pc", 320, 196, L(0, 0, "POSSIBLE COST", { z: 14, s: C.plum }), { o0: 0 });
        s += M("inc", 320, 236, L(0, 0, "NOT INCOME", { z: 13, s: C.slate }), { o0: 0 });
        s += M("bolt", 230, 140, P("M0 0 L-12 26 H2 L-10 52", C.gold, 4, { da: "5 4" }), { o0: 0 });
        s += M("enf", 320, 196, L(0, 0, "IF ENFORCED", { z: 14, s: C.plum }), { o0: 0 });
        s += M("ct", 320, 236, L(0, 0, "CONTINGENT", { z: 14, s: C.red }), { o0: 0 });
        s += M("umb", 110, 140, umbrella(C.plum), { o0: 0 });
        s += M("nf", 320, 186, L(0, 0, "NO FINE", { z: 15, s: C.green }), { o0: 0 });
        s += M("ns", 320, 230, L(0, 0, "85k SAVED?", { z: 15, s: C.red }) + P("M-48 0 H48", C.red, 3), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "pc", b === 0, { del: 0.3 }); V(S, "inc", b === 0, { del: 0.5 });
        V(S, "bolt", b === 1, { del: 0.2 }); V(S, "enf", b === 1, { del: 0.3 }); V(S, "ct", b === 1, { del: 0.5 });
        V(S, "umb", b === 2, { y: b === 2 ? 0 : -20 }); V(S, "nf", b === 2, { del: 0.3 }); V(S, "ns", b === 2, { del: 0.6 });
        S("cl", { o: b === 2 ? 0.55 : 1 });
      }),
      /* 6. Lines 17-19. Two checks, then a split world: with the process, and the ghost world without it.
         Adapted from: 134 Shape tweening (source shape transformed into a target)
         https://observablehq.com/@d3/shape-tweening  */
      BD(17, 19, "134", function () {
        var s = "";
        s += M("k1", 200, 110, R(-150, -26, 300, 52, C.white, { rx: 10, s: C.plum, sw: 2.5 }) + T(-130, 1, "PENALTY REALISTIC?", { z: 15, a: "start", f: C.plum }) +
          G(qb(12, C.plum), "translate(124 0)"), { o0: 0 });
        s += M("k2", 200, 180, R(-150, -26, 300, 52, C.white, { rx: 10, s: C.teal, sw: 2.5 }) + T(-130, 1, "EXPOSURE REDUCED?", { z: 15, a: "start", f: C.teal }) +
          G(qb(12, C.teal), "translate(124 0)"), { o0: 0 });
        s += M("wA", 104, 170, R(-90, -110, 180, 220, C.white, { rx: 12, s: C.navy, sw: 2.5 }) + T(0, -92, "WITH PROCESS", { z: 14, f: C.navy }) +
          G(hotel(C.navy, 1.6), "translate(0 10)") + G(cloud("#9aa7b6", 0.6), "translate(0 -54)") + T(0, 86, "WHAT HAPPENED", { z: 12, f: C.navy }), { o0: 0 });
        s += M("wB", 296, 170, R(-90, -110, 180, 220, "rgba(255,255,255,.4)", { rx: 12, s: C.slate, sw: 2.5, da: "6 5" }) + T(0, -92, "WITHOUT IT?", { z: 14, f: C.slate }) +
          G(hotel(C.slate, 1.6), "translate(0 10)", "", 0.45) + G(cloud("#6f8097", 0.6) + P("M-10 14 l-4 10 M0 14 l-4 10 M10 14 l-4 10", C.navy, 2, { da: "3 2" }), "translate(0 -54)", "", 0.6) +
          T(0, 86, "WHAT WOULD HAVE?", { z: 12, f: C.slate }), { o0: 0 });
        s += M("fog", 296, 170, R(-90, -110, 180, 220, "rgba(220,226,234,.75)", { rx: 12 }) + G(qb(22, C.slate)), { o0: 0 });
        s += M("ku", 296, 232, L(0, 0, "KEEP UNCERTAINTY", { z: 13, s: C.orange }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "k1", b === 0); V(S, "k2", b === 0, { del: 0.3 });
        V(S, "wA", b >= 1, { x: b >= 1 ? 0 : 40 }); V(S, "wB", b >= 1, { x: b >= 1 ? 0 : -40, del: 0.2 });
        V(S, "fog", b === 2, { del: 0.2 }); V(S, "ku", b === 2, { del: 0.6 });
      }),
      /* 7. Lines 20-21. Two branches of evidence; real value is not the same as value realised at the reported amount.
         Adapted from: 089 Git Workflow 1 (branch, merge and reconnect)
         https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5  */
      BD(20, 21, "089", function () {
        var s = "";
        s += M("r", 60, 100, R(-44, -22, 88, 44, C.white, { rx: 8, s: C.green, sw: 2.5 }) + T(0, 1, "RENEWALS", { z: 13, f: C.green }));
        s += M("p", 60, 200, R(-44, -22, 88, 44, C.white, { rx: 8, s: C.plum, sw: 2.5 }) + T(0, 1, "PENALTY", { z: 13, f: C.plum }));
        s += D("br1", "M104 100 C160 100 170 100 220 100", C.green, 4);
        s += D("br2", "M104 200 C160 200 170 200 220 200", C.plum, 4);
        s += M("e1", 296, 100, L(0, 0, "ATTRIBUTION EVIDENCE", { z: 13, s: C.green }), { o0: 0 });
        s += M("e2", 296, 200, L(0, 0, "EXPOSURE EVIDENCE", { z: 13, s: C.plum }), { o0: 0 });
        s += M("lv", 0, 0, R(178, 76, 196, 50, C.pale, { rx: 8, s: C.green, sw: 2 }) + T(276, 92, "GENUINE VALUE", { z: 13, f: C.green }) +
          T(276, 112, "POSSIBLE", { z: 12, f: C.green }) +
          R(178, 176, 196, 50, C.amber, { rx: 8, s: C.orange, sw: 2 }) + T(276, 192, "REALISED AT 180k / 85k", { z: 12, f: C.orange }) +
          T(276, 212, "NOT SHOWN YET", { z: 12, f: C.orange }), { o0: 0 });
        s += M("nr", 200, 264, L(0, 0, "VALUE, NOT YET REALISED", { z: 14, s: C.ink, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("br1", { d: 1 }); S("br2", { d: 1, del: 0.2 });
        V(S, "e1", b === 0, { del: 0.5 }); V(S, "e2", b === 0, { del: 0.7 });
        V(S, "lv", b === 1); V(S, "nr", b === 1, { del: 0.4 });
      }),
      /* 8. Lines 22-23. Two trays kept apart; each claim keeps its amount with its assumptions, evidence and doubts.
         Adapted from: 087 Workflow by Muammar Faiq (workflow glyph cycling through stages)
         https://lottiefiles.com/free-animation/workflow-Jt52qpU9fj  */
      BD(22, 23, "087", function () {
        var s = "";
        s += M("tA", 104, 150, R(-84, -70, 168, 140, C.pale, { rx: 12, s: C.green, sw: 3 }) + T(0, -50, "RETAINED", { z: 14, f: C.green }) +
          T(0, -12, "AED 180k", { z: 22, f: C.green }));
        s += M("tB", 296, 150, R(-84, -70, 168, 140, C.lilac, { rx: 12, s: C.plum, sw: 3 }) + T(0, -50, "PENALTY", { z: 14, f: C.plum }) +
          T(0, -12, "AED 85k", { z: 22, f: C.plum }));
        s += M("wall", 200, 150, R(-4, -80, 8, 160, C.ink, { rx: 3 }), { o0: 0 });
        s += M("merge", 200, 250, L(0, 0, "NOT ONE SAVINGS FIGURE", { z: 14, s: C.red }), { o0: 0 });
        s += M("tagsA", 104, 186, L(0, 0, "ASSUMPTIONS", { z: 11, s: C.navy }) + L(0, 24, "EVIDENCE", { z: 11, s: C.green }) + L(0, 48, "UNCERTAINTY", { z: 11, s: C.orange }), { o0: 0 });
        s += M("tagsB", 296, 186, L(0, 0, "ASSUMPTIONS", { z: 11, s: C.navy }) + L(0, 24, "EVIDENCE", { z: 11, s: C.green }) + L(0, 48, "UNCERTAINTY", { z: 11, s: C.orange }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "wall", b === 0, { sy: b === 0 ? 1 : 0.1 }); V(S, "merge", b === 0, { del: 0.4 });
        S("tA", { x: b === 0 ? -6 : 0 }); S("tB", { x: b === 0 ? 6 : 0 });
        V(S, "tagsA", b === 1, { del: 0.2 }); V(S, "tagsB", b === 1, { del: 0.4 });
      }),
      /* 9. Lines 24-25. The needle settles between "zero" and "beyond evidence"; three rungs of recognition.
         Adapted from: 129 Arc tween (arc gauge rotates to a new value)
         https://observablehq.com/@d3/arc-tween  */
      BD(24, 25, "129", function () {
        var s = "";
        s += M("dial", 200, 200, P("M-120 0 A120 120 0 0 1 -60 -104", C.red, 24) + P("M-60 -104 A120 120 0 0 1 60 -104", C.green, 24) +
          P("M60 -104 A120 120 0 0 1 120 0", C.red, 24) + T(-138, 22, "ZERO VALUE", { z: 13, a: "start", f: C.red }) +
          T(138, 22, "BEYOND EVIDENCE", { z: 13, a: "end", f: C.red }) + T(0, -150, "SUPPORTED", { z: 14, f: C.green }));
        s += M("ndl", 200, 200, P("M0 0 L-100 0", C.ink, 6) + O(0, 0, 10, C.ink));
        s += M("lad", 0, 0, [["HAPPENED", C.navy, 260], ["CONTRIBUTED", C.teal, 190], ["RECOGNISED", C.green, 120]].map(function (r, i) {
          return R(110, r[2] - 22, 180, 44, C.white, { rx: 10, s: r[1], sw: 3 }) + T(200, r[2] + 1, r[0], { z: 15, f: r[1] });
        }).join("") + arrowH(300, 250, 300, 140, C.ink, 3) + T(316, 196, "FINANCE", { z: 12, a: "start", f: C.ink }) + T(316, 212, "DECIDES", { z: 12, a: "start", f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("dial", { o: b === 0 ? 1 : 0 });
        S("ndl", { r: 90, dur: 1.6, o: b === 0 ? 1 : 0 });
        V(S, "lad", b === 1);
      })
    ]
  });
  /* ==================================================================
     W13O2e  SIX HUNDRED AND TWENTY, OR FIVE HUNDRED AND FIVE  (28 lines)
     Rebuilt (audit 4.9/10: 17 WEAK, 5 MISMATCH). Ten boards: the
     decision, the timing claim, the three components tested, the
     refusal of false precision, and the honest committee report.
     ================================================================== */
  scene("W13O2e", {
    label: "Six hundred and twenty, or five hundred and five",
    accent: C.green,
    bgc: "#eef3ef",
    bg: function () { return backdrop("#e6efe9", "#f6f2ea", 274, "#e5dfcf"); },
    tags: ["The decision point", "620 promised, 505 tracked", "Not the larger figure", "Nor the smaller one",
      "\u201C7 of 14 recent\u201D", "Still maturing?", "Timing can't prove all", "Finance: reconcile",
      "Both are legitimate", "Open the total", "Labour: AED 240k", "11 assumed, 4 actual",
      "Payroll, not ratios", "Capacity \u2260 salary saving", "Retained: AED 180k", "Rates fell 4%",
      "Not all from BPM", "Revenue \u2260 contribution", "Penalty: AED 85k", "Risk \u2260 money saved",
      "No precise deductions", "No arbitrary percentages", "Promise, tracked, verified", "Explain what remains",
      "Not a rejection", "Who closes each gap?", "Show both figures", "Accountable evidence"],
    boards: [
      /* 1. Lines 0-3. The decision table: neither the larger nor the smaller figure wins by default.
         Adapted from: 079 Product Workflow Animation & UI Motion Design (interface states shift)
         https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design  */
      BD(0, 3, "079", function () {
        var s = "";
        s += R(40, 236, 320, 14, C.ink, { rx: 4 }) + R(60, 250, 12, 30, C.ink) + R(328, 250, 12, 30, C.ink);
        s += M("gav", 200, 196, gavel(C.navy), { o0: 0 });
        s += M("dp", 200, 92, L(0, 0, "DECISION POINT", { z: 18, s: C.navy }), { o0: 0 });
        s += M("cA", 110, 150, R(-76, -66, 152, 132, C.white, { rx: 12, s: C.navy, sw: 3 }) + T(0, -28, "620k", { z: 34, f: C.navy }) +
          T(0, 10, "PROMISED", { z: 15, f: C.navy }) + T(0, 32, "BUSINESS CASE", { z: 11, f: C.slate }), { o0: 0 });
        s += M("cB", 290, 150, R(-76, -66, 152, 132, C.white, { rx: 12, s: C.green, sw: 3 }) + T(0, -28, "505k", { z: 34, f: C.green }) +
          T(0, 10, "TRACKED", { z: 15, f: C.green }) + T(0, 32, "PROGRAMME REPORT", { z: 11, f: C.slate }), { o0: 0 });
        s += M("pick", 110, 64, L(0, 0, "PICK THE LARGER", { z: 13, s: C.red }) + P("M-60 0 H60", C.red, 3), { o0: 0 });
        s += M("ver", 290, 226, stamp("VERIFIED", C.red, 18) + P("M-56 -2 H56", C.red, 4), { o0: 0 });
        s += M("tnv", 290, 64, L(0, 0, "TRACKED \u2260 VERIFIED", { z: 13, s: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "gav", b === 0, { r: b === 0 ? 0 : 0, e: "back" }); V(S, "dp", b === 0, { del: 0.3 });
        V(S, "cA", b >= 1, { s: b === 2 ? 1.05 : 1 }); V(S, "cB", b >= 1, { del: 0.2, s: b === 3 ? 1.05 : 1 });
        V(S, "pick", b === 2, { del: 0.3 }); V(S, "ver", b === 3, { r: -8, del: 0.3 }); V(S, "tnv", b === 3, { del: 0.6 });
        S("cA", { o: b >= 1 ? (b === 3 ? 0.5 : 1) : 0 });
      }),
      /* 2. Lines 4-6. Seven recent properties with unfinished measurement bars; timing covers part, not all, of the gap.
         Adapted from: 136 Project TimeLine (progress along time markers)
         https://motionarray.com/after-effects-templates/project-timeline-2424919/  */
      BD(4, 6, "136", function () {
        var s = "";
        for (var i = 0; i < 14; i++) {
          var col = i % 7, row = Math.floor(i / 7), x = 44 + col * 52, y = 82 + row * 70, rec = i >= 7;
          s += M("h" + i, x, y, hotel(rec ? C.orange : C.navy, 0.62), { o0: 0 });
          s += R(x - 20, y + 20, 40, 8, C.mist, { rx: 4 });
          s += M("p" + i, x - 20, y + 24, R(0, -4, 40, 8, rec ? C.orange : C.green, { rx: 4 }), { c: "ol", o0: 0 });
        }
        s += M("lab", 200, 232, L(0, 0, "7 OF 14 LIVE UNDER 4 MONTHS", { z: 14, s: C.orange }), { o0: 0 });
        s += M("mp", 200, 232, L(0, 0, "MEASUREMENT NOT COMPLETE", { z: 14, s: C.orange }), { o0: 0 });
        s += M("gap", 200, 232, R(-150, -22, 300, 44, C.rose, { rx: 8, s: C.red, sw: 2.5 }) + R(-150, -22, 110, 44, "rgba(217,152,43,.35)", { rx: 8 }) +
          T(-95, 1, "TIMING?", { z: 13, f: C.ink }) + T(55, 1, "REST UNEXPLAINED", { z: 13, f: C.red }), { o0: 0 });
        s += M("gl", 200, 274, T(0, 0, "THE 115k GAP", { z: 12, f: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 14; i++) {
          V(S, "h" + i, true, { del: i * 0.05, e: "back" });
          S("p" + i, { o: 1, sx: i >= 7 ? (b >= 1 ? 0.3 + (i % 3) * 0.12 : 0.02) : 1, del: 0.6 + i * 0.03 });
        }
        V(S, "lab", b === 0, { del: 0.8 }); V(S, "mp", b === 1, { del: 0.4 });
        V(S, "gap", b === 2); V(S, "gl", b === 2, { del: 0.3 });
      }),
      /* 3. Lines 7-9. Finance reconciles; both directors are right to ask; the 505 total opens into its parts.
         Adapted from: 126 Stacked-to-grouped bars (stacked bars regroup while keeping identity)
         https://observablehq.com/@d3/stacked-to-grouped-bars  */
      BD(7, 9, "126", function () {
        var s = "", base = 256, k = 160 / 505;
        s += M("fd", 60, 232, person(C.orange, 1.5) + T(0, 36, "FINANCE", { z: 13, f: C.orange }), { o0: 0 });
        s += M("led", 200, 140, R(-80, -78, 160, 156, C.white, { rx: 10, s: C.navy, sw: 2.5 }) + T(0, -60, "RECONCILE", { z: 14, f: C.navy }) +
          [0, 1, 2].map(function (i) { return R(-64, -40 + i * 34, 128, 24, C.sky, { rx: 4 }) + G(qb(8), "translate(52 " + (-28 + i * 34) + ")"); }).join(""), { o0: 0 });
        s += M("dA", 70, 232, person(C.navy, 1.4) + G(okb(10), "translate(18 -40)"), { o0: 0 });
        s += M("dB", 330, 232, person(C.orange, 1.4) + G(okb(10), "translate(18 -40)"), { o0: 0 });
        s += M("leg", 200, 70, L(0, 0, "BOTH LEGITIMATE", { z: 15, s: C.green }), { o0: 0 });
        s += M("amt", 200, 170, R(-70, -40, 140, 80, "none", { rx: 10, s: C.slate, sw: 2.5, da: "6 4" }) + T(0, -14, "AMOUNT", { z: 13, f: C.slate }) +
          T(0, 12, "?", { z: 26, f: C.slate }), { o0: 0 });
        var PT = [[240, C.navy, "LABOUR"], [180, C.green, "RETAINED"], [85, C.plum, "PENALTY"]], acc = 0;
        PT.forEach(function (p, i) {
          s += M("s" + i, 200, base - acc * k, R(-40, -p[0] * k, 80, p[0] * k, p[1], { s: C.white, sw: 2 }) + T(0, -p[0] * k / 2, String(p[0]), { z: 15, f: C.white }), { c: "ob", o0: 0 });
          s += M("l" + i, 200, base - acc * k, T(0, 14, p[2], { z: 12, f: p[1] }), { o0: 0 });
          acc += p[0];
        });
        return s;
      }, function (b, S) {
        V(S, "fd", b === 0); V(S, "led", b === 0, { del: 0.2 });
        V(S, "dA", b === 1); V(S, "dB", b === 1, { del: 0.2 }); V(S, "leg", b === 1, { del: 0.4 }); V(S, "amt", b === 1, { del: 0.6 });
        var acc = [0, 240, 420], GX = [-120, 0, 120];
        for (var i = 0; i < 3; i++) {
          S("s" + i, { o: b === 2 ? 1 : 0, x: b === 2 ? GX[i] : 0, y: b === 2 ? acc[i] * 160 / 505 : 0, del: 0.6, dur: 1.1 });
          V(S, "l" + i, b === 2, { x: GX[i], y: acc[i] * 160 / 505, del: 1.2 });
        }
      }),
      /* 4. Lines 10-13. The labour component: eleven assumed, four observed, payroll evidence, capacity is not salary.
         Adapted from: 116 Infographics by Ruslan Klimovich (sequenced statistic graphics)
         https://motionarray.com/after-effects-templates/infographics-3844461/  */
      BD(10, 13, "116", function () {
        var s = "";
        s += M("bar", 70, 250, R(-34, -150, 68, 150, C.navy, { rx: 4 }) + T(0, -75, "240k", { z: 17, f: C.white }) + T(0, 16, "LABOUR", { z: 13, f: C.navy }), { c: "ob" });
        for (var i = 0; i < 11; i++) {
          var x = 160 + (i % 6) * 38, y = i < 6 ? 106 : 160;
          s += M("p" + i, x, y, person(C.orange, 0.9), { o0: 0 });
        }
        s += M("as", 260, 64, L(0, 0, "11 FEWER ASSUMED", { z: 14, s: C.orange }), { o0: 0 });
        s += M("ac", 260, 216, L(0, 0, "4 ACTUALLY FEWER", { z: 14, s: C.green }), { o0: 0 });
        s += M("pay", 200, 156, doc(70, 90, C.navy) + T(0, 62, "PAYROLL", { z: 13, f: C.navy }) + G(okb(12), "translate(30 -40)"), { o0: 0 });
        s += M("rat", 320, 156, R(-48, -44, 96, 88, C.white, { rx: 8, s: C.slate, sw: 2 }) + T(0, -6, "4 \u00F7 11", { z: 18, f: C.slate }) +
          T(0, 62, "RATIO", { z: 13, f: C.slate }) + G(nob(12), "translate(40 -40)"), { o0: 0 });
        s += M("cs", 0, 0, G(clock(36, C.teal), "translate(210 150)") + T(270, 150, "\u2260", { z: 36, f: C.red }) + G(coin(36, C.gold, "AED", 16), "translate(330 150)") +
          T(210, 204, "CAPACITY", { z: 13, f: C.teal }) + T(330, 204, "SALARY SAVED", { z: 13, f: C.gold }), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 11; i++) {
          var gone = b === 1 && i < 4;
          V(S, "p" + i, b <= 1, { del: i * 0.05, o: b <= 1 ? (b === 1 && i >= 4 ? 0.2 : 1) : 0 });
        }
        V(S, "as", b === 0, { del: 0.4 }); V(S, "ac", b === 1, { del: 0.4 });
        V(S, "pay", b === 2); V(S, "rat", b === 2, { del: 0.3 });
        V(S, "cs", b === 3);
      }),
      /* 5. Lines 14-17. The retention component: two renewals, a 4% cut, an unknown BPM share, revenue less costs.
         Adapted from: 128 Pie chart update (sector angles tween)
         https://observablehq.com/@d3/pie-chart-update  */
      BD(14, 17, "128", function () {
        var s = "";
        s += M("cts", 100, 150, G(contract(C.green), "translate(-24 0) rotate(-6) scale(1.3)") + G(contract(C.green), "translate(24 0) rotate(6) scale(1.3)") +
          T(0, 64, "AED 180k", { z: 18, f: C.green }) + T(0, 84, "TWO RENEWALS", { z: 12, f: C.green }));
        s += M("tag", 290, 90, R(-60, -22, 120, 44, C.amber, { rx: 8, s: C.orange, sw: 2.5 }) + T(0, 1, "RATES \u22124%", { z: 16, f: C.orange }), { o0: 0 });
        s += M("pie", 290, 176, O(0, 0, 54, C.orange, { op: 0.75 }) + P("M0 0 L0 -54 A54 54 0 0 1 51.4 16.7 Z", "none", 0, { f: C.teal }) +
          P("M0 0 L51.4 16.7", C.white, 3, { da: "4 3" }) + O(0, 0, 22, C.white), { o0: 0 });
        s += M("pl", 290, 176, T(0, 1, "BPM?", { z: 12, f: C.teal }), { o0: 0 });
        s += M("rc", 290, 176, R(-70, -60, 140, 120, C.white, { rx: 10, s: C.navy, sw: 2.5 }) + T(0, -38, "REVENUE", { z: 13, f: C.green }) +
          T(0, -14, "\u2212 COSTS", { z: 13, f: C.slate }) + P("M-50 2 H50", C.ink, 2) + T(0, 22, "CONTRIBUTION", { z: 13, f: C.navy }) + G(qb(10), "translate(0 44)"), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "tag", b >= 1, { y: b >= 1 ? 0 : -20 });
        V(S, "pie", b === 2, { r: b === 2 ? 0 : -90 }); V(S, "pl", b === 2, { del: 0.4 });
        V(S, "rc", b === 3);
        S("tag", { o: b === 1 || b === 2 ? 1 : 0, s: 1 });
      }),
      /* 6. Lines 18-19. The penalty component: a contingent exposure; lower risk is not expenditure avoided.
         Adapted from: 093 Process-Para (circular wait animation)
         https://lottiefiles.com/free-animation/process-para-qujCEQ2AKT  */
      BD(18, 19, "093", function () {
        var s = "";
        s += M("ring", 200, 140, G(O(0, 0, 76, "none", { s: C.plum, sw: 6, da: "28 14" }), "", "spin") + G(cloud("#7d8ea6", 1.2), "translate(0 -10)") +
          T(0, -4, "AED 85k", { z: 15, f: C.white }) + T(0, 40, "IF ENFORCED", { z: 13, f: C.plum }));
        s += M("ct", 200, 248, L(0, 0, "CONTINGENT EXPOSURE", { z: 15, s: C.plum }), { o0: 0 });
        s += M("rk", 100, 150, shield(2.4, C.plum, C.lilac) + G(P("M-12 10 V-10 M-6 10 V-2 M0 10 V-16", C.plum, 4), "translate(0 0)") +
          T(0, 72, "RISK LOWER", { z: 14, f: C.plum }), { o0: 0 });
        s += M("ne", 200, 150, T(0, 0, "\u2260", { z: 44, f: C.red }), { o0: 0 });
        s += M("ex", 300, 150, R(-54, -50, 108, 100, C.white, { rx: 8, s: C.navy, sw: 2.5 }) + T(0, -26, "SPEND", { z: 13, f: C.navy }) +
          T(0, -8, "AVOIDED", { z: 13, f: C.navy }) + G(qb(14), "translate(0 22)") + T(0, 72, "NOT SHOWN", { z: 14, f: C.navy }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("ring", { o: b === 0 ? 1 : 0, s: b === 0 ? 1 : 0.6 });
        V(S, "ct", b === 0, { del: 0.3 });
        V(S, "rk", b === 1); V(S, "ne", b === 1, { del: 0.3, e: "back" }); V(S, "ex", b === 1, { del: 0.2 });
      }),
      /* 7. Lines 20-21. Empty deduction slots stay empty without evidence; an arbitrary percentage is refused.
         Adapted from: 119 Infographics V2 by Typoland (scale and numeric tweens)
         https://motionarray.com/after-effects-templates/infographics-v2-556482/  */
      BD(20, 21, "119", function () {
        var s = "", PT = [["LABOUR 240", C.navy], ["RETAINED 180", C.green], ["PENALTY 85", C.plum]];
        PT.forEach(function (p, i) {
          var y = 92 + i * 56;
          s += M("r" + i, 0, 0, R(30, y - 20, 200, 40, C.white, { rx: 8, s: p[1], sw: 2.5 }) + T(130, y + 1, p[0], { z: 15, f: p[1] }) +
            R(250, y - 20, 120, 40, "none", { rx: 8, s: C.slate, sw: 2, da: "5 4" }) + T(310, y + 1, "\u2212 ?", { z: 16, f: C.slate }));
        });
        s += M("nd", 200, 262, L(0, 0, "NO EVIDENCE, NO DEDUCTION", { z: 14, s: C.ink, f: C.ink }), { o0: 0 });
        s += M("sl", 200, 140, R(-150, -40, 300, 80, C.white, { rx: 12, s: C.red, sw: 3 }) + R(-120, 4, 240, 8, C.mist, { rx: 4 }) +
          T(-130, -16, "CUT ALL BY", { z: 14, a: "start", f: C.ink }), { o0: 0 });
        s += M("kn", 128, 148, O(0, 0, 11, C.red), { o0: 0 });
        s += M("pc", 260, 124, T(0, 0, "30%?", { z: 22, f: C.red }), { o0: 0 });
        s += M("x", 200, 140, P("M-140 -36 L140 36", C.red, 5), { o0: 0 });
        s += M("fp", 200, 222, L(0, 0, "FALSE PRECISION", { z: 16, s: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 3; i++) S("r" + i, { o: b === 0 ? 1 : 0.15 });
        V(S, "nd", b === 0, { del: 0.4 });
        V(S, "sl", b === 1); V(S, "kn", b === 1, { x: b === 1 ? 72 : 0, dur: 1.2, del: 0.2 }); V(S, "pc", b === 1, { del: 0.6 });
        V(S, "x", b === 1, { del: 1.2 }); V(S, "fp", b === 1, { del: 1.4 });
      }),
      /* 8. Lines 22-23. Three columns kept apart: promised, tracked, verified; the remainder keeps its explanation.
         Adapted from: 113 Infographic Chart Creator (columns grow, axis and labels update)
         https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/  */
      BD(22, 23, "113", function () {
        var s = "", base = 222, k = 140 / 620;
        s += P("M30 " + base + " H370", C.ink, 2.5);
        s += M("c1", 80, base, R(-36, -140, 72, 140, C.navy, { rx: 4 }) + T(0, -126, "620", { z: 16, f: C.white }) + T(0, 16, "PROMISED", { z: 13, f: C.navy }), { c: "ob", o0: 0 });
        s += M("c2", 200, base, R(-36, -505 * k, 72, 505 * k, C.green, { rx: 4 }) + T(0, -505 * k + 14, "505", { z: 16, f: C.white }) + T(0, 16, "TRACKED", { z: 13, f: C.green }), { c: "ob", o0: 0 });
        s += M("c3", 320, base, R(-36, -140, 72, 140, "rgba(92,111,132,.08)", { rx: 4, s: C.slate, sw: 2.5, da: "6 4" }) + G(keyI(1, C.slate), "translate(0 -70)") +
          T(0, 16, "VERIFIED", { z: 13, f: C.slate }) + T(0, -100, "PENDING", { z: 13, f: C.slate }), { o0: 0 });
        s += M("rem", 0, 0, L(200, 66, "REMAINING DIFFERENCE", { z: 14, s: C.red }) + L(80, 270, "TIMING", { z: 13, s: C.navy }) +
          L(200, 270, "ACTION", { z: 13, s: C.teal }) + L(320, 270, "UNRESOLVED", { z: 13, s: C.plum }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("c1", { o: 1, sy: 1 }); S("c2", { o: 1, sy: 1, del: 0.2 }); V(S, "c3", true, { del: 0.4 });
        V(S, "rem", b === 1, { del: 0.2 });
      }),
      /* 9. Lines 24-25. Not a rejection: progress is kept; each open question gets a named resolver.
         Adapted from: 109 teamwork (people appear and form a team)
         https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6  */
      BD(24, 25, "109", function () {
        var s = "";
        s += M("prog", 200, 140, R(-120, -70, 240, 140, C.pale, { rx: 14, s: C.green, sw: 3 }) + G(G(gear(22, C.green), "", "spin"), "translate(-60 0)") +
          T(30, -12, "PROGRAMME", { z: 15, f: C.green }) + T(30, 12, "IMPROVEMENTS", { z: 15, f: C.green }) + G(okb(16), "translate(100 -56)"), { o0: 0 });
        s += M("nr", 200, 248, L(0, 0, "NOT A REJECTION", { z: 16, s: C.green }), { o0: 0 });
        var RW = [["ACHIEVED", C.green, okb(10)], ["UNCERTAIN", C.orange, qb(10)], ["WHO RESOLVES", C.navy, person(C.navy, 0.6)]];
        RW.forEach(function (r, i) {
          s += M("row" + i, 200, 96 + i * 62, R(-150, -24, 300, 48, C.white, { rx: 10, s: r[1], sw: 2.5 }) + G(r[2], "translate(-122 0)") +
            T(-98, 1, r[0], { z: 15, a: "start", f: r[1] }) + (i === 2 ? G(person(C.green, 0.6), "translate(80 4)") + G(person(C.plum, 0.6), "translate(106 4)") +
            G(person(C.orange, 0.6), "translate(132 4)") : ""), { o0: 0 });
        });
        return s;
      }, function (b, S) {
        V(S, "prog", b === 0); V(S, "nr", b === 0, { del: 0.4 });
        for (var i = 0; i < 3; i++) V(S, "row" + i, b === 1, { del: i * 0.25 });
      }),
      /* 10. Lines 26-27. The committee report keeps both figures with qualifications, sealed by accountable evidence.
         Adapted from: 122 Dashboard by Weblodge (UI introduced, outcome emphasised)
         https://lottiefiles.com/free-animation/deliver-better-optimized-lottie-json-animation-Qgvgddnv8J  */
      BD(26, 27, "122", function () {
        var s = "";
        s += M("rep", 140, 156, R(-110, -116, 220, 232, C.white, { rx: 10, s: C.ink, sw: 2.5 }) + T(0, -94, "COMMITTEE REPORT", { z: 13, f: C.ink }) +
          T(-90, -60, "PROMISED", { z: 13, a: "start", f: C.navy }) + T(90, -60, "620k", { z: 15, a: "end", f: C.navy }) +
          T(-90, -32, "TRACKED", { z: 13, a: "start", f: C.green }) + T(90, -32, "505k", { z: 15, a: "end", f: C.green }) +
          T(-90, -4, "VERIFIED", { z: 13, a: "start", f: C.slate }) + T(90, -4, "PENDING", { z: 13, a: "end", f: C.slate }) +
          P("M-90 16 H90", C.mist, 2) + T(-90, 38, "QUALIFIED:", { z: 12, a: "start", f: C.orange }) +
          T(-90, 58, "TIMING, ACTION,", { z: 12, a: "start", f: C.ink }) + T(-90, 76, "ATTRIBUTION", { z: 12, a: "start", f: C.ink }));
        s += M("bA", 310, 100, speech(120, 34, C.navy) + T(0, 0, "IT'S 620!", { z: 14, f: C.navy }), { o0: 0 });
        s += M("bB", 310, 160, speech(120, 34, C.orange) + T(0, 0, "ONLY 505!", { z: 14, f: C.orange }), { o0: 0 });
        s += M("seal", 310, 150, O(0, 0, 52, C.green) + O(0, 0, 44, "none", { s: C.white, sw: 2, da: "4 3" }) + tick(1.4, C.white, 5), { o0: 0 });
        s += M("ae", 310, 228, L(0, 0, "ACCOUNTABLE EVIDENCE", { z: 13, s: C.green }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "bA", b === 0, { del: 0.3 }); V(S, "bB", b === 0, { del: 0.5 });
        V(S, "seal", b === 1, { r: b === 1 ? 0 : -60, e: "back" }); V(S, "ae", b === 1, { del: 0.4 });
      })
    ]
  });
  installCSS("w13-claude-v2-part3");
})();
// END FILE: w13-claude-v2-part3.js

// FILE: w13-claude-v2-part4.js
// OPER621 - Week 13 - The Realize Value Phase - animated teaching scenes, round 2 (full rebuild).
// Part 4 of 4. Sections: W13O3a W13O3b W13O3c. Standalone; load parts in any order.
// Contract: window.VL_SCENES[secId] = { build(el), step(i, n), reset() }.
// Styles: appended to one <style id="vl-sc-w13">, every rule scoped under .vls-w13-<secId>.
// Every board names the benchmark template it adapts, with its URL, in a comment.
(function () {
  "use strict";
  /* ------------------------------------------------------------------
     ENGINE (v2, written from scratch for Week 13 round 2).
     A section is a sequence of BOARDS. Each board is one complete visual
     that owns 2 to 5 consecutive narration lines; inside a board every
     line has its own deterministic state (view(b, S)), so the player can
     seek forwards or backwards to any moment. Entering a board snaps its
     actors to their drawn defaults, then animates them in.
     Motion: window.gsap when present, otherwise a small rAF tweener.
     prefers-reduced-motion: every state is applied instantly.
     Layout: 400 x 300 design canvas, scaled with "meet"; the outer
     viewBox widens or deepens (max 1.35x / 1.45x) to the host aspect
     and each scene paints a full-bleed background, so phone (figure
     above text) and laptop (figure in the left 60%) are both filled.
     ------------------------------------------------------------------ */
  var W = window;
  W.VL_SCENES = W.VL_SCENES || {};
  var VLS = W.VL_SCENES;
  var CW = 400, CH = 300;
  var C = {
    navy: "#1f4e79", ink: "#16263a", orange: "#c0502a", paper: "#fbf8f1",
    blue: "#dbe7f2", green: "#2f7d5f", gold: "#d9982b", plum: "#6b4f96",
    teal: "#2a8a8f", red: "#b23a3a", slate: "#5c6f84", sand: "#efe4cf",
    mist: "#c7d5e3", white: "#ffffff", pale: "#e3f1e8", rose: "#f6e1da",
    lilac: "#ece6f5", sky: "#e6f0f8", amber: "#fbecd0"
  };
  var CSS = [];
  var PFX = "";

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function at(o) {
    var r = [];
    for (var k in o) if (o[k] !== undefined && o[k] !== null && o[k] !== false) r.push(k + '="' + esc(o[k]) + '"');
    return r.join(" ");
  }
  function el(n, o, inner) {
    return inner === undefined ? "<" + n + " " + at(o || {}) + "/>" : "<" + n + " " + at(o || {}) + ">" + inner + "</" + n + ">";
  }
  /* ---------- primitive shapes ---------- */
  function R(x, y, w, h, f, o) {
    o = o || {};
    return el("rect", { x: x, y: y, width: w, height: h, rx: o.rx, fill: f, stroke: o.s, "stroke-width": o.sw,
      opacity: o.op, "stroke-dasharray": o.da, "class": o.c, "data-k": o.k ? PFX + o.k : undefined });
  }
  function O(cx, cy, r, f, o) {
    o = o || {};
    return el("circle", { cx: cx, cy: cy, r: r, fill: f, stroke: o.s, "stroke-width": o.sw, opacity: o.op,
      "stroke-dasharray": o.da, "class": o.c, "data-k": o.k ? PFX + o.k : undefined });
  }
  function E(cx, cy, rx, ry, f, o) {
    o = o || {};
    return el("ellipse", { cx: cx, cy: cy, rx: rx, ry: ry, fill: f, stroke: o.s, "stroke-width": o.sw, opacity: o.op, "class": o.c });
  }
  function P(d, s, sw, o) {
    o = o || {};
    return el("path", { d: d, fill: o.f || "none", stroke: s || "none", "stroke-width": sw, "stroke-linecap": "round",
      "stroke-linejoin": "round", opacity: o.op, "stroke-dasharray": o.da, "class": o.c,
      "data-k": o.k ? PFX + o.k : undefined });
  }
  /* Text. o.z size (16), o.w weight (800), o.f fill, o.a anchor, o.k key,
     o.num = {v:start, pre:"", suf:""} makes it a tweenable counter. */
  function T(x, y, s, o) {
    o = o || {};
    var a = { x: x, y: y, "font-size": o.z || 16, "font-weight": o.w || 800, fill: o.f || C.ink,
      "text-anchor": o.a || "middle", "dominant-baseline": "central", opacity: o.op, "class": o.c,
      "letter-spacing": o.ls, "data-k": o.k ? PFX + o.k : undefined };
    if (o.num) { a["data-n"] = o.num.v || 0; a["data-pre"] = o.num.pre || ""; a["data-suf"] = o.num.suf || ""; }
    return el("text", a, esc(s));
  }
  /* Group. A CSS ambient class never shares an element with a transform
     attribute (the animation would replace it), so both are nested. */
  function G(inner, t, c, op) {
    if (t && c) return el("g", { transform: t, opacity: op }, el("g", { "class": c }, inner));
    return el("g", { transform: t, "class": c, opacity: op }, inner);
  }
  /* Animated actor placed at (x, y); its own transform is engine-owned.
     o.o0 initial opacity, o.c extra class: "ob" (grow from bottom), "ol" (grow from left). */
  function M(k, x, y, inner, o) {
    o = o || {};
    return '<g transform="translate(' + x + " " + y + ')"><g class="mv ' + (o.c || "") + '" data-k="' + PFX + k + '"' +
      (o.o0 !== undefined ? ' data-o="' + o.o0 + '"' : "") + ">" + inner + "</g></g>";
  }
  /* Self-drawing stroke (property d: 0..1). */
  function D(k, d, s, sw, o) {
    o = o || {};
    return el("path", { d: d, fill: "none", stroke: s, "stroke-width": sw, "stroke-linecap": "round", "stroke-linejoin": "round",
      "class": "mv dr " + (o.c || ""), "data-k": PFX + k, pathLength: 100, "data-d": o.d0 || 0,
      "data-o": o.o0, "stroke-dasharray": "100 100", opacity: o.op });
  }
  /* Width estimate for a bold label; the browser re-measures every pill after build. */
  function tw(s, z) {
    var w = 0, str = String(s);
    for (var i = 0; i < str.length; i++) {
      var c = str[i];
      w += /[MW]/.test(c) ? 0.92 : /[A-Z0-9]/.test(c) ? 0.72 : /[ .,:'\u00B7]/.test(c) ? 0.32 : /[mw]/.test(c) ? 0.86 : /[a-z]/.test(c) ? 0.58 : 0.7;
    }
    return w * z;
  }
  /* Pill label centred on (x, y). o.z size, o.s stroke, o.f text, o.bg fill, o.k text key. */
  function L(x, y, s, o) {
    o = o || {};
    var z = o.z || 15, h = Math.round(z * 1.75), w = tw(s, z) + h * 0.95;
    return '<g class="pill" data-cx="' + x + '" data-pad="' + (h * 0.95).toFixed(1) + '">' +
      R(x - w / 2, y - h / 2, w, h, o.bg || C.paper, { rx: h / 2, s: o.s || C.navy, sw: o.sw || 2 }) +
      T(x, y + 0.5, s, { z: z, f: o.f || o.s || C.navy, k: o.k }) + "</g>";
  }
  /* ---------- pictograms (centred on the local origin) ---------- */
  function person(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + O(0, -15, 8, col) + P("M-13 14 Q-13 -4 0 -4 Q13 -4 13 14 Z", "none", 0, { f: col }) + "</g>";
  }
  function hotel(col, s, door) {
    s = s || 1;
    var g = R(-16, -26, 32, 44, C.paper, { rx: 3, s: col, sw: 2.5 });
    for (var r = 0; r < 3; r++) for (var c = 0; c < 2; c++) g += R(-11 + c * 13, -20 + r * 11, 9, 7, C.blue, { rx: 1.5 });
    return '<g transform="scale(' + s + ')">' + g + R(-5, 8, 10, 10, door || col, { rx: 1.5 }) + "</g>";
  }
  function coin(r, col, txt, z) {
    return O(0, 0, r, C.paper, { s: col, sw: Math.max(2, r / 6) }) + O(0, 0, r * 0.72, "none", { s: col, sw: 1.2, op: 0.5 }) +
      (txt ? T(0, 0.5, txt, { z: z || Math.round(r * 0.6), f: col }) : "");
  }
  function clock(r, col) {
    return O(0, 0, r, C.paper, { s: col, sw: Math.max(2, r / 6) }) +
      P("M0 " + (-r * 0.6) + " V0 L" + (r * 0.45) + " " + (r * 0.3), col, Math.max(2, r / 7));
  }
  function doc(w, h, col) {
    var s = R(-w / 2, -h / 2, w, h, C.white, { rx: 3, s: col, sw: 2 }), n = Math.max(2, Math.floor((h - 12) / 8));
    for (var i = 0; i < n; i++) s += P("M" + (-w / 2 + 6) + " " + (-h / 2 + 9 + i * 8) + " H" + (w / 2 - 6 - (i % 2) * 6), col, 1.8, { op: 0.55 });
    return s;
  }
  function contract(col) {
    return doc(34, 44, col) + P("M-10 16 q4 -7 8 0 t8 0", C.orange, 2);
  }
  function tick(s, col, sw) {
    s = s || 1;
    return P("M" + -9 * s + " 0 L" + -3 * s + " " + 7 * s + " L" + 10 * s + " " + -8 * s, col || C.green, sw || 4);
  }
  function cross(s, col, sw) {
    s = s || 1;
    return P("M" + -8 * s + " " + -8 * s + " L" + 8 * s + " " + 8 * s + " M" + 8 * s + " " + -8 * s + " L" + -8 * s + " " + 8 * s, col || C.red, sw || 4);
  }
  function qb(r, col) {
    return O(0, 0, r, col || C.orange) + T(0, 1, "?", { z: Math.max(14, Math.round(r * 1.3)), f: C.white, w: 900 });
  }
  function okb(r, col) { return O(0, 0, r, col || C.green) + tick(r / 13, C.white, Math.max(2.5, r / 5)); }
  function nob(r, col) { return O(0, 0, r, col || C.red) + cross(r / 15, C.white, Math.max(2.5, r / 5)); }
  function mag(r, col) {
    col = col || C.ink;
    return O(0, 0, r, "rgba(255,255,255,.55)", { s: col, sw: Math.max(3, r / 5) }) + P("M" + r * 0.72 + " " + r * 0.72 + " L" + r * 1.45 + " " + r * 1.45, col, Math.max(4, r / 3.5));
  }
  function shield(s, col, fill) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + P("M0 -20 L16 -13 V-1 Q16 14 0 21 Q-16 14 -16 -1 V-13 Z", col, 2.5, { f: fill || C.lilac }) + "</g>";
  }
  function keyI(s, col) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + O(-8, 0, 7, "none", { s: col, sw: 3.5 }) + P("M-1 0 H16 M11 0 V6 M16 0 V5", col, 3.5) + "</g>";
  }
  function flag(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + P("M0 0 V-34", C.ink, 2.5) + P("M0 -34 L22 -27 L0 -20 Z", col, 1, { f: col }) + "</g>";
  }
  function trophy(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + P("M-12 -14 H12 V-4 Q12 8 0 10 Q-12 8 -12 -4 Z", col, 2, { f: col }) +
      P("M-12 -10 h-6 v5 q0 5 6 5 M12 -10 h6 v5 q0 5 -6 5", col, 2.5) + R(-4, 10, 8, 6, col) + R(-11, 16, 22, 5, C.ink, { rx: 1.5 }) + "</g>";
  }
  function hourglass(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + P("M-12 -18 H12 M-12 18 H12", C.ink, 3) +
      P("M-9 -17 Q-9 -4 0 0 Q9 -4 9 -17 Z M-9 17 Q-9 4 0 0 Q9 4 9 17 Z", col, 2, { f: C.paper }) +
      P("M-5 -10 Q0 -3 5 -10 Z M-7 15 Q0 8 7 15 Z", "none", 0, { f: col }) + "</g>";
  }
  function cal(col, s) {
    s = s || 1;
    var g = R(-15, -13, 30, 28, C.white, { rx: 3, s: col, sw: 2 }) + R(-15, -13, 30, 8, col, { rx: 3 });
    for (var i = 0; i < 3; i++) for (var j = 0; j < 2; j++) g += R(-10 + i * 8, -1 + j * 7, 5, 4, col, { op: 0.6 });
    return '<g transform="scale(' + s + ')">' + g + "</g>";
  }
  function cloud(col, s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + E(0, 4, 30, 14, col) + E(-18, 6, 16, 11, col) + E(18, 6, 17, 11, col) + E(-2, -8, 18, 14, col) + "</g>";
  }
  function target(r, col) {
    return O(0, 0, r, C.white, { s: col, sw: 3 }) + O(0, 0, r * 0.62, "none", { s: col, sw: 3 }) + O(0, 0, r * 0.25, col);
  }
  function gear(r, col) {
    var d = "", n = 8;
    for (var i = 0; i < n * 2; i++) {
      var a = (i / (n * 2)) * Math.PI * 2, rr = i % 2 ? r : r * 1.22, a2 = a + Math.PI / (n * 2);
      d += (i ? "L" : "M") + (rr * Math.cos(a)).toFixed(1) + " " + (rr * Math.sin(a)).toFixed(1) + " L" + (rr * Math.cos(a2)).toFixed(1) + " " + (rr * Math.sin(a2)).toFixed(1) + " ";
    }
    return P(d + "Z", col, 2, { f: C.paper }) + O(0, 0, r * 0.4, "none", { s: col, sw: 3 });
  }
  function arrowH(x1, y1, x2, y2, col, sw) {
    var a = Math.atan2(y2 - y1, x2 - x1), h = 9;
    return P("M" + x1 + " " + y1 + " L" + x2 + " " + y2 + " M" + (x2 - h * Math.cos(a - 0.5)).toFixed(1) + " " + (y2 - h * Math.sin(a - 0.5)).toFixed(1) +
      " L" + x2 + " " + y2 + " L" + (x2 - h * Math.cos(a + 0.5)).toFixed(1) + " " + (y2 - h * Math.sin(a + 0.5)).toFixed(1), col || C.ink, sw || 3);
  }
  function stamp(txt, col, z) {
    z = z || 16;
    var w = tw(txt, z) + 22, h = z + 14;
    return R(-w / 2, -h / 2, w, h, "rgba(255,255,255,.88)", { rx: 4, s: col, sw: 3 }) + T(0, 1, txt, { z: z, f: col, w: 900 });
  }
  function umbrella(col) {
    return P("M-34 0 Q-34 -30 0 -32 Q34 -30 34 0 Q25 -7 17 0 Q8 -7 0 0 Q-8 -7 -17 0 Q-25 -7 -34 0 Z", col, 2, { f: C.lilac }) + P("M0 -32 V26 q0 7 -7 7", col, 3);
  }
  function bell(col) {
    return P("M-11 8 Q-11 -12 0 -12 Q11 -12 11 8 L14 11 H-14 Z", col, 2.5, { f: C.amber }) + O(0, 14, 3.5, col);
  }
  function gavel(col) {
    return G(R(-14, -7, 28, 14, col, { rx: 3 }) + R(-3, 7, 6, 22, col, { rx: 2 }), "rotate(-35)") + R(-18, 26, 36, 6, C.ink, { rx: 2 });
  }
  function speech(w, h, col) {
    return P("M" + -w / 2 + " " + -h / 2 + " H" + w / 2 + " V" + h / 2 + " H-6 L-16 " + (h / 2 + 12) + " L-16 " + h / 2 + " H" + -w / 2 + " Z", col, 2, { f: C.white });
  }
  function bars3(vals, cols, x0, base, bw, gap, scale) {
    var s = "";
    vals.forEach(function (v, i) { s += R(x0 + i * (bw + gap), base - v * scale, bw, v * scale, cols[i], { rx: 3 }); });
    return s;
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function V(S, key, on, extra) {
    var p = { o: on ? 1 : 0, s: on ? 1 : 0.86 };
    if (extra) for (var q in extra) p[q] = extra[q];
    S(key, p);
  }
  function reduced() {
    try { return !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; }
  }
  function nowMs() { return W.performance && W.performance.now ? W.performance.now() : Date.now(); }
  var EASE = {
    io: function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; },
    out: function (t) { return 1 - Math.pow(1 - t, 3); },
    back: function (t) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }
  };
  var GSE = { io: "power3.inOut", out: "power3.out", back: "back.out(1.6)" };
  function fmtNum(v, n) {
    var x = Math.round(v), neg = x < 0, s = String(Math.abs(x)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (neg ? "\u2212" : "") + s;
  }
  /* Base stylesheet, entirely scoped under .vls-w13-<id>. */
  function baseCSS(id, bg) {
    var s = ".vls-w13-" + id;
    return [
      s + "{position:relative;width:100%;height:100%;min-height:180px;overflow:hidden;background:" + bg + ";color:#16263a;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}",
      s + ">svg{position:absolute;inset:0;width:100%;height:100%;display:block}",
      s + " text{font-family:inherit;paint-order:stroke fill}",
      s + " .mv{transform-box:fill-box;transform-origin:50% 50%}",
      s + " .mv.ob{transform-origin:50% 100%}",
      s + " .mv.ol{transform-origin:0% 50%}",
      s + " .mv.ot{transform-origin:50% 0%}",
      s + " .halo{stroke:#fbf8f1;stroke-width:5px;stroke-linejoin:round}",
      s + " .halo-d{stroke:#16263a;stroke-width:4px;stroke-linejoin:round}",
      s + " .chip.pop{animation:w13v2pop .45s cubic-bezier(.2,1.4,.4,1)}",
      s + " .chip{transform-box:fill-box;transform-origin:50% 50%}",
      s + " .bob{animation:w13v2bob 2.8s ease-in-out infinite}",
      s + " .pulse{animation:w13v2pulse 1.8s ease-in-out infinite}",
      s + " .march{animation:w13v2march 1.1s linear infinite}",
      s + " .spin{transform-box:fill-box;transform-origin:50% 50%;animation:w13v2spin 9s linear infinite}",
      s + " .sway{transform-box:fill-box;transform-origin:50% 0%;animation:w13v2sway 3.4s ease-in-out infinite}",
      s + " .walk{animation:w13v2walk 5s linear infinite}",
      s + " .drift{animation:w13v2drift 4s ease-in-out infinite}",
      s + " .blink{animation:w13v2blink 1.2s steps(2,end) infinite}",
      "@media (prefers-reduced-motion:reduce){" + s + " *{animation:none!important;transition:none!important}}"
    ].join("\n");
  }
  var KEYFRAMES = [
    "@keyframes w13v2pop{0%{transform:scale(.84);opacity:.3}100%{transform:scale(1);opacity:1}}",
    "@keyframes w13v2bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}",
    "@keyframes w13v2pulse{0%,100%{opacity:.35}50%{opacity:1}}",
    "@keyframes w13v2march{to{stroke-dashoffset:-24}}",
    "@keyframes w13v2spin{to{transform:rotate(360deg)}}",
    "@keyframes w13v2sway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}",
    "@keyframes w13v2walk{0%{transform:translateX(-40px);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateX(60px);opacity:0}}",
    "@keyframes w13v2drift{0%,100%{transform:translateX(-6px)}50%{transform:translateX(6px)}}",
    "@keyframes w13v2blink{0%{opacity:1}100%{opacity:.25}}"
  ].join("\n");

  /* ---------- scene factory ---------- */
  function scene(id, cfg) {
    var tags = cfg.tags, N = tags.length, boards = cfg.boards;
    var accent = cfg.accent || C.navy;
    var root = null, svg = null, core = null, nodes = [], last = -1, lastB = -1, ro = null, chipT = null, chipG = null;
    var DEF = { x: 0, y: 0, r: 0, s: 1, sx: 1, sy: 1, o: 1, d: 0, n: 0 };
    function boardOf(k) {
      for (var i = 0; i < boards.length; i++) if (k >= boards[i].a && k <= boards[i].b) return i;
      return boards.length - 1;
    }
    function fit() {
      if (!root || !svg) return;
      var w = root.clientWidth || CW, h = root.clientHeight || CH, a = w / Math.max(1, h), VW = CW, VH = CH;
      if (a > CW / CH) VW = Math.min(CH * a, CW * 1.35); else VH = Math.min(CW / a, CH * 1.45);
      svg.setAttribute("viewBox", "0 0 " + VW.toFixed(2) + " " + VH.toFixed(2));
      core.setAttribute("x", ((VW - CW) / 2).toFixed(2));
      core.setAttribute("y", ((VH - CH) / 2).toFixed(2));
    }
    function markup() {
      var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + CW + " " + CH + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(cfg.label) + '">' +
        '<svg class="core" x="0" y="0" width="' + CW + '" height="' + CH + '" viewBox="0 0 ' + CW + " " + CH + '" overflow="visible" style="overflow:visible">';
      PFX = "";
      s += cfg.bg();
      boards.forEach(function (bd, i) {
        PFX = "b" + i + "_";
        s += '<g class="mv bdg" data-k="B' + i + '" data-o="0">' + bd.draw() + "</g>";
      });
      PFX = "";
      s += '<g transform="translate(200 22)"><g class="chip">' + L(0, 0, tags[0], { z: 15, s: accent, f: C.ink, bg: C.paper }) + "</g></g>";
      s += M("__pg", 0, 297, R(0, -2, CW, 4, accent, { op: 0.9 }), { c: "ol" });
      return s + "</svg></svg>";
    }
    function paint(n) {
      var s = n._s;
      n.style.transform = "translate(" + s.x.toFixed(2) + "px," + s.y.toFixed(2) + "px) rotate(" + s.r.toFixed(2) + "deg) scale(" +
        (s.s * s.sx).toFixed(4) + "," + (s.s * s.sy).toFixed(4) + ")";
      n.style.opacity = String(clamp(s.o, 0, 1));
      if (n._dr) n.style.strokeDashoffset = (100 - 100 * clamp(s.d, 0, 1)).toFixed(2);
      if (n._num) n.textContent = n._pre + fmtNum(s.n) + n._suf;
    }
    function fitPill(g) {
      try {
        var t = g.querySelector("text"), r = g.querySelector("rect");
        var w = t.getComputedTextLength();
        if (!(w > 0)) return;
        var pad = Number(g.getAttribute("data-pad")) || 20, cx = Number(g.getAttribute("data-cx")) || 0;
        r.setAttribute("width", (w + pad).toFixed(1));
        r.setAttribute("x", (cx - (w + pad) / 2).toFixed(1));
      } catch (e) { /* layout not available yet */ }
    }
    function register() {
      nodes = [];
      var list = root.querySelectorAll("[data-k]");
      for (var i = 0; i < list.length; i++) {
        var n = list[i], k = n.getAttribute("data-k"), m = /^b(\d+)_/.exec(k);
        n._k = k; n._b = m ? Number(m[1]) : -1;
        n._dr = n.classList && n.classList.contains("dr");
        n._isT = n.tagName.toLowerCase() === "text";
        n._num = n._isT && n.hasAttribute("data-n");
        n._pre = n.getAttribute("data-pre") || ""; n._suf = n.getAttribute("data-suf") || "";
        n._anim = (n.classList && n.classList.contains("mv")) || n._num;
        var o0 = n.getAttribute("data-o"), d0 = n.getAttribute("data-d");
        n._d0 = {};
        for (var p in DEF) n._d0[p] = DEF[p];
        if (o0 !== null) n._d0.o = Number(o0);
        if (d0 !== null) n._d0.d = Number(d0);
        if (n._num) n._d0.n = Number(n.getAttribute("data-n")) || 0;
        n._s = {};
        for (var q in n._d0) n._s[q] = n._d0[q];
        n._t0 = n._isT && !n._num ? n.textContent : null;
        n._f0 = n.getAttribute("fill");
        n._st0 = n.getAttribute("stroke");
        n._tok = 0;
        if (n._anim) paint(n);
        nodes.push(n);
      }
      chipG = root.querySelector(".chip");
      chipT = chipG ? chipG.querySelector("text") : null;
      var pills = root.querySelectorAll(".pill");
      for (var j = 0; j < pills.length; j++) fitPill(pills[j]);
    }
    function kill(n) {
      n._tok++;
      if (W.gsap) { try { W.gsap.killTweensOf(n._s); } catch (e) { } }
    }
    function tween(n, to, dur, del, ease) {
      kill(n);
      if (W.gsap) {
        try {
          var v = {};
          for (var p in to) v[p] = to[p];
          v.duration = dur; v.delay = del; v.ease = GSE[ease] || GSE.io; v.overwrite = true;
          v.onUpdate = function () { paint(n); };
          W.gsap.to(n._s, v);
          return;
        } catch (e) { /* fall through to rAF */ }
      }
      var from = {}, tok = n._tok, t0 = nowMs() + del * 1000, ef = EASE[ease] || EASE.io;
      for (var q in to) from[q] = n._s[q];
      var raf = W.requestAnimationFrame || function (f) { return setTimeout(function () { f(nowMs()); }, 16); };
      function frame() {
        if (tok !== n._tok) return;
        var t = (nowMs() - t0) / (dur * 1000);
        if (t < 0) { raf(frame); return; }
        var e = ef(clamp(t, 0, 1));
        for (var r in to) n._s[r] = from[r] + (to[r] - from[r]) * e;
        paint(n);
        if (t < 1) raf(frame);
      }
      raf(frame);
    }
    function snap(n, to) {
      kill(n);
      for (var p in to) n._s[p] = to[p];
      paint(n);
    }
    function render(k, quick) {
      var bi = boardOf(k), bd = boards[bi], tg = {};
      function S(key, p) {
        var kk = PFX + key;
        tg[kk] = tg[kk] || {};
        for (var q in p) tg[kk][q] = p[q];
      }
      PFX = "b" + bi + "_";
      bd.view(k - bd.a, S);
      PFX = "";
      for (var j = 0; j < boards.length; j++) tg["B" + j] = { o: j === bi ? 1 : 0, s: j === bi ? 1 : 0.97, dur: 0.5, e: "out" };
      tg.__pg = { sx: (k + 1) / N, dur: 0.6 };
      var entering = bi !== lastB;
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (n._b >= 0 && n._b !== bi) continue;
        if (entering && n._b === bi) snap(n, n._d0);
        var t = tg[n._k] || {}, num = {}, diff = false;
        for (var p in n._d0) {
          var v = t[p] !== undefined ? t[p] : n._d0[p];
          num[p] = v;
          if (Math.abs(n._s[p] - v) > 1e-4) diff = true;
        }
        if (n._t0 !== null) {
          var txt = t.t !== undefined ? String(t.t) : n._t0;
          if (n.textContent !== txt) {
            n.textContent = txt;
            if (n.parentNode && n.parentNode.classList && n.parentNode.classList.contains("pill")) fitPill(n.parentNode);
          }
        }
        var f = t.f !== undefined ? t.f : n._f0;
        if (f !== null && n.getAttribute("fill") !== f) n.setAttribute("fill", f);
        var st = t.st !== undefined ? t.st : n._st0;
        if (st !== null && n.getAttribute("stroke") !== st) n.setAttribute("stroke", st);
        if (!n._anim || !diff) continue;
        if (quick) snap(n, num);
        else tween(n, num, t.dur !== undefined ? t.dur : 0.8, (t.del || 0) + (entering && n._b === bi ? 0.12 : 0), t.e || "io");
      }
      if (chipT) {
        var changed = chipT.textContent !== tags[k];
        chipT.textContent = tags[k];
        fitPill(chipG.querySelector(".pill"));
        if (changed && !quick) {
          chipG.classList.remove("pop");
          void chipG.getBoundingClientRect();
          chipG.classList.add("pop");
        }
      }
      if (svg) svg.setAttribute("aria-label", cfg.label + ": " + tags[k]);
      lastB = bi;
    }
    function show(k, instant) {
      if (!root) return;
      render(k, !!instant || reduced());
      last = k;
    }
    function index(i, n) {
      var ii = Math.floor(Number(i) || 0), nn = Math.floor(Number(n) || 0);
      if (!(nn > 0)) nn = N;
      ii = clamp(ii, 0, nn - 1);
      if (nn === N) return ii;
      if (nn === 1) return 0;
      return clamp(Math.round((ii * (N - 1)) / (nn - 1)), 0, N - 1);
    }
    VLS[id] = {
      build: function (host) {
        if (!host) return;
        if (ro) { try { ro.disconnect(); } catch (e) { } ro = null; }
        root = document.createElement("div");
        root.className = "vls-w13-" + id;
        root.innerHTML = markup();
        if (typeof host.replaceChildren === "function") host.replaceChildren(root);
        else { host.innerHTML = ""; host.appendChild(root); }
        if (host.clientHeight < 60) root.style.cssText = "height:auto;aspect-ratio:4/3";
        svg = root.querySelector("svg");
        core = root.querySelector("svg.core");
        register();
        fit();
        if (W.ResizeObserver) { ro = new W.ResizeObserver(fit); ro.observe(root); }
        last = -1; lastB = -1;
        show(0, true);
      },
      step: function (i, n) {
        if (!root) return;
        var k = index(i, n);
        if (k === last) return;
        show(k, false);
      },
      reset: function () {
        if (!root) return;
        last = -1; lastB = -1;
        show(0, true);
      },
      _meta: { n: N, boards: boards.map(function (b) { return [b.a, b.b, b.tpl]; }) }
    };
    CSS.push(baseCSS(id, cfg.bgc || "#f5f0e6") + (cfg.css ? "\n" + cfg.css : ""));
  }
  function installCSS(mark) {
    var st = document.getElementById("vl-sc-w13");
    if (!st) {
      st = document.createElement("style");
      st.id = "vl-sc-w13";
      (document.head || document.documentElement).appendChild(st);
    }
    var tagm = "/*" + mark + "*/";
    if (st.textContent.indexOf(tagm) === -1) st.textContent += "\n" + tagm + "\n" + (st.textContent.indexOf("w13v2pop{") === -1 ? KEYFRAMES + "\n" : "") + CSS.join("\n");
  }
  /* Board constructor: lines a..b, benchmark template, draw(), view(b, S). */
  function BD(a, b, tpl, draw, view) { return { a: a, b: b, tpl: tpl, draw: draw, view: view }; }
  /* Full-bleed backdrop helper (paints far beyond the 400 x 300 core). */
  function backdrop(top, bottom, floorY, floor, extra) {
    var id = "g" + Math.random().toString(36).slice(2, 8);
    return "<defs>" + el("linearGradient", { id: id, x1: 0, y1: 0, x2: 0, y2: 1 },
      el("stop", { offset: 0, "stop-color": top }) + el("stop", { offset: 1, "stop-color": bottom })) + "</defs>" +
      R(-400, -300, 1200, 900, "url(#" + id + ")") + (floor ? R(-400, floorY, 1200, 600, floor) : "") + (extra || "");
  }
  /* ==================================================================
     W13O3a  A BENEFIT NEEDS AN OWNER IN THE BUSINESS  (28 lines)
     Rebuilt (audit 5.3/10: 15 WEAK, 5 MISMATCH). Ten boards: why
     evidence alone is not capture, who the owner is, one owner per
     claim, when ownership starts, and what makes it meaningful.
     ================================================================== */
  scene("W13O3a", {
    label: "A benefit needs an owner in the business",
    accent: C.navy,
    bgc: "#edf1f6",
    bg: function () { return backdrop("#e5ecf5", "#f5f2ea", 274, "#e3ddcd"); },
    tags: ["Who is responsible?", "505 still unverified", "Evidence isn't capture", "Someone must stay",
      "The benefit owner", "Authority to decide", "Labour: AED 240k", "4 fewer, not 11",
      "\u201CIt works\u201D", "Owner investigates capacity", "Explain any shortfall", "Unowned stays unrealised",
      "Retained: AED 180k", "Rates fell 4%", "A commercial owner", "Finance checks, not owns",
      "Penalty: AED 85k", "Show real risk reduction", "Different owners", "Director can't do all",
      "Agree before approval", "Challenge assumptions early", "Survives project closure", "Evidence, shortfalls, action",
      "An owner per claim", "Who acts? Who checks?", "Duty, authority, data", "Next: the register"],
    boards: [
      /* 1. Lines 0-2. The committee asks who is responsible; 505 is unverified; evidence on the table is not value captured.
         Adapted from: 112 Infographics Pack by ARstudio (chart primitives and callouts revealed)
         https://motionarray.com/after-effects-templates/infographics-pack-135055/  */
      BD(0, 2, "112", function () {
        var s = "";
        s += R(40, 232, 320, 14, C.ink, { rx: 4 });
        for (var i = 0; i < 4; i++) s += G(person(C.slate, 0.9), "translate(" + (110 + i * 60) + " 224)");
        s += M("who", 200, 96, R(-110, -34, 220, 68, C.white, { rx: 12, s: C.navy, sw: 3 }) + T(0, -8, "WHO IS", { z: 18, f: C.navy }) +
          T(0, 16, "RESPONSIBLE?", { z: 18, f: C.navy }));
        s += M("bars", 0, 0, R(110, 88, 60, 110, C.navy, { rx: 4 }) + T(140, 104, "620", { z: 16, f: C.white }) + R(230, 108, 60, 90, C.green, { rx: 4 }) +
          T(260, 124, "505", { z: 16, f: C.white }), { o0: 0 });
        s += M("unv", 290, 74, stamp("UNVERIFIED", C.red, 14), { o0: 0 });
        s += M("fold", 130, 214, R(-40, -16, 80, 32, C.amber, { rx: 4, s: C.orange, sw: 2 }) + T(0, 1, "EVIDENCE", { z: 12, f: C.orange }), { o0: 0 });
        s += M("belt", 0, 0, R(40, 120, 320, 10, C.slate, { rx: 5 }) + P("M44 125 H356", C.white, 2, { da: "8 8", c: "march" }) +
          G(G(coin(16, C.gold, "AED", 9), "translate(120 104)") + G(coin(16, C.gold, "AED", 9), "translate(200 104)") + G(coin(16, C.gold, "AED", 9), "translate(280 104)"), "", "drift") +
          L(200, 70, "NOBODY COLLECTS", { z: 15, s: C.red }), { o0: 0 });
        s += M("ne", 280, 214, L(0, 0, "EVIDENCE \u2260 CAPTURE", { z: 13, s: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("who", { o: b === 0 ? 1 : 0, s: b === 0 ? 1 : 0.8 });
        V(S, "bars", b === 1); V(S, "unv", b === 1, { r: -6, del: 0.5 });
        V(S, "fold", b === 2); V(S, "belt", b === 2, { del: 0.2 }); V(S, "ne", b === 2, { del: 0.6 });
      }),
      /* 2. Lines 3-5. The project team hands the benefit to a named owner, who also receives the key of authority.
         Adapted from: 086 Workflow by a (role icons and handoff sequence)
         https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm  */
      BD(3, 5, "086", function () {
        var s = "";
        s += M("team", 90, 214, G(person(C.slate, 1.2), "translate(-24 0)") + person(C.slate, 1.2) + G(person(C.slate, 1.2), "translate(24 0)") +
          T(0, 36, "PROJECT TEAM", { z: 13, f: C.slate }));
        s += M("own", 300, 214, person(C.green, 1.6) + T(0, 40, "BENEFIT OWNER", { z: 14, f: C.green }));
        s += M("tok", 120, 160, coin(18, C.gold, "AED", 10));
        s += M("stay", 200, 78, L(0, 0, "AFTER THE TEAM LEAVES?", { z: 15, s: C.ink, f: C.ink }), { o0: 0 });
        s += M("badge", 300, 120, R(-84, -40, 168, 80, C.white, { rx: 10, s: C.green, sw: 3 }) + T(0, -18, "ACCOUNTABLE TO", { z: 12, f: C.green }) +
          T(0, 4, "DELIVER", { z: 15, f: C.green }) + T(0, 24, "AND DEMONSTRATE", { z: 13, f: C.green }), { o0: 0 });
        s += M("key", 330, 184, keyI(1.6, C.gold), { o0: 0 });
        s += M("auth", 120, 100, L(0, 0, "AUTHORITY OVER DECISIONS", { z: 14, s: C.gold, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("team", { o: b === 0 ? 1 : 0.35, x: b >= 1 ? -20 : 0 });
        S("tok", { x: 214, y: 36, dur: 1.4, del: 0.4 });
        V(S, "stay", b === 0, { del: 0.3 });
        V(S, "badge", b >= 1); V(S, "key", b === 2, { r: b === 2 ? -20 : 0, e: "back" }); V(S, "auth", b === 2, { del: 0.4 });
      }),
      /* 3. Lines 6-8. The labour claim: eleven assumed, four observed; the team proves it works; staffing sits behind business authority.
         Adapted from: 109 teamwork (people appear as a team)
         https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6  */
      BD(6, 8, "109", function () {
        var s = "";
        s += M("clm", 200, 64, L(0, 0, "LABOUR CLAIM AED 240k", { z: 16, s: C.navy }));
        for (var i = 0; i < 11; i++) s += M("p" + i, 40 + i * 32, 130, person(C.orange, 0.9), { o0: 0 });
        s += M("n", 200, 186, L(0, 0, "11 ASSUMED, 4 FEWER", { z: 15, s: C.orange }), { o0: 0 });
        s += M("team", 90, 240, person(C.slate, 1.3) + G(speech(98, 30, C.slate) + T(0, 0, "IT WORKS", { z: 13, f: C.slate }), "translate(50 -64)"), { o0: 0 });
        s += M("door", 300, 226, R(-46, -60, 92, 100, C.sand, { rx: 4, s: C.ink, sw: 2.5 }) + G(R(-12, -6, 24, 20, C.gold, { rx: 3 }) + P("M-7 -6 V-14 a7 7 0 0 1 14 0 V-6", C.gold, 3), "translate(0 -10)") +
          T(0, 28, "STAFFING", { z: 12, f: C.ink }) + T(0, 52, "BUSINESS AUTHORITY", { z: 12, f: C.green }), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 11; i++) V(S, "p" + i, b <= 1, { del: i * 0.05, o: b === 1 && i < 4 ? 0.2 : b <= 1 ? 1 : 0, y: b === 1 && i < 4 ? -10 : 0 });
        V(S, "n", b === 1, { del: 0.5 });
        V(S, "team", b === 2); V(S, "door", b === 2, { del: 0.3 });
        S("clm", { y: b === 2 ? 0 : 0 });
      }),
      /* 4. Lines 9-11. The operations owner traces capacity to value, explains the budget, and shows what happens with no owner.
         Adapted from: 103 Data Factory Animation (inputs fed, outputs converted)
         https://lottiefiles.com/free-animation/data-factory-animation-I6dMAfEyrl  */
      BD(9, 11, "103", function () {
        var s = "";
        s += M("own", 60, 220, person(C.green, 1.4) + T(0, 36, "OPS OWNER", { z: 13, f: C.green }));
        s += M("flow", 0, 0, O(140, 120, 26, C.white, { s: C.teal, sw: 3 }) + G(clock(14, C.teal), "translate(140 120)") + T(140, 160, "CAPACITY", { z: 12, f: C.teal }) +
          arrowH(170, 120, 206, 120, C.ink, 3) + P("M240 96 L264 120 L240 144 L216 120 Z", C.green, 3, { f: C.white }) + T(240, 160, "DECISION", { z: 12, f: C.green }) +
          arrowH(268, 120, 304, 120, C.ink, 3) + G(target(22, C.navy), "translate(336 120)") + T(336, 160, "VALUE", { z: 12, f: C.navy }), { o0: 0 });
        s += M("mg", 140, 120, mag(18), { o0: 0 });
        s += M("bud", 0, 0, P("M150 250 V90 M150 250 H370", C.ink, 2) + T(156, 84, "LABOUR BUDGET", { z: 12, a: "start", f: C.navy }) +
          P("M160 120 H250 L270 180 H360", C.green, 3, { da: "6 4" }) + P("M160 120 H360", C.navy, 4) + T(330, 196, "EXPECTED", { z: 12, f: C.green }) +
          T(300, 106, "ACTUAL", { z: 12, f: C.navy }), { o0: 0 });
        s += M("why", 230, 240, L(0, 0, "OWNER EXPLAINS WHY", { z: 14, s: C.green }), { o0: 0 });
        s += M("box", 200, 140, R(-70, -50, 140, 100, C.white, { rx: 8, s: C.slate, sw: 2.5, da: "6 4" }) + G(clock(20, C.slate), "translate(0 -6)") +
          T(0, 36, "IDLE CAPACITY", { z: 12, f: C.slate }), { o0: 0 });
        s += M("noo", 60, 150, O(0, 0, 32, "none", { s: C.slate, sw: 2, da: "4 4" }) + T(0, 1, "?", { z: 22, f: C.slate }) + T(0, 46, "NO OWNER", { z: 13, f: C.red }), { o0: 0 });
        s += M("gh", 330, 140, O(0, 0, 26, "none", { s: C.gold, sw: 2, da: "4 4" }) + T(0, 1, "AED", { z: 12, f: C.gold }) + T(0, 44, "UNREALISED", { z: 12, f: C.red }), { o0: 0 });
        s += M("use", 200, 236, L(0, 0, "USEFUL, NOT REALISED", { z: 14, s: C.orange }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("own", { o: b <= 1 ? 1 : 0 });
        V(S, "flow", b === 0); V(S, "mg", b === 0, { x: b === 0 ? 100 : 0, dur: 1.6, del: 0.4 });
        V(S, "bud", b === 1); V(S, "why", b === 1, { del: 0.5 });
        V(S, "box", b === 2); V(S, "noo", b === 2, { del: 0.2 }); V(S, "gh", b === 2, { del: 0.4 }); V(S, "use", b === 2, { del: 0.6 });
      }),
      /* 5. Lines 12-15. Retention: two renewals, a 4% cut, a commercial owner investigating, finance scanning but not owning.
         Adapted from: 095 contract process (proposal and agreement states)
         https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8  */
      BD(12, 15, "095", function () {
        var s = "";
        s += M("cts", 110, 130, G(contract(C.green), "translate(-22 0) rotate(-6) scale(1.2)") + G(contract(C.green), "translate(22 0) rotate(6) scale(1.2)") +
          T(0, 52, "AED 180k", { z: 17, f: C.green }) + T(0, 70, "TWO RENEWALS", { z: 11, f: C.green }));
        s += M("tag", 290, 96, R(-56, -20, 112, 40, C.amber, { rx: 8, s: C.orange, sw: 2.5 }) + T(0, 1, "RATES \u22124%", { z: 15, f: C.orange }), { o0: 0 });
        s += M("ev", 290, 150, L(0, 0, "WHY DID THEY RENEW?", { z: 13, s: C.ink, f: C.ink }), { o0: 0 });
        s += M("co", 110, 236, person(C.green, 1.3) + G(keyI(0.9, C.gold), "translate(24 -10)") + T(0, 34, "COMMERCIAL OWNER", { z: 12, f: C.green }), { o0: 0 });
        s += M("mg", 110, 130, mag(20), { o0: 0 });
        s += M("fin", 300, 220, R(-60, -40, 120, 80, C.white, { rx: 10, s: C.orange, sw: 2.5 }) + R(-44, -24, 88, 22, C.ink, { rx: 3 }) +
          R(-40, -16, 80, 4, "#ffb37d") + T(0, 14, "FINANCE", { z: 13, f: C.orange }) + T(0, 30, "CHECKS", { z: 12, f: C.orange }), { o0: 0 });
        s += M("no", 300, 150, L(0, 0, "VERIFIES, DOES NOT OWN", { z: 13, s: C.orange }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "tag", b >= 1, { e: "back" }); V(S, "ev", b === 1, { del: 0.4 });
        V(S, "co", b >= 2); V(S, "mg", b === 2, { x: b === 2 ? 10 : -40, del: 0.4 });
        V(S, "fin", b === 3); V(S, "no", b === 3, { del: 0.4 });
        S("tag", { o: b === 1 || b === 2 ? 1 : 0 });
      }),
      /* 6. Lines 16-17. The compliance owner holds a contingent 85k exposure and must show credible control evidence.
         Adapted from: 129 Arc tween (gauge rotates to a new value)
         https://observablehq.com/@d3/arc-tween  */
      BD(16, 17, "129", function () {
        var s = "";
        s += M("cl", 120, 110, G(cloud("#7d8ea6", 1.3), "", "bob") + T(0, 6, "AED 85k", { z: 15, f: C.white }));
        s += M("ct", 120, 168, L(0, 0, "CONTINGENT", { z: 14, s: C.plum }));
        s += M("ow", 120, 244, person(C.plum, 1.3) + G(shield(0.8, C.plum), "translate(26 -14)") + T(0, 34, "COMPLIANCE OWNER", { z: 12, f: C.plum }), { o0: 0 });
        s += M("g", 300, 206, P("M-70 0 A70 70 0 0 1 70 0", C.mist, 18) + P("M-70 0 A70 70 0 0 1 -35 -60.6", C.green, 18) + T(0, 26, "EXPOSURE", { z: 12, f: C.ink }), { o0: 0 });
        s += M("nd", 300, 206, P("M0 0 L56 0", C.ink, 5) + O(0, 0, 7, C.ink), { o0: 0 });
        s += M("log", 300, 84, doc(70, 50, C.plum) + L(0, 44, "CONTROL EVIDENCE", { z: 12, s: C.plum }), { o0: 0 });
        s += M("ns", 300, 262, L(0, 0, "NOT A SAVING YET", { z: 13, s: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "ow", true, { del: 0.3 });
        V(S, "g", b === 1); V(S, "nd", b === 1, { r: b === 1 ? -130 : 0, dur: 1.6, del: 0.3 }); V(S, "log", b === 1, { del: 0.2 }); V(S, "ns", b === 1, { del: 0.8 });
      }),
      /* 7. Lines 18-19. Three claims are routed to three owners; the programme director cannot carry them all.
         Adapted from: 107 Supply Chain and Shipping (shipments advanced through network nodes)
         https://lottiefiles.com/free-animation/supply-chain-and-shipping-Gd8ZsVZpXq  */
      BD(18, 19, "107", function () {
        var s = "", CL = [["LABOUR", C.navy, "OPERATIONS"], ["RETAINED", C.green, "COMMERCIAL"], ["PENALTY", C.plum, "COMPLIANCE"]];
        CL.forEach(function (c, i) {
          var x = 72 + i * 128;
          s += M("c" + i, 200, 76, L(0, 0, c[0], { z: 14, s: c[1] }), { o0: 0 });
          s += M("o" + i, x, 230, person(c[1], 1.3) + T(0, 34, c[2], { z: 13, f: c[1] }), { o0: 0 });
          s += D("r" + i, "M200 92 C200 140 " + x + " 140 " + x + " 196", c[1], 2.5);
        });
        s += M("dir", 200, 230, person(C.slate, 1.4) + T(0, 36, "PROGRAMME DIRECTOR", { z: 12, f: C.slate }), { o0: 0 });
        s += M("pile", 200, 170, G(L(0, -28, "LABOUR", { z: 12, s: C.navy }) + L(0, -4, "RETAINED", { z: 12, s: C.green }) + L(0, 20, "PENALTY", { z: 12, s: C.plum }), "rotate(6)"), { o0: 0 });
        s += M("x", 270, 160, nob(14), { o0: 0 });
        s += M("cd", 200, 70, L(0, 0, "COORDINATES, CAN'T DECIDE ALL", { z: 13, s: C.slate }), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 3; i++) {
          V(S, "c" + i, b === 0, { x: b === 0 ? (i - 1) * 128 : 0, del: i * 0.1 });
          V(S, "o" + i, b === 0, { del: 0.6 + i * 0.15 }); S("r" + i, { d: b === 0 ? 1 : 0, o: b === 0 ? 1 : 0, del: 0.3 + i * 0.15 });
        }
        V(S, "dir", b === 1); V(S, "pile", b === 1, { del: 0.3, e: "back" }); V(S, "x", b === 1, { del: 0.8 }); V(S, "cd", b === 1, { del: 0.5 });
      }),
      /* 8. Lines 20-22. A timeline where the owner is named before approval and stays after sponsor change and closure.
         Adapted from: 137 Corporate Timeline by HenlyFx (events revealed one by one)
         https://motionarray.com/after-effects-templates/corporate-timeline-1939632/  */
      BD(20, 22, "137", function () {
        var s = "";
        s += P("M24 150 H376", C.ink, 3);
        var EV = [["APPROVAL", 60, C.navy], ["DELIVERY", 150, C.slate], ["CLOSURE", 240, C.slate], ["BENEFITS", 336, C.green]];
        EV.forEach(function (e, i) { s += O(e[1], 150, 9, C.white, { s: e[2], sw: 3 }) + T(e[1], 174, e[0], { z: 12, f: e[2] }); });
        s += M("own", 40, 104, person(C.green, 1.1), { o0: 0 });
        s += D("ol", "M44 124 H376", C.green, 5);
        s += M("ob", 112, 92, L(0, 0, "OWNER NAMED FIRST", { z: 13, s: C.green }), { o0: 0 });
        s += M("ch", 140, 236, R(-90, -30, 180, 60, C.white, { rx: 10, s: C.orange, sw: 2.5 }) + T(0, -10, "CHALLENGE", { z: 13, f: C.orange }) +
          T(0, 10, "ASSUMPTIONS", { z: 13, f: C.orange }), { o0: 0 });
        s += M("me", 300, 236, R(-80, -30, 160, 60, C.white, { rx: 10, s: C.teal, sw: 2.5 }) + T(0, -10, "SET", { z: 13, f: C.teal }) +
          T(0, 10, "MEASUREMENTS", { z: 13, f: C.teal }), { o0: 0 });
        s += M("sp", 190, 214, person(C.slate, 1) + G(person(C.plum, 1), "translate(30 0)") + arrowH(4, -30, 26, -30, C.ink, 2) + T(15, 30, "SPONSOR CHANGE", { z: 12, f: C.plum }), { o0: 0 });
        s += M("cl", 300, 214, stamp("CLOSED", C.slate, 13), { o0: 0 });
        s += M("st", 200, 270, L(0, 0, "OWNERSHIP CONTINUES", { z: 14, s: C.green }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "own", true, { e: "back" }); V(S, "ob", b === 0, { del: 0.4 });
        S("ol", { d: b === 0 ? 0.08 : b === 1 ? 0.12 : 1, dur: 1.6 });
        V(S, "ch", b === 1); V(S, "me", b === 1, { del: 0.3 });
        V(S, "sp", b === 2); V(S, "cl", b === 2, { r: -6, del: 0.3 }); V(S, "st", b === 2, { del: 0.8 });
        S("own", { x: b === 2 ? 296 : 0, dur: 1.6 });
      }),
      /* 9. Lines 23-25. Three owner duties; one owner per disputed claim; who authorises and who examines.
         Adapted from: 090 Multi-Step Icon Animation (one step activated after another)
         https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU  */
      BD(23, 25, "090", function () {
        var s = "", DU = [["MAINTAIN", "EVIDENCE", doc(26, 32, C.navy), C.navy], ["EXPLAIN", "SHORTFALLS", qb(13, C.orange), C.orange], ["START", "ACTIONS", G(gear(13, C.green), "", "spin"), C.green]];
        DU.forEach(function (d, i) {
          var x = 72 + i * 128;
          s += M("d" + i, x, 140, O(0, 0, 38, C.white, { s: d[3], sw: 3 }) + d[2] + T(0, 58, d[0], { z: 13, f: d[3] }) + T(0, 76, d[1], { z: 13, f: d[3] }), { o0: 0 });
          if (i < 2) s += M("a" + i, x + 64, 140, arrowH(-18, 0, 18, 0, C.ink, 3), { o0: 0 });
        });
        var CL = [["LABOUR", C.navy], ["RETAINED", C.green], ["PENALTY", C.plum]];
        CL.forEach(function (c, i) {
          var x = 72 + i * 128;
          s += M("k" + i, x, 140, R(-56, -44, 112, 88, C.white, { rx: 10, s: c[1], sw: 2.5 }) + T(0, -24, c[0], { z: 13, f: c[1] }) +
            G(person(c[1], 0.9), "translate(0 16)") + R(-30, 32, 60, 14, c[1], { rx: 4 }) + T(0, 39, "OWNER", { z: 10, f: C.white }), { o0: 0 });
        });
        s += M("au", 104, 150, R(-86, -60, 172, 120, C.pale, { rx: 12, s: C.green, sw: 3 }) + G(keyI(1.3, C.green), "translate(0 -16)") +
          T(0, 22, "AUTHORISES", { z: 14, f: C.green }) + T(0, 42, "ACTION", { z: 14, f: C.green }), { o0: 0 });
        s += M("ex", 296, 150, R(-86, -60, 172, 120, C.amber, { rx: 12, s: C.orange, sw: 3 }) + G(mag(14, C.orange), "translate(-4 -20)") +
          T(0, 22, "EXAMINES", { z: 14, f: C.orange }) + T(0, 42, "EVIDENCE", { z: 14, f: C.orange }), { o0: 0 });
        s += M("sep", 200, 250, L(0, 0, "INDEPENDENT ROLES", { z: 14, s: C.ink, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 3; i++) { V(S, "d" + i, b === 0, { del: i * 0.3, e: "back" }); V(S, "k" + i, b === 1, { del: i * 0.2, e: "back" }); }
        V(S, "a0", b === 0, { del: 0.2 }); V(S, "a1", b === 0, { del: 0.5 });
        V(S, "au", b === 2); V(S, "ex", b === 2, { del: 0.2 }); V(S, "sep", b === 2, { del: 0.5 });
      }),
      /* 10. Lines 26-27. A name tag alone is not accountability; responsibility, authority and information together; the register comes next.
         Adapted from: 120 Animated Dashboards (transition between dashboard panels)
         https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ  */
      BD(26, 27, "120", function () {
        var s = "";
        s += M("tagn", 200, 82, R(-70, -22, 140, 44, C.white, { rx: 8, s: C.slate, sw: 2.5 }) + T(0, 1, "NAME ONLY", { z: 15, f: C.slate }) + P("M-80 0 H80", C.red, 4));
        var PT = [["RESPONSIBILITY", person(C.navy, 0.9), C.navy], ["AUTHORITY", keyI(1, C.gold), C.gold], ["INFORMATION", G(P("M-14 10 V-4 M-4 10 V-12 M6 10 V0 M16 10 V-8", C.teal, 5)), C.teal]];
        PT.forEach(function (p, i) {
          var x = 72 + i * 128;
          s += M("p" + i, x, 180, O(0, 0, 40, C.white, { s: p[2], sw: 3 }) + p[1] + T(0, 60, p[0], { z: 13, f: p[2] }), { o0: 0 });
          if (i < 2) s += M("pl" + i, x + 64, 180, T(0, 0, "+", { z: 26, f: C.ink }), { o0: 0 });
        });
        var rg = R(-150, -80, 300, 160, C.white, { rx: 10, s: C.ink, sw: 2.5 }) + T(0, -62, "BENEFITS REGISTER", { z: 14, f: C.ink });
        for (var r = 0; r < 3; r++) rg += R(-134, -40 + r * 34, 268, 26, r % 2 ? C.sky : C.pale, { rx: 4 }) + G(person([C.navy, C.green, C.plum][r], 0.5), "translate(-118 " + (-27 + r * 34) + ")");
        s += M("reg", 200, 160, rg, { o0: 0 });
        s += M("nx", 200, 266, L(0, 0, "OWNERSHIP MADE VISIBLE", { z: 14, s: C.navy }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("tagn", { o: b === 0 ? 1 : 0 });
        for (var i = 0; i < 3; i++) { V(S, "p" + i, b === 0, { del: 0.3 + i * 0.25, e: "back" }); if (i < 2) V(S, "pl" + i, b === 0, { del: 0.5 + i * 0.25 }); }
        V(S, "reg", b === 1, { e: "back" }); V(S, "nx", b === 1, { del: 0.4 });
      })
    ]
  });
  /* ==================================================================
     W13O3b  BUILDING A BENEFITS REGISTER THAT FINANCE CAN TRUST  (29 lines)
     Rebuilt (audit 6.2/10: 13 WEAK, 4 MISMATCH). The register is built
     field by field across ten boards; each claim gets its own row and
     its own evidence test, then the reporting cycle takes over.
     ================================================================== */
  scene("W13O3b", {
    label: "Building a benefits register that finance can trust",
    accent: C.gold,
    bgc: "#f4f0e6",
    bg: function () { return backdrop("#efeadd", "#f7f3ea", 274, "#e6dcc6"); },
    tags: ["More than two figures", "One reliable record", "Commitment to realisation", "Start with the objective",
      "Estimate and baseline", "Keep the assumptions", "Labour: AED 240k", "Measure: actual payroll",
      "No ratio savings", "An accountable owner", "Explain, investigate, act", "Finance checks independently",
      "Estimate \u2260 change", "Retained: AED 180k", "Keep the rate cut", "Observed vs attributable",
      "Evidence of contribution", "Penalty: AED 85k", "Risk vs avoided cost", "One register, many tests",
      "A review date each", "7 recent go-lives", "Not all delayed", "The reporting cycle",
      "Unresolved stays visible", "Challenge, don't copy", "Visible, testable, accountable", "620 and 505, qualified",
      "Verified stays separate"],
    boards: [
      /* 1. Lines 0-2. Loose figures and arguments assemble into one record that travels from commitment to realisation.
         Adapted from: 080 Creative Design Workflow Animation (shapes assembled, composition refined)
         https://dribbble.com/shots/27476599-Creative-Design-Workflow-Animation  */
      BD(0, 2, "080", function () {
        var s = "", NT = [["620", 70, 80, -8, C.navy], ["505", 160, 120, 6, C.green], ["TIMING?", 260, 82, -4, C.slate], ["PROOF?", 330, 132, 8, C.orange]];
        NT.forEach(function (n, i) {
          s += M("n" + i, n[1], n[2], G(R(-40, -22, 80, 44, "#fff3b0", { rx: 3, s: "#d4b84a", sw: 1.5 }) + T(0, 1, n[0], { z: 15, f: n[4] }), "rotate(" + n[3] + ")"));
        });
        s += M("more", 200, 200, L(0, 0, "MORE THAN FIGURES", { z: 15, s: C.ink, f: C.ink }), { o0: 0 });
        var FL = [["BENEFIT", C.navy], ["OWNER", C.green], ["EVIDENCE", C.teal], ["FINANCIAL", C.orange]], rec = R(-176, -34, 352, 68, C.white, { rx: 10, s: C.ink, sw: 2.5 });
        FL.forEach(function (f, i) { rec += R(-170 + i * 86, -26, 82, 52, C.paper, { rx: 6, s: f[1], sw: 2 }) + T(-129 + i * 86, 1, f[0], { z: 11, f: f[1] }); });
        s += M("rec", 200, 150, rec, { o0: 0 });
        s += M("one", 200, 222, L(0, 0, "ONE RELIABLE RECORD", { z: 15, s: C.gold, f: C.ink }), { o0: 0 });
        s += M("trk", 0, 0, P("M30 240 H370", C.ink, 3) + O(40, 240, 8, C.navy) + O(360, 240, 8, C.green) + T(40, 262, "COMMITMENT", { z: 13, a: "start", f: C.navy }) +
          T(360, 262, "REALISATION", { z: 13, a: "end", f: C.green }) + arrowH(150, 240, 250, 240, C.gold, 4), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 4; i++) S("n" + i, { o: b === 0 ? 1 : 0, s: b === 0 ? 1 : 0.4, x: b === 0 ? 0 : 200 - [70, 160, 260, 330][i], y: b === 0 ? 0 : 150 - [80, 120, 82, 132][i] });
        V(S, "more", b === 0, { del: 0.3 });
        V(S, "rec", b >= 1, { del: 0.4, y: b === 2 ? -30 : 0 }); V(S, "one", b === 1, { del: 0.8 });
        V(S, "trk", b === 2, { del: 0.3 });
      }),
      /* 2. Lines 3-5. The first cells: objective, original estimate and baseline; lose them and the assumptions fade.
         Adapted from: 114 Infographics Pack by JVARTS STUDIO (one metric element revealed at a time)
         https://motionarray.com/after-effects-templates/infographics-pack-100132/  */
      BD(3, 5, "114", function () {
        var s = "", CL = [["OBJECTIVE", C.navy, target(18, C.navy)], ["ESTIMATE", C.gold, coin(16, C.gold, "AED", 8)], ["BASELINE", C.teal, G(R(-3, -20, 6, 30, C.teal) + P("M3 -18 L18 -14 L3 -10", C.teal, 2, { f: C.teal }), "translate(0 6)")]];
        CL.forEach(function (c, i) {
          var x = 72 + i * 128;
          s += M("c" + i, x, 140, R(-58, -64, 116, 128, C.white, { rx: 12, s: c[1], sw: 3 }) + T(0, -44, c[0], { z: 14, f: c[1] }) + G(c[2], "translate(0 -2)") +
            T(0, 44, ["WHY IT MATTERS", "ORIGINAL VALUE", "AGREED START"][i], { z: 11, f: C.ink }), { o0: 0 });
        });
        s += M("note", 200, 244, G(R(-120, -26, 240, 52, "#fff3b0", { rx: 3, s: "#d4b84a", sw: 1.5 }) + T(0, -10, "ASSUMPTIONS:", { z: 12, f: C.ink }) +
          T(0, 14, "HOW THE AMOUNT WAS BUILT", { z: 12, f: C.ink }), "rotate(-2)"), { o0: 0 });
        s += M("lost", 200, 204, L(0, 0, "WITHOUT RECORDS: LOST", { z: 14, s: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "c0", true, { e: "back" });
        V(S, "c1", b >= 1, { e: "back" }); V(S, "c2", b >= 1, { del: 0.2, e: "back" });
        V(S, "note", b === 2, { o: b === 2 ? 0.35 : 0, y: b === 2 ? 14 : 0, r: b === 2 ? 6 : 0, dur: 1.2 });
        V(S, "lost", b === 2, { del: 0.8 });
        if (b === 2) { S("c1", { o: 0.6, s: 1 }); S("c2", { o: 0.6, s: 1 }); }
      }),
      /* 3. Lines 6-8. The labour row: 240k with its eleven-person assumption, a payroll measure, and the ratio refused.
         Adapted from: 121 Dashboard by RAKIBUZZAMAN (graph filled, metric highlighted)
         https://lottiefiles.com/free-animation/dashboard-M05MmlnoOP  */
      BD(6, 8, "121", function () {
        var s = "";
        s += M("row", 200, 92, R(-180, -30, 360, 60, C.white, { rx: 10, s: C.navy, sw: 2.5 }) + T(-164, -12, "LABOUR", { z: 13, a: "start", f: C.navy }) +
          T(-164, 10, "AED 240k", { z: 17, a: "start", f: C.navy }) + P("M-50 -24 V24 M70 -24 V24", C.mist, 2));
        s += M("asm", 210, 92, T(0, -10, "ASSUMED", { z: 11, f: C.orange }) + T(0, 8, "11 FEWER", { z: 14, f: C.orange }), { o0: 0 });
        s += M("ms", 320, 92, T(0, -10, "MEASURE", { z: 11, f: C.teal }) + T(0, 8, "PAYROLL", { z: 14, f: C.teal }), { o0: 0 });
        s += M("pin", 110, 196, G(R(-84, -40, 168, 80, "#fff3b0", { rx: 3, s: "#d4b84a", sw: 1.5 }) + T(0, -14, "KEEP THIS", { z: 13, f: C.ink }) +
          T(0, 8, "ASSUMPTION", { z: 13, f: C.ink }), "rotate(-3)"), { o0: 0 });
        s += M("led", 300, 196, R(-70, -50, 140, 100, C.white, { rx: 8, s: C.teal, sw: 2.5 }) + T(0, -32, "ACTUAL", { z: 12, f: C.teal }) +
          T(0, -16, "LABOUR SPEND", { z: 12, f: C.teal }) + R(-50, 0, 100, 10, C.teal, { rx: 3, op: 0.6 }) + R(-50, 18, 80, 10, C.teal, { rx: 3, op: 0.6 }), { o0: 0 });
        s += D("lk", "M320 116 V146", C.teal, 3);
        s += M("rat", 200, 200, R(-120, -40, 240, 80, C.white, { rx: 10, s: C.red, sw: 3 }) + T(0, -10, "240k \u00D7 4 \u00F7 11", { z: 17, f: C.slate }) +
          T(0, 18, "NOT IN THE REGISTER", { z: 12, f: C.red }) + P("M-110 -30 L110 30", C.red, 4), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "asm", true, { del: 0.3 }); V(S, "pin", b === 0, { del: 0.5, e: "back" });
        V(S, "ms", b >= 1); V(S, "led", b === 1, { del: 0.3 }); S("lk", { d: b === 1 ? 1 : 0, o: b === 1 ? 1 : 0, del: 0.5 });
        V(S, "rat", b === 2, { del: 0.2 });
      }),
      /* 4. Lines 9-12. Owner and finance columns: the owner explains and acts; finance tests on its own; an estimate is not a change.
         Adapted from: 076 Workflow Animation (action revealed, trigger handed on, notification)
         https://dribbble.com/shots/3791748-Workflow-Animation  */
      BD(9, 12, "076", function () {
        var s = "";
        s += M("ow", 104, 150, R(-88, -96, 176, 192, C.pale, { rx: 12, s: C.green, sw: 3 }) + T(0, -76, "OWNER", { z: 15, f: C.green }) +
          G(person(C.green, 1.4), "translate(0 -26)") + T(0, 12, "PROPOSED", { z: 11, f: C.slate }) + T(0, 28, "OPERATIONS MANAGER", { z: 11, f: C.green }), { o0: 0 });
        ["EXPLAIN", "INVESTIGATE", "ACT"].forEach(function (a, i) { s += M("a" + i, 342, 0, L(0, 0, a, { z: 13, s: C.green }) + arrowH(-62, 0, -50, 0, C.green, 2), { o0: 0 }); });
        s += M("fi", 296, 150, R(-88, -96, 176, 192, C.amber, { rx: 12, s: C.orange, sw: 3 }) + T(0, -76, "FINANCE", { z: 15, f: C.orange }) +
          G(mag(22, C.orange), "translate(-4 -24)") + T(0, 24, "INDEPENDENT", { z: 12, f: C.orange }) + T(0, 40, "EXAMINATION", { z: 12, f: C.orange }), { o0: 0 });
        s += M("wall", 200, 150, R(-3, -90, 6, 180, C.ink, { rx: 2 }), { o0: 0 });
        s += M("est", 0, 0, R(60, 100, 120, 150, "none", { rx: 4, s: C.gold, sw: 3, da: "6 4" }) + T(120, 268, "ESTIMATE", { z: 13, f: C.gold }) +
          R(220, 190, 120, 60, C.navy, { rx: 4 }) + T(280, 268, "ACTUAL CHANGE", { z: 13, f: C.navy }) + T(280, 220, "?", { z: 22, f: C.white }) +
          T(200, 176, "\u2260", { z: 34, f: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "ow", b <= 2); 
        for (var i = 0; i < 3; i++) V(S, "a" + i, b === 1, { y: 110 + i * 40, del: 0.2 + i * 0.2 });
        V(S, "fi", b === 2); V(S, "wall", b === 2, { del: 0.3 });
        V(S, "est", b === 3);
        S("ow", { o: b <= 2 ? 1 : 0, x: b === 2 ? 0 : 96 });
      }),
      /* 5. Lines 13-16. The retention row keeps the 4% rate cut beside the 180k and splits observed from attributable.
         Adapted from: 126 Stacked-to-grouped bars (bars reposition while keeping identity)
         https://observablehq.com/@d3/stacked-to-grouped-bars  */
      BD(13, 16, "126", function () {
        var s = "";
        s += M("row", 200, 88, R(-180, -30, 360, 60, C.white, { rx: 10, s: C.green, sw: 2.5 }) + T(-164, -12, "RETAINED", { z: 13, a: "start", f: C.green }) +
          T(-164, 10, "AED 180k", { z: 17, a: "start", f: C.green }) + G(contract(C.green), "translate(0 0) scale(.9)") + G(contract(C.green), "translate(30 0) scale(.9)"));
        s += M("rc", 316, 88, R(-56, -18, 112, 36, C.amber, { rx: 8, s: C.orange, sw: 2 }) + T(0, 1, "RATE \u22124%", { z: 13, f: C.orange }), { o0: 0 });
        s += M("kp", 316, 128, T(0, 0, "KEPT IN RECORD", { z: 11, f: C.orange }), { o0: 0 });
        s += M("ob", 200, 196, R(-160, -22, 320, 44, C.green, { rx: 6 }) + T(-150, 1, "OBSERVED RETENTION", { z: 13, a: "start", f: C.white }), { o0: 0 });
        s += M("at", 40, 252, R(0, -22, 120, 44, C.teal, { rx: 6 }) + T(60, 1, "ATTRIBUTABLE?", { z: 12, f: C.white }), { c: "ol", o0: 0 });
        s += M("atq", 236, 252, R(-70, -22, 196, 44, "none", { rx: 6, s: C.slate, sw: 2, da: "5 4" }) + T(28, 1, "OTHER CAUSES", { z: 12, f: C.slate }), { o0: 0 });
        s += M("ev", 200, 196, R(-150, -40, 300, 80, C.white, { rx: 10, s: C.navy, sw: 2.5 }) + T(0, -20, "EVIDENCE NEEDED", { z: 14, f: C.navy }) +
          T(0, 6, "CUSTOMER REASONS", { z: 12, f: C.ink }) + T(0, 24, "CONTRIBUTION AFTER COSTS", { z: 12, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "rc", b >= 1, { e: "back" }); V(S, "kp", b >= 1, { del: 0.3 });
        V(S, "ob", b === 2); S("at", { o: b === 2 ? 1 : 0, sx: b === 2 ? 1 : 0.05, del: 0.5 }); V(S, "atq", b === 2, { del: 0.7 });
        V(S, "ev", b === 3);
      }),
      /* 6. Lines 17-19. The penalty row needs two separate evidence boxes; the register holds three different tests.
         Adapted from: 117 Infographics Elements by TarZanchik (shapes and data revealed)
         https://motionarray.com/after-effects-templates/infographics-elements-789489/  */
      BD(17, 19, "117", function () {
        var s = "";
        s += M("row", 200, 88, R(-180, -30, 360, 60, C.white, { rx: 10, s: C.plum, sw: 2.5 }) + T(-164, -12, "PENALTY", { z: 13, a: "start", f: C.plum }) +
          T(-164, 10, "AED 85k", { z: 17, a: "start", f: C.plum }) + L(90, 0, "CONTINGENT", { z: 13, s: C.plum }));
        s += M("cl", 200, 196, G(cloud("#7d8ea6", 1.2), "", "bob") + L(0, 50, "ANOTHER TREATMENT", { z: 13, s: C.plum }), { o0: 0 });
        s += M("e1", 110, 196, R(-90, -50, 180, 100, C.lilac, { rx: 10, s: C.plum, sw: 2.5 }) + G(shield(1, C.plum, C.white), "translate(0 -16)") +
          T(0, 22, "RISK REDUCED", { z: 13, f: C.plum }) + T(0, 38, "EVIDENCE", { z: 12, f: C.plum }), { o0: 0 });
        s += M("e2", 290, 196, R(-90, -50, 180, 100, C.white, { rx: 10, s: C.navy, sw: 2.5 }) + G(coin(16, C.navy, "AED", 8), "translate(0 -16)") +
          T(0, 22, "COST AVOIDED", { z: 13, f: C.navy }) + T(0, 38, "EVIDENCE", { z: 12, f: C.navy }), { o0: 0 });
        s += M("ne", 200, 196, O(0, 0, 14, C.white, { s: C.red, sw: 2 }) + T(0, 1, "\u2260", { z: 18, f: C.red }), { o0: 0 });
        var RG = [["LABOUR", C.navy, "PAYROLL"], ["RETAINED", C.green, "ATTRIBUTION"], ["PENALTY", C.plum, "EXPOSURE"]];
        var rg = R(-180, -84, 360, 168, C.white, { rx: 10, s: C.ink, sw: 2.5 }) + T(-90, -66, "CLAIM", { z: 12, f: C.slate }) + T(90, -66, "EVIDENCE TEST", { z: 12, f: C.slate });
        RG.forEach(function (r, i) { rg += R(-166, -48 + i * 44, 332, 36, i % 2 ? C.sky : C.paper, { rx: 6 }) + T(-90, -30 + i * 44, r[0], { z: 14, f: r[1] }) + T(90, -30 + i * 44, r[2], { z: 14, f: r[1] }); });
        s += M("reg", 200, 170, rg, { o0: 0 });
        return s;
      }, function (b, S) {
        S("row", { o: b <= 1 ? 1 : 0 });
        V(S, "cl", b === 0, { del: 0.3 }); V(S, "e1", b === 1); V(S, "e2", b === 1, { del: 0.2 }); V(S, "ne", b === 1, { del: 0.5 });
        V(S, "reg", b === 2, { e: "back" });
      }),
      /* 7. Lines 20-22. Each row carries a review date; seven recent go-lives; the 115k gap is not stamped "delayed".
         Adapted from: 138 Scrolling Timeline (dates scroll and settle on an event)
         https://motionarray.com/after-effects-templates/scrolling-timeline-1223172/  */
      BD(20, 22, "138", function () {
        var s = "", RG = [["LABOUR", C.navy], ["RETAINED", C.green], ["PENALTY", C.plum]];
        RG.forEach(function (r, i) {
          s += M("r" + i, 200, 88 + i * 50, R(-170, -20, 340, 40, C.white, { rx: 8, s: r[1], sw: 2 }) + T(-150, 1, r[0], { z: 14, a: "start", f: r[1] }));
          s += M("d" + i, 300, 88 + i * 50, G(cal(r[1], 0.9), "translate(-40 0)") + T(-16, 1, "REVIEW DATE", { z: 12, a: "start", f: r[1] }), { o0: 0 });
        });
        s += M("rec", 0, 0, [0, 1, 2, 3, 4, 5, 6].map(function (i) { return G(hotel(C.orange, 0.5), "translate(" + (90 + i * 36) + " 252)"); }).join("") +
          L(200, 214, "7 LIVE UNDER 4 MONTHS", { z: 13, s: C.orange }), { o0: 0 });
        s += M("gap", 130, 236, R(-70, -26, 140, 52, C.rose, { rx: 8, s: C.red, sw: 2.5 }) + T(0, 1, "GAP 115k", { z: 16, f: C.red }), { o0: 0 });
        s += M("st", 296, 236, stamp("ALL DELAYED", C.slate, 15) + P("M-66 0 H66", C.red, 4), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 3; i++) V(S, "d" + i, true, { del: 0.3 + i * 0.2, x: 0 });
        V(S, "rec", b === 1);
        V(S, "gap", b === 2); V(S, "st", b === 2, { r: -6, del: 0.4 });
      }),
      /* 8. Lines 23-24. The reporting cycle turns; any unresolved amount keeps four fields until the next review.
         Adapted from: 093 Process-Para (rotate, wait, finish)
         https://lottiefiles.com/free-animation/process-para-qujCEQ2AKT  */
      BD(23, 24, "093", function () {
        var s = "", ND = [["OWNERS UPDATE", C.green, 0], ["FINANCE EXAMINES", C.orange, 90], ["COMMITTEE REVIEWS", C.navy, 180], ["ACTIONS RETURN", C.plum, 270]];
        s += M("ring", 200, 160, G(O(0, 0, 86, "none", { s: C.slate, sw: 3, da: "10 8" }), "", "spin"));
        ND.forEach(function (n, i) {
          var a = (n[2] - 90) * Math.PI / 180, x = 200 + 86 * Math.cos(a) * 1.55, y = 160 + 86 * Math.sin(a) * 0.95;
          s += M("n" + i, x, y, L(0, 0, n[0], { z: 13, s: n[1] }), { o0: 0 });
        });
        s += M("dot", 200, 160, O(0, -86, 9, C.gold, { s: C.ink, sw: 2 }), { o0: 0 });
        s += M("card", 200, 160, R(-120, -70, 240, 140, C.amber, { rx: 12, s: C.orange, sw: 3 }) + T(0, -50, "UNRESOLVED AMOUNT", { z: 14, f: C.orange }) +
          T(-100, -20, "EXPLANATION", { z: 13, a: "start", f: C.ink }) + T(-100, 4, "OWNER", { z: 13, a: "start", f: C.ink }) +
          T(-100, 28, "ACTION", { z: 13, a: "start", f: C.ink }) + T(-100, 52, "NEXT REVIEW", { z: 13, a: "start", f: C.ink }) +
          G(okb(8), "translate(90 -20)") + G(okb(8), "translate(90 4)") + G(okb(8), "translate(90 28)") + G(okb(8), "translate(90 52)"), { o0: 0 });
        return s;
      }, function (b, S) {
        S("ring", { o: b === 0 ? 1 : 0.25 });
        for (var i = 0; i < 4; i++) V(S, "n" + i, b === 0, { del: i * 0.25 });
        V(S, "dot", b === 0); S("dot", { o: b === 0 ? 1 : 0, r: b === 0 ? 270 : 0, dur: 2.4 });
        V(S, "card", b === 1, { e: "back" });
      }),
      /* 9. Lines 25-26. A copier that only repeats the business case is refused; the register must be visible, testable, accountable.
         Adapted from: 085 Creative process Motion design creative project (idea moved through iterations)
         https://www.behance.net/gallery/190390491/Creative-process-Motion-design-creative-project  */
      BD(25, 26, "085", function () {
        var s = "";
        s += M("cp", 120, 160, R(-70, -40, 140, 80, C.slate, { rx: 8 }) + R(-60, -56, 120, 18, C.mist, { rx: 3 }) + T(0, 0, "COPY", { z: 15, f: C.white }));
        s += M("in", 44, 100, doc(40, 50, C.navy) + T(0, -36, "BUSINESS CASE", { z: 11, f: C.navy }));
        s += M("out", 200, 214, doc(40, 50, C.slate), { o0: 0 });
        s += M("x", 200, 214, nob(14), { o0: 0 });
        s += M("ch", 300, 140, stamp("CHALLENGE IT", C.orange, 16), { o0: 0 });
        var Q = [["VISIBLE", C.navy, O(0, 0, 14, "none", { s: C.navy, sw: 3 }) + O(0, 0, 5, C.navy)], ["TESTABLE", C.teal, mag(12, C.teal)], ["ACCOUNTABLE", C.green, person(C.green, 0.8)]];
        Q.forEach(function (q, i) {
          s += M("q" + i, 72 + i * 128, 150, O(0, 0, 40, C.white, { s: q[1], sw: 3 }) + G(q[2], "scale(1.3)") + T(0, 62, q[0], { z: 14, f: q[1] }), { o0: 0 });
        });
        s += M("life", 200, 262, L(0, 0, "FOR THE PROGRAMME'S LIFE", { z: 13, s: C.ink, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("cp", { o: b === 0 ? 1 : 0 }); S("in", { o: b === 0 ? 1 : 0, x: b === 0 ? 30 : 0 });
        V(S, "out", b === 0, { x: b === 0 ? 0 : -60, del: 0.5 }); V(S, "x", b === 0, { del: 0.9 }); V(S, "ch", b === 0, { r: -6, del: 1 });
        for (var i = 0; i < 3; i++) V(S, "q" + i, b === 1, { del: i * 0.25, e: "back" });
        V(S, "life", b === 1, { del: 0.8 });
      }),
      /* 10. Lines 27-28. The committee sees 620 and 505 with qualifications; the verified column stays locked and separate.
         Adapted from: 118 Flat Infographics by zevs (charts animated into place)
         https://motionarray.com/after-effects-templates/flat-infographics-17982/  */
      BD(27, 28, "118", function () {
        var s = "", base = 236, k = 150 / 620;
        s += P("M30 " + base + " H370", C.ink, 2.5);
        s += M("c1", 80, base, R(-36, -150, 72, 150, C.navy, { rx: 4 }) + T(0, -136, "620", { z: 16, f: C.white }) + T(0, 16, "PROMISED", { z: 13, f: C.navy }), { c: "ob", o0: 0 });
        s += M("c2", 180, base, R(-36, -505 * k, 72, 505 * k, C.green, { rx: 4 }) + T(0, -505 * k + 14, "505", { z: 16, f: C.white }) + T(0, 16, "TRACKED", { z: 13, f: C.green }), { c: "ob", o0: 0 });
        s += M("f1", 80, 70, T(0, 0, "*", { z: 22, f: C.orange }), { o0: 0 });
        s += M("f2", 180, 100, T(0, 0, "*", { z: 22, f: C.orange }), { o0: 0 });
        s += M("q", 140, 268, T(0, 0, "* WITH QUALIFICATIONS", { z: 12, f: C.orange }), { o0: 0 });
        s += M("c3", 310, base, R(-50, -150, 100, 150, "rgba(92,111,132,.06)", { rx: 6, s: C.slate, sw: 2.5, da: "6 4" }) + G(R(-14, -8, 28, 22, C.gold, { rx: 3 }) +
          P("M-8 -8 V-16 a8 8 0 0 1 16 0 V-8", C.gold, 3), "translate(0 -80)") + T(0, -40, "PENDING", { z: 13, f: C.slate }) + T(0, 16, "VERIFIED", { z: 13, f: C.slate }), { c: "ob", o0: 0 });
        s += M("wall", 246, 150, R(-3, -90, 6, 176, C.ink, { rx: 2 }), { o0: 0 });
        s += M("sep", 310, 62, L(0, 0, "KEPT SEPARATE", { z: 13, s: C.slate }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("c1", { o: 1, sy: 1 }); S("c2", { o: 1, sy: 1, del: 0.2 });
        V(S, "f1", true, { del: 0.6 }); V(S, "f2", true, { del: 0.7 }); V(S, "q", true, { del: 0.8 });
        S("c3", { o: b === 1 ? 1 : 0, sy: b === 1 ? 1 : 0.02 }); V(S, "wall", b === 1, { del: 0.3 }); V(S, "sep", b === 1, { del: 0.5 });
      })
    ]
  });
  /* ==================================================================
     W13O3c  THE NEXT PROGRAMME MUST NOT REPEAT THE ARGUMENT  (30 lines)
     Rebuilt first (audit 3.6/10: 15 WEAK, 11 MISMATCH). Ten boards: the
     argument loop, governance designed before approval for a future
     billing programme, the current claims kept apart, the reporting
     cycle, the step into phase 10, and the closing message.
     ================================================================== */
  scene("W13O3c", {
    label: "The next programme must not repeat the argument",
    accent: C.green,
    bgc: "#edf3ee",
    bg: function () { return backdrop("#e5efe8", "#f6f2ea", 274, "#e4dece"); },
    tags: ["Don't repeat the argument", "620 promised, 505 tracked", "Honest now, stronger next", "Benefits governance",
      "Next: corporate billing", "Outcomes and evidence first", "An owner with authority", "Finance challenges early",
      "Agree before it's lost", "Baseline + estimate", "Faster admin \u2260 savings", "Not the front-desk trap",
      "Ownership, measures, decisions", "Beyond implementation", "Keep three claims apart", "Different evidence each",
      "Seven recent go-lives", "Timing is no guarantee", "A reporting cycle", "Finance, then committee",
      "Reward honesty", "Open until resolved", "Into phase 10", "Realise, then sustain",
      "Ownership past closure", "Gains can fade", "Accountable management", "Your forum case",
      "Demonstrate, don't announce", "Evidence and ownership"],
    boards: [
      /* 1. Lines 0-2. Two directors bounce the same argument; the figures; today's honest note versus tomorrow's blueprint.
         Adapted from: 131 Transition end (move, wait, then recolour, chained)
         https://observablehq.com/@d3/transition-end  */
      BD(0, 2, "131", function () {
        var s = "";
        s += M("dA", 60, 236, person(C.navy, 1.5) + T(0, 36, "PROGRAMME", { z: 12, f: C.navy }));
        s += M("dB", 340, 236, person(C.orange, 1.5) + T(0, 36, "FINANCE", { z: 12, f: C.orange }));
        s += M("loop", 200, 150, G(P("M-110 0 A110 50 0 1 1 110 0 A110 50 0 1 1 -110 0", C.slate, 3, { da: "10 8", c: "march" })));
        s += M("lA", 120, 104, L(0, 0, "TIMING", { z: 14, s: C.navy }));
        s += M("lB", 280, 104, L(0, 0, "PROOF?", { z: 14, s: C.orange }));
        s += M("ball", 90, 150, O(0, 0, 10, C.gold, { s: C.ink, sw: 2 }));
        s += M("again", 200, 150, L(0, 0, "AGAIN AND AGAIN", { z: 14, s: C.red }), { o0: 0 });
        s += M("fig", 200, 196, L(-60, 0, "620 PROMISED", { z: 14, s: C.navy }) + L(64, 0, "505 TRACKED", { z: 14, s: C.green }) +
          T(0, 30, "NOT FULLY VERIFIED", { z: 12, f: C.red }), { o0: 0 });
        s += M("today", 104, 150, R(-80, -66, 160, 132, C.white, { rx: 10, s: C.navy, sw: 2.5 }) + T(0, -46, "TODAY", { z: 15, f: C.navy }) +
          doc(50, 60, C.navy) + T(0, 50, "HONEST EXPLANATION", { z: 11, f: C.navy }), { o0: 0 });
        s += M("next", 296, 150, R(-80, -66, 160, 132, "#e3edf7", { rx: 10, s: C.green, sw: 2.5 }) + T(0, -46, "NEXT TIME", { z: 15, f: C.green }) +
          P("M-40 -20 H40 V30 H-40 Z M-40 0 H40 M0 -20 V30", C.green, 2) + T(0, 50, "STRONGER START", { z: 11, f: C.green }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("dA", { o: b <= 1 ? 1 : 0 }); S("dB", { o: b <= 1 ? 1 : 0 });
        S("loop", { o: b <= 1 ? 1 : 0 }); S("lA", { o: b <= 1 ? 1 : 0 }); S("lB", { o: b <= 1 ? 1 : 0 });
        S("ball", { x: b === 0 ? 220 : 0, o: b <= 1 ? 1 : 0, dur: 1.6 });
        V(S, "again", b === 0, { del: 0.8 });
        V(S, "fig", b === 1);
        V(S, "today", b === 2); V(S, "next", b === 2, { del: 0.3 });
      }),
      /* 2. Lines 3-5. The governance chain; a future billing programme; its approval gate needs outcomes and evidence first.
         Adapted from: 092 process connecting (connections drawn and joined)
         https://lottiefiles.com/free-animation/process-fmpDUgNx8K  */
      BD(3, 5, "092", function () {
        var s = "", ND = [["OBJECTIVE", C.navy], ["OWNER", C.green], ["EVIDENCE", C.teal], ["FINANCE", C.orange], ["COMMITTEE", C.plum]];
        s += D("ch", "M44 130 H356", C.ink, 3);
        ND.forEach(function (n, i) {
          s += M("n" + i, 44 + i * 78, 130, O(0, 0, 22, C.white, { s: n[1], sw: 4 }) + O(0, 0, 7, n[1]) + T(0, i % 2 ? -38 : 38, n[0], { z: 13, f: n[1] }), { o0: 0 });
        });
        s += M("gov", 200, 228, L(0, 0, "VALUE MADE ACCOUNTABLE", { z: 15, s: C.ink, f: C.ink }), { o0: 0 });
        s += M("bill", 92, 168, R(-70, -76, 140, 152, C.white, { rx: 10, s: C.navy, sw: 2.5 }) + T(0, -56, "NEXT PROGRAMME", { z: 11, f: C.slate }) +
          T(0, -36, "CORPORATE", { z: 15, f: C.navy }) + T(0, -16, "BILLING", { z: 15, f: C.navy }) + G(doc(44, 54, C.navy), "translate(0 34)"), { o0: 0 });
        s += M("ill", 92, 262, T(0, 0, "PROPOSED EXAMPLE", { z: 11, f: C.slate }), { o0: 0 });
        s += M("gate", 290, 168, R(-90, -80, 18, 160, C.ink, { rx: 3 }) + R(72, -80, 18, 160, C.ink, { rx: 3 }) + R(-90, -94, 180, 18, C.ink, { rx: 3 }) +
          T(0, -85, "APPROVAL", { z: 11, f: C.white }) + L(0, -30, "OUTCOMES?", { z: 13, s: C.navy }) + L(0, 10, "EVIDENCE?", { z: 13, s: C.teal }) + G(keyI(1, C.gold), "translate(0 50)"), { o0: 0 });
        return s;
      }, function (b, S) {
        S("ch", { d: b === 0 ? 1 : 0, o: b === 0 ? 1 : 0 });
        for (var i = 0; i < 5; i++) V(S, "n" + i, b === 0, { del: 0.2 + i * 0.2, e: "back" });
        V(S, "gov", b === 0, { del: 1.2 });
        V(S, "bill", b >= 1); V(S, "ill", b >= 1, { del: 0.3 });
        V(S, "gate", b === 2, { del: 0.2 });
        S("bill", { o: b >= 1 ? 1 : 0, x: b === 2 ? 0 : 108 });
      }),
      /* 3. Lines 6-9. The billing card passes four preparation stations: owner, finance test, early agreement, baseline with estimate.
         Adapted from: 101 3D Camera Factory (item progressed through production stations)
         https://lottiefiles.com/free-animation/3d-camera-factory-2I4Nonw7Ad  */
      BD(6, 9, "101", function () {
        var s = "", ST = [["OWNER|", C.green, person(C.green, 0.9)], ["FINANCE|TEST", C.orange, mag(12, C.orange)], ["AGREED|EARLY", C.navy, G(R(-12, -14, 24, 28, C.white, { rx: 2, s: C.navy, sw: 2 }) + tick(0.7, C.navy, 3))],
          ["BASELINE|+ ESTIMATE", C.teal, G(R(-3, -18, 6, 30, C.teal) + P("M3 -16 L16 -12 L3 -8", C.teal, 2, { f: C.teal }))]];
        s += R(20, 180, 360, 12, C.slate, { rx: 6 }) + P("M24 186 H376", C.white, 2, { da: "8 8", c: "march" });
        ST.forEach(function (st, i) {
          var x = 62 + i * 92;
          var nm = st[0].split("|");
          s += M("s" + i, x, 120, R(-42, -50, 84, 100, C.white, { rx: 10, s: st[1], sw: 3 }) + G(st[2], "translate(0 -14)") + T(0, 22, nm[0], { z: 11, f: st[1] }) +
            T(0, 38, nm[1], { z: 11, f: st[1] }), { o0: 0 });
          s += M("ok" + i, x + 30, 82, okb(9), { o0: 0 });
        });
        s += M("card", 62, 214, R(-30, -18, 60, 36, C.white, { rx: 6, s: C.navy, sw: 2.5 }) + T(0, 1, "BILLING", { z: 11, f: C.navy }));
        s += M("auth", 62, 262, L(0, 0, "AUTHORITY OVER DECISIONS", { z: 13, s: C.green }), { o0: 0 });
        s += M("chal", 154, 262, L(0, 0, "CHALLENGE METHOD", { z: 13, s: C.orange }), { o0: 0 });
        s += M("lost", 246, 262, L(0, 0, "BEFORE ASSUMPTIONS FADE", { z: 13, s: C.navy }), { o0: 0 });
        s += M("be", 290, 262, L(0, 0, "START + VALUE LOGIC", { z: 13, s: C.teal }), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 4; i++) { V(S, "s" + i, i <= b, { del: i === b ? 0.1 : 0, e: "back" }); V(S, "ok" + i, i < b || (i === b), { del: i === b ? 1 : 0, e: "back" }); }
        S("card", { x: b * 92, dur: 1.1, del: 0.2 });
        V(S, "auth", b === 0, { del: 0.6, x: 60 }); V(S, "chal", b === 1, { del: 0.6, x: 40 }); V(S, "lost", b === 2, { del: 0.6, x: -46 });
        V(S, "be", b === 3, { del: 0.6, x: -40 });
      }),
      /* 4. Lines 10-12. Faster administration is not lower spending; the front-desk trap; three supports for the answer.
         Adapted from: 078 Data Workflow Animation (nodes and links activated in sequence)
         https://dribbble.com/shots/27247003-Data-Workflow-Animation  */
      BD(10, 12, "078", function () {
        var s = "";
        s += M("adm", 110, 140, O(0, 0, 46, C.white, { s: C.teal, sw: 3 }) + G(clock(28, C.teal)) + T(0, 66, "FASTER ADMIN", { z: 14, f: C.teal }), { o0: 0 });
        s += M("ne", 200, 140, T(0, 0, "\u2260", { z: 40, f: C.red }), { o0: 0 });
        s += M("sp", 290, 140, O(0, 0, 46, C.white, { s: C.navy, sw: 3 }) + G(coin(28, C.gold, "AED", 13)) + T(0, 66, "LOWER SPEND", { z: 14, f: C.navy }), { o0: 0 });
        s += M("fd", 200, 140, R(-170, -70, 340, 140, C.white, { rx: 12, s: C.red, sw: 3 }) + T(0, -50, "FRONT-DESK TRAP", { z: 15, f: C.red }) +
          G(person(C.navy, 0.9), "translate(-110 4)") + G(person(C.navy, 0.9), "translate(-80 4)") + G(clock(16, C.teal), "translate(-30 0)") +
          arrowH(-10, 0, 40, 0, C.ink, 3) + G(coin(18, C.gold, "?", 14), "translate(70 0)") + T(10, 46, "CAPACITY CALLED SAVINGS", { z: 13, f: C.red }), { o0: 0 });
        s += M("nt", 200, 236, L(0, 0, "NOT AGAIN", { z: 15, s: C.red }), { o0: 0 });
        var PL = [["OWNERSHIP", C.green, 80], ["MEASURES", C.teal, 200], ["DECISIONS", C.navy, 320]];
        PL.forEach(function (p, i) {
          s += M("p" + i, p[2], 250, R(-46, -150, 92, 150, C.white, { rx: 6, s: p[1], sw: 3 }) + T(0, -75, p[0], { z: 13, f: p[1] }), { c: "ob", o0: 0 });
        });
        s += M("lnk", 200, 82, L(0, 0, "IMPROVEMENT \u2192 MONEY", { z: 14, s: C.ink, f: C.ink }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "adm", b === 0); V(S, "ne", b === 0, { del: 0.4, e: "back" }); V(S, "sp", b === 0, { del: 0.2 });
        V(S, "fd", b === 1); V(S, "nt", b === 1, { del: 0.6 });
        for (var i = 0; i < 3; i++) S("p" + i, { o: b === 2 ? 1 : 0, sy: b === 2 ? 1 : 0.02, del: i * 0.2 });
        V(S, "lnk", b === 2, { del: 0.7 });
      }),
      /* 5. Lines 13-15. Responsibility runs past implementation; the three current claims stay in separate lanes; merging blurs them.
         Adapted from: 106 Supply Chain and logistics (dispatch, transit and receipt connected)
         https://lottiefiles.com/free-animation/supply-chain-and-logistics-8PtoYRCbiu  */
      BD(13, 15, "106", function () {
        var s = "";
        s += M("tl", 0, 0, P("M30 150 H370", C.ink, 3) + O(140, 150, 9, C.white, { s: C.slate, sw: 3 }) + T(140, 174, "GO-LIVE", { z: 12, f: C.slate }) +
          O(330, 150, 9, C.white, { s: C.green, sw: 3 }) + T(330, 174, "VALUE SEEN", { z: 12, f: C.green }), { o0: 0 });
        s += D("own", "M40 120 H350", C.green, 5);
        s += M("ot", 200, 96, L(0, 0, "BUSINESS ACTION CONTINUES", { z: 13, s: C.green }), { o0: 0 });
        var LN = [["LABOUR", C.navy, "STAFFING + SPEND"], ["RETENTION", C.green, "PRICING + ATTRIBUTION"], ["PENALTY", C.plum, "CONTINGENT EXPOSURE"]];
        LN.forEach(function (l, i) {
          var y = 90 + i * 64;
          s += M("l" + i, 200, y, R(-180, -24, 360, 48, C.white, { rx: 10, s: l[1], sw: 2.5 }) + T(-164, 1, l[0], { z: 14, a: "start", f: l[1] }) +
            T(170, 1, l[2], { z: 12, a: "end", f: C.ink }), { o0: 0 });
        });
        s += M("mg", 200, 154, R(-120, -80, 240, 160, "rgba(220,226,234,.88)", { rx: 14 }) + T(0, -10, "ONE TOTAL", { z: 18, f: C.slate }) +
          T(0, 18, "UNCERTAINTY HIDDEN", { z: 13, f: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "tl", b === 0); S("own", { d: b === 0 ? 1 : 0, o: b === 0 ? 1 : 0, dur: 1.6 }); V(S, "ot", b === 0, { del: 0.5 });
        for (var i = 0; i < 3; i++) V(S, "l" + i, b >= 1, { del: i * 0.2, y: b === 2 ? (1 - i) * 20 : 0, s: b === 2 ? 0.9 : 1, o: b === 2 ? 0.25 : b >= 1 ? 1 : 0 });
        V(S, "mg", b === 2, { del: 0.6 });
      }),
      /* 6. Lines 16-17. Seven recent go-lives deserve examination; an hourglass does not guarantee the rest.
         Adapted from: 135 Timeline by The Creators (milestones with a travelling marker)
         https://motionarray.com/after-effects-templates/timeline/  */
      BD(16, 17, "135", function () {
        var s = "";
        s += P("M24 116 H376", C.ink, 3) + R(256, 106, 120, 20, "rgba(192,80,42,.15)", { rx: 4 }) + T(316, 140, "LAST 4 MONTHS", { z: 13, f: C.orange });
        var X = [40, 70, 100, 130, 160, 190, 220, 268, 286, 304, 322, 340, 358, 370];
        for (var i = 0; i < 14; i++) s += M("h" + i, X[i], i >= 7 ? (i % 2 ? 94 : 72) : 94, hotel(i >= 7 ? C.orange : C.navy, 0.48), { o0: 0 });
        s += M("ex", 130, 196, L(0, 0, "EXAMINE TIMING", { z: 15, s: C.orange }), { o0: 0 });
        s += M("hg", 110, 214, hourglass(C.orange, 1.6), { o0: 0 });
        s += M("ng", 270, 214, L(0, 0, "NO GUARANTEE", { z: 16, s: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        for (var i = 0; i < 14; i++) V(S, "h" + i, true, { del: i * 0.05, e: "back" });
        V(S, "ex", b === 0, { del: 0.8 });
        V(S, "hg", b === 1, { r: b === 1 ? 180 : 0, dur: 1.4 }); V(S, "ng", b === 1, { del: 0.4 });
      }),
      /* 7. Lines 18-21. The reporting cycle: owners update, finance examines, committee acts; honesty rewarded; open items stay visible.
         Adapted from: 125 Infographics Dashboard (pie arc grows)
         https://lottiefiles.com/free-animation/infographics-dashboard-X6P5rVLZAB  */
      BD(18, 21, "125", function () {
        var s = "";
        s += M("ring", 200, 156, O(0, 0, 70, "none", { s: C.mist, sw: 16 }));
        s += M("a1", 200, 156, P("M0 -70 A70 70 0 0 1 70 0", C.green, 16), { o0: 0 });
        s += M("a2", 200, 156, P("M70 0 A70 70 0 0 1 0 70", C.orange, 16), { o0: 0 });
        s += M("a3", 200, 156, P("M0 70 A70 70 0 0 1 -70 0", C.navy, 16), { o0: 0 });
        s += M("t1", 314, 98, L(0, 0, "OWNERS UPDATE", { z: 13, s: C.green }), { o0: 0 });
        s += M("t2", 314, 214, L(0, 0, "FINANCE EXAMINES", { z: 13, s: C.orange }), { o0: 0 });
        s += M("t3", 86, 214, L(0, 0, "COMMITTEE ACTS", { z: 13, s: C.navy }), { o0: 0 });
        s += M("ctr", 200, 156, T(0, 0, "CYCLE", { z: 15, f: C.ink }));
        s += M("hon", 200, 156, O(0, 0, 50, C.white, { s: C.green, sw: 3 }) + G(trophy(C.gold, 1.2), "translate(0 -6)") + T(0, 30, "HONESTY", { z: 12, f: C.green }), { o0: 0 });
        s += M("hl", 200, 62, L(0, 0, "NO HIDING SHORTFALLS", { z: 13, s: C.green }), { o0: 0 });
        s += M("open", 200, 156, R(-90, -34, 180, 68, C.amber, { rx: 10, s: C.orange, sw: 3 }) + T(0, -10, "OPEN CLAIM", { z: 15, f: C.orange }) +
          T(0, 14, "STAYS VISIBLE", { z: 12, f: C.orange }), { o0: 0 });
        s += M("exits", 0, 0, L(70, 266, "RECOGNISE", { z: 13, s: C.green }) + L(200, 266, "REVISE", { z: 13, s: C.navy }) + L(330, 266, "NOT REALISED", { z: 13, s: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "a1", true, { del: 0.2 }); V(S, "t1", b <= 1, { del: 0.4 });
        V(S, "a2", b >= 1, { del: 0.2 }); V(S, "t2", b <= 1 && b >= 1, { del: 0.4 });
        V(S, "a3", b >= 1, { del: 0.6 }); V(S, "t3", b === 1, { del: 0.8 });
        S("ctr", { o: b <= 1 ? 1 : 0 });
        V(S, "hon", b === 2, { e: "back" }); V(S, "hl", b === 2, { del: 0.4 });
        V(S, "open", b === 3, { e: "back" }); V(S, "exits", b === 3, { del: 0.4 });
        S("ring", { r: b * 30, dur: 1 });
      }),
      /* 8. Lines 22-25. Phase 9 hands over to phase 10; an owner stays past closure; without one, achieved gains drift down.
         Adapted from: 130 Animated line chart lesson (time series traced left to right)
         https://observablehq.com/@d3/learn-d3-animation  */
      BD(22, 25, "130", function () {
        var s = "";
        var PH = [["8", "IMPLEMENT", C.slate, 70], ["9", "REALIZE VALUE", C.green, 200], ["10", "SUSTAIN", C.navy, 330]];
        PH.forEach(function (p, i) {
          s += M("ph" + i, p[3], 100, O(0, 0, 26, C.white, { s: p[2], sw: 3 }) + T(0, 1, p[0], { z: 20, f: p[2] }) + T(0, 44, p[1], { z: 13, f: p[2] }));
        });
        s += P("M98 100 H172 M228 100 H302", C.ink, 2.5, { da: "6 5" });
        s += M("d9", 150, 196, L(0, 0, "WHAT WAS ACHIEVED", { z: 14, s: C.green }), { o0: 0 });
        s += M("d10", 312, 196, L(0, 0, "KEEP AND IMPROVE", { z: 14, s: C.navy }), { o0: 0 });
        s += M("ax", 0, 0, P("M30 268 H370 M30 268 V170", C.ink, 2) + P("M200 170 V268", C.slate, 2, { da: "5 4" }) + T(200, 160, "PROJECT CLOSES", { z: 12, f: C.slate }), { o0: 0 });
        s += D("keep", "M30 220 L120 200 L200 196 L290 192 L370 190", C.green, 4);
        s += D("fade", "M200 196 L250 208 L300 228 L370 250", C.red, 4);
        s += M("own", 262, 176, person(C.green, 0.9) + T(22, -4, "OWNER", { z: 12, a: "start", f: C.green }), { o0: 0 });
        s += M("noo", 330, 232, L(0, 0, "NO OWNER", { z: 12, s: C.red }), { o0: 0 });
        return s;
      }, function (b, S) {
        S("ph0", { o: b <= 1 ? 1 : 0.4 }); S("ph1", { s: b === 0 ? 1.15 : 1 }); S("ph2", { s: b === 0 || b === 1 ? 1.1 : 1 });
        V(S, "d9", b === 1); V(S, "d10", b === 1, { del: 0.3 });
        V(S, "ax", b >= 2);
        S("keep", { d: b >= 2 ? 1 : 0, dur: 1.4 }); V(S, "own", b >= 2, { del: 0.8 });
        S("fade", { d: b === 3 ? 1 : 0, dur: 1.4, del: 0.3 }); V(S, "noo", b === 3, { del: 1.2 });
        S("keep", { d: b >= 2 ? 1 : 0, o: b === 3 ? 0.35 : 1 }); S("own", { o: b === 2 ? 1 : 0 });
      }),
      /* 9. Lines 26-27. Four pillars of accountable management; the forum applies the same reasoning to another organisation.
         Adapted from: 083 The Process Architectural Motion (structure built in layers)
         https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion  */
      BD(26, 27, "083", function () {
        var s = "", PL = [["OWNERS", C.green], ["MEASURES", C.teal], ["FINANCE", C.orange], ["GOVERNANCE", C.navy]];
        s += M("roof", 200, 80, P("M-170 24 L0 -26 L170 24 Z", C.ink, 3, { f: C.sand }) + T(0, 6, "ACCOUNTABLE MANAGEMENT", { z: 12, f: C.ink }), { o0: 0 });
        PL.forEach(function (p, i) {
          s += M("p" + i, 74 + i * 84, 258, R(-32, -150, 64, 150, C.white, { rx: 4, s: p[1], sw: 3 }) + T(0, -75, p[0], { z: 11, f: p[1] }), { c: "ob", o0: 0 });
        });
        s += M("base", 200, 264, R(-176, -6, 352, 12, C.ink, { rx: 3 }), { o0: 0 });
        s += M("org", 110, 170, R(-60, -80, 120, 160, C.sky, { rx: 4, s: C.navy, sw: 2.5 }) +
          [0, 1, 2, 3, 4, 5].map(function (i) { return R(-44 + (i % 2) * 52, -64 + Math.floor(i / 2) * 44, 36, 28, C.white, { rx: 2 }); }).join("") +
          T(0, 98, "ANOTHER ORGANISATION", { z: 12, f: C.navy }), { o0: 0 });
        s += M("kit", 290, 160, R(-80, -70, 160, 140, C.white, { rx: 12, s: C.green, sw: 3 }) + T(0, -50, "SAME REASONING", { z: 13, f: C.green }) +
          T(0, -24, "CLAIM", { z: 12, f: C.ink }) + T(0, -6, "EVIDENCE", { z: 12, f: C.ink }) + T(0, 12, "ATTRIBUTION", { z: 12, f: C.ink }) + T(0, 30, "OWNERSHIP", { z: 12, f: C.ink }) +
          T(0, 52, "THEIR OWN FACTS", { z: 11, f: C.orange }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "base", b === 0);
        for (var i = 0; i < 4; i++) S("p" + i, { o: b === 0 ? 1 : 0, sy: b === 0 ? 1 : 0.02, del: 0.2 + i * 0.15 });
        V(S, "roof", b === 0, { del: 0.9, y: b === 0 ? 0 : -20 });
        V(S, "org", b === 1); V(S, "kit", b === 1, { del: 0.3, x: b === 1 ? 0 : 30 });
      }),
      /* 10. Lines 28-29. Announcing completion is refused; demonstrating value is chosen; evidence and ownership sit at the centre.
         Adapted from: 094 Process - Success (activity transforms into a check)
         https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP  */
      BD(28, 29, "094", function () {
        var s = "";
        s += M("meg", 104, 150, R(-86, -70, 172, 140, C.white, { rx: 12, s: C.slate, sw: 2.5 }) + P("M-40 -10 L10 -30 V30 L-40 10 Z M-52 -10 H-40 V10 H-52 Z", C.slate, 2.5, { f: C.mist }) +
          T(0, 50, "ANNOUNCE DONE", { z: 14, f: C.slate }), { o0: 0 });
        s += M("mx", 104, 150, P("M-70 -54 L70 54", C.red, 5), { o0: 0 });
        s += M("dem", 296, 150, R(-86, -70, 172, 140, C.pale, { rx: 12, s: C.green, sw: 3 }) + G(okb(26), "translate(0 -12)") +
          T(0, 50, "DEMONSTRATE VALUE", { z: 13, f: C.green }), { o0: 0 });
        s += M("tg", 200, 156, O(0, 0, 110, C.white, { s: C.mist, sw: 2 }) + O(0, 0, 80, C.pale, { s: C.green, sw: 3 }) + O(0, 0, 46, C.green), { o0: 0 });
        s += M("tx", 200, 156, T(0, -10, "EVIDENCE", { z: 15, f: C.white }) + T(0, 12, "OWNERSHIP", { z: 12, f: C.white }), { o0: 0 });
        s += M("rimL", 200, 61, T(0, 0, "BENEFITS MANAGEMENT", { z: 12, f: C.green }), { o0: 0 });
        s += M("end", 200, 284, T(0, 0, "WEEK 13 COMPLETE", { z: 12, f: C.slate }), { o0: 0 });
        return s;
      }, function (b, S) {
        V(S, "meg", b === 0); V(S, "mx", b === 0, { del: 0.6 }); V(S, "dem", b === 0, { del: 0.3, e: "back" });
        V(S, "tg", b === 1, { e: "back" }); V(S, "tx", b === 1, { del: 0.4 }); V(S, "rimL", b === 1, { del: 0.6 }); V(S, "end", b === 1, { del: 0.8 });
      })
    ]
  });
  installCSS("w13-claude-v2-part4");
})();
// END FILE: w13-claude-v2-part4.js

