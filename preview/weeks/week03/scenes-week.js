// FILE w03-claude-v2-part1.js
// OPER621 · Week 3 · Animated teaching scenes, version 2 · part 1 of 3 (W3O1a, W3O1b, W3O2a)
// Contract: window.VL_SCENES[secId] = { build(el), step(i, n), reset() }; step(i) shows narration line i of the section.
// CSS lives in one <style id="vl-sc-w03">; every rule is scoped under .vls-w03-<secId>. Standalone: defines every helper it uses.
(function () {
  "use strict";
  // ---------- environment ----------
  // Motion uses CSS transitions and keyframes only (no layout reads, no per-step redraw);
  // window.gsap is not required. prefers-reduced-motion switches every animation off.
  var W = window, DOC = W.document;
  W.VL_SCENES = W.VL_SCENES || {};
  var SID = "vl-sc-w03";
  var C = {
    ink: "#14213d", navy: "#1f4e79", teal: "#16867a", mint: "#d6f2ea", coral: "#e0552b", peach: "#fde4d8",
    amber: "#d98a0b", sun: "#fff2c6", plum: "#6a4c93", lilac: "#ebe2f7", sky: "#3f86cf", ice: "#e3effb",
    green: "#2c8c55", pale: "#e0f4e7", red: "#c62f2f", rose: "#fbe1e1", slate: "#56677a", grey: "#a9b6c3",
    mist: "#edf1f5", white: "#ffffff", paper: "#fbf8f2", sand: "#f3ead6", skin: "#e9b98f"
  };

  // ---------- SVG string helpers (absolute coordinates; no wrapper transforms on animated groups) ----------
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function est(t, z) { return String(t).length * z * 0.56; }
  function T(x, y, s, z, c, a, w, ex) {
    z = z || 16; a = a || "middle";
    if (W.__vlw03T) W.__vlw03T.push([x, y, String(s).length, z, a, String(s)]);
    return '<text x="' + x + '" y="' + y + '" font-size="' + z + '" font-weight="' + (w || 800) + '" fill="' + (c || C.ink) +
      '" text-anchor="' + a + '"' + (ex || "") + ">" + esc(s) + "</text>";
  }
  function TL(x, y, arr, z, c, lh, a, w) { var o = ""; for (var i = 0; i < arr.length; i++) o += T(x, y + i * (lh || z * 1.2), arr[i], z, c, a, w); return o; }
  function R(x, y, w, h, f, rx, st, sw, ex) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx == null ? 8 : rx) + '" fill="' + (f || "none") + '"' +
      (st ? ' stroke="' + st + '" stroke-width="' + (sw || 2) + '"' : "") + (ex || "") + "/>";
  }
  function O(cx, cy, r, f, st, sw, ex) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (f || "none") + '"' + (st ? ' stroke="' + st + '" stroke-width="' + (sw || 2) + '"' : "") + (ex || "") + "/>";
  }
  function L(x1, y1, x2, y2, c, w, ex) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (c || C.ink) + '" stroke-width="' + (w || 2) + '" stroke-linecap="round"' + (ex || "") + "/>";
  }
  function P(d, c, w, f, ex) {
    return '<path d="' + d + '" fill="' + (f || "none") + '" stroke="' + (c || "none") + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + (ex || "") + "/>";
  }
  // drawable path: strokes itself in when its stage appears
  function DP(d, c, w) { return P(d, c, w, "none", ' class="dr" pathLength="1"'); }
  // staged group: visible from stage a (to stage e when given)
  function S(a, inner, e) { return '<g class="st" data-s="' + a + '"' + (e != null ? ' data-e="' + e + '"' : "") + ">" + inner + "</g>"; }
  // highlight group: pulses when a frame names its key
  function H(k, inner) { return '<g class="hk" data-h="' + k + '">' + inner + "</g>"; }
  // looping CSS motion
  function MV(dx, dy, dur, inner, delay) {
    return '<g class="mv" style="--dx:' + dx + "px;--dy:" + dy + "px;animation-duration:" + (dur || 2.4) + "s" + (delay ? ";animation-delay:" + delay + "s" : "") + '">' + inner + "</g>";
  }
  function CL(cls, inner) { return '<g class="' + cls + '">' + inner + "</g>"; }
  function SPIN(cx, cy, inner, dur) { return '<g class="sp" style="transform-origin:' + cx + "px " + cy + "px" + (dur ? ";animation-duration:" + dur + "s" : "") + '">' + inner + "</g>"; }
  function arrow(x1, y1, x2, y2, c, w, cls) {
    c = c || C.ink; w = w || 3;
    var a = Math.atan2(y2 - y1, x2 - x1), h = 7 + w * 2, bx = x2 - Math.cos(a) * h * 0.8, by = y2 - Math.sin(a) * h * 0.8;
    var p1x = x2 - Math.cos(a) * h + Math.sin(a) * h * 0.55, p1y = y2 - Math.sin(a) * h - Math.cos(a) * h * 0.55;
    var p2x = x2 - Math.cos(a) * h - Math.sin(a) * h * 0.55, p2y = y2 - Math.sin(a) * h + Math.cos(a) * h * 0.55;
    var f = function (n) { return Math.round(n * 10) / 10; };
    return L(x1, y1, f(bx), f(by), c, w, cls ? ' class="' + cls + '"' : "") + '<path d="M' + f(x2) + " " + f(y2) + " L" + f(p1x) + " " + f(p1y) + " L" + f(p2x) + " " + f(p2y) + ' Z" fill="' + c + '"/>';
  }
  function card(x, y, w, h, t, f, st, tc, z) {
    z = z || 16; var lines = Array.isArray(t) ? t : [t], lh = z * 1.18, y0 = y + h / 2 - (lines.length - 1) * lh / 2 + z * 0.36;
    return R(x, y, w, h, f || C.white, 10, st || C.ink, 2.5) + TL(x + w / 2, y0, lines, z, tc || C.ink, lh);
  }
  function pill(cx, cy, t, f, tc, z) {
    z = z || 15; var w = Math.round(est(t, z) + 22);
    return R(cx - w / 2, cy - z * 0.95, w, Math.round(z * 1.9), f || C.ink, Math.round(z * 0.95)) + T(cx, cy + z * 0.36, t, z, tc || C.white);
  }
  function person(x, y, c, s, mood) {
    s = s || 1; c = c || C.navy;
    var r = 9 * s, o = O(x, y, r, C.skin) + P("M" + (x - r) + " " + (y - r * 0.2) + " Q" + x + " " + (y - r * 1.5) + " " + (x + r) + " " + (y - r * 0.2), c, 3 * s) +
      P("M" + (x - 14 * s) + " " + (y + 34 * s) + " Q" + (x - 14 * s) + " " + (y + 12 * s) + " " + x + " " + (y + 12 * s) + " Q" + (x + 14 * s) + " " + (y + 12 * s) + " " + (x + 14 * s) + " " + (y + 34 * s) + " Z", "none", 0, c);
    if (mood) {
      o += O(x - 3 * s, y - 1 * s, 1.3 * s, C.ink) + O(x + 3 * s, y - 1 * s, 1.3 * s, C.ink);
      o += mood === "sad" ? P("M" + (x - 3.5 * s) + " " + (y + 5 * s) + " Q" + x + " " + (y + 2 * s) + " " + (x + 3.5 * s) + " " + (y + 5 * s), C.ink, 1.4 * s)
        : mood === "flat" ? L(x - 3 * s, y + 4 * s, x + 3 * s, y + 4 * s, C.ink, 1.4 * s)
        : P("M" + (x - 3.5 * s) + " " + (y + 3 * s) + " Q" + x + " " + (y + 6.5 * s) + " " + (x + 3.5 * s) + " " + (y + 3 * s), C.ink, 1.4 * s);
    }
    return o;
  }
  function guest(x, y, s, mood) {
    s = s || 1;
    return person(x, y, C.plum, s, mood || "sad") + R(x + 15 * s, y + 18 * s, 13 * s, 17 * s, C.amber, 3 * s, C.ink, 1.5) + P("M" + (x + 18 * s) + " " + (y + 18 * s) + " v-4 h7 v4", C.ink, 1.5 * s);
  }
  function clock(x, y, r, c, spin) {
    c = c || C.coral;
    var hand = L(x, y, x, y - r * 0.72, c, 3);
    return O(x, y, r, C.white, c, 3) + L(x, y, x + r * 0.45, y, C.ink, 3) + (spin ? SPIN(x, y, hand, 3) : hand) + O(x, y, 2.5, C.ink);
  }
  function tick(x, y, c, s) { s = s || 1; return P("M" + (x - 9 * s) + " " + y + " l" + 6 * s + " " + 7 * s + " l" + 12 * s + " " + (-15 * s), c || C.green, 4 * s); }
  function cross(x, y, c, s) { s = s || 1; var k = 7 * s; return P("M" + (x - k) + " " + (y - k) + " L" + (x + k) + " " + (y + k) + " M" + (x + k) + " " + (y - k) + " L" + (x - k) + " " + (y + k), c || C.red, 4 * s); }
  function badge(x, y, ok, s) { s = s || 1; return O(x, y, 12 * s, ok ? C.green : C.red) + (ok ? tick(x + 1 * s, y + 1 * s, C.white, 0.8 * s) : cross(x, y, C.white, 0.75 * s)); }
  function phone(x, y, w, h, f) { return R(x, y, w, h, C.ink, 14) + R(x + 6, y + 16, w - 12, h - 30, f || C.white, 6) + R(x + w / 2 - 12, y + 6, 24, 4, C.slate, 2); }
  function monitor(x, y, w, h, f) { return R(x, y, w, h, C.ink, 8) + R(x + 6, y + 6, w - 12, h - 12, f || C.white, 4) + R(x + w / 2 - 8, y + h, 16, 10, C.slate, 0) + R(x + w / 2 - 26, y + h + 9, 52, 6, C.slate, 3); }
  function db(x, y, w, h, f, label, z) {
    var ry = 8;
    return P("M" + x + " " + (y + ry) + " v" + (h - 2 * ry) + " a" + w / 2 + " " + ry + " 0 0 0 " + w + " 0 v" + (-(h - 2 * ry)), C.ink, 2.5, f || C.ice) +
      '<ellipse cx="' + (x + w / 2) + '" cy="' + (y + ry) + '" rx="' + w / 2 + '" ry="' + ry + '" fill="' + C.white + '" stroke="' + C.ink + '" stroke-width="2.5"/>' +
      (label ? T(x + w / 2, y + h / 2 + 10, label, z || 14, C.ink) : "");
  }
  function doc(x, y, w, h, f, n) {
    var o = P("M" + x + " " + y + " h" + (w - 14) + " l14 14 v" + (h - 14) + " h" + (-w) + " Z", C.ink, 2.5, f || C.white);
    for (var i = 0; i < (n || 4); i++) o += L(x + 10, y + 24 + i * 12, x + w - 12, y + 24 + i * 12, C.grey, 3);
    return o;
  }
  function gear(x, y, r, f) {
    var d = "", n = 8;
    for (var i = 0; i < n * 2; i++) { var a = i * Math.PI / n, rr = i % 2 ? r * 0.78 : r; d += (i ? " L" : "M") + Math.round((x + Math.cos(a) * rr) * 10) / 10 + " " + Math.round((y + Math.sin(a) * rr) * 10) / 10; }
    return P(d + " Z", C.ink, 2, f || C.grey) + O(x, y, r * 0.32, C.white, C.ink, 2);
  }
  function hotel(x, y, w, h) {
    var o = R(x, y, w, h, C.sand, 4, C.ink, 2.5) + R(x - 6, y - 10, w + 12, 12, C.navy, 3);
    for (var r = 0; r < 3; r++) for (var c = 0; c < 4; c++) o += R(x + 10 + c * (w - 20) / 4, y + 12 + r * 22, (w - 20) / 4 - 8, 13, C.sky, 2);
    return o + R(x + w / 2 - 12, y + h - 26, 24, 26, C.amber, 3, C.ink, 2);
  }
  function hosp(x, y, s) {
    s = s || 1;
    return R(x - 26 * s, y - 30 * s, 52 * s, 42 * s, C.white, 4, C.ink, 2) + R(x - 5 * s, y - 24 * s, 10 * s, 24 * s, C.red, 1) + R(x - 12 * s, y - 17 * s, 24 * s, 10 * s, C.red, 1);
  }
  function lock(x, y, c) { c = c || C.ink; return P("M" + (x - 8) + " " + y + " v-8 a8 8 0 0 1 16 0 v8", c, 3) + R(x - 12, y, 24, 18, c, 3); }
  function mag(x, y, r, c) { c = c || C.ink; return O(x, y, r, "rgba(255,255,255,.55)", c, 4) + L(x + r * 0.72, y + r * 0.72, x + r * 1.6, y + r * 1.6, c, 6); }
  function warn(x, y, s, c) { s = s || 1; c = c || C.amber; return P("M" + x + " " + (y - 16 * s) + " L" + (x + 18 * s) + " " + (y + 14 * s) + " L" + (x - 18 * s) + " " + (y + 14 * s) + " Z", C.ink, 2, c) + T(x, y + 10 * s, "!", 18 * s, C.ink); }
  function flag(x, y, c) { return L(x, y, x, y - 40, C.ink, 3) + P("M" + x + " " + (y - 40) + " h26 l-6 8 l6 8 h-26 Z", "none", 0, c || C.coral); }
  function bubble(x, y, w, h, t, f, z, tail) {
    tail = tail == null ? -1 : tail;
    return R(x, y, w, h, f || C.white, 14, C.ink, 2) + P("M" + (x + w / 2 - 10) + " " + (y + h - 1) + " l" + (tail * 14 + 10) + " 16 l4 -16", C.ink, 2, f || C.white) +
      R(x + w / 2 - 12, y + h - 4, 26, 6, f || C.white, 0) + TL(x + w / 2, y + h / 2 + (z || 15) * 0.36 - ((Array.isArray(t) ? t.length : 1) - 1) * (z || 15) * 0.6, Array.isArray(t) ? t : [t], z || 15);
  }
  function bg(c1, c2) {
    return R(0, 0, 400, 300, c1 || C.paper, 0) + '<g opacity=".5">' + L(0, 284, 400, 284, c2 || C.sand, 2) + "</g>";
  }
  function stamp(x, y, t, c, z, rot) {
    z = z || 18; var w = Math.round(est(t, z) + 24);
    return '<g transform="rotate(' + (rot == null ? -8 : rot) + " " + x + " " + y + ')">' + R(x - w / 2, y - z, w, z * 1.9, "rgba(255,255,255,.85)", 6, c || C.red, 3.5) +
      '<text x="' + x + '" y="' + (y + z * 0.36) + '" font-size="' + z + '" font-weight="900" fill="' + (c || C.red) + '" text-anchor="middle" letter-spacing="1">' + esc(t) + "</text></g>";
  }

  // ---------- one shared <style id="vl-sc-w03">, every rule scoped under .vls-w03-<secId> ----------
  var KF = "@keyframes vlw03fade{from{opacity:0}to{opacity:1}}" +
    "@keyframes vlw03in{0%{transform:scale(.82) translateY(6px)}60%{transform:scale(1.05)}100%{transform:none}}" +
    "@keyframes vlw03draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}" +
    "@keyframes vlw03gx{from{transform:scaleX(0)}to{transform:none}}" +
    "@keyframes vlw03gy{from{transform:scaleY(0)}to{transform:none}}" +
    "@keyframes vlw03mv{0%{transform:translate(0,0);opacity:0}12%{opacity:1}82%{opacity:1}100%{transform:translate(var(--dx),var(--dy));opacity:0}}" +
    "@keyframes vlw03fl{to{stroke-dashoffset:-28}}" +
    "@keyframes vlw03pl{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}" +
    "@keyframes vlw03bk{0%,100%{opacity:1}50%{opacity:.3}}" +
    "@keyframes vlw03sh{0%,100%{transform:translateX(0)}25%{transform:translateX(-2px)}75%{transform:translateX(2px)}}" +
    "@keyframes vlw03sp{to{transform:rotate(360deg)}}" +
    "@keyframes vlw03fd{0%,30%{opacity:1}100%{opacity:.18}}";
  function css(sc) {
    var r = [
      "&{position:relative;display:flex;flex-direction:column;width:100%;height:100%;min-height:0;overflow:hidden;box-sizing:border-box;border-radius:14px;background:" + C.paper + ";color:" + C.ink + ";font-family:inherit}",
      "& *{box-sizing:border-box}",
      "& .vx-hd{flex:0 0 auto;display:flex;align-items:center;gap:10px;padding:8px 12px 4px;min-height:34px}",
      "& .vx-chip{flex:0 1 auto;max-width:86%;padding:5px 12px;border-radius:999px;font-size:14px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#fff;background:var(--vx-chip)}",
      "& .vx-pg{flex:1 1 auto;min-width:20px;height:5px;border-radius:3px;background:rgba(20,33,61,.12);overflow:hidden}",
      "& .vx-pgb{display:block;height:100%;width:0;border-radius:3px;background:var(--vx-bar);transition:width .5s ease}",
      "& .vx-svg{flex:1 1 0;display:block;width:100%;height:100%;min-height:150px}",
      "& .vx-svg text{font-family:inherit;pointer-events:none}",
      "& .vp{display:none}",
      "& .vp.on{display:inline;animation:vlw03fade .45s ease-out}",
      "& .st{opacity:0;transition:opacity .45s ease;transform-box:fill-box;transform-origin:50% 50%}",
      "& .st.on{opacity:1}",
      "& .st.nw{animation:vlw03in .6s cubic-bezier(.3,1.4,.5,1)}",
      "& .st .dr{stroke-dasharray:1 1;stroke-dashoffset:0}",
      "& .st.nw .dr{animation:vlw03draw 1.1s ease-out}",
      "& .st.nw .gx{transform-box:fill-box;transform-origin:0 50%;animation:vlw03gx .9s ease-out}",
      "& .st.nw .gy{transform-box:fill-box;transform-origin:50% 100%;animation:vlw03gy .9s ease-out}",
      "& .mv{animation:vlw03mv 2.4s ease-in-out infinite}",
      "& .fl{stroke-dasharray:7 7;animation:vlw03fl 1s linear infinite}",
      "& .pl{transform-box:fill-box;transform-origin:50% 50%;animation:vlw03pl 1.6s ease-in-out infinite}",
      "& .bk{animation:vlw03bk 1.3s ease-in-out infinite}",
      "& .sh{animation:vlw03sh .4s linear infinite}",
      "& .sp{transform-box:view-box;animation:vlw03sp 4s linear infinite}",
      "& .st.nw .fd{animation:vlw03fd 2.6s ease-in forwards}",
      "& .hk{transform-box:fill-box;transform-origin:50% 50%}",
      "& .hk.hl{animation:vlw03pl 1.2s ease-in-out infinite}",
      "& .hk.hl rect{stroke:" + C.coral + ";stroke-width:4}",
      "&.vx-inst .st,&.vx-inst .vx-pgb{transition:none!important}",
      "@media (max-width:420px){& .vx-chip{font-size:12.5px;letter-spacing:.02em;padding:4px 10px}& .vx-hd{padding:6px 10px 3px}}",
      "@media (prefers-reduced-motion:reduce){& *,& *::before,& *::after{animation:none!important;transition:none!important}}"
    ];
    return r.map(function (x) { return x.split("&").join(sc); }).join("\n");
  }
  function installCss(id) {
    if (!DOC || !DOC.head) return;
    var st = DOC.getElementById(SID);
    if (!st) { st = DOC.createElement("style"); st.id = SID; DOC.head.appendChild(st); }
    var txt = st.textContent || "";
    if (txt.indexOf("vlw03fade") < 0) txt += KF + "\n";
    var mark = "/* .vls-w03-" + id + " */";
    if (txt.indexOf(mark) < 0) txt += mark + "\n" + css(".vls-w03-" + id) + "\n";
    if (txt !== st.textContent) st.textContent = txt;
  }

  // ---------- scene engine ----------
  // def.visuals[v]() returns one SVG composition; def.frames[i] = [visual, stage, chip, highlightKey?] for narration line i.
  function scene(id, def) {
    var N = def.frames.length, root = null, chip = null, bar = null, vps = [], sts = [], hks = [], cv = -1, idx = -1, hl = [];
    function apply(i, inst) {
      var f = def.frames[i], v = f[0], s = f[1], k, e, show;
      root.classList.toggle("vx-inst", !!inst);
      if (v !== cv) { if (cv >= 0) vps[cv].classList.remove("on"); vps[v].classList.add("on"); cv = v; }
      var list = sts[v];
      for (k = 0; k < list.length; k++) {
        e = list[k]; show = s >= e.a && (e.e < 0 || s <= e.e);
        if (show !== e.on) { e.on = show; e.n.classList.toggle("on", show); if (show && !inst) e.n.classList.add("nw"); else e.n.classList.remove("nw"); }
      }
      for (k = 0; k < hl.length; k++) hl[k].classList.remove("hl");
      hl = f[3] && hks[v][f[3]] ? hks[v][f[3]] : [];
      for (k = 0; k < hl.length; k++) hl[k].classList.add("hl");
      chip.textContent = f[2];
      bar.style.width = Math.round(((i + 1) / N) * 1000) / 10 + "%";
      idx = i;
    }
    W.VL_SCENES[id] = {
      build: function (el) {
        if (!el || !DOC) return;
        installCss(id);
        root = DOC.createElement("div");
        root.className = "vls-w03 vls-w03-" + id;
        root.style.setProperty("--vx-chip", def.chip || C.navy);
        root.style.setProperty("--vx-bar", def.bar || C.coral);
        var svg = "";
        for (var v = 0; v < def.visuals.length; v++) svg += '<g class="vp" data-v="' + v + '">' + def.visuals[v]() + "</g>";
        root.innerHTML = '<div class="vx-hd"><span class="vx-chip" aria-live="polite"></span><span class="vx-pg" aria-hidden="true"><span class="vx-pgb"></span></span></div>' +
          '<svg class="vx-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(def.aria || id) + '">' + bg(def.bg) + svg + "</svg>";
        if (typeof el.replaceChildren === "function") el.replaceChildren(root); else { el.innerHTML = ""; el.appendChild(root); }
        chip = root.querySelector(".vx-chip"); bar = root.querySelector(".vx-pgb");
        vps = Array.prototype.slice.call(root.querySelectorAll(".vp"));
        sts = []; hks = []; cv = -1; idx = -1; hl = [];
        for (var j = 0; j < vps.length; j++) {
          sts.push(Array.prototype.map.call(vps[j].querySelectorAll(".st"), function (n) {
            var e = n.getAttribute("data-e");
            return { n: n, a: +n.getAttribute("data-s"), e: e == null ? -1 : +e, on: false };
          }));
          var hm = {};
          Array.prototype.forEach.call(vps[j].querySelectorAll(".hk"), function (n) { var k = n.getAttribute("data-h"); (hm[k] = hm[k] || []).push(n); });
          hks.push(hm);
        }
        apply(0, true);
      },
      step: function (i, n) {
        if (!root) return;
        var nn = isFinite(+n) && +n > 0 ? Math.floor(+n) : N, ii = isFinite(+i) ? Math.floor(+i) : 0;
        ii = Math.max(0, Math.min(nn - 1, ii));
        if (nn !== N) ii = Math.round((ii * (N - 1)) / Math.max(1, nn - 1));
        ii = Math.max(0, Math.min(N - 1, ii));
        if (ii === idx) return;
        apply(ii, false);
      },
      reset: function () { if (root) apply(0, true); }
    };
  }

  // ===================== W3O1a · A powerful tool, but whose process? (32 lines, 10 visuals) =====================
  scene("W3O1a", {
    aria: "Qasr Marina: why the process must be understood before buying BPM technology",
    chip: C.navy, bar: C.coral,
    frames: [
      [0, 0, "Week 3 · Qasr Marina"],
      [1, 0, "Busy staff, waiting guest"], [1, 1, "Her record is split"], [1, 2, "GM: buy technology"],
      [2, 0, "The vendor demo"], [2, 1, "Everyone is excited"], [2, 2, "Pause before buying"],
      [3, 0, "The real cause"], [3, 1, "Faster, still broken"],
      [4, 0, "BPM, in full"], [4, 1, "BPM: a discipline"], [4, 2, "BPMS: the software"], [4, 3, "Runs and watches work"], [4, 4, "People still decide"],
      [5, 0, "Retyping guest details"], [5, 1, "Automated duplication"], [5, 2, "Breaks faster, hidden"], [5, 3, "Speed, not experience"],
      [6, 0, "Understand before tech"], [6, 1, "Understand, then Innovate"], [6, 2, "Tech enters at Develop"], [6, 3, "Usually: tech first"], [6, 4, "Tool model takes over"],
      [7, 0, "Undecided: corporate rate"], [7, 1, "The vendor designs it"],
      [8, 0, "Noor's suite licence"], [8, 1, "91 models, no clinicians"], [8, 2, "Manual vs ward reality"], [8, 3, "Documented = understood?"],
      [9, 0, "Technology needs a base"], [9, 1, "Shiny screen, old problems"], [9, 2, "Next: inside the suite"]
    ],
    visuals: [
      // V0 · line 0 · the hotel we follow all week
      // template: Outline - Explainer Kit — https://motionarray.com/after-effects-templates/outline-explainer-kit-36706/
      function () {
        return S(0, hotel(140, 62, 120, 120) + P("M20 212 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0", C.sky, 3) +
          T(200, 244, "Qasr Marina", 24) + pill(200, 274, "Week 3 · BPM technology", C.navy, C.white, 15));
      },
      // V1 · lines 1-3 · everyone busy, her booking split across departments, the GM's idea
      // template: Supply Chain Animation — https://www.behance.net/gallery/121206799/Supply-Chain-Animation
      function () {
        var o = "", d = [["Booking", 40, "Name"], ["Revenue", 110, "Rate"], ["Rooms", 180, "Room"]], k;
        for (k = 0; k < 3; k++) o += card(220, d[k][1], 160, 52, d[k][0], C.white, C.navy, C.ink, 17) + person(240, d[k][1] + 14, C.teal, 0.62) + tick(358, d[k][1] + 27, C.green, 0.8);
        var parts = "";
        for (k = 0; k < 3; k++) parts += DP("M112 " + (166 + k * 5) + " L218 " + (d[k][1] + 26), C.red, 2.5) + pill(165, 118 + k * 37, d[k][2], C.rose, C.red, 14);
        return S(0, guest(70, 150, 1.3) + clock(70, 92, 20, C.coral, true) + T(70, 230, "Waiting", 16, C.coral) + T(300, 28, "Everyone is busy", 15, C.slate) + o) +
          S(1, parts + T(72, 262, "Record split in 3", 14, C.red) + pill(300, 262, "Room not ready", C.red), 1) +
          S(2, bubble(92, 34, 124, 62, ["Technology", "will fix it!"], C.sun, 15) + person(160, 150, C.ink, 1.2, "happy") + T(160, 248, "General manager", 14));
      },
      // V2 · lines 4-6 · the vendor's mobile check-in demo, excitement, then a pause
      // template: Product Workflow Animation & UI Motion Design — https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design
      function () {
        var rows = ["Booking", "Room 412", "Digital key"], o = "", k;
        for (k = 0; k < 3; k++) o += R(140, 70 + k * 56, 122, 42, C.mint, 8) + T(148, 96 + k * 56, rows[k], 14, C.ink, "start") + tick(250, 92 + k * 56, C.green, 0.7);
        var fans = person(42, 186, C.navy, 0.9, "happy") + person(84, 198, C.sky, 0.9, "happy") + person(316, 186, C.teal, 0.9, "happy") + person(358, 198, C.plum, 0.9, "happy");
        return S(0, phone(125, 24, 150, 246, C.white) + T(200, 58, "Check-in", 15, C.teal) + o + MV(0, 112, 2.2, O(232, 91, 10, "rgba(224,85,43,.35)")) +
            TL(62, 100, ["Mobile", "check-in"], 17) + TL(338, 100, ["Vendor", "demo"], 17, C.slate), 1) +
          S(1, CL("pl", fans) + TL(60, 262, ["Looks", "effortless"], 15) + TL(340, 262, ["Happier", "guests?"], 15, C.green), 1) +
          S(2, O(200, 110, 50, C.navy) + R(181, 86, 13, 48, C.white, 3) + R(206, 86, 13, 48, C.white, 3) + T(200, 200, "Pause first", 28, C.navy) +
            T(200, 234, "Excitement is not a decision", 16, C.coral) + doc(170, 248, 60, 40, C.white, 1) + T(250, 274, "Sign?", 15, C.slate, "start"));
      },
      // V3 · lines 7-8 · the cause is broken connections; a faster screen keeps them broken
      // template: Workflow Animation — https://dribbble.com/shots/3791748-Workflow-Animation
      function () {
        return S(0, L(150, 61, 250, 61, C.navy, 3, ' class="fl"') + L(86, 88, 170, 204, C.navy, 3, ' class="fl"') + L(314, 88, 230, 204, C.navy, 3, ' class="fl"') +
            card(24, 36, 124, 50, "Booking", C.ice, C.navy, C.ink, 17) + card(252, 36, 124, 50, "Revenue", C.ice, C.navy, C.ink, 17) + card(138, 206, 124, 50, "Rooms", C.ice, C.navy, C.ink, 17) +
            badge(200, 61, false) + badge(128, 146, false) + badge(272, 146, false) + guest(200, 108, 1, "sad")) +
          S(0, T(200, 290, "Information is not shared", 16, C.red), 0) +
          S(1, phone(320, 150, 56, 100, C.ice) + CL("sh", L(300, 170, 312, 170, C.amber, 3) + L(296, 186, 312, 186, C.amber, 3) + L(300, 202, 312, 202, C.amber, 3)) +
            T(348, 272, "Faster", 15, C.amber) + T(200, 290, "Faster screen, same broken links", 15, C.red));
      },
      // V4 · lines 9-13 · BPM is a management discipline; BPMS is the supporting software; people still decide
      // template: Motion Graphics: Design Thinking Process — https://www.behance.net/gallery/108659899/Motion-Graphics-Design-Thinking-Process
      function () {
        var flow = R(252, 114, 26, 22, C.white, 4, C.teal, 2) + R(287, 114, 26, 22, C.white, 4, C.teal, 2) + R(322, 114, 26, 22, C.white, 4, C.teal, 2) +
          L(278, 125, 287, 125, C.teal, 2) + L(313, 125, 322, 125, C.teal, 2);
        return S(0, T(200, 118, "BPM", 72, C.navy, "middle", 900) + T(200, 162, "Business Process Management", 18) + T(200, 194, "a way of managing work", 15, C.slate), 0) +
          S(1, T(100, 44, "BPM", 32, C.navy, "middle", 900) + T(100, 66, "a discipline", 15, C.slate) +
            O(100, 146, 50, "none", C.navy, 3, ' stroke-dasharray="6 6"') + SPIN(100, 146, O(100, 96, 7, C.amber), 5) + person(100, 136, C.navy, 0.85) +
            pill(100, 96, "Run", C.navy) + pill(150, 184, "Measure", C.teal) + pill(50, 184, "Improve", C.coral)) +
          S(1, T(100, 250, "Ongoing ownership", 15), 3) +
          S(2, T(300, 44, "BPMS", 32, C.teal, "middle", 900) + T(300, 66, "the software suite", 15, C.slate) + monitor(240, 86, 120, 84, C.ice) + flow +
            arrow(160, 128, 232, 128, C.slate, 2.5) + T(196, 118, "supports", 14, C.slate)) +
          S(3, MV(70, 0, 1.6, O(265, 125, 5, C.coral)) + T(300, 226, "Runs the work", 15) + T(300, 250, "Watches progress", 15), 3) +
          S(4, card(16, 198, 178, 62, ["Which outcome", "matters most?"], C.sun, C.amber, C.ink, 16) + card(206, 198, 178, 62, ["Which steps", "should go?"], C.sun, C.amber, C.ink, 16) +
            badge(362, 92, false, 0.9) + T(200, 288, "People decide this, not software", 15, C.red));
      },
      // V5 · lines 14-17 · the receptionist retypes; automation keeps the duplicate; speed without a better stay
      // template: Data Workflow Animation — https://dribbble.com/shots/27247003-Data-Workflow-Animation
      function () {
        var token = R(72, 30, 22, 26, C.white, 3, C.ink, 1.5) + L(77, 39, 89, 39, C.grey, 2) + L(77, 46, 89, 46, C.grey, 2);
        return S(0, db(16, 50, 116, 90, C.ice, "Reservations", 15) + db(268, 50, 116, 90, C.peach, "Revenue", 15) + R(140, 158, 120, 14, C.navy, 3)) +
          S(0, person(200, 120, C.teal, 1, "flat") + R(176, 146, 48, 10, C.slate, 2) + arrow(134, 92, 176, 116, C.navy, 2.5) + arrow(224, 116, 266, 92, C.navy, 2.5) +
            MV(250, 0, 2.8, token) + T(200, 206, "Same details typed twice", 17), 0) +
          S(1, SPIN(200, 114, gear(200, 114, 26, C.amber), 1.4) + arrow(134, 92, 170, 108, C.amber, 2.5) + arrow(230, 108, 266, 92, C.amber, 2.5) + MV(250, 0, 0.9, token), 1) +
          S(1, T(200, 206, "Automated, still typed twice", 17) + pill(200, 240, "Duplicate kept", C.red), 1) +
          S(2, R(138, 70, 124, 84, C.ink, 8) + R(144, 76, 112, 72, C.pale, 4) + T(200, 108, "All fine", 17, C.green) + tick(200, 130, C.green, 0.9) +
            R(150, 160, 100, 34, C.rose, 6, C.red, 1.5) + MV(80, 0, 0.8, O(158, 177, 5, C.red)) + MV(80, 0, 0.8, O(158, 177, 5, C.red), 0.4) +
            T(200, 220, "Breaks faster, less visible", 16, C.red)) +
          S(3, guest(46, 192, 0.9) + T(62, 278, "Still waiting", 14, C.coral) + R(305, 165, 86, 108, C.white, 6, C.ink, 2) + T(348, 188, "Receipt", 14, C.slate) +
            T(334, 222, "Speed", 15) + badge(374, 217, true, 0.7) + T(334, 256, "Stay", 15) + badge(374, 251, false, 0.7));
      },
      // V6 · lines 18-22 · the course framework: Understand and Innovate first, technology at Develop (phase 7)
      // template: Design process timeline - Animation — https://dribbble.com/shots/9892691-Design-process-timeline-Animation
      function () {
        var o = L(36, 120, 365, 120, C.grey, 4), k, x;
        for (k = 0; k < 10; k++) { x = 36 + k * 36.5; o += O(x, 120, 15, C.white, C.navy, 3) + T(x, 126, String(k + 1), 16, C.navy); }
        var hi = function (k, c) { var x = 36 + k * 36.5; return O(x, 120, 15, c) + T(x, 126, String(k + 1), 16, C.white); };
        var laptop = function (x, c) { return R(x - 15, 58, 30, 20, c, 3) + R(x - 21, 78, 42, 5, C.ink, 2) + arrow(x, 86, x, 102, c, 2.5); };
        return S(0, T(200, 36, "Understand first, technology later", 17) + o) +
          S(1, hi(3, C.teal) + hi(4, C.plum) + T(145.5, 160, "Understand", 16, C.teal) + T(145.5, 180, "today's work", 14, C.slate) +
            T(182, 88, "Innovate", 16, C.plum) + T(182, 68, "better design", 14, C.slate)) +
          S(2, hi(6, C.green) + laptop(255, C.green) + T(255, 160, "7 Develop", 16, C.green) + T(262, 180, "Tech enters here", 14, C.green)) +
          S(3, hi(0, C.red) + laptop(36, C.red) + T(14, 204, "1 Strategy", 16, C.red, "start")) +
          S(3, T(220, 236, "Usually, tech comes first", 16, C.red), 3) +
          S(4, card(16, 216, 150, 56, ["Tool's", "built-in model"], C.peach, C.coral, C.ink, 15) + arrow(170, 244, 226, 244, C.coral, 3) +
            card(232, 216, 152, 56, "Future process", C.white, C.ink, C.ink, 16) + stamp(308, 212, "Nobody decided", C.red, 15));
      },
      // V7 · lines 23-24 · an undecided corporate-rate step gets designed by the vendor
      // template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
      function () {
        return S(0, card(30, 24, 340, 70, ["How is the corporate rate", "confirmed at check-in?"], C.sun, C.amber, C.ink, 17) +
            monitor(40, 128, 120, 80, C.pale) + tick(100, 168, C.green, 1.3) + pill(100, 262, "Suite chosen", C.green) + doc(262, 118, 96, 120, C.white, 0)) +
          S(0, T(310, 196, "?", 54, C.amber, "middle", 900) + T(310, 270, "Not yet decided", 14, C.slate), 0) +
          S(1, R(276, 142, 68, 18, C.peach, 4, C.coral, 1.5) + R(276, 172, 68, 18, C.peach, 4, C.coral, 1.5) + R(276, 202, 68, 18, C.peach, 4, C.coral, 1.5) +
            person(205, 168, C.amber, 1, "happy") + DP("M222 176 L276 150", C.amber, 3) + T(205, 234, "Vendor", 15, C.amber) + pill(305, 270, "No accountability", C.red));
      },
      // V8 · lines 25-28 · Noor Health: licence, 91 models from a 2019 manual, written steps vs ward reality
      // template: Celonis Process Explorer map — https://help.celonis.com/cpm47/en/process-explorer
      function () {
        var h = "", k;
        for (k = 0; k < 5; k++) h += hosp(50 + k * 75, 82, 0.9);
        var stack = R(160, 176, 66, 70, C.ice, 6, C.navy, 2) + R(167, 183, 66, 70, C.ice, 6, C.navy, 2) + R(174, 190, 66, 70, C.white, 6, C.navy, 2.5) + T(207, 234, "91", 30, C.navy, "middle", 900);
        var flowL = R(24, 76, 44, 30, C.ice, 6, C.navy, 2) + R(80, 76, 44, 30, C.ice, 6, C.navy, 2) + R(136, 76, 44, 30, C.ice, 6, C.navy, 2) + arrow(68, 91, 79, 91, C.navy, 2) + arrow(124, 91, 135, 91, C.navy, 2);
        return S(0, T(200, 30, "Noor Health Group", 20, C.teal) + h + card(115, 106, 170, 46, "BPM suite licence", C.ice, C.navy, C.ink, 15), 1) +
          S(1, doc(40, 174, 70, 86, C.sand) + T(75, 286, "2019 manual", 14) + arrow(116, 216, 152, 216, C.navy, 3) + stack + T(205, 286, "91 models", 14) +
            R(290, 170, 96, 96, "none", 10, C.red, 2, ' stroke-dasharray="6 5"') + person(320, 196, C.teal, 0.8) + person(356, 196, C.teal, 0.8) +
            badge(382, 172, false, 0.8) + T(338, 286, "Clinicians", 14, C.red)) +
          S(2, R(14, 40, 180, 110, C.white, 10, C.navy, 2) + T(104, 30, "Written steps", 15, C.navy) + flowL + T(104, 138, "Neat and linear", 14, C.slate) +
            R(206, 40, 180, 110, C.white, 10, C.coral, 2) + T(296, 30, "Ward reality", 15, C.coral) +
            DP("M220 112 C245 50 268 128 292 76 S332 128 368 64", C.coral, 3) + clock(336, 104, 11, C.coral) + T(296, 138, "Waits and loops", 14, C.slate)) +
          S(3, O(200, 95, 20, C.sun, C.ink, 2) + T(200, 104, "≠", 26, C.ink) + T(200, 166, "Instructions = reality?", 17, C.red));
      },
      // V9 · lines 29-31 · technology on an understood, accepted, improving base; without it, old problems hide
      // template: Interactive Computer Assembly Sequence — https://codepen.io/karlhorning/pen/OJqNMVR
      function () {
        var base = card(18, 214, 118, 52, "Understood", C.pale, C.green, C.ink, 16) + card(141, 214, 118, 52, "Accepted", C.pale, C.green, C.ink, 16) + card(264, 214, 118, 52, "Improving", C.pale, C.green, C.ink, 16);
        var cracks = DP("M40 206 l18 16 l-8 14 l22 18", C.red, 3) + DP("M200 200 l-12 18 l14 12 l-10 22", C.red, 3) + DP("M352 206 l-16 16 l10 14 l-20 18", C.red, 3);
        var slats = "", cols = [C.plum, C.navy, C.amber, C.teal, C.coral], k;
        for (k = 0; k < 5; k++) slats += R(144, 160 + k * 17, 112, 13, cols[k], 3);
        return S(0, T(200, 40, "Technology on a solid base", 18, C.green) + base, 0) +
          S(0, monitor(140, 66, 120, 90, C.pale) + T(200, 118, "BPMS", 20, C.teal) + person(70, 146, C.navy, 1, "happy") + person(330, 146, C.teal, 1, "happy"), 1) +
          S(1, T(200, 40, "No foundation underneath", 18, C.red) + cracks + pill(110, 236, "Duplicate entry", C.rose, C.red, 14) + pill(290, 236, "Scattered data", C.rose, C.red, 14) +
            T(200, 280, "Old problems behind a new screen", 15, C.red), 1) +
          S(2, T(200, 50, "Next: open the suite", 20, C.navy) + R(130, 150, 140, 100, C.navy, 8) + slats + P("M130 150 L116 104 L262 92 L270 150", C.ink, 2.5, C.sky) +
            T(200, 280, "Five layers inside", 16));
      }
    ]
  });

  // ===================== W3O1b · Inside the suite: from drawings to real work (34 lines, 11 visuals) =====================
  (function () {
    var LC = [C.plum, C.navy, C.amber, C.teal, C.coral];
    var LN = ["Modelling", "Execution", "Rules", "Integration", "Monitoring"];
    var hdr = function (k) { return pill(200, 22, "Layer " + (k + 1) + " · " + LN[k], LC[k]); };
    scene("W3O1b", {
      aria: "The five layers of a BPM suite, each shown acting on one corporate booking at Qasr",
      chip: C.plum, bar: C.amber,
      frames: [
        [0, 0, "Opening the suite"], [0, 1, "Five layers, five jobs"],
        [1, 0, "Searching at reception"], [1, 1, "Who does what?"], [1, 2, "One shared model"], [1, 3, "As-is and to-be"],
        [2, 0, "Drawing is not doing"], [2, 1, "Workflow routes tasks"], [2, 2, "Sequence enforced"], [2, 3, "Booking to Revenue", "rev"],
        [3, 0, "A decision inside a task"], [3, 1, "Contract, dates, room"], [3, 2, "Rules outside the code"], [3, 3, "Staff update the rule"], [3, 4, "Contracts keep changing"],
        [4, 0, "Data trapped elsewhere"], [4, 1, "Integration connects"], [4, 2, "API: systems talk"],
        [5, 0, "Across systems too"], [5, 1, "Everything on one screen"],
        [6, 0, "Is it actually better?"], [6, 1, "Live dashboard"], [6, 2, "Cycle time"], [6, 3, "Exceptions flagged"],
        [7, 0, "Act today, not next month"], [7, 1, "Everyday management"], [7, 2, "Often postponed"],
        [8, 0, "Noor bought all five"], [8, 1, "Rules and dashboard idle"], [8, 2, "Bought 5, used 1"],
        [9, 0, "4.1 → 3.9, not 2.87"], [9, 1, "Did the suite deliver?"],
        [10, 0, "Describe vs run"], [10, 1, "Why do some succeed?"]
      ],
      visuals: [
        // V0 · lines 0-1 · the suite opened into its five layers
        // template: Interactive Computer Assembly Sequence — https://codepen.io/karlhorning/pen/OJqNMVR
        function () {
          var jobs = ["Pictures the work", "Routes the tasks", "Makes decisions", "Connects systems", "Watches results"], o = "", k;
          for (k = 0; k < 5; k++) o += R(40, 40 + k * 46, 320, 38, LC[k], 10) + T(56, 65 + k * 46, (k + 1) + "  " + LN[k], 17, C.white, "start") + T(344, 65 + k * 46, jobs[k], 14, C.white, "end");
          return S(0, T(200, 60, "Qasr opens the suite", 18) + R(120, 112, 160, 104, C.navy, 10) + R(112, 96, 176, 22, C.ink, 6) + T(200, 172, "BPM suite", 22, C.white) +
              person(56, 150, C.teal, 1.1, "happy") + T(56, 214, "Qasr IT", 15) + person(344, 150, C.amber, 1.1, "happy") + T(344, 214, "Vendor", 15), 0) +
            S(1, o);
        },
        // V1 · lines 2-5 · modelling: one current, shared picture of her arrival; as-is and to-be
        // template: Celonis Process Explorer map — https://help.celonis.com/cpm47/en/process-explorer
        function () {
          var dep = [[14, 48, "Reservations"], [236, 48, "Revenue"], [14, 224, "Front desk"], [236, 224, "Housekeeping"]], cards = "", lines = "", k;
          for (k = 0; k < 4; k++) {
            cards += card(dep[k][0], dep[k][1], 150, 42, dep[k][2], C.white, C.plum, C.ink, 15);
            lines += DP("M" + (dep[k][0] + 75) + " " + (dep[k][1] < 100 ? 90 : 224) + " L200 " + (dep[k][1] < 100 ? 96 : 200), C.plum, 3);
          }
          var mini = R(124, 108, 40, 24, C.lilac, 5, C.plum, 2) + R(180, 108, 40, 24, C.lilac, 5, C.plum, 2) + R(236, 108, 40, 24, C.lilac, 5, C.plum, 2) + arrow(164, 120, 179, 120, C.plum, 2) + arrow(220, 120, 235, 120, C.plum, 2);
          var asis = ["Search booking", "Retype details", "Check rate", "Call housekeeping"], tobe = ["Booking + rate", "Room status", "Key issued"], a = "", b = "";
          for (k = 0; k < 4; k++) { a += card(25, 96 + k * 42, 150, 30, asis[k], k === 1 ? C.rose : C.white, k === 1 ? C.red : C.slate, C.ink, 14); if (k) a += arrow(100, 88 + k * 42, 100, 95 + k * 42, C.slate, 2); }
          for (k = 0; k < 3; k++) { b += card(225, 104 + k * 52, 150, 34, tobe[k], C.pale, C.green, C.ink, 14); if (k) b += arrow(300, 90 + k * 52, 300, 103 + k * 52, C.green, 2); }
          return hdr(0) +
            S(0, guest(70, 140, 1.2) + R(150, 180, 140, 16, C.navy, 4) + person(212, 140, C.teal, 1.1, "flat") + monitor(296, 96, 84, 62, C.ice) +
              CL("bk", mag(330, 124, 11, C.navy)) + T(220, 236, "Searching for her booking", 16), 0) +
            S(1, cards, 2) + S(1, guest(200, 126, 1, "flat") + T(200, 186, "Her arrival", 15) + T(200, 288, "One shared picture?", 15, C.slate), 1) +
            S(2, lines + R(110, 94, 180, 108, C.white, 10, C.plum, 3) + mini + T(200, 166, "Shared model", 17, C.plum) + T(200, 188, "always current", 14, C.slate) +
              T(200, 288, "Not in someone's drawer", 15), 2) +
            S(3, L(200, 50, 200, 262, C.grey, 2, ' stroke-dasharray="5 5"') + T(100, 62, "As-is", 22, C.slate) + T(100, 82, "today", 14, C.slate) + a +
              T(300, 62, "To-be", 22, C.green) + T(300, 82, "improved", 14, C.green) + b + T(100, 284, "4 steps, 1 duplicate", 14, C.red) + T(300, 284, "3 steps", 14, C.green));
        },
        // V2 · lines 6-9 · execution: workflow routes each task and enforces the agreed order
        // template: Workflow Animation — https://dribbble.com/shots/3791748-Workflow-Animation
        function () {
          var poster = R(20, 56, 170, 100, C.white, 8, C.plum, 2.5) + R(34, 92, 40, 26, C.lilac, 5, C.plum, 2) + R(85, 92, 40, 26, C.lilac, 5, C.plum, 2) + R(136, 92, 40, 26, C.lilac, 5, C.plum, 2) +
            arrow(74, 105, 84, 105, C.plum, 2) + arrow(125, 105, 135, 105, C.plum, 2) + badge(105, 105, false);
          var inbox = H("rev", card(250, 46, 136, 40, "Revenue", C.ice, C.navy, C.ink, 15)) + card(250, 96, 136, 40, "Front desk", C.ice, C.navy, C.ink, 15) + card(250, 146, 136, 40, "Housekeeping", C.ice, C.navy, C.ink, 15);
          var seq = "", k;
          for (k = 0; k < 4; k++) { seq += O(70 + k * 90, 226, 18, C.navy) + T(70 + k * 90, 232, String(k + 1), 17, C.white); if (k) seq += arrow(70 + (k - 1) * 90 + 20, 226, 70 + k * 90 - 20, 226, C.navy, 2.5); }
          return hdr(1) +
            S(0, poster + T(105, 178, "Agreed drawing", 15, C.plum) + CL("sh", person(270, 108, C.teal, 1, "flat") + person(330, 118, C.sky, 1, "flat")) + clock(360, 62, 16) +
              T(300, 192, "Steps skipped", 15, C.red) + T(200, 262, "A drawing is not doing", 17), 0) +
            S(1, R(20, 92, 56, 36, C.sun, 6, C.amber, 2) + R(26, 86, 56, 36, C.sun, 6, C.amber, 2) + T(52, 150, "New tasks", 14) + arrow(88, 106, 114, 106, C.ink, 2.5) +
              SPIN(150, 106, gear(150, 106, 30, C.sky), 6) + T(150, 162, "Workflow", 16, C.navy) + inbox +
              MV(64, -40, 1.8, O(184, 106, 6, C.amber)) + MV(64, 10, 1.8, O(184, 106, 6, C.amber), 0.6) + MV(64, 60, 1.8, O(184, 106, 6, C.amber), 1.2)) +
            S(2, seq + DP("M70 206 Q160 160 250 206", C.red, 2.5) + badge(160, 184, false, 0.9) + T(200, 280, "Agreed order is enforced", 16), 2) +
            S(3, MV(222, -40, 2.4, R(28, 92, 48, 30, C.amber, 5)) +
              card(30, 206, 340, 56, ["Corporate booking needs approval:", "sent straight to Revenue"], C.sun, C.amber, C.ink, 15));
        },
        // V3 · lines 10-14 · rules: decision logic held outside the code, updated by authorised staff
        // template: Process Infographic Widget — https://elements.envato.com/process-infographic-widget-C3TVD9H
        function () {
          var ins = ["Contract", "Travel dates", "Room category"], o = "", k;
          for (k = 0; k < 3; k++) o += pill(80, 170 + k * 44, ins[k], C.ice, C.ink, 15) + arrow(148, 170 + k * 44, 200, 214, C.slate, 2);
          var rows = [["Gulf Co.", "Peak"], ["Gulf Co.", "Low"], ["Marina Ltd", "Any"]], rates = ["520", "410", "450"], tb = "";
          tb += R(176, 60, 212, 32, C.amber, 6) + T(184, 81, "Contract", 14, C.white, "start") + T(282, 81, "Season", 14, C.white, "start") + T(380, 81, "Rate", 14, C.white, "end");
          for (k = 0; k < 3; k++) tb += R(176, 98 + k * 36, 212, 32, C.white, 6, C.amber, 1.5) + T(184, 119 + k * 36, rows[k][0], 14, C.ink, "start") + T(282, 119 + k * 36, rows[k][1], 14, C.ink, "start") + (k ? T(380, 119 + k * 36, rates[k], 15, C.ink, "end") : "");
          var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], tl = L(30, 150, 370, 150, C.ink, 3);
          for (k = 0; k < 6; k++) tl += L(55 + k * 58, 144, 55 + k * 58, 156, C.ink, 2) + T(55 + k * 58, 174, months[k], 14, C.slate) + (k !== 2 && k !== 5 ? doc(42 + k * 58, 98, 26, 36, C.sun, 1) : "");
          return hdr(2) +
            S(0, R(30, 50, 340, 80, C.white, 10, C.navy, 2.5) + T(46, 80, "Task: price the stay", 16, C.navy, "start") + T(46, 110, "Which rate applies?", 15, C.ink, "start") +
              P("M300 62 L338 90 L300 118 L262 90 Z", C.ink, 2.5, C.sun) + T(300, 97, "?", 20), 1) +
            S(1, o + P("M240 184 L282 214 L240 244 L198 214 Z", C.ink, 2.5, C.sun) + T(240, 219, "Rule", 15) + arrow(284, 214, 312, 214, C.ink, 2.5) +
              card(314, 192, 72, 44, "Rate", C.pale, C.green, C.ink, 17), 1) +
            S(2, R(14, 64, 140, 150, C.ink, 10) + T(84, 116, "</>", 30, C.sky, "middle", 900) + L(34, 140, 134, 140, C.slate, 4) + L(34, 156, 114, 156, C.slate, 4) + L(34, 172, 124, 172, C.slate, 4) +
              lock(84, 188, C.sky) + T(84, 240, "Program code", 15) + T(84, 262, "unchanged", 14, C.slate) + L(166, 56, 166, 236, C.grey, 2, ' stroke-dasharray="5 5"') +
              T(282, 50, "Rules table", 16, C.amber) + tb + T(282, 226, "Outside the code", 15, C.amber), 3) +
            S(2, T(380, 119, "520", 15, C.ink, "end"), 2) +
            S(3, R(342, 100, 44, 28, C.pale, 5, C.green, 2) + T(380, 119, "545", 15, C.green, "end") + person(214, 254, C.teal, 0.8, "happy") +
              pill(320, 260, "Updated today", C.green) + pill(84, 284, "No release needed", C.navy, C.white, 14), 3) +
            S(4, T(200, 70, "Contracts change often", 17) + tl + card(30, 200, 150, 56, ["Yesterday", "520 valid"], C.pale, C.green, C.ink, 16) + arrow(184, 228, 214, 228, C.ink, 3) +
              card(218, 200, 166, 56, ["Tomorrow", "520 = a loss"], C.rose, C.red, C.ink, 16));
        },
        // V4 · lines 15-17 · integration: data trapped, then connected through APIs
        // template: Stripe Connect — https://stripe.com/ae/connect
        function () {
          var hub = R(140, 128, 120, 44, C.teal, 22) + T(200, 156, "Integration", 16, C.white);
          return hdr(3) +
            S(0, P("M80 90 L120 120 L80 150 L40 120 Z", C.ink, 2.5, C.sun) + T(80, 126, "Rule", 15) + T(80, 178, "needs room status", 14) +
              L(124, 120, 286, 120, C.slate, 3, ' stroke-dasharray="8 6"') + badge(205, 120, false) + db(290, 78, 96, 90, C.ice, "Rooms", 15) + lock(338, 100, C.red) +
              T(200, 236, "Data trapped in another system", 17, C.red), 0) +
            S(1, L(70, 110, 160, 140, C.teal, 4, ' class="fl"') + L(330, 110, 240, 140, C.teal, 4, ' class="fl"') + L(200, 172, 200, 210, C.teal, 4, ' class="fl"') +
              db(20, 40, 100, 70, C.ice, "Bookings", 14) + db(280, 40, 100, 70, C.peach, "Revenue", 14) + db(150, 210, 100, 70, C.pale, "Rooms", 14) + hub, 1) +
            S(2, T(200, 76, "API", 30, C.teal, "middle", 900) + card(16, 92, 130, 90, ["Booking", "system"], C.ice, C.navy, C.ink, 16) + card(254, 92, 130, 90, ["Revenue", "system"], C.peach, C.coral, C.ink, 16) +
              R(146, 127, 30, 20, C.ink, 3) + L(176, 132, 186, 132, C.ink, 3) + L(176, 142, 186, 142, C.ink, 3) + R(224, 124, 30, 26, C.slate, 3) +
              MV(50, 0, 1.6, R(176, 104, 16, 12, C.amber, 2)) + MV(-50, 0, 1.6, R(210, 158, 16, 12, C.teal, 2), 0.8) +
              T(200, 228, "Application programming interface", 15) + T(200, 254, "lets two systems exchange data", 15, C.slate));
        },
        // V5 · lines 18-19 · the process crosses systems like departments; one screen for the receptionist
        // template: Supply Chain Animation — https://www.behance.net/gallery/121206799/Supply-Chain-Animation
        function () {
          var lanes = ["Front desk", "Revenue", "Housekeeping"], cols = [C.ice, C.peach, C.pale], o = "", k;
          for (k = 0; k < 3; k++) o += R(14, 48 + k * 62, 372, 56, k % 2 ? C.white : C.mist, 6, C.grey, 1) + T(24, 82 + k * 62, lanes[k], 15, C.ink, "start") + db(334, 56 + k * 62, 40, 40, cols[k]);
          var rows = [["Booking", "Corporate"], ["Agreed rate", "AED 520"], ["Room 412", "Ready"]], sc = "";
          for (k = 0; k < 3; k++) sc += R(90, 66 + k * 48, 220, 40, C.ice, 8) + T(100, 91 + k * 48, rows[k][0], 15, C.ink, "start") + T(270, 91 + k * 48, rows[k][1], 14, C.slate, "end") + badge(292, 86 + k * 48, true, 0.8);
          return hdr(3) +
            S(0, o + DP("M150 76 L220 138 L290 200", C.coral, 4) + MV(140, 124, 2.6, O(150, 76, 9, C.coral)) + T(200, 278, "Across departments and systems", 15), 0) +
            S(1, monitor(70, 46, 260, 176, C.white) + sc + T(200, 268, "One screen, no retyping", 17, C.green));
        },
        // V6 · lines 20-23 · monitoring: live view, cycle time, exceptions
        // template: Workflow Dashboard – Interactive Motion Design — https://dribbble.com/shots/27538364-Workflow-Dashboard-Interactive-Motion-Design
        function () {
          var dots = [[80, 200], [110, 190], [140, 212], [170, 186], [200, 206], [230, 196], [260, 182], [330, 202], [355, 192]], d = "", k;
          for (k = 0; k < dots.length; k++) d += O(dots[k][0], dots[k][1], 7, C.teal);
          return hdr(4) +
            S(0, '<ellipse cx="200" cy="72" rx="34" ry="18" fill="' + C.white + '" stroke="' + C.ink + '" stroke-width="2.5"/>' + O(200, 72, 10, C.coral) + O(200, 72, 4, C.ink) +
              T(200, 120, "Are guests served better?", 16) + card(20, 140, 100, 40, "Arrive", C.white, C.ink, C.ink, 15) + card(150, 140, 100, 40, "Check-in", C.white, C.ink, C.ink, 15) +
              card(280, 140, 100, 40, "In room", C.white, C.ink, C.ink, 15) + arrow(120, 160, 148, 160, C.ink, 2) + arrow(250, 160, 278, 160, C.ink, 2) +
              L(70, 202, 330, 202, C.mist, 6) + MV(260, 0, 3, O(70, 202, 8, C.amber)) + MV(260, 0, 3, O(70, 202, 8, C.amber), 1.5), 0) +
            S(1, monitor(40, 46, 320, 172, "#0f1a30") + T(62, 78, "Check-in wait", 15, C.white, "start") + CL("bk", O(300, 72, 5, C.red)) + T(312, 77, "LIVE", 14, C.white, "start") +
              L(60, 196, 340, 196, C.slate, 2) + DP("M60 186 L100 168 L140 174 L180 150 L220 158 L260 132 L300 140 L336 118", C.sky, 4) +
              T(200, 266, "While the work is running", 16), 1) +
            S(2, guest(40, 92, 0.9, "flat") + R(338, 66, 40, 70, C.amber, 3, C.ink, 2) + O(370, 102, 3, C.ink) + T(200, 96, "42 min", 30, C.coral, "middle", 900) +
              T(200, 126, "Cycle time", 18, C.coral) + P("M70 150 v-8 h260 v8", C.coral, 3) + arrow(70, 170, 330, 170, C.ink, 3) +
              L(70, 160, 70, 180, C.ink, 3) + T(70, 204, "Arrives", 15) + T(330, 204, "In room", 15) + T(200, 262, "From start to result", 16, C.slate), 2) +
            S(3, L(50, 240, 370, 240, C.ink, 2.5) + L(50, 240, 50, 52, C.ink, 2.5) + T(58, 64, "Wait", 14, C.slate, "start") + L(50, 150, 370, 150, C.amber, 2.5, ' stroke-dasharray="7 6"') +
              T(366, 142, "Normal limit", 14, C.amber, "end") + d + CL("pl", O(290, 100, 10, C.red)) + pill(290, 72, "Waiting 55 min", C.red) +
              T(210, 270, "Exception: breaks the pattern", 15, C.red));
        },
        // V7 · lines 24-26 · act on the delay today; monitoring turns a project into management; often postponed
        // template: Animated Planning Dashboard Workflow — https://dribbble.com/shots/27184988-Animated-Planning-Dashboard-Workflow
        function () {
          var bars = "", k;
          for (k = 0; k < 5; k++) bars += R(40, 50 + k * 40, 260, 32, k === 4 ? C.mist : LC[k], 8, k === 4 ? C.grey : null, 2, k === 4 ? ' stroke-dasharray="6 5"' : "") +
            T(56, 72 + k * 40, LN[k], 16, k === 4 ? C.slate : C.white, "start");
          return hdr(4) +
            S(0, phone(30, 56, 70, 122, C.white) + warn(65, 110) + arrow(108, 116, 146, 116, C.ink, 2.5) + person(180, 104, C.navy, 1.1, "happy") + T(180, 168, "Manager", 15) +
              arrow(212, 116, 250, 116, C.ink, 2.5) + card(256, 86, 130, 60, ["Call", "housekeeping"], C.pale, C.green, C.ink, 15) + T(321, 168, "Today", 16, C.green) +
              R(110, 202, 60, 56, C.white, 6, C.ink, 2) + R(110, 202, 60, 14, C.red, 4) + T(140, 248, "30", 18) + cross(140, 230, C.red, 1.7) + T(184, 236, "Next month's report", 15, C.slate, "start"), 0) +
            S(1, flag(54, 150, C.green) + T(70, 182, "Project closed", 15) + arrow(132, 140, 176, 140, C.ink, 3) + O(260, 140, 70, "none", C.coral, 3, ' stroke-dasharray="6 6"') +
              SPIN(260, 140, O(260, 70, 7, C.coral), 5) + pill(260, 70, "Watch", C.coral) + pill(330, 140, "Act", C.navy) + pill(260, 210, "Check", C.teal) + pill(190, 140, "Improve", C.plum) +
              T(260, 146, "Daily", 16) + T(200, 272, "Everyday management", 17), 1) +
            S(2, bars + R(306, 186, 80, 70, C.sun, 4, C.amber, 2) + T(346, 226, "Later...", 16, C.amber) + T(170, 282, "Most often postponed", 16, C.red));
        },
        // V8 · lines 27-29 · Noor bought every layer and used one
        // template: Bar Chart Race, Explained — https://observablehq.com/@d3/bar-chart-race-explained
        function () {
          var lab = "", paid = "", used = "", k;
          for (k = 0; k < 5; k++) {
            lab += T(20, 81 + k * 42, LN[k], 15, C.ink, "start");
            paid += CL("gx", R(130, 60 + k * 42, 250, 30, C.grey, 6)) + T(372, 81 + k * 42, "Paid", 14, C.white, "end");
          }
          used = CL("gx", R(130, 60, 250, 30, C.green, 6)) + T(255, 81, "Used", 15, C.white);
          used += pill(240, 117, "Unused", C.slate, C.white, 14) + pill(240, 201, "Unused", C.slate, C.white, 14);
          return T(200, 34, "Noor Health: bought vs used", 17, C.teal) +
            S(0, lab + paid) +
            S(1, pill(240, 159, "Never used", C.red, C.white, 14) + pill(240, 243, "Not connected", C.red, C.white, 14)) +
            S(2, used + T(200, 284, "Bought 5 layers, used 1", 17, C.red));
        },
        // V9 · lines 30-31 · 4.1 to 3.9 hours against a promised 2.87
        // template: Learn D3: Animation — https://observablehq.com/@d3/learn-d3-animation
        function () {
          var f = 43.9, base = 250;
          return S(0, T(200, 34, "Discharge time (hours)", 17) + L(40, base, 360, base, C.ink, 3) +
              CL("gy", R(70, base - 4.1 * f, 70, 4.1 * f, C.navy, 4)) + T(105, base - 4.1 * f - 10, "4.1", 20, C.navy) + T(105, 274, "Before", 15) +
              R(165, base - 2.87 * f, 70, 2.87 * f, C.pale, 4, C.green, 3, ' stroke-dasharray="7 5"') + T(200, base - 2.87 * f - 10, "2.87", 20, C.green) + T(200, 274, "Promised", 15) +
              CL("gy", R(260, base - 3.9 * f, 70, 3.9 * f, C.coral, 4)) + T(295, base - 3.9 * f - 10, "3.9", 20, C.coral) + T(295, 274, "Actual", 15), 0) +
            S(1, T(200, 40, "3.9 h against 2.87 h promised", 16, C.slate) + card(60, 80, 280, 60, "“The suite delivered it”", C.white, C.ink, C.ink, 18) +
              stamp(200, 190, "Challenged", C.red, 22) + T(200, 262, "Not every cause, but real doubt", 15));
        },
        // V10 · lines 32-33 · modelling describes; four layers run and manage; why do some succeed?
        // template: Steps Infographic — https://elements.envato.com/steps-infographic-5NHT2YG
        function () {
          var o = "", k;
          for (k = 1; k < 5; k++) o += card(230, 4 + k * 46, 150, 38, LN[k], C.white, LC[k], C.ink, 15);
          return S(0, T(200, 32, "Describe, then run", 18) + card(20, 98, 150, 74, ["Modelling", "describes"], C.lilac, C.plum, C.ink, 17) + arrow(176, 135, 222, 135, C.ink, 3) + o +
              P("M386 50 h6 v180 h-6", C.ink, 2.5) + T(305, 256, "Run and manage", 16, C.navy), 0) +
            S(1, R(40, 110, 90, 110, C.ice, 6, C.ink, 2) + R(54, 126, 22, 18, C.sky, 2) + R(94, 126, 22, 18, C.sky, 2) + R(54, 160, 22, 18, C.sky, 2) + R(94, 160, 22, 18, C.sky, 2) +
              arrow(85, 100, 85, 54, C.green, 5) + T(85, 248, "Succeeds", 16, C.green) +
              R(270, 110, 90, 110, C.ice, 6, C.ink, 2) + R(284, 126, 22, 18, C.grey, 2) + R(324, 126, 22, 18, C.grey, 2) + R(284, 160, 22, 18, C.grey, 2) + R(324, 160, 22, 18, C.grey, 2) +
              arrow(315, 54, 315, 100, C.red, 5) + T(315, 248, "Struggles", 16, C.red) + T(200, 160, "Why?", 34, C.plum, "middle", 900) + T(200, 284, "Next: success factors", 15, C.slate));
        }
      ]
    });
  })();

  // ===================== W3O2a · The people behind a successful process (26 lines, 9 visuals) =====================
  (function () {
    var gauge = function (cx, cy, lab, hi) {
      return P("M" + (cx - 70) + " " + cy + " A70 70 0 0 1 " + (cx + 70) + " " + cy, C.mist, 16) +
        P("M" + (cx - 70) + " " + cy + " A70 70 0 0 1 " + (cx - 35) + " " + (cy - 60.6), C.red, 16) +
        P("M" + (cx + 35) + " " + (cy - 60.6) + " A70 70 0 0 1 " + (cx + 70) + " " + cy, C.green, 16) + T(cx, cy + 36, lab, 16);
    };
    var needle = function (cx, cy, up) { return L(cx, cy, up ? cx + 50 : cx - 52, up ? cy - 42 : cy - 30, C.ink, 5) + O(cx, cy, 8, C.ink); };
    scene("W3O2a", {
      aria: "Critical success factors at Qasr: sponsor, process owner, change management and staff voice",
      chip: C.teal, bar: C.amber,
      frames: [
        [0, 0, "Something outside software"], [0, 1, "Installed as planned"], [0, 2, "Still waiting: silos"],
        [1, 0, "Critical success factors"], [1, 1, "Leadership, people, method"],
        [2, 0, "Leadership comes first"], [2, 1, "Approves, then silent"], [2, 2, "Nobody settles disputes"],
        [3, 0, "Executive sponsor"], [3, 1, "Visible"], [3, 2, "Sustained"], [3, 3, "Decisive"], [3, 4, "Delegating = withdrawing"],
        [4, 0, "Arrival crosses 4 teams"], [4, 1, "One process owner"], [4, 2, "Title without power"],
        [5, 0, "Change management"], [5, 1, "Start in week one"], [5, 2, "Build skills inside"],
        [6, 0, "A receptionist objects"], [6, 1, "Resistance is information"],
        [7, 0, "Noor left clinicians out"], [7, 1, "Manual vs the ward"], [7, 2, "Accuracy and will drop"], [7, 3, "Involve people early"],
        [8, 0, "People decide value"]
      ],
      visuals: [
        // V0 · lines 0-2 · the software works, the guest still waits behind departmental walls
        // template: Outline - Explainer Kit — https://motionarray.com/after-effects-templates/outline-explainer-kit-36706/
        function () {
          var chk = R(214, 40, 172, 122, C.white, 10, C.green, 2.5), rows = ["Installed", "Configured", "On plan"], k;
          for (k = 0; k < 3; k++) chk += tick(240, 70 + k * 34, C.green, 0.9) + T(260, 76 + k * 34, rows[k], 16, C.ink, "start");
          return S(0, R(16, 32, 178, 140, "none", 14, C.navy, 2, ' stroke-dasharray="7 6"') + monitor(30, 46, 150, 96, C.ice) + T(105, 100, "BPM suite", 18, C.navy)) +
            S(0, T(290, 110, "?", 54, C.coral, "middle", 900) + T(290, 150, "Outside it?", 15, C.coral), 0) +
            S(1, chk) +
            S(2, guest(40, 204, 1, "sad") + clock(84, 196, 13, C.coral, true) + T(48, 286, "Still waits", 14, C.coral) +
              card(120, 212, 80, 44, "Desk", C.ice, C.navy, C.ink, 15) + card(214, 212, 76, 44, "Revenue", C.ice, C.navy, C.ink, 15) + card(304, 212, 80, 44, "Rooms", C.ice, C.navy, C.ink, 15) +
              R(204, 196, 6, 72, C.slate, 2) + R(294, 196, 6, 72, C.slate, 2) + T(250, 288, "Separate routines", 15, C.red));
        },
        // V1 · lines 3-4 · critical success factors: three families, very little technical
        // template: Modern Process Infographic Steps Animation Template — https://elements.envato.com/steps-infographic-BUNKM3A
        function () {
          return S(0, T(200, 40, "Critical success factors", 20, C.navy) + T(200, 66, "conditions that decide delivery", 15, C.slate) +
              P("M100 200 A100 100 0 0 1 300 200", C.mist, 20) + P("M100 200 A100 100 0 0 1 150 113.4", C.red, 20) + P("M250 113.4 A100 100 0 0 1 300 200", C.green, 20) +
              SPIN(200, 200, L(200, 200, 200, 124, C.ink, 5), 7) + O(200, 200, 9, C.ink) + T(100, 228, "Fails", 15, C.red) + T(300, 228, "Delivers", 15, C.green) +
              T(200, 266, "Which conditions push it?", 16), 0) +
            S(1, P("M30 96 L200 40 L370 96 Z", C.ink, 2.5, C.sun) + T(200, 86, "Successful programme", 15) +
              R(50, 102, 80, 128, C.navy, 6) + R(160, 102, 80, 128, C.teal, 6) + R(270, 102, 80, 128, C.plum, 6) +
              person(90, 140, C.white, 0.9) + person(200, 140, C.white, 0.9) + person(310, 140, C.white, 0.9) +
              T(90, 252, "Leadership", 16, C.navy) + T(200, 252, "People", 16, C.teal) + T(310, 252, "Method", 16, C.plum) +
              gear(116, 280, 9, C.grey) + T(132, 285, "Very little is technical", 15, C.slate, "start"));
        },
        // V2 · lines 5-7 · leadership: the GM approves then goes quiet; nobody settles the Reception-Revenue dispute
        // template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
        function () {
          var cal = "", k;
          for (k = 0; k < 3; k++) { var x = 200 + k * 70; cal += R(x - 28, 76, 56, 50, C.white, 6, C.ink, 2) + R(x - 28, 76, 56, 14, C.slate, 4) + T(x, 118, "M" + (k + 1), 16) + T(x, 146, "...", 18, C.grey); }
          return S(0, T(200, 60, "The other two rest on it", 17) + card(60, 116, 130, 70, "People", C.mint, C.teal, C.ink, 18) + card(210, 116, 130, 70, "Method", C.lilac, C.plum, C.ink, 18) +
              card(40, 196, 320, 54, "Leadership", C.navy, C.ink, C.white, 19), 0) +
            S(1, person(64, 92, C.ink, 1.1, "happy") + doc(96, 92, 46, 58, C.white, 2) + tick(119, 138, C.green, 0.9) + T(90, 180, "Approves", 15, C.green) + cal +
              T(270, 172, "Rarely asks again", 16, C.coral)) +
            S(2, person(90, 214, C.teal, 1, "sad") + T(90, 280, "Reception", 14) + person(310, 214, C.coral, 1, "sad") + T(310, 280, "Revenue", 14) +
              arrow(118, 232, 178, 232, C.teal, 3) + arrow(282, 232, 222, 232, C.coral, 3) + CL("sh", warn(200, 230, 0.9, C.amber)) + T(200, 198, "Who settles it?", 16, C.red));
        },
        // V3 · lines 8-12 · executive sponsorship: visible, sustained, decisive; delegating it all withdraws it
        // template: Motion Design Process — https://www.behance.net/gallery/53752435/Motion-Design-Process
        function () {
          var q = function (x, t) { return card(x, 36, 116, 40, t, C.white, C.navy, C.ink, 16) + tick(x + 104, 50, C.green, 0.6); };
          var team = person(104, 156, C.slate, 0.9) + person(156, 150, C.slate, 0.9) + person(246, 150, C.slate, 0.9) + person(298, 156, C.slate, 0.9) + person(200, 152, C.ink, 1, "happy");
          return S(0, T(200, 62, "A senior leader", 17), 0) +
            S(0, person(200, 128, C.ink, 1.5, "happy") + pill(200, 210, "Executive sponsor", C.navy, C.white, 16) + T(200, 246, "keeps backing the programme", 15, C.slate), 0) +
            S(1, q(16, "Visible")) + S(2, q(142, "Sustained")) + S(3, q(268, "Decisive")) +
            S(1, team + R(60, 182, 280, 40, C.sand, 20, C.ink, 2) + bubble(110, 88, 180, 40, "How is check-in?", C.sun, 15) + T(200, 252, "In someone else's meeting", 15), 1) +
            S(2, L(40, 250, 360, 250, C.ink, 2.5) + DP("M40 180 L100 170 L150 232 L200 200 L260 160 L360 140", C.coral, 4) + L(40, 118, 360, 118, C.navy, 4) +
              T(360, 108, "Sponsor still there", 14, C.navy, "end") + T(60, 274, "Launch", 14) + T(150, 274, "Bad month", 14, C.red), 2) +
            S(3, card(28, 120, 132, 60, ["Team", "escalates"], C.rose, C.red, C.ink, 16) + arrow(164, 150, 198, 150, C.ink, 3) + person(222, 136, C.ink, 1, "happy") +
              arrow(246, 150, 266, 150, C.ink, 3) + card(270, 120, 116, 60, ["Answer", "in days"], C.pale, C.green, C.ink, 16) + T(200, 240, "Days, not quarters", 17), 3) +
            S(4, CL("fd", person(110, 140, C.ink, 1.4)) + arrow(146, 150, 230, 150, C.slate, 3) +
              doc(244, 112, 50, 64, C.white, 3) + doc(256, 120, 50, 64, C.white, 3) + T(200, 110, "Delegates everything", 16) +
              cross(124, 56, C.red, 1.6) + cross(250, 56, C.red, 1.6) + cross(376, 56, C.red, 1.6) + stamp(200, 240, "Sponsorship withdrawn", C.red, 18));
        },
        // V4 · lines 13-15 · one process owner across the departments, usually given only a title
        // template: Supply Chain Animation — https://www.behance.net/gallery/121206799/Supply-Chain-Animation
        function () {
          var lanes = ["Reservations", "Revenue", "Front desk", "Housekeeping"], o = "", k;
          for (k = 0; k < 4; k++) o += R(14, 40 + k * 48, 372, 44, k % 2 ? C.white : C.mist, 6, C.grey, 1) + T(24, 68 + k * 48, lanes[k], 15, C.ink, "start");
          var path = "M150 62 L210 110 L270 158 L330 206";
          var kit = [["Title", true], ["Authority", false], ["Time", false], ["Training", false]], kt = "";
          for (k = 0; k < 4; k++) kt += R(170, 44 + k * 52, 210, 42, kit[k][1] ? C.pale : C.white, 8, kit[k][1] ? C.green : C.grey, 2.5, kit[k][1] ? "" : ' stroke-dasharray="7 5"') +
            T(186, 71 + k * 52, kit[k][0], 17, kit[k][1] ? C.ink : C.slate, "start") + badge(356, 65 + k * 52, kit[k][1], 0.85);
          return S(0, o + DP(path, C.coral, 3) + MV(180, 144, 3, O(150, 62, 8, C.coral)) + MV(180, 144, 3, O(150, 62, 8, C.coral), 1) + MV(180, 144, 3, O(150, 62, 8, C.coral), 2), 1) +
            S(0, T(200, 266, "One arrival crosses 4 teams", 16), 0) +
            S(1, R(12, 38, 376, 194, "none", 8, C.amber, 3) + L(200, 40, 200, 236, C.amber, 3, ' stroke-dasharray="6 5"') + R(14, 238, 372, 50, C.sun, 10, C.amber, 2) +
              person(44, 250, C.amber, 0.7) + T(70, 269, "Process owner: whole arrival", 16, C.ink, "start"), 1) +
            S(2, person(80, 100, C.amber, 1.6) + T(80, 186, "Process owner", 16) + kt + T(200, 284, "Usually gets only the title", 16, C.red));
        },
        // V5 · lines 16-18 · change management from week one; skills built inside Qasr
        // template: Design process timeline - Animation — https://dribbble.com/shots/9892691-Design-process-timeline-Animation
        function () {
          return S(0, T(200, 66, "Helping people move", 18) + card(16, 110, 110, 64, ["Old", "way"], C.mist, C.slate, C.ink, 17) + card(274, 110, 110, 64, ["New", "way"], C.pale, C.green, C.ink, 17) +
              L(130, 142, 270, 142, C.teal, 4, ' class="fl"') + MV(110, 0, 3, person(150, 112, C.teal, 0.7)) + MV(110, 0, 3, person(150, 112, C.sky, 0.7), 1.5) +
              pill(200, 236, "Change management", C.teal, C.white, 16), 0) +
            S(1, T(200, 60, "When does it start?", 17) + L(30, 150, 370, 150, C.ink, 3) + L(50, 100, 50, 160, C.green, 3) + CL("gx", R(50, 110, 280, 28, C.green, 6)) +
              T(190, 129, "Start here: week 1", 15, C.white) + T(30, 178, "Week 1", 15, C.ink, "start") + L(330, 140, 330, 160, C.ink, 3) + T(330, 178, "Go-live", 15) +
              R(300, 198, 60, 26, C.red, 6) + cross(330, 211, C.white, 0.9) + T(330, 250, "Too late", 15, C.red), 1) +
            S(2, person(60, 128, C.teal, 1, "happy") + person(104, 138, C.teal, 1, "happy") + person(148, 128, C.teal, 1, "happy") + T(104, 200, "Qasr's own team", 15) + badge(170, 118, true, 0.7) +
              R(320, 76, 60, 124, C.sand, 4, C.ink, 2.5) + R(320, 76, 22, 124, C.ink, 2) + MV(70, 0, 2.6, person(250, 128, C.amber, 0.9) + R(262, 150, 16, 12, C.ink, 2)) +
              T(300, 226, "Consultants leave", 14, C.slate) + T(200, 276, "Skills stay inside", 17, C.green));
        },
        // V6 · lines 19-20 · the receptionist's objection is design information
        // template: Workflow Dashboard UI Motion Concept — https://dribbble.com/shots/27719715-SaaS-Dashboard-Workflow-UI-Motion-Concept
        function () {
          return S(0, monitor(170, 40, 210, 140, C.white) + R(186, 56, 178, 30, C.ice, 6) + T(196, 76, "Guest", 15, C.ink, "start") + R(186, 94, 178, 30, C.ice, 6) +
              T(196, 114, "Room 412", 15, C.ink, "start") + R(186, 132, 178, 30, C.mist, 6, C.red, 2, ' stroke-dasharray="6 4"') + T(196, 152, "Corporate rate", 15, C.slate, "start") +
              lock(342, 140, C.red) + person(70, 134, C.teal, 1.3, "sad") + bubble(10, 30, 150, 62, ["I need that", "rate!"], C.sun, 15)) +
            S(0, clock(40, 232, 14, C.coral, true) + T(64, 238, "Busy evening", 15, C.coral, "start"), 0) +
            S(1, R(30, 214, 150, 56, C.mist, 10, C.grey, 2) + T(105, 248, "Obstacle", 16, C.slate) + badge(172, 218, false, 0.8) +
              R(220, 214, 166, 56, C.pale, 10, C.green, 2.5) + T(303, 248, "Design input", 17, C.green) + badge(380, 218, true, 0.8) +
              MV(216, 130, 2.6, R(70, 96, 40, 26, C.sun, 4, C.amber, 2)) + T(200, 290, "Resistance is information", 15));
        },
        // V7 · lines 21-24 · Noor excluded clinicians; accuracy and willingness fall; involvement raises both
        // template: Celonis pink-dot case explanation — https://community.celonis.com/general-product-q-a-2/what-does-pink-dots-represent-in-process-explorer-when-we-press-icon-pl
        function () {
          var stack = R(160, 70, 60, 66, C.ice, 6, C.navy, 2) + R(167, 77, 60, 66, C.ice, 6, C.navy, 2) + R(174, 84, 60, 66, C.white, 6, C.navy, 2.5) + T(204, 126, "91", 26, C.navy, "middle", 900);
          return S(0, T(200, 40, "Noor: 91 models, no clinicians", 16, C.teal) + doc(40, 66, 70, 90, C.sand) + T(75, 180, "Policy manual", 14) + arrow(116, 112, 152, 112, C.navy, 3) + stack +
              T(205, 180, "91 models", 14) + R(286, 62, 100, 100, "none", 10, C.red, 2, ' stroke-dasharray="6 5"') + person(316, 90, C.teal, 0.8) + person(354, 90, C.teal, 0.8) +
              badge(382, 64, false, 0.8) + T(336, 180, "Clinicians", 14, C.red), 1) +
            S(1, card(20, 206, 168, 56, ["Manual:", "one sign-off"], C.white, C.navy, C.ink, 15) + card(212, 206, 174, 56, ["Ward:", "three handoffs"], C.rose, C.red, C.ink, 15) +
              O(200, 234, 14, C.sun, C.ink, 2) + T(200, 241, "≠", 18) + arrow(336, 166, 318, 202, C.teal, 3), 1) +
            S(2, gauge(100, 170, "Model accuracy") + gauge(300, 170, "Willingness")) +
            S(2, T(200, 52, "Excluding clinicians weakened", 16, C.red) + needle(100, 170, false) + needle(300, 170, false) + arrow(100, 240, 100, 270, C.red, 4) + arrow(300, 240, 300, 270, C.red, 4), 2) +
            S(3, T(200, 52, "Involve them early", 18, C.green) + needle(100, 170, true) + needle(300, 170, true) +
              person(160, 236, C.teal, 0.8, "happy") + person(200, 230, C.teal, 0.8, "happy") + person(240, 236, C.teal, 0.8, "happy") + T(200, 290, "They recognise their work", 15, C.green));
        },
        // V8 · line 25 · software coordinates; people decide value
        // template: Infographics motion design — https://www.behance.net/gallery/210506051/Infographics-motion-design
        function () {
          var star = P("M300 40 L307 56 L324 57 L311 68 L315 85 L300 76 L285 85 L289 68 L276 57 L293 56 Z", C.amber, 2, C.sun);
          return S(0, SPIN(96, 120, gear(96, 120, 36, C.sky), 6) + SPIN(150, 172, gear(150, 172, 26, C.grey), 3) + T(110, 236, "Software coordinates", 15) +
            L(200, 60, 200, 250, C.grey, 2, ' stroke-dasharray="5 5"') + CL("pl", star) + person(300, 124, C.teal, 1.5, "happy") + T(300, 236, "People create value", 15, C.teal) +
            T(200, 284, "Value is a human decision", 16));
        }
      ]
    });
  })();

})();

// FILE w03-claude-v2-part2.js
// OPER621 · Week 3 · Animated teaching scenes, version 2 · part 2 of 3 (W3O2b, W3O2c, W3O3a)
// Contract: window.VL_SCENES[secId] = { build(el), step(i, n), reset() }; step(i) shows narration line i of the section.
// CSS lives in one <style id="vl-sc-w03">; every rule is scoped under .vls-w03-<secId>. Standalone: defines every helper it uses.
(function () {
  "use strict";
  // ---------- environment ----------
  // Motion uses CSS transitions and keyframes only (no layout reads, no per-step redraw);
  // window.gsap is not required. prefers-reduced-motion switches every animation off.
  var W = window, DOC = W.document;
  W.VL_SCENES = W.VL_SCENES || {};
  var SID = "vl-sc-w03";
  var C = {
    ink: "#14213d", navy: "#1f4e79", teal: "#16867a", mint: "#d6f2ea", coral: "#e0552b", peach: "#fde4d8",
    amber: "#d98a0b", sun: "#fff2c6", plum: "#6a4c93", lilac: "#ebe2f7", sky: "#3f86cf", ice: "#e3effb",
    green: "#2c8c55", pale: "#e0f4e7", red: "#c62f2f", rose: "#fbe1e1", slate: "#56677a", grey: "#a9b6c3",
    mist: "#edf1f5", white: "#ffffff", paper: "#fbf8f2", sand: "#f3ead6", skin: "#e9b98f"
  };

  // ---------- SVG string helpers (absolute coordinates; no wrapper transforms on animated groups) ----------
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function est(t, z) { return String(t).length * z * 0.56; }
  function T(x, y, s, z, c, a, w, ex) {
    z = z || 16; a = a || "middle";
    if (W.__vlw03T) W.__vlw03T.push([x, y, String(s).length, z, a, String(s)]);
    return '<text x="' + x + '" y="' + y + '" font-size="' + z + '" font-weight="' + (w || 800) + '" fill="' + (c || C.ink) +
      '" text-anchor="' + a + '"' + (ex || "") + ">" + esc(s) + "</text>";
  }
  function TL(x, y, arr, z, c, lh, a, w) { var o = ""; for (var i = 0; i < arr.length; i++) o += T(x, y + i * (lh || z * 1.2), arr[i], z, c, a, w); return o; }
  function R(x, y, w, h, f, rx, st, sw, ex) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx == null ? 8 : rx) + '" fill="' + (f || "none") + '"' +
      (st ? ' stroke="' + st + '" stroke-width="' + (sw || 2) + '"' : "") + (ex || "") + "/>";
  }
  function O(cx, cy, r, f, st, sw, ex) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (f || "none") + '"' + (st ? ' stroke="' + st + '" stroke-width="' + (sw || 2) + '"' : "") + (ex || "") + "/>";
  }
  function L(x1, y1, x2, y2, c, w, ex) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (c || C.ink) + '" stroke-width="' + (w || 2) + '" stroke-linecap="round"' + (ex || "") + "/>";
  }
  function P(d, c, w, f, ex) {
    return '<path d="' + d + '" fill="' + (f || "none") + '" stroke="' + (c || "none") + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + (ex || "") + "/>";
  }
  // drawable path: strokes itself in when its stage appears
  function DP(d, c, w) { return P(d, c, w, "none", ' class="dr" pathLength="1"'); }
  // staged group: visible from stage a (to stage e when given)
  function S(a, inner, e) { return '<g class="st" data-s="' + a + '"' + (e != null ? ' data-e="' + e + '"' : "") + ">" + inner + "</g>"; }
  // highlight group: pulses when a frame names its key
  function H(k, inner) { return '<g class="hk" data-h="' + k + '">' + inner + "</g>"; }
  // looping CSS motion
  function MV(dx, dy, dur, inner, delay) {
    return '<g class="mv" style="--dx:' + dx + "px;--dy:" + dy + "px;animation-duration:" + (dur || 2.4) + "s" + (delay ? ";animation-delay:" + delay + "s" : "") + '">' + inner + "</g>";
  }
  function CL(cls, inner) { return '<g class="' + cls + '">' + inner + "</g>"; }
  function SPIN(cx, cy, inner, dur) { return '<g class="sp" style="transform-origin:' + cx + "px " + cy + "px" + (dur ? ";animation-duration:" + dur + "s" : "") + '">' + inner + "</g>"; }
  function arrow(x1, y1, x2, y2, c, w, cls) {
    c = c || C.ink; w = w || 3;
    var a = Math.atan2(y2 - y1, x2 - x1), h = 7 + w * 2, bx = x2 - Math.cos(a) * h * 0.8, by = y2 - Math.sin(a) * h * 0.8;
    var p1x = x2 - Math.cos(a) * h + Math.sin(a) * h * 0.55, p1y = y2 - Math.sin(a) * h - Math.cos(a) * h * 0.55;
    var p2x = x2 - Math.cos(a) * h - Math.sin(a) * h * 0.55, p2y = y2 - Math.sin(a) * h + Math.cos(a) * h * 0.55;
    var f = function (n) { return Math.round(n * 10) / 10; };
    return L(x1, y1, f(bx), f(by), c, w, cls ? ' class="' + cls + '"' : "") + '<path d="M' + f(x2) + " " + f(y2) + " L" + f(p1x) + " " + f(p1y) + " L" + f(p2x) + " " + f(p2y) + ' Z" fill="' + c + '"/>';
  }
  function card(x, y, w, h, t, f, st, tc, z) {
    z = z || 16; var lines = Array.isArray(t) ? t : [t], lh = z * 1.18, y0 = y + h / 2 - (lines.length - 1) * lh / 2 + z * 0.36;
    return R(x, y, w, h, f || C.white, 10, st || C.ink, 2.5) + TL(x + w / 2, y0, lines, z, tc || C.ink, lh);
  }
  function pill(cx, cy, t, f, tc, z) {
    z = z || 15; var w = Math.round(est(t, z) + 22);
    return R(cx - w / 2, cy - z * 0.95, w, Math.round(z * 1.9), f || C.ink, Math.round(z * 0.95)) + T(cx, cy + z * 0.36, t, z, tc || C.white);
  }
  function person(x, y, c, s, mood) {
    s = s || 1; c = c || C.navy;
    var r = 9 * s, o = O(x, y, r, C.skin) + P("M" + (x - r) + " " + (y - r * 0.2) + " Q" + x + " " + (y - r * 1.5) + " " + (x + r) + " " + (y - r * 0.2), c, 3 * s) +
      P("M" + (x - 14 * s) + " " + (y + 34 * s) + " Q" + (x - 14 * s) + " " + (y + 12 * s) + " " + x + " " + (y + 12 * s) + " Q" + (x + 14 * s) + " " + (y + 12 * s) + " " + (x + 14 * s) + " " + (y + 34 * s) + " Z", "none", 0, c);
    if (mood) {
      o += O(x - 3 * s, y - 1 * s, 1.3 * s, C.ink) + O(x + 3 * s, y - 1 * s, 1.3 * s, C.ink);
      o += mood === "sad" ? P("M" + (x - 3.5 * s) + " " + (y + 5 * s) + " Q" + x + " " + (y + 2 * s) + " " + (x + 3.5 * s) + " " + (y + 5 * s), C.ink, 1.4 * s)
        : mood === "flat" ? L(x - 3 * s, y + 4 * s, x + 3 * s, y + 4 * s, C.ink, 1.4 * s)
        : P("M" + (x - 3.5 * s) + " " + (y + 3 * s) + " Q" + x + " " + (y + 6.5 * s) + " " + (x + 3.5 * s) + " " + (y + 3 * s), C.ink, 1.4 * s);
    }
    return o;
  }
  function guest(x, y, s, mood) {
    s = s || 1;
    return person(x, y, C.plum, s, mood || "sad") + R(x + 15 * s, y + 18 * s, 13 * s, 17 * s, C.amber, 3 * s, C.ink, 1.5) + P("M" + (x + 18 * s) + " " + (y + 18 * s) + " v-4 h7 v4", C.ink, 1.5 * s);
  }
  function clock(x, y, r, c, spin) {
    c = c || C.coral;
    var hand = L(x, y, x, y - r * 0.72, c, 3);
    return O(x, y, r, C.white, c, 3) + L(x, y, x + r * 0.45, y, C.ink, 3) + (spin ? SPIN(x, y, hand, 3) : hand) + O(x, y, 2.5, C.ink);
  }
  function tick(x, y, c, s) { s = s || 1; return P("M" + (x - 9 * s) + " " + y + " l" + 6 * s + " " + 7 * s + " l" + 12 * s + " " + (-15 * s), c || C.green, 4 * s); }
  function cross(x, y, c, s) { s = s || 1; var k = 7 * s; return P("M" + (x - k) + " " + (y - k) + " L" + (x + k) + " " + (y + k) + " M" + (x + k) + " " + (y - k) + " L" + (x - k) + " " + (y + k), c || C.red, 4 * s); }
  function badge(x, y, ok, s) { s = s || 1; return O(x, y, 12 * s, ok ? C.green : C.red) + (ok ? tick(x + 1 * s, y + 1 * s, C.white, 0.8 * s) : cross(x, y, C.white, 0.75 * s)); }
  function phone(x, y, w, h, f) { return R(x, y, w, h, C.ink, 14) + R(x + 6, y + 16, w - 12, h - 30, f || C.white, 6) + R(x + w / 2 - 12, y + 6, 24, 4, C.slate, 2); }
  function monitor(x, y, w, h, f) { return R(x, y, w, h, C.ink, 8) + R(x + 6, y + 6, w - 12, h - 12, f || C.white, 4) + R(x + w / 2 - 8, y + h, 16, 10, C.slate, 0) + R(x + w / 2 - 26, y + h + 9, 52, 6, C.slate, 3); }
  function db(x, y, w, h, f, label, z) {
    var ry = 8;
    return P("M" + x + " " + (y + ry) + " v" + (h - 2 * ry) + " a" + w / 2 + " " + ry + " 0 0 0 " + w + " 0 v" + (-(h - 2 * ry)), C.ink, 2.5, f || C.ice) +
      '<ellipse cx="' + (x + w / 2) + '" cy="' + (y + ry) + '" rx="' + w / 2 + '" ry="' + ry + '" fill="' + C.white + '" stroke="' + C.ink + '" stroke-width="2.5"/>' +
      (label ? T(x + w / 2, y + h / 2 + 10, label, z || 14, C.ink) : "");
  }
  function doc(x, y, w, h, f, n) {
    var o = P("M" + x + " " + y + " h" + (w - 14) + " l14 14 v" + (h - 14) + " h" + (-w) + " Z", C.ink, 2.5, f || C.white);
    for (var i = 0; i < (n || 4); i++) o += L(x + 10, y + 24 + i * 12, x + w - 12, y + 24 + i * 12, C.grey, 3);
    return o;
  }
  function gear(x, y, r, f) {
    var d = "", n = 8;
    for (var i = 0; i < n * 2; i++) { var a = i * Math.PI / n, rr = i % 2 ? r * 0.78 : r; d += (i ? " L" : "M") + Math.round((x + Math.cos(a) * rr) * 10) / 10 + " " + Math.round((y + Math.sin(a) * rr) * 10) / 10; }
    return P(d + " Z", C.ink, 2, f || C.grey) + O(x, y, r * 0.32, C.white, C.ink, 2);
  }
  function hotel(x, y, w, h) {
    var o = R(x, y, w, h, C.sand, 4, C.ink, 2.5) + R(x - 6, y - 10, w + 12, 12, C.navy, 3);
    for (var r = 0; r < 3; r++) for (var c = 0; c < 4; c++) o += R(x + 10 + c * (w - 20) / 4, y + 12 + r * 22, (w - 20) / 4 - 8, 13, C.sky, 2);
    return o + R(x + w / 2 - 12, y + h - 26, 24, 26, C.amber, 3, C.ink, 2);
  }
  function hosp(x, y, s) {
    s = s || 1;
    return R(x - 26 * s, y - 30 * s, 52 * s, 42 * s, C.white, 4, C.ink, 2) + R(x - 5 * s, y - 24 * s, 10 * s, 24 * s, C.red, 1) + R(x - 12 * s, y - 17 * s, 24 * s, 10 * s, C.red, 1);
  }
  function lock(x, y, c) { c = c || C.ink; return P("M" + (x - 8) + " " + y + " v-8 a8 8 0 0 1 16 0 v8", c, 3) + R(x - 12, y, 24, 18, c, 3); }
  function mag(x, y, r, c) { c = c || C.ink; return O(x, y, r, "rgba(255,255,255,.55)", c, 4) + L(x + r * 0.72, y + r * 0.72, x + r * 1.6, y + r * 1.6, c, 6); }
  function warn(x, y, s, c) { s = s || 1; c = c || C.amber; return P("M" + x + " " + (y - 16 * s) + " L" + (x + 18 * s) + " " + (y + 14 * s) + " L" + (x - 18 * s) + " " + (y + 14 * s) + " Z", C.ink, 2, c) + T(x, y + 10 * s, "!", 18 * s, C.ink); }
  function flag(x, y, c) { return L(x, y, x, y - 40, C.ink, 3) + P("M" + x + " " + (y - 40) + " h26 l-6 8 l6 8 h-26 Z", "none", 0, c || C.coral); }
  function bubble(x, y, w, h, t, f, z, tail) {
    tail = tail == null ? -1 : tail;
    return R(x, y, w, h, f || C.white, 14, C.ink, 2) + P("M" + (x + w / 2 - 10) + " " + (y + h - 1) + " l" + (tail * 14 + 10) + " 16 l4 -16", C.ink, 2, f || C.white) +
      R(x + w / 2 - 12, y + h - 4, 26, 6, f || C.white, 0) + TL(x + w / 2, y + h / 2 + (z || 15) * 0.36 - ((Array.isArray(t) ? t.length : 1) - 1) * (z || 15) * 0.6, Array.isArray(t) ? t : [t], z || 15);
  }
  function bg(c1, c2) {
    return R(0, 0, 400, 300, c1 || C.paper, 0) + '<g opacity=".5">' + L(0, 284, 400, 284, c2 || C.sand, 2) + "</g>";
  }
  function stamp(x, y, t, c, z, rot) {
    z = z || 18; var w = Math.round(est(t, z) + 24);
    return '<g transform="rotate(' + (rot == null ? -8 : rot) + " " + x + " " + y + ')">' + R(x - w / 2, y - z, w, z * 1.9, "rgba(255,255,255,.85)", 6, c || C.red, 3.5) +
      '<text x="' + x + '" y="' + (y + z * 0.36) + '" font-size="' + z + '" font-weight="900" fill="' + (c || C.red) + '" text-anchor="middle" letter-spacing="1">' + esc(t) + "</text></g>";
  }

  // ---------- one shared <style id="vl-sc-w03">, every rule scoped under .vls-w03-<secId> ----------
  var KF = "@keyframes vlw03fade{from{opacity:0}to{opacity:1}}" +
    "@keyframes vlw03in{0%{transform:scale(.82) translateY(6px)}60%{transform:scale(1.05)}100%{transform:none}}" +
    "@keyframes vlw03draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}" +
    "@keyframes vlw03gx{from{transform:scaleX(0)}to{transform:none}}" +
    "@keyframes vlw03gy{from{transform:scaleY(0)}to{transform:none}}" +
    "@keyframes vlw03mv{0%{transform:translate(0,0);opacity:0}12%{opacity:1}82%{opacity:1}100%{transform:translate(var(--dx),var(--dy));opacity:0}}" +
    "@keyframes vlw03fl{to{stroke-dashoffset:-28}}" +
    "@keyframes vlw03pl{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}" +
    "@keyframes vlw03bk{0%,100%{opacity:1}50%{opacity:.3}}" +
    "@keyframes vlw03sh{0%,100%{transform:translateX(0)}25%{transform:translateX(-2px)}75%{transform:translateX(2px)}}" +
    "@keyframes vlw03sp{to{transform:rotate(360deg)}}" +
    "@keyframes vlw03fd{0%,30%{opacity:1}100%{opacity:.18}}";
  function css(sc) {
    var r = [
      "&{position:relative;display:flex;flex-direction:column;width:100%;height:100%;min-height:0;overflow:hidden;box-sizing:border-box;border-radius:14px;background:" + C.paper + ";color:" + C.ink + ";font-family:inherit}",
      "& *{box-sizing:border-box}",
      "& .vx-hd{flex:0 0 auto;display:flex;align-items:center;gap:10px;padding:8px 12px 4px;min-height:34px}",
      "& .vx-chip{flex:0 1 auto;max-width:86%;padding:5px 12px;border-radius:999px;font-size:14px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#fff;background:var(--vx-chip)}",
      "& .vx-pg{flex:1 1 auto;min-width:20px;height:5px;border-radius:3px;background:rgba(20,33,61,.12);overflow:hidden}",
      "& .vx-pgb{display:block;height:100%;width:0;border-radius:3px;background:var(--vx-bar);transition:width .5s ease}",
      "& .vx-svg{flex:1 1 0;display:block;width:100%;height:100%;min-height:150px}",
      "& .vx-svg text{font-family:inherit;pointer-events:none}",
      "& .vp{display:none}",
      "& .vp.on{display:inline;animation:vlw03fade .45s ease-out}",
      "& .st{opacity:0;transition:opacity .45s ease;transform-box:fill-box;transform-origin:50% 50%}",
      "& .st.on{opacity:1}",
      "& .st.nw{animation:vlw03in .6s cubic-bezier(.3,1.4,.5,1)}",
      "& .st .dr{stroke-dasharray:1 1;stroke-dashoffset:0}",
      "& .st.nw .dr{animation:vlw03draw 1.1s ease-out}",
      "& .st.nw .gx{transform-box:fill-box;transform-origin:0 50%;animation:vlw03gx .9s ease-out}",
      "& .st.nw .gy{transform-box:fill-box;transform-origin:50% 100%;animation:vlw03gy .9s ease-out}",
      "& .mv{animation:vlw03mv 2.4s ease-in-out infinite}",
      "& .fl{stroke-dasharray:7 7;animation:vlw03fl 1s linear infinite}",
      "& .pl{transform-box:fill-box;transform-origin:50% 50%;animation:vlw03pl 1.6s ease-in-out infinite}",
      "& .bk{animation:vlw03bk 1.3s ease-in-out infinite}",
      "& .sh{animation:vlw03sh .4s linear infinite}",
      "& .sp{transform-box:view-box;animation:vlw03sp 4s linear infinite}",
      "& .st.nw .fd{animation:vlw03fd 2.6s ease-in forwards}",
      "& .hk{transform-box:fill-box;transform-origin:50% 50%}",
      "& .hk.hl{animation:vlw03pl 1.2s ease-in-out infinite}",
      "& .hk.hl rect{stroke:" + C.coral + ";stroke-width:4}",
      "&.vx-inst .st,&.vx-inst .vx-pgb{transition:none!important}",
      "@media (max-width:420px){& .vx-chip{font-size:12.5px;letter-spacing:.02em;padding:4px 10px}& .vx-hd{padding:6px 10px 3px}}",
      "@media (prefers-reduced-motion:reduce){& *,& *::before,& *::after{animation:none!important;transition:none!important}}"
    ];
    return r.map(function (x) { return x.split("&").join(sc); }).join("\n");
  }
  function installCss(id) {
    if (!DOC || !DOC.head) return;
    var st = DOC.getElementById(SID);
    if (!st) { st = DOC.createElement("style"); st.id = SID; DOC.head.appendChild(st); }
    var txt = st.textContent || "";
    if (txt.indexOf("vlw03fade") < 0) txt += KF + "\n";
    var mark = "/* .vls-w03-" + id + " */";
    if (txt.indexOf(mark) < 0) txt += mark + "\n" + css(".vls-w03-" + id) + "\n";
    if (txt !== st.textContent) st.textContent = txt;
  }

  // ---------- scene engine ----------
  // def.visuals[v]() returns one SVG composition; def.frames[i] = [visual, stage, chip, highlightKey?] for narration line i.
  function scene(id, def) {
    var N = def.frames.length, root = null, chip = null, bar = null, vps = [], sts = [], hks = [], cv = -1, idx = -1, hl = [];
    function apply(i, inst) {
      var f = def.frames[i], v = f[0], s = f[1], k, e, show;
      root.classList.toggle("vx-inst", !!inst);
      if (v !== cv) { if (cv >= 0) vps[cv].classList.remove("on"); vps[v].classList.add("on"); cv = v; }
      var list = sts[v];
      for (k = 0; k < list.length; k++) {
        e = list[k]; show = s >= e.a && (e.e < 0 || s <= e.e);
        if (show !== e.on) { e.on = show; e.n.classList.toggle("on", show); if (show && !inst) e.n.classList.add("nw"); else e.n.classList.remove("nw"); }
      }
      for (k = 0; k < hl.length; k++) hl[k].classList.remove("hl");
      hl = f[3] && hks[v][f[3]] ? hks[v][f[3]] : [];
      for (k = 0; k < hl.length; k++) hl[k].classList.add("hl");
      chip.textContent = f[2];
      bar.style.width = Math.round(((i + 1) / N) * 1000) / 10 + "%";
      idx = i;
    }
    W.VL_SCENES[id] = {
      build: function (el) {
        if (!el || !DOC) return;
        installCss(id);
        root = DOC.createElement("div");
        root.className = "vls-w03 vls-w03-" + id;
        root.style.setProperty("--vx-chip", def.chip || C.navy);
        root.style.setProperty("--vx-bar", def.bar || C.coral);
        var svg = "";
        for (var v = 0; v < def.visuals.length; v++) svg += '<g class="vp" data-v="' + v + '">' + def.visuals[v]() + "</g>";
        root.innerHTML = '<div class="vx-hd"><span class="vx-chip" aria-live="polite"></span><span class="vx-pg" aria-hidden="true"><span class="vx-pgb"></span></span></div>' +
          '<svg class="vx-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(def.aria || id) + '">' + bg(def.bg) + svg + "</svg>";
        if (typeof el.replaceChildren === "function") el.replaceChildren(root); else { el.innerHTML = ""; el.appendChild(root); }
        chip = root.querySelector(".vx-chip"); bar = root.querySelector(".vx-pgb");
        vps = Array.prototype.slice.call(root.querySelectorAll(".vp"));
        sts = []; hks = []; cv = -1; idx = -1; hl = [];
        for (var j = 0; j < vps.length; j++) {
          sts.push(Array.prototype.map.call(vps[j].querySelectorAll(".st"), function (n) {
            var e = n.getAttribute("data-e");
            return { n: n, a: +n.getAttribute("data-s"), e: e == null ? -1 : +e, on: false };
          }));
          var hm = {};
          Array.prototype.forEach.call(vps[j].querySelectorAll(".hk"), function (n) { var k = n.getAttribute("data-h"); (hm[k] = hm[k] || []).push(n); });
          hks.push(hm);
        }
        apply(0, true);
      },
      step: function (i, n) {
        if (!root) return;
        var nn = isFinite(+n) && +n > 0 ? Math.floor(+n) : N, ii = isFinite(+i) ? Math.floor(+i) : 0;
        ii = Math.max(0, Math.min(nn - 1, ii));
        if (nn !== N) ii = Math.round((ii * (N - 1)) / Math.max(1, nn - 1));
        ii = Math.max(0, Math.min(N - 1, ii));
        if (ii === idx) return;
        apply(ii, false);
      },
      reset: function () { if (root) apply(0, true); }
    };
  }

  // ===================== W3O2b · A promise needs strategy, a baseline and an owner (27 lines, 10 visuals) =====================
  scene("W3O2b", {
    aria: "Method at Qasr and Noor: strategic alignment, benefits with baselines and owners, and governance after go-live",
    chip: C.plum, bar: C.green,
    frames: [
      [0, 0, "Installation celebrated"], [0, 1, "Every feature works"], [0, 2, "Yet the guest waits"],
      [1, 0, "Method: link to strategy"], [1, 1, "Strategic alignment"], [1, 2, "A linked idea is defended"], [1, 3, "Unlinked ideas get cut"],
      [2, 0, "Define the benefits"], [2, 1, "Arrival to ready room"], [2, 2, "Record a baseline"],
      [3, 0, "Before the build"], [3, 1, "“Later” means never"],
      [4, 0, "Each team measures a part"], [4, 1, "Nobody measures the wait"], [4, 2, "Measure the guest's wait"],
      [5, 0, "Noor promised −30%"], [5, 1, "4.1 h, target 2.87 h"], [5, 2, "Actual: 3.9 h"],
      [6, 0, "Only about 4.9%"], [6, 1, "The gap, not the reasons"],
      [7, 0, "A benefit owner stays"], [7, 1, "Go-live is a transition"],
      [8, 0, "Governance"], [8, 1, "Outlives the project team"], [8, 2, "Or results fade"],
      [9, 0, "A credible promise"], [9, 1, "Works, yet disappoints"]
    ],
    visuals: [
      // V0 · lines 0-2 · the committee celebrates a working installation while the guest still waits
      // template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
      function () {
        var conf = "", k, cc = [C.coral, C.amber, C.teal, C.plum, C.sky];
        for (k = 0; k < 10; k++) conf += R(30 + k * 36, 100 + (k % 3) * 14, 8, 12, cc[k % 5], 2);
        return S(0, CL("bk", conf) + person(100, 150, C.navy, 1, "happy") + person(160, 144, C.teal, 1, "happy") + person(240, 144, C.plum, 1, "happy") + person(300, 150, C.amber, 1, "happy") +
            R(60, 176, 280, 36, C.sand, 18, C.ink, 2) + T(200, 250, "Steering committee", 16, C.slate), 1) +
          S(0, pill(200, 60, "Suite installed!", C.green, C.white, 20), 0) +
          S(1, R(70, 26, 260, 100, C.white, 10, C.green, 2.5) + tick(92, 62, C.green, 0.9) + T(108, 68, "Every feature works", 16, C.ink, "start") +
            tick(92, 102, C.green, 0.9) + T(108, 108, "Vendor met its contract", 16, C.ink, "start")) +
          S(2, guest(80, 180, 1.2, "sad") + clock(180, 196, 30, C.coral, true) + T(180, 256, "Still too long", 16, C.coral) +
            T(310, 210, "?", 60, C.coral, "middle", 900) + T(310, 256, "Why?", 16, C.coral));
      },
      // V1 · lines 3-6 · method begins with strategic alignment: a linked improvement has a defender
      // template: Animated treemap — https://observablehq.com/@d3/animated-treemap
      function () {
        var shield = P("M64 130 l14 -6 l14 6 v12 q0 12 -14 18 q-14 -6 -14 -18 Z", C.navy, 2, C.ice);
        return pill(80, 26, "Leadership", C.mist, C.slate, 14) + pill(200, 26, "People", C.mist, C.slate, 14) + pill(316, 26, "Method", C.plum, C.white, 15) +
          S(0, card(80, 74, 240, 54, "1. Link to strategy", C.lilac, C.plum, C.ink, 18) + T(200, 170, "Every improvement serves", 16) + T(200, 194, "a declared objective", 16), 0) +
          S(1, card(100, 64, 200, 58, ["Strategic objective:", "Reliable hospitality"], C.white, C.navy, C.ink, 15) + card(24, 190, 160, 50, "Faster check-in", C.pale, C.green, C.ink, 16) +
            DP("M104 188 L168 124", C.green, 3.5) + T(150, 168, "serves", 14, C.green, "start")) +
          S(1, T(200, 282, "Alignment: it serves an objective", 15), 1) +
          S(2, person(36, 112, C.navy, 0.9, "happy") + shield + T(46, 176, "Defender", 14, C.navy) + L(0, 262, 400, 262, C.red, 3, ' stroke-dasharray="9 6"') + T(200, 286, "Budgets tighten", 15, C.red)) +
          S(3, card(226, 190, 154, 50, "Lobby screens", C.mist, C.grey, C.slate, 16) + TL(304, 150, ["No objective,", "no defender"], 14, C.red) + cross(303, 215, C.red, 2.4));
      },
      // V2 · lines 7-9 · a benefit is measurable: arrival to ready room, with a recorded baseline
      // template: Easing Animations — https://observablehq.com/@d3/easing-animations
      function () {
        var ticks = "", k;
        for (k = 0; k <= 12; k++) ticks += L(80 + k * 20, 140, 80 + k * 20, k % 2 ? 150 : 158, C.ink, 2);
        return S(0, card(100, 48, 200, 64, ["Benefit =", "measurable gain"], C.sun, C.amber, C.ink, 18) + R(80, 136, 240, 32, C.white, 4, C.ink, 2) + ticks +
            T(200, 206, "Something you can count", 16, C.slate), 0) +
          S(1, T(200, 40, "A meaningful benefit", 17) + guest(42, 96, 0.9, "flat") + R(340, 70, 40, 72, C.amber, 3, C.ink, 2) + O(372, 108, 3, C.ink) +
            arrow(70, 170, 330, 170, C.ink, 3) + L(70, 160, 70, 180, C.ink, 3) + T(70, 200, "Guest arrives", 15) + T(386, 200, "Enters ready room", 15, C.ink, "end") + clock(200, 112, 28, C.navy, true)) +
          S(2, T(200, 120, "38", 18, C.navy) + pill(200, 252, "Baseline: 38 min today", C.navy, C.white, 16) + T(200, 288, "Later results compare to this", 14, C.slate));
      },
      // V3 · lines 10-11 · define, baseline and own the benefit before the build
      // template: Steps Infographic — https://elements.envato.com/steps-infographic-5NHT2YG
      function () {
        var st = ["Define", "Baseline", "Owner", "Build"], o = "", k;
        for (k = 0; k < 4; k++) { o += card(14 + k * 96, 96, 86, 52, st[k], k < 3 ? C.pale : C.navy, k < 3 ? C.green : C.ink, k < 3 ? C.ink : C.white, 16); if (k) o += arrow(100 + (k - 1) * 96, 122, 109 + (k - 1) * 96, 122, C.ink, 2); }
        var folder = P("M318 236 h20 l6 8 h30 v34 h-56 Z", C.ink, 2.5, C.white);
        return S(0, T(200, 62, "Before the build begins", 17) + o + P("M14 160 v8 h278 v-8", C.green, 3) + T(153, 192, "Benefits ready", 15, C.green)) +
          S(1, R(14, 212, 372, 76, C.rose, 10, C.red, 2) + T(28, 240, "“We'll identify benefits later”", 15, C.red, "start") +
            T(28, 270, "No benefits case when needed", 15, C.ink, "start") + folder + T(346, 268, "0", 16, C.red));
      },
      // V4 · lines 12-14 · departmental measures miss the guest's whole wait; the owner measures the outcome
      // template: Celonis Process Animation update — https://community.celonis.com/product-updates/what-s-new-in-the-celonis-platform-5560
      function () {
        var seg = R(30, 100, 110, 30, C.ice, 4, C.ink, 1.5) + R(140, 100, 70, 30, C.mist, 0, C.ink, 1.5) + R(210, 100, 90, 30, C.pale, 0, C.ink, 1.5) + R(300, 100, 70, 30, C.mist, 4, C.ink, 1.5);
        return S(0, T(30, 92, "Arrives", 15, C.ink, "start") + T(370, 92, "In room", 15, C.ink, "end") + seg + MV(330, 0, 4, O(30, 115, 8, C.plum)) +
            P("M30 142 v8 h110 v-8", C.navy, 3) + T(85, 174, "Reception", 14, C.navy) + P("M210 142 v8 h90 v-8", C.green, 3) + T(255, 174, "Housekeeping", 14, C.green)) +
          S(1, badge(85, 200, true, 0.8) + badge(255, 200, true, 0.8) + R(140, 100, 70, 30, C.rose, 0) + R(300, 100, 70, 30, C.rose, 4) + T(175, 121, "?", 18, C.red) + T(335, 121, "?", 18, C.red) +
            P("M30 76 v-8 h340 v8", C.red, 3) + T(200, 52, "Guest's whole wait: nobody", 15, C.red)) +
          S(2, DP("M30 232 H370", C.amber, 6) + L(30, 222, 30, 242, C.amber, 4) + L(370, 222, 370, 242, C.amber, 4) + T(200, 258, "The owner measures the guest's wait", 15, C.ink) +
            pill(200, 284, "Customer outcome", C.amber, C.white, 15));
      },
      // V5 · lines 15-17 · Noor: 4.1 hours, a promise of 2.87, an actual 3.9
      // template: Bar Chart Race — https://observablehq.com/@d3/bar-chart-race
      function () {
        var f = 36, b = 266;
        return S(0, card(60, 36, 280, 56, ["Promise: discharge time", "falls by 30%"], C.sun, C.amber, C.ink, 16) + L(40, b, 360, b, C.ink, 3)) +
          S(1, CL("gy", R(60, b - 4.1 * f, 70, 4.1 * f, C.navy, 4)) + T(95, b - 4.1 * f - 8, "4.1 h", 17, C.navy) + T(95, 288, "Before", 15) +
            R(165, b - 2.87 * f, 70, 2.87 * f, C.pale, 4, C.green, 3, ' stroke-dasharray="7 5"') + T(200, b - 2.87 * f - 8, "2.87 h", 17, C.green) + T(200, 236, "−30%", 16, C.green) + T(200, 288, "Target", 15)) +
          S(2, CL("gy", R(270, b - 3.9 * f, 70, 3.9 * f, C.coral, 4)) + T(305, b - 3.9 * f - 8, "3.9 h", 17, C.coral) + T(305, 236, "−0.2 h", 15, C.white) + T(305, 288, "Actual", 15));
      },
      // V6 · lines 18-19 · 0.2 ÷ 4.1 ≈ 4.9% against 30%; numbers show the gap, not its causes
      // template: Modern Data Infographics templates — https://motionarray.com/after-effects-templates/infographics/
      function () {
        return S(0, T(200, 66, "0.2 ÷ 4.1 ≈ 4.9%", 30, C.navy, "middle", 900) + T(16, 142, "Promised", 15, C.ink, "start") + CL("gx", R(100, 120, 270, 34, C.green, 6)) +
            T(362, 143, "30%", 16, C.white, "end") + T(16, 192, "Achieved", 15, C.ink, "start") + CL("gx", R(100, 170, 44, 34, C.coral, 6)) + T(152, 193, "4.9%", 16, C.coral, "start")) +
          S(1, card(30, 224, 340, 58, ["The numbers show the gap,", "not the reasons"], C.white, C.ink, C.ink, 16) + CL("bk", T(250, 196, "?", 26, C.red) + T(300, 196, "?", 26, C.red) + T(350, 196, "?", 26, C.red)));
      },
      // V7 · lines 20-21 · a benefit owner stays after the project closes; go-live is a transition
      // template: Design process timeline - Animation — https://dribbble.com/shots/9892691-Design-process-timeline-Animation
      function () {
        return S(0, T(200, 46, "After the project closes", 17) + R(30, 90, 200, 36, C.navy, 6) + T(130, 113, "Software project", 15, C.white) + flag(232, 130, C.navy) +
            CL("gx", R(30, 150, 350, 30, C.amber, 6)) + T(205, 171, "Benefit owner stays responsible", 15, C.white)) +
          S(1, L(160, 70, 160, 214, C.coral, 3, ' stroke-dasharray="7 5"') + pill(160, 234, "Go-live", C.coral) + T(160, 284, "Transition, not result", 16, C.coral) +
            tick(340, 210, C.green) + T(340, 240, "Results", 15, C.green));
      },
      // V8 · lines 22-24 · governance: who decides, measures, acts; it must outlive the project team
      // template: Sankey With Animated Gradients — https://old.observablehq.com/@jarrettmeyer/sankey-with-animated-gradients
      function () {
        return S(0, L(200, 84, 100, 150, C.navy, 3, ' class="fl"') + L(200, 84, 300, 150, C.navy, 3, ' class="fl"') + L(170, 172, 230, 172, C.navy, 3, ' class="fl"') +
            card(130, 40, 140, 44, "Who decides", C.white, C.navy, C.ink, 15) + card(30, 150, 140, 44, "Who measures", C.white, C.navy, C.ink, 15) + card(230, 150, 140, 44, "Who acts", C.white, C.navy, C.ink, 15) +
            T(200, 126, "Governance", 18, C.navy), 1) +
          S(1, CL("fd", person(60, 236, C.slate, 0.8) + person(92, 240, C.slate, 0.8) + person(124, 236, C.slate, 0.8)) + T(92, 288, "Project team leaves", 14, C.slate) +
            T(290, 254, "Governance stays", 16, C.green) + badge(290, 222, true, 0.9), 1) +
          S(2, T(200, 40, "Without governance", 18, C.red) + L(30, 250, 370, 250, C.ink, 2.5) + DP("M30 224 L120 120 L180 112 L240 150 L300 200 L370 228", C.red, 4) +
            T(120, 100, "Improved", 15, C.green) + T(330, 190, "Old habits", 15, C.red) + T(200, 280, "Managers move, habits return", 15));
      },
      // V9 · lines 25-26 · a credible promise; a perfect installation can still disappoint
      // template: Process Infographics — https://elements.envato.com/process-infographics-FYE5ZGW
      function () {
        var rows = ["Linked to strategy", "Benefit named early", "Governed afterwards"], o = "", k;
        for (k = 0; k < 3; k++) o += card(30, 50 + k * 66, 340, 52, rows[k], C.pale, C.green, C.ink, 17) + badge(344, 76 + k * 66, true, 0.85);
        return S(0, o, 0) +
          S(1, T(200, 40, "A perfect installation...", 17) + monitor(30, 66, 150, 100, C.pale) + tick(105, 116, C.green, 1.6) + T(105, 214, "Works perfectly", 15, C.green) +
            guest(280, 116, 1.4, "sad") + clock(340, 86, 18, C.coral, true) + T(300, 214, "Still disappointed", 15, C.red) + T(200, 270, "Foundations make the difference", 15));
      }
    ]
  });

  // ===================== W3O2c · Five ways a promising programme falls apart (28 lines, 10 visuals) =====================
  (function () {
    var eye = function (x, y) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="11" ry="7" fill="' + C.white + '" stroke="' + C.ink + '" stroke-width="2"/>' + O(x, y, 3.5, C.ink); };
    var root = function (x, y) { return L(x, y - 8, x, y + 2, C.amber, 3) + P("M" + x + " " + (y + 2) + " l-8 8 M" + x + " " + (y + 2) + " l8 8 M" + x + " " + (y + 2) + " v9", C.amber, 2.5); };
    var note = function (x, y) { return R(x, y, 28, 34, C.sun, 2, C.amber, 2) + L(x + 6, y + 10, x + 22, y + 10, C.amber, 2) + L(x + 6, y + 18, x + 22, y + 18, C.amber, 2) + L(x + 6, y + 26, x + 18, y + 26, C.amber, 2); };
    scene("W3O2c", {
      aria: "Five failure patterns of BPM programmes, each traced from a visible symptom to a missing success factor",
      chip: C.red, bar: C.amber,
      frames: [
        [0, 0, "When conditions are absent"], [0, 1, "Five failure patterns"],
        [1, 0, "A model nobody opens"], [1, 1, "Shelfware"], [1, 2, "Root: no owner needs it"],
        [2, 0, "Automate it as it is?"], [2, 1, "Duplicates, now automatic"], [2, 2, "The automated mess"],
        [3, 0, "One pilot improves"], [3, 1, "Then nothing follows"], [3, 2, "No process architecture"], [3, 3, "No governance, no next"],
        [4, 0, "Benefits evaporate"], [4, 1, "Claimed, budget unchanged"], [4, 2, "No baseline, owner, date"], [4, 3, "Noor: savings unproven"],
        [5, 0, "Rejected at go-live"], [5, 1, "Paper discharge lists"], [5, 2, "Change started too late"],
        [6, 0, "Symptoms trace to factors"], [6, 1, "Ownership and method"], [6, 2, "Governance and people"], [6, 3, "Fix the condition first"],
        [7, 0, "Predictable = preventable"],
        [8, 0, "Noor's evidence"], [8, 1, "Investigate, don't invent"],
        [9, 0, "A product can't prevent it"], [9, 1, "Conditions make it last"]
      ],
      visuals: [
        // V0 · lines 0-1 · missing success factors; five patterns, each with a sign and a root
        // template: Animated Process Infographic with Geometric Circles and Arrows — https://elements.envato.com/business-strategy-round-infographic-4-steps-templa-ZS2NQ92
        function () {
          var cards = "", pos = [[14, 40], [141, 40], [268, 40], [77, 140], [204, 140]], nm = [["Shelfware"], ["Automated", "mess"], ["Pilot never", "scales"], ["Benefits", "evaporate"], ["Rejected at", "go-live"]], k;
          for (k = 0; k < 5; k++) {
            var x = pos[k][0], y = pos[k][1];
            cards += R(x, y, 118, 88, C.white, 10, C.red, 2.5) + TL(x + 59, y + (nm[k].length === 1 ? 34 : 26), nm[k], 15, C.ink, 17) + eye(x + 32, y + 70) + root(x + 86, y + 68);
          }
          return S(0, CL("sh", P("M40 104 L200 46 L360 104 Z", C.ink, 2.5, C.sun)) + T(200, 94, "Programme", 15) +
              R(56, 112, 70, 110, "none", 6, C.grey, 2, ' stroke-dasharray="6 6"') + R(165, 112, 70, 110, "none", 6, C.grey, 2, ' stroke-dasharray="6 6"') + R(274, 112, 70, 110, "none", 6, C.grey, 2, ' stroke-dasharray="6 6"') +
              T(91, 172, "Leader", 14, C.grey) + T(200, 172, "People", 14, C.grey) + T(309, 172, "Method", 14, C.grey) + T(200, 262, "When success factors are missing", 16, C.red), 0) +
            S(1, cards + eye(110, 262) + T(128, 267, "Visible sign", 15, C.ink, "start") + root(250, 258) + T(266, 267, "Root cause", 15, C.ink, "start"));
        },
        // V1 · lines 2-4 · shelfware: a model nobody opens, because nobody needs it to manage
        // template: Motion Graphics: Design Thinking Process — https://www.behance.net/gallery/108659899/Motion-Graphics-Design-Thinking-Process
        function () {
          var books = "", k, cc = [C.sky, C.coral, C.teal, C.amber, C.plum, C.navy];
          for (k = 0; k < 6; k++) books += R(76 + k * 22, 52, 18, 58, cc[k], 2) + R(76 + k * 22, 132, 18, 58, cc[5 - k], 2);
          var dust = CL("bk", O(232, 36, 2.5, C.grey) + O(262, 30, 2, C.grey) + O(280, 40, 2.5, C.grey) + O(246, 46, 2, C.grey));
          return S(0, monitor(110, 46, 180, 120, C.white) + R(128, 92, 36, 26, C.lilac, 4, C.plum, 2) + R(182, 92, 36, 26, C.lilac, 4, C.plum, 2) + R(236, 92, 36, 26, C.lilac, 4, C.plum, 2) +
              arrow(164, 105, 181, 105, C.plum, 2) + arrow(218, 105, 235, 105, C.plum, 2) + dust + T(200, 220, "Opened: 0 times", 20, C.red) + T(200, 250, "Beautiful, and unused", 15, C.slate), 0) +
            S(1, books + R(60, 110, 280, 10, C.amber, 2) + R(60, 190, 280, 10, C.amber, 2) + R(220, 40, 76, 70, C.lilac, 4, C.plum, 2.5) + T(258, 80, "Model", 15, C.plum) + dust +
              T(200, 246, "Shelfware", 26, C.slate, "middle", 900) + T(200, 274, "like an unread book", 15, C.slate), 1) +
            S(2, card(110, 36, 180, 46, "Unused model", C.mist, C.slate, C.ink, 16) + eye(130, 59) + L(20, 108, 380, 108, C.amber, 3) + T(30, 140, "Root cause", 15, C.amber, "start") +
              DP("M200 84 L200 120 L110 168 M200 120 L300 168", C.amber, 4) + card(20, 168, 180, 58, ["Modelling for", "its own sake"], C.rose, C.red, C.ink, 15) +
              card(214, 168, 172, 58, ["No owner", "needs it"], C.rose, C.red, C.ink, 15) + O(300, 254, 18, "none", C.grey, 2, ' stroke-dasharray="4 4"') + T(300, 260, "?", 16, C.grey));
        },
        // V2 · lines 5-7 · automating today's sequence keeps the duplicate: the automated mess
        // template: Factory Manufacturing Animation Pack — https://lottiefiles.com/marketplace/factory-manufacturing
        function () {
          var nm = [["Find", "booking"], ["Retype", "details"], ["Check", "rate"], ["Call", "rooms"], ["Hand", "key"]], o = L(20, 123, 380, 123, C.grey, 3), k;
          for (k = 0; k < 5; k++) o += card(14 + k * 76, 100, 68, 46, nm[k], k === 1 ? C.rose : C.white, k === 1 ? C.red : C.ink, C.ink, 14);
          return S(0, T(200, 64, "Today's check-in, as it stands", 16) + o, 1) +
            S(1, SPIN(60, 214, gear(60, 214, 28, C.amber), 1.2) + T(60, 268, "Automated", 15, C.amber) + L(20, 92, 380, 92, C.mist, 4) + MV(340, 0, 0.9, O(24, 92, 7, C.amber)) + MV(340, 0, 0.9, O(24, 92, 7, C.amber), 0.45) +
              pill(128, 168, "Still there", C.red, C.white, 14) + T(240, 226, "Duplicate entry,", 16, C.red) + T(240, 250, "now automatic", 16, C.red), 1) +
            S(2, T(200, 44, "Automated mess", 24, C.red, "middle", 900) + DP("M50 140 Q200 64 345 140", C.red, 3.5) + P("M345 140 l-14 -3 l7 -10 Z", C.red, 1, C.red) +
              pill(50, 162, "Start", C.mist, C.ink) + pill(145, 162, "Understand", C.mist, C.grey) + pill(250, 162, "Innovate", C.mist, C.grey) + pill(345, 162, "Develop", C.navy) +
              L(96, 162, 194, 162, C.red, 2.5) + L(208, 162, 292, 162, C.red, 2.5) + T(200, 228, "A faster bad process", 19, C.red) + T(200, 262, "Understand and Innovate skipped", 15, C.slate));
        },
        // V3 · lines 8-11 · a pilot that never scales: no architecture map, no governance, momentum stops
        // template: Animated treemap — https://observablehq.com/@d3/animated-treemap
        function () {
          var nm = ["Check-in", "Housekeeping", "Billing", "Reservations", "Revenue", "Maintenance", "Events", "Purchasing", "HR"], o = "", links = "", k;
          for (k = 0; k < 9; k++) {
            var x = 40 + (k % 3) * 110, y = 44 + Math.floor(k / 3) * 62;
            o += k ? card(x, y, 100, 50, nm[k], C.mist, C.grey, C.slate, 14) : "";
            if (k % 3 < 2) links += L(x + 100, y + 25, x + 110, y + 25, C.navy, 3);
            if (k < 6) links += L(x + 50, y + 50, x + 50, y + 62, C.navy, 3);
          }
          return S(0, o + card(40, 44, 100, 50, "Check-in", C.pale, C.green, C.ink, 15) + badge(134, 48, true, 0.7)) +
            S(0, T(200, 256, "One process improves beautifully", 15), 0) +
            S(1, DP("M140 69 L150 69", C.slate, 3) + DP("M90 94 L90 106", C.slate, 3) + T(244, 56, "?", 18, C.red) + T(354, 56, "?", 18, C.red) + T(134, 118, "?", 18, C.red) +
              T(200, 256, "...and nothing follows", 15, C.red), 1) +
            S(2, links + T(200, 256, "Process architecture: the full map", 15, C.navy), 2) +
            S(3, links + stamp(200, 240, "Momentum stops", C.red, 17) + T(200, 286, "No map, no governance: what next?", 14, C.red));
        },
        // V4 · lines 12-15 · benefits evaporate: claimed savings, unchanged budget, nothing agreed to measure
        // template: Modern Data Infographics templates — https://motionarray.com/after-effects-templates/infographics/
        function () {
          var vap = function (x, d) { return MV(0, -60, 2.6, P("M" + x + " 146 q-8 -10 0 -20 t0 -20", C.grey, 3), d); };
          var rows = ["Baseline", "Owner", "Measurement date"], o = "", k;
          for (k = 0; k < 3; k++) o += card(60, 44 + k * 64, 280, 50, rows[k], C.white, C.grey, C.ink, 17) + R(76, 56 + k * 64, 26, 26, C.white, 4, C.red, 2, ' stroke-dasharray="4 3"') + badge(316, 69 + k * 64, false, 0.8);
          return S(0, R(150, 150, 100, 60, C.sun, 8, C.amber, 2.5) + T(200, 186, "Savings", 17) + vap(175, 0) + vap(200, 0.8) + vap(225, 1.6) +
              T(200, 250, "Benefits evaporate", 22, C.slate, "middle", 900) + T(200, 278, "ordinary, not dramatic", 15, C.slate), 0) +
            S(1, doc(30, 48, 130, 160, C.white, 0) + T(95, 96, "Report", 16) + T(95, 136, "Savings", 16, C.green) + T(95, 158, "claimed", 16, C.green) + tick(95, 186, C.green) +
              T(290, 52, "Budget", 16) + CL("gy", R(222, 70, 56, 150, C.navy, 4)) + CL("gy", R(302, 70, 56, 150, C.navy, 4)) + T(290, 150, "=", 26, C.ink) +
              T(250, 244, "Before", 14) + T(330, 244, "After", 14) + T(200, 284, "Budget stays the same", 16, C.red), 1) +
            S(2, o + T(200, 270, "Nothing agreed, nothing shown", 16, C.red), 2) +
            S(3, hosp(60, 150, 1.1) + card(110, 44, 260, 60, ["Noor promised", "30% faster discharge"], C.sun, C.amber, C.ink, 16) + T(240, 164, "Savings shown:", 20) +
              T(240, 216, "none", 40, C.red, "middle", 900) + T(200, 270, "Nobody can show the benefit", 15, C.slate));
        },
        // V5 · lines 16-18 · rejection at go-live: workarounds within weeks; change began too late
        // template: Design process timeline - Animation — https://dribbble.com/shots/9892691-Design-process-timeline-Animation
        function () {
          var wk = "", k;
          for (k = 1; k <= 4; k++) wk += L(70 + k * 70, 164, 70 + k * 70, 176, C.ink, 2) + T(70 + k * 70, 196, "Week " + k, 14, C.slate);
          return S(0, T(200, 40, "Rejection at go-live", 20, C.red) + L(40, 170, 370, 170, C.ink, 3) + flag(60, 170, C.coral) + T(60, 196, "Go-live", 15) + wk +
              note(196, 120) + note(266, 120) + note(266, 82) + note(336, 120) + note(336, 82) + note(336, 44) + T(200, 250, "Workarounds within weeks", 16, C.amber), 0) +
            S(1, monitor(30, 56, 160, 110, C.ice) + T(110, 106, "New screen", 16, C.navy) + T(110, 130, "no warning", 14, C.red) + T(116, 216, "Arrived without preparation", 14) +
              person(262, 116, C.teal, 1.3, "flat") + R(290, 142, 46, 60, C.white, 3, C.ink, 2) + L(298, 156, 328, 156, C.grey, 2) + L(298, 168, 328, 168, C.grey, 2) + L(298, 180, 320, 180, C.grey, 2) +
              T(300, 240, "Paper discharge lists", 15, C.amber) + T(200, 278, "Noor's nurses", 15, C.slate), 1) +
            S(2, T(30, 88, "What happened", 15, C.red, "start") + R(300, 98, 70, 28, C.red, 6) + T(335, 117, "Late", 14, C.white) + T(30, 166, "What was needed", 15, C.green, "start") +
              CL("gx", R(40, 176, 330, 28, C.green, 6)) + T(205, 195, "Change work from week 1", 14, C.white) + L(40, 236, 370, 236, C.ink, 2.5) +
              T(40, 260, "Week 1", 14, C.ink, "start") + L(300, 228, 300, 244, C.ink, 2.5) + T(300, 260, "Go-live", 14));
        },
        // V6 · lines 19-22 · every symptom traces to a missing success factor
        // template: Animated Sankey — https://old.observablehq.com/@chekos/animated-sankey
        function () {
          var sy = ["Shelfware", "Automated mess", "Benefits evaporate", "Stalled pilot", "Go-live rejection"], o = "", k;
          for (k = 0; k < 5; k++) o += card(14, 48 + k * 44, 160, 36, sy[k], C.white, C.red, C.ink, 15);
          var cause = function (k, t, c) { return card(226, 48 + k * 44, 160, 36, t, C.pale, c, C.ink, 15); };
          var link = function (a, b) { return DP("M174 " + (66 + a * 44) + " C200 " + (66 + a * 44) + " 200 " + (66 + b * 44) + " 226 " + (66 + b * 44), C.navy, 3); };
          return S(0, T(94, 34, "Visible symptom", 15, C.red) + T(306, 34, "Missing factor", 15, C.green) + o) +
            S(0, CL("bk", T(306, 160, "?", 40, C.grey, "middle", 900)), 0) +
            S(1, cause(0, "No ownership", C.green) + cause(1, "Skipped method", C.green) + link(0, 0) + link(2, 0) + link(1, 1)) +
            S(2, cause(3, "No governance", C.green) + cause(4, "People too late", C.green) + link(3, 3) + link(4, 4)) +
            S(3, R(0, 268, 400, 32, C.navy, 0) + T(200, 290, "Fix the condition before buying tech", 15, C.white));
        },
        // V7 · line 23 · predictable patterns are preventable
        // template: Process Infographic Widget — https://elements.envato.com/process-infographic-widget-C3TVD9H
        function () {
          var sh = "", k;
          for (k = 0; k < 5; k++) { var x = 60 + k * 70; sh += P("M" + (x - 22) + " 146 l22 -10 l22 10 v20 q0 22 -22 32 q-22 -10 -22 -32 Z", C.green, 2.5, C.pale) + tick(x + 1, 170, C.green, 0.9); }
          return S(0, T(200, 66, "Predictable", 24, C.slate, "middle", 900) + arrow(200, 80, 200, 104, C.ink, 3) + T(200, 128, "so preventable", 18, C.green) + CL("pl", sh) +
            T(200, 248, "Encouraging news for managers", 16) + T(200, 276, "Build the conditions early", 15, C.slate));
        },
        // V8 · lines 24-25 · Noor's facts versus possible patterns, linked only after checking
        // template: Celonis pink-dot case explanation — https://community.celonis.com/general-product-q-a-2/what-does-pink-dots-represent-in-process-explorer-when-we-press-icon-pl
        function () {
          var facts = ["Clinicians excluded", "Rules engine unused", "Dashboard unlinked", "3.9 h, not 2.87 h"], pats = ["Rejection?", "Shelfware?", "Evaporating?"], o = "", k;
          for (k = 0; k < 4; k++) o += card(14, 50 + k * 50, 180, 40, facts[k], C.white, C.navy, C.ink, 15);
          for (k = 0; k < 3; k++) o += card(236, 66 + k * 60, 150, 40, pats[k], C.sun, C.amber, C.ink, 15);
          var dl = function (a, b) { return L(194, 70 + a * 50, 236, 86 + b * 60, C.amber, 2.5, ' stroke-dasharray="6 5"'); };
          return S(0, T(104, 36, "Case facts", 16, C.navy) + T(311, 36, "Possible pattern", 16, C.amber) + o + dl(0, 0) + dl(1, 1) + dl(2, 1) + dl(3, 2) + T(215, 118, "?", 18, C.amber)) +
            S(1, CL("pl", mag(214, 150, 20, C.navy)) + stamp(200, 268, "Verify before claiming", C.red, 16));
        },
        // V9 · lines 26-27 · a good product cannot prevent the patterns; the organisation creates the conditions
        // template: Stripe Connect features — https://stripe.com/ae/connect/features
        function () {
          return S(0, T(200, 40, "Next: choosing a vendor", 17) + R(140, 100, 120, 80, C.ice, 10, C.navy, 2.5) + T(200, 146, "Good product", 16, C.navy) +
              warn(50, 84) + warn(50, 164) + warn(350, 84) + warn(350, 164) + warn(200, 72) + T(200, 230, "Cannot prevent the 5 patterns alone", 15, C.red), 0) +
            S(1, O(200, 140, 92, "none", C.green, 2.5, ' stroke-dasharray="7 6"') + monitor(160, 110, 80, 52, C.ice) + pill(200, 52, "Sponsor", C.navy) + pill(84, 140, "Owner", C.amber) +
              pill(318, 140, "Governance", C.plum) + pill(200, 230, "Prepared people", C.teal) + T(200, 272, "The organisation creates the conditions", 15, C.green));
        }
      ]
    });
  })();

  // ===================== W3O3a · When a beautiful demonstration becomes the design (28 lines, 8 visuals) =====================
  scene("W3O3a", {
    aria: "Qasr's vendor choice: define the to-be process first, then test each suite with the hardest real case",
    chip: C.navy, bar: C.teal,
    frames: [
      [0, 0, "Qasr's steering committee"], [0, 1, "Three vendors, one meeting"], [0, 2, "Something is missing"],
      [1, 0, "Three directors"], [1, 1, "IT: integration"], [1, 2, "Ops: mobile check-in"], [1, 3, "Finance: change cost"], [1, 4, "All legitimate"],
      [2, 0, "The programme director"], [2, 1, "No to-be process yet"], [2, 2, "The demo does the design"],
      [3, 0, "A smooth mobile demo"], [3, 1, "The easy demo guest"], [3, 2, "Her case: never shown"],
      [4, 0, "Outline the to-be first"], [4, 1, "Process requirements"], [4, 2, "Score needs, not features"], [4, 3, "Features need a purpose"],
      [5, 0, "“We fit you closely”"], [5, 1, "Today's process failed her"], [5, 2, "Fit keeps what should go"], [5, 3, "Fit helps only good ones"],
      [6, 0, "Test the hardest case"], [6, 1, "The early corporate guest"], [6, 2, "Watch each suite cope"],
      [7, 0, "Demos still help"], [7, 1, "From design to test"], [7, 2, "Evidence over attraction"]
    ],
    visuals: [
      // V0 · lines 0-2 · the committee, three suites, a decision due, a missing piece
      // template: Animated Planning Dashboard Workflow — https://dribbble.com/shots/27184988-Animated-Planning-Dashboard-Workflow
      function () {
        var ppl = person(96, 128, C.navy, 1) + person(148, 120, C.teal, 1) + person(200, 116, C.plum, 1) + person(252, 120, C.amber, 1) + person(304, 128, C.sky, 1);
        return S(0, T(200, 52, "Qasr Hospitality Group", 18) + T(200, 76, "Steering committee", 15, C.slate) + ppl + R(70, 150, 260, 44, C.sand, 22, C.ink, 2)) +
          S(0, T(200, 240, "Choosing a BPM suite", 16), 0) +
          S(1, card(40, 212, 96, 44, "Suite A", C.ice, C.navy, C.ink, 16) + card(152, 212, 96, 44, "Suite B", C.ice, C.navy, C.ink, 16) + card(264, 212, 96, 44, "Suite C", C.ice, C.navy, C.ink, 16) +
            R(316, 92, 70, 50, C.white, 6, C.ink, 2) + R(316, 92, 70, 14, C.red, 4) + T(351, 124, "Decide", 14, C.red)) +
          S(2, CL("pl", R(176, 148, 48, 48, C.white, 6, C.coral, 3, ' stroke-dasharray="6 4"') + T(200, 182, "?", 28, C.coral, "middle", 900)) + T(200, 284, "Something is missing", 16, C.coral));
      },
      // V1 · lines 3-7 · IT, operations and finance each favour a different strength
      // template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
      function () {
        return S(0, person(70, 66, C.navy, 1.2) + person(200, 66, C.amber, 1.2) + person(330, 66, C.green, 1.2) + T(70, 130, "IT", 16) + T(200, 130, "Operations", 16) + T(330, 130, "Finance", 16)) +
          S(0, T(200, 250, "Three directors, three views", 16), 0) +
          S(1, card(14, 150, 112, 70, ["Best", "integration"], C.ice, C.navy, C.ink, 15) + L(40, 236, 100, 236, C.navy, 4, ' class="fl"')) +
          S(2, phone(170, 146, 60, 92, C.white) + tick(200, 196, C.green, 1) + T(200, 258, "Mobile check-in", 14)) +
          S(3, card(274, 150, 112, 70, ["Change cost", "in 4 years"], C.pale, C.green, C.ink, 15)) +
          S(4, badge(100, 46, true, 0.8) + badge(230, 46, true, 0.8) + badge(360, 46, true, 0.8) + T(200, 286, "All legitimate", 17, C.green));
      },
      // V2 · lines 8-10 · no to-be process is written, so the demonstration does the design
      // template: Outline - Explainer Kit — https://motionarray.com/after-effects-templates/outline-explainer-kit-36706/
      function () {
        var filled = R(244, 160, 82, 18, C.peach, 4, C.coral, 1.5) + R(244, 188, 82, 18, C.peach, 4, C.coral, 1.5) + R(244, 216, 82, 18, C.peach, 4, C.coral, 1.5);
        return S(0, person(70, 120, C.plum, 1.4, "flat") + T(80, 206, "Programme director", 14) + CL("pl", mag(70, 150, 12, C.plum))) +
          S(0, bubble(150, 44, 220, 52, "What process, exactly?", C.sun, 15), 0) +
          S(1, doc(230, 126, 110, 130, C.white, 0) + T(285, 150, "To-be", 18, C.green)) +
          S(1, stamp(285, 206, "Not written", C.red, 16), 1) +
          S(2, phone(140, 50, 60, 96, C.ink) + arrow(204, 104, 236, 150, C.coral, 3) + filled + pill(200, 282, "Vendor designs Qasr", C.red));
      },
      // V3 · lines 11-13 · the demo guest was easy; our traveller's case never appeared
      // template: Product Workflow Animation & UI Motion Design — https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design
      function () {
        var rowsA = ["Clean booking", "Standard rate", "Room ready"], rowsB = ["Corporate rate", "Room not ready"], a = "", b = "", k;
        for (k = 0; k < 3; k++) a += tick(36, 110 + k * 40, C.green, 0.8) + T(52, 116 + k * 40, rowsA[k], 15, C.ink, "start");
        for (k = 0; k < 2; k++) b += cross(228, 112 + k * 40, C.red, 0.9) + T(242, 118 + k * 40, rowsB[k], 15, C.ink, "start");
        var steps = "";
        for (k = 0; k < 3; k++) steps += R(162, 70 + k * 44, 76, 34, C.mint, 6) + tick(200, 87 + k * 44, C.green, 0.7);
        return S(0, phone(150, 34, 100, 190, C.white) + steps + MV(0, 88, 2, O(225, 87, 8, "rgba(224,85,43,.4)")) + T(200, 256, "Smooth, for a reason", 16), 0) +
          S(1, R(16, 40, 176, 180, C.pale, 10, C.green, 2.5) + T(104, 72, "Demo guest", 17, C.green) + a) +
          S(2, R(208, 40, 176, 180, C.rose, 10, C.red, 2.5) + T(296, 72, "Our traveller", 17, C.red) + b + stamp(296, 196, "Never shown", C.red, 15) +
            T(200, 268, "The demo avoided her case", 16, C.red));
      },
      // V4 · lines 14-17 · outline the to-be, derive requirements, score vendors against them
      // template: Modern Process Infographic Steps Animation Template — https://elements.envato.com/steps-infographic-BUNKM3A
      function () {
        var st = ["Arrive", "Verify rate", "Room ready?", "Key"], o = "", k;
        for (k = 0; k < 4; k++) o += R(10 + k * 96, 66, 88, 44, C.white, 8, C.green, 2.5, ' stroke-dasharray="6 4"') + T(54 + k * 96, 93, st[k], 14);
        var req = ["R1 Read corporate rate", "R2 Show room status", "R3 Handle early arrival"], rq = "";
        for (k = 0; k < 3; k++) rq += card(60, 140 + k * 42, 280, 34, req[k], C.pale, C.green, C.ink, 15);
        var grid = T(270, 84, "A", 16) + T(320, 84, "B", 16) + T(370, 84, "C", 16);
        for (k = 0; k < 3; k++) grid += T(196, 124 + k * 44, "R" + (k + 1), 16, C.green, "start") + O(270, 118 + k * 44, 13, C.white, C.grey, 2) + O(320, 118 + k * 44, 13, C.white, C.grey, 2) + O(370, 118 + k * 44, 13, C.white, C.grey, 2);
        var feats = [["Rate lookup", 1], ["3D lobby tour", 0], ["Room status", 1], ["Chatbot", 0], ["Themes", 0], ["Early check-in", 1]], ft = "";
        for (k = 0; k < 6; k++) ft += card(20 + (k % 3) * 124, 120 + Math.floor(k / 3) * 64, 112, 46, feats[k][0], feats[k][1] ? C.pale : C.mist, feats[k][1] ? C.green : C.grey, feats[k][1] ? C.ink : C.slate, 14);
        return S(0, T(200, 44, "Outline the to-be first", 17) + o, 1) +
          S(0, arrow(200, 116, 200, 142, C.ink, 3) + pill(200, 164, "Then select", C.navy), 0) +
          S(1, rq, 1) +
          S(2, doc(20, 60, 120, 170, C.white, 9) + cross(80, 150, C.red, 3) + T(80, 256, "Feature list", 15, C.slate) + T(290, 50, "Score per need", 16, C.green) + grid +
            T(290, 256, "Judge against Qasr's needs", 14, C.green), 2) +
          S(3, pill(200, 60, "Serves a process need?", C.green, C.white, 15) + ft + T(200, 270, "Only then is it valuable", 16));
      },
      // V5 · lines 18-21 · "close fit" to a poor current process preserves the waiting
      // template: Workflow Animation — https://dribbble.com/shots/3791748-Workflow-Animation
      function () {
        var row = function (y, st) { var nm = ["Search", "Retype", "Call rooms"], o = "", k; for (k = 0; k < 3; k++) o += card(20 + k * 130, y, 100, 44, nm[k], k === 1 ? C.rose : C.white, k === 1 ? C.red : st, C.ink, 15) + (k ? arrow(120 + (k - 1) * 130, y + 22, 148 + (k - 1) * 130, y + 22, C.ink, 2) : ""); return o; };
        return S(0, person(70, 132, C.amber, 1.3, "happy") + T(70, 200, "Vendor", 15, C.amber) + bubble(130, 40, 250, 60, ["“We fit your current", "process closely!”"], C.sun, 15) +
            pill(255, 150, "Close fit", C.green, C.white, 17), 0) +
          S(1, T(200, 44, "Current process", 17) + row(64, C.ink)) +
          S(1, guest(180, 150, 1, "sad") + clock(240, 150, 16, C.coral, true) + T(200, 236, "This made her wait", 16, C.red), 1) +
          S(2, arrow(200, 112, 200, 150, C.amber, 3) + T(212, 136, "close fit copies", 14, C.amber, "start") + row(156, C.navy) +
            T(200, 236, "Keeps what should go", 16, C.red), 2) +
          S(3, card(30, 60, 160, 84, ["Good process", "+ close fit"], C.pale, C.green, C.ink, 16) + card(210, 60, 160, 84, ["Poor process", "+ close fit"], C.rose, C.red, C.ink, 16) +
            arrow(110, 148, 110, 172, C.ink, 3) + arrow(290, 148, 290, 172, C.ink, 3) + pill(110, 196, "Strength", C.green, C.white, 17) + pill(290, 196, "Risk", C.red, C.white, 17) +
            arrow(290, 262, 290, 222, C.red, 3) + T(290, 284, "Qasr is here", 15, C.red));
      },
      // V6 · lines 22-24 · every suite meets Qasr's hardest case: early, corporate rate, room not ready
      // template: Celonis Process Explorer animation — https://help.celonis.com/cpm46/en/process-components
      function () {
        var o = "", k, y;
        for (k = 0; k < 3; k++) { y = 52 + k * 66; o += R(60, y, 326, 56, k % 2 ? C.white : C.mist, 8, C.grey, 1.5) + T(34, y + 36, "ABC"[k], 24, C.navy, "middle", 900) + R(330, y + 8, 48, 40, "none", 6, C.slate, 2, ' stroke-dasharray="5 4"'); }
        var run = "", clip = "";
        for (k = 0; k < 3; k++) {
          y = 52 + k * 66;
          run += pill(170, y + 28, "Rate", C.ice, C.ink, 14) + pill(250, y + 28, "Room", C.ice, C.ink, 14) + MV(230, 0, 3.2, O(84, y + 28, 9, C.plum), k * 0.5);
          clip += R(340, y + 12, 28, 32, C.white, 3, C.ink, 2) + L(345, y + 22, 363, y + 22, C.grey, 2) + L(345, y + 30, 363, y + 30, C.grey, 2) + L(345, y + 38, 358, y + 38, C.grey, 2);
        }
        return S(0, T(200, 36, "Qasr's own hardest case", 17) + o) +
          S(1, run) + S(1, T(200, 270, "Early · corporate rate · room not ready", 14, C.plum), 1) +
          S(2, clip + T(200, 270, "Watch: steps, time, workarounds", 15, C.navy) + T(200, 292, "Far more than a flawless demo", 14, C.slate));
      },
      // V7 · lines 25-27 · demos stay useful, but now to test, not to design
      // template: Easing Graphs — https://observablehq.com/@d3/easing
      function () {
        return S(0, monitor(120, 36, 160, 106, C.ice) + R(140, 60, 50, 30, C.white, 4, C.navy, 2) + R(210, 60, 50, 30, C.white, 4, C.navy, 2) + CL("pl", mag(236, 108, 16, C.navy)) +
            pill(110, 206, "Capabilities", C.green) + pill(290, 206, "Limitations", C.amber) + T(200, 262, "Demos still reveal useful things", 15), 0) +
          S(1, card(30, 50, 340, 56, "Demo designs our process", C.rose, C.red, C.ink, 17) + L(60, 78, 340, 78, C.red, 3) + arrow(200, 112, 200, 146, C.ink, 3) +
            card(30, 152, 340, 56, "Demo tests our process", C.pale, C.green, C.ink, 17) + badge(354, 158, true, 0.8) + T(200, 262, "Same demo, new purpose", 16), 1) +
          S(2, L(200, 96, 200, 250, C.ink, 4) + P("M184 250 h32", C.ink, 6) + L(70, 84, 330, 128, C.ink, 4) + L(80, 86, 80, 112, C.slate, 2) + L(320, 126, 320, 156, C.slate, 2) +
            card(16, 112, 128, 50, ["Attractive", "software"], C.white, C.slate, C.ink, 15) + card(256, 156, 128, 54, ["Evidence of", "improvement"], C.pale, C.green, C.ink, 15) +
            T(200, 284, "Evidence wins", 18, C.green));
      }
    ]
  });

})();

// FILE w03-claude-v2-part3.js
// OPER621 · Week 3 · Animated teaching scenes, version 2 · part 3 of 3 (W3O3b, W3O3c, W3O2d)
// Contract: window.VL_SCENES[secId] = { build(el), step(i, n), reset() }; step(i) shows narration line i of the section.
// CSS lives in one <style id="vl-sc-w03">; every rule is scoped under .vls-w03-<secId>. Standalone: defines every helper it uses.
(function () {
  "use strict";
  // ---------- environment ----------
  // Motion uses CSS transitions and keyframes only (no layout reads, no per-step redraw);
  // window.gsap is not required. prefers-reduced-motion switches every animation off.
  var W = window, DOC = W.document;
  W.VL_SCENES = W.VL_SCENES || {};
  var SID = "vl-sc-w03";
  var C = {
    ink: "#14213d", navy: "#1f4e79", teal: "#16867a", mint: "#d6f2ea", coral: "#e0552b", peach: "#fde4d8",
    amber: "#d98a0b", sun: "#fff2c6", plum: "#6a4c93", lilac: "#ebe2f7", sky: "#3f86cf", ice: "#e3effb",
    green: "#2c8c55", pale: "#e0f4e7", red: "#c62f2f", rose: "#fbe1e1", slate: "#56677a", grey: "#a9b6c3",
    mist: "#edf1f5", white: "#ffffff", paper: "#fbf8f2", sand: "#f3ead6", skin: "#e9b98f"
  };

  // ---------- SVG string helpers (absolute coordinates; no wrapper transforms on animated groups) ----------
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function est(t, z) { return String(t).length * z * 0.56; }
  function T(x, y, s, z, c, a, w, ex) {
    z = z || 16; a = a || "middle";
    if (W.__vlw03T) W.__vlw03T.push([x, y, String(s).length, z, a, String(s)]);
    return '<text x="' + x + '" y="' + y + '" font-size="' + z + '" font-weight="' + (w || 800) + '" fill="' + (c || C.ink) +
      '" text-anchor="' + a + '"' + (ex || "") + ">" + esc(s) + "</text>";
  }
  function TL(x, y, arr, z, c, lh, a, w) { var o = ""; for (var i = 0; i < arr.length; i++) o += T(x, y + i * (lh || z * 1.2), arr[i], z, c, a, w); return o; }
  function R(x, y, w, h, f, rx, st, sw, ex) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx == null ? 8 : rx) + '" fill="' + (f || "none") + '"' +
      (st ? ' stroke="' + st + '" stroke-width="' + (sw || 2) + '"' : "") + (ex || "") + "/>";
  }
  function O(cx, cy, r, f, st, sw, ex) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (f || "none") + '"' + (st ? ' stroke="' + st + '" stroke-width="' + (sw || 2) + '"' : "") + (ex || "") + "/>";
  }
  function L(x1, y1, x2, y2, c, w, ex) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (c || C.ink) + '" stroke-width="' + (w || 2) + '" stroke-linecap="round"' + (ex || "") + "/>";
  }
  function P(d, c, w, f, ex) {
    return '<path d="' + d + '" fill="' + (f || "none") + '" stroke="' + (c || "none") + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + (ex || "") + "/>";
  }
  // drawable path: strokes itself in when its stage appears
  function DP(d, c, w) { return P(d, c, w, "none", ' class="dr" pathLength="1"'); }
  // staged group: visible from stage a (to stage e when given)
  function S(a, inner, e) { return '<g class="st" data-s="' + a + '"' + (e != null ? ' data-e="' + e + '"' : "") + ">" + inner + "</g>"; }
  // highlight group: pulses when a frame names its key
  function H(k, inner) { return '<g class="hk" data-h="' + k + '">' + inner + "</g>"; }
  // looping CSS motion
  function MV(dx, dy, dur, inner, delay) {
    return '<g class="mv" style="--dx:' + dx + "px;--dy:" + dy + "px;animation-duration:" + (dur || 2.4) + "s" + (delay ? ";animation-delay:" + delay + "s" : "") + '">' + inner + "</g>";
  }
  function CL(cls, inner) { return '<g class="' + cls + '">' + inner + "</g>"; }
  function SPIN(cx, cy, inner, dur) { return '<g class="sp" style="transform-origin:' + cx + "px " + cy + "px" + (dur ? ";animation-duration:" + dur + "s" : "") + '">' + inner + "</g>"; }
  function arrow(x1, y1, x2, y2, c, w, cls) {
    c = c || C.ink; w = w || 3;
    var a = Math.atan2(y2 - y1, x2 - x1), h = 7 + w * 2, bx = x2 - Math.cos(a) * h * 0.8, by = y2 - Math.sin(a) * h * 0.8;
    var p1x = x2 - Math.cos(a) * h + Math.sin(a) * h * 0.55, p1y = y2 - Math.sin(a) * h - Math.cos(a) * h * 0.55;
    var p2x = x2 - Math.cos(a) * h - Math.sin(a) * h * 0.55, p2y = y2 - Math.sin(a) * h + Math.cos(a) * h * 0.55;
    var f = function (n) { return Math.round(n * 10) / 10; };
    return L(x1, y1, f(bx), f(by), c, w, cls ? ' class="' + cls + '"' : "") + '<path d="M' + f(x2) + " " + f(y2) + " L" + f(p1x) + " " + f(p1y) + " L" + f(p2x) + " " + f(p2y) + ' Z" fill="' + c + '"/>';
  }
  function card(x, y, w, h, t, f, st, tc, z) {
    z = z || 16; var lines = Array.isArray(t) ? t : [t], lh = z * 1.18, y0 = y + h / 2 - (lines.length - 1) * lh / 2 + z * 0.36;
    return R(x, y, w, h, f || C.white, 10, st || C.ink, 2.5) + TL(x + w / 2, y0, lines, z, tc || C.ink, lh);
  }
  function pill(cx, cy, t, f, tc, z) {
    z = z || 15; var w = Math.round(est(t, z) + 22);
    return R(cx - w / 2, cy - z * 0.95, w, Math.round(z * 1.9), f || C.ink, Math.round(z * 0.95)) + T(cx, cy + z * 0.36, t, z, tc || C.white);
  }
  function person(x, y, c, s, mood) {
    s = s || 1; c = c || C.navy;
    var r = 9 * s, o = O(x, y, r, C.skin) + P("M" + (x - r) + " " + (y - r * 0.2) + " Q" + x + " " + (y - r * 1.5) + " " + (x + r) + " " + (y - r * 0.2), c, 3 * s) +
      P("M" + (x - 14 * s) + " " + (y + 34 * s) + " Q" + (x - 14 * s) + " " + (y + 12 * s) + " " + x + " " + (y + 12 * s) + " Q" + (x + 14 * s) + " " + (y + 12 * s) + " " + (x + 14 * s) + " " + (y + 34 * s) + " Z", "none", 0, c);
    if (mood) {
      o += O(x - 3 * s, y - 1 * s, 1.3 * s, C.ink) + O(x + 3 * s, y - 1 * s, 1.3 * s, C.ink);
      o += mood === "sad" ? P("M" + (x - 3.5 * s) + " " + (y + 5 * s) + " Q" + x + " " + (y + 2 * s) + " " + (x + 3.5 * s) + " " + (y + 5 * s), C.ink, 1.4 * s)
        : mood === "flat" ? L(x - 3 * s, y + 4 * s, x + 3 * s, y + 4 * s, C.ink, 1.4 * s)
        : P("M" + (x - 3.5 * s) + " " + (y + 3 * s) + " Q" + x + " " + (y + 6.5 * s) + " " + (x + 3.5 * s) + " " + (y + 3 * s), C.ink, 1.4 * s);
    }
    return o;
  }
  function guest(x, y, s, mood) {
    s = s || 1;
    return person(x, y, C.plum, s, mood || "sad") + R(x + 15 * s, y + 18 * s, 13 * s, 17 * s, C.amber, 3 * s, C.ink, 1.5) + P("M" + (x + 18 * s) + " " + (y + 18 * s) + " v-4 h7 v4", C.ink, 1.5 * s);
  }
  function clock(x, y, r, c, spin) {
    c = c || C.coral;
    var hand = L(x, y, x, y - r * 0.72, c, 3);
    return O(x, y, r, C.white, c, 3) + L(x, y, x + r * 0.45, y, C.ink, 3) + (spin ? SPIN(x, y, hand, 3) : hand) + O(x, y, 2.5, C.ink);
  }
  function tick(x, y, c, s) { s = s || 1; return P("M" + (x - 9 * s) + " " + y + " l" + 6 * s + " " + 7 * s + " l" + 12 * s + " " + (-15 * s), c || C.green, 4 * s); }
  function cross(x, y, c, s) { s = s || 1; var k = 7 * s; return P("M" + (x - k) + " " + (y - k) + " L" + (x + k) + " " + (y + k) + " M" + (x + k) + " " + (y - k) + " L" + (x - k) + " " + (y + k), c || C.red, 4 * s); }
  function badge(x, y, ok, s) { s = s || 1; return O(x, y, 12 * s, ok ? C.green : C.red) + (ok ? tick(x + 1 * s, y + 1 * s, C.white, 0.8 * s) : cross(x, y, C.white, 0.75 * s)); }
  function phone(x, y, w, h, f) { return R(x, y, w, h, C.ink, 14) + R(x + 6, y + 16, w - 12, h - 30, f || C.white, 6) + R(x + w / 2 - 12, y + 6, 24, 4, C.slate, 2); }
  function monitor(x, y, w, h, f) { return R(x, y, w, h, C.ink, 8) + R(x + 6, y + 6, w - 12, h - 12, f || C.white, 4) + R(x + w / 2 - 8, y + h, 16, 10, C.slate, 0) + R(x + w / 2 - 26, y + h + 9, 52, 6, C.slate, 3); }
  function db(x, y, w, h, f, label, z) {
    var ry = 8;
    return P("M" + x + " " + (y + ry) + " v" + (h - 2 * ry) + " a" + w / 2 + " " + ry + " 0 0 0 " + w + " 0 v" + (-(h - 2 * ry)), C.ink, 2.5, f || C.ice) +
      '<ellipse cx="' + (x + w / 2) + '" cy="' + (y + ry) + '" rx="' + w / 2 + '" ry="' + ry + '" fill="' + C.white + '" stroke="' + C.ink + '" stroke-width="2.5"/>' +
      (label ? T(x + w / 2, y + h / 2 + 10, label, z || 14, C.ink) : "");
  }
  function doc(x, y, w, h, f, n) {
    var o = P("M" + x + " " + y + " h" + (w - 14) + " l14 14 v" + (h - 14) + " h" + (-w) + " Z", C.ink, 2.5, f || C.white);
    for (var i = 0; i < (n || 4); i++) o += L(x + 10, y + 24 + i * 12, x + w - 12, y + 24 + i * 12, C.grey, 3);
    return o;
  }
  function gear(x, y, r, f) {
    var d = "", n = 8;
    for (var i = 0; i < n * 2; i++) { var a = i * Math.PI / n, rr = i % 2 ? r * 0.78 : r; d += (i ? " L" : "M") + Math.round((x + Math.cos(a) * rr) * 10) / 10 + " " + Math.round((y + Math.sin(a) * rr) * 10) / 10; }
    return P(d + " Z", C.ink, 2, f || C.grey) + O(x, y, r * 0.32, C.white, C.ink, 2);
  }
  function hotel(x, y, w, h) {
    var o = R(x, y, w, h, C.sand, 4, C.ink, 2.5) + R(x - 6, y - 10, w + 12, 12, C.navy, 3);
    for (var r = 0; r < 3; r++) for (var c = 0; c < 4; c++) o += R(x + 10 + c * (w - 20) / 4, y + 12 + r * 22, (w - 20) / 4 - 8, 13, C.sky, 2);
    return o + R(x + w / 2 - 12, y + h - 26, 24, 26, C.amber, 3, C.ink, 2);
  }
  function hosp(x, y, s) {
    s = s || 1;
    return R(x - 26 * s, y - 30 * s, 52 * s, 42 * s, C.white, 4, C.ink, 2) + R(x - 5 * s, y - 24 * s, 10 * s, 24 * s, C.red, 1) + R(x - 12 * s, y - 17 * s, 24 * s, 10 * s, C.red, 1);
  }
  function lock(x, y, c) { c = c || C.ink; return P("M" + (x - 8) + " " + y + " v-8 a8 8 0 0 1 16 0 v8", c, 3) + R(x - 12, y, 24, 18, c, 3); }
  function mag(x, y, r, c) { c = c || C.ink; return O(x, y, r, "rgba(255,255,255,.55)", c, 4) + L(x + r * 0.72, y + r * 0.72, x + r * 1.6, y + r * 1.6, c, 6); }
  function warn(x, y, s, c) { s = s || 1; c = c || C.amber; return P("M" + x + " " + (y - 16 * s) + " L" + (x + 18 * s) + " " + (y + 14 * s) + " L" + (x - 18 * s) + " " + (y + 14 * s) + " Z", C.ink, 2, c) + T(x, y + 10 * s, "!", 18 * s, C.ink); }
  function flag(x, y, c) { return L(x, y, x, y - 40, C.ink, 3) + P("M" + x + " " + (y - 40) + " h26 l-6 8 l6 8 h-26 Z", "none", 0, c || C.coral); }
  function bubble(x, y, w, h, t, f, z, tail) {
    tail = tail == null ? -1 : tail;
    return R(x, y, w, h, f || C.white, 14, C.ink, 2) + P("M" + (x + w / 2 - 10) + " " + (y + h - 1) + " l" + (tail * 14 + 10) + " 16 l4 -16", C.ink, 2, f || C.white) +
      R(x + w / 2 - 12, y + h - 4, 26, 6, f || C.white, 0) + TL(x + w / 2, y + h / 2 + (z || 15) * 0.36 - ((Array.isArray(t) ? t.length : 1) - 1) * (z || 15) * 0.6, Array.isArray(t) ? t : [t], z || 15);
  }
  function bg(c1, c2) {
    return R(0, 0, 400, 300, c1 || C.paper, 0) + '<g opacity=".5">' + L(0, 284, 400, 284, c2 || C.sand, 2) + "</g>";
  }
  function stamp(x, y, t, c, z, rot) {
    z = z || 18; var w = Math.round(est(t, z) + 24);
    return '<g transform="rotate(' + (rot == null ? -8 : rot) + " " + x + " " + y + ')">' + R(x - w / 2, y - z, w, z * 1.9, "rgba(255,255,255,.85)", 6, c || C.red, 3.5) +
      '<text x="' + x + '" y="' + (y + z * 0.36) + '" font-size="' + z + '" font-weight="900" fill="' + (c || C.red) + '" text-anchor="middle" letter-spacing="1">' + esc(t) + "</text></g>";
  }

  // ---------- one shared <style id="vl-sc-w03">, every rule scoped under .vls-w03-<secId> ----------
  var KF = "@keyframes vlw03fade{from{opacity:0}to{opacity:1}}" +
    "@keyframes vlw03in{0%{transform:scale(.82) translateY(6px)}60%{transform:scale(1.05)}100%{transform:none}}" +
    "@keyframes vlw03draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}" +
    "@keyframes vlw03gx{from{transform:scaleX(0)}to{transform:none}}" +
    "@keyframes vlw03gy{from{transform:scaleY(0)}to{transform:none}}" +
    "@keyframes vlw03mv{0%{transform:translate(0,0);opacity:0}12%{opacity:1}82%{opacity:1}100%{transform:translate(var(--dx),var(--dy));opacity:0}}" +
    "@keyframes vlw03fl{to{stroke-dashoffset:-28}}" +
    "@keyframes vlw03pl{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}" +
    "@keyframes vlw03bk{0%,100%{opacity:1}50%{opacity:.3}}" +
    "@keyframes vlw03sh{0%,100%{transform:translateX(0)}25%{transform:translateX(-2px)}75%{transform:translateX(2px)}}" +
    "@keyframes vlw03sp{to{transform:rotate(360deg)}}" +
    "@keyframes vlw03fd{0%,30%{opacity:1}100%{opacity:.18}}";
  function css(sc) {
    var r = [
      "&{position:relative;display:flex;flex-direction:column;width:100%;height:100%;min-height:0;overflow:hidden;box-sizing:border-box;border-radius:14px;background:" + C.paper + ";color:" + C.ink + ";font-family:inherit}",
      "& *{box-sizing:border-box}",
      "& .vx-hd{flex:0 0 auto;display:flex;align-items:center;gap:10px;padding:8px 12px 4px;min-height:34px}",
      "& .vx-chip{flex:0 1 auto;max-width:86%;padding:5px 12px;border-radius:999px;font-size:14px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#fff;background:var(--vx-chip)}",
      "& .vx-pg{flex:1 1 auto;min-width:20px;height:5px;border-radius:3px;background:rgba(20,33,61,.12);overflow:hidden}",
      "& .vx-pgb{display:block;height:100%;width:0;border-radius:3px;background:var(--vx-bar);transition:width .5s ease}",
      "& .vx-svg{flex:1 1 0;display:block;width:100%;height:100%;min-height:150px}",
      "& .vx-svg text{font-family:inherit;pointer-events:none}",
      "& .vp{display:none}",
      "& .vp.on{display:inline;animation:vlw03fade .45s ease-out}",
      "& .st{opacity:0;transition:opacity .45s ease;transform-box:fill-box;transform-origin:50% 50%}",
      "& .st.on{opacity:1}",
      "& .st.nw{animation:vlw03in .6s cubic-bezier(.3,1.4,.5,1)}",
      "& .st .dr{stroke-dasharray:1 1;stroke-dashoffset:0}",
      "& .st.nw .dr{animation:vlw03draw 1.1s ease-out}",
      "& .st.nw .gx{transform-box:fill-box;transform-origin:0 50%;animation:vlw03gx .9s ease-out}",
      "& .st.nw .gy{transform-box:fill-box;transform-origin:50% 100%;animation:vlw03gy .9s ease-out}",
      "& .mv{animation:vlw03mv 2.4s ease-in-out infinite}",
      "& .fl{stroke-dasharray:7 7;animation:vlw03fl 1s linear infinite}",
      "& .pl{transform-box:fill-box;transform-origin:50% 50%;animation:vlw03pl 1.6s ease-in-out infinite}",
      "& .bk{animation:vlw03bk 1.3s ease-in-out infinite}",
      "& .sh{animation:vlw03sh .4s linear infinite}",
      "& .sp{transform-box:view-box;animation:vlw03sp 4s linear infinite}",
      "& .st.nw .fd{animation:vlw03fd 2.6s ease-in forwards}",
      "& .hk{transform-box:fill-box;transform-origin:50% 50%}",
      "& .hk.hl{animation:vlw03pl 1.2s ease-in-out infinite}",
      "& .hk.hl rect{stroke:" + C.coral + ";stroke-width:4}",
      "&.vx-inst .st,&.vx-inst .vx-pgb{transition:none!important}",
      "@media (max-width:420px){& .vx-chip{font-size:12.5px;letter-spacing:.02em;padding:4px 10px}& .vx-hd{padding:6px 10px 3px}}",
      "@media (prefers-reduced-motion:reduce){& *,& *::before,& *::after{animation:none!important;transition:none!important}}"
    ];
    return r.map(function (x) { return x.split("&").join(sc); }).join("\n");
  }
  function installCss(id) {
    if (!DOC || !DOC.head) return;
    var st = DOC.getElementById(SID);
    if (!st) { st = DOC.createElement("style"); st.id = SID; DOC.head.appendChild(st); }
    var txt = st.textContent || "";
    if (txt.indexOf("vlw03fade") < 0) txt += KF + "\n";
    var mark = "/* .vls-w03-" + id + " */";
    if (txt.indexOf(mark) < 0) txt += mark + "\n" + css(".vls-w03-" + id) + "\n";
    if (txt !== st.textContent) st.textContent = txt;
  }

  // ---------- scene engine ----------
  // def.visuals[v]() returns one SVG composition; def.frames[i] = [visual, stage, chip, highlightKey?] for narration line i.
  function scene(id, def) {
    var N = def.frames.length, root = null, chip = null, bar = null, vps = [], sts = [], hks = [], cv = -1, idx = -1, hl = [];
    function apply(i, inst) {
      var f = def.frames[i], v = f[0], s = f[1], k, e, show;
      root.classList.toggle("vx-inst", !!inst);
      if (v !== cv) { if (cv >= 0) vps[cv].classList.remove("on"); vps[v].classList.add("on"); cv = v; }
      var list = sts[v];
      for (k = 0; k < list.length; k++) {
        e = list[k]; show = s >= e.a && (e.e < 0 || s <= e.e);
        if (show !== e.on) { e.on = show; e.n.classList.toggle("on", show); if (show && !inst) e.n.classList.add("nw"); else e.n.classList.remove("nw"); }
      }
      for (k = 0; k < hl.length; k++) hl[k].classList.remove("hl");
      hl = f[3] && hks[v][f[3]] ? hks[v][f[3]] : [];
      for (k = 0; k < hl.length; k++) hl[k].classList.add("hl");
      chip.textContent = f[2];
      bar.style.width = Math.round(((i + 1) / N) * 1000) / 10 + "%";
      idx = i;
    }
    W.VL_SCENES[id] = {
      build: function (el) {
        if (!el || !DOC) return;
        installCss(id);
        root = DOC.createElement("div");
        root.className = "vls-w03 vls-w03-" + id;
        root.style.setProperty("--vx-chip", def.chip || C.navy);
        root.style.setProperty("--vx-bar", def.bar || C.coral);
        var svg = "";
        for (var v = 0; v < def.visuals.length; v++) svg += '<g class="vp" data-v="' + v + '">' + def.visuals[v]() + "</g>";
        root.innerHTML = '<div class="vx-hd"><span class="vx-chip" aria-live="polite"></span><span class="vx-pg" aria-hidden="true"><span class="vx-pgb"></span></span></div>' +
          '<svg class="vx-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(def.aria || id) + '">' + bg(def.bg) + svg + "</svg>";
        if (typeof el.replaceChildren === "function") el.replaceChildren(root); else { el.innerHTML = ""; el.appendChild(root); }
        chip = root.querySelector(".vx-chip"); bar = root.querySelector(".vx-pgb");
        vps = Array.prototype.slice.call(root.querySelectorAll(".vp"));
        sts = []; hks = []; cv = -1; idx = -1; hl = [];
        for (var j = 0; j < vps.length; j++) {
          sts.push(Array.prototype.map.call(vps[j].querySelectorAll(".st"), function (n) {
            var e = n.getAttribute("data-e");
            return { n: n, a: +n.getAttribute("data-s"), e: e == null ? -1 : +e, on: false };
          }));
          var hm = {};
          Array.prototype.forEach.call(vps[j].querySelectorAll(".hk"), function (n) { var k = n.getAttribute("data-h"); (hm[k] = hm[k] || []).push(n); });
          hks.push(hm);
        }
        apply(0, true);
      },
      step: function (i, n) {
        if (!root) return;
        var nn = isFinite(+n) && +n > 0 ? Math.floor(+n) : N, ii = isFinite(+i) ? Math.floor(+i) : 0;
        ii = Math.max(0, Math.min(nn - 1, ii));
        if (nn !== N) ii = Math.round((ii * (N - 1)) / Math.max(1, nn - 1));
        ii = Math.max(0, Math.min(N - 1, ii));
        if (ii === idx) return;
        apply(ii, false);
      },
      reset: function () { if (root) apply(0, true); }
    };
  }

  // ===================== W3O3b · The best fit today may cost the most to change (28 lines, 10 visuals) =====================
  (function () {
    var RL = ["Features", "Fit today", "Cost to change", "Custom code", "Trained in-house"];
    var VAL = [["Fewer", "Most", "Fewer"], ["Partial", "Close", "Partial"], ["Low", "High", "Low"], ["None", "Needed", "None"], ["Qasr", "Vendor", "Qasr"]];
    var BAD = { "High": 1, "Needed": 1, "Vendor": 1 };
    var pv = function (cx, cy, t) { return pill(cx, cy, t, BAD[t] ? C.red : C.green, C.white, 15); };
    scene("W3O3b", {
      aria: "Reading Exhibit 3: Vendor B wins on features and fit but loses on the cost to change after go-live",
      chip: C.amber, bar: C.navy,
      frames: [
        [0, 0, "Exhibit 3"], [0, 1, "Easy words to discuss"], [0, 2, "Read every row"],
        [1, 0, "B: most features"], [1, 1, "B: closest fit"], [1, 2, "B wins a simple count"],
        [2, 0, "Cost to change"], [2, 1, "After go-live: real guests"], [2, 2, "B high, A and C low"], [2, 3, "Change never stops"],
        [3, 0, "Custom code"], [3, 1, "Bent to fit today"], [3, 2, "Fit now, cost later"],
        [4, 0, "Ask about upgrades"], [4, 1, "Custom parts break"],
        [5, 0, "A new contract"], [5, 1, "A or C: staff adjust"], [5, 2, "B: wait for the vendor"],
        [6, 0, "Who is trained?"], [6, 1, "Every change is bought"],
        [7, 0, "Wins and losses"], [7, 1, "Keep today's process?"], [7, 2, "Qasr needs freedom"],
        [8, 0, "80% adopted beats 100%"], [8, 1, "Worked around = nothing"], [8, 2, "Noor: unused capability"],
        [9, 0, "Keep improving after"], [9, 1, "What matters later?", "cost"]
      ],
      visuals: [
        // V0 · lines 0-2 · Exhibit 3 as a legible table: few words per cell; read every row
        // template: Workflow Dashboard UI Motion Concept — https://dribbble.com/shots/27719715-SaaS-Dashboard-Workflow-UI-Motion-Concept
        function () {
          var g = R(150, 34, 240, 32, C.navy, 6) + T(200, 56, "A", 17, C.white) + T(280, 56, "B", 17, C.white) + T(360, 56, "C", 17, C.white) + T(12, 56, "Exhibit 3", 17, C.amber, "start"), v = "", k, j;
          for (k = 0; k < 5; k++) {
            g += R(8, 74 + k * 40, 384, 34, k % 2 ? C.white : C.mist, 6, C.grey, 1) + T(14, 96 + k * 40, RL[k], 14, C.ink, "start");
            for (j = 0; j < 3; j++) v += T(200 + j * 80, 96 + k * 40, VAL[k][j], 15, BAD[VAL[k][j]] ? C.red : C.ink);
          }
          return S(0, g) + S(1, v) + S(1, T(200, 290, "Complicated choices, a few words", 15, C.slate), 1) +
            S(2, R(146, 70, 4, 202, C.amber, 2) + MV(0, 160, 3.2, R(10, 74, 380, 34, "rgba(217,138,11,.18)", 6, C.amber, 2)) + T(200, 290, "The numbers carry the argument", 15, C.amber));
        },
        // V1 · lines 3-5 · at first glance B wins: most features, closest fit
        // template: Bar Chart Race, Explained — https://observablehq.com/@d3/bar-chart-race-explained
        function () {
          var fit = "", w = [150, 260, 150], k;
          for (k = 0; k < 3; k++) fit += T(30, 112 + k * 56, "ABC"[k], 22, C.navy, "middle", 900) + R(60, 90 + k * 56, 300, 34, C.mist, 6) +
            CL("gx", R(60, 90 + k * 56, w[k], 34, k === 1 ? C.green : C.sky, 6)) + T(70, 113 + k * 56, k === 1 ? "Close" : "Partial", 15, C.white, "start");
          return S(0, T(200, 40, "Feature count", 17) + L(40, 240, 360, 240, C.ink, 3) + CL("gy", R(80, 150, 60, 90, C.sky, 4)) + CL("gy", R(170, 90, 60, 150, C.green, 4)) +
              CL("gy", R(260, 150, 60, 90, C.sky, 4)) + T(110, 264, "A", 18) + T(200, 264, "B", 18) + T(290, 264, "C", 18) + T(200, 80, "Most", 16, C.green), 0) +
            S(1, T(200, 40, "Fit to current process", 17) + fit, 1) +
            S(2, card(60, 50, 280, 50, "Features → B", C.pale, C.green, C.ink, 18) + card(60, 116, 280, 50, "Fit today → B", C.pale, C.green, C.ink, 18) +
              pill(200, 222, "B wins on a simple count", C.navy, C.white, 16));
        },
        // V2 · lines 6-9 · the cost to change after go-live, when every change touches real guests
        // template: Design process timeline - Animation — https://dribbble.com/shots/9892691-Design-process-timeline-Animation
        function () {
          return S(0, card(30, 36, 340, 52, "Cost to change after go-live", C.sun, C.amber, C.ink, 17)) +
            S(1, L(30, 170, 370, 170, C.ink, 3) + flag(110, 170, C.coral) + T(110, 194, "Go-live", 15) + person(220, 140, C.plum, 0.7) + person(270, 140, C.plum, 0.7) + person(320, 140, C.plum, 0.7) +
              T(270, 120, "Real guests", 15, C.plum), 2) +
            S(2, card(30, 216, 100, 52, "A: Low", C.pale, C.green, C.ink, 17) + card(150, 216, 100, 52, "B: High", C.rose, C.red, C.ink, 17) + card(270, 216, 100, 52, "C: Low", C.pale, C.green, C.ink, 17)) +
            S(3, doc(60, 104, 40, 50, C.sun, 2) + T(80, 182, "Contracts", 14) + R(176, 112, 52, 32, C.sun, 6, C.amber, 2) + T(202, 133, "AED", 14) + T(202, 182, "Rates", 14) +
              person(320, 118, C.teal, 0.9) + T(320, 182, "Expectations", 14) + L(40, 196, 360, 196, C.slate, 2, ' stroke-dasharray="5 5"'));
        },
        // V3 · lines 10-12 · B needs custom code: it bends the product to today, and makes change expensive
        // template: Interactive Computer Assembly Sequence — https://codepen.io/karlhorning/pen/OJqNMVR
        function () {
          return S(0, card(20, 34, 360, 48, "Custom code for rate rules", C.sun, C.amber, C.ink, 17) + pv(80, 118, "None") + T(80, 150, "A", 16) + pv(200, 118, "Needed") + T(200, 150, "B", 16) +
              pv(320, 118, "None") + T(320, 150, "C", 16)) +
            S(1, R(30, 172, 110, 60, C.ice, 6, C.navy, 2.5) + T(85, 208, "Product", 15) + T(85, 256, "Standard", 15, C.slate) + arrow(150, 202, 190, 202, C.ink, 3) +
              R(220, 172, 110, 60, C.ice, 6, C.navy, 2.5) + R(330, 182, 26, 20, C.amber, 3) + R(196, 206, 24, 20, C.amber, 3) + R(250, 232, 30, 18, C.amber, 3) + T(275, 208, "Product", 15) +
              T(290, 276, "+ custom code", 15, C.amber), 1) +
            S(2, arrow(170, 166, 110, 196, C.green, 3) + arrow(230, 166, 290, 196, C.red, 3) + card(20, 200, 170, 58, ["Close fit", "today"], C.pale, C.green, C.ink, 16) +
              card(210, 200, 176, 58, ["Costly change", "later"], C.rose, C.red, C.ink, 16));
        },
        // V4 · lines 13-14 · at an upgrade, customised parts must be rebuilt and retested
        // template: Factory Manufacturing Animation Pack — https://lottiefiles.com/marketplace/factory-manufacturing
        function () {
          var blocks = function (x, broken) {
            return R(x, 96, 110, 110, C.ice, 8, C.navy, 2.5) + R(x + 12, 110, 38, 30, C.white, 4, C.navy, 2) + R(x + 60, 110, 38, 30, C.white, 4, C.navy, 2) + R(x + 12, 152, 38, 30, C.white, 4, C.navy, 2) +
              R(x + 60, 152, 38, 30, broken ? C.rose : C.amber, 4, broken ? C.red : C.amber, 2);
          };
          return S(0, T(200, 50, "What happens at an upgrade?", 17) + blocks(40, false) + T(95, 232, "Version 1", 15) + arrow(160, 150, 236, 150, C.ink, 3) +
              R(250, 96, 110, 110, "none", 8, C.slate, 2.5, ' stroke-dasharray="7 5"') + T(305, 162, "?", 36, C.slate, "middle", 900) + T(305, 232, "Version 2", 15)) +
            S(1, blocks(250, true) + tick(281, 125, C.green, 0.8) + tick(329, 125, C.green, 0.8) + tick(281, 167, C.green, 0.8) + cross(329, 167, C.red, 0.9) +
              T(200, 268, "Custom parts: rebuild, retest", 16, C.red));
        },
        // V5 · lines 15-17 · a rate rule must change in days: A or C adjust a setting; B waits for the vendor
        // template: Supply Chain Animation — https://www.behance.net/gallery/121206799/Supply-Chain-Animation
        function () {
          var q = "", k;
          for (k = 0; k < 3; k++) q += R(130 + k * 38, 202, 30, 26, C.grey, 4);
          var glass = P("M330 196 h24 l-12 16 l12 16 h-24 l12 -16 Z", C.ink, 2.5, C.sun);
          return S(0, T(200, 44, "New corporate contract", 17) + doc(50, 76, 70, 90, C.sun, 4) + arrow(130, 120, 166, 120, C.ink, 3) +
              card(172, 92, 200, 54, "Rate rule must change", C.white, C.ink, C.ink, 15) + T(272, 186, "within a few days", 16, C.red), 0) +
            S(1, R(14, 50, 372, 92, C.pale, 10, C.green, 2.5) + T(24, 76, "A or C: Qasr staff, a setting", 15, C.green, "start") + person(70, 104, C.teal, 0.8, "happy") +
              arrow(92, 112, 170, 112, C.green, 3) + card(176, 94, 110, 36, "Setting", C.white, C.green, C.ink, 15) + arrow(290, 112, 324, 112, C.green, 3) + badge(346, 112, true)) +
            S(2, R(14, 160, 372, 92, C.rose, 10, C.red, 2.5) + T(24, 186, "B: vendor specialists only", 15, C.red, "start") + q + CL("pl", R(244, 202, 30, 26, C.amber, 4)) + glass +
              T(200, 284, "The change waits", 16, C.red));
        },
        // V6 · lines 18-19 · who is trained afterwards decides who controls the process
        // template: Stripe Connect features — https://stripe.com/ae/connect/features
        function () {
          var key = function (x, y, c) { return O(x, y, 7, "none", c, 3) + L(x + 7, y, x + 24, y, c, 3) + L(x + 20, y, x + 20, y + 6, c, 3); };
          var inv = "", k;
          for (k = 0; k < 3; k++) inv += R(226 + k * 44, 214, 32, 42, C.white, 3, C.ink, 2) + T(242 + k * 44, 240, "AED", 11 + 3, C.red);
          return S(0, card(20, 32, 360, 48, "Staff trained in-house afterwards", C.sun, C.amber, C.ink, 16) +
              person(60, 128, C.teal, 0.9, "happy") + person(100, 128, C.teal, 0.9, "happy") + person(140, 128, C.teal, 0.9, "happy") + key(84, 186, C.teal) + T(105, 206, "A, C: Qasr staff", 15, C.teal) +
              person(300, 128, C.amber, 1.1) + key(290, 186, C.amber) + T(300, 206, "B: vendor only", 15, C.red)) +
            S(1, arrow(300, 170, 300, 208, C.red, 2.5) + inv + T(110, 244, "Each improvement", 15, C.red) + T(200, 288, "becomes a purchase", 15, C.red));
        },
        // V7 · lines 20-22 · B wins features and fit, loses cost to change; which matters depends on the process
        // template: Animated Process Infographic with Geometric Circles and Arrows — https://elements.envato.com/business-strategy-round-infographic-4-steps-templa-ZS2NQ92
        function () {
          return S(0, card(30, 40, 160, 80, ["B wins:", "features, fit"], C.pale, C.green, C.ink, 17) + card(210, 40, 160, 80, ["B loses:", "change cost"], C.rose, C.red, C.ink, 17)) +
            S(1, P("M200 150 L290 196 L200 242 L110 196 Z", C.ink, 2.5, C.sun) + T(200, 192, "Keep today's", 14) + T(200, 210, "process?", 14) +
              L(110, 196, 80, 196, C.ink, 2.5) + L(290, 196, 320, 196, C.ink, 2.5) + T(46, 190, "Yes:", 15, C.green) + T(46, 210, "fit", 14, C.green) + T(356, 190, "No:", 15, C.navy) + T(356, 210, "freedom", 14, C.navy)) +
            S(2, R(316, 170, 80, 52, "none", 10, C.navy, 3) + pill(300, 270, "Qasr: redesigning", C.navy, C.white, 15) + arrow(320, 252, 340, 226, C.navy, 3));
        },
        // V8 · lines 23-25 · 80% fit and adopted beats a perfect fit that is resisted; Noor's unused capability
        // template: Learn D3: Animation — https://observablehq.com/@d3/learn-d3-animation
        function () {
          return S(0, T(200, 40, "A useful rule", 17) + R(20, 64, 170, 24, C.mist, 6) + CL("gx", R(20, 64, 136, 24, C.green, 6)) + T(105, 116, "80% fit", 19) +
              person(65, 146, C.teal, 0.8, "happy") + person(105, 146, C.teal, 0.8, "happy") + person(145, 146, C.teal, 0.8, "happy") + T(105, 214, "Adopted", 17, C.green) + badge(160, 208, true, 0.7) +
              CL("gx", R(210, 64, 170, 24, C.green, 6)) + T(295, 116, "100% fit", 19) + person(255, 146, C.slate, 0.8, "sad") + person(295, 146, C.slate, 0.8, "sad") + person(335, 146, C.slate, 0.8, "sad") +
              T(295, 214, "Resisted", 17, C.red) + badge(352, 208, false, 0.7) + T(200, 266, "The adopted tool wins", 16, C.green), 0) +
            S(1, R(140, 80, 120, 80, C.ice, 8, C.navy, 2.5) + T(200, 126, "Perfect fit", 16, C.navy) + DP("M40 110 Q40 240 200 240 Q360 240 360 110", C.coral, 3.5) +
              person(40, 80, C.teal, 0.7) + person(360, 80, C.teal, 0.7) + T(200, 210, "Worked around", 16, C.red) + T(200, 284, "A tool nobody uses creates nothing", 15), 1) +
            S(2, hosp(70, 96, 1.2) + T(70, 136, "Noor", 16, C.teal) + card(150, 60, 236, 40, "Rules engine", C.mist, C.grey, C.slate, 15) + card(150, 110, 236, 40, "Dashboard", C.mist, C.grey, C.slate, 15) +
              card(150, 160, 236, 40, "Integration", C.mist, C.grey, C.slate, 15) + T(200, 250, "Capability, but no value", 17, C.red));
        },
        // V9 · lines 26-27 · choose the ability to keep improving; ask which row will matter later
        // template: Animated Sankey — https://old.observablehq.com/@chekos/animated-sankey
        function () {
          var rows = "", k;
          for (k = 0; k < 5; k++) rows += (k === 2 ? H("cost", card(40, 36 + k * 44, 320, 36, RL[k], C.sun, C.amber, C.ink, 15)) : card(40, 36 + k * 44, 320, 36, RL[k], C.white, C.grey, C.ink, 15));
          return S(0, O(130, 140, 64, "none", C.teal, 3, ' stroke-dasharray="6 6"') + SPIN(130, 140, O(130, 76, 7, C.teal), 4) + person(130, 128, C.teal, 1, "happy") + T(130, 236, "Qasr keeps improving", 15, C.teal) +
              R(316, 70, 60, 124, C.sand, 4, C.ink, 2.5) + R(316, 70, 22, 124, C.ink, 2) + MV(56, 0, 2.6, person(270, 120, C.amber, 0.9)) + T(320, 236, "Vendor goes home", 14, C.slate), 0) +
            S(1, rows + T(200, 282, "Which row will still matter?", 16));
        }
      ]
    });
  })();

  // ===================== W3O3c · What must happen before Qasr signs? (28 lines, 11 visuals) =====================
  (function () {
    var qh = function (n, t) { return pill(200, 22, "Question " + n + " · " + t, C.navy, C.white, 15); };
    scene("W3O3c", {
      aria: "Qasr's readiness check before signing: five questions, the hardest-case test and a live change test",
      chip: C.navy, bar: C.green,
      frames: [
        [0, 0, "Decision due next meeting"], [0, 1, "Recommendation expected"], [0, 2, "Pause before signing"], [0, 3, "A week vs a reversal"],
        [1, 0, "A readiness check"], [1, 1, "3 gaps = predictable fail"],
        [2, 0, "Named people, not titles"], [2, 1, "A name is accountable"],
        [3, 0, "Is there a baseline?"], [3, 1, "No baseline, no proof"],
        [4, 0, "Process maturity"], [4, 1, "Too big a jump"],
        [5, 0, "A plan for people"], [5, 1, "Or workarounds"],
        [6, 0, "Who governs after?"], [6, 1, "Governance outlives it"],
        [7, 0, "Hardest case, real staff"], [7, 1, "The early corporate guest"], [7, 2, "Exceptions matter"],
        [8, 0, "Four years ahead"], [8, 1, "Change a rule, live"], [8, 2, "What go-live means"],
        [9, 0, "Who, and how long?"], [9, 1, "Custom code exposed"],
        [10, 0, "Evidence opens the gate"], [10, 1, "Any vendor, if justified"], [10, 2, "The real achievement"], [10, 3, "Next: Noor Health"]
      ],
      visuals: [
        // V0 · lines 0-3 · decision due; a pause before signing costs far less than a reversal
        // template: Animated Planning Dashboard Workflow — https://dribbble.com/shots/27184988-Animated-Planning-Dashboard-Workflow
        function () {
          var ppl = person(100, 136, C.navy, 1) + person(160, 128, C.teal, 1) + person(240, 128, C.plum, 1) + person(300, 136, C.amber, 1);
          return S(0, ppl + R(70, 162, 260, 40, C.sand, 20, C.ink, 2), 1) + S(0, T(200, 52, "Decision due next meeting", 17), 0) +
            S(1, bubble(110, 62, 180, 40, "Your recommendation?", C.sun, 15) + T(200, 244, "Demos over, Exhibit 3 ready", 15, C.slate), 1) +
            S(2, person(70, 110, C.plum, 1.2, "flat") + doc(160, 52, 100, 130, C.white, 5) + L(176, 166, 244, 166, C.ink, 2) + T(210, 160, "sign here", 14, C.slate) +
              O(320, 110, 34, C.red) + R(306, 92, 9, 36, C.white, 2) + R(325, 92, 9, 36, C.white, 2) + pill(200, 236, "Pause before signing", C.red, C.white, 17), 2) +
            S(3, T(200, 50, "Which costs more?", 17) + T(20, 98, "One careful week", 15, C.ink, "start") + CL("gx", R(20, 108, 40, 30, C.green, 6)) +
              T(20, 182, "Reversing a bad suite", 15, C.ink, "start") + CL("gx", R(20, 192, 360, 30, C.red, 6)) + T(200, 270, "Take the extra week", 17, C.green));
        },
        // V1 · lines 4-5 · a five-question readiness check; three unanswered means predictable failure
        // template: Steps Infographic — https://elements.envato.com/steps-infographic-5NHT2YG
        function () {
          var q = ["Sponsor & owner", "Baseline", "Maturity", "People plan", "Governance"], g = "", r = "", k;
          for (k = 0; k < 5; k++) {
            g += T(80, 94 + k * 38, (k + 1) + ". " + q[k], 15, C.ink, "start");
            r += (k === 1 || k === 3 || k === 4) ? pill(290, 89 + k * 38, "No answer", C.red, C.white, 14) : pill(290, 89 + k * 38, "Unknown", C.grey, C.white, 14);
          }
          var un = "";
          for (k = 0; k < 5; k++) un += pill(290, 89 + k * 38, "Unknown", C.grey, C.white, 14);
          return S(0, R(60, 34, 280, 252, C.white, 10, C.ink, 2.5) + R(160, 26, 80, 16, C.slate, 4) + T(200, 64, "Readiness check", 17, C.navy) + g) +
            S(0, un, 0) + S(1, r + T(200, 272, "3 unanswered = predictable failure", 14, C.red));
        },
        // V2 · lines 6-7 · name the sponsor and the process owner as real people
        // template: Outline - Explainer Kit — https://motionarray.com/after-effects-templates/outline-explainer-kit-36706/
        function () {
          return qh(1, "Named people") +
            S(0, card(20, 56, 170, 96, ["Job title", "only"], C.mist, C.grey, C.slate, 17) + cross(160, 72, C.red, 1.2) + R(210, 56, 176, 96, C.white, 10, C.green, 2.5) +
              person(246, 84, C.navy, 1, "happy") + L(276, 86, 370, 86, C.grey, 4) + L(276, 104, 350, 104, C.grey, 4) + T(298, 138, "Named person", 15, C.green) +
              T(200, 196, "For the sponsor and", 16) + T(200, 220, "the process owner", 16), 0) +
            S(1, guest(46, 128, 1.1, "sad") + clock(46, 78, 14, C.coral, true) + person(150, 110, C.grey, 0.9) + person(180, 104, C.grey, 0.9) + person(210, 110, C.grey, 0.9) +
              cross(180, 166, C.red, 1.2) + T(180, 196, "A committee", 15, C.slate) + person(320, 104, C.amber, 1.2, "happy") + tick(320, 166, C.green) + T(320, 196, "One name", 15, C.amber) +
              T(200, 262, "Accountable when guests wait", 16));
        },
        // V3 · lines 8-9 · a recorded baseline is the only way to prove improvement next year
        // template: Easing Graphs — https://observablehq.com/@d3/easing
        function () {
          return qh(2, "Baseline") +
            S(0, clock(110, 140, 50, C.navy, true) + R(200, 80, 180, 110, C.white, 10, C.navy, 2.5) + T(290, 112, "Today's wait", 16) + T(290, 152, "38 min", 26, C.navy, "middle", 900) +
              tick(290, 172, C.green, 0.8) + T(200, 250, "A measurement of now", 16), 0) +
            S(1, T(200, 60, "Next year: did it help?", 17) + L(60, 230, 340, 230, C.ink, 3) + R(110, 110, 70, 120, "none", 4, C.slate, 2.5, ' stroke-dasharray="7 5"') +
              T(145, 180, "?", 34, C.slate, "middle", 900) + T(145, 254, "Today", 15) + CL("gy", R(230, 140, 70, 90, C.navy, 4)) + T(265, 254, "Next year", 15) +
              T(200, 286, "No baseline, no answer", 16, C.red));
        },
        // V4 · lines 10-11 · maturity: a hotel that never owned or measured a process jumps too far
        // template: Modern Process Infographic Steps Animation Template — https://elements.envato.com/steps-infographic-BUNKM3A
        function () {
          var st = "", k;
          for (k = 0; k < 5; k++) st += R(30 + k * 68, 240 - (k + 1) * 34, 68, (k + 1) * 34, k ? C.ice : C.teal, 2, C.navy, 2) + T(64 + k * 68, 230 - k * 34, String(k + 1), 16, k ? C.navy : C.white);
          return qh(3, "Maturity") +
            S(0, st + person(64, 172, C.teal, 0.9) + T(64, 150, "Qasr", 14, C.teal) + flag(330, 72, C.coral) + T(340, 124, "Plan", 14, C.coral)) +
            S(0, T(200, 272, "How well it already manages", 15), 0) +
            S(1, DP("M84 150 Q200 40 320 64", C.red, 3.5) + pill(170, 82, "Big jump", C.red) + T(200, 272, "Never owned or measured yet", 15, C.red));
        },
        // V5 · lines 12-13 · a plan for receptionists and the revenue team: time, training, a voice
        // template: Explainer Video Kit — https://motionarray.com/after-effects-templates/explainer-video-18242/
        function () {
          var note = function (x, y) { return R(x, y, 28, 32, C.sun, 2, C.amber, 2) + L(x + 6, y + 10, x + 22, y + 10, C.amber, 2) + L(x + 6, y + 19, x + 22, y + 19, C.amber, 2); };
          return qh(4, "People") +
            S(0, person(60, 78, C.teal, 1) + person(110, 78, C.teal, 1) + T(85, 140, "Reception", 14) + person(290, 78, C.coral, 1) + person(340, 78, C.coral, 1) + T(315, 140, "Revenue", 14)) +
            S(0, pill(80, 200, "Time", C.teal) + pill(200, 200, "Training", C.teal) + pill(320, 200, "Voice in tests", C.teal) + T(200, 262, "Work that changes needs a plan", 15), 0) +
            S(1, note(30, 170) + note(80, 182) + note(130, 170) + note(250, 170) + note(300, 182) + note(350, 170) + T(200, 262, "Or workarounds within weeks", 16, C.red));
        },
        // V6 · lines 14-15 · who governs after the project closes; governance outlives the team
        // template: Design process timeline - Animation — https://dribbble.com/shots/9892691-Design-process-timeline-Animation
        function () {
          return qh(5, "Governance") +
            S(0, R(30, 70, 200, 36, C.navy, 6) + T(130, 93, "Project", 15, C.white) + flag(234, 106, C.navy) + T(234, 124, "closes", 14, C.slate)) +
            S(0, T(316, 100, "?", 42, C.red, "middle", 900) + T(200, 186, "The most forgotten question", 16, C.red), 0) +
            S(1, CL("gx", R(30, 140, 350, 32, C.green, 6)) + T(205, 162, "Governance outlives the project", 15, C.white) +
              pill(90, 214, "Decides", C.navy) + pill(200, 214, "Measures", C.navy) + pill(310, 214, "Acts", C.navy) + T(200, 268, "Agreed before the team leaves", 15));
        },
        // V7 · lines 16-18 · test Qasr's hardest case with the staff who do the work
        // template: Celonis Process Explorer animation — https://help.celonis.com/cpm46/en/process-components
        function () {
          var clip = function (x, y) { return R(x, y, 22, 28, C.white, 3, C.ink, 2) + L(x + 5, y + 9, x + 17, y + 9, C.grey, 2) + L(x + 5, y + 17, x + 17, y + 17, C.grey, 2); };
          return S(0, pill(200, 40, "Hardest case test", C.plum) + guest(200, 104, 1.2, "flat") + person(70, 200, C.teal, 0.9) + person(200, 210, C.coral, 0.9) + person(330, 200, C.green, 0.9) +
              T(70, 262, "Reception", 14) + T(200, 272, "Revenue", 14) + T(330, 262, "Housekeeping", 14) + clip(88, 214) + clip(218, 224) + clip(348, 214)) +
            S(1, pill(84, 96, "Early", C.sun, C.ink) + pill(310, 86, "Corporate rate", C.sun, C.ink) + pill(310, 124, "Room not ready", C.rose, C.red)) +
            S(2, T(200, 178, "Real exceptions, not polished demos", 14, C.plum));
        },
        // V8 · lines 19-21 · test the four-year concern: change a rate rule live after go-live
        // template: Workflow Dashboard – Interactive Motion Design — https://dribbble.com/shots/27538364-Workflow-Dashboard-Interactive-Motion-Design
        function () {
          var cal = "", k;
          for (k = 0; k < 4; k++) cal += R(140 + k * 62, 86, 52, 50, k === 3 ? C.sun : C.white, 6, C.ink, 2) + R(140 + k * 62, 86, 52, 14, k === 3 ? C.amber : C.slate, 4) + T(166 + k * 62, 128, "Y" + (k + 1), 16);
          return S(0, person(70, 110, C.green, 1.3) + T(70, 180, "Finance", 15) + cal + T(200, 250, "Test it, don't promise it", 16), 0) +
            S(1, monitor(60, 40, 280, 160, C.white) + T(80, 80, "Rate rule", 16, C.navy, "start") + R(78, 96, 244, 36, C.ice, 6) + T(90, 120, "Gulf Co. · Peak", 15, C.ink, "start") +
              T(296, 120, "520", 15, C.red, "end") + L(274, 115, 300, 115, C.red, 2) + arrow(240, 150, 280, 150, C.green, 2.5) + T(310, 156, "545", 16, C.green, "end") +
              pill(200, 252, "Show it live, after go-live", C.coral), 1) +
            S(2, R(30, 112, 170, 36, C.navy, 6) + T(115, 135, "Development", 15, C.white) + R(200, 112, 170, 36, C.plum, 6) + T(285, 135, "Real guests", 15, C.white) +
              L(200, 96, 200, 166, C.coral, 4) + pill(200, 190, "Go-live", C.coral) + T(200, 262, "From building to serving guests", 15));
        },
        // V9 · lines 22-23 · watch who makes the change and how long it takes; it exposes custom code
        // template: Data Workflow Animation — https://dribbble.com/shots/27247003-Data-Workflow-Animation
        function () {
          return S(0, T(200, 40, "Who does it? How long?", 17) + person(80, 104, C.teal, 1.2) + T(80, 176, "Qasr staff?", 15) + clock(200, 116, 36, C.navy, true) +
            person(320, 104, C.amber, 1.2) + T(320, 176, "Vendor only?", 15)) +
            S(0, T(200, 250, "Tells more than price or features", 15), 0) +
            S(1, R(60, 200, 280, 50, C.white, 8, C.amber, 2.5) + T(200, 232, "Custom code found", 17, C.red) + CL("pl", mag(330, 214, 14, C.navy)) + T(200, 284, "Where upgrades get expensive", 15, C.red));
        },
        // V10 · lines 24-27 · evidence opens the gate; any vendor if justified; the goal is a better arrival; on to Noor
        // template: Process Infographics — https://elements.envato.com/process-infographics-FYE5ZGW
        function () {
          var ev = ["Named people", "Baseline", "Maturity", "People plan", "Governance", "Hardest case", "Live change"], o = "", k;
          for (k = 0; k < 7; k++) o += R(14, 34 + k * 34, 176, 28, k < 5 ? C.pale : C.lilac, 6, k < 5 ? C.green : C.plum, 1.5) + T(24, 53 + k * 34, ev[k], 14, C.ink, "start") + tick(172, 48 + k * 34, C.green, 0.6);
          return S(0, o + R(226, 70, 10, 140, C.navy, 3) + R(354, 70, 10, 140, C.navy, 3) + T(295, 116, "Evidence", 15) + arrow(240, 140, 348, 140, C.green, 5) + pill(295, 236, "Recommend", C.green), 0) +
            S(1, card(30, 70, 100, 50, "Suite A", C.ice, C.navy, C.ink, 16) + card(150, 70, 100, 50, "Suite B", C.ice, C.navy, C.ink, 16) + card(270, 70, 100, 50, "Suite C", C.ice, C.navy, C.ink, 16) +
              doc(170, 150, 60, 74, C.sun, 3) + L(200, 150, 80, 122, C.amber, 2) + L(200, 150, 200, 122, C.amber, 2) + L(200, 150, 320, 122, C.amber, 2) +
              T(200, 260, "Any vendor, if evidence shows it", 15), 1) +
            S(2, doc(40, 76, 90, 110, C.white, 4) + T(85, 214, "Signed contract", 15, C.slate) + T(170, 140, "≠", 30, C.slate) + guest(240, 110, 1.3, "happy") +
              R(310, 76, 50, 100, C.amber, 3, C.ink, 2) + T(290, 214, "Better arrival", 16, C.green) + T(290, 238, "that stays adaptable", 14, C.green), 2) +
            S(3, hotel(30, 100, 90, 90) + DP("M130 160 Q220 90 290 160", C.teal, 3) + hosp(330, 170, 1.4) + T(200, 250, "Next: Noor Health", 18, C.teal));
        }
      ]
    });
  })();

  // ===================== W3O2d · The suite nobody opened, and the lesson it leaves (33 lines, 11 visuals) =====================
  scene("W3O2d", {
    aria: "Noor Health: known facts versus causes to investigate, the discharge figures, and this week's forum task",
    chip: C.teal, bar: C.coral,
    frames: [
      [0, 0, "Now: Noor Health Group"], [0, 1, "A transfer test"], [0, 2, "AED 6.2 million invested"],
      [1, 0, "91 diagrams from 2019"], [1, 1, "Clinicians never involved"], [1, 2, "Intended vs real care"],
      [2, 0, "Discharge: many handoffs"], [2, 1, "A reason to question"],
      [3, 0, "Bought, not used"], [3, 1, "Idle rules, unlinked data"], [3, 2, "What each tool does"], [3, 3, "No process, no value"],
      [4, 0, "Promise vs result"], [4, 1, "4.1 h, 2.87 h promised"], [4, 2, "Reached 3.9 h: 4.9%"],
      [5, 0, "No single cause"], [5, 1, "What the case establishes"], [5, 2, "What needs investigation"], [5, 3, "Diagnose before spending"],
      [6, 0, "Advising Noor"], [6, 1, "Tie criteria to risks"],
      [7, 0, "The discussion forum"], [7, 1, "Post first, then read"], [7, 2, "Concepts plus evidence"],
      [8, 0, "Reply to two, disagree"], [8, 1, "Honest disagreement"], [8, 2, "Counts to Assessment 4"],
      [9, 0, "Traveller and patients"], [9, 1, "Outcomes for people"], [9, 2, "Tech shows, managers think"],
      [10, 0, "Next week: change"], [10, 1, "Thank you"], [10, 2, "Whose experience improves?"]
    ],
    visuals: [
      // V0 · lines 0-2 · from Qasr to Noor's five hospitals; a transfer test; AED 6.2 million for faster discharge
      // template: MotionPath plugin demonstration — https://gsap.com/docs/v3/Plugins/MotionPathPlugin/
      function () {
        var h = hosp(236, 100, 0.8) + hosp(296, 100, 0.8) + hosp(356, 100, 0.8) + hosp(266, 160, 0.8) + hosp(326, 160, 0.8);
        return S(0, hotel(30, 96, 90, 90) + T(75, 216, "Qasr Marina", 15) + DP("M130 150 L205 150", C.teal, 3) + MV(70, 0, 2.4, O(134, 150, 6, C.teal)) + h +
            T(296, 210, "Noor Health Group", 17, C.teal) + T(296, 236, "five private hospitals", 14, C.slate), 0) +
          S(1, R(20, 50, 150, 160, C.white, 10, C.navy, 2.5) + T(95, 78, "This week's ideas", 14, C.navy) + pill(95, 110, "Sponsor", C.navy) + pill(95, 148, "Owner", C.amber) + pill(95, 186, "Baseline", C.plum) +
            arrow(180, 130, 236, 130, C.ink, 3) + hosp(300, 140, 1.4) + T(300, 190, "New case", 15, C.teal) + T(200, 258, "Can you transfer the ideas?", 16), 1) +
          S(2, card(20, 80, 110, 70, ["AED", "6.2 million"], C.sun, C.amber, C.ink, 16) + arrow(134, 115, 150, 115, C.ink, 3) + R(154, 80, 100, 70, C.navy, 8) + T(204, 120, "BPM suite", 15, C.white) +
            arrow(258, 115, 276, 115, C.ink, 3) + R(282, 108, 96, 28, C.ice, 6, C.ink, 2) + O(298, 100, 9, C.skin) + TL(330, 176, ["Faster", "discharge?"], 15, C.teal) +
            T(200, 262, "A big bet on one outcome", 16));
      },
      // V1 · lines 3-5 · 91 diagrams from a 2019 manual, clinicians never involved; intended vs real care
      // template: Celonis Process Explorer map — https://help.celonis.com/cpm47/en/process-explorer
      function () {
        var stack = R(214, 74, 70, 84, C.ice, 6, C.navy, 2) + R(222, 82, 70, 84, C.ice, 6, C.navy, 2) + R(230, 90, 70, 84, C.white, 6, C.navy, 2.5) + T(265, 142, "91", 30, C.navy, "middle", 900);
        return S(0, doc(40, 70, 80, 100, C.sand, 5) + T(80, 196, "2019 manual", 15) + arrow(130, 120, 204, 120, C.navy, 3) + stack + T(265, 196, "91 diagrams", 15), 1) +
          S(1, R(110, 212, 180, 76, "none", 10, C.red, 2, ' stroke-dasharray="6 5"') + person(160, 230, C.teal, 0.7) + person(200, 230, C.teal, 0.7) + person(240, 230, C.teal, 0.7) +
            badge(290, 214, false, 0.8) + TL(56, 244, ["Never", "involved"], 14, C.red), 1) +
          S(2, R(14, 44, 180, 196, C.white, 10, C.navy, 2.5) + T(104, 70, "Policy manual", 15, C.navy) + card(54, 86, 100, 32, "Step 1", C.ice, C.navy, C.ink, 14) +
            card(54, 138, 100, 32, "Step 2", C.ice, C.navy, C.ink, 14) + card(54, 190, 100, 32, "Step 3", C.ice, C.navy, C.ink, 14) + arrow(104, 118, 104, 136, C.navy, 2) + arrow(104, 170, 104, 188, C.navy, 2) +
            R(206, 44, 180, 196, C.white, 10, C.coral, 2.5) + T(296, 70, "Real patient care", 15, C.coral) + DP("M224 210 C250 90 280 200 300 110 S350 200 368 96", C.coral, 3) +
            clock(340, 200, 13, C.coral) + T(250, 110, "?", 20, C.coral) + T(200, 272, "Manuals miss real difficulties", 15));
      },
      // V2 · lines 6-7 · discharge relies on judgement and many handoffs; a reason to question the models
      // template: Supply Chain Animation — https://www.behance.net/gallery/121206799/Supply-Chain-Animation
      function () {
        var nm = ["Doctor", "Pharmacy", "Nurse", "Transport", "Billing"], cc = [C.plum, C.teal, C.sky, C.amber, C.navy], o = L(44, 120, 356, 120, C.mist, 8), k;
        for (k = 0; k < 5; k++) o += O(44 + k * 78, 120, 26, cc[k]) + person(44 + k * 78, 110, C.white, 0.55) + T(44 + k * 78, 170, nm[k], 14);
        var models = "";
        for (k = 0; k < 3; k++) models += card(40 + k * 115, 200, 90, 48, "Model", C.ice, C.navy, C.ink, 15) + pill(122 + k * 115, 204, "?", C.amber, C.white, 15);
        return S(0, o + MV(312, 0, 3.4, O(44, 120, 8, C.coral)) + pill(100, 60, "Clinical judgement", C.plum)) +
          S(0, T(200, 230, "Many teams hand work on", 16), 0) +
          S(1, models + T(200, 284, "Not proof, a reason to question", 15));
      },
      // V3 · lines 8-11 · bought capabilities that never entered daily work: what they do, and why value stayed at zero
      // template: Stripe Connect — https://stripe.com/ae/connect
      function () {
        var gs = P("M246 170 A50 50 0 0 1 346 170", C.mist, 12) + P("M246 170 A50 50 0 0 1 296 120", C.teal, 12) + L(296, 170, 316, 136, C.ink, 4);
        return S(0, O(120, 150, 70, "none", C.teal, 3, ' stroke-dasharray="7 6"') + SPIN(120, 150, O(120, 80, 7, C.teal), 5) + TL(120, 146, ["Daily", "discharge work"], 14) +
            card(250, 74, 136, 44, "Rules engine", C.mist, C.grey, C.slate, 15) + card(250, 182, 136, 44, "Dashboard", C.mist, C.grey, C.slate, 15) +
            T(200, 274, "Bought, never part of daily work", 15, C.red), 0) +
          S(1, card(20, 50, 170, 60, "Rules engine", C.mist, C.grey, C.slate, 16) + pill(105, 140, "Never used", C.red) +
            monitor(220, 40, 160, 90, "#0f1a30") + L(236, 100, 364, 100, C.slate, 3) + L(300, 146, 300, 166, C.ink, 3) + cross(300, 178, C.red, 0.9) +
            db(235, 196, 130, 66, C.ice, "Hospital system", 14) + pill(110, 230, "Not connected", C.red), 1) +
          S(2, card(14, 46, 180, 40, "Rules engine", C.white, C.navy, C.ink, 16) + pill(104, 116, "IF ready", C.ice, C.ink) + arrow(104, 134, 104, 150, C.ink, 2.5) + pill(104, 168, "THEN book transport", C.pale, C.ink, 13 + 1) +
            TL(104, 226, ["Applies conditions", "automatically"], 14, C.slate) + card(206, 46, 180, 40, "Dashboard", C.white, C.navy, C.ink, 16) + gs +
            TL(296, 226, ["Shows how the", "process performs"], 14, C.slate), 2) +
          S(3, card(20, 70, 170, 80, ["Impressive", "at purchase"], C.sun, C.amber, C.ink, 17) + arrow(196, 110, 226, 110, C.ink, 3) + card(230, 70, 150, 80, ["Daily value:", "none"], C.rose, C.red, C.ink, 17) +
            T(200, 220, "Outside the real process", 17, C.red));
      },
      // V4 · lines 12-14 · discharge hours: 4.1 before, 2.87 promised, 3.9 reached (about 4.9%)
      // template: Bar Chart Race, Explained — https://observablehq.com/@d3/bar-chart-race-explained
      function () {
        var f = 55;
        return S(0, T(200, 40, "Discharge time (hours)", 17) + L(110, 60, 110, 236, C.ink, 3) + T(14, 104, "Before", 15, C.ink, "start") + CL("gx", R(110, 80, 4.1 * f, 38, C.navy, 6)) +
            T(116 + 4.1 * f, 105, "4.1 h", 16, C.navy, "start")) +
          S(1, T(14, 164, "Promised", 15, C.ink, "start") + R(110, 140, 2.87 * f, 38, C.pale, 6, C.green, 3, ' stroke-dasharray="7 5"') + T(116 + 2.87 * f, 165, "2.87 h", 16, C.green, "start") +
            T(186, 165, "−30%", 15, C.green)) +
          S(2, T(14, 224, "Actual", 15, C.ink, "start") + CL("gx", R(110, 200, 3.9 * f, 38, C.coral, 6)) + T(116 + 3.9 * f, 225, "3.9 h", 16, C.coral, "start") +
            T(200, 274, "Only about 4.9% better", 17, C.red));
      },
      // V5 · lines 15-18 · separate what the case establishes from what still needs investigation
      // template: Celonis pink-dot case explanation — https://community.celonis.com/general-product-q-a-2/what-does-pink-dots-represent-in-process-explorer-when-we-press-icon-pl
      function () {
        var known = ["Clinicians excluded", "Rules engine unused", "Dashboard unlinked", "3.9 h, not 2.87 h"], kn = "", k;
        for (k = 0; k < 4; k++) kn += card(22, 100 + k * 44, 164, 34, known[k], C.white, C.green, C.ink, 14);
        return S(0, R(140, 96, 120, 60, C.rose, 8, C.red, 2.5) + T(200, 132, "1.03 h gap", 18, C.red) + pill(70, 60, "Clinicians?", C.sun, C.ink, 14) + pill(330, 60, "Rules?", C.sun, C.ink, 14) +
            pill(70, 196, "Dashboard?", C.sun, C.ink, 14) + pill(330, 196, "Other?", C.sun, C.ink, 14) + L(118, 70, 140, 100, C.amber, 2) + L(300, 70, 260, 100, C.amber, 2) +
            L(118, 186, 140, 156, C.amber, 2) + L(300, 186, 260, 156, C.amber, 2) + T(200, 256, "One cause explains it all?", 16) + cross(370, 250, C.red, 1.1), 0) +
          S(1, R(14, 40, 180, 244, C.pale, 10, C.green, 2) + T(104, 74, "Known fact", 16, C.green) + kn + R(206, 40, 180, 244, C.sun, 10, C.amber, 2) +
            T(296, 66, "Needs", 16, C.amber) + T(296, 86, "investigation", 16, C.amber), 2) +
          S(2, card(222, 120, 150, 60, ["How much it", "slowed discharge"], C.white, C.amber, C.ink, 14) + L(186, 117, 222, 150, C.amber, 2.5, ' stroke-dasharray="6 5"') + T(296, 214, "?", 30, C.amber, "middle", 900), 2) +
          S(3, person(90, 116, C.navy, 1.4, "flat") + CL("pl", mag(146, 150, 16, C.navy)) + card(200, 70, 180, 70, ["Next expensive", "intervention"], C.mist, C.grey, C.slate, 16) +
            pill(290, 180, "Wait: diagnose first", C.amber) + T(200, 262, "Separate known from assumed", 16));
      },
      // V6 · lines 19-20 · advising Noor's leaders: each criterion must answer a risk in the evidence
      // template: Idea Flow Animation | Infographic Motion Design — https://www.behance.net/gallery/247762027/Idea-Flow-Animation-Infographic-Motion-Design
      function () {
        var cr = [["Clinicians", "involved"], ["Connected", "dashboard"], ["Named", "owner"]], rk = ["Excluded staff", "Unlinked data", "No one owns it"], o = "", r = "", k;
        for (k = 0; k < 3; k++) {
          o += card(14 + k * 127, 146, 118, 60, cr[k], C.white, C.teal, C.ink, 15);
          r += arrow(73 + k * 127, 236, 73 + k * 127, 210, C.red, 2.5) + pill(73 + k * 127, 252, rk[k], C.rose, C.red, 13 + 1);
        }
        return S(0, person(150, 60, C.navy, 1) + person(200, 56, C.teal, 1) + person(250, 60, C.plum, 1) + T(200, 124, "What should matter most?", 16) + o) +
          S(1, r + T(200, 290, "Defend it with the evidence", 15));
      },
      // V7 · lines 21-23 · the forum: post your own answer first; support it with concepts and evidence
      // template: SaaS Platform & Workflow Motion — https://dribbble.com/shots/27719724-SaaS-Platform-Workflow-Motion-UI-Concept
      function () {
        var win = R(30, 36, 340, 240, C.white, 10, C.ink, 2) + R(30, 36, 340, 34, C.navy, 10) + T(200, 59, "Week 3 discussion forum", 15, C.white);
        return win +
          S(0, R(50, 90, 220, 34, C.mist, 17) + R(130, 136, 220, 34, C.mist, 17) + R(50, 182, 220, 34, C.mist, 17) + T(200, 252, "This week's challenge", 16), 0) +
          S(1, card(50, 86, 300, 50, "1. Post your own answer", C.pale, C.green, C.ink, 16) + arrow(200, 140, 200, 162, C.ink, 3) +
            card(50, 166, 300, 50, "2. Then read classmates", C.ice, C.navy, C.ink, 16) + T(200, 254, "Your thinking stays yours", 15, C.green), 1) +
          S(2, card(50, 84, 300, 50, "Your post", C.white, C.ink, C.ink, 17) + pill(122, 162, "BPM concepts", C.green) + pill(282, 162, "Case evidence", C.green) +
            card(70, 200, 260, 44, "Assertion only = no credit", C.rose, C.red, C.ink, 15));
      },
      // V8 · lines 24-26 · reply to two classmates, disagree with one; participation counts to Assessment 4
      // template: Animated Sankey — https://old.observablehq.com/@chekos/animated-sankey
      function () {
        var dots = "", k;
        for (k = 0; k < 12; k++) dots += O(40 + k * 29, 130, 9, k < 3 ? C.teal : C.white, C.teal, 2);
        return S(0, person(60, 126, C.plum, 1.1, "happy") + T(60, 186, "You", 15, C.plum) + person(320, 70, C.teal, 1) + person(320, 190, C.coral, 1) +
            arrow(90, 134, 290, 86, C.teal, 3) + arrow(90, 146, 290, 204, C.amber, 3) + pill(190, 92, "Reply", C.teal) + pill(190, 186, "Reply + disagree", C.amber) +
            T(200, 280, "At least 2 replies, 1 disagreement", 15), 0) +
          S(1, bubble(20, 50, 170, 56, "Because...", C.ice, 16) + bubble(210, 110, 170, 56, "But consider...", C.sun, 16, 1) + pill(200, 216, "Polite “agree”", C.mist, C.slate) +
            cross(266, 216, C.red, 1) + T(200, 268, "Disagreement tests reasoning", 16), 1) +
          S(2, T(200, 80, "Forum posts across the term", 16) + dots + T(40, 162, "Week 1", 14, C.ink, "start") + T(360, 162, "Week 12", 14, C.ink, "end") +
            pill(200, 210, "Assessment 4: participation", C.navy));
      },
      // V9 · lines 27-29 · the traveller and the patients: processes exist for outcomes; technology shows, managers think
      // template: Outline - Explainer Kit — https://motionarray.com/after-effects-templates/outline-explainer-kit-36706/
      function () {
        return S(0, guest(90, 100, 1.3, "flat") + T(90, 180, "Our traveller", 15) + R(250, 130, 110, 30, C.ice, 6, C.ink, 2) + O(270, 120, 10, C.skin) + R(250, 160, 6, 18, C.ink, 1) + R(354, 160, 6, 18, C.ink, 1) +
            T(305, 200, "Waiting patients", 15), 1) +
          S(1, arrow(90, 196, 170, 236, C.green, 3) + arrow(305, 214, 230, 236, C.green, 3) + pill(200, 256, "Processes serve people", C.green, C.white, 16), 1) +
          S(2, monitor(30, 56, 170, 110, C.ice) + DP("M44 140 L80 120 L116 128 L150 96 L186 84", C.teal, 4) + T(115, 214, "Visible, measurable", 15, C.teal) +
            person(300, 110, C.navy, 1.3, "flat") + bubble(250, 28, 100, 40, "Why?", C.sun, 15) + T(300, 214, "Thoughtful management", 15, C.navy) +
            T(200, 268, "Technology cannot replace it", 15, C.slate));
      },
      // V10 · lines 30-32 · next week: change and the performance dip; thanks; two questions to keep asking
      // template: Easing Animations — https://observablehq.com/@d3/easing-animations
      function () {
        return S(0, T(200, 40, "Next week: organisational change", 16) + L(30, 240, 370, 240, C.ink, 2.5) + DP("M30 120 C90 120 110 220 170 220 S280 80 370 70", C.plum, 4) +
            pill(90, 84, "Resistance", C.coral) + T(170, 262, "Performance dip", 15, C.red) + pill(320, 140, "Change mgmt", C.teal), 0) +
          S(1, T(200, 120, "Thank you", 36, C.navy, "middle", 900) + T(200, 160, "See you in the forum", 17) + R(150, 190, 60, 34, C.ice, 17, C.navy, 2) + R(190, 210, 60, 34, C.sun, 17, C.amber, 2), 1) +
          S(2, card(30, 60, 340, 60, "Whose experience improves?", C.sun, C.amber, C.ink, 18) + card(30, 150, 340, 60, "Can the improvement last?", C.pale, C.green, C.ink, 18) +
            guest(70, 232, 0.8, "happy") + O(330, 246, 9, C.skin) + R(300, 254, 60, 16, C.ice, 4, C.ink, 1.5) + T(200, 270, "Keep asking", 16));
      }
    ]
  });

})();

