/*
 * VoiceLearn - Process Journey v26
 * Animated teaching edition.
 *
 * Preserves:
 * - Original journey colours and typography
 * - Horizontal route overview
 * - Vertical station trail
 * - One station per narration sentence
 * - Cumulative station visibility
 * - Original cards, diagrams and comparisons
 *
 * Adds:
 * - Progressive station construction
 * - Travelling journey marker
 * - Sequential SVG diagram builds
 * - Animated process tokens
 * - Keyword emphasis
 * - Growing bars and numeric labels
 *
 * Requires GSAP 3.12.5.
 * No plugins or narration modifications.
 */
(() => {
  "use strict";

  const ID = "journey";
  const NAME = "Process Journey";
  const NOTE =
    "Follow a connected learning route as stations, " +
    "process diagrams and explanations build with narration.";

  const ROOT = "vl-journey";
  const STYLE = "vl-journey-v26";
  const NS = "http://www.w3.org/2000/svg";

  const gs = () => window.gsap;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function number(v, fallback = 0) {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  }

  function reduced() {
    try {
      return Boolean(
        window.LAB?.reducedMotion?.() ||
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
      );
    } catch (_) {
      return false;
    }
  }

  function node(tag, cls = "", value = null) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (value !== null) e.textContent = String(value);
    return e;
  }

  function svgNode(tag, attrs = {}) {
    const e = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([k, v]) => {
      e.setAttribute(k, String(v));
    });
    return e;
  }

  function decorative(e) {
    e.setAttribute("aria-hidden", "true");
    return e;
  }

  const CSS = `
.vl-journey {
  --jy-bg:#F5F2EB;
  --jy-paper:#FFFEFA;
  --jy-ink:#263D47;
  --jy-muted:#455A62;
  --jy-teal:#24675B;
  --jy-orange:#963D21;
  --jy-line:#C5CEC8;
  --jy-soft:#E4E9E3;
  --jy-board:#26343B;
  --jy-chalk:#F9F7F0;
  position:relative;
  isolation:isolate;
  display:flex;
  flex-direction:column;
  width:100%;
  height:100%;
  min-width:0;
  min-height:0;
  overflow:hidden;
  background:var(--jy-bg);
  color:var(--jy-ink);
  font-family:"Atkinson Hyperlegible",system-ui,sans-serif;
  font-size:16px;
  line-height:1.5;
  container-type:size;
}

body .player .look.vl-journey {
  background:var(--jy-bg) !important;
}

.vl-journey,
.vl-journey *,
.vl-journey *::before,
.vl-journey *::after {
  box-sizing:border-box;
}

.vl-journey [hidden] {
  display:none !important;
}

.vl-journey .jy-map {
  position:relative;
  flex:0 0 auto;
  min-height:40px;
  padding:7px 12px;
  border-bottom:1px solid var(--jy-line);
  background:var(--jy-bg);
}

.vl-journey .jy-map-label,
.vl-journey .jy-route-text {
  position:absolute;
  width:1px;
  height:1px;
  overflow:hidden;
  clip-path:inset(50%);
  white-space:nowrap;
}

.vl-journey .jy-map-scroll {
  width:100%;
  overflow-x:auto;
  overflow-y:hidden;
  overscroll-behavior-x:contain;
  scrollbar-width:thin;
  scrollbar-color:#91A49B transparent;
  padding:3px 2px 5px;
}

.vl-journey .jy-route {
  display:flex;
  align-items:center;
  width:max-content;
  min-width:100%;
  padding:0;
  margin:0;
  list-style:none;
}

.vl-journey .jy-route-stop {
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  flex:0 0 36px;
  height:26px;
  color:var(--jy-muted);
}

.vl-journey .jy-route-stop:not(:last-child)::after {
  content:"";
  position:absolute;
  left:calc(50% + 10px);
  top:12px;
  width:16px;
  height:2px;
  background:#A7B4AE;
}

.vl-journey .jy-route-stop.jy-done:not(:last-child)::after {
  background:var(--jy-teal);
}

.vl-journey .jy-route-node {
  position:relative;
  z-index:1;
  display:grid;
  place-items:center;
  width:22px;
  height:22px;
  border:2px solid #71817C;
  border-radius:50%;
  background:var(--jy-bg);
  color:var(--jy-ink);
  font-size:9px;
  font-weight:800;
  font-variant-numeric:tabular-nums;
}

.vl-journey .jy-route-stop.jy-done .jy-route-node {
  background:var(--jy-teal);
  border-color:var(--jy-teal);
  color:#FFFFFF;
}

.vl-journey .jy-route-stop.jy-current .jy-route-node {
  width:26px;
  height:26px;
  border:2px solid var(--jy-orange);
  background:var(--jy-orange);
  color:#FFFFFF;
  font-size:10px;
  box-shadow:
    0 0 0 2px var(--jy-bg),
    0 0 0 3px var(--jy-orange);
}

.vl-journey .jy-route-traveller {
  position:absolute;
  z-index:5;
  top:50%;
  left:0;
  width:10px;
  height:10px;
  border:2px solid var(--jy-bg);
  border-radius:50%;
  background:var(--jy-orange);
  pointer-events:none;
  opacity:0;
  transform:translate(-50%,-50%);
}

.vl-journey .jy-scroll {
  position:relative;
  flex:1 1 auto;
  min-width:0;
  min-height:0;
  overflow-x:hidden;
  overflow-y:auto;
  overscroll-behavior:contain;
  scrollbar-width:thin;
  scrollbar-color:#91A49B transparent;
  scroll-padding-bottom:30px;
}

.vl-journey .jy-workspace {
  position:relative;
  width:100%;
  max-width:1000px;
  min-height:100%;
  margin-inline:auto;
  padding:clamp(18px,3vw,42px);
  overflow-wrap:anywhere;
}

.vl-journey .jy-ready {
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  justify-content:center;
  gap:16px;
  min-height:min(65cqh,540px);
  padding:14px 8px;
}

.vl-journey .jy-ready-symbol {
  position:relative;
  width:120px;
  height:60px;
  margin-bottom:6px;
}

.vl-journey .jy-ready-symbol::before {
  content:"";
  position:absolute;
  left:20px;
  right:20px;
  top:29px;
  height:3px;
  background:var(--jy-teal);
}

.vl-journey .jy-ready-dot {
  position:absolute;
  top:16px;
  width:28px;
  height:28px;
  border:3px solid var(--jy-teal);
  border-radius:50%;
  background:var(--jy-bg);
}

.vl-journey .jy-ready-dot:first-child {
  left:5px;
  background:var(--jy-teal);
}

.vl-journey .jy-ready-dot:last-child {
  right:5px;
  border-color:var(--jy-orange);
}

.vl-journey .jy-ready-title {
  max-width:20ch;
  margin:0;
  font-family:"Bricolage Grotesque",system-ui,sans-serif;
  font-size:clamp(29px,3.5vw,46px);
  font-weight:800;
  line-height:1.12;
  letter-spacing:-.035em;
  text-wrap:balance;
}

.vl-journey .jy-ready-note {
  max-width:45ch;
  margin:0;
  color:var(--jy-muted);
  font-size:clamp(15px,1.4vw,18px);
}

.vl-journey .jy-stations {
  position:relative;
  display:grid;
  gap:18px;
  padding-left:32px;
}

.vl-journey .jy-stations::before {
  content:"";
  position:absolute;
  left:13px;
  top:14px;
  bottom:14px;
  width:2px;
  border-radius:2px;
  background:#A9B8B0;
}

.vl-journey .jy-station {
  position:relative;
  min-width:0;
}

.vl-journey .jy-station-marker {
  position:absolute;
  left:-32px;
  top:16px;
  z-index:2;
  display:grid;
  place-items:center;
  width:28px;
  height:28px;
  border:2px solid var(--jy-teal);
  border-radius:50%;
  background:var(--jy-paper);
  color:var(--jy-teal);
  font-size:11px;
  font-weight:800;
}

.vl-journey .jy-station.jy-active .jy-station-marker {
  background:var(--jy-orange);
  border-color:var(--jy-orange);
  color:#FFFFFF;
  box-shadow:0 0 0 3px var(--jy-bg);
}

.vl-journey .jy-station-card {
  position:relative;
  min-width:0;
  padding:clamp(16px,2vw,24px);
  border:1px solid #BAC7BF;
  border-radius:12px;
  background:var(--jy-paper);
  box-shadow:0 2px 0 rgba(38,61,71,.05);
}

.vl-journey .jy-station.jy-active .jy-station-card {
  border:2px solid var(--jy-orange);
  box-shadow:0 3px 0 rgba(150,61,33,.08);
}

.vl-journey .jy-station-label {
  display:block;
  margin-bottom:14px;
  color:var(--jy-muted);
  font-size:12px;
  font-weight:800;
  letter-spacing:.04em;
}

.vl-journey .jy-station.jy-active .jy-station-label {
  color:var(--jy-orange);
}

.vl-journey .jy-station-content {
  display:grid;
  gap:16px;
}

.vl-journey .jy-moment {
  min-width:0;
  overflow-wrap:anywhere;
}

.vl-journey .jy-eyebrow {
  display:block;
  margin-bottom:9px;
  color:var(--jy-teal);
  font-size:12px;
  font-weight:800;
  letter-spacing:.04em;
}

.vl-journey .jy-title h2 {
  max-width:28ch;
  margin:0;
  font-family:"Bricolage Grotesque",system-ui,sans-serif;
  font-size:clamp(27px,3.5vw,46px);
  font-weight:800;
  line-height:1.12;
  letter-spacing:-.03em;
  text-wrap:balance;
}

.vl-journey .jy-item {
  display:grid;
  grid-template-columns:44px minmax(0,1fr);
  align-items:start;
  gap:13px;
}

.vl-journey .jy-item-icon {
  display:grid;
  place-items:center;
  width:44px;
  height:44px;
  border:1.5px solid var(--jy-teal);
  border-radius:11px;
  background:#E4EEE8;
  color:var(--jy-teal);
}

.vl-journey .jy-item-icon svg {
  width:25px;
  height:25px;
}

.vl-journey .jy-item h3 {
  margin:0 0 7px;
  font-family:"Bricolage Grotesque",system-ui,sans-serif;
  font-size:clamp(20px,2vw,27px);
  font-weight:800;
  line-height:1.2;
}

.vl-journey .jy-item p {
  margin:0;
  font-size:clamp(16px,1.4vw,19px);
}

.vl-journey .jy-item-index {
  display:block;
  margin-top:9px;
  color:var(--jy-teal);
  font-size:12px;
  font-weight:800;
}

.vl-journey .jy-question {
  padding:18px;
  border-left:4px solid var(--jy-teal);
  border-radius:0 10px 10px 0;
  background:#E8EEE8;
}

.vl-journey .jy-question-mark {
  display:block;
  margin-bottom:8px;
  color:var(--jy-teal);
  font-family:"Fraunces",Georgia,serif;
  font-size:38px;
  line-height:1;
}

.vl-journey .jy-question h2 {
  margin:0;
  font-family:"Bricolage Grotesque",system-ui,sans-serif;
  font-size:clamp(22px,2.5vw,33px);
  font-weight:800;
  line-height:1.23;
}

.vl-journey .jy-formula {
  padding:18px;
  border:1px solid #B4C7BD;
  border-radius:10px;
  background:#E8EEE8;
}

.vl-journey .jy-fraction {
  display:grid;
  width:min(100%,600px);
  gap:12px;
  margin-top:12px;
  font-family:"Fraunces",Georgia,serif;
  font-size:clamp(23px,2.8vw,36px);
  font-weight:650;
  line-height:1.3;
  text-align:center;
}

.vl-journey .jy-denominator {
  padding-top:12px;
  border-top:3px solid var(--jy-teal);
}

.vl-journey .jy-issue {
  padding:16px;
  border-left:4px solid var(--jy-orange);
  border-radius:0 10px 10px 0;
  background:#F6E7DF;
}

.vl-journey .jy-issue-label {
  display:block;
  margin-bottom:8px;
  color:var(--jy-orange);
  font-size:13px;
  font-weight:800;
}

.vl-journey .jy-issue p {
  margin:0;
  font-size:clamp(16px,1.4vw,19px);
}

.vl-journey .jy-effect {
  display:inline-block;
  margin-top:10px;
  padding:6px 10px;
  border-radius:6px;
  background:var(--jy-orange);
  color:#FFFFFF;
  font-size:13px;
  font-weight:800;
}

.vl-journey .jy-pair {
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:12px;
}

.vl-journey .jy-compare {
  min-width:0;
  padding:16px;
  border:1px solid #A7BDB1;
  border-radius:10px;
  background:#E8EEE8;
}

.vl-journey .jy-compare[data-side="b"] {
  border-color:#CDAE9E;
  background:#F6E7DF;
}

.vl-journey .jy-compare p {
  margin:0;
  font-size:clamp(16px,1.4vw,19px);
  font-weight:700;
}

.vl-journey .jy-arrow {
  display:block;
  margin-bottom:8px;
  color:var(--jy-teal);
  font-size:34px;
  font-weight:800;
  line-height:1;
}

.vl-journey .jy-compare[data-side="b"] .jy-arrow {
  color:var(--jy-orange);
}

.vl-journey .jy-statement {
  padding:14px 8px 14px 18px;
  border-left:4px solid var(--jy-teal);
}

.vl-journey .jy-statement p {
  max-width:52ch;
  margin:0;
  font-family:"Fraunces",Georgia,serif;
  font-size:clamp(21px,2.5vw,32px);
  font-weight:600;
  line-height:1.3;
}

.vl-journey .jy-diagram {
  min-width:0;
  padding:clamp(10px,1.5vw,20px);
  border:2px solid #42565E;
  border-radius:12px;
  background:var(--jy-board);
  color:var(--jy-chalk);
}

.vl-journey .jy-diagram .jy-eyebrow {
  color:#F6D38A;
}

.vl-journey .jy-diagram-svg {
  width:100%;
  min-width:0;
  overflow-x:auto;
  color:var(--jy-chalk);
}

.vl-journey .jy-diagram-svg svg {
  display:block;
  width:100%;
  height:auto;
  max-width:100%;
  max-height:min(55dvh,520px);
  margin-inline:auto;
}

.vl-journey .jy-diagram-caption {
  margin:12px 0 0;
  color:var(--jy-chalk);
  font-size:14px;
}

.vl-journey .jy-key {
  box-shadow:inset 0 -.23em 0 #F6D38A;
  -webkit-box-decoration-break:clone;
  box-decoration-break:clone;
}

.vl-journey .jy-token {
  fill:#F6D38A;
  stroke:#963D21;
  stroke-width:2;
  pointer-events:none;
}

.vl-journey .jy-sr {
  position:absolute;
  width:1px;
  height:1px;
  overflow:hidden;
  clip-path:inset(50%);
  white-space:nowrap;
}

.vl-journey .jy-map-scroll:focus-visible,
.vl-journey .jy-scroll:focus-visible {
  outline:3px solid var(--jy-teal);
  outline-offset:-3px;
}

@container (max-width:500px) {
  .vl-journey .jy-map {
    padding:6px 8px;
  }

  .vl-journey .jy-workspace {
    padding:18px 14px 36px;
  }

  .vl-journey .jy-stations {
    padding-left:28px;
    gap:14px;
  }

  .vl-journey .jy-stations::before {
    left:12px;
  }

  .vl-journey .jy-station-marker {
    left:-28px;
    width:25px;
    height:25px;
  }

  .vl-journey .jy-station-card {
    padding:15px 13px;
  }

  .vl-journey .jy-station.jy-active .jy-station-card {
    padding:14px 12px;
  }

  .vl-journey .jy-pair {
    grid-template-columns:1fr;
  }

  .vl-journey .jy-item {
    grid-template-columns:40px minmax(0,1fr);
    gap:10px;
  }

  .vl-journey .jy-diagram {
    padding:9px;
  }
}

@container (max-height:480px) {
  .vl-journey .jy-workspace {
    padding-top:12px;
  }

  .vl-journey .jy-ready {
    min-height:42cqh;
  }

  .vl-journey .jy-ready-title {
    font-size:27px;
  }

  .vl-journey .jy-diagram-svg svg {
    max-height:48cqh;
  }
}

@media (prefers-reduced-motion:reduce) {
  .vl-journey *,
  .vl-journey *::before,
  .vl-journey *::after {
    animation:none !important;
    transition:none !important;
    scroll-behavior:auto !important;
  }
}
`;

  function installCSS() {
    if (document.getElementById(STYLE)) return;

    const sheet = node("style");
    sheet.id = STYLE;
    sheet.textContent = CSS;
    document.head.appendChild(sheet);
  }

  function teachingText(tag, value, explicit) {
    const source = String(value ?? "");
    const e = node(tag);

    let start = -1;
    let end = -1;

    const requested = String(explicit || "").trim();

    if (requested) {
      start = source.toLowerCase().indexOf(
        requested.toLowerCase()
      );
      end = start + requested.length;
    }

    if (start < 0) {
      const match = source.match(/\b[A-Za-z]{4,}\b/);

      if (match) {
        start = match.index;
        end = start + match[0].length;
      }
    }

    if (start < 0) {
      e.textContent = source;
      return e;
    }

    e.append(
      document.createTextNode(source.slice(0, start)),
      node("span", "jy-key", source.slice(start, end)),
      document.createTextNode(source.slice(end))
    );

    return e;
  }

  function makeIcon(key) {
    const wrapper = decorative(
      node("span", "jy-item-icon")
    );

    const icon = document.createElementNS(NS, "svg");

    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("fill", "none");
    icon.setAttribute("stroke", "currentColor");
    icon.setAttribute("stroke-width", "1.8");
    icon.setAttribute("stroke-linecap", "round");
    icon.setAttribute("stroke-linejoin", "round");

    if (
      typeof key === "string" &&
      /^[a-z0-9_-]+$/i.test(key) &&
      Object.prototype.hasOwnProperty.call(
        window.LAB?.icons || {},
        key
      )
    ) {
      icon.innerHTML = window.LAB.icons[key];
    }

    wrapper.append(icon);
    return wrapper;
  }

  function makeMoment(m) {
    let e;

    switch (m.type) {
      case "title":
        e = node("article", "jy-moment jy-title");
        e.append(
          node("span", "jy-eyebrow", m.kicker || "The big idea"),
          teachingText("h2", m.text, m.key)
        );
        break;

      case "item": {
        e = node("article", "jy-moment jy-item");
        const body = node("div", "jy-item-body");

        body.append(
          teachingText("h3", m.title, m.key),
          node("p", "", m.text)
        );

        if (m.n != null) {
          body.append(
            node(
              "span",
              "jy-item-index",
              m.of ? `${m.n} of ${m.of}` : m.n
            )
          );
        }

        e.append(makeIcon(m.icon), body);
        break;
      }

      case "question":
        e = node("article", "jy-moment jy-question");
        e.append(
          decorative(node("span", "jy-question-mark", "?")),
          node(
            "span",
            "jy-eyebrow",
            "A question on our route"
          ),
          teachingText("h2", m.text, m.key)
        );
        break;

      case "formula": {
        e = node("article", "jy-moment jy-formula");

        e.append(
          node("span", "jy-eyebrow", m.label || "The calculation")
        );

        const fraction = node("div", "jy-fraction");
        fraction.setAttribute("role", "group");
        fraction.setAttribute(
          "aria-label",
          `${m.num ?? ""} divided by ${m.den ?? ""}`
        );

        const numerator = node("div", "jy-numerator", m.num);
        const denominator = node("div", "jy-denominator", m.den);

        numerator.setAttribute("aria-hidden", "true");
        denominator.setAttribute("aria-hidden", "true");

        fraction.append(numerator, denominator);
        e.append(fraction);
        break;
      }

      case "issue":
        e = node("article", "jy-moment jy-issue");
        e.append(
          node(
            "span",
            "jy-issue-label",
            "A problem along the way"
          ),
          teachingText("p", m.text, m.key)
        );

        if (m.effect) {
          e.append(node("span", "jy-effect", m.effect));
        }
        break;

      case "compare":
        e = node("article", "jy-moment jy-compare");
        e.dataset.side = m.side === "b" ? "b" : "a";

        if (m.dir === "up" || m.dir === "down") {
          e.append(
            decorative(
              node(
                "span",
                "jy-arrow",
                m.dir === "up" ? "\u2191" : "\u2193"
              )
            )
          );
        }

        e.append(
          node("span", "jy-eyebrow", m.label || "Comparison"),
          teachingText("p", m.note, m.key)
        );
        break;

      case "diagram": {
        e = node("article", "jy-moment jy-diagram");

        e.append(
          node("span", "jy-eyebrow", m.kicker || "Process view")
        );

        const drawing = node("div", "jy-diagram-svg");

        // Trusted authored SVG from diagrams.js.
        if (typeof m.svg === "string") {
          drawing.innerHTML = m.svg;
        }

        e.append(drawing);

        if (m.caption) {
          e.append(
            node("p", "jy-diagram-caption", m.caption)
          );
        }
        break;
      }

      default:
        e = node("article", "jy-moment jy-statement");
        e.append(
          node("span", "jy-eyebrow", "Key takeaway"),
          teachingText(
            "p",
            m.text || m.title || m.note || "",
            m.key
          )
        );
    }

    return e;
  }

  function stationLabel(moments, index) {
    if (!moments.length) return `Step ${index + 1}`;

    const m = moments[0];

    switch (m.type) {
      case "title":
        return m.kicker || m.text || `Step ${index + 1}`;
      case "item":
        return m.title || `Step ${index + 1}`;
      case "question":
        return "Question";
      case "formula":
        return "Formula";
      case "issue":
        return "Challenge";
      case "compare":
        return "Compare";
      case "diagram":
        return m.kicker || "Process map";
      case "statement":
        return "Takeaway";
      default:
        return "Idea";
    }
  }

  function buildContent(container, moments) {
    let previous = null;
    let pair = null;

    moments.forEach(m => {
      const e = makeMoment(m);

      if (m.type === "compare" && previous) {
        if (!pair) {
          pair = node("div", "jy-pair");
          container.insertBefore(pair, previous);
          pair.append(previous);
        }
        pair.append(e);
      } else {
        pair = null;
        container.append(e);
      }

      previous = m.type === "compare" ? e : null;
    });
  }

  function lengthOf(path) {
    try {
      return Math.max(0, path.getTotalLength());
    } catch (_) {
      return 0;
    }
  }

  function boxOf(e) {
    try {
      return e.getBBox();
    } catch (_) {
      return null;
    }
  }

  function prepareDiagram(station) {
    station.diagrams = [];

    station.card.querySelectorAll("svg").forEach(drawing => {
      const parts = [];

      const allowed = new Set([
        "rect", "circle", "ellipse", "path",
        "line", "polygon", "polyline", "text"
      ]);

      function visit(parent) {
        Array.from(parent.children).forEach(child => {
          const tag = child.localName?.toLowerCase();

          if (tag === "g") {
            visit(child);
            return;
          }

          if (!allowed.has(tag)) return;

          const fill = (
            child.getAttribute("fill") || ""
          ).toLowerCase();

          parts.push({
            element: child,
            edge:
              tag === "path" &&
              (fill === "none" || fill === "") &&
              Boolean(child.getAttribute("stroke"))
          });
        });
      }

      visit(drawing);

      const route = parts.filter(
        p => p.edge && lengthOf(p.element) > 10
      ).map(p => p.element);

      const boxes = Array.from(
        drawing.querySelectorAll("rect")
      ).map(boxOf).filter(b =>
        b && b.width > 18 && b.height > 12
      );

      const token = decorative(svgNode("circle", {
        cx: 0,
        cy: 0,
        r: 5,
        class: "jy-token"
      }));

      if (route.length || boxes.length > 1) {
        drawing.append(token);
      }

      station.diagrams.push({
        drawing,
        parts,
        route,
        boxes,
        token
      });
    });
  }

  function drawPath(tl, path, at, duration) {
    const length = lengthOf(path);

    if (!length) return;

    const dash = path.style.strokeDasharray;
    const offset = path.style.strokeDashoffset;

    tl.fromTo(path, {
      strokeDasharray: `${length} ${length}`,
      strokeDashoffset: length
    }, {
      strokeDashoffset: 0,
      duration,
      ease: "power1.inOut",
      immediateRender: true
    }, at);

    tl.set(path, {
      strokeDasharray: dash || "",
      strokeDashoffset: offset || ""
    }, at + duration);
  }

  function animateToken(tl, diagram, at) {
    const token = diagram.token;
    if (!token.isConnected) return;

    if (diagram.route.length) {
      let time = at;

      diagram.route.slice(0, 8).forEach(path => {
        const length = lengthOf(path);
        if (!length) return;

        const start = path.getPointAtLength(0);

        tl.set(token, {
          x: start.x,
          y: start.y,
          opacity: 1
        }, time);

        const state = { progress: 0 };

        tl.to(state, {
          progress: 1,
          duration: .5,
          ease: "power1.inOut",
          onUpdate: () => {
            const p = path.getPointAtLength(
              state.progress * length
            );

            gs()?.set(token, {
              x: p.x,
              y: p.y
            });
          }
        }, time);

        time += .5;
      });

      tl.to(token, {
        opacity: 0,
        duration: .15
      }, time);

      return;
    }

    const points = diagram.boxes.slice(0, 8).map(b => ({
      x: b.x + b.width / 2,
      y: b.y + b.height / 2
    }));

    if (points.length < 2) return;

    tl.set(token, {
      x: points[0].x,
      y: points[0].y,
      opacity: 1
    }, at);

    points.slice(1).forEach((p, i) => {
      tl.to(token, {
        x: p.x,
        y: p.y,
        duration: .45,
        ease: "power1.inOut"
      }, at + i * .45);
    });

    tl.to(token, {
      opacity: 0,
      duration: .15
    }, at + (points.length - 1) * .45);
  }

  function animateDiagram(tl, station) {
    station.diagrams.forEach((diagram, di) => {
      const parts = diagram.parts.slice(0, 60);

      const duration = clamp(
        String(
          section?.sentences?.[station.index] || ""
        ).length / 18,
        2.2,
        5
      );

      const interval = duration / Math.max(1, parts.length);
      const base = .2 + di * .12;

      parts.forEach((part, i) => {
        const at = base + i * interval;

        if (part.edge) {
          drawPath(
            tl,
            part.element,
            at,
            Math.max(.12, interval * .9)
          );
        } else {
          tl.fromTo(part.element, {
            opacity: 0,
            y: 5
          }, {
            opacity: 1,
            y: 0,
            duration: Math.max(.12, interval * .9),
            ease: "power2.out",
            immediateRender: true
          }, at);
        }
      });

      const bars = Array.from(
        diagram.drawing.querySelectorAll("rect")
      ).filter(r => {
        const b = boxOf(r);

        return b &&
          b.width > 18 &&
          b.width > b.height * 1.8 &&
          !r.getAttribute("stroke");
      }).slice(0, 12);

      bars.forEach((bar, i) => {
        tl.fromTo(bar, {
          scaleX: 0,
          transformOrigin: "0% 50%"
        }, {
          scaleX: 1,
          duration: .65,
          ease: "power2.out",
          immediateRender: true
        }, .35 + i * .12);
      });

      animateToken(tl, diagram, base + duration);
    });

    const labels = Array.from(
      station.card.querySelectorAll("svg text")
    ).filter(e =>
      /^\s*\d+(?:\.\d+)?\s*(?:min|mins|minutes|%)\s*$/i
        .test(e.textContent || "")
    ).slice(0, 12);

    labels.forEach((label, i) => {
      const original = label.textContent;
      const match = original.match(
        /(\d+(?:\.\d+)?)\s*(min|mins|minutes|%)/i
      );

      if (!match) return;

      const target = number(match[1]);
      const decimals = (match[1].split(".")[1] || "").length;
      const state = { value: 0 };

      tl.fromTo(state, { value: 0 }, {
        value: target,
        duration: .8,
        ease: "power1.out",
        onUpdate: () => {
          label.textContent =
            state.value.toFixed(decimals) + " " + match[2];
        },
        onComplete: () => {
          label.textContent = original;
        }
      }, .4 + i * .08);
    });
  }

  function animateStation(station) {
    const g = gs();
    if (!g || reduced()) return;

    const tl = g.timeline({ paused: true });
    station.timeline = tl;

    const elements = Array.from(
      station.card.querySelectorAll(
        ".jy-station-label,.jy-eyebrow,h2,h3,p," +
        ".jy-item-index,.jy-effect,.jy-arrow"
      )
    ).filter(e => !e.closest(".jy-diagram"));

    elements.slice(0, 16).forEach((e, i) => {
      tl.fromTo(e, {
        opacity: 0,
        y: 12
      }, {
        opacity: 1,
        y: 0,
        duration: .45,
        ease: "power2.out",
        immediateRender: true
      }, i * .14);
    });

    station.card.querySelectorAll(
      ".jy-key"
    ).forEach((e, i) => {
      tl.fromTo(e, {
        opacity: .35
      }, {
        opacity: 1,
        duration: .45,
        immediateRender: true
      }, .45 + i * .12);
    });

    station.card.querySelectorAll(
      ".jy-item-icon"
    ).forEach(e => {
      tl.fromTo(e, {
        opacity: 0,
        scale: .75
      }, {
        opacity: 1,
        scale: 1,
        duration: .45,
        ease: "back.out(1.2)",
        immediateRender: true
      }, .12);
    });

    animateDiagram(tl, station);

    tl.play(0);
  }

  function finishStation(station) {
    station.timeline?.kill();
    station.timeline = null;

    const g = gs();

    if (g) {
      const elements = station.card.querySelectorAll("*");
      g.killTweensOf(elements);
      g.set(elements, {
        clearProps:
          "opacity,transform,strokeDasharray,strokeDashoffset"
      });
    }

    station.diagrams?.forEach(d => {
      if (d.token) {
        d.token.style.opacity = "0";
        d.token.style.transform = "";
      }
    });

    station.originalLabels?.forEach(([e, value]) => {
      e.textContent = value;
    });
  }

  let root = null;
  let routeScroll = null;
  let routeList = null;
  let traveller = null;
  let workspaceScroll = null;
  let stationsBox = null;
  let ready = null;
  let live = null;
  let section = null;
  let stations = [];
  let lastStep = null;
  let frame = 0;
  let timer = 0;
  let travelTween = null;

  function cancel() {
    if (frame) cancelAnimationFrame(frame);
    if (timer) clearTimeout(timer);

    travelTween?.kill();
    travelTween = null;

    frame = 0;
    timer = 0;

    stations.forEach(finishStation);
  }

  function mount(target) {
    cancel();

    if (root) root.classList.remove(ROOT);

    root = target;
    if (!root) return;

    installCSS();

    root.classList.add(ROOT);
    root.replaceChildren();

    const map = node("div", "jy-map");

    map.append(
      node(
        "span",
        "jy-map-label",
        "Your learning route"
      )
    );

    routeScroll = node("div", "jy-map-scroll");
    routeScroll.tabIndex = 0;
    routeScroll.setAttribute("role", "region");
    routeScroll.setAttribute(
      "aria-label",
      "Lesson route overview"
    );

    routeList = node("ol", "jy-route");
    routeScroll.append(routeList);
    map.append(routeScroll);

    workspaceScroll = node("div", "jy-scroll");
    workspaceScroll.tabIndex = 0;
    workspaceScroll.setAttribute("role", "region");
    workspaceScroll.setAttribute(
      "aria-label",
      "Process journey lesson visuals"
    );

    const workspace = node("div", "jy-workspace");

    ready = node("div", "jy-ready");

    const symbol = decorative(
      node("div", "jy-ready-symbol")
    );

    symbol.append(
      node("span", "jy-ready-dot"),
      node("span", "jy-ready-dot")
    );

    ready.append(
      symbol,
      node(
        "h2",
        "jy-ready-title",
        "Every journey begins with an idea."
      ),
      node(
        "p",
        "jy-ready-note",
        "Press Play. We'll follow the ideas together."
      )
    );

    stationsBox = node("div", "jy-stations");

    workspace.append(ready, stationsBox);
    workspaceScroll.append(workspace);

    live = node("div", "jy-sr");
    live.setAttribute("role", "status");
    live.setAttribute("aria-live", "polite");
    live.setAttribute("aria-atomic", "true");

    root.append(map, workspaceScroll, live);

    section = null;
    stations = [];
    lastStep = null;
  }

  function load(data) {
    cancel();

    if (!root || !routeList || !stationsBox) return;

    section = data || {};
    stations = [];
    lastStep = null;

    routeList.replaceChildren();
    stationsBox.replaceChildren();

    const sentences = Array.isArray(section.sentences)
      ? section.sentences
      : [];

    const moments = Array.isArray(section.moments)
      ? section.moments
      : [];

    const groups = new Map();

    moments.forEach(m => {
      if (!m || typeof m !== "object") return;

      const at = Math.trunc(number(m.at, -1));

      if (at < 0 || at >= sentences.length) return;

      if (!groups.has(at)) groups.set(at, []);
      groups.get(at).push(m);
    });

    for (let i = 0; i < sentences.length; i++) {
      const group = groups.get(i) || [];
      const label = stationLabel(group, i);

      const routeStop = node("li", "jy-route-stop");
      routeStop.setAttribute(
        "aria-label",
        `Station ${i + 1}: ${label}`
      );

      const routeNode = decorative(
        node("span", "jy-route-node", i + 1)
      );

      routeStop.append(
        routeNode,
        node("span", "jy-route-text", label)
      );

      routeList.append(routeStop);

      const station = node("section", "jy-station");
      station.hidden = true;

      const marker = decorative(
        node("span", "jy-station-marker", i + 1)
      );

      const card = node("div", "jy-station-card");
      const header = node("div", "jy-station-label", label);
      const stationContent = node(
        "div",
        "jy-station-content"
      );

      buildContent(stationContent, group);

      const firstHeading = stationContent.querySelector(
        ".jy-title h2"
      );

      if (
        firstHeading &&
        firstHeading.textContent.trim().toLowerCase() ===
        label.trim().toLowerCase()
      ) {
        header.hidden = true;
      }

      if (!group.length) {
        stationContent.append(
          node("p", "jy-moment", sentences[i])
        );
      }

      card.append(header, stationContent);
      station.append(marker, card);
      stationsBox.append(station);

      const entry = {
        index: i,
        label,
        routeStop,
        routeNode,
        station,
        marker,
        card,
        timeline: null,
        diagrams: [],
        originalLabels: []
      };

      prepareDiagram(entry);

      entry.originalLabels = Array.from(
        card.querySelectorAll("svg text")
      ).map(e => [e, e.textContent]);

      stations.push(entry);
    }

    traveller = decorative(
      node("span", "jy-route-traveller")
    );

    routeList.append(traveller);

    routeScroll.scrollLeft = 0;
    workspaceScroll.scrollTop = 0;

    step(-1);
  }

  function routePosition(entry) {
    return (
      entry.routeStop.offsetLeft +
      entry.routeStop.offsetWidth / 2
    );
  }

  function moveTraveller(previous, current, animate) {
    if (!traveller || current < 0) {
      if (traveller) traveller.style.opacity = "0";
      return;
    }

    travelTween?.kill();
    travelTween = null;

    const target = routePosition(stations[current]);
    const g = gs();

    if (!g || !animate || previous < 0) {
      traveller.style.left = target + "px";
      traveller.style.opacity = "0";
      return;
    }

    const start = routePosition(stations[previous]);

    traveller.style.left = start + "px";
    traveller.style.opacity = "1";

    travelTween = g.to(traveller, {
      x: target - start,
      duration: .6,
      ease: "power2.inOut",
      onComplete: () => {
        traveller.style.left = target + "px";
        g.set(traveller, {
          x: 0,
          opacity: 0
        });
        travelTween = null;
      }
    });
  }

  function keepRouteVisible(entry) {
    if (!entry || !routeScroll) return;

    const view = routeScroll.getBoundingClientRect();
    const rect = entry.routeStop.getBoundingClientRect();

    if (
      rect.left >= view.left + 18 &&
      rect.right <= view.right - 18
    ) return;

    routeScroll.scrollLeft = Math.max(
      0,
      entry.routeStop.offsetLeft -
      routeScroll.clientWidth / 2 +
      entry.routeStop.offsetWidth / 2
    );
  }

  function keepStationVisible(entry, force = false) {
    if (!entry || entry.station.hidden) return;

    const view = workspaceScroll.getBoundingClientRect();
    const rect = entry.station.getBoundingClientRect();

    if (
      !force &&
      rect.top >= view.top + 22 &&
      rect.bottom <= view.bottom - 22
    ) return;

    const top =
      rect.top - view.top + workspaceScroll.scrollTop;

    const destination =
      rect.height > workspaceScroll.clientHeight - 44
        ? top - 22
        : top + rect.height -
          workspaceScroll.clientHeight + 22;

    workspaceScroll.scrollTop = Math.max(0, destination);
  }

  function step(i) {
    if (!section || !root) return;

    const total = stations.length;

    const current = clamp(
      Math.trunc(number(i, -1)),
      -1,
      Math.max(-1, total - 1)
    );

    if (current === lastStep) return;

    if (frame) cancelAnimationFrame(frame);
    if (timer) clearTimeout(timer);

    const previous = lastStep;
    const forward =
      previous !== null && current === previous + 1;

    const animate =
      forward && !reduced() && Boolean(gs());

    stations.forEach(entry => {
      const visible =
        current >= 0 &&
        entry.index <= current;

      const wasHidden = entry.station.hidden;
      const active = entry.index === current;

      if (!visible || wasHidden) {
        finishStation(entry);
      }

      entry.station.hidden = !visible;

      entry.station.classList.toggle(
        "jy-active",
        active
      );

      entry.routeStop.classList.toggle(
        "jy-current",
        active
      );

      entry.routeStop.classList.toggle(
        "jy-done",
        entry.index < current
      );

      if (active) {
        entry.routeStop.setAttribute(
          "aria-current",
          "step"
        );
      } else {
        entry.routeStop.removeAttribute("aria-current");
      }

      if (visible && wasHidden && animate) {
        animateStation(entry);
      }
    });

    ready.hidden = current >= 0;
    stationsBox.hidden = current < 0;

    moveTraveller(previous, current, animate);

    if (current < 0) {
      workspaceScroll.scrollTop = 0;
      routeScroll.scrollLeft = 0;
    } else {
      const active = stations[current];

      keepRouteVisible(active);
      keepStationVisible(
        active,
        previous !== null && current < previous
      );

      frame = requestAnimationFrame(() => {
        frame = 0;

        if (active.station.isConnected) {
          keepRouteVisible(active);
          keepStationVisible(active);
        }
      });
    }

    timer = setTimeout(() => {
      if (live) {
        live.textContent = current < 0
          ? "Journey ready."
          : `Station ${current + 1} of ${total}.`;
      }
      timer = 0;
    }, 120);

    lastStep = current;
  }

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