/*
 * VoiceLearn — Teacher's Notebook
 * --------------------------------
 * A warm, progressive teaching notebook.
 *
 * Interface:
 *   STYLES.push({
 *     id, name, note,
 *     mount(el),
 *     load(section),
 *     step(i)
 *   })
 *
 * Dependencies:
 *   window.STYLES
 *   window.LAB (optional helpers)
 *
 * No external assets.
 * No GSAP dependency.
 */

(() => {
  "use strict";

  const ID = "notebook";

  const NAME = "Teacher's Notebook";

  const NOTE =
    "Warm teaching notes, ink annotations and ideas " +
    "that appear as the professor explains.";

  const ROOT_CLASS = "vl-notebook";

  const reducedMotion = () =>
    typeof window.matchMedia === "function" &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  /*
   * Styles
   *
   * All selectors are scoped under .vl-notebook.
   * LAB.k converts px units into scaled values.
   */

  const css = `

  .vl-notebook {
    --nb-paper: #FAF7EF;
    --nb-ink: #242820;
    --nb-blue: #244B65;
    --nb-red: #A04432;
    --nb-yellow: #FFF0B8;
    --nb-line: #D7DFDC;
    --nb-board: #26343B;
    --nb-chalk: #F7F3E9;

    position: relative;
    isolation: isolate;

    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;
    min-height: 0;

    overflow: hidden;

    background: var(--nb-paper);
    color: var(--nb-ink);

    font-family:
      "Atkinson Hyperlegible",
      system-ui,
      sans-serif;

    font-size: 17px;
    line-height: 1.48;

    container-type: size;
  }

  .vl-notebook,
  .vl-notebook * {
    box-sizing: border-box;
  }

  .vl-notebook [hidden] {
    display: none !important;
  }

  /* ---------------------------------
     Notebook header
  --------------------------------- */

  .vl-notebook .nb-header {
    flex: none;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 12px;

    padding: 15px 19px 13px;

    background: #F1EBDD;

    border-bottom: 1px solid #CFC9BA;
  }

  .vl-notebook .nb-brand {
    display: flex;
    align-items: center;

    gap: 9px;

    min-width: 0;

    color: var(--nb-blue);

    font-family:
      "Bricolage Grotesque",
      system-ui,
      sans-serif;

    font-size: 16px;
    font-weight: 800;
    line-height: 1.2;
  }

  .vl-notebook .nb-brand-mark {
    flex: none;

    width: 21px;
    height: 25px;

    position: relative;

    border: 2px solid currentColor;
    border-radius: 2px;

    transform: rotate(-5deg);
  }

  .vl-notebook .nb-brand-mark::before {
    content: "";

    position: absolute;

    left: 4px;
    right: 3px;
    top: 7px;

    border-top: 2px solid currentColor;
  }

  .vl-notebook .nb-brand-mark::after {
    content: "";

    position: absolute;

    left: 4px;
    right: 6px;
    top: 13px;

    border-top: 2px solid currentColor;
  }

  .vl-notebook .nb-counter {
    flex: none;

    color: var(--nb-blue);

    font-size: 13px;
    font-weight: 700;

    font-variant-numeric: tabular-nums;
  }

  /* ---------------------------------
     Progress
  --------------------------------- */

  .vl-notebook .nb-progress {
    flex: none;

    height: 4px;

    background: #D9D3C5;
  }

  .vl-notebook .nb-progress-fill {
    display: block;

    width: 0;
    height: 100%;

    background: var(--nb-blue);

    transition: width 280ms ease;
  }

  /* ---------------------------------
     Scrollable notebook page
  --------------------------------- */

  .vl-notebook .nb-scroll {
    position: relative;

    flex: 1;
    min-height: 0;

    overflow-x: hidden;
    overflow-y: auto;

    overscroll-behavior: contain;

    scrollbar-width: thin;
    scrollbar-color: #8C9D9C transparent;

    scroll-padding-bottom: 30px;

    background-color: var(--nb-paper);

    background-image:
      repeating-linear-gradient(
        to bottom,
        transparent 0,
        transparent 31px,
        rgba(36, 75, 101, .105) 31px,
        rgba(36, 75, 101, .105) 32px
      );
  }

  .vl-notebook .nb-page {
    position: relative;

    min-height: 100%;

    padding:
      23px
      19px
      48px
      40px;

    overflow-wrap: anywhere;
  }

  .vl-notebook .nb-page::before {
    content: "";

    position: absolute;

    top: 0;
    bottom: 0;
    left: 29px;

    width: 1px;

    background: rgba(160, 68, 50, .48);

    pointer-events: none;
  }

  .vl-notebook .nb-lesson {
    margin-bottom: 23px;

    color: var(--nb-blue);

    font-size: 14px;
    font-weight: 700;
    line-height: 1.35;
  }

  /* ---------------------------------
     Ready state
  --------------------------------- */

  .vl-notebook .nb-ready {
    display: flex;
    flex-direction: column;
    justify-content: center;

    gap: 18px;

    min-height: 310px;

    padding: 18px 5px;
  }

  .vl-notebook .nb-ready-symbol {
    position: relative;

    width: 94px;
    height: 94px;

    display: grid;
    place-items: center;

    border: 3px solid var(--nb-blue);
    border-radius: 50%;

    color: var(--nb-blue);

    font-family: "Fraunces", Georgia, serif;

    font-size: 56px;
    font-style: italic;

    transform: rotate(-7deg);
  }

  .vl-notebook .nb-ready-symbol::after {
    content: "";

    position: absolute;

    width: 104px;
    height: 90px;

    border: 2px solid var(--nb-red);
    border-radius: 50%;

    transform: rotate(17deg);
  }

  .vl-notebook .nb-ready-title {
    margin: 0;

    max-width: 16ch;

    color: var(--nb-ink);

    font-family: "Fraunces", Georgia, serif;

    font-size: 34px;
    font-weight: 600;
    line-height: 1.12;
  }

  .vl-notebook .nb-ready-note {
    margin: 0;

    max-width: 29ch;

    color: var(--nb-blue);

    font-size: 17px;
    line-height: 1.45;
  }

  /* ---------------------------------
     Moment structure
  --------------------------------- */

  .vl-notebook .nb-content {
    display: grid;

    gap: 21px;

    align-content: start;
  }

  .vl-notebook .nb-entry {
    position: relative;

    min-width: 0;

    padding: 4px 2px 7px;

    overflow-wrap: anywhere;
  }

  .vl-notebook .nb-entry.nb-new {
    animation:
      nb-write-in
      420ms
      ease-out
      both;
  }

  @keyframes nb-write-in {
    from {
      opacity: 0;
      transform: translateY(9px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .vl-notebook .nb-entry.nb-active {
    border-radius: 5px;
  }

  .vl-notebook .nb-entry.nb-active::before {
    content: "";

    position: absolute;

    left: -13px;
    top: 8px;
    bottom: 8px;

    width: 4px;

    border-radius: 4px;

    background: var(--nb-red);
  }

  .vl-notebook .nb-eyebrow {
    display: block;

    margin-bottom: 9px;

    color: var(--nb-blue);

    font-size: 13px;
    font-weight: 800;
    line-height: 1.3;

    letter-spacing: .025em;
  }

  /* ---------------------------------
     Title
  --------------------------------- */

  .vl-notebook .nb-title {
    padding-top: 8px;
    padding-bottom: 15px;
  }

  .vl-notebook .nb-title h2 {
    position: relative;

    display: inline;

    margin: 0;

    color: var(--nb-ink);

    font-family: "Fraunces", Georgia, serif;

    font-size: 31px;
    font-weight: 650;
    line-height: 1.17;

    text-wrap: pretty;
  }

  .vl-notebook .nb-title-line {
    display: block;

    width: 74%;
    max-width: 230px;
    height: 8px;

    margin-top: 9px;

    border-bottom: 4px solid var(--nb-red);
    border-radius: 50%;

    transform: rotate(-1.5deg);
  }

  .vl-notebook .nb-title.nb-new
  .nb-title-line {
    animation: nb-underline 520ms ease-out both;
  }

  @keyframes nb-underline {
    from {
      opacity: 0;
      transform: scaleX(.2) rotate(-1.5deg);
      transform-origin: left center;
    }

    to {
      opacity: 1;
      transform: scaleX(1) rotate(-1.5deg);
      transform-origin: left center;
    }
  }

  .vl-notebook .nb-count {
    display: flex;
    flex-wrap: wrap;

    gap: 7px;

    margin-top: 16px;
  }

  .vl-notebook .nb-count-dot {
    width: 17px;
    height: 17px;

    border: 2px solid var(--nb-blue);
    border-radius: 50%;

    transform: rotate(-9deg);
  }

  /* ---------------------------------
     Item
  --------------------------------- */

  .vl-notebook .nb-item {
    display: grid;

    grid-template-columns: 46px minmax(0, 1fr);

    gap: 12px;

    align-items: start;
  }

  .vl-notebook .nb-item-icon {
    width: 44px;
    height: 44px;

    display: grid;
    place-items: center;

    border: 2px solid var(--nb-blue);
    border-radius: 50%;

    color: var(--nb-blue);

    background: var(--nb-paper);

    transform: rotate(-5deg);
  }

  .vl-notebook .nb-item-icon svg {
    width: 25px;
    height: 25px;
  }

  .vl-notebook .nb-item h3 {
    margin: 0 0 6px;

    color: var(--nb-ink);

    font-family:
      "Bricolage Grotesque",
      system-ui,
      sans-serif;

    font-size: 23px;
    font-weight: 800;
    line-height: 1.16;
  }

  .vl-notebook .nb-item p {
    margin: 0;

    color: var(--nb-ink);

    font-size: 17px;
    line-height: 1.48;
  }

  .vl-notebook .nb-item-index {
    display: inline-block;

    margin-top: 10px;

    color: var(--nb-blue);

    font-size: 13px;
    font-weight: 800;
  }

  /* ---------------------------------
     Question
  --------------------------------- */

  .vl-notebook .nb-question {
    padding: 16px 17px 19px;

    background: var(--nb-yellow);

    border: 1px solid #D5B85B;
    border-radius: 3px;

    box-shadow: 3px 4px 0 #DDD3AE;

    transform: rotate(-.5deg);
  }

  .vl-notebook .nb-question-mark {
    display: block;

    margin-bottom: 7px;

    color: var(--nb-red);

    font-family: "Fraunces", Georgia, serif;

    font-size: 43px;
    line-height: 1;
  }

  .vl-notebook .nb-question h2 {
    margin: 0;

    color: var(--nb-ink);

    font-family: "Fraunces", Georgia, serif;

    font-size: 26px;
    font-weight: 650;
    line-height: 1.2;
  }

  /* ---------------------------------
     Formula
  --------------------------------- */

  .vl-notebook .nb-formula {
    padding: 15px 12px 18px;

    border: 2px solid var(--nb-blue);
    border-radius: 5px;

    background: #FFFDF8;
  }

  .vl-notebook .nb-fraction {
    display: grid;
    justify-items: stretch;

    gap: 10px;

    margin-top: 13px;

    text-align: center;

    color: var(--nb-ink);

    font-family: "Fraunces", Georgia, serif;

    font-size: 24px;
    font-weight: 650;
    line-height: 1.25;
  }

  .vl-notebook .nb-denominator {
    padding-top: 11px;

    border-top: 3px solid var(--nb-blue);
  }

  /* ---------------------------------
     Issue
  --------------------------------- */

  .vl-notebook .nb-issue {
    padding: 14px 15px;

    border-left: 5px solid var(--nb-red);

    background: #F4E5DB;
  }

  .vl-notebook .nb-issue-label {
    display: block;

    margin-bottom: 8px;

    color: #823222;

    font-size: 14px;
    font-weight: 800;
  }

  .vl-notebook .nb-issue p {
    margin: 0;

    color: var(--nb-ink);

    font-size: 18px;
    line-height: 1.42;
  }

  .vl-notebook .nb-effect {
    display: inline-block;

    margin-top: 11px;
    padding: 5px 10px;

    background: #823222;
    color: #FFFFFF;

    border-radius: 3px;

    font-size: 15px;
    font-weight: 800;
  }

  /* ---------------------------------
     Comparison
  --------------------------------- */

  .vl-notebook .nb-pair {
    display: grid;

    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap: 10px;

    align-items: stretch;
  }

  .vl-notebook .nb-compare {
    min-width: 0;

    padding: 13px 11px;

    border: 2px solid var(--nb-blue);
    border-radius: 4px;

    background: #F1F2EA;
  }

  .vl-notebook .nb-compare[data-side="b"] {
    border-color: var(--nb-red);

    background: #F6E9DC;
  }

  .vl-notebook .nb-compare .nb-eyebrow {
    margin-bottom: 8px;
  }

  .vl-notebook .nb-compare p {
    margin: 0;

    color: var(--nb-ink);

    font-size: 17px;
    font-weight: 700;
    line-height: 1.32;
  }

  .vl-notebook .nb-arrow {
    display: block;

    margin-bottom: 7px;

    color: var(--nb-blue);

    font-size: 35px;
    font-weight: 800;
    line-height: 1;
  }

  .vl-notebook
  .nb-compare[data-side="b"]
  .nb-arrow {
    color: var(--nb-red);
  }

  /* ---------------------------------
     Statement
  --------------------------------- */

  .vl-notebook .nb-statement {
    padding: 13px 6px 13px 17px;

    border-left: 4px solid var(--nb-blue);
  }

  .vl-notebook .nb-statement p {
    margin: 0;

    color: var(--nb-ink);

    font-family: "Fraunces", Georgia, serif;

    font-size: 24px;
    font-weight: 600;
    line-height: 1.3;
  }

  /* ---------------------------------
     Diagram / chalkboard
  --------------------------------- */

  .vl-notebook .nb-diagram {
    padding: 15px 12px 13px;

    background: var(--nb-board);
    color: var(--nb-chalk);

    border: 3px solid #47565C;
    border-radius: 7px;
  }

  .vl-notebook .nb-diagram
  .nb-eyebrow {
    color: #F6D38A;
  }

  .vl-notebook .nb-diagram-svg {
    width: 100%;

    color: var(--nb-chalk);
  }

  .vl-notebook .nb-diagram-svg svg {
    display: block;

    width: 100%;
    height: auto;

    max-height: 290px;
  }

  .vl-notebook .nb-diagram-caption {
    margin: 12px 0 0;

    color: var(--nb-chalk);

    font-size: 16px;
    line-height: 1.45;
  }

  /* ---------------------------------
     Footer
  --------------------------------- */

  .vl-notebook .nb-footer {
    flex: none;

    display: flex;
    align-items: center;

    gap: 8px;

    padding: 10px 18px;

    background: #F1EBDD;

    border-top: 1px solid #CFC9BA;

    color: var(--nb-blue);

    font-size: 13px;
    font-weight: 700;
    line-height: 1.3;
  }

  .vl-notebook .nb-footer-dot {
    flex: none;

    width: 8px;
    height: 8px;

    border-radius: 50%;

    background: var(--nb-blue);
  }

  /* ---------------------------------
     Screen reader announcement
  --------------------------------- */

  .vl-notebook .nb-sr {
    position: absolute;

    width: 1px;
    height: 1px;

    padding: 0;
    margin: -1px;

    overflow: hidden;

    clip: rect(0, 0, 0, 0);
    white-space: nowrap;

    border: 0;
  }

  /* ---------------------------------
     Narrow containers
  --------------------------------- */

  @container (max-width: 340px) {

    .vl-notebook .nb-page {
      padding-left: 32px;
      padding-right: 12px;
    }

    .vl-notebook .nb-page::before {
      left: 23px;
    }

    .vl-notebook .nb-title h2 {
      font-size: 27px;
    }

    .vl-notebook .nb-item {
      grid-template-columns:
        38px minmax(0, 1fr);

      gap: 9px;
    }

    .vl-notebook .nb-item-icon {
      width: 36px;
      height: 36px;
    }

    .vl-notebook .nb-item-icon svg {
      width: 21px;
      height: 21px;
    }

    .vl-notebook .nb-item h3 {
      font-size: 21px;
    }

    .vl-notebook .nb-pair {
      grid-template-columns: 1fr;
    }
  }

  /* ---------------------------------
     Wider containers
  --------------------------------- */

  @container (min-width: 650px) {

    .vl-notebook .nb-page {
      max-width: 820px;

      margin-inline: auto;

      padding-left: 65px;
      padding-right: 50px;
    }

    .vl-notebook .nb-page::before {
      left: 48px;
    }

    .vl-notebook .nb-title h2 {
      font-size: 39px;
    }

    .vl-notebook .nb-content {
      gap: 26px;
    }
  }

  /* ---------------------------------
     Reduced motion
  --------------------------------- */

  @media (prefers-reduced-motion: reduce) {

    .vl-notebook *,
    .vl-notebook *::before,
    .vl-notebook *::after {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
  }

  `;

  /*
   * Inject stylesheet once.
   */

  const STYLE_ID = "vl-notebook-style";

  if (!document.getElementById(STYLE_ID)) {
    const sheet = document.createElement("style");

    sheet.id = STYLE_ID;

    sheet.textContent =
      window.LAB &&
      typeof window.LAB.k === "function"
        ? window.LAB.k(css)
        : css;

    document.head.appendChild(sheet);
  }

  /*
   * DOM helpers.
   */

  function node(tag, className, text) {
    const el = document.createElement(tag);

    if (className) {
      el.className = className;
    }

    if (text !== undefined && text !== null) {
      el.textContent = String(text);
    }

    return el;
  }

  function decorative(el) {
    el.setAttribute("aria-hidden", "true");
    return el;
  }

  function safeNumber(value, fallback = 0) {
    const n = Number(value);

    return Number.isFinite(n)
      ? n
      : fallback;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  /*
   * Only trusted local icon paths enter SVG markup.
   *
   * Course text is never inserted as HTML.
   */

  function makeIcon(key) {
    const wrapper = node("span", "nb-item-icon");

    decorative(wrapper);

    const paths =
      window.LAB &&
      window.LAB.icons &&
      Object.prototype.hasOwnProperty.call(
        window.LAB.icons,
        key
      )
        ? window.LAB.icons[key]
        : "";

    const svg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.8");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");

    svg.innerHTML = paths;

    wrapper.append(svg);

    return wrapper;
  }

  /*
   * Moment renderers.
   */

  function makeTitle(m) {
    const el = node("article", "nb-entry nb-title");

    const eyebrow = node(
      "span",
      "nb-eyebrow",
      m.kicker || "The big idea"
    );

    const heading = node(
      "h2",
      "",
      m.text || ""
    );

    const underline = decorative(
      node("span", "nb-title-line")
    );

    el.append(
      eyebrow,
      heading,
      underline
    );

    const count = safeNumber(m.count, 0);

    if (count > 0) {
      const dots = decorative(
        node("div", "nb-count")
      );

      const total = clamp(
        Math.trunc(count),
        0,
        24
      );

      for (let i = 0; i < total; i++) {
        dots.append(
          node("span", "nb-count-dot")
        );
      }

      el.append(dots);
    }

    return el;
  }

  function makeItem(m) {
    const el = node("article", "nb-entry nb-item");

    const icon = makeIcon(m.icon);

    const body = node("div", "nb-item-body");

    const heading = node(
      "h3",
      "",
      m.title || ""
    );

    const description = node(
      "p",
      "",
      m.text || ""
    );

    body.append(
      heading,
      description
    );

    if (m.n !== undefined && m.n !== null) {
      const index = node(
        "span",
        "nb-item-index",
        m.of
          ? `${m.n} of ${m.of}`
          : String(m.n)
      );

      body.append(index);
    }

    el.append(icon, body);

    return el;
  }

  function makeQuestion(m) {
    const el = node(
      "article",
      "nb-entry nb-question"
    );

    const mark = decorative(
      node("span", "nb-question-mark", "?")
    );

    const eyebrow = node(
      "span",
      "nb-eyebrow",
      "Let's think about this"
    );

    const heading = node(
      "h2",
      "",
      m.text || ""
    );

    el.append(
      mark,
      eyebrow,
      heading
    );

    return el;
  }

  function makeFormula(m) {
    const el = node(
      "article",
      "nb-entry nb-formula"
    );

    const label = node(
      "span",
      "nb-eyebrow",
      m.label || "The calculation"
    );

    const fraction = node(
      "div",
      "nb-fraction"
    );

    const numerator = node(
      "div",
      "nb-numerator",
      m.num || ""
    );

    const denominator = node(
      "div",
      "nb-denominator",
      m.den || ""
    );

    fraction.setAttribute(
      "role",
      "group"
    );

    fraction.setAttribute(
      "aria-label",
      `${m.num || ""} divided by ${m.den || ""}`
    );

    numerator.setAttribute("aria-hidden", "true");
    denominator.setAttribute("aria-hidden", "true");

    fraction.append(
      numerator,
      denominator
    );

    el.append(
      label,
      fraction
    );

    return el;
  }

  function makeIssue(m) {
    const el = node(
      "article",
      "nb-entry nb-issue"
    );

    const label = node(
      "span",
      "nb-issue-label",
      "A problem to notice"
    );

    const description = node(
      "p",
      "",
      m.text || ""
    );

    el.append(
      label,
      description
    );

    if (m.effect) {
      const effect = node(
        "span",
        "nb-effect",
        m.effect
      );

      el.append(effect);
    }

    return el;
  }

  function makeCompare(m) {
    const el = node(
      "article",
      "nb-entry nb-compare"
    );

    el.dataset.side =
      m.side === "b" ? "b" : "a";

    if (m.dir === "up" || m.dir === "down") {
      const arrow = decorative(
        node(
          "span",
          "nb-arrow",
          m.dir === "up" ? "↑" : "↓"
        )
      );

      el.append(arrow);
    }

    const label = node(
      "span",
      "nb-eyebrow",
      m.label || "Comparison"
    );

    const description = node(
      "p",
      "",
      m.note || ""
    );

    el.append(
      label,
      description
    );

    return el;
  }

  function makeStatement(m) {
    const el = node(
      "article",
      "nb-entry nb-statement"
    );

    const label = node(
      "span",
      "nb-eyebrow",
      "Remember this"
    );

    const description = node(
      "p",
      "",
      m.text || ""
    );

    el.append(
      label,
      description
    );

    return el;
  }

  function makeDiagram(m) {
    const el = node(
      "article",
      "nb-entry nb-diagram"
    );

    const label = node(
      "span",
      "nb-eyebrow",
      m.kicker || "On the board"
    );

    const drawing = node(
      "div",
      "nb-diagram-svg"
    );

    /*
     * Authored SVG from diagrams.js.
     * Never place arbitrary learner text here.
     */

    drawing.innerHTML = m.svg || "";

    el.append(
      label,
      drawing
    );

    if (m.caption) {
      const caption = node(
        "p",
        "nb-diagram-caption",
        m.caption
      );

      el.append(caption);
    }

    return el;
  }

  function makeDefault(m) {
    const el = node(
      "article",
      "nb-entry nb-statement"
    );

    const label = node(
      "span",
      "nb-eyebrow",
      "A note"
    );

    const description = node(
      "p",
      "",
      m.text || m.title || m.note || ""
    );

    el.append(
      label,
      description
    );

    return el;
  }

  function makeMoment(m) {
    switch (m.type) {
      case "title":
        return makeTitle(m);

      case "item":
        return makeItem(m);

      case "question":
        return makeQuestion(m);

      case "formula":
        return makeFormula(m);

      case "issue":
        return makeIssue(m);

      case "compare":
        return makeCompare(m);

      case "statement":
        return makeStatement(m);

      case "diagram":
        return makeDiagram(m);

      default:
        return makeDefault(m);
    }
  }

  /*
   * Instance state.
   *
   * The player reuses the same look element.
   * Each mount fully resets the previous instance.
   */

  let root = null;

  let scroll = null;
  let content = null;
  let ready = null;

  let lessonLabel = null;

  let counter = null;
  let progressFill = null;
  let footerText = null;
  let liveRegion = null;

  let section = null;

  let entries = [];

  let lastStep = null;

  let scrollFrame = 0;

  let announceTimer = 0;

  /*
   * Cancel any pending asynchronous work.
   */

  function cancelPending() {
    if (scrollFrame) {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = 0;
    }

    if (announceTimer) {
      clearTimeout(announceTimer);
      announceTimer = 0;
    }
  }

  /*
   * Build a fresh notebook.
   */

  function mount(el) {
    cancelPending();

    root = el;

    root.classList.add(ROOT_CLASS);

    root.replaceChildren();

    section = null;
    entries = [];
    lastStep = null;

    /*
     * Header
     */

    const header = node(
      "div",
      "nb-header"
    );

    const brand = node(
      "div",
      "nb-brand"
    );

    const mark = decorative(
      node("span", "nb-brand-mark")
    );

    const brandName = node(
      "span",
      "",
      "Teacher's Notebook"
    );

    brand.append(
      mark,
      brandName
    );

    counter = node(
      "span",
      "nb-counter",
      "00 / 00"
    );

    header.append(
      brand,
      counter
    );

    /*
     * Progress
     */

    const progress = decorative(
      node("div", "nb-progress")
    );

    progressFill = node(
      "span",
      "nb-progress-fill"
    );

    progress.append(progressFill);

    /*
     * Scrollable page
     */

    scroll = node(
      "div",
      "nb-scroll"
    );

    scroll.tabIndex = 0;

    scroll.setAttribute(
      "role",
      "region"
    );

    scroll.setAttribute(
      "aria-label",
      "Teacher's notebook lesson visuals"
    );

    const page = node(
      "div",
      "nb-page"
    );

    lessonLabel = node(
      "div",
      "nb-lesson"
    );

    /*
     * Ready screen
     */

    ready = node(
      "div",
      "nb-ready"
    );

    const readySymbol = decorative(
      node(
        "div",
        "nb-ready-symbol",
        "a"
      )
    );

    const readyTitle = node(
      "h2",
      "nb-ready-title",
      "Let's make sense of this."
    );

    const readyNote = node(
      "p",
      "nb-ready-note",
      "Press Play. We'll build the ideas together."
    );

    ready.append(
      readySymbol,
      readyTitle,
      readyNote
    );

    /*
     * Moment container
     */

    content = node(
      "div",
      "nb-content"
    );

    page.append(
      lessonLabel,
      ready,
      content
    );

    scroll.append(page);

    /*
     * Footer
     */

    const footer = node(
      "div",
      "nb-footer"
    );

    const footerDot = decorative(
      node("span", "nb-footer-dot")
    );

    footerText = node(
      "span",
      "",
      "Ready when you are"
    );

    footer.append(
      footerDot,
      footerText
    );

    /*
     * Polite screen reader status.
     */

    liveRegion = node(
      "div",
      "nb-sr"
    );

    liveRegion.setAttribute(
      "role",
      "status"
    );

    liveRegion.setAttribute(
      "aria-live",
      "polite"
    );

    liveRegion.setAttribute(
      "aria-atomic",
      "true"
    );

    root.append(
      header,
      progress,
      scroll,
      footer,
      liveRegion
    );
  }

  /*
   * Group comparisons that belong to the
   * same narration sentence.
   *
   * Non-comparison moments preserve source order.
   */

  function buildEntries(moments) {
    const sorted = moments
      .map((moment, index) => ({
        moment,
        index
      }))
      .sort((a, b) => {
        const atA = safeNumber(
          a.moment.at,
          0
        );

        const atB = safeNumber(
          b.moment.at,
          0
        );

        return (
          atA - atB ||
          a.index - b.index
        );
      });

    let previousCompare = null;
    let previousAt = null;
    let pair = null;

    for (const record of sorted) {
      const m = record.moment;

      const at = Math.trunc(
        safeNumber(m.at, 0)
      );

      const el = makeMoment(m);

      el.hidden = true;

      const entry = {
        moment: m,
        at,
        el
      };

      /*
       * Consecutive comparisons at the same
       * sentence index form a comparison pair.
       */

      if (
        m.type === "compare" &&
        previousCompare &&
        previousAt === at
      ) {
        if (!pair) {
          pair = node(
            "div",
            "nb-pair"
          );

          pair.hidden = true;

          content.insertBefore(
            pair,
            previousCompare.el
          );

          pair.append(
            previousCompare.el
          );
        }

        pair.append(el);

      } else {
        pair = null;

        content.append(el);
      }

      entries.push(entry);

      previousCompare =
        m.type === "compare"
          ? entry
          : null;

      previousAt = at;
    }
  }

  /*
   * Load a section.
   */

  function load(data) {
    cancelPending();

    section = data || {
      lesson: "",
      title: "",
      sentences: [],
      moments: []
    };

    entries = [];
    lastStep = null;

    content.replaceChildren();

    lessonLabel.textContent =
      section.lesson ||
      section.title ||
      "";

    const moments = Array.isArray(
      section.moments
    )
      ? section.moments
      : [];

    buildEntries(moments);

    scroll.scrollTop = 0;

    /*
     * Initial cover.
     */

    step(-1);
  }

  /*
   * Find the newest visible sentence moment.
   */

  function newestAtFor(index) {
    let newest = -1;

    for (const entry of entries) {
      if (
        entry.at <= index &&
        entry.at > newest
      ) {
        newest = entry.at;
      }
    }

    return newest;
  }

  /*
   * Scroll the notebook, not the page.
   *
   * Direct scrollTop assignment avoids the
   * surrounding browser viewport moving.
   */

  function keepVisible(target, force = false) {
    if (!scroll || !target || target.hidden) {
      return;
    }

    const viewport = scroll.getBoundingClientRect();

    const rect = target.getBoundingClientRect();

    const padding = 24;

    const visibleTop =
      viewport.top + padding;

    const visibleBottom =
      viewport.bottom - padding;

    if (
      !force &&
      rect.top >= visibleTop &&
      rect.bottom <= visibleBottom
    ) {
      return;
    }

    const targetTop =
      rect.top -
      viewport.top +
      scroll.scrollTop;

    const targetBottom =
      targetTop +
      rect.height;

    const available =
      scroll.clientHeight -
      padding * 2;

    let destination;

    if (rect.height > available) {
      destination =
        targetTop - padding;

    } else if (
      force ||
      rect.bottom > visibleBottom
    ) {
      destination =
        targetBottom -
        scroll.clientHeight +
        padding;

    } else {
      destination =
        targetTop - padding;
    }

    scroll.scrollTop = Math.max(
      0,
      destination
    );
  }

  /*
   * Announce progress without reading every
   * visible paragraph again.
   */

  function announce(index, total) {
    if (!liveRegion) {
      return;
    }

    if (announceTimer) {
      clearTimeout(announceTimer);
    }

    announceTimer = setTimeout(() => {
      if (!liveRegion) {
        return;
      }

      if (index < 0) {
        liveRegion.textContent =
          "Lesson ready.";

      } else {
        liveRegion.textContent =
          `Visual notes updated. ` +
          `Sentence ${index + 1} of ${total}.`;
      }

      announceTimer = 0;
    }, 120);
  }

  /*
   * Reveal the visual state for sentence i.
   *
   * Important:
   * -1 means before playback.
   * Seeking backwards is supported.
   * Seeking forwards is supported.
   * Repeated step(i) does not reanimate.
   */

  function step(i) {
    if (!section || !root) {
      return;
    }

    const total = Array.isArray(
      section.sentences
    )
      ? section.sentences.length
      : 0;

    const requested = Math.trunc(
      safeNumber(i, -1)
    );

    const current = clamp(
      requested,
      -1,
      Math.max(-1, total - 1)
    );

    /*
     * Idempotence:
     * No animation or repeated announcement
     * when the same sentence is requested.
     *
     * We still check scroll visibility because
     * the player can call step after resizing.
     */

    const sameStep =
      current === lastStep;

    const previousStep =
      lastStep;

    const isForward =
      previousStep !== null &&
      current > previousStep;

    const isJump =
      previousStep !== null &&
      Math.abs(
        current - previousStep
      ) > 1;

    const newest = newestAtFor(current);

    const visibleEntries = [];

    /*
     * Apply visibility.
     */

    for (const entry of entries) {
      const visible =
        current >= 0 &&
        entry.at <= current;

      const wasHidden =
        entry.el.hidden;

      entry.el.hidden = !visible;

      entry.el.classList.toggle(
        "nb-active",
        visible &&
        entry.at === newest
      );

      /*
       * Remove old animation state.
       */

      if (!sameStep) {
        entry.el.classList.remove(
          "nb-new"
        );
      }

      /*
       * Animate only genuinely new moments
       * during normal sequential playback.
       */

      if (
        visible &&
        wasHidden &&
        !sameStep &&
        !isJump &&
        !reducedMotion()
      ) {
        entry.el.classList.add(
          "nb-new"
        );
      }

      if (visible) {
        visibleEntries.push(entry);
      }
    }

    /*
     * Hide empty comparison containers.
     */

    content
      .querySelectorAll(".nb-pair")
      .forEach((pair) => {
        pair.hidden = !Array.from(
          pair.children
        ).some((child) => !child.hidden);
      });

    /*
     * Ready state.
     */

    ready.hidden =
      visibleEntries.length > 0;

    /*
     * Progress
     */

    const spoken = clamp(
      current + 1,
      0,
      total
    );

    counter.textContent =
      `${String(spoken).padStart(2, "0")}` +
      " / " +
      `${String(total).padStart(2, "0")}`;

    const percent =
      total > 0
        ? (spoken / total) * 100
        : 0;

    progressFill.style.width =
      `${percent}%`;

    /*
     * Footer status
     */

    if (spoken === 0) {
      footerText.textContent =
        "Ready when you are";

    } else if (spoken >= total) {
      footerText.textContent =
        "Your notes are complete";

    } else {
      footerText.textContent =
        "One idea at a time";
    }

    /*
     * Scroll management.
     */

    if (scrollFrame) {
      cancelAnimationFrame(
        scrollFrame
      );

      scrollFrame = 0;
    }

    if (visibleEntries.length === 0) {
      scroll.scrollTop = 0;

    } else {
      /*
       * All moments at the newest sentence
       * are visible. Scroll to the last one,
       * unless it is already comfortably
       * within the viewport.
       */

      const latest =
        visibleEntries[
          visibleEntries.length - 1
        ];

      const target = latest.el;

      const force =
        previousStep !== null &&
        current < previousStep;

      keepVisible(target, force);

      /*
       * Re-check after layout settles.
       * This is useful when an SVG changes
       * the height of its container.
       */

      scrollFrame =
        requestAnimationFrame(() => {
          if (
            latest.el.isConnected &&
            !latest.el.hidden
          ) {
            keepVisible(
              latest.el,
              false
            );
          }

          scrollFrame = 0;
        });
    }

    /*
     * Accessibility announcement.
     */

    if (!sameStep) {
      announce(current, total);
    }

    lastStep = current;
  }

  /*
   * Register look.
   */

  if (!window.STYLES) {
    window.STYLES = [];
  }

  window.STYLES.push({
    id: ID,
    name: NAME,
    note: NOTE,

    mount,
    load,
    step
  });

})();