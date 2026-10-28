// Small SVG diagram kit for OPER621 (lesson moments, review moments and "pick the right diagram" questions).
// Every function returns an SVG string drawn for a dark background (both looks and the quiz stage are dark).
// Step labels: "|" breaks a line. Prefix a label to mark it: "*" highlight, "!" problem, "+" good, "~" dashed/ghost.
(() => {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const C = { box: "rgba(255,255,255,.10)", line: "rgba(255,255,255,.55)", hi: "#FFB84D", bad: "#FF6B6B", good: "#3DD68C", ink: "currentColor", dark: "#10131a", soft: "rgba(255,255,255,.65)" };
  const parse = (s) => { s = String(s); const k = { "*": "hi", "!": "bad", "+": "good", "~": "ghost" }[s[0]]; return k ? [k, s.slice(1)] : ["", s]; };
  function txt(x, y, label, o = {}) {
    const size = o.size || 11, ls = String(label).split("|"), y0 = y - ((ls.length - 1) * size * 1.15) / 2;
    return `<text x="${x}" y="${y0}" font-size="${size}" font-weight="${o.weight || 700}" text-anchor="${o.anchor || "middle"}" dominant-baseline="middle" fill="${o.fill || C.ink}"${o.italic ? ' font-style="italic"' : ""}>${ls.map((l, i) => `<tspan x="${x}" dy="${i ? size * 1.15 : 0}">${esc(l)}</tspan>`).join("")}</text>`;
  }
  function box(x, y, w, h, label, k = "", size = 11) {
    const f = k === "hi" ? C.hi : k === "good" ? "rgba(61,214,140,.22)" : k === "bad" ? "rgba(255,107,107,.22)" : C.box;
    const s = k === "hi" ? C.hi : k === "good" ? C.good : k === "bad" ? C.bad : C.line;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${f}" stroke="${s}" stroke-width="1.5"${k === "ghost" ? ' stroke-dasharray="4 3"' : ""}/>` + txt(x + w / 2, y + h / 2, label, { size, fill: k === "hi" ? C.dark : C.ink });
  }
  const arrowH = (x1, y, x2, col = C.line) => `<path d="M${x1} ${y}H${x2 - 5}" stroke="${col}" stroke-width="1.6" fill="none"/><path d="M${x2 - 6} ${y - 4}L${x2} ${y}L${x2 - 6} ${y + 4}Z" fill="${col}"/>`;
  const svg = (w, h, body, alt) => `<svg class="dg" viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(alt || "Diagram")}" xmlns="http://www.w3.org/2000/svg" font-family="Atkinson Hyperlegible, system-ui, sans-serif" preserveAspectRatio="xMidYMid meet">${body}</svg>`;

  const D = {};
  // Horizontal flow of boxes. o.bracket = [from, to, label] draws a boundary bracket above; o.h box height.
  D.flow = (steps, o = {}) => {
    const n = steps.length, gap = n > 5 ? 9 : 14, W = 320, w = (W - 8 - (n - 1) * gap) / n, h = o.h || 46, top = o.bracket ? 30 : 6, size = o.size || (n > 5 ? 8.5 : n > 4 ? 9.5 : 11);
    let b = "";
    steps.forEach((s, i) => { const [k, l] = parse(s), x = 4 + i * (w + gap); b += box(x, top, w, h, l, k, size); if (i < n - 1) b += arrowH(x + w + 1, top + h / 2, x + w + gap - 1); });
    if (o.bracket) {
      const [a, z, lab] = o.bracket, x1 = 4 + a * (w + gap), x2 = 4 + z * (w + gap) + w;
      b += `<path d="M${x1} 24V14H${x2}V24" stroke="${C.hi}" stroke-width="2" fill="none"/>` + txt((x1 + x2) / 2, 7, lab || "", { size: 10, fill: C.hi });
    }
    return svg(W, top + h + 6, b, o.alt || steps.map((s) => parse(s)[1].replace(/\|/g, " ")).join(", then "));
  };
  // Swimlanes: lanes = names; steps = [[laneIndex, label], ...]. Lane changes are handoffs (marked with a dot).
  D.lanes = (lanes, steps, o = {}) => {
    const L = 70, W = 320, rh = o.rh || 34, n = steps.length, cw = (W - L - 4) / n, H = lanes.length * rh + 4;
    let b = lanes.map((ln, i) => `<rect x="2" y="${2 + i * rh}" width="${W - 4}" height="${rh}" fill="${i % 2 ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.08)"}"/>` + txt(8, 2 + i * rh + rh / 2, ln, { size: 9.5, anchor: "start", fill: C.soft })).join("");
    const pos = steps.map(([ln], i) => [L + i * cw + cw / 2, 2 + ln * rh + rh / 2]);
    let hand = 0;
    for (let i = 0; i < n - 1; i++) {
      const [x1, y1] = pos[i], [x2, y2] = pos[i + 1], bw = Math.min(cw - 8, 58) / 2;
      if (y1 === y2) b += arrowH(x1 + bw, y1, x2 - bw);
      else { hand++; const mx = (x1 + x2) / 2; b += `<path d="M${x1 + bw} ${y1}H${mx}V${y2}H${x2 - bw - 4}" stroke="${o.handCol || C.hi}" stroke-width="1.6" fill="none"/><path d="M${x2 - bw - 5} ${y2 - 4}L${x2 - bw + 1} ${y2}L${x2 - bw - 5} ${y2 + 4}Z" fill="${o.handCol || C.hi}"/>` + (o.dots === false ? "" : `<circle cx="${mx}" cy="${(y1 + y2) / 2}" r="4.5" fill="${o.handCol || C.hi}"/>`); }
    }
    steps.forEach(([, s], i) => { const [k, l] = parse(s), bw = Math.min(cw - 8, 58); b += box(pos[i][0] - bw / 2, pos[i][1] - (rh - 10) / 2, bw, rh - 10, l, k, 8.5); });
    return svg(W, H, b, o.alt || `${n} steps across ${lanes.length} teams, ${hand} handoffs`);
  };
  // Process hierarchy: rows = [[level, example], ...], hi = highlighted row (or -1).
  D.hier = (rows, hi = -1, o = {}) => {
    const W = 320, h = 30, g = 6;
    const b = rows.map(([lv, ex], i) => { const w = 312 - i * 24, y = 4 + i * (h + g), on = i === hi;
      return `<rect x="4" y="${y}" width="${w}" height="${h}" rx="6" fill="${on ? C.hi : `rgba(108,155,255,${0.42 - i * 0.07})`}" stroke="${on ? C.hi : "rgba(255,255,255,.25)"}"/>` +
        txt(12, y + h / 2, lv, { size: 11, anchor: "start", fill: on ? C.dark : C.ink }) + txt(w - 4, y + h / 2, ex, { size: 9.5, anchor: "end", weight: 400, italic: true, fill: on ? C.dark : C.ink }); }).join("");
    return svg(W, rows.length * (h + g) + 4, b, o.alt || rows.map((r) => r.join(": ")).join("; "));
  };
  // Maturity staircase (5 levels). hi = highlighted level index, or -1.
  D.stairs = (hi = -1, o = {}) => {
    const lv = o.labels || ["Initial", "Repeatable", "Defined", "Managed", "Optimising"], W = 320, H = 150, w = 58, g = 5;
    const b = lv.map((l, i) => { const h = 34 + i * 24, x = 4 + i * (w + g), y = H - 4 - h, on = i === hi || (Array.isArray(hi) && hi.includes(i));
      return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${on ? C.hi : `rgba(108,155,255,${0.25 + i * 0.1})`}" stroke="${on ? C.hi : "rgba(255,255,255,.3)"}"/>` +
        txt(x + w / 2, y + 13, String(i + 1), { size: 14, fill: on ? C.dark : C.ink }) + txt(x + w / 2, y + 30, l, { size: 8.5, fill: on ? C.dark : C.ink }); }).join("");
    return svg(W, H, b, o.alt || `Five maturity levels${hi >= 0 ? `, level ${hi + 1} ${lv[hi]} highlighted` : ""}`);
  };
  // Org chart columns. mode "silo": each department optimises upward. mode "process": the customer's flow crosses them.
  D.org = (mode = "process", o = {}) => {
    const d = o.depts || ["Front desk", "Revenue", "House-|keeping", "Finance"], W = 320, H = 150, cw = 66, g = 12, x0 = 10;
    let b = `<rect x="110" y="4" width="100" height="22" rx="5" fill="${C.box}" stroke="${C.line}"/>` + txt(160, 15, o.top || "General Manager", { size: 9.5 });
    d.forEach((n, i) => { const x = x0 + i * (cw + g); b += `<path d="M160 26V36H${x + cw / 2}V44" stroke="${C.line}" fill="none"/>` + box(x, 44, cw, 30, n, "", 9);
      b += `<rect x="${x + cw / 2 - 9}" y="80" width="18" height="56" rx="4" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.2)"/>`;
      if (mode === "silo") b += `<path d="M${x + cw / 2} 132V84" stroke="${C.good}" stroke-width="2.5"/><path d="M${x + cw / 2 - 5} 90L${x + cw / 2} 82L${x + cw / 2 + 5} 90Z" fill="${C.good}"/>`; });
    if (mode === "process") {
      b += `<path d="M2 108H${W - 12}" stroke="${C.hi}" stroke-width="3" fill="none"/><path d="M${W - 14} 101L${W - 2} 108L${W - 14} 115Z" fill="${C.hi}"/>`;
      d.slice(0, -1).forEach((_, i) => { const x = x0 + (i + 1) * (cw + g) - g / 2; b += `<circle cx="${x}" cy="108" r="5" fill="${o.bad ? C.bad : C.dark}" stroke="${C.hi}" stroke-width="2"/>`; });
      b += txt(8, 124, o.from || "Guest arrives", { size: 9, anchor: "start", fill: C.hi }) + txt(W - 4, 124, o.to || "Guest in room", { size: 9, anchor: "end", fill: C.hi });
    }
    return svg(W, H, b, o.alt || (mode === "silo" ? "Organisation chart: each department optimises its own column" : "Organisation chart with the customer's flow crossing every department, handoffs marked"));
  };
  // Exhibit bars: rows = [[label, minutes, addsValue], ...]; show = how many rows to reveal (default all).
  D.bars = (rows, o = {}) => {
    const W = 320, h = 20, g = 6, max = Math.max(...rows.map((r) => r[1])), show = o.show == null ? rows.length : o.show;
    const b = rows.map(([l, m, v], i) => { const y = 4 + i * (h + g), w = (m / max) * 120, on = i < show;
      return `<g opacity="${on ? 1 : 0.18}">` + txt(4, y + h / 2, l, { size: 9.5, anchor: "start", weight: 400 }) +
        `<rect x="170" y="${y + 2}" width="${w}" height="${h - 4}" rx="4" fill="${v ? C.good : o.hiNo && on ? C.bad : "rgba(255,184,77,.8)"}"/>` + txt(176 + w, y + h / 2, `${m} min`, { size: 9.5, anchor: "start" }) + "</g>"; }).join("");
    return svg(W, rows.length * (h + g) + 4, b, o.alt || rows.map((r) => `${r[0]} ${r[1]} minutes${r[2] ? ", adds value" : ""}`).join("; "));
  };
  // BPM framework: 10 phases (2 rows) + continuous essentials band. hi = array of phase indexes; o.band highlights the band; o.back = [from, to].
  D.route = (hi = [], o = {}) => {
    const P = ["Organisation|strategy", "Process|architecture", "Launch|pad", "Understand", "Innovate", "People", "Develop", "Implement", "Realise|value", "Sustainable|performance"];
    const W = 320, w = 58, g = 7, h = 38, T = 20; let b = "";
    P.forEach((p, i) => { const r = i < 5 ? 0 : 1, c = i % 5, x = 4 + c * (w + g), y = T + r * (h + 20);
      b += box(x, y, w, h, p, hi.includes(i) ? "hi" : "", 8);
      if (c < 4) b += arrowH(x + w, y + h / 2, x + w + g); });
    b += `<path d="M${4 + 4 * (w + g) + w / 2} ${T + h}V${T + h + 10}H${4 + w / 2}V${T + h + 18}" stroke="${C.line}" fill="none" stroke-width="1.4"/>`;
    const by = T + 2 * h + 28;
    b += `<rect x="4" y="${by}" width="312" height="26" rx="6" fill="${o.band ? C.hi : "rgba(255,255,255,.06)"}" stroke="${o.band ? C.hi : C.line}" stroke-dasharray="4 3"/>` + txt(160, by + 13, "Project mgmt · People change mgmt · Leadership", { size: 9.5, fill: o.band ? C.dark : C.ink });
    if (o.back) { const pt = (i) => [4 + (i % 5) * (w + g) + w / 2, T + (i < 5 ? 0 : h + 20)];
      const [x1, y1] = pt(o.back[0]), [x2, y2] = pt(o.back[1]);
      b += `<path d="M${x1} ${y1}C${x1} ${y1 - 18} ${x2} ${y2 - 18} ${x2} ${y2 - 4}" stroke="${C.bad}" stroke-width="2.2" fill="none"/><path d="M${x2 - 5} ${y2 - 8}L${x2} ${y2}L${x2 + 5} ${y2 - 8}Z" fill="${C.bad}"/>`; }
    return svg(W, by + 30, b, o.alt || "Ten phases in sequence, with project management, people change management and leadership running through all of them");
  };
  // Project (a line that ends) versus discipline (a loop that keeps going).
  D.cycle = (kind = "loop", o = {}) => {
    const W = 320, H = 120; let b = "";
    if (kind === "line") {
      b += box(10, 40, 70, 40, "Start", "", 11) + arrowH(80, 60, 120) + box(120, 40, 80, 40, o.mid || "Fix the|process", "hi", 10) + arrowH(200, 60, 240) + box(240, 40, 70, 40, "Finish", "", 11);
    } else {
      b += `<circle cx="160" cy="60" r="44" fill="none" stroke="${C.hi}" stroke-width="3" stroke-dasharray="210 30"/><path d="M200 34l8 -10l4 14z" fill="${C.hi}"/>`;
      b += txt(160, 60, o.mid || "Own|Measure|Govern", { size: 10.5 });
      b += txt(20, 60, o.l || "Year 1", { size: 9.5, anchor: "start", fill: C.soft }) + txt(300, 60, o.r || "Year 5…", { size: 9.5, anchor: "end", fill: C.soft });
    }
    return svg(W, H, b, o.alt || (kind === "line" ? "A project: start, fix the process, finish" : "A continuous loop: own, measure, govern, year after year"));
  };
  // ---------- safe fallbacks: an unknown diagram type must never break a lesson ----------
  // Known "extra" types used by some weeks (matrix2x2, progress, branch) get a small dedicated drawing; any other unknown
  // name (lines, cards, curve, ...) gets a plain card list built from every text argument. All are counted in DIAG.__fb.
  const FB = {};
  const strs = (a, out = []) => { if (a == null || typeof a === "function") return out; if (Array.isArray(a)) a.forEach((x) => strs(x, out)); else if (typeof a === "object") Object.values(a).forEach((x) => strs(x, out)); else if (String(a).trim()) out.push(String(a).trim()); return out; };
  const wrapTxt = (s, n) => { const w = String(s).split(/\s+/); const ls = []; let l = ""; w.forEach((x) => { if ((l + " " + x).trim().length > n && l) { ls.push(l); l = x; } else l = (l + " " + x).trim(); }); if (l) ls.push(l); return ls.slice(0, 4).join("|"); };
  const cardsFb = (items, alt) => {
    items = items.slice(0, 10); const W = 320, cols = items.length > 3 ? 2 : 1, cw = (W - 8 - (cols - 1) * 8) / cols, ch = 40, rows = Math.ceil(items.length / cols); let b = "";
    items.forEach((s, i) => { const x = 4 + (i % cols) * (cw + 8), y = 4 + Math.floor(i / cols) * (ch + 8); b += box(x, y, cw, ch, wrapTxt(s, cols === 1 ? 44 : 22), i === 0 && items.length > 1 ? "hi" : "", 9.5); });
    return svg(W, rows * (ch + 8) + 4, b, alt || items.join(". "));
  };
  const fbMatrix = (cols, rows, cells) => {
    cols = [].concat(cols || []); rows = [].concat(rows || []); cells = [].concat(cells || []);
    if (cols.length !== 2 || rows.length !== 2) return null;
    const W = 320, lw = 70, cw = (W - lw - 8) / 2, hh = 26, ch = 52; let b = "";
    cols.forEach((c, i) => (b += txt(lw + 4 + i * cw + cw / 2 - 2, 13, wrapTxt(c, 20), { size: 9.5, fill: C.hi })));
    rows.forEach((r, j) => (b += txt(4 + lw / 2 - 2, hh + 4 + j * (ch + 4) + ch / 2, wrapTxt(r, 12), { size: 9, fill: C.hi })));
    for (let j = 0; j < 2; j++) for (let i = 0; i < 2; i++) b += box(lw + 4 + i * cw, hh + 4 + j * (ch + 4), cw - 4, ch, wrapTxt(cells[j * 2 + i] || "", 20), "", 9.5);
    return svg(W, hh + 8 + 2 * (ch + 4), b, `Two by two grid: ${rows.join(" and ")} against ${cols.join(" and ")}. ${cells.join(", ")}`);
  };
  const fbProgress = (label, v, max, unit) => {
    v = Number(v); max = Number(max) || 100; if (!Number.isFinite(v)) return null; const W = 320, f = Math.max(0, Math.min(1, v / max)); unit = unit || "";
    const b = txt(160, 14, String(label || ""), { size: 11 }) + `<rect x="10" y="30" width="300" height="22" rx="11" fill="${C.box}" stroke="${C.line}"/><rect x="10" y="30" width="${300 * f}" height="22" rx="11" fill="${C.hi}"/>` + txt(160, 41, `${v}${unit} of ${max}${unit}`, { size: 11, fill: f > 0.5 ? C.dark : C.ink });
    return svg(W, 62, b, `${label}: ${v}${unit} out of ${max}${unit}`);
  };
  const fbBranch = (root, kids) => {
    kids = [].concat(kids || []).map(String).slice(0, 4); if (!kids.length) return null; const W = 320, n = kids.length, g = 8, w = (W - 8 - (n - 1) * g) / n; let b = box(70, 4, 180, 34, wrapTxt(root, 30), "hi", 10);
    kids.forEach((k, i) => { const x = 4 + i * (w + g); b += `<path d="M160 38V50H${x + w / 2}V62" stroke="${C.line}" fill="none" stroke-width="1.5"/>` + box(x, 62, w, 56, wrapTxt(k, n > 2 ? 11 : 18), "", n > 3 ? 8.5 : 9.5); });
    return svg(W, 124, b, `${root}, leading to: ${kids.join(", ")}`);
  };
  const fallback = (name, args) => {
    FB[name] = (FB[name] || 0) + 1;
    try {
      const r = name === "matrix2x2" ? fbMatrix(...args) : name === "progress" ? fbProgress(...args) : name === "branch" ? fbBranch(...args) : null;
      if (r) return r;
      const items = strs(args); return cardsFb(items.length ? items : [name]);
    } catch (e) { return svg(320, 40, box(4, 4, 312, 32, String(name), "", 10), String(name)); }
  };
  Object.defineProperty(D, "__fb", { get: () => FB, enumerable: false });
  window.addEventListener("load", () => { const n = Object.values(FB).reduce((a, b) => a + b, 0); if (n) console.info("[DIAG fallback] " + n + " diagram(s) drawn by the safe fallback: " + JSON.stringify(FB)); });
  window.DIAG = new Proxy(D, { get: (t, k) => (k in t || typeof k !== "string" || k === "then" || k === "toJSON" ? t[k] : (...a) => fallback(k, a)) });
})();
