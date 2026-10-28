/*
 * VoiceLearn - Teacher's Notebook v26
 * Animated teaching edition.
 *
 * Preserves the original notebook identity:
 * ruled paper, red margin, Fraunces typography,
 * warm editorial colours and cumulative notes.
 *
 * Requires GSAP 3.12.5. No plugins.
 * Does not modify narration or player controls.
 */
(() => {
  "use strict";

  const ID = "notebook";
  const NAME = "Teacher's Notebook";
  const NOTE =
    "Warm teaching notes, diagrams and explanations " +
    "constructed progressively with the narration.";
  const ROOT = "vl-notebook";
  const STYLE = "vl-notebook-v26";
  const NS = "http://www.w3.org/2000/svg";

  const gs = () => window.gsap;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const number = (v, fallback = 0) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  };

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
.vl-notebook {
  --nb-paper:#FAF8F2;
  --nb-ink:#292D2A;
  --nb-blue:#244B65;
  --nb-red:#963F30;
  --nb-yellow:#FFF0B8;
  --nb-line:#DCE3E0;
  --nb-board:#26343B;
  --nb-chalk:#F7F3E9;
  position:relative;
  isolation:isolate;
  display:flex;
  flex-direction:column;
  width:100%;
  height:100%;
  min-width:0;
  min-height:0;
  overflow:hidden;
  container-type:size;
  background:var(--nb-paper);
  color:var(--nb-ink);
  font-family:"Atkinson Hyperlegible",system-ui,sans-serif;
  font-size:16px;
  line-height:1.55;
}

body .player .look.vl-notebook {
  background:var(--nb-paper) !important;
}

.vl-notebook,
.vl-notebook *,
.vl-notebook *::before,
.vl-notebook *::after {
  box-sizing:border-box;
}

.vl-notebook [hidden] {
  display:none !important;
}

.vl-notebook .nb-scroll {
  position:relative;
  flex:1 1 auto;
  width:100%;
  min-width:0;
  min-height:0;
  overflow-x:hidden;
  overflow-y:auto;
  overscroll-behavior:contain;
  scrollbar-width:thin;
  scrollbar-color:#A9B7B5 transparent;
  background-color:var(--nb-paper);
  background-image:repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 35px,
    rgba(36,75,101,.065) 35px,
    rgba(36,75,101,.065) 36px
  );
}

.vl-notebook .nb-page {
  position:relative;
  width:100%;
  max-width:1000px;
  min-height:100%;
  margin-inline:auto;
  padding:clamp(22px,3vw,44px)
          clamp(20px,4vw,56px)
          50px
          clamp(40px,5vw,74px);
}

.vl-notebook .nb-page::before {
  content:"";
  position:absolute;
  top:0;
  bottom:0;
  left:clamp(27px,3vw,48px);
  width:1px;
  background:rgba(150,63,48,.30);
  pointer-events:none;
}

.vl-notebook .nb-ready {
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  justify-content:center;
  min-height:min(65cqh,540px);
  max-width:680px;
  gap:14px;
}

.vl-notebook .nb-ready-symbol {
  position:relative;
  display:grid;
  place-items:center;
  width:74px;
  height:74px;
  margin-bottom:10px;
  border:2px solid var(--nb-blue);
  border-radius:50%;
  color:var(--nb-blue);
  font-family:"Fraunces",Georgia,serif;
  font-size:45px;
  font-style:italic;
  line-height:1;
}

.vl-notebook .nb-ready-symbol::after {
  content:"";
  position:absolute;
  inset:-5px;
  border:1px solid rgba(150,63,48,.65);
  border-radius:48% 52% 49% 51%;
  transform:rotate(-9deg);
}

.vl-notebook .nb-ready-title {
  max-width:19ch;
  margin:0;
  font-family:"Fraunces",Georgia,serif;
  font-size:clamp(30px,4vw,52px);
  font-weight:650;
  line-height:1.12;
  letter-spacing:-.035em;
  text-wrap:balance;
}

.vl-notebook .nb-ready-note {
  max-width:48ch;
  margin:0;
  color:var(--nb-blue);
  font-size:clamp(15px,1.4vw,18px);
}

.vl-notebook .nb-content {
  display:grid;
  width:100%;
  gap:16px;
  align-content:start;
}

.vl-notebook .nb-entry {
  position:relative;
  min-width:0;
  overflow-wrap:anywhere;
}

.vl-notebook .nb-entry.nb-active::before {
  content:"";
  position:absolute;
  top:8px;
  bottom:8px;
  left:-15px;
  width:3px;
  border-radius:3px;
  background:var(--nb-red);
}

.vl-notebook .nb-eyebrow {
  display:block;
  margin-bottom:10px;
  color:var(--nb-blue);
  font-size:12px;
  font-weight:800;
  letter-spacing:.10em;
  text-transform:uppercase;
}

.vl-notebook .nb-title {
  padding:8px 0 18px;
  margin-bottom:4px;
}

.vl-notebook .nb-title h2 {
  max-width:26ch;
  margin:0;
  font-family:"Fraunces",Georgia,serif;
  font-size:clamp(28px,3.5vw,46px);
  font-weight:650;
  line-height:1.14;
  letter-spacing:-.035em;
  text-wrap:balance;
}

.vl-notebook .nb-title-line {
  display:block;
  width:min(260px,65%);
  height:3px;
  margin-top:18px;
  border-radius:3px;
  background:var(--nb-red);
  transform-origin:left center;
}

.vl-notebook .nb-item {
  display:grid;
  grid-template-columns:48px minmax(0,1fr);
  align-items:start;
  gap:14px;
  padding:16px 0;
}

.vl-notebook .nb-item-icon {
  display:grid;
  place-items:center;
  width:44px;
  height:44px;
  border:1.5px solid var(--nb-blue);
  border-radius:12px;
  background:rgba(36,75,101,.055);
  color:var(--nb-blue);
}

.vl-notebook .nb-item-icon svg {
  width:25px;
  height:25px;
}

.vl-notebook .nb-item h3 {
  max-width:32ch;
  margin:0 0 7px;
  font-family:"Fraunces",Georgia,serif;
  font-size:clamp(21px,2.2vw,29px);
  font-weight:650;
  line-height:1.2;
}

.vl-notebook .nb-item p {
  max-width:64ch;
  margin:0;
  font-size:clamp(16px,1.4vw,19px);
}

.vl-notebook .nb-item-index {
  display:inline-block;
  margin-bottom:7px;
  color:var(--nb-blue);
  font-size:12px;
  font-weight:800;
  letter-spacing:.06em;
}

.vl-notebook .nb-question {
  padding:20px;
  border:1px solid #D8D2BC;
  border-radius:12px;
  background:#FFF5D7;
}

.vl-notebook .nb-question-mark {
  display:block;
  margin-bottom:10px;
  color:var(--nb-red);
  font-family:"Fraunces",Georgia,serif;
  font-size:40px;
  font-weight:700;
  line-height:1;
}

.vl-notebook .nb-question h2 {
  max-width:35ch;
  margin:0;
  font-family:"Fraunces",Georgia,serif;
  font-size:clamp(22px,2.6vw,34px);
  font-weight:650;
  line-height:1.25;
}

.vl-notebook .nb-formula {
  padding:20px;
  border:1px solid #C8D5D9;
  border-radius:12px;
  background:#EDF3F4;
}

.vl-notebook .nb-fraction {
  display:grid;
  width:min(100%,560px);
  gap:12px;
  font-family:"Fraunces",Georgia,serif;
  font-size:clamp(23px,2.8vw,36px);
  font-weight:650;
  line-height:1.3;
  text-align:center;
}

.vl-notebook .nb-numerator,
.vl-notebook .nb-denominator {
  overflow-wrap:anywhere;
}

.vl-notebook .nb-denominator {
  padding-top:12px;
  border-top:3px solid var(--nb-blue);
}

.vl-notebook .nb-issue {
  padding:17px 19px;
  border-left:4px solid var(--nb-red);
  border-radius:0 10px 10px 0;
  background:#F7E9E3;
}

.vl-notebook .nb-issue-label {
  display:block;
  margin-bottom:7px;
  color:var(--nb-red);
  font-size:12px;
  font-weight:800;
  letter-spacing:.08em;
  text-transform:uppercase;
}

.vl-notebook .nb-issue p {
  margin:0;
  font-size:clamp(16px,1.4vw,18px);
}

.vl-notebook .nb-effect {
  display:inline-block;
  margin-top:10px;
  color:var(--nb-red);
  font-size:14px;
  font-weight:800;
}

.vl-notebook .nb-pair {
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:14px;
}

.vl-notebook .nb-compare {
  min-width:0;
  padding:20px;
  border:1px solid #BFCFD2;
  border-radius:12px;
  background:#F0F5F5;
}

.vl-notebook .nb-compare[data-side="b"] {
  border-color:#D5B8AC;
  background:#FAEEE8;
}

.vl-notebook .nb-compare p {
  margin:0;
  font-family:"Fraunces",Georgia,serif;
  font-size:clamp(20px,2.1vw,28px);
  font-weight:650;
  line-height:1.25;
}

.vl-notebook .nb-arrow {
  display:block;
  margin:8px 0 12px;
  color:var(--nb-blue);
  font-size:38px;
  line-height:1;
}

.vl-notebook .nb-compare[data-side="b"] .nb-arrow {
  color:var(--nb-red);
}

.vl-notebook .nb-statement {
  padding:15px 8px 15px 20px;
  border-left:4px solid var(--nb-blue);
}

.vl-notebook .nb-statement p {
  max-width:50ch;
  margin:0;
  font-family:"Fraunces",Georgia,serif;
  font-size:clamp(21px,2.5vw,32px);
  font-weight:600;
  line-height:1.3;
}

.vl-notebook .nb-diagram {
  min-width:0;
  padding:16px;
  border:2px solid #40515B;
  border-radius:12px;
  background:var(--nb-board);
  color:var(--nb-chalk);
}

.vl-notebook .nb-diagram .nb-eyebrow {
  color:#DCE7E9;
}

.vl-notebook .nb-diagram-svg {
  width:100%;
  min-width:0;
  overflow-x:auto;
}

.vl-notebook .nb-diagram-svg svg {
  display:block;
  width:100%;
  height:auto;
  max-width:100%;
  max-height:min(55dvh,520px);
  margin-inline:auto;
}

.vl-notebook .nb-diagram-caption {
  margin:12px 0 0;
  color:#E5EDF0;
  font-size:14px;
}

.vl-notebook .nb-key {
  position:relative;
  display:inline;
  box-shadow:inset 0 -.23em 0 var(--nb-yellow);
  -webkit-box-decoration-break:clone;
  box-decoration-break:clone;
}

.vl-notebook .nb-animated-line {
  display:block;
  height:3px;
  width:min(260px,65%);
  background:var(--nb-red);
  border-radius:3px;
  transform-origin:left center;
}

.vl-notebook .nb-token {
  fill:#FFF0B8;
  stroke:#963F30;
  stroke-width:2;
  pointer-events:none;
}

.vl-notebook .nb-sr {
  position:absolute;
  width:1px;
  height:1px;
  overflow:hidden;
  clip-path:inset(50%);
  white-space:nowrap;
}

.vl-notebook .nb-scroll:focus-visible {
  outline:3px solid var(--nb-blue);
  outline-offset:-3px;
}

@container (max-width:500px) {
  .vl-notebook .nb-page {
    padding:20px 16px 40px 36px;
  }

  .vl-notebook .nb-page::before {
    left:25px;
  }

  .vl-notebook .nb-ready {
    min-height:55cqh;
  }

  .vl-notebook .nb-title h2 {
    font-size:clamp(27px,7cqw,36px);
  }

  .vl-notebook .nb-item {
    grid-template-columns:40px minmax(0,1fr);
    gap:10px;
  }

  .vl-notebook .nb-item-icon {
    width:40px;
    height:40px;
  }

  .vl-notebook .nb-pair {
    grid-template-columns:1fr;
  }

  .vl-notebook .nb-question,
  .vl-notebook .nb-formula,
  .vl-notebook .nb-compare {
    padding:16px;
  }

  .vl-notebook .nb-diagram {
    padding:10px;
  }
}

@container (max-height:480px) {
  .vl-notebook .nb-page {
    padding-top:14px;
  }

  .vl-notebook .nb-ready {
    min-height:42cqh;
  }

  .vl-notebook .nb-ready-title {
    font-size:27px;
  }

  .vl-notebook .nb-diagram-svg svg {
    max-height:48cqh;
  }
}

@media (prefers-reduced-motion:reduce) {
  .vl-notebook *,
  .vl-notebook *::before,
  .vl-notebook *::after {
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

  function keyRange(source, explicit) {
    const requested = String(explicit || "").trim();

    if (requested) {
      const at = source.toLowerCase().indexOf(
        requested.toLowerCase()
      );
      if (at >= 0) return [at, at + requested.length];
    }

    const match = source.match(
      /\b(?:[A-Za-z]{3,}\s+)?[A-Za-z]{4,}\b/
    );

    return match
      ? [match.index, match.index + match[0].length]
      : null;
  }

  function teachingText(tag, value, key) {
    const source = String(value ?? "");
    const e = node(tag);
    const range = keyRange(source, key);

    if (!range) {
      e.textContent = source;
      return e;
    }

    e.append(
      document.createTextNode(source.slice(0, range[0]))
    );

    e.append(
      node(
        "span",
        "nb-key",
        source.slice(range[0], range[1])
      )
    );

    e.append(
      document.createTextNode(source.slice(range[1]))
    );

    return e;
  }

  function makeIcon(key) {
    const e = decorative(node("span", "nb-item-icon"));

    try {
      if (
        window.LAB?.icon &&
        typeof key === "string" &&
        /^[a-z0-9_-]+$/i.test(key)
      ) {
        e.innerHTML = window.LAB.icon(key);
      }
    } catch (_) {
      e.replaceChildren();
    }

    return e;
  }

  function makeMoment(m) {
    let e;

    switch (m.type) {
      case "title":
        e = node("article", "nb-entry nb-title");
        e.append(
          node("span", "nb-eyebrow", m.kicker || "The big idea"),
          teachingText("h2", m.text, m.key),
          decorative(node("span", "nb-title-line"))
        );
        break;

      case "item": {
        e = node("article", "nb-entry nb-item");
        const body = node("div");

        if (m.n != null) {
          body.append(
            node(
              "span",
              "nb-item-index",
              m.of ? `${m.n} of ${m.of}` : m.n
            )
          );
        }

        body.append(teachingText("h3", m.title, m.key));

        if (m.text) body.append(node("p", "", m.text));

        e.append(makeIcon(m.icon), body);
        break;
      }

      case "question":
        e = node("article", "nb-entry nb-question");
        e.append(
          decorative(node("span", "nb-question-mark", "?")),
          node("span", "nb-eyebrow", "Consider this"),
          teachingText("h2", m.text, m.key)
        );
        break;

      case "formula": {
        e = node("article", "nb-entry nb-formula");
        e.append(
          node("span", "nb-eyebrow", m.label || "The calculation")
        );

        const fraction = node("div", "nb-fraction");
        fraction.setAttribute("role", "group");
        fraction.setAttribute(
          "aria-label",
          `${m.num ?? ""} divided by ${m.den ?? ""}`
        );

        const numerator = node("div", "nb-numerator", m.num);
        const denominator = node("div", "nb-denominator", m.den);

        numerator.setAttribute("aria-hidden", "true");
        denominator.setAttribute("aria-hidden", "true");

        fraction.append(numerator, denominator);
        e.append(fraction);
        break;
      }

      case "issue":
        e = node("article", "nb-entry nb-issue");
        e.append(
          node("span", "nb-issue-label", "What went wrong"),
          teachingText("p", m.text, m.key)
        );

        if (m.effect) {
          e.append(node("span", "nb-effect", m.effect));
        }
        break;

      case "compare":
        e = node("article", "nb-entry nb-compare");
        e.dataset.side = m.side === "b" ? "b" : "a";
        e.append(
          node("span", "nb-eyebrow", m.label || "Comparison"),
          decorative(
            node(
              "span",
              "nb-arrow",
              m.dir === "up" ? "\u2197" :
              m.dir === "down" ? "\u2198" : "\u2194"
            )
          ),
          teachingText("p", m.note, m.key)
        );
        break;

      case "diagram": {
        e = node("article", "nb-entry nb-diagram");
        e.append(
          node("span", "nb-eyebrow", m.kicker || "Picture it")
        );

        const figure = node("div", "nb-diagram-svg");

        // Authored local SVG from diagrams.js only.
        if (typeof m.svg === "string") {
          figure.innerHTML = m.svg;
        }

        e.append(figure);

        if (m.caption) {
          e.append(
            node("p", "nb-diagram-caption", m.caption)
          );
        }
        break;
      }

      default:
        e = node("article", "nb-entry nb-statement");
        e.append(
          teachingText(
            "p",
            m.text || m.title || m.note || "",
            m.key
          )
        );
    }

    return e;
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

  function diagramParts(drawing) {
    const result = [];
    const tags = new Set([
      "rect", "circle", "ellipse", "polygon",
      "polyline", "line", "path", "text"
    ]);

    function visit(parent) {
      for (const child of parent.children) {
        const tag = child.localName?.toLowerCase();

        if (tag === "g") {
          visit(child);
          continue;
        }

        if (!tags.has(tag)) continue;

        const fill = (
          child.getAttribute("fill") || ""
        ).toLowerCase();

        const stroke = child.getAttribute("stroke");

        result.push({
          element: child,
          edge:
            tag === "path" &&
            (fill === "none" || fill === "") &&
            Boolean(stroke) &&
            stroke !== "none"
        });
      }
    }

    visit(drawing);
    return result;
  }

  function prepareDiagram(entry) {
    entry.diagrams = [];

    entry.element.querySelectorAll("svg").forEach(drawing => {
      const parts = diagramParts(drawing);

      const edges = parts.filter(
        p => p.edge && lengthOf(p.element) > 10
      );

      const boxes = Array.from(
        drawing.querySelectorAll("rect")
      ).map(e => boxOf(e)).filter(b =>
        b && b.width > 18 && b.height > 12
      );

      const token = decorative(svgNode("circle", {
        cx: 0,
        cy: 0,
        r: 5,
        class: "nb-token"
      }));

      const route = edges.length
        ? edges.map(p => p.element)
        : [];

      if (route.length || boxes.length > 1) {
        drawing.append(token);
      }

      entry.diagrams.push({
        drawing,
        parts,
        route,
        boxes,
        token
      });
    });
  }

  function drawStroke(tl, path, at, duration) {
    const length = lengthOf(path);

    if (!length) {
      tl.fromTo(
        path,
        { opacity: 0 },
        {
          opacity: 1,
          duration,
          immediateRender: true
        },
        at
      );
      return;
    }

    const dash = path.style.strokeDasharray;
    const offset = path.style.strokeDashoffset;

    tl.fromTo(
      path,
      {
        strokeDasharray: `${length} ${length}`,
        strokeDashoffset: length
      },
      {
        strokeDashoffset: 0,
        duration,
        ease: "power1.inOut",
        immediateRender: true
      },
      at
    );

    tl.set(path, {
      strokeDasharray: dash || "",
      strokeDashoffset: offset || ""
    }, at + duration);
  }

  function animateNumbers(tl, entry) {
    const labels = Array.from(
      entry.element.querySelectorAll("svg text")
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

  function animateToken(tl, diagram, at) {
    const token = diagram.token;
    if (!token.isConnected) return;

    if (diagram.route.length) {
      const route = diagram.route.slice(0, 8);
      let time = at;

      route.forEach((path, i) => {
        const length = lengthOf(path);
        if (!length) return;

        const start = path.getPointAtLength(0);

        tl.set(token, {
          x: start.x,
          y: start.y,
          opacity: 1
        }, time);

        const progress = { value: 0 };

        tl.to(progress, {
          value: 1,
          duration: .55,
          ease: "power1.inOut",
          onUpdate: () => {
            const p = path.getPointAtLength(
              progress.value * length
            );

            gs()?.set(token, {
              x: p.x,
              y: p.y
            });
          }
        }, time);

        time += .55;
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

  function animateDiagrams(tl, entry) {
    entry.diagrams.forEach((diagram, di) => {
      const parts = diagram.parts.slice(0, 60);
      const duration = clamp(
        String(
          section?.sentences?.[entry.at] || ""
        ).length / 18,
        2.2,
        5
      );

      const interval = duration / Math.max(1, parts.length);
      const base = .25 + di * .12;

      parts.forEach((part, i) => {
        const at = base + i * interval;

        if (part.edge) {
          drawStroke(
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

    animateNumbers(tl, entry);
  }

  function animateEntry(entry) {
    const g = gs();
    if (!g || reduced()) return;

    const tl = g.timeline({ paused: true });
    entry.timeline = tl;

    const parts = Array.from(
      entry.element.querySelectorAll(
        ".nb-eyebrow,h2,h3,p,.nb-item-index," +
        ".nb-effect,.nb-arrow,.nb-numerator,.nb-denominator"
      )
    ).filter(e => !e.closest(".nb-diagram"));

    parts.slice(0, 12).forEach((e, i) => {
      tl.fromTo(e, {
        opacity: 0,
        x: -12
      }, {
        opacity: 1,
        x: 0,
        duration: .42,
        ease: "power2.out",
        immediateRender: true
      }, i * .16);
    });

    entry.element.querySelectorAll(
      ".nb-key"
    ).forEach((e, i) => {
      tl.fromTo(e, {
        opacity: .35
      }, {
        opacity: 1,
        duration: .45,
        ease: "power1.out",
        immediateRender: true
      }, .45 + i * .12);
    });

    entry.element.querySelectorAll(
      ".nb-title-line"
    ).forEach(e => {
      tl.fromTo(e, {
        scaleX: 0
      }, {
        scaleX: 1,
        duration: .65,
        ease: "power2.out",
        immediateRender: true
      }, .55);
    });

    entry.element.querySelectorAll(
      ".nb-item-icon"
    ).forEach(e => {
      tl.fromTo(e, {
        opacity: 0,
        scale: .8
      }, {
        opacity: 1,
        scale: 1,
        duration: .4,
        ease: "power2.out",
        immediateRender: true
      }, .15);
    });

    animateDiagrams(tl, entry);

    tl.play(0);
  }

  function finishEntry(entry) {
    entry.timeline?.kill();
    entry.timeline = null;

    const g = gs();
    if (g) {
      const elements = entry.element.querySelectorAll("*");
      g.killTweensOf(elements);
      g.set(elements, {
        clearProps:
          "opacity,transform,strokeDasharray,strokeDashoffset"
      });
    }

    entry.diagrams?.forEach(d => {
      if (d.token) {
        d.token.style.opacity = "0";
        d.token.style.transform = "";
      }
    });

    entry.originalLabels?.forEach(([e, text]) => {
      e.textContent = text;
    });
  }

  let root = null;
  let scroll = null;
  let content = null;
  let ready = null;
  let live = null;
  let section = null;
  let entries = [];
  let lastStep = null;
  let frame = 0;
  let timer = 0;

  function cancel() {
    if (frame) cancelAnimationFrame(frame);
    if (timer) clearTimeout(timer);
    frame = 0;
    timer = 0;
    entries.forEach(finishEntry);
  }

  function mount(target) {
    cancel();

    if (root) root.classList.remove(ROOT);

    root = target;
    if (!root) return;

    installCSS();

    root.classList.add(ROOT);
    root.replaceChildren();

    scroll = node("div", "nb-scroll");
    scroll.tabIndex = 0;
    scroll.setAttribute("role", "region");
    scroll.setAttribute(
      "aria-label",
      "Teacher's notebook lesson notes"
    );

    const page = node("div", "nb-page");

    ready = node("div", "nb-ready");
    ready.append(
      decorative(node("div", "nb-ready-symbol", "a")),
      node(
        "h2",
        "nb-ready-title",
        "Let's make sense of this."
      ),
      node(
        "p",
        "nb-ready-note",
        "Press Play. We'll build the ideas together."
      )
    );

    content = node("div", "nb-content");
    live = node("div", "nb-sr");
    live.setAttribute("aria-live", "polite");
    live.setAttribute("aria-atomic", "true");

    page.append(ready, content);
    scroll.append(page);
    root.append(scroll, live);

    section = null;
    entries = [];
    lastStep = null;
  }

  function load(data) {
    cancel();
    if (!root || !content) return;

    section = data || {};
    entries = [];
    lastStep = null;

    const moments = Array.isArray(section.moments)
      ? section.moments
      : [];

    const sorted = moments
      .map((moment, order) => ({ moment, order }))
      .filter(x => x.moment && typeof x.moment === "object")
      .sort((a, b) =>
        number(a.moment.at, 0) -
        number(b.moment.at, 0) ||
        a.order - b.order
      );

    const fragment = document.createDocumentFragment();
    let pair = null;

    sorted.forEach(({ moment }) => {
      const element = makeMoment(moment);
      element.hidden = true;

      if (moment.type === "compare") {
        if (!pair) {
          pair = node("div", "nb-pair");
          fragment.append(pair);
        }
        pair.append(element);
      } else {
        pair = null;
        fragment.append(element);
      }

      const entry = {
        at: Math.trunc(number(moment.at, -1)),
        moment,
        element,
        timeline: null,
        diagrams: [],
        originalLabels: []
      };

      entries.push(entry);
    });

    content.replaceChildren(fragment);

    entries.forEach(entry => {
      prepareDiagram(entry);
      entry.originalLabels = Array.from(
        entry.element.querySelectorAll("svg text")
      ).map(e => [e, e.textContent]);
    });

    scroll.scrollTop = 0;
    step(-1);
  }

  function keepVisible(element, force = false) {
    if (!element || element.hidden || !scroll) return;

    const view = scroll.getBoundingClientRect();
    const rect = element.getBoundingClientRect();

    if (
      !force &&
      rect.top >= view.top + 16 &&
      rect.bottom <= view.bottom - 24
    ) return;

    const top =
      rect.top - view.top + scroll.scrollTop;

    const destination =
      rect.height > scroll.clientHeight - 40
        ? top - 16
        : top + rect.height - scroll.clientHeight + 24;

    scroll.scrollTop = Math.max(0, destination);
  }

  function step(i) {
    if (!section || !root || !scroll) return;

    const total = Array.isArray(section.sentences)
      ? section.sentences.length
      : 0;

    const index = clamp(
      Math.trunc(number(i, -1)),
      -1,
      Math.max(-1, total - 1)
    );

    if (index === lastStep) return;

    if (frame) cancelAnimationFrame(frame);
    if (timer) clearTimeout(timer);

    const previous = lastStep;
    const forward =
      previous !== null && index === previous + 1;

    const animate =
      forward && !reduced() && Boolean(gs());

    let newest = -1;

    entries.forEach(entry => {
      if (entry.at >= 0 && entry.at <= index) {
        newest = Math.max(newest, entry.at);
      }
    });

    let active = null;

    entries.forEach(entry => {
      const visible =
        index >= 0 &&
        entry.at >= 0 &&
        entry.at <= index;

      const wasHidden = entry.element.hidden;

      if (!visible || wasHidden) {
        finishEntry(entry);
      }

      entry.element.hidden = !visible;

      entry.element.classList.toggle(
        "nb-active",
        visible && entry.at === newest
      );

      if (visible && entry.at === newest) {
        active = entry.element;
      }

      if (visible && wasHidden && animate) {
        animateEntry(entry);
      }
    });

    content.querySelectorAll(".nb-pair").forEach(pair => {
      pair.hidden = !Array.from(pair.children).some(
        e => !e.hidden
      );
    });

    ready.hidden = entries.some(e => !e.element.hidden);

    if (active) {
      keepVisible(active, index < previous);

      frame = requestAnimationFrame(() => {
        frame = 0;
        if (active.isConnected) keepVisible(active);
      });
    } else {
      scroll.scrollTop = 0;
    }

    timer = setTimeout(() => {
      if (live) {
        live.textContent = index < 0
          ? "Lesson ready."
          : `Visual notes updated. Sentence ${index + 1} of ${total}.`;
      }
      timer = 0;
    }, 150);

    lastStep = index;
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