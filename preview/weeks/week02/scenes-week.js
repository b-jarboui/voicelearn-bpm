// FILE w02-claude-v2-part1.js
// OPER621 Â· Week 2 Â· Drivers and Triggers for BPM â€” animated teaching scenes (v2), part 1 of 4.
// Lesson 1 Â· Why organisations finally act. Sections: W2O1a, W2O1b, W2O1c. Standalone: defines every helper it uses, registers its own
// scenes, and appends its own scoped rules to the shared <style id="vl-sc-w02">. Parts load in any order.
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }.
// Design (v2): one beat per narration moment. Each act is an original composition adapted from the
// benchmark named (with URL) in the comment above it; a new act every 3-4 moments; every moment sets an
// explicit object-level state for its own sentence, and the header chip names that sentence's claim in
// 2-4 words. Uses window.gsap when present, CSS transitions otherwise; honours prefers-reduced-motion.
(() => {
  "use strict";
  const SECS = ["W2O1a","W2O1b","W2O1c"];
  // =====================================================================
  // KIT (self-contained in this part; every helper used is defined here)
  // Stage: viewBox 0 0 400 380. Header chip y 8-44, figure area y 54-374.
  // Each act = a composition of "props"; each narration moment = one beat
  // that sets an explicit object-level state for that sentence.
  // =====================================================================
  const W = window;
  W.VL_SCENES = W.VL_SCENES || {};
  const C = {
    navy: "#1d4f7a", ink: "#17283a", orange: "#cf5427", red: "#c0392b", green: "#1f7f5c",
    gold: "#b7820f", plum: "#6a4c93", teal: "#13808a", grey: "#7b8896", pale: "#e3e9ef",
    paper: "#fbf8f2", white: "#ffffff", mint: "#e0f2e9", blush: "#fbe4da", sand: "#f7eed8",
    sky: "#e2eef8", lilac: "#eee8f7", skin: "#e8b88e", skin2: "#b97f55", hair: "#3a2a20"
  };
  // status palettes: [fill, stroke, text]
  const TONE = {
    norm: ["#ffffff", C.navy, C.ink], ok: [C.green, C.green, "#ffffff"], bad: [C.red, C.red, "#ffffff"],
    warn: [C.orange, C.orange, "#ffffff"], goal: ["#fff7e3", C.gold, "#6e4f00"], solid: [C.navy, C.navy, "#ffffff"],
    unk: ["#f1ecf8", C.plum, C.plum], off: ["#eef1f4", "#9aa6b2", "#5d6b78"], mint: [C.mint, C.green, "#125a3f"],
    blush: [C.blush, C.red, "#8a2418"], sky: [C.sky, C.navy, C.navy], plum: [C.plum, C.plum, "#ffffff"],
    gold: [C.gold, C.gold, "#ffffff"], teal: [C.teal, C.teal, "#ffffff"]
  };
  const tone = k => TONE[k] || TONE.norm;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const q = (g, s) => (g ? g.querySelector(s) : null);
  const qa = (g, s) => (g ? Array.prototype.slice.call(g.querySelectorAll(s)) : []);
  const RM = () => { try { return !!W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } };
  let INST = false;

  // ---------- SVG string builders ----------
  function T(x, y, s, o) {
    o = o || {};
    const size = o.sz || 16, lines = String(s).split("|"), lh = Math.round(size * 1.17);
    const y0 = y - (lines.length - 1) * lh / 2;
    return `<text class="v2t ${o.cls || ""}" x="${x}" y="${y0}" data-cy="${y}"${o.mw ? ` data-mw="${o.mw}"` : ""} font-size="${size}" font-weight="${o.w || 700}" fill="${o.fill || C.ink}" text-anchor="${o.a || "middle"}" dominant-baseline="central">` +
      lines.map((l, i) => `<tspan x="${x}" dy="${i ? lh : 0}">${esc(l)}</tspan>`).join("") + `</text>`;
  }
  function setLab(el, s) {
    if (!el || s == null || el._s === s) return;
    el._s = s;
    const x = el.getAttribute("x"), size = +el.getAttribute("font-size"), cy = +el.getAttribute("data-cy");
    const lines = String(s).split("|"), lh = Math.round(size * 1.17);
    el.setAttribute("y", cy - (lines.length - 1) * lh / 2);
    el.innerHTML = lines.map((l, i) => `<tspan x="${x}" dy="${i ? lh : 0}">${esc(l)}</tspan>`).join("");
  }
  function R(x, y, w, h, o) {
    o = o || {};
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx == null ? 10 : o.rx}" fill="${o.fill || "none"}"` +
      (o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 2}"` : "") + (o.dash ? ` stroke-dasharray="${o.dash}"` : "") +
      (o.op != null ? ` opacity="${o.op}"` : "") + (o.cls ? ` class="${o.cls}"` : "") + `/>`;
  }
  function CI(x, y, r, o) {
    o = o || {};
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${o.fill || "none"}"` + (o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 2}"` : "") +
      (o.dash ? ` stroke-dasharray="${o.dash}"` : "") + (o.op != null ? ` opacity="${o.op}"` : "") + (o.cls ? ` class="${o.cls}"` : "") + `/>`;
  }
  function PA(d, o) {
    o = o || {};
    return `<path d="${d}" fill="${o.fill || "none"}" stroke="${o.stroke || "none"}" stroke-width="${o.sw == null ? 3 : o.sw}" stroke-linecap="round" stroke-linejoin="round"` +
      (o.draw ? ` pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"` : "") + (o.dash ? ` stroke-dasharray="${o.dash}"` : "") +
      (o.op != null ? ` opacity="${o.op}"` : "") + (o.cls ? ` class="${o.cls}"` : "") + `/>`;
  }
  // ---------- icon set (24-unit grid) ----------
  function ico(n, x, y, s, col, det) {
    s = s || 28; col = col || C.navy;
    const S = `fill="none" stroke="${col}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"`, F = `fill="${col}"`;
    const P = {
      check: `<path d="M4 12.5l5 5L20 6" ${S.replace("2.4", "3.4")}/>`,
      x: `<path d="M6 6l12 12M18 6L6 18" ${S.replace("2.4", "3.4")}/>`,
      warn: `<path d="M12 2.5L22.5 21h-21z" ${F}/><path d="M12 9v6" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="12" cy="18" r="1.4" fill="#fff"/>`,
      clock: `<circle cx="12" cy="12" r="9.5" ${S}/><path d="M12 6.5V12l4 2.5" ${S}/>`,
      bolt: `<path d="M13.5 1.5L4 14h7l-1.5 8.5L20 9.5h-7z" ${F}/>`,
      doc: `<path d="M6 2.5h8l4.5 4.5v14.5H6z" ${S}/><path d="M9 11h7M9 15h7M9 19h5" ${S}/>`,
      person: `<circle cx="12" cy="7" r="4.2" ${F}/><path d="M3.5 22c0-5.2 3.8-8.6 8.5-8.6s8.5 3.4 8.5 8.6z" ${F}/>`,
      users: `<circle cx="8.5" cy="8" r="3.6" ${F}/><circle cx="16.5" cy="8.5" r="3" ${F} opacity=".7"/><path d="M1.5 21c0-4.4 3.1-7.2 7-7.2s7 2.8 7 7.2z" ${F}/><path d="M14 13.6c4 0 7.5 2.4 7.5 7.4h-4" ${F} opacity=".7"/>`,
      phone: `<rect x="6.5" y="1.5" width="11" height="21" rx="2.5" ${S}/><circle cx="12" cy="18.5" r="1.3" ${F}/><path d="M9.5 9l2 2 3.5-4" ${S}/>`,
      coin: `<circle cx="12" cy="12" r="10" ${F}/><circle cx="12" cy="12" r="6.5" fill="none" stroke="#fff" stroke-width="1.8"/>`,
      lock: `<rect x="4.5" y="10.5" width="15" height="11" rx="2" ${F}/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" ${S}/>`,
      unlock: `<rect x="4.5" y="10.5" width="15" height="11" rx="2" ${F}/><path d="M8 10.5V7.5a4 4 0 0 1 7.6-1.8" ${S}/>`,
      flag: `<path d="M5 22V3" ${S}/><path d="M5 3.5h13l-3 4.5 3 4.5H5z" ${F}/>`,
      eye: `<path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z" ${S}/><circle cx="12" cy="12" r="3.3" ${F}/>`,
      house: `<path d="M2.5 11.5L12 3l9.5 8.5V21h-19z" ${F}/><rect x="9.5" y="14" width="5" height="7" fill="#fff"/>`,
      gear: `<circle cx="12" cy="12" r="4" ${S}/><path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4M4.6 4.6l2.8 2.8M16.6 16.6l2.8 2.8M4.6 19.4l2.8-2.8M16.6 7.4l2.8-2.8" ${S}/>`,
      chart: `<path d="M3 21h18" ${S}/><rect x="5" y="12" width="3.5" height="8" ${F}/><rect x="10.3" y="7" width="3.5" height="13" ${F}/><rect x="15.6" y="3" width="3.5" height="17" ${F}/>`,
      down: `<path d="M3 5l6 7 4-3 8 10" ${S}/><path d="M15 19h6v-6" ${S}/>`,
      up: `<path d="M3 19l6-7 4 3 8-10" ${S}/><path d="M15 5h6v6" ${S}/>`,
      bell: `<path d="M5 17h14l-1.8-2.5V10a5.2 5.2 0 0 0-10.4 0v4.5z" ${F}/><path d="M10 20a2 2 0 0 0 4 0" ${S}/>`,
      qm: `<path d="M8.3 8.6a3.7 3.7 0 1 1 5 3.4c-1 .5-1.3 1.1-1.3 2.4" ${S.replace("2.4", "3")}/><circle cx="12" cy="18.6" r="1.7" ${F}/>`,
      q: `<circle cx="12" cy="12" r="10.5" ${F}/><path d="M9.2 9.3a2.9 2.9 0 1 1 3.9 2.7c-.8.4-1.1.9-1.1 1.8" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="17.4" r="1.4" fill="#fff"/>`,
      star: `<path d="M12 2l3 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.8 5.7 21.4l1.5-7.1L1.8 9.4 9 8.6z" ${F}/>`,
      cal: `<rect x="3" y="4.5" width="18" height="17" rx="2" ${S}/><path d="M3 9.5h18M8 2.5v4M16 2.5v4" ${S}/>`,
      chat: `<path d="M3 4.5h18v12H10l-5 4v-4H3z" ${F}/>`,
      key: `<circle cx="7.5" cy="12" r="4.5" ${S}/><path d="M12 12h10M18 12v4M21 12v3" ${S}/>`,
      db: `<ellipse cx="12" cy="5.5" rx="8" ry="3" ${S}/><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" ${S}/>`,
      seal: `<circle cx="12" cy="10" r="7.5" ${F}/><path d="M8 16l-2 6 4-2 2 3 1-6M16 16l2 6-4-2" ${F}/><path d="M8.6 10.2l2.4 2.4 4.4-4.6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`,
      mail: `<rect x="2.5" y="5" width="19" height="14" rx="2" ${F}/><path d="M3.5 6.5l8.5 6.5 8.5-6.5" fill="none" stroke="#fff" stroke-width="1.8"/>`,
      search: `<circle cx="10" cy="10" r="6.5" ${S}/><path d="M15 15l6 6" ${S.replace("2.4", "3.4")}/>`,
      bed: `<path d="M2.5 19V7M2.5 15h19v4M21.5 15v-3a3 3 0 0 0-3-3h-8v6" ${S}/><circle cx="6.5" cy="11.5" r="2" ${F}/>`,
      hotel: `<rect x="4" y="3" width="16" height="18.5" rx="1.5" ${F}/><path d="M7.5 7h2M11 7h2M14.5 7h2M7.5 11h2M11 11h2M14.5 11h2M7.5 15h2M14.5 15h2" stroke="#fff" stroke-width="1.8"/><rect x="10.5" y="16" width="3" height="5.5" fill="#fff"/>`,
      target: `<circle cx="12" cy="12" r="9.5" ${S}/><circle cx="12" cy="12" r="5" ${S}/><circle cx="12" cy="12" r="1.6" ${F}/>`,
      gavel: `<path d="M13 3l6 6M10.5 5.5l6 6M11.5 4.5l-4 4 6 6 4-4M9.5 10.5L3 17l2.5 2.5L12 13" ${S}/><path d="M13 21h8" ${S}/>`,
      shield: `<path d="M12 2.5l8 3v6c0 5-3.5 8.7-8 10-4.5-1.3-8-5-8-10v-6z" ${F}/><path d="M8.5 12l2.5 2.5 4.5-5" fill="none" stroke="#fff" stroke-width="2"/>`,
      book: `<path d="M3 5c3-1.5 6-1.5 9 0v15c-3-1.5-6-1.5-9 0zM12 5c3-1.5 6-1.5 9 0v15c-3-1.5-6-1.5-9 0z" ${S}/>`,
      loop: `<path d="M20 11a8 8 0 1 0-2.4 6" ${S}/><path d="M20 4v7h-7" ${S}/>`,
      money: `<rect x="2" y="6" width="20" height="12" rx="2" ${F}/><circle cx="12" cy="12" r="3" fill="none" stroke="#fff" stroke-width="1.8"/>`,
      plug: `<path d="M8 3v5M16 3v5M5.5 8h13v3a6.5 6.5 0 0 1-13 0zM12 17.5V22" ${S}/>`,
      link: `<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" ${S}/>`,
      pin: `<path d="M12 22s7-7.2 7-12.5A7 7 0 0 0 5 9.5C5 14.8 12 22 12 22z" ${F}/><circle cx="12" cy="9.5" r="2.6" fill="#fff"/>`,
      reply: `<path d="M10 6L4 12l6 6M4 12h10a6 6 0 0 1 6 6v1" ${S}/>`,
      handshake: `<path d="M2 11l4-4 4 2 3-2 4 1 5 3M6 7l-4 7 3 3M22 11l-4 6-3-1M9 13l3 3M11 11l4 4M13 9l4 4" ${S}/>`
    };
    const body = (P[n] || P.q);
    return `<g transform="translate(${(x - s / 2).toFixed(1)} ${(y - s / 2).toFixed(1)}) scale(${(s / 24).toFixed(4)})">${det ? body.replace(/"#fff"/g, `"${det}"`) : body}</g>`;
  }

  // ---------- motion (GSAP when present, CSS transitions otherwise) ----------
  const EASE = { back: ["back.out(1.7)", "cubic-bezier(.34,1.56,.64,1)"], soft: ["power2.inOut", "cubic-bezier(.45,0,.2,1)"], elastic: ["elastic.out(1,0.55)", "cubic-bezier(.34,1.8,.5,1)"] };
  function go(n, v) {
    if (!n) return;
    const G = W.gsap, inst = INST || RM();
    const x = v.x || 0, y = v.y || 0, r = v.r || 0, s = v.s == null ? 1 : v.s;
    const sx = v.sx == null ? s : v.sx, sy = v.sy == null ? s : v.sy, o = v.o == null ? 1 : v.o, e = EASE[v.e];
    if (G && typeof G.to === "function") {
      const p = { x, y, rotation: r, scaleX: sx, scaleY: sy, opacity: o, transformOrigin: v.to || "50% 50%", overwrite: "auto" };
      if (inst) G.set(n, p); else G.to(n, Object.assign(p, { duration: v.d || 0.7, ease: e ? e[0] : "power3.out", delay: v.dl || 0 }));
      return;
    }
    n.style.transitionDuration = inst ? "0s" : (v.d || 0.7) + "s";
    n.style.transitionDelay = inst ? "0s" : (v.dl || 0) + "s";
    n.style.transitionTimingFunction = e ? e[1] : "";
    n.style.transformOrigin = v.to || "";
    n.style.transform = `translate(${x}px,${y}px) rotate(${r}deg) scale(${sx},${sy})`;
    n.style.opacity = String(o);
  }
  function dash(n, v) { if (n) { n.style.transition = (INST || RM()) ? "none" : ""; n.style.strokeDashoffset = String(v); } }
  function paint(n, f, s, t) { if (!n) return; if (f != null) n.style.fill = f; if (s != null) n.style.stroke = s; if (t != null) n.style.strokeDasharray = t; }
  const shown = (n, on) => { if (n) n.style.display = on ? "" : "none"; };
  const reflow = n => { if (n) void n.getBoundingClientRect(); };
  function restart(n, cls) { if (!n || INST || RM()) return; n.classList.remove(cls); reflow(n); n.classList.add(cls); }

  // ---------- props ----------
  const LAB = (x, y, s, o) => T(x, y, s, Object.assign({}, o || {}, { cls: "lab " + ((o && o.cls) || "") }));
  const K = {};
  const MOODS = {
    happy: `<path class="mo mo-happy" d="M-5.5 -15.5Q0 -10 5.5 -15.5" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>`,
    ok: `<path class="mo mo-ok" d="M-4.5 -14.5H4.5" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>`,
    sad: `<path class="mo mo-sad" d="M-5.5 -12Q0 -17.5 5.5 -12" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>`,
    worry: `<g class="mo mo-worry"><path d="M-5 -13.5q2.5-2.5 5 0t5 0" fill="none" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/><path d="M-8 -27l5-2M8 -27l-5-2" stroke="${C.ink}" stroke-width="1.8" stroke-linecap="round"/></g>`,
    angry: `<g class="mo mo-angry"><path d="M-5.5 -12Q0 -17 5.5 -12" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/><path d="M-8 -29l5 2.5M8 -29l-5 2.5" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/></g>`
  };
  K.person = {
    b(p) {
      const z = p.sz || 1, col = p.col || C.navy;
      const fig = `<g class="pf"><g transform="scale(${z})">` +
        (p.bag ? `<rect x="17" y="4" width="17" height="20" rx="3" fill="${C.gold}"/><path d="M21.5 4v-4h8v4" stroke="${C.gold}" stroke-width="2.4" fill="none"/>` : "") +
        `<path d="M-18 24V7c0-10 8-15.5 18-15.5S18-3 18 7v17z" fill="${col}"/>` +
        `<circle cx="0" cy="-22" r="13" fill="${p.skin || C.skin}"/>` +
        `<path d="M-13.2 -23.5c0-9.5 6-13.8 13.2-13.8s13.2 4.3 13.2 13.8c-3.5-5.2-8-6.4-13.2-6.4s-9.7 1.2-13.2 6.4z" fill="${p.hair || C.hair}"/>` +
        `<circle cx="-4.6" cy="-20.5" r="1.9" fill="${C.ink}"/><circle cx="4.6" cy="-20.5" r="1.9" fill="${C.ink}"/>` +
        Object.keys(MOODS).map(k => MOODS[k]).join("") + `</g></g>`;
      return fig + (p.lab ? LAB(0, 26 * z + 18, p.lab, { sz: p.ls || 15, fill: p.lc || C.ink }) : "");
    },
    u(g, p, st) {
      const m = st.mood || p.mood || "ok";
      qa(g, ".mo").forEach(e => shown(e, e.classList.contains("mo-" + m)));
      const f = q(g, ".pf"); if (f) f.classList.toggle("v2bob", !!(st.walk || st.wait) && st.on);
    },
    bb: p => { const z = p.sz || 1; return [-20 * z, -37 * z, 40 * z, 62 * z]; }
  };
  K.hotel = {
    b(p) {
      const w = p.w || 150, h = p.h || 130, x0 = -w / 2, y0 = -h / 2, col = p.col || C.navy;
      let s = PA(`M${x0 - 6} ${y0 + 26}L0 ${y0}L${-x0 + 6} ${y0 + 26}Z`, { fill: col, stroke: col, sw: 2 });
      s += R(x0, y0 + 24, w, h - 24, { fill: "#ffffff", stroke: col, sw: 3, rx: 4 });
      s += R(x0 + 10, y0 + 32, w - 20, 30, { fill: col, rx: 6, cls: "v2c hsign" }) + LAB(0, y0 + 47, p.lab || "", { sz: p.ls || 14, fill: "#ffffff" });
      const top = y0 + 72, rows = Math.max(1, Math.floor((h - 72 - 34) / 26)), cols = Math.max(2, Math.floor((w - 20) / 30));
      const sp = (w - 20) / cols;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) s += R(x0 + 10 + c * sp + sp / 2 - 9, top + r * 26, 18, 16, { fill: "#cfd8e2", rx: 3, cls: "v2c hwin" });
      s += R(-12, h / 2 - 30, 24, 30, { fill: col, rx: 3 });
      return `<g class="hb">${s}</g>`;
    },
    u(g, p, st) {
      qa(g, ".hwin").forEach((e, i) => paint(e, st.lit ? (i % 3 === 1 ? "#f3d27a" : "#f7e3a6") : "#cfd8e2"));
      paint(q(g, ".hsign"), st.st === "bad" ? C.red : st.st === "ok" ? C.green : (p.col || C.navy));
      const b = q(g, ".hb"); if (b) b.classList.toggle("v2shake", !!st.shake && st.on);
    },
    bb: p => [-(p.w || 150) / 2 - 6, -(p.h || 130) / 2, (p.w || 150) + 12, p.h || 130]
  };
  function badge(x, y) {
    return `<g class="bdgg">` + CI(x, y, 13, { fill: C.green, stroke: "#ffffff", sw: 2.5, cls: "v2c bdg" }) +
      ["ok:check", "bad:x", "warn:warn", "lock:lock", "unk:qm", "open:unlock"].map(a => { const [k, ic] = a.split(":"); return `<g class="bi bi-${k}">${ico(ic, x, y, 15, "#ffffff")}</g>`; }).join("") + `</g>`;
  }
  const BADGEC = { ok: C.green, bad: C.red, warn: C.orange, lock: C.red, unk: C.plum, open: C.green };
  function setBadge(g, k) {
    const b = q(g, ".bdgg"); shown(b, !!BADGEC[k]);
    if (!BADGEC[k]) return;
    qa(g, ".bi").forEach(e => shown(e, e.classList.contains("bi-" + k)));
    paint(q(g, ".bdg"), BADGEC[k]);
  }
  K.dept = {
    b(p) {
      const w = p.w || 78, h = p.h || 66, col = p.col || C.navy;
      return R(-w / 2, -h / 2, w, h, { rx: 14, fill: "#ffffff", stroke: col, sw: 3, cls: "v2c dbox" }) + ico(p.ic || "gear", 0, 0, Math.min(w, h) * 0.56, col) +
        badge(w / 2 - 4, -h / 2 + 4) + (p.lab ? LAB(0, h / 2 + (String(p.lab).indexOf("|") >= 0 ? 24 : 16), p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { setBadge(g, st.st); paint(q(g, ".dbox"), st.st === "bad" ? C.blush : st.st === "ok" ? C.mint : "#ffffff", st.st === "bad" ? C.red : (p.col || C.navy)); },
    bb: p => [-(p.w || 78) / 2, -(p.h || 66) / 2, p.w || 78, p.h || 66]
  };
  K.db = {
    b(p) {
      const col = p.col || C.navy;
      return PA("M-26 -22V20a26 8 0 0 0 52 0V-22", { fill: "#ffffff", stroke: col, sw: 3, cls: "v2c dbb" }) +
        `<ellipse cx="0" cy="-22" rx="26" ry="8" fill="${C.sky}" stroke="${col}" stroke-width="3"/>` +
        PA("M-26 -6a26 8 0 0 0 52 0M-26 8a26 8 0 0 0 52 0", { stroke: col, sw: 2 }) +
        `<g class="dloc">${CI(24, -26, 13, { fill: C.gold, stroke: "#ffffff", sw: 2 })}${ico("house", 24, -26, 14, "#ffffff")}</g>` +
        badge(-24, -26) + (p.lab ? LAB(0, 46, p.lab, { sz: p.ls || 14 }) : "");
    },
    u(g, p, st) { shown(q(g, ".dloc"), !!st.loc); setBadge(g, st.st); paint(q(g, ".dbb"), st.st === "bad" ? C.blush : "#ffffff"); },
    bb: () => [-28, -32, 56, 64]
  };
  const HLC = { y: "#f6dd8a", r: "#f4b6a4", g: "#bfe4cf", b: "#cfe0f2" };
  K.doc = {
    b(p) {
      const w = p.w || 160, h = p.h || 200, x0 = -w / 2, y0 = -h / 2, col = p.col || C.navy, L = p.lines || [], n = L.length || p.rows || 6;
      const top = y0 + (p.title ? 50 : 16), rh = p.rh || Math.min(36, (h - (top - y0) - 10) / n);
      let s = PA(`M${x0} ${y0 + 6}a6 6 0 0 1 6 -6H${-x0 - 22}L${-x0} ${y0 + 22}V${-y0 - 6}a6 6 0 0 1 -6 6H${x0 + 6}a6 6 0 0 1 -6 -6Z`, { fill: "#ffffff", stroke: col, sw: 3 });
      s += PA(`M${-x0 - 22} ${y0}V${y0 + 22}H${-x0}`, { stroke: col, sw: 2.5 });
      if (p.title) s += R(x0 + 8, y0 + 8, w - 36, 34, { fill: col, rx: 7 }) + LAB(-14, y0 + 25, p.title, { sz: p.ts || 14, fill: "#ffffff" });
      for (let i = 0; i < n; i++) {
        const y = top + rh * i + rh / 2;
        s += `<g class="rw rw${i}">` + R(x0 + 8, y - rh / 2 + 2, w - 16, rh - 4, { fill: "transparent", rx: 5, cls: `v2c hl hl${i}` });
        s += L[i] ? T(x0 + 16, y, L[i], { a: "start", sz: p.ls || 14, cls: "row", w: 600 }) : R(x0 + 16, y - 4, (w - 40) * (i % 3 === 2 ? 0.6 : 0.9), 8, { fill: C.pale, rx: 4 });
        s += PA(`M${x0 + 10} ${y}H${-x0 - 10}`, { stroke: C.red, sw: 3, draw: 1, cls: `v2d sk sk${i}` }) + `</g>`;
      }
      (p.stamps || []).forEach((t, j) => {
        const sw = Math.max(110, t.replace("|", "").length * 9.4 + 24);
        s += `<g class="stp stp${j}" style="display:none"><g transform="translate(${p.sx || 0} ${p.sy || 0}) rotate(-10)">` + R(-sw / 2, -24, sw, 48, { fill: "rgba(255,255,255,.88)", stroke: p.stc || C.red, sw: 4, rx: 8 }) + T(0, 0, t, { sz: 17, fill: p.stc || C.red, w: 800 }) + `</g></g>`;
      });
      return s;
    },
    u(g, p, st) {
      const n = (p.lines || []).length || p.rows || 6, hl = st.hl || {}, sk = st.sk || [];
      for (let i = 0; i < n; i++) {
        paint(q(g, ".hl" + i), hl[i] ? HLC[hl[i]] : "transparent"); dash(q(g, ".sk" + i), sk.indexOf(i) >= 0 ? 0 : 1);
        const rw = q(g, ".rw" + i); if (rw) { rw.style.transition = (INST || RM()) ? "none" : "opacity .5s"; rw.style.opacity = st.rows == null || i < st.rows ? "1" : "0"; }
      }
      qa(g, ".stp").forEach((e, j) => { const on = st.stamp === j; if (on && e.style.display === "none") { shown(e, true); restart(e, "v2stampin"); } else shown(e, on); });
    },
    bb: p => [-(p.w || 160) / 2, -(p.h || 200) / 2, p.w || 160, p.h || 200]
  };
  // Rotating group with a symmetric invisible disc so CSS fill-box and GSAP 50% 50% both pivot on (0,0).
  const ROT = (cls, r, inner) => `<g class="v2m ${cls}">${CI(0, 0, r, { fill: "transparent" })}${inner}</g>`;
  K.clock = {
    b(p) {
      const r = p.r || 44, col = p.col || C.navy;
      let s = CI(0, 0, r, { fill: "#ffffff", stroke: col, sw: 5, cls: "v2c ckf" });
      s += `<circle class="v2d ckarc" cx="0" cy="0" r="${r * 0.42}" fill="none" stroke="${col}" stroke-width="${r * 0.84}" opacity=".2" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" transform="rotate(-90)"/>`;
      for (let t = 0; t < 12; t++) { const a = t * Math.PI / 6; s += PA(`M${((r - 9) * Math.sin(a)).toFixed(1)} ${(-(r - 9) * Math.cos(a)).toFixed(1)}L${((r - 3) * Math.sin(a)).toFixed(1)} ${(-(r - 3) * Math.cos(a)).toFixed(1)}`, { stroke: col, sw: t % 3 ? 2 : 3.5 }); }
      s += ROT("ckh", r - 4, PA(`M0 5V${-(r - 13)}`, { stroke: C.ink, sw: 5 }));
      s += `<g class="cks">${CI(0, 0, r - 6, { fill: "transparent" })}${PA(`M0 4V${-(r - 8)}`, { stroke: C.red, sw: 2 })}</g>` + CI(0, 0, 5, { fill: C.ink });
      return s + (p.lab ? LAB(0, r + 20, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) {
      const h = st.h || 0, c = st.st === "bad" ? C.red : st.st === "ok" ? C.green : st.st === "goal" ? C.gold : (p.col || C.navy);
      go(q(g, ".ckh"), { r: h * 360, d: 1.1, e: "soft" }); dash(q(g, ".ckarc"), 1 - clamp(h, 0, 1));
      paint(q(g, ".ckarc"), null, c); paint(q(g, ".ckf"), null, c);
      const sc = q(g, ".cks"); if (sc) { sc.classList.toggle("v2spin", !!st.run && st.on); shown(sc, !!st.run); }
    },
    bb: p => { const r = p.r || 44; return [-r, -r, 2 * r, 2 * r]; }
  };
  K.cal = {
    b(p) {
      const w = p.w || 104, h = p.h || 92, col = p.col || C.navy, x0 = -w / 2, y0 = -h / 2;
      let s = R(x0, y0, w, h, { fill: "#ffffff", stroke: col, sw: 3, rx: 10 }) + R(x0, y0, w, 24, { fill: col, rx: 10 }) + R(x0, y0 + 14, w, 10, { fill: col, rx: 0 });
      s += CI(x0 + 22, y0 + 2, 5, { fill: "#ffffff", stroke: col, sw: 2.5 }) + CI(-x0 - 22, y0 + 2, 5, { fill: "#ffffff", stroke: col, sw: 2.5 });
      const cw = (w - 20) / 5, ch = (h - 36) / 3;
      for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) s += R(x0 + 10 + c * cw + 2, y0 + 30 + r * ch + 2, cw - 4, ch - 4, { fill: C.pale, rx: 3, cls: `v2c cc cc${r * 5 + c}` });
      return s + (p.lab ? LAB(0, h / 2 + 18, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { qa(g, ".cc").forEach((e, i) => paint(e, i === (p.due == null ? 13 : p.due) && st.due ? C.red : i < (st.fill || 0) ? (p.col || C.navy) : C.pale)); },
    bb: p => [-(p.w || 104) / 2, -(p.h || 92) / 2, p.w || 104, p.h || 92]
  };
  K.days = {
    b(p) {
      const n = p.n || 21, cols = p.cols || 7, cw = p.cw || 44, gap = 6, rows = Math.ceil(n / cols), W2 = cols * cw + (cols - 1) * gap, H2 = rows * cw + (rows - 1) * gap;
      let s = "";
      for (let i = 0; i < n; i++) {
        const x = -W2 / 2 + (i % cols) * (cw + gap), y = -H2 / 2 + Math.floor(i / cols) * (cw + gap);
        s += R(x, y, cw, cw, { fill: C.pale, rx: 7, cls: `v2c dy dy${i}` });
      }
      s += `<g class="dyo">${R(-W2 / 2 - 7, -H2 / 2 - 7, W2 + 14, H2 + 14, { stroke: C.orange, sw: 4, rx: 12, dash: "10 6" })}</g>`;
      return s + (p.lab ? LAB(0, H2 / 2 + 22, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) {
      const n = p.n || 21, t0 = p.t0 || 0, t1 = p.t1 || 0;
      for (let i = 0; i < n; i++) {
        const team = i >= t0 && i < t1, show = i < (st.n == null ? n : st.n);
        paint(q(g, ".dy" + i), !show ? "transparent" : team && st.team ? C.navy : st.other && !team ? "#e9a48d" : st.all ? "#f4c9a0" : C.pale);
      }
      shown(q(g, ".dyo"), !!st.ring);
    },
    bb: p => { const cols = p.cols || 7, cw = p.cw || 44, rows = Math.ceil((p.n || 21) / cols); return [-(cols * cw + (cols - 1) * 6) / 2, -(rows * cw + (rows - 1) * 6) / 2, cols * cw + (cols - 1) * 6, rows * cw + (rows - 1) * 6]; }
  };
  K.coins = {
    b(p) {
      const n = p.n || 5; let s = "";
      for (let i = 0; i < n; i++) s += `<g class="cn cn${i}"><ellipse cx="0" cy="${-i * 7}" rx="24" ry="8" fill="${C.gold}" stroke="#8a6205" stroke-width="2"/></g>`;
      return s + (p.lab ? LAB(0, 26, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { const n = st.n == null ? (p.n || 5) : st.n; qa(g, ".cn").forEach((e, i) => { e.style.transition = "opacity .4s"; e.style.opacity = i < n ? "1" : "0"; }); },
    bb: p => [-26, -(p.n || 5) * 7 - 4, 52, (p.n || 5) * 7 + 14]
  };
  K.lock = {
    b(p) {
      const z = p.sz || 1.4;
      return `<g transform="scale(${z})"><g class="v2m shk">${PA("M-9 -3V-11a9 9 0 0 1 18 0V-3", { stroke: C.ink, sw: 4.5 })}</g>` +
        R(-14, -4, 28, 23, { fill: C.red, rx: 4, cls: "v2c lkb" }) + CI(0, 6, 3, { fill: "#ffffff" }) + `</g>` + (p.lab ? LAB(0, 23 * z + 16, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { const o = st.st === "open"; go(q(g, ".shk"), { y: o ? -7 : 0, r: o ? -18 : 0, to: "100% 100%" }); paint(q(g, ".lkb"), o ? C.green : C.red); },
    bb: p => { const z = p.sz || 1.4; return [-15 * z, -22 * z, 30 * z, 42 * z]; }
  };
  K.gate = {
    b(p) {
      const w = p.w || 160, col = p.col || C.ink;
      let s = R(-w / 2 - 8, -46, 16, 92, { fill: col, rx: 4 }) + R(w / 2 - 8, -46, 16, 92, { fill: col, rx: 4 });
      s += `<g class="v2m arm">` + R(-w / 2, -40, w, 18, { fill: "#ffffff", stroke: C.red, sw: 3, rx: 9, cls: "v2c armr" });
      for (let i = 0; i < Math.floor(w / 26); i++) s += R(-w / 2 + 8 + i * 26, -37, 12, 12, { fill: C.red, rx: 2, cls: "v2c armst" });
      s += `</g>` + `<g class="glk">${CI(0, 6, 20, { fill: C.red, cls: "v2c glkc" })}<g class="gl1">${ico("lock", 0, 6, 24, "#ffffff")}</g><g class="gl2">${ico("unlock", 0, 6, 24, "#ffffff")}</g></g>`;
      return s + (p.lab ? LAB(0, 66, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) {
      const o = st.st === "open";
      go(q(g, ".arm"), { r: o ? -72 : 0, to: "0% 50%", d: 0.9, e: o ? "back" : undefined });
      qa(g, ".armst").forEach(e => paint(e, o ? C.green : C.red)); paint(q(g, ".armr"), null, o ? C.green : C.red);
      paint(q(g, ".glkc"), o ? C.green : C.red); shown(q(g, ".gl1"), !o); shown(q(g, ".gl2"), o);
    },
    bb: p => [-(p.w || 160) / 2 - 8, -46, (p.w || 160) + 16, 92]
  };
  K.tank = {
    b(p) {
      const w = p.w || 110, h = p.h || 150, col = p.col || C.orange, x0 = -w / 2, y0 = -h / 2;
      let s = R(x0, y0, w, h, { fill: "#ffffff", stroke: C.ink, sw: 4, rx: 18 });
      s += `<rect class="v2m liq" x="${x0 + 8}" y="${y0 + 8}" width="${w - 16}" height="${h - 16}" rx="11" fill="${col}" opacity=".88"/>`;
      s += `<g class="tbub">` + [0, 1, 2].map(i => CI(x0 + 22 + i * (w - 44) / 2, h / 2 - 18, 4 + i, { fill: "#ffffff", op: 0.7, cls: `v2rise v2rise${i}` })).join("") + `</g>`;
      for (let i = 1; i < 4; i++) s += PA(`M${x0} ${y0 + i * h / 4}h12`, { stroke: C.ink, sw: 2.5 });
      s += PA(`M-26 ${y0 - 8}a26 26 0 0 1 52 0`, { stroke: C.ink, sw: 4, fill: "#ffffff" });
      s += `<g transform="translate(0 ${y0 - 8})">${ROT("ndl", 24, PA("M0 2V-21", { stroke: C.red, sw: 4 }))}${CI(0, 0, 4, { fill: C.ink })}</g>`;
      return s + (p.lab ? LAB(0, h / 2 + 20, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) {
      const lv = clamp(st.lv || 0, 0, 1);
      go(q(g, ".liq"), { sy: Math.max(0.02, lv), to: "50% 100%", d: 1.1, e: "soft" });
      go(q(g, ".ndl"), { r: -90 + lv * 180, d: 1.1, e: "elastic" });
      const b = q(g, ".tbub"); if (b) b.style.opacity = lv > 0.2 ? "1" : "0";
    },
    bb: p => [-(p.w || 110) / 2, -(p.h || 150) / 2 - 36, p.w || 110, (p.h || 150) + 36]
  };
  K.gauge = {
    b(p) {
      const r = p.r || 64, cols = [C.green, "#7aa64a", C.gold, C.orange, C.red], sw = r * 0.3;
      let s = "";
      for (let i = 0; i < 5; i++) {
        const a0 = Math.PI + i * Math.PI / 5 + 0.03, a1 = Math.PI + (i + 1) * Math.PI / 5 - 0.03;
        s += PA(`M${(r * Math.cos(a0)).toFixed(1)} ${(r * Math.sin(a0)).toFixed(1)}A${r} ${r} 0 0 1 ${(r * Math.cos(a1)).toFixed(1)} ${(r * Math.sin(a1)).toFixed(1)}`, { stroke: p.rev ? cols[4 - i] : cols[i], sw });
      }
      s += ROT("gn", r - 2, PA(`M0 6V${-(r - 10)}`, { stroke: C.ink, sw: 6 })) + CI(0, 0, 9, { fill: C.ink });
      return s + (p.lab ? LAB(0, 26, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { go(q(g, ".gn"), { r: -90 + clamp(st.lv || 0, 0, 1) * 180, d: 1.1, e: "elastic" }); },
    bb: p => { const r = p.r || 64; return [-r - 10, -r - 10, 2 * r + 20, r + 20]; }
  };
  K.bar = {
    b(p) {
      const w = p.w || 260, h = p.h || 26, x0 = -w / 2;
      return R(x0, -h / 2, w, h, { fill: C.pale, rx: h / 2 }) + `<rect class="v2m bf v2c" x="${x0}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${p.col || C.navy}"/>` +
        (p.lab ? LAB(x0, -h / 2 - 15, p.lab, { a: "start", sz: p.ls || 15 }) : "") + T(-x0, -h / 2 - 15, p.v || "", { a: "end", sz: p.ls || 15, cls: "bval", fill: p.col || C.navy });
    },
    u(g, p, st) {
      const f = q(g, ".bf"), c = st.st ? tone(st.st)[1] : (p.col || C.navy);
      go(f, { sx: Math.max(0.004, clamp((st.lv || 0) / (p.max || 1), 0, 1)), to: "0% 50%", d: 1, e: "soft" }); paint(f, c);
      const v = q(g, ".bval"); setLab(v, st.v != null ? st.v : (p.v || "")); paint(v, c);
    },
    bb: p => [-(p.w || 260) / 2, -(p.h || 26) / 2, p.w || 260, p.h || 26]
  };
  K.seg = {
    b(p) {
      const w = p.w || 360, h = p.h || 48, x0 = -w / 2, tot = p.segs.reduce((a, s) => a + s.v, 0);
      let s = R(x0, -h / 2, w, h, { fill: C.pale, rx: 8 }), cx = x0;
      p.segs.forEach((g, i) => {
        const sw = g.v / tot * w;
        s += `<rect class="v2m sg sg${i}" x="${(cx + 1).toFixed(1)}" y="${-h / 2}" width="${(sw - 2).toFixed(1)}" height="${h}" rx="7" fill="${g.col}"/>`;
        const lx = cx + sw / 2 + (g.dx || 0), ly = g.lp === "in" ? 0 : g.lp === "up" ? -h / 2 - 26 : h / 2 + 26;
        s += `<g class="sl sl${i}">` + (g.lp !== "in" ? PA(`M${(cx + sw / 2).toFixed(1)} ${g.lp === "up" ? -h / 2 - 2 : h / 2 + 2}L${lx.toFixed(1)} ${g.lp === "up" ? -h / 2 - 8 : h / 2 + 8}`, { stroke: g.col, sw: 2 }) : "") +
          T(lx, ly, g.lab, { sz: g.ls || 14, fill: g.lp === "in" ? "#ffffff" : g.col }) + `</g>`;
        g._x = cx; g._w = sw; cx += sw;
      });
      (p.brs || []).forEach(b => {
        const a = p.segs[b.from], z = p.segs[b.to], bx0 = a._x + 2, bx1 = z._x + z._w - 2, up = b.side === "up", y = up ? -h / 2 - b.off : h / 2 + b.off, d = up ? -1 : 1;
        s += `<g class="br br-${b.id}">` + PA(`M${bx0} ${y - d * 8}V${y}H${bx1}V${y - d * 8}M${(bx0 + bx1) / 2} ${y}v${d * 7}`, { stroke: b.col || C.ink, sw: 3 }) +
          T(clamp((bx0 + bx1) / 2, x0 + (b.lw || 70), -x0 - (b.lw || 70)), y + d * 22, b.lab, { sz: 15, fill: b.col || C.ink }) + `</g>`;
      });
      if (p.ghost) { const g = p.segs[p.ghost.seg]; s += `<g class="gh">` + R(g._x + 2, -h / 2 - 3, g._w * p.ghost.frac, h + 6, { fill: "rgba(255,255,255,.55)", stroke: C.ink, sw: 2.5, dash: "6 5", rx: 7 }) + `</g>`; }
      return s;
    },
    u(g, p, st) {
      const n = st.n == null ? p.segs.length : st.n, br = st.br || [];
      p.segs.forEach((s, i) => { go(q(g, ".sg" + i), { sx: i < n ? 1 : 0.005, to: "0% 50%", o: (st.dimx || []).indexOf(i) >= 0 ? 0.3 : 1, d: 0.9, e: "soft" }); const l = q(g, ".sl" + i); if (l) { l.style.transition = "opacity .5s"; l.style.opacity = i < n ? "1" : "0"; } });
      qa(g, ".br").forEach(e => { const id = e.getAttribute("class").split("br-")[1]; e.style.transition = "opacity .5s"; e.style.opacity = br.indexOf(id) >= 0 ? "1" : "0"; });
      const gh = q(g, ".gh"); if (gh) { gh.style.transition = "opacity .5s"; gh.style.opacity = st.ghost ? "1" : "0"; }
      qa(g, ".sg").forEach((e, i) => e.classList.toggle("v2pulse", st.pulse === i && st.on));
    },
    bb: p => [-(p.w || 360) / 2, -(p.h || 48) / 2, p.w || 360, p.h || 48]
  };
  function smooth(pts) {
    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], m = (a[0] + b[0]) / 2; d += ` C${m.toFixed(1)} ${a[1].toFixed(1)} ${m.toFixed(1)} ${b[1].toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`; }
    return d;
  }
  K.line = {
    b(p) {
      const w = p.w || 300, h = p.h || 160, x0 = -w / 2, y0 = -h / 2, N = p.pts.length;
      const pt = (v, i) => [x0 + 8 + i * (w - 16) / (N - 1), y0 + h - 8 - v * (h - 16)];
      p._P = p.pts.map(pt);
      let s = PA(`M${x0} ${y0}V${y0 + h}H${x0 + w}`, { stroke: "#a7b3bf", sw: 2.5 });
      if (p.xlab) s += T(0, y0 + h + 18, p.xlab, { sz: 14, fill: C.grey });
      if (p.base != null) { const by = pt(p.base, 0)[1]; s += `<g class="lbase">` + PA(`M${x0} ${by}H${x0 + w}`, { stroke: C.green, sw: 2.5, dash: "7 6" }) + T(x0 + w - 4, by - 14, p.baseLab || "Recorded baseline", { a: "end", sz: 14, fill: C.green }) + `</g>`; }
      if (p.pts2) s += PA(smooth(p.pts2.map(pt)), { stroke: C.grey, sw: 4, draw: 1, cls: "v2d ln2" }) + `<g class="l2l">${T(x0 + w - 4, pt(p.pts2[N - 1], N - 1)[1] + 18, p.lab2 || "", { a: "end", sz: 14, fill: C.grey })}</g>`;
      s += PA(smooth(p._P), { stroke: p.col || C.red, sw: 6, draw: 1, cls: "v2d ln" });
      (p.marks || []).forEach((m, j) => {
        const [px, py] = p._P[m.i], my = m.y != null ? m.y : y0 - 6, mx = clamp(px + (m.dx || 0), x0 + (m.w || 140) / 2, -x0 - (m.w || 140) / 2);
        s += `<g class="lmk lmk${j}">` + PA(`M${px} ${py - 9}L${mx} ${my + 17}`, { stroke: C.grey, sw: 1.8, dash: "4 4" }) + R(mx - (m.w || 140) / 2, my - 17, m.w || 140, 34, { fill: "#ffffff", stroke: m.col || C.navy, sw: 2.5, rx: 17 }) + T(mx, my, m.lab, { sz: 14, fill: m.col || C.navy }) + `</g>`;
      });
      s += `<g class="v2m ldot">${CI(0, 0, 9, { fill: p.col || C.red, stroke: "#ffffff", sw: 3 })}</g>`;
      return s;
    },
    u(g, p, st) {
      const dr = st.draw == null ? 1 : st.draw;
      dash(q(g, ".ln"), 1 - dr); dash(q(g, ".ln2"), 1 - (st.draw2 == null ? 0 : st.draw2));
      const l2 = q(g, ".l2l"); if (l2) l2.style.opacity = (st.draw2 || 0) > 0.95 ? "1" : "0";
      const lb = q(g, ".lbase"); if (lb) { lb.style.transition = "opacity .5s"; lb.style.opacity = st.base ? "1" : "0"; }
      qa(g, ".lmk").forEach((e, j) => { e.style.transition = "opacity .5s"; e.style.opacity = j < (st.mk || 0) ? "1" : "0"; });
      let pt = p._P[0];
      try { const ln = q(g, ".ln"), L = ln.getTotalLength(), P = ln.getPointAtLength(L * dr); pt = [P.x, P.y]; } catch (e) { pt = p._P[Math.round(dr * (p._P.length - 1))]; }
      go(q(g, ".ldot"), { x: pt[0], y: pt[1], o: dr > 0.02 ? 1 : 0, d: 1 });
    },
    bb: p => [-(p.w || 300) / 2, -(p.h || 160) / 2, p.w || 300, p.h || 160]
  };
  function tokens(d, n, kind, col, dur) {
    let s = "";
    for (let i = 0; i < n; i++) {
      const sh = kind === "coin" ? `<ellipse rx="8" ry="8" fill="${C.gold}" stroke="#8a6205" stroke-width="2"/>` : kind === "doc" ? `<rect x="-7" y="-9" width="14" height="18" rx="2" fill="#ffffff" stroke="${col}" stroke-width="2"/>` : kind === "mail" ? `<rect x="-9" y="-6" width="18" height="12" rx="2" fill="${col}"/>` : `<circle r="6" fill="${col}" stroke="#ffffff" stroke-width="2"/>`;
      s += `<g>${sh}<animateMotion dur="${dur}s" begin="${(-i * dur / n).toFixed(2)}s" repeatCount="indefinite" path="${d}"/></g>`;
    }
    return s;
  }
  K.link = {
    b(p) {
      const col = p.col || C.navy, d = p.d || `M${p.a[0]} ${p.a[1]}L${p.b[0]} ${p.b[1]}`;
      if (!p.d && !(p.a && p.b)) return "";
      let s = PA(d, { stroke: col, sw: p.sw || 4, draw: 1, cls: "v2d v2c lk" });
      let ah = p.ah;
      if (!ah && p.arrow && p.a && p.b) ah = [p.b[0], p.b[1], Math.atan2(p.b[1] - p.a[1], p.b[0] - p.a[0]) * 180 / Math.PI];
      if (ah) s += `<g class="lah" transform="translate(${ah[0]} ${ah[1]}) rotate(${ah[2]})">${PA("M-14 -9L1 0L-14 9Z", { fill: col, stroke: col, sw: 2, cls: "v2c lahp" })}</g>`;
      if (p.tok) s += `<g class="ltok">${tokens(d, p.tn || 3, p.tok, p.tc || col, p.dur || 2.4)}</g>`;
      const mid = p.mid || (p.a && p.b ? [(p.a[0] + p.b[0]) / 2, (p.a[1] + p.b[1]) / 2] : null);
      if (mid) s += `<g class="lx">${CI(mid[0], mid[1], 15, { fill: "#ffffff", stroke: C.red, sw: 3 })}${ico("x", mid[0], mid[1], 18, C.red)}</g>`;
      if (p.lab) s += LAB(p.lx || 0, p.ly || 0, p.lab, { sz: p.ls || 14, fill: col });
      return s;
    },
    u(g, p, st) {
      const dr = st.draw == null ? 1 : st.draw, c = st.st === "bad" ? C.red : st.st === "ok" ? C.green : st.st === "warn" ? C.orange : st.st === "off" ? "#a9b4bf" : (p.col || C.navy);
      const lk = q(g, ".lk"); dash(lk, 1 - dr); paint(lk, null, c, st.st === "bad" || st.brk ? "0.035 0.03" : "1");
      const ah = q(g, ".lah"); if (ah) { ah.style.transition = "opacity .3s .4s"; ah.style.opacity = dr > 0.98 ? "1" : "0"; paint(q(g, ".lahp"), c, c); }
      shown(q(g, ".ltok"), !!st.flow && st.on); shown(q(g, ".lx"), !!st.x);
    },
    bb: () => null
  };
  K.pill = {
    b(p) {
      const w = p.w || 170, h = p.h || 40, ic = p.ic ? 1 : 0;
      return `<g class="v2fit" data-pad="${ic ? 62 : 28}">` + R(-w / 2, -h / 2, w, h, { rx: p.rx == null ? Math.min(h / 2, 20) : p.rx, fill: "#ffffff", stroke: C.navy, sw: 2.5, cls: "v2c pr fitr" }) +
        (ic ? `<g class="pic">${ico(p.ic, -w / 2 + 22, 0, 22, C.navy)}</g>` : "") + LAB(ic ? 13 : 0, 0, p.lab, { sz: p.ls || 15, cls: "v2c pt fitt" }) + `</g>`;
    },
    u(g, p, st) {
      const t = tone(st.st || p.tone || "norm");
      paint(q(g, ".pr"), t[0], t[1], (st.st || p.tone) === "goal" ? "7 5" : "none"); paint(q(g, ".pt"), t[2]);
      const pc = q(g, ".pic"), key = t.join(); if (pc && pc._k !== key) { pc._k = key; pc.innerHTML = ico(p.ic, -(p.w || 170) / 2 + 22, 0, 22, t[2], t[0]); }
    },
    bb: p => [-(p.w || 170) / 2, -(p.h || 40) / 2, p.w || 170, p.h || 40]
  };
  K.card = {
    b(p) {
      const w = p.w || 170, h = p.h || 150, col = p.col || C.navy, x0 = -w / 2, y0 = -h / 2, ics = p.is || Math.min(54, h * 0.34);
      let f = R(x0, y0, w, h, { fill: "#ffffff", stroke: col, sw: 3.5, rx: 16, cls: "v2c cfr" }) + ico(p.ic || "q", 0, y0 + 14 + ics / 2, ics, col) + LAB(0, y0 + 30 + ics + (p.sub ? 6 : 14), p.lab, { sz: p.ls || 17, fill: col, mw: w - 16 });
      if (p.sub) f += T(0, h / 2 - 22, p.sub, { sz: 14, fill: C.ink, w: 600, cls: "csub", mw: w - 14 });
      let s = `<g class="v2m cf">${f}</g>`;
      if (p.back) s += `<g class="v2m cbk">` + R(x0, y0, w, h, { fill: p.bcol || col, rx: 16 }) + ico(p.bic || "check", 0, y0 + 14 + ics / 2, ics, "#ffffff") + T(0, y0 + 44 + ics, p.back, { sz: p.ls || 17, fill: "#ffffff" }) + `</g>`;
      return s;
    },
    u(g, p, st) {
      const fl = !!st.flip;
      if (p.back) { go(q(g, ".cf"), { sx: fl ? 0.01 : 1, o: fl ? 0 : 1, d: 0.35 }); go(q(g, ".cbk"), { sx: fl ? 1 : 0.01, o: fl ? 1 : 0, dl: fl ? 0.3 : 0, d: 0.4 }); }
      const t = st.st ? tone(st.st) : null; paint(q(g, ".cfr"), t ? (st.st === "bad" ? C.blush : st.st === "ok" ? C.mint : st.st === "off" ? "#f1f3f5" : "#ffffff") : "#ffffff", t ? t[1] : (p.col || C.navy));
    },
    bb: p => [-(p.w || 170) / 2, -(p.h || 150) / 2, p.w || 170, p.h || 150]
  };
  K.bubble = {
    b(p) {
      const w = p.w || 170, h = p.h || 42, t = p.tail || "b", x0 = -w / 2, y0 = -h / 2, tx = p.tx || 0, col = p.col || C.navy, fill = p.fill || "#ffffff";
      let tail = "", cover = "";
      if (t === "b") { tail = `M${tx - 9} ${h / 2 - 2}L${tx + 3} ${h / 2 + 13}L${tx + 9} ${h / 2 - 2}`; cover = R(tx - 8, h / 2 - 4, 16, 4, { fill, rx: 0 }); }
      if (t === "t") { tail = `M${tx - 9} ${y0 + 2}L${tx + 3} ${y0 - 13}L${tx + 9} ${y0 + 2}`; cover = R(tx - 8, y0, 16, 4, { fill, rx: 0 }); }
      if (t === "l") { tail = `M${x0 + 2} -8L${x0 - 13} 4L${x0 + 2} 8`; cover = R(x0, -7, 4, 14, { fill, rx: 0 }); }
      if (t === "r") { tail = `M${-x0 - 2} -8L${-x0 + 13} 4L${-x0 - 2} 8`; cover = R(-x0 - 4, -7, 4, 14, { fill, rx: 0 }); }
      return `<g class="v2fit" data-pad="26">` + (tail ? PA(tail, { fill, stroke: col, sw: 2.5 }) : "") + R(x0, y0, w, h, { fill, stroke: col, sw: 2.5, rx: 14, cls: "fitr" }) + cover + LAB(0, 0, p.lab, { sz: p.ls || 15, fill: p.tc || col, cls: "fitt" }) + `</g>`;
    },
    bb: p => [-(p.w || 170) / 2, -(p.h || 42) / 2, p.w || 170, p.h || 42]
  };
  K.stamp = {
    hs: 1.7,
    b(p) {
      const w = p.w || Math.max(120, p.lab.replace("|", " ").length * 10 + 26), h = p.h || (p.lab.indexOf("|") >= 0 ? 62 : 46), col = p.col || C.red;
      return `<g transform="rotate(${p.r == null ? -8 : p.r})"><g class="v2fit" data-pad="30">` + R(-w / 2, -h / 2, w, h, { fill: "rgba(255,255,255,.9)", stroke: col, sw: 4.5, rx: 9, cls: "fitr" }) + LAB(0, 0, p.lab, { sz: p.ls || 18, fill: col, w: 800, cls: "fitt" }) + `</g></g>`;
    },
    bb: p => { const w = p.w || Math.max(120, p.lab.length * 10 + 26); return [-w / 2, -26, w, 52]; }
  };
  K.bolt = {
    hs: 2.2,
    b(p) { const z = (p.sz || 70) / 24; return `<g class="bf2"><g transform="scale(${z.toFixed(3)}) translate(-12 -12)"><path d="M13.5 1.5L4 14h7l-1.5 8.5L20 9.5h-7z" fill="${p.col || C.gold}" stroke="${C.ink}" stroke-width="1.2" stroke-linejoin="round"/></g></g>` + (p.lab ? LAB(0, (p.sz || 70) / 2 + 18, p.lab, { sz: p.ls || 15, fill: C.orange }) : ""); },
    u(g, p, st) { const b = q(g, ".bf2"); if (b) b.classList.toggle("v2flash", !!st.on); },
    bb: p => { const s = p.sz || 70; return [-s / 2, -s / 2, s, s]; }
  };
  K.icon = {
    b(p) { const s = p.sz || 40; return (p.disc ? CI(0, 0, s * 0.72, { fill: p.disc, cls: "v2c idisc" }) : "") + `<g class="ig">${ico(p.ic, 0, 0, s, p.col || C.navy)}</g>` + (p.lab ? LAB(0, s * (p.disc ? 0.72 : 0.5) + 18, p.lab, { sz: p.ls || 15, fill: p.lc || C.ink }) : ""); },
    u(g, p, st) { const ig = q(g, ".ig"); if (ig) ig.classList.toggle(p.idle || "x", !!st.on && !!p.idle); },
    bb: p => { const s = (p.sz || 40) * (p.disc ? 1.44 : 1); return [-s / 2, -s / 2, s, s]; }
  };
  K.text = {
    b(p) { return LAB(0, 0, p.lab, { sz: p.sz || 24, fill: p.col || C.navy, w: 800 }); },
    bb: () => null
  };
  K.bracket = {
    b(p) {
      const w = p.w || 200, up = p.side === "up", d = up ? -1 : 1, col = p.col || C.ink;
      return PA(`M${-w / 2} ${-d * 8}V0H${w / 2}V${-d * 8}M0 0v${d * 8}`, { stroke: col, sw: 3 }) + LAB(0, d * 26, p.lab, { sz: p.ls || 15, fill: col });
    },
    bb: () => null
  };
  K.panel = {
    b(p) {
      const w = p.w || 120, h = p.h || 200, col = p.col || C.navy;
      return R(-w / 2, -h / 2, w, h, { fill: p.fill || "#f1f5f9", stroke: p.stroke || "none", sw: 2.5, rx: p.rx == null ? 16 : p.rx, dash: p.dash, cls: "v2c pbg" }) +
        (p.lab ? R(-w / 2 + 8, -h / 2 + 8, w - 16, p.th || (String(p.lab).indexOf("|") >= 0 ? 40 : 30), { fill: col, rx: 10 }) + LAB(0, -h / 2 + 8 + (p.th || (String(p.lab).indexOf("|") >= 0 ? 40 : 30)) / 2, p.lab, { sz: p.ls || 14, fill: "#ffffff" }) : "");
    },
    u(g, p, st) { if (st.st) { const t = tone(st.st); paint(q(g, ".pbg"), st.st === "ok" ? C.mint : st.st === "bad" ? C.blush : st.st === "goal" ? "#fff7e3" : (p.fill || "#f1f5f9"), t[1]); } },
    bb: () => null
  };
  K.screen = {
    b(p) {
      const w = p.w || 250, h = p.h || 170;
      return R(-w / 2, -h / 2, w, h, { fill: "#ffffff", stroke: C.ink, sw: 4, rx: 12 }) + R(-w / 2, -h / 2, w, 30, { fill: C.ink, rx: 12 }) + R(-w / 2, -h / 2 + 18, w, 12, { fill: C.ink, rx: 0 }) +
        CI(-w / 2 + 16, -h / 2 + 15, 4, { fill: C.red }) + CI(-w / 2 + 30, -h / 2 + 15, 4, { fill: C.gold }) + LAB(10, -h / 2 + 15, p.lab || "", { sz: 14, fill: "#ffffff" }) +
        PA(`M-18 ${h / 2}l-8 18h52l-8-18`, { fill: C.ink, stroke: C.ink, sw: 2 });
    },
    bb: p => [-(p.w || 250) / 2, -(p.h || 170) / 2, p.w || 250, (p.h || 170) + 18]
  };
  K.tile = {
    b(p) {
      const w = p.w || 170, h = p.h || 112;
      return R(-w / 2, -h / 2, w, h, { fill: "#ffffff", stroke: C.green, sw: 3, rx: 14, cls: "v2c tbx" }) + LAB(-w / 2 + 12, -h / 2 + 20, p.lab, { a: "start", sz: p.ls || 14, mw: w - 50 }) +
        `<g class="tic">${badge(w / 2 - 18, -h / 2 + 20)}</g>` + T(0, 12, p.v || "", { sz: p.vs || 25, w: 800, cls: "tval", fill: C.green, mw: w - 16 }) + (p.unit ? T(0, h / 2 - 16, p.unit, { sz: 13, fill: C.grey, cls: "tun" }) : "");
    },
    u(g, p, st) {
      const k = st.st || p.tone || "ok", c = BADGEC[k] || C.navy;
      paint(q(g, ".tbx"), k === "bad" ? C.blush : k === "ok" ? "#f3fbf7" : "#ffffff", c); paint(q(g, ".tval"), c); setBadge(g, k);
      setLab(q(g, ".tval"), st.v != null ? st.v : (p.v || ""));
    },
    bb: p => [-(p.w || 170) / 2, -(p.h || 112) / 2, p.w || 170, p.h || 112]
  };
  K.badge = {
    b(p) { return badge(0, 0) + (p.lab ? LAB(0, 28, p.lab, { sz: p.ls || 14 }) : ""); },
    u(g, p, st) { setBadge(g, st.st || p.tone || "ok"); const b = q(g, ".bdgg"); if (b) b.setAttribute("transform", `scale(${(p.sz || 1.6)})`); },
    bb: () => [-14, -14, 28, 28]
  };
  K.desk = {
    b(p) {
      const col = p.col || C.navy;
      return PA("M-70 -10H70L60 34H-60Z", { fill: col, stroke: col, sw: 2 }) + R(-78, -22, 156, 14, { fill: C.ink, rx: 5 }) + ico("bell", 40, -34, 24, C.gold) + T(-14, 12, p.lab || "Reception desk", { sz: 14, fill: "#ffffff", cls: "lab" });
    },
    bb: () => [-78, -46, 156, 80]
  };
  K.crack = {
    b(p) { return PA(p.d || "M-30 -30l12 14-8 10 14 12-6 14 12 10", { stroke: C.red, sw: 4, draw: 1, cls: "v2d ckp" }); },
    u(g, p, st) { dash(q(g, ".ckp"), st.on ? 0 : 1); },
    bb: () => null
  };
  K.table = {
    b(p) {
      let s = `<ellipse cx="0" cy="8" rx="${p.rx || 120}" ry="30" fill="${C.navy}" stroke="${C.ink}" stroke-width="3"/>` + T(0, 8, p.lab || "Qasr board", { sz: 15, fill: "#ffffff", cls: "lab" });
      const seats = [[-92, -26], [-46, -36], [0, -40], [46, -36], [92, -26]];
      seats.forEach(([x, y], i) => {
        s += `<g class="seat">` + PA(`M${x - 15} ${y + 22}c0-11 6-16 15-16s15 5 15 16z`, { fill: [C.plum, C.teal, C.navy, C.gold, C.green][i] }) + CI(x, y - 2, 10, { fill: i % 2 ? C.skin2 : C.skin }) + `</g>`;
        s += `<g class="vt vt${i}">${CI(x, y - 30, 11, { fill: C.green, cls: "v2c vtc" })}<g class="vy">${ico("check", x, y - 30, 14, "#fff")}</g><g class="vn">${ico("x", x, y - 30, 14, "#fff")}</g><g class="vq">${ico("q", x, y - 30, 22, C.plum)}</g></g>`;
      });
      return s;
    },
    u(g, p, st) {
      const v = st.vote || "none";
      qa(g, ".vt").forEach(e => { shown(e, v !== "none"); shown(q(e, ".vy"), v === "yes"); shown(q(e, ".vn"), v === "no"); shown(q(e, ".vq"), v === "wait"); paint(q(e, ".vtc"), v === "yes" ? C.green : v === "no" ? C.red : "transparent"); });
    },
    bb: p => [-(p.rx || 120), -50, 2 * (p.rx || 120), 90]
  };
  K.grid14 = {
    b(p) {
      const P = [], dy = p.dy || 62; for (let r = 0; r < 2; r++) for (let c = 0; c < 7; c++) P.push([-156 + c * 52, r ? dy : -dy]);
      p._P = P;
      let s = "";
      P.forEach(([x, y], i) => {
        s += PA(`M0 0L${x} ${y}`, { stroke: C.navy, sw: 2.5, draw: 1, cls: `v2d gl gl${i}` });
        s += `<g class="gm gm${i}">` + PA(`M${x} ${y}L${x + 20} ${y + (y < 0 ? -26 : 26)}`, { stroke: C.orange, sw: 2.5 }) + R(x + 12, y + (y < 0 ? -40 : 18), 16, 16, { fill: C.orange, rx: 3 }) + `</g>`;
      });
      s += `<g class="hub">${CI(0, 0, 36, { fill: C.navy, stroke: "#ffffff", sw: 3 })}${T(0, 0, p.hub || "Group|owner", { sz: 13, fill: "#ffffff", cls: "lab" })}</g>`;
      P.forEach(([x, y], i) => {
        s += `<g class="ht ht${i}"><g class="hti">` + ico("hotel", x, y, 34, C.navy) + `</g>` + `<g class="hch">${CI(x + 15, y - 17, 7, { fill: C.orange, stroke: "#fff", sw: 2 })}</g>` +
          `<g class="hx">${ico("x", x, y, 30, C.red)}</g><g class="hs">${CI(x, y, 24, { stroke: C.gold, sw: 3.5 })}</g></g>`;
      });
      return s;
    },
    u(g, p, st) {
      const DR = [C.navy, C.gold, C.plum, C.orange, C.teal];
      p._P.forEach((xy, i) => {
        const ht = q(g, ".ht" + i), hi = q(ht, ".hti");
        qa(hi, "[fill]").forEach(e => { if (e.getAttribute("fill") !== "#fff") e.setAttribute("fill", st.std ? C.green : st.drift ? DR[(i * 3) % 5] : C.navy); });
        go(hi, { r: st.drift && !st.std ? ((i * 37) % 21) - 10 : 0, d: 0.8 });
        shown(q(ht, ".hch"), !!st.champ); shown(q(ht, ".hx"), !!st.fail && i !== st.pilot); shown(q(ht, ".hs"), st.pilot === i);
        const l = q(g, ".gl" + i); dash(l, st.links ? 0 : 1); paint(l, null, st.gm ? C.red : st.std ? C.green : C.navy, st.gm ? "0.06 0.05" : "1");
        shown(q(g, ".gm" + i), !!st.gm);
      });
      shown(q(g, ".hub"), !!st.hub);
    },
    bb: p => [-180, -(p.dy || 62) - 22, 360, 2 * (p.dy || 62) + 44]
  };

  // ---------- generic prop update ----------
  function upd(el, p, st) {
    const k = K[p.k], pm = q(el, ".pm"), prev = el._st || { on: 0 }, on = !!st.on, was = !!prev.on;
    const tx = (st.x == null ? p.x : st.x) - p.x, ty = (st.y == null ? p.y : st.y) - p.y;
    const tgt = { o: on ? (st.dim ? 0.28 : (st.o == null ? 1 : st.o)) : 0, x: tx, y: ty, r: st.r || 0, s: on ? (st.s == null ? 1 : st.s) * (st.hot ? 1.045 : 1) : (k.hs || 0.82), d: st.d };
    if (on && !was && !INST && !RM()) {
      const keep = INST; INST = true; go(pm, { o: 0, x: tx, y: ty + (k.hs ? 0 : 12), r: tgt.r, s: k.hs || 0.82 }); INST = keep; reflow(pm);
      tgt.e = k.hs ? "back" : "back"; tgt.d = st.d || (k.hs ? 0.55 : 0.75);
    } else if (!on && was) { tgt.d = 0.35; }
    go(pm, tgt);
    const h = q(el, ".v2halo"); if (h) shown(h, on && !!st.hot);
    if (st.lab != null && q(el, ".lab") && q(el, ".lab")._s !== st.lab) { setLab(q(el, ".lab"), st.lab); const fg = q(el, ".v2fit"); if (fg) fitOne(fg); }
    if (k.u) k.u(el, p, st, prev);
    el._st = st;
  }

  // Widen pill / bubble / stamp frames when the host font renders a label wider than designed.
  // Host-font safety: frames grow to fit their label but never past the stage; if there is no room,
  // the label shrinks instead. Free labels that would cross the stage edge also shrink to fit.
  const baseX = el => { const p = el && el.closest ? el.closest(".v2p") : null, m = p ? /translate\(([-\d.]+)/.exec(p.getAttribute("transform") || "") : null; return m ? +m[1] : 200; };
  const textW = t => { let w = 0; try { qa(t, "tspan").forEach(sp => { w = Math.max(w, sp.getComputedTextLength()); }); } catch (e) { w = 0; } return w; };
  function shrink(t, f) { const s0 = +(t.getAttribute("data-fs0") || t.getAttribute("font-size")); t.setAttribute("data-fs0", s0); t.setAttribute("font-size", Math.max(11, Math.floor(s0 * f * 10) / 10)); }
  function fitAll(root) {
    qa(root, ".v2fit").forEach(fitOne);
    qa(root, ".v2p").forEach(p => {
      const px = baseX(p);
      qa(p, "text.v2t").forEach(t => {
        if (t.closest(".v2fit")) return;
        let bb = null; try { bb = t.getBBox(); } catch (e) { bb = null; }
        if (!bb || !bb.width) return;
        const mw = +(t.getAttribute("data-mw") || 0);
        if (mw && bb.width > mw) { shrink(t, mw / bb.width); try { bb = t.getBBox(); } catch (e) { return; } }
        const pmx = px + bb.x, pmr = px + bb.x + bb.width;
        if (pmx >= 9 && pmr <= 391) return;
        const a = t.getAttribute("text-anchor"), tx = px + (+t.getAttribute("x") || 0);
        const room = a === "start" ? 391 - tx : a === "end" ? tx - 9 : 2 * Math.min(tx - 9, 391 - tx);
        if (room > 20) shrink(t, room / bb.width);
      });
    });
  }
  function fitOne(g) {
    const r = q(g, ".fitr"), t = q(g, ".fitt"); if (!r || !t) return;
    if (t.getAttribute("data-fs0")) t.setAttribute("font-size", t.getAttribute("data-fs0"));
    const w = textW(t);
    if (r._w0 == null) { r._w0 = +r.getAttribute("width"); r._x0 = +r.getAttribute("x"); }
    const pad = +(g.getAttribute("data-pad") || 26), rw = r._w0, px = baseX(g), cx = r._x0 + rw / 2;
    const maxW = Math.max(rw, 2 * Math.min(px + cx - 9, 391 - px - cx));
    let nw = rw;
    if (w && w + pad > rw) { nw = Math.min(Math.ceil(w + pad), maxW); if (w + pad > nw) shrink(t, (nw - pad) / w); }
    const dx = (nw - rw) / 2;
    r.setAttribute("x", r._x0 - dx); r.setAttribute("width", nw);
    const ic = q(g, ".pic"); if (ic) ic.setAttribute("transform", `translate(${-dx} 0)`);
  }
  // ---------- scene engine ----------
  // A(bench, props, beats): one act = one visual, adapted from the named benchmark.
  const A = (bench, props, beats) => ({ bench, props, beats });
  const P = (id, k, x, y, o) => Object.assign({ id, k, x, y }, o || {});
  const L = (id, a, b, o) => Object.assign({ id, k: "link", x: 0, y: 0, a, b }, o || {});
  function scene(id, acts) {
    let at = 0;
    acts.forEach(a => { a.at = at; at += a.beats.length; });
    const N = at, st = { root: null, cur: -1, last: -1 };
    acts.forEach(a => {
      const cur = {}, ids = {};
      a.props.forEach(p => { ids[p.id] = p; cur[p.id] = Object.assign({ on: p.on ? 1 : 0 }, p.st || {}); });
      a.S = a.beats.map(b => {
        (b.on || []).forEach(i => { if (cur[i]) cur[i].on = 1; });
        (b.off || []).forEach(i => { if (cur[i]) cur[i].on = 0; });
        Object.keys(b.s || {}).forEach(i => { if (!cur[i]) return; const o = Object.assign({}, b.s[i]); delete o.hot; Object.assign(cur[i], o); });
        const snap = {};
        Object.keys(cur).forEach(i => { snap[i] = Object.assign({}, cur[i]); delete snap[i].hot; });
        (b.hot || []).forEach(i => { if (snap[i]) snap[i].hot = 1; });
        Object.keys(b.s || {}).forEach(i => { if (snap[i] && b.s[i].hot) snap[i].hot = 1; });
        return snap;
      });
    });
    const dotX = j => 392 - (acts.length - 1 - j) * 9;
    function markup() {
      let h = `<svg viewBox="0 0 400 380" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(acts[0].beats[0].t)}" focusable="false">`;
      h += R(1, 1, 398, 378, { fill: C.paper, rx: 20, stroke: "#e7dfcd", sw: 2 });
      h += `<g class="v2chip">` + R(8, 9, 200, 36, { fill: C.navy, rx: 18, cls: "v2chipbg" }) + CI(27, 27, 6, { fill: C.orange, cls: "v2beat" }) +
        `<text class="v2t v2tag" x="40" y="27" font-size="16" font-weight="800" fill="#ffffff" dominant-baseline="central"></text></g>`;
      acts.forEach((a, j) => { h += CI(dotX(j), 27, 3.6, { fill: "#c9d2db", cls: `v2dot v2dot${j}` }); });
      acts.forEach((a, j) => {
        h += `<g class="v2m v2act v2act${j}" data-bench="${esc(a.bench)}" style="opacity:0">`;
        a.props.forEach(p => {
          const k = K[p.k], bb = k.bb ? k.bb(p) : null;
          const halo = bb ? R(bb[0] - 7, bb[1] - 7, bb[2] + 14, bb[3] + 14, { stroke: C.orange, sw: 3, dash: "8 6", rx: 14, cls: "v2halo" }) : "";
          h += `<g class="v2p" data-id="${p.id}" transform="translate(${p.x || 0} ${p.y || 0})"><g class="v2m pm">${halo}${k.b(p)}</g></g>`;
        });
        h += `</g>`;
      });
      h += `<g class="v2rip" style="display:none"><circle class="v2ripc" cx="0" cy="0" r="26" fill="none" stroke="${C.orange}" stroke-width="3.5"/></g>`;
      return h + `</svg>`;
    }
    const els = j => st.root ? qa(q(st.root, ".v2act" + j), ".v2p") : [];
    function setTag(t) {
      const tx = q(st.root, ".v2tag"), bg = q(st.root, ".v2chipbg");
      if (!tx || tx.textContent === t) return;
      tx.textContent = t;
      let w = 0; try { w = tx.getComputedTextLength(); } catch (e) { w = 0; }
      tx.setAttribute("font-size", "16");
      try { w = tx.getComputedTextLength(); } catch (e) { w = 0; }
      if (w > 254) { tx.setAttribute("font-size", String(Math.max(12.5, Math.floor(16 * 254 / w * 10) / 10))); try { w = tx.getComputedTextLength(); } catch (e) { w = 254; } }
      if (!w) w = t.length * 9.2;
      if (bg) bg.setAttribute("width", clamp(Math.ceil(w) + 46, 120, 300));
      restart(tx, "v2tagin");
      const sv = q(st.root, "svg"); if (sv) sv.setAttribute("aria-label", t);
    }
    function ripple(f) {
      const g = q(st.root, ".v2rip");
      if (!g) return;
      if (!f || INST || RM()) { shown(g, false); return; }
      g.setAttribute("transform", `translate(${f[0].toFixed(1)} ${f[1].toFixed(1)})`); shown(g, true); restart(g, "v2ripon");
    }
    function render(i, inst) {
      const r = st.root; if (!r) return;
      const ii = clamp(Math.floor(+i) || 0, 0, N - 1);
      let a = 0; for (let j = 0; j < acts.length; j++) if (acts[j].at <= ii) a = j;
      const k = ii - acts[a].at, act = acts[a], beat = act.beats[k];
      INST = !!inst || RM();
      r.classList.toggle("v2inst", INST);
      if (a !== st.cur) {
        acts.forEach((x, j) => {
          const g = q(r, ".v2act" + j); if (!g) return;
          if (j === a) { g.removeAttribute("aria-hidden"); go(g, { o: 1, x: 0, d: 0.6 }); }
          else { g.setAttribute("aria-hidden", "true"); go(g, { o: 0, x: j < a ? -24 : 24, d: 0.35 }); }
        });
        st.cur = a;
      }
      acts.forEach((x, j) => { const dn = q(r, ".v2dot" + j); if (dn) { dn.style.fill = j === a ? C.orange : j < a ? C.navy : "#c9d2db"; dn.setAttribute("r", j === a ? 5.2 : 3.6); } });
      const S = act.S[k];
      els(a).forEach((el, n) => upd(el, act.props[n], S[act.props[n].id]));
      setTag(beat.t);
      let fid = beat.f || (beat.hot && beat.hot[0]) || Object.keys(beat.s || {}).filter(x => beat.s[x].hot)[0] || (beat.on && beat.on[beat.on.length - 1]);
      const fp = fid ? act.props.filter(p => p.id === fid)[0] : null;
      ripple(fp ? [S[fid].x == null ? fp.x : S[fid].x, (S[fid].y == null ? fp.y : S[fid].y) + (fp.fy || 0)] : null);
      st.last = ii;
      INST = false;
      if (inst) { reflow(r); r.classList.remove("v2inst"); }
    }
    return {
      _qa: { N, acts: acts.length, tags: acts.reduce((x, a) => x.concat(a.beats.map(b => b.t)), []), bench: acts.map(a => a.bench) },
      build(el) {
        if (!el) return;
        addStyle();
        const root = document.createElement("div");
        root.className = `vls-w02-${id} v2root` + (W.gsap && typeof W.gsap.to === "function" ? " v2gs" : "");
        root.innerHTML = markup();
        if (typeof el.replaceChildren === "function") el.replaceChildren(root); else { el.innerHTML = ""; el.appendChild(root); }
        st.root = root; st.cur = -1; st.last = -1;
        fitAll(root);
        const sv = q(root, "svg"); if (RM() && sv && sv.pauseAnimations) sv.pauseAnimations();
        INST = true;
        acts.forEach((a, j) => els(j).forEach((e, n) => { e._st = null; upd(e, a.props[n], { on: 0 }); e._st = { on: 0 }; }));
        INST = false;
        render(0, true);
      },
      step(i) { render(i, false); },
      reset() {
        if (!st.root) return;
        if (W.gsap && typeof W.gsap.killTweensOf === "function") W.gsap.killTweensOf(st.root.querySelectorAll("*"));
        INST = true;
        acts.forEach((a, j) => { els(j).forEach((e, n) => { upd(e, a.props[n], { on: 0 }); e._st = { on: 0 }; }); const g = q(st.root, ".v2act" + j); if (g) go(g, { o: 0, x: 24 }); });
        INST = false;
        st.cur = -1;
        render(0, true);
      }
    };
  }


  // ---------- scoped CSS (appended once to the shared <style id="vl-sc-w02">) ----------
  const SEL = s => SECS.map(id => `.vls-w02-${id}${s}`).join(",");
  const CSS = [
    "/* w02-claude-v2-part1 */",
    `${SEL("")}{position:relative;display:block;width:100%;height:100%;min-height:0;overflow:hidden;box-sizing:border-box;color:#17283a;-webkit-user-select:none;user-select:none}`,
    `${SEL(" svg")}{display:block;width:100%;height:100%;max-height:100%;overflow:hidden}`,
    `${SEL(" .v2t")}{font-family:inherit;letter-spacing:.1px}`,
    `${SEL(" .v2m")}{transform-box:fill-box;transform-origin:50% 50%;transition-property:transform,opacity;transition-duration:.7s;transition-timing-function:cubic-bezier(.2,.8,.2,1)}`,
    `${SEL(".v2gs .v2m")}{transform-box:view-box;transform-origin:0 0;transition:none}`,
    `${SEL(" .v2c")}{transition:fill .5s ease,stroke .5s ease}`,
    `${SEL(" .v2d")}{transition:stroke-dashoffset .9s cubic-bezier(.4,0,.2,1),stroke .5s ease}`,
    `${SEL(".v2inst *")}{transition:none!important}`,
    `${SEL(" .v2halo")}{animation:v2halo 1.3s ease-in-out infinite}`,
    `${SEL(" .v2bob")}{transform-box:fill-box;transform-origin:50% 100%;animation:v2bob 1.05s ease-in-out infinite}`,
    `${SEL(" .v2spin")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2spin 2.2s linear infinite}`,
    `${SEL(" .v2spinslow")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2spin 6s linear infinite}`,
    `${SEL(" .v2float")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2float 2.2s ease-in-out infinite}`,
    `${SEL(" .v2flash")}{animation:v2flash 1.1s ease-in-out infinite}`,
    `${SEL(" .v2shake")}{transform-box:fill-box;transform-origin:50% 100%;animation:v2shake .7s ease-in-out infinite}`,
    `${SEL(" .v2pulse")}{animation:v2pul 1.1s ease-in-out infinite}`,
    `${SEL(" .v2rise")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2rise 2.4s ease-in infinite}`,
    `${SEL(" .v2rise1")}{animation-delay:.8s}`, `${SEL(" .v2rise2")}{animation-delay:1.6s}`,
    `${SEL(" .v2beat")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2beat 1.6s ease-in-out infinite}`,
    `${SEL(" .v2tagin")}{animation:v2tagin .45s ease-out}`,
    `${SEL(" .v2ripc")}{transform-box:fill-box;transform-origin:50% 50%;opacity:0}`,
    `${SEL(" .v2ripon .v2ripc")}{animation:v2rip .9s ease-out forwards}`,
    `${SEL(" .v2stampin")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2stamp .55s cubic-bezier(.34,1.56,.64,1)}`,
    "@keyframes v2halo{0%,100%{opacity:.35}50%{opacity:1}}",
    "@keyframes v2bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}",
    "@keyframes v2spin{to{transform:rotate(360deg)}}",
    "@keyframes v2float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}",
    "@keyframes v2flash{0%,100%{opacity:1}50%{opacity:.55}}",
    "@keyframes v2shake{0%,100%{transform:rotate(0)}25%{transform:rotate(-1.6deg)}75%{transform:rotate(1.6deg)}}",
    "@keyframes v2pul{0%,100%{stroke:transparent;stroke-width:0}50%{stroke:#ffffff;stroke-width:5}}",
    "@keyframes v2rise{0%{transform:translateY(0);opacity:0}20%{opacity:.8}100%{transform:translateY(-70px);opacity:0}}",
    "@keyframes v2beat{0%,100%{transform:scale(1)}50%{transform:scale(1.45)}}",
    "@keyframes v2tagin{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}",
    "@keyframes v2rip{0%{opacity:.9;transform:scale(.35)}100%{opacity:0;transform:scale(1.9)}}",
    "@keyframes v2stamp{0%{opacity:0;transform:scale(1.9)}100%{opacity:1;transform:scale(1)}}",
    `@media (prefers-reduced-motion:reduce){${SEL(" *")}{animation:none!important;transition:none!important}}`
  ].join("\n");
  function addStyle() {
    if (typeof document === "undefined") return;
    let s = document.getElementById("vl-sc-w02");
    if (!s) { s = document.createElement("style"); s.id = "vl-sc-w02"; (document.head || document.documentElement).appendChild(s); }
    if (s.textContent.indexOf("/* w02-claude-v2-part1 */") < 0) s.appendChild(document.createTextNode(CSS));
  }
  addStyle();

  // =====================================================================
  // W2O1a Â· Pressure builds before a programme begins â€” 32 moments, 10 acts
  // =====================================================================
  W.VL_SCENES["W2O1a"] = scene("W2O1a", [
    // Act 1 (moments 0-3). Benchmark Part2 #081 "Clean Workflow Visualization with Motion Graphics"
    // https://dribbble.com/shots/27600376-Clean-Workflow-Visualization-with-Motion-Graphics
    // Adapted: journey steps joined by a travelling path; the traveller walks it while stations tick.
    A("P2#081", [
      P("q", "card", 200, 214, { w: 280, h: 196, ic: "q", lab: "Why finally act?", sub: "Our Week 2 puzzle", col: C.plum, is: 64 }),
      P("sign", "pill", 200, 78, { w: 210, lab: "Qasr Marina hotel", tone: "solid", ic: "hotel" }),
      L("path", [24, 272], [376, 272], { col: C.grey, sw: 6, tok: "dot", tc: C.orange, tn: 4, dur: 3.2 }),
      P("d1", "dept", 78, 146, { lab: "Reservations|team", ic: "cal" }),
      P("d2", "dept", 200, 146, { lab: "Reception|desk", ic: "bell" }),
      P("d3", "dept", 322, 146, { lab: "Housekeeping|team", ic: "bed" }),
      P("g", "person", 70, 322, { lab: "Tired traveller", ls: 14, bag: 1, col: C.teal }),
      P("bw", "bubble", 196, 316, { w: 150, lab: "Still waiting", tail: "r", col: C.red })
    ], [
      { t: "A difficult question", on: ["q"] },
      { t: "Last week's traveller", off: ["q"], on: ["sign", "path", "d1", "d2", "d3", "g"], s: { g: { mood: "worry", walk: 1 } }, f: "g" },
      { t: "Duties done, guest upset", s: { d1: { st: "ok" }, d2: { st: "ok" }, d3: { st: "ok" }, g: { x: 330, mood: "sad", walk: 0, wait: 1, d: 1.6 } }, on: ["bw"], hot: ["g"] },
      { t: "Customers feel connections", s: { sign: { lab: "One connected journey", st: "mint" }, path: { flow: 1, st: "ok" }, d1: { dim: 1 }, d2: { dim: 1 }, d3: { dim: 1 }, bw: { dim: 1 } }, hot: ["sign", "path"], f: "sign" }
    ]),
    // Act 2 (moments 4-7). Benchmark Part2 #121 "Dashboard by RAKIBUZZAMAN"
    // https://lottiefiles.com/free-animation/dashboard-M05MmlnoOP
    // Adapted: the management report fills its graph and highlights the metric managers keep watching.
    A("P2#121", [
      P("scr", "screen", 140, 196, { w: 250, h: 200, lab: "Management report" }),
      P("ln", "line", 140, 212, { w: 200, h: 112, pts: [0.92, 0.85, 0.78, 0.7, 0.6, 0.5, 0.4], col: C.red, xlab: "Guest satisfaction", marks: [{ i: 5, lab: "Worrying pattern", w: 150, y: -52, col: C.red }] }),
      P("m1", "person", 336, 134, { sz: 0.72, col: C.plum }),
      P("m2", "person", 336, 208, { sz: 0.72, col: C.teal, skin: C.skin2 }),
      P("m3", "person", 336, 282, { sz: 0.72, col: C.gold }),
      P("bu", "bubble", 296, 74, { w: 176, lab: "Problem understood", tail: "b", tx: 40 }),
      P("bq", "bubble", 296, 74, { w: 176, lab: "Why tolerate this?", tail: "b", tx: 40, col: C.plum }),
      P("np", "pill", 200, 348, { w: 260, lab: "No programme approved", ic: "lock", tone: "off" })
    ], [
      { t: "Understanding isn't investing", on: ["scr", "ln", "m1", "m2", "m3", "bu", "np"], s: { ln: { draw: 0 } }, hot: ["np"] },
      { t: "Satisfaction keeps falling", off: ["bu"], s: { ln: { draw: 0.72 }, m1: { mood: "worry" }, m2: { mood: "worry" }, m3: { mood: "worry" } }, f: "ln" },
      { t: "Still no programme", s: { ln: { draw: 1, mk: 1 }, np: { st: "bad" } }, hot: ["np"] },
      { t: "Why tolerate it?", on: ["bq"], s: { m1: { mood: "ok" }, m2: { mood: "ok" }, m3: { mood: "ok" } }, hot: ["bq"] }
    ]),
    // Act 3 (moments 8-11). Benchmark Part2 #129 "Arc tween"
    // https://observablehq.com/@d3/arc-tween
    // Adapted: a pressure vessel whose gauge endpoint tweens to each new value as the driver acts.
    A("P2#129", [
      P("tk", "tank", 108, 224, { w: 120, h: 156, lab: "Pressure for change", col: C.orange }),
      P("dr", "pill", 112, 82, { w: 198, lab: "Driver condition", tone: "warn", ic: "down" }),
      L("push", [172, 196], [238, 176], { col: C.orange, sw: 6, arrow: 1, tok: "dot", tc: C.orange, tn: 3 }),
      P("cw", "dept", 296, 160, { w: 96, h: 80, ic: "gear", lab: "Current way|of working" }),
      P("ck", "crack", 296, 160, { d: "M-14 -40l10 14-9 11 13 12-7 12 9 11" }),
      P("val", "bar", 296, 290, { w: 172, lab: "Guest value", max: 1, col: C.green }),
      P("c1", "bubble", 292, 104, { w: 178, lab: "Figures discussed", tail: "l" }),
      P("c2", "bubble", 292, 164, { w: 178, lab: "Discussed again", tail: "l" }),
      P("ap", "pill", 292, 244, { w: 176, h: 52, lab: "Approved|programme", ic: "lock", tone: "off" }),
      P("ns", "stamp", 292, 316, { lab: "Not established", r: -6 })
    ], [
      { t: "A driver creates pressure", on: ["tk", "dr"], s: { tk: { lv: 0.35 } }, hot: ["dr"] },
      { t: "Old way weakens", on: ["cw", "push", "ck", "val"], s: { tk: { lv: 0.55 }, push: { flow: 1 }, val: { lv: 0.86 } }, hot: ["cw"] },
      { t: "Less value for guests", s: { dr: { lab: "Satisfaction falling" }, val: { lv: 0.38, st: "bad" }, tk: { lv: 0.66 } }, hot: ["val"] },
      { t: "Talk alone isn't approval", off: ["cw", "push", "ck", "val"], on: ["c1", "c2", "ap", "ns"], s: { tk: { lv: 0.7 } }, hot: ["ap"] }
    ]),
    // Act 4 (moments 12-13). Benchmark Part2 #079 "Product Workflow Animation & UI Motion Design"
    // https://dribbble.com/shots/27577799-Product-Workflow-Animation-UI-Motion-Design
    // Adapted: a product state (mobile check-in) shifts guest behaviour, then expectations transfer to Qasr.
    A("P2#079", [
      P("rv", "hotel", 100, 158, { w: 150, h: 130, lab: "Rival hotel", col: C.green }),
      P("qs", "hotel", 300, 158, { w: 150, h: 130, lab: "Qasr hotel" }),
      P("ph", "icon", 82, 300, { ic: "phone", sz: 44, col: C.green, lab: "Mobile check-in", idle: "v2float" }),
      P("gh", "person", 152, 318, { sz: 0.85, col: C.teal }),
      L("ar", [180, 184], [222, 184], { col: C.orange, sw: 6, arrow: 1, tok: "dot", tc: C.orange, tn: 2, dur: 1.6 }),
      P("xp", "pill", 200, 262, { w: 184, h: 36, lab: "External pressure", tone: "warn" }),
      P("w1", "person", 300, 322, { sz: 0.85, col: C.plum, mood: "worry" }),
      P("ex", "icon", 354, 296, { ic: "phone", sz: 26, col: C.navy, disc: C.sky })
    ], [
      { t: "Rival offers mobile check-in", on: ["rv", "ph", "gh"], s: { gh: { mood: "happy", walk: 1 } }, hot: ["ph"] },
      { t: "Guests expect the same", on: ["qs", "ar", "xp", "w1", "ex"], s: { ar: { flow: 1 }, w1: { mood: "worry", wait: 1 } }, hot: ["xp"] }
    ]),
    // Act 5 (moments 14-16). Benchmark Part2 #100 "3D Statistics Factory"
    // https://lottiefiles.com/free-animation/3d-statistics-factory-lRiHNeU9Y4
    // Adapted: staged equipment around a building; outside forces feed in, inside faults appear, output drops.
    A("P2#100", [
      L("a1", [174, 100], [204, 140], { col: C.orange, sw: 4, arrow: 1, tok: "dot", tc: C.orange, tn: 2 }),
      L("a2", [174, 160], [204, 170], { col: C.orange, sw: 4, arrow: 1, tok: "dot", tc: C.orange, tn: 2 }),
      L("a3", [174, 220], [204, 212], { col: C.orange, sw: 4, arrow: 1, tok: "dot", tc: C.orange, tn: 2 }),
      L("a4", [174, 280], [204, 252], { col: C.orange, sw: 4, arrow: 1, tok: "dot", tc: C.orange, tn: 2 }),
      P("e1", "pill", 94, 100, { w: 158, lab: "Rival competition", ls: 14 }),
      P("e2", "pill", 94, 160, { w: 158, h: 46, lab: "Economic|conditions", ls: 14 }),
      P("e3", "pill", 94, 220, { w: 158, lab: "Technology change", ls: 14 }),
      P("e4", "pill", 94, 280, { w: 158, lab: "New regulation", ls: 14 }),
      P("org", "hotel", 292, 196, { w: 172, h: 204, lab: "Qasr Hospitality" }),
      P("i1", "pill", 292, 188, { w: 146, h: 32, lab: "Rising costs", tone: "blush", ls: 14 }),
      P("i2", "pill", 292, 226, { w: 146, h: 32, lab: "Quality failures", tone: "blush", ls: 14 }),
      P("i3", "pill", 292, 268, { w: 146, h: 42, lab: "Operational|inefficiencies", tone: "blush", ls: 13 }),
      P("pf", "bar", 292, 346, { w: 172, lab: "Overall performance", max: 1, col: C.green, ls: 14 })
    ], [
      { t: "Drivers from outside", on: ["org", "e1", "e2", "e3", "e4", "a1", "a2", "a3", "a4", "pf"], s: { a1: { flow: 1 }, a2: { flow: 1 }, a3: { flow: 1 }, a4: { flow: 1 }, pf: { lv: 0.9 } }, hot: ["e1", "e2", "e3", "e4"], f: "org" },
      { t: "Drivers from inside", on: ["i1", "i2", "i3"], hot: ["i1", "i2", "i3"], f: "i2" },
      { t: "Both weaken performance", s: { pf: { lv: 0.32, st: "bad" }, org: { shake: 1 } }, hot: ["pf"] }
    ]),
    // Act 6 (moments 17-18). Benchmark Part2 #138 "Scrolling Timeline"
    // https://motionarray.com/after-effects-templates/scrolling-timeline-1223172/
    // Adapted: time scrolls (calendar fills) while the pressure dial climbs and the agenda keeps deferring.
    A("P2#138", [
      P("cal", "cal", 95, 126, { w: 124, h: 100, lab: "Years pass by", due: 99 }),
      P("pg", "gauge", 95, 288, { r: 62, lab: "Pressure level" }),
      P("nf", "pill", 95, 348, { w: 156, h: 48, lab: "No funded|decision", ic: "lock", tone: "off", ls: 14 }),
      P("ag", "doc", 282, 200, { w: 204, h: 252, title: "Board agenda", lines: ["Other priority one", "Other priority two", "Other priority three", "Service problem"], stamps: ["Postponed again"], sy: 100 })
    ], [
      { t: "Pressure grows for years", on: ["cal", "pg", "nf"], s: { cal: { fill: 15 }, pg: { lv: 0.8 } }, hot: ["pg"] },
      { t: "Postponed for other priorities", on: ["ag"], s: { ag: { hl: { 0: "y", 1: "y", 2: "y", 3: "r" }, stamp: 0 } }, hot: ["ag"] }
    ]),
    // Act 7 (moments 19-22). Benchmark Part2 #128 "Pie chart update"
    // https://observablehq.com/@d3/pie-chart-update
    // Adapted: two competing datasets (proposals) contend for one fixed whole (scarce resources); neither wins.
    A("P2#128", [
      P("pb", "pill", 200, 84, { w: 200, lab: "Service problem", ic: "warn", tone: "blush" }),
      P("pa", "person", 72, 196, { col: C.teal, lab: "One department", ls: 14 }),
      P("pz", "person", 320, 196, { col: C.plum, skin: C.skin2, lab: "Another department", ls: 13 }),
      P("ba", "bubble", 104, 128, { w: 150, lab: "Staff shortage?", tail: "b", tx: -30, col: C.teal }),
      P("bb", "bubble", 292, 128, { w: 150, lab: "System gaps?", tail: "b", tx: 28, col: C.plum }),
      P("co", "coins", 196, 176, { n: 3, lab: "Scarce resources", ls: 14 }),
      P("ca", "card", 100, 298, { w: 172, h: 84, ic: "users", lab: "Add more staff", col: C.teal, is: 30 }),
      P("cb", "card", 300, 298, { w: 172, h: 84, ic: "plug", lab: "Fix system gaps", col: C.plum, is: 30 }),
      P("ns", "stamp", 200, 140, { lab: "Not approved", r: -6 })
    ], [
      { t: "Disagreement about causes", on: ["pb", "pa", "pz", "ba", "bb"], s: { pa: { mood: "worry" }, pz: { mood: "worry" } }, hot: ["ba", "bb"] },
      { t: "Two rival proposals", on: ["ca", "cb"], hot: ["ca", "cb"] },
      { t: "Scarce resources, no winner", on: ["co"], s: { ca: { st: "off" }, cb: { st: "off" } }, hot: ["co"] },
      { t: "Visible, yet unapproved", off: ["ba", "bb", "co"], on: ["ns"], s: { pb: { st: "bad" } }, hot: ["pb"] }
    ]),
    // Act 8 (moments 23-25). Benchmark Part2 #111 "Hierarchy traversal animated"
    // https://old.observablehq.com/@d3/hierarchy-traversal-animated
    // Adapted: the process line visits one department node after another; each manager must commit.
    A("P2#111", [
      P("bpm", "pill", 190, 80, { w: 300, h: 40, lab: "Business Process Management", tone: "solid" }),
      P("gr", "icon", 366, 80, { ic: "loop", sz: 34, col: C.navy, idle: "v2spinslow" }),
      P("lp", "icon", 200, 176, { ic: "loop", sz: 104, col: C.teal, idle: "v2spinslow" }),
      P("g1", "pill", 106, 326, { w: 180, lab: "Govern the work", ic: "shield", tone: "sky" }),
      P("g2", "pill", 294, 326, { w: 180, lab: "Improve the work", ic: "up", tone: "mint" }),
      P("c1", "panel", 70, 206, { w: 124, h: 180, lab: "Reception|desk", th: 40, ls: 13 }),
      P("c2", "panel", 200, 206, { w: 124, h: 180, lab: "Housekeeping|team", ls: 13, col: C.teal }),
      P("c3", "panel", 330, 206, { w: 124, h: 180, lab: "Systems|team", ls: 13, col: C.plum }),
      P("m1", "person", 70, 206, { sz: 0.8, col: C.navy }),
      P("m2", "person", 200, 206, { sz: 0.8, col: C.teal, skin: C.skin2 }),
      P("m3", "person", 330, 206, { sz: 0.8, col: C.plum }),
      P("k1", "badge", 100, 172, { sz: 1.25 }),
      P("k2", "badge", 230, 172, { sz: 1.25 }),
      P("k3", "badge", 360, 172, { sz: 1.25 }),
      L("pl", [16, 268], [384, 268], { col: C.orange, sw: 6, arrow: 1, tok: "dot", tc: C.orange, tn: 4, dur: 3.4 }),
      P("dm", "person", 52, 340, { sz: 0.8, col: C.ink }),
      P("dc", "pill", 230, 340, { w: 260, lab: "Commit shared resources", ic: "gavel", tone: "solid" })
    ], [
      { t: "BPM governs connected work", on: ["bpm", "gr", "lp", "g1", "g2", "pl"], s: { pl: { flow: 1 } }, hot: ["bpm"] },
      { t: "Several departments involved", off: ["lp", "g1", "g2"], on: ["c1", "c2", "c3", "m1", "m2", "m3", "k1", "k2", "k3"], s: { k1: { st: "unk" }, k2: { st: "unk" }, k3: { st: "unk" } }, f: "c2" },
      { t: "Someone must decide", on: ["dm", "dc"], hot: ["dc"] }
    ]),
    // Act 9 (moments 26-27). Benchmark Part1 #023 "Celonis Process Explorer animation"
    // https://help.celonis.com/cpm46/en/process-components
    // Adapted: case tokens flow through offices that each hit target, while the student's wait and complaints build.
    A("P1#023", [
      L("fl", [92, 176], [384, 176], { col: C.grey, sw: 5, tok: "doc", tc: C.navy, tn: 3, dur: 4.5 }),
      P("st", "person", 60, 196, { col: C.teal, lab: "The student", ls: 14 }),
      P("r1", "dept", 172, 176, { lab: "Registrar|office", ic: "doc" }),
      P("r2", "dept", 296, 176, { lab: "Finance|office", ic: "money" }),
      P("cb", "bubble", 96, 104, { w: 150, lab: "Still waiting", tail: "b", tx: -34, col: C.red }),
      P("pr", "pill", 100, 300, { w: 176, lab: "Pressure rising", ic: "up", tone: "warn" }),
      P("ds", "bubble", 290, 300, { w: 168, lab: "Discussed again", tail: "l" }),
      P("na", "pill", 200, 352, { w: 270, lab: "No redesign authorised", ic: "lock", tone: "off" })
    ], [
      { t: "Offices fine, student waits", on: ["fl", "st", "r1", "r2", "cb"], s: { r1: { st: "ok" }, r2: { st: "ok" }, st: { mood: "sad", wait: 1 }, fl: { flow: 1 } }, hot: ["cb"] },
      { t: "Discussed, not authorised", on: ["pr", "ds", "na"], hot: ["na"] }
    ]),
    // Act 10 (moments 28-31). Benchmark Part2 #137 "Corporate Timeline by HenlyFx"
    // https://motionarray.com/after-effects-templates/corporate-timeline-1939632/
    // Adapted: two milestones revealed one by one; commitment tokens land on the decision milestone.
    A("P2#137", [
      L("rail", [24, 208], [380, 208], { col: C.navy, sw: 6 }),
      L("fal", [105, 160], [105, 206], { col: C.navy, sw: 3 }),
      L("fbl", [295, 160], [295, 206], { col: C.navy, sw: 3 }),
      P("fa", "pill", 105, 140, { w: 174, lab: "Need recognised", ic: "eye", tone: "sky" }),
      P("fb", "pill", 295, 140, { w: 184, lab: "Decision to begin", ic: "flag", tone: "solid" }),
      P("gap", "bracket", 200, 234, { w: 190, lab: "Two different events", side: "dn" }),
      P("w1", "icon", 42, 208, { ic: "warn", sz: 24, col: C.orange }),
      P("w2", "icon", 78, 208, { ic: "warn", sz: 24, col: C.orange }),
      P("w3", "icon", 140, 208, { ic: "warn", sz: 24, col: C.orange }),
      P("w4", "icon", 176, 208, { ic: "warn", sz: 24, col: C.orange }),
      P("ky", "pill", 110, 262, { w: 176, lab: "Known for years", tone: "off" }),
      P("mg", "icon", 236, 262, { ic: "search", sz: 44, col: C.plum, idle: "v2float" }),
      P("t1", "pill", 295, 262, { w: 186, h: 36, lab: "Money committed", ic: "coin", tone: "gold" }),
      P("t2", "pill", 295, 306, { w: 186, h: 36, lab: "Authority given", ic: "key", tone: "plum" }),
      P("t3", "pill", 295, 350, { w: 186, h: 36, lab: "Deadline fixed", ic: "cal", tone: "teal" }),
      P("bolt", "bolt", 295, 84, { sz: 52 }),
      P("acc", "pill", 105, 282, { w: 190, h: 38, lab: "Accumulated pressure", tone: "warn", ls: 14 }),
      L("ak", [105, 303], [105, 322], { col: C.green, sw: 4, arrow: 1 }),
      P("pp", "pill", 110, 346, { w: 160, h: 46, lab: "Actual|programme", ic: "seal", tone: "ok" })
    ], [
      { t: "Recognise versus decide", on: ["rail", "fal", "fbl", "fa", "fb", "gap"], hot: ["gap"] },
      { t: "Look beyond old problems", off: ["gap"], on: ["w1", "w2", "w3", "w4", "ky", "mg"], s: { fa: { dim: 1 } }, hot: ["mg"] },
      { t: "Money, authority, deadline", off: ["mg"], on: ["t1", "t2", "t3"], hot: ["t1", "t2", "t3"], f: "t2" },
      { t: "Pressure becomes programme", off: ["ky", "w1", "w2", "w3", "w4"], on: ["bolt", "acc", "ak", "pp"], s: { fb: { st: "ok" } }, hot: ["pp"] }
    ])
  ]);

  // =====================================================================
  // W2O1b Â· The event that changes everything â€” 32 moments, 10 acts
  // =====================================================================
  W.VL_SCENES["W2O1b"] = scene("W2O1b", [
    // Act 1 (moments 0-2). Benchmark Part2 #093 "Process-Para"
    // https://lottiefiles.com/free-animation/process-para-qujCEQ2AKT
    // Adapted: rotate, wait, (no) finish â€” pressure keeps cycling into a vessel while the gate stays shut.
    A("P2#093", [
      L("l1", [70, 112], [92, 150], { col: C.orange, sw: 4, arrow: 1, tok: "dot", tc: C.orange, tn: 2 }),
      L("l2", [200, 112], [128, 150], { col: C.orange, sw: 4, arrow: 1, tok: "dot", tc: C.orange, tn: 2 }),
      L("l3", [330, 112], [158, 156], { col: C.orange, sw: 4, arrow: 1, tok: "dot", tc: C.orange, tn: 2 }),
      P("p1", "pill", 70, 88, { w: 128, h: 46, lab: "Satisfaction|declining", ls: 14, tone: "blush" }),
      P("p2", "pill", 200, 88, { w: 128, h: 46, lab: "New rival|services", ls: 14, tone: "blush" }),
      P("p3", "pill", 330, 88, { w: 128, h: 46, lab: "Costs|concerning", ls: 14, tone: "blush" }),
      P("tk", "tank", 110, 252, { w: 118, h: 136, lab: "Accumulating pressure", ls: 14 }),
      P("gt", "gate", 300, 252, { w: 140, lab: "Programme gate" }),
      P("bd", "bubble", 300, 160, { w: 160, lab: "Discussed again", tail: "b", tx: 0 })
    ], [
      { t: "Problems pile up", on: ["tk", "gt"], s: { tk: { lv: 0.45 } }, hot: ["tk"] },
      { t: "Three pressures named", on: ["p1", "p2", "p3", "l1", "l2", "l3"], s: { l1: { flow: 1 }, l2: { flow: 1 }, l3: { flow: 1 }, tk: { lv: 0.72 } }, hot: ["p1", "p2", "p3"], f: "p2" },
      { t: "Discussed, never funded", on: ["bd"], s: { tk: { lv: 0.8 } }, hot: ["gt"] }
    ]),
    // Act 2 (moments 3-5). Benchmark Part2 #095 "contract process"
    // https://lottiefiles.com/free-animation/contract-process-tnM3xY0cM8
    // Adapted: an official document is revealed clause by clause, then its terms become a date and a clock.
    A("P2#095", [
      P("doc", "doc", 118, 212, { w: 196, h: 266, title: "Tourism|authority", ts: 13, lines: ["New requirement", "Licensed operators", "Starts in January", "Record in 24 hours"], ls: 14 }),
      P("dn", "pill", 296, 92, { w: 168, h: 50, lab: "Doing|nothing", ic: "clock", tone: "norm" }),
      P("cal", "cal", 296, 186, { w: 118, h: 88, lab: "January start", due: 2 }),
      P("ck", "clock", 296, 300, { r: 36, lab: "24-hour limit" })
    ], [
      { t: "An announcement arrives", on: ["doc", "dn"], s: { doc: { rows: 0 }, dn: { st: "bad", lab: "Doing nothing|is risky" } }, hot: ["dn"], f: "doc" },
      { t: "A new requirement", s: { doc: { rows: 2, hl: { 0: "y", 1: "y" } } }, hot: ["doc"] },
      { t: "Full record within 24h", on: ["cal", "ck"], s: { doc: { rows: 4, hl: { 0: "y", 1: "y", 2: "r", 3: "r" } }, cal: { due: 1, fill: 2 }, ck: { h: 1, st: "goal" } }, hot: ["cal", "ck"] }
    ]),
    // Act 3 (moments 6-9). Benchmark Part2 #103 "Data Factory Animation"
    // https://lottiefiles.com/free-animation/data-factory-animation-I6dMAfEyrl
    // Adapted: four inputs should feed one output record; broken feeds leave it incomplete, then a deadline locks in.
    A("P2#103", [
      L("f1", [60, 146], [172, 214], { col: C.grey, sw: 3.5, mid: [116, 180] }),
      L("f2", [153, 146], [196, 212], { col: C.grey, sw: 3.5, mid: [174, 179] }),
      L("f3", [247, 146], [230, 212], { col: C.grey, sw: 3.5, mid: [238, 179] }),
      L("f4", [340, 146], [256, 214], { col: C.grey, sw: 3.5, mid: [298, 180] }),
      P("s1", "db", 60, 102, { lab: "System A" }),
      P("s2", "db", 153, 102, { lab: "System B" }),
      P("s3", "db", 247, 102, { lab: "System C" }),
      P("s4", "db", 340, 102, { lab: "System D" }),
      P("rec", "doc", 214, 290, { w: 140, h: 150, title: "Guest record", rows: 4, stamps: ["Incomplete record"], sy: 30 }),
      P("op", "pill", 72, 300, { w: 120, h: 54, lab: "Improve|experience?", ls: 14, tone: "sky" }),
      P("ob", "pill", 72, 300, { w: 120, h: 54, lab: "Specific|obligation", ls: 14, tone: "warn" }),
      P("dl", "cal", 340, 296, { w: 92, h: 80, lab: "Fixed deadline", due: 2, ls: 14 })
    ], [
      { t: "Scattered across four systems", on: ["s1", "s2", "s3", "s4", "f1", "f2", "f3", "f4", "rec"], s: { f1: { brk: 1 }, f2: { brk: 1 }, f3: { brk: 1 }, f4: { brk: 1 }, rec: { stamp: 0 } }, hot: ["rec"] },
      { t: "Three are property-local", s: { s2: { loc: 1, st: "bad" }, s3: { loc: 1, st: "bad" }, s4: { loc: 1, st: "bad" }, f2: { st: "bad", x: 1 }, f3: { st: "bad", x: 1 }, f4: { st: "bad", x: 1 } }, hot: ["s2", "s3", "s4"], f: "s3" },
      { t: "Not just a choice", on: ["op"], s: { op: { st: "off" } }, hot: ["op"] },
      { t: "A deadline obligation", off: ["op"], on: ["ob", "dl"], s: { dl: { due: 1 } }, hot: ["ob", "dl"] }
    ]),
    // Act 4 (moments 10-11). Benchmark Part2 #136 "Project TimeLine"
    // https://motionarray.com/after-effects-templates/project-timeline-2424919/
    // Adapted: years of slow track versus a five-week burst of milestones after the event.
    A("P2#136", [
      L("r1", [20, 150], [226, 150], { col: "#aab4bf", sw: 12 }),
      L("r2", [254, 150], [382, 150], { col: C.orange, sw: 12 }),
      P("yl", "pill", 124, 104, { w: 200, h: 34, lab: "Years of weakness", tone: "off", ls: 14 }),
      P("fw", "pill", 318, 104, { w: 128, h: 34, lab: "Five weeks", tone: "warn", ls: 14 }),
      P("bo", "bolt", 240, 150, { sz: 46 }),
      P("m1", "pill", 290, 212, { w: 196, h: 38, lab: "Programme funded", ic: "coin", tone: "gold" }),
      P("m2", "pill", 290, 260, { w: 196, h: 38, lab: "Director appointed", ic: "person", tone: "plum" }),
      P("m3", "pill", 290, 308, { w: 196, h: 38, lab: "Deadline set", ic: "cal", tone: "teal" }),
      P("b1", "bar", 98, 236, { w: 164, lab: "Response before", max: 1, col: C.grey, ls: 14 }),
      P("b2", "bar", 98, 306, { w: 164, lab: "Response after", max: 1, col: C.green, ls: 14 })
    ], [
      { t: "Five weeks to commit", on: ["r1", "r2", "yl", "fw", "bo", "m1", "m2", "m3"], hot: ["m1", "m2", "m3"], f: "m2" },
      { t: "Same weaknesses, new response", on: ["b1", "b2"], s: { b1: { lv: 0.08 }, b2: { lv: 0.95 }, yl: { st: "warn" } }, hot: ["b2"] }
    ]),
    // Act 5 (moments 12-13). Benchmark Part2 #131 "Transition end"
    // https://observablehq.com/@d3/transition-end
    // Adapted: a slow continuous state (driver) beside a single sequenced event that recolours everything (trigger).
    A("P2#131", [
      P("pl", "panel", 104, 214, { w: 184, h: 304, lab: "The driver", fill: "#fdf1ea" }),
      P("pr", "panel", 296, 214, { w: 184, h: 304, lab: "The trigger", fill: "#fff7e3", col: C.gold }),
      P("tk", "tank", 104, 216, { w: 92, h: 120, lab: "Ongoing condition", ls: 14 }),
      P("dq", "pill", 104, 330, { w: 166, lab: "Why change?", tone: "sky" }),
      P("bo", "bolt", 296, 186, { sz: 92, lab: "Specific event", ls: 14 }),
      P("nq", "pill", 296, 330, { w: 166, lab: "Why now?", tone: "warn" })
    ], [
      { t: "Trigger: act now", on: ["pr", "bo", "nq"], hot: ["bo"] },
      { t: "Desirable versus urgent", on: ["pl", "tk", "dq"], s: { tk: { lv: 0.62 } }, hot: ["dq", "nq"], f: "dq" }
    ]),
    // Act 6 (moments 14-17). Benchmark B1 #64 "Kurzgesagt production method"
    // https://kurzgesagt.org/what-we-do
    // Adapted: narration-led physical metaphor â€” decaying hidden wiring, then an alarm that forces a response.
    A("B1#64", [
      L("hs", null, null, { d: "M24 146L124 64L224 146V352H24Z", col: C.navy, sw: 4 }),
      L("wr", null, null, { d: "M46 336V256H92l9-14 9 14H160V196H202V336", col: C.gold, sw: 5 }),
      P("sp1", "icon", 101, 236, { ic: "bolt", sz: 26, col: C.orange, idle: "v2flash" }),
      P("sp2", "icon", 182, 192, { ic: "bolt", sz: 26, col: C.orange, idle: "v2flash" }),
      P("al", "icon", 124, 150, { ic: "bell", sz: 30, col: "#ffffff", disc: C.red, idle: "v2shake" }),
      P("pp1", "person", 70, 316, { sz: 0.62, col: C.teal }),
      P("pp2", "person", 118, 316, { sz: 0.62, col: C.plum, skin: C.skin2 }),
      P("wp", "pill", 314, 230, { w: 152, h: 48, lab: "Underlying|problem", ls: 14, tone: "warn" }),
      P("ap", "pill", 314, 120, { w: 152, h: 48, lab: "Immediate|response", ls: 14, tone: "bad" }),
      P("ug", "gauge", 314, 332, { r: 40, lab: "Urgency felt", ls: 14 })
    ], [
      { t: "Old wiring, new alarm", on: ["hs", "wr", "sp1", "sp2", "al", "pp1", "pp2"], s: { wr: { st: "warn" } }, hot: ["al"] },
      { t: "Problem versus alarm", on: ["wp", "ap"], s: { pp1: { x: 160, mood: "worry", walk: 1, d: 1.2 }, pp2: { x: 196, mood: "worry", walk: 1, d: 1.2 } }, hot: ["wp", "ap"], f: "ap" },
      { t: "Alarm changes urgency", on: ["ug"], s: { ug: { lv: 0.92 } }, hot: ["ug"] },
      { t: "Qasr's alarm: regulation", s: { wp: { lab: "Fragmented|systems" }, ap: { lab: "Regulatory|announcement", st: "warn" }, pp1: { walk: 0 }, pp2: { walk: 0 } }, hot: ["wp", "ap"], f: "ap" }
    ]),
    // Act 7 (moments 18-20). Benchmark Part2 #099 "Bottling factory"
    // https://lottiefiles.com/free-animation/bottling-factory-53Q3SoGu0x
    // Adapted: items advance along a line to an inspection station; only the required evidence counts.
    A("P2#099", [
      L("belt", [18, 252], [382, 252], { col: "#7e8a96", sw: 14, tok: "dot", tc: "#c9d1d9", tn: 6, dur: 3.5 }),
      P("fu", "icon", 76, 104, { ic: "coin", sz: 44, col: C.gold, lab: "Funding unlocked", ls: 14 }),
      L("fa", [104, 104], [148, 118], { col: C.gold, sw: 4, arrow: 1 }),
      P("gc", "dept", 200, 124, { w: 96, h: 78, ic: "search", lab: "How it's judged", ls: 14 }),
      P("tray", "panel", 200, 330, { w: 230, h: 62, fill: "#f3f5f7", dash: "6 5", stroke: "#9aa6b2" }),
      P("e1", "pill", 70, 222, { w: 196, h: 40, lab: "Record within 24h", ic: "doc", tone: "goal", ls: 14 }),
      P("e2", "pill", 70, 222, { w: 172, h: 40, lab: "Better arrivals", ic: "star", tone: "mint" }),
      P("rq", "badge", 336, 120, { tone: "unk", lab: "Required proof" })
    ], [
      { t: "Funding shapes judgement", on: ["belt", "fu", "fa", "gc"], s: { belt: { flow: 1 } }, hot: ["gc"] },
      { t: "Evidence of compliance", on: ["e1", "rq"], s: { gc: { lab: "Compliance evidence" }, e1: { x: 200, y: 222, d: 1.2 } }, hot: ["e1"] },
      { t: "Extras can't replace it", on: ["e2", "tray"], s: { e1: { x: 288, y: 222, d: 1 }, e2: { x: 200, y: 330, lab: "Welcome extra", d: 1.4 } }, hot: ["e2", "e1"], f: "e2" }
    ]),
    // Act 8 (moments 21-23). Benchmark Part2 #109 "teamwork"
    // https://lottiefiles.com/free-animation/teamwork-QNAnTVBTr6
    // Adapted: a new person joins the scene and re-frames the existing team's problems.
    A("P2#109", [
      P("ceo", "person", 296, 200, { sz: 1.5, col: C.plum, lab: "New chief executive", ls: 14 }),
      P("st", "icon", 326, 150, { ic: "star", sz: 28, col: C.gold }),
      P("pc", "card", 104, 196, { w: 176, h: 150, ic: "warn", lab: "Existing|problems", col: C.red, is: 44 }),
      P("vb", "bubble", 290, 92, { w: 196, lab: "Show visible progress", tail: "b", tx: 6, col: C.plum, ls: 14 }),
      P("dw", "pill", 104, 326, { w: 184, lab: "Drivers: why needed", tone: "sky", ls: 14 }),
      P("lw", "pill", 296, 326, { w: 184, lab: "Leader: why now", tone: "warn", ls: 14 })
    ], [
      { t: "A new chief executive", on: ["ceo", "st"], s: { ceo: { walk: 1 } }, hot: ["ceo"] },
      { t: "Wants visible progress", on: ["pc", "vb"], s: { ceo: { walk: 0, mood: "happy" } }, hot: ["vb"] },
      { t: "Drivers stay, timing changes", on: ["dw", "lw"], hot: ["dw", "lw"], f: "lw" }
    ]),
    // Act 9 (moments 24-27). Benchmark Part2 #113 "Infographic Chart Creator"
    // https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/
    // Adapted: bars grow and update against a target line; then expectation chips update per programme type.
    A("P2#113", [
      P("bt", "pill", 200, 84, { w: 238, lab: "Board cost target", ic: "gavel", tone: "solid" }),
      P("cb", "bar", 200, 160, { w: 320, lab: "Operating costs", max: 1, col: C.red }),
      L("tl", [244, 136], [244, 190], { col: C.ink, sw: 3, brk: 1 }),
      P("tg", "pill", 244, 214, { w: 132, h: 32, lab: "Target level", tone: "goal", ls: 14 }),
      P("ap", "clock", 90, 300, { r: 36, lab: "Agreed period" }),
      P("sv", "pill", 270, 300, { w: 214, lab: "Savings to prove", ic: "shield", tone: "goal" }),
      P("c1", "card", 104, 150, { w: 176, h: 120, ic: "coin", lab: "Savings|programme", col: C.gold, is: 38 }),
      P("c2", "card", 296, 150, { w: 176, h: 120, ic: "doc", lab: "Compliance|programme", col: C.navy, is: 38 }),
      P("x1", "pill", 104, 260, { w: 176, h: 36, lab: "Who sponsors", tone: "unk", ls: 14 }),
      P("x2", "pill", 296, 260, { w: 176, h: 36, lab: "Budget decisions", tone: "unk", ls: 14 }),
      P("x3", "pill", 104, 310, { w: 176, h: 36, lab: "Deadline type", tone: "unk", ls: 14 }),
      P("x4", "pill", 296, 310, { w: 176, h: 36, lab: "Evidence required", tone: "unk", ls: 14 })
    ], [
      { t: "A demanding cost target", on: ["bt", "cb", "tl", "tg"], s: { cb: { lv: 0.9, v: "Too high" } }, hot: ["bt"] },
      { t: "Prove savings in time", on: ["ap", "sv"], s: { cb: { lv: 0.62, v: "Must fall", st: "goal" }, ap: { h: 0.7, run: 1 } }, hot: ["sv"] },
      { t: "Different expectations", off: ["bt", "cb", "tl", "tg", "ap", "sv"], on: ["c1", "c2"], hot: ["c1", "c2"], f: "c1" },
      { t: "Four things change", on: ["x1", "x2", "x3", "x4"], hot: ["x1", "x2", "x3", "x4"], f: "x4" }
    ]),
    // Act 10 (moments 28-31). Benchmark Part1 #073 "The Trouble With Food Safety Audits"
    // https://www.nytimes.com/interactive/projects/documents/food-safety-peanut-inspection
    // Adapted: a document is highlighted line by line, with callouts explaining what the evidence reveals.
    A("P1#073", [
      P("hist", "doc", 118, 214, { w: 204, h: 290, title: "Business|history", ts: 13, lines: ["Satisfaction fell", "Rival mobile check-in", "Room costs rose", "Accounts lost", "Rule announced"], ls: 14, stamps: ["Decisive event"], sy: 120 }),
      P("nl", "pill", 306, 96, { w: 156, lab: "Not just labels", tone: "off", ls: 14 }),
      P("mg", "icon", 260, 300, { ic: "search", sz: 46, col: C.plum, idle: "v2float" }),
      P("rc", "card", 306, 206, { w: 156, h: 136, ic: "handshake", lab: "Real|commitment", sub: "Funding expectations", col: C.green, is: 40 }),
      P("d1", "pill", 306, 140, { w: 158, h: 38, lab: "Different priorities", tone: "warn", ls: 13 }),
      P("d2", "pill", 306, 200, { w: 158, h: 38, lab: "Different risks", tone: "warn", ls: 13 }),
      P("d3", "pill", 306, 260, { w: 158, h: 38, lab: "Different success", tone: "warn", ls: 13 })
    ], [
      { t: "More than classifying", on: ["hist", "nl"], s: { hist: { hl: { 0: "b", 1: "b", 2: "b", 3: "b", 4: "b" } } }, hot: ["nl"] },
      { t: "Reveals the real commitment", off: ["nl"], on: ["rc", "mg"], s: { mg: { x: 236, y: 330 } }, hot: ["rc"] },
      { t: "Qasr's decisive event", s: { hist: { hl: { 0: "y", 1: "y", 2: "y", 3: "y", 4: "r" }, stamp: 0 }, rc: { lab: "Regulation|decided" } }, hot: ["hist"] },
      { t: "Triggers set success terms", off: ["rc", "mg"], on: ["d1", "d2", "d3"], hot: ["d1", "d2", "d3"], f: "d2" }
    ])
  ]);

  // =====================================================================
  // W2O1c Â· Reading the real brief behind a trigger â€” 36 moments, 10 acts
  // =====================================================================
  W.VL_SCENES["W2O1c"] = scene("W2O1c", [
    // Act 1 (moments 0-3). Benchmark Part2 #082 "Motion Design Process"
    // https://www.behance.net/gallery/53752435/Motion-Design-Process
    // Adapted: production stages shown with the team member who will run them; the brief is built line by line.
    A("P2#082", [
      P("pm", "person", 86, 222, { sz: 1.45, col: C.navy, lab: "Programme manager", ls: 14 }),
      P("dt", "pill", 116, 96, { w: 200, lab: "Driver vs trigger", ic: "check", tone: "ok", ls: 14 }),
      P("an", "doc", 288, 216, { w: 192, h: 276, title: "Programme|announcement", ts: 13, lines: ["Better efficiency", "Customer experience", "Consistent working", "Why now: missing"], ls: 14, stamps: ["Board approved"], stc: C.green, sy: 102 }),
      P("bq", "bubble", 96, 116, { w: 150, lab: "But why now?", tail: "b", tx: -10, col: C.red })
    ], [
      { t: "Why this matters", on: ["pm", "dt"], hot: ["dt"] },
      { t: "Board approves programme", off: ["dt"], on: ["an"], s: { an: { rows: 0, stamp: 0 }, pm: { walk: 1 } }, hot: ["an"] },
      { t: "Three promised benefits", s: { an: { rows: 3, hl: { 0: "g", 1: "g", 2: "g" }, stamp: -1 }, pm: { walk: 0, mood: "happy" } }, hot: ["an"] },
      { t: "Benefits don't explain timing", on: ["bq"], s: { an: { rows: 4, hl: { 0: "g", 1: "g", 2: "g", 3: "r" } }, pm: { mood: "worry" } }, hot: ["bq"], f: "an" }
    ]),
    // Act 2 (moments 4-7). Benchmark Part2 #135 "Timeline by The Creators"
    // https://motionarray.com/after-effects-templates/timeline/
    // Adapted: a milestone (the event) is revealed, then pinned as an immovable date that frames the scope.
    A("P2#135", [
      P("mg", "icon", 300, 110, { ic: "search", sz: 50, col: C.plum, idle: "v2float" }),
      P("ev", "card", 106, 150, { w: 184, h: 140, ic: "bolt", lab: "Regulatory|announcement", col: C.orange, is: 44 }),
      P("cal", "cal", 300, 126, { w: 120, h: 96, lab: "January start", due: 2 }),
      P("lk", "lock", 352, 90, { sz: 1.1 }),
      P("ck", "clock", 300, 266, { r: 38, lab: "24-hour record" }),
      P("rq", "pill", 106, 278, { w: 196, lab: "Required outcome", ic: "lock", tone: "goal" }),
      P("n1", "pill", 106, 330, { w: 180, lab: "Negotiable extra", tone: "sky", ls: 14 }),
      P("n2", "pill", 300, 340, { w: 180, lab: "Negotiable extra", tone: "off", ls: 14 })
    ], [
      { t: "Find the decisive event", on: ["mg", "ev"], s: { mg: { x: 210, y: 150, d: 1.2 } }, hot: ["ev"] },
      { t: "Qasr's deadline appears", off: ["mg"], on: ["cal", "ck"], s: { cal: { due: 1, fill: 2 }, ck: { h: 1, st: "goal" } }, hot: ["cal"] },
      { t: "January cannot move", on: ["lk"], s: { lk: { st: "lock" }, cal: { due: 1 } }, hot: ["lk"] },
      { t: "Extras negotiable, outcome not", on: ["rq", "n1", "n2"], s: { ck: { dim: 1 } }, hot: ["rq"] }
    ]),
    // Act 3 (moments 8-10). Benchmark B1 #60 "The Pudding pockets"
    // https://pudding.cool/2018/08/pockets/
    // Adapted: items are dropped into two outlined containers; one container stays empty.
    A("B1#60", [
      P("b1", "panel", 104, 160, { w: 184, h: 176, lab: "Rule met", fill: C.mint, col: C.green }),
      P("b2", "panel", 296, 160, { w: 184, h: 176, lab: "Process improved", fill: "#f1f5f9", stroke: "#9aa6b2", dash: "7 6" }),
      P("rc", "pill", 104, 178, { w: 164, h: 52, lab: "Records|within 24h", ic: "doc", tone: "goal", ls: 14 }),
      P("ho", "pill", 296, 178, { w: 164, h: 52, lab: "Handoffs|unchanged", ic: "x", tone: "bad", ls: 14 }),
      P("tr", "person", 104, 314, { col: C.teal, bag: 1, mood: "sad" }),
      P("tb", "bubble", 250, 304, { w: 176, lab: "Still frustrated", tail: "l", col: C.red })
    ], [
      { t: "Minimum compliance risk", on: ["b1", "b2", "rc"], hot: ["rc"] },
      { t: "Handoffs left unchanged", on: ["ho"], hot: ["ho"] },
      { t: "Traveller still frustrated", on: ["tr", "tb"], s: { tr: { wait: 1 } }, hot: ["tb"] }
    ]),
    // Act 4 (moments 11-14). Benchmark Part2 #089 "Git Workflow 1"
    // https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5
    // Adapted: two branches meet at a merge point; first they clash, then get patched rather than redesigned.
    A("P2#089", [
      P("ca", "pill", 96, 86, { w: 168, lab: "Company A", ic: "hotel", tone: "sky" }),
      P("cb", "pill", 304, 86, { w: 168, lab: "Company B", ic: "hotel", tone: "unk" }),
      P("hs", "icon", 200, 86, { ic: "handshake", sz: 36, col: C.green }),
      L("ta", null, null, { d: "M96 108C96 180 196 170 196 236", col: C.navy, sw: 7, tok: "dot", tc: C.navy, tn: 2 }),
      L("tb", null, null, { d: "M304 108C304 180 204 170 204 236", col: C.plum, sw: 7, tok: "dot", tc: C.plum, tn: 2 }),
      P("g1", "pill", 92, 176, { w: 128, h: 36, lab: "Procedure A", tone: "sky", ls: 14 }),
      P("g2", "pill", 308, 176, { w: 128, h: 36, lab: "Procedure B", tone: "unk", ls: 14 }),
      P("cl", "icon", 200, 246, { ic: "bolt", sz: 44, col: C.orange, idle: "v2flash" }),
      L("tg", [200, 270], [200, 300], { col: C.gold, sw: 4, arrow: 1, brk: 1 }),
      P("ow", "pill", 200, 326, { w: 220, lab: "One way of working", ic: "target", tone: "goal" }),
      P("pa", "stamp", 200, 250, { lab: "Claimed consistent", r: -7 })
    ], [
      { t: "A merger begins", on: ["ca", "cb", "hs"], hot: ["hs"] },
      { t: "Incompatible procedures", on: ["ta", "tb", "g1", "g2", "cl"], s: { ta: { flow: 1 }, tb: { flow: 1 } }, hot: ["cl"] },
      { t: "One way, quickly", on: ["tg", "ow"], hot: ["ow"] },
      { t: "Conflicts hidden, not resolved", on: ["pa"], s: { ow: { st: "bad", lab: "Still two ways" }, tg: { st: "bad" } }, hot: ["pa"] }
    ]),
    // Act 5 (moments 15-17). Benchmark Part2 #119 "Infographics V2 by Typoland"
    // https://motionarray.com/after-effects-templates/infographics-v2-556482/
    // Adapted: statistic modules scale in; a claimed figure and an evidenced figure are set side by side.
    A("P2#119", [
      P("bd", "pill", 200, 84, { w: 236, lab: "Cut operating costs", ic: "gavel", tone: "solid" }),
      P("oc", "bar", 200, 156, { w: 320, lab: "Operating costs", max: 1, col: C.red }),
      P("fd", "pill", 200, 222, { w: 236, lab: "Defensible savings", ic: "shield", tone: "goal" }),
      P("sl", "bar", 200, 290, { w: 320, lab: "Claimed in slides", max: 1, col: C.grey, v: "Not proven" }),
      P("ev", "bar", 200, 350, { w: 320, lab: "Backed by evidence", max: 1, col: C.green, v: "Evidence backed" })
    ], [
      { t: "Board demands cost cuts", on: ["bd", "oc"], s: { oc: { lv: 0.92, v: "Too high" } }, hot: ["bd"] },
      { t: "Savings must be defensible", on: ["fd"], hot: ["fd"] },
      { t: "Evidence, not slides", on: ["sl", "ev"], s: { sl: { lv: 0.75 }, ev: { lv: 0.4 } }, hot: ["ev"] }
    ]),
    // Act 6 (moments 18-20). Benchmark Part2 #130 "Animated line chart lesson"
    // https://observablehq.com/@d3/learn-d3-animation
    // Adapted: a time series is traced left to right â€” and stops, because nobody keeps tracking it.
    A("P2#130", [
      P("ch", "line", 200, 148, { w: 320, h: 118, pts: [0.15, 0.72, 0.72, 0.72, 0.72, 0.72], col: C.green, marks: [{ i: 1, lab: "Claimed at launch", w: 158, y: -46, col: C.green, dx: 30 }, { i: 4, lab: "Never tracked", w: 140, y: 20, col: C.red }] }),
      P("s1", "person", 70, 304, { sz: 0.8, col: C.teal }),
      P("s2", "person", 120, 304, { sz: 0.8, col: C.plum, skin: C.skin2 }),
      P("s3", "person", 170, 304, { sz: 0.8, col: C.gold }),
      P("hc", "pill", 300, 268, { w: 176, h: 50, lab: "Headcount|in scope", ic: "users", tone: "unk", ls: 14 }),
      P("jb", "bubble", 120, 238, { w: 132, lab: "Our jobs?", tail: "b", col: C.red }),
      P("rs", "pill", 300, 336, { w: 176, lab: "Resistance grows", tone: "bad", ls: 14 })
    ], [
      { t: "Claimed, never tracked", on: ["ch"], s: { ch: { draw: 0.32, mk: 2 } }, hot: ["ch"] },
      { t: "Headcount, often unspoken", on: ["s1", "s2", "s3", "hc"], hot: ["hc"] },
      { t: "Fear breeds resistance", on: ["jb", "rs"], s: { s1: { mood: "worry" }, s2: { mood: "worry" }, s3: { mood: "angry" } }, hot: ["rs"] }
    ]),
    // Act 7 (moments 21-25). Benchmark Part2 #127 "Streamgraph transitions"
    // https://observablehq.com/@d3/streamgraph-transitions
    // Adapted: a surging layer rises above a waterline while the layers that feed it stay below the surface.
    A("P2#127", [
      P("wt", "panel", 200, 296, { w: 384, h: 152, fill: "#dceaf6", rx: 14 }),
      P("ch", "line", 128, 116, { w: 220, h: 100, pts: [0.15, 0.2, 0.18, 0.9, 0.85], col: C.red, xlab: "Customer complaints" }),
      P("cu", "icon", 324, 128, { ic: "users", sz: 56, col: C.navy, lab: "Customers waiting", ls: 14 }),
      P("tv", "person", 324, 134, { col: C.teal, bag: 1, mood: "sad", lab: "Qasr traveller", ls: 14 }),
      P("vr", "pill", 128, 228, { w: 196, lab: "Visible response", ic: "bell", tone: "warn" }),
      P("r1", "pill", 128, 292, { w: 220, h: 50, lab: "Process|conditions", ic: "gear", tone: "solid", ls: 14 }),
      P("r2", "pill", 296, 346, { w: 176, h: 50, lab: "Departmental|handoffs", ic: "x", tone: "solid", ls: 14 }),
      P("ck", "crack", 128, 308, { d: "M-60 10l14 -8 10 10 14-10 12 9 14-8" }),
      P("rp", "pill", 300, 238, { w: 176, h: 50, lab: "Repair|connections", ic: "loop", tone: "goal", ls: 14 })
    ], [
      { t: "Complaints suddenly spike", on: ["ch", "wt"], s: { ch: { draw: 1 } }, hot: ["ch"] },
      { t: "Demand for visible response", on: ["cu", "vr"], hot: ["vr"] },
      { t: "Root causes untouched", on: ["r1", "ck"], s: { vr: { dim: 1 } }, hot: ["r1"] },
      { t: "The traveller's real causes", off: ["cu"], on: ["tv", "r2"], s: { r1: { lab: "Disconnected|information" }, vr: { dim: 0 } }, hot: ["r1", "r2"], f: "tv" },
      { t: "Apology isn't repair", on: ["rp"], s: { vr: { lab: "Apology offered", st: "off" } }, hot: ["rp", "vr"], f: "rp" }
    ]),
    // Act 8 (moments 26-29). Benchmark Part2 #080 "Creative Design Workflow Animation"
    // https://dribbble.com/shots/27476599-Creative-Design-Workflow-Animation
    // Adapted: shapes are assembled into a composition â€” but here the vendor's template shapes the process.
    A("P2#080", [
      P("wr", "icon", 96, 170, { ic: "warn", sz: 96, col: C.orange, lab: "Technology trap", ls: 15 }),
      P("hc", "bar", 290, 150, { w: 190, lab: "Most common", max: 1, col: C.orange }),
      P("hd", "bar", 290, 226, { w: 190, lab: "Most damaging", max: 1, col: C.red }),
      P("od", "db", 84, 112, { lab: "Old system" }),
      L("rp", [130, 106], [266, 106], { col: C.navy, sw: 5, arrow: 1, tok: "dot", tc: C.navy, tn: 2 }),
      P("nd", "db", 316, 112, { lab: "New system" }),
      L("vf", [40, 236], [360, 236], { col: C.plum, sw: 5 }),
      P("v1", "dept", 80, 236, { w: 62, h: 52, ic: "gear", col: C.plum }),
      P("v2", "dept", 200, 236, { w: 62, h: 52, ic: "gear", col: C.plum }),
      P("v3", "dept", 320, 236, { w: 62, h: 52, ic: "gear", col: C.plum }),
      P("vw", "pill", 200, 186, { w: 200, h: 34, lab: "Vendor's workflow", tone: "plum", ls: 14 }),
      P("cn", "pill", 106, 326, { w: 184, lab: "Customer needs", ic: "users", tone: "off", ls: 14 }),
      P("bd", "pill", 298, 326, { w: 176, lab: "Business design", ic: "target", tone: "sky", ls: 14 })
    ], [
      { t: "The riskiest trigger", on: ["wr", "hc", "hd"], s: { hc: { lv: 0.92 }, hd: { lv: 0.92 } }, hot: ["wr"] },
      { t: "Old system must go", off: ["wr", "hc", "hd"], on: ["od", "rp", "nd"], s: { od: { st: "bad" }, rp: { flow: 1 } }, hot: ["nd"] },
      { t: "Vendor workflow adopted", on: ["vf", "v1", "v2", "v3", "vw", "cn"], s: { cn: { lab: "Needs unexamined" } }, hot: ["vw", "cn"], f: "vw" },
      { t: "Configuration decides process", on: ["bd"], s: { bd: { lab: "Settings decide", st: "warn" } }, hot: ["bd"] }
    ]),
    // Act 9 (moments 30-32). Benchmark Part2 #090 "Multi-Step Icon Animation"
    // https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
    // Adapted: one step activates after another â€” each trigger lights the expectation it creates.
    A("P2#090", [
      P("sw", "card", 100, 196, { w: 160, h: 150, ic: "db", lab: "New software", col: C.plum, is: 46 }),
      P("ne", "icon", 200, 196, { ic: "x", sz: 26, col: C.red, disc: C.blush }),
      P("mp", "card", 300, 196, { w: 160, h: 150, ic: "loop", lab: "Managed|process", col: C.green, is: 46 }),
      P("t1", "pill", 96, 96, { w: 172, h: 38, lab: "New regulation", ls: 14, tone: "sky" }),
      P("t2", "pill", 96, 150, { w: 172, h: 38, lab: "A merger", ls: 14, tone: "sky" }),
      P("t3", "pill", 96, 204, { w: 172, h: 38, lab: "Cost target", ls: 14, tone: "sky" }),
      P("t4", "pill", 96, 258, { w: 172, h: 38, lab: "Complaint surge", ls: 14, tone: "sky" }),
      P("t5", "pill", 96, 312, { w: 172, h: 38, lab: "New system", ls: 14, tone: "sky" }),
      L("k1", [184, 96], [204, 96], { col: C.navy, sw: 3, arrow: 1 }),
      L("k2", [184, 150], [204, 150], { col: C.navy, sw: 3, arrow: 1 }),
      L("k3", [184, 204], [204, 204], { col: C.navy, sw: 3, arrow: 1 }),
      L("k4", [184, 258], [204, 258], { col: C.navy, sw: 3, arrow: 1 }),
      L("k5", [184, 312], [204, 312], { col: C.navy, sw: 3, arrow: 1 }),
      P("x1", "pill", 300, 96, { w: 176, h: 38, lab: "Compliance proof", ls: 14, tone: "goal" }),
      P("x2", "pill", 300, 150, { w: 176, h: 38, lab: "One way", ls: 14, tone: "goal" }),
      P("x3", "pill", 300, 204, { w: 176, h: 38, lab: "Defensible savings", ls: 14, tone: "goal" }),
      P("x4", "pill", 300, 258, { w: 176, h: 38, lab: "Causes removed", ls: 14, tone: "goal" }),
      P("x5", "pill", 300, 312, { w: 176, h: 38, lab: "Design first", ls: 14, tone: "goal" }),
      P("wq", "card", 200, 206, { w: 270, h: 190, ic: "q", lab: "Why act now?", sub: "Ask before accepting", col: C.plum, is: 62 })
    ], [
      { t: "Software isn't process", on: ["sw", "ne", "mp"], hot: ["mp"] },
      { t: "Trigger shapes expectations", off: ["sw", "ne", "mp"], on: ["t1", "t2", "t3", "t4", "t5", "k1", "k2", "k3", "k4", "k5", "x1", "x2", "x3", "x4", "x5"], hot: ["x1", "x2", "x3", "x4", "x5"], f: "x3" },
      { t: "First ask: why now?", on: ["wq"], s: { t1: { dim: 1 }, t2: { dim: 1 }, t3: { dim: 1 }, t4: { dim: 1 }, t5: { dim: 1 }, x1: { dim: 1 }, x2: { dim: 1 }, x3: { dim: 1 }, x4: { dim: 1 }, x5: { dim: 1 } }, hot: ["wq"] }
    ]),
    // Act 10 (moments 33-35). Benchmark Part2 #078 "Data Workflow Animation"
    // https://dribbble.com/shots/27247003-Data-Workflow-Animation
    // Adapted: nodes and links activate in sequence; a link that fails to match turns red, then branches diverge.
    A("P2#078", [
      P("fr", "pill", 110, 96, { w: 160, h: 52, lab: "Reason for|funding", ic: "coin", tone: "solid", ls: 14 }),
      P("pb", "pill", 110, 252, { w: 160, h: 52, lab: "Promised|benefits", ic: "star", tone: "sky", ls: 14 }),
      L("mt", [110, 124], [110, 224], { col: C.navy, sw: 5, mid: [110, 174] }),
      P("mq", "badge", 110, 174, { tone: "unk", sz: 1.5 }),
      P("f1", "person", 290, 150, { sz: 0.85, col: C.navy }),
      P("f2", "person", 344, 150, { sz: 0.85, col: C.gold, skin: C.skin2 }),
      P("fl", "pill", 316, 214, { w: 150, h: 34, lab: "The funders", tone: "off", ls: 14 }),
      P("om", "pill", 300, 300, { w: 176, lab: "One expectation met", tone: "mint", ls: 13 }),
      P("qp", "pill", 200, 330, { w: 210, lab: "Qasr's programme", ic: "hotel", tone: "solid" }),
      L("d1", [168, 308], [100, 140], { col: C.navy, sw: 5, arrow: 1, tok: "dot", tc: C.navy, tn: 2 }),
      L("d2", [232, 308], [300, 140], { col: C.green, sw: 5, arrow: 1, tok: "dot", tc: C.green, tn: 2 })
    ], [
      { t: "Do benefits match funding?", on: ["fr", "pb", "mt", "mq"], hot: ["mq"] },
      { t: "Mismatch disappoints funders", off: ["mq"], on: ["f1", "f2", "fl", "om"], s: { mt: { st: "bad", x: 1 }, f1: { mood: "sad" }, f2: { mood: "angry" } }, hot: ["fl"], f: "f1" },
      { t: "Qasr's purposes diverge", off: ["mt", "f1", "f2", "fl", "om"], on: ["qp", "d1", "d2"], s: { fr: { x: 100, y: 108, lab: "Compliance|funding" }, pb: { x: 300, y: 108, lab: "Guest|experience", st: "mint" }, d1: { flow: 1 }, d2: { flow: 1 } }, hot: ["fr", "pb"], f: "qp" }
    ])
  ]);

})();
// END FILE w02-claude-v2-part1.js

// FILE w02-claude-v2-part2.js
// OPER621 Â· Week 2 Â· Drivers and Triggers for BPM â€” animated teaching scenes (v2), part 2 of 4.
// Lesson 2 Â· Qasr Hospitality asks why now. Sections: W2O2a, W2O2b, W2O2c. Standalone: defines every helper it uses, registers its own
// scenes, and appends its own scoped rules to the shared <style id="vl-sc-w02">. Parts load in any order.
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }.
// Design (v2): one beat per narration moment. Each act is an original composition adapted from the
// benchmark named (with URL) in the comment above it; a new act every 3-4 moments; every moment sets an
// explicit object-level state for its own sentence, and the header chip names that sentence's claim in
// 2-4 words. Uses window.gsap when present, CSS transitions otherwise; honours prefers-reduced-motion.
(() => {
  "use strict";
  const SECS = ["W2O2a","W2O2b","W2O2c"];
  // =====================================================================
  // KIT (self-contained in this part; every helper used is defined here)
  // Stage: viewBox 0 0 400 380. Header chip y 8-44, figure area y 54-374.
  // Each act = a composition of "props"; each narration moment = one beat
  // that sets an explicit object-level state for that sentence.
  // =====================================================================
  const W = window;
  W.VL_SCENES = W.VL_SCENES || {};
  const C = {
    navy: "#1d4f7a", ink: "#17283a", orange: "#cf5427", red: "#c0392b", green: "#1f7f5c",
    gold: "#b7820f", plum: "#6a4c93", teal: "#13808a", grey: "#7b8896", pale: "#e3e9ef",
    paper: "#fbf8f2", white: "#ffffff", mint: "#e0f2e9", blush: "#fbe4da", sand: "#f7eed8",
    sky: "#e2eef8", lilac: "#eee8f7", skin: "#e8b88e", skin2: "#b97f55", hair: "#3a2a20"
  };
  // status palettes: [fill, stroke, text]
  const TONE = {
    norm: ["#ffffff", C.navy, C.ink], ok: [C.green, C.green, "#ffffff"], bad: [C.red, C.red, "#ffffff"],
    warn: [C.orange, C.orange, "#ffffff"], goal: ["#fff7e3", C.gold, "#6e4f00"], solid: [C.navy, C.navy, "#ffffff"],
    unk: ["#f1ecf8", C.plum, C.plum], off: ["#eef1f4", "#9aa6b2", "#5d6b78"], mint: [C.mint, C.green, "#125a3f"],
    blush: [C.blush, C.red, "#8a2418"], sky: [C.sky, C.navy, C.navy], plum: [C.plum, C.plum, "#ffffff"],
    gold: [C.gold, C.gold, "#ffffff"], teal: [C.teal, C.teal, "#ffffff"]
  };
  const tone = k => TONE[k] || TONE.norm;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const q = (g, s) => (g ? g.querySelector(s) : null);
  const qa = (g, s) => (g ? Array.prototype.slice.call(g.querySelectorAll(s)) : []);
  const RM = () => { try { return !!W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } };
  let INST = false;

  // ---------- SVG string builders ----------
  function T(x, y, s, o) {
    o = o || {};
    const size = o.sz || 16, lines = String(s).split("|"), lh = Math.round(size * 1.17);
    const y0 = y - (lines.length - 1) * lh / 2;
    return `<text class="v2t ${o.cls || ""}" x="${x}" y="${y0}" data-cy="${y}"${o.mw ? ` data-mw="${o.mw}"` : ""} font-size="${size}" font-weight="${o.w || 700}" fill="${o.fill || C.ink}" text-anchor="${o.a || "middle"}" dominant-baseline="central">` +
      lines.map((l, i) => `<tspan x="${x}" dy="${i ? lh : 0}">${esc(l)}</tspan>`).join("") + `</text>`;
  }
  function setLab(el, s) {
    if (!el || s == null || el._s === s) return;
    el._s = s;
    const x = el.getAttribute("x"), size = +el.getAttribute("font-size"), cy = +el.getAttribute("data-cy");
    const lines = String(s).split("|"), lh = Math.round(size * 1.17);
    el.setAttribute("y", cy - (lines.length - 1) * lh / 2);
    el.innerHTML = lines.map((l, i) => `<tspan x="${x}" dy="${i ? lh : 0}">${esc(l)}</tspan>`).join("");
  }
  function R(x, y, w, h, o) {
    o = o || {};
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx == null ? 10 : o.rx}" fill="${o.fill || "none"}"` +
      (o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 2}"` : "") + (o.dash ? ` stroke-dasharray="${o.dash}"` : "") +
      (o.op != null ? ` opacity="${o.op}"` : "") + (o.cls ? ` class="${o.cls}"` : "") + `/>`;
  }
  function CI(x, y, r, o) {
    o = o || {};
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${o.fill || "none"}"` + (o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 2}"` : "") +
      (o.dash ? ` stroke-dasharray="${o.dash}"` : "") + (o.op != null ? ` opacity="${o.op}"` : "") + (o.cls ? ` class="${o.cls}"` : "") + `/>`;
  }
  function PA(d, o) {
    o = o || {};
    return `<path d="${d}" fill="${o.fill || "none"}" stroke="${o.stroke || "none"}" stroke-width="${o.sw == null ? 3 : o.sw}" stroke-linecap="round" stroke-linejoin="round"` +
      (o.draw ? ` pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"` : "") + (o.dash ? ` stroke-dasharray="${o.dash}"` : "") +
      (o.op != null ? ` opacity="${o.op}"` : "") + (o.cls ? ` class="${o.cls}"` : "") + `/>`;
  }
  // ---------- icon set (24-unit grid) ----------
  function ico(n, x, y, s, col, det) {
    s = s || 28; col = col || C.navy;
    const S = `fill="none" stroke="${col}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"`, F = `fill="${col}"`;
    const P = {
      check: `<path d="M4 12.5l5 5L20 6" ${S.replace("2.4", "3.4")}/>`,
      x: `<path d="M6 6l12 12M18 6L6 18" ${S.replace("2.4", "3.4")}/>`,
      warn: `<path d="M12 2.5L22.5 21h-21z" ${F}/><path d="M12 9v6" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="12" cy="18" r="1.4" fill="#fff"/>`,
      clock: `<circle cx="12" cy="12" r="9.5" ${S}/><path d="M12 6.5V12l4 2.5" ${S}/>`,
      bolt: `<path d="M13.5 1.5L4 14h7l-1.5 8.5L20 9.5h-7z" ${F}/>`,
      doc: `<path d="M6 2.5h8l4.5 4.5v14.5H6z" ${S}/><path d="M9 11h7M9 15h7M9 19h5" ${S}/>`,
      person: `<circle cx="12" cy="7" r="4.2" ${F}/><path d="M3.5 22c0-5.2 3.8-8.6 8.5-8.6s8.5 3.4 8.5 8.6z" ${F}/>`,
      users: `<circle cx="8.5" cy="8" r="3.6" ${F}/><circle cx="16.5" cy="8.5" r="3" ${F} opacity=".7"/><path d="M1.5 21c0-4.4 3.1-7.2 7-7.2s7 2.8 7 7.2z" ${F}/><path d="M14 13.6c4 0 7.5 2.4 7.5 7.4h-4" ${F} opacity=".7"/>`,
      phone: `<rect x="6.5" y="1.5" width="11" height="21" rx="2.5" ${S}/><circle cx="12" cy="18.5" r="1.3" ${F}/><path d="M9.5 9l2 2 3.5-4" ${S}/>`,
      coin: `<circle cx="12" cy="12" r="10" ${F}/><circle cx="12" cy="12" r="6.5" fill="none" stroke="#fff" stroke-width="1.8"/>`,
      lock: `<rect x="4.5" y="10.5" width="15" height="11" rx="2" ${F}/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" ${S}/>`,
      unlock: `<rect x="4.5" y="10.5" width="15" height="11" rx="2" ${F}/><path d="M8 10.5V7.5a4 4 0 0 1 7.6-1.8" ${S}/>`,
      flag: `<path d="M5 22V3" ${S}/><path d="M5 3.5h13l-3 4.5 3 4.5H5z" ${F}/>`,
      eye: `<path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z" ${S}/><circle cx="12" cy="12" r="3.3" ${F}/>`,
      house: `<path d="M2.5 11.5L12 3l9.5 8.5V21h-19z" ${F}/><rect x="9.5" y="14" width="5" height="7" fill="#fff"/>`,
      gear: `<circle cx="12" cy="12" r="4" ${S}/><path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4M4.6 4.6l2.8 2.8M16.6 16.6l2.8 2.8M4.6 19.4l2.8-2.8M16.6 7.4l2.8-2.8" ${S}/>`,
      chart: `<path d="M3 21h18" ${S}/><rect x="5" y="12" width="3.5" height="8" ${F}/><rect x="10.3" y="7" width="3.5" height="13" ${F}/><rect x="15.6" y="3" width="3.5" height="17" ${F}/>`,
      down: `<path d="M3 5l6 7 4-3 8 10" ${S}/><path d="M15 19h6v-6" ${S}/>`,
      up: `<path d="M3 19l6-7 4 3 8-10" ${S}/><path d="M15 5h6v6" ${S}/>`,
      bell: `<path d="M5 17h14l-1.8-2.5V10a5.2 5.2 0 0 0-10.4 0v4.5z" ${F}/><path d="M10 20a2 2 0 0 0 4 0" ${S}/>`,
      qm: `<path d="M8.3 8.6a3.7 3.7 0 1 1 5 3.4c-1 .5-1.3 1.1-1.3 2.4" ${S.replace("2.4", "3")}/><circle cx="12" cy="18.6" r="1.7" ${F}/>`,
      q: `<circle cx="12" cy="12" r="10.5" ${F}/><path d="M9.2 9.3a2.9 2.9 0 1 1 3.9 2.7c-.8.4-1.1.9-1.1 1.8" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="17.4" r="1.4" fill="#fff"/>`,
      star: `<path d="M12 2l3 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.8 5.7 21.4l1.5-7.1L1.8 9.4 9 8.6z" ${F}/>`,
      cal: `<rect x="3" y="4.5" width="18" height="17" rx="2" ${S}/><path d="M3 9.5h18M8 2.5v4M16 2.5v4" ${S}/>`,
      chat: `<path d="M3 4.5h18v12H10l-5 4v-4H3z" ${F}/>`,
      key: `<circle cx="7.5" cy="12" r="4.5" ${S}/><path d="M12 12h10M18 12v4M21 12v3" ${S}/>`,
      db: `<ellipse cx="12" cy="5.5" rx="8" ry="3" ${S}/><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" ${S}/>`,
      seal: `<circle cx="12" cy="10" r="7.5" ${F}/><path d="M8 16l-2 6 4-2 2 3 1-6M16 16l2 6-4-2" ${F}/><path d="M8.6 10.2l2.4 2.4 4.4-4.6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`,
      mail: `<rect x="2.5" y="5" width="19" height="14" rx="2" ${F}/><path d="M3.5 6.5l8.5 6.5 8.5-6.5" fill="none" stroke="#fff" stroke-width="1.8"/>`,
      search: `<circle cx="10" cy="10" r="6.5" ${S}/><path d="M15 15l6 6" ${S.replace("2.4", "3.4")}/>`,
      bed: `<path d="M2.5 19V7M2.5 15h19v4M21.5 15v-3a3 3 0 0 0-3-3h-8v6" ${S}/><circle cx="6.5" cy="11.5" r="2" ${F}/>`,
      hotel: `<rect x="4" y="3" width="16" height="18.5" rx="1.5" ${F}/><path d="M7.5 7h2M11 7h2M14.5 7h2M7.5 11h2M11 11h2M14.5 11h2M7.5 15h2M14.5 15h2" stroke="#fff" stroke-width="1.8"/><rect x="10.5" y="16" width="3" height="5.5" fill="#fff"/>`,
      target: `<circle cx="12" cy="12" r="9.5" ${S}/><circle cx="12" cy="12" r="5" ${S}/><circle cx="12" cy="12" r="1.6" ${F}/>`,
      gavel: `<path d="M13 3l6 6M10.5 5.5l6 6M11.5 4.5l-4 4 6 6 4-4M9.5 10.5L3 17l2.5 2.5L12 13" ${S}/><path d="M13 21h8" ${S}/>`,
      shield: `<path d="M12 2.5l8 3v6c0 5-3.5 8.7-8 10-4.5-1.3-8-5-8-10v-6z" ${F}/><path d="M8.5 12l2.5 2.5 4.5-5" fill="none" stroke="#fff" stroke-width="2"/>`,
      book: `<path d="M3 5c3-1.5 6-1.5 9 0v15c-3-1.5-6-1.5-9 0zM12 5c3-1.5 6-1.5 9 0v15c-3-1.5-6-1.5-9 0z" ${S}/>`,
      loop: `<path d="M20 11a8 8 0 1 0-2.4 6" ${S}/><path d="M20 4v7h-7" ${S}/>`,
      money: `<rect x="2" y="6" width="20" height="12" rx="2" ${F}/><circle cx="12" cy="12" r="3" fill="none" stroke="#fff" stroke-width="1.8"/>`,
      plug: `<path d="M8 3v5M16 3v5M5.5 8h13v3a6.5 6.5 0 0 1-13 0zM12 17.5V22" ${S}/>`,
      link: `<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" ${S}/>`,
      pin: `<path d="M12 22s7-7.2 7-12.5A7 7 0 0 0 5 9.5C5 14.8 12 22 12 22z" ${F}/><circle cx="12" cy="9.5" r="2.6" fill="#fff"/>`,
      reply: `<path d="M10 6L4 12l6 6M4 12h10a6 6 0 0 1 6 6v1" ${S}/>`,
      handshake: `<path d="M2 11l4-4 4 2 3-2 4 1 5 3M6 7l-4 7 3 3M22 11l-4 6-3-1M9 13l3 3M11 11l4 4M13 9l4 4" ${S}/>`
    };
    const body = (P[n] || P.q);
    return `<g transform="translate(${(x - s / 2).toFixed(1)} ${(y - s / 2).toFixed(1)}) scale(${(s / 24).toFixed(4)})">${det ? body.replace(/"#fff"/g, `"${det}"`) : body}</g>`;
  }

  // ---------- motion (GSAP when present, CSS transitions otherwise) ----------
  const EASE = { back: ["back.out(1.7)", "cubic-bezier(.34,1.56,.64,1)"], soft: ["power2.inOut", "cubic-bezier(.45,0,.2,1)"], elastic: ["elastic.out(1,0.55)", "cubic-bezier(.34,1.8,.5,1)"] };
  function go(n, v) {
    if (!n) return;
    const G = W.gsap, inst = INST || RM();
    const x = v.x || 0, y = v.y || 0, r = v.r || 0, s = v.s == null ? 1 : v.s;
    const sx = v.sx == null ? s : v.sx, sy = v.sy == null ? s : v.sy, o = v.o == null ? 1 : v.o, e = EASE[v.e];
    if (G && typeof G.to === "function") {
      const p = { x, y, rotation: r, scaleX: sx, scaleY: sy, opacity: o, transformOrigin: v.to || "50% 50%", overwrite: "auto" };
      if (inst) G.set(n, p); else G.to(n, Object.assign(p, { duration: v.d || 0.7, ease: e ? e[0] : "power3.out", delay: v.dl || 0 }));
      return;
    }
    n.style.transitionDuration = inst ? "0s" : (v.d || 0.7) + "s";
    n.style.transitionDelay = inst ? "0s" : (v.dl || 0) + "s";
    n.style.transitionTimingFunction = e ? e[1] : "";
    n.style.transformOrigin = v.to || "";
    n.style.transform = `translate(${x}px,${y}px) rotate(${r}deg) scale(${sx},${sy})`;
    n.style.opacity = String(o);
  }
  function dash(n, v) { if (n) { n.style.transition = (INST || RM()) ? "none" : ""; n.style.strokeDashoffset = String(v); } }
  function paint(n, f, s, t) { if (!n) return; if (f != null) n.style.fill = f; if (s != null) n.style.stroke = s; if (t != null) n.style.strokeDasharray = t; }
  const shown = (n, on) => { if (n) n.style.display = on ? "" : "none"; };
  const reflow = n => { if (n) void n.getBoundingClientRect(); };
  function restart(n, cls) { if (!n || INST || RM()) return; n.classList.remove(cls); reflow(n); n.classList.add(cls); }

  // ---------- props ----------
  const LAB = (x, y, s, o) => T(x, y, s, Object.assign({}, o || {}, { cls: "lab " + ((o && o.cls) || "") }));
  const K = {};
  const MOODS = {
    happy: `<path class="mo mo-happy" d="M-5.5 -15.5Q0 -10 5.5 -15.5" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>`,
    ok: `<path class="mo mo-ok" d="M-4.5 -14.5H4.5" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>`,
    sad: `<path class="mo mo-sad" d="M-5.5 -12Q0 -17.5 5.5 -12" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>`,
    worry: `<g class="mo mo-worry"><path d="M-5 -13.5q2.5-2.5 5 0t5 0" fill="none" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/><path d="M-8 -27l5-2M8 -27l-5-2" stroke="${C.ink}" stroke-width="1.8" stroke-linecap="round"/></g>`,
    angry: `<g class="mo mo-angry"><path d="M-5.5 -12Q0 -17 5.5 -12" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/><path d="M-8 -29l5 2.5M8 -29l-5 2.5" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/></g>`
  };
  K.person = {
    b(p) {
      const z = p.sz || 1, col = p.col || C.navy;
      const fig = `<g class="pf"><g transform="scale(${z})">` +
        (p.bag ? `<rect x="17" y="4" width="17" height="20" rx="3" fill="${C.gold}"/><path d="M21.5 4v-4h8v4" stroke="${C.gold}" stroke-width="2.4" fill="none"/>` : "") +
        `<path d="M-18 24V7c0-10 8-15.5 18-15.5S18-3 18 7v17z" fill="${col}"/>` +
        `<circle cx="0" cy="-22" r="13" fill="${p.skin || C.skin}"/>` +
        `<path d="M-13.2 -23.5c0-9.5 6-13.8 13.2-13.8s13.2 4.3 13.2 13.8c-3.5-5.2-8-6.4-13.2-6.4s-9.7 1.2-13.2 6.4z" fill="${p.hair || C.hair}"/>` +
        `<circle cx="-4.6" cy="-20.5" r="1.9" fill="${C.ink}"/><circle cx="4.6" cy="-20.5" r="1.9" fill="${C.ink}"/>` +
        Object.keys(MOODS).map(k => MOODS[k]).join("") + `</g></g>`;
      return fig + (p.lab ? LAB(0, 26 * z + 18, p.lab, { sz: p.ls || 15, fill: p.lc || C.ink }) : "");
    },
    u(g, p, st) {
      const m = st.mood || p.mood || "ok";
      qa(g, ".mo").forEach(e => shown(e, e.classList.contains("mo-" + m)));
      const f = q(g, ".pf"); if (f) f.classList.toggle("v2bob", !!(st.walk || st.wait) && st.on);
    },
    bb: p => { const z = p.sz || 1; return [-20 * z, -37 * z, 40 * z, 62 * z]; }
  };
  K.hotel = {
    b(p) {
      const w = p.w || 150, h = p.h || 130, x0 = -w / 2, y0 = -h / 2, col = p.col || C.navy;
      let s = PA(`M${x0 - 6} ${y0 + 26}L0 ${y0}L${-x0 + 6} ${y0 + 26}Z`, { fill: col, stroke: col, sw: 2 });
      s += R(x0, y0 + 24, w, h - 24, { fill: "#ffffff", stroke: col, sw: 3, rx: 4 });
      s += R(x0 + 10, y0 + 32, w - 20, 30, { fill: col, rx: 6, cls: "v2c hsign" }) + LAB(0, y0 + 47, p.lab || "", { sz: p.ls || 14, fill: "#ffffff" });
      const top = y0 + 72, rows = Math.max(1, Math.floor((h - 72 - 34) / 26)), cols = Math.max(2, Math.floor((w - 20) / 30));
      const sp = (w - 20) / cols;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) s += R(x0 + 10 + c * sp + sp / 2 - 9, top + r * 26, 18, 16, { fill: "#cfd8e2", rx: 3, cls: "v2c hwin" });
      s += R(-12, h / 2 - 30, 24, 30, { fill: col, rx: 3 });
      return `<g class="hb">${s}</g>`;
    },
    u(g, p, st) {
      qa(g, ".hwin").forEach((e, i) => paint(e, st.lit ? (i % 3 === 1 ? "#f3d27a" : "#f7e3a6") : "#cfd8e2"));
      paint(q(g, ".hsign"), st.st === "bad" ? C.red : st.st === "ok" ? C.green : (p.col || C.navy));
      const b = q(g, ".hb"); if (b) b.classList.toggle("v2shake", !!st.shake && st.on);
    },
    bb: p => [-(p.w || 150) / 2 - 6, -(p.h || 130) / 2, (p.w || 150) + 12, p.h || 130]
  };
  function badge(x, y) {
    return `<g class="bdgg">` + CI(x, y, 13, { fill: C.green, stroke: "#ffffff", sw: 2.5, cls: "v2c bdg" }) +
      ["ok:check", "bad:x", "warn:warn", "lock:lock", "unk:qm", "open:unlock"].map(a => { const [k, ic] = a.split(":"); return `<g class="bi bi-${k}">${ico(ic, x, y, 15, "#ffffff")}</g>`; }).join("") + `</g>`;
  }
  const BADGEC = { ok: C.green, bad: C.red, warn: C.orange, lock: C.red, unk: C.plum, open: C.green };
  function setBadge(g, k) {
    const b = q(g, ".bdgg"); shown(b, !!BADGEC[k]);
    if (!BADGEC[k]) return;
    qa(g, ".bi").forEach(e => shown(e, e.classList.contains("bi-" + k)));
    paint(q(g, ".bdg"), BADGEC[k]);
  }
  K.dept = {
    b(p) {
      const w = p.w || 78, h = p.h || 66, col = p.col || C.navy;
      return R(-w / 2, -h / 2, w, h, { rx: 14, fill: "#ffffff", stroke: col, sw: 3, cls: "v2c dbox" }) + ico(p.ic || "gear", 0, 0, Math.min(w, h) * 0.56, col) +
        badge(w / 2 - 4, -h / 2 + 4) + (p.lab ? LAB(0, h / 2 + (String(p.lab).indexOf("|") >= 0 ? 24 : 16), p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { setBadge(g, st.st); paint(q(g, ".dbox"), st.st === "bad" ? C.blush : st.st === "ok" ? C.mint : "#ffffff", st.st === "bad" ? C.red : (p.col || C.navy)); },
    bb: p => [-(p.w || 78) / 2, -(p.h || 66) / 2, p.w || 78, p.h || 66]
  };
  K.db = {
    b(p) {
      const col = p.col || C.navy;
      return PA("M-26 -22V20a26 8 0 0 0 52 0V-22", { fill: "#ffffff", stroke: col, sw: 3, cls: "v2c dbb" }) +
        `<ellipse cx="0" cy="-22" rx="26" ry="8" fill="${C.sky}" stroke="${col}" stroke-width="3"/>` +
        PA("M-26 -6a26 8 0 0 0 52 0M-26 8a26 8 0 0 0 52 0", { stroke: col, sw: 2 }) +
        `<g class="dloc">${CI(24, -26, 13, { fill: C.gold, stroke: "#ffffff", sw: 2 })}${ico("house", 24, -26, 14, "#ffffff")}</g>` +
        badge(-24, -26) + (p.lab ? LAB(0, 46, p.lab, { sz: p.ls || 14 }) : "");
    },
    u(g, p, st) { shown(q(g, ".dloc"), !!st.loc); setBadge(g, st.st); paint(q(g, ".dbb"), st.st === "bad" ? C.blush : "#ffffff"); },
    bb: () => [-28, -32, 56, 64]
  };
  const HLC = { y: "#f6dd8a", r: "#f4b6a4", g: "#bfe4cf", b: "#cfe0f2" };
  K.doc = {
    b(p) {
      const w = p.w || 160, h = p.h || 200, x0 = -w / 2, y0 = -h / 2, col = p.col || C.navy, L = p.lines || [], n = L.length || p.rows || 6;
      const top = y0 + (p.title ? 50 : 16), rh = p.rh || Math.min(36, (h - (top - y0) - 10) / n);
      let s = PA(`M${x0} ${y0 + 6}a6 6 0 0 1 6 -6H${-x0 - 22}L${-x0} ${y0 + 22}V${-y0 - 6}a6 6 0 0 1 -6 6H${x0 + 6}a6 6 0 0 1 -6 -6Z`, { fill: "#ffffff", stroke: col, sw: 3 });
      s += PA(`M${-x0 - 22} ${y0}V${y0 + 22}H${-x0}`, { stroke: col, sw: 2.5 });
      if (p.title) s += R(x0 + 8, y0 + 8, w - 36, 34, { fill: col, rx: 7 }) + LAB(-14, y0 + 25, p.title, { sz: p.ts || 14, fill: "#ffffff" });
      for (let i = 0; i < n; i++) {
        const y = top + rh * i + rh / 2;
        s += `<g class="rw rw${i}">` + R(x0 + 8, y - rh / 2 + 2, w - 16, rh - 4, { fill: "transparent", rx: 5, cls: `v2c hl hl${i}` });
        s += L[i] ? T(x0 + 16, y, L[i], { a: "start", sz: p.ls || 14, cls: "row", w: 600 }) : R(x0 + 16, y - 4, (w - 40) * (i % 3 === 2 ? 0.6 : 0.9), 8, { fill: C.pale, rx: 4 });
        s += PA(`M${x0 + 10} ${y}H${-x0 - 10}`, { stroke: C.red, sw: 3, draw: 1, cls: `v2d sk sk${i}` }) + `</g>`;
      }
      (p.stamps || []).forEach((t, j) => {
        const sw = Math.max(110, t.replace("|", "").length * 9.4 + 24);
        s += `<g class="stp stp${j}" style="display:none"><g transform="translate(${p.sx || 0} ${p.sy || 0}) rotate(-10)">` + R(-sw / 2, -24, sw, 48, { fill: "rgba(255,255,255,.88)", stroke: p.stc || C.red, sw: 4, rx: 8 }) + T(0, 0, t, { sz: 17, fill: p.stc || C.red, w: 800 }) + `</g></g>`;
      });
      return s;
    },
    u(g, p, st) {
      const n = (p.lines || []).length || p.rows || 6, hl = st.hl || {}, sk = st.sk || [];
      for (let i = 0; i < n; i++) {
        paint(q(g, ".hl" + i), hl[i] ? HLC[hl[i]] : "transparent"); dash(q(g, ".sk" + i), sk.indexOf(i) >= 0 ? 0 : 1);
        const rw = q(g, ".rw" + i); if (rw) { rw.style.transition = (INST || RM()) ? "none" : "opacity .5s"; rw.style.opacity = st.rows == null || i < st.rows ? "1" : "0"; }
      }
      qa(g, ".stp").forEach((e, j) => { const on = st.stamp === j; if (on && e.style.display === "none") { shown(e, true); restart(e, "v2stampin"); } else shown(e, on); });
    },
    bb: p => [-(p.w || 160) / 2, -(p.h || 200) / 2, p.w || 160, p.h || 200]
  };
  // Rotating group with a symmetric invisible disc so CSS fill-box and GSAP 50% 50% both pivot on (0,0).
  const ROT = (cls, r, inner) => `<g class="v2m ${cls}">${CI(0, 0, r, { fill: "transparent" })}${inner}</g>`;
  K.clock = {
    b(p) {
      const r = p.r || 44, col = p.col || C.navy;
      let s = CI(0, 0, r, { fill: "#ffffff", stroke: col, sw: 5, cls: "v2c ckf" });
      s += `<circle class="v2d ckarc" cx="0" cy="0" r="${r * 0.42}" fill="none" stroke="${col}" stroke-width="${r * 0.84}" opacity=".2" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" transform="rotate(-90)"/>`;
      for (let t = 0; t < 12; t++) { const a = t * Math.PI / 6; s += PA(`M${((r - 9) * Math.sin(a)).toFixed(1)} ${(-(r - 9) * Math.cos(a)).toFixed(1)}L${((r - 3) * Math.sin(a)).toFixed(1)} ${(-(r - 3) * Math.cos(a)).toFixed(1)}`, { stroke: col, sw: t % 3 ? 2 : 3.5 }); }
      s += ROT("ckh", r - 4, PA(`M0 5V${-(r - 13)}`, { stroke: C.ink, sw: 5 }));
      s += `<g class="cks">${CI(0, 0, r - 6, { fill: "transparent" })}${PA(`M0 4V${-(r - 8)}`, { stroke: C.red, sw: 2 })}</g>` + CI(0, 0, 5, { fill: C.ink });
      return s + (p.lab ? LAB(0, r + 20, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) {
      const h = st.h || 0, c = st.st === "bad" ? C.red : st.st === "ok" ? C.green : st.st === "goal" ? C.gold : (p.col || C.navy);
      go(q(g, ".ckh"), { r: h * 360, d: 1.1, e: "soft" }); dash(q(g, ".ckarc"), 1 - clamp(h, 0, 1));
      paint(q(g, ".ckarc"), null, c); paint(q(g, ".ckf"), null, c);
      const sc = q(g, ".cks"); if (sc) { sc.classList.toggle("v2spin", !!st.run && st.on); shown(sc, !!st.run); }
    },
    bb: p => { const r = p.r || 44; return [-r, -r, 2 * r, 2 * r]; }
  };
  K.cal = {
    b(p) {
      const w = p.w || 104, h = p.h || 92, col = p.col || C.navy, x0 = -w / 2, y0 = -h / 2;
      let s = R(x0, y0, w, h, { fill: "#ffffff", stroke: col, sw: 3, rx: 10 }) + R(x0, y0, w, 24, { fill: col, rx: 10 }) + R(x0, y0 + 14, w, 10, { fill: col, rx: 0 });
      s += CI(x0 + 22, y0 + 2, 5, { fill: "#ffffff", stroke: col, sw: 2.5 }) + CI(-x0 - 22, y0 + 2, 5, { fill: "#ffffff", stroke: col, sw: 2.5 });
      const cw = (w - 20) / 5, ch = (h - 36) / 3;
      for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) s += R(x0 + 10 + c * cw + 2, y0 + 30 + r * ch + 2, cw - 4, ch - 4, { fill: C.pale, rx: 3, cls: `v2c cc cc${r * 5 + c}` });
      return s + (p.lab ? LAB(0, h / 2 + 18, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { qa(g, ".cc").forEach((e, i) => paint(e, i === (p.due == null ? 13 : p.due) && st.due ? C.red : i < (st.fill || 0) ? (p.col || C.navy) : C.pale)); },
    bb: p => [-(p.w || 104) / 2, -(p.h || 92) / 2, p.w || 104, p.h || 92]
  };
  K.days = {
    b(p) {
      const n = p.n || 21, cols = p.cols || 7, cw = p.cw || 44, gap = 6, rows = Math.ceil(n / cols), W2 = cols * cw + (cols - 1) * gap, H2 = rows * cw + (rows - 1) * gap;
      let s = "";
      for (let i = 0; i < n; i++) {
        const x = -W2 / 2 + (i % cols) * (cw + gap), y = -H2 / 2 + Math.floor(i / cols) * (cw + gap);
        s += R(x, y, cw, cw, { fill: C.pale, rx: 7, cls: `v2c dy dy${i}` });
      }
      s += `<g class="dyo">${R(-W2 / 2 - 7, -H2 / 2 - 7, W2 + 14, H2 + 14, { stroke: C.orange, sw: 4, rx: 12, dash: "10 6" })}</g>`;
      return s + (p.lab ? LAB(0, H2 / 2 + 22, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) {
      const n = p.n || 21, t0 = p.t0 || 0, t1 = p.t1 || 0;
      for (let i = 0; i < n; i++) {
        const team = i >= t0 && i < t1, show = i < (st.n == null ? n : st.n);
        paint(q(g, ".dy" + i), !show ? "transparent" : team && st.team ? C.navy : st.other && !team ? "#e9a48d" : st.all ? "#f4c9a0" : C.pale);
      }
      shown(q(g, ".dyo"), !!st.ring);
    },
    bb: p => { const cols = p.cols || 7, cw = p.cw || 44, rows = Math.ceil((p.n || 21) / cols); return [-(cols * cw + (cols - 1) * 6) / 2, -(rows * cw + (rows - 1) * 6) / 2, cols * cw + (cols - 1) * 6, rows * cw + (rows - 1) * 6]; }
  };
  K.coins = {
    b(p) {
      const n = p.n || 5; let s = "";
      for (let i = 0; i < n; i++) s += `<g class="cn cn${i}"><ellipse cx="0" cy="${-i * 7}" rx="24" ry="8" fill="${C.gold}" stroke="#8a6205" stroke-width="2"/></g>`;
      return s + (p.lab ? LAB(0, 26, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { const n = st.n == null ? (p.n || 5) : st.n; qa(g, ".cn").forEach((e, i) => { e.style.transition = "opacity .4s"; e.style.opacity = i < n ? "1" : "0"; }); },
    bb: p => [-26, -(p.n || 5) * 7 - 4, 52, (p.n || 5) * 7 + 14]
  };
  K.lock = {
    b(p) {
      const z = p.sz || 1.4;
      return `<g transform="scale(${z})"><g class="v2m shk">${PA("M-9 -3V-11a9 9 0 0 1 18 0V-3", { stroke: C.ink, sw: 4.5 })}</g>` +
        R(-14, -4, 28, 23, { fill: C.red, rx: 4, cls: "v2c lkb" }) + CI(0, 6, 3, { fill: "#ffffff" }) + `</g>` + (p.lab ? LAB(0, 23 * z + 16, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { const o = st.st === "open"; go(q(g, ".shk"), { y: o ? -7 : 0, r: o ? -18 : 0, to: "100% 100%" }); paint(q(g, ".lkb"), o ? C.green : C.red); },
    bb: p => { const z = p.sz || 1.4; return [-15 * z, -22 * z, 30 * z, 42 * z]; }
  };
  K.gate = {
    b(p) {
      const w = p.w || 160, col = p.col || C.ink;
      let s = R(-w / 2 - 8, -46, 16, 92, { fill: col, rx: 4 }) + R(w / 2 - 8, -46, 16, 92, { fill: col, rx: 4 });
      s += `<g class="v2m arm">` + R(-w / 2, -40, w, 18, { fill: "#ffffff", stroke: C.red, sw: 3, rx: 9, cls: "v2c armr" });
      for (let i = 0; i < Math.floor(w / 26); i++) s += R(-w / 2 + 8 + i * 26, -37, 12, 12, { fill: C.red, rx: 2, cls: "v2c armst" });
      s += `</g>` + `<g class="glk">${CI(0, 6, 20, { fill: C.red, cls: "v2c glkc" })}<g class="gl1">${ico("lock", 0, 6, 24, "#ffffff")}</g><g class="gl2">${ico("unlock", 0, 6, 24, "#ffffff")}</g></g>`;
      return s + (p.lab ? LAB(0, 66, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) {
      const o = st.st === "open";
      go(q(g, ".arm"), { r: o ? -72 : 0, to: "0% 50%", d: 0.9, e: o ? "back" : undefined });
      qa(g, ".armst").forEach(e => paint(e, o ? C.green : C.red)); paint(q(g, ".armr"), null, o ? C.green : C.red);
      paint(q(g, ".glkc"), o ? C.green : C.red); shown(q(g, ".gl1"), !o); shown(q(g, ".gl2"), o);
    },
    bb: p => [-(p.w || 160) / 2 - 8, -46, (p.w || 160) + 16, 92]
  };
  K.tank = {
    b(p) {
      const w = p.w || 110, h = p.h || 150, col = p.col || C.orange, x0 = -w / 2, y0 = -h / 2;
      let s = R(x0, y0, w, h, { fill: "#ffffff", stroke: C.ink, sw: 4, rx: 18 });
      s += `<rect class="v2m liq" x="${x0 + 8}" y="${y0 + 8}" width="${w - 16}" height="${h - 16}" rx="11" fill="${col}" opacity=".88"/>`;
      s += `<g class="tbub">` + [0, 1, 2].map(i => CI(x0 + 22 + i * (w - 44) / 2, h / 2 - 18, 4 + i, { fill: "#ffffff", op: 0.7, cls: `v2rise v2rise${i}` })).join("") + `</g>`;
      for (let i = 1; i < 4; i++) s += PA(`M${x0} ${y0 + i * h / 4}h12`, { stroke: C.ink, sw: 2.5 });
      s += PA(`M-26 ${y0 - 8}a26 26 0 0 1 52 0`, { stroke: C.ink, sw: 4, fill: "#ffffff" });
      s += `<g transform="translate(0 ${y0 - 8})">${ROT("ndl", 24, PA("M0 2V-21", { stroke: C.red, sw: 4 }))}${CI(0, 0, 4, { fill: C.ink })}</g>`;
      return s + (p.lab ? LAB(0, h / 2 + 20, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) {
      const lv = clamp(st.lv || 0, 0, 1);
      go(q(g, ".liq"), { sy: Math.max(0.02, lv), to: "50% 100%", d: 1.1, e: "soft" });
      go(q(g, ".ndl"), { r: -90 + lv * 180, d: 1.1, e: "elastic" });
      const b = q(g, ".tbub"); if (b) b.style.opacity = lv > 0.2 ? "1" : "0";
    },
    bb: p => [-(p.w || 110) / 2, -(p.h || 150) / 2 - 36, p.w || 110, (p.h || 150) + 36]
  };
  K.gauge = {
    b(p) {
      const r = p.r || 64, cols = [C.green, "#7aa64a", C.gold, C.orange, C.red], sw = r * 0.3;
      let s = "";
      for (let i = 0; i < 5; i++) {
        const a0 = Math.PI + i * Math.PI / 5 + 0.03, a1 = Math.PI + (i + 1) * Math.PI / 5 - 0.03;
        s += PA(`M${(r * Math.cos(a0)).toFixed(1)} ${(r * Math.sin(a0)).toFixed(1)}A${r} ${r} 0 0 1 ${(r * Math.cos(a1)).toFixed(1)} ${(r * Math.sin(a1)).toFixed(1)}`, { stroke: p.rev ? cols[4 - i] : cols[i], sw });
      }
      s += ROT("gn", r - 2, PA(`M0 6V${-(r - 10)}`, { stroke: C.ink, sw: 6 })) + CI(0, 0, 9, { fill: C.ink });
      return s + (p.lab ? LAB(0, 26, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { go(q(g, ".gn"), { r: -90 + clamp(st.lv || 0, 0, 1) * 180, d: 1.1, e: "elastic" }); },
    bb: p => { const r = p.r || 64; return [-r - 10, -r - 10, 2 * r + 20, r + 20]; }
  };
  K.bar = {
    b(p) {
      const w = p.w || 260, h = p.h || 26, x0 = -w / 2;
      return R(x0, -h / 2, w, h, { fill: C.pale, rx: h / 2 }) + `<rect class="v2m bf v2c" x="${x0}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${p.col || C.navy}"/>` +
        (p.lab ? LAB(x0, -h / 2 - 15, p.lab, { a: "start", sz: p.ls || 15 }) : "") + T(-x0, -h / 2 - 15, p.v || "", { a: "end", sz: p.ls || 15, cls: "bval", fill: p.col || C.navy });
    },
    u(g, p, st) {
      const f = q(g, ".bf"), c = st.st ? tone(st.st)[1] : (p.col || C.navy);
      go(f, { sx: Math.max(0.004, clamp((st.lv || 0) / (p.max || 1), 0, 1)), to: "0% 50%", d: 1, e: "soft" }); paint(f, c);
      const v = q(g, ".bval"); setLab(v, st.v != null ? st.v : (p.v || "")); paint(v, c);
    },
    bb: p => [-(p.w || 260) / 2, -(p.h || 26) / 2, p.w || 260, p.h || 26]
  };
  K.seg = {
    b(p) {
      const w = p.w || 360, h = p.h || 48, x0 = -w / 2, tot = p.segs.reduce((a, s) => a + s.v, 0);
      let s = R(x0, -h / 2, w, h, { fill: C.pale, rx: 8 }), cx = x0;
      p.segs.forEach((g, i) => {
        const sw = g.v / tot * w;
        s += `<rect class="v2m sg sg${i}" x="${(cx + 1).toFixed(1)}" y="${-h / 2}" width="${(sw - 2).toFixed(1)}" height="${h}" rx="7" fill="${g.col}"/>`;
        const lx = cx + sw / 2 + (g.dx || 0), ly = g.lp === "in" ? 0 : g.lp === "up" ? -h / 2 - 26 : h / 2 + 26;
        s += `<g class="sl sl${i}">` + (g.lp !== "in" ? PA(`M${(cx + sw / 2).toFixed(1)} ${g.lp === "up" ? -h / 2 - 2 : h / 2 + 2}L${lx.toFixed(1)} ${g.lp === "up" ? -h / 2 - 8 : h / 2 + 8}`, { stroke: g.col, sw: 2 }) : "") +
          T(lx, ly, g.lab, { sz: g.ls || 14, fill: g.lp === "in" ? "#ffffff" : g.col }) + `</g>`;
        g._x = cx; g._w = sw; cx += sw;
      });
      (p.brs || []).forEach(b => {
        const a = p.segs[b.from], z = p.segs[b.to], bx0 = a._x + 2, bx1 = z._x + z._w - 2, up = b.side === "up", y = up ? -h / 2 - b.off : h / 2 + b.off, d = up ? -1 : 1;
        s += `<g class="br br-${b.id}">` + PA(`M${bx0} ${y - d * 8}V${y}H${bx1}V${y - d * 8}M${(bx0 + bx1) / 2} ${y}v${d * 7}`, { stroke: b.col || C.ink, sw: 3 }) +
          T(clamp((bx0 + bx1) / 2, x0 + (b.lw || 70), -x0 - (b.lw || 70)), y + d * 22, b.lab, { sz: 15, fill: b.col || C.ink }) + `</g>`;
      });
      if (p.ghost) { const g = p.segs[p.ghost.seg]; s += `<g class="gh">` + R(g._x + 2, -h / 2 - 3, g._w * p.ghost.frac, h + 6, { fill: "rgba(255,255,255,.55)", stroke: C.ink, sw: 2.5, dash: "6 5", rx: 7 }) + `</g>`; }
      return s;
    },
    u(g, p, st) {
      const n = st.n == null ? p.segs.length : st.n, br = st.br || [];
      p.segs.forEach((s, i) => { go(q(g, ".sg" + i), { sx: i < n ? 1 : 0.005, to: "0% 50%", o: (st.dimx || []).indexOf(i) >= 0 ? 0.3 : 1, d: 0.9, e: "soft" }); const l = q(g, ".sl" + i); if (l) { l.style.transition = "opacity .5s"; l.style.opacity = i < n ? "1" : "0"; } });
      qa(g, ".br").forEach(e => { const id = e.getAttribute("class").split("br-")[1]; e.style.transition = "opacity .5s"; e.style.opacity = br.indexOf(id) >= 0 ? "1" : "0"; });
      const gh = q(g, ".gh"); if (gh) { gh.style.transition = "opacity .5s"; gh.style.opacity = st.ghost ? "1" : "0"; }
      qa(g, ".sg").forEach((e, i) => e.classList.toggle("v2pulse", st.pulse === i && st.on));
    },
    bb: p => [-(p.w || 360) / 2, -(p.h || 48) / 2, p.w || 360, p.h || 48]
  };
  function smooth(pts) {
    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], m = (a[0] + b[0]) / 2; d += ` C${m.toFixed(1)} ${a[1].toFixed(1)} ${m.toFixed(1)} ${b[1].toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`; }
    return d;
  }
  K.line = {
    b(p) {
      const w = p.w || 300, h = p.h || 160, x0 = -w / 2, y0 = -h / 2, N = p.pts.length;
      const pt = (v, i) => [x0 + 8 + i * (w - 16) / (N - 1), y0 + h - 8 - v * (h - 16)];
      p._P = p.pts.map(pt);
      let s = PA(`M${x0} ${y0}V${y0 + h}H${x0 + w}`, { stroke: "#a7b3bf", sw: 2.5 });
      if (p.xlab) s += T(0, y0 + h + 18, p.xlab, { sz: 14, fill: C.grey });
      if (p.base != null) { const by = pt(p.base, 0)[1]; s += `<g class="lbase">` + PA(`M${x0} ${by}H${x0 + w}`, { stroke: C.green, sw: 2.5, dash: "7 6" }) + T(x0 + w - 4, by - 14, p.baseLab || "Recorded baseline", { a: "end", sz: 14, fill: C.green }) + `</g>`; }
      if (p.pts2) s += PA(smooth(p.pts2.map(pt)), { stroke: C.grey, sw: 4, draw: 1, cls: "v2d ln2" }) + `<g class="l2l">${T(x0 + w - 4, pt(p.pts2[N - 1], N - 1)[1] + 18, p.lab2 || "", { a: "end", sz: 14, fill: C.grey })}</g>`;
      s += PA(smooth(p._P), { stroke: p.col || C.red, sw: 6, draw: 1, cls: "v2d ln" });
      (p.marks || []).forEach((m, j) => {
        const [px, py] = p._P[m.i], my = m.y != null ? m.y : y0 - 6, mx = clamp(px + (m.dx || 0), x0 + (m.w || 140) / 2, -x0 - (m.w || 140) / 2);
        s += `<g class="lmk lmk${j}">` + PA(`M${px} ${py - 9}L${mx} ${my + 17}`, { stroke: C.grey, sw: 1.8, dash: "4 4" }) + R(mx - (m.w || 140) / 2, my - 17, m.w || 140, 34, { fill: "#ffffff", stroke: m.col || C.navy, sw: 2.5, rx: 17 }) + T(mx, my, m.lab, { sz: 14, fill: m.col || C.navy }) + `</g>`;
      });
      s += `<g class="v2m ldot">${CI(0, 0, 9, { fill: p.col || C.red, stroke: "#ffffff", sw: 3 })}</g>`;
      return s;
    },
    u(g, p, st) {
      const dr = st.draw == null ? 1 : st.draw;
      dash(q(g, ".ln"), 1 - dr); dash(q(g, ".ln2"), 1 - (st.draw2 == null ? 0 : st.draw2));
      const l2 = q(g, ".l2l"); if (l2) l2.style.opacity = (st.draw2 || 0) > 0.95 ? "1" : "0";
      const lb = q(g, ".lbase"); if (lb) { lb.style.transition = "opacity .5s"; lb.style.opacity = st.base ? "1" : "0"; }
      qa(g, ".lmk").forEach((e, j) => { e.style.transition = "opacity .5s"; e.style.opacity = j < (st.mk || 0) ? "1" : "0"; });
      let pt = p._P[0];
      try { const ln = q(g, ".ln"), L = ln.getTotalLength(), P = ln.getPointAtLength(L * dr); pt = [P.x, P.y]; } catch (e) { pt = p._P[Math.round(dr * (p._P.length - 1))]; }
      go(q(g, ".ldot"), { x: pt[0], y: pt[1], o: dr > 0.02 ? 1 : 0, d: 1 });
    },
    bb: p => [-(p.w || 300) / 2, -(p.h || 160) / 2, p.w || 300, p.h || 160]
  };
  function tokens(d, n, kind, col, dur) {
    let s = "";
    for (let i = 0; i < n; i++) {
      const sh = kind === "coin" ? `<ellipse rx="8" ry="8" fill="${C.gold}" stroke="#8a6205" stroke-width="2"/>` : kind === "doc" ? `<rect x="-7" y="-9" width="14" height="18" rx="2" fill="#ffffff" stroke="${col}" stroke-width="2"/>` : kind === "mail" ? `<rect x="-9" y="-6" width="18" height="12" rx="2" fill="${col}"/>` : `<circle r="6" fill="${col}" stroke="#ffffff" stroke-width="2"/>`;
      s += `<g>${sh}<animateMotion dur="${dur}s" begin="${(-i * dur / n).toFixed(2)}s" repeatCount="indefinite" path="${d}"/></g>`;
    }
    return s;
  }
  K.link = {
    b(p) {
      const col = p.col || C.navy, d = p.d || `M${p.a[0]} ${p.a[1]}L${p.b[0]} ${p.b[1]}`;
      if (!p.d && !(p.a && p.b)) return "";
      let s = PA(d, { stroke: col, sw: p.sw || 4, draw: 1, cls: "v2d v2c lk" });
      let ah = p.ah;
      if (!ah && p.arrow && p.a && p.b) ah = [p.b[0], p.b[1], Math.atan2(p.b[1] - p.a[1], p.b[0] - p.a[0]) * 180 / Math.PI];
      if (ah) s += `<g class="lah" transform="translate(${ah[0]} ${ah[1]}) rotate(${ah[2]})">${PA("M-14 -9L1 0L-14 9Z", { fill: col, stroke: col, sw: 2, cls: "v2c lahp" })}</g>`;
      if (p.tok) s += `<g class="ltok">${tokens(d, p.tn || 3, p.tok, p.tc || col, p.dur || 2.4)}</g>`;
      const mid = p.mid || (p.a && p.b ? [(p.a[0] + p.b[0]) / 2, (p.a[1] + p.b[1]) / 2] : null);
      if (mid) s += `<g class="lx">${CI(mid[0], mid[1], 15, { fill: "#ffffff", stroke: C.red, sw: 3 })}${ico("x", mid[0], mid[1], 18, C.red)}</g>`;
      if (p.lab) s += LAB(p.lx || 0, p.ly || 0, p.lab, { sz: p.ls || 14, fill: col });
      return s;
    },
    u(g, p, st) {
      const dr = st.draw == null ? 1 : st.draw, c = st.st === "bad" ? C.red : st.st === "ok" ? C.green : st.st === "warn" ? C.orange : st.st === "off" ? "#a9b4bf" : (p.col || C.navy);
      const lk = q(g, ".lk"); dash(lk, 1 - dr); paint(lk, null, c, st.st === "bad" || st.brk ? "0.035 0.03" : "1");
      const ah = q(g, ".lah"); if (ah) { ah.style.transition = "opacity .3s .4s"; ah.style.opacity = dr > 0.98 ? "1" : "0"; paint(q(g, ".lahp"), c, c); }
      shown(q(g, ".ltok"), !!st.flow && st.on); shown(q(g, ".lx"), !!st.x);
    },
    bb: () => null
  };
  K.pill = {
    b(p) {
      const w = p.w || 170, h = p.h || 40, ic = p.ic ? 1 : 0;
      return `<g class="v2fit" data-pad="${ic ? 62 : 28}">` + R(-w / 2, -h / 2, w, h, { rx: p.rx == null ? Math.min(h / 2, 20) : p.rx, fill: "#ffffff", stroke: C.navy, sw: 2.5, cls: "v2c pr fitr" }) +
        (ic ? `<g class="pic">${ico(p.ic, -w / 2 + 22, 0, 22, C.navy)}</g>` : "") + LAB(ic ? 13 : 0, 0, p.lab, { sz: p.ls || 15, cls: "v2c pt fitt" }) + `</g>`;
    },
    u(g, p, st) {
      const t = tone(st.st || p.tone || "norm");
      paint(q(g, ".pr"), t[0], t[1], (st.st || p.tone) === "goal" ? "7 5" : "none"); paint(q(g, ".pt"), t[2]);
      const pc = q(g, ".pic"), key = t.join(); if (pc && pc._k !== key) { pc._k = key; pc.innerHTML = ico(p.ic, -(p.w || 170) / 2 + 22, 0, 22, t[2], t[0]); }
    },
    bb: p => [-(p.w || 170) / 2, -(p.h || 40) / 2, p.w || 170, p.h || 40]
  };
  K.card = {
    b(p) {
      const w = p.w || 170, h = p.h || 150, col = p.col || C.navy, x0 = -w / 2, y0 = -h / 2, ics = p.is || Math.min(54, h * 0.34);
      let f = R(x0, y0, w, h, { fill: "#ffffff", stroke: col, sw: 3.5, rx: 16, cls: "v2c cfr" }) + ico(p.ic || "q", 0, y0 + 14 + ics / 2, ics, col) + LAB(0, y0 + 30 + ics + (p.sub ? 6 : 14), p.lab, { sz: p.ls || 17, fill: col, mw: w - 16 });
      if (p.sub) f += T(0, h / 2 - 22, p.sub, { sz: 14, fill: C.ink, w: 600, cls: "csub", mw: w - 14 });
      let s = `<g class="v2m cf">${f}</g>`;
      if (p.back) s += `<g class="v2m cbk">` + R(x0, y0, w, h, { fill: p.bcol || col, rx: 16 }) + ico(p.bic || "check", 0, y0 + 14 + ics / 2, ics, "#ffffff") + T(0, y0 + 44 + ics, p.back, { sz: p.ls || 17, fill: "#ffffff" }) + `</g>`;
      return s;
    },
    u(g, p, st) {
      const fl = !!st.flip;
      if (p.back) { go(q(g, ".cf"), { sx: fl ? 0.01 : 1, o: fl ? 0 : 1, d: 0.35 }); go(q(g, ".cbk"), { sx: fl ? 1 : 0.01, o: fl ? 1 : 0, dl: fl ? 0.3 : 0, d: 0.4 }); }
      const t = st.st ? tone(st.st) : null; paint(q(g, ".cfr"), t ? (st.st === "bad" ? C.blush : st.st === "ok" ? C.mint : st.st === "off" ? "#f1f3f5" : "#ffffff") : "#ffffff", t ? t[1] : (p.col || C.navy));
    },
    bb: p => [-(p.w || 170) / 2, -(p.h || 150) / 2, p.w || 170, p.h || 150]
  };
  K.bubble = {
    b(p) {
      const w = p.w || 170, h = p.h || 42, t = p.tail || "b", x0 = -w / 2, y0 = -h / 2, tx = p.tx || 0, col = p.col || C.navy, fill = p.fill || "#ffffff";
      let tail = "", cover = "";
      if (t === "b") { tail = `M${tx - 9} ${h / 2 - 2}L${tx + 3} ${h / 2 + 13}L${tx + 9} ${h / 2 - 2}`; cover = R(tx - 8, h / 2 - 4, 16, 4, { fill, rx: 0 }); }
      if (t === "t") { tail = `M${tx - 9} ${y0 + 2}L${tx + 3} ${y0 - 13}L${tx + 9} ${y0 + 2}`; cover = R(tx - 8, y0, 16, 4, { fill, rx: 0 }); }
      if (t === "l") { tail = `M${x0 + 2} -8L${x0 - 13} 4L${x0 + 2} 8`; cover = R(x0, -7, 4, 14, { fill, rx: 0 }); }
      if (t === "r") { tail = `M${-x0 - 2} -8L${-x0 + 13} 4L${-x0 - 2} 8`; cover = R(-x0 - 4, -7, 4, 14, { fill, rx: 0 }); }
      return `<g class="v2fit" data-pad="26">` + (tail ? PA(tail, { fill, stroke: col, sw: 2.5 }) : "") + R(x0, y0, w, h, { fill, stroke: col, sw: 2.5, rx: 14, cls: "fitr" }) + cover + LAB(0, 0, p.lab, { sz: p.ls || 15, fill: p.tc || col, cls: "fitt" }) + `</g>`;
    },
    bb: p => [-(p.w || 170) / 2, -(p.h || 42) / 2, p.w || 170, p.h || 42]
  };
  K.stamp = {
    hs: 1.7,
    b(p) {
      const w = p.w || Math.max(120, p.lab.replace("|", " ").length * 10 + 26), h = p.h || (p.lab.indexOf("|") >= 0 ? 62 : 46), col = p.col || C.red;
      return `<g transform="rotate(${p.r == null ? -8 : p.r})"><g class="v2fit" data-pad="30">` + R(-w / 2, -h / 2, w, h, { fill: "rgba(255,255,255,.9)", stroke: col, sw: 4.5, rx: 9, cls: "fitr" }) + LAB(0, 0, p.lab, { sz: p.ls || 18, fill: col, w: 800, cls: "fitt" }) + `</g></g>`;
    },
    bb: p => { const w = p.w || Math.max(120, p.lab.length * 10 + 26); return [-w / 2, -26, w, 52]; }
  };
  K.bolt = {
    hs: 2.2,
    b(p) { const z = (p.sz || 70) / 24; return `<g class="bf2"><g transform="scale(${z.toFixed(3)}) translate(-12 -12)"><path d="M13.5 1.5L4 14h7l-1.5 8.5L20 9.5h-7z" fill="${p.col || C.gold}" stroke="${C.ink}" stroke-width="1.2" stroke-linejoin="round"/></g></g>` + (p.lab ? LAB(0, (p.sz || 70) / 2 + 18, p.lab, { sz: p.ls || 15, fill: C.orange }) : ""); },
    u(g, p, st) { const b = q(g, ".bf2"); if (b) b.classList.toggle("v2flash", !!st.on); },
    bb: p => { const s = p.sz || 70; return [-s / 2, -s / 2, s, s]; }
  };
  K.icon = {
    b(p) { const s = p.sz || 40; return (p.disc ? CI(0, 0, s * 0.72, { fill: p.disc, cls: "v2c idisc" }) : "") + `<g class="ig">${ico(p.ic, 0, 0, s, p.col || C.navy)}</g>` + (p.lab ? LAB(0, s * (p.disc ? 0.72 : 0.5) + 18, p.lab, { sz: p.ls || 15, fill: p.lc || C.ink }) : ""); },
    u(g, p, st) { const ig = q(g, ".ig"); if (ig) ig.classList.toggle(p.idle || "x", !!st.on && !!p.idle); },
    bb: p => { const s = (p.sz || 40) * (p.disc ? 1.44 : 1); return [-s / 2, -s / 2, s, s]; }
  };
  K.text = {
    b(p) { return LAB(0, 0, p.lab, { sz: p.sz || 24, fill: p.col || C.navy, w: 800 }); },
    bb: () => null
  };
  K.bracket = {
    b(p) {
      const w = p.w || 200, up = p.side === "up", d = up ? -1 : 1, col = p.col || C.ink;
      return PA(`M${-w / 2} ${-d * 8}V0H${w / 2}V${-d * 8}M0 0v${d * 8}`, { stroke: col, sw: 3 }) + LAB(0, d * 26, p.lab, { sz: p.ls || 15, fill: col });
    },
    bb: () => null
  };
  K.panel = {
    b(p) {
      const w = p.w || 120, h = p.h || 200, col = p.col || C.navy;
      return R(-w / 2, -h / 2, w, h, { fill: p.fill || "#f1f5f9", stroke: p.stroke || "none", sw: 2.5, rx: p.rx == null ? 16 : p.rx, dash: p.dash, cls: "v2c pbg" }) +
        (p.lab ? R(-w / 2 + 8, -h / 2 + 8, w - 16, p.th || (String(p.lab).indexOf("|") >= 0 ? 40 : 30), { fill: col, rx: 10 }) + LAB(0, -h / 2 + 8 + (p.th || (String(p.lab).indexOf("|") >= 0 ? 40 : 30)) / 2, p.lab, { sz: p.ls || 14, fill: "#ffffff" }) : "");
    },
    u(g, p, st) { if (st.st) { const t = tone(st.st); paint(q(g, ".pbg"), st.st === "ok" ? C.mint : st.st === "bad" ? C.blush : st.st === "goal" ? "#fff7e3" : (p.fill || "#f1f5f9"), t[1]); } },
    bb: () => null
  };
  K.screen = {
    b(p) {
      const w = p.w || 250, h = p.h || 170;
      return R(-w / 2, -h / 2, w, h, { fill: "#ffffff", stroke: C.ink, sw: 4, rx: 12 }) + R(-w / 2, -h / 2, w, 30, { fill: C.ink, rx: 12 }) + R(-w / 2, -h / 2 + 18, w, 12, { fill: C.ink, rx: 0 }) +
        CI(-w / 2 + 16, -h / 2 + 15, 4, { fill: C.red }) + CI(-w / 2 + 30, -h / 2 + 15, 4, { fill: C.gold }) + LAB(10, -h / 2 + 15, p.lab || "", { sz: 14, fill: "#ffffff" }) +
        PA(`M-18 ${h / 2}l-8 18h52l-8-18`, { fill: C.ink, stroke: C.ink, sw: 2 });
    },
    bb: p => [-(p.w || 250) / 2, -(p.h || 170) / 2, p.w || 250, (p.h || 170) + 18]
  };
  K.tile = {
    b(p) {
      const w = p.w || 170, h = p.h || 112;
      return R(-w / 2, -h / 2, w, h, { fill: "#ffffff", stroke: C.green, sw: 3, rx: 14, cls: "v2c tbx" }) + LAB(-w / 2 + 12, -h / 2 + 20, p.lab, { a: "start", sz: p.ls || 14, mw: w - 50 }) +
        `<g class="tic">${badge(w / 2 - 18, -h / 2 + 20)}</g>` + T(0, 12, p.v || "", { sz: p.vs || 25, w: 800, cls: "tval", fill: C.green, mw: w - 16 }) + (p.unit ? T(0, h / 2 - 16, p.unit, { sz: 13, fill: C.grey, cls: "tun" }) : "");
    },
    u(g, p, st) {
      const k = st.st || p.tone || "ok", c = BADGEC[k] || C.navy;
      paint(q(g, ".tbx"), k === "bad" ? C.blush : k === "ok" ? "#f3fbf7" : "#ffffff", c); paint(q(g, ".tval"), c); setBadge(g, k);
      setLab(q(g, ".tval"), st.v != null ? st.v : (p.v || ""));
    },
    bb: p => [-(p.w || 170) / 2, -(p.h || 112) / 2, p.w || 170, p.h || 112]
  };
  K.badge = {
    b(p) { return badge(0, 0) + (p.lab ? LAB(0, 28, p.lab, { sz: p.ls || 14 }) : ""); },
    u(g, p, st) { setBadge(g, st.st || p.tone || "ok"); const b = q(g, ".bdgg"); if (b) b.setAttribute("transform", `scale(${(p.sz || 1.6)})`); },
    bb: () => [-14, -14, 28, 28]
  };
  K.desk = {
    b(p) {
      const col = p.col || C.navy;
      return PA("M-70 -10H70L60 34H-60Z", { fill: col, stroke: col, sw: 2 }) + R(-78, -22, 156, 14, { fill: C.ink, rx: 5 }) + ico("bell", 40, -34, 24, C.gold) + T(-14, 12, p.lab || "Reception desk", { sz: 14, fill: "#ffffff", cls: "lab" });
    },
    bb: () => [-78, -46, 156, 80]
  };
  K.crack = {
    b(p) { return PA(p.d || "M-30 -30l12 14-8 10 14 12-6 14 12 10", { stroke: C.red, sw: 4, draw: 1, cls: "v2d ckp" }); },
    u(g, p, st) { dash(q(g, ".ckp"), st.on ? 0 : 1); },
    bb: () => null
  };
  K.table = {
    b(p) {
      let s = `<ellipse cx="0" cy="8" rx="${p.rx || 120}" ry="30" fill="${C.navy}" stroke="${C.ink}" stroke-width="3"/>` + T(0, 8, p.lab || "Qasr board", { sz: 15, fill: "#ffffff", cls: "lab" });
      const seats = [[-92, -26], [-46, -36], [0, -40], [46, -36], [92, -26]];
      seats.forEach(([x, y], i) => {
        s += `<g class="seat">` + PA(`M${x - 15} ${y + 22}c0-11 6-16 15-16s15 5 15 16z`, { fill: [C.plum, C.teal, C.navy, C.gold, C.green][i] }) + CI(x, y - 2, 10, { fill: i % 2 ? C.skin2 : C.skin }) + `</g>`;
        s += `<g class="vt vt${i}">${CI(x, y - 30, 11, { fill: C.green, cls: "v2c vtc" })}<g class="vy">${ico("check", x, y - 30, 14, "#fff")}</g><g class="vn">${ico("x", x, y - 30, 14, "#fff")}</g><g class="vq">${ico("q", x, y - 30, 22, C.plum)}</g></g>`;
      });
      return s;
    },
    u(g, p, st) {
      const v = st.vote || "none";
      qa(g, ".vt").forEach(e => { shown(e, v !== "none"); shown(q(e, ".vy"), v === "yes"); shown(q(e, ".vn"), v === "no"); shown(q(e, ".vq"), v === "wait"); paint(q(e, ".vtc"), v === "yes" ? C.green : v === "no" ? C.red : "transparent"); });
    },
    bb: p => [-(p.rx || 120), -50, 2 * (p.rx || 120), 90]
  };
  K.grid14 = {
    b(p) {
      const P = [], dy = p.dy || 62; for (let r = 0; r < 2; r++) for (let c = 0; c < 7; c++) P.push([-156 + c * 52, r ? dy : -dy]);
      p._P = P;
      let s = "";
      P.forEach(([x, y], i) => {
        s += PA(`M0 0L${x} ${y}`, { stroke: C.navy, sw: 2.5, draw: 1, cls: `v2d gl gl${i}` });
        s += `<g class="gm gm${i}">` + PA(`M${x} ${y}L${x + 20} ${y + (y < 0 ? -26 : 26)}`, { stroke: C.orange, sw: 2.5 }) + R(x + 12, y + (y < 0 ? -40 : 18), 16, 16, { fill: C.orange, rx: 3 }) + `</g>`;
      });
      s += `<g class="hub">${CI(0, 0, 36, { fill: C.navy, stroke: "#ffffff", sw: 3 })}${T(0, 0, p.hub || "Group|owner", { sz: 13, fill: "#ffffff", cls: "lab" })}</g>`;
      P.forEach(([x, y], i) => {
        s += `<g class="ht ht${i}"><g class="hti">` + ico("hotel", x, y, 34, C.navy) + `</g>` + `<g class="hch">${CI(x + 15, y - 17, 7, { fill: C.orange, stroke: "#fff", sw: 2 })}</g>` +
          `<g class="hx">${ico("x", x, y, 30, C.red)}</g><g class="hs">${CI(x, y, 24, { stroke: C.gold, sw: 3.5 })}</g></g>`;
      });
      return s;
    },
    u(g, p, st) {
      const DR = [C.navy, C.gold, C.plum, C.orange, C.teal];
      p._P.forEach((xy, i) => {
        const ht = q(g, ".ht" + i), hi = q(ht, ".hti");
        qa(hi, "[fill]").forEach(e => { if (e.getAttribute("fill") !== "#fff") e.setAttribute("fill", st.std ? C.green : st.drift ? DR[(i * 3) % 5] : C.navy); });
        go(hi, { r: st.drift && !st.std ? ((i * 37) % 21) - 10 : 0, d: 0.8 });
        shown(q(ht, ".hch"), !!st.champ); shown(q(ht, ".hx"), !!st.fail && i !== st.pilot); shown(q(ht, ".hs"), st.pilot === i);
        const l = q(g, ".gl" + i); dash(l, st.links ? 0 : 1); paint(l, null, st.gm ? C.red : st.std ? C.green : C.navy, st.gm ? "0.06 0.05" : "1");
        shown(q(g, ".gm" + i), !!st.gm);
      });
      shown(q(g, ".hub"), !!st.hub);
    },
    bb: p => [-180, -(p.dy || 62) - 22, 360, 2 * (p.dy || 62) + 44]
  };

  // ---------- generic prop update ----------
  function upd(el, p, st) {
    const k = K[p.k], pm = q(el, ".pm"), prev = el._st || { on: 0 }, on = !!st.on, was = !!prev.on;
    const tx = (st.x == null ? p.x : st.x) - p.x, ty = (st.y == null ? p.y : st.y) - p.y;
    const tgt = { o: on ? (st.dim ? 0.28 : (st.o == null ? 1 : st.o)) : 0, x: tx, y: ty, r: st.r || 0, s: on ? (st.s == null ? 1 : st.s) * (st.hot ? 1.045 : 1) : (k.hs || 0.82), d: st.d };
    if (on && !was && !INST && !RM()) {
      const keep = INST; INST = true; go(pm, { o: 0, x: tx, y: ty + (k.hs ? 0 : 12), r: tgt.r, s: k.hs || 0.82 }); INST = keep; reflow(pm);
      tgt.e = k.hs ? "back" : "back"; tgt.d = st.d || (k.hs ? 0.55 : 0.75);
    } else if (!on && was) { tgt.d = 0.35; }
    go(pm, tgt);
    const h = q(el, ".v2halo"); if (h) shown(h, on && !!st.hot);
    if (st.lab != null && q(el, ".lab") && q(el, ".lab")._s !== st.lab) { setLab(q(el, ".lab"), st.lab); const fg = q(el, ".v2fit"); if (fg) fitOne(fg); }
    if (k.u) k.u(el, p, st, prev);
    el._st = st;
  }

  // Widen pill / bubble / stamp frames when the host font renders a label wider than designed.
  // Host-font safety: frames grow to fit their label but never past the stage; if there is no room,
  // the label shrinks instead. Free labels that would cross the stage edge also shrink to fit.
  const baseX = el => { const p = el && el.closest ? el.closest(".v2p") : null, m = p ? /translate\(([-\d.]+)/.exec(p.getAttribute("transform") || "") : null; return m ? +m[1] : 200; };
  const textW = t => { let w = 0; try { qa(t, "tspan").forEach(sp => { w = Math.max(w, sp.getComputedTextLength()); }); } catch (e) { w = 0; } return w; };
  function shrink(t, f) { const s0 = +(t.getAttribute("data-fs0") || t.getAttribute("font-size")); t.setAttribute("data-fs0", s0); t.setAttribute("font-size", Math.max(11, Math.floor(s0 * f * 10) / 10)); }
  function fitAll(root) {
    qa(root, ".v2fit").forEach(fitOne);
    qa(root, ".v2p").forEach(p => {
      const px = baseX(p);
      qa(p, "text.v2t").forEach(t => {
        if (t.closest(".v2fit")) return;
        let bb = null; try { bb = t.getBBox(); } catch (e) { bb = null; }
        if (!bb || !bb.width) return;
        const mw = +(t.getAttribute("data-mw") || 0);
        if (mw && bb.width > mw) { shrink(t, mw / bb.width); try { bb = t.getBBox(); } catch (e) { return; } }
        const pmx = px + bb.x, pmr = px + bb.x + bb.width;
        if (pmx >= 9 && pmr <= 391) return;
        const a = t.getAttribute("text-anchor"), tx = px + (+t.getAttribute("x") || 0);
        const room = a === "start" ? 391 - tx : a === "end" ? tx - 9 : 2 * Math.min(tx - 9, 391 - tx);
        if (room > 20) shrink(t, room / bb.width);
      });
    });
  }
  function fitOne(g) {
    const r = q(g, ".fitr"), t = q(g, ".fitt"); if (!r || !t) return;
    if (t.getAttribute("data-fs0")) t.setAttribute("font-size", t.getAttribute("data-fs0"));
    const w = textW(t);
    if (r._w0 == null) { r._w0 = +r.getAttribute("width"); r._x0 = +r.getAttribute("x"); }
    const pad = +(g.getAttribute("data-pad") || 26), rw = r._w0, px = baseX(g), cx = r._x0 + rw / 2;
    const maxW = Math.max(rw, 2 * Math.min(px + cx - 9, 391 - px - cx));
    let nw = rw;
    if (w && w + pad > rw) { nw = Math.min(Math.ceil(w + pad), maxW); if (w + pad > nw) shrink(t, (nw - pad) / w); }
    const dx = (nw - rw) / 2;
    r.setAttribute("x", r._x0 - dx); r.setAttribute("width", nw);
    const ic = q(g, ".pic"); if (ic) ic.setAttribute("transform", `translate(${-dx} 0)`);
  }
  // ---------- scene engine ----------
  // A(bench, props, beats): one act = one visual, adapted from the named benchmark.
  const A = (bench, props, beats) => ({ bench, props, beats });
  const P = (id, k, x, y, o) => Object.assign({ id, k, x, y }, o || {});
  const L = (id, a, b, o) => Object.assign({ id, k: "link", x: 0, y: 0, a, b }, o || {});
  function scene(id, acts) {
    let at = 0;
    acts.forEach(a => { a.at = at; at += a.beats.length; });
    const N = at, st = { root: null, cur: -1, last: -1 };
    acts.forEach(a => {
      const cur = {}, ids = {};
      a.props.forEach(p => { ids[p.id] = p; cur[p.id] = Object.assign({ on: p.on ? 1 : 0 }, p.st || {}); });
      a.S = a.beats.map(b => {
        (b.on || []).forEach(i => { if (cur[i]) cur[i].on = 1; });
        (b.off || []).forEach(i => { if (cur[i]) cur[i].on = 0; });
        Object.keys(b.s || {}).forEach(i => { if (!cur[i]) return; const o = Object.assign({}, b.s[i]); delete o.hot; Object.assign(cur[i], o); });
        const snap = {};
        Object.keys(cur).forEach(i => { snap[i] = Object.assign({}, cur[i]); delete snap[i].hot; });
        (b.hot || []).forEach(i => { if (snap[i]) snap[i].hot = 1; });
        Object.keys(b.s || {}).forEach(i => { if (snap[i] && b.s[i].hot) snap[i].hot = 1; });
        return snap;
      });
    });
    const dotX = j => 392 - (acts.length - 1 - j) * 9;
    function markup() {
      let h = `<svg viewBox="0 0 400 380" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(acts[0].beats[0].t)}" focusable="false">`;
      h += R(1, 1, 398, 378, { fill: C.paper, rx: 20, stroke: "#e7dfcd", sw: 2 });
      h += `<g class="v2chip">` + R(8, 9, 200, 36, { fill: C.navy, rx: 18, cls: "v2chipbg" }) + CI(27, 27, 6, { fill: C.orange, cls: "v2beat" }) +
        `<text class="v2t v2tag" x="40" y="27" font-size="16" font-weight="800" fill="#ffffff" dominant-baseline="central"></text></g>`;
      acts.forEach((a, j) => { h += CI(dotX(j), 27, 3.6, { fill: "#c9d2db", cls: `v2dot v2dot${j}` }); });
      acts.forEach((a, j) => {
        h += `<g class="v2m v2act v2act${j}" data-bench="${esc(a.bench)}" style="opacity:0">`;
        a.props.forEach(p => {
          const k = K[p.k], bb = k.bb ? k.bb(p) : null;
          const halo = bb ? R(bb[0] - 7, bb[1] - 7, bb[2] + 14, bb[3] + 14, { stroke: C.orange, sw: 3, dash: "8 6", rx: 14, cls: "v2halo" }) : "";
          h += `<g class="v2p" data-id="${p.id}" transform="translate(${p.x || 0} ${p.y || 0})"><g class="v2m pm">${halo}${k.b(p)}</g></g>`;
        });
        h += `</g>`;
      });
      h += `<g class="v2rip" style="display:none"><circle class="v2ripc" cx="0" cy="0" r="26" fill="none" stroke="${C.orange}" stroke-width="3.5"/></g>`;
      return h + `</svg>`;
    }
    const els = j => st.root ? qa(q(st.root, ".v2act" + j), ".v2p") : [];
    function setTag(t) {
      const tx = q(st.root, ".v2tag"), bg = q(st.root, ".v2chipbg");
      if (!tx || tx.textContent === t) return;
      tx.textContent = t;
      let w = 0; try { w = tx.getComputedTextLength(); } catch (e) { w = 0; }
      tx.setAttribute("font-size", "16");
      try { w = tx.getComputedTextLength(); } catch (e) { w = 0; }
      if (w > 254) { tx.setAttribute("font-size", String(Math.max(12.5, Math.floor(16 * 254 / w * 10) / 10))); try { w = tx.getComputedTextLength(); } catch (e) { w = 254; } }
      if (!w) w = t.length * 9.2;
      if (bg) bg.setAttribute("width", clamp(Math.ceil(w) + 46, 120, 300));
      restart(tx, "v2tagin");
      const sv = q(st.root, "svg"); if (sv) sv.setAttribute("aria-label", t);
    }
    function ripple(f) {
      const g = q(st.root, ".v2rip");
      if (!g) return;
      if (!f || INST || RM()) { shown(g, false); return; }
      g.setAttribute("transform", `translate(${f[0].toFixed(1)} ${f[1].toFixed(1)})`); shown(g, true); restart(g, "v2ripon");
    }
    function render(i, inst) {
      const r = st.root; if (!r) return;
      const ii = clamp(Math.floor(+i) || 0, 0, N - 1);
      let a = 0; for (let j = 0; j < acts.length; j++) if (acts[j].at <= ii) a = j;
      const k = ii - acts[a].at, act = acts[a], beat = act.beats[k];
      INST = !!inst || RM();
      r.classList.toggle("v2inst", INST);
      if (a !== st.cur) {
        acts.forEach((x, j) => {
          const g = q(r, ".v2act" + j); if (!g) return;
          if (j === a) { g.removeAttribute("aria-hidden"); go(g, { o: 1, x: 0, d: 0.6 }); }
          else { g.setAttribute("aria-hidden", "true"); go(g, { o: 0, x: j < a ? -24 : 24, d: 0.35 }); }
        });
        st.cur = a;
      }
      acts.forEach((x, j) => { const dn = q(r, ".v2dot" + j); if (dn) { dn.style.fill = j === a ? C.orange : j < a ? C.navy : "#c9d2db"; dn.setAttribute("r", j === a ? 5.2 : 3.6); } });
      const S = act.S[k];
      els(a).forEach((el, n) => upd(el, act.props[n], S[act.props[n].id]));
      setTag(beat.t);
      let fid = beat.f || (beat.hot && beat.hot[0]) || Object.keys(beat.s || {}).filter(x => beat.s[x].hot)[0] || (beat.on && beat.on[beat.on.length - 1]);
      const fp = fid ? act.props.filter(p => p.id === fid)[0] : null;
      ripple(fp ? [S[fid].x == null ? fp.x : S[fid].x, (S[fid].y == null ? fp.y : S[fid].y) + (fp.fy || 0)] : null);
      st.last = ii;
      INST = false;
      if (inst) { reflow(r); r.classList.remove("v2inst"); }
    }
    return {
      _qa: { N, acts: acts.length, tags: acts.reduce((x, a) => x.concat(a.beats.map(b => b.t)), []), bench: acts.map(a => a.bench) },
      build(el) {
        if (!el) return;
        addStyle();
        const root = document.createElement("div");
        root.className = `vls-w02-${id} v2root` + (W.gsap && typeof W.gsap.to === "function" ? " v2gs" : "");
        root.innerHTML = markup();
        if (typeof el.replaceChildren === "function") el.replaceChildren(root); else { el.innerHTML = ""; el.appendChild(root); }
        st.root = root; st.cur = -1; st.last = -1;
        fitAll(root);
        const sv = q(root, "svg"); if (RM() && sv && sv.pauseAnimations) sv.pauseAnimations();
        INST = true;
        acts.forEach((a, j) => els(j).forEach((e, n) => { e._st = null; upd(e, a.props[n], { on: 0 }); e._st = { on: 0 }; }));
        INST = false;
        render(0, true);
      },
      step(i) { render(i, false); },
      reset() {
        if (!st.root) return;
        if (W.gsap && typeof W.gsap.killTweensOf === "function") W.gsap.killTweensOf(st.root.querySelectorAll("*"));
        INST = true;
        acts.forEach((a, j) => { els(j).forEach((e, n) => { upd(e, a.props[n], { on: 0 }); e._st = { on: 0 }; }); const g = q(st.root, ".v2act" + j); if (g) go(g, { o: 0, x: 24 }); });
        INST = false;
        st.cur = -1;
        render(0, true);
      }
    };
  }


  // ---------- scoped CSS (appended once to the shared <style id="vl-sc-w02">) ----------
  const SEL = s => SECS.map(id => `.vls-w02-${id}${s}`).join(",");
  const CSS = [
    "/* w02-claude-v2-part2 */",
    `${SEL("")}{position:relative;display:block;width:100%;height:100%;min-height:0;overflow:hidden;box-sizing:border-box;color:#17283a;-webkit-user-select:none;user-select:none}`,
    `${SEL(" svg")}{display:block;width:100%;height:100%;max-height:100%;overflow:hidden}`,
    `${SEL(" .v2t")}{font-family:inherit;letter-spacing:.1px}`,
    `${SEL(" .v2m")}{transform-box:fill-box;transform-origin:50% 50%;transition-property:transform,opacity;transition-duration:.7s;transition-timing-function:cubic-bezier(.2,.8,.2,1)}`,
    `${SEL(".v2gs .v2m")}{transform-box:view-box;transform-origin:0 0;transition:none}`,
    `${SEL(" .v2c")}{transition:fill .5s ease,stroke .5s ease}`,
    `${SEL(" .v2d")}{transition:stroke-dashoffset .9s cubic-bezier(.4,0,.2,1),stroke .5s ease}`,
    `${SEL(".v2inst *")}{transition:none!important}`,
    `${SEL(" .v2halo")}{animation:v2halo 1.3s ease-in-out infinite}`,
    `${SEL(" .v2bob")}{transform-box:fill-box;transform-origin:50% 100%;animation:v2bob 1.05s ease-in-out infinite}`,
    `${SEL(" .v2spin")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2spin 2.2s linear infinite}`,
    `${SEL(" .v2spinslow")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2spin 6s linear infinite}`,
    `${SEL(" .v2float")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2float 2.2s ease-in-out infinite}`,
    `${SEL(" .v2flash")}{animation:v2flash 1.1s ease-in-out infinite}`,
    `${SEL(" .v2shake")}{transform-box:fill-box;transform-origin:50% 100%;animation:v2shake .7s ease-in-out infinite}`,
    `${SEL(" .v2pulse")}{animation:v2pul 1.1s ease-in-out infinite}`,
    `${SEL(" .v2rise")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2rise 2.4s ease-in infinite}`,
    `${SEL(" .v2rise1")}{animation-delay:.8s}`, `${SEL(" .v2rise2")}{animation-delay:1.6s}`,
    `${SEL(" .v2beat")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2beat 1.6s ease-in-out infinite}`,
    `${SEL(" .v2tagin")}{animation:v2tagin .45s ease-out}`,
    `${SEL(" .v2ripc")}{transform-box:fill-box;transform-origin:50% 50%;opacity:0}`,
    `${SEL(" .v2ripon .v2ripc")}{animation:v2rip .9s ease-out forwards}`,
    `${SEL(" .v2stampin")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2stamp .55s cubic-bezier(.34,1.56,.64,1)}`,
    "@keyframes v2halo{0%,100%{opacity:.35}50%{opacity:1}}",
    "@keyframes v2bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}",
    "@keyframes v2spin{to{transform:rotate(360deg)}}",
    "@keyframes v2float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}",
    "@keyframes v2flash{0%,100%{opacity:1}50%{opacity:.55}}",
    "@keyframes v2shake{0%,100%{transform:rotate(0)}25%{transform:rotate(-1.6deg)}75%{transform:rotate(1.6deg)}}",
    "@keyframes v2pul{0%,100%{stroke:transparent;stroke-width:0}50%{stroke:#ffffff;stroke-width:5}}",
    "@keyframes v2rise{0%{transform:translateY(0);opacity:0}20%{opacity:.8}100%{transform:translateY(-70px);opacity:0}}",
    "@keyframes v2beat{0%,100%{transform:scale(1)}50%{transform:scale(1.45)}}",
    "@keyframes v2tagin{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}",
    "@keyframes v2rip{0%{opacity:.9;transform:scale(.35)}100%{opacity:0;transform:scale(1.9)}}",
    "@keyframes v2stamp{0%{opacity:0;transform:scale(1.9)}100%{opacity:1;transform:scale(1)}}",
    `@media (prefers-reduced-motion:reduce){${SEL(" *")}{animation:none!important;transition:none!important}}`
  ].join("\n");
  function addStyle() {
    if (typeof document === "undefined") return;
    let s = document.getElementById("vl-sc-w02");
    if (!s) { s = document.createElement("style"); s.id = "vl-sc-w02"; (document.head || document.documentElement).appendChild(s); }
    if (s.textContent.indexOf("/* w02-claude-v2-part2 */") < 0) s.appendChild(document.createTextNode(CSS));
  }
  addStyle();

  // =====================================================================
  // W2O2a Â· Four pressures and one decisive event â€” 30 moments, 9 acts
  // (audit: lowest score 3.4/10, rebuilt first)
  // =====================================================================
  W.VL_SCENES["W2O2a"] = scene("W2O2a", [
    // Act 1 (moments 0-2). Benchmark Part2 #112 "Infographics Pack by ARstudio"
    // https://motionarray.com/after-effects-templates/infographics-pack-135055/
    // Adapted: chart, timeline and callout elements; here a decision callout, an assumption callout, an evidence stamp.
    A("P2#112", [
      P("tb", "table", 200, 120, { rx: 118, lab: "Qasr board" }),
      P("ap", "pill", 200, 206, { w: 236, lab: "BPM programme approved", ic: "seal", tone: "ok", ls: 14 }),
      P("g1", "person", 64, 304, { sz: 0.78, col: C.teal, mood: "sad" }),
      P("g2", "person", 112, 304, { sz: 0.78, col: C.gold, mood: "sad", skin: C.skin2 }),
      P("g3", "person", 160, 304, { sz: 0.78, col: C.plum, mood: "sad" }),
      P("as", "bubble", 296, 288, { w: 170, lab: "Unhappy guests?", tail: "l", col: C.plum }),
      P("mg", "icon", 296, 350, { ic: "search", sz: 36, col: C.navy, idle: "v2float" }),
      P("ns", "stamp", 296, 288, { lab: "Not so simple", r: -6 })
    ], [
      { t: "The board finally approves", on: ["tb", "ap"], hot: ["ap"] },
      { t: "Because guests were unhappy?", on: ["g1", "g2", "g3", "as"], hot: ["as"] },
      { t: "The evidence says more", on: ["mg", "ns"], s: { as: { dim: 1 } }, hot: ["ns"] }
    ]),
    // Act 2 (moments 3-6). Benchmark Part2 #124 "Project Dashboard"
    // https://lottiefiles.com/free-animation/project-dashboard-PeJUc2p1iB
    // Adapted: data panels revealed beside the collaborator who reads them.
    A("P2#124", [
      P("dr", "person", 82, 226, { sz: 1.2, col: C.plum, lab: "Programme director", ls: 13 }),
      P("bd", "panel", 274, 214, { w: 222, h: 292, lab: "Events before decision", ls: 13 }),
      P("wn", "pill", 274, 126, { w: 184, lab: "Why act now?", ic: "q", tone: "goal" }),
      P("ev", "pill", 274, 176, { w: 196, lab: "Everything to improve", tone: "off", ls: 14 }),
      P("ty", "pill", 274, 178, { w: 184, h: 34, lab: "Two years earlier", tone: "sky", ls: 14 }),
      P("ln", "line", 274, 262, { w: 170, h: 84, pts: [0.88, 0.8, 0.7, 0.58, 0.46], col: C.red, xlab: "Guest satisfaction" }),
      P("ro", "stamp", 274, 258, { lab: "Recorded only", r: -7 }),
      P("np", "pill", 82, 336, { w: 150, h: 50, lab: "No funded|programme", ic: "lock", tone: "off", ls: 14 })
    ], [
      { t: "Director reviews the events", on: ["dr", "bd"], hot: ["bd"] },
      { t: "Why now, not everything", on: ["wn", "ev"], s: { ev: { dim: 1 } }, hot: ["wn"] },
      { t: "Two years: satisfaction falls", off: ["ev"], on: ["ty", "ln"], s: { ln: { draw: 1 } }, hot: ["ln"] },
      { t: "Recorded, never funded", on: ["ro", "np"], s: { dr: { mood: "worry" } }, hot: ["np"] }
    ]),
    // Act 3 (moments 7-8). Benchmark Part2 #076 "Workflow Animation"
    // https://dribbble.com/shots/3791748-Workflow-Animation
    // Adapted: an action fires, a trigger message is transferred, the notification arrives â€” here, too late.
    A("P2#076", [
      P("rm", "dept", 74, 118, { w: 84, h: 70, ic: "bed", lab: "Room ready" }),
      L("ms", [120, 118], [218, 118], { col: C.grey, sw: 4, brk: 1 }),
      P("ml", "icon", 168, 118, { ic: "mail", sz: 34, col: C.navy }),
      P("ck", "icon", 168, 80, { ic: "clock", sz: 26, col: C.red, idle: "v2float" }),
      P("dk", "desk", 300, 136, { lab: "Reception desk" }),
      P("gs", "person", 300, 254, { col: C.teal, bag: 1, mood: "sad", lab: "Arriving guest", ls: 14 }),
      P("qp", "pill", 104, 334, { w: 184, lab: "Explains quality", ic: "check", tone: "ok", ls: 14 }),
      P("tp", "pill", 296, 334, { w: 184, lab: "Not the timing", ic: "clock", tone: "unk", ls: 14 })
    ], [
      { t: "Poor coordination, felt", on: ["rm", "ms", "ml", "ck", "dk", "gs"], s: { rm: { st: "ok" }, gs: { wait: 1 } }, hot: ["ml"] },
      { t: "Explains quality, not timing", on: ["qp", "tp"], hot: ["qp", "tp"], f: "tp" }
    ]),
    // Act 4 (moments 9-11). Benchmark Part2 #120 "Animated Dashboards"
    // https://lottiefiles.com/free-animation/animated-dashboards-6QvcIUjnYZ
    // Adapted: panel-to-panel transition â€” the rival's app screen, then Qasr's meeting, then the issue fades.
    A("P2#120", [
      P("ph", "screen", 98, 204, { w: 150, h: 228, lab: "Rival app" }),
      P("pi", "icon", 98, 180, { ic: "phone", sz: 70, col: C.green, idle: "v2float" }),
      P("pc", "pill", 98, 268, { w: 128, h: 34, lab: "Check in now", tone: "ok", ls: 14 }),
      P("tb", "table", 292, 132, { rx: 96, lab: "Qasr managers" }),
      P("ds", "bubble", 292, 214, { w: 160, lab: "Discussed it", tail: "t", col: C.navy }),
      P("ni", "pill", 292, 274, { w: 172, h: 52, lab: "No comparable|investment", tone: "off", ls: 14 }),
      P("bc", "pill", 260, 340, { w: 236, lab: "Background concern", ic: "cal", tone: "off" })
    ], [
      { t: "Eighteen months: mobile check-in", on: ["ph", "pi", "pc"], hot: ["pc"] },
      { t: "Discussed, never matched", on: ["tb", "ds", "ni"], hot: ["ni"] },
      { t: "No deadline, it fades", on: ["bc"], s: { ph: { dim: 1 }, pi: { dim: 1 }, pc: { dim: 1 }, ni: { dim: 1 } }, hot: ["bc"] }
    ]),
    // Act 5 (moments 12-15). Benchmark Part2 #116 "Infographics by Ruslan Klimovich"
    // https://motionarray.com/after-effects-templates/infographics-3844461/
    // Adapted: statistic graphics sequenced left then right, over a locked programme slot.
    A("P2#116", [
      P("ct", "tile", 104, 134, { w: 176, h: 112, lab: "Cost per room", v: "Up 9%", tone: "bad" }),
      P("cr", "pill", 104, 232, { w: 184, h: 50, lab: "Cost-cutting|review", ic: "doc", tone: "sky", ls: 14 }),
      P("a1", "icon", 262, 112, { ic: "users", sz: 46, col: C.plum }),
      P("a2", "icon", 336, 112, { ic: "users", sz: 46, col: C.plum }),
      P("al", "pill", 298, 172, { w: 184, h: 34, lab: "Two accounts lost", tone: "bad", ls: 14 }),
      P("sp", "pill", 298, 232, { w: 184, h: 50, lab: "Sales|action plan", ic: "doc", tone: "sky", ls: 14 }),
      P("bp", "pill", 140, 330, { w: 240, lab: "Broader BPM programme", ic: "lock", tone: "off", ls: 14 }),
      P("nf", "stamp", 326, 334, { lab: "Not funded", r: -8 })
    ], [
      { t: "Twelve months: costs +9%", on: ["ct"], hot: ["ct"] },
      { t: "A review, not BPM", on: ["cr", "bp"], hot: ["cr", "bp"], f: "bp" },
      { t: "Six months: accounts lost", on: ["a1", "a2", "al"], s: { a1: { x: 240, o: 0.55 }, a2: { x: 372, o: 0.55 } }, hot: ["al"] },
      { t: "Plan, still no programme", on: ["sp", "nf"], hot: ["nf"] }
    ]),
    // Act 6 (moments 16-19). Benchmark Part2 #139 "Corporate Timeline by Zargones"
    // https://motionarray.com/after-effects-templates/corporate-timeline-255459/
    // Adapted: events are introduced one row at a time and focus shifts to the one that differs.
    A("P2#139", [
      P("y0", "pill", 64, 90, { w: 108, h: 36, lab: "Two years", tone: "off", ls: 14 }),
      P("y1", "pill", 64, 140, { w: 108, h: 36, lab: "18 months", tone: "off", ls: 14 }),
      P("y2", "pill", 64, 190, { w: 108, h: 36, lab: "12 months", tone: "off", ls: 14 }),
      P("y3", "pill", 64, 240, { w: 108, h: 36, lab: "Six months", tone: "off", ls: 14 }),
      P("y4", "pill", 64, 290, { w: 108, h: 36, lab: "In March", tone: "warn", ls: 14 }),
      P("e0", "pill", 230, 90, { w: 214, h: 36, lab: "Satisfaction declining", tone: "sky", ls: 14 }),
      P("e1", "pill", 230, 140, { w: 214, h: 36, lab: "Rival mobile check-in", tone: "sky", ls: 14 }),
      P("e2", "pill", 230, 190, { w: 214, h: 36, lab: "Room cost up 9%", tone: "sky", ls: 14 }),
      P("e3", "pill", 230, 240, { w: 214, h: 36, lab: "Two accounts lost", tone: "sky", ls: 14 }),
      P("e4", "pill", 230, 290, { w: 214, h: 36, lab: "Authority announcement", tone: "warn", ls: 14 }),
      P("b0", "badge", 368, 90, { tone: "warn", sz: 1.15 }),
      P("b1", "badge", 368, 140, { tone: "warn", sz: 1.15 }),
      P("b2", "badge", 368, 190, { tone: "warn", sz: 1.15 }),
      P("b3", "badge", 368, 240, { tone: "warn", sz: 1.15 }),
      P("b4", "icon", 368, 290, { ic: "bolt", sz: 30, col: C.orange, idle: "v2flash" }),
      P("nc", "pill", 200, 348, { w: 300, lab: "No cross-department commitment", tone: "bad", ls: 14 }),
      P("jn", "pill", 110, 348, { w: 180, lab: "From January", ic: "cal", tone: "teal", ls: 14 }),
      P("hr", "pill", 296, 348, { w: 180, lab: "Within 24 hours", ic: "clock", tone: "teal", ls: 14 })
    ], [
      { t: "Each: limited response only", on: ["y0", "y1", "y2", "y3", "e0", "e1", "e2", "e3", "b0", "b1", "b2", "b3"], hot: ["b0", "b1", "b2", "b3"], f: "b2" },
      { t: "No cross-department commitment", on: ["nc"], hot: ["nc"] },
      { t: "March: the announcement", off: ["nc"], on: ["y4", "e4", "b4"], s: { e0: { dim: 1 }, e1: { dim: 1 }, e2: { dim: 1 }, e3: { dim: 1 } }, hot: ["e4"] },
      { t: "From January, 24 hours", on: ["jn", "hr"], hot: ["jn", "hr"], f: "hr" }
    ]),
    // Act 7 (moments 20-21). Benchmark Part2 #105 "World map with logistics"
    // https://lottiefiles.com/free-animation/world-map-with-logistics-qA3cpn3zMy
    // Adapted: routes between hubs are traced; most routes are local and do not reach the group record.
    A("P2#105", [
      L("k1", [60, 128], [170, 188], { col: C.grey, sw: 3.5, mid: [115, 158] }),
      L("k2", [153, 128], [190, 186], { col: C.grey, sw: 3.5, mid: [171, 157] }),
      L("k3", [247, 128], [210, 186], { col: C.grey, sw: 3.5, mid: [229, 157] }),
      L("k4", [340, 128], [230, 188], { col: C.grey, sw: 3.5, mid: [285, 158] }),
      P("s1", "db", 60, 88, { lab: "System 1" }),
      P("s2", "db", 153, 88, { lab: "System 2" }),
      P("s3", "db", 247, 88, { lab: "System 3" }),
      P("s4", "db", 340, 88, { lab: "System 4" }),
      P("cr", "pill", 200, 206, { w: 214, lab: "Complete record", ic: "doc", tone: "goal" }),
      P("gd", "grid14", 200, 300, { dy: 44 }),
      P("fh", "pill", 200, 300, { w: 196, h: 34, lab: "14 hotels and resorts", tone: "solid", ls: 14 })
    ], [
      { t: "Spread over four systems", on: ["s1", "s2", "s3", "s4", "k1", "k2", "k3", "k4", "cr"], s: { k1: { brk: 1 }, k2: { brk: 1 }, k3: { brk: 1 }, k4: { brk: 1 }, cr: { st: "goal" } }, hot: ["cr"] },
      { t: "Three local, fourteen hotels", on: ["gd", "fh"], s: { s2: { loc: 1, st: "bad" }, s3: { loc: 1, st: "bad" }, s4: { loc: 1, st: "bad" }, k2: { st: "bad", x: 1 }, k3: { st: "bad", x: 1 }, k4: { st: "bad", x: 1 }, gd: { drift: 1 } }, hot: ["fh"] }
    ]),
    // Act 8 (moments 22-25). Benchmark Part2 #140 "Corporate Timeline by MotionTores"
    // https://motionarray.com/after-effects-templates/corporate-timeline-77666/
    // Adapted: a path draws across the years, then typography fades in to name each segment.
    A("P2#140", [
      L("ry", [20, 204], [232, 204], { col: "#aab4bf", sw: 12 }),
      L("rw", [268, 204], [382, 204], { col: C.orange, sw: 12 }),
      P("d1", "icon", 50, 204, { ic: "warn", sz: 26, col: C.orange }),
      P("d2", "icon", 104, 204, { ic: "warn", sz: 26, col: C.orange }),
      P("d3", "icon", 158, 204, { ic: "warn", sz: 26, col: C.orange }),
      P("d4", "icon", 212, 204, { ic: "warn", sz: 26, col: C.orange }),
      P("bo", "bolt", 250, 204, { sz: 50 }),
      P("m1", "pill", 300, 252, { w: 172, h: 38, lab: "Programme funded", tone: "ok", ls: 14 }),
      P("m2", "pill", 300, 298, { w: 172, h: 38, lab: "Director named", tone: "ok", ls: 14 }),
      P("m3", "pill", 300, 344, { w: 172, h: 38, lab: "Deadline fixed", tone: "ok", ls: 14 }),
      P("te", "pill", 110, 276, { w: 196, h: 52, lab: "Years without|commitment", tone: "off", ls: 14 }),
      P("ti", "icon", 110, 340, { ic: "search", sz: 38, col: C.plum, idle: "v2float" }),
      P("bk", "bracket", 126, 168, { w: 208, side: "up", lab: "Drivers: continuing pressure", ls: 14, col: C.orange }),
      P("tr", "pill", 262, 84, { w: 250, lab: "Trigger: immediate commitment", tone: "warn", ls: 14 })
    ], [
      { t: "Five weeks: full commitment", on: ["ry", "rw", "d1", "d2", "d3", "d4", "bo", "m1", "m2", "m3"], hot: ["m1", "m2", "m3"], f: "m2" },
      { t: "Timing reveals the trigger", on: ["te", "ti"], hot: ["te", "bo"], f: "bo" },
      { t: "Earlier problems: drivers", on: ["bk"], hot: ["d1", "d2", "d3", "d4"], f: "d3" },
      { t: "The announcement: trigger", on: ["tr"], hot: ["tr", "bo"], f: "bo" }
    ]),
    // Act 9 (moments 26-29). Benchmark Part2 #122 "Dashboard by Weblodge"
    // https://lottiefiles.com/free-animation/deliver-better-optimized-lottie-json-animation-Qgvgddnv8J
    // Adapted: the interface is introduced, then one outcome is emphasised for the decision makers.
    A("P2#122", [
      P("tb", "table", 200, 114, { rx: 118, lab: "Qasr board" }),
      P("bl", "panel", 104, 262, { w: 184, h: 196, lab: "Problems: drivers", ls: 13, col: C.orange }),
      P("br", "panel", 296, 262, { w: 184, h: 196, lab: "Reason: trigger", ls: 13, col: C.gold }),
      P("p1", "pill", 104, 214, { w: 160, h: 30, lab: "Falling satisfaction", ls: 13, tone: "blush" }),
      P("p2", "pill", 104, 250, { w: 160, h: 30, lab: "Rival check-in", ls: 13, tone: "blush" }),
      P("p3", "pill", 104, 286, { w: 160, h: 30, lab: "Rising costs", ls: 13, tone: "blush" }),
      P("p4", "pill", 104, 322, { w: 160, h: 30, lab: "Lost accounts", ls: 13, tone: "blush" }),
      P("rb", "bolt", 296, 248, { sz: 60 }),
      P("rp", "pill", 296, 318, { w: 160, h: 46, lab: "Regulatory|announcement", ls: 13, tone: "warn" }),
      P("cy", "bar", 200, 236, { w: 320, lab: "Years: limited responses", max: 1, col: C.grey, ls: 14 }),
      P("cw", "bar", 200, 304, { w: 320, lab: "Five weeks: decisive commitment", max: 1, col: C.green, ls: 14 }),
      P("fr", "pill", 200, 214, { w: 226, lab: "Funding rationale", ic: "coin", tone: "solid" }),
      L("f1", [160, 236], [116, 274], { col: C.navy, sw: 4, arrow: 1 }),
      L("f2", [240, 236], [284, 274], { col: C.navy, sw: 4, arrow: 1 }),
      P("pr", "pill", 104, 296, { w: 176, h: 50, lab: "Programme|priorities", tone: "sky", ls: 14 }),
      P("sm", "pill", 296, 296, { w: 176, h: 50, lab: "Success|measures", tone: "sky", ls: 14 }),
      P("dd", "pill", 200, 352, { w: 250, lab: "Described differently?", ic: "q", tone: "unk", ls: 14 })
    ], [
      { t: "Don't confuse the two", on: ["tb", "bl", "br", "p1", "p2", "p3", "p4", "rb", "rp"], hot: ["bl", "br"], f: "rb" },
      { t: "Years versus five weeks", off: ["bl", "br", "p1", "p2", "p3", "p4", "rb", "rp"], on: ["cy", "cw"], s: { cy: { lv: 0.14 }, cw: { lv: 0.95 } }, hot: ["cw"] },
      { t: "Rationale shapes measures", off: ["cy", "cw"], on: ["fr", "f1", "f2", "pr", "sm"], hot: ["pr", "sm"], f: "fr" },
      { t: "Then described differently?", on: ["dd"], hot: ["dd"] }
    ])
  ]);

  // =====================================================================
  // W2O2b Â· The danger of two competing rationales â€” 31 moments, 10 acts
  // =====================================================================
  W.VL_SCENES["W2O2b"] = scene("W2O2b", [
    // Act 1 (moments 0-3). Benchmark Part2 #086 "Workflow by a"
    // https://lottiefiles.com/free-animation/workflow-9h24Ux0UOm
    // Adapted: a worker is revealed, then the workflow items she inherits appear one by one.
    A("P2#086", [
      P("dr", "person", 80, 226, { sz: 1.3, col: C.plum, lab: "Programme director", ls: 13 }),
      P("mt", "pill", 82, 96, { w: 146, h: 50, lab: "First board|meeting", ic: "cal", tone: "sky", ls: 14 }),
      P("br", "doc", 278, 210, { w: 214, h: 284, title: "Inherited brief", lines: ["Approved budget", "Urgent deadline", "Unaligned expectations", "Funded: compliance", "Inside: guest experience"], ls: 13 })
    ], [
      { t: "Preparing for the board", on: ["dr", "mt", "br"], s: { br: { rows: 0 } }, hot: ["mt"] },
      { t: "Budget, deadline, misalignment", s: { br: { rows: 3, hl: { 0: "g", 1: "y", 2: "r" } } }, hot: ["br"] },
      { t: "Funded after the announcement", s: { br: { rows: 4, hl: { 0: "g", 1: "y", 2: "r", 3: "b" } } }, hot: ["br"] },
      { t: "Managers: guest experience", s: { br: { rows: 5, hl: { 0: "g", 1: "y", 2: "r", 3: "b", 4: "g" } }, dr: { mood: "worry" } }, hot: ["br"] }
    ]),
    // Act 2 (moments 4-6). Benchmark Part2 #085 "Creative process Motion design creative project"
    // https://www.behance.net/gallery/190390491/Creative-process-Motion-design-creative-project
    // Adapted: an idea moves through iterations â€” from the guest's weakness, to hidden goals, to two named rationales.
    A("P2#085", [
      P("tv", "person", 70, 296, { col: C.teal, bag: 1, mood: "sad", lab: "Qasr traveller", ls: 14 }),
      P("wk", "pill", 252, 270, { w: 236, lab: "Weak service connections", tone: "blush", ls: 14 }),
      P("av", "pill", 252, 330, { w: 236, lab: "Ambition has value", ic: "check", tone: "ok", ls: 14 }),
      P("bp", "person", 96, 156, { sz: 0.9, col: C.navy, lab: "Board member", ls: 13 }),
      P("mp", "person", 304, 156, { sz: 0.9, col: C.gold, skin: C.skin2, lab: "Qasr manager", ls: 13 }),
      P("bb", "bubble", 100, 80, { w: 176, lab: "Success: compliance?", tail: "b", tx: -4, col: C.navy, ls: 14 }),
      P("mb", "bubble", 300, 80, { w: 176, lab: "Success: guests?", tail: "b", tx: 4, col: C.gold, tc: "#6e4f00", ls: 14 }),
      L("cf", [140, 156], [260, 156], { col: C.red, sw: 4, brk: 1, mid: [200, 156] }),
      P("fr", "card", 104, 284, { w: 180, h: 140, ic: "coin", lab: "Funding|rationale", sub: "Why money committed", col: C.navy, is: 36, ls: 16 }),
      P("ir", "card", 296, 284, { w: 180, h: 140, ic: "star", lab: "Improvement|rationale", sub: "Extra benefits sought", col: C.green, is: 36, ls: 16 })
    ], [
      { t: "The ambition has merit", on: ["tv", "wk", "av"], s: { tv: { wait: 1 } }, hot: ["av"] },
      { t: "Unspoken, conflicting success", off: ["tv", "wk", "av"], on: ["bp", "mp", "bb", "mb", "cf"], s: { cf: { st: "bad", x: 1 } }, hot: ["bb", "mb"], f: "cf" },
      { t: "Two kinds of rationale", on: ["fr", "ir"], s: { cf: { dim: 1 } }, hot: ["fr", "ir"], f: "fr" }
    ]),
    // Act 3 (moments 7-10). Benchmark Part2 #123 "DashBoard by Amit Prajapati"
    // https://lottiefiles.com/free-animation/dashboard-krY5yHjJRp
    // Adapted: a dashboard screen comes into focus and its tiles report â€” one tile answers, one does not.
    A("P2#123", [
      P("m9", "pill", 200, 66, { w: 170, h: 32, lab: "Month nine", ic: "cal", tone: "solid", ls: 14 }),
      P("sc", "screen", 200, 214, { w: 364, h: 236, lab: "Progress report" }),
      P("t1", "tile", 112, 200, { w: 164, h: 110, lab: "Arrival delays", v: "Fewer delays", tone: "ok", vs: 20 }),
      P("t2", "tile", 288, 200, { w: 164, h: 110, lab: "Complete records", v: "Not shown", tone: "unk", vs: 20 }),
      P("bq", "bubble", 200, 296, { w: 236, lab: "Ready by January?", tail: "t", tx: 70, col: C.red })
    ], [
      { t: "Month nine: show results", on: ["m9", "sc"], hot: ["m9"] },
      { t: "Guests wait less", on: ["t1"], hot: ["t1"] },
      { t: "Records not yet proven", on: ["t2"], hot: ["t2"] },
      { t: "Board asks about January", on: ["bq"], hot: ["bq"] }
    ]),
    // Act 4 (moments 11-12). Benchmark Part2 #132 "Easing Animations"
    // https://observablehq.com/@d3/easing-animations
    // Adapted: the same motion replayed with different timing â€” confidence swings down as answers miss.
    A("P2#132", [
      P("gg", "gauge", 200, 176, { r: 82, lab: "Board confidence", rev: 1 }),
      P("b1", "person", 54, 160, { sz: 0.8, col: C.navy }),
      P("b2", "person", 346, 160, { sz: 0.8, col: C.gold, skin: C.skin2 }),
      P("q1", "badge", 80, 118, { tone: "unk", sz: 1.2 }),
      P("q2", "badge", 372, 118, { tone: "unk", sz: 1.2 }),
      P("rp", "pill", 104, 296, { w: 168, h: 52, lab: "Reported:|guest gains", tone: "mint", ls: 14 }),
      P("ak", "pill", 296, 296, { w: 168, h: 52, lab: "Asked:|compliance proof", tone: "goal", ls: 14 }),
      L("mm", [188, 296], [212, 296], { col: C.red, sw: 4, mid: [200, 296] }),
      P("cg", "stamp", 200, 344, { lab: "Credibility gap", r: -4 })
    ], [
      { t: "Investment direction questioned", on: ["gg", "b1", "b2", "q1", "q2"], s: { gg: { lv: 0.45 }, b1: { mood: "worry" }, b2: { mood: "worry" } }, hot: ["gg"] },
      { t: "Wrong question answered", on: ["rp", "ak", "mm", "cg"], s: { gg: { lv: 0.15 }, mm: { st: "bad", x: 1 } }, hot: ["cg"] }
    ]),
    // Act 5 (moments 13-15). Benchmark Part2 #094 "Process - Success"
    // https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP
    // Adapted: activity turns into a check mark â€” but only as a target, while the journey stays broken.
    A("P2#094", [
      L("tk", [28, 120], [222, 120], { col: C.navy, sw: 6, tok: "doc", tc: C.navy, tn: 3, dur: 2.6 }),
      P("tm", "person", 52, 120, { sz: 0.8, col: C.teal }),
      P("rb", "panel", 300, 120, { w: 150, h: 92, lab: "Required records", ls: 13, fill: C.sand, col: C.gold }),
      P("ro", "pill", 150, 176, { w: 176, h: 34, lab: "Records-only focus", tone: "sky", ls: 14 }),
      P("cs", "pill", 300, 206, { w: 176, h: 50, lab: "Could satisfy|regulator", ic: "check", tone: "goal", ls: 14 }),
      L("jr", [30, 276], [262, 276], { col: C.red, sw: 5, brk: 1, mid: [146, 276] }),
      P("s1", "dept", 60, 276, { w: 52, h: 46, ic: "bell" }),
      P("s2", "dept", 146, 238, { w: 52, h: 46, ic: "bed" }),
      P("s3", "dept", 232, 276, { w: 52, h: 46, ic: "person" }),
      P("ju", "pill", 330, 276, { w: 118, h: 50, lab: "Journey|unchanged", tone: "bad", ls: 14 }),
      P("ma", "person", 60, 344, { sz: 0.66, col: C.gold }),
      P("mb", "person", 100, 344, { sz: 0.66, col: C.plum, skin: C.skin2 }),
      P("tl", "bubble", 240, 342, { w: 196, lab: "Too little value", tail: "l", col: C.red })
    ], [
      { t: "The opposite: records only", on: ["tk", "tm", "rb", "ro"], s: { tk: { flow: 1 } }, hot: ["rb"] },
      { t: "Regulator yes, journey no", on: ["cs", "jr", "s1", "s2", "s3", "ju"], s: { jr: { x: 1 } }, hot: ["cs", "ju"], f: "ju" },
      { t: "Managers see little value", on: ["ma", "mb", "tl"], s: { ma: { mood: "sad" }, mb: { mood: "angry" } }, hot: ["tl"] }
    ]),
    // Act 6 (moments 16-18). Benchmark Part2 #110 "Animated quadtree"
    // https://observablehq.com/@d3/animated-quadtree
    // Adapted: points are added, the space is subdivided, and each point lands in its region.
    A("P2#110", [
      P("c1", "pill", 104, 96, { w: 150, h: 50, lab: "Compliance|outcome", tone: "solid", ls: 14 }),
      P("c2", "pill", 296, 96, { w: 150, h: 50, lab: "Guest|experience", tone: "mint", ls: 14 }),
      P("hs", "icon", 200, 96, { ic: "handshake", sz: 38, col: C.green }),
      P("rm", "panel", 104, 248, { w: 186, h: 206, lab: "Mandatory outcomes", ls: 13, col: C.navy, fill: "#eef3f8" }),
      P("ra", "panel", 296, 248, { w: 186, h: 206, lab: "Additional value", ls: 13, col: C.green, fill: "#eef7f2" }),
      P("i1", "pill", 200, 210, { w: 160, h: 34, lab: "24-hour records", ls: 13, tone: "norm" }),
      P("i2", "pill", 200, 250, { w: 160, h: 34, lab: "Faster arrival", ls: 13, tone: "norm" }),
      P("i3", "pill", 200, 290, { w: 160, h: 34, lab: "January deadline", ls: 13, tone: "norm" }),
      P("i4", "pill", 200, 330, { w: 160, h: 34, lab: "Fewer handoffs", ls: 13, tone: "norm" }),
      P("nq", "badge", 200, 90, { tone: "unk", sz: 1.3, lab: "Nobody agrees", ls: 14 }),
      P("pp", "pill", 200, 96, { w: 280, lab: "Purpose connects both", ic: "link", tone: "solid", ls: 14 })
    ], [
      { t: "Not incompatible goals", on: ["c1", "c2", "hs"], hot: ["hs"] },
      { t: "Nobody agrees what's mandatory", off: ["c1", "c2", "hs"], on: ["rm", "ra", "i1", "i2", "i3", "i4", "nq"], s: { rm: { dim: 1 }, ra: { dim: 1 } }, hot: ["nq"] },
      { t: "Clear purpose sorts them", off: ["nq"], on: ["pp"], s: { rm: { dim: 0 }, ra: { dim: 0 }, i1: { x: 104, y: 214, st: "goal" }, i3: { x: 104, y: 260, st: "goal" }, i2: { x: 296, y: 214, st: "mint" }, i4: { x: 296, y: 260, st: "mint" } }, hot: ["pp"] }
    ]),
    // Act 7 (moments 19-21). Benchmark Part2 #125 "Infographics Dashboard"
    // https://lottiefiles.com/free-animation/infographics-dashboard-X6P5rVLZAB
    // Adapted: a metric graph grows against a reference line; without the reference the claim floats.
    A("P2#125", [
      P("pr", "card", 104, 132, { w: 176, h: 116, ic: "star", lab: "Promised|benefit", col: C.gold, is: 34 }),
      P("dm", "card", 296, 132, { w: 176, h: 116, ic: "chart", lab: "Demonstrated|result", col: C.green, is: 34 }),
      L("pd", [194, 132], [206, 132], { col: C.ink, sw: 3, arrow: 1 }),
      P("ch", "line", 200, 282, { w: 320, h: 112, pts: [0.32, 0.33, 0.31, 0.32, 0.5, 0.62, 0.7], col: C.green, base: 0.32, baseLab: "Recorded baseline", xlab: "Guest experience" }),
      P("hd", "stamp", 200, 270, { lab: "Hard to defend", r: -6 })
    ], [
      { t: "Promised versus demonstrated", on: ["pr", "dm", "pd"], s: { pr: { st: "goal" } }, hot: ["dm"] },
      { t: "Baseline: the starting point", on: ["ch"], s: { ch: { draw: 1, base: 1 }, pr: { dim: 1 }, dm: { dim: 1 } }, hot: ["ch"] },
      { t: "No baseline, weak claims", on: ["hd"], s: { ch: { base: 0 } }, hot: ["hd"] }
    ]),
    // Act 8 (moments 22-24). Benchmark B1 #62 "The Pudding one-hit wonders"
    // https://pudding.cool/2018/04/one-hit-wonders/
    // Adapted: a trajectory draws with a moving focus marker â€” attention spikes, then decays.
    A("B1#62", [
      P("at", "line", 200, 140, { w: 330, h: 120, pts: [0.18, 0.85, 0.9, 0.55, 0.28, 0.18], col: C.orange, xlab: "Executive attention", marks: [{ i: 1, lab: "Rule announced", w: 140, y: -48, col: C.orange, dx: 20 }, { i: 4, lab: "If rule met", w: 120, y: -10, col: C.navy }] }),
      P("n1", "pill", 72, 256, { w: 124, h: 50, lab: "Continued|sponsorship", ls: 13, tone: "goal" }),
      P("n2", "pill", 200, 256, { w: 124, h: 50, lab: "Ongoing|resources", ls: 13, tone: "goal" }),
      P("n3", "pill", 328, 256, { w: 124, h: 50, lab: "Clear|responsibility", ls: 13, tone: "goal" }),
      P("sp", "person", 78, 334, { sz: 0.8, col: C.navy }),
      P("st", "icon", 98, 300, { ic: "star", sz: 22, col: C.gold }),
      P("sl", "pill", 244, 334, { w: 252, h: 40, lab: "Sponsor secures commitment", tone: "solid", ls: 14 })
    ], [
      { t: "Urgency may fade", on: ["at"], s: { at: { draw: 1, mk: 2 } }, hot: ["at"] },
      { t: "Improvements still need support", on: ["n1", "n2", "n3"], hot: ["n1", "n2", "n3"], f: "n2" },
      { t: "What a sponsor does", on: ["sp", "st", "sl"], hot: ["sl"] }
    ]),
    // Act 9 (moments 25-26). Benchmark Part1 #032 "Supply Chain Animation"
    // https://www.behance.net/gallery/121206799/Supply-Chain-Animation
    // Adapted: a parcel passes between two actors â€” empty when undocumented, full when documented.
    A("P1#032", [
      P("so", "person", 74, 206, { sz: 1.15, col: C.navy, lab: "Original sponsor", ls: 13 }),
      P("su", "person", 326, 206, { sz: 1.15, col: C.plum, skin: C.skin2, lab: "New successor", ls: 13 }),
      P("fd", "doc", 126, 196, { w: 76, h: 92, rows: 3 }),
      P("sb", "bubble", 320, 100, { w: 150, lab: "Why continue?", tail: "b", tx: 6, col: C.plum }),
      P("nd", "stamp", 200, 300, { lab: "Never documented", r: -6 }),
      P("mb", "pill", 200, 296, { w: 226, h: 38, lab: "Measurable benefits", ic: "chart", tone: "ok", ls: 14 }),
      P("ga", "pill", 200, 344, { w: 226, h: 38, lab: "Governance agreed", ic: "shield", tone: "ok", ls: 14 })
    ], [
      { t: "Undocumented commitments lapse", on: ["so", "su", "fd", "sb", "nd"], s: { fd: { x: 236, d: 1.4, o: 0.55 }, so: { o: 0.5 }, su: { mood: "worry" } }, hot: ["nd"] },
      { t: "Document before urgency fades", off: ["nd", "sb"], on: ["mb", "ga"], s: { fd: { x: 248, o: 1, hl: { 0: "g", 1: "g", 2: "g" } }, su: { mood: "happy" } }, hot: ["mb", "ga"], f: "mb" }
    ]),
    // Act 10 (moments 27-30). Benchmark Part2 #126 "Stacked-to-grouped bars"
    // https://observablehq.com/@d3/stacked-to-grouped-bars
    // Adapted: bars keep their identity while regrouping â€” two outcomes reported separately, each with its reason.
    A("P2#126", [
      P("tb", "table", 200, 112, { rx: 118, lab: "Qasr board" }),
      P("cp", "bar", 200, 212, { w: 320, lab: "Progress to compliance", max: 1, col: C.gold, v: "Evidence due", ls: 14 }),
      P("gx", "bar", 200, 276, { w: 320, lab: "Guest experience", max: 1, col: C.green, v: "Versus baseline", ls: 14 }),
      P("r1", "pill", 104, 340, { w: 176, h: 38, lab: "Why it's funded", tone: "solid", ls: 14 }),
      P("r2", "pill", 296, 340, { w: 176, h: 38, lab: "Why it's valued", tone: "mint", ls: 14 }),
      P("ps", "doc", 200, 250, { w: 270, h: 200, title: "Purpose statement", lines: ["Required outcome", "Added ambition", "Evidence for each"], ls: 14 })
    ], [
      { t: "Back to month nine", on: ["tb"], hot: ["tb"] },
      { t: "Two outcomes, two measures", on: ["cp", "gx"], s: { cp: { lv: 0.55 }, gx: { lv: 0.45 } }, hot: ["cp", "gx"], f: "gx" },
      { t: "Judged by its reason", on: ["r1", "r2"], hot: ["r1", "r2"], f: "r1" },
      { t: "Next: a purpose statement", off: ["cp", "gx", "r1", "r2"], on: ["ps"], s: { ps: { hl: { 0: "y", 1: "g", 2: "b" } } }, hot: ["ps"] }
    ])
  ]);

  // =====================================================================
  // W2O2c Â· Writing a purpose the board can defend â€” 33 moments, 9 acts
  // =====================================================================
  W.VL_SCENES["W2O2c"] = scene("W2O2c", [
    // Act 1 (moments 0-3). Benchmark Part2 #084 "Process - What is a Motion Designer?"
    // https://www.behance.net/gallery/159045079/Process-What-is-a-Motion-Designer-
    // Adapted: a concept is revealed and advanced through illustrative beats on one working document.
    A("P2#084", [
      P("dr", "person", 78, 222, { sz: 1.3, col: C.plum, lab: "Programme director", ls: 13 }),
      P("fa", "pill", 82, 92, { w: 146, h: 50, lab: "Funding|approved", ic: "coin", tone: "ok", ls: 14 }),
      P("dc", "doc", 280, 210, { w: 214, h: 286, title: "Draft purpose", lines: ["Success means what?", "Reception: own plan", "Housekeeping: own plan", "Systems: own plan", "Obligation unmet"], ls: 13, stamps: ["Sets purpose"], stc: C.green, sy: 108 })
    ], [
      { t: "Drafting the purpose", on: ["dr", "dc"], s: { dc: { rows: 0 }, dr: { walk: 1 } }, hot: ["dc"] },
      { t: "Success not yet defined", on: ["fa"], s: { dc: { rows: 1, hl: { 0: "r" } }, dr: { walk: 0 } }, hot: ["fa"], f: "dc" },
      { t: "Departments drift apart", s: { dc: { rows: 5, hl: { 0: "r", 1: "y", 2: "y", 3: "y", 4: "r" } }, dr: { mood: "worry" } }, hot: ["dc"] },
      { t: "It's the programme charter", s: { dc: { lab: "Programme charter", stamp: 0 }, dr: { mood: "ok" } }, hot: ["dc"] }
    ]),
    // Act 2 (moments 4-7). Benchmark Part2 #083 "The Process Architectural Motion"
    // https://www.behance.net/gallery/194096661/The-Process-Architectural-Motion
    // Adapted: successive layers are built and then revised â€” a shared charter gains, then loses, its footing.
    A("P2#083", [
      P("ch", "doc", 200, 206, { w: 184, h: 230, title: "Programme charter", lines: ["World-class hospitality", "Digital transformation", "Compliance outcome?"], ls: 13 }),
      P("sp", "person", 54, 250, { sz: 0.9, col: C.navy }),
      P("tm", "person", 346, 250, { sz: 0.9, col: C.teal, skin: C.skin2 }),
      L("l1", [76, 250], [104, 250], { col: C.navy, sw: 3, arrow: 1 }),
      L("l2", [324, 250], [296, 250], { col: C.teal, sw: 3, arrow: 1 }),
      P("sb", "pill", 200, 352, { w: 236, lab: "Shared decision basis", tone: "ok", ls: 14 }),
      P("bq", "bubble", 58, 166, { w: 98, h: 52, lab: "Deliver|what?", tail: "b", tx: -4, col: C.plum, ls: 14 })
    ], [
      { t: "Shared basis for decisions", on: ["ch", "sp", "tm", "l1", "l2", "sb"], s: { ch: { rows: 0 } }, hot: ["sb"] },
      { t: "A world-class aspiration", s: { ch: { rows: 2, hl: { 0: "y", 1: "y" } } }, hot: ["ch"] },
      { t: "Board left unsure", on: ["bq"], s: { sp: { mood: "worry" } }, hot: ["bq"] },
      { t: "Broad change, no outcome", s: { ch: { rows: 3, hl: { 0: "y", 1: "y", 2: "r" }, sk: [1] }, sb: { st: "off", lab: "No testable outcome" } }, hot: ["ch"] }
    ]),
    // Act 3 (moments 8-11). Benchmark Part2 #134 "Shape tweening"
    // https://observablehq.com/@d3/shape-tweening
    // Adapted: a vague source shape is tweened into a precise target shape with a date and a clock.
    A("P2#134", [
      P("fn", "panel", 98, 214, { w: 176, h: 288, lab: "Scope boundary?", ls: 13, fill: "#f6f7f9", stroke: "#9aa6b2", dash: "8 6", col: C.grey }),
      P("u1", "pill", 86, 132, { w: 140, h: 34, lab: "Improvement idea", tone: "off", ls: 13 }),
      P("u2", "pill", 110, 214, { w: 140, h: 34, lab: "Improvement idea", tone: "off", ls: 13 }),
      P("u3", "pill", 84, 296, { w: 140, h: 34, lab: "Improvement idea", tone: "off", ls: 13 }),
      P("rq", "card", 298, 126, { w: 176, h: 112, ic: "doc", lab: "Guest-record|requirement", col: C.orange, is: 34, ls: 15 }),
      P("cs", "cal", 248, 244, { w: 88, h: 76, lab: "Defined start", ls: 13, due: 2 }),
      P("ck", "clock", 352, 244, { r: 34, lab: "Within 24h", ls: 13 }),
      P("vo", "pill", 298, 340, { w: 150, h: 50, lab: "Verifiable|outcome", ic: "check", tone: "mint", ls: 14 })
    ], [
      { t: "No boundary for scope", on: ["fn", "u1", "u2", "u3"], s: { u1: { r: -6 }, u2: { r: 5 }, u3: { r: -4 } }, hot: ["fn"] },
      { t: "Qasr's actual trigger", on: ["rq"], hot: ["rq"] },
      { t: "Start date, 24 hours", on: ["cs", "ck"], s: { cs: { due: 1, fill: 2 }, ck: { h: 1, st: "goal" } }, hot: ["cs", "ck"], f: "ck" },
      { t: "A verifiable outcome", on: ["vo"], hot: ["vo"] }
    ]),
    // Act 4 (moments 12-14). Benchmark Part2 #077 "Workflow AI Animation"
    // https://dribbble.com/shots/26275497-Workflow-AI-Animation
    // Adapted: data advances through stages; the redesign stage is what turns fragments into the required result.
    A("P2#077", [
      L("k1", [60, 130], [150, 186], { col: C.grey, sw: 3.5, tok: "dot", tc: C.navy, tn: 2 }),
      L("k2", [153, 130], [184, 184], { col: C.grey, sw: 3.5, tok: "dot", tc: C.navy, tn: 2 }),
      L("k3", [247, 130], [216, 184], { col: C.grey, sw: 3.5, tok: "dot", tc: C.navy, tn: 2 }),
      L("k4", [340, 130], [250, 186], { col: C.grey, sw: 3.5, tok: "dot", tc: C.navy, tn: 2 }),
      P("s1", "db", 60, 90, { lab: "System 1" }),
      P("s2", "db", 153, 90, { lab: "System 2" }),
      P("s3", "db", 247, 90, { lab: "System 3" }),
      P("s4", "db", 340, 90, { lab: "System 4" }),
      P("pr", "pill", 200, 206, { w: 220, lab: "Process redesign", ic: "gear", tone: "sky" }),
      L("pa", [200, 228], [200, 252], { col: C.gold, sw: 4, arrow: 1 }),
      P("rr", "pill", 200, 276, { w: 268, lab: "Complete record in 24h", ic: "doc", tone: "goal", ls: 14 }),
      P("gi", "pill", 200, 340, { w: 236, h: 36, lab: "Guest improvement too", ic: "star", tone: "mint", ls: 13 })
    ], [
      { t: "Fragments block reliability", on: ["s1", "s2", "s3", "s4", "k1", "k2", "k3", "k4", "rr"], s: { k1: { brk: 1 }, k2: { brk: 1 }, k3: { brk: 1 }, k4: { brk: 1 }, s2: { loc: 1 }, s3: { loc: 1 }, s4: { loc: 1 } }, hot: ["rr"] },
      { t: "Connect result and redesign", on: ["pr", "pa"], s: { k1: { brk: 0, flow: 1 }, k2: { brk: 0, flow: 1 }, k3: { brk: 0, flow: 1 }, k4: { brk: 0, flow: 1 } }, hot: ["pr"] },
      { t: "Ambition, not obscuring", on: ["gi"], hot: ["gi", "rr"], f: "gi" }
    ]),
    // Act 5 (moments 15-18). Benchmark Part2 #114 "Infographics Pack by JVARTS STUDIO"
    // https://motionarray.com/after-effects-templates/infographics-pack-100132/
    // Adapted: one metric element at a time is revealed and emphasised inside a single statement card.
    A("P2#114", [
      P("st", "doc", 200, 196, { w: 340, h: 208, title: "Proposed purpose", lines: ["Redesign guest-record processes", "Meet January's 24-hour rule", "While improving connected services"], ls: 14 }),
      P("ev", "pill", 200, 336, { w: 250, lab: "Based on case evidence", ic: "search", tone: "sky", ls: 14 }),
      P("ng", "pill", 200, 336, { w: 250, lab: "Benefits not guaranteed", ic: "star", tone: "goal", ls: 14 }),
      P("ob", "pill", 200, 336, { w: 250, lab: "An operational obstacle", ic: "warn", tone: "warn", ls: 14 })
    ], [
      { t: "A possible charter statement", on: ["st", "ev"], s: { st: { rows: 0 } }, hot: ["ev"] },
      { t: "The proposed purpose", s: { st: { rows: 3, hl: { 0: "b", 1: "b", 2: "b" } } }, hot: ["st"] },
      { t: "Required result, honest ambition", off: ["ev"], on: ["ng"], s: { st: { hl: { 1: "g", 2: "y" } } }, hot: ["ng"] },
      { t: "Fragmentation is operational", off: ["ng"], on: ["ob"], s: { st: { hl: { 0: "r", 1: "g", 2: "y" } } }, hot: ["ob"] }
    ]),
    // Act 6 (moments 19-22). Benchmark Part2 #092 "process connecting"
    // https://lottiefiles.com/free-animation/process-fmpDUgNx8K
    // Adapted: connections draw and join; each blank measure card flips to show what it will prove.
    A("P2#092", [
      P("m1", "card", 72, 168, { w: 120, h: 160, ic: "q", lab: "Measure|one", col: C.grey, back: "Record|in 24h", bic: "clock", bcol: C.gold, is: 40, ls: 15 }),
      P("m2", "card", 200, 168, { w: 120, h: 160, ic: "q", lab: "Measure|two", col: C.grey, back: "Guest|baseline", bic: "chart", bcol: C.green, is: 40, ls: 15 }),
      P("m3", "card", 328, 168, { w: 120, h: 160, ic: "q", lab: "Measure|three", col: C.grey, back: "Named|owner", bic: "key", bcol: C.plum, is: 40, ls: 15 }),
      P("p1", "pill", 72, 296, { w: 120, h: 50, lab: "Yes or|no test", tone: "goal", ls: 14 }),
      P("p2", "pill", 200, 296, { w: 120, h: 50, lab: "Record start|first", tone: "mint", ls: 14 }),
      P("p3", "pill", 328, 296, { w: 120, h: 50, lab: "Authority|across teams", tone: "unk", ls: 14 })
    ], [
      { t: "Measures to prove promises", on: ["m1", "m2", "m3"], hot: ["m1", "m2", "m3"], f: "m2" },
      { t: "Compliance: easiest test", on: ["p1"], s: { m1: { flip: 1 } }, hot: ["m1", "p1"], f: "m1" },
      { t: "Guest promise needs baseline", on: ["p2"], s: { m2: { flip: 1 } }, hot: ["m2", "p2"], f: "m2" },
      { t: "One owner, real authority", on: ["p3"], s: { m3: { flip: 1 } }, hot: ["m3", "p3"], f: "m3" }
    ]),
    // Act 7 (moments 23-25). Benchmark Part2 #133 "Path tween"
    // https://observablehq.com/@d3/path-tween
    // Adapted: a loose outline is morphed into a deliberate boundary that separates inside from later.
    A("P2#133", [
      P("sc", "card", 200, 118, { w: 270, h: 116, ic: "doc", lab: "Attractive|statement", col: C.navy, is: 34 }),
      P("na", "stamp", 200, 204, { lab: "Not enough alone", r: -5 }),
      P("a1", "pill", 72, 262, { w: 124, h: 50, lab: "Agreed|measures", tone: "goal", ls: 14 }),
      P("a2", "pill", 200, 262, { w: 124, h: 50, lab: "Named|owner", tone: "goal", ls: 14 }),
      P("a3", "pill", 328, 262, { w: 124, h: 50, lab: "Clear|scope", tone: "goal", ls: 14 }),
      P("bq", "bubble", 200, 80, { w: 230, lab: "What stays outside?", tail: "b", tx: -60, col: C.plum }),
      P("fz", "panel", 134, 238, { w: 236, h: 236, lab: "Programme scope", ls: 14, fill: "#eef3f8", stroke: C.navy, dash: "9 6" }),
      P("w1", "pill", 134, 196, { w: 196, h: 36, lab: "Included work", tone: "solid", ls: 14 }),
      P("w2", "pill", 134, 246, { w: 196, h: 36, lab: "Agreed boundaries", tone: "solid", ls: 14 }),
      P("lt", "pill", 322, 236, { w: 120, h: 50, lab: "Outside|for now", tone: "off", ls: 14 })
    ], [
      { t: "A statement alone fails", on: ["sc", "na", "a1", "a2", "a3"], hot: ["na"] },
      { t: "Board: what stays outside?", off: ["sc", "na", "a1", "a2", "a3"], on: ["bq", "fz"], hot: ["bq"] },
      { t: "Scope: work and boundaries", on: ["w1", "w2", "lt"], hot: ["fz"] }
    ]),
    // Act 8 (moments 26-29). Benchmark Part2 #117 "Infographics Elements by TarZanchik"
    // https://motionarray.com/after-effects-templates/infographics-elements-789489/
    // Adapted: shapes and data are revealed in sequence around one deadline axis.
    A("P2#117", [
      L("rl", [20, 124], [380, 124], { col: C.navy, sw: 6 }),
      P("dl", "icon", 292, 124, { ic: "flag", sz: 34, col: C.red }),
      P("dp", "pill", 292, 76, { w: 180, h: 34, lab: "January deadline", tone: "bad", ls: 14 }),
      P("mw", "pill", 120, 164, { w: 196, h: 36, lab: "Mandatory work first", tone: "goal", ls: 14 }),
      P("ex", "pill", 334, 164, { w: 108, h: 50, lab: "Extras|later", tone: "off", ls: 14 }),
      P("lg", "doc", 104, 278, { w: 184, h: 140, title: "Decision log", lines: ["Scope agreed", "Deferrals listed"], ls: 13 }),
      P("e1", "person", 246, 252, { sz: 0.66, col: C.teal }),
      P("e2", "person", 290, 252, { sz: 0.66, col: C.plum, skin: C.skin2 }),
      P("e3", "person", 334, 252, { sz: 0.66, col: C.gold }),
      P("ad", "bar", 292, 324, { w: 176, lab: "Staff adoption", max: 1, col: C.green, ls: 14 }),
      P("ap", "stamp", 200, 250, { lab: "Otherwise: aspiration", r: -6 })
    ], [
      { t: "Deadline forces scope choices", on: ["rl", "dl", "dp", "mw", "ex"], hot: ["mw", "ex"], f: "dl" },
      { t: "Write the choices down", on: ["lg"], s: { lg: { hl: { 0: "g", 1: "g" } } }, hot: ["lg"] },
      { t: "Adoption decides reliability", on: ["e1", "e2", "e3", "ad"], s: { ad: { lv: 0.7 }, e1: { mood: "happy" }, e3: { mood: "worry" } }, hot: ["ad"] },
      { t: "Unexplained means aspiration", on: ["ap"], s: { lg: { dim: 1 }, ad: { dim: 1 }, mw: { dim: 1 } }, hot: ["ap"] }
    ]),
    // Act 9 (moments 30-32). Benchmark Part2 #091 "cro process"
    // https://lottiefiles.com/free-animation/cro-process-RaUu5ps2to
    // Adapted: movement across business steps â€” the test runs along three linked steps.
    A("P2#091", [
      P("wq", "doc", 200, 138, { w: 260, h: 140, title: "Wrong questions", lines: ["Sounds attractive?", "Looks impressive?"], ls: 14 }),
      L("c1", [124, 262], [142, 262], { col: C.navy, sw: 4, arrow: 1 }),
      L("c2", [258, 262], [276, 262], { col: C.navy, sw: 4, arrow: 1 }),
      P("n1", "pill", 66, 262, { w: 112, h: 52, lab: "Regulatory|trigger", tone: "warn", ls: 13 }),
      P("n2", "pill", 200, 262, { w: 112, h: 52, lab: "Required|outcome", tone: "goal", ls: 13 }),
      P("n3", "pill", 334, 262, { w: 112, h: 52, lab: "Defensible|evidence", tone: "mint", ls: 13 }),
      P("nx", "pill", 200, 342, { w: 260, lab: "Next: manage the process", ic: "loop", tone: "solid", ls: 14 })
    ], [
      { t: "Sounding good isn't enough", on: ["wq"], s: { wq: { sk: [0, 1] } }, hot: ["wq"] },
      { t: "Trigger, outcome, evidence", on: ["c1", "c2", "n1", "n2", "n3"], s: { wq: { dim: 1 } }, hot: ["n1", "n2", "n3"], f: "n2" },
      { t: "Next: the complete process", on: ["nx"], hot: ["nx"] }
    ])
  ]);

})();
// END FILE w02-claude-v2-part2.js

// FILE w02-claude-v2-part3.js
// OPER621 Â· Week 2 Â· Drivers and Triggers for BPM â€” animated teaching scenes (v2), part 3 of 4.
// Lesson 3 Â· Managing the complete business process. Sections: W2O3a, W2O3b, W2O3c. Standalone: defines every helper it uses, registers its own
// scenes, and appends its own scoped rules to the shared <style id="vl-sc-w02">. Parts load in any order.
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }.
// Design (v2): one beat per narration moment. Each act is an original composition adapted from the
// benchmark named (with URL) in the comment above it; a new act every 3-4 moments; every moment sets an
// explicit object-level state for its own sentence, and the header chip names that sentence's claim in
// 2-4 words. Uses window.gsap when present, CSS transitions otherwise; honours prefers-reduced-motion.
(() => {
  "use strict";
  const SECS = ["W2O3a","W2O3b","W2O3c"];
  // =====================================================================
  // KIT (self-contained in this part; every helper used is defined here)
  // Stage: viewBox 0 0 400 380. Header chip y 8-44, figure area y 54-374.
  // Each act = a composition of "props"; each narration moment = one beat
  // that sets an explicit object-level state for that sentence.
  // =====================================================================
  const W = window;
  W.VL_SCENES = W.VL_SCENES || {};
  const C = {
    navy: "#1d4f7a", ink: "#17283a", orange: "#cf5427", red: "#c0392b", green: "#1f7f5c",
    gold: "#b7820f", plum: "#6a4c93", teal: "#13808a", grey: "#7b8896", pale: "#e3e9ef",
    paper: "#fbf8f2", white: "#ffffff", mint: "#e0f2e9", blush: "#fbe4da", sand: "#f7eed8",
    sky: "#e2eef8", lilac: "#eee8f7", skin: "#e8b88e", skin2: "#b97f55", hair: "#3a2a20"
  };
  // status palettes: [fill, stroke, text]
  const TONE = {
    norm: ["#ffffff", C.navy, C.ink], ok: [C.green, C.green, "#ffffff"], bad: [C.red, C.red, "#ffffff"],
    warn: [C.orange, C.orange, "#ffffff"], goal: ["#fff7e3", C.gold, "#6e4f00"], solid: [C.navy, C.navy, "#ffffff"],
    unk: ["#f1ecf8", C.plum, C.plum], off: ["#eef1f4", "#9aa6b2", "#5d6b78"], mint: [C.mint, C.green, "#125a3f"],
    blush: [C.blush, C.red, "#8a2418"], sky: [C.sky, C.navy, C.navy], plum: [C.plum, C.plum, "#ffffff"],
    gold: [C.gold, C.gold, "#ffffff"], teal: [C.teal, C.teal, "#ffffff"]
  };
  const tone = k => TONE[k] || TONE.norm;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const q = (g, s) => (g ? g.querySelector(s) : null);
  const qa = (g, s) => (g ? Array.prototype.slice.call(g.querySelectorAll(s)) : []);
  const RM = () => { try { return !!W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } };
  let INST = false;

  // ---------- SVG string builders ----------
  function T(x, y, s, o) {
    o = o || {};
    const size = o.sz || 16, lines = String(s).split("|"), lh = Math.round(size * 1.17);
    const y0 = y - (lines.length - 1) * lh / 2;
    return `<text class="v2t ${o.cls || ""}" x="${x}" y="${y0}" data-cy="${y}"${o.mw ? ` data-mw="${o.mw}"` : ""} font-size="${size}" font-weight="${o.w || 700}" fill="${o.fill || C.ink}" text-anchor="${o.a || "middle"}" dominant-baseline="central">` +
      lines.map((l, i) => `<tspan x="${x}" dy="${i ? lh : 0}">${esc(l)}</tspan>`).join("") + `</text>`;
  }
  function setLab(el, s) {
    if (!el || s == null || el._s === s) return;
    el._s = s;
    const x = el.getAttribute("x"), size = +el.getAttribute("font-size"), cy = +el.getAttribute("data-cy");
    const lines = String(s).split("|"), lh = Math.round(size * 1.17);
    el.setAttribute("y", cy - (lines.length - 1) * lh / 2);
    el.innerHTML = lines.map((l, i) => `<tspan x="${x}" dy="${i ? lh : 0}">${esc(l)}</tspan>`).join("");
  }
  function R(x, y, w, h, o) {
    o = o || {};
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx == null ? 10 : o.rx}" fill="${o.fill || "none"}"` +
      (o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 2}"` : "") + (o.dash ? ` stroke-dasharray="${o.dash}"` : "") +
      (o.op != null ? ` opacity="${o.op}"` : "") + (o.cls ? ` class="${o.cls}"` : "") + `/>`;
  }
  function CI(x, y, r, o) {
    o = o || {};
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${o.fill || "none"}"` + (o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 2}"` : "") +
      (o.dash ? ` stroke-dasharray="${o.dash}"` : "") + (o.op != null ? ` opacity="${o.op}"` : "") + (o.cls ? ` class="${o.cls}"` : "") + `/>`;
  }
  function PA(d, o) {
    o = o || {};
    return `<path d="${d}" fill="${o.fill || "none"}" stroke="${o.stroke || "none"}" stroke-width="${o.sw == null ? 3 : o.sw}" stroke-linecap="round" stroke-linejoin="round"` +
      (o.draw ? ` pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"` : "") + (o.dash ? ` stroke-dasharray="${o.dash}"` : "") +
      (o.op != null ? ` opacity="${o.op}"` : "") + (o.cls ? ` class="${o.cls}"` : "") + `/>`;
  }
  // ---------- icon set (24-unit grid) ----------
  function ico(n, x, y, s, col, det) {
    s = s || 28; col = col || C.navy;
    const S = `fill="none" stroke="${col}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"`, F = `fill="${col}"`;
    const P = {
      check: `<path d="M4 12.5l5 5L20 6" ${S.replace("2.4", "3.4")}/>`,
      x: `<path d="M6 6l12 12M18 6L6 18" ${S.replace("2.4", "3.4")}/>`,
      warn: `<path d="M12 2.5L22.5 21h-21z" ${F}/><path d="M12 9v6" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="12" cy="18" r="1.4" fill="#fff"/>`,
      clock: `<circle cx="12" cy="12" r="9.5" ${S}/><path d="M12 6.5V12l4 2.5" ${S}/>`,
      bolt: `<path d="M13.5 1.5L4 14h7l-1.5 8.5L20 9.5h-7z" ${F}/>`,
      doc: `<path d="M6 2.5h8l4.5 4.5v14.5H6z" ${S}/><path d="M9 11h7M9 15h7M9 19h5" ${S}/>`,
      person: `<circle cx="12" cy="7" r="4.2" ${F}/><path d="M3.5 22c0-5.2 3.8-8.6 8.5-8.6s8.5 3.4 8.5 8.6z" ${F}/>`,
      users: `<circle cx="8.5" cy="8" r="3.6" ${F}/><circle cx="16.5" cy="8.5" r="3" ${F} opacity=".7"/><path d="M1.5 21c0-4.4 3.1-7.2 7-7.2s7 2.8 7 7.2z" ${F}/><path d="M14 13.6c4 0 7.5 2.4 7.5 7.4h-4" ${F} opacity=".7"/>`,
      phone: `<rect x="6.5" y="1.5" width="11" height="21" rx="2.5" ${S}/><circle cx="12" cy="18.5" r="1.3" ${F}/><path d="M9.5 9l2 2 3.5-4" ${S}/>`,
      coin: `<circle cx="12" cy="12" r="10" ${F}/><circle cx="12" cy="12" r="6.5" fill="none" stroke="#fff" stroke-width="1.8"/>`,
      lock: `<rect x="4.5" y="10.5" width="15" height="11" rx="2" ${F}/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" ${S}/>`,
      unlock: `<rect x="4.5" y="10.5" width="15" height="11" rx="2" ${F}/><path d="M8 10.5V7.5a4 4 0 0 1 7.6-1.8" ${S}/>`,
      flag: `<path d="M5 22V3" ${S}/><path d="M5 3.5h13l-3 4.5 3 4.5H5z" ${F}/>`,
      eye: `<path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z" ${S}/><circle cx="12" cy="12" r="3.3" ${F}/>`,
      house: `<path d="M2.5 11.5L12 3l9.5 8.5V21h-19z" ${F}/><rect x="9.5" y="14" width="5" height="7" fill="#fff"/>`,
      gear: `<circle cx="12" cy="12" r="4" ${S}/><path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4M4.6 4.6l2.8 2.8M16.6 16.6l2.8 2.8M4.6 19.4l2.8-2.8M16.6 7.4l2.8-2.8" ${S}/>`,
      chart: `<path d="M3 21h18" ${S}/><rect x="5" y="12" width="3.5" height="8" ${F}/><rect x="10.3" y="7" width="3.5" height="13" ${F}/><rect x="15.6" y="3" width="3.5" height="17" ${F}/>`,
      down: `<path d="M3 5l6 7 4-3 8 10" ${S}/><path d="M15 19h6v-6" ${S}/>`,
      up: `<path d="M3 19l6-7 4 3 8-10" ${S}/><path d="M15 5h6v6" ${S}/>`,
      bell: `<path d="M5 17h14l-1.8-2.5V10a5.2 5.2 0 0 0-10.4 0v4.5z" ${F}/><path d="M10 20a2 2 0 0 0 4 0" ${S}/>`,
      qm: `<path d="M8.3 8.6a3.7 3.7 0 1 1 5 3.4c-1 .5-1.3 1.1-1.3 2.4" ${S.replace("2.4", "3")}/><circle cx="12" cy="18.6" r="1.7" ${F}/>`,
      q: `<circle cx="12" cy="12" r="10.5" ${F}/><path d="M9.2 9.3a2.9 2.9 0 1 1 3.9 2.7c-.8.4-1.1.9-1.1 1.8" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="17.4" r="1.4" fill="#fff"/>`,
      star: `<path d="M12 2l3 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.8 5.7 21.4l1.5-7.1L1.8 9.4 9 8.6z" ${F}/>`,
      cal: `<rect x="3" y="4.5" width="18" height="17" rx="2" ${S}/><path d="M3 9.5h18M8 2.5v4M16 2.5v4" ${S}/>`,
      chat: `<path d="M3 4.5h18v12H10l-5 4v-4H3z" ${F}/>`,
      key: `<circle cx="7.5" cy="12" r="4.5" ${S}/><path d="M12 12h10M18 12v4M21 12v3" ${S}/>`,
      db: `<ellipse cx="12" cy="5.5" rx="8" ry="3" ${S}/><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" ${S}/>`,
      seal: `<circle cx="12" cy="10" r="7.5" ${F}/><path d="M8 16l-2 6 4-2 2 3 1-6M16 16l2 6-4-2" ${F}/><path d="M8.6 10.2l2.4 2.4 4.4-4.6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`,
      mail: `<rect x="2.5" y="5" width="19" height="14" rx="2" ${F}/><path d="M3.5 6.5l8.5 6.5 8.5-6.5" fill="none" stroke="#fff" stroke-width="1.8"/>`,
      search: `<circle cx="10" cy="10" r="6.5" ${S}/><path d="M15 15l6 6" ${S.replace("2.4", "3.4")}/>`,
      bed: `<path d="M2.5 19V7M2.5 15h19v4M21.5 15v-3a3 3 0 0 0-3-3h-8v6" ${S}/><circle cx="6.5" cy="11.5" r="2" ${F}/>`,
      hotel: `<rect x="4" y="3" width="16" height="18.5" rx="1.5" ${F}/><path d="M7.5 7h2M11 7h2M14.5 7h2M7.5 11h2M11 11h2M14.5 11h2M7.5 15h2M14.5 15h2" stroke="#fff" stroke-width="1.8"/><rect x="10.5" y="16" width="3" height="5.5" fill="#fff"/>`,
      target: `<circle cx="12" cy="12" r="9.5" ${S}/><circle cx="12" cy="12" r="5" ${S}/><circle cx="12" cy="12" r="1.6" ${F}/>`,
      gavel: `<path d="M13 3l6 6M10.5 5.5l6 6M11.5 4.5l-4 4 6 6 4-4M9.5 10.5L3 17l2.5 2.5L12 13" ${S}/><path d="M13 21h8" ${S}/>`,
      shield: `<path d="M12 2.5l8 3v6c0 5-3.5 8.7-8 10-4.5-1.3-8-5-8-10v-6z" ${F}/><path d="M8.5 12l2.5 2.5 4.5-5" fill="none" stroke="#fff" stroke-width="2"/>`,
      book: `<path d="M3 5c3-1.5 6-1.5 9 0v15c-3-1.5-6-1.5-9 0zM12 5c3-1.5 6-1.5 9 0v15c-3-1.5-6-1.5-9 0z" ${S}/>`,
      loop: `<path d="M20 11a8 8 0 1 0-2.4 6" ${S}/><path d="M20 4v7h-7" ${S}/>`,
      money: `<rect x="2" y="6" width="20" height="12" rx="2" ${F}/><circle cx="12" cy="12" r="3" fill="none" stroke="#fff" stroke-width="1.8"/>`,
      plug: `<path d="M8 3v5M16 3v5M5.5 8h13v3a6.5 6.5 0 0 1-13 0zM12 17.5V22" ${S}/>`,
      link: `<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" ${S}/>`,
      pin: `<path d="M12 22s7-7.2 7-12.5A7 7 0 0 0 5 9.5C5 14.8 12 22 12 22z" ${F}/><circle cx="12" cy="9.5" r="2.6" fill="#fff"/>`,
      reply: `<path d="M10 6L4 12l6 6M4 12h10a6 6 0 0 1 6 6v1" ${S}/>`,
      handshake: `<path d="M2 11l4-4 4 2 3-2 4 1 5 3M6 7l-4 7 3 3M22 11l-4 6-3-1M9 13l3 3M11 11l4 4M13 9l4 4" ${S}/>`
    };
    const body = (P[n] || P.q);
    return `<g transform="translate(${(x - s / 2).toFixed(1)} ${(y - s / 2).toFixed(1)}) scale(${(s / 24).toFixed(4)})">${det ? body.replace(/"#fff"/g, `"${det}"`) : body}</g>`;
  }

  // ---------- motion (GSAP when present, CSS transitions otherwise) ----------
  const EASE = { back: ["back.out(1.7)", "cubic-bezier(.34,1.56,.64,1)"], soft: ["power2.inOut", "cubic-bezier(.45,0,.2,1)"], elastic: ["elastic.out(1,0.55)", "cubic-bezier(.34,1.8,.5,1)"] };
  function go(n, v) {
    if (!n) return;
    const G = W.gsap, inst = INST || RM();
    const x = v.x || 0, y = v.y || 0, r = v.r || 0, s = v.s == null ? 1 : v.s;
    const sx = v.sx == null ? s : v.sx, sy = v.sy == null ? s : v.sy, o = v.o == null ? 1 : v.o, e = EASE[v.e];
    if (G && typeof G.to === "function") {
      const p = { x, y, rotation: r, scaleX: sx, scaleY: sy, opacity: o, transformOrigin: v.to || "50% 50%", overwrite: "auto" };
      if (inst) G.set(n, p); else G.to(n, Object.assign(p, { duration: v.d || 0.7, ease: e ? e[0] : "power3.out", delay: v.dl || 0 }));
      return;
    }
    n.style.transitionDuration = inst ? "0s" : (v.d || 0.7) + "s";
    n.style.transitionDelay = inst ? "0s" : (v.dl || 0) + "s";
    n.style.transitionTimingFunction = e ? e[1] : "";
    n.style.transformOrigin = v.to || "";
    n.style.transform = `translate(${x}px,${y}px) rotate(${r}deg) scale(${sx},${sy})`;
    n.style.opacity = String(o);
  }
  function dash(n, v) { if (n) { n.style.transition = (INST || RM()) ? "none" : ""; n.style.strokeDashoffset = String(v); } }
  function paint(n, f, s, t) { if (!n) return; if (f != null) n.style.fill = f; if (s != null) n.style.stroke = s; if (t != null) n.style.strokeDasharray = t; }
  const shown = (n, on) => { if (n) n.style.display = on ? "" : "none"; };
  const reflow = n => { if (n) void n.getBoundingClientRect(); };
  function restart(n, cls) { if (!n || INST || RM()) return; n.classList.remove(cls); reflow(n); n.classList.add(cls); }

  // ---------- props ----------
  const LAB = (x, y, s, o) => T(x, y, s, Object.assign({}, o || {}, { cls: "lab " + ((o && o.cls) || "") }));
  const K = {};
  const MOODS = {
    happy: `<path class="mo mo-happy" d="M-5.5 -15.5Q0 -10 5.5 -15.5" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>`,
    ok: `<path class="mo mo-ok" d="M-4.5 -14.5H4.5" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>`,
    sad: `<path class="mo mo-sad" d="M-5.5 -12Q0 -17.5 5.5 -12" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>`,
    worry: `<g class="mo mo-worry"><path d="M-5 -13.5q2.5-2.5 5 0t5 0" fill="none" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/><path d="M-8 -27l5-2M8 -27l-5-2" stroke="${C.ink}" stroke-width="1.8" stroke-linecap="round"/></g>`,
    angry: `<g class="mo mo-angry"><path d="M-5.5 -12Q0 -17 5.5 -12" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/><path d="M-8 -29l5 2.5M8 -29l-5 2.5" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/></g>`
  };
  K.person = {
    b(p) {
      const z = p.sz || 1, col = p.col || C.navy;
      const fig = `<g class="pf"><g transform="scale(${z})">` +
        (p.bag ? `<rect x="17" y="4" width="17" height="20" rx="3" fill="${C.gold}"/><path d="M21.5 4v-4h8v4" stroke="${C.gold}" stroke-width="2.4" fill="none"/>` : "") +
        `<path d="M-18 24V7c0-10 8-15.5 18-15.5S18-3 18 7v17z" fill="${col}"/>` +
        `<circle cx="0" cy="-22" r="13" fill="${p.skin || C.skin}"/>` +
        `<path d="M-13.2 -23.5c0-9.5 6-13.8 13.2-13.8s13.2 4.3 13.2 13.8c-3.5-5.2-8-6.4-13.2-6.4s-9.7 1.2-13.2 6.4z" fill="${p.hair || C.hair}"/>` +
        `<circle cx="-4.6" cy="-20.5" r="1.9" fill="${C.ink}"/><circle cx="4.6" cy="-20.5" r="1.9" fill="${C.ink}"/>` +
        Object.keys(MOODS).map(k => MOODS[k]).join("") + `</g></g>`;
      return fig + (p.lab ? LAB(0, 26 * z + 18, p.lab, { sz: p.ls || 15, fill: p.lc || C.ink }) : "");
    },
    u(g, p, st) {
      const m = st.mood || p.mood || "ok";
      qa(g, ".mo").forEach(e => shown(e, e.classList.contains("mo-" + m)));
      const f = q(g, ".pf"); if (f) f.classList.toggle("v2bob", !!(st.walk || st.wait) && st.on);
    },
    bb: p => { const z = p.sz || 1; return [-20 * z, -37 * z, 40 * z, 62 * z]; }
  };
  K.hotel = {
    b(p) {
      const w = p.w || 150, h = p.h || 130, x0 = -w / 2, y0 = -h / 2, col = p.col || C.navy;
      let s = PA(`M${x0 - 6} ${y0 + 26}L0 ${y0}L${-x0 + 6} ${y0 + 26}Z`, { fill: col, stroke: col, sw: 2 });
      s += R(x0, y0 + 24, w, h - 24, { fill: "#ffffff", stroke: col, sw: 3, rx: 4 });
      s += R(x0 + 10, y0 + 32, w - 20, 30, { fill: col, rx: 6, cls: "v2c hsign" }) + LAB(0, y0 + 47, p.lab || "", { sz: p.ls || 14, fill: "#ffffff" });
      const top = y0 + 72, rows = Math.max(1, Math.floor((h - 72 - 34) / 26)), cols = Math.max(2, Math.floor((w - 20) / 30));
      const sp = (w - 20) / cols;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) s += R(x0 + 10 + c * sp + sp / 2 - 9, top + r * 26, 18, 16, { fill: "#cfd8e2", rx: 3, cls: "v2c hwin" });
      s += R(-12, h / 2 - 30, 24, 30, { fill: col, rx: 3 });
      return `<g class="hb">${s}</g>`;
    },
    u(g, p, st) {
      qa(g, ".hwin").forEach((e, i) => paint(e, st.lit ? (i % 3 === 1 ? "#f3d27a" : "#f7e3a6") : "#cfd8e2"));
      paint(q(g, ".hsign"), st.st === "bad" ? C.red : st.st === "ok" ? C.green : (p.col || C.navy));
      const b = q(g, ".hb"); if (b) b.classList.toggle("v2shake", !!st.shake && st.on);
    },
    bb: p => [-(p.w || 150) / 2 - 6, -(p.h || 130) / 2, (p.w || 150) + 12, p.h || 130]
  };
  function badge(x, y) {
    return `<g class="bdgg">` + CI(x, y, 13, { fill: C.green, stroke: "#ffffff", sw: 2.5, cls: "v2c bdg" }) +
      ["ok:check", "bad:x", "warn:warn", "lock:lock", "unk:qm", "open:unlock"].map(a => { const [k, ic] = a.split(":"); return `<g class="bi bi-${k}">${ico(ic, x, y, 15, "#ffffff")}</g>`; }).join("") + `</g>`;
  }
  const BADGEC = { ok: C.green, bad: C.red, warn: C.orange, lock: C.red, unk: C.plum, open: C.green };
  function setBadge(g, k) {
    const b = q(g, ".bdgg"); shown(b, !!BADGEC[k]);
    if (!BADGEC[k]) return;
    qa(g, ".bi").forEach(e => shown(e, e.classList.contains("bi-" + k)));
    paint(q(g, ".bdg"), BADGEC[k]);
  }
  K.dept = {
    b(p) {
      const w = p.w || 78, h = p.h || 66, col = p.col || C.navy;
      return R(-w / 2, -h / 2, w, h, { rx: 14, fill: "#ffffff", stroke: col, sw: 3, cls: "v2c dbox" }) + ico(p.ic || "gear", 0, 0, Math.min(w, h) * 0.56, col) +
        badge(w / 2 - 4, -h / 2 + 4) + (p.lab ? LAB(0, h / 2 + (String(p.lab).indexOf("|") >= 0 ? 24 : 16), p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { setBadge(g, st.st); paint(q(g, ".dbox"), st.st === "bad" ? C.blush : st.st === "ok" ? C.mint : "#ffffff", st.st === "bad" ? C.red : (p.col || C.navy)); },
    bb: p => [-(p.w || 78) / 2, -(p.h || 66) / 2, p.w || 78, p.h || 66]
  };
  K.db = {
    b(p) {
      const col = p.col || C.navy;
      return PA("M-26 -22V20a26 8 0 0 0 52 0V-22", { fill: "#ffffff", stroke: col, sw: 3, cls: "v2c dbb" }) +
        `<ellipse cx="0" cy="-22" rx="26" ry="8" fill="${C.sky}" stroke="${col}" stroke-width="3"/>` +
        PA("M-26 -6a26 8 0 0 0 52 0M-26 8a26 8 0 0 0 52 0", { stroke: col, sw: 2 }) +
        `<g class="dloc">${CI(24, -26, 13, { fill: C.gold, stroke: "#ffffff", sw: 2 })}${ico("house", 24, -26, 14, "#ffffff")}</g>` +
        badge(-24, -26) + (p.lab ? LAB(0, 46, p.lab, { sz: p.ls || 14 }) : "");
    },
    u(g, p, st) { shown(q(g, ".dloc"), !!st.loc); setBadge(g, st.st); paint(q(g, ".dbb"), st.st === "bad" ? C.blush : "#ffffff"); },
    bb: () => [-28, -32, 56, 64]
  };
  const HLC = { y: "#f6dd8a", r: "#f4b6a4", g: "#bfe4cf", b: "#cfe0f2" };
  K.doc = {
    b(p) {
      const w = p.w || 160, h = p.h || 200, x0 = -w / 2, y0 = -h / 2, col = p.col || C.navy, L = p.lines || [], n = L.length || p.rows || 6;
      const top = y0 + (p.title ? 50 : 16), rh = p.rh || Math.min(36, (h - (top - y0) - 10) / n);
      let s = PA(`M${x0} ${y0 + 6}a6 6 0 0 1 6 -6H${-x0 - 22}L${-x0} ${y0 + 22}V${-y0 - 6}a6 6 0 0 1 -6 6H${x0 + 6}a6 6 0 0 1 -6 -6Z`, { fill: "#ffffff", stroke: col, sw: 3 });
      s += PA(`M${-x0 - 22} ${y0}V${y0 + 22}H${-x0}`, { stroke: col, sw: 2.5 });
      if (p.title) s += R(x0 + 8, y0 + 8, w - 36, 34, { fill: col, rx: 7 }) + LAB(-14, y0 + 25, p.title, { sz: p.ts || 14, fill: "#ffffff" });
      for (let i = 0; i < n; i++) {
        const y = top + rh * i + rh / 2;
        s += `<g class="rw rw${i}">` + R(x0 + 8, y - rh / 2 + 2, w - 16, rh - 4, { fill: "transparent", rx: 5, cls: `v2c hl hl${i}` });
        s += L[i] ? T(x0 + 16, y, L[i], { a: "start", sz: p.ls || 14, cls: "row", w: 600 }) : R(x0 + 16, y - 4, (w - 40) * (i % 3 === 2 ? 0.6 : 0.9), 8, { fill: C.pale, rx: 4 });
        s += PA(`M${x0 + 10} ${y}H${-x0 - 10}`, { stroke: C.red, sw: 3, draw: 1, cls: `v2d sk sk${i}` }) + `</g>`;
      }
      (p.stamps || []).forEach((t, j) => {
        const sw = Math.max(110, t.replace("|", "").length * 9.4 + 24);
        s += `<g class="stp stp${j}" style="display:none"><g transform="translate(${p.sx || 0} ${p.sy || 0}) rotate(-10)">` + R(-sw / 2, -24, sw, 48, { fill: "rgba(255,255,255,.88)", stroke: p.stc || C.red, sw: 4, rx: 8 }) + T(0, 0, t, { sz: 17, fill: p.stc || C.red, w: 800 }) + `</g></g>`;
      });
      return s;
    },
    u(g, p, st) {
      const n = (p.lines || []).length || p.rows || 6, hl = st.hl || {}, sk = st.sk || [];
      for (let i = 0; i < n; i++) {
        paint(q(g, ".hl" + i), hl[i] ? HLC[hl[i]] : "transparent"); dash(q(g, ".sk" + i), sk.indexOf(i) >= 0 ? 0 : 1);
        const rw = q(g, ".rw" + i); if (rw) { rw.style.transition = (INST || RM()) ? "none" : "opacity .5s"; rw.style.opacity = st.rows == null || i < st.rows ? "1" : "0"; }
      }
      qa(g, ".stp").forEach((e, j) => { const on = st.stamp === j; if (on && e.style.display === "none") { shown(e, true); restart(e, "v2stampin"); } else shown(e, on); });
    },
    bb: p => [-(p.w || 160) / 2, -(p.h || 200) / 2, p.w || 160, p.h || 200]
  };
  // Rotating group with a symmetric invisible disc so CSS fill-box and GSAP 50% 50% both pivot on (0,0).
  const ROT = (cls, r, inner) => `<g class="v2m ${cls}">${CI(0, 0, r, { fill: "transparent" })}${inner}</g>`;
  K.clock = {
    b(p) {
      const r = p.r || 44, col = p.col || C.navy;
      let s = CI(0, 0, r, { fill: "#ffffff", stroke: col, sw: 5, cls: "v2c ckf" });
      s += `<circle class="v2d ckarc" cx="0" cy="0" r="${r * 0.42}" fill="none" stroke="${col}" stroke-width="${r * 0.84}" opacity=".2" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" transform="rotate(-90)"/>`;
      for (let t = 0; t < 12; t++) { const a = t * Math.PI / 6; s += PA(`M${((r - 9) * Math.sin(a)).toFixed(1)} ${(-(r - 9) * Math.cos(a)).toFixed(1)}L${((r - 3) * Math.sin(a)).toFixed(1)} ${(-(r - 3) * Math.cos(a)).toFixed(1)}`, { stroke: col, sw: t % 3 ? 2 : 3.5 }); }
      s += ROT("ckh", r - 4, PA(`M0 5V${-(r - 13)}`, { stroke: C.ink, sw: 5 }));
      s += `<g class="cks">${CI(0, 0, r - 6, { fill: "transparent" })}${PA(`M0 4V${-(r - 8)}`, { stroke: C.red, sw: 2 })}</g>` + CI(0, 0, 5, { fill: C.ink });
      return s + (p.lab ? LAB(0, r + 20, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) {
      const h = st.h || 0, c = st.st === "bad" ? C.red : st.st === "ok" ? C.green : st.st === "goal" ? C.gold : (p.col || C.navy);
      go(q(g, ".ckh"), { r: h * 360, d: 1.1, e: "soft" }); dash(q(g, ".ckarc"), 1 - clamp(h, 0, 1));
      paint(q(g, ".ckarc"), null, c); paint(q(g, ".ckf"), null, c);
      const sc = q(g, ".cks"); if (sc) { sc.classList.toggle("v2spin", !!st.run && st.on); shown(sc, !!st.run); }
    },
    bb: p => { const r = p.r || 44; return [-r, -r, 2 * r, 2 * r]; }
  };
  K.cal = {
    b(p) {
      const w = p.w || 104, h = p.h || 92, col = p.col || C.navy, x0 = -w / 2, y0 = -h / 2;
      let s = R(x0, y0, w, h, { fill: "#ffffff", stroke: col, sw: 3, rx: 10 }) + R(x0, y0, w, 24, { fill: col, rx: 10 }) + R(x0, y0 + 14, w, 10, { fill: col, rx: 0 });
      s += CI(x0 + 22, y0 + 2, 5, { fill: "#ffffff", stroke: col, sw: 2.5 }) + CI(-x0 - 22, y0 + 2, 5, { fill: "#ffffff", stroke: col, sw: 2.5 });
      const cw = (w - 20) / 5, ch = (h - 36) / 3;
      for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) s += R(x0 + 10 + c * cw + 2, y0 + 30 + r * ch + 2, cw - 4, ch - 4, { fill: C.pale, rx: 3, cls: `v2c cc cc${r * 5 + c}` });
      return s + (p.lab ? LAB(0, h / 2 + 18, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { qa(g, ".cc").forEach((e, i) => paint(e, i === (p.due == null ? 13 : p.due) && st.due ? C.red : i < (st.fill || 0) ? (p.col || C.navy) : C.pale)); },
    bb: p => [-(p.w || 104) / 2, -(p.h || 92) / 2, p.w || 104, p.h || 92]
  };
  K.days = {
    b(p) {
      const n = p.n || 21, cols = p.cols || 7, cw = p.cw || 44, gap = 6, rows = Math.ceil(n / cols), W2 = cols * cw + (cols - 1) * gap, H2 = rows * cw + (rows - 1) * gap;
      let s = "";
      for (let i = 0; i < n; i++) {
        const x = -W2 / 2 + (i % cols) * (cw + gap), y = -H2 / 2 + Math.floor(i / cols) * (cw + gap);
        s += R(x, y, cw, cw, { fill: C.pale, rx: 7, cls: `v2c dy dy${i}` });
      }
      s += `<g class="dyo">${R(-W2 / 2 - 7, -H2 / 2 - 7, W2 + 14, H2 + 14, { stroke: C.orange, sw: 4, rx: 12, dash: "10 6" })}</g>`;
      return s + (p.lab ? LAB(0, H2 / 2 + 22, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) {
      const n = p.n || 21, t0 = p.t0 || 0, t1 = p.t1 || 0;
      for (let i = 0; i < n; i++) {
        const team = i >= t0 && i < t1, show = i < (st.n == null ? n : st.n);
        paint(q(g, ".dy" + i), !show ? "transparent" : team && st.team ? C.navy : st.other && !team ? "#e9a48d" : st.all ? "#f4c9a0" : C.pale);
      }
      shown(q(g, ".dyo"), !!st.ring);
    },
    bb: p => { const cols = p.cols || 7, cw = p.cw || 44, rows = Math.ceil((p.n || 21) / cols); return [-(cols * cw + (cols - 1) * 6) / 2, -(rows * cw + (rows - 1) * 6) / 2, cols * cw + (cols - 1) * 6, rows * cw + (rows - 1) * 6]; }
  };
  K.coins = {
    b(p) {
      const n = p.n || 5; let s = "";
      for (let i = 0; i < n; i++) s += `<g class="cn cn${i}"><ellipse cx="0" cy="${-i * 7}" rx="24" ry="8" fill="${C.gold}" stroke="#8a6205" stroke-width="2"/></g>`;
      return s + (p.lab ? LAB(0, 26, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { const n = st.n == null ? (p.n || 5) : st.n; qa(g, ".cn").forEach((e, i) => { e.style.transition = "opacity .4s"; e.style.opacity = i < n ? "1" : "0"; }); },
    bb: p => [-26, -(p.n || 5) * 7 - 4, 52, (p.n || 5) * 7 + 14]
  };
  K.lock = {
    b(p) {
      const z = p.sz || 1.4;
      return `<g transform="scale(${z})"><g class="v2m shk">${PA("M-9 -3V-11a9 9 0 0 1 18 0V-3", { stroke: C.ink, sw: 4.5 })}</g>` +
        R(-14, -4, 28, 23, { fill: C.red, rx: 4, cls: "v2c lkb" }) + CI(0, 6, 3, { fill: "#ffffff" }) + `</g>` + (p.lab ? LAB(0, 23 * z + 16, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { const o = st.st === "open"; go(q(g, ".shk"), { y: o ? -7 : 0, r: o ? -18 : 0, to: "100% 100%" }); paint(q(g, ".lkb"), o ? C.green : C.red); },
    bb: p => { const z = p.sz || 1.4; return [-15 * z, -22 * z, 30 * z, 42 * z]; }
  };
  K.gate = {
    b(p) {
      const w = p.w || 160, col = p.col || C.ink;
      let s = R(-w / 2 - 8, -46, 16, 92, { fill: col, rx: 4 }) + R(w / 2 - 8, -46, 16, 92, { fill: col, rx: 4 });
      s += `<g class="v2m arm">` + R(-w / 2, -40, w, 18, { fill: "#ffffff", stroke: C.red, sw: 3, rx: 9, cls: "v2c armr" });
      for (let i = 0; i < Math.floor(w / 26); i++) s += R(-w / 2 + 8 + i * 26, -37, 12, 12, { fill: C.red, rx: 2, cls: "v2c armst" });
      s += `</g>` + `<g class="glk">${CI(0, 6, 20, { fill: C.red, cls: "v2c glkc" })}<g class="gl1">${ico("lock", 0, 6, 24, "#ffffff")}</g><g class="gl2">${ico("unlock", 0, 6, 24, "#ffffff")}</g></g>`;
      return s + (p.lab ? LAB(0, 66, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) {
      const o = st.st === "open";
      go(q(g, ".arm"), { r: o ? -72 : 0, to: "0% 50%", d: 0.9, e: o ? "back" : undefined });
      qa(g, ".armst").forEach(e => paint(e, o ? C.green : C.red)); paint(q(g, ".armr"), null, o ? C.green : C.red);
      paint(q(g, ".glkc"), o ? C.green : C.red); shown(q(g, ".gl1"), !o); shown(q(g, ".gl2"), o);
    },
    bb: p => [-(p.w || 160) / 2 - 8, -46, (p.w || 160) + 16, 92]
  };
  K.tank = {
    b(p) {
      const w = p.w || 110, h = p.h || 150, col = p.col || C.orange, x0 = -w / 2, y0 = -h / 2;
      let s = R(x0, y0, w, h, { fill: "#ffffff", stroke: C.ink, sw: 4, rx: 18 });
      s += `<rect class="v2m liq" x="${x0 + 8}" y="${y0 + 8}" width="${w - 16}" height="${h - 16}" rx="11" fill="${col}" opacity=".88"/>`;
      s += `<g class="tbub">` + [0, 1, 2].map(i => CI(x0 + 22 + i * (w - 44) / 2, h / 2 - 18, 4 + i, { fill: "#ffffff", op: 0.7, cls: `v2rise v2rise${i}` })).join("") + `</g>`;
      for (let i = 1; i < 4; i++) s += PA(`M${x0} ${y0 + i * h / 4}h12`, { stroke: C.ink, sw: 2.5 });
      s += PA(`M-26 ${y0 - 8}a26 26 0 0 1 52 0`, { stroke: C.ink, sw: 4, fill: "#ffffff" });
      s += `<g transform="translate(0 ${y0 - 8})">${ROT("ndl", 24, PA("M0 2V-21", { stroke: C.red, sw: 4 }))}${CI(0, 0, 4, { fill: C.ink })}</g>`;
      return s + (p.lab ? LAB(0, h / 2 + 20, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) {
      const lv = clamp(st.lv || 0, 0, 1);
      go(q(g, ".liq"), { sy: Math.max(0.02, lv), to: "50% 100%", d: 1.1, e: "soft" });
      go(q(g, ".ndl"), { r: -90 + lv * 180, d: 1.1, e: "elastic" });
      const b = q(g, ".tbub"); if (b) b.style.opacity = lv > 0.2 ? "1" : "0";
    },
    bb: p => [-(p.w || 110) / 2, -(p.h || 150) / 2 - 36, p.w || 110, (p.h || 150) + 36]
  };
  K.gauge = {
    b(p) {
      const r = p.r || 64, cols = [C.green, "#7aa64a", C.gold, C.orange, C.red], sw = r * 0.3;
      let s = "";
      for (let i = 0; i < 5; i++) {
        const a0 = Math.PI + i * Math.PI / 5 + 0.03, a1 = Math.PI + (i + 1) * Math.PI / 5 - 0.03;
        s += PA(`M${(r * Math.cos(a0)).toFixed(1)} ${(r * Math.sin(a0)).toFixed(1)}A${r} ${r} 0 0 1 ${(r * Math.cos(a1)).toFixed(1)} ${(r * Math.sin(a1)).toFixed(1)}`, { stroke: p.rev ? cols[4 - i] : cols[i], sw });
      }
      s += ROT("gn", r - 2, PA(`M0 6V${-(r - 10)}`, { stroke: C.ink, sw: 6 })) + CI(0, 0, 9, { fill: C.ink });
      return s + (p.lab ? LAB(0, 26, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { go(q(g, ".gn"), { r: -90 + clamp(st.lv || 0, 0, 1) * 180, d: 1.1, e: "elastic" }); },
    bb: p => { const r = p.r || 64; return [-r - 10, -r - 10, 2 * r + 20, r + 20]; }
  };
  K.bar = {
    b(p) {
      const w = p.w || 260, h = p.h || 26, x0 = -w / 2;
      return R(x0, -h / 2, w, h, { fill: C.pale, rx: h / 2 }) + `<rect class="v2m bf v2c" x="${x0}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${p.col || C.navy}"/>` +
        (p.lab ? LAB(x0, -h / 2 - 15, p.lab, { a: "start", sz: p.ls || 15 }) : "") + T(-x0, -h / 2 - 15, p.v || "", { a: "end", sz: p.ls || 15, cls: "bval", fill: p.col || C.navy });
    },
    u(g, p, st) {
      const f = q(g, ".bf"), c = st.st ? tone(st.st)[1] : (p.col || C.navy);
      go(f, { sx: Math.max(0.004, clamp((st.lv || 0) / (p.max || 1), 0, 1)), to: "0% 50%", d: 1, e: "soft" }); paint(f, c);
      const v = q(g, ".bval"); setLab(v, st.v != null ? st.v : (p.v || "")); paint(v, c);
    },
    bb: p => [-(p.w || 260) / 2, -(p.h || 26) / 2, p.w || 260, p.h || 26]
  };
  K.seg = {
    b(p) {
      const w = p.w || 360, h = p.h || 48, x0 = -w / 2, tot = p.segs.reduce((a, s) => a + s.v, 0);
      let s = R(x0, -h / 2, w, h, { fill: C.pale, rx: 8 }), cx = x0;
      p.segs.forEach((g, i) => {
        const sw = g.v / tot * w;
        s += `<rect class="v2m sg sg${i}" x="${(cx + 1).toFixed(1)}" y="${-h / 2}" width="${(sw - 2).toFixed(1)}" height="${h}" rx="7" fill="${g.col}"/>`;
        const lx = cx + sw / 2 + (g.dx || 0), ly = g.lp === "in" ? 0 : g.lp === "up" ? -h / 2 - 26 : h / 2 + 26;
        s += `<g class="sl sl${i}">` + (g.lp !== "in" ? PA(`M${(cx + sw / 2).toFixed(1)} ${g.lp === "up" ? -h / 2 - 2 : h / 2 + 2}L${lx.toFixed(1)} ${g.lp === "up" ? -h / 2 - 8 : h / 2 + 8}`, { stroke: g.col, sw: 2 }) : "") +
          T(lx, ly, g.lab, { sz: g.ls || 14, fill: g.lp === "in" ? "#ffffff" : g.col }) + `</g>`;
        g._x = cx; g._w = sw; cx += sw;
      });
      (p.brs || []).forEach(b => {
        const a = p.segs[b.from], z = p.segs[b.to], bx0 = a._x + 2, bx1 = z._x + z._w - 2, up = b.side === "up", y = up ? -h / 2 - b.off : h / 2 + b.off, d = up ? -1 : 1;
        s += `<g class="br br-${b.id}">` + PA(`M${bx0} ${y - d * 8}V${y}H${bx1}V${y - d * 8}M${(bx0 + bx1) / 2} ${y}v${d * 7}`, { stroke: b.col || C.ink, sw: 3 }) +
          T(clamp((bx0 + bx1) / 2, x0 + (b.lw || 70), -x0 - (b.lw || 70)), y + d * 22, b.lab, { sz: 15, fill: b.col || C.ink }) + `</g>`;
      });
      if (p.ghost) { const g = p.segs[p.ghost.seg]; s += `<g class="gh">` + R(g._x + 2, -h / 2 - 3, g._w * p.ghost.frac, h + 6, { fill: "rgba(255,255,255,.55)", stroke: C.ink, sw: 2.5, dash: "6 5", rx: 7 }) + `</g>`; }
      return s;
    },
    u(g, p, st) {
      const n = st.n == null ? p.segs.length : st.n, br = st.br || [];
      p.segs.forEach((s, i) => { go(q(g, ".sg" + i), { sx: i < n ? 1 : 0.005, to: "0% 50%", o: (st.dimx || []).indexOf(i) >= 0 ? 0.3 : 1, d: 0.9, e: "soft" }); const l = q(g, ".sl" + i); if (l) { l.style.transition = "opacity .5s"; l.style.opacity = i < n ? "1" : "0"; } });
      qa(g, ".br").forEach(e => { const id = e.getAttribute("class").split("br-")[1]; e.style.transition = "opacity .5s"; e.style.opacity = br.indexOf(id) >= 0 ? "1" : "0"; });
      const gh = q(g, ".gh"); if (gh) { gh.style.transition = "opacity .5s"; gh.style.opacity = st.ghost ? "1" : "0"; }
      qa(g, ".sg").forEach((e, i) => e.classList.toggle("v2pulse", st.pulse === i && st.on));
    },
    bb: p => [-(p.w || 360) / 2, -(p.h || 48) / 2, p.w || 360, p.h || 48]
  };
  function smooth(pts) {
    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], m = (a[0] + b[0]) / 2; d += ` C${m.toFixed(1)} ${a[1].toFixed(1)} ${m.toFixed(1)} ${b[1].toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`; }
    return d;
  }
  K.line = {
    b(p) {
      const w = p.w || 300, h = p.h || 160, x0 = -w / 2, y0 = -h / 2, N = p.pts.length;
      const pt = (v, i) => [x0 + 8 + i * (w - 16) / (N - 1), y0 + h - 8 - v * (h - 16)];
      p._P = p.pts.map(pt);
      let s = PA(`M${x0} ${y0}V${y0 + h}H${x0 + w}`, { stroke: "#a7b3bf", sw: 2.5 });
      if (p.xlab) s += T(0, y0 + h + 18, p.xlab, { sz: 14, fill: C.grey });
      if (p.base != null) { const by = pt(p.base, 0)[1]; s += `<g class="lbase">` + PA(`M${x0} ${by}H${x0 + w}`, { stroke: C.green, sw: 2.5, dash: "7 6" }) + T(x0 + w - 4, by - 14, p.baseLab || "Recorded baseline", { a: "end", sz: 14, fill: C.green }) + `</g>`; }
      if (p.pts2) s += PA(smooth(p.pts2.map(pt)), { stroke: C.grey, sw: 4, draw: 1, cls: "v2d ln2" }) + `<g class="l2l">${T(x0 + w - 4, pt(p.pts2[N - 1], N - 1)[1] + 18, p.lab2 || "", { a: "end", sz: 14, fill: C.grey })}</g>`;
      s += PA(smooth(p._P), { stroke: p.col || C.red, sw: 6, draw: 1, cls: "v2d ln" });
      (p.marks || []).forEach((m, j) => {
        const [px, py] = p._P[m.i], my = m.y != null ? m.y : y0 - 6, mx = clamp(px + (m.dx || 0), x0 + (m.w || 140) / 2, -x0 - (m.w || 140) / 2);
        s += `<g class="lmk lmk${j}">` + PA(`M${px} ${py - 9}L${mx} ${my + 17}`, { stroke: C.grey, sw: 1.8, dash: "4 4" }) + R(mx - (m.w || 140) / 2, my - 17, m.w || 140, 34, { fill: "#ffffff", stroke: m.col || C.navy, sw: 2.5, rx: 17 }) + T(mx, my, m.lab, { sz: 14, fill: m.col || C.navy }) + `</g>`;
      });
      s += `<g class="v2m ldot">${CI(0, 0, 9, { fill: p.col || C.red, stroke: "#ffffff", sw: 3 })}</g>`;
      return s;
    },
    u(g, p, st) {
      const dr = st.draw == null ? 1 : st.draw;
      dash(q(g, ".ln"), 1 - dr); dash(q(g, ".ln2"), 1 - (st.draw2 == null ? 0 : st.draw2));
      const l2 = q(g, ".l2l"); if (l2) l2.style.opacity = (st.draw2 || 0) > 0.95 ? "1" : "0";
      const lb = q(g, ".lbase"); if (lb) { lb.style.transition = "opacity .5s"; lb.style.opacity = st.base ? "1" : "0"; }
      qa(g, ".lmk").forEach((e, j) => { e.style.transition = "opacity .5s"; e.style.opacity = j < (st.mk || 0) ? "1" : "0"; });
      let pt = p._P[0];
      try { const ln = q(g, ".ln"), L = ln.getTotalLength(), P = ln.getPointAtLength(L * dr); pt = [P.x, P.y]; } catch (e) { pt = p._P[Math.round(dr * (p._P.length - 1))]; }
      go(q(g, ".ldot"), { x: pt[0], y: pt[1], o: dr > 0.02 ? 1 : 0, d: 1 });
    },
    bb: p => [-(p.w || 300) / 2, -(p.h || 160) / 2, p.w || 300, p.h || 160]
  };
  function tokens(d, n, kind, col, dur) {
    let s = "";
    for (let i = 0; i < n; i++) {
      const sh = kind === "coin" ? `<ellipse rx="8" ry="8" fill="${C.gold}" stroke="#8a6205" stroke-width="2"/>` : kind === "doc" ? `<rect x="-7" y="-9" width="14" height="18" rx="2" fill="#ffffff" stroke="${col}" stroke-width="2"/>` : kind === "mail" ? `<rect x="-9" y="-6" width="18" height="12" rx="2" fill="${col}"/>` : `<circle r="6" fill="${col}" stroke="#ffffff" stroke-width="2"/>`;
      s += `<g>${sh}<animateMotion dur="${dur}s" begin="${(-i * dur / n).toFixed(2)}s" repeatCount="indefinite" path="${d}"/></g>`;
    }
    return s;
  }
  K.link = {
    b(p) {
      const col = p.col || C.navy, d = p.d || `M${p.a[0]} ${p.a[1]}L${p.b[0]} ${p.b[1]}`;
      if (!p.d && !(p.a && p.b)) return "";
      let s = PA(d, { stroke: col, sw: p.sw || 4, draw: 1, cls: "v2d v2c lk" });
      let ah = p.ah;
      if (!ah && p.arrow && p.a && p.b) ah = [p.b[0], p.b[1], Math.atan2(p.b[1] - p.a[1], p.b[0] - p.a[0]) * 180 / Math.PI];
      if (ah) s += `<g class="lah" transform="translate(${ah[0]} ${ah[1]}) rotate(${ah[2]})">${PA("M-14 -9L1 0L-14 9Z", { fill: col, stroke: col, sw: 2, cls: "v2c lahp" })}</g>`;
      if (p.tok) s += `<g class="ltok">${tokens(d, p.tn || 3, p.tok, p.tc || col, p.dur || 2.4)}</g>`;
      const mid = p.mid || (p.a && p.b ? [(p.a[0] + p.b[0]) / 2, (p.a[1] + p.b[1]) / 2] : null);
      if (mid) s += `<g class="lx">${CI(mid[0], mid[1], 15, { fill: "#ffffff", stroke: C.red, sw: 3 })}${ico("x", mid[0], mid[1], 18, C.red)}</g>`;
      if (p.lab) s += LAB(p.lx || 0, p.ly || 0, p.lab, { sz: p.ls || 14, fill: col });
      return s;
    },
    u(g, p, st) {
      const dr = st.draw == null ? 1 : st.draw, c = st.st === "bad" ? C.red : st.st === "ok" ? C.green : st.st === "warn" ? C.orange : st.st === "off" ? "#a9b4bf" : (p.col || C.navy);
      const lk = q(g, ".lk"); dash(lk, 1 - dr); paint(lk, null, c, st.st === "bad" || st.brk ? "0.035 0.03" : "1");
      const ah = q(g, ".lah"); if (ah) { ah.style.transition = "opacity .3s .4s"; ah.style.opacity = dr > 0.98 ? "1" : "0"; paint(q(g, ".lahp"), c, c); }
      shown(q(g, ".ltok"), !!st.flow && st.on); shown(q(g, ".lx"), !!st.x);
    },
    bb: () => null
  };
  K.pill = {
    b(p) {
      const w = p.w || 170, h = p.h || 40, ic = p.ic ? 1 : 0;
      return `<g class="v2fit" data-pad="${ic ? 62 : 28}">` + R(-w / 2, -h / 2, w, h, { rx: p.rx == null ? Math.min(h / 2, 20) : p.rx, fill: "#ffffff", stroke: C.navy, sw: 2.5, cls: "v2c pr fitr" }) +
        (ic ? `<g class="pic">${ico(p.ic, -w / 2 + 22, 0, 22, C.navy)}</g>` : "") + LAB(ic ? 13 : 0, 0, p.lab, { sz: p.ls || 15, cls: "v2c pt fitt" }) + `</g>`;
    },
    u(g, p, st) {
      const t = tone(st.st || p.tone || "norm");
      paint(q(g, ".pr"), t[0], t[1], (st.st || p.tone) === "goal" ? "7 5" : "none"); paint(q(g, ".pt"), t[2]);
      const pc = q(g, ".pic"), key = t.join(); if (pc && pc._k !== key) { pc._k = key; pc.innerHTML = ico(p.ic, -(p.w || 170) / 2 + 22, 0, 22, t[2], t[0]); }
    },
    bb: p => [-(p.w || 170) / 2, -(p.h || 40) / 2, p.w || 170, p.h || 40]
  };
  K.card = {
    b(p) {
      const w = p.w || 170, h = p.h || 150, col = p.col || C.navy, x0 = -w / 2, y0 = -h / 2, ics = p.is || Math.min(54, h * 0.34);
      let f = R(x0, y0, w, h, { fill: "#ffffff", stroke: col, sw: 3.5, rx: 16, cls: "v2c cfr" }) + ico(p.ic || "q", 0, y0 + 14 + ics / 2, ics, col) + LAB(0, y0 + 30 + ics + (p.sub ? 6 : 14), p.lab, { sz: p.ls || 17, fill: col, mw: w - 16 });
      if (p.sub) f += T(0, h / 2 - 22, p.sub, { sz: 14, fill: C.ink, w: 600, cls: "csub", mw: w - 14 });
      let s = `<g class="v2m cf">${f}</g>`;
      if (p.back) s += `<g class="v2m cbk">` + R(x0, y0, w, h, { fill: p.bcol || col, rx: 16 }) + ico(p.bic || "check", 0, y0 + 14 + ics / 2, ics, "#ffffff") + T(0, y0 + 44 + ics, p.back, { sz: p.ls || 17, fill: "#ffffff" }) + `</g>`;
      return s;
    },
    u(g, p, st) {
      const fl = !!st.flip;
      if (p.back) { go(q(g, ".cf"), { sx: fl ? 0.01 : 1, o: fl ? 0 : 1, d: 0.35 }); go(q(g, ".cbk"), { sx: fl ? 1 : 0.01, o: fl ? 1 : 0, dl: fl ? 0.3 : 0, d: 0.4 }); }
      const t = st.st ? tone(st.st) : null; paint(q(g, ".cfr"), t ? (st.st === "bad" ? C.blush : st.st === "ok" ? C.mint : st.st === "off" ? "#f1f3f5" : "#ffffff") : "#ffffff", t ? t[1] : (p.col || C.navy));
    },
    bb: p => [-(p.w || 170) / 2, -(p.h || 150) / 2, p.w || 170, p.h || 150]
  };
  K.bubble = {
    b(p) {
      const w = p.w || 170, h = p.h || 42, t = p.tail || "b", x0 = -w / 2, y0 = -h / 2, tx = p.tx || 0, col = p.col || C.navy, fill = p.fill || "#ffffff";
      let tail = "", cover = "";
      if (t === "b") { tail = `M${tx - 9} ${h / 2 - 2}L${tx + 3} ${h / 2 + 13}L${tx + 9} ${h / 2 - 2}`; cover = R(tx - 8, h / 2 - 4, 16, 4, { fill, rx: 0 }); }
      if (t === "t") { tail = `M${tx - 9} ${y0 + 2}L${tx + 3} ${y0 - 13}L${tx + 9} ${y0 + 2}`; cover = R(tx - 8, y0, 16, 4, { fill, rx: 0 }); }
      if (t === "l") { tail = `M${x0 + 2} -8L${x0 - 13} 4L${x0 + 2} 8`; cover = R(x0, -7, 4, 14, { fill, rx: 0 }); }
      if (t === "r") { tail = `M${-x0 - 2} -8L${-x0 + 13} 4L${-x0 - 2} 8`; cover = R(-x0 - 4, -7, 4, 14, { fill, rx: 0 }); }
      return `<g class="v2fit" data-pad="26">` + (tail ? PA(tail, { fill, stroke: col, sw: 2.5 }) : "") + R(x0, y0, w, h, { fill, stroke: col, sw: 2.5, rx: 14, cls: "fitr" }) + cover + LAB(0, 0, p.lab, { sz: p.ls || 15, fill: p.tc || col, cls: "fitt" }) + `</g>`;
    },
    bb: p => [-(p.w || 170) / 2, -(p.h || 42) / 2, p.w || 170, p.h || 42]
  };
  K.stamp = {
    hs: 1.7,
    b(p) {
      const w = p.w || Math.max(120, p.lab.replace("|", " ").length * 10 + 26), h = p.h || (p.lab.indexOf("|") >= 0 ? 62 : 46), col = p.col || C.red;
      return `<g transform="rotate(${p.r == null ? -8 : p.r})"><g class="v2fit" data-pad="30">` + R(-w / 2, -h / 2, w, h, { fill: "rgba(255,255,255,.9)", stroke: col, sw: 4.5, rx: 9, cls: "fitr" }) + LAB(0, 0, p.lab, { sz: p.ls || 18, fill: col, w: 800, cls: "fitt" }) + `</g></g>`;
    },
    bb: p => { const w = p.w || Math.max(120, p.lab.length * 10 + 26); return [-w / 2, -26, w, 52]; }
  };
  K.bolt = {
    hs: 2.2,
    b(p) { const z = (p.sz || 70) / 24; return `<g class="bf2"><g transform="scale(${z.toFixed(3)}) translate(-12 -12)"><path d="M13.5 1.5L4 14h7l-1.5 8.5L20 9.5h-7z" fill="${p.col || C.gold}" stroke="${C.ink}" stroke-width="1.2" stroke-linejoin="round"/></g></g>` + (p.lab ? LAB(0, (p.sz || 70) / 2 + 18, p.lab, { sz: p.ls || 15, fill: C.orange }) : ""); },
    u(g, p, st) { const b = q(g, ".bf2"); if (b) b.classList.toggle("v2flash", !!st.on); },
    bb: p => { const s = p.sz || 70; return [-s / 2, -s / 2, s, s]; }
  };
  K.icon = {
    b(p) { const s = p.sz || 40; return (p.disc ? CI(0, 0, s * 0.72, { fill: p.disc, cls: "v2c idisc" }) : "") + `<g class="ig">${ico(p.ic, 0, 0, s, p.col || C.navy)}</g>` + (p.lab ? LAB(0, s * (p.disc ? 0.72 : 0.5) + 18, p.lab, { sz: p.ls || 15, fill: p.lc || C.ink }) : ""); },
    u(g, p, st) { const ig = q(g, ".ig"); if (ig) ig.classList.toggle(p.idle || "x", !!st.on && !!p.idle); },
    bb: p => { const s = (p.sz || 40) * (p.disc ? 1.44 : 1); return [-s / 2, -s / 2, s, s]; }
  };
  K.text = {
    b(p) { return LAB(0, 0, p.lab, { sz: p.sz || 24, fill: p.col || C.navy, w: 800 }); },
    bb: () => null
  };
  K.bracket = {
    b(p) {
      const w = p.w || 200, up = p.side === "up", d = up ? -1 : 1, col = p.col || C.ink;
      return PA(`M${-w / 2} ${-d * 8}V0H${w / 2}V${-d * 8}M0 0v${d * 8}`, { stroke: col, sw: 3 }) + LAB(0, d * 26, p.lab, { sz: p.ls || 15, fill: col });
    },
    bb: () => null
  };
  K.panel = {
    b(p) {
      const w = p.w || 120, h = p.h || 200, col = p.col || C.navy;
      return R(-w / 2, -h / 2, w, h, { fill: p.fill || "#f1f5f9", stroke: p.stroke || "none", sw: 2.5, rx: p.rx == null ? 16 : p.rx, dash: p.dash, cls: "v2c pbg" }) +
        (p.lab ? R(-w / 2 + 8, -h / 2 + 8, w - 16, p.th || (String(p.lab).indexOf("|") >= 0 ? 40 : 30), { fill: col, rx: 10 }) + LAB(0, -h / 2 + 8 + (p.th || (String(p.lab).indexOf("|") >= 0 ? 40 : 30)) / 2, p.lab, { sz: p.ls || 14, fill: "#ffffff" }) : "");
    },
    u(g, p, st) { if (st.st) { const t = tone(st.st); paint(q(g, ".pbg"), st.st === "ok" ? C.mint : st.st === "bad" ? C.blush : st.st === "goal" ? "#fff7e3" : (p.fill || "#f1f5f9"), t[1]); } },
    bb: () => null
  };
  K.screen = {
    b(p) {
      const w = p.w || 250, h = p.h || 170;
      return R(-w / 2, -h / 2, w, h, { fill: "#ffffff", stroke: C.ink, sw: 4, rx: 12 }) + R(-w / 2, -h / 2, w, 30, { fill: C.ink, rx: 12 }) + R(-w / 2, -h / 2 + 18, w, 12, { fill: C.ink, rx: 0 }) +
        CI(-w / 2 + 16, -h / 2 + 15, 4, { fill: C.red }) + CI(-w / 2 + 30, -h / 2 + 15, 4, { fill: C.gold }) + LAB(10, -h / 2 + 15, p.lab || "", { sz: 14, fill: "#ffffff" }) +
        PA(`M-18 ${h / 2}l-8 18h52l-8-18`, { fill: C.ink, stroke: C.ink, sw: 2 });
    },
    bb: p => [-(p.w || 250) / 2, -(p.h || 170) / 2, p.w || 250, (p.h || 170) + 18]
  };
  K.tile = {
    b(p) {
      const w = p.w || 170, h = p.h || 112;
      return R(-w / 2, -h / 2, w, h, { fill: "#ffffff", stroke: C.green, sw: 3, rx: 14, cls: "v2c tbx" }) + LAB(-w / 2 + 12, -h / 2 + 20, p.lab, { a: "start", sz: p.ls || 14, mw: w - 50 }) +
        `<g class="tic">${badge(w / 2 - 18, -h / 2 + 20)}</g>` + T(0, 12, p.v || "", { sz: p.vs || 25, w: 800, cls: "tval", fill: C.green, mw: w - 16 }) + (p.unit ? T(0, h / 2 - 16, p.unit, { sz: 13, fill: C.grey, cls: "tun" }) : "");
    },
    u(g, p, st) {
      const k = st.st || p.tone || "ok", c = BADGEC[k] || C.navy;
      paint(q(g, ".tbx"), k === "bad" ? C.blush : k === "ok" ? "#f3fbf7" : "#ffffff", c); paint(q(g, ".tval"), c); setBadge(g, k);
      setLab(q(g, ".tval"), st.v != null ? st.v : (p.v || ""));
    },
    bb: p => [-(p.w || 170) / 2, -(p.h || 112) / 2, p.w || 170, p.h || 112]
  };
  K.badge = {
    b(p) { return badge(0, 0) + (p.lab ? LAB(0, 28, p.lab, { sz: p.ls || 14 }) : ""); },
    u(g, p, st) { setBadge(g, st.st || p.tone || "ok"); const b = q(g, ".bdgg"); if (b) b.setAttribute("transform", `scale(${(p.sz || 1.6)})`); },
    bb: () => [-14, -14, 28, 28]
  };
  K.desk = {
    b(p) {
      const col = p.col || C.navy;
      return PA("M-70 -10H70L60 34H-60Z", { fill: col, stroke: col, sw: 2 }) + R(-78, -22, 156, 14, { fill: C.ink, rx: 5 }) + ico("bell", 40, -34, 24, C.gold) + T(-14, 12, p.lab || "Reception desk", { sz: 14, fill: "#ffffff", cls: "lab" });
    },
    bb: () => [-78, -46, 156, 80]
  };
  K.crack = {
    b(p) { return PA(p.d || "M-30 -30l12 14-8 10 14 12-6 14 12 10", { stroke: C.red, sw: 4, draw: 1, cls: "v2d ckp" }); },
    u(g, p, st) { dash(q(g, ".ckp"), st.on ? 0 : 1); },
    bb: () => null
  };
  K.table = {
    b(p) {
      let s = `<ellipse cx="0" cy="8" rx="${p.rx || 120}" ry="30" fill="${C.navy}" stroke="${C.ink}" stroke-width="3"/>` + T(0, 8, p.lab || "Qasr board", { sz: 15, fill: "#ffffff", cls: "lab" });
      const seats = [[-92, -26], [-46, -36], [0, -40], [46, -36], [92, -26]];
      seats.forEach(([x, y], i) => {
        s += `<g class="seat">` + PA(`M${x - 15} ${y + 22}c0-11 6-16 15-16s15 5 15 16z`, { fill: [C.plum, C.teal, C.navy, C.gold, C.green][i] }) + CI(x, y - 2, 10, { fill: i % 2 ? C.skin2 : C.skin }) + `</g>`;
        s += `<g class="vt vt${i}">${CI(x, y - 30, 11, { fill: C.green, cls: "v2c vtc" })}<g class="vy">${ico("check", x, y - 30, 14, "#fff")}</g><g class="vn">${ico("x", x, y - 30, 14, "#fff")}</g><g class="vq">${ico("q", x, y - 30, 22, C.plum)}</g></g>`;
      });
      return s;
    },
    u(g, p, st) {
      const v = st.vote || "none";
      qa(g, ".vt").forEach(e => { shown(e, v !== "none"); shown(q(e, ".vy"), v === "yes"); shown(q(e, ".vn"), v === "no"); shown(q(e, ".vq"), v === "wait"); paint(q(e, ".vtc"), v === "yes" ? C.green : v === "no" ? C.red : "transparent"); });
    },
    bb: p => [-(p.rx || 120), -50, 2 * (p.rx || 120), 90]
  };
  K.grid14 = {
    b(p) {
      const P = [], dy = p.dy || 62; for (let r = 0; r < 2; r++) for (let c = 0; c < 7; c++) P.push([-156 + c * 52, r ? dy : -dy]);
      p._P = P;
      let s = "";
      P.forEach(([x, y], i) => {
        s += PA(`M0 0L${x} ${y}`, { stroke: C.navy, sw: 2.5, draw: 1, cls: `v2d gl gl${i}` });
        s += `<g class="gm gm${i}">` + PA(`M${x} ${y}L${x + 20} ${y + (y < 0 ? -26 : 26)}`, { stroke: C.orange, sw: 2.5 }) + R(x + 12, y + (y < 0 ? -40 : 18), 16, 16, { fill: C.orange, rx: 3 }) + `</g>`;
      });
      s += `<g class="hub">${CI(0, 0, 36, { fill: C.navy, stroke: "#ffffff", sw: 3 })}${T(0, 0, p.hub || "Group|owner", { sz: 13, fill: "#ffffff", cls: "lab" })}</g>`;
      P.forEach(([x, y], i) => {
        s += `<g class="ht ht${i}"><g class="hti">` + ico("hotel", x, y, 34, C.navy) + `</g>` + `<g class="hch">${CI(x + 15, y - 17, 7, { fill: C.orange, stroke: "#fff", sw: 2 })}</g>` +
          `<g class="hx">${ico("x", x, y, 30, C.red)}</g><g class="hs">${CI(x, y, 24, { stroke: C.gold, sw: 3.5 })}</g></g>`;
      });
      return s;
    },
    u(g, p, st) {
      const DR = [C.navy, C.gold, C.plum, C.orange, C.teal];
      p._P.forEach((xy, i) => {
        const ht = q(g, ".ht" + i), hi = q(ht, ".hti");
        qa(hi, "[fill]").forEach(e => { if (e.getAttribute("fill") !== "#fff") e.setAttribute("fill", st.std ? C.green : st.drift ? DR[(i * 3) % 5] : C.navy); });
        go(hi, { r: st.drift && !st.std ? ((i * 37) % 21) - 10 : 0, d: 0.8 });
        shown(q(ht, ".hch"), !!st.champ); shown(q(ht, ".hx"), !!st.fail && i !== st.pilot); shown(q(ht, ".hs"), st.pilot === i);
        const l = q(g, ".gl" + i); dash(l, st.links ? 0 : 1); paint(l, null, st.gm ? C.red : st.std ? C.green : C.navy, st.gm ? "0.06 0.05" : "1");
        shown(q(g, ".gm" + i), !!st.gm);
      });
      shown(q(g, ".hub"), !!st.hub);
    },
    bb: p => [-180, -(p.dy || 62) - 22, 360, 2 * (p.dy || 62) + 44]
  };

  // ---------- generic prop update ----------
  function upd(el, p, st) {
    const k = K[p.k], pm = q(el, ".pm"), prev = el._st || { on: 0 }, on = !!st.on, was = !!prev.on;
    const tx = (st.x == null ? p.x : st.x) - p.x, ty = (st.y == null ? p.y : st.y) - p.y;
    const tgt = { o: on ? (st.dim ? 0.28 : (st.o == null ? 1 : st.o)) : 0, x: tx, y: ty, r: st.r || 0, s: on ? (st.s == null ? 1 : st.s) * (st.hot ? 1.045 : 1) : (k.hs || 0.82), d: st.d };
    if (on && !was && !INST && !RM()) {
      const keep = INST; INST = true; go(pm, { o: 0, x: tx, y: ty + (k.hs ? 0 : 12), r: tgt.r, s: k.hs || 0.82 }); INST = keep; reflow(pm);
      tgt.e = k.hs ? "back" : "back"; tgt.d = st.d || (k.hs ? 0.55 : 0.75);
    } else if (!on && was) { tgt.d = 0.35; }
    go(pm, tgt);
    const h = q(el, ".v2halo"); if (h) shown(h, on && !!st.hot);
    if (st.lab != null && q(el, ".lab") && q(el, ".lab")._s !== st.lab) { setLab(q(el, ".lab"), st.lab); const fg = q(el, ".v2fit"); if (fg) fitOne(fg); }
    if (k.u) k.u(el, p, st, prev);
    el._st = st;
  }

  // Widen pill / bubble / stamp frames when the host font renders a label wider than designed.
  // Host-font safety: frames grow to fit their label but never past the stage; if there is no room,
  // the label shrinks instead. Free labels that would cross the stage edge also shrink to fit.
  const baseX = el => { const p = el && el.closest ? el.closest(".v2p") : null, m = p ? /translate\(([-\d.]+)/.exec(p.getAttribute("transform") || "") : null; return m ? +m[1] : 200; };
  const textW = t => { let w = 0; try { qa(t, "tspan").forEach(sp => { w = Math.max(w, sp.getComputedTextLength()); }); } catch (e) { w = 0; } return w; };
  function shrink(t, f) { const s0 = +(t.getAttribute("data-fs0") || t.getAttribute("font-size")); t.setAttribute("data-fs0", s0); t.setAttribute("font-size", Math.max(11, Math.floor(s0 * f * 10) / 10)); }
  function fitAll(root) {
    qa(root, ".v2fit").forEach(fitOne);
    qa(root, ".v2p").forEach(p => {
      const px = baseX(p);
      qa(p, "text.v2t").forEach(t => {
        if (t.closest(".v2fit")) return;
        let bb = null; try { bb = t.getBBox(); } catch (e) { bb = null; }
        if (!bb || !bb.width) return;
        const mw = +(t.getAttribute("data-mw") || 0);
        if (mw && bb.width > mw) { shrink(t, mw / bb.width); try { bb = t.getBBox(); } catch (e) { return; } }
        const pmx = px + bb.x, pmr = px + bb.x + bb.width;
        if (pmx >= 9 && pmr <= 391) return;
        const a = t.getAttribute("text-anchor"), tx = px + (+t.getAttribute("x") || 0);
        const room = a === "start" ? 391 - tx : a === "end" ? tx - 9 : 2 * Math.min(tx - 9, 391 - tx);
        if (room > 20) shrink(t, room / bb.width);
      });
    });
  }
  function fitOne(g) {
    const r = q(g, ".fitr"), t = q(g, ".fitt"); if (!r || !t) return;
    if (t.getAttribute("data-fs0")) t.setAttribute("font-size", t.getAttribute("data-fs0"));
    const w = textW(t);
    if (r._w0 == null) { r._w0 = +r.getAttribute("width"); r._x0 = +r.getAttribute("x"); }
    const pad = +(g.getAttribute("data-pad") || 26), rw = r._w0, px = baseX(g), cx = r._x0 + rw / 2;
    const maxW = Math.max(rw, 2 * Math.min(px + cx - 9, 391 - px - cx));
    let nw = rw;
    if (w && w + pad > rw) { nw = Math.min(Math.ceil(w + pad), maxW); if (w + pad > nw) shrink(t, (nw - pad) / w); }
    const dx = (nw - rw) / 2;
    r.setAttribute("x", r._x0 - dx); r.setAttribute("width", nw);
    const ic = q(g, ".pic"); if (ic) ic.setAttribute("transform", `translate(${-dx} 0)`);
  }
  // ---------- scene engine ----------
  // A(bench, props, beats): one act = one visual, adapted from the named benchmark.
  const A = (bench, props, beats) => ({ bench, props, beats });
  const P = (id, k, x, y, o) => Object.assign({ id, k, x, y }, o || {});
  const L = (id, a, b, o) => Object.assign({ id, k: "link", x: 0, y: 0, a, b }, o || {});
  function scene(id, acts) {
    let at = 0;
    acts.forEach(a => { a.at = at; at += a.beats.length; });
    const N = at, st = { root: null, cur: -1, last: -1 };
    acts.forEach(a => {
      const cur = {}, ids = {};
      a.props.forEach(p => { ids[p.id] = p; cur[p.id] = Object.assign({ on: p.on ? 1 : 0 }, p.st || {}); });
      a.S = a.beats.map(b => {
        (b.on || []).forEach(i => { if (cur[i]) cur[i].on = 1; });
        (b.off || []).forEach(i => { if (cur[i]) cur[i].on = 0; });
        Object.keys(b.s || {}).forEach(i => { if (!cur[i]) return; const o = Object.assign({}, b.s[i]); delete o.hot; Object.assign(cur[i], o); });
        const snap = {};
        Object.keys(cur).forEach(i => { snap[i] = Object.assign({}, cur[i]); delete snap[i].hot; });
        (b.hot || []).forEach(i => { if (snap[i]) snap[i].hot = 1; });
        Object.keys(b.s || {}).forEach(i => { if (snap[i] && b.s[i].hot) snap[i].hot = 1; });
        return snap;
      });
    });
    const dotX = j => 392 - (acts.length - 1 - j) * 9;
    function markup() {
      let h = `<svg viewBox="0 0 400 380" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(acts[0].beats[0].t)}" focusable="false">`;
      h += R(1, 1, 398, 378, { fill: C.paper, rx: 20, stroke: "#e7dfcd", sw: 2 });
      h += `<g class="v2chip">` + R(8, 9, 200, 36, { fill: C.navy, rx: 18, cls: "v2chipbg" }) + CI(27, 27, 6, { fill: C.orange, cls: "v2beat" }) +
        `<text class="v2t v2tag" x="40" y="27" font-size="16" font-weight="800" fill="#ffffff" dominant-baseline="central"></text></g>`;
      acts.forEach((a, j) => { h += CI(dotX(j), 27, 3.6, { fill: "#c9d2db", cls: `v2dot v2dot${j}` }); });
      acts.forEach((a, j) => {
        h += `<g class="v2m v2act v2act${j}" data-bench="${esc(a.bench)}" style="opacity:0">`;
        a.props.forEach(p => {
          const k = K[p.k], bb = k.bb ? k.bb(p) : null;
          const halo = bb ? R(bb[0] - 7, bb[1] - 7, bb[2] + 14, bb[3] + 14, { stroke: C.orange, sw: 3, dash: "8 6", rx: 14, cls: "v2halo" }) : "";
          h += `<g class="v2p" data-id="${p.id}" transform="translate(${p.x || 0} ${p.y || 0})"><g class="v2m pm">${halo}${k.b(p)}</g></g>`;
        });
        h += `</g>`;
      });
      h += `<g class="v2rip" style="display:none"><circle class="v2ripc" cx="0" cy="0" r="26" fill="none" stroke="${C.orange}" stroke-width="3.5"/></g>`;
      return h + `</svg>`;
    }
    const els = j => st.root ? qa(q(st.root, ".v2act" + j), ".v2p") : [];
    function setTag(t) {
      const tx = q(st.root, ".v2tag"), bg = q(st.root, ".v2chipbg");
      if (!tx || tx.textContent === t) return;
      tx.textContent = t;
      let w = 0; try { w = tx.getComputedTextLength(); } catch (e) { w = 0; }
      tx.setAttribute("font-size", "16");
      try { w = tx.getComputedTextLength(); } catch (e) { w = 0; }
      if (w > 254) { tx.setAttribute("font-size", String(Math.max(12.5, Math.floor(16 * 254 / w * 10) / 10))); try { w = tx.getComputedTextLength(); } catch (e) { w = 254; } }
      if (!w) w = t.length * 9.2;
      if (bg) bg.setAttribute("width", clamp(Math.ceil(w) + 46, 120, 300));
      restart(tx, "v2tagin");
      const sv = q(st.root, "svg"); if (sv) sv.setAttribute("aria-label", t);
    }
    function ripple(f) {
      const g = q(st.root, ".v2rip");
      if (!g) return;
      if (!f || INST || RM()) { shown(g, false); return; }
      g.setAttribute("transform", `translate(${f[0].toFixed(1)} ${f[1].toFixed(1)})`); shown(g, true); restart(g, "v2ripon");
    }
    function render(i, inst) {
      const r = st.root; if (!r) return;
      const ii = clamp(Math.floor(+i) || 0, 0, N - 1);
      let a = 0; for (let j = 0; j < acts.length; j++) if (acts[j].at <= ii) a = j;
      const k = ii - acts[a].at, act = acts[a], beat = act.beats[k];
      INST = !!inst || RM();
      r.classList.toggle("v2inst", INST);
      if (a !== st.cur) {
        acts.forEach((x, j) => {
          const g = q(r, ".v2act" + j); if (!g) return;
          if (j === a) { g.removeAttribute("aria-hidden"); go(g, { o: 1, x: 0, d: 0.6 }); }
          else { g.setAttribute("aria-hidden", "true"); go(g, { o: 0, x: j < a ? -24 : 24, d: 0.35 }); }
        });
        st.cur = a;
      }
      acts.forEach((x, j) => { const dn = q(r, ".v2dot" + j); if (dn) { dn.style.fill = j === a ? C.orange : j < a ? C.navy : "#c9d2db"; dn.setAttribute("r", j === a ? 5.2 : 3.6); } });
      const S = act.S[k];
      els(a).forEach((el, n) => upd(el, act.props[n], S[act.props[n].id]));
      setTag(beat.t);
      let fid = beat.f || (beat.hot && beat.hot[0]) || Object.keys(beat.s || {}).filter(x => beat.s[x].hot)[0] || (beat.on && beat.on[beat.on.length - 1]);
      const fp = fid ? act.props.filter(p => p.id === fid)[0] : null;
      ripple(fp ? [S[fid].x == null ? fp.x : S[fid].x, (S[fid].y == null ? fp.y : S[fid].y) + (fp.fy || 0)] : null);
      st.last = ii;
      INST = false;
      if (inst) { reflow(r); r.classList.remove("v2inst"); }
    }
    return {
      _qa: { N, acts: acts.length, tags: acts.reduce((x, a) => x.concat(a.beats.map(b => b.t)), []), bench: acts.map(a => a.bench) },
      build(el) {
        if (!el) return;
        addStyle();
        const root = document.createElement("div");
        root.className = `vls-w02-${id} v2root` + (W.gsap && typeof W.gsap.to === "function" ? " v2gs" : "");
        root.innerHTML = markup();
        if (typeof el.replaceChildren === "function") el.replaceChildren(root); else { el.innerHTML = ""; el.appendChild(root); }
        st.root = root; st.cur = -1; st.last = -1;
        fitAll(root);
        const sv = q(root, "svg"); if (RM() && sv && sv.pauseAnimations) sv.pauseAnimations();
        INST = true;
        acts.forEach((a, j) => els(j).forEach((e, n) => { e._st = null; upd(e, a.props[n], { on: 0 }); e._st = { on: 0 }; }));
        INST = false;
        render(0, true);
      },
      step(i) { render(i, false); },
      reset() {
        if (!st.root) return;
        if (W.gsap && typeof W.gsap.killTweensOf === "function") W.gsap.killTweensOf(st.root.querySelectorAll("*"));
        INST = true;
        acts.forEach((a, j) => { els(j).forEach((e, n) => { upd(e, a.props[n], { on: 0 }); e._st = { on: 0 }; }); const g = q(st.root, ".v2act" + j); if (g) go(g, { o: 0, x: 24 }); });
        INST = false;
        st.cur = -1;
        render(0, true);
      }
    };
  }


  // ---------- scoped CSS (appended once to the shared <style id="vl-sc-w02">) ----------
  const SEL = s => SECS.map(id => `.vls-w02-${id}${s}`).join(",");
  const CSS = [
    "/* w02-claude-v2-part3 */",
    `${SEL("")}{position:relative;display:block;width:100%;height:100%;min-height:0;overflow:hidden;box-sizing:border-box;color:#17283a;-webkit-user-select:none;user-select:none}`,
    `${SEL(" svg")}{display:block;width:100%;height:100%;max-height:100%;overflow:hidden}`,
    `${SEL(" .v2t")}{font-family:inherit;letter-spacing:.1px}`,
    `${SEL(" .v2m")}{transform-box:fill-box;transform-origin:50% 50%;transition-property:transform,opacity;transition-duration:.7s;transition-timing-function:cubic-bezier(.2,.8,.2,1)}`,
    `${SEL(".v2gs .v2m")}{transform-box:view-box;transform-origin:0 0;transition:none}`,
    `${SEL(" .v2c")}{transition:fill .5s ease,stroke .5s ease}`,
    `${SEL(" .v2d")}{transition:stroke-dashoffset .9s cubic-bezier(.4,0,.2,1),stroke .5s ease}`,
    `${SEL(".v2inst *")}{transition:none!important}`,
    `${SEL(" .v2halo")}{animation:v2halo 1.3s ease-in-out infinite}`,
    `${SEL(" .v2bob")}{transform-box:fill-box;transform-origin:50% 100%;animation:v2bob 1.05s ease-in-out infinite}`,
    `${SEL(" .v2spin")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2spin 2.2s linear infinite}`,
    `${SEL(" .v2spinslow")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2spin 6s linear infinite}`,
    `${SEL(" .v2float")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2float 2.2s ease-in-out infinite}`,
    `${SEL(" .v2flash")}{animation:v2flash 1.1s ease-in-out infinite}`,
    `${SEL(" .v2shake")}{transform-box:fill-box;transform-origin:50% 100%;animation:v2shake .7s ease-in-out infinite}`,
    `${SEL(" .v2pulse")}{animation:v2pul 1.1s ease-in-out infinite}`,
    `${SEL(" .v2rise")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2rise 2.4s ease-in infinite}`,
    `${SEL(" .v2rise1")}{animation-delay:.8s}`, `${SEL(" .v2rise2")}{animation-delay:1.6s}`,
    `${SEL(" .v2beat")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2beat 1.6s ease-in-out infinite}`,
    `${SEL(" .v2tagin")}{animation:v2tagin .45s ease-out}`,
    `${SEL(" .v2ripc")}{transform-box:fill-box;transform-origin:50% 50%;opacity:0}`,
    `${SEL(" .v2ripon .v2ripc")}{animation:v2rip .9s ease-out forwards}`,
    `${SEL(" .v2stampin")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2stamp .55s cubic-bezier(.34,1.56,.64,1)}`,
    "@keyframes v2halo{0%,100%{opacity:.35}50%{opacity:1}}",
    "@keyframes v2bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}",
    "@keyframes v2spin{to{transform:rotate(360deg)}}",
    "@keyframes v2float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}",
    "@keyframes v2flash{0%,100%{opacity:1}50%{opacity:.55}}",
    "@keyframes v2shake{0%,100%{transform:rotate(0)}25%{transform:rotate(-1.6deg)}75%{transform:rotate(1.6deg)}}",
    "@keyframes v2pul{0%,100%{stroke:transparent;stroke-width:0}50%{stroke:#ffffff;stroke-width:5}}",
    "@keyframes v2rise{0%{transform:translateY(0);opacity:0}20%{opacity:.8}100%{transform:translateY(-70px);opacity:0}}",
    "@keyframes v2beat{0%,100%{transform:scale(1)}50%{transform:scale(1.45)}}",
    "@keyframes v2tagin{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}",
    "@keyframes v2rip{0%{opacity:.9;transform:scale(.35)}100%{opacity:0;transform:scale(1.9)}}",
    "@keyframes v2stamp{0%{opacity:0;transform:scale(1.9)}100%{opacity:1;transform:scale(1)}}",
    `@media (prefers-reduced-motion:reduce){${SEL(" *")}{animation:none!important;transition:none!important}}`
  ].join("\n");
  function addStyle() {
    if (typeof document === "undefined") return;
    let s = document.getElementById("vl-sc-w02");
    if (!s) { s = document.createElement("style"); s.id = "vl-sc-w02"; (document.head || document.documentElement).appendChild(s); }
    if (s.textContent.indexOf("/* w02-claude-v2-part3 */") < 0) s.appendChild(document.createTextNode(CSS));
  }
  addStyle();

  // =====================================================================
  // W2O3a Â· A process owner needs a real mandate â€” 34 moments, 10 acts
  // =====================================================================
  W.VL_SCENES["W2O3a"] = scene("W2O3a", [
    // Act 1 (moments 0-3). Benchmark Part1 #036 "Outline - Explainer Kit"
    // https://motionarray.com/after-effects-templates/outline-explainer-kit-36706/
    // Adapted: role stations and hand-off cards; the guest crosses them while the connections stay unowned.
    A("P1#036", [
      P("co", "pill", 200, 84, { w: 270, lab: "Clear compliance obligation", ic: "lock", tone: "goal", ls: 14 }),
      P("dr", "person", 76, 226, { sz: 1.25, col: C.plum, lab: "Programme director", ls: 13 }),
      P("bq", "bubble", 262, 200, { w: 210, h: 52, lab: "Who manages|the whole?", tail: "l", col: C.plum, ls: 14 }),
      L("j1", [118, 150], [162, 228], { col: C.navy, sw: 5, arrow: 1, mid: [140, 189] }),
      L("j2", [240, 228], [282, 150], { col: C.navy, sw: 5, arrow: 1, mid: [261, 189] }),
      P("s1", "dept", 80, 150, { lab: "Reservations|team", ic: "cal" }),
      P("s2", "dept", 200, 236, { lab: "Reception|desk", ic: "bell" }),
      P("s3", "dept", 320, 150, { lab: "Housekeeping|team", ic: "bed" }),
      P("gs", "person", 64, 330, { sz: 0.8, col: C.teal, bag: 1 }),
      P("no", "pill", 200, 84, { w: 270, lab: "Nobody owns connections", ic: "x", tone: "bad", ls: 14 })
    ], [
      { t: "Funded, clear obligation", on: ["co"], hot: ["co"] },
      { t: "Who manages the whole?", on: ["dr", "bq"], hot: ["bq"] },
      { t: "Her journey crossed departments", off: ["dr", "bq"], on: ["s1", "s2", "s3", "j1", "j2", "gs"], s: { gs: { x: 330, walk: 1, mood: "worry", d: 1.8 } }, f: "gs" },
      { t: "Nobody owns the connections", off: ["co"], on: ["no"], s: { j1: { st: "bad", x: 1 }, j2: { st: "bad", x: 1 }, gs: { walk: 0, wait: 1, mood: "sad" } }, hot: ["no"] }
    ]),
    // Act 2 (moments 4-7). Benchmark Part2 #118 "Flat Infographics by zevs"
    // https://motionarray.com/after-effects-templates/flat-infographics-17982/
    // Adapted: flat chart elements animate into place, then one figure takes ownership of the whole chart.
    A("P2#118", [
      P("d1", "dept", 72, 100, { w: 74, h: 62, lab: "Reception|desk", ic: "bell" }),
      P("d2", "dept", 200, 100, { w: 74, h: 62, lab: "Housekeeping|team", ic: "bed" }),
      P("d3", "dept", 328, 100, { w: 74, h: 62, lab: "Reservations|team", ic: "cal" }),
      P("jb", "bar", 200, 224, { w: 330, lab: "Guest journey", max: 1, col: C.red, v: "Performs poorly" }),
      P("ow", "person", 200, 296, { sz: 1.05, col: C.green }),
      P("ol", "pill", 200, 352, { w: 176, h: 34, lab: "Process owner", tone: "ok", ls: 14 }),
      L("v1", [186, 266], [86, 168], { col: C.green, sw: 3, tok: "dot", tc: C.green, tn: 2 }),
      L("v2", [200, 262], [200, 168], { col: C.green, sw: 3, tok: "dot", tc: C.green, tn: 2 }),
      L("v3", [214, 266], [314, 168], { col: C.green, sw: 3, tok: "dot", tc: C.green, tn: 2 }),
      P("o1", "pill", 80, 296, { w: 136, h: 34, lab: "Owns measures", tone: "mint", ls: 13 }),
      P("o2", "pill", 320, 296, { w: 136, h: 34, lab: "Owns standard", tone: "mint", ls: 13 }),
      P("o3", "pill", 320, 352, { w: 136, h: 34, lab: "Owns backlog", tone: "mint", ls: 13 })
    ], [
      { t: "Targets met, journey poor", on: ["d1", "d2", "d3", "jb"], s: { d1: { st: "ok" }, d2: { st: "ok" }, d3: { st: "ok" }, jb: { lv: 0.35, st: "bad" } }, hot: ["jb"] },
      { t: "Process ownership defined", on: ["ow", "ol"], hot: ["ol"] },
      { t: "Sees beyond boundaries", on: ["v1", "v2", "v3"], s: { v1: { flow: 1 }, v2: { flow: 1 }, v3: { flow: 1 } }, hot: ["jb"], f: "ow" },
      { t: "Measures, standard, backlog", off: ["ol"], on: ["o1", "o2", "o3"], hot: ["o1", "o2", "o3"], f: "o2" }
    ]),
    // Act 3 (moments 8-10). Benchmark Part1 #072 "Stripe Connect onboarding quickstart"
    // https://docs.stripe.com/connect/onboarding/quickstart
    // Adapted: a token is checked at each verification gate; here every gate stays locked.
    A("P1#072", [
      P("ow", "person", 82, 196, { sz: 1.15, col: C.green }),
      P("tp", "pill", 90, 92, { w: 160, h: 50, lab: "Title:|process owner", tone: "sky", ls: 14 }),
      P("ab", "bubble", 104, 296, { w: 176, lab: "May I change this?", tail: "t", tx: -20, col: C.plum, ls: 14 }),
      P("on", "stamp", 104, 342, { lab: "Owns nothing", r: -5 }),
      L("g1", [128, 186], [196, 110], { col: C.grey, sw: 3.5, mid: [162, 148] }),
      L("g2", [130, 196], [196, 176], { col: C.grey, sw: 3.5, mid: [163, 186] }),
      L("g3", [128, 206], [196, 242], { col: C.grey, sw: 3.5, mid: [162, 224] }),
      P("p1", "pill", 294, 110, { w: 190, h: 40, lab: "Reception desk", ic: "lock", tone: "off", ls: 14 }),
      P("p2", "pill", 294, 176, { w: 190, h: 40, lab: "Housekeeping team", ic: "lock", tone: "off", ls: 14 }),
      P("p3", "pill", 294, 242, { w: 190, h: 40, lab: "Information systems", ic: "lock", tone: "off", ls: 13 }),
      P("df", "pill", 120, 300, { w: 196, h: 40, lab: "Delays identified", ic: "search", tone: "mint", ls: 14 }),
      P("rj", "bubble", 296, 300, { w: 168, lab: "Change rejected", tail: "t", tx: 0, col: C.red, ls: 14 })
    ], [
      { t: "Title alone: decorative", on: ["ow", "tp", "ab", "on"], hot: ["on"] },
      { t: "No influence over departments", off: ["ab", "on"], on: ["g1", "g2", "g3", "p1", "p2", "p3"], s: { g1: { st: "bad", x: 1 }, g2: { st: "bad", x: 1 }, g3: { st: "bad", x: 1 } }, hot: ["p1", "p2", "p3"], f: "p2" },
      { t: "Delays found, changes rejected", on: ["df", "rj"], s: { ow: { mood: "sad" } }, hot: ["rj"] }
    ]),
    // Act 4 (moments 11-13). Benchmark Part2 #115 "Infographics For Everything"
    // https://motionarray.com/after-effects-templates/infographics-for-everything-2593374/
    // Adapted: a graphic and its text are brought into view, then rebalanced when a document is added.
    A("P2#115", [
      P("ac", "bar", 200, 104, { w: 330, lab: "Accountability carried", max: 1, col: C.orange, ls: 14 }),
      P("au", "bar", 200, 164, { w: 330, lab: "Authority held", max: 1, col: C.green, ls: 14 }),
      P("mm", "stamp", 290, 214, { lab: "Clear mismatch", r: -5 }),
      P("md", "doc", 110, 282, { w: 192, h: 158, title: "Owner mandate", lines: ["Agreed area", "Permission to decide", "Clear responsibility"], ls: 13 }),
      P("oh", "icon", 300, 252, { ic: "person", sz: 40, col: "#ffffff", disc: C.green }),
      L("m1", [290, 276], [250, 322], { col: C.green, sw: 3, tok: "dot", tc: C.green, tn: 1 }),
      L("m2", [300, 280], [300, 320], { col: C.green, sw: 3, tok: "dot", tc: C.green, tn: 1 }),
      L("m3", [310, 276], [350, 322], { col: C.green, sw: 3, tok: "dot", tc: C.green, tn: 1 }),
      P("c1", "dept", 250, 342, { w: 42, h: 36, ic: "cal" }),
      P("c2", "dept", 300, 342, { w: 42, h: 36, ic: "bell" }),
      P("c3", "dept", 350, 342, { w: 42, h: 36, ic: "bed" })
    ], [
      { t: "Accountability without authority", on: ["ac", "au", "mm"], s: { ac: { lv: 0.95 }, au: { lv: 0.1 } }, hot: ["mm"] },
      { t: "What a mandate is", off: ["mm"], on: ["md"], s: { au: { lv: 0.85 }, md: { hl: { 0: "b", 1: "g", 2: "b" } } }, hot: ["md"] },
      { t: "Coordinating the whole journey", on: ["oh", "m1", "m2", "m3", "c1", "c2", "c3"], s: { m1: { flow: 1 }, m2: { flow: 1 }, m3: { flow: 1 }, c1: { st: "ok" }, c2: { st: "ok" }, c3: { st: "ok" } }, hot: ["oh"] }
    ]),
    // Act 5 (moments 14-17). Benchmark Part2 #106 "Supply Chain and logistics"
    // https://lottiefiles.com/free-animation/supply-chain-and-logistics-8PtoYRCbiu
    // Adapted: dispatch, transit and receipt â€” the room-ready message is dispatched but received too late.
    A("P2#106", [
      P("rm", "dept", 68, 118, { w: 82, h: 68, ic: "bed", lab: "Housekeeping|team" }),
      L("tr", [114, 118], [218, 118], { col: C.grey, sw: 4, brk: 1 }),
      P("ml", "icon", 136, 118, { ic: "mail", sz: 30, col: C.navy }),
      P("ck", "icon", 168, 82, { ic: "clock", sz: 26, col: C.red, idle: "v2float" }),
      P("dk", "desk", 300, 132, { lab: "Reception desk" }),
      P("gs", "person", 300, 252, { col: C.teal, bag: 1, mood: "worry" }),
      P("r1", "pill", 68, 214, { w: 116, h: 34, lab: "Report: fine", tone: "ok", ls: 13 }),
      P("r2", "pill", 200, 214, { w: 116, h: 34, lab: "Report: fine", tone: "ok", ls: 13 }),
      P("ex", "pill", 112, 300, { w: 200, h: 40, lab: "Examine the handoff", ic: "search", tone: "goal", ls: 14 }),
      P("wh", "pill", 112, 352, { w: 200, h: 34, lab: "Not 'work harder'", tone: "off", ls: 13 }),
      P("cu", "pill", 300, 336, { w: 168, h: 50, lab: "Connection|unowned", tone: "bad", ls: 14 })
    ], [
      { t: "Room ready, news late", on: ["rm", "tr", "ml", "dk"], s: { rm: { st: "ok" }, ml: { x: 196, d: 2.4 } }, hot: ["ml"] },
      { t: "Reports fine, guest waits", on: ["r1", "r2", "gs", "ck"], s: { gs: { wait: 1, mood: "sad" } }, hot: ["gs"] },
      { t: "Examine the handoff itself", on: ["ex", "wh"], s: { tr: { st: "warn" } }, hot: ["ex", "tr"], f: "ex" },
      { t: "Local speed won't fix", on: ["cu"], hot: ["cu"] }
    ]),
    // Act 6 (moments 18-20). Benchmark Part1 #002 "Interactive Computer Assembly Sequence"
    // https://codepen.io/karlhorning/pen/OJqNMVR
    // Adapted: parts fly in and snap into one assembly around the owner.
    A("P1#002", [
      P("ow", "person", 200, 214, { sz: 1.1, col: C.green }),
      P("ot", "pill", 200, 290, { w: 160, h: 34, lab: "Process team", tone: "ok", ls: 14 }),
      L("t1", [176, 196], [120, 134], { col: C.green, sw: 3 }),
      L("t2", [224, 196], [280, 134], { col: C.green, sw: 3 }),
      L("t3", [176, 232], [120, 304], { col: C.green, sw: 3 }),
      L("t4", [224, 232], [280, 304], { col: C.green, sw: 3 }),
      P("m1", "pill", 104, 114, { w: 168, h: 40, lab: "Reception desk", tone: "sky", ls: 14 }),
      P("m2", "pill", 296, 114, { w: 168, h: 40, lab: "Housekeeping team", tone: "sky", ls: 13 }),
      P("m3", "pill", 104, 324, { w: 168, h: 40, lab: "Reservations team", tone: "sky", ls: 13 }),
      P("m4", "pill", 296, 324, { w: 168, h: 40, lab: "Systems people", tone: "sky", ls: 14 }),
      P("h1", "icon", 200, 114, { ic: "warn", sz: 28, col: C.orange, idle: "v2flash" }),
      P("h2", "icon", 200, 352, { ic: "warn", sz: 28, col: C.orange, idle: "v2flash" }),
      P("h3", "icon", 54, 220, { ic: "warn", sz: 28, col: C.orange, idle: "v2flash" }),
      P("h4", "icon", 346, 220, { ic: "warn", sz: 28, col: C.orange, idle: "v2flash" })
    ], [
      { t: "Owner needs a team", on: ["ow", "ot"], hot: ["ot"] },
      { t: "Qasr's process team", on: ["t1", "t2", "t3", "t4", "m1", "m2", "m3", "m4"], hot: ["m1", "m2", "m3", "m4"], f: "ow" },
      { t: "Problems sit between functions", on: ["h1", "h2", "h3", "h4"], hot: ["h1", "h2", "h3", "h4"], f: "h1" }
    ]),
    // Act 7 (moments 21-24). Benchmark Part2 #107 "Supply Chain and Shipping"
    // https://lottiefiles.com/free-animation/supply-chain-and-shipping-Gd8ZsVZpXq
    // Adapted: shipments advance through a network of nodes â€” fourteen sites around one hub.
    A("P2#107", [
      P("gd", "grid14", 200, 206, { dy: 66, hub: "Group|owner" }),
      P("sp", "pill", 200, 350, { w: 262, lab: "Same process, fourteen sites", ic: "hotel", tone: "solid", ls: 14 }),
      P("cf", "pill", 200, 350, { w: 262, lab: "Group change fails", ic: "x", tone: "bad", ls: 14 }),
      P("cl", "pill", 200, 350, { w: 262, lab: "Owner plus local champions", ic: "users", tone: "ok", ls: 13 }),
      P("lp", "pill", 200, 350, { w: 262, lab: "Local priorities win", ic: "warn", tone: "warn", ls: 14 })
    ], [
      { t: "Fourteen separate copies", on: ["gd", "sp"], hot: ["sp"], f: "gd" },
      { t: "Drift goes unnoticed", off: ["sp"], on: ["cf"], s: { gd: { drift: 1, fail: 1 } }, hot: ["cf"] },
      { t: "Group owner, local champions", off: ["cf"], on: ["cl"], s: { gd: { drift: 0, fail: 0, hub: 1, links: 1, champ: 1 } }, hot: ["cl"], f: "gd" },
      { t: "Champions report to GMs", off: ["cl"], on: ["lp"], s: { gd: { gm: 1, drift: 1 } }, hot: ["lp"] }
    ]),
    // Act 8 (moments 25-26). Benchmark Part2 #102 "3D Isometric Factory Process"
    // https://lottiefiles.com/free-animation/3d-isometric-factory-process-TJAlBgYcXw
    // Adapted: a sequence of identical workstations; one succeeds, the copies diverge without a written standard.
    A("P2#102", [
      P("sd", "doc", 200, 118, { w: 300, h: 112, title: "Written group standard", lines: ["Same everywhere", "Allowed local variation"], ls: 14 }),
      P("gd", "grid14", 200, 268, { dy: 42 }),
      P("pf", "pill", 200, 268, { w: 230, h: 34, lab: "Pilot succeeds, then fails", tone: "bad", ls: 13 })
    ], [
      { t: "Decide standard, write it", on: ["sd", "gd"], s: { sd: { hl: { 0: "g", 1: "y" } }, gd: { std: 1 } }, hot: ["sd"] },
      { t: "Pilots fail to scale", on: ["pf"], s: { sd: { sk: [0, 1], hl: {} }, gd: { std: 0, drift: 1, pilot: 3, fail: 1 } }, hot: ["pf"] }
    ]),
    // Act 9 (moments 27-30). Benchmark B1 #67 "Linear product development site"
    // https://linear.app/
    // Adapted: issue cards move from a temporary project column into continuing operations.
    A("B1#67", [
      P("pd", "card", 104, 134, { w: 176, h: 126, ic: "flag", lab: "Programme|director", sub: "Temporary programme", col: C.plum, is: 34 }),
      P("po", "card", 296, 134, { w: 176, h: 126, ic: "key", lab: "Process|owner", sub: "Continuing performance", col: C.green, is: 34 }),
      P("b1", "bar", 200, 250, { w: 330, lab: "Programme lifespan", max: 1, col: C.plum, v: "Programme ends", ls: 14 }),
      P("b2", "bar", 200, 316, { w: 330, lab: "Ownership lifespan", max: 1, col: C.green, v: "Ownership continues", ls: 14 }),
      P("pc", "stamp", 104, 150, { lab: "Programme closed", r: -8 }),
      P("t1", "tile", 112, 282, { w: 170, h: 104, lab: "Records complete", v: "Being monitored", tone: "unk", vs: 17 }),
      P("t2", "tile", 288, 282, { w: 170, h: 104, lab: "Handoffs reliable", v: "Being monitored", tone: "unk", vs: 17 })
    ], [
      { t: "Director and owner differ", on: ["pd", "po"], hot: ["pd", "po"], f: "po" },
      { t: "Temporary can't replace continuing", on: ["b1", "b2"], s: { b1: { lv: 0.45 }, b2: { lv: 1 } }, hot: ["b2"] },
      { t: "Imagine the programme closes", off: ["b1", "b2"], on: ["pc"], s: { pd: { dim: 1 } }, hot: ["pc"] },
      { t: "Someone keeps monitoring", on: ["t1", "t2"], hot: ["po", "t1", "t2"], f: "po" }
    ]),
    // Act 10 (moments 31-33). Benchmark Part2 #087 "Workflow by Muammar Faiq"
    // https://lottiefiles.com/free-animation/workflow-Jt52qpU9fj
    // Adapted: the workflow glyph keeps cycling only where someone owns it.
    A("P2#087", [
      P("ch", "line", 200, 140, { w: 330, h: 130, pts: [0.4, 0.55, 0.78, 0.78, 0.79, 0.8], pts2: [0.4, 0.55, 0.78, 0.6, 0.42, 0.3], lab2: "Without an owner", col: C.green, xlab: "Process performance", marks: [{ i: 2, lab: "Urgency gone", w: 136, y: -54, col: C.orange }] }),
      P("ow", "person", 72, 300, { sz: 0.95, col: C.green }),
      P("aq", "pill", 236, 300, { w: 240, h: 52, lab: "Authority across|boundaries?", ic: "key", tone: "unk", ls: 14 }),
      P("ck", "clock", 104, 244, { r: 46, lab: "Customer's clock" }),
      P("cg", "person", 300, 250, { col: C.teal, bag: 1, mood: "ok" }),
      P("nx", "pill", 200, 350, { w: 262, h: 36, lab: "Next: measure performance", tone: "solid", ls: 14 })
    ], [
      { t: "Old weaknesses return", on: ["ch"], s: { ch: { draw: 1, draw2: 1, mk: 1 } }, hot: ["ch"] },
      { t: "Ask: genuine authority?", on: ["ow", "aq"], s: { ch: { dim: 1 } }, hot: ["aq"] },
      { t: "Next: the customer's view", off: ["ow", "aq", "ch"], on: ["ck", "cg", "nx"], s: { ck: { h: 0.6, run: 1 } }, hot: ["ck"] }
    ])
  ]);

  // =====================================================================
  // W2O3b Â· Measuring the customer's clock â€” 31 moments, 10 acts
  // =====================================================================
  W.VL_SCENES["W2O3b"] = scene("W2O3b", [
    // Act 1 (moments 0-3). Benchmark Part2 #121 "Dashboard by RAKIBUZZAMAN"
    // https://lottiefiles.com/free-animation/dashboard-M05MmlnoOP
    // Adapted: graph tiles fill and highlight â€” every department tile green, the guest's experience not.
    A("P2#121", [
      P("ow", "person", 44, 326, { sz: 0.7, col: C.green }),
      P("t1", "tile", 122, 120, { w: 150, h: 96, lab: "Reception|desk", v: "On target", tone: "ok", vs: 17, ls: 13 }),
      P("t2", "tile", 278, 120, { w: 150, h: 96, lab: "Housekeeping|team", v: "On target", tone: "ok", vs: 17, ls: 13 }),
      P("t3", "tile", 122, 224, { w: 150, h: 96, lab: "Reservations|team", v: "On target", tone: "ok", vs: 17, ls: 13 }),
      P("gs", "person", 286, 224, { col: C.teal, bag: 1, mood: "sad" }),
      P("m1", "pill", 200, 300, { w: 230, h: 32, lab: "Waited at reception", tone: "blush", ls: 13 }),
      P("m2", "pill", 200, 336, { w: 230, h: 32, lab: "Repeated her details", tone: "blush", ls: 13 }),
      P("wb", "bar", 200, 320, { w: 330, lab: "Whole wait, as lived", max: 1, col: C.red, v: "Not the sum", ls: 14 })
    ], [
      { t: "Reports from three departments", on: ["ow", "t1", "t2", "t3"], s: { t1: { v: "Now reporting" }, t2: { v: "Now reporting" }, t3: { v: "Now reporting" } }, hot: ["t1", "t2", "t3"], f: "t2" },
      { t: "Every figure reassuring", s: { t1: { v: "On target" }, t2: { v: "On target" }, t3: { v: "On target" } }, hot: ["t1", "t2", "t3"], f: "t2" },
      { t: "Yet she remembers waiting", on: ["gs", "m1", "m2"], s: { gs: { wait: 1 } }, hot: ["gs"] },
      { t: "Customers live whole wait", off: ["m1", "m2", "ow"], on: ["wb"], s: { wb: { lv: 0.92 } }, hot: ["wb"] }
    ]),
    // Act 2 (moments 4-6). Benchmark Part2 #081 "Clean Workflow Visualization with Motion Graphics"
    // https://dribbble.com/shots/27600376-Clean-Workflow-Visualization-with-Motion-Graphics
    // Adapted: journey steps joined by a progress path, measured end to end.
    A("P2#081", [
      L("ct", [44, 160], [356, 160], { col: C.orange, sw: 8, arrow: 1, tok: "dot", tc: "#ffffff", tn: 4, dur: 3.6 }),
      P("rq", "pill", 74, 114, { w: 128, h: 50, lab: "Customer|request", ic: "person", tone: "sky", ls: 13 }),
      P("oc", "pill", 326, 114, { w: 128, h: 50, lab: "Outcome|delivered", ic: "check", tone: "ok", ls: 13 }),
      P("cy", "bracket", 200, 196, { w: 312, side: "dn", lab: "Cycle time: everything between", ls: 14, col: C.orange }),
      P("t1", "pill", 104, 290, { w: 180, h: 52, lab: "Customer trigger:|first request", tone: "sky", ls: 13 }),
      P("t2", "pill", 296, 290, { w: 180, h: 52, lab: "Not the|programme trigger", tone: "off", ls: 13 }),
      P("cl", "pill", 200, 290, { w: 280, h: 44, lab: "Worked example: claims team", ic: "doc", tone: "solid", ls: 14 })
    ], [
      { t: "Cycle time: whole wait", on: ["ct", "rq", "oc", "cy"], s: { ct: { flow: 1 } }, hot: ["cy"] },
      { t: "Trigger means first request", on: ["t1", "t2"], hot: ["t1"] },
      { t: "Why the start matters", off: ["t1", "t2"], on: ["cl"], hot: ["cl", "rq"], f: "cl" }
    ]),
    // Act 3 (moments 7-9). Benchmark Part2 #129 "Arc tween"
    // https://observablehq.com/@d3/arc-tween
    // Adapted: two arcs tween to their own end values because they start their clocks at different points.
    A("P2#129", [
      P("c1", "clock", 104, 168, { r: 66, lab: "Team's clock", col: C.navy }),
      P("c2", "clock", 296, 168, { r: 66, lab: "Customer's clock", col: C.orange }),
      P("v1", "pill", 104, 292, { w: 150, h: 36, lab: "4.1 days", tone: "solid", ls: 15 }),
      P("v2", "pill", 296, 292, { w: 150, h: 36, lab: "About three weeks", tone: "warn", ls: 14 }),
      P("s1", "pill", 104, 344, { w: 170, h: 40, lab: "Starts at queue", ic: "flag", tone: "sky", ls: 14 }),
      P("s2", "pill", 296, 344, { w: 170, h: 40, lab: "Starts at contact", ic: "flag", tone: "warn", ls: 13 })
    ], [
      { t: "Team: 4.1 days, honestly", on: ["c1", "v1"], s: { c1: { h: 0.2 } }, hot: ["v1"] },
      { t: "Customers: three weeks, honestly", on: ["c2", "v2"], s: { c2: { h: 1 } }, hot: ["v2"] },
      { t: "Different starting points", on: ["s1", "s2"], hot: ["s1", "s2"], f: "s2" }
    ]),
    // Act 4 (moments 10-13). Benchmark Part2 #126 "Stacked-to-grouped bars"
    // https://observablehq.com/@d3/stacked-to-grouped-bars
    // Adapted: one stacked bar keeps each segment's identity while brackets regroup it into two processes.
    A("P2#126", [
      P("tl", "seg", 200, 196, { w: 372, h: 54, segs: [
        { lab: "Mailbox|9 days", v: 9, col: C.orange, lp: "in", ls: 15 },
        { lab: "Documents|5 days", v: 5, col: C.gold, lp: "in", ls: 13 },
        { lab: "Team work|4.1 days", v: 4.1, col: C.navy, lp: "up", ls: 13 },
        { lab: "Payment run|3 days", v: 3, col: C.plum, lp: "dn", ls: 13, dx: -30 }
      ], brs: [
        { id: "team", from: 2, to: 2, lab: "Team's process", side: "dn", off: 58, col: C.navy, lw: 64 },
        { id: "all", from: 0, to: 3, lab: "Customer's process", side: "up", off: 62, col: C.orange, lw: 90 }
      ] }),
      P("tt", "pill", 200, 336, { w: 220, h: 40, lab: "21.1 days in total", ic: "clock", tone: "warn", ls: 15 })
    ], [
      { t: "Nine days in mailbox", on: ["tl"], s: { tl: { n: 1, pulse: 0 } }, hot: ["tl"] },
      { t: "Five more for documents", s: { tl: { n: 3, pulse: 1 } }, hot: ["tl"] },
      { t: "Payment run: 21.1 days", on: ["tt"], s: { tl: { n: 4, pulse: 3 } }, hot: ["tt"] },
      { t: "Two different processes", off: ["tt"], s: { tl: { n: 4, br: ["team", "all"], pulse: -1 } }, hot: ["tl"] }
    ]),
    // Act 5 (moments 14-16). Benchmark Part2 #090 "Multi-Step Icon Animation"
    // https://lottiefiles.com/free-animation/multi-step-icon-animation-uAM7js17jU
    // Adapted: one step activates after another â€” twenty-one day tiles light by whose problem they are.
    A("P2#090", [
      P("dd", "days", 200, 168, { n: 21, cols: 7, cw: 42, t0: 14, t1: 18, lab: "The customer's 21 days" }),
      P("lg1", "pill", 104, 300, { w: 176, h: 36, lab: "Team: 4 days", tone: "solid", ls: 14 }),
      P("lg2", "pill", 296, 300, { w: 176, h: 36, lab: "Someone else: 17", tone: "blush", ls: 14 }),
      P("cb", "pill", 200, 300, { w: 300, h: 40, lab: "Customers live every day", ic: "users", tone: "warn", ls: 14 }),
      P("rr", "pill", 200, 352, { w: 300, h: 40, lab: "Boundary from first request", ic: "flag", tone: "goal", ls: 14 })
    ], [
      { t: "Seventeen days disappear", on: ["dd", "lg1", "lg2"], s: { dd: { team: 1, other: 1 } }, hot: ["lg2"] },
      { t: "Only the customer's boundary", off: ["lg1", "lg2"], on: ["cb"], s: { dd: { team: 1, other: 0, all: 1, ring: 1 } }, hot: ["cb"] },
      { t: "Redraw the boundary first", on: ["rr"], hot: ["rr"] }
    ]),
    // Act 6 (moments 17-18). Benchmark Part2 #113 "Infographic Chart Creator"
    // https://motionarray.com/after-effects-templates/infographic-chart-creator-36176/
    // Adapted: bars grow and their labels update; then the chart highlights where the time really goes.
    A("P2#113", [
      P("b1", "bar", 200, 104, { w: 330, lab: "Customer wait today", max: 21.1, col: C.orange, v: "21.1 days", ls: 14 }),
      P("b2", "bar", 200, 164, { w: 330, lab: "Team time halved", max: 21.1, col: C.navy, v: "Still 19+ days", ls: 14 }),
      P("tl", "seg", 200, 268, { w: 372, h: 50, segs: [
        { lab: "Mailbox|nobody working", v: 9, col: C.orange, lp: "in", ls: 13 },
        { lab: "Documents|waiting", v: 5, col: C.gold, lp: "in", ls: 13 },
        { lab: "Team work", v: 4.1, col: C.navy, lp: "up", ls: 13 },
        { lab: "Payment|waiting", v: 3, col: C.plum, lp: "dn", ls: 13, dx: -16 }
      ] })
    ], [
      { t: "Team halved: still 19+", on: ["b1", "b2"], s: { b1: { lv: 21.1 }, b2: { lv: 19.05 } }, hot: ["b2"] },
      { t: "Opportunity: where nobody works", on: ["tl"], s: { b1: { dim: 1 }, b2: { dim: 1 }, tl: { n: 4, pulse: 0, dimx: [2] } }, hot: ["tl"] }
    ]),
    // Act 7 (moments 19-21). Benchmark Part2 #076 "Workflow Animation"
    // https://dribbble.com/shots/3791748-Workflow-Animation
    // Adapted: an action, a transferred trigger, and a notification â€” the delays live in the transfers.
    A("P2#076", [
      P("a1", "dept", 64, 110, { w: 70, h: 58, ic: "person", lab: "People|handoff", ls: 14 }),
      P("a2", "dept", 200, 110, { w: 70, h: 58, ic: "users", lab: "Team|handoff", ls: 14 }),
      P("a3", "dept", 336, 110, { w: 70, h: 58, ic: "db", lab: "System|handoff", ls: 14 }),
      L("h1", [104, 110], [160, 110], { col: C.orange, sw: 5, arrow: 1, tok: "mail", tc: C.orange, tn: 1, dur: 2.2 }),
      L("h2", [240, 110], [296, 110], { col: C.orange, sw: 5, arrow: 1, tok: "mail", tc: C.orange, tn: 1, dur: 2.2 }),
      P("hl", "pill", 200, 196, { w: 220, h: 34, lab: "Gaps sit at handoffs", tone: "warn", ls: 14 }),
      P("rm", "dept", 64, 262, { w: 70, h: 58, ic: "bed", lab: "Room finished" }),
      L("qm", [104, 262], [200, 262], { col: C.red, sw: 4, brk: 1, mid: [152, 262] }),
      P("dk", "icon", 238, 262, { ic: "bell", sz: 34, col: "#ffffff", disc: C.navy, lab: "Hears late", ls: 14 }),
      P("gs", "person", 336, 266, { sz: 0.85, col: C.teal, bag: 1, mood: "sad" }),
      P("pt", "bar", 200, 236, { w: 330, lab: "Processing time: active work", max: 1, col: C.green, ls: 14 }),
      P("wt", "bar", 200, 310, { w: 330, lab: "Waiting time: every delay", max: 1, col: C.red, ls: 14 })
    ], [
      { t: "Gaps sit at handoffs", on: ["a1", "a2", "a3", "h1", "h2", "hl"], s: { h1: { flow: 1 }, h2: { flow: 1 } }, hot: ["hl"] },
      { t: "Qasr Marina's same pattern", on: ["rm", "qm", "dk", "gs"], s: { rm: { st: "ok" }, qm: { x: 1 }, gs: { wait: 1 } }, hot: ["qm"], f: "dk" },
      { t: "Processing versus waiting", off: ["rm", "qm", "dk", "gs", "hl"], on: ["pt", "wt"], s: { pt: { lv: 0.2 }, wt: { lv: 0.8 } }, hot: ["wt"] }
    ]),
    // Act 8 (moments 22-24). Benchmark Part2 #128 "Pie chart update"
    // https://observablehq.com/@d3/pie-chart-update
    // Adapted: one whole judged by several values updating together â€” speed, quality and cost to serve.
    A("P2#128", [
      P("g1", "gauge", 72, 140, { r: 52 }),
      P("g2", "gauge", 200, 140, { r: 52 }),
      P("g3", "gauge", 328, 140, { r: 52 }),
      P("l1", "pill", 72, 186, { w: 112, h: 32, lab: "Speed test", tone: "sky", ls: 13 }),
      P("l2", "pill", 200, 186, { w: 112, h: 32, lab: "Quality test", tone: "sky", ls: 13 }),
      P("l3", "pill", 328, 186, { w: 112, h: 32, lab: "Cost to serve", tone: "sky", ls: 13 }),
      P("wr", "pill", 200, 262, { w: 272, h: 50, lab: "Faster check-in,|wrong rooms", ic: "x", tone: "bad", ls: 14 }),
      P("cs", "pill", 200, 334, { w: 272, h: 50, lab: "Quicker, costlier|per case", ic: "coin", tone: "warn", ls: 14 })
    ], [
      { t: "Speed isn't everything", on: ["g1", "l1", "g2", "l2"], s: { g1: { lv: 0.15 }, g2: { lv: 0.5 } }, hot: ["l2"] },
      { t: "Fast but wrong", on: ["wr"], s: { g2: { lv: 0.85 } }, hot: ["wr"] },
      { t: "Cost to serve matters", on: ["g3", "l3", "cs"], s: { g3: { lv: 0.85 } }, hot: ["cs"] }
    ]),
    // Act 9 (moments 25-27). Benchmark Part2 #097 "Business Solution conveyor"
    // https://lottiefiles.com/free-animation/business-solution-pNyNfkcRsa
    // Adapted: boxes on a conveyor with a control panel â€” the whole line is timed, not one machine.
    A("P2#097", [
      L("cv", [24, 150], [376, 150], { col: "#7e8a96", sw: 12, tok: "doc", tc: C.navy, tn: 4, dur: 4 }),
      P("p1", "dept", 64, 150, { w: 64, h: 54, ic: "doc", lab: "Record|request", ls: 14 }),
      P("p2", "dept", 160, 150, { w: 64, h: 54, ic: "search", lab: "Locate|data", ls: 14 }),
      P("p3", "dept", 256, 150, { w: 64, h: 54, ic: "db", lab: "Combine|data", ls: 14 }),
      P("p4", "dept", 344, 150, { w: 64, h: 54, ic: "check", lab: "Full|record", ls: 14 }),
      P("ck", "clock", 92, 300, { r: 44, lab: "24-hour limit" }),
      P("wp", "pill", 270, 278, { w: 216, h: 50, lab: "Whole process|counts", tone: "goal", ls: 14 }),
      P("bl", "pill", 270, 342, { w: 216, h: 40, lab: "Baseline recorded first", ic: "chart", tone: "mint", ls: 13 })
    ], [
      { t: "Back to 24-hour rule", on: ["cv", "p1", "p2", "p3", "p4", "ck"], s: { cv: { flow: 1 }, ck: { h: 1, st: "goal" } }, hot: ["ck"] },
      { t: "Compliance spans every step", on: ["wp"], hot: ["wp", "p1", "p2", "p3", "p4"], f: "wp" },
      { t: "Record performance first", on: ["bl"], hot: ["bl"] }
    ]),
    // Act 10 (moments 28-30). Benchmark Part1 #037 "Workflow Dashboard - Interactive Motion Design"
    // https://dribbble.com/shots/27538364-Workflow-Dashboard-Interactive-Motion-Design
    // Adapted: dashboard tiles count up and flip status â€” green by throughput, red by the customer's clock.
    A("P1#037", [
      P("t1", "tile", 112, 130, { w: 170, h: 108, lab: "Department|throughput", v: "Looks good", tone: "ok", vs: 20, ls: 13 }),
      P("t2", "tile", 288, 130, { w: 170, h: 108, lab: "Customer|experience", v: "Feels worse", tone: "bad", vs: 20, ls: 13 }),
      P("wc", "card", 200, 270, { w: 290, h: 130, ic: "clock", lab: "Whose clock,|what start?", col: C.plum, is: 36, ls: 16 }),
      P("cl", "pill", 200, 350, { w: 270, h: 36, lab: "Measure what customers live", tone: "ok", ls: 13 })
    ], [
      { t: "Looks good, feels worse", on: ["t1", "t2"], hot: ["t2"] },
      { t: "Ask: whose clock?", on: ["wc"], s: { t1: { dim: 1 }, t2: { dim: 1 } }, hot: ["wc"] },
      { t: "Measure the customer's life", on: ["cl"], hot: ["cl"] }
    ])
  ]);

  // =====================================================================
  // W2O3c Â· Keeping sponsorship and performance alive â€” 35 moments, 10 acts
  // =====================================================================
  W.VL_SCENES["W2O3c"] = scene("W2O3c", [
    // Act 1 (moments 0-3). Benchmark Part2 #130 "Animated line chart lesson"
    // https://observablehq.com/@d3/learn-d3-animation
    // Adapted: a time series traced left to right â€” attention rises with the trigger and may fall after it.
    A("P2#130", [
      P("ms", "pill", 200, 76, { w: 260, h: 36, lab: "Milestone demonstration", ic: "flag", tone: "solid", ls: 14 }),
      P("ch", "line", 200, 196, { w: 330, h: 140, pts: [0.15, 0.85, 0.9, 0.86, 0.55, 0.3], col: C.orange, xlab: "Executive attention", marks: [{ i: 1, lab: "Funding secured", w: 150, y: -56, col: C.orange, dx: 26 }, { i: 4, lab: "If rule met", w: 120, y: -30, col: C.navy }] }),
      P("qq", "pill", 200, 336, { w: 300, h: 44, lab: "After compliance, then what?", ic: "q", tone: "unk", ls: 14 })
    ], [
      { t: "A milestone demonstration", on: ["ms", "ch"], s: { ch: { draw: 0.05 } }, hot: ["ms"] },
      { t: "Urgency secured the funding", s: { ch: { draw: 0.4, mk: 1 } }, hot: ["ch"] },
      { t: "And after compliance?", on: ["qq"], hot: ["qq"] },
      { t: "Attention may move on", s: { ch: { draw: 1, mk: 2 } }, hot: ["ch"] }
    ]),
    // Act 2 (moments 4-7). Benchmark Part2 #111 "Hierarchy traversal animated"
    // https://old.observablehq.com/@d3/hierarchy-traversal-animated
    // Adapted: visit one node then the next â€” governance as who decides, who owns, who reviews.
    A("P2#111", [
      P("r1", "pill", 72, 96, { w: 124, h: 50, lab: "Coordination|needed", tone: "goal", ls: 13 }),
      P("r2", "pill", 200, 96, { w: 124, h: 50, lab: "Resources|needed", tone: "goal", ls: 13 }),
      P("r3", "pill", 328, 96, { w: 124, h: 50, lab: "Commitment|needed", tone: "goal", ls: 13 }),
      P("tg", "card", 200, 210, { w: 300, h: 110, ic: "bolt", lab: "Trigger starts, can't sustain", col: C.orange, is: 34, ls: 15 }),
      P("gv", "pill", 200, 176, { w: 250, lab: "Governance arrangements", ic: "shield", tone: "solid", ls: 15 }),
      L("e1", [140, 196], [84, 250], { col: C.navy, sw: 3 }),
      L("e2", [200, 198], [200, 250], { col: C.navy, sw: 3 }),
      L("e3", [260, 196], [316, 250], { col: C.navy, sw: 3 }),
      P("n1", "pill", 76, 272, { w: 124, h: 40, lab: "Who decides", tone: "sky", ls: 14 }),
      P("n2", "pill", 200, 272, { w: 124, h: 40, lab: "Who owns", tone: "sky", ls: 14 }),
      P("n3", "pill", 324, 272, { w: 124, h: 40, lab: "Who reviews", tone: "sky", ls: 14 }),
      P("bx", "pill", 200, 344, { w: 290, h: 40, lab: "Beyond normal reporting lines", ic: "link", tone: "warn", ls: 13 })
    ], [
      { t: "Improvements still need support", on: ["r1", "r2", "r3"], hot: ["r1", "r2", "r3"], f: "r2" },
      { t: "Trigger begins, can't sustain", on: ["tg"], hot: ["tg"] },
      { t: "Governance organises decisions", off: ["tg"], on: ["gv", "e1", "e2", "e3", "n1", "n2", "n3"], hot: ["gv"] },
      { t: "Across reporting lines", on: ["bx"], hot: ["bx"] }
    ]),
    // Act 3 (moments 8-10). Benchmark Part2 #089 "Git Workflow 1"
    // https://lottiefiles.com/free-animation/git-workflow-1-G6eTYjLVJ5
    // Adapted: two branches conflict at one file; a new commit (technology) does not merge them â€” an owner does.
    A("P2#089", [
      P("rc", "dept", 72, 130, { w: 80, h: 66, ic: "bell", lab: "Reception|desk" }),
      P("hk", "dept", 328, 130, { w: 80, h: 66, ic: "bed", lab: "Housekeeping|team" }),
      P("rs", "pill", 200, 92, { w: 158, h: 50, lab: "Room-readiness|information", tone: "unk", ls: 13 }),
      L("c1", [114, 124], [124, 104], { col: C.red, sw: 4 }),
      L("c2", [286, 124], [276, 104], { col: C.red, sw: 4 }),
      P("bb", "bubble", 104, 236, { w: 160, lab: "Not our job", tail: "t", tx: -30, col: C.red }),
      P("bc", "bubble", 296, 236, { w: 160, lab: "Not ours either", tail: "t", tx: 30, col: C.red }),
      P("nt", "pill", 200, 304, { w: 250, h: 40, lab: "New technology added", ic: "db", tone: "sky", ls: 14 }),
      P("ps", "stamp", 200, 346, { lab: "Dispute persists", r: -5 }),
      P("ow", "person", 200, 196, { sz: 1, col: C.green }),
      P("or", "pill", 200, 346, { w: 250, h: 40, lab: "Owner resolves it", ic: "key", tone: "ok", ls: 14 })
    ], [
      { t: "Who updates room status?", on: ["rc", "hk", "rs", "c1", "c2", "bb", "bc"], hot: ["rs"] },
      { t: "Technology won't settle it", on: ["nt", "ps"], hot: ["ps"] },
      { t: "The owner needs authority", off: ["bb", "bc", "ps"], on: ["ow", "or"], s: { nt: { dim: 1 }, c1: { st: "ok" }, c2: { st: "ok" } }, hot: ["or"] }
    ]),
    // Act 4 (moments 11-13). Benchmark Part1 #049 "Workflow Dashboard UI Motion Concept"
    // https://dribbble.com/shots/27719715-SaaS-Dashboard-Workflow-UI-Motion-Concept
    // Adapted: a hierarchy of cards reveals and re-organises â€” sponsor above, departments below.
    A("P1#049", [
      P("tb", "table", 200, 104, { rx: 118, lab: "Senior management" }),
      P("sp", "person", 200, 216, { sz: 1.05, col: C.navy }),
      P("st", "icon", 224, 180, { ic: "star", sz: 24, col: C.gold }),
      P("sl", "pill", 200, 276, { w: 220, h: 36, lab: "Executive sponsor", tone: "solid", ls: 14 }),
      P("pi", "pill", 76, 216, { w: 124, h: 50, lab: "Protects|importance", tone: "mint", ls: 13 }),
      P("sc", "pill", 324, 216, { w: 124, h: 50, lab: "Secures|commitment", tone: "mint", ls: 13 }),
      P("rx", "pill", 200, 340, { w: 300, h: 40, lab: "Departments resist routine change", ic: "warn", tone: "warn", ls: 13 })
    ], [
      { t: "The sponsor's different role", on: ["tb", "sp", "st", "sl", "pi"], hot: ["pi"] },
      { t: "Sponsor: support and commitment", on: ["sc"], hot: ["sc", "sl"], f: "sc" },
      { t: "Needed when departments resist", on: ["rx"], hot: ["rx"] }
    ]),
    // Act 5 (moments 14-16). Benchmark Part2 #078 "Data Workflow Animation"
    // https://dribbble.com/shots/27247003-Data-Workflow-Animation
    // Adapted: nodes and links activate in sequence â€” a request, a refusal, then two roles connect them.
    A("P2#078", [
      P("rc", "dept", 66, 132, { w: 74, h: 62, ic: "bell", lab: "Reception|desk" }),
      P("hk", "dept", 334, 132, { w: 74, h: 62, ic: "bed", lab: "Housekeeping|team" }),
      P("rq", "bubble", 200, 80, { w: 160, lab: "Faster status, please", tail: "l", col: C.navy, ls: 13 }),
      P("rf", "bubble", 200, 132, { w: 160, lab: "Ours is sufficient", tail: "r", col: C.red, ls: 13 }),
      P("sp", "pill", 104, 246, { w: 176, h: 50, lab: "Sponsor: reinforce|purpose", ic: "star", tone: "solid", ls: 13 }),
      P("ow", "pill", 296, 246, { w: 176, h: 50, lab: "Owner: coordinate|response", ic: "key", tone: "ok", ls: 13 }),
      P("sh", "icon", 200, 320, { ic: "shield", sz: 46, col: C.green }),
      P("bo", "pill", 200, 360, { w: 240, h: 30, lab: "Board's outcomes protected", tone: "mint", ls: 13 })
    ], [
      { t: "Faster updates? Refused", on: ["rc", "hk", "rq", "rf"], hot: ["rf"] },
      { t: "Sponsor and owner act", on: ["sp", "ow"], hot: ["sp", "ow"], f: "ow" },
      { t: "Together they protect outcomes", on: ["sh", "bo"], hot: ["sh"] }
    ]),
    // Act 6 (moments 17-20). Benchmark Part2 #094 "Process - Success"
    // https://lottiefiles.com/free-animation/process-success-EhFVqZgUPP
    // Adapted: activity transforms into a check â€” shown only as the test the programme must still pass.
    A("P2#094", [
      P("gv", "pill", 104, 90, { w: 150, h: 50, lab: "Governance|alone", ic: "shield", tone: "off", ls: 14 }),
      P("pb", "pill", 296, 90, { w: 150, h: 50, lab: "Promised|benefits?", ic: "q", tone: "unk", ls: 14 }),
      P("br", "card", 200, 196, { w: 300, h: 118, ic: "search", lab: "Benefits realisation:|achieved?", col: C.green, is: 34, ls: 15 }),
      P("cc", "pill", 200, 296, { w: 280, h: 40, lab: "Compliance stays central", ic: "lock", tone: "goal", ls: 14 }),
      P("ck", "clock", 92, 300, { r: 38 }),
      P("rp", "pill", 254, 300, { w: 236, h: 50, lab: "Records reliably|within 24h", ic: "doc", tone: "goal", ls: 13 }),
      P("tt", "pill", 254, 356, { w: 236, h: 30, lab: "Still to demonstrate", tone: "off", ls: 13 })
    ], [
      { t: "Governance isn't enough", on: ["gv", "pb"], hot: ["pb"] },
      { t: "Benefits realisation defined", on: ["br"], hot: ["br"] },
      { t: "Compliance remains central", on: ["cc"], hot: ["cc"] },
      { t: "Prove 24-hour reliability", off: ["cc"], on: ["ck", "rp", "tt"], s: { ck: { h: 1, st: "goal" } }, hot: ["rp"] }
    ]),
    // Act 7 (moments 21-24). Benchmark Part2 #125 "Infographics Dashboard"
    // https://lottiefiles.com/free-animation/infographics-dashboard-X6P5rVLZAB
    // Adapted: a metric graph grows against its baseline beside a tile that reads the indicator.
    A("P2#125", [
      P("s1", "pill", 104, 86, { w: 176, h: 36, lab: "Compliance measure", tone: "goal", ls: 13 }),
      P("s2", "pill", 296, 86, { w: 176, h: 36, lab: "Guest measure", tone: "mint", ls: 13 }),
      P("ki", "card", 200, 186, { w: 300, h: 104, ic: "target", lab: "Indicator:|outcome achieved?", col: C.navy, is: 30, ls: 15 }),
      P("ad", "line", 200, 196, { w: 320, h: 120, pts: [0.7, 0.72, 0.7, 0.71, 0.55, 0.42, 0.36], base: 0.7, baseLab: "Arrival baseline", col: C.green, xlab: "Guest-arrival delays" }),
      P("tp", "pill", 200, 336, { w: 260, h: 52, lab: "System works,|guests wait?", ic: "warn", tone: "warn", ls: 13 })
    ], [
      { t: "Guest gains measured separately", on: ["s1", "s2"], hot: ["s2"] },
      { t: "What an indicator is", on: ["ki"], hot: ["ki"] },
      { t: "Watch arrival delays", off: ["ki"], on: ["ad"], s: { ad: { draw: 1, base: 1 } }, hot: ["ad"] },
      { t: "Technical success isn't enough", on: ["tp"], hot: ["tp"] }
    ]),
    // Act 8 (moments 25-28). Benchmark Part2 #104 "Logistics Trucks"
    // https://lottiefiles.com/free-animation/logistics-trucks-DHvuLcYVdQ
    // Adapted: a vehicle and its delivery marker move â€” the sponsor leaves; the documented cargo must remain.
    A("P2#104", [
      P("so", "person", 76, 206, { sz: 1.15, col: C.navy, lab: "Original sponsor", ls: 13 }),
      P("su", "person", 324, 206, { sz: 1.15, col: C.plum, skin: C.skin2, lab: "New executive", ls: 13 }),
      P("qb", "bubble", 300, 98, { w: 160, lab: "Why keep spending?", tail: "b", tx: 24, col: C.plum, ls: 14 }),
      P("dc", "doc", 200, 196, { w: 140, h: 150, title: "Documented|case", ts: 13, lines: ["Clear purpose", "Named owners", "Agreed benefits"], ls: 13 }),
      P("en", "pill", 104, 316, { w: 176, h: 40, lab: "One person's enthusiasm", tone: "off", ls: 13 }),
      P("mg", "pill", 296, 316, { w: 176, h: 40, lab: "Measures, governance", tone: "ok", ls: 13 }),
      P("ff", "pill", 200, 352, { w: 260, h: 32, lab: "Successor judges fairly", ic: "check", tone: "mint", ls: 13 })
    ], [
      { t: "The sponsor may leave", on: ["so", "su"], s: { so: { x: 66, o: 0.45, walk: 1, d: 1.6 } }, hot: ["su"] },
      { t: "Successor questions spending", on: ["qb", "dc"], s: { so: { walk: 0 }, su: { mood: "worry" }, dc: { rows: 0 } }, hot: ["qb"] },
      { t: "Measures over enthusiasm", on: ["en", "mg"], s: { dc: { rows: 3, hl: { 0: "b", 1: "b", 2: "b" } }, en: { dim: 1 } }, hot: ["mg"] },
      { t: "Documents make it fair", off: ["qb"], on: ["ff"], s: { su: { mood: "happy" } }, hot: ["ff", "dc"], f: "dc" }
    ]),
    // Act 9 (moments 29-31). Benchmark B1 #67 "Linear product development site"
    // https://linear.app/
    // Adapted: cards move from a project board into the operations column â€” then the guest returns.
    A("B1#67", [
      P("c1", "panel", 104, 200, { w: 184, h: 230, lab: "Programme team", ls: 13, col: C.plum, fill: "#f4f0fa" }),
      P("c2", "panel", 296, 200, { w: 184, h: 230, lab: "Everyday operations", ls: 13, col: C.green, fill: "#eef7f2" }),
      P("k1", "pill", 104, 152, { w: 156, h: 34, lab: "Records process", tone: "plum", ls: 13 }),
      P("k2", "pill", 104, 196, { w: 156, h: 34, lab: "Handoff routines", tone: "plum", ls: 13 }),
      P("k3", "pill", 104, 240, { w: 156, h: 34, lab: "Performance review", tone: "plum", ls: 13 }),
      P("dm", "pill", 200, 346, { w: 260, h: 36, lab: "Demo day isn't enough", ic: "x", tone: "off", ls: 13 }),
      P("tv", "person", 200, 340, { sz: 0.85, col: C.teal, bag: 1, mood: "sad" }),
      P("tb", "bubble", 312, 336, { w: 140, h: 50, lab: "Hidden by|reports", tail: "l", col: C.red, ls: 13 })
    ], [
      { t: "Hand over before closing", on: ["c1", "c2", "k1", "k2", "k3"], s: { k1: { x: 296, d: 1 }, k2: { x: 296, d: 1.2 }, k3: { x: 296, d: 1.4 } }, hot: ["c2"] },
      { t: "Everyday, not just demos", on: ["dm"], hot: ["dm"] },
      { t: "Remember the traveller", off: ["dm"], on: ["tv", "tb"], s: { tv: { wait: 1 } }, hot: ["tb"] }
    ]),
    // Act 10 (moments 32-34). Benchmark Part2 #093 "Process-Para"
    // https://lottiefiles.com/free-animation/process-para-qujCEQ2AKT
    // Adapted: rotate, wait, finish â€” but here the cycle keeps turning after the team leaves.
    A("P2#093", [
      P("tv", "person", 74, 210, { sz: 1.15, col: C.teal, bag: 1, mood: "happy", lab: "Her next visit", ls: 14 }),
      P("ht", "hotel", 270, 176, { w: 170, h: 160, lab: "Qasr Marina" }),
      P("pt", "pill", 270, 300, { w: 230, h: 36, lab: "Programme team departed", tone: "off", ls: 13 }),
      P("cy", "icon", 200, 186, { ic: "loop", sz: 120, col: C.green, idle: "v2spinslow" }),
      P("cl", "pill", 200, 300, { w: 300, h: 40, lab: "Managed continuously, not once", tone: "ok", ls: 13 }),
      P("o1", "pill", 84, 108, { w: 150, h: 36, lab: "Clear ownership", tone: "sky", ls: 14 }),
      P("o2", "pill", 316, 108, { w: 150, h: 36, lab: "Agreed measures", tone: "sky", ls: 14 }),
      P("o3", "pill", 200, 70, { w: 150, h: 36, lab: "Active governance", tone: "sky", ls: 14 }),
      P("lt", "pill", 200, 352, { w: 300, h: 36, lab: "Lasting beyond the trigger", ic: "star", tone: "solid", ls: 13 })
    ], [
      { t: "It keeps working later", on: ["tv", "ht", "pt"], s: { ht: { lit: 1 } }, hot: ["tv"] },
      { t: "BPM: continuous management", off: ["tv", "ht", "pt"], on: ["cy", "cl"], hot: ["cl"] },
      { t: "Lasting improvement, connected", on: ["o1", "o2", "o3", "lt"], hot: ["lt"] }
    ])
  ]);

})();
// END FILE w02-claude-v2-part3.js

// FILE w02-claude-v2-part4.js
// OPER621 Â· Week 2 Â· Drivers and Triggers for BPM â€” animated teaching scenes (v2), part 4 of 4.
// Lesson 4 Â· From a promising brief to a credible programme. Sections: W2O4a, W2O4b, W2O4c. Standalone: defines every helper it uses, registers its own
// scenes, and appends its own scoped rules to the shared <style id="vl-sc-w02">. Parts load in any order.
// Contract: window.VL_SCENES['<sec id>'] = { build(el), step(i, n), reset() }.
// Design (v2): one beat per narration moment. Each act is an original composition adapted from the
// benchmark named (with URL) in the comment above it; a new act every 3-4 moments; every moment sets an
// explicit object-level state for its own sentence, and the header chip names that sentence's claim in
// 2-4 words. Uses window.gsap when present, CSS transitions otherwise; honours prefers-reduced-motion.
(() => {
  "use strict";
  const SECS = ["W2O4a","W2O4b","W2O4c"];
  // =====================================================================
  // KIT (self-contained in this part; every helper used is defined here)
  // Stage: viewBox 0 0 400 380. Header chip y 8-44, figure area y 54-374.
  // Each act = a composition of "props"; each narration moment = one beat
  // that sets an explicit object-level state for that sentence.
  // =====================================================================
  const W = window;
  W.VL_SCENES = W.VL_SCENES || {};
  const C = {
    navy: "#1d4f7a", ink: "#17283a", orange: "#cf5427", red: "#c0392b", green: "#1f7f5c",
    gold: "#b7820f", plum: "#6a4c93", teal: "#13808a", grey: "#7b8896", pale: "#e3e9ef",
    paper: "#fbf8f2", white: "#ffffff", mint: "#e0f2e9", blush: "#fbe4da", sand: "#f7eed8",
    sky: "#e2eef8", lilac: "#eee8f7", skin: "#e8b88e", skin2: "#b97f55", hair: "#3a2a20"
  };
  // status palettes: [fill, stroke, text]
  const TONE = {
    norm: ["#ffffff", C.navy, C.ink], ok: [C.green, C.green, "#ffffff"], bad: [C.red, C.red, "#ffffff"],
    warn: [C.orange, C.orange, "#ffffff"], goal: ["#fff7e3", C.gold, "#6e4f00"], solid: [C.navy, C.navy, "#ffffff"],
    unk: ["#f1ecf8", C.plum, C.plum], off: ["#eef1f4", "#9aa6b2", "#5d6b78"], mint: [C.mint, C.green, "#125a3f"],
    blush: [C.blush, C.red, "#8a2418"], sky: [C.sky, C.navy, C.navy], plum: [C.plum, C.plum, "#ffffff"],
    gold: [C.gold, C.gold, "#ffffff"], teal: [C.teal, C.teal, "#ffffff"]
  };
  const tone = k => TONE[k] || TONE.norm;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const q = (g, s) => (g ? g.querySelector(s) : null);
  const qa = (g, s) => (g ? Array.prototype.slice.call(g.querySelectorAll(s)) : []);
  const RM = () => { try { return !!W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } };
  let INST = false;

  // ---------- SVG string builders ----------
  function T(x, y, s, o) {
    o = o || {};
    const size = o.sz || 16, lines = String(s).split("|"), lh = Math.round(size * 1.17);
    const y0 = y - (lines.length - 1) * lh / 2;
    return `<text class="v2t ${o.cls || ""}" x="${x}" y="${y0}" data-cy="${y}"${o.mw ? ` data-mw="${o.mw}"` : ""} font-size="${size}" font-weight="${o.w || 700}" fill="${o.fill || C.ink}" text-anchor="${o.a || "middle"}" dominant-baseline="central">` +
      lines.map((l, i) => `<tspan x="${x}" dy="${i ? lh : 0}">${esc(l)}</tspan>`).join("") + `</text>`;
  }
  function setLab(el, s) {
    if (!el || s == null || el._s === s) return;
    el._s = s;
    const x = el.getAttribute("x"), size = +el.getAttribute("font-size"), cy = +el.getAttribute("data-cy");
    const lines = String(s).split("|"), lh = Math.round(size * 1.17);
    el.setAttribute("y", cy - (lines.length - 1) * lh / 2);
    el.innerHTML = lines.map((l, i) => `<tspan x="${x}" dy="${i ? lh : 0}">${esc(l)}</tspan>`).join("");
  }
  function R(x, y, w, h, o) {
    o = o || {};
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx == null ? 10 : o.rx}" fill="${o.fill || "none"}"` +
      (o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 2}"` : "") + (o.dash ? ` stroke-dasharray="${o.dash}"` : "") +
      (o.op != null ? ` opacity="${o.op}"` : "") + (o.cls ? ` class="${o.cls}"` : "") + `/>`;
  }
  function CI(x, y, r, o) {
    o = o || {};
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${o.fill || "none"}"` + (o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 2}"` : "") +
      (o.dash ? ` stroke-dasharray="${o.dash}"` : "") + (o.op != null ? ` opacity="${o.op}"` : "") + (o.cls ? ` class="${o.cls}"` : "") + `/>`;
  }
  function PA(d, o) {
    o = o || {};
    return `<path d="${d}" fill="${o.fill || "none"}" stroke="${o.stroke || "none"}" stroke-width="${o.sw == null ? 3 : o.sw}" stroke-linecap="round" stroke-linejoin="round"` +
      (o.draw ? ` pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"` : "") + (o.dash ? ` stroke-dasharray="${o.dash}"` : "") +
      (o.op != null ? ` opacity="${o.op}"` : "") + (o.cls ? ` class="${o.cls}"` : "") + `/>`;
  }
  // ---------- icon set (24-unit grid) ----------
  function ico(n, x, y, s, col, det) {
    s = s || 28; col = col || C.navy;
    const S = `fill="none" stroke="${col}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"`, F = `fill="${col}"`;
    const P = {
      check: `<path d="M4 12.5l5 5L20 6" ${S.replace("2.4", "3.4")}/>`,
      x: `<path d="M6 6l12 12M18 6L6 18" ${S.replace("2.4", "3.4")}/>`,
      warn: `<path d="M12 2.5L22.5 21h-21z" ${F}/><path d="M12 9v6" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="12" cy="18" r="1.4" fill="#fff"/>`,
      clock: `<circle cx="12" cy="12" r="9.5" ${S}/><path d="M12 6.5V12l4 2.5" ${S}/>`,
      bolt: `<path d="M13.5 1.5L4 14h7l-1.5 8.5L20 9.5h-7z" ${F}/>`,
      doc: `<path d="M6 2.5h8l4.5 4.5v14.5H6z" ${S}/><path d="M9 11h7M9 15h7M9 19h5" ${S}/>`,
      person: `<circle cx="12" cy="7" r="4.2" ${F}/><path d="M3.5 22c0-5.2 3.8-8.6 8.5-8.6s8.5 3.4 8.5 8.6z" ${F}/>`,
      users: `<circle cx="8.5" cy="8" r="3.6" ${F}/><circle cx="16.5" cy="8.5" r="3" ${F} opacity=".7"/><path d="M1.5 21c0-4.4 3.1-7.2 7-7.2s7 2.8 7 7.2z" ${F}/><path d="M14 13.6c4 0 7.5 2.4 7.5 7.4h-4" ${F} opacity=".7"/>`,
      phone: `<rect x="6.5" y="1.5" width="11" height="21" rx="2.5" ${S}/><circle cx="12" cy="18.5" r="1.3" ${F}/><path d="M9.5 9l2 2 3.5-4" ${S}/>`,
      coin: `<circle cx="12" cy="12" r="10" ${F}/><circle cx="12" cy="12" r="6.5" fill="none" stroke="#fff" stroke-width="1.8"/>`,
      lock: `<rect x="4.5" y="10.5" width="15" height="11" rx="2" ${F}/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" ${S}/>`,
      unlock: `<rect x="4.5" y="10.5" width="15" height="11" rx="2" ${F}/><path d="M8 10.5V7.5a4 4 0 0 1 7.6-1.8" ${S}/>`,
      flag: `<path d="M5 22V3" ${S}/><path d="M5 3.5h13l-3 4.5 3 4.5H5z" ${F}/>`,
      eye: `<path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z" ${S}/><circle cx="12" cy="12" r="3.3" ${F}/>`,
      house: `<path d="M2.5 11.5L12 3l9.5 8.5V21h-19z" ${F}/><rect x="9.5" y="14" width="5" height="7" fill="#fff"/>`,
      gear: `<circle cx="12" cy="12" r="4" ${S}/><path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4M4.6 4.6l2.8 2.8M16.6 16.6l2.8 2.8M4.6 19.4l2.8-2.8M16.6 7.4l2.8-2.8" ${S}/>`,
      chart: `<path d="M3 21h18" ${S}/><rect x="5" y="12" width="3.5" height="8" ${F}/><rect x="10.3" y="7" width="3.5" height="13" ${F}/><rect x="15.6" y="3" width="3.5" height="17" ${F}/>`,
      down: `<path d="M3 5l6 7 4-3 8 10" ${S}/><path d="M15 19h6v-6" ${S}/>`,
      up: `<path d="M3 19l6-7 4 3 8-10" ${S}/><path d="M15 5h6v6" ${S}/>`,
      bell: `<path d="M5 17h14l-1.8-2.5V10a5.2 5.2 0 0 0-10.4 0v4.5z" ${F}/><path d="M10 20a2 2 0 0 0 4 0" ${S}/>`,
      qm: `<path d="M8.3 8.6a3.7 3.7 0 1 1 5 3.4c-1 .5-1.3 1.1-1.3 2.4" ${S.replace("2.4", "3")}/><circle cx="12" cy="18.6" r="1.7" ${F}/>`,
      q: `<circle cx="12" cy="12" r="10.5" ${F}/><path d="M9.2 9.3a2.9 2.9 0 1 1 3.9 2.7c-.8.4-1.1.9-1.1 1.8" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="17.4" r="1.4" fill="#fff"/>`,
      star: `<path d="M12 2l3 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.8 5.7 21.4l1.5-7.1L1.8 9.4 9 8.6z" ${F}/>`,
      cal: `<rect x="3" y="4.5" width="18" height="17" rx="2" ${S}/><path d="M3 9.5h18M8 2.5v4M16 2.5v4" ${S}/>`,
      chat: `<path d="M3 4.5h18v12H10l-5 4v-4H3z" ${F}/>`,
      key: `<circle cx="7.5" cy="12" r="4.5" ${S}/><path d="M12 12h10M18 12v4M21 12v3" ${S}/>`,
      db: `<ellipse cx="12" cy="5.5" rx="8" ry="3" ${S}/><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" ${S}/>`,
      seal: `<circle cx="12" cy="10" r="7.5" ${F}/><path d="M8 16l-2 6 4-2 2 3 1-6M16 16l2 6-4-2" ${F}/><path d="M8.6 10.2l2.4 2.4 4.4-4.6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`,
      mail: `<rect x="2.5" y="5" width="19" height="14" rx="2" ${F}/><path d="M3.5 6.5l8.5 6.5 8.5-6.5" fill="none" stroke="#fff" stroke-width="1.8"/>`,
      search: `<circle cx="10" cy="10" r="6.5" ${S}/><path d="M15 15l6 6" ${S.replace("2.4", "3.4")}/>`,
      bed: `<path d="M2.5 19V7M2.5 15h19v4M21.5 15v-3a3 3 0 0 0-3-3h-8v6" ${S}/><circle cx="6.5" cy="11.5" r="2" ${F}/>`,
      hotel: `<rect x="4" y="3" width="16" height="18.5" rx="1.5" ${F}/><path d="M7.5 7h2M11 7h2M14.5 7h2M7.5 11h2M11 11h2M14.5 11h2M7.5 15h2M14.5 15h2" stroke="#fff" stroke-width="1.8"/><rect x="10.5" y="16" width="3" height="5.5" fill="#fff"/>`,
      target: `<circle cx="12" cy="12" r="9.5" ${S}/><circle cx="12" cy="12" r="5" ${S}/><circle cx="12" cy="12" r="1.6" ${F}/>`,
      gavel: `<path d="M13 3l6 6M10.5 5.5l6 6M11.5 4.5l-4 4 6 6 4-4M9.5 10.5L3 17l2.5 2.5L12 13" ${S}/><path d="M13 21h8" ${S}/>`,
      shield: `<path d="M12 2.5l8 3v6c0 5-3.5 8.7-8 10-4.5-1.3-8-5-8-10v-6z" ${F}/><path d="M8.5 12l2.5 2.5 4.5-5" fill="none" stroke="#fff" stroke-width="2"/>`,
      book: `<path d="M3 5c3-1.5 6-1.5 9 0v15c-3-1.5-6-1.5-9 0zM12 5c3-1.5 6-1.5 9 0v15c-3-1.5-6-1.5-9 0z" ${S}/>`,
      loop: `<path d="M20 11a8 8 0 1 0-2.4 6" ${S}/><path d="M20 4v7h-7" ${S}/>`,
      money: `<rect x="2" y="6" width="20" height="12" rx="2" ${F}/><circle cx="12" cy="12" r="3" fill="none" stroke="#fff" stroke-width="1.8"/>`,
      plug: `<path d="M8 3v5M16 3v5M5.5 8h13v3a6.5 6.5 0 0 1-13 0zM12 17.5V22" ${S}/>`,
      link: `<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" ${S}/>`,
      pin: `<path d="M12 22s7-7.2 7-12.5A7 7 0 0 0 5 9.5C5 14.8 12 22 12 22z" ${F}/><circle cx="12" cy="9.5" r="2.6" fill="#fff"/>`,
      reply: `<path d="M10 6L4 12l6 6M4 12h10a6 6 0 0 1 6 6v1" ${S}/>`,
      handshake: `<path d="M2 11l4-4 4 2 3-2 4 1 5 3M6 7l-4 7 3 3M22 11l-4 6-3-1M9 13l3 3M11 11l4 4M13 9l4 4" ${S}/>`
    };
    const body = (P[n] || P.q);
    return `<g transform="translate(${(x - s / 2).toFixed(1)} ${(y - s / 2).toFixed(1)}) scale(${(s / 24).toFixed(4)})">${det ? body.replace(/"#fff"/g, `"${det}"`) : body}</g>`;
  }

  // ---------- motion (GSAP when present, CSS transitions otherwise) ----------
  const EASE = { back: ["back.out(1.7)", "cubic-bezier(.34,1.56,.64,1)"], soft: ["power2.inOut", "cubic-bezier(.45,0,.2,1)"], elastic: ["elastic.out(1,0.55)", "cubic-bezier(.34,1.8,.5,1)"] };
  function go(n, v) {
    if (!n) return;
    const G = W.gsap, inst = INST || RM();
    const x = v.x || 0, y = v.y || 0, r = v.r || 0, s = v.s == null ? 1 : v.s;
    const sx = v.sx == null ? s : v.sx, sy = v.sy == null ? s : v.sy, o = v.o == null ? 1 : v.o, e = EASE[v.e];
    if (G && typeof G.to === "function") {
      const p = { x, y, rotation: r, scaleX: sx, scaleY: sy, opacity: o, transformOrigin: v.to || "50% 50%", overwrite: "auto" };
      if (inst) G.set(n, p); else G.to(n, Object.assign(p, { duration: v.d || 0.7, ease: e ? e[0] : "power3.out", delay: v.dl || 0 }));
      return;
    }
    n.style.transitionDuration = inst ? "0s" : (v.d || 0.7) + "s";
    n.style.transitionDelay = inst ? "0s" : (v.dl || 0) + "s";
    n.style.transitionTimingFunction = e ? e[1] : "";
    n.style.transformOrigin = v.to || "";
    n.style.transform = `translate(${x}px,${y}px) rotate(${r}deg) scale(${sx},${sy})`;
    n.style.opacity = String(o);
  }
  function dash(n, v) { if (n) { n.style.transition = (INST || RM()) ? "none" : ""; n.style.strokeDashoffset = String(v); } }
  function paint(n, f, s, t) { if (!n) return; if (f != null) n.style.fill = f; if (s != null) n.style.stroke = s; if (t != null) n.style.strokeDasharray = t; }
  const shown = (n, on) => { if (n) n.style.display = on ? "" : "none"; };
  const reflow = n => { if (n) void n.getBoundingClientRect(); };
  function restart(n, cls) { if (!n || INST || RM()) return; n.classList.remove(cls); reflow(n); n.classList.add(cls); }

  // ---------- props ----------
  const LAB = (x, y, s, o) => T(x, y, s, Object.assign({}, o || {}, { cls: "lab " + ((o && o.cls) || "") }));
  const K = {};
  const MOODS = {
    happy: `<path class="mo mo-happy" d="M-5.5 -15.5Q0 -10 5.5 -15.5" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>`,
    ok: `<path class="mo mo-ok" d="M-4.5 -14.5H4.5" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>`,
    sad: `<path class="mo mo-sad" d="M-5.5 -12Q0 -17.5 5.5 -12" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>`,
    worry: `<g class="mo mo-worry"><path d="M-5 -13.5q2.5-2.5 5 0t5 0" fill="none" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/><path d="M-8 -27l5-2M8 -27l-5-2" stroke="${C.ink}" stroke-width="1.8" stroke-linecap="round"/></g>`,
    angry: `<g class="mo mo-angry"><path d="M-5.5 -12Q0 -17 5.5 -12" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/><path d="M-8 -29l5 2.5M8 -29l-5 2.5" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/></g>`
  };
  K.person = {
    b(p) {
      const z = p.sz || 1, col = p.col || C.navy;
      const fig = `<g class="pf"><g transform="scale(${z})">` +
        (p.bag ? `<rect x="17" y="4" width="17" height="20" rx="3" fill="${C.gold}"/><path d="M21.5 4v-4h8v4" stroke="${C.gold}" stroke-width="2.4" fill="none"/>` : "") +
        `<path d="M-18 24V7c0-10 8-15.5 18-15.5S18-3 18 7v17z" fill="${col}"/>` +
        `<circle cx="0" cy="-22" r="13" fill="${p.skin || C.skin}"/>` +
        `<path d="M-13.2 -23.5c0-9.5 6-13.8 13.2-13.8s13.2 4.3 13.2 13.8c-3.5-5.2-8-6.4-13.2-6.4s-9.7 1.2-13.2 6.4z" fill="${p.hair || C.hair}"/>` +
        `<circle cx="-4.6" cy="-20.5" r="1.9" fill="${C.ink}"/><circle cx="4.6" cy="-20.5" r="1.9" fill="${C.ink}"/>` +
        Object.keys(MOODS).map(k => MOODS[k]).join("") + `</g></g>`;
      return fig + (p.lab ? LAB(0, 26 * z + 18, p.lab, { sz: p.ls || 15, fill: p.lc || C.ink }) : "");
    },
    u(g, p, st) {
      const m = st.mood || p.mood || "ok";
      qa(g, ".mo").forEach(e => shown(e, e.classList.contains("mo-" + m)));
      const f = q(g, ".pf"); if (f) f.classList.toggle("v2bob", !!(st.walk || st.wait) && st.on);
    },
    bb: p => { const z = p.sz || 1; return [-20 * z, -37 * z, 40 * z, 62 * z]; }
  };
  K.hotel = {
    b(p) {
      const w = p.w || 150, h = p.h || 130, x0 = -w / 2, y0 = -h / 2, col = p.col || C.navy;
      let s = PA(`M${x0 - 6} ${y0 + 26}L0 ${y0}L${-x0 + 6} ${y0 + 26}Z`, { fill: col, stroke: col, sw: 2 });
      s += R(x0, y0 + 24, w, h - 24, { fill: "#ffffff", stroke: col, sw: 3, rx: 4 });
      s += R(x0 + 10, y0 + 32, w - 20, 30, { fill: col, rx: 6, cls: "v2c hsign" }) + LAB(0, y0 + 47, p.lab || "", { sz: p.ls || 14, fill: "#ffffff" });
      const top = y0 + 72, rows = Math.max(1, Math.floor((h - 72 - 34) / 26)), cols = Math.max(2, Math.floor((w - 20) / 30));
      const sp = (w - 20) / cols;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) s += R(x0 + 10 + c * sp + sp / 2 - 9, top + r * 26, 18, 16, { fill: "#cfd8e2", rx: 3, cls: "v2c hwin" });
      s += R(-12, h / 2 - 30, 24, 30, { fill: col, rx: 3 });
      return `<g class="hb">${s}</g>`;
    },
    u(g, p, st) {
      qa(g, ".hwin").forEach((e, i) => paint(e, st.lit ? (i % 3 === 1 ? "#f3d27a" : "#f7e3a6") : "#cfd8e2"));
      paint(q(g, ".hsign"), st.st === "bad" ? C.red : st.st === "ok" ? C.green : (p.col || C.navy));
      const b = q(g, ".hb"); if (b) b.classList.toggle("v2shake", !!st.shake && st.on);
    },
    bb: p => [-(p.w || 150) / 2 - 6, -(p.h || 130) / 2, (p.w || 150) + 12, p.h || 130]
  };
  function badge(x, y) {
    return `<g class="bdgg">` + CI(x, y, 13, { fill: C.green, stroke: "#ffffff", sw: 2.5, cls: "v2c bdg" }) +
      ["ok:check", "bad:x", "warn:warn", "lock:lock", "unk:qm", "open:unlock"].map(a => { const [k, ic] = a.split(":"); return `<g class="bi bi-${k}">${ico(ic, x, y, 15, "#ffffff")}</g>`; }).join("") + `</g>`;
  }
  const BADGEC = { ok: C.green, bad: C.red, warn: C.orange, lock: C.red, unk: C.plum, open: C.green };
  function setBadge(g, k) {
    const b = q(g, ".bdgg"); shown(b, !!BADGEC[k]);
    if (!BADGEC[k]) return;
    qa(g, ".bi").forEach(e => shown(e, e.classList.contains("bi-" + k)));
    paint(q(g, ".bdg"), BADGEC[k]);
  }
  K.dept = {
    b(p) {
      const w = p.w || 78, h = p.h || 66, col = p.col || C.navy;
      return R(-w / 2, -h / 2, w, h, { rx: 14, fill: "#ffffff", stroke: col, sw: 3, cls: "v2c dbox" }) + ico(p.ic || "gear", 0, 0, Math.min(w, h) * 0.56, col) +
        badge(w / 2 - 4, -h / 2 + 4) + (p.lab ? LAB(0, h / 2 + (String(p.lab).indexOf("|") >= 0 ? 24 : 16), p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { setBadge(g, st.st); paint(q(g, ".dbox"), st.st === "bad" ? C.blush : st.st === "ok" ? C.mint : "#ffffff", st.st === "bad" ? C.red : (p.col || C.navy)); },
    bb: p => [-(p.w || 78) / 2, -(p.h || 66) / 2, p.w || 78, p.h || 66]
  };
  K.db = {
    b(p) {
      const col = p.col || C.navy;
      return PA("M-26 -22V20a26 8 0 0 0 52 0V-22", { fill: "#ffffff", stroke: col, sw: 3, cls: "v2c dbb" }) +
        `<ellipse cx="0" cy="-22" rx="26" ry="8" fill="${C.sky}" stroke="${col}" stroke-width="3"/>` +
        PA("M-26 -6a26 8 0 0 0 52 0M-26 8a26 8 0 0 0 52 0", { stroke: col, sw: 2 }) +
        `<g class="dloc">${CI(24, -26, 13, { fill: C.gold, stroke: "#ffffff", sw: 2 })}${ico("house", 24, -26, 14, "#ffffff")}</g>` +
        badge(-24, -26) + (p.lab ? LAB(0, 46, p.lab, { sz: p.ls || 14 }) : "");
    },
    u(g, p, st) { shown(q(g, ".dloc"), !!st.loc); setBadge(g, st.st); paint(q(g, ".dbb"), st.st === "bad" ? C.blush : "#ffffff"); },
    bb: () => [-28, -32, 56, 64]
  };
  const HLC = { y: "#f6dd8a", r: "#f4b6a4", g: "#bfe4cf", b: "#cfe0f2" };
  K.doc = {
    b(p) {
      const w = p.w || 160, h = p.h || 200, x0 = -w / 2, y0 = -h / 2, col = p.col || C.navy, L = p.lines || [], n = L.length || p.rows || 6;
      const top = y0 + (p.title ? 50 : 16), rh = p.rh || Math.min(36, (h - (top - y0) - 10) / n);
      let s = PA(`M${x0} ${y0 + 6}a6 6 0 0 1 6 -6H${-x0 - 22}L${-x0} ${y0 + 22}V${-y0 - 6}a6 6 0 0 1 -6 6H${x0 + 6}a6 6 0 0 1 -6 -6Z`, { fill: "#ffffff", stroke: col, sw: 3 });
      s += PA(`M${-x0 - 22} ${y0}V${y0 + 22}H${-x0}`, { stroke: col, sw: 2.5 });
      if (p.title) s += R(x0 + 8, y0 + 8, w - 36, 34, { fill: col, rx: 7 }) + LAB(-14, y0 + 25, p.title, { sz: p.ts || 14, fill: "#ffffff" });
      for (let i = 0; i < n; i++) {
        const y = top + rh * i + rh / 2;
        s += `<g class="rw rw${i}">` + R(x0 + 8, y - rh / 2 + 2, w - 16, rh - 4, { fill: "transparent", rx: 5, cls: `v2c hl hl${i}` });
        s += L[i] ? T(x0 + 16, y, L[i], { a: "start", sz: p.ls || 14, cls: "row", w: 600 }) : R(x0 + 16, y - 4, (w - 40) * (i % 3 === 2 ? 0.6 : 0.9), 8, { fill: C.pale, rx: 4 });
        s += PA(`M${x0 + 10} ${y}H${-x0 - 10}`, { stroke: C.red, sw: 3, draw: 1, cls: `v2d sk sk${i}` }) + `</g>`;
      }
      (p.stamps || []).forEach((t, j) => {
        const sw = Math.max(110, t.replace("|", "").length * 9.4 + 24);
        s += `<g class="stp stp${j}" style="display:none"><g transform="translate(${p.sx || 0} ${p.sy || 0}) rotate(-10)">` + R(-sw / 2, -24, sw, 48, { fill: "rgba(255,255,255,.88)", stroke: p.stc || C.red, sw: 4, rx: 8 }) + T(0, 0, t, { sz: 17, fill: p.stc || C.red, w: 800 }) + `</g></g>`;
      });
      return s;
    },
    u(g, p, st) {
      const n = (p.lines || []).length || p.rows || 6, hl = st.hl || {}, sk = st.sk || [];
      for (let i = 0; i < n; i++) {
        paint(q(g, ".hl" + i), hl[i] ? HLC[hl[i]] : "transparent"); dash(q(g, ".sk" + i), sk.indexOf(i) >= 0 ? 0 : 1);
        const rw = q(g, ".rw" + i); if (rw) { rw.style.transition = (INST || RM()) ? "none" : "opacity .5s"; rw.style.opacity = st.rows == null || i < st.rows ? "1" : "0"; }
      }
      qa(g, ".stp").forEach((e, j) => { const on = st.stamp === j; if (on && e.style.display === "none") { shown(e, true); restart(e, "v2stampin"); } else shown(e, on); });
    },
    bb: p => [-(p.w || 160) / 2, -(p.h || 200) / 2, p.w || 160, p.h || 200]
  };
  // Rotating group with a symmetric invisible disc so CSS fill-box and GSAP 50% 50% both pivot on (0,0).
  const ROT = (cls, r, inner) => `<g class="v2m ${cls}">${CI(0, 0, r, { fill: "transparent" })}${inner}</g>`;
  K.clock = {
    b(p) {
      const r = p.r || 44, col = p.col || C.navy;
      let s = CI(0, 0, r, { fill: "#ffffff", stroke: col, sw: 5, cls: "v2c ckf" });
      s += `<circle class="v2d ckarc" cx="0" cy="0" r="${r * 0.42}" fill="none" stroke="${col}" stroke-width="${r * 0.84}" opacity=".2" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" transform="rotate(-90)"/>`;
      for (let t = 0; t < 12; t++) { const a = t * Math.PI / 6; s += PA(`M${((r - 9) * Math.sin(a)).toFixed(1)} ${(-(r - 9) * Math.cos(a)).toFixed(1)}L${((r - 3) * Math.sin(a)).toFixed(1)} ${(-(r - 3) * Math.cos(a)).toFixed(1)}`, { stroke: col, sw: t % 3 ? 2 : 3.5 }); }
      s += ROT("ckh", r - 4, PA(`M0 5V${-(r - 13)}`, { stroke: C.ink, sw: 5 }));
      s += `<g class="cks">${CI(0, 0, r - 6, { fill: "transparent" })}${PA(`M0 4V${-(r - 8)}`, { stroke: C.red, sw: 2 })}</g>` + CI(0, 0, 5, { fill: C.ink });
      return s + (p.lab ? LAB(0, r + 20, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) {
      const h = st.h || 0, c = st.st === "bad" ? C.red : st.st === "ok" ? C.green : st.st === "goal" ? C.gold : (p.col || C.navy);
      go(q(g, ".ckh"), { r: h * 360, d: 1.1, e: "soft" }); dash(q(g, ".ckarc"), 1 - clamp(h, 0, 1));
      paint(q(g, ".ckarc"), null, c); paint(q(g, ".ckf"), null, c);
      const sc = q(g, ".cks"); if (sc) { sc.classList.toggle("v2spin", !!st.run && st.on); shown(sc, !!st.run); }
    },
    bb: p => { const r = p.r || 44; return [-r, -r, 2 * r, 2 * r]; }
  };
  K.cal = {
    b(p) {
      const w = p.w || 104, h = p.h || 92, col = p.col || C.navy, x0 = -w / 2, y0 = -h / 2;
      let s = R(x0, y0, w, h, { fill: "#ffffff", stroke: col, sw: 3, rx: 10 }) + R(x0, y0, w, 24, { fill: col, rx: 10 }) + R(x0, y0 + 14, w, 10, { fill: col, rx: 0 });
      s += CI(x0 + 22, y0 + 2, 5, { fill: "#ffffff", stroke: col, sw: 2.5 }) + CI(-x0 - 22, y0 + 2, 5, { fill: "#ffffff", stroke: col, sw: 2.5 });
      const cw = (w - 20) / 5, ch = (h - 36) / 3;
      for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) s += R(x0 + 10 + c * cw + 2, y0 + 30 + r * ch + 2, cw - 4, ch - 4, { fill: C.pale, rx: 3, cls: `v2c cc cc${r * 5 + c}` });
      return s + (p.lab ? LAB(0, h / 2 + 18, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { qa(g, ".cc").forEach((e, i) => paint(e, i === (p.due == null ? 13 : p.due) && st.due ? C.red : i < (st.fill || 0) ? (p.col || C.navy) : C.pale)); },
    bb: p => [-(p.w || 104) / 2, -(p.h || 92) / 2, p.w || 104, p.h || 92]
  };
  K.days = {
    b(p) {
      const n = p.n || 21, cols = p.cols || 7, cw = p.cw || 44, gap = 6, rows = Math.ceil(n / cols), W2 = cols * cw + (cols - 1) * gap, H2 = rows * cw + (rows - 1) * gap;
      let s = "";
      for (let i = 0; i < n; i++) {
        const x = -W2 / 2 + (i % cols) * (cw + gap), y = -H2 / 2 + Math.floor(i / cols) * (cw + gap);
        s += R(x, y, cw, cw, { fill: C.pale, rx: 7, cls: `v2c dy dy${i}` });
      }
      s += `<g class="dyo">${R(-W2 / 2 - 7, -H2 / 2 - 7, W2 + 14, H2 + 14, { stroke: C.orange, sw: 4, rx: 12, dash: "10 6" })}</g>`;
      return s + (p.lab ? LAB(0, H2 / 2 + 22, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) {
      const n = p.n || 21, t0 = p.t0 || 0, t1 = p.t1 || 0;
      for (let i = 0; i < n; i++) {
        const team = i >= t0 && i < t1, show = i < (st.n == null ? n : st.n);
        paint(q(g, ".dy" + i), !show ? "transparent" : team && st.team ? C.navy : st.other && !team ? "#e9a48d" : st.all ? "#f4c9a0" : C.pale);
      }
      shown(q(g, ".dyo"), !!st.ring);
    },
    bb: p => { const cols = p.cols || 7, cw = p.cw || 44, rows = Math.ceil((p.n || 21) / cols); return [-(cols * cw + (cols - 1) * 6) / 2, -(rows * cw + (rows - 1) * 6) / 2, cols * cw + (cols - 1) * 6, rows * cw + (rows - 1) * 6]; }
  };
  K.coins = {
    b(p) {
      const n = p.n || 5; let s = "";
      for (let i = 0; i < n; i++) s += `<g class="cn cn${i}"><ellipse cx="0" cy="${-i * 7}" rx="24" ry="8" fill="${C.gold}" stroke="#8a6205" stroke-width="2"/></g>`;
      return s + (p.lab ? LAB(0, 26, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { const n = st.n == null ? (p.n || 5) : st.n; qa(g, ".cn").forEach((e, i) => { e.style.transition = "opacity .4s"; e.style.opacity = i < n ? "1" : "0"; }); },
    bb: p => [-26, -(p.n || 5) * 7 - 4, 52, (p.n || 5) * 7 + 14]
  };
  K.lock = {
    b(p) {
      const z = p.sz || 1.4;
      return `<g transform="scale(${z})"><g class="v2m shk">${PA("M-9 -3V-11a9 9 0 0 1 18 0V-3", { stroke: C.ink, sw: 4.5 })}</g>` +
        R(-14, -4, 28, 23, { fill: C.red, rx: 4, cls: "v2c lkb" }) + CI(0, 6, 3, { fill: "#ffffff" }) + `</g>` + (p.lab ? LAB(0, 23 * z + 16, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { const o = st.st === "open"; go(q(g, ".shk"), { y: o ? -7 : 0, r: o ? -18 : 0, to: "100% 100%" }); paint(q(g, ".lkb"), o ? C.green : C.red); },
    bb: p => { const z = p.sz || 1.4; return [-15 * z, -22 * z, 30 * z, 42 * z]; }
  };
  K.gate = {
    b(p) {
      const w = p.w || 160, col = p.col || C.ink;
      let s = R(-w / 2 - 8, -46, 16, 92, { fill: col, rx: 4 }) + R(w / 2 - 8, -46, 16, 92, { fill: col, rx: 4 });
      s += `<g class="v2m arm">` + R(-w / 2, -40, w, 18, { fill: "#ffffff", stroke: C.red, sw: 3, rx: 9, cls: "v2c armr" });
      for (let i = 0; i < Math.floor(w / 26); i++) s += R(-w / 2 + 8 + i * 26, -37, 12, 12, { fill: C.red, rx: 2, cls: "v2c armst" });
      s += `</g>` + `<g class="glk">${CI(0, 6, 20, { fill: C.red, cls: "v2c glkc" })}<g class="gl1">${ico("lock", 0, 6, 24, "#ffffff")}</g><g class="gl2">${ico("unlock", 0, 6, 24, "#ffffff")}</g></g>`;
      return s + (p.lab ? LAB(0, 66, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) {
      const o = st.st === "open";
      go(q(g, ".arm"), { r: o ? -72 : 0, to: "0% 50%", d: 0.9, e: o ? "back" : undefined });
      qa(g, ".armst").forEach(e => paint(e, o ? C.green : C.red)); paint(q(g, ".armr"), null, o ? C.green : C.red);
      paint(q(g, ".glkc"), o ? C.green : C.red); shown(q(g, ".gl1"), !o); shown(q(g, ".gl2"), o);
    },
    bb: p => [-(p.w || 160) / 2 - 8, -46, (p.w || 160) + 16, 92]
  };
  K.tank = {
    b(p) {
      const w = p.w || 110, h = p.h || 150, col = p.col || C.orange, x0 = -w / 2, y0 = -h / 2;
      let s = R(x0, y0, w, h, { fill: "#ffffff", stroke: C.ink, sw: 4, rx: 18 });
      s += `<rect class="v2m liq" x="${x0 + 8}" y="${y0 + 8}" width="${w - 16}" height="${h - 16}" rx="11" fill="${col}" opacity=".88"/>`;
      s += `<g class="tbub">` + [0, 1, 2].map(i => CI(x0 + 22 + i * (w - 44) / 2, h / 2 - 18, 4 + i, { fill: "#ffffff", op: 0.7, cls: `v2rise v2rise${i}` })).join("") + `</g>`;
      for (let i = 1; i < 4; i++) s += PA(`M${x0} ${y0 + i * h / 4}h12`, { stroke: C.ink, sw: 2.5 });
      s += PA(`M-26 ${y0 - 8}a26 26 0 0 1 52 0`, { stroke: C.ink, sw: 4, fill: "#ffffff" });
      s += `<g transform="translate(0 ${y0 - 8})">${ROT("ndl", 24, PA("M0 2V-21", { stroke: C.red, sw: 4 }))}${CI(0, 0, 4, { fill: C.ink })}</g>`;
      return s + (p.lab ? LAB(0, h / 2 + 20, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) {
      const lv = clamp(st.lv || 0, 0, 1);
      go(q(g, ".liq"), { sy: Math.max(0.02, lv), to: "50% 100%", d: 1.1, e: "soft" });
      go(q(g, ".ndl"), { r: -90 + lv * 180, d: 1.1, e: "elastic" });
      const b = q(g, ".tbub"); if (b) b.style.opacity = lv > 0.2 ? "1" : "0";
    },
    bb: p => [-(p.w || 110) / 2, -(p.h || 150) / 2 - 36, p.w || 110, (p.h || 150) + 36]
  };
  K.gauge = {
    b(p) {
      const r = p.r || 64, cols = [C.green, "#7aa64a", C.gold, C.orange, C.red], sw = r * 0.3;
      let s = "";
      for (let i = 0; i < 5; i++) {
        const a0 = Math.PI + i * Math.PI / 5 + 0.03, a1 = Math.PI + (i + 1) * Math.PI / 5 - 0.03;
        s += PA(`M${(r * Math.cos(a0)).toFixed(1)} ${(r * Math.sin(a0)).toFixed(1)}A${r} ${r} 0 0 1 ${(r * Math.cos(a1)).toFixed(1)} ${(r * Math.sin(a1)).toFixed(1)}`, { stroke: p.rev ? cols[4 - i] : cols[i], sw });
      }
      s += ROT("gn", r - 2, PA(`M0 6V${-(r - 10)}`, { stroke: C.ink, sw: 6 })) + CI(0, 0, 9, { fill: C.ink });
      return s + (p.lab ? LAB(0, 26, p.lab, { sz: p.ls || 15 }) : "");
    },
    u(g, p, st) { go(q(g, ".gn"), { r: -90 + clamp(st.lv || 0, 0, 1) * 180, d: 1.1, e: "elastic" }); },
    bb: p => { const r = p.r || 64; return [-r - 10, -r - 10, 2 * r + 20, r + 20]; }
  };
  K.bar = {
    b(p) {
      const w = p.w || 260, h = p.h || 26, x0 = -w / 2;
      return R(x0, -h / 2, w, h, { fill: C.pale, rx: h / 2 }) + `<rect class="v2m bf v2c" x="${x0}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${p.col || C.navy}"/>` +
        (p.lab ? LAB(x0, -h / 2 - 15, p.lab, { a: "start", sz: p.ls || 15 }) : "") + T(-x0, -h / 2 - 15, p.v || "", { a: "end", sz: p.ls || 15, cls: "bval", fill: p.col || C.navy });
    },
    u(g, p, st) {
      const f = q(g, ".bf"), c = st.st ? tone(st.st)[1] : (p.col || C.navy);
      go(f, { sx: Math.max(0.004, clamp((st.lv || 0) / (p.max || 1), 0, 1)), to: "0% 50%", d: 1, e: "soft" }); paint(f, c);
      const v = q(g, ".bval"); setLab(v, st.v != null ? st.v : (p.v || "")); paint(v, c);
    },
    bb: p => [-(p.w || 260) / 2, -(p.h || 26) / 2, p.w || 260, p.h || 26]
  };
  K.seg = {
    b(p) {
      const w = p.w || 360, h = p.h || 48, x0 = -w / 2, tot = p.segs.reduce((a, s) => a + s.v, 0);
      let s = R(x0, -h / 2, w, h, { fill: C.pale, rx: 8 }), cx = x0;
      p.segs.forEach((g, i) => {
        const sw = g.v / tot * w;
        s += `<rect class="v2m sg sg${i}" x="${(cx + 1).toFixed(1)}" y="${-h / 2}" width="${(sw - 2).toFixed(1)}" height="${h}" rx="7" fill="${g.col}"/>`;
        const lx = cx + sw / 2 + (g.dx || 0), ly = g.lp === "in" ? 0 : g.lp === "up" ? -h / 2 - 26 : h / 2 + 26;
        s += `<g class="sl sl${i}">` + (g.lp !== "in" ? PA(`M${(cx + sw / 2).toFixed(1)} ${g.lp === "up" ? -h / 2 - 2 : h / 2 + 2}L${lx.toFixed(1)} ${g.lp === "up" ? -h / 2 - 8 : h / 2 + 8}`, { stroke: g.col, sw: 2 }) : "") +
          T(lx, ly, g.lab, { sz: g.ls || 14, fill: g.lp === "in" ? "#ffffff" : g.col }) + `</g>`;
        g._x = cx; g._w = sw; cx += sw;
      });
      (p.brs || []).forEach(b => {
        const a = p.segs[b.from], z = p.segs[b.to], bx0 = a._x + 2, bx1 = z._x + z._w - 2, up = b.side === "up", y = up ? -h / 2 - b.off : h / 2 + b.off, d = up ? -1 : 1;
        s += `<g class="br br-${b.id}">` + PA(`M${bx0} ${y - d * 8}V${y}H${bx1}V${y - d * 8}M${(bx0 + bx1) / 2} ${y}v${d * 7}`, { stroke: b.col || C.ink, sw: 3 }) +
          T(clamp((bx0 + bx1) / 2, x0 + (b.lw || 70), -x0 - (b.lw || 70)), y + d * 22, b.lab, { sz: 15, fill: b.col || C.ink }) + `</g>`;
      });
      if (p.ghost) { const g = p.segs[p.ghost.seg]; s += `<g class="gh">` + R(g._x + 2, -h / 2 - 3, g._w * p.ghost.frac, h + 6, { fill: "rgba(255,255,255,.55)", stroke: C.ink, sw: 2.5, dash: "6 5", rx: 7 }) + `</g>`; }
      return s;
    },
    u(g, p, st) {
      const n = st.n == null ? p.segs.length : st.n, br = st.br || [];
      p.segs.forEach((s, i) => { go(q(g, ".sg" + i), { sx: i < n ? 1 : 0.005, to: "0% 50%", o: (st.dimx || []).indexOf(i) >= 0 ? 0.3 : 1, d: 0.9, e: "soft" }); const l = q(g, ".sl" + i); if (l) { l.style.transition = "opacity .5s"; l.style.opacity = i < n ? "1" : "0"; } });
      qa(g, ".br").forEach(e => { const id = e.getAttribute("class").split("br-")[1]; e.style.transition = "opacity .5s"; e.style.opacity = br.indexOf(id) >= 0 ? "1" : "0"; });
      const gh = q(g, ".gh"); if (gh) { gh.style.transition = "opacity .5s"; gh.style.opacity = st.ghost ? "1" : "0"; }
      qa(g, ".sg").forEach((e, i) => e.classList.toggle("v2pulse", st.pulse === i && st.on));
    },
    bb: p => [-(p.w || 360) / 2, -(p.h || 48) / 2, p.w || 360, p.h || 48]
  };
  function smooth(pts) {
    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], m = (a[0] + b[0]) / 2; d += ` C${m.toFixed(1)} ${a[1].toFixed(1)} ${m.toFixed(1)} ${b[1].toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`; }
    return d;
  }
  K.line = {
    b(p) {
      const w = p.w || 300, h = p.h || 160, x0 = -w / 2, y0 = -h / 2, N = p.pts.length;
      const pt = (v, i) => [x0 + 8 + i * (w - 16) / (N - 1), y0 + h - 8 - v * (h - 16)];
      p._P = p.pts.map(pt);
      let s = PA(`M${x0} ${y0}V${y0 + h}H${x0 + w}`, { stroke: "#a7b3bf", sw: 2.5 });
      if (p.xlab) s += T(0, y0 + h + 18, p.xlab, { sz: 14, fill: C.grey });
      if (p.base != null) { const by = pt(p.base, 0)[1]; s += `<g class="lbase">` + PA(`M${x0} ${by}H${x0 + w}`, { stroke: C.green, sw: 2.5, dash: "7 6" }) + T(x0 + w - 4, by - 14, p.baseLab || "Recorded baseline", { a: "end", sz: 14, fill: C.green }) + `</g>`; }
      if (p.pts2) s += PA(smooth(p.pts2.map(pt)), { stroke: C.grey, sw: 4, draw: 1, cls: "v2d ln2" }) + `<g class="l2l">${T(x0 + w - 4, pt(p.pts2[N - 1], N - 1)[1] + 18, p.lab2 || "", { a: "end", sz: 14, fill: C.grey })}</g>`;
      s += PA(smooth(p._P), { stroke: p.col || C.red, sw: 6, draw: 1, cls: "v2d ln" });
      (p.marks || []).forEach((m, j) => {
        const [px, py] = p._P[m.i], my = m.y != null ? m.y : y0 - 6, mx = clamp(px + (m.dx || 0), x0 + (m.w || 140) / 2, -x0 - (m.w || 140) / 2);
        s += `<g class="lmk lmk${j}">` + PA(`M${px} ${py - 9}L${mx} ${my + 17}`, { stroke: C.grey, sw: 1.8, dash: "4 4" }) + R(mx - (m.w || 140) / 2, my - 17, m.w || 140, 34, { fill: "#ffffff", stroke: m.col || C.navy, sw: 2.5, rx: 17 }) + T(mx, my, m.lab, { sz: 14, fill: m.col || C.navy }) + `</g>`;
      });
      s += `<g class="v2m ldot">${CI(0, 0, 9, { fill: p.col || C.red, stroke: "#ffffff", sw: 3 })}</g>`;
      return s;
    },
    u(g, p, st) {
      const dr = st.draw == null ? 1 : st.draw;
      dash(q(g, ".ln"), 1 - dr); dash(q(g, ".ln2"), 1 - (st.draw2 == null ? 0 : st.draw2));
      const l2 = q(g, ".l2l"); if (l2) l2.style.opacity = (st.draw2 || 0) > 0.95 ? "1" : "0";
      const lb = q(g, ".lbase"); if (lb) { lb.style.transition = "opacity .5s"; lb.style.opacity = st.base ? "1" : "0"; }
      qa(g, ".lmk").forEach((e, j) => { e.style.transition = "opacity .5s"; e.style.opacity = j < (st.mk || 0) ? "1" : "0"; });
      let pt = p._P[0];
      try { const ln = q(g, ".ln"), L = ln.getTotalLength(), P = ln.getPointAtLength(L * dr); pt = [P.x, P.y]; } catch (e) { pt = p._P[Math.round(dr * (p._P.length - 1))]; }
      go(q(g, ".ldot"), { x: pt[0], y: pt[1], o: dr > 0.02 ? 1 : 0, d: 1 });
    },
    bb: p => [-(p.w || 300) / 2, -(p.h || 160) / 2, p.w || 300, p.h || 160]
  };
  function tokens(d, n, kind, col, dur) {
    let s = "";
    for (let i = 0; i < n; i++) {
      const sh = kind === "coin" ? `<ellipse rx="8" ry="8" fill="${C.gold}" stroke="#8a6205" stroke-width="2"/>` : kind === "doc" ? `<rect x="-7" y="-9" width="14" height="18" rx="2" fill="#ffffff" stroke="${col}" stroke-width="2"/>` : kind === "mail" ? `<rect x="-9" y="-6" width="18" height="12" rx="2" fill="${col}"/>` : `<circle r="6" fill="${col}" stroke="#ffffff" stroke-width="2"/>`;
      s += `<g>${sh}<animateMotion dur="${dur}s" begin="${(-i * dur / n).toFixed(2)}s" repeatCount="indefinite" path="${d}"/></g>`;
    }
    return s;
  }
  K.link = {
    b(p) {
      const col = p.col || C.navy, d = p.d || `M${p.a[0]} ${p.a[1]}L${p.b[0]} ${p.b[1]}`;
      if (!p.d && !(p.a && p.b)) return "";
      let s = PA(d, { stroke: col, sw: p.sw || 4, draw: 1, cls: "v2d v2c lk" });
      let ah = p.ah;
      if (!ah && p.arrow && p.a && p.b) ah = [p.b[0], p.b[1], Math.atan2(p.b[1] - p.a[1], p.b[0] - p.a[0]) * 180 / Math.PI];
      if (ah) s += `<g class="lah" transform="translate(${ah[0]} ${ah[1]}) rotate(${ah[2]})">${PA("M-14 -9L1 0L-14 9Z", { fill: col, stroke: col, sw: 2, cls: "v2c lahp" })}</g>`;
      if (p.tok) s += `<g class="ltok">${tokens(d, p.tn || 3, p.tok, p.tc || col, p.dur || 2.4)}</g>`;
      const mid = p.mid || (p.a && p.b ? [(p.a[0] + p.b[0]) / 2, (p.a[1] + p.b[1]) / 2] : null);
      if (mid) s += `<g class="lx">${CI(mid[0], mid[1], 15, { fill: "#ffffff", stroke: C.red, sw: 3 })}${ico("x", mid[0], mid[1], 18, C.red)}</g>`;
      if (p.lab) s += LAB(p.lx || 0, p.ly || 0, p.lab, { sz: p.ls || 14, fill: col });
      return s;
    },
    u(g, p, st) {
      const dr = st.draw == null ? 1 : st.draw, c = st.st === "bad" ? C.red : st.st === "ok" ? C.green : st.st === "warn" ? C.orange : st.st === "off" ? "#a9b4bf" : (p.col || C.navy);
      const lk = q(g, ".lk"); dash(lk, 1 - dr); paint(lk, null, c, st.st === "bad" || st.brk ? "0.035 0.03" : "1");
      const ah = q(g, ".lah"); if (ah) { ah.style.transition = "opacity .3s .4s"; ah.style.opacity = dr > 0.98 ? "1" : "0"; paint(q(g, ".lahp"), c, c); }
      shown(q(g, ".ltok"), !!st.flow && st.on); shown(q(g, ".lx"), !!st.x);
    },
    bb: () => null
  };
  K.pill = {
    b(p) {
      const w = p.w || 170, h = p.h || 40, ic = p.ic ? 1 : 0;
      return `<g class="v2fit" data-pad="${ic ? 62 : 28}">` + R(-w / 2, -h / 2, w, h, { rx: p.rx == null ? Math.min(h / 2, 20) : p.rx, fill: "#ffffff", stroke: C.navy, sw: 2.5, cls: "v2c pr fitr" }) +
        (ic ? `<g class="pic">${ico(p.ic, -w / 2 + 22, 0, 22, C.navy)}</g>` : "") + LAB(ic ? 13 : 0, 0, p.lab, { sz: p.ls || 15, cls: "v2c pt fitt" }) + `</g>`;
    },
    u(g, p, st) {
      const t = tone(st.st || p.tone || "norm");
      paint(q(g, ".pr"), t[0], t[1], (st.st || p.tone) === "goal" ? "7 5" : "none"); paint(q(g, ".pt"), t[2]);
      const pc = q(g, ".pic"), key = t.join(); if (pc && pc._k !== key) { pc._k = key; pc.innerHTML = ico(p.ic, -(p.w || 170) / 2 + 22, 0, 22, t[2], t[0]); }
    },
    bb: p => [-(p.w || 170) / 2, -(p.h || 40) / 2, p.w || 170, p.h || 40]
  };
  K.card = {
    b(p) {
      const w = p.w || 170, h = p.h || 150, col = p.col || C.navy, x0 = -w / 2, y0 = -h / 2, ics = p.is || Math.min(54, h * 0.34);
      let f = R(x0, y0, w, h, { fill: "#ffffff", stroke: col, sw: 3.5, rx: 16, cls: "v2c cfr" }) + ico(p.ic || "q", 0, y0 + 14 + ics / 2, ics, col) + LAB(0, y0 + 30 + ics + (p.sub ? 6 : 14), p.lab, { sz: p.ls || 17, fill: col, mw: w - 16 });
      if (p.sub) f += T(0, h / 2 - 22, p.sub, { sz: 14, fill: C.ink, w: 600, cls: "csub", mw: w - 14 });
      let s = `<g class="v2m cf">${f}</g>`;
      if (p.back) s += `<g class="v2m cbk">` + R(x0, y0, w, h, { fill: p.bcol || col, rx: 16 }) + ico(p.bic || "check", 0, y0 + 14 + ics / 2, ics, "#ffffff") + T(0, y0 + 44 + ics, p.back, { sz: p.ls || 17, fill: "#ffffff" }) + `</g>`;
      return s;
    },
    u(g, p, st) {
      const fl = !!st.flip;
      if (p.back) { go(q(g, ".cf"), { sx: fl ? 0.01 : 1, o: fl ? 0 : 1, d: 0.35 }); go(q(g, ".cbk"), { sx: fl ? 1 : 0.01, o: fl ? 1 : 0, dl: fl ? 0.3 : 0, d: 0.4 }); }
      const t = st.st ? tone(st.st) : null; paint(q(g, ".cfr"), t ? (st.st === "bad" ? C.blush : st.st === "ok" ? C.mint : st.st === "off" ? "#f1f3f5" : "#ffffff") : "#ffffff", t ? t[1] : (p.col || C.navy));
    },
    bb: p => [-(p.w || 170) / 2, -(p.h || 150) / 2, p.w || 170, p.h || 150]
  };
  K.bubble = {
    b(p) {
      const w = p.w || 170, h = p.h || 42, t = p.tail || "b", x0 = -w / 2, y0 = -h / 2, tx = p.tx || 0, col = p.col || C.navy, fill = p.fill || "#ffffff";
      let tail = "", cover = "";
      if (t === "b") { tail = `M${tx - 9} ${h / 2 - 2}L${tx + 3} ${h / 2 + 13}L${tx + 9} ${h / 2 - 2}`; cover = R(tx - 8, h / 2 - 4, 16, 4, { fill, rx: 0 }); }
      if (t === "t") { tail = `M${tx - 9} ${y0 + 2}L${tx + 3} ${y0 - 13}L${tx + 9} ${y0 + 2}`; cover = R(tx - 8, y0, 16, 4, { fill, rx: 0 }); }
      if (t === "l") { tail = `M${x0 + 2} -8L${x0 - 13} 4L${x0 + 2} 8`; cover = R(x0, -7, 4, 14, { fill, rx: 0 }); }
      if (t === "r") { tail = `M${-x0 - 2} -8L${-x0 + 13} 4L${-x0 - 2} 8`; cover = R(-x0 - 4, -7, 4, 14, { fill, rx: 0 }); }
      return `<g class="v2fit" data-pad="26">` + (tail ? PA(tail, { fill, stroke: col, sw: 2.5 }) : "") + R(x0, y0, w, h, { fill, stroke: col, sw: 2.5, rx: 14, cls: "fitr" }) + cover + LAB(0, 0, p.lab, { sz: p.ls || 15, fill: p.tc || col, cls: "fitt" }) + `</g>`;
    },
    bb: p => [-(p.w || 170) / 2, -(p.h || 42) / 2, p.w || 170, p.h || 42]
  };
  K.stamp = {
    hs: 1.7,
    b(p) {
      const w = p.w || Math.max(120, p.lab.replace("|", " ").length * 10 + 26), h = p.h || (p.lab.indexOf("|") >= 0 ? 62 : 46), col = p.col || C.red;
      return `<g transform="rotate(${p.r == null ? -8 : p.r})"><g class="v2fit" data-pad="30">` + R(-w / 2, -h / 2, w, h, { fill: "rgba(255,255,255,.9)", stroke: col, sw: 4.5, rx: 9, cls: "fitr" }) + LAB(0, 0, p.lab, { sz: p.ls || 18, fill: col, w: 800, cls: "fitt" }) + `</g></g>`;
    },
    bb: p => { const w = p.w || Math.max(120, p.lab.length * 10 + 26); return [-w / 2, -26, w, 52]; }
  };
  K.bolt = {
    hs: 2.2,
    b(p) { const z = (p.sz || 70) / 24; return `<g class="bf2"><g transform="scale(${z.toFixed(3)}) translate(-12 -12)"><path d="M13.5 1.5L4 14h7l-1.5 8.5L20 9.5h-7z" fill="${p.col || C.gold}" stroke="${C.ink}" stroke-width="1.2" stroke-linejoin="round"/></g></g>` + (p.lab ? LAB(0, (p.sz || 70) / 2 + 18, p.lab, { sz: p.ls || 15, fill: C.orange }) : ""); },
    u(g, p, st) { const b = q(g, ".bf2"); if (b) b.classList.toggle("v2flash", !!st.on); },
    bb: p => { const s = p.sz || 70; return [-s / 2, -s / 2, s, s]; }
  };
  K.icon = {
    b(p) { const s = p.sz || 40; return (p.disc ? CI(0, 0, s * 0.72, { fill: p.disc, cls: "v2c idisc" }) : "") + `<g class="ig">${ico(p.ic, 0, 0, s, p.col || C.navy)}</g>` + (p.lab ? LAB(0, s * (p.disc ? 0.72 : 0.5) + 18, p.lab, { sz: p.ls || 15, fill: p.lc || C.ink }) : ""); },
    u(g, p, st) { const ig = q(g, ".ig"); if (ig) ig.classList.toggle(p.idle || "x", !!st.on && !!p.idle); },
    bb: p => { const s = (p.sz || 40) * (p.disc ? 1.44 : 1); return [-s / 2, -s / 2, s, s]; }
  };
  K.text = {
    b(p) { return LAB(0, 0, p.lab, { sz: p.sz || 24, fill: p.col || C.navy, w: 800 }); },
    bb: () => null
  };
  K.bracket = {
    b(p) {
      const w = p.w || 200, up = p.side === "up", d = up ? -1 : 1, col = p.col || C.ink;
      return PA(`M${-w / 2} ${-d * 8}V0H${w / 2}V${-d * 8}M0 0v${d * 8}`, { stroke: col, sw: 3 }) + LAB(0, d * 26, p.lab, { sz: p.ls || 15, fill: col });
    },
    bb: () => null
  };
  K.panel = {
    b(p) {
      const w = p.w || 120, h = p.h || 200, col = p.col || C.navy;
      return R(-w / 2, -h / 2, w, h, { fill: p.fill || "#f1f5f9", stroke: p.stroke || "none", sw: 2.5, rx: p.rx == null ? 16 : p.rx, dash: p.dash, cls: "v2c pbg" }) +
        (p.lab ? R(-w / 2 + 8, -h / 2 + 8, w - 16, p.th || (String(p.lab).indexOf("|") >= 0 ? 40 : 30), { fill: col, rx: 10 }) + LAB(0, -h / 2 + 8 + (p.th || (String(p.lab).indexOf("|") >= 0 ? 40 : 30)) / 2, p.lab, { sz: p.ls || 14, fill: "#ffffff" }) : "");
    },
    u(g, p, st) { if (st.st) { const t = tone(st.st); paint(q(g, ".pbg"), st.st === "ok" ? C.mint : st.st === "bad" ? C.blush : st.st === "goal" ? "#fff7e3" : (p.fill || "#f1f5f9"), t[1]); } },
    bb: () => null
  };
  K.screen = {
    b(p) {
      const w = p.w || 250, h = p.h || 170;
      return R(-w / 2, -h / 2, w, h, { fill: "#ffffff", stroke: C.ink, sw: 4, rx: 12 }) + R(-w / 2, -h / 2, w, 30, { fill: C.ink, rx: 12 }) + R(-w / 2, -h / 2 + 18, w, 12, { fill: C.ink, rx: 0 }) +
        CI(-w / 2 + 16, -h / 2 + 15, 4, { fill: C.red }) + CI(-w / 2 + 30, -h / 2 + 15, 4, { fill: C.gold }) + LAB(10, -h / 2 + 15, p.lab || "", { sz: 14, fill: "#ffffff" }) +
        PA(`M-18 ${h / 2}l-8 18h52l-8-18`, { fill: C.ink, stroke: C.ink, sw: 2 });
    },
    bb: p => [-(p.w || 250) / 2, -(p.h || 170) / 2, p.w || 250, (p.h || 170) + 18]
  };
  K.tile = {
    b(p) {
      const w = p.w || 170, h = p.h || 112;
      return R(-w / 2, -h / 2, w, h, { fill: "#ffffff", stroke: C.green, sw: 3, rx: 14, cls: "v2c tbx" }) + LAB(-w / 2 + 12, -h / 2 + 20, p.lab, { a: "start", sz: p.ls || 14, mw: w - 50 }) +
        `<g class="tic">${badge(w / 2 - 18, -h / 2 + 20)}</g>` + T(0, 12, p.v || "", { sz: p.vs || 25, w: 800, cls: "tval", fill: C.green, mw: w - 16 }) + (p.unit ? T(0, h / 2 - 16, p.unit, { sz: 13, fill: C.grey, cls: "tun" }) : "");
    },
    u(g, p, st) {
      const k = st.st || p.tone || "ok", c = BADGEC[k] || C.navy;
      paint(q(g, ".tbx"), k === "bad" ? C.blush : k === "ok" ? "#f3fbf7" : "#ffffff", c); paint(q(g, ".tval"), c); setBadge(g, k);
      setLab(q(g, ".tval"), st.v != null ? st.v : (p.v || ""));
    },
    bb: p => [-(p.w || 170) / 2, -(p.h || 112) / 2, p.w || 170, p.h || 112]
  };
  K.badge = {
    b(p) { return badge(0, 0) + (p.lab ? LAB(0, 28, p.lab, { sz: p.ls || 14 }) : ""); },
    u(g, p, st) { setBadge(g, st.st || p.tone || "ok"); const b = q(g, ".bdgg"); if (b) b.setAttribute("transform", `scale(${(p.sz || 1.6)})`); },
    bb: () => [-14, -14, 28, 28]
  };
  K.desk = {
    b(p) {
      const col = p.col || C.navy;
      return PA("M-70 -10H70L60 34H-60Z", { fill: col, stroke: col, sw: 2 }) + R(-78, -22, 156, 14, { fill: C.ink, rx: 5 }) + ico("bell", 40, -34, 24, C.gold) + T(-14, 12, p.lab || "Reception desk", { sz: 14, fill: "#ffffff", cls: "lab" });
    },
    bb: () => [-78, -46, 156, 80]
  };
  K.crack = {
    b(p) { return PA(p.d || "M-30 -30l12 14-8 10 14 12-6 14 12 10", { stroke: C.red, sw: 4, draw: 1, cls: "v2d ckp" }); },
    u(g, p, st) { dash(q(g, ".ckp"), st.on ? 0 : 1); },
    bb: () => null
  };
  K.table = {
    b(p) {
      let s = `<ellipse cx="0" cy="8" rx="${p.rx || 120}" ry="30" fill="${C.navy}" stroke="${C.ink}" stroke-width="3"/>` + T(0, 8, p.lab || "Qasr board", { sz: 15, fill: "#ffffff", cls: "lab" });
      const seats = [[-92, -26], [-46, -36], [0, -40], [46, -36], [92, -26]];
      seats.forEach(([x, y], i) => {
        s += `<g class="seat">` + PA(`M${x - 15} ${y + 22}c0-11 6-16 15-16s15 5 15 16z`, { fill: [C.plum, C.teal, C.navy, C.gold, C.green][i] }) + CI(x, y - 2, 10, { fill: i % 2 ? C.skin2 : C.skin }) + `</g>`;
        s += `<g class="vt vt${i}">${CI(x, y - 30, 11, { fill: C.green, cls: "v2c vtc" })}<g class="vy">${ico("check", x, y - 30, 14, "#fff")}</g><g class="vn">${ico("x", x, y - 30, 14, "#fff")}</g><g class="vq">${ico("q", x, y - 30, 22, C.plum)}</g></g>`;
      });
      return s;
    },
    u(g, p, st) {
      const v = st.vote || "none";
      qa(g, ".vt").forEach(e => { shown(e, v !== "none"); shown(q(e, ".vy"), v === "yes"); shown(q(e, ".vn"), v === "no"); shown(q(e, ".vq"), v === "wait"); paint(q(e, ".vtc"), v === "yes" ? C.green : v === "no" ? C.red : "transparent"); });
    },
    bb: p => [-(p.rx || 120), -50, 2 * (p.rx || 120), 90]
  };
  K.grid14 = {
    b(p) {
      const P = [], dy = p.dy || 62; for (let r = 0; r < 2; r++) for (let c = 0; c < 7; c++) P.push([-156 + c * 52, r ? dy : -dy]);
      p._P = P;
      let s = "";
      P.forEach(([x, y], i) => {
        s += PA(`M0 0L${x} ${y}`, { stroke: C.navy, sw: 2.5, draw: 1, cls: `v2d gl gl${i}` });
        s += `<g class="gm gm${i}">` + PA(`M${x} ${y}L${x + 20} ${y + (y < 0 ? -26 : 26)}`, { stroke: C.orange, sw: 2.5 }) + R(x + 12, y + (y < 0 ? -40 : 18), 16, 16, { fill: C.orange, rx: 3 }) + `</g>`;
      });
      s += `<g class="hub">${CI(0, 0, 36, { fill: C.navy, stroke: "#ffffff", sw: 3 })}${T(0, 0, p.hub || "Group|owner", { sz: 13, fill: "#ffffff", cls: "lab" })}</g>`;
      P.forEach(([x, y], i) => {
        s += `<g class="ht ht${i}"><g class="hti">` + ico("hotel", x, y, 34, C.navy) + `</g>` + `<g class="hch">${CI(x + 15, y - 17, 7, { fill: C.orange, stroke: "#fff", sw: 2 })}</g>` +
          `<g class="hx">${ico("x", x, y, 30, C.red)}</g><g class="hs">${CI(x, y, 24, { stroke: C.gold, sw: 3.5 })}</g></g>`;
      });
      return s;
    },
    u(g, p, st) {
      const DR = [C.navy, C.gold, C.plum, C.orange, C.teal];
      p._P.forEach((xy, i) => {
        const ht = q(g, ".ht" + i), hi = q(ht, ".hti");
        qa(hi, "[fill]").forEach(e => { if (e.getAttribute("fill") !== "#fff") e.setAttribute("fill", st.std ? C.green : st.drift ? DR[(i * 3) % 5] : C.navy); });
        go(hi, { r: st.drift && !st.std ? ((i * 37) % 21) - 10 : 0, d: 0.8 });
        shown(q(ht, ".hch"), !!st.champ); shown(q(ht, ".hx"), !!st.fail && i !== st.pilot); shown(q(ht, ".hs"), st.pilot === i);
        const l = q(g, ".gl" + i); dash(l, st.links ? 0 : 1); paint(l, null, st.gm ? C.red : st.std ? C.green : C.navy, st.gm ? "0.06 0.05" : "1");
        shown(q(g, ".gm" + i), !!st.gm);
      });
      shown(q(g, ".hub"), !!st.hub);
    },
    bb: p => [-180, -(p.dy || 62) - 22, 360, 2 * (p.dy || 62) + 44]
  };

  // ---------- generic prop update ----------
  function upd(el, p, st) {
    const k = K[p.k], pm = q(el, ".pm"), prev = el._st || { on: 0 }, on = !!st.on, was = !!prev.on;
    const tx = (st.x == null ? p.x : st.x) - p.x, ty = (st.y == null ? p.y : st.y) - p.y;
    const tgt = { o: on ? (st.dim ? 0.28 : (st.o == null ? 1 : st.o)) : 0, x: tx, y: ty, r: st.r || 0, s: on ? (st.s == null ? 1 : st.s) * (st.hot ? 1.045 : 1) : (k.hs || 0.82), d: st.d };
    if (on && !was && !INST && !RM()) {
      const keep = INST; INST = true; go(pm, { o: 0, x: tx, y: ty + (k.hs ? 0 : 12), r: tgt.r, s: k.hs || 0.82 }); INST = keep; reflow(pm);
      tgt.e = k.hs ? "back" : "back"; tgt.d = st.d || (k.hs ? 0.55 : 0.75);
    } else if (!on && was) { tgt.d = 0.35; }
    go(pm, tgt);
    const h = q(el, ".v2halo"); if (h) shown(h, on && !!st.hot);
    if (st.lab != null && q(el, ".lab") && q(el, ".lab")._s !== st.lab) { setLab(q(el, ".lab"), st.lab); const fg = q(el, ".v2fit"); if (fg) fitOne(fg); }
    if (k.u) k.u(el, p, st, prev);
    el._st = st;
  }

  // Widen pill / bubble / stamp frames when the host font renders a label wider than designed.
  // Host-font safety: frames grow to fit their label but never past the stage; if there is no room,
  // the label shrinks instead. Free labels that would cross the stage edge also shrink to fit.
  const baseX = el => { const p = el && el.closest ? el.closest(".v2p") : null, m = p ? /translate\(([-\d.]+)/.exec(p.getAttribute("transform") || "") : null; return m ? +m[1] : 200; };
  const textW = t => { let w = 0; try { qa(t, "tspan").forEach(sp => { w = Math.max(w, sp.getComputedTextLength()); }); } catch (e) { w = 0; } return w; };
  function shrink(t, f) { const s0 = +(t.getAttribute("data-fs0") || t.getAttribute("font-size")); t.setAttribute("data-fs0", s0); t.setAttribute("font-size", Math.max(11, Math.floor(s0 * f * 10) / 10)); }
  function fitAll(root) {
    qa(root, ".v2fit").forEach(fitOne);
    qa(root, ".v2p").forEach(p => {
      const px = baseX(p);
      qa(p, "text.v2t").forEach(t => {
        if (t.closest(".v2fit")) return;
        let bb = null; try { bb = t.getBBox(); } catch (e) { bb = null; }
        if (!bb || !bb.width) return;
        const mw = +(t.getAttribute("data-mw") || 0);
        if (mw && bb.width > mw) { shrink(t, mw / bb.width); try { bb = t.getBBox(); } catch (e) { return; } }
        const pmx = px + bb.x, pmr = px + bb.x + bb.width;
        if (pmx >= 9 && pmr <= 391) return;
        const a = t.getAttribute("text-anchor"), tx = px + (+t.getAttribute("x") || 0);
        const room = a === "start" ? 391 - tx : a === "end" ? tx - 9 : 2 * Math.min(tx - 9, 391 - tx);
        if (room > 20) shrink(t, room / bb.width);
      });
    });
  }
  function fitOne(g) {
    const r = q(g, ".fitr"), t = q(g, ".fitt"); if (!r || !t) return;
    if (t.getAttribute("data-fs0")) t.setAttribute("font-size", t.getAttribute("data-fs0"));
    const w = textW(t);
    if (r._w0 == null) { r._w0 = +r.getAttribute("width"); r._x0 = +r.getAttribute("x"); }
    const pad = +(g.getAttribute("data-pad") || 26), rw = r._w0, px = baseX(g), cx = r._x0 + rw / 2;
    const maxW = Math.max(rw, 2 * Math.min(px + cx - 9, 391 - px - cx));
    let nw = rw;
    if (w && w + pad > rw) { nw = Math.min(Math.ceil(w + pad), maxW); if (w + pad > nw) shrink(t, (nw - pad) / w); }
    const dx = (nw - rw) / 2;
    r.setAttribute("x", r._x0 - dx); r.setAttribute("width", nw);
    const ic = q(g, ".pic"); if (ic) ic.setAttribute("transform", `translate(${-dx} 0)`);
  }
  // ---------- scene engine ----------
  // A(bench, props, beats): one act = one visual, adapted from the named benchmark.
  const A = (bench, props, beats) => ({ bench, props, beats });
  const P = (id, k, x, y, o) => Object.assign({ id, k, x, y }, o || {});
  const L = (id, a, b, o) => Object.assign({ id, k: "link", x: 0, y: 0, a, b }, o || {});
  function scene(id, acts) {
    let at = 0;
    acts.forEach(a => { a.at = at; at += a.beats.length; });
    const N = at, st = { root: null, cur: -1, last: -1 };
    acts.forEach(a => {
      const cur = {}, ids = {};
      a.props.forEach(p => { ids[p.id] = p; cur[p.id] = Object.assign({ on: p.on ? 1 : 0 }, p.st || {}); });
      a.S = a.beats.map(b => {
        (b.on || []).forEach(i => { if (cur[i]) cur[i].on = 1; });
        (b.off || []).forEach(i => { if (cur[i]) cur[i].on = 0; });
        Object.keys(b.s || {}).forEach(i => { if (!cur[i]) return; const o = Object.assign({}, b.s[i]); delete o.hot; Object.assign(cur[i], o); });
        const snap = {};
        Object.keys(cur).forEach(i => { snap[i] = Object.assign({}, cur[i]); delete snap[i].hot; });
        (b.hot || []).forEach(i => { if (snap[i]) snap[i].hot = 1; });
        Object.keys(b.s || {}).forEach(i => { if (snap[i] && b.s[i].hot) snap[i].hot = 1; });
        return snap;
      });
    });
    const dotX = j => 392 - (acts.length - 1 - j) * 9;
    function markup() {
      let h = `<svg viewBox="0 0 400 380" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(acts[0].beats[0].t)}" focusable="false">`;
      h += R(1, 1, 398, 378, { fill: C.paper, rx: 20, stroke: "#e7dfcd", sw: 2 });
      h += `<g class="v2chip">` + R(8, 9, 200, 36, { fill: C.navy, rx: 18, cls: "v2chipbg" }) + CI(27, 27, 6, { fill: C.orange, cls: "v2beat" }) +
        `<text class="v2t v2tag" x="40" y="27" font-size="16" font-weight="800" fill="#ffffff" dominant-baseline="central"></text></g>`;
      acts.forEach((a, j) => { h += CI(dotX(j), 27, 3.6, { fill: "#c9d2db", cls: `v2dot v2dot${j}` }); });
      acts.forEach((a, j) => {
        h += `<g class="v2m v2act v2act${j}" data-bench="${esc(a.bench)}" style="opacity:0">`;
        a.props.forEach(p => {
          const k = K[p.k], bb = k.bb ? k.bb(p) : null;
          const halo = bb ? R(bb[0] - 7, bb[1] - 7, bb[2] + 14, bb[3] + 14, { stroke: C.orange, sw: 3, dash: "8 6", rx: 14, cls: "v2halo" }) : "";
          h += `<g class="v2p" data-id="${p.id}" transform="translate(${p.x || 0} ${p.y || 0})"><g class="v2m pm">${halo}${k.b(p)}</g></g>`;
        });
        h += `</g>`;
      });
      h += `<g class="v2rip" style="display:none"><circle class="v2ripc" cx="0" cy="0" r="26" fill="none" stroke="${C.orange}" stroke-width="3.5"/></g>`;
      return h + `</svg>`;
    }
    const els = j => st.root ? qa(q(st.root, ".v2act" + j), ".v2p") : [];
    function setTag(t) {
      const tx = q(st.root, ".v2tag"), bg = q(st.root, ".v2chipbg");
      if (!tx || tx.textContent === t) return;
      tx.textContent = t;
      let w = 0; try { w = tx.getComputedTextLength(); } catch (e) { w = 0; }
      tx.setAttribute("font-size", "16");
      try { w = tx.getComputedTextLength(); } catch (e) { w = 0; }
      if (w > 254) { tx.setAttribute("font-size", String(Math.max(12.5, Math.floor(16 * 254 / w * 10) / 10))); try { w = tx.getComputedTextLength(); } catch (e) { w = 254; } }
      if (!w) w = t.length * 9.2;
      if (bg) bg.setAttribute("width", clamp(Math.ceil(w) + 46, 120, 300));
      restart(tx, "v2tagin");
      const sv = q(st.root, "svg"); if (sv) sv.setAttribute("aria-label", t);
    }
    function ripple(f) {
      const g = q(st.root, ".v2rip");
      if (!g) return;
      if (!f || INST || RM()) { shown(g, false); return; }
      g.setAttribute("transform", `translate(${f[0].toFixed(1)} ${f[1].toFixed(1)})`); shown(g, true); restart(g, "v2ripon");
    }
    function render(i, inst) {
      const r = st.root; if (!r) return;
      const ii = clamp(Math.floor(+i) || 0, 0, N - 1);
      let a = 0; for (let j = 0; j < acts.length; j++) if (acts[j].at <= ii) a = j;
      const k = ii - acts[a].at, act = acts[a], beat = act.beats[k];
      INST = !!inst || RM();
      r.classList.toggle("v2inst", INST);
      if (a !== st.cur) {
        acts.forEach((x, j) => {
          const g = q(r, ".v2act" + j); if (!g) return;
          if (j === a) { g.removeAttribute("aria-hidden"); go(g, { o: 1, x: 0, d: 0.6 }); }
          else { g.setAttribute("aria-hidden", "true"); go(g, { o: 0, x: j < a ? -24 : 24, d: 0.35 }); }
        });
        st.cur = a;
      }
      acts.forEach((x, j) => { const dn = q(r, ".v2dot" + j); if (dn) { dn.style.fill = j === a ? C.orange : j < a ? C.navy : "#c9d2db"; dn.setAttribute("r", j === a ? 5.2 : 3.6); } });
      const S = act.S[k];
      els(a).forEach((el, n) => upd(el, act.props[n], S[act.props[n].id]));
      setTag(beat.t);
      let fid = beat.f || (beat.hot && beat.hot[0]) || Object.keys(beat.s || {}).filter(x => beat.s[x].hot)[0] || (beat.on && beat.on[beat.on.length - 1]);
      const fp = fid ? act.props.filter(p => p.id === fid)[0] : null;
      ripple(fp ? [S[fid].x == null ? fp.x : S[fid].x, (S[fid].y == null ? fp.y : S[fid].y) + (fp.fy || 0)] : null);
      st.last = ii;
      INST = false;
      if (inst) { reflow(r); r.classList.remove("v2inst"); }
    }
    return {
      _qa: { N, acts: acts.length, tags: acts.reduce((x, a) => x.concat(a.beats.map(b => b.t)), []), bench: acts.map(a => a.bench) },
      build(el) {
        if (!el) return;
        addStyle();
        const root = document.createElement("div");
        root.className = `vls-w02-${id} v2root` + (W.gsap && typeof W.gsap.to === "function" ? " v2gs" : "");
        root.innerHTML = markup();
        if (typeof el.replaceChildren === "function") el.replaceChildren(root); else { el.innerHTML = ""; el.appendChild(root); }
        st.root = root; st.cur = -1; st.last = -1;
        fitAll(root);
        const sv = q(root, "svg"); if (RM() && sv && sv.pauseAnimations) sv.pauseAnimations();
        INST = true;
        acts.forEach((a, j) => els(j).forEach((e, n) => { e._st = null; upd(e, a.props[n], { on: 0 }); e._st = { on: 0 }; }));
        INST = false;
        render(0, true);
      },
      step(i) { render(i, false); },
      reset() {
        if (!st.root) return;
        if (W.gsap && typeof W.gsap.killTweensOf === "function") W.gsap.killTweensOf(st.root.querySelectorAll("*"));
        INST = true;
        acts.forEach((a, j) => { els(j).forEach((e, n) => { upd(e, a.props[n], { on: 0 }); e._st = { on: 0 }; }); const g = q(st.root, ".v2act" + j); if (g) go(g, { o: 0, x: 24 }); });
        INST = false;
        st.cur = -1;
        render(0, true);
      }
    };
  }


  // ---------- scoped CSS (appended once to the shared <style id="vl-sc-w02">) ----------
  const SEL = s => SECS.map(id => `.vls-w02-${id}${s}`).join(",");
  const CSS = [
    "/* w02-claude-v2-part4 */",
    `${SEL("")}{position:relative;display:block;width:100%;height:100%;min-height:0;overflow:hidden;box-sizing:border-box;color:#17283a;-webkit-user-select:none;user-select:none}`,
    `${SEL(" svg")}{display:block;width:100%;height:100%;max-height:100%;overflow:hidden}`,
    `${SEL(" .v2t")}{font-family:inherit;letter-spacing:.1px}`,
    `${SEL(" .v2m")}{transform-box:fill-box;transform-origin:50% 50%;transition-property:transform,opacity;transition-duration:.7s;transition-timing-function:cubic-bezier(.2,.8,.2,1)}`,
    `${SEL(".v2gs .v2m")}{transform-box:view-box;transform-origin:0 0;transition:none}`,
    `${SEL(" .v2c")}{transition:fill .5s ease,stroke .5s ease}`,
    `${SEL(" .v2d")}{transition:stroke-dashoffset .9s cubic-bezier(.4,0,.2,1),stroke .5s ease}`,
    `${SEL(".v2inst *")}{transition:none!important}`,
    `${SEL(" .v2halo")}{animation:v2halo 1.3s ease-in-out infinite}`,
    `${SEL(" .v2bob")}{transform-box:fill-box;transform-origin:50% 100%;animation:v2bob 1.05s ease-in-out infinite}`,
    `${SEL(" .v2spin")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2spin 2.2s linear infinite}`,
    `${SEL(" .v2spinslow")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2spin 6s linear infinite}`,
    `${SEL(" .v2float")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2float 2.2s ease-in-out infinite}`,
    `${SEL(" .v2flash")}{animation:v2flash 1.1s ease-in-out infinite}`,
    `${SEL(" .v2shake")}{transform-box:fill-box;transform-origin:50% 100%;animation:v2shake .7s ease-in-out infinite}`,
    `${SEL(" .v2pulse")}{animation:v2pul 1.1s ease-in-out infinite}`,
    `${SEL(" .v2rise")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2rise 2.4s ease-in infinite}`,
    `${SEL(" .v2rise1")}{animation-delay:.8s}`, `${SEL(" .v2rise2")}{animation-delay:1.6s}`,
    `${SEL(" .v2beat")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2beat 1.6s ease-in-out infinite}`,
    `${SEL(" .v2tagin")}{animation:v2tagin .45s ease-out}`,
    `${SEL(" .v2ripc")}{transform-box:fill-box;transform-origin:50% 50%;opacity:0}`,
    `${SEL(" .v2ripon .v2ripc")}{animation:v2rip .9s ease-out forwards}`,
    `${SEL(" .v2stampin")}{transform-box:fill-box;transform-origin:50% 50%;animation:v2stamp .55s cubic-bezier(.34,1.56,.64,1)}`,
    "@keyframes v2halo{0%,100%{opacity:.35}50%{opacity:1}}",
    "@keyframes v2bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}",
    "@keyframes v2spin{to{transform:rotate(360deg)}}",
    "@keyframes v2float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}",
    "@keyframes v2flash{0%,100%{opacity:1}50%{opacity:.55}}",
    "@keyframes v2shake{0%,100%{transform:rotate(0)}25%{transform:rotate(-1.6deg)}75%{transform:rotate(1.6deg)}}",
    "@keyframes v2pul{0%,100%{stroke:transparent;stroke-width:0}50%{stroke:#ffffff;stroke-width:5}}",
    "@keyframes v2rise{0%{transform:translateY(0);opacity:0}20%{opacity:.8}100%{transform:translateY(-70px);opacity:0}}",
    "@keyframes v2beat{0%,100%{transform:scale(1)}50%{transform:scale(1.45)}}",
    "@keyframes v2tagin{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}",
    "@keyframes v2rip{0%{opacity:.9;transform:scale(.35)}100%{opacity:0;transform:scale(1.9)}}",
    "@keyframes v2stamp{0%{opacity:0;transform:scale(1.9)}100%{opacity:1;transform:scale(1)}}",
    `@media (prefers-reduced-motion:reduce){${SEL(" *")}{animation:none!important;transition:none!important}}`
  ].join("\n");
  function addStyle() {
    if (typeof document === "undefined") return;
    let s = document.getElementById("vl-sc-w02");
    if (!s) { s = document.createElement("style"); s.id = "vl-sc-w02"; (document.head || document.documentElement).appendChild(s); }
    if (s.textContent.indexOf("/* w02-claude-v2-part4 */") < 0) s.appendChild(document.createTextNode(CSS));
  }
  addStyle();

  // =====================================================================
  // W2O4a Â· Questions that expose an incomplete brief â€” 30 moments, 9 acts
  // (audit: second-lowest score 3.8/10, rebuilt with priority)
  // =====================================================================
  W.VL_SCENES["W2O4a"] = scene("W2O4a", [
    // Act 1 (moments 0-3). Benchmark Part1 #059 "SVGator UI templates" (flip card)
    // https://www.svgator.com/animation-templates/ui-elements
    // Adapted: a card is handed over and turned to show its content â€” and the side that is missing.
    A("P1#059", [
      P("bd", "pill", 200, 76, { w: 236, h: 36, lab: "Board has approved", ic: "seal", tone: "ok", ls: 14 }),
      P("ad", "person", 70, 222, { sz: 1.2, col: C.navy, lab: "You, the|adviser", ls: 13 }),
      P("dr", "person", 326, 222, { sz: 1.2, col: C.plum, mood: "happy", lab: "Programme|director", ls: 13 }),
      P("br", "doc", 290, 214, { w: 172, h: 232, title: "Digital|transformation", ts: 13, lines: ["Better efficiency", "Guest satisfaction", "Modern systems", "Something missing"], ls: 13 })
    ], [
      { t: "You join as adviser", on: ["bd", "ad"], hot: ["ad"] },
      { t: "Welcomed, handed a brief", on: ["dr", "br"], s: { br: { rows: 0, x: 200, d: 1.4 }, ad: { mood: "happy" } }, hot: ["br"] },
      { t: "Three attractive promises", s: { br: { rows: 3, hl: { 0: "g", 1: "g", 2: "g" } } }, hot: ["br"] },
      { t: "Something is missing", s: { br: { rows: 4, hl: { 0: "g", 1: "g", 2: "g", 3: "r" } }, ad: { mood: "worry" } }, hot: ["br"] }
    ]),
    // Act 2 (moments 4-7). Benchmark Part2 #088 "Automated Workflows"
    // https://lottiefiles.com/free-animation/automated-workflows-XR2hxXOdEK
    // Adapted: repeated actions run but never complete â€” drivers cycle while the commitment gate stays shut.
    A("P2#088", [
      P("br", "doc", 104, 204, { w: 184, h: 236, title: "The brief", lines: ["Better efficiency", "Guest satisfaction", "Modern systems", "Why now? Absent"], ls: 13 }),
      P("mg", "icon", 168, 300, { ic: "search", sz: 44, col: C.plum, idle: "v2float" }),
      P("pg", "pill", 300, 96, { w: 168, h: 36, lab: "The programme", tone: "solid", ls: 14 }),
      L("f1", [270, 114], [262, 170], { col: C.green, sw: 4, arrow: 1, tok: "dot", tc: C.green, tn: 2 }),
      L("f2", [330, 114], [338, 240], { col: C.red, sw: 4, brk: 1, mid: [334, 178] }),
      P("wi", "pill", 262, 192, { w: 160, h: 46, lab: "Worthwhile|improvements", tone: "mint", ls: 13 }),
      P("fo", "pill", 316, 268, { w: 140, h: 50, lab: "Funding|obligation", tone: "bad", ls: 14 }),
      P("d1", "pill", 96, 100, { w: 176, h: 46, lab: "Declining|satisfaction", tone: "blush", ls: 13 }),
      P("d2", "pill", 96, 160, { w: 176, h: 46, lab: "Competitive|pressure", tone: "blush", ls: 13 }),
      P("d3", "pill", 96, 220, { w: 176, h: 46, lab: "Rising|costs", tone: "blush", ls: 13 }),
      P("d4", "pill", 96, 280, { w: 176, h: 46, lab: "Lost corporate|accounts", tone: "blush", ls: 13 }),
      L("a1", [186, 100], [226, 168], { col: C.orange, sw: 3, tok: "dot", tc: C.orange, tn: 1 }),
      L("a2", [186, 160], [226, 180], { col: C.orange, sw: 3, tok: "dot", tc: C.orange, tn: 1 }),
      L("a3", [186, 220], [226, 196], { col: C.orange, sw: 3, tok: "dot", tc: C.orange, tn: 1 }),
      L("a4", [186, 280], [226, 208], { col: C.orange, sw: 3, tok: "dot", tc: C.orange, tn: 1 }),
      P("gt", "gate", 300, 200, { w: 140, lab: "Decisive commitment", ls: 14 }),
      P("nd", "stamp", 300, 330, { lab: "None decisive", r: -6 })
    ], [
      { t: "Why now? Never explained", on: ["br", "mg"], s: { br: { hl: { 3: "r" } }, mg: { x: 150, y: 286 } }, hot: ["br"] },
      { t: "Worthwhile, but off target", on: ["pg", "f1", "f2", "wi", "fo"], s: { f1: { flow: 1 }, f2: { st: "bad", x: 1 } }, hot: ["fo"] },
      { t: "Recall the four drivers", off: ["br", "mg", "pg", "f1", "f2", "wi", "fo"], on: ["d1", "d2", "d3", "d4", "a1", "a2", "a3", "a4", "gt"], s: { a1: { flow: 1 }, a2: { flow: 1 }, a3: { flow: 1 }, a4: { flow: 1 } }, hot: ["d1", "d2", "d3", "d4"], f: "d2" },
      { t: "None forced the decision", on: ["nd"], hot: ["gt", "nd"], f: "gt" }
    ]),
    // Act 3 (moments 8-10). Benchmark B1 #65 "Kurzgesagt studio overview"
    // https://kurzgesagt.org/
    // Adapted: a physical metaphor carries the argument â€” one strike opens the gate the pressures could not.
    A("B1#65", [
      P("gt", "gate", 200, 206, { w: 124, lab: "Commitment gate", ls: 14 }),
      P("bo", "bolt", 262, 120, { sz: 54 }),
      P("sr", "pill", 104, 330, { w: 176, h: 50, lab: "Specific|requirement", ic: "doc", tone: "warn", ls: 14 }),
      P("dd", "pill", 296, 330, { w: 176, h: 50, lab: "Defined|deadline", ic: "cal", tone: "warn", ls: 14 }),
      P("co", "card", 200, 170, { w: 290, h: 124, ic: "target", lab: "Central obligation", col: C.gold, is: 40, ls: 18 }),
      P("ca", "cal", 104, 290, { w: 112, h: 90, lab: "Starts January", due: 2 }),
      P("ck", "clock", 296, 286, { r: 40, lab: "Record within 24h", ls: 14 })
    ], [
      { t: "The announcement changed it", on: ["gt", "bo", "sr", "dd"], s: { gt: { st: "open" } }, hot: ["bo"] },
      { t: "The obligation is clear", off: ["gt", "bo"], on: ["co"], s: { co: { st: "goal" } }, hot: ["co"] },
      { t: "24 hours, from January", off: ["sr", "dd"], on: ["ca", "ck"], s: { ca: { due: 1, fill: 2 }, ck: { h: 1, st: "goal" } }, hot: ["ca", "ck"], f: "ck" }
    ]),
    // Act 4 (moments 11-13). Benchmark Part1 #044 "Sankey animation - graph variant"
    // https://observablehq.com/@oluckyman/sankey-animation-acyclic-graph
    // Adapted: several routes should converge into one node; only one route is planned.
    A("P1#044", [
      P("pw", "pill", 104, 90, { w: 176, h: 50, lab: "Proposed|work", ic: "doc", tone: "sky", ls: 14 }),
      P("rf", "pill", 296, 90, { w: 176, h: 50, lab: "Reason for|funding", ic: "coin", tone: "solid", ls: 14 }),
      L("mt", [194, 90], [206, 90], { col: C.plum, sw: 4 }),
      P("mq", "badge", 200, 126, { tone: "unk", sz: 1.3, lab: "Does it match?", ls: 13 }),
      P("s1", "db", 60, 196, { lab: "Reception|tech" }),
      P("s2", "db", 153, 196, { lab: "System B" }),
      P("s3", "db", 247, 196, { lab: "System C" }),
      P("s4", "db", 340, 196, { lab: "System D" }),
      L("k1", [70, 232], [150, 312], { col: C.green, sw: 4, tok: "dot", tc: C.green, tn: 2 }),
      L("k2", [153, 252], [180, 310], { col: C.grey, sw: 3.5, mid: [166, 281] }),
      L("k3", [247, 252], [220, 310], { col: C.grey, sw: 3.5, mid: [234, 281] }),
      L("k4", [330, 232], [250, 312], { col: C.grey, sw: 3.5, mid: [290, 272] }),
      P("cr", "pill", 200, 334, { w: 210, h: 40, lab: "Complete record", ic: "doc", tone: "goal", ls: 14 }),
      P("ip", "stamp", 200, 196, { lab: "Installed, not proven", r: -6 })
    ], [
      { t: "Does the work fit?", on: ["pw", "rf", "mt", "mq"], hot: ["mq"] },
      { t: "Reception tech only", on: ["s1", "s2", "s3", "s4", "k1", "k2", "k3", "k4", "cr"], s: { s1: { st: "ok" }, k1: { flow: 1 }, k2: { st: "bad", x: 1 }, k3: { st: "bad", x: 1 }, k4: { st: "bad", x: 1 }, mq: { dim: 1 } }, hot: ["s1"] },
      { t: "Software isn't compliance", on: ["ip"], hot: ["ip"] }
    ]),
    // Act 5 (moments 14-15). Benchmark Part1 #017 "Design process timeline - Animation"
    // https://dribbble.com/shots/9892691-Design-process-timeline-Animation
    // Adapted: a marker travels the whole timeline and the end milestone asks for proof.
    A("P1#017", [
      L("tl", [30, 132], [370, 132], { col: C.navy, sw: 6, tok: "dot", tc: C.orange, tn: 3, dur: 3.2 }),
      P("p1", "dept", 50, 132, { w: 56, h: 50, ic: "doc", lab: "Record|request", ls: 14 }),
      P("p2", "dept", 150, 132, { w: 56, h: 50, ic: "search", lab: "Locate|data", ls: 14 }),
      P("p3", "dept", 250, 132, { w: 56, h: 50, ic: "db", lab: "Combine|data", ls: 14 }),
      P("p4", "dept", 350, 132, { w: 56, h: 50, ic: "check", lab: "Full|record", ls: 14 }),
      P("wb", "bracket", 200, 196, { w: 330, side: "dn", lab: "Whole process within 24h?", col: C.orange }),
      P("vo", "card", 104, 296, { w: 176, h: 112, ic: "check", lab: "Verifiable|outcome", col: C.green, is: 32 }),
      P("sw", "card", 296, 296, { w: 176, h: 112, ic: "db", lab: "Systems will|work", col: C.grey, is: 32 })
    ], [
      { t: "What evidence proves it?", on: ["tl", "p1", "p2", "p3", "p4", "wb"], s: { tl: { flow: 1 } }, hot: ["wb"] },
      { t: "Outcome, not a promise", on: ["vo", "sw"], s: { vo: { st: "ok" }, sw: { st: "off" } }, hot: ["vo"] }
    ]),
    // Act 6 (moments 16-19). Benchmark Part1 #031 "Supply chain design animation"
    // https://www.behance.net/gallery/7392601/Supply-chain-design-animation
    // Adapted: sites appear, links are calculated and a boundary is drawn around the network.
    A("P1#031", [
      P("gd", "grid14", 200, 156, { dy: 44 }),
      P("sc", "pill", 200, 156, { w: 250, h: 36, lab: "Scope: work and boundaries", tone: "solid", ls: 13 }),
      P("di", "pill", 200, 156, { w: 250, h: 36, lab: "Fourteen interpretations", tone: "bad", ls: 14 }),
      P("mc", "pill", 104, 280, { w: 176, h: 50, lab: "Must change|now", ic: "lock", tone: "goal", ls: 14 }),
      P("fl", "pill", 296, 280, { w: 176, h: 50, lab: "Can follow|later", ic: "cal", tone: "off", ls: 14 }),
      P("dp", "pill", 200, 344, { w: 260, h: 38, lab: "Deadline work protected", ic: "shield", tone: "ok", ls: 14 })
    ], [
      { t: "Next question: scope", on: ["gd", "sc"], hot: ["sc"] },
      { t: "Fourteen sites, many readings", off: ["sc"], on: ["di"], s: { gd: { drift: 1 } }, hot: ["di"] },
      { t: "Change now, or later", on: ["mc", "fl"], s: { gd: { drift: 0, std: 1 }, di: { st: "ok", lab: "One shared reading" } }, hot: ["mc", "fl"], f: "mc" },
      { t: "Protect the mandatory work", on: ["dp"], s: { fl: { dim: 1 } }, hot: ["dp"] }
    ]),
    // Act 7 (moments 20-22). Benchmark Part1 #010 "Process Infographic Widget"
    // https://elements.envato.com/process-infographic-widget-C3TVD9H
    // Adapted: a segmented gauge fills and its needle settles on how much influence the owner has.
    A("P1#010", [
      P("wq", "card", 200, 104, { w: 300, h: 84, ic: "q", lab: "Who decides across|boundaries?", col: C.plum, is: 26, ls: 15 }),
      P("d1", "dept", 72, 214, { w: 70, h: 58, ic: "bell", lab: "Reception|desk" }),
      P("d2", "dept", 200, 214, { w: 70, h: 58, ic: "bed", lab: "Housekeeping|team" }),
      P("d3", "dept", 328, 214, { w: 70, h: 58, ic: "db", lab: "Systems|team" }),
      P("og", "gauge", 104, 336, { r: 46, lab: "Owner influence", ls: 13 }),
      P("ni", "pill", 280, 322, { w: 200, h: 50, lab: "Genuine influence|needed", ic: "key", tone: "goal", ls: 13 }),
      P("da", "pill", 280, 322, { w: 200, h: 50, lab: "Director still|accountable", ic: "person", tone: "warn", ls: 13 })
    ], [
      { t: "Who decides across boundaries?", on: ["wq", "d1", "d2", "d3"], hot: ["wq"] },
      { t: "Owner needs real influence", on: ["og", "ni"], s: { og: { lv: 0.82 } }, hot: ["ni"] },
      { t: "Without mandate, blocked", off: ["ni"], on: ["da"], s: { og: { lv: 0.18 }, d1: { st: "lock" }, d2: { st: "lock" }, d3: { st: "lock" } }, hot: ["da"] }
    ]),
    // Act 8 (moments 23-26). Benchmark Part1 #035 "Explainer Video Kit"
    // https://motionarray.com/after-effects-templates/explainer-video-18242/
    // Adapted: a character crowd switches from the problem state to the resolution state.
    A("P1#035", [
      P("ch", "line", 200, 130, { w: 320, h: 100, pts: [0.4, 0.42, 0.4, 0.41, 0.58, 0.68], base: 0.4, baseLab: "Recorded today", col: C.green, xlab: "Current performance" }),
      P("bq", "badge", 200, 130, { tone: "unk", sz: 1.6, lab: "Recorded yet?", ls: 14 }),
      P("e1", "person", 60, 296, { sz: 0.75, col: C.teal, mood: "worry" }),
      P("e2", "person", 130, 296, { sz: 0.75, col: C.plum, skin: C.skin2, mood: "worry" }),
      P("e3", "person", 200, 296, { sz: 0.75, col: C.gold, mood: "worry" }),
      P("e4", "person", 270, 296, { sz: 0.75, col: C.navy, skin: C.skin2, mood: "worry" }),
      P("e5", "person", 340, 296, { sz: 0.75, col: C.green, mood: "worry" }),
      P("wb", "bubble", 200, 236, { w: 200, lab: "Why must we change?", tail: "b", tx: 0, col: C.plum, ls: 14 }),
      P("uc", "pill", 200, 352, { w: 250, h: 36, lab: "Used consistently, lasting", tone: "ok", ls: 13 })
    ], [
      { t: "Is performance recorded?", on: ["ch", "bq"], s: { ch: { draw: 0 } }, hot: ["bq"] },
      { t: "Baseline makes claims credible", off: ["bq"], s: { ch: { draw: 1, base: 1 } }, hot: ["ch"] },
      { t: "Do employees understand why?", on: ["e1", "e2", "e3", "e4", "e5", "wb"], s: { ch: { dim: 1 } }, hot: ["wb"] },
      { t: "Consistent use lasts", off: ["wb"], on: ["uc"], s: { e1: { mood: "happy" }, e2: { mood: "happy" }, e3: { mood: "happy" }, e4: { mood: "happy" }, e5: { mood: "happy" } }, hot: ["uc"] }
    ]),
    // Act 9 (moments 27-29). Benchmark Part1 #054 "Animated Process Infographic with Geometric Circles and Arrows"
    // https://elements.envato.com/business-strategy-round-infographic-4-steps-templa-ZS2NQ92
    // Adapted: segments light in sequence around one centre â€” six questions around one judgement.
    A("P1#054", [
      P("q1", "pill", 96, 100, { w: 170, h: 38, lab: "Why now?", ic: "bolt", tone: "sky", ls: 14 }),
      P("q2", "pill", 96, 150, { w: 170, h: 38, lab: "What outcome?", ic: "target", tone: "sky", ls: 14 }),
      P("q3", "pill", 96, 200, { w: 170, h: 38, lab: "What scope?", ic: "flag", tone: "sky", ls: 14 }),
      P("q4", "pill", 304, 100, { w: 170, h: 38, lab: "Who decides?", ic: "key", tone: "sky", ls: 14 }),
      P("q5", "pill", 304, 150, { w: 170, h: 38, lab: "Baseline exists?", ic: "chart", tone: "sky", ls: 13 }),
      P("q6", "pill", 304, 200, { w: 170, h: 38, lab: "People ready?", ic: "users", tone: "sky", ls: 14 }),
      P("si", "pill", 104, 282, { w: 176, h: 50, lab: "Sounds|impressive?", ic: "x", tone: "off", ls: 14 }),
      P("cd", "pill", 296, 282, { w: 176, h: 50, lab: "Can Qasr|deliver?", ic: "check", tone: "ok", ls: 14 }),
      P("st", "pill", 200, 348, { w: 270, h: 38, lab: "Standard for every initiative", tone: "solid", ls: 13 })
    ], [
      { t: "Questions you can defend", on: ["q1", "q2", "q3", "q4", "q5", "q6"], s: { q1: { st: "ok" }, q2: { st: "ok" }, q3: { st: "ok" }, q4: { st: "ok" }, q5: { st: "ok" }, q6: { st: "ok" } }, hot: ["q1", "q2", "q3", "q4", "q5", "q6"], f: "q2" },
      { t: "Delivery, not impressiveness", on: ["si", "cd"], hot: ["cd"] },
      { t: "Apply it every time", on: ["st"], hot: ["st"] }
    ])
  ]);

  // =====================================================================
  // W2O4b Â· Making the board's business case coherent â€” 30 moments, 10 acts
  // =====================================================================
  W.VL_SCENES["W2O4b"] = scene("W2O4b", [
    // Act 1 (moments 0-3). Benchmark Part1 #034 "SaaS Platform & Workflow Motion"
    // https://dribbble.com/shots/27719724-SaaS-Platform-Workflow-Motion-UI-Concept
    // Adapted: interface cards transition and reflow â€” slides of a board presentation.
    A("P1#034", [
      P("dr", "person", 46, 206, { sz: 1.05, col: C.plum, lab: "Programme|director", ls: 13 }),
      P("sc", "screen", 236, 178, { w: 296, h: 196, lab: "Board presentation" }),
      P("cs", "pill", 236, 136, { w: 220, h: 40, lab: "Continued support", ic: "up", tone: "ok", ls: 14 }),
      P("dl", "pill", 236, 196, { w: 220, h: 40, lab: "Deadline approaching", ic: "clock", tone: "warn", ls: 13 }),
      P("wf", "pill", 236, 136, { w: 220, h: 50, lab: "Why funded:|new requirement", ic: "bolt", tone: "solid", ls: 13 }),
      P("bx", "pill", 200, 336, { w: 300, h: 40, lab: "Board expects the obligation", ic: "gavel", tone: "goal", ls: 13 })
    ], [
      { t: "Preparing the board deck", on: ["dr", "sc"], hot: ["sc"] },
      { t: "Support, as deadline nears", on: ["cs", "dl"], hot: ["cs", "dl"], f: "dl" },
      { t: "Why the board funded", off: ["cs"], on: ["wf"], hot: ["wf"] },
      { t: "Expectations follow that history", on: ["bx"], hot: ["bx"] }
    ]),
    // Act 2 (moments 4-6). Benchmark Part1 #047 "Stripe Connect"
    // https://stripe.com/ae/connect
    // Adapted: funds travel from a source through a platform and split into payouts â€” investment into outcomes.
    A("P1#047", [
      P("ob", "pill", 104, 96, { w: 176, h: 50, lab: "Compliance|obligation", ic: "lock", tone: "solid", ls: 14 }),
      P("gx", "pill", 296, 96, { w: 176, h: 50, lab: "Guest|experience", ic: "star", tone: "mint", ls: 14 }),
      L("cn", [194, 96], [206, 96], { col: C.plum, sw: 4 }),
      P("na", "pill", 200, 150, { w: 196, h: 34, lab: "Neither automatic", tone: "unk", ls: 14 }),
      P("bc", "card", 200, 236, { w: 180, h: 96, ic: "doc", lab: "Business case", col: C.navy, is: 30, ls: 16 }),
      L("l1", [110, 304], [150, 270], { col: C.navy, sw: 3, tok: "coin", tn: 1 }),
      L("l2", [200, 304], [200, 286], { col: C.navy, sw: 3 }),
      L("l3", [290, 304], [250, 270], { col: C.navy, sw: 3 }),
      P("r1", "pill", 76, 330, { w: 116, h: 46, lab: "Expected|outcomes", tone: "ok", ls: 13 }),
      P("r2", "pill", 200, 330, { w: 116, h: 46, lab: "Resources|needed", tone: "gold", ls: 13 }),
      P("r3", "pill", 324, 330, { w: 116, h: 46, lab: "Risks|involved", tone: "bad", ls: 13 })
    ], [
      { t: "A legitimate second ambition", on: ["ob", "gx"], hot: ["gx"] },
      { t: "Connect, don't pretend", on: ["cn", "na"], hot: ["na"] },
      { t: "What business cases do", on: ["bc", "l1", "l2", "l3", "r1", "r2", "r3"], s: { l1: { flow: 1 } }, hot: ["bc"] }
    ]),
    // Act 3 (moments 7-10). Benchmark Part1 #043 "Sankey animation - acyclic graph"
    // https://observablehq.com/@joaormendes/sankey-animation-acyclic-graph
    // Adapted: particles split along weighted bands â€” four fragmented sources reunited by one redesign band.
    A("P1#043", [
      P("cg", "pill", 104, 86, { w: 176, h: 50, lab: "Specific|compliance gap", ic: "target", tone: "goal", ls: 13 }),
      P("vm", "pill", 296, 86, { w: 176, h: 50, lab: "Vague|modernisation", ic: "x", tone: "off", ls: 14 }),
      P("s1", "db", 60, 176, { lab: "System 1" }),
      P("s2", "db", 153, 176, { lab: "System 2" }),
      P("s3", "db", 247, 176, { lab: "System 3" }),
      P("s4", "db", 340, 176, { lab: "System 4" }),
      L("k1", [60, 236], [150, 284], { col: C.grey, sw: 3.5, tok: "dot", tc: C.navy, tn: 2 }),
      L("k2", [153, 236], [184, 282], { col: C.grey, sw: 3.5, tok: "dot", tc: C.navy, tn: 2 }),
      L("k3", [247, 236], [216, 282], { col: C.grey, sw: 3.5, tok: "dot", tc: C.navy, tn: 2 }),
      L("k4", [340, 236], [250, 284], { col: C.grey, sw: 3.5, tok: "dot", tc: C.navy, tn: 2 }),
      P("rd", "pill", 200, 300, { w: 210, h: 38, lab: "Process redesign", ic: "gear", tone: "sky", ls: 14 }),
      P("pj", "pill", 200, 352, { w: 270, h: 36, lab: "Result to judge progress", tone: "goal", ls: 13 }),
      P("au", "pill", 200, 352, { w: 270, h: 36, lab: "Information available, usable", tone: "ok", ls: 13 })
    ], [
      { t: "Start with the gap", on: ["cg", "vm"], hot: ["cg"] },
      { t: "Spread across four systems", on: ["s1", "s2", "s3", "s4"], s: { s2: { loc: 1 }, s3: { loc: 1 }, s4: { loc: 1 } }, hot: ["s1", "s2", "s3", "s4"], f: "s2" },
      { t: "Concrete problem, clear result", on: ["pj"], hot: ["pj"] },
      { t: "Redesign makes it usable", off: ["pj"], on: ["k1", "k2", "k3", "k4", "rd", "au"], s: { k1: { flow: 1, st: "ok" }, k2: { flow: 1, st: "ok" }, k3: { flow: 1, st: "ok" }, k4: { flow: 1, st: "ok" } }, hot: ["rd", "au"], f: "rd" }
    ]),
    // Act 4 (moments 11-12). Benchmark Part1 #028 "Factory Manufacturing Animation Pack"
    // https://lottiefiles.com/marketplace/factory-manufacturing
    // Adapted: items ride a belt, pause at inspection, and pass or are set aside.
    A("P1#028", [
      L("belt", [18, 266], [382, 266], { col: "#7e8a96", sw: 14, tok: "dot", tc: "#c9d1d9", tn: 6, dur: 3.5 }),
      P("ro", "pill", 200, 82, { w: 240, h: 38, lab: "Start: required outcome", ic: "target", tone: "goal", ls: 14 }),
      P("gc", "dept", 200, 140, { w: 80, h: 60, ic: "search", lab: "Performance evidence?", ls: 13 }),
      P("tray", "panel", 120, 330, { w: 200, h: 70, fill: "#f3f5f7", dash: "6 5", stroke: "#9aa6b2" }),
      P("pass", "panel", 320, 330, { w: 120, h: 70, fill: C.mint, dash: "6 5", stroke: C.green }),
      P("tp", "pill", 72, 236, { w: 128, h: 50, lab: "Technology|purchased", tone: "plum", ls: 13 }),
      P("pe", "pill", 72, 236, { w: 128, h: 50, lab: "Process|performance", tone: "mint", ls: 13 })
    ], [
      { t: "Outcome first, not purchase", on: ["belt", "ro", "gc", "tp", "tray", "pass"], s: { belt: { flow: 1 }, tp: { x: 200, y: 236, d: 1.2 } }, hot: ["ro"] },
      { t: "Installation isn't evidence", on: ["pe"], s: { tp: { x: 120, y: 330, lab: "Installed|only", st: "off", d: 1.1 }, pe: { x: 320, y: 330, st: "ok", d: 1.6 } }, hot: ["pe", "tp"], f: "pe" }
    ]),
    // Act 5 (moments 13-16). Benchmark Part1 #001 "Interactive SVG Path & GSAP Animation"
    // https://codepen.io/WebGuyJeff/pen/rNdmqdO
    // Adapted: a path is traced, a marker travels and each station lights â€” the guest-service journey.
    A("P1#001", [
      L("jp", null, null, { d: "M36 132C96 96 140 168 200 132S304 96 364 132", col: C.teal, sw: 6, tok: "dot", tc: C.teal, tn: 3, dur: 3.4 }),
      P("j1", "dept", 36, 132, { w: 52, h: 46, ic: "cal" }),
      P("j2", "dept", 200, 132, { w: 52, h: 46, ic: "bell" }),
      P("j3", "dept", 364, 132, { w: 52, h: 46, ic: "bed" }),
      P("cv", "pill", 200, 70, { w: 250, h: 34, lab: "Better coordinated service", tone: "mint", ls: 13 }),
      P("w1", "pill", 104, 214, { w: 176, h: 34, lab: "Repeated requests", tone: "blush", ls: 13 }),
      P("w2", "pill", 296, 214, { w: 176, h: 34, lab: "Departmental handoffs", tone: "blush", ls: 13 }),
      P("w3", "pill", 200, 256, { w: 176, h: 34, lab: "Damaging delays", tone: "blush", ls: 13 }),
      P("md", "stamp", 200, 330, { lab: "Must be demonstrated", r: -5, col: C.gold }),
      P("bl", "line", 200, 316, { w: 300, h: 70, pts: [0.4, 0.42, 0.4, 0.41], base: 0.4, baseLab: "Baseline recorded", col: C.green })
    ], [
      { t: "The additional value", on: ["jp", "j1", "j2", "j3", "cv"], s: { jp: { flow: 1 } }, hot: ["cv"] },
      { t: "What the traveller showed", on: ["w1", "w2", "w3"], s: { j2: { st: "bad" } }, hot: ["w1", "w2", "w3"], f: "w3" },
      { t: "Basis, not a guarantee", on: ["md"], hot: ["md"] },
      { t: "Record current performance", off: ["md"], on: ["bl"], s: { bl: { draw: 1, base: 1 } }, hot: ["bl"] }
    ]),
    // Act 6 (moments 17-18). Benchmark Part1 #067 "Idea Flow Animation | Infographic Motion Design"
    // https://www.behance.net/gallery/247762027/Idea-Flow-Animation-Infographic-Motion-Design
    // Adapted: ideas orbit a core and connect â€” departments orbit a review cycle with one resolver.
    A("P1#067", [
      P("cy", "icon", 200, 196, { ic: "loop", sz: 96, col: C.navy, idle: "v2spinslow" }),
      P("rv", "pill", 200, 196, { w: 150, h: 36, lab: "Progress review", tone: "solid", ls: 14 }),
      P("o1", "dept", 76, 124, { w: 64, h: 54, ic: "bell" }),
      P("o2", "dept", 324, 124, { w: 64, h: 54, ic: "bed" }),
      P("o3", "dept", 76, 270, { w: 64, h: 54, ic: "cal" }),
      P("o4", "dept", 324, 270, { w: 64, h: 54, ic: "db" }),
      L("c1", [108, 140], [150, 172], { col: C.green, sw: 3 }),
      L("c2", [292, 140], [250, 172], { col: C.green, sw: 3 }),
      L("c3", [108, 254], [150, 222], { col: C.green, sw: 3 }),
      L("c4", [292, 254], [250, 222], { col: C.green, sw: 3 }),
      P("rs", "pill", 200, 336, { w: 236, h: 38, lab: "Owner resolves conflicts", ic: "key", tone: "ok", ls: 13 }),
      P("fd", "pill", 200, 336, { w: 236, h: 38, lab: "Fragmented decisions harm", ic: "x", tone: "bad", ls: 13 })
    ], [
      { t: "Review and a resolver", on: ["cy", "rv", "o1", "o2", "o3", "o4", "c1", "c2", "c3", "c4", "rs"], hot: ["rs"] },
      { t: "Fragmented decisions break links", off: ["rs"], on: ["fd"], s: { c1: { st: "bad", brk: 1 }, c2: { st: "bad", brk: 1 }, c3: { st: "bad", brk: 1 }, c4: { st: "bad", brk: 1 } }, hot: ["fd"] }
    ]),
    // Act 7 (moments 19-21). Benchmark Part1 #038 "Bar Chart Race, Explained"
    // https://observablehq.com/@d3/bar-chart-race-explained
    // Adapted: bars grow and re-rank â€” compliance work moves to the protected top slot.
    A("P1#038", [
      P("bq", "bubble", 200, 82, { w: 250, lab: "What if they compete?", tail: "b", tx: 0, col: C.plum, ls: 14 }),
      P("b1", "bar", 200, 156, { w: 330, lab: "Guest improvements", max: 1, col: C.green, ls: 14 }),
      P("b2", "bar", 200, 220, { w: 330, lab: "Compliance work", max: 1, col: C.gold, ls: 14 }),
      P("pr", "pill", 200, 292, { w: 260, h: 38, lab: "Compliance protected first", ic: "shield", tone: "goal", ls: 13 }),
      P("cp", "pill", 200, 344, { w: 260, h: 36, lab: "Clear, explicit priorities", tone: "ok", ls: 13 })
    ], [
      { t: "When ambitions compete", on: ["bq", "b1", "b2"], s: { b1: { lv: 0.7, v: "Wants resources" }, b2: { lv: 0.7, v: "Needs resources" } }, hot: ["bq"] },
      { t: "Protect it, schedule extras", on: ["pr"], s: { b2: { y: 156, lv: 0.9, v: "Protected now" }, b1: { y: 220, lv: 0.4, v: "Timed later" } }, hot: ["pr"] },
      { t: "Not everything at once", on: ["cp"], hot: ["cp"] }
    ]),
    // Act 8 (moments 22-24). Benchmark Part1 #057 "GSAP SVG Research" (plant growth)
    // https://codepen.io/FabioG/post/svg-animation-research-gsap
    // Adapted: a stem draws and leaves unfurl â€” value keeps growing only while someone tends it.
    A("P1#057", [
      P("aq", "bubble", 200, 82, { w: 270, lab: "Useful after compliance?", tail: "b", tx: -60, col: C.plum, ls: 14 }),
      P("gr", "line", 200, 190, { w: 320, h: 120, pts: [0.2, 0.45, 0.6, 0.7, 0.78, 0.84], col: C.green, xlab: "Value over time", marks: [{ i: 2, lab: "Requirement met", w: 156, y: -52, col: C.gold, dx: -20 }] }),
      P("ow", "pill", 200, 300, { w: 250, h: 38, lab: "Ownership and monitoring", ic: "eye", tone: "ok", ls: 13 }),
      P("im", "pill", 104, 300, { w: 176, h: 50, lab: "Immediate|commitments", tone: "goal", ls: 13 }),
      P("cm", "pill", 296, 300, { w: 176, h: 50, lab: "Continuing|management", tone: "mint", ls: 13 })
    ], [
      { t: "Still useful afterwards?", on: ["aq"], hot: ["aq"] },
      { t: "Ownership keeps it growing", on: ["gr", "ow"], s: { gr: { draw: 1, mk: 1 } }, hot: ["ow"] },
      { t: "Two kinds of commitment", off: ["ow"], on: ["im", "cm"], hot: ["im", "cm"], f: "cm" }
    ]),
    // Act 9 (moments 25-27). Benchmark Part1 #009 "Modern Process Infographic Steps Animation Template"
    // https://elements.envato.com/steps-infographic-BUNKM3A
    // Adapted: numbered steps activate as an indicator climbs.
    A("P1#009", [
      P("ps", "doc", 200, 130, { w: 320, h: 130, title: "Purpose statement", lines: ["Meet the 24-hour requirement", "While improving guest services"], ls: 14 }),
      P("ng", "pill", 200, 222, { w: 250, h: 34, lab: "No benefit guaranteed", tone: "goal", ls: 13 }),
      P("s1", "pill", 72, 300, { w: 116, h: 36, lab: "The evidence", tone: "sky", ls: 13 }),
      P("s2", "pill", 200, 300, { w: 136, h: 46, lab: "Named|responsibilities", tone: "sky", ls: 13 }),
      P("s3", "pill", 328, 300, { w: 116, h: 46, lab: "Clear|boundaries", tone: "sky", ls: 13 }),
      P("s4", "pill", 200, 348, { w: 160, h: 36, lab: "Resources needed", tone: "sky", ls: 13 })
    ], [
      { t: "Both purposes preserved", on: ["ps"], s: { ps: { hl: { 0: "g", 1: "y" } } }, hot: ["ps"] },
      { t: "Required, not overpromised", on: ["ng"], hot: ["ng"] },
      { t: "Then specify the case", on: ["s1", "s2", "s3", "s4"], hot: ["s1", "s2", "s3", "s4"], f: "s2" }
    ]),
    // Act 10 (moments 28-29). Benchmark Part1 #058 "SVGator animated UI templates article"
    // https://www.svgator.com/blog/animated-ui-templates-you-can-customize/
    // Adapted: a before/after toggle switch â€” from attractive promises to an accountable decision.
    A("P1#058", [
      P("ap", "card", 104, 156, { w: 176, h: 140, ic: "star", lab: "Attractive|promises", col: C.grey, is: 40 }),
      P("ad", "card", 296, 156, { w: 176, h: 140, ic: "seal", lab: "Accountable|decision", col: C.green, is: 40 }),
      L("sw", [196, 156], [204, 156], { col: C.ink, sw: 4, arrow: 1 }),
      P("qh", "icon", 72, 302, { ic: "hotel", sz: 44, col: C.navy, lab: "Qasr case", ls: 13 }),
      L("bq", [100, 300], [150, 300], { col: C.navy, sw: 3, arrow: 1 }),
      P("o1", "icon", 190, 302, { ic: "hotel", sz: 38, col: C.teal }),
      P("o2", "icon", 254, 302, { ic: "house", sz: 38, col: C.plum }),
      P("o3", "icon", 318, 302, { ic: "users", sz: 38, col: C.gold }),
      P("ob", "pill", 254, 352, { w: 220, h: 32, lab: "Beyond Qasr Hospitality", tone: "solid", ls: 13 })
    ], [
      { t: "An accountable decision", on: ["ap", "ad", "sw"], s: { ap: { dim: 1 }, ad: { st: "ok" } }, hot: ["ad"] },
      { t: "A foundation beyond Qasr", on: ["qh", "bq", "o1", "o2", "o3", "ob"], hot: ["ob"] }
    ])
  ]);

  // =====================================================================
  // W2O4c Â· Applying the distinction beyond Qasr â€” 34 moments, 10 acts
  // (forum case details were not supplied, so no organisation or figures are invented)
  // =====================================================================
  W.VL_SCENES["W2O4c"] = scene("W2O4c", [
    // Act 1 (moments 0-3). Benchmark B1 #63 "The Pudding Human Terrain"
    // https://pudding.cool/2018/10/city_3d/
    // Adapted: towers rise to compare magnitudes â€” four pressures grow around one hotel group.
    A("B1#63", [
      P("rv", "pill", 200, 76, { w: 220, h: 34, lab: "Week 2 in review", ic: "book", tone: "solid", ls: 14 }),
      P("ht", "hotel", 200, 186, { w: 140, h: 120, lab: "Qasr Hospitality", ls: 13 }),
      P("w1", "icon", 106, 140, { ic: "warn", sz: 30, col: C.orange, idle: "v2flash" }),
      P("w2", "icon", 294, 140, { ic: "warn", sz: 30, col: C.orange, idle: "v2flash" }),
      P("w3", "icon", 106, 226, { ic: "warn", sz: 30, col: C.orange, idle: "v2flash" }),
      P("w4", "icon", 294, 226, { ic: "warn", sz: 30, col: C.orange, idle: "v2flash" }),
      P("b1", "bar", 104, 290, { w: 170, lab: "Satisfaction down", max: 1, col: C.red, ls: 13 }),
      P("b2", "bar", 296, 290, { w: 170, lab: "Rival expectations", max: 1, col: C.orange, ls: 13 }),
      P("b3", "bar", 104, 346, { w: 170, lab: "Costs rising", max: 1, col: C.gold, ls: 13 }),
      P("b4", "bar", 296, 346, { w: 170, lab: "Accounts leaving", max: 1, col: C.plum, ls: 13 }),
      P("dk", "pill", 200, 186, { w: 250, h: 50, lab: "Drivers: pressure,|no decision", tone: "warn", ls: 14 })
    ], [
      { t: "Step back from Qasr", on: ["rv", "ht"], hot: ["rv"] },
      { t: "Problems visible for years", on: ["w1", "w2", "w3", "w4"], s: { ht: { shake: 1 } }, hot: ["w1", "w2", "w3", "w4"], f: "ht" },
      { t: "Four pressures, all rising", on: ["b1", "b2", "b3", "b4"], s: { b1: { lv: 0.8 }, b2: { lv: 0.7 }, b3: { lv: 0.75 }, b4: { lv: 0.65 }, ht: { shake: 0 } }, hot: ["b1", "b2", "b3", "b4"], f: "b2" },
      { t: "They were drivers", off: ["w1", "w2", "w3", "w4", "ht"], on: ["dk"], hot: ["dk"] }
    ]),
    // Act 2 (moments 4-7). Benchmark Part2 #101 "3D Camera Factory"
    // https://lottiefiles.com/free-animation/3d-camera-factory-2I4Nonw7Ad
    // Adapted: an item progresses through production stations â€” event, decision, then two outputs.
    A("P2#101", [
      P("rq", "card", 104, 132, { w: 176, h: 120, ic: "doc", lab: "Authority|requirement", col: C.orange, is: 36 }),
      P("bo", "bolt", 200, 132, { sz: 46 }),
      P("ck", "clock", 300, 132, { r: 46, lab: "That moment", ls: 14 }),
      P("tw", "pill", 200, 230, { w: 250, h: 38, lab: "Trigger: why act now", ic: "bolt", tone: "warn", ls: 14 }),
      L("f1", [180, 252], [110, 292], { col: C.navy, sw: 4, arrow: 1 }),
      L("f2", [220, 252], [290, 292], { col: C.green, sw: 4, arrow: 1 }),
      P("cr", "pill", 104, 318, { w: 176, h: 50, lab: "Compliance|rationale", ic: "lock", tone: "solid", ls: 13 }),
      P("ga", "pill", 296, 318, { w: 176, h: 50, lab: "Guest|ambitions", ic: "star", tone: "mint", ls: 13 }),
      P("nr", "stamp", 296, 270, { lab: "Can't replace it", r: -6 })
    ], [
      { t: "The decisive requirement", on: ["rq", "bo"], hot: ["rq"] },
      { t: "Why act that moment", on: ["ck", "tw"], s: { ck: { h: 0.9, run: 1 } }, hot: ["tw"] },
      { t: "Ambitions could diverge", on: ["f1", "f2", "cr", "ga"], hot: ["cr", "ga"], f: "ga" },
      { t: "Value can't replace requirement", on: ["nr"], hot: ["nr", "cr"], f: "nr" }
    ]),
    // Act 3 (moments 8-9). Benchmark Part1 #061 "SVGator icon templates"
    // https://www.svgator.com/animation-templates/icons
    // Adapted: icons go from idle, to action, to completion â€” four supports switch on while urgency decays.
    A("P1#061", [
      P("i1", "icon", 72, 128, { ic: "key", sz: 34, col: "#ffffff", disc: C.green, lab: "Process|owner", ls: 13 }),
      P("i2", "icon", 158, 128, { ic: "chart", sz: 34, col: "#ffffff", disc: C.teal, lab: "Real|measures", ls: 13 }),
      P("i3", "icon", 244, 128, { ic: "star", sz: 34, col: "#ffffff", disc: C.gold, lab: "Executive|sponsor", ls: 13 }),
      P("i4", "icon", 330, 128, { ic: "shield", sz: 34, col: "#ffffff", disc: C.navy, lab: "Ongoing|governance", ls: 13 }),
      P("ur", "line", 200, 282, { w: 320, h: 100, pts: [0.9, 0.86, 0.6, 0.35, 0.2], col: C.orange, xlab: "Trigger urgency" })
    ], [
      { t: "Purpose needs four supports", on: ["i1", "i2", "i3", "i4"], hot: ["i1", "i2", "i3", "i4"], f: "i2" },
      { t: "Because urgency fades", on: ["ur"], s: { ur: { draw: 1 } }, hot: ["ur"] }
    ]),
    // Act 4 (moments 10-13). Benchmark Part1 #046 "Infographic MOGRT templates" (funnel)
    // https://motionarray.com/motion-graphics-templates/infographics/
    // Adapted: many inputs drain into one output â€” three unnamed pressures, one budget.
    A("P1#046", [
      P("no", "card", 104, 150, { w: 176, h: 140, ic: "q", lab: "A new|organisation", col: C.plum, is: 44 }),
      P("fc", "doc", 296, 166, { w: 176, h: 196, title: "Forum case", lines: ["Three Pressures,", "One Budget", "Plus an exhibit"], ls: 13 }),
      P("p1", "pill", 72, 96, { w: 112, h: 36, lab: "Pressure one", tone: "blush", ls: 13 }),
      P("p2", "pill", 200, 96, { w: 112, h: 36, lab: "Pressure two", tone: "blush", ls: 13 }),
      P("p3", "pill", 328, 96, { w: 112, h: 36, lab: "Pressure three", tone: "blush", ls: 13 }),
      L("u1", [72, 116], [176, 196], { col: C.orange, sw: 3, tok: "dot", tc: C.orange, tn: 1 }),
      L("u2", [200, 116], [200, 190], { col: C.orange, sw: 3, tok: "dot", tc: C.orange, tn: 1 }),
      L("u3", [328, 116], [224, 196], { col: C.orange, sw: 3, tok: "dot", tc: C.orange, tn: 1 }),
      P("ob", "coins", 200, 226, { n: 4, lab: "One budget", ls: 14 }),
      P("jr", "pill", 200, 300, { w: 270, h: 38, lab: "Justify your rationale", ic: "shield", tone: "solid", ls: 14 }),
      P("cp", "pill", 104, 300, { w: 176, h: 50, lab: "Continuing|pressures", tone: "blush", ls: 13 }),
      P("ie", "pill", 296, 300, { w: 176, h: 50, lab: "Event forcing|action?", ic: "bolt", tone: "unk", ls: 13 })
    ], [
      { t: "Apply it somewhere new", on: ["no"], hot: ["no"] },
      { t: "Three Pressures, One Budget", on: ["fc"], s: { fc: { hl: { 0: "y", 1: "y", 2: "b" } } }, hot: ["fc"] },
      { t: "Justify, withstand challenge", off: ["no", "fc"], on: ["p1", "p2", "p3", "u1", "u2", "u3", "ob", "jr"], s: { u1: { flow: 1 }, u2: { flow: 1 }, u3: { flow: 1 } }, hot: ["jr"] },
      { t: "Pressures versus the event", off: ["jr"], on: ["cp", "ie"], hot: ["cp", "ie"], f: "ie" }
    ]),
    // Act 5 (moments 14-17). Benchmark Part1 #074 "Awwwards scroll animations - Ember House"
    // https://www.awwwards.com/inspiration/scroll-animations
    // Adapted: statement words reveal, then a proof underline lands under the reasoned chain.
    A("P1#074", [
      P("sp", "pill", 104, 92, { w: 176, h: 50, lab: "Serious|problem", ic: "warn", tone: "blush", ls: 14 }),
      P("fn", "pill", 296, 92, { w: 176, h: 50, lab: "Fund it|now?", ic: "coin", tone: "unk", ls: 14 }),
      L("nx", [194, 92], [206, 92], { col: C.red, sw: 4, mid: [200, 92] }),
      P("ra", "pill", 104, 170, { w: 176, h: 50, lab: "Chosen|rationale", tone: "solid", ls: 14 }),
      L("ro", [194, 170], [206, 170], { col: C.green, sw: 4, arrow: 1 }),
      P("oc", "pill", 296, 170, { w: 176, h: 50, lab: "Demonstrable|outcome", ic: "target", tone: "ok", ls: 13 }),
      P("bz", "doc", 200, 270, { w: 300, h: 120, title: "Avoid this", lines: ["Sounds urgent", "Impressive transformation language"], ls: 13 }),
      P("e1", "pill", 72, 276, { w: 116, h: 40, lab: "The evidence", tone: "sky", ls: 13 }),
      P("e2", "pill", 200, 276, { w: 124, h: 46, lab: "Your|interpretation", tone: "sky", ls: 13 }),
      P("e3", "pill", 328, 276, { w: 116, h: 40, lab: "The decision", tone: "ok", ls: 13 }),
      L("ea", [132, 276], [138, 276], { col: C.navy, sw: 3, arrow: 1 }),
      L("eb", [264, 276], [270, 276], { col: C.navy, sw: 3, arrow: 1 })
    ], [
      { t: "Serious isn't 'fund now'", on: ["sp", "fn", "nx"], s: { nx: { st: "bad", x: 1 } }, hot: ["fn"] },
      { t: "Rationale to outcome", on: ["ra", "ro", "oc"], hot: ["oc"] },
      { t: "Not urgency or buzzwords", on: ["bz"], s: { bz: { sk: [0, 1], hl: { 0: "r", 1: "r" } } }, hot: ["bz"] },
      { t: "Evidence, interpretation, decision", off: ["bz"], on: ["e1", "e2", "e3", "ea", "eb"], hot: ["e1", "e2", "e3"], f: "e2" }
    ]),
    // Act 6 (moments 18-20). Benchmark B1 #59 "The Pudding sticky scrollytelling"
    // https://pudding.cool/process/scrollytelling-sticky/
    // Adapted: one pinned bar re-states at each step â€” the same budget, read two ways.
    A("B1#59", [
      P("ym", "person", 64, 120, { sz: 0.9, col: C.navy, lab: "Your view", ls: 13 }),
      P("om", "person", 336, 120, { sz: 0.9, col: C.plum, skin: C.skin2, lab: "Another manager", ls: 13 }),
      P("yb", "bubble", 170, 86, { w: 110, lab: "Fund this", tail: "l", col: C.navy, ls: 14 }),
      P("ob", "bubble", 230, 136, { w: 110, lab: "Fund that", tail: "r", col: C.plum, ls: 14 }),
      P("bg", "seg", 200, 236, { w: 360, h: 52, segs: [
        { lab: "Priority A", v: 1, col: C.navy, lp: "in", ls: 14 },
        { lab: "Priority B", v: 1, col: C.plum, lp: "in", ls: 14 },
        { lab: "Priority C", v: 1, col: C.teal, lp: "in", ls: 14 }
      ] }),
      P("ne", "pill", 200, 296, { w: 280, h: 34, lab: "Not equal shares possible", tone: "warn", ls: 13 }),
      P("as", "bar", 200, 350, { w: 330, lab: "Argument strength", max: 1, col: C.green, v: "Acknowledges rivals", ls: 13 })
    ], [
      { t: "Another reading, another use", on: ["ym", "om", "yb", "ob"], hot: ["ob"] },
      { t: "Legitimate, unequal priorities", on: ["bg", "ne"], s: { bg: { n: 3 } }, hot: ["ne"] },
      { t: "Acknowledge competing concerns", on: ["as"], s: { as: { lv: 0.85 } }, hot: ["as"] }
    ]),
    // Act 7 (moments 21-24). Benchmark B1 #69 "Vox video explainer archive"
    // https://www.vox.com/videos/archives/6
    // Adapted: spotlight one piece of evidence at a time while the rest of the thread dims.
    A("B1#69", [
      P("cl", "cal", 66, 120, { w: 96, h: 82, lab: "By mid-week", due: 8 }),
      P("p1", "bubble", 250, 104, { w: 236, lab: "Your answer, first", tail: "l", col: C.navy, ls: 14 }),
      P("ci", "icon", 66, 236, { ic: "book", sz: 40, col: C.green, lab: "Cite the chapter", ls: 13 }),
      P("p2", "bubble", 250, 222, { w: 236, h: 50, lab: "Claim plus|chapter evidence", tail: "l", col: C.green, ls: 14 }),
      P("nc", "pill", 250, 270, { w: 236, h: 30, lab: "Bare assertion: no credit", tone: "bad", ls: 13 }),
      P("r1", "bubble", 140, 324, { w: 130, lab: "Reply to two", tail: "t", tx: -20, col: C.teal, ls: 14 }),
      P("r2", "bubble", 270, 324, { w: 136, lab: "I disagree", tail: "t", tx: -20, col: C.orange, ls: 14 }),
      P("mg", "icon", 360, 324, { ic: "search", sz: 34, col: C.plum, idle: "v2float" })
    ], [
      { t: "Post first, by mid-week", on: ["cl", "p1"], s: { cl: { due: 1, fill: 3 } }, hot: ["p1"] },
      { t: "Cite the chapter", on: ["ci", "p2", "nc"], s: { p1: { dim: 1 } }, hot: ["p2"] },
      { t: "Reply twice, disagree once", on: ["r1", "r2"], s: { p2: { dim: 1 }, nc: { dim: 1 } }, hot: ["r1", "r2"], f: "r2" },
      { t: "Disagreement tests assumptions", on: ["mg"], hot: ["mg", "r2"], f: "mg" }
    ]),
    // Act 8 (moments 25-28). Benchmark Part2 #108 "Delivery Truck - Road Animation"
    // https://lottiefiles.com/free-animation/delivery-truck-road-animation-K9xyRiku9v
    // Adapted: a vehicle translates along a route â€” your week travels to the summary and on across the term.
    A("P2#108", [
      P("tw", "pill", 104, 92, { w: 176, h: 50, lab: "Winning the|argument", ic: "x", tone: "off", ls: 13 }),
      P("dj", "pill", 296, 92, { w: 176, h: 50, lab: "Defensible|judgement", ic: "check", tone: "ok", ls: 13 }),
      L("rd", [30, 196], [370, 196], { col: C.navy, sw: 6 }),
      P("wk", "icon", 40, 196, { ic: "pin", sz: 30, col: C.orange }),
      P("fs", "doc", 300, 196, { w: 120, h: 120, title: "Facilitator|summary", ts: 13, rows: 3 }),
      P("cm", "pill", 138, 160, { w: 170, h: 34, lab: "Compare your reasoning", tone: "sky", ls: 13 }),
      P("fm", "pill", 150, 256, { w: 220, h: 38, lab: "Formative: no grade", ic: "star", tone: "mint", ls: 13 }),
      P("a4", "bar", 200, 334, { w: 330, lab: "Assessment Four: participation", max: 1, col: C.gold, v: "Whole term", ls: 13 })
    ], [
      { t: "Not winning, judging well", on: ["tw", "dj"], hot: ["dj"] },
      { t: "Read the facilitator's summary", on: ["rd", "wk", "fs", "cm"], s: { wk: { x: 230, d: 1.6 } }, hot: ["fs"] },
      { t: "Formative, not graded", on: ["fm"], hot: ["fm"] },
      { t: "Counts toward Assessment Four", on: ["a4"], s: { a4: { lv: 0.6 } }, hot: ["a4"] }
    ]),
    // Act 9 (moments 29-31). Benchmark Part2 #096 "Process in cub"
    // https://lottiefiles.com/free-animation/process-in-cub-9iNG7QP0qC
    // Adapted: cube states cycle into a stacked block â€” three conditions build the programme.
    A("P2#096", [
      P("rp", "pill", 104, 96, { w: 176, h: 50, lab: "Recognising|a problem", ic: "eye", tone: "sky", ls: 13 }),
      P("da", "pill", 296, 96, { w: 176, h: 50, lab: "Deciding|to act", ic: "flag", tone: "solid", ls: 13 }),
      L("rx", [194, 96], [206, 96], { col: C.ink, sw: 3 }),
      P("gi", "pill", 104, 180, { w: 176, h: 50, lab: "Good|intentions", tone: "off", ls: 13 }),
      P("pa", "pill", 296, 180, { w: 176, h: 50, lab: "Persuasive|announcement", tone: "off", ls: 13 }),
      P("ne", "stamp", 200, 236, { lab: "Not enough", r: -6 }),
      P("k1", "pill", 200, 352, { w: 260, h: 36, lab: "Clear investment reason", ic: "coin", tone: "gold", ls: 13 }),
      P("k2", "pill", 200, 308, { w: 260, h: 36, lab: "Agreed purpose", ic: "target", tone: "solid", ls: 13 }),
      P("k3", "pill", 200, 264, { w: 260, h: 36, lab: "Evidence outcomes achieved", ic: "check", tone: "ok", ls: 13 })
    ], [
      { t: "Recognise versus decide", on: ["rp", "da", "rx"], hot: ["rp", "da"], f: "da" },
      { t: "More than good intentions", on: ["gi", "pa", "ne"], hot: ["ne"] },
      { t: "Reason, purpose, evidence", on: ["k1", "k2", "k3"], s: { gi: { dim: 1 }, pa: { dim: 1 }, ne: { dim: 1 } }, hot: ["k1", "k2", "k3"], f: "k2" }
    ]),
    // Act 10 (moments 32-33). Benchmark Part1 #066 "Awwwards Mubasic scroll animation"
    // https://www.awwwards.com/inspiration/scroll-animation
    // Adapted: shapes are revealed in stages and sorted into place around one closing question.
    A("P1#066", [
      P("fq", "card", 200, 176, { w: 320, h: 170, ic: "q", lab: "Why now?|How proven?", col: C.plum, is: 54, ls: 18 }),
      P("fr", "pill", 200, 300, { w: 260, h: 36, lab: "Take it to forum", ic: "chat", tone: "solid", ls: 14 }),
      P("cq", "pill", 200, 348, { w: 300, h: 36, lab: "Keep asking this question", ic: "loop", tone: "ok", ls: 13 })
    ], [
      { t: "Question decisions critically", on: ["fq", "fr"], hot: ["fq"] },
      { t: "The question to remember", on: ["cq"], hot: ["cq"] }
    ])
  ]);

})();
// END FILE w02-claude-v2-part4.js

