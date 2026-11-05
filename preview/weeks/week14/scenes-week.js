// FILE: w14-claude-v2-part1.js
// OPER621 · Business Process Management · Week 14 · The Sustainable Performance Phase
// Animated teaching scenes — Claude v2 rebuild — PART 1 of 4 — sections: W14O2b, W14O1d, W14O2c
// Lowest audit scores first: W14O2b (1.9), W14O1d (2.0), W14O2c (2.1) (GPT-6 content audit).
//
// CONTRACT (unchanged): window.VL_SCENES = window.VL_SCENES || {};
//   VL_SCENES['<secId>'] = { build(el), step(i, n), reset() }
// - Standalone: defines every helper it uses, registers its own scenes and appends its own
//   rules, scoped under .vls-w14-<secId>, to the single <style id="vl-sc-w14">.
// - One narration line = one explicit visual state. Each section is a sequence of 8-11
//   distinct visuals (a new visual every 2-4 lines); every line has its own 2-4 word caption.
// - step(i, n): when n equals the section's narration count, line i maps 1:1; otherwise it
//   is mapped proportionally. State is re-derived on every call, so seeking is safe.
// - window.gsap is used for pop/shake flourishes when present; a built-in rAF tween engine
//   and CSS transitions/keyframes are used otherwise.
// - prefers-reduced-motion: every state is applied instantly, no loops or keyframes.
// - Stage: 360 x 300 viewBox (meet), full-bleed paper background; the figure fills a phone
//   strip above the text or the left 60% on a laptop. Text is never smaller than 13 px.
// - Qasr figures only as documented in Exhibit 14; proposals and illustrations are labelled.
// - Original code: no part of the live scenes or of the previous Claude edition is reused.
(function () {
  "use strict";
  var PART = "p1";
  var IDS = ["W14O2b", "W14O1d", "W14O2c"];
  /* ==================================================================
     ENGINE (self-contained; every helper used by the scenes is defined here)
     ================================================================== */
  var W = window, NS = "http://www.w3.org/2000/svg", STYLE_ID = "vl-sc-w14";
  window.VL_SCENES = window.VL_SCENES || {};
  var VL = window.VL_SCENES;
  var KF = "vlsW14v2" + PART;            /* keyframe prefix, unique per part */
  var SEC_CSS = [];

  function esc(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fin(v, d) { v = Number(v); return isFinite(v) ? v : (d === undefined ? 0 : d); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function r1(v) { return Math.round(v * 10) / 10; }
  function reduced() {
    try { return !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    catch (e) { return false; }
  }
  function gsapLib() {
    var g = W.gsap;
    return g && typeof g.to === "function" && typeof g.fromTo === "function" ? g : null;
  }
  function now() { return (W.performance && W.performance.now) ? W.performance.now() : Date.now(); }
  var RAF = (W.requestAnimationFrame && W.requestAnimationFrame.bind(W)) || function (f) { return setTimeout(function () { f(now()); }, 16); };
  var CAF = (W.cancelAnimationFrame && W.cancelAnimationFrame.bind(W)) || clearTimeout;
  var EASE = {
    lin: function (t) { return t; },
    io: function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; },
    out: function (t) { return 1 - Math.pow(1 - t, 3); },
    back: function (t) { var c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }
  };

  /* ---------- SVG string builders ---------- */
  function at(o) {
    var s = "", k, v;
    for (k in o) {
      if (!Object.prototype.hasOwnProperty.call(o, k)) continue;
      v = o[k];
      if (v === undefined || v === null || v === false) continue;
      s += " " + (k === "c" ? "class" : k) + '="' + esc(typeof v === "number" ? r1(v) : v) + '"';
    }
    return s;
  }
  function E(tag, o, inner) { return "<" + tag + at(o || {}) + ">" + (inner || "") + "</" + tag + ">"; }
  function G(c, inner, o) { o = o || {}; if (c) o.c = c; return E("g", o, inner); }
  function rect(x, y, w, h, c, o) { o = o || {}; o.x = x; o.y = y; o.width = Math.max(0, w); o.height = Math.max(0, h); if (c) o.c = c; return E("rect", o); }
  function circ(x, y, r, c, o) { o = o || {}; o.cx = x; o.cy = y; o.r = Math.max(0, r); if (c) o.c = c; return E("circle", o); }
  function line(x1, y1, x2, y2, c, o) { o = o || {}; o.x1 = x1; o.y1 = y1; o.x2 = x2; o.y2 = y2; if (c) o.c = c; return E("line", o); }
  function path(d, c, o) { o = o || {}; o.d = d; if (c) o.c = c; return E("path", o); }
  function T(x, y, s, c, o) { o = o || {}; o.x = x; o.y = y; o.c = "tx " + (c || "t14"); return E("text", o, esc(s)); }
  /* reveal group: visible for k in range r ("2" = from 2 on, "1-3" = 1..3) */
  function R(r, fx, inner) { return '<g class="rv" data-r="' + r + '" data-fx="' + (fx || "f") + '">' + inner + "</g>"; }
  /* movable group, positioned by CSS transform (never by the transform attribute) */
  function M(n, x, y, inner, cls) {
    return '<g class="' + (cls || "mv") + " n-" + n + '" style="transform:translate(' + r1(x) + "px," + r1(y) + 'px)">' + inner + "</g>";
  }
  function WK(n, x, y, inner) { return M(n, x, y, inner, "wk"); }
  function tw(s, fs) {
    var w = 0, i, ch; s = String(s);
    for (i = 0; i < s.length; i++) {
      ch = s.charAt(i);
      w += /[A-Z%]/.test(ch) ? 0.7 : /[0-9]/.test(ch) ? 0.6 : /[mwMW]/.test(ch) ? 0.88 : /[il.,:;'|!\s]/.test(ch) ? 0.3 : /[ftjr]/.test(ch) ? 0.42 : 0.58;
    }
    return w * fs * 1.12;
  }
  var CHIP = {
    n: ["fN", "fW"], o: ["fO", "fW"], g: ["fG", "fW"], d: ["fD", "fI"], m: ["fM", "fW"], i: ["fI", "fW"],
    p: ["fP sN", "fN"], po: ["fP sO", "fO"], pg: ["fP sG", "fG"], pm: ["fP sM", "fM"], l: ["fL sN", "fN"]
  };
  function chipW(s, fs) { fs = fs || 14; return tw(s, fs) + fs * 1.5; }
  function chip(x, y, s, v, fs, o) {
    var k = CHIP[v || "p"]; fs = fs || 14;
    var w = chipW(s, fs), h = fs * 1.85;
    return G("", rect(x - w / 2, y - h / 2, w, h, k[0], { rx: h / 2, "stroke-width": 1.8 }) +
      T(x, y + fs * 0.36, s, "nh " + k[1], { style: "font-size:" + fs + "px" }), o);
  }
  function card(x, y, w, h, v, o) { var k = CHIP[v || "p"]; o = o || {}; o.rx = o.rx || 10; o["stroke-width"] = o["stroke-width"] || 1.8; return rect(x, y, w, h, k[0], o); }
  function fsz(n) { return { style: "font-size:" + n + "px" }; }
  function TX(x, y, s, n, c, o) { o = o || {}; o.style = "font-size:" + n + "px" + (o.style ? ";" + o.style : ""); return T(x, y, s, c || "fI", o); }
  function arrow(x1, y1, x2, y2, c, w) {
    c = c || "sN"; w = w || 3;
    var a = Math.atan2(y2 - y1, x2 - x1), h = w * 3.1;
    var bx = x2 - h * Math.cos(a), by = y2 - h * Math.sin(a), px = -Math.sin(a) * h * 0.62, py = Math.cos(a) * h * 0.62;
    return line(x1, y1, bx, by, c, { "stroke-width": w, "stroke-linecap": "round" }) +
      path("M" + r1(x2) + " " + r1(y2) + " L" + r1(bx + px) + " " + r1(by + py) + " L" + r1(bx - px) + " " + r1(by - py) + " Z", c.replace(/s([A-Z])/, "f$1"));
  }
  function carrow(x1, y1, cx, cy, x2, y2, c, w, dash) {
    c = c || "sN"; w = w || 3;
    var a = Math.atan2(y2 - cy, x2 - cx), h = w * 3.1;
    var bx = x2 - h * Math.cos(a), by = y2 - h * Math.sin(a), px = -Math.sin(a) * h * 0.62, py = Math.cos(a) * h * 0.62;
    return path("M" + r1(x1) + " " + r1(y1) + " Q" + r1(cx) + " " + r1(cy) + " " + r1(bx) + " " + r1(by), c + " f0" + (dash ? " flowd" : ""), { "stroke-width": w, "stroke-linecap": "round" }) +
      path("M" + r1(x2) + " " + r1(y2) + " L" + r1(bx + px) + " " + r1(by + py) + " L" + r1(bx - px) + " " + r1(by - py) + " Z", c.replace(/s([A-Z])/, "f$1"));
  }
  function tick(x, y, s, c) {
    return path("M" + r1(x - 6 * s) + " " + r1(y) + " l" + r1(4 * s) + " " + r1(4.6 * s) + " l" + r1(8.5 * s) + " " + r1(-9.5 * s), (c || "sW") + " f0",
      { "stroke-width": Math.max(2.2, 2.7 * s), "stroke-linecap": "round", "stroke-linejoin": "round" });
  }
  function cross(x, y, s, c) {
    return path("M" + r1(x - 5 * s) + " " + r1(y - 5 * s) + " l" + r1(10 * s) + " " + r1(10 * s) + " M" + r1(x + 5 * s) + " " + r1(y - 5 * s) + " l" + r1(-10 * s) + " " + r1(10 * s),
      (c || "sW") + " f0", { "stroke-width": Math.max(2.2, 2.7 * s), "stroke-linecap": "round" });
  }
  function okB(x, y, r) { return circ(x, y, r, "fG") + tick(x, y + r * 0.08, r / 9.5); }
  function noB(x, y, r) { return circ(x, y, r, "fO") + cross(x, y, r / 10.5); }
  function qB(x, y, r) { var f = Math.max(13, r * 1.3); return circ(x, y, Math.max(r, 9.5), "fM") + TX(x, y + f * 0.36, "?", f, "nh fW"); }
  function strike(x1, y1, x2, y2) { return line(x1, y1, x2, y2, "sO", { "stroke-width": 5, "stroke-linecap": "round", opacity: 0.92 }); }
  function person(x, y, s, col, o) {
    s = s || 1; col = col || "N"; o = o || {};
    var h = path("M" + r1(x - 12 * s) + " " + r1(y) + " C" + r1(x - 12 * s) + " " + r1(y - 23 * s) + " " + r1(x + 12 * s) + " " + r1(y - 23 * s) + " " + r1(x + 12 * s) + " " + r1(y) + " Z", "f" + col);
    h += circ(x, y - 27 * s, 8.5 * s, "f" + col);
    if (o.clip) h += rect(x + 5 * s, y - 15 * s, 10 * s, 13 * s, "fW sN", { rx: 1.5, "stroke-width": 1.3 });
    if (o.tie) h += path("M" + r1(x) + " " + r1(y - 17 * s) + " l" + r1(-2.5 * s) + " " + r1(5 * s) + " l" + r1(2.5 * s) + " " + r1(7 * s) + " l" + r1(2.5 * s) + " " + r1(-7 * s) + " Z", "fO");
    if (o.ghost) h = G("ghost", h);
    return h;
  }
  function crowd(x, y, n, gap, s, col) { var h = "", i; for (i = 0; i < n; i++) h += person(x + i * gap, y, s, col); return h; }
  function chair(x, y, s, c) {
    s = s || 1; c = c || "N";
    return rect(x - 13 * s, y - 38 * s, 6 * s, 38 * s, "f" + c, { rx: 2 }) + rect(x - 13 * s, y - 16 * s, 28 * s, 6 * s, "f" + c, { rx: 2 }) +
      rect(x + 10 * s, y - 10 * s, 4.5 * s, 10 * s, "f" + c) + rect(x - 9 * s, y - 10 * s, 4.5 * s, 10 * s, "f" + c);
  }
  function doc(x, y, w, h, c, n, lc) {
    var f = Math.min(10, w * 0.25), s, i;
    s = path("M" + r1(x) + " " + r1(y) + " h" + r1(w - f) + " l" + r1(f) + " " + r1(f) + " v" + r1(h - f) + " h" + r1(-w) + " Z", c || "fW sN", { "stroke-width": 1.6 });
    for (i = 0; i < (n === undefined ? 3 : n); i++)
      s += line(x + w * 0.16, y + h * 0.32 + i * h * 0.18, x + w * (i % 2 ? 0.64 : 0.82), y + h * 0.32 + i * h * 0.18, lc || "sM", { "stroke-width": 2, "stroke-linecap": "round" });
    return s;
  }
  function cal(x, y, s, head, txt, tc) {
    var w = 36 * s, h = 36 * s;
    return rect(x - w / 2, y - h / 2, w, h, "fW sN", { rx: 4 * s, "stroke-width": 1.6 }) + rect(x - w / 2, y - h / 2, w, 10 * s, head || "fO", { rx: 3 * s }) +
      rect(x - w / 2, y - h / 2 + 6 * s, w, 4 * s, head || "fO") + (txt ? TX(x, y + 11 * s, txt, 15 * s, "nh " + (tc || "fN")) : "");
  }
  function hotel(x, y, s, c, mark) {
    var w = 24 * s, h = 30 * s, i, j, out = rect(x - w / 2, y - h, w, h, c || "fN", { rx: 2 });
    for (i = 0; i < 3; i++) for (j = 0; j < 2; j++) out += rect(x - w / 2 + 4 * s + j * 10 * s, y - h + 4 * s + i * 7.5 * s, 6 * s, 4.5 * s, "fW", { opacity: 0.85 });
    out += rect(x - 3 * s, y - 6 * s, 6 * s, 6 * s, "fD");
    if (mark) out += circ(x + w / 2, y - h, 6.5 * s, mark === "o" ? "fO" : "fG") + (mark === "o" ? "" : tick(x + w / 2, y - h + 0.5, 0.5 * s));
    return out;
  }
  function gearP(cx, cy, r, teeth) {
    var d = "", i, n = teeth || 8, a, a2, ro = r, ri = r * 0.78;
    for (i = 0; i < n; i++) {
      a = i / n * Math.PI * 2; a2 = (i + 0.5) / n * Math.PI * 2;
      d += (i ? "L" : "M") + r1(cx + ro * Math.cos(a - 0.18)) + " " + r1(cy + ro * Math.sin(a - 0.18)) + " L" + r1(cx + ro * Math.cos(a + 0.18)) + " " + r1(cy + ro * Math.sin(a + 0.18)) +
        " L" + r1(cx + ri * Math.cos(a2 - 0.2)) + " " + r1(cy + ri * Math.sin(a2 - 0.2)) + " L" + r1(cx + ri * Math.cos(a2 + 0.2)) + " " + r1(cy + ri * Math.sin(a2 + 0.2));
    }
    return d + " Z";
  }
  function gear(cx, cy, r, c, cls) { return G(cls || "", path(gearP(cx, cy, r, Math.max(6, Math.round(r / 2.6))), c || "fN") + circ(cx, cy, r * 0.32, "fP")); }
  /* small pictograms centred on x,y (about 26*s wide) */
  function icon(n, x, y, s, c) {
    s = s || 1; var h = "";
    switch (n) {
      case "passport": h = rect(x - 9 * s, y - 12 * s, 18 * s, 24 * s, c || "fN", { rx: 2.5 }) + circ(x, y - 2 * s, 5 * s, "f0 sD", { "stroke-width": 1.6 }) + line(x - 5 * s, y + 7 * s, x + 5 * s, y + 7 * s, "sD", { "stroke-width": 1.6 }); break;
      case "coin": h = circ(x, y, 11 * s, c || "fD") + circ(x, y, 7.5 * s, "f0 sW", { "stroke-width": 1.6 }) + rect(x - 1.6 * s, y - 5 * s, 3.2 * s, 10 * s, "fW", { rx: 1 }); break;
      case "star": h = path("M" + r1(x) + " " + r1(y - 12 * s) + " l" + r1(3.5 * s) + " " + r1(7.5 * s) + " l" + r1(8 * s) + " " + r1(0.8 * s) + " l" + r1(-6 * s) + " " + r1(5.5 * s) + " l" + r1(1.8 * s) + " " + r1(8 * s) + " l" + r1(-7.3 * s) + " " + r1(-4.2 * s) + " l" + r1(-7.3 * s) + " " + r1(4.2 * s) + " l" + r1(1.8 * s) + " " + r1(-8 * s) + " l" + r1(-6 * s) + " " + r1(-5.5 * s) + " l" + r1(8 * s) + " " + r1(-0.8 * s) + " Z", c || "fD"); break;
      case "desk": h = rect(x - 13 * s, y - 2 * s, 26 * s, 5 * s, c || "fN", { rx: 1.5 }) + rect(x - 11 * s, y + 3 * s, 4 * s, 9 * s, c || "fN") + rect(x + 7 * s, y + 3 * s, 4 * s, 9 * s, c || "fN") + circ(x, y - 11 * s, 4.5 * s, "fO") + path("M" + r1(x - 7 * s) + " " + r1(y - 2 * s) + " q" + r1(7 * s) + " " + r1(-9 * s) + " " + r1(14 * s) + " 0", "fO"); break;
      case "kiosk": h = rect(x - 8 * s, y - 13 * s, 16 * s, 22 * s, c || "fN", { rx: 2.5 }) + rect(x - 5.5 * s, y - 10 * s, 11 * s, 9 * s, "fB") + rect(x - 3 * s, y + 9 * s, 6 * s, 4 * s, c || "fN"); break;
      case "shield": h = path("M" + r1(x) + " " + r1(y - 12 * s) + " l" + r1(10 * s) + " " + r1(4 * s) + " v" + r1(6 * s) + " c0 " + r1(7 * s) + " " + r1(-5 * s) + " " + r1(11 * s) + " " + r1(-10 * s) + " " + r1(13 * s) + " c" + r1(-5 * s) + " " + r1(-2 * s) + " " + r1(-10 * s) + " " + r1(-6 * s) + " " + r1(-10 * s) + " " + r1(-13 * s) + " v" + r1(-6 * s) + " Z", c || "fG") + tick(x, y, 0.55 * s); break;
      case "bell": h = path("M" + r1(x - 10 * s) + " " + r1(y + 6 * s) + " q0 " + r1(-17 * s) + " " + r1(10 * s) + " " + r1(-17 * s) + " q" + r1(10 * s) + " 0 " + r1(10 * s) + " " + r1(17 * s) + " l" + r1(3 * s) + " " + r1(4 * s) + " h" + r1(-26 * s) + " Z", c || "fD") + circ(x, y + 12 * s, 3 * s, "fN"); break;
      case "mag": h = circ(x - 3 * s, y - 3 * s, 8.5 * s, "fW sN", { "stroke-width": 3 * s }) + line(x + 3.5 * s, y + 3.5 * s, x + 11 * s, y + 11 * s, c || "sN", { "stroke-width": 4.5 * s, "stroke-linecap": "round" }); break;
      case "wrench": h = path("M" + r1(x - 10 * s) + " " + r1(y + 10 * s) + " L" + r1(x + 4 * s) + " " + r1(y - 4 * s), c || "sN", { "stroke-width": 5 * s, "stroke-linecap": "round" }) + circ(x + 6 * s, y - 6 * s, 6 * s, "f0 " + (c || "sN"), { "stroke-width": 3.5 * s }); break;
      case "clock": h = circ(x, y, 12 * s, "fW sN", { "stroke-width": 2.4 }) + line(x, y, x, y - 8 * s, "sN", { "stroke-width": 2.4, "stroke-linecap": "round" }) + line(x, y, x + 6 * s, y + 3 * s, c || "sO", { "stroke-width": 2.4, "stroke-linecap": "round" }); break;
      case "flag": h = line(x - 8 * s, y - 13 * s, x - 8 * s, y + 13 * s, "sN", { "stroke-width": 2.5 }) + path("M" + r1(x - 8 * s) + " " + r1(y - 13 * s) + " h" + r1(18 * s) + " l" + r1(-4 * s) + " " + r1(5 * s) + " l" + r1(4 * s) + " " + r1(5 * s) + " h" + r1(-18 * s) + " Z", c || "fO"); break;
      case "key": h = circ(x - 7 * s, y, 6 * s, "f0 " + (c || "sD"), { "stroke-width": 3.4 * s }) + path("M" + r1(x - 1 * s) + " " + r1(y) + " h" + r1(13 * s) + " v" + r1(5 * s) + " M" + r1(x + 7 * s) + " " + r1(y) + " v" + r1(4 * s), (c || "sD") + " f0", { "stroke-width": 3.4 * s, "stroke-linecap": "round" }); break;
      case "book": h = path("M" + r1(x) + " " + r1(y - 9 * s) + " q" + r1(-7 * s) + " " + r1(-4 * s) + " " + r1(-13 * s) + " 0 v" + r1(19 * s) + " q" + r1(6 * s) + " " + r1(-4 * s) + " " + r1(13 * s) + " 0 q" + r1(7 * s) + " " + r1(-4 * s) + " " + r1(13 * s) + " 0 v" + r1(-19 * s) + " q" + r1(-6 * s) + " " + r1(-4 * s) + " " + r1(-13 * s) + " 0 Z", c || "fN") + line(x, y - 9 * s, x, y + 10 * s, "sW", { "stroke-width": 1.4 }); break;
      case "mega": h = path("M" + r1(x - 11 * s) + " " + r1(y - 4 * s) + " h" + r1(6 * s) + " l" + r1(14 * s) + " " + r1(-8 * s) + " v" + r1(24 * s) + " l" + r1(-14 * s) + " " + r1(-8 * s) + " h" + r1(-6 * s) + " Z", c || "fO"); break;
      case "trophy": h = path("M" + r1(x - 10 * s) + " " + r1(y - 12 * s) + " h" + r1(20 * s) + " v" + r1(6 * s) + " q0 " + r1(10 * s) + " " + r1(-10 * s) + " " + r1(10 * s) + " q" + r1(-10 * s) + " 0 " + r1(-10 * s) + " " + r1(-10 * s) + " Z", c || "fD") + rect(x - 2 * s, y + 4 * s, 4 * s, 5 * s, c || "fD") + rect(x - 7 * s, y + 9 * s, 14 * s, 4 * s, "fN", { rx: 1 }); break;
      case "bulb": h = circ(x, y - 3 * s, 9 * s, c || "fD") + rect(x - 4.5 * s, y + 5 * s, 9 * s, 6 * s, "fN", { rx: 1.5 }); break;
      case "scissors": h = circ(x - 7 * s, y + 6 * s, 4.5 * s, "f0 sO", { "stroke-width": 2.6 }) + circ(x + 7 * s, y + 6 * s, 4.5 * s, "f0 sO", { "stroke-width": 2.6 }) + line(x - 4 * s, y + 3 * s, x + 6 * s, y - 12 * s, "sN", { "stroke-width": 2.6, "stroke-linecap": "round" }) + line(x + 4 * s, y + 3 * s, x - 6 * s, y - 12 * s, "sN", { "stroke-width": 2.6, "stroke-linecap": "round" }); break;
      case "gavel": h = rect(x - 12 * s, y - 10 * s, 14 * s, 8 * s, c || "fN", { rx: 2, transform: "rotate(-30 " + r1(x - 5 * s) + " " + r1(y - 6 * s) + ")" }) + line(x - 3 * s, y - 4 * s, x + 9 * s, y + 9 * s, "sN", { "stroke-width": 3.4, "stroke-linecap": "round" }) + rect(x - 12 * s, y + 9 * s, 16 * s, 4 * s, "fN", { rx: 1 }); break;
      case "eye": h = path("M" + r1(x - 13 * s) + " " + r1(y) + " q" + r1(13 * s) + " " + r1(-13 * s) + " " + r1(26 * s) + " 0 q" + r1(-13 * s) + " " + r1(13 * s) + " " + r1(-26 * s) + " 0 Z", "fW sN", { "stroke-width": 2 }) + circ(x, y, 5 * s, c || "fN"); break;
      case "spark": h = path("M" + r1(x) + " " + r1(y - 13 * s) + " l" + r1(4 * s) + " " + r1(9 * s) + " l" + r1(9 * s) + " " + r1(4 * s) + " l" + r1(-9 * s) + " " + r1(4 * s) + " l" + r1(-4 * s) + " " + r1(9 * s) + " l" + r1(-4 * s) + " " + r1(-9 * s) + " l" + r1(-9 * s) + " " + r1(-4 * s) + " l" + r1(9 * s) + " " + r1(-4 * s) + " Z", c || "fO"); break;
      case "pin": h = path("M" + r1(x) + " " + r1(y + 12 * s) + " q" + r1(-11 * s) + " " + r1(-12 * s) + " " + r1(-11 * s) + " " + r1(-20 * s) + " a" + r1(11 * s) + " " + r1(11 * s) + " 0 0 1 " + r1(22 * s) + " 0 q0 " + r1(8 * s) + " " + r1(-11 * s) + " " + r1(20 * s) + " Z", c || "fO") + circ(x, y - 8 * s, 4 * s, "fW"); break;
      case "chart": h = rect(x - 12 * s, y - 12 * s, 24 * s, 24 * s, "fW sN", { rx: 3, "stroke-width": 1.6 }) + path("M" + r1(x - 8 * s) + " " + r1(y + 6 * s) + " L" + r1(x - 2 * s) + " " + r1(y - 1 * s) + " L" + r1(x + 2 * s) + " " + r1(y + 3 * s) + " L" + r1(x + 8 * s) + " " + r1(y - 7 * s), (c || "sO") + " f0", { "stroke-width": 2.4, "stroke-linecap": "round", "stroke-linejoin": "round" }); break;
      case "binder": h = rect(x - 10 * s, y - 13 * s, 20 * s, 26 * s, c || "fN", { rx: 2 }) + rect(x - 6 * s, y - 8 * s, 12 * s, 7 * s, "fW", { rx: 1 }) + circ(x, y + 7 * s, 2.6 * s, "fW"); break;
      case "ice": h = path("M" + r1(x) + " " + r1(y - 13 * s) + " v" + r1(26 * s) + " M" + r1(x - 11 * s) + " " + r1(y - 6.5 * s) + " l" + r1(22 * s) + " " + r1(13 * s) + " M" + r1(x - 11 * s) + " " + r1(y + 6.5 * s) + " l" + r1(22 * s) + " " + r1(-13 * s), (c || "sB") + " f0", { "stroke-width": 3, "stroke-linecap": "round" }); break;
      case "fire": h = path("M" + r1(x) + " " + r1(y - 13 * s) + " q" + r1(11 * s) + " " + r1(10 * s) + " " + r1(8 * s) + " " + r1(19 * s) + " q" + r1(-3 * s) + " " + r1(6 * s) + " " + r1(-8 * s) + " " + r1(6 * s) + " q" + r1(-9 * s) + " 0 " + r1(-9 * s) + " " + r1(-9 * s) + " q0 " + r1(-7 * s) + " " + r1(9 * s) + " " + r1(-16 * s) + " Z", c || "fO"); break;
      case "puzzle": h = path("M" + r1(x - 11 * s) + " " + r1(y - 11 * s) + " h" + r1(7 * s) + " a" + r1(4 * s) + " " + r1(4 * s) + " 0 0 1 " + r1(8 * s) + " 0 h" + r1(7 * s) + " v" + r1(7 * s) + " a" + r1(4 * s) + " " + r1(4 * s) + " 0 0 1 0 " + r1(8 * s) + " v" + r1(7 * s) + " h" + r1(-22 * s) + " Z", c || "fD"); break;
      case "gear": h = path(gearP(x, y, 12 * s, 8), c || "fN") + circ(x, y, 4.2 * s, "fP"); break;
      default: h = circ(x, y, 10 * s, c || "fN");
    }
    return h;
  }
  /* bar chart with grow-up reveals; items: {v, l, r, c, t} */
  function bars(o) {
    var s = "", n = o.items.length, i, it, x, bh, w = n * (o.bw + o.gap) - o.gap;
    for (i = 0; i < n; i++) {
      it = o.items[i]; x = o.x + i * (o.bw + o.gap); bh = it.v / o.max * o.h;
      s += R(it.r, "gy", rect(x, o.base - bh, o.bw, bh, it.c || "fN", { rx: Math.min(6, o.bw / 5) }));
      s += R(it.r, "up", TX(x + o.bw / 2, o.base - bh - 8, it.t || String(it.v), o.fs || 22, it.tc || "fI"));
      s += R(it.r, "f", TX(x + o.bw / 2, o.base + 19, it.l, o.ls || 14, "fN"));
    }
    return s + line(o.x - 8, o.base, o.x + w + 8, o.base, "sN", { "stroke-width": 2.4, "stroke-linecap": "round" });
  }
  function tag(s, v) { return chip(348 - chipW(s, 13) / 2, 19, s, v || "pm", 13); }
  function loopRing(cx, cy, r, w, c) {
    return path("M" + r1(cx - r) + " " + r1(cy) + " a" + r + " " + r + " 0 1 1 " + r1(2 * r) + " 0 a" + r + " " + r + " 0 1 1 " + r1(-2 * r) + " 0", (c || "sG") + " f0 flowd", { "stroke-width": w || 3 });
  }
  function ringPts(cx, cy, r, n, a0) { var p = [], i, a; for (i = 0; i <= n; i++) { a = (a0 || -90) * Math.PI / 180 + i / n * Math.PI * 2; p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } return p; }

  /* ---------- CSS (scoped under .vls-w14-<secId>, one shared <style id="vl-sc-w14">) ---------- */
  function sc(ids, sel) { return ids.map(function (id) { return ".vls-w14-" + id + (sel ? " " + sel : ""); }).join(","); }
  function baseCSS(ids) {
    var R2 = [];
    function add(sel, body) { R2.push(sc(ids, sel) + "{" + body + "}"); }
    R2.push(sc(ids, "") + "{--n:var(--vl-sc-navy,#1f4e79);--o:var(--vl-sc-orange,#c0502a);--g:var(--vl-sc-green,#317c61);--p:var(--vl-sc-paper,#fbf8f1);" +
      "--i:var(--vl-sc-ink,#1b2a3a);--b:var(--vl-sc-blue,#dbe7f2);--m:#7f98ad;--d:#d39b45;--l:#edf3f6;--s:#efe5d0;--w:#ffffff;--r:#a8321f;" +
      "position:relative;display:block;width:100%;height:100%;min-height:0;overflow:hidden;box-sizing:border-box;font-family:inherit;color:var(--i);}");
    add("> svg", "display:block;width:100%;height:100%;overflow:hidden;");
    add(".tx", "font-family:inherit;font-weight:800;text-anchor:middle;fill:var(--i);paint-order:stroke fill;stroke:var(--p);stroke-width:3.6px;stroke-linejoin:round;letter-spacing:.01em;");
    add(".tx.nh", "stroke:none;"); add(".tx.s", "text-anchor:start;"); add(".tx.e", "text-anchor:end;"); add(".tx.w6", "font-weight:650;");
    [13, 14, 15, 16, 18, 20, 22, 24, 28, 32, 40, 48, 56].forEach(function (n) { add(".t" + n, "font-size:" + n + "px;"); });
    var col = { N: "n", O: "o", G: "g", P: "p", I: "i", B: "b", M: "m", D: "d", L: "l", S: "s", W: "w", R: "r" };
    Object.keys(col).forEach(function (k) { add(".f" + k, "fill:var(--" + col[k] + ");"); add(".s" + k, "stroke:var(--" + col[k] + ");"); });
    add(".f0", "fill:none;");
    add(".pn", "transition:opacity .45s ease,transform .6s cubic-bezier(.2,.8,.2,1),visibility 0s linear 0s;");
    add(".pn.hid", "opacity:0;transform:translateY(10px);visibility:hidden;pointer-events:none;transition:opacity .35s ease,transform .4s ease,visibility 0s linear .4s;");
    add(".rv", "transition:opacity .5s ease,transform .75s cubic-bezier(.2,.9,.3,1.15);transform-box:fill-box;transform-origin:50% 50%;");
    add(".rv.off", "opacity:0;pointer-events:none;");
    add(".rv.off[data-fx=up]", "transform:translateY(16px);"); add(".rv.off[data-fx=dn]", "transform:translateY(-16px);");
    add(".rv.off[data-fx=l]", "transform:translateX(-24px);"); add(".rv.off[data-fx=r]", "transform:translateX(24px);");
    add(".rv.off[data-fx=pop]", "transform:scale(.35);"); add(".rv.off[data-fx=stamp]", "transform:scale(1.9) rotate(-10deg);");
    add(".rv[data-fx=gx]", "transform-origin:0% 50%;"); add(".rv.off[data-fx=gx]", "transform:scaleX(0);");
    add(".rv[data-fx=gy]", "transform-origin:50% 100%;"); add(".rv.off[data-fx=gy]", "transform:scaleY(0);");
    add(".rv[data-fx=dr] .dw", "stroke-dasharray:1 1;stroke-dashoffset:0;transition:stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1);");
    add(".rv.off[data-fx=dr] .dw", "stroke-dashoffset:1;"); add(".rv[data-fx=dr]", "transition:opacity .3s ease;");
    add(".mv", "transition:transform 1s cubic-bezier(.3,.9,.25,1.05);");
    add(".wk", "transition:none;");
    add(".dim", "opacity:.28;transition:opacity .5s ease;"); add(".hl", "transition:fill .5s ease,stroke .5s ease,opacity .5s ease;");
    add(".ghost", "opacity:.32;");
    add(".flowd", "stroke-dasharray:7 7;animation:" + KF + "Flow 1.2s linear infinite;");
    add(".spin", "transform-box:fill-box;transform-origin:50% 50%;animation:" + KF + "Spin 4s linear infinite;");
    add(".spinr", "transform-box:fill-box;transform-origin:50% 50%;animation:" + KF + "Spin 4s linear infinite reverse;");
    add(".bob", "animation:" + KF + "Bob 2.6s ease-in-out infinite;");
    add(".blink", "animation:" + KF + "Blink 1.3s ease-in-out infinite;");
    add(".wob", "transform-box:fill-box;transform-origin:50% 15%;animation:" + KF + "Wob 1.1s ease-in-out infinite;");
    add(".rise", "animation:" + KF + "Rise 2.2s ease-in infinite;");
    add(".k-pop", "transform-box:fill-box;transform-origin:50% 50%;animation:" + KF + "Pop .6s cubic-bezier(.3,1.6,.5,1) 1;");
    add(".k-shake", "transform-box:fill-box;transform-origin:50% 50%;animation:" + KF + "Shake .7s ease 1;");
    add(".dot", "transition:fill .45s ease,opacity .45s ease;");
    add(".kick", "text-anchor:start;font-size:12.5px;font-weight:850;letter-spacing:.12em;fill:var(--n);stroke:none;opacity:.85;");
    add(".capr", "fill:var(--n);"); add(".capt", "fill:#fff;stroke:none;font-size:15px;font-weight:800;text-anchor:middle;letter-spacing:.01em;");
    add(".capg", "transform-box:fill-box;transform-origin:50% 50%;"); add(".capg.go", "animation:" + KF + "Cap .5s cubic-bezier(.3,1.5,.5,1) 1;");
    add(".prog", "fill:var(--o);transform-box:fill-box;transform-origin:0 50%;transition:transform .6s ease;"); add(".progbg", "fill:var(--n);opacity:.1;");
    R2.push(sc(ids, "").split(",").map(function (s) { return s + ".inst *"; }).join(",") + "{transition:none!important;}");
    R2.push("@keyframes " + KF + "Flow{to{stroke-dashoffset:-28}}");
    R2.push("@keyframes " + KF + "Spin{to{transform:rotate(360deg)}}");
    R2.push("@keyframes " + KF + "Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}");
    R2.push("@keyframes " + KF + "Blink{0%,100%{opacity:1}50%{opacity:.35}}");
    R2.push("@keyframes " + KF + "Wob{0%,100%{transform:rotate(0)}25%{transform:rotate(14deg)}75%{transform:rotate(-14deg)}}");
    R2.push("@keyframes " + KF + "Rise{0%{transform:translateY(6px);opacity:0}30%{opacity:1}100%{transform:translateY(-14px);opacity:0}}");
    R2.push("@keyframes " + KF + "Pop{0%{transform:scale(.7)}100%{transform:scale(1)}}");
    R2.push("@keyframes " + KF + "Shake{0%{transform:rotate(-7deg)}25%{transform:rotate(6deg)}50%{transform:rotate(-4deg)}75%{transform:rotate(2deg)}100%{transform:rotate(0)}}");
    R2.push("@keyframes " + KF + "Cap{0%{transform:scale(.88)}100%{transform:scale(1)}}");
    R2.push("@media (prefers-reduced-motion:reduce){" + sc(ids, "*") + "{animation:none!important;transition:none!important;}}");
    return R2.join("\n");
  }
  function addCSS(key, css) {
    if (typeof document === "undefined") return;
    var st = document.getElementById(STYLE_ID);
    if (!st) { st = document.createElement("style"); st.id = STYLE_ID; (document.head || document.documentElement).appendChild(st); }
    var mark = "/*" + key + "*/";
    if ((st.textContent || "").indexOf(mark) < 0) st.textContent += "\n" + mark + "\n" + css + "\n";
  }
  function installCSS() {
    addCSS("vls-w14-v2-" + PART + "-base", baseCSS(IDS));
    addCSS("vls-w14-v2-" + PART + "-scenes", SEC_CSS.join("\n"));
  }

  /* ---------- tween + ambient loop helpers ---------- */
  function tween(el, key, from, to, dur, ease, apply, inst) {
    if (!el) return;
    var st = el["_vt" + key];
    if (st) CAF(st);
    if (inst || !dur || reduced()) { el["_vv" + key] = to; apply(to); return; }
    var a = from === undefined || from === null ? fin(el["_vv" + key], to) : from, t0 = now(), d = dur * 1000, e = EASE[ease] || EASE.io;
    function f() {
      var t = clamp((now() - t0) / d, 0, 1), v = a + (to - a) * e(t);
      el["_vv" + key] = v; apply(v);
      el["_vt" + key] = t < 1 ? RAF(f) : 0;
    }
    el["_vt" + key] = RAF(f);
  }
  function along(pts, t) {
    var L = 0, seg = [], i, d;
    for (i = 1; i < pts.length; i++) { d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
    var s = clamp(t, 0, 1) * L;
    for (i = 0; i < seg.length; i++) {
      if (s <= seg[i] || i === seg.length - 1) { var u = seg[i] ? clamp(s / seg[i], 0, 1) : 1; return [lerp(pts[i][0], pts[i + 1][0], u), lerp(pts[i][1], pts[i + 1][1], u)]; }
      s -= seg[i];
    }
    return pts[pts.length - 1];
  }
  /* GSAP (when present) drives entrance timing/easing through a proxy; styles stay ours */
  function gsapEnter(el, fx, delay) {
    var g = gsapLib(); if (!g) return false;
    var o = { t: 0 };
    el.style.transition = "none";
    function ap() {
      var t = o.t, u = 1 - t, tr = "none";
      if (fx === "pop") tr = "scale(" + (0.35 + 0.65 * t).toFixed(3) + ")";
      else if (fx === "stamp") tr = "scale(" + (1.9 - 0.9 * t).toFixed(3) + ") rotate(" + (-10 * u).toFixed(2) + "deg)";
      else if (fx === "up") tr = "translateY(" + (16 * u).toFixed(2) + "px)";
      else if (fx === "dn") tr = "translateY(" + (-16 * u).toFixed(2) + "px)";
      else if (fx === "l") tr = "translateX(" + (-24 * u).toFixed(2) + "px)";
      else if (fx === "r") tr = "translateX(" + (24 * u).toFixed(2) + "px)";
      else if (fx === "gx") tr = "scaleX(" + Math.max(0, t).toFixed(3) + ")";
      else if (fx === "gy") tr = "scaleY(" + Math.max(0, t).toFixed(3) + ")";
      el.style.transform = tr; el.style.opacity = String(Math.min(1, Math.max(0, t * 1.7)));
    }
    ap();
    try {
      g.to(o, { t: 1, delay: (delay || 0) / 1000, duration: fx === "stamp" ? 0.5 : 0.85,
        ease: fx === "stamp" ? "power3.in" : (fx === "gx" || fx === "gy") ? "power3.out" : "back.out(1.7)",
        onUpdate: ap, onComplete: function () { el.style.transition = ""; el.style.transform = ""; el.style.opacity = ""; } });
    } catch (e) { el.style.transition = ""; el.style.transform = ""; el.style.opacity = ""; return false; }
    return true;
  }
  function setT(el, x, y, s, rot) {
    if (el) el.style.transform = "translate(" + r1(x) + "px," + r1(y) + "px)" + (rot ? " rotate(" + r1(rot) + "deg)" : "") + (s !== undefined && s !== 1 ? " scale(" + s + ")" : "");
  }

  /* ---------- scene factory: build(el) / step(i, n) / reset() ---------- */
  function scene(def) {
    var root = null, cur = -1, curP = -1, loops = [], raf = 0, t0 = 0, panels = [], gen = 0;
    var N = def.lines.length;
    function lineFor(i, n) {
      n = Math.max(1, Math.floor(fin(n, N))); i = clamp(Math.floor(fin(i, 0)), 0, n - 1);
      if (n === N) return i;
      if (n <= 1) return 0;
      return clamp(Math.round(i * (N - 1) / (n - 1)), 0, N - 1);
    }
    function stopLoops() { loops = []; if (raf) { CAF(raf); raf = 0; } }
    function frame() {
      raf = 0;
      if (!root || !root.isConnected || !loops.length) return;
      var t = (now() - t0) / 1000;
      for (var j = 0; j < loops.length; j++) { try { loops[j](t); } catch (e) { /* keep running */ } }
      raf = RAF(frame);
    }
    function startLoops() { if (raf || !loops.length || reduced()) return; t0 = now(); raf = RAF(frame); }
    function api(pg, k, inst, fresh) {
      var A = {
        k: k, inst: inst, fresh: fresh, root: pg,
        q: function (s) { return pg.querySelector(s); },
        qa: function (s) { return Array.prototype.slice.call(pg.querySelectorAll(s)); },
        cls: function (s, c, on) { A.qa(s).forEach(function (n) { n.classList.toggle(c, !!on); }); },
        attr: function (s, a, v) { A.qa(s).forEach(function (n) { n.setAttribute(a, String(v)); }); },
        text: function (s, v) { A.qa(s).forEach(function (n) { n.textContent = String(v); }); },
        fill: function (s, v) { A.qa(s).forEach(function (n) { n.style.fill = v; }); },
        op: function (s, v) { A.qa(s).forEach(function (n) { n.style.opacity = String(v); }); },
        pos: function (s, x, y, sc2, rot) { A.qa(s).forEach(function (n) { setT(n, x, y, sc2, rot); }); },
        num: function (s, to, o) {
          o = o || {};
          A.qa(s).forEach(function (n) {
            tween(n, "n", o.from, to, o.dur === undefined ? 1.2 : o.dur, "out", function (v) {
              n.textContent = (o.pre || "") + (o.dec ? v.toFixed(o.dec) : String(Math.round(v))) + (o.suf || "");
            }, inst);
          });
        },
        bar: function (s, attr, to, o) {
          o = o || {};
          A.qa(s).forEach(function (n) {
            tween(n, attr, o.from, to, o.dur === undefined ? 1.2 : o.dur, "io", function (v) { n.setAttribute(attr, r1(v)); if (o.y0 !== undefined) n.setAttribute("y", r1(o.y0 - v)); }, inst);
          });
        },
        walk: function (s, pts, dur, o) {
          o = o || {};
          var n = A.q(s); if (!n) return;
          if (inst || reduced()) { var e = along(pts, o.loop ? (o.rest === undefined ? 1 : o.rest) : 1); setT(n, e[0], e[1], o.scale); return; }
          if (o.loop) {
            var off = o.offset || 0;
            loops.push(function (t) { var u = ((t + off) % dur) / dur, p = along(pts, u); setT(n, p[0], p[1], o.scale); });
            startLoops(); return;
          }
          tween(n, "w", 0, 1, dur, o.ease || "io", function (v) { var p = along(pts, v); setT(n, p[0], p[1], o.scale); }, false);
        },
        turn: function (s, x, y, to, o) {
          o = o || {};
          A.qa(s).forEach(function (n) { tween(n, "r", o.from, to, o.dur === undefined ? 1.2 : o.dur, o.ease || "io", function (v) { setT(n, x, y, o.scale, v); }, inst); });
        },
        later: function (ms, fn) {
          var g = gen;
          if (inst || reduced()) { fn(); return; }
          setTimeout(function () { if (g === gen && root && root.isConnected) fn(); }, ms);
        },
        loop: function (fn) { if (inst || reduced()) { try { fn(0); } catch (e) { /* ignore */ } return; } loops.push(fn); startLoops(); },
        fx: function (s, kind) {
          if (inst || reduced()) return;
          A.qa(s).forEach(function (n) {
            var g = gsapLib();
            if (g) {
              if (kind === "pop") g.fromTo(n, { scale: 0.7, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.6, ease: "back.out(2.6)", overwrite: "auto" });
              else g.fromTo(n, { rotation: -8, transformOrigin: "50% 50%" }, { rotation: 0, duration: 0.8, ease: "elastic.out(1.1,0.3)", overwrite: "auto" });
              return;
            }
            n.classList.remove("k-" + kind); try { void n.getBoundingClientRect(); } catch (e) { /* ignore */ } n.classList.add("k-" + kind);
          });
        }
      };
      return A;
    }
    function caption(s, inst) {
      var t = root.querySelector(".capt"), rr = root.querySelector(".capr"), g = root.querySelector(".capg");
      if (!t || !rr) return;
      t.textContent = s;
      var w = 0;
      try { w = t.getComputedTextLength(); } catch (e) { w = 0; }
      if (!w || !isFinite(w)) w = tw(s, 15);
      w = clamp(w + 34, 90, 344);
      rr.setAttribute("x", r1(180 - w / 2)); rr.setAttribute("width", r1(w));
      if (!inst && g) { g.classList.remove("go"); try { void g.getBoundingClientRect(); } catch (e) { /* ignore */ } g.classList.add("go"); }
    }
    function apply(i, n, inst) {
      if (!root) return;
      var li = lineFor(i, n), L = def.lines[li] || [0, 0, ""], p = L[0], k = L[1];
      inst = !!inst || reduced();
      gen++;
      root.classList.toggle("inst", inst);
      var fresh = p !== curP;
      stopLoops();
      panels.forEach(function (pg, j) { pg.classList.toggle("hid", j !== p); });
      var pg = panels[p];
      if (pg) {
        var rvs = Array.prototype.slice.call(pg.querySelectorAll(".rv")), n2 = 0;
        if (fresh && !inst) { rvs.forEach(function (el) { el.classList.add("off"); }); try { void pg.getBoundingClientRect(); } catch (e) { /* ignore */ } }
        rvs.forEach(function (el) {
          var r = String(el.getAttribute("data-r") || "0").split("-"), a = +r[0], b = r.length > 1 ? +r[1] : 99, on = k >= a && k <= b;
          var was = !el.classList.contains("off");
          el.classList.toggle("off", !on);
          if (on && !was && !inst) {
            var d = fresh ? Math.min(n2 * 60, 720) : Math.min(n2 * 45, 360); n2++;
            if (!gsapEnter(el, el.getAttribute("data-fx"), d)) el.style.transitionDelay = d ? d + "ms" : "";
          } else el.style.transitionDelay = "";
        });
        var P = def.panels[p];
        if (P && P.on) { try { P.on(api(pg, k, inst, fresh)); } catch (e) { if (W.console) W.console.error("[W14 " + def.id + " panel " + p + "]", e); } }
      }
      if (li !== cur || inst) caption(L[2], inst);
      var pr = root.querySelector(".prog");
      if (pr) pr.style.transform = "scaleX(" + ((li + 1) / N).toFixed(4) + ")";
      cur = li; curP = p;
    }
    return {
      build: function (host) {
        if (!host || typeof document === "undefined") return;
        installCSS(); stopLoops();
        var node = document.createElement("div");
        node.className = "vls-w14-" + def.id;
        node.setAttribute("role", "img");
        node.setAttribute("aria-label", def.aria);
        var body = "", j;
        for (j = 0; j < def.panels.length; j++) body += '<g class="pn hid" data-p="' + j + '">' + def.panels[j].svg() + "</g>";
        node.innerHTML = '<svg xmlns="' + NS + '" viewBox="0 0 360 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' +
          rect(-400, -400, 1160, 1100, "fP") + (def.bg ? def.bg() : "") + body +
          T(12, 21, def.kicker, "kick") +
          G("capg", rect(100, 268, 160, 27, "capr", { rx: 13.5 }) + T(180, 286.8, "", "capt")) +
          rect(0, 297, 360, 3, "progbg") + rect(0, 297, 360, 3, "prog") + "</svg>";
        if (typeof host.replaceChildren === "function") host.replaceChildren(node);
        else { while (host.firstChild) host.removeChild(host.firstChild); host.appendChild(node); }
        root = node; cur = -1; curP = -1;
        panels = Array.prototype.slice.call(node.querySelectorAll(".pn"));
        if (!W.VL_WORK || VL_WORK.immediate) { apply(0, N, true); return; }
        var owner = node, version = ++gen;
        return VL_WORK.yield().then(function () {
          if (root === owner && gen === version && owner.isConnected) apply(0, N, true);
        });
      },
      step: function (i, n) { if (root) apply(i, n === undefined ? N : n, false); },
      reset: function () { if (!root) return; stopLoops(); if (W.VL_WORK?.discarding) { gen++; return; } cur = -1; curP = -1; apply(0, N, true); }
    };
  }
  function define(def) {
    if (def.css) SEC_CSS.push(def.css);
    VL[def.id] = scene(def);
  }

  /* ==================================================================
     W14O2b · NOBODY DID ANYTHING WRONG  (audit 1.9/10 -> rebuilt first)
     25 narration lines -> 10 visuals. Every line states one literal idea:
     the four documented changes are separate stations, their effect is ONE
     combined +13 band (never split), +2 stays unexplained, controls are kept.
     ================================================================== */
  (function () {
    var P = [];

    /* V1 · lines 0-2 — three weaknesses -> diligent staff -> blame vs system
       Template: https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6 (people appear one by one)
       + https://dribbble.com/shots/26275497-Workflow-AI-Animation (inputs feeding one stage) */
    P.push({
      svg: function () {
        var a = "", C = [[66, "Owner gone"], [180, "Report unread"], [294, "Changes pile up"]];
        C.forEach(function (c, j) {
          a += card(c[0] - 54, 36, 108, 66, "p");
          if (j === 0) a += chair(c[0] + 2, 72, 0.85, "M");
          if (j === 1) a += doc(c[0] - 11, 42, 22, 28, "fW sN", 3);
          if (j === 2) a += rect(c[0] - 15, 61, 30, 8, "fO", { rx: 2 }) + rect(c[0] - 12, 52, 30, 8, "fD", { rx: 2 }) + rect(c[0] - 17, 43, 30, 8, "fN", { rx: 2 });
          a += TX(c[0], 92, c[1], 13, "fN");
        });
        a += arrow(70, 104, 128, 146, "sM", 2.6) + arrow(180, 104, 180, 146, "sM", 2.6) + arrow(290, 104, 232, 146, "sM", 2.6);
        var b = chip(180, 50, "Each acts reasonably", "pg", 15);
        [90, 150, 210, 270].forEach(function (x, j) { b += person(x, 134, 1.25, j % 2 ? "N" : "G") + okB(x + 13, 86, 9); });
        var pipe = rect(36, 152, 288, 32, "fL sN", { rx: 16, "stroke-width": 2 }) + rect(39, 155, 282, 26, "pfill hl fG", { rx: 13 }) +
          TX(180, 206, "Arrival process", 15, "fN");
        var c = card(10, 36, 166, 222, "po") + card(184, 36, 166, 222, "pg") +
          person(93, 206, 1.55, "M") + arrow(28, 70, 70, 132, "sO", 4) + noB(152, 58, 13) +
          TX(93, 236, "Find a culprit", 16, "fO") +
          G("spin", gear(250, 140, 28, "fN")) + G("spinr", gear(298, 172, 19, "fG")) + G("spin", gear(300, 110, 14, "fD")) +
          icon("mag", 236, 182, 1.7) + okB(326, 58, 13) + TX(267, 236, "Understand system", 16, "fG");
        return R("0-0", "dn", a) + R("1-1", "up", b) + R("0-1", "f", pipe) +
          R("0-0", "up", TX(180, 234, "Process weakens", 16, "fO")) +
          R("1-1", "up", TX(180, 234, "Performance still falls", 16, "fO") + arrow(338, 140, 338, 196, "sO", 3)) +
          R("2", "pop", c);
      },
      on: function (A) {
        A.bar(".pfill", "width", A.k === 0 ? 190 : 112, { from: A.fresh ? 282 : undefined, dur: 1.6 });
        A.fill(".pfill", A.k >= 1 ? "var(--o)" : "var(--g)");
      }
    });

    /* V2 · lines 3-6 — documented arrival evidence drawn left to right, +15, sustained
       Template: https://observablehq.com/@d3/learn-d3-animation (time series drawn progressively) */
    function X(m) { return 60 + m / 22 * 260; }
    function Y(v) { return 230 - (v - 20) / 22 * 160; }
    P.push({
      svg: function () {
        var ch = line(48, 230, 334, 230, "sN", { "stroke-width": 2.4 });
        [[5, "Month 5"], [13, "Month 13"], [22, "Month 22"]].forEach(function (m) { ch += line(X(m[0]), 226, X(m[0]), 234, "sN", { "stroke-width": 2 }) + TX(m[0] === 22 ? 316 : X(m[0]), 251, m[1], 14, "fN"); });
        ch += circ(X(5), Y(24), 7, "fG") + TX(X(5), Y(24) + 26, "24", 18, "fG");
        ch += R("1", "dr", path("M" + X(5) + " " + r1(Y(24)) + " L" + X(13) + " " + r1(Y(28)) + " L" + X(22) + " " + r1(Y(39)), "sO f0 dw", { pathLength: 1, "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round" }));
        ch += R("1", "pop", circ(X(13), Y(28), 7, "fO") + TX(X(13) - 18, Y(28) - 18, "28", 18, "fO"));
        ch += R("1", "pop", circ(X(22), Y(39), 8, "fO") + TX(X(22) - 2, Y(39) - 14, "39", 20, "fO"));
        ch += R("2", "up", arrow(338, 150, 338, Y(39) + 4, "sO", 2.6) + arrow(338, 150, 338, Y(24) - 4, "sO", 2.6) + chip(290, 178, "+15 min", "o", 15));
        var chev = ""; for (var m = 17; m <= 22; m++) chev += path("M" + r1(X(m) - 4.5) + " 222 l4.5 -6 l4.5 6", "sO f0", { "stroke-width": 2.4, "stroke-linecap": "round" });
        ch += R("2", "up", chev + TX(276, 206, "Six rising months", 14, "fO"));
        var big = M("bigN", 0, 0, TX(88, 86, "24", 44, "fN bigv") + TX(118, 86, "min", 17, "fN s"));
        var ov = card(52, 70, 256, 140, "p") +
          path("M78 170 h40 l8 -50 l8 50 h40", "sM f0", { "stroke-width": 4, "stroke-linejoin": "round", "stroke-linecap": "round" }) + noB(160, 112, 11) + TX(118, 196, "One-off spike", 15, "fM") +
          path("M200 172 h18 v-10 h18 v-10 h18 v-12 h18 v-12 h18", "sO f0", { "stroke-width": 4, "stroke-linejoin": "round" }) + okB(294, 104, 11) + TX(244, 196, "Sustained rise", 15, "fO");
        return tag("Qasr evidence", "pm") + G("chartG hl", ch + big) + R("3", "pop", ov);
      },
      on: function (A) {
        A.num(".bigv", A.k >= 1 ? 39 : 24, { from: A.fresh ? 24 : undefined, dur: 1.4 });
        A.fill(".bigv", A.k >= 1 ? "var(--o)" : "var(--n)");
        A.op(".chartG", A.k === 3 ? 0 : 1);
      }
    });

    /* V3 · lines 7-8 — the passport station drops into the guest route; it is a compliance control
       Template: https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8 (proposal -> agreement states) */
    function road(y, x0, x1) { return rect(x0, y - 7, x1 - x0, 14, "fL", { rx: 7 }) + line(x0 + 8, y, x1 - 8, y, "sM", { "stroke-width": 2, "stroke-dasharray": "8 8" }); }
    P.push({
      svg: function () {
        var s = road(176, 14, 318) + hotel(334, 190, 1.3, "fN") + TX(348, 207, "Guest room", 13, "fN e") + TX(12, 207, "Hotel lobby", 13, "fN s");
        [92, 150, 276].forEach(function (x) { s += circ(x, 176, 10, "fM"); });
        s += R("0", "dn", card(196, 152, 48, 48, "o", { rx: 10 }) + icon("passport", 220, 176, 1.05, "fW") + TX(200, 224, "Passport check", 15, "fO"));
        s += R("0-0", "dn", chip(180, 62, "Regulatory inspection", "n", 15) + arrow(220, 78, 220, 144, "sN", 3));
        s += R("0-0", "pop", chip(276, 118, "+1 step", "po", 14));
        s += R("1", "pop", icon("shield", 252, 140, 1.3) + chip(116, 104, "Compliance required", "g", 15));
        s += R("1", "r", G("bob", icon("scissors", 300, 92, 1.5)) + noB(322, 74, 11) + TX(292, 132, "Remove blindly?", 14, "fO"));
        s += WK("gst", 24, 170, person(0, 0, 0.75, "O"));
        return tag("Qasr evidence", "pm") + s;
      },
      on: function (A) { A.walk(".n-gst", [[24, 170], [318, 170]], 6, { loop: true, rest: 0.25 }); }
    });

    /* V4 · lines 9-10 — waiver limit counts down 400 -> 150 (kept: audit MATCH); discretion shrinks, time impact unknown
       Template: https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/ (counter + bar update) */
    P.push({
      svg: function () {
        var s = card(44, 40, 272, 104, "p") + icon("coin", 92, 92, 1.8) + TX(214, 72, "Rate waiver limit", 16, "fN") +
          TX(202, 120, "AED", 20, "fO e") + TX(208, 108, "400", 36, "fO s wv");
        s += R("0", "up", TX(214, 148, "was AED 400", 13, "fM"));
        s += R("1", "up", TX(180, 172, "Waiver discretion", 15, "fN") + rect(40, 182, 280, 20, "fL sN", { rx: 10, "stroke-width": 1.6 }) +
          rect(42, 184, 276, 16, "dfill fG", { rx: 8 }) + TX(40, 220, "AED 0", 13, "fM s") + TX(320, 220, "AED 400", 13, "fM e"));
        s += R("1", "pop", icon("clock", 96, 244, 1.05) + qB(114, 232, 9) + chip(214, 244, "Time impact unknown", "pm", 14));
        return tag("Qasr evidence", "pm") + s;
      },
      on: function (A) {
        A.num(".wv", A.k >= 0 ? 150 : 400, { from: A.fresh ? 400 : undefined, dur: 1.6 });
        A.bar(".dfill", "width", A.k >= 1 ? 276 * 150 / 400 : 276, { from: A.k >= 1 && A.fresh ? 276 : undefined, dur: 1.4 });
      }
    });

    /* V5 · lines 11-12 — a new loyalty interaction; desks reinstated at two of fourteen properties
       Template: https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy (network of sites, two highlighted) */
    P.push({
      svg: function () {
        var a = person(84, 214, 1.7, "O") + person(270, 214, 1.7, "N") + rect(222, 196, 96, 18, "fS sN", { rx: 4, "stroke-width": 1.5 }) +
          path("M108 108 h52 v26 h-38 l-10 10 v-10 h-4 Z", "fL sM", { "stroke-width": 1.5 }) + TX(132, 126, "...", 18, "fM") +
          path("M214 74 h-52 v26 h38 l10 10 v-10 h4 Z", "fL sM", { "stroke-width": 1.5 }) + TX(188, 92, "...", 18, "fM");
        a += R("0", "pop", path("M226 104 h110 v40 h-86 l-14 14 v-14 h-10 Z", "fO") + icon("star", 248, 124, 0.85, "fD") + TX(296, 130, "Join loyalty?", 14, "nh fW"));
        a += R("0", "up", chip(180, 52, "Extra interaction", "po", 15));
        var b = "", i, x, y, her;
        for (i = 0; i < 14; i++) {
          x = 38 + (i % 7) * 47; y = i < 7 ? 128 : 212; her = i === 2 || i === 11;
          b += hotel(x, y, 1.15, her ? "fD" : "fN");
          if (her) b += R("1", "dn", icon("desk", x, y - 52, 0.9));
        }
        b += chip(110, 238, "Heritage properties", "d", 14) + chip(272, 238, "Permanent desk", "po", 14) + chip(180, 52, "Local variation", "po", 15);
        return tag("Qasr evidence", "pm") + R("0-0", "l", a) + R("1", "r", b);
      }
    });

    /* V6 · lines 13-14 — four locally approved stations; their effect is ONE +13 band (+2 unexplained) — kept MATCH
       Template: https://observablehq.com/@d3/stacked-to-grouped-bars (separate items regrouped into one stack) */
    P.push({
      svg: function () {
        var s = "", L = [["passport", "Passport", "check"], ["coin", "Waiver", "limit"], ["star", "Loyalty", "prompt"], ["desk", "Heritage", "desks"]];
        L.forEach(function (c, j) {
          var x = 12 + j * 86;
          s += G("cardsG hl", card(x, 40, 80, 92, "p") + icon(c[0], x + 40, 66, 1) + TX(x + 40, 104, c[1], 14, "fN") + TX(x + 40, 121, c[2], 14, "fN") + okB(x + 70, 46, 9));
          s += R("0-0", "f", arrow(x + 40, 136, 180 - (1.5 - j) * 12, 178, "sM", 2.4));
        });
        s += R("0-0", "pop", qB(180, 196, 18) + chip(180, 240, "Combined effect?", "po", 15));
        s += R("1", "gx", rect(32, 166, 13 * 17, 38, "fO", { rx: 8 }) + TX(32 + 13 * 17 / 2, 191, "+13 combined", 17, "nh fW"));
        s += R("1", "gx", rect(32 + 13 * 17 + 3, 166, 2 * 17, 38, "fM", { rx: 6 }) + TX(32 + 15 * 17 + 3 - 17, 191, "+2", 16, "nh fW"));
        s += R("1", "up", TX(160, 158, "15 extra minutes", 15, "fN") + TX(300, 228, "2 unexplained", 14, "fM") + chip(116, 236, "No per-change split", "po", 14));
        return tag("Qasr evidence", "pm") + s;
      },
      on: function (A) { A.cls(".cardsG", "dim", A.k >= 1); }
    });

    /* V7 · lines 15-16 — four decision lanes, each locally optimised; the guest crosses every boundary
       Template: https://dribbble.com/shots/3791748-Workflow-Animation (handoffs between actors) */
    var V7P = [[20, 79]];
    (function () { for (var i = 0; i < 4; i++) V7P.push([118 + i * 34 + 15, 40 + i * 52 + 33]); V7P.push([238, 40 + 3 * 52 + 33]); })();
    P.push({
      svg: function () {
        var s = "", lanes = ["Passport decision", "Waiver decision", "Loyalty decision", "Desk decision"], i, y0, bx;
        for (i = 0; i < 4; i++) {
          y0 = 40 + i * 52; bx = 118 + i * 34;
          s += rect(8, y0, 244, 48, i % 2 ? "fL" : "fP", { rx: 6 }) + TX(14, y0 + 17, lanes[i], 13, "fN s") +
            rect(bx, y0 + 24, 30, 18, "fN", { rx: 4 }) + okB(bx + 30, y0 + 24, 7.5);
          if (i < 3) s += line(8, y0 + 50, 252, y0 + 50, "sM", { "stroke-width": 1.6, "stroke-dasharray": "5 5" });
        }
        s += path("M" + V7P.map(function (p) { return r1(p[0]) + " " + r1(p[1]); }).join(" L"), "sO f0", { "stroke-width": 3, "stroke-dasharray": "6 5", opacity: 0.8 });
        for (i = 1; i < 4; i++) s += R("0", "pop", qB((V7P[i][0] + V7P[i + 1][0]) / 2 + 9, 40 + i * 52 + 1, 9.5));
        s += R("0-0", "up", TX(306, 112, "Nobody", 15, "fO") + TX(306, 132, "owns the", 15, "fO") + TX(306, 152, "handoffs", 15, "fO"));
        s += R("1", "pop", icon("clock", 306, 86, 1.4) + TX(306, 146, "24", 34, "fO gT") + TX(306, 168, "minutes", 14, "fO") + TX(306, 196, "Guest", 14, "fN") + TX(306, 214, "total time", 14, "fN"));
        s += WK("g7", 20, 79, person(0, 8, 0.6, "O"));
        return s;
      },
      on: function (A) {
        if (A.k >= 1) { A.walk(".n-g7", V7P, 3.2, {}); A.num(".gT", 39, { from: 24, dur: 3.2 }); }
        else A.pos(".n-g7", 20, 79);
      }
    });

    /* V8 · lines 17-18 — reasonable then, costly now; keep the control, remove waiting and duplication
       Template: https://observablehq.com/@d3/arc-tween (gauge needle moves to a new value) */
    function gauge(cx, cy, n) {
      return path("M" + (cx - 46) + " " + cy + " A46 46 0 0 1 " + cx + " " + (cy - 46), "sG f0", { "stroke-width": 12 }) +
        path("M" + cx + " " + (cy - 46) + " A46 46 0 0 1 " + (cx + 46) + " " + cy, "sO f0", { "stroke-width": 12 }) +
        WK(n, cx, cy, line(0, 0, 0, -40, "sI", { "stroke-width": 4, "stroke-linecap": "round" }) + circ(0, 0, 6, "fI"));
    }
    P.push({
      svg: function () {
        var a = card(10, 38, 164, 222, "pg") + card(186, 38, 164, 222, "po") +
          TX(92, 62, "When approved", 16, "fG") + TX(268, 62, "Conditions changed", 15, "fO") +
          chip(92, 92, "Reasonable decision", "g", 13) + chip(268, 92, "Same decision", "g", 13) +
          gauge(92, 186, "nd1") + gauge(268, 186, "nd2") + TX(92, 216, "Acceptable effect", 15, "fG") + TX(268, 216, "Costly effect", 15, "fO") +
          icon("passport", 92, 140, 0.9) + icon("passport", 268, 140, 0.9) + TX(180, 244, "Changing circumstances", 13, "fM");
        var b = road(184, 14, 330) + card(196, 158, 52, 52, "n", { rx: 10 }) + icon("passport", 222, 184, 1.05, "fW") + icon("shield", 256, 152, 1.2) +
          chip(222, 232, "Control kept", "g", 14);
        var q = ""; for (var i = 0; i < 6; i++) q += circ(186 - i * 20, 184, 7.5, "qd" + i + " fO dot");
        b += q + TX(110, 214, "Queue shortens", 14, "fO");
        b += card(24, 44, 312, 74, "p") + TX(96, 66, "Duplicated work", 14, "fN") + M("dA", 0, 0, doc(60, 76, 26, 32, "fW sO", 3)) + M("dB", 0, 0, doc(104, 76, 26, 32, "fW sO", 3)) +
          arrow(148, 92, 190, 92, "sN", 3) + doc(210, 76, 26, 32, "fW sG", 3) + TX(286, 98, "One check", 15, "fG");
        return tag("Rule kept", "pg") + R("0-0", "l", a) + R("1", "r", b);
      },
      on: function (A) {
        A.turn(".n-nd1", 92, 186, -55, { dur: 0 });
        A.turn(".n-nd2", 268, 186, 52, { from: A.fresh ? -55 : undefined, dur: 1.8 });
        A.qa(".dot").forEach(function (d, i) { d.style.opacity = A.k >= 1 && i >= 2 ? "0" : "1"; });
        A.pos(".n-dB", A.k >= 1 ? -22 : 0, 0); A.pos(".n-dA", A.k >= 1 ? 22 : 0, 0);
        A.op(".n-dA", A.k >= 1 ? 0.25 : 1);
      }
    });

    /* V9 · lines 19-21 — owner promoted away; director absorbs it with 13 reports; analyst keeps reporting, nobody discusses
       Template: https://www.behance.net/gallery/159045079/Process-What-is-a-Motion-Designer- (illustrated narrative vignettes) */
    P.push({
      svg: function () {
        var a = chair(96, 226, 1.5, "M") + chip(96, 246, "Process owner", "pm", 13) + hotel(300, 222, 2.1, "fN") + chip(284, 246, "Marina property", "n", 13) +
          chip(180, 58, "Promoted: general manager", "o", 14) + cal(52, 112, 1, "fO", "9") + TX(52, 148, "months ago", 13, "fN") +
          WK("own", 96, 222, person(0, 0, 1.3, "N"));
        var b = person(180, 206, 1.6, "N", { tie: true }) + TX(180, 236, "Operations director", 15, "fN") + chip(180, 52, "13 direct reports", "n", 15), i, ang;
        for (i = 0; i < 13; i++) { ang = (-165 + i * 150 / 12) * Math.PI / 180; b += R("1", "pop", person(180 + 128 * Math.cos(ang), 200 + 108 * Math.sin(ang), 0.5, "M")); }
        b += R("1", "dn", chip(276, 170, "+ Arrival process", "o", 13));
        var c = person(70, 206, 1.4, "G") + rect(28, 206, 108, 10, "fN", { rx: 3 }) + TX(82, 238, "Monthly reports", 15, "fG");
        for (i = 0; i < 6; i++) c += R("2", "dn", doc(112 + i * 3, 134 - i * 10, 28, 34, "fW sN", 2));
        c += rect(196, 176, 140, 14, "fS sN", { rx: 5, "stroke-width": 1.5 }) + chair(212, 220, 0.9, "M") + chair(262, 220, 0.9, "M") + chair(312, 220, 0.9, "M") +
          cal(266, 96, 1.2, "fO") + noB(290, 78, 11) + TX(266, 246, "Review not sustained", 15, "fO");
        return tag("Qasr evidence", "pm") + R("0-0", "f", a) + R("1-1", "up", b) + R("2", "r", c);
      },
      on: function (A) { if (A.k === 0) A.walk(".n-own", [[96, 222], [180, 222], [252, 222]], 2.2, {}); }
    });

    /* V10 · lines 22-24 — no deliberate neglect; intentions vs outcomes; next: read, then act
       Template: https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP (activity resolves into a check) */
    P.push({
      svg: function () {
        var a = "", i;
        for (i = 0; i < 5; i++) a += person(52 + i * 64, 116, 1.15, i % 2 ? "N" : "G") + okB(52 + i * 64 + 13, 72, 9);
        a += chip(180, 140, "No deliberate neglect", "pg", 15) + gear(130, 206, 30, "fM") + gear(196, 222, 22, "fO") + gear(246, 196, 18, "fM") +
          noB(230, 236, 10) + TX(300, 238, "Gaps between", 14, "fO") + TX(64, 238, "System parts", 14, "fM");
        var b = card(10, 40, 150, 210, "pg") + card(200, 40, 150, 210, "po") + TX(85, 66, "Good intentions", 15, "fG") + TX(275, 66, "System outcome", 15, "fO");
        for (i = 0; i < 4; i++) b += okB(52 + (i % 2) * 66, 108 + Math.floor(i / 2) * 58, 16);
        b += TX(275, 150, "39", 52, "fO") + TX(275, 180, "minutes", 16, "fO") + TX(180, 152, "≠", 40, "fN") + TX(85, 230, "All reasonable", 14, "fG") + TX(275, 230, "Not acceptable", 14, "fO");
        var c = card(20, 70, 100, 130, "p") + icon("chart", 70, 110, 1.6) + icon("eye", 70, 168, 1.2) + arrow(130, 135, 196, 135, "sG", 4) +
          card(206, 84, 130, 102, "g") + icon("gavel", 238, 126, 1.2, "fW") + TX(271, 140, "Decide, act", 18, "nh fW") +
          chip(180, 232, "Read, then act", "n", 16);
        return R("0-0", "up", a) + R("1-1", "pop", b) + R("2", "r", c);
      }
    });

    define({
      id: "W14O2b", kicker: "REASONABLE PARTS", aria: "Four documented, locally approved changes are shown as separate stations whose combined effect adds thirteen of fifteen extra minutes; coordination, not blame, is the diagnosis.",
      panels: P,
      lines: [
        [0, 0, "Three known weaknesses"], [0, 1, "Everyone acts reasonably"], [0, 2, "Blame isn't diagnosis"],
        [1, 0, "Delivered: 24 minutes"], [1, 1, "Month 22: 39"], [1, 2, "Fifteen minutes added"], [1, 3, "Sustained, not isolated"],
        [2, 0, "Passport re-verification added"], [2, 1, "Compliance must stay"],
        [3, 0, "Waiver: AED 400 → 150"], [3, 1, "Time impact unknown"],
        [4, 0, "Loyalty prompt added"], [4, 1, "Desks at two properties"],
        [5, 0, "Combined effect unchecked"], [5, 1, "13 of 15 minutes"],
        [6, 0, "Nobody coordinates boundaries"], [6, 1, "Guest feels everything"],
        [7, 0, "Reasonable then, costly now"], [7, 1, "Keep control, cut waiting"],
        [8, 0, "Owner promoted away"], [8, 1, "Director: 13 reports"], [8, 2, "Reports produced, unread"],
        [9, 0, "No deliberate neglect"], [9, 1, "Intentions versus outcomes"], [9, 2, "Next: read, then act"]
      ]
    });
  })();

  /* ==================================================================
     W14O1d · FROM ONE PROJECT TO A SELF-IMPROVING ORGANISATION  (audit 2.0/10)
     31 lines -> 11 visuals. No tree metaphor: literal capability pictures.
     Qasr is never shown as already mature; every Qasr future is stamped PROPOSED.
     ================================================================== */
  (function () {
    var P = [];

    /* V1 · lines 0-2 — the journey so far; beyond arrival time; programme after programme vs built-in capability
       Template: https://motionarray.com/after-effects-templates/project-timeline-2424919/ (marker advancing along milestones) */
    P.push({
      svg: function () {
        var a = line(30, 150, 330, 150, "sN", { "stroke-width": 4, "stroke-linecap": "round" }) +
          circ(84, 150, 11, "fG") + circ(180, 150, 11, "fO") + circ(290, 150, 11, "fM") + qB(290, 150, 11) +
          TX(84, 124, "Successful redesign", 14, "fG") + TX(180, 184, "Benefits slipping", 14, "fO") + TX(290, 124, "Sustain them?", 14, "fN") +
          WK("tk", 30, 150, circ(0, 0, 8, "fD sN", { "stroke-width": 2 }));
        var b = chip(66, 64, "Arrival time", "m", 13) + icon("clock", 66, 104, 1.2) +
          card(126, 52, 222, 176, "n") + TX(237, 84, "What must it learn?", 16, "nh fW") +
          icon("bulb", 176, 136, 1.6) + icon("book", 237, 140, 1.5, "fD") + G("", person(298, 158, 1.1, "D")) +
          TX(237, 206, "Organisational learning", 15, "nh fD") + arrow(96, 104, 120, 120, "sM", 2.6);
        var c = card(10, 40, 166, 214, "po") + card(184, 40, 166, 214, "pg") + TX(93, 64, "Programme again", 15, "fO") + TX(267, 64, "Built-in capability", 15, "fG");
        [0, 1, 2].forEach(function (j) { c += R("2", "up", card(20, 82 + j * 50, 146, 38, "o", { rx: 8 }) + TX(93, 106 + j * 50, "New programme", 13, "nh fW")); });
        c += hotel(267, 212, 3.2, "fN") + G("spin", loopRing(267, 140, 30, 4, "sD")) + icon("gear", 267, 140, 1);
        c += TX(267, 240, "Managers improve", 14, "fG") + noB(160, 48, 11) + okB(334, 48, 11);
        return R("0-0", "f", a) + R("1-1", "pop", b) + R("2", "up", c);
      },
      on: function (A) { if (A.k === 0) A.walk(".n-tk", [[30, 150], [84, 150], [180, 150], [290, 150]], 3, {}); }
    });

    /* V2 · lines 3-5 — honest, single-scale evidence bars 82 -> 24 -> 39, then the three documented weaknesses
       Template: https://motionarray.com/after-effects-templates/infographics-pack-135055/ (bars + callouts) */
    P.push({
      svg: function () {
        var s = bars({ x: 40, base: 236, h: 160, max: 90, bw: 62, gap: 36, fs: 24, items: [
          { v: 82, l: "Baseline", r: "0", c: "fM" }, { v: 24, l: "Month 5", r: "0", c: "fG" }, { v: 39, l: "Month 22", r: "1", c: "fO" }] });
        s += R("1", "up", arrow(212, 186, 258, 174, "sO", 3));
        var pins = [["Ownership weakened", 48], ["Review neglected", 82], ["Changes accumulated", 116]];
        pins.forEach(function (p, j) { s += R("2", "l", icon("pin", 158, p[1] - 2, 0.75) + chip(256, p[1], p[0], "po", 14)); });
        return tag("Qasr evidence", "pm") + s;
      }
    });

    /* V3 · lines 6-8 — two different achievements; performance as everyday duty; outcome, owner, trigger
       Template: https://lottiefiles.com/free-animation/project-dashboard-PeJUc2p1iB (dashboard rows + people) */
    P.push({
      svg: function () {
        var a = card(10, 40, 166, 214, "pg") + card(184, 40, 166, 214, "pm") + icon("trophy", 93, 116, 2.4) + okB(150, 66, 13) +
          TX(93, 196, "Project delivered", 16, "fG") + TX(93, 222, "Qasr: done", 14, "fM") +
          G("ghost", gear(250, 112, 30, "fN") + gear(296, 144, 20, "fN")) + qB(326, 66, 13) +
          TX(267, 196, "Lasting capability", 16, "fN") + TX(267, 222, "Not yet shown", 14, "fM");
        var b = person(74, 196, 2, "N", { tie: true }) + TX(74, 236, "Line manager", 15, "fN") +
          card(146, 52, 200, 150, "p") + TX(246, 76, "Job responsibilities", 14, "fN");
        [100, 124].forEach(function (y) { b += line(166, y, 320, y, "sM", { "stroke-width": 6, "stroke-linecap": "round", opacity: 0.5 }); });
        b += R("1", "l", rect(158, 140, 176, 30, "fG", { rx: 8 }) + TX(246, 160, "Process performance", 14, "nh fW"));
        b += R("1", "up", chip(246, 230, "Every month, permanently", "g", 13));
        var c = "", rows = [["chart", "Outcomes that matter"], ["person", "Who owns them"], ["bell", "When to investigate"]];
        rows.forEach(function (r, j) {
          var y = 72 + j * 64;
          c += R("2", "l", card(22, y - 24, 316, 50, "p") + (r[0] === "person" ? person(58, y + 18, 0.85, "N") : icon(r[0], 58, y, 1.1)) +
            TX(96, y + 6, r[1], 16, "fN s") + okB(312, y, 12));
        });
        return R("0-0", "f", a) + R("1-1", "r", b) + c;
      }
    });

    /* V4 · lines 9-10 — people change roles; knowledge stays in procedures, measures and decision rights
       Template: https://www.behance.net/gallery/53752435/Motion-Design-Process (production stages handed on) */
    P.push({
      svg: function () {
        var a = rect(282, 92, 56, 146, "fS sN", { rx: 3, "stroke-width": 2 }) + circ(328, 168, 3.5, "fN") + TX(310, 82, "Exit door", 14, "fN") +
          rect(40, 196, 120, 12, "fN", { rx: 3 }) + chair(122, 236, 1, "M") + chip(100, 252, "Empty role", "pm", 13) +
          WK("lv", 100, 196, person(0, 0, 1.5, "G") + G("bob", icon("bulb", 0, -62, 1.1))) + chip(180, 58, "People change roles", "o", 15);
        var b = person(74, 220, 1.7, "G") + TX(74, 246, "New owner", 15, "fG") + chip(74, 98, "Continuity kept", "g", 14);
        [["book", "Written procedures"], ["chart", "Agreed measures"], ["key", "Decision rights"]].forEach(function (r, j) {
          var y = 58 + j * 62;
          b += R("1", "r", card(150, y, 200, 48, "p") + icon(r[0], 172, y + 24, 0.95) + TX(190, y + 29, r[1], 13, "fN s"));
          b += R("1", "f", arrow(156, y + 24, 112, 176 - j * 4, "sG", 2.4));
        });
        return tag("General principle", "pm") + R("0-0", "f", a) + R("1", "f", b);
      },
      on: function (A) { if (A.k === 0) A.walk(".n-lv", [[100, 196], [200, 196], [304, 196]], 2.6, {}); }
    });

    /* V5 · lines 11-14 — internal skills; a centre of excellence supplies methods; it is not an approval gate
       Template: https://old.observablehq.com/@d3/hierarchy-traversal-animated (hub-to-node visits) */
    P.push({
      svg: function () {
        var a = WK("ext", 290, 214, person(0, 0, 1.4, "M") + rect(10, -18, 14, 12, "fM", { rx: 2 })) + chip(290, 244, "External specialist", "pm", 13);
        [64, 124, 184].forEach(function (x, j) { a += R("0", "pop", person(x, 214, 1.4, "G") + icon("mag", x + 16, 160, 0.8)); });
        a += chip(124, 244, "Internal analysts", "g", 14) + chip(180, 58, "Build internal skills", "pg", 15);
        var hub = card(98, 40, 164, 44, "n") + TX(180, 68, "Centre of excellence", 15, "nh fW");
        var owners = ""; [62, 180, 298].forEach(function (x) { owners += person(x, 236, 1.2, "N"); });
        var b = R("1-1", "f", [["Shared methods", 74, 124], ["Expert support", 180, 162], ["Knowledge base", 288, 124]].map(function (o) {
          return arrow(180, 88, o[1], o[2] - 14, "sD", 2.6) + chip(o[1], o[2], o[0], "d", 13);
        }).join(""));
        var c = R("2-2", "pop", rect(130, 100, 100, 12, "fM", { rx: 3 }) + rect(136, 112, 8, 30, "fM") + rect(216, 112, 8, 30, "fM") + noB(240, 104, 12) +
          chip(180, 160, "Not an approval gate", "po", 14)) +
          R("2-2", "f", WK("cc", 30, 196, card(-16, -12, 32, 24, "o", { rx: 4 })));
        var d = R("3", "f", chip(180, 176, "Owner decides", "g", 14) + [62, 180, 298].map(function (x) { return G("bob", icon("wrench", x + 22, 194, 0.8, "sD")); }).join("") +
          TX(180, 120, "Consistent methods", 15, "fD"));
        return R("0-0", "f", a) + R("1", "dn", hub + owners) + b + c + d;
      },
      on: function (A) {
        if (A.k === 0) A.walk(".n-ext", [[290, 214], [350, 214], [420, 214]], 2.4, {});
        if (A.k === 2) A.walk(".n-cc", [[30, 200], [120, 200], [180, 200], [180, 206]], 4, { loop: true });
      }
    });

    /* V6 · lines 15-16 — the maturity ladder; dependable practices outweigh projects and diagrams
       Template: https://motionarray.com/after-effects-templates/infographics-v2-556482/ (scaled statistic modules) */
    P.push({
      svg: function () {
        var a = chip(180, 52, "Process maturity", "n", 15), st = ["Project dependence", "Defined ownership", "Active governance", "Continuous improvement"];
        st.forEach(function (n, j) {
          var y = 214 - j * 42, w = 182 + j * 36;
          a += R("0", "gx", rect(26, y, w, 34, j === 3 ? "fG" : j === 0 ? "fM" : "fN", { rx: 8 }) + TX(36, y + 23, n, 15, "nh fW s"));
        });
        a += WK("clb", 0, 0, hotel(0, 0, 1.2, "fD")) + TX(330, 252, "Any organisation", 13, "fM e");
        var b = line(180, 238, 180, 112, "sN", { "stroke-width": 5 }) + path("M160 246 h40 l-20 -18 Z", "fN") +
          WK("beam", 180, 112, line(-104, 0, 104, 0, "sN", { "stroke-width": 5, "stroke-linecap": "round" }) +
            line(-90, 0, -90, 34, "sM", { "stroke-width": 2 }) + line(90, 0, 90, 34, "sM", { "stroke-width": 2 }) +
            rect(-126, 34, 72, 8, "fN", { rx: 3 }) + rect(54, 34, 72, 8, "fN", { rx: 3 }) +
            doc(-122, -6, 22, 30, "fW sM", 2) + doc(-101, -2, 22, 30, "fW sM", 2) + doc(-80, 2, 22, 30, "fW sM", 2) +
            G("spin", loopRing(90, 6, 20, 5, "sG")) + TX(-88, 64, "Projects, diagrams", 13, "fM") + TX(88, 64, "Dependable practices", 13, "fG"));
        return R("0-0", "f", a) + R("1", "pop", b);
      },
      on: function (A) {
        if (A.k === 0) A.walk(".n-clb", [[318, 214], [318, 172], [318, 130], [318, 88]], 3.6, {});
        A.turn(".n-beam", 180, 112, A.k >= 1 ? 9 : 0, { from: A.fresh || A.k === 1 ? -9 : undefined, dur: 1.6, ease: "back" });
      }
    });

    /* V7 · lines 17-18 — the test: another process fails; managers diagnose it without a new programme
       Template: https://lottiefiles.com/free-animation/automated-workflows-XR2hxXOdEK (trigger -> repeated actions -> complete) */
    P.push({
      svg: function () {
        var s = card(110, 40, 140, 54, "n") + TX(180, 74, "Another process", 15, "nh fW") + G("wob", icon("bell", 262, 52, 1.1, "fO"));
        s += R("0-0", "f", arrow(150, 98, 92, 140, "sM", 2.6) + arrow(210, 98, 268, 140, "sM", 2.6) +
          card(14, 146, 156, 92, "po") + icon("coin", 50, 186, 1.1) + icon("coin", 78, 186, 1.1) + icon("coin", 106, 186, 1.1) + TX(92, 226, "New programme?", 15, "fO") +
          card(190, 146, 156, 92, "pg") + crowd(228, 206, 3, 40, 1, "G") + TX(268, 226, "Managers diagnose?", 15, "fG"));
        s += R("1", "f", G("dim", card(14, 104, 92, 40, "po") + TX(60, 129, "Programme", 14, "fO")) + noB(100, 104, 10));
        ["Measure it", "Investigate causes", "Coordinate fixes"].forEach(function (c, j) {
          s += R("1", "l", card(128, 108 + j * 44, 210, 36, "g", { rx: 18 }) + TX(233, 131 + j * 44, c, 15, "nh fW"));
        });
        s += R("1", "pop", chip(180, 244, "Durable capability", "g", 15) + crowd(40, 222, 2, 34, 1, "G"));
        return tag("Test question", "pm") + s;
      }
    });

    /* V8 · lines 19-22 — phase ten is not an endpoint; evidence returns to earlier phases; conditions change; keep controls
       Template: https://codepen.io/WebGuyJeff/pen/rNdmqdO (numbered steps with an active state) */
    var PH = [["Organization", "Strategy"], ["Process", "Architecture"], ["Launch Pad"], ["Understand"], ["Innovate"], ["People"], ["Develop"], ["Implement"], ["Realize Value"], ["Sustainable", "Performance"]];
    function tiles(back) {
      var s = "", i, c, r, x, y, n;
      for (i = 0; i < 10; i++) {
        c = i < 5 ? 0 : 1; r = i % 5; x = c ? 190 : 12; y = 40 + r * 44; n = PH[i];
        var hot = back && (i === 0 || i === 1 || i === 2 || i === 4);
        s += G("tile t" + i, rect(x, y, 158, 38, i === 9 ? "fG" : "fW sN", { rx: 8, "stroke-width": 1.6 }) + circ(x + 19, y + 19, 12, i === 9 ? "fW" : "fN") +
          TX(x + 19, y + 24, String(i + 1), 13, "nh " + (i === 9 ? "fG" : "fW")) +
          (n.length > 1 ? TX(x + 38, y + 16, n[0], 13, "s nh " + (i === 9 ? "fW" : "fN")) + TX(x + 38, y + 32, n[1], 13, "s nh " + (i === 9 ? "fW" : "fN"))
            : TX(x + 38, y + 24, n[0], 14, "s nh fN")));
        if (hot) s += R("1-1", "pop", rect(x - 2, y - 2, 162, 42, "f0 sO", { rx: 9, "stroke-width": 3 }));
      }
      return s;
    }
    P.push({
      svg: function () {
        var s = R("0-1", "f", G("tilesG hl", tiles(true)));
        s += R("0-0", "f", carrow(348, 240, 360, 140, 352, 52, "sG", 3, true));
        s += R("1-1", "f", line(180, 236, 180, 58, "sO", { "stroke-width": 4 }) + [59, 103, 147, 235].map(function (y) { return arrow(180, y, 172, y, "sO", 3); }).join(""));
        s += R("2-2", "pop", card(30, 56, 300, 180, "p") + TX(180, 84, "Conditions keep changing", 16, "fN") +
          icon("puzzle", 110, 150, 2.6, "fM") + TX(110, 206, "Yesterday's design", 14, "fM") +
          rect(214, 118, 74, 64, "f0 sO", { rx: 6, "stroke-width": 3, "stroke-dasharray": "6 5" }) + TX(251, 156, "?", 28, "fO") + TX(251, 206, "Today's needs", 14, "fO"));
        s += R("3", "pop", card(30, 56, 300, 180, "p") + icon("shield", 92, 132, 2.6) + TX(92, 196, "Controls kept", 15, "fG") +
          path("M178 170 C200 110 236 196 262 128 S300 120 316 150", "sN f0 flowd", { "stroke-width": 4 }) + TX(248, 196, "Process adapted", 15, "fN"));
        return s;
      },
      on: function (A) { A.cls(".tilesG", "dim", A.k >= 2); }
    });

    /* V9 · lines 23-26 — Qasr: PROPOSED ownership; not implemented; investigate adoption and changes; measure, don't announce
       Template: https://motionarray.com/after-effects-templates/corporate-timeline-1939632/ (milestone cards revealed one by one) */
    function stampP(x, y, s, txt, v) { var w = tw(txt, 16 * s) + 24; return G("", rect(x - w / 2, y - s * 16, w, s * 32, "f0 " + (v || "sO"), { rx: 6, "stroke-width": 3 }) + TX(x, y + s * 6, txt, 16 * s, (v === "sG" ? "fG" : "fO") + " nh"), { transform: "rotate(-8 " + x + " " + y + ")" }); }
    P.push({
      svg: function () {
        var a = chair(110, 226, 1.6, "M") + person(110, 214, 1.6, "N", { ghost: true }) + rect(78, 120, 64, 70, "f0 sN", { rx: 6, "stroke-dasharray": "5 4", "stroke-width": 2 }) +
          icon("key", 196, 150, 1.4) + TX(206, 156, "Decision authority", 13, "fD s") + chip(110, 252, "Dedicated owner", "pm", 13);
        a = R("0-0", "f", a) + R("0-0", "stamp", stampP(250, 82, 1.1, "PROPOSED"));
        var b = line(40, 220, 300, 220, "sN", { "stroke-width": 2.4 }) + circ(70, Y2(24), 7, "fG") + TX(70, Y2(24) + 26, "24", 16, "fG") +
          circ(200, Y2(39), 8, "fO") + TX(200, Y2(39) - 14, "39", 18, "fO") + line(70, Y2(24), 200, Y2(39), "sO", { "stroke-width": 3.5 }) +
          path("M200 " + r1(Y2(39)) + " C240 " + r1(Y2(39)) + " 250 " + r1(Y2(33)) + " 290 " + r1(Y2(31)), "sM f0", { "stroke-width": 3, "stroke-dasharray": "6 6" }) +
          qB(300, Y2(31), 13) + TX(70, 242, "Month 5", 14, "fN") + TX(200, 242, "Month 22", 14, "fN") + TX(276, Y2(31) + 34, "Recovery unknown", 13, "fM");
        b = R("1-1", "f", b) + R("1-1", "stamp", stampP(112, 62, 1, "NOT IMPLEMENTED"));
        var c = card(10, 44, 166, 192, "p") + card(184, 44, 166, 192, "p") + TX(93, 70, "Kiosk adoption", 15, "fN") + TX(267, 70, "Approved changes", 15, "fN") +
          rect(40, 196 - 65 * 1.6, 40, 65 * 1.6, "fG", { rx: 4 }) + rect(104, 196 - 48 * 1.6, 40, 48 * 1.6, "fO", { rx: 4 }) + TX(60, 82 + 12, "65%", 15, "fG") + TX(124, 110 + 12, "48%", 15, "fO") +
          line(30, 196, 156, 196, "sN", { "stroke-width": 2 }) + rect(204, 120, 13 * 9, 34, "fO", { rx: 6 }) + TX(204 + 58, 142, "+13 min", 15, "nh fW") +
          icon("mag", 150, 200, 1.4) + icon("mag", 320, 200, 1.4) + TX(267, 186, "Combined effect", 14, "fO");
        var d = card(14, 60, 120, 120, "n") + icon("wrench", 74, 106, 1.6, "sW") + TX(74, 156, "Chosen", 14, "nh fW") + TX(74, 174, "intervention", 14, "nh fW") + arrow(140, 120, 186, 120, "sG", 4) +
          line(196, 176, 340, 176, "sN", { "stroke-width": 2 }) + rect(210, 176 - 78, 44, 78, "fO", { rx: 4 }) + rect(278, 176 - 40, 44, 40, "fM", { rx: 4, "stroke-dasharray": "5 4" }) +
          TX(300, 128, "?", 24, "fM") + TX(268, 200, "Measured result", 15, "fG") + okB(334, 90, 11) +
          icon("mega", 210, 236, 1.1) + TX(262, 241, "Bold announcement", 13, "fM") + noB(330, 230, 10);
        return tag("Qasr proposal", "po") + a + b + R("2-2", "up", c) + R("3", "r", d);
      }
    });
    function Y2(v) { return 220 - (v - 20) / 22 * 110; }

    /* V10 · lines 27-30 — the forum: a different organisation; mechanism, cost, peers; capacity to keep improving; a shared, enduring responsibility
       Template: https://dribbble.com/shots/27600376-Clean-Workflow-Visualization-with-Motion-Graphics (journey cards with transitions) */
    P.push({
      svg: function () {
        var a = rect(100, 92, 160, 132, "fM", { rx: 4 }), i, j;
        for (i = 0; i < 3; i++) for (j = 0; j < 4; j++) a += rect(116 + j * 36, 106 + i * 32, 22, 18, "fW", { opacity: 0.85 });
        a += chip(180, 58, "Different organisation", "pm", 15) + chip(180, 244, "Forum case", "n", 15) + G("bob", icon("chart", 300, 120, 1.6, "sO")) + TX(290, 168, "Falling results", 13, "fO");
        var b = card(20, 44, 228, 204, "p") + TX(134, 70, "Your forum post", 16, "fN");
        [["Defend a mechanism", 104], ["Explain its cost", 150], ["Engage contrasting peers", 196]].forEach(function (r) {
          b += R("1-1", "l", okB(44, r[1] - 4, 11) + TX(62, r[1], r[0], 14, "fN s"));
        });
        b += person(298, 106, 1.1, "G") + person(298, 198, 1.1, "O") + path("M256 72 h76 v26 h-60 l-10 8 v-8 h-6 Z", "fL sM", { "stroke-width": 1.4 }) + TX(294, 90, "I disagree", 13, "fN") +
          path("M256 164 h76 v26 h-60 l-10 8 v-8 h-6 Z", "fL sM", { "stroke-width": 1.4 }) + TX(294, 182, "Why that?", 13, "fN");
        var c = "";
        [["Arrival process", 62], ["Another process", 180], ["Next process", 298]].forEach(function (p, j) {
          c += R("2-2", "up", card(p[1] - 54, 70, 108, 120, j ? "p" : "pg") + G(j % 2 ? "spinr" : "spin", loopRing(p[1], 122, 28, 5, j ? "sN" : "sG")) + icon("gear", p[1], 122, 0.8) + TX(p[1], 176, p[0], 13, "fN"));
        });
        c += chip(180, 228, "Capacity to improve", "g", 16);
        var d = icon("trophy", 66, 116, 2.4) + TX(66, 172, "Temporary win", 14, "fM") + arrow(112, 120, 156, 120, "sG", 4) +
          card(166, 52, 182, 150, "pg") + cal(206, 96, 1.1, "fG") + cal(250, 96, 1.1, "fG") + cal(294, 96, 1.1, "fG") + crowd(206, 184, 3, 44, 1.05, "N") +
          chip(180, 236, "Shared, everyday responsibility", "n", 14);
        return R("0-1", "f", tag("Week 14 forum", "pm")) + R("0-0", "f", a) + R("1-1", "r", b) + R("2-2", "f", c) + R("3", "pop", d);
      }
    });

    define({
      id: "W14O1d", kicker: "SELF-IMPROVING", aria: "A literal picture of organisational BPM capability: continuing ownership, preserved knowledge, a supporting centre of excellence, maturity and a connected framework, with Qasr's future clearly marked as a proposal.",
      panels: P,
      lines: [
        [0, 0, "From redesign to sustain"], [0, 1, "Beyond arrival time"], [0, 2, "Improve without programmes"],
        [1, 0, "82 down to 24"], [1, 1, "Back up to 39"], [1, 2, "Three documented weaknesses"],
        [2, 0, "Two different achievements"], [2, 1, "Part of management"], [2, 2, "Outcome, owner, trigger"],
        [3, 0, "People change roles"], [3, 1, "Knowledge kept in place"],
        [4, 0, "Build internal skills"], [4, 1, "Centre of excellence"], [4, 2, "Support, not approval"], [4, 3, "Owners keep responsibility"],
        [5, 0, "Process maturity grows"], [5, 1, "Practices over paperwork"],
        [6, 0, "Another process fails"], [6, 1, "Managers fix it"],
        [7, 0, "Phase ten connects"], [7, 1, "Revisit earlier phases"], [7, 2, "Conditions keep changing"], [7, 3, "Keep controls, adapt"],
        [8, 0, "Proposed: restore ownership"], [8, 1, "Still a proposal"], [8, 2, "Investigate adoption, changes"], [8, 3, "Measure, don't announce"],
        [9, 0, "Forum: new case"], [9, 1, "Mechanism, cost, peers"],
        [9, 2, "Capacity to improve"], [9, 3, "Shared, enduring responsibility"]
      ]
    });
  })();

  /* ==================================================================
     W14O2c · THE DIFFERENCE BETWEEN REPORTING AND MANAGING  (audit 2.1/10)
     27 lines -> 9 visuals: the reporting pipeline that keeps running, the
     empty review chair, the meeting that decides, thresholds, follow-through.
     ================================================================== */
  (function () {
    var P = [];
    function road(y, x0, x1) { return rect(x0, y - 7, x1 - x0, 14, "fL", { rx: 7 }) + line(x0 + 8, y, x1 - 8, y, "sM", { "stroke-width": 2, "stroke-dasharray": "8 8" }); }

    /* V1 · lines 0-2 — unchecked changes; accurate data, lost gains; a reassuring screen over stalled gears
       Template: https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ (dashboard panels transition) */
    P.push({
      svg: function () {
        var a = road(206, 20, 300) + chip(180, 56, "No combined check", "po", 15) + chair(322, 230, 1.1, "M") + qB(322, 168, 12);
        ["passport", "coin", "star", "desk"].forEach(function (ic, j) { a += R("0", "dn", card(56 + j * 58, 140, 46, 46, "p") + icon(ic, 79 + j * 58, 163, 0.9)); a += R("0", "f", arrow(79 + j * 58, 190, 79 + j * 58, 198, "sM", 2)); });
        var b = card(14, 46, 160, 170, "pg") + TX(94, 72, "Accurate data", 16, "fG"), i, j;
        for (i = 0; i < 4; i++) for (j = 0; j < 3; j++) b += rect(30 + j * 46, 88 + i * 28, 40, 20, "fL sM", { rx: 3, "stroke-width": 1 });
        b += okB(160, 52, 12) + card(188, 46, 160, 170, "po") + TX(268, 72, "Arrival minutes", 15, "fO") + TX(268, 148, "24", 52, "fO cv") + arrow(320, 168, 320, 112, "sO", 4) +
          TX(268, 194, "Gain slipping", 15, "fO");
        var c = rect(40, 40, 200, 140, "fI", { rx: 10 }) + rect(50, 50, 180, 120, "fG", { rx: 6 }) + TX(140, 102, "On track", 26, "nh fW") +
          circ(98, 138, 10, "fW") + circ(140, 138, 10, "fW") + circ(182, 138, 10, "fW") + rect(124, 180, 32, 22, "fI") + rect(100, 200, 80, 8, "fI", { rx: 3 }) +
          TX(140, 236, "Reassuring screen", 15, "fG") +
          G("", gear(280, 112, 28, "fM") + gear(314, 156, 20, "fM")) + noB(300, 62, 12) + TX(292, 236, "Stalled system", 15, "fO") + line(250, 196, 334, 196, "sO", { "stroke-width": 3 });
        return R("0-0", "f", a) + R("1-1", "pop", b) + R("2", "up", c);
      },
      on: function (A) { if (A.k === 1) A.num(".cv", 39, { from: 24, dur: 2 }); }
    });

    /* V2 · lines 3-6 — analyst -> operations pack -> page four; last discussed at 28; reported, not prevented (kept MATCH ideas)
       Template: https://lottiefiles.com/free-animation/data-factory-animation-I6dMAfEyrl (inputs fed through a pipeline) */
    function Yc(v) { return 220 - (v - 20) / 22 * 130; }
    P.push({
      svg: function () {
        var a = person(62, 196, 1.5, "G") + rect(20, 196, 100, 10, "fN", { rx: 3 }) + TX(72, 230, "Analyst prepares", 13, "fG") +
          cal(62, 96, 1.2, "fO") + icon("binder", 292, 156, 2.4) + TX(292, 214, "Operations pack", 14, "fN") +
          line(110, 150, 252, 150, "sM", { "stroke-width": 2, "stroke-dasharray": "4 6" }) + WK("sh", 110, 140, doc(-12, -16, 24, 30, "fW sN", 2));
        a += chip(180, 252, "Every month", "g", 13);
        var b = "", k;
        for (k = 0; k < 4; k++) b += G("", card(24 + k * 66, 60 + k * 8, 74, 120, k === 3 ? "po" : "p") + TX(61 + k * 66, 84 + k * 8, "Page " + (k + 1), 14, k === 3 ? "fO" : "fM"));
        b += icon("chart", 259, 136, 1.6) + chip(274, 226, "Arrival measure", "o", 14) + chip(96, 226, "Still collected", "g", 14);
        var c = line(24, 220, 206, 220, "sN", { "stroke-width": 2.4 }) + circ(46, Yc(24), 7, "fG") + TX(46, Yc(24) + 24, "24", 16, "fG") + TX(46, 242, "Month 5", 13, "fN") +
          line(46, Yc(24), 118, Yc(28), "sO", { "stroke-width": 3.5 }) + circ(118, Yc(28), 8, "fO") + TX(118, Yc(28) + 26, "28", 18, "fO") +
          chip(98, 70, "Last discussed", "n", 14) + line(110, 82, 118, Yc(28) - 10, "sN", { "stroke-width": 2 });
        c += R("3", "dr", path("M118 " + r1(Yc(28)) + " L194 " + r1(Yc(39)), "sO f0 dw", { pathLength: 1, "stroke-width": 3.5 })) +
          R("3", "pop", circ(194, Yc(39), 8, "fO") + TX(178, Yc(39) - 2, "39", 18, "fO e") + TX(194, 242, "Month 22", 13, "fN"));
        var cal7 = ""; for (k = 0; k < 7; k++) cal7 += R("2", "pop", rect(222 + (k % 4) * 31, 58 + Math.floor(k / 4) * 34, 26, 28, "fW sO", { rx: 4, "stroke-width": 1.6 }) + cross(235 + (k % 4) * 31, 72 + Math.floor(k / 4) * 34, 0.8, "sO"));
        c += cal7 + TX(282, 146, "7 months", 24, "fO") + TX(282, 166, "no discussion", 14, "fO");
        for (k = 0; k < 6; k++) c += R("3", "dn", doc(262 + k * 4, 208 - k * 5, 26, 30, "fW sN", 2));
        c += R("3", "up", chip(282, 252, "More reports", "pm", 13));
        return tag("Qasr evidence", "pm") + R("0-0", "f", a) + R("1-1", "pop", b) + R("2", "f", c);
      },
      on: function (A) { if (A.k === 0) A.walk(".n-sh", [[110, 140], [180, 120], [252, 140]], 1.8, { loop: true }); }
    });

    /* V3 · lines 7-8 — what reporting does vs what managing does; a token follows the managing path through
       Template: https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design (state-to-state product flow) */
    P.push({
      svg: function () {
        var s = card(10, 36, 164, 222, "pm") + card(186, 36, 164, 222, "pg") + TX(92, 60, "What reporting does", 14, "fN") + TX(268, 60, "What managing does", 14, "fG");
        [["chart", "Record results"], ["eye", "Share dashboards"], ["binder", "Circulate packs"]].forEach(function (r, j) {
          var y = 98 + j * 52; s += R("0", "l", card(20, y - 20, 144, 40, "p") + icon(r[0], 42, y, 0.8) + TX(60, y + 5, r[1], 13, "fN s"));
        });
        [["mag", "Interpret it"], ["gavel", "Decide action"], ["person", "Assign owner"], ["chart", "Check effect"]].forEach(function (r, j) {
          var y = 90 + j * 44; s += R("1", "r", card(196, y - 18, 144, 36, "g", { rx: 18 }) + (r[0] === "person" ? person(218, y + 12, 0.6, "W") : icon(r[0], 218, y, 0.7, r[0] === "chart" ? "sO" : "fW")) + TX(236, y + 5, r[1], 13, "nh fW s"));
          if (j < 3) s += R("1", "f", arrow(268, y + 18, 268, y + 26, "sG", 2));
        });
        s += R("1", "f", WK("mt", 340, 90, circ(0, 0, 7, "fD sN", { "stroke-width": 2 })));
        return s;
      },
      on: function (A) { if (A.k >= 1) A.walk(".n-mt", [[342, 72], [342, 222], [342, 222]], 2.6, { loop: true }); }
    });

    /* V4 · lines 9-10 — the thermometer works; nobody adjusts the cooling; measuring isn't fixing
       Template: https://observablehq.com/@d3/transition-end (move, wait, recolour in sequence) */
    P.push({
      svg: function () {
          var s = card(14, 38, 332, 232, "p") + rect(56, 66, 26, 140, "fW sN", { rx: 13, "stroke-width": 2 }) + circ(69, 214, 18, "fO") +
            rect(62, 140, 12, 76, "merc fO", { rx: 4 }) + TX(69, 246, "Room", 14, "fN") + TX(69, 264, "thermometer", 14, "fN");
        s += rect(206, 64, 120, 46, "fL sN", { rx: 6, "stroke-width": 2 }) + [76, 86, 96].map(function (y) { return line(218, y, 314, y, "sM", { "stroke-width": 2 }); }).join("") +
          TX(266, 134, "Cooling unit", 14, "fN") + rect(244, 156, 44, 26, "fM", { rx: 13 }) + circ(256, 169, 10, "fW") + TX(266, 204, "Switch untouched", 14, "fM");
        s += G("rise", path("M140 200 q-8 -12 0 -24 q8 -12 0 -24", "sO f0", { "stroke-width": 3, "stroke-linecap": "round" })) +
          G("rise", path("M168 210 q-8 -12 0 -24 q8 -12 0 -24", "sO f0", { "stroke-width": 3, "stroke-linecap": "round" }));
        s += R("0-0", "up", chip(222, 236, "Nobody adjusts cooling", "po", 14));
        s += R("1", "pop", okB(96, 70, 12) + chip(140, 46, "Instrument works", "g", 13) + chip(222, 236, "Measuring isn't fixing", "o", 14));
        return tag("Everyday analogy", "pm") + s;
      },
      on: function (A) { A.bar(".merc", "height", A.k === 0 ? 100 : 128, { y0: 216, from: A.fresh ? 64 : undefined, dur: 2.4 }); }
    });

    /* V5 · lines 11-14 — don't blame the analyst; who reviews? owner promoted, unreplaced; director with 13 reports
       Template: https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm (workers and workflow actions revealed) */
    P.push({
      svg: function () {
        var a = person(96, 200, 1.7, "G") + rect(40, 200, 120, 10, "fN", { rx: 3 }) + doc(132, 140, 28, 36, "fW sN", 3) + icon("shield", 96, 96, 1.6) +
          TX(96, 236, "Analyst did the job", 15, "fG") + G("", arrow(300, 80, 186, 150, "sO", 5)) + noB(300, 74, 13) + TX(280, 120, "Blame them?", 16, "fO");
        var b = doc(30, 104, 56, 72, "fW sN", 4) + TX(58, 196, "Monthly", 13, "fN") + TX(58, 212, "measure", 13, "fN") + arrow(92, 140, 132, 140, "sM", 3) +
          chair(180, 186, 1.5, "M") + qB(180, 98, 16) + arrow(222, 140, 262, 140, "sM", 3) + card(270, 108, 80, 64, "n") + TX(310, 138, "Arrival", 14, "nh fW") + TX(310, 156, "process", 14, "nh fW") +
          chip(180, 232, "Who reviews, responds?", "po", 15);
        var c = chair(110, 226, 1.6, "M") + chip(110, 246, "Process owner", "pm", 13) + rect(262, 90, 64, 140, "fS sN", { rx: 3, "stroke-width": 2 }) + TX(294, 80, "Marina GM", 14, "fN") +
          WK("ow5", 110, 214, person(0, 0, 1.4, "N")) + chip(160, 56, "Promoted, not replaced", "o", 14);
        var d = person(110, 214, 1.7, "N", { tie: true }) + TX(110, 244, "Operations director", 14, "fN") + chip(240, 56, "13 direct reports", "n", 14), i, ang;
        for (i = 0; i < 13; i++) { ang = (-170 + i * 160 / 12) * Math.PI / 180; d += person(110 + 92 * Math.cos(ang), 206 + 92 * Math.sin(ang), 0.42, "M"); }
        d += rect(238, 110, 92, 30, "fW sN", { rx: 6, "stroke-width": 2 }) + rect(242, 114, 26, 22, "fO", { rx: 3 }) + TX(284, 166, "Attention left", 14, "fO") + chip(284, 204, "Arrival process", "o", 13);
        return tag("Qasr evidence", "pm") + R("0-0", "f", a) + R("1-1", "pop", b) + R("2-2", "f", c) + R("3", "up", d);
      },
      on: function (A) { if (A.k === 2) A.walk(".n-ow5", [[110, 214], [200, 214], [290, 214]], 2.2, {}); }
    });

    /* V6 · lines 15-18 — the agreed monthly meeting; decisions not recitals; three review questions; examine the accumulated changes
       Template: https://dribbble.com/shots/27247003-Data-Workflow-Animation (nodes and links activate in sequence) */
    P.push({
      svg: function () {
        var a = WK("mm", 40, 120, doc(-14, -18, 28, 36, "fW sN", 3)) + cal(48, 196, 1.2, "fG") + TX(48, 234, "Monthly", 13, "fG") + TX(48, 249, "meeting", 13, "fG") +
          path("M150 150 a70 40 0 1 0 140 0 a70 40 0 1 0 -140 0", "fS sN", { "stroke-width": 2 }) +
          [[160, 104], [220, 94], [280, 104], [160, 202], [220, 212], [280, 202]].map(function (p) { return circ(p[0], p[1], 11, "fN"); }).join("") +
          chip(220, 152, "Arrival measure", "o", 13) + chip(220, 248, "Agreed review meeting", "g", 14);
        var b = card(10, 40, 160, 190, "pm") + TX(90, 62, "Every number", 15, "fM"), i;
        for (i = 0; i < 12; i++) b += rect(24 + (i % 4) * 36, 78 + Math.floor(i / 4) * 44, 30, 34, "fL sM", { rx: 4, "stroke-width": 1 }) + rect(30 + (i % 4) * 36, 100 + Math.floor(i / 4) * 44 - (6 + i * 5 % 14), 6, 6 + i * 5 % 14, "fM") + rect(40 + (i % 4) * 36, 100 + Math.floor(i / 4) * 44 - (8 + i * 3 % 12), 6, 8 + i * 3 % 12, "fM");
        b += noB(158, 46, 11) + arrow(176, 136, 200, 136, "sG", 4) + card(206, 60, 144, 150, "g") + TX(278, 86, "One decision", 16, "nh fW") +
          TX(220, 120, "Action agreed", 13, "nh fW s") + TX(220, 148, "Owner named", 13, "nh fW s") + TX(220, 176, "Check date", 13, "nh fW s") + okB(338, 64, 11) +
          chip(180, 246, "Decide, don't recite", "n", 14);
        var c = "";
        [["Still acceptable?", "chart"], ["What explains it?", "mag"], ["Which intervention?", "wrench"]].forEach(function (q, j) {
          c += R("2", "l", card(40, 46 + j * 66, 280, 54, "p") + icon(q[1], 78, 73 + j * 66, 1.2) + TX(106, 79 + j * 66, q[0], 17, "fN s"));
        });
        var d = crowd(40, 118, 4, 30, 0.85, "M") + noB(150, 70, 11) + TX(86, 140, "Not staff effort", 14, "fM");
        ["passport", "coin", "star", "desk"].forEach(function (ic, j) { d += card(186 + (j % 2) * 80, 52 + Math.floor(j / 2) * 64, 70, 54, "p") + icon(ic, 221 + (j % 2) * 80, 79 + Math.floor(j / 2) * 64, 1); });
        d += WK("mg6", 120, 110, icon("mag", 0, 0, 2.2)) + chip(256, 202, "+13 combined", "o", 14) + chip(180, 244, "Accumulated changes", "po", 15);
        return tag("Qasr evidence", "pm") + R("0-0", "f", a) + R("1-1", "pop", b) + R("2-2", "f", c) + R("3", "f", d);
      },
      on: function (A) {
        if (A.k === 0) A.walk(".n-mm", [[40, 120], [100, 120], [160, 150], [190, 152]], 2, {});
        if (A.k === 3) A.walk(".n-mg6", [[90, 92], [180, 92], [300, 150], [230, 100]], 3, {});
      }
    });

    /* V7 · lines 19-20 — ordinary variation vs real deterioration; the boundary agreed beforehand
       Template: https://observablehq.com/@d3/streamgraph-transitions (a band with a series moving through it) */
    P.push({
      svg: function () {
        var pts = [[40, 176], [70, 164], [100, 182], [130, 168], [160, 178], [190, 160], [220, 132], [250, 112], [280, 94], [310, 80]];
        var s = rect(30, 152, 300, 44, "fG", { opacity: 0.18, rx: 6 }) + TX(36, 214, "Ordinary variation", 14, "fG s") +
          line(30, 140, 330, 140, "sO", { "stroke-width": 2.6, "stroke-dasharray": "7 5" }) + TX(36, 132, "Agreed boundary", 14, "fO s") +
          line(30, 236, 330, 236, "sN", { "stroke-width": 2 });
        s += path("M" + pts.slice(0, 6).map(function (p) { return p.join(" "); }).join(" L"), "sN f0", { "stroke-width": 3 });
        s += pts.slice(0, 6).map(function (p) { return circ(p[0], p[1], 5, "fN"); }).join("");
        s += R("0", "dr", path("M" + pts.slice(5).map(function (p) { return p.join(" "); }).join(" L"), "sO f0 dw", { pathLength: 1, "stroke-width": 3.5 }));
        s += R("0", "pop", pts.slice(6).map(function (p) { return circ(p[0], p[1], 6, "fO"); }).join("") + G("wob", icon("bell", 300, 50, 1.2, "fO")));
        s += R("0-0", "up", TX(250, 64, "Real deterioration", 15, "fO e"));
        s += R("1", "pop", card(36, 40, 170, 56, "g") + icon("gavel", 62, 68, 1, "fW") + TX(132, 64, "Agreed", 15, "nh fW") + TX(132, 84, "in advance", 15, "nh fW") +
          card(214, 166, 120, 54, "po") + TX(274, 198, "Postpone again?", 14, "fO") + noB(328, 168, 10));
        return tag("Illustrative example", "pm") + s;
      }
    });

    /* V8 · lines 21-22 — follow up: check the effect; if still poor, rethink the explanation
       Template: https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5 (branch, merge, reconnect) */
    P.push({
      svg: function () {
        var a = card(12, 104, 104, 72, "n") + TX(64, 134, "Corrective", 14, "nh fW") + TX(64, 154, "action", 14, "nh fW") +
          arrow(120, 130, 196, 76, "sM", 3) + arrow(120, 150, 196, 204, "sG", 3) +
          rect(206, 44, 70, 64, "fM", { rx: 4 }) + line(212, 66, 270, 66, "sW", { "stroke-width": 2 }) + line(212, 86, 270, 86, "sW", { "stroke-width": 2 }) + noB(282, 48, 11) + TX(300, 118, "Just a record", 14, "fM") +
          icon("chart", 240, 196, 2) + okB(282, 168, 11) + TX(286, 248, "Check the effect", 14, "fG");
        var b = icon("chart", 66, 96, 2.2, "sO") + TX(66, 150, "Still poor", 15, "fO") + carrow(110, 92, 180, 30, 250, 92, "sN", 3) +
          card(204, 100, 140, 54, "p") + TX(274, 124, "Rethink", 15, "fN") + TX(274, 142, "explanation", 14, "fN") + arrow(274, 160, 274, 186, "sN", 3) +
          card(196, 192, 156, 50, "g") + TX(274, 222, "Different intervention", 13, "nh fW") + G("spin", loopRing(66, 210, 22, 4, "sN"));
        return R("0-0", "f", a) + R("1", "pop", b);
      }
    });

    /* V9 · lines 23-26 — no giant dashboard; a few measures, discussed; behaviour, not production; next: four signals
       Template: https://lottiefiles.com/free-animation/infographics-dashboard-X6P5rVLZAB (dashboard metric emphasis) */
    P.push({
      svg: function () {
        var a = card(20, 40, 320, 190, "pm"), i;
        for (i = 0; i < 24; i++) a += rect(34 + (i % 6) * 50, 54 + Math.floor(i / 6) * 42, 42, 34, "fL sM", { rx: 4, "stroke-width": 1 }) + line(40 + (i % 6) * 50, 80 + Math.floor(i / 6) * 42, 70 + (i % 6) * 50, 66 + Math.floor(i / 6) * 42 + (i * 7 % 10), "sM", { "stroke-width": 2 });
        a += noB(330, 44, 13) + chip(180, 248, "Every statistic", "pm", 14);
        var b = "";
        [["Arrival time", "clock"], ["Kiosk adoption", "kiosk"], ["Exception data", "spark"]].forEach(function (m, j) {
          b += R("1", "pop", card(14 + j * 114, 44, 104, 104, "n") + icon(m[1], 66 + j * 114, 86, 1.4, m[1] === "kiosk" ? "fW" : undefined) + TX(66 + j * 114, 134, m[0], 13, "nh fW"));
        });
        b += crowd(90, 214, 4, 40, 1, "G") + arrow(232, 192, 262, 192, "sG", 3) + card(268, 168, 82, 48, "g") + icon("gavel", 309, 192, 1, "fW") + TX(180, 246, "Discussed, decided", 14, "fG");
        var c = card(10, 40, 164, 210, "pm") + card(186, 40, 164, 210, "pg") + TX(92, 64, "Production only", 15, "fM") + TX(268, 64, "Active management", 14, "fG");
        for (i = 0; i < 6; i++) c += doc(70 + i * 4, 190 - i * 14, 30, 36, "fW sM", 2);
        c += crowd(226, 220, 3, 42, 1, "G") + G("spin", loopRing(268, 130, 30, 5, "sG")) + icon("chart", 268, 130, 1);
        var d = "";
        [["Arrival time", "clock"], ["Kiosk adoption", "kiosk"], ["Exception volume", "spark"], ["Process variants", "flag"]].forEach(function (m, j) {
          var y = 64 + j * 50;
          d += R("3", "l", card(44, y - 20, 272, 42, "p") + G("blink", circ(72, y + 1, 13, "fO")) + icon(m[1], 112, y + 1, 0.8) + TX(136, y + 7, m[0], 16, "fN s"));
        });
        return R("0-0", "f", a) + R("1-1", "f", b) + R("2-2", "up", c) + d;
      }
    });

    define({
      id: "W14O2c", kicker: "REPORT VS MANAGE", aria: "Qasr's arrival measure keeps being produced on page four while nobody reviews it; the visuals contrast reporting with managing, the agreed review meeting, thresholds and follow-through.",
      panels: P,
      lines: [
        [0, 0, "Nobody checked combined"], [0, 1, "Accurate data, lost gains"], [0, 2, "Reassuring, yet stalled"],
        [1, 0, "Analyst reports monthly"], [1, 1, "Page four, still collected"], [1, 2, "Last discussed at 28"], [1, 3, "Reported, not prevented"],
        [2, 0, "Reporting records, communicates"], [2, 1, "Managing decides, follows through"],
        [3, 0, "Nobody adjusts cooling"], [3, 1, "Measuring isn't fixing"],
        [4, 0, "Don't blame analyst"], [4, 1, "Who reviews, responds?"], [4, 2, "Owner promoted, unreplaced"], [4, 3, "Director: 13 reports"],
        [5, 0, "Agreed review meeting"], [5, 1, "Decisions, not recitals"], [5, 2, "Three review questions"], [5, 3, "Examine accumulated changes"],
        [6, 0, "Variation or deterioration?"], [6, 1, "Thresholds agreed beforehand"],
        [7, 0, "Check the effect"], [7, 1, "Rethink if poor"],
        [8, 0, "No giant dashboard"], [8, 1, "Few measures, used"], [8, 2, "Behaviour, not production"], [8, 3, "Next: four signals"]
      ]
    });
  })();

})();
// END FILE: w14-claude-v2-part1.js

// FILE: w14-claude-v2-part2.js
// OPER621 · Business Process Management · Week 14 · The Sustainable Performance Phase
// Animated teaching scenes — Claude v2 rebuild — PART 2 of 4 — sections: W14O1c, W14O3c, W14O3a
// Next: W14O1c (2.5), W14O3c (2.5), W14O3a (2.6) (GPT-6 content audit).
//
// CONTRACT (unchanged): window.VL_SCENES = window.VL_SCENES || {};
//   VL_SCENES['<secId>'] = { build(el), step(i, n), reset() }
// - Standalone: defines every helper it uses, registers its own scenes and appends its own
//   rules, scoped under .vls-w14-<secId>, to the single <style id="vl-sc-w14">.
// - One narration line = one explicit visual state. Each section is a sequence of 8-11
//   distinct visuals (a new visual every 2-4 lines); every line has its own 2-4 word caption.
// - step(i, n): when n equals the section's narration count, line i maps 1:1; otherwise it
//   is mapped proportionally. State is re-derived on every call, so seeking is safe.
// - window.gsap is used for pop/shake flourishes when present; a built-in rAF tween engine
//   and CSS transitions/keyframes are used otherwise.
// - prefers-reduced-motion: every state is applied instantly, no loops or keyframes.
// - Stage: 360 x 300 viewBox (meet), full-bleed paper background; the figure fills a phone
//   strip above the text or the left 60% on a laptop. Text is never smaller than 13 px.
// - Qasr figures only as documented in Exhibit 14; proposals and illustrations are labelled.
// - Original code: no part of the live scenes or of the previous Claude edition is reused.
(function () {
  "use strict";
  var PART = "p2";
  var IDS = ["W14O1c", "W14O3c", "W14O3a"];
  /* ==================================================================
     ENGINE (self-contained; every helper used by the scenes is defined here)
     ================================================================== */
  var W = window, NS = "http://www.w3.org/2000/svg", STYLE_ID = "vl-sc-w14";
  window.VL_SCENES = window.VL_SCENES || {};
  var VL = window.VL_SCENES;
  var KF = "vlsW14v2" + PART;            /* keyframe prefix, unique per part */
  var SEC_CSS = [];

  function esc(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fin(v, d) { v = Number(v); return isFinite(v) ? v : (d === undefined ? 0 : d); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function r1(v) { return Math.round(v * 10) / 10; }
  function reduced() {
    try { return !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    catch (e) { return false; }
  }
  function gsapLib() {
    var g = W.gsap;
    return g && typeof g.to === "function" && typeof g.fromTo === "function" ? g : null;
  }
  function now() { return (W.performance && W.performance.now) ? W.performance.now() : Date.now(); }
  var RAF = (W.requestAnimationFrame && W.requestAnimationFrame.bind(W)) || function (f) { return setTimeout(function () { f(now()); }, 16); };
  var CAF = (W.cancelAnimationFrame && W.cancelAnimationFrame.bind(W)) || clearTimeout;
  var EASE = {
    lin: function (t) { return t; },
    io: function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; },
    out: function (t) { return 1 - Math.pow(1 - t, 3); },
    back: function (t) { var c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }
  };

  /* ---------- SVG string builders ---------- */
  function at(o) {
    var s = "", k, v;
    for (k in o) {
      if (!Object.prototype.hasOwnProperty.call(o, k)) continue;
      v = o[k];
      if (v === undefined || v === null || v === false) continue;
      s += " " + (k === "c" ? "class" : k) + '="' + esc(typeof v === "number" ? r1(v) : v) + '"';
    }
    return s;
  }
  function E(tag, o, inner) { return "<" + tag + at(o || {}) + ">" + (inner || "") + "</" + tag + ">"; }
  function G(c, inner, o) { o = o || {}; if (c) o.c = c; return E("g", o, inner); }
  function rect(x, y, w, h, c, o) { o = o || {}; o.x = x; o.y = y; o.width = Math.max(0, w); o.height = Math.max(0, h); if (c) o.c = c; return E("rect", o); }
  function circ(x, y, r, c, o) { o = o || {}; o.cx = x; o.cy = y; o.r = Math.max(0, r); if (c) o.c = c; return E("circle", o); }
  function line(x1, y1, x2, y2, c, o) { o = o || {}; o.x1 = x1; o.y1 = y1; o.x2 = x2; o.y2 = y2; if (c) o.c = c; return E("line", o); }
  function path(d, c, o) { o = o || {}; o.d = d; if (c) o.c = c; return E("path", o); }
  function T(x, y, s, c, o) { o = o || {}; o.x = x; o.y = y; o.c = "tx " + (c || "t14"); return E("text", o, esc(s)); }
  /* reveal group: visible for k in range r ("2" = from 2 on, "1-3" = 1..3) */
  function R(r, fx, inner) { return '<g class="rv" data-r="' + r + '" data-fx="' + (fx || "f") + '">' + inner + "</g>"; }
  /* movable group, positioned by CSS transform (never by the transform attribute) */
  function M(n, x, y, inner, cls) {
    return '<g class="' + (cls || "mv") + " n-" + n + '" style="transform:translate(' + r1(x) + "px," + r1(y) + 'px)">' + inner + "</g>";
  }
  function WK(n, x, y, inner) { return M(n, x, y, inner, "wk"); }
  function tw(s, fs) {
    var w = 0, i, ch; s = String(s);
    for (i = 0; i < s.length; i++) {
      ch = s.charAt(i);
      w += /[A-Z%]/.test(ch) ? 0.7 : /[0-9]/.test(ch) ? 0.6 : /[mwMW]/.test(ch) ? 0.88 : /[il.,:;'|!\s]/.test(ch) ? 0.3 : /[ftjr]/.test(ch) ? 0.42 : 0.58;
    }
    return w * fs * 1.12;
  }
  var CHIP = {
    n: ["fN", "fW"], o: ["fO", "fW"], g: ["fG", "fW"], d: ["fD", "fI"], m: ["fM", "fW"], i: ["fI", "fW"],
    p: ["fP sN", "fN"], po: ["fP sO", "fO"], pg: ["fP sG", "fG"], pm: ["fP sM", "fM"], l: ["fL sN", "fN"]
  };
  function chipW(s, fs) { fs = fs || 14; return tw(s, fs) + fs * 1.5; }
  function chip(x, y, s, v, fs, o) {
    var k = CHIP[v || "p"]; fs = fs || 14;
    var w = chipW(s, fs), h = fs * 1.85;
    return G("", rect(x - w / 2, y - h / 2, w, h, k[0], { rx: h / 2, "stroke-width": 1.8 }) +
      T(x, y + fs * 0.36, s, "nh " + k[1], { style: "font-size:" + fs + "px" }), o);
  }
  function card(x, y, w, h, v, o) { var k = CHIP[v || "p"]; o = o || {}; o.rx = o.rx || 10; o["stroke-width"] = o["stroke-width"] || 1.8; return rect(x, y, w, h, k[0], o); }
  function fsz(n) { return { style: "font-size:" + n + "px" }; }
  function TX(x, y, s, n, c, o) { o = o || {}; o.style = "font-size:" + n + "px" + (o.style ? ";" + o.style : ""); return T(x, y, s, c || "fI", o); }
  function arrow(x1, y1, x2, y2, c, w) {
    c = c || "sN"; w = w || 3;
    var a = Math.atan2(y2 - y1, x2 - x1), h = w * 3.1;
    var bx = x2 - h * Math.cos(a), by = y2 - h * Math.sin(a), px = -Math.sin(a) * h * 0.62, py = Math.cos(a) * h * 0.62;
    return line(x1, y1, bx, by, c, { "stroke-width": w, "stroke-linecap": "round" }) +
      path("M" + r1(x2) + " " + r1(y2) + " L" + r1(bx + px) + " " + r1(by + py) + " L" + r1(bx - px) + " " + r1(by - py) + " Z", c.replace(/s([A-Z])/, "f$1"));
  }
  function carrow(x1, y1, cx, cy, x2, y2, c, w, dash) {
    c = c || "sN"; w = w || 3;
    var a = Math.atan2(y2 - cy, x2 - cx), h = w * 3.1;
    var bx = x2 - h * Math.cos(a), by = y2 - h * Math.sin(a), px = -Math.sin(a) * h * 0.62, py = Math.cos(a) * h * 0.62;
    return path("M" + r1(x1) + " " + r1(y1) + " Q" + r1(cx) + " " + r1(cy) + " " + r1(bx) + " " + r1(by), c + " f0" + (dash ? " flowd" : ""), { "stroke-width": w, "stroke-linecap": "round" }) +
      path("M" + r1(x2) + " " + r1(y2) + " L" + r1(bx + px) + " " + r1(by + py) + " L" + r1(bx - px) + " " + r1(by - py) + " Z", c.replace(/s([A-Z])/, "f$1"));
  }
  function tick(x, y, s, c) {
    return path("M" + r1(x - 6 * s) + " " + r1(y) + " l" + r1(4 * s) + " " + r1(4.6 * s) + " l" + r1(8.5 * s) + " " + r1(-9.5 * s), (c || "sW") + " f0",
      { "stroke-width": Math.max(2.2, 2.7 * s), "stroke-linecap": "round", "stroke-linejoin": "round" });
  }
  function cross(x, y, s, c) {
    return path("M" + r1(x - 5 * s) + " " + r1(y - 5 * s) + " l" + r1(10 * s) + " " + r1(10 * s) + " M" + r1(x + 5 * s) + " " + r1(y - 5 * s) + " l" + r1(-10 * s) + " " + r1(10 * s),
      (c || "sW") + " f0", { "stroke-width": Math.max(2.2, 2.7 * s), "stroke-linecap": "round" });
  }
  function okB(x, y, r) { return circ(x, y, r, "fG") + tick(x, y + r * 0.08, r / 9.5); }
  function noB(x, y, r) { return circ(x, y, r, "fO") + cross(x, y, r / 10.5); }
  function qB(x, y, r) { var f = Math.max(13, r * 1.3); return circ(x, y, Math.max(r, 9.5), "fM") + TX(x, y + f * 0.36, "?", f, "nh fW"); }
  function strike(x1, y1, x2, y2) { return line(x1, y1, x2, y2, "sO", { "stroke-width": 5, "stroke-linecap": "round", opacity: 0.92 }); }
  function person(x, y, s, col, o) {
    s = s || 1; col = col || "N"; o = o || {};
    var h = path("M" + r1(x - 12 * s) + " " + r1(y) + " C" + r1(x - 12 * s) + " " + r1(y - 23 * s) + " " + r1(x + 12 * s) + " " + r1(y - 23 * s) + " " + r1(x + 12 * s) + " " + r1(y) + " Z", "f" + col);
    h += circ(x, y - 27 * s, 8.5 * s, "f" + col);
    if (o.clip) h += rect(x + 5 * s, y - 15 * s, 10 * s, 13 * s, "fW sN", { rx: 1.5, "stroke-width": 1.3 });
    if (o.tie) h += path("M" + r1(x) + " " + r1(y - 17 * s) + " l" + r1(-2.5 * s) + " " + r1(5 * s) + " l" + r1(2.5 * s) + " " + r1(7 * s) + " l" + r1(2.5 * s) + " " + r1(-7 * s) + " Z", "fO");
    if (o.ghost) h = G("ghost", h);
    return h;
  }
  function crowd(x, y, n, gap, s, col) { var h = "", i; for (i = 0; i < n; i++) h += person(x + i * gap, y, s, col); return h; }
  function chair(x, y, s, c) {
    s = s || 1; c = c || "N";
    return rect(x - 13 * s, y - 38 * s, 6 * s, 38 * s, "f" + c, { rx: 2 }) + rect(x - 13 * s, y - 16 * s, 28 * s, 6 * s, "f" + c, { rx: 2 }) +
      rect(x + 10 * s, y - 10 * s, 4.5 * s, 10 * s, "f" + c) + rect(x - 9 * s, y - 10 * s, 4.5 * s, 10 * s, "f" + c);
  }
  function doc(x, y, w, h, c, n, lc) {
    var f = Math.min(10, w * 0.25), s, i;
    s = path("M" + r1(x) + " " + r1(y) + " h" + r1(w - f) + " l" + r1(f) + " " + r1(f) + " v" + r1(h - f) + " h" + r1(-w) + " Z", c || "fW sN", { "stroke-width": 1.6 });
    for (i = 0; i < (n === undefined ? 3 : n); i++)
      s += line(x + w * 0.16, y + h * 0.32 + i * h * 0.18, x + w * (i % 2 ? 0.64 : 0.82), y + h * 0.32 + i * h * 0.18, lc || "sM", { "stroke-width": 2, "stroke-linecap": "round" });
    return s;
  }
  function cal(x, y, s, head, txt, tc) {
    var w = 36 * s, h = 36 * s;
    return rect(x - w / 2, y - h / 2, w, h, "fW sN", { rx: 4 * s, "stroke-width": 1.6 }) + rect(x - w / 2, y - h / 2, w, 10 * s, head || "fO", { rx: 3 * s }) +
      rect(x - w / 2, y - h / 2 + 6 * s, w, 4 * s, head || "fO") + (txt ? TX(x, y + 11 * s, txt, 15 * s, "nh " + (tc || "fN")) : "");
  }
  function hotel(x, y, s, c, mark) {
    var w = 24 * s, h = 30 * s, i, j, out = rect(x - w / 2, y - h, w, h, c || "fN", { rx: 2 });
    for (i = 0; i < 3; i++) for (j = 0; j < 2; j++) out += rect(x - w / 2 + 4 * s + j * 10 * s, y - h + 4 * s + i * 7.5 * s, 6 * s, 4.5 * s, "fW", { opacity: 0.85 });
    out += rect(x - 3 * s, y - 6 * s, 6 * s, 6 * s, "fD");
    if (mark) out += circ(x + w / 2, y - h, 6.5 * s, mark === "o" ? "fO" : "fG") + (mark === "o" ? "" : tick(x + w / 2, y - h + 0.5, 0.5 * s));
    return out;
  }
  function gearP(cx, cy, r, teeth) {
    var d = "", i, n = teeth || 8, a, a2, ro = r, ri = r * 0.78;
    for (i = 0; i < n; i++) {
      a = i / n * Math.PI * 2; a2 = (i + 0.5) / n * Math.PI * 2;
      d += (i ? "L" : "M") + r1(cx + ro * Math.cos(a - 0.18)) + " " + r1(cy + ro * Math.sin(a - 0.18)) + " L" + r1(cx + ro * Math.cos(a + 0.18)) + " " + r1(cy + ro * Math.sin(a + 0.18)) +
        " L" + r1(cx + ri * Math.cos(a2 - 0.2)) + " " + r1(cy + ri * Math.sin(a2 - 0.2)) + " L" + r1(cx + ri * Math.cos(a2 + 0.2)) + " " + r1(cy + ri * Math.sin(a2 + 0.2));
    }
    return d + " Z";
  }
  function gear(cx, cy, r, c, cls) { return G(cls || "", path(gearP(cx, cy, r, Math.max(6, Math.round(r / 2.6))), c || "fN") + circ(cx, cy, r * 0.32, "fP")); }
  /* small pictograms centred on x,y (about 26*s wide) */
  function icon(n, x, y, s, c) {
    s = s || 1; var h = "";
    switch (n) {
      case "passport": h = rect(x - 9 * s, y - 12 * s, 18 * s, 24 * s, c || "fN", { rx: 2.5 }) + circ(x, y - 2 * s, 5 * s, "f0 sD", { "stroke-width": 1.6 }) + line(x - 5 * s, y + 7 * s, x + 5 * s, y + 7 * s, "sD", { "stroke-width": 1.6 }); break;
      case "coin": h = circ(x, y, 11 * s, c || "fD") + circ(x, y, 7.5 * s, "f0 sW", { "stroke-width": 1.6 }) + rect(x - 1.6 * s, y - 5 * s, 3.2 * s, 10 * s, "fW", { rx: 1 }); break;
      case "star": h = path("M" + r1(x) + " " + r1(y - 12 * s) + " l" + r1(3.5 * s) + " " + r1(7.5 * s) + " l" + r1(8 * s) + " " + r1(0.8 * s) + " l" + r1(-6 * s) + " " + r1(5.5 * s) + " l" + r1(1.8 * s) + " " + r1(8 * s) + " l" + r1(-7.3 * s) + " " + r1(-4.2 * s) + " l" + r1(-7.3 * s) + " " + r1(4.2 * s) + " l" + r1(1.8 * s) + " " + r1(-8 * s) + " l" + r1(-6 * s) + " " + r1(-5.5 * s) + " l" + r1(8 * s) + " " + r1(-0.8 * s) + " Z", c || "fD"); break;
      case "desk": h = rect(x - 13 * s, y - 2 * s, 26 * s, 5 * s, c || "fN", { rx: 1.5 }) + rect(x - 11 * s, y + 3 * s, 4 * s, 9 * s, c || "fN") + rect(x + 7 * s, y + 3 * s, 4 * s, 9 * s, c || "fN") + circ(x, y - 11 * s, 4.5 * s, "fO") + path("M" + r1(x - 7 * s) + " " + r1(y - 2 * s) + " q" + r1(7 * s) + " " + r1(-9 * s) + " " + r1(14 * s) + " 0", "fO"); break;
      case "kiosk": h = rect(x - 8 * s, y - 13 * s, 16 * s, 22 * s, c || "fN", { rx: 2.5 }) + rect(x - 5.5 * s, y - 10 * s, 11 * s, 9 * s, "fB") + rect(x - 3 * s, y + 9 * s, 6 * s, 4 * s, c || "fN"); break;
      case "shield": h = path("M" + r1(x) + " " + r1(y - 12 * s) + " l" + r1(10 * s) + " " + r1(4 * s) + " v" + r1(6 * s) + " c0 " + r1(7 * s) + " " + r1(-5 * s) + " " + r1(11 * s) + " " + r1(-10 * s) + " " + r1(13 * s) + " c" + r1(-5 * s) + " " + r1(-2 * s) + " " + r1(-10 * s) + " " + r1(-6 * s) + " " + r1(-10 * s) + " " + r1(-13 * s) + " v" + r1(-6 * s) + " Z", c || "fG") + tick(x, y, 0.55 * s); break;
      case "bell": h = path("M" + r1(x - 10 * s) + " " + r1(y + 6 * s) + " q0 " + r1(-17 * s) + " " + r1(10 * s) + " " + r1(-17 * s) + " q" + r1(10 * s) + " 0 " + r1(10 * s) + " " + r1(17 * s) + " l" + r1(3 * s) + " " + r1(4 * s) + " h" + r1(-26 * s) + " Z", c || "fD") + circ(x, y + 12 * s, 3 * s, "fN"); break;
      case "mag": h = circ(x - 3 * s, y - 3 * s, 8.5 * s, "fW sN", { "stroke-width": 3 * s }) + line(x + 3.5 * s, y + 3.5 * s, x + 11 * s, y + 11 * s, c || "sN", { "stroke-width": 4.5 * s, "stroke-linecap": "round" }); break;
      case "wrench": h = path("M" + r1(x - 10 * s) + " " + r1(y + 10 * s) + " L" + r1(x + 4 * s) + " " + r1(y - 4 * s), c || "sN", { "stroke-width": 5 * s, "stroke-linecap": "round" }) + circ(x + 6 * s, y - 6 * s, 6 * s, "f0 " + (c || "sN"), { "stroke-width": 3.5 * s }); break;
      case "clock": h = circ(x, y, 12 * s, "fW sN", { "stroke-width": 2.4 }) + line(x, y, x, y - 8 * s, "sN", { "stroke-width": 2.4, "stroke-linecap": "round" }) + line(x, y, x + 6 * s, y + 3 * s, c || "sO", { "stroke-width": 2.4, "stroke-linecap": "round" }); break;
      case "flag": h = line(x - 8 * s, y - 13 * s, x - 8 * s, y + 13 * s, "sN", { "stroke-width": 2.5 }) + path("M" + r1(x - 8 * s) + " " + r1(y - 13 * s) + " h" + r1(18 * s) + " l" + r1(-4 * s) + " " + r1(5 * s) + " l" + r1(4 * s) + " " + r1(5 * s) + " h" + r1(-18 * s) + " Z", c || "fO"); break;
      case "key": h = circ(x - 7 * s, y, 6 * s, "f0 " + (c || "sD"), { "stroke-width": 3.4 * s }) + path("M" + r1(x - 1 * s) + " " + r1(y) + " h" + r1(13 * s) + " v" + r1(5 * s) + " M" + r1(x + 7 * s) + " " + r1(y) + " v" + r1(4 * s), (c || "sD") + " f0", { "stroke-width": 3.4 * s, "stroke-linecap": "round" }); break;
      case "book": h = path("M" + r1(x) + " " + r1(y - 9 * s) + " q" + r1(-7 * s) + " " + r1(-4 * s) + " " + r1(-13 * s) + " 0 v" + r1(19 * s) + " q" + r1(6 * s) + " " + r1(-4 * s) + " " + r1(13 * s) + " 0 q" + r1(7 * s) + " " + r1(-4 * s) + " " + r1(13 * s) + " 0 v" + r1(-19 * s) + " q" + r1(-6 * s) + " " + r1(-4 * s) + " " + r1(-13 * s) + " 0 Z", c || "fN") + line(x, y - 9 * s, x, y + 10 * s, "sW", { "stroke-width": 1.4 }); break;
      case "mega": h = path("M" + r1(x - 11 * s) + " " + r1(y - 4 * s) + " h" + r1(6 * s) + " l" + r1(14 * s) + " " + r1(-8 * s) + " v" + r1(24 * s) + " l" + r1(-14 * s) + " " + r1(-8 * s) + " h" + r1(-6 * s) + " Z", c || "fO"); break;
      case "trophy": h = path("M" + r1(x - 10 * s) + " " + r1(y - 12 * s) + " h" + r1(20 * s) + " v" + r1(6 * s) + " q0 " + r1(10 * s) + " " + r1(-10 * s) + " " + r1(10 * s) + " q" + r1(-10 * s) + " 0 " + r1(-10 * s) + " " + r1(-10 * s) + " Z", c || "fD") + rect(x - 2 * s, y + 4 * s, 4 * s, 5 * s, c || "fD") + rect(x - 7 * s, y + 9 * s, 14 * s, 4 * s, "fN", { rx: 1 }); break;
      case "bulb": h = circ(x, y - 3 * s, 9 * s, c || "fD") + rect(x - 4.5 * s, y + 5 * s, 9 * s, 6 * s, "fN", { rx: 1.5 }); break;
      case "scissors": h = circ(x - 7 * s, y + 6 * s, 4.5 * s, "f0 sO", { "stroke-width": 2.6 }) + circ(x + 7 * s, y + 6 * s, 4.5 * s, "f0 sO", { "stroke-width": 2.6 }) + line(x - 4 * s, y + 3 * s, x + 6 * s, y - 12 * s, "sN", { "stroke-width": 2.6, "stroke-linecap": "round" }) + line(x + 4 * s, y + 3 * s, x - 6 * s, y - 12 * s, "sN", { "stroke-width": 2.6, "stroke-linecap": "round" }); break;
      case "gavel": h = rect(x - 12 * s, y - 10 * s, 14 * s, 8 * s, c || "fN", { rx: 2, transform: "rotate(-30 " + r1(x - 5 * s) + " " + r1(y - 6 * s) + ")" }) + line(x - 3 * s, y - 4 * s, x + 9 * s, y + 9 * s, "sN", { "stroke-width": 3.4, "stroke-linecap": "round" }) + rect(x - 12 * s, y + 9 * s, 16 * s, 4 * s, "fN", { rx: 1 }); break;
      case "eye": h = path("M" + r1(x - 13 * s) + " " + r1(y) + " q" + r1(13 * s) + " " + r1(-13 * s) + " " + r1(26 * s) + " 0 q" + r1(-13 * s) + " " + r1(13 * s) + " " + r1(-26 * s) + " 0 Z", "fW sN", { "stroke-width": 2 }) + circ(x, y, 5 * s, c || "fN"); break;
      case "spark": h = path("M" + r1(x) + " " + r1(y - 13 * s) + " l" + r1(4 * s) + " " + r1(9 * s) + " l" + r1(9 * s) + " " + r1(4 * s) + " l" + r1(-9 * s) + " " + r1(4 * s) + " l" + r1(-4 * s) + " " + r1(9 * s) + " l" + r1(-4 * s) + " " + r1(-9 * s) + " l" + r1(-9 * s) + " " + r1(-4 * s) + " l" + r1(9 * s) + " " + r1(-4 * s) + " Z", c || "fO"); break;
      case "pin": h = path("M" + r1(x) + " " + r1(y + 12 * s) + " q" + r1(-11 * s) + " " + r1(-12 * s) + " " + r1(-11 * s) + " " + r1(-20 * s) + " a" + r1(11 * s) + " " + r1(11 * s) + " 0 0 1 " + r1(22 * s) + " 0 q0 " + r1(8 * s) + " " + r1(-11 * s) + " " + r1(20 * s) + " Z", c || "fO") + circ(x, y - 8 * s, 4 * s, "fW"); break;
      case "chart": h = rect(x - 12 * s, y - 12 * s, 24 * s, 24 * s, "fW sN", { rx: 3, "stroke-width": 1.6 }) + path("M" + r1(x - 8 * s) + " " + r1(y + 6 * s) + " L" + r1(x - 2 * s) + " " + r1(y - 1 * s) + " L" + r1(x + 2 * s) + " " + r1(y + 3 * s) + " L" + r1(x + 8 * s) + " " + r1(y - 7 * s), (c || "sO") + " f0", { "stroke-width": 2.4, "stroke-linecap": "round", "stroke-linejoin": "round" }); break;
      case "binder": h = rect(x - 10 * s, y - 13 * s, 20 * s, 26 * s, c || "fN", { rx: 2 }) + rect(x - 6 * s, y - 8 * s, 12 * s, 7 * s, "fW", { rx: 1 }) + circ(x, y + 7 * s, 2.6 * s, "fW"); break;
      case "ice": h = path("M" + r1(x) + " " + r1(y - 13 * s) + " v" + r1(26 * s) + " M" + r1(x - 11 * s) + " " + r1(y - 6.5 * s) + " l" + r1(22 * s) + " " + r1(13 * s) + " M" + r1(x - 11 * s) + " " + r1(y + 6.5 * s) + " l" + r1(22 * s) + " " + r1(-13 * s), (c || "sB") + " f0", { "stroke-width": 3, "stroke-linecap": "round" }); break;
      case "fire": h = path("M" + r1(x) + " " + r1(y - 13 * s) + " q" + r1(11 * s) + " " + r1(10 * s) + " " + r1(8 * s) + " " + r1(19 * s) + " q" + r1(-3 * s) + " " + r1(6 * s) + " " + r1(-8 * s) + " " + r1(6 * s) + " q" + r1(-9 * s) + " 0 " + r1(-9 * s) + " " + r1(-9 * s) + " q0 " + r1(-7 * s) + " " + r1(9 * s) + " " + r1(-16 * s) + " Z", c || "fO"); break;
      case "puzzle": h = path("M" + r1(x - 11 * s) + " " + r1(y - 11 * s) + " h" + r1(7 * s) + " a" + r1(4 * s) + " " + r1(4 * s) + " 0 0 1 " + r1(8 * s) + " 0 h" + r1(7 * s) + " v" + r1(7 * s) + " a" + r1(4 * s) + " " + r1(4 * s) + " 0 0 1 0 " + r1(8 * s) + " v" + r1(7 * s) + " h" + r1(-22 * s) + " Z", c || "fD"); break;
      case "gear": h = path(gearP(x, y, 12 * s, 8), c || "fN") + circ(x, y, 4.2 * s, "fP"); break;
      default: h = circ(x, y, 10 * s, c || "fN");
    }
    return h;
  }
  /* bar chart with grow-up reveals; items: {v, l, r, c, t} */
  function bars(o) {
    var s = "", n = o.items.length, i, it, x, bh, w = n * (o.bw + o.gap) - o.gap;
    for (i = 0; i < n; i++) {
      it = o.items[i]; x = o.x + i * (o.bw + o.gap); bh = it.v / o.max * o.h;
      s += R(it.r, "gy", rect(x, o.base - bh, o.bw, bh, it.c || "fN", { rx: Math.min(6, o.bw / 5) }));
      s += R(it.r, "up", TX(x + o.bw / 2, o.base - bh - 8, it.t || String(it.v), o.fs || 22, it.tc || "fI"));
      s += R(it.r, "f", TX(x + o.bw / 2, o.base + 19, it.l, o.ls || 14, "fN"));
    }
    return s + line(o.x - 8, o.base, o.x + w + 8, o.base, "sN", { "stroke-width": 2.4, "stroke-linecap": "round" });
  }
  function tag(s, v) { return chip(348 - chipW(s, 13) / 2, 19, s, v || "pm", 13); }
  function loopRing(cx, cy, r, w, c) {
    return path("M" + r1(cx - r) + " " + r1(cy) + " a" + r + " " + r + " 0 1 1 " + r1(2 * r) + " 0 a" + r + " " + r + " 0 1 1 " + r1(-2 * r) + " 0", (c || "sG") + " f0 flowd", { "stroke-width": w || 3 });
  }
  function ringPts(cx, cy, r, n, a0) { var p = [], i, a; for (i = 0; i <= n; i++) { a = (a0 || -90) * Math.PI / 180 + i / n * Math.PI * 2; p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } return p; }

  /* ---------- CSS (scoped under .vls-w14-<secId>, one shared <style id="vl-sc-w14">) ---------- */
  function sc(ids, sel) { return ids.map(function (id) { return ".vls-w14-" + id + (sel ? " " + sel : ""); }).join(","); }
  function baseCSS(ids) {
    var R2 = [];
    function add(sel, body) { R2.push(sc(ids, sel) + "{" + body + "}"); }
    R2.push(sc(ids, "") + "{--n:var(--vl-sc-navy,#1f4e79);--o:var(--vl-sc-orange,#c0502a);--g:var(--vl-sc-green,#317c61);--p:var(--vl-sc-paper,#fbf8f1);" +
      "--i:var(--vl-sc-ink,#1b2a3a);--b:var(--vl-sc-blue,#dbe7f2);--m:#7f98ad;--d:#d39b45;--l:#edf3f6;--s:#efe5d0;--w:#ffffff;--r:#a8321f;" +
      "position:relative;display:block;width:100%;height:100%;min-height:0;overflow:hidden;box-sizing:border-box;font-family:inherit;color:var(--i);}");
    add("> svg", "display:block;width:100%;height:100%;overflow:hidden;");
    add(".tx", "font-family:inherit;font-weight:800;text-anchor:middle;fill:var(--i);paint-order:stroke fill;stroke:var(--p);stroke-width:3.6px;stroke-linejoin:round;letter-spacing:.01em;");
    add(".tx.nh", "stroke:none;"); add(".tx.s", "text-anchor:start;"); add(".tx.e", "text-anchor:end;"); add(".tx.w6", "font-weight:650;");
    [13, 14, 15, 16, 18, 20, 22, 24, 28, 32, 40, 48, 56].forEach(function (n) { add(".t" + n, "font-size:" + n + "px;"); });
    var col = { N: "n", O: "o", G: "g", P: "p", I: "i", B: "b", M: "m", D: "d", L: "l", S: "s", W: "w", R: "r" };
    Object.keys(col).forEach(function (k) { add(".f" + k, "fill:var(--" + col[k] + ");"); add(".s" + k, "stroke:var(--" + col[k] + ");"); });
    add(".f0", "fill:none;");
    add(".pn", "transition:opacity .45s ease,transform .6s cubic-bezier(.2,.8,.2,1),visibility 0s linear 0s;");
    add(".pn.hid", "opacity:0;transform:translateY(10px);visibility:hidden;pointer-events:none;transition:opacity .35s ease,transform .4s ease,visibility 0s linear .4s;");
    add(".rv", "transition:opacity .5s ease,transform .75s cubic-bezier(.2,.9,.3,1.15);transform-box:fill-box;transform-origin:50% 50%;");
    add(".rv.off", "opacity:0;pointer-events:none;");
    add(".rv.off[data-fx=up]", "transform:translateY(16px);"); add(".rv.off[data-fx=dn]", "transform:translateY(-16px);");
    add(".rv.off[data-fx=l]", "transform:translateX(-24px);"); add(".rv.off[data-fx=r]", "transform:translateX(24px);");
    add(".rv.off[data-fx=pop]", "transform:scale(.35);"); add(".rv.off[data-fx=stamp]", "transform:scale(1.9) rotate(-10deg);");
    add(".rv[data-fx=gx]", "transform-origin:0% 50%;"); add(".rv.off[data-fx=gx]", "transform:scaleX(0);");
    add(".rv[data-fx=gy]", "transform-origin:50% 100%;"); add(".rv.off[data-fx=gy]", "transform:scaleY(0);");
    add(".rv[data-fx=dr] .dw", "stroke-dasharray:1 1;stroke-dashoffset:0;transition:stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1);");
    add(".rv.off[data-fx=dr] .dw", "stroke-dashoffset:1;"); add(".rv[data-fx=dr]", "transition:opacity .3s ease;");
    add(".mv", "transition:transform 1s cubic-bezier(.3,.9,.25,1.05);");
    add(".wk", "transition:none;");
    add(".dim", "opacity:.28;transition:opacity .5s ease;"); add(".hl", "transition:fill .5s ease,stroke .5s ease,opacity .5s ease;");
    add(".ghost", "opacity:.32;");
    add(".flowd", "stroke-dasharray:7 7;animation:" + KF + "Flow 1.2s linear infinite;");
    add(".spin", "transform-box:fill-box;transform-origin:50% 50%;animation:" + KF + "Spin 4s linear infinite;");
    add(".spinr", "transform-box:fill-box;transform-origin:50% 50%;animation:" + KF + "Spin 4s linear infinite reverse;");
    add(".bob", "animation:" + KF + "Bob 2.6s ease-in-out infinite;");
    add(".blink", "animation:" + KF + "Blink 1.3s ease-in-out infinite;");
    add(".wob", "transform-box:fill-box;transform-origin:50% 15%;animation:" + KF + "Wob 1.1s ease-in-out infinite;");
    add(".rise", "animation:" + KF + "Rise 2.2s ease-in infinite;");
    add(".k-pop", "transform-box:fill-box;transform-origin:50% 50%;animation:" + KF + "Pop .6s cubic-bezier(.3,1.6,.5,1) 1;");
    add(".k-shake", "transform-box:fill-box;transform-origin:50% 50%;animation:" + KF + "Shake .7s ease 1;");
    add(".dot", "transition:fill .45s ease,opacity .45s ease;");
    add(".kick", "text-anchor:start;font-size:12.5px;font-weight:850;letter-spacing:.12em;fill:var(--n);stroke:none;opacity:.85;");
    add(".capr", "fill:var(--n);"); add(".capt", "fill:#fff;stroke:none;font-size:15px;font-weight:800;text-anchor:middle;letter-spacing:.01em;");
    add(".capg", "transform-box:fill-box;transform-origin:50% 50%;"); add(".capg.go", "animation:" + KF + "Cap .5s cubic-bezier(.3,1.5,.5,1) 1;");
    add(".prog", "fill:var(--o);transform-box:fill-box;transform-origin:0 50%;transition:transform .6s ease;"); add(".progbg", "fill:var(--n);opacity:.1;");
    R2.push(sc(ids, "").split(",").map(function (s) { return s + ".inst *"; }).join(",") + "{transition:none!important;}");
    R2.push("@keyframes " + KF + "Flow{to{stroke-dashoffset:-28}}");
    R2.push("@keyframes " + KF + "Spin{to{transform:rotate(360deg)}}");
    R2.push("@keyframes " + KF + "Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}");
    R2.push("@keyframes " + KF + "Blink{0%,100%{opacity:1}50%{opacity:.35}}");
    R2.push("@keyframes " + KF + "Wob{0%,100%{transform:rotate(0)}25%{transform:rotate(14deg)}75%{transform:rotate(-14deg)}}");
    R2.push("@keyframes " + KF + "Rise{0%{transform:translateY(6px);opacity:0}30%{opacity:1}100%{transform:translateY(-14px);opacity:0}}");
    R2.push("@keyframes " + KF + "Pop{0%{transform:scale(.7)}100%{transform:scale(1)}}");
    R2.push("@keyframes " + KF + "Shake{0%{transform:rotate(-7deg)}25%{transform:rotate(6deg)}50%{transform:rotate(-4deg)}75%{transform:rotate(2deg)}100%{transform:rotate(0)}}");
    R2.push("@keyframes " + KF + "Cap{0%{transform:scale(.88)}100%{transform:scale(1)}}");
    R2.push("@media (prefers-reduced-motion:reduce){" + sc(ids, "*") + "{animation:none!important;transition:none!important;}}");
    return R2.join("\n");
  }
  function addCSS(key, css) {
    if (typeof document === "undefined") return;
    var st = document.getElementById(STYLE_ID);
    if (!st) { st = document.createElement("style"); st.id = STYLE_ID; (document.head || document.documentElement).appendChild(st); }
    var mark = "/*" + key + "*/";
    if ((st.textContent || "").indexOf(mark) < 0) st.textContent += "\n" + mark + "\n" + css + "\n";
  }
  function installCSS() {
    addCSS("vls-w14-v2-" + PART + "-base", baseCSS(IDS));
    addCSS("vls-w14-v2-" + PART + "-scenes", SEC_CSS.join("\n"));
  }

  /* ---------- tween + ambient loop helpers ---------- */
  function tween(el, key, from, to, dur, ease, apply, inst) {
    if (!el) return;
    var st = el["_vt" + key];
    if (st) CAF(st);
    if (inst || !dur || reduced()) { el["_vv" + key] = to; apply(to); return; }
    var a = from === undefined || from === null ? fin(el["_vv" + key], to) : from, t0 = now(), d = dur * 1000, e = EASE[ease] || EASE.io;
    function f() {
      var t = clamp((now() - t0) / d, 0, 1), v = a + (to - a) * e(t);
      el["_vv" + key] = v; apply(v);
      el["_vt" + key] = t < 1 ? RAF(f) : 0;
    }
    el["_vt" + key] = RAF(f);
  }
  function along(pts, t) {
    var L = 0, seg = [], i, d;
    for (i = 1; i < pts.length; i++) { d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
    var s = clamp(t, 0, 1) * L;
    for (i = 0; i < seg.length; i++) {
      if (s <= seg[i] || i === seg.length - 1) { var u = seg[i] ? clamp(s / seg[i], 0, 1) : 1; return [lerp(pts[i][0], pts[i + 1][0], u), lerp(pts[i][1], pts[i + 1][1], u)]; }
      s -= seg[i];
    }
    return pts[pts.length - 1];
  }
  /* GSAP (when present) drives entrance timing/easing through a proxy; styles stay ours */
  function gsapEnter(el, fx, delay) {
    var g = gsapLib(); if (!g) return false;
    var o = { t: 0 };
    el.style.transition = "none";
    function ap() {
      var t = o.t, u = 1 - t, tr = "none";
      if (fx === "pop") tr = "scale(" + (0.35 + 0.65 * t).toFixed(3) + ")";
      else if (fx === "stamp") tr = "scale(" + (1.9 - 0.9 * t).toFixed(3) + ") rotate(" + (-10 * u).toFixed(2) + "deg)";
      else if (fx === "up") tr = "translateY(" + (16 * u).toFixed(2) + "px)";
      else if (fx === "dn") tr = "translateY(" + (-16 * u).toFixed(2) + "px)";
      else if (fx === "l") tr = "translateX(" + (-24 * u).toFixed(2) + "px)";
      else if (fx === "r") tr = "translateX(" + (24 * u).toFixed(2) + "px)";
      else if (fx === "gx") tr = "scaleX(" + Math.max(0, t).toFixed(3) + ")";
      else if (fx === "gy") tr = "scaleY(" + Math.max(0, t).toFixed(3) + ")";
      el.style.transform = tr; el.style.opacity = String(Math.min(1, Math.max(0, t * 1.7)));
    }
    ap();
    try {
      g.to(o, { t: 1, delay: (delay || 0) / 1000, duration: fx === "stamp" ? 0.5 : 0.85,
        ease: fx === "stamp" ? "power3.in" : (fx === "gx" || fx === "gy") ? "power3.out" : "back.out(1.7)",
        onUpdate: ap, onComplete: function () { el.style.transition = ""; el.style.transform = ""; el.style.opacity = ""; } });
    } catch (e) { el.style.transition = ""; el.style.transform = ""; el.style.opacity = ""; return false; }
    return true;
  }
  function setT(el, x, y, s, rot) {
    if (el) el.style.transform = "translate(" + r1(x) + "px," + r1(y) + "px)" + (rot ? " rotate(" + r1(rot) + "deg)" : "") + (s !== undefined && s !== 1 ? " scale(" + s + ")" : "");
  }

  /* ---------- scene factory: build(el) / step(i, n) / reset() ---------- */
  function scene(def) {
    var root = null, cur = -1, curP = -1, loops = [], raf = 0, t0 = 0, panels = [], gen = 0;
    var N = def.lines.length;
    function lineFor(i, n) {
      n = Math.max(1, Math.floor(fin(n, N))); i = clamp(Math.floor(fin(i, 0)), 0, n - 1);
      if (n === N) return i;
      if (n <= 1) return 0;
      return clamp(Math.round(i * (N - 1) / (n - 1)), 0, N - 1);
    }
    function stopLoops() { loops = []; if (raf) { CAF(raf); raf = 0; } }
    function frame() {
      raf = 0;
      if (!root || !root.isConnected || !loops.length) return;
      var t = (now() - t0) / 1000;
      for (var j = 0; j < loops.length; j++) { try { loops[j](t); } catch (e) { /* keep running */ } }
      raf = RAF(frame);
    }
    function startLoops() { if (raf || !loops.length || reduced()) return; t0 = now(); raf = RAF(frame); }
    function api(pg, k, inst, fresh) {
      var A = {
        k: k, inst: inst, fresh: fresh, root: pg,
        q: function (s) { return pg.querySelector(s); },
        qa: function (s) { return Array.prototype.slice.call(pg.querySelectorAll(s)); },
        cls: function (s, c, on) { A.qa(s).forEach(function (n) { n.classList.toggle(c, !!on); }); },
        attr: function (s, a, v) { A.qa(s).forEach(function (n) { n.setAttribute(a, String(v)); }); },
        text: function (s, v) { A.qa(s).forEach(function (n) { n.textContent = String(v); }); },
        fill: function (s, v) { A.qa(s).forEach(function (n) { n.style.fill = v; }); },
        op: function (s, v) { A.qa(s).forEach(function (n) { n.style.opacity = String(v); }); },
        pos: function (s, x, y, sc2, rot) { A.qa(s).forEach(function (n) { setT(n, x, y, sc2, rot); }); },
        num: function (s, to, o) {
          o = o || {};
          A.qa(s).forEach(function (n) {
            tween(n, "n", o.from, to, o.dur === undefined ? 1.2 : o.dur, "out", function (v) {
              n.textContent = (o.pre || "") + (o.dec ? v.toFixed(o.dec) : String(Math.round(v))) + (o.suf || "");
            }, inst);
          });
        },
        bar: function (s, attr, to, o) {
          o = o || {};
          A.qa(s).forEach(function (n) {
            tween(n, attr, o.from, to, o.dur === undefined ? 1.2 : o.dur, "io", function (v) { n.setAttribute(attr, r1(v)); if (o.y0 !== undefined) n.setAttribute("y", r1(o.y0 - v)); }, inst);
          });
        },
        walk: function (s, pts, dur, o) {
          o = o || {};
          var n = A.q(s); if (!n) return;
          if (inst || reduced()) { var e = along(pts, o.loop ? (o.rest === undefined ? 1 : o.rest) : 1); setT(n, e[0], e[1], o.scale); return; }
          if (o.loop) {
            var off = o.offset || 0;
            loops.push(function (t) { var u = ((t + off) % dur) / dur, p = along(pts, u); setT(n, p[0], p[1], o.scale); });
            startLoops(); return;
          }
          tween(n, "w", 0, 1, dur, o.ease || "io", function (v) { var p = along(pts, v); setT(n, p[0], p[1], o.scale); }, false);
        },
        turn: function (s, x, y, to, o) {
          o = o || {};
          A.qa(s).forEach(function (n) { tween(n, "r", o.from, to, o.dur === undefined ? 1.2 : o.dur, o.ease || "io", function (v) { setT(n, x, y, o.scale, v); }, inst); });
        },
        later: function (ms, fn) {
          var g = gen;
          if (inst || reduced()) { fn(); return; }
          setTimeout(function () { if (g === gen && root && root.isConnected) fn(); }, ms);
        },
        loop: function (fn) { if (inst || reduced()) { try { fn(0); } catch (e) { /* ignore */ } return; } loops.push(fn); startLoops(); },
        fx: function (s, kind) {
          if (inst || reduced()) return;
          A.qa(s).forEach(function (n) {
            var g = gsapLib();
            if (g) {
              if (kind === "pop") g.fromTo(n, { scale: 0.7, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.6, ease: "back.out(2.6)", overwrite: "auto" });
              else g.fromTo(n, { rotation: -8, transformOrigin: "50% 50%" }, { rotation: 0, duration: 0.8, ease: "elastic.out(1.1,0.3)", overwrite: "auto" });
              return;
            }
            n.classList.remove("k-" + kind); try { void n.getBoundingClientRect(); } catch (e) { /* ignore */ } n.classList.add("k-" + kind);
          });
        }
      };
      return A;
    }
    function caption(s, inst) {
      var t = root.querySelector(".capt"), rr = root.querySelector(".capr"), g = root.querySelector(".capg");
      if (!t || !rr) return;
      t.textContent = s;
      var w = 0;
      try { w = t.getComputedTextLength(); } catch (e) { w = 0; }
      if (!w || !isFinite(w)) w = tw(s, 15);
      w = clamp(w + 34, 90, 344);
      rr.setAttribute("x", r1(180 - w / 2)); rr.setAttribute("width", r1(w));
      if (!inst && g) { g.classList.remove("go"); try { void g.getBoundingClientRect(); } catch (e) { /* ignore */ } g.classList.add("go"); }
    }
    function apply(i, n, inst) {
      if (!root) return;
      var li = lineFor(i, n), L = def.lines[li] || [0, 0, ""], p = L[0], k = L[1];
      inst = !!inst || reduced();
      gen++;
      root.classList.toggle("inst", inst);
      var fresh = p !== curP;
      stopLoops();
      panels.forEach(function (pg, j) { pg.classList.toggle("hid", j !== p); });
      var pg = panels[p];
      if (pg) {
        var rvs = Array.prototype.slice.call(pg.querySelectorAll(".rv")), n2 = 0;
        if (fresh && !inst) { rvs.forEach(function (el) { el.classList.add("off"); }); try { void pg.getBoundingClientRect(); } catch (e) { /* ignore */ } }
        rvs.forEach(function (el) {
          var r = String(el.getAttribute("data-r") || "0").split("-"), a = +r[0], b = r.length > 1 ? +r[1] : 99, on = k >= a && k <= b;
          var was = !el.classList.contains("off");
          el.classList.toggle("off", !on);
          if (on && !was && !inst) {
            var d = fresh ? Math.min(n2 * 60, 720) : Math.min(n2 * 45, 360); n2++;
            if (!gsapEnter(el, el.getAttribute("data-fx"), d)) el.style.transitionDelay = d ? d + "ms" : "";
          } else el.style.transitionDelay = "";
        });
        var P = def.panels[p];
        if (P && P.on) { try { P.on(api(pg, k, inst, fresh)); } catch (e) { if (W.console) W.console.error("[W14 " + def.id + " panel " + p + "]", e); } }
      }
      if (li !== cur || inst) caption(L[2], inst);
      var pr = root.querySelector(".prog");
      if (pr) pr.style.transform = "scaleX(" + ((li + 1) / N).toFixed(4) + ")";
      cur = li; curP = p;
    }
    return {
      build: function (host) {
        if (!host || typeof document === "undefined") return;
        installCSS(); stopLoops();
        var node = document.createElement("div");
        node.className = "vls-w14-" + def.id;
        node.setAttribute("role", "img");
        node.setAttribute("aria-label", def.aria);
        var body = "", j;
        for (j = 0; j < def.panels.length; j++) body += '<g class="pn hid" data-p="' + j + '">' + def.panels[j].svg() + "</g>";
        node.innerHTML = '<svg xmlns="' + NS + '" viewBox="0 0 360 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' +
          rect(-400, -400, 1160, 1100, "fP") + (def.bg ? def.bg() : "") + body +
          T(12, 21, def.kicker, "kick") +
          G("capg", rect(100, 268, 160, 27, "capr", { rx: 13.5 }) + T(180, 286.8, "", "capt")) +
          rect(0, 297, 360, 3, "progbg") + rect(0, 297, 360, 3, "prog") + "</svg>";
        if (typeof host.replaceChildren === "function") host.replaceChildren(node);
        else { while (host.firstChild) host.removeChild(host.firstChild); host.appendChild(node); }
        root = node; cur = -1; curP = -1;
        panels = Array.prototype.slice.call(node.querySelectorAll(".pn"));
        if (!W.VL_WORK || VL_WORK.immediate) { apply(0, N, true); return; }
        var owner = node, version = ++gen;
        return VL_WORK.yield().then(function () {
          if (root === owner && gen === version && owner.isConnected) apply(0, N, true);
        });
      },
      step: function (i, n) { if (root) apply(i, n === undefined ? N : n, false); },
      reset: function () { if (!root) return; stopLoops(); if (W.VL_WORK?.discarding) { gen++; return; } cur = -1; curP = -1; apply(0, N, true); }
    };
  }
  function define(def) {
    if (def.css) SEC_CSS.push(def.css);
    VL[def.id] = scene(def);
  }

  /* ==================================================================
     W14O1c · SETTING THE TRIGGER BEFORE THE TREND TURNS  (audit 2.5/10)
     27 lines -> 9 visuals. The threshold arithmetic is shown step by step on a
     number line; every Qasr threshold is stamped PROPOSED; triggers start an
     investigation, never an automatic solution.
     ================================================================== */
  (function () {
    var P = [];
    function stampW(x, y, txt, v, rot) { var w = tw(txt, 15) + 26; return G("", rect(x - w / 2, y - 15, w, 30, "f0 " + (v || "sO"), { rx: 6, "stroke-width": 3 }) + TX(x, y + 5.5, txt, 15, "nh " + (v === "sG" ? "fG" : "fO")), { transform: "rotate(" + (rot === undefined ? -7 : rot) + " " + x + " " + y + ")" }); }

    /* V1 · lines 0-2 — four signals; investigate rather than record; without an agreed response, everyone waits
       Template: https://lottiefiles.com/free-animation/dashboard-M05MmlnoOP (graph fills, metric highlighted) */
    P.push({
      svg: function () {
        var a = "";
        [["Arrival time", "clock"], ["Kiosk adoption", "kiosk"], ["Exception volume", "spark"], ["Process variants", "flag"]].forEach(function (m, j) {
          var x = 12 + (j % 2) * 172, y = 40 + Math.floor(j / 2) * 108;
          a += R("0", "pop", card(x, y, 164, 96, "p") + icon(m[1], x + 24, y + 34, 1.05) + TX(x + 42, y + 40, m[0], 13, "fN s") +
            path("M" + (x + 22) + " " + (y + 80) + " a20 20 0 0 1 40 0", "sM f0", { "stroke-width": 6 }) + line(x + 42, y + 80, x + (j % 2 ? 58 : 52), y + (j % 2 ? 70 : 64), "sO", { "stroke-width": 3, "stroke-linecap": "round" }) +
            G("blink", circ(x + 140, y + 74, 8, "fO")));
        });
        var b = card(110, 40, 140, 70, "po") + icon("chart", 140, 75, 1.2, "sO") + TX(200, 72, "Worse", 15, "fO") + TX(200, 92, "again", 15, "fO") +
          arrow(150, 116, 90, 156, "sM", 3) + arrow(210, 116, 270, 156, "sG", 3) +
          rect(30, 164, 120, 70, "fM", { rx: 6 }) + line(60, 186, 120, 186, "sW", { "stroke-width": 3 }) + line(60, 210, 120, 210, "sW", { "stroke-width": 3 }) + noB(150, 166, 11) + TX(90, 254, "Record it", 15, "fM") +
          card(210, 164, 120, 70, "g") + icon("mag", 270, 199, 1.6) + okB(330, 166, 11) + TX(270, 254, "Investigate it", 15, "fG");
        var c = person(90, 130, 1.3, "N") + person(270, 130, 1.3, "N") + person(180, 236, 1.3, "N") +
          carrow(116, 108, 180, 86, 244, 108, "sO", 3) + carrow(280, 142, 270, 200, 210, 220, "sO", 3) + carrow(150, 220, 90, 200, 86, 146, "sO", 3) +
          G("", circ(180, 160, 24, "fW sN", { "stroke-width": 2.4 }) + WK("hand", 180, 160, line(0, 0, 0, -18, "sO", { "stroke-width": 3, "stroke-linecap": "round" }))) +
          chip(180, 52, "No agreed response", "po", 15);
        return R("0-0", "f", a) + R("1-1", "pop", b) + R("2", "up", c);
      },
      on: function (A) { if (A.k === 2) A.loop(function (t) { var n = A.q(".n-hand"); setT(n, 180, 160, 1, (t * 140) % 360); }); }
    });

    /* V2 · lines 3-4 — anatomy of a trigger: a measure crosses a pre-agreed boundary; the trip-wire reaches a named owner
       Template: https://lottiefiles.com/free-animation/business-solution-pNyNfkcRsa (control panel + moving parts) */
    P.push({
      svg: function () {
        var s = line(24, 232, 336, 232, "sN", { "stroke-width": 2 }) + line(24, 126, 336, 126, "sO", { "stroke-width": 3, "stroke-dasharray": "8 6" }) +
          TX(30, 116, "Agreed boundary", 14, "fO s") +
          R("0", "dr", path("M30 210 L80 202 L130 196 L180 172 L210 140 L236 112", "sN f0 dw", { pathLength: 1, "stroke-width": 4, "stroke-linecap": "round" })) +
          R("0", "pop", circ(222, 126, 9, "fO") + icon("spark", 222, 126, 0.8, "fD"));
        s += R("0-0", "dn", card(240, 150, 106, 66, "o") + TX(293, 178, "Required", 15, "nh fW") + TX(293, 198, "response", 15, "nh fW") + arrow(228, 136, 248, 152, "sO", 2.6));
        s += R("1", "f", path("M222 126 C240 80 280 70 300 96", "sO f0 flowd", { "stroke-width": 3 }) + person(306, 172, 1.4, "G") + chip(306, 196, "Named owner", "g", 13) + G("wob", icon("bell", 306, 88, 1, "fO")) +
          path("M30 48 h124 v34 h-96 l-12 10 v-10 h-16 Z", "fL sM", { "stroke-width": 1.5 }) + TX(92, 71, "Rely on memory?", 13, "fM") + noB(156, 50, 10) +
          chip(118, 166, "Evidence meets duty", "g", 14));
        return tag("Pre-agreed rule", "pm") + s;
      }
    });

    /* V3 · lines 5-8 — 24 delivered; PROPOSED 10% rule; 24 + 2.4 = 26.4; 39 is above, so the owner reports (kept MATCH)
       Template: https://motionarray.com/after-effects-templates/infographics-elements-789489/ (shapes and data revealed) */
    function NX(v) { return 30 + (v - 20) / 22 * 300; }
    P.push({
      svg: function () {
        var s = line(24, 160, 336, 160, "sN", { "stroke-width": 3, "stroke-linecap": "round" }), v;
        for (v = 20; v <= 42; v += 2) s += line(NX(v), 154, NX(v), 166, "sN", { "stroke-width": v % 10 ? 1.4 : 2.6 });
        s += TX(NX(20), 184, "20", 13, "fM") + TX(NX(30), 184, "30", 13, "fM") + TX(NX(40), 184, "40", 13, "fM") + TX(330, 206, "minutes", 13, "fM e");
        s += circ(NX(24), 160, 9, "fG") + TX(NX(24), 140, "24", 22, "fG") + R("0-0", "up", chip(NX(24) + 44, 216, "Delivered, month 5", "g", 14));
        s += R("1", "stamp", stampW(110, 64, "PROPOSED RULE")) + R("1", "l", card(196, 44, 152, 52, "n") + TX(272, 66, "More than", 14, "nh fW") + TX(272, 86, "10% worse", 15, "nh fD"));
        s += R("2", "gx", rect(NX(24), 150, NX(26.4) - NX(24), 20, "fD", { rx: 3 }));
        s += R("2", "pop", line(NX(26.4), 120, NX(26.4), 236, "sO", { "stroke-width": 3, "stroke-dasharray": "6 5" }) + TX(NX(26.4) + 6, 206, "26.4", 18, "fO s"));
        s += R("2-2", "up", chip(110, 102, "10% of 24 = 2.4", "d", 14) + chip(250, 102, "24 + 2.4 = 26.4", "o", 14));
        s += R("3", "pop", circ(NX(39), 160, 10, "fO") + TX(NX(39), 140, "39", 24, "fO") + G("wob", icon("bell", NX(39) + 26, 116, 1.1, "fO")));
        s += R("3", "up", person(76, 244, 0.9, "G") + arrow(96, 236, 140, 236, "sG", 3) + chip(236, 236, "Report to operations", "g", 14));
        return tag("Qasr + proposal", "po") + s;
      }
    });

    /* V4 · lines 9-10 — one deterioration, several possible causes: the trigger does not pick the solution; managers choose what to investigate
       Template: https://observablehq.com/@d3/animated-quadtree (a region split into candidate cells) */
    P.push({
      svg: function () {
        var s = card(100, 40, 160, 52, "o") + TX(180, 72, "Performance worse", 15, "nh fW");
        var C = [["Added", "steps?", 62], ["Lower", "adoption?", 180], ["Something", "else?", 298]];
        C.forEach(function (c, j) { s += arrow(180, 96, c[2], 124, "sM", 2.6) + G("cz c" + j + " hl", card(c[2] - 56, 128, 112, 60, "p") + TX(c[2], 153, c[0], 14, "fN") + TX(c[2], 173, c[1], 14, "fN")); });
        s += R("0-0", "up", chip(180, 226, "Redesign everything", "pm", 15) + strike(92, 226, 268, 226));
        s += R("1", "f", crowd(70, 252, 3, 36, 0.85, "G") + WK("mg4", 62, 210, icon("mag", 0, 0, 1.8)) + chip(250, 236, "Investigate first", "g", 15));
        return s;
      },
      on: function (A) {
        A.qa(".cz").forEach(function (n, j) { n.style.opacity = A.k >= 1 && j !== 0 ? "0.45" : "1"; });
        if (A.k >= 1) A.walk(".n-mg4", [[120, 214], [60, 196], [60, 194]], 1.6, {}); else A.pos(".n-mg4", 120, 214);
      }
    });

    /* V5 · lines 11-14 — kiosks carry the design; 65 -> 48 of every 100 guests; PROPOSED 5-point rule -> 60; 48 is far beyond
       Template: https://motionarray.com/after-effects-templates/infographics-for-everything-2593374/ (full-frame statistic) */
    function KY(v) { return 230 - (v - 40) / 30 * 170; }
    P.push({
      svg: function () {
        var a = card(14, 70, 92, 104, "p") + TX(60, 126, "Hotel lobby", 14, "fN") + arrow(110, 122, 132, 122, "sN", 3) +
          card(138, 52, 92, 140, "g") + icon("kiosk", 184, 104, 2.2, "fW") + TX(184, 170, "Kiosk step", 14, "nh fW") + arrow(234, 122, 256, 122, "sN", 3) +
          card(262, 70, 86, 104, "p") + TX(305, 126, "Guest room", 14, "fN") + chip(180, 228, "Design relies on kiosks", "g", 14) + WK("kg", 60, 100, person(0, 0, 0.6, "O"));
        var g = "", i;
        for (i = 0; i < 100; i++) g += circ(30 + (i % 10) * 16, 74 + Math.floor(i / 10) * 16, 6, "dot kd fL");
        g += TX(102, 250, "Guests per 100", 13, "fN") + R("1", "f", TX(102, 56, "using kiosks", 14, "fG"));
        g += line(206, 230, 336, 230, "sN", { "stroke-width": 2 }) + rect(232, KY(65), 44, 230 - KY(65), "kbar fG", { rx: 4 }) + path("M226 236 l6 -6 l6 6 l6 -6", "sN f0", { "stroke-width": 1.6 });
        g += TX(326, KY(65) + 5, "65", 18, "fG e") + R("1", "up", TX(326, KY(48) + 5, "48", 18, "fO e"));
        g += R("2", "l", line(212, KY(60), 296, KY(60), "sO", { "stroke-width": 3, "stroke-dasharray": "6 4" }) + TX(326, KY(60) + 5, "60", 18, "fO e"));
        g += R("2-2", "up", chip(260, 40, "5 points below", "po", 13));
        g += R("3", "pop", line(214, KY(60), 214, KY(48), "sO", { "stroke-width": 3 }) + chip(254, 210, "12 points beyond", "o", 13));
        return tag("Qasr + proposal", "po") + R("0-0", "f", a) + R("1", "f", g);
      },
      on: function (A) {
        if (A.k === 0) A.walk(".n-kg", [[60, 104], [184, 104], [305, 104]], 3, { loop: true });
        function fillTo(n) { A.qa(".kd").forEach(function (d, i) { d.style.transitionDelay = (Math.max(0, 64 - i) * 22) + "ms"; d.style.fill = i < n ? "var(--g)" : "var(--l)"; }); }
        if (A.k === 1 && A.fresh) { fillTo(65); A.later(250, function () { fillTo(48); }); } else fillTo(A.k >= 1 ? 48 : 65);
        A.bar(".kbar", "height", 230 - KY(A.k >= 1 ? 48 : 65), { y0: 230, from: A.k === 1 && A.fresh ? 230 - KY(65) : undefined, dur: 1.6 });
      }
    });

    /* V6 · lines 15-16 — the timing changes with the maths; points, not percent (kept MATCH)
       Template: https://observablehq.com/@d3/easing-animations (same motion, different timing) */
    P.push({
      svg: function () {
        var st = [65, 64.2, 63.4, 62.6, 61.8, 61, 60.2, 59.4], s = "", i, x, y;
        function SY(v) { return 70 + (65 - v) / 6 * 150; }
        s += line(30, 236, 330, 236, "sN", { "stroke-width": 2 }) + TX(36, 254, "Illustrative months", 13, "fM s");
        var d = "M30 " + r1(SY(65));
        for (i = 0; i < st.length; i++) { x = 30 + i * 40; y = SY(st[i]); d += " L" + x + " " + r1(y) + " L" + (x + 40) + " " + r1(y); }
        s += path(d, "sN f0", { "stroke-width": 3 });
        s += line(30, SY(61.75), 330, SY(61.75), "sM", { "stroke-width": 2, "stroke-dasharray": "5 5" }) + line(30, SY(60), 330, SY(60), "sO", { "stroke-width": 2.6, "stroke-dasharray": "5 5" });
        s += R("0-0", "pop", icon("flag", 212, SY(61.75) - 18, 1, "fM") + chip(108, SY(61.75) - 18, "Wrong: 61.75", "pm", 13) + icon("flag", 294, SY(60) - 18, 1) + chip(214, SY(60) + 22, "Right: 60", "o", 13));
        s += R("1", "pop", card(40, 40, 280, 160, "p") + TX(64, 92, "65 − 5 points = 60", 20, "fG s") + okB(304, 84, 12) +
          TX(64, 150, "65 × 0.95 = 61.75", 20, "fM s") + noB(304, 142, 12) + TX(180, 184, "Not 5% of 65", 14, "fO"));
        return tag("Points, not percent", "pm") + s;
      }
    });

    /* V7 · lines 17-20 — two more triggers: exceptions above the designed range -> phase 5; unregistered variant -> architecture review; check registration first
       Template: https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5 (branch appears off the main line) */
    P.push({
      svg: function () {
        var hb = [18, 22, 20, 24, 30, 38, 46], s = "", i;
        var a = card(10, 40, 164, 210, "p") + TX(92, 62, "Exception volume", 14, "fN") + rect(24, 230 - 30 * 2.6, 136, 10 * 2.6, "fG", { opacity: 0.22 });
        for (i = 0; i < hb.length; i++) a += rect(26 + i * 19, 230 - hb[i] * 2.6, 14, hb[i] * 2.6, i >= 4 ? "fO" : "fN", { rx: 2 });
        a += line(20, 230, 162, 230, "sN", { "stroke-width": 2 }) + TX(92, 244, "Designed range", 13, "fG");
        var b = card(186, 40, 164, 210, "p") + TX(268, 62, "Process variants", 14, "fN") + line(200, 150, 336, 150, "sN", { "stroke-width": 4, "stroke-linecap": "round" }) +
          circ(220, 150, 7, "fN") + circ(268, 150, 7, "fN") + circ(316, 150, 7, "fN");
        s += R("0", "f", a + b);
        s += R("1-1", "pop", card(26, 72, 132, 36, "o") + TX(92, 95, "Revisit phase 5", 14, "nh fW"));
        s += R("2", "dr", path("M240 150 C250 110 280 100 316 96", "sO f0 dw", { pathLength: 1, "stroke-width": 4, "stroke-dasharray": "1 1" }));
        s += R("2-2", "pop", circ(316, 96, 8, "fO") + chip(268, 210, "Architecture review", "o", 13) + icon("book", 228, 92, 1));
        s += R("3", "pop", icon("desk", 316, 84, 0.8) + qB(338, 112, 9.5) + icon("book", 232, 196, 1.1) + TX(282, 202, "Registered?", 14, "fN") + chip(268, 232, "Status unconfirmed", "pm", 13));
        return s;
      }
    });

    /* V8 · lines 21-22 — useful only with owner, response and check; otherwise the alert sinks into the report pile
       Template: https://lottiefiles.com/free-animation/3d-isometric-factory-process-TJAlBgYcXw (robotic sequence of stations) */
    P.push({
      svg: function () {
        var a = "";
        [["Named owner", "N"], ["Defined response", "D"], ["Check result", "G"]].forEach(function (g, j) {
          var x = 66 + j * 114;
          var w2 = g[0].split(" ");
          a += R("0", "pop", G(j % 2 ? "spinr" : "spin", gear(x, 128, 40, "f" + g[1])) + TX(x, 196, w2[0], 14, "fN") + TX(x, 214, w2[1], 14, "fN"));
        });
        a += chip(180, 244, "Trigger works", "g", 15) + G("wob", icon("bell", 180, 56, 1.2, "fO"));
        var b = "", i;
        for (i = 0; i < 7; i++) b += doc(150 + (i % 3) * 8 - 8, 210 - i * 14, 64, 40, "fW sM", 2);
        b += WK("al", 180, 40, card(-62, -18, 124, 36, "o") + TX(0, 5, "Trigger alert", 15, "nh fW")) + chip(180, 252, "Lost in reports", "pm", 15) + noB(270, 120, 13);
        return R("0-0", "f", a) + R("1", "f", b);
      },
      on: function (A) { if (A.k >= 1) A.walk(".n-al", [[180, 50], [180, 150], [180, 168]], 2, { ease: "out" }); }
    });

    /* V9 · lines 23-26 — both PROPOSED boundaries exceeded by month 22; proposal, not history; agree while healthy; next: the owner's loop
       Template: https://lottiefiles.com/free-animation/deliver-better-optimized-lottie-json-animation-Qgvgddnv8J (dashboard intro, outcome emphasised) */
    P.push({
      svg: function () {
        var a = card(10, 40, 164, 200, "po") + card(186, 40, 164, 200, "po") + TX(92, 64, "Arrival time", 15, "fN") + TX(268, 64, "Kiosk adoption", 15, "fN") +
          TX(92, 140, "39", 48, "fO") + TX(92, 170, "boundary 26.4", 14, "fN") + TX(268, 140, "48%", 44, "fO") + TX(268, 170, "boundary 60%", 14, "fN") +
          noB(150, 210, 12) + noB(326, 210, 12) + TX(80, 214, "Boundary crossed", 13, "fO") + TX(256, 214, "Boundary crossed", 13, "fO");
        var b = R("1-1", "stamp", stampW(180, 128, "PROPOSED RULES", "sO", -6)) + R("1-1", "up", chip(180, 254, "Not Qasr history", "o", 14));
        var c = card(10, 40, 164, 210, "pg") + circ(50, 76, 16, "fD") + TX(92, 76, "Healthy period", 14, "fG s") + TX(92, 132, "24 · 65%", 22, "fG") +
          person(66, 214, 1.1, "G") + person(118, 214, 1.1, "N") + rect(70, 190, 44, 8, "fD", { rx: 4 }) + TX(92, 240, "Agree now", 15, "fG") +
          card(186, 40, 164, 210, "pm") + path("M222 84 a16 16 0 0 1 30 -8 a14 14 0 0 1 26 6 a12 12 0 0 1 -2 24 h-50 a12 12 0 0 1 -4 -22 Z", "fM") +
          TX(268, 132, "Crisis talks", 15, "fM") + person(240, 214, 1.1, "M") + person(296, 214, 1.1, "M") + noB(330, 60, 12) + TX(268, 240, "Negotiate later", 14, "fM");
        var d = G("spin", loopRing(180, 140, 66, 6, "sG")) + person(180, 168, 1.8, "N") + chip(180, 244, "Owner's continuing loop", "g", 15);
        ["1 Measure", "2 Review", "3 Improve", "4 Embed"].forEach(function (n, j) { var p = ringPts(180, 140, 66, 4)[j]; d += chip(p[0], p[1], n, "n", 13); });
        return tag("Qasr + proposal", "po") + R("0-1", "f", G("bothG hl", a)) + b + R("2-2", "pop", c) + R("3", "pop", d);
      },
      on: function (A) { A.op(".bothG", A.k === 1 ? 0 : 1); }
    });

    define({
      id: "W14O1c", kicker: "SET THE TRIGGER", aria: "Pre-agreed triggers: the proposed 26.4-minute and 60 percent boundaries are calculated step by step, crossing them starts an investigation by a named owner, and the rules are marked as proposals.",
      panels: P,
      lines: [
        [0, 0, "Four signals identified"], [0, 1, "Investigate, don't record"], [0, 2, "Everyone waits for someone"],
        [1, 0, "A pre-agreed boundary"], [1, 1, "Evidence meets responsibility"],
        [2, 0, "Delivered: 24 minutes"], [2, 1, "Proposed: 10% rule"], [2, 2, "24 + 2.4 = 26.4"], [2, 3, "Crossed: report it"],
        [3, 0, "No automatic solution"], [3, 1, "Managers choose investigation"],
        [4, 0, "Kiosks carry the design"], [4, 1, "Adoption 65 → 48"], [4, 2, "Five points below"], [4, 3, "Boundary at 60"],
        [5, 0, "Timing depends on maths"], [5, 1, "Points, not percent"],
        [6, 0, "Two more triggers"], [6, 1, "Revisit phase five"], [6, 2, "Unregistered: architecture review"], [6, 3, "Check registration first"],
        [7, 0, "Owner, response, check"], [7, 1, "Otherwise lost in reports"],
        [8, 0, "Both boundaries exceeded"], [8, 1, "Proposal, not history"], [8, 2, "Agree while healthy"], [8, 3, "Next: the owner's loop"]
      ]
    });
  })();

  /* ==================================================================
     W14O3c · THE HANDOVER THAT MAKES ACCOUNTABILITY REAL  (audit 2.5/10)
     27 lines -> 9 visuals. Literal transfer: programme -> line management,
     named recipient + date, written obligations, authority, defects with
     owners and dates. Qasr's restored owner is stamped PROPOSED throughout.
     ================================================================== */
  (function () {
    var P = [];
    function stampW(x, y, txt, v, rot) { var w = tw(txt, 15) + 26; return G("", rect(x - w / 2, y - 15, w, 30, "f0 " + (v || "sO"), { rx: 6, "stroke-width": 3 }) + TX(x, y + 5.5, txt, 15, "nh " + (v === "sG" ? "fG" : "fO")), { transform: "rotate(" + (rot === undefined ? -7 : rot) + " " + x + " " + y + ")" }); }

    /* V1 · lines 0-2 — changes flow through governed routes; the programme team leaves; who protects the process now?
       Template: https://lottiefiles.com/free-animation/supply-chain-and-logistics-8PtoYRCbiu (dispatch -> transit -> receipt) */
    P.push({
      svg: function () {
        var a = card(196, 80, 140, 112, "g") + TX(266, 128, "Arrival", 16, "nh fW") + TX(266, 150, "process", 16, "nh fW") + icon("shield", 322, 88, 1.2);
        ["Minor change", "End-to-end impact", "Incident control", "Boundary change"].forEach(function (r, j) {
          var y = 70 + j * 44;
          a += R("0", "l", chip(84, y, r, "n", 13) + arrow(150, y, 192, 136, "sN", 2.4));
        });
        a += chip(266, 234, "Gain protected", "g", 14);
        var b = card(124, 120, 112, 60, "g") + TX(180, 146, "Arrival", 14, "nh fW") + TX(180, 166, "process", 14, "nh fW") +
          WK("tm", 270, 214, crowd(0, 0, 3, 26, 1, "M") + chip(26, 22, "Programme team", "pm", 13)) +
          crowd(40, 214, 2, 36, 1.1, "N") + chip(58, 238, "Line managers", "n", 13) + arrow(116, 150, 82, 170, "sN", 2.6);
        var c = rect(100, 168, 160, 14, "fS sN", { rx: 4, "stroke-width": 1.6 }) + card(130, 108, 100, 58, "g") + TX(180, 134, "Arrival", 14, "nh fW") + TX(180, 154, "process", 14, "nh fW") +
          qB(180, 72, 22) + chip(180, 222, "Nobody assigned", "po", 15);
        return R("0-0", "f", a) + R("1-1", "f", b) + R("2", "pop", c);
      },
      on: function (A) { if (A.k === 1) A.walk(".n-tm", [[150, 214], [210, 214], [262, 214]], 3, {}); }
    });

    /* V2 · lines 3-5 — 24 then 39; the role must survive people moving
       Template: https://motionarray.com/after-effects-templates/flat-infographics-17982/ (charts animated into place) */
    P.push({
      svg: function () {
        var a = bars({ x: 70, base: 232, h: 160, max: 45, bw: 76, gap: 70, fs: 26, items: [
          { v: 24, l: "Month 5", r: "0", c: "fG" }, { v: 39, l: "Month 22", r: "1", c: "fO" }] }) + R("1", "up", arrow(156, 150, 210, 120, "sO", 3)) + TX(180, 54, "Arrival minutes", 15, "fN");
        var b = card(110, 44, 140, 58, "n") + TX(180, 68, "Arrival owner", 15, "nh fW") + TX(180, 88, "role", 14, "nh fD") +
          chair(180, 214, 1.5, "N") + WK("pa", 180, 200, person(0, 0, 1.4, "G")) + WK("pb", 330, 200, person(0, 0, 1.4, "D")) +
          arrow(180, 106, 180, 140, "sN", 3) + chip(180, 244, "Duty survives changes", "g", 14);
        return tag("Qasr evidence", "pm") + R("0-1", "f", a) + R("2", "pop", b);
      },
      on: function (A) {
        if (A.k === 2) { A.walk(".n-pa", [[180, 200], [100, 200], [30, 200]], 1.8, {}); A.walk(".n-pb", [[330, 200], [260, 200], [180, 200]], 2.2, { ease: "out" }); }
      }
    });

    /* V3 · lines 6-8 — owner promoted to the Marina; director absorbs it with 13 reports; the role must outlast the person
       Template: https://old.observablehq.com/@d3/hierarchy-traversal-animated (node-to-node movement in a hierarchy) */
    P.push({
      svg: function () {
        var a = card(14, 96, 130, 130, "pm", { "stroke-dasharray": "6 5" }) + TX(79, 120, "Process owner", 14, "fN") + chip(79, 244, "Vacant: 9 months", "o", 13) +
          card(216, 60, 130, 100, "n") + TX(281, 84, "Marina", 15, "nh fW") + TX(281, 104, "general manager", 13, "nh fD") +
          WK("po3", 79, 204, person(0, 0, 1.5, "N"));
        var b = person(244, 214, 1.8, "N", { tie: true }) + TX(244, 244, "Operations director", 14, "fN") + TX(80, 60, "13 direct reports", 15, "fN"), i;
        for (i = 0; i < 13; i++) b += R("1", "pop", person(30 + (i % 5) * 26, 102 + Math.floor(i / 5) * 46, 0.65, "M"));
        b += R("1", "dn", card(198, 60, 132, 44, "o") + TX(264, 87, "Arrival process", 13, "nh fW")) + arrow(264, 108, 254, 140, "sO", 2.6);
        var c = card(80, 50, 200, 56, "g") + TX(180, 74, "Arrival process owner", 15, "nh fW") + TX(180, 94, "permanent role", 13, "nh fD") +
          person(110, 210, 1.4, "M", { ghost: true }) + person(180, 210, 1.4, "G") + person(250, 210, 1.4, "D") + arrow(126, 186, 156, 186, "sM", 2.6) + arrow(204, 186, 230, 186, "sD", 2.6) +
          arrow(180, 112, 180, 150, "sG", 3) + chip(180, 242, "Role outlasts person", "g", 14);
        return tag("Qasr evidence", "pm") + R("0-0", "f", a) + R("1-1", "f", b) + R("2", "pop", c);
      },
      on: function (A) { if (A.k === 0) A.walk(".n-po3", [[79, 204], [180, 214], [281, 214]], 2.4, {}); }
    });

    /* V4 · lines 9-11 — programme -> line management; named recipient + agreed date; obligations written down
       Template: https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8 (proposal becomes signed agreement) */
    P.push({
      svg: function () {
        var s = "", base = card(10, 70, 120, 120, "pm", { "stroke-dasharray": "6 5" }) + icon("flag", 70, 110, 1.3) + TX(70, 156, "Temporary", 14, "fM") + TX(70, 174, "programme", 14, "fM") +
          card(230, 70, 120, 120, "n") + cal(266, 112, 0.9, "fG") + icon("desk", 314, 116, 0.9, "fW") + TX(290, 156, "Line", 15, "nh fW") + TX(290, 174, "management", 14, "nh fW") +
          WK("bx", 140, 130, card(-18, -14, 36, 28, "g", { rx: 4 }));
        s += R("0-1", "f", base + line(136, 130, 224, 130, "sN", { "stroke-width": 3, "stroke-dasharray": "5 5" }));
        s += R("1-1", "pop", chip(180, 220, "Named recipient", "g", 14) + cal(130, 240, 0.8, "fO") + TX(180, 60, "Agreed date", 15, "fO") + icon("flag", 180, 92, 0.9));
        s += R("2", "f", G("", card(84, 36, 192, 210, "p") + TX(180, 60, "Written obligations", 15, "fN") +
          [84, 112, 140, 168, 196].map(function (y, j) { return R("2", "l", okB(108, y, 9) + line(124, y, 254 - (j % 2) * 30, y, "sN", { "stroke-width": 6, "stroke-linecap": "round" })); }).join("") +
          chip(180, 228, "Defined, not implied", "g", 13)));
        return s;
      },
      on: function (A) { if (A.k <= 1) A.walk(".n-bx", [[140, 130], [200, 130], [232, 130]], 2.4, { loop: true }); }
    });

    /* V5 · lines 12-14 — the process enters the recipient's own objectives; reporting without review; meeting + named responder
       Template: https://lottiefiles.com/free-animation/workflow-Jt52qpU9fj (workflow glyph cycles through stages) */
    P.push({
      svg: function () {
        var a = card(14, 44, 182, 180, "p") + TX(105, 68, "Recipient objectives", 14, "fN") +
          line(34, 98, 170, 98, "sM", { "stroke-width": 6, "stroke-linecap": "round", opacity: 0.5 }) + line(34, 126, 150, 126, "sM", { "stroke-width": 6, "stroke-linecap": "round", opacity: 0.5 }) +
          R("0", "l", rect(26, 146, 158, 34, "fG", { rx: 8 }) + TX(105, 168, "Arrival process", 14, "nh fW"));
        a += R("0", "pop", chip(282, 70, "Measure produced", "g", 13) + arrow(282, 86, 282, 108, "sG", 2.6) + chip(282, 126, "Measure discussed", "g", 13) + arrow(282, 142, 282, 164, "sG", 2.6) +
          chip(282, 182, "Acted upon", "g", 13) + carrow(330, 182, 360, 126, 330, 72, "sG", 2.6, true));
        var b = person(66, 196, 1.4, "G") + rect(24, 196, 100, 10, "fN", { rx: 3 }) + TX(74, 228, "Analyst reports", 14, "fG") +
          doc(116, 110, 30, 38, "fW sN", 3) + arrow(152, 130, 196, 130, "sM", 3) + rect(206, 164, 130, 12, "fS sN", { rx: 4 }) + chair(232, 208, 0.9, "M") + chair(290, 208, 0.9, "M") +
          noB(270, 120, 12) + chip(270, 238, "No review held", "po", 14);
        var c = card(14, 44, 332, 120, "p") + TX(30, 76, "Review meeting", 15, "fN s") + chip(270, 72, "Every month", "g", 13) +
          TX(30, 124, "Named responder", 15, "fN s") + chip(270, 120, "Process owner", "g", 13) +
          line(30, 214, 200, 214, "sN", { "stroke-width": 2 }) + line(30, 196, 200, 196, "sO", { "stroke-width": 2.4, "stroke-dasharray": "5 4" }) + path("M30 230 L90 222 L140 208 L180 186", "sO f0", { "stroke-width": 3 }) +
          G("wob", icon("bell", 214, 190, 1, "fO")) + arrow(232, 200, 268, 200, "sO", 3) + person(296, 230, 1.3, "G");
        return tag("Handover content", "pm") + R("0-0", "f", a) + R("1-1", "pop", b) + R("2", "up", c);
      }
    });

    /* V6 · lines 15-16 — authority links the functions; without it, a problem bounces between closed doors
       Template: https://lottiefiles.com/free-animation/supply-chain-and-shipping-Gd8ZsVZpXq (shipment advancing through nodes) */
    var DOORS = [["Front desk", 62, 70], ["Room cleaning", 298, 70], ["Systems team", 62, 196], ["Finance team", 298, 196]];
    P.push({
      svg: function () {
        var s = "";
        DOORS.forEach(function (d) { s += card(d[1] - 50, d[2] - 26, 100, 52, "p") + TX(d[1], d[2] + 6, d[0], 14, "fN"); });
        s += R("0-0", "f", DOORS.map(function (d) { return line(180, 134, d[1] + (d[1] < 180 ? 52 : -52), d[2], "sG", { "stroke-width": 3 }); }).join("") +
          person(180, 160, 1.6, "G") + icon("key", 180, 96, 1.4) + chip(180, 248, "Authority to coordinate", "g", 14));
        s += R("1", "f", person(180, 160, 1.6, "M") + rect(162, 90, 36, 16, "f0 sM", { rx: 4, "stroke-width": 2, "stroke-dasharray": "3 3" }) + noB(214, 102, 11) +
          WK("pb6", 112, 134, icon("spark", 0, 0, 0.9)) + chip(180, 248, "Symbolic responsibility", "po", 14));
        return tag("Illustrative example", "pm") + s;
      },
      on: function (A) { if (A.k >= 1) A.walk(".n-pb6", [[112, 134], [250, 134], [112, 134]], 2.4, { loop: true }); }
    });

    /* V7 · lines 17-20 — open defects get an owner and a date; the case has no Qasr defect inventory; what a sound transfer holds
       Template: https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU (steps activate one after another) */
    P.push({
      svg: function () {
        var a = card(14, 40, 332, 186, "p") + TX(30, 66, "Known open problems", 15, "fN s");
        ["Defect A", "Defect B", "Defect C"].forEach(function (d, j) {
          var y = 100 + j * 44;
          a += icon("spark", 40, y, 0.75) + TX(60, y + 5, d, 15, "fN s") + R("1", "r", person(152, y + 14, 0.6, "G") + TX(166, y + 5, "Named owner", 13, "fG s") + cal(262, y, 0.65, "fO") + TX(278, y + 5, "Due date", 13, "fO s"));
        });
        var g = R("0-1", "f", a) + R("0-1", "up", chip(180, 248, "Illustrative defects", "pm", 13));
        var c = icon("binder", 92, 132, 3) + TX(92, 196, "Qasr exhibit", 15, "fN") + qB(132, 84, 14) + card(176, 92, 166, 80, "po") + TX(259, 126, "No defect", 16, "fO") + TX(259, 148, "inventory", 16, "fO") +
          chip(180, 236, "Don't invent defects", "o", 14);
        var d = card(40, 38, 280, 222, "pg") + TX(180, 60, "Sound transfer contents", 15, "fG");
        ["Named recipient", "Transfer date", "Objectives, measures", "Review meeting", "Defects with owners"].forEach(function (r, j) {
          d += R("3", "l", okB(66, 90 + j * 34, 10) + TX(84, 95 + j * 34, r, 15, "fN s"));
        });
        return g + R("2-2", "pop", c) + R("3", "f", d);
      }
    });

    /* V8 · lines 21-22 — the handover carries the change rules; individually approved changes later added 13 minutes
       Template: https://observablehq.com/@joaormendes/sankey-animation-particles-generation (flows merging into one band) */
    P.push({
      svg: function () {
        var a = doc(24, 50, 120, 170, "fW sN", 0) + TX(84, 86, "Handover", 15, "fN") + TX(84, 106, "document", 15, "fN") + icon("shield", 84, 164, 1.6) +
          arrow(150, 136, 176, 136, "sN", 3);
        ["Minor: owner", "End-to-end: model", "Incident: test risk", "Boundary: steering"].forEach(function (r, j) { a += R("0", "l", chip(268, 70 + j * 44, r, "n", 13)); });
        var b = "";
        ["passport", "coin", "star", "desk"].forEach(function (ic, j) { b += card(12 + j * 50, 60, 42, 42, "p") + icon(ic, 33 + j * 50, 81, 0.8) + path("M" + (33 + j * 50) + " 106 C" + (33 + j * 50) + " 140 120 140 130 166", "sO f0 flowd", { "stroke-width": 3 }); });
        b += R("1", "gx", rect(130, 150, 13 * 14, 36, "fO", { rx: 8 }) + TX(130 + 91, 174, "+13 minutes", 16, "nh fW")) + chip(220, 230, "Approved one by one", "po", 14);
        return R("0-0", "f", a) + R("1", "f", b);
      }
    });

    /* V9 · lines 23-26 — decisions, not documents; it runs without the programme; Qasr's owner is only PROPOSED; next: diagnose
       Template: https://lottiefiles.com/free-animation/logistics-trucks-DHvuLcYVdQ (delivery arrives at destination) */
    P.push({
      svg: function () {
        var a = person(96, 214, 1.7, "M") + TX(96, 244, "Programme lead", 14, "fM") + person(264, 214, 1.7, "G") + TX(264, 244, "Named recipient", 14, "fG") +
          WK("dbx", 96, 150, rect(-22, -16, 44, 32, "fS sN", { rx: 4 }) + doc(-12, -26, 24, 28, "fW sN", 2)) + R("0", "pop", icon("gavel", 300, 140, 1.4) + chip(264, 92, "Decision rights", "g", 14));
        var b = G("ghost", crowd(40, 120, 3, 26, 0.9, "M") + TX(66, 140, "Programme gone", 13, "fM")) + G("spin", loopRing(236, 132, 54, 5, "sG")) +
          ["Measure", "Review", "Improve", "Embed"].map(function (n, j) { var p = ringPts(236, 132, 54, 4)[j]; return chip(p[0], p[1], n + " it", "g", 13); }).join("") +
          crowd(150, 246, 4, 44, 1, "N") + TX(66, 208, "Line managers", 14, "fN");
        var c = rect(118, 92, 72, 110, "f0 sN", { rx: 8, "stroke-dasharray": "6 5", "stroke-width": 2 }) + person(154, 190, 1.5, "N", { ghost: true }) +
          R("2-2", "stamp", stampW(250, 92, "PROPOSED")) + doc(226, 130, 70, 86, "fW sN", 3) + TX(236, 240, "Appointment unapproved", 13, "fO") + qB(300, 140, 12);
        var d = card(30, 48, 300, 170, "p") + icon("pin", 80, 100, 1) + icon("pin", 160, 90, 1) + icon("pin", 240, 104, 1) +
          path("M80 100 L160 90 L240 104", "sO f0", { "stroke-width": 2 }) + G("bob", icon("mag", 210, 170, 2)) + chip(180, 246, "Diagnose, then decide", "n", 15);
        return R("0-0", "f", a) + R("1-1", "up", b) + R("2-2", "f", tag("Qasr proposal", "po") + c) + R("3", "pop", d);
      },
      on: function (A) { if (A.k === 0) A.walk(".n-dbx", [[96, 150], [180, 130], [256, 150]], 2.2, {}); }
    });

    define({
      id: "W14O3c", kicker: "THE HANDOVER", aria: "A formal handover from the temporary programme into line management: a named recipient, a date, written obligations, a review meeting, authority and defects with owners; Qasr's restored owner is shown only as a proposal.",
      panels: P,
      lines: [
        [0, 0, "Changes governed proportionately"], [0, 1, "Programme hands over"], [0, 2, "Who protects it?"],
        [1, 0, "Delivered: 24 minutes"], [1, 1, "Month 22: 39"], [1, 2, "Roles change, duty stays"],
        [2, 0, "Owner promoted, unreplaced"], [2, 1, "Director: 13 reports"], [2, 2, "Role outlasts person"],
        [3, 0, "Into line management"], [3, 1, "Named recipient, agreed date"], [3, 2, "Define the obligations"],
        [4, 0, "In recipient's objectives"], [4, 1, "Report without review"], [4, 2, "Meeting and responder"],
        [5, 0, "Authority to coordinate"], [5, 1, "Symbolic without authority"],
        [6, 0, "Known open defects"], [6, 1, "Owner and target date"], [6, 2, "No Qasr inventory"], [6, 3, "A sound transfer"],
        [7, 0, "Change rules included"], [7, 1, "Changes added 13 minutes"],
        [8, 0, "Decisions, not documents"], [8, 1, "Runs without programme"], [8, 2, "Proposed, not appointed"], [8, 3, "Next: diagnose and decide"]
      ]
    });
  })();

  /* ==================================================================
     W14O3a · MEASURE, REVIEW, IMPROVE, EMBED: THE OWNER'S LOOP  (audit 2.6/10)
     27 lines -> 8 visuals. Each loop stage gets its own concrete scene
     (a stage tracker on top shows where we are); an evidence card physically
     travels Measure -> Review -> Improve -> Embed -> Measure again.
     ================================================================== */
  (function () {
    var P = [];
    var ST = ["1 Measure", "2 Review", "3 Improve", "4 Embed"];
    function tracker(a) {
      var s = "", j, x;
      for (j = 0; j < 4; j++) {
        x = 50 + j * 87;
        s += chip(x, 46, ST[j], j === a ? "g" : "l", 13);
        if (j < 3) s += arrow(x + 38, 46, x + 48, 46, "sM", 2);
      }
      return s;
    }
    function stampW(x, y, txt, v, rot) { var w = tw(txt, 15) + 26; return G("", rect(x - w / 2, y - 15, w, 30, "f0 " + (v || "sO"), { rx: 6, "stroke-width": 3 }) + TX(x, y + 5.5, txt, 15, "nh " + (v === "sG" ? "fG" : "fO")), { transform: "rotate(" + (rot === undefined ? -7 : rot) + " " + x + " " + y + ")" }); }

    /* V1 · lines 0-2 — triggers warn early; the owner turns signals into a monthly routine; regular decisions, not crises
       Template: https://lottiefiles.com/free-animation/process-para-qujCEQ2AKT (rotate, wait, finish) */
    P.push({
      svg: function () {
        var a = line(30, 232, 336, 232, "sN", { "stroke-width": 2 }) + TX(36, 250, "Time passing", 13, "fM s") +
          path("M30 70 C90 72 120 90 150 112 S240 190 330 214", "sM f0", { "stroke-width": 3, "stroke-dasharray": "6 6" }) +
          R("0", "f", path("M128 98 L150 112 C190 140 240 150 330 150 L330 214 C240 190 190 150 150 112 Z", "fG", { opacity: 0.2 })) +
          R("0", "dr", path("M30 70 C80 72 110 84 128 98", "sN f0 dw", { pathLength: 1, "stroke-width": 4 })) +
          R("0", "pop", G("wob", icon("bell", 128, 74, 1.2, "fO")) + TX(150, 62, "Early warning", 15, "fO s") + TX(250, 182, "Value protected", 15, "fG"));
        var b = G("wob", icon("bell", 44, 120, 1.2, "fO")) + arrow(64, 124, 92, 124, "sN", 3) + person(120, 150, 1.4, "G") + TX(120, 176, "Process owner", 13, "fG") + arrow(146, 124, 172, 124, "sN", 3), i;
        for (i = 0; i < 6; i++) b += R("1", "pop", cal(196 + (i % 3) * 52, 96 + Math.floor(i / 3) * 62, 0.95, "fG") + tick(196 + (i % 3) * 52, 103 + Math.floor(i / 3) * 62, 0.7, "sG"));
        b += chip(250, 228, "Monthly routine", "g", 15);
        var c = card(14, 40, 332, 98, "po") + TX(28, 62, "Crisis only", 15, "fO s") + noB(330, 46, 11) +
          line(28, 118, 330, 118, "sM", { "stroke-width": 2 }) + G("rise", icon("fire", 110, 100, 0.9)) + G("rise", icon("fire", 270, 100, 0.9)) +
          card(14, 150, 332, 98, "pg") + TX(28, 172, "Regular decisions", 15, "fG s") + okB(330, 156, 11) + line(28, 228, 330, 228, "sM", { "stroke-width": 2 });
        for (i = 0; i < 8; i++) c += okB(52 + i * 38, 210, 9);
        return R("0-0", "f", a) + R("1-1", "f", b) + R("2", "up", c);
      }
    });

    /* V2 · lines 3-6 — 24, then 39 and 48%; the figures alone cannot act; a named owner connects the whole journey
       Template: https://motionarray.com/after-effects-templates/infographics-3844461/ (statistic graphics in sequence) */
    P.push({
      svg: function () {
        var a = bars({ x: 50, base: 232, h: 150, max: 42, bw: 70, gap: 50, fs: 26, items: [
          { v: 24, l: "Month 5", r: "0", c: "fG" }, { v: 39, l: "Month 22", r: "1", c: "fO" }] }) + TX(110, 58, "Arrival minutes", 15, "fN");
        a += R("1", "pop", card(266, 92, 84, 92, "po") + TX(308, 128, "48%", 24, "fO") + TX(308, 150, "kiosk", 14, "fO") + TX(308, 168, "adoption", 13, "fO"));
        var b = doc(40, 70, 110, 140, "fW sN", 0) + TX(95, 120, "39 min", 22, "fO") + TX(95, 156, "48% kiosk", 18, "fO") +
          G("", gear(240, 132, 36, "fM") + gear(292, 176, 22, "fM")) + chip(180, 236, "Figures can't act", "pm", 15);
        var c = "", stn = [["Hotel lobby", 50], ["Kiosk step", 140], ["Front desk", 230], ["Guest room", 318]];
        stn.forEach(function (st, j) { var w2 = st[0].split(" "); c += card(st[1] - 38, 172, 76, 52, "p") + TX(st[1], 194, w2[0], 13, "fN") + TX(st[1], 210, w2[1], 13, "fN"); if (j) c += carrow(stn[j - 1][1] + 10, 172, (stn[j - 1][1] + st[1]) / 2, 130, st[1] - 10, 172, "sG", 2.6); });
        c += person(184, 110, 1.6, "G") + doc(206, 74, 26, 32, "fW sN", 2) + chip(180, 248, "Named owner coordinates", "g", 14);
        return tag("Qasr evidence", "pm") + R("0-1", "f", a) + R("2-2", "pop", b) + R("3", "up", c);
      }
    });

    /* V3 · lines 7-10 — STEP 1 MEASURE: reliable evidence about outcome and operation; reporting already exists; add three signals; three verdicts
       Template: https://dribbble.com/shots/26275497-Workflow-AI-Animation (data ingested, cleaned, visualised) */
    P.push({
      svg: function () {
        var s = tracker(0);
        var a = card(14, 72, 150, 70, "p") + icon("clock", 44, 107, 1.2) + TX(72, 102, "Outcome:", 15, "fN s") + TX(72, 122, "arrival time", 13, "fM s") +
          card(14, 152, 150, 70, "p") + icon("flag", 44, 187, 1.1) + TX(72, 182, "How it", 15, "fN s") + TX(72, 202, "operates", 13, "fM s") +
          arrow(168, 108, 204, 140, "sG", 3) + arrow(168, 186, 204, 156, "sG", 3) + card(210, 108, 136, 82, "g") + TX(278, 142, "Reliable", 16, "nh fW") + TX(278, 164, "evidence", 16, "nh fW");
        var b = person(70, 210, 1.5, "G") + rect(26, 210, 100, 10, "fN", { rx: 3 }) + doc(100, 120, 40, 50, "fW sN", 3) + okB(146, 118, 12) + TX(84, 244, "Analyst, monthly", 14, "fG") +
          card(190, 100, 156, 96, "pg") + TX(268, 138, "Reporting", 16, "fG") + TX(268, 160, "already exists", 14, "fG") + chip(268, 226, "Not the gap", "g", 14);
        var c = card(14, 72, 332, 52, "n") + icon("clock", 40, 98, 1, "fW") + TX(62, 104, "Arrival time", 16, "nh fW s"), j;
        [["kiosk", "Kiosk adoption"], ["spark", "Exception volume"], ["flag", "Process variants"]].forEach(function (g, i) {
          c += R("2", "l", card(14, 132 + i * 44, 210, 38, "p") + icon(g[0], 38, 151 + i * 44, 0.8) + TX(58, 157 + i * 44, g[1], 14, "fN s"));
        });
        [["Still effective?", 100], ["Widely used?", 151], ["Still consistent?", 239]].forEach(function (v, i) {
          c += R("3", "r", chip(292, v[1] - (i ? 0 : 2), v[0], i ? "g" : "n", 14));
        });
        return s + R("0-0", "f", a) + R("1-1", "pop", b) + R("2", "f", c);
      }
    });

    /* V4 · lines 11-14 — STEP 2 REVIEW: interpret and decide; seven months without review; size, cause, consequence; name investigators
       Template: https://dribbble.com/shots/3791748-Workflow-Animation (trigger handed to the next actor) */
    P.push({
      svg: function () {
        var s = tracker(1);
        var a = path("M60 160 a70 38 0 1 0 140 0 a70 38 0 1 0 -140 0", "fS sN", { "stroke-width": 2 }) +
          [[74, 118], [130, 108], [186, 118], [74, 202], [130, 212], [186, 202]].map(function (p) { return circ(p[0], p[1], 11, "fN"); }).join("") +
          WK("ev", 20, 160, card(-26, -16, 52, 32, "g", { rx: 6 }) + TX(0, 5, "39", 15, "nh fW")) +
          arrow(206, 160, 236, 160, "sN", 3) + path("M290 112 l46 48 l-46 48 l-46 -48 Z", "fO") + TX(290, 156, "Act", 15, "nh fW") + TX(290, 174, "now?", 14, "nh fW");
        var b = "", i;
        for (i = 0; i < 7; i++) b += R("1", "pop", rect(30 + i * 44, 90, 36, 36, "fW sO", { rx: 4, "stroke-width": 1.8 }) + cross(48 + i * 44, 108, 0.9, "sO"));
        b += TX(180, 160, "7 months", 32, "fO") + rect(110, 196, 140, 12, "fS sN", { rx: 4 }) + chair(140, 236, 0.9, "M") + chair(222, 236, 0.9, "M") + TX(180, 254, "No review", 14, "fM");
        var c = card(14, 72, 332, 50, "p") + TX(30, 102, "Size of drop", 15, "fN s") + rect(140, 86, 15 * 8, 22, "fO", { rx: 5 }) + TX(200, 103, "+15 min", 14, "nh fW") +
          card(14, 130, 332, 50, "p") + TX(30, 160, "Likely causes", 15, "fN s") + icon("passport", 186, 155, 0.7) + icon("coin", 214, 155, 0.7) + icon("star", 242, 155, 0.7) + icon("desk", 270, 155, 0.7) + qB(300, 155, 9.5) +
          card(14, 188, 332, 50, "p") + TX(30, 218, "If unchanged", 15, "fN s") + arrow(170, 228, 230, 198, "sO", 3);
        var d = "";
        ["Changes effect", "Kiosk decline", "Unexplained 2"].forEach(function (k, j) {
          d += R("3", "up", card(14 + j * 114, 84, 104, 110, "p") + TX(66 + j * 114, 110, k, 13, "fN") + person(66 + j * 114, 170, 1.1, "G") + chip(66 + j * 114, 216, "Named lead", "g", 13));
        });
        return s + R("0-0", "f", a) + R("1-1", "f", b) + R("2-2", "l", c) + d;
      },
      on: function (A) { if (A.k === 0) A.walk(".n-ev", [[20, 160], [130, 160], [130, 160]], 1.8, {}); }
    });

    /* V5 · lines 15-18 — STEP 3 IMPROVE: fix the evidenced problem; examine the combined +13; controls can stay; same rule, better flow
       Template: https://lottiefiles.com/free-animation/bottling-factory-53Q3SoGu0x (items advance; one station holds) */
    P.push({
      svg: function () {
        var s = tracker(2);
        var a = crowd(48, 236, 3, 34, 1, "M") + noB(112, 168, 11) + TX(82, 140, "Not people", 15, "fM") +
          card(170, 82, 176, 160, "pg") + TX(258, 106, "Process steps", 15, "fG") + [130, 160, 190, 220].map(function (y, j) { return rect(186, y - 12, 144, 22, j === 2 ? "fO" : "fN", { rx: 5 }); }).join("") +
          G("bob", icon("wrench", 330, 190, 1.1, "sO"));
        var b = "";
        ["passport", "coin", "star", "desk"].forEach(function (ic, j) { b += card(20 + j * 82, 76, 70, 58, "p") + icon(ic, 55 + j * 82, 105, 1.1); });
        b += rect(40, 160, 13 * 18, 40, "fO", { rx: 8 }) + TX(40 + 117, 186, "+13 combined", 17, "nh fW") + G("bob", icon("mag", 300, 190, 2)) + TX(180, 236, "Effect of all four", 14, "fO");
        var c = road(176, 20, 340) + card(150, 146, 60, 60, "n") + icon("passport", 180, 176, 1.2, "fW") + icon("shield", 214, 140, 1.5) + chip(180, 236, "Control stays", "g", 15) +
          G("bob", icon("scissors", 290, 112, 1.6)) + noB(314, 92, 11) + TX(76, 126, "Regulatory", 15, "fN") + TX(76, 146, "requirement", 15, "fN");
        var d = person(56, 132, 1, "N") + person(104, 132, 1, "N") + person(152, 132, 1, "N") + person(104, 186, 1.2, "G") +
          TX(104, 82, "Owner + functions", 14, "fN") + road(222, 20, 340) +
          rect(196, 208, 48, 28, "fN", { rx: 5 }) + icon("passport", 220, 222, 0.6, "fW") + icon("shield", 248, 204, 0.8) + carrow(300, 180, 290, 120, 240, 160, "sG", 2.6, true) +
          chip(276, 100, "Same rule", "g", 14) + chip(276, 254, "Better flow", "g", 14);
        return s + R("0-0", "f", a) + R("1-1", "pop", b) + R("2-2", "f", c) + R("3", "f", d);
      }
    });
    function road(y, x0, x1) { return rect(x0, y - 7, x1 - x0, 14, "fL", { rx: 7 }) + line(x0 + 8, y, x1 - 8, y, "sM", { "stroke-width": 2, "stroke-dasharray": "8 8" }); }

    /* V6 · lines 19-20 — STEP 4 EMBED: into instructions, roles and training; otherwise old habits return
       Template: https://dribbble.com/shots/27476599-Creative-Design-Workflow-Animation (sketch refined into product) */
    P.push({
      svg: function () {
        var s = tracker(3);
        var a = card(14, 70, 106, 150, "p") + TX(67, 92, "Work procedure", 13, "fN") + [112, 132, 152].map(function (y) { return line(28, y, 106, y, "sM", { "stroke-width": 4, "stroke-linecap": "round" }); }).join("") +
          R("0", "gx", rect(26, 170, 82, 12, "fG", { rx: 4 })) + icon("wrench", 92, 200, 0.8, "sG") +
          card(130, 70, 100, 150, "p") + TX(180, 92, "Role card", 14, "fN") + person(180, 168, 1.3, "N") + R("0", "pop", okB(212, 120, 10)) +
          card(240, 70, 106, 150, "p") + TX(293, 92, "Staff training", 14, "fN") + person(266, 190, 1, "G") + person(320, 190, 1, "N") + rect(254, 112, 76, 34, "fN", { rx: 3 }) +
          chip(180, 244, "Everyday practice", "g", 15);
        var b = road(150, 20, 340) + TX(40, 136, "Agreed method", 14, "fG s") +
          path("M40 210 C120 210 160 210 200 190 S280 150 330 150", "sM f0", { "stroke-width": 3, "stroke-dasharray": "4 6" }) + TX(40, 236, "Old habit", 14, "fM s") +
          WK("hb", 40, 150, person(0, 0, 0.8, "O")) + chip(256, 236, "Old habits return", "po", 14);
        return s + R("0-0", "f", a) + R("1", "f", b);
      },
      on: function (A) { if (A.k >= 1) A.walk(".n-hb", [[40, 146], [120, 146], [160, 168], [200, 196], [330, 206]], 4, { loop: true }); }
    });

    /* V7 · lines 21-22 — measure again: a new side effect appears; the loop repeats as normal management
       Template: https://observablehq.com/@d3/path-tween (a path re-shaped between states) */
    P.push({
      svg: function () {
        var a = line(30, 214, 330, 214, "sN", { "stroke-width": 2 }) + path("M30 100 L80 112 L130 140 L180 160 L210 162", "sN f0", { "stroke-width": 3 }) +
          line(180, 70, 180, 214, "sG", { "stroke-width": 2, "stroke-dasharray": "5 5" }) + TX(184, 86, "Change embedded", 13, "fG s") +
          R("0", "dr", path("M210 162 C240 160 250 140 270 146 S310 170 330 168", "sO f0 dw", { pathLength: 1, "stroke-width": 3.5 })) +
          R("0", "pop", circ(270, 146, 8, "fO") + chip(270, 112, "Side effect", "o", 13)) + chip(180, 244, "Measure again", "g", 15);
        var b = G("spin", loopRing(180, 146, 76, 6, "sG")), j;
        ["1 Measure", "2 Review", "3 Improve", "4 Embed"].forEach(function (n, i) { var p = ringPts(180, 146, 76, 4)[i]; b += chip(p[0], p[1], n, "g", 14); });
        b += WK("lt", 180, 70, circ(0, 0, 8, "fD sN", { "stroke-width": 2 })) + TX(180, 152, "Normal", 16, "fN") + TX(180, 170, "management", 14, "fN");
        for (j = 0; j < 3; j++) b += cal(36 + j * 6, 72 + j * 6, 0.8, "fG");
        return R("0-0", "f", a) + R("1", "pop", b);
      },
      on: function (A) { if (A.k >= 1) A.walk(".n-lt", ringPts(180, 146, 76, 40), 5, { loop: true }); }
    });

    /* V8 · lines 23-26 — the hub is empty; PROPOSED: restore a named owner with authority, review time, follow-through; staff raise problems; next: govern changes
       Template: https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6 (people join one by one) */
    P.push({
      svg: function () {
        var ring = loopRing(180, 140, 70, 5, "sM"), j;
        ["1 Measure", "2 Review", "3 Improve", "4 Embed"].forEach(function (n, i) { var p = ringPts(180, 140, 70, 4)[i]; ring += chip(p[0], p[1], n, "l", 13); });
        var a = G("loopG hl", ring) + chair(180, 186, 1.3, "M") + R("0-0", "up", chip(180, 250, "Owner promoted, unreplaced", "o", 13));
        var b = person(180, 176, 1.5, "G") + R("1-1", "stamp", stampW(70, 70, "PROPOSED")) +
          R("1-1", "l", chip(290, 196, "Real authority", "g", 13) + chip(290, 222, "Review time", "g", 13) + chip(290, 248, "Follow-up duty", "g", 13));
        var c = person(40, 236, 1.2, "N") + path("M52 166 h100 v30 h-78 l-12 10 v-10 h-10 Z", "fW sO", { "stroke-width": 1.6 }) + TX(102, 186, "Not working!", 13, "fO") +
          carrow(62, 214, 110, 214, 150, 186, "sO", 2.6, true) + G("ghost", icon("chart", 312, 100, 1.2));
        var d = card(14, 60, 332, 180, "p") + ["passport", "coin", "star", "desk"].map(function (ic, i) { return card(26 + i * 50, 120, 40, 40, "p") + icon(ic, 46 + i * 50, 140, 0.8); }).join("") +
          arrow(226, 140, 254, 140, "sN", 3) + path("M262 100 h70 v80 h-70 Z", "fL sN", { "stroke-width": 2 }) + TX(297, 132, "Govern", 14, "fN") + TX(297, 150, "the changes", 13, "fN") +
          TX(180, 90, "Next part", 15, "fN");
        return tag("Qasr + proposal", "po") + R("0-2", "f", a) + R("1-2", "f", b) + R("2-2", "up", c) + R("3", "pop", d);
      },
      on: function (A) { A.cls(".loopG", "dim", A.k === 0); A.qa(".loopG .flowd").forEach(function (n) { n.style.animationPlayState = A.k === 0 ? "paused" : "running"; }); }
    });

    define({
      id: "W14O3a", kicker: "THE OWNER'S LOOP", aria: "A process owner runs a repeating loop: measure reliable evidence, review and decide, improve the evidenced problem while keeping legitimate controls, embed the change, and measure again; Qasr's restored owner is a proposal.",
      panels: P,
      lines: [
        [0, 0, "Triggers warn early"], [0, 1, "Signals become routine"], [0, 2, "Regular decisions, not crises"],
        [1, 0, "Once: 24 minutes"], [1, 1, "Now: 39 and 48%"], [1, 2, "Figures can't act"], [1, 3, "A named owner"],
        [2, 0, "Step 1: measure"], [2, 1, "Reporting already exists"], [2, 2, "Add three signals"], [2, 3, "Effective, used, consistent?"],
        [3, 0, "Step 2: review"], [3, 1, "Seven months unreviewed"], [3, 2, "Size, cause, consequence"], [3, 3, "Name who investigates"],
        [4, 0, "Step 3: improve"], [4, 1, "Examine the +13"], [4, 2, "Controls can stay"], [4, 3, "Same rule, better flow"],
        [5, 0, "Step 4: embed"], [5, 1, "Or old habits return"],
        [6, 0, "Measure again"], [6, 1, "Normal management cycle"],
        [7, 0, "The hub is empty"], [7, 1, "Proposed: restore ownership"], [7, 2, "Staff raise problems"], [7, 3, "Next: govern changes"]
      ]
    });
  })();

})();
// END FILE: w14-claude-v2-part2.js

// FILE: w14-claude-v2-part3.js
// OPER621 · Business Process Management · Week 14 · The Sustainable Performance Phase
// Animated teaching scenes — Claude v2 rebuild — PART 3 of 4 — sections: W14O2a, W14O3b, W14O3d
// Next: W14O2a (2.8), W14O3b (2.8), W14O3d (2.9) (GPT-6 content audit).
//
// CONTRACT (unchanged): window.VL_SCENES = window.VL_SCENES || {};
//   VL_SCENES['<secId>'] = { build(el), step(i, n), reset() }
// - Standalone: defines every helper it uses, registers its own scenes and appends its own
//   rules, scoped under .vls-w14-<secId>, to the single <style id="vl-sc-w14">.
// - One narration line = one explicit visual state. Each section is a sequence of 8-11
//   distinct visuals (a new visual every 2-4 lines); every line has its own 2-4 word caption.
// - step(i, n): when n equals the section's narration count, line i maps 1:1; otherwise it
//   is mapped proportionally. State is re-derived on every call, so seeking is safe.
// - window.gsap is used for pop/shake flourishes when present; a built-in rAF tween engine
//   and CSS transitions/keyframes are used otherwise.
// - prefers-reduced-motion: every state is applied instantly, no loops or keyframes.
// - Stage: 360 x 300 viewBox (meet), full-bleed paper background; the figure fills a phone
//   strip above the text or the left 60% on a laptop. Text is never smaller than 13 px.
// - Qasr figures only as documented in Exhibit 14; proposals and illustrations are labelled.
// - Original code: no part of the live scenes or of the previous Claude edition is reused.
(function () {
  "use strict";
  var PART = "p3";
  var IDS = ["W14O2a", "W14O3b", "W14O3d"];
  /* ==================================================================
     ENGINE (self-contained; every helper used by the scenes is defined here)
     ================================================================== */
  var W = window, NS = "http://www.w3.org/2000/svg", STYLE_ID = "vl-sc-w14";
  window.VL_SCENES = window.VL_SCENES || {};
  var VL = window.VL_SCENES;
  var KF = "vlsW14v2" + PART;            /* keyframe prefix, unique per part */
  var SEC_CSS = [];

  function esc(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fin(v, d) { v = Number(v); return isFinite(v) ? v : (d === undefined ? 0 : d); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function r1(v) { return Math.round(v * 10) / 10; }
  function reduced() {
    try { return !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    catch (e) { return false; }
  }
  function gsapLib() {
    var g = W.gsap;
    return g && typeof g.to === "function" && typeof g.fromTo === "function" ? g : null;
  }
  function now() { return (W.performance && W.performance.now) ? W.performance.now() : Date.now(); }
  var RAF = (W.requestAnimationFrame && W.requestAnimationFrame.bind(W)) || function (f) { return setTimeout(function () { f(now()); }, 16); };
  var CAF = (W.cancelAnimationFrame && W.cancelAnimationFrame.bind(W)) || clearTimeout;
  var EASE = {
    lin: function (t) { return t; },
    io: function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; },
    out: function (t) { return 1 - Math.pow(1 - t, 3); },
    back: function (t) { var c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }
  };

  /* ---------- SVG string builders ---------- */
  function at(o) {
    var s = "", k, v;
    for (k in o) {
      if (!Object.prototype.hasOwnProperty.call(o, k)) continue;
      v = o[k];
      if (v === undefined || v === null || v === false) continue;
      s += " " + (k === "c" ? "class" : k) + '="' + esc(typeof v === "number" ? r1(v) : v) + '"';
    }
    return s;
  }
  function E(tag, o, inner) { return "<" + tag + at(o || {}) + ">" + (inner || "") + "</" + tag + ">"; }
  function G(c, inner, o) { o = o || {}; if (c) o.c = c; return E("g", o, inner); }
  function rect(x, y, w, h, c, o) { o = o || {}; o.x = x; o.y = y; o.width = Math.max(0, w); o.height = Math.max(0, h); if (c) o.c = c; return E("rect", o); }
  function circ(x, y, r, c, o) { o = o || {}; o.cx = x; o.cy = y; o.r = Math.max(0, r); if (c) o.c = c; return E("circle", o); }
  function line(x1, y1, x2, y2, c, o) { o = o || {}; o.x1 = x1; o.y1 = y1; o.x2 = x2; o.y2 = y2; if (c) o.c = c; return E("line", o); }
  function path(d, c, o) { o = o || {}; o.d = d; if (c) o.c = c; return E("path", o); }
  function T(x, y, s, c, o) { o = o || {}; o.x = x; o.y = y; o.c = "tx " + (c || "t14"); return E("text", o, esc(s)); }
  /* reveal group: visible for k in range r ("2" = from 2 on, "1-3" = 1..3) */
  function R(r, fx, inner) { return '<g class="rv" data-r="' + r + '" data-fx="' + (fx || "f") + '">' + inner + "</g>"; }
  /* movable group, positioned by CSS transform (never by the transform attribute) */
  function M(n, x, y, inner, cls) {
    return '<g class="' + (cls || "mv") + " n-" + n + '" style="transform:translate(' + r1(x) + "px," + r1(y) + 'px)">' + inner + "</g>";
  }
  function WK(n, x, y, inner) { return M(n, x, y, inner, "wk"); }
  function tw(s, fs) {
    var w = 0, i, ch; s = String(s);
    for (i = 0; i < s.length; i++) {
      ch = s.charAt(i);
      w += /[A-Z%]/.test(ch) ? 0.7 : /[0-9]/.test(ch) ? 0.6 : /[mwMW]/.test(ch) ? 0.88 : /[il.,:;'|!\s]/.test(ch) ? 0.3 : /[ftjr]/.test(ch) ? 0.42 : 0.58;
    }
    return w * fs * 1.12;
  }
  var CHIP = {
    n: ["fN", "fW"], o: ["fO", "fW"], g: ["fG", "fW"], d: ["fD", "fI"], m: ["fM", "fW"], i: ["fI", "fW"],
    p: ["fP sN", "fN"], po: ["fP sO", "fO"], pg: ["fP sG", "fG"], pm: ["fP sM", "fM"], l: ["fL sN", "fN"]
  };
  function chipW(s, fs) { fs = fs || 14; return tw(s, fs) + fs * 1.5; }
  function chip(x, y, s, v, fs, o) {
    var k = CHIP[v || "p"]; fs = fs || 14;
    var w = chipW(s, fs), h = fs * 1.85;
    return G("", rect(x - w / 2, y - h / 2, w, h, k[0], { rx: h / 2, "stroke-width": 1.8 }) +
      T(x, y + fs * 0.36, s, "nh " + k[1], { style: "font-size:" + fs + "px" }), o);
  }
  function card(x, y, w, h, v, o) { var k = CHIP[v || "p"]; o = o || {}; o.rx = o.rx || 10; o["stroke-width"] = o["stroke-width"] || 1.8; return rect(x, y, w, h, k[0], o); }
  function fsz(n) { return { style: "font-size:" + n + "px" }; }
  function TX(x, y, s, n, c, o) { o = o || {}; o.style = "font-size:" + n + "px" + (o.style ? ";" + o.style : ""); return T(x, y, s, c || "fI", o); }
  function arrow(x1, y1, x2, y2, c, w) {
    c = c || "sN"; w = w || 3;
    var a = Math.atan2(y2 - y1, x2 - x1), h = w * 3.1;
    var bx = x2 - h * Math.cos(a), by = y2 - h * Math.sin(a), px = -Math.sin(a) * h * 0.62, py = Math.cos(a) * h * 0.62;
    return line(x1, y1, bx, by, c, { "stroke-width": w, "stroke-linecap": "round" }) +
      path("M" + r1(x2) + " " + r1(y2) + " L" + r1(bx + px) + " " + r1(by + py) + " L" + r1(bx - px) + " " + r1(by - py) + " Z", c.replace(/s([A-Z])/, "f$1"));
  }
  function carrow(x1, y1, cx, cy, x2, y2, c, w, dash) {
    c = c || "sN"; w = w || 3;
    var a = Math.atan2(y2 - cy, x2 - cx), h = w * 3.1;
    var bx = x2 - h * Math.cos(a), by = y2 - h * Math.sin(a), px = -Math.sin(a) * h * 0.62, py = Math.cos(a) * h * 0.62;
    return path("M" + r1(x1) + " " + r1(y1) + " Q" + r1(cx) + " " + r1(cy) + " " + r1(bx) + " " + r1(by), c + " f0" + (dash ? " flowd" : ""), { "stroke-width": w, "stroke-linecap": "round" }) +
      path("M" + r1(x2) + " " + r1(y2) + " L" + r1(bx + px) + " " + r1(by + py) + " L" + r1(bx - px) + " " + r1(by - py) + " Z", c.replace(/s([A-Z])/, "f$1"));
  }
  function tick(x, y, s, c) {
    return path("M" + r1(x - 6 * s) + " " + r1(y) + " l" + r1(4 * s) + " " + r1(4.6 * s) + " l" + r1(8.5 * s) + " " + r1(-9.5 * s), (c || "sW") + " f0",
      { "stroke-width": Math.max(2.2, 2.7 * s), "stroke-linecap": "round", "stroke-linejoin": "round" });
  }
  function cross(x, y, s, c) {
    return path("M" + r1(x - 5 * s) + " " + r1(y - 5 * s) + " l" + r1(10 * s) + " " + r1(10 * s) + " M" + r1(x + 5 * s) + " " + r1(y - 5 * s) + " l" + r1(-10 * s) + " " + r1(10 * s),
      (c || "sW") + " f0", { "stroke-width": Math.max(2.2, 2.7 * s), "stroke-linecap": "round" });
  }
  function okB(x, y, r) { return circ(x, y, r, "fG") + tick(x, y + r * 0.08, r / 9.5); }
  function noB(x, y, r) { return circ(x, y, r, "fO") + cross(x, y, r / 10.5); }
  function qB(x, y, r) { var f = Math.max(13, r * 1.3); return circ(x, y, Math.max(r, 9.5), "fM") + TX(x, y + f * 0.36, "?", f, "nh fW"); }
  function strike(x1, y1, x2, y2) { return line(x1, y1, x2, y2, "sO", { "stroke-width": 5, "stroke-linecap": "round", opacity: 0.92 }); }
  function person(x, y, s, col, o) {
    s = s || 1; col = col || "N"; o = o || {};
    var h = path("M" + r1(x - 12 * s) + " " + r1(y) + " C" + r1(x - 12 * s) + " " + r1(y - 23 * s) + " " + r1(x + 12 * s) + " " + r1(y - 23 * s) + " " + r1(x + 12 * s) + " " + r1(y) + " Z", "f" + col);
    h += circ(x, y - 27 * s, 8.5 * s, "f" + col);
    if (o.clip) h += rect(x + 5 * s, y - 15 * s, 10 * s, 13 * s, "fW sN", { rx: 1.5, "stroke-width": 1.3 });
    if (o.tie) h += path("M" + r1(x) + " " + r1(y - 17 * s) + " l" + r1(-2.5 * s) + " " + r1(5 * s) + " l" + r1(2.5 * s) + " " + r1(7 * s) + " l" + r1(2.5 * s) + " " + r1(-7 * s) + " Z", "fO");
    if (o.ghost) h = G("ghost", h);
    return h;
  }
  function crowd(x, y, n, gap, s, col) { var h = "", i; for (i = 0; i < n; i++) h += person(x + i * gap, y, s, col); return h; }
  function chair(x, y, s, c) {
    s = s || 1; c = c || "N";
    return rect(x - 13 * s, y - 38 * s, 6 * s, 38 * s, "f" + c, { rx: 2 }) + rect(x - 13 * s, y - 16 * s, 28 * s, 6 * s, "f" + c, { rx: 2 }) +
      rect(x + 10 * s, y - 10 * s, 4.5 * s, 10 * s, "f" + c) + rect(x - 9 * s, y - 10 * s, 4.5 * s, 10 * s, "f" + c);
  }
  function doc(x, y, w, h, c, n, lc) {
    var f = Math.min(10, w * 0.25), s, i;
    s = path("M" + r1(x) + " " + r1(y) + " h" + r1(w - f) + " l" + r1(f) + " " + r1(f) + " v" + r1(h - f) + " h" + r1(-w) + " Z", c || "fW sN", { "stroke-width": 1.6 });
    for (i = 0; i < (n === undefined ? 3 : n); i++)
      s += line(x + w * 0.16, y + h * 0.32 + i * h * 0.18, x + w * (i % 2 ? 0.64 : 0.82), y + h * 0.32 + i * h * 0.18, lc || "sM", { "stroke-width": 2, "stroke-linecap": "round" });
    return s;
  }
  function cal(x, y, s, head, txt, tc) {
    var w = 36 * s, h = 36 * s;
    return rect(x - w / 2, y - h / 2, w, h, "fW sN", { rx: 4 * s, "stroke-width": 1.6 }) + rect(x - w / 2, y - h / 2, w, 10 * s, head || "fO", { rx: 3 * s }) +
      rect(x - w / 2, y - h / 2 + 6 * s, w, 4 * s, head || "fO") + (txt ? TX(x, y + 11 * s, txt, 15 * s, "nh " + (tc || "fN")) : "");
  }
  function hotel(x, y, s, c, mark) {
    var w = 24 * s, h = 30 * s, i, j, out = rect(x - w / 2, y - h, w, h, c || "fN", { rx: 2 });
    for (i = 0; i < 3; i++) for (j = 0; j < 2; j++) out += rect(x - w / 2 + 4 * s + j * 10 * s, y - h + 4 * s + i * 7.5 * s, 6 * s, 4.5 * s, "fW", { opacity: 0.85 });
    out += rect(x - 3 * s, y - 6 * s, 6 * s, 6 * s, "fD");
    if (mark) out += circ(x + w / 2, y - h, 6.5 * s, mark === "o" ? "fO" : "fG") + (mark === "o" ? "" : tick(x + w / 2, y - h + 0.5, 0.5 * s));
    return out;
  }
  function gearP(cx, cy, r, teeth) {
    var d = "", i, n = teeth || 8, a, a2, ro = r, ri = r * 0.78;
    for (i = 0; i < n; i++) {
      a = i / n * Math.PI * 2; a2 = (i + 0.5) / n * Math.PI * 2;
      d += (i ? "L" : "M") + r1(cx + ro * Math.cos(a - 0.18)) + " " + r1(cy + ro * Math.sin(a - 0.18)) + " L" + r1(cx + ro * Math.cos(a + 0.18)) + " " + r1(cy + ro * Math.sin(a + 0.18)) +
        " L" + r1(cx + ri * Math.cos(a2 - 0.2)) + " " + r1(cy + ri * Math.sin(a2 - 0.2)) + " L" + r1(cx + ri * Math.cos(a2 + 0.2)) + " " + r1(cy + ri * Math.sin(a2 + 0.2));
    }
    return d + " Z";
  }
  function gear(cx, cy, r, c, cls) { return G(cls || "", path(gearP(cx, cy, r, Math.max(6, Math.round(r / 2.6))), c || "fN") + circ(cx, cy, r * 0.32, "fP")); }
  /* small pictograms centred on x,y (about 26*s wide) */
  function icon(n, x, y, s, c) {
    s = s || 1; var h = "";
    switch (n) {
      case "passport": h = rect(x - 9 * s, y - 12 * s, 18 * s, 24 * s, c || "fN", { rx: 2.5 }) + circ(x, y - 2 * s, 5 * s, "f0 sD", { "stroke-width": 1.6 }) + line(x - 5 * s, y + 7 * s, x + 5 * s, y + 7 * s, "sD", { "stroke-width": 1.6 }); break;
      case "coin": h = circ(x, y, 11 * s, c || "fD") + circ(x, y, 7.5 * s, "f0 sW", { "stroke-width": 1.6 }) + rect(x - 1.6 * s, y - 5 * s, 3.2 * s, 10 * s, "fW", { rx: 1 }); break;
      case "star": h = path("M" + r1(x) + " " + r1(y - 12 * s) + " l" + r1(3.5 * s) + " " + r1(7.5 * s) + " l" + r1(8 * s) + " " + r1(0.8 * s) + " l" + r1(-6 * s) + " " + r1(5.5 * s) + " l" + r1(1.8 * s) + " " + r1(8 * s) + " l" + r1(-7.3 * s) + " " + r1(-4.2 * s) + " l" + r1(-7.3 * s) + " " + r1(4.2 * s) + " l" + r1(1.8 * s) + " " + r1(-8 * s) + " l" + r1(-6 * s) + " " + r1(-5.5 * s) + " l" + r1(8 * s) + " " + r1(-0.8 * s) + " Z", c || "fD"); break;
      case "desk": h = rect(x - 13 * s, y - 2 * s, 26 * s, 5 * s, c || "fN", { rx: 1.5 }) + rect(x - 11 * s, y + 3 * s, 4 * s, 9 * s, c || "fN") + rect(x + 7 * s, y + 3 * s, 4 * s, 9 * s, c || "fN") + circ(x, y - 11 * s, 4.5 * s, "fO") + path("M" + r1(x - 7 * s) + " " + r1(y - 2 * s) + " q" + r1(7 * s) + " " + r1(-9 * s) + " " + r1(14 * s) + " 0", "fO"); break;
      case "kiosk": h = rect(x - 8 * s, y - 13 * s, 16 * s, 22 * s, c || "fN", { rx: 2.5 }) + rect(x - 5.5 * s, y - 10 * s, 11 * s, 9 * s, "fB") + rect(x - 3 * s, y + 9 * s, 6 * s, 4 * s, c || "fN"); break;
      case "shield": h = path("M" + r1(x) + " " + r1(y - 12 * s) + " l" + r1(10 * s) + " " + r1(4 * s) + " v" + r1(6 * s) + " c0 " + r1(7 * s) + " " + r1(-5 * s) + " " + r1(11 * s) + " " + r1(-10 * s) + " " + r1(13 * s) + " c" + r1(-5 * s) + " " + r1(-2 * s) + " " + r1(-10 * s) + " " + r1(-6 * s) + " " + r1(-10 * s) + " " + r1(-13 * s) + " v" + r1(-6 * s) + " Z", c || "fG") + tick(x, y, 0.55 * s); break;
      case "bell": h = path("M" + r1(x - 10 * s) + " " + r1(y + 6 * s) + " q0 " + r1(-17 * s) + " " + r1(10 * s) + " " + r1(-17 * s) + " q" + r1(10 * s) + " 0 " + r1(10 * s) + " " + r1(17 * s) + " l" + r1(3 * s) + " " + r1(4 * s) + " h" + r1(-26 * s) + " Z", c || "fD") + circ(x, y + 12 * s, 3 * s, "fN"); break;
      case "mag": h = circ(x - 3 * s, y - 3 * s, 8.5 * s, "fW sN", { "stroke-width": 3 * s }) + line(x + 3.5 * s, y + 3.5 * s, x + 11 * s, y + 11 * s, c || "sN", { "stroke-width": 4.5 * s, "stroke-linecap": "round" }); break;
      case "wrench": h = path("M" + r1(x - 10 * s) + " " + r1(y + 10 * s) + " L" + r1(x + 4 * s) + " " + r1(y - 4 * s), c || "sN", { "stroke-width": 5 * s, "stroke-linecap": "round" }) + circ(x + 6 * s, y - 6 * s, 6 * s, "f0 " + (c || "sN"), { "stroke-width": 3.5 * s }); break;
      case "clock": h = circ(x, y, 12 * s, "fW sN", { "stroke-width": 2.4 }) + line(x, y, x, y - 8 * s, "sN", { "stroke-width": 2.4, "stroke-linecap": "round" }) + line(x, y, x + 6 * s, y + 3 * s, c || "sO", { "stroke-width": 2.4, "stroke-linecap": "round" }); break;
      case "flag": h = line(x - 8 * s, y - 13 * s, x - 8 * s, y + 13 * s, "sN", { "stroke-width": 2.5 }) + path("M" + r1(x - 8 * s) + " " + r1(y - 13 * s) + " h" + r1(18 * s) + " l" + r1(-4 * s) + " " + r1(5 * s) + " l" + r1(4 * s) + " " + r1(5 * s) + " h" + r1(-18 * s) + " Z", c || "fO"); break;
      case "key": h = circ(x - 7 * s, y, 6 * s, "f0 " + (c || "sD"), { "stroke-width": 3.4 * s }) + path("M" + r1(x - 1 * s) + " " + r1(y) + " h" + r1(13 * s) + " v" + r1(5 * s) + " M" + r1(x + 7 * s) + " " + r1(y) + " v" + r1(4 * s), (c || "sD") + " f0", { "stroke-width": 3.4 * s, "stroke-linecap": "round" }); break;
      case "book": h = path("M" + r1(x) + " " + r1(y - 9 * s) + " q" + r1(-7 * s) + " " + r1(-4 * s) + " " + r1(-13 * s) + " 0 v" + r1(19 * s) + " q" + r1(6 * s) + " " + r1(-4 * s) + " " + r1(13 * s) + " 0 q" + r1(7 * s) + " " + r1(-4 * s) + " " + r1(13 * s) + " 0 v" + r1(-19 * s) + " q" + r1(-6 * s) + " " + r1(-4 * s) + " " + r1(-13 * s) + " 0 Z", c || "fN") + line(x, y - 9 * s, x, y + 10 * s, "sW", { "stroke-width": 1.4 }); break;
      case "mega": h = path("M" + r1(x - 11 * s) + " " + r1(y - 4 * s) + " h" + r1(6 * s) + " l" + r1(14 * s) + " " + r1(-8 * s) + " v" + r1(24 * s) + " l" + r1(-14 * s) + " " + r1(-8 * s) + " h" + r1(-6 * s) + " Z", c || "fO"); break;
      case "trophy": h = path("M" + r1(x - 10 * s) + " " + r1(y - 12 * s) + " h" + r1(20 * s) + " v" + r1(6 * s) + " q0 " + r1(10 * s) + " " + r1(-10 * s) + " " + r1(10 * s) + " q" + r1(-10 * s) + " 0 " + r1(-10 * s) + " " + r1(-10 * s) + " Z", c || "fD") + rect(x - 2 * s, y + 4 * s, 4 * s, 5 * s, c || "fD") + rect(x - 7 * s, y + 9 * s, 14 * s, 4 * s, "fN", { rx: 1 }); break;
      case "bulb": h = circ(x, y - 3 * s, 9 * s, c || "fD") + rect(x - 4.5 * s, y + 5 * s, 9 * s, 6 * s, "fN", { rx: 1.5 }); break;
      case "scissors": h = circ(x - 7 * s, y + 6 * s, 4.5 * s, "f0 sO", { "stroke-width": 2.6 }) + circ(x + 7 * s, y + 6 * s, 4.5 * s, "f0 sO", { "stroke-width": 2.6 }) + line(x - 4 * s, y + 3 * s, x + 6 * s, y - 12 * s, "sN", { "stroke-width": 2.6, "stroke-linecap": "round" }) + line(x + 4 * s, y + 3 * s, x - 6 * s, y - 12 * s, "sN", { "stroke-width": 2.6, "stroke-linecap": "round" }); break;
      case "gavel": h = rect(x - 12 * s, y - 10 * s, 14 * s, 8 * s, c || "fN", { rx: 2, transform: "rotate(-30 " + r1(x - 5 * s) + " " + r1(y - 6 * s) + ")" }) + line(x - 3 * s, y - 4 * s, x + 9 * s, y + 9 * s, "sN", { "stroke-width": 3.4, "stroke-linecap": "round" }) + rect(x - 12 * s, y + 9 * s, 16 * s, 4 * s, "fN", { rx: 1 }); break;
      case "eye": h = path("M" + r1(x - 13 * s) + " " + r1(y) + " q" + r1(13 * s) + " " + r1(-13 * s) + " " + r1(26 * s) + " 0 q" + r1(-13 * s) + " " + r1(13 * s) + " " + r1(-26 * s) + " 0 Z", "fW sN", { "stroke-width": 2 }) + circ(x, y, 5 * s, c || "fN"); break;
      case "spark": h = path("M" + r1(x) + " " + r1(y - 13 * s) + " l" + r1(4 * s) + " " + r1(9 * s) + " l" + r1(9 * s) + " " + r1(4 * s) + " l" + r1(-9 * s) + " " + r1(4 * s) + " l" + r1(-4 * s) + " " + r1(9 * s) + " l" + r1(-4 * s) + " " + r1(-9 * s) + " l" + r1(-9 * s) + " " + r1(-4 * s) + " l" + r1(9 * s) + " " + r1(-4 * s) + " Z", c || "fO"); break;
      case "pin": h = path("M" + r1(x) + " " + r1(y + 12 * s) + " q" + r1(-11 * s) + " " + r1(-12 * s) + " " + r1(-11 * s) + " " + r1(-20 * s) + " a" + r1(11 * s) + " " + r1(11 * s) + " 0 0 1 " + r1(22 * s) + " 0 q0 " + r1(8 * s) + " " + r1(-11 * s) + " " + r1(20 * s) + " Z", c || "fO") + circ(x, y - 8 * s, 4 * s, "fW"); break;
      case "chart": h = rect(x - 12 * s, y - 12 * s, 24 * s, 24 * s, "fW sN", { rx: 3, "stroke-width": 1.6 }) + path("M" + r1(x - 8 * s) + " " + r1(y + 6 * s) + " L" + r1(x - 2 * s) + " " + r1(y - 1 * s) + " L" + r1(x + 2 * s) + " " + r1(y + 3 * s) + " L" + r1(x + 8 * s) + " " + r1(y - 7 * s), (c || "sO") + " f0", { "stroke-width": 2.4, "stroke-linecap": "round", "stroke-linejoin": "round" }); break;
      case "binder": h = rect(x - 10 * s, y - 13 * s, 20 * s, 26 * s, c || "fN", { rx: 2 }) + rect(x - 6 * s, y - 8 * s, 12 * s, 7 * s, "fW", { rx: 1 }) + circ(x, y + 7 * s, 2.6 * s, "fW"); break;
      case "ice": h = path("M" + r1(x) + " " + r1(y - 13 * s) + " v" + r1(26 * s) + " M" + r1(x - 11 * s) + " " + r1(y - 6.5 * s) + " l" + r1(22 * s) + " " + r1(13 * s) + " M" + r1(x - 11 * s) + " " + r1(y + 6.5 * s) + " l" + r1(22 * s) + " " + r1(-13 * s), (c || "sB") + " f0", { "stroke-width": 3, "stroke-linecap": "round" }); break;
      case "fire": h = path("M" + r1(x) + " " + r1(y - 13 * s) + " q" + r1(11 * s) + " " + r1(10 * s) + " " + r1(8 * s) + " " + r1(19 * s) + " q" + r1(-3 * s) + " " + r1(6 * s) + " " + r1(-8 * s) + " " + r1(6 * s) + " q" + r1(-9 * s) + " 0 " + r1(-9 * s) + " " + r1(-9 * s) + " q0 " + r1(-7 * s) + " " + r1(9 * s) + " " + r1(-16 * s) + " Z", c || "fO"); break;
      case "puzzle": h = path("M" + r1(x - 11 * s) + " " + r1(y - 11 * s) + " h" + r1(7 * s) + " a" + r1(4 * s) + " " + r1(4 * s) + " 0 0 1 " + r1(8 * s) + " 0 h" + r1(7 * s) + " v" + r1(7 * s) + " a" + r1(4 * s) + " " + r1(4 * s) + " 0 0 1 0 " + r1(8 * s) + " v" + r1(7 * s) + " h" + r1(-22 * s) + " Z", c || "fD"); break;
      case "gear": h = path(gearP(x, y, 12 * s, 8), c || "fN") + circ(x, y, 4.2 * s, "fP"); break;
      default: h = circ(x, y, 10 * s, c || "fN");
    }
    return h;
  }
  /* bar chart with grow-up reveals; items: {v, l, r, c, t} */
  function bars(o) {
    var s = "", n = o.items.length, i, it, x, bh, w = n * (o.bw + o.gap) - o.gap;
    for (i = 0; i < n; i++) {
      it = o.items[i]; x = o.x + i * (o.bw + o.gap); bh = it.v / o.max * o.h;
      s += R(it.r, "gy", rect(x, o.base - bh, o.bw, bh, it.c || "fN", { rx: Math.min(6, o.bw / 5) }));
      s += R(it.r, "up", TX(x + o.bw / 2, o.base - bh - 8, it.t || String(it.v), o.fs || 22, it.tc || "fI"));
      s += R(it.r, "f", TX(x + o.bw / 2, o.base + 19, it.l, o.ls || 14, "fN"));
    }
    return s + line(o.x - 8, o.base, o.x + w + 8, o.base, "sN", { "stroke-width": 2.4, "stroke-linecap": "round" });
  }
  function tag(s, v) { return chip(348 - chipW(s, 13) / 2, 19, s, v || "pm", 13); }
  function loopRing(cx, cy, r, w, c) {
    return path("M" + r1(cx - r) + " " + r1(cy) + " a" + r + " " + r + " 0 1 1 " + r1(2 * r) + " 0 a" + r + " " + r + " 0 1 1 " + r1(-2 * r) + " 0", (c || "sG") + " f0 flowd", { "stroke-width": w || 3 });
  }
  function ringPts(cx, cy, r, n, a0) { var p = [], i, a; for (i = 0; i <= n; i++) { a = (a0 || -90) * Math.PI / 180 + i / n * Math.PI * 2; p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } return p; }

  /* ---------- CSS (scoped under .vls-w14-<secId>, one shared <style id="vl-sc-w14">) ---------- */
  function sc(ids, sel) { return ids.map(function (id) { return ".vls-w14-" + id + (sel ? " " + sel : ""); }).join(","); }
  function baseCSS(ids) {
    var R2 = [];
    function add(sel, body) { R2.push(sc(ids, sel) + "{" + body + "}"); }
    R2.push(sc(ids, "") + "{--n:var(--vl-sc-navy,#1f4e79);--o:var(--vl-sc-orange,#c0502a);--g:var(--vl-sc-green,#317c61);--p:var(--vl-sc-paper,#fbf8f1);" +
      "--i:var(--vl-sc-ink,#1b2a3a);--b:var(--vl-sc-blue,#dbe7f2);--m:#7f98ad;--d:#d39b45;--l:#edf3f6;--s:#efe5d0;--w:#ffffff;--r:#a8321f;" +
      "position:relative;display:block;width:100%;height:100%;min-height:0;overflow:hidden;box-sizing:border-box;font-family:inherit;color:var(--i);}");
    add("> svg", "display:block;width:100%;height:100%;overflow:hidden;");
    add(".tx", "font-family:inherit;font-weight:800;text-anchor:middle;fill:var(--i);paint-order:stroke fill;stroke:var(--p);stroke-width:3.6px;stroke-linejoin:round;letter-spacing:.01em;");
    add(".tx.nh", "stroke:none;"); add(".tx.s", "text-anchor:start;"); add(".tx.e", "text-anchor:end;"); add(".tx.w6", "font-weight:650;");
    [13, 14, 15, 16, 18, 20, 22, 24, 28, 32, 40, 48, 56].forEach(function (n) { add(".t" + n, "font-size:" + n + "px;"); });
    var col = { N: "n", O: "o", G: "g", P: "p", I: "i", B: "b", M: "m", D: "d", L: "l", S: "s", W: "w", R: "r" };
    Object.keys(col).forEach(function (k) { add(".f" + k, "fill:var(--" + col[k] + ");"); add(".s" + k, "stroke:var(--" + col[k] + ");"); });
    add(".f0", "fill:none;");
    add(".pn", "transition:opacity .45s ease,transform .6s cubic-bezier(.2,.8,.2,1),visibility 0s linear 0s;");
    add(".pn.hid", "opacity:0;transform:translateY(10px);visibility:hidden;pointer-events:none;transition:opacity .35s ease,transform .4s ease,visibility 0s linear .4s;");
    add(".rv", "transition:opacity .5s ease,transform .75s cubic-bezier(.2,.9,.3,1.15);transform-box:fill-box;transform-origin:50% 50%;");
    add(".rv.off", "opacity:0;pointer-events:none;");
    add(".rv.off[data-fx=up]", "transform:translateY(16px);"); add(".rv.off[data-fx=dn]", "transform:translateY(-16px);");
    add(".rv.off[data-fx=l]", "transform:translateX(-24px);"); add(".rv.off[data-fx=r]", "transform:translateX(24px);");
    add(".rv.off[data-fx=pop]", "transform:scale(.35);"); add(".rv.off[data-fx=stamp]", "transform:scale(1.9) rotate(-10deg);");
    add(".rv[data-fx=gx]", "transform-origin:0% 50%;"); add(".rv.off[data-fx=gx]", "transform:scaleX(0);");
    add(".rv[data-fx=gy]", "transform-origin:50% 100%;"); add(".rv.off[data-fx=gy]", "transform:scaleY(0);");
    add(".rv[data-fx=dr] .dw", "stroke-dasharray:1 1;stroke-dashoffset:0;transition:stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1);");
    add(".rv.off[data-fx=dr] .dw", "stroke-dashoffset:1;"); add(".rv[data-fx=dr]", "transition:opacity .3s ease;");
    add(".mv", "transition:transform 1s cubic-bezier(.3,.9,.25,1.05);");
    add(".wk", "transition:none;");
    add(".dim", "opacity:.28;transition:opacity .5s ease;"); add(".hl", "transition:fill .5s ease,stroke .5s ease,opacity .5s ease;");
    add(".ghost", "opacity:.32;");
    add(".flowd", "stroke-dasharray:7 7;animation:" + KF + "Flow 1.2s linear infinite;");
    add(".spin", "transform-box:fill-box;transform-origin:50% 50%;animation:" + KF + "Spin 4s linear infinite;");
    add(".spinr", "transform-box:fill-box;transform-origin:50% 50%;animation:" + KF + "Spin 4s linear infinite reverse;");
    add(".bob", "animation:" + KF + "Bob 2.6s ease-in-out infinite;");
    add(".blink", "animation:" + KF + "Blink 1.3s ease-in-out infinite;");
    add(".wob", "transform-box:fill-box;transform-origin:50% 15%;animation:" + KF + "Wob 1.1s ease-in-out infinite;");
    add(".rise", "animation:" + KF + "Rise 2.2s ease-in infinite;");
    add(".k-pop", "transform-box:fill-box;transform-origin:50% 50%;animation:" + KF + "Pop .6s cubic-bezier(.3,1.6,.5,1) 1;");
    add(".k-shake", "transform-box:fill-box;transform-origin:50% 50%;animation:" + KF + "Shake .7s ease 1;");
    add(".dot", "transition:fill .45s ease,opacity .45s ease;");
    add(".kick", "text-anchor:start;font-size:12.5px;font-weight:850;letter-spacing:.12em;fill:var(--n);stroke:none;opacity:.85;");
    add(".capr", "fill:var(--n);"); add(".capt", "fill:#fff;stroke:none;font-size:15px;font-weight:800;text-anchor:middle;letter-spacing:.01em;");
    add(".capg", "transform-box:fill-box;transform-origin:50% 50%;"); add(".capg.go", "animation:" + KF + "Cap .5s cubic-bezier(.3,1.5,.5,1) 1;");
    add(".prog", "fill:var(--o);transform-box:fill-box;transform-origin:0 50%;transition:transform .6s ease;"); add(".progbg", "fill:var(--n);opacity:.1;");
    R2.push(sc(ids, "").split(",").map(function (s) { return s + ".inst *"; }).join(",") + "{transition:none!important;}");
    R2.push("@keyframes " + KF + "Flow{to{stroke-dashoffset:-28}}");
    R2.push("@keyframes " + KF + "Spin{to{transform:rotate(360deg)}}");
    R2.push("@keyframes " + KF + "Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}");
    R2.push("@keyframes " + KF + "Blink{0%,100%{opacity:1}50%{opacity:.35}}");
    R2.push("@keyframes " + KF + "Wob{0%,100%{transform:rotate(0)}25%{transform:rotate(14deg)}75%{transform:rotate(-14deg)}}");
    R2.push("@keyframes " + KF + "Rise{0%{transform:translateY(6px);opacity:0}30%{opacity:1}100%{transform:translateY(-14px);opacity:0}}");
    R2.push("@keyframes " + KF + "Pop{0%{transform:scale(.7)}100%{transform:scale(1)}}");
    R2.push("@keyframes " + KF + "Shake{0%{transform:rotate(-7deg)}25%{transform:rotate(6deg)}50%{transform:rotate(-4deg)}75%{transform:rotate(2deg)}100%{transform:rotate(0)}}");
    R2.push("@keyframes " + KF + "Cap{0%{transform:scale(.88)}100%{transform:scale(1)}}");
    R2.push("@media (prefers-reduced-motion:reduce){" + sc(ids, "*") + "{animation:none!important;transition:none!important;}}");
    return R2.join("\n");
  }
  function addCSS(key, css) {
    if (typeof document === "undefined") return;
    var st = document.getElementById(STYLE_ID);
    if (!st) { st = document.createElement("style"); st.id = STYLE_ID; (document.head || document.documentElement).appendChild(st); }
    var mark = "/*" + key + "*/";
    if ((st.textContent || "").indexOf(mark) < 0) st.textContent += "\n" + mark + "\n" + css + "\n";
  }
  function installCSS() {
    addCSS("vls-w14-v2-" + PART + "-base", baseCSS(IDS));
    addCSS("vls-w14-v2-" + PART + "-scenes", SEC_CSS.join("\n"));
  }

  /* ---------- tween + ambient loop helpers ---------- */
  function tween(el, key, from, to, dur, ease, apply, inst) {
    if (!el) return;
    var st = el["_vt" + key];
    if (st) CAF(st);
    if (inst || !dur || reduced()) { el["_vv" + key] = to; apply(to); return; }
    var a = from === undefined || from === null ? fin(el["_vv" + key], to) : from, t0 = now(), d = dur * 1000, e = EASE[ease] || EASE.io;
    function f() {
      var t = clamp((now() - t0) / d, 0, 1), v = a + (to - a) * e(t);
      el["_vv" + key] = v; apply(v);
      el["_vt" + key] = t < 1 ? RAF(f) : 0;
    }
    el["_vt" + key] = RAF(f);
  }
  function along(pts, t) {
    var L = 0, seg = [], i, d;
    for (i = 1; i < pts.length; i++) { d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
    var s = clamp(t, 0, 1) * L;
    for (i = 0; i < seg.length; i++) {
      if (s <= seg[i] || i === seg.length - 1) { var u = seg[i] ? clamp(s / seg[i], 0, 1) : 1; return [lerp(pts[i][0], pts[i + 1][0], u), lerp(pts[i][1], pts[i + 1][1], u)]; }
      s -= seg[i];
    }
    return pts[pts.length - 1];
  }
  /* GSAP (when present) drives entrance timing/easing through a proxy; styles stay ours */
  function gsapEnter(el, fx, delay) {
    var g = gsapLib(); if (!g) return false;
    var o = { t: 0 };
    el.style.transition = "none";
    function ap() {
      var t = o.t, u = 1 - t, tr = "none";
      if (fx === "pop") tr = "scale(" + (0.35 + 0.65 * t).toFixed(3) + ")";
      else if (fx === "stamp") tr = "scale(" + (1.9 - 0.9 * t).toFixed(3) + ") rotate(" + (-10 * u).toFixed(2) + "deg)";
      else if (fx === "up") tr = "translateY(" + (16 * u).toFixed(2) + "px)";
      else if (fx === "dn") tr = "translateY(" + (-16 * u).toFixed(2) + "px)";
      else if (fx === "l") tr = "translateX(" + (-24 * u).toFixed(2) + "px)";
      else if (fx === "r") tr = "translateX(" + (24 * u).toFixed(2) + "px)";
      else if (fx === "gx") tr = "scaleX(" + Math.max(0, t).toFixed(3) + ")";
      else if (fx === "gy") tr = "scaleY(" + Math.max(0, t).toFixed(3) + ")";
      el.style.transform = tr; el.style.opacity = String(Math.min(1, Math.max(0, t * 1.7)));
    }
    ap();
    try {
      g.to(o, { t: 1, delay: (delay || 0) / 1000, duration: fx === "stamp" ? 0.5 : 0.85,
        ease: fx === "stamp" ? "power3.in" : (fx === "gx" || fx === "gy") ? "power3.out" : "back.out(1.7)",
        onUpdate: ap, onComplete: function () { el.style.transition = ""; el.style.transform = ""; el.style.opacity = ""; } });
    } catch (e) { el.style.transition = ""; el.style.transform = ""; el.style.opacity = ""; return false; }
    return true;
  }
  function setT(el, x, y, s, rot) {
    if (el) el.style.transform = "translate(" + r1(x) + "px," + r1(y) + "px)" + (rot ? " rotate(" + r1(rot) + "deg)" : "") + (s !== undefined && s !== 1 ? " scale(" + s + ")" : "");
  }

  /* ---------- scene factory: build(el) / step(i, n) / reset() ---------- */
  function scene(def) {
    var root = null, cur = -1, curP = -1, loops = [], raf = 0, t0 = 0, panels = [], gen = 0;
    var N = def.lines.length;
    function lineFor(i, n) {
      n = Math.max(1, Math.floor(fin(n, N))); i = clamp(Math.floor(fin(i, 0)), 0, n - 1);
      if (n === N) return i;
      if (n <= 1) return 0;
      return clamp(Math.round(i * (N - 1) / (n - 1)), 0, N - 1);
    }
    function stopLoops() { loops = []; if (raf) { CAF(raf); raf = 0; } }
    function frame() {
      raf = 0;
      if (!root || !root.isConnected || !loops.length) return;
      var t = (now() - t0) / 1000;
      for (var j = 0; j < loops.length; j++) { try { loops[j](t); } catch (e) { /* keep running */ } }
      raf = RAF(frame);
    }
    function startLoops() { if (raf || !loops.length || reduced()) return; t0 = now(); raf = RAF(frame); }
    function api(pg, k, inst, fresh) {
      var A = {
        k: k, inst: inst, fresh: fresh, root: pg,
        q: function (s) { return pg.querySelector(s); },
        qa: function (s) { return Array.prototype.slice.call(pg.querySelectorAll(s)); },
        cls: function (s, c, on) { A.qa(s).forEach(function (n) { n.classList.toggle(c, !!on); }); },
        attr: function (s, a, v) { A.qa(s).forEach(function (n) { n.setAttribute(a, String(v)); }); },
        text: function (s, v) { A.qa(s).forEach(function (n) { n.textContent = String(v); }); },
        fill: function (s, v) { A.qa(s).forEach(function (n) { n.style.fill = v; }); },
        op: function (s, v) { A.qa(s).forEach(function (n) { n.style.opacity = String(v); }); },
        pos: function (s, x, y, sc2, rot) { A.qa(s).forEach(function (n) { setT(n, x, y, sc2, rot); }); },
        num: function (s, to, o) {
          o = o || {};
          A.qa(s).forEach(function (n) {
            tween(n, "n", o.from, to, o.dur === undefined ? 1.2 : o.dur, "out", function (v) {
              n.textContent = (o.pre || "") + (o.dec ? v.toFixed(o.dec) : String(Math.round(v))) + (o.suf || "");
            }, inst);
          });
        },
        bar: function (s, attr, to, o) {
          o = o || {};
          A.qa(s).forEach(function (n) {
            tween(n, attr, o.from, to, o.dur === undefined ? 1.2 : o.dur, "io", function (v) { n.setAttribute(attr, r1(v)); if (o.y0 !== undefined) n.setAttribute("y", r1(o.y0 - v)); }, inst);
          });
        },
        walk: function (s, pts, dur, o) {
          o = o || {};
          var n = A.q(s); if (!n) return;
          if (inst || reduced()) { var e = along(pts, o.loop ? (o.rest === undefined ? 1 : o.rest) : 1); setT(n, e[0], e[1], o.scale); return; }
          if (o.loop) {
            var off = o.offset || 0;
            loops.push(function (t) { var u = ((t + off) % dur) / dur, p = along(pts, u); setT(n, p[0], p[1], o.scale); });
            startLoops(); return;
          }
          tween(n, "w", 0, 1, dur, o.ease || "io", function (v) { var p = along(pts, v); setT(n, p[0], p[1], o.scale); }, false);
        },
        turn: function (s, x, y, to, o) {
          o = o || {};
          A.qa(s).forEach(function (n) { tween(n, "r", o.from, to, o.dur === undefined ? 1.2 : o.dur, o.ease || "io", function (v) { setT(n, x, y, o.scale, v); }, inst); });
        },
        later: function (ms, fn) {
          var g = gen;
          if (inst || reduced()) { fn(); return; }
          setTimeout(function () { if (g === gen && root && root.isConnected) fn(); }, ms);
        },
        loop: function (fn) { if (inst || reduced()) { try { fn(0); } catch (e) { /* ignore */ } return; } loops.push(fn); startLoops(); },
        fx: function (s, kind) {
          if (inst || reduced()) return;
          A.qa(s).forEach(function (n) {
            var g = gsapLib();
            if (g) {
              if (kind === "pop") g.fromTo(n, { scale: 0.7, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.6, ease: "back.out(2.6)", overwrite: "auto" });
              else g.fromTo(n, { rotation: -8, transformOrigin: "50% 50%" }, { rotation: 0, duration: 0.8, ease: "elastic.out(1.1,0.3)", overwrite: "auto" });
              return;
            }
            n.classList.remove("k-" + kind); try { void n.getBoundingClientRect(); } catch (e) { /* ignore */ } n.classList.add("k-" + kind);
          });
        }
      };
      return A;
    }
    function caption(s, inst) {
      var t = root.querySelector(".capt"), rr = root.querySelector(".capr"), g = root.querySelector(".capg");
      if (!t || !rr) return;
      t.textContent = s;
      var w = 0;
      try { w = t.getComputedTextLength(); } catch (e) { w = 0; }
      if (!w || !isFinite(w)) w = tw(s, 15);
      w = clamp(w + 34, 90, 344);
      rr.setAttribute("x", r1(180 - w / 2)); rr.setAttribute("width", r1(w));
      if (!inst && g) { g.classList.remove("go"); try { void g.getBoundingClientRect(); } catch (e) { /* ignore */ } g.classList.add("go"); }
    }
    function apply(i, n, inst) {
      if (!root) return;
      var li = lineFor(i, n), L = def.lines[li] || [0, 0, ""], p = L[0], k = L[1];
      inst = !!inst || reduced();
      gen++;
      root.classList.toggle("inst", inst);
      var fresh = p !== curP;
      stopLoops();
      panels.forEach(function (pg, j) { pg.classList.toggle("hid", j !== p); });
      var pg = panels[p];
      if (pg) {
        var rvs = Array.prototype.slice.call(pg.querySelectorAll(".rv")), n2 = 0;
        if (fresh && !inst) { rvs.forEach(function (el) { el.classList.add("off"); }); try { void pg.getBoundingClientRect(); } catch (e) { /* ignore */ } }
        rvs.forEach(function (el) {
          var r = String(el.getAttribute("data-r") || "0").split("-"), a = +r[0], b = r.length > 1 ? +r[1] : 99, on = k >= a && k <= b;
          var was = !el.classList.contains("off");
          el.classList.toggle("off", !on);
          if (on && !was && !inst) {
            var d = fresh ? Math.min(n2 * 60, 720) : Math.min(n2 * 45, 360); n2++;
            if (!gsapEnter(el, el.getAttribute("data-fx"), d)) el.style.transitionDelay = d ? d + "ms" : "";
          } else el.style.transitionDelay = "";
        });
        var P = def.panels[p];
        if (P && P.on) { try { P.on(api(pg, k, inst, fresh)); } catch (e) { if (W.console) W.console.error("[W14 " + def.id + " panel " + p + "]", e); } }
      }
      if (li !== cur || inst) caption(L[2], inst);
      var pr = root.querySelector(".prog");
      if (pr) pr.style.transform = "scaleX(" + ((li + 1) / N).toFixed(4) + ")";
      cur = li; curP = p;
    }
    return {
      build: function (host) {
        if (!host || typeof document === "undefined") return;
        installCSS(); stopLoops();
        var node = document.createElement("div");
        node.className = "vls-w14-" + def.id;
        node.setAttribute("role", "img");
        node.setAttribute("aria-label", def.aria);
        var body = "", j;
        for (j = 0; j < def.panels.length; j++) body += '<g class="pn hid" data-p="' + j + '">' + def.panels[j].svg() + "</g>";
        node.innerHTML = '<svg xmlns="' + NS + '" viewBox="0 0 360 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' +
          rect(-400, -400, 1160, 1100, "fP") + (def.bg ? def.bg() : "") + body +
          T(12, 21, def.kicker, "kick") +
          G("capg", rect(100, 268, 160, 27, "capr", { rx: 13.5 }) + T(180, 286.8, "", "capt")) +
          rect(0, 297, 360, 3, "progbg") + rect(0, 297, 360, 3, "prog") + "</svg>";
        if (typeof host.replaceChildren === "function") host.replaceChildren(node);
        else { while (host.firstChild) host.removeChild(host.firstChild); host.appendChild(node); }
        root = node; cur = -1; curP = -1;
        panels = Array.prototype.slice.call(node.querySelectorAll(".pn"));
        if (!W.VL_WORK || VL_WORK.immediate) { apply(0, N, true); return; }
        var owner = node, version = ++gen;
        return VL_WORK.yield().then(function () {
          if (root === owner && gen === version && owner.isConnected) apply(0, N, true);
        });
      },
      step: function (i, n) { if (root) apply(i, n === undefined ? N : n, false); },
      reset: function () { if (!root) return; stopLoops(); if (W.VL_WORK?.discarding) { gen++; return; } cur = -1; curP = -1; apply(0, N, true); }
    };
  }
  function define(def) {
    if (def.css) SEC_CSS.push(def.css);
    VL[def.id] = scene(def);
  }

  /* ==================================================================
     W14O2a · FIVE WAYS A GOOD PROCESS QUIETLY DETERIORATES  (audit 2.8/10)
     28 lines -> 8 visuals. One visual per mechanism; each is labelled
     QASR EVIDENCE (ownership, measures, local changes) or GENERAL RISK
     (informal retraining, organisational change) so nothing is over-claimed.
     ================================================================== */
  (function () {
    var P = [];
    function mech(n, name) { return chip(12 + chipW(n + ": " + name, 14) / 2, 48, n + ": " + name, "n", 14); }
    function road(y, x0, x1) { return rect(x0, y - 7, x1 - x0, 14, "fL", { rx: 7 }) + line(x0 + 8, y, x1 - 8, y, "sM", { "stroke-width": 2, "stroke-dasharray": "8 8" }); }
    function stampW(x, y, txt, v, rot) { var w = tw(txt, 15) + 26; return G("", rect(x - w / 2, y - 15, w, 30, "f0 " + (v || "sO"), { rx: 6, "stroke-width": 3 }) + TX(x, y + 5.5, txt, 15, "nh " + (v === "sG" ? "fG" : "fO")), { transform: "rotate(" + (rot === undefined ? -7 : rot) + " " + x + " " + y + ")" }); }

    /* V1 · lines 0-2 — management must continue; diligent staff, slipping results; look at the arrangements, not the people
       Template: https://www.behance.net/gallery/190390491/Creative-process-Motion-design-creative-project (object moved through iterations) */
    P.push({
      svg: function () {
        var a = card(120, 96, 120, 70, "g") + TX(180, 126, "Improved", 15, "nh fW") + TX(180, 146, "process", 15, "nh fW") +
          WK("pt1", 300, 214, crowd(0, 0, 2, 26, 1, "M")) + TX(284, 244, "Programme leaves", 13, "fM") +
          person(70, 214, 1.5, "G") + cal(70, 112, 1, "fG") + TX(70, 244, "Manager stays", 13, "fG") + arrow(92, 190, 124, 160, "sG", 2.6);
        var b = line(30, 150, 330, 150, "sN", { "stroke-width": 2 }) + path("M30 70 C120 74 200 96 330 128", "sO f0", { "stroke-width": 4 }) + TX(36, 62, "Performance level", 14, "fO s") + arrow(310, 116, 330, 128, "sO", 3), i;
        for (i = 0; i < 4; i++) b += person(64 + i * 76, 228, 1.3, i % 2 ? "N" : "G") + okB(80 + i * 76, 180, 9);
        b += TX(180, 254, "Everyone conscientious", 14, "fG");
        var c = rect(60, 64, 240, 170, "f0 sN", { rx: 14, "stroke-width": 3, "stroke-dasharray": "8 6" }) +
          chip(180, 64, "Process ownership", "n", 13) + chip(74, 150, "Measure reviews", "n", 13) + chip(296, 150, "Change rules", "n", 13) + chip(180, 234, "Staff learning", "n", 13) +
          person(180, 176, 1.5, "M") + noB(212, 112, 11) + G("bob", icon("mag", 270, 96, 1.8));
        return R("0-0", "f", a) + R("1-1", "up", b) + R("2", "pop", c);
      },
      on: function (A) { if (A.k === 0) A.walk(".n-pt1", [[236, 214], [290, 214], [310, 214]], 2.4, {}); }
    });

    /* V2 · lines 3-6 — drift is a gradual gap from the achieved level; many small steps, no cliff; 82 -> 24, then 39
       Template: https://observablehq.com/@d3/streamgraph-transitions (area morphing over time) */
    P.push({
      svg: function () {
        var a = line(30, 96, 330, 96, "sG", { "stroke-width": 3, "stroke-dasharray": "8 6" }) + TX(36, 86, "Achieved level", 14, "fG s") +
          R("0", "f", path("M30 96 C120 98 200 120 330 176 L330 96 Z", "fO", { opacity: 0.16 })) +
          R("0", "dr", path("M30 96 C120 98 200 120 330 176", "sO f0 dw", { pathLength: 1, "stroke-width": 4 })) +
          R("0-0", "up", TX(250, 210, "Gradual drift", 18, "fO")) + line(30, 232, 330, 232, "sN", { "stroke-width": 2 });
        var b = R("1", "f", path("M40 112 h30 v10 h30 v10 h30 v10 h30 v10 h30 v10 h30 v10 h30 v10 h30", "sO f0", { "stroke-width": 3.4 }) + okB(320, 196, 11) +
          TX(150, 214, "Small steps", 15, "fO") + G("ghost", path("M180 60 h60 v120", "sM f0", { "stroke-width": 3 })) + noB(256, 64, 10) + TX(276, 86, "No cliff", 14, "fM s"));
        var c = bars({ x: 54, base: 232, h: 150, max: 90, bw: 66, gap: 34, fs: 24, items: [
          { v: 82, l: "Baseline", r: "2", c: "fM" }, { v: 24, l: "Month 5", r: "2", c: "fG" }, { v: 39, l: "Month 22", r: "3", c: "fO" }] });
        return R("0-1", "f", a + b) + R("2", "f", tag("Qasr evidence", "pm") + c);
      }
    });

    /* V3 · lines 7-10 — MECHANISM 1 (Qasr evidence): the owner moves in the org chart; the director absorbs it; boundary problems linger
       Template: https://old.observablehq.com/@d3/hierarchy-traversal-animated (hierarchy nodes visited in turn) */
    P.push({
      svg: function () {
        var s = mech("1", "Ownership") + tag("Qasr evidence", "pm");
        var org = card(110, 66, 140, 42, "n") + TX(180, 92, "Operations director", 13, "nh fW") +
          line(180, 108, 180, 120, "sN", { "stroke-width": 2 }) + line(80, 120, 280, 120, "sN", { "stroke-width": 2 }) + line(80, 120, 80, 132, "sN", { "stroke-width": 2 }) + line(280, 120, 280, 132, "sN", { "stroke-width": 2 }) +
          G("ownBox hl", card(20, 132, 120, 74, "p")) + TX(80, 152, "Arrival owner", 13, "fN") + card(220, 132, 120, 74, "p") + TX(280, 152, "Marina GM", 13, "fN") +
          WK("ow1", 80, 200, person(0, 0, 1.15, "G"));
        s += R("0-2", "f", org);
        s += R("0-0", "up", chip(180, 236, "Changes role", "o", 14));
        s += R("1-1", "up", cal(80, 232, 0.9, "fO", "9") + TX(160, 238, "months ago", 14, "fO s"));
        s += R("1-2", "pop", TX(80, 186, "Vacant", 16, "fO"));
        var r13 = ""; for (var i = 0; i < 13; i++) r13 += R("2-2", "pop", rect(28 + i * 24, 222, 18, 18, "fM", { rx: 3 }));
        s += r13 + R("2-2", "f", TX(180, 256, "13 direct reports", 14, "fN") + carrow(140, 176, 160, 150, 160, 112, "sO", 2.6));
        var d = "";
        [["Front desk", 62], ["Kiosk team", 180], ["Room cleaning", 298]].forEach(function (b) { d += card(b[1] - 54, 96, 108, 120, "p") + TX(b[1], 120, b[0], 13, "fN"); });
        d += line(122, 96, 122, 216, "sM", { "stroke-width": 2, "stroke-dasharray": "5 5" }) + line(238, 96, 238, 216, "sM", { "stroke-width": 2, "stroke-dasharray": "5 5" }) +
          WK("bp", 100, 170, icon("spark", 0, 0, 1)) + qB(122, 236, 11) + qB(238, 236, 11) + TX(180, 258, "Nobody coordinates", 14, "fO");
        return s + R("3", "f", d);
      },
      on: function (A) {
        if (A.k === 1 && A.fresh === false) A.walk(".n-ow1", [[80, 200], [180, 220], [280, 200]], 2.2, {});
        else A.pos(".n-ow1", A.k >= 1 ? 280 : 80, 200);
        A.cls(".ownBox", "dim", A.k >= 1);
        if (A.k === 3) A.walk(".n-bp", [[90, 168], [150, 150], [210, 170], [270, 150], [210, 170], [150, 150], [90, 168]], 4, { loop: true });
      }
    });

    /* V4 · lines 11-14 — MECHANISM 2 (Qasr evidence): the measure unplugged from decisions; page four; last discussed at 28; interpret and respond
       Template: https://dribbble.com/shots/27247003-Data-Workflow-Animation (links activate between nodes) */
    P.push({
      svg: function () {
        var s = mech("2", "Unread measures") + tag("Qasr evidence", "pm");
        var a = doc(30, 86, 80, 104, "fW sN", 4) + TX(70, 212, "Monthly measure", 13, "fN") + line(112, 138, 160, 138, "sN", { "stroke-width": 4 }) + rect(160, 128, 18, 20, "fN", { rx: 3 }) +
          G("blink", icon("spark", 196, 138, 0.8)) + rect(214, 128, 18, 20, "fM", { rx: 3 }) + line(232, 138, 250, 138, "sM", { "stroke-width": 4 }) +
          card(250, 100, 96, 76, "pm") + icon("gavel", 298, 130, 1.1) + TX(298, 164, "Decisions made", 13, "fM") + chip(180, 238, "Unplugged from decisions", "po", 14);
        var b = person(60, 200, 1.4, "G") + rect(20, 200, 90, 10, "fN", { rx: 3 }) + TX(66, 232, "Monthly analyst", 13, "fG") + arrow(116, 150, 150, 150, "sN", 3);
        for (var k = 0; k < 4; k++) b += card(158 + k * 44, 84 + k * 6, 64, 116, k === 3 ? "po" : "p") + TX(190 + k * 44, 106 + k * 6, String(k + 1), 14, k === 3 ? "fO" : "fM");
        b += icon("chart", 322, 150, 1.2) + chip(270, 232, "Page four", "o", 14);
        var c = "";
        for (k = 0; k < 7; k++) c += R("2", "pop", rect(24 + k * 46, 92, 38, 38, "fW sO", { rx: 4, "stroke-width": 1.8 }) + cross(43 + k * 46, 111, 1, "sO"));
        c += TX(180, 170, "Last discussed at", 16, "fN") + TX(180, 214, "28 min", 34, "fO") + TX(180, 246, "seven months ago", 14, "fM");
        var d = doc(24, 92, 70, 90, "fW sN", 3) + TX(62, 204, "Monthly report", 13, "fN") + arrow(100, 136, 132, 136, "sN", 3) +
          person(170, 176, 1.4, "G") + path("M190 82 h70 v30 h-50 l-10 10 v-10 h-10 Z", "fL sG", { "stroke-width": 1.5 }) + TX(225, 102, "So what?", 13, "fG") +
          arrow(204, 150, 238, 150, "sG", 3) + card(244, 120, 100, 60, "g") + icon("wrench", 270, 150, 0.9, "sW") + TX(306, 156, "Act now", 14, "nh fW") +
          chip(180, 238, "Governance responds", "g", 14);
        return s + R("0-0", "f", a) + R("1-1", "f", b) + R("2-2", "f", c) + R("3", "pop", d);
      }
    });

    /* V5 · lines 15-18 — MECHANISM 3 (Qasr evidence): local changes pile onto one route; the four documented stations; +13 of 15; locally fine, end-to-end worse
       Template: https://lottiefiles.com/free-animation/business-solution-pNyNfkcRsa (boxes on a conveyor) */
    var STN = [["passport", "Passport", "check"], ["coin", "Waiver", "limit"], ["star", "Loyalty", "prompt"], ["desk", "Heritage", "desks ×2"]];
    P.push({
      svg: function () {
        var s = mech("3", "Local changes") + tag("Qasr evidence", "pm");
        var a = road(196, 14, 346), i;
        for (i = 0; i < 4; i++) a += R("0", "dn", rect(52 + i * 72, 164, 40, 26, "fD", { rx: 4 })) + person(72 + i * 72, 112, 0.9, "N") + arrow(72 + i * 72, 120, 72 + i * 72, 150, "sM", 2);
        a += TX(180, 236, "Each department adds", 14, "fN");
        var b = road(150, 14, 346);
        STN.forEach(function (st, j) { var x = 54 + j * 84; b += card(x - 34, 84, 68, 48, "o") + icon(st[0], x, 108, 0.95, st[0] === "passport" ? "fW" : undefined) + TX(x, 176, st[1], 13, "fN") + TX(x, 192, st[2], 13, "fN"); });
        var c = rect(30, 214, 13 * 17, 34, "fO", { rx: 7 }) + TX(30 + 110, 236, "+13 combined", 16, "nh fW") + rect(255, 214, 34, 34, "fM", { rx: 6 }) + TX(272, 236, "+2", 15, "nh fW") +
          TX(320, 236, "of 15", 14, "fN");
        var d = STN.map(function (st, j) { return okB(54 + j * 84 + 30, 84, 9); }).join("") + chip(180, 236, "End-to-end: worse", "o", 15) + noB(286, 236, 12);
        return s + R("0-0", "f", a) + R("1", "f", b) + R("2-2", "gx", c) + R("3", "pop", d);
      }
    });

    /* V6 · lines 19-22 — MECHANISM 4 (general risk): turnover and informal retraining; shortcuts taught; faster now, inconsistent later; POSSIBLE, NOT PROVEN
       Template: https://dribbble.com/shots/27600376-Clean-Workflow-Visualization-with-Motion-Graphics (journey steps connected by transitions) */
    P.push({
      svg: function () {
        var s = mech("4", "Informal retraining") + tag("General risk", "po");
        var a = rect(290, 82, 54, 150, "fS sN", { rx: 3, "stroke-width": 2 }) + WK("lv6", 300, 214, person(0, 0, 1.2, "M")) + WK("nw6", 20, 214, person(0, 0, 1.2, "G")) +
          icon("book", 110, 120, 1.6, "fM") + TX(110, 154, "Manual closed", 13, "fM") + person(190, 214, 1.4, "N") + path("M206 150 h76 v26 h-56 l-10 8 v-8 h-10 Z", "fL sM", { "stroke-width": 1.4 }) + TX(244, 168, "Do it so", 13, "fN") +
          chip(116, 246, "Staff turnover", "pm", 13);
        var b = path("M30 200 C90 200 90 100 170 100 S260 200 330 200", "sG f0", { "stroke-width": 4, "stroke-dasharray": "8 6" }) + TX(170, 88, "Approved procedure", 14, "fG") +
          path("M30 200 L330 200", "sO f0", { "stroke-width": 5 }) + TX(180, 226, "Shortcut taught", 15, "fO") + WK("pr", 30, 196, person(0, 0, 0.9, "N") + person(22, 0, 0.75, "G"));
        var c = icon("clock", 60, 112, 1.6) + TX(60, 154, "Busy shift", 14, "fN") + chip(60, 190, "Faster now", "g", 13) +
          card(130, 74, 216, 150, "po") + TX(238, 98, "Results vary", 15, "fO");
        [[160, 140], [190, 196], [220, 120], [256, 176], [290, 132], [318, 204], [176, 168], [244, 146], [300, 168]].forEach(function (p) { c += circ(p[0], p[1], 6, "fO"); });
        var d = R("3", "stamp", stampW(180, 96, "POSSIBLE, NOT PROVEN")) + R("3", "up", icon("binder", 110, 186, 2) + TX(110, 232, "Qasr exhibit", 13, "fN") + chip(246, 186, "Not established", "po", 14));
        return s + R("0-0", "f", a) + R("1-1", "f", b) + R("2-2", "pop", c) + d;
      },
      on: function (A) {
        if (A.k === 0) { A.walk(".n-lv6", [[240, 214], [318, 214]], 2, {}); A.walk(".n-nw6", [[20, 214], [150, 214]], 2.4, {}); }
        if (A.k === 1) A.walk(".n-pr", [[30, 196], [300, 196]], 3.4, { loop: true });
      }
    });

    /* V7 · lines 23-24 — MECHANISM 5 (general risk): the organisation changes but the process stays frozen; reshape the design to fit
       Template: https://observablehq.com/@d3/shape-tweening (one shape transformed into another) */
    P.push({
      svg: function () {
        var s = mech("5", "Context change") + tag("General risk", "po");
        var a = "";
        [[40, 90], [130, 90], [220, 90], [85, 150], [175, 150]].forEach(function (p, j) { a += WK("ob" + j, p[0], p[1], card(0, 0, 76, 40, "n") + rect(10, 15, 56, 8, "fW", { rx: 3, opacity: 0.6 })); });
        a += TX(150, 216, "New structure", 15, "fN") + card(268, 96, 80, 112, "pm") + icon("ice", 308, 136, 1.4) + TX(308, 186, "Process", 14, "fM") + TX(308, 202, "unchanged", 13, "fM");
        var b = rect(70, 96, 96, 96, "f0 sO", { rx: 6, "stroke-width": 3, "stroke-dasharray": "6 5" }) + TX(118, 216, "New conditions", 14, "fO") +
          WK("pz", 250, 144, icon("puzzle", 0, 0, 3.4, "fM")) + TX(250, 216, "Old design", 14, "fM") + chip(180, 252, "Reshape to fit", "g", 14);
        return s + R("0-0", "f", a) + R("1", "f", b);
      },
      on: function (A) {
        var P0 = [[40, 90], [130, 90], [220, 90], [85, 150], [175, 150]], P1 = [[40, 150], [175, 90], [100, 90], [220, 150], [130, 150]];
        P0.forEach(function (p, j) { var q = A.k === 0 ? P1[j] : p; A.walk(".n-ob" + j, [p, q], A.k === 0 ? 1.6 : 0.01, {}); });
        if (A.k >= 1) A.walk(".n-pz", [[250, 144], [180, 144], [118, 144]], 2.4, {});
      }
    });

    /* V8 · lines 25-27 — the mechanisms reinforce each other; a management system, not reminders; next: reasonable parts, poor whole
       Template: https://lottiefiles.com/free-animation/process-in-cub-9iNG7QP0qC (interlocking states cycling) */
    P.push({
      svg: function () {
        var a = G("spin", gear(96, 136, 44, "fN")) + G("spinr", gear(180, 196, 40, "fO")) + G("spinr", gear(266, 132, 44, "fD")) +
          TX(96, 66, "Weak ownership", 15, "fN") + TX(180, 258, "Local changes", 15, "fO") + TX(266, 66, "Unread measures", 15, "fD") +
          carrow(140, 92, 180, 70, 222, 92, "sO", 2.6, true);
        var b = card(10, 40, 160, 210, "po") + icon("mega", 70, 120, 2) + TX(118, 112, "Work", 16, "fO") + TX(118, 132, "harder!", 16, "fO") + noB(150, 52, 12) + TX(90, 230, "More reminders", 15, "fO") +
          card(190, 40, 160, 210, "pg") + okB(330, 52, 12) + chip(270, 92, "Named owner", "g", 13) + chip(270, 132, "Active review", "g", 13) + chip(270, 172, "Change rules", "g", 13) +
          TX(270, 230, "Management system", 14, "fG");
        var c = "";
        for (var i = 0; i < 4; i++) c += card(14 + i * 60, 70, 52, 52, "pg") + okB(40 + i * 60, 96, 13) + arrow(40 + i * 60, 126, 140 + (i - 1.5) * 10, 168, "sM", 2.2);
        c += card(260, 70, 86, 52, "po") + noB(303, 96, 13) + TX(303, 140, "Whole process", 13, "fO") + card(60, 172, 160, 56, "o") + TX(140, 206, "39 minutes", 18, "nh fW") + arrow(222, 200, 258, 110, "sO", 2.4);
        return R("0-0", "f", a) + R("1-1", "pop", b) + R("2", "up", c);
      }
    });

    define({
      id: "W14O2a", kicker: "HOW DRIFT HAPPENS", aria: "Five mechanisms of drift, each shown literally: ownership loss, unread measures and accumulating local changes from the Qasr evidence, and informal retraining and context change marked as general risks.",
      panels: P,
      lines: [
        [0, 0, "Management must continue"], [0, 1, "Diligent, yet slipping"], [0, 2, "Look past the people"],
        [1, 0, "Gradual drift away"], [1, 1, "Small steps, no cliff"], [1, 2, "82 down to 24"], [1, 3, "Back up to 39"],
        [2, 0, "1: ownership disappears"], [2, 1, "Promoted to Marina"], [2, 2, "Director: 13 reports"], [2, 3, "Boundary problems linger"],
        [3, 0, "2: measures stop steering"], [3, 1, "Page four, monthly"], [3, 2, "Last discussed at 28"], [3, 3, "Information needs response"],
        [4, 0, "3: local changes pile"], [4, 1, "Four approved changes"], [4, 2, "13 of 15 minutes"], [4, 3, "Local approval isn't enough"],
        [5, 0, "4: informal retraining"], [5, 1, "Shortcuts get taught"], [5, 2, "Faster now, inconsistent later"], [5, 3, "Possible, not proven"],
        [6, 0, "5: context changes"], [6, 1, "Reshape the design"],
        [7, 0, "Mechanisms reinforce"], [7, 1, "System, not reminders"], [7, 2, "Reasonable parts, poor whole"]
      ]
    });
  })();

  /* ==================================================================
     W14O3b · GOVERNING CHANGES WITHOUT BLOCKING IMPROVEMENT  (audit 2.8/10)
     27 lines -> 9 visuals. The four slide routes are shown as four distinct
     procedures with their own actors and evidence: owner + log + quarterly
     aggregate; owner + affected functions + modelled effect; owner + risk
     (is the risk live? cheapest control?); steering group + phase 3 scoping.
     ================================================================== */
  (function () {
    var P = [];
    function stampW(x, y, txt, v, rot) { var w = tw(txt, 15) + 26; return G("", rect(x - w / 2, y - 15, w, 30, "f0 " + (v || "sO"), { rx: 6, "stroke-width": 3 }) + TX(x, y + 5.5, txt, 15, "nh " + (v === "sG" ? "fG" : "fO")), { transform: "rotate(" + (rot === undefined ? -7 : rot) + " " + x + " " + y + ")" }); }
    function route(n, name) { return chip(12 + chipW("Route " + n + ": " + name, 14) / 2, 48, "Route " + n + ": " + name, "n", 14); }
    function road(y, x0, x1) { return rect(x0, y - 7, x1 - x0, 14, "fL", { rx: 7 }) + line(x0 + 8, y, x1 - 8, y, "sM", { "stroke-width": 2, "stroke-dasharray": "8 8" }); }

    /* V1 · lines 0-2 — the owner's loop; one heavy gate makes every change queue; balance flexibility and accountability
       Template: https://lottiefiles.com/free-animation/cro-process-RaUu5ps2to (movement across business steps) */
    P.push({
      svg: function () {
        var a = G("spin", loopRing(180, 150, 74, 6, "sG")) + person(180, 176, 1.5, "G");
        ["1 Measure", "2 Review", "3 Improve", "4 Embed"].forEach(function (n, i) { var p = ringPts(180, 150, 74, 4)[i]; a += chip(p[0], p[1], n, "g", 14); });
        var b = rect(214, 70, 18, 170, "fN", { rx: 4 }) + rect(232, 110, 100, 18, "fN", { rx: 4 }) + TX(280, 154, "Approval", 15, "fN") + TX(280, 174, "form", 15, "fN"), i;
        for (i = 0; i < 6; i++) b += card(20 + i * 32, 186, 26, 26, i % 2 ? "o" : "d", { rx: 4 });
        b += G("spin", icon("clock", 280, 216, 1.2)) + chip(110, 238, "Every change waits", "po", 14) + doc(140, 74, 40, 50, "fW sN", 3) + doc(150, 84, 40, 50, "fW sN", 3) + noB(320, 60, 11);
        var c = line(180, 118, 180, 230, "sN", { "stroke-width": 5 }) + path("M160 238 h40 l-20 -16 Z", "fN") +
          WK("bm", 180, 118, line(-124, 0, 124, 0, "sN", { "stroke-width": 5, "stroke-linecap": "round" }) + line(-100, 0, -100, 26, "sM", { "stroke-width": 2 }) + line(100, 0, 100, 26, "sM", { "stroke-width": 2 }) +
            rect(-140, 26, 80, 8, "fN", { rx: 3 }) + rect(60, 26, 80, 8, "fN", { rx: 3 }) + icon("spark", -100, 12, 0.9, "fD") + icon("shield", 100, 10, 1)) +
          TX(80, 186, "Local flexibility", 15, "fD") + TX(280, 186, "End-to-end", 15, "fG") + TX(280, 204, "accountability", 14, "fG");
        return R("0-0", "pop", a) + R("1-1", "f", b) + R("2", "f", c);
      },
      on: function (A) { if (A.k >= 2) A.turn(".n-bm", 180, 118, 0, { from: A.fresh || A.k === 2 ? -8 : undefined, dur: 2.2, ease: "back" }); }
    });

    /* V2 · lines 3-6 — four separate approvals; together +13 of 15; each had a reason; nobody approved the whole journey
       Template: https://motionarray.com/after-effects-templates/infographics-pack-100132/ (one metric element at a time) */
    var CH = [["passport", "Passport", "Regulation"], ["coin", "Waiver", "Finance control"], ["star", "Loyalty", "Local concern"], ["desk", "Desks", "Local concern"]];
    P.push({
      svg: function () {
        var s = tag("Qasr evidence", "pm");
        CH.forEach(function (c, j) {
          var x = 12 + j * 86;
          s += G("chG hl", card(x, 40, 80, 100, "p") + icon(c[0], x + 40, 66, 1) + TX(x + 40, 104, c[1], 14, "fN") +
            G("", rect(x + 12, 114, 56, 18, "f0 sG", { rx: 4, "stroke-width": 2 }) + TX(x + 40, 128, "OK", 13, "nh fG"), { transform: "rotate(-8 " + (x + 40) + " 123)" }));
          var wds = c[2].split(" ");
          s += R("2-2", "up", TX(x + 40, 160, wds[0], 13, "fM") + (wds[1] ? TX(x + 40, 176, wds[1], 13, "fM") : ""));
        });
        s += R("1-1", "gx", rect(30, 182, 13 * 17, 38, "fO", { rx: 8 }) + TX(30 + 110, 207, "+13 combined", 17, "nh fW") + rect(254, 182, 34, 38, "fM", { rx: 6 }) + TX(271, 207, "+2", 15, "nh fW")) +
          R("1-1", "up", TX(310, 207, "/ 15", 15, "fN s"));
        s += R("2-2", "up", chip(180, 236, "May be legitimate", "g", 14));
        s += R("3", "f", road(206, 20, 340) + WK("gj", 20, 200, person(0, 0, 0.8, "O")) + chip(180, 248, "Journey unapproved", "po", 14) + qB(330, 170, 12));
        return s;
      },
      on: function (A) { A.cls(".chG", "dim", A.k === 1); if (A.k === 3) A.walk(".n-gj", [[20, 200], [330, 200]], 4, { loop: true }); }
    });

    /* V3 · lines 7-8 — what governance defines: who approves, what evidence, when to consult widely; scrutiny rises with significance
       Template: https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/ (columns grow, axis updates) */
    P.push({
      svg: function () {
        var a = "";
        [["person", "Who approves?"], ["chart", "What evidence?"], ["people", "When to consult?"]].forEach(function (q, j) {
          var y = 70 + j * 62;
          a += R("0", "l", card(30, y - 24, 300, 50, "p") + (q[0] === "person" ? person(64, y + 16, 0.85, "N") : q[0] === "people" ? person(56, y + 16, 0.7, "N") + person(74, y + 16, 0.7, "G") : icon(q[0], 64, y, 1)) +
            TX(96, y + 7, q[1], 18, "fN s"));
        });
        a += chip(180, 250, "Change governance", "n", 14);
        var b = "", L = ["Minor change", "End-to-end impact", "Risk control", "Process boundary"];
        L.forEach(function (n, j) {
          var h = 44 + j * 44, x = 16 + j * 84;
          b += R("1", "gy", rect(x, 236 - h, 76, h, j === 3 ? "fO" : j === 2 ? "fD" : j === 1 ? "fN" : "fG", { rx: 6 }));
          b += R("1", "up", TX(x + 38, 212 - h, n.split(" ")[0], 13, "fN") + TX(x + 38, 228 - h, n.split(" ").slice(1).join(" "), 13, "fN"));
        });
        b += R("1", "f", arrow(24, 112, 236, 50, "sO", 2.6) + TX(100, 70, "More scrutiny", 15, "fO"));
        return R("0-0", "f", a) + R("1", "f", b);
      }
    });

    /* V4 · lines 9-12 — ROUTE 1: below materiality; owner decides and logs; no committee needed; logged changes reviewed together each quarter
       Template: https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm (worker actions in sequence) */
    P.push({
      svg: function () {
        var s = route(1, "minor change");
        var a = line(40, 222, 40, 70, "sN", { "stroke-width": 3 }) + line(30, 120, 330, 120, "sO", { "stroke-width": 3, "stroke-dasharray": "8 6" }) + TX(326, 112, "Materiality threshold", 14, "fO e") +
          rect(140, 174, 90, 48, "fG", { rx: 8 }) + TX(185, 204, "Small tweak", 14, "nh fW") + TX(300, 200, "Below it", 16, "fG");
        var b = person(70, 214, 1.5, "G") + TX(70, 244, "Process owner", 13, "fG") + icon("gavel", 116, 150, 1.2) + arrow(140, 160, 176, 160, "sN", 3) +
          icon("book", 210, 156, 2) + TX(210, 196, "Change log", 14, "fN") + R("1", "dn", line(186, 166, 234, 166, "sD", { "stroke-width": 3 })) +
          arrow(250, 160, 280, 160, "sN", 3) + cal(310, 154, 1.1, "fG") + TX(310, 190, "Quarterly", 13, "fG") + TX(310, 205, "review", 13, "fG");
        var c = rect(200, 90, 140, 16, "fS sN", { rx: 5, "stroke-width": 1.5 }) + chair(222, 140, 0.9, "M") + chair(270, 140, 0.9, "M") + chair(318, 140, 0.9, "M") + noB(336, 80, 11) +
          TX(270, 168, "No committee", 15, "fM") + WK("tw", 30, 220, card(-24, -14, 48, 28, "g", { rx: 5 })) + line(20, 220, 340, 220, "sM", { "stroke-width": 2, "stroke-dasharray": "4 6" });
        var d = icon("book", 60, 140, 2.6), i;
        for (i = 0; i < 12; i++) d += R("3", "pop", rect(130 + (i % 6) * 34, 78 + Math.floor(i / 6) * 34, 28, 26, "fG", { rx: 4 }));
        d += R("3", "gx", rect(130, 176, 200, 30, "fO", { rx: 6 }) + TX(230, 197, "Adds up", 16, "nh fW")) + cal(60, 220, 1, "fG") + TX(230, 236, "Reviewed together", 14, "fN");
        return s + R("0-0", "f", a) + R("1-1", "pop", b) + R("2-2", "f", c) + R("3", "f", d);
      },
      on: function (A) {
        if (A.k === 2) A.walk(".n-tw", [[30, 220], [330, 220]], 2.6, { loop: true });
      }
    });

    /* V5 · lines 13-16 — ROUTE 2: changes touching the end-to-end measure; owner + affected functions state the modelled effect; estimate first; hidden guest waiting
       Template: https://observablehq.com/@d3/learn-d3-animation (series drawn, projection added) */
    P.push({
      svg: function () {
        var s = route(2, "end-to-end impact");
        var a = card(20, 90, 124, 60, "d") + TX(82, 126, "Change proposal", 14, "nh fI") + arrow(136, 120, 196, 120, "sO", 3) +
          circ(260, 140, 52, "fW sN", { "stroke-width": 3 }) + icon("clock", 260, 130, 1.6) + TX(260, 178, "Arrival time", 13, "fN") + chip(180, 236, "Touches end-to-end measure", "o", 14);
        var b = person(56, 150, 1.2, "G") + TX(56, 172, "Process owner", 13, "fG") + person(56, 236, 1, "N") + person(96, 236, 1, "N") + person(136, 236, 1, "N") + TX(96, 256, "Affected functions", 13, "fN") +
          card(176, 80, 172, 104, "p") + TX(262, 104, "Modelled effect", 15, "fN") + TX(262, 140, "+? min", 26, "fO") + R("1", "stamp", stampW(262, 214, "BEFORE APPROVAL", "sG", -4));
        var c = line(30, 220, 330, 220, "sN", { "stroke-width": 2 }) + path("M30 180 L80 176 L130 178 L180 174", "sN f0", { "stroke-width": 3 }) +
          [[30, 180], [80, 176], [130, 178], [180, 174]].map(function (p) { return circ(p[0], p[1], 5, "fN"); }).join("") + TX(100, 204, "Past evidence", 14, "fN") +
          R("2", "dr", path("M180 174 L330 150", "sO f0 dw", { pathLength: 1, "stroke-width": 3, "stroke-dasharray": "1 1" })) +
          R("2", "pop", rect(188, 140, 154, 36, "fO", { opacity: 0.15, rx: 6 }) + TX(265, 132, "Modelled estimate", 13, "fO")) + line(180, 70, 180, 220, "sM", { "stroke-width": 2, "stroke-dasharray": "4 4" }) + TX(184, 82, "Decide here", 13, "fM s");
        var d = "", i;
        for (i = 0; i < 4; i++) d += card(14 + i * 84, 70, 76, 50, "p") + path("M" + (52 + i * 84) + " 126 l-22 40 h44 Z", "fD", { opacity: 0.35 }) + okB(80 + i * 84, 74, 8);
        d += road(196, 14, 346) + G("", [0, 1, 2].map(function (k) { return rect(96 + k * 84, 186, 26, 20, "fO", { rx: 4 }); }).join("")) + TX(180, 236, "Waiting between steps", 14, "fO") + WK("hg", 20, 190, person(0, 0, 0.7, "O"));
        return s + R("0-0", "f", a) + R("1-1", "f", b) + R("2-2", "f", c) + R("3", "f", d);
      },
      on: function (A) { if (A.k === 3) A.walk(".n-hg", [[20, 190], [330, 190]], 5, { loop: true }); }
    });

    /* V6 · lines 17-20 — ROUTE 3: controls added after incidents; owner + risk test "is the risk live?" and "cheapest control?"; passport: examine, don't remove; comply with less disruption
       Template: https://observablehq.com/@d3/pie-chart-update (two datasets compared by tweening) */
    P.push({
      svg: function () {
        var s = route(3, "incident controls");
        var a = icon("fire", 70, 126, 2) + TX(70, 172, "Past incident", 15, "fO") + arrow(104, 126, 150, 126, "sO", 3) + card(160, 90, 180, 72, "n") + icon("shield", 196, 126, 1.3) + TX(268, 120, "New control", 15, "nh fW") + TX(268, 140, "proposed", 13, "nh fD");
        var b = person(46, 236, 1.2, "G") + person(96, 236, 1.2, "D") + TX(72, 256, "Owner + risk", 13, "fN") +
          card(140, 64, 206, 86, "p") + TX(243, 86, "Risk still live?", 15, "fN") + G("", circ(198, 120, 18, "f0 sO", { "stroke-width": 2 }) + circ(198, 120, 10, "f0 sO", { "stroke-width": 2 })) + G("blink", circ(198, 120, 4, "fO")) + TX(290, 126, "Test it", 14, "fO") +
          card(140, 160, 206, 86, "p") + TX(243, 182, "Cheapest control?", 15, "fN") + chip(196, 216, "Option A", "pm", 13) + chip(290, 216, "Option B", "g", 13);
        var c = road(176, 14, 346) + card(150, 146, 60, 60, "n") + icon("passport", 180, 176, 1.2, "fW") + icon("shield", 214, 140, 1.5) +
          chip(110, 92, "Regulatory inspection", "pm", 13) + G("bob", icon("scissors", 290, 118, 1.6)) + noB(314, 98, 11) + chip(180, 236, "Examine, don't remove", "g", 14);
        var d = road(176, 14, 346) + card(240, 146, 60, 60, "n") + icon("passport", 270, 176, 1.2, "fW") + icon("shield", 304, 140, 1.5) + TX(270, 236, "Same check", 14, "fG");
        var q = ""; for (var i = 0; i < 6; i++) q += circ(224 - i * 22, 176, 7.5, "qd fO dot");
        d += q + TX(110, 140, "Less waiting", 15, "fG") + chip(110, 236, "Compliance kept", "g", 13);
        return s + R("0-0", "f", a) + R("1-1", "f", b) + R("2-2", "f", tag("Qasr evidence", "pm") + c) + R("3", "f", d);
      },
      on: function (A) { A.qa(".qd").forEach(function (d, i) { d.style.opacity = A.k === 3 && i >= 2 ? "0" : "1"; d.style.transitionDelay = (i * 120) + "ms"; }); }
    });

    /* V7 · lines 21-22 — ROUTE 4: boundary changes alter what the process covers; steering group sends them back to phase three, Launch Pad
       Template: https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion (structure grows and is revised) */
    P.push({
      svg: function () {
        var s = route(4, "process boundary");
        var a = rect(40, 90, 170, 120, "fG", { opacity: 0.18, rx: 10 }) + rect(40, 90, 170, 120, "f0 sG", { rx: 10, "stroke-width": 3 }) + TX(125, 150, "Current scope", 15, "fG") +
          WK("bd", 0, 0, rect(40, 90, 170, 120, "f0 sO", { rx: 10, "stroke-width": 3, "stroke-dasharray": "8 6" })) + TX(290, 156, "Wider scope?", 15, "fO") + chip(180, 240, "Alters coverage", "o", 14);
        var b = rect(40, 120, 150, 16, "fS sN", { rx: 5, "stroke-width": 1.5 }) + crowd(60, 112, 4, 36, 0.9, "N") + TX(115, 168, "Steering group", 15, "fN") +
          carrow(196, 120, 250, 70, 282, 110, "sO", 3) + card(234, 116, 100, 64, "o") + TX(284, 142, "Phase 3", 16, "nh fW") + TX(284, 164, "Launch Pad", 14, "nh fW") +
          chip(180, 232, "Renewed scoping", "o", 14);
        return s + R("0-0", "f", a) + R("1", "pop", b);
      },
      on: function (A) { if (A.k === 0) A.walk(".n-bd", [[0, 0], [60, 0], [120, 0]], 1.8, {}); }
    });

    /* V8 · lines 23-24 — PROPOSED routes, not something Qasr already applied; the log stops silent accumulation
       Template: https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP (activity resolves into a verified state) */
    P.push({
      svg: function () {
        var a = "";
        ["1 Minor", "2 End-to-end", "3 Incident", "4 Boundary"].forEach(function (n, j) { a += chip(92 + (j % 2) * 176, 92 + Math.floor(j / 2) * 52, n, "n", 14); });
        a += R("0", "stamp", stampW(180, 196, "PROPOSED ROUTES")) + R("0-0", "up", chip(180, 244, "Not Qasr history", "o", 14));
        var b = icon("book", 70, 150, 3) + TX(70, 214, "Change log", 15, "fN");
        for (var i = 0; i < 8; i++) b += rect(150, 216 - i * 18, 70, 14, i > 4 ? "fM" : "fO", { rx: 3, opacity: i > 4 ? 0.35 : 1 });
        b += line(140, 120, 236, 120, "sG", { "stroke-width": 4 }) + icon("shield", 262, 120, 1.6) + chip(270, 236, "Stops silent pile-up", "g", 14);
        return R("0-0", "f", a) + R("1", "pop", b);
      }
    });

    /* V9 · lines 25-26 — governance doesn't freeze the process; each opportunity gets the right route while benefits stay protected
       Template: https://lottiefiles.com/free-animation/supply-chain-and-logistics-8PtoYRCbiu (items routed to destinations) */
    P.push({
      svg: function () {
        var a = card(30, 70, 140, 140, "pm") + icon("ice", 100, 130, 2.2) + TX(100, 190, "Frozen process", 14, "fM") + noB(160, 76, 12) +
          card(190, 70, 140, 140, "pg") + G("spin", loopRing(260, 134, 34, 5, "sG")) + icon("gear", 260, 134, 1) + TX(260, 190, "Keeps improving", 14, "fG") + okB(320, 76, 12);
        var b = "";
        ["Route 1", "Route 2", "Route 3", "Route 4"].forEach(function (r, j) { b += chip(250, 74 + j * 40, r, "n", 13) + line(176, 150, 214, 74 + j * 40, "sM", { "stroke-width": 2 }); });
        b += WK("op", 40, 150, icon("bulb", 0, 0, 1.4)) + TX(70, 196, "New opportunity", 14, "fD") + card(296, 222, 52, 30, "g", { rx: 6 }) + TX(180, 246, "Benefits protected", 14, "fG") + icon("shield", 322, 236, 0.8, "fW");
        return R("0-0", "f", a) + R("1", "f", b);
      },
      on: function (A) { if (A.k >= 1) A.walk(".n-op", [[40, 150], [176, 150], [214, 114], [218, 114]], 2.4, { loop: true }); }
    });

    define({
      id: "W14O3b", kicker: "GOVERN CHANGES", aria: "Proportionate change governance: four distinct proposed routes with their own approvers and evidence, from owner-approved logged minor changes to steering-group review and phase three scoping.",
      panels: P,
      lines: [
        [0, 0, "The owner's loop"], [0, 1, "Avoid bureaucracy"], [0, 2, "Flexibility with accountability"],
        [1, 0, "Four separate approvals"], [1, 1, "13 of 15 minutes"], [1, 2, "Each had reasons"], [1, 3, "Journey left unprotected"],
        [2, 0, "Who, what, when"], [2, 1, "Scrutiny fits significance"],
        [3, 0, "Route 1: minor"], [3, 1, "Owner decides, logs"], [3, 2, "No committee needed"], [3, 3, "Quarterly: small adds up"],
        [4, 0, "Route 2: end-to-end"], [4, 1, "Functions model effect"], [4, 2, "Estimate before acting"], [4, 3, "Hidden guest waiting"],
        [5, 0, "Route 3: incident controls"], [5, 1, "Risk live? Cheapest?"], [5, 2, "Examine, don't remove"], [5, 3, "Comply with less disruption"],
        [6, 0, "Route 4: boundary"], [6, 1, "Steering group, phase three"],
        [7, 0, "Proposed, not history"], [7, 1, "Stop silent accumulation"],
        [8, 0, "Don't freeze it"], [8, 1, "Right route, benefits kept"]
      ]
    });
  })();

  /* ==================================================================
     W14O3d · ONE INTERVENTION, FOUR CANDIDATES, ONE DEFENSIBLE CHOICE  (audit 2.9/10)
     29 lines -> 9 visuals. An evidence-weighted comparison replaces the
     key-and-lock: each candidate is tested against what Exhibit 14 shows;
     the choice is "most defensible", never "guaranteed", and stays PROPOSED.
     ================================================================== */
  (function () {
    var P = [];
    function stampW(x, y, txt, v, rot) { var w = tw(txt, 15) + 26; return G("", rect(x - w / 2, y - 15, w, 30, "f0 " + (v || "sO"), { rx: 6, "stroke-width": 3 }) + TX(x, y + 5.5, txt, 15, "nh " + (v === "sG" ? "fG" : "fO")), { transform: "rotate(" + (rot === undefined ? -7 : rot) + " " + x + " " + y + ")" }); }
    function meter(x, y, w, f, c) { return rect(x, y, w, 12, "fL sM", { rx: 6, "stroke-width": 1 }) + (f > 0 ? rect(x, y, w * f, 12, c || "fG", { rx: 6 }) : ""); }
    var CAND = [["Renew training", "person"], ["Remove steps", "scissors"], ["More reporting", "chart"], ["Restore ownership", "key"]];

    /* V1 · lines 0-2 — what we found; leadership can fund one priority; two rules: no invented causes, respect requirements
       Template: https://lottiefiles.com/free-animation/project-dashboard-PeJUc2p1iB (analysis board with people) */
    P.push({
      svg: function () {
        var a = card(14, 40, 332, 210, "p");
        [["39 minutes", 96, 92], ["48% kiosk", 264, 92], ["+13 of 15", 96, 188], ["No owner", 264, 188]].forEach(function (e) {
          a += R("0", "pop", card(e[1] - 70, e[2] - 34, 140, 68, "po") + icon("pin", e[1] - 52, e[2] - 30, 0.7) + TX(e[1] + 6, e[2] + 8, e[0], 18, "fO"));
        });
        var b = rect(60, 196, 240, 16, "fS sN", { rx: 6, "stroke-width": 1.5 }) + crowd(110, 190, 3, 70, 1.1, "N") + rect(150, 120, 60, 44, "f0 sG", { rx: 6, "stroke-width": 3, "stroke-dasharray": "6 4" }) +
          TX(180, 148, "1", 22, "fG") + chip(180, 92, "One priority only", "g", 14);
        for (var i = 0; i < 4; i++) b += G("bob", card(20 + i * 86, 40, 62, 40, "n") + TX(51 + i * 86, 66, "?", 18, "nh fW"));
        var c = card(14, 60, 332, 70, "po") + icon("pin", 46, 92, 1) + TX(76, 102, "No invented causes", 18, "fO s") +
          card(14, 150, 332, 70, "pg") + icon("shield", 46, 184, 1.3) + TX(76, 192, "Respect requirements", 18, "fG s");
        return R("0-0", "f", a) + R("1-1", "f", b) + R("2", "pop", c);
      }
    });

    /* V2 · lines 3-6 — the evidence: 24 -> 39 (kept MATCH); kiosk 65 -> 48; +13 of 15; owner gone while reports continue
       Template: https://observablehq.com/@d3/stacked-to-grouped-bars (same marks regrouped per question) */
    P.push({
      svg: function () {
        var a = bars({ x: 60, base: 232, h: 150, max: 42, bw: 70, gap: 60, fs: 26, items: [{ v: 24, l: "Month 5", r: "0", c: "fG" }, { v: 39, l: "Month 22", r: "0", c: "fO" }] }) + TX(165, 56, "Arrival minutes", 15, "fN");
        var b = bars({ x: 60, base: 232, h: 150, max: 70, bw: 70, gap: 60, fs: 26, items: [{ v: 65, t: "65%", l: "Month 5", r: "1", c: "fG" }, { v: 48, t: "48%", l: "Month 22", r: "1", c: "fO" }] }) + TX(165, 56, "Kiosk adoption", 15, "fN");
        var c = rect(30, 120, 13 * 18, 50, "fO", { rx: 8 }) + TX(30 + 117, 152, "+13 four changes", 17, "nh fW") + rect(268, 120, 36, 50, "fM", { rx: 6 }) + TX(286, 152, "+2", 16, "nh fW") +
          TX(180, 96, "15 extra minutes", 16, "fN") + TX(286, 194, "not explained", 13, "fM");
        var d = chair(96, 222, 1.6, "M") + TX(96, 248, "No dedicated owner", 14, "fO") + person(262, 210, 1.4, "G") + rect(222, 210, 84, 10, "fN", { rx: 3 }) + TX(262, 240, "Reports continue", 14, "fG");
        for (var i = 0; i < 4; i++) d += doc(236 + i * 6, 90 - i * 6 + 30, 34, 40, "fW sN", 2);
        return tag("Qasr evidence", "pm") + R("0-0", "f", a) + R("1-1", "f", b) + R("2-2", "gx", c) + R("3", "f", d);
      }
    });

    /* V3 · lines 7-8 — a decision exercise, not approved actions; the four candidates turn over
       Template: https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design (cards flip between states) */
    P.push({
      svg: function () {
        var s = chip(180, 52, "Decision exercise", "n", 15);
        CAND.forEach(function (c, j) {
          var x = 14 + (j % 2) * 172, y = 76 + Math.floor(j / 2) * 92;
          s += R("0-0", "f", card(x, y, 160, 80, "n") + TX(x + 80, y + 48, "?", 26, "nh fW"));
          var w2 = c[0].split(" ");
          s += R("1", "pop", card(x, y, 160, 80, j === 3 ? "pg" : "p") + (c[1] === "person" ? person(x + 30, y + 58, 0.9, "N") : icon(c[1], x + 30, y + 40, 1.1)) + TX(x + 58, y + 38, w2[0], 15, "fN s") + TX(x + 58, y + 58, w2[1], 15, "fN s"));
        });
        s += R("0-0", "up", chip(180, 254, "Not approved by Qasr", "po", 14));
        return s;
      }
    });

    /* V4 · lines 9-12 — test 1: training has no evidence of a knowledge cause; test 2: removing steps tempts, but passport is regulatory
       Template: https://motionarray.com/after-effects-templates/infographics-pack-135055/ (callouts + meters) */
    P.push({
      svg: function () {
        var a = card(14, 40, 332, 104, "p") + person(42, 104, 1, "N") + TX(66, 70, "Renew training", 16, "fN s") +
          R("0-0", "f", TX(66, 96, "Knowledge evidence", 13, "fM s") + meter(66, 106, 180, 0) + TX(252, 117, "none shown", 13, "fO s"));
        a += R("1", "stamp", stampW(196, 110, "ASSUMED CAUSE", "sO", -4));
        var b = card(14, 152, 332, 104, "p") + icon("scissors", 42, 190, 1.1) + TX(66, 180, "Remove steps", 16, "fN s") +
          TX(66, 206, "Explains minutes", 13, "fM s") + meter(66, 216, 180, 13 / 15, "fD") + TX(256, 227, "13 of 15", 14, "fD s");
        b += R("3", "pop", card(196, 160, 144, 40, "g") + icon("shield", 216, 180, 0.9, "fW") + TX(282, 186, "Regulatory duty", 13, "nh fW"));
        return tag("Evidence test", "pm") + R("0", "l", a) + R("2", "l", b);
      }
    });

    /* V5 · lines 13-16 — test 3: reporting already exists, discussion stopped; test 4: ownership fills the documented gap and anchors the rest
       Template: https://lottiefiles.com/free-animation/3d-statistics-factory-lRiHNeU9Y4 (equipment staged, output emphasised) */
    P.push({
      svg: function () {
        var a = card(14, 40, 332, 104, "p") + icon("chart", 42, 76, 1.1) + TX(66, 70, "More reporting", 16, "fN s");
        for (var i = 0; i < 5; i++) a += R("0", "pop", doc(74 + i * 26, 88, 22, 28, "fW sN", 2));
        a += R("0-0", "up", TX(318, 112, "Already monthly", 14, "fG e"));
        a += R("1", "up", rect(212, 82, 110, 10, "fS sN", { rx: 3 }) + chair(232, 130, 0.65, "M") + chair(268, 130, 0.65, "M") + chair(304, 130, 0.65, "M") + TX(268, 141, "Discussion stopped", 13, "fO"));
        var b = card(14, 152, 332, 104, "pg") + icon("key", 42, 186, 1.1) + TX(66, 180, "Restore ownership", 16, "fG s") +
          TX(66, 206, "Documented gap", 13, "fM s") + meter(66, 216, 180, 1, "fG") + okB(326, 172, 11);
        var c = card(14, 152, 332, 104, "g") + person(52, 238, 1.3, "W") + TX(66, 168, "Named owner", 13, "nh fW");
        ["Organise reviews", "Investigate adoption", "Evaluate changes"].forEach(function (t, j) { c += R("3", "l", TX(96, 190 + j * 24, "• " + t, 15, "nh fW s")); });
        return R("0-3", "f", a) + R("2-2", "l", b) + R("3", "pop", c);
      }
    });

    /* V6 · lines 17-18 — most defensible, but not guaranteed to restore arrival time; it builds the capacity to diagnose
       Template: https://observablehq.com/@d3/arc-tween (value tweened to a new angle) */
    P.push({
      svg: function () {
        var a = "", sc = [0.15, 0.45, 0.2, 0.9];
        CAND.forEach(function (c, j) {
          var y = 66 + j * 34;
          a += TX(20, y + 6, c[0], 14, (j === 3 ? "fG" : "fN") + " s") + R("0", "gx", rect(160, y - 8, 150 * sc[j], 18, j === 3 ? "fG" : "fM", { rx: 5 }));
        });
        a += chip(234, 46, "Evidence fit", "pm", 13) + R("0", "pop", chip(250, 214, "Most defensible", "g", 14));
        a += line(24, 240, 140, 240, "sN", { "stroke-width": 2 }) + path("M24 200 L80 206 L140 220", "sO f0", { "stroke-width": 3 }) + path("M140 220 C170 228 190 214 214 208", "sM f0", { "stroke-width": 3, "stroke-dasharray": "5 5" }) + TX(84, 196, "Not guaranteed", 13, "fM");
        var b = person(66, 206, 1.8, "G") + icon("wrench", 104, 150, 1.2, "sG") + icon("mag", 100, 112, 1) + TX(82, 240, "Owner diagnoses", 14, "fG");
        ["Next fix A", "Next fix B", "Next fix C"].forEach(function (t, j) { b += R("1", "l", arrow(130, 160, 196, 84 + j * 56, "sG", 2.6) + chip(266, 84 + j * 56, t, j === 1 ? "g" : "pg", 14)); });
        return R("0-0", "f", a) + R("1", "f", b + chip(266, 252, "Chosen on evidence", "g", 13));
      }
    });

    /* V7 · lines 19-22 — making it operational: authority across 14 properties; a recurring review; test the four changes together; 13 explained vs 2 open
       Template: https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy (hub connected to many sites) */
    P.push({
      svg: function () {
        var a = person(180, 172, 1.6, "G") + icon("key", 180, 104, 1.1), i, ang, x, y;
        for (i = 0; i < 14; i++) { ang = (i / 14) * Math.PI * 2 - Math.PI / 2; x = 180 + 150 * Math.cos(ang); y = 146 + 84 * Math.sin(ang); a += line(180, 140, x, y - 14, "sG", { "stroke-width": 1.4, opacity: 0.6 }) + R("0", "pop", hotel(x, y, 0.85, "fN")); }
        a += chip(180, 252, "Authority across 14", "g", 14);
        var b = "";
        for (i = 0; i < 6; i++) b += cal(56 + i * 50, 92, 1, "fG") + tick(56 + i * 50, 120, 0.6, "sG");
        b += rect(110, 170, 140, 14, "fS sN", { rx: 5 }) + crowd(130, 164, 3, 50, 0.9, "N") + G("wob", icon("bell", 300, 176, 1.1, "fO")) + TX(300, 214, "Trigger hit", 13, "fO") + chip(180, 238, "Recurring review meeting", "g", 14);
        var c = rect(20, 168, 320, 14, "fN", { rx: 4 });
        ["passport", "coin", "star", "desk"].forEach(function (ic, j) { c += card(32 + j * 78, 104, 62, 60, "p") + icon(ic, 63 + j * 78, 134, 1.1); });
        c += icon("shield", 82, 104, 1) + chip(180, 214, "Test combined effect", "o", 14) + TX(180, 82, "Respect regulation", 14, "fG");
        var d = rect(24, 110, 13 * 20, 50, "fO", { rx: 8 }) + TX(24 + 130, 142, "13 explained", 18, "nh fW") + rect(288, 110, 40, 50, "fM", { rx: 6 }) + TX(308, 142, "2", 18, "nh fW") +
          TX(308, 186, "needs", 13, "fM") + TX(308, 202, "evidence", 13, "fM") + chip(150, 196, "Examine together", "o", 13);
        return tag("Proposed plan", "po") + R("0-0", "f", a) + R("1-1", "f", b) + R("2-2", "up", c) + R("3", "f", d);
      }
    });

    /* V8 · lines 23-24 — investigate kiosk decline without assuming resistance; measure afterwards to see if it worked
       Template: https://observablehq.com/@d3/animated-quadtree (space split into candidate regions) */
    P.push({
      svg: function () {
        var a = card(14, 70, 110, 120, "po") + icon("kiosk", 69, 116, 1.8) + TX(69, 172, "65% → 48%", 15, "fO");
        [["Kiosk usability?", 80], ["Guest choice?", 126], ["Process design?", 172]].forEach(function (q, j) { a += arrow(128, 130, 180, q[1], "sM", 2.4) + R("0", "l", chip(256, q[1], q[0], "pm", 14)); });
        a += chip(180, 236, "Resistance assumed", "po", 14) + strike(100, 236, 260, 236) + TX(180, 54, "Possible mechanisms", 14, "fM");
        var b = line(30, 220, 330, 220, "sN", { "stroke-width": 2 }) + rect(60, 220 - 39 * 3.6, 64, 39 * 3.6, "fO", { rx: 5 }) + TX(92, 220 - 39 * 3.6 - 8, "39", 20, "fO") + TX(92, 240, "Before action", 14, "fN") +
          rect(196, 120, 64, 100, "f0 sM", { rx: 5, "stroke-width": 2.6, "stroke-dasharray": "6 5" }) + TX(228, 178, "?", 30, "fM") + TX(228, 240, "After action", 14, "fN") +
          arrow(134, 160, 184, 160, "sG", 3) + G("bob", icon("chart", 304, 120, 1.6)) + chip(296, 176, "Measure it", "g", 14);
        return R("0-0", "f", a) + R("1", "pop", b);
      }
    });

    /* V9 · lines 25-28 — capability over one quick fix; ready for future changes; the PROPOSED choice; next: continuous improvement
       Template: https://lottiefiles.com/free-animation/automated-workflows-XR2hxXOdEK (action repeats, then completes) */
    P.push({
      svg: function () {
        var a = card(10, 50, 160, 190, "pm") + icon("wrench", 90, 132, 2.2) + TX(90, 200, "One quick fix", 15, "fM") +
          card(190, 50, 160, 190, "pg") + G("spin", loopRing(270, 132, 40, 6, "sG")) + person(270, 150, 1, "G") + TX(270, 200, "Management capability", 13, "fG") + okB(334, 60, 11);
        var b = "";
        for (var i = 0; i < 4; i++) b += WK("fc" + i, 20, 80 + i * 40, card(-18, -14, 36, 28, i % 2 ? "o" : "d", { rx: 5 }));
        b += path("M200 70 h120 l-40 70 v70 h-40 v-70 Z", "fL sN", { "stroke-width": 2 }) + TX(260, 104, "Governance routes", 14, "fN") + TX(260, 236, "Properly routed", 14, "fG") + TX(80, 236, "Future changes", 14, "fO");
        var c = card(30, 50, 300, 196, "pg") + TX(180, 78, "Our recommendation", 16, "fG");
        ["Restore dedicated ownership", "With real authority", "Regular review", "Proportionate governance"].forEach(function (t, j) {
          c += R("2", "l", okB(58, 110 + j * 32, 10) + TX(76, 115 + j * 32, t, 15, "fN s"));
        });
        c += R("2", "stamp", stampW(268, 236, "PROPOSED"));
        var d = "";
        [["Arrival", 62], ["Next", 180], ["Another", 298]].forEach(function (p, j) { d += card(p[1] - 54, 84, 108, 120, "p") + G(j % 2 ? "spinr" : "spin", loopRing(p[1], 128, 24, 4, "sG")) + TX(p[1], 176, p[0], 14, "fN") + TX(p[1], 194, "process", 14, "fN"); });
        d += chip(180, 236, "Keep improving", "g", 15);
        return R("0-0", "f", a) + R("1-1", "f", b) + R("2-2", "pop", c) + R("3", "up", d);
      },
      on: function (A) {
        if (A.k === 1) for (var i = 0; i < 4; i++) A.walk(".n-fc" + i, [[20, 80 + i * 40], [200, 100], [260, 150], [260, 210]], 3.2, { loop: true, offset: i * 0.8 });
      }
    });

    define({
      id: "W14O3d", kicker: "DEFENSIBLE CHOICE", aria: "Four candidate interventions are tested against the Qasr evidence; restoring dedicated ownership is the most defensible proposed priority, with authority, regular review and proportionate governance, but no guaranteed outcome.",
      panels: P,
      lines: [
        [0, 0, "What we found"], [0, 1, "One priority only"], [0, 2, "Evidence and requirements"],
        [1, 0, "Arrival: 24 → 39"], [1, 1, "Kiosk: 65 → 48"], [1, 2, "13 of 15 minutes"], [1, 3, "Owner gone, reports continue"],
        [2, 0, "Exercise, not approved"], [2, 1, "Four candidates"],
        [3, 0, "Training: no evidence"], [3, 1, "Undemonstrated cause"], [3, 2, "Removing steps tempts"], [3, 3, "Passport is regulatory"],
        [4, 0, "Reports already monthly"], [4, 1, "Discussion stopped"], [4, 2, "Ownership fills gap"], [4, 3, "Owner's three tasks"],
        [5, 0, "Defensible, not guaranteed"], [5, 1, "Capacity to diagnose"],
        [6, 0, "Authority across properties"], [6, 1, "Recurring review meeting"], [6, 2, "Test combined effect"], [6, 3, "13 explained, 2 open"],
        [7, 0, "Investigate adoption causes"], [7, 1, "Measure the result"],
        [8, 0, "Capability over quick fix"], [8, 1, "Ready for future changes"], [8, 2, "Our proposed choice"], [8, 3, "Next: keep improving"]
      ]
    });
  })();

})();
// END FILE: w14-claude-v2-part3.js

// FILE: w14-claude-v2-part4.js
// OPER621 · Business Process Management · Week 14 · The Sustainable Performance Phase
// Animated teaching scenes — Claude v2 rebuild — PART 4 of 4 — sections: W14O1a, W14O2d, W14O1b
// Highest of the low: W14O1a (3.2), W14O2d (3.3), W14O1b (4.1) (GPT-6 content audit).
//
// CONTRACT (unchanged): window.VL_SCENES = window.VL_SCENES || {};
//   VL_SCENES['<secId>'] = { build(el), step(i, n), reset() }
// - Standalone: defines every helper it uses, registers its own scenes and appends its own
//   rules, scoped under .vls-w14-<secId>, to the single <style id="vl-sc-w14">.
// - One narration line = one explicit visual state. Each section is a sequence of 8-11
//   distinct visuals (a new visual every 2-4 lines); every line has its own 2-4 word caption.
// - step(i, n): when n equals the section's narration count, line i maps 1:1; otherwise it
//   is mapped proportionally. State is re-derived on every call, so seeking is safe.
// - window.gsap is used for pop/shake flourishes when present; a built-in rAF tween engine
//   and CSS transitions/keyframes are used otherwise.
// - prefers-reduced-motion: every state is applied instantly, no loops or keyframes.
// - Stage: 360 x 300 viewBox (meet), full-bleed paper background; the figure fills a phone
//   strip above the text or the left 60% on a laptop. Text is never smaller than 13 px.
// - Qasr figures only as documented in Exhibit 14; proposals and illustrations are labelled.
// - Original code: no part of the live scenes or of the previous Claude edition is reused.
(function () {
  "use strict";
  var PART = "p4";
  var IDS = ["W14O1a", "W14O2d", "W14O1b"];
  /* ==================================================================
     ENGINE (self-contained; every helper used by the scenes is defined here)
     ================================================================== */
  var W = window, NS = "http://www.w3.org/2000/svg", STYLE_ID = "vl-sc-w14";
  window.VL_SCENES = window.VL_SCENES || {};
  var VL = window.VL_SCENES;
  var KF = "vlsW14v2" + PART;            /* keyframe prefix, unique per part */
  var SEC_CSS = [];

  function esc(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fin(v, d) { v = Number(v); return isFinite(v) ? v : (d === undefined ? 0 : d); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function r1(v) { return Math.round(v * 10) / 10; }
  function reduced() {
    try { return !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    catch (e) { return false; }
  }
  function gsapLib() {
    var g = W.gsap;
    return g && typeof g.to === "function" && typeof g.fromTo === "function" ? g : null;
  }
  function now() { return (W.performance && W.performance.now) ? W.performance.now() : Date.now(); }
  var RAF = (W.requestAnimationFrame && W.requestAnimationFrame.bind(W)) || function (f) { return setTimeout(function () { f(now()); }, 16); };
  var CAF = (W.cancelAnimationFrame && W.cancelAnimationFrame.bind(W)) || clearTimeout;
  var EASE = {
    lin: function (t) { return t; },
    io: function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; },
    out: function (t) { return 1 - Math.pow(1 - t, 3); },
    back: function (t) { var c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }
  };

  /* ---------- SVG string builders ---------- */
  function at(o) {
    var s = "", k, v;
    for (k in o) {
      if (!Object.prototype.hasOwnProperty.call(o, k)) continue;
      v = o[k];
      if (v === undefined || v === null || v === false) continue;
      s += " " + (k === "c" ? "class" : k) + '="' + esc(typeof v === "number" ? r1(v) : v) + '"';
    }
    return s;
  }
  function E(tag, o, inner) { return "<" + tag + at(o || {}) + ">" + (inner || "") + "</" + tag + ">"; }
  function G(c, inner, o) { o = o || {}; if (c) o.c = c; return E("g", o, inner); }
  function rect(x, y, w, h, c, o) { o = o || {}; o.x = x; o.y = y; o.width = Math.max(0, w); o.height = Math.max(0, h); if (c) o.c = c; return E("rect", o); }
  function circ(x, y, r, c, o) { o = o || {}; o.cx = x; o.cy = y; o.r = Math.max(0, r); if (c) o.c = c; return E("circle", o); }
  function line(x1, y1, x2, y2, c, o) { o = o || {}; o.x1 = x1; o.y1 = y1; o.x2 = x2; o.y2 = y2; if (c) o.c = c; return E("line", o); }
  function path(d, c, o) { o = o || {}; o.d = d; if (c) o.c = c; return E("path", o); }
  function T(x, y, s, c, o) { o = o || {}; o.x = x; o.y = y; o.c = "tx " + (c || "t14"); return E("text", o, esc(s)); }
  /* reveal group: visible for k in range r ("2" = from 2 on, "1-3" = 1..3) */
  function R(r, fx, inner) { return '<g class="rv" data-r="' + r + '" data-fx="' + (fx || "f") + '">' + inner + "</g>"; }
  /* movable group, positioned by CSS transform (never by the transform attribute) */
  function M(n, x, y, inner, cls) {
    return '<g class="' + (cls || "mv") + " n-" + n + '" style="transform:translate(' + r1(x) + "px," + r1(y) + 'px)">' + inner + "</g>";
  }
  function WK(n, x, y, inner) { return M(n, x, y, inner, "wk"); }
  function tw(s, fs) {
    var w = 0, i, ch; s = String(s);
    for (i = 0; i < s.length; i++) {
      ch = s.charAt(i);
      w += /[A-Z%]/.test(ch) ? 0.7 : /[0-9]/.test(ch) ? 0.6 : /[mwMW]/.test(ch) ? 0.88 : /[il.,:;'|!\s]/.test(ch) ? 0.3 : /[ftjr]/.test(ch) ? 0.42 : 0.58;
    }
    return w * fs * 1.12;
  }
  var CHIP = {
    n: ["fN", "fW"], o: ["fO", "fW"], g: ["fG", "fW"], d: ["fD", "fI"], m: ["fM", "fW"], i: ["fI", "fW"],
    p: ["fP sN", "fN"], po: ["fP sO", "fO"], pg: ["fP sG", "fG"], pm: ["fP sM", "fM"], l: ["fL sN", "fN"]
  };
  function chipW(s, fs) { fs = fs || 14; return tw(s, fs) + fs * 1.5; }
  function chip(x, y, s, v, fs, o) {
    var k = CHIP[v || "p"]; fs = fs || 14;
    var w = chipW(s, fs), h = fs * 1.85;
    return G("", rect(x - w / 2, y - h / 2, w, h, k[0], { rx: h / 2, "stroke-width": 1.8 }) +
      T(x, y + fs * 0.36, s, "nh " + k[1], { style: "font-size:" + fs + "px" }), o);
  }
  function card(x, y, w, h, v, o) { var k = CHIP[v || "p"]; o = o || {}; o.rx = o.rx || 10; o["stroke-width"] = o["stroke-width"] || 1.8; return rect(x, y, w, h, k[0], o); }
  function fsz(n) { return { style: "font-size:" + n + "px" }; }
  function TX(x, y, s, n, c, o) { o = o || {}; o.style = "font-size:" + n + "px" + (o.style ? ";" + o.style : ""); return T(x, y, s, c || "fI", o); }
  function arrow(x1, y1, x2, y2, c, w) {
    c = c || "sN"; w = w || 3;
    var a = Math.atan2(y2 - y1, x2 - x1), h = w * 3.1;
    var bx = x2 - h * Math.cos(a), by = y2 - h * Math.sin(a), px = -Math.sin(a) * h * 0.62, py = Math.cos(a) * h * 0.62;
    return line(x1, y1, bx, by, c, { "stroke-width": w, "stroke-linecap": "round" }) +
      path("M" + r1(x2) + " " + r1(y2) + " L" + r1(bx + px) + " " + r1(by + py) + " L" + r1(bx - px) + " " + r1(by - py) + " Z", c.replace(/s([A-Z])/, "f$1"));
  }
  function carrow(x1, y1, cx, cy, x2, y2, c, w, dash) {
    c = c || "sN"; w = w || 3;
    var a = Math.atan2(y2 - cy, x2 - cx), h = w * 3.1;
    var bx = x2 - h * Math.cos(a), by = y2 - h * Math.sin(a), px = -Math.sin(a) * h * 0.62, py = Math.cos(a) * h * 0.62;
    return path("M" + r1(x1) + " " + r1(y1) + " Q" + r1(cx) + " " + r1(cy) + " " + r1(bx) + " " + r1(by), c + " f0" + (dash ? " flowd" : ""), { "stroke-width": w, "stroke-linecap": "round" }) +
      path("M" + r1(x2) + " " + r1(y2) + " L" + r1(bx + px) + " " + r1(by + py) + " L" + r1(bx - px) + " " + r1(by - py) + " Z", c.replace(/s([A-Z])/, "f$1"));
  }
  function tick(x, y, s, c) {
    return path("M" + r1(x - 6 * s) + " " + r1(y) + " l" + r1(4 * s) + " " + r1(4.6 * s) + " l" + r1(8.5 * s) + " " + r1(-9.5 * s), (c || "sW") + " f0",
      { "stroke-width": Math.max(2.2, 2.7 * s), "stroke-linecap": "round", "stroke-linejoin": "round" });
  }
  function cross(x, y, s, c) {
    return path("M" + r1(x - 5 * s) + " " + r1(y - 5 * s) + " l" + r1(10 * s) + " " + r1(10 * s) + " M" + r1(x + 5 * s) + " " + r1(y - 5 * s) + " l" + r1(-10 * s) + " " + r1(10 * s),
      (c || "sW") + " f0", { "stroke-width": Math.max(2.2, 2.7 * s), "stroke-linecap": "round" });
  }
  function okB(x, y, r) { return circ(x, y, r, "fG") + tick(x, y + r * 0.08, r / 9.5); }
  function noB(x, y, r) { return circ(x, y, r, "fO") + cross(x, y, r / 10.5); }
  function qB(x, y, r) { var f = Math.max(13, r * 1.3); return circ(x, y, Math.max(r, 9.5), "fM") + TX(x, y + f * 0.36, "?", f, "nh fW"); }
  function strike(x1, y1, x2, y2) { return line(x1, y1, x2, y2, "sO", { "stroke-width": 5, "stroke-linecap": "round", opacity: 0.92 }); }
  function person(x, y, s, col, o) {
    s = s || 1; col = col || "N"; o = o || {};
    var h = path("M" + r1(x - 12 * s) + " " + r1(y) + " C" + r1(x - 12 * s) + " " + r1(y - 23 * s) + " " + r1(x + 12 * s) + " " + r1(y - 23 * s) + " " + r1(x + 12 * s) + " " + r1(y) + " Z", "f" + col);
    h += circ(x, y - 27 * s, 8.5 * s, "f" + col);
    if (o.clip) h += rect(x + 5 * s, y - 15 * s, 10 * s, 13 * s, "fW sN", { rx: 1.5, "stroke-width": 1.3 });
    if (o.tie) h += path("M" + r1(x) + " " + r1(y - 17 * s) + " l" + r1(-2.5 * s) + " " + r1(5 * s) + " l" + r1(2.5 * s) + " " + r1(7 * s) + " l" + r1(2.5 * s) + " " + r1(-7 * s) + " Z", "fO");
    if (o.ghost) h = G("ghost", h);
    return h;
  }
  function crowd(x, y, n, gap, s, col) { var h = "", i; for (i = 0; i < n; i++) h += person(x + i * gap, y, s, col); return h; }
  function chair(x, y, s, c) {
    s = s || 1; c = c || "N";
    return rect(x - 13 * s, y - 38 * s, 6 * s, 38 * s, "f" + c, { rx: 2 }) + rect(x - 13 * s, y - 16 * s, 28 * s, 6 * s, "f" + c, { rx: 2 }) +
      rect(x + 10 * s, y - 10 * s, 4.5 * s, 10 * s, "f" + c) + rect(x - 9 * s, y - 10 * s, 4.5 * s, 10 * s, "f" + c);
  }
  function doc(x, y, w, h, c, n, lc) {
    var f = Math.min(10, w * 0.25), s, i;
    s = path("M" + r1(x) + " " + r1(y) + " h" + r1(w - f) + " l" + r1(f) + " " + r1(f) + " v" + r1(h - f) + " h" + r1(-w) + " Z", c || "fW sN", { "stroke-width": 1.6 });
    for (i = 0; i < (n === undefined ? 3 : n); i++)
      s += line(x + w * 0.16, y + h * 0.32 + i * h * 0.18, x + w * (i % 2 ? 0.64 : 0.82), y + h * 0.32 + i * h * 0.18, lc || "sM", { "stroke-width": 2, "stroke-linecap": "round" });
    return s;
  }
  function cal(x, y, s, head, txt, tc) {
    var w = 36 * s, h = 36 * s;
    return rect(x - w / 2, y - h / 2, w, h, "fW sN", { rx: 4 * s, "stroke-width": 1.6 }) + rect(x - w / 2, y - h / 2, w, 10 * s, head || "fO", { rx: 3 * s }) +
      rect(x - w / 2, y - h / 2 + 6 * s, w, 4 * s, head || "fO") + (txt ? TX(x, y + 11 * s, txt, 15 * s, "nh " + (tc || "fN")) : "");
  }
  function hotel(x, y, s, c, mark) {
    var w = 24 * s, h = 30 * s, i, j, out = rect(x - w / 2, y - h, w, h, c || "fN", { rx: 2 });
    for (i = 0; i < 3; i++) for (j = 0; j < 2; j++) out += rect(x - w / 2 + 4 * s + j * 10 * s, y - h + 4 * s + i * 7.5 * s, 6 * s, 4.5 * s, "fW", { opacity: 0.85 });
    out += rect(x - 3 * s, y - 6 * s, 6 * s, 6 * s, "fD");
    if (mark) out += circ(x + w / 2, y - h, 6.5 * s, mark === "o" ? "fO" : "fG") + (mark === "o" ? "" : tick(x + w / 2, y - h + 0.5, 0.5 * s));
    return out;
  }
  function gearP(cx, cy, r, teeth) {
    var d = "", i, n = teeth || 8, a, a2, ro = r, ri = r * 0.78;
    for (i = 0; i < n; i++) {
      a = i / n * Math.PI * 2; a2 = (i + 0.5) / n * Math.PI * 2;
      d += (i ? "L" : "M") + r1(cx + ro * Math.cos(a - 0.18)) + " " + r1(cy + ro * Math.sin(a - 0.18)) + " L" + r1(cx + ro * Math.cos(a + 0.18)) + " " + r1(cy + ro * Math.sin(a + 0.18)) +
        " L" + r1(cx + ri * Math.cos(a2 - 0.2)) + " " + r1(cy + ri * Math.sin(a2 - 0.2)) + " L" + r1(cx + ri * Math.cos(a2 + 0.2)) + " " + r1(cy + ri * Math.sin(a2 + 0.2));
    }
    return d + " Z";
  }
  function gear(cx, cy, r, c, cls) { return G(cls || "", path(gearP(cx, cy, r, Math.max(6, Math.round(r / 2.6))), c || "fN") + circ(cx, cy, r * 0.32, "fP")); }
  /* small pictograms centred on x,y (about 26*s wide) */
  function icon(n, x, y, s, c) {
    s = s || 1; var h = "";
    switch (n) {
      case "passport": h = rect(x - 9 * s, y - 12 * s, 18 * s, 24 * s, c || "fN", { rx: 2.5 }) + circ(x, y - 2 * s, 5 * s, "f0 sD", { "stroke-width": 1.6 }) + line(x - 5 * s, y + 7 * s, x + 5 * s, y + 7 * s, "sD", { "stroke-width": 1.6 }); break;
      case "coin": h = circ(x, y, 11 * s, c || "fD") + circ(x, y, 7.5 * s, "f0 sW", { "stroke-width": 1.6 }) + rect(x - 1.6 * s, y - 5 * s, 3.2 * s, 10 * s, "fW", { rx: 1 }); break;
      case "star": h = path("M" + r1(x) + " " + r1(y - 12 * s) + " l" + r1(3.5 * s) + " " + r1(7.5 * s) + " l" + r1(8 * s) + " " + r1(0.8 * s) + " l" + r1(-6 * s) + " " + r1(5.5 * s) + " l" + r1(1.8 * s) + " " + r1(8 * s) + " l" + r1(-7.3 * s) + " " + r1(-4.2 * s) + " l" + r1(-7.3 * s) + " " + r1(4.2 * s) + " l" + r1(1.8 * s) + " " + r1(-8 * s) + " l" + r1(-6 * s) + " " + r1(-5.5 * s) + " l" + r1(8 * s) + " " + r1(-0.8 * s) + " Z", c || "fD"); break;
      case "desk": h = rect(x - 13 * s, y - 2 * s, 26 * s, 5 * s, c || "fN", { rx: 1.5 }) + rect(x - 11 * s, y + 3 * s, 4 * s, 9 * s, c || "fN") + rect(x + 7 * s, y + 3 * s, 4 * s, 9 * s, c || "fN") + circ(x, y - 11 * s, 4.5 * s, "fO") + path("M" + r1(x - 7 * s) + " " + r1(y - 2 * s) + " q" + r1(7 * s) + " " + r1(-9 * s) + " " + r1(14 * s) + " 0", "fO"); break;
      case "kiosk": h = rect(x - 8 * s, y - 13 * s, 16 * s, 22 * s, c || "fN", { rx: 2.5 }) + rect(x - 5.5 * s, y - 10 * s, 11 * s, 9 * s, "fB") + rect(x - 3 * s, y + 9 * s, 6 * s, 4 * s, c || "fN"); break;
      case "shield": h = path("M" + r1(x) + " " + r1(y - 12 * s) + " l" + r1(10 * s) + " " + r1(4 * s) + " v" + r1(6 * s) + " c0 " + r1(7 * s) + " " + r1(-5 * s) + " " + r1(11 * s) + " " + r1(-10 * s) + " " + r1(13 * s) + " c" + r1(-5 * s) + " " + r1(-2 * s) + " " + r1(-10 * s) + " " + r1(-6 * s) + " " + r1(-10 * s) + " " + r1(-13 * s) + " v" + r1(-6 * s) + " Z", c || "fG") + tick(x, y, 0.55 * s); break;
      case "bell": h = path("M" + r1(x - 10 * s) + " " + r1(y + 6 * s) + " q0 " + r1(-17 * s) + " " + r1(10 * s) + " " + r1(-17 * s) + " q" + r1(10 * s) + " 0 " + r1(10 * s) + " " + r1(17 * s) + " l" + r1(3 * s) + " " + r1(4 * s) + " h" + r1(-26 * s) + " Z", c || "fD") + circ(x, y + 12 * s, 3 * s, "fN"); break;
      case "mag": h = circ(x - 3 * s, y - 3 * s, 8.5 * s, "fW sN", { "stroke-width": 3 * s }) + line(x + 3.5 * s, y + 3.5 * s, x + 11 * s, y + 11 * s, c || "sN", { "stroke-width": 4.5 * s, "stroke-linecap": "round" }); break;
      case "wrench": h = path("M" + r1(x - 10 * s) + " " + r1(y + 10 * s) + " L" + r1(x + 4 * s) + " " + r1(y - 4 * s), c || "sN", { "stroke-width": 5 * s, "stroke-linecap": "round" }) + circ(x + 6 * s, y - 6 * s, 6 * s, "f0 " + (c || "sN"), { "stroke-width": 3.5 * s }); break;
      case "clock": h = circ(x, y, 12 * s, "fW sN", { "stroke-width": 2.4 }) + line(x, y, x, y - 8 * s, "sN", { "stroke-width": 2.4, "stroke-linecap": "round" }) + line(x, y, x + 6 * s, y + 3 * s, c || "sO", { "stroke-width": 2.4, "stroke-linecap": "round" }); break;
      case "flag": h = line(x - 8 * s, y - 13 * s, x - 8 * s, y + 13 * s, "sN", { "stroke-width": 2.5 }) + path("M" + r1(x - 8 * s) + " " + r1(y - 13 * s) + " h" + r1(18 * s) + " l" + r1(-4 * s) + " " + r1(5 * s) + " l" + r1(4 * s) + " " + r1(5 * s) + " h" + r1(-18 * s) + " Z", c || "fO"); break;
      case "key": h = circ(x - 7 * s, y, 6 * s, "f0 " + (c || "sD"), { "stroke-width": 3.4 * s }) + path("M" + r1(x - 1 * s) + " " + r1(y) + " h" + r1(13 * s) + " v" + r1(5 * s) + " M" + r1(x + 7 * s) + " " + r1(y) + " v" + r1(4 * s), (c || "sD") + " f0", { "stroke-width": 3.4 * s, "stroke-linecap": "round" }); break;
      case "book": h = path("M" + r1(x) + " " + r1(y - 9 * s) + " q" + r1(-7 * s) + " " + r1(-4 * s) + " " + r1(-13 * s) + " 0 v" + r1(19 * s) + " q" + r1(6 * s) + " " + r1(-4 * s) + " " + r1(13 * s) + " 0 q" + r1(7 * s) + " " + r1(-4 * s) + " " + r1(13 * s) + " 0 v" + r1(-19 * s) + " q" + r1(-6 * s) + " " + r1(-4 * s) + " " + r1(-13 * s) + " 0 Z", c || "fN") + line(x, y - 9 * s, x, y + 10 * s, "sW", { "stroke-width": 1.4 }); break;
      case "mega": h = path("M" + r1(x - 11 * s) + " " + r1(y - 4 * s) + " h" + r1(6 * s) + " l" + r1(14 * s) + " " + r1(-8 * s) + " v" + r1(24 * s) + " l" + r1(-14 * s) + " " + r1(-8 * s) + " h" + r1(-6 * s) + " Z", c || "fO"); break;
      case "trophy": h = path("M" + r1(x - 10 * s) + " " + r1(y - 12 * s) + " h" + r1(20 * s) + " v" + r1(6 * s) + " q0 " + r1(10 * s) + " " + r1(-10 * s) + " " + r1(10 * s) + " q" + r1(-10 * s) + " 0 " + r1(-10 * s) + " " + r1(-10 * s) + " Z", c || "fD") + rect(x - 2 * s, y + 4 * s, 4 * s, 5 * s, c || "fD") + rect(x - 7 * s, y + 9 * s, 14 * s, 4 * s, "fN", { rx: 1 }); break;
      case "bulb": h = circ(x, y - 3 * s, 9 * s, c || "fD") + rect(x - 4.5 * s, y + 5 * s, 9 * s, 6 * s, "fN", { rx: 1.5 }); break;
      case "scissors": h = circ(x - 7 * s, y + 6 * s, 4.5 * s, "f0 sO", { "stroke-width": 2.6 }) + circ(x + 7 * s, y + 6 * s, 4.5 * s, "f0 sO", { "stroke-width": 2.6 }) + line(x - 4 * s, y + 3 * s, x + 6 * s, y - 12 * s, "sN", { "stroke-width": 2.6, "stroke-linecap": "round" }) + line(x + 4 * s, y + 3 * s, x - 6 * s, y - 12 * s, "sN", { "stroke-width": 2.6, "stroke-linecap": "round" }); break;
      case "gavel": h = rect(x - 12 * s, y - 10 * s, 14 * s, 8 * s, c || "fN", { rx: 2, transform: "rotate(-30 " + r1(x - 5 * s) + " " + r1(y - 6 * s) + ")" }) + line(x - 3 * s, y - 4 * s, x + 9 * s, y + 9 * s, "sN", { "stroke-width": 3.4, "stroke-linecap": "round" }) + rect(x - 12 * s, y + 9 * s, 16 * s, 4 * s, "fN", { rx: 1 }); break;
      case "eye": h = path("M" + r1(x - 13 * s) + " " + r1(y) + " q" + r1(13 * s) + " " + r1(-13 * s) + " " + r1(26 * s) + " 0 q" + r1(-13 * s) + " " + r1(13 * s) + " " + r1(-26 * s) + " 0 Z", "fW sN", { "stroke-width": 2 }) + circ(x, y, 5 * s, c || "fN"); break;
      case "spark": h = path("M" + r1(x) + " " + r1(y - 13 * s) + " l" + r1(4 * s) + " " + r1(9 * s) + " l" + r1(9 * s) + " " + r1(4 * s) + " l" + r1(-9 * s) + " " + r1(4 * s) + " l" + r1(-4 * s) + " " + r1(9 * s) + " l" + r1(-4 * s) + " " + r1(-9 * s) + " l" + r1(-9 * s) + " " + r1(-4 * s) + " l" + r1(9 * s) + " " + r1(-4 * s) + " Z", c || "fO"); break;
      case "pin": h = path("M" + r1(x) + " " + r1(y + 12 * s) + " q" + r1(-11 * s) + " " + r1(-12 * s) + " " + r1(-11 * s) + " " + r1(-20 * s) + " a" + r1(11 * s) + " " + r1(11 * s) + " 0 0 1 " + r1(22 * s) + " 0 q0 " + r1(8 * s) + " " + r1(-11 * s) + " " + r1(20 * s) + " Z", c || "fO") + circ(x, y - 8 * s, 4 * s, "fW"); break;
      case "chart": h = rect(x - 12 * s, y - 12 * s, 24 * s, 24 * s, "fW sN", { rx: 3, "stroke-width": 1.6 }) + path("M" + r1(x - 8 * s) + " " + r1(y + 6 * s) + " L" + r1(x - 2 * s) + " " + r1(y - 1 * s) + " L" + r1(x + 2 * s) + " " + r1(y + 3 * s) + " L" + r1(x + 8 * s) + " " + r1(y - 7 * s), (c || "sO") + " f0", { "stroke-width": 2.4, "stroke-linecap": "round", "stroke-linejoin": "round" }); break;
      case "binder": h = rect(x - 10 * s, y - 13 * s, 20 * s, 26 * s, c || "fN", { rx: 2 }) + rect(x - 6 * s, y - 8 * s, 12 * s, 7 * s, "fW", { rx: 1 }) + circ(x, y + 7 * s, 2.6 * s, "fW"); break;
      case "ice": h = path("M" + r1(x) + " " + r1(y - 13 * s) + " v" + r1(26 * s) + " M" + r1(x - 11 * s) + " " + r1(y - 6.5 * s) + " l" + r1(22 * s) + " " + r1(13 * s) + " M" + r1(x - 11 * s) + " " + r1(y + 6.5 * s) + " l" + r1(22 * s) + " " + r1(-13 * s), (c || "sB") + " f0", { "stroke-width": 3, "stroke-linecap": "round" }); break;
      case "fire": h = path("M" + r1(x) + " " + r1(y - 13 * s) + " q" + r1(11 * s) + " " + r1(10 * s) + " " + r1(8 * s) + " " + r1(19 * s) + " q" + r1(-3 * s) + " " + r1(6 * s) + " " + r1(-8 * s) + " " + r1(6 * s) + " q" + r1(-9 * s) + " 0 " + r1(-9 * s) + " " + r1(-9 * s) + " q0 " + r1(-7 * s) + " " + r1(9 * s) + " " + r1(-16 * s) + " Z", c || "fO"); break;
      case "puzzle": h = path("M" + r1(x - 11 * s) + " " + r1(y - 11 * s) + " h" + r1(7 * s) + " a" + r1(4 * s) + " " + r1(4 * s) + " 0 0 1 " + r1(8 * s) + " 0 h" + r1(7 * s) + " v" + r1(7 * s) + " a" + r1(4 * s) + " " + r1(4 * s) + " 0 0 1 0 " + r1(8 * s) + " v" + r1(7 * s) + " h" + r1(-22 * s) + " Z", c || "fD"); break;
      case "gear": h = path(gearP(x, y, 12 * s, 8), c || "fN") + circ(x, y, 4.2 * s, "fP"); break;
      default: h = circ(x, y, 10 * s, c || "fN");
    }
    return h;
  }
  /* bar chart with grow-up reveals; items: {v, l, r, c, t} */
  function bars(o) {
    var s = "", n = o.items.length, i, it, x, bh, w = n * (o.bw + o.gap) - o.gap;
    for (i = 0; i < n; i++) {
      it = o.items[i]; x = o.x + i * (o.bw + o.gap); bh = it.v / o.max * o.h;
      s += R(it.r, "gy", rect(x, o.base - bh, o.bw, bh, it.c || "fN", { rx: Math.min(6, o.bw / 5) }));
      s += R(it.r, "up", TX(x + o.bw / 2, o.base - bh - 8, it.t || String(it.v), o.fs || 22, it.tc || "fI"));
      s += R(it.r, "f", TX(x + o.bw / 2, o.base + 19, it.l, o.ls || 14, "fN"));
    }
    return s + line(o.x - 8, o.base, o.x + w + 8, o.base, "sN", { "stroke-width": 2.4, "stroke-linecap": "round" });
  }
  function tag(s, v) { return chip(348 - chipW(s, 13) / 2, 19, s, v || "pm", 13); }
  function loopRing(cx, cy, r, w, c) {
    return path("M" + r1(cx - r) + " " + r1(cy) + " a" + r + " " + r + " 0 1 1 " + r1(2 * r) + " 0 a" + r + " " + r + " 0 1 1 " + r1(-2 * r) + " 0", (c || "sG") + " f0 flowd", { "stroke-width": w || 3 });
  }
  function ringPts(cx, cy, r, n, a0) { var p = [], i, a; for (i = 0; i <= n; i++) { a = (a0 || -90) * Math.PI / 180 + i / n * Math.PI * 2; p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } return p; }

  /* ---------- CSS (scoped under .vls-w14-<secId>, one shared <style id="vl-sc-w14">) ---------- */
  function sc(ids, sel) { return ids.map(function (id) { return ".vls-w14-" + id + (sel ? " " + sel : ""); }).join(","); }
  function baseCSS(ids) {
    var R2 = [];
    function add(sel, body) { R2.push(sc(ids, sel) + "{" + body + "}"); }
    R2.push(sc(ids, "") + "{--n:var(--vl-sc-navy,#1f4e79);--o:var(--vl-sc-orange,#c0502a);--g:var(--vl-sc-green,#317c61);--p:var(--vl-sc-paper,#fbf8f1);" +
      "--i:var(--vl-sc-ink,#1b2a3a);--b:var(--vl-sc-blue,#dbe7f2);--m:#7f98ad;--d:#d39b45;--l:#edf3f6;--s:#efe5d0;--w:#ffffff;--r:#a8321f;" +
      "position:relative;display:block;width:100%;height:100%;min-height:0;overflow:hidden;box-sizing:border-box;font-family:inherit;color:var(--i);}");
    add("> svg", "display:block;width:100%;height:100%;overflow:hidden;");
    add(".tx", "font-family:inherit;font-weight:800;text-anchor:middle;fill:var(--i);paint-order:stroke fill;stroke:var(--p);stroke-width:3.6px;stroke-linejoin:round;letter-spacing:.01em;");
    add(".tx.nh", "stroke:none;"); add(".tx.s", "text-anchor:start;"); add(".tx.e", "text-anchor:end;"); add(".tx.w6", "font-weight:650;");
    [13, 14, 15, 16, 18, 20, 22, 24, 28, 32, 40, 48, 56].forEach(function (n) { add(".t" + n, "font-size:" + n + "px;"); });
    var col = { N: "n", O: "o", G: "g", P: "p", I: "i", B: "b", M: "m", D: "d", L: "l", S: "s", W: "w", R: "r" };
    Object.keys(col).forEach(function (k) { add(".f" + k, "fill:var(--" + col[k] + ");"); add(".s" + k, "stroke:var(--" + col[k] + ");"); });
    add(".f0", "fill:none;");
    add(".pn", "transition:opacity .45s ease,transform .6s cubic-bezier(.2,.8,.2,1),visibility 0s linear 0s;");
    add(".pn.hid", "opacity:0;transform:translateY(10px);visibility:hidden;pointer-events:none;transition:opacity .35s ease,transform .4s ease,visibility 0s linear .4s;");
    add(".rv", "transition:opacity .5s ease,transform .75s cubic-bezier(.2,.9,.3,1.15);transform-box:fill-box;transform-origin:50% 50%;");
    add(".rv.off", "opacity:0;pointer-events:none;");
    add(".rv.off[data-fx=up]", "transform:translateY(16px);"); add(".rv.off[data-fx=dn]", "transform:translateY(-16px);");
    add(".rv.off[data-fx=l]", "transform:translateX(-24px);"); add(".rv.off[data-fx=r]", "transform:translateX(24px);");
    add(".rv.off[data-fx=pop]", "transform:scale(.35);"); add(".rv.off[data-fx=stamp]", "transform:scale(1.9) rotate(-10deg);");
    add(".rv[data-fx=gx]", "transform-origin:0% 50%;"); add(".rv.off[data-fx=gx]", "transform:scaleX(0);");
    add(".rv[data-fx=gy]", "transform-origin:50% 100%;"); add(".rv.off[data-fx=gy]", "transform:scaleY(0);");
    add(".rv[data-fx=dr] .dw", "stroke-dasharray:1 1;stroke-dashoffset:0;transition:stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1);");
    add(".rv.off[data-fx=dr] .dw", "stroke-dashoffset:1;"); add(".rv[data-fx=dr]", "transition:opacity .3s ease;");
    add(".mv", "transition:transform 1s cubic-bezier(.3,.9,.25,1.05);");
    add(".wk", "transition:none;");
    add(".dim", "opacity:.28;transition:opacity .5s ease;"); add(".hl", "transition:fill .5s ease,stroke .5s ease,opacity .5s ease;");
    add(".ghost", "opacity:.32;");
    add(".flowd", "stroke-dasharray:7 7;animation:" + KF + "Flow 1.2s linear infinite;");
    add(".spin", "transform-box:fill-box;transform-origin:50% 50%;animation:" + KF + "Spin 4s linear infinite;");
    add(".spinr", "transform-box:fill-box;transform-origin:50% 50%;animation:" + KF + "Spin 4s linear infinite reverse;");
    add(".bob", "animation:" + KF + "Bob 2.6s ease-in-out infinite;");
    add(".blink", "animation:" + KF + "Blink 1.3s ease-in-out infinite;");
    add(".wob", "transform-box:fill-box;transform-origin:50% 15%;animation:" + KF + "Wob 1.1s ease-in-out infinite;");
    add(".rise", "animation:" + KF + "Rise 2.2s ease-in infinite;");
    add(".k-pop", "transform-box:fill-box;transform-origin:50% 50%;animation:" + KF + "Pop .6s cubic-bezier(.3,1.6,.5,1) 1;");
    add(".k-shake", "transform-box:fill-box;transform-origin:50% 50%;animation:" + KF + "Shake .7s ease 1;");
    add(".dot", "transition:fill .45s ease,opacity .45s ease;");
    add(".kick", "text-anchor:start;font-size:12.5px;font-weight:850;letter-spacing:.12em;fill:var(--n);stroke:none;opacity:.85;");
    add(".capr", "fill:var(--n);"); add(".capt", "fill:#fff;stroke:none;font-size:15px;font-weight:800;text-anchor:middle;letter-spacing:.01em;");
    add(".capg", "transform-box:fill-box;transform-origin:50% 50%;"); add(".capg.go", "animation:" + KF + "Cap .5s cubic-bezier(.3,1.5,.5,1) 1;");
    add(".prog", "fill:var(--o);transform-box:fill-box;transform-origin:0 50%;transition:transform .6s ease;"); add(".progbg", "fill:var(--n);opacity:.1;");
    R2.push(sc(ids, "").split(",").map(function (s) { return s + ".inst *"; }).join(",") + "{transition:none!important;}");
    R2.push("@keyframes " + KF + "Flow{to{stroke-dashoffset:-28}}");
    R2.push("@keyframes " + KF + "Spin{to{transform:rotate(360deg)}}");
    R2.push("@keyframes " + KF + "Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}");
    R2.push("@keyframes " + KF + "Blink{0%,100%{opacity:1}50%{opacity:.35}}");
    R2.push("@keyframes " + KF + "Wob{0%,100%{transform:rotate(0)}25%{transform:rotate(14deg)}75%{transform:rotate(-14deg)}}");
    R2.push("@keyframes " + KF + "Rise{0%{transform:translateY(6px);opacity:0}30%{opacity:1}100%{transform:translateY(-14px);opacity:0}}");
    R2.push("@keyframes " + KF + "Pop{0%{transform:scale(.7)}100%{transform:scale(1)}}");
    R2.push("@keyframes " + KF + "Shake{0%{transform:rotate(-7deg)}25%{transform:rotate(6deg)}50%{transform:rotate(-4deg)}75%{transform:rotate(2deg)}100%{transform:rotate(0)}}");
    R2.push("@keyframes " + KF + "Cap{0%{transform:scale(.88)}100%{transform:scale(1)}}");
    R2.push("@media (prefers-reduced-motion:reduce){" + sc(ids, "*") + "{animation:none!important;transition:none!important;}}");
    return R2.join("\n");
  }
  function addCSS(key, css) {
    if (typeof document === "undefined") return;
    var st = document.getElementById(STYLE_ID);
    if (!st) { st = document.createElement("style"); st.id = STYLE_ID; (document.head || document.documentElement).appendChild(st); }
    var mark = "/*" + key + "*/";
    if ((st.textContent || "").indexOf(mark) < 0) st.textContent += "\n" + mark + "\n" + css + "\n";
  }
  function installCSS() {
    addCSS("vls-w14-v2-" + PART + "-base", baseCSS(IDS));
    addCSS("vls-w14-v2-" + PART + "-scenes", SEC_CSS.join("\n"));
  }

  /* ---------- tween + ambient loop helpers ---------- */
  function tween(el, key, from, to, dur, ease, apply, inst) {
    if (!el) return;
    var st = el["_vt" + key];
    if (st) CAF(st);
    if (inst || !dur || reduced()) { el["_vv" + key] = to; apply(to); return; }
    var a = from === undefined || from === null ? fin(el["_vv" + key], to) : from, t0 = now(), d = dur * 1000, e = EASE[ease] || EASE.io;
    function f() {
      var t = clamp((now() - t0) / d, 0, 1), v = a + (to - a) * e(t);
      el["_vv" + key] = v; apply(v);
      el["_vt" + key] = t < 1 ? RAF(f) : 0;
    }
    el["_vt" + key] = RAF(f);
  }
  function along(pts, t) {
    var L = 0, seg = [], i, d;
    for (i = 1; i < pts.length; i++) { d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
    var s = clamp(t, 0, 1) * L;
    for (i = 0; i < seg.length; i++) {
      if (s <= seg[i] || i === seg.length - 1) { var u = seg[i] ? clamp(s / seg[i], 0, 1) : 1; return [lerp(pts[i][0], pts[i + 1][0], u), lerp(pts[i][1], pts[i + 1][1], u)]; }
      s -= seg[i];
    }
    return pts[pts.length - 1];
  }
  /* GSAP (when present) drives entrance timing/easing through a proxy; styles stay ours */
  function gsapEnter(el, fx, delay) {
    var g = gsapLib(); if (!g) return false;
    var o = { t: 0 };
    el.style.transition = "none";
    function ap() {
      var t = o.t, u = 1 - t, tr = "none";
      if (fx === "pop") tr = "scale(" + (0.35 + 0.65 * t).toFixed(3) + ")";
      else if (fx === "stamp") tr = "scale(" + (1.9 - 0.9 * t).toFixed(3) + ") rotate(" + (-10 * u).toFixed(2) + "deg)";
      else if (fx === "up") tr = "translateY(" + (16 * u).toFixed(2) + "px)";
      else if (fx === "dn") tr = "translateY(" + (-16 * u).toFixed(2) + "px)";
      else if (fx === "l") tr = "translateX(" + (-24 * u).toFixed(2) + "px)";
      else if (fx === "r") tr = "translateX(" + (24 * u).toFixed(2) + "px)";
      else if (fx === "gx") tr = "scaleX(" + Math.max(0, t).toFixed(3) + ")";
      else if (fx === "gy") tr = "scaleY(" + Math.max(0, t).toFixed(3) + ")";
      el.style.transform = tr; el.style.opacity = String(Math.min(1, Math.max(0, t * 1.7)));
    }
    ap();
    try {
      g.to(o, { t: 1, delay: (delay || 0) / 1000, duration: fx === "stamp" ? 0.5 : 0.85,
        ease: fx === "stamp" ? "power3.in" : (fx === "gx" || fx === "gy") ? "power3.out" : "back.out(1.7)",
        onUpdate: ap, onComplete: function () { el.style.transition = ""; el.style.transform = ""; el.style.opacity = ""; } });
    } catch (e) { el.style.transition = ""; el.style.transform = ""; el.style.opacity = ""; return false; }
    return true;
  }
  function setT(el, x, y, s, rot) {
    if (el) el.style.transform = "translate(" + r1(x) + "px," + r1(y) + "px)" + (rot ? " rotate(" + r1(rot) + "deg)" : "") + (s !== undefined && s !== 1 ? " scale(" + s + ")" : "");
  }

  /* ---------- scene factory: build(el) / step(i, n) / reset() ---------- */
  function scene(def) {
    var root = null, cur = -1, curP = -1, loops = [], raf = 0, t0 = 0, panels = [], gen = 0;
    var N = def.lines.length;
    function lineFor(i, n) {
      n = Math.max(1, Math.floor(fin(n, N))); i = clamp(Math.floor(fin(i, 0)), 0, n - 1);
      if (n === N) return i;
      if (n <= 1) return 0;
      return clamp(Math.round(i * (N - 1) / (n - 1)), 0, N - 1);
    }
    function stopLoops() { loops = []; if (raf) { CAF(raf); raf = 0; } }
    function frame() {
      raf = 0;
      if (!root || !root.isConnected || !loops.length) return;
      var t = (now() - t0) / 1000;
      for (var j = 0; j < loops.length; j++) { try { loops[j](t); } catch (e) { /* keep running */ } }
      raf = RAF(frame);
    }
    function startLoops() { if (raf || !loops.length || reduced()) return; t0 = now(); raf = RAF(frame); }
    function api(pg, k, inst, fresh) {
      var A = {
        k: k, inst: inst, fresh: fresh, root: pg,
        q: function (s) { return pg.querySelector(s); },
        qa: function (s) { return Array.prototype.slice.call(pg.querySelectorAll(s)); },
        cls: function (s, c, on) { A.qa(s).forEach(function (n) { n.classList.toggle(c, !!on); }); },
        attr: function (s, a, v) { A.qa(s).forEach(function (n) { n.setAttribute(a, String(v)); }); },
        text: function (s, v) { A.qa(s).forEach(function (n) { n.textContent = String(v); }); },
        fill: function (s, v) { A.qa(s).forEach(function (n) { n.style.fill = v; }); },
        op: function (s, v) { A.qa(s).forEach(function (n) { n.style.opacity = String(v); }); },
        pos: function (s, x, y, sc2, rot) { A.qa(s).forEach(function (n) { setT(n, x, y, sc2, rot); }); },
        num: function (s, to, o) {
          o = o || {};
          A.qa(s).forEach(function (n) {
            tween(n, "n", o.from, to, o.dur === undefined ? 1.2 : o.dur, "out", function (v) {
              n.textContent = (o.pre || "") + (o.dec ? v.toFixed(o.dec) : String(Math.round(v))) + (o.suf || "");
            }, inst);
          });
        },
        bar: function (s, attr, to, o) {
          o = o || {};
          A.qa(s).forEach(function (n) {
            tween(n, attr, o.from, to, o.dur === undefined ? 1.2 : o.dur, "io", function (v) { n.setAttribute(attr, r1(v)); if (o.y0 !== undefined) n.setAttribute("y", r1(o.y0 - v)); }, inst);
          });
        },
        walk: function (s, pts, dur, o) {
          o = o || {};
          var n = A.q(s); if (!n) return;
          if (inst || reduced()) { var e = along(pts, o.loop ? (o.rest === undefined ? 1 : o.rest) : 1); setT(n, e[0], e[1], o.scale); return; }
          if (o.loop) {
            var off = o.offset || 0;
            loops.push(function (t) { var u = ((t + off) % dur) / dur, p = along(pts, u); setT(n, p[0], p[1], o.scale); });
            startLoops(); return;
          }
          tween(n, "w", 0, 1, dur, o.ease || "io", function (v) { var p = along(pts, v); setT(n, p[0], p[1], o.scale); }, false);
        },
        turn: function (s, x, y, to, o) {
          o = o || {};
          A.qa(s).forEach(function (n) { tween(n, "r", o.from, to, o.dur === undefined ? 1.2 : o.dur, o.ease || "io", function (v) { setT(n, x, y, o.scale, v); }, inst); });
        },
        later: function (ms, fn) {
          var g = gen;
          if (inst || reduced()) { fn(); return; }
          setTimeout(function () { if (g === gen && root && root.isConnected) fn(); }, ms);
        },
        loop: function (fn) { if (inst || reduced()) { try { fn(0); } catch (e) { /* ignore */ } return; } loops.push(fn); startLoops(); },
        fx: function (s, kind) {
          if (inst || reduced()) return;
          A.qa(s).forEach(function (n) {
            var g = gsapLib();
            if (g) {
              if (kind === "pop") g.fromTo(n, { scale: 0.7, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.6, ease: "back.out(2.6)", overwrite: "auto" });
              else g.fromTo(n, { rotation: -8, transformOrigin: "50% 50%" }, { rotation: 0, duration: 0.8, ease: "elastic.out(1.1,0.3)", overwrite: "auto" });
              return;
            }
            n.classList.remove("k-" + kind); try { void n.getBoundingClientRect(); } catch (e) { /* ignore */ } n.classList.add("k-" + kind);
          });
        }
      };
      return A;
    }
    function caption(s, inst) {
      var t = root.querySelector(".capt"), rr = root.querySelector(".capr"), g = root.querySelector(".capg");
      if (!t || !rr) return;
      t.textContent = s;
      var w = 0;
      try { w = t.getComputedTextLength(); } catch (e) { w = 0; }
      if (!w || !isFinite(w)) w = tw(s, 15);
      w = clamp(w + 34, 90, 344);
      rr.setAttribute("x", r1(180 - w / 2)); rr.setAttribute("width", r1(w));
      if (!inst && g) { g.classList.remove("go"); try { void g.getBoundingClientRect(); } catch (e) { /* ignore */ } g.classList.add("go"); }
    }
    function apply(i, n, inst) {
      if (!root) return;
      var li = lineFor(i, n), L = def.lines[li] || [0, 0, ""], p = L[0], k = L[1];
      inst = !!inst || reduced();
      gen++;
      root.classList.toggle("inst", inst);
      var fresh = p !== curP;
      stopLoops();
      panels.forEach(function (pg, j) { pg.classList.toggle("hid", j !== p); });
      var pg = panels[p];
      if (pg) {
        var rvs = Array.prototype.slice.call(pg.querySelectorAll(".rv")), n2 = 0;
        if (fresh && !inst) { rvs.forEach(function (el) { el.classList.add("off"); }); try { void pg.getBoundingClientRect(); } catch (e) { /* ignore */ } }
        rvs.forEach(function (el) {
          var r = String(el.getAttribute("data-r") || "0").split("-"), a = +r[0], b = r.length > 1 ? +r[1] : 99, on = k >= a && k <= b;
          var was = !el.classList.contains("off");
          el.classList.toggle("off", !on);
          if (on && !was && !inst) {
            var d = fresh ? Math.min(n2 * 60, 720) : Math.min(n2 * 45, 360); n2++;
            if (!gsapEnter(el, el.getAttribute("data-fx"), d)) el.style.transitionDelay = d ? d + "ms" : "";
          } else el.style.transitionDelay = "";
        });
        var P = def.panels[p];
        if (P && P.on) { try { P.on(api(pg, k, inst, fresh)); } catch (e) { if (W.console) W.console.error("[W14 " + def.id + " panel " + p + "]", e); } }
      }
      if (li !== cur || inst) caption(L[2], inst);
      var pr = root.querySelector(".prog");
      if (pr) pr.style.transform = "scaleX(" + ((li + 1) / N).toFixed(4) + ")";
      cur = li; curP = p;
    }
    return {
      build: function (host) {
        if (!host || typeof document === "undefined") return;
        installCSS(); stopLoops();
        var node = document.createElement("div");
        node.className = "vls-w14-" + def.id;
        node.setAttribute("role", "img");
        node.setAttribute("aria-label", def.aria);
        var body = "", j;
        for (j = 0; j < def.panels.length; j++) body += '<g class="pn hid" data-p="' + j + '">' + def.panels[j].svg() + "</g>";
        node.innerHTML = '<svg xmlns="' + NS + '" viewBox="0 0 360 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' +
          rect(-400, -400, 1160, 1100, "fP") + (def.bg ? def.bg() : "") + body +
          T(12, 21, def.kicker, "kick") +
          G("capg", rect(100, 268, 160, 27, "capr", { rx: 13.5 }) + T(180, 286.8, "", "capt")) +
          rect(0, 297, 360, 3, "progbg") + rect(0, 297, 360, 3, "prog") + "</svg>";
        if (typeof host.replaceChildren === "function") host.replaceChildren(node);
        else { while (host.firstChild) host.removeChild(host.firstChild); host.appendChild(node); }
        root = node; cur = -1; curP = -1;
        panels = Array.prototype.slice.call(node.querySelectorAll(".pn"));
        if (!W.VL_WORK || VL_WORK.immediate) { apply(0, N, true); return; }
        var owner = node, version = ++gen;
        return VL_WORK.yield().then(function () {
          if (root === owner && gen === version && owner.isConnected) apply(0, N, true);
        });
      },
      step: function (i, n) { if (root) apply(i, n === undefined ? N : n, false); },
      reset: function () { if (!root) return; stopLoops(); if (W.VL_WORK?.discarding) { gen++; return; } cur = -1; curP = -1; apply(0, N, true); }
    };
  }
  function define(def) {
    if (def.css) SEC_CSS.push(def.css);
    VL[def.id] = scene(def);
  }

  /* ==================================================================
     W14O1a · PHASE TEN: WHEN BPM BECOMES MANAGEMENT  (audit 3.2/10)
     29 lines -> 9 visuals. Literal: the Qasr journey, the ten numbered
     phases with phase 9 -> 10 and the return route, honest single-scale
     Qasr bars, the programme vs continuing responsibility, a causal loop.
     ================================================================== */
  (function () {
    var P = [];
    var PH = [["Organization", "Strategy"], ["Process", "Architecture"], ["Launch Pad"], ["Understand"], ["Innovate"], ["People"], ["Develop"], ["Implement"], ["Realize Value"], ["Sustainable", "Performance"]];
    function tiles(lit) {
      var s = "", i, c, r, x, y, n, on;
      for (i = 0; i < 10; i++) {
        c = i < 5 ? 0 : 1; r = i % 5; x = c ? 190 : 12; y = 40 + r * 44; n = PH[i]; on = lit.indexOf(i) >= 0;
        s += G("tl" + i + " hl", rect(x, y, 158, 38, on ? (i === 9 ? "fG" : "fN") : "fW sN", { rx: 8, "stroke-width": 1.6 }) + circ(x + 19, y + 19, 12, on ? "fW" : "fN") +
          TX(x + 19, y + 24, String(i + 1), 13, "nh " + (on ? (i === 9 ? "fG" : "fN") : "fW")) +
          (n.length > 1 ? TX(x + 38, y + 16, n[0], 13, "s nh " + (on ? "fW" : "fN")) + TX(x + 38, y + 32, n[1], 13, "s nh " + (on ? "fW" : "fN"))
            : TX(x + 38, y + 24, n[0], 14, "s nh " + (on ? "fW" : "fN"))));
      }
      return s;
    }
    function stampW(x, y, txt, v, rot) { var w = tw(txt, 15) + 26; return G("", rect(x - w / 2, y - 15, w, 30, "f0 " + (v || "sO"), { rx: 6, "stroke-width": 3 }) + TX(x, y + 5.5, txt, 15, "nh " + (v === "sG" ? "fG" : "fO")), { transform: "rotate(" + (rot === undefined ? -7 : rot) + " " + x + " " + y + ")" }); }

    /* V1 · lines 0-1 — Week 14: after the programme has finished; the Qasr journey so far
       Template: https://motionarray.com/after-effects-templates/timeline/ (milestones revealed with a travelling marker) */
    P.push({
      svg: function () {
        var a = TX(180, 92, "Week 14", 40, "fN") + TX(180, 122, "Sustainable Performance", 17, "fG") +
          rect(40, 172, 240, 16, "fG", { rx: 8 }) + icon("flag", 300, 166, 1.4) + TX(160, 214, "Programme finished", 16, "fN") + okB(312, 196, 11);
        var b = line(30, 150, 330, 150, "sN", { "stroke-width": 4, "stroke-linecap": "round" }), st = [["Arrival", "problems", 50, 0], ["Process", "redesign", 140, 1], ["Implemen-", "tation", 230, 0], ["Benefits", "realised", 316, 1]];
        st.forEach(function (s2, j) {
          var y0 = s2[3] ? 182 : 110, c2 = j === 0 ? "fO" : "fG";
          b += circ(s2[2], 150, 12, j === 0 ? "fO" : "fG") + TX(s2[2], y0, s2[0], 14, c2) + (s2[1] ? TX(s2[2], y0 + 17, s2[1], 14, c2) : "");
        });
        b += WK("jt", 50, 150, circ(0, 0, 8, "fD sN", { "stroke-width": 2 })) + chip(180, 234, "Qasr so far", "n", 14);
        return R("0-0", "f", a) + R("1", "f", b);
      },
      on: function (A) { if (A.k >= 1) A.walk(".n-jt", [[50, 150], [140, 150], [230, 150], [316, 150]], 3.4, {}); }
    });

    /* V2 · lines 2-4 — from achieving to keeping it alive; the project ends while the process slips; celebrated, then rising again
       Template: https://motionarray.com/after-effects-templates/corporate-timeline-77666/ (milestone transitions along a path) */
    P.push({
      svg: function () {
        var a = icon("trophy", 70, 126, 2.4) + TX(70, 182, "Achieve it", 15, "fN") + arrow(112, 130, 150, 130, "sG", 4) +
          card(160, 70, 186, 120, "pg") + path("M174 130 h30 l10 -26 l14 52 l12 -38 l8 12 h34 l10 -20 l10 30 l8 -10 h22", "sG f0", { "stroke-width": 3.5, "stroke-linejoin": "round" }) +
          TX(253, 176, "Keep it alive", 15, "fG") + chip(180, 236, "Ordinary operations", "g", 14);
        var b = rect(30, 92, 160, 26, "fN", { rx: 6 }) + TX(110, 110, "Project", 14, "nh fW") + icon("flag", 202, 92, 1.2) + TX(110, 80, "Ends here", 14, "fN") +
          line(30, 230, 330, 230, "sN", { "stroke-width": 2 }) + path("M30 160 L190 160", "sG f0", { "stroke-width": 4 }) +
          R("1", "dr", path("M190 160 C240 164 280 190 330 210", "sO f0 dw", { pathLength: 1, "stroke-width": 4 })) + TX(36, 150, "Process performance", 14, "fG s") + TX(276, 166, "Slipping away", 15, "fO");
        var c = icon("clock", 90, 128, 2.6) + TX(90, 192, "24 min", 22, "fG") + [[40, 70], [70, 56], [120, 60], [146, 80], [40, 100]].map(function (p, j) { return rect(p[0], p[1], 8, 8, j % 2 ? "fD" : "fO", { transform: "rotate(" + (j * 30) + " " + p[0] + " " + p[1] + ")" }); }).join("") +
          TX(90, 230, "Celebrated gain", 15, "fG") + arrow(150, 128, 200, 128, "sN", 3) + icon("clock", 262, 128, 2.6) + TX(262, 192, "Rising again", 16, "fO") + G("bob", arrow(316, 150, 316, 92, "sO", 4));
        return R("0-0", "f", a) + R("1-1", "f", b) + R("2", "pop", c);
      }
    });

    /* V3 · lines 5-8 — the ten phases; phase 9 Realize Value leads to 10; evidence, not announcements; hold benefits while things change
       Template: https://codepen.io/WebGuyJeff/pen/rNdmqdO (numbered steps, active state) */
    P.push({
      svg: function () {
        var s = G("tg9", tiles([9])) + R("1-1", "f", G("", tiles([8, 9])) + carrow(348, 191, 364, 213, 349, 234, "sG", 3));
        s += R("2-2", "pop", card(30, 56, 300, 180, "p") + TX(180, 82, "Realize Value asks", 15, "fN") +
          icon("chart", 100, 140, 2) + TX(100, 196, "Measured evidence", 14, "fG") + okB(140, 106, 11) +
          icon("mega", 260, 140, 2) + TX(260, 196, "Mere announcements", 13, "fM") + noB(296, 106, 11));
        s += R("3", "pop", card(30, 56, 300, 180, "pg") + TX(180, 82, "Sustainable Performance", 15, "fG") +
          path("M140 174 a40 40 0 0 1 80 0", "sG f0", { "stroke-width": 10 }) + line(180, 174, 180, 140, "sI", { "stroke-width": 4, "stroke-linecap": "round" }) + TX(180, 200, "Benefits held", 14, "fG") +
          G("bob", person(78, 160, 0.9, "N")) + TX(78, 184, "People move", 13, "fN") + G("bob", icon("binder", 282, 132, 1)) + TX(282, 184, "Priorities shift", 13, "fN") +
          icon("spark", 180, 112, 0.8) + TX(180, 226, "Conditions change", 13, "fO"));
        return s;
      },
      on: function (A) { A.op(".tg9", A.k === 0 ? 1 : 0); }
    });

    /* V4 · lines 9-10 — illustration: a restaurant improves speed under a supervising team; the team leaves - who protects it?
       Template: https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6 (team members appear and leave) */
    P.push({
      svg: function () {
        var s = rect(20, 170, 220, 18, "fS sN", { rx: 5, "stroke-width": 1.5 }) + person(70, 170, 1.3, "G") + TX(70, 214, "Restaurant waiter", 13, "fG") + person(150, 238, 1, "N") + person(196, 238, 1, "N") +
          circ(110, 160, 9, "fW sN") + circ(150, 160, 9, "fW sN") + icon("clock", 300, 100, 1.6) + TX(300, 146, "Fast service", 14, "fG");
        s += R("0-0", "r", person(244, 170, 1.4, "O", { clip: true }) + TX(244, 190, "Project team", 13, "fO"));
        s += R("1", "pop", rect(196, 116, 50, 60, "f0 sO", { rx: 8, "stroke-dasharray": "5 4", "stroke-width": 2.4 }) + qB(221, 146, 14) + chip(250, 236, "Who protects it?", "po", 14));
        return tag("Illustrative example", "pm") + s;
      },
    });

    /* V5 · lines 11-14 — Qasr on one honest scale: 82 baseline; 24 at month 5 across 14 properties; no guarantee; 39 at month 22
       Template: https://observablehq.com/@d3/learn-d3-animation (values revealed left to right) */
    P.push({
      svg: function () {
        var s = bars({ x: 46, base: 232, h: 150, max: 90, bw: 70, gap: 34, fs: 26, items: [
          { v: 82, l: "Baseline", r: "0", c: "fM" }, { v: 24, l: "Month 5", r: "1", c: "fG" }, { v: 39, l: "Month 22", r: "3", c: "fO" }] });
        var h = "", i;
        for (i = 0; i < 14; i++) h += hotel(160 + (i % 7) * 26, 76 + Math.floor(i / 7) * 34, 0.62, "fG");
        s += R("1-2", "pop", h + TX(250, 128, "14 properties", 13, "fG"));
        s += R("2-2", "f", path("M186 220 C220 210 240 190 262 180", "sM f0", { "stroke-width": 3, "stroke-dasharray": "6 6" }) + qB(286, 176, 16) + TX(286, 214, "No guarantee", 14, "fM"));
        return tag("Qasr evidence", "pm") + s;
      }
    });

    /* V6 · lines 15-17 — the gain was real; check the management arrangements; BPM moves into normal management
       Template: https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion (structure built, scaffold removed) */
    P.push({
      svg: function () {
        var a = TX(110, 130, "82", 40, "fM") + arrow(150, 118, 196, 118, "sG", 4) + TX(250, 130, "24", 40, "fG") + okB(300, 92, 14) + chip(180, 200, "Real improvement", "g", 15);
        var b = "";
        [["Process owner", 70], ["Review routine", 160], ["Change rules", 250]].forEach(function (r, j) { b += R("1", "up", card(28, r[1] - 22, 240, 46, "p") + TX(44, r[1] + 6, r[0], 16, "fN s") + qB(246, r[1], 12)); });
        b += G("bob", icon("mag", 312, 150, 2.2));
        var c = card(110, 70, 140, 70, "g") + TX(180, 102, "Arrival", 15, "nh fW") + TX(180, 122, "process", 15, "nh fW") +
          WK("scf", 0, 0, line(100, 60, 100, 196, "sM", { "stroke-width": 4 }) + line(260, 60, 260, 196, "sM", { "stroke-width": 4 }) + line(96, 64, 264, 64, "sM", { "stroke-width": 4 }) + TX(180, 54, "Programme scaffold", 13, "fM")) +
          rect(40, 150, 280, 48, "fN", { rx: 8 }) + TX(180, 180, "Normal management", 16, "nh fW") + crowd(100, 246, 4, 54, 1, "N");
        return R("0-0", "pop", a) + R("1-1", "f", b) + R("2", "f", c);
      },
      on: function (A) { if (A.k === 2) A.walk(".n-scf", [[0, 0], [0, -12], [0, -24]], 1.8, {}); else A.pos(".n-scf", 0, 0); A.op(".n-scf", A.k === 2 ? 0.6 : 1); }
    });

    /* V7 · lines 18-22 — programme vs continuing duty; an accountable owner stays; authority; regular evidence review; an unused report protects nothing (kept MATCH)
       Template: https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design (feature states shown in turn) */
    P.push({
      svg: function () {
        var a = card(10, 40, 164, 210, "pm") + TX(92, 60, "Temporary", 14, "fN") + TX(92, 76, "programme", 14, "fN") + TX(28, 100, "Objectives", 14, "fN s") + TX(28, 128, "Resources", 14, "fN s") + icon("flag", 92, 174, 1.4) + TX(92, 220, "Has an end", 14, "fO") +
          card(186, 40, 164, 210, "pg") + TX(268, 60, "Ongoing", 14, "fG") + TX(268, 76, "operations", 14, "fG") + G("spin", loopRing(268, 140, 40, 6, "sG")) + TX(268, 220, "Never ends", 14, "fG");
        var b = WK("tm7", 70, 214, crowd(0, 0, 3, 26, 1, "M")) + person(240, 214, 1.8, "G") + chip(240, 248, "Process owner", "g", 14) + TX(240, 120, "Accountable after", 15, "fG") + TX(240, 140, "the team leaves", 15, "fG");
        var c = person(180, 214, 1.6, "G") + icon("key", 180, 150, 1.3) + [["Front desk", 60, 80], ["Room cleaning", 300, 80], ["Systems team", 60, 196], ["Finance team", 300, 196]].map(function (d) {
          return card(d[1] - 50, d[2] - 20, 100, 40, "p") + TX(d[1], d[2] + 5, d[0], 13, "fN") + line(180, 170, d[1] + (d[1] < 180 ? 50 : -50), d[2], "sG", { "stroke-width": 2 });
        }).join("") + chip(180, 252, "Authority to act", "g", 14);
        var d = path("M90 150 a90 44 0 1 0 180 0 a90 44 0 1 0 -180 0", "fS sN", { "stroke-width": 2 }) + icon("chart", 180, 150, 1.8) +
          [[110, 108], [180, 98], [250, 108], [110, 192], [180, 202], [250, 192]].map(function (p) { return circ(p[0], p[1], 11, "fN"); }).join("") + cal(40, 80, 1, "fG") + chip(180, 250, "People who can act", "g", 14);
        var e = person(70, 210, 1.4, "G") + rect(30, 210, 90, 10, "fN", { rx: 3 }) + WK("rp", 120, 150, doc(-14, -18, 28, 36, "fW sN", 3)) +
          rect(220, 120, 110, 100, "fM", { rx: 6 }) + rect(232, 134, 86, 30, "fW", { rx: 3, opacity: 0.5 }) + rect(232, 174, 86, 30, "fW", { rx: 3, opacity: 0.5 }) + noB(330, 116, 12) +
          TX(275, 244, "Nobody reads it", 14, "fO");
        return R("0-0", "f", a) + R("1-1", "f", b) + R("2-2", "pop", c) + R("3-3", "f", d) + R("4", "f", e);
      },
      on: function (A) {
        if (A.k === 1) A.walk(".n-tm7", [[30, 214], [-60, 214], [-140, 214]], 2.4, {});
        if (A.k === 4) A.walk(".n-rp", [[120, 150], [200, 130], [262, 150]], 1.8, { loop: true });
      }
    });

    /* V8 · lines 23-24 — a causal loop: evidence -> review -> decision -> improve -> embed -> measured again; embedded means no supervision needed
       Template: https://dribbble.com/shots/26275497-Workflow-AI-Animation (data advanced through stages) */
    P.push({
      svg: function () {
        var R4 = ringPts(180, 146, 78, 4), a = loopRing(180, 146, 78, 4, "sG");
        ["1 Measure", "2 Review", "3 Improve", "4 Embed"].forEach(function (n, i) { a += chip(R4[i][0], R4[i][1], n, "g", 14); });
        a += WK("art", 180, 90, card(-20, -13, 40, 26, "d", { rx: 6 })) ;
        var b = doc(40, 70, 100, 130, "fW sN", 4) + R("1", "gx", rect(54, 170, 72, 12, "fG", { rx: 4 })) + TX(90, 222, "Updated procedure", 14, "fG") +
          crowd(200, 196, 3, 44, 1.3, "G") + G("ghost", person(318, 140, 1, "M", { clip: true })) + noB(330, 92, 10) + TX(244, 236, "Team habit", 15, "fG");
        return R("0-0", "f", a) + R("1", "f", b);
      },
      on: function (A) { if (A.k === 0) A.walk(".n-art", ringPts(180, 146, 50, 48), 6, { loop: true }); }
    });

    /* V9 · lines 25-28 — phase ten is not "the end"; evidence returns to strategy, architecture, scope or design; continuous disciplines; next: why decay?
       Template: https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5 (branch back to an earlier commit) */
    P.push({
      svg: function () {
        var s = R("1-1", "f", G("tg", tiles([9])));
        s += R("0-0", "pop", card(70, 60, 220, 70, "g") + circ(100, 95, 18, "fW") + TX(100, 101, "10", 16, "nh fG") + TX(200, 90, "Sustainable", 16, "nh fW") + TX(200, 112, "Performance", 16, "nh fW") +
          card(110, 150, 140, 44, "po") + TX(180, 178, "The end?", 18, "fO") + strike(118, 172, 242, 172) + carrow(296, 112, 350, 220, 250, 230, "sG", 3, true) + chip(160, 240, "Learning continues", "g", 14));
        s += R("1-1", "f", line(180, 236, 180, 58, "sO", { "stroke-width": 4 }) + [59, 103, 147, 235].map(function (y) { return arrow(180, y, 172, y, "sO", 3); }).join("") +
          [40, 84, 128, 216].map(function (y) { return rect(10, y - 2, 162, 42, "f0 sO", { rx: 9, "stroke-width": 3 }); }).join(""));
        s += R("2-2", "up", card(10, 36, 340, 226, "p") + ["Project management", "People change management", "Leadership"].map(function (n, j) {
          return rect(24, 70 + j * 62, 312, 44, j === 0 ? "fN" : j === 1 ? "fG" : "fD", { rx: 22 }) + TX(180, 98 + j * 62, n, 16, "nh fW");
        }).join("") + TX(180, 254, "Across all ten phases", 13, "fN"));
        s += R("3", "pop", crowd(52, 120, 5, 64, 1.1, "N") + [0, 1, 2, 3, 4].map(function (j) { return okB(64 + j * 64, 74, 9); }).join("") +
          line(30, 236, 330, 236, "sN", { "stroke-width": 2 }) + path("M30 220 C120 216 200 196 330 160", "sO f0", { "stroke-width": 4 }) + qB(300, 194, 14) + TX(150, 254, "Why decay?", 15, "fO"));
        return s;
      }
    });

    define({
      id: "W14O1a", kicker: "PHASE TEN", aria: "Phase ten of the BPM framework, shown literally: the Qasr journey, phase nine leading to phase ten, honest Qasr figures, a continuing process owner, a causal management loop and the return route to earlier phases.",
      panels: P,
      lines: [
        [0, 0, "Week 14: after programmes"], [0, 1, "Qasr's journey so far"],
        [1, 0, "Keep the gain alive"], [1, 1, "Project ends, process slips"], [1, 2, "Times rising again"],
        [2, 0, "Phase ten of ten"], [2, 1, "After Realize Value"], [2, 2, "Evidence, not announcements"], [2, 3, "Hold gains amid change"],
        [3, 0, "Supervised speed"], [3, 1, "Who protects it now?"],
        [4, 0, "Baseline: 82 minutes"], [4, 1, "Month 5: 24 minutes"], [4, 2, "No permanent guarantee"], [4, 3, "Month 22: 39"],
        [5, 0, "The gain was real"], [5, 1, "Check the arrangements"], [5, 2, "Into normal management"],
        [6, 0, "Programmes end; duty continues"], [6, 1, "Accountable process owner"], [6, 2, "Authority to act"], [6, 3, "Regular evidence review"], [6, 4, "Unused reports protect nothing"],
        [7, 0, "Measure, review, improve, embed"], [7, 1, "Normal working practice"],
        [8, 0, "Learning never finishes"], [8, 1, "Revisit earlier phases"], [8, 2, "Continuous disciplines remain"], [8, 3, "Next: why decay?"]
      ]
    });
  })();

  /* ==================================================================
     W14O2d · EXHIBIT 14: TWENTY-TWO MONTHS OF GRADUAL DECAY  (audit 3.3/10)
     27 lines -> 8 visuals. One honest scale for every arrival figure, kiosk
     figures on their own scale, documented facts kept apart from inference,
     one combined +13 (never split), +2 unexplained.
     ================================================================== */
  (function () {
    var P = [];
    function stampW(x, y, txt, v, rot) { var w = tw(txt, 15) + 26; return G("", rect(x - w / 2, y - 15, w, 30, "f0 " + (v || "sO"), { rx: 6, "stroke-width": 3 }) + TX(x, y + 5.5, txt, 15, "nh " + (v === "sG" ? "fG" : "fO")), { transform: "rotate(" + (rot === undefined ? -7 : rot) + " " + x + " " + y + ")" }); }

    /* V1 · lines 0-2 — three protections; documented evidence vs possible explanations; explain without blaming
       Template: https://motionarray.com/after-effects-templates/infographics-pack-135055/ (callout columns) */
    P.push({
      svg: function () {
        var a = path("M40 92 L180 46 L320 92 Z", "fG") + TX(180, 82, "Improved process", 15, "nh fW") + rect(30, 222, 300, 14, "fN", { rx: 4 });
        [["Process ownership", 82], ["Active measurement", 180], ["Change rules", 280]].forEach(function (p) { a += R("0", "gy", rect(p[1] - 22, 96, 44, 126, "fN", { rx: 4 })) + chip(p[1], 140 + (p[1] === 180 ? 34 : 0), p[0], "p", 13); });
        var b = card(10, 40, 164, 214, "pg") + card(186, 40, 164, 214, "pm", { "stroke-dasharray": "6 5" }) + TX(92, 64, "Documented", 15, "fG") + TX(92, 82, "evidence", 15, "fG") +
          TX(268, 64, "Possible", 15, "fM") + TX(268, 82, "explanations", 15, "fM"), i;
        for (i = 0; i < 4; i++) b += R("1", "pop", icon("pin", 42, 116 + i * 34, 0.7, "fG") + line(60, 114 + i * 34, 150, 114 + i * 34, "sN", { "stroke-width": 5, "stroke-linecap": "round", opacity: 0.5 }));
        for (i = 0; i < 3; i++) b += R("1", "pop", circ(214, 116 + i * 40, 8, "f0 sM", { "stroke-width": 2.4, "stroke-dasharray": "3 3" }) + line(230, 116 + i * 40, 326, 116 + i * 40, "sM", { "stroke-width": 5, "stroke-linecap": "round", "stroke-dasharray": "6 6" }));
        var c = card(10, 40, 164, 214, "po") + crowd(40, 200, 3, 46, 1.2, "M") + arrow(30, 70, 70, 140, "sO", 4) + noB(152, 52, 12) + TX(92, 236, "Blame people", 15, "fO") +
          card(186, 40, 164, 214, "pg") + G("spin", gear(250, 140, 26, "fN")) + G("spinr", gear(294, 170, 18, "fG")) + icon("mag", 236, 182, 1.6) + okB(330, 52, 12) + TX(268, 236, "Explain system", 15, "fG");
        return R("0-0", "f", a) + R("1-1", "f", b) + R("2", "pop", c);
      }
    });

    /* V2 · lines 3-6 — one honest scale: 14 properties, 82 baseline, 24 at month 5, 28 / 61% at month 13, 39 / 48% at month 22 (kept MATCH)
       Template: https://observablehq.com/@d3/learn-d3-animation (series built point by point) */
    P.push({
      svg: function () {
        var s = bars({ x: 30, base: 232, h: 150, max: 90, bw: 56, gap: 24, fs: 24, items: [
          { v: 82, l: "Baseline", r: "0", c: "fM" }, { v: 24, l: "Month 5", r: "1", c: "fG" }, { v: 28, l: "Month 13", r: "2", c: "fO" }, { v: 39, l: "Month 22", r: "3", c: "fO" }] });
        var h = "", i;
        for (i = 0; i < 14; i++) h += hotel(146 + (i % 7) * 28, 62 + Math.floor(i / 7) * 32, 0.6, "fN");
        s += R("0-0", "pop", h + TX(230, 112, "14 properties", 13, "fN"));
        s += R("2", "up", chip(150, 128, "Kiosk 61%", "pm", 13) + line(176, 140, 206, 168, "sM", { "stroke-width": 1.6 })) + R("3", "up", chip(234, 100, "Kiosk 48%", "o", 13) + line(262, 112, 284, 136, "sO", { "stroke-width": 1.6 }));
        return tag("Exhibit 14", "pm") + TX(64, 56, "Arrival minutes", 14, "fN") + s;
      }
    });

    /* V3 · lines 7-10 — rising in each of the last six months; kiosk -17 points; decline shown, cause not; examine arrangements first
       Template: https://motionarray.com/after-effects-templates/scrolling-timeline-1223172/ (dates scroll and settle) */
    P.push({
      svg: function () {
        var a = line(30, 200, 330, 200, "sN", { "stroke-width": 3 }), m;
        for (m = 17; m <= 22; m++) { var x = 40 + (m - 17) * 56; a += R("0", "up", path("M" + (x - 12) + " 176 l12 -18 l12 18", "sO f0", { "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round" })) + TX(x, 224, "M" + m, 14, "fN"); }
        a += chip(180, 100, "Rose every month", "o", 15) + TX(180, 254, "Last six months", 14, "fN");
        var b = bars({ x: 60, base: 232, h: 150, max: 70, bw: 64, gap: 40, fs: 22, items: [{ v: 65, t: "65%", l: "Month 5", r: "1", c: "fG" }, { v: 61, t: "61%", l: "Month 13", r: "1", c: "fO" }, { v: 48, t: "48%", l: "Month 22", r: "1", c: "fO" }] });
        b += line(342, 232 - 65 / 70 * 150, 342, 232 - 48 / 70 * 150, "sO", { "stroke-width": 3 }) + TX(338, 80, "−17 points", 14, "fO e") + TX(110, 56, "Kiosk adoption", 14, "fN");
        var c = card(10, 50, 164, 180, "pg") + TX(92, 80, "What happened", 15, "fG") + icon("chart", 92, 140, 2, "sO") + okB(152, 58, 12) + TX(92, 206, "Established fact", 14, "fG") +
          card(186, 50, 164, 180, "pm") + TX(268, 80, "Why it happened", 15, "fM") + qB(268, 140, 26) + TX(268, 206, "Not proven", 14, "fM");
        var d = card(14, 50, 150, 70, "p") + TX(89, 80, "Ownership", 14, "fN") + TX(89, 100, "arrangements", 13, "fN") + card(14, 140, 150, 70, "p") + TX(89, 170, "Approved", 14, "fN") + TX(89, 190, "changes", 13, "fN") +
          arrow(170, 86, 214, 120, "sG", 3) + arrow(170, 176, 214, 142, "sG", 3) + card(222, 96, 124, 70, "pm", { "stroke-dasharray": "6 5" }) + TX(284, 128, "Causation", 14, "fM") + TX(284, 148, "afterwards", 14, "fM") +
          chip(180, 240, "Examine first", "g", 14);
        return tag("Exhibit 14", "pm") + R("0-0", "f", a) + R("1-1", "f", b) + R("2-2", "pop", c) + R("3", "f", d);
      }
    });

    /* V4 · lines 11-14 — owner promoted nine months before month 22; no replacement, director with 13 reports; a plausible gap; not personal blame
       Template: https://motionarray.com/after-effects-templates/corporate-timeline-255459/ (events placed on a timeline, focus shifts) */
    P.push({
      svg: function () {
        var a = line(30, 180, 330, 180, "sN", { "stroke-width": 3 }) + circ(80, 180, 8, "fN") + TX(80, 206, "Promotion", 14, "fN") + circ(300, 180, 8, "fO") + TX(300, 206, "Month 22", 14, "fO") +
          rect(80, 170, 220, 20, "fO", { opacity: 0.15 }) + TX(190, 164, "9 months", 18, "fO") + WK("pr4", 80, 150, person(0, 0, 1.2, "N")) + chip(310, 104, "Marina GM", "n", 13) + TX(80, 240, "Owner promoted", 14, "fN");
        var b = chair(80, 214, 1.4, "M") + TX(80, 244, "No replacement", 14, "fO") + person(250, 214, 1.6, "N", { tie: true }) + TX(250, 244, "Operations director", 13, "fN"), i, ang;
        for (i = 0; i < 13; i++) { ang = (-160 + i * 140 / 12) * Math.PI / 180; b += circ(250 + 84 * Math.cos(ang), 190 + 84 * Math.sin(ang), 7, "fM"); }
        b += TX(250, 82, "13 reports", 14, "fN");
        var c = "", fn = [["Front", "desk"], ["Kiosk", "team"], ["Room", "cleaning"], ["Guest", "rooms"]];
        fn.forEach(function (f, j) { c += card(14 + j * 86, 108, 76, 58, "p") + TX(52 + j * 86, 132, f[0], 13, "fN") + TX(52 + j * 86, 150, f[1], 13, "fN"); });
        c += path("M20 186 H340", "sG f0", { "stroke-width": 4, "stroke-dasharray": "22 14" }) + TX(180, 212, "Attention keeps breaking", 14, "fO") + R("2-2", "stamp", stampW(180, 72, "PLAUSIBLE, UNPROVEN", "sO", -5));
        var d = person(110, 210, 1.7, "N", { tie: true }) + TX(110, 242, "Operations director", 14, "fN") + card(196, 90, 140, 70, "po") + TX(266, 120, "Neglect?", 16, "fO") + TX(266, 142, "Caused it?", 14, "fO") + noB(330, 96, 12) +
          chip(266, 196, "Not established", "o", 14);
        return tag("Exhibit 14", "pm") + R("0-0", "f", a) + R("1-1", "f", b) + R("2-2", "f", c) + R("3", "pop", d);
      },
      on: function (A) { if (A.k === 0) A.walk(".n-pr4", [[80, 150], [160, 110], [250, 100]], 2.4, {}); }
    });

    /* V5 · lines 15-18 — page four, monthly (kept MATCH); last discussed seven months ago at 28; the loop breaks at review; use, not production
       Template: https://lottiefiles.com/free-animation/process-fmpDUgNx8K (connections drawn and joined) */
    P.push({
      svg: function () {
        var a = person(66, 200, 1.4, "G") + rect(26, 200, 90, 10, "fN", { rx: 3 }) + TX(70, 232, "Monthly analyst", 13, "fG") + cal(70, 92, 1, "fG") + arrow(122, 150, 150, 150, "sN", 3), k;
        for (k = 0; k < 4; k++) a += card(156 + k * 44, 84 + k * 6, 64, 116, k === 3 ? "po" : "p") + TX(188 + k * 44, 106 + k * 6, String(k + 1), 14, k === 3 ? "fO" : "fM");
        a += icon("chart", 322, 150, 1.2) + chip(270, 232, "Page four", "o", 14);
        var b = "";
        for (k = 0; k < 7; k++) b += R("1", "pop", rect(24 + k * 46, 72, 38, 38, "fW sO", { rx: 4, "stroke-width": 1.8 }) + cross(43 + k * 46, 91, 1, "sO"));
        b += TX(180, 150, "Last discussed at", 16, "fN") + TX(180, 196, "28 min", 36, "fO") + TX(180, 230, "seven months ago", 14, "fM");
        var c = "", st = [["Measure", "results", 50, "g"], ["Review", "evidence", 136, "o"], ["Decide", "action", 222, "m"], ["Take", "action", 308, "m"]];
        st.forEach(function (n) { var cl = n[3] === "g" ? "nh fW" : n[3] === "o" ? "fO" : "fM"; c += card(n[2] - 40, 116, 80, 58, n[3] === "o" ? "po" : n[3] === "g" ? "g" : "pm") + TX(n[2], 141, n[0], 14, cl) + TX(n[2], 159, n[1], 13, cl); });
        c += arrow(92, 145, 96, 145, "sG", 3) + line(176, 145, 196, 145, "sM", { "stroke-width": 3, "stroke-dasharray": "3 4" }) + line(262, 145, 268, 145, "sM", { "stroke-width": 3, "stroke-dasharray": "3 4" }) +
          G("blink", icon("spark", 136, 100, 0.9)) + okB(80, 116, 10) + noB(166, 116, 10) + chip(180, 220, "Loop broken at review", "o", 14);
        var d = card(10, 50, 164, 180, "pg") + person(92, 150, 1.4, "G") + doc(118, 90, 30, 38, "fW sN", 3) + okB(152, 58, 12) + TX(92, 206, "Reporting done", 14, "fG") +
          card(186, 50, 164, 180, "po") + icon("eye", 268, 120, 1.8) + noB(330, 58, 12) + TX(268, 206, "Information used?", 14, "fO");
        return tag("Exhibit 14", "pm") + R("0-0", "f", a) + R("1-1", "f", b) + R("2-2", "f", c) + R("3", "pop", d);
      }
    });

    /* V6 · lines 19-22 — four approved changes after rollout; what each was; together 13 of 15; examine, don't condemn
       Template: https://observablehq.com/@joaormendes/sankey-animation-particles-generation (flows merge into one) */
    var CH = [["passport", "Passport", "re-verification"], ["coin", "Waiver limit", "AED 400 → 150"], ["star", "Loyalty", "enrolment prompt"], ["desk", "Permanent desk", "two heritage hotels"]];
    P.push({
      svg: function () {
        var a = line(30, 210, 330, 210, "sN", { "stroke-width": 3 }) + circ(60, 210, 8, "fG") + TX(60, 236, "Month 5", 14, "fG") + circ(310, 210, 8, "fO") + TX(310, 236, "Month 22", 14, "fO") +
          TX(60, 186, "Full rollout", 14, "fG");
        CH.forEach(function (c, j) { a += R("0", "dn", card(96 + j * 52, 120, 44, 44, "o") + icon(c[0], 118 + j * 52, 142, 0.8, c[0] === "passport" ? "fW" : undefined) + line(118 + j * 52, 168, 118 + j * 52, 204, "sO", { "stroke-width": 2, "stroke-dasharray": "3 3" })); });
        a += TX(196, 98, "Dates not given", 13, "fM");
        var b = "";
        CH.forEach(function (c, j) {
          var x = 14 + (j % 2) * 172, y = 44 + Math.floor(j / 2) * 104;
          b += R("1", "pop", card(x, y, 160, 92, "p") + icon(c[0], x + 26, y + 30, 1.05) + TX(x + 46, y + 35, c[1], 13, "fN s") + TX(x + 80, y + 70, c[2], 13, "fO"));
        });
        var c = rect(30, 120, 13 * 18, 50, "fO", { rx: 8 }) + TX(30 + 117, 152, "+13 combined", 18, "nh fW") + rect(268, 120, 36, 50, "fM", { rx: 6 }) + TX(286, 152, "+2", 16, "nh fW") +
          TX(180, 96, "15 minutes added", 16, "fN") + TX(150, 200, "Months 5 to 22", 14, "fN");
        var d = "";
        CH.forEach(function (c, j) { d += card(14 + j * 86, 60, 76, 76, "p") + icon(c[0], 52 + j * 86, 90, 1) + qB(52 + j * 86, 124, 10); });
        d += chip(180, 176, "Examine combined effect", "g", 14) + chip(180, 220, "Not every approval wrong", "pm", 13);
        return tag("Exhibit 14", "pm") + R("0-0", "f", a) + R("1-1", "f", b) + R("2-2", "gx", c) + R("3", "up", d);
      }
    });

    /* V7 · lines 23-24 — two minutes unexplained (kept MATCH: no staff blame); no per-change split exists
       Template: https://observablehq.com/@d3/path-tween (one shape cut, then restored) */
    P.push({
      svg: function () {
        var a = rect(30, 110, 13 * 18, 50, "fO", { rx: 8, opacity: 0.35 }) + rect(268, 110, 50, 50, "fM", { rx: 6 }) + TX(293, 142, "+2", 18, "nh fW") + G("blink", rect(264, 106, 58, 58, "f0 sO", { rx: 8, "stroke-width": 3 })) +
          TX(293, 196, "Still unexplained", 13, "fM") + card(30, 196, 190, 52, "po") + TX(125, 228, "Staff behaviour?", 16, "fO") + noB(214, 202, 11) + TX(120, 92, "Speculation avoided", 14, "fN");
        var b = rect(40, 110, 13 * 20, 56, "fO", { rx: 8 }) + TX(170, 146, "+13 combined", 20, "nh fW");
        [105, 170, 235].forEach(function (x) { b += line(x, 98, x, 178, "sW", { "stroke-width": 3, "stroke-dasharray": "6 5" }); });
        b += R("1", "pop", noB(170, 92, 14) + chip(180, 220, "No per-change split", "o", 15)) + TX(72, 196, "? min", 14, "fM") + TX(138, 196, "? min", 14, "fM") + TX(202, 196, "? min", 14, "fM") + TX(268, 196, "? min", 14, "fM");
        return tag("Exhibit 14", "pm") + R("0-0", "f", a) + R("1", "f", b);
      }
    });

    /* V8 · lines 25-26 — the four-part diagnosis assembles; next: choose a priority that respects regulation
       Template: https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP (parts resolve into a verified whole) */
    P.push({
      svg: function () {
        var a = "", Q = [["Measured", "deterioration", "o"], ["Weakened", "ownership", "n"], ["Inactive", "review", "n"], ["Cumulative", "changes", "o"]];
        Q.forEach(function (q, j) {
          var x = 40 + (j % 2) * 144, y = 46 + Math.floor(j / 2) * 92;
          a += R("0", j % 2 ? "r" : "l", card(x, y, 136, 84, q[2]) + TX(x + 68, y + 38, q[0], 15, "nh fW") + TX(x + 68, y + 58, q[1], 14, "nh fW"));
        });
        a += chip(180, 248, "Governance diagnosis", "g", 15);
        var b = line(180, 110, 180, 226, "sN", { "stroke-width": 5 }) + path("M160 234 h40 l-20 -16 Z", "fN") + line(70, 110, 290, 110, "sN", { "stroke-width": 5, "stroke-linecap": "round" }) +
          card(14, 120, 116, 60, "g") + TX(72, 156, "Chosen priority", 14, "nh fW") + card(242, 120, 92, 60, "n") + icon("shield", 288, 150, 1.4) + TX(72, 204, "One intervention", 13, "fG") + TX(288, 204, "Regulatory duty", 13, "fN") +
          chip(180, 74, "Decide next", "n", 15);
        return R("0-0", "f", a) + R("1", "pop", b);
      }
    });

    define({
      id: "W14O2d", kicker: "EXHIBIT 14", aria: "The Qasr evidence on one honest scale: arrival 82, 24, 28 and 39 minutes, kiosk adoption 65, 61 and 48 percent, an owner gap, an unread measure and four approved changes that together explain 13 of 15 added minutes.",
      panels: P,
      lines: [
        [0, 0, "Three protections"], [0, 1, "Evidence versus explanation"], [0, 2, "Explain, don't blame"],
        [1, 0, "14 properties, 82 minutes"], [1, 1, "Month 5: 24"], [1, 2, "Month 13: 28, 61%"], [1, 3, "Month 22: 39, 48%"],
        [2, 0, "Six rising months"], [2, 1, "Kiosk: minus 17 points"], [2, 2, "Decline shown, cause not"], [2, 3, "Check arrangements first"],
        [3, 0, "Owner promoted"], [3, 1, "Director: 13 reports"], [3, 2, "Plausible governance gap"], [3, 3, "Not personal blame"],
        [4, 0, "Page four, monthly"], [4, 1, "Last discussed at 28"], [4, 2, "Loop broken at review"], [4, 3, "Use, not production"],
        [5, 0, "Four approved changes"], [5, 1, "What changed"], [5, 2, "13 of 15 minutes"], [5, 3, "Examine, don't condemn"],
        [6, 0, "Two minutes unexplained"], [6, 1, "No per-change split"],
        [7, 0, "Four-part diagnosis"], [7, 1, "Next: choose priority"]
      ]
    });
  })();

  /* ==================================================================
     W14O1b · FOUR SIGNALS THAT THE GAIN IS SLIPPING  (audit 4.1/10)
     26 lines -> 8 visuals. Each signal gets its own large single-purpose
     instrument: honest-scale arrival bars, an adoption share bar, an
     exception histogram with a designed range, and a variant register.
     ================================================================== */
  (function () {
    var P = [];
    function stampW(x, y, txt, v, rot) { var w = tw(txt, 15) + 26; return G("", rect(x - w / 2, y - 15, w, 30, "f0 " + (v || "sO"), { rx: 6, "stroke-width": 3 }) + TX(x, y + 5.5, txt, 15, "nh " + (v === "sG" ? "fG" : "fO")), { transform: "rotate(" + (rot === undefined ? -7 : rot) + " " + x + " " + y + ")" }); }
    function road(y, x0, x1) { return rect(x0, y - 7, x1 - x0, 14, "fL", { rx: 7 }) + line(x0 + 8, y, x1 - 8, y, "sM", { "stroke-width": 2, "stroke-dasharray": "8 8" }); }

    /* V1 · lines 0-2 — producing a report vs using it; four early-warning signals; too many measures bury the one you need
       Template: https://lottiefiles.com/free-animation/dashboard-krY5yHjJRp (dashboard brought into focus) */
    P.push({
      svg: function () {
        var a = card(10, 50, 164, 190, "pm") + doc(54, 80, 74, 96, "fW sN", 4) + okB(150, 60, 12) + TX(92, 212, "Report produced", 14, "fM") +
          card(186, 50, 164, 190, "pg") + person(236, 200, 1.5, "G") + rect(276, 120, 10, 70, "fN", { rx: 3 }) + WK("lev", 281, 124, line(0, 0, 22, -26, "sO", { "stroke-width": 6, "stroke-linecap": "round" }) + circ(22, -26, 7, "fO")) +
          TX(268, 212, "Report used", 14, "fG");
        var b = "", S = [["Arrival", "time", "clock"], ["Kiosk", "adoption", "kiosk"], ["Exception", "volume", "spark"], ["Process", "variants", "flag"]];
        S.forEach(function (s, j) {
          var x = 50 + j * 87;
          b += R("1", "up", rect(x - 13, 70, 26, 120, "fW sN", { rx: 13, "stroke-width": 2 }) + circ(x, 196, 18, "fO") + rect(x - 6, 120 - j * 8, 12, 80 + j * 8, "fO", { rx: 4 }) +
            icon(s[2], x, 196, 0.6, s[2] === "kiosk" ? "fW" : "fW") + TX(x, 232, s[0], 13, "fN") + TX(x, 248, s[1], 13, "fN"));
        });
        var c = card(130, 120, 100, 80, "g") + icon("clock", 180, 160, 1.6), i;
        for (i = 0; i < 30; i++) c += R("2", "dn", rect(30 + (i % 10) * 30 + (i % 3) * 3, 70 + Math.floor(i / 10) * 40 + (i % 4) * 4, 26, 22, "fL sM", { rx: 3, "stroke-width": 1.2 }));
        c += noB(330, 58, 12) + chip(180, 244, "Signal buried", "po", 15);
        return R("0-0", "f", a) + R("1-1", "f", b) + R("2", "f", c);
      },
      on: function (A) { if (A.k === 0) A.turn(".n-lev", 281, 124, 50, { from: 0, dur: 1.4, ease: "back" }); }
    });

    /* V2 · lines 3-6 — honest scale 82 -> 24 (kept MATCH), then 39; one measure for the whole journey; waiting hides between departments
       Template: https://motionarray.com/after-effects-templates/infographics-v2-556482/ (statistic modules scaled in) */
    P.push({
      svg: function () {
        var a = bars({ x: 50, base: 232, h: 150, max: 90, bw: 70, gap: 30, fs: 26, items: [
          { v: 82, l: "Baseline", r: "0", c: "fM" }, { v: 24, l: "Month 5", r: "0", c: "fG" }, { v: 39, l: "Month 22", r: "1", c: "fO" }] }) + TX(70, 56, "Arrival minutes", 14, "fN");
        var st = [["Hotel lobby", 46], ["Kiosk step", 132], ["Front desk", 218], ["Guest room", 310]], b = road(170, 8, 352);
        st.forEach(function (s) { b += card(s[1] - 40, 150, 80, 40, "p") + TX(s[1], 175, s[0], 13, "fN"); });
        b += R("2-2", "f", line(20, 120, 340, 120, "sG", { "stroke-width": 3 }) + line(20, 110, 20, 130, "sG", { "stroke-width": 3 }) + line(340, 110, 340, 130, "sG", { "stroke-width": 3 }) +
          icon("clock", 180, 92, 1.3) + chip(180, 228, "End-to-end measure", "g", 14));
        b += R("3", "f", st.map(function (s) { return okB(s[1] + 30, 150, 8); }).join("") + [88, 176, 266].map(function (x) { return rect(x - 12, 196, 24, 22, "fO", { rx: 4 }); }).join("") +
          TX(180, 244, "Waiting between steps", 14, "fO") + TX(180, 112, "Each step looks fine", 14, "fG"));
        return tag("Qasr evidence", "pm") + R("0-1", "f", a) + R("2", "f", b);
      }
    });

    /* V3 · lines 7-8 — PROPOSED: investigate when more than 10% worse; 24 + 10% = 26.4, and month 22 is 39 (kept MATCH)
       Template: https://motionarray.com/after-effects-templates/infographics-elements-789489/ (data revealed into shapes) */
    P.push({
      svg: function () {
        var a = R("0", "stamp", stampW(110, 64, "PROPOSED RULE")) + card(40, 104, 280, 76, "n") + TX(180, 136, "More than 10% worse", 17, "nh fW") + TX(180, 160, "than delivered", 14, "nh fD") +
          arrow(180, 186, 180, 214, "sO", 3) + chip(180, 234, "Owner investigates", "o", 14);
        var b = bars({ x: 50, base: 232, h: 140, max: 42, bw: 70, gap: 30, fs: 24, ls: 13, items: [
          { v: 24, l: "Month 5", r: "1", c: "fG" }, { v: 26.4, t: "26.4", l: "10% line", r: "1", c: "fD" }, { v: 39, l: "Month 22", r: "1", c: "fO" }] }) +
          line(40, 232 - 26.4 / 42 * 140, 330, 232 - 26.4 / 42 * 140, "sO", { "stroke-width": 2.4, "stroke-dasharray": "6 5" }) + chip(110, 60, "24 + 2.4", "d", 14) + G("wob", icon("bell", 310, 70, 1.2, "fO"));
        return tag("Qasr + proposal", "po") + R("0-0", "f", a) + R("1", "f", b);
      }
    });

    /* V4 · lines 9-11 — adoption is the share using the redesign (kept MATCH); 65 -> 61 -> 48 (kept MATCH); 17 points fewer users, fewer benefits
       Template: https://observablehq.com/@d3/pie-chart-update (share tweened between datasets) */
    P.push({
      svg: function () {
        var s = TX(180, 58, "Guests using kiosks", 15, "fN") + rect(30, 92, 300, 46, "fM", { rx: 8 }) + rect(30, 92, 300 * 0.65, 46, "abar fG", { rx: 8 }) +
          icon("kiosk", 50, 115, 0.9, "fW") + TX(66, 121, "Kiosk users", 15, "nh fW s") + icon("desk", 300, 112, 0.8, "fW") + TX(170, 182, "65", 40, "fG apct") + TX(204, 182, "%", 22, "fG s");
        s += R("1", "up", [["Month 5", 65, "fG"], ["Month 13", 61, "fO"], ["Month 22", 48, "fO"]].map(function (m) { return line(30 + 3 * m[1], 86, 30 + 3 * m[1], 144, m[2] === "fG" ? "sG" : "sO", { "stroke-width": 2.4 }); }).join("") +
          TX(213, 78, "61", 13, "fO") + TX(174, 82, "48", 13, "fO"));
        s += R("2", "pop", line(174, 200, 225, 200, "sO", { "stroke-width": 3 }) + line(174, 194, 174, 206, "sO", { "stroke-width": 3 }) + line(225, 194, 225, 206, "sO", { "stroke-width": 3 }) +
          chip(110, 228, "−17 points", "o", 14) + icon("clock", 256, 228, 1) + TX(330, 234, "Benefit shrinks", 13, "fO e") + G("rise", icon("spark", 288, 210, 0.6)));
        return tag("Qasr evidence", "pm") + s;
      },
      on: function (A) {
        var v = A.k >= 1 ? 48 : 65;
        A.bar(".abar", "width", 300 * v / 100, { from: A.k === 1 && A.fresh ? 195 : undefined, dur: 2.2 });
        A.num(".apct", v, { from: A.k === 1 && A.fresh ? 65 : undefined, dur: 2.2 });
        A.fill(".apct", v < 65 ? "var(--o)" : "var(--g)");
      }
    });

    /* V5 · lines 12-14 — PROPOSED trigger: 5 points below the plateau = 60; points are a direct difference; reading it right avoids a late investigation
       Template: https://observablehq.com/@d3/easing-animations (same path, different timing) */
    P.push({
      svg: function () {
        var a = line(70, 60, 70, 236, "sN", { "stroke-width": 3 }) + line(70, 80, 300, 80, "sG", { "stroke-width": 2.6, "stroke-dasharray": "7 5" }) + TX(310, 85, "65", 16, "fG s") + TX(80, 74, "Rollout plateau", 13, "fG s") +
          R("0", "l", line(70, 128, 300, 128, "sO", { "stroke-width": 3 }) + TX(310, 133, "60", 16, "fO s") + chip(180, 152, "Investigate below", "o", 14)) + arrow(56, 84, 56, 124, "sO", 3) + TX(48, 108, "5", 15, "fO e") +
          R("0", "stamp", stampW(200, 204, "PROPOSED TRIGGER", "sO", -4));
        var b = card(30, 52, 300, 90, "pg") + TX(180, 92, "65 − 5 points = 60", 22, "fG") + TX(180, 122, "Direct difference", 14, "fG") +
          card(30, 152, 300, 90, "pm") + TX(180, 192, "65 − 5% of 65 = 61.75", 19, "fM") + TX(180, 222, "Relative change", 14, "fM") + okB(318, 60, 11) + noB(318, 160, 11);
        var c = line(30, 120, 330, 120, "sN", { "stroke-width": 3 }) + TX(30, 104, "65", 15, "fG s") + arrow(300, 136, 336, 136, "sO", 2.6) +
          icon("flag", 140, 98, 1.2, "fG") + TX(140, 150, "At 60", 15, "fG") + chip(140, 180, "Investigate now", "g", 13) +
          icon("flag", 286, 98, 1.2, "fM") + TX(286, 150, "Misread rule", 15, "fM") + chip(276, 180, "Too late", "pm", 13) + WK("adot", 30, 120, circ(0, 0, 8, "fO"));
        return tag("Points, not percent", "pm") + R("0-0", "f", a) + R("1-1", "pop", b) + R("2", "f", c);
      },
      on: function (A) { if (A.k === 2) A.walk(".n-adot", [[30, 120], [330, 120]], 4, { loop: true }); }
    });

    /* V6 · lines 15-18 — exceptions leave the normal path (kept MATCH); beyond the designed range; illustration: manual fixes; investigate the pattern
       Template: https://lottiefiles.com/free-animation/3d-camera-factory-2I4Nonw7Ad (items progress, some diverted) */
    P.push({
      svg: function () {
        var a = road(110, 14, 346) + TX(180, 92, "Normal path", 14, "fG") + path("M150 116 C170 160 200 180 240 196", "sO f0", { "stroke-width": 4, "stroke-dasharray": "6 5" }) + rect(240, 176, 96, 46, "fO", { rx: 8 }) +
          TX(288, 204, "Exception cases", 13, "nh fW");
        for (var i = 0; i < 4; i++) a += WK("cs" + i, 20, 110, circ(0, 0, 7, i === 2 ? "fO" : "fN"));
        var hb = [16, 18, 17, 20, 26, 32, 40], b = card(14, 40, 332, 210, "p") + rect(30, 230 - 22 * 4, 300, 6 * 4, "fG", { opacity: 0.2 }) + TX(36, 230 - 22 * 4 - 6, "Designed range", 13, "fG s");
        for (i = 0; i < hb.length; i++) b += R("1", "gy", rect(44 + i * 40, 230 - hb[i] * 4, 28, hb[i] * 4, i >= 4 ? "fO" : "fN", { rx: 3 }));
        b += line(30, 230, 330, 230, "sN", { "stroke-width": 2 }) + R("1-1", "up", chip(120, 66, "Beyond range", "o", 14));
        var c = card(14, 40, 332, 210, "p") + card(30, 80, 110, 60, "o") + TX(85, 106, "Recurring", 14, "nh fW") + TX(85, 124, "situation", 14, "nh fW") + arrow(146, 110, 186, 110, "sO", 3) +
          rect(192, 84, 30, 52, "fN", { rx: 4 }) + noB(207, 76, 9) + TX(207, 154, "Standard", 13, "fN") + TX(207, 170, "procedure", 13, "fN");
        for (i = 0; i < 3; i++) c += R("2", "pop", person(258 + i * 30, 132, 0.8, "D") + icon("wrench", 262 + i * 30, 98, 0.5, "sD"));
        c += TX(288, 196, "Manual fixes", 14, "fD");
        var d = card(14, 40, 332, 210, "p") + crowd(60, 214, 2, 40, 1.1, "M") + noB(118, 160, 11) + TX(80, 238, "Not personal", 14, "fM") +
          [0, 1, 2, 3].map(function (j) { return card(190 + (j % 2) * 70, 70 + Math.floor(j / 2) * 64, 56, 50, "po") + icon("spark", 218 + (j % 2) * 70, 95 + Math.floor(j / 2) * 64, 0.8); }).join("") +
          G("bob", icon("mag", 258, 120, 2.6)) + TX(260, 238, "Same pattern", 14, "fO");
        return R("0-0", "f", a) + R("1-1", "f", b) + R("2-2", "f", tag("Illustrative example", "pm") + c) + R("3", "pop", d);
      },
      on: function (A) {
        if (A.k === 0) for (var i = 0; i < 4; i++) A.walk(".n-cs" + i, i === 2 ? [[20, 110], [150, 116], [196, 172], [230, 190]] : [[20, 110], [346, 110]], 3, { loop: true, offset: i * 0.75 });
      }
    });

    /* V7 · lines 19-22 — an unregistered variant; even one matters (kept MATCH); desks at two heritage properties need visibility; registration not established
       Template: https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5 (a branch splits from the main line) */
    P.push({
      svg: function () {
        var a = icon("book", 54, 96, 2.2) + TX(66, 140, "Variant register", 13, "fN") + line(100, 180, 340, 180, "sN", { "stroke-width": 5, "stroke-linecap": "round" }) +
          [130, 210, 290].map(function (x) { return circ(x, 180, 8, "fN"); }).join("") + TX(220, 214, "Registered process", 14, "fN");
        a += R("0", "dr", path("M170 180 C190 130 230 110 300 104", "sO f0 dw", { pathLength: 1, "stroke-width": 4 })) + R("0", "pop", circ(300, 104, 9, "fO") + TX(300, 80, "Not recorded", 14, "fO"));
        a += R("1-1", "pop", icon("eye", 120, 70, 1.6) + qB(150, 56, 10) + chip(120, 250, "Unknown, unassessed", "po", 13));
        var b = "", i, x, y, her;
        for (i = 0; i < 14; i++) {
          x = 38 + (i % 7) * 47; y = i < 7 ? 128 : 212; her = i === 2 || i === 11;
          b += hotel(x, y, 1.1, her ? "fD" : "fN") + (her ? icon("desk", x, y - 50, 0.85) + G("blink", circ(x + 16, y - 36, 5, "fO")) : "");
        }
        b += chip(180, 244, "Make local differences visible", "d", 13);
        var c = icon("book", 80, 130, 3) + TX(80, 190, "Variant register", 15, "fN") + icon("desk", 210, 110, 1.6) + TX(210, 150, "Heritage desks", 14, "fN") +
          qB(300, 120, 22) + chip(250, 210, "Status not established", "pm", 14);
        return tag("Qasr + proposal", "po") + R("0-1", "f", a) + R("2-2", "f", b) + R("3", "pop", c);
      }
    });

    /* V8 · lines 23-25 — read the four signals together against the delivered design; a named owner reviews and acts; next: set triggers (kept MATCH)
       Template: https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ (panels combined into one dashboard) */
    P.push({
      svg: function () {
        var s = card(14, 40, 332, 194, "p") + line(30, 112, 330, 112, "sG", { "stroke-width": 3, "stroke-dasharray": "8 5" }) + TX(36, 102, "Delivered design", 13, "fG s"), S = [["Arrival time", 0.7], ["Kiosk adoption", 0.5], ["Exception volume", 0.6], ["Process variants", 0.35]];
        S.forEach(function (g, j) {
          var x = 56 + j * 78;
          s += line(x, 72, x, 190, "sM", { "stroke-width": 2 }) + circ(x, 112 + g[1] * 60, 8, "fO") + TX(x, j % 2 ? 222 : 204, g[0], 13, "fN");
          s += R("2", "f", line(x - 26, 112 + 0.3 * 60, x + 26, 112 + 0.3 * 60, "sO", { "stroke-width": 2.4, "stroke-dasharray": "4 3" }));
        });
        s += R("1-1", "pop", person(326, 120, 1, "G") + chip(250, 252, "Owner reviews, acts", "g", 13));
        s += R("2", "up", chip(110, 252, "Trigger lines next", "o", 13));
        return s;
      }
    });

    define({
      id: "W14O1b", kicker: "FOUR SIGNALS", aria: "Four sustaining signals, each on its own instrument: end-to-end arrival time on one honest scale, kiosk adoption share, exception volume against its designed range, and process variants checked against the register.",
      panels: P,
      lines: [
        [0, 0, "Report versus use"], [0, 1, "Signals that warn early"], [0, 2, "Don't measure everything"],
        [1, 0, "Arrival: 82 → 24"], [1, 1, "Month 22: 39"], [1, 2, "Whole guest journey"], [1, 3, "Waiting hides between"],
        [2, 0, "Proposed: 10% rule"], [2, 1, "Boundary: 26.4 minutes"],
        [3, 0, "Adoption: who uses it"], [3, 1, "Kiosk: 65 → 48"], [3, 2, "Fewer users, fewer benefits"],
        [4, 0, "Trigger: 5 points"], [4, 1, "Points, not percent"], [4, 2, "Avoid late investigation"],
        [5, 0, "Exceptions leave path"], [5, 1, "Beyond designed range"], [5, 2, "Illustrative: manual fixes"], [5, 3, "Investigate the pattern"],
        [6, 0, "Unregistered variant"], [6, 1, "Unknown can't be assessed"], [6, 2, "Desks at two properties"], [6, 3, "Registration not established"],
        [7, 0, "Read them together"], [7, 1, "Owner reviews, acts"], [7, 2, "Next: set triggers"]
      ]
    });
  })();

})();
// END FILE: w14-claude-v2-part4.js
