// OPER621 · Week 11 · The Develop Phase — animated teaching scenes, version 2
// File: w11-claude-v2-part1.js  ·  Scenes: W11O1a, W11O1b, W11O1c, W11O3a
// Rebuilt from the narration-to-animation content audit: every narration line
// maps to one named shot family (benchmark template noted beside each family)
// whose state shows what that sentence says on Qasr's corporate-rate booking.
// Standalone part: registers its scenes and appends its own scoped rules into
// the single shared <style id="vl-sc-w11">. Parts may be concatenated in any order.
// Contract: VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
(() => {
"use strict";
// ===== shared engine (self-contained copy in every part) =====
window.VL_SCENES = window.VL_SCENES || {};
const VL_SCENES = window.VL_SCENES;
const PART = "p1";
const C = {
  navy: "#1f4e79", navy2: "#2d6a9f", orange: "#c0502a", paper: "#fbf8f1",
  ink: "#1b2a3a", blue: "#dbe7f2", green: "#317c61", gold: "#e5b76c",
  muted: "#91aabd", plum: "#6b4e8a", sand: "#efe4cf", sky: "#eaf2f8",
  red: "#b0362b", white: "#ffffff", mint: "#e1f0e8", peach: "#f8e3d8",
  lilac: "#ece6f3", slate: "#5d7389", night: "#1d3350", amber: "#a8741a"
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
const D = (k, d, s, w = 3, ex = "") => `<path data-k="${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100" ${ex}/>`;
const T = (x, y, s, sz = 14, f = C.ink, ex = "", a = "middle") => `<text x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const TK = (k, x, y, s, sz = 14, f = C.ink, a = "middle", ex = "") => `<text data-k="${k}" x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const K = (k, body, ex = "") => `<g data-k="${k}" ${ex}>${body}</g>`;
const H = (k, body, ex = "") => `<g data-k="${k}" style="opacity:0" ${ex}>${body}</g>`;
const tw = (s, sz) => Math.round(String(s).length * sz * 0.6 + sz * 1.3);
const chip = (x, y, s, o = {}) => {
  const sz = o.sz || 13, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.9);
  return R(x - w / 2, y - h / 2, w, h, o.bg || C.white, o.rx == null ? h / 2 : o.rx,
    `stroke="${o.st || C.navy}" stroke-width="${o.sw || 1.7}"${o.dash ? ' stroke-dasharray="4 3"' : ""}`) +
    T(x, y + sz * 0.36, s, sz, o.fg || C.navy);
};
const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${x - 7 * s} ${y} l${5 * s} ${5 * s} l${10 * s} ${-11 * s}`, col, w);
const cross = (x, y, s = 1, col = C.orange, w = 3) => P(`M${x - 6 * s} ${y - 6 * s} l${12 * s} ${12 * s} M${x + 6 * s} ${y - 6 * s} l${-12 * s} ${12 * s}`, col, w);
const person = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}</g>`;
const buddy = (x, y, r, col) => O(x, y, r, col) + O(x - r * 0.35, y - r * 0.12, r * 0.24, C.white) + O(x + r * 0.35, y - r * 0.12, r * 0.24, C.white) + O(x - r * 0.3, y - r * 0.08, r * 0.11, C.ink) + O(x + r * 0.4, y - r * 0.08, r * 0.11, C.ink);
const clockI = (x, y, r, col = C.orange, bg = C.white) => O(x, y, r, bg, `stroke="${col}" stroke-width="${Math.max(2, r / 6)}"`) + P(`M${x} ${y - r * 0.62} V${y} L${x + r * 0.45} ${y + r * 0.3}`, col, Math.max(2, r / 7));
const moon = (x, y, r, col = C.gold) => F(`M${x} ${y - r} A${r} ${r} 0 1 0 ${x} ${y + r} A${r * 1.3} ${r * 1.3} 0 0 1 ${x} ${y - r} Z`, col);
const star = (x, y, s = 1, col = C.gold) => F(`M${x} ${y - 10 * s} l${3 * s} ${6 * s} ${7 * s} ${1 * s} ${-5 * s} ${5 * s} ${1 * s} ${7 * s} ${-6 * s} ${-3 * s} ${-6 * s} ${3 * s} ${1 * s} ${-7 * s} ${-5 * s} ${-5 * s} ${7 * s} ${-1 * s} Z`, col, `stroke="${C.amber}" stroke-width="1"`);
const envelope = (x, y, col = C.orange) => R(x - 11, y - 8, 22, 16, C.white, 2, `stroke="${col}" stroke-width="1.6"`) + P(`M${x - 11} ${y - 8} L${x} ${y + 1} L${x + 11} ${y - 8}`, col, 1.5);
const bookTok = (col = C.navy2) => R(-15, -11, 30, 22, col, 4) + P("M-9 -4 H9 M-9 2 H5", C.white, 2) + O(9, 6, 2.5, C.gold);
const gear = (x, y, r, col, hole = C.paper) => {
  let d = ""; const n = 8;
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n * 0.55, a2 = a0 + Math.PI / n, a3 = a2 + Math.PI / n * 0.45;
    const p = (a, rr) => `${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`;
    d += (i ? "L" : "M") + p(a0, r) + "L" + p(a1, r) + "L" + p(a2, r * 0.78) + "L" + p(a3, r * 0.78);
  }
  return F(d + "Z", col) + O(x, y, r * 0.34, hole);
};

// ---- prefixed builders for shot families ----
const pfx = (p) => ({
  p,
  K: (k, b, e) => K(p + k, b, e),
  H: (k, b, e) => H(p + k, b, e),
  D: (k, d, s, w, e) => D(p + k, d, s, w, e),
  TK: (k, x, y, s, sz, f, a, e) => TK(p + k, x, y, s, sz, f, a, e)
});
const pc = (c, p) => {
  const o = { p, snap: c.snap, all: c.all, opEl: c.opEl, mvEl: c.mvEl, flEl: c.flEl, data: c.data };
  ["op", "mv", "dr", "fl", "tx", "cl"].forEach((m) => { o[m] = (k, ...a) => c[m](p + k, ...a); });
  o.vis = (m, t) => { const q = {}; Object.keys(m).forEach((k) => { q[p + k] = m[k]; }); c.vis(q, t); };
  return o;
};
// auto-sized note chips: variants N(avy) O(range) R(ed) G(reen) P(lum) F(illed)
const NOTE_COL = { N: [C.navy, C.white, C.navy], O: [C.orange, C.white, C.orange], R: [C.red, C.white, C.red], G: [C.green, C.white, C.green], P: [C.plum, C.white, C.plum], F: [C.navy, C.navy, C.white], A: [C.amber, C.white, C.amber] };
const noteSVG = (f, key, x, y, sz = 13) => Object.keys(NOTE_COL).map((v) => {
  const [st, bg, fg] = NOTE_COL[v];
  return f.H(key + v, R(x - 40, y - 13, 80, 26, bg, 13, `stroke="${st}" stroke-width="1.8"`) + f.TK(key + v + "T", x, y + sz * 0.36, "", sz, fg), `data-cx="${x}" data-sz="${sz}"`);
}).join("");
function setNote(c, key, n) {
  const v = n ? (typeof n === "string" ? "N" : (n.c || "N")) : "";
  const t = n ? (typeof n === "string" ? n : n.t) : "";
  Object.keys(NOTE_COL).forEach((q) => {
    if (q === v) {
      c.tx(key + q + "T", t);
      c.all(`[data-k="${c.p}${key}${q}"]`).forEach((g) => {
        const r = g.querySelector("rect"); const cx = +g.getAttribute("data-cx"); const sz = +g.getAttribute("data-sz") || 13;
        const w = Math.round(t.length * sz * 0.6 + sz * 1.6);
        if (r) { r.setAttribute("x", String(cx - w / 2)); r.setAttribute("width", String(w)); }
      });
    }
    c.op(key + q, q === v ? 1 : 0);
  });
}

// ---- per-part stylesheet (appended once into the shared <style id="vl-sc-w11">) ----
function sceneCSS(id, bg) {
  const s = ".vls-w11-" + id;
  return `
${s}{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:220px;overflow:hidden!important;box-sizing:border-box;border-radius:14px;background:${bg};color:${C.ink};font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w11-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w11-fig>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}
${s} svg text{font-family:inherit;font-weight:700;letter-spacing:.1px}
${s} [data-k]{transform-box:fill-box;transform-origin:50% 50%}
${s}.w11-css [data-k]{transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.85s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}
${s}.w11-snap [data-k],${s}.w11-rm [data-k]{transition:none!important}
${s}.w11-rm *,${s}.w11-snap *{animation:none!important}
${s} .w11-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:36px;padding:6px 12px 8px;font-size:14px;font-weight:700;line-height:1.25;color:${C.navy};background:rgba(255,255,255,.6);border-top:1px solid rgba(31,78,121,.12)}
${s} .w11-num{flex:0 0 auto;min-width:34px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w11-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.2px}
${s} .w11-lab.w11-in{animation:vlsw11CapIn .5s cubic-bezier(.22,.8,.24,1)}
${s} .w11-bar{flex:0 0 54px;height:4px;border-radius:4px;background:rgba(31,78,121,.15);overflow:hidden}
${s} .w11-bar i{display:block;height:100%;width:0;background:${C.orange};transition:width .6s ease}
${s}.w11-intro .w11-fig>svg{animation:vlsw11Intro .7s cubic-bezier(.22,.8,.24,1)}
${s} .a-flow{stroke-dasharray:5 7;animation:vlsw11Flow 1.1s linear infinite}
${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw11Spin 6s linear infinite}
${s} .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw11Bob 2.6s ease-in-out infinite}
${s} .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw11Pulse 2s ease-in-out infinite}
${s} .a-blink{animation:vlsw11Blink 1.4s ease-in-out infinite}
${s} .a-shake{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw11Shake .9s ease-in-out infinite}
@media (max-width:420px){${s} .w11-cap{font-size:13px;min-height:32px;padding:5px 10px 7px}${s} .w11-bar{flex-basis:40px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
}
const KEYFRAMES = `
@keyframes vlsw11CapIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes vlsw11Intro{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
@keyframes vlsw11Flow{to{stroke-dashoffset:-24}}
@keyframes vlsw11Spin{to{transform:rotate(360deg)}}
@keyframes vlsw11Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes vlsw11Pulse{0%,100%{opacity:.35;transform:scale(.94)}50%{opacity:.95;transform:scale(1.06)}}
@keyframes vlsw11Blink{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes vlsw11Shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}
`;
function addStyles(list) {
  if (typeof document === "undefined") return;
  let st = document.getElementById("vl-sc-w11");
  if (!st) { st = document.createElement("style"); st.id = "vl-sc-w11"; (document.head || document.documentElement).appendChild(st); }
  const flag = "w11claudev2" + PART;
  if (st.getAttribute("data-" + flag)) return;
  st.setAttribute("data-" + flag, "1");
  st.appendChild(document.createTextNode(KEYFRAMES + list.map(([id, bg]) => sceneCSS(id, bg)).join("\n")));
}

// ---- scene factory: build(el), step(i,n), reset() ----
function makeScene(cfg) {
  const { id, N, labels } = cfg;
  let root = null, useG = false;
  const mapK = (i, n) => {
    const nn = Math.max(1, Math.floor(num(n, N)));
    const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
    return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
  };
  const nodes = (k) => (root ? Array.prototype.slice.call(root.querySelectorAll('[data-k="' + k + '"]')) : []);
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
  function ctx(snap) {
    return {
      snap,
      op: (k, o, t = {}) => nodes(k).forEach((el) => op(el, o, t, snap)),
      mv: (k, st, t = {}) => nodes(k).forEach((el) => tf(el, st, t, snap)),
      dr: (k, f, t = {}) => nodes(k).forEach((el) => dash(el, f, t, snap)),
      fl: (k, col, t = {}) => nodes(k).forEach((el) => fill(el, col, t, snap)),
      tx: (k, s) => nodes(k).forEach((el) => { if (el.textContent !== String(s)) el.textContent = String(s); }),
      cl: (k, cls, on) => nodes(k).forEach((el) => el.classList.toggle(cls, !!on)),
      vis: (map, t = {}) => Object.keys(map).forEach((k) => { const v = map[k]; const o = typeof v === "number" ? clamp(v, 0, 1) : (v ? 1 : 0); nodes(k).forEach((el) => op(el, o, t, snap)); }),
      all: (sel) => (root ? Array.prototype.slice.call(root.querySelectorAll(sel)) : []),
      opEl: (el, o, t = {}) => op(el, o, t, snap),
      mvEl: (el, st, t = {}) => tf(el, st, t, snap),
      flEl: (el, col, t = {}) => fill(el, col, t, snap),
      data: (n, v) => { if (root) root.setAttribute("data-" + n, String(v)); }
    };
  }
  function caption(k, snap) {
    const lab = root.querySelector(".w11-lab"), nn = root.querySelector(".w11-num"), bar = root.querySelector(".w11-bar i");
    const txt = labels[k] || "";
    if (lab && lab.textContent !== txt) {
      lab.textContent = txt;
      if (!snap && !reduced()) { lab.classList.remove("w11-in"); void lab.offsetWidth; lab.classList.add("w11-in"); }
    }
    if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
    if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
  }
  function render(k, snap) {
    if (!root) return;
    if (snap) root.classList.add("w11-snap");
    try { cfg.render(ctx(snap), k); } catch (e) { if (window.console) console.warn("[VL W11 " + id + "]", e); }
    caption(k, snap);
    if (snap) { void root.offsetWidth; root.classList.remove("w11-snap"); }
    root.setAttribute("data-moment", String(k));
  }
  function kill() {
    if (root && useG) { try { window.gsap.killTweensOf(root.querySelectorAll("[data-k]")); } catch (_) {} }
  }
  function mount(el) {
    const r = document.createElement("div");
    r.className = "vls-w11-" + id + " w11-root" + (useG ? " w11-gsap" : " w11-css") + (reduced() ? " w11-rm" : " w11-intro");
    r.setAttribute("data-scene", id);
    r.innerHTML = '<div class="w11-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
      esc(cfg.desc) + '">' + cfg.draw() + '</svg></div><div class="w11-cap" aria-hidden="true"><span class="w11-num"></span><span class="w11-lab"></span><span class="w11-bar"><i></i></span></div>';
    if (typeof el.replaceChildren === "function") el.replaceChildren(r);
    else { el.innerHTML = ""; el.appendChild(r); }
    return r;
  }
  return {
    build(el) {
      if (!el || el.nodeType !== 1) return;
      kill();
      useG = hasG();
      root = mount(el);
      render(0, true);
    },
    step(i, n) { if (!root) return; render(mapK(i, n), false); },
    reset() { if (!root) return; kill(); render(0, true); }
  };
}

// ---- shot-based scene: every narration moment names one shot family + its state ----
// plan: [[shotName, stateObject, caption], ...] (one entry per narration line)
function shotScene(cfg) {
  const names = Object.keys(cfg.shots);
  const inst = {};
  names.forEach((nm) => { inst[nm] = cfg.shots[nm]; });
  const draw = () => R(-400, -300, 1200, 900, cfg.bg) +
    names.map((nm) => `<g data-k="SH_${nm}" style="opacity:0">${inst[nm].draw()}</g>`).join("");
  const render = (c, k) => {
    const [act, st] = cfg.plan[k];
    names.forEach((nm) => {
      const on = nm === act;
      c.op("SH_" + nm, on ? 1 : 0, { d: on ? 0.55 : 0.35, dl: on ? 0.12 : 0 });
      c.mv("SH_" + nm, on ? {} : { y: 10, s: 0.97 }, { d: 0.6 });
    });
    const shot = inst[act];
    shot.render(pc(c, shot.p), st || {}, k);
    c.data("benchmark", shot.bench);
    c.data("shot", act);
  };
  return makeScene({ id: cfg.id, N: cfg.plan.length, labels: cfg.plan.map((x) => x[2]), draw, render, desc: cfg.desc });
}

// =====================================================================
// SHOT FAMILY: RULES — evaluate the agreement vs. forward an approval
// Benchmark template: "Workflow AI Animation" (Dribbble 26275497) — data
// advances through stages; plus "Automated Workflows" (LottieFiles
// XR2hxXOdEK) — trigger, evaluate, complete.
// =====================================================================
function F_RULES(p) {
  const f = pfx(p);
  const doc = (x, y, l1, l2, col) => R(x, y, 104, 48, C.white, 8, `stroke="${col}" stroke-width="2"`) +
    R(x + 9, y + 12, 16, 22, "#eef3f8", 2, `stroke="${col}" stroke-width="1.4"`) +
    P(`M${x + 12} ${y + 18} h10 M${x + 12} ${y + 23} h10 M${x + 12} ${y + 28} h7`, col, 1.2) +
    T(x + 64, y + 21, l1, 13, col) + T(x + 64, y + 38, l2, 13, col);
  const POS = { start: [128, 132], dia: [204, 92], out: [300, 62], fwd: [64, 186], rev: [140, 226], hum: [332, 232] };
  return {
    p, bench: "Workflow AI Animation (Dribbble) + Automated Workflows (LottieFiles)",
    draw() {
      let s = "";
      s += f.K("agr", doc(12, 44, "Corporate", "agreement", C.navy));
      s += f.H("agrX", R(12, 44, 104, 48, C.white, 8, `stroke="${C.red}" stroke-width="2.4" stroke-dasharray="5 4"`) + T(64, 73, "Unavailable", 13, C.red));
      s += f.K("bkg", doc(12, 108, "Booking", "details", C.navy2));
      s += f.D("a1", "M116 68 C142 68 150 84 168 92", C.navy, 2.6);
      s += f.D("a2", "M116 132 C142 132 150 100 168 92", C.navy, 2.6);
      s += f.H("lbl", chip(142, 28, "Interface", { sz: 13, st: C.navy2, fg: C.navy2 }) + P("M142 37 V64", C.navy2, 1.4, 'stroke-dasharray="3 3"') + chip(204, 150, "Business rule", { sz: 13, st: C.plum, fg: C.plum }));
      s += f.K("dia", F("M204 56 L240 92 L204 128 L168 92 Z", C.navy) + f.TK("dA", 204, 89, "Apply", 13, C.white) + f.TK("dB", 204, 105, "rules", 13, C.white));
      s += f.H("gear", `<g class="a-spin">${gear(204, 92, 24, C.gold, C.navy)}</g>`);
      s += f.H("xc", cross(204, 92, 2.4, C.red, 5));
      s += f.H("mag", O(226, 74, 15, "rgba(255,255,255,.35)", `stroke="${C.ink}" stroke-width="3"`) + P("M237 85 L249 97", C.ink, 5));
      s += f.D("aO", "M240 92 H268", C.green, 3);
      s += f.H("out", R(272, 74, 120, 36, C.green, 18) + T(332, 97, "Rate confirmed", 13, C.white));
      s += f.H("q3", chip(330, 52, "How evaluated?", { st: C.orange, fg: C.orange, dash: 1 }) + chip(330, 92, "Which system?", { st: C.orange, fg: C.orange, dash: 1 }) + chip(330, 132, "If it fails?", { st: C.orange, fg: C.orange, dash: 1 }));
      s += f.D("aF", "M64 156 V226 H136", C.orange, 2.6);
      s += f.H("rev", person(178, 238, 1.15, C.orange) + T(178, 274, "Revenue office", 13, C.orange));
      s += f.D("aH", "M202 232 H268", C.orange, 3);
      s += f.H("hum", R(272, 214, 120, 36, C.orange, 18) + f.TK("hT", 332, 237, "Human approval", 13, C.white));
      for (let i = 0; i < 5; i++) s += f.H("q" + i, envelope(150, 204 - i * 11));
      s += f.H("fx", cross(100, 226, 1.4, C.red, 4));
      s += f.H("fok", O(100, 226, 10, C.green) + tick(100, 226, 0.55, C.white, 2));
      s += f.H("night", moon(380, 24, 11, C.gold));
      s += f.H("spin", O(380, 212, 8, "none", `stroke="${C.orange}" stroke-width="2.5" stroke-dasharray="12 8" class="a-spin"`));
      s += f.H("env", envelope(0, 0));
      s += f.H("tok", bookTok());
      s += noteSVG(f, "nt", 204, 22) + noteSVG(f, "nl", 104, 22) + noteSVG(f, "nr", 316, 168) + noteSVG(f, "nb", 320, 278);
      return s;
    },
    render(c, s) {
      const ev = s.ev !== 0, fw = !!s.fw, blocked = !!(s.xc || s.q3 || s.miss);
      const dE = s.hl === "fw" ? 0.28 : 1, dF = s.hl === "ev" ? 0.28 : 1;
      c.op("agrX", s.miss ? 1 : 0); c.op("agr", s.miss ? 0.12 : 1);
      c.dr("a1", 1); c.dr("a2", 1, { dl: 0.15 });
      c.op("a1", dE); c.op("a2", dE);
      c.tx("dA", s.dA || "Apply"); c.tx("dB", s.dB || "rules");
      c.op("dia", dE);
      c.mv("dia", s.pulse ? { s: 1.08 } : {});
      c.vis({ lbl: s.lbl, gear: s.gear, xc: s.xc, mag: s.mag, q3: s.q3, night: s.night, fx: s.fx, fok: s.fok, spin: s.open });
      const outOn = ev && !blocked;
      c.dr("aO", outOn ? 1 : 0, { dl: 0.5 }); c.op("aO", dE);
      c.op("out", outOn ? dE : 0, { dl: outOn ? 0.7 : 0 });
      c.mv("out", outOn ? {} : { x: -20 });
      c.dr("aF", fw ? 1 : 0); c.op("aF", dF);
      c.op("rev", fw ? dF : 0); c.dr("aH", fw && s.hum !== 0 ? 1 : 0, { dl: 0.4 }); c.op("aH", dF);
      c.tx("hT", s.hT || "Human approval");
      c.op("hum", fw && s.hum !== 0 ? dF : 0, { dl: 0.6 });
      for (let i = 0; i < 5; i++) { c.op("q" + i, i < (s.q || 0) ? 1 : 0, { dl: i * 0.08 }); c.mv("q" + i, i < (s.q || 0) ? {} : { x: -30 }); }
      const tp = s.tok && POS[s.tok];
      c.op("tok", tp ? 1 : 0);
      if (tp) c.mv("tok", { x: tp[0], y: tp[1] }, { d: 1.1, e: "power2.inOut" });
      c.cl("tok", "a-shake", s.tok === "dia" && blocked);
      const ep = s.env && POS[s.env];
      c.op("env", ep ? 1 : 0);
      if (ep) c.mv("env", { x: ep[0], y: ep[1] }, { d: 1.2, e: "power2.inOut" });
      setNote(c, "nt", s.nt); setNote(c, "nl", s.nl); setNote(c, "nr", s.nr); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: QUEUE — approval queue, clock, night shift, 06:00 deadline
// Benchmark template: "Bottling factory" (LottieFiles 53Q3SoGu0x) —
// items advance to a station and wait; plus "Process-Para" ring timer.
// =====================================================================
function F_QUEUE(p) {
  const f = pfx(p);
  const NC = 9;
  const card = () => R(-24, -7, 48, 14, C.white, 3, `stroke="${C.navy}" stroke-width="1.4"`) + R(-24, -7, 9, 14, C.navy2, 2) + P("M-10 0 H16", C.muted, 2);
  const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
  return {
    p, bench: "Bottling factory (LottieFiles) + Process-Para timer (LottieFiles)",
    draw() {
      let s = "";
      s += `<rect data-k="${p}sky" x="-400" y="-300" width="1200" height="430" fill="#e3eef8"/>`;
      s += R(-400, 130, 1200, 600, "#efe8da") + P("M-400 130 H800", "#d8ccb4", 2);
      s += f.K("sun", O(46, 42, 16, C.gold) + rep(8, (i) => { const a = i * Math.PI / 4; return P(`M${46 + 22 * Math.cos(a)} ${42 + 22 * Math.sin(a)} L${46 + 28 * Math.cos(a)} ${42 + 28 * Math.sin(a)}`, C.gold, 2.4); }));
      s += f.H("moon", moon(46, 42, 16, C.gold) + O(80, 26, 1.6, C.white) + O(96, 58, 1.4, C.white) + O(20, 74, 1.4, C.white));
      s += K(p + "clock", O(330, 62, 32, C.white, `stroke="${C.navy}" stroke-width="3"`) + rep(12, (i) => { const a = i * Math.PI / 6; return P(`M${330 + 26 * Math.sin(a)} ${62 - 26 * Math.cos(a)} L${330 + 30 * Math.sin(a)} ${62 - 30 * Math.cos(a)}`, C.navy, i % 3 ? 1.4 : 2.6); }) + O(330, 62, 3.5, C.navy));
      s += K(p + "hand", P("M330 62 V36", C.orange, 3.4));
      s += noteSVG(f, "clk", 312, 112, 14);
      s += R(14, 206, 132, 10, "#8a6a3a", 3) + T(80, 236, "Revenue office", 13, C.navy);
      s += f.K("s0", person(48, 198, 1, C.navy));
      s += f.H("s1", person(80, 198, 1, C.plum));
      s += f.H("s2", person(112, 198, 1, C.plum));
      s += R(250, 206, 140, 10, "#8a6a3a", 3) + T(320, 236, "Reception", 13, C.navy);
      s += K(p + "rcp", person(270, 198, 1, C.navy2));
      s += f.H("guest", `<g class="a-bob">${buddy(372, 186, 11, C.navy2)}</g>`);
      s += f.H("gw", clockI(372, 158, 10, C.red));
      s += f.H("gok", O(372, 160, 10, C.green) + tick(372, 160, 0.55, C.white, 2));
      for (let i = 0; i < NC; i++) s += f.H("c" + i, card());
      s += f.H("ns", R(150, 56, 62, 164, "none", 10, `stroke="${C.plum}" stroke-width="2.2" stroke-dasharray="6 4"`));
      s += f.H("nsX", cross(181, 140, 3, C.red, 5));
      s += f.H("cal", rep(7, (i) => R(14 + i * 35, 252, 32, 28, C.white, 5, `stroke="${C.slate}" stroke-width="1.3"`) + T(30 + i * 35, 271, DAYS[i], 12, C.slate)));
      [1, 4].forEach((d) => { s += f.H("ex" + d, R(14 + d * 35, 252, 32, 28, C.plum, 5) + moon(30 + d * 35, 266, 8, C.gold)); });
      s += f.H("cx", cross(65, 266, 1.3, C.red, 3.5) + cross(170, 266, 1.3, C.red, 3.5));
      s += noteSVG(f, "nc", 326, 266) + noteSVG(f, "nt", 184, 30) + noteSVG(f, "ng", 316, 150);
      return s;
    },
    render(c, s) {
      const night = !!s.night;
      c.fl("sky", night ? C.night : "#e3eef8", { d: 1 });
      c.op("sun", night ? 0 : 1); c.op("moon", night ? 1 : 0);
      c.mv("hand", { r: (s.min || 0) * 6, pv: [330, 62] }, { d: 1.4, e: "power2.inOut" });
      setNote(c, "clk", s.clk ? s.clk : null);
      c.op("s1", (s.st || 1) >= 2 ? 1 : 0); c.op("s2", (s.st || 1) >= 3 ? 1 : 0);
      c.mv("s1", (s.st || 1) >= 2 ? {} : { y: 20 }); c.mv("s2", (s.st || 1) >= 3 ? {} : { y: 20 });
      const n = Math.min(NC, s.n || 0), d = Math.min(n, s.d || 0);
      for (let i = 0; i < NC; i++) {
        let pos, o = 1;
        if (i >= n) { pos = { x: 100, y: 120 }; o = 0; }
        else if (i < d) pos = { x: 316, y: 196 - i * 5 };
        else pos = { x: 181, y: 196 - (i - d) * 16 };
        c.op("c" + i, o, { dl: i * 0.04 });
        c.mv("c" + i, pos, { d: 1, dl: (i < d ? i * 0.08 : 0), e: "power2.inOut" });
      }
      c.op("guest", s.g ? 1 : 0);
      c.op("gw", s.g === "wait" ? 1 : 0); c.op("gok", s.g === "ok" ? 1 : 0);
      c.mv("guest", s.g === "wait" ? {} : s.g === "ok" ? { x: -6 } : { x: 30 });
      c.vis({ ns: s.ns, nsX: s.nsX, cal: s.cal || s.calX, ex1: s.cal || s.calX, ex4: s.cal || s.calX, cx: s.calX });
      c.op("ex1", s.cal ? 1 : s.calX ? 0.35 : 0); c.op("ex4", s.cal ? 1 : s.calX ? 0.35 : 0);
      setNote(c, "nc", s.cal ? { t: "+2 night shifts", c: "P" } : s.calX ? { t: "No extra shifts", c: "G" } : null);
      setNote(c, "nt", s.nt); setNote(c, "ng", s.ng);
    }
  };
}

// =====================================================================
// SHOT FAMILY: PIPE — approved design passes through concrete
// deliverables before the Implement door unlocks
// Benchmark template: "Multi-Step Icon Animation" (LottieFiles
// uAM7js17jU) — activate one step after another; plus "Interactive
// Computer Assembly Sequence" (CodePen OJqNMVR).
// =====================================================================
function F_PIPE(p, ST) {
  const f = pfx(p);
  const XY = [[152, 84], [258, 84], [152, 166], [258, 166]];
  const icon = (t, x, y, col) => {
    if (t === "sys") return R(x - 13, y - 10, 26, 17, col, 3) + R(x - 9, y - 7, 18, 11, C.white, 1) + R(x - 5, y + 8, 10, 3, col, 1);
    if (t === "rule") return F(`M${x} ${y - 11} L${x + 11} ${y} L${x} ${y + 11} L${x - 11} ${y} Z`, col) + tick(x, y, 0.45, C.white, 1.8);
    if (t === "proc") return R(x - 9, y - 11, 18, 22, C.white, 2, `stroke="${col}" stroke-width="2"`) + P(`M${x - 5} ${y - 4} h10 M${x - 5} ${y + 1} h10 M${x - 5} ${y + 6} h7`, col, 1.5);
    if (t === "test") return O(x, y, 11, col) + tick(x, y, 0.6, C.white, 2.2);
    if (t === "cat") return R(x - 11, y - 11, 22, 22, col, 3) + R(x - 7, y - 11, 4, 22, C.white, 1);
    if (t === "hand") return person(x - 8, y + 9, 0.55, col) + person(x + 8, y + 9, 0.55, col) + P(`M${x - 4} ${y - 8} Q${x} ${y - 13} ${x + 4} ${y - 8}`, C.orange, 1.8);
    return O(x, y, 10, "none", `stroke="${col}" stroke-width="4"`) + O(x, y, 4, col);
  };
  return {
    p, bench: "Multi-Step Icon Animation (LottieFiles) + Computer Assembly Sequence (CodePen)",
    draw() {
      let s = "";
      s += f.K("doc", R(14, 98, 78, 96, C.white, 6, `stroke="${C.navy}" stroke-width="2"`) + T(53, 120, "Approved", 13, C.navy) + T(53, 136, "design", 13, C.navy) +
        P("M26 152 H80", C.navy, 2) + rep(3, (i) => F(`M${32 + i * 20} 152 l6 -5 l6 5 l-6 5 Z`, C.navy)) + P("M26 172 H70 M26 182 H62", C.muted, 2));
      ST.forEach((st, i) => {
        const [x, y] = XY[i];
        s += f.K("st" + i, R(x - 49, y - 34, 98, 68, C.white, 8, `stroke="${st.col}" stroke-width="2"`) + icon(st.ic, x, y - 13, st.col) + T(x, y + 11, st.l[0], 12.5, st.col) + T(x, y + 26, st.l[1], 12.5, st.col));
        s += f.H("lit" + i, R(x - 49, y - 34, 98, 68, "none", 8, `stroke="${st.col}" stroke-width="4"`) + O(x + 41, y - 27, 9, C.green) + tick(x + 41, y - 27, 0.5, C.white, 2));
        s += f.H("cur" + i, R(x - 54, y - 39, 108, 78, "none", 11, `stroke="${C.gold}" stroke-width="3" class="a-pulse"`));
      });
      s += K(p + "door", R(330, 98, 56, 96, "#cfe7da", 4, `stroke="${C.green}" stroke-width="2.4"`) + T(358, 214, "Implement", 13, C.green));
      s += f.K("panel", R(334, 102, 48, 88, C.green, 3) + O(373, 148, 3, C.white), "");
      s += f.K("lock", R(348, 140, 20, 16, C.slate, 3) + P("M352 140 v-6 a6 6 0 0 1 12 0 v6", C.slate, 2.6));
      s += f.H("tok", R(-11, -14, 22, 28, C.navy, 3) + P("M-6 -6 h12 M-6 0 h12 M-6 6 h8", C.white, 1.6));
      s += f.H("conf", person(52, 254, 1.1, C.slate) + R(68, 214, 22, 20, C.white, 6, `stroke="${C.orange}" stroke-width="1.6"`) + T(79, 229, "?", 14, C.orange));
      s += f.H("itB", R(100, 46, 104, 76, "none", 10, `stroke="${C.navy2}" stroke-width="2.4" stroke-dasharray="5 4"`));
      s += f.H("whole", R(98, 44, 214, 160, "none", 14, `stroke="${C.green}" stroke-width="3"`));
      s += f.H("spon", person(372, 262, 1.1, C.plum));
      s += noteSVG(f, "nb", 210, 236) + noteSVG(f, "nt", 205, 24);
      return s;
    },
    render(c, s) {
      const on = s.on || 0;
      ST.forEach((st, i) => {
        const lit = Array.isArray(on) ? on.indexOf(i) >= 0 : i < on;
        c.op("lit" + i, lit ? 1 : 0, { dl: lit ? i * 0.2 : 0 });
        c.op("st" + i, s.dim && !lit ? 0.35 : 1);
        c.mv("st" + i, s.cur === i ? { s: 1.05 } : {});
        c.op("cur" + i, s.cur === i ? 1 : 0);
      });
      const open = !!s.unl;
      c.op("lock", open ? 0 : 1);
      c.mv("lock", open ? { y: -12 } : s.shake ? { x: 4 } : {});
      c.mv("panel", { sx: open ? 0.08 : 1, pv: [334, 146] }, { d: 1 });
      c.op("doc", s.doc === 0 ? 0.3 : 1);
      c.mv("doc", s.big ? { s: 1.12 } : {});
      let tp = null;
      if (s.tok === "d") tp = [53, 146]; else if (s.tok === "door") tp = [358, 146]; else if (typeof s.tok === "number") tp = XY[s.tok];
      c.op("tok", tp ? 1 : 0);
      if (tp) c.mv("tok", { x: tp[0], y: tp[1] }, { d: 1.1, e: "power2.inOut" });
      c.vis({ conf: s.conf, itB: s.it, whole: s.whole, spon: s.spon });
      setNote(c, "nb", s.nb); setNote(c, "nt", s.nt);
    }
  };
}

// =====================================================================
// SHOT FAMILY: UPGRADE — supported settings carry over, a custom
// extension breaks when the vendor ships a new version
// Benchmark template: "Git Workflow 1" (LottieFiles G6eTYjLVJ5) —
// branch, merge and reconnect; plus "Process - Success" check draw.
// =====================================================================
function F_UPGRADE(p) {
  const f = pfx(p);
  const block = (x, title, key) => R(x, 70, 128, 100, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + R(x, 70, 128, 22, C.navy, 8) + R(x, 84, 128, 8, C.navy) + f.TK(key, x + 64, 86, title, 13, C.white);
  const panel = (x) => R(x, 104, 70, 54, "#eef3f8", 5, `stroke="${C.green}" stroke-width="1.6"`) + rep(3, (i) => R(x + 10, 112 + i * 15, 30, 9, "#c7d6e4", 4.5));
  const ext = (x, y, col) => R(x, y, 40, 50, col, 6) + gear(x + 20, y + 25, 12, C.amber, col);
  return {
    p, bench: "Git Workflow 1 (LottieFiles) + Process - Success (LottieFiles)",
    draw() {
      let s = "";
      s += block(10, "Vendor C v1", "h1") + T(74, 186, "Current version", 13, C.navy);
      s += f.H("cfg", panel(22) + rep(3, (i) => `<g data-k="${p}k${i}">${O(36, 116 + i * 15, 5, C.green)}</g>`));
      s += f.H("cfgL", chip(57, 52, "Settings", { sz: 13, st: C.green, fg: C.green }));
      s += f.H("ext", ext(138, 100, C.gold) + P("M138 125 h-6", C.amber, 3));
      s += f.H("extL", chip(158, 52, "Rules add-on", { sz: 13, st: C.amber, fg: C.amber }));
      s += f.H("lk", R(150, 136, 16, 13, C.red, 2) + P("M153 136 v-4 a5 5 0 0 1 10 0 v4", C.red, 2.2));
      s += f.H("ud", O(57, 131, 18, "rgba(255,255,255,.7)", `stroke="${C.green}" stroke-width="2.4"`) + P("M50 126 a8 8 0 1 1 1 10", C.green, 2.4) + F("M46 122 L50 130 L55 124 Z", C.green));
      s += f.H("arr", P("M184 120 H232", C.plum, 3, 'class="a-flow"') + F("M228 113 L238 120 L228 127 Z", C.plum) + chip(211, 26, "Vendor upgrade", { sz: 13, st: C.plum, fg: C.plum }));
      s += f.H("v2", block(242, "Vendor C v2", "h2") + T(306, 186, "New version", 13, C.navy));
      s += f.H("cfg2", panel(254) + rep(3, (i) => O(268, 116 + i * 15, 5, C.green)) + O(316, 108, 9, C.green) + tick(316, 108, 0.5, C.white, 2));
      s += f.H("ext2", `<g transform="rotate(16 208 150)">${ext(188, 128, "#f3c7b4")}${P("M196 132 L206 150 L198 160 L210 176", C.red, 3)}</g>`);
      s += f.H("tk", R(118, 222, 164, 66, C.white, 8, `stroke="${C.red}" stroke-width="2"`) + R(118, 222, 164, 20, C.red, 8) + R(118, 234, 164, 8, C.red) + T(200, 237, "Repair task", 13, C.white) + T(200, 262, "Rework add-on", 13, C.ink) + T(200, 280, "Cost: unknown", 13, C.red));
      s += f.H("lt", R(10, 206, 150, 86, C.white, 6, `stroke="${C.navy}" stroke-width="1.8"`) + T(85, 226, "Vendor C, in writing", 12.5, C.navy) + T(85, 248, "Add-on is outside", 12.5, C.red) + T(85, 265, "supported upgrades", 12.5, C.red) + P("M100 282 q8 -8 14 0 t14 -2", C.navy, 1.6));
      s += f.H("rv", P("M176 264 H388", C.plum, 2) + rep(4, (i) => O(196 + i * 60, 264, 11, C.plum) + tick(196 + i * 60, 264, 0.55, C.white, 2) + T(196 + i * 60, 290, "Year " + (i + 1), 12.5, C.plum)) + chip(282, 234, "Yearly review", { sz: 13, st: C.plum, fg: C.plum }));
      s += f.H("ow", rep(6, (i) => R(24 + (i % 3) * 34, 104 + Math.floor(i / 3) * 26, 30, 22, C.orange, 3)) + rep(4, (i) => chip(52 + i * 99, 270, ["Develop", "Test", "Maintain", "Adapt"][i], { sz: 13, st: C.orange, fg: C.orange })) + person(200, 232, 1.1, C.navy) + T(250, 236, "Qasr team", 13, C.navy, "", "start"));
      s += noteSVG(f, "nd", 306, 212) + noteSVG(f, "na", 74, 212) + noteSVG(f, "np", 205, 24);
      return s;
    },
    render(c, s) {
      c.tx("h1", s.h1 || "Vendor C v1");
      c.vis({ cfg: s.cfg, cfgL: s.cfg && !s.np, ext: s.ext, extL: s.ext && !s.np && !s.cfg, lk: s.lk, ud: s.ud });
      c.mv("ext", s.ext ? {} : { x: 40 }, { d: 0.9, e: "back.out(1.6)" });
      for (let i = 0; i < 3; i++) c.mv("k" + i, { x: s.tg ? [28, 0, 28][i] : [0, 28, 0][i] }, { d: 0.7, dl: i * 0.1 });
      c.op("arr", s.up ? 1 : 0); c.op("v2", s.up ? 1 : 0); c.mv("v2", s.up ? {} : { x: 30 });
      c.op("cfg2", s.cfg2 ? 1 : 0, { dl: 0.6 }); c.mv("cfg2", s.cfg2 ? {} : { x: -150 }, { d: 1.1, dl: 0.4 });
      c.op("ext2", s.ext2 ? 1 : 0, { dl: 0.7 }); c.mv("ext2", s.ext2 ? {} : { x: -40, y: -20 }, { d: 1, dl: 0.5, e: "bounce.out" });
      c.vis({ tk: s.tk, lt: s.lt, rv: s.rv, ow: s.ow });
      c.mv("tk", s.tk ? {} : { y: 30 });
      setNote(c, "nd", s.nd); setNote(c, "na", s.na); setNote(c, "np", s.np);
    }
  };
}

// =====================================================================
// SHOT FAMILY: SPLIT — 100 corporate arrivals sort into 71 resolved and
// 29 on the old approval path (booked within 24 hours)
// Benchmark template: "Sankey animation - acyclic graph" (Observable
// @joaormendes) + "Stacked-to-grouped bars" (Observable @d3) — units keep
// their identity while regrouping.
// =====================================================================
function F_SPLIT(p) {
  const f = pfx(p);
  const g = (i) => [16 + (i % 10) * 13, 48 + Math.floor(i / 10) * 13];
  const tgt = (i) => i < 71 ? [208 + (i % 15) * 12, 62 + Math.floor(i / 15) * 12] : [208 + ((i - 71) % 15) * 12, 178 + Math.floor((i - 71) / 15) * 12];
  return {
    p, bench: "Sankey animation (Observable) + Stacked-to-grouped bars (Observable)",
    draw() {
      let s = T(80, 32, "100 corporate arrivals", 13, C.navy);
      s += f.K("bG", R(198, 30, 194, 102, "#eef7f1", 10, `stroke="${C.green}" stroke-width="2"`) + T(208, 50, "Rate resolved", 14, C.green, "", "start") + f.TK("nG", 384, 50, "", 15, C.green, "end"));
      s += f.K("bO", R(198, 146, 194, 62, "#fbefe8", 10, `stroke="${C.orange}" stroke-width="2"`) + T(208, 166, "Old approval path", 14, C.orange, "", "start") + f.TK("nO", 384, 166, "", 15, C.orange, "end"));
      s += rep(100, (i) => { const [x, y] = g(i); return `<rect class="${p}t" data-i="${i}" data-k="${p}t" x="${x}" y="${y}" width="10" height="10" rx="2.5" fill="#c5ced8"/>`; });
      s += f.H("tag", chip(295, 226, "Booked within 24h", { sz: 13, bg: C.orange, st: C.orange, fg: C.white }));
      s += f.H("cG", clockI(28, 222, 13, C.green) + T(48, 227, "Quick", 13, C.green, "", "start"));
      s += f.H("cO", clockI(28, 256, 13, C.red) + T(48, 261, "Waits longer", 13, C.red, "", "start"));
      s += f.H("own", person(176, 196, 1.05, C.navy) + star(176, 166, 0.8));
      s += f.H("why", O(300, 182, 30, "rgba(255,255,255,.25)", `stroke="${C.ink}" stroke-width="3"`) + P("M321 203 L338 220", C.ink, 6));
      s += f.H("dep", O(372, 194, 11, C.green) + tick(372, 194, 0.6, C.white, 2.2));
      s += noteSVG(f, "nb", 200, 278) + noteSVG(f, "nl", 82, 210);
      return s;
    },
    render(c, s) {
      const tiles = c.all("." + p + "t");
      const col = !!s.col || !!s.sort;
      tiles.forEach((el) => {
        const i = +el.getAttribute("data-i"), orange = i >= 71;
        let fill = "#c5ced8";
        if (col) fill = orange ? C.orange : C.green;
        if (s.fix && orange) fill = C.navy2;
        let o = 1;
        if (s.dimG && !orange) o = 0.25;
        if (s.dimO && orange) o = 0.25;
        if (s.one != null) o = i === s.one ? 1 : 0.25;
        c.flEl(el, fill, { dl: s.col && !s.sort ? (i % 29) * 0.015 : 0 });
        c.opEl(el, o);
        if (s.sort) { const [a, b] = g(i), [x, y] = tgt(i); c.mvEl(el, { x: x - a, y: y - b }, { d: 1.1, dl: (orange ? (i - 71) : i) * 0.012, e: "power2.inOut" }); }
        else c.mvEl(el, i === s.one ? { s: 1.6 } : {}, { d: 0.8 });
      });
      c.op("bG", s.bins === 0 ? 0 : 1); c.op("bO", s.bins === 0 ? 0 : 1);
      c.op("bG", s.dimG ? 0.4 : s.bins === 0 ? 0 : 1); c.op("bO", s.dimO ? 0.4 : s.bins === 0 ? 0 : 1);
      c.tx("nG", s.sort ? "71" : ""); c.tx("nO", s.sort ? "29" : "");
      c.vis({ tag: s.tag, cG: s.clk, cO: s.clk || s.clkO, own: s.own, why: s.why, dep: s.dep });
      setNote(c, "nb", s.nb); setNote(c, "nl", s.nl);
    }
  };
}

// =====================================================================
// SHOT FAMILY: LEDGER — three options as columns: initial cost bars to
// true scale, then rows of continuing obligations (unknowns stay "?")
// Benchmark template: "Infographic Chart Creator" (Motion Array 36176) —
// grow columns, update labels; plus "Stacked-to-grouped bars".
// =====================================================================
function F_LEDGER(p) {
  const f = pfx(p);
  const X = [128, 228, 328], COL = [C.orange, C.navy, C.amber], NAME = ["Change design", "Configure", "Extend"];
  const COST = [95, 180, 540], VAL = ["AED 95K", "AED 180K", "AED 540K"], BASE = 112, MAXH = 68;
  const RY = (r) => 132 + r * 29;
  return {
    p, bench: "Infographic Chart Creator (Motion Array) + Stacked-to-grouped bars (Observable)",
    draw() {
      let s = "";
      X.forEach((x, j) => {
        s += f.H("f" + j, R(x - 50, 6, 100, 250, "none", 10, `stroke="${COL[j]}" stroke-width="3"`));
        s += f.K("nm" + j, T(x, 22, NAME[j], 13, COL[j]));
        const h = COST[j] / 540 * MAXH;
        s += f.H("b" + j, R(x - 25, BASE - h, 50, h, COL[j], 3));
        s += f.H("v" + j, T(x, BASE - h - 6, VAL[j], 13, COL[j]));
      });
      s += P(`M78 ${BASE} H378`, C.slate, 1.5);
      for (let r = 0; r < 4; r++) {
        s += f.H("rl" + r, `<g>${f.TK("rT" + r, 8, RY(r) + 18, "", 12.5, C.slate, "start")}</g>`);
        X.forEach((x, j) => {
          s += f.H(`c${r}${j}`, R(x - 47, RY(r), 94, 26, j === 0 ? "#fbefe8" : j === 1 ? "#e8f0f8" : "#f6eedb", 6) + f.TK(`t${r}${j}`, x, RY(r) + 18, "", 12.5, C.ink));
          s += f.H(`u${r}${j}`, R(x - 47, RY(r), 94, 26, "none", 6, `stroke="${C.red}" stroke-width="2" stroke-dasharray="4 3"`));
        });
      }
      s += f.H("diff", P(`M228 ${BASE - 26} V60 H328 V40`, C.red, 1.8, 'stroke-dasharray="3 3"') + chip(278, 52, "+AED 360K", { sz: 13, st: C.red, fg: C.red }));
      s += f.H("tot", T(8, 266, "4-yr total", 12.5, C.red, "", "start") + X.map((x) => T(x, 266, "AED ?", 14, C.red)).join(""));
      s += f.H("leg", chip(110, 287, "Known", { sz: 12.5, bg: C.navy, st: C.navy, fg: C.white }) + chip(205, 287, "Estimate needed", { sz: 12.5, st: C.red, fg: C.red, dash: 1 }) + chip(320, 287, "Not available", { sz: 12.5, st: C.slate, fg: C.slate }));
      s += noteSVG(f, "nb", 228, 287) + noteSVG(f, "nt", 228, 286);
      return s;
    },
    render(c, s) {
      const dim = s.dim || [], hl = s.hl == null ? -1 : s.hl;
      X.forEach((x, j) => {
        const d = dim.indexOf(j) >= 0 || (hl >= 0 && hl !== j && s.hlDim !== 0) ? 0.3 : 1;
        c.op("nm" + j, d);
        const db = s.dimBars ? 0.3 : d;
        c.op("b" + j, s.bars ? db : 0); c.mv("b" + j, { sy: s.bars ? 1 : 0.02, pv: [x, BASE] }, { d: 1.2, dl: j * 0.15 });
        c.op("v" + j, s.bars && s.vals !== 0 ? db : 0, { dl: s.bars ? 0.8 : 0 });
        c.op("f" + j, hl === j ? 1 : 0);
        for (let r = 0; r < 4; r++) {
          const row = s.rows && s.rows[r];
          const on = !!row && (!s.cols || s.cols.indexOf(j) >= 0);
          if (row) c.tx(`t${r}${j}`, row[j + 1]);
          c.op(`c${r}${j}`, on ? d : 0, { dl: on ? r * 0.12 + j * 0.05 : 0 });
          c.mv(`c${r}${j}`, on ? {} : { y: 8 });
          const unk = on && s.unk && /\?/.test(row[j + 1]);
          c.op(`u${r}${j}`, unk ? 1 : 0, { dl: 0.5 });
        }
      });
      for (let r = 0; r < 4; r++) { const row = s.rows && s.rows[r]; if (row) c.tx("rT" + r, row[0]); c.op("rl" + r, row ? 1 : 0); }
      c.vis({ diff: s.diff, tot: s.tot, leg: s.leg });
      setNote(c, "nb", s.nb); setNote(c, "nt", s.nt);
    }
  };
}

// =====================================================================
// SHOT FAMILY: DEV — approved design vs. delivered process, red
// difference markers, a deviation record and the business owner's stamp
// Benchmark template: "contract process" (LottieFiles tnM3xY0cM8) —
// proposal, agreement and approval states; plus "The Trouble With Food
// Safety Audits" (NYT) — annotated document callouts.
// =====================================================================
const DEV_A = [["Booking", "made"], ["Rules", "evaluate"], ["Rate set", "overnight"], ["Guest:", "no wait"]];
const DEV_HUMAN = [["Booking", "made"], ["Human", "approval"], ["Approval", "queue"], ["Guest", "waits"]];
const DEV_CHANGE = [["Booking", "made"], ["Lookup at", "booking"], ["71% rate", "ready"], ["29% old", "approval"]];
const DEV_CONFIG = [["Booking", "made"], ["Night", "approval"], ["Ready by", "06:00?"], ["Guest:", "no wait"]];
function F_DEV(p) {
  const f = pfx(p);
  const BX = [14, 110, 206, 302];
  return {
    p, bench: "contract process (LottieFiles) + Food Safety Audits annotations (NYT)",
    draw() {
      let s = "";
      s += f.K("rA", chip(66, 20, "Approved design", { sz: 13, bg: C.green, st: C.green, fg: C.white }));
      s += f.H("rB", chip(72, 110, "Delivered process", { sz: 13, bg: C.navy, st: C.navy, fg: C.white }));
      BX.forEach((x, i) => {
        s += f.K("A" + i, R(x, 34, 86, 48, C.white, 7, `stroke="${C.green}" stroke-width="2"`) + f.TK(`A${i}a`, x + 43, 54, "", 12.5, C.green) + f.TK(`A${i}b`, x + 43, 71, "", 12.5, C.green));
        s += f.H("B" + i, R(x, 124, 86, 48, C.white, 7, `stroke="${C.navy}" stroke-width="2"`) + f.TK(`B${i}a`, x + 43, 144, "", 12.5, C.navy) + f.TK(`B${i}b`, x + 43, 161, "", 12.5, C.navy));
        s += f.H("X" + i, R(x - 2, 122, 90, 52, "none", 8, `stroke="${C.red}" stroke-width="3"`));
        s += f.H("m" + i, O(x + 43, 103, 11, C.red) + T(x + 43, 108, "≠", 15, C.white));
        s += f.H("g" + i, R(x - 3, 31, 92, 54, "none", 9, `stroke="${C.red}" stroke-width="3" stroke-dasharray="5 3"`) + O(x + 80, 36, 9, C.red) + T(x + 80, 41, "!", 13, C.white));
        if (i < 3) s += P(`M${x + 86} 58 h10`, C.green, 2) + f.H("ab" + i, P(`M${x + 86} 148 h10`, C.navy, 2));
      });
      s += f.H("gA", R(8, 28, 384, 60, "none", 12, `stroke="${C.gold}" stroke-width="3" class="a-pulse"`));
      s += f.H("own", person(34, 246, 1.25, C.plum) + T(36, 290, "Owner", 13, C.plum));
      s += f.H("log", R(76, 188, 196, 106, C.white, 8, `stroke="${C.slate}" stroke-width="1.8"`) + R(76, 188, 196, 22, C.slate, 8) + R(76, 200, 196, 10, C.slate) + T(174, 204, "Deviation record", 13, C.white) +
        rep(4, (i) => f.H("l" + i, f.TK("lT" + i, 88, 230 + i * 18, "", 12.5, C.ink, "start"))));
      const stamp = (key, txt, col) => f.H(key, `<g transform="rotate(-10 334 246)">${O(334, 246, 38, "rgba(255,255,255,.9)", `stroke="${col}" stroke-width="3"`)}${O(334, 246, 31, "none", `stroke="${col}" stroke-width="1.2"`)}${T(334, 251, txt, 13, col)}</g>`);
      s += stamp("sOK", "Approved", C.green) + stamp("sNO", "Rejected", C.red) + stamp("sQ", "Decision?", C.orange);
      s += noteSVG(f, "nr", 292, 18) + noteSVG(f, "nt", 300, 110);
      return s;
    },
    render(c, s) {
      const A = s.A || DEV_A, B = s.B || DEV_A, ch = s.ch || [];
      A.forEach((t, i) => { c.tx(`A${i}a`, t[0]); c.tx(`A${i}b`, t[1]); });
      B.forEach((t, i) => { c.tx(`B${i}a`, t[0]); c.tx(`B${i}b`, t[1]); });
      c.op("rA", s.a === 0 ? 0 : 1);
      for (let i = 0; i < 4; i++) {
        c.op("A" + i, s.a === 0 ? 0 : s.hlB ? 0.5 : 1, { dl: i * 0.08 });
        c.op("B" + i, s.b ? 1 : 0, { dl: s.b ? i * 0.12 : 0 });
        c.mv("B" + i, s.b ? {} : { y: -40 }, { d: 0.9, dl: i * 0.1 });
        if (i < 3) c.op("ab" + i, s.b ? 1 : 0);
        const changed = ch.indexOf(i) >= 0;
        c.op("X" + i, s.b && changed ? 1 : 0, { dl: 0.5 });
        c.op("m" + i, s.b && changed && s.mk !== 0 ? 1 : 0, { dl: 0.7 });
        c.mv("m" + i, s.b && changed ? {} : { s: 0.3 });
        c.op("g" + i, (s.gap || []).indexOf(i) >= 0 ? 1 : 0);
      }
      c.op("rB", s.b ? 1 : 0);
      c.vis({ gA: s.gA, own: s.own, log: !!s.log });
      c.op("own", s.own ? (s.own === "dim" ? 0.3 : 1) : 0);
      const L = s.log || [];
      for (let i = 0; i < 4; i++) { if (L[i]) c.tx("lT" + i, L[i]); c.op("l" + i, L[i] ? 1 : 0, { dl: 0.2 + i * 0.18 }); }
      c.op("sOK", s.st === "ok" ? 1 : 0); c.op("sNO", s.st === "no" ? 1 : 0); c.op("sQ", s.st === "q" ? 1 : 0);
      ["sOK", "sNO", "sQ"].forEach((k) => c.mv(k, s.st ? { s: 1 } : { s: 1.7 }, { d: 0.5, e: "back.out(2)" }));
      setNote(c, "nr", s.nr); setNote(c, "nt", s.nt);
    }
  };
}

// =====================================================================
// SHOT FAMILY: CAP — one delivery team, a seven-month calendar, the
// rate-project block and the January regulation (size not quantified)
// Benchmark template: "Project TimeLine" (Motion Array 2424919) —
// advance along time markers.
// =====================================================================
function F_CAP(p) {
  const f = pfx(p);
  const X0 = 86, MW = 43;
  const MON = ["M1", "M2", "M3", "M4", "M5", "M6", "Jan"];
  return {
    p, bench: "Project TimeLine (Motion Array)",
    draw() {
      let s = "";
      s += rep(7, (i) => R(X0 + i * MW, 30, MW - 2, 190, i % 2 ? "#f1f4f8" : "#e9eef4", 3) + T(X0 + i * MW + MW / 2 - 1, 48, MON[i], 12.5, i === 6 ? C.red : C.slate));
      s += T(8, 88, "Rate work", 12.5, C.navy, "", "start") + T(8, 146, "Regulation", 12.5, C.red, "", "start") + T(8, 204, "Team", 12.5, C.slate, "", "start");
      s += f.H("blk", R(X0, 66, 4 * MW, 36, C.amber, 6) + f.TK("bT", X0 + 8, 89, "", 13, C.white, "start"));
      s += f.H("b2", R(X0, 66, 1.4 * MW, 16, C.navy, 4) + T(X0 + 1.4 * MW + 6, 79, "Configure 6 wk", 12.5, C.navy, "", "start") + R(X0, 86, 0.7 * MW, 16, C.orange, 4) + T(X0 + 0.7 * MW + 6, 99, "Change 3 wk", 12.5, C.orange, "", "start"));
      s += f.H("reg", R(X0, 124, 7 * MW - 2, 36, "#fbe9e6", 6, `stroke="${C.red}" stroke-width="2" stroke-dasharray="6 4"`) + T(X0 + 150, 147, "Size not quantified", 13, C.red));
      s += f.H("flag", P(`M${X0 + 7 * MW - 2} 26 V222`, C.red, 2.4) + F(`M${X0 + 7 * MW - 2} 26 l-24 7 l24 7 Z`, C.red));
      s += R(X0, 188, 7 * MW - 2, 26, C.white, 6, `stroke="${C.slate}" stroke-width="1.5"`);
      s += f.H("use", R(X0, 188, 7 * MW - 2, 26, C.plum, 6, 'opacity=".8"'));
      s += f.H("ov", R(X0, 62, 4 * MW, 102, "rgba(176,54,43,.16)", 6, `stroke="${C.red}" stroke-width="2"`) + chip(X0 + 2 * MW, 176, "Same team", { sz: 12.5, bg: C.red, st: C.red, fg: C.white }));
      s += f.K("team", person(26, 270, 0.9, C.navy) + person(50, 270, 0.9, C.navy) + person(74, 270, 0.9, C.navy));
      s += noteSVG(f, "nb", 240, 262) + noteSVG(f, "nt", 240, 288);
      return s;
    },
    render(c, s) {
      const W = { ext: 4, cfg: 1.4, chg: 0.7 }[s.route] || 0;
      const T0 = { ext: "Extension: 4 months", cfg: "Configure", chg: "Change" }[s.route] || "";
      c.tx("bT", T0);
      c.op("blk", W ? 1 : 0);
      c.mv("blk", { sx: W ? W / 4 : 0.02, pv: [X0, 84] }, { d: 1.2 });
      c.vis({ b2: s.all, reg: s.reg, flag: s.flag, ov: s.ov });
      c.mv("reg", s.reg ? {} : { y: 20 });
      c.op("use", s.use ? 1 : 0); c.mv("use", { sx: s.use || 0.01, pv: [X0, 201] }, { d: 1.3 });
      c.mv("team", s.ov ? { x: 4 } : {});
      setNote(c, "nb", s.nb); setNote(c, "nt", s.nt);
    }
  };
}

// =====================================================================
// SHOT FAMILY: HAND — reception hands a booking case to the revenue
// office; the decision travels back to the employee serving the guest
// Benchmark template: "Workflow Animation" (Dribbble 3791748) — reveal
// action, transfer trigger, show notification; plus inspiration-board
// #10 "The Physical Handoff".
// =====================================================================
function F_HAND(p) {
  const f = pfx(p);
  const CP = { rec: [76, 86], mid: [200, 72], rev: [324, 86] };
  const DP = { rev: [324, 146], rec: [76, 146] };
  return {
    p, bench: "Workflow Animation (Dribbble 3791748) + Physical Handoff (inspiration board #10)",
    draw() {
      let s = "";
      s += R(14, 200, 124, 10, "#8a6a3a", 3) + T(76, 230, "Reception", 13, C.navy);
      s += R(262, 200, 124, 10, "#8a6a3a", 3) + T(324, 230, "Revenue office", 13, C.green);
      s += K(p + "rcp", person(52, 192, 1.1, C.navy));
      s += K(p + "rvp", person(324, 192, 1.1, C.green));
      s += f.H("gst", `<g class="a-bob">${buddy(112, 180, 11, C.navy2)}</g>`);
      s += f.H("gw", clockI(112, 152, 10, C.red));
      s += f.H("gok", O(112, 154, 10, C.green) + tick(112, 154, 0.55, C.white, 2));
      s += f.H("bdg", star(350, 168, 0.9));
      s += f.H("acc", O(358, 112, 11, C.green) + tick(358, 112, 0.6, C.white, 2.2));
      s += f.H("proc", R(16, 132, 24, 32, C.white, 3, `stroke="${C.navy}" stroke-width="1.8"`) + R(22, 128, 12, 6, C.navy, 2) + P("M21 144 h14 M21 151 h14 M21 158 h10", C.muted, 1.6));
      s += f.H("pp", P("M120 104 Q200 82 280 104", C.red, 2.2, 'stroke-dasharray="5 4"') + F("M276 98 L284 106 L274 108 Z", C.red) + P("M280 122 Q200 144 120 122", C.red, 2.2, 'stroke-dasharray="5 4"') + F("M124 116 L116 124 L126 128 Z", C.red) + clockI(200, 113, 12, C.red));
      s += f.H("imp", [[150, 40], [230, 30], [310, 40]].map(([x, y]) => P(`M70 170 Q${x / 2 + 40} ${y + 30} ${x} ${y + 24}`, C.orange, 1.8, 'stroke-dasharray="4 4"') + person(x, y + 22, 0.85, C.slate) + T(x, y - 4, "?", 14, C.orange)).join(""));
      s += f.H("impX", cross(230, 46, 2.6, C.red, 5));
      s += f.H("sup", P("M70 214 Q90 256 168 262", C.green, 2.2, 'stroke-dasharray="5 4"') + O(196, 262, 15, C.green) + P("M188 258 a8 8 0 0 1 16 0", C.white, 2.2) + R(185, 258, 4, 7, C.white, 1) + R(203, 258, 4, 7, C.white, 1) + chip(272, 262, "Support route", { sz: 13, st: C.green, fg: C.green }));
      s += f.H("cd", R(-52, -22, 104, 44, C.white, 6, `stroke="${C.navy}" stroke-width="2"`) + R(-52, -22, 104, 9, C.navy, 6) + R(-52, -17, 104, 4, C.navy) + T(-2, 4, "Agreement ID", 12.5, C.navy) + T(-2, 19, "Case owner", 12.5, C.navy) + tick(44, 0, 0.4, C.green, 2) + tick(44, 15, 0.4, C.green, 2));
      s += f.H("cdX", R(-52, -22, 104, 44, "#fff4f1", 6, `stroke="${C.red}" stroke-width="2"`) + R(-52, -22, 104, 9, C.red, 6) + R(-52, -17, 104, 4, C.red) + T(0, 4, "Agreement: ?", 12.5, C.red) + T(0, 19, "Owner: ?", 12.5, C.red));
      s += f.H("dec", R(-54, -14, 108, 28, C.green, 14) + T(0, 5, "Rate confirmed", 12.5, C.white));
      s += noteSVG(f, "scr", 112, 124) + noteSVG(f, "nt", 200, 24) + noteSVG(f, "nb", 200, 278);
      return s;
    },
    render(c, s) {
      const cp = s.cd && CP[s.cd];
      const miss = !!s.miss;
      c.op("cd", cp && !miss ? 1 : 0); c.op("cdX", cp && miss ? 1 : 0);
      if (cp) { c.mv("cd", { x: cp[0], y: cp[1] }, { d: 1.2, e: "power2.inOut" }); c.mv("cdX", { x: cp[0], y: cp[1] }, { d: 1.2, e: "power2.inOut" }); }
      const dp = s.dec && DP[s.dec];
      c.op("dec", dp ? 1 : 0);
      if (dp) c.mv("dec", { x: dp[0], y: dp[1] }, { d: 1.2, dl: 0.2, e: "power2.inOut" });
      c.op("gst", s.g ? 1 : 0); c.op("gw", s.g === "wait" ? 1 : 0); c.op("gok", s.g === "ok" ? 1 : 0);
      c.vis({ bdg: s.bdg, acc: s.acc, proc: s.proc, pp: s.pp, imp: s.imp, impX: s.impX, sup: s.sup });
      c.mv("acc", s.acc ? {} : { s: 0.3 });
      c.op("rvp", s.rev === 0 ? 0.3 : 1);
      setNote(c, "scr", s.scr); setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: TEST — feed realistic cases into the operating process,
// compare expected vs observed, log and close defects
// Benchmark template: "Process - Success" (LottieFiles EhFVqZgUPP) —
// activity transforms into a check; plus "Dashboard" (LottieFiles
// M05MmlnoOP) — fill graph, highlight metric.
// =====================================================================
function F_TEST(p) {
  const f = pfx(p);
  const CY = [30, 82, 134, 186];
  return {
    p, bench: "Process - Success (LottieFiles) + Dashboard (LottieFiles)",
    draw() {
      let s = T(66, 20, "Test cases", 13, C.slate);
      CY.forEach((y, i) => {
        s += f.H("k" + i, R(10, y, 112, 42, C.white, 7, `stroke="${i ? C.orange : C.navy2}" stroke-width="2"`) + f.TK("kT" + i, 66, y + 26, "", 13, i ? C.orange : C.navy2));
        s += f.H("kok" + i, O(118, y + 4, 9, C.green) + tick(118, y + 4, 0.5, C.white, 2));
        s += f.H("kq" + i, O(118, y + 4, 9, C.slate) + T(118, y + 9, "?", 13, C.white));
        s += f.H("kx" + i, O(118, y + 4, 9, C.red) + cross(118, y + 4, 0.45, C.white, 2));
      });
      s += f.H("sp", rep(4, (i) => { const [x, y] = [[14, 26], [118, 26], [14, 76], [118, 76]][i]; return P(`M${x - 5} ${y} H${x + 5} M${x} ${y - 5} V${y + 5}`, C.gold, 2.4); }));
      s += f.H("fr", R(4, 24, 124, 54, "none", 10, `stroke="${C.gold}" stroke-width="2.4" stroke-dasharray="6 4"`));
      s += K(p + "proc", R(144, 40, 118, 166, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + T(203, 60, "Operating process", 12.5, C.navy));
      s += f.K("steps", rep(3, (i) => R(154, 74 + i * 42, 98, 32, "#eef3f8", 6) + f.TK("sT" + i, 203, 95 + i * 42, "", 12.5, C.navy)));
      s += f.H("mh", R(150, 112, 106, 40, "none", 8, `stroke="${C.gold}" stroke-width="3" class="a-pulse"`));
      s += f.H("intf", R(150, 70, 106, 130, C.white, 8) + R(156, 84, 44, 40, C.navy, 6) + T(178, 140, "Booking", 12.5, C.navy) + R(206, 84, 44, 40, C.green, 6) + T(228, 140, "Rates", 12.5, C.green) + P("M200 104 H206", C.slate, 2) + T(203, 188, "Interface", 12.5, C.slate));
      s += f.H("scrOK", O(178, 104, 9, C.white) + tick(178, 104, 0.5, C.green, 2));
      s += f.H("pk", R(-10, -7, 20, 14, C.gold, 3));
      s += f.H("pX", O(203, 162, 10, C.red) + T(203, 167, "?", 13, C.white));
      s += f.H("tk", R(-18, -12, 36, 24, C.navy2, 5) + P("M-11 -3 H11 M-11 4 H6", C.white, 1.8));
      s += rep(6, (i) => f.H("pkk" + i, R(-14, -9, 28, 18, C.orange, 4)));
      s += f.H("rE", R(276, 44, 116, 30, C.white, 8, `stroke="${C.slate}" stroke-width="1.5"`) + T(284, 64, "Expected", 12.5, C.slate, "", "start") + O(376, 59, 8, C.green) + tick(376, 59, 0.45, C.white, 2));
      s += f.H("rO", R(276, 80, 116, 30, C.white, 8, `stroke="${C.slate}" stroke-width="1.5"`) + T(284, 100, "Observed", 12.5, C.slate, "", "start"));
      s += f.H("oOK", O(376, 95, 8, C.green) + tick(376, 95, 0.45, C.white, 2));
      s += f.H("oX", O(376, 95, 8, C.red) + cross(376, 95, 0.4, C.white, 2));
      s += f.H("def", R(276, 122, 116, 100, C.white, 8, `stroke="${C.red}" stroke-width="2"`) + R(276, 122, 116, 22, C.red, 8) + R(276, 134, 116, 10, C.red) + T(334, 138, "Defect logged", 12.5, C.white) +
        T(284, 164, "Situation", 12.5, C.ink, "", "start") + T(284, 186, "Expected", 12.5, C.green, "", "start") + T(284, 208, "Observed", 12.5, C.red, "", "start"));
      s += f.H("dc", `<g transform="rotate(-8 334 238)">${R(292, 222, 84, 30, "rgba(255,255,255,.92)", 6, `stroke="${C.green}" stroke-width="3"`)}${T(334, 243, "Fixed", 14, C.green)}</g>`);
      s += f.H("pf", person(180, 252, 1.05, C.navy) + person(228, 252, 1.05, C.green) + T(204, 290, "Staff testers", 13, C.navy));
      s += noteSVG(f, "nb", 200, 282) + noteSVG(f, "nr", 300, 248);
      return s;
    },
    render(c, s) {
      const txt = s.k || ["Vendor demo", "Past failure", "29% booking", "Peak volume"];
      const vis = s.kv || [1, 0, 0, 0], bd = s.bd || [];
      for (let i = 0; i < 4; i++) {
        c.tx("kT" + i, txt[i] || "");
        c.op("k" + i, vis[i] ? (s.feed != null && s.feed !== i ? 0.55 : 1) : 0, { dl: i * 0.1 });
        c.mv("k" + i, vis[i] ? (s.feed === i ? { x: 6 } : {}) : { x: -20 });
        c.op("kok" + i, vis[i] && bd[i] === "ok" ? 1 : 0); c.op("kq" + i, vis[i] && bd[i] === "q" ? 1 : 0); c.op("kx" + i, vis[i] && bd[i] === "x" ? 1 : 0);
      }
      const st = s.steps || ["Check agreement", "Approve rate", "Confirm rate"];
      for (let i = 0; i < 3; i++) c.tx("sT" + i, st[i]);
      c.op("steps", s.intf ? 0 : 1);
      c.vis({ sp: s.sp, fr: s.fr, mh: s.mh, intf: s.intf, scrOK: s.intf && s.scr, pf: s.pf, def: s.def, dc: s.dc });
      c.mv("def", s.defZ ? { s: 1.06 } : {});
      c.op("pk", s.intf ? 1 : 0);
      c.mv("pk", s.intf === "ok" ? { x: 228, y: 104 } : s.intf === "lost" || s.intf === "miss" ? { x: 203, y: 150 } : { x: 178, y: 104 }, { d: 1.2 });
      c.op("pX", s.intf === "miss" || s.intf === "lost" ? 1 : 0);
      const fed = s.feed != null;
      c.op("tk", fed ? 1 : 0);
      if (fed) c.mv("tk", s.res ? { x: 266, y: 182 } : { x: 203, y: 26 }, { d: 1.2, e: "power2.inOut" });
      for (let i = 0; i < 6; i++) { c.op("pkk" + i, s.peak ? 1 : 0, { dl: i * 0.08 }); c.mv("pkk" + i, s.peak ? { x: 168 + (i % 3) * 34, y: 88 + Math.floor(i / 3) * 28 } : { x: 66, y: 207 }, { d: 1, dl: i * 0.08 }); }
      c.vis({ rE: !!s.res, rO: !!s.res, oOK: s.res === "pass", oX: s.res === "fail" });
      setNote(c, "nb", s.nb); setNote(c, "nr", s.nr);
    }
  };
}

// =====================================================================
// SHOT FAMILY: EXC — the normal path, the exception branch, an owner
// who investigates the cause, return to normal or removal of needless work
// Benchmark template: "Celonis Process Explorer animation"
// (help.celonis.com) — variants branching off the happy path; plus "Git
// Workflow 1" branch-and-merge.
// =====================================================================
function F_EXC(p) {
  const f = pfx(p);
  const TP = { start: [46, 60], check: [180, 60], res: [334, 60], miss: [180, 124], owner: [150, 190], inv: [306, 190] };
  return {
    p, bench: "Celonis Process Explorer (Celonis) + Git Workflow branching (LottieFiles)",
    draw() {
      let s = "";
      s += K(p + "main", chip(46, 60, "Booking", { sz: 13, st: C.navy2, fg: C.navy2 }) + chip(180, 60, "Check agreement", { sz: 13 }) + P("M84 60 H116", C.navy, 2.4) + F("M112 55 L120 60 L112 65 Z", C.navy));
      s += f.D("aR", "M245 60 H280", C.green, 2.6);
      s += f.K("res", chip(334, 60, "Rate resolved", { sz: 13, bg: C.green, st: C.green, fg: C.white }));
      s += f.H("gr", `<g class="a-spin">${gear(116, 30, 12, C.gold, "#f3f6f9")}</g>` + T(140, 34, "Automated", 12.5, C.amber, "", "start"));
      s += f.D("aB", "M180 74 V110", C.red, 2.6);
      s += f.H("miss", chip(180, 124, "Missing information", { sz: 13, bg: "#fff4f1", st: C.red, fg: C.red }));
      s += f.D("aW", "M180 138 V160", C.navy, 2.4);
      s += f.H("own", person(180, 194, 1.2, C.navy) + T(180, 228, "Exception owner", 13, C.navy));
      s += f.H("bd", star(198, 166, 0.85));
      s += f.D("aI", "M200 190 H256", C.navy, 2.4);
      s += f.H("inv", chip(310, 190, "Investigate cause", { sz: 13, st: C.plum, fg: C.plum }) + O(370, 172, 9, "rgba(255,255,255,.3)", `stroke="${C.ink}" stroke-width="2"`) + P("M376 178 L383 185", C.ink, 3));
      s += f.D("aT", "M366 178 C392 150 392 100 360 76", C.green, 2.6);
      s += f.H("rm", chip(310, 124, "Needless approval", { sz: 13, bg: "#fbefe8", st: C.orange, fg: C.orange }));
      s += f.H("cut", P("M246 112 L376 136", C.red, 3) + O(240, 110, 6, "none", `stroke="${C.red}" stroke-width="2"`) + O(240, 124, 6, "none", `stroke="${C.red}" stroke-width="2"`));
      s += f.H("jd", chip(310, 124, "Needs judgement", { sz: 13, st: C.navy, fg: C.navy }));
      s += f.H("sw", O(84, 190, 16, C.white, `stroke="${C.orange}" stroke-width="3"`) + P("M84 178 V190 L93 195", C.orange, 2.4) + R(80, 170, 8, 5, C.orange, 1));
      s += rep(3, (i) => f.H("sq" + i, bookTok(C.orange)));
      s += f.H("pc", R(70, 172, 28, 36, C.white, 3, `stroke="${C.navy}" stroke-width="1.8"`) + R(77, 168, 14, 7, C.navy, 2) + P("M75 185 h18 M75 193 h18 M75 201 h12", C.muted, 1.6) + T(84, 228, "Procedure", 12.5, C.navy));
      s += f.H("wk", P("M150 132 Q40 150 40 230 Q40 262 120 262", C.red, 2.4, 'stroke-dasharray="5 5" class="a-flow"') + chip(178, 262, "Informal workaround", { sz: 12.5, st: C.red, fg: C.red }));
      s += f.H("tk", bookTok());
      s += rep(3, (i) => f.H("stk" + i, bookTok(C.orange)));
      s += noteSVG(f, "nb", 200, 276) + noteSVG(f, "nt", 300, 24);
      return s;
    },
    render(c, s) {
      const br = !!s.br;
      c.dr("aB", br ? 1 : 0); c.op("miss", br ? 1 : 0);
      c.dr("aW", br && s.own ? 1 : 0, { dl: 0.3 }); c.op("own", br && s.own ? 1 : 0, { dl: 0.4 });
      c.op("bd", s.bd ? 1 : 0);
      c.dr("aI", s.inv ? 1 : 0, { dl: 0.3 }); c.op("inv", s.inv ? 1 : 0, { dl: 0.5 });
      c.dr("aT", s.out === "ret" || s.out === "both" ? 1 : 0, { dl: 0.6 });
      c.op("rm", s.out === "rem" || s.rm ? 1 : 0); c.op("cut", s.out === "rem" ? 1 : 0, { dl: 0.6 });
      c.mv("rm", s.out === "rem" ? { y: 8, r: -4 } : {});
      c.op("jd", s.out === "both" ? 1 : 0);
      if (s.out === "both") { c.op("rm", 1); c.mv("rm", { y: -34 }); }
      c.dr("aR", s.normal === 0 ? 0 : 1); c.op("res", s.normal === 0 ? 0.3 : 1);
      c.vis({ gr: s.gr, sw: s.sw, pc: s.pc, wk: s.wk });
      for (let i = 0; i < 3; i++) { c.op("sq" + i, s.sq ? 1 : 0); c.mv("sq" + i, s.sq ? { x: 112, y: 162 + i * 24 } : { x: 180, y: 124 }, { d: 0.9, dl: i * 0.1 }); }
      for (let i = 0; i < 3; i++) { c.op("stk" + i, s.stk ? 1 : 0); c.mv("stk" + i, s.stk ? { x: 236 + i * 36, y: 124 } : { x: 180, y: 60 }, { d: 1, dl: i * 0.12 }); }
      const tp = s.tok && TP[s.tok];
      c.op("tk", tp ? 1 : 0);
      if (tp) c.mv("tk", { x: tp[0], y: tp[1] - 22 }, { d: 1.1, e: "power2.inOut" });
      setNote(c, "nb", s.nb); setNote(c, "nt", s.nt);
    }
  };
}

// =====================================================================
// SHOT FAMILY: ROUTES — buy, configure, extend, build as four product
// cards whose illustrations change state (Flip-style)
// Benchmark template: "Product Workflow Animation & UI Motion Design"
// (Dribbble 27577799) — shift between product states.
// =====================================================================
function F_ROUTES(p) {
  const f = pfx(p);
  const X = [52, 152, 252, 352], COL = [C.navy, C.green, C.amber, C.orange];
  const TT = [["Buy", "As supplied"], ["Configure", "Settings"], ["Extend", "Add-on"], ["Build", "Own code"]];
  const box = (x) => R(x - 28, 92, 56, 50, "#e7eef6", 5, `stroke="${C.navy}" stroke-width="2"`) + P(`M${x - 28} 104 H${x + 28}`, C.navy, 2) + R(x - 6, 92, 12, 12, C.navy, 1);
  return {
    p, bench: "Product Workflow Animation & UI Motion Design (Dribbble 27577799)",
    draw() {
      let s = "";
      X.forEach((x, j) => {
        s += f.K("cd" + j, R(x - 47, 14, 94, 180, C.white, 10, `stroke="${COL[j]}" stroke-width="2"`) + T(x, 38, TT[j][0], 14, COL[j]) + T(x, 56, TT[j][1], 12.5, C.slate));
        s += f.H("fz" + j, R(x - 51, 10, 102, 188, "none", 13, `stroke="${COL[j]}" stroke-width="4"`));
      });
      s += f.K("il0", box(52) + O(52, 152, 9, C.gold) + tick(52, 152, 0.45, C.white, 2));
      s += f.K("il1", box(152) + rep(3, (i) => R(130, 150 + i * 13, 44, 8, "#cfe3d7", 4)) + rep(3, (i) => `<g data-k="${p}t${i}">${O(134, 154 + i * 13, 5, C.green)}</g>`));
      s += f.K("il2", box(252) + P("M280 117 h6", C.amber, 3));
      s += f.H("plug", R(286, 100, 26, 34, C.gold, 5) + gear(299, 117, 9, C.amber, C.gold));
      s += f.K("il3", P("M322 178 H382", C.slate, 2) + person(338, 172, 0.8, C.navy));
      s += rep(4, (i) => f.H("bk" + i, R(346 + (i % 2) * 18, 160 - Math.floor(i / 2) * 18 - 16, 16, 16, C.orange, 2)));
      s += rep(4, (j) => f.H("mb" + j, R(X[j] - 36, 168, 72, 7, "#e3e8ee", 3) + `<g data-k="${p}mc${j}">${R(X[j] - 36, 168, 72, 7, C.navy, 3)}</g>` + R(X[j] - 36, 180, 72, 7, "#e3e8ee", 3) + `<g data-k="${p}mu${j}">${R(X[j] - 36, 180, 72, 7, C.orange, 3)}</g>`));
      s += f.H("leg", chip(150, 214, "Control", { sz: 12.5, bg: C.navy, st: C.navy, fg: C.white }) + chip(250, 214, "Upkeep", { sz: 12.5, bg: C.orange, st: C.orange, fg: C.white }));
      s += rep(4, (j) => f.H("rq" + j, f.TK("rqT" + j, X[j], 262, "", 12.5, C.navy) + P(`M${X[j]} 246 V202`, C.navy, 1.8) + F(`M${X[j] - 5} 207 L${X[j]} 199 L${X[j] + 5} 207 Z`, C.navy)));
      s += f.H("wrong", [0, 1, 2].map((j) => P(`M${X[j]} 246 Q${(X[j] + 352) / 2} 220 346 200`, C.red, 1.8, 'stroke-dasharray="4 3"')).join("") + cross(300, 222, 1.3, C.red, 3.5));
      s += f.H("fit", T(26, 228, "Needs", 12.5, C.navy, "", "start") + T(78, 228, "Has", 12.5, C.green, "", "start") + rep(3, (i) => O(34, 242 + i * 16, 4, C.navy) + P(`M40 ${242 + i * 16} H74`, C.green, 1.8) + O(80, 242 + i * 16, 4, C.green)));
      s += f.H("mt", rep(3, (i) => `<g transform="translate(${318 + i * 24} 246) rotate(45)">${R(-2.5, 0, 5, 18, C.orange, 2)}${O(0, -2, 6, "none", `stroke="${C.orange}" stroke-width="3.5"`)}</g>`));
      s += f.H("lk", R(144, 74, 16, 12, C.green, 2) + P("M147 74 v-4 a5 5 0 0 1 10 0 v4", C.green, 2));
      s += noteSVG(f, "nb", 200, 282) + noteSVG(f, "nm", 200, 236);
      return s;
    },
    render(c, s) {
      const fo = s.f == null ? -1 : s.f;
      X.forEach((x, j) => {
        const on = fo < 0 || fo === j || (s.on && s.on.indexOf(j) >= 0);
        ["cd", "il"].forEach((k) => c.op(k + j, on ? 1 : 0.28));
        c.op("fz" + j, fo === j || (s.on && s.on.indexOf(j) >= 0 && s.ring) ? 1 : 0);
        c.mv("cd" + j, fo === j ? { y: -3 } : {});
        const mb = !!s.mb;
        c.op("mb" + j, mb ? (on ? 1 : 0.3) : 0);
        const cv = [0.25, 0.45, 0.75, 1][j], uv = [0.15, 0.3, 0.75, 1][j];
        c.mv("mc" + j, { sx: mb ? cv : 0.02, pv: [x - 36, 171] }, { d: 1, dl: j * 0.1 });
        c.mv("mu" + j, { sx: mb ? uv : 0.02, pv: [x - 36, 183] }, { d: 1, dl: j * 0.1 + 0.1 });
        const rq = s.rq && s.rq[j];
        if (rq) c.tx("rqT" + j, rq);
        c.op("rq" + j, rq ? 1 : 0, { dl: j * 0.15 });
      });
      c.op("leg", s.mb ? 1 : 0);
      for (let i = 0; i < 3; i++) c.mv("t" + i, { x: s.tg ? [30, 0, 30][i] : [0, 30, 0][i] }, { d: 0.7, dl: i * 0.12 });
      c.op("plug", s.plug ? 1 : 0); c.mv("plug", s.plug ? {} : { x: 30 }, { d: 0.9, e: "back.out(1.6)" });
      for (let i = 0; i < 4; i++) { const on = i < (s.bk || 0); c.op("bk" + i, on ? 1 : 0, { dl: i * 0.15 }); c.mv("bk" + i, on ? {} : { y: -30 }, { d: 0.6, dl: i * 0.15, e: "bounce.out" }); }
      c.vis({ wrong: s.wrong, fit: s.fit, mt: s.mt, lk: s.lk });
      setNote(c, "nb", s.nb); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: TIERS — core, supporting and management processes and the
// development route each one tends to deserve
// Benchmark template: "Animated treemap" (Observable @d3/animated-treemap)
// — areas keep identity while emphasis changes.
// =====================================================================
function F_TIERS(p) {
  const f = pfx(p);
  const TL = [["core", 14, 14, 190, 178, C.amber, "Core", "Creates customer value"], ["sup", 214, 14, 176, 84, C.slate, "Supporting", "Enables the core"], ["man", 214, 108, 176, 84, C.plum, "Management", "Steers and controls"]];
  return {
    p, bench: "Animated treemap (Observable)",
    draw() {
      let s = "";
      TL.forEach(([k, x, y, w, h, col, t1, t2]) => {
        s += f.K(k, R(x, y, w, h, col === C.amber ? "#f7ecd6" : col === C.slate ? "#e6ebf0" : "#ece6f3", 10, `stroke="${col}" stroke-width="2"`) + T(x + w / 2, y + h / 2 - 4, t1, 15, col) + T(x + w / 2, y + h / 2 + 16, t2, 12.5, C.ink));
        s += f.H(k + "H", R(x - 3, y - 3, w + 6, h + 6, "none", 12, `stroke="${col}" stroke-width="4"`));
      });
      s += f.H("star", star(109, 46, 1.3) + `<g class="a-bob">${buddy(150, 46, 10, C.navy2)}</g>`);
      s += f.H("rg", R(14, 202, 376, 32, "#e1f0e8", 8, `stroke="${C.green}" stroke-width="2"`) + T(202, 223, "Stable regulatory requirement", 13, C.green));
      s += noteSVG(f, "o0", 109, 262) + noteSVG(f, "o1", 302, 252) + noteSVG(f, "o2", 302, 284) + noteSVG(f, "o3", 202, 270);
      return s;
    },
    render(c, s) {
      const hl = s.hl || [];
      TL.forEach(([k]) => { const on = hl.length === 0 || hl.indexOf(k) >= 0; c.op(k, on ? 1 : 0.3); c.op(k + "H", hl.indexOf(k) >= 0 ? 1 : 0); c.mv(k, hl.indexOf(k) >= 0 ? { s: 1.02 } : {}); });
      c.vis({ star: s.star, rg: s.rg });
      c.mv("rg", s.rg ? {} : { y: 20 });
      const o = s.o || [];
      ["o0", "o1", "o2", "o3"].forEach((k, i) => setNote(c, k, o[i]));
    }
  };
}

// =====================================================================
// SHOT FAMILY: PHASE — the ten-phase BPM framework, Develop is phase 7
// Benchmark template: "Corporate Timeline by HenlyFx" (Motion Array
// 1939632) — reveal events one by one.
// =====================================================================
function F_PHASE(p) {
  const f = pfx(p);
  const NM = { 5: "Innovate", 6: "People", 7: "Develop", 8: "Implement" };
  const pos = (i) => [14 + ((i - 1) % 5) * 76, i <= 5 ? 34 : 118];
  return {
    p, bench: "Corporate Timeline (Motion Array)",
    draw() {
      let s = "";
      for (let i = 1; i <= 10; i++) {
        const [x, y] = pos(i);
        s += K(p + "c" + i, F(`M${x} ${y} H${x + 62} L${x + 72} ${y + 28} L${x + 62} ${y + 56} H${x} L${x + 10} ${y + 28} Z`, "#e3e9f0", `stroke="${C.slate}" stroke-width="1.5"`) + T(x + 36, y + (NM[i] ? 24 : 34), String(i), 16, C.slate) + (NM[i] ? T(x + 36, y + 44, NM[i], 12, C.ink) : ""));
        s += f.H("h" + i, F(`M${x} ${y} H${x + 62} L${x + 72} ${y + 28} L${x + 62} ${y + 56} H${x} L${x + 10} ${y + 28} Z`, i === 7 ? C.orange : C.navy2) + T(x + 36, y + (NM[i] ? 24 : 34), String(i), 16, C.white) + (NM[i] ? T(x + 36, y + 44, NM[i], 12, C.white) : ""));
        s += f.H("d" + i, O(x + 60, y + 6, 8, C.green) + tick(x + 60, y + 6, 0.45, C.white, 2));
      }
      s += f.H("sub", chip(350, 104, "How it operates", { sz: 12, st: C.navy2, fg: C.navy2 }) + chip(50, 188, "Who does what", { sz: 12, st: C.navy2, fg: C.navy2 }));
      s += f.H("arr", P("M350 92 Q300 112 172 128", C.orange, 2.2, 'class="a-flow"') + P("M84 146 H90", C.orange, 3) + F("M168 122 L178 128 L168 134 Z", C.orange));
      s += f.H("ny", chip(202, 188, "Not yet", { sz: 12.5, st: C.slate, fg: C.slate, dash: 1 }));
      s += f.H("fnd", rep(3, (i) => R(14, 204 + i * 30, 372, 24, ["#e6eef6", "#efe9f5", "#f6efe2"][i], 6) + T(200, 221 + i * 30, ["Project management", "People change management", "Leadership"][i], 13, [C.navy, C.plum, C.amber][i])));
      s += noteSVG(f, "nb", 200, 222);
      return s;
    },
    render(c, s) {
      const hl = s.hl || [];
      for (let i = 1; i <= 10; i++) {
        c.op("h" + i, hl.indexOf(i) >= 0 ? 1 : 0, { dl: hl.indexOf(i) * 0.2 });
        c.mv("h" + i, hl.indexOf(i) >= 0 ? { s: 1.04 } : {});
        c.op("d" + i, i <= (s.done || 0) ? 1 : 0, { dl: i * 0.06 });
      }
      c.vis({ sub: s.sub, arr: s.arr, ny: s.ny, fnd: s.fnd });
      setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: DASH — exception evidence and monitoring after go-live
// Benchmark template: "Animated line chart lesson" (Observable
// @d3/learn-d3-animation) + "Infographics Dashboard" (LottieFiles).
// =====================================================================
function F_DASH(p) {
  const f = pfx(p);
  return {
    p, bench: "Animated line chart (Observable) + Infographics Dashboard (LottieFiles)",
    draw() {
      let s = R(12, 12, 376, 276, C.white, 12, `stroke="${C.navy}" stroke-width="2"`) + R(12, 12, 376, 30, C.navy, 12) + R(12, 30, 376, 12, C.navy);
      s += f.TK("hd", 200, 33, "", 14, C.white);
      s += T(24, 66, "Exception volume", 13, C.navy, "", "start") + P("M28 160 H190 M28 160 V80", C.slate, 1.5);
      s += f.D("ln", "M32 140 L58 128 L84 134 L110 116 L136 122 L162 104 L186 110", C.orange, 3);
      s += T(210, 66, "Causes logged", 13, C.navy, "", "start");
      s += rep(3, (i) => T(210, 92 + i * 30, ["Agreement missing", "Booked within 24h", "Other causes"][i], 12, C.ink, "", "start") + R(210, 97 + i * 30, 160, 8, "#eef1f5", 4) + `<g data-k="${p}b${i}">${R(210, 97 + i * 30, 160, 8, [C.orange, C.red, C.slate][i], 4)}</g>`);
      s += T(24, 196, "Handling time", 13, C.navy, "", "start");
      s += P("M40 262 A50 50 0 0 1 140 262", "#e3e8ee", 12) + f.D("ga", "M40 262 A50 50 0 0 1 140 262", C.orange, 12);
      s += K(p + "nd", P("M90 262 L90 222", C.ink, 3)) + O(90, 262, 5, C.ink);
      s += f.H("al", R(196, 220, 182, 52, "#fff4f1", 10, `stroke="${C.red}" stroke-width="2" class="a-pulse"`) + T(287, 242, "Repeated workaround", 13, C.red) + T(287, 261, "Investigate why", 12.5, C.ink));
      return s;
    },
    render(c, s) {
      c.tx("hd", s.hd || "After go-live");
      c.dr("ln", s.ln ? 1 : 0, { d: 1.6 });
      const bv = [0.7, 0.55, 0.25];
      for (let i = 0; i < 3; i++) c.mv("b" + i, { sx: s.bars ? bv[i] : 0.02, pv: [210, 101 + i * 30] }, { d: 1, dl: i * 0.15 });
      c.dr("ga", s.g ? 0.72 : 0, { d: 1.2 });
      c.mv("nd", { r: s.g ? 40 : -80, pv: [90, 262] }, { d: 1.2 });
      c.op("al", s.al ? 1 : 0);
    }
  };
}

// =====================================================================
// SHOT FAMILY: CHECK — a card whose items are confirmed one by one
// Benchmark template: "Infographics Pack by ARstudio" (Motion Array
// 135055) — reveal list primitives and callouts.
// =====================================================================
function F_CHECK(p) {
  const f = pfx(p);
  return {
    p, bench: "Infographics Pack by ARstudio (Motion Array)",
    draw() {
      let s = R(40, 16, 320, 226, C.white, 12, `stroke="${C.navy}" stroke-width="2"`) + R(40, 16, 320, 34, C.navy, 12) + R(40, 36, 320, 14, C.navy);
      s += f.TK("tt", 200, 39, "", 15, C.white);
      for (let i = 0; i < 5; i++) {
        const y = 76 + i * 36;
        s += f.H("r" + i, O(72, y, 11, "#eef1f5", `stroke="${C.slate}" stroke-width="1.5"`) + f.TK("iT" + i, 94, y + 5, "", 14, C.ink, "start"));
        s += f.H("ok" + i, O(72, y, 11, C.green) + tick(72, y, 0.6, C.white, 2.2));
        s += f.H("q" + i, O(72, y, 11, C.orange) + T(72, y + 5, "?", 14, C.white));
        s += f.H("x" + i, O(72, y, 11, C.red) + cross(72, y, 0.5, C.white, 2.2));
        s += f.H("hl" + i, R(52, y - 16, 296, 32, "none", 8, `stroke="${C.gold}" stroke-width="3"`));
      }
      s += f.H("st", `<g transform="rotate(-10 312 214)">${R(262, 198, 100, 32, "rgba(255,255,255,.95)", 6, `stroke="${C.plum}" stroke-width="3"`)}${f.TK("stT", 312, 219, "", 13, C.plum)}</g>`);
      s += f.H("pres", person(26, 282, 1.05, C.plum) + person(374, 282, 1.05, C.navy) + person(352, 282, 0.9, C.navy2));
      s += noteSVG(f, "nb", 200, 270);
      return s;
    },
    render(c, s) {
      c.tx("tt", s.t || "");
      const it = s.items || [], mk = s.mk || [];
      for (let i = 0; i < 5; i++) {
        const on = i < it.length;
        if (on) c.tx("iT" + i, it[i]);
        c.op("r" + i, on ? (s.dimTo != null && i > s.dimTo ? 0.3 : 1) : 0, { dl: i * 0.12 });
        c.mv("r" + i, on ? {} : { x: -16 });
        c.op("ok" + i, on && mk[i] === "ok" ? 1 : 0, { dl: 0.3 + i * 0.15 });
        c.op("q" + i, on && mk[i] === "q" ? 1 : 0, { dl: 0.3 + i * 0.15 });
        c.op("x" + i, on && mk[i] === "x" ? 1 : 0, { dl: 0.3 + i * 0.15 });
        c.op("hl" + i, s.hl === i ? 1 : 0);
      }
      c.tx("stT", s.st || ""); c.op("st", s.st ? 1 : 0); c.mv("st", s.st ? {} : { s: 1.6 }, { d: 0.5, e: "back.out(2)" });
      c.op("pres", s.pres ? 1 : 0);
      setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: COMPARE — the same frame, two states side by side
// Benchmark template: "The Pinned Before-and-After" — The Pudding,
// Responsive Scrollytelling (pudding.cool/process/responsive-scrollytelling).
// =====================================================================
function F_COMPARE(p) {
  const f = pfx(p);
  const panel = (x, k, col) => R(x, 24, 172, 206, C.white, 12, `stroke="${col}" stroke-width="2"`) + R(x, 24, 172, 34, col, 12) + R(x, 44, 172, 14, col) +
    f.TK(k + "T", x + 86, 47, "", 13.5, C.white) + f.TK(k + "1", x + 86, 92, "", 13.5, C.ink) + f.TK(k + "2", x + 86, 114, "", 13.5, C.ink);
  const marks = (x, k) => f.H(k + "ok", O(x + 86, 172, 26, C.green) + tick(x + 86, 172, 1.4, C.white, 4)) + f.H(k + "q", O(x + 86, 172, 26, C.orange) + T(x + 86, 182, "?", 28, C.white)) + f.H(k + "x", O(x + 86, 172, 26, C.red) + cross(x + 86, 172, 1.2, C.white, 4));
  return {
    p, bench: "Pinned Before-and-After (The Pudding)",
    draw() {
      let s = "";
      s += f.K("L", panel(14, "l", C.navy) + marks(14, "l"));
      s += f.K("Rr", panel(214, "r", C.orange) + marks(214, "r"));
      s += f.K("vs", O(200, 128, 17, C.white, `stroke="${C.slate}" stroke-width="2"`) + f.TK("vsT", 200, 133, "vs", 13, C.slate));
      s += noteSVG(f, "nb", 200, 266);
      return s;
    },
    render(c, s) {
      const l = s.l || ["", ""], r = s.r || ["", ""];
      c.tx("lT", s.lt || ""); c.tx("l1", l[0]); c.tx("l2", l[1]);
      c.tx("rT", s.rt || ""); c.tx("r1", r[0]); c.tx("r2", r[1]);
      c.tx("vsT", s.vs || "vs");
      ["ok", "q", "x"].forEach((m) => { c.op("l" + m, s.lm === m ? 1 : 0, { dl: 0.3 }); c.op("r" + m, s.rm === m ? 1 : 0, { dl: 0.6 }); });
      c.op("L", s.hl === "r" ? 0.4 : 1); c.op("Rr", s.hl === "l" ? 0.4 : 1);
      c.mv("L", s.hl === "l" ? { s: 1.03 } : {}); c.mv("Rr", s.hl === "r" ? { s: 1.03 } : {});
      setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: GOV — a business rule, its named owner and the authorised
// change route; informal edits are blocked
// Benchmark template: "Hierarchy traversal animated" (Observable
// @d3/hierarchy-traversal-animated) — visit one node then the next.
// =====================================================================
function F_GOV(p) {
  const f = pfx(p);
  const SX = [70, 200, 330], STEP = ["Propose change", "Owner approves", "Update procedure"];
  return {
    p, bench: "Hierarchy traversal animated (Observable)",
    draw() {
      let s = "";
      s += K(p + "rule", R(128, 34, 144, 70, C.white, 8, `stroke="${C.plum}" stroke-width="2.2"`) + F("M146 54 L156 64 L146 74 L136 64 Z", C.plum) + T(214, 62, "Corporate-", 13, C.plum) + T(214, 79, "rate rule", 13, C.plum));
      s += f.H("ow", person(54, 82, 1.25, C.navy) + chip(54, 124, "Rule owner", { sz: 13 }) + O(84, 56, 7, "none", `stroke="${C.amber}" stroke-width="2.6"`) + P("M90 56 h10 m-4 0 v5", C.amber, 2.6));
      s += f.H("link", P("M78 74 H126", C.navy, 2, 'stroke-dasharray="4 3"'));
      s += f.H("auth", `<g transform="rotate(-10 236 98)">${R(194, 86, 84, 26, "rgba(255,255,255,.95)", 5, `stroke="${C.green}" stroke-width="2.6"`)}${T(236, 104, "Authorised", 12.5, C.green)}</g>`);
      STEP.forEach((t, i) => { s += f.H("s" + i, chip(SX[i], 184, t, { sz: 12.5, st: C.green, fg: C.green })); if (i < 2) s += f.H("sa" + i, P(`M${SX[i] + 56} 184 H${SX[i + 1] - 58}`, C.green, 2.2) + F(`M${SX[i + 1] - 62} 179 L${SX[i + 1] - 54} 184 L${SX[i + 1] - 62} 189 Z`, C.green)); });
      s += f.H("tk", O(0, 0, 8, C.gold, `stroke="${C.amber}" stroke-width="1.5"`));
      s += f.H("ie", person(346, 84, 1.1, C.slate) + P("M330 76 Q300 60 278 64", C.red, 2, 'stroke-dasharray="4 3"') + `<g transform="rotate(-40 290 62)">${R(282, 56, 26, 8, C.gold, 2)}${F("M282 56 l-7 4 7 4 Z", C.ink)}</g>`);
      s += f.H("ieX", cross(300, 66, 1.8, C.red, 4.5));
      s += f.H("unaw", O(80, 40, 10, C.orange) + T(80, 45, "?", 13, C.white));
      s += noteSVG(f, "nb", 200, 262);
      return s;
    },
    render(c, s) {
      c.vis({ ow: s.ow, link: s.ow, auth: s.auth, ie: s.ie, ieX: s.ieX, unaw: s.unaw });
      c.mv("auth", s.auth ? {} : { s: 1.6 }, { d: 0.5, e: "back.out(2)" });
      for (let i = 0; i < 3; i++) { c.op("s" + i, i < (s.rt || 0) ? 1 : 0, { dl: i * 0.3 }); if (i < 2) c.op("sa" + i, i < (s.rt || 0) - 1 ? 1 : 0, { dl: i * 0.3 + 0.2 }); }
      const t = s.tk == null ? -1 : s.tk;
      c.op("tk", t >= 0 ? 1 : 0); if (t >= 0) c.mv("tk", { x: SX[t], y: 160 }, { d: 1 });
      setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: STACK — isometric exploded capability stack: a paper
// design gains interfaces, rules, procedures, exception path, test evidence
// Benchmark template: "The Process Architectural Motion" (Behance
// 194096661) — build and revise successive layers; plus inspiration-board
// #26 "Exploded process mechanism".
// =====================================================================
function F_STACK(p) {
  const f = pfx(p);
  const cx = 122, A = 80, B = 26, TH = 9, Y = [70, 102, 132, 162, 192, 222];
  const LAY = [null,
    { lab: "Interfaces", top: "#d3e3f2", l: "#86abcf", r: "#5f8ab3", col: C.navy },
    { lab: "Business rules", top: "#e6def1", l: "#a897c3", r: "#8a77ab", col: C.plum },
    { lab: "Manual procedures", top: "#d8ece1", l: "#86ba9f", r: "#619e81", col: C.green },
    { lab: "Exception path", top: "#f7e1d6", l: "#dc9c80", r: "#c77f61", col: C.orange },
    { lab: "Test evidence", top: "#f7ecd3", l: "#dcbd80", r: "#c5a05c", col: "#8a6418" }];
  const slab = (y, t, top, l, r, st) => F(`M${cx - A} ${y} L${cx} ${y + B} L${cx} ${y + B + t} L${cx - A} ${y + t} Z`, l) + F(`M${cx} ${y + B} L${cx + A} ${y} L${cx + A} ${y + t} L${cx} ${y + B + t} Z`, r) + F(`M${cx - A} ${y} L${cx} ${y - B} L${cx + A} ${y} L${cx} ${y + B} Z`, top, st ? `stroke="${st}" stroke-width="1.2"` : "");
  const icon = (j, y) => {
    const yy = y + 2;
    if (j === 1) return R(cx - 17, yy - 4, 10, 8, C.navy, 1.5) + R(cx + 7, yy - 4, 10, 8, C.navy, 1.5) + P(`M${cx - 7} ${yy} H${cx + 7}`, C.navy, 1.8, 'class="a-flow"');
    if (j === 2) return F(`M${cx} ${yy - 8} L${cx + 9} ${yy} L${cx} ${yy + 8} L${cx - 9} ${yy} Z`, C.plum) + tick(cx, yy, 0.45, C.white, 1.8);
    if (j === 3) return R(cx - 6, yy - 8, 12, 16, C.green, 2) + P(`M${cx - 3} ${yy - 3} H${cx + 3} M${cx - 3} ${yy + 2} H${cx + 3}`, C.white, 1.3);
    if (j === 4) return P(`M${cx - 10} ${yy + 4} Q${cx} ${yy - 12} ${cx + 9} ${yy + 2}`, C.orange, 2.6);
    return O(cx, yy, 8, "#8a6418") + tick(cx, yy, 0.5, C.white, 1.8);
  };
  return {
    p, bench: "The Process Architectural Motion (Behance) + Exploded mechanism (inspiration board #26)",
    draw() {
      let s = E(cx, 268, 104, 13, "rgba(27,42,58,.12)");
      for (let j = 5; j >= 1; j--) { const L = LAY[j]; s += f.H("pl" + j, slab(Y[j], TH, L.top, L.l, L.r) + icon(j, Y[j])); }
      s += K(p + "pl0", slab(Y[0], 3, "#eaf2fb", "#a9c2da", "#8eabc7", C.navy2) + P(`M66 ${Y[0]} H178`, C.navy, 2.6) + rep(4, (i) => F(`M${58 + i * 40} ${Y[0]} l8 -5 l8 5 l-8 5 Z`, C.navy)) +
        `<g transform="rotate(-6 122 84)">${R(88, 76, 68, 17, C.paper, 4, `stroke="${C.green}" stroke-width="2"`)}${T(122, 88.5, "Approved", 12, C.green)}</g>`);
      for (let j = 1; j <= 5; j++) s += f.H("lb" + j, P(`M${cx + A + 4} ${Y[j]} H230`, LAY[j].col, 1.5, 'stroke-dasharray="2 3"') + chip(308, Y[j], LAY[j].lab, { sz: 14, st: LAY[j].col, fg: LAY[j].col }));
      s += f.H("wk", person(24, 186, 1.05, C.green));
      s += f.H("bdg", star(24, 150, 1));
      s += f.H("odd", `<g class="a-bob">${buddy(146, 206, 8, C.orange)}</g>`);
      s += f.H("wkr", P("M40 200 Q4 286 120 286 Q190 286 196 250", C.red, 2.6, 'stroke-dasharray="5 5" class="a-flow"') + chip(80, 286, "Workaround", { sz: 12.5, st: C.red, fg: C.red }));
      s += f.H("guide", R(30, 238, 70, 26, C.white, 6, `stroke="${C.green}" stroke-width="1.6"`) + T(65, 256, "Route", 12.5, C.green));
      return s;
    },
    render(c, s) {
      const n = s.on || 0;
      for (let j = 1; j <= 5; j++) {
        const on = j <= n;
        c.op("pl" + j, on ? 1 : 0); c.mv("pl" + j, on ? (j === n ? { y: 0 } : {}) : { x: -70, y: -6 }, { d: 0.9 });
        c.op("lb" + j, on ? (s.hl && s.hl !== j ? 0.35 : 1) : 0); c.mv("lb" + j, on ? (s.hl === j ? { s: 1.06 } : {}) : { x: 24 });
      }
      c.vis({ wk: s.wk, bdg: s.bdg, odd: s.odd, wkr: s.wkr, guide: s.guide });
    }
  };
}

// =====================================================================
// SHOT FAMILY: KIT — Develop packs a handover kit; the case latches and
// crosses into Implement toward 14 properties
// Benchmark template: "Creative Design Workflow Animation" (Dribbble
// 27476599) — assemble shapes and refine; plus "World map with
// logistics" (LottieFiles qA3cpn3zMy) — trace routes between hubs.
// =====================================================================
function F_KIT(p) {
  const f = pfx(p);
  const CELL = (i) => [64 + (i % 3) * 64, 134 + Math.floor(i / 3) * 48];
  const ITEMS = ["Working systems", "Business rules", "Interfaces", "Manual procedures", "Exception catalogue", "Tested handover", "Rule owners", "Change control", "Support route"];
  const icon = (i, x, y) => {
    switch (i) {
      case 0: return R(x - 13, y - 10, 26, 18, C.navy, 3) + R(x - 9, y - 6, 18, 10, "#9cc0e0", 2) + R(x - 5, y + 8, 10, 3, C.navy, 1);
      case 1: return F(`M${x} ${y - 13} L${x + 13} ${y} L${x} ${y + 13} L${x - 13} ${y} Z`, C.plum) + tick(x, y, 0.55, C.white, 2);
      case 2: return R(x - 16, y - 7, 11, 14, C.navy2, 2) + R(x + 5, y - 7, 11, 14, C.green, 2) + P(`M${x - 5} ${y} H${x + 5}`, C.ink, 2);
      case 3: return R(x - 9, y - 12, 18, 24, C.paper, 2, `stroke="${C.green}" stroke-width="2"`) + P(`M${x - 5} ${y - 4} H${x + 5} M${x - 5} ${y + 2} H${x + 5} M${x - 5} ${y + 8} H${x + 2}`, C.green, 1.6);
      case 4: return R(x - 12, y - 12, 24, 24, C.orange, 3) + R(x - 8, y - 12, 4, 24, "#e9a184") + P(`M${x - 1} ${y - 5} H${x + 8} M${x - 1} ${y + 1} H${x + 8}`, C.white, 1.6);
      case 5: return person(x - 9, y + 9, 0.6, C.navy) + person(x + 9, y + 9, 0.6, C.green) + P(`M${x - 4} ${y - 8} Q${x} ${y - 14} ${x + 4} ${y - 8}`, C.orange, 1.8);
      case 6: return O(x - 5, y, 6, "none", `stroke="${C.amber}" stroke-width="2.6"`) + P(`M${x + 1} ${y} h12 m-4 0 v5`, C.amber, 2.6);
      case 7: return R(x - 9, y - 2, 18, 13, C.red, 2) + P(`M${x - 5} ${y - 2} v-5 a5 5 0 0 1 10 0 v5`, C.red, 2.2);
      default: return O(x, y, 12, "none", `stroke="${C.orange}" stroke-width="5"`) + O(x, y, 12, "none", `stroke="${C.white}" stroke-width="5" stroke-dasharray="6 6.6"`);
    }
  };
  return {
    p, bench: "Creative Design Workflow Animation (Dribbble) + World map with logistics (LottieFiles)",
    draw() {
      let s = "";
      s += ITEMS.map((t, i) => f.H("cl" + i, R(236, 32 + i * 24, 14, 14, C.white, 3, `stroke="${C.green}" stroke-width="1.6"`) + tick(243, 39 + i * 24, 0.5, C.green, 2) + T(256, 44 + i * 24, t, 12.5, C.ink, "", "start"))).join("");
      let cs = f.K("lid", R(24, 54, 192, 50, "#4a6782", 10) + R(34, 62, 172, 34, "#5d7c99", 6) + R(100, 70, 40, 6, "#2f465c", 3));
      cs += R(24, 104, 192, 154, "#35506b", 12) + R(30, 108, 180, 146, "#e6ecf1", 8) + rep(9, (i) => { const [x, y] = CELL(i); return R(x - 28, y - 20, 56, 42, "#f6f8fa", 5, `stroke="#c9d3dc" stroke-width="1"`); });
      cs += ITEMS.map((t, i) => { const [x, y] = CELL(i); return f.H("it" + i, icon(i, x, y)); }).join("");
      cs += f.H("tested", `<g transform="rotate(-10 ${CELL(5)[0]} ${CELL(5)[1]})">${R(CELL(5)[0] - 28, CELL(5)[1] - 9, 56, 18, "rgba(255,255,255,.92)", 4, `stroke="${C.green}" stroke-width="2"`)}${T(CELL(5)[0], CELL(5)[1] + 5, "Tested", 12, C.green)}</g>`);
      cs += f.H("cover", R(24, 104, 192, 154, "#4a6782", 12) + R(36, 116, 168, 130, "#5d7c99", 8) + R(108, 98, 24, 14, C.gold, 3));
      cs += f.H("covT", T(120, 186, "Handover kit", 16, C.white));
            cs += f.H("bug", O(196, 112, 12, C.orange) + P("M186 104 l-6 -6 M206 104 l6 -6 M184 116 h-6 M208 116 h6", C.orange, 2));
      s += f.K("case", cs);
      s += f.H("vendor", R(260, 120, 64, 50, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + O(292, 145, 14, C.navy) + T(292, 150, "C", 14, C.white) + chip(300, 196, "Software alone?", { sz: 13, st: C.red, fg: C.red }) + cross(352, 132, 1.1, C.red, 3));
      s += f.H("tabs", R(236, 168, 158, 82, C.white, 8, `stroke="${C.orange}" stroke-width="2"`) + chip(276, 190, "Response", { sz: 12, st: C.orange, fg: C.orange }) + chip(352, 190, "Role", { sz: 12, st: C.orange, fg: C.orange }) + chip(314, 226, "Authority", { sz: 12, st: C.orange, fg: C.orange }));
      s += f.H("pong", R(236, 168, 158, 82, C.white, 8, `stroke="${C.red}" stroke-width="2"`) + person(262, 226, 0.9, C.navy) + person(366, 226, 0.9, C.green) + P("M278 196 Q314 176 350 196 M350 206 Q314 226 278 206", C.red, 2, 'stroke-dasharray="4 3"') + clockI(314, 236, 10, C.red));
      s += f.H("divider", P("M230 18 V290", C.slate, 2, 'stroke-dasharray="6 5"') + T(120, 26, "Develop", 15, C.navy) + T(316, 26, "Implement", 15, C.green));
      s += f.H("notyet", chip(316, 120, "Not yet deployed", { sz: 14, st: C.orange, fg: C.orange }));
      s += f.H("map", rep(14, (i) => { const x = 246 + (i % 7) * 23, y = 54 + Math.floor(i / 7) * 34; return `<g data-k="${p}pin${i}" fill="${C.green}"><path d="M${x - 8} ${y + 8} V${y - 4} L${x} ${y - 11} L${x + 8} ${y - 4} V${y + 8} Z"/>${R(x - 2.5, y + 1, 5, 7, C.white, 1)}</g>`; }) + T(316, 116, "14 properties", 14, C.green));
      s += f.H("ev", chip(316, 86, "Test evidence", { sz: 14, bg: C.gold, st: C.amber, fg: C.ink }) + chip(316, 122, "Owners named", { sz: 14, st: C.green, fg: C.green }) + P("M316 136 V148", C.slate, 2));
      s += f.H("wk12", chip(316, 150, "Week 12 next", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
      return s;
    },
    render(c, s) {
      const n = s.n || 0;
      let cs = {}; if (s.moved) cs = { x: 196, y: 54, s: 0.6, pv: [120, 156] };
      c.mv("case", cs, { d: 1.2, e: "power2.inOut" });
      ITEMS.forEach((t, i) => {
        const on = i < n, [x, y] = CELL(i), fresh = on && i >= (s.from || 0);
        c.op("it" + i, on ? 1 : 0, { dl: fresh ? (i - (s.from || 0)) * 0.15 : 0 });
        c.mv("it" + i, on ? (s.zoom === i ? { s: 1.25 } : {}) : { x: 300 - x, y: 150 - y, s: 0.5 }, { d: 0.9, dl: fresh ? (i - (s.from || 0)) * 0.15 : 0, e: "back.out(1.4)" });
        c.op("cl" + i, on && s.list !== 0 ? 1 : 0, { dl: fresh ? 0.3 + (i - (s.from || 0)) * 0.15 : 0 });
      });
      c.mv("lid", { sy: s.lid === "closed" ? 0.02 : s.lid === "half" ? 0.55 : 1, pv: [120, 104] }, { d: 0.9 });
      c.op("cover", s.lid === "closed" ? 1 : 0, { dl: s.lid === "closed" ? 0.6 : 0 });
      c.op("covT", s.lid === "closed" && !s.moved && !s.ev ? 1 : 0);
      c.vis({ tested: s.tested, vendor: s.vendor, tabs: s.tabs, pong: s.pong, divider: s.divider, notyet: s.notyet, map: s.map, bug: s.bug, ev: s.ev, wk12: s.wk12 });
      for (let i = 0; i < 14; i++) c.fl("pin" + i, s.bug ? C.orange : C.green, { dl: s.bug ? i * 0.06 : 0 });
    }
  };
}

// =====================================================================
// SHOT FAMILY: FORUM — the "Automating the Exception" discussion board
// Benchmark template: "Clean Workflow Visualization with Motion Graphics"
// (Dribbble 27600376) — connect journey steps with transitions.
// =====================================================================
function F_FORUM(p) {
  const f = pfx(p);
  const ROWS = ["Unfamiliar organisation", "Configure or customise?", "Should the exception remain?", "Jeston, Chapter 19", "Post by mid-week", "Challenge two classmates", "Assessment 4 · Week 14"];
  const ic = (r, x, y) => [
    R(x - 9, y - 12, 18, 20, C.slate, 2) + R(x - 5, y - 8, 4, 4, C.white) + R(x + 1, y - 8, 4, 4, C.white) + R(x - 5, y - 1, 4, 4, C.white) + R(x + 1, y - 1, 4, 4, C.white),
    R(x - 12, y - 8, 24, 14, "#c9d6e6", 7) + O(x + 5, y - 1, 6, C.navy),
    O(x, y - 2, 10, C.orange) + T(x, y + 3, "?", 13, C.white),
    R(x - 11, y - 11, 22, 18, C.green, 2) + P(`M${x} ${y - 11} V${y + 7}`, C.white, 1.5),
    R(x - 10, y - 11, 20, 19, C.white, 2, `stroke="${C.red}" stroke-width="1.6"`) + R(x - 10, y - 11, 20, 6, C.red, 2) + O(x, y + 2, 3, C.red),
    R(x - 13, y - 11, 16, 11, C.white, 4, `stroke="${C.navy}" stroke-width="1.4"`) + R(x - 3, y - 4, 16, 11, C.white, 4, `stroke="${C.green}" stroke-width="1.4"`),
    star(x, y - 1, 1)][r];
  return {
    p, bench: "Clean Workflow Visualization with Motion Graphics (Dribbble)",
    draw() {
      let s = f.H("board", R(22, 22, 356, 238, C.white, 14, `stroke="${C.navy}" stroke-width="2"`) + R(22, 22, 356, 40, C.navy, 14) + R(22, 48, 356, 14, C.navy) + T(200, 49, "Automating the Exception", 17, C.white));
      s += ROWS.map((t, r) => f.H("fr" + r, ic(r, 52, 88 + r * 26) + T(74, 93 + r * 26, t, 14, r === 6 ? C.plum : C.ink, "", "start"))).join("");
      s += f.H("summ", [["Protect the design", C.navy], ["Develop capability", C.navy], ["Test exceptions", C.green], ["Prepare the handover", C.green]].map(([t, col], i) => chip(200, 52 + i * 56, t, { sz: 16, st: col, fg: col }) + (i < 3 ? P(`M200 ${67 + i * 56} V${93 + i * 56}`, C.slate, 2) + F(`M195 ${89 + i * 56} L200 ${96 + i * 56} L205 ${89 + i * 56} Z`, C.slate) : "")).join(""));
      return s;
    },
    render(c, s) {
      const n = s.n || 0;
      c.op("board", s.board ? 1 : 0);
      ROWS.forEach((t, r) => { c.op("fr" + r, s.board && r < n ? (r === n - 1 ? 1 : 0.55) : 0); c.mv("fr" + r, r === n - 1 ? { x: 4 } : {}); });
      c.op("summ", s.summ ? 1 : 0);
    }
  };
}

const SCENE_BG = [];
// ---------------------------------------------------------------------
// Stations shared by "deliverables" pipelines
// ---------------------------------------------------------------------
const ST_DEV = [
  { ic: "sys", l: ["Working", "systems"], col: C.navy },
  { ic: "rule", l: ["Decision", "rules"], col: C.plum },
  { ic: "proc", l: ["Staff", "procedures"], col: C.green },
  { ic: "test", l: ["Passed", "tests"], col: "#8a6418" }];
const Q4 = (a, b, c) => [1, 2, 3, 4].map((y) => ["Year " + y, a, b, c]);

// =====================================================================
// W11O1a · From a process design to an operating capability (30 lines)
// Shots: PIPE, PHASE, QUEUE, RULES, STACK, EXC, TEST, HAND, CHECK, ROUTES
// =====================================================================
{
  const id = "W11O1a";
  const plan = [
    ["pipe", { tok: "d", nb: "Design → operation" }, "Design to operation"],
    ["phase", { done: 6, nb: { t: "Investigated, then redesigned", c: "N" } }, "The journey so far"],
    ["pipe", { tok: "d", spon: 1, nb: { t: "Serve every property?", c: "P" } }, "The sponsor's question"],
    ["pipe", { big: 1, conf: 1, nb: { t: "A diagram can't run", c: "O" } }, "Diagrams don't operate"],
    ["pipe", { on: 3, tok: 2, nb: "Systems, rules, procedures" }, "Systems, rules, procedures"],
    ["phase", { hl: [7], nb: { t: "Phase 7 of 10", c: "O" } }, "Phase 7 of 10"],
    ["phase", { hl: [5, 6], sub: 1 }, "After Innovate, People"],
    ["phase", { hl: [5, 6, 7], sub: 1, arr: 1, nb: { t: "Make it usable", c: "O" } }, "Develop connects them"],
    ["queue", { n: 6, g: "wait", min: 47, clk: { t: "47 min wait", c: "R" }, nt: "Corporate-rate approval" }, "The recurring wait"],
    ["queue", { night: 1, n: 6, d: 6, g: "ok", clk: { t: "Done before 06:00", c: "G" }, nt: { t: "Resolved overnight", c: "G" } }, "Resolve rates overnight"],
    ["pipe", { tok: "door", shake: 1, nb: { t: "Sequence alone stays locked", c: "R" } }, "A diagram isn't enough"],
    ["rules", { q3: 1, tok: "start" }, "Three open questions"],
    ["stack", { on: 1, hl: 1 }, "Interfaces exchange data"],
    ["stack", { on: 2, hl: 2 }, "Rules make decisions"],
    ["rules", { fw: 1, env: "rev", ev: 0, hl: "fw", hT: "Human judgement", nr: { t: "Software can't decide", c: "O" } }, "Some need judgement"],
    ["stack", { on: 3, hl: 3, wk: 1 }, "Manual procedures"],
    ["rules", { miss: 1, tok: "dia", nt: { t: "Missing information", c: "R" } }, "Information unavailable"],
    ["exc", { br: 1, own: 1, tok: "owner" }, "An exception path"],
    ["exc", { br: 1, own: 1, bd: 1, pc: 1, inv: 1, tok: "inv", nt: { t: "Authority and a route", c: "N" } }, "Authority and instructions"],
    ["exc", { br: 1, wk: 1, tok: "miss", nt: { t: "Improvement undermined", c: "R" } }, "Workarounds return"],
    ["test", { kv: [1, 1, 0, 0], k: ["Normal booking", "Unusual case", "", ""], feed: 1, res: "pass", bd: ["ok", "ok"], nr: { t: "Results recorded", c: "G" } }, "Recorded test evidence"],
    ["test", { kv: [1, 1, 1, 0], k: ["Polished demo", "Unusual case", "Heavy workload", ""], bd: ["ok", "q", "q"], sp: 1, nb: { t: "Never tested", c: "O" } }, "A demo isn't proof"],
    ["hand", { cd: "rev", acc: 1, nt: { t: "Staff test the handover", c: "G" } }, "Staff test handovers"],
    ["test", { kv: [1, 1, 1, 0], k: ["Normal booking", "Unusual case", "Heavy workload", ""], feed: 2, res: "fail", def: 1, bd: ["ok", "ok", "x"], nb: { t: "Found before go-live", c: "G" } }, "Weaknesses found early"],
    ["pipe", { on: [0], it: 1, dim: 1, nb: { t: "IT is one part", c: "N" } }, "Not just the IT phase"],
    ["check", { t: "What Develop produces", items: ["Procedures", "Business rules", "Training material", "New software"], mk: ["ok", "ok", "ok", ""], dimTo: 2, nb: { t: "Mostly not new code", c: "N" } }, "Mostly non-software"],
    ["phase", { hl: [7], fnd: 1 }, "Coordinated disciplines"],
    ["pipe", { on: 4, tok: "door", unl: 1, nb: { t: "Implement operates it", c: "G" } }, "Prepare, then implement"],
    ["pipe", { on: 4, whole: 1, it: 1, unl: 1, nb: { t: "The whole process works", c: "G" } }, "The whole process"],
    ["routes", { nb: { t: "Which route fits?", c: "P" } }, "Choose the route"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#eef3f8", plan,
    desc: "Qasr's approved design becomes an operating capability: working systems, decision rules, staff procedures and passed tests, with interfaces, exception paths and test evidence shown on the corporate-rate booking.",
    shots: { pipe: F_PIPE("pp_", ST_DEV), phase: F_PHASE("ph_"), queue: F_QUEUE("qu_"), rules: F_RULES("ru_"), stack: F_STACK("sk_"), exc: F_EXC("ex_"), test: F_TEST("te_"), hand: F_HAND("ha_"), check: F_CHECK("ck_"), routes: F_ROUTES("ro_") }
  });
  SCENE_BG.push([id, "#eef3f8"]);
}

// =====================================================================
// W11O1b · Four ways to deliver the same capability (29 lines)
// Shots: PIPE, RULES, TEST, ROUTES, UPGRADE, TIERS, CHECK, DEV
// =====================================================================
{
  const id = "W11O1b";
  const RQ = ["Routine task", "Routing", "Rate rules", "Unique need"];
  const plan = [
    ["pipe", { on: 4, cur: 0, nb: { t: "Which technology?", c: "P" } }, "Next: which technology?"],
    ["rules", { night: 1, tok: "out", nt: { t: "Decide before arrival", c: "G" } }, "Decide before arrival"],
    ["test", { kv: [1, 1, 1, 0], k: ["Impressive demo", "Real bookings", "Exceptions", ""], feed: 0, res: "pass", bd: ["ok", "q", "q"], sp: 1, nb: { t: "Capable isn't a fit", c: "O" } }, "Demos can mislead"],
    ["routes", { mb: 1 }, "Control versus upkeep"],
    ["routes", { rq: RQ.slice(0, 3), wrong: 1, nb: { t: "Same solution for all?", c: "R" } }, "Not one solution"],
    ["routes", { f: 0, nb: "Adopt as supplied" }, "Buy standard"],
    ["routes", { f: 0, fit: 1, nb: { t: "Needs already match", c: "G" } }, "Needs already match"],
    ["routes", { f: 0, rq: ["Routine task"], nb: "Same as competitors" }, "A routine function"],
    ["routes", { f: 3, bk: 4, mt: 1, nb: { t: "Upkeep, no advantage", c: "R" } }, "Needless custom upkeep"],
    ["routes", { f: 1, tg: 1, lk: 1, nb: { t: "Code unchanged", c: "G" } }, "Configure settings"],
    ["rules", { fw: 1, env: "rev", ev: 0, hl: "fw", nl: { t: "Configured routing", c: "G" } }, "Route approvals"],
    ["upgrade", { cfg: 1, tg: 1, up: 1, cfg2: 1, nd: { t: "Settings carry over", c: "G" } }, "Upgrades stay easier"],
    ["rules", { fw: 1, env: "rev", xc: 1, hl: "fw", nt: { t: "Not evaluated", c: "R" }, nr: { t: "Routing ≠ deciding", c: "O" } }, "Routing isn't evaluating"],
    ["routes", { f: 2, plug: 1, nb: "Adds what's missing" }, "Extend the product"],
    ["rules", { gear: 1, tok: "out", fw: 1, fx: 1, hl: "ev", nt: { t: "Rules component", c: "A" } }, "Rules evaluate agreements"],
    ["upgrade", { ext: 1, up: 1, ext2: 1, nd: { t: "Upgrade exposure", c: "R" } }, "Fit versus upkeep"],
    ["upgrade", { ext: 1, lt: 1, np: { t: "Check vendor support", c: "P" } }, "Check vendor support"],
    ["routes", { f: 3, bk: 4, nb: { t: "Full control", c: "N" } }, "Build custom"],
    ["upgrade", { h1: "Qasr custom", ow: 1, np: { t: "You own every change", c: "O" } }, "Ownership means upkeep"],
    ["routes", { on: [0, 1, 2, 3], ring: 1, nb: { t: "No single answer", c: "P" } }, "No single answer"],
    ["routes", { rq: RQ, nb: { t: "Each need, own route", c: "G" } }, "Different needs, routes"],
    ["tiers", {}, "Three process types"],
    ["tiers", { hl: ["core"], star: 1, o: [{ t: "Protect the fit", c: "A" }] }, "Protect the core"],
    ["tiers", { hl: ["sup", "man"], o: [null, { t: "Proven solutions", c: "N" }, { t: "Control, reliable data", c: "P" }] }, "Supporting, management"],
    ["tiers", { rg: 1, o: [null, null, null, { t: "Supported standard fits", c: "G" }] }, "Stable rules: standard"],
    ["check", { t: "Before committing", items: ["Delivery speed", "Upgrade support", "Maintenance exposure", "Cost of later changes"], mk: ["ok", "ok", "ok", "ok"] }, "Four checks first"],
    ["upgrade", { cfg: 1, ud: 1, tg: 1, ext: 1, lk: 1, na: { t: "Reversible", c: "G" }, nd: { t: "Hard to change", c: "R" } }, "Reversible versus locked"],
    ["dev", { b: 1, B: DEV_HUMAN, ch: [1, 2, 3], own: 1, st: "no", log: ["Tool changed the steps", "Nobody decided this"] }, "Process decides, not tool"],
    ["dev", { b: 1, B: [DEV_A[0], DEV_HUMAN[1], DEV_A[2], DEV_A[3]], ch: [1], nt: { t: "One small concession", c: "O" } }, "Next: small concessions"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#f6f1e8", plan,
    desc: "Buy, configure, extend and build shown as product states, tied to the corporate-rate decision: routing versus rule evaluation, upgrade exposure, ownership, process types and the checks before committing.",
    shots: { pipe: F_PIPE("pp_", ST_DEV), rules: F_RULES("ru_"), test: F_TEST("te_"), routes: F_ROUTES("ro_"), upgrade: F_UPGRADE("up_"), tiers: F_TIERS("ti_"), check: F_CHECK("ck_"), dev: F_DEV("dv_") }
  });
  SCENE_BG.push([id, "#f6f1e8"]);
}

// =====================================================================
// W11O1c · When the software starts changing the design (28 lines)
// Shots: DEV, CHECK, RULES, QUEUE, COMPARE, LEDGER, UPGRADE
// =====================================================================
{
  const id = "W11O1c";
  const LOG4 = ["Arrival wait?", "Extra staffing", "Manual work", "Tech obligations"];
  const plan = [
    ["dev", { gap: [1], nt: { t: "Not supported", c: "R" } }, "Selected tool falls short"],
    ["check", { t: "Choosing a response", items: ["Technical capability", "Guest outcome", "Staffing", "Future obligations"], mk: ["ok", "q", "q", "q"] }, "More than features"],
    ["rules", { xc: 1, tok: "dia", nt: { t: "Vendor: can't evaluate", c: "R" } }, "Vendor C's limit"],
    ["rules", { fw: 1, env: "rev", xc: 1, hl: "fw", nr: { t: "Keep human approval?", c: "O" } }, "Keep human approval?"],
    ["queue", { n: 6, g: "wait", min: 47, clk: { t: "47 min again", c: "R" }, nt: { t: "The old delay returns", c: "R" } }, "The delay returns"],
    ["compare", { lt: "Technical constraint", l: ["Product cannot", "evaluate agreements"], lm: "x", rt: "Management choice", r: ["Configure, extend", "or change?"], rm: "q" }, "Constraint versus choice"],
    ["dev", { b: 1, B: DEV_HUMAN, ch: [1, 2, 3], own: 1, st: "q", log: ["Accept the queue?", "Justification: ?"] }, "Accepting needs reasons"],
    ["compare", { lt: "Vendor states", l: ["What software", "cannot do"], lm: "ok", rt: "Qasr decides", r: ["What it will", "accept"], rm: "q", hl: "r" }, "Vendor states, Qasr decides"],
    ["dev", { gA: 1, nt: { t: "The reference", c: "G" } }, "Design is the reference"],
    ["queue", { night: 1, n: 6, d: 6, g: "ok", clk: { t: "Resolved by 06:00", c: "G" }, nt: { t: "No arrival wait", c: "G" } }, "Overnight, no wait"],
    ["queue", { n: 7, g: "wait", min: 47, ns: 1, nt: { t: "Old queue, new system", c: "R" } }, "Old problem, new system"],
    ["dev", { b: 1, B: [DEV_A[0], ["Manual", "check"], DEV_A[2], DEV_A[3]], ch: [1], nt: { t: "Seems harmless", c: "O" } }, "One small concession"],
    ["dev", { b: 1, B: DEV_HUMAN, ch: [1, 2, 3], nr: { t: "Substantially different", c: "R" } }, "Concessions accumulate"],
    ["dev", { b: 1, B: DEV_HUMAN, ch: [1, 2, 3], own: "dim", log: ["Nobody decided this"], nr: { t: "Design drift", c: "R" } }, "This is design drift"],
    ["dev", { b: 1, B: DEV_HUMAN, ch: [1], log: ["Change: human approval", "Consequence: ?"] }, "Record every deviation"],
    ["dev", { b: 1, B: DEV_HUMAN, ch: [1], log: ["Change: human approval", "Arrival wait: still?"], nr: { t: "Do guests still wait?", c: "O" } }, "Do guests still wait?"],
    ["dev", { b: 1, B: DEV_HUMAN, ch: [1], log: LOG4 }, "Staff, work, obligations"],
    ["dev", { b: 1, B: DEV_HUMAN, ch: [1], own: 1, log: LOG4, nr: { t: "Named authority", c: "P" } }, "A named authority"],
    ["dev", { b: 1, B: DEV_HUMAN, ch: [1], own: 1, log: LOG4, st: "ok" }, "Owner accepts responsibility"],
    ["ledger", { bars: 1, rows: [["Year 1", "Upkeep ?", "Upkeep ?", "Upkeep ?"], ["Year 2", "Upkeep ?", "Upkeep ?", "Upkeep ?"]], unk: 1, nb: { t: "Beyond launch cost", c: "N" } }, "Beyond launch cost"],
    ["ledger", { bars: 1, rows: Q4("29% gap", "Shifts ?", "Upgrade ?"), unk: 1 }, "A four-year view"],
    ["upgrade", { ext: 1, up: 1, ext2: 1, nd: { t: "Technical dependency", c: "R" } }, "Extensions add dependency"],
    ["upgrade", { ext: 1, rv: 1, np: { t: "Still worth it?", c: "P" } }, "Review extensions yearly"],
    ["dev", { b: 1, B: DEV_CONFIG, ch: [1, 2], own: 1, st: "ok", log: ["Night approval", "Wait still removed"] }, "Not rejecting everything"],
    ["check", { t: "Make trade-offs visible", items: ["Identify the gap", "Evaluate trade-offs", "Record the deviation", "Obtain approval", "Review the impact"], mk: ["ok", "ok", "ok", "ok", "ok"] }, "Visible trade-offs"],
    ["dev", { b: 1, B: DEV_CONFIG, ch: [1, 2], own: 1, st: "ok", log: ["Improvement kept?", "Night shifts added"] }, "Know the impact"],
    ["queue", { night: 1, n: 6, d: 6, g: "ok", ns: 1, nsX: 1, nt: { t: "Old dysfunction blocked", c: "G" } }, "Dysfunction not rebuilt"],
    ["ledger", { bars: 1, nb: { t: "Three alternatives", c: "N" } }, "Next: three alternatives"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#f3ede2", plan,
    desc: "Vendor C cannot evaluate corporate agreements; human approval would restore the old queue. Approved and delivered processes are compared step by step, deviations are recorded and approved by a named owner, and four-year obligations are shown with unknown costs left unpriced.",
    shots: { dev: F_DEV("dv_"), check: F_CHECK("ck_"), rules: F_RULES("ru_"), queue: F_QUEUE("qu_"), compare: F_COMPARE("cp_"), ledger: F_LEDGER("lg_"), upgrade: F_UPGRADE("up_") }
  });
  SCENE_BG.push([id, "#f3ede2"]);
}

// =====================================================================
// W11O3a · Vendor C fits — but not quite (27 lines)
// Shots: CHECK, RULES, QUEUE, UPGRADE, SPLIT, DEV, COMPARE, LEDGER
// =====================================================================
{
  const id = "W11O3a";
  const V3 = ["Moderate feature set", "Cheaper later changes", "Trains internal staff"];
  const plan = [
    ["check", { t: "Vendor C", items: [], st: "Selected", nb: { t: "Problem not yet solved", c: "O" } }, "Vendor C selected"],
    ["check", { t: "Vendor C", items: V3, st: "Selected" }, "Vendor C's offer"],
    ["check", { t: "Vendor C", items: V3, mk: ["ok", "ok", "ok"], st: "Selected", nb: { t: "Maintainable over time", c: "G" } }, "Maintainable over time"],
    ["check", { t: "Vendor C", items: V3.concat(["Every improvement?"]), mk: ["ok", "ok", "ok", "q"], hl: 3, st: "Selected" }, "Selected isn't proven"],
    ["rules", { mag: 1, tok: "start", nt: { t: "How will it evaluate?", c: "N" } }, "Examine the evaluation"],
    ["queue", { n: 5, g: "wait", min: 47, clk: { t: "47 min wait", c: "R" } }, "The 47-minute wait"],
    ["queue", { n: 5, g: "wait", min: 47, nt: { t: "Could happen earlier", c: "O" } }, "Guests shouldn't wait"],
    ["rules", { night: 1, tok: "out", nt: { t: "Agreement sets the rate", c: "G" } }, "Resolve it overnight"],
    ["rules", { fw: 1, env: "rev", tok: "out", hl: "ev", nr: { t: "Evaluate, not forward", c: "G" } }, "Evaluate, not forward"],
    ["rules", { fw: 1, env: "rev", ev: 0, hl: "fw", open: 1, nb: { t: "Case kept open", c: "O" } }, "Vendor C routes requests"],
    ["rules", { fw: 1, env: "rev", xc: 1, hl: "fw", nt: { t: "Cannot evaluate", c: "R" } }, "It cannot evaluate"],
    ["rules", { fw: 1, fok: 1, env: "rev", xc: 1, nr: { t: "Partial process fit", c: "O" } }, "Partial process fit"],
    ["rules", { fw: 1, env: "rev", tok: "out", nr: { t: "Moving ≠ deciding", c: "O" } }, "Moving isn't deciding"],
    ["queue", { night: 1, n: 7, clk: { t: "Night queue", c: "P" }, nt: { t: "Every request routed", c: "P" } }, "Configure night routing"],
    ["queue", { night: 1, n: 7, d: 7, min: 0, clk: { t: "Cleared by 06:00", c: "G" } }, "Only if cleared in time"],
    ["queue", { n: 7, d: 7, g: "ok", nt: { t: "No wait, still manual", c: "O" } }, "Wait gone, rule missing"],
    ["queue", { night: 1, n: 9, d: 3, min: 0, clk: { t: "06:00 missed", c: "R" }, nt: { t: "Depends on staffing", c: "R" } }, "Depends on staffing"],
    ["rules", { gear: 1, tok: "out", nt: { t: "Rules component added", c: "A" } }, "Add a rules component"],
    ["upgrade", { ext: 1, up: 1, ext2: 1, tk: 1 }, "Fit, then upgrade risk"],
    ["split", { sort: 1, tag: 1, nb: { t: "A different outcome", c: "O" } }, "Or change the process"],
    ["dev", { b: 1, B: DEV_CHANGE, ch: [1, 2, 3], nr: { t: "Not the approved design", c: "R" } }, "Not the approved design"],
    ["check", { t: "Vendor C", items: V3.concat(["Right route?"]), mk: ["ok", "ok", "ok", "q"], hl: 3, st: "Selected", nb: { t: "Selection isn't proof", c: "O" } }, "Selection proves nothing"],
    ["check", { t: "Judge every route", items: ["Process fit", "Operating consequences", "Responsibilities created"], mk: ["q", "q", "q"] }, "Fit, consequences, duties"],
    ["dev", { gap: [1], nt: { t: "The exact missing capability", c: "R" } }, "Name the exact gap"],
    ["compare", { lt: "Software operates", l: ["Routes and", "records cases"], lm: "ok", rt: "Design delivered", r: ["Agreement", "evaluated?"], rm: "x" }, "Works isn't delivered"],
    ["ledger", { bars: 1, rows: [["Time", "3 weeks", "6 weeks", "4 months"], ["Operates", "29% old path", "Night shifts", "Upgrade risk"]] }, "Next: the alternatives"],
    ["rules", { fw: 1, fok: 1, env: "rev", xc: 1, nr: { t: "Works as advertised", c: "N" }, nt: { t: "Design not delivered", c: "R" } }, "Works, yet falls short"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#eef1f6", plan,
    desc: "Vendor C can route an approval request but cannot evaluate the corporate agreement. The 47-minute wait, overnight routing that depends on staff clearing the queue by 06:00, a rules add-on with upgrade risk and a design change covering 71 percent are shown concretely.",
    shots: { check: F_CHECK("ck_"), rules: F_RULES("ru_"), queue: F_QUEUE("qu_"), upgrade: F_UPGRADE("up_"), split: F_SPLIT("sp_"), dev: F_DEV("dv_"), compare: F_COMPARE("cp_"), ledger: F_LEDGER("lg_") }
  });
  SCENE_BG.push([id, "#eef1f6"]);
}

addStyles(SCENE_BG);
})();

// OPER621 · Week 11 · The Develop Phase — animated teaching scenes, version 2
// File: w11-claude-v2-part2.js  ·  Scenes: W11O3b, W11O3c, W11O2a, W11O2b
// Rebuilt from the narration-to-animation content audit: every narration line
// maps to one named shot family (benchmark template noted beside each family)
// whose state shows what that sentence says on Qasr's corporate-rate booking.
// Standalone part: registers its scenes and appends its own scoped rules into
// the single shared <style id="vl-sc-w11">. Parts may be concatenated in any order.
// Contract: VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
(() => {
"use strict";
// ===== shared engine (self-contained copy in every part) =====
window.VL_SCENES = window.VL_SCENES || {};
const VL_SCENES = window.VL_SCENES;
const PART = "p2";
const C = {
  navy: "#1f4e79", navy2: "#2d6a9f", orange: "#c0502a", paper: "#fbf8f1",
  ink: "#1b2a3a", blue: "#dbe7f2", green: "#317c61", gold: "#e5b76c",
  muted: "#91aabd", plum: "#6b4e8a", sand: "#efe4cf", sky: "#eaf2f8",
  red: "#b0362b", white: "#ffffff", mint: "#e1f0e8", peach: "#f8e3d8",
  lilac: "#ece6f3", slate: "#5d7389", night: "#1d3350", amber: "#a8741a"
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
const D = (k, d, s, w = 3, ex = "") => `<path data-k="${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100" ${ex}/>`;
const T = (x, y, s, sz = 14, f = C.ink, ex = "", a = "middle") => `<text x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const TK = (k, x, y, s, sz = 14, f = C.ink, a = "middle", ex = "") => `<text data-k="${k}" x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const K = (k, body, ex = "") => `<g data-k="${k}" ${ex}>${body}</g>`;
const H = (k, body, ex = "") => `<g data-k="${k}" style="opacity:0" ${ex}>${body}</g>`;
const tw = (s, sz) => Math.round(String(s).length * sz * 0.6 + sz * 1.3);
const chip = (x, y, s, o = {}) => {
  const sz = o.sz || 13, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.9);
  return R(x - w / 2, y - h / 2, w, h, o.bg || C.white, o.rx == null ? h / 2 : o.rx,
    `stroke="${o.st || C.navy}" stroke-width="${o.sw || 1.7}"${o.dash ? ' stroke-dasharray="4 3"' : ""}`) +
    T(x, y + sz * 0.36, s, sz, o.fg || C.navy);
};
const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${x - 7 * s} ${y} l${5 * s} ${5 * s} l${10 * s} ${-11 * s}`, col, w);
const cross = (x, y, s = 1, col = C.orange, w = 3) => P(`M${x - 6 * s} ${y - 6 * s} l${12 * s} ${12 * s} M${x + 6 * s} ${y - 6 * s} l${-12 * s} ${12 * s}`, col, w);
const person = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}</g>`;
const buddy = (x, y, r, col) => O(x, y, r, col) + O(x - r * 0.35, y - r * 0.12, r * 0.24, C.white) + O(x + r * 0.35, y - r * 0.12, r * 0.24, C.white) + O(x - r * 0.3, y - r * 0.08, r * 0.11, C.ink) + O(x + r * 0.4, y - r * 0.08, r * 0.11, C.ink);
const clockI = (x, y, r, col = C.orange, bg = C.white) => O(x, y, r, bg, `stroke="${col}" stroke-width="${Math.max(2, r / 6)}"`) + P(`M${x} ${y - r * 0.62} V${y} L${x + r * 0.45} ${y + r * 0.3}`, col, Math.max(2, r / 7));
const moon = (x, y, r, col = C.gold) => F(`M${x} ${y - r} A${r} ${r} 0 1 0 ${x} ${y + r} A${r * 1.3} ${r * 1.3} 0 0 1 ${x} ${y - r} Z`, col);
const star = (x, y, s = 1, col = C.gold) => F(`M${x} ${y - 10 * s} l${3 * s} ${6 * s} ${7 * s} ${1 * s} ${-5 * s} ${5 * s} ${1 * s} ${7 * s} ${-6 * s} ${-3 * s} ${-6 * s} ${3 * s} ${1 * s} ${-7 * s} ${-5 * s} ${-5 * s} ${7 * s} ${-1 * s} Z`, col, `stroke="${C.amber}" stroke-width="1"`);
const envelope = (x, y, col = C.orange) => R(x - 11, y - 8, 22, 16, C.white, 2, `stroke="${col}" stroke-width="1.6"`) + P(`M${x - 11} ${y - 8} L${x} ${y + 1} L${x + 11} ${y - 8}`, col, 1.5);
const bookTok = (col = C.navy2) => R(-15, -11, 30, 22, col, 4) + P("M-9 -4 H9 M-9 2 H5", C.white, 2) + O(9, 6, 2.5, C.gold);
const gear = (x, y, r, col, hole = C.paper) => {
  let d = ""; const n = 8;
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n * 0.55, a2 = a0 + Math.PI / n, a3 = a2 + Math.PI / n * 0.45;
    const p = (a, rr) => `${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`;
    d += (i ? "L" : "M") + p(a0, r) + "L" + p(a1, r) + "L" + p(a2, r * 0.78) + "L" + p(a3, r * 0.78);
  }
  return F(d + "Z", col) + O(x, y, r * 0.34, hole);
};

// ---- prefixed builders for shot families ----
const pfx = (p) => ({
  p,
  K: (k, b, e) => K(p + k, b, e),
  H: (k, b, e) => H(p + k, b, e),
  D: (k, d, s, w, e) => D(p + k, d, s, w, e),
  TK: (k, x, y, s, sz, f, a, e) => TK(p + k, x, y, s, sz, f, a, e)
});
const pc = (c, p) => {
  const o = { p, snap: c.snap, all: c.all, opEl: c.opEl, mvEl: c.mvEl, flEl: c.flEl, data: c.data };
  ["op", "mv", "dr", "fl", "tx", "cl"].forEach((m) => { o[m] = (k, ...a) => c[m](p + k, ...a); });
  o.vis = (m, t) => { const q = {}; Object.keys(m).forEach((k) => { q[p + k] = m[k]; }); c.vis(q, t); };
  return o;
};
// auto-sized note chips: variants N(avy) O(range) R(ed) G(reen) P(lum) F(illed)
const NOTE_COL = { N: [C.navy, C.white, C.navy], O: [C.orange, C.white, C.orange], R: [C.red, C.white, C.red], G: [C.green, C.white, C.green], P: [C.plum, C.white, C.plum], F: [C.navy, C.navy, C.white], A: [C.amber, C.white, C.amber] };
const noteSVG = (f, key, x, y, sz = 13) => Object.keys(NOTE_COL).map((v) => {
  const [st, bg, fg] = NOTE_COL[v];
  return f.H(key + v, R(x - 40, y - 13, 80, 26, bg, 13, `stroke="${st}" stroke-width="1.8"`) + f.TK(key + v + "T", x, y + sz * 0.36, "", sz, fg), `data-cx="${x}" data-sz="${sz}"`);
}).join("");
function setNote(c, key, n) {
  const v = n ? (typeof n === "string" ? "N" : (n.c || "N")) : "";
  const t = n ? (typeof n === "string" ? n : n.t) : "";
  Object.keys(NOTE_COL).forEach((q) => {
    if (q === v) {
      c.tx(key + q + "T", t);
      c.all(`[data-k="${c.p}${key}${q}"]`).forEach((g) => {
        const r = g.querySelector("rect"); const cx = +g.getAttribute("data-cx"); const sz = +g.getAttribute("data-sz") || 13;
        const w = Math.round(t.length * sz * 0.6 + sz * 1.6);
        if (r) { r.setAttribute("x", String(cx - w / 2)); r.setAttribute("width", String(w)); }
      });
    }
    c.op(key + q, q === v ? 1 : 0);
  });
}

// ---- per-part stylesheet (appended once into the shared <style id="vl-sc-w11">) ----
function sceneCSS(id, bg) {
  const s = ".vls-w11-" + id;
  return `
${s}{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:220px;overflow:hidden!important;box-sizing:border-box;border-radius:14px;background:${bg};color:${C.ink};font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w11-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w11-fig>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}
${s} svg text{font-family:inherit;font-weight:700;letter-spacing:.1px}
${s} [data-k]{transform-box:fill-box;transform-origin:50% 50%}
${s}.w11-css [data-k]{transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.85s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}
${s}.w11-snap [data-k],${s}.w11-rm [data-k]{transition:none!important}
${s}.w11-rm *,${s}.w11-snap *{animation:none!important}
${s} .w11-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:36px;padding:6px 12px 8px;font-size:14px;font-weight:700;line-height:1.25;color:${C.navy};background:rgba(255,255,255,.6);border-top:1px solid rgba(31,78,121,.12)}
${s} .w11-num{flex:0 0 auto;min-width:34px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w11-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.2px}
${s} .w11-lab.w11-in{animation:vlsw11CapIn .5s cubic-bezier(.22,.8,.24,1)}
${s} .w11-bar{flex:0 0 54px;height:4px;border-radius:4px;background:rgba(31,78,121,.15);overflow:hidden}
${s} .w11-bar i{display:block;height:100%;width:0;background:${C.orange};transition:width .6s ease}
${s}.w11-intro .w11-fig>svg{animation:vlsw11Intro .7s cubic-bezier(.22,.8,.24,1)}
${s} .a-flow{stroke-dasharray:5 7;animation:vlsw11Flow 1.1s linear infinite}
${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw11Spin 6s linear infinite}
${s} .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw11Bob 2.6s ease-in-out infinite}
${s} .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw11Pulse 2s ease-in-out infinite}
${s} .a-blink{animation:vlsw11Blink 1.4s ease-in-out infinite}
${s} .a-shake{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw11Shake .9s ease-in-out infinite}
@media (max-width:420px){${s} .w11-cap{font-size:13px;min-height:32px;padding:5px 10px 7px}${s} .w11-bar{flex-basis:40px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
}
const KEYFRAMES = `
@keyframes vlsw11CapIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes vlsw11Intro{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
@keyframes vlsw11Flow{to{stroke-dashoffset:-24}}
@keyframes vlsw11Spin{to{transform:rotate(360deg)}}
@keyframes vlsw11Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes vlsw11Pulse{0%,100%{opacity:.35;transform:scale(.94)}50%{opacity:.95;transform:scale(1.06)}}
@keyframes vlsw11Blink{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes vlsw11Shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}
`;
function addStyles(list) {
  if (typeof document === "undefined") return;
  let st = document.getElementById("vl-sc-w11");
  if (!st) { st = document.createElement("style"); st.id = "vl-sc-w11"; (document.head || document.documentElement).appendChild(st); }
  const flag = "w11claudev2" + PART;
  if (st.getAttribute("data-" + flag)) return;
  st.setAttribute("data-" + flag, "1");
  st.appendChild(document.createTextNode(KEYFRAMES + list.map(([id, bg]) => sceneCSS(id, bg)).join("\n")));
}

// ---- scene factory: build(el), step(i,n), reset() ----
function makeScene(cfg) {
  const { id, N, labels } = cfg;
  let root = null, useG = false;
  const mapK = (i, n) => {
    const nn = Math.max(1, Math.floor(num(n, N)));
    const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
    return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
  };
  const nodes = (k) => (root ? Array.prototype.slice.call(root.querySelectorAll('[data-k="' + k + '"]')) : []);
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
  function ctx(snap) {
    return {
      snap,
      op: (k, o, t = {}) => nodes(k).forEach((el) => op(el, o, t, snap)),
      mv: (k, st, t = {}) => nodes(k).forEach((el) => tf(el, st, t, snap)),
      dr: (k, f, t = {}) => nodes(k).forEach((el) => dash(el, f, t, snap)),
      fl: (k, col, t = {}) => nodes(k).forEach((el) => fill(el, col, t, snap)),
      tx: (k, s) => nodes(k).forEach((el) => { if (el.textContent !== String(s)) el.textContent = String(s); }),
      cl: (k, cls, on) => nodes(k).forEach((el) => el.classList.toggle(cls, !!on)),
      vis: (map, t = {}) => Object.keys(map).forEach((k) => { const v = map[k]; const o = typeof v === "number" ? clamp(v, 0, 1) : (v ? 1 : 0); nodes(k).forEach((el) => op(el, o, t, snap)); }),
      all: (sel) => (root ? Array.prototype.slice.call(root.querySelectorAll(sel)) : []),
      opEl: (el, o, t = {}) => op(el, o, t, snap),
      mvEl: (el, st, t = {}) => tf(el, st, t, snap),
      flEl: (el, col, t = {}) => fill(el, col, t, snap),
      data: (n, v) => { if (root) root.setAttribute("data-" + n, String(v)); }
    };
  }
  function caption(k, snap) {
    const lab = root.querySelector(".w11-lab"), nn = root.querySelector(".w11-num"), bar = root.querySelector(".w11-bar i");
    const txt = labels[k] || "";
    if (lab && lab.textContent !== txt) {
      lab.textContent = txt;
      if (!snap && !reduced()) { lab.classList.remove("w11-in"); void lab.offsetWidth; lab.classList.add("w11-in"); }
    }
    if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
    if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
  }
  function render(k, snap) {
    if (!root) return;
    if (snap) root.classList.add("w11-snap");
    try { cfg.render(ctx(snap), k); } catch (e) { if (window.console) console.warn("[VL W11 " + id + "]", e); }
    caption(k, snap);
    if (snap) { void root.offsetWidth; root.classList.remove("w11-snap"); }
    root.setAttribute("data-moment", String(k));
  }
  function kill() {
    if (root && useG) { try { window.gsap.killTweensOf(root.querySelectorAll("[data-k]")); } catch (_) {} }
  }
  function mount(el) {
    const r = document.createElement("div");
    r.className = "vls-w11-" + id + " w11-root" + (useG ? " w11-gsap" : " w11-css") + (reduced() ? " w11-rm" : " w11-intro");
    r.setAttribute("data-scene", id);
    r.innerHTML = '<div class="w11-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
      esc(cfg.desc) + '">' + cfg.draw() + '</svg></div><div class="w11-cap" aria-hidden="true"><span class="w11-num"></span><span class="w11-lab"></span><span class="w11-bar"><i></i></span></div>';
    if (typeof el.replaceChildren === "function") el.replaceChildren(r);
    else { el.innerHTML = ""; el.appendChild(r); }
    return r;
  }
  return {
    build(el) {
      if (!el || el.nodeType !== 1) return;
      kill();
      useG = hasG();
      root = mount(el);
      render(0, true);
    },
    step(i, n) { if (!root) return; render(mapK(i, n), false); },
    reset() { if (!root) return; kill(); render(0, true); }
  };
}

// ---- shot-based scene: every narration moment names one shot family + its state ----
// plan: [[shotName, stateObject, caption], ...] (one entry per narration line)
function shotScene(cfg) {
  const names = Object.keys(cfg.shots);
  const inst = {};
  names.forEach((nm) => { inst[nm] = cfg.shots[nm]; });
  const draw = () => R(-400, -300, 1200, 900, cfg.bg) +
    names.map((nm) => `<g data-k="SH_${nm}" style="opacity:0">${inst[nm].draw()}</g>`).join("");
  const render = (c, k) => {
    const [act, st] = cfg.plan[k];
    names.forEach((nm) => {
      const on = nm === act;
      c.op("SH_" + nm, on ? 1 : 0, { d: on ? 0.55 : 0.35, dl: on ? 0.12 : 0 });
      c.mv("SH_" + nm, on ? {} : { y: 10, s: 0.97 }, { d: 0.6 });
    });
    const shot = inst[act];
    shot.render(pc(c, shot.p), st || {}, k);
    c.data("benchmark", shot.bench);
    c.data("shot", act);
  };
  return makeScene({ id: cfg.id, N: cfg.plan.length, labels: cfg.plan.map((x) => x[2]), draw, render, desc: cfg.desc });
}

// =====================================================================
// SHOT FAMILY: RULES — evaluate the agreement vs. forward an approval
// Benchmark template: "Workflow AI Animation" (Dribbble 26275497) — data
// advances through stages; plus "Automated Workflows" (LottieFiles
// XR2hxXOdEK) — trigger, evaluate, complete.
// =====================================================================
function F_RULES(p) {
  const f = pfx(p);
  const doc = (x, y, l1, l2, col) => R(x, y, 104, 48, C.white, 8, `stroke="${col}" stroke-width="2"`) +
    R(x + 9, y + 12, 16, 22, "#eef3f8", 2, `stroke="${col}" stroke-width="1.4"`) +
    P(`M${x + 12} ${y + 18} h10 M${x + 12} ${y + 23} h10 M${x + 12} ${y + 28} h7`, col, 1.2) +
    T(x + 64, y + 21, l1, 13, col) + T(x + 64, y + 38, l2, 13, col);
  const POS = { start: [128, 132], dia: [204, 92], out: [300, 62], fwd: [64, 186], rev: [140, 226], hum: [332, 232] };
  return {
    p, bench: "Workflow AI Animation (Dribbble) + Automated Workflows (LottieFiles)",
    draw() {
      let s = "";
      s += f.K("agr", doc(12, 44, "Corporate", "agreement", C.navy));
      s += f.H("agrX", R(12, 44, 104, 48, C.white, 8, `stroke="${C.red}" stroke-width="2.4" stroke-dasharray="5 4"`) + T(64, 73, "Unavailable", 13, C.red));
      s += f.K("bkg", doc(12, 108, "Booking", "details", C.navy2));
      s += f.D("a1", "M116 68 C142 68 150 84 168 92", C.navy, 2.6);
      s += f.D("a2", "M116 132 C142 132 150 100 168 92", C.navy, 2.6);
      s += f.H("lbl", chip(142, 28, "Interface", { sz: 13, st: C.navy2, fg: C.navy2 }) + P("M142 37 V64", C.navy2, 1.4, 'stroke-dasharray="3 3"') + chip(204, 150, "Business rule", { sz: 13, st: C.plum, fg: C.plum }));
      s += f.K("dia", F("M204 56 L240 92 L204 128 L168 92 Z", C.navy) + f.TK("dA", 204, 89, "Apply", 13, C.white) + f.TK("dB", 204, 105, "rules", 13, C.white));
      s += f.H("gear", `<g class="a-spin">${gear(204, 92, 24, C.gold, C.navy)}</g>`);
      s += f.H("xc", cross(204, 92, 2.4, C.red, 5));
      s += f.H("mag", O(226, 74, 15, "rgba(255,255,255,.35)", `stroke="${C.ink}" stroke-width="3"`) + P("M237 85 L249 97", C.ink, 5));
      s += f.D("aO", "M240 92 H268", C.green, 3);
      s += f.H("out", R(272, 74, 120, 36, C.green, 18) + T(332, 97, "Rate confirmed", 13, C.white));
      s += f.H("q3", chip(330, 52, "How evaluated?", { st: C.orange, fg: C.orange, dash: 1 }) + chip(330, 92, "Which system?", { st: C.orange, fg: C.orange, dash: 1 }) + chip(330, 132, "If it fails?", { st: C.orange, fg: C.orange, dash: 1 }));
      s += f.D("aF", "M64 156 V226 H136", C.orange, 2.6);
      s += f.H("rev", person(178, 238, 1.15, C.orange) + T(178, 274, "Revenue office", 13, C.orange));
      s += f.D("aH", "M202 232 H268", C.orange, 3);
      s += f.H("hum", R(272, 214, 120, 36, C.orange, 18) + f.TK("hT", 332, 237, "Human approval", 13, C.white));
      for (let i = 0; i < 5; i++) s += f.H("q" + i, envelope(150, 204 - i * 11));
      s += f.H("fx", cross(100, 226, 1.4, C.red, 4));
      s += f.H("fok", O(100, 226, 10, C.green) + tick(100, 226, 0.55, C.white, 2));
      s += f.H("night", moon(380, 24, 11, C.gold));
      s += f.H("spin", O(380, 212, 8, "none", `stroke="${C.orange}" stroke-width="2.5" stroke-dasharray="12 8" class="a-spin"`));
      s += f.H("env", envelope(0, 0));
      s += f.H("tok", bookTok());
      s += noteSVG(f, "nt", 204, 22) + noteSVG(f, "nl", 104, 22) + noteSVG(f, "nr", 316, 168) + noteSVG(f, "nb", 320, 278);
      return s;
    },
    render(c, s) {
      const ev = s.ev !== 0, fw = !!s.fw, blocked = !!(s.xc || s.q3 || s.miss);
      const dE = s.hl === "fw" ? 0.28 : 1, dF = s.hl === "ev" ? 0.28 : 1;
      c.op("agrX", s.miss ? 1 : 0); c.op("agr", s.miss ? 0.12 : 1);
      c.dr("a1", 1); c.dr("a2", 1, { dl: 0.15 });
      c.op("a1", dE); c.op("a2", dE);
      c.tx("dA", s.dA || "Apply"); c.tx("dB", s.dB || "rules");
      c.op("dia", dE);
      c.mv("dia", s.pulse ? { s: 1.08 } : {});
      c.vis({ lbl: s.lbl, gear: s.gear, xc: s.xc, mag: s.mag, q3: s.q3, night: s.night, fx: s.fx, fok: s.fok, spin: s.open });
      const outOn = ev && !blocked;
      c.dr("aO", outOn ? 1 : 0, { dl: 0.5 }); c.op("aO", dE);
      c.op("out", outOn ? dE : 0, { dl: outOn ? 0.7 : 0 });
      c.mv("out", outOn ? {} : { x: -20 });
      c.dr("aF", fw ? 1 : 0); c.op("aF", dF);
      c.op("rev", fw ? dF : 0); c.dr("aH", fw && s.hum !== 0 ? 1 : 0, { dl: 0.4 }); c.op("aH", dF);
      c.tx("hT", s.hT || "Human approval");
      c.op("hum", fw && s.hum !== 0 ? dF : 0, { dl: 0.6 });
      for (let i = 0; i < 5; i++) { c.op("q" + i, i < (s.q || 0) ? 1 : 0, { dl: i * 0.08 }); c.mv("q" + i, i < (s.q || 0) ? {} : { x: -30 }); }
      const tp = s.tok && POS[s.tok];
      c.op("tok", tp ? 1 : 0);
      if (tp) c.mv("tok", { x: tp[0], y: tp[1] }, { d: 1.1, e: "power2.inOut" });
      c.cl("tok", "a-shake", s.tok === "dia" && blocked);
      const ep = s.env && POS[s.env];
      c.op("env", ep ? 1 : 0);
      if (ep) c.mv("env", { x: ep[0], y: ep[1] }, { d: 1.2, e: "power2.inOut" });
      setNote(c, "nt", s.nt); setNote(c, "nl", s.nl); setNote(c, "nr", s.nr); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: QUEUE — approval queue, clock, night shift, 06:00 deadline
// Benchmark template: "Bottling factory" (LottieFiles 53Q3SoGu0x) —
// items advance to a station and wait; plus "Process-Para" ring timer.
// =====================================================================
function F_QUEUE(p) {
  const f = pfx(p);
  const NC = 9;
  const card = () => R(-24, -7, 48, 14, C.white, 3, `stroke="${C.navy}" stroke-width="1.4"`) + R(-24, -7, 9, 14, C.navy2, 2) + P("M-10 0 H16", C.muted, 2);
  const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
  return {
    p, bench: "Bottling factory (LottieFiles) + Process-Para timer (LottieFiles)",
    draw() {
      let s = "";
      s += `<rect data-k="${p}sky" x="-400" y="-300" width="1200" height="430" fill="#e3eef8"/>`;
      s += R(-400, 130, 1200, 600, "#efe8da") + P("M-400 130 H800", "#d8ccb4", 2);
      s += f.K("sun", O(46, 42, 16, C.gold) + rep(8, (i) => { const a = i * Math.PI / 4; return P(`M${46 + 22 * Math.cos(a)} ${42 + 22 * Math.sin(a)} L${46 + 28 * Math.cos(a)} ${42 + 28 * Math.sin(a)}`, C.gold, 2.4); }));
      s += f.H("moon", moon(46, 42, 16, C.gold) + O(80, 26, 1.6, C.white) + O(96, 58, 1.4, C.white) + O(20, 74, 1.4, C.white));
      s += K(p + "clock", O(330, 62, 32, C.white, `stroke="${C.navy}" stroke-width="3"`) + rep(12, (i) => { const a = i * Math.PI / 6; return P(`M${330 + 26 * Math.sin(a)} ${62 - 26 * Math.cos(a)} L${330 + 30 * Math.sin(a)} ${62 - 30 * Math.cos(a)}`, C.navy, i % 3 ? 1.4 : 2.6); }) + O(330, 62, 3.5, C.navy));
      s += K(p + "hand", P("M330 62 V36", C.orange, 3.4));
      s += noteSVG(f, "clk", 312, 112, 14);
      s += R(14, 206, 132, 10, "#8a6a3a", 3) + T(80, 236, "Revenue office", 13, C.navy);
      s += f.K("s0", person(48, 198, 1, C.navy));
      s += f.H("s1", person(80, 198, 1, C.plum));
      s += f.H("s2", person(112, 198, 1, C.plum));
      s += R(250, 206, 140, 10, "#8a6a3a", 3) + T(320, 236, "Reception", 13, C.navy);
      s += K(p + "rcp", person(270, 198, 1, C.navy2));
      s += f.H("guest", `<g class="a-bob">${buddy(372, 186, 11, C.navy2)}</g>`);
      s += f.H("gw", clockI(372, 158, 10, C.red));
      s += f.H("gok", O(372, 160, 10, C.green) + tick(372, 160, 0.55, C.white, 2));
      for (let i = 0; i < NC; i++) s += f.H("c" + i, card());
      s += f.H("ns", R(150, 56, 62, 164, "none", 10, `stroke="${C.plum}" stroke-width="2.2" stroke-dasharray="6 4"`));
      s += f.H("nsX", cross(181, 140, 3, C.red, 5));
      s += f.H("cal", rep(7, (i) => R(14 + i * 35, 252, 32, 28, C.white, 5, `stroke="${C.slate}" stroke-width="1.3"`) + T(30 + i * 35, 271, DAYS[i], 12, C.slate)));
      [1, 4].forEach((d) => { s += f.H("ex" + d, R(14 + d * 35, 252, 32, 28, C.plum, 5) + moon(30 + d * 35, 266, 8, C.gold)); });
      s += f.H("cx", cross(65, 266, 1.3, C.red, 3.5) + cross(170, 266, 1.3, C.red, 3.5));
      s += noteSVG(f, "nc", 326, 266) + noteSVG(f, "nt", 184, 30) + noteSVG(f, "ng", 316, 150);
      return s;
    },
    render(c, s) {
      const night = !!s.night;
      c.fl("sky", night ? C.night : "#e3eef8", { d: 1 });
      c.op("sun", night ? 0 : 1); c.op("moon", night ? 1 : 0);
      c.mv("hand", { r: (s.min || 0) * 6, pv: [330, 62] }, { d: 1.4, e: "power2.inOut" });
      setNote(c, "clk", s.clk ? s.clk : null);
      c.op("s1", (s.st || 1) >= 2 ? 1 : 0); c.op("s2", (s.st || 1) >= 3 ? 1 : 0);
      c.mv("s1", (s.st || 1) >= 2 ? {} : { y: 20 }); c.mv("s2", (s.st || 1) >= 3 ? {} : { y: 20 });
      const n = Math.min(NC, s.n || 0), d = Math.min(n, s.d || 0);
      for (let i = 0; i < NC; i++) {
        let pos, o = 1;
        if (i >= n) { pos = { x: 100, y: 120 }; o = 0; }
        else if (i < d) pos = { x: 316, y: 196 - i * 5 };
        else pos = { x: 181, y: 196 - (i - d) * 16 };
        c.op("c" + i, o, { dl: i * 0.04 });
        c.mv("c" + i, pos, { d: 1, dl: (i < d ? i * 0.08 : 0), e: "power2.inOut" });
      }
      c.op("guest", s.g ? 1 : 0);
      c.op("gw", s.g === "wait" ? 1 : 0); c.op("gok", s.g === "ok" ? 1 : 0);
      c.mv("guest", s.g === "wait" ? {} : s.g === "ok" ? { x: -6 } : { x: 30 });
      c.vis({ ns: s.ns, nsX: s.nsX, cal: s.cal || s.calX, ex1: s.cal || s.calX, ex4: s.cal || s.calX, cx: s.calX });
      c.op("ex1", s.cal ? 1 : s.calX ? 0.35 : 0); c.op("ex4", s.cal ? 1 : s.calX ? 0.35 : 0);
      setNote(c, "nc", s.cal ? { t: "+2 night shifts", c: "P" } : s.calX ? { t: "No extra shifts", c: "G" } : null);
      setNote(c, "nt", s.nt); setNote(c, "ng", s.ng);
    }
  };
}

// =====================================================================
// SHOT FAMILY: PIPE — approved design passes through concrete
// deliverables before the Implement door unlocks
// Benchmark template: "Multi-Step Icon Animation" (LottieFiles
// uAM7js17jU) — activate one step after another; plus "Interactive
// Computer Assembly Sequence" (CodePen OJqNMVR).
// =====================================================================
function F_PIPE(p, ST) {
  const f = pfx(p);
  const XY = [[152, 84], [258, 84], [152, 166], [258, 166]];
  const icon = (t, x, y, col) => {
    if (t === "sys") return R(x - 13, y - 10, 26, 17, col, 3) + R(x - 9, y - 7, 18, 11, C.white, 1) + R(x - 5, y + 8, 10, 3, col, 1);
    if (t === "rule") return F(`M${x} ${y - 11} L${x + 11} ${y} L${x} ${y + 11} L${x - 11} ${y} Z`, col) + tick(x, y, 0.45, C.white, 1.8);
    if (t === "proc") return R(x - 9, y - 11, 18, 22, C.white, 2, `stroke="${col}" stroke-width="2"`) + P(`M${x - 5} ${y - 4} h10 M${x - 5} ${y + 1} h10 M${x - 5} ${y + 6} h7`, col, 1.5);
    if (t === "test") return O(x, y, 11, col) + tick(x, y, 0.6, C.white, 2.2);
    if (t === "cat") return R(x - 11, y - 11, 22, 22, col, 3) + R(x - 7, y - 11, 4, 22, C.white, 1);
    if (t === "hand") return person(x - 8, y + 9, 0.55, col) + person(x + 8, y + 9, 0.55, col) + P(`M${x - 4} ${y - 8} Q${x} ${y - 13} ${x + 4} ${y - 8}`, C.orange, 1.8);
    return O(x, y, 10, "none", `stroke="${col}" stroke-width="4"`) + O(x, y, 4, col);
  };
  return {
    p, bench: "Multi-Step Icon Animation (LottieFiles) + Computer Assembly Sequence (CodePen)",
    draw() {
      let s = "";
      s += f.K("doc", R(14, 98, 78, 96, C.white, 6, `stroke="${C.navy}" stroke-width="2"`) + T(53, 120, "Approved", 13, C.navy) + T(53, 136, "design", 13, C.navy) +
        P("M26 152 H80", C.navy, 2) + rep(3, (i) => F(`M${32 + i * 20} 152 l6 -5 l6 5 l-6 5 Z`, C.navy)) + P("M26 172 H70 M26 182 H62", C.muted, 2));
      ST.forEach((st, i) => {
        const [x, y] = XY[i];
        s += f.K("st" + i, R(x - 49, y - 34, 98, 68, C.white, 8, `stroke="${st.col}" stroke-width="2"`) + icon(st.ic, x, y - 13, st.col) + T(x, y + 11, st.l[0], 12.5, st.col) + T(x, y + 26, st.l[1], 12.5, st.col));
        s += f.H("lit" + i, R(x - 49, y - 34, 98, 68, "none", 8, `stroke="${st.col}" stroke-width="4"`) + O(x + 41, y - 27, 9, C.green) + tick(x + 41, y - 27, 0.5, C.white, 2));
        s += f.H("cur" + i, R(x - 54, y - 39, 108, 78, "none", 11, `stroke="${C.gold}" stroke-width="3" class="a-pulse"`));
      });
      s += K(p + "door", R(330, 98, 56, 96, "#cfe7da", 4, `stroke="${C.green}" stroke-width="2.4"`) + T(358, 214, "Implement", 13, C.green));
      s += f.K("panel", R(334, 102, 48, 88, C.green, 3) + O(373, 148, 3, C.white), "");
      s += f.K("lock", R(348, 140, 20, 16, C.slate, 3) + P("M352 140 v-6 a6 6 0 0 1 12 0 v6", C.slate, 2.6));
      s += f.H("tok", R(-11, -14, 22, 28, C.navy, 3) + P("M-6 -6 h12 M-6 0 h12 M-6 6 h8", C.white, 1.6));
      s += f.H("conf", person(52, 254, 1.1, C.slate) + R(68, 214, 22, 20, C.white, 6, `stroke="${C.orange}" stroke-width="1.6"`) + T(79, 229, "?", 14, C.orange));
      s += f.H("itB", R(100, 46, 104, 76, "none", 10, `stroke="${C.navy2}" stroke-width="2.4" stroke-dasharray="5 4"`));
      s += f.H("whole", R(98, 44, 214, 160, "none", 14, `stroke="${C.green}" stroke-width="3"`));
      s += f.H("spon", person(372, 262, 1.1, C.plum));
      s += noteSVG(f, "nb", 210, 236) + noteSVG(f, "nt", 205, 24);
      return s;
    },
    render(c, s) {
      const on = s.on || 0;
      ST.forEach((st, i) => {
        const lit = Array.isArray(on) ? on.indexOf(i) >= 0 : i < on;
        c.op("lit" + i, lit ? 1 : 0, { dl: lit ? i * 0.2 : 0 });
        c.op("st" + i, s.dim && !lit ? 0.35 : 1);
        c.mv("st" + i, s.cur === i ? { s: 1.05 } : {});
        c.op("cur" + i, s.cur === i ? 1 : 0);
      });
      const open = !!s.unl;
      c.op("lock", open ? 0 : 1);
      c.mv("lock", open ? { y: -12 } : s.shake ? { x: 4 } : {});
      c.mv("panel", { sx: open ? 0.08 : 1, pv: [334, 146] }, { d: 1 });
      c.op("doc", s.doc === 0 ? 0.3 : 1);
      c.mv("doc", s.big ? { s: 1.12 } : {});
      let tp = null;
      if (s.tok === "d") tp = [53, 146]; else if (s.tok === "door") tp = [358, 146]; else if (typeof s.tok === "number") tp = XY[s.tok];
      c.op("tok", tp ? 1 : 0);
      if (tp) c.mv("tok", { x: tp[0], y: tp[1] }, { d: 1.1, e: "power2.inOut" });
      c.vis({ conf: s.conf, itB: s.it, whole: s.whole, spon: s.spon });
      setNote(c, "nb", s.nb); setNote(c, "nt", s.nt);
    }
  };
}

// =====================================================================
// SHOT FAMILY: UPGRADE — supported settings carry over, a custom
// extension breaks when the vendor ships a new version
// Benchmark template: "Git Workflow 1" (LottieFiles G6eTYjLVJ5) —
// branch, merge and reconnect; plus "Process - Success" check draw.
// =====================================================================
function F_UPGRADE(p) {
  const f = pfx(p);
  const block = (x, title, key) => R(x, 70, 128, 100, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + R(x, 70, 128, 22, C.navy, 8) + R(x, 84, 128, 8, C.navy) + f.TK(key, x + 64, 86, title, 13, C.white);
  const panel = (x) => R(x, 104, 70, 54, "#eef3f8", 5, `stroke="${C.green}" stroke-width="1.6"`) + rep(3, (i) => R(x + 10, 112 + i * 15, 30, 9, "#c7d6e4", 4.5));
  const ext = (x, y, col) => R(x, y, 40, 50, col, 6) + gear(x + 20, y + 25, 12, C.amber, col);
  return {
    p, bench: "Git Workflow 1 (LottieFiles) + Process - Success (LottieFiles)",
    draw() {
      let s = "";
      s += block(10, "Vendor C v1", "h1") + T(74, 186, "Current version", 13, C.navy);
      s += f.H("cfg", panel(22) + rep(3, (i) => `<g data-k="${p}k${i}">${O(36, 116 + i * 15, 5, C.green)}</g>`));
      s += f.H("cfgL", chip(57, 52, "Settings", { sz: 13, st: C.green, fg: C.green }));
      s += f.H("ext", ext(138, 100, C.gold) + P("M138 125 h-6", C.amber, 3));
      s += f.H("extL", chip(158, 52, "Rules add-on", { sz: 13, st: C.amber, fg: C.amber }));
      s += f.H("lk", R(150, 136, 16, 13, C.red, 2) + P("M153 136 v-4 a5 5 0 0 1 10 0 v4", C.red, 2.2));
      s += f.H("ud", O(57, 131, 18, "rgba(255,255,255,.7)", `stroke="${C.green}" stroke-width="2.4"`) + P("M50 126 a8 8 0 1 1 1 10", C.green, 2.4) + F("M46 122 L50 130 L55 124 Z", C.green));
      s += f.H("arr", P("M184 120 H232", C.plum, 3, 'class="a-flow"') + F("M228 113 L238 120 L228 127 Z", C.plum) + chip(211, 26, "Vendor upgrade", { sz: 13, st: C.plum, fg: C.plum }));
      s += f.H("v2", block(242, "Vendor C v2", "h2") + T(306, 186, "New version", 13, C.navy));
      s += f.H("cfg2", panel(254) + rep(3, (i) => O(268, 116 + i * 15, 5, C.green)) + O(316, 108, 9, C.green) + tick(316, 108, 0.5, C.white, 2));
      s += f.H("ext2", `<g transform="rotate(16 208 150)">${ext(188, 128, "#f3c7b4")}${P("M196 132 L206 150 L198 160 L210 176", C.red, 3)}</g>`);
      s += f.H("tk", R(118, 222, 164, 66, C.white, 8, `stroke="${C.red}" stroke-width="2"`) + R(118, 222, 164, 20, C.red, 8) + R(118, 234, 164, 8, C.red) + T(200, 237, "Repair task", 13, C.white) + T(200, 262, "Rework add-on", 13, C.ink) + T(200, 280, "Cost: unknown", 13, C.red));
      s += f.H("lt", R(10, 206, 150, 86, C.white, 6, `stroke="${C.navy}" stroke-width="1.8"`) + T(85, 226, "Vendor C, in writing", 12.5, C.navy) + T(85, 248, "Add-on is outside", 12.5, C.red) + T(85, 265, "supported upgrades", 12.5, C.red) + P("M100 282 q8 -8 14 0 t14 -2", C.navy, 1.6));
      s += f.H("rv", P("M176 264 H388", C.plum, 2) + rep(4, (i) => O(196 + i * 60, 264, 11, C.plum) + tick(196 + i * 60, 264, 0.55, C.white, 2) + T(196 + i * 60, 290, "Year " + (i + 1), 12.5, C.plum)) + chip(282, 234, "Yearly review", { sz: 13, st: C.plum, fg: C.plum }));
      s += f.H("ow", rep(6, (i) => R(24 + (i % 3) * 34, 104 + Math.floor(i / 3) * 26, 30, 22, C.orange, 3)) + rep(4, (i) => chip(52 + i * 99, 270, ["Develop", "Test", "Maintain", "Adapt"][i], { sz: 13, st: C.orange, fg: C.orange })) + person(200, 232, 1.1, C.navy) + T(250, 236, "Qasr team", 13, C.navy, "", "start"));
      s += noteSVG(f, "nd", 306, 212) + noteSVG(f, "na", 74, 212) + noteSVG(f, "np", 205, 24);
      return s;
    },
    render(c, s) {
      c.tx("h1", s.h1 || "Vendor C v1");
      c.vis({ cfg: s.cfg, cfgL: s.cfg && !s.np, ext: s.ext, extL: s.ext && !s.np && !s.cfg, lk: s.lk, ud: s.ud });
      c.mv("ext", s.ext ? {} : { x: 40 }, { d: 0.9, e: "back.out(1.6)" });
      for (let i = 0; i < 3; i++) c.mv("k" + i, { x: s.tg ? [28, 0, 28][i] : [0, 28, 0][i] }, { d: 0.7, dl: i * 0.1 });
      c.op("arr", s.up ? 1 : 0); c.op("v2", s.up ? 1 : 0); c.mv("v2", s.up ? {} : { x: 30 });
      c.op("cfg2", s.cfg2 ? 1 : 0, { dl: 0.6 }); c.mv("cfg2", s.cfg2 ? {} : { x: -150 }, { d: 1.1, dl: 0.4 });
      c.op("ext2", s.ext2 ? 1 : 0, { dl: 0.7 }); c.mv("ext2", s.ext2 ? {} : { x: -40, y: -20 }, { d: 1, dl: 0.5, e: "bounce.out" });
      c.vis({ tk: s.tk, lt: s.lt, rv: s.rv, ow: s.ow });
      c.mv("tk", s.tk ? {} : { y: 30 });
      setNote(c, "nd", s.nd); setNote(c, "na", s.na); setNote(c, "np", s.np);
    }
  };
}

// =====================================================================
// SHOT FAMILY: SPLIT — 100 corporate arrivals sort into 71 resolved and
// 29 on the old approval path (booked within 24 hours)
// Benchmark template: "Sankey animation - acyclic graph" (Observable
// @joaormendes) + "Stacked-to-grouped bars" (Observable @d3) — units keep
// their identity while regrouping.
// =====================================================================
function F_SPLIT(p) {
  const f = pfx(p);
  const g = (i) => [16 + (i % 10) * 13, 48 + Math.floor(i / 10) * 13];
  const tgt = (i) => i < 71 ? [208 + (i % 15) * 12, 62 + Math.floor(i / 15) * 12] : [208 + ((i - 71) % 15) * 12, 178 + Math.floor((i - 71) / 15) * 12];
  return {
    p, bench: "Sankey animation (Observable) + Stacked-to-grouped bars (Observable)",
    draw() {
      let s = T(80, 32, "100 corporate arrivals", 13, C.navy);
      s += f.K("bG", R(198, 30, 194, 102, "#eef7f1", 10, `stroke="${C.green}" stroke-width="2"`) + T(208, 50, "Rate resolved", 14, C.green, "", "start") + f.TK("nG", 384, 50, "", 15, C.green, "end"));
      s += f.K("bO", R(198, 146, 194, 62, "#fbefe8", 10, `stroke="${C.orange}" stroke-width="2"`) + T(208, 166, "Old approval path", 14, C.orange, "", "start") + f.TK("nO", 384, 166, "", 15, C.orange, "end"));
      s += rep(100, (i) => { const [x, y] = g(i); return `<rect class="${p}t" data-i="${i}" data-k="${p}t" x="${x}" y="${y}" width="10" height="10" rx="2.5" fill="#c5ced8"/>`; });
      s += f.H("tag", chip(295, 226, "Booked within 24h", { sz: 13, bg: C.orange, st: C.orange, fg: C.white }));
      s += f.H("cG", clockI(28, 222, 13, C.green) + T(48, 227, "Quick", 13, C.green, "", "start"));
      s += f.H("cO", clockI(28, 256, 13, C.red) + T(48, 261, "Waits longer", 13, C.red, "", "start"));
      s += f.H("own", person(176, 196, 1.05, C.navy) + star(176, 166, 0.8));
      s += f.H("why", O(300, 182, 30, "rgba(255,255,255,.25)", `stroke="${C.ink}" stroke-width="3"`) + P("M321 203 L338 220", C.ink, 6));
      s += f.H("dep", O(372, 194, 11, C.green) + tick(372, 194, 0.6, C.white, 2.2));
      s += noteSVG(f, "nb", 200, 278) + noteSVG(f, "nl", 82, 210);
      return s;
    },
    render(c, s) {
      const tiles = c.all("." + p + "t");
      const col = !!s.col || !!s.sort;
      tiles.forEach((el) => {
        const i = +el.getAttribute("data-i"), orange = i >= 71;
        let fill = "#c5ced8";
        if (col) fill = orange ? C.orange : C.green;
        if (s.fix && orange) fill = C.navy2;
        let o = 1;
        if (s.dimG && !orange) o = 0.25;
        if (s.dimO && orange) o = 0.25;
        if (s.one != null) o = i === s.one ? 1 : 0.25;
        c.flEl(el, fill, { dl: s.col && !s.sort ? (i % 29) * 0.015 : 0 });
        c.opEl(el, o);
        if (s.sort) { const [a, b] = g(i), [x, y] = tgt(i); c.mvEl(el, { x: x - a, y: y - b }, { d: 1.1, dl: (orange ? (i - 71) : i) * 0.012, e: "power2.inOut" }); }
        else c.mvEl(el, i === s.one ? { s: 1.6 } : {}, { d: 0.8 });
      });
      c.op("bG", s.bins === 0 ? 0 : 1); c.op("bO", s.bins === 0 ? 0 : 1);
      c.op("bG", s.dimG ? 0.4 : s.bins === 0 ? 0 : 1); c.op("bO", s.dimO ? 0.4 : s.bins === 0 ? 0 : 1);
      c.tx("nG", s.sort ? "71" : ""); c.tx("nO", s.sort ? "29" : "");
      c.vis({ tag: s.tag, cG: s.clk, cO: s.clk || s.clkO, own: s.own, why: s.why, dep: s.dep });
      setNote(c, "nb", s.nb); setNote(c, "nl", s.nl);
    }
  };
}

// =====================================================================
// SHOT FAMILY: LEDGER — three options as columns: initial cost bars to
// true scale, then rows of continuing obligations (unknowns stay "?")
// Benchmark template: "Infographic Chart Creator" (Motion Array 36176) —
// grow columns, update labels; plus "Stacked-to-grouped bars".
// =====================================================================
function F_LEDGER(p) {
  const f = pfx(p);
  const X = [128, 228, 328], COL = [C.orange, C.navy, C.amber], NAME = ["Change design", "Configure", "Extend"];
  const COST = [95, 180, 540], VAL = ["AED 95K", "AED 180K", "AED 540K"], BASE = 112, MAXH = 68;
  const RY = (r) => 132 + r * 29;
  return {
    p, bench: "Infographic Chart Creator (Motion Array) + Stacked-to-grouped bars (Observable)",
    draw() {
      let s = "";
      X.forEach((x, j) => {
        s += f.H("f" + j, R(x - 50, 6, 100, 250, "none", 10, `stroke="${COL[j]}" stroke-width="3"`));
        s += f.K("nm" + j, T(x, 22, NAME[j], 13, COL[j]));
        const h = COST[j] / 540 * MAXH;
        s += f.H("b" + j, R(x - 25, BASE - h, 50, h, COL[j], 3));
        s += f.H("v" + j, T(x, BASE - h - 6, VAL[j], 13, COL[j]));
      });
      s += P(`M78 ${BASE} H378`, C.slate, 1.5);
      for (let r = 0; r < 4; r++) {
        s += f.H("rl" + r, `<g>${f.TK("rT" + r, 8, RY(r) + 18, "", 12.5, C.slate, "start")}</g>`);
        X.forEach((x, j) => {
          s += f.H(`c${r}${j}`, R(x - 47, RY(r), 94, 26, j === 0 ? "#fbefe8" : j === 1 ? "#e8f0f8" : "#f6eedb", 6) + f.TK(`t${r}${j}`, x, RY(r) + 18, "", 12.5, C.ink));
          s += f.H(`u${r}${j}`, R(x - 47, RY(r), 94, 26, "none", 6, `stroke="${C.red}" stroke-width="2" stroke-dasharray="4 3"`));
        });
      }
      s += f.H("diff", P(`M228 ${BASE - 26} V60 H328 V40`, C.red, 1.8, 'stroke-dasharray="3 3"') + chip(278, 52, "+AED 360K", { sz: 13, st: C.red, fg: C.red }));
      s += f.H("tot", T(8, 266, "4-yr total", 12.5, C.red, "", "start") + X.map((x) => T(x, 266, "AED ?", 14, C.red)).join(""));
      s += f.H("leg", chip(110, 287, "Known", { sz: 12.5, bg: C.navy, st: C.navy, fg: C.white }) + chip(205, 287, "Estimate needed", { sz: 12.5, st: C.red, fg: C.red, dash: 1 }) + chip(320, 287, "Not available", { sz: 12.5, st: C.slate, fg: C.slate }));
      s += noteSVG(f, "nb", 228, 287) + noteSVG(f, "nt", 228, 286);
      return s;
    },
    render(c, s) {
      const dim = s.dim || [], hl = s.hl == null ? -1 : s.hl;
      X.forEach((x, j) => {
        const d = dim.indexOf(j) >= 0 || (hl >= 0 && hl !== j && s.hlDim !== 0) ? 0.3 : 1;
        c.op("nm" + j, d);
        const db = s.dimBars ? 0.3 : d;
        c.op("b" + j, s.bars ? db : 0); c.mv("b" + j, { sy: s.bars ? 1 : 0.02, pv: [x, BASE] }, { d: 1.2, dl: j * 0.15 });
        c.op("v" + j, s.bars && s.vals !== 0 ? db : 0, { dl: s.bars ? 0.8 : 0 });
        c.op("f" + j, hl === j ? 1 : 0);
        for (let r = 0; r < 4; r++) {
          const row = s.rows && s.rows[r];
          const on = !!row && (!s.cols || s.cols.indexOf(j) >= 0);
          if (row) c.tx(`t${r}${j}`, row[j + 1]);
          c.op(`c${r}${j}`, on ? d : 0, { dl: on ? r * 0.12 + j * 0.05 : 0 });
          c.mv(`c${r}${j}`, on ? {} : { y: 8 });
          const unk = on && s.unk && /\?/.test(row[j + 1]);
          c.op(`u${r}${j}`, unk ? 1 : 0, { dl: 0.5 });
        }
      });
      for (let r = 0; r < 4; r++) { const row = s.rows && s.rows[r]; if (row) c.tx("rT" + r, row[0]); c.op("rl" + r, row ? 1 : 0); }
      c.vis({ diff: s.diff, tot: s.tot, leg: s.leg });
      setNote(c, "nb", s.nb); setNote(c, "nt", s.nt);
    }
  };
}

// =====================================================================
// SHOT FAMILY: DEV — approved design vs. delivered process, red
// difference markers, a deviation record and the business owner's stamp
// Benchmark template: "contract process" (LottieFiles tnM3xY0cM8) —
// proposal, agreement and approval states; plus "The Trouble With Food
// Safety Audits" (NYT) — annotated document callouts.
// =====================================================================
const DEV_A = [["Booking", "made"], ["Rules", "evaluate"], ["Rate set", "overnight"], ["Guest:", "no wait"]];
const DEV_HUMAN = [["Booking", "made"], ["Human", "approval"], ["Approval", "queue"], ["Guest", "waits"]];
const DEV_CHANGE = [["Booking", "made"], ["Lookup at", "booking"], ["71% rate", "ready"], ["29% old", "approval"]];
const DEV_CONFIG = [["Booking", "made"], ["Night", "approval"], ["Ready by", "06:00?"], ["Guest:", "no wait"]];
function F_DEV(p) {
  const f = pfx(p);
  const BX = [14, 110, 206, 302];
  return {
    p, bench: "contract process (LottieFiles) + Food Safety Audits annotations (NYT)",
    draw() {
      let s = "";
      s += f.K("rA", chip(66, 20, "Approved design", { sz: 13, bg: C.green, st: C.green, fg: C.white }));
      s += f.H("rB", chip(72, 110, "Delivered process", { sz: 13, bg: C.navy, st: C.navy, fg: C.white }));
      BX.forEach((x, i) => {
        s += f.K("A" + i, R(x, 34, 86, 48, C.white, 7, `stroke="${C.green}" stroke-width="2"`) + f.TK(`A${i}a`, x + 43, 54, "", 12.5, C.green) + f.TK(`A${i}b`, x + 43, 71, "", 12.5, C.green));
        s += f.H("B" + i, R(x, 124, 86, 48, C.white, 7, `stroke="${C.navy}" stroke-width="2"`) + f.TK(`B${i}a`, x + 43, 144, "", 12.5, C.navy) + f.TK(`B${i}b`, x + 43, 161, "", 12.5, C.navy));
        s += f.H("X" + i, R(x - 2, 122, 90, 52, "none", 8, `stroke="${C.red}" stroke-width="3"`));
        s += f.H("m" + i, O(x + 43, 103, 11, C.red) + T(x + 43, 108, "≠", 15, C.white));
        s += f.H("g" + i, R(x - 3, 31, 92, 54, "none", 9, `stroke="${C.red}" stroke-width="3" stroke-dasharray="5 3"`) + O(x + 80, 36, 9, C.red) + T(x + 80, 41, "!", 13, C.white));
        if (i < 3) s += P(`M${x + 86} 58 h10`, C.green, 2) + f.H("ab" + i, P(`M${x + 86} 148 h10`, C.navy, 2));
      });
      s += f.H("gA", R(8, 28, 384, 60, "none", 12, `stroke="${C.gold}" stroke-width="3" class="a-pulse"`));
      s += f.H("own", person(34, 246, 1.25, C.plum) + T(36, 290, "Owner", 13, C.plum));
      s += f.H("log", R(76, 188, 196, 106, C.white, 8, `stroke="${C.slate}" stroke-width="1.8"`) + R(76, 188, 196, 22, C.slate, 8) + R(76, 200, 196, 10, C.slate) + T(174, 204, "Deviation record", 13, C.white) +
        rep(4, (i) => f.H("l" + i, f.TK("lT" + i, 88, 230 + i * 18, "", 12.5, C.ink, "start"))));
      const stamp = (key, txt, col) => f.H(key, `<g transform="rotate(-10 334 246)">${O(334, 246, 38, "rgba(255,255,255,.9)", `stroke="${col}" stroke-width="3"`)}${O(334, 246, 31, "none", `stroke="${col}" stroke-width="1.2"`)}${T(334, 251, txt, 13, col)}</g>`);
      s += stamp("sOK", "Approved", C.green) + stamp("sNO", "Rejected", C.red) + stamp("sQ", "Decision?", C.orange);
      s += noteSVG(f, "nr", 292, 18) + noteSVG(f, "nt", 300, 110);
      return s;
    },
    render(c, s) {
      const A = s.A || DEV_A, B = s.B || DEV_A, ch = s.ch || [];
      A.forEach((t, i) => { c.tx(`A${i}a`, t[0]); c.tx(`A${i}b`, t[1]); });
      B.forEach((t, i) => { c.tx(`B${i}a`, t[0]); c.tx(`B${i}b`, t[1]); });
      c.op("rA", s.a === 0 ? 0 : 1);
      for (let i = 0; i < 4; i++) {
        c.op("A" + i, s.a === 0 ? 0 : s.hlB ? 0.5 : 1, { dl: i * 0.08 });
        c.op("B" + i, s.b ? 1 : 0, { dl: s.b ? i * 0.12 : 0 });
        c.mv("B" + i, s.b ? {} : { y: -40 }, { d: 0.9, dl: i * 0.1 });
        if (i < 3) c.op("ab" + i, s.b ? 1 : 0);
        const changed = ch.indexOf(i) >= 0;
        c.op("X" + i, s.b && changed ? 1 : 0, { dl: 0.5 });
        c.op("m" + i, s.b && changed && s.mk !== 0 ? 1 : 0, { dl: 0.7 });
        c.mv("m" + i, s.b && changed ? {} : { s: 0.3 });
        c.op("g" + i, (s.gap || []).indexOf(i) >= 0 ? 1 : 0);
      }
      c.op("rB", s.b ? 1 : 0);
      c.vis({ gA: s.gA, own: s.own, log: !!s.log });
      c.op("own", s.own ? (s.own === "dim" ? 0.3 : 1) : 0);
      const L = s.log || [];
      for (let i = 0; i < 4; i++) { if (L[i]) c.tx("lT" + i, L[i]); c.op("l" + i, L[i] ? 1 : 0, { dl: 0.2 + i * 0.18 }); }
      c.op("sOK", s.st === "ok" ? 1 : 0); c.op("sNO", s.st === "no" ? 1 : 0); c.op("sQ", s.st === "q" ? 1 : 0);
      ["sOK", "sNO", "sQ"].forEach((k) => c.mv(k, s.st ? { s: 1 } : { s: 1.7 }, { d: 0.5, e: "back.out(2)" }));
      setNote(c, "nr", s.nr); setNote(c, "nt", s.nt);
    }
  };
}

// =====================================================================
// SHOT FAMILY: CAP — one delivery team, a seven-month calendar, the
// rate-project block and the January regulation (size not quantified)
// Benchmark template: "Project TimeLine" (Motion Array 2424919) —
// advance along time markers.
// =====================================================================
function F_CAP(p) {
  const f = pfx(p);
  const X0 = 86, MW = 43;
  const MON = ["M1", "M2", "M3", "M4", "M5", "M6", "Jan"];
  return {
    p, bench: "Project TimeLine (Motion Array)",
    draw() {
      let s = "";
      s += rep(7, (i) => R(X0 + i * MW, 30, MW - 2, 190, i % 2 ? "#f1f4f8" : "#e9eef4", 3) + T(X0 + i * MW + MW / 2 - 1, 48, MON[i], 12.5, i === 6 ? C.red : C.slate));
      s += T(8, 88, "Rate work", 12.5, C.navy, "", "start") + T(8, 146, "Regulation", 12.5, C.red, "", "start") + T(8, 204, "Team", 12.5, C.slate, "", "start");
      s += f.H("blk", R(X0, 66, 4 * MW, 36, C.amber, 6) + f.TK("bT", X0 + 8, 89, "", 13, C.white, "start"));
      s += f.H("b2", R(X0, 66, 1.4 * MW, 16, C.navy, 4) + T(X0 + 1.4 * MW + 6, 79, "Configure 6 wk", 12.5, C.navy, "", "start") + R(X0, 86, 0.7 * MW, 16, C.orange, 4) + T(X0 + 0.7 * MW + 6, 99, "Change 3 wk", 12.5, C.orange, "", "start"));
      s += f.H("reg", R(X0, 124, 7 * MW - 2, 36, "#fbe9e6", 6, `stroke="${C.red}" stroke-width="2" stroke-dasharray="6 4"`) + T(X0 + 150, 147, "Size not quantified", 13, C.red));
      s += f.H("flag", P(`M${X0 + 7 * MW - 2} 26 V222`, C.red, 2.4) + F(`M${X0 + 7 * MW - 2} 26 l-24 7 l24 7 Z`, C.red));
      s += R(X0, 188, 7 * MW - 2, 26, C.white, 6, `stroke="${C.slate}" stroke-width="1.5"`);
      s += f.H("use", R(X0, 188, 7 * MW - 2, 26, C.plum, 6, 'opacity=".8"'));
      s += f.H("ov", R(X0, 62, 4 * MW, 102, "rgba(176,54,43,.16)", 6, `stroke="${C.red}" stroke-width="2"`) + chip(X0 + 2 * MW, 176, "Same team", { sz: 12.5, bg: C.red, st: C.red, fg: C.white }));
      s += f.K("team", person(26, 270, 0.9, C.navy) + person(50, 270, 0.9, C.navy) + person(74, 270, 0.9, C.navy));
      s += noteSVG(f, "nb", 240, 262) + noteSVG(f, "nt", 240, 288);
      return s;
    },
    render(c, s) {
      const W = { ext: 4, cfg: 1.4, chg: 0.7 }[s.route] || 0;
      const T0 = { ext: "Extension: 4 months", cfg: "Configure", chg: "Change" }[s.route] || "";
      c.tx("bT", T0);
      c.op("blk", W ? 1 : 0);
      c.mv("blk", { sx: W ? W / 4 : 0.02, pv: [X0, 84] }, { d: 1.2 });
      c.vis({ b2: s.all, reg: s.reg, flag: s.flag, ov: s.ov });
      c.mv("reg", s.reg ? {} : { y: 20 });
      c.op("use", s.use ? 1 : 0); c.mv("use", { sx: s.use || 0.01, pv: [X0, 201] }, { d: 1.3 });
      c.mv("team", s.ov ? { x: 4 } : {});
      setNote(c, "nb", s.nb); setNote(c, "nt", s.nt);
    }
  };
}

// =====================================================================
// SHOT FAMILY: HAND — reception hands a booking case to the revenue
// office; the decision travels back to the employee serving the guest
// Benchmark template: "Workflow Animation" (Dribbble 3791748) — reveal
// action, transfer trigger, show notification; plus inspiration-board
// #10 "The Physical Handoff".
// =====================================================================
function F_HAND(p) {
  const f = pfx(p);
  const CP = { rec: [76, 86], mid: [200, 72], rev: [324, 86] };
  const DP = { rev: [324, 146], rec: [76, 146] };
  return {
    p, bench: "Workflow Animation (Dribbble 3791748) + Physical Handoff (inspiration board #10)",
    draw() {
      let s = "";
      s += R(14, 200, 124, 10, "#8a6a3a", 3) + T(76, 230, "Reception", 13, C.navy);
      s += R(262, 200, 124, 10, "#8a6a3a", 3) + T(324, 230, "Revenue office", 13, C.green);
      s += K(p + "rcp", person(52, 192, 1.1, C.navy));
      s += K(p + "rvp", person(324, 192, 1.1, C.green));
      s += f.H("gst", `<g class="a-bob">${buddy(112, 180, 11, C.navy2)}</g>`);
      s += f.H("gw", clockI(112, 152, 10, C.red));
      s += f.H("gok", O(112, 154, 10, C.green) + tick(112, 154, 0.55, C.white, 2));
      s += f.H("bdg", star(350, 168, 0.9));
      s += f.H("acc", O(358, 112, 11, C.green) + tick(358, 112, 0.6, C.white, 2.2));
      s += f.H("proc", R(16, 132, 24, 32, C.white, 3, `stroke="${C.navy}" stroke-width="1.8"`) + R(22, 128, 12, 6, C.navy, 2) + P("M21 144 h14 M21 151 h14 M21 158 h10", C.muted, 1.6));
      s += f.H("pp", P("M120 104 Q200 82 280 104", C.red, 2.2, 'stroke-dasharray="5 4"') + F("M276 98 L284 106 L274 108 Z", C.red) + P("M280 122 Q200 144 120 122", C.red, 2.2, 'stroke-dasharray="5 4"') + F("M124 116 L116 124 L126 128 Z", C.red) + clockI(200, 113, 12, C.red));
      s += f.H("imp", [[150, 40], [230, 30], [310, 40]].map(([x, y]) => P(`M70 170 Q${x / 2 + 40} ${y + 30} ${x} ${y + 24}`, C.orange, 1.8, 'stroke-dasharray="4 4"') + person(x, y + 22, 0.85, C.slate) + T(x, y - 4, "?", 14, C.orange)).join(""));
      s += f.H("impX", cross(230, 46, 2.6, C.red, 5));
      s += f.H("sup", P("M70 214 Q90 256 168 262", C.green, 2.2, 'stroke-dasharray="5 4"') + O(196, 262, 15, C.green) + P("M188 258 a8 8 0 0 1 16 0", C.white, 2.2) + R(185, 258, 4, 7, C.white, 1) + R(203, 258, 4, 7, C.white, 1) + chip(272, 262, "Support route", { sz: 13, st: C.green, fg: C.green }));
      s += f.H("cd", R(-52, -22, 104, 44, C.white, 6, `stroke="${C.navy}" stroke-width="2"`) + R(-52, -22, 104, 9, C.navy, 6) + R(-52, -17, 104, 4, C.navy) + T(-2, 4, "Agreement ID", 12.5, C.navy) + T(-2, 19, "Case owner", 12.5, C.navy) + tick(44, 0, 0.4, C.green, 2) + tick(44, 15, 0.4, C.green, 2));
      s += f.H("cdX", R(-52, -22, 104, 44, "#fff4f1", 6, `stroke="${C.red}" stroke-width="2"`) + R(-52, -22, 104, 9, C.red, 6) + R(-52, -17, 104, 4, C.red) + T(0, 4, "Agreement: ?", 12.5, C.red) + T(0, 19, "Owner: ?", 12.5, C.red));
      s += f.H("dec", R(-54, -14, 108, 28, C.green, 14) + T(0, 5, "Rate confirmed", 12.5, C.white));
      s += noteSVG(f, "scr", 112, 124) + noteSVG(f, "nt", 200, 24) + noteSVG(f, "nb", 200, 278);
      return s;
    },
    render(c, s) {
      const cp = s.cd && CP[s.cd];
      const miss = !!s.miss;
      c.op("cd", cp && !miss ? 1 : 0); c.op("cdX", cp && miss ? 1 : 0);
      if (cp) { c.mv("cd", { x: cp[0], y: cp[1] }, { d: 1.2, e: "power2.inOut" }); c.mv("cdX", { x: cp[0], y: cp[1] }, { d: 1.2, e: "power2.inOut" }); }
      const dp = s.dec && DP[s.dec];
      c.op("dec", dp ? 1 : 0);
      if (dp) c.mv("dec", { x: dp[0], y: dp[1] }, { d: 1.2, dl: 0.2, e: "power2.inOut" });
      c.op("gst", s.g ? 1 : 0); c.op("gw", s.g === "wait" ? 1 : 0); c.op("gok", s.g === "ok" ? 1 : 0);
      c.vis({ bdg: s.bdg, acc: s.acc, proc: s.proc, pp: s.pp, imp: s.imp, impX: s.impX, sup: s.sup });
      c.mv("acc", s.acc ? {} : { s: 0.3 });
      c.op("rvp", s.rev === 0 ? 0.3 : 1);
      setNote(c, "scr", s.scr); setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: TEST — feed realistic cases into the operating process,
// compare expected vs observed, log and close defects
// Benchmark template: "Process - Success" (LottieFiles EhFVqZgUPP) —
// activity transforms into a check; plus "Dashboard" (LottieFiles
// M05MmlnoOP) — fill graph, highlight metric.
// =====================================================================
function F_TEST(p) {
  const f = pfx(p);
  const CY = [30, 82, 134, 186];
  return {
    p, bench: "Process - Success (LottieFiles) + Dashboard (LottieFiles)",
    draw() {
      let s = T(66, 20, "Test cases", 13, C.slate);
      CY.forEach((y, i) => {
        s += f.H("k" + i, R(10, y, 112, 42, C.white, 7, `stroke="${i ? C.orange : C.navy2}" stroke-width="2"`) + f.TK("kT" + i, 66, y + 26, "", 13, i ? C.orange : C.navy2));
        s += f.H("kok" + i, O(118, y + 4, 9, C.green) + tick(118, y + 4, 0.5, C.white, 2));
        s += f.H("kq" + i, O(118, y + 4, 9, C.slate) + T(118, y + 9, "?", 13, C.white));
        s += f.H("kx" + i, O(118, y + 4, 9, C.red) + cross(118, y + 4, 0.45, C.white, 2));
      });
      s += f.H("sp", rep(4, (i) => { const [x, y] = [[14, 26], [118, 26], [14, 76], [118, 76]][i]; return P(`M${x - 5} ${y} H${x + 5} M${x} ${y - 5} V${y + 5}`, C.gold, 2.4); }));
      s += f.H("fr", R(4, 24, 124, 54, "none", 10, `stroke="${C.gold}" stroke-width="2.4" stroke-dasharray="6 4"`));
      s += K(p + "proc", R(144, 40, 118, 166, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + T(203, 60, "Operating process", 12.5, C.navy));
      s += f.K("steps", rep(3, (i) => R(154, 74 + i * 42, 98, 32, "#eef3f8", 6) + f.TK("sT" + i, 203, 95 + i * 42, "", 12.5, C.navy)));
      s += f.H("mh", R(150, 112, 106, 40, "none", 8, `stroke="${C.gold}" stroke-width="3" class="a-pulse"`));
      s += f.H("intf", R(150, 70, 106, 130, C.white, 8) + R(156, 84, 44, 40, C.navy, 6) + T(178, 140, "Booking", 12.5, C.navy) + R(206, 84, 44, 40, C.green, 6) + T(228, 140, "Rates", 12.5, C.green) + P("M200 104 H206", C.slate, 2) + T(203, 188, "Interface", 12.5, C.slate));
      s += f.H("scrOK", O(178, 104, 9, C.white) + tick(178, 104, 0.5, C.green, 2));
      s += f.H("pk", R(-10, -7, 20, 14, C.gold, 3));
      s += f.H("pX", O(203, 162, 10, C.red) + T(203, 167, "?", 13, C.white));
      s += f.H("tk", R(-18, -12, 36, 24, C.navy2, 5) + P("M-11 -3 H11 M-11 4 H6", C.white, 1.8));
      s += rep(6, (i) => f.H("pkk" + i, R(-14, -9, 28, 18, C.orange, 4)));
      s += f.H("rE", R(276, 44, 116, 30, C.white, 8, `stroke="${C.slate}" stroke-width="1.5"`) + T(284, 64, "Expected", 12.5, C.slate, "", "start") + O(376, 59, 8, C.green) + tick(376, 59, 0.45, C.white, 2));
      s += f.H("rO", R(276, 80, 116, 30, C.white, 8, `stroke="${C.slate}" stroke-width="1.5"`) + T(284, 100, "Observed", 12.5, C.slate, "", "start"));
      s += f.H("oOK", O(376, 95, 8, C.green) + tick(376, 95, 0.45, C.white, 2));
      s += f.H("oX", O(376, 95, 8, C.red) + cross(376, 95, 0.4, C.white, 2));
      s += f.H("def", R(276, 122, 116, 100, C.white, 8, `stroke="${C.red}" stroke-width="2"`) + R(276, 122, 116, 22, C.red, 8) + R(276, 134, 116, 10, C.red) + T(334, 138, "Defect logged", 12.5, C.white) +
        T(284, 164, "Situation", 12.5, C.ink, "", "start") + T(284, 186, "Expected", 12.5, C.green, "", "start") + T(284, 208, "Observed", 12.5, C.red, "", "start"));
      s += f.H("dc", `<g transform="rotate(-8 334 238)">${R(292, 222, 84, 30, "rgba(255,255,255,.92)", 6, `stroke="${C.green}" stroke-width="3"`)}${T(334, 243, "Fixed", 14, C.green)}</g>`);
      s += f.H("pf", person(180, 252, 1.05, C.navy) + person(228, 252, 1.05, C.green) + T(204, 290, "Staff testers", 13, C.navy));
      s += noteSVG(f, "nb", 200, 282) + noteSVG(f, "nr", 300, 248);
      return s;
    },
    render(c, s) {
      const txt = s.k || ["Vendor demo", "Past failure", "29% booking", "Peak volume"];
      const vis = s.kv || [1, 0, 0, 0], bd = s.bd || [];
      for (let i = 0; i < 4; i++) {
        c.tx("kT" + i, txt[i] || "");
        c.op("k" + i, vis[i] ? (s.feed != null && s.feed !== i ? 0.55 : 1) : 0, { dl: i * 0.1 });
        c.mv("k" + i, vis[i] ? (s.feed === i ? { x: 6 } : {}) : { x: -20 });
        c.op("kok" + i, vis[i] && bd[i] === "ok" ? 1 : 0); c.op("kq" + i, vis[i] && bd[i] === "q" ? 1 : 0); c.op("kx" + i, vis[i] && bd[i] === "x" ? 1 : 0);
      }
      const st = s.steps || ["Check agreement", "Approve rate", "Confirm rate"];
      for (let i = 0; i < 3; i++) c.tx("sT" + i, st[i]);
      c.op("steps", s.intf ? 0 : 1);
      c.vis({ sp: s.sp, fr: s.fr, mh: s.mh, intf: s.intf, scrOK: s.intf && s.scr, pf: s.pf, def: s.def, dc: s.dc });
      c.mv("def", s.defZ ? { s: 1.06 } : {});
      c.op("pk", s.intf ? 1 : 0);
      c.mv("pk", s.intf === "ok" ? { x: 228, y: 104 } : s.intf === "lost" || s.intf === "miss" ? { x: 203, y: 150 } : { x: 178, y: 104 }, { d: 1.2 });
      c.op("pX", s.intf === "miss" || s.intf === "lost" ? 1 : 0);
      const fed = s.feed != null;
      c.op("tk", fed ? 1 : 0);
      if (fed) c.mv("tk", s.res ? { x: 266, y: 182 } : { x: 203, y: 26 }, { d: 1.2, e: "power2.inOut" });
      for (let i = 0; i < 6; i++) { c.op("pkk" + i, s.peak ? 1 : 0, { dl: i * 0.08 }); c.mv("pkk" + i, s.peak ? { x: 168 + (i % 3) * 34, y: 88 + Math.floor(i / 3) * 28 } : { x: 66, y: 207 }, { d: 1, dl: i * 0.08 }); }
      c.vis({ rE: !!s.res, rO: !!s.res, oOK: s.res === "pass", oX: s.res === "fail" });
      setNote(c, "nb", s.nb); setNote(c, "nr", s.nr);
    }
  };
}

// =====================================================================
// SHOT FAMILY: EXC — the normal path, the exception branch, an owner
// who investigates the cause, return to normal or removal of needless work
// Benchmark template: "Celonis Process Explorer animation"
// (help.celonis.com) — variants branching off the happy path; plus "Git
// Workflow 1" branch-and-merge.
// =====================================================================
function F_EXC(p) {
  const f = pfx(p);
  const TP = { start: [46, 60], check: [180, 60], res: [334, 60], miss: [180, 124], owner: [150, 190], inv: [306, 190] };
  return {
    p, bench: "Celonis Process Explorer (Celonis) + Git Workflow branching (LottieFiles)",
    draw() {
      let s = "";
      s += K(p + "main", chip(46, 60, "Booking", { sz: 13, st: C.navy2, fg: C.navy2 }) + chip(180, 60, "Check agreement", { sz: 13 }) + P("M84 60 H116", C.navy, 2.4) + F("M112 55 L120 60 L112 65 Z", C.navy));
      s += f.D("aR", "M245 60 H280", C.green, 2.6);
      s += f.K("res", chip(334, 60, "Rate resolved", { sz: 13, bg: C.green, st: C.green, fg: C.white }));
      s += f.H("gr", `<g class="a-spin">${gear(116, 30, 12, C.gold, "#f3f6f9")}</g>` + T(140, 34, "Automated", 12.5, C.amber, "", "start"));
      s += f.D("aB", "M180 74 V110", C.red, 2.6);
      s += f.H("miss", chip(180, 124, "Missing information", { sz: 13, bg: "#fff4f1", st: C.red, fg: C.red }));
      s += f.D("aW", "M180 138 V160", C.navy, 2.4);
      s += f.H("own", person(180, 194, 1.2, C.navy) + T(180, 228, "Exception owner", 13, C.navy));
      s += f.H("bd", star(198, 166, 0.85));
      s += f.D("aI", "M200 190 H256", C.navy, 2.4);
      s += f.H("inv", chip(310, 190, "Investigate cause", { sz: 13, st: C.plum, fg: C.plum }) + O(370, 172, 9, "rgba(255,255,255,.3)", `stroke="${C.ink}" stroke-width="2"`) + P("M376 178 L383 185", C.ink, 3));
      s += f.D("aT", "M366 178 C392 150 392 100 360 76", C.green, 2.6);
      s += f.H("rm", chip(310, 124, "Needless approval", { sz: 13, bg: "#fbefe8", st: C.orange, fg: C.orange }));
      s += f.H("cut", P("M246 112 L376 136", C.red, 3) + O(240, 110, 6, "none", `stroke="${C.red}" stroke-width="2"`) + O(240, 124, 6, "none", `stroke="${C.red}" stroke-width="2"`));
      s += f.H("jd", chip(310, 124, "Needs judgement", { sz: 13, st: C.navy, fg: C.navy }));
      s += f.H("sw", O(84, 190, 16, C.white, `stroke="${C.orange}" stroke-width="3"`) + P("M84 178 V190 L93 195", C.orange, 2.4) + R(80, 170, 8, 5, C.orange, 1));
      s += rep(3, (i) => f.H("sq" + i, bookTok(C.orange)));
      s += f.H("pc", R(70, 172, 28, 36, C.white, 3, `stroke="${C.navy}" stroke-width="1.8"`) + R(77, 168, 14, 7, C.navy, 2) + P("M75 185 h18 M75 193 h18 M75 201 h12", C.muted, 1.6) + T(84, 228, "Procedure", 12.5, C.navy));
      s += f.H("wk", P("M150 132 Q40 150 40 230 Q40 262 120 262", C.red, 2.4, 'stroke-dasharray="5 5" class="a-flow"') + chip(178, 262, "Informal workaround", { sz: 12.5, st: C.red, fg: C.red }));
      s += f.H("tk", bookTok());
      s += rep(3, (i) => f.H("stk" + i, bookTok(C.orange)));
      s += noteSVG(f, "nb", 200, 276) + noteSVG(f, "nt", 300, 24);
      return s;
    },
    render(c, s) {
      const br = !!s.br;
      c.dr("aB", br ? 1 : 0); c.op("miss", br ? 1 : 0);
      c.dr("aW", br && s.own ? 1 : 0, { dl: 0.3 }); c.op("own", br && s.own ? 1 : 0, { dl: 0.4 });
      c.op("bd", s.bd ? 1 : 0);
      c.dr("aI", s.inv ? 1 : 0, { dl: 0.3 }); c.op("inv", s.inv ? 1 : 0, { dl: 0.5 });
      c.dr("aT", s.out === "ret" || s.out === "both" ? 1 : 0, { dl: 0.6 });
      c.op("rm", s.out === "rem" || s.rm ? 1 : 0); c.op("cut", s.out === "rem" ? 1 : 0, { dl: 0.6 });
      c.mv("rm", s.out === "rem" ? { y: 8, r: -4 } : {});
      c.op("jd", s.out === "both" ? 1 : 0);
      if (s.out === "both") { c.op("rm", 1); c.mv("rm", { y: -34 }); }
      c.dr("aR", s.normal === 0 ? 0 : 1); c.op("res", s.normal === 0 ? 0.3 : 1);
      c.vis({ gr: s.gr, sw: s.sw, pc: s.pc, wk: s.wk });
      for (let i = 0; i < 3; i++) { c.op("sq" + i, s.sq ? 1 : 0); c.mv("sq" + i, s.sq ? { x: 112, y: 162 + i * 24 } : { x: 180, y: 124 }, { d: 0.9, dl: i * 0.1 }); }
      for (let i = 0; i < 3; i++) { c.op("stk" + i, s.stk ? 1 : 0); c.mv("stk" + i, s.stk ? { x: 236 + i * 36, y: 124 } : { x: 180, y: 60 }, { d: 1, dl: i * 0.12 }); }
      const tp = s.tok && TP[s.tok];
      c.op("tk", tp ? 1 : 0);
      if (tp) c.mv("tk", { x: tp[0], y: tp[1] - 22 }, { d: 1.1, e: "power2.inOut" });
      setNote(c, "nb", s.nb); setNote(c, "nt", s.nt);
    }
  };
}

// =====================================================================
// SHOT FAMILY: ROUTES — buy, configure, extend, build as four product
// cards whose illustrations change state (Flip-style)
// Benchmark template: "Product Workflow Animation & UI Motion Design"
// (Dribbble 27577799) — shift between product states.
// =====================================================================
function F_ROUTES(p) {
  const f = pfx(p);
  const X = [52, 152, 252, 352], COL = [C.navy, C.green, C.amber, C.orange];
  const TT = [["Buy", "As supplied"], ["Configure", "Settings"], ["Extend", "Add-on"], ["Build", "Own code"]];
  const box = (x) => R(x - 28, 92, 56, 50, "#e7eef6", 5, `stroke="${C.navy}" stroke-width="2"`) + P(`M${x - 28} 104 H${x + 28}`, C.navy, 2) + R(x - 6, 92, 12, 12, C.navy, 1);
  return {
    p, bench: "Product Workflow Animation & UI Motion Design (Dribbble 27577799)",
    draw() {
      let s = "";
      X.forEach((x, j) => {
        s += f.K("cd" + j, R(x - 47, 14, 94, 180, C.white, 10, `stroke="${COL[j]}" stroke-width="2"`) + T(x, 38, TT[j][0], 14, COL[j]) + T(x, 56, TT[j][1], 12.5, C.slate));
        s += f.H("fz" + j, R(x - 51, 10, 102, 188, "none", 13, `stroke="${COL[j]}" stroke-width="4"`));
      });
      s += f.K("il0", box(52) + O(52, 152, 9, C.gold) + tick(52, 152, 0.45, C.white, 2));
      s += f.K("il1", box(152) + rep(3, (i) => R(130, 150 + i * 13, 44, 8, "#cfe3d7", 4)) + rep(3, (i) => `<g data-k="${p}t${i}">${O(134, 154 + i * 13, 5, C.green)}</g>`));
      s += f.K("il2", box(252) + P("M280 117 h6", C.amber, 3));
      s += f.H("plug", R(286, 100, 26, 34, C.gold, 5) + gear(299, 117, 9, C.amber, C.gold));
      s += f.K("il3", P("M322 178 H382", C.slate, 2) + person(338, 172, 0.8, C.navy));
      s += rep(4, (i) => f.H("bk" + i, R(346 + (i % 2) * 18, 160 - Math.floor(i / 2) * 18 - 16, 16, 16, C.orange, 2)));
      s += rep(4, (j) => f.H("mb" + j, R(X[j] - 36, 168, 72, 7, "#e3e8ee", 3) + `<g data-k="${p}mc${j}">${R(X[j] - 36, 168, 72, 7, C.navy, 3)}</g>` + R(X[j] - 36, 180, 72, 7, "#e3e8ee", 3) + `<g data-k="${p}mu${j}">${R(X[j] - 36, 180, 72, 7, C.orange, 3)}</g>`));
      s += f.H("leg", chip(150, 214, "Control", { sz: 12.5, bg: C.navy, st: C.navy, fg: C.white }) + chip(250, 214, "Upkeep", { sz: 12.5, bg: C.orange, st: C.orange, fg: C.white }));
      s += rep(4, (j) => f.H("rq" + j, f.TK("rqT" + j, X[j], 262, "", 12.5, C.navy) + P(`M${X[j]} 246 V202`, C.navy, 1.8) + F(`M${X[j] - 5} 207 L${X[j]} 199 L${X[j] + 5} 207 Z`, C.navy)));
      s += f.H("wrong", [0, 1, 2].map((j) => P(`M${X[j]} 246 Q${(X[j] + 352) / 2} 220 346 200`, C.red, 1.8, 'stroke-dasharray="4 3"')).join("") + cross(300, 222, 1.3, C.red, 3.5));
      s += f.H("fit", T(26, 228, "Needs", 12.5, C.navy, "", "start") + T(78, 228, "Has", 12.5, C.green, "", "start") + rep(3, (i) => O(34, 242 + i * 16, 4, C.navy) + P(`M40 ${242 + i * 16} H74`, C.green, 1.8) + O(80, 242 + i * 16, 4, C.green)));
      s += f.H("mt", rep(3, (i) => `<g transform="translate(${318 + i * 24} 246) rotate(45)">${R(-2.5, 0, 5, 18, C.orange, 2)}${O(0, -2, 6, "none", `stroke="${C.orange}" stroke-width="3.5"`)}</g>`));
      s += f.H("lk", R(144, 74, 16, 12, C.green, 2) + P("M147 74 v-4 a5 5 0 0 1 10 0 v4", C.green, 2));
      s += noteSVG(f, "nb", 200, 282) + noteSVG(f, "nm", 200, 236);
      return s;
    },
    render(c, s) {
      const fo = s.f == null ? -1 : s.f;
      X.forEach((x, j) => {
        const on = fo < 0 || fo === j || (s.on && s.on.indexOf(j) >= 0);
        ["cd", "il"].forEach((k) => c.op(k + j, on ? 1 : 0.28));
        c.op("fz" + j, fo === j || (s.on && s.on.indexOf(j) >= 0 && s.ring) ? 1 : 0);
        c.mv("cd" + j, fo === j ? { y: -3 } : {});
        const mb = !!s.mb;
        c.op("mb" + j, mb ? (on ? 1 : 0.3) : 0);
        const cv = [0.25, 0.45, 0.75, 1][j], uv = [0.15, 0.3, 0.75, 1][j];
        c.mv("mc" + j, { sx: mb ? cv : 0.02, pv: [x - 36, 171] }, { d: 1, dl: j * 0.1 });
        c.mv("mu" + j, { sx: mb ? uv : 0.02, pv: [x - 36, 183] }, { d: 1, dl: j * 0.1 + 0.1 });
        const rq = s.rq && s.rq[j];
        if (rq) c.tx("rqT" + j, rq);
        c.op("rq" + j, rq ? 1 : 0, { dl: j * 0.15 });
      });
      c.op("leg", s.mb ? 1 : 0);
      for (let i = 0; i < 3; i++) c.mv("t" + i, { x: s.tg ? [30, 0, 30][i] : [0, 30, 0][i] }, { d: 0.7, dl: i * 0.12 });
      c.op("plug", s.plug ? 1 : 0); c.mv("plug", s.plug ? {} : { x: 30 }, { d: 0.9, e: "back.out(1.6)" });
      for (let i = 0; i < 4; i++) { const on = i < (s.bk || 0); c.op("bk" + i, on ? 1 : 0, { dl: i * 0.15 }); c.mv("bk" + i, on ? {} : { y: -30 }, { d: 0.6, dl: i * 0.15, e: "bounce.out" }); }
      c.vis({ wrong: s.wrong, fit: s.fit, mt: s.mt, lk: s.lk });
      setNote(c, "nb", s.nb); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: TIERS — core, supporting and management processes and the
// development route each one tends to deserve
// Benchmark template: "Animated treemap" (Observable @d3/animated-treemap)
// — areas keep identity while emphasis changes.
// =====================================================================
function F_TIERS(p) {
  const f = pfx(p);
  const TL = [["core", 14, 14, 190, 178, C.amber, "Core", "Creates customer value"], ["sup", 214, 14, 176, 84, C.slate, "Supporting", "Enables the core"], ["man", 214, 108, 176, 84, C.plum, "Management", "Steers and controls"]];
  return {
    p, bench: "Animated treemap (Observable)",
    draw() {
      let s = "";
      TL.forEach(([k, x, y, w, h, col, t1, t2]) => {
        s += f.K(k, R(x, y, w, h, col === C.amber ? "#f7ecd6" : col === C.slate ? "#e6ebf0" : "#ece6f3", 10, `stroke="${col}" stroke-width="2"`) + T(x + w / 2, y + h / 2 - 4, t1, 15, col) + T(x + w / 2, y + h / 2 + 16, t2, 12.5, C.ink));
        s += f.H(k + "H", R(x - 3, y - 3, w + 6, h + 6, "none", 12, `stroke="${col}" stroke-width="4"`));
      });
      s += f.H("star", star(109, 46, 1.3) + `<g class="a-bob">${buddy(150, 46, 10, C.navy2)}</g>`);
      s += f.H("rg", R(14, 202, 376, 32, "#e1f0e8", 8, `stroke="${C.green}" stroke-width="2"`) + T(202, 223, "Stable regulatory requirement", 13, C.green));
      s += noteSVG(f, "o0", 109, 262) + noteSVG(f, "o1", 302, 252) + noteSVG(f, "o2", 302, 284) + noteSVG(f, "o3", 202, 270);
      return s;
    },
    render(c, s) {
      const hl = s.hl || [];
      TL.forEach(([k]) => { const on = hl.length === 0 || hl.indexOf(k) >= 0; c.op(k, on ? 1 : 0.3); c.op(k + "H", hl.indexOf(k) >= 0 ? 1 : 0); c.mv(k, hl.indexOf(k) >= 0 ? { s: 1.02 } : {}); });
      c.vis({ star: s.star, rg: s.rg });
      c.mv("rg", s.rg ? {} : { y: 20 });
      const o = s.o || [];
      ["o0", "o1", "o2", "o3"].forEach((k, i) => setNote(c, k, o[i]));
    }
  };
}

// =====================================================================
// SHOT FAMILY: PHASE — the ten-phase BPM framework, Develop is phase 7
// Benchmark template: "Corporate Timeline by HenlyFx" (Motion Array
// 1939632) — reveal events one by one.
// =====================================================================
function F_PHASE(p) {
  const f = pfx(p);
  const NM = { 5: "Innovate", 6: "People", 7: "Develop", 8: "Implement" };
  const pos = (i) => [14 + ((i - 1) % 5) * 76, i <= 5 ? 34 : 118];
  return {
    p, bench: "Corporate Timeline (Motion Array)",
    draw() {
      let s = "";
      for (let i = 1; i <= 10; i++) {
        const [x, y] = pos(i);
        s += K(p + "c" + i, F(`M${x} ${y} H${x + 62} L${x + 72} ${y + 28} L${x + 62} ${y + 56} H${x} L${x + 10} ${y + 28} Z`, "#e3e9f0", `stroke="${C.slate}" stroke-width="1.5"`) + T(x + 36, y + (NM[i] ? 24 : 34), String(i), 16, C.slate) + (NM[i] ? T(x + 36, y + 44, NM[i], 12, C.ink) : ""));
        s += f.H("h" + i, F(`M${x} ${y} H${x + 62} L${x + 72} ${y + 28} L${x + 62} ${y + 56} H${x} L${x + 10} ${y + 28} Z`, i === 7 ? C.orange : C.navy2) + T(x + 36, y + (NM[i] ? 24 : 34), String(i), 16, C.white) + (NM[i] ? T(x + 36, y + 44, NM[i], 12, C.white) : ""));
        s += f.H("d" + i, O(x + 60, y + 6, 8, C.green) + tick(x + 60, y + 6, 0.45, C.white, 2));
      }
      s += f.H("sub", chip(350, 104, "How it operates", { sz: 12, st: C.navy2, fg: C.navy2 }) + chip(50, 188, "Who does what", { sz: 12, st: C.navy2, fg: C.navy2 }));
      s += f.H("arr", P("M350 92 Q300 112 172 128", C.orange, 2.2, 'class="a-flow"') + P("M84 146 H90", C.orange, 3) + F("M168 122 L178 128 L168 134 Z", C.orange));
      s += f.H("ny", chip(202, 188, "Not yet", { sz: 12.5, st: C.slate, fg: C.slate, dash: 1 }));
      s += f.H("fnd", rep(3, (i) => R(14, 204 + i * 30, 372, 24, ["#e6eef6", "#efe9f5", "#f6efe2"][i], 6) + T(200, 221 + i * 30, ["Project management", "People change management", "Leadership"][i], 13, [C.navy, C.plum, C.amber][i])));
      s += noteSVG(f, "nb", 200, 222);
      return s;
    },
    render(c, s) {
      const hl = s.hl || [];
      for (let i = 1; i <= 10; i++) {
        c.op("h" + i, hl.indexOf(i) >= 0 ? 1 : 0, { dl: hl.indexOf(i) * 0.2 });
        c.mv("h" + i, hl.indexOf(i) >= 0 ? { s: 1.04 } : {});
        c.op("d" + i, i <= (s.done || 0) ? 1 : 0, { dl: i * 0.06 });
      }
      c.vis({ sub: s.sub, arr: s.arr, ny: s.ny, fnd: s.fnd });
      setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: DASH — exception evidence and monitoring after go-live
// Benchmark template: "Animated line chart lesson" (Observable
// @d3/learn-d3-animation) + "Infographics Dashboard" (LottieFiles).
// =====================================================================
function F_DASH(p) {
  const f = pfx(p);
  return {
    p, bench: "Animated line chart (Observable) + Infographics Dashboard (LottieFiles)",
    draw() {
      let s = R(12, 12, 376, 276, C.white, 12, `stroke="${C.navy}" stroke-width="2"`) + R(12, 12, 376, 30, C.navy, 12) + R(12, 30, 376, 12, C.navy);
      s += f.TK("hd", 200, 33, "", 14, C.white);
      s += T(24, 66, "Exception volume", 13, C.navy, "", "start") + P("M28 160 H190 M28 160 V80", C.slate, 1.5);
      s += f.D("ln", "M32 140 L58 128 L84 134 L110 116 L136 122 L162 104 L186 110", C.orange, 3);
      s += T(210, 66, "Causes logged", 13, C.navy, "", "start");
      s += rep(3, (i) => T(210, 92 + i * 30, ["Agreement missing", "Booked within 24h", "Other causes"][i], 12, C.ink, "", "start") + R(210, 97 + i * 30, 160, 8, "#eef1f5", 4) + `<g data-k="${p}b${i}">${R(210, 97 + i * 30, 160, 8, [C.orange, C.red, C.slate][i], 4)}</g>`);
      s += T(24, 196, "Handling time", 13, C.navy, "", "start");
      s += P("M40 262 A50 50 0 0 1 140 262", "#e3e8ee", 12) + f.D("ga", "M40 262 A50 50 0 0 1 140 262", C.orange, 12);
      s += K(p + "nd", P("M90 262 L90 222", C.ink, 3)) + O(90, 262, 5, C.ink);
      s += f.H("al", R(196, 220, 182, 52, "#fff4f1", 10, `stroke="${C.red}" stroke-width="2" class="a-pulse"`) + T(287, 242, "Repeated workaround", 13, C.red) + T(287, 261, "Investigate why", 12.5, C.ink));
      return s;
    },
    render(c, s) {
      c.tx("hd", s.hd || "After go-live");
      c.dr("ln", s.ln ? 1 : 0, { d: 1.6 });
      const bv = [0.7, 0.55, 0.25];
      for (let i = 0; i < 3; i++) c.mv("b" + i, { sx: s.bars ? bv[i] : 0.02, pv: [210, 101 + i * 30] }, { d: 1, dl: i * 0.15 });
      c.dr("ga", s.g ? 0.72 : 0, { d: 1.2 });
      c.mv("nd", { r: s.g ? 40 : -80, pv: [90, 262] }, { d: 1.2 });
      c.op("al", s.al ? 1 : 0);
    }
  };
}

// =====================================================================
// SHOT FAMILY: CHECK — a card whose items are confirmed one by one
// Benchmark template: "Infographics Pack by ARstudio" (Motion Array
// 135055) — reveal list primitives and callouts.
// =====================================================================
function F_CHECK(p) {
  const f = pfx(p);
  return {
    p, bench: "Infographics Pack by ARstudio (Motion Array)",
    draw() {
      let s = R(40, 16, 320, 226, C.white, 12, `stroke="${C.navy}" stroke-width="2"`) + R(40, 16, 320, 34, C.navy, 12) + R(40, 36, 320, 14, C.navy);
      s += f.TK("tt", 200, 39, "", 15, C.white);
      for (let i = 0; i < 5; i++) {
        const y = 76 + i * 36;
        s += f.H("r" + i, O(72, y, 11, "#eef1f5", `stroke="${C.slate}" stroke-width="1.5"`) + f.TK("iT" + i, 94, y + 5, "", 14, C.ink, "start"));
        s += f.H("ok" + i, O(72, y, 11, C.green) + tick(72, y, 0.6, C.white, 2.2));
        s += f.H("q" + i, O(72, y, 11, C.orange) + T(72, y + 5, "?", 14, C.white));
        s += f.H("x" + i, O(72, y, 11, C.red) + cross(72, y, 0.5, C.white, 2.2));
        s += f.H("hl" + i, R(52, y - 16, 296, 32, "none", 8, `stroke="${C.gold}" stroke-width="3"`));
      }
      s += f.H("st", `<g transform="rotate(-10 312 214)">${R(262, 198, 100, 32, "rgba(255,255,255,.95)", 6, `stroke="${C.plum}" stroke-width="3"`)}${f.TK("stT", 312, 219, "", 13, C.plum)}</g>`);
      s += f.H("pres", person(26, 282, 1.05, C.plum) + person(374, 282, 1.05, C.navy) + person(352, 282, 0.9, C.navy2));
      s += noteSVG(f, "nb", 200, 270);
      return s;
    },
    render(c, s) {
      c.tx("tt", s.t || "");
      const it = s.items || [], mk = s.mk || [];
      for (let i = 0; i < 5; i++) {
        const on = i < it.length;
        if (on) c.tx("iT" + i, it[i]);
        c.op("r" + i, on ? (s.dimTo != null && i > s.dimTo ? 0.3 : 1) : 0, { dl: i * 0.12 });
        c.mv("r" + i, on ? {} : { x: -16 });
        c.op("ok" + i, on && mk[i] === "ok" ? 1 : 0, { dl: 0.3 + i * 0.15 });
        c.op("q" + i, on && mk[i] === "q" ? 1 : 0, { dl: 0.3 + i * 0.15 });
        c.op("x" + i, on && mk[i] === "x" ? 1 : 0, { dl: 0.3 + i * 0.15 });
        c.op("hl" + i, s.hl === i ? 1 : 0);
      }
      c.tx("stT", s.st || ""); c.op("st", s.st ? 1 : 0); c.mv("st", s.st ? {} : { s: 1.6 }, { d: 0.5, e: "back.out(2)" });
      c.op("pres", s.pres ? 1 : 0);
      setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: COMPARE — the same frame, two states side by side
// Benchmark template: "The Pinned Before-and-After" — The Pudding,
// Responsive Scrollytelling (pudding.cool/process/responsive-scrollytelling).
// =====================================================================
function F_COMPARE(p) {
  const f = pfx(p);
  const panel = (x, k, col) => R(x, 24, 172, 206, C.white, 12, `stroke="${col}" stroke-width="2"`) + R(x, 24, 172, 34, col, 12) + R(x, 44, 172, 14, col) +
    f.TK(k + "T", x + 86, 47, "", 13.5, C.white) + f.TK(k + "1", x + 86, 92, "", 13.5, C.ink) + f.TK(k + "2", x + 86, 114, "", 13.5, C.ink);
  const marks = (x, k) => f.H(k + "ok", O(x + 86, 172, 26, C.green) + tick(x + 86, 172, 1.4, C.white, 4)) + f.H(k + "q", O(x + 86, 172, 26, C.orange) + T(x + 86, 182, "?", 28, C.white)) + f.H(k + "x", O(x + 86, 172, 26, C.red) + cross(x + 86, 172, 1.2, C.white, 4));
  return {
    p, bench: "Pinned Before-and-After (The Pudding)",
    draw() {
      let s = "";
      s += f.K("L", panel(14, "l", C.navy) + marks(14, "l"));
      s += f.K("Rr", panel(214, "r", C.orange) + marks(214, "r"));
      s += f.K("vs", O(200, 128, 17, C.white, `stroke="${C.slate}" stroke-width="2"`) + f.TK("vsT", 200, 133, "vs", 13, C.slate));
      s += noteSVG(f, "nb", 200, 266);
      return s;
    },
    render(c, s) {
      const l = s.l || ["", ""], r = s.r || ["", ""];
      c.tx("lT", s.lt || ""); c.tx("l1", l[0]); c.tx("l2", l[1]);
      c.tx("rT", s.rt || ""); c.tx("r1", r[0]); c.tx("r2", r[1]);
      c.tx("vsT", s.vs || "vs");
      ["ok", "q", "x"].forEach((m) => { c.op("l" + m, s.lm === m ? 1 : 0, { dl: 0.3 }); c.op("r" + m, s.rm === m ? 1 : 0, { dl: 0.6 }); });
      c.op("L", s.hl === "r" ? 0.4 : 1); c.op("Rr", s.hl === "l" ? 0.4 : 1);
      c.mv("L", s.hl === "l" ? { s: 1.03 } : {}); c.mv("Rr", s.hl === "r" ? { s: 1.03 } : {});
      setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: GOV — a business rule, its named owner and the authorised
// change route; informal edits are blocked
// Benchmark template: "Hierarchy traversal animated" (Observable
// @d3/hierarchy-traversal-animated) — visit one node then the next.
// =====================================================================
function F_GOV(p) {
  const f = pfx(p);
  const SX = [70, 200, 330], STEP = ["Propose change", "Owner approves", "Update procedure"];
  return {
    p, bench: "Hierarchy traversal animated (Observable)",
    draw() {
      let s = "";
      s += K(p + "rule", R(128, 34, 144, 70, C.white, 8, `stroke="${C.plum}" stroke-width="2.2"`) + F("M146 54 L156 64 L146 74 L136 64 Z", C.plum) + T(214, 62, "Corporate-", 13, C.plum) + T(214, 79, "rate rule", 13, C.plum));
      s += f.H("ow", person(54, 82, 1.25, C.navy) + chip(54, 124, "Rule owner", { sz: 13 }) + O(84, 56, 7, "none", `stroke="${C.amber}" stroke-width="2.6"`) + P("M90 56 h10 m-4 0 v5", C.amber, 2.6));
      s += f.H("link", P("M78 74 H126", C.navy, 2, 'stroke-dasharray="4 3"'));
      s += f.H("auth", `<g transform="rotate(-10 236 98)">${R(194, 86, 84, 26, "rgba(255,255,255,.95)", 5, `stroke="${C.green}" stroke-width="2.6"`)}${T(236, 104, "Authorised", 12.5, C.green)}</g>`);
      STEP.forEach((t, i) => { s += f.H("s" + i, chip(SX[i], 184, t, { sz: 12.5, st: C.green, fg: C.green })); if (i < 2) s += f.H("sa" + i, P(`M${SX[i] + 56} 184 H${SX[i + 1] - 58}`, C.green, 2.2) + F(`M${SX[i + 1] - 62} 179 L${SX[i + 1] - 54} 184 L${SX[i + 1] - 62} 189 Z`, C.green)); });
      s += f.H("tk", O(0, 0, 8, C.gold, `stroke="${C.amber}" stroke-width="1.5"`));
      s += f.H("ie", person(346, 84, 1.1, C.slate) + P("M330 76 Q300 60 278 64", C.red, 2, 'stroke-dasharray="4 3"') + `<g transform="rotate(-40 290 62)">${R(282, 56, 26, 8, C.gold, 2)}${F("M282 56 l-7 4 7 4 Z", C.ink)}</g>`);
      s += f.H("ieX", cross(300, 66, 1.8, C.red, 4.5));
      s += f.H("unaw", O(80, 40, 10, C.orange) + T(80, 45, "?", 13, C.white));
      s += noteSVG(f, "nb", 200, 262);
      return s;
    },
    render(c, s) {
      c.vis({ ow: s.ow, link: s.ow, auth: s.auth, ie: s.ie, ieX: s.ieX, unaw: s.unaw });
      c.mv("auth", s.auth ? {} : { s: 1.6 }, { d: 0.5, e: "back.out(2)" });
      for (let i = 0; i < 3; i++) { c.op("s" + i, i < (s.rt || 0) ? 1 : 0, { dl: i * 0.3 }); if (i < 2) c.op("sa" + i, i < (s.rt || 0) - 1 ? 1 : 0, { dl: i * 0.3 + 0.2 }); }
      const t = s.tk == null ? -1 : s.tk;
      c.op("tk", t >= 0 ? 1 : 0); if (t >= 0) c.mv("tk", { x: SX[t], y: 160 }, { d: 1 });
      setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: STACK — isometric exploded capability stack: a paper
// design gains interfaces, rules, procedures, exception path, test evidence
// Benchmark template: "The Process Architectural Motion" (Behance
// 194096661) — build and revise successive layers; plus inspiration-board
// #26 "Exploded process mechanism".
// =====================================================================
function F_STACK(p) {
  const f = pfx(p);
  const cx = 122, A = 80, B = 26, TH = 9, Y = [70, 102, 132, 162, 192, 222];
  const LAY = [null,
    { lab: "Interfaces", top: "#d3e3f2", l: "#86abcf", r: "#5f8ab3", col: C.navy },
    { lab: "Business rules", top: "#e6def1", l: "#a897c3", r: "#8a77ab", col: C.plum },
    { lab: "Manual procedures", top: "#d8ece1", l: "#86ba9f", r: "#619e81", col: C.green },
    { lab: "Exception path", top: "#f7e1d6", l: "#dc9c80", r: "#c77f61", col: C.orange },
    { lab: "Test evidence", top: "#f7ecd3", l: "#dcbd80", r: "#c5a05c", col: "#8a6418" }];
  const slab = (y, t, top, l, r, st) => F(`M${cx - A} ${y} L${cx} ${y + B} L${cx} ${y + B + t} L${cx - A} ${y + t} Z`, l) + F(`M${cx} ${y + B} L${cx + A} ${y} L${cx + A} ${y + t} L${cx} ${y + B + t} Z`, r) + F(`M${cx - A} ${y} L${cx} ${y - B} L${cx + A} ${y} L${cx} ${y + B} Z`, top, st ? `stroke="${st}" stroke-width="1.2"` : "");
  const icon = (j, y) => {
    const yy = y + 2;
    if (j === 1) return R(cx - 17, yy - 4, 10, 8, C.navy, 1.5) + R(cx + 7, yy - 4, 10, 8, C.navy, 1.5) + P(`M${cx - 7} ${yy} H${cx + 7}`, C.navy, 1.8, 'class="a-flow"');
    if (j === 2) return F(`M${cx} ${yy - 8} L${cx + 9} ${yy} L${cx} ${yy + 8} L${cx - 9} ${yy} Z`, C.plum) + tick(cx, yy, 0.45, C.white, 1.8);
    if (j === 3) return R(cx - 6, yy - 8, 12, 16, C.green, 2) + P(`M${cx - 3} ${yy - 3} H${cx + 3} M${cx - 3} ${yy + 2} H${cx + 3}`, C.white, 1.3);
    if (j === 4) return P(`M${cx - 10} ${yy + 4} Q${cx} ${yy - 12} ${cx + 9} ${yy + 2}`, C.orange, 2.6);
    return O(cx, yy, 8, "#8a6418") + tick(cx, yy, 0.5, C.white, 1.8);
  };
  return {
    p, bench: "The Process Architectural Motion (Behance) + Exploded mechanism (inspiration board #26)",
    draw() {
      let s = E(cx, 268, 104, 13, "rgba(27,42,58,.12)");
      for (let j = 5; j >= 1; j--) { const L = LAY[j]; s += f.H("pl" + j, slab(Y[j], TH, L.top, L.l, L.r) + icon(j, Y[j])); }
      s += K(p + "pl0", slab(Y[0], 3, "#eaf2fb", "#a9c2da", "#8eabc7", C.navy2) + P(`M66 ${Y[0]} H178`, C.navy, 2.6) + rep(4, (i) => F(`M${58 + i * 40} ${Y[0]} l8 -5 l8 5 l-8 5 Z`, C.navy)) +
        `<g transform="rotate(-6 122 84)">${R(88, 76, 68, 17, C.paper, 4, `stroke="${C.green}" stroke-width="2"`)}${T(122, 88.5, "Approved", 12, C.green)}</g>`);
      for (let j = 1; j <= 5; j++) s += f.H("lb" + j, P(`M${cx + A + 4} ${Y[j]} H230`, LAY[j].col, 1.5, 'stroke-dasharray="2 3"') + chip(308, Y[j], LAY[j].lab, { sz: 14, st: LAY[j].col, fg: LAY[j].col }));
      s += f.H("wk", person(24, 186, 1.05, C.green));
      s += f.H("bdg", star(24, 150, 1));
      s += f.H("odd", `<g class="a-bob">${buddy(146, 206, 8, C.orange)}</g>`);
      s += f.H("wkr", P("M40 200 Q4 286 120 286 Q190 286 196 250", C.red, 2.6, 'stroke-dasharray="5 5" class="a-flow"') + chip(80, 286, "Workaround", { sz: 12.5, st: C.red, fg: C.red }));
      s += f.H("guide", R(30, 238, 70, 26, C.white, 6, `stroke="${C.green}" stroke-width="1.6"`) + T(65, 256, "Route", 12.5, C.green));
      return s;
    },
    render(c, s) {
      const n = s.on || 0;
      for (let j = 1; j <= 5; j++) {
        const on = j <= n;
        c.op("pl" + j, on ? 1 : 0); c.mv("pl" + j, on ? (j === n ? { y: 0 } : {}) : { x: -70, y: -6 }, { d: 0.9 });
        c.op("lb" + j, on ? (s.hl && s.hl !== j ? 0.35 : 1) : 0); c.mv("lb" + j, on ? (s.hl === j ? { s: 1.06 } : {}) : { x: 24 });
      }
      c.vis({ wk: s.wk, bdg: s.bdg, odd: s.odd, wkr: s.wkr, guide: s.guide });
    }
  };
}

// =====================================================================
// SHOT FAMILY: KIT — Develop packs a handover kit; the case latches and
// crosses into Implement toward 14 properties
// Benchmark template: "Creative Design Workflow Animation" (Dribbble
// 27476599) — assemble shapes and refine; plus "World map with
// logistics" (LottieFiles qA3cpn3zMy) — trace routes between hubs.
// =====================================================================
function F_KIT(p) {
  const f = pfx(p);
  const CELL = (i) => [64 + (i % 3) * 64, 134 + Math.floor(i / 3) * 48];
  const ITEMS = ["Working systems", "Business rules", "Interfaces", "Manual procedures", "Exception catalogue", "Tested handover", "Rule owners", "Change control", "Support route"];
  const icon = (i, x, y) => {
    switch (i) {
      case 0: return R(x - 13, y - 10, 26, 18, C.navy, 3) + R(x - 9, y - 6, 18, 10, "#9cc0e0", 2) + R(x - 5, y + 8, 10, 3, C.navy, 1);
      case 1: return F(`M${x} ${y - 13} L${x + 13} ${y} L${x} ${y + 13} L${x - 13} ${y} Z`, C.plum) + tick(x, y, 0.55, C.white, 2);
      case 2: return R(x - 16, y - 7, 11, 14, C.navy2, 2) + R(x + 5, y - 7, 11, 14, C.green, 2) + P(`M${x - 5} ${y} H${x + 5}`, C.ink, 2);
      case 3: return R(x - 9, y - 12, 18, 24, C.paper, 2, `stroke="${C.green}" stroke-width="2"`) + P(`M${x - 5} ${y - 4} H${x + 5} M${x - 5} ${y + 2} H${x + 5} M${x - 5} ${y + 8} H${x + 2}`, C.green, 1.6);
      case 4: return R(x - 12, y - 12, 24, 24, C.orange, 3) + R(x - 8, y - 12, 4, 24, "#e9a184") + P(`M${x - 1} ${y - 5} H${x + 8} M${x - 1} ${y + 1} H${x + 8}`, C.white, 1.6);
      case 5: return person(x - 9, y + 9, 0.6, C.navy) + person(x + 9, y + 9, 0.6, C.green) + P(`M${x - 4} ${y - 8} Q${x} ${y - 14} ${x + 4} ${y - 8}`, C.orange, 1.8);
      case 6: return O(x - 5, y, 6, "none", `stroke="${C.amber}" stroke-width="2.6"`) + P(`M${x + 1} ${y} h12 m-4 0 v5`, C.amber, 2.6);
      case 7: return R(x - 9, y - 2, 18, 13, C.red, 2) + P(`M${x - 5} ${y - 2} v-5 a5 5 0 0 1 10 0 v5`, C.red, 2.2);
      default: return O(x, y, 12, "none", `stroke="${C.orange}" stroke-width="5"`) + O(x, y, 12, "none", `stroke="${C.white}" stroke-width="5" stroke-dasharray="6 6.6"`);
    }
  };
  return {
    p, bench: "Creative Design Workflow Animation (Dribbble) + World map with logistics (LottieFiles)",
    draw() {
      let s = "";
      s += ITEMS.map((t, i) => f.H("cl" + i, R(236, 32 + i * 24, 14, 14, C.white, 3, `stroke="${C.green}" stroke-width="1.6"`) + tick(243, 39 + i * 24, 0.5, C.green, 2) + T(256, 44 + i * 24, t, 12.5, C.ink, "", "start"))).join("");
      let cs = f.K("lid", R(24, 54, 192, 50, "#4a6782", 10) + R(34, 62, 172, 34, "#5d7c99", 6) + R(100, 70, 40, 6, "#2f465c", 3));
      cs += R(24, 104, 192, 154, "#35506b", 12) + R(30, 108, 180, 146, "#e6ecf1", 8) + rep(9, (i) => { const [x, y] = CELL(i); return R(x - 28, y - 20, 56, 42, "#f6f8fa", 5, `stroke="#c9d3dc" stroke-width="1"`); });
      cs += ITEMS.map((t, i) => { const [x, y] = CELL(i); return f.H("it" + i, icon(i, x, y)); }).join("");
      cs += f.H("tested", `<g transform="rotate(-10 ${CELL(5)[0]} ${CELL(5)[1]})">${R(CELL(5)[0] - 28, CELL(5)[1] - 9, 56, 18, "rgba(255,255,255,.92)", 4, `stroke="${C.green}" stroke-width="2"`)}${T(CELL(5)[0], CELL(5)[1] + 5, "Tested", 12, C.green)}</g>`);
      cs += f.H("cover", R(24, 104, 192, 154, "#4a6782", 12) + R(36, 116, 168, 130, "#5d7c99", 8) + R(108, 98, 24, 14, C.gold, 3));
      cs += f.H("covT", T(120, 186, "Handover kit", 16, C.white));
            cs += f.H("bug", O(196, 112, 12, C.orange) + P("M186 104 l-6 -6 M206 104 l6 -6 M184 116 h-6 M208 116 h6", C.orange, 2));
      s += f.K("case", cs);
      s += f.H("vendor", R(260, 120, 64, 50, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + O(292, 145, 14, C.navy) + T(292, 150, "C", 14, C.white) + chip(300, 196, "Software alone?", { sz: 13, st: C.red, fg: C.red }) + cross(352, 132, 1.1, C.red, 3));
      s += f.H("tabs", R(236, 168, 158, 82, C.white, 8, `stroke="${C.orange}" stroke-width="2"`) + chip(276, 190, "Response", { sz: 12, st: C.orange, fg: C.orange }) + chip(352, 190, "Role", { sz: 12, st: C.orange, fg: C.orange }) + chip(314, 226, "Authority", { sz: 12, st: C.orange, fg: C.orange }));
      s += f.H("pong", R(236, 168, 158, 82, C.white, 8, `stroke="${C.red}" stroke-width="2"`) + person(262, 226, 0.9, C.navy) + person(366, 226, 0.9, C.green) + P("M278 196 Q314 176 350 196 M350 206 Q314 226 278 206", C.red, 2, 'stroke-dasharray="4 3"') + clockI(314, 236, 10, C.red));
      s += f.H("divider", P("M230 18 V290", C.slate, 2, 'stroke-dasharray="6 5"') + T(120, 26, "Develop", 15, C.navy) + T(316, 26, "Implement", 15, C.green));
      s += f.H("notyet", chip(316, 120, "Not yet deployed", { sz: 14, st: C.orange, fg: C.orange }));
      s += f.H("map", rep(14, (i) => { const x = 246 + (i % 7) * 23, y = 54 + Math.floor(i / 7) * 34; return `<g data-k="${p}pin${i}" fill="${C.green}"><path d="M${x - 8} ${y + 8} V${y - 4} L${x} ${y - 11} L${x + 8} ${y - 4} V${y + 8} Z"/>${R(x - 2.5, y + 1, 5, 7, C.white, 1)}</g>`; }) + T(316, 116, "14 properties", 14, C.green));
      s += f.H("ev", chip(316, 86, "Test evidence", { sz: 14, bg: C.gold, st: C.amber, fg: C.ink }) + chip(316, 122, "Owners named", { sz: 14, st: C.green, fg: C.green }) + P("M316 136 V148", C.slate, 2));
      s += f.H("wk12", chip(316, 150, "Week 12 next", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
      return s;
    },
    render(c, s) {
      const n = s.n || 0;
      let cs = {}; if (s.moved) cs = { x: 196, y: 54, s: 0.6, pv: [120, 156] };
      c.mv("case", cs, { d: 1.2, e: "power2.inOut" });
      ITEMS.forEach((t, i) => {
        const on = i < n, [x, y] = CELL(i), fresh = on && i >= (s.from || 0);
        c.op("it" + i, on ? 1 : 0, { dl: fresh ? (i - (s.from || 0)) * 0.15 : 0 });
        c.mv("it" + i, on ? (s.zoom === i ? { s: 1.25 } : {}) : { x: 300 - x, y: 150 - y, s: 0.5 }, { d: 0.9, dl: fresh ? (i - (s.from || 0)) * 0.15 : 0, e: "back.out(1.4)" });
        c.op("cl" + i, on && s.list !== 0 ? 1 : 0, { dl: fresh ? 0.3 + (i - (s.from || 0)) * 0.15 : 0 });
      });
      c.mv("lid", { sy: s.lid === "closed" ? 0.02 : s.lid === "half" ? 0.55 : 1, pv: [120, 104] }, { d: 0.9 });
      c.op("cover", s.lid === "closed" ? 1 : 0, { dl: s.lid === "closed" ? 0.6 : 0 });
      c.op("covT", s.lid === "closed" && !s.moved && !s.ev ? 1 : 0);
      c.vis({ tested: s.tested, vendor: s.vendor, tabs: s.tabs, pong: s.pong, divider: s.divider, notyet: s.notyet, map: s.map, bug: s.bug, ev: s.ev, wk12: s.wk12 });
      for (let i = 0; i < 14; i++) c.fl("pin" + i, s.bug ? C.orange : C.green, { dl: s.bug ? i * 0.06 : 0 });
    }
  };
}

// =====================================================================
// SHOT FAMILY: FORUM — the "Automating the Exception" discussion board
// Benchmark template: "Clean Workflow Visualization with Motion Graphics"
// (Dribbble 27600376) — connect journey steps with transitions.
// =====================================================================
function F_FORUM(p) {
  const f = pfx(p);
  const ROWS = ["Unfamiliar organisation", "Configure or customise?", "Should the exception remain?", "Jeston, Chapter 19", "Post by mid-week", "Challenge two classmates", "Assessment 4 · Week 14"];
  const ic = (r, x, y) => [
    R(x - 9, y - 12, 18, 20, C.slate, 2) + R(x - 5, y - 8, 4, 4, C.white) + R(x + 1, y - 8, 4, 4, C.white) + R(x - 5, y - 1, 4, 4, C.white) + R(x + 1, y - 1, 4, 4, C.white),
    R(x - 12, y - 8, 24, 14, "#c9d6e6", 7) + O(x + 5, y - 1, 6, C.navy),
    O(x, y - 2, 10, C.orange) + T(x, y + 3, "?", 13, C.white),
    R(x - 11, y - 11, 22, 18, C.green, 2) + P(`M${x} ${y - 11} V${y + 7}`, C.white, 1.5),
    R(x - 10, y - 11, 20, 19, C.white, 2, `stroke="${C.red}" stroke-width="1.6"`) + R(x - 10, y - 11, 20, 6, C.red, 2) + O(x, y + 2, 3, C.red),
    R(x - 13, y - 11, 16, 11, C.white, 4, `stroke="${C.navy}" stroke-width="1.4"`) + R(x - 3, y - 4, 16, 11, C.white, 4, `stroke="${C.green}" stroke-width="1.4"`),
    star(x, y - 1, 1)][r];
  return {
    p, bench: "Clean Workflow Visualization with Motion Graphics (Dribbble)",
    draw() {
      let s = f.H("board", R(22, 22, 356, 238, C.white, 14, `stroke="${C.navy}" stroke-width="2"`) + R(22, 22, 356, 40, C.navy, 14) + R(22, 48, 356, 14, C.navy) + T(200, 49, "Automating the Exception", 17, C.white));
      s += ROWS.map((t, r) => f.H("fr" + r, ic(r, 52, 88 + r * 26) + T(74, 93 + r * 26, t, 14, r === 6 ? C.plum : C.ink, "", "start"))).join("");
      s += f.H("summ", [["Protect the design", C.navy], ["Develop capability", C.navy], ["Test exceptions", C.green], ["Prepare the handover", C.green]].map(([t, col], i) => chip(200, 52 + i * 56, t, { sz: 16, st: col, fg: col }) + (i < 3 ? P(`M200 ${67 + i * 56} V${93 + i * 56}`, C.slate, 2) + F(`M195 ${89 + i * 56} L200 ${96 + i * 56} L205 ${89 + i * 56} Z`, C.slate) : "")).join(""));
      return s;
    },
    render(c, s) {
      const n = s.n || 0;
      c.op("board", s.board ? 1 : 0);
      ROWS.forEach((t, r) => { c.op("fr" + r, s.board && r < n ? (r === n - 1 ? 1 : 0.55) : 0); c.mv("fr" + r, r === n - 1 ? { x: 4 } : {}); });
      c.op("summ", s.summ ? 1 : 0);
    }
  };
}

const SCENE_BG = [];
const Q4b = (a, b, c) => [1, 2, 3, 4].map((y) => ["Year " + y, a, b, c]);
const TIME = ["Time", "3 weeks", "6 weeks", "4 months"];

// =====================================================================
// W11O3b · Three options, three different futures (28 lines)
// Shots: LEDGER, RULES, UPGRADE, QUEUE, SPLIT, DEV, CHECK, CAP
// =====================================================================
{
  const id = "W11O3b";
  const plan = [
    ["ledger", { rows: Q4b("?", "?", "?"), nb: { t: "Shapes the years ahead", c: "N" } }, "A multi-year decision"],
    ["rules", { fw: 1, fok: 1, env: "rev", xc: 1, nr: { t: "Routes, can't evaluate", c: "R" } }, "Routes, can't evaluate"],
    ["ledger", { bars: 1, rows: [TIME, ["Fit", "71% covered", "Manual", "Full design"]] }, "Cost, speed, fit"],
    ["ledger", { rows: [["Receives", "Rate lookup", "Night queue", "Auto rules"]], nb: { t: "Not just quotations", c: "N" } }, "What Qasr receives"],
    ["upgrade", { cfg: 1, tg: 1, np: { t: "AED 180,000 · 6 weeks", c: "N" }, na: { t: "No custom code", c: "G" } }, "Configure: AED 180,000"],
    ["queue", { night: 1, n: 6, d: 3, clk: { t: "Overnight work", c: "P" } }, "Revenue office overnight"],
    ["queue", { night: 1, n: 6, d: 6, min: 0, g: "ok", clk: { t: "All done by 06:00", c: "G" } }, "Done before 06:00"],
    ["queue", { night: 1, n: 6, d: 6, st: 3, cal: 1, nt: { t: "Human approval, every arrival", c: "P" } }, "Two extra shifts"],
    ["queue", { n: 6, d: 6, st: 3, g: "ok", nt: { t: "Earlier, still manual", c: "O" } }, "Earlier, still manual"],
    ["rules", { gear: 1, tok: "out", nt: { t: "Rules component", c: "A" } }, "Extend: rules component"],
    ["ledger", { bars: 1, hl: 2, rows: [TIME] }, "AED 540,000, 4 months"],
    ["rules", { gear: 1, tok: "out", fw: 1, fx: 1, hl: "ev", nt: { t: "Matches approved design", c: "G" }, nr: { t: "No overnight queue", c: "G" } }, "Matches the design"],
    ["queue", { n: 3, d: 3, calX: 1, g: "ok" }, "No extra shifts"],
    ["upgrade", { ext: 1, lt: 1, np: { t: "A support limitation", c: "R" } }, "A serious qualification"],
    ["upgrade", { ext: 1, lk: 1, lt: 1, np: { t: "Outside upgrade paths", c: "R" } }, "Stated in writing"],
    ["upgrade", { ext: 1, up: 1, ext2: 1, tk: 1 }, "Future changes harder"],
    ["ledger", { bars: 1, hl: 2, cols: [2], rows: Q4b("", "", "Upgrade ?"), unk: 1, nb: { t: "Not trouble-free", c: "R" } }, "Not trouble-free"],
    ["rules", { dA: "Rate", dB: "lookup", tok: "out", nt: { t: "Standard rate lookup", c: "N" } }, "Change: rate at booking"],
    ["ledger", { bars: 1, hl: 0, rows: [TIME] }, "AED 95,000, 3 weeks"],
    ["split", { sort: 1, dimO: 1 }, "Only 71% resolved"],
    ["split", { sort: 1, tag: 1, dimG: 1 }, "29% keep old path"],
    ["split", { sort: 1, tag: 1, clk: 1, nb: { t: "Not every guest improves", c: "O" } }, "Not every guest"],
    ["dev", { b: 1, B: DEV_CHANGE, ch: [2, 3], own: 1, st: "q", log: ["Coverage: 71%", "29%: old approval"] }, "A deliberate compromise"],
    ["ledger", { rows: [["Upgrades", "Supported", "Supported", "Unsupported"]], hl: 2, hlDim: 0 }, "Upgrade support differs"],
    ["ledger", { rows: [["Upgrades", "Supported", "Supported", "Unsupported"], ["Manual", "29% old path", "All manual", "No new shifts"]] }, "Manual work differs"],
    ["ledger", { bars: 1, dimBars: 1, rows: [["Operate", "Old path 29%", "Night shifts", "Upgrade risk"]], nb: { t: "Price alone can't decide", c: "R" } }, "Price alone fails"],
    ["check", { t: "Compare before choosing", items: ["Delivery time", "Guest outcomes", "Staffing requirements", "Future support"], mk: ["ok", "ok", "ok", "ok"] }, "Compare four factors"],
    ["cap", { route: "ext", reg: 1, flag: 1, nb: { t: "Next: four years", c: "N" } }, "Next: four years"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#f4f2ee", plan,
    desc: "Configure (AED 180,000, six weeks, overnight approvals and two extra shifts), extend (AED 540,000, four months, automatic rules but unsupported upgrades) and change the design (AED 95,000, three weeks, 71 percent resolved, 29 percent on the old path) compared by what Qasr must operate afterwards.",
    shots: { ledger: F_LEDGER("lg_"), rules: F_RULES("ru_"), upgrade: F_UPGRADE("up_"), queue: F_QUEUE("qu_"), split: F_SPLIT("sp_"), dev: F_DEV("dv_"), check: F_CHECK("ck_"), cap: F_CAP("ca_") }
  });
  SCENE_BG.push([id, "#f4f2ee"]);
}

// =====================================================================
// W11O3c · The four-year decision (29 lines)
// Shots: LEDGER, DEV, QUEUE, RULES, UPGRADE, SPLIT, CAP, TIERS, COMPARE, CHECK
// =====================================================================
{
  const id = "W11O3c";
  const ALL4 = Q4b("29% gap", "Shifts ?", "Upgrade ?");
  const CFG4 = Q4b("", "Shifts ?", "");
  const plan = [
    ["ledger", { bars: 1, rows: Q4b("?", "?", "?"), unk: 1, nb: { t: "Price is only part", c: "O" } }, "Price is only part"],
    ["dev", { own: 1, gA: 1, nt: { t: "Approved in Innovate", c: "G" } }, "The approving manager"],
    ["queue", { n: 5, g: "wait", min: 47, clk: { t: "47 min wait", c: "R" }, nt: { t: "Will it disappear?", c: "P" } }, "Will the wait go?"],
    ["ledger", { bars: 1 }, "Three initial prices"],
    ["ledger", { bars: 1, tot: 1, nt: { t: "Initial spend only", c: "N" } }, "Not total cost"],
    ["ledger", { bars: 1, diff: 1 }, "AED 360,000 more"],
    ["ledger", { bars: 1, hl: 1, cols: [1], rows: CFG4, unk: 1, tot: 1 }, "Cheaper isn't certain"],
    ["queue", { night: 1, n: 6, d: 6, st: 3, cal: 1, nt: { t: "Every arrival approved", c: "P" } }, "Two shifts weekly"],
    ["ledger", { bars: 1, hl: 1, cols: [1], rows: CFG4, unk: 1, nb: { t: "Cost not given", c: "R" } }, "Cost not provided"],
    ["ledger", { bars: 1, hl: 1, cols: [1], rows: CFG4, unk: 1, tot: 1, nb: { t: "Estimate it first", c: "O" } }, "Estimate it first"],
    ["queue", { night: 1, n: 9, d: 4, st: 3, min: 0, g: "wait", clk: { t: "06:00 missed", c: "R" } }, "If 06:00 is missed"],
    ["rules", { gear: 1, tok: "out", fw: 1, fx: 1, hl: "ev", nt: { t: "No extra shifts", c: "G" } }, "Extend: automatic"],
    ["upgrade", { ext: 1, lt: 1, up: 1, ext2: 1 }, "Unsupported upgrades"],
    ["upgrade", { ext: 1, up: 1, ext2: 1, tk: 1 }, "Unknown future work"],
    ["ledger", { bars: 1, rows: ALL4, unk: 1, leg: 1 }, "Don't invent costs"],
    ["ledger", { bars: 1, hl: 0, rows: [TIME], nb: { t: "Lowest commitment", c: "G" } }, "Lowest initial cost"],
    ["split", { sort: 1, dimO: 1 }, "71% resolved"],
    ["split", { sort: 1, tag: 1, dimG: 1 }, "29% old path"],
    ["split", { sort: 1, tag: 1, clkO: 1, dimG: 1, nb: { t: "Waiting remains here", c: "R" } }, "They still wait"],
    ["cap", { reg: 1, flag: 1, nb: { t: "January: seven months", c: "R" } }, "January deadline"],
    ["cap", { route: "ext", reg: 1, flag: 1, ov: 1, nb: { t: "Conflict not quantified", c: "O" } }, "Possible overlap"],
    ["cap", { route: "ext", reg: 1, flag: 1, use: 0.85, nb: { t: "Work consumes capacity", c: "P" } }, "A resource decision"],
    ["cap", { all: 1, reg: 1, flag: 1, use: 0.5, nb: { t: "Capacity left for each?", c: "N" } }, "Check every route"],
    ["tiers", {}, "Process types"],
    ["tiers", { hl: ["core"], star: 1, o: [{ t: "Stronger fit justified", c: "A" }] }, "Guest-facing is core"],
    ["compare", { lt: "Strategic value", l: ["Guest-facing", "core process"], lm: "ok", rt: "Still present", r: ["Upgrade risk", "January deadline"], rm: "x", vs: "but" }, "Value doesn't erase risk"],
    ["check", { t: "Conditions to resolve", items: ["Estimate shift costs", "Price upgrade work", "Confirm team capacity"], mk: ["q", "q", "q"], st: "Conditional" }, "Conditional recommendation"],
    ["ledger", { bars: 1, rows: [ALL4[0], ["Approval", "Needed", "Needed", "Needed"]], unk: 1, leg: 1 }, "The full comparison"],
    ["ledger", { bars: 1, hl: 0, hlDim: 0, rows: [["Operate", "29% old path", "Night shifts", "Upgrade risk"]], nt: { t: "Cheapest isn't decisive", c: "R" } }, "Choose deliberately"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#eef3f6", plan,
    desc: "Initial prices drawn to scale, then four years of continuing obligations: unpriced overnight shifts, unsupported upgrade work, the 29 percent still on the old path, and the January deadline competing for the same delivery team.",
    shots: { ledger: F_LEDGER("lg_"), dev: F_DEV("dv_"), queue: F_QUEUE("qu_"), rules: F_RULES("ru_"), upgrade: F_UPGRADE("up_"), split: F_SPLIT("sp_"), cap: F_CAP("ca_"), tiers: F_TIERS("ti_"), compare: F_COMPARE("cp_"), check: F_CHECK("ck_") }
  });
  SCENE_BG.push([id, "#eef3f6"]);
}

// =====================================================================
// W11O2a · What happens when the normal path fails? (29 lines)
// Shots: SPLIT, EXC, HAND, QUEUE, DASH, CHECK, PHASE, TEST
// =====================================================================
{
  const id = "W11O2a";
  const plan = [
    ["split", { bins: 0, nb: { t: "Every corporate guest", c: "N" } }, "The guests served"],
    ["exc", { br: 1, tok: "miss", nb: { t: "Can't resolve automatically", c: "R" } }, "Not resolved automatically"],
    ["hand", { g: "wait", scr: { t: "Rate unresolved", c: "R" }, nt: { t: "Delay at the desk", c: "R" } }, "Unresolved at reception"],
    ["exc", { br: 1, tok: "miss", nb: { t: "Needs extra handling", c: "O" } }, "What an exception is"],
    ["exc", { br: 1, own: 1, bd: 1, inv: 1, out: "ret", tok: "inv" }, "An exception path"],
    ["split", { col: 1, nb: { t: "Not every arrival covered", c: "O" } }, "Design-change coverage"],
    ["split", { sort: 1 }, "71 resolved, 29 not"],
    ["split", { sort: 1, tag: 1 }, "Booked within 24h"],
    ["split", { sort: 1, tag: 1, dimG: 1, nb: { t: "Judge the hard cases", c: "O" } }, "Not just easy cases"],
    ["split", { sort: 1, tag: 1, nb: { t: "Compromise or design problem?", c: "P" } }, "Compromise or problem?"],
    ["exc", { gr: 1, br: 1, tok: "miss", nb: { t: "Reason for approval remains", c: "O" } }, "Exceptions remain"],
    ["queue", { n: 5, g: "wait", min: 47, clk: { t: "47 min wait", c: "R" } }, "The 47-minute wait"],
    ["queue", { night: 1, n: 5, d: 5, st: 2, clk: { t: "Moved overnight", c: "P" }, nt: { t: "Still human approval", c: "O" } }, "Moved, not removed"],
    ["exc", { br: 1, own: 1, inv: 1, tok: "inv", nt: { t: "Why does it exist?", c: "P" } }, "Ask why first"],
    ["exc", { br: 1, own: 1, inv: 1, out: "both" }, "Judgement or needless?"],
    ["dash", { hd: "Exception evidence", ln: 1, bars: 1 }, "Measure volumes, causes"],
    ["exc", { br: 1, rm: 1, gr: 1, nb: { t: "Automating needless work", c: "R" } }, "Don't automate waste"],
    ["exc", { br: 1, own: 1, pc: 1, tok: "owner", nb: { t: "No improvising", c: "G" } }, "A clear procedure"],
    ["check", { t: "Exception procedure", items: ["Responsible role", "Decision authority", "Handling arrangements"], mk: ["ok", "ok", "ok"] }, "Role, authority, handling"],
    ["phase", { hl: [6, 7], done: 6, nb: { t: "Who performs, who owns", c: "N" } }, "From the People phase"],
    ["hand", { proc: 1, cd: "rev", acc: 1, dec: "rec", g: "ok", nt: { t: "Followed at real arrivals", c: "G" } }, "Usable at the desk"],
    ["exc", { br: 1, own: 1, sw: 1, sq: 1, nb: { t: "Exceptions can queue too", c: "O" } }, "Handling time matters"],
    ["split", { sort: 1, tag: 1, clk: 1, nb: { t: "Uneven guest experience", c: "R" } }, "An uneven experience"],
    ["dash", { hd: "After go-live", ln: 1, bars: 1, g: 1 }, "Monitor after go-live"],
    ["dash", { hd: "After go-live", ln: 1, bars: 1, g: 1, al: 1 }, "Watch the workarounds"],
    ["exc", { br: 1, own: 1, inv: 1, out: "rem" }, "Don't keep weaknesses"],
    ["exc", { br: 1, own: 1, bd: 1, inv: 1, out: "ret", tok: "res", nb: { t: "Controlled, not improvised", c: "G" } }, "A controlled response"],
    ["split", { sort: 1, tag: 1, own: 1, dep: 1, nb: { t: "Dependable for every guest", c: "G" } }, "Dependable for all"],
    ["test", { kv: [0, 1, 1, 1], k: ["", "Exception case", "29% booking", "Peak volume"], peak: 1, nb: { t: "Next: test under pressure", c: "N" } }, "Next: test it"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#f2f5f1", plan,
    desc: "100 corporate arrivals: 71 resolve on the standard path, 29 booked within 24 hours stay on the old approval path. The exception branch shows an owner who investigates the cause, removes needless approval or returns the case, with handling time and monitoring after go-live.",
    shots: { split: F_SPLIT("sp_"), exc: F_EXC("ex_"), hand: F_HAND("ha_"), queue: F_QUEUE("qu_"), dash: F_DASH("da_"), check: F_CHECK("ck_"), phase: F_PHASE("ph_"), test: F_TEST("te_") }
  });
  SCENE_BG.push([id, "#f2f5f1"]);
}

// =====================================================================
// W11O2b · Testing the cases nobody wants to demonstrate (28 lines)
// Shots: CHECK, TEST, SPLIT, QUEUE, HAND, PHASE
// =====================================================================
{
  const id = "W11O2b";
  const REAL = ["Vendor demo", "Missing info", "Unusual request", "Many at once"];
  const ALLC = ["Vendor demo", "Past delay", "29% booking", "Peak volume"];
  const plan = [
    ["check", { t: "Manual procedure", items: ["Steps written", "Roles named", "Staff can run it?"], mk: ["ok", "ok", "q"], st: "Untested" }, "Written isn't proven"],
    ["test", { feed: 0, res: "pass", nb: { t: "Agreement available", c: "N" } }, "Vendor C's demo"],
    ["test", { feed: 0, res: "pass", sp: 1, bd: ["ok"], nb: { t: "Team feels relieved", c: "G" } }, "Looks convincing"],
    ["test", { fr: 1, bd: ["ok"], nb: { t: "Chosen to succeed", c: "O" } }, "Chosen conditions"],
    ["test", { kv: [1, 1, 1, 1], k: REAL, bd: ["ok", "q", "q", "q"] }, "Real operations"],
    ["test", { kv: [1, 1, 1, 1], k: REAL, steps: ["Check agreement", "Staff handover", "Confirm rate"], mh: 1, nb: { t: "Test the whole process", c: "N" } }, "Test the process"],
    ["test", { kv: [0, 1, 0, 0], k: ["", "Past failure", "", ""], bd: ["", "q"], feed: 1 }, "Historical cases first"],
    ["test", { kv: [0, 1, 0, 0], k: ["", "Past delay", "", ""], feed: 1, nb: { t: "Approval problems before", c: "O" } }, "Revisit problem arrivals"],
    ["test", { kv: [0, 1, 0, 0], k: ["", "Past delay", "", ""], feed: 1, res: "pass", bd: ["", "ok"], nb: { t: "Weakness addressed?", c: "N" } }, "Fixed or not?"],
    ["test", { kv: [1, 1, 1, 1], k: ["Easy booking", "Needs approval", "Unclear case", "Peak volume"], bd: ["ok", "q", "q", "q"], nb: { t: "Untested cases remain", c: "O" } }, "Easy cases only"],
    ["split", { sort: 1, tag: 1, dimG: 1, nb: { t: "Test the 29% too", c: "O" } }, "29% old path"],
    ["test", { kv: [0, 0, 0, 1], k: ["", "", "", "Peak volume"], feed: 3, peak: 1 }, "Peak volume"],
    ["queue", { n: 9, g: "wait", nt: { t: "Many approvals at once", c: "O" } }, "Many at once"],
    ["queue", { night: 1, n: 9, d: 5, st: 3, min: 30, clk: { t: "Clear by 06:00?", c: "P" } }, "Test the 06:00 queue"],
    ["queue", { night: 1, n: 9, d: 5, st: 3, min: 0, clk: { t: "06:00: not cleared", c: "R" }, nt: { t: "Delay exposed", c: "R" } }, "Expose the delay"],
    ["test", { kv: [1, 1, 1, 1], k: ALLC, pf: 1 }, "Staff join testing"],
    ["hand", { cd: "mid", miss: 1, nt: { t: "Unclear, missing, awkward", c: "O" } }, "Staff find gaps"],
    ["hand", { cd: "rev", acc: 1, nt: { t: "Information and responsibility", c: "N" } }, "What a handover is"],
    ["hand", { cd: "rev", acc: 1, bdg: 1, dec: "rec", nt: { t: "Test: needs investigation", c: "P" } }, "Test the transfer"],
    ["test", { kv: [0, 1, 0, 0], k: ["", "Past delay", "", ""], feed: 1, res: "fail", def: 1, bd: ["", "x"] }, "Record the defect"],
    ["test", { kv: [0, 1, 0, 0], k: ["", "Past delay", "", ""], feed: 1, res: "fail", def: 1, defZ: 1, bd: ["", "x"], nr: { t: "Expected vs observed", c: "R" } }, "Expected vs observed"],
    ["test", { kv: [0, 1, 0, 0], k: ["", "Missing info", "", ""], feed: 1, mh: 1, steps: ["Check agreement", "Manual step", "Confirm rate"], pf: 1 }, "Test manual steps"],
    ["check", { t: "Manual step test", items: ["Understands procedure", "Has the authority", "Completes the case"], mk: ["ok", "ok", "ok"] }, "Understanding, authority"],
    ["test", { kv: [0, 0, 0, 0], intf: "miss", nb: { t: "Missing data, wrong decision", c: "R" } }, "Interface data errors"],
    ["test", { kv: [0, 0, 0, 0], intf: "lost", scr: 1, nb: { t: "Screen works, data lost", c: "O" } }, "Screens aren't enough"],
    ["test", { kv: [1, 1, 1, 1], k: ALLC, bd: ["ok", "ok", "ok", "ok"], def: 1, dc: 1, nb: { t: "Evidence, defects fixed", c: "G" } }, "Ready to hand over"],
    ["phase", { done: 7, hl: [8], ny: 1 }, "Implement comes next"],
    ["hand", { sup: 1, proc: 1, nt: { t: "Next: the manual half", c: "N" } }, "Next: the manual half"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#eef2f6", plan,
    desc: "A vendor demo passes under chosen conditions; real tests feed past failures, the 29 percent, peak volume and the 06:00 overnight queue through the operating process, record defects as expected versus observed, and check handovers, manual steps and interfaces.",
    shots: { check: F_CHECK("ck_"), test: F_TEST("te_"), split: F_SPLIT("sp_"), queue: F_QUEUE("qu_"), hand: F_HAND("ha_"), phase: F_PHASE("ph_") }
  });
  SCENE_BG.push([id, "#eef2f6"]);
}

addStyles(SCENE_BG);
})();

// OPER621 · Week 11 · The Develop Phase — animated teaching scenes, version 2
// File: w11-claude-v2-part3.js  ·  Scenes: W11O2c, W11O3d, W11O3e, W11O3f
// Rebuilt from the narration-to-animation content audit: every narration line
// maps to one named shot family (benchmark template noted beside each family)
// whose state shows what that sentence says on Qasr's corporate-rate booking.
// Standalone part: registers its scenes and appends its own scoped rules into
// the single shared <style id="vl-sc-w11">. Parts may be concatenated in any order.
// Contract: VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }
(() => {
"use strict";
// ===== shared engine (self-contained copy in every part) =====
window.VL_SCENES = window.VL_SCENES || {};
const VL_SCENES = window.VL_SCENES;
const PART = "p3";
const C = {
  navy: "#1f4e79", navy2: "#2d6a9f", orange: "#c0502a", paper: "#fbf8f1",
  ink: "#1b2a3a", blue: "#dbe7f2", green: "#317c61", gold: "#e5b76c",
  muted: "#91aabd", plum: "#6b4e8a", sand: "#efe4cf", sky: "#eaf2f8",
  red: "#b0362b", white: "#ffffff", mint: "#e1f0e8", peach: "#f8e3d8",
  lilac: "#ece6f3", slate: "#5d7389", night: "#1d3350", amber: "#a8741a"
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
const D = (k, d, s, w = 3, ex = "") => `<path data-k="${k}" d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100" ${ex}/>`;
const T = (x, y, s, sz = 14, f = C.ink, ex = "", a = "middle") => `<text x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const TK = (k, x, y, s, sz = 14, f = C.ink, a = "middle", ex = "") => `<text data-k="${k}" x="${x}" y="${y}" font-size="${sz}" fill="${f}" text-anchor="${a}" ${ex}>${esc(s)}</text>`;
const K = (k, body, ex = "") => `<g data-k="${k}" ${ex}>${body}</g>`;
const H = (k, body, ex = "") => `<g data-k="${k}" style="opacity:0" ${ex}>${body}</g>`;
const tw = (s, sz) => Math.round(String(s).length * sz * 0.6 + sz * 1.3);
const chip = (x, y, s, o = {}) => {
  const sz = o.sz || 13, w = o.w || tw(s, sz), h = o.h || Math.round(sz * 1.9);
  return R(x - w / 2, y - h / 2, w, h, o.bg || C.white, o.rx == null ? h / 2 : o.rx,
    `stroke="${o.st || C.navy}" stroke-width="${o.sw || 1.7}"${o.dash ? ' stroke-dasharray="4 3"' : ""}`) +
    T(x, y + sz * 0.36, s, sz, o.fg || C.navy);
};
const tick = (x, y, s = 1, col = C.green, w = 3) => P(`M${x - 7 * s} ${y} l${5 * s} ${5 * s} l${10 * s} ${-11 * s}`, col, w);
const cross = (x, y, s = 1, col = C.orange, w = 3) => P(`M${x - 6 * s} ${y - 6 * s} l${12 * s} ${12 * s} M${x + 6 * s} ${y - 6 * s} l${-12 * s} ${12 * s}`, col, w);
const person = (x, y, s = 1, col = C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${O(0, -15, 8, col)}${F("M-13 12 Q-13 -4 0 -4 Q13 -4 13 12 Z", col)}</g>`;
const buddy = (x, y, r, col) => O(x, y, r, col) + O(x - r * 0.35, y - r * 0.12, r * 0.24, C.white) + O(x + r * 0.35, y - r * 0.12, r * 0.24, C.white) + O(x - r * 0.3, y - r * 0.08, r * 0.11, C.ink) + O(x + r * 0.4, y - r * 0.08, r * 0.11, C.ink);
const clockI = (x, y, r, col = C.orange, bg = C.white) => O(x, y, r, bg, `stroke="${col}" stroke-width="${Math.max(2, r / 6)}"`) + P(`M${x} ${y - r * 0.62} V${y} L${x + r * 0.45} ${y + r * 0.3}`, col, Math.max(2, r / 7));
const moon = (x, y, r, col = C.gold) => F(`M${x} ${y - r} A${r} ${r} 0 1 0 ${x} ${y + r} A${r * 1.3} ${r * 1.3} 0 0 1 ${x} ${y - r} Z`, col);
const star = (x, y, s = 1, col = C.gold) => F(`M${x} ${y - 10 * s} l${3 * s} ${6 * s} ${7 * s} ${1 * s} ${-5 * s} ${5 * s} ${1 * s} ${7 * s} ${-6 * s} ${-3 * s} ${-6 * s} ${3 * s} ${1 * s} ${-7 * s} ${-5 * s} ${-5 * s} ${7 * s} ${-1 * s} Z`, col, `stroke="${C.amber}" stroke-width="1"`);
const envelope = (x, y, col = C.orange) => R(x - 11, y - 8, 22, 16, C.white, 2, `stroke="${col}" stroke-width="1.6"`) + P(`M${x - 11} ${y - 8} L${x} ${y + 1} L${x + 11} ${y - 8}`, col, 1.5);
const bookTok = (col = C.navy2) => R(-15, -11, 30, 22, col, 4) + P("M-9 -4 H9 M-9 2 H5", C.white, 2) + O(9, 6, 2.5, C.gold);
const gear = (x, y, r, col, hole = C.paper) => {
  let d = ""; const n = 8;
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2, a1 = a0 + Math.PI / n * 0.55, a2 = a0 + Math.PI / n, a3 = a2 + Math.PI / n * 0.45;
    const p = (a, rr) => `${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`;
    d += (i ? "L" : "M") + p(a0, r) + "L" + p(a1, r) + "L" + p(a2, r * 0.78) + "L" + p(a3, r * 0.78);
  }
  return F(d + "Z", col) + O(x, y, r * 0.34, hole);
};

// ---- prefixed builders for shot families ----
const pfx = (p) => ({
  p,
  K: (k, b, e) => K(p + k, b, e),
  H: (k, b, e) => H(p + k, b, e),
  D: (k, d, s, w, e) => D(p + k, d, s, w, e),
  TK: (k, x, y, s, sz, f, a, e) => TK(p + k, x, y, s, sz, f, a, e)
});
const pc = (c, p) => {
  const o = { p, snap: c.snap, all: c.all, opEl: c.opEl, mvEl: c.mvEl, flEl: c.flEl, data: c.data };
  ["op", "mv", "dr", "fl", "tx", "cl"].forEach((m) => { o[m] = (k, ...a) => c[m](p + k, ...a); });
  o.vis = (m, t) => { const q = {}; Object.keys(m).forEach((k) => { q[p + k] = m[k]; }); c.vis(q, t); };
  return o;
};
// auto-sized note chips: variants N(avy) O(range) R(ed) G(reen) P(lum) F(illed)
const NOTE_COL = { N: [C.navy, C.white, C.navy], O: [C.orange, C.white, C.orange], R: [C.red, C.white, C.red], G: [C.green, C.white, C.green], P: [C.plum, C.white, C.plum], F: [C.navy, C.navy, C.white], A: [C.amber, C.white, C.amber] };
const noteSVG = (f, key, x, y, sz = 13) => Object.keys(NOTE_COL).map((v) => {
  const [st, bg, fg] = NOTE_COL[v];
  return f.H(key + v, R(x - 40, y - 13, 80, 26, bg, 13, `stroke="${st}" stroke-width="1.8"`) + f.TK(key + v + "T", x, y + sz * 0.36, "", sz, fg), `data-cx="${x}" data-sz="${sz}"`);
}).join("");
function setNote(c, key, n) {
  const v = n ? (typeof n === "string" ? "N" : (n.c || "N")) : "";
  const t = n ? (typeof n === "string" ? n : n.t) : "";
  Object.keys(NOTE_COL).forEach((q) => {
    if (q === v) {
      c.tx(key + q + "T", t);
      c.all(`[data-k="${c.p}${key}${q}"]`).forEach((g) => {
        const r = g.querySelector("rect"); const cx = +g.getAttribute("data-cx"); const sz = +g.getAttribute("data-sz") || 13;
        const w = Math.round(t.length * sz * 0.6 + sz * 1.6);
        if (r) { r.setAttribute("x", String(cx - w / 2)); r.setAttribute("width", String(w)); }
      });
    }
    c.op(key + q, q === v ? 1 : 0);
  });
}

// ---- per-part stylesheet (appended once into the shared <style id="vl-sc-w11">) ----
function sceneCSS(id, bg) {
  const s = ".vls-w11-" + id;
  return `
${s}{position:relative!important;display:flex!important;flex-direction:column!important;width:100%!important;height:100%!important;min-height:220px;overflow:hidden!important;box-sizing:border-box;border-radius:14px;background:${bg};color:${C.ink};font-family:inherit;isolation:isolate;-webkit-user-select:none;user-select:none}
${s} *{box-sizing:border-box}
${s} .w11-fig{position:relative;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
${s} .w11-fig>svg{position:absolute!important;inset:0!important;display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;overflow:hidden;font-family:inherit}
${s} svg text{font-family:inherit;font-weight:700;letter-spacing:.1px}
${s} [data-k]{transform-box:fill-box;transform-origin:50% 50%}
${s}.w11-css [data-k]{transition-property:transform,opacity,fill,stroke,stroke-dashoffset;transition-duration:.85s;transition-timing-function:cubic-bezier(.22,.8,.24,1)}
${s}.w11-snap [data-k],${s}.w11-rm [data-k]{transition:none!important}
${s}.w11-rm *,${s}.w11-snap *{animation:none!important}
${s} .w11-cap{flex:0 0 auto;display:flex;align-items:center;gap:10px;min-height:36px;padding:6px 12px 8px;font-size:14px;font-weight:700;line-height:1.25;color:${C.navy};background:rgba(255,255,255,.6);border-top:1px solid rgba(31,78,121,.12)}
${s} .w11-num{flex:0 0 auto;min-width:34px;padding:2px 8px;border-radius:999px;background:${C.navy};color:#fff;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
${s} .w11-lab{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.2px}
${s} .w11-lab.w11-in{animation:vlsw11CapIn .5s cubic-bezier(.22,.8,.24,1)}
${s} .w11-bar{flex:0 0 54px;height:4px;border-radius:4px;background:rgba(31,78,121,.15);overflow:hidden}
${s} .w11-bar i{display:block;height:100%;width:0;background:${C.orange};transition:width .6s ease}
${s}.w11-intro .w11-fig>svg{animation:vlsw11Intro .7s cubic-bezier(.22,.8,.24,1)}
${s} .a-flow{stroke-dasharray:5 7;animation:vlsw11Flow 1.1s linear infinite}
${s} .a-spin{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw11Spin 6s linear infinite}
${s} .a-bob{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw11Bob 2.6s ease-in-out infinite}
${s} .a-pulse{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw11Pulse 2s ease-in-out infinite}
${s} .a-blink{animation:vlsw11Blink 1.4s ease-in-out infinite}
${s} .a-shake{transform-box:fill-box;transform-origin:50% 50%;animation:vlsw11Shake .9s ease-in-out infinite}
@media (max-width:420px){${s} .w11-cap{font-size:13px;min-height:32px;padding:5px 10px 7px}${s} .w11-bar{flex-basis:40px}}
@media (prefers-reduced-motion:reduce){${s} *{animation:none!important;transition:none!important}}
`;
}
const KEYFRAMES = `
@keyframes vlsw11CapIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes vlsw11Intro{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
@keyframes vlsw11Flow{to{stroke-dashoffset:-24}}
@keyframes vlsw11Spin{to{transform:rotate(360deg)}}
@keyframes vlsw11Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes vlsw11Pulse{0%,100%{opacity:.35;transform:scale(.94)}50%{opacity:.95;transform:scale(1.06)}}
@keyframes vlsw11Blink{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes vlsw11Shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}
`;
function addStyles(list) {
  if (typeof document === "undefined") return;
  let st = document.getElementById("vl-sc-w11");
  if (!st) { st = document.createElement("style"); st.id = "vl-sc-w11"; (document.head || document.documentElement).appendChild(st); }
  const flag = "w11claudev2" + PART;
  if (st.getAttribute("data-" + flag)) return;
  st.setAttribute("data-" + flag, "1");
  st.appendChild(document.createTextNode(KEYFRAMES + list.map(([id, bg]) => sceneCSS(id, bg)).join("\n")));
}

// ---- scene factory: build(el), step(i,n), reset() ----
function makeScene(cfg) {
  const { id, N, labels } = cfg;
  let root = null, useG = false;
  const mapK = (i, n) => {
    const nn = Math.max(1, Math.floor(num(n, N)));
    const ii = clamp(Math.floor(num(i, 0)), 0, nn - 1);
    return nn === N ? ii : clamp(Math.round(ii * (N - 1) / Math.max(1, nn - 1)), 0, N - 1);
  };
  const nodes = (k) => (root ? Array.prototype.slice.call(root.querySelectorAll('[data-k="' + k + '"]')) : []);
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
  function ctx(snap) {
    return {
      snap,
      op: (k, o, t = {}) => nodes(k).forEach((el) => op(el, o, t, snap)),
      mv: (k, st, t = {}) => nodes(k).forEach((el) => tf(el, st, t, snap)),
      dr: (k, f, t = {}) => nodes(k).forEach((el) => dash(el, f, t, snap)),
      fl: (k, col, t = {}) => nodes(k).forEach((el) => fill(el, col, t, snap)),
      tx: (k, s) => nodes(k).forEach((el) => { if (el.textContent !== String(s)) el.textContent = String(s); }),
      cl: (k, cls, on) => nodes(k).forEach((el) => el.classList.toggle(cls, !!on)),
      vis: (map, t = {}) => Object.keys(map).forEach((k) => { const v = map[k]; const o = typeof v === "number" ? clamp(v, 0, 1) : (v ? 1 : 0); nodes(k).forEach((el) => op(el, o, t, snap)); }),
      all: (sel) => (root ? Array.prototype.slice.call(root.querySelectorAll(sel)) : []),
      opEl: (el, o, t = {}) => op(el, o, t, snap),
      mvEl: (el, st, t = {}) => tf(el, st, t, snap),
      flEl: (el, col, t = {}) => fill(el, col, t, snap),
      data: (n, v) => { if (root) root.setAttribute("data-" + n, String(v)); }
    };
  }
  function caption(k, snap) {
    const lab = root.querySelector(".w11-lab"), nn = root.querySelector(".w11-num"), bar = root.querySelector(".w11-bar i");
    const txt = labels[k] || "";
    if (lab && lab.textContent !== txt) {
      lab.textContent = txt;
      if (!snap && !reduced()) { lab.classList.remove("w11-in"); void lab.offsetWidth; lab.classList.add("w11-in"); }
    }
    if (nn) nn.textContent = (k + 1 < 10 ? "0" : "") + (k + 1) + "/" + N;
    if (bar) bar.style.width = (100 * (k + 1) / N).toFixed(1) + "%";
  }
  function render(k, snap) {
    if (!root) return;
    if (snap) root.classList.add("w11-snap");
    try { cfg.render(ctx(snap), k); } catch (e) { if (window.console) console.warn("[VL W11 " + id + "]", e); }
    caption(k, snap);
    if (snap) { void root.offsetWidth; root.classList.remove("w11-snap"); }
    root.setAttribute("data-moment", String(k));
  }
  function kill() {
    if (root && useG) { try { window.gsap.killTweensOf(root.querySelectorAll("[data-k]")); } catch (_) {} }
  }
  function mount(el) {
    const r = document.createElement("div");
    r.className = "vls-w11-" + id + " w11-root" + (useG ? " w11-gsap" : " w11-css") + (reduced() ? " w11-rm" : " w11-intro");
    r.setAttribute("data-scene", id);
    r.innerHTML = '<div class="w11-fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" focusable="false" aria-label="' +
      esc(cfg.desc) + '">' + cfg.draw() + '</svg></div><div class="w11-cap" aria-hidden="true"><span class="w11-num"></span><span class="w11-lab"></span><span class="w11-bar"><i></i></span></div>';
    if (typeof el.replaceChildren === "function") el.replaceChildren(r);
    else { el.innerHTML = ""; el.appendChild(r); }
    return r;
  }
  return {
    build(el) {
      if (!el || el.nodeType !== 1) return;
      kill();
      useG = hasG();
      root = mount(el);
      render(0, true);
    },
    step(i, n) { if (!root) return; render(mapK(i, n), false); },
    reset() { if (!root) return; kill(); render(0, true); }
  };
}

// ---- shot-based scene: every narration moment names one shot family + its state ----
// plan: [[shotName, stateObject, caption], ...] (one entry per narration line)
function shotScene(cfg) {
  const names = Object.keys(cfg.shots);
  const inst = {};
  names.forEach((nm) => { inst[nm] = cfg.shots[nm]; });
  const draw = () => R(-400, -300, 1200, 900, cfg.bg) +
    names.map((nm) => `<g data-k="SH_${nm}" style="opacity:0">${inst[nm].draw()}</g>`).join("");
  const render = (c, k) => {
    const [act, st] = cfg.plan[k];
    names.forEach((nm) => {
      const on = nm === act;
      c.op("SH_" + nm, on ? 1 : 0, { d: on ? 0.55 : 0.35, dl: on ? 0.12 : 0 });
      c.mv("SH_" + nm, on ? {} : { y: 10, s: 0.97 }, { d: 0.6 });
    });
    const shot = inst[act];
    shot.render(pc(c, shot.p), st || {}, k);
    c.data("benchmark", shot.bench);
    c.data("shot", act);
  };
  return makeScene({ id: cfg.id, N: cfg.plan.length, labels: cfg.plan.map((x) => x[2]), draw, render, desc: cfg.desc });
}

// =====================================================================
// SHOT FAMILY: RULES — evaluate the agreement vs. forward an approval
// Benchmark template: "Workflow AI Animation" (Dribbble 26275497) — data
// advances through stages; plus "Automated Workflows" (LottieFiles
// XR2hxXOdEK) — trigger, evaluate, complete.
// =====================================================================
function F_RULES(p) {
  const f = pfx(p);
  const doc = (x, y, l1, l2, col) => R(x, y, 104, 48, C.white, 8, `stroke="${col}" stroke-width="2"`) +
    R(x + 9, y + 12, 16, 22, "#eef3f8", 2, `stroke="${col}" stroke-width="1.4"`) +
    P(`M${x + 12} ${y + 18} h10 M${x + 12} ${y + 23} h10 M${x + 12} ${y + 28} h7`, col, 1.2) +
    T(x + 64, y + 21, l1, 13, col) + T(x + 64, y + 38, l2, 13, col);
  const POS = { start: [128, 132], dia: [204, 92], out: [300, 62], fwd: [64, 186], rev: [140, 226], hum: [332, 232] };
  return {
    p, bench: "Workflow AI Animation (Dribbble) + Automated Workflows (LottieFiles)",
    draw() {
      let s = "";
      s += f.K("agr", doc(12, 44, "Corporate", "agreement", C.navy));
      s += f.H("agrX", R(12, 44, 104, 48, C.white, 8, `stroke="${C.red}" stroke-width="2.4" stroke-dasharray="5 4"`) + T(64, 73, "Unavailable", 13, C.red));
      s += f.K("bkg", doc(12, 108, "Booking", "details", C.navy2));
      s += f.D("a1", "M116 68 C142 68 150 84 168 92", C.navy, 2.6);
      s += f.D("a2", "M116 132 C142 132 150 100 168 92", C.navy, 2.6);
      s += f.H("lbl", chip(142, 28, "Interface", { sz: 13, st: C.navy2, fg: C.navy2 }) + P("M142 37 V64", C.navy2, 1.4, 'stroke-dasharray="3 3"') + chip(204, 150, "Business rule", { sz: 13, st: C.plum, fg: C.plum }));
      s += f.K("dia", F("M204 56 L240 92 L204 128 L168 92 Z", C.navy) + f.TK("dA", 204, 89, "Apply", 13, C.white) + f.TK("dB", 204, 105, "rules", 13, C.white));
      s += f.H("gear", `<g class="a-spin">${gear(204, 92, 24, C.gold, C.navy)}</g>`);
      s += f.H("xc", cross(204, 92, 2.4, C.red, 5));
      s += f.H("mag", O(226, 74, 15, "rgba(255,255,255,.35)", `stroke="${C.ink}" stroke-width="3"`) + P("M237 85 L249 97", C.ink, 5));
      s += f.D("aO", "M240 92 H268", C.green, 3);
      s += f.H("out", R(272, 74, 120, 36, C.green, 18) + T(332, 97, "Rate confirmed", 13, C.white));
      s += f.H("q3", chip(330, 52, "How evaluated?", { st: C.orange, fg: C.orange, dash: 1 }) + chip(330, 92, "Which system?", { st: C.orange, fg: C.orange, dash: 1 }) + chip(330, 132, "If it fails?", { st: C.orange, fg: C.orange, dash: 1 }));
      s += f.D("aF", "M64 156 V226 H136", C.orange, 2.6);
      s += f.H("rev", person(178, 238, 1.15, C.orange) + T(178, 274, "Revenue office", 13, C.orange));
      s += f.D("aH", "M202 232 H268", C.orange, 3);
      s += f.H("hum", R(272, 214, 120, 36, C.orange, 18) + f.TK("hT", 332, 237, "Human approval", 13, C.white));
      for (let i = 0; i < 5; i++) s += f.H("q" + i, envelope(150, 204 - i * 11));
      s += f.H("fx", cross(100, 226, 1.4, C.red, 4));
      s += f.H("fok", O(100, 226, 10, C.green) + tick(100, 226, 0.55, C.white, 2));
      s += f.H("night", moon(380, 24, 11, C.gold));
      s += f.H("spin", O(380, 212, 8, "none", `stroke="${C.orange}" stroke-width="2.5" stroke-dasharray="12 8" class="a-spin"`));
      s += f.H("env", envelope(0, 0));
      s += f.H("tok", bookTok());
      s += noteSVG(f, "nt", 204, 22) + noteSVG(f, "nl", 104, 22) + noteSVG(f, "nr", 316, 168) + noteSVG(f, "nb", 320, 278);
      return s;
    },
    render(c, s) {
      const ev = s.ev !== 0, fw = !!s.fw, blocked = !!(s.xc || s.q3 || s.miss);
      const dE = s.hl === "fw" ? 0.28 : 1, dF = s.hl === "ev" ? 0.28 : 1;
      c.op("agrX", s.miss ? 1 : 0); c.op("agr", s.miss ? 0.12 : 1);
      c.dr("a1", 1); c.dr("a2", 1, { dl: 0.15 });
      c.op("a1", dE); c.op("a2", dE);
      c.tx("dA", s.dA || "Apply"); c.tx("dB", s.dB || "rules");
      c.op("dia", dE);
      c.mv("dia", s.pulse ? { s: 1.08 } : {});
      c.vis({ lbl: s.lbl, gear: s.gear, xc: s.xc, mag: s.mag, q3: s.q3, night: s.night, fx: s.fx, fok: s.fok, spin: s.open });
      const outOn = ev && !blocked;
      c.dr("aO", outOn ? 1 : 0, { dl: 0.5 }); c.op("aO", dE);
      c.op("out", outOn ? dE : 0, { dl: outOn ? 0.7 : 0 });
      c.mv("out", outOn ? {} : { x: -20 });
      c.dr("aF", fw ? 1 : 0); c.op("aF", dF);
      c.op("rev", fw ? dF : 0); c.dr("aH", fw && s.hum !== 0 ? 1 : 0, { dl: 0.4 }); c.op("aH", dF);
      c.tx("hT", s.hT || "Human approval");
      c.op("hum", fw && s.hum !== 0 ? dF : 0, { dl: 0.6 });
      for (let i = 0; i < 5; i++) { c.op("q" + i, i < (s.q || 0) ? 1 : 0, { dl: i * 0.08 }); c.mv("q" + i, i < (s.q || 0) ? {} : { x: -30 }); }
      const tp = s.tok && POS[s.tok];
      c.op("tok", tp ? 1 : 0);
      if (tp) c.mv("tok", { x: tp[0], y: tp[1] }, { d: 1.1, e: "power2.inOut" });
      c.cl("tok", "a-shake", s.tok === "dia" && blocked);
      const ep = s.env && POS[s.env];
      c.op("env", ep ? 1 : 0);
      if (ep) c.mv("env", { x: ep[0], y: ep[1] }, { d: 1.2, e: "power2.inOut" });
      setNote(c, "nt", s.nt); setNote(c, "nl", s.nl); setNote(c, "nr", s.nr); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: QUEUE — approval queue, clock, night shift, 06:00 deadline
// Benchmark template: "Bottling factory" (LottieFiles 53Q3SoGu0x) —
// items advance to a station and wait; plus "Process-Para" ring timer.
// =====================================================================
function F_QUEUE(p) {
  const f = pfx(p);
  const NC = 9;
  const card = () => R(-24, -7, 48, 14, C.white, 3, `stroke="${C.navy}" stroke-width="1.4"`) + R(-24, -7, 9, 14, C.navy2, 2) + P("M-10 0 H16", C.muted, 2);
  const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
  return {
    p, bench: "Bottling factory (LottieFiles) + Process-Para timer (LottieFiles)",
    draw() {
      let s = "";
      s += `<rect data-k="${p}sky" x="-400" y="-300" width="1200" height="430" fill="#e3eef8"/>`;
      s += R(-400, 130, 1200, 600, "#efe8da") + P("M-400 130 H800", "#d8ccb4", 2);
      s += f.K("sun", O(46, 42, 16, C.gold) + rep(8, (i) => { const a = i * Math.PI / 4; return P(`M${46 + 22 * Math.cos(a)} ${42 + 22 * Math.sin(a)} L${46 + 28 * Math.cos(a)} ${42 + 28 * Math.sin(a)}`, C.gold, 2.4); }));
      s += f.H("moon", moon(46, 42, 16, C.gold) + O(80, 26, 1.6, C.white) + O(96, 58, 1.4, C.white) + O(20, 74, 1.4, C.white));
      s += K(p + "clock", O(330, 62, 32, C.white, `stroke="${C.navy}" stroke-width="3"`) + rep(12, (i) => { const a = i * Math.PI / 6; return P(`M${330 + 26 * Math.sin(a)} ${62 - 26 * Math.cos(a)} L${330 + 30 * Math.sin(a)} ${62 - 30 * Math.cos(a)}`, C.navy, i % 3 ? 1.4 : 2.6); }) + O(330, 62, 3.5, C.navy));
      s += K(p + "hand", P("M330 62 V36", C.orange, 3.4));
      s += noteSVG(f, "clk", 312, 112, 14);
      s += R(14, 206, 132, 10, "#8a6a3a", 3) + T(80, 236, "Revenue office", 13, C.navy);
      s += f.K("s0", person(48, 198, 1, C.navy));
      s += f.H("s1", person(80, 198, 1, C.plum));
      s += f.H("s2", person(112, 198, 1, C.plum));
      s += R(250, 206, 140, 10, "#8a6a3a", 3) + T(320, 236, "Reception", 13, C.navy);
      s += K(p + "rcp", person(270, 198, 1, C.navy2));
      s += f.H("guest", `<g class="a-bob">${buddy(372, 186, 11, C.navy2)}</g>`);
      s += f.H("gw", clockI(372, 158, 10, C.red));
      s += f.H("gok", O(372, 160, 10, C.green) + tick(372, 160, 0.55, C.white, 2));
      for (let i = 0; i < NC; i++) s += f.H("c" + i, card());
      s += f.H("ns", R(150, 56, 62, 164, "none", 10, `stroke="${C.plum}" stroke-width="2.2" stroke-dasharray="6 4"`));
      s += f.H("nsX", cross(181, 140, 3, C.red, 5));
      s += f.H("cal", rep(7, (i) => R(14 + i * 35, 252, 32, 28, C.white, 5, `stroke="${C.slate}" stroke-width="1.3"`) + T(30 + i * 35, 271, DAYS[i], 12, C.slate)));
      [1, 4].forEach((d) => { s += f.H("ex" + d, R(14 + d * 35, 252, 32, 28, C.plum, 5) + moon(30 + d * 35, 266, 8, C.gold)); });
      s += f.H("cx", cross(65, 266, 1.3, C.red, 3.5) + cross(170, 266, 1.3, C.red, 3.5));
      s += noteSVG(f, "nc", 326, 266) + noteSVG(f, "nt", 184, 30) + noteSVG(f, "ng", 316, 150);
      return s;
    },
    render(c, s) {
      const night = !!s.night;
      c.fl("sky", night ? C.night : "#e3eef8", { d: 1 });
      c.op("sun", night ? 0 : 1); c.op("moon", night ? 1 : 0);
      c.mv("hand", { r: (s.min || 0) * 6, pv: [330, 62] }, { d: 1.4, e: "power2.inOut" });
      setNote(c, "clk", s.clk ? s.clk : null);
      c.op("s1", (s.st || 1) >= 2 ? 1 : 0); c.op("s2", (s.st || 1) >= 3 ? 1 : 0);
      c.mv("s1", (s.st || 1) >= 2 ? {} : { y: 20 }); c.mv("s2", (s.st || 1) >= 3 ? {} : { y: 20 });
      const n = Math.min(NC, s.n || 0), d = Math.min(n, s.d || 0);
      for (let i = 0; i < NC; i++) {
        let pos, o = 1;
        if (i >= n) { pos = { x: 100, y: 120 }; o = 0; }
        else if (i < d) pos = { x: 316, y: 196 - i * 5 };
        else pos = { x: 181, y: 196 - (i - d) * 16 };
        c.op("c" + i, o, { dl: i * 0.04 });
        c.mv("c" + i, pos, { d: 1, dl: (i < d ? i * 0.08 : 0), e: "power2.inOut" });
      }
      c.op("guest", s.g ? 1 : 0);
      c.op("gw", s.g === "wait" ? 1 : 0); c.op("gok", s.g === "ok" ? 1 : 0);
      c.mv("guest", s.g === "wait" ? {} : s.g === "ok" ? { x: -6 } : { x: 30 });
      c.vis({ ns: s.ns, nsX: s.nsX, cal: s.cal || s.calX, ex1: s.cal || s.calX, ex4: s.cal || s.calX, cx: s.calX });
      c.op("ex1", s.cal ? 1 : s.calX ? 0.35 : 0); c.op("ex4", s.cal ? 1 : s.calX ? 0.35 : 0);
      setNote(c, "nc", s.cal ? { t: "+2 night shifts", c: "P" } : s.calX ? { t: "No extra shifts", c: "G" } : null);
      setNote(c, "nt", s.nt); setNote(c, "ng", s.ng);
    }
  };
}

// =====================================================================
// SHOT FAMILY: PIPE — approved design passes through concrete
// deliverables before the Implement door unlocks
// Benchmark template: "Multi-Step Icon Animation" (LottieFiles
// uAM7js17jU) — activate one step after another; plus "Interactive
// Computer Assembly Sequence" (CodePen OJqNMVR).
// =====================================================================
function F_PIPE(p, ST) {
  const f = pfx(p);
  const XY = [[152, 84], [258, 84], [152, 166], [258, 166]];
  const icon = (t, x, y, col) => {
    if (t === "sys") return R(x - 13, y - 10, 26, 17, col, 3) + R(x - 9, y - 7, 18, 11, C.white, 1) + R(x - 5, y + 8, 10, 3, col, 1);
    if (t === "rule") return F(`M${x} ${y - 11} L${x + 11} ${y} L${x} ${y + 11} L${x - 11} ${y} Z`, col) + tick(x, y, 0.45, C.white, 1.8);
    if (t === "proc") return R(x - 9, y - 11, 18, 22, C.white, 2, `stroke="${col}" stroke-width="2"`) + P(`M${x - 5} ${y - 4} h10 M${x - 5} ${y + 1} h10 M${x - 5} ${y + 6} h7`, col, 1.5);
    if (t === "test") return O(x, y, 11, col) + tick(x, y, 0.6, C.white, 2.2);
    if (t === "cat") return R(x - 11, y - 11, 22, 22, col, 3) + R(x - 7, y - 11, 4, 22, C.white, 1);
    if (t === "hand") return person(x - 8, y + 9, 0.55, col) + person(x + 8, y + 9, 0.55, col) + P(`M${x - 4} ${y - 8} Q${x} ${y - 13} ${x + 4} ${y - 8}`, C.orange, 1.8);
    return O(x, y, 10, "none", `stroke="${col}" stroke-width="4"`) + O(x, y, 4, col);
  };
  return {
    p, bench: "Multi-Step Icon Animation (LottieFiles) + Computer Assembly Sequence (CodePen)",
    draw() {
      let s = "";
      s += f.K("doc", R(14, 98, 78, 96, C.white, 6, `stroke="${C.navy}" stroke-width="2"`) + T(53, 120, "Approved", 13, C.navy) + T(53, 136, "design", 13, C.navy) +
        P("M26 152 H80", C.navy, 2) + rep(3, (i) => F(`M${32 + i * 20} 152 l6 -5 l6 5 l-6 5 Z`, C.navy)) + P("M26 172 H70 M26 182 H62", C.muted, 2));
      ST.forEach((st, i) => {
        const [x, y] = XY[i];
        s += f.K("st" + i, R(x - 49, y - 34, 98, 68, C.white, 8, `stroke="${st.col}" stroke-width="2"`) + icon(st.ic, x, y - 13, st.col) + T(x, y + 11, st.l[0], 12.5, st.col) + T(x, y + 26, st.l[1], 12.5, st.col));
        s += f.H("lit" + i, R(x - 49, y - 34, 98, 68, "none", 8, `stroke="${st.col}" stroke-width="4"`) + O(x + 41, y - 27, 9, C.green) + tick(x + 41, y - 27, 0.5, C.white, 2));
        s += f.H("cur" + i, R(x - 54, y - 39, 108, 78, "none", 11, `stroke="${C.gold}" stroke-width="3" class="a-pulse"`));
      });
      s += K(p + "door", R(330, 98, 56, 96, "#cfe7da", 4, `stroke="${C.green}" stroke-width="2.4"`) + T(358, 214, "Implement", 13, C.green));
      s += f.K("panel", R(334, 102, 48, 88, C.green, 3) + O(373, 148, 3, C.white), "");
      s += f.K("lock", R(348, 140, 20, 16, C.slate, 3) + P("M352 140 v-6 a6 6 0 0 1 12 0 v6", C.slate, 2.6));
      s += f.H("tok", R(-11, -14, 22, 28, C.navy, 3) + P("M-6 -6 h12 M-6 0 h12 M-6 6 h8", C.white, 1.6));
      s += f.H("conf", person(52, 254, 1.1, C.slate) + R(68, 214, 22, 20, C.white, 6, `stroke="${C.orange}" stroke-width="1.6"`) + T(79, 229, "?", 14, C.orange));
      s += f.H("itB", R(100, 46, 104, 76, "none", 10, `stroke="${C.navy2}" stroke-width="2.4" stroke-dasharray="5 4"`));
      s += f.H("whole", R(98, 44, 214, 160, "none", 14, `stroke="${C.green}" stroke-width="3"`));
      s += f.H("spon", person(372, 262, 1.1, C.plum));
      s += noteSVG(f, "nb", 210, 236) + noteSVG(f, "nt", 205, 24);
      return s;
    },
    render(c, s) {
      const on = s.on || 0;
      ST.forEach((st, i) => {
        const lit = Array.isArray(on) ? on.indexOf(i) >= 0 : i < on;
        c.op("lit" + i, lit ? 1 : 0, { dl: lit ? i * 0.2 : 0 });
        c.op("st" + i, s.dim && !lit ? 0.35 : 1);
        c.mv("st" + i, s.cur === i ? { s: 1.05 } : {});
        c.op("cur" + i, s.cur === i ? 1 : 0);
      });
      const open = !!s.unl;
      c.op("lock", open ? 0 : 1);
      c.mv("lock", open ? { y: -12 } : s.shake ? { x: 4 } : {});
      c.mv("panel", { sx: open ? 0.08 : 1, pv: [334, 146] }, { d: 1 });
      c.op("doc", s.doc === 0 ? 0.3 : 1);
      c.mv("doc", s.big ? { s: 1.12 } : {});
      let tp = null;
      if (s.tok === "d") tp = [53, 146]; else if (s.tok === "door") tp = [358, 146]; else if (typeof s.tok === "number") tp = XY[s.tok];
      c.op("tok", tp ? 1 : 0);
      if (tp) c.mv("tok", { x: tp[0], y: tp[1] }, { d: 1.1, e: "power2.inOut" });
      c.vis({ conf: s.conf, itB: s.it, whole: s.whole, spon: s.spon });
      setNote(c, "nb", s.nb); setNote(c, "nt", s.nt);
    }
  };
}

// =====================================================================
// SHOT FAMILY: UPGRADE — supported settings carry over, a custom
// extension breaks when the vendor ships a new version
// Benchmark template: "Git Workflow 1" (LottieFiles G6eTYjLVJ5) —
// branch, merge and reconnect; plus "Process - Success" check draw.
// =====================================================================
function F_UPGRADE(p) {
  const f = pfx(p);
  const block = (x, title, key) => R(x, 70, 128, 100, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + R(x, 70, 128, 22, C.navy, 8) + R(x, 84, 128, 8, C.navy) + f.TK(key, x + 64, 86, title, 13, C.white);
  const panel = (x) => R(x, 104, 70, 54, "#eef3f8", 5, `stroke="${C.green}" stroke-width="1.6"`) + rep(3, (i) => R(x + 10, 112 + i * 15, 30, 9, "#c7d6e4", 4.5));
  const ext = (x, y, col) => R(x, y, 40, 50, col, 6) + gear(x + 20, y + 25, 12, C.amber, col);
  return {
    p, bench: "Git Workflow 1 (LottieFiles) + Process - Success (LottieFiles)",
    draw() {
      let s = "";
      s += block(10, "Vendor C v1", "h1") + T(74, 186, "Current version", 13, C.navy);
      s += f.H("cfg", panel(22) + rep(3, (i) => `<g data-k="${p}k${i}">${O(36, 116 + i * 15, 5, C.green)}</g>`));
      s += f.H("cfgL", chip(57, 52, "Settings", { sz: 13, st: C.green, fg: C.green }));
      s += f.H("ext", ext(138, 100, C.gold) + P("M138 125 h-6", C.amber, 3));
      s += f.H("extL", chip(158, 52, "Rules add-on", { sz: 13, st: C.amber, fg: C.amber }));
      s += f.H("lk", R(150, 136, 16, 13, C.red, 2) + P("M153 136 v-4 a5 5 0 0 1 10 0 v4", C.red, 2.2));
      s += f.H("ud", O(57, 131, 18, "rgba(255,255,255,.7)", `stroke="${C.green}" stroke-width="2.4"`) + P("M50 126 a8 8 0 1 1 1 10", C.green, 2.4) + F("M46 122 L50 130 L55 124 Z", C.green));
      s += f.H("arr", P("M184 120 H232", C.plum, 3, 'class="a-flow"') + F("M228 113 L238 120 L228 127 Z", C.plum) + chip(211, 26, "Vendor upgrade", { sz: 13, st: C.plum, fg: C.plum }));
      s += f.H("v2", block(242, "Vendor C v2", "h2") + T(306, 186, "New version", 13, C.navy));
      s += f.H("cfg2", panel(254) + rep(3, (i) => O(268, 116 + i * 15, 5, C.green)) + O(316, 108, 9, C.green) + tick(316, 108, 0.5, C.white, 2));
      s += f.H("ext2", `<g transform="rotate(16 208 150)">${ext(188, 128, "#f3c7b4")}${P("M196 132 L206 150 L198 160 L210 176", C.red, 3)}</g>`);
      s += f.H("tk", R(118, 222, 164, 66, C.white, 8, `stroke="${C.red}" stroke-width="2"`) + R(118, 222, 164, 20, C.red, 8) + R(118, 234, 164, 8, C.red) + T(200, 237, "Repair task", 13, C.white) + T(200, 262, "Rework add-on", 13, C.ink) + T(200, 280, "Cost: unknown", 13, C.red));
      s += f.H("lt", R(10, 206, 150, 86, C.white, 6, `stroke="${C.navy}" stroke-width="1.8"`) + T(85, 226, "Vendor C, in writing", 12.5, C.navy) + T(85, 248, "Add-on is outside", 12.5, C.red) + T(85, 265, "supported upgrades", 12.5, C.red) + P("M100 282 q8 -8 14 0 t14 -2", C.navy, 1.6));
      s += f.H("rv", P("M176 264 H388", C.plum, 2) + rep(4, (i) => O(196 + i * 60, 264, 11, C.plum) + tick(196 + i * 60, 264, 0.55, C.white, 2) + T(196 + i * 60, 290, "Year " + (i + 1), 12.5, C.plum)) + chip(282, 234, "Yearly review", { sz: 13, st: C.plum, fg: C.plum }));
      s += f.H("ow", rep(6, (i) => R(24 + (i % 3) * 34, 104 + Math.floor(i / 3) * 26, 30, 22, C.orange, 3)) + rep(4, (i) => chip(52 + i * 99, 270, ["Develop", "Test", "Maintain", "Adapt"][i], { sz: 13, st: C.orange, fg: C.orange })) + person(200, 232, 1.1, C.navy) + T(250, 236, "Qasr team", 13, C.navy, "", "start"));
      s += noteSVG(f, "nd", 306, 212) + noteSVG(f, "na", 74, 212) + noteSVG(f, "np", 205, 24);
      return s;
    },
    render(c, s) {
      c.tx("h1", s.h1 || "Vendor C v1");
      c.vis({ cfg: s.cfg, cfgL: s.cfg && !s.np, ext: s.ext, extL: s.ext && !s.np && !s.cfg, lk: s.lk, ud: s.ud });
      c.mv("ext", s.ext ? {} : { x: 40 }, { d: 0.9, e: "back.out(1.6)" });
      for (let i = 0; i < 3; i++) c.mv("k" + i, { x: s.tg ? [28, 0, 28][i] : [0, 28, 0][i] }, { d: 0.7, dl: i * 0.1 });
      c.op("arr", s.up ? 1 : 0); c.op("v2", s.up ? 1 : 0); c.mv("v2", s.up ? {} : { x: 30 });
      c.op("cfg2", s.cfg2 ? 1 : 0, { dl: 0.6 }); c.mv("cfg2", s.cfg2 ? {} : { x: -150 }, { d: 1.1, dl: 0.4 });
      c.op("ext2", s.ext2 ? 1 : 0, { dl: 0.7 }); c.mv("ext2", s.ext2 ? {} : { x: -40, y: -20 }, { d: 1, dl: 0.5, e: "bounce.out" });
      c.vis({ tk: s.tk, lt: s.lt, rv: s.rv, ow: s.ow });
      c.mv("tk", s.tk ? {} : { y: 30 });
      setNote(c, "nd", s.nd); setNote(c, "na", s.na); setNote(c, "np", s.np);
    }
  };
}

// =====================================================================
// SHOT FAMILY: SPLIT — 100 corporate arrivals sort into 71 resolved and
// 29 on the old approval path (booked within 24 hours)
// Benchmark template: "Sankey animation - acyclic graph" (Observable
// @joaormendes) + "Stacked-to-grouped bars" (Observable @d3) — units keep
// their identity while regrouping.
// =====================================================================
function F_SPLIT(p) {
  const f = pfx(p);
  const g = (i) => [16 + (i % 10) * 13, 48 + Math.floor(i / 10) * 13];
  const tgt = (i) => i < 71 ? [208 + (i % 15) * 12, 62 + Math.floor(i / 15) * 12] : [208 + ((i - 71) % 15) * 12, 178 + Math.floor((i - 71) / 15) * 12];
  return {
    p, bench: "Sankey animation (Observable) + Stacked-to-grouped bars (Observable)",
    draw() {
      let s = T(80, 32, "100 corporate arrivals", 13, C.navy);
      s += f.K("bG", R(198, 30, 194, 102, "#eef7f1", 10, `stroke="${C.green}" stroke-width="2"`) + T(208, 50, "Rate resolved", 14, C.green, "", "start") + f.TK("nG", 384, 50, "", 15, C.green, "end"));
      s += f.K("bO", R(198, 146, 194, 62, "#fbefe8", 10, `stroke="${C.orange}" stroke-width="2"`) + T(208, 166, "Old approval path", 14, C.orange, "", "start") + f.TK("nO", 384, 166, "", 15, C.orange, "end"));
      s += rep(100, (i) => { const [x, y] = g(i); return `<rect class="${p}t" data-i="${i}" data-k="${p}t" x="${x}" y="${y}" width="10" height="10" rx="2.5" fill="#c5ced8"/>`; });
      s += f.H("tag", chip(295, 226, "Booked within 24h", { sz: 13, bg: C.orange, st: C.orange, fg: C.white }));
      s += f.H("cG", clockI(28, 222, 13, C.green) + T(48, 227, "Quick", 13, C.green, "", "start"));
      s += f.H("cO", clockI(28, 256, 13, C.red) + T(48, 261, "Waits longer", 13, C.red, "", "start"));
      s += f.H("own", person(176, 196, 1.05, C.navy) + star(176, 166, 0.8));
      s += f.H("why", O(300, 182, 30, "rgba(255,255,255,.25)", `stroke="${C.ink}" stroke-width="3"`) + P("M321 203 L338 220", C.ink, 6));
      s += f.H("dep", O(372, 194, 11, C.green) + tick(372, 194, 0.6, C.white, 2.2));
      s += noteSVG(f, "nb", 200, 278) + noteSVG(f, "nl", 82, 210);
      return s;
    },
    render(c, s) {
      const tiles = c.all("." + p + "t");
      const col = !!s.col || !!s.sort;
      tiles.forEach((el) => {
        const i = +el.getAttribute("data-i"), orange = i >= 71;
        let fill = "#c5ced8";
        if (col) fill = orange ? C.orange : C.green;
        if (s.fix && orange) fill = C.navy2;
        let o = 1;
        if (s.dimG && !orange) o = 0.25;
        if (s.dimO && orange) o = 0.25;
        if (s.one != null) o = i === s.one ? 1 : 0.25;
        c.flEl(el, fill, { dl: s.col && !s.sort ? (i % 29) * 0.015 : 0 });
        c.opEl(el, o);
        if (s.sort) { const [a, b] = g(i), [x, y] = tgt(i); c.mvEl(el, { x: x - a, y: y - b }, { d: 1.1, dl: (orange ? (i - 71) : i) * 0.012, e: "power2.inOut" }); }
        else c.mvEl(el, i === s.one ? { s: 1.6 } : {}, { d: 0.8 });
      });
      c.op("bG", s.bins === 0 ? 0 : 1); c.op("bO", s.bins === 0 ? 0 : 1);
      c.op("bG", s.dimG ? 0.4 : s.bins === 0 ? 0 : 1); c.op("bO", s.dimO ? 0.4 : s.bins === 0 ? 0 : 1);
      c.tx("nG", s.sort ? "71" : ""); c.tx("nO", s.sort ? "29" : "");
      c.vis({ tag: s.tag, cG: s.clk, cO: s.clk || s.clkO, own: s.own, why: s.why, dep: s.dep });
      setNote(c, "nb", s.nb); setNote(c, "nl", s.nl);
    }
  };
}

// =====================================================================
// SHOT FAMILY: LEDGER — three options as columns: initial cost bars to
// true scale, then rows of continuing obligations (unknowns stay "?")
// Benchmark template: "Infographic Chart Creator" (Motion Array 36176) —
// grow columns, update labels; plus "Stacked-to-grouped bars".
// =====================================================================
function F_LEDGER(p) {
  const f = pfx(p);
  const X = [128, 228, 328], COL = [C.orange, C.navy, C.amber], NAME = ["Change design", "Configure", "Extend"];
  const COST = [95, 180, 540], VAL = ["AED 95K", "AED 180K", "AED 540K"], BASE = 112, MAXH = 68;
  const RY = (r) => 132 + r * 29;
  return {
    p, bench: "Infographic Chart Creator (Motion Array) + Stacked-to-grouped bars (Observable)",
    draw() {
      let s = "";
      X.forEach((x, j) => {
        s += f.H("f" + j, R(x - 50, 6, 100, 250, "none", 10, `stroke="${COL[j]}" stroke-width="3"`));
        s += f.K("nm" + j, T(x, 22, NAME[j], 13, COL[j]));
        const h = COST[j] / 540 * MAXH;
        s += f.H("b" + j, R(x - 25, BASE - h, 50, h, COL[j], 3));
        s += f.H("v" + j, T(x, BASE - h - 6, VAL[j], 13, COL[j]));
      });
      s += P(`M78 ${BASE} H378`, C.slate, 1.5);
      for (let r = 0; r < 4; r++) {
        s += f.H("rl" + r, `<g>${f.TK("rT" + r, 8, RY(r) + 18, "", 12.5, C.slate, "start")}</g>`);
        X.forEach((x, j) => {
          s += f.H(`c${r}${j}`, R(x - 47, RY(r), 94, 26, j === 0 ? "#fbefe8" : j === 1 ? "#e8f0f8" : "#f6eedb", 6) + f.TK(`t${r}${j}`, x, RY(r) + 18, "", 12.5, C.ink));
          s += f.H(`u${r}${j}`, R(x - 47, RY(r), 94, 26, "none", 6, `stroke="${C.red}" stroke-width="2" stroke-dasharray="4 3"`));
        });
      }
      s += f.H("diff", P(`M228 ${BASE - 26} V60 H328 V40`, C.red, 1.8, 'stroke-dasharray="3 3"') + chip(278, 52, "+AED 360K", { sz: 13, st: C.red, fg: C.red }));
      s += f.H("tot", T(8, 266, "4-yr total", 12.5, C.red, "", "start") + X.map((x) => T(x, 266, "AED ?", 14, C.red)).join(""));
      s += f.H("leg", chip(110, 287, "Known", { sz: 12.5, bg: C.navy, st: C.navy, fg: C.white }) + chip(205, 287, "Estimate needed", { sz: 12.5, st: C.red, fg: C.red, dash: 1 }) + chip(320, 287, "Not available", { sz: 12.5, st: C.slate, fg: C.slate }));
      s += noteSVG(f, "nb", 228, 287) + noteSVG(f, "nt", 228, 286);
      return s;
    },
    render(c, s) {
      const dim = s.dim || [], hl = s.hl == null ? -1 : s.hl;
      X.forEach((x, j) => {
        const d = dim.indexOf(j) >= 0 || (hl >= 0 && hl !== j && s.hlDim !== 0) ? 0.3 : 1;
        c.op("nm" + j, d);
        const db = s.dimBars ? 0.3 : d;
        c.op("b" + j, s.bars ? db : 0); c.mv("b" + j, { sy: s.bars ? 1 : 0.02, pv: [x, BASE] }, { d: 1.2, dl: j * 0.15 });
        c.op("v" + j, s.bars && s.vals !== 0 ? db : 0, { dl: s.bars ? 0.8 : 0 });
        c.op("f" + j, hl === j ? 1 : 0);
        for (let r = 0; r < 4; r++) {
          const row = s.rows && s.rows[r];
          const on = !!row && (!s.cols || s.cols.indexOf(j) >= 0);
          if (row) c.tx(`t${r}${j}`, row[j + 1]);
          c.op(`c${r}${j}`, on ? d : 0, { dl: on ? r * 0.12 + j * 0.05 : 0 });
          c.mv(`c${r}${j}`, on ? {} : { y: 8 });
          const unk = on && s.unk && /\?/.test(row[j + 1]);
          c.op(`u${r}${j}`, unk ? 1 : 0, { dl: 0.5 });
        }
      });
      for (let r = 0; r < 4; r++) { const row = s.rows && s.rows[r]; if (row) c.tx("rT" + r, row[0]); c.op("rl" + r, row ? 1 : 0); }
      c.vis({ diff: s.diff, tot: s.tot, leg: s.leg });
      setNote(c, "nb", s.nb); setNote(c, "nt", s.nt);
    }
  };
}

// =====================================================================
// SHOT FAMILY: DEV — approved design vs. delivered process, red
// difference markers, a deviation record and the business owner's stamp
// Benchmark template: "contract process" (LottieFiles tnM3xY0cM8) —
// proposal, agreement and approval states; plus "The Trouble With Food
// Safety Audits" (NYT) — annotated document callouts.
// =====================================================================
const DEV_A = [["Booking", "made"], ["Rules", "evaluate"], ["Rate set", "overnight"], ["Guest:", "no wait"]];
const DEV_HUMAN = [["Booking", "made"], ["Human", "approval"], ["Approval", "queue"], ["Guest", "waits"]];
const DEV_CHANGE = [["Booking", "made"], ["Lookup at", "booking"], ["71% rate", "ready"], ["29% old", "approval"]];
const DEV_CONFIG = [["Booking", "made"], ["Night", "approval"], ["Ready by", "06:00?"], ["Guest:", "no wait"]];
function F_DEV(p) {
  const f = pfx(p);
  const BX = [14, 110, 206, 302];
  return {
    p, bench: "contract process (LottieFiles) + Food Safety Audits annotations (NYT)",
    draw() {
      let s = "";
      s += f.K("rA", chip(66, 20, "Approved design", { sz: 13, bg: C.green, st: C.green, fg: C.white }));
      s += f.H("rB", chip(72, 110, "Delivered process", { sz: 13, bg: C.navy, st: C.navy, fg: C.white }));
      BX.forEach((x, i) => {
        s += f.K("A" + i, R(x, 34, 86, 48, C.white, 7, `stroke="${C.green}" stroke-width="2"`) + f.TK(`A${i}a`, x + 43, 54, "", 12.5, C.green) + f.TK(`A${i}b`, x + 43, 71, "", 12.5, C.green));
        s += f.H("B" + i, R(x, 124, 86, 48, C.white, 7, `stroke="${C.navy}" stroke-width="2"`) + f.TK(`B${i}a`, x + 43, 144, "", 12.5, C.navy) + f.TK(`B${i}b`, x + 43, 161, "", 12.5, C.navy));
        s += f.H("X" + i, R(x - 2, 122, 90, 52, "none", 8, `stroke="${C.red}" stroke-width="3"`));
        s += f.H("m" + i, O(x + 43, 103, 11, C.red) + T(x + 43, 108, "≠", 15, C.white));
        s += f.H("g" + i, R(x - 3, 31, 92, 54, "none", 9, `stroke="${C.red}" stroke-width="3" stroke-dasharray="5 3"`) + O(x + 80, 36, 9, C.red) + T(x + 80, 41, "!", 13, C.white));
        if (i < 3) s += P(`M${x + 86} 58 h10`, C.green, 2) + f.H("ab" + i, P(`M${x + 86} 148 h10`, C.navy, 2));
      });
      s += f.H("gA", R(8, 28, 384, 60, "none", 12, `stroke="${C.gold}" stroke-width="3" class="a-pulse"`));
      s += f.H("own", person(34, 246, 1.25, C.plum) + T(36, 290, "Owner", 13, C.plum));
      s += f.H("log", R(76, 188, 196, 106, C.white, 8, `stroke="${C.slate}" stroke-width="1.8"`) + R(76, 188, 196, 22, C.slate, 8) + R(76, 200, 196, 10, C.slate) + T(174, 204, "Deviation record", 13, C.white) +
        rep(4, (i) => f.H("l" + i, f.TK("lT" + i, 88, 230 + i * 18, "", 12.5, C.ink, "start"))));
      const stamp = (key, txt, col) => f.H(key, `<g transform="rotate(-10 334 246)">${O(334, 246, 38, "rgba(255,255,255,.9)", `stroke="${col}" stroke-width="3"`)}${O(334, 246, 31, "none", `stroke="${col}" stroke-width="1.2"`)}${T(334, 251, txt, 13, col)}</g>`);
      s += stamp("sOK", "Approved", C.green) + stamp("sNO", "Rejected", C.red) + stamp("sQ", "Decision?", C.orange);
      s += noteSVG(f, "nr", 292, 18) + noteSVG(f, "nt", 300, 110);
      return s;
    },
    render(c, s) {
      const A = s.A || DEV_A, B = s.B || DEV_A, ch = s.ch || [];
      A.forEach((t, i) => { c.tx(`A${i}a`, t[0]); c.tx(`A${i}b`, t[1]); });
      B.forEach((t, i) => { c.tx(`B${i}a`, t[0]); c.tx(`B${i}b`, t[1]); });
      c.op("rA", s.a === 0 ? 0 : 1);
      for (let i = 0; i < 4; i++) {
        c.op("A" + i, s.a === 0 ? 0 : s.hlB ? 0.5 : 1, { dl: i * 0.08 });
        c.op("B" + i, s.b ? 1 : 0, { dl: s.b ? i * 0.12 : 0 });
        c.mv("B" + i, s.b ? {} : { y: -40 }, { d: 0.9, dl: i * 0.1 });
        if (i < 3) c.op("ab" + i, s.b ? 1 : 0);
        const changed = ch.indexOf(i) >= 0;
        c.op("X" + i, s.b && changed ? 1 : 0, { dl: 0.5 });
        c.op("m" + i, s.b && changed && s.mk !== 0 ? 1 : 0, { dl: 0.7 });
        c.mv("m" + i, s.b && changed ? {} : { s: 0.3 });
        c.op("g" + i, (s.gap || []).indexOf(i) >= 0 ? 1 : 0);
      }
      c.op("rB", s.b ? 1 : 0);
      c.vis({ gA: s.gA, own: s.own, log: !!s.log });
      c.op("own", s.own ? (s.own === "dim" ? 0.3 : 1) : 0);
      const L = s.log || [];
      for (let i = 0; i < 4; i++) { if (L[i]) c.tx("lT" + i, L[i]); c.op("l" + i, L[i] ? 1 : 0, { dl: 0.2 + i * 0.18 }); }
      c.op("sOK", s.st === "ok" ? 1 : 0); c.op("sNO", s.st === "no" ? 1 : 0); c.op("sQ", s.st === "q" ? 1 : 0);
      ["sOK", "sNO", "sQ"].forEach((k) => c.mv(k, s.st ? { s: 1 } : { s: 1.7 }, { d: 0.5, e: "back.out(2)" }));
      setNote(c, "nr", s.nr); setNote(c, "nt", s.nt);
    }
  };
}

// =====================================================================
// SHOT FAMILY: CAP — one delivery team, a seven-month calendar, the
// rate-project block and the January regulation (size not quantified)
// Benchmark template: "Project TimeLine" (Motion Array 2424919) —
// advance along time markers.
// =====================================================================
function F_CAP(p) {
  const f = pfx(p);
  const X0 = 86, MW = 43;
  const MON = ["M1", "M2", "M3", "M4", "M5", "M6", "Jan"];
  return {
    p, bench: "Project TimeLine (Motion Array)",
    draw() {
      let s = "";
      s += rep(7, (i) => R(X0 + i * MW, 30, MW - 2, 190, i % 2 ? "#f1f4f8" : "#e9eef4", 3) + T(X0 + i * MW + MW / 2 - 1, 48, MON[i], 12.5, i === 6 ? C.red : C.slate));
      s += T(8, 88, "Rate work", 12.5, C.navy, "", "start") + T(8, 146, "Regulation", 12.5, C.red, "", "start") + T(8, 204, "Team", 12.5, C.slate, "", "start");
      s += f.H("blk", R(X0, 66, 4 * MW, 36, C.amber, 6) + f.TK("bT", X0 + 8, 89, "", 13, C.white, "start"));
      s += f.H("b2", R(X0, 66, 1.4 * MW, 16, C.navy, 4) + T(X0 + 1.4 * MW + 6, 79, "Configure 6 wk", 12.5, C.navy, "", "start") + R(X0, 86, 0.7 * MW, 16, C.orange, 4) + T(X0 + 0.7 * MW + 6, 99, "Change 3 wk", 12.5, C.orange, "", "start"));
      s += f.H("reg", R(X0, 124, 7 * MW - 2, 36, "#fbe9e6", 6, `stroke="${C.red}" stroke-width="2" stroke-dasharray="6 4"`) + T(X0 + 150, 147, "Size not quantified", 13, C.red));
      s += f.H("flag", P(`M${X0 + 7 * MW - 2} 26 V222`, C.red, 2.4) + F(`M${X0 + 7 * MW - 2} 26 l-24 7 l24 7 Z`, C.red));
      s += R(X0, 188, 7 * MW - 2, 26, C.white, 6, `stroke="${C.slate}" stroke-width="1.5"`);
      s += f.H("use", R(X0, 188, 7 * MW - 2, 26, C.plum, 6, 'opacity=".8"'));
      s += f.H("ov", R(X0, 62, 4 * MW, 102, "rgba(176,54,43,.16)", 6, `stroke="${C.red}" stroke-width="2"`) + chip(X0 + 2 * MW, 176, "Same team", { sz: 12.5, bg: C.red, st: C.red, fg: C.white }));
      s += f.K("team", person(26, 270, 0.9, C.navy) + person(50, 270, 0.9, C.navy) + person(74, 270, 0.9, C.navy));
      s += noteSVG(f, "nb", 240, 262) + noteSVG(f, "nt", 240, 288);
      return s;
    },
    render(c, s) {
      const W = { ext: 4, cfg: 1.4, chg: 0.7 }[s.route] || 0;
      const T0 = { ext: "Extension: 4 months", cfg: "Configure", chg: "Change" }[s.route] || "";
      c.tx("bT", T0);
      c.op("blk", W ? 1 : 0);
      c.mv("blk", { sx: W ? W / 4 : 0.02, pv: [X0, 84] }, { d: 1.2 });
      c.vis({ b2: s.all, reg: s.reg, flag: s.flag, ov: s.ov });
      c.mv("reg", s.reg ? {} : { y: 20 });
      c.op("use", s.use ? 1 : 0); c.mv("use", { sx: s.use || 0.01, pv: [X0, 201] }, { d: 1.3 });
      c.mv("team", s.ov ? { x: 4 } : {});
      setNote(c, "nb", s.nb); setNote(c, "nt", s.nt);
    }
  };
}

// =====================================================================
// SHOT FAMILY: HAND — reception hands a booking case to the revenue
// office; the decision travels back to the employee serving the guest
// Benchmark template: "Workflow Animation" (Dribbble 3791748) — reveal
// action, transfer trigger, show notification; plus inspiration-board
// #10 "The Physical Handoff".
// =====================================================================
function F_HAND(p) {
  const f = pfx(p);
  const CP = { rec: [76, 86], mid: [200, 72], rev: [324, 86] };
  const DP = { rev: [324, 146], rec: [76, 146] };
  return {
    p, bench: "Workflow Animation (Dribbble 3791748) + Physical Handoff (inspiration board #10)",
    draw() {
      let s = "";
      s += R(14, 200, 124, 10, "#8a6a3a", 3) + T(76, 230, "Reception", 13, C.navy);
      s += R(262, 200, 124, 10, "#8a6a3a", 3) + T(324, 230, "Revenue office", 13, C.green);
      s += K(p + "rcp", person(52, 192, 1.1, C.navy));
      s += K(p + "rvp", person(324, 192, 1.1, C.green));
      s += f.H("gst", `<g class="a-bob">${buddy(112, 180, 11, C.navy2)}</g>`);
      s += f.H("gw", clockI(112, 152, 10, C.red));
      s += f.H("gok", O(112, 154, 10, C.green) + tick(112, 154, 0.55, C.white, 2));
      s += f.H("bdg", star(350, 168, 0.9));
      s += f.H("acc", O(358, 112, 11, C.green) + tick(358, 112, 0.6, C.white, 2.2));
      s += f.H("proc", R(16, 132, 24, 32, C.white, 3, `stroke="${C.navy}" stroke-width="1.8"`) + R(22, 128, 12, 6, C.navy, 2) + P("M21 144 h14 M21 151 h14 M21 158 h10", C.muted, 1.6));
      s += f.H("pp", P("M120 104 Q200 82 280 104", C.red, 2.2, 'stroke-dasharray="5 4"') + F("M276 98 L284 106 L274 108 Z", C.red) + P("M280 122 Q200 144 120 122", C.red, 2.2, 'stroke-dasharray="5 4"') + F("M124 116 L116 124 L126 128 Z", C.red) + clockI(200, 113, 12, C.red));
      s += f.H("imp", [[150, 40], [230, 30], [310, 40]].map(([x, y]) => P(`M70 170 Q${x / 2 + 40} ${y + 30} ${x} ${y + 24}`, C.orange, 1.8, 'stroke-dasharray="4 4"') + person(x, y + 22, 0.85, C.slate) + T(x, y - 4, "?", 14, C.orange)).join(""));
      s += f.H("impX", cross(230, 46, 2.6, C.red, 5));
      s += f.H("sup", P("M70 214 Q90 256 168 262", C.green, 2.2, 'stroke-dasharray="5 4"') + O(196, 262, 15, C.green) + P("M188 258 a8 8 0 0 1 16 0", C.white, 2.2) + R(185, 258, 4, 7, C.white, 1) + R(203, 258, 4, 7, C.white, 1) + chip(272, 262, "Support route", { sz: 13, st: C.green, fg: C.green }));
      s += f.H("cd", R(-52, -22, 104, 44, C.white, 6, `stroke="${C.navy}" stroke-width="2"`) + R(-52, -22, 104, 9, C.navy, 6) + R(-52, -17, 104, 4, C.navy) + T(-2, 4, "Agreement ID", 12.5, C.navy) + T(-2, 19, "Case owner", 12.5, C.navy) + tick(44, 0, 0.4, C.green, 2) + tick(44, 15, 0.4, C.green, 2));
      s += f.H("cdX", R(-52, -22, 104, 44, "#fff4f1", 6, `stroke="${C.red}" stroke-width="2"`) + R(-52, -22, 104, 9, C.red, 6) + R(-52, -17, 104, 4, C.red) + T(0, 4, "Agreement: ?", 12.5, C.red) + T(0, 19, "Owner: ?", 12.5, C.red));
      s += f.H("dec", R(-54, -14, 108, 28, C.green, 14) + T(0, 5, "Rate confirmed", 12.5, C.white));
      s += noteSVG(f, "scr", 112, 124) + noteSVG(f, "nt", 200, 24) + noteSVG(f, "nb", 200, 278);
      return s;
    },
    render(c, s) {
      const cp = s.cd && CP[s.cd];
      const miss = !!s.miss;
      c.op("cd", cp && !miss ? 1 : 0); c.op("cdX", cp && miss ? 1 : 0);
      if (cp) { c.mv("cd", { x: cp[0], y: cp[1] }, { d: 1.2, e: "power2.inOut" }); c.mv("cdX", { x: cp[0], y: cp[1] }, { d: 1.2, e: "power2.inOut" }); }
      const dp = s.dec && DP[s.dec];
      c.op("dec", dp ? 1 : 0);
      if (dp) c.mv("dec", { x: dp[0], y: dp[1] }, { d: 1.2, dl: 0.2, e: "power2.inOut" });
      c.op("gst", s.g ? 1 : 0); c.op("gw", s.g === "wait" ? 1 : 0); c.op("gok", s.g === "ok" ? 1 : 0);
      c.vis({ bdg: s.bdg, acc: s.acc, proc: s.proc, pp: s.pp, imp: s.imp, impX: s.impX, sup: s.sup });
      c.mv("acc", s.acc ? {} : { s: 0.3 });
      c.op("rvp", s.rev === 0 ? 0.3 : 1);
      setNote(c, "scr", s.scr); setNote(c, "nt", s.nt); setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: TEST — feed realistic cases into the operating process,
// compare expected vs observed, log and close defects
// Benchmark template: "Process - Success" (LottieFiles EhFVqZgUPP) —
// activity transforms into a check; plus "Dashboard" (LottieFiles
// M05MmlnoOP) — fill graph, highlight metric.
// =====================================================================
function F_TEST(p) {
  const f = pfx(p);
  const CY = [30, 82, 134, 186];
  return {
    p, bench: "Process - Success (LottieFiles) + Dashboard (LottieFiles)",
    draw() {
      let s = T(66, 20, "Test cases", 13, C.slate);
      CY.forEach((y, i) => {
        s += f.H("k" + i, R(10, y, 112, 42, C.white, 7, `stroke="${i ? C.orange : C.navy2}" stroke-width="2"`) + f.TK("kT" + i, 66, y + 26, "", 13, i ? C.orange : C.navy2));
        s += f.H("kok" + i, O(118, y + 4, 9, C.green) + tick(118, y + 4, 0.5, C.white, 2));
        s += f.H("kq" + i, O(118, y + 4, 9, C.slate) + T(118, y + 9, "?", 13, C.white));
        s += f.H("kx" + i, O(118, y + 4, 9, C.red) + cross(118, y + 4, 0.45, C.white, 2));
      });
      s += f.H("sp", rep(4, (i) => { const [x, y] = [[14, 26], [118, 26], [14, 76], [118, 76]][i]; return P(`M${x - 5} ${y} H${x + 5} M${x} ${y - 5} V${y + 5}`, C.gold, 2.4); }));
      s += f.H("fr", R(4, 24, 124, 54, "none", 10, `stroke="${C.gold}" stroke-width="2.4" stroke-dasharray="6 4"`));
      s += K(p + "proc", R(144, 40, 118, 166, C.white, 10, `stroke="${C.navy}" stroke-width="2"`) + T(203, 60, "Operating process", 12.5, C.navy));
      s += f.K("steps", rep(3, (i) => R(154, 74 + i * 42, 98, 32, "#eef3f8", 6) + f.TK("sT" + i, 203, 95 + i * 42, "", 12.5, C.navy)));
      s += f.H("mh", R(150, 112, 106, 40, "none", 8, `stroke="${C.gold}" stroke-width="3" class="a-pulse"`));
      s += f.H("intf", R(150, 70, 106, 130, C.white, 8) + R(156, 84, 44, 40, C.navy, 6) + T(178, 140, "Booking", 12.5, C.navy) + R(206, 84, 44, 40, C.green, 6) + T(228, 140, "Rates", 12.5, C.green) + P("M200 104 H206", C.slate, 2) + T(203, 188, "Interface", 12.5, C.slate));
      s += f.H("scrOK", O(178, 104, 9, C.white) + tick(178, 104, 0.5, C.green, 2));
      s += f.H("pk", R(-10, -7, 20, 14, C.gold, 3));
      s += f.H("pX", O(203, 162, 10, C.red) + T(203, 167, "?", 13, C.white));
      s += f.H("tk", R(-18, -12, 36, 24, C.navy2, 5) + P("M-11 -3 H11 M-11 4 H6", C.white, 1.8));
      s += rep(6, (i) => f.H("pkk" + i, R(-14, -9, 28, 18, C.orange, 4)));
      s += f.H("rE", R(276, 44, 116, 30, C.white, 8, `stroke="${C.slate}" stroke-width="1.5"`) + T(284, 64, "Expected", 12.5, C.slate, "", "start") + O(376, 59, 8, C.green) + tick(376, 59, 0.45, C.white, 2));
      s += f.H("rO", R(276, 80, 116, 30, C.white, 8, `stroke="${C.slate}" stroke-width="1.5"`) + T(284, 100, "Observed", 12.5, C.slate, "", "start"));
      s += f.H("oOK", O(376, 95, 8, C.green) + tick(376, 95, 0.45, C.white, 2));
      s += f.H("oX", O(376, 95, 8, C.red) + cross(376, 95, 0.4, C.white, 2));
      s += f.H("def", R(276, 122, 116, 100, C.white, 8, `stroke="${C.red}" stroke-width="2"`) + R(276, 122, 116, 22, C.red, 8) + R(276, 134, 116, 10, C.red) + T(334, 138, "Defect logged", 12.5, C.white) +
        T(284, 164, "Situation", 12.5, C.ink, "", "start") + T(284, 186, "Expected", 12.5, C.green, "", "start") + T(284, 208, "Observed", 12.5, C.red, "", "start"));
      s += f.H("dc", `<g transform="rotate(-8 334 238)">${R(292, 222, 84, 30, "rgba(255,255,255,.92)", 6, `stroke="${C.green}" stroke-width="3"`)}${T(334, 243, "Fixed", 14, C.green)}</g>`);
      s += f.H("pf", person(180, 252, 1.05, C.navy) + person(228, 252, 1.05, C.green) + T(204, 290, "Staff testers", 13, C.navy));
      s += noteSVG(f, "nb", 200, 282) + noteSVG(f, "nr", 300, 248);
      return s;
    },
    render(c, s) {
      const txt = s.k || ["Vendor demo", "Past failure", "29% booking", "Peak volume"];
      const vis = s.kv || [1, 0, 0, 0], bd = s.bd || [];
      for (let i = 0; i < 4; i++) {
        c.tx("kT" + i, txt[i] || "");
        c.op("k" + i, vis[i] ? (s.feed != null && s.feed !== i ? 0.55 : 1) : 0, { dl: i * 0.1 });
        c.mv("k" + i, vis[i] ? (s.feed === i ? { x: 6 } : {}) : { x: -20 });
        c.op("kok" + i, vis[i] && bd[i] === "ok" ? 1 : 0); c.op("kq" + i, vis[i] && bd[i] === "q" ? 1 : 0); c.op("kx" + i, vis[i] && bd[i] === "x" ? 1 : 0);
      }
      const st = s.steps || ["Check agreement", "Approve rate", "Confirm rate"];
      for (let i = 0; i < 3; i++) c.tx("sT" + i, st[i]);
      c.op("steps", s.intf ? 0 : 1);
      c.vis({ sp: s.sp, fr: s.fr, mh: s.mh, intf: s.intf, scrOK: s.intf && s.scr, pf: s.pf, def: s.def, dc: s.dc });
      c.mv("def", s.defZ ? { s: 1.06 } : {});
      c.op("pk", s.intf ? 1 : 0);
      c.mv("pk", s.intf === "ok" ? { x: 228, y: 104 } : s.intf === "lost" || s.intf === "miss" ? { x: 203, y: 150 } : { x: 178, y: 104 }, { d: 1.2 });
      c.op("pX", s.intf === "miss" || s.intf === "lost" ? 1 : 0);
      const fed = s.feed != null;
      c.op("tk", fed ? 1 : 0);
      if (fed) c.mv("tk", s.res ? { x: 266, y: 182 } : { x: 203, y: 26 }, { d: 1.2, e: "power2.inOut" });
      for (let i = 0; i < 6; i++) { c.op("pkk" + i, s.peak ? 1 : 0, { dl: i * 0.08 }); c.mv("pkk" + i, s.peak ? { x: 168 + (i % 3) * 34, y: 88 + Math.floor(i / 3) * 28 } : { x: 66, y: 207 }, { d: 1, dl: i * 0.08 }); }
      c.vis({ rE: !!s.res, rO: !!s.res, oOK: s.res === "pass", oX: s.res === "fail" });
      setNote(c, "nb", s.nb); setNote(c, "nr", s.nr);
    }
  };
}

// =====================================================================
// SHOT FAMILY: EXC — the normal path, the exception branch, an owner
// who investigates the cause, return to normal or removal of needless work
// Benchmark template: "Celonis Process Explorer animation"
// (help.celonis.com) — variants branching off the happy path; plus "Git
// Workflow 1" branch-and-merge.
// =====================================================================
function F_EXC(p) {
  const f = pfx(p);
  const TP = { start: [46, 60], check: [180, 60], res: [334, 60], miss: [180, 124], owner: [150, 190], inv: [306, 190] };
  return {
    p, bench: "Celonis Process Explorer (Celonis) + Git Workflow branching (LottieFiles)",
    draw() {
      let s = "";
      s += K(p + "main", chip(46, 60, "Booking", { sz: 13, st: C.navy2, fg: C.navy2 }) + chip(180, 60, "Check agreement", { sz: 13 }) + P("M84 60 H116", C.navy, 2.4) + F("M112 55 L120 60 L112 65 Z", C.navy));
      s += f.D("aR", "M245 60 H280", C.green, 2.6);
      s += f.K("res", chip(334, 60, "Rate resolved", { sz: 13, bg: C.green, st: C.green, fg: C.white }));
      s += f.H("gr", `<g class="a-spin">${gear(116, 30, 12, C.gold, "#f3f6f9")}</g>` + T(140, 34, "Automated", 12.5, C.amber, "", "start"));
      s += f.D("aB", "M180 74 V110", C.red, 2.6);
      s += f.H("miss", chip(180, 124, "Missing information", { sz: 13, bg: "#fff4f1", st: C.red, fg: C.red }));
      s += f.D("aW", "M180 138 V160", C.navy, 2.4);
      s += f.H("own", person(180, 194, 1.2, C.navy) + T(180, 228, "Exception owner", 13, C.navy));
      s += f.H("bd", star(198, 166, 0.85));
      s += f.D("aI", "M200 190 H256", C.navy, 2.4);
      s += f.H("inv", chip(310, 190, "Investigate cause", { sz: 13, st: C.plum, fg: C.plum }) + O(370, 172, 9, "rgba(255,255,255,.3)", `stroke="${C.ink}" stroke-width="2"`) + P("M376 178 L383 185", C.ink, 3));
      s += f.D("aT", "M366 178 C392 150 392 100 360 76", C.green, 2.6);
      s += f.H("rm", chip(310, 124, "Needless approval", { sz: 13, bg: "#fbefe8", st: C.orange, fg: C.orange }));
      s += f.H("cut", P("M246 112 L376 136", C.red, 3) + O(240, 110, 6, "none", `stroke="${C.red}" stroke-width="2"`) + O(240, 124, 6, "none", `stroke="${C.red}" stroke-width="2"`));
      s += f.H("jd", chip(310, 124, "Needs judgement", { sz: 13, st: C.navy, fg: C.navy }));
      s += f.H("sw", O(84, 190, 16, C.white, `stroke="${C.orange}" stroke-width="3"`) + P("M84 178 V190 L93 195", C.orange, 2.4) + R(80, 170, 8, 5, C.orange, 1));
      s += rep(3, (i) => f.H("sq" + i, bookTok(C.orange)));
      s += f.H("pc", R(70, 172, 28, 36, C.white, 3, `stroke="${C.navy}" stroke-width="1.8"`) + R(77, 168, 14, 7, C.navy, 2) + P("M75 185 h18 M75 193 h18 M75 201 h12", C.muted, 1.6) + T(84, 228, "Procedure", 12.5, C.navy));
      s += f.H("wk", P("M150 132 Q40 150 40 230 Q40 262 120 262", C.red, 2.4, 'stroke-dasharray="5 5" class="a-flow"') + chip(178, 262, "Informal workaround", { sz: 12.5, st: C.red, fg: C.red }));
      s += f.H("tk", bookTok());
      s += rep(3, (i) => f.H("stk" + i, bookTok(C.orange)));
      s += noteSVG(f, "nb", 200, 276) + noteSVG(f, "nt", 300, 24);
      return s;
    },
    render(c, s) {
      const br = !!s.br;
      c.dr("aB", br ? 1 : 0); c.op("miss", br ? 1 : 0);
      c.dr("aW", br && s.own ? 1 : 0, { dl: 0.3 }); c.op("own", br && s.own ? 1 : 0, { dl: 0.4 });
      c.op("bd", s.bd ? 1 : 0);
      c.dr("aI", s.inv ? 1 : 0, { dl: 0.3 }); c.op("inv", s.inv ? 1 : 0, { dl: 0.5 });
      c.dr("aT", s.out === "ret" || s.out === "both" ? 1 : 0, { dl: 0.6 });
      c.op("rm", s.out === "rem" || s.rm ? 1 : 0); c.op("cut", s.out === "rem" ? 1 : 0, { dl: 0.6 });
      c.mv("rm", s.out === "rem" ? { y: 8, r: -4 } : {});
      c.op("jd", s.out === "both" ? 1 : 0);
      if (s.out === "both") { c.op("rm", 1); c.mv("rm", { y: -34 }); }
      c.dr("aR", s.normal === 0 ? 0 : 1); c.op("res", s.normal === 0 ? 0.3 : 1);
      c.vis({ gr: s.gr, sw: s.sw, pc: s.pc, wk: s.wk });
      for (let i = 0; i < 3; i++) { c.op("sq" + i, s.sq ? 1 : 0); c.mv("sq" + i, s.sq ? { x: 112, y: 162 + i * 24 } : { x: 180, y: 124 }, { d: 0.9, dl: i * 0.1 }); }
      for (let i = 0; i < 3; i++) { c.op("stk" + i, s.stk ? 1 : 0); c.mv("stk" + i, s.stk ? { x: 236 + i * 36, y: 124 } : { x: 180, y: 60 }, { d: 1, dl: i * 0.12 }); }
      const tp = s.tok && TP[s.tok];
      c.op("tk", tp ? 1 : 0);
      if (tp) c.mv("tk", { x: tp[0], y: tp[1] - 22 }, { d: 1.1, e: "power2.inOut" });
      setNote(c, "nb", s.nb); setNote(c, "nt", s.nt);
    }
  };
}

// =====================================================================
// SHOT FAMILY: ROUTES — buy, configure, extend, build as four product
// cards whose illustrations change state (Flip-style)
// Benchmark template: "Product Workflow Animation & UI Motion Design"
// (Dribbble 27577799) — shift between product states.
// =====================================================================
function F_ROUTES(p) {
  const f = pfx(p);
  const X = [52, 152, 252, 352], COL = [C.navy, C.green, C.amber, C.orange];
  const TT = [["Buy", "As supplied"], ["Configure", "Settings"], ["Extend", "Add-on"], ["Build", "Own code"]];
  const box = (x) => R(x - 28, 92, 56, 50, "#e7eef6", 5, `stroke="${C.navy}" stroke-width="2"`) + P(`M${x - 28} 104 H${x + 28}`, C.navy, 2) + R(x - 6, 92, 12, 12, C.navy, 1);
  return {
    p, bench: "Product Workflow Animation & UI Motion Design (Dribbble 27577799)",
    draw() {
      let s = "";
      X.forEach((x, j) => {
        s += f.K("cd" + j, R(x - 47, 14, 94, 180, C.white, 10, `stroke="${COL[j]}" stroke-width="2"`) + T(x, 38, TT[j][0], 14, COL[j]) + T(x, 56, TT[j][1], 12.5, C.slate));
        s += f.H("fz" + j, R(x - 51, 10, 102, 188, "none", 13, `stroke="${COL[j]}" stroke-width="4"`));
      });
      s += f.K("il0", box(52) + O(52, 152, 9, C.gold) + tick(52, 152, 0.45, C.white, 2));
      s += f.K("il1", box(152) + rep(3, (i) => R(130, 150 + i * 13, 44, 8, "#cfe3d7", 4)) + rep(3, (i) => `<g data-k="${p}t${i}">${O(134, 154 + i * 13, 5, C.green)}</g>`));
      s += f.K("il2", box(252) + P("M280 117 h6", C.amber, 3));
      s += f.H("plug", R(286, 100, 26, 34, C.gold, 5) + gear(299, 117, 9, C.amber, C.gold));
      s += f.K("il3", P("M322 178 H382", C.slate, 2) + person(338, 172, 0.8, C.navy));
      s += rep(4, (i) => f.H("bk" + i, R(346 + (i % 2) * 18, 160 - Math.floor(i / 2) * 18 - 16, 16, 16, C.orange, 2)));
      s += rep(4, (j) => f.H("mb" + j, R(X[j] - 36, 168, 72, 7, "#e3e8ee", 3) + `<g data-k="${p}mc${j}">${R(X[j] - 36, 168, 72, 7, C.navy, 3)}</g>` + R(X[j] - 36, 180, 72, 7, "#e3e8ee", 3) + `<g data-k="${p}mu${j}">${R(X[j] - 36, 180, 72, 7, C.orange, 3)}</g>`));
      s += f.H("leg", chip(150, 214, "Control", { sz: 12.5, bg: C.navy, st: C.navy, fg: C.white }) + chip(250, 214, "Upkeep", { sz: 12.5, bg: C.orange, st: C.orange, fg: C.white }));
      s += rep(4, (j) => f.H("rq" + j, f.TK("rqT" + j, X[j], 262, "", 12.5, C.navy) + P(`M${X[j]} 246 V202`, C.navy, 1.8) + F(`M${X[j] - 5} 207 L${X[j]} 199 L${X[j] + 5} 207 Z`, C.navy)));
      s += f.H("wrong", [0, 1, 2].map((j) => P(`M${X[j]} 246 Q${(X[j] + 352) / 2} 220 346 200`, C.red, 1.8, 'stroke-dasharray="4 3"')).join("") + cross(300, 222, 1.3, C.red, 3.5));
      s += f.H("fit", T(26, 228, "Needs", 12.5, C.navy, "", "start") + T(78, 228, "Has", 12.5, C.green, "", "start") + rep(3, (i) => O(34, 242 + i * 16, 4, C.navy) + P(`M40 ${242 + i * 16} H74`, C.green, 1.8) + O(80, 242 + i * 16, 4, C.green)));
      s += f.H("mt", rep(3, (i) => `<g transform="translate(${318 + i * 24} 246) rotate(45)">${R(-2.5, 0, 5, 18, C.orange, 2)}${O(0, -2, 6, "none", `stroke="${C.orange}" stroke-width="3.5"`)}</g>`));
      s += f.H("lk", R(144, 74, 16, 12, C.green, 2) + P("M147 74 v-4 a5 5 0 0 1 10 0 v4", C.green, 2));
      s += noteSVG(f, "nb", 200, 282) + noteSVG(f, "nm", 200, 236);
      return s;
    },
    render(c, s) {
      const fo = s.f == null ? -1 : s.f;
      X.forEach((x, j) => {
        const on = fo < 0 || fo === j || (s.on && s.on.indexOf(j) >= 0);
        ["cd", "il"].forEach((k) => c.op(k + j, on ? 1 : 0.28));
        c.op("fz" + j, fo === j || (s.on && s.on.indexOf(j) >= 0 && s.ring) ? 1 : 0);
        c.mv("cd" + j, fo === j ? { y: -3 } : {});
        const mb = !!s.mb;
        c.op("mb" + j, mb ? (on ? 1 : 0.3) : 0);
        const cv = [0.25, 0.45, 0.75, 1][j], uv = [0.15, 0.3, 0.75, 1][j];
        c.mv("mc" + j, { sx: mb ? cv : 0.02, pv: [x - 36, 171] }, { d: 1, dl: j * 0.1 });
        c.mv("mu" + j, { sx: mb ? uv : 0.02, pv: [x - 36, 183] }, { d: 1, dl: j * 0.1 + 0.1 });
        const rq = s.rq && s.rq[j];
        if (rq) c.tx("rqT" + j, rq);
        c.op("rq" + j, rq ? 1 : 0, { dl: j * 0.15 });
      });
      c.op("leg", s.mb ? 1 : 0);
      for (let i = 0; i < 3; i++) c.mv("t" + i, { x: s.tg ? [30, 0, 30][i] : [0, 30, 0][i] }, { d: 0.7, dl: i * 0.12 });
      c.op("plug", s.plug ? 1 : 0); c.mv("plug", s.plug ? {} : { x: 30 }, { d: 0.9, e: "back.out(1.6)" });
      for (let i = 0; i < 4; i++) { const on = i < (s.bk || 0); c.op("bk" + i, on ? 1 : 0, { dl: i * 0.15 }); c.mv("bk" + i, on ? {} : { y: -30 }, { d: 0.6, dl: i * 0.15, e: "bounce.out" }); }
      c.vis({ wrong: s.wrong, fit: s.fit, mt: s.mt, lk: s.lk });
      setNote(c, "nb", s.nb); setNote(c, "nm", s.nm);
    }
  };
}

// =====================================================================
// SHOT FAMILY: TIERS — core, supporting and management processes and the
// development route each one tends to deserve
// Benchmark template: "Animated treemap" (Observable @d3/animated-treemap)
// — areas keep identity while emphasis changes.
// =====================================================================
function F_TIERS(p) {
  const f = pfx(p);
  const TL = [["core", 14, 14, 190, 178, C.amber, "Core", "Creates customer value"], ["sup", 214, 14, 176, 84, C.slate, "Supporting", "Enables the core"], ["man", 214, 108, 176, 84, C.plum, "Management", "Steers and controls"]];
  return {
    p, bench: "Animated treemap (Observable)",
    draw() {
      let s = "";
      TL.forEach(([k, x, y, w, h, col, t1, t2]) => {
        s += f.K(k, R(x, y, w, h, col === C.amber ? "#f7ecd6" : col === C.slate ? "#e6ebf0" : "#ece6f3", 10, `stroke="${col}" stroke-width="2"`) + T(x + w / 2, y + h / 2 - 4, t1, 15, col) + T(x + w / 2, y + h / 2 + 16, t2, 12.5, C.ink));
        s += f.H(k + "H", R(x - 3, y - 3, w + 6, h + 6, "none", 12, `stroke="${col}" stroke-width="4"`));
      });
      s += f.H("star", star(109, 46, 1.3) + `<g class="a-bob">${buddy(150, 46, 10, C.navy2)}</g>`);
      s += f.H("rg", R(14, 202, 376, 32, "#e1f0e8", 8, `stroke="${C.green}" stroke-width="2"`) + T(202, 223, "Stable regulatory requirement", 13, C.green));
      s += noteSVG(f, "o0", 109, 262) + noteSVG(f, "o1", 302, 252) + noteSVG(f, "o2", 302, 284) + noteSVG(f, "o3", 202, 270);
      return s;
    },
    render(c, s) {
      const hl = s.hl || [];
      TL.forEach(([k]) => { const on = hl.length === 0 || hl.indexOf(k) >= 0; c.op(k, on ? 1 : 0.3); c.op(k + "H", hl.indexOf(k) >= 0 ? 1 : 0); c.mv(k, hl.indexOf(k) >= 0 ? { s: 1.02 } : {}); });
      c.vis({ star: s.star, rg: s.rg });
      c.mv("rg", s.rg ? {} : { y: 20 });
      const o = s.o || [];
      ["o0", "o1", "o2", "o3"].forEach((k, i) => setNote(c, k, o[i]));
    }
  };
}

// =====================================================================
// SHOT FAMILY: PHASE — the ten-phase BPM framework, Develop is phase 7
// Benchmark template: "Corporate Timeline by HenlyFx" (Motion Array
// 1939632) — reveal events one by one.
// =====================================================================
function F_PHASE(p) {
  const f = pfx(p);
  const NM = { 5: "Innovate", 6: "People", 7: "Develop", 8: "Implement" };
  const pos = (i) => [14 + ((i - 1) % 5) * 76, i <= 5 ? 34 : 118];
  return {
    p, bench: "Corporate Timeline (Motion Array)",
    draw() {
      let s = "";
      for (let i = 1; i <= 10; i++) {
        const [x, y] = pos(i);
        s += K(p + "c" + i, F(`M${x} ${y} H${x + 62} L${x + 72} ${y + 28} L${x + 62} ${y + 56} H${x} L${x + 10} ${y + 28} Z`, "#e3e9f0", `stroke="${C.slate}" stroke-width="1.5"`) + T(x + 36, y + (NM[i] ? 24 : 34), String(i), 16, C.slate) + (NM[i] ? T(x + 36, y + 44, NM[i], 12, C.ink) : ""));
        s += f.H("h" + i, F(`M${x} ${y} H${x + 62} L${x + 72} ${y + 28} L${x + 62} ${y + 56} H${x} L${x + 10} ${y + 28} Z`, i === 7 ? C.orange : C.navy2) + T(x + 36, y + (NM[i] ? 24 : 34), String(i), 16, C.white) + (NM[i] ? T(x + 36, y + 44, NM[i], 12, C.white) : ""));
        s += f.H("d" + i, O(x + 60, y + 6, 8, C.green) + tick(x + 60, y + 6, 0.45, C.white, 2));
      }
      s += f.H("sub", chip(350, 104, "How it operates", { sz: 12, st: C.navy2, fg: C.navy2 }) + chip(50, 188, "Who does what", { sz: 12, st: C.navy2, fg: C.navy2 }));
      s += f.H("arr", P("M350 92 Q300 112 172 128", C.orange, 2.2, 'class="a-flow"') + P("M84 146 H90", C.orange, 3) + F("M168 122 L178 128 L168 134 Z", C.orange));
      s += f.H("ny", chip(202, 188, "Not yet", { sz: 12.5, st: C.slate, fg: C.slate, dash: 1 }));
      s += f.H("fnd", rep(3, (i) => R(14, 204 + i * 30, 372, 24, ["#e6eef6", "#efe9f5", "#f6efe2"][i], 6) + T(200, 221 + i * 30, ["Project management", "People change management", "Leadership"][i], 13, [C.navy, C.plum, C.amber][i])));
      s += noteSVG(f, "nb", 200, 222);
      return s;
    },
    render(c, s) {
      const hl = s.hl || [];
      for (let i = 1; i <= 10; i++) {
        c.op("h" + i, hl.indexOf(i) >= 0 ? 1 : 0, { dl: hl.indexOf(i) * 0.2 });
        c.mv("h" + i, hl.indexOf(i) >= 0 ? { s: 1.04 } : {});
        c.op("d" + i, i <= (s.done || 0) ? 1 : 0, { dl: i * 0.06 });
      }
      c.vis({ sub: s.sub, arr: s.arr, ny: s.ny, fnd: s.fnd });
      setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: DASH — exception evidence and monitoring after go-live
// Benchmark template: "Animated line chart lesson" (Observable
// @d3/learn-d3-animation) + "Infographics Dashboard" (LottieFiles).
// =====================================================================
function F_DASH(p) {
  const f = pfx(p);
  return {
    p, bench: "Animated line chart (Observable) + Infographics Dashboard (LottieFiles)",
    draw() {
      let s = R(12, 12, 376, 276, C.white, 12, `stroke="${C.navy}" stroke-width="2"`) + R(12, 12, 376, 30, C.navy, 12) + R(12, 30, 376, 12, C.navy);
      s += f.TK("hd", 200, 33, "", 14, C.white);
      s += T(24, 66, "Exception volume", 13, C.navy, "", "start") + P("M28 160 H190 M28 160 V80", C.slate, 1.5);
      s += f.D("ln", "M32 140 L58 128 L84 134 L110 116 L136 122 L162 104 L186 110", C.orange, 3);
      s += T(210, 66, "Causes logged", 13, C.navy, "", "start");
      s += rep(3, (i) => T(210, 92 + i * 30, ["Agreement missing", "Booked within 24h", "Other causes"][i], 12, C.ink, "", "start") + R(210, 97 + i * 30, 160, 8, "#eef1f5", 4) + `<g data-k="${p}b${i}">${R(210, 97 + i * 30, 160, 8, [C.orange, C.red, C.slate][i], 4)}</g>`);
      s += T(24, 196, "Handling time", 13, C.navy, "", "start");
      s += P("M40 262 A50 50 0 0 1 140 262", "#e3e8ee", 12) + f.D("ga", "M40 262 A50 50 0 0 1 140 262", C.orange, 12);
      s += K(p + "nd", P("M90 262 L90 222", C.ink, 3)) + O(90, 262, 5, C.ink);
      s += f.H("al", R(196, 220, 182, 52, "#fff4f1", 10, `stroke="${C.red}" stroke-width="2" class="a-pulse"`) + T(287, 242, "Repeated workaround", 13, C.red) + T(287, 261, "Investigate why", 12.5, C.ink));
      return s;
    },
    render(c, s) {
      c.tx("hd", s.hd || "After go-live");
      c.dr("ln", s.ln ? 1 : 0, { d: 1.6 });
      const bv = [0.7, 0.55, 0.25];
      for (let i = 0; i < 3; i++) c.mv("b" + i, { sx: s.bars ? bv[i] : 0.02, pv: [210, 101 + i * 30] }, { d: 1, dl: i * 0.15 });
      c.dr("ga", s.g ? 0.72 : 0, { d: 1.2 });
      c.mv("nd", { r: s.g ? 40 : -80, pv: [90, 262] }, { d: 1.2 });
      c.op("al", s.al ? 1 : 0);
    }
  };
}

// =====================================================================
// SHOT FAMILY: CHECK — a card whose items are confirmed one by one
// Benchmark template: "Infographics Pack by ARstudio" (Motion Array
// 135055) — reveal list primitives and callouts.
// =====================================================================
function F_CHECK(p) {
  const f = pfx(p);
  return {
    p, bench: "Infographics Pack by ARstudio (Motion Array)",
    draw() {
      let s = R(40, 16, 320, 226, C.white, 12, `stroke="${C.navy}" stroke-width="2"`) + R(40, 16, 320, 34, C.navy, 12) + R(40, 36, 320, 14, C.navy);
      s += f.TK("tt", 200, 39, "", 15, C.white);
      for (let i = 0; i < 5; i++) {
        const y = 76 + i * 36;
        s += f.H("r" + i, O(72, y, 11, "#eef1f5", `stroke="${C.slate}" stroke-width="1.5"`) + f.TK("iT" + i, 94, y + 5, "", 14, C.ink, "start"));
        s += f.H("ok" + i, O(72, y, 11, C.green) + tick(72, y, 0.6, C.white, 2.2));
        s += f.H("q" + i, O(72, y, 11, C.orange) + T(72, y + 5, "?", 14, C.white));
        s += f.H("x" + i, O(72, y, 11, C.red) + cross(72, y, 0.5, C.white, 2.2));
        s += f.H("hl" + i, R(52, y - 16, 296, 32, "none", 8, `stroke="${C.gold}" stroke-width="3"`));
      }
      s += f.H("st", `<g transform="rotate(-10 312 214)">${R(262, 198, 100, 32, "rgba(255,255,255,.95)", 6, `stroke="${C.plum}" stroke-width="3"`)}${f.TK("stT", 312, 219, "", 13, C.plum)}</g>`);
      s += f.H("pres", person(26, 282, 1.05, C.plum) + person(374, 282, 1.05, C.navy) + person(352, 282, 0.9, C.navy2));
      s += noteSVG(f, "nb", 200, 270);
      return s;
    },
    render(c, s) {
      c.tx("tt", s.t || "");
      const it = s.items || [], mk = s.mk || [];
      for (let i = 0; i < 5; i++) {
        const on = i < it.length;
        if (on) c.tx("iT" + i, it[i]);
        c.op("r" + i, on ? (s.dimTo != null && i > s.dimTo ? 0.3 : 1) : 0, { dl: i * 0.12 });
        c.mv("r" + i, on ? {} : { x: -16 });
        c.op("ok" + i, on && mk[i] === "ok" ? 1 : 0, { dl: 0.3 + i * 0.15 });
        c.op("q" + i, on && mk[i] === "q" ? 1 : 0, { dl: 0.3 + i * 0.15 });
        c.op("x" + i, on && mk[i] === "x" ? 1 : 0, { dl: 0.3 + i * 0.15 });
        c.op("hl" + i, s.hl === i ? 1 : 0);
      }
      c.tx("stT", s.st || ""); c.op("st", s.st ? 1 : 0); c.mv("st", s.st ? {} : { s: 1.6 }, { d: 0.5, e: "back.out(2)" });
      c.op("pres", s.pres ? 1 : 0);
      setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: COMPARE — the same frame, two states side by side
// Benchmark template: "The Pinned Before-and-After" — The Pudding,
// Responsive Scrollytelling (pudding.cool/process/responsive-scrollytelling).
// =====================================================================
function F_COMPARE(p) {
  const f = pfx(p);
  const panel = (x, k, col) => R(x, 24, 172, 206, C.white, 12, `stroke="${col}" stroke-width="2"`) + R(x, 24, 172, 34, col, 12) + R(x, 44, 172, 14, col) +
    f.TK(k + "T", x + 86, 47, "", 13.5, C.white) + f.TK(k + "1", x + 86, 92, "", 13.5, C.ink) + f.TK(k + "2", x + 86, 114, "", 13.5, C.ink);
  const marks = (x, k) => f.H(k + "ok", O(x + 86, 172, 26, C.green) + tick(x + 86, 172, 1.4, C.white, 4)) + f.H(k + "q", O(x + 86, 172, 26, C.orange) + T(x + 86, 182, "?", 28, C.white)) + f.H(k + "x", O(x + 86, 172, 26, C.red) + cross(x + 86, 172, 1.2, C.white, 4));
  return {
    p, bench: "Pinned Before-and-After (The Pudding)",
    draw() {
      let s = "";
      s += f.K("L", panel(14, "l", C.navy) + marks(14, "l"));
      s += f.K("Rr", panel(214, "r", C.orange) + marks(214, "r"));
      s += f.K("vs", O(200, 128, 17, C.white, `stroke="${C.slate}" stroke-width="2"`) + f.TK("vsT", 200, 133, "vs", 13, C.slate));
      s += noteSVG(f, "nb", 200, 266);
      return s;
    },
    render(c, s) {
      const l = s.l || ["", ""], r = s.r || ["", ""];
      c.tx("lT", s.lt || ""); c.tx("l1", l[0]); c.tx("l2", l[1]);
      c.tx("rT", s.rt || ""); c.tx("r1", r[0]); c.tx("r2", r[1]);
      c.tx("vsT", s.vs || "vs");
      ["ok", "q", "x"].forEach((m) => { c.op("l" + m, s.lm === m ? 1 : 0, { dl: 0.3 }); c.op("r" + m, s.rm === m ? 1 : 0, { dl: 0.6 }); });
      c.op("L", s.hl === "r" ? 0.4 : 1); c.op("Rr", s.hl === "l" ? 0.4 : 1);
      c.mv("L", s.hl === "l" ? { s: 1.03 } : {}); c.mv("Rr", s.hl === "r" ? { s: 1.03 } : {});
      setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: GOV — a business rule, its named owner and the authorised
// change route; informal edits are blocked
// Benchmark template: "Hierarchy traversal animated" (Observable
// @d3/hierarchy-traversal-animated) — visit one node then the next.
// =====================================================================
function F_GOV(p) {
  const f = pfx(p);
  const SX = [70, 200, 330], STEP = ["Propose change", "Owner approves", "Update procedure"];
  return {
    p, bench: "Hierarchy traversal animated (Observable)",
    draw() {
      let s = "";
      s += K(p + "rule", R(128, 34, 144, 70, C.white, 8, `stroke="${C.plum}" stroke-width="2.2"`) + F("M146 54 L156 64 L146 74 L136 64 Z", C.plum) + T(214, 62, "Corporate-", 13, C.plum) + T(214, 79, "rate rule", 13, C.plum));
      s += f.H("ow", person(54, 82, 1.25, C.navy) + chip(54, 124, "Rule owner", { sz: 13 }) + O(84, 56, 7, "none", `stroke="${C.amber}" stroke-width="2.6"`) + P("M90 56 h10 m-4 0 v5", C.amber, 2.6));
      s += f.H("link", P("M78 74 H126", C.navy, 2, 'stroke-dasharray="4 3"'));
      s += f.H("auth", `<g transform="rotate(-10 236 98)">${R(194, 86, 84, 26, "rgba(255,255,255,.95)", 5, `stroke="${C.green}" stroke-width="2.6"`)}${T(236, 104, "Authorised", 12.5, C.green)}</g>`);
      STEP.forEach((t, i) => { s += f.H("s" + i, chip(SX[i], 184, t, { sz: 12.5, st: C.green, fg: C.green })); if (i < 2) s += f.H("sa" + i, P(`M${SX[i] + 56} 184 H${SX[i + 1] - 58}`, C.green, 2.2) + F(`M${SX[i + 1] - 62} 179 L${SX[i + 1] - 54} 184 L${SX[i + 1] - 62} 189 Z`, C.green)); });
      s += f.H("tk", O(0, 0, 8, C.gold, `stroke="${C.amber}" stroke-width="1.5"`));
      s += f.H("ie", person(346, 84, 1.1, C.slate) + P("M330 76 Q300 60 278 64", C.red, 2, 'stroke-dasharray="4 3"') + `<g transform="rotate(-40 290 62)">${R(282, 56, 26, 8, C.gold, 2)}${F("M282 56 l-7 4 7 4 Z", C.ink)}</g>`);
      s += f.H("ieX", cross(300, 66, 1.8, C.red, 4.5));
      s += f.H("unaw", O(80, 40, 10, C.orange) + T(80, 45, "?", 13, C.white));
      s += noteSVG(f, "nb", 200, 262);
      return s;
    },
    render(c, s) {
      c.vis({ ow: s.ow, link: s.ow, auth: s.auth, ie: s.ie, ieX: s.ieX, unaw: s.unaw });
      c.mv("auth", s.auth ? {} : { s: 1.6 }, { d: 0.5, e: "back.out(2)" });
      for (let i = 0; i < 3; i++) { c.op("s" + i, i < (s.rt || 0) ? 1 : 0, { dl: i * 0.3 }); if (i < 2) c.op("sa" + i, i < (s.rt || 0) - 1 ? 1 : 0, { dl: i * 0.3 + 0.2 }); }
      const t = s.tk == null ? -1 : s.tk;
      c.op("tk", t >= 0 ? 1 : 0); if (t >= 0) c.mv("tk", { x: SX[t], y: 160 }, { d: 1 });
      setNote(c, "nb", s.nb);
    }
  };
}

// =====================================================================
// SHOT FAMILY: STACK — isometric exploded capability stack: a paper
// design gains interfaces, rules, procedures, exception path, test evidence
// Benchmark template: "The Process Architectural Motion" (Behance
// 194096661) — build and revise successive layers; plus inspiration-board
// #26 "Exploded process mechanism".
// =====================================================================
function F_STACK(p) {
  const f = pfx(p);
  const cx = 122, A = 80, B = 26, TH = 9, Y = [70, 102, 132, 162, 192, 222];
  const LAY = [null,
    { lab: "Interfaces", top: "#d3e3f2", l: "#86abcf", r: "#5f8ab3", col: C.navy },
    { lab: "Business rules", top: "#e6def1", l: "#a897c3", r: "#8a77ab", col: C.plum },
    { lab: "Manual procedures", top: "#d8ece1", l: "#86ba9f", r: "#619e81", col: C.green },
    { lab: "Exception path", top: "#f7e1d6", l: "#dc9c80", r: "#c77f61", col: C.orange },
    { lab: "Test evidence", top: "#f7ecd3", l: "#dcbd80", r: "#c5a05c", col: "#8a6418" }];
  const slab = (y, t, top, l, r, st) => F(`M${cx - A} ${y} L${cx} ${y + B} L${cx} ${y + B + t} L${cx - A} ${y + t} Z`, l) + F(`M${cx} ${y + B} L${cx + A} ${y} L${cx + A} ${y + t} L${cx} ${y + B + t} Z`, r) + F(`M${cx - A} ${y} L${cx} ${y - B} L${cx + A} ${y} L${cx} ${y + B} Z`, top, st ? `stroke="${st}" stroke-width="1.2"` : "");
  const icon = (j, y) => {
    const yy = y + 2;
    if (j === 1) return R(cx - 17, yy - 4, 10, 8, C.navy, 1.5) + R(cx + 7, yy - 4, 10, 8, C.navy, 1.5) + P(`M${cx - 7} ${yy} H${cx + 7}`, C.navy, 1.8, 'class="a-flow"');
    if (j === 2) return F(`M${cx} ${yy - 8} L${cx + 9} ${yy} L${cx} ${yy + 8} L${cx - 9} ${yy} Z`, C.plum) + tick(cx, yy, 0.45, C.white, 1.8);
    if (j === 3) return R(cx - 6, yy - 8, 12, 16, C.green, 2) + P(`M${cx - 3} ${yy - 3} H${cx + 3} M${cx - 3} ${yy + 2} H${cx + 3}`, C.white, 1.3);
    if (j === 4) return P(`M${cx - 10} ${yy + 4} Q${cx} ${yy - 12} ${cx + 9} ${yy + 2}`, C.orange, 2.6);
    return O(cx, yy, 8, "#8a6418") + tick(cx, yy, 0.5, C.white, 1.8);
  };
  return {
    p, bench: "The Process Architectural Motion (Behance) + Exploded mechanism (inspiration board #26)",
    draw() {
      let s = E(cx, 268, 104, 13, "rgba(27,42,58,.12)");
      for (let j = 5; j >= 1; j--) { const L = LAY[j]; s += f.H("pl" + j, slab(Y[j], TH, L.top, L.l, L.r) + icon(j, Y[j])); }
      s += K(p + "pl0", slab(Y[0], 3, "#eaf2fb", "#a9c2da", "#8eabc7", C.navy2) + P(`M66 ${Y[0]} H178`, C.navy, 2.6) + rep(4, (i) => F(`M${58 + i * 40} ${Y[0]} l8 -5 l8 5 l-8 5 Z`, C.navy)) +
        `<g transform="rotate(-6 122 84)">${R(88, 76, 68, 17, C.paper, 4, `stroke="${C.green}" stroke-width="2"`)}${T(122, 88.5, "Approved", 12, C.green)}</g>`);
      for (let j = 1; j <= 5; j++) s += f.H("lb" + j, P(`M${cx + A + 4} ${Y[j]} H230`, LAY[j].col, 1.5, 'stroke-dasharray="2 3"') + chip(308, Y[j], LAY[j].lab, { sz: 14, st: LAY[j].col, fg: LAY[j].col }));
      s += f.H("wk", person(24, 186, 1.05, C.green));
      s += f.H("bdg", star(24, 150, 1));
      s += f.H("odd", `<g class="a-bob">${buddy(146, 206, 8, C.orange)}</g>`);
      s += f.H("wkr", P("M40 200 Q4 286 120 286 Q190 286 196 250", C.red, 2.6, 'stroke-dasharray="5 5" class="a-flow"') + chip(80, 286, "Workaround", { sz: 12.5, st: C.red, fg: C.red }));
      s += f.H("guide", R(30, 238, 70, 26, C.white, 6, `stroke="${C.green}" stroke-width="1.6"`) + T(65, 256, "Route", 12.5, C.green));
      return s;
    },
    render(c, s) {
      const n = s.on || 0;
      for (let j = 1; j <= 5; j++) {
        const on = j <= n;
        c.op("pl" + j, on ? 1 : 0); c.mv("pl" + j, on ? (j === n ? { y: 0 } : {}) : { x: -70, y: -6 }, { d: 0.9 });
        c.op("lb" + j, on ? (s.hl && s.hl !== j ? 0.35 : 1) : 0); c.mv("lb" + j, on ? (s.hl === j ? { s: 1.06 } : {}) : { x: 24 });
      }
      c.vis({ wk: s.wk, bdg: s.bdg, odd: s.odd, wkr: s.wkr, guide: s.guide });
    }
  };
}

// =====================================================================
// SHOT FAMILY: KIT — Develop packs a handover kit; the case latches and
// crosses into Implement toward 14 properties
// Benchmark template: "Creative Design Workflow Animation" (Dribbble
// 27476599) — assemble shapes and refine; plus "World map with
// logistics" (LottieFiles qA3cpn3zMy) — trace routes between hubs.
// =====================================================================
function F_KIT(p) {
  const f = pfx(p);
  const CELL = (i) => [64 + (i % 3) * 64, 134 + Math.floor(i / 3) * 48];
  const ITEMS = ["Working systems", "Business rules", "Interfaces", "Manual procedures", "Exception catalogue", "Tested handover", "Rule owners", "Change control", "Support route"];
  const icon = (i, x, y) => {
    switch (i) {
      case 0: return R(x - 13, y - 10, 26, 18, C.navy, 3) + R(x - 9, y - 6, 18, 10, "#9cc0e0", 2) + R(x - 5, y + 8, 10, 3, C.navy, 1);
      case 1: return F(`M${x} ${y - 13} L${x + 13} ${y} L${x} ${y + 13} L${x - 13} ${y} Z`, C.plum) + tick(x, y, 0.55, C.white, 2);
      case 2: return R(x - 16, y - 7, 11, 14, C.navy2, 2) + R(x + 5, y - 7, 11, 14, C.green, 2) + P(`M${x - 5} ${y} H${x + 5}`, C.ink, 2);
      case 3: return R(x - 9, y - 12, 18, 24, C.paper, 2, `stroke="${C.green}" stroke-width="2"`) + P(`M${x - 5} ${y - 4} H${x + 5} M${x - 5} ${y + 2} H${x + 5} M${x - 5} ${y + 8} H${x + 2}`, C.green, 1.6);
      case 4: return R(x - 12, y - 12, 24, 24, C.orange, 3) + R(x - 8, y - 12, 4, 24, "#e9a184") + P(`M${x - 1} ${y - 5} H${x + 8} M${x - 1} ${y + 1} H${x + 8}`, C.white, 1.6);
      case 5: return person(x - 9, y + 9, 0.6, C.navy) + person(x + 9, y + 9, 0.6, C.green) + P(`M${x - 4} ${y - 8} Q${x} ${y - 14} ${x + 4} ${y - 8}`, C.orange, 1.8);
      case 6: return O(x - 5, y, 6, "none", `stroke="${C.amber}" stroke-width="2.6"`) + P(`M${x + 1} ${y} h12 m-4 0 v5`, C.amber, 2.6);
      case 7: return R(x - 9, y - 2, 18, 13, C.red, 2) + P(`M${x - 5} ${y - 2} v-5 a5 5 0 0 1 10 0 v5`, C.red, 2.2);
      default: return O(x, y, 12, "none", `stroke="${C.orange}" stroke-width="5"`) + O(x, y, 12, "none", `stroke="${C.white}" stroke-width="5" stroke-dasharray="6 6.6"`);
    }
  };
  return {
    p, bench: "Creative Design Workflow Animation (Dribbble) + World map with logistics (LottieFiles)",
    draw() {
      let s = "";
      s += ITEMS.map((t, i) => f.H("cl" + i, R(236, 32 + i * 24, 14, 14, C.white, 3, `stroke="${C.green}" stroke-width="1.6"`) + tick(243, 39 + i * 24, 0.5, C.green, 2) + T(256, 44 + i * 24, t, 12.5, C.ink, "", "start"))).join("");
      let cs = f.K("lid", R(24, 54, 192, 50, "#4a6782", 10) + R(34, 62, 172, 34, "#5d7c99", 6) + R(100, 70, 40, 6, "#2f465c", 3));
      cs += R(24, 104, 192, 154, "#35506b", 12) + R(30, 108, 180, 146, "#e6ecf1", 8) + rep(9, (i) => { const [x, y] = CELL(i); return R(x - 28, y - 20, 56, 42, "#f6f8fa", 5, `stroke="#c9d3dc" stroke-width="1"`); });
      cs += ITEMS.map((t, i) => { const [x, y] = CELL(i); return f.H("it" + i, icon(i, x, y)); }).join("");
      cs += f.H("tested", `<g transform="rotate(-10 ${CELL(5)[0]} ${CELL(5)[1]})">${R(CELL(5)[0] - 28, CELL(5)[1] - 9, 56, 18, "rgba(255,255,255,.92)", 4, `stroke="${C.green}" stroke-width="2"`)}${T(CELL(5)[0], CELL(5)[1] + 5, "Tested", 12, C.green)}</g>`);
      cs += f.H("cover", R(24, 104, 192, 154, "#4a6782", 12) + R(36, 116, 168, 130, "#5d7c99", 8) + R(108, 98, 24, 14, C.gold, 3));
      cs += f.H("covT", T(120, 186, "Handover kit", 16, C.white));
            cs += f.H("bug", O(196, 112, 12, C.orange) + P("M186 104 l-6 -6 M206 104 l6 -6 M184 116 h-6 M208 116 h6", C.orange, 2));
      s += f.K("case", cs);
      s += f.H("vendor", R(260, 120, 64, 50, C.white, 8, `stroke="${C.navy}" stroke-width="2"`) + O(292, 145, 14, C.navy) + T(292, 150, "C", 14, C.white) + chip(300, 196, "Software alone?", { sz: 13, st: C.red, fg: C.red }) + cross(352, 132, 1.1, C.red, 3));
      s += f.H("tabs", R(236, 168, 158, 82, C.white, 8, `stroke="${C.orange}" stroke-width="2"`) + chip(276, 190, "Response", { sz: 12, st: C.orange, fg: C.orange }) + chip(352, 190, "Role", { sz: 12, st: C.orange, fg: C.orange }) + chip(314, 226, "Authority", { sz: 12, st: C.orange, fg: C.orange }));
      s += f.H("pong", R(236, 168, 158, 82, C.white, 8, `stroke="${C.red}" stroke-width="2"`) + person(262, 226, 0.9, C.navy) + person(366, 226, 0.9, C.green) + P("M278 196 Q314 176 350 196 M350 206 Q314 226 278 206", C.red, 2, 'stroke-dasharray="4 3"') + clockI(314, 236, 10, C.red));
      s += f.H("divider", P("M230 18 V290", C.slate, 2, 'stroke-dasharray="6 5"') + T(120, 26, "Develop", 15, C.navy) + T(316, 26, "Implement", 15, C.green));
      s += f.H("notyet", chip(316, 120, "Not yet deployed", { sz: 14, st: C.orange, fg: C.orange }));
      s += f.H("map", rep(14, (i) => { const x = 246 + (i % 7) * 23, y = 54 + Math.floor(i / 7) * 34; return `<g data-k="${p}pin${i}" fill="${C.green}"><path d="M${x - 8} ${y + 8} V${y - 4} L${x} ${y - 11} L${x + 8} ${y - 4} V${y + 8} Z"/>${R(x - 2.5, y + 1, 5, 7, C.white, 1)}</g>`; }) + T(316, 116, "14 properties", 14, C.green));
      s += f.H("ev", chip(316, 86, "Test evidence", { sz: 14, bg: C.gold, st: C.amber, fg: C.ink }) + chip(316, 122, "Owners named", { sz: 14, st: C.green, fg: C.green }) + P("M316 136 V148", C.slate, 2));
      s += f.H("wk12", chip(316, 150, "Week 12 next", { sz: 15, bg: C.green, st: C.green, fg: C.white }));
      return s;
    },
    render(c, s) {
      const n = s.n || 0;
      let cs = {}; if (s.moved) cs = { x: 196, y: 54, s: 0.6, pv: [120, 156] };
      c.mv("case", cs, { d: 1.2, e: "power2.inOut" });
      ITEMS.forEach((t, i) => {
        const on = i < n, [x, y] = CELL(i), fresh = on && i >= (s.from || 0);
        c.op("it" + i, on ? 1 : 0, { dl: fresh ? (i - (s.from || 0)) * 0.15 : 0 });
        c.mv("it" + i, on ? (s.zoom === i ? { s: 1.25 } : {}) : { x: 300 - x, y: 150 - y, s: 0.5 }, { d: 0.9, dl: fresh ? (i - (s.from || 0)) * 0.15 : 0, e: "back.out(1.4)" });
        c.op("cl" + i, on && s.list !== 0 ? 1 : 0, { dl: fresh ? 0.3 + (i - (s.from || 0)) * 0.15 : 0 });
      });
      c.mv("lid", { sy: s.lid === "closed" ? 0.02 : s.lid === "half" ? 0.55 : 1, pv: [120, 104] }, { d: 0.9 });
      c.op("cover", s.lid === "closed" ? 1 : 0, { dl: s.lid === "closed" ? 0.6 : 0 });
      c.op("covT", s.lid === "closed" && !s.moved && !s.ev ? 1 : 0);
      c.vis({ tested: s.tested, vendor: s.vendor, tabs: s.tabs, pong: s.pong, divider: s.divider, notyet: s.notyet, map: s.map, bug: s.bug, ev: s.ev, wk12: s.wk12 });
      for (let i = 0; i < 14; i++) c.fl("pin" + i, s.bug ? C.orange : C.green, { dl: s.bug ? i * 0.06 : 0 });
    }
  };
}

// =====================================================================
// SHOT FAMILY: FORUM — the "Automating the Exception" discussion board
// Benchmark template: "Clean Workflow Visualization with Motion Graphics"
// (Dribbble 27600376) — connect journey steps with transitions.
// =====================================================================
function F_FORUM(p) {
  const f = pfx(p);
  const ROWS = ["Unfamiliar organisation", "Configure or customise?", "Should the exception remain?", "Jeston, Chapter 19", "Post by mid-week", "Challenge two classmates", "Assessment 4 · Week 14"];
  const ic = (r, x, y) => [
    R(x - 9, y - 12, 18, 20, C.slate, 2) + R(x - 5, y - 8, 4, 4, C.white) + R(x + 1, y - 8, 4, 4, C.white) + R(x - 5, y - 1, 4, 4, C.white) + R(x + 1, y - 1, 4, 4, C.white),
    R(x - 12, y - 8, 24, 14, "#c9d6e6", 7) + O(x + 5, y - 1, 6, C.navy),
    O(x, y - 2, 10, C.orange) + T(x, y + 3, "?", 13, C.white),
    R(x - 11, y - 11, 22, 18, C.green, 2) + P(`M${x} ${y - 11} V${y + 7}`, C.white, 1.5),
    R(x - 10, y - 11, 20, 19, C.white, 2, `stroke="${C.red}" stroke-width="1.6"`) + R(x - 10, y - 11, 20, 6, C.red, 2) + O(x, y + 2, 3, C.red),
    R(x - 13, y - 11, 16, 11, C.white, 4, `stroke="${C.navy}" stroke-width="1.4"`) + R(x - 3, y - 4, 16, 11, C.white, 4, `stroke="${C.green}" stroke-width="1.4"`),
    star(x, y - 1, 1)][r];
  return {
    p, bench: "Clean Workflow Visualization with Motion Graphics (Dribbble)",
    draw() {
      let s = f.H("board", R(22, 22, 356, 238, C.white, 14, `stroke="${C.navy}" stroke-width="2"`) + R(22, 22, 356, 40, C.navy, 14) + R(22, 48, 356, 14, C.navy) + T(200, 49, "Automating the Exception", 17, C.white));
      s += ROWS.map((t, r) => f.H("fr" + r, ic(r, 52, 88 + r * 26) + T(74, 93 + r * 26, t, 14, r === 6 ? C.plum : C.ink, "", "start"))).join("");
      s += f.H("summ", [["Protect the design", C.navy], ["Develop capability", C.navy], ["Test exceptions", C.green], ["Prepare the handover", C.green]].map(([t, col], i) => chip(200, 52 + i * 56, t, { sz: 16, st: col, fg: col }) + (i < 3 ? P(`M200 ${67 + i * 56} V${93 + i * 56}`, C.slate, 2) + F(`M195 ${89 + i * 56} L200 ${96 + i * 56} L205 ${89 + i * 56} Z`, C.slate) : "")).join(""));
      return s;
    },
    render(c, s) {
      const n = s.n || 0;
      c.op("board", s.board ? 1 : 0);
      ROWS.forEach((t, r) => { c.op("fr" + r, s.board && r < n ? (r === n - 1 ? 1 : 0.55) : 0); c.mv("fr" + r, r === n - 1 ? { x: 4 } : {}); });
      c.op("summ", s.summ ? 1 : 0);
    }
  };
}

const SCENE_BG = [];
const Q4c = (a, b, c) => [1, 2, 3, 4].map((y) => ["Year " + y, a, b, c]);
const TIME3 = ["Time", "3 weeks", "6 weeks", "4 months"];
const ST_KIT = [
  { ic: "sys", l: ["Working", "systems"], col: C.navy },
  { ic: "rule", l: ["Decision", "rules"], col: C.plum },
  { ic: "proc", l: ["Staff", "procedures"], col: C.green },
  { ic: "test", l: ["Passed", "tests"], col: "#8a6418" }];
const ST_MAN = [
  { ic: "proc", l: ["Manual", "procedures"], col: C.green },
  { ic: "cat", l: ["Exception", "catalogue"], col: C.orange },
  { ic: "hand", l: ["Tested", "handovers"], col: C.navy },
  { ic: "sup", l: ["Support", "route"], col: C.plum }];

// =====================================================================
// W11O2c · The manual half of the new process (30 lines)
// Shots: HAND, CHECK, EXC, RULES, PHASE, GOV, COMPARE, PIPE, LEDGER
// =====================================================================
{
  const id = "W11O2c";
  const plan = [
    ["hand", { g: "wait", nt: { t: "People complete the service", c: "N" } }, "Employees still matter"],
    ["hand", { g: "wait", cd: "rec", miss: 1, scr: { t: "Can't evaluate agreement", c: "R" } }, "Can't be evaluated"],
    ["hand", { g: "wait", cd: "rec", miss: 1, proc: 1, scr: { t: "Flagged: unresolved", c: "O" }, nt: { t: "Needs a dependable way", c: "N" } }, "Flagged, not solved"],
    ["check", { t: "Manual procedure", items: ["Investigate the case", "Get authorised decision", "Return to normal flow"], mk: ["ok", "ok", "ok"] }, "Manual procedures"],
    ["exc", { gr: 1, br: 1, own: 1, pc: 1, out: "ret", tok: "owner", nb: { t: "Automation meets people", c: "G" } }, "Automation meets people"],
    ["rules", { fw: 1, env: "rev", tok: "out", nr: { t: "Data reaches people", c: "N" } }, "Information must flow"],
    ["rules", { lbl: 1, tok: "out" }, "Interface, then rule"],
    ["exc", { br: 1, own: 1, bd: 1, tok: "owner", nt: { t: "Authorised employee", c: "N" } }, "Authorised intervention"],
    ["exc", { br: 1, own: 1, inv: 1, out: "ret", tok: "res" }, "Investigate, then return"],
    ["hand", { imp: 1, g: "wait" }, "Without guidance"],
    ["hand", { pp: 1, cd: "mid", g: "wait", nt: { t: "Delays come back", c: "R" } }, "Delays come back"],
    ["check", { t: "Exception catalogue", items: ["Agreement unavailable", "Approval unresolved", "Booked within 24h"] }, "Exception catalogue"],
    ["check", { t: "One catalogue entry", items: ["Problem", "Responsible role", "Required authority", "Procedure"], mk: ["ok", "ok", "ok", "ok"] }, "One catalogue entry"],
    ["phase", { hl: [6, 7], done: 6, nb: { t: "Who performs and owns", c: "N" } }, "From People phase"],
    ["hand", { proc: 1, cd: "rev", acc: 1, g: "ok", nt: { t: "Followed under pressure", c: "G" } }, "Usable instructions"],
    ["gov", { ow: 1 }, "Rules need owners"],
    ["gov", { ow: 1, auth: 1, nb: { t: "Accountable for changes", c: "N" } }, "Owner authorises change"],
    ["gov", { ow: 1, auth: 1, rt: 3, tk: 2 }, "A defined change route"],
    ["gov", { ow: 1, ie: 1, unaw: 1, nb: { t: "Managers unaware", c: "R" } }, "Informal edits drift"],
    ["hand", { cd: "rev", g: "wait", nt: { t: "Cases cross departments", c: "N" } }, "Reception to revenue"],
    ["hand", { cd: "rev", acc: 1, nt: { t: "Info and ownership move", c: "G" } }, "Info and ownership"],
    ["hand", { cd: "rev", acc: 1, bdg: 1, nt: { t: "Test: info and authority", c: "P" } }, "Test the receiver"],
    ["hand", { cd: "rev", acc: 1, dec: "rec", g: "ok" }, "Decision comes back"],
    ["hand", { sup: 1, g: "wait", scr: { t: "New question", c: "O" } }, "A support route"],
    ["hand", { sup: 1, imp: 1, impX: 1 }, "Not an informal chain"],
    ["compare", { lt: "Before go-live", l: ["Arrangements", "prepared"], lm: "ok", rt: "After go-live", r: ["Guests meet", "the gaps"], rm: "x" }, "Not after go-live"],
    ["pipe", { on: 4, tok: "door", unl: 1 }, "Prepare, test, hand over"],
    ["exc", { gr: 1, br: 1, own: 1, inv: 1, out: "ret", nb: { t: "Not everything automated", c: "N" } }, "Not all automated"],
    ["exc", { gr: 1, br: 1, own: 1, bd: 1, pc: 1, inv: 1, out: "ret", tok: "res", nb: { t: "One coherent capability", c: "G" } }, "One coherent process"],
    ["ledger", { bars: 1, rows: Q4c("?", "?", "?"), nb: { t: "Next: long-term consequences", c: "N" } }, "Next: long-term"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#f1f3f7", plan,
    desc: "Reception meets a corporate booking the system cannot evaluate; manual procedures, an exception catalogue, rule owners with an authorised change route, complete reception-to-revenue handovers and a support route let people finish what automation cannot.",
    shots: { hand: F_HAND("ha_"), check: F_CHECK("ck_"), exc: F_EXC("ex_"), rules: F_RULES("ru_"), phase: F_PHASE("ph_"), gov: F_GOV("gv_"), compare: F_COMPARE("cp_"), pipe: F_PIPE("pp_", ST_MAN), ledger: F_LEDGER("lg_") }
  });
  SCENE_BG.push([id, "#f1f3f7"]);
}

// =====================================================================
// W11O3d · The cost of changing the process — and of not changing it (28)
// Shots: LEDGER, CHECK, UPGRADE, QUEUE, RULES, SPLIT, DEV, COMPARE
// =====================================================================
{
  const id = "W11O3d";
  const CFG = Q4c("", "Shifts ?", "");
  const ALL = Q4c("29% gap", "Shifts ?", "Upgrade ?");
  const plan = [
    ["ledger", { bars: 1, rows: Q4c("?", "?", "?"), nb: { t: "Consequences continue", c: "N" } }, "Consequences continue"],
    ["check", { t: "Sponsor's question", items: ["Manageable in Year 1?", "In Year 2?", "In Year 3?", "In Year 4?"], mk: ["q", "q", "q", "q"], pres: 1 }, "Manageable for 4 years?"],
    ["ledger", { bars: 1, hl: 0, rows: [["Sustain", "?", "?", "?"]], nb: { t: "Buying isn't sustaining", c: "O" } }, "Buying isn't sustaining"],
    ["upgrade", { cfg: 1, up: 1, cfg2: 1, na: { t: "AED 180,000", c: "N" }, nd: { t: "Settings carry over", c: "G" } }, "Configure: supported"],
    ["queue", { night: 1, n: 6, d: 4, st: 3, cal: 1 }, "Two night shifts"],
    ["ledger", { bars: 1, hl: 1, cols: [1], rows: CFG, unk: 1, nb: { t: "No estimate given", c: "R" } }, "No cost estimate"],
    ["ledger", { bars: 1, hl: 1, cols: [1], rows: CFG, unk: 1, leg: 1 }, "Known versus continuing"],
    ["rules", { gear: 1, tok: "out", nl: { t: "AED 540,000", c: "A" }, nt: { t: "Matches the design", c: "G" } }, "Extend: AED 540,000"],
    ["queue", { n: 4, d: 4, calX: 1, g: "ok", clk: { t: "No 47 min wait", c: "G" } }, "No wait, no shifts"],
    ["upgrade", { ext: 1, lt: 1, lk: 1 }, "A future dependency"],
    ["upgrade", { ext: 1, up: 1, ext2: 1, tk: 1 }, "Rework after upgrades"],
    ["check", { t: "Extension decision", items: ["Risk recognised", "Not proof it's wrong", "Management informed"], mk: ["ok", "ok", "ok"] }, "Recognise the risk"],
    ["ledger", { bars: 1, hl: 2, cols: [2], rows: Q4c("", "", "Upgrade ?"), unk: 1, nb: { t: "No invented costs", c: "R" } }, "Don't invent costs"],
    ["ledger", { bars: 1, hl: 0, rows: [TIME3] }, "Change: AED 95,000"],
    ["split", { sort: 1, tag: 1 }, "71% and 29%"],
    ["split", { sort: 1, tag: 1, clkO: 1, dimG: 1, nb: { t: "The wait it should remove", c: "R" } }, "They still wait"],
    ["ledger", { bars: 1, hl: 0, cols: [0], rows: Q4c("29% gap", "", ""), nb: { t: "Upgrades still supported", c: "G" } }, "An enduring compromise"],
    ["ledger", { rows: [["Outcome", "71% covered", "Manual, all", "Auto, all"]] }, "Different outcomes"],
    ["ledger", { rows: [["Outcome", "71% covered", "Manual, all", "Auto, all"], ["Burden", "Coverage gap", "Manual work", "Upgrade risk"]] }, "Three burdens"],
    ["ledger", { bars: 1, rows: ALL, unk: 1 }, "Four-year assessment"],
    ["ledger", { bars: 1, rows: ALL, unk: 1, leg: 1 }, "Known, estimated, missing"],
    ["dev", { b: 1, B: DEV_HUMAN, ch: [1, 2, 3], nr: { t: "Small steps add up", c: "R" } }, "Compromises accumulate"],
    ["dev", { b: 1, B: DEV_HUMAN, ch: [1, 2, 3], own: 1, log: ["Deviation recorded", "Owner accepts outcome"], st: "ok" }, "Recorded and approved"],
    ["upgrade", { ext: 1, rv: 1 }, "Review extensions yearly"],
    ["compare", { lt: "Benefit", l: ["No arrival", "wait"], lm: "ok", rt: "Responsibility", r: ["Upgrade", "rework"], rm: "q", nb: { t: "Still justified?", c: "P" } }, "Still worth it?"],
    ["check", { t: "Recommendation", items: ["Burden accepted", "Why it's defensible"], mk: ["ok", "ok"] }, "Name the burden"],
    ["dev", { gA: 1, b: 1, B: DEV_CONFIG, ch: [1, 2], own: 1, st: "q", log: ["Alternative needs", "explicit approval"] }, "Protect the design"],
    ["check", { t: "Final recommendation", items: ["Preferred route", "Accepted burden", "Conditions"], mk: ["q", "q", "q"], pres: 1 }, "Next: recommendation"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#efeae1", plan,
    desc: "What each option leaves Qasr to sustain: configure keeps two unpriced overnight shifts, extend keeps unsupported upgrade rework, change keeps 29 percent on the old approval path; deviations are recorded and approved, and extensions reviewed every year.",
    shots: { ledger: F_LEDGER("lg_"), check: F_CHECK("ck_"), upgrade: F_UPGRADE("up_"), queue: F_QUEUE("qu_"), rules: F_RULES("ru_"), split: F_SPLIT("sp_"), dev: F_DEV("dv_"), compare: F_COMPARE("cp_") }
  });
  SCENE_BG.push([id, "#efeae1"]);
}

// =====================================================================
// W11O3e · Defending Qasr's build decision (28 lines)
// Shots: CHECK, DEV, QUEUE, RULES, LEDGER, UPGRADE, SPLIT, CAP, KIT
// =====================================================================
{
  const id = "W11O3e";
  const plan = [
    ["check", { t: "Our recommendation", items: ["Route", "Outcome", "Trade-offs"], mk: ["q", "q", "q"], nb: { t: "Shapes arrivals for years", c: "N" } }, "Defend the choice"],
    ["check", { t: "Our recommendation", items: ["Route", "Outcome", "Trade-offs"], mk: ["q", "q", "q"], pres: 1 }, "Presenting to sponsor"],
    ["dev", { gA: 1, own: 1, nt: { t: "Still this design?", c: "P" } }, "Still the design?"],
    ["queue", { n: 5, g: "wait", min: 47, clk: { t: "47 min wait", c: "R" } }, "The 47-minute wait"],
    ["rules", { night: 1, tok: "out", nt: { t: "Settled before arrival", c: "G" } }, "Resolved before arrival"],
    ["rules", { xc: 1, tok: "dia", nt: { t: "Capability gap", c: "R" } }, "The capability gap"],
    ["ledger", { rows: [["Means", "New process", "Settings", "Add-on"]], nb: { t: "Three possible responses", c: "N" } }, "Three responses"],
    ["upgrade", { cfg: 1, tg: 1, np: { t: "AED 180,000 · 6 weeks", c: "N" }, na: { t: "No custom code", c: "G" } }, "Configure: AED 180,000"],
    ["queue", { night: 1, n: 6, d: 3, st: 3, cal: 1 }, "Two extra shifts"],
    ["queue", { night: 1, n: 6, d: 6, st: 3, min: 0, clk: { t: "Cleared by 06:00", c: "G" }, nt: { t: "Still not automatic", c: "O" } }, "Only if cleared"],
    ["dev", { b: 1, B: DEV_CONFIG, ch: [1, 2], own: 1, st: "q", log: ["Manual approval stays", "Acceptable departure?"] }, "Acceptable departure?"],
    ["rules", { gear: 1, tok: "out", nl: { t: "AED 540,000 · 4 months", c: "A" } }, "Extend: AED 540,000"],
    ["queue", { n: 4, d: 4, calX: 1, g: "ok", clk: { t: "Matches the design", c: "G" } }, "No wait, no shifts"],
    ["upgrade", { ext: 1, lt: 1, up: 1, ext2: 1 }, "Upgrade exposure"],
    ["upgrade", { ext: 1, up: 1, ext2: 1, tk: 1 }, "Cost unquantified"],
    ["ledger", { bars: 1, hl: 0, rows: [TIME3] }, "Change: AED 95,000"],
    ["split", { sort: 1 }, "71% and 29%"],
    ["split", { sort: 1, tag: 1, clkO: 1, dimG: 1, nb: { t: "Not every guest", c: "O" } }, "Not every guest"],
    ["dev", { b: 1, B: DEV_CHANGE, ch: [2, 3], own: 1, st: "q", log: ["71% covered", "29% old path"] }, "Needs business approval"],
    ["ledger", { bars: 1, rows: Q4c("?", "?", "?"), unk: 1, tot: 1 }, "Not total ownership"],
    ["ledger", { bars: 1, diff: 1, cols: [1, 2], rows: [["Years 1-4", "", "Shifts ?", "Upgrade ?"]], unk: 1 }, "AED 360,000 more"],
    ["cap", { reg: 1, flag: 1, route: "ext", nb: { t: "Same delivery team", c: "R" } }, "January deadline"],
    ["cap", { route: "ext", reg: 1, flag: 1, ov: 1, nb: { t: "Enough capacity?", c: "O" } }, "Enough capacity?"],
    ["check", { t: "Recommendation", items: ["Preferred route", "Improvement delivered", "Accepted disadvantages"], mk: ["ok", "ok", "ok"] }, "Route, gain, trade-offs"],
    ["check", { t: "Before commitment", items: ["Cost estimates", "Capacity checks", "Approvals"], mk: ["q", "q", "q"] }, "Evidence still needed"],
    ["ledger", { rows: [["Operating", "29% gap", "Night shifts", ""], ["Technical", "", "", "Upgrade risk"], ["Delivery", "", "", "4 months"]], nb: { t: "No automatic winner", c: "P" } }, "No automatic winner"],
    ["dev", { gA: 1, b: 1, B: DEV_CONFIG, ch: [1, 2], own: 1, st: "ok", log: ["Checked against design", "Sustainable for 4 years"] }, "Defend and sustain"],
    ["kit", { n: 9, list: 0 }, "Next: the handover"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#f0eef4", plan,
    desc: "The recommendation is tested against the approved design: configure's night approvals and shifts, extend's automatic rules and unsupported upgrades, change's 71 percent coverage, unpriced obligations, and the January deadline on the same team, ending in a conditional, defensible decision.",
    shots: { check: F_CHECK("ck_"), dev: F_DEV("dv_"), queue: F_QUEUE("qu_"), rules: F_RULES("ru_"), ledger: F_LEDGER("lg_"), upgrade: F_UPGRADE("up_"), split: F_SPLIT("sp_"), cap: F_CAP("ca_"), kit: F_KIT("kt_") }
  });
  SCENE_BG.push([id, "#f0eef4"]);
}

// =====================================================================
// W11O3f · From Develop to Implement — and your forum (30 lines)
// Shots: PIPE, KIT, EXC, HAND, COMPARE, FORUM
// =====================================================================
{
  const id = "W11O3f";
  const K9 = { n: 9, tested: 1 };
  const plan = [
    ["pipe", { tok: "d", nb: { t: "What operations receive", c: "N" } }, "What operations receive"],
    ["pipe", { on: 2, spon: 1, nb: { t: "Ready to move on?", c: "P" } }, "Ready to move on?"],
    ["kit", { n: 0, vendor: 1 }, "More than Vendor C"],
    ["kit", { n: 4 }, "Systems, rules, procedures"],
    ["exc", { stk: 1, tok: "res", nb: { t: "Others still unresolved", c: "R" } }, "Every arrival counts"],
    ["kit", { n: 5, from: 4 }, "An exception catalogue"],
    ["kit", { n: 5, tabs: 1 }, "Response, role, authority"],
    ["exc", { br: 1, own: 1, tok: "miss", nt: { t: "Needs clarification", c: "O" } }, "Beyond the standard route"],
    ["kit", { n: 5, pong: 1 }, "No owner means waiting"],
    ["hand", { cd: "rev", acc: 1, dec: "rec", g: "ok", nt: { t: "Who receives, what returns", c: "N" } }, "Who receives the case"],
    ["kit", Object.assign({}, K9, { n: 6, from: 5 }), "Tested, not described"],
    ["kit", Object.assign({}, K9, { n: 7, from: 6 }), "Named rule owners"],
    ["kit", Object.assign({}, K9, { n: 8, from: 7 }), "Authorised change route"],
    ["kit", Object.assign({}, K9, { n: 9, from: 8 }), "Dependable support"],
    ["compare", { lt: "Prepared", l: ["Before", "go-live"], lm: "ok", rt: "Improvised", r: ["During guest", "service"], rm: "x" }, "Prepared, not improvised"],
    ["kit", Object.assign({}, K9, { lid: "half", divider: 1, list: 0 }), "Develop versus Implement"],
    ["kit", { n: 9, lid: "closed", divider: 1, list: 0 }, "Build, test, introduce"],
    ["kit", { n: 9, lid: "closed", divider: 1, list: 0, notyet: 1 }, "Completion isn't deployment"],
    ["kit", { n: 9, lid: "closed", divider: 1, list: 0, moved: 1, ev: 1 }, "Carry the evidence"],
    ["kit", { n: 9, lid: "closed", divider: 1, list: 0, moved: 1, map: 1 }, "Week 12: 14 properties"],
    ["kit", { n: 9, lid: "closed", divider: 1, list: 0, moved: 1, map: 1, bug: 1 }, "Defects would scale"],
    ["forum", { board: 1, n: 0 }, "Automating the Exception"],
    ["forum", { board: 1, n: 1 }, "An unfamiliar organisation"],
    ["forum", { board: 1, n: 3 }, "Configure or customise?"],
    ["forum", { board: 1, n: 4 }, "Use Jeston Chapter 19"],
    ["forum", { board: 1, n: 5 }, "Post by mid-week"],
    ["forum", { board: 1, n: 6 }, "Challenge two classmates"],
    ["forum", { board: 1, n: 7 }, "Formative: Assessment 4"],
    ["forum", { summ: 1 }, "Protect, test, hand over"],
    ["kit", { n: 9, lid: "closed", list: 0, moved: 1, map: 1, wk12: 1 }, "Week 12 awaits"]
  ];
  VL_SCENES[id] = shotScene({
    id, bg: "#eef2f4", plan,
    desc: "Develop packs a handover kit — systems, rules, interfaces, procedures, an exception catalogue, a tested handover, rule owners, change control and support — closes it, carries test evidence into Implement toward fourteen properties, and introduces the Automating the Exception forum.",
    shots: { pipe: F_PIPE("pp_", ST_KIT), kit: F_KIT("kt_"), exc: F_EXC("ex_"), hand: F_HAND("ha_"), compare: F_COMPARE("cp_"), forum: F_FORUM("fo_") }
  });
  SCENE_BG.push([id, "#eef2f4"]);
}

addStyles(SCENE_BG);
})();

