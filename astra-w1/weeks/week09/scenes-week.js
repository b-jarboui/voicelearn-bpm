// FILE: w09-claude-v3-part1.js
// v3 (targeted repair of v2 after GPT-6 audit r2): every bar, range, share and timeline is drawn to scale with units;
// moving sprites are clamped inside their track/chart/panel box (def.B); ghost copies now fade in place; jumps clear effects.
// OPER621 Week 9 (The Innovate Phase) - animated teaching scenes v3, part 1 of 3: O1a, O1b, O1c, O2a.
// v2 rebuild after the content audit: every narration line shows the literal Qasr Marina activity it describes.
// Each visual is annotated with the benchmark template it adapts (motion grammar only; all artwork is original).
// Standalone: registers its scenes in window.VL_SCENES and appends scoped rules to <style id="vl-sc-w09">.
// Parts may be concatenated in any order. Contract per scene: build(el), step(i, n), reset().
(function () {
  "use strict";
  var W = window;
  window.VL_SCENES = window.VL_SCENES || {};
  var SVGNS = "http://www.w3.org/2000/svg";

  /* ---------- generic helpers ---------- */
  function RM() {
    try { return !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    catch (e) { return false; }
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function r2(v) { return Math.round(v * 100) / 100; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  var EASE = {
    io: function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; },
    out: function (t) { return 1 - Math.pow(1 - t, 3); },
    back: function (t) { var c = 1.6, d = c + 1; return 1 + d * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },
    lin: function (t) { return t; }
  };
  var GEASE = { io: "power3.inOut", out: "power3.out", back: "back.out(1.6)", lin: "none" };

  /* ---------- SVG string builders ---------- */
  function R(x, y, w, h, f, rx, ex) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx || 0) + '" fill="' + f + '"' + (ex ? " " + ex : "") + "/>";
  }
  function C(x, y, r, f, ex) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + f + '"' + (ex ? " " + ex : "") + "/>";
  }
  function E(x, y, rx, ry, f, ex) {
    return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" fill="' + f + '"' + (ex ? " " + ex : "") + "/>";
  }
  function P(d, st, w, ex) {
    return '<path d="' + d + '" fill="none" stroke="' + st + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + (ex ? " " + ex : "") + "/>";
  }
  function F(d, f, ex) {
    return '<path d="' + d + '" fill="' + f + '"' + (ex ? " " + ex : "") + "/>";
  }
  function T(x, y, s, sz, f, anc, ex) {
    var cls = "vw-t";
    if (ex && ex.indexOf('class="vw-n"') >= 0) { cls = "vw-t vw-n"; ex = ex.replace('class="vw-n"', ""); }
    return '<text class="' + cls + '" x="' + x + '" y="' + y + '" font-size="' + (sz || 15) + '" fill="' + (f || "#14233a") + '" text-anchor="' + (anc || "middle") + '"' + (ex ? " " + ex : "") + ">" + esc(s) + "</text>";
  }
  function G(name, body, px, py, ex) {
    return "<g" + (name ? ' data-a="' + name + '"' : "") + (px !== undefined ? ' data-p="' + px + " " + py + '"' : "") + (ex ? " " + ex : "") + ">" + body + "</g>";
  }
  function AT(x, y, body, s, r) {
    return '<g transform="translate(' + x + " " + y + ")" + (r ? " rotate(" + r + ")" : "") + (s && s !== 1 ? " scale(" + s + ")" : "") + '">' + body + "</g>";
  }
  function textW(s, sz) { return Math.round(String(s).length * sz * 0.6 + 24); }
  function PILL(name, x, y, s, bg, fg, sz, ex) {
    sz = sz || 15;
    var w = textW(s, sz), h = Math.round(sz + 13);
    return G(name, R(x - w / 2, y - h / 2, w, h, bg, h / 2, ex) +
      '<text class="vw-t vw-n" x="' + x + '" y="' + r2(y + sz * 0.36) + '" font-size="' + sz + '" fill="' + fg + '" text-anchor="middle">' + esc(s) + "</text>", x, y);
  }
  /* a small friendly character, feet at origin, about 36 units tall */
  function GUY(body, skin, eyes) {
    skin = skin || "#f1c9a5";
    return F("M-10 0 Q-11 -18 0 -18 Q11 -18 10 0 Z", body) +
      C(0, -27, 9, skin) +
      (eyes === false ? "" : C(-3, -28, 1.5, "#14233a") + C(3, -28, 1.5, "#14233a") + P("M-2.5 -23.5 Q0 -22 2.5 -23.5", "#14233a", 1.1));
  }
  function SHIELD(cx, cy, s, fill, line) {
    return AT(cx, cy, F("M0 -16 L13 -11 V0 Q13 11 0 17 Q-13 11 -13 0 V-11 Z", fill, 'stroke="' + line + '" stroke-width="2.5"') +
      P("M-6 0 L-1.5 5 L7 -5", line, 3), s);
  }
  function CHECK(x, y, col, w) { return P("M" + (x - 7) + " " + y + " l5 5 l10 -11", col, w || 3.5); }
  function CROSS(x, y, col, w, r) { r = r || 7; return P("M" + (x - r) + " " + (y - r) + " L" + (x + r) + " " + (y + r) + " M" + (x + r) + " " + (y - r) + " L" + (x - r) + " " + (y + r), col, w || 3.5); }
  function GEAR(cx, cy, r, teeth, fill, hole) {
    var s = "", i, a;
    for (i = 0; i < teeth; i++) {
      a = i * 360 / teeth;
      s += '<rect x="' + r2(cx - r * 0.16) + '" y="' + r2(cy - r - r * 0.28) + '" width="' + r2(r * 0.32) + '" height="' + r2(r * 0.5) + '" rx="' + r2(r * 0.06) + '" fill="' + fill + '" transform="rotate(' + r2(a) + " " + cx + " " + cy + ')"/>';
    }
    return s + C(cx, cy, r, fill) + C(cx, cy, r * 0.38, hole);
  }
  function PHONE(x, y, w, h, body, screen) {
    return R(x, y, w, h, body, w * 0.18) + R(x + w * 0.1, y + h * 0.1, w * 0.8, h * 0.74, screen, w * 0.08) + C(x + w / 2, y + h * 0.92, w * 0.06, screen);
  }

  /* ---------- stylesheet: one <style id="vl-sc-w09">, rules appended per part ---------- */
  function addCSS(key, css) {
    var st = document.getElementById("vl-sc-w09");
    if (!st) { st = document.createElement("style"); st.id = "vl-sc-w09"; (document.head || document.documentElement).appendChild(st); }
    if (st.getAttribute("data-" + key)) return;
    st.setAttribute("data-" + key, "1");
    st.appendChild(document.createTextNode(css));
  }
  function baseCSS(id, o) {
    var S = ".vls-w09-" + id;
    return [
      S + "{position:relative;width:100%;height:100%;min-height:230px;display:flex;flex-direction:column;overflow:hidden;border-radius:14px;background:" + o.bg + ";color:" + o.ink + ";font-family:inherit;box-sizing:border-box;isolation:isolate}",
      S + " *{box-sizing:border-box}",
      S + " .vw-chip{flex:0 0 auto;display:flex;align-items:center;gap:8px;padding:9px 14px 5px;min-height:32px;font-size:13.5px;font-weight:800;letter-spacing:.02em;color:" + o.ink + ";line-height:1.2}",
      S + " .vw-dot{flex:0 0 auto;width:10px;height:10px;border-radius:50%;background:" + o.acc + ";animation:vw09ping 2.6s ease-out infinite}",
      S + " .vw-lab{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      S + " .vw-lab.vw-new{animation:vw09in .55s cubic-bezier(.2,.8,.2,1)}",
      S + " .vw-stage{position:relative;flex:1 1 auto;min-height:0}",
      S + " .vw-svg{position:absolute;left:0;top:0;width:100%;height:100%;display:block;overflow:hidden}",
      S + " .vw-bar{flex:0 0 3px;background:rgba(20,35,58,.08)}",
      S + " .vw-bar i{display:block;height:100%;width:0;background:" + o.acc + ";transition:width .7s ease}",
      S + " text{font-family:inherit;font-weight:750;letter-spacing:.01em}",
      S + " .vw-t{paint-order:stroke;stroke:" + o.halo + ";stroke-width:3.6px;stroke-linejoin:round}",
      S + " .vw-n{stroke:none}",
      S + " [data-f]{transition:fill .7s ease,stroke .7s ease}",
      S + " .vw-spin{transform-box:fill-box;transform-origin:center;animation:vw09spin 7s linear infinite}",
      S + " .vw-bob{transform-box:fill-box;transform-origin:center;animation:vw09bob 3.4s ease-in-out infinite}",
      S + " .vw-flow{stroke-dasharray:6 9;animation:vw09flow 1.6s linear infinite}",
      S + " .vw-blink{animation:vw09blink 1.8s ease-in-out infinite}",
      S + " [data-st=hot] .vw-hot{animation:vw09blink 1.1s ease-in-out infinite}",
      S + " [data-st=go] .vw-go{stroke-dasharray:5 8;animation:vw09flow 1.1s linear infinite}",
      S + " [data-st=go] .vw-goSpin{transform-box:fill-box;transform-origin:center;animation:vw09spin 3s linear infinite}",
      "@media (max-width:380px){" + S + " .vw-chip{font-size:12.5px;padding:7px 11px 4px}}",
      "@media (prefers-reduced-motion:reduce){" + S + " *," + S + " *::before," + S + " *::after{animation:none!important;transition:none!important}}"
    ].join("\n") + "\n" + (o.extra ? o.extra(S) : "");
  }
  var KF = [
    "@keyframes vw09spin{to{transform:rotate(360deg)}}",
    "@keyframes vw09bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}",
    "@keyframes vw09flow{to{stroke-dashoffset:-30}}",
    "@keyframes vw09blink{0%,100%{opacity:1}50%{opacity:.35}}",
    "@keyframes vw09ping{0%{box-shadow:0 0 0 0 rgba(192,80,42,.45)}80%,100%{box-shadow:0 0 0 9px rgba(192,80,42,0)}}",
    "@keyframes vw09in{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}"
  ].join("\n") + "\n";

  /* ---------- tween runner (GSAP ticker/easing when present, rAF otherwise) ---------- */
  function Runner() { this.list = []; this.raf = 0; this.gs = []; }
  Runner.prototype.add = function (dur, delay, ease, fn, done) {
    if (!(dur > 0) || RM()) { fn(1); if (done) done(); return; }
    var g = W.gsap, self = this;
    if (g && typeof g.to === "function") {
      var o = { t: 0 };
      var tw = g.to(o, { t: 1, duration: dur, delay: delay || 0, ease: GEASE[ease] || GEASE.io,
        onUpdate: function () { fn(o.t); }, onComplete: function () { if (done) done(); } });
      self.gs.push(tw);
      if (self.gs.length > 400) self.gs.splice(0, 200);
      return;
    }
    var e = EASE[ease] || EASE.io, start = null;
    this.list.push(function (now) {
      if (start === null) start = now + (delay || 0) * 1000;
      if (now < start) return true;
      var t = clamp((now - start) / (dur * 1000), 0, 1);
      fn(e(t));
      if (t >= 1) { if (done) done(); return false; }
      return true;
    });
    this.kick();
  };
  Runner.prototype.kick = function () {
    var self = this;
    if (self.raf || !W.requestAnimationFrame) return;
    var loop = function (now) {
      self.raf = 0;
      self.list = self.list.filter(function (f) { return f(now); });
      if (self.list.length) self.raf = W.requestAnimationFrame(loop);
    };
    self.raf = W.requestAnimationFrame(loop);
  };
  Runner.prototype.kill = function () {
    if (this.raf && W.cancelAnimationFrame) W.cancelAnimationFrame(this.raf);
    this.raf = 0; this.list = [];
    this.gs.forEach(function (t) { try { t.kill(); } catch (e) {} });
    this.gs = [];
  };

  /* ---------- actors: every animated element carries data-a ---------- */
  var NUM = ["x", "y", "s", "r", "o", "sx", "sy", "u", "d", "n"];
  var DEF = { x: 0, y: 0, s: 1, r: 0, o: 1, sx: 1, sy: 1, u: 0, d: 1 };
  function numsOf(d) { return (String(d).match(/-?\d*\.?\d+(?:e-?\d+)?/g) || []).map(Number); }
  function morphStr(tpl, nums) {
    var parts = String(tpl).split(/-?\d*\.?\d+(?:e-?\d+)?/), out = parts[0], i;
    for (i = 0; i < nums.length; i++) out += r2(nums[i]) + (parts[i + 1] || "");
    return out;
  }
  function Actor(el, root) {
    var p = (el.getAttribute("data-p") || "0 0").split(/[ ,]+/).map(Number);
    this.el = el; this.px = p[0] || 0; this.py = p[1] || 0;
    var pid = el.getAttribute("data-path");
    this.path = pid ? root.querySelector('[data-id="' + pid + '"]') : null;
    this.plen = 0;
    this.draws = el.hasAttribute("data-draw") ? [el] : [].slice.call(el.querySelectorAll("[data-draw]"));
    this.mEl = el.tagName.toLowerCase() === "path" ? el : el.querySelector("[data-m]");
    this.tEl = el.tagName.toLowerCase() === "text" ? el : el.querySelector("[data-t]");
    this.fEls = el.hasAttribute("data-f") ? [el] : [].slice.call(el.querySelectorAll("[data-f]"));
    this.fmt = el.getAttribute("data-fmt") || "#";
    this.dec = +(el.getAttribute("data-dec") || 0);
    this.orig = {
      A: {}, m: this.mEl ? this.mEl.getAttribute("d") : null,
      t: this.tEl ? this.tEl.textContent : "",
      n: +(el.getAttribute("data-n0") || 0),
      f: this.fEls.length ? this.fEls[0].getAttribute("fill") : null,
      k: this.fEls.length ? this.fEls[0].getAttribute("stroke") : null
    };
    this.cur = { x: 0, y: 0, s: 1, r: 0, o: 1, sx: 1, sy: 1, u: 0, d: 1, n: this.orig.n, A: {}, m: this.orig.m };
    this.tok = 0;
    this.box = null;
  }
  /* v3: keep the whole sprite inside its container box [x0, y0, x1, y1] (track, chart, gauge or panel) */
  Actor.prototype.fitBox = function (tx, ty, c) {
    var b = null;
    try { b = this.el.getBBox(); } catch (e) { b = null; }
    if (!b || (!b.width && !b.height)) return [tx, ty];
    var B = this.box, px = this.px, py = this.py, kx = c.s * c.sx, ky = c.s * c.sy;
    var xa = tx + px + kx * (b.x - px), xb = tx + px + kx * (b.x + b.width - px);
    var ya = ty + py + ky * (b.y - py), yb = ty + py + ky * (b.y + b.height - py);
    var x0 = Math.min(xa, xb), x1 = Math.max(xa, xb), y0 = Math.min(ya, yb), y1 = Math.max(ya, yb);
    if (x0 < B[0] || x1 - x0 > B[2] - B[0]) tx += B[0] - x0; else if (x1 > B[2]) tx -= x1 - B[2];
    if (y0 < B[1] || y1 - y0 > B[3] - B[1]) ty += B[1] - y0; else if (y1 > B[3]) ty -= y1 - B[3];
    return [tx, ty];
  };
  Actor.prototype.dflt = function (k) {
    if (k in DEF) return DEF[k];
    if (k === "n") return this.orig.n;
    if (k === "m") return this.orig.m;
    if (k === "t") return this.orig.t;
    if (k === "f") return this.orig.f;
    if (k === "k") return this.orig.k;
    if (k === "st") return "";
    return null;
  };
  Actor.prototype.attrOrig = function (name) {
    if (!(name in this.orig.A)) this.orig.A[name] = +(this.el.getAttribute(name) || 0);
    return this.orig.A[name];
  };
  Actor.prototype.paint = function () {
    var c = this.cur, el = this.el, tx = c.x, ty = c.y, k;
    for (k in c.A) el.setAttribute(k, r2(c.A[k]));
    if (this.path) { try { this.plen = this.path.getTotalLength(); } catch (e) { this.plen = 0; } }
    if (this.path && this.plen) {
      var pt = this.path.getPointAtLength(clamp(c.u, 0, 1) * this.plen);
      tx += pt.x - this.px; ty += pt.y - this.py;
    }
    if (this.box) { var fb = this.fitBox(tx, ty, c); tx = fb[0]; ty = fb[1]; }
    if (tx || ty || c.s !== 1 || c.r || c.sx !== 1 || c.sy !== 1) {
      el.setAttribute("transform", "translate(" + r2(tx + this.px) + " " + r2(ty + this.py) + ") rotate(" + r2(c.r) + ") scale(" + r2(c.s * c.sx) + " " + r2(c.s * c.sy) + ") translate(" + r2(-this.px) + " " + r2(-this.py) + ")");
    } else el.removeAttribute("transform");
    el.setAttribute("opacity", r2(c.o));
    el.style.visibility = c.o < 0.01 ? "hidden" : "";
    if (this.draws.length) {
      var dv = clamp(c.d, 0, 1);
      this.draws.forEach(function (p) {
        p.style.strokeDasharray = r2(dv * 1.001) + " 2";
        p.style.visibility = dv < 0.004 ? "hidden" : "";
      });
    }
    if (this.mEl && c.m) this.mEl.setAttribute("d", c.m);
    if (this.tEl && this.el.hasAttribute("data-n0")) {
      this.tEl.textContent = this.fmt.replace("#", c.n.toFixed(this.dec));
    }
  };

  /* ---------- scene factory ---------- */
  function mapIndex(i, n, N) {
    i = Math.floor(Number(i)); n = Math.floor(Number(n));
    if (!isFinite(i)) i = 0;
    if (!isFinite(n) || n <= 0) n = N;
    i = clamp(i, 0, n - 1);
    if (n === N) return i;
    if (n <= 1) return 0;
    return clamp(Math.round(i * (N - 1) / (n - 1)), 0, N - 1);
  }
  function mergeInto(S, src) {
    var a, k;
    for (a in src) {
      if (!S[a]) S[a] = {};
      for (k in src[a]) {
        if (k === "A") { S[a].A = S[a].A || {}; for (var q in src[a].A) S[a].A[q] = src[a].A[q]; }
        else S[a][k] = src[a][k];
      }
    }
  }
  function make(id, def, el) {
    var N = def.K.length, Wd = def.W || 400, Hd = def.H || 320;
    var root = document.createElement("div");
    root.className = "vls-w09 vls-w09-" + id;
    root.innerHTML =
      '<div class="vw-chip" aria-hidden="true"><span class="vw-dot"></span><span class="vw-lab"></span></div>' +
      '<div class="vw-stage"><svg class="vw-svg" xmlns="' + SVGNS + '" viewBox="0 0 ' + Wd + " " + Hd + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(def.title) + '">' +
      def.art(id) + '<g class="vw-fx"></g></svg></div><div class="vw-bar"><i></i></div>';
    while (el.firstChild) el.removeChild(el.firstChild);
    el.appendChild(root);
    var svg = root.querySelector("svg"), stage = root.querySelector(".vw-stage");
    var lab = root.querySelector(".vw-lab"), bar = root.querySelector(".vw-bar i"), fxL = root.querySelector(".vw-fx");
    var actors = {}, list = [].slice.call(root.querySelectorAll("[data-a]"));
    list.forEach(function (n) { actors[n.getAttribute("data-a")] = new Actor(n, root); });
    if (def.B) Object.keys(def.B).forEach(function (n) { if (actors[n]) actors[n].box = def.B[n]; });
    var touched = {};
    [def.init || {}].concat(def.K.map(function (k) { return (k && k.a) || {}; })).forEach(function (o) {
      for (var a in o) { touched[a] = touched[a] || {}; for (var k in o[a]) { if (k === "A") { touched[a].A = touched[a].A || {}; for (var q in o[a].A) touched[a].A[q] = 1; } else touched[a][k] = 1; } }
    });
    var run = new Runner(), cur = -1, lastLabel = "", ro = null;

    function fit() {
      var r = stage.getBoundingClientRect();
      if (!r.width || !r.height) return;
      var a = r.width / r.height, vb;
      if (a > Wd / Hd) { var w = Hd * a; vb = [-(w - Wd) / 2, 0, w, Hd]; }
      else { var h = Wd / a; vb = [0, -(h - Hd) / 2, Wd, h]; }
      svg.setAttribute("viewBox", vb.map(r2).join(" "));
    }
    if (W.ResizeObserver) { ro = new W.ResizeObserver(fit); ro.observe(stage); }
    else W.addEventListener("resize", fit);
    fit();

    function stateAt(k) {
      var S = {}, j;
      var I0 = {}; mergeInto(I0, def.init || {});
      mergeInto(S, def.init || {});
      var g0 = 0;
      for (j = k; j > 0; j--) if (def.K[j] && def.K[j].c) { g0 = j; break; }
      for (j = 0; j <= k; j++) {
        if (j === g0 && g0 > 0) {
          var keep = [].concat(def.K[j].c === true || def.K[j].c === 1 ? [] : def.K[j].c);
          for (var a0 in S) if (I0[a0] && I0[a0].o === 0 && keep.indexOf(a0) < 0) S[a0].o = 0;
        }
        if (def.K[j] && def.K[j].a) mergeInto(S, def.K[j].a);
      }
      var full = {}, a, p;
      for (a in touched) {
        var A = actors[a]; if (!A) continue;
        full[a] = {};
        for (p in touched[a]) {
          if (p === "A") { full[a].A = {}; for (var q in touched[a].A) full[a].A[q] = (S[a] && S[a].A && q in S[a].A) ? S[a].A[q] : A.attrOrig(q); }
          else if (p === "w") full[a].w = (S[a] && "w" in S[a]) ? S[a].w : 0;
          else full[a][p] = (S[a] && p in S[a]) ? S[a][p] : A.dflt(p);
        }
      }
      return full;
    }
    function labelAt(k) { for (var j = k; j >= 0; j--) if (def.K[j] && def.K[j].L) return def.K[j].L; return def.title; }

    function goTo(k, instant) {
      var S = stateAt(k), kf = def.K[k] || {}, dur = kf.dur || def.dur || 0.95;
      var moveForward = !instant && k === cur + 1;
      if (!moveForward) { run.kill(); while (fxL.firstChild) fxL.removeChild(fxL.firstChild); }
      var wOwn = kf.a || {};
      Object.keys(S).forEach(function (name) {
        var A = actors[name], Tt = S[name], from = {}, to = {}, p, any = false;
        if (!A) return;
        A.tok++; var tok = A.tok;
        var wait = (wOwn[name] && wOwn[name].w) || 0;
        if ("t" in Tt && A.tEl) A.tEl.textContent = Tt.t;
        if ("f" in Tt && Tt.f) A.fEls.forEach(function (e) { e.setAttribute("fill", Tt.f); });
        if ("k" in Tt && Tt.k) A.fEls.forEach(function (e) { e.setAttribute("stroke", Tt.k); });
        if ("st" in Tt) A.el.setAttribute("data-st", Tt.st || "");
        NUM.forEach(function (q) { if (q in Tt && Tt[q] !== null) { from[q] = A.cur[q]; to[q] = Tt[q]; if (from[q] !== to[q]) any = true; } });
        var fromA = {}, toA = Tt.A || {};
        for (p in toA) { fromA[p] = (p in A.cur.A) ? A.cur.A[p] : A.attrOrig(p); if (fromA[p] !== toA[p]) any = true; }
        var mFrom = null, mTo = null;
        if ("m" in Tt && Tt.m && A.mEl) {
          if (Tt.m !== A.cur.m) {
            any = true; mFrom = numsOf(A.cur.m || Tt.m); mTo = numsOf(Tt.m);
            if (mFrom.length !== mTo.length) mFrom = mTo.slice();
          }
        }
        var setAll = function (t) {
          if (A.tok !== tok) return;
          for (var q in to) A.cur[q] = lerp(from[q], to[q], t);
          for (var z in toA) A.cur.A[z] = lerp(fromA[z], toA[z], t);
          if (mTo) A.cur.m = morphStr(Tt.m, mTo.map(function (v, i) { return lerp(mFrom[i], v, t); }));
          A.paint();
        };
        if (!any || instant) { setAll(1); return; }
        run.add(dur, moveForward ? wait : 0, Tt.e || kf.e || "io", setAll);
      });
      var followers = Object.keys(actors).filter(function (n) { return actors[n].path; });
      if (followers.length) {
        var repaint = function () { followers.forEach(function (n) { actors[n].paint(); }); };
        if (instant) repaint(); else run.add(dur + 1.6, 0, "lin", repaint);
      }
      var L = labelAt(k);
      if (L !== lastLabel) {
        lab.textContent = L; lastLabel = L;
        svg.setAttribute("aria-label", def.title + ": " + L);
        if (!instant && !RM()) { lab.classList.remove("vw-new"); void lab.offsetWidth; lab.classList.add("vw-new"); }
      }
      bar.style.width = r2(100 * (k + 1) / N) + "%";
      if (moveForward && !RM()) {
        if (kf.p) [].concat(kf.p).forEach(function (n) { fx.ring(n, null, dur * 0.75); });
        if (typeof kf.fx === "function") { try { kf.fx(fx); } catch (e) {} }
      }
      cur = k;
    }

    /* transient effects: they never change the stored state */
    function screenCenter(name) {
      var A = actors[name]; if (!A || !svg.getScreenCTM) return null;
      var m = svg.getScreenCTM(); if (!m) return null;
      var rc = A.el.getBoundingClientRect(); if (!rc.width && !rc.height) return null;
      var inv = m.inverse(), pt = svg.createSVGPoint();
      pt.x = rc.left + rc.width / 2; pt.y = rc.top + rc.height / 2;
      var q = pt.matrixTransform(inv);
      return { x: q.x, y: q.y, r: Math.max(rc.width, rc.height) * Math.abs(inv.a) / 2 };
    }
    function mk(tag, attrs, parent) {
      var n = document.createElementNS(SVGNS, tag);
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      (parent || fxL).appendChild(n); return n;
    }
    function later(sec, fn) { run.add(sec, 0, "lin", function () {}, fn); }
    function burstAt(x, y, col, count) {
      count = count || 10;
      for (var i = 0; i < count; i++) (function (i) {
        var a = i / count * Math.PI * 2, n = mk("circle", { cx: r2(x), cy: r2(y), r: 3, fill: col || def.acc || "#c0502a" });
        run.add(0.8, 0.05, "out", function (t) {
          n.setAttribute("cx", r2(x + Math.cos(a) * 14 * t)); n.setAttribute("cy", r2(y + Math.sin(a) * 14 * t));
          n.setAttribute("opacity", r2(1 - t));
        }, function () { if (n.parentNode) n.parentNode.removeChild(n); });
      })(i);
    }
    var fx = {
      ring: function (name, col, delay) {
        later(delay || 0, function () {
          var c = screenCenter(name); if (!c) return;
          var r0 = clamp(c.r + 4, 12, 95);
          var n = mk("circle", { cx: r2(c.x), cy: r2(c.y), r: r0, fill: "none", stroke: col || def.acc || "#c0502a", "stroke-width": 3 });
          run.add(0.9, 0, "out", function (t) { n.setAttribute("r", r2(r0 + 16 * t)); n.setAttribute("opacity", r2(0.85 * (1 - t))); },
            function () { if (n.parentNode) n.parentNode.removeChild(n); });
        });
      },
      burst: function (x, y, col, count) { burstAt(x, y, col, count); },
      burstOn: function (name, col, delay) {
        later(delay || 0, function () { var c = screenCenter(name); if (c) burstAt(c.x, c.y, col, 12); });
      },
      /* v3: in-place fade (the copy never leaves its card, bin or chart) */
      ghost: function (name) {
        var A = actors[name]; if (!A || !A.el.parentNode) return;
        var g = A.el.cloneNode(true);
        g.removeAttribute("data-a");
        [].slice.call(g.querySelectorAll("[data-a]")).forEach(function (q) { q.removeAttribute("data-a"); });
        g.style.visibility = "";
        A.el.parentNode.insertBefore(g, A.el.nextSibling);
        run.add(0.9, 0, "io", function (t) { g.setAttribute("opacity", r2(0.9 * (1 - t))); },
          function () { if (g.parentNode) g.parentNode.removeChild(g); });
      },
      kick: function (name, dx, dy, rot) {
        var A = actors[name]; if (!A) return;
        var bx = A.cur.x, by = A.cur.y, br = A.cur.r, tok = A.tok;
        run.add(0.7, 0.1, "lin", function (t) {
          if (A.tok !== tok) return;
          var w = Math.sin(t * Math.PI * 3) * (1 - t);
          A.cur.x = bx + (dx || 0) * w; A.cur.y = by + (dy || 0) * w; A.cur.r = br + (rot || 0) * w; A.paint();
        });
      }
    };

    return {
      go: function (i, n) { var k = mapIndex(i, n, N); goTo(k, cur < 0); },
      reset: function () { run.kill(); while (fxL.firstChild) fxL.removeChild(fxL.firstChild); cur = -1; lastLabel = ""; goTo(0, true); },
      destroy: function () { run.kill(); if (ro) ro.disconnect(); else W.removeEventListener("resize", fit); },
      boot: function () { goTo(0, true); }
    };
  }
  function SC(id, def) {
    var inst = null;
    W.VL_SCENES[id] = {
      build: function (el) {
        if (!el) return;
        if (inst) inst.destroy();
        inst = make(id, def, el);
        inst.boot();
      },
      step: function (i, n) { if (inst) inst.go(i, n); },
      reset: function () { if (inst) inst.reset(); }
    };
    W.VL_SCENES[id]._dbg = function () { return { W: def.W || 400, H: def.H || 320, B: def.B || {}, N: def.K.length }; };
  }

  var K = { ink: "#14233a", navy: "#1f4e79", orange: "#c0502a", green: "#2f7d5f", paper: "#fbf8f1",
    sky: "#dbe7f2", amber: "#e0a03a", plum: "#6a4c93", slate: "#8a97a8", white: "#ffffff", rose: "#d9644a", mint: "#d5ece0", red: "#d94a3a" };

  /* ---------- v2: literal hotel-process kit (every visual names a real Qasr activity) ---------- */
  function M() {
    var out = {}, i, a, k;
    for (i = 0; i < arguments.length; i++) {
      var src = arguments[i] || {};
      for (a in src) { out[a] = out[a] || {}; for (k in src[a]) out[a][k] = src[a][k]; }
    }
    return out;
  }
  function ON() { var o = {}, i; for (i = 0; i < arguments.length; i++) o[arguments[i]] = { o: 1 }; return o; }
  function OFF() { var o = {}, i; for (i = 0; i < arguments.length; i++) o[arguments[i]] = { o: 0 }; return o; }
  function HID(list) { var o = {}; list.forEach(function (n) { o[n] = { o: 0 }; }); return o; }
  /* receptionist behind a counter; counter top at y */
  function DESKK(x, y, col) {
    return AT(x, y, AT(0, -14, GUY(col || K.green), 0.95) + R(-38, -16, 76, 34, "#b98b5e", 5) + R(-42, -20, 84, 8, "#d8b48c", 3));
  }
  /* room door; floor at y */
  function DOORK(x, y) {
    return R(x - 24, y - 66, 48, 66, "#e8e1d2", 3) + R(x - 18, y - 60, 36, 60, K.navy, 2) + C(x + 11, y - 30, 2.5, "#ffd479");
  }
  function BOOK(x, y, col) {
    return AT(x, y, R(-20, -14, 40, 28, "#fff", 4, 'stroke="' + (col || K.navy) + '" stroke-width="2.2"') + R(-20, -14, 40, 8, col || K.navy, 3) +
      P("M-13 1 H13 M-13 7 H5", "#9aa7b8", 2));
  }
  function CLOCKK(x, y, r, col) {
    return C(x, y, r, "#fff", 'stroke="' + (col || K.orange) + '" stroke-width="3"') + P("M" + x + " " + y + " V" + (y - r * 0.6) + " M" + x + " " + y + " L" + (x + r * 0.45) + " " + (y + r * 0.2), col || K.orange, 2.4);
  }
  function HOURG(x, y, col) { return AT(x, y, F("M-8 -11 H8 L0 0 L8 11 H-8 L0 0Z", col || K.orange) + R(-10, -13, 20, 3, K.ink, 1) + R(-10, 10, 20, 3, K.ink, 1)); }
  function KIOSKK(x, y) { return AT(x, y, R(-11, -44, 22, 34, K.navy, 4) + R(-7, -40, 14, 14, "#9fe3c0", 2) + R(-4, -10, 8, 10, K.navy) + R(-12, 0, 24, 4, K.ink, 2)); }
  function IDC(x, y, col) { return AT(x, y, R(-15, -10, 30, 20, "#fff", 3, 'stroke="' + (col || K.plum) + '" stroke-width="2"') + C(-7, -1, 4.5, col || K.plum) + P("M2 -3 H11 M2 3 H9", "#9aa7b8", 2)); }
  function OFFICE(x, y, w, h, col) { return R(x - w / 2, y - h / 2, w, h, "#fff", 8, 'stroke="' + col + '" stroke-width="2.5"') + R(x - w / 2, y - h / 2, w, 7, col, 4); }
  function CHEV(x, y, w, h, fill, line) {
    return F("M" + x + " " + y + " H" + (x + w - 12) + " L" + (x + w) + " " + (y + h / 2) + " L" + (x + w - 12) + " " + (y + h) + " H" + x + " L" + (x + 12) + " " + (y + h / 2) + "Z", fill, 'data-f="" stroke="' + line + '" stroke-width="1.5"');
  }
  function COIN(x, y) { return E(x, y, 9, 3.5, K.amber) + E(x, y - 4, 9, 3.5, "#f1c26a"); }
  function TAGX(x, y) { return C(x, y, 10, "#fff", 'stroke="#d94a3a" stroke-width="2.5"') + CROSS(x, y, "#d94a3a", 2.6, 4.5); }
  function TAGOK(x, y) { return C(x, y, 10, K.green) + CHECK(x, y, "#fff", 2.6); }
  function SPEED(x, y, col) { return P("M" + x + " " + y + " h-16 M" + (x + 2) + " " + (y + 7) + " h-22 M" + x + " " + (y + 14) + " h-14", col || K.orange, 2.6); }
  function ARROW(x1, y1, x2, y2, col, w, ex) {
    var a = Math.atan2(y2 - y1, x2 - x1), hx = x2 - Math.cos(a) * 9, hy = y2 - Math.sin(a) * 9;
    return P("M" + x1 + " " + y1 + " L" + r2(hx) + " " + r2(hy), col, w || 3, ex) +
      F("M" + x2 + " " + y2 + " L" + r2(hx + Math.cos(a + 1.6) * 6) + " " + r2(hy + Math.sin(a + 1.6) * 6) + " L" + r2(hx + Math.cos(a - 1.6) * 6) + " " + r2(hy + Math.sin(a - 1.6) * 6) + "Z", col);
  }

  addCSS("kf", KF);
  /* =====================================================================
     O1a  FROM UNDERSTAND TO INNOVATE  (v2 - rebuilt first, audit score 3/3)
     Persistent phase strip (Understand > Innovate > Implement) over six
     literal hotel panels:
       pA  Qasr Marina floor: lobby, reception queue, revenue office, room 214
           benchmark: 097 Business Solution conveyor (LottieFiles) - items queue at a station
       pB  As-is vs to-be process map
           benchmark: 089 Git Workflow (LottieFiles) - branch, redraw, reconnect
       pC  Booking / Travel / Arrival timeline: where the approval happens
           benchmark: 076 Workflow Animation (Dribbble) - trigger moves between stages
       pD  Lobby-to-room journey bar: 82 min, 47-min approval, 8.1-min service
           benchmark: 126 Stacked-to-grouped bars (Observable) - segments keep identity
       pE  Guest outcome first: departments fade, ready room is the anchor
           benchmark: 094 Process - Success (LottieFiles) - activity resolves into a check
       pF  How ambitious: improve / redesign / rethink
           benchmark: 113 Infographic Chart Creator (Motion Array) - growing columns
     ===================================================================== */
  (function () {
    var PANELS = ["pA", "pB", "pC", "pD", "pE", "pF"];
    function only(p, dim) { var o = {}; PANELS.forEach(function (n) { o[n] = { o: n === p ? 1 : (dim && dim === n ? 0.18 : 0) }; }); return o; }
    var LIT = "#ffd479", DIM = "#eef1f5";
    function ch(u, i, m) { return { chU: { f: u ? LIT : DIM }, chI: { f: i ? LIT : DIM }, chM: { f: m ? LIT : DIM } }; }
    function box(name, cx, cy, w, label, stroke, fill) {
      return G(name, R(cx - w / 2, cy - 18, w, 36, fill || "#fff", 8, 'data-f="" stroke="' + stroke + '" stroke-width="2.5"') + T(cx, cy + 5, label, 15, K.ink, "middle", 'class="vw-n"'), cx, cy);
    }
    function guestRow() {
      var s = "", i;
      for (i = 0; i < 10; i++) s += G("gr" + i, AT(48 + i * 19, 304, GUY(i < 6 ? K.orange : "#9aa7b8"), 0.62), 48 + i * 19, 292);
      return s;
    }
    SC("O1a", {
      title: "From Understand to Innovate", W: 400, H: 320, acc: K.orange,
      B: { g: [8, 196, 376, 276], g2: [264, 228, 384, 304], detl: [16, 52, 384, 304], barAll: [30, 140, 358, 174], p47: [30, 248, 358, 276], doc: [8, 40, 392, 110] },
      art: function () {
        var A = "", B = "", Cc = "", D = "", Ee = "", Ff = "";
        /* ---------- pA: the hotel floor ---------- */
        A += R(-1400, 270, 3200, 1400, "#e9e1d0") + R(-1400, 268, 3200, 4, "#cbbd9f");
        A += G("sign", R(130, 50, 120, 24, K.navy, 6) + T(190, 67, "Qasr Marina", 15, "#fff", "middle", 'class="vw-n"'), 190, 62);
        A += R(10, 196, 48, 74, "#cfe3ef", 3, 'stroke="#8aa6bd" stroke-width="3"') + P("M34 198 V268", "#8aa6bd", 2);
        A += PILL("", 34, 292, "Lobby", "#fff", K.ink, 15);
        A += G("bound", R(138, 176, 104, 102, "none", 10, 'stroke="' + K.navy + '" stroke-width="2" stroke-dasharray="6 5"'), 190, 227);
        A += G("desk", DESKK(190, 252), 190, 236);
        A += PILL("", 190, 292, "Reception", "#fff", K.ink, 15);
        A += G("roomDoor", DOORK(350, 270), 350, 236);
        A += G("doorOpen", R(332, 210, 36, 60, "#ffe9a8", 2), 350, 240);
        A += G("roomLt", C(350, 196, 6, "#c9d3df", 'data-f=""'), 350, 196);
        A += PILL("", 350, 292, "Room 214", "#fff", K.ink, 15);
        A += G("queue", AT(84, 270, GUY(K.amber), 0.9) + AT(106, 270, GUY(K.plum), 0.9) + AT(128, 270, GUY("#5b8fc4"), 0.9), 106, 254);
        A += G("qMore", AT(64, 270, GUY("#7a9a6a"), 0.85) + AT(150, 270, GUY(K.rose), 0.85), 106, 254);
        A += G("qClock", CLOCKK(106, 206, 12, K.orange), 106, 206);
        A += G("office", OFFICE(300, 92, 110, 50, K.plum) + T(300, 106, "Revenue", 15, K.plum, "middle", 'class="vw-n"'), 300, 92);
        A += G("lnk", P("M214 214 C240 170 260 150 284 120", K.plum, 3, 'class="vw-flow"'), 250, 165);
        A += G("lnkX", TAGX(252, 160), 252, 160);
        A += G("hg", HOURG(372, 92), 372, 92);
        A += G("tools", PHONE(222, 216, 11, 18, K.ink, "#9fe3c0") + R(150, 222, 16, 12, "#fff", 2, 'stroke="#9aa7b8" stroke-width="1.5"') + R(154, 218, 16, 12, "#fff", 2, 'stroke="#9aa7b8" stroke-width="1.5"'), 190, 224);
        A += PILL("sy1", 75, 84, "Searching", "#f4ead0", "#6b5a1e", 15);
        A += PILL("sy2", 80, 120, "Phone calls", "#f4ead0", "#6b5a1e", 15);
        A += PILL("sy3", 90, 156, "Repeat checks", "#f4ead0", "#6b5a1e", 15);
        A += G("strike", P("M24 84 H126 M20 120 H140 M22 156 H160", K.red, 3), 90, 120);
        A += G("sweat", C(170, 196, 2.6, "#5fb3e6") + C(212, 194, 2.6, "#5fb3e6") + SPEED(150, 206, K.orange), 190, 200);
        A += PILL("weak", 300, 170, "Built-in weakness", "#fde3d6", K.orange, 15);
        A += G("mag", AT(252, 160, C(0, 0, 22, "rgba(255,255,255,.35)", 'stroke="' + K.ink + '" stroke-width="3.5"') + P("M16 16 L30 30", K.ink, 5)), 252, 160);
        A += PILL("cause", 300, 170, "Approval at arrival", K.red, "#fff", 15);
        A += G("mgr", AT(268, 270, GUY(K.ink), 0.95), 268, 252);
        A += PILL("order", 290, 150, "Work faster!", K.ink, "#fff", 15);
        A += PILL("corp", 100, 196, "Corporate guest", "#fff", K.navy, 15);
        A += PILL("outside", 300, 146, "Outside reception", "#fff", K.plum, 15);
        A += G("newR", P("M40 186 C120 120 260 120 340 186", K.green, 3.5, 'data-draw="" pathLength="1" stroke-dasharray="1 0"'), 190, 150);
        A += PILL("pNew", 190, 112, "A new way?", K.green, "#fff", 15);
        /* v3: the walk to the room follows a drawn floor route; the guest stops at the door */
        A += G("route", P("M46 271 H322", K.green, 3, 'stroke-dasharray="7 6"') + C(322, 271, 4, K.green), 184, 271);
        A += G("g", AT(34, 270, GUY(K.navy)), 34, 252);
        /* ---------- pB: as-is vs to-be map ---------- */
        B += R(-1400, 46, 3200, 1400, "#e9f1f8") ;
        B += T(14, 74, "As-is", 15, K.slate, "start");
        B += box("b1", 55, 100, 84, "Arrive", K.slate) + box("b2", 150, 100, 84, "Queue", K.slate) + box("b3", 245, 100, 84, "Approval", K.slate) + box("b4", 340, 100, 84, "Room", K.slate);
        B += P("M97 100 H108 M192 100 H203 M287 100 H298", K.slate, 2.5);
        B += G("toLbl", T(14, 174, "To-be", 15, K.green, "start"), 30, 170);
        B += G("t1", box("", 70, 200, 100, "Booking", K.green) + TAGOK(116, 184), 70, 200);
        B += G("t2", box("", 200, 200, 100, "Arrive", K.green), 200, 200);
        B += G("t3", box("", 330, 200, 100, "Room", K.green), 330, 200);
        B += G("tLine", P("M120 200 H150 M250 200 H280", K.green, 3, 'data-draw="" pathLength="1"'), 200, 200);
        B += G("gloss", [70, 200, 330].map(function (x) { return F("M" + (x + 30) + " 176 l3 -8 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3Z", K.amber); }).join(""), 200, 176);
        B += G("pc", R(268, 244, 44, 30, K.ink, 4) + R(272, 248, 36, 22, "#9fe3c0", 2) + R(282, 274, 16, 6, K.ink, 1), 290, 260);
        B += PILL("pBoxes", 110, 262, "Nice boxes", "#fff", K.ink, 15);
        B += PILL("pSys", 290, 300, "New system", "#fff", K.ink, 15);
        B += G("xs", TAGX(170, 248) + TAGX(334, 256), 250, 252);
        B += PILL("pSym", 150, 140, "Symptom", "#f4ead0", "#6b5a1e", 15);
        B += PILL("pCau", 245, 140, "Cause", K.red, "#fff", 15);
        B += G("fixArr", P("M245 120 C240 160 120 160 80 182", K.green, 3.5, 'data-draw="" pathLength="1"'), 160, 150);
        /* ---------- pC: booking / travel / arrival ---------- */
        Cc += R(-1400, 46, 3200, 1400, "#f5f1e8");
        Cc += R(16, 52, 120, 252, "#e6f2ea", 10) + R(140, 52, 120, 252, "#eef1f5", 10) + R(264, 52, 120, 252, "#fbe8de", 10);
        Cc += T(76, 76, "Booking", 15, K.green) + T(200, 76, "Travel", 15, K.slate) + T(324, 76, "Arrival", 15, K.orange);
        Cc += G("bk", BOOK(76, 128), 76, 128);
        Cc += G("rule", '<g class="vw-goSpin">' + GEAR(76, 192, 14, 8, K.amber, "#fff") + "</g>", 76, 192);
        Cc += G("bkOk", TAGOK(96, 114), 96, 114);
        Cc += PILL("pBk", 76, 236, "Rate confirmed", K.green, "#fff", 15);
        Cc += PILL("pBc", 76, 160, "New booking", "#fff", K.green, 15);
        Cc += G("aDesk", DESKK(324, 210, K.green), 324, 196);
        Cc += G("aBlk", R(290, 96, 68, 46, "#fff", 8, 'stroke="' + K.orange + '" stroke-width="2.5"') + HOURG(306, 119) + T(338, 124, "47", 15, K.orange, "middle", 'class="vw-n"'), 324, 119);
        Cc += G("aGhost", R(290, 96, 68, 46, "none", 8, 'stroke="' + K.orange + '" stroke-width="2" stroke-dasharray="5 4"'), 324, 119);
        Cc += G("moveArr", P("M290 108 C240 60 140 70 110 100", K.orange, 3, 'stroke-dasharray="6 5"') + F("M104 94 L118 98 L108 108Z", K.orange), 200, 84);
        Cc += PILL("pWhy", 200, 120, "Why at arrival?", K.orange, "#fff", 15);
        Cc += G("g2", AT(276, 290, GUY(K.navy)), 276, 272);
        Cc += G("noFast", AT(200, 180, SPEED(8, -8, K.slate) + AT(14, 4, GUY(K.green), 0.8)) + TAGX(222, 160), 205, 170);
        Cc += PILL("pNoF", 200, 128, "Not faster work", "#fff", K.ink, 15);
        Cc += G("idK", IDC(324, 262) + SHIELD(352, 258, 0.65, "#e9f3ee", K.green), 330, 260);
        Cc += PILL("pId", 324, 160, "ID check stays", "#e9f3ee", K.green, 15);
        Cc += G("detl", IDC(0, 0, K.navy), 0, 0);
        Cc += PILL("pDet", 76, 300, "Details early", "#fff", K.navy, 15);
        /* ---------- pD: journey bar ---------- */
        D += R(-1400, 46, 3200, 1400, "#f3f5f8");
        D += '<g data-a="num" data-p="200 80" data-n0="0" data-fmt="# min"><text data-t="" class="vw-t" x="200" y="92" font-size="34" fill="' + K.ink + '" text-anchor="middle">0 min</text></g>';
        /* v3: one zero-based minute scale, 4 units per minute: 82 min = 328, 8.1 min = 32.4, 47 min = 188 */
        D += G("barAll", R(30, 142, 328, 30, "#9aa7b8", 0), 30, 157);
        D += G("segSvc", R(30, 142, 32.4, 30, "#3fae74", 0, 'data-f=""'), 30, 157);
        var ax = P("M30 178 H358", K.ink, 1.5);
        [0, 20, 40, 60, 80].forEach(function (m) { ax += P("M" + (30 + 4 * m) + " 176 V184", K.ink, 1.5) + T(30 + 4 * m, 199, String(m), 13, K.slate); });
        D += G("ax", ax + T(200, 215, "minutes, lobby to room", 13, K.slate), 194, 196);
        D += G("segWait", P("M74 157 H350", "#fff", 3, 'stroke-dasharray="10 8"'), 212, 157);
        D += G("brW", P("M30 134 V128 H358 V134", K.ink, 2), 194, 130);
        D += PILL("pW", 200, 114, "Whole journey", "#fff", K.ink, 15);
        D += G("brD", P("M46 174 V222", K.green, 2), 46, 198);
        D += PILL("pDesk", 70, 236, "At desk", "#e9f3ee", K.green, 15);
        /* the 47-min wait is not part of every journey: its own bar on the same scale, with its 61% share */
        D += G("p47", R(30, 250, 188, 24, K.orange, 3) + T(124, 267, "47-min approval wait", 14, "#fff", "middle", 'class="vw-n"'), 30, 262);
        D += G("p61", R(30, 284, 328, 16, "#dfe4ea", 3) + R(30, 284, 200.1, 16, K.orange, 3) + T(130, 297, "61% of cases", 13, "#fff", "middle", 'class="vw-n"') +
          T(30, 315, "0%", 12, K.slate, "start") + T(358, 315, "100% of arrivals", 12, K.slate, "end"), 194, 292);
        D += PILL("p81", 110, 236, "8.1 min service", "#3fae74", "#fff", 15);
        D += PILL("pRush", 250, 274, "Rushing: tiny gain", "#fff", K.red, 15);
        D += PILL("pa1", 80, 236, "Waiting", "#fff", K.slate, 15) + PILL("pa2", 200, 272, "Handoffs", "#fff", K.slate, 15) + PILL("pa3", 310, 236, "Repeats", "#fff", K.slate, 15);
        /* ---------- pE: outcome first ---------- */
        Ee += R(-1400, 46, 3200, 1400, "#eef5f0");
        Ee += G("depts", box("", 80, 110, 120, "Reception", K.slate) + box("", 80, 170, 120, "Revenue", K.slate) + box("", 80, 230, 120, "Rooms", K.slate), 80, 170);
        Ee += G("tgt", C(300, 160, 50, "#fff", 'stroke="' + K.green + '" stroke-width="4"') + C(300, 160, 32, "#e3f3ea", 'stroke="' + K.green + '" stroke-width="3"') + C(300, 160, 12, K.green), 300, 160);
        Ee += PILL("pTgt", 300, 240, "Ready room", K.green, "#fff", 16);
        Ee += G("back", ARROW(244, 160, 152, 160, K.green, 4), 200, 160);
        /* ---------- pF: ambition ---------- */
        Ff += R(-1400, 46, 3200, 1400, "#f6f1fa");
        Ff += G("lv1", R(46, 214, 84, 50, "#d9e7f4", 8, 'stroke="' + K.navy + '" stroke-width="2"'), 88, 264);
        Ff += G("lv2", R(158, 164, 84, 100, "#e6dcf2", 8, 'stroke="' + K.plum + '" stroke-width="2"'), 200, 264);
        Ff += G("lv3", R(270, 104, 84, 160, "#fde3d6", 8, 'stroke="' + K.orange + '" stroke-width="2"'), 312, 264);
        Ff += T(88, 290, "Improve", 15, K.navy) + T(200, 290, "Redesign", 15, K.plum) + T(312, 290, "Rethink", 15, K.orange);
        Ff += G("qa", T(200, 120, "?", 40, K.ink), 200, 106);
        /* ---------- phase strip (always on) ---------- */
        var strip = G("chU", CHEV(8, 8, 128, 30, DIM, "#c9d3df"), 72, 23) + G("chI", CHEV(136, 8, 128, 30, DIM, "#c9d3df"), 200, 23) + G("chM", CHEV(264, 8, 128, 30, DIM, "#c9d3df"), 328, 23) +
          T(74, 28, "Understand", 15, K.ink, "middle", 'class="vw-n"') + T(202, 28, "Innovate", 15, K.ink, "middle", 'class="vw-n"') + T(330, 28, "Implement", 15, K.ink, "middle", 'class="vw-n"');
        var doc = G("doc", R(186, 48, 28, 36, "#fff", 3, 'stroke="#2b6f9e" stroke-width="2"') + P("M191 57 H209 M191 64 H209 M191 71 H203", "#2b6f9e", 2), 200, 66);
        return R(-1400, -1400, 3200, 3200, "#f3ecdf") +
          G("pA", A, 200, 180) + G("pB", B, 200, 180) + G("pC", Cc, 200, 180) + G("pD", D, 200, 180) + G("pE", Ee, 200, 180) + G("pF", Ff, 200, 180) + strip + doc;
      },
      init: M(only("pA"), ch(0, 0, 0), HID(["queue", "qMore", "qClock", "office", "lnk", "lnkX", "hg", "tools", "sy1", "sy2", "sy3", "strike", "sweat", "weak", "mag", "cause", "mgr", "order", "corp", "outside", "bound", "doorOpen",
        "toLbl", "t1", "t2", "t3", "gloss", "pc", "pBoxes", "pSys", "xs", "pSym", "pCau", "bk", "rule", "bkOk", "pBk", "pBc", "aGhost", "moveArr", "pWhy", "noFast", "pNoF", "idK", "pId", "detl", "pDet",
        "segSvc", "segWait", "brW", "pW", "brD", "pDesk", "p47", "p61", "p81", "pRush", "pa1", "pa2", "pa3", "back", "pTgt", "qa", "doc", "sign", "pNew", "route"]),
        { g: { x: 0 }, g2: { x: 0 }, newR: { d: 0 }, tLine: { d: 0 }, fixArr: { d: 0 }, barAll: { sx: 0.02 }, p47: { sx: 0.02 }, num: { n: 0 }, roomLt: { f: "#c9d3df" }, segSvc: { f: "#3fae74", sx: 1 },
          mag: { o: 0, x: -150, y: 40 }, aBlk: { o: 1, x: 0, y: 0 }, detl: { o: 0, x: 324, y: 236 }, tgt: { s: 0.6, o: 0 }, depts: { o: 1 },
          lv1: { sy: 0.05 }, lv2: { sy: 0.05 }, lv3: { sy: 0.05 }, doc: { o: 0, x: 0, y: 0, s: 1 } }),
      K: [
        { L: "Week 9: Innovate", a: M(ch(0, 1, 0), { g: { x: 20 } }), p: "chI" },
        { L: "How work happens", a: M(ch(1, 0, 0), ON("queue", "sign"), { g: { x: 34 } }), p: "queue" },
        { L: "Change the work", dur: 1.3, a: M(ch(0, 1, 0), { newR: { d: 1 }, pNew: { o: 1, w: 0.8 } }), p: "pNew" },
        { L: "Back at Qasr Marina", a: M(OFF("pNew"), ON("qMore", "qClock"), { newR: { d: 0 } }), p: "qClock" },
        { L: "Disconnected information", a: M(ON("tools", "sy1", "office"), { sy2: { o: 1, w: 0.25 }, sy3: { o: 1, w: 0.5 } }), p: "tools" },
        { L: "Effort is not enough", a: M(ON("sweat", "lnk", "lnkX", "weak")), fx: function (f) { f.kick("queue", 3, 0, 0); }, p: "lnkX" },
        { L: "Understand finds causes", dur: 1.3, a: M(ch(1, 0, 0), OFF("weak", "sweat"), ON("hg"), { mag: { o: 1, x: 0, y: 0 }, cause: { o: 1, w: 0.9 }, sy1: { o: 0.4 }, sy2: { o: 0.4 }, sy3: { o: 0.4 } }), p: "cause" },
        { L: "Innovate: phase five", dur: 1.2, a: M(ch(0, 1, 0), only("pB"), { mag: { o: 0 } }), p: "chI" },
        { L: "The to-be process", dur: 1.4, a: M(ON("toLbl"), { t1: { o: 1 }, tLine: { d: 1, w: 0.3 }, t2: { o: 1, w: 0.4 }, t3: { o: 1, w: 0.8 } }), p: "t2" },
        { L: "More than boxes", a: M(ON("gloss", "pBoxes"), { pc: { o: 1, w: 0.4 }, pSys: { o: 1, w: 0.5 }, xs: { o: 1, w: 1 } }), p: "xs" },
        { L: "Causes, not symptoms", dur: 1.3, a: M(OFF("gloss", "pc", "pBoxes", "pSys", "xs"), ON("pSym", "pCau"), { b3: { f: "#fde3d6" }, fixArr: { d: 1, w: 0.4 } }), p: "pCau" },
        { L: "\u201cWork faster\u201d order", a: M(only("pA"), OFF("cause", "sy1", "sy2", "sy3", "tools", "lnkX", "qMore"), ON("mgr", "order", "corp"), { g: { x: 110 } }), p: "order" },
        { L: "Delay outside reception", a: M(OFF("order", "corp"), ON("bound", "outside", "sweat")), fx: function (f) { f.kick("hg", 0, -4, 0); }, p: "outside" },
        { L: "Confirm at booking", dur: 1.3, a: M(only("pC"), ON("bk", "pBc"), { rule: { o: 1, w: 0.3, st: "go" }, bkOk: { o: 1, w: 0.9 } }), p: "bkOk" },
        { L: "Arrival wait removed", dur: 1.6, a: M(OFF("pBc"), { aBlk: { o: 0, y: 30 }, aGhost: { o: 1 }, g2: { x: 82, w: 0.5 }, pBk: { o: 1 } }), p: "aGhost" },
        { L: "Not faster work", a: M(ON("noFast", "pNoF")), p: "pNoF" },
        { L: "Why at arrival?", dur: 1.3, a: M(OFF("noFast", "pNoF"), ON("moveArr", "pWhy")), fx: function (f) { f.ghost("aGhost", -240, -10, 0); }, p: "pWhy" },
        { L: "82 min, lobby to room", dur: 1.6, a: M(only("pD"), { barAll: { sx: 1 }, num: { n: 82 } }), e: "out", p: "num" },
        { L: "Whole journey counts", a: M(ON("brW", "pW", "segSvc"), { brD: { o: 1, w: 0.4 }, pDesk: { o: 1, w: 0.5 } }), p: "pD" },
        { L: "47-min wait, 61%", dur: 1.2, a: M(OFF("pDesk", "brD"), { p47: { o: 1, sx: 1 }, p61: { o: 1, w: 0.7 } }), e: "out", p: "p61" },

        { L: "Only 8.1 min service", a: M(OFF("p47", "p61"), ON("p81"), { pRush: { o: 1, w: 0.9 } }), p: "segSvc" },
        { L: "What could we avoid?", a: M(OFF("p81", "pRush"), ON("segWait", "pa1"), { pa2: { o: 1, w: 0.2 }, pa3: { o: 1, w: 0.4 } }), p: ["pa1", "pa2", "pa3"] },
        { L: "Keep real controls", a: M(only("pC"), OFF("moveArr", "pWhy", "aGhost"), ON("idK", "pId")), p: "idK" },
        { L: "Change when and where", dur: 1.4, a: M(ON("detl", "pDet"), { detl: { x: 76, y: 268 }, pId: { o: 0.5 } }), p: "detl" },
        { L: "Start from the outcome", dur: 1.2, a: M(only("pE"), { tgt: { o: 1, s: 1 }, pTgt: { o: 1, w: 0.4 }, back: { o: 1, w: 0.7 }, depts: { o: 0.3, w: 0.7 } }), e: "back", p: "tgt" },
        { L: "Right room, no wait", dur: 2, a: M(only("pA"), OFF("queue", "qClock", "mgr", "bound", "outside", "office", "lnk", "hg", "sweat"), ON("route"), { g: { x: 292, w: 0.3 }, doorOpen: { o: 1, w: 1.5 }, roomLt: { f: "#3fae74", w: 1.5 } }), e: "io", p: "roomDoor" },
        { L: "Design, not implement", dur: 1.6, a: M(ch(0, 1, 0), { pA: { o: 0.35 }, doc: { o: 1, x: 128, s: 1.2 } }), e: "io", p: "chM" },
        { L: "How ambitious?", dur: 1.3, a: M(only("pF"), ch(0, 1, 0), { doc: { o: 0 }, lv1: { sy: 1, w: 0.2 }, lv2: { sy: 1, w: 0.4 }, lv3: { sy: 1, w: 0.6 }, qa: { o: 1, w: 0.9 } }), e: "out", p: "lv2" }
      ]
    });
  })();
  addCSS("O1a", baseCSS("O1a", { bg: "#f3ecdf", ink: K.ink, acc: K.orange, halo: "rgba(255,255,255,.88)" }));

  /* =====================================================================
     O1b  THREE LEVELS OF AMBITION  (v2 - rebuilt, audit score 7/6)
     One vertical arrival process chain whose boxes keep their identity while
     each level changes it: Improve (same boxes, better work), Redesign (rate
     approval moves to booking, details before arrival), Rethink (phone
     pre-check, room ready, phone opens the door).
       chain morph       benchmark: 133 Path tween (Observable) - geometry changes, identity kept
       manager table     benchmark: 109 teamwork (LottieFiles) - people appear as a team
       gain/risk gauges  benchmark: 129 Arc tween (Observable) - value moves to new level
       problem-to-level matching  benchmark: 111 Hierarchy traversal animated (Observable)
     ===================================================================== */
  (function () {
    var X = 90;
    function bx(name, y, label, col) {
      return G(name, R(X - 60, y - 15, 120, 30, "#fff", 7, 'data-f="" stroke="' + (col || K.navy) + '" stroke-width="2.5"') + T(X, y + 5, label, 15, K.ink, "middle", 'class="vw-n"'), X, y);
    }
    function tabs() {
      return [["tb1", 70, "Improve", K.navy], ["tb2", 200, "Redesign", K.plum], ["tb3", 330, "Rethink", K.orange]].map(function (t) {
        return G(t[0], R(t[1] - 56, 12, 112, 28, "#fff", 14, 'data-f="" stroke="' + t[3] + '" stroke-width="2"') + T(t[1], 31, t[2], 15, t[3], "middle", 'class="vw-n"'), t[1], 26);
      }).join("");
    }
    function rk(n) { var C = ["#eceff3", "#9fd8b8", "#f3cf7a", "#f2a385"]; return { rk1: { f: n === 1 ? C[1] : C[0] }, rk2: { f: n === 2 ? C[2] : C[0] }, rk3: { f: n === 3 ? C[3] : C[0] } }; }
    function lv(n) { return { tb1: { f: n === 1 ? "#d9e7f4" : "#fff" }, tb2: { f: n === 2 ? "#e6dcf2" : "#fff" }, tb3: { f: n === 3 ? "#fde3d6" : "#fff" } }; }
    SC("O1b", {
      title: "Three levels of ambition", W: 400, H: 320, acc: K.navy,
      B: { tok: [0, 54, 162, 290], bArr: [28, 50, 152, 290], bId: [28, 50, 152, 290], gG: [240, 260, 390, 274] },
      art: function () {
        var s = R(-1400, -1400, 3200, 3200, "#f4f1ea") + tabs();
        /* chain */
        s += G("arrows", [90, 130, 170, 210, 250].map(function (y) { return P("M" + X + " " + (y - 4) + " V" + (y + 4), K.slate, 2.5); }).join(""), X, 170);
        s += bx("bArr", 70, "Arrive") + bx("bQ", 110, "Queue", K.slate) + bx("bId", 150, "ID scan") + bx("bRate", 190, "Rate OK?", K.orange) + bx("bKey", 230, "Key") + bx("bRoom", 270, "Room", K.green);
        s += bx("bDet", 110, "Guest details", K.plum) + bx("bRate2", 70, "Rate OK?", K.plum);
        s += bx("bPre", 90, "Phone pre-check", K.orange) + bx("bReady", 170, "Room ready", K.green) + bx("bPkey", 230, "Phone key", K.orange);
        s += G("tagBk", T(160, 75, "at booking", 15, K.plum, "start"), 200, 70) + G("tagBf", T(160, 115, "before arrival", 15, K.plum, "start"), 210, 110);
        s += G("errs", TAGX(152, 150) + TAGX(152, 230), 152, 190) + G("oks", TAGOK(152, 150) + TAGOK(152, 230), 152, 190);
        s += G("tok", C(X - 76, 70, 8, K.navy) + C(X - 79, 68, 1.5, "#fff") + C(X - 73, 68, 1.5, "#fff"), X - 76, 70);
        s += G("hg", HOURG(X + 78, 190), X + 78, 190);
        s += G("conn", [90, 130, 170, 210, 250].map(function (y) { return P("M" + X + " " + (y - 6) + " V" + (y + 6), K.plum, 5); }).join(""), X, 170);
        s += G("qAll", T(250, 180, "?", 64, K.orange), 250, 160);
        s += G("noDesk", P("M28 176 L152 204 M152 176 L28 204", K.red, 3) + P("M28 216 L152 244 M152 216 L28 244", K.red, 3), X, 170);
        /* context area (x 170-390, y 48-240) */
        s += G("table", E(270, 150, 100, 22, "#b98b5e") + AT(196, 140, GUY(K.green)) + AT(244, 130, GUY(K.ink)) + AT(296, 130, GUY(K.plum)) + AT(344, 140, GUY(K.navy)), 270, 130);
        s += PILL("p82", 270, 210, "82 min: too long", K.orange, "#fff", 15);
        s += PILL("sayA", 230, 76, "Fix the steps", "#fff", K.green, 15) + PILL("sayB", 300, 216, "Change the journey", "#fff", K.navy, 15);
        s += PILL("pCause", 280, 100, "Causes decide", K.ink, "#fff", 15);
        s += G("mag", AT(170, 190, C(0, 0, 20, "rgba(255,255,255,.35)", 'stroke="' + K.ink + '" stroke-width="3.5"') + P("M14 14 L26 26", K.ink, 5)), 170, 190);
        s += PILL("pSame", 280, 100, "Same steps", "#fff", K.navy, 15);
        s += G("tools", AT(220, 150, R(-12, -15, 24, 30, "#fff", 3, 'stroke="' + K.navy + '" stroke-width="2"') + P("M-6 -6 H6 M-6 0 H6 M-6 6 H3", K.navy, 2)) + AT(270, 150, R(-16, -10, 32, 20, K.ink, 4) + R(-12, -6, 24, 12, "#3fd1ff", 2)), 245, 150);
        s += PILL("pTools", 280, 196, "Clear steps, quick scan", "#fff", K.navy, 15);
        s += PILL("pCons", 280, 100, "Fewer mistakes", K.green, "#fff", 15);
        s += PILL("pSound", 280, 100, "Sound process?", "#fff", K.green, 15);
        s += PILL("pUneven", 280, 136, "Uneven execution", "#fff", K.orange, 15);
        s += G("revOff", OFFICE(300, 190, 110, 46, K.plum) + T(300, 204, "Revenue", 15, K.plum, "middle", 'class="vw-n"'), 300, 190) + G("brk", P("M178 190 H244", K.plum, 3, 'stroke-dasharray="6 5"') + TAGX(212, 190), 212, 190);
        s += PILL("pStill", 280, 100, "Wait remains", K.red, "#fff", 15);
        s += PILL("pConn", 280, 100, "Redesign connections", K.plum, "#fff", 15);
        s += G("wfIcons", AT(196, 150, GUY(K.green), 0.8) + OFFICE(260, 140, 44, 30, K.plum) + R(318, 130, 34, 24, K.ink, 3) + R(322, 134, 26, 16, "#9fe3c0", 2) +
          P("M210 140 H236 M284 140 H316", K.plum, 3, 'class="vw-flow"'), 270, 140);
        s += PILL("pWf", 280, 196, "People, teams, systems", "#fff", K.plum, 15);
        s += PILL("pMove", 280, 196, "Rate at booking", K.plum, "#fff", 15);
        s += G("speedX", SPEED(270, 150, K.slate) + TAGX(280, 140), 270, 150);
        s += PILL("pNotFast", 280, 196, "Not just faster", "#fff", K.plum, 15);
        s += PILL("pQuestion", 280, 100, "Question the service", K.orange, "#fff", 15);
        s += PILL("pNoDesk", 280, 196, "Skip the desk?", "#fff", K.orange, 15);
        s += PILL("pRethink", 280, 100, "Rethink the service", K.orange, "#fff", 15);
        s += G("preIcons", IDC(210, 140) + AT(260, 140, R(-15, -10, 30, 20, K.plum, 3) + R(-15, -5, 30, 4, K.ink)) + BOOK(316, 140), 262, 140);
        s += PILL("pTravel", 280, 196, "Done before travel", "#fff", K.orange, 15);
        s += G("doorO", R(250, 110, 44, 80, K.navy, 3) + G("doorL", R(254, 114, 36, 72, "#ffe9a8", 2), 272, 150) + PHONE(206, 126, 22, 40, K.ink, "#9fe3c0"), 260, 150);
        s += PILL("pPhone", 280, 216, "Phone opens door", K.green, "#fff", 15);
        s += PILL("r1", 280, 80, "New technology", "#fde3d6", K.orange, 15) + PILL("r2", 280, 116, "New roles", "#fde3d6", K.orange, 15) + PILL("r3", 280, 152, "New skills", "#fde3d6", K.orange, 15);
        s += PILL("pInd", 280, 196, "Indicative only", "#fff", K.ink, 15, 'stroke="' + K.ink + '" stroke-width="1.5" stroke-dasharray="4 3"');
        /* matching panel */
        s += G("match", [["Uneven work", 90, K.navy], ["Structural waiting", 150, K.plum], ["Needs changed", 210, K.orange]].map(function (m, i) {
          return G("mp" + i, R(16, m[1] - 16, 170, 32, "#fff", 8, 'data-f="" stroke="' + m[2] + '" stroke-width="2"') + T(101, m[1] + 5, m[0], 15, K.ink, "middle", 'class="vw-n"') +
            ARROW(190, m[1], 228, m[1], m[2], 3) + R(234, m[1] - 16, 120, 32, m[2], 8) + T(294, m[1] + 5, ["Improve", "Redesign", "Rethink"][i], 15, "#fff", "middle", 'class="vw-n"'), 185, m[1]);
        }).join(""), 185, 150);
        s += PILL("pMatch", 200, 250, "Match the problem", K.ink, "#fff", 15);
        s += G("blue", R(20, 54, 360, 190, "#e4eef8", 10, 'stroke="#9fbcd9" stroke-width="2"') + P("M50 210 C120 120 240 220 340 90", "#2b6f9e", 3, 'stroke-dasharray="8 6"') + DOORK(340, 120) + AT(56, 216, GUY(K.navy)), 200, 150);
        s += PILL("pDesign", 200, 250, "Design, then decide", "#2b6f9e", "#fff", 15);
        /* gauges */
        /* v3: indicative gain drawn as a RANGE on a labelled 0-100% scale (1.5 units per %); risk is qualitative (Low / Medium / Higher) */
        s += G("gauges", T(200, 272, "Gain", 15, K.green, "start") + T(200, 305, "Risk", 15, K.orange, "start") + R(240, 262, 150, 10, "#eceff3", 2) +
          P("M240 272 V276 M315 272 V276 M390 272 V276", K.slate, 1.5) + T(240, 286, "0%", 11, K.slate, "start") + T(315, 286, "50%", 11, K.slate) + T(390, 286, "100%", 11, K.slate, "end") +
          '<rect data-a="gG" x="240" y="262" width="0" height="10" rx="2" fill="#3fae74"/>' +
          G("rk1", R(240, 292, 49, 17, "#eceff3", 3, 'data-f=""') + T(264.5, 305, "Low", 12, K.ink, "middle", 'class="vw-n"'), 264, 300) +
          G("rk2", R(290.5, 292, 49, 17, "#eceff3", 3, 'data-f=""') + T(315, 305, "Medium", 12, K.ink, "middle", 'class="vw-n"'), 315, 300) +
          G("rk3", R(341, 292, 49, 17, "#eceff3", 3, 'data-f=""') + T(365.5, 305, "Higher", 12, K.ink, "middle", 'class="vw-n"'), 365, 300), 300, 285);
        s += G("gv1", T(390, 254, "5-15%, low", 15, K.ink, "end"), 340, 250) + G("gv2", T(390, 254, "20-50%, medium", 15, K.ink, "end"), 340, 250) + G("gv3", T(390, 254, "over 50%, high", 15, K.ink, "end"), 340, 250);
        return s;
      },
      init: M(HID(["arrows", "bArr", "bQ", "bId", "bRate", "bKey", "bRoom", "bDet", "bPre", "bReady", "bPkey", "tagBk", "tagBf", "errs", "oks", "tok", "hg", "conn", "qAll", "noDesk", "p82", "sayA", "sayB", "pCause", "mag", "pSame",
        "tools", "pTools", "pCons", "pSound", "pUneven", "revOff", "brk", "pStill", "pConn", "wfIcons", "pWf", "pMove", "speedX", "pNotFast", "pQuestion", "pNoDesk", "pRethink", "preIcons", "pTravel", "doorO", "pPhone",
        "r1", "r2", "r3", "pInd", "match", "pMatch", "blue", "pDesign", "gauges", "gv1", "gv2", "gv3", "mp0", "mp1", "mp2", "bRate2"]), lv(0), rk(0),
        { table: { o: 1 }, bArr: { y: 0 }, bId: { y: 0 }, bRate: { y: 0, f: "#fff" }, bKey: { y: 0 }, tok: { y: 0 }, gG: { A: { x: 240, width: 0 } }, doorL: { sx: 0.05 }, bPre: { s: 0.4 }, mp0: { f: "#fff" } }),
      K: (function () {
        var CTX = ["p82", "sayA", "sayB", "pCause", "mag", "pSame", "tools", "pTools", "pCons", "pSound", "pUneven", "revOff", "brk", "pStill", "pConn", "wfIcons", "pWf", "pMove", "speedX", "pNotFast", "pQuestion", "pNoDesk",
          "pRethink", "preIcons", "pTravel", "doorO", "pPhone", "r1", "r2", "r3", "pInd", "table", "qAll"];
        function cx(keep) { return HID(CTX.filter(function (n) { return (keep || []).indexOf(n) < 0; })); }
        var CHAIN1 = ON("arrows", "bArr", "bQ", "bId", "bRate", "bKey", "bRoom");
        function gv(n) { var o = rk(n); o.gG = { A: n === 1 ? { x: 247.5, width: 15 } : n === 2 ? { x: 270, width: 45 } : n === 3 ? { x: 315, width: 75 } : { x: 240, width: 0 } }; return M(o, { gv1: { o: n === 1 ? 1 : 0 }, gv2: { o: n === 2 ? 1 : 0 }, gv3: { o: n === 3 ? 1 : 0 } }); }
        return [
          { L: "Managers at the table", a: {}, p: "table" },
          { L: "82 minutes is too long", a: M(ON("p82")), e: "back", p: "p82" },
          { L: "Fix steps or the journey?", a: M(cx(["table"]), ON("sayA"), { sayB: { o: 1, w: 0.4 } }), p: ["sayA", "sayB"] },
          { L: "Causes decide ambition", dur: 1.2, a: M(cx(), CHAIN1, ON("pCause", "mag"), { bRate: { f: "#fde3d6" } }), p: "bRate" },
          { L: "Level 1: improve steps", a: M(cx(), lv(1), ON("pSame", "gauges"), { bRate: { f: "#fff" } }), p: "tb1" },
          { L: "Clear steps, quick scan", a: M(cx(), ON("tools", "pTools", "errs"), { bId: { f: "#d9e7f4" } }), p: "bId" },
          { L: "Fewer mistakes", a: M(cx(), ON("pCons"), { errs: { o: 0 }, oks: { o: 1, w: 0.5 } }), p: "oks" },
          { L: "5-15%, low risk", dur: 1.2, a: M(cx(), gv(1)), p: "gauges" },
          { L: "When the process is sound", a: M(cx(), ON("pSound", "pUneven")), p: "pUneven" },
          { L: "The approval wait remains", dur: 1.4, a: M(cx(), OFF("oks"), ON("revOff", "brk", "pStill", "hg", "tok"), { tok: { y: 120 }, bRate: { f: "#fde3d6" }, bId: { f: "#fff" } }), p: "hg" },
          { L: "Level 2: redesign workflow", a: M(cx(), lv(2), OFF("hg", "tok"), ON("conn", "pConn")), p: "tb2" },
          { L: "Workflow, defined", a: M(cx(), ON("wfIcons", "pWf")), p: "wfIcons" },
          { L: "Rate at booking", dur: 1.4, a: M(cx(), ON("pMove", "tagBk", "tagBf", "bDet"), { bRate: { o: 0 }, bRate2: { o: 1, w: 0.5 }, bArr: { y: 80 }, bQ: { o: 0 }, bId: { y: 40, w: 0.6 }, conn: { o: 0 } }), p: "bRate" },
          { L: "Connections, not speed", a: M(cx(), ON("speedX", "pNotFast", "conn")), p: "conn" },
          { L: "20-50%, medium risk", dur: 1.2, a: M(cx(), gv(2)), p: "gauges" },
          { L: "Question the service", a: M(cx(), lv(3), OFF("tagBk", "tagBf"), ON("qAll", "pQuestion"), { conn: { o: 0 } }), e: "back", p: "tb3" },
          { L: "Skip the desk?", a: M(cx(), ON("noDesk", "pNoDesk")), p: "noDesk" },
          { L: "Level 3: rethink", dur: 1.4, a: M(cx(), OFF("noDesk", "tagBk", "tagBf"), ON("pRethink", "bReady", "bPkey"), { bPre: { o: 1, s: 1 }, bRate2: { o: 0 }, bDet: { o: 0 }, bId: { o: 0 }, bArr: { o: 0 }, bKey: { o: 0 } }), p: "bPre" },
          { L: "Checks before travel", a: M(cx(), ON("preIcons", "pTravel")), p: "preIcons" },
          { L: "Phone opens the door", dur: 1.4, a: M(cx(), ON("doorO", "pPhone"), { doorL: { sx: 1, w: 0.4 } }), p: "doorO" },
          { L: "Over 50%, higher risk", dur: 1.2, a: M(cx(), gv(3)), p: "gauges" },
          { L: "Why the risk is higher", a: M(cx(), { r1: { o: 1 }, r2: { o: 1, w: 0.2 }, r3: { o: 1, w: 0.4 } }), p: ["r1", "r2", "r3"] },
          { L: "Indicative, not promised", a: M(cx(), ON("pInd")), p: "pInd" },
          { L: "Match the problem", dur: 1.2, a: M(cx(), lv(0), OFF("bPre", "bReady", "bPkey", "bRoom", "arrows", "gauges", "gv3"), ON("match", "pMatch"), { mp0: { o: 1 }, mp1: { o: 1, w: 0.3 }, mp2: { o: 1, w: 0.6 } }), p: "match" },
          { L: "Execution or structure", a: M(cx(), lv(2), { mp2: { o: 0.25 }, mp0: { f: "#d9e7f4" } }), p: ["mp0", "mp1"] },
          { L: "When needs change", a: M(cx(), lv(3), { mp2: { o: 1 }, mp0: { o: 0.3, f: "#fff" }, mp1: { o: 0.3 } }), p: "mp2" },
          { L: "Design first, then decide", dur: 1.3, a: M(cx(), lv(0), OFF("match", "pMatch"), ON("blue", "pDesign")), e: "back", p: "blue" }
        ];
      })()
    });
  })();
  addCSS("O1b", baseCSS("O1b", { bg: "#f4f1ea", ink: K.ink, acc: K.navy, halo: "rgba(255,255,255,.88)" }));

  /* =====================================================================
     O1c  DESIGNING QASR'S FUTURE ARRIVAL  (v2 - rebuilt, audit score 7/6)
     Panels:
       pW  Workshop: evidence notes, the guest's goal, the "Ready room" anchor
           benchmark: 084 Process - What is a Motion Designer? (Behance) - narrative vignettes
       pR  One shared record filled in turn: guest details (before arrival), rate (revenue),
           room (housekeeping), identity (kiosk), with reception kept for help
           benchmark: 076 Workflow Animation (Dribbble) - each actor triggers the next notification
       pQ  Five design questions applied to real activity cards: print copy, rate at desk,
           details at desk, re-typing, duplicate vs legal ID check
           benchmark: 126 Stacked-to-grouped bars (Observable) - cards keep identity as they move columns
     ===================================================================== */
  (function () {
    var PANELS = ["pW", "pR", "pQ"];
    function only(p) { var o = {}; PANELS.forEach(function (n) { o[n] = { o: n === p ? 1 : 0 }; }); return o; }
    var QS = ["Necessary?", "Right person?", "Right time?", "Repeated?", "Real risk?"];
    function qrow(i) { var y = 76 + i * 36; return G("q" + i, R(10, y - 15, 140, 30, "#fff", 7, 'data-f="" stroke="#c9d3df" stroke-width="1.5"') + T(20, y + 5, QS[i], 15, K.ink, "start"), 80, y); }
    function card(name, x, y, label, col) { return G(name, R(x - 56, y - 15, 112, 30, "#fff", 7, 'data-f="" stroke="' + col + '" stroke-width="2.5"') + T(x, y + 5, label, 15, K.ink, "middle", 'class="vw-n"'), x, y); }
    function field(name, y, label) {
      return T(134, y + 5, label, 15, K.ink, "start") + G(name, TAGOK(242, y), 242, y);
    }
    SC("O1c", {
      title: "Designing Qasr's future arrival", W: 400, H: 320, acc: K.green,
      B: { cRate: [160, 70, 392, 230], cDet: [160, 70, 392, 230], cRe2: [160, 70, 392, 230], cPrint: [280, 70, 392, 230], mk: [20, 290, 380, 310] },
      art: function () {
        var Wk = "", Rc = "", Q = "";
        /* pW workshop */
        Wk += G("board", R(30, 56, 200, 130, "#fff", 8, 'stroke="' + K.ink + '" stroke-width="2.5"') + R(120, 186, 20, 30, K.slate, 2), 130, 120);
        Wk += G("team", AT(70, 260, GUY(K.green)) + AT(120, 266, GUY(K.plum)) + AT(170, 260, GUY(K.navy)), 120, 246);
        Wk += G("notes", R(44, 70, 84, 34, "#fff3c4", 4) + T(86, 92, "Waiting", 15, K.ink, "middle", 'class="vw-n"') + R(44, 112, 84, 34, "#ffe0cc", 4) + T(86, 134, "Re-checks", 15, K.ink, "middle", 'class="vw-n"'), 86, 108);
        Wk += G("blank", R(140, 72, 80, 100, "none", 6, 'stroke="' + K.slate + '" stroke-width="2" stroke-dasharray="6 5"') + T(180, 130, "?", 30, K.slate, "middle", 'class="vw-n"'), 180, 122);
        Wk += PILL("pNo", 130, 300, "No agreed design yet", "#fff", K.ink, 15);
        Wk += G("guest", AT(300, 262, GUY(K.navy), 1.4), 300, 236);
        Wk += G("bub", C(300, 150, 44, "#fff", 'stroke="' + K.navy + '" stroke-width="2.5"') + C(292, 204, 7, "#fff", 'stroke="' + K.navy + '" stroke-width="2"'), 300, 160);
        Wk += G("bubQ", T(300, 162, "?", 34, K.orange, "middle", 'class="vw-n"'), 300, 150);
        Wk += G("bubRoom", R(282, 128, 36, 30, K.navy, 2) + R(286, 132, 28, 26, "#ffe9a8", 2) + TAGOK(318, 128), 300, 143);
        Wk += G("means", [0, 1, 2].map(function (i) { return R(236 + i * 22, 210, 16, 20, "#fff", 2, 'stroke="#9aa7b8" stroke-width="1.5"'); }).join("") + T(260, 250, "only means", 15, K.slate), 260, 230);
        /* anchor + target (shared top-right) */
        var tgt = G("tgt", C(338, 70, 22, "#fff", 'stroke="' + K.green + '" stroke-width="3"') + C(338, 70, 9, K.green) + T(338, 108, "Ready room", 15, K.green), 338, 80) +
          G("anch", AT(282, 70, P("M0 -12 V12 M-10 4 Q0 18 10 4 M-6 -6 H6", K.navy, 3.2) + C(0, -15, 3.5, "none", 'stroke="' + K.navy + '" stroke-width="2.5"')) + P("M292 70 H312", K.navy, 2, 'stroke-dasharray="3 3"'), 290, 70);
        /* pR record */
        Rc += G("rec", R(120, 120, 140, 116, "#fff", 10, 'stroke="' + K.navy + '" stroke-width="2.5"') + R(120, 120, 140, 22, K.navy, 8) + T(190, 136, "Shared record", 15, "#fff", "middle", 'class="vw-n"') +
          field("f1", 158, "Details") + field("f2", 182, "Rate") + field("f3", 206, "Room") + field("f4", 228, "ID: kiosk"), 190, 178);
        Rc += G("gPhone", PHONE(36, 120, 26, 46, K.ink, "#9fe3c0") + AT(76, 176, GUY(K.navy)), 60, 150);
        Rc += G("env", AT(49, 108, R(-12, -8, 24, 16, "#fff", 2, 'stroke="' + K.orange + '" stroke-width="2"') + P("M-12 -8 L0 2 L12 -8", K.orange, 2)), 49, 108);
        Rc += G("flow1", P("M80 150 H118", K.green, 3, 'class="vw-flow"'), 99, 150);
        Rc += G("revR", OFFICE(60, 236, 90, 40, K.amber) + T(60, 250, "Revenue", 15, K.amber, "middle", 'class="vw-n"'), 60, 236);
        Rc += G("flow2", P("M106 230 C114 210 116 190 120 184", K.amber, 3, 'class="vw-flow"'), 112, 205);
        Rc += G("hkR", OFFICE(332, 160, 120, 40, K.plum) + T(332, 174, "Housekeeping", 15, K.plum, "middle", 'class="vw-n"'), 330, 160);
        Rc += G("flow3", P("M278 168 C270 190 266 200 262 206", K.plum, 3, 'class="vw-flow"'), 270, 188);
        Rc += G("kioskR", KIOSKK(300, 266) + AT(352, 266, GUY(K.green)), 326, 246);
        Rc += G("flow4", P("M290 226 H262", K.navy, 3, 'class="vw-flow"'), 276, 226);
        Rc += G("help", R(340, 196, 46, 26, "#fff", 8, 'stroke="' + K.green + '" stroke-width="2"') + T(363, 214, "Help", 15, K.green, "middle", 'class="vw-n"'), 363, 209);
        Rc += G("tl", P("M20 300 H380", K.ink, 2) + P("M200 284 V314", K.slate, 2, 'stroke-dasharray="4 3"') + T(100, 293, "Before arrival", 15, K.ink) + T(300, 293, "Arrival", 15, K.ink), 200, 296);
        Rc += G("mk", C(100, 300, 7, K.orange), 100, 300);
        Rc += G("whenHow", SHIELD(258, 228, 0.6, "#e9f3ee", K.green) + SHIELD(258, 182, 0.6, "#e9f3ee", K.green), 258, 205);
        Rc += PILL("pKept", 190, 92, "Checks kept, moved", K.green, "#fff", 15);
        Rc += G("feat", [["Earlier checks", 24, 62], ["Shared info", 212, 62], ["Fewer handoffs", 24, 94], ["Human help", 212, 94]].map(function (f) { return TAGOK(f[1] + 10, f[2]) + T(f[1] + 26, f[2] + 5, f[0], 15, K.ink, "start"); }).join(""), 200, 78);
        Rc += G("prop", AT(190, 80, R(-82, -20, 164, 40, "rgba(255,255,255,.9)", 8, 'stroke="' + K.navy + '" stroke-width="3" stroke-dasharray="8 5"') + T(0, 7, "PROPOSAL", 20, K.navy, "middle", 'class="vw-n"'), 1, -4), 190, 80);
        Rc += G("altR", P("M300 246 C300 270 250 280 210 270", K.orange, 3.5, 'stroke-dasharray="7 6"') + AT(196, 280, R(-28, -12, 56, 24, "#b98b5e", 4) + AT(0, -12, GUY(K.green), 0.7)), 250, 262);
        Rc += PILL("pAlt", 130, 92, "Not everyone digital", K.orange, "#fff", 15);
        Rc += G("next", AT(70, 210, R(-24, -16, 22, 32, "#e3eef8", 4, 'stroke="' + K.navy + '" stroke-width="2"') + R(2, -16, 22, 32, "#e3f3ea", 4, 'stroke="' + K.green + '" stroke-width="2"')) + AT(330, 230, R(-14, -18, 28, 36, "#fff", 4, 'stroke="' + K.navy + '" stroke-width="2.5"') + CHECK(0, -4, K.green, 2.5) + CHECK(0, 8, K.green, 2.5)), 200, 220);
        Rc += PILL("pNext", 190, 92, "Compare, then test", K.navy, "#fff", 15);
        Rc += G("back", ARROW(318, 82, 266, 120, K.green, 3.5), 292, 100);
        Rc += PILL("pOut", 190, 92, "Outcome first", K.green, "#fff", 15);
        /* pQ questions */
        Q += T(216, 62, "Booking", 15, K.green) + T(336, 62, "Arrival", 15, K.orange) + R(160, 70, 112, 160, "#e6f2ea", 8) + R(280, 70, 112, 160, "#fbe8de", 8);
        for (var i = 0; i < 5; i++) Q += qrow(i);
        Q += card("cPrint", 336, 100, "Print copy", K.slate) + G("printer", AT(336, 150, R(-20, -10, 40, 22, K.slate, 4) + R(-12, -20, 24, 10, "#fff", 1, 'stroke="#9aa7b8"') + R(-12, 10, 24, 14, "#fff", 1, 'stroke="#9aa7b8"')), 336, 150);
        Q += G("db", AT(216, 150, E(0, -10, 16, 6, "#5b8fc4") + R(-16, -10, 32, 22, K.navy) + E(0, 12, 16, 6, "#2b6f9e") + E(0, -10, 16, 6, "#8fb3d9")), 216, 150);
        Q += PILL("pStored", 216, 194, "Already stored", "#fff", K.navy, 15);
        Q += card("cRate", 336, 100, "Rate at desk", K.orange) + G("deskQ", AT(336, 170, R(-30, -12, 60, 26, "#b98b5e", 4) + AT(0, -12, GUY(K.green), 0.7)) + [0, 1, 2].map(function (k) { return AT(296 + k * 14, 214, GUY(k % 2 ? K.orange : "#5b8fc4"), 0.5); }).join(""), 330, 180);
        Q += G("revQ", AT(216, 160, AT(0, 10, GUY(K.amber), 0.9)) + TAGOK(236, 132), 216, 150);
        Q += PILL("pRevOK", 216, 210, "Revenue approved", K.amber, "#fff", 15);
        Q += card("cDet", 336, 100, "Guest details", K.navy);
        Q += card("cRe1", 336, 100, "Type details", K.orange) + card("cRe2", 336, 138, "Type again", K.orange);
        Q += G("recQ", R(178, 120, 76, 56, "#fff", 8, 'stroke="' + K.navy + '" stroke-width="2.5"') + R(178, 120, 76, 14, K.navy, 6) + P("M188 146 H244 M188 158 H232", "#9aa7b8", 2.5), 216, 148);
        Q += card("cDup", 336, 100, "Duplicate ID", K.orange) + card("cLegal", 336, 150, "Legal ID check", K.green) + G("shQ", SHIELD(336, 186, 0.9, "#e9f3ee", K.green), 336, 186);
        Q += G("binQ", F("M40 262 H124 L116 306 H48Z", "#8a7f6c") + T(82, 292, "Waste", 15, "#fff", "middle", 'class="vw-n"'), 82, 284);
        Q += G("safeQ", SHIELD(290, 280, 1.2, "#e9f3ee", K.green) + T(308, 286, "Safeguard", 15, K.green, "start"), 330, 280);
        Q += PILL("pSimpler", 216, 280, "Simpler work", K.green, "#fff", 15);
        Q += PILL("pNoBn", 216, 280, "No desk bottleneck", K.green, "#fff", 15);
        Q += PILL("pBusy", 216, 280, "Off the busy desk", K.green, "#fff", 15);
        Q += PILL("pReuse", 216, 280, "Reuse verified data", K.green, "#fff", 15);
        Q += PILL("pRisk", 216, 280, "Duplicate vs legal", K.ink, "#fff", 15);
        return R(-1400, -1400, 3200, 3200, "#eef3ef") + G("pW", Wk, 200, 180) + G("pR", Rc, 200, 180) + G("pQ", Q, 200, 180) + tgt;
      },
      init: M(only("pW"), HID(["notes", "blank", "pNo", "guest", "bub", "bubQ", "bubRoom", "means", "tgt", "anch", "env", "flow1", "flow2", "flow3", "flow4", "help", "whenHow", "pKept", "feat", "prop", "altR", "pAlt", "next", "pNext", "back", "pOut",
        "revR", "hkR", "kioskR", "f1", "f2", "f3", "f4", "cPrint", "printer", "db", "pStored", "cRate", "deskQ", "revQ", "pRevOK", "cDet", "cRe1", "cRe2", "recQ", "cDup", "cLegal", "shQ", "binQ", "safeQ",
        "pSimpler", "pNoBn", "pBusy", "pReuse", "pRisk"]),
        { board: { o: 1 }, team: { o: 1 }, tgt: { s: 0.5 }, mk: { x: 0 }, rec: { o: 0.2 }, cRate: { x: 0 }, cDet: { x: 0 }, cRe2: { x: 0, y: 0 }, deskQ: { o: 0 }, cPrint: { s: 1 },
          q0: { f: "#fff" }, q1: { f: "#fff" }, q2: { f: "#fff" }, q3: { f: "#fff" }, q4: { f: "#fff" } }),
      K: (function () {
        function qh(n) { var o = {}; for (var k = 0; k < 5; k++) o["q" + k] = { f: k === n ? "#fff4cf" : "#fff" }; return o; }
        var QP = ["cPrint", "printer", "db", "pStored", "cRate", "deskQ", "revQ", "pRevOK", "cDet", "cRe1", "cRe2", "recQ", "cDup", "cLegal", "shQ", "binQ", "safeQ", "pSimpler", "pNoBn", "pBusy", "pReuse", "pRisk"];
        function qc(keep) { return HID(QP.filter(function (n) { return (keep || []).indexOf(n) < 0; })); }
        return [
          { L: "The redesign workshop", a: {}, p: "board" },
          { L: "Evidence, no design yet", a: M(ON("notes", "blank", "pNo")), p: "blank" },
          { L: "What does the guest want?", a: M(OFF("pNo", "team"), ON("guest", "bub", "bubQ"), { board: { o: 0.3 }, notes: { o: 0.3 }, blank: { o: 0.3 } }), e: "back", p: "bub" },
          { L: "A ready room", a: M(OFF("bubQ"), ON("bubRoom", "means")), e: "back", p: "bubRoom" },
          { L: "The design anchor", dur: 1.2, a: M({ tgt: { o: 1, s: 1 }, anch: { o: 1, w: 0.4 } }), e: "back", p: "tgt" },
          { L: "Invite before arrival", a: M(only("pR"), ON("env")), p: "env" },
          { L: "One shared record", dur: 1.2, a: M(ON("flow1"), { rec: { o: 1 }, f1: { o: 1, w: 0.5 }, env: { o: 0 } }), p: "f1" },
          { L: "Revenue confirms the rate", a: M(ON("revR", "flow2"), { f2: { o: 1, w: 0.5 } }), p: "f2" },
          { L: "Housekeeping: ready room", a: M(ON("hkR", "flow3"), { f3: { o: 1, w: 0.5 } }), p: "f3" },
          { L: "Kiosk checks identity", dur: 1.3, a: M(ON("kioskR", "flow4", "help"), { mk: { x: 200 }, f4: { o: 1, w: 0.7 } }), p: "f4" },
          { L: "Checks kept, moved", a: M(ON("whenHow", "pKept"), OFF("flow1", "flow2", "flow3", "flow4")), p: "whenHow" },
          { L: "Five design questions", dur: 1.2, a: M(only("pQ"), { tgt: { o: 0 }, anch: { o: 0 } }), p: "q0" },
          { L: "Is it necessary?", a: M(qh(0), qc(), ON("cPrint")), p: "q0" },
          { L: "Printing a stored copy", a: M(qh(0), qc(["cPrint"]), ON("printer", "db", "pStored")), fx: function (f) { f.kick("printer", 0, -3, 0); }, p: "db" },
          { L: "Remove the waste", dur: 1.1, a: M(qh(0), qc(), ON("binQ", "pSimpler"), { cPrint: { o: 0, s: 0.6 } }), p: "binQ" },
          { L: "The right person?", a: M(qh(1), qc(), ON("cRate", "deskQ")), p: "q1" },
          { L: "Revenue already approved", a: M(qh(1), qc(["cRate", "deskQ"]), ON("revQ", "pRevOK")), p: "revQ" },
          { L: "Rate at booking stage", dur: 1.3, a: M(qh(1), qc(["revQ"]), ON("cRate", "pNoBn"), { cRate: { x: -120, y: 0 } }), p: "cRate" },
          { L: "The right time?", a: M(qh(2), qc(), ON("cDet")), p: "q2" },
          { L: "Details before arrival", dur: 1.3, a: M(qh(2), qc(["cDet"]), ON("pBusy"), { cDet: { x: -120 } }), p: "cDet" },
          { L: "Repeated information?", a: M(qh(3), qc(), ON("cRe1", "cRe2")), fx: function (f) { f.kick("cRe2", 4, 0, 0); }, p: "q3" },
          { L: "Reuse, don't re-type", dur: 1.3, a: M(qh(3), qc(), ON("recQ", "pReuse"), { cRe1: { o: 0 }, cRe2: { o: 0, x: -120, y: 10 } }), p: "recQ" },
          { L: "Is the risk real?", a: M(qh(4), qc(), ON("cDup", "cLegal")), p: "q4" },
          { L: "Duplicate goes, legal stays", dur: 1.2, a: M(qh(4), qc(["cLegal"]), ON("shQ", "pRisk"), { cDup: { o: 0 } }), p: "shQ" },
          { L: "Waste vs safeguard", a: M(qh(4), qc(["cLegal", "shQ"]), ON("binQ", "safeQ")), p: ["binQ", "safeQ"] },
          { L: "The proposed arrival", dur: 1.2, a: M(only("pR"), OFF("whenHow", "pKept"), { feat: { o: 1, w: 0.3 }, tgt: { o: 0 } }), p: "feat" },
          { L: "Still a proposal", a: M(OFF("feat"), ON("prop")), e: "back", p: "prop" },
          { L: "Guests who can't go digital", a: M(OFF("prop"), ON("altR", "pAlt")), p: "altR" },
          { L: "Compare, then test", a: M(OFF("pAlt"), ON("next", "pNext")), p: "next" },
          { L: "Outcome first", dur: 1.2, a: M(OFF("next", "pNext", "altR"), ON("back", "pOut"), { tgt: { o: 1, s: 1.15 }, anch: { o: 1 } }), e: "back", p: "tgt" }
        ];
      })()
    });
  })();
  addCSS("O1c", baseCSS("O1c", { bg: "#eef3ef", ink: K.ink, acc: K.green, halo: "rgba(255,255,255,.9)" }));

  /* =====================================================================
     O2a  COMPARING REDESIGN ALTERNATIVES  (v2 - rebuilt, audit score 3/3)
     Visuals:
       pI  Ideas vs limited resources: five arrival ideas, a budget that funds few
           benchmark: 110 Animated quadtree (Observable) - space subdivides, few cells win
       pK  Decision board: Design A and Design B cards (mini Qasr routes) over five
           criteria rows - Benefit, Cost, Risk, Time, Feasibility
           benchmark: 113 Infographic Chart Creator (Motion Array) - cells grow per criterion
       callouts  Cost breakdown tiles, dependency failure, unknowns, A-blocks-B link
           benchmark: 078 Data Workflow Animation (Dribbble) - nodes and links activate
       memo  Defensible decision memo
           benchmark: 095 contract process (LottieFiles) - proposal becomes agreement
     ===================================================================== */
  (function () {
    var ROWS = [["rBen", "Benefit", 168], ["rCost", "Cost", 200], ["rRisk", "Risk", 232], ["rTime", "Time", 264], ["rFea", "Feasibility", 296]];
    var CA = 215, CB = 330;
    function note(name, x, y, label, col) {
      return G(name, R(x - 50, y - 22, 100, 44, col, 6, 'data-f=""') + T(x, y + 5, label, 15, K.ink, "middle", 'class="vw-n"'), x, y);
    }
    function rowsArt() {
      return ROWS.map(function (r) {
        return G(r[0], R(14, r[2] - 15, 372, 30, "#ffffff", 6, 'data-f="" stroke="#d6dde6" stroke-width="1.5"'), 200, r[2]) + T(22, r[2] + 5, r[1], 15, K.ink, "start");
      }).join("");
    }
    function bar(name, cx, y, w, col, dash) {
      return G(name, R(cx - 45, y - 8, w, 16, dash ? "none" : col, 4, dash ? 'stroke="' + col + '" stroke-width="2" stroke-dasharray="4 3"' : ""), cx - 45, y);
    }
    /* v3: criterion cells carry words, not invented magnitudes (the narration gives no scores) */
    function cell(name, cx, y, label, col, ico) {
      return G(name, R(cx - 48, y - 12, 96, 24, "#fff", 5, 'stroke="' + col + '" stroke-width="2"') + (ico || "") + T(cx + (ico ? 8 : 0), y + 5, label, 13, col, "middle", 'class="vw-n"'), cx, y);
    }
    function dashCell(name, cx, y, col) { return G(name, R(cx - 52, y - 15, 104, 30, "none", 6, 'stroke="' + col + '" stroke-width="2" stroke-dasharray="4 3"'), cx, y); }
    SC("O2a", {
      title: "Comparing redesign alternatives", W: 400, H: 320, acc: K.navy,
      art: function () {
        var I = "", B = "";
        /* ---------- pI: ideas and resources ---------- */
        I += G("hotel", R(270, 120, 110, 140, "#f6efe2", 6, 'stroke="' + K.navy + '" stroke-width="2.5"') + R(270, 108, 110, 18, K.navy, 4) +
          T(325, 122, "Qasr Marina", 15, "#fff", "middle", 'class="vw-n"') +
          [0, 1, 2].map(function (j) { return [0, 1, 2].map(function (i) { return R(282 + i * 32, 140 + j * 28, 20, 16, "#cfe0ee", 2); }).join(""); }).join("") +
          R(312, 226, 26, 34, "#ffd479", 2), 325, 190);
        I += G("gst", AT(110, 260, GUY(K.navy), 1.2), 110, 236);
        I += G("think", C(150, 150, 46, "#fff", 'stroke="' + K.navy + '" stroke-width="2.5"') + C(118, 196, 7, "#fff", 'stroke="' + K.navy + '" stroke-width="2"') +
          DOORK(140, 178) + TAGOK(170, 128) + T(176, 175, "?", 26, K.orange), 150, 150);
        I += note("n1", 70, 92, "Kiosk", "#fff3c4") + note("n2", 200, 92, "Phone key", "#ffe0cc") + note("n3", 330, 92, "Pre-check", "#d9f0e3") +
          note("n4", 130, 152, "More staff", "#e3e8f7") + note("n5", 270, 152, "Auto rate", "#efe1f7");
        I += G("budget", R(110, 214, 180, 60, "#fff", 10, 'stroke="' + K.amber + '" stroke-width="2.5"') + COIN(160, 250) + COIN(190, 250) + COIN(220, 250) +
          T(200, 236, "Budget", 15, K.amber, "middle", 'class="vw-n"'), 200, 244);
        I += PILL("pLim", 200, 296, "Limited resources", K.amber, "#fff", 15);
        I += PILL("pDA", 120, 160, "Design A", K.navy, "#fff", 16) + PILL("pDB", 280, 160, "Design B", K.green, "#fff", 16);
        I += PILL("pCommit", 200, 226, "Which to commit?", "#fff", K.ink, 15, 'stroke="' + K.ink + '" stroke-width="1.5"');
        /* ---------- pK: board ---------- */
        B += R(-1400, -1400, 3200, 3200, "#eef3f8");
        B += G("cardA", R(165, 54, 100, 92, "#fff", 10, 'stroke="' + K.navy + '" stroke-width="2.5"') + T(CA, 74, "Design A", 15, K.navy, "middle", 'class="vw-n"') +
          AT(196, 130, R(-16, -14, 32, 22, "#b98b5e", 4) + AT(0, -14, GUY(K.green), 0.6)) + KIOSKK(236, 134), CA, 100);
        B += G("cardB", R(280, 54, 100, 92, "#fff", 10, 'stroke="' + K.green + '" stroke-width="2.5"') + T(CB, 74, "Design B", 15, K.green, "middle", 'class="vw-n"') +
          PHONE(298, 94, 16, 30, K.ink, "#9fe3c0") + G("bLink", P("M318 110 H340", K.green, 2.5, 'stroke-dasharray="3 3"'), 330, 110) + R(342, 90, 22, 42, K.navy, 2) + C(358, 112, 1.8, "#ffd479"), CB, 100);
        B += G("brk", TAGX(330, 110), 330, 110);
        B += G("qA", AT(182, 134, GUY(K.amber), 0.5) + AT(172, 134, GUY(K.plum), 0.5), 177, 125);
        B += G("gm", AT(80, 132, GUY(K.ink), 1.15) + R(56, 132, 48, 6, "#b98b5e", 2), 80, 110);
        B += PILL("pGM", 80, 66, "General manager", "#fff", K.ink, 15);
        B += PILL("sayA", 205, 36, "We're sure!", K.navy, "#fff", 15) + PILL("sayB", 330, 36, "We're sure!", K.green, "#fff", 15);
        B += G("qmk", T(128, 104, "?", 30, K.orange), 128, 94);
        B += G("board", rowsArt() +
          cell("benA", CA, 168, "Saving?", K.navy) + cell("benB", CB, 168, "Big saving?", K.green) +
          dashCell("estA", CA, 168, K.navy) + dashCell("estB", CB, 168, K.green) +
          cell("costA", CA, 200, "Lower", K.navy, COIN(CA - 30, 204)) + cell("costB", CB, 200, "Higher", K.green, COIN(CB - 32, 204)) +
          cell("riskA", CA, 232, "Few links", K.navy) + cell("riskB", CB, 232, "Many links", K.orange) +
          cell("timeA", CA, 264, "Sooner", K.navy) + cell("timeB", CB, 264, "14 months", K.green) +
          G("feaA", TAGOK(CA, 296), CA, 296) + G("feaB", C(CB, 296, 10, "#fff", 'stroke="' + K.orange + '" stroke-width="2.5"') + T(CB, 301, "?", 15, K.orange, "middle", 'class="vw-n"'), CB, 296) +
          G("feaB2", TAGOK(CB, 296), CB, 296), 200, 230);
        B += PILL("p82", 92, 100, "Today: 82 min", K.orange, "#fff", 15);
        B += PILL("pEst", 150, 168, "Estimates", "#fff", K.navy, 15, 'stroke="' + K.navy + '" stroke-width="1.5" stroke-dasharray="4 3"');
        B += PILL("p14", 150, 264, "14 months", "#fff", K.green, 15);
        B += PILL("pCheap", 92, 100, "Cheaper, easier", "#fff", K.navy, 15);
        B += PILL("pCause", 92, 100, "Queue remains", K.red, "#fff", 15);
        B += G("coinDrop", COIN(196, 112) + COIN(204, 104), 200, 108);
        B += PILL("pFail", 92, 100, "If a link fails", K.red, "#fff", 15);
        B += G("shB", SHIELD(370, 232, 0.7, "#e9f3ee", K.green), 370, 232);
        B += PILL("pUnd", 92, 100, "Understood risk", K.green, "#fff", 15);
        B += PILL("u1", 72, 74, "ID check?", "#fff", K.orange, 15) + PILL("u2", 82, 108, "Room link?", "#fff", K.orange, 15) + PILL("u3", 82, 142, "Staff skills?", "#fff", K.orange, 15);
        B += G("waitG", AT(46, 140, GUY(K.amber), 0.7) + AT(64, 140, GUY(K.plum), 0.7) + AT(82, 140, GUY("#5b8fc4"), 0.7) + CLOCKK(110, 116, 12, K.orange), 75, 124);
        B += PILL("pToday", 82, 76, "Waiting today", K.orange, "#fff", 15);
        B += G("block", R(250, 252, 18, 24, K.slate, 3) + P("M244 246 L274 282 M274 246 L244 282", K.red, 3), 259, 264);
        B += G("relink", P("M240 146 C252 156 262 156 276 146", K.orange, 3) + F("M272 140 L282 145 L273 152Z", K.orange), 258, 150);
        B += PILL("pBlocks", 92, 100, "A blocks B?", K.orange, "#fff", 15);
        B += G("brace", P("M392 156 Q400 156 400 166 V256 Q400 266 392 266", K.navy, 3), 396, 210);
        B += PILL("pAll", 92, 100, "Weigh together", K.navy, "#fff", 15);
        B += PILL("nope1", 82, 66, "Cheapest", "#fff", K.slate, 15) + PILL("nope2", 82, 100, "Fastest", "#fff", K.slate, 15) + PILL("nope3", 82, 134, "Most high-tech", "#fff", K.slate, 15);
        B += G("nopeX", P("M37 66 H127 M41 100 H123 M20 134 H144", K.red, 3), 82, 100);
        B += G("memo", R(130, 60, 140, 200, "#fff", 8, 'stroke="' + K.ink + '" stroke-width="2.5"') + T(200, 88, "Decision", 16, K.ink, "middle", 'class="vw-n"') +
          [0, 1, 2, 3, 4].map(function (i) { return TAGOK(152, 112 + i * 26) + P("M168 " + (112 + i * 26) + " H248", "#c9d3df", 3); }).join("") +
          P("M160 244 C176 232 186 252 200 240 S226 236 240 244", K.navy, 2.5), 200, 160);
        B += PILL("pDef", 200, 290, "Defensible choice", K.green, "#fff", 16);
        /* cost breakdown overlay */
        B += G("costPop", R(14, 52, 372, 96, "#fffaf0", 10, 'stroke="' + K.amber + '" stroke-width="2.5"') +
          AT(56, 86, P("M-8 0 H8 M0 -8 V8", K.amber, 4) + C(0, 0, 13, "none", 'stroke="' + K.amber + '" stroke-width="2.5"')) + T(56, 128, "Integration", 15, K.ink) +
          AT(150, 86, F("M-14 0 L0 -8 L14 0 L0 8Z", K.amber) + P("M8 3 V12", K.amber, 2.5)) + T(150, 128, "Training", 15, K.ink) +
          KIOSKK(244, 104) + T(244, 128, "Equipment", 15, K.ink) +
          AT(338, 86, C(0, -8, 5, K.amber) + C(-10, 8, 5, K.amber) + C(10, 8, 5, K.amber) + P("M0 -3 V2 M-10 3 L0 2 L10 3", K.amber, 2)) + T(338, 128, "Roles", 15, K.ink), 200, 100);
        return R(-1400, -1400, 3200, 3200, "#eef3f8") + G("pI", I, 200, 180) + G("pK", B, 200, 180);
      },
      init: M({ pI: { o: 1 }, pK: { o: 0 } },
        HID(["think", "n1", "n2", "n3", "n4", "n5", "budget", "pLim", "pDA", "pDB", "pCommit", "brk", "pGM", "sayA", "sayB", "qmk", "board", "estA", "estB", "p82", "pEst", "p14", "pCheap", "pCause", "coinDrop",
          "pFail", "shB", "pUnd", "u1", "u2", "u3", "waitG", "pToday", "block", "relink", "pBlocks", "brace", "pAll", "nope1", "nope2", "nope3", "nopeX", "memo", "pDef", "costPop", "feaB2"]),
        { gst: { x: 0 }, cardA: { o: 0, y: 20 }, cardB: { o: 0, y: 20 }, gm: { o: 0 }, qA: { o: 0 },
          rBen: { f: "#fff" }, rCost: { f: "#fff" }, rRisk: { f: "#fff" }, rTime: { f: "#fff" }, rFea: { f: "#fff" },
          benA: { o: 0 }, benB: { o: 0 }, costA: { o: 0 }, costB: { o: 0 }, riskA: { o: 0 }, riskB: { o: 0 }, timeA: { o: 0 }, timeB: { o: 0 }, feaA: { o: 0 }, feaB: { o: 0 } }),
      K: (function () {
        var HL = "#fff4cf";
        function row(n) { var o = {}; ROWS.forEach(function (r) { o[r[0]] = { f: r[0] === n ? HL : "#fff" }; }); return o; }
        var TOPS = ["gm", "pGM", "sayA", "sayB", "qmk", "pCheap", "pCause", "coinDrop", "pFail", "pUnd", "u1", "u2", "u3", "waitG", "pToday", "pBlocks", "pAll", "nope1", "nope2", "nope3", "nopeX", "costPop", "p82", "pEst", "p14"];
        function clear(keep) { return HID(TOPS.filter(function (n) { return (keep || []).indexOf(n) < 0; })); }
        return [
          { L: "A difficult decision", a: { think: { o: 1 }, gst: { x: 20 } }, e: "back", p: "think" },
          { L: "Limited resources", dur: 1.2, a: M(OFF("think", "hotel", "gst"), ON("n1", "budget", "pLim"), { n2: { o: 1, w: 0.1 }, n3: { o: 1, w: 0.2 }, n4: { o: 1, w: 0.3 }, n5: { o: 1, w: 0.4 } }), p: "budget" },
          { L: "Which deserves commitment?", a: M(OFF("n1", "n2", "n3", "n4", "n5", "pLim", "budget"), ON("pDA", "pDB", "pCommit")), e: "back", p: "pCommit" },
          { L: "Two teams present", dur: 1.2, a: M({ pI: { o: 0 }, pK: { o: 1 } }, ON("gm", "pGM", "cardA"), { cardA: { y: 0 }, cardB: { o: 1, y: 0, w: 0.3 } }), p: "gm" },
          { L: "Improve vs change route", a: M(clear(), ON("qA"), { cardA: { s: 1.06 }, cardB: { s: 1.06, w: 0.4 } }), fx: function (f) { f.ring("cardA", K.navy); f.ring("cardB", K.green, 0.5); } },
          { L: "Confidence isn't proof", a: M({ cardA: { s: 1 }, cardB: { s: 1 } }, ON("sayA", "sayB", "qmk")), p: "qmk" },
          { L: "A disciplined comparison", dur: 1.2, a: M(clear(), ON("board")), p: "board" },
          { L: "Expected benefit", dur: 1.2, a: M(clear(), row("rBen"), { benA: { o: 1 }, benB: { o: 1, w: 0.3 } }), e: "out", p: "rBen" },
          { L: "Big savings tempt", a: M(clear(), ON("p82"), { benB: { s: 1.08 } }), p: "benB" },
          { L: "Only estimates so far", a: M(clear(), ON("pEst", "estA", "estB"), { benA: { o: 0.45 }, benB: { o: 0.45, s: 1 } }), p: "pEst" },
          { L: "Cost of each design", a: M(clear(), row("rCost"), { costA: { o: 1 }, costB: { o: 1, w: 0.3 } }), p: "rCost" },
          { L: "What the cost covers", dur: 1.2, a: M(clear(), { costPop: { o: 1 }, cardA: { o: 0 }, cardB: { o: 0 } }), p: "costPop" },
          { L: "Cheaper is easier", a: M(clear(), ON("pCheap"), { cardA: { o: 1 }, cardB: { o: 1 }, costA: { s: 1.12 } }), p: "costA" },
          { L: "Money, cause untouched", dur: 1.3, a: M(clear(), ON("pCause", "coinDrop"), { qA: { s: 1.15 } }), fx: function (f) { f.kick("qA", 3, 0, 0); }, p: "qA" },
          { L: "Delivery risk", a: M(clear(), row("rRisk"), { costA: { s: 1 }, riskA: { o: 1 }, riskB: { o: 1, w: 0.3 } }), p: "rRisk" },
          { L: "If technology fails", a: M(clear(), ON("pFail", "brk"), { bLink: { o: 0.3 } }), fx: function (f) { f.kick("cardB", 3, 0, 0); }, p: "brk" },
          { L: "Ambition can pay off", a: M(clear(), ON("shB", "pUnd"), { brk: { o: 0.35 } }), e: "back", p: "shB" },
          { L: "Make uncertainty visible", a: M(clear(), { u1: { o: 1 }, u2: { o: 1, w: 0.2 }, u3: { o: 1, w: 0.4 }, brk: { o: 0 }, bLink: { o: 1 } }), p: ["u1", "u2", "u3"] },
          { L: "Time to deliver", a: M(clear(), row("rTime"), ON("waitG", "pToday"), { timeA: { o: 1 }, timeB: { o: 1, w: 0.3 } }), p: "waitG" },
          { L: "14 months, no quick relief", dur: 1.5, a: M(clear(["waitG"]), { timeB: { s: 1.1 }, timeA: { o: 0.5 } }), e: "out", fx: function (f) { f.kick("waitG", 0, -3, 0); }, p: "timeB" },
          { L: "Quick fix can obstruct", a: M(clear(), ON("block"), { timeB: { s: 1 }, timeA: { o: 1 } }), e: "back", p: "block" },
          { L: "How options relate", a: M(clear(), ON("relink", "pBlocks")), p: "relink" },
          { L: "Weigh it all together", a: M(clear(), ON("brace", "pAll"), { rBen: { f: HL }, rCost: { f: HL }, rRisk: { f: HL }, rTime: { f: HL } }), p: "brace" },
          { L: "Test feasibility", a: M(clear(), row("rFea"), OFF("brace", "relink", "block"), { feaA: { o: 1 }, feaB: { o: 1, w: 0.3 } }), p: "feaB" },
          { L: "Not cheapest or fastest", a: M(clear(), ON("nope1", "nope2", "nope3"), { nopeX: { o: 1, w: 0.6 } }), p: "nope3" },
          { L: "A choice you can defend", dur: 1.2, a: M(clear(), { board: { o: 0.2 }, cardA: { o: 0.2 }, cardB: { o: 0.2 }, memo: { o: 1 }, pDef: { o: 1, w: 0.6 } }), e: "back", p: "memo" }
        ];
      })()
    });
  })();
  addCSS("O2a", baseCSS("O2a", { bg: "#eef3f8", ink: K.ink, acc: K.navy, halo: "rgba(255,255,255,.9)" }));

})();
// END FILE

// FILE: w09-claude-v3-part2.js
// OPER621 Week 9 (The Innovate Phase) - animated teaching scenes v3, part 2 of 3: O2b, O2c, O3a, O3b.
// v2 rebuild after the content audit: every narration line shows the literal Qasr Marina activity it describes.
// Each visual is annotated with the benchmark template it adapts (motion grammar only; all artwork is original).
// Standalone: registers its scenes in window.VL_SCENES and appends scoped rules to <style id="vl-sc-w09">.
// Parts may be concatenated in any order. Contract per scene: build(el), step(i, n), reset().
(function () {
  "use strict";
  var W = window;
  window.VL_SCENES = window.VL_SCENES || {};
  var SVGNS = "http://www.w3.org/2000/svg";

  /* ---------- generic helpers ---------- */
  function RM() {
    try { return !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    catch (e) { return false; }
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function r2(v) { return Math.round(v * 100) / 100; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  var EASE = {
    io: function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; },
    out: function (t) { return 1 - Math.pow(1 - t, 3); },
    back: function (t) { var c = 1.6, d = c + 1; return 1 + d * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },
    lin: function (t) { return t; }
  };
  var GEASE = { io: "power3.inOut", out: "power3.out", back: "back.out(1.6)", lin: "none" };

  /* ---------- SVG string builders ---------- */
  function R(x, y, w, h, f, rx, ex) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx || 0) + '" fill="' + f + '"' + (ex ? " " + ex : "") + "/>";
  }
  function C(x, y, r, f, ex) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + f + '"' + (ex ? " " + ex : "") + "/>";
  }
  function E(x, y, rx, ry, f, ex) {
    return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" fill="' + f + '"' + (ex ? " " + ex : "") + "/>";
  }
  function P(d, st, w, ex) {
    return '<path d="' + d + '" fill="none" stroke="' + st + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + (ex ? " " + ex : "") + "/>";
  }
  function F(d, f, ex) {
    return '<path d="' + d + '" fill="' + f + '"' + (ex ? " " + ex : "") + "/>";
  }
  function T(x, y, s, sz, f, anc, ex) {
    var cls = "vw-t";
    if (ex && ex.indexOf('class="vw-n"') >= 0) { cls = "vw-t vw-n"; ex = ex.replace('class="vw-n"', ""); }
    return '<text class="' + cls + '" x="' + x + '" y="' + y + '" font-size="' + (sz || 15) + '" fill="' + (f || "#14233a") + '" text-anchor="' + (anc || "middle") + '"' + (ex ? " " + ex : "") + ">" + esc(s) + "</text>";
  }
  function G(name, body, px, py, ex) {
    return "<g" + (name ? ' data-a="' + name + '"' : "") + (px !== undefined ? ' data-p="' + px + " " + py + '"' : "") + (ex ? " " + ex : "") + ">" + body + "</g>";
  }
  function AT(x, y, body, s, r) {
    return '<g transform="translate(' + x + " " + y + ")" + (r ? " rotate(" + r + ")" : "") + (s && s !== 1 ? " scale(" + s + ")" : "") + '">' + body + "</g>";
  }
  function textW(s, sz) { return Math.round(String(s).length * sz * 0.6 + 24); }
  function PILL(name, x, y, s, bg, fg, sz, ex) {
    sz = sz || 15;
    var w = textW(s, sz), h = Math.round(sz + 13);
    return G(name, R(x - w / 2, y - h / 2, w, h, bg, h / 2, ex) +
      '<text class="vw-t vw-n" x="' + x + '" y="' + r2(y + sz * 0.36) + '" font-size="' + sz + '" fill="' + fg + '" text-anchor="middle">' + esc(s) + "</text>", x, y);
  }
  /* a small friendly character, feet at origin, about 36 units tall */
  function GUY(body, skin, eyes) {
    skin = skin || "#f1c9a5";
    return F("M-10 0 Q-11 -18 0 -18 Q11 -18 10 0 Z", body) +
      C(0, -27, 9, skin) +
      (eyes === false ? "" : C(-3, -28, 1.5, "#14233a") + C(3, -28, 1.5, "#14233a") + P("M-2.5 -23.5 Q0 -22 2.5 -23.5", "#14233a", 1.1));
  }
  function SHIELD(cx, cy, s, fill, line) {
    return AT(cx, cy, F("M0 -16 L13 -11 V0 Q13 11 0 17 Q-13 11 -13 0 V-11 Z", fill, 'stroke="' + line + '" stroke-width="2.5"') +
      P("M-6 0 L-1.5 5 L7 -5", line, 3), s);
  }
  function CHECK(x, y, col, w) { return P("M" + (x - 7) + " " + y + " l5 5 l10 -11", col, w || 3.5); }
  function CROSS(x, y, col, w, r) { r = r || 7; return P("M" + (x - r) + " " + (y - r) + " L" + (x + r) + " " + (y + r) + " M" + (x + r) + " " + (y - r) + " L" + (x - r) + " " + (y + r), col, w || 3.5); }
  function GEAR(cx, cy, r, teeth, fill, hole) {
    var s = "", i, a;
    for (i = 0; i < teeth; i++) {
      a = i * 360 / teeth;
      s += '<rect x="' + r2(cx - r * 0.16) + '" y="' + r2(cy - r - r * 0.28) + '" width="' + r2(r * 0.32) + '" height="' + r2(r * 0.5) + '" rx="' + r2(r * 0.06) + '" fill="' + fill + '" transform="rotate(' + r2(a) + " " + cx + " " + cy + ')"/>';
    }
    return s + C(cx, cy, r, fill) + C(cx, cy, r * 0.38, hole);
  }
  function PHONE(x, y, w, h, body, screen) {
    return R(x, y, w, h, body, w * 0.18) + R(x + w * 0.1, y + h * 0.1, w * 0.8, h * 0.74, screen, w * 0.08) + C(x + w / 2, y + h * 0.92, w * 0.06, screen);
  }

  /* ---------- stylesheet: one <style id="vl-sc-w09">, rules appended per part ---------- */
  function addCSS(key, css) {
    var st = document.getElementById("vl-sc-w09");
    if (!st) { st = document.createElement("style"); st.id = "vl-sc-w09"; (document.head || document.documentElement).appendChild(st); }
    if (st.getAttribute("data-" + key)) return;
    st.setAttribute("data-" + key, "1");
    st.appendChild(document.createTextNode(css));
  }
  function baseCSS(id, o) {
    var S = ".vls-w09-" + id;
    return [
      S + "{position:relative;width:100%;height:100%;min-height:230px;display:flex;flex-direction:column;overflow:hidden;border-radius:14px;background:" + o.bg + ";color:" + o.ink + ";font-family:inherit;box-sizing:border-box;isolation:isolate}",
      S + " *{box-sizing:border-box}",
      S + " .vw-chip{flex:0 0 auto;display:flex;align-items:center;gap:8px;padding:9px 14px 5px;min-height:32px;font-size:13.5px;font-weight:800;letter-spacing:.02em;color:" + o.ink + ";line-height:1.2}",
      S + " .vw-dot{flex:0 0 auto;width:10px;height:10px;border-radius:50%;background:" + o.acc + ";animation:vw09ping 2.6s ease-out infinite}",
      S + " .vw-lab{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      S + " .vw-lab.vw-new{animation:vw09in .55s cubic-bezier(.2,.8,.2,1)}",
      S + " .vw-stage{position:relative;flex:1 1 auto;min-height:0}",
      S + " .vw-svg{position:absolute;left:0;top:0;width:100%;height:100%;display:block;overflow:hidden}",
      S + " .vw-bar{flex:0 0 3px;background:rgba(20,35,58,.08)}",
      S + " .vw-bar i{display:block;height:100%;width:0;background:" + o.acc + ";transition:width .7s ease}",
      S + " text{font-family:inherit;font-weight:750;letter-spacing:.01em}",
      S + " .vw-t{paint-order:stroke;stroke:" + o.halo + ";stroke-width:3.6px;stroke-linejoin:round}",
      S + " .vw-n{stroke:none}",
      S + " [data-f]{transition:fill .7s ease,stroke .7s ease}",
      S + " .vw-spin{transform-box:fill-box;transform-origin:center;animation:vw09spin 7s linear infinite}",
      S + " .vw-bob{transform-box:fill-box;transform-origin:center;animation:vw09bob 3.4s ease-in-out infinite}",
      S + " .vw-flow{stroke-dasharray:6 9;animation:vw09flow 1.6s linear infinite}",
      S + " .vw-blink{animation:vw09blink 1.8s ease-in-out infinite}",
      S + " [data-st=hot] .vw-hot{animation:vw09blink 1.1s ease-in-out infinite}",
      S + " [data-st=go] .vw-go{stroke-dasharray:5 8;animation:vw09flow 1.1s linear infinite}",
      S + " [data-st=go] .vw-goSpin{transform-box:fill-box;transform-origin:center;animation:vw09spin 3s linear infinite}",
      "@media (max-width:380px){" + S + " .vw-chip{font-size:12.5px;padding:7px 11px 4px}}",
      "@media (prefers-reduced-motion:reduce){" + S + " *," + S + " *::before," + S + " *::after{animation:none!important;transition:none!important}}"
    ].join("\n") + "\n" + (o.extra ? o.extra(S) : "");
  }
  var KF = [
    "@keyframes vw09spin{to{transform:rotate(360deg)}}",
    "@keyframes vw09bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}",
    "@keyframes vw09flow{to{stroke-dashoffset:-30}}",
    "@keyframes vw09blink{0%,100%{opacity:1}50%{opacity:.35}}",
    "@keyframes vw09ping{0%{box-shadow:0 0 0 0 rgba(192,80,42,.45)}80%,100%{box-shadow:0 0 0 9px rgba(192,80,42,0)}}",
    "@keyframes vw09in{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}"
  ].join("\n") + "\n";

  /* ---------- tween runner (GSAP ticker/easing when present, rAF otherwise) ---------- */
  function Runner() { this.list = []; this.raf = 0; this.gs = []; }
  Runner.prototype.add = function (dur, delay, ease, fn, done) {
    if (!(dur > 0) || RM()) { fn(1); if (done) done(); return; }
    var g = W.gsap, self = this;
    if (g && typeof g.to === "function") {
      var o = { t: 0 };
      var tw = g.to(o, { t: 1, duration: dur, delay: delay || 0, ease: GEASE[ease] || GEASE.io,
        onUpdate: function () { fn(o.t); }, onComplete: function () { if (done) done(); } });
      self.gs.push(tw);
      if (self.gs.length > 400) self.gs.splice(0, 200);
      return;
    }
    var e = EASE[ease] || EASE.io, start = null;
    this.list.push(function (now) {
      if (start === null) start = now + (delay || 0) * 1000;
      if (now < start) return true;
      var t = clamp((now - start) / (dur * 1000), 0, 1);
      fn(e(t));
      if (t >= 1) { if (done) done(); return false; }
      return true;
    });
    this.kick();
  };
  Runner.prototype.kick = function () {
    var self = this;
    if (self.raf || !W.requestAnimationFrame) return;
    var loop = function (now) {
      self.raf = 0;
      self.list = self.list.filter(function (f) { return f(now); });
      if (self.list.length) self.raf = W.requestAnimationFrame(loop);
    };
    self.raf = W.requestAnimationFrame(loop);
  };
  Runner.prototype.kill = function () {
    if (this.raf && W.cancelAnimationFrame) W.cancelAnimationFrame(this.raf);
    this.raf = 0; this.list = [];
    this.gs.forEach(function (t) { try { t.kill(); } catch (e) {} });
    this.gs = [];
  };

  /* ---------- actors: every animated element carries data-a ---------- */
  var NUM = ["x", "y", "s", "r", "o", "sx", "sy", "u", "d", "n"];
  var DEF = { x: 0, y: 0, s: 1, r: 0, o: 1, sx: 1, sy: 1, u: 0, d: 1 };
  function numsOf(d) { return (String(d).match(/-?\d*\.?\d+(?:e-?\d+)?/g) || []).map(Number); }
  function morphStr(tpl, nums) {
    var parts = String(tpl).split(/-?\d*\.?\d+(?:e-?\d+)?/), out = parts[0], i;
    for (i = 0; i < nums.length; i++) out += r2(nums[i]) + (parts[i + 1] || "");
    return out;
  }
  function Actor(el, root) {
    var p = (el.getAttribute("data-p") || "0 0").split(/[ ,]+/).map(Number);
    this.el = el; this.px = p[0] || 0; this.py = p[1] || 0;
    var pid = el.getAttribute("data-path");
    this.path = pid ? root.querySelector('[data-id="' + pid + '"]') : null;
    this.plen = 0;
    this.draws = el.hasAttribute("data-draw") ? [el] : [].slice.call(el.querySelectorAll("[data-draw]"));
    this.mEl = el.tagName.toLowerCase() === "path" ? el : el.querySelector("[data-m]");
    this.tEl = el.tagName.toLowerCase() === "text" ? el : el.querySelector("[data-t]");
    this.fEls = el.hasAttribute("data-f") ? [el] : [].slice.call(el.querySelectorAll("[data-f]"));
    this.fmt = el.getAttribute("data-fmt") || "#";
    this.dec = +(el.getAttribute("data-dec") || 0);
    this.orig = {
      A: {}, m: this.mEl ? this.mEl.getAttribute("d") : null,
      t: this.tEl ? this.tEl.textContent : "",
      n: +(el.getAttribute("data-n0") || 0),
      f: this.fEls.length ? this.fEls[0].getAttribute("fill") : null,
      k: this.fEls.length ? this.fEls[0].getAttribute("stroke") : null
    };
    this.cur = { x: 0, y: 0, s: 1, r: 0, o: 1, sx: 1, sy: 1, u: 0, d: 1, n: this.orig.n, A: {}, m: this.orig.m };
    this.tok = 0;
    this.box = null;
  }
  /* v3: keep the whole sprite inside its container box [x0, y0, x1, y1] (track, chart, gauge or panel) */
  Actor.prototype.fitBox = function (tx, ty, c) {
    var b = null;
    try { b = this.el.getBBox(); } catch (e) { b = null; }
    if (!b || (!b.width && !b.height)) return [tx, ty];
    var B = this.box, px = this.px, py = this.py, kx = c.s * c.sx, ky = c.s * c.sy;
    var xa = tx + px + kx * (b.x - px), xb = tx + px + kx * (b.x + b.width - px);
    var ya = ty + py + ky * (b.y - py), yb = ty + py + ky * (b.y + b.height - py);
    var x0 = Math.min(xa, xb), x1 = Math.max(xa, xb), y0 = Math.min(ya, yb), y1 = Math.max(ya, yb);
    if (x0 < B[0] || x1 - x0 > B[2] - B[0]) tx += B[0] - x0; else if (x1 > B[2]) tx -= x1 - B[2];
    if (y0 < B[1] || y1 - y0 > B[3] - B[1]) ty += B[1] - y0; else if (y1 > B[3]) ty -= y1 - B[3];
    return [tx, ty];
  };
  Actor.prototype.dflt = function (k) {
    if (k in DEF) return DEF[k];
    if (k === "n") return this.orig.n;
    if (k === "m") return this.orig.m;
    if (k === "t") return this.orig.t;
    if (k === "f") return this.orig.f;
    if (k === "k") return this.orig.k;
    if (k === "st") return "";
    return null;
  };
  Actor.prototype.attrOrig = function (name) {
    if (!(name in this.orig.A)) this.orig.A[name] = +(this.el.getAttribute(name) || 0);
    return this.orig.A[name];
  };
  Actor.prototype.paint = function () {
    var c = this.cur, el = this.el, tx = c.x, ty = c.y, k;
    for (k in c.A) el.setAttribute(k, r2(c.A[k]));
    if (this.path) { try { this.plen = this.path.getTotalLength(); } catch (e) { this.plen = 0; } }
    if (this.path && this.plen) {
      var pt = this.path.getPointAtLength(clamp(c.u, 0, 1) * this.plen);
      tx += pt.x - this.px; ty += pt.y - this.py;
    }
    if (this.box) { var fb = this.fitBox(tx, ty, c); tx = fb[0]; ty = fb[1]; }
    if (tx || ty || c.s !== 1 || c.r || c.sx !== 1 || c.sy !== 1) {
      el.setAttribute("transform", "translate(" + r2(tx + this.px) + " " + r2(ty + this.py) + ") rotate(" + r2(c.r) + ") scale(" + r2(c.s * c.sx) + " " + r2(c.s * c.sy) + ") translate(" + r2(-this.px) + " " + r2(-this.py) + ")");
    } else el.removeAttribute("transform");
    el.setAttribute("opacity", r2(c.o));
    el.style.visibility = c.o < 0.01 ? "hidden" : "";
    if (this.draws.length) {
      var dv = clamp(c.d, 0, 1);
      this.draws.forEach(function (p) {
        p.style.strokeDasharray = r2(dv * 1.001) + " 2";
        p.style.visibility = dv < 0.004 ? "hidden" : "";
      });
    }
    if (this.mEl && c.m) this.mEl.setAttribute("d", c.m);
    if (this.tEl && this.el.hasAttribute("data-n0")) {
      this.tEl.textContent = this.fmt.replace("#", c.n.toFixed(this.dec));
    }
  };

  /* ---------- scene factory ---------- */
  function mapIndex(i, n, N) {
    i = Math.floor(Number(i)); n = Math.floor(Number(n));
    if (!isFinite(i)) i = 0;
    if (!isFinite(n) || n <= 0) n = N;
    i = clamp(i, 0, n - 1);
    if (n === N) return i;
    if (n <= 1) return 0;
    return clamp(Math.round(i * (N - 1) / (n - 1)), 0, N - 1);
  }
  function mergeInto(S, src) {
    var a, k;
    for (a in src) {
      if (!S[a]) S[a] = {};
      for (k in src[a]) {
        if (k === "A") { S[a].A = S[a].A || {}; for (var q in src[a].A) S[a].A[q] = src[a].A[q]; }
        else S[a][k] = src[a][k];
      }
    }
  }
  function make(id, def, el) {
    var N = def.K.length, Wd = def.W || 400, Hd = def.H || 320;
    var root = document.createElement("div");
    root.className = "vls-w09 vls-w09-" + id;
    root.innerHTML =
      '<div class="vw-chip" aria-hidden="true"><span class="vw-dot"></span><span class="vw-lab"></span></div>' +
      '<div class="vw-stage"><svg class="vw-svg" xmlns="' + SVGNS + '" viewBox="0 0 ' + Wd + " " + Hd + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(def.title) + '">' +
      def.art(id) + '<g class="vw-fx"></g></svg></div><div class="vw-bar"><i></i></div>';
    while (el.firstChild) el.removeChild(el.firstChild);
    el.appendChild(root);
    var svg = root.querySelector("svg"), stage = root.querySelector(".vw-stage");
    var lab = root.querySelector(".vw-lab"), bar = root.querySelector(".vw-bar i"), fxL = root.querySelector(".vw-fx");
    var actors = {}, list = [].slice.call(root.querySelectorAll("[data-a]"));
    list.forEach(function (n) { actors[n.getAttribute("data-a")] = new Actor(n, root); });
    if (def.B) Object.keys(def.B).forEach(function (n) { if (actors[n]) actors[n].box = def.B[n]; });
    var touched = {};
    [def.init || {}].concat(def.K.map(function (k) { return (k && k.a) || {}; })).forEach(function (o) {
      for (var a in o) { touched[a] = touched[a] || {}; for (var k in o[a]) { if (k === "A") { touched[a].A = touched[a].A || {}; for (var q in o[a].A) touched[a].A[q] = 1; } else touched[a][k] = 1; } }
    });
    var run = new Runner(), cur = -1, lastLabel = "", ro = null;

    function fit() {
      var r = stage.getBoundingClientRect();
      if (!r.width || !r.height) return;
      var a = r.width / r.height, vb;
      if (a > Wd / Hd) { var w = Hd * a; vb = [-(w - Wd) / 2, 0, w, Hd]; }
      else { var h = Wd / a; vb = [0, -(h - Hd) / 2, Wd, h]; }
      svg.setAttribute("viewBox", vb.map(r2).join(" "));
    }
    if (W.ResizeObserver) { ro = new W.ResizeObserver(fit); ro.observe(stage); }
    else W.addEventListener("resize", fit);
    fit();

    function stateAt(k) {
      var S = {}, j;
      var I0 = {}; mergeInto(I0, def.init || {});
      mergeInto(S, def.init || {});
      var g0 = 0;
      for (j = k; j > 0; j--) if (def.K[j] && def.K[j].c) { g0 = j; break; }
      for (j = 0; j <= k; j++) {
        if (j === g0 && g0 > 0) {
          var keep = [].concat(def.K[j].c === true || def.K[j].c === 1 ? [] : def.K[j].c);
          for (var a0 in S) if (I0[a0] && I0[a0].o === 0 && keep.indexOf(a0) < 0) S[a0].o = 0;
        }
        if (def.K[j] && def.K[j].a) mergeInto(S, def.K[j].a);
      }
      var full = {}, a, p;
      for (a in touched) {
        var A = actors[a]; if (!A) continue;
        full[a] = {};
        for (p in touched[a]) {
          if (p === "A") { full[a].A = {}; for (var q in touched[a].A) full[a].A[q] = (S[a] && S[a].A && q in S[a].A) ? S[a].A[q] : A.attrOrig(q); }
          else if (p === "w") full[a].w = (S[a] && "w" in S[a]) ? S[a].w : 0;
          else full[a][p] = (S[a] && p in S[a]) ? S[a][p] : A.dflt(p);
        }
      }
      return full;
    }
    function labelAt(k) { for (var j = k; j >= 0; j--) if (def.K[j] && def.K[j].L) return def.K[j].L; return def.title; }

    function goTo(k, instant) {
      var S = stateAt(k), kf = def.K[k] || {}, dur = kf.dur || def.dur || 0.95;
      var moveForward = !instant && k === cur + 1;
      if (!moveForward) { run.kill(); while (fxL.firstChild) fxL.removeChild(fxL.firstChild); }
      var wOwn = kf.a || {};
      Object.keys(S).forEach(function (name) {
        var A = actors[name], Tt = S[name], from = {}, to = {}, p, any = false;
        if (!A) return;
        A.tok++; var tok = A.tok;
        var wait = (wOwn[name] && wOwn[name].w) || 0;
        if ("t" in Tt && A.tEl) A.tEl.textContent = Tt.t;
        if ("f" in Tt && Tt.f) A.fEls.forEach(function (e) { e.setAttribute("fill", Tt.f); });
        if ("k" in Tt && Tt.k) A.fEls.forEach(function (e) { e.setAttribute("stroke", Tt.k); });
        if ("st" in Tt) A.el.setAttribute("data-st", Tt.st || "");
        NUM.forEach(function (q) { if (q in Tt && Tt[q] !== null) { from[q] = A.cur[q]; to[q] = Tt[q]; if (from[q] !== to[q]) any = true; } });
        var fromA = {}, toA = Tt.A || {};
        for (p in toA) { fromA[p] = (p in A.cur.A) ? A.cur.A[p] : A.attrOrig(p); if (fromA[p] !== toA[p]) any = true; }
        var mFrom = null, mTo = null;
        if ("m" in Tt && Tt.m && A.mEl) {
          if (Tt.m !== A.cur.m) {
            any = true; mFrom = numsOf(A.cur.m || Tt.m); mTo = numsOf(Tt.m);
            if (mFrom.length !== mTo.length) mFrom = mTo.slice();
          }
        }
        var setAll = function (t) {
          if (A.tok !== tok) return;
          for (var q in to) A.cur[q] = lerp(from[q], to[q], t);
          for (var z in toA) A.cur.A[z] = lerp(fromA[z], toA[z], t);
          if (mTo) A.cur.m = morphStr(Tt.m, mTo.map(function (v, i) { return lerp(mFrom[i], v, t); }));
          A.paint();
        };
        if (!any || instant) { setAll(1); return; }
        run.add(dur, moveForward ? wait : 0, Tt.e || kf.e || "io", setAll);
      });
      var followers = Object.keys(actors).filter(function (n) { return actors[n].path; });
      if (followers.length) {
        var repaint = function () { followers.forEach(function (n) { actors[n].paint(); }); };
        if (instant) repaint(); else run.add(dur + 1.6, 0, "lin", repaint);
      }
      var L = labelAt(k);
      if (L !== lastLabel) {
        lab.textContent = L; lastLabel = L;
        svg.setAttribute("aria-label", def.title + ": " + L);
        if (!instant && !RM()) { lab.classList.remove("vw-new"); void lab.offsetWidth; lab.classList.add("vw-new"); }
      }
      bar.style.width = r2(100 * (k + 1) / N) + "%";
      if (moveForward && !RM()) {
        if (kf.p) [].concat(kf.p).forEach(function (n) { fx.ring(n, null, dur * 0.75); });
        if (typeof kf.fx === "function") { try { kf.fx(fx); } catch (e) {} }
      }
      cur = k;
    }

    /* transient effects: they never change the stored state */
    function screenCenter(name) {
      var A = actors[name]; if (!A || !svg.getScreenCTM) return null;
      var m = svg.getScreenCTM(); if (!m) return null;
      var rc = A.el.getBoundingClientRect(); if (!rc.width && !rc.height) return null;
      var inv = m.inverse(), pt = svg.createSVGPoint();
      pt.x = rc.left + rc.width / 2; pt.y = rc.top + rc.height / 2;
      var q = pt.matrixTransform(inv);
      return { x: q.x, y: q.y, r: Math.max(rc.width, rc.height) * Math.abs(inv.a) / 2 };
    }
    function mk(tag, attrs, parent) {
      var n = document.createElementNS(SVGNS, tag);
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      (parent || fxL).appendChild(n); return n;
    }
    function later(sec, fn) { run.add(sec, 0, "lin", function () {}, fn); }
    function burstAt(x, y, col, count) {
      count = count || 10;
      for (var i = 0; i < count; i++) (function (i) {
        var a = i / count * Math.PI * 2, n = mk("circle", { cx: r2(x), cy: r2(y), r: 3, fill: col || def.acc || "#c0502a" });
        run.add(0.8, 0.05, "out", function (t) {
          n.setAttribute("cx", r2(x + Math.cos(a) * 14 * t)); n.setAttribute("cy", r2(y + Math.sin(a) * 14 * t));
          n.setAttribute("opacity", r2(1 - t));
        }, function () { if (n.parentNode) n.parentNode.removeChild(n); });
      })(i);
    }
    var fx = {
      ring: function (name, col, delay) {
        later(delay || 0, function () {
          var c = screenCenter(name); if (!c) return;
          var r0 = clamp(c.r + 4, 12, 95);
          var n = mk("circle", { cx: r2(c.x), cy: r2(c.y), r: r0, fill: "none", stroke: col || def.acc || "#c0502a", "stroke-width": 3 });
          run.add(0.9, 0, "out", function (t) { n.setAttribute("r", r2(r0 + 16 * t)); n.setAttribute("opacity", r2(0.85 * (1 - t))); },
            function () { if (n.parentNode) n.parentNode.removeChild(n); });
        });
      },
      burst: function (x, y, col, count) { burstAt(x, y, col, count); },
      burstOn: function (name, col, delay) {
        later(delay || 0, function () { var c = screenCenter(name); if (c) burstAt(c.x, c.y, col, 12); });
      },
      /* v3: in-place fade (the copy never leaves its card, bin or chart) */
      ghost: function (name) {
        var A = actors[name]; if (!A || !A.el.parentNode) return;
        var g = A.el.cloneNode(true);
        g.removeAttribute("data-a");
        [].slice.call(g.querySelectorAll("[data-a]")).forEach(function (q) { q.removeAttribute("data-a"); });
        g.style.visibility = "";
        A.el.parentNode.insertBefore(g, A.el.nextSibling);
        run.add(0.9, 0, "io", function (t) { g.setAttribute("opacity", r2(0.9 * (1 - t))); },
          function () { if (g.parentNode) g.parentNode.removeChild(g); });
      },
      kick: function (name, dx, dy, rot) {
        var A = actors[name]; if (!A) return;
        var bx = A.cur.x, by = A.cur.y, br = A.cur.r, tok = A.tok;
        run.add(0.7, 0.1, "lin", function (t) {
          if (A.tok !== tok) return;
          var w = Math.sin(t * Math.PI * 3) * (1 - t);
          A.cur.x = bx + (dx || 0) * w; A.cur.y = by + (dy || 0) * w; A.cur.r = br + (rot || 0) * w; A.paint();
        });
      }
    };

    return {
      go: function (i, n) { var k = mapIndex(i, n, N); goTo(k, cur < 0); },
      reset: function () { run.kill(); while (fxL.firstChild) fxL.removeChild(fxL.firstChild); cur = -1; lastLabel = ""; goTo(0, true); },
      destroy: function () { run.kill(); if (ro) ro.disconnect(); else W.removeEventListener("resize", fit); },
      boot: function () { goTo(0, true); }
    };
  }
  function SC(id, def) {
    var inst = null;
    W.VL_SCENES[id] = {
      build: function (el) {
        if (!el) return;
        if (inst) inst.destroy();
        inst = make(id, def, el);
        inst.boot();
      },
      step: function (i, n) { if (inst) inst.go(i, n); },
      reset: function () { if (inst) inst.reset(); }
    };
    W.VL_SCENES[id]._dbg = function () { return { W: def.W || 400, H: def.H || 320, B: def.B || {}, N: def.K.length }; };
  }

  var K = { ink: "#14233a", navy: "#1f4e79", orange: "#c0502a", green: "#2f7d5f", paper: "#fbf8f1",
    sky: "#dbe7f2", amber: "#e0a03a", plum: "#6a4c93", slate: "#8a97a8", white: "#ffffff", rose: "#d9644a", mint: "#d5ece0", red: "#d94a3a" };

  /* ---------- v2: literal hotel-process kit (every visual names a real Qasr activity) ---------- */
  function M() {
    var out = {}, i, a, k;
    for (i = 0; i < arguments.length; i++) {
      var src = arguments[i] || {};
      for (a in src) { out[a] = out[a] || {}; for (k in src[a]) out[a][k] = src[a][k]; }
    }
    return out;
  }
  function ON() { var o = {}, i; for (i = 0; i < arguments.length; i++) o[arguments[i]] = { o: 1 }; return o; }
  function OFF() { var o = {}, i; for (i = 0; i < arguments.length; i++) o[arguments[i]] = { o: 0 }; return o; }
  function HID(list) { var o = {}; list.forEach(function (n) { o[n] = { o: 0 }; }); return o; }
  /* receptionist behind a counter; counter top at y */
  function DESKK(x, y, col) {
    return AT(x, y, AT(0, -14, GUY(col || K.green), 0.95) + R(-38, -16, 76, 34, "#b98b5e", 5) + R(-42, -20, 84, 8, "#d8b48c", 3));
  }
  /* room door; floor at y */
  function DOORK(x, y) {
    return R(x - 24, y - 66, 48, 66, "#e8e1d2", 3) + R(x - 18, y - 60, 36, 60, K.navy, 2) + C(x + 11, y - 30, 2.5, "#ffd479");
  }
  function BOOK(x, y, col) {
    return AT(x, y, R(-20, -14, 40, 28, "#fff", 4, 'stroke="' + (col || K.navy) + '" stroke-width="2.2"') + R(-20, -14, 40, 8, col || K.navy, 3) +
      P("M-13 1 H13 M-13 7 H5", "#9aa7b8", 2));
  }
  function CLOCKK(x, y, r, col) {
    return C(x, y, r, "#fff", 'stroke="' + (col || K.orange) + '" stroke-width="3"') + P("M" + x + " " + y + " V" + (y - r * 0.6) + " M" + x + " " + y + " L" + (x + r * 0.45) + " " + (y + r * 0.2), col || K.orange, 2.4);
  }
  function HOURG(x, y, col) { return AT(x, y, F("M-8 -11 H8 L0 0 L8 11 H-8 L0 0Z", col || K.orange) + R(-10, -13, 20, 3, K.ink, 1) + R(-10, 10, 20, 3, K.ink, 1)); }
  function KIOSKK(x, y) { return AT(x, y, R(-11, -44, 22, 34, K.navy, 4) + R(-7, -40, 14, 14, "#9fe3c0", 2) + R(-4, -10, 8, 10, K.navy) + R(-12, 0, 24, 4, K.ink, 2)); }
  function IDC(x, y, col) { return AT(x, y, R(-15, -10, 30, 20, "#fff", 3, 'stroke="' + (col || K.plum) + '" stroke-width="2"') + C(-7, -1, 4.5, col || K.plum) + P("M2 -3 H11 M2 3 H9", "#9aa7b8", 2)); }
  function OFFICE(x, y, w, h, col) { return R(x - w / 2, y - h / 2, w, h, "#fff", 8, 'stroke="' + col + '" stroke-width="2.5"') + R(x - w / 2, y - h / 2, w, 7, col, 4); }
  function CHEV(x, y, w, h, fill, line) {
    return F("M" + x + " " + y + " H" + (x + w - 12) + " L" + (x + w) + " " + (y + h / 2) + " L" + (x + w - 12) + " " + (y + h) + " H" + x + " L" + (x + 12) + " " + (y + h / 2) + "Z", fill, 'data-f="" stroke="' + line + '" stroke-width="1.5"');
  }
  function COIN(x, y) { return E(x, y, 9, 3.5, K.amber) + E(x, y - 4, 9, 3.5, "#f1c26a"); }
  function TAGX(x, y) { return C(x, y, 10, "#fff", 'stroke="#d94a3a" stroke-width="2.5"') + CROSS(x, y, "#d94a3a", 2.6, 4.5); }
  function TAGOK(x, y) { return C(x, y, 10, K.green) + CHECK(x, y, "#fff", 2.6); }
  function SPEED(x, y, col) { return P("M" + x + " " + y + " h-16 M" + (x + 2) + " " + (y + 7) + " h-22 M" + x + " " + (y + 14) + " h-14", col || K.orange, 2.6); }
  function ARROW(x1, y1, x2, y2, col, w, ex) {
    var a = Math.atan2(y2 - y1, x2 - x1), hx = x2 - Math.cos(a) * 9, hy = y2 - Math.sin(a) * 9;
    return P("M" + x1 + " " + y1 + " L" + r2(hx) + " " + r2(hy), col, w || 3, ex) +
      F("M" + x2 + " " + y2 + " L" + r2(hx + Math.cos(a + 1.6) * 6) + " " + r2(hy + Math.sin(a + 1.6) * 6) + " L" + r2(hx + Math.cos(a - 1.6) * 6) + " " + r2(hy + Math.sin(a - 1.6) * 6) + "Z", col);
  }

  addCSS("kf", KF);
  /* =====================================================================
     O2b  QASR'S TWO COMPETING DESIGNS  (v2 - refined, audit score 7/6)
     Minute grid (left) + literal route of each design (right) + delivery
     timeline (bottom). Units morph between minutes and guests.
       minute grid / guest dots   benchmark: 110 Animated quadtree (Observable) - cells split and recolour
       route diagrams A and B      benchmark: 081 Clean Workflow Visualization (Dribbble) - steps connected
       stacked minute bars         benchmark: 126 Stacked-to-grouped bars (Observable)
       delivery timeline           benchmark: 136 Project TimeLine (Motion Array)
     ===================================================================== */
  (function () {
    function tx(i) { return 14 + (i % 10) * 18; }
    function ty(i) { return 56 + Math.floor(i / 10) * 18; }
    function tiles(a, b, col) { var s = "", i; for (i = a; i <= b; i++) s += R(tx(i), ty(i), 14, 14, col, 3); return s; }
    function dots(a, b, col) { var s = "", i; for (i = a; i <= b; i++) s += C(tx(i) + 7, ty(i) + 7, 6.5, col); return s; }
    var BX = [232, 292, 352], BASE = 236, SC_ = 1.2;
    function vbar(i, total) {
      var x = BX[i], h = total * SC_;
      return G("bar" + i, R(x - 20, BASE - h, 40, h, "#9aa7b8", 4) + R(x - 20, BASE - 8.1 * SC_, 40, 8.1 * SC_, "#3fae74", 2), x, BASE);
    }
    SC("O2b", {
      title: "Qasr's two competing designs", W: 400, H: 320, acc: K.orange,
      B: { queueA: [214, 150, 330, 206], tlA: [20, 238, 380, 282], tlB: [20, 238, 380, 282], jan: [260, 232, 346, 306], todayQ: [140, 270, 220, 310] },
      art: function () {
        var s = R(-1400, -1400, 3200, 3200, "#f4f6f9");
        s += G("gridBg", R(8, 50, 190, 190, "#fff", 10, 'stroke="#dfe4ea" stroke-width="1.5"') + tiles(0, 99, "#eef1f5"), 103, 145);
        s += G("tSvc", tiles(0, 7, "#3fae74"), 80, 60) + G("tA", tiles(8, 43, K.navy), 80, 90) + G("tB", tiles(44, 81, K.navy), 80, 150);
        s += G("tB2", tiles(22, 43, K.navy), 80, 100);
        /* v3: minute mode legend sits on the unused tenth row (82 squares = 82 minutes) */
        s += G("leg", R(12, 214, 184, 22, "#fff", 4) + T(104, 230, "1 square = 1 minute", 13, K.slate, "middle", 'class="vw-n"'), 104, 225);
        s += G("dGo", dots(0, 73, "#3fae74"), 100, 120) + G("dHelp", dots(74, 99, K.orange), 100, 220);
        s += '<g data-a="num" data-p="300 84" data-n0="0" data-fmt="#"><text data-t="" class="vw-t" x="300" y="98" font-size="42" fill="' + K.ink + '" text-anchor="middle">0</text></g>';
        s += G("unit", T(300, 122, "minutes", 15, K.slate), 300, 118) + G("unitM", T(300, 122, "modelled min", 15, K.navy), 300, 118) + G("unitG", T(300, 122, "of 100 guests", 15, "#3fae74"), 300, 118);
        s += G("p74", T(300, 98, "74", 42, "#3fae74"), 300, 84);
        /* proposals */
        s += G("fA", R(214, 136, 80, 60, "#e3eef8", 8, 'stroke="' + K.navy + '" stroke-width="2.5"') + T(254, 172, "Design A", 15, K.navy, "middle", 'class="vw-n"'), 254, 166);
        s += G("fB", R(306, 136, 80, 60, "#e3f3ea", 8, 'stroke="' + K.green + '" stroke-width="2.5"') + T(346, 172, "Design B", 15, K.green, "middle", 'class="vw-n"'), 346, 166);
        s += G("yard", P("M214 220 H386", K.ink, 2) + [0, 1, 2, 3, 4, 5, 6].map(function (k) { return P("M" + (214 + k * 28.6) + " 214 V226", K.ink, 1.5); }).join("") + T(300, 244, "Lobby to room", 15, K.ink), 300, 228);
        /* route A */
        s += G("rA", AT(222, 200, GUY(K.navy), 0.8) + P("M236 192 H262", K.slate, 2.5) + AT(290, 200, R(-24, -12, 48, 24, "#b98b5e", 4) + AT(0, -12, GUY(K.green), 0.7)) + P("M318 192 H344", K.slate, 2.5) + R(350, 160, 26, 40, K.navy, 2), 300, 186);
        s += PILL("pDeskC", 290, 148, "Desk at centre", K.navy, "#fff", 15);
        s += G("bkA", BOOK(240, 152, K.green) + TAGOK(258, 140), 240, 152);
        s += G("hgA", HOURG(290, 152) + TAGX(306, 142), 296, 148);
        s += G("kioskA", KIOSKK(262, 200), 262, 180) + G("retype", R(318, 136, 30, 22, "#fff", 3, 'stroke="#9aa7b8" stroke-width="1.5"') + TAGX(350, 140), 334, 146);
        s += G("queueA", [0, 1, 2].map(function (k) { return AT(258 - k * 13, 200, GUY(k % 2 ? K.orange : "#5b8fc4"), 0.55); }).join(""), 245, 190);
        /* route B */
        s += G("rB", PHONE(222, 150, 22, 40, K.ink, "#9fe3c0") + ARROW(250, 172, 330, 172, K.green, 3) + R(338, 146, 30, 52, K.navy, 2) + G("doorB", R(341, 149, 24, 46, "#ffe9a8", 2), 353, 172), 300, 172);
        s += G("readyB", [["Identity", 0], ["Payment", 1], ["Rate", 2], ["Room", 3]].map(function (r) { var x = 222 + (r[1] % 2) * 86, y = 212 + Math.floor(r[1] / 2) * 24; return TAGOK(x, y) + T(x + 14, y + 5, r[0], 15, K.ink, "start"); }).join(""), 300, 224);
        /* functions */
        s += G("funcs", [["Recep.", 0], ["Rev.", 1], ["Rooms", 2], ["IT", 3]].map(function (f) {
          return G("fn" + f[1], C(232 + f[1] * 44, 160, 15, "#fff", 'data-f="" stroke="' + K.navy + '" stroke-width="2.5"') + '<g class="vw-goSpin">' + GEAR(232 + f[1] * 44, 160, 7, 8, K.navy, "#fff") + "</g>" + T(232 + f[1] * 44, 194, f[0], 15, K.ink), 232 + f[1] * 44, 170);
        }).join(""), 300, 170);
        /* compare bars */
        /* v3: zero-based minute axis (1.2 units per minute) with gridlines; savings drawn as the removed part of each bar */
        var gl = P("M210 " + BASE + " H374", K.ink, 2);
        [20, 40, 60, 80].forEach(function (m) { gl += P("M210 " + r2(BASE - m * SC_) + " H374", "#c9d3df", 1, 'stroke-dasharray="3 4"') + T(378, r2(BASE - m * SC_ + 4), String(m), 11, K.slate, "start"); });
        gl += T(378, BASE + 4, "0", 11, K.slate, "start") + T(378, r2(BASE - 92 * SC_), "min", 11, K.slate, "start");
        s += G("bars", gl + vbar(0, 82) + vbar(1, 44) + vbar(2, 22) + T(BX[0], 254, "Today", 15, K.ink) + T(BX[1], 254, "A", 15, K.navy) + T(BX[2], 254, "B", 15, K.green) +
          T(BX[0], 130, "82", 15, K.ink) + T(BX[1], 176, "44", 15, K.navy) + T(BX[2], 202, "22", 15, K.green), 292, 190);
        function gap(x, hi, lo, lab) { return R(x - 20, r2(BASE - hi * SC_), 40, r2((hi - lo) * SC_), "#fff3e8", 3, 'stroke="' + K.orange + '" stroke-width="2" stroke-dasharray="4 3"') + (lab ? T(x, r2(BASE - hi * SC_ + 18), lab, 14, K.orange, "middle", 'class="vw-n"') : ""); }
        s += G("save", gap(BX[1], 82, 44, "-38") + gap(BX[2], 82, 22, "-60"), 322, 170);
        s += G("both47", HOURG(BX[1] - 6, 168) + TAGX(BX[1] + 10, 160) + HOURG(BX[2] - 6, 194) + TAGX(BX[2] + 10, 186), 322, 180);
        s += G("svcHi", R(BX[0] - 24, BASE - 12, 168, 14, "none", 4, 'stroke="#3fae74" stroke-width="2.5"'), 300, BASE - 5);
        s += G("diff", gap(BX[2], 44, 22, "") + P("M" + (BX[1] + 20) + " " + r2(BASE - 44 * SC_) + " H" + (BX[2] - 20), K.orange, 2, 'stroke-dasharray="4 3"'), 330, 196);
        /* tensions */
        s += G("flagB", P("M330 140 V112", K.ink, 2) + F("M330 112 l16 5 l-16 6Z", K.red) + P("M362 140 V112", K.ink, 2) + F("M362 112 l16 5 l-16 6Z", K.red), 346, 126);
        s += G("objs", [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (k) { var c = k < 7 ? K.orange : "#9aa7b8"; return R(216 + k * 19, 140, 15, 12, c, 3) + F("M" + (220 + k * 19) + " 152 l-2 5 l6 -5Z", c); }).join(""), 300, 146);
        /* timeline */
                /* v3: month scale under the delivery bars: 14 months = 360 units (25.7 per month); 18 weeks = 4.1 months */
        var mt = "", MO = 360 / 14;
        for (var m = 0; m <= 14; m++) mt += P("M" + r2(20 + m * MO) + " 294 V" + (m % 6 === 0 || m === 14 ? 302 : 299), K.ink, 1.5);
        s += G("tl", P("M20 296 H380", K.ink, 2) + mt + T(20, 314, "Now", 13, K.ink, "start") + T(r2(20 + 6 * MO), 314, "6 mo", 12, K.slate) + T(r2(20 + 12 * MO), 314, "12 mo", 12, K.slate) + T(380, 314, "14", 12, K.slate, "end"), 200, 300);
        s += G("tlA", R(20, 240, 106, 18, K.navy, 5) + T(26, 254, "A: 18 weeks", 15, "#fff", "start", 'class="vw-n"'), 20, 249);
        s += G("tlB", R(20, 262, 360, 18, "#3fae74", 5) + T(150, 276, "B: 14 months", 15, "#fff", "start", 'class="vw-n"'), 20, 271);
        s += G("hotels", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(function (k) { return R(136 + k * 13, 284, 9, 9, K.navy, 2); }).join(""), 226, 288);
        s += G("jan", P("M303 252 V302", K.red, 3) + R(278, 238, 50, 18, K.red, 5) + T(303, 252, "Jan", 15, "#fff", "middle", 'class="vw-n"'), 303, 260);
        s += G("ovl", R(303, 262, 77, 18, "#ffd479", 4, 'opacity=".9"') + AT(341, 271, R(-6, -3, 12, 9, K.red, 2) + P("M-3.5 -3 V-6 Q-3.5 -9.5 0 -9.5 Q3.5 -9.5 3.5 -6 V-3", K.red, 1.8)), 341, 271);
        s += G("todayQ", AT(160, 304, GUY(K.orange), 0.6) + AT(174, 304, GUY("#5b8fc4"), 0.6) + CLOCKK(196, 290, 9, K.orange), 178, 294);
        /* pills */
        var PL = [["pTwo", "Two proposals", K.ink], ["pSame", "Same yardstick", K.ink], ["pBook", "Rate at booking", K.green], ["pKiosk", "Kiosk checks ID", K.navy], ["pOne", "One function", K.navy],
          ["pSpeed", "Delays continue now", K.orange], ["pBold", "Desk optional", K.green], ["pFour", "Four functions", K.green], ["pTog", "Change together", K.green], ["pSide", "Side by side", K.ink],
          ["pBoth", "Both drop 47 min", K.orange], ["pSvc", "8.1 min stays", "#3fae74"], ["pWaste", "Waiting, rework go", K.ink], ["pDiff", "The 22-min gap", K.orange], ["pQA", "All guests queue", K.navy],
          ["pQB", "Most skip queue", K.green], ["pTens", "Hidden tensions", K.red], ["p7", "7 of 9 objections", K.orange], ["pJan", "Rule in 11 months", K.red], ["pOvl", "Saving or risk?", K.red],
          ["pMod", "Modelled, not results", K.navy], ["pConn", "Numbers need people", K.ink]];
        PL.forEach(function (p) { s += PILL(p[0], 290, 40, p[1], p[2], "#fff", 15); });
        s += G("people", AT(232, 200, GUY(K.green), 0.9) + AT(256, 200, GUY(K.plum), 0.9) + R(296, 172, 30, 22, K.ink, 3) + R(300, 176, 22, 14, "#9fe3c0", 2) + R(344, 170, 26, 30, "#fff", 3, 'stroke="' + K.navy + '" stroke-width="2"') + P("M268 186 H292 M328 186 H342", K.ink, 2, 'class="vw-flow"'), 300, 186);
        s += G("asm", [BX[1], BX[2]].map(function (x) { return R(x - 22, 138, 44, 20, "#fff", 4, 'stroke="#2b6f9e" stroke-width="2" stroke-dasharray="4 3"') + T(x, 153, "?", 15, "#2b6f9e", "middle", 'class="vw-n"'); }).join(""), 322, 148);
        return s;
      },
      init: M(HID(["tSvc", "tA", "tB", "tB2", "dGo", "dHelp", "num", "unit", "unitM", "unitG", "p74", "fA", "fB", "yard", "rA", "pDeskC", "bkA", "hgA", "kioskA", "retype", "queueA", "rB", "readyB", "funcs", "bars", "save", "both47", "svcHi", "diff",
        "flagB", "objs", "tl", "tlA", "tlB", "hotels", "jan", "ovl", "todayQ", "people", "asm",
        "pTwo", "pSame", "pBook", "pKiosk", "pOne", "pSpeed", "pBold", "pFour", "pTog", "pSide", "pBoth", "pSvc", "pWaste", "pDiff", "pQA", "pQB", "pTens", "p7", "pJan", "pOvl", "pMod", "pConn"]),
        { num: { n: 0 }, tlA: { sx: 0.05 }, tlB: { sx: 0.02 }, fn0: { f: "#fff" }, fn1: { f: "#fff" }, fn2: { f: "#fff" }, fn3: { f: "#fff" }, doorB: { sx: 0.05 }, bar0: { sy: 0.02 }, bar1: { sy: 0.02 }, bar2: { sy: 0.02 }, fA: { s: 1 }, fB: { s: 1 } }),
      K: (function () {
        var PLS = ["pTwo", "pSame", "pBook", "pKiosk", "pOne", "pSpeed", "pBold", "pFour", "pTog", "pSide", "pBoth", "pSvc", "pWaste", "pDiff", "pQA", "pQB", "pTens", "p7", "pJan", "pOvl", "pMod", "pConn"];
        function pl(n) { var o = {}; PLS.forEach(function (k) { o[k] = { o: k === n ? 1 : 0 }; }); return o; }
        var RIGHT = ["fA", "fB", "yard", "rA", "pDeskC", "bkA", "hgA", "kioskA", "retype", "queueA", "rB", "readyB", "funcs", "bars", "save", "both47", "svcHi", "diff", "flagB", "objs", "people", "asm"];
        function rt(keep) { keep = keep || []; var o = HID(RIGHT.filter(function (n) { return keep.indexOf(n) < 0; })); keep.forEach(function (n) { o[n] = { o: 1 }; }); return o; }
        var MIN = { tSvc: { o: 1 }, tA: { o: 1 }, tB: { o: 1 }, dGo: { o: 0 }, dHelp: { o: 0 }, leg: { o: 1 } };
        return [
          { L: "Two concrete proposals", a: M(pl("pTwo"), { fA: { o: 1 }, fB: { o: 1, w: 0.25 } }), e: "back", p: ["fA", "fB"] },
          { L: "82 minutes today", dur: 1.6, a: M(pl(), rt(["fA", "fB"]), { tSvc: { o: 1 }, tA: { o: 1, w: 0.15 }, tB: { o: 1, w: 0.3 }, leg: { o: 1, w: 0.5 }, num: { o: 1, n: 82 }, unit: { o: 1 } }), e: "out", p: "num" },
          { L: "One shared yardstick", a: M(pl("pSame"), rt(["fA", "fB", "yard"])), p: "yard" },
          { L: "Design A: desk at centre", a: M(pl(), rt(["rA", "pDeskC"])), p: "rA" },
          { L: "Rate at booking", a: M(pl("pBook"), rt(["rA", "bkA", "hgA"])), p: "bkA" },
          { L: "Kiosk checks identity", a: M(pl("pKiosk"), rt(["rA", "kioskA", "retype"])), p: "kioskA" },
          { L: "44 min, 18 weeks", dur: 1.5, a: M(pl(), rt(["rA"]), { tB: { o: 0.12 }, num: { n: 44 }, unit: { o: 0 }, unitM: { o: 1 }, tl: { o: 1 }, tlA: { o: 1, sx: 1, w: 0.4 }, hotels: { o: 1, w: 0.9 } }), p: "tlA" },
          { L: "Only one function changes", a: M(pl("pOne"), rt(["funcs"]), { fn0: { f: "#ffd479" } }), p: "fn0" },
          { L: "Speed matters", a: M(pl("pSpeed"), rt(["funcs"]), OFF("hotels"), ON("todayQ")), fx: function (f) { f.kick("todayQ", 0, -3, 0); }, p: "todayQ" },
          { L: "Design B: desk optional", dur: 1.2, a: M(pl("pBold"), rt(["rB"]), OFF("todayQ"), { tB: { o: 1 }, num: { n: 82 }, unit: { o: 1 }, unitM: { o: 0 } }), p: "rB" },
          { L: "All ready before arrival", dur: 1.3, a: M(pl(), rt(["rB", "readyB"]), { doorB: { sx: 1, w: 0.6 } }), p: "readyB" },
          { L: "74% skip the desk", dur: 1.2, a: M(pl(), rt(["rB"]), { tSvc: { o: 0 }, tA: { o: 0 }, tB: { o: 0 }, leg: { o: 0 }, dGo: { o: 1 }, dHelp: { o: 1, w: 0.3 }, num: { o: 0 }, unit: { o: 0 }, p74: { o: 1 }, unitG: { o: 1 } }), p: "dHelp" },
          { L: "22 min, 14 months", dur: 1.5, a: M(pl("pFour"), rt(["funcs"]), MIN, { tB: { o: 0.12 }, tA: { o: 0.12 }, tB2: { o: 0 }, p74: { o: 0 }, unitG: { o: 0 }, num: { o: 1, n: 22 }, unitM: { o: 1 }, fn0: { f: "#ffd479" }, fn1: { f: "#ffd479", w: 0.2 }, fn2: { f: "#ffd479", w: 0.4 }, fn3: { f: "#ffd479", w: 0.6 }, tlB: { o: 1, sx: 1, w: 0.4 } }), p: "tlB" },
          { L: "More changes together", a: M(pl("pTog"), rt(["funcs"])), fx: function (f) { f.kick("funcs", 0, -3, 0); f.kick("tlB", 4, 0, 0); }, p: "funcs" },
          { L: "Side by side", dur: 1.4, a: M(pl("pSide"), rt(["bars"]), OFF("tl", "tlA", "tlB", "num", "unitM"), { tA: { o: 1 }, tB: { o: 1 }, bar0: { sy: 1 }, bar1: { sy: 1, w: 0.2 }, bar2: { sy: 1, w: 0.4 } }), e: "out", p: "bars" },
          { L: "Save 38 or 60 min", a: M(pl(), rt(["bars", "save"])), p: "save" },
          { L: "Both remove the 47 min", a: M(pl("pBoth"), rt(["bars", "both47"])), p: "both47" },
          { L: "Service stays 8.1 min", a: M(pl("pSvc"), rt(["bars", "svcHi"]), { tSvc: { o: 1 }, tA: { o: 0.25 }, tB: { o: 0.25 } }), p: "svcHi" },
          { L: "Savings come from waiting", a: M(pl("pWaste"), rt(["bars", "svcHi"]), { tA: { o: 0.12 }, tB: { o: 0.12 } }), p: "gridBg" },
          { L: "Where A and B differ", a: M(pl("pDiff"), rt(["bars", "diff"]), { tA: { o: 1 }, tB: { o: 0.12 } }), p: "diff" },
          { L: "A: every guest queues", a: M(pl("pQA"), rt(["rA", "queueA"])), fx: function (f) { f.kick("queueA", 3, 0, 0); }, p: "queueA" },
          { L: "B: most never queue", dur: 1.2, a: M(pl("pQB"), rt(["rB"]), { tSvc: { o: 0 }, tA: { o: 0 }, tB: { o: 0 }, leg: { o: 0 }, dGo: { o: 1 }, dHelp: { o: 1 }, doorB: { sx: 1 } }), p: "dGo" },
          { L: "Hidden tensions", a: M(pl("pTens"), rt(["fB", "flagB"])), p: "flagB" },
          { L: "26% and 7 of 9", a: M(pl("p7"), rt(["objs"]), { dGo: { o: 0.25 }, num: { o: 1, n: 26 }, unitG: { o: 1 } }), p: "dHelp" },
          { L: "January rule, 11 months", dur: 1.2, a: M(pl("pJan"), rt(), MIN, ON("tl", "tlB", "jan"), { tA: { o: 0.12 }, tB: { o: 0.12 }, num: { o: 0 }, unitG: { o: 0 } }), p: "jan" },
          { L: "Saving, or deadline risk?", a: M(pl("pOvl"), ON("ovl")), fx: function (f) { f.kick("jan", 3, 0, 0); }, p: "ovl" },
          { L: "Modelled, not results", a: M(pl("pMod"), rt(["bars", "asm"]), OFF("tl", "tlB", "jan", "ovl")), p: "asm" },
          { L: "Numbers need people", a: M(pl("pConn"), rt(["people"]), { tA: { o: 1 } }), p: "people" }
        ];
      })()
    });
  })();
  addCSS("O2b", baseCSS("O2b", { bg: "#f4f6f9", ink: K.ink, acc: K.orange, halo: "rgba(255,255,255,.9)" }));

  /* =====================================================================
     O2c  THE QUICK-WIN TRAP  (v2 - rebuilt, audit score 4/4)
     An investment ledger on the delivery timeline Now > A live > B live:
       timeline + zones  what Qasr buys/learns for A, and what survives when B arrives
           benchmark: 136 Project TimeLine (Motion Array) - marker advances along milestones
       carry-over sort  reusable work slides into B; desk-only kit drops into the sunk-cost bin
           benchmark: 126 Stacked-to-grouped bars (Observable) - same items re-sorted, identity kept
       integration plugs  A's system vs B's socket, data packets stop, re-typing returns
           benchmark: 092 process connecting (LottieFiles) - connections drawn and joined
       attention bar + gates  same people, rules, contracts, systems
           benchmark: 120 Animated Dashboards (LottieFiles) - panels transition between states
     ===================================================================== */
  (function () {
    var AY = 78, XA = 171, XB = 320;
    function card(name, x, y, label, col, fill) {
      return G(name, R(x - 70, y - 13, 140, 26, fill || "#fff", 6, 'data-f="" stroke="' + col + '" stroke-width="2"') + T(x, y + 5, label, 15, K.ink, "middle", 'class="vw-n"'), x, y);
    }
    SC("O2c", {
      title: "The quick-win trap", W: 400, H: 320, acc: K.orange,
      /* v3: the attention track keeps A + B = 290 units at every frame; cards drop only into their own bin */
      B: { c1: [94, 92, 250, 310], c2: [94, 92, 250, 310], attA: [100, 262, 390, 284], attB: [100, 262, 390, 284], pplB: [100, 196, 390, 254] },
      art: function () {
        var s = R(-1400, -1400, 3200, 3200, "#f2efe8");
        /* timeline */
        s += G("axis", P("M20 " + AY + " H390", K.ink, 3) + C(40, AY, 7, K.ink) + T(40, 62, "Now", 15, K.ink), 200, AY);
        s += G("mA", C(160, AY, 9, K.navy) + T(160, 62, "A live", 15, K.navy), 160, AY);
        s += G("mB", C(330, AY, 9, K.green) + T(330, 62, "B live", 15, K.green), 330, AY);
        s += G("prep", HOURG(358, 58, K.green), 358, 58);
        s += G("trapSeg", P("M172 " + AY + " H318", K.orange, 4, 'stroke-dasharray="8 6"') + AT(245, AY, R(-8, -4, 16, 13, K.orange, 3) + P("M-5 -4 V-8 Q-5 -13 0 -13 Q5 -13 5 -8 V-4", K.orange, 2.4)), 245, AY);
        s += G("starA", F("M160 " + (AY - 28) + " l4 9 l10 1 l-8 6 l3 10 l-9 -6 l-9 6 l3 -10 l-8 -6 l10 -1Z", K.amber), 160, AY - 22);
        s += G("pickA", P("M20 " + AY + " H160", K.navy, 7), 90, AY);
        s += G("pickB", P("M20 " + AY + " H330", K.green, 7), 175, AY);
        /* zones */
        s += G("zA", R(100, 96, 142, 140, "#e3eef8", 10), XA, 166) + G("zB", R(250, 96, 140, 140, "#e3f3ea", 10), XB, 166);
        /* sort bins */
        s += G("prepBin", R(250, 240, 140, 68, "#e3f3ea", 10, 'stroke="' + K.green + '" stroke-width="2"') + T(XB, 301, "Prepares B", 15, K.green, "middle", 'class="vw-n"') + TAGOK(268, 296), XB, 270);
        s += G("lockBin", R(100, 240, 142, 68, "#fde3d6", 10, 'stroke="' + K.orange + '" stroke-width="2"') + T(XA, 301, "Locks in", 15, K.orange, "middle", 'class="vw-n"') + AT(126, 296, R(-7, -4, 14, 11, K.orange, 2) + P("M-4 -4 V-7 Q-4 -11 0 -11 Q4 -11 4 -7 V-4", K.orange, 2)), XA, 270);
        s += card("c1", XA, 112, "Desk kiosks", K.slate) + card("c2", XA, 144, "Desk software", K.slate) + card("c3", XA, 176, "Clean data", K.green) + card("c4", XA, 208, "Exception skills", K.green);
        s += G("coinsA", COIN(118, 226) + COIN(138, 226) + COIN(158, 226), 138, 224);
        s += G("deskB", AT(XB, 160, R(-26, -10, 52, 22, "#b98b5e", 4)) + TAGX(XB + 30, 150), XB, 160);
        s += G("doorB", PHONE(XB - 40, 196, 14, 26, K.ink, "#9fe3c0") + R(XB + 18, 192, 20, 34, K.navy, 2), XB, 210);
        /* sunk bin */
        s += G("bin", F("M120 256 H230 L222 304 H128Z", "#8a7f6c") + R(116, 250, 118, 8, "#6d6455", 3), 175, 280);
        s += PILL("pSunk", 175, 286, "Sunk cost", "#fff", "#6d6455", 15);
        s += G("noBack", ARROW(120, 270, 60, 250, K.slate, 2.5) + TAGX(88, 258), 90, 260);
        /* left: guests today, staff */
        s += G("queue", [0, 1, 2, 3].map(function (i) { return AT(22 + i * 18, 160, GUY(i % 2 ? K.orange : "#5b8fc4"), 0.7); }).join(""), 49, 150);
        s += G("staff", AT(50, 228, GUY(K.green)) + R(62, 204, 18, 22, "#fff", 2, 'stroke="' + K.navy + '" stroke-width="1.5"'), 56, 214);
        s += G("tired", C(40, 190, 2.5, "#5fb3e6") + C(58, 186, 2.5, "#5fb3e6") + '<g class="vw-spin">' + P("M84 186 a10 10 0 1 1 -3 -7", K.orange, 2.5) + "</g>", 60, 188);
        /* meeting */
        s += G("meet", E(200, 262, 90, 18, "#b98b5e") + AT(140, 252, GUY(K.ink)) + AT(200, 248, GUY(K.plum)) + AT(260, 252, GUY(K.navy)), 200, 240);
        s += PILL("pComp", 200, 200, "A now, B later?", K.ink, "#fff", 16);
        /* commitments sheet */
        s += G("sheet", R(150, 100, 100, 128, "#fff", 6, 'stroke="' + K.ink + '" stroke-width="2"') + T(200, 122, "Commits", 15, K.ink, "middle", 'class="vw-n"') +
          [0, 1, 2, 3].map(function (i) { return P("M164 " + (146 + i * 20) + " H236", "#c9d3df", 3); }).join(""), 200, 164);
        s += G("mag", AT(240, 150, C(0, 0, 22, "rgba(255,255,255,.35)", 'stroke="' + K.ink + '" stroke-width="3.5"') + P("M16 16 L30 30", K.ink, 5)), 240, 150);
        /* integration */
        s += G("sysA", R(104, 130, 90, 50, K.navy, 8) + T(149, 160, "A system", 15, "#fff", "middle", 'class="vw-n"') + R(194, 146, 16, 18, K.navy, 2), 149, 155);
        s += G("sysB", R(270, 130, 90, 50, K.green, 8) + T(315, 160, "B system", 15, "#fff", "middle", 'class="vw-n"') + C(262, 155, 10, "#fff", 'stroke="' + K.green + '" stroke-width="3"'), 315, 155);
        s += G("pkts", [0, 1, 2].map(function (i) { return R(214 + i * 14, 150, 9, 9, K.amber, 2); }).join(""), 228, 155);
        s += G("plugX", TAGX(236, 196), 236, 196);
        s += G("retype", AT(236, 226, AT(0, 6, GUY(K.orange), 0.7) + R(10, -14, 16, 12, "#fff", 2, 'stroke="#9aa7b8" stroke-width="1.5"')), 236, 220);
        /* attention */
        s += G("att", R(100, 262, 290, 22, "#eef1f5", 11, 'stroke="#c9d3df" stroke-width="1.5"') + G("attA", R(100, 262, 145, 22, "#5b8fc4", 11), 100, 273) + G("attB", R(245, 262, 145, 22, "#3fae74", 11), 390, 273), 245, 273);
        s += G("money", COIN(30, 290) + COIN(50, 290) + COIN(70, 290) + COIN(40, 278) + COIN(60, 278), 50, 284);
        s += G("pplB", AT(300, 250, GUY(K.green), 0.7) + AT(320, 250, GUY(K.ink), 0.7), 310, 240);
        s += G("lostB", R(250, 96, 140, 140, "rgba(255,255,255,.7)", 10), XB, 166);
        /* gates */
        s += G("gates", [214, 248, 282].map(function (x) { return R(x - 4, AY - 20, 8, 40, K.ink, 2) + G("", R(x - 14, AY - 4, 28, 8, K.orange, 3, 'data-f=""'), x, AY); }).join(""), 248, AY);
        s += PILL("g1", 74, 112, "Rules", "#fff", K.ink, 15) + PILL("g2", 74, 146, "Contracts", "#fff", K.ink, 15) + PILL("g3", 74, 180, "Systems", "#fff", K.ink, 15);
        s += G("pillarE", R(282, 96, 22, 120, K.navy, 4) + T(293, 236, "Evidence", 15, K.navy), 293, 160) + G("pillarR", R(346, 96, 22, 120, K.green, 4) + T(357, 256, "Readiness", 15, K.green), 357, 160);
        /* pills */
        s += PILL("pRelief", 60, 112, "Relief now", K.orange, "#fff", 15);
        s += PILL("pPrep", 330, 112, "Needs prep", "#fff", K.green, 15);
        s += PILL("pWin", 160, 112, "Quick win", K.navy, "#fff", 15);
        s += PILL("pConf", 160, 146, "Confidence up", "#fff", K.navy, 15);
        s += PILL("pTrap", 245, 112, "Trap?", K.orange, "#fff", 15);
        s += PILL("pPaid", 200, 228, "We already paid", K.ink, "#fff", 15);
        s += PILL("pObs", 160, 268, "Routines obsolete", "#fff", K.orange, 15);
        s += PILL("pFat", 160, 268, "Change fatigue", K.orange, "#fff", 15);
        s += PILL("pInt", 236, 112, "Systems must talk", "#fff", K.navy, 15);
        s += PILL("pAtt", 245, 236, "Attention is limited", "#fff", K.ink, 15);
        s += PILL("pSame", 245, 236, "Same people", K.orange, "#fff", 15);
        s += PILL("pOpp", XB, 112, "Value given up", K.plum, "#fff", 15);
        s += PILL("pCare", 316, 112, "Don't reject A", "#fff", K.green, 15);
        s += PILL("pNF", 300, 112, "Not feasible yet", K.red, "#fff", 15);
        s += PILL("pRel", 90, 112, "Earlier relief", K.navy, "#fff", 15);
        s += PILL("pQ", 90, 146, "Queue stays", "#fff", K.orange, 15);
        s += PILL("pAccA", 90, 180, "Risk accepted", K.ink, "#fff", 15);
        s += PILL("pDeep", 300, 112, "Deeper redesign", K.green, "#fff", 15);
        s += PILL("pWait", 300, 146, "Longer wait", "#fff", K.orange, 15);
        s += PILL("pDepF", 300, 180, "If gates fail", "#fff", K.red, 15);
        s += PILL("pNoFree", 200, 300, "No risk-free option", K.ink, "#fff", 15);
        s += PILL("pNext", 200, 300, "Next: constraints", K.navy, "#fff", 15);
        return s;
      },
      init: M(HID(["prep", "trapSeg", "starA", "pickA", "pickB", "zA", "zB", "c1", "c2", "c3", "c4", "coinsA", "deskB", "doorB", "bin", "pSunk", "noBack", "staff", "tired", "sheet", "mag", "sysA", "sysB", "pkts", "plugX", "retype",
        "att", "money", "pplB", "lostB", "prepBin", "lockBin", "gates", "g1", "g2", "g3", "pillarE", "pillarR", "pRelief", "pPrep", "pWin", "pConf", "pTrap", "pPaid", "pObs", "pFat", "pInt", "pAtt", "pSame", "pOpp", "pCare",
        "pNF", "pRel", "pQ", "pAccA", "pDeep", "pWait", "pDepF", "pNoFree", "pNext", "pComp", "queue"]),
        { axis: { o: 0 }, mA: { o: 0, s: 0.3 }, mB: { o: 0, s: 0.3 }, c1: { x: 0, y: 0, s: 1, f: "#fff" }, c2: { x: 0, y: 0, s: 1, f: "#fff" }, c3: { x: 0, y: 0 }, c4: { x: 0, y: 0 }, attA: { sx: 1 }, attB: { sx: 1 }, pplB: { x: 0 },
          pkts: { x: 0 }, queue: { o: 0, sx: 1 }, meet: { o: 1 }, pillarE: { o: 0, sy: 0.1 }, pillarR: { o: 0, sy: 0.1 } }),
      K: (function () {
        var P1 = ["pRelief", "pPrep", "pWin", "pConf", "pTrap", "pPaid", "pObs", "pFat", "pInt", "pAtt", "pSame", "pOpp", "pCare", "pNF", "pRel", "pQ", "pAccA", "pDeep", "pWait", "pDepF", "pNoFree", "pNext", "g1", "g2", "g3", "pComp"];
        function cl(keep) { return HID(P1.filter(function (n) { return (keep || []).indexOf(n) < 0; })); }
        var GREY = "#e3e6ea";
        return [
          { L: "A seemingly sensible idea", a: { meet: { o: 1 } }, p: "meet" },
          { L: "A now, B later?", dur: 1.3, a: M(ON("pComp", "axis"), { mA: { o: 1, s: 1, w: 0.4 }, mB: { o: 1, s: 1, w: 0.7 } }), e: "back", p: "pComp" },
          { L: "Relief now, B needs prep", a: M(cl(["pComp"]), ON("queue", "pRelief", "prep", "pPrep")), p: ["queue", "prep"] },
          { L: "What are we committing to?", a: M(cl(), OFF("meet"), ON("sheet", "mag")), p: "sheet" },
          { L: "A quick win", dur: 1.2, a: M(cl(), OFF("sheet", "mag", "prep"), ON("pickA", "starA", "pWin"), { queue: { sx: 0.6 } }), p: "starA" },
          { L: "Quick wins build confidence", a: M(cl(["pWin"]), ON("pConf")), fx: function (f) { f.burstOn("starA", K.amber); }, p: "pConf" },
          { L: "When a win becomes a trap", a: M(cl(), ON("trapSeg", "pTrap")), p: "trapSeg" },
          { L: "Desk-only investment", dur: 1.2, a: M(cl(), OFF("starA", "pickA", "trapSeg"), ON("zA", "coinsA", "c1"), { c2: { o: 1, w: 0.25 } }), e: "back", p: "c1" },
          { L: "B removes the desk work", dur: 1.2, a: M(cl(), ON("zB", "deskB", "doorB"), { c1: { f: GREY }, c2: { f: GREY } }), p: "deskB" },
          { L: "Sunk cost", dur: 1.3, a: M(cl(), ON("bin", "pSunk"), { c1: { y: 150, s: 0.3, o: 0 }, c2: { y: 118, s: 0.3, o: 0 }, noBack: { o: 1, w: 0.8 } }), e: "io", p: "bin" },
          { L: "Pressure to stay", a: M(cl(), OFF("noBack"), ON("pPaid"), { mB: { o: 0.45 } }), fx: function (f) { f.kick("pPaid", 0, -4, 0); }, p: "pPaid" },
          { L: "Routines become obsolete", a: M(cl(), OFF("pSunk"), ON("staff", "pObs"), { mB: { o: 1 } }), p: "staff" },
          { L: "Change fatigue", a: M(cl(), ON("tired", "pFat")), p: "tired" },
          { L: "Will A's tech fit B?", dur: 1.2, a: M(cl(), OFF("tired", "bin", "c1", "c2", "coinsA", "deskB", "doorB", "c3", "c4"), ON("sysA", "sysB", "plugX"), { zA: { o: 0.4 }, zB: { o: 0.4 } }), p: "plugX" },
          { L: "Integration: data flows", dur: 1.4, a: M(cl(), ON("pInt", "pkts", "retype"), { pkts: { x: 18 } }), fx: function (f) { f.kick("retype", 3, 0, 0); }, p: "retype" },
          { L: "Attention is limited", a: M(cl(), OFF("sysA", "sysB", "plugX", "pkts", "retype", "staff"), ON("att", "money", "pAtt", "pplB"), { zA: { o: 1 }, zB: { o: 1 } }), p: "att" },
          { L: "Same people, both changes", dur: 1.3, a: M(cl(), ON("pSame"), { attA: { sx: 1.7 }, attB: { sx: 0.3 }, pplB: { x: -140 } }), p: "pSame" },
          { L: "Opportunity cost", a: M(cl(), ON("lostB", "pOpp")), p: "pOpp" },
          { L: "Don't reject A blindly", a: M(cl(), OFF("att", "money", "pplB", "lostB"), ON("pCare", "c3", "c4", "c1", "c2"), { c1: { x: 0, y: 0, o: 1, s: 1 }, c2: { x: 0, y: 0, o: 1, s: 1 } }), p: "pCare" },
          { L: "Clean data helps both", dur: 1.3, a: M(cl(), { c3: { x: 149, y: -64 } }), e: "io", p: "c3" },
          { L: "Exception skills help B", dur: 1.3, a: M(cl(), { c4: { x: 149, y: -64 } }), e: "io", p: "c4" },
          { L: "Desk-only tech differs", a: M(cl(), { c1: { f: "#fde3d6" }, c2: { f: "#fde3d6" } }), fx: function (f) { f.kick("c1", 4, 0, 0); f.kick("c2", 4, 0, 0); }, p: ["c1", "c2"] },
          { L: "Prepare, don't lock in", dur: 1.3, a: M(cl(), ON("prepBin", "lockBin"), { c1: { y: 144 }, c2: { o: 0 } }), p: ["prepBin", "lockBin"] },
          { L: "Rules, contracts, systems", a: M(cl(), OFF("prepBin", "lockBin", "c1", "c2", "c3", "c4", "zA", "zB", "queue"), ON("gates", "g1"), { g2: { o: 1, w: 0.2 }, g3: { o: 1, w: 0.4 } }), p: "gates" },
          { L: "Unresolved means infeasible", a: M(cl(["g1", "g2", "g3"]), ON("pNF"), { mB: { o: 0.4 } }), fx: function (f) { f.kick("gates", 0, -3, 0); }, p: "pNF" },
          { L: "Suppose Qasr picks A", a: M(cl(), OFF("gates"), ON("pickA", "pRel"), { mB: { o: 1 } }), p: "pickA" },
          { L: "Defensible, if honest", a: M(cl(["pRel"]), ON("pQ"), { pAccA: { o: 1, w: 0.4 } }), p: "pAccA" },
          { L: "Or Qasr picks B", dur: 1.4, a: M(cl(), OFF("pickA"), ON("pickB", "pDeep")), p: "pickB" },
          { L: "Honest about B's risks", a: M(cl(["pDeep"]), ON("pWait", "prep"), { pDepF: { o: 1, w: 0.4 } }), p: "pDepF" },
          { L: "Every choice carries risk", a: M(cl(), ON("pickA", "pQ", "pWait", "pNoFree")), p: "pNoFree" },
          { L: "Evidence and readiness", dur: 1.3, a: M(cl(), OFF("pickA", "prep"), { pillarE: { o: 1, sy: 1 }, pillarR: { o: 1, sy: 1, w: 0.3 } }), e: "back", p: ["pillarE", "pillarR"] },
          { L: "Next: constraints", a: M(cl(), ON("pNext", "gates"), { pillarE: { o: 0.4 }, pillarR: { o: 0.4 } }), p: "pNext" }
        ];
      })()
    });
  })();
  addCSS("O2c", baseCSS("O2c", { bg: "#f2efe8", ink: K.ink, acc: K.orange, halo: "rgba(255,255,255,.88)" }));

  /* =====================================================================
     O3a  TECHNOLOGY THAT CHANGES THE PROCESS  (v2 - rebuilt, audit score 5/4)
     Seven literal panels:
       pA  Imagined vs operational journey; 82-min donut with the 8.1-min service slice
           benchmark: 128 Pie chart update (Observable) - arc tweens to a new share
       pB  Front desk: faster computer vs the revenue approval it cannot touch
           benchmark: 076 Workflow Animation (Dribbble) - trigger, transfer, notify
       pC  Shared booking record hub read by reception, revenue, housekeeping
           benchmark: 077 Workflow AI Animation (Dribbble) - data advances through stages
       pD  Rate-rule conveyor: agreed rates auto-approved, unusual ones to a person
           benchmark: 097 Business Solution conveyor (LottieFiles) - boxes, gear, control panel
       pE  Kiosk vs checks moved before arrival
           benchmark: 079 Product Workflow Animation (Dribbble) - shift between product states
       pF  Mobile access chain: ID verified + room ready + access system
           benchmark: 092 process connecting (LottieFiles) - draw and join connections
       pG  Workflow first, then technology
           benchmark: 080 Creative Design Workflow Animation (Dribbble) - sketch, then assemble
     ===================================================================== */
  (function () {
    var PANELS = ["pA", "pB", "pC", "pD", "pE", "pF", "pG"];
    function only(p) { var o = {}; PANELS.forEach(function (n) { o[n] = { o: n === p ? 1 : 0 }; }); return o; }
    function node(name, x, y, label, col) {
      return G(name, R(x - 56, y - 17, 112, 34, "#fff", 8, 'data-f="" stroke="' + col + '" stroke-width="2.5"') + T(x, y + 5, label, 15, K.ink, "middle", 'class="vw-n"'), x, y);
    }
    function arc(cx, cy, r, a0, a1) {
      var x0 = cx + r * Math.sin(a0), y0 = cy - r * Math.cos(a0), x1 = cx + r * Math.sin(a1), y1 = cy - r * Math.cos(a1);
      return "M" + r2(x0) + " " + r2(y0) + " A" + r + " " + r + " 0 " + (a1 - a0 > Math.PI ? 1 : 0) + " 1 " + r2(x1) + " " + r2(y1);
    }
    SC("O3a", {
      title: "Technology that changes the process", W: 400, H: 320, acc: K.plum,
      /* v3: booking cards ride the belt and stop at the gate's exit edge */
      B: { cards: [20, 150, 246, 222] },
      art: function () {
        var A = "", B = "", Cc = "", D = "", Ee = "", Ff = "", Gg = "";
        var svcA = 8.1 / 82 * Math.PI * 2;
        /* pA */
        A += G("sketch", P("M40 120 C120 70 260 70 360 120", K.slate, 3, 'stroke-dasharray="8 7"') + AT(40, 140, GUY(K.navy), 0.8) + DOORK(360, 146), 200, 110);
        A += G("gears", '<g class="vw-spin">' + GEAR(150, 176, 14, 8, K.plum, "#f4f1fa") + "</g>" + '<g class="vw-spin">' + GEAR(250, 176, 14, 8, K.plum, "#f4f1fa") + "</g>" + P("M164 176 H236", K.plum, 3), 200, 176);
        A += PILL("pImag", 200, 70, "Imagined journey", "#fff", K.slate, 15);
        A += PILL("pOper", 200, 216, "Made operational?", K.plum, "#fff", 15);
        A += G("old", AT(110, 270, R(-30, -14, 60, 28, "#b98b5e", 5) + SPEED(-34, -8, K.orange)), 110, 262);
        A += G("newW", P("M250 280 C280 240 320 240 350 270", K.green, 4) + F("M352 262 L356 276 L343 273Z", K.green), 300, 260);
        A += PILL("pFast", 110, 300, "Faster old step", "#fff", K.orange, 15);
        A += PILL("pNewW", 300, 300, "New way of work", K.green, "#fff", 15);
        A += G("donut", C(200, 170, 70, "none", 'stroke="#9aa7b8" stroke-width="26"') + P(arc(200, 170, 70, 0, svcA), "#3fae74", 26) + T(200, 165, "82 min", 22, K.ink, "middle", 'class="vw-n"') + T(200, 188, "journey", 15, K.slate, "middle", 'class="vw-n"'), 200, 170);
        A += PILL("pSvc", 316, 90, "8.1 min service", "#3fae74", "#fff", 15);
        A += PILL("pWaitA", 92, 272, "Rest of journey", "#9aa7b8", "#fff", 15);
        /* pB */
        B += G("desk", DESKK(110, 250), 110, 236);
        B += G("pc", R(126, 196, 34, 24, K.ink, 3) + R(130, 200, 26, 16, "#9fe3c0", 2) + R(138, 220, 10, 6, K.ink), 143, 210);
        B += G("pcShine", F("M168 190 l3 -8 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3Z", K.amber) + SPEED(100, 200, K.green), 140, 196);
        B += G("revB", OFFICE(300, 110, 120, 54, K.plum) + T(300, 124, "Revenue", 15, K.plum, "middle", 'class="vw-n"') + HOURG(352, 112), 300, 110);
        B += G("qB", [0, 1, 2].map(function (i) { return AT(30 + i * 18, 270, GUY(i % 2 ? K.orange : "#5b8fc4"), 0.7); }).join(""), 48, 258);
        B += G("linkB", P("M150 214 C200 180 230 150 250 132", K.plum, 3, 'stroke-dasharray="6 5"'), 200, 172) + G("linkBX", TAGX(206, 170), 206, 170);
        B += G("bookB", BOOK(300, 200, K.green) + TAGOK(318, 188), 300, 200);
        B += G("bcast", ARROW(280, 210, 160, 228, K.green, 3) + ARROW(320, 214, 350, 262, K.green, 3), 300, 236);
        B += G("hkB", AT(356, 300, GUY(K.plum), 0.8), 356, 290);
        B += PILL("pNewPC", 110, 140, "Faster computer", "#fff", K.ink, 15);
        B += PILL("pStill", 110, 140, "Approval still waits", K.red, "#fff", 15);
        B += PILL("pWhen", 110, 140, "Approve at booking", K.green, "#fff", 15);
        B += PILL("pStruct", 110, 140, "New process structure", K.plum, "#fff", 15);
        /* pC */
        Cc += G("spokes", P("M200 175 L90 95 M200 175 L310 95 M200 175 L200 280", K.plum, 4, 'class="vw-flow"'), 200, 185);
        Cc += G("hub", C(200, 175, 42, K.plum) + BOOK(200, 168, K.navy) + T(200, 202, "Record", 15, "#fff", "middle", 'class="vw-n"'), 200, 175);
        Cc += node("nRec", 90, 95, "Reception", K.green) + node("nRev", 310, 95, "Revenue", K.amber) + node("nHk", 200, 285, "Housekeeping", K.plum);
        Cc += PILL("askN", 90, 140, "Name again?", "#fff", K.red, 15) + PILL("askR", 310, 140, "Rate again?", "#fff", K.red, 15);
        Cc += G("strikeAsk", P("M42 140 H138 M262 140 H358", K.red, 3), 200, 140);
        Cc += G("reuse", TAGOK(150, 95) + TAGOK(370, 95) + TAGOK(262, 285), 260, 190);
        Cc += G("lockC", SHIELD(244, 150, 0.8, "#e9f3ee", K.green), 244, 150);
        Cc += PILL("pAcc", 92, 230, "Accurate, secure", K.green, "#fff", 15);
        Cc += PILL("pShared", 92, 230, "One shared record", K.plum, "#fff", 15);
        /* pD conveyor */
        D += R(20, 200, 360, 20, "#5b6878", 6) + P("M28 210 H372", "#c9d3df", 3, 'class="vw-flow"');
        D += G("cards", BOOK(60, 182) + BOOK(110, 182) + BOOK(160, 182), 110, 182);
        D += G("pileD", BOOK(300, 150) + BOOK(306, 140) + BOOK(312, 130) + HOURG(350, 136), 320, 140);
        D += G("revD", AT(300, 196, GUY(K.amber), 0.95), 300, 180);
        D += G("gate", R(196, 120, 50, 78, K.navy, 8) + '<g class="vw-spin">' + GEAR(221, 150, 14, 8, K.amber, K.navy) + "</g>", 221, 160);
        D += G("passed", BOOK(300, 182, K.green) + TAGOK(318, 170) + BOOK(352, 182, K.green) + TAGOK(370, 170), 330, 180);
        D += G("odd", BOOK(221, 260, K.orange) + T(221, 266, "?", 15, K.orange, "middle", 'class="vw-n"'), 221, 260);
        D += G("chute", P("M221 198 V236", K.orange, 3, 'stroke-dasharray="4 4"'), 221, 218);
        D += G("human", AT(290, 290, GUY(K.amber)) + R(266, 280, 48, 10, "#b98b5e", 3), 290, 276);
        D += PILL("pBot", 120, 96, "Approval bottleneck", K.red, "#fff", 15);
        D += PILL("pRule", 120, 96, "Agreed rate? Auto", K.green, "#fff", 15);
        D += PILL("pAuto", 120, 96, "No repeat decisions", K.navy, "#fff", 15);
        D += PILL("pHum", 110, 270, "Human review", K.orange, "#fff", 15);
        /* pE kiosk */
        Ee += G("kiosk", KIOSKK(200, 250), 200, 230) + G("kGuest", AT(240, 250, GUY(K.navy)), 240, 232);
        Ee += G("kList", R(150, 86, 100, 110, "#fff", 8, 'stroke="' + K.navy + '" stroke-width="2"') + T(200, 108, "Checks", 15, K.navy, "middle", 'class="vw-n"') +
          IDC(176, 130) + T(212, 135, "ID", 15, K.ink, "start") + T(176, 162, "%", 16, K.amber, "middle", 'class="vw-n"') + T(194, 162, "Rate", 15, K.ink, "start") + R(168, 174, 16, 10, K.green, 2) + T(194, 185, "Room", 15, K.ink, "start"), 200, 140);
        Ee += G("kPhone", PHONE(46, 120, 30, 54, K.ink, "#9fe3c0"), 61, 147);
        Ee += G("moved", ARROW(148, 140, 84, 140, K.green, 3.5), 116, 140);
        Ee += PILL("pKiosk", 200, 296, "Self-service kiosk", K.navy, "#fff", 15);
        Ee += PILL("pSame", 320, 140, "Same old checks", K.red, "#fff", 15);
        Ee += PILL("pBefore", 80, 210, "Before arrival", K.green, "#fff", 15);
        Ee += PILL("pPressure", 320, 200, "Less desk queue", "#fff", K.green, 15);
        /* pF access chain */
        Ff += G("fPhone", PHONE(20, 140, 34, 60, K.ink, "#9fe3c0"), 37, 170);
        Ff += node("lkId", 130, 110, "ID verified", K.navy) + node("lkRd", 130, 170, "Room ready", K.plum) + node("lkAc", 130, 230, "Access system", K.green);
        Ff += G("chainL", P("M56 170 C70 110 70 110 74 110 M56 170 H74 M56 170 C70 230 70 230 74 230 M186 110 C230 110 240 170 270 170 M186 170 H270 M186 230 C230 230 240 170 270 170", K.green, 3, 'class="vw-flow"'), 160, 170);
        Ff += G("fDoor", DOORK(310, 210), 310, 176) + G("fDoorOpen", R(292, 150, 36, 60, "#ffe9a8", 2), 310, 180);
        Ff += G("fGuest", AT(250, 240, GUY(K.navy)), 250, 222);
        Ff += G("keyX", AT(330, 270, C(-6, 0, 6, "none", 'stroke="' + K.amber + '" stroke-width="3"') + P("M0 0 H16 M12 0 V6", K.amber, 3)) + TAGX(360, 264), 340, 268);
        Ff += G("locks", [110, 170, 230].map(function (y) { return AT(196, y - 18, R(-6, -2, 12, 9, K.green, 2) + P("M-3.5 -2 V-5 Q-3.5 -9 0 -9 Q3.5 -9 3.5 -5 V-2", K.green, 1.8)); }).join(""), 196, 150);
        Ff += G("brkF", P("M186 170 H270", K.red, 5) + TAGX(228, 170), 228, 170);
        Ff += PILL("pMobile", 296, 72, "Mobile room access", K.green, "#fff", 15);
        Ff += PILL("pNoKey", 300, 300, "No key handover", "#fff", K.ink, 15);
        Ff += PILL("pSecure", 296, 72, "Secure connections", K.navy, "#fff", 15);
        Ff += PILL("pDeps", 300, 300, "Dependencies matter", K.red, "#fff", 15);
        /* pG */
        Gg += G("wf", node("", 80, 120, "Pre-check", K.navy) + node("", 200, 120, "Rate rule", K.amber) + node("", 320, 120, "Mobile key", K.green) + P("M136 120 H144 M256 120 H264", K.ink, 2.5), 200, 120);
        Gg += G("techs", PHONE(70, 160, 18, 30, K.ink, "#9fe3c0") + '<g>' + GEAR(200, 176, 12, 8, K.amber, "#fff") + "</g>" + R(310, 158, 20, 34, K.navy, 2), 200, 176);
        Gg += G("vWait", CLOCKK(80, 250, 20, K.green) + TAGOK(104, 232), 80, 250);
        Gg += G("vCtl", SHIELD(200, 250, 1.2, "#e9f3ee", K.green), 200, 250);
        Gg += G("vHelp", AT(320, 270, GUY(K.green)) + F("M320 216 c-5 -8 -15 -3 -10 4 l10 10 l10 -10 c5 -7 -5 -12 -10 -4Z", K.rose), 320, 250);
        Gg += PILL("pFirst", 200, 70, "Workflow first", K.navy, "#fff", 15);
        Gg += G("vLbl", T(80, 300, "Less waiting", 15, K.green) + T(200, 300, "Controls", 15, K.green) + T(320, 300, "Assistance", 15, K.green), 200, 296);
        Gg += G("realG", AT(200, 230, GUY(K.orange), 1.1) + R(212, 216, 16, 14, K.amber, 3) + T(214, 186, "?", 22, K.orange, "middle", 'class="vw-n"'), 205, 210);
        Gg += PILL("pReal", 200, 290, "Next: real conditions", K.orange, "#fff", 15);
        return R(-1400, -1400, 3200, 3200, "#f3f1f8") + G("pA", A, 200, 180) + G("pB", B, 200, 180) + G("pC", Cc, 200, 180) + G("pD", D, 200, 180) + G("pE", Ee, 200, 180) + G("pF", Ff, 200, 180) + G("pG", Gg, 200, 180);
      },
      init: M(only("pA"), HID(["gears", "pOper", "old", "newW", "pFast", "pNewW", "donut", "pSvc", "pWaitA", "pcShine", "linkB", "linkBX", "bookB", "bcast", "hkB", "pNewPC", "pStill", "pWhen", "pStruct",
        "askN", "askR", "strikeAsk", "reuse", "lockC", "pAcc", "pShared", "gate", "passed", "odd", "chute", "human", "pBot", "pRule", "pAuto", "pHum", "kList", "kPhone", "moved", "pKiosk", "pSame", "pBefore", "pPressure",
        "keyX", "locks", "brkF", "pMobile", "pNoKey", "pSecure", "pDeps", "fDoorOpen", "techs", "vWait", "vCtl", "vHelp", "realG", "pReal", "vLbl"]),
        { sketch: { o: 1 }, pImag: { o: 0 }, donut: { s: 0.6 }, spokes: { o: 0 }, hub: { s: 0.3, o: 0 }, nRec: { o: 0 }, nRev: { o: 0 }, nHk: { o: 0 }, cards: { x: 0 }, pileD: { o: 1 }, revD: { o: 1 },
          fGuest: { x: 0 }, wf: { o: 0 }, kGuest: { o: 0 }, pc: { o: 0 }, chainL: { o: 0 }, lkId: { o: 0 }, lkRd: { o: 0 }, lkAc: { o: 0 }, revB: { o: 1 }, qB: { o: 1 }, desk: { o: 1 } }),
      K: [
        { L: "A technology question", a: { pImag: { o: 1 } }, p: "sketch" },
        { L: "Imagined vs operational", a: M(ON("gears", "pOper")), p: "gears" },
        { L: "Change the work itself", a: M(OFF("sketch", "gears", "pImag", "pOper"), ON("old", "pFast"), { newW: { o: 1, w: 0.5 }, pNewW: { o: 1, w: 0.6 } }), p: "newW" },
        { L: "82 min, only 8.1 service", dur: 1.3, a: M(OFF("old", "newW", "pFast", "pNewW"), { donut: { o: 1, s: 1 }, pSvc: { o: 1, w: 0.6 } }), e: "back", p: "pSvc" },
        { L: "Waiting is the opportunity", a: M(ON("pWaitA"), { donut: { s: 1.05 } }), p: "pWaitA" },
        { L: "A faster computer?", a: M(only("pB"), ON("pc", "pcShine", "pNewPC")), e: "back", p: "pc" },
        { L: "Approval still waits", a: M(OFF("pcShine", "pNewPC"), ON("linkB", "linkBX", "pStill")), fx: function (f) { f.kick("revB", 0, -3, 0); }, p: "linkBX" },
        { L: "Change when it happens", dur: 1.3, a: M(OFF("pStill", "linkBX", "linkB", "qB"), ON("bookB", "pWhen", "hkB"), { bcast: { o: 1, w: 0.6 } }), p: "bookB" },
        { L: "A new process structure", a: M(OFF("pWhen"), ON("pStruct"), { pc: { o: 0.3 }, revB: { o: 0.4 } }), p: "bcast" },
        { L: "One shared record", dur: 1.3, a: M(only("pC"), ON("pShared"), { hub: { o: 1, s: 1 }, spokes: { o: 1, w: 0.4 }, nRec: { o: 1, w: 0.5 }, nRev: { o: 1, w: 0.6 }, nHk: { o: 1, w: 0.7 } }), e: "back", p: "hub" },
        { L: "No repeated requests", dur: 1.2, a: M(OFF("pShared"), ON("askN", "askR"), { strikeAsk: { o: 1, w: 0.5 }, reuse: { o: 1, w: 0.8 } }), p: "reuse" },
        { L: "Accurate and secure", a: M(OFF("askN", "askR", "strikeAsk"), ON("lockC", "pAcc")), e: "back", p: "lockC" },
        { L: "The rate approval delay", a: M(only("pD"), ON("pBot")), fx: function (f) { f.kick("pileD", 0, -3, 0); }, p: "pileD" },
        { L: "An automated rule", dur: 1.6, a: M(OFF("pBot", "pileD"), ON("gate", "pRule"), { cards: { x: 60 }, passed: { o: 1, w: 0.9 } }), p: "gate" },
        { L: "Automation, defined", a: M(OFF("pRule"), ON("pAuto"), { revD: { o: 0.3 } }), p: "gate" },
        { L: "Unusual: human review", dur: 1.3, a: M(OFF("pAuto"), ON("chute", "human", "pHum"), { odd: { o: 1, w: 0.4 } }), p: "odd" },
        { L: "A self-service kiosk", a: M(only("pE"), ON("pKiosk", "pPressure"), { kGuest: { o: 1 } }), e: "back", p: "kiosk" },
        { L: "Kiosk alone keeps checks", a: M(OFF("pPressure"), ON("kList", "pSame")), fx: function (f) { f.kick("kList", 3, 0, 0); }, p: "pSame" },
        { L: "Check before arrival", dur: 1.3, a: M(OFF("pSame"), ON("kPhone", "moved", "pBefore"), { kList: { o: 0.4 } }), p: "kPhone" },
        { L: "Verified, ready, access", dur: 1.4, a: M(only("pF"), ON("pMobile"), { lkId: { o: 1 }, lkRd: { o: 1, w: 0.2 }, chainL: { o: 1, w: 0.4 }, fDoorOpen: { o: 1, w: 0.9 } }), p: "fDoor" },
        { L: "No key at reception", dur: 1.4, a: M(ON("keyX", "pNoKey"), { fGuest: { x: 50 } }), p: "keyX" },
        { L: "Connect securely", a: M(OFF("pMobile", "keyX", "pNoKey"), ON("lkAc", "locks", "pSecure")), p: "locks" },
        { L: "One link fails", a: M(OFF("pSecure", "fDoorOpen"), ON("brkF", "pDeps"), { fGuest: { x: 0 } }), fx: function (f) { f.kick("fDoor", 3, 0, 0); }, p: "brkF" },
        { L: "Workflow before tech", dur: 1.4, a: M(only("pG"), ON("pFirst"), { wf: { o: 1 }, techs: { o: 1, w: 0.7 } }), p: "wf" },
        { L: "Wait less, keep controls", a: M({ vLbl: { o: 1 }, vWait: { o: 1 }, vCtl: { o: 1, w: 0.2 }, vHelp: { o: 1, w: 0.4 }, techs: { o: 0.4 } }), p: ["vWait", "vCtl", "vHelp"] },
        { L: "Next: real conditions", a: M(OFF("vWait", "vCtl", "vHelp", "pFirst", "vLbl"), ON("realG", "pReal"), { wf: { o: 0.4 }, techs: { o: 0.2 } }), e: "back", p: "realG" }
      ]
    });
  })();
  addCSS("O3a", baseCSS("O3a", { bg: "#f3f1f8", ink: K.ink, acc: K.plum, halo: "rgba(255,255,255,.9)" }));

  /* =====================================================================
     O3b  CONSTRAINTS AND EXCEPTIONS  (v2 - rebuilt, audit score 5/4)
     A four-lane swimlane of the PROPOSED arrival (Guest, Systems, Reception, Rooms):
       swimlane + gateway  digital ID check branches to a staffed manual review
           benchmark: 089 Git Workflow (LottieFiles) - branch, merge, reconnect
       token runs  happy path, stuck exception, fallback route, early-access failure
           benchmark: 111 Hierarchy traversal animated (Observable) - visit node after node
       assistance callout  26% need help: access needs, language, complex bookings
           benchmark: 125 Infographics Dashboard (LottieFiles) - proportion grows, then explained
       constraint badges  rules, contracts, skills, 14-month coordination dropped INTO the design
           benchmark: 083 The Process Architectural Motion (Behance) - layers added to a structure
     ===================================================================== */
  (function () {
    var LY = [81, 141, 201, 261], PX = 170;
    function task(name, cx, cy, w, label, col, fill) {
      return G(name, R(cx - w / 2, cy - 15, w, 30, fill || "#fff", 7, 'data-f="" stroke="' + col + '" stroke-width="2.5"') + T(cx, cy + 5, label, 15, K.ink, "middle", 'class="vw-n"'), cx, cy);
    }
    /* v3: every token path runs only along the drawn connectors: start > pre-check > ID gateway > mobile key > room door.
       hp ends at the door; xp detours along the red exception edge to Manual ID, then up the green edge to the key;
       ep (readiness sync broken) stops 18 units short of the door - access is refused, the guest never enters. */
    var HP = "M112 81 H170 V141 H330 C360 141 370 120 370 100";
    var XP = "M112 81 H170 V141 V163 C170 192 180 201 190 201 H240 H252 V141 H330 C360 141 370 120 370 100";
    var EP = "M112 81 H170 V141 H330 C360 141 370 125 370 112";
    var U_GW = 0.2608, U_MAN = 0.5251;
    SC("O3b", {
      title: "Constraints and exceptions", W: 400, H: 320, acc: K.orange,
      B: { tk: [8, 52, 392, 290], tx: [8, 52, 392, 290], te: [8, 52, 392, 290], hkp: [8, 232, 392, 300], redQ: [98, 112, 230, 170] },
      art: function () {
        var s = R(-1400, -1400, 3200, 3200, "#f1f4f2");
        var names = ["Guest", "Systems", "Reception", "Rooms"], fills = ["#fbf3e4", "#eef1f8", "#e9f4ee", "#f5eef8"];
        s += G("lanes", names.map(function (n, i) {
          var y = 52 + i * 60;
          return R(8, y, 384, 58, fills[i], 6) + R(8, y, 90, 58, "rgba(20,35,58,.06)", 6) + T(14, y + 34, n, 15, K.ink, "start");
        }).join(""), 200, 170);
        /* edges */
        s += G("e1", C(112, 81, 10, "#fff", 'stroke="' + K.navy + '" stroke-width="2.5"') + P("M122 81 H124", K.navy, 2.5) + P("M" + PX + " 96 V119", K.navy, 2.5) + P("M192 141 H230", K.navy, 2.5) + P("M330 141 C360 141 370 120 370 100", K.navy, 2.5), 250, 120);
        s += G("eX", P("M170 163 C170 192 180 201 190 201", K.red, 3, 'stroke-dasharray="6 5"'), 180, 185);
        s += G("eM", P("M252 201 V156", K.green, 3) + P("M240 201 H252", K.green, 3), 252, 172);
        s += G("eA", P("M112 92 V186", K.plum, 3, 'stroke-dasharray="5 5"'), 112, 140);
        s += G("fbHi", P("M170 163 C170 192 180 201 190 201 H252 V141", "#3fae74", 8, 'opacity=".35"'), 220, 180);
        s += '<path data-id="hp" d="' + HP + '" fill="none" stroke="none"/><path data-id="xp" d="' + XP + '" fill="none" stroke="none"/><path data-id="ep" d="' + EP + '" fill="none" stroke="none"/>';
        /* nodes */
        s += task("pre", PX, 81, 92, "Pre-check", K.navy);
        s += G("gw", F("M" + PX + " 119 L192 141 L" + PX + " 163 L148 141Z", "#fff", 'data-f="" stroke="' + K.navy + '" stroke-width="2.5"') + T(PX, 146, "ID?", 15, K.navy, "middle", 'class="vw-n"'), PX, 141);
        s += task("key", 280, 141, 100, "Mobile key", K.navy);
        s += G("room", R(358, 56, 26, 38, K.navy, 2) + C(377, 76, 1.8, "#ffd479"), 371, 75);
        s += G("roomOk", TAGOK(352, 62), 352, 62);
        s += task("manual", 240, 201, 100, "Manual ID", K.green);
        s += task("assist", 140, 201, 70, "Assist", K.plum);
        s += task("ready", 340, 261, 100, "Room ready", K.plum);
        s += G("roomsApp", R(118, 248, 100, 26, "#fff", 6, 'stroke="' + K.plum + '" stroke-width="2"') + T(168, 266, "Rooms app", 15, K.plum, "middle", 'class="vw-n"') + R(104, 254, 10, 14, K.ink, 2), 168, 261);
        s += G("sync", P("M330 246 C330 210 322 180 322 158", K.plum, 3, 'class="vw-flow"'), 326, 200);
        s += G("syncX", TAGX(328, 208), 328, 208);
        s += G("notRdy", R(346, 60, 30, 30, "rgba(217,74,58,.25)", 3) + TAGX(380, 62), 368, 70);
        s += G("hkp", AT(232, 290, GUY(K.plum), 0.75) + PHONE(242, 262, 10, 16, K.ink, "#d8c8ef"), 236, 276);
        s += G("sup", AT(330, 230, GUY(K.green), 0.9), 330, 214);
        s += G("supQ", R(342, 172, 36, 26, "#fff", 8, 'stroke="' + K.green + '" stroke-width="2"') + T(360, 190, "?", 16, K.green, "middle", 'class="vw-n"'), 360, 185);
        s += G("owner", C(292, 188, 9, K.green) + C(292, 186, 3, "#fff"), 292, 188);
        s += G("shield", SHIELD(198, 120, 0.7, "#e9f3ee", K.green), 198, 120);
        s += G("loop", '<g class="vw-spin">' + P("M" + (PX + 26) + " 141 a14 14 0 1 1 -4 -10", K.red, 3) + "</g>", PX + 18, 133);
        s += G("idBad", IDC(126, 128, K.red) + T(126, 112, "?", 15, K.red, "middle", 'class="vw-n"'), 126, 124);
        s += G("redQ", [0, 1, 2, 3].map(function (i) { return C(118 + i * 13, 160, 6, K.red); }).join(""), 137, 160);
        s += G("tired", AT(120, 108, GUY("#5b8fc4"), 0.7) + R(128, 96, 10, 12, K.amber, 2), 124, 96);
        /* assistance callout */
        s += G("assistCard", R(196, 54, 192, 112, "#fff", 10, 'stroke="' + K.plum + '" stroke-width="2.5"') +
          AT(214, 78, C(0, -6, 4, K.plum) + P("M0 -2 V5 M-5 1 H5", K.plum, 2) + C(0, 12, 5, "none", 'stroke="' + K.plum + '" stroke-width="2"')) + T(232, 84, "Access needs", 15, K.ink, "start") +
          AT(214, 110, R(-9, -8, 18, 14, K.plum, 4) + F("M-5 6 l-2 6 l7 -6Z", K.plum)) + T(232, 115, "Language", 15, K.ink, "start") +
          AT(214, 142, R(-7, -9, 14, 18, "#fff", 2, 'stroke="' + K.plum + '" stroke-width="2"') + R(-3, -12, 14, 18, "#fff", 2, 'stroke="' + K.plum + '" stroke-width="2"')) + T(232, 147, "Complex booking", 15, K.ink, "start"), 292, 110);
        s += G("share", R(220, 66, 130, 30, "#eef1f5", 6) + G("share74", R(220, 66, 96.2, 30, "#5b8fc4", 6), 220, 81) + G("share26", R(316.2, 66, 33.8, 30, K.orange, 6) + T(333, 86, "26%", 12, "#fff", "middle", 'class="vw-n"'), 350, 81) + T(285, 107, "share of all guests", 11, K.slate), 285, 81);
        s += G("heart", F("M140 176 c-5 -8 -15 -3 -10 4 l10 10 l10 -10 c5 -7 -5 -12 -10 -4Z", K.rose), 140, 182);
        /* constraints */
        s += G("rule", R(130, 105, 80, 72, "none", 8, 'stroke="' + K.red + '" stroke-width="2.5" stroke-dasharray="6 4"') + AT(214, 176, R(-10, -8, 20, 16, "#fff", 2, 'stroke="' + K.red + '" stroke-width="2"') + P("M0 -8 V8", K.red, 1.5)), 170, 141);
        s += G("contract", AT(214, 118, R(-12, -15, 24, 30, "#fff", 3, 'stroke="' + K.amber + '" stroke-width="2.5"') + P("M-6 -7 H6 M-6 -1 H6 M-6 5 H2", K.amber, 2)) + P("M226 118 H232", K.amber, 2.5, 'stroke-dasharray="3 3"'), 214, 118);
        s += G("cLinks", P("M214 133 C214 150 240 170 250 186 M226 118 C240 112 250 120 260 126 M214 133 C200 160 160 180 150 186", K.amber, 2.5, 'stroke-dasharray="4 4"'), 210, 156);
        s += G("supSkill", AT(330, 194, F("M-14 0 L0 -7 L14 0 L0 7Z", K.navy) + P("M8 3 V11", K.navy, 2)), 330, 192);
        s += G("supKey", AT(352, 206, C(-4, 0, 4, "none", 'stroke="' + K.amber + '" stroke-width="2.4"') + P("M0 0 H10 M7 0 V4", K.amber, 2.4)), 356, 206);
        s += G("routine", [0, 1, 2].map(function (i) { return R(104 + i * 14, 176 - i * 3, 12, 16, "#fff", 2, 'stroke="#9aa7b8" stroke-width="1.5"'); }).join(""), 122, 184);
        s += G("complexC", R(146, 179, 30, 22, "#fde3d6", 4, 'stroke="' + K.orange + '" stroke-width="2"') + T(161, 195, "!", 15, K.orange, "middle", 'class="vw-n"'), 161, 190);
                /* v3: the delivery bar has a month scale: 288 units = 14 months (20.6 per month) */
        var ct = ""; for (var m = 0; m <= 14; m++) ct += P("M" + r2(104 + m * 288 / 14) + " 27 V" + (m % 7 === 0 ? 22 : 25), K.slate, 1.5);
        s += G("cal", R(104, 30, 288, 16, "#eef1f5", 8) + G("calF", R(104, 30, 288, 16, K.navy, 8), 104, 38) + ct + T(104, 18, "0", 11, K.slate, "start") + T(248, 18, "7", 11, K.slate) + T(392, 18, "14 months", 11, K.slate, "end"), 248, 38);
        s += G("calBrace", P("M100 54 Q94 54 94 64 V282 Q94 292 100 292", K.navy, 3), 96, 170);
        s += G("calX", TAGX(180, 38), 180, 38);
        s += G("stamp", AT(180, 236, R(-56, -15, 112, 30, "rgba(255,255,255,.85)", 6, 'stroke="' + K.slate + '" stroke-width="2.5"') + T(0, 6, "Approval", 16, K.slate, "middle", 'class="vw-n"'), 1, -6), 180, 236);
        s += G("testI", AT(250, 236, R(-14, -18, 28, 36, "#fff", 4, 'stroke="' + K.navy + '" stroke-width="2.5"') + R(-6, -22, 12, 7, K.navy, 2) + CHECK(0, -4, K.green, 2.6) + CHECK(0, 8, K.green, 2.6)), 250, 236);
        /* tokens */
        s += G("tk", C(112, 81, 9, K.navy) + C(109, 79, 1.6, "#fff") + C(115, 79, 1.6, "#fff"), 112, 81, 'data-path="hp"');
        s += G("tx", C(112, 81, 9, K.orange) + C(109, 79, 1.6, "#fff") + C(115, 79, 1.6, "#fff"), 112, 81, 'data-path="xp"');
        s += G("te", C(112, 81, 9, K.red) + C(109, 79, 1.6, "#fff") + C(115, 79, 1.6, "#fff"), 112, 81, 'data-path="ep"');
        /* bottom pills */
        var B = [["pDemo", "Demo looks great", K.navy], ["pNoWait", "No waiting", K.green], ["pExc", "An exception", K.red], ["pDaily", "Happens daily", K.red], ["pTrap", "Don't trap guests", K.red],
          ["pOwn", "Reception owns it", K.green], ["pFb", "Fallback route", K.green], ["pHelp", "Help, by design", K.plum], ["p26", "26% need help", K.orange], ["pHuman", "Human route stays", K.plum],
          ["pTwo", "Two separate apps", K.plum], ["pEarly", "Access too early", K.red], ["pFail", "Service failure", K.red], ["pReg", "Mandatory checks", K.red], ["pRules", "Rules limit redesign", K.red],
          ["pCon", "Contracts bind", K.amber], ["pCheck", "Examine early", K.amber], ["pSkill", "New skills needed", K.navy], ["pShift", "Less routine, more cases", K.navy], ["pTrain", "Training and authority", K.navy],
          ["p14", "14 months, all teams", K.navy], ["pNoDl", "No wishful deadline", K.red], ["pDesign", "Shape the design", K.ink], ["pBuilt", "Built into workflow", K.green], ["pRemain", "Exceptions remain", K.orange], ["pTest", "Next: testing", K.navy]];
        B.forEach(function (b) { s += PILL(b[0], 248, 305, b[1], b[2], "#fff", 15); });
        return s;
      },
      init: M(HID(["eX", "eM", "eA", "fbHi", "roomOk", "manual", "assist", "ready", "roomsApp", "sync", "syncX", "notRdy", "hkp", "sup", "supQ", "owner", "shield", "loop", "idBad", "redQ", "tired", "assistCard", "share", "heart", "rule", "contract", "cLinks",
        "supSkill", "supKey", "routine", "complexC", "cal", "calBrace", "calX", "stamp", "testI", "tx", "te",
        "pDemo", "pNoWait", "pExc", "pDaily", "pTrap", "pOwn", "pFb", "pHelp", "p26", "pHuman", "pTwo", "pEarly", "pFail", "pReg", "pRules", "pCon", "pCheck", "pSkill", "pShift", "pTrain", "p14", "pNoDl", "pDesign", "pBuilt", "pRemain", "pTest"]),
        { lanes: { o: 0 }, pre: { o: 0, f: "#fff" }, gw: { o: 0, f: "#fff" }, key: { o: 0, f: "#fff" }, room: { o: 0 }, e1: { o: 0 }, tk: { o: 0, u: 0 }, tx: { u: 0 }, te: { u: 0 },
          share74: { sx: 0.02 }, share26: { sx: 0.02 }, calF: { sx: 0.05 }, stamp: { o: 0, s: 1.4 }, ready: { f: "#fff" }, routine: { o: 0, x: 0 } }),
      K: (function () {
        var PL = ["pDemo", "pNoWait", "pExc", "pDaily", "pTrap", "pOwn", "pFb", "pHelp", "p26", "pHuman", "pTwo", "pEarly", "pFail", "pReg", "pRules", "pCon", "pCheck", "pSkill", "pShift", "pTrain", "p14", "pNoDl", "pDesign", "pBuilt", "pRemain", "pTest"];
        function pl(n) { var o = {}; PL.forEach(function (k) { o[k] = { o: k === n ? 1 : 0 }; }); return o; }
        return [
          { L: "The digital demo", dur: 1.3, a: M(pl("pDemo"), { lanes: { o: 1 }, pre: { o: 1, w: 0.2 }, gw: { o: 1, w: 0.35 }, key: { o: 1, w: 0.5 }, room: { o: 1, w: 0.65 }, e1: { o: 1, w: 0.8 } }), p: "lanes" },
          { L: "Checks done, no wait", dur: 2, a: M(pl("pNoWait"), { tk: { o: 1, u: 1 }, roomOk: { o: 1, w: 1.6 } }), e: "io", p: "roomOk" },
          { L: "What if ID fails?", a: M(pl(), ON("sup", "supQ"), { tk: { o: 0 } }), e: "back", p: "supQ" },
          { L: "An exception", a: M(pl("pExc"), ON("eX"), { gw: { f: "#fde3d6" }, roomOk: { o: 0 } }), p: "gw" },
          { L: "Exceptions happen daily", a: M(pl("pDaily"), ON("redQ")), fx: function (f) { f.kick("redQ", 3, 0, 0); }, p: "redQ" },
          { L: "Unrecognised document", dur: 1.4, a: M(pl(), OFF("redQ", "supQ"), ON("tired", "idBad"), { tx: { o: 1, u: U_GW } }), p: "idBad" },
          { L: "Don't trap the guest", a: M(pl("pTrap"), ON("loop")), fx: function (f) { f.kick("tx", 3, 0, 0); }, p: "loop" },
          { L: "Reception resolves it", dur: 1.3, a: M(pl("pOwn"), OFF("loop", "tired"), ON("manual", "owner", "shield", "eM"), { tx: { u: U_MAN } }), p: "manual" },
          { L: "The fallback route", dur: 1.8, a: M(pl("pFb"), OFF("idBad"), ON("fbHi"), { tx: { u: 1 }, roomOk: { o: 1, w: 1.5 } }), p: "fbHi" },
          { L: "Some guests want help", a: M(pl("pHelp"), OFF("fbHi", "tx", "roomOk", "sup"), ON("assist", "eA")), p: "assist" },
          { L: "26% need assistance", dur: 1.3, a: M(pl("p26"), ON("share"), { share74: { sx: 1 }, share26: { sx: 1, w: 0.5 } }), e: "out", p: "share26" },
          { L: "Many kinds of need", a: M(pl(), OFF("share", "key", "room", "e1"), ON("assistCard")), p: "assistCard" },
          { L: "Keep a human route", a: M(pl("pHuman"), OFF("assistCard"), ON("heart", "key", "room", "e1")), e: "back", p: "heart" },
          { L: "Departments, own systems", a: M(pl(), OFF("heart", "assist", "eA", "manual", "eM", "eX", "owner", "shield"), ON("ready", "roomsApp"), { gw: { f: "#fff" } }), p: "roomsApp" },
          { L: "Two separate apps", a: M(pl("pTwo"), ON("hkp"), { ready: { f: "#efe1f7" } }), fx: function (f) { f.kick("hkp", 0, -3, 0); }, p: "ready" },
          { L: "Access before ready", dur: 1.8, a: M(pl("pEarly"), ON("sync", "syncX"), { ready: { f: "#fde3d6" }, te: { o: 1, u: 1 }, notRdy: { o: 1, w: 1.4 } }), p: "syncX" },
          { L: "A service failure", a: M(pl("pFail")), fx: function (f) { f.kick("te", 0, 4, 0); f.burstOn("notRdy", K.red); }, p: "notRdy" },
          { L: "Regulation applies", a: M(pl("pReg"), OFF("te", "notRdy", "syncX", "hkp", "roomsApp"), ON("shield"), { ready: { f: "#fff" } }), p: "shield" },
          { L: "Rules limit redesign", a: M(pl("pRules"), ON("rule")), p: "rule" },
          { L: "Contracts matter", a: M(pl("pCon"), OFF("rule"), ON("contract")), e: "back", p: "contract" },
          { L: "Check contracts early", a: M(pl("pCheck"), ON("cLinks", "manual", "assist")), p: "cLinks" },
          { L: "New skills needed", a: M(pl("pSkill"), OFF("cLinks", "contract"), ON("sup", "supQ")), p: "sup" },
          { L: "Less routine work", dur: 1.3, a: M(pl("pShift"), OFF("supQ", "assist", "eA"), { routine: { o: 0.35 }, complexC: { o: 1, w: 0.6 } }), p: "complexC" },
          { L: "Training and authority", a: M(pl("pTrain"), OFF("routine", "complexC"), ON("supSkill", "supKey", "assist")), e: "back", p: ["supSkill", "supKey"] },
          { L: "14 months of coordination", dur: 1.4, a: M(pl("p14"), ON("cal", "calBrace"), { calF: { sx: 1 } }), p: "cal" },
          { L: "No wishful deadlines", a: M(pl("pNoDl"), ON("calX"), { calF: { sx: 0.3 } }), fx: function (f) { f.kick("calX", 3, 0, 0); }, p: "calX" },
          { L: "Constraints shape design", dur: 1.3, a: M(pl("pDesign"), OFF("calX", "calBrace"), ON("rule", "contract", "stamp"), { calF: { sx: 1 }, stamp: { o: 0.45, s: 1 }, tx: { u: 0 } }), p: ["rule", "contract"] },
          { L: "Built into the workflow", a: M(pl("pBuilt"), OFF("stamp", "cal"), ON("eX", "eM", "owner", "eA", "sync", "fbHi")), p: "fbHi" },
          { L: "Exceptions won't vanish", dur: 2, a: M(pl("pRemain"), { tx: { o: 1, u: 1 } }), fx: function (f) { f.kick("redQ", 3, 0, 0); }, p: "manual" },
          { L: "Next: test it", a: M(pl("pTest"), OFF("rule", "contract", "supSkill", "supKey", "sup"), ON("testI"), { tx: { o: 0 } }), e: "back", p: "testI" }
        ];
      })()
    });
  })();
  addCSS("O3b", baseCSS("O3b", { bg: "#f1f4f2", ink: K.ink, acc: K.orange, halo: "rgba(255,255,255,.9)" }));

})();
// END FILE

// FILE: w09-claude-v3-part3.js
// OPER621 Week 9 (The Innovate Phase) - animated teaching scenes v3, part 3 of 3: O3c, O2d, O2e.
// v2 rebuild after the content audit: every narration line shows the literal Qasr Marina activity it describes.
// Each visual is annotated with the benchmark template it adapts (motion grammar only; all artwork is original).
// Standalone: registers its scenes in window.VL_SCENES and appends scoped rules to <style id="vl-sc-w09">.
// Parts may be concatenated in any order. Contract per scene: build(el), step(i, n), reset().
(function () {
  "use strict";
  var W = window;
  window.VL_SCENES = window.VL_SCENES || {};
  var SVGNS = "http://www.w3.org/2000/svg";

  /* ---------- generic helpers ---------- */
  function RM() {
    try { return !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    catch (e) { return false; }
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function r2(v) { return Math.round(v * 100) / 100; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  var EASE = {
    io: function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; },
    out: function (t) { return 1 - Math.pow(1 - t, 3); },
    back: function (t) { var c = 1.6, d = c + 1; return 1 + d * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },
    lin: function (t) { return t; }
  };
  var GEASE = { io: "power3.inOut", out: "power3.out", back: "back.out(1.6)", lin: "none" };

  /* ---------- SVG string builders ---------- */
  function R(x, y, w, h, f, rx, ex) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx || 0) + '" fill="' + f + '"' + (ex ? " " + ex : "") + "/>";
  }
  function C(x, y, r, f, ex) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + f + '"' + (ex ? " " + ex : "") + "/>";
  }
  function E(x, y, rx, ry, f, ex) {
    return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" fill="' + f + '"' + (ex ? " " + ex : "") + "/>";
  }
  function P(d, st, w, ex) {
    return '<path d="' + d + '" fill="none" stroke="' + st + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + (ex ? " " + ex : "") + "/>";
  }
  function F(d, f, ex) {
    return '<path d="' + d + '" fill="' + f + '"' + (ex ? " " + ex : "") + "/>";
  }
  function T(x, y, s, sz, f, anc, ex) {
    var cls = "vw-t";
    if (ex && ex.indexOf('class="vw-n"') >= 0) { cls = "vw-t vw-n"; ex = ex.replace('class="vw-n"', ""); }
    return '<text class="' + cls + '" x="' + x + '" y="' + y + '" font-size="' + (sz || 15) + '" fill="' + (f || "#14233a") + '" text-anchor="' + (anc || "middle") + '"' + (ex ? " " + ex : "") + ">" + esc(s) + "</text>";
  }
  function G(name, body, px, py, ex) {
    return "<g" + (name ? ' data-a="' + name + '"' : "") + (px !== undefined ? ' data-p="' + px + " " + py + '"' : "") + (ex ? " " + ex : "") + ">" + body + "</g>";
  }
  function AT(x, y, body, s, r) {
    return '<g transform="translate(' + x + " " + y + ")" + (r ? " rotate(" + r + ")" : "") + (s && s !== 1 ? " scale(" + s + ")" : "") + '">' + body + "</g>";
  }
  function textW(s, sz) { return Math.round(String(s).length * sz * 0.6 + 24); }
  function PILL(name, x, y, s, bg, fg, sz, ex) {
    sz = sz || 15;
    var w = textW(s, sz), h = Math.round(sz + 13);
    return G(name, R(x - w / 2, y - h / 2, w, h, bg, h / 2, ex) +
      '<text class="vw-t vw-n" x="' + x + '" y="' + r2(y + sz * 0.36) + '" font-size="' + sz + '" fill="' + fg + '" text-anchor="middle">' + esc(s) + "</text>", x, y);
  }
  /* a small friendly character, feet at origin, about 36 units tall */
  function GUY(body, skin, eyes) {
    skin = skin || "#f1c9a5";
    return F("M-10 0 Q-11 -18 0 -18 Q11 -18 10 0 Z", body) +
      C(0, -27, 9, skin) +
      (eyes === false ? "" : C(-3, -28, 1.5, "#14233a") + C(3, -28, 1.5, "#14233a") + P("M-2.5 -23.5 Q0 -22 2.5 -23.5", "#14233a", 1.1));
  }
  function SHIELD(cx, cy, s, fill, line) {
    return AT(cx, cy, F("M0 -16 L13 -11 V0 Q13 11 0 17 Q-13 11 -13 0 V-11 Z", fill, 'stroke="' + line + '" stroke-width="2.5"') +
      P("M-6 0 L-1.5 5 L7 -5", line, 3), s);
  }
  function CHECK(x, y, col, w) { return P("M" + (x - 7) + " " + y + " l5 5 l10 -11", col, w || 3.5); }
  function CROSS(x, y, col, w, r) { r = r || 7; return P("M" + (x - r) + " " + (y - r) + " L" + (x + r) + " " + (y + r) + " M" + (x + r) + " " + (y - r) + " L" + (x - r) + " " + (y + r), col, w || 3.5); }
  function GEAR(cx, cy, r, teeth, fill, hole) {
    var s = "", i, a;
    for (i = 0; i < teeth; i++) {
      a = i * 360 / teeth;
      s += '<rect x="' + r2(cx - r * 0.16) + '" y="' + r2(cy - r - r * 0.28) + '" width="' + r2(r * 0.32) + '" height="' + r2(r * 0.5) + '" rx="' + r2(r * 0.06) + '" fill="' + fill + '" transform="rotate(' + r2(a) + " " + cx + " " + cy + ')"/>';
    }
    return s + C(cx, cy, r, fill) + C(cx, cy, r * 0.38, hole);
  }
  function PHONE(x, y, w, h, body, screen) {
    return R(x, y, w, h, body, w * 0.18) + R(x + w * 0.1, y + h * 0.1, w * 0.8, h * 0.74, screen, w * 0.08) + C(x + w / 2, y + h * 0.92, w * 0.06, screen);
  }

  /* ---------- stylesheet: one <style id="vl-sc-w09">, rules appended per part ---------- */
  function addCSS(key, css) {
    var st = document.getElementById("vl-sc-w09");
    if (!st) { st = document.createElement("style"); st.id = "vl-sc-w09"; (document.head || document.documentElement).appendChild(st); }
    if (st.getAttribute("data-" + key)) return;
    st.setAttribute("data-" + key, "1");
    st.appendChild(document.createTextNode(css));
  }
  function baseCSS(id, o) {
    var S = ".vls-w09-" + id;
    return [
      S + "{position:relative;width:100%;height:100%;min-height:230px;display:flex;flex-direction:column;overflow:hidden;border-radius:14px;background:" + o.bg + ";color:" + o.ink + ";font-family:inherit;box-sizing:border-box;isolation:isolate}",
      S + " *{box-sizing:border-box}",
      S + " .vw-chip{flex:0 0 auto;display:flex;align-items:center;gap:8px;padding:9px 14px 5px;min-height:32px;font-size:13.5px;font-weight:800;letter-spacing:.02em;color:" + o.ink + ";line-height:1.2}",
      S + " .vw-dot{flex:0 0 auto;width:10px;height:10px;border-radius:50%;background:" + o.acc + ";animation:vw09ping 2.6s ease-out infinite}",
      S + " .vw-lab{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      S + " .vw-lab.vw-new{animation:vw09in .55s cubic-bezier(.2,.8,.2,1)}",
      S + " .vw-stage{position:relative;flex:1 1 auto;min-height:0}",
      S + " .vw-svg{position:absolute;left:0;top:0;width:100%;height:100%;display:block;overflow:hidden}",
      S + " .vw-bar{flex:0 0 3px;background:rgba(20,35,58,.08)}",
      S + " .vw-bar i{display:block;height:100%;width:0;background:" + o.acc + ";transition:width .7s ease}",
      S + " text{font-family:inherit;font-weight:750;letter-spacing:.01em}",
      S + " .vw-t{paint-order:stroke;stroke:" + o.halo + ";stroke-width:3.6px;stroke-linejoin:round}",
      S + " .vw-n{stroke:none}",
      S + " [data-f]{transition:fill .7s ease,stroke .7s ease}",
      S + " .vw-spin{transform-box:fill-box;transform-origin:center;animation:vw09spin 7s linear infinite}",
      S + " .vw-bob{transform-box:fill-box;transform-origin:center;animation:vw09bob 3.4s ease-in-out infinite}",
      S + " .vw-flow{stroke-dasharray:6 9;animation:vw09flow 1.6s linear infinite}",
      S + " .vw-blink{animation:vw09blink 1.8s ease-in-out infinite}",
      S + " [data-st=hot] .vw-hot{animation:vw09blink 1.1s ease-in-out infinite}",
      S + " [data-st=go] .vw-go{stroke-dasharray:5 8;animation:vw09flow 1.1s linear infinite}",
      S + " [data-st=go] .vw-goSpin{transform-box:fill-box;transform-origin:center;animation:vw09spin 3s linear infinite}",
      "@media (max-width:380px){" + S + " .vw-chip{font-size:12.5px;padding:7px 11px 4px}}",
      "@media (prefers-reduced-motion:reduce){" + S + " *," + S + " *::before," + S + " *::after{animation:none!important;transition:none!important}}"
    ].join("\n") + "\n" + (o.extra ? o.extra(S) : "");
  }
  var KF = [
    "@keyframes vw09spin{to{transform:rotate(360deg)}}",
    "@keyframes vw09bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}",
    "@keyframes vw09flow{to{stroke-dashoffset:-30}}",
    "@keyframes vw09blink{0%,100%{opacity:1}50%{opacity:.35}}",
    "@keyframes vw09ping{0%{box-shadow:0 0 0 0 rgba(192,80,42,.45)}80%,100%{box-shadow:0 0 0 9px rgba(192,80,42,0)}}",
    "@keyframes vw09in{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}"
  ].join("\n") + "\n";

  /* ---------- tween runner (GSAP ticker/easing when present, rAF otherwise) ---------- */
  function Runner() { this.list = []; this.raf = 0; this.gs = []; }
  Runner.prototype.add = function (dur, delay, ease, fn, done) {
    if (!(dur > 0) || RM()) { fn(1); if (done) done(); return; }
    var g = W.gsap, self = this;
    if (g && typeof g.to === "function") {
      var o = { t: 0 };
      var tw = g.to(o, { t: 1, duration: dur, delay: delay || 0, ease: GEASE[ease] || GEASE.io,
        onUpdate: function () { fn(o.t); }, onComplete: function () { if (done) done(); } });
      self.gs.push(tw);
      if (self.gs.length > 400) self.gs.splice(0, 200);
      return;
    }
    var e = EASE[ease] || EASE.io, start = null;
    this.list.push(function (now) {
      if (start === null) start = now + (delay || 0) * 1000;
      if (now < start) return true;
      var t = clamp((now - start) / (dur * 1000), 0, 1);
      fn(e(t));
      if (t >= 1) { if (done) done(); return false; }
      return true;
    });
    this.kick();
  };
  Runner.prototype.kick = function () {
    var self = this;
    if (self.raf || !W.requestAnimationFrame) return;
    var loop = function (now) {
      self.raf = 0;
      self.list = self.list.filter(function (f) { return f(now); });
      if (self.list.length) self.raf = W.requestAnimationFrame(loop);
    };
    self.raf = W.requestAnimationFrame(loop);
  };
  Runner.prototype.kill = function () {
    if (this.raf && W.cancelAnimationFrame) W.cancelAnimationFrame(this.raf);
    this.raf = 0; this.list = [];
    this.gs.forEach(function (t) { try { t.kill(); } catch (e) {} });
    this.gs = [];
  };

  /* ---------- actors: every animated element carries data-a ---------- */
  var NUM = ["x", "y", "s", "r", "o", "sx", "sy", "u", "d", "n"];
  var DEF = { x: 0, y: 0, s: 1, r: 0, o: 1, sx: 1, sy: 1, u: 0, d: 1 };
  function numsOf(d) { return (String(d).match(/-?\d*\.?\d+(?:e-?\d+)?/g) || []).map(Number); }
  function morphStr(tpl, nums) {
    var parts = String(tpl).split(/-?\d*\.?\d+(?:e-?\d+)?/), out = parts[0], i;
    for (i = 0; i < nums.length; i++) out += r2(nums[i]) + (parts[i + 1] || "");
    return out;
  }
  function Actor(el, root) {
    var p = (el.getAttribute("data-p") || "0 0").split(/[ ,]+/).map(Number);
    this.el = el; this.px = p[0] || 0; this.py = p[1] || 0;
    var pid = el.getAttribute("data-path");
    this.path = pid ? root.querySelector('[data-id="' + pid + '"]') : null;
    this.plen = 0;
    this.draws = el.hasAttribute("data-draw") ? [el] : [].slice.call(el.querySelectorAll("[data-draw]"));
    this.mEl = el.tagName.toLowerCase() === "path" ? el : el.querySelector("[data-m]");
    this.tEl = el.tagName.toLowerCase() === "text" ? el : el.querySelector("[data-t]");
    this.fEls = el.hasAttribute("data-f") ? [el] : [].slice.call(el.querySelectorAll("[data-f]"));
    this.fmt = el.getAttribute("data-fmt") || "#";
    this.dec = +(el.getAttribute("data-dec") || 0);
    this.orig = {
      A: {}, m: this.mEl ? this.mEl.getAttribute("d") : null,
      t: this.tEl ? this.tEl.textContent : "",
      n: +(el.getAttribute("data-n0") || 0),
      f: this.fEls.length ? this.fEls[0].getAttribute("fill") : null,
      k: this.fEls.length ? this.fEls[0].getAttribute("stroke") : null
    };
    this.cur = { x: 0, y: 0, s: 1, r: 0, o: 1, sx: 1, sy: 1, u: 0, d: 1, n: this.orig.n, A: {}, m: this.orig.m };
    this.tok = 0;
    this.box = null;
  }
  /* v3: keep the whole sprite inside its container box [x0, y0, x1, y1] (track, chart, gauge or panel) */
  Actor.prototype.fitBox = function (tx, ty, c) {
    var b = null;
    try { b = this.el.getBBox(); } catch (e) { b = null; }
    if (!b || (!b.width && !b.height)) return [tx, ty];
    var B = this.box, px = this.px, py = this.py, kx = c.s * c.sx, ky = c.s * c.sy;
    var xa = tx + px + kx * (b.x - px), xb = tx + px + kx * (b.x + b.width - px);
    var ya = ty + py + ky * (b.y - py), yb = ty + py + ky * (b.y + b.height - py);
    var x0 = Math.min(xa, xb), x1 = Math.max(xa, xb), y0 = Math.min(ya, yb), y1 = Math.max(ya, yb);
    if (x0 < B[0] || x1 - x0 > B[2] - B[0]) tx += B[0] - x0; else if (x1 > B[2]) tx -= x1 - B[2];
    if (y0 < B[1] || y1 - y0 > B[3] - B[1]) ty += B[1] - y0; else if (y1 > B[3]) ty -= y1 - B[3];
    return [tx, ty];
  };
  Actor.prototype.dflt = function (k) {
    if (k in DEF) return DEF[k];
    if (k === "n") return this.orig.n;
    if (k === "m") return this.orig.m;
    if (k === "t") return this.orig.t;
    if (k === "f") return this.orig.f;
    if (k === "k") return this.orig.k;
    if (k === "st") return "";
    return null;
  };
  Actor.prototype.attrOrig = function (name) {
    if (!(name in this.orig.A)) this.orig.A[name] = +(this.el.getAttribute(name) || 0);
    return this.orig.A[name];
  };
  Actor.prototype.paint = function () {
    var c = this.cur, el = this.el, tx = c.x, ty = c.y, k;
    for (k in c.A) el.setAttribute(k, r2(c.A[k]));
    if (this.path) { try { this.plen = this.path.getTotalLength(); } catch (e) { this.plen = 0; } }
    if (this.path && this.plen) {
      var pt = this.path.getPointAtLength(clamp(c.u, 0, 1) * this.plen);
      tx += pt.x - this.px; ty += pt.y - this.py;
    }
    if (this.box) { var fb = this.fitBox(tx, ty, c); tx = fb[0]; ty = fb[1]; }
    if (tx || ty || c.s !== 1 || c.r || c.sx !== 1 || c.sy !== 1) {
      el.setAttribute("transform", "translate(" + r2(tx + this.px) + " " + r2(ty + this.py) + ") rotate(" + r2(c.r) + ") scale(" + r2(c.s * c.sx) + " " + r2(c.s * c.sy) + ") translate(" + r2(-this.px) + " " + r2(-this.py) + ")");
    } else el.removeAttribute("transform");
    el.setAttribute("opacity", r2(c.o));
    el.style.visibility = c.o < 0.01 ? "hidden" : "";
    if (this.draws.length) {
      var dv = clamp(c.d, 0, 1);
      this.draws.forEach(function (p) {
        p.style.strokeDasharray = r2(dv * 1.001) + " 2";
        p.style.visibility = dv < 0.004 ? "hidden" : "";
      });
    }
    if (this.mEl && c.m) this.mEl.setAttribute("d", c.m);
    if (this.tEl && this.el.hasAttribute("data-n0")) {
      this.tEl.textContent = this.fmt.replace("#", c.n.toFixed(this.dec));
    }
  };

  /* ---------- scene factory ---------- */
  function mapIndex(i, n, N) {
    i = Math.floor(Number(i)); n = Math.floor(Number(n));
    if (!isFinite(i)) i = 0;
    if (!isFinite(n) || n <= 0) n = N;
    i = clamp(i, 0, n - 1);
    if (n === N) return i;
    if (n <= 1) return 0;
    return clamp(Math.round(i * (N - 1) / (n - 1)), 0, N - 1);
  }
  function mergeInto(S, src) {
    var a, k;
    for (a in src) {
      if (!S[a]) S[a] = {};
      for (k in src[a]) {
        if (k === "A") { S[a].A = S[a].A || {}; for (var q in src[a].A) S[a].A[q] = src[a].A[q]; }
        else S[a][k] = src[a][k];
      }
    }
  }
  function make(id, def, el) {
    var N = def.K.length, Wd = def.W || 400, Hd = def.H || 320;
    var root = document.createElement("div");
    root.className = "vls-w09 vls-w09-" + id;
    root.innerHTML =
      '<div class="vw-chip" aria-hidden="true"><span class="vw-dot"></span><span class="vw-lab"></span></div>' +
      '<div class="vw-stage"><svg class="vw-svg" xmlns="' + SVGNS + '" viewBox="0 0 ' + Wd + " " + Hd + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(def.title) + '">' +
      def.art(id) + '<g class="vw-fx"></g></svg></div><div class="vw-bar"><i></i></div>';
    while (el.firstChild) el.removeChild(el.firstChild);
    el.appendChild(root);
    var svg = root.querySelector("svg"), stage = root.querySelector(".vw-stage");
    var lab = root.querySelector(".vw-lab"), bar = root.querySelector(".vw-bar i"), fxL = root.querySelector(".vw-fx");
    var actors = {}, list = [].slice.call(root.querySelectorAll("[data-a]"));
    list.forEach(function (n) { actors[n.getAttribute("data-a")] = new Actor(n, root); });
    if (def.B) Object.keys(def.B).forEach(function (n) { if (actors[n]) actors[n].box = def.B[n]; });
    var touched = {};
    [def.init || {}].concat(def.K.map(function (k) { return (k && k.a) || {}; })).forEach(function (o) {
      for (var a in o) { touched[a] = touched[a] || {}; for (var k in o[a]) { if (k === "A") { touched[a].A = touched[a].A || {}; for (var q in o[a].A) touched[a].A[q] = 1; } else touched[a][k] = 1; } }
    });
    var run = new Runner(), cur = -1, lastLabel = "", ro = null;

    function fit() {
      var r = stage.getBoundingClientRect();
      if (!r.width || !r.height) return;
      var a = r.width / r.height, vb;
      if (a > Wd / Hd) { var w = Hd * a; vb = [-(w - Wd) / 2, 0, w, Hd]; }
      else { var h = Wd / a; vb = [0, -(h - Hd) / 2, Wd, h]; }
      svg.setAttribute("viewBox", vb.map(r2).join(" "));
    }
    if (W.ResizeObserver) { ro = new W.ResizeObserver(fit); ro.observe(stage); }
    else W.addEventListener("resize", fit);
    fit();

    function stateAt(k) {
      var S = {}, j;
      var I0 = {}; mergeInto(I0, def.init || {});
      mergeInto(S, def.init || {});
      var g0 = 0;
      for (j = k; j > 0; j--) if (def.K[j] && def.K[j].c) { g0 = j; break; }
      for (j = 0; j <= k; j++) {
        if (j === g0 && g0 > 0) {
          var keep = [].concat(def.K[j].c === true || def.K[j].c === 1 ? [] : def.K[j].c);
          for (var a0 in S) if (I0[a0] && I0[a0].o === 0 && keep.indexOf(a0) < 0) S[a0].o = 0;
        }
        if (def.K[j] && def.K[j].a) mergeInto(S, def.K[j].a);
      }
      var full = {}, a, p;
      for (a in touched) {
        var A = actors[a]; if (!A) continue;
        full[a] = {};
        for (p in touched[a]) {
          if (p === "A") { full[a].A = {}; for (var q in touched[a].A) full[a].A[q] = (S[a] && S[a].A && q in S[a].A) ? S[a].A[q] : A.attrOrig(q); }
          else if (p === "w") full[a].w = (S[a] && "w" in S[a]) ? S[a].w : 0;
          else full[a][p] = (S[a] && p in S[a]) ? S[a][p] : A.dflt(p);
        }
      }
      return full;
    }
    function labelAt(k) { for (var j = k; j >= 0; j--) if (def.K[j] && def.K[j].L) return def.K[j].L; return def.title; }

    function goTo(k, instant) {
      var S = stateAt(k), kf = def.K[k] || {}, dur = kf.dur || def.dur || 0.95;
      var moveForward = !instant && k === cur + 1;
      if (!moveForward) { run.kill(); while (fxL.firstChild) fxL.removeChild(fxL.firstChild); }
      var wOwn = kf.a || {};
      Object.keys(S).forEach(function (name) {
        var A = actors[name], Tt = S[name], from = {}, to = {}, p, any = false;
        if (!A) return;
        A.tok++; var tok = A.tok;
        var wait = (wOwn[name] && wOwn[name].w) || 0;
        if ("t" in Tt && A.tEl) A.tEl.textContent = Tt.t;
        if ("f" in Tt && Tt.f) A.fEls.forEach(function (e) { e.setAttribute("fill", Tt.f); });
        if ("k" in Tt && Tt.k) A.fEls.forEach(function (e) { e.setAttribute("stroke", Tt.k); });
        if ("st" in Tt) A.el.setAttribute("data-st", Tt.st || "");
        NUM.forEach(function (q) { if (q in Tt && Tt[q] !== null) { from[q] = A.cur[q]; to[q] = Tt[q]; if (from[q] !== to[q]) any = true; } });
        var fromA = {}, toA = Tt.A || {};
        for (p in toA) { fromA[p] = (p in A.cur.A) ? A.cur.A[p] : A.attrOrig(p); if (fromA[p] !== toA[p]) any = true; }
        var mFrom = null, mTo = null;
        if ("m" in Tt && Tt.m && A.mEl) {
          if (Tt.m !== A.cur.m) {
            any = true; mFrom = numsOf(A.cur.m || Tt.m); mTo = numsOf(Tt.m);
            if (mFrom.length !== mTo.length) mFrom = mTo.slice();
          }
        }
        var setAll = function (t) {
          if (A.tok !== tok) return;
          for (var q in to) A.cur[q] = lerp(from[q], to[q], t);
          for (var z in toA) A.cur.A[z] = lerp(fromA[z], toA[z], t);
          if (mTo) A.cur.m = morphStr(Tt.m, mTo.map(function (v, i) { return lerp(mFrom[i], v, t); }));
          A.paint();
        };
        if (!any || instant) { setAll(1); return; }
        run.add(dur, moveForward ? wait : 0, Tt.e || kf.e || "io", setAll);
      });
      var followers = Object.keys(actors).filter(function (n) { return actors[n].path; });
      if (followers.length) {
        var repaint = function () { followers.forEach(function (n) { actors[n].paint(); }); };
        if (instant) repaint(); else run.add(dur + 1.6, 0, "lin", repaint);
      }
      var L = labelAt(k);
      if (L !== lastLabel) {
        lab.textContent = L; lastLabel = L;
        svg.setAttribute("aria-label", def.title + ": " + L);
        if (!instant && !RM()) { lab.classList.remove("vw-new"); void lab.offsetWidth; lab.classList.add("vw-new"); }
      }
      bar.style.width = r2(100 * (k + 1) / N) + "%";
      if (moveForward && !RM()) {
        if (kf.p) [].concat(kf.p).forEach(function (n) { fx.ring(n, null, dur * 0.75); });
        if (typeof kf.fx === "function") { try { kf.fx(fx); } catch (e) {} }
      }
      cur = k;
    }

    /* transient effects: they never change the stored state */
    function screenCenter(name) {
      var A = actors[name]; if (!A || !svg.getScreenCTM) return null;
      var m = svg.getScreenCTM(); if (!m) return null;
      var rc = A.el.getBoundingClientRect(); if (!rc.width && !rc.height) return null;
      var inv = m.inverse(), pt = svg.createSVGPoint();
      pt.x = rc.left + rc.width / 2; pt.y = rc.top + rc.height / 2;
      var q = pt.matrixTransform(inv);
      return { x: q.x, y: q.y, r: Math.max(rc.width, rc.height) * Math.abs(inv.a) / 2 };
    }
    function mk(tag, attrs, parent) {
      var n = document.createElementNS(SVGNS, tag);
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      (parent || fxL).appendChild(n); return n;
    }
    function later(sec, fn) { run.add(sec, 0, "lin", function () {}, fn); }
    function burstAt(x, y, col, count) {
      count = count || 10;
      for (var i = 0; i < count; i++) (function (i) {
        var a = i / count * Math.PI * 2, n = mk("circle", { cx: r2(x), cy: r2(y), r: 3, fill: col || def.acc || "#c0502a" });
        run.add(0.8, 0.05, "out", function (t) {
          n.setAttribute("cx", r2(x + Math.cos(a) * 14 * t)); n.setAttribute("cy", r2(y + Math.sin(a) * 14 * t));
          n.setAttribute("opacity", r2(1 - t));
        }, function () { if (n.parentNode) n.parentNode.removeChild(n); });
      })(i);
    }
    var fx = {
      ring: function (name, col, delay) {
        later(delay || 0, function () {
          var c = screenCenter(name); if (!c) return;
          var r0 = clamp(c.r + 4, 12, 95);
          var n = mk("circle", { cx: r2(c.x), cy: r2(c.y), r: r0, fill: "none", stroke: col || def.acc || "#c0502a", "stroke-width": 3 });
          run.add(0.9, 0, "out", function (t) { n.setAttribute("r", r2(r0 + 16 * t)); n.setAttribute("opacity", r2(0.85 * (1 - t))); },
            function () { if (n.parentNode) n.parentNode.removeChild(n); });
        });
      },
      burst: function (x, y, col, count) { burstAt(x, y, col, count); },
      burstOn: function (name, col, delay) {
        later(delay || 0, function () { var c = screenCenter(name); if (c) burstAt(c.x, c.y, col, 12); });
      },
      /* v3: in-place fade (the copy never leaves its card, bin or chart) */
      ghost: function (name) {
        var A = actors[name]; if (!A || !A.el.parentNode) return;
        var g = A.el.cloneNode(true);
        g.removeAttribute("data-a");
        [].slice.call(g.querySelectorAll("[data-a]")).forEach(function (q) { q.removeAttribute("data-a"); });
        g.style.visibility = "";
        A.el.parentNode.insertBefore(g, A.el.nextSibling);
        run.add(0.9, 0, "io", function (t) { g.setAttribute("opacity", r2(0.9 * (1 - t))); },
          function () { if (g.parentNode) g.parentNode.removeChild(g); });
      },
      kick: function (name, dx, dy, rot) {
        var A = actors[name]; if (!A) return;
        var bx = A.cur.x, by = A.cur.y, br = A.cur.r, tok = A.tok;
        run.add(0.7, 0.1, "lin", function (t) {
          if (A.tok !== tok) return;
          var w = Math.sin(t * Math.PI * 3) * (1 - t);
          A.cur.x = bx + (dx || 0) * w; A.cur.y = by + (dy || 0) * w; A.cur.r = br + (rot || 0) * w; A.paint();
        });
      }
    };

    return {
      go: function (i, n) { var k = mapIndex(i, n, N); goTo(k, cur < 0); },
      reset: function () { run.kill(); while (fxL.firstChild) fxL.removeChild(fxL.firstChild); cur = -1; lastLabel = ""; goTo(0, true); },
      destroy: function () { run.kill(); if (ro) ro.disconnect(); else W.removeEventListener("resize", fit); },
      boot: function () { goTo(0, true); }
    };
  }
  function SC(id, def) {
    var inst = null;
    W.VL_SCENES[id] = {
      build: function (el) {
        if (!el) return;
        if (inst) inst.destroy();
        inst = make(id, def, el);
        inst.boot();
      },
      step: function (i, n) { if (inst) inst.go(i, n); },
      reset: function () { if (inst) inst.reset(); }
    };
    W.VL_SCENES[id]._dbg = function () { return { W: def.W || 400, H: def.H || 320, B: def.B || {}, N: def.K.length }; };
  }

  var K = { ink: "#14233a", navy: "#1f4e79", orange: "#c0502a", green: "#2f7d5f", paper: "#fbf8f1",
    sky: "#dbe7f2", amber: "#e0a03a", plum: "#6a4c93", slate: "#8a97a8", white: "#ffffff", rose: "#d9644a", mint: "#d5ece0", red: "#d94a3a" };

  /* ---------- v2: literal hotel-process kit (every visual names a real Qasr activity) ---------- */
  function M() {
    var out = {}, i, a, k;
    for (i = 0; i < arguments.length; i++) {
      var src = arguments[i] || {};
      for (a in src) { out[a] = out[a] || {}; for (k in src[a]) out[a][k] = src[a][k]; }
    }
    return out;
  }
  function ON() { var o = {}, i; for (i = 0; i < arguments.length; i++) o[arguments[i]] = { o: 1 }; return o; }
  function OFF() { var o = {}, i; for (i = 0; i < arguments.length; i++) o[arguments[i]] = { o: 0 }; return o; }
  function HID(list) { var o = {}; list.forEach(function (n) { o[n] = { o: 0 }; }); return o; }
  /* receptionist behind a counter; counter top at y */
  function DESKK(x, y, col) {
    return AT(x, y, AT(0, -14, GUY(col || K.green), 0.95) + R(-38, -16, 76, 34, "#b98b5e", 5) + R(-42, -20, 84, 8, "#d8b48c", 3));
  }
  /* room door; floor at y */
  function DOORK(x, y) {
    return R(x - 24, y - 66, 48, 66, "#e8e1d2", 3) + R(x - 18, y - 60, 36, 60, K.navy, 2) + C(x + 11, y - 30, 2.5, "#ffd479");
  }
  function BOOK(x, y, col) {
    return AT(x, y, R(-20, -14, 40, 28, "#fff", 4, 'stroke="' + (col || K.navy) + '" stroke-width="2.2"') + R(-20, -14, 40, 8, col || K.navy, 3) +
      P("M-13 1 H13 M-13 7 H5", "#9aa7b8", 2));
  }
  function CLOCKK(x, y, r, col) {
    return C(x, y, r, "#fff", 'stroke="' + (col || K.orange) + '" stroke-width="3"') + P("M" + x + " " + y + " V" + (y - r * 0.6) + " M" + x + " " + y + " L" + (x + r * 0.45) + " " + (y + r * 0.2), col || K.orange, 2.4);
  }
  function HOURG(x, y, col) { return AT(x, y, F("M-8 -11 H8 L0 0 L8 11 H-8 L0 0Z", col || K.orange) + R(-10, -13, 20, 3, K.ink, 1) + R(-10, 10, 20, 3, K.ink, 1)); }
  function KIOSKK(x, y) { return AT(x, y, R(-11, -44, 22, 34, K.navy, 4) + R(-7, -40, 14, 14, "#9fe3c0", 2) + R(-4, -10, 8, 10, K.navy) + R(-12, 0, 24, 4, K.ink, 2)); }
  function IDC(x, y, col) { return AT(x, y, R(-15, -10, 30, 20, "#fff", 3, 'stroke="' + (col || K.plum) + '" stroke-width="2"') + C(-7, -1, 4.5, col || K.plum) + P("M2 -3 H11 M2 3 H9", "#9aa7b8", 2)); }
  function OFFICE(x, y, w, h, col) { return R(x - w / 2, y - h / 2, w, h, "#fff", 8, 'stroke="' + col + '" stroke-width="2.5"') + R(x - w / 2, y - h / 2, w, 7, col, 4); }
  function CHEV(x, y, w, h, fill, line) {
    return F("M" + x + " " + y + " H" + (x + w - 12) + " L" + (x + w) + " " + (y + h / 2) + " L" + (x + w - 12) + " " + (y + h) + " H" + x + " L" + (x + 12) + " " + (y + h / 2) + "Z", fill, 'data-f="" stroke="' + line + '" stroke-width="1.5"');
  }
  function COIN(x, y) { return E(x, y, 9, 3.5, K.amber) + E(x, y - 4, 9, 3.5, "#f1c26a"); }
  function TAGX(x, y) { return C(x, y, 10, "#fff", 'stroke="#d94a3a" stroke-width="2.5"') + CROSS(x, y, "#d94a3a", 2.6, 4.5); }
  function TAGOK(x, y) { return C(x, y, 10, K.green) + CHECK(x, y, "#fff", 2.6); }
  function SPEED(x, y, col) { return P("M" + x + " " + y + " h-16 M" + (x + 2) + " " + (y + 7) + " h-22 M" + x + " " + (y + 14) + " h-14", col || K.orange, 2.6); }
  function ARROW(x1, y1, x2, y2, col, w, ex) {
    var a = Math.atan2(y2 - y1, x2 - x1), hx = x2 - Math.cos(a) * 9, hy = y2 - Math.sin(a) * 9;
    return P("M" + x1 + " " + y1 + " L" + r2(hx) + " " + r2(hy), col, w || 3, ex) +
      F("M" + x2 + " " + y2 + " L" + r2(hx + Math.cos(a + 1.6) * 6) + " " + r2(hy + Math.sin(a + 1.6) * 6) + " L" + r2(hx + Math.cos(a - 1.6) * 6) + " " + r2(hy + Math.sin(a - 1.6) * 6) + "Z", col);
  }

  addCSS("kf", KF);
  /* =====================================================================
     O3c  TESTING BEFORE IMPLEMENTATION  (v2 - rebuilt, audit score 4/3)
     A scenario-driven simulator of the PROPOSED arrival workflow:
       workflow track  Pre-check > Rate > Room ready > Access, guests as tokens
           benchmark: 099 Bottling factory (LottieFiles) - items advance and hold at stations
       scenario card + test log  Normal guest, coach arrivals, missing rate, 26% help, access outage
           benchmark: 094 Process - Success (LottieFiles) - each run resolves to pass / fail
       staff lane  reception owner, extra staff, manual key fallback
           benchmark: 086 Workflow by a (LottieFiles) - roles appear and take actions
       peak sparkline, scales, revision stamp
           benchmark: 130 Animated line chart lesson (Observable) - series traced left to right
     ===================================================================== */
  (function () {
    var SX = [60, 160, 260, 350], FY = 190;
    function station(name, x, inner) {
      return G(name, C(x, FY, 19, "#fff", 'data-f="" stroke="' + K.navy + '" stroke-width="3"') + inner, x, FY);
    }
    function tok(name, x, col, y) { return G(name, C(x, y || FY, 8, col || K.navy) + C(x - 2.6, (y || FY) - 1.5, 1.5, "#fff") + C(x + 2.6, (y || FY) - 1.5, 1.5, "#fff"), x, y || FY); }
    function logRow(i, label) {
      var y = 80 + i * 20;
      return G("lg" + i, T(262, y + 5, label, 15, K.ink, "start"), 300, y) +
        G("lgOk" + i, TAGOK(248, y), 248, y) + G("lgX" + i, TAGX(248, y), 248, y);
    }
    var SCN = [["sc1", "Normal guest", K.green], ["sc2", "Coach arrivals", K.orange], ["sc3", "Missing rate", K.orange], ["sc4", "26% need help", K.orange], ["sc5", "Access outage", K.red]];
    SC("O3c", {
      title: "Testing before implementation", W: 400, H: 320, acc: K.orange,
      B: { t1: [14, 180, 392, 200], t3: [14, 180, 392, 200], t3b: [14, 180, 392, 200], t5: [14, 180, 392, 200], jam: [14, 170, 392, 210], queue: [10, 260, 120, 306] },
      art: function () {
        var s = R(-1400, -1400, 3200, 3200, "#eef2f6") + R(-1400, 244, 3200, 1400, "#e4e9ef");
        /* workflow */
        s += G("track", P("M14 " + FY + " H392", "#b8c4d2", 6) + P("M14 " + FY + " H392", "#fff", 2, 'stroke-dasharray="6 8"'), 200, FY);
        /* v3: tokens ride UNDER the station icons, start and stop inside the drawn track (x 14-392, radius 8) */
        s += tok("t1", 22, K.navy) + tok("t3", 22, K.navy) + tok("t3b", 131, K.navy) + tok("t5", 292, K.navy);
        s += station("sPre", SX[0], PHONE(SX[0] - 6, FY - 11, 12, 22, K.ink, "#9fe3c0"));
        s += station("sRate", SX[1], T(SX[1], FY + 6, "%", 17, K.amber, "middle", 'class="vw-n"'));
        s += station("sRoom", SX[2], R(SX[2] - 10, FY - 2, 20, 8, K.green, 2) + R(SX[2] - 10, FY - 8, 7, 6, K.green, 1));
        s += station("sAcc", SX[3], R(SX[3] - 7, FY - 11, 14, 22, K.navy, 2) + C(SX[3] + 4, FY, 1.6, "#ffd479"));
        s += T(SX[0], 228, "Pre-check", 15, K.ink) + T(SX[1], 228, "Rate", 15, K.ink) + T(SX[2], 228, "Room ready", 15, K.ink) + T(SX[3], 228, "Access", 15, K.ink);
        s += G("shine", [SX[0], SX[3]].map(function (x) { return F("M" + (x + 16) + " " + (FY - 26) + " l3 -8 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3Z", K.amber); }).join(""), 200, FY - 26);
        s += G("dashOver", R(14, FY - 30, 378, 60, "rgba(238,242,246,.55)", 8, 'stroke="' + K.slate + '" stroke-width="2" stroke-dasharray="7 6"'), 200, FY);
        s += G("prep", '<g class="vw-spin">' + P("M" + (SX[2] + 24) + " " + (FY - 22) + " a8 8 0 1 1 -2 -6", K.orange, 3) + "</g>", SX[2] + 22, FY - 24);
        s += G("rateQ", R(SX[1] - 22, FY - 54, 44, 28, "#fff", 4, 'stroke="' + K.orange + '" stroke-width="2"') + T(SX[1], FY - 34, "?", 18, K.orange, "middle", 'class="vw-n"'), SX[1], FY - 40);
        s += G("rateOk", R(SX[1] - 22, FY - 54, 44, 28, "#e3f3ea", 4, 'stroke="' + K.green + '" stroke-width="2"') + CHECK(SX[1], FY - 40, K.green, 3), SX[1], FY - 40);
        s += G("brk", P("M300 " + FY + " H330", K.red, 5) + TAGX(306, FY - 22), 306, FY - 10);
        s += G("coordL", P("M" + SX[0] + " " + (FY + 19) + " Q120 250 120 262 M" + SX[2] + " " + (FY + 19) + " Q200 250 140 262", K.plum, 2.5, 'class="vw-flow"'), 150, 230);
        /* tokens */

        s += G("crowd", [0, 1, 2, 3, 4, 5].map(function (i) { return C(20 + (i % 3) * 14, FY - 8 + Math.floor(i / 3) * 16, 7, i % 2 ? K.plum : K.amber); }).join(""), 34, FY);
        s += G("jam", [0, 1, 2, 3, 4].map(function (i) { return C(186 + i * 15, FY + (i % 2 ? -8 : 8), 7, i % 2 ? K.plum : K.amber); }).join(""), 216, FY);
        s += G("bus", AT(30, 140, R(-24, -12, 48, 22, K.amber, 5) + R(-20, -8, 9, 7, "#fff", 1) + R(-8, -8, 9, 7, "#fff", 1) + R(4, -8, 9, 7, "#fff", 1) + C(-13, 11, 4, K.ink) + C(13, 11, 4, K.ink)), 30, 140);

        /* v3: 26 of 100 guests as a 26%-wide share of one 100% bar (196 units; 26% = 50.96) */
        s += G("helpRow", R(14, 155, 196, 13, "#5b8fc4", 3) + R(14, 155, 50.96, 13, K.orange, 3) + T(39.5, 165.5, "26%", 10, "#fff", "middle", 'class="vw-n"') + T(206, 165.5, "100% of guests", 10, "#fff", "end", 'class="vw-n"'), 112, 161);
        s += G("divert", [0, 1, 2].map(function (i) { return C(56 + i * 18, 288, 6.5, K.orange); }).join(""), 74, 288);

        /* staff lane */
        s += G("desk", DESKK(120, 296), 120, 280);
        s += G("st2", AT(184, 300, GUY(K.green)), 184, 284) + G("st3", AT(212, 300, GUY(K.green)), 212, 284);
        s += G("pile", [0, 1, 2, 3, 4].map(function (i) { return R(140, 270 - i * 7, 18, 6, i % 2 ? "#fde3d6" : "#fff", 1, 'stroke="' + K.orange + '" stroke-width="1"'); }).join(""), 149, 256);
        s += G("sweat", C(108, 252, 2.4, "#5fb3e6") + C(132, 250, 2.4, "#5fb3e6"), 120, 251);
        s += G("queue", [0, 1, 2, 3, 4].map(function (i) { return AT(20 + i * 15, 300, GUY(i % 2 ? K.orange : "#5b8fc4"), 0.55); }).join(""), 50, 290);
        s += G("hk", AT(300, 300, GUY(K.plum)) + R(316, 284, 22, 14, "#fff", 2, 'stroke="' + K.plum + '" stroke-width="2"'), 310, 284);
        s += G("rev", AT(250, 300, GUY(K.amber)), 250, 284);
        s += G("flag", P("M262 266 V246", K.ink, 2) + F("M262 246 L280 251 L262 257Z", K.green), 268, 252);
        s += G("bell", AT(SX[1] + 30, FY - 30, F("M-8 6 Q-8 -8 0 -8 Q8 -8 8 6Z", K.amber) + C(0, 8, 2.5, K.amber)), SX[1] + 30, FY - 30);
        s += G("keyR", P("M" + SX[3] + " " + (FY + 22) + " C350 260 260 268 150 276", K.green, 3, 'stroke-dasharray="6 5"') + AT(170, 268, C(-4, 0, 4, "none", 'stroke="' + K.amber + '" stroke-width="2.4"') + P("M0 0 H10 M7 0 V4", K.amber, 2.4)), 250, 250);
        s += G("redFlags", [SX[0], SX[2]].map(function (x) { return P("M" + (x + 14) + " " + (FY - 20) + " V" + (FY - 40), K.ink, 2) + F("M" + (x + 14) + " " + (FY - 40) + " l14 5 l-14 6Z", K.red); }).join(""), 160, FY - 30);
        s += G("fog", '<g class="vw-bob">' + E(SX[1], FY - 30, 30, 10, "#cdd5df", 'opacity=".8"') + E(SX[3], FY - 28, 28, 10, "#cdd5df", 'opacity=".8"') + "</g>", 250, FY - 30);
        s += G("aTags", [SX[1], SX[3]].map(function (x) { return R(x - 12, FY - 52, 24, 20, "#fff", 3, 'stroke="' + K.navy + '" stroke-width="2"') + T(x, FY - 37, "A", 15, K.navy, "middle", 'class="vw-n"'); }).join(""), 250, FY - 42);
        s += G("aResp", [SX[1], SX[3]].map(function (x) { return TAGOK(x + 18, FY - 52); }).join(""), 250, FY - 52);
        /* top-left zone: scenario card */
        s += G("scnF", R(14, 48, 196, 36, "#fff", 8, 'stroke="' + K.ink + '" stroke-width="2"'), 112, 66);
        SCN.forEach(function (c) { s += PILL(c[0], 112, 66, c[1], c[2], "#fff", 15); });
        s += G("deck", [0, 1, 2, 3].map(function (i) { return R(26 + i * 8, 54 + i * 6, 150, 34, "#fff", 6, 'stroke="#9aa7b8" stroke-width="1.5"'); }).join(""), 100, 80);
        s += PILL("pProp", 112, 66, "Proposed process", K.navy, "#fff", 15);
        s += PILL("pLess", 112, 108, "Less waiting?", "#fff", K.green, 15);
        s += PILL("pNot", 112, 140, "Not evidence yet", K.red, "#fff", 15);
        s += PILL("pReal", 112, 108, "Realistic cases", "#fff", K.ink, 15);
        s += PILL("pBefore", 112, 140, "Before implementing", K.navy, "#fff", 15);
        s += PILL("pEasy", 112, 108, "Easy case only", "#fff", K.slate, 15);
        s += G("spark", R(14, 92, 196, 66, "#fff", 8, 'stroke="#c9d3df" stroke-width="1.5"') + P("M24 140 H200", K.slate, 2, 'stroke-dasharray="5 5"') +
          P("M24 142 L60 138 L84 140 L110 104 L130 100 L150 136 L200 140", K.orange, 3, 'data-draw="" pathLength="1"') +
          T(20, 104, "arrivals", 11, K.slate, "start") + T(156, 110, "peak", 12, K.orange, "start") + T(204, 153, "average", 11, K.slate, "end"), 112, 125);
        s += PILL("pPeak", 112, 108, "Peak demand", K.orange, "#fff", 15);
        s += PILL("pAvg", 112, 140, "Built for average", "#fff", K.red, 15);
        s += PILL("pCoord", 112, 108, "Still coordinated?", "#fff", K.plum, 15);
        s += PILL("pOver", 112, 140, "One overloaded", K.red, "#fff", 15);
        s += PILL("pWho", 112, 108, "Who investigates?", "#fff", K.orange, 15);
        s += PILL("pOwn", 112, 140, "Owner: Revenue", K.green, "#fff", 15);
        s += PILL("pNobody", 112, 108, "Nobody fixes it", K.red, "#fff", 15);
        s += PILL("pFront", 112, 108, "Frontline testers", K.green, "#fff", 15);
        s += PILL("sayR", 112, 140, "Guests stall here", "#fff", K.green, 15);
        s += PILL("sayH", 300, 254, "Rooms run late", "#fff", K.plum, 15);
        s += PILL("pChal", 112, 108, "Challenge early", K.green, "#fff", 15);
        s += PILL("p26", 112, 108, "26 in 100", K.orange, "#fff", 15);
        s += PILL("pAll", 112, 140, "All digital? No", "#fff", K.red, 15);
        s += PILL("pStaff", 112, 140, "Staff to match", K.green, "#fff", 15);
        s += PILL("pDep", 112, 108, "Access needs data", "#fff", K.red, 15);
        s += PILL("pKey", 112, 140, "Manual key route", K.green, "#fff", 15);
        s += PILL("pRev", 112, 108, "Design revised", K.navy, "#fff", 15);
        s += PILL("pEarly", 112, 108, "Found in design", K.green, "#fff", 15);
        s += PILL("pTgt", 112, 108, "Target, not result", "#fff", K.navy, 15, 'stroke="' + K.navy + '" stroke-width="1.5" stroke-dasharray="4 3"');
        s += PILL("pClaim", 112, 140, "No claimed result", K.red, "#fff", 15);
        s += PILL("pUnc", 112, 108, "Some uncertainty", "#fff", K.slate, 15);
        s += PILL("pAss", 112, 108, "Prepared responses", K.green, "#fff", 15);
        s += PILL("pNext", 112, 108, "Next: decide", K.navy, "#fff", 16);
        /* top-right: test log */
        s += G("log", R(232, 46, 156, 128, "#fff", 8, 'stroke="' + K.ink + '" stroke-width="2"') + logRow(0, "Normal") + logRow(1, "Peak") + logRow(2, "Missing rate") + logRow(3, "Assistance") + logRow(4, "Outage"), 310, 110);
        s += G("conf", R(240, 49, 140, 17, "#e3f3ea", 5, 'stroke="' + K.green + '" stroke-width="1.5"') + T(310, 61.5, "Confidence grows", 12, K.green, "middle", 'class="vw-n"'), 310, 57);
        /* judgement scale (replaces log late) */
        s += G("scale", R(232, 46, 156, 128, "#fff", 8, 'stroke="' + K.ink + '" stroke-width="2"') +
          G("beam", P("M248 92 H372", K.ink, 4) + P("M260 92 V112 M360 92 V112", K.ink, 2) + R(236, 112, 48, 26, "#e3f3ea", 6) + R(336, 112, 48, 26, "#fde3d6", 6) +
            T(260, 130, "Gain", 15, K.green, "middle", 'class="vw-n"') + T(360, 130, "Cost", 15, K.orange, "middle", 'class="vw-n"'), 310, 92) + F("M304 156 L310 94 L316 156Z", K.ink), 310, 110);
        return s;
      },
      init: M(HID(["shine", "dashOver", "prep", "rateQ", "rateOk", "brk", "coordL", "crowd", "jam", "bus", "t3", "helpRow", "divert", "t5", "st2", "st3", "pile", "sweat", "queue", "flag", "bell", "keyR", "redFlags", "fog", "aTags", "aResp",
        "scnF", "sc1", "sc2", "sc3", "sc4", "sc5", "deck", "pLess", "pNot", "pReal", "pBefore", "pEasy", "spark", "pPeak", "pAvg", "pCoord", "pOver", "pWho", "pOwn", "pNobody", "pFront", "sayR", "sayH", "pChal", "p26", "pAll", "pStaff",
        "pDep", "pKey", "pRev", "pEarly", "pTgt", "pClaim", "pUnc", "pAss", "pNext", "log", "lgOk0", "lgOk1", "lgOk2", "lgOk3", "lgOk4", "lgX0", "lgX1", "lgX2", "lgX3", "lgX4", "conf", "scale", "t3b", "t5"]),
        { pProp: { o: 0, s: 0.6 }, sPre: { o: 0, s: 0.4, f: "#fff" }, sRate: { o: 0, s: 0.4, f: "#fff" }, sRoom: { o: 0, s: 0.4, f: "#fff" }, sAcc: { o: 0, s: 0.4, f: "#fff" }, track: { o: 0 },
          t1: { o: 0, x: 0 }, desk: { o: 0.35 }, hk: { o: 0.35 }, rev: { o: 0.35 }, beam: { r: 0 }, spark: { o: 0 },
          lg0: { o: 0.35 }, lg1: { o: 0.35 }, lg2: { o: 0.35 }, lg3: { o: 0.35 }, lg4: { o: 0.35 } }),
      K: (function () {
        var TL = ["pProp", "pLess", "pNot", "pReal", "pBefore", "pEasy", "pPeak", "pAvg", "pCoord", "pOver", "pWho", "pOwn", "pNobody", "pFront", "sayR", "pChal", "p26", "pAll", "pStaff", "pDep", "pKey", "pRev", "pEarly", "pTgt", "pClaim", "pUnc", "pAss", "pNext", "deck", "spark"];
        function tl(keep) { return HID(TL.filter(function (n) { return (keep || []).indexOf(n) < 0; })); }
        function scn(n) { var o = { scnF: { o: n ? 1 : 0 } }; SCN.forEach(function (c) { o[c[0]] = { o: c[0] === n ? 1 : 0 }; }); return o; }
        var GOOD = "#e3f3ea", BAD = "#fde3d6", NEU = "#fff";
        function st(a, b, c, d) { return { sPre: { f: a || NEU }, sRate: { f: b || NEU }, sRoom: { f: c || NEU }, sAcc: { f: d || NEU } }; }
        return [
          { L: "A convincing design", dur: 1.3, a: M({ track: { o: 1 }, pProp: { o: 1, s: 1 }, sPre: { o: 1, s: 1 }, sRate: { o: 1, s: 1, w: 0.15 }, sRoom: { o: 1, s: 1, w: 0.3 }, sAcc: { o: 1, s: 1, w: 0.45 } }), e: "back", p: "pProp" },
          { L: "Looks promising", a: M(tl(["pProp"]), ON("shine", "pLess")), p: "shine" },
          { L: "A diagram isn't proof", a: M(tl(), OFF("shine"), ON("dashOver", "pNot")), p: "pNot" },
          { L: "Test realistic cases", dur: 1.2, a: M(tl(), OFF("dashOver"), ON("deck", "pReal", "log")), p: "log" },
          { L: "Test before implementing", a: M(tl(["deck"]), ON("pBefore"), { lg0: { o: 1 }, lg1: { o: 1, w: 0.1 }, lg2: { o: 1, w: 0.2 }, lg3: { o: 1, w: 0.3 }, lg4: { o: 1, w: 0.4 } }), p: "pBefore" },
          { L: "Test 1: normal guest", a: M(tl(), scn("sc1"), { t1: { o: 1 } }, st(GOOD, GOOD, GOOD, NEU)), e: "back", p: "sc1" },
          { L: "Normal journey passes", dur: 2, a: M(tl(), { t1: { x: 362 } }, st(GOOD, GOOD, GOOD, GOOD), { lgOk0: { o: 1, w: 1.6 } }), e: "io", p: "lgOk0" },
          { L: "An easy case only", a: M(tl(), ON("pEasy"), { t1: { o: 0 } }, st()), p: "pEasy" },
          { L: "Test 2: coach arrivals", dur: 1.3, a: M(tl(), scn("sc2"), ON("bus", "crowd", "prep"), { sRoom: { f: BAD } }), e: "out", p: "bus" },
          { L: "Peak demand", dur: 1.3, a: M(tl(), { spark: { o: 1 } }), p: "spark" },
          { L: "Built for average fails", a: M(tl(), OFF("crowd", "bus"), ON("jam", "pAvg"), st(NEU, NEU, BAD, NEU)), fx: function (f) { f.kick("jam", 4, 0, 0); }, p: "jam" },
          { L: "Still coordinated?", a: M(tl(), ON("coordL", "pCoord"), { desk: { o: 1 }, sPre: { f: "#fff4cf" }, sRoom: { f: "#fff4cf" } }), p: "coordL" },
          { L: "One overloaded person", a: M(tl(), OFF("coordL"), ON("pile", "sweat", "pOver", "lgX1")), fx: function (f) { f.kick("desk", 3, 0, 0); }, p: "pile" },
          { L: "Test 3: missing rate", dur: 1.3, a: M(tl(), scn("sc3"), OFF("jam", "prep", "pile", "sweat"), ON("rateQ", "t3"), { t3: { x: 109 } }, st(GOOD, BAD, NEU, NEU)), p: "rateQ" },
          { L: "Who investigates?", a: M(tl(), ON("pWho"), { rev: { o: 1 }, desk: { o: 1 } }), fx: function (f) { f.kick("t3", 3, 0, 0); }, p: "pWho" },
          { L: "Ownership, defined", dur: 1.6, a: M(tl(), ON("flag", "pOwn", "rateOk"), { rateQ: { o: 0 }, t3: { x: 362, w: 0.7 } }, st(GOOD, GOOD, GOOD, GOOD), { lgOk2: { o: 1, w: 1.2 } }), p: "flag" },
          { L: "Nobody owns it", a: M(tl(), OFF("flag", "rateOk", "lgOk2"), ON("rateQ", "bell", "pNobody", "lgX2", "t3b"), { t3: { o: 0 } }, st(GOOD, BAD, NEU, NEU)), fx: function (f) { f.kick("bell", 0, 0, 18); }, p: "bell" },
          { L: "Frontline staff test", a: M(tl(), OFF("bell", "rateQ", "t3", "t3b"), ON("pFront"), { hk: { o: 1 }, desk: { o: 1 }, rev: { o: 0.35 } }, st()), p: ["desk", "hk"] },
          { L: "They know the reality", a: M(tl(["pFront"]), ON("sayR", "sayH")), p: ["sayR", "sayH"] },
          { L: "Challenge early", a: M(tl(), OFF("sayH"), ON("redFlags", "pChal")), p: "redFlags" },
          { L: "Test 4: 26% need help", dur: 1.3, a: M(tl(), OFF("redFlags"), scn("sc4"), ON("helpRow", "p26")), p: "helpRow" },
          { L: "Not everyone is digital", dur: 1.3, a: M(tl(["p26"]), ON("pAll", "divert", "queue"), { helpRow: { o: 0.3 } }), fx: function (f) { f.kick("queue", 4, 0, 0); }, p: "queue" },
          { L: "How many staff needed?", dur: 1.3, a: M(tl(), ON("pStaff", "st2"), { st3: { o: 1, w: 0.4 }, queue: { o: 0.25, w: 0.6 }, lgOk3: { o: 1, w: 0.8 } }), p: ["st2", "st3"] },
          { L: "Test 5: access outage", a: M(tl(), OFF("helpRow", "divert", "queue", "st2", "st3"), scn("sc5"), ON("brk", "pDep", "t5"), st(NEU, NEU, GOOD, BAD)), fx: function (f) { f.kick("sAcc", 3, 0, 0); }, p: "brk" },
          { L: "A safe fallback", dur: 1.3, a: M(tl(["pDep"]), ON("keyR", "pKey"), { lgOk4: { o: 1, w: 0.8 } }), p: "keyR" },
          { L: "Revise the design", a: M(tl(), scn(null), OFF("brk", "t5", "keyR"), ON("pRev", "aTags"), st(), { sRoom: { s: 1.12 } }), e: "back", p: "pRev" },
          { L: "Better found now", a: M(tl(), ON("pEarly"), { sRoom: { s: 1 } }), p: "pEarly" },
          { L: "Times stay targets", a: M(tl(), OFF("aTags"), ON("pTgt", "conf")), p: "pTgt" },
          { L: "Confidence, not claims", dur: 1.3, a: M(tl(["pTgt"]), ON("pClaim")), p: "conf" },
          { L: "Weigh gain against cost", dur: 1.3, a: M(tl(), OFF("log", "conf"), ON("scale"), { beam: { r: 0 } }), p: "scale" },
          { L: "Some uncertainty stays", a: M(tl(), ON("fog", "pUnc")), p: "fog" },
          { L: "Know your assumptions", a: M(tl(), OFF("fog"), ON("aTags", "pAss"), { aResp: { o: 1, w: 0.5 } }), p: "aTags" },
          { L: "Next: defend a decision", a: M(tl(), ON("pNext")), e: "back", p: "pNext" }
        ];
      })()
    });
  })();
  addCSS("O3c", baseCSS("O3c", { bg: "#eef2f6", ink: K.ink, acc: K.orange, halo: "rgba(255,255,255,.9)" }));

  /* =====================================================================
     O2d  CHOOSING THE DEFENSIBLE DESIGN  (v2 - rebuilt, audit score 5/4)
     Five literal panels of the committee decision:
       pE  Committee + shared evidence: 82 / 44 / 22 on one lobby-to-room yardstick
           benchmark: 126 Stacked-to-grouped bars (Observable) - same segments, regrouped
       pA  Two directors argue: A (14 hotels, 18 weeks, desk queue) vs B (desk optional)
           benchmark: 105 World map with logistics (LottieFiles) - hubs light up along routes
       pT  The two tensions: 7 of 9 objections about the 26%; the January rule
           benchmark: 137 Corporate Timeline by HenlyFx (Motion Array) - events revealed in order
       pS  Staged A-then-B: stepping stones B will reuse vs desk-only kit
           benchmark: 089 Git Workflow (LottieFiles) - branch then merge
       pR  Conditional recommendation memo with named accepted risk
           benchmark: 095 contract process (LottieFiles) - proposal to agreement
     ===================================================================== */
  (function () {
    var PANELS = ["pE", "pA", "pT", "pS", "pR"];
    function only(p) { var o = {}; PANELS.forEach(function (n) { o[n] = { o: n === p ? 1 : 0 }; }); return o; }
    function hbar(name, y, w, col, dash) { return G(name, R(110, y - 13, w, 26, dash ? "none" : col, 5, dash ? 'stroke="' + col + '" stroke-width="2.5" stroke-dasharray="6 4"' : ""), 110, y); }
    SC("O2d", {
      title: "Choosing the defensible design", W: 400, H: 320, acc: K.navy,
      art: function () {
        var E1 = "", A = "", Tt = "", S = "", Rr = "", i;
        /* pE */
        E1 += G("table", E(200, 140, 120, 26, "#b98b5e") + AT(110, 128, GUY(K.ink)) + AT(160, 120, GUY(K.plum)) + AT(240, 120, GUY(K.navy)) + AT(290, 128, GUY(K.green)) +
          R(170, 130, 26, 18, "#e3eef8", 2, 'stroke="' + K.navy + '" stroke-width="1.5"') + R(206, 130, 26, 18, "#e3f3ea", 2, 'stroke="' + K.green + '" stroke-width="1.5"'), 200, 120);
        E1 += G("you", AT(200, 270, GUY(K.orange), 1.3), 200, 246);
        E1 += PILL("pDef", 200, 64, "A decision to defend", K.navy, "#fff", 15);
        E1 += PILL("pWhich", 200, 196, "Which, and why?", "#fff", K.ink, 15, 'stroke="' + K.ink + '" stroke-width="1.5"');
        /* v3: zero-based minute axis, 3.34 units per minute (82 = 274, 44 = 147, 22 = 73.5), labelled every 20 min */
        E1 += G("ruler", P("M110 88 V280 H384", K.ink, 2) + [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (k) { return P("M" + r2(110 + k * 33.41) + " 276 V286", K.ink, 1.6); }).join("") +
          [0, 20, 40, 60].map(function (m) { return T(r2(110 + m * 3.341), 270, String(m), 11, K.slate); }).join("") + T(390, 270, "80 min", 11, K.slate, "end"), 247, 280);
        E1 += G("rowL", T(14, 112, "Today", 15, K.ink, "start") + T(14, 172, "Design A", 15, K.navy, "start") + T(14, 232, "Design B", 15, K.green, "start"), 50, 170);
        E1 += hbar("bT", 106, 274, "#9aa7b8") + hbar("bA", 166, 147, K.navy, true) + hbar("bB", 226, 73, K.green, true);
        E1 += G("vT", T(380, 86, "82 min", 15, K.ink, "end"), 360, 88) + G("vA", T(264, 171, "44 modelled", 15, K.navy, "start"), 310, 166) + G("vB", T(192, 231, "22 modelled", 15, K.green, "start"), 240, 226);
        E1 += G("cut", R(110, 124, 157, 15, K.orange, 3) + T(188.5, 135.5, "47-min approval wait", 11, "#fff", "middle", 'class="vw-n"'), 188, 131);
        E1 += G("cutX", HOURG(366, 166) + TAGX(382, 158) + HOURG(296, 226) + TAGX(312, 218), 340, 196);
        E1 += PILL("pBoth", 200, 300, "Both remove it", K.orange, "#fff", 15);
        E1 += PILL("pYard", 247, 300, "Lobby to room", "#fff", K.ink, 15);
        /* pA */
        A += G("opsD", AT(50, 270, GUY(K.navy), 1.2), 50, 246) + G("trD", AT(350, 270, GUY(K.green), 1.2), 350, 246);
        A += G("hotels", (function () { var s = ""; for (i = 0; i < 14; i++) s += G("h" + i, R(96 + (i % 7) * 30, 70 + Math.floor(i / 7) * 34, 20, 22, "#cfe0ee", 3, 'data-f="" stroke="' + K.navy + '" stroke-width="1.5"'), 106 + (i % 7) * 30, 81 + Math.floor(i / 7) * 34); return s; })(), 200, 98);
        A += PILL("p18", 200, 150, "Relief in 18 weeks", K.navy, "#fff", 15);
        A += PILL("pSoon", 120, 196, "Results soon", "#fff", K.navy, 15) + PILL("pCap", 280, 196, "Limited capacity", "#fff", K.navy, 15);
        A += G("deskA", AT(200, 270, R(-30, -14, 60, 28, "#b98b5e", 5) + AT(0, -14, GUY(K.green), 0.8)) + [0, 1, 2, 3].map(function (k) { return AT(100 + k * 18, 270, GUY(k % 2 ? K.orange : "#5b8fc4"), 0.7); }).join(""), 160, 258);
        A += PILL("pQueue", 200, 196, "Every guest queues", K.orange, "#fff", 15);
        A += G("kioskA", KIOSKK(260, 290) + KIOSKK(286, 290) + COIN(272, 236) + P("M300 270 C320 260 330 250 340 240", K.slate, 3, 'stroke-dasharray="3 4"'), 280, 268);
        A += PILL("pPull", 200, 150, "Kiosks pull back", "#fff", K.orange, 15);
        A += G("routeB", PHONE(120, 210, 18, 32, K.ink, "#9fe3c0") + ARROW(144, 226, 240, 226, K.green, 3) + R(246, 196, 24, 40, K.navy, 2) + C(264, 216, 2, "#ffd479"), 195, 220);
        A += PILL("p60", 200, 150, "Saves 60 minutes", K.green, "#fff", 15);
        A += G("teams", [0, 1, 2, 3].map(function (k) { return AT(120 + k * 40, 120, GUY([K.navy, K.amber, K.plum, K.green][k]), 0.8); }).join(""), 180, 106);
        A += G("longBar", R(100, 168, 220, 16, "#eef1f5", 8) + G("longF", R(100, 168, 220, 16, K.green, 8), 100, 176), 210, 176);
        A += PILL("pLong", 200, 64, "Longer wait, more change", K.green, "#fff", 15);
        /* pT */
        Tt += G("tCard1", R(20, 56, 170, 44, "#fff", 10, 'stroke="' + K.orange + '" stroke-width="2.5"') + T(105, 84, "26% need help", 15, K.orange, "middle", 'class="vw-n"'), 105, 78);
        Tt += G("tCard2", R(210, 56, 170, 44, "#fff", 10, 'stroke="' + K.red + '" stroke-width="2.5"') + T(295, 84, "January rule", 15, K.red, "middle", 'class="vw-n"'), 295, 78);
        Tt += G("objs", (function () { var s = ""; for (i = 0; i < 9; i++) s += G("ob" + i, R(26 + i * 18, 118, 14, 12, i < 7 ? K.orange : "#9aa7b8", 3, 'data-f=""') + F("M" + (30 + i * 18) + " 130 l-2 5 l6 -5Z", i < 7 ? K.orange : "#9aa7b8"), 33 + i * 18, 124); return s; })(), 105, 124);
        Tt += G("helpG", R(26, 160, 160, 16, "#5b8fc4", 3) + R(26, 160, 41.6, 16, K.orange, 3) + T(46.8, 172, "26%", 11, "#fff", "middle", 'class="vw-n"') + T(182, 172, "of guests", 11, "#fff", "end", 'class="vw-n"'), 106, 168);
        Tt += PILL("p7of9", 105, 204, "7 of 9 objections", K.orange, "#fff", 15);
        Tt += G("magT", AT(80, 168, C(0, 0, 24, "rgba(255,255,255,.35)", 'stroke="' + K.ink + '" stroke-width="3.5"') + P("M17 17 L30 30", K.ink, 5)), 80, 168);
        Tt += PILL("pFlaw", 105, 240, "Flaw or visible?", "#fff", K.ink, 15);
        Tt += G("peakT", AT(60, 290, R(-24, -12, 48, 24, "#b98b5e", 4) + AT(0, -12, GUY(K.green), 0.7)) + AT(110, 300, GUY(K.green), 0.8) + [0, 1, 2].map(function (k) { return C(150 + k * 14, 290, 6, K.orange); }).join("") + TAGOK(196, 276), 120, 284);
        Tt += PILL("pPeak", 105, 240, "Test at peak", K.green, "#fff", 15);
        /* v3: month ticks: Now at x214, January (11 months) at x362 = 13.45 units per month */
        Tt += G("tl", P("M214 200 H382", K.ink, 2.5) + C(214, 200, 5, K.ink) + (function () { var t = ""; for (var m = 1; m <= 12; m++) t += P("M" + r2(214 + m * 148 / 11) + " 196 V204", K.ink, 1.5); return t; })() +
          T(214, 226, "Now", 15, K.ink) + T(r2(214 + 6 * 148 / 11), 222, "6", 12, K.slate) + T(362, 222, "11 mo", 12, K.red), 298, 200);
        Tt += G("janPin", P("M362 160 V210", K.red, 3) + R(330, 140, 64, 22, K.red, 6) + T(362, 156, "Jan", 15, "#fff", "middle", 'class="vw-n"'), 362, 175);
        Tt += G("bWork", R(222, 178, 140, 14, K.green, 5), 292, 185);
        Tt += PILL("p11", 290, 248, "11 months away", "#fff", K.red, 15);
        Tt += G("chainT", P("M362 185 C340 170 330 170 320 178", K.slate, 3, 'stroke-dasharray="3 4"') + AT(362, 214, R(-7, -3, 14, 11, K.red, 2) + P("M-4 -3 V-7 Q-4 -11 0 -11 Q4 -11 4 -7 V-3", K.red, 2)), 345, 195);
        Tt += PILL("pFixed", 290, 278, "Date cannot move", K.red, "#fff", 15);
        Tt += G("protect", SHIELD(262, 168, 0.9, "#e9f3ee", K.green) + P("M262 184 V200", K.green, 3), 262, 180);
        Tt += PILL("pProt", 290, 278, "Protect it early", K.green, "#fff", 15);
        /* pS */
        S += G("aNode", C(70, 110, 30, K.navy) + T(70, 117, "A", 20, "#fff", "middle", 'class="vw-n"'), 70, 110) + G("bNode", C(330, 110, 30, K.green) + T(330, 117, "B", 20, "#fff", "middle", 'class="vw-n"'), 330, 110);
        S += G("pathS", P("M100 110 H300", K.slate, 3, 'stroke-dasharray="8 6"'), 200, 110);
        S += G("pit", F("M130 180 Q200 260 270 180Z", "#8a7f6c") + T(200, 214, "Trap", 15, "#fff", "middle", 'class="vw-n"'), 200, 205);
        S += G("stone1", R(126, 160, 60, 24, "#3fae74", 6) + T(156, 177, "Data", 15, "#fff", "middle", 'class="vw-n"'), 156, 172);
        S += G("stone2", R(214, 160, 60, 24, "#3fae74", 6) + T(244, 177, "Skills", 15, "#fff", "middle", 'class="vw-n"'), 244, 172);
        S += G("stone3", R(170, 250, 60, 24, K.slate, 6) + T(200, 267, "Kit", 15, "#fff", "middle", 'class="vw-n"'), 200, 262);
        S += PILL("pTrapS", 200, 64, "A, then B?", K.ink, "#fff", 15);
        S += PILL("pReuse", 200, 300, "Only if B reuses it", K.green, "#fff", 15);
        S += PILL("pData", 100, 220, "Shared data", "#e3f3ea", K.green, 15);
        S += PILL("pKit", 312, 300, "Desk kit burden", "#fde3d6", K.orange, 15);
        /* pR memo */
        Rr += G("memo", R(90, 52, 220, 236, "#fff", 10, 'stroke="' + K.ink + '" stroke-width="2.5"') + T(200, 78, "Recommendation", 16, K.ink, "middle", 'class="vw-n"') + P("M120 270 C140 258 152 278 170 266", K.navy, 2.5), 200, 170);
        Rr += G("riskLn", T(104, 112, "Risk accepted", 15, K.orange, "start") + P("M104 120 H296", K.orange, 2), 200, 114);
        Rr += G("chB", R(104, 136, 20, 20, "#fff", 4, 'stroke="' + K.green + '" stroke-width="2"') + T(132, 152, "Back Design B", 15, K.ink, "start"), 200, 146);
        Rr += G("c1", R(104, 170, 20, 20, "#fff", 4, 'stroke="' + K.navy + '" stroke-width="2"') + T(132, 186, "Desk staffed, peak", 15, K.ink, "start"), 200, 180);
        Rr += G("c2", R(104, 204, 20, 20, "#fff", 4, 'stroke="' + K.navy + '" stroke-width="2"') + T(132, 220, "January plan", 15, K.ink, "start"), 200, 214);
        Rr += G("ck1", CHECK(114, 180, K.green, 3) , 114, 180) + G("ck2", CHECK(114, 214, K.green, 3), 114, 214) + G("ckB", CHECK(114, 146, K.green, 3), 114, 146);
        Rr += G("elseA", P("M310 214 C340 214 350 240 350 260", K.navy, 3) + R(300, 262, 96, 40, "#e3eef8", 8, 'stroke="' + K.navy + '" stroke-width="2"') + T(348, 280, "Else: A +", 15, K.navy, "middle", 'class="vw-n"') + T(348, 296, "reuse", 15, K.navy, "middle", 'class="vw-n"'), 348, 270);
        Rr += G("tgtS", AT(200, 256, R(-80, -15, 160, 30, "rgba(255,255,255,.9)", 6, 'stroke="#2b6f9e" stroke-width="2.5" stroke-dasharray="5 4"') + T(0, 6, "Minutes = targets", 15, "#2b6f9e", "middle", 'class="vw-n"'), 1, -4), 200, 256);
        Rr += G("rival", R(14, 70, 70, 100, "#f6f1fa", 8, 'stroke="' + K.plum + '" stroke-width="2"') + T(49, 100, "Best", 15, K.plum, "middle", 'class="vw-n"') + T(49, 120, "rival", 15, K.plum, "middle", 'class="vw-n"') + P("M28 140 H70 M28 152 H62", "#c9b8e0", 3), 49, 120);
        Rr += G("vsR", T(49, 196, "vs", 18, K.ink), 49, 190);
        return R(-1400, -1400, 3200, 3200, "#f1f3f7") + G("pE", E1, 200, 180) + G("pA", A, 200, 180) + G("pT", Tt, 200, 180) + G("pS", S, 200, 180) + G("pR", Rr, 200, 180);
      },
      init: M(only("pE"), HID(["rowL", "you", "pWhich", "ruler", "cut", "cutX", "pBoth", "pYard", "vT", "vA", "vB", "trD", "p18", "pSoon", "pCap", "deskA", "pQueue", "kioskA", "pPull", "routeB", "p60", "teams", "longBar", "pLong",
        "tCard1", "tCard2", "objs", "helpG", "p7of9", "magT", "pFlaw", "peakT", "pPeak", "tl", "janPin", "bWork", "p11", "chainT", "pFixed", "protect", "pProt", "stone1", "stone2", "stone3", "pTrapS", "pReuse", "pData", "pKit",
        "riskLn", "chB", "c1", "c2", "ck1", "ck2", "ckB", "elseA", "tgtS", "rival", "vsR"]),
        { table: { o: 1 }, pDef: { o: 0, s: 0.6 }, bT: { sx: 0.02, o: 0 }, bA: { sx: 0.02, o: 0 }, bB: { sx: 0.02, o: 0 }, hotels: { o: 1 }, opsD: { o: 1 }, pathS: { o: 1 }, pit: { o: 0 }, stone3: { y: 0 }, memo: { o: 1 }, longF: { sx: 0.05 },
          h0: { f: "#cfe0ee" }, h1: { f: "#cfe0ee" }, h2: { f: "#cfe0ee" }, h3: { f: "#cfe0ee" }, h4: { f: "#cfe0ee" }, h5: { f: "#cfe0ee" }, h6: { f: "#cfe0ee" }, h7: { f: "#cfe0ee" }, h8: { f: "#cfe0ee" }, h9: { f: "#cfe0ee" },
          h10: { f: "#cfe0ee" }, h11: { f: "#cfe0ee" }, h12: { f: "#cfe0ee" }, h13: { f: "#cfe0ee" }, tgtS: { o: 0, s: 1.4 } }),
      K: (function () {
        var lit = {}, k;
        for (k = 0; k < 14; k++) lit["h" + k] = { f: "#ffd479", w: k * 0.06 };
        return [
          { L: "A decision to defend", a: { pDef: { o: 1, s: 1 } }, e: "back", p: "pDef" },
          { L: "Which design, and why?", a: M(ON("you", "pWhich")), p: "you" },
          { L: "Shared evidence first", a: M(OFF("table", "you", "pWhich", "pDef"), ON("ruler", "pYard", "rowL"), { bT: { o: 1 }, bA: { o: 1 }, bB: { o: 1 } }), p: "ruler" },
          { L: "82, 44 and 22 minutes", dur: 1.5, a: M(OFF("pYard"), { bT: { sx: 1 }, bA: { sx: 1, w: 0.2 }, bB: { sx: 1, w: 0.4 }, vT: { o: 1, w: 1 }, vA: { o: 1, w: 1.1 }, vB: { o: 1, w: 1.2 } }), e: "out", p: "bB" },
          { L: "Both remove the 47 min", a: M(ON("cut", "pBoth"), { cutX: { o: 1, w: 0.5 } }), p: "cut" },
          { L: "Case for A: fast relief", dur: 1.4, a: M(only("pA"), ON("p18"), lit), p: "hotels" },
          { L: "Strong when time is short", a: M(OFF("p18"), ON("pSoon", "pCap")), p: ["pSoon", "pCap"] },
          { L: "A keeps the desk queue", a: M(OFF("pSoon", "pCap"), ON("deskA", "pQueue")), fx: function (f) { f.kick("deskA", 3, 0, 0); }, p: "pQueue" },
          { L: "Kiosks pull you back", a: M(OFF("pQueue"), ON("kioskA", "pPull"), { deskA: { o: 0.4 } }), p: "kioskA" },
          { L: "Case for B: desk optional", dur: 1.2, a: M(OFF("hotels", "deskA", "kioskA", "pPull", "opsD"), ON("trD", "routeB", "p60")), p: "routeB" },
          { L: "B: longer wait, more change", dur: 1.4, a: M(OFF("p60", "routeB"), ON("teams", "longBar", "pLong"), { longF: { sx: 1 } }), p: "longBar" },
          { L: "Two tensions", a: M(only("pT"), { tCard1: { o: 1 }, tCard2: { o: 1, w: 0.3 } }), e: "back", p: ["tCard1", "tCard2"] },
          { L: "7 of 9 objections", dur: 1.2, a: M(ON("objs", "helpG"), { p7of9: { o: 1, w: 0.6 } }), p: "helpG" },
          { L: "Flaw, or just visible?", a: M(ON("magT", "pFlaw")), p: "magT" },
          { L: "Test it at peak", a: M(OFF("magT", "pFlaw"), ON("peakT", "pPeak")), p: "peakT" },
          { L: "The January rule", dur: 1.3, a: M(ON("tl", "janPin", "p11"), { bWork: { o: 1, w: 0.5 } }), p: "janPin" },
          { L: "A date that cannot move", a: M(OFF("p11"), ON("chainT", "pFixed")), fx: function (f) { f.kick("janPin", 3, 0, 0); }, p: "chainT" },
          { L: "Protect the date early", a: M(OFF("pFixed"), ON("protect", "pProt")), e: "back", p: "protect" },
          { L: "A, then B?", dur: 1.2, a: M(only("pS"), ON("pTrapS"), { pit: { o: 1, w: 0.4 } }), p: "pit" },
          { L: "Only if B reuses it", a: M(ON("pReuse"), { stone1: { o: 1 }, stone2: { o: 1, w: 0.3 } }), e: "back", p: ["stone1", "stone2"] },
          { L: "Data helps, kit burdens", dur: 1.3, a: M(OFF("pReuse"), ON("pData", "pKit"), { stone3: { o: 1, y: 30 } }), fx: function (f) { f.kick("stone1", 0, -4, 0); }, p: "stone3" },
          { L: "Name the accepted risk", a: M(only("pR"), ON("riskLn", "chB", "ckB")), p: "riskLn" },
          { L: "If: desk staffed at peak", a: M(ON("c1"), { ck1: { o: 1, w: 0.5 } }), p: "c1" },
          { L: "If: a January plan", a: M(ON("c2"), { ck2: { o: 1, w: 0.5 } }), p: "c2" },
          { L: "Otherwise: A, reusable", dur: 1.2, a: M(ON("elseA"), { ck1: { o: 0.25 }, ck2: { o: 0.25 } }), p: "elseA" },
          { L: "Minutes are targets", a: M({ tgtS: { o: 1, s: 1 }, ck1: { o: 1 }, ck2: { o: 1 } }), e: "back", p: "tgtS" },
          { L: "Defend vs best rival", a: M(OFF("tgtS"), ON("rival", "vsR")), e: "back", p: "rival" }
        ];
      })()
    });
  })();
  addCSS("O2d", baseCSS("O2d", { bg: "#f1f3f7", ink: K.ink, acc: K.navy, halo: "rgba(255,255,255,.9)" }));

  /* =====================================================================
     O2e  THE INNOVATE HANDOVER  (v2 - rebuilt, audit score 6/5)
     A handover dossier with five tabs; each opens to its real content and
     names the downstream team that will use it:
       dossier tabs   benchmark: 090 Multi-Step Icon Animation (LottieFiles) - steps activate in turn
       v1 process map (standard + exception route)   benchmark: 089 Git Workflow (LottieFiles)
       v2 options record (kiosk vs phone trade-offs)  benchmark: 112 Infographics Pack (Motion Array)
       v3 baseline vs target on one yardstick         benchmark: 126 Stacked-to-grouped bars (Observable)
       v4 staff + systems requirements                benchmark: 078 Data Workflow Animation (Dribbble)
       v5 risks + tested backup                       benchmark: 094 Process - Success (LottieFiles)
       phase track / forum / ambition scale           benchmark: 136 Project TimeLine (Motion Array)
     ===================================================================== */
  (function () {
    var TABS = [["t1", "Process map"], ["t2", "Options"], ["t3", "Target"], ["t4", "Requirements"], ["t5", "Risks, backup"]];
    var VIEWS = ["v1", "v2", "v3", "v4", "v5", "vEnd"];
    function view(p) { var o = {}; VIEWS.forEach(function (n) { o[n] = { o: n === p ? 1 : 0 }; }); return o; }
    function tab(n) { var o = {}; TABS.forEach(function (t, i) { o[t[0]] = { f: t[0] === n ? "#ffd479" : "#fff" }; }); return o; }
    function node(x, y, label, col, w) { w = w || 92; return R(x - w / 2, y - 15, w, 30, "#fff", 7, 'stroke="' + col + '" stroke-width="2.5"') + T(x, y + 5, label, 15, K.ink, "middle", 'class="vw-n"'); }
    SC("O2e", {
      title: "The Innovate handover", W: 400, H: 320, acc: K.green,
      art: function () {
        var s = R(-1400, -1400, 3200, 3200, "#f3f0e8");
        /* committee + approval */
        s += G("comm", E(270, 150, 90, 20, "#b98b5e") + AT(210, 140, GUY(K.ink)) + AT(270, 132, GUY(K.plum)) + AT(330, 140, GUY(K.navy)), 270, 130);
        s += G("apprS", AT(270, 210, R(-64, -18, 128, 36, "rgba(255,255,255,.9)", 7, 'stroke="' + K.green + '" stroke-width="3"') + T(0, 6, "APPROVED", 18, K.green, "middle", 'class="vw-n"'), 1, -5), 270, 210);
        s += PILL("pUse", 270, 270, "Usable form needed", K.orange, "#fff", 15);
        /* dossier */
        s += G("doss", R(8, 50, 152, 196, "#e9dcc3", 10, 'stroke="#b39b6e" stroke-width="2"') + T(84, 72, "Handover", 15, "#6d5530", "middle", 'class="vw-n"') + R(60, 46, 48, 8, "#b39b6e", 3), 84, 148);
        var OWN = ["People & Develop", "Project leaders", "Realize Value", "People & Develop", "Implement"];
        TABS.forEach(function (t, i) {
          var y = 98 + i * 34;
          s += G(t[0], R(14, y - 14, 140, 28, "#fff", 6, 'data-f="" stroke="#b39b6e" stroke-width="1.5"') + C(28, y, 9, K.navy) + T(28, y + 5, String(i + 1), 13.5, "#fff", "middle", 'class="vw-n"').replace('font-size="13.5"', 'font-size="15"') + T(42, y + 5, t[1], 15, K.ink, "start"), 84, y);
          /* v3: each item names the downstream team that owns it */
          s += G("ow" + i, AT(174, y + 2, C(0, -4, 4, K.green) + F("M-6 6 Q-6 -1 0 -1 Q6 -1 6 6Z", K.green)) + T(184, y + 5, OWN[i], 12, K.green, "start"), 174, y);
          s += G("qq" + i, C(174, y, 9, "#fff", 'stroke="' + K.orange + '" stroke-width="2"') + T(174, y + 5, "?", 15, K.orange, "middle", 'class="vw-n"'), 174, y);
        });
        /* viewer frame */
        s += G("vf", R(166, 50, 226, 216, "#fff", 10, 'stroke="#c9c2b0" stroke-width="2"'), 279, 158);
        /* v1 process map */
        var v1 = node(210, 90, "Phone", K.green, 70) + node(300, 90, "ID ok?", K.navy, 80) + node(360, 140, "Room", K.green, 52) +
          G("r1", P("M245 90 H260 M340 90 C360 90 360 110 360 125", K.green, 3, 'data-draw="" pathLength="1"'), 300, 100) +
          G("r2", P("M300 105 V150 C300 165 290 170 280 170", K.orange, 3, 'data-draw="" pathLength="1"') + node(230, 172, "Reception", K.orange, 100) + P("M280 172 C330 172 350 160 356 156", K.orange, 2.5, 'stroke-dasharray="4 4"'), 290, 150) +
          G("roles", AT(206, 228, GUY(K.green), 0.8) + AT(232, 228, GUY(K.green), 0.8) + AT(300, 228, F("M-12 0 L0 -8 L12 0 L0 8Z", K.navy) + P("M8 3 V11", K.navy, 2)) + AT(340, 222, R(-10, -10, 20, 20, K.amber, 3) + P("M-5 0 H5 M0 -5 V5", "#fff", 2.5)), 270, 216);
        s += G("v1", v1, 279, 158);
        /* v2 options */
        var v2 = T(250, 76, "Kiosk", 15, K.navy) + T(336, 76, "Phone", 15, K.green) +
          [["Speed", "+", "++"], ["Change", "low", "high"], ["Risk", "low", "high"]].map(function (r, i) {
            var y = 110 + i * 34;
            return T(176, y + 5, r[0], 15, K.ink, "start") + T(250, y + 5, r[1], 15, K.navy) + T(336, y + 5, r[2], 15, K.green) + P("M176 " + (y + 17) + " H384", "#eee6d6", 1.5);
          }).join("") + G("trace", P("M336 84 V196", K.green, 3) + TAGOK(336, 214) + T(282, 246, "Reasons kept", 15, K.green), 320, 214);
        s += G("v2", v2, 279, 158);
        /* v3 target */
        var v3 = T(176, 92, "Baseline", 15, K.ink, "start") + G("b82", R(176, 100, 208, 24, "#9aa7b8", 5), 176, 112) + G("l82", T(380, 118, "82 min", 15, "#fff", "end", 'class="vw-n"'), 360, 112) +
          T(176, 150, "Target", 15, K.green, "start") + G("b22", R(176, 158, 56, 24, "none", 5, 'stroke="' + K.green + '" stroke-width="2.5" stroke-dasharray="6 4"'), 176, 170) + G("l22", T(240, 176, "22 min", 15, K.green, "start"), 262, 170) +
          G("tags3", T(300, 92, "measured", 15, K.slate, "middle") + T(300, 150, "modelled", 15, K.green, "middle"), 300, 120) +
          G("ruler3", P("M176 206 H384", K.ink, 2) + [0, 20, 40, 60, 80].map(function (m) { var x = r2(176 + m * 208 / 82); return P("M" + x + " 200 V212", K.ink, 1.5) + T(x, 196, String(m), 11, K.slate); }).join("") + T(280, 230, "Lobby to room, minutes", 14, K.ink), 280, 214) +
          G("rvMag", AT(214, 170, C(0, 0, 20, "rgba(255,255,255,.35)", 'stroke="' + K.ink + '" stroke-width="3"') + P("M14 14 L26 26", K.ink, 4)), 214, 170) +
          G("easy", R(176, 238, 60, 20, "#fde3d6", 5) + T(244, 253, "Desk time", 15, K.red, "start") + TAGX(340, 248), 260, 248);
        s += G("v3", v3, 279, 158);
        /* v4 requirements */
        var v4 = AT(212, 120, GUY(K.green), 1.1) + AT(212, 84, F("M-14 0 L0 -7 L14 0 L0 7Z", K.navy) + P("M8 3 V11", K.navy, 2)) + T(212, 146, "Train staff", 15, K.ink) +
          node(330, 80, "Bookings", K.navy, 90) + node(330, 130, "Rooms", K.plum, 90) + node(330, 180, "Access", K.green, 90) +
          G("links4", P("M330 95 V115 M330 145 V165", K.green, 4, 'class="vw-flow"'), 330, 130) +
          G("chk4", R(180, 170, 90, 76, "#f6f1e6", 6) + TAGOK(196, 192) + TAGOK(196, 224) + P("M210 192 H258 M210 224 H252", "#c9c2b0", 3), 225, 208);
        s += G("v4", v4, 279, 158);
        /* v5 risks + backup */
        var v5 = F("M200 70 l16 28 h-32Z", K.amber, 'stroke="' + K.ink + '" stroke-width="1.5"') + T(200, 94, "!", 15, K.ink, "middle", 'class="vw-n"') + T(226, 92, "Digital ID fails", 15, K.ink, "start") +
          G("bk5", node(230, 150, "ID fails", K.red, 84) + P("M272 150 H300", K.green, 3) + node(340, 150, "Staff check", K.green, 84) + P("M340 165 V190", K.green, 3) + node(340, 206, "Room", K.green, 60), 290, 170) +
          G("test5", R(178, 192, 104, 46, "#e3f3ea", 8, 'stroke="' + K.green + '" stroke-width="2"') + TAGOK(196, 215) + T(212, 220, "Tested", 15, K.green, "start"), 230, 215);
        s += G("v5", v5, 279, 158);
        /* end view: phase track */
        var ve = [["Innovate", K.slate], ["People", K.green], ["Develop", K.navy], ["Implement", K.orange], ["Realize Value", K.plum]].map(function (p, i) {
          var y = 76 + i * 38;
          return G("ph" + i, R(186, y - 14, 190, 28, "#fff", 14, 'data-f="" stroke="' + p[1] + '" stroke-width="2"') + T(281, y + 5, p[0], 15, p[1], "middle", 'class="vw-n"'), 281, y) + (i < 4 ? P("M281 " + (y + 14) + " V" + (y + 24), "#c9c2b0", 2) : "");
        }).join("");
        s += G("vEnd", ve, 279, 158);
        s += G("pkt", R(166, 64, 22, 26, "#e9dcc3", 3, 'stroke="#b39b6e" stroke-width="1.5"'), 177, 77);
        /* forum + ambition */
        s += G("forum", R(196, 70, 80, 80, "#e6dcf2", 6, 'stroke="' + K.plum + '" stroke-width="2"') + R(226, 112, 20, 38, K.plum, 2) + P("M216 86 V96 M211 91 H221", "#fff", 3) + T(236, 172, "New case", 15, K.plum), 236, 120);
        s += G("scaleE", P("M180 240 H380", K.ink, 4) + F("M274 280 L280 242 L286 280Z", K.ink) + R(176, 214, 86, 26, K.orange, 6) + T(219, 232, "Bolder", 15, "#fff", "middle", 'class="vw-n"') +
          R(298, 214, 86, 26, K.navy, 6) + T(341, 232, "Safer", 15, "#fff", "middle", 'class="vw-n"'), 280, 240);
        /* bottom pills */
        var B = [["pFive", "Five things inside"], ["pPD", "For: People, Develop"], ["pDM", "For: decision-makers"], ["pRV", "For: Realize Value"], ["pSame", "Same yardstick"], ["pEasy", "No easier measure"],
          ["pImp", "For: Implement"], ["pQs", "Answers their questions"], ["pOwn", "Named owners"], ["pGood", "Routes, owners, target"], ["pNot", "Not proven yet"], ["pPeople", "Next: People phase"], ["pForum", "Forum: new case"], ["pDefend", "Defend your ambition"]];
        B.forEach(function (b) { s += PILL(b[0], 200, 292, b[1], K.ink, "#fff", 15); });
        return s;
      },
      init: M(view(null), HID(["apprS", "pUse", "doss", "t1", "t2", "t3", "t4", "t5", "vf", "pkt", "forum", "scaleE", "ow0", "ow1", "ow2", "ow3", "ow4", "qq0", "qq1", "qq2", "qq3", "qq4",
        "pFive", "pPD", "pDM", "pRV", "pSame", "pEasy", "pImp", "pQs", "pOwn", "pGood", "pNot", "pPeople", "pForum", "pDefend", "r2", "roles", "trace", "tags3", "ruler3", "rvMag", "easy", "chk4", "bk5", "test5"]),
        tab(null), { comm: { o: 1 }, r1: { d: 0 }, b82: { sx: 0.02 }, b22: { sx: 0.02 }, l82: { o: 0 }, l22: { o: 0 }, links4: { o: 0 }, ph0: { f: "#fff" }, ph1: { f: "#fff" }, ph2: { f: "#fff" }, ph3: { f: "#fff" }, ph4: { f: "#fff" },
          pkt: { y: 0 }, apprS: { s: 1.5 } }),
      K: (function () {
        var PB = ["pFive", "pPD", "pDM", "pRV", "pSame", "pEasy", "pImp", "pQs", "pOwn", "pGood", "pNot", "pPeople", "pForum", "pDefend"];
        function pb(n) { var o = {}; PB.forEach(function (k) { o[k] = { o: k === n ? 1 : 0 }; }); return o; }
        return [
          { L: "What gets handed over?", a: M(pb(), ON("doss"), { comm: { o: 1 } }), p: "doss" },
          { L: "Approval isn't enough", a: M(pb(), ON("pUse"), { apprS: { o: 1, s: 1 } }), e: "back", fx: function (f) { f.kick("apprS", 3, 0, 0); }, p: "pUse" },
          { L: "Five things inside", dur: 1.2, a: M(pb("pFive"), OFF("comm", "apprS", "pUse"), ON("vf"), { t1: { o: 1 }, t2: { o: 1, w: 0.1 }, t3: { o: 1, w: 0.2 }, t4: { o: 1, w: 0.3 }, t5: { o: 1, w: 0.4 } }), p: "doss" },
          { L: "1. Future process map", dur: 1.3, a: M(pb(), tab("t1"), view("v1"), { r1: { d: 1, w: 0.3 } }), p: "t1" },
          { L: "The exception route", dur: 1.3, a: M(pb(), { r2: { o: 1 } }), p: "r2" },
          { L: "For People and Develop", a: M(pb("pPD"), ON("roles")), p: "roles" },
          { L: "2. Options considered", a: M(pb(), tab("t2"), view("v2")), p: "t2" },
          { L: "A traceable choice", a: M(pb("pDM"), ON("trace")), p: "trace" },
          { L: "3. A measurable target", a: M(pb(), tab("t3"), view("v3")), p: "t3" },
          { L: "82 today, 22 modelled", dur: 1.4, a: M(pb(), { b82: { sx: 1 }, l82: { o: 1, w: 0.8 }, b22: { sx: 1, w: 0.4 }, l22: { o: 1, w: 1 }, ruler3: { o: 1, w: 0.2 } }), e: "out", p: "b22" },
          { L: "Baseline vs target", a: M(pb(), ON("tags3")), p: "tags3" },
          { L: "Realize Value checks it", a: M(pb("pRV"), ON("rvMag")), p: "rvMag" },
          { L: "Same lobby-to-room measure", a: M(pb("pSame"), OFF("rvMag"), ON("ruler3")), p: "ruler3" },
          { L: "No easier measure", a: M(pb("pEasy"), ON("easy")), fx: function (f) { f.kick("easy", 4, 0, 0); }, p: "easy" },
          { L: "4. Staff and systems", dur: 1.2, a: M(pb(), tab("t4"), view("v4"), { links4: { o: 1, w: 0.5 } }), p: "t4" },
          { L: "Prepare staff, plan tech", a: M(pb("pPD"), ON("chk4")), p: "chk4" },
          { L: "5. Risks and backup", a: M(pb(), tab("t5"), view("v5")), p: "t5" },
          { L: "Manual check if ID fails", a: M(pb(), ON("bk5")), p: "bk5" },
          { L: "Implement tests backup", a: M(pb("pImp"), ON("test5")), e: "back", p: "test5" },
          { L: "Every item answers someone", a: M(pb("pQs"), tab(null), view(null), { vf: { o: 0.4 }, qq0: { o: 1 }, qq1: { o: 1, w: 0.1 }, qq2: { o: 1, w: 0.2 }, qq3: { o: 1, w: 0.3 }, qq4: { o: 1, w: 0.4 } }), p: "doss" },
          { L: "Name the owners", a: M(pb("pOwn"), OFF("qq0", "qq1", "qq2", "qq3", "qq4"), { ow0: { o: 1 }, ow1: { o: 1, w: 0.1 }, ow2: { o: 1, w: 0.2 }, ow3: { o: 1, w: 0.3 }, ow4: { o: 1, w: 0.4 } }), p: ["ow0", "ow4"] },
          { L: "Routes, owners, target", a: M(pb("pGood"), view("v1"), { vf: { o: 1 }, t1: { f: "#ffd479" }, t3: { f: "#ffd479" } }), p: ["t1", "t3"] },
          { L: "Not proven yet", dur: 1.6, a: M(pb("pNot"), tab(null), view("vEnd"), { vf: { o: 1 }, ph0: { f: "#ffd479" }, pkt: { o: 1, y: 0 } }), p: "ph0" },
          { L: "Next: the People phase", dur: 1.2, a: M(pb("pPeople"), { ph0: { f: "#fff" }, ph1: { f: "#ffd479" }, pkt: { y: 38 } }), p: "ph1" },
          { L: "Forum: a new case", a: M(pb("pForum"), view(null), OFF("pkt"), ON("forum")), e: "back", p: "forum" },
          { L: "Defend your ambition", dur: 1.2, a: M(pb("pDefend"), ON("scaleE"), { forum: { o: 0.3 } }), e: "back", p: "scaleE" }
        ];
      })()
    });
  })();
  addCSS("O2e", baseCSS("O2e", { bg: "#f3f0e8", ink: K.ink, acc: K.green, halo: "rgba(255,255,255,.9)" }));

})();
// END FILE
