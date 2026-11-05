// OPER621 · Week 1 · Fundamentals of Process Management — animated teaching scenes (v4)
// File: w01-v4-part1.js  ·  Scenes: W1INTRO, O1a, O1b
// Standalone part: registers its own scenes on window.VL_SCENES and appends its own
// scoped rules into the single shared <style id="vl-sc-w01">. Parts may be concatenated.
// Contract: VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
// GSAP (window.gsap) is used when present; CSS transitions otherwise; prefers-reduced-motion
// applies every state instantly with no ambient loops. Each visual names the benchmark
// template it adapts (with URL) in a comment above its drawing code.
(function () {
"use strict";
var PART = "v4p1";
  // ===== shared engine (self-contained copy for this part) =====
  var W = window;
  W.VL_SCENES = W.VL_SCENES || {};
  var REG = W.VL_SCENES;
  var C = {
    navy: "#1f4e79", navy2: "#2d6a9f", deep: "#16324d", ink: "#1b2a3a", orange: "#c0502a",
    coral: "#e0734f", green: "#317c61", mint: "#e1f0e8", gold: "#e5b76c", amber: "#a8741a",
    sun: "#f2c46d", paper: "#fbf8f1", cream: "#f3ecdf", blue: "#dbe7f2", sky: "#eaf2f8",
    slate: "#5d7389", muted: "#91aabd", white: "#ffffff", red: "#b0362b", plum: "#6b4e8a",
    peach: "#f8e3d8", lilac: "#ece6f3", skin: "#f0c8a2", hair: "#3b2a22", wood: "#b98a5a", night: "#13263b"
  };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var num = function (v, f) { var x = Number(v); return isFinite(x) ? x : f; };
  var inR = function (k, a, b) { return k >= a && k <= b; };
  var rep = function (n, f) { var s = ""; for (var i = 0; i < n; i++) s += f(i); return s; };
  function reduced() {
    try { return !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; }
  }
  function hasG() { return !!(W.gsap && typeof W.gsap.to === "function" && typeof W.gsap.set === "function") && !reduced(); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function at(o) { var s = ""; if (o) for (var k in o) if (o[k] != null && o[k] !== false) s += " " + k + '="' + esc(o[k]) + '"'; return s; }

  // ---- SVG string builders ----
  function R(x, y, w, h, f, rx, ex) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx || 0) + '" fill="' + (f || "none") + '"' + at(ex) + "/>"; }
  function O(cx, cy, r, f, ex) { return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (f || "none") + '"' + at(ex) + "/>"; }
  function E(cx, cy, rx, ry, f, ex) { return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + (f || "none") + '"' + at(ex) + "/>"; }
  function P(d, s, w, ex) { return '<path d="' + d + '" fill="none" stroke="' + s + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + at(ex) + "/>"; }
  function F(d, f, ex) { return '<path d="' + d + '" fill="' + f + '"' + at(ex) + "/>"; }
  // keyed drawable stroke (draw 0..1)
  function D(k, d, s, w, ex) {
    var a = { "data-k": k, pathLength: 100, "stroke-dasharray": "100 100", "stroke-dashoffset": 100 };
    if (ex) for (var q in ex) a[q] = ex[q];
    return P(d, s, w || 3, a);
  }
  function T(x, y, s, sz, f, ex, anchor) {
    var a = { "text-anchor": anchor || "middle" }; if (ex) for (var q in ex) a[q] = ex[q];
    sz = sz || 18; if (sz >= 14.5 && sz < 18) sz = 18; // v3: primary labels at least 18 units
    return '<text x="' + x + '" y="' + y + '" font-size="' + sz + '" fill="' + (f || C.ink) + '"' + at(a) + ">" + esc(s) + "</text>";
  }
  function TK(k, x, y, s, sz, f, anchor, ex) { var a = { "data-k": k }; if (ex) for (var q in ex) a[q] = ex[q]; return T(x, y, s, sz, f, a, anchor); }
  function K(k, body, ex) { var a = { "data-k": k }; if (ex) for (var q in ex) a[q] = ex[q]; return "<g" + at(a) + ">" + body + "</g>"; }
  function H(k, body, ex) { var a = { "data-k": k, style: "opacity:0" }; if (ex) for (var q in ex) a[q] = ex[q]; return "<g" + at(a) + ">" + body + "</g>"; }
  function Tr(x, y, body, s, r) { return '<g transform="translate(' + x + " " + y + ")" + (r ? " rotate(" + r + ")" : "") + (s && s !== 1 ? " scale(" + s + ")" : "") + '">' + body + "</g>"; }
  // pill label; width is refitted to the real text after mounting
  function pill(x, y, s, o) {
    o = o || {};
    var sz = Math.max(18, o.sz || 18), h = Math.round(sz * 1.8), w = Math.round(String(s).length * sz * 0.66 + sz * 1.4);
    var an = o.anchor || "middle", x0 = an === "start" ? x : an === "end" ? x - w : x - w / 2;
    x0 = clamp(x0, 2, Math.max(2, 398 - w));
    return '<g data-pill="' + an + '" data-px="' + x + '">' +
      R(x0, y - h / 2, w, h, o.bg || C.paper, h / 2, { stroke: o.st || C.navy, "stroke-width": o.sw || 2, "stroke-dasharray": o.dash ? "5 4" : null }) +
      T(x0 + w / 2, y + sz * 0.36, s, sz, o.fg || C.navy) + "</g>";
  }
  function tick(x, y, s, col, w) { s = s || 1; return P("M" + (x - 7 * s) + " " + y + " l" + 5 * s + " " + 5 * s + " l" + 10 * s + " " + -11 * s, col || C.green, w || 3); }
  function cross(x, y, s, col, w) { s = s || 1; return P("M" + (x - 6 * s) + " " + (y - 6 * s) + " l" + 12 * s + " " + 12 * s + " M" + (x + 6 * s) + " " + (y - 6 * s) + " l" + -12 * s + " " + 12 * s, col || C.orange, w || 3); }
  function badge(x, y, r, ok) { return O(x, y, r, ok ? C.green : C.red, { stroke: C.white, "stroke-width": 2 }) + (ok ? tick(x, y + 1, r / 13, C.white, 2.6) : cross(x, y, r / 14, C.white, 2.6)); }
  function clock(x, y, r, col, bg) { col = col || C.orange; return O(x, y, r, bg || C.paper, { stroke: col, "stroke-width": Math.max(2, r / 6) }) + P("M" + x + " " + (y - r * 0.62) + " V" + y + " L" + (x + r * 0.45) + " " + (y + r * 0.3), col, Math.max(2, r / 7)); }
  // friendly character, feet at (x,y); about 60*s tall. o.k adds keyed mouths k+"-sm" / k+"-fr"
  function fig(x, y, s, body, o) {
    o = o || {};
    var m = o.k ? K(o.k + "-sm", P("M-3.5 -41 Q0 -37.5 3.5 -41", C.ink, 1.6)) + H(o.k + "-fr", P("M-3.5 -38.5 Q0 -42 3.5 -38.5", C.ink, 1.6)) :
      (o.mood === "frown" ? P("M-3.5 -38.5 Q0 -42 3.5 -38.5", C.ink, 1.6) : P("M-3.5 -41 Q0 -37.5 3.5 -41", C.ink, 1.6));
    var hair = o.hair === "long" ? F("M-11 -44 Q-12 -60 0 -59 Q12 -60 11 -44 L11 -33 Q8 -40 8 -48 Q0 -52 -8 -48 Q-8 -40 -11 -33 Z", o.hc || C.hair) :
      F("M-10 -48 Q-9.5 -59 0 -58.5 Q10 -59 10 -48 Q5 -53 -10 -48 Z", o.hc || C.hair);
    return Tr(x, y, F("M-14 0 L-14 -23 Q-14 -35 0 -35 Q14 -35 14 -23 L14 0 Z", body || C.navy) + (o.badge ? O(7, -24, 4, o.badge) : "") +
      O(0, -46, 10.5, C.skin) + hair + O(-3.6, -46.5, 1.6, C.ink) + O(3.6, -46.5, 1.6, C.ink) + m, s);
  }
  var I = {
    bell: function (x, y, s, c) { return Tr(x, y, F("M-10 6 Q-10 -9 0 -9 Q10 -9 10 6 Z", c || C.gold) + R(-12, 6, 24, 3, C.ink, 1.5) + O(0, -11, 2.5, C.ink), s); },
    doc: function (x, y, s, c) { return Tr(x, y, R(-9, -12, 18, 24, C.white, 2, { stroke: c || C.navy, "stroke-width": 2 }) + P("M-5 -5 H5 M-5 0 H5 M-5 5 H2", c || C.navy, 1.6), s); },
    money: function (x, y, s, c) { return Tr(x, y, O(0, 0, 11, c || C.gold) + P("M3.5 -4.5 Q0 -7 -3.2 -4.8 Q-5.5 -1.8 0 0 Q5.5 1.8 3.2 4.8 Q0 7 -3.5 4.5 M0 -8.5 V8.5", C.white, 2), s); },
    bed: function (x, y, s, c) { return Tr(x, y, R(-12, -2, 24, 8, c || C.navy, 2) + R(-12, -8, 7, 6, C.white, 2, { stroke: c || C.navy, "stroke-width": 1.5 }) + P("M-12 6 V10 M12 6 V10", c || C.navy, 2), s); },
    key: function (x, y, s, c) { return Tr(x, y, O(-6, 0, 6, "none", { stroke: c || C.amber, "stroke-width": 3 }) + P("M0 0 H12 M8 0 V5 M11 0 V4", c || C.amber, 3), s); },
    phone: function (x, y, s, c) { return Tr(x, y, F("M-9 -6 Q-9 -10 -5 -10 L-3 -10 L-1 -5 L-4 -3 Q-2 3 4 4 L6 1 L10 3 L10 5 Q10 9 6 9 Q-9 8 -9 -6 Z", c || C.navy), s); },
    passport: function (x, y, s, c) { return Tr(x, y, R(-8, -11, 16, 22, c || C.navy, 2) + O(0, -2, 4, "none", { stroke: C.gold, "stroke-width": 1.4 }) + P("M-4 6 H4", C.gold, 1.4), s); },
    lock: function (x, y, s, c) { return Tr(x, y, P("M-5 -2 V-6 Q-5 -11 0 -11 Q5 -11 5 -6 V-2", c || C.red, 2.4) + R(-8, -2, 16, 12, c || C.red, 2) + O(0, 3, 1.8, C.white), s); },
    star: function (x, y, s, c) { return Tr(x, y, F("M0 -11 L3 -3.5 L11 -3.5 L4.5 1.5 L7 9.5 L0 4.5 L-7 9.5 L-4.5 1.5 L-11 -3.5 L-3 -3.5 Z", c || C.sun), s); },
    mag: function (x, y, s, c) { return Tr(x, y, O(-2, -2, 8, C.white, { stroke: c || C.navy, "stroke-width": 3, "fill-opacity": 0.55 }) + P("M4 4 L10 10", c || C.navy, 4), s); },
    hotel: function (x, y, s, c) { return Tr(x, y, R(-9, -12, 18, 24, c || C.navy, 1.5) + R(-5, -8, 3, 3, C.sun) + R(2, -8, 3, 3, C.sun) + R(-5, -2, 3, 3, C.sun) + R(2, -2, 3, 3, C.sun) + R(-2, 6, 4, 6, C.sun), s); },
    plane: function (x, y, s, c) { return Tr(x, y, F("M-12 1 L10 -1 Q14 0 10 1.5 L-12 3 Z M-2 0 L4 -9 L7 -9 L4 0 Z M-2 2 L4 10 L7 10 L4 2 Z M-11 0 L-13 -5 L-10 -5 L-7 0 Z", c || C.white), s); },
    screen: function (x, y, s, c) { return Tr(x, y, R(-12, -9, 24, 16, c || C.navy, 2) + R(-10, -7, 20, 12, C.sky, 1) + P("M0 7 V11 M-5 11 H5", c || C.navy, 2), s); },
    cursor: function (x, y, s, c) { return Tr(x, y, F("M-6 -10 L8 2 L1 3 L5 11 L2 12 L-2 4 L-6 8 Z", c || C.ink, { stroke: C.white, "stroke-width": 1.2 }), s); },
    flag: function (x, y, s, c) { return Tr(x, y, P("M-6 11 V-11", C.ink, 2) + F("M-6 -11 L9 -6 L-6 -1 Z", c || C.green), s); },
    book: function (x, y, s, c) { return Tr(x, y, R(-11, -13, 22, 26, c || C.navy, 2) + R(-8, -10, 16, 20, C.paper, 1) + P("M-5 -5 H5 M-5 0 H5", c || C.navy, 1.5), s); },
    users: function (x, y, s, c) { return Tr(x, y, O(-5, -5, 4, c || C.navy) + O(5, -5, 4, c || C.navy) + F("M-11 8 Q-11 -1 -5 -1 Q1 -1 1 8 Z", c || C.navy) + F("M-1 8 Q-1 -1 5 -1 Q11 -1 11 8 Z", c || C.navy), s); },
    gear: function (x, y, r, col, hole) {
      var d = "", n = 10;
      for (var i = 0; i < n; i++) {
        var a0 = (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n * 0.55, a2 = a0 + Math.PI / n, a3 = a2 + Math.PI / n * 0.45;
        var p = function (a, rr) { return (x + rr * Math.cos(a)).toFixed(1) + " " + (y + rr * Math.sin(a)).toFixed(1); };
        d += (i ? "L" : "M") + p(a0, r) + "L" + p(a1, r) + "L" + p(a2, r * 0.8) + "L" + p(a3, r * 0.8);
      }
      return F(d + "Z", col) + O(x, y, r * 0.5, hole || C.paper);
    }
  };

  // ---- stylesheet: one shared <style id="vl-sc-w01">, rules scoped per scene ----
  var KEYFRAMES = "@keyframes vlsw01v2Cap{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}" +
    "@keyframes vlsw01v2Flow{to{stroke-dashoffset:-24}}@keyframes vlsw01v2Spin{to{transform:rotate(360deg)}}" +
    "@keyframes vlsw01v2Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}" +
    "@keyframes vlsw01v2Pulse{0%,100%{opacity:.4;transform:scale(.95)}50%{opacity:1;transform:scale(1.06)}}" +
    "@keyframes vlsw01v2Blink{0%,100%{opacity:1}50%{opacity:.35}}";
  function sceneCSS(id, bg) {
    var s = ".vls-w01-" + id;
    return s + "{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:220px;overflow:hidden!important;box-sizing:border-box;background:" + bg + ";color:" + C.ink + ";font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}" +
      s + " *{box-sizing:border-box}" +
      s + " .w01-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}" +
      s + " .w01-fig>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}" +
      s + " svg text{font-family:inherit;font-weight:800;letter-spacing:.2px}" +
      s + " [data-k]{transform-box:fill-box;transform-origin:50% 50%}" +
      s + ".w01-css [data-k]{transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.85s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}" +
      s + ".w01-snap [data-k]," + s + ".w01-rm [data-k]{transition:none!important}" +
      s + ".w01-rm *," + s + ".w01-snap *{animation:none!important}" +
      s + " .w01-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:36px;padding:6px 12px 8px;font-size:15px;font-weight:800;line-height:1.25;color:" + C.navy + ";background:rgba(255,255,255,.7);border-top:1px solid rgba(31,78,121,.14)}" +
      s + " .w01-num{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:" + C.navy + ";color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}" +
      s + " .w01-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.3px;text-transform:uppercase}" +
      s + " .w01-lab.w01-in{animation:vlsw01v2Cap .5s cubic-bezier(.22,.8,.24,1)}" +
      s + " .w01-bar{flex:0 0 54px;height:4px;border-radius:4px;background:rgba(31,78,121,.15);overflow:hidden}" +
      s + " .w01-bar i{display:block;height:100%;width:0;background:" + C.orange + ";transition:width .6s ease}" +
      s + " .a-flow{stroke-dasharray:6 6;animation:vlsw01v2Flow 1.1s linear infinite}" +
      s + " .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw01v2Spin 7s linear infinite}" +
      s + " .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw01v2Bob 2.6s ease-in-out infinite}" +
      s + " .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw01v2Pulse 1.9s ease-in-out infinite}" +
      s + " .a-blink{animation:vlsw01v2Blink 1.4s ease-in-out infinite}" +
      "@media (max-width:420px){" + s + " .w01-cap{font-size:14px;min-height:32px;padding:5px 10px 7px}" + s + " .w01-bar{flex-basis:40px}}" +
      "@media (prefers-reduced-motion:reduce){" + s + " *{animation:none!important;transition:none!important}}";
  }
  function addStyles(list) {
    if (typeof document === "undefined") return;
    var st = document.getElementById("vl-sc-w01");
    if (!st) { st = document.createElement("style"); st.id = "vl-sc-w01"; (document.head || document.documentElement).appendChild(st); }
    var flag = "data-w01v2-" + PART;
    if (st.getAttribute(flag)) return;
    st.setAttribute(flag, "1");
    st.appendChild(document.createTextNode(KEYFRAMES + list.map(function (p) { return sceneCSS(p[0], p[1]); }).join("\n")));
  }

  // ---- scene factory: build(el), step(i, n), reset() ----
  function makeScene(cfg) {
    var id = cfg.id, N = cfg.N, labels = cfg.labels;
    var root = null, useG = false, timers = [], rafs = [], cache = {}, pendingOps = null, preparation = 0;
    function mapK(i, n) {
      var nn = Math.max(1, Math.floor(num(n, N)));
      var ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
      return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
    }
    function nodes(k) {
      if (!root) return [];
      if (!cache[k]) cache[k] = Array.prototype.slice.call(root.querySelectorAll('[data-k="' + k + '"]'));
      return cache[k];
    }
    function timing(el, t) { el.style.transitionDuration = (t.d == null ? 0.85 : t.d) + "s"; el.style.transitionDelay = (t.dl || 0) + "s"; }
    function tf(el, st, t, snap) {
      if (pendingOps) { pendingOps.push(function () { tf(el, st, t, snap); }); return; }
      var x = st.x || 0, y = st.y || 0, r = st.r || 0;
      var sx = st.sx != null ? st.sx : (st.s != null ? st.s : 1), sy = st.sy != null ? st.sy : (st.s != null ? st.s : 1);
      if (useG && !snap) {
        var v = { x: x, y: y, rotation: r, scaleX: sx, scaleY: sy, duration: t.d == null ? 0.85 : t.d, delay: t.dl || 0, ease: t.e || "power3.out", overwrite: "auto" };
        if (st.pv) v.svgOrigin = st.pv[0] + " " + st.pv[1]; else v.transformOrigin = "50% 50%";
        W.gsap.to(el, v); return;
      }
      if (useG) {
        var v2 = { x: x, y: y, rotation: r, scaleX: sx, scaleY: sy };
        if (st.pv) v2.svgOrigin = st.pv[0] + " " + st.pv[1]; else v2.transformOrigin = "50% 50%";
        W.gsap.set(el, v2); return;
      }
      if (st.pv) { el.style.transformBox = "view-box"; el.style.transformOrigin = st.pv[0] + "px " + st.pv[1] + "px"; }
      timing(el, t);
      el.style.transform = "translate(" + x + "px," + y + "px) rotate(" + r + "deg) scale(" + sx + "," + sy + ")";
    }
    function op(el, o, t, snap) {
      if (pendingOps) { pendingOps.push(function () { op(el, o, t, snap); }); return; }
      if (useG) { if (snap) W.gsap.set(el, { opacity: o }); else W.gsap.to(el, { opacity: o, duration: t.d == null ? 0.6 : t.d, delay: t.dl || 0, ease: "power1.out", overwrite: false }); }
      else { timing(el, t); el.style.opacity = String(o); }
    }
    function dash(el, f, t, snap) {
      if (pendingOps) { pendingOps.push(function () { dash(el, f, t, snap); }); return; }
      var v = 100 * (1 - clamp(f, 0, 1));
      if (useG) { if (snap) W.gsap.set(el, { strokeDashoffset: v }); else W.gsap.to(el, { strokeDashoffset: v, duration: t.d == null ? 1.1 : t.d, delay: t.dl || 0, ease: "power2.inOut" }); }
      else { timing(el, t); el.style.strokeDashoffset = String(v); }
    }
    function fill(el, col, t, snap) {
      if (pendingOps) { pendingOps.push(function () { fill(el, col, t, snap); }); return; }
      if (useG) { if (snap) W.gsap.set(el, { fill: col }); else W.gsap.to(el, { fill: col, duration: t.d == null ? 0.6 : t.d, delay: t.dl || 0 }); }
      else { timing(el, t); el.style.fill = col; }
    }
    function later(ms, fn, snap) { if (snap) fn(); else timers.push(setTimeout(fn, ms)); }
    function ctx(snap) {
      var c = {
        snap: snap,
        op: function (k, o, t) { nodes(k).forEach(function (el) { op(el, o, t || {}, snap); }); },
        mv: function (k, st, t) { nodes(k).forEach(function (el) { tf(el, st, t || {}, snap); }); },
        dr: function (k, f, t) { nodes(k).forEach(function (el) { dash(el, f, t || {}, snap); }); },
        fl: function (k, col, t) { nodes(k).forEach(function (el) { fill(el, col, t || {}, snap); }); },
        tx: function (k, s) { nodes(k).forEach(function (el) { if (el.textContent !== String(s)) el.textContent = String(s); }); },
        vis: function (map, t) { Object.keys(map).forEach(function (k) { var v = map[k]; nodes(k).forEach(function (el) { op(el, v === true ? 1 : v === false ? 0 : v, t || {}, snap); }); }); },
        all: function (sel) { return root ? Array.prototype.slice.call(root.querySelectorAll(sel)) : []; },
        // travel through offsets [[x,y],...] over t seconds; lands on the last point
        route: function (k, pts, t) {
          t = t || 1.8; var n = pts.length;
          if (snap || n < 2) { c.mv(k, { x: pts[n - 1][0], y: pts[n - 1][1] }, { d: 0 }); return; }
          var leg = t / (n - 1);
          c.mv(k, { x: pts[0][0], y: pts[0][1] }, { d: 0.2 });
          for (var j = 1; j < n; j++) (function (j) { later(200 + (j - 1) * leg * 1000, function () { c.mv(k, { x: pts[j][0], y: pts[j][1] }, { d: leg, e: "power1.inOut" }); }, false); })(j);
        },
        count: function (k, to, t, fmt) {
          fmt = fmt || function (v) { return String(Math.round(v)); };
          nodes(k).forEach(function (el) {
            var from = el.__n != null ? el.__n : 0; el.__n = to;
            if (snap || from === to) { el.textContent = fmt(to); return; }
            var t0 = null, dur = (t || 1) * 1000;
            var tick2 = function (ts) { if (t0 === null) t0 = ts; var u = clamp((ts - t0) / dur, 0, 1), e = 1 - Math.pow(1 - u, 3); el.textContent = fmt(from + (to - from) * e); if (u < 1) rafs.push(requestAnimationFrame(tick2)); };
            rafs.push(requestAnimationFrame(tick2));
          });
        }
      };
      return c;
    }
    function caption(k, snap) {
      var lab = root.querySelector(".w01-lab"), nn = root.querySelector(".w01-num"), bar = root.querySelector(".w01-bar i");
      var txt = labels[k] || "";
      if (lab && lab.textContent !== txt) { lab.textContent = txt; if (!snap && !reduced()) { lab.classList.remove("w01-in"); void lab.offsetWidth; lab.classList.add("w01-in"); } }
      if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
      if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
    }
    function stopAsync() {
      timers.forEach(function (t) { clearTimeout(t); }); timers = [];
      rafs.forEach(function (r) { cancelAnimationFrame(r); }); rafs = [];
      if (root && useG && W.gsap.killTweensOf) { try { W.gsap.killTweensOf(root.querySelectorAll("[data-k]")); } catch (e) { } }
    }
    function render(k, snap) {
      if (!root) return;
      stopAsync();
      snap = snap || reduced();
      if (snap) root.classList.add("w01-snap");
      try { cfg.render(ctx(snap), k); } catch (e) { if (W.console) console.warn("[VL W01 " + id + "]", e); }
      caption(k, snap);
      if (snap) { void root.offsetWidth; root.classList.remove("w01-snap"); }
      root.setAttribute("data-moment", String(k));
    }
    function fitPills(r) {
      var pills = Array.prototype.map.call(r.querySelectorAll("[data-pill]"), function (g) {
        var t = g.querySelector("text"), rc = g.querySelector("rect"), len = 0;
        if (t && rc) { try { len = t.getComputedTextLength(); } catch (e) {} }
        return { g: g, t: t, rc: rc, len: len };
      });
      pills.forEach(function (item) {
        var g = item.g, t = item.t, rc = item.rc, len = item.len;
        if (!(len > 0)) return;
        var fs = parseFloat(t.getAttribute("font-size")) || 16, w = len + fs * 1.3;
        var x = parseFloat(g.getAttribute("data-px")) || 0, an = g.getAttribute("data-pill");
        var x0 = an === "start" ? x : an === "end" ? x - w : x - w / 2;
        x0 = clamp(x0, 2, Math.max(2, 398 - w));
        rc.setAttribute("x", x0.toFixed(1)); rc.setAttribute("width", w.toFixed(1)); t.setAttribute("x", (x0 + w / 2).toFixed(1));
      });
    }
    function mount(el) {
      var r = document.createElement("div");
      r.className = "vls-w01-" + id + " w01-root " + (useG ? "w01-gsap" : "w01-css") + (reduced() ? " w01-rm" : "");
      r.setAttribute("data-vls-scene", id);
      r.innerHTML = '<div class="w01-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
        esc(cfg.desc) + '">' + cfg.draw(id + PART) + '</svg></div><div class="w01-cap" aria-hidden="true"><span class="w01-num"></span><span class="w01-lab"></span><span class="w01-bar"><i></i></span></div>';
      if (typeof el.replaceChildren === "function") el.replaceChildren(r); else { while (el.firstChild) el.removeChild(el.firstChild); el.appendChild(r); }
      fitPills(r);
      return r;
    }
    return {
      build: function (el) {
        if (!el || el.nodeType !== 1) return;
        stopAsync(); cache = {};
        useG = hasG();
        root = mount(el);
        if (!W.VL_WORK || VL_WORK.immediate) { render(0, true); return; }
        var owner = root, version = ++preparation, commands = [];
        return (async function () {
          await VL_WORK.yield();
          if (root !== owner || preparation !== version || !owner.isConnected) return;
          pendingOps = commands;
          try { render(0, true); } finally { pendingOps = null; }
          await VL_WORK.yield();
          var slice = performance.now();
          for (var command of commands) {
            if (root !== owner || preparation !== version || !owner.isConnected) return;
            command();
            if (performance.now() - slice > 6) { await VL_WORK.yield(); slice = performance.now(); }
          }
        })();
      },
      step: function (i, n) { if (root) render(mapK(i, n), false); },
      reset: function () { if (W.VL_WORK?.discarding) { preparation++; stopAsync(); return; } if (root) render(0, true); }
    };
  }
  // which visual (segment) a moment belongs to; cuts = first moment of each segment after the first
  function segOf(k, cuts) { var s = 0; for (var i = 0; i < cuts.length; i++) if (k >= cuts[i]) s = i + 1; return s; }
  function stages(c, k, cuts, n) { var s = segOf(k, cuts); for (var i = 0; i < n; i++) { c.all('[data-k="S' + i + '"]').forEach(function (el, _, a) { el.style.visibility = el.getAttribute("data-k") === "S" + s ? "visible" : "hidden"; }); c.op("S" + i, i === s ? 1 : 0, { d: 0.55 }); c.mv("S" + i, i === s ? {} : { y: i < s ? -14 : 14 }, { d: 0.7 }); } return s; }
  var SCENE_BG = [];

  var WH = C.white;
  function bx(x, y, w, h, f, s, rx, sw, ex) { var a = { stroke: s || C.navy, "stroke-width": sw || 2.5 }; if (ex) for (var q in ex) a[q] = ex[q]; return R(x, y, w, h, f || WH, rx == null ? 10 : rx, a); }
  function t(x, y, s, col, an, sz) { return T(x, y, s, sz || 18, col || C.ink, null, an); }
  function ban(s, col, y, fg) { return pill(200, y || 26, s, { sz: 18, bg: col || C.navy, st: col || C.navy, fg: fg || WH }); }
  function lab(x, y, s, col) { return pill(x, y, s, { sz: 18, bg: WH, st: col || C.navy, fg: col || C.navy }); }
  function arr(x1, y1, x2, y2, col, w, ex) {
    var a = Math.atan2(y2 - y1, x2 - x1), h = 10, c1 = col || C.navy;
    return P("M" + x1 + " " + y1 + " L" + x2 + " " + y2, c1, w || 3, ex) +
      F("M" + x2 + " " + y2 + " L" + (x2 - h * Math.cos(a - 0.45)).toFixed(1) + " " + (y2 - h * Math.sin(a - 0.45)).toFixed(1) + " L" + (x2 - h * Math.cos(a + 0.45)).toFixed(1) + " " + (y2 - h * Math.sin(a + 0.45)).toFixed(1) + " Z", c1);
  }
  function bgc(col) { return R(-400, -300, 1200, 600, col); }
  function floor(col) { return R(-400, 250, 1200, 100, col || "#e2d8c6"); }
  // stage-driven scene: only the active stage is rendered each step
  function build3(id, N, stg, labels, desc, bgcol) {
    var CUTS = stg.slice(1).map(function (s) { return s.a; });
    function draw() { return stg.map(function (s, i) { return (i ? H : K)("S" + i, s.d); }).join(""); }
    function render(c, k) {
      var si = stages(c, k, CUTS, stg.length), S = stg[si], q;
      if (S.sh) for (q in S.sh) { var r = S.sh[q], on = k >= r[0] && k <= r[1]; c.op(q, on ? (r[3] == null ? 1 : r[3]) : 0, { dl: on && k === r[0] && r[2] ? r[2] : 0, d: on ? 0.5 : 0 }); /* v4: leaving items vanish at once */ }
      if (S.mv) for (q in S.mv) c.mv(q, S.mv[q](k) || {}, { d: 1 });
      if (S.dr) for (q in S.dr) { var z = S.dr[q]; c.dr(q, k >= z[0] && k <= z[1] ? 1 : 0, { d: 1.1, dl: z[2] || 0 }); }
      if (S.fl) for (q in S.fl) c.fl(q, S.fl[q](k), { d: 0.6 });
    }
    REG[id] = makeScene({ id: id, N: N, labels: labels, draw: draw, render: render, desc: desc });
    SCENE_BG.push([id, bgcol]);
  }
  // ============================================================
  // v4 part 1 — W1INTRO, O1a, O1b rebuilt on the same stage engine as part 2.
  // One composition per 2-5 narration lines; only the active composition is
  // visible (the previous one is hidden at once, never faded behind), items
  // leaving a composition vanish at once, connectors are drawn before the
  // boxes they join and stop at the box edges.
  // ============================================================

  // ============================================================
  // W1INTRO · "ONE EVENING, ONE QUESTION" · 28 moments · 11 compositions
  // ============================================================
  (function () {
    // Give the two unnumbered Week 1 sections stable ids (idempotent).
    try {
      var Ls = W.COURSE && W.COURSE.lessons;
      if (Ls && Ls.length) {
        var f0 = Ls[0].sections && Ls[0].sections[0], ll = Ls[Ls.length - 1].sections, lst = ll && ll[ll.length - 1];
        if (f0 && !f0.sec) f0.sec = "W1INTRO";
        if (lst && !lst.sec) lst.sec = "W1OUTRO";
      }
    } catch (e) { }
    var GOALS = [["SPOT A", "PROCESS"], ["WHY GAPS", "APPEAR"], ["MANAGE", "JOURNEYS"], ["BPM AND", "MATURITY"]];
    var GI = [
      function (x, y) { return I.flag(x - 18, y, 0.8, C.green) + I.flag(x + 18, y, 0.8, C.red); },
      function (x, y) { return R(x - 36, y - 6, 28, 12, C.navy, 3) + R(x + 8, y - 6, 28, 12, C.navy, 3); },
      function (x, y) { return arr(x - 32, y, x + 32, y, C.green, 3); },
      function (x, y) { return I.gear(x, y, 10, C.amber); }
    ];
    var stars = rep(36, function (k) { return O((k * 97) % 400, 8 + (k * 53) % 150, 1 + (k % 3) * 0.5, "#e9f1ff", { opacity: 0.4 + (k % 4) * 0.15 }); });
    build3("W1INTRO", 28, [
      // template: Kurzgesagt — living process token (one protagonist walks into the system) — https://kurzgesagt.org/what-we-do
      { a: 0, d: bgc("#13263b") + stars + O(40, 40, 14, "#f6edd6") + O(46, 35, 12, "#13263b") + floor("#22344a") +
          R(220, 70, 172, 180, "#2f4b6b", 4) + rep(15, function (i) { return R(234 + (i % 5) * 32, 128 + Math.floor(i / 5) * 26, 16, 14, i % 3 ? "#f7d48b" : "#fbe3a8", 2); }) +
          R(228, 80, 156, 34, C.deep, 6) + t(306, 104, "QASR MARINA", C.sun) + R(286, 212, 40, 38, "#ffe3a3", 3) +
          K("i0g", fig(0, 250, 1.6, C.orange, { hair: "long" }) + R(22, 214, 16, 32, C.navy, 4)) +
          H("i0a", ban("WELCOME, WEEK 1", C.sun, 30, C.ink)) +
          H("i0b", ban("A LONG JOURNEY", C.navy2, 30) + I.plane(120, 96, 3, C.white)) +
          H("i0c", R(14, 62, 192, 84, WH, 24) + O(150, 152, 6, WH) + O(160, 164, 4, WH) + I.bed(110, 90, 2, C.green) + t(110, 134, "JUST HER ROOM", C.green)),
        sh: { i0a: [0, 0], i0b: [1, 1], i0c: [2, 2] }, mv: { i0g: function (k) { return { x: k === 0 ? 50 : k === 1 ? 90 : 130 }; } } },
      // template: LottieFiles — Animated Dashboards (screen panels switch state) — https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ
      { a: 3, d: bgc("#f3ecdf") + floor() + R(250, 206, 144, 48, C.navy, 6) + fig(340, 206, 1.1, C.navy, { hair: "long" }) +
          fig(60, 250, 1.3, C.orange, { hair: "long" }) + R(80, 222, 14, 28, C.navy, 3) +
          H("i1w", pill(300, 112, "WELCOME!", { sz: 20, bg: C.green, st: C.green, fg: WH })) +
          H("i1c", bx(10, 46, 184, 94, WH, C.green) + t(102, 80, "BOOKED", C.green) + t(102, 116, "CORPORATE", C.ink) + badge(176, 62, 11, true) +
            bx(206, 46, 184, 94, WH, C.red) + t(298, 80, "ON SCREEN", C.red) + t(298, 116, "NOT SHOWN", C.ink) + badge(372, 62, 11, false) +
            ban("RATES DON'T MATCH", C.red, 22)) +
          H("i1p", I.phone(316, 180, 1.6, C.navy) + pill(190, 176, "OTHER DEPARTMENT", { sz: 18, bg: C.navy, st: C.navy, fg: WH }) +
            I.passport(116, 214, 1.4) + ban("SAME DETAILS, TWICE", C.orange, 278)),
        sh: { i1w: [3, 3], i1c: [4, 5], i1p: [5, 5] } },
      // template: LottieFiles — teamwork (people appear, then act as a team) — https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6
      { a: 6, d: bgc("#eef3f8") +
          [["CHECKS", "BOOKING", C.navy], ["CONFIRMS", "RATE", C.green], ["PREPARES", "ROOM", C.slate]].map(function (s, j) {
            var x = 8 + j * 132;
            return bx(x, 46, 120, 136, WH, s[2]) + fig(x + 60, 118, 1, s[2]) + t(x + 60, 146, s[0], s[2]) + t(x + 60, 170, s[1], C.ink) + H("i2t" + j, badge(x + 100, 66, 11, true));
          }).join("") +
          H("i2a", ban("EVERYONE HELPFUL", C.green, 24)) + H("i2b", ban("EACH OWN TASK DONE", C.navy, 24)) +
          H("i2c", fig(60, 276, 1.3, C.orange, { mood: "frown", hair: "long" }) + clock(140, 236, 22, C.red) + pill(270, 236, "STILL WAITING", { sz: 18, bg: C.red, st: C.red, fg: WH })),
        sh: { i2a: [6, 6], i2b: [7, 8], i2t0: [7, 8], i2t1: [7, 8, 0.25], i2t2: [7, 8, 0.5], i2c: [8, 8] } },
      // template: Apple HIG Motion — controlled focus pull (subdue context, sharpen one object) — https://developer.apple.com/design/human-interface-guidelines/motion
      { a: 9, d: bgc("#f6f1ea") +
          H("i3p", O(200, 120, 48, C.navy) + R(181, 98, 12, 44, WH, 3) + R(207, 98, 12, 44, WH, 3) + t(200, 206, "PAUSE AND LOOK", C.navy)) +
          H("i3a", bx(10, 40, 184, 170, C.mint, C.green) + t(102, 70, "JOBS DONE", C.green) +
            ["BOOKING", "RATE", "ROOM"].map(function (s, j) { return t(30, 110 + j * 36, s, C.ink, "start") + badge(170, 104 + j * 36, 11, true); }).join("") +
            bx(206, 40, 184, 170, C.peach, C.red) + t(298, 70, "HER ROOM?", C.red) + badge(298, 126, 30, false) + t(298, 190, "NOT YET", C.red)) +
          H("i3c", pill(200, 234, "OPER621", { sz: 20, bg: C.sun, st: C.sun, fg: C.ink }) + ban("CARRY IT ALL TERM", C.navy, 276)),
        sh: { i3p: [9, 9], i3a: [10, 11], i3c: [11, 11] } },
      // template: Bartosz Ciechanowski — Gears (one mechanism only works when teeth engage) — https://ciechanow.ski/archives/
      { a: 12, d: bgc("#f2f5f9") +
          [["RESERVATIONS", 80, C.navy], ["REVENUE", 200, C.green], ["HOUSEKEEPING", 320, C.slate]].map(function (g) {
            return '<g class="a-spin">' + I.gear(g[1], 112, 40, g[2]) + "</g>" + t(g[1], 180, g[0], g[2], null, 14);
          }).join("") +
          H("i4a", ban("WORKING TOGETHER", C.navy, 26)) +
          H("i4b", R(14, 52, 372, 140, "none", 18, { stroke: C.green, "stroke-width": 4, "stroke-dasharray": "8 6" }) + ban("BUSINESS PROCESS MANAGEMENT", C.green, 26)) +
          H("i4c", bx(10, 214, 120, 44, WH, C.navy) + t(70, 243, "REQUEST", C.navy) + arr(136, 236, 244, 236, C.orange, 5) + t(190, 224, "BPM", C.orange, null, 14) +
            bx(250, 214, 140, 44, C.mint, C.green) + t(300, 243, "SETTLED", C.green) + I.star(370, 236, 1.2)),
        sh: { i4a: [12, 12], i4b: [13, 14], i4c: [14, 14] } },
      // template: LottieFiles — World map with logistics (pins and routes on a map) — https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy
      { a: 15, d: bgc("#eef2f6") + R(206, 46, 188, 206, "#cfe1ef", 12) + F("M218 70 Q300 44 382 70 L386 232 Q300 256 220 238 Z", "#efe4cc") +
          rep(14, function (i) { var r = Math.floor(i / 4), x = 226 + (i % 4) * 44 + (r % 2) * 18, y = 80 + r * 46; return H("i5p" + i, I.hotel(x, y, 0.9, i === 13 ? C.orange : C.navy)); }) +
          ban("QASR HOSPITALITY", C.navy, 24) +
          H("i5w", bx(10, 56, 184, 90, WH, C.navy) + t(102, 92, "WEEKS 1 TO 14", C.navy) + t(102, 126, "ONE HOTEL GROUP", C.slate, null, 14)) +
          H("i5s", bx(10, 56, 184, 90, WH, C.navy) + t(60, 112, "14", C.navy, null, 40) + t(150, 96, "HOTELS &", C.ink, null, 14) + t(150, 118, "RESORTS", C.ink, null, 14) +
            bx(10, 156, 184, 90, WH, C.green) + t(102, 198, "3,100", C.green, null, 36) + t(102, 230, "STAFF", C.ink, null, 14)) +
          H("i5m", O(288, 218, 20, "none", { stroke: C.orange, "stroke-width": 4, "class": "a-pulse" }) + ban("QASR MARINA · DELAYED FLIGHT", C.orange, 276)),
        sh: (function () { var o = { i5w: [15, 15], i5s: [16, 17], i5m: [17, 17] }; for (var i = 0; i < 14; i++) o["i5p" + i] = [15, 17, i * 0.06]; return o; })() },
      // template: Motion Array — Infographic Chart Creator (bars grow, values stamp in) — https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/
      { a: 18, d: bgc("#f6f4ee") + ban("DEPARTMENT TARGETS", C.navy, 24) +
          [["FRONT DESK", C.navy], ["REVENUE", C.green], ["HOUSEKEEPING", C.slate]].map(function (d, j) {
            var y = 50 + j * 46; return bx(10, y, 250, 38, WH, d[1]) + t(22, y + 26, d[0], d[1], "start") + H("i6t" + j, badge(238, y + 19, 12, true));
          }).join("") +
          H("i6m", t(135, 206, "TARGET MET", C.green)) +
          H("i6g", bx(272, 50, 118, 130, C.peach, C.red) + t(331, 78, "GUEST", C.red) + t(331, 102, "RESULT", C.red) + badge(331, 144, 20, false)) +
          H("i6p", fig(330, 278, 1.2, C.orange, { mood: "frown", hair: "long" }) + ban("POOR EVENING", C.red, 240)),
        sh: { i6t0: [18, 18, 0.2], i6t1: [18, 18, 0.5], i6t2: [18, 18, 0.8], i6m: [18, 18, 1.0], i6g: [18, 18, 1.4], i6p: [18, 18, 1.8] } },
      // template: LottieFiles — Multi-Step Icon Animation (activate one step after another) — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
      { a: 19, d: bgc("#f4f6f9") + ban("THIS WEEK'S GOALS", C.navy, 24) +
          GOALS.map(function (g, j) {
            var x = j % 2 ? 204 : 8, y = j < 2 ? 48 : 156;
            return H("i7g" + j, bx(x, y, 188, 100, WH, C.navy) + O(x + 28, y + 30, 18, C.orange) + T(x + 28, y + 37, String(j + 1), 20, WH) +
              t(x + 112, y + 40, g[0], C.navy) + t(x + 112, y + 66, g[1], C.navy) + GI[j](x + 112, y + 86));
          }).join(""),
        sh: { i7g0: [19, 22], i7g1: [20, 22], i7g2: [21, 22], i7g3: [22, 22] } },
      // template: Apple HIG Motion — controlled focus pull (subdue context, sharpen one object) — https://developer.apple.com/design/human-interface-guidelines/motion
      { a: 23, d: bgc("#eef3f8") + ban("COURSE OUTCOME", C.navy, 26) + O(200, 112, 52, C.navy) + t(200, 128, "K1", C.sun, null, 44) +
          H("i8a", t(200, 200, "ANALYSE HOW ORGANISATIONS", C.ink) + t(200, 230, "USE BPM TODAY", C.green, null, 24)),
        sh: { i8a: [23, 23, 0.4] } },
      // template: Behance — Process: What is a Motion Designer? (illustrated narrative vignettes) — https://www.behance.net/gallery/159045079/Process-What-is-a-Motion-Designer-
      { a: 24, d: bgc("#f6f1ea") +
          H("i9a", ban("ONE STORY, ALL TERM", C.navy, 26) + P("M30 130 H370", C.slate, 4) +
            rep(14, function (i) { var x = 30 + i * 340 / 13; return O(x.toFixed(1), 130, i === 0 ? 11 : 7, i === 0 ? C.orange : C.navy2); }) +
            fig(30, 110, 0.8, C.orange, { hair: "long" }) + t(30, 166, "WEEK 1", C.ink, null, 14) + t(386, 166, "WEEK 14", C.ink, "end", 14) +
            pill(200, 214, "QASR, WEEK BY WEEK", { sz: 20, bg: C.navy, st: C.navy, fg: WH })) +
          H("i9b", '<g opacity="0.6">' + [["RESERVATIONS", 100, 62], ["REVENUE", 300, 62], ["HOUSEKEEPING", 100, 150], ["FINANCE", 300, 150]].map(function (d) {
              return pill(d[1], d[2], d[0], { sz: 18, bg: "#edf0f4", st: C.muted, fg: C.slate, dash: true });
            }).join("") + "</g>" +
            fig(200, 262, 1.5, C.orange, { hair: "long" }) + pill(200, 106, "MY ROOM", { sz: 22, bg: C.orange, st: C.orange, fg: WH })),
        sh: { i9a: [24, 24], i9b: [25, 25] } },
      // template: 3Blue1Brown (Manim demo) — traced causal path drawn when it becomes relevant — https://www.3blue1brown.com/lessons/manim-demo/
      { a: 26, d: bgc("#eef6f1") +
          bx(14, 40, 180, 56, C.mint, C.green) + badge(38, 68, 12, true) + t(116, 75, "RIGHT ROOM", C.green) +
          bx(206, 40, 180, 56, C.mint, C.green) + badge(230, 68, 12, true) + t(308, 75, "NO WAITING", C.green) +
          H("i10a", floor() + R(220, 120, 80, 130, "#a8743f", 4) + O(286, 186, 4, C.sun) + badge(260, 150, 16, true) + fig(150, 250, 1.5, C.orange, { hair: "long" })) +
          H("i10b", bx(14, 150, 90, 48, WH, C.navy) + t(59, 181, "DESK", C.navy) + P("M104 174 H296", C.orange, 4, { "stroke-dasharray": "8 7" }) +
            [150, 200, 250].map(function (x) { return O(x, 174, 15, WH, { stroke: C.orange, "stroke-width": 3 }) + t(x, 181, "?", C.orange); }).join("") +
            bx(296, 150, 90, 48, C.mint, C.green) + t(341, 181, "ROOM", C.green) + ban("WHAT'S THE PROCESS?", C.navy, 262)),
        sh: { i10a: [26, 26], i10b: [27, 27] } }
    ], ["Welcome to Week 1", "A long journey", "Tired, wants her room", "A warm welcome", "Booking doesn't match",
      "Calls, then asks again", "Nobody is rude", "Each job done", "Still standing there", "Pause and look",
      "Jobs done, need unmet", "Carry this question", "Working together", "What BPM means", "Work becomes value",
      "Qasr Hospitality Group", "14 hotels, 3,100 people", "Qasr Marina", "Targets met, guest not", "Goal 1: spot a process",
      "Goal 2: why gaps appear", "Goal 3: manage journeys", "Goal 4: BPM, maturity", "Outcome K1", "One unfolding story",
      "Not her concern", "The right room", "What is the process?"],
      "Week 1 opening: a tired traveller arrives at Qasr Marina, the booking does not match, every department finishes its own job while she waits, BPM joins the departments around her outcome, the four goals and outcome K1, and the question of which process should deliver the right room.", "#13263b");
  })();

  // ============================================================
  // O1a · "A PROCESS, IN PLAIN WORDS" · 34 moments · 11 compositions
  // ============================================================
  (function () {
    var OFF = [["RESERVATIONS", "THE BOOKING", C.navy, I.doc(0, 0, 0.9)], ["REVENUE OFFICE", "CORPORATE RATE", C.green, I.money(0, 0, 0.9, C.green)],
      ["HOUSEKEEPING", "ROOM READY?", C.slate, I.bed(0, 0, 1, C.slate)]];
    var NEEDS = ["BOOKING", "RATE", "ROOM", "KEY", "SETTLED"];
    var CARD = ["QUEUE, REQUEST", "VERIFY BOOKING", "CONFIRM RATE", "ROOM READY", "GUEST SETTLED"];
    var LN = [["FRONT DESK", C.navy, "#e9f0f7"], ["REVENUE", C.green, "#e8f3ed"], ["HOUSEKEEPING", C.slate, "#eef0f3"]];
    var SQ = [[0, 54, "VERIFY", "BOOKING"], [1, 106, "CONFIRM", "RATE"], [2, 158, "ROOM", "READY"], [0, 210, "GUEST", "SETTLED"]];
    build3("O1a", 34, [
      // template: LottieFiles — Workflow by a (workers revealed, then workflow actions) — https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm
      { a: 0, d: bgc("#f3ecdf") + floor() + R(232, 232, 160, 34, C.navy, 5) + fig(312, 232, 0.8, C.navy, { hair: "long" }) +
          fig(110, 262, 0.95, C.orange, { hair: "long" }) + R(124, 240, 10, 22, C.navy, 3) +
          H("o0a", ban("AFTER A DELAYED FLIGHT", C.orange, 26) + I.plane(200, 130, 3.2, C.navy2)) +
          H("o0b", ban("SEVERAL DEPARTMENTS", C.navy, 26)) + H("o0c", ban("EACH HOLDS A PIECE", C.green, 26)) +
          OFF.map(function (o, j) {
            var y = 48 + j * 44;
            return H("o0r" + j, bx(6, y, 388, 38, WH, o[2]) + Tr(28, y + 19, o[3]) + t(50, y + 26, o[0], o[2], "start") + H("o0i" + j, t(384, y + 25, o[1], C.ink, "end", 14)));
          }).join(""),
        sh: { o0a: [0, 0], o0b: [1, 1], o0c: [2, 2], o0r0: [1, 2], o0r1: [1, 2, 0.25], o0r2: [1, 2, 0.5], o0i0: [2, 2], o0i1: [2, 2, 0.3], o0i2: [2, 2, 0.6] } },
      // template: NYT Immersive — evidence-based zoom (detail, then pull back to the system) — https://www.nytimes.com/spotlight/augmented-reality
      { a: 3, d: bgc("#eef3f8") +
          bx(8, 20, 184, 192, WH, C.navy) + fig(48, 96, 0.9, C.navy, { hair: "long" }) + t(128, 66, "HER JOB", C.navy) +
          t(100, 140, "CHECK BOOKING", C.ink) + t(100, 180, "ISSUE THE KEY", C.ink) +
          H("o1n", bx(208, 20, 184, 192, WH, C.orange) + t(300, 46, "GUEST NEEDS", C.orange) +
            NEEDS.map(function (n, j) { var y = 82 + j * 30; return t(232, y, n, C.ink, "start") + (j === 0 || j === 3 ? badge(370, y - 6, 10, true) : O(370, y - 6, 10, "none", { stroke: C.red, "stroke-width": 2.5 })); }).join("")) +
          H("o1a", ban("ONLY PART OF IT", C.red, 246)) +
          H("o1b", R(202, 14, 196, 204, "none", 14, { stroke: C.orange, "stroke-width": 4, "stroke-dasharray": "8 6" }) + ban("LOOK BEYOND THE DESK", C.orange, 246)),
        sh: { o1n: [4, 5], o1a: [4, 4], o1b: [5, 5] } },
      // template: Dribbble — Workflow AI Animation (data advances through stages) — https://dribbble.com/shots/26275497-Workflow-AI-Animation
      { a: 6, d: bgc("#f4efe6") + pill(200, 26, "ASKS TO CHECK IN", { sz: 18, bg: C.orange, st: C.orange, fg: WH }) +
          P("M84 44 V218", C.slate, 3) +
          CARD.map(function (c, j) {
            var y = 50 + j * 33;
            return H("o2c" + j, bx(60, y, 280, 28, WH, C.navy, 8, 2) + O(84, y + 14, 11, C.navy) + T(84, y + 19, String(j + 1), 14, WH) + t(104, y + 21, c, C.ink, "start"));
          }).join("") +
          H("o2e", pill(200, 232, "REACHES HER ROOM", { sz: 18, bg: C.green, st: C.green, fg: WH })) +
          H("o2b", P("M346 26 H360 V232 H346", C.navy, 3) + ban("A BUSINESS PROCESS", C.navy, 276)),
        sh: { o2c0: [6, 7, 0.1], o2c1: [6, 7, 0.4], o2c2: [6, 7, 0.7], o2c3: [6, 7, 1.0], o2c4: [6, 7, 1.3], o2e: [6, 7, 1.6], o2b: [7, 7] } },
      // template: Dribbble — Workflow Animation (a trigger token travels to an outcome) — https://dribbble.com/shots/3791748-Workflow-Animation
      { a: 8, d: bgc("#eef6f1") +
          bx(10, 24, 240, 50, WH, C.navy) + t(130, 56, "ACTIVITIES", C.navy) + arr(130, 76, 130, 97, C.navy, 3) +
          bx(10, 100, 240, 50, C.peach, C.orange) + t(130, 132, "OUTCOME OF VALUE", C.orange) + arr(130, 152, 130, 173, C.navy, 3) +
          bx(10, 176, 240, 50, WH, C.green) + fig(40, 222, 0.65, C.green) + t(140, 208, "CUSTOMER", C.green) +
          H("o3h", R(4, 94, 252, 62, "none", 12, { stroke: C.orange, "stroke-width": 4 })) +
          H("o3a", ban("THE RESULT COMES FIRST", C.orange, 262)) +
          H("o3b", arr(252, 125, 272, 125, C.orange, 3) + bx(274, 60, 118, 136, C.mint, C.green) + I.bed(333, 90, 1.6, C.green) +
            t(333, 136, "SETTLED", C.green) + t(333, 160, "RIGHT ROOM", C.ink, null, 14) + t(333, 182, "QUICKLY", C.ink, null, 14)),
        sh: { o3h: [9, 10], o3a: [9, 10], o3b: [10, 10] } },
      // template: Kurzgesagt — consequence ripple (an event propagates to what it causes) — https://www.youtube.com/kurzgesagt/videos
      { a: 11, d: bgc("#f6f4ee") +
          H("o4t", ban("WHERE DOES IT START?", C.navy, 26) +
            P("M30 90 C120 50 160 240 250 120 C300 60 360 70 370 200 M40 220 C140 120 200 260 300 90 M60 60 C200 260 260 50 360 250", C.muted, 3) + I.mag(200, 160, 3.2, C.navy)) +
          H("o4s", floor() + R(120, 222, 96, 40, C.wood, 4) + I.bell(168, 212, 1.6) + fig(70, 262, 1.4, C.orange, { hair: "long" }) +
            pill(214, 112, "CHECK-IN REQUESTED", { sz: 18, bg: WH, st: C.orange, fg: C.orange })) +
          H("o4g", pill(176, 170, "THE TRIGGER", { sz: 20, bg: C.orange, st: C.orange, fg: WH }) + O(168, 210, 22, "none", { stroke: C.orange, "stroke-width": 3, "class": "a-pulse" })) +
          H("o4n", R(262, 190, 130, 66, "#f3f0ea", 10, { stroke: C.slate, "stroke-width": 2.5, "stroke-dasharray": "6 5" }) +
            t(327, 218, "NO REQUEST", C.slate, null, 14) + t(327, 242, "NO CASE", C.slate, null, 14) + ban("NO TRIGGER, NO JOURNEY", C.red, 26)),
        sh: { o4t: [11, 11], o4s: [12, 14], o4g: [13, 14], o4n: [14, 14] } },
      // template: Dribbble — Data Workflow Animation (nodes and links activate in sequence) — https://dribbble.com/shots/27247003-Data-Workflow-Animation
      { a: 15, d: bgc("#f7f8fa") +
          LN.map(function (l, j) { var x = 4 + j * 132; return R(x, 6, 128, 254, l[2], 8) + t(x + 64, 34, l[0], l[1], null, 14); }).join("") +
          D("o5l", "M126 77 H200 V104 M258 129 H332 V156 M332 204 V233 H128", C.orange, 3) +
          H("o5h", F("M195 97 L205 97 L200 106 Z", C.orange) + F("M327 149 L337 149 L332 158 Z", C.orange) + F("M136 228 L136 238 L127 233 Z", C.orange)) +
          SQ.map(function (s, j) {
            var x = 10 + s[0] * 132;
            return H("o5b" + j, bx(x, s[1], 116, 46, WH, LN[s[0]][1], 8, 2.5) + t(x + 58, s[1] + 20, s[2], LN[s[0]][1]) + t(x + 58, s[1] + 41, s[3], C.ink));
          }).join("") +
          H("o5d", I.doc(170, 77, 1.1, C.orange) + I.doc(296, 129, 1.1, C.orange) + I.doc(230, 233, 1.1, C.orange)) +
          H("o5w", ban("WORK BEGINS", C.orange, 280)) + H("o5a", ban("THE SEQUENCE", C.navy, 280)) +
          H("o5c", ban("SPANS THREE TEAMS", C.navy, 280)) + H("o5e", ban("EACH TEAM ADDS", C.orange, 280)),
        sh: { o5b0: [15, 18], o5b1: [16, 18, 0.2], o5b2: [16, 18, 0.5], o5b3: [16, 18, 0.8], o5h: [16, 18, 1.0], o5w: [15, 15], o5a: [16, 16], o5c: [17, 17], o5e: [18, 18], o5d: [18, 18] },
        dr: { o5l: [16, 18, 0.2] } },
      // template: Apple HIG Motion — physical handoff (same object stays recognisable in transfer) — https://developer.apple.com/design/human-interface-guidelines/motion
      { a: 19, d: bgc("#f1f4f8") +
          H("o6a", floor() + fig(90, 214, 1.4, C.navy) + t(90, 244, "FRONT DESK", C.navy) + fig(310, 214, 1.4, C.green) + t(310, 244, "REVENUE", C.green) +
            P("M130 112 Q200 58 270 112", C.orange, 4) + F("M262 100 L274 116 L256 114 Z", C.orange) +
            pill(200, 40, "HANDOFF", { sz: 20, bg: C.orange, st: C.orange, fg: WH }) + K("o6d", I.doc(130, 150, 1.8, C.orange))) +
          H("o6b", [["FRONT DESK", C.navy], ["REVENUE", C.green], ["HOUSEKEEPING", C.slate]].map(function (d, j) {
              var x = 6 + j * 132;
              return bx(x, 36, 124, 146, WH, d[1]) + t(x + 62, 62, d[0], d[1], null, 14) +
                rep(3, function (r) { return P("M" + (x + 16) + " " + (92 + r * 30) + " H" + (x + 84), C.muted, 5) + tick(x + 104, 92 + r * 30, 1, C.green); });
            }).join("") + arr(20, 210, 380, 210, C.orange, 6) + ban("ONE PROCESS ACROSS", C.orange, 250)),
        sh: { o6a: [19, 19], o6b: [20, 20] }, mv: { o6d: function (k) { return { x: k === 19 ? 140 : 0 }; } } },
      // template: LottieFiles — Process Success (activity transforms into a check only at the real end) — https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP
      { a: 21, d: bgc("#f6f4ee") +
          bx(10, 24, 180, 138, C.mint, C.green) + t(100, 52, "TASKS DONE", C.green) + rep(3, function (r) { return badge(50 + r * 50, 98, 15, true); }) + t(100, 146, "ALL TEAMS", C.ink, null, 14) +
          bx(210, 24, 180, 138, C.peach, C.red) + t(300, 52, "GUEST?", C.red) + fig(260, 152, 1.1, C.orange, { hair: "long" }) + t(338, 128, "?", C.red, null, 48) +
          H("o7e", P("M30 226 H346", C.navy, 5) + I.flag(368, 216, 1.6, C.green) + pill(286, 186, "END STATE", { sz: 18, bg: C.green, st: C.green, fg: WH })) +
          H("o7k", I.key(90, 226, 2, C.amber) + t(90, 268, "TASK DONE", C.green) + t(392, 268, "JOURNEY NOT DONE", C.red, "end")),
        sh: { o7e: [22, 23], o7k: [23, 23] } },
      // template: Motion Array — Scrolling Timeline (pan along time and settle on the event) — https://motionarray.com/after-effects-templates/scrolling-timeline-1223172/
      { a: 24, d: bgc("#f3efe7") + floor() + R(40, 96, 90, 154, "#a8743f", 4) + O(116, 176, 4, C.sun) + I.lock(98, 150, 1.8, C.red) +
          fig(190, 250, 1.4, C.orange, { hair: "long", mood: "frown" }) + I.key(190, 146, 1.5, C.amber) +
          pill(100, 70, "NOT RELEASED", { sz: 18, bg: C.red, st: C.red, fg: WH }) +
          H("o8c", bx(232, 40, 160, 86, WH, C.green) + t(312, 72, "RECEPTIONIST'S", C.ink, null, 14) + t(296, 104, "TASK", C.green) + badge(352, 98, 12, true) +
            bx(232, 140, 160, 86, WH, C.red) + t(312, 172, "GUEST'S", C.ink, null, 14) + t(296, 204, "CHECK-IN", C.red) + badge(372, 198, 11, false)) +
          H("o8m", ban("OUTCOME MISSING", C.red, 278)),
        sh: { o8c: [25, 26], o8m: [26, 26] } },
      // template: Awwwards — UI Animation & Microinteractions (morphing decision gate: pass or bounce) — https://www.awwwards.com/awwwards/collections/animation/
      { a: 27, d: bgc("#f1eef5") + ban("THE PROCESS TEST", C.plum, 26) +
          [["CUSTOMER?", "ARRIVING GUEST", 56], ["OUTCOME?", "RIGHT ROOM, FAST", 136]].map(function (s, j) {
            var y = s[2];
            return bx(10, y, 380, 66, WH, C.plum) + t(24, y + 40, s[0], C.plum, "start") +
              R(150, y + 12, 232, 42, "#f6f3fa", 8, { stroke: C.plum, "stroke-width": 2, "stroke-dasharray": "5 4" }) +
              H("o9v" + j, t(255, y + 40, s[1], C.green) + badge(364, y + 33, 11, true));
          }).join("") +
          H("o9a", ban("WHO GETS VALUE? WHAT RESULT?", C.navy, 246)) + H("o9b", ban("NOT JOB DESCRIPTIONS", C.orange, 246)),
        sh: { o9a: [28, 28], o9b: [29, 29], o9v0: [30, 30], o9v1: [30, 30, 0.4] } },
      // template: Dribbble — Creative Design Workflow Animation (parts assemble into one product) — https://dribbble.com/shots/27476599-Creative-Design-Workflow-Animation
      { a: 31, d: bgc("#eef3f8") +
          [["TRIGGER", C.orange], ["SEQUENCE", C.navy], ["OUTCOME", C.green]].map(function (p, j) { var x = 6 + j * 136; return bx(x, 30, 116, 50, WH, p[1]) + t(x + 58, 62, p[0], p[1]); }).join("") +
          arr(124, 55, 140, 55, C.slate, 3) + arr(260, 55, 276, 55, C.slate, 3) +
          H("o10t", ban("THREE PARTS, ONE PROCESS", C.navy, 120)) +
          H("o10d", LN.map(function (l, j) { var y = 100 + j * 34; return R(6, y, 388, 30, l[2], 6) + t(16, y + 21, l[0], l[1], "start", 14); }).join("") +
            P("M150 115 H230 V149 H300 V183 H370", C.orange, 4) + F("M368 176 L382 183 L368 190 Z", C.orange) + ban("BEYOND INDIVIDUAL JOBS", C.navy, 226)) +
          H("o10m", bx(10, 100, 184, 110, "#fbe9e4", C.red) + t(102, 142, "EVERY CLICK", C.red) + t(102, 174, "TOO MUCH", C.slate, null, 14) +
            bx(206, 100, 184, 110, C.mint, C.green) + t(298, 142, "HER JOURNEY", C.green) + t(298, 174, "RIGHT SCOPE", C.slate, null, 14) + ban("HOW MUCH TO MAP?", C.orange, 250)),
        sh: { o10t: [31, 31], o10d: [32, 32], o10m: [33, 33] } }
    ], ["Back at reception", "Several departments", "Who holds what", "Her own job", "Only part of it",
      "Look beyond the desk", "Follow the work", "A business process", "Activities to outcome", "Result over department",
      "Settled, right room", "How to spot it?", "She asks to check in", "The trigger", "No trigger, no journey",
      "Work begins", "The sequence", "Not one department", "Information moves", "The handoff",
      "Bigger than task lists", "Tasks done. Guest?", "The end state", "Key is not the end", "Room not released",
      "Complete?", "Outcome missing", "The process test", "Customer and outcome", "Apply the test",
      "Guest, right room, fast", "Three parts", "Across departments", "How much to map?"],
      "What a business process is: three offices each hold a piece of the guest's check-in, the work is followed from her request to her room, the definition (activities, outcome of value, customer), trigger, sequence across teams, handoff, end state, the locked room, and the customer-and-outcome test.", "#f3ecdf");
  })();

  // ============================================================
  // O1b · "LEVELS AND BOUNDARIES" · 33 moments · 10 compositions
  // ============================================================
  (function () {
    var LVC = [C.red, C.navy, C.green, C.amber, C.plum];
    var LVN = ["VALUE CHAIN", "PROCESS", "SUB-PROCESS", "ACTIVITY", "TASK"];
    var ST = [["GREET", "GUEST"], ["VERIFY", "BOOKING"], ["ASSIGN", "ROOM"], ["ISSUE", "KEY"]];
    var SUB = ["FIND THE BOOKING", "CHECK RATE, GUARANTEE", "CONFIRM DETAILS"];
    var ACT = ["OPEN THE PORTAL", "FIND AGREEMENT", "CHECK GUARANTEE"];
    var BX = [58, 132, 206, 280, 354], BL = [["QUEUE"], ["FIND", "BOOKING"], ["KEY"], ["WALK", "UP"], ["IN", "ROOM"]];
    var BI = [I.users(0, 0, 0.9, WH), I.doc(0, 0, 0.7, WH), I.key(0, 0, 0.8, WH), I.flag(0, 0, 0.7, WH), I.bed(0, 0, 0.8, WH)];
    function journey(y, ly) {
      return P("M40 " + y + " H372", C.slate, 4) + BX.map(function (x, j) {
        return O(x, y, 16, j === 0 ? C.slate : C.navy2) + Tr(x, y, BI[j]) + BL[j].map(function (l, m) { return t(x, ly + m * 24, l, C.ink); }).join("");
      }).join("");
    }
    build3("O1b", 33, [
      // template: Behance — Motion Design Process (production stages shown as team vignettes) — https://www.behance.net/gallery/53752435/Motion-Design-Process
      { a: 0, d: bgc("#f3efe7") + floor() + bx(110, 44, 180, 110, WH, C.slate) + t(200, 70, "CHECK-IN MAP", C.navy) +
          fig(56, 250, 1.5, C.navy) + fig(344, 250, 1.3, C.slate, { hair: "long" }) +
          H("p0a", pill(90, 174, "WHOLE ARRIVAL", { sz: 18, anchor: "start", bg: WH, st: C.navy, fg: C.navy }) +
            pill(318, 214, "OPEN PORTAL", { sz: 18, anchor: "end", bg: WH, st: C.slate, fg: C.slate })) +
          H("p0b", R(126, 84, 100, 58, "none", 6, { stroke: C.navy, "stroke-width": 3 }) + R(250, 124, 14, 14, "none", 3, { stroke: C.slate, "stroke-width": 3 }) +
            ban("VERY DIFFERENT SIZES", C.navy, 22)) +
          H("p0c", P("M130 120 C150 86 170 140 190 92 C210 84 230 140 250 96 C262 86 280 136 266 140 C240 146 150 110 132 100", C.red, 3) +
            ban("AGREE THE LEVEL", C.orange, 22) + pill(200, 274, "NO USEFUL MAP", { sz: 18, bg: C.red, st: C.red, fg: WH })),
        sh: { p0a: [1, 3], p0b: [2, 2], p0c: [3, 3] } },
      // template: Observable — Animated quadtree (a region subdivides into parts) — https://observablehq.com/@d3/animated-quadtree
      { a: 4, d: bgc("#eef2f6") + rep(7, function (i) { return I.hotel(50 + i * 50, 74, 1.4, i === 3 ? C.orange : C.navy); }) +
          H("p1a", ban("FROM HIGH ABOVE", C.navy, 24)) + H("p1b", ban("LEVEL 1 · VALUE CHAIN", C.red, 24)) + H("p1c", ban("ONE OF MANY JOURNEYS", C.orange, 24)) +
          H("p1v", F("M10 112 H350 L388 142 L350 172 H10 L36 142 Z", C.red) + t(196, 140, "VALUE CHAIN", WH) + t(196, 162, "SERVE THE GUEST", C.sun, null, 14)) +
          H("p1j", [["RESERVE", 6, 190, 124], ["CHECK-IN", 138, 190, 124], ["DINING", 270, 190, 124], ["ROOM SERVICE", 20, 236, 176], ["CHECK-OUT", 204, 236, 176]].map(function (c, j) {
            var on = j === 1;
            return bx(c[1], c[2], c[3], 36, on ? C.peach : WH, on ? C.orange : C.slate, 18, on ? 3 : 2) + t(c[1] + c[3] / 2, c[2] + 24, c[0], on ? C.orange : C.slate);
          }).join("")),
        sh: { p1a: [4, 4], p1b: [5, 5], p1c: [6, 6], p1v: [5, 6], p1j: [6, 6] } },
      // template: Observable — Hierarchy traversal animated (visit one node, then its child) — https://old.observablehq.com/@d3/hierarchy-traversal-animated
      { a: 7, d: bgc("#f4f6f9") +
          H("p2a", ban("LEVEL 2 · PROCESS", C.navy, 24)) + H("p2c", ban("LEVEL 3 · SUB-PROCESS", C.green, 24)) +
          bx(6, 46, 388, 104, WH, C.navy) + t(200, 70, "CHECK A GUEST IN", C.navy) +
          ST.map(function (s, j) { var x = 14 + j * 96; return bx(x, 82, 88, 60, j === 1 ? C.sky : "#f6f8fb", j === 1 ? C.navy2 : C.muted, 8, 2) + t(x + 44, 107, s[0], C.ink) + t(x + 44, 131, s[1], C.ink); }).join("") +
          H("p2w", R(108, 80, 92, 64, "none", 10, { stroke: C.red, "stroke-width": 4 }) + clock(154, 190, 22, C.red) + pill(270, 190, "WHY SO SLOW?", { sz: 18, bg: C.red, st: C.red, fg: WH })) +
          H("p2z", P("M110 150 L6 164 M198 150 L394 164", C.navy2, 2.5) + bx(6, 164, 388, 130, "#eef6f1", C.green) + t(200, 188, "VERIFY THE BOOKING", C.green) +
            SUB.map(function (s, j) { var y = 198 + j * 31; return R(20, y, 360, 26, WH, 6, { stroke: C.green, "stroke-width": 2 }) + t(36, y + 20, (j + 1) + "  " + s, C.ink, "start"); }).join("")),
        sh: { p2a: [7, 8], p2c: [9, 9], p2w: [8, 8], p2z: [9, 9] } },
      // template: Dribbble — Product Workflow Animation & UI Motion Design (shift between product states) — https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design
      { a: 10, d: bgc("#f6f4ee") +
          H("p3b0", ban("RATE AND GUARANTEE", C.green, 24)) + H("p3b1", ban("LEVEL 4 · ACTIVITY", C.amber, 24)) + H("p3b2", ban("5 · TASK: ONE ACTION", C.plum, 24)) +
          H("p3s", bx(6, 44, 388, 92, "#eef6f1", C.green) + t(200, 68, "VERIFY THE BOOKING", C.green) +
            bx(14, 82, 70, 40, WH, C.muted, 8, 2) + t(49, 107, "FIND", C.slate, null, 14) +
            bx(92, 82, 208, 40, C.peach, C.orange, 8, 3) + t(196, 108, "RATE + GUARANTEE", C.orange) +
            bx(308, 82, 78, 40, WH, C.muted, 8, 2) + t(347, 107, "CONFIRM", C.slate, null, 14)) +
          H("p3t", R(70, 46, 260, 96, C.ink, 10) + R(80, 56, 240, 76, C.sky, 6) + t(200, 80, "CORPORATE PORTAL", C.navy, null, 14) +
            pill(176, 110, "OPEN", { sz: 18, bg: C.green, st: C.green, fg: WH }) + I.cursor(220, 124, 1.4)) +
          H("p3a", P("M92 122 L6 150 M300 122 L394 150", C.orange, 2.5) + bx(6, 150, 388, 140, C.peach, C.amber) + t(200, 174, "CHECK RATE, GUARANTEE", C.amber) +
            ACT.map(function (s, j) { var y = 186 + j * 34; return R(20, y, 360, 28, WH, 6, { stroke: C.amber, "stroke-width": 2 }) + t(36, y + 21, s, C.ink, "start"); }).join("") +
            H("p3h", R(16, 182, 368, 36, "none", 8, { stroke: C.plum, "stroke-width": 4 }) + I.mag(356, 200, 1.6, C.plum))),
        sh: { p3b0: [10, 10], p3b1: [11, 12], p3b2: [13, 13], p3s: [10, 12], p3t: [13, 13], p3a: [11, 13], p3h: [12, 13] } },
      // template: Behance — The Process Architectural Motion (an idea grows into nested layers) — https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion
      { a: 14, d: bgc("#f4f6f9") +
          H("p4n", rep(5, function (i) { var h = 90 - i * 18; return R(100 - h, 140 - h, h * 2, h * 2, i === 4 ? "#f6f1fb" : "none", 6, { stroke: LVC[i], "stroke-width": 3 }); }) +
            fig(100, 160, 0.6, C.orange, { hair: "long" })) +
          LVN.map(function (n, i) { var y = 56 + i * 42; return R(206, y, 188, 34, WH, 8, { stroke: LVC[i], "stroke-width": 2.5 }) + O(224, y + 17, 9, LVC[i]) + t(240, y + 24, n, LVC[i], "start"); }).join("") +
          H("p4a", ban("SAME GUEST, ANY LEVEL", C.orange, 280)) + H("p4b", ban("SAME WORK, MORE DETAIL", C.navy, 280)) +
          H("p4c", R(200, 94, 198, 42, "none", 10, { stroke: C.orange, "stroke-width": 4 }) + ban("AGREE THE LEVEL", C.orange, 280)) +
          H("p4d", P("M64 176 L204 115 M164 176 L204 241", C.slate, 2.5, { "stroke-dasharray": "5 5" }) +
            fig(50, 232, 1.2, C.navy) + fig(150, 232, 1.2, C.slate, { hair: "long" }) +
            P("M72 120 C86 98 114 98 128 120", C.red, 3) + F("M122 112 L132 124 L118 124 Z", C.red) +
            P("M128 140 C114 160 86 160 72 140", C.red, 3) + F("M78 148 L68 136 L82 136 Z", C.red) + ban("OR ARGUE IN CIRCLES", C.red, 280)),
        sh: { p4n: [14, 16], p4a: [14, 14], p4b: [15, 15], p4c: [16, 16], p4d: [17, 17] } },
      // template: Motion Array — Project TimeLine (markers advance along a time line) — https://motionarray.com/after-effects-templates/project-timeline-2424919/
      { a: 18, d: bgc("#f6f4ee") +
          H("p5a", ban("A SECOND DECISION", C.navy, 24)) + H("p5b", ban("THE PROCESS BOUNDARY", C.navy, 24)) + H("p5c", ban("START AT THE BOOKING?", C.orange, 24)) +
          journey(150, 196) +
          H("p5k", K("p5st", P("M24 112 H14 V178 H24", C.green, 4) + pill(40, 92, "START", { sz: 18, bg: C.green, st: C.green, fg: WH })) +
            P("M384 112 H394 V178 H384", C.red, 4) + pill(366, 92, "END", { sz: 18, bg: C.red, st: C.red, fg: WH })) +
          H("p5o", pill(58, 262, "OUTSIDE", { sz: 18, bg: "#edf0f4", st: C.slate, fg: C.slate, dash: true })),
        sh: { p5a: [18, 18], p5b: [19, 19], p5c: [20, 20], p5k: [19, 20], p5o: [20, 20] }, mv: { p5st: function (k) { return { x: k >= 20 ? 78 : 0 }; } } },
      // template: Dribbble — Motion Graphics tag (elastic queue: requests accumulate under pressure) — https://dribbble.com/tags/motion-graphics
      { a: 21, d: bgc("#f3efe7") + floor() +
          [40, 84, 128].map(function (x, j) { return fig(x, 250, 1.1, [C.slate, C.navy2, C.plum][j]); }).join("") + fig(172, 250, 1.1, C.orange, { hair: "long" }) +
          R(210, 52, 184, 198, "#eef3f8", 12, { stroke: C.navy, "stroke-width": 3, "stroke-dasharray": "8 6" }) + t(302, 82, "THE MAP", C.navy) +
          bx(222, 104, 160, 56, WH, C.navy) + t(302, 140, "FIND BOOKING", C.navy) + pill(302, 204, "STARTS HERE", { sz: 18, bg: C.navy, st: C.navy, fg: WH }) +
          H("p6a", ban("SHE ALREADY QUEUED", C.orange, 24)) +
          H("p6b", clock(106, 110, 30, C.red) + pill(106, 166, "HIDDEN DELAY", { sz: 18, bg: C.red, st: C.red, fg: WH }) + ban("STARTS TOO LATE", C.red, 24)),
        sh: { p6a: [21, 21], p6b: [22, 22] } },
      // template: Motion Array — Scrolling Timeline (pan along time and settle on the event) — https://motionarray.com/after-effects-templates/scrolling-timeline-1223172/
      { a: 23, d: bgc("#f6f4ee") +
          F("M210 262 L210 236 L250 236 L250 210 L290 210 L290 184 L330 184 L330 158 L392 158 L392 262 Z", "#d9cbb3") +
          R(340, 70, 46, 88, "#a8743f", 3) + I.lock(374, 118, 1.4, C.red) +
          R(6, 48, 190, 112, "#eef3f8", 12, { stroke: C.navy, "stroke-width": 3, "stroke-dasharray": "8 6" }) + t(100, 74, "THE MAP", C.navy) +
          I.key(70, 118, 2.2, C.amber) + t(140, 126, "KEY", C.ink) + P("M196 44 V164", C.red, 6) + pill(196, 184, "END", { sz: 18, bg: C.red, st: C.red, fg: WH }) +
          H("p7a", ban("END AT THE KEY?", C.navy, 24)) +
          H("p7n", pill(330, 46, "NOT READY", { sz: 18, bg: C.red, st: C.red, fg: WH })) +
          H("p7g", K("p7m", fig(230, 236, 1, C.orange, { hair: "long" }))) +
          H("p7d", badge(30, 220, 11, true) + t(108, 226, "TASK DONE", C.green) + ban("RESULT MISSING", C.red, 280)),
        sh: { p7a: [23, 23], p7n: [24, 25], p7g: [24, 25], p7d: [25, 25] }, mv: { p7m: function (k) { return k >= 24 ? { x: 86, y: -78 } : {}; } } },
      // template: The Pudding — responsive scrollytelling (pinned before-and-after comparison) — https://pudding.cool/process/responsive-scrollytelling/
      { a: 26, d: bgc("#f1f6f2") +
          H("p8t", journey(112, 158) + P("M24 74 H14 V140 H24", C.green, 4) + P("M384 74 H394 V140 H384", C.green, 4)) +
          H("p8a", ban("ARRIVAL TO RIGHT ROOM", C.green, 24)) +
          H("p8b", ban("ONE SHARED DEFINITION", C.navy, 24) + [120, 200, 280].map(function (x, j) { return fig(x, 276, 0.9, [C.navy, C.green, C.slate][j]) + badge(x + 18, 218, 9, true); }).join("")) +
          H("p8c", bx(6, 44, 188, 160, WH, C.navy) + t(100, 72, "THE MAP", C.navy) + I.key(92, 118, 2.2, C.amber) + badge(150, 118, 12, true) + t(100, 184, "MAP ENDS", C.navy) +
            bx(206, 44, 188, 160, WH, C.red) + t(300, 72, "REALITY", C.red) + I.key(240, 124, 1.8, C.amber) + arr(266, 124, 302, 124, C.slate, 3) +
            R(310, 92, 50, 80, "#a8743f", 3) + I.lock(346, 132, 1.3, C.red)) +
          H("p8d", ban("KEY, LOCKED DOOR", C.red, 238)) +
          H("p8e", R(300, 84, 70, 96, "none", 10, { stroke: C.orange, "stroke-width": 4, "stroke-dasharray": "7 5" }) + ban("WHAT'S LEFT OUT?", C.orange, 238)),
        sh: { p8t: [26, 27], p8a: [26, 26], p8b: [27, 27], p8c: [28, 29], p8d: [28, 28], p8e: [29, 29] } },
      // template: Motion Array — Corporate Timeline by HenlyFx (milestones revealed one by one) — https://motionarray.com/after-effects-templates/corporate-timeline-1939632/
      { a: 30, d: bgc("#f4f6f9") +
          H("p9w", P("M40 120 H340", C.navy, 4) + [[40, "NOW", C.orange], [200, "WEEK 6", C.navy], [340, "WEEK 8", C.navy]].map(function (w) { return O(w[0], 120, 12, w[2]) + t(w[0], 160, w[1], w[2]); }).join("") +
            pill(270, 70, "MAPPING DETAIL", { sz: 18, bg: C.navy2, st: C.navy2, fg: WH }) + I.book(120, 216, 2, C.navy) + I.book(280, 216, 2, C.navy)) +
          H("p9c", bx(6, 40, 188, 170, WH, C.navy) + I.mag(100, 90, 2.6, C.navy) + t(100, 152, "LEVEL", C.navy, null, 26) + t(100, 186, "HOW CLOSELY", C.slate) +
            bx(206, 40, 188, 170, WH, C.orange) + P("M262 66 H250 V114 H262 M338 66 H350 V114 H338", C.orange, 4) + O(300, 90, 10, C.orange) +
            t(300, 152, "BOUNDARY", C.orange, null, 26) + t(300, 186, "WHICH WORK", C.slate)) +
          H("p9q", ban("WHAT WENT WRONG?", C.red, 256)),
        sh: { p9w: [30, 30], p9c: [31, 32], p9q: [32, 32] } }
    ], ["Drawing the map", "Two descriptions", "Different sizes of work", "Agree the level", "From high above",
      "1 · Value chain", "One of many journeys", "2 · Process", "Why so much effort?", "3 · Sub-process",
      "Rate and guarantee", "4 · Activity", "Even closer", "5 · Task", "Same guest, any level",
      "Five levels of detail", "Agree before drawing", "Or argue in circles", "A second decision", "The process boundary",
      "Start at the booking?", "She already queued", "Starts too late", "End at the key?", "Room not ready",
      "Ends too early", "Arrival to right room", "One shared meaning", "Key, locked door", "What's left out?",
      "Weeks 6 and 8", "Level and boundary", "What went wrong?"],
      "Levels and boundaries: two managers describe very different sizes of work, the five levels from value chain to one task, the same check-in seen at each level, then the boundary of check-in from arrival to the right room instead of from finding the booking to handing over the key.", "#f3efe7");
  })();

addStyles(SCENE_BG);
})();

// OPER621 · Week 1 · Fundamentals of Process Management — animated teaching scenes (v3)
// File: w01-v4-part2.js  ·  Scenes: O2a, O2b, O3a, O3b, O4a, O4b, O4c, W1OUTRO
// Standalone part: registers its own scenes on window.VL_SCENES and appends its own
// scoped rules into the single shared <style id="vl-sc-w01">. Parts may be concatenated.
// Contract: VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
// GSAP (window.gsap) is used when present; CSS transitions otherwise; prefers-reduced-motion
// applies every state instantly with no ambient loops. Each visual names the benchmark
// template it adapts (with URL) in a comment above its drawing code.
(function () {
"use strict";
var PART = "v4p2";
  // ===== shared engine (self-contained copy for this part) =====
  var W = window;
  W.VL_SCENES = W.VL_SCENES || {};
  var REG = W.VL_SCENES;
  var C = {
    navy: "#1f4e79", navy2: "#2d6a9f", deep: "#16324d", ink: "#1b2a3a", orange: "#c0502a",
    coral: "#e0734f", green: "#317c61", mint: "#e1f0e8", gold: "#e5b76c", amber: "#a8741a",
    sun: "#f2c46d", paper: "#fbf8f1", cream: "#f3ecdf", blue: "#dbe7f2", sky: "#eaf2f8",
    slate: "#5d7389", muted: "#91aabd", white: "#ffffff", red: "#b0362b", plum: "#6b4e8a",
    peach: "#f8e3d8", lilac: "#ece6f3", skin: "#f0c8a2", hair: "#3b2a22", wood: "#b98a5a", night: "#13263b"
  };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var num = function (v, f) { var x = Number(v); return isFinite(x) ? x : f; };
  var inR = function (k, a, b) { return k >= a && k <= b; };
  var rep = function (n, f) { var s = ""; for (var i = 0; i < n; i++) s += f(i); return s; };
  function reduced() {
    try { return !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; }
  }
  function hasG() { return !!(W.gsap && typeof W.gsap.to === "function" && typeof W.gsap.set === "function") && !reduced(); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function at(o) { var s = ""; if (o) for (var k in o) if (o[k] != null && o[k] !== false) s += " " + k + '="' + esc(o[k]) + '"'; return s; }

  // ---- SVG string builders ----
  function R(x, y, w, h, f, rx, ex) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx || 0) + '" fill="' + (f || "none") + '"' + at(ex) + "/>"; }
  function O(cx, cy, r, f, ex) { return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (f || "none") + '"' + at(ex) + "/>"; }
  function E(cx, cy, rx, ry, f, ex) { return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + (f || "none") + '"' + at(ex) + "/>"; }
  function P(d, s, w, ex) { return '<path d="' + d + '" fill="none" stroke="' + s + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + at(ex) + "/>"; }
  function F(d, f, ex) { return '<path d="' + d + '" fill="' + f + '"' + at(ex) + "/>"; }
  // keyed drawable stroke (draw 0..1)
  function D(k, d, s, w, ex) {
    var a = { "data-k": k, pathLength: 100, "stroke-dasharray": "100 100", "stroke-dashoffset": 100 };
    if (ex) for (var q in ex) a[q] = ex[q];
    return P(d, s, w || 3, a);
  }
  function T(x, y, s, sz, f, ex, anchor) {
    var a = { "text-anchor": anchor || "middle" }; if (ex) for (var q in ex) a[q] = ex[q];
    sz = sz || 18; if (sz >= 14.5 && sz < 18) sz = 18; // v3: primary labels at least 18 units
    return '<text x="' + x + '" y="' + y + '" font-size="' + sz + '" fill="' + (f || C.ink) + '"' + at(a) + ">" + esc(s) + "</text>";
  }
  function TK(k, x, y, s, sz, f, anchor, ex) { var a = { "data-k": k }; if (ex) for (var q in ex) a[q] = ex[q]; return T(x, y, s, sz, f, a, anchor); }
  function K(k, body, ex) { var a = { "data-k": k }; if (ex) for (var q in ex) a[q] = ex[q]; return "<g" + at(a) + ">" + body + "</g>"; }
  function H(k, body, ex) { var a = { "data-k": k, style: "opacity:0" }; if (ex) for (var q in ex) a[q] = ex[q]; return "<g" + at(a) + ">" + body + "</g>"; }
  function Tr(x, y, body, s, r) { return '<g transform="translate(' + x + " " + y + ")" + (r ? " rotate(" + r + ")" : "") + (s && s !== 1 ? " scale(" + s + ")" : "") + '">' + body + "</g>"; }
  // pill label; width is refitted to the real text after mounting
  function pill(x, y, s, o) {
    o = o || {};
    var sz = Math.max(18, o.sz || 18), h = Math.round(sz * 1.8), w = Math.round(String(s).length * sz * 0.66 + sz * 1.4);
    var an = o.anchor || "middle", x0 = an === "start" ? x : an === "end" ? x - w : x - w / 2;
    x0 = clamp(x0, 2, Math.max(2, 398 - w));
    return '<g data-pill="' + an + '" data-px="' + x + '">' +
      R(x0, y - h / 2, w, h, o.bg || C.paper, h / 2, { stroke: o.st || C.navy, "stroke-width": o.sw || 2, "stroke-dasharray": o.dash ? "5 4" : null }) +
      T(x0 + w / 2, y + sz * 0.36, s, sz, o.fg || C.navy) + "</g>";
  }
  function tick(x, y, s, col, w) { s = s || 1; return P("M" + (x - 7 * s) + " " + y + " l" + 5 * s + " " + 5 * s + " l" + 10 * s + " " + -11 * s, col || C.green, w || 3); }
  function cross(x, y, s, col, w) { s = s || 1; return P("M" + (x - 6 * s) + " " + (y - 6 * s) + " l" + 12 * s + " " + 12 * s + " M" + (x + 6 * s) + " " + (y - 6 * s) + " l" + -12 * s + " " + 12 * s, col || C.orange, w || 3); }
  function badge(x, y, r, ok) { return O(x, y, r, ok ? C.green : C.red, { stroke: C.white, "stroke-width": 2 }) + (ok ? tick(x, y + 1, r / 13, C.white, 2.6) : cross(x, y, r / 14, C.white, 2.6)); }
  function clock(x, y, r, col, bg) { col = col || C.orange; return O(x, y, r, bg || C.paper, { stroke: col, "stroke-width": Math.max(2, r / 6) }) + P("M" + x + " " + (y - r * 0.62) + " V" + y + " L" + (x + r * 0.45) + " " + (y + r * 0.3), col, Math.max(2, r / 7)); }
  // friendly character, feet at (x,y); about 60*s tall. o.k adds keyed mouths k+"-sm" / k+"-fr"
  function fig(x, y, s, body, o) {
    o = o || {};
    var m = o.k ? K(o.k + "-sm", P("M-3.5 -41 Q0 -37.5 3.5 -41", C.ink, 1.6)) + H(o.k + "-fr", P("M-3.5 -38.5 Q0 -42 3.5 -38.5", C.ink, 1.6)) :
      (o.mood === "frown" ? P("M-3.5 -38.5 Q0 -42 3.5 -38.5", C.ink, 1.6) : P("M-3.5 -41 Q0 -37.5 3.5 -41", C.ink, 1.6));
    var hair = o.hair === "long" ? F("M-11 -44 Q-12 -60 0 -59 Q12 -60 11 -44 L11 -33 Q8 -40 8 -48 Q0 -52 -8 -48 Q-8 -40 -11 -33 Z", o.hc || C.hair) :
      F("M-10 -48 Q-9.5 -59 0 -58.5 Q10 -59 10 -48 Q5 -53 -10 -48 Z", o.hc || C.hair);
    return Tr(x, y, F("M-14 0 L-14 -23 Q-14 -35 0 -35 Q14 -35 14 -23 L14 0 Z", body || C.navy) + (o.badge ? O(7, -24, 4, o.badge) : "") +
      O(0, -46, 10.5, C.skin) + hair + O(-3.6, -46.5, 1.6, C.ink) + O(3.6, -46.5, 1.6, C.ink) + m, s);
  }
  var I = {
    bell: function (x, y, s, c) { return Tr(x, y, F("M-10 6 Q-10 -9 0 -9 Q10 -9 10 6 Z", c || C.gold) + R(-12, 6, 24, 3, C.ink, 1.5) + O(0, -11, 2.5, C.ink), s); },
    doc: function (x, y, s, c) { return Tr(x, y, R(-9, -12, 18, 24, C.white, 2, { stroke: c || C.navy, "stroke-width": 2 }) + P("M-5 -5 H5 M-5 0 H5 M-5 5 H2", c || C.navy, 1.6), s); },
    money: function (x, y, s, c) { return Tr(x, y, O(0, 0, 11, c || C.gold) + P("M3.5 -4.5 Q0 -7 -3.2 -4.8 Q-5.5 -1.8 0 0 Q5.5 1.8 3.2 4.8 Q0 7 -3.5 4.5 M0 -8.5 V8.5", C.white, 2), s); },
    bed: function (x, y, s, c) { return Tr(x, y, R(-12, -2, 24, 8, c || C.navy, 2) + R(-12, -8, 7, 6, C.white, 2, { stroke: c || C.navy, "stroke-width": 1.5 }) + P("M-12 6 V10 M12 6 V10", c || C.navy, 2), s); },
    key: function (x, y, s, c) { return Tr(x, y, O(-6, 0, 6, "none", { stroke: c || C.amber, "stroke-width": 3 }) + P("M0 0 H12 M8 0 V5 M11 0 V4", c || C.amber, 3), s); },
    phone: function (x, y, s, c) { return Tr(x, y, F("M-9 -6 Q-9 -10 -5 -10 L-3 -10 L-1 -5 L-4 -3 Q-2 3 4 4 L6 1 L10 3 L10 5 Q10 9 6 9 Q-9 8 -9 -6 Z", c || C.navy), s); },
    passport: function (x, y, s, c) { return Tr(x, y, R(-8, -11, 16, 22, c || C.navy, 2) + O(0, -2, 4, "none", { stroke: C.gold, "stroke-width": 1.4 }) + P("M-4 6 H4", C.gold, 1.4), s); },
    lock: function (x, y, s, c) { return Tr(x, y, P("M-5 -2 V-6 Q-5 -11 0 -11 Q5 -11 5 -6 V-2", c || C.red, 2.4) + R(-8, -2, 16, 12, c || C.red, 2) + O(0, 3, 1.8, C.white), s); },
    star: function (x, y, s, c) { return Tr(x, y, F("M0 -11 L3 -3.5 L11 -3.5 L4.5 1.5 L7 9.5 L0 4.5 L-7 9.5 L-4.5 1.5 L-11 -3.5 L-3 -3.5 Z", c || C.sun), s); },
    mag: function (x, y, s, c) { return Tr(x, y, O(-2, -2, 8, C.white, { stroke: c || C.navy, "stroke-width": 3, "fill-opacity": 0.55 }) + P("M4 4 L10 10", c || C.navy, 4), s); },
    hotel: function (x, y, s, c) { return Tr(x, y, R(-9, -12, 18, 24, c || C.navy, 1.5) + R(-5, -8, 3, 3, C.sun) + R(2, -8, 3, 3, C.sun) + R(-5, -2, 3, 3, C.sun) + R(2, -2, 3, 3, C.sun) + R(-2, 6, 4, 6, C.sun), s); },
    plane: function (x, y, s, c) { return Tr(x, y, F("M-12 1 L10 -1 Q14 0 10 1.5 L-12 3 Z M-2 0 L4 -9 L7 -9 L4 0 Z M-2 2 L4 10 L7 10 L4 2 Z M-11 0 L-13 -5 L-10 -5 L-7 0 Z", c || C.white), s); },
    screen: function (x, y, s, c) { return Tr(x, y, R(-12, -9, 24, 16, c || C.navy, 2) + R(-10, -7, 20, 12, C.sky, 1) + P("M0 7 V11 M-5 11 H5", c || C.navy, 2), s); },
    cursor: function (x, y, s, c) { return Tr(x, y, F("M-6 -10 L8 2 L1 3 L5 11 L2 12 L-2 4 L-6 8 Z", c || C.ink, { stroke: C.white, "stroke-width": 1.2 }), s); },
    flag: function (x, y, s, c) { return Tr(x, y, P("M-6 11 V-11", C.ink, 2) + F("M-6 -11 L9 -6 L-6 -1 Z", c || C.green), s); },
    book: function (x, y, s, c) { return Tr(x, y, R(-11, -13, 22, 26, c || C.navy, 2) + R(-8, -10, 16, 20, C.paper, 1) + P("M-5 -5 H5 M-5 0 H5", c || C.navy, 1.5), s); },
    users: function (x, y, s, c) { return Tr(x, y, O(-5, -5, 4, c || C.navy) + O(5, -5, 4, c || C.navy) + F("M-11 8 Q-11 -1 -5 -1 Q1 -1 1 8 Z", c || C.navy) + F("M-1 8 Q-1 -1 5 -1 Q11 -1 11 8 Z", c || C.navy), s); },
    gear: function (x, y, r, col, hole) {
      var d = "", n = 10;
      for (var i = 0; i < n; i++) {
        var a0 = (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n * 0.55, a2 = a0 + Math.PI / n, a3 = a2 + Math.PI / n * 0.45;
        var p = function (a, rr) { return (x + rr * Math.cos(a)).toFixed(1) + " " + (y + rr * Math.sin(a)).toFixed(1); };
        d += (i ? "L" : "M") + p(a0, r) + "L" + p(a1, r) + "L" + p(a2, r * 0.8) + "L" + p(a3, r * 0.8);
      }
      return F(d + "Z", col) + O(x, y, r * 0.5, hole || C.paper);
    }
  };

  // ---- stylesheet: one shared <style id="vl-sc-w01">, rules scoped per scene ----
  var KEYFRAMES = "@keyframes vlsw01v2Cap{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}" +
    "@keyframes vlsw01v2Flow{to{stroke-dashoffset:-24}}@keyframes vlsw01v2Spin{to{transform:rotate(360deg)}}" +
    "@keyframes vlsw01v2Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}" +
    "@keyframes vlsw01v2Pulse{0%,100%{opacity:.4;transform:scale(.95)}50%{opacity:1;transform:scale(1.06)}}" +
    "@keyframes vlsw01v2Blink{0%,100%{opacity:1}50%{opacity:.35}}";
  function sceneCSS(id, bg) {
    var s = ".vls-w01-" + id;
    return s + "{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:220px;overflow:hidden!important;box-sizing:border-box;background:" + bg + ";color:" + C.ink + ";font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}" +
      s + " *{box-sizing:border-box}" +
      s + " .w01-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}" +
      s + " .w01-fig>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}" +
      s + " svg text{font-family:inherit;font-weight:800;letter-spacing:.2px}" +
      s + " [data-k]{transform-box:fill-box;transform-origin:50% 50%}" +
      s + ".w01-css [data-k]{transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.85s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}" +
      s + ".w01-snap [data-k]," + s + ".w01-rm [data-k]{transition:none!important}" +
      s + ".w01-rm *," + s + ".w01-snap *{animation:none!important}" +
      s + " .w01-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:36px;padding:6px 12px 8px;font-size:15px;font-weight:800;line-height:1.25;color:" + C.navy + ";background:rgba(255,255,255,.7);border-top:1px solid rgba(31,78,121,.14)}" +
      s + " .w01-num{flex:0 0 auto;min-width:40px;padding:2px 8px;border-radius:999px;background:" + C.navy + ";color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}" +
      s + " .w01-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.3px;text-transform:uppercase}" +
      s + " .w01-lab.w01-in{animation:vlsw01v2Cap .5s cubic-bezier(.22,.8,.24,1)}" +
      s + " .w01-bar{flex:0 0 54px;height:4px;border-radius:4px;background:rgba(31,78,121,.15);overflow:hidden}" +
      s + " .w01-bar i{display:block;height:100%;width:0;background:" + C.orange + ";transition:width .6s ease}" +
      s + " .a-flow{stroke-dasharray:6 6;animation:vlsw01v2Flow 1.1s linear infinite}" +
      s + " .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw01v2Spin 7s linear infinite}" +
      s + " .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw01v2Bob 2.6s ease-in-out infinite}" +
      s + " .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw01v2Pulse 1.9s ease-in-out infinite}" +
      s + " .a-blink{animation:vlsw01v2Blink 1.4s ease-in-out infinite}" +
      "@media (max-width:420px){" + s + " .w01-cap{font-size:14px;min-height:32px;padding:5px 10px 7px}" + s + " .w01-bar{flex-basis:40px}}" +
      "@media (prefers-reduced-motion:reduce){" + s + " *{animation:none!important;transition:none!important}}";
  }
  function addStyles(list) {
    if (typeof document === "undefined") return;
    var st = document.getElementById("vl-sc-w01");
    if (!st) { st = document.createElement("style"); st.id = "vl-sc-w01"; (document.head || document.documentElement).appendChild(st); }
    var flag = "data-w01v2-" + PART;
    if (st.getAttribute(flag)) return;
    st.setAttribute(flag, "1");
    st.appendChild(document.createTextNode(KEYFRAMES + list.map(function (p) { return sceneCSS(p[0], p[1]); }).join("\n")));
  }

  // ---- scene factory: build(el), step(i, n), reset() ----
  function makeScene(cfg) {
    var id = cfg.id, N = cfg.N, labels = cfg.labels;
    var root = null, useG = false, timers = [], rafs = [], cache = {}, pendingOps = null, preparation = 0;
    function mapK(i, n) {
      var nn = Math.max(1, Math.floor(num(n, N)));
      var ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
      return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
    }
    function nodes(k) {
      if (!root) return [];
      if (!cache[k]) cache[k] = Array.prototype.slice.call(root.querySelectorAll('[data-k="' + k + '"]'));
      return cache[k];
    }
    function timing(el, t) { el.style.transitionDuration = (t.d == null ? 0.85 : t.d) + "s"; el.style.transitionDelay = (t.dl || 0) + "s"; }
    function tf(el, st, t, snap) {
      if (pendingOps) { pendingOps.push(function () { tf(el, st, t, snap); }); return; }
      var x = st.x || 0, y = st.y || 0, r = st.r || 0;
      var sx = st.sx != null ? st.sx : (st.s != null ? st.s : 1), sy = st.sy != null ? st.sy : (st.s != null ? st.s : 1);
      if (useG && !snap) {
        var v = { x: x, y: y, rotation: r, scaleX: sx, scaleY: sy, duration: t.d == null ? 0.85 : t.d, delay: t.dl || 0, ease: t.e || "power3.out", overwrite: "auto" };
        if (st.pv) v.svgOrigin = st.pv[0] + " " + st.pv[1]; else v.transformOrigin = "50% 50%";
        W.gsap.to(el, v); return;
      }
      if (useG) {
        var v2 = { x: x, y: y, rotation: r, scaleX: sx, scaleY: sy };
        if (st.pv) v2.svgOrigin = st.pv[0] + " " + st.pv[1]; else v2.transformOrigin = "50% 50%";
        W.gsap.set(el, v2); return;
      }
      if (st.pv) { el.style.transformBox = "view-box"; el.style.transformOrigin = st.pv[0] + "px " + st.pv[1] + "px"; }
      timing(el, t);
      el.style.transform = "translate(" + x + "px," + y + "px) rotate(" + r + "deg) scale(" + sx + "," + sy + ")";
    }
    function op(el, o, t, snap) {
      if (pendingOps) { pendingOps.push(function () { op(el, o, t, snap); }); return; }
      if (useG) { if (snap) W.gsap.set(el, { opacity: o }); else W.gsap.to(el, { opacity: o, duration: t.d == null ? 0.6 : t.d, delay: t.dl || 0, ease: "power1.out", overwrite: false }); }
      else { timing(el, t); el.style.opacity = String(o); }
    }
    function dash(el, f, t, snap) {
      if (pendingOps) { pendingOps.push(function () { dash(el, f, t, snap); }); return; }
      var v = 100 * (1 - clamp(f, 0, 1));
      if (useG) { if (snap) W.gsap.set(el, { strokeDashoffset: v }); else W.gsap.to(el, { strokeDashoffset: v, duration: t.d == null ? 1.1 : t.d, delay: t.dl || 0, ease: "power2.inOut" }); }
      else { timing(el, t); el.style.strokeDashoffset = String(v); }
    }
    function fill(el, col, t, snap) {
      if (pendingOps) { pendingOps.push(function () { fill(el, col, t, snap); }); return; }
      if (useG) { if (snap) W.gsap.set(el, { fill: col }); else W.gsap.to(el, { fill: col, duration: t.d == null ? 0.6 : t.d, delay: t.dl || 0 }); }
      else { timing(el, t); el.style.fill = col; }
    }
    function later(ms, fn, snap) { if (snap) fn(); else timers.push(setTimeout(fn, ms)); }
    function ctx(snap) {
      var c = {
        snap: snap,
        op: function (k, o, t) { nodes(k).forEach(function (el) { op(el, o, t || {}, snap); }); },
        mv: function (k, st, t) { nodes(k).forEach(function (el) { tf(el, st, t || {}, snap); }); },
        dr: function (k, f, t) { nodes(k).forEach(function (el) { dash(el, f, t || {}, snap); }); },
        fl: function (k, col, t) { nodes(k).forEach(function (el) { fill(el, col, t || {}, snap); }); },
        tx: function (k, s) { nodes(k).forEach(function (el) { if (el.textContent !== String(s)) el.textContent = String(s); }); },
        vis: function (map, t) { Object.keys(map).forEach(function (k) { var v = map[k]; nodes(k).forEach(function (el) { op(el, v === true ? 1 : v === false ? 0 : v, t || {}, snap); }); }); },
        all: function (sel) { return root ? Array.prototype.slice.call(root.querySelectorAll(sel)) : []; },
        // travel through offsets [[x,y],...] over t seconds; lands on the last point
        route: function (k, pts, t) {
          t = t || 1.8; var n = pts.length;
          if (snap || n < 2) { c.mv(k, { x: pts[n - 1][0], y: pts[n - 1][1] }, { d: 0 }); return; }
          var leg = t / (n - 1);
          c.mv(k, { x: pts[0][0], y: pts[0][1] }, { d: 0.2 });
          for (var j = 1; j < n; j++) (function (j) { later(200 + (j - 1) * leg * 1000, function () { c.mv(k, { x: pts[j][0], y: pts[j][1] }, { d: leg, e: "power1.inOut" }); }, false); })(j);
        },
        count: function (k, to, t, fmt) {
          fmt = fmt || function (v) { return String(Math.round(v)); };
          nodes(k).forEach(function (el) {
            var from = el.__n != null ? el.__n : 0; el.__n = to;
            if (snap || from === to) { el.textContent = fmt(to); return; }
            var t0 = null, dur = (t || 1) * 1000;
            var tick2 = function (ts) { if (t0 === null) t0 = ts; var u = clamp((ts - t0) / dur, 0, 1), e = 1 - Math.pow(1 - u, 3); el.textContent = fmt(from + (to - from) * e); if (u < 1) rafs.push(requestAnimationFrame(tick2)); };
            rafs.push(requestAnimationFrame(tick2));
          });
        }
      };
      return c;
    }
    function caption(k, snap) {
      var lab = root.querySelector(".w01-lab"), nn = root.querySelector(".w01-num"), bar = root.querySelector(".w01-bar i");
      var txt = labels[k] || "";
      if (lab && lab.textContent !== txt) { lab.textContent = txt; if (!snap && !reduced()) { lab.classList.remove("w01-in"); void lab.offsetWidth; lab.classList.add("w01-in"); } }
      if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
      if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
    }
    function stopAsync() {
      timers.forEach(function (t) { clearTimeout(t); }); timers = [];
      rafs.forEach(function (r) { cancelAnimationFrame(r); }); rafs = [];
      if (root && useG && W.gsap.killTweensOf) { try { W.gsap.killTweensOf(root.querySelectorAll("[data-k]")); } catch (e) { } }
    }
    function render(k, snap) {
      if (!root) return;
      stopAsync();
      snap = snap || reduced();
      if (snap) root.classList.add("w01-snap");
      try { cfg.render(ctx(snap), k); } catch (e) { if (W.console) console.warn("[VL W01 " + id + "]", e); }
      caption(k, snap);
      if (snap) { void root.offsetWidth; root.classList.remove("w01-snap"); }
      root.setAttribute("data-moment", String(k));
    }
    function fitPills(r) {
      var pills = Array.prototype.map.call(r.querySelectorAll("[data-pill]"), function (g) {
        var t = g.querySelector("text"), rc = g.querySelector("rect"), len = 0;
        if (t && rc) { try { len = t.getComputedTextLength(); } catch (e) {} }
        return { g: g, t: t, rc: rc, len: len };
      });
      pills.forEach(function (item) {
        var g = item.g, t = item.t, rc = item.rc, len = item.len;
        if (!(len > 0)) return;
        var fs = parseFloat(t.getAttribute("font-size")) || 16, w = len + fs * 1.3;
        var x = parseFloat(g.getAttribute("data-px")) || 0, an = g.getAttribute("data-pill");
        var x0 = an === "start" ? x : an === "end" ? x - w : x - w / 2;
        x0 = clamp(x0, 2, Math.max(2, 398 - w));
        rc.setAttribute("x", x0.toFixed(1)); rc.setAttribute("width", w.toFixed(1)); t.setAttribute("x", (x0 + w / 2).toFixed(1));
      });
    }
    function mount(el) {
      var r = document.createElement("div");
      r.className = "vls-w01-" + id + " w01-root " + (useG ? "w01-gsap" : "w01-css") + (reduced() ? " w01-rm" : "");
      r.setAttribute("data-vls-scene", id);
      r.innerHTML = '<div class="w01-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
        esc(cfg.desc) + '">' + cfg.draw(id + PART) + '</svg></div><div class="w01-cap" aria-hidden="true"><span class="w01-num"></span><span class="w01-lab"></span><span class="w01-bar"><i></i></span></div>';
      if (typeof el.replaceChildren === "function") el.replaceChildren(r); else { while (el.firstChild) el.removeChild(el.firstChild); el.appendChild(r); }
      fitPills(r);
      return r;
    }
    return {
      build: function (el) {
        if (!el || el.nodeType !== 1) return;
        stopAsync(); cache = {};
        useG = hasG();
        root = mount(el);
        if (!W.VL_WORK || VL_WORK.immediate) { render(0, true); return; }
        var owner = root, version = ++preparation, commands = [];
        return (async function () {
          await VL_WORK.yield();
          if (root !== owner || preparation !== version || !owner.isConnected) return;
          pendingOps = commands;
          try { render(0, true); } finally { pendingOps = null; }
          await VL_WORK.yield();
          var slice = performance.now();
          for (var command of commands) {
            if (root !== owner || preparation !== version || !owner.isConnected) return;
            command();
            if (performance.now() - slice > 6) { await VL_WORK.yield(); slice = performance.now(); }
          }
        })();
      },
      step: function (i, n) { if (root) render(mapK(i, n), false); },
      reset: function () { if (W.VL_WORK?.discarding) { preparation++; stopAsync(); return; } if (root) render(0, true); }
    };
  }
  // which visual (segment) a moment belongs to; cuts = first moment of each segment after the first
  function segOf(k, cuts) { var s = 0; for (var i = 0; i < cuts.length; i++) if (k >= cuts[i]) s = i + 1; return s; }
  function stages(c, k, cuts, n) { var s = segOf(k, cuts); for (var i = 0; i < n; i++) { c.all('[data-k="S' + i + '"]').forEach(function (el, _, a) { el.style.visibility = el.getAttribute("data-k") === "S" + s ? "visible" : "hidden"; }); c.op("S" + i, i === s ? 1 : 0, { d: 0.55 }); c.mv("S" + i, i === s ? {} : { y: i < s ? -14 : 14 }, { d: 0.7 }); } return s; }
  var SCENE_BG = [];
  // ============================================================
  // v3 part 2 — O2a, O2b, O3a, O3b, O4a, O4b, O4c, W1OUTRO rebuilt from scratch.
  // Each section is a list of stages (one teaching composition per 2-5 narration
  // lines). Only the active stage is visible (opacity 0 + visibility hidden for
  // all others), and render() touches only the active stage's keys, with closed
  // moment ranges, so forward, backward, repeated and reset steps give the same
  // picture for the same moment. Numbers used are only those the narration states.
  // ============================================================
  var WH = C.white;
  function bx(x, y, w, h, f, s, rx, sw, ex) { var a = { stroke: s || C.navy, "stroke-width": sw || 2.5 }; if (ex) for (var q in ex) a[q] = ex[q]; return R(x, y, w, h, f || WH, rx == null ? 10 : rx, a); }
  function t(x, y, s, col, an, sz) { return T(x, y, s, sz || 18, col || C.ink, null, an); }
  function ban(s, col, y, fg) { return pill(200, y || 26, s, { sz: 18, bg: col || C.navy, st: col || C.navy, fg: fg || WH }); }
  function lab(x, y, s, col) { return pill(x, y, s, { sz: 18, bg: WH, st: col || C.navy, fg: col || C.navy }); }
  function arr(x1, y1, x2, y2, col, w, ex) {
    var a = Math.atan2(y2 - y1, x2 - x1), h = 10, c1 = col || C.navy;
    return P("M" + x1 + " " + y1 + " L" + x2 + " " + y2, c1, w || 3, ex) +
      F("M" + x2 + " " + y2 + " L" + (x2 - h * Math.cos(a - 0.45)).toFixed(1) + " " + (y2 - h * Math.sin(a - 0.45)).toFixed(1) + " L" + (x2 - h * Math.cos(a + 0.45)).toFixed(1) + " " + (y2 - h * Math.sin(a + 0.45)).toFixed(1) + " Z", c1);
  }
  function bgc(col) { return R(-400, -300, 1200, 600, col); }
  function floor(col) { return R(-400, 250, 1200, 100, col || "#e2d8c6"); }
  // six desk activities, minutes as the narration states them (sum 23)
  var SEG = [["QUEUE", 6, C.slate], ["FIND", 4, C.navy2], ["RE-KEY", 3, C.plum], ["CALL", 7, C.orange], ["ROOM", 2, C.amber], ["KEY", 1, C.green]];
  var PX = 360 / 23;
  function segX(i) { var m = 0; for (var j = 0; j < i; j++) m += SEG[j][1]; return 20 + m * PX; }
  function strip(pre, y, h) {
    return R(20, y, 360, h, "#e6e2da", 6) + SEG.map(function (s, i) {
      var x = segX(i), w = s[1] * PX;
      return H(pre + i, R(x + 1, y, w - 2, h, s[2], 4) + T(x + w / 2, y + h / 2 + 7, String(s[1]), s[1] > 1 ? 20 : 14, WH));
    }).join("");
  }
  // stage-driven scene: only the active stage is rendered each step
  function build3(id, N, stg, labels, desc, bgcol) {
    var CUTS = stg.slice(1).map(function (s) { return s.a; });
    function draw() { return stg.map(function (s, i) { return (i ? H : K)("S" + i, s.d); }).join(""); }
    function render(c, k) {
      var si = stages(c, k, CUTS, stg.length), S = stg[si], q;
      if (S.sh) for (q in S.sh) { var r = S.sh[q], on = k >= r[0] && k <= r[1]; c.op(q, on ? (r[3] == null ? 1 : r[3]) : 0, { dl: on && k === r[0] && r[2] ? r[2] : 0, d: on ? 0.5 : 0 }); /* v4: leaving items vanish at once */ }
      if (S.mv) for (q in S.mv) c.mv(q, S.mv[q](k) || {}, { d: 1 });
      if (S.dr) for (q in S.dr) { var z = S.dr[q]; c.dr(q, k >= z[0] && k <= z[1] ? 1 : 0, { d: 1.1, dl: z[2] || 0 }); }
      if (S.fl) for (q in S.fl) c.fl(q, S.fl[q](k), { d: 0.6 });
    }
    REG[id] = makeScene({ id: id, N: N, labels: labels, draw: draw, render: render, desc: desc });
    SCENE_BG.push([id, bgcol]);
  }

  // ============================================================
  // O2a · One guest, nine departments · 30 moments · 10 compositions
  // ============================================================
  (function () {
    var D9 = [I.bell(0, 0, 1.1), I.doc(0, 0, 1), I.money(0, 0, 1, C.green), I.bed(0, 0, 1.1, C.slate), I.money(0, 0, 1, C.amber)];
    build3("O2a", 30, [
      // template: Kurzgesagt — living process token (one protagonist walks into the system) — https://kurzgesagt.org/what-we-do
      { a: 0, d: bgc("#13263b") + floor("#22344a") + R(230, 70, 160, 180, "#2f4b6b", 4) +
          rep(12, function (i) { return R(246 + (i % 4) * 34, 124 + Math.floor(i / 4) * 30, 18, 14, "#f7d48b", 2); }) +
          R(240, 80, 140, 32, C.deep, 6) + t(310, 103, "QASR MARINA", C.sun) + R(290, 210, 40, 40, "#ffe3a3", 3) +
          K("a0g", fig(0, 250, 1.6, C.orange, { hair: "long" }) + R(22, 214, 16, 32, C.navy, 4)) +
          H("a0q", ban("A SIMPLE CHECK-IN?", C.orange, 34)) +
          H("a0t", pill(110, 40, "7:40 PM", { sz: 22, bg: C.sun, st: C.sun, fg: C.ink }) + pill(110, 84, "DELAYED FLIGHT", { sz: 18, bg: C.red, st: C.red, fg: WH })) +
          H("a0b", R(170, 110, 120, 70, WH, 20) + O(166, 190, 5, WH) + I.bed(230, 138, 2, C.green) + t(230, 170, "HER ROOM", C.green, null, 16)),
        sh: { a0q: [0, 0], a0t: [1, 2], a0b: [2, 2] }, mv: { a0g: function (k) { return { x: k === 0 ? 40 : 120 }; } } },
      // template: Dribbble — Workflow Animation (a trigger token travels to an outcome) — https://dribbble.com/shots/3791748-Workflow-Animation
      { a: 3, d: bgc("#f4efe6") +
          bx(6, 52, 112, 56, WH, C.navy) + t(62, 87, "COMPANY", C.navy) + arr(120, 80, 140, 80) +
          bx(144, 52, 112, 56, WH, C.navy) + t(200, 87, "AGENCY", C.navy) + arr(258, 80, 278, 80) +
          bx(282, 52, 112, 56, C.mint, C.green) + t(338, 87, "QASR", C.green) +
          K("b1tok", O(62, 124, 13, C.sun, { stroke: C.amber, "stroke-width": 2 }) + T(62, 130, "%", 15, C.ink)) +
          H("b1h", ban("CORPORATE RATE AGREED", C.amber, 24)) +
          H("b1low", bx(6, 152, 190, 120, WH, C.red) + t(101, 176, "FRONT DESK", C.red) + t(20, 206, "GUEST", C.ink, "start") + badge(176, 200, 9, true) +
            t(20, 234, "ROOM", C.ink, "start") + badge(176, 228, 9, true) + t(20, 262, "RATE", C.red, "start") + t(150, 262, "—", C.red) + badge(176, 256, 9, false) +
            bx(204, 152, 190, 120, C.mint, C.green) + t(299, 176, "REVENUE", C.green) + t(220, 214, "CORPORATE", C.green, "start") + t(220, 240, "RATE", C.green, "start") + badge(372, 232, 10, true)) +
          H("b1m", ban("RATE NOT ON HER SCREEN", C.red, 24)),
        sh: { b1h: [3, 3], b1low: [4, 4, 0.3], b1m: [4, 4] }, mv: { b1tok: function (k) { return { x: k >= 3 ? 276 : 0 }; } } },
      // template: LottieFiles — Workflow by a (workers revealed, then workflow actions) — https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm
      { a: 5, d: bgc("#eef3f8") +
          [["RESERVATIONS", "BOOKING", 2, 44], ["REVENUE", "RATE", 238, 44], ["HOUSEKEEPING", "ROOM STATUS", 2, 176], ["FINANCE", "BILLING", 238, 176]].map(function (b, j) {
            return H("c2b" + j, bx(b[2], b[3], 160, 70, WH, [C.navy, C.green, C.slate, C.amber][j]) + t(b[2] + 80, b[3] + 28, b[0], [C.navy, C.green, C.slate, C.amber][j]) + t(b[2] + 80, b[3] + 56, b[1], C.ink, null, 16));
          }).join("") +
          H("c2ar", [[162, 80], [238, 80], [162, 210], [238, 210]].map(function (p) { return P("M" + p[0] + " " + p[1] + " L200 150", C.orange, 3, { "class": "a-flow" }); }).join("")) +
          fig(200, 212, 1.3, C.navy, { hair: "long" }) + R(160, 212, 80, 36, C.navy, 4) +
          H("c2h", ban("INFORMATION IS SCATTERED", C.navy, 22)) +
          H("c2s", ban("SEARCH, CHECK, CALL, WAIT", C.orange, 280)),
        sh: { c2b0: [6, 8, 0], c2b1: [6, 8, 0.4], c2b2: [7, 8, 0], c2b3: [7, 8, 0.4], c2ar: [8, 8], c2h: [5, 7], c2s: [8, 8] } },
      // template: Motion Array — Infographic Chart Creator (bars grow, values stamp in) — https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/
      { a: 9, d: bgc("#f6f1ea") +
          H("d3t0", bx(6, 20, 190, 130, WH, C.red) + t(101, 84, "23 MIN", C.red, null, 38) + t(101, 124, "AT THE DESK", C.ink)) +
          H("d3t1", bx(204, 20, 190, 130, WH, C.orange) + I.passport(262, 66, 2) + I.passport(330, 66, 2) + O(276, 46, 11, C.orange) + T(276, 52, "1", 14, WH) + O(344, 46, 11, C.red) + T(344, 52, "2", 14, WH) + t(299, 130, "PASSPORT TWICE", C.orange)) +
          H("d3t2", bx(6, 158, 190, 130, WH, C.red) + I.key(46, 210, 2.2) + arr(76, 210, 104, 210, C.slate) + R(118, 172, 50, 74, "#a8743f", 3) + I.lock(143, 208, 1.6, C.red) + t(101, 274, "ROOM NOT READY", C.red)) +
          H("d3t3", bx(204, 158, 190, 130, C.peach, C.red) + t(299, 230, "4/10", C.red, null, 48) + t(299, 274, "HER RATING", C.red)),
        sh: { d3t0: [9, 12], d3t1: [10, 12], d3t2: [11, 12], d3t3: [12, 12] } },
      // template: Apple HIG Motion — controlled focus pull (subdue context, sharpen one object) — https://developer.apple.com/design/human-interface-guidelines/motion
      { a: 13, d: bgc("#f3efe7") + floor() + R(220, 186, 176, 64, C.navy, 6) + fig(306, 186, 1.6, C.navy, { hair: "long" }) + t(308, 230, "RECEPTION", WH) +
          fig(90, 262, 2, C.orange, { mood: "frown", hair: "long" }) + ban("WHO IS RESPONSIBLE?", C.navy, 30) +
          H("e4a", arr(140, 150, 214, 150, C.red, 5) + pill(306, 82, "23 MIN HERE", { sz: 18, bg: C.red, st: C.red, fg: WH }) + R(214, 108, 186, 146, "none", 12, { stroke: C.red, "stroke-width": 4, "stroke-dasharray": "8 6" })),
        sh: { e4a: [14, 14] } },
      // template: Motion Array — Project TimeLine (markers advance along a time line) — https://motionarray.com/after-effects-templates/project-timeline-2424919/
      { a: 15, d: bgc("#eef3f8") + O(200, 70, 40, C.green) + t(200, 78, "90 S", WH, null, 24) + badge(236, 40, 12, true) + t(200, 134, "PER TRANSACTION", C.green) +
          H("f5s", R(20, 160, 360, 36, "#fbe3d4", 6, { stroke: C.orange, "stroke-width": 2, "stroke-dasharray": "6 4" }) +
            [30, 120, 230, 340].map(function (x) { return R(x, 160, 23, 36, C.navy, 3); }).join("") + t(200, 224, "WAITS BETWEEN", C.orange) + t(110, 154, "EACH ≤ 90 S", C.navy, null, 16)) +
          H("f5b", P("M20 236 V246 H380 V236", C.red, 4) + ban("23 MIN AT THE DESK", C.red, 274)),
        sh: { f5s: [16, 17], f5b: [17, 17] } },
      // template: LottieFiles — Animated Dashboards (screen panels switch state) — https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ
      { a: 18, d: bgc("#f4f2ee") +
          bx(6, 50, 190, 196, WH, C.green) + I.phone(40, 82, 1.6) + t(116, 88, "REVENUE", C.green) + t(18, 138, "TARGET 10 MIN", C.ink, "start") + t(18, 176, "CALL: 7 MIN", C.ink, "start") +
          H("g6r", badge(170, 214, 16, true) + t(90, 222, "MET", C.green)) +
          H("g6h", bx(204, 50, 190, 196, WH, C.slate) + I.bed(236, 82, 1.4, C.slate) + t(318, 88, "HOUSEKEEPING", C.slate, null, 14) + t(216, 138, "45 MIN: MET", C.ink, "start") +
            R(210, 160, 178, 80, C.peach, 8) + t(299, 192, "HER ROOM:", C.red) + t(299, 222, "NOT READY", C.red)) +
          H("g6q", ban("WAS IT REVENUE?", C.navy, 24)) + H("g6m", ban("TARGETS MET, ROOM NOT", C.red, 24)),
        sh: { g6r: [19, 20], g6h: [20, 20, 0.2], g6q: [18, 19], g6m: [20, 20] } },
      // template: Motion Array — Infographic Chart Creator (bars grow, values stamp in) — https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/
      { a: 21, d: bgc("#f4f2ee") + bx(6, 50, 230, 196, WH, C.green) +
          ["FRONT DESK", "REVENUE", "HOUSEKEEPING"].map(function (d, j) { return t(20, 100 + j * 56, d, C.ink, "start") + badge(212, 94 + j * 56, 13, true); }).join("") +
          bx(246, 50, 148, 196, C.peach, C.red) + fig(320, 196, 1.3, C.orange, { mood: "frown", hair: "long" }) + t(320, 232, "4/10", C.red, null, 26) +
          ban("EVERY TEST PASSED", C.green, 24) + H("h7q", ban("HOW CAN BOTH BE TRUE?", C.red, 278)),
        sh: { h7q: [22, 22] } },
      // template: Observable — Hierarchy traversal animated (visit one node, then its child) — https://old.observablehq.com/@d3/hierarchy-traversal-animated
      { a: 23, d: bgc("#f4f6f9") +
          rep(9, function (i) { var x = 22 + i * 40; return R(x, 70, 34, 170, i < 5 ? "#e3ebf4" : "#edf0f4", 6) + O(x + 17, 56, 10, C.navy) + (i < 5 ? Tr(x + 17, 100, D9[i]) : T(x + 17, 106, "?", 16, C.muted)); }) +
          H("i8v", rep(9, function (i) { var x = 39 + i * 40; return arr(x, 232, x, 124, C.navy, 2.5); })) +
          H("i8h", P("M10 176 H392", C.orange, 7) + F("M384 164 L398 176 L384 188 Z", C.orange)) +
          H("i8g", fig(0, 0, 0.9, C.orange, { hair: "long" })) +
          H("i8t", ban("NINE DEPARTMENTS", C.navy, 22)) +
          H("i8a", ban("MANAGED VERTICALLY", C.navy, 274)) + H("i8b", ban("SHE MOVES ACROSS", C.orange, 274)) + H("i8c", ban("ONE DIFFICULT ARRIVAL", C.red, 274)),
        sh: { i8v: [24, 26], i8h: [25, 26], i8g: [25, 26], i8t: [23, 26], i8a: [24, 24], i8b: [25, 25], i8c: [26, 26] },
        mv: { i8g: function (k) { return { x: k >= 25 ? 372 : 20, y: 168 }; } }, fl: {} },
      // template: Motion Array — Scrolling Timeline (pan along time and settle on the event) — https://motionarray.com/after-effects-templates/scrolling-timeline-1223172/
      { a: 27, d: bgc("#f6f4ee") + t(200, 96, "WHERE DID 23 MINUTES GO?", C.navy) + strip("j9s", 120, 40) +
          H("j9l", SEG.map(function (s, i) { return t(20 + (i % 3) * 128, 196 + Math.floor(i / 3) * 30, s[1] + " " + s[0], s[2], "start"); }).join("")) +
          H("j9h", R(segX(3) - 2, 114, (9 * PX) + 4, 52, "none", 6, { stroke: C.red, "stroke-width": 4 }) + ban("WORK BETWEEN TEAMS", C.red, 274)) +
          H("j9a", ban("STRONG PARTS, WEAK WHOLE", C.navy, 30)),
        sh: { j9s0: [28, 29, 0], j9s1: [28, 29, 0.2], j9s2: [28, 29, 0.4], j9s3: [28, 29, 0.6], j9s4: [28, 29, 0.8], j9s5: [28, 29, 1], j9l: [28, 29, 1.2], j9h: [29, 29], j9a: [27, 27] } }
    ], ["Back at Qasr Marina", "7:40 pm, delayed flight", "Just her room", "Corporate rate booked", "Rate not on screen",
      "Scattered information", "Booking and rate", "Room status, billing", "Search, check, call, wait", "23 minutes at the desk",
      "Passport twice", "Room not ready", "Rated four out of ten", "Who is responsible?", "Blame reception?",
      "90 s per transaction", "Several transactions", "90 s target, 23 minutes", "Was it revenue?", "Revenue met its target",
      "Housekeeping met its target", "Every test passed", "Both true?", "Departments vs customers", "Managed vertically",
      "Customers move across", "One difficult arrival", "Good parts, failed whole", "Where the time went", "Between teams"],
      "Qasr Marina check-in: a corporate rate missing from the desk screen, information in four systems, 23 desk minutes, a passport shown twice, a room not ready, and departments that all met their own targets.", "#13263b");
  })();

  // ============================================================
  // O2b · Handoffs and the end-to-end measure · 29 moments · 10 compositions
  // ============================================================
  (function () {
    var b13 = segX(3);
    build3("O2b", 29, [
      // template: Apple HIG Motion — controlled focus pull (subdue context, sharpen one object) — https://developer.apple.com/design/human-interface-guidelines/motion
      { a: 0, d: bgc("#f3ecdf") + floor() + R(230, 196, 170, 54, C.navy, 4) + fig(316, 196, 1.5, C.navy, { hair: "long" }) + fig(150, 262, 1.7, C.orange, { hair: "long" }) +
          clock(110, 100, 40, C.red) + t(110, 172, "23 MIN", C.red, null, 26) +
          H("k0a", ban("WHERE DID THE TIME GO?", C.navy, 26)) + H("k0b", fig(56, 262, 1.4, C.slate) + ban("WATCH EACH STEP", C.green, 26)),
        sh: { k0a: [0, 0], k0b: [1, 1] } },
      // template: Motion Array — Project TimeLine (markers advance along a time line) — https://motionarray.com/after-effects-templates/project-timeline-2424919/
      { a: 2, d: bgc("#f6f4ee") + t(200, 40, "THE 23 DESK MINUTES", C.navy) + strip("l1s", 150, 40) +
          H("l1a", t(segX(0) + 3 * PX, 138, "QUEUE 6", C.slate)) + H("l1b", t(segX(1) + 2 * PX, 216, "FIND 4", C.navy2) + t(segX(2) + 1.5 * PX + 10, 138, "RE-KEY 3", C.plum)) +
          H("l1c", P("M20 232 V242 H" + b13.toFixed(1) + " V232", C.red, 4) + pill(130, 270, "13 MIN, NO ROOM YET", { sz: 18, bg: C.red, st: C.red, fg: WH })),
        sh: { l1s0: [2, 4], l1a: [2, 4], l1s1: [3, 4], l1s2: [3, 4, 0.4], l1b: [3, 4], l1c: [4, 4] } },
      // template: LottieFiles — Multi-Step Icon Animation (activate one step after another) — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
      { a: 5, d: bgc("#eef3f8") +
          [["7 MIN", "CALL", "REVENUE", C.orange, I.phone(0, 0, 2)], ["2 MIN", "CHECK", "ROOM", C.amber, I.bed(0, 0, 2, C.amber)], ["1 MIN", "KEY AND", "DIRECTIONS", C.green, I.key(0, 0, 2.2)]].map(function (v, j) {
            var x = 6 + j * 132;
            return H("m2v" + j, bx(x, 40, 124, 196, WH, v[3]) + Tr(x + 62, 84, v[4]) + t(x + 62, 146, v[0], v[3], null, 28) + t(x + 62, 190, v[1], C.ink) + t(x + 62, 216, v[2], C.ink, null, 16));
          }).join("") + H("m2s", ban("6+4+3+7+2+1 = 23", C.navy, 272)),
        sh: { m2v0: [5, 7], m2v1: [6, 7], m2v2: [7, 7], m2s: [7, 7] } },
      // template: The Pudding — unit chart where each icon is a counted unit — https://www.maglr.com/blog/best-scrollytelling-examples
      { a: 8, d: bgc("#f4f2ee") + rep(23, function (i) { return R(20 + i * 15.65, 130, 13.5, 40, i === 22 ? C.green : "#b9c3cf", 3); }) +
          pill(358, 100, "1 MIN", { sz: 18, bg: C.green, st: C.green, fg: WH }) + t(200, 210, "VALUE-ADDING, PER EXHIBIT", C.green, null, 16) +
          H("n3a", ban("ONLY THE KEY MINUTE", C.green, 30)) +
          H("n3b", P("M20 186 V194 H362 V186", C.slate, 4) + t(190, 236, "22 OTHER MINUTES", C.slate) + ban("WHY 23 FOR 1?", C.red, 30)),
        sh: { n3a: [8, 8], n3b: [9, 9] } },
      // template: Apple HIG Motion — physical handoff (same object stays recognisable in transfer) — https://developer.apple.com/design/human-interface-guidelines/motion
      { a: 10, d: bgc("#eef3f8") + R(-400, 150, 600, 50, "#f6ead6") + R(200, 150, 600, 50, "#e1efe6") + P("M200 60 V200", C.orange, 3, { "stroke-dasharray": "8 6" }) +
          fig(80, 160, 1.5, C.navy, { hair: "long" }) + fig(320, 160, 1.5, C.green) + t(80, 186, "FRONT DESK", C.navy, null, 16) + t(320, 186, "REVENUE", C.green, null, 16) +
          K("o4f", Tr(130, 100, R(-18, -14, 36, 28, C.sun, 4, { stroke: C.amber, "stroke-width": 2.5 }))) + ban("HANDOFF", C.orange, 30) +
          H("o4r", [["WAIT", C.red, clock(0, 0, 14, C.red)], ["MISSING INFO", C.red, I.doc(0, 0, 1.4, C.red)], ["WHO NEXT?", C.red, I.users(0, 0, 1.4, C.red)]].map(function (r, j) {
            var x = [56, 200, 336][j]; return Tr(x, 228, r[2]) + t(x, 270, r[0], r[1]);
          }).join("")),
        sh: { o4r: [11, 11, 0.3] }, mv: { o4f: function (k) { return { x: 140 }; } } },
      // template: Behance — Process: What is a Motion Designer? (illustrated narrative vignettes) — https://www.behance.net/gallery/159045079/Process-What-is-a-Motion-Designer-
      { a: 12, d: bgc("#f6f1ea") +
          H("p5a", bx(6, 40, 124, 200, WH, C.red) + t(68, 66, "TIME LEAKS", C.red, null, 16) + R(42, 96, 52, 40, C.sun, 4, { stroke: C.amber, "stroke-width": 2 }) + clock(68, 176, 22, C.red) + O(54, 214, 4, C.navy2) + O(80, 224, 4, C.navy2)) +
          H("p5b", bx(138, 40, 124, 200, WH, C.red) + t(200, 66, "INFO LOST", C.red) + R(170, 90, 60, 76, WH, 4, { stroke: C.slate, "stroke-width": 2 }) + P("M180 108 H220 M180 124 H204 M180 140 H214", C.slate, 3) + cross(214, 124, 1.1, C.red, 4) + t(200, 204, "ASK AGAIN", C.ink, null, 16)) +
          H("p5c", bx(270, 40, 124, 200, WH, C.red) + t(332, 66, "WHO OWNS?", C.red, null, 16) + fig(300, 170, 0.9, C.navy) + fig(364, 170, 0.9, C.green) + arr(312, 120, 350, 120, C.red, 2.5) + arr(352, 140, 314, 140, C.red, 2.5) + t(332, 210, "NOT MINE", C.ink, null, 16)) +
          H("p5h", ban("WAITING FOR REVENUE", C.orange, 272)) + H("p5i", ban("DETAILS ENTERED AGAIN", C.navy, 272)) + H("p5j", ban("EVERYONE ASSUMES", C.red, 272)),
        sh: { p5a: [12, 15], p5b: [14, 15], p5c: [15, 15], p5h: [12, 13], p5i: [14, 14], p5j: [15, 15] } },
      // template: Kurzgesagt — living process token (one protagonist walks into the system) — https://kurzgesagt.org/what-we-do
      { a: 16, d: bgc("#eef1f6") + floor("#d9dfe7") + ban("RENEWING AN ID CARD", C.navy, 26) +
          [0, 1, 2].map(function (j) { var x = 70 + j * 130; return R(x - 54, 150, 108, 100, C.slate, 6) + t(x, 180, "COUNTER " + (j + 1), WH, null, 14) + fig(x - 30, 262, 0.8, C.muted) + fig(x - 6, 262, 0.8, C.muted) +
            R(x - 50, 74, 100, 40, WH, 16, { stroke: C.orange, "stroke-width": 2 }) + t(x, 100, "DETAILS?", C.orange, null, 14); }).join("") +
          K("q6g", fig(0, 0, 1, C.orange, { hair: "long" })),
        mv: { q6g: function () { return { x: 352, y: 268 }; } } },
      // template: Dribbble — Motion Graphics tag (elastic queue: requests accumulate under pressure) — https://dribbble.com/tags/motion-graphics
      { a: 17, d: bgc("#f4efe6") + bx(6, 100, 110, 80, C.mint, C.green) + t(61, 146, "SALES", C.green) +
          F("M170 80 L300 80 L256 150 L256 196 L214 196 L214 150 Z", "#dbe3ec", { stroke: C.slate, "stroke-width": 2.5 }) + t(235, 96, "HOUSE-", C.slate, null, 16) + t(235, 124, "KEEPING", C.slate, null, 16) +
          arr(235, 200, 235, 240, C.slate) + t(320, 236, "SAME PACE", C.slate, null, 16) +
          H("r7a", arr(118, 128, 166, 112, C.green, 4) + arr(118, 148, 166, 140, C.green, 4)) +
          H("r7b", arr(118, 112, 166, 96, C.green, 4) + arr(118, 164, 166, 156, C.green, 4)) +
          H("r7q", rep(4, function (i) { return H("r7r" + i, R(318, 150 - i * 30, 70, 26, C.peach, 4, { stroke: C.red, "stroke-width": 2 }) + I.bed(340, 163 - i * 30, 0.9, C.red) + T(370, 169 - i * 30, "!", 16, C.red)); }) + t(344, 186, "ROOMS WAIT", C.red, null, 14)) +
          H("r7h", ban("ANOTHER DANGER", C.navy, 26)) + H("r7i", ban("LOCAL OPTIMISATION", C.orange, 26)) + H("r7j", ban("SALES FASTER, ROOMS NOT", C.orange, 26)) + H("r7k", ban("WHOLE FLOW WORSE", C.red, 276)),
        sh: { r7a: [18, 21], r7b: [19, 21], r7q: [20, 21], r7r0: [20, 21, 0.2], r7r1: [20, 21, 0.6], r7r2: [20, 21, 1], r7r3: [21, 21], r7h: [17, 17], r7i: [18, 18], r7j: [19, 21], r7k: [21, 21] } },
      // template: Motion Array — Scrolling Timeline (pan along time and settle on the event) — https://motionarray.com/after-effects-templates/scrolling-timeline-1223172/
      { a: 22, d: bgc("#f4f6f9") + O(30, 130, 22, WH, { stroke: C.navy, "stroke-width": 3 }) + I.bell(30, 132, 1.3) + t(46, 176, "ARRIVAL", C.navy, null, 16) +
          O(370, 130, 22, C.mint, { stroke: C.green, "stroke-width": 3 }) + I.bed(370, 132, 1.3, C.green) + t(354, 176, "IN ROOM", C.green, null, 16) +
          D("s8l", "M54 130 H346", C.navy, 6) + ban("END-TO-END MEASURE", C.navy, 26) +
          H("s8d", R(54, 196, 180, 34, C.red, 6) + t(144, 220, "23 MIN DESK", WH)) +
          H("s8u", P("M236 213 H346", C.orange, 5, { "stroke-dasharray": "8 6" }) + t(286, 254, "MORE, UNMEASURED", C.orange, null, 16) + I.lock(300, 100, 1.5, C.red)) +
          H("s8t", ban("TRIGGER TO OUTCOME", C.green, 276)),
        sh: { s8d: [24, 25], s8u: [25, 25], s8t: [22, 23] }, dr: { s8l: [22, 25] } },
      // template: Awwwards — UI Animation & Microinteractions (morphing decision gate: pass or bounce) — https://www.awwwards.com/awwwards/collections/animation/
      { a: 26, d: bgc("#f3efe7") +
          H("t9a", P("M30 150 H370", C.navy, 6) + R(160, 70, 80, 70, WH, 10, { stroke: C.muted, "stroke-width": 3, "stroke-dasharray": "6 5" }) + t(200, 116, "?", C.muted, null, 36) + ban("WHO OWNS THE MEASURE?", C.navy, 26) + t(200, 190, "OFTEN NOBODY", C.red)) +
          H("t9b", ["FRONT DESK", "REVENUE", "HOUSEKEEPING"].map(function (d, j) { return bx(6, 40 + j * 70, 200, 60, C.mint, C.green) + t(16, 78 + j * 70, d, C.green, "start", 16) + badge(186, 70 + j * 70, 12, true); }).join("") +
            bx(220, 40, 174, 200, C.peach, C.red) + R(270, 70, 70, 110, "#a8743f", 4) + I.lock(305, 125, 1.8, C.red) + t(307, 208, "CAN'T ENTER", C.red, null, 16) + ban("SPEED IS NOT OUTCOME", C.red, 272)) +
          H("t9c", ban("NEXT: MANAGE THE JOURNEY", C.green, 150)),
        sh: { t9a: [26, 26], t9b: [27, 27], t9c: [28, 28] } }
    ], ["Where the time went", "Watch each step", "Six minutes queueing", "Find 4, re-key 3", "13 minutes, no room",
      "Seven-minute call", "Two-minute room check", "One-minute key", "One value-adding minute", "1 minute in 23",
      "The handoff", "Wait, gaps, who next", "Waiting on revenue", "Time leaks away", "Information lost",
      "Responsibility unclear", "ID card counters", "Another danger", "Local optimisation", "Sales books faster",
      "Rooms pile up", "Whole flow worse", "End-to-end measure", "Arrival to ready room", "Desk is only part",
      "Beyond the desk", "Nobody owns it", "Speed is not outcome", "Next: managing journeys"],
      "Where the 23 desk minutes went (6, 4, 3, 7, 2 and 1), what a handoff risks, how local optimisation piles up unready rooms, and an end-to-end measure from arrival to a ready room.", "#f3ecdf");
  })();

  // ============================================================
  // O3a · Four things they do differently · 30 moments · 10 compositions
  // ============================================================
  (function () {
    var DEPS = [["RECEPTION", C.navy], ["REVENUE", C.green], ["HOUSEKEEPING", C.slate]], SH4 = ["RECEPTION", "REVENUE", "H'KEEPING", "FINANCE"];
    build3("O3a", 30, [
      // template: Behance — Motion Design Process (production stages shown as team vignettes) — https://www.behance.net/gallery/53752435/Motion-Design-Process
      { a: 0, d: bgc("#eef2f6") + E(200, 236, 170, 30, "#c9a46f") + [70, 150, 250, 330].map(function (x, j) { return fig(x, 226, 1.1, [C.navy, C.green, C.slate, C.plum][j], { hair: j % 2 ? "long" : "" }); }).join("") +
          bx(70, 40, 260, 120, WH, C.navy) + t(200, 66, "HER CHECK-IN", C.navy) +
          H("u0a", t(90, 102, "23 MIN", C.red, "start") + t(220, 102, "NOT READY", C.red, "start", 16) + t(90, 138, "4/10", C.red, "start", 24)) +
          H("u0b", R(200, 118, 120, 30, C.green, 8) + t(260, 140, "TARGETS MET", WH, null, 14)),
        sh: { u0a: [1, 2], u0b: [2, 2] } },
      // template: LottieFiles — teamwork (people appear, then act as a team) — https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6
      { a: 3, d: bgc("#f3efe7") + ban("WHO OWNS THE WHOLE CHECK-IN?", C.navy, 26) +
          DEPS.map(function (d, j) { var x = 70 + j * 130; return fig(x, 210, 1.3, d[1]) + t(x, 240, d[0], d[1], null, 14) + H("v1t" + j, badge(x + 26, 110, 14, true) + t(x, 270, "MY PART", C.green, null, 16)); }).join("") +
          H("v1n", R(130, 60, 140, 50, WH, 20, { stroke: C.red, "stroke-width": 3 }) + t(200, 94, "NO ANSWER", C.red)),
        sh: { v1t0: [4, 5], v1t1: [4, 5, 0.3], v1t2: [4, 5, 0.6], v1n: [5, 5] } },
      // template: 3Blue1Brown (Manim demo) — traced causal path drawn when it becomes relevant — https://www.3blue1brown.com/lessons/manim-demo/
      { a: 6, d: bgc("#f4f6f9") + DEPS.concat([["FINANCE", C.amber]]).map(function (d, j) { var x = 8 + j * 98; return bx(x, 60, 90, 180, "#eef2f7", d[1]) + t(x + 45, 86, SH4[j], d[1], null, 14); }).join("") +
          H("w2p", D("w2l", "M20 170 H380", C.orange, 7) + I.bell(20, 140, 1.4) + I.bed(374, 140, 1.4, C.green) + t(8, 268, "ARRIVAL", C.orange, "start", 16) + t(392, 268, "IN ROOM", C.green, "end", 16)) +
          H("w2a", ban("WHAT WOULD CHANGE?", C.navy, 26)) + H("w2b", ban("MANAGE THE WHOLE FLOW", C.orange, 26)),
        sh: { w2p: [7, 7], w2a: [6, 6], w2b: [7, 7] }, dr: { w2l: [7, 7, 0.2] } },
      // template: Dribbble — Data Workflow Animation (nodes and links activate in sequence) — https://dribbble.com/shots/27247003-Data-Workflow-Animation
      { a: 8, d: bgc("#eef3f8") + fig(200, 170, 1.6, C.plum, { hair: "long", badge: C.sun }) +
          H("x3b", pill(200, 40, "PROCESS OWNER", { sz: 20, bg: C.plum, st: C.plum, fg: WH }) + t(200, 202, "ACCOUNTABLE, CAN IMPROVE", C.plum, null, 16)) +
          H("x3l", DEPS.map(function (d, j) { var x = 66 + j * 134; return P("M200 212 L" + x + " 238", d[1], 3, { "class": "a-flow" }) + bx(x - 62, 238, 124, 44, WH, d[1]) + t(x, 265, d[0], d[1], null, 14); }).join("")) +
          H("x3a", ban("ONE PERSON, WHOLE CHECK-IN", C.orange, 40)),
        sh: { x3a: [8, 8], x3b: [9, 10], x3l: [10, 10] } },
      // template: Motion Array — Infographic Chart Creator (bars grow, values stamp in) — https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/
      { a: 11, d: bgc("#f4f2ee") +
          bx(6, 50, 188, 90, C.mint, C.green) + t(100, 84, "90 S", C.green, null, 26) + t(100, 118, "PER TRANSACTION", C.green, null, 14) +
          bx(206, 50, 188, 90, C.mint, C.green) + t(300, 84, "45 MIN", C.green, null, 26) + t(300, 118, "ROOM RELEASE", C.green, null, 15) +
          H("y4e", clock(60, 210, 34, C.navy) + t(110, 196, "ARRIVAL TO ROOM", C.navy, "start", 16) + t(110, 226, "END-TO-END TIME", C.orange, "start", 16)) +
          H("y4r", [150, 230, 310].map(function (x) { return O(x, 262, 10, C.red); }).join("") + t(200, 292, "HIDDEN DELAYS SHOW", C.red, null, 16)) +
          H("y4a", ban("HOW SUCCESS IS JUDGED", C.navy, 22)),
        sh: { y4e: [13, 14], y4r: [14, 14], y4a: [11, 12] } },
      // template: Bartosz Ciechanowski — Gears (one mechanism only works when teeth engage) — https://ciechanow.ski/archives/
      { a: 15, d: bgc("#f3efe7") + bx(10, 60, 130, 70, WH, C.navy) + t(75, 102, "BOOKING", C.navy) + bx(260, 60, 130, 70, WH, C.green) + t(325, 102, "RATE", C.green) +
          H("z5x", P("M140 95 H182 M218 95 H260", C.red, 4, { "stroke-dasharray": "6 5" }) + cross(200, 95, 1.2, C.red, 4)) +
          H("z5k", bx(20, 170, 150, 80, WH, C.slate) + I.lock(60, 210, 1.8, C.slate) + t(120, 216, "BUDGET", C.slate, null, 15) + bx(230, 170, 150, 80, WH, C.slate) + I.lock(270, 210, 1.8, C.slate) + t(330, 216, "BUDGET", C.slate, null, 15)) +
          H("z5f", P("M140 95 H260", C.green, 6) + badge(200, 95, 14, true) + bx(130, 180, 140, 64, C.mint, C.green) + I.money(166, 212, 1.4, C.amber) + t(222, 218, "SHARED", C.green, null, 16)) +
          H("z5a", ban("SYSTEMS NOT CONNECTED", C.red, 26)) + H("z5b", ban("FUND THE WHOLE PROCESS", C.green, 26)),
        sh: { z5x: [15, 16], z5k: [16, 16], z5f: [17, 17], z5a: [15, 16], z5b: [17, 17] } },
      // template: LottieFiles — Animated Dashboards (screen panels switch state) — https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ
      { a: 18, d: bgc("#eef3f8") + fig(70, 260, 1.8, C.navy, { hair: "long" }) + R(140, 44, 250, 190, C.ink, 12) + R(148, 52, 234, 174, C.sky, 8) + t(265, 80, "SHARED CASE", C.navy) +
          H("aa1", t(162, 124, "RATE", C.ink, "start") + badge(360, 118, 12, true) + t(340, 124, "REV.", C.green, "end", 15)) +
          H("aa2", t(162, 170, "ROOM READY", C.ink, "start") + badge(360, 164, 12, true)) +
          H("aa3", P("M110 160 C140 250 300 270 380 250", C.orange, 4, { "class": "a-flow" }) + t(265, 210, "SEES THE JOURNEY", C.orange, null, 15)) +
          H("aa4", ban("PROBLEMS SURFACE", C.green, 26)),
        sh: { aa1: [19, 21], aa2: [19, 21, 0.4], aa3: [20, 21], aa4: [21, 21] } },
      // template: Dribbble — Workflow AI Animation (data advances through stages) — https://dribbble.com/shots/26275497-Workflow-AI-Animation
      { a: 22, d: bgc("#f6f4ee") + ban("ONLINE SHOP RETURNS", C.plum, 26) +
          [["CLICK", I.cursor(0, 0, 1.6)], ["COLLECT", I.users(0, 0, 1.4)], ["CHECK", I.mag(0, 0, 1.4)], ["REFUND", I.money(0, 0, 1.4, C.amber)]].map(function (s, j) { var x = 50 + j * 100; return bx(x - 44, 60, 88, 90, WH, C.plum) + Tr(x, 92, s[1]) + t(x, 136, s[0], C.plum, null, 15) + (j < 3 ? arr(x + 46, 105, x + 54, 105, C.plum) : ""); }).join("") +
          H("ab2", bx(6, 180, 188, 80, "#eef0f2", C.muted) + t(100, 214, "PARCELS SCANNED", C.slate, null, 14) + t(100, 244, "LOCAL OUTPUT", C.muted, null, 14) + cross(180, 194, 1, C.red, 3) +
            bx(206, 180, 188, 80, C.mint, C.green) + t(300, 214, "WAIT FOR REFUND", C.green, null, 14) + t(300, 244, "CUSTOMER SEES", C.green, null, 14) + badge(380, 194, 11, true)),
        sh: { ab2: [24, 24] } },
      // template: LottieFiles — World map with logistics (pins and routes on a map) — https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy
      { a: 25, d: bgc("#f4f6f9") + bx(150, 30, 100, 40, C.navy, C.navy) + t(200, 57, "GM", WH) +
          DEPS.concat([["FINANCE", C.amber]]).map(function (d, j) { var x = 53 + j * 98; return P("M200 70 V90 H" + x + " V120", C.slate, 2) + bx(x - 46, 120, 92, 120, WH, d[1]) + t(x, 146, SH4[j], d[1], null, 14); }).join("") +
          H("ac1", P("M10 196 H390", C.orange, 8, { opacity: 0.9 }) + F("M380 184 L398 196 L380 208 Z", C.orange) + t(200, 272, "PROCESS LAID OVER", C.orange)) +
          H("ac0", ban("DEPARTMENTS STAY", C.navy, 282)),
        sh: { ac0: [25, 26], ac1: [27, 27] } },
      // template: LottieFiles — Multi-Step Icon Animation (activate one step after another) — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
      { a: 28, d: bgc("#14263a") +
          [["OWNER", C.sun], ["END-TO-END", C.sun], ["SHARED FUNDS", C.sun], ["WHOLE VIEW", C.sun]].map(function (l, j) { var x = 8 + (j % 2) * 196, y = 50 + Math.floor(j / 2) * 100; return H("ad" + j, R(x, y, 188, 86, "#1f3a57", 12, { stroke: "#3c5f84", "stroke-width": 2 }) + O(x + 26, y + 43, 15, C.sun) + T(x + 26, y + 49, String(j + 1), 16, C.ink) + t(x + 112, y + 50, l[0], WH, null, 16)); }).join("") +
          H("adw", ban("A DANGEROUS MISTAKE?", C.red, 274)),
        sh: { ad0: [28, 29, 0], ad1: [28, 29, 0.3], ad2: [28, 29, 0.6], ad3: [28, 29, 0.9], adw: [29, 29] } }
    ], ["The review", "Her evening", "All targets met", "Who owns it all?", "Each did their part",
      "No answer", "Process-centred", "Manage the whole flow", "Appoint an owner", "The process owner",
      "Across three teams", "Judging success", "90 s and 45 min", "Arrival to room", "Hidden delays show",
      "Systems disconnected", "Budgets locked", "Fund the whole process", "Everyday decisions", "One shared view",
      "Beyond the desk", "Problems surface", "Online returns", "Click to refund", "Refund wait counts",
      "Keep departments", "Specialists intact", "Road map over towns", "Four changes", "A dangerous mistake?"],
      "How a process-centred Qasr differs: a process owner across reception, revenue and housekeeping, an end-to-end time beside the 90-second and 45-minute targets, shared improvement funding, and staff who see the whole journey.", "#eef2f6");
  })();

  // ============================================================
  // O3b · Two lenses, and a trap · 33 moments · 10 compositions
  // ============================================================
  (function () {
    var CTRL = [["RATE SYSTEM", 70], ["HK SCHEDULES", 150], ["DEPT TARGETS", 230]];
    build3("O3b", 33, [
      // template: Awwwards — masked reveal (a moving lens shows what matters) — https://www.awwwards.com/websites/animation/
      { a: 0, d: bgc("#f4f2ee") +
          H("ba0", bx(140, 40, 120, 80, WH, C.red) + t(200, 74, "ONE", C.red) + t(200, 98, "COMPLAINT", C.red, null, 15) +
            O(90, 200, 54, "none", { stroke: C.navy, "stroke-width": 6 }) + t(90, 206, "BY DEPT", C.navy, null, 15) + O(310, 200, 54, "none", { stroke: C.orange, "stroke-width": 6 }) + t(310, 206, "BY FLOW", C.orange, null, 15) + ban("TWO LENSES", C.navy, 284)) +
          H("ba1", ["RECEPTION", "REVENUE", "HOUSEKEEPING"].map(function (d, j) { var x = 70 + j * 130; return bx(x - 62, 70, 124, 150, "#eef2f7", C.navy) + t(x, 98, d, C.navy, null, 14) + fig(x, 186, 1, C.navy) + H("bat" + j, badge(x, 244, 16, true)); }).join("") + ban("FUNCTIONAL VIEW", C.navy, 30)) +
          H("ba2", ban("WHAT ABOUT HER?", C.red, 284)),
        sh: { ba0: [0, 1], ba1: [2, 4], bat0: [3, 4], bat1: [3, 4, 0.3], bat2: [3, 4, 0.6], ba2: [4, 4] } },
      // template: Dribbble — Workflow Animation (a trigger token travels to an outcome) — https://dribbble.com/shots/3791748-Workflow-Animation
      { a: 5, d: bgc("#fbf3ea") + ban("PROCESS VIEW", C.orange, 26) +
          [["DESK", I.bell(0, 0, 1.3)], ["RATE", I.money(0, 0, 1.3, C.green)], ["ROOM", I.bed(0, 0, 1.4, C.slate)], ["SETTLED", I.star(0, 0, 1.4, C.sun)]].map(function (s, j) { var x = 50 + j * 100; return O(x, 120, 28, WH, { stroke: C.orange, "stroke-width": 3 }) + Tr(x, 120, s[1]) + t(x, 174, s[0], C.orange, null, 16); }).join("") +
          D("bb1", "M78 120 H122 M178 120 H222 M278 120 H322", C.orange, 5) +
          H("bb2", ["TIME", "QUALITY", "COST"].map(function (m, j) { var x = 70 + j * 130; return bx(x - 56, 206, 112, 50, WH, C.navy) + t(x, 238, m, C.navy, null, 16); }).join("")),
        sh: { bb2: [7, 7] }, dr: { bb1: [6, 7] } },
      // template: Motion Array — Project TimeLine (markers advance along a time line) — https://motionarray.com/after-effects-templates/project-timeline-2424919/
      { a: 8, d: bgc("#f6f4ee") +
          H("bc0", ban("CYCLE TIME", C.navy, 26) + [[20, 60, 1], [80, 50, 0], [130, 50, 1], [180, 70, 0], [250, 40, 1], [290, 50, 0], [340, 40, 1]].map(function (s) { return R(s[0], 100, s[1], 44, s[2] ? C.navy : "#fbe3d4", 4, s[2] ? null : { stroke: C.orange, "stroke-width": 2, "stroke-dasharray": "5 4" }); }).join("") +
            t(60, 176, "WORK", C.navy, null, 16) + t(205, 176, "WAIT", C.orange, null, 16) + P("M20 196 V206 H380 V196", C.navy, 4) + t(200, 236, "TOTAL ELAPSED TIME", C.navy)) +
          H("bc1", ban("COST TO SERVE", C.amber, 26) + [60, 140, 220, 300].map(function (x, j) { return rep(j + 1, function (i) { return E(x, 220 - i * 12, 22, 7, C.gold, { stroke: C.amber, "stroke-width": 2 }); }); }).join("") +
            P("M40 250 H340", C.navy, 3) + arr(340, 250, 380, 250) + t(200, 286, "RESOURCES ADD UP", C.amber, null, 16)),
        sh: { bc0: [8, 8], bc1: [9, 9] } },
      // template: The Pudding — responsive scrollytelling (pinned before-and-after comparison) — https://pudding.cool/process/responsive-scrollytelling/
      { a: 10, d: bgc("#f4f6f9") + bx(6, 40, 190, 210, WH, C.navy) + t(101, 66, "MANAGER", C.navy) + bx(204, 40, 190, 210, WH, C.orange) + t(299, 66, "OWNER", C.orange) +
          H("bd0", bx(46, 100, 110, 70, "#eef2f7", C.navy) + arr(101, 160, 101, 116, C.green, 4) + t(101, 200, "OWN BOX", C.navy, null, 16) +
            P("M220 136 H380", C.orange, 5) + arr(360, 136, 382, 136, C.orange, 5) + t(299, 200, "WHOLE FLOW", C.orange, null, 16)) +
          H("bd1", R(30, 96, 142, 90, C.ink, 8) + [0, 1, 2].map(function (j) { return R(44 + j * 42, 156 - j * 18, 28, 22 + j * 18, C.green, 3); }).join("") + t(101, 214, "SEES KPIS", C.navy, null, 16) +
            R(270, 94, 60, 96, "#a8743f", 4) + I.lock(300, 140, 1.4, C.red) + fig(244, 196, 0.9, C.orange, { mood: "frown", hair: "long" }) + t(299, 226, "SEES HER", C.orange, null, 16)) +
          H("bd2", ban("WHO SEES THE CUSTOMER?", C.navy, 282)),
        sh: { bd0: [10, 10], bd1: [11, 12], bd2: [11, 12] } },
      // template: Motion Array — Infographic Chart Creator (bars grow, values stamp in) — https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/
      { a: 13, d: bgc("#f4f2ee") + [0, 1, 2].map(function (j) { var x = 50 + j * 70; return F("M" + (x - 18) + " 120 H" + (x + 18) + " L" + (x + 12) + " 150 H" + (x - 12) + " Z", C.sun) + R(x - 4, 150, 8, 20, C.sun) + R(x - 16, 170, 32, 8, C.amber, 2); }).join("") +
          t(120, 214, "LOCAL WINS", C.green) + fig(320, 196, 1.5, C.orange, { mood: "frown", hair: "long" }) + t(320, 230, "4/10", C.red, null, 24) +
          H("be1", ban("LOCAL WINS, GLOBAL LOSS", C.red, 274)) + ban("GREAT REPORTS, BAD NIGHT", C.navy, 30),
        sh: { be1: [14, 14] } },
      // template: Kurzgesagt — consequence ripple (an event propagates to what it causes) — https://www.youtube.com/kurzgesagt/videos
      { a: 15, d: bgc("#1d2f45") + F("M200 0 L120 260 L280 260 Z", "#f6edd6", { opacity: 0.18 }) + fig(200, 250, 1.8, C.plum, { hair: "long", badge: C.sun }) +
          H("bf0", ban("THE PROCESS VIEW'S TRAP", C.red, 30)) + H("bf1", pill(200, 60, "NEW CHECK-IN OWNER", { sz: 20, bg: C.sun, st: C.sun, fg: C.ink })) +
          H("bf2", [60, 110, 290, 340].map(function (x) { return fig(x, 270, 0.9, C.slate) + T(x, 196, "★", 18, C.sun); }).join("") + t(200, 290, "PROBLEM SOLVED?", C.sun, null, 16)),
        sh: { bf0: [15, 15], bf1: [16, 17], bf2: [17, 17] } },
      // template: Bartosz Ciechanowski — Gears (one mechanism only works when teeth engage) — https://ciechanow.ski/archives/
      { a: 18, d: bgc("#f3efe7") + fig(70, 240, 1.7, C.plum, { hair: "long", badge: C.sun }) + t(70, 274, "OWNER", C.plum) +
          CTRL.map(function (c, j) { return P("M100 150 L230 " + c[1], C.slate, 3) + H("bg" + j, cross(170, (150 + c[1]) / 2, 1.2, C.red, 4)) + bx(236, c[1] - 26, 158, 52, WH, C.slate) + t(315, c[1] + 6, c[0], C.slate, null, 15); }).join("") +
          H("bgn", pill(315, 280, "MANAGERS SAY NO", { sz: 18, bg: C.red, st: C.red, fg: WH })) +
          H("bgo", ban("OWNERSHIP, NO AUTHORITY", C.red, 22)),
        sh: { bg0: [18, 21], bg1: [19, 21], bg2: [19, 21, 0.3], bgn: [20, 20], bgo: [21, 21] } },
      // template: Awwwards — UI Animation & Microinteractions (morphing decision gate: pass or bounce) — https://www.awwwards.com/awwwards/collections/animation/
      { a: 22, d: bgc("#f6efe8") +
          H("bh0", t(200, 150, "WORSE THAN NO OWNER?", C.red, null, 22) + ban("THE SURPRISE", C.navy, 30)) +
          H("bh1", fig(80, 240, 1.5, C.plum, { hair: "long" }) + I.lock(80, 120, 2, C.red) + [230, 300, 370].map(function (x) { return fig(x, 240, 1.2, C.slate); }).join("") +
            R(212, 70, 176, 50, WH, 14, { stroke: C.slate, "stroke-width": 2 }) + t(300, 102, "OWNER HAS IT", C.slate, null, 16) + ban("NOBODY ELSE ASKS", C.red, 282)) +
          H("bh2", bx(6, 60, 186, 170, C.lilac, C.plum) + t(99, 100, "LOOKS", C.plum) + t(99, 126, "ACCOUNTABLE", C.plum, null, 16) + I.star(99, 180, 2.2, C.sun) +
            bx(208, 60, 186, 170, C.peach, C.red) + t(301, 100, "CANNOT", C.red) + t(301, 126, "IMPROVE", C.red) + I.lock(301, 180, 2, C.red) + ban("APPEARANCE ONLY", C.red, 282)),
        sh: { bh0: [22, 23], bh1: [24, 25], bh2: [26, 26] } },
      // template: LottieFiles — Process Success (activity transforms into a check only at the real end) — https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP
      { a: 27, d: bgc("#eef6f1") + fig(70, 240, 1.7, C.plum, { hair: "long", badge: C.sun }) + t(70, 128, "OWNER", C.plum) +
          [["FLOW OF WORK", 70], ["MEASURES", 150], ["BUDGET", 230]].map(function (c, j) { return P("M100 150 L230 " + c[1], C.green, 4) + bx(236, c[1] - 26, 158, 52, C.mint, C.green) + t(315, c[1] + 6, c[0], C.green, null, 15); }).join("") +
          H("bi1", ban("COORDINATE, ALIGN TARGETS", C.green, 282)) + H("bi3", ban("REAL OWNERSHIP", C.green, 282)) +
          H("bi2", bx(110, 20, 180, 34, WH, C.green) + t(200, 43, "BOOKING = RATE", C.green, null, 15)) +
          H("bi4", ban("RESOURCES TO CONNECT", C.green, 282)),
        sh: { bi1: [28, 28], bi2: [29, 29], bi3: [27, 27], bi4: [29, 29] } },
      // template: Apple HIG Motion — controlled focus pull (subdue context, sharpen one object) — https://developer.apple.com/design/human-interface-guidelines/motion
      { a: 30, d: bgc("#f4f6f9") + bx(6, 40, 188, 180, WH, C.navy) + t(100, 70, "FUNCTIONAL", C.navy) + t(100, 130, "HOW IS EACH", C.ink, null, 16) + t(100, 156, "DEPT DOING?", C.ink, null, 16) +
          bx(206, 40, 188, 180, WH, C.orange) + t(300, 70, "PROCESS", C.orange) + t(300, 130, "IS THE GUEST", C.ink, null, 16) + t(300, 156, "SERVED?", C.ink, null, 16) +
          H("bj1", ban("KEEP BOTH, GIVE AUTHORITY", C.green, 262)) + H("bj2", ban("FIX ONCE, OR KEEP MANAGING?", C.navy, 262)),
        sh: { bj1: [31, 31], bj2: [32, 32] } }
    ], ["Two perspectives", "Each team's story", "The functional view", "Targets met", "Not her experience",
      "Follow the traveller", "The process view", "Time, quality, cost", "Cycle time", "Cost to serve",
      "Own box vs whole flow", "Seeing the customer", "KPIs vs her door", "Great reports", "Local wins, global loss",
      "The process trap", "A new owner", "Everyone applauds", "Can't change rates", "Can't change schedules",
      "Managers can refuse", "No authority", "Worse than none", "Why more dangerous?", "Someone has it",
      "Nobody else asks", "Appearance only", "Real ownership", "Coordinate and align", "Resources to connect",
      "Both lenses", "Genuine authority", "Fix once, or manage?"],
      "The functional lens versus the process lens, cycle time and cost to serve, and the trap of a process owner without authority over the rate system, housekeeping schedules or departmental targets.", "#f4f2ee");
  })();

  // ============================================================
  // O4a · A project, or a discipline? · 33 moments · 10 compositions
  // ============================================================
  (function () {
    function chart(pre, pts, col) {
      var d = "M" + pts.map(function (p) { return p[0] + " " + p[1]; }).join(" L");
      return P("M40 60 V230 H380", C.slate, 2.5) + D(pre, d, col, 5);
    }
    build3("O4a", 33, [
      // template: LottieFiles — teamwork (people appear, then act as a team) — https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6
      { a: 0, d: bgc("#eef2f6") + E(200, 150, 120, 46, "#c9a46f") + [["RECEPTION", 60, 90], ["REVENUE", 340, 90], ["HOUSEKEEPING", 80, 250], ["FINANCE", 320, 250]].map(function (p, j) { return fig(p[1], p[2], 1, [C.navy, C.green, C.slate, C.amber][j]) + t(p[1], p[2] + 22, p[0], C.ink, null, 14); }).join("") +
          H("ca0", ban("TIME TO FIX CHECK-IN", C.navy, 26)) + H("ca1", t(200, 158, "4/10", C.red, null, 30)) +
          H("ca3", [["SEARCH", -70], ["RE-ENTER", 0], ["WAIT", 70]].map(function (p) { return pill(200, 118 + (p[1] + 70) * 0.46, p[0], { sz: 18, bg: C.red, st: C.red, fg: WH }); }).join("")),
        sh: { ca0: [0, 2], ca1: [1, 2], ca3: [3, 3] } },
      // template: Motion Array — Project TimeLine (markers advance along a time line) — https://motionarray.com/after-effects-templates/project-timeline-2424919/
      { a: 4, d: bgc("#f6f4ee") + I.flag(30, 70, 1.6, C.green) + I.flag(372, 70, 1.6, C.red) + t(44, 104, "START", C.green, null, 15) + t(358, 104, "FINISH", C.red, null, 15) + D("cb0", "M44 70 H360", C.navy, 6) +
          H("cb1", [["BOOKING CHECKS", "SIMPLER"], ["DATA ENTRY", "ONCE"], ["ROOM-READY", "ALERT"]].map(function (c) { return [c[0].replace("BOOKING CHECKS", "CHECKS"), c[1]]; }).map(function (c, j) { var x = 68 + j * 132; return bx(x - 62, 130, 124, 90, C.mint, C.green) + t(x, 162, c[0], C.ink, null, 14) + t(x, 196, c[1], C.green, null, 18); }).join("")) +
          H("cb2", R(110, 236, 180, 48, WH, 8, { stroke: C.red, "stroke-width": 4 }) + t(200, 268, "PROJECT CLOSED", C.red)) + H("cb3", ban("AN IMPROVEMENT PROJECT", C.navy, 26)),
        sh: { cb1: [5, 7], cb2: [7, 7], cb3: [4, 6] }, dr: { cb0: [4, 7] } },
      // template: Behance — The Process Architectural Motion (an idea grows into nested layers) — https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion
      { a: 8, d: bgc("#eef3f8") + pill(200, 40, "BPI", { sz: 30, bg: C.navy, st: C.navy, fg: WH }) + t(200, 92, "BUSINESS PROCESS IMPROVEMENT", C.navy, null, 16) +
          H("cc1", [["START", C.green], ["OBJECTIVE", C.navy], ["END", C.red]].map(function (c, j) { var x = 70 + j * 130; return bx(x - 58, 140, 116, 70, WH, c[1]) + t(x, 182, c[0], c[1], null, 16); }).join("") + P("M12 236 V246 H388 V236", C.navy, 4) + t(200, 280, "A PROJECT WITH LIMITS", C.navy)),
        sh: { cc1: [9, 9] } },
      // template: Kurzgesagt — consequence ripple (an event propagates to what it causes) — https://www.youtube.com/kurzgesagt/videos
      { a: 10, d: bgc("#f3efe7") + ban("AFTER THE PROJECT", C.navy, 26) +
          R(30, 120, 80, 90, "#d8cdb6", 8) + R(30, 90, 80, 34, "#c8bba0", 8) + t(70, 240, "NO ONE", C.red, null, 16) + H("cd0", t(70, 80, "?", C.red, null, 30)) +
          H("cd1", [["NEW STAFF", I.users(0, 0, 1.4)], ["NEW SYSTEM", I.screen(0, 0, 1.4)], ["OWN CALLS", I.flag(0, 0, 1.3)]].map(function (c, j) { var y = 80 + j * 64; return Tr(170, y, c[1]) + t(196, y + 6, c[0], C.slate, "start", 16); }).join("")) +
          H("cd2", [0, 1, 2].map(function (j) { return O(352, 100 + j * 50, 16, C.muted) + tick(352, 100 + j * 50, 1, WH); }).join("") + t(346, 270, "GAINS FADE", C.red, null, 14)),
        sh: { cd0: [11, 13], cd1: [12, 13], cd2: [13, 13] } },
      // template: Motion Array — Corporate Timeline by HenlyFx (milestones revealed one by one) — https://motionarray.com/after-effects-templates/corporate-timeline-1939632/
      { a: 14, d: bgc("#f4f2ee") + P("M20 150 H380", C.navy, 4) + bx(20, 110, 100, 80, WH, C.navy) + t(70, 156, "PROJECT", C.navy, null, 15) +
          t(200, 120, "3 YEARS", C.red) + bx(280, 110, 100, 80, WH, C.red) + t(330, 156, "PROJECT", C.red, null, 15) + t(324, 214, "SAME ISSUES", C.red, null, 15) +
          H("ce1", ban("ONLY OCCASIONAL PROJECTS", C.red, 274)),
        sh: { ce1: [15, 15] } },
      // template: Bartosz Ciechanowski — Gears (one mechanism only works when teeth engage) — https://ciechanow.ski/archives/
      { a: 16, d: bgc("#eef6f1") + O(130, 150, 84, "none", { stroke: C.green, "stroke-width": 6, "class": "a-flow" }) + fig(130, 186, 1.2, C.plum, { hair: "long", badge: C.sun }) + t(130, 210, "OWNER", C.plum, null, 15) +
          H("cf1", [["WAIT TIME", 46], ["ROOM READY", 100], ["JOURNEY", 154]].map(function (c) { return clock(238, c[1], 12, C.navy) + t(254, c[1] + 6, c[0], C.navy, "start", 15); }).join("")) +
          H("cf2", P("M250 230 L280 220 L310 250 L340 220 L370 214", C.orange, 4) + O(310, 250, 8, C.red) + t(310, 284, "DIP, THEN FIX", C.red, null, 15)) +
          H("cf0", ban("KEEP AN OWNER", C.green, 26)),
        sh: { cf0: [16, 17], cf1: [18, 19], cf2: [19, 19] } },
      // template: Behance — Motion Design Process (production stages shown as team vignettes) — https://www.behance.net/gallery/53752435/Motion-Design-Process
      { a: 20, d: bgc("#eef3f8") + pill(200, 34, "BPM", { sz: 30, bg: C.green, st: C.green, fg: WH }) + t(200, 80, "AN ONGOING DISCIPLINE", C.green, null, 16) +
          H("cg1", [["RESPONSIBILITY", C.navy], ["MEASURES", C.navy], ["DECISIONS", C.navy]].map(function (c, j) { var x = 70 + j * 130; return R(x - 18, 110, 36, 110, C.blue, 4, { stroke: C.navy, "stroke-width": 2 }) + t(x, 246, c[0], c[1], null, 14); }).join("") + R(20, 100, 360, 12, C.navy, 3) + t(200, 282, "GOVERNANCE", C.navy)) +
          H("cg2", O(200, 170, 100, "none", { stroke: C.green, "stroke-width": 8 }) + bx(140, 146, 120, 48, WH, C.navy) + t(200, 177, "BPI", C.navy) + t(200, 290, "BPI INSIDE BPM", C.green)),
        sh: { cg1: [21, 21], cg2: [22, 22] } },
      // template: 3Blue1Brown (Manim demo) — traced causal path drawn when it becomes relevant — https://www.3blue1brown.com/lessons/manim-demo/
      { a: 23, d: bgc("#fbf3ea") + ban("YOUR HEALTH", C.plum, 26) + t(48, 52, "WEIGHT", C.slate, "start", 14) + t(380, 252, "TIME", C.slate, "end", 14) +
          chart("ch0", [[40, 90], [120, 90], [180, 170], [220, 180]], C.green) + D("ch1", "M220 180 L280 140 L350 92", C.red, 5) +
          H("ch2", t(160, 210, "CRASH DIET", C.green, null, 16)) + H("ch3", t(300, 200, "OLD HABITS", C.red, null, 16) + F("M346 80 L358 92 L342 98 Z", C.red)),
        sh: { ch2: [24, 25], ch3: [25, 25] }, dr: { ch0: [24, 25], ch1: [25, 25, 0.3] } },
      // template: Motion Array — Scrolling Timeline (pan along time and settle on the event) — https://motionarray.com/after-effects-templates/scrolling-timeline-1223172/
      { a: 26, d: bgc("#eef6f1") + chart("ci0", [[40, 120], [100, 140], [150, 130], [200, 150], [250, 148], [300, 162], [350, 170]], C.green) + t(200, 270, "HEALTHY ROUTINE", C.green) +
          H("ci1", R(190, 70, 70, 120, C.sun, 6, { opacity: 0.35 }) + t(225, 60, "FOCUSED PUSH", C.amber, null, 14)) +
          H("ci2", ban("PROJECT INSIDE ROUTINE", C.navy, 26)),
        sh: { ci1: [27, 28], ci2: [28, 28] }, dr: { ci0: [26, 28] } },
      // template: Motion Array — Corporate Timeline by HenlyFx (milestones revealed one by one) — https://motionarray.com/after-effects-templates/corporate-timeline-1939632/
      { a: 29, d: bgc("#f4f6f9") +
          H("cj0", fig(120, 220, 1.6, C.plum, { hair: "long", badge: C.sun }) + E(280, 140, 50, 26, WH, { stroke: C.navy, "stroke-width": 4 }) + O(280, 140, 12, C.navy) + ban("WHO KEEPS WATCHING?", C.navy, 26)) +
          H("cj1", bx(20, 80, 170, 120, WH, C.amber) + t(105, 124, "WEEK 13", C.amber) + t(105, 162, "LASTING VALUE", C.ink, null, 15) + bx(210, 80, 170, 120, WH, C.green) + t(295, 124, "WEEK 14", C.green) + t(295, 162, "SUSTAINED", C.ink, null, 15) + ban("IN YOUR ASSESSMENT", C.navy, 26)) +
          H("cj2", rep(5, function (i) { return R(60 + i * 60, 220 - i * 34, 56, 34 + i * 34, i < 2 ? C.navy2 : "#cfd9e4", 4); }) + t(210, 60, "HOW MATURE?", C.navy, null, 22)),
        sh: { cj0: [29, 29], cj1: [30, 30], cj2: [31, 32] } }
    ], ["Time to fix it", "Four out of ten", "All teams together", "Search, re-enter, wait", "A project begins",
      "Three changes", "Prevent repeats", "Project closed", "BPI", "Start, goal, end",
      "Before applauding", "Back to routines", "Staff, systems change", "Gains fade", "Three years later",
      "Only projects", "A different choice", "Keep an owner", "Monitor the journey", "Spot and fix dips",
      "BPM", "Governance", "BPI inside BPM", "Your health", "Crash diet",
      "Weight returns", "Healthy routine", "Focused push", "Project inside routine", "Who keeps watching",
      "Weeks 13 and 14", "Ready for more?", "How mature?"],
      "A check-in improvement project with a start and finish (BPI), its gains fading with no owner, versus BPM: an owner, measures and decision rights that keep watching, illustrated with a crash diet versus a healthy routine.", "#eef2f6");
  })();

  // ============================================================
  // O4b · How mature is the process? · 32 moments · 10 compositions
  // ============================================================
  (function () {
    var LV = [["1", "INITIAL"], ["2", "REPEATABLE"], ["3", "DEFINED"], ["4", "MANAGED"], ["5", "OPTIMISING"]];
    function lvl(n, col) { return pill(200, 276, LV[n - 1][0] + " · " + LV[n - 1][1], { sz: 20, bg: col || C.navy, st: col || C.navy, fg: WH }); }
    build3("O4b", 32, [
      // template: Observable — Hierarchy traversal animated (visit one node, then its child) — https://old.observablehq.com/@d3/hierarchy-traversal-animated
      { a: 0, d: bgc("#eef2f6") + fig(60, 250, 1.5, C.plum, { hair: "long", badge: C.sun }) +
          H("da1", [["CONSISTENT?", 70], ["DOCUMENTED?", 120], ["MEASURED?", 170]].map(function (q) { return t(120, q[1], q[0], C.navy, "start", 18); }).join("")) +
          H("da2", rep(5, function (i) { return R(150 + i * 48, 230 - (i + 1) * 30, 46, (i + 1) * 30, i ? "#cfd9e4" : C.navy2, 4) + T(173 + i * 48, 222, String(i + 1), 18, i ? C.navy : WH); }) + ban("FIVE MATURITY LEVELS", C.navy, 26)),
        sh: { da1: [1, 1], da2: [2, 2] } },
      // template: LottieFiles — teamwork (people appear, then act as a team) — https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6
      { a: 3, d: bgc("#f3efe7") + bx(6, 40, 188, 200, C.mint, C.green) + fig(100, 190, 1.4, C.navy, { hair: "long" }) + I.phone(150, 100, 1.5) + t(100, 222, "EXPERIENCED", C.green, null, 16) + badge(170, 60, 14, true) +
          bx(206, 40, 188, 200, C.peach, C.red) + fig(300, 190, 1.4, C.slate) + t(300, 222, "NEWER", C.red, null, 16) + badge(370, 60, 14, false) + T(300, 100, "?", 30, C.red) +
          H("db0", ban("DEPENDS WHO'S ON SHIFT", C.navy, 26)) + H("db1", lvl(1, C.red) + I.star(100, 90, 1.8, C.sun)),
        sh: { db0: [3, 4], db1: [5, 5] } },
      // template: LottieFiles — Workflow by a (workers revealed, then workflow actions) — https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm
      { a: 6, d: bgc("#eef3f8") + bx(20, 50, 120, 160, WH, C.navy) + t(80, 80, "WRITTEN", C.navy, null, 16) + P("M40 104 H120 M40 128 H120 M40 152 H104 M40 176 H112", C.muted, 4) +
          H("dc1", [180, 230, 280, 330].map(function (x, j) { return fig(x, 200, 1, j === 3 ? C.orange : C.navy) + (j === 3 ? T(x, 120, "!", 22, C.orange) : badge(x, 120, 10, true)); }).join("") + t(255, 236, "MOST OF THE TIME", C.navy, null, 15)) +
          H("dc2", lvl(2, C.navy)),
        sh: { dc1: [7, 8], dc2: [8, 8] } },
      // template: Observable — Animated quadtree (a region subdivides into parts) — https://observablehq.com/@d3/animated-quadtree
      { a: 9, d: bgc("#f4f2ee") + t(200, 34, "14 HOTELS", C.navy, null, 22) +
          rep(14, function (i) { var x = 22 + (i % 7) * 52, y = 56 + Math.floor(i / 7) * 86, v = ["#f8e3d8", "#e1f0e8", "#ece6f3", "#dbe7f2"][i % 4]; return H("dd" + i, R(x, y, 44, 70, v, 6, { stroke: C.slate, "stroke-width": 2 }) + P("M" + (x + 8) + " " + (y + 18 + (i % 3) * 6) + " H" + (x + 36) + " M" + (x + 8) + " " + (y + 36) + " H" + (x + 28 + (i % 2) * 8), C.slate, 3)) +
            H("de" + i, R(x, y, 44, 70, C.mint, 6, { stroke: C.green, "stroke-width": 2.5 }) + tick(x + 22, y + 36, 1.1)); }) +
          H("df0", pill(200, 274, "DIFFERENT VERSIONS", { sz: 18, bg: C.orange, st: C.orange, fg: WH })) + H("df1", pill(200, 274, "ONE COMMON METHOD", { sz: 18, bg: C.green, st: C.green, fg: WH })) + H("df2", lvl(3, C.green)),
        sh: (function () { var o = { df0: [9, 9], df1: [10, 10], df2: [11, 11] }; for (var i = 0; i < 14; i++) { o["dd" + i] = [9, 9]; o["de" + i] = [10, 11, i * 0.06]; } return o; })() },
      // template: Motion Array — Infographic Chart Creator (bars grow, values stamp in) — https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/
      { a: 12, d: bgc("#f4f6f9") + t(30, 40, "CHECK-IN TIME", C.navy, "start", 16) + R(40, 110, 340, 50, C.mint) + t(370, 104, "TARGET", C.green, "end", 15) + P("M40 60 V230 H380", C.slate, 2.5) +
          D("dg0", "M40 140 L100 130 L150 140 L200 150", C.navy, 4) + D("dg1", "M200 150 L240 186 L270 200", C.red, 4) + D("dg2", "M270 200 L310 150 L370 136", C.green, 4) +
          H("dg3", fig(290, 290, 0.9, C.plum, { hair: "long", badge: C.sun }) + O(270, 200, 10, "none", { stroke: C.red, "stroke-width": 3 })) + H("dg4", lvl(4, C.navy)),
        sh: { dg3: [13, 14], dg4: [14, 14] }, dr: { dg0: [12, 14], dg1: [13, 14, 0.4], dg2: [13, 14, 1.4] } },
      // template: LottieFiles — Multi-Step Icon Animation (activate one step after another) — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
      { a: 15, d: bgc("#eef6f1") + fig(50, 140, 1.1, C.navy, { hair: "long" }) + fig(100, 140, 1.1, C.slate) +
          H("dh1", bx(140, 60, 244, 50, C.sun, C.amber) + t(262, 92, "SHARED READY ALERT", C.ink, null, 15)) +
          H("dh2", [["TRY", 70], ["MEASURE", 200], ["KEEP", 330]].map(function (s, j) { return O(s[1], 200, 40, WH, { stroke: C.green, "stroke-width": 4 }) + t(s[1], 205, s[0], C.green, null, 14) + (j < 2 ? arr(s[1] + 42, 200, s[1] + 86, 200, C.green) : ""); }).join("")) +
          H("dh3", lvl(5, C.green)) + H("dh0", ban("BEYOND WATCHING REPORTS", C.navy, 274)),
        sh: { dh0: [15, 15], dh1: [16, 18], dh2: [17, 18], dh3: [18, 18] } },
      // template: Kurzgesagt — consequence ripple (an event propagates to what it causes) — https://www.youtube.com/kurzgesagt/videos
      { a: 19, d: bgc("#f3efe7") + P("M60 220 C80 180 120 240 150 200 C180 160 200 230 240 196 C270 170 300 230 340 200", C.slate, 4) + t(200, 254, "UNDOCUMENTED WORK", C.slate, null, 16) +
          K("di0", Tr(200, 110, I.gear(0, 0, 36, C.plum, "#f3efe7"))) + t(200, 40, "ADVANCED TOOL?", C.plum, null, 20) +
          H("di1", cross(200, 110, 2.6, C.red, 7) + t(320, 120, "NOTHING", C.red, null, 15) + t(320, 142, "STABLE", C.red, null, 15)) +
          H("di2", R(40, 262, 150, 30, C.navy, 4) + t(115, 284, "DOCUMENT", WH, null, 15) + R(210, 262, 150, 30, C.navy, 4) + t(285, 284, "ROUTINE", WH, null, 15)),
        sh: { di1: [20, 21], di2: [21, 21] }, mv: { di0: function (k) { return k >= 20 ? { y: 60, r: 30 } : {}; } } },
      // template: The Pudding — responsive scrollytelling (pinned before-and-after comparison) — https://pudding.cool/process/responsive-scrollytelling/
      { a: 22, d: bgc("#f4f2ee") +
          H("dj0", bx(6, 60, 188, 160, C.mint, C.green) + R(60, 140, 80, 34, C.green, 10) + O(78, 176, 9, C.ink) + O(122, 176, 9, C.ink) + R(84, 112, 28, 26, WH, 3, { stroke: C.red, "stroke-width": 2 }) + T(98, 131, "L", 18, C.red) + t(100, 206, "BASICS FIRST", C.green, null, 16) +
            bx(206, 60, 188, 160, "#eef0f2", C.muted) + R(250, 146, 100, 26, C.red, 12) + O(270, 176, 9, C.ink) + O(330, 176, 9, C.ink) + I.lock(300, 110, 1.6, C.slate) + t(300, 206, "RACING LATER", C.slate, null, 16)) +
          H("dj1", O(100, 140, 50, "none", { stroke: C.navy, "stroke-width": 5 }) + P("M100 190 V230 H160", C.navy, 4) + t(280, 130, "DIAGNOSIS,", C.navy) + t(280, 160, "NOT A SCORE", C.red)) +
          H("dj2", t(140, 250, "WILL WORK", C.green, null, 15) + badge(70, 244, 12, true) + t(320, 250, "REJECTED", C.red, null, 15) + badge(250, 244, 12, false)),
        sh: { dj0: [22, 22], dj1: [23, 24], dj2: [24, 24] } },
      // template: Dribbble — Product Workflow Animation & UI Motion Design (shift between product states) — https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design
      { a: 25, d: bgc("#eef2f6") + ban("ASSESS EACH PROCESS", C.navy, 26) + bx(6, 60, 188, 170, WH, C.orange) + t(100, 92, "CHECK-IN", C.orange) + t(100, 160, "MIGHT BE", C.slate, null, 15) + t(100, 190, "INITIAL", C.orange, null, 20) +
          bx(206, 60, 188, 170, WH, C.green) + t(300, 92, "BILLING", C.green) + t(300, 160, "COULD BE", C.slate, null, 15) + t(300, 190, "MANAGED", C.green, null, 20) +
          H("dk1", ban("NOT ONE LEVEL FOR ALL", C.red, 270)),
        sh: { dk1: [27, 27] } },
      // template: Awwwards — UI Animation & Microinteractions (morphing decision gate: pass or bounce) — https://www.awwwards.com/awwwards/collections/animation/
      { a: 28, d: bgc("#f6f1ea") + pill(200, 30, "\"CHECK-IN IS MANAGED\"", { sz: 18, bg: C.navy, st: C.navy, fg: WH }) +
          [["TARGET", 80], ["RESULTS OVER TIME", 128], ["CORRECTIVE ACTION", 176]].map(function (e) { return R(40, e[1] - 22, 30, 30, WH, 4, { stroke: C.slate, "stroke-width": 2.5, "stroke-dasharray": "5 4" }) + t(84, e[1], e[0], C.slate, "start", 16); }).join("") +
          H("dl1", Tr(300, 230, R(-90, -26, 180, 52, "none", 8, { stroke: C.red, "stroke-width": 5 }) + T(0, 10, "NOT PROVEN", 24, C.red), 1, -10)) +
          H("dl2", [["DIAGNOSE", 64], ["FIND GAPS", 196], ["MATCH FIX", 330]].map(function (s, j) { return pill(s[1], 240, s[0], { sz: 18, bg: C.green, st: C.green, fg: WH }); }).join("")) +
          H("dl3", ban("NEXT: THE FRAMEWORK", C.navy, 284)),
        sh: { dl1: [29, 29], dl2: [30, 31], dl3: [31, 31] } }
    ], ["Owner reviews check-in", "Consistent? Documented?", "Process maturity", "Depends who's working", "Heroes and novices",
      "Level 1: Initial", "Write it down", "Followed most times", "Level 2: Repeatable", "Fourteen versions",
      "One common method", "Level 3: Defined", "Judge performance", "Drift, then correct", "Level 4: Managed",
      "Beyond reports", "Staff suggest fixes", "Try, measure, keep", "Level 5: Optimising", "Advanced tools now?",
      "Nothing stable yet", "Foundations first", "Basics before racing", "A diagnosis", "What will work",
      "Each process differs", "Check-in vs billing", "Assess separately", "Evidence needed", "Not proven",
      "Diagnose honestly", "Next: the framework"],
      "Five maturity levels for Qasr check-in: heroes at Initial, a written routine at Repeatable, one method across 14 hotels at Defined, measured against a target at Managed, staff improving it at Optimising, and evidence before any claim.", "#eef2f6");
  })();

  // ============================================================
  // O4c · A route, not a ratchet · 35 moments · 10 compositions
  // ============================================================
  (function () {
    var PH = ["ORGANISATION STRATEGY", "PROCESS ARCHITECTURE", "LAUNCH PAD", "UNDERSTAND", "INNOVATE", "PEOPLE", "DEVELOP", "IMPLEMENT", "REALISE VALUE", "SUSTAINABLE PERFORMANCE"];
    function station(n, x, y, col) { return O(x, y, 20, col || C.navy) + T(x, y + 7, String(n), 18, WH); }
    build3("O4c", 35, [
      // template: LottieFiles — World map with logistics (pins and routes on a map) — https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy
      { a: 0, d: bgc("#eef2f6") + fig(200, 270, 1.6, C.navy) + P("M200 200 L80 90 M200 200 L320 90 M200 200 V60", C.slate, 6) +
          H("ea1", [["OWNER", 80, 80], ["MEASURES", 200, 50], ["MATURITY", 320, 80]].map(function (b) { return pill(b[1], b[2], b[0], { sz: 18, bg: WH, st: C.green, fg: C.green }); }).join("")) +
          H("ea0", ban("ONCE IS NOT ENOUGH", C.navy, 140)) + H("ea3", ban("HOW TO ORGANISE IT?", C.orange, 140)),
        sh: { ea0: [0, 1], ea1: [2, 3], ea3: [3, 3] } },
      // template: Motion Array — Corporate Timeline by HenlyFx (milestones revealed one by one) — https://motionarray.com/after-effects-templates/corporate-timeline-1939632/
      { a: 4, d: bgc("#f4f6f9") + PH.map(function (p, i) { var y = 22 + i * 27; return H("eb" + i, R(10, y - 2, 46, 22, C.navy, 11) + T(33, y + 15, "W" + (i + 5), 14, WH) + t(66, y + 16, p, C.ink, "start", i === 9 ? 15 : 16)); }).join(""),
        sh: (function () { var o = {}; for (var i = 0; i < 10; i++) o["eb" + i] = [4, 5, i * 0.12]; return o; })() },
      // template: Dribbble — Data Workflow Animation (nodes and links activate in sequence) — https://dribbble.com/shots/27247003-Data-Workflow-Animation
      { a: 6, d: bgc("#eef3f8") +
          H("ec0", station(1, 40, 40) + t(70, 46, "STRATEGY", C.navy, "start") + bx(20, 90, 150, 70, C.mint, C.green) + t(95, 132, "GUEST GOAL", C.green, null, 16) + arr(176, 125, 220, 125, C.navy, 4) + bx(226, 90, 160, 70, WH, C.navy) + t(306, 122, "GROUP", C.navy, null, 16) + t(306, 146, "AMBITIONS", C.navy, null, 16)) +
          H("ec1", station(2, 40, 40) + t(70, 46, "ARCHITECTURE", C.navy, "start") + P("M150 104 L110 116 M250 104 L290 116 M172 122 L138 198 M228 122 L262 198", C.muted, 3) + [[60, 120, "SELL"], [200, 100, "CHECK-IN"], [340, 120, "BILL"], [120, 220, "CLEAN"], [280, 220, "DINE"]].map(function (n, j) { return bx(n[0] - 50, n[1] - 22, 100, 44, j === 1 ? C.peach : WH, j === 1 ? C.orange : C.slate) + t(n[0], n[1] + 6, n[2], j === 1 ? C.orange : C.slate, null, 15); }).join("")),
        sh: { ec0: [6, 7], ec1: [8, 9] } },
      // template: Behance — The Process Architectural Motion (an idea grows into nested layers) — https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion
      { a: 10, d: bgc("#f6f4ee") + station(3, 40, 40) + t(70, 46, "LAUNCH PAD", C.navy, "start") +
          [["TEAM", I.users(0, 0, 1.8)], ["SCOPE", I.mag(0, 0, 1.8)], ["PLAN", I.doc(0, 0, 1.8)]].map(function (f, j) { var x = 70 + j * 130; return H("ed" + j, R(x - 58, 150, 116, 110, C.navy, 6) + Tr(x, 190, f[1]) + t(x, 244, f[0], WH)); }).join("") +
          F("M160 140 L200 70 L240 140 Z", C.orange),
        sh: { ed0: [10, 11, 0], ed1: [10, 11, 0.3], ed2: [10, 11, 0.6] } },
      // template: NYT Immersive — evidence-based zoom (detail, then pull back to the system) — https://www.nytimes.com/spotlight/augmented-reality
      { a: 12, d: bgc("#f3efe7") +
          H("ee0", station(4, 40, 40) + t(70, 46, "UNDERSTAND", C.navy, "start") + P("M30 150 H370", C.navy, 5) + I.bell(30, 150, 1.4) + I.bed(370, 150, 1.4, C.slate) +
            H("ee1", [["WAIT", 110, clock(0, 0, 14, C.red)], ["RE-ENTRY", 200, I.doc(0, 0, 1.3, C.red)], ["NOT READY", 290, I.lock(0, 0, 1.3, C.red)]].map(function (m) { return Tr(m[1], 116, m[2]) + t(m[1], 196, m[0], C.red, null, 14); }).join(""))) +
          H("ee2", station(5, 40, 40) + t(70, 46, "INNOVATE", C.navy, "start") + O(200, 140, 40, C.sun) + R(186, 180, 28, 20, C.slate, 4) + t(200, 240, "A BETTER CHECK-IN", C.green)),
        sh: { ee0: [12, 13], ee1: [13, 13], ee2: [14, 14] } },
      // template: LottieFiles — Multi-Step Icon Animation (activate one step after another) — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
      { a: 15, d: bgc("#eef6f1") +
          H("ef0", station(6, 40, 40) + t(70, 46, "PEOPLE", C.navy, "start") + [80, 150, 250, 320].map(function (x, j) { return fig(x, 200, 1.1, j < 2 ? C.navy : C.slate) + H("eft" + j, badge(x + 16, 120, 10, true)); }).join("") + t(115, 236, "FRONT DESK", C.navy, null, 15) + t(285, 236, "HOUSEKEEPING", C.slate, null, 15)) +
          H("ef1", station(7, 40, 40) + t(70, 46, "DEVELOP", C.navy, "start") + [0, 1, 2].map(function (j) { return R(130 + j * 50, 190 - j * 40, 80, 38, [C.navy2, C.green, C.amber][j], 4); }).join("") + t(200, 250, "RATE + ROOM ALERT", C.navy, null, 16)) +
          H("ef2", station(8, 40, 40) + t(70, 46, "IMPLEMENT", C.navy, "start") + R(150, 90, 100, 120, C.ink, 10) + R(170, 120, 60, 30, C.green, 15) + O(215, 135, 12, WH) + t(200, 250, "LIVE AT THE DESK", C.green, null, 16)),
        sh: { ef0: [15, 16], eft0: [16, 16, 0], eft1: [16, 16, 0.2], eft2: [16, 16, 0.4], eft3: [16, 16, 0.6], ef1: [17, 18], ef2: [19, 19] } },
      // template: The Pudding — responsive scrollytelling (pinned before-and-after comparison) — https://pudding.cool/process/responsive-scrollytelling/
      { a: 20, d: bgc("#f4f2ee") +
          H("eg0", bx(6, 60, 188, 150, C.mint, C.green) + t(100, 120, "INSTALLED", C.green) + badge(100, 160, 16, true) + bx(206, 60, 188, 150, WH, C.orange) + t(300, 120, "GUEST BETTER?", C.orange, null, 16) + T(300, 175, "?", 36, C.orange)) +
          H("eg1", station(9, 40, 40) + t(70, 46, "REALISE VALUE", C.navy, "start") + bx(40, 90, 320, 120, WH, C.navy) + t(70, 136, "WAITING SHORTER?", C.ink, "start", 16) + t(70, 180, "ROOM READY?", C.ink, "start", 16) + O(330, 130, 12, "none", { stroke: C.navy, "stroke-width": 3 }) + O(330, 174, 12, "none", { stroke: C.navy, "stroke-width": 3 })) +
          H("eg2", station(10, 40, 40) + t(70, 46, "SUSTAIN", C.navy, "start") + O(200, 160, 70, "none", { stroke: C.green, "stroke-width": 8, "class": "a-flow" }) + t(200, 166, "KEEP IT", C.green) + t(200, 190, "WORKING", C.green)),
        sh: { eg0: [20, 20], eg1: [21, 21], eg2: [22, 22] } },
      // template: Motion Array — Project TimeLine (markers advance along a time line) — https://motionarray.com/after-effects-templates/project-timeline-2424919/
      { a: 23, d: bgc("#f4f6f9") + P("M42 80 H360", C.navy2, 3) + rep(10, function (i) { var x = 22 + i * 39.5; return station(i + 1, x, 80, C.navy2); }) +
          [["PROJECT MANAGEMENT", 150, C.amber], ["PEOPLE CHANGE", 196, C.plum], ["LEADERSHIP", 242, C.green]].map(function (b) { return R(6, b[1] - 18, 388, 34, b[2], 8, { opacity: 0.9 }) + t(200, b[1] + 6, b[0], WH, null, 16); }).join("") +
          H("eh1", ban("UNDER EVERY PHASE", C.navy, 284)),
        sh: { eh1: [24, 24] } },
      // template: 3Blue1Brown (Manim demo) — traced causal path drawn when it becomes relevant — https://www.3blue1brown.com/lessons/manim-demo/
      { a: 25, d: bgc("#eef3f8") + P("M60 150 H340", C.navy2, 3) + rep(5, function (i) { return station(i + 1, 40 + i * 80, 150, i === 3 ? C.orange : C.navy2); }) +
          t(120, 196, "ARCHITECTURE", C.navy, null, 14) + t(280, 196, "UNDERSTAND", C.orange, null, 14) +
          H("ei0", ban("AN ORDER, NOT A CAGE", C.navy, 26)) +
          H("ei1", bx(200, 220, 190, 60, C.peach, C.red) + t(295, 246, "MISSING LINK", C.red, null, 15) + t(295, 268, "BOOKING-ROOM", C.red, null, 14)) +
          H("ei2", P("M280 128 C260 70 140 70 120 128", C.orange, 5) + F("M112 120 L120 134 L130 120 Z", C.orange) + t(200, 60, "GO BACK, FIX IT", C.orange)),
        sh: { ei0: [25, 26], ei1: [27, 29], ei2: [29, 29] } },
      // template: Bartosz Ciechanowski — Gears (one mechanism only works when teeth engage) — https://ciechanow.ski/archives/
      { a: 30, d: bgc("#f6f4ee") +
          H("ej0", bx(6, 50, 188, 190, WH, C.red) + Tr(100, 130, I.gear(0, 0, 44, C.slate, WH)) + F("M130 76 L160 96 L140 104 Z", C.red) + t(100, 214, "RATCHET", C.red) +
            bx(206, 50, 188, 190, WH, C.green) + arr(230, 120, 370, 120, C.green, 4) + arr(370, 160, 230, 160, C.green, 4) + t(300, 214, "ROUTE", C.green)) +
          H("ej1", bx(40, 50, 320, 180, WH, C.slate) + rep(10, function (i) { return tick(70 + (i % 5) * 60, 100 + Math.floor(i / 5) * 50, 1.3, C.green); }) + I.screen(200, 205, 1.6, C.muted) + t(200, 260, "NOBODY USES IT", C.red)) +
          H("ej2", [["LEARN", 70, 90], ["IMPROVE", 290, 90], ["VERIFY", 70, 180], ["SUSTAIN", 290, 180]].map(function (w) { return pill(w[1] + 20, w[2], w[0], { sz: 20, bg: C.green, st: C.green, fg: WH }); }).join("")) +
          H("ej3", fig(200, 250, 1.8, C.orange, { hair: "long" }) + ban("BACK TO OUR TRAVELLER", C.orange, 40)),
        sh: { ej0: [30, 31], ej1: [32, 32], ej2: [33, 33], ej3: [34, 34] } }
    ], ["Once is not enough", "Problems crossed teams", "Owner, measures, maturity", "How to organise?", "The BPM framework",
      "Ten phases, Weeks 5-14", "Wider ambitions", "Organisation Strategy", "How processes fit", "Process Architecture",
      "Prepare the programme", "Launch Pad", "Back to the desk", "Understand", "Innovate",
      "Ready to change?", "People", "Build the solution", "Develop", "Implement",
      "Installed is not value", "Realise Value", "Sustainable Performance", "Three essentials", "Under every phase",
      "How to use it", "An order, not a cage", "A missed connection", "Ignore it?", "Go back and fix",
      "Route, not ratchet", "Two directions", "Boxes ticked, unused", "Learn and sustain", "Back to her"],
      "The ten-phase BPM framework for Qasr's check-in, studied in Weeks 5 to 14, with project management, people change and leadership underneath, and a route that allows going back to fix an earlier phase.", "#eef2f6");
  })();

  // ============================================================
  // W1OUTRO · Week 1 in four lines, and your forum · 35 moments · 10 compositions
  // ============================================================
  (function () {
    var PH = [["STRATEGY", "PEOPLE"], ["ARCHITECTURE", "DEVELOP"], ["LAUNCH PAD", "IMPLEMENT"], ["UNDERSTAND", "REALISE VALUE"], ["INNOVATE", "SUSTAIN"]];
    build3("W1OUTRO", 35, [
      // template: Motion Array — Infographic Chart Creator (bars grow, values stamp in) — https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/
      { a: 0, d: bgc("#13263b") + R(240, 60, 150, 190, "#2f4b6b", 4) + R(250, 70, 130, 30, C.deep, 6) + t(315, 92, "QASR", C.sun) +
          H("fa0", fig(100, 250, 1.6, C.orange, { hair: "long" }) + R(122, 214, 16, 32, C.navy, 4) + ban("THAT EVENING", C.sun, 30, C.ink)) +
          H("fa2", [["23 MIN", 50], ["PASSPORT X2", 140], ["NOT READY", 230]].map(function (p) { return R(10, p[1], 220, 70, C.peach, 10, { stroke: C.red, "stroke-width": 3 }) + t(120, p[1] + 44, p[0], C.red, null, 22); }).join("")) +
          H("fa3", R(250, 120, 130, 110, WH, 10) + t(315, 160, "TEAMS", C.green, null, 16) + badge(315, 192, 14, true) + R(250, 236, 130, 50, C.red, 10) + t(315, 270, "HER: 4/10", WH, null, 18)),
        sh: { fa0: [0, 1], fa2: [2, 3], fa3: [3, 3] } },
      // template: Kurzgesagt — living process token (one protagonist walks into the system) — https://kurzgesagt.org/what-we-do
      { a: 4, d: bgc("#f4f6f9") + ["RECEPTION", "REVENUE", "HOUSEKEEPING"].map(function (d, j) { return R(8 + j * 130, 60, 124, 200, "#e7edf4", 8) + t(70 + j * 130, 86, d, C.navy, null, 14); }).join("") +
          O(30, 160, 20, WH, { stroke: C.navy, "stroke-width": 3 }) + I.bell(30, 162, 1.1) + O(370, 160, 20, C.mint, { stroke: C.green, "stroke-width": 3 }) + I.bed(370, 162, 1.1, C.green) +
          D("fb1", "M50 160 H350", C.orange, 6) + K("fbg", fig(0, 0, 0.9, C.orange, { hair: "long" })) +
          H("fb0", ban("NOW YOU SEE A PROCESS", C.navy, 26)) + H("fb2", ban("RECEPTION TO RIGHT ROOM", C.green, 26)) + H("fb3", ban("IT CROSSES DEPARTMENTS", C.orange, 26)),
        sh: { fb0: [4, 5], fb2: [6, 6], fb3: [7, 7] }, dr: { fb1: [5, 7] }, mv: { fbg: function (k) { return { x: k >= 6 ? 340 : 50, y: 236 }; } } },
      // template: Bartosz Ciechanowski — Gears (one mechanism only works when teeth engage) — https://ciechanow.ski/archives/
      { a: 8, d: bgc("#eef6f1") + fig(70, 240, 1.7, C.plum, { hair: "long", badge: C.sun }) + t(70, 274, "OWNER", C.plum) +
          [["THE WORK", 70], ["MEASURES", 150], ["BUDGET", 230]].map(function (c, j) { return P("M100 150 L230 " + c[1], C.green, 4) + H("fc" + j, cross(166, (150 + c[1]) / 2, 1.2, C.red, 5)) + bx(236, c[1] - 26, 158, 52, C.mint, C.green) + t(315, c[1] + 6, c[0], C.green, null, 16); }).join("") +
          H("fc3", ban("GOOD REPORTS, BAD NIGHT", C.navy, 26)) + H("fc4", ban("OWNER WITH AUTHORITY", C.green, 26)) + H("fc5", ban("OWNER WITHOUT POWER", C.red, 26)),
        sh: { fc0: [11, 11], fc1: [11, 11, 0.2], fc2: [11, 11, 0.4], fc3: [8, 8], fc4: [9, 10], fc5: [11, 11] } },
      // template: Motion Array — Corporate Timeline by HenlyFx (milestones revealed one by one) — https://motionarray.com/after-effects-templates/corporate-timeline-1939632/
      { a: 12, d: bgc("#eef3f8") + bx(6, 60, 188, 170, WH, C.navy) + t(100, 92, "BPI", C.navy, null, 26) + I.flag(40, 160, 1.4, C.green) + P("M50 160 H150", C.navy, 4) + I.flag(160, 160, 1.4, C.red) + t(100, 210, "PROJECT ENDS", C.navy, null, 15) +
          bx(206, 60, 188, 170, WH, C.green) + t(300, 92, "BPM", C.green, null, 26) + O(300, 160, 36, "none", { stroke: C.green, "stroke-width": 6, "class": "a-flow" }) + fig(300, 176, 0.6, C.plum) + t(300, 222, "KEEPS GOING", C.green, null, 15) +
          H("fd0", ban("WHO KEEPS MANAGING?", C.navy, 274)),
        sh: { fd0: [12, 12] } },
      // template: Observable — Hierarchy traversal animated (visit one node, then its child) — https://old.observablehq.com/@d3/hierarchy-traversal-animated
      { a: 14, d: bgc("#f3efe7") + R(60, 220, 280, 40, C.navy, 4) + t(200, 247, "PROCEDURES FIRST", WH) +
          H("fe1", R(100, 160, 200, 56, C.navy2, 4) + t(200, 194, "DEPENDABLE", WH) + R(150, 96, 100, 60, "#cfd9e4", 4) + t(200, 132, "ADVANCED", C.navy, null, 15)) +
          ban("HOW MATURE IS IT?", C.navy, 30),
        sh: { fe1: [15, 15] } },
      // template: LottieFiles — Multi-Step Icon Animation (activate one step after another) — https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
      { a: 16, d: bgc("#f4f6f9") +
          H("ff0", PH.map(function (p, i) { return t(10, 66 + i * 34, (i + 1) + " " + p[0], C.navy, "start", 16) + t(206, 66 + i * 34, (i + 6) + " " + p[1], C.navy, "start", 16); }).join("") + ban("TEN-PHASE FRAMEWORK", C.navy, 22) + t(200, 248, "ROUTE: IMPROVE, CHECK, SUSTAIN", C.green, null, 14)) +
          H("ff1", ["FRONT", "REVENUE", "HK"].map(function (d, j) { return bx(10, 50 + j * 64, 150, 52, C.mint, C.green) + t(70, 82 + j * 64, d, C.green, null, 16) + badge(140, 76 + j * 64, 11, true); }).join("") +
            arr(170, 140, 210, 140, C.navy, 4) + bx(220, 60, 170, 160, WH, C.navy) + t(305, 120, "CUSTOMER", C.navy) + t(305, 150, "OUTCOME?", C.navy) + H("ff2", ban("THE WHOLE PROCESS", C.green, 270))),
        sh: { ff0: [16, 16], ff1: [17, 18], ff2: [18, 18] } },
      // template: LottieFiles — World map with logistics (pins and routes on a map) — https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy
      { a: 19, d: bgc("#eef2f6") + ban("AL MADAR LOGISTICS", C.plum, 26) + bx(10, 60, 96, 70, WH, C.red) + P("M24 80 H92 M24 96 H92 M24 112 H74", C.slate, 3) + t(58, 150, "COMPLAINT", C.red, null, 14) +
          H("fg1", rep(6, function (i) { var x = 130 + (i % 3) * 90, y = 60 + Math.floor(i / 3) * 90; return bx(x, y, 78, 70, C.mint, C.green) + T(x + 39, y + 30, "DEPT " + (i + 1), 14, C.green) + badge(x + 39, y + 52, 11, true); }) + t(265, 250, "EVERY KPI MET", C.green, null, 16)) +
          H("fg2", R(10, 176, 96, 96, WH, 8, { stroke: C.red, "stroke-width": 3 }) + R(10, 176, 96, 24, C.red, 8) + t(58, 244, "19", C.red, null, 30) + t(58, 266, "DAYS", C.red, null, 14)),
        sh: { fg1: [21, 22], fg2: [22, 22] } },
      // template: The Pudding — responsive scrollytelling (pinned before-and-after comparison) — https://pudding.cool/process/responsive-scrollytelling/
      { a: 23, d: bgc("#f6f4ee") +
          H("fh0", bx(6, 50, 188, 120, WH, C.orange) + fig(60, 150, 1, C.orange, { hair: "long" }) + t(130, 96, "QASR", C.orange, null, 16) + t(130, 132, "23 MIN", C.red, null, 16) +
            bx(206, 50, 188, 120, WH, C.plum) + I.doc(250, 110, 1.8, C.plum) + t(330, 96, "AL MADAR", C.plum, null, 15) + t(330, 132, "19 DAYS", C.red, null, 16) + ban("SAME PATTERN?", C.navy, 22)) +
          H("fh1", P("M20 230 H380", C.slate, 5) + rep(5, function (i) { return R(70 + i * 62, 214, 6, 32, C.red, 2); }) + t(30, 270, "SENT", C.ink, "start", 15) + t(380, 270, "NO ANSWER", C.red, "end", 15) + t(200, 204, "STALLS AT EACH BORDER", C.red, null, 14)) +
          H("fh2", fig(200, 270, 1.2, C.plum, { hair: "long", badge: C.sun }) + t(300, 290, "OWNER?", C.plum, null, 16)),
        sh: { fh0: [23, 26], fh1: [24, 25], fh2: [26, 26] } },
      // template: Dribbble — Creative Design Workflow Animation (parts assemble into one product) — https://dribbble.com/shots/27476599-Creative-Design-Workflow-Animation
      { a: 27, d: bgc("#f1eef5") + ban("YOUR FORUM", C.plum, 26) +
          [["1", "POST YOUR ANSWER", "BEFORE READING"], ["2", "REPLY TO TWO+", "CLASSMATES"], ["3", "DISAGREE WITH ONE", "GIVE A REASON"]].map(function (s, j) { var y = 56 + j * 74; return H("fi" + j, bx(10, y, 380, 64, WH, C.plum) + O(40, y + 32, 18, C.plum) + T(40, y + 39, s[0], 18, WH) + t(70, y + 28, s[1], C.ink, "start", 18) + t(70, y + 52, s[2], C.slate, "start", 15)); }).join("") +
          H("fi3", ban("DISAGREE TO LEARN", C.green, 286)),
        sh: { fi0: [27, 30], fi1: [28, 30], fi2: [29, 30], fi3: [30, 30] } },
      // template: Apple HIG Motion — controlled focus pull (subdue context, sharpen one object) — https://developer.apple.com/design/human-interface-guidelines/motion
      { a: 31, d: bgc("#14263a") + fig(200, 250, 1.7, C.orange, { hair: "long" }) +
          H("fj0", ban("KEEP HER IN MIND", C.sun, 40, C.ink)) + H("fj1", ban("NEXT: WHY START BPM?", C.navy2, 40)) +
          H("fj2", t(200, 100, "THE OUTCOME", C.sun, null, 24) + t(200, 134, "THE CUSTOMER GETS", C.white, null, 18)) + H("fj3", ban("OPER621", C.sun, 40, C.ink)),
        sh: { fj0: [31, 31], fj1: [32, 32], fj2: [33, 34], fj3: [34, 34] } }
    ], ["Back to that evening", "After a delayed flight", "Three problems", "Targets met, 4/10", "A new view",
      "A business process", "Reception to room", "Across departments", "Good reports, bad night", "Manage the journey",
      "An owner with authority", "Owner needs power", "Keep managing", "BPI vs BPM", "How mature?",
      "Foundations first", "The framework", "Not looking good", "The whole process", "A similar problem",
      "Al Madar Logistics", "Six departments, KPIs met", "Nineteen days", "Sound familiar?", "Between departments",
      "Responsibility and measure", "What would ownership change?", "Post your answer first", "Reply to two", "Disagree with reasons",
      "Disagree to learn", "Keep her in mind", "Next week", "The customer's outcome", "Carry it into OPER621"],
      "Week 1 recap: the traveller's 23 minutes, passport twice and unready room, the process from reception to room, an owner with authority, BPI versus BPM, maturity and the framework, then the Al Madar forum case and how to post.", "#13263b");
  })();

addStyles(SCENE_BG);
})();
