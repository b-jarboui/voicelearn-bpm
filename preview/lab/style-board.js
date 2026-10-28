// FILE: lab/style-board.js
/*
 * VoiceLearn - Animated Whiteboard v2
 * Narration-synchronised, seekable teaching visuals.
 * Requires LAB and GSAP 3.12.5; no GSAP plugins.
 */
 
(() => {
  "use strict";
 
  const ID = "board";
  const NAME = "Animated Whiteboard";
  const NOTE = "Concepts, annotations and process diagrams drawn as the professor explains them.";
  const STYLE_ID = "vl-board-v1";
  const NS = "http://www.w3.org/2000/svg";
 
  const gs = () => window.gsap;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const finite = (v, fallback = 0) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  };
 
  const reduced = () => {
    try {
      return Boolean(
        window.LAB?.reducedMotion?.() ||
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
      );
    } catch (_) {
      return false;
    }
  };
 
  const html = (tag, cls = "", value = null) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (value !== null) n.textContent = String(value);
    return n;
  };
 
  const svg = (tag, attrs = {}) => {
    const n = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, String(v)));
    return n;
  };
 
  const decorative = n => {
    n.setAttribute("aria-hidden", "true");
    return n;
  };
 
  const CSS = `
.vb-root {
  --vb-bg:#fbfaf5;
  --vb-ink:#202f39;
  --vb-muted:#455965;
  --vb-blue:#17619a;
  --vb-orange:#a64c16;
  --vb-green:#176b4b;
  --vb-red:#a63232;
  --vb-rule:#d9dfdc;
  --vb-soft:#eef3f4;
  --vb-warm:#fff0dc;
  --vb-bad:#fff0ed;
  --vb-good:#e8f5ee;
  position:relative;
  isolation:isolate;
  width:100%;
  height:100%;
  min-width:0;
  min-height:0;
  overflow:hidden;
  background:var(--vb-bg);
  color:var(--vb-ink);
  font-family:"Atkinson Hyperlegible",system-ui,sans-serif;
  line-height:1.45;
  container-type:size;
}
 
body .player .look.vb-root {
  background:var(--vb-bg) !important;
}
 
.vb-root,
.vb-root *,
.vb-root *::before,
.vb-root *::after {
  box-sizing:border-box;
}
 
.vb-root .vb-paper {
  position:absolute;
  inset:0;
  pointer-events:none;
  background:linear-gradient(
    to bottom,
    transparent 31px,
    var(--vb-rule) 32px
  ) 0 0/100% 32px;
  opacity:.22;
}
 
.vb-root .vb-stage {
  position:absolute;
  inset:0;
  overflow:hidden;
}
 
.vb-root .vb-scene {
  position:absolute;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:12px;
  overflow:hidden;
  visibility:hidden;
}
 
.vb-root .vb-scene.vb-active {
  visibility:visible;
}
 
.vb-root .vb-fit {
  position:relative;
  flex:none;
  width:100%;
  max-width:850px;
  transform-origin:center center;
}
 
.vb-root .vb-content {
  display:flex;
  flex-direction:column;
  align-items:stretch;
  gap:18px;
  width:100%;
  min-width:0;
}
 
.vb-root .vb-moment {
  position:relative;
  min-width:0;
  overflow-wrap:anywhere;
}
 
.vb-root .vb-kicker {
  display:block;
  margin:0 0 10px;
  color:var(--vb-blue);
  font-size:13px;
  font-weight:800;
  letter-spacing:.065em;
  line-height:1.35;
}
 
.vb-root h2,
.vb-root h3,
.vb-root p {
  margin:0;
}
 
.vb-root h2,
.vb-root h3 {
  font-family:"Bricolage Grotesque",system-ui,sans-serif;
  font-weight:800;
  letter-spacing:-.025em;
}
 
.vb-root h2 {
  font-size:clamp(27px,4.4cqw,48px);
  line-height:1.15;
  text-wrap:balance;
}
 
.vb-root h3 {
  font-size:clamp(23px,3cqw,34px);
  line-height:1.2;
}
 
.vb-root p {
  font-size:clamp(17px,2.05cqw,22px);
  line-height:1.48;
}
 
.vb-root .vb-wipe {
  display:block;
  min-width:0;
}
 
.vb-root .vb-title {
  max-width:760px;
}
 
.vb-root .vb-title h2 {
  max-width:28ch;
}
 
.vb-root .vb-cover {
  display:flex;
  flex-direction:column;
  gap:16px;
  align-items:flex-start;
}
 
.vb-root .vb-cover h2 {
  max-width:25ch;
}
 
.vb-root .vb-cover-note {
  color:var(--vb-muted);
  font-size:17px;
}
 
.vb-root .vb-mark {
  display:block;
  width:min(100%,440px);
  height:24px;
  overflow:visible;
  color:var(--vb-orange);
}
 
.vb-root .vb-mark path,
.vb-root .vb-fraction-line path {
  fill:none;
  stroke:currentColor;
  stroke-width:3;
  stroke-linecap:round;
  stroke-linejoin:round;
}
 
.vb-root .vb-item {
  display:grid;
  grid-template-columns:76px minmax(0,1fr);
  gap:20px;
  align-items:start;
}
 
.vb-root .vb-icon {
  display:grid;
  place-items:center;
  width:72px;
  height:72px;
  border:2px solid var(--vb-blue);
  border-radius:16px 13px 17px 12px;
  background:var(--vb-soft);
  color:var(--vb-blue);
}
 
.vb-root .vb-icon svg {
  width:42px;
  height:42px;
  overflow:visible;
}
 
.vb-root .vb-item-body {
  display:flex;
  flex-direction:column;
  gap:10px;
}
 
.vb-root .vb-item-index {
  color:var(--vb-blue);
  font-size:13px;
  font-weight:800;
}
 
.vb-root .vb-question {
  display:flex;
  flex-direction:column;
  gap:12px;
  max-width:780px;
}
 
.vb-root .vb-question-symbol {
  color:var(--vb-orange);
  font-family:"Bricolage Grotesque",system-ui,sans-serif;
  font-size:64px;
  font-weight:800;
  line-height:1;
}
 
.vb-root .vb-question h2 {
  max-width:27ch;
}
 
.vb-root .vb-statement {
  max-width:780px;
}
 
.vb-root .vb-statement p {
  font-family:"Bricolage Grotesque",system-ui,sans-serif;
  font-size:clamp(24px,3.5cqw,39px);
  font-weight:750;
  line-height:1.28;
  letter-spacing:-.015em;
}
 
.vb-root .vb-formula {
  width:100%;
  max-width:700px;
}
 
.vb-root .vb-fraction {
  display:flex;
  flex-direction:column;
  align-items:stretch;
  gap:12px;
  width:100%;
  margin-top:18px;
  text-align:center;
  font-family:"Bricolage Grotesque",system-ui,sans-serif;
  font-size:clamp(23px,3.1cqw,35px);
  font-weight:750;
  line-height:1.3;
}
 
.vb-root .vb-fraction-line {
  display:block;
  width:100%;
  height:14px;
  overflow:visible;
  color:var(--vb-blue);
}
 
.vb-root .vb-issue-list {
  display:flex;
  flex-direction:column;
  gap:12px;
}
 
.vb-root .vb-issue {
  display:grid;
  grid-template-columns:40px minmax(0,1fr);
  gap:12px;
  align-items:start;
  max-width:780px;
}
 
.vb-root .vb-issue-sign {
  display:grid;
  place-items:center;
  width:38px;
  height:38px;
  border:2px solid var(--vb-red);
  border-radius:50%;
  color:var(--vb-red);
  font-size:24px;
  font-weight:800;
}
 
.vb-root .vb-issue-body {
  display:flex;
  flex-direction:column;
  gap:9px;
}
 
.vb-root .vb-effect {
  align-self:flex-start;
  padding:5px 10px;
  border:2px solid var(--vb-red);
  border-radius:6px;
  background:var(--vb-bad);
  color:var(--vb-red);
  font-size:14px;
  font-weight:800;
}
 
.vb-root .vb-pair {
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:22px;
  width:100%;
}
 
.vb-root .vb-compare {
  position:relative;
  display:flex;
  flex-direction:column;
  gap:10px;
  min-width:0;
  padding:17px 19px;
  border:2px solid var(--vb-blue);
  border-radius:13px 16px 12px 15px;
  background:var(--vb-soft);
}
 
.vb-root .vb-compare[data-side="b"] {
  border-color:var(--vb-orange);
  background:var(--vb-warm);
}
 
.vb-root .vb-compare .vb-kicker {
  margin:0;
}
 
.vb-root .vb-compare[data-side="b"] .vb-kicker {
  color:var(--vb-orange);
}
 
.vb-root .vb-compare p {
  font-size:clamp(16px,1.9cqw,21px);
}
 
.vb-root .vb-direction {
  font-size:29px;
  font-weight:800;
  line-height:1;
  color:var(--vb-blue);
}
 
.vb-root .vb-compare[data-side="b"] .vb-direction {
  color:var(--vb-orange);
}
 
.vb-root .vb-diagram {
  display:flex;
  flex-direction:column;
  gap:11px;
  width:100%;
}
 
.vb-root .vb-diagram .vb-kicker {
  margin:0;
}
 
.vb-root .vb-diagram-frame {
  width:100%;
  min-width:0;
  padding:12px;
  border:2px solid var(--vb-rule);
  border-radius:12px;
  background:var(--vb-bg);
  color:var(--vb-ink);
}
 
.vb-root .vb-diagram-frame svg.dg {
  display:block;
  width:100%;
  height:auto;
  max-height:300px;
  margin:auto;
  overflow:visible;
}
 
.vb-root .vb-diagram-caption {
  color:var(--vb-muted);
  font-size:clamp(15px,1.65cqw,18px);
  line-height:1.45;
}
 
.vb-root svg.dg text {
  fill:var(--vb-ink);
}
 
.vb-root svg.dg text[fill="#10131a"] {
  fill:var(--vb-ink);
}
 
.vb-root svg.dg text[fill="#FFB84D"] {
  fill:var(--vb-orange);
  font-weight:800;
}
 
.vb-root svg.dg rect[fill="rgba(255,255,255,.10)"],
.vb-root svg.dg rect[fill="rgba(255,255,255,.08)"],
.vb-root svg.dg rect[fill="rgba(255,255,255,.06)"],
.vb-root svg.dg rect[fill="rgba(255,255,255,.04)"] {
  fill:var(--vb-bg);
  stroke-width:2.2;
  stroke-linejoin:round;
}
 
.vb-root svg.dg rect[stroke="rgba(255,255,255,.55)"],
.vb-root svg.dg rect[stroke="rgba(255,255,255,.3)"],
.vb-root svg.dg rect[stroke="rgba(255,255,255,.25)"],
.vb-root svg.dg rect[stroke="rgba(255,255,255,.2)"] {
  stroke:var(--vb-ink);
}
 
.vb-root svg.dg path[stroke="rgba(255,255,255,.55)"] {
  stroke:var(--vb-blue);
  stroke-width:2.4;
  stroke-linecap:round;
}
 
.vb-root svg.dg path[fill="rgba(255,255,255,.55)"] {
  fill:var(--vb-blue);
}
 
.vb-root svg.dg [stroke="#FFB84D"] {
  stroke:var(--vb-orange);
}
 
.vb-root svg.dg :not(text)[fill="#FFB84D"] {
  fill:#f6bf71;
}
 
.vb-root svg.dg [stroke="#FF6B6B"] {
  stroke:var(--vb-red);
}
 
.vb-root svg.dg [fill="#FF6B6B"] {
  fill:var(--vb-red);
}
 
.vb-root svg.dg [stroke="#3DD68C"] {
  stroke:var(--vb-green);
}
 
.vb-root svg.dg [fill="#3DD68C"] {
  fill:var(--vb-green);
}
 
@container (max-width:500px) {
  .vb-root .vb-content {
    gap:15px;
  }
 
  .vb-root .vb-item {
    grid-template-columns:54px minmax(0,1fr);
    gap:12px;
  }
 
  .vb-root .vb-icon {
    width:52px;
    height:52px;
    border-radius:12px;
  }
 
  .vb-root .vb-icon svg {
    width:30px;
    height:30px;
  }
 
  .vb-root .vb-pair {
    grid-template-columns:1fr;
    gap:12px;
  }
 
  .vb-root .vb-compare {
    padding:12px 14px;
  }
 
  .vb-root .vb-diagram-frame {
    padding:7px;
  }
 
  .vb-root .vb-question-symbol {
    font-size:48px;
  }
}
 
@container (max-height:380px) {
  .vb-root .vb-content {
    gap:9px;
  }
 
  .vb-root .vb-kicker {
    margin-bottom:5px;
  }
 
  .vb-root .vb-mark {
    height:15px;
  }
 
  .vb-root .vb-diagram {
    gap:6px;
  }
 
  .vb-root .vb-diagram-frame {
    padding:6px;
  }
 
  .vb-root .vb-diagram-frame svg.dg {
    max-height:50cqh;
  }
 
  .vb-root .vb-diagram-caption {
    line-height:1.3;
  }
}
 
:root[data-theme="dark"] .vb-root {
  --vb-bg:#17242a;
  --vb-ink:#f5f5ed;
  --vb-muted:#d3dedf;
  --vb-blue:#87caff;
  --vb-orange:#ffbb78;
  --vb-green:#83e3b2;
  --vb-red:#ff9e9e;
  --vb-rule:#3a4b51;
  --vb-soft:#243840;
  --vb-warm:#403124;
  --vb-bad:#422c30;
  --vb-good:#233f35;
}
 
@media (prefers-color-scheme:dark) {
  :root:not([data-theme="light"]) .vb-root {
    --vb-bg:#17242a;
    --vb-ink:#f5f5ed;
    --vb-muted:#d3dedf;
    --vb-blue:#87caff;
    --vb-orange:#ffbb78;
    --vb-green:#83e3b2;
    --vb-red:#ff9e9e;
    --vb-rule:#3a4b51;
    --vb-soft:#243840;
    --vb-warm:#403124;
    --vb-bad:#422c30;
    --vb-good:#233f35;
  }
}
 
@media (prefers-reduced-motion:reduce) {
  .vb-root *,
  .vb-root *::before,
  .vb-root *::after {
    animation:none !important;
    transition:none !important;
  }
}
`;
 
  function installCSS() {
    if (document.getElementById(STYLE_ID)) return;
    const style = html("style");
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  }
 
  function wipe(parent, child) {
    child.classList.add("vb-wipe");
    parent.appendChild(child);
    return child;
  }
 
  function mark(kind = "underline") {
    const s = decorative(svg("svg", {
      viewBox: "0 0 440 24",
      preserveAspectRatio: "none",
      class: "vb-mark"
    }));
 
    const d = kind === "circle"
      ? "M18 12 C32 2 111 1 218 3 C341 3 421 5 424 12 C426 21 337 23 218 21 C100 22 18 20 18 12"
      : "M4 12 C86 9 132 15 220 11 S353 10 436 12";
 
    s.appendChild(svg("path", {
      d,
      fill: "none",
      stroke: "currentColor",
      "stroke-width": kind === "circle" ? 2.4 : 3.4,
      "stroke-linecap": "round"
    }));
 
    return s;
  }
 
  function makeIcon(name) {
    const holder = decorative(html("span", "vb-icon"));
 
    try {
      if (typeof window.LAB?.icon === "function") {
        const known = new Set([
          "target", "check", "eq", "clock", "one",
          "link", "gauge", "chart", "users", "flask",
          "layers", "dash", "brain", "audit", "flag",
          "route", "key", "loop"
        ]);
 
        const safeName = known.has(name) ? name : "layers";
        holder.innerHTML = window.LAB.icon(safeName, "vb-line-icon");
      }
    } catch (_) {
      holder.replaceChildren();
    }
 
    return holder;
  }
 
  function makeTitle(m) {
    const e = html("article", "vb-moment vb-title");
    if (m.kicker) wipe(e, html("span", "vb-kicker", m.kicker));
    wipe(e, html("h2", "", m.text));
    e.appendChild(mark());
    return e;
  }
 
  function makeItem(m) {
    const e = html("article", "vb-moment vb-item");
    const body = html("div", "vb-item-body");
 
    wipe(body, html("h3", "", m.title));
    wipe(body, html("p", "", m.text));
 
    if (m.n !== undefined && m.n !== null) {
      wipe(
        body,
        html(
          "span",
          "vb-item-index",
          m.of ? `${m.n} of ${m.of}` : String(m.n)
        )
      );
    }
 
    e.append(makeIcon(m.icon), body);
    return e;
  }
 
  function makeQuestion(m) {
    const e = html("article", "vb-moment vb-question");
    e.appendChild(decorative(html("span", "vb-question-symbol", "?")));
    wipe(e, html("h2", "", m.text));
    e.appendChild(mark());
    return e;
  }
 
  function makeStatement(m) {
    const e = html("article", "vb-moment vb-statement");
    wipe(e, html("span", "vb-kicker", "Key takeaway"));
    wipe(e, html("p", "", m.text));
    e.appendChild(mark());
    return e;
  }
 
  function makeFormula(m) {
    const e = html("article", "vb-moment vb-formula");
 
    wipe(
      e,
      html("span", "vb-kicker", m.label || "The calculation")
    );
 
    const fraction = html("div", "vb-fraction");
    fraction.setAttribute("role", "group");
    fraction.setAttribute(
      "aria-label",
      `${m.num ?? ""} divided by ${m.den ?? ""}`
    );
 
    const numerator = wipe(fraction, html("div", "", m.num));
    numerator.setAttribute("aria-hidden", "true");
 
    const line = decorative(svg("svg", {
      viewBox: "0 0 440 14",
      preserveAspectRatio: "none",
      class: "vb-fraction-line"
    }));
 
    line.appendChild(svg("path", {
      d: "M3 7 Q120 5 220 7 T437 7",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 3,
      "stroke-linecap": "round"
    }));
 
    fraction.appendChild(line);
 
    const denominator = wipe(fraction, html("div", "", m.den));
    denominator.setAttribute("aria-hidden", "true");
 
    e.appendChild(fraction);
    return e;
  }
 
  function makeIssue(m) {
    const e = html("article", "vb-moment vb-issue");
 
    e.appendChild(
      decorative(html("span", "vb-issue-sign", "!"))
    );
 
    const body = html("div", "vb-issue-body");
    wipe(body, html("p", "", m.text));
 
    if (m.effect) {
      wipe(body, html("span", "vb-effect", m.effect));
    }
 
    e.appendChild(body);
    return e;
  }
 
  function makeCompare(m) {
    const e = html("article", "vb-moment vb-compare");
    e.dataset.side = m.side === "b" ? "b" : "a";
 
    if (m.dir === "up" || m.dir === "down") {
      e.appendChild(
        decorative(
          html(
            "span",
            "vb-direction",
            m.dir === "up" ? "\u2191" : "\u2193"
          )
        )
      );
    }
 
    wipe(e, html("span", "vb-kicker", m.label || "Comparison"));
    wipe(e, html("p", "", m.note));
 
    return e;
  }
 
  function makeDiagram(m) {
    const e = html("article", "vb-moment vb-diagram");
 
    wipe(
      e,
      html("span", "vb-kicker", m.kicker || "Process view")
    );
 
    const frame = html("div", "vb-diagram-frame");
 
    if (typeof m.svg === "string") {
      frame.innerHTML = m.svg;
    }
 
    e.appendChild(frame);
 
    if (m.caption) {
      wipe(
        e,
        html("p", "vb-diagram-caption", m.caption)
      );
    }
 
    return e;
  }
 
  function makeMoment(m) {
    switch (m?.type) {
      case "title": return makeTitle(m);
      case "item": return makeItem(m);
      case "question": return makeQuestion(m);
      case "statement": return makeStatement(m);
      case "formula": return makeFormula(m);
      case "issue": return makeIssue(m);
      case "compare": return makeCompare(m);
      case "diagram": return makeDiagram(m);
      default:
        return makeStatement({
          text: m?.text || m?.title || m?.note || ""
        });
    }
  }
 
  function pathLength(path) {
    try {
      const n = path.getTotalLength();
      return Number.isFinite(n) && n > 0 ? n : 0;
    } catch (_) {
      return 0;
    }
  }
 
  function bounds(element) {
    try {
      return element.getBBox();
    } catch (_) {
      return null;
    }
  }
 
  function diagramParts(rootSvg) {
    const parts = [];
    const drawable = new Set([
      "rect", "circle", "ellipse", "line",
      "polyline", "polygon", "path", "text"
    ]);
 
    function walk(parent) {
      let previous = null;
 
      for (const child of Array.from(parent.children)) {
        const tag = child.localName?.toLowerCase();
 
        if (tag === "g") {
          walk(child);
          previous = null;
          continue;
        }
 
        if (!drawable.has(tag)) {
          previous = null;
          continue;
        }
 
        const fill = (
          child.getAttribute("fill") || ""
        ).toLowerCase();
 
        const stroke = (
          child.getAttribute("stroke") || ""
        ).toLowerCase();
 
        const edge =
          tag === "path" &&
          (fill === "none" || fill === "") &&
          stroke !== "none" &&
          Boolean(stroke);
 
        const head =
          tag === "path" &&
          fill !== "none" &&
          fill !== "";
 
        if (tag === "text" && previous?.kind === "node") {
          previous.elements.push(child);
          continue;
        }
 
        if (head && previous?.kind === "edge") {
          previous.elements.push(child);
          continue;
        }
 
        const part = {
          kind: edge ? "edge" : "node",
          elements: [child]
        };
 
        parts.push(part);
        previous = part;
      }
    }
 
    walk(rootSvg);
 
    /*
     * Geometry-aware ordering.
     *
     * Edges are positioned after the smallest
     * containing source node. This corrects
     * swimlane SVGs that declare arrows before
     * their boxes.
     *
     * When no source node can be identified,
     * preserve the original relative ordering
     * among unmatched edges.
     */
 
    const nodes = parts.filter(p => p.kind === "node");
    const edges = parts.filter(p => p.kind === "edge");
 
    const output = [...nodes];
 
    const groups = new Map();
    const unmatched = [];
 
    edges.forEach(edge => {
      let start = null;
 
      try {
        start = edge.elements[0].getPointAtLength(0);
      } catch (_) {
        start = null;
      }
 
      let chosen = null;
      let smallest = Infinity;
 
      if (start) {
        nodes.forEach(node => {
          const box = bounds(node.elements[0]);
          if (!box) return;
 
          const inside =
            start.x >= box.x - 3 &&
            start.x <= box.x + box.width + 3 &&
            start.y >= box.y - 3 &&
            start.y <= box.y + box.height + 3;
 
          const area = box.width * box.height;
 
          if (inside && area < smallest) {
            smallest = area;
            chosen = node;
          }
        });
      }
 
      if (chosen) {
        if (!groups.has(chosen)) groups.set(chosen, []);
        groups.get(chosen).push(edge);
      } else {
        unmatched.push(edge);
      }
    });
 
    const ordered = [];
 
    output.forEach(node => {
      ordered.push(node);
 
      const following = groups.get(node);
      if (following) ordered.push(...following);
    });
 
    ordered.push(...unmatched);
 
    return ordered;
  }
 
  /*
   * A compact diagram animation plan.
   *
   * One tween per node group or edge, rather
   * than one tween for every SVG primitive.
   *
   * The total number of animated parts is
   * capped to protect mid-range devices.
   */
 
  function compactParts(parts, max = 24) {
    if (parts.length <= max) return parts;
 
    const size = Math.ceil(parts.length / max);
    const result = [];
 
    for (let i = 0; i < parts.length; i += size) {
      const group = parts.slice(i, i + size);
 
      result.push({
        kind: group.every(p => p.kind === "edge")
          ? "edge"
          : "mixed",
        elements: group.flatMap(p => p.elements),
        members: group
      });
    }
 
    return result;
  }
 
  function prepareScene(scene) {
    scene.diagrams = [];
 
    scene.content.querySelectorAll("svg.dg").forEach(s => {
      scene.diagrams.push({
        svg: s,
        parts: compactParts(diagramParts(s))
      });
    });
  }
 
  function drawPath(tl, path, at, duration) {
    const length = pathLength(path);
 
    if (!length) {
      tl.fromTo(
        path,
        { opacity: 0 },
        {
          opacity: 1,
          duration: Math.max(.12, duration),
          ease: "power1.out",
          immediateRender: true
        },
        at
      );
      return;
    }
 
    const originalDash = path.style.strokeDasharray;
    const originalOffset = path.style.strokeDashoffset;
 
    /*
     * fromTo establishes the hidden stroke at
     * timeline initialisation, not at the
     * delayed animation position.
     *
     * Use a two-value dash pattern so no
     * terminal stub remains visible.
     */
 
    tl.fromTo(
      path,
      {
        strokeDasharray: `${length} ${length}`,
        strokeDashoffset: length,
        opacity: 1
      },
      {
        strokeDashoffset: 0,
        duration,
        ease: "power1.inOut",
        immediateRender: true
      },
      at
    );
 
    /*
     * Restore authored dash styling only after
     * drawing completes.
     */
 
    tl.set(
      path,
      {
        strokeDasharray: originalDash || "",
        strokeDashoffset: originalOffset || ""
      },
      at + duration
    );
  }
 
  function revealNode(tl, elements, at, duration) {
    tl.fromTo(
      elements,
      {
        opacity: 0,
        y: 5
      },
      {
        opacity: 1,
        y: 0,
        duration,
        ease: "power2.out",
        immediateRender: true
      },
      at
    );
  }
 
  function revealPart(tl, part, at, duration) {
    const members = part.members || [part];
 
    if (part.kind === "node") {
      revealNode(tl, part.elements, at, duration);
      return;
    }
 
    if (part.kind === "mixed") {
      /*
       * A mixed compact group reveals together.
       * This avoids dozens of tweens in complex
       * route and maturity diagrams.
       */
      revealNode(tl, part.elements, at, duration);
      return;
    }
 
    const strokes = [];
    const heads = [];
 
    members.forEach(member => {
      member.elements.forEach(element => {
        const fill = (
          element.getAttribute("fill") || ""
        ).toLowerCase();
 
        if (
          element.localName === "path" &&
          (fill === "none" || fill === "")
        ) {
          strokes.push(element);
        } else {
          heads.push(element);
        }
      });
    });
 
    if (strokes.length === 1) {
      drawPath(tl, strokes[0], at, duration);
    } else if (strokes.length > 1) {
      /*
       * Multiple short connectors use one
       * opacity reveal rather than many
       * independent stroke timelines.
       */
      revealNode(tl, strokes, at, duration);
    }
 
    if (heads.length) {
      tl.fromTo(
        heads,
        { opacity: 0 },
        {
          opacity: 1,
          duration: .14,
          ease: "power1.out",
          immediateRender: true
        },
        at + duration * .7
      );
    }
  }
 
  function diagramDuration(scene) {
    const sentences = Array.isArray(section?.sentences)
      ? section.sentences
      : [];
 
    const spoken = String(sentences[scene.at] || "");
 
    return clamp(
      spoken.length / 16 * .7,
      2.5,
      5
    );
  }
 
  function animateDiagram(tl, scene) {
    const duration = diagramDuration(scene);
 
    scene.diagrams.forEach((diagram, diagramIndex) => {
      const parts = diagram.parts;
      if (!parts.length) return;
 
      const start = .2 + diagramIndex * .12;
      const interval = duration / parts.length;
 
      parts.forEach((part, i) => {
        revealPart(
          tl,
          part,
          start + i * interval,
          Math.max(.12, interval * .9)
        );
      });
    });
  }
 
  /*
   * Sentence-synchronised groups.
   *
   * The first issue or comparison appears when
   * the scene starts.
   *
   * Later issues and comparison B are revealed
   * when subsequent narration sentences start.
   *
   * The scene remains mounted throughout.
   */
 
  function prepareSentenceGroups(scene) {
    scene.gates = [];
 
    const issues = Array.from(
      scene.content.querySelectorAll(".vb-issue")
    );
 
    issues.forEach((element, k) => {
      scene.gates.push({
        element,
        at: scene.at + k,
        kind: "issue"
      });
    });
 
    const compares = Array.from(
      scene.content.querySelectorAll(".vb-compare")
    );
 
    compares.forEach((element, k) => {
      const delayed =
        element.dataset.side === "b"
          ? Math.max(1, k)
          : k;
 
      scene.gates.push({
        element,
        at: scene.at + delayed,
        kind: "compare"
      });
    });
 
    /*
     * A delayed gate is valid only while this
     * scene is still active. Never postpone
     * content beyond the next scene boundary.
     */
 
    const next = scenes.find(
      s => s.at > scene.at
    );
 
    const limit = next
      ? next.at - 1
      : Math.max(
          scene.at,
          (section?.sentences?.length || 1) - 1
        );
 
    scene.gates.forEach(gate => {
      gate.at = Math.min(gate.at, limit);
    });
  }
 
  function applyGates(scene, sentenceIndex, animate = false) {
    const g = gs();
 
    scene.gates.forEach(gate => {
      const visible = sentenceIndex >= gate.at;
 
      if (!visible) {
        g?.killTweensOf(gate.element);
 
        if (g) {
          g.set(gate.element, {
            opacity: 0,
            y: 8
          });
        } else {
          gate.element.style.opacity = "0";
          gate.element.style.transform = "translateY(8px)";
        }
 
        gate.element.setAttribute("aria-hidden", "true");
        gate.element.inert = true;
        return;
      }
 
      gate.element.removeAttribute("aria-hidden");
      gate.element.inert = false;
 
      if (animate && g) {
        g.fromTo(
          gate.element,
          {
            opacity: 0,
            y: 8
          },
          {
            opacity: 1,
            y: 0,
            duration: .42,
            ease: "power2.out",
            overwrite: true
          }
        );
      } else if (g) {
        g.set(gate.element, {
          opacity: 1,
          y: 0
        });
      } else {
        gate.element.style.opacity = "1";
        gate.element.style.transform = "";
      }
    });
  }
 
  function animateScene(scene) {
    const g = gs();
    if (!g) return;
 
    const tl = g.timeline({
      paused: true
    });
 
    scene.timeline = tl;
 
    /*
     * Real masked left-to-right text wipe.
     * Clip-path is the deliberate exception
     * allowed by the Whiteboard contract.
     */
 
    const wipes = Array.from(
      scene.content.querySelectorAll(
        ".vb-wipe,.vb-question-symbol,.vb-diagram-frame"
      )
    ).filter(n => !n.closest(".vb-issue,.vb-compare"));
 
    wipes.slice(0, 16).forEach((target, i) => {
      tl.fromTo(
        target,
        {
          clipPath: "inset(0 100% 0 0)",
          opacity: 1
        },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: .52,
          ease: "power2.out",
          immediateRender: true
        },
        Math.min(i * .16, 1.05)
      );
    });
 
    const icons = Array.from(
      scene.content.querySelectorAll(".vb-icon")
    );
 
    icons.slice(0, 4).forEach((icon, i) => {
      const at = .12 + i * .18;
 
      tl.fromTo(
        icon,
        {
          opacity: 0,
          scale: .92
        },
        {
          opacity: 1,
          scale: 1,
          duration: .3,
          ease: "power2.out",
          immediateRender: true
        },
        at
      );
 
      const paths = Array.from(
        icon.querySelectorAll("path")
      ).slice(0, 5);
 
      paths.forEach((path, j) => {
        drawPath(
          tl,
          path,
          at + .08 + j * .055,
          .28
        );
      });
    });
 
    const marks = Array.from(
      scene.content.querySelectorAll(
        ".vb-mark path,.vb-fraction-line path"
      )
    );
 
    marks.slice(0, 4).forEach((path, i) => {
      drawPath(
        tl,
        path,
        .62 + i * .13,
        .65
      );
    });
 
    animateDiagram(tl, scene);
 
    /*
     * Gate containers are managed by step().
     * They are deliberately excluded from the
     * scene's automatic reveal timeline.
     */
 
    tl.eventCallback("onComplete", () => {
      scene.complete = true;
    });
 
    tl.play(0);
  }
 
  /*
   * Deterministic restoration.
   *
   * Clear GSAP's SVG transforms and stroke
   * properties without touching .vb-fit.
   */
 
  function finishScene(scene) {
    if (!scene) return;
 
    scene.timeline?.kill();
    scene.timeline = null;
 
    const g = gs();
 
    if (g) {
      const elements = scene.content.querySelectorAll("*");
 
      g.killTweensOf(elements);
 
      g.set(elements, {
        clearProps:
          "opacity,transform,strokeDasharray,strokeDashoffset,clipPath"
      });
 
      /*
       * SVG elements may retain transform
       * attributes after interrupted animation.
       * Only attributes introduced by GSAP are
       * cleared; authored SVG transforms remain.
       */
      scene.svgTransforms?.forEach((original, element) => {
        if (original === null) {
          element.removeAttribute("transform");
        } else {
          element.setAttribute("transform", original);
        }
      });
    } else {
      scene.content.querySelectorAll("*").forEach(n => {
        n.style.opacity = "";
        n.style.transform = "";
        n.style.strokeDasharray = "";
        n.style.strokeDashoffset = "";
        n.style.clipPath = "";
      });
    }
 
    scene.complete = true;
  }
 
  function hideScene(scene) {
    if (!scene) return;
 
    scene.timeline?.kill();
    scene.timeline = null;
 
    scene.el.classList.remove("vb-active");
    scene.el.style.visibility = "hidden";
    scene.el.style.opacity = "0";
    scene.el.setAttribute("aria-hidden", "true");
    scene.el.inert = true;
  }
 
  function showScene(scene) {
    scene.el.classList.add("vb-active");
    scene.el.style.visibility = "visible";
    scene.el.style.opacity = "1";
    scene.el.removeAttribute("aria-hidden");
    scene.el.inert = false;
  }
 
  /*
   * Responsive fitting.
   *
   * Measure only during load, resize or
   * scene activation, never on animation frames.
   */
 
  function fitScene(scene) {
    if (!root || !scene?.fit) return;
 
    const width = root.clientWidth;
    const height = root.clientHeight;
 
    if (width <= 0 || height <= 0) return;
 
    const marginX = width < 500 ? 18 : 42;
    const marginY = height < 380 ? 14 : 30;
 
    const availableW = Math.max(1, width - marginX);
    const availableH = Math.max(1, height - marginY);
 
    const fit = scene.fit;
    fit.style.transform = "none";
 
    const naturalW = Math.min(850, availableW);
    fit.style.width = naturalW + "px";
 
    const measuredW = Math.max(
      naturalW,
      scene.content.scrollWidth
    );
 
    const measuredH = Math.max(
      1,
      scene.content.scrollHeight
    );
 
    const scale = Math.min(
      1,
      availableW / measuredW,
      availableH / measuredH
    );
 
    fit.style.transform =
      `scale(${Math.max(.05, scale)})`;
  }
 
  let root = null;
  let stage = null;
  let section = null;
  let scenes = [];
  let currentScene = -1;
  let lastSentence = null;
  let observer = null;
  let resizeFrame = 0;
  let exitTween = null;
  let generation = 0;
 
  function cancelWork() {
    generation++;
 
    if (resizeFrame) {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = 0;
    }
 
    exitTween?.kill();
    exitTween = null;
 
    scenes.forEach(scene => {
      scene.timeline?.kill();
      scene.timeline = null;
 
      const g = gs();
 
      if (g) {
        g.killTweensOf(scene.el);
        g.killTweensOf(
          scene.content.querySelectorAll("*")
        );
      }
    });
  }
 
  function disconnected() {
    if (stage?.isConnected) return false;
 
    observer?.disconnect();
    observer = null;
 
    cancelWork();
 
    root?.classList.remove("vb-root");
    root?.removeAttribute("aria-label");
    root?.removeAttribute("role");
 
    return true;
  }
 
  function onResize() {
    if (disconnected()) return;
 
    if (resizeFrame) {
      cancelAnimationFrame(resizeFrame);
    }
 
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = 0;
 
      if (disconnected()) return;
 
      scenes.forEach(fitScene);
    });
  }
 
  function mount(target) {
    cancelWork();
 
    observer?.disconnect();
    observer = null;
 
    if (root) {
      root.classList.remove("vb-root");
      root.removeAttribute("aria-label");
      root.removeAttribute("role");
    }
 
    root = target || null;
    stage = null;
    section = null;
    scenes = [];
    currentScene = -1;
    lastSentence = null;
 
    if (!root) return;
 
    installCSS();
 
    root.classList.add("vb-root");
    root.setAttribute("role", "group");
    root.setAttribute(
      "aria-label",
      "Animated Whiteboard lesson visuals"
    );
 
    root.replaceChildren();
 
    const paper = decorative(html("div", "vb-paper"));
    stage = html("div", "vb-stage");
 
    root.append(paper, stage);
 
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(onResize);
      observer.observe(root);
    }
 
    const mountedStage = stage;
 
    document.fonts?.ready?.then(() => {
      if (stage === mountedStage && stage?.isConnected) {
        onResize();
      }
    });
  }
 
  function buildScene(at, moments) {
    const sceneEl = html("section", "vb-scene");
    sceneEl.setAttribute("aria-hidden", "true");
    sceneEl.inert = true;
 
    const fit = html("div", "vb-fit");
    const content = html("div", "vb-content");
 
    fit.appendChild(content);
    sceneEl.appendChild(fit);
 
    let previousCompare = null;
    let pair = null;
    let issueList = null;
 
    moments.forEach(m => {
      const element = makeMoment(m);
 
      if (m.type === "issue") {
        pair = null;
        previousCompare = null;
 
        if (!issueList) {
          issueList = html("div", "vb-issue-list");
          content.appendChild(issueList);
        }
 
        issueList.appendChild(element);
        return;
      }
 
      issueList = null;
 
      if (m.type === "compare" && previousCompare) {
        if (!pair) {
          pair = html("div", "vb-pair");
          content.insertBefore(pair, previousCompare);
          pair.appendChild(previousCompare);
        }
 
        pair.appendChild(element);
      } else {
        pair = null;
        content.appendChild(element);
      }
 
      previousCompare =
        m.type === "compare" ? element : null;
    });
 
    stage.appendChild(sceneEl);
 
    const scene = {
      at,
      el: sceneEl,
      fit,
      content,
      diagrams: [],
      gates: [],
      timeline: null,
      complete: false,
      svgTransforms: new Map()
    };
 
    /*
     * Capture authored SVG transforms before
     * GSAP touches any diagram geometry.
     */
 
    content.querySelectorAll("svg *").forEach(n => {
      scene.svgTransforms.set(
        n,
        n.getAttribute("transform")
      );
    });
 
    prepareScene(scene);
 
    return scene;
  }
 
  function buildCover() {
    const scene = buildScene(-1, []);
    const cover = html("article", "vb-moment vb-cover");
 
    const lesson =
      typeof section?.lesson === "string"
        ? section.lesson
        : section?.lesson?.title || "";
 
    if (lesson) {
      wipe(
        cover,
        html("span", "vb-kicker", lesson)
      );
    }
 
    wipe(
      cover,
      html(
        "h2",
        "",
        section?.title || "Ready to learn"
      )
    );
 
    cover.appendChild(mark());
 
    wipe(
      cover,
      html(
        "p",
        "vb-cover-note",
        "Press Play to begin listening."
      )
    );
 
    scene.content.appendChild(cover);
 
    return scene;
  }
 
  function load(data) {
    try {
      if (!root || !stage || disconnected()) return;
 
      cancelWork();
 
      section = data || {
        lesson: "",
        title: "",
        sentences: [],
        moments: []
      };
 
      scenes = [];
      currentScene = -1;
      lastSentence = null;
 
      stage.replaceChildren();
 
      scenes.push(buildCover());
 
      const sentences = Array.isArray(section.sentences)
        ? section.sentences
        : [];
 
      const moments = Array.isArray(section.moments)
        ? section.moments
        : [];
 
      const groups = new Map();
 
      moments.forEach(m => {
        if (!m || typeof m !== "object") return;
 
        const at = Math.trunc(finite(m.at, -1));
 
        if (at < 0 || at >= sentences.length) return;
 
        if (!groups.has(at)) groups.set(at, []);
        groups.get(at).push(m);
      });
 
      Array.from(groups.keys())
        .sort((a, b) => a - b)
        .forEach(at => {
          scenes.push(
            buildScene(at, groups.get(at))
          );
        });
 
      scenes.forEach(scene => {
        prepareSentenceGroups(scene);
        finishScene(scene);
        hideScene(scene);
        fitScene(scene);
      });
 
      step(-1);
    } catch (_) {
      /*
       * A malformed moment must never stop
       * the voice player.
       */
    }
  }
 
  function sceneForSentence(index) {
    let result = 0;
 
    for (let j = 1; j < scenes.length; j++) {
      if (scenes[j].at <= index) {
        result = j;
      } else {
        break;
      }
    }
 
    return result;
  }
 
  function step(i) {
    try {
      if (!root || !section || !scenes.length) return;
      if (disconnected()) return;
 
      const sentences = Array.isArray(section.sentences)
        ? section.sentences
        : [];
 
      const requested = Math.trunc(finite(i, -1));
 
      const index = clamp(
        requested,
        -1,
        Math.max(-1, sentences.length - 1)
      );
 
      const targetIndex = sceneForSentence(index);
      const target = scenes[targetIndex];
 
      /*
       * Same scene:
       * - never restart the scene timeline
       * - reveal only newly eligible gates
       * - restore previous gates when seeking
       *   backwards inside the same scene
       */
 
      if (targetIndex === currentScene) {
        if (index !== lastSentence) {
          const forwardOne =
            index === lastSentence + 1 &&
            !reduced();
 
          applyGates(target, index, forwardOne);
        }
 
        lastSentence = index;
        return;
      }
 
      const previousIndex = currentScene;
 
      const previous =
        previousIndex >= 0
          ? scenes[previousIndex]
          : null;
 
      const adjacentForward =
        previousIndex >= 0 &&
        targetIndex === previousIndex + 1;
 
      const initial = previousIndex === -1;
 
      const shouldAnimate =
        !reduced() &&
        Boolean(gs()) &&
        (initial || adjacentForward);
 
      const token = ++generation;
 
      exitTween?.kill();
      exitTween = null;
 
      if (previous) {
        finishScene(previous);
      }
 
      scenes.forEach((scene, j) => {
        if (
          j !== targetIndex &&
          j !== previousIndex
        ) {
          hideScene(scene);
        }
      });
 
      currentScene = targetIndex;
      lastSentence = index;
 
      finishScene(target);
      fitScene(target);
 
      showScene(target);
 
      /*
       * Seeking, reduced motion and missing
       * GSAP all display the final visual
       * immediately.
       */
 
      if (!shouldAnimate) {
        if (previous) hideScene(previous);
 
        finishScene(target);
        applyGates(target, index, false);
        return;
      }
 
      /*
       * A new scene begins with its first
       * eligible teaching elements.
       *
       * Future issues and comparison panels
       * remain hidden until their sentences.
       */
 
      applyGates(target, index, false);
 
      if (previous && previous !== target) {
        previous.el.setAttribute(
          "aria-hidden",
          "true"
        );
 
        previous.el.inert = true;
 
        exitTween = gs().to(previous.el, {
          opacity: 0,
          duration: .18,
          ease: "power1.out",
          onComplete: () => {
            if (token !== generation) return;
 
            hideScene(previous);
            exitTween = null;
          }
        });
      }
 
      target.complete = false;
      animateScene(target);
 
      /*
       * The gate state is applied again after
       * timeline construction because GSAP
       * initialisation can write starting values.
       */
 
      applyGates(target, index, false);
    } catch (_) {
      window.__stepErr = _ && _.stack || String(_);
      /*
       * step() must never throw or block
       * narration, including malformed SVGs
       * and interrupted seeks.
       */
    }
  }
 
  /*
   * Registration is idempotent.
   */
 
  window.STYLES = window.STYLES || [];
 
  if (!window.STYLES.some(s => s.id === ID)) {
    window.STYLES.push({
      id: ID,
      name: NAME,
      note: NOTE,
      mount,
      load,
      step
    });
  }
})();