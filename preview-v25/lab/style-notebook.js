// FILE: style-notebook.js

/*
 * VoiceLearn — Teacher's Notebook v25
 * OPER621 Business Process Management
 *
 * Visual revision of the existing notebook look.
 *
 * Preserved:
 * - STYLES registration id "notebook"
 * - mount(el), load(section), step(i)
 * - Sentence-indexed moment progression
 * - Stable moment ordering
 * - Comparison grouping
 * - All existing moment types
 * - Trusted local LAB icons
 * - Trusted local diagram SVGs
 * - Forward and backward seeking
 *
 * Improved:
 * - Responsive notebook layout
 * - Calm editorial typography
 * - Subtle ruled-paper background
 * - Better diagram readability
 * - Accessible contrast
 * - Compact mobile margins
 * - No duplicated player header
 * - No duplicated progress indicator
 * - No duplicated sentence counter
 * - No duplicated caption or controls
 * - Reduced-motion support
 *
 * No speech synthesis or narration logic is modified.
 */

(() => {
  "use strict";

  const ID = "notebook";
  const NAME = "Teacher's Notebook";

  const NOTE =
    "Warm teaching notes, clear explanations, " +
    "and ideas revealed as the lesson progresses.";

  const ROOT_CLASS = "vl-notebook";

  /* ======================================================
     01. UTILITIES
     ====================================================== */

  const reducedMotion = () =>
    typeof window.matchMedia === "function" &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  function safeNumber(value, fallback = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function clamp(value, minimum, maximum) {
    return Math.max(
      minimum,
      Math.min(maximum, value)
    );
  }

  function node(tag, className = "", text = null) {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (text !== null && text !== undefined) {
      element.textContent = String(text);
    }

    return element;
  }

  function decorative(element) {
    element.setAttribute(
      "aria-hidden",
      "true"
    );

    return element;
  }

  /* ======================================================
     02. VISUAL STYLES
     ====================================================== */

  const css = `

    .vl-notebook {
      --nb-paper: #FAF8F2;
      --nb-ink: #292D2A;
      --nb-blue: #244B65;
      --nb-red: #963F30;
      --nb-yellow: #FFF0B8;
      --nb-line: #DCE3E0;
      --nb-board: #26343B;
      --nb-chalk: #F7F3E9;

      position: relative;
      isolation: isolate;

      display: flex;
      flex-direction: column;

      width: 100%;
      height: 100%;

      min-width: 0;
      min-height: 0;

      overflow: hidden;

      container-type: size;

      background: var(--nb-paper);
      color: var(--nb-ink);

      font-family:
        "Atkinson Hyperlegible",
        system-ui,
        sans-serif;

      font-size: 16px;
      line-height: 1.55;
    }

    .vl-notebook *,
    .vl-notebook *::before,
    .vl-notebook *::after {
      box-sizing: border-box;
    }

    .vl-notebook [hidden] {
      display: none !important;
    }

    /* ==================================================
       03. SHARED PLAYER CHROME
       ================================================== */

    /*
     * The player owns:
     * - navigation
     * - progress
     * - captions
     * - controls
     *
     * The notebook does not duplicate them.
     */

    .vl-notebook .nb-header,
    .vl-notebook .nb-progress,
    .vl-notebook .nb-counter,
    .vl-notebook .nb-lesson,
    .vl-notebook .nb-footer {
      display: none !important;
    }

    /* ==================================================
       04. SCROLLABLE NOTEBOOK
       ================================================== */

    .vl-notebook .nb-scroll {
      position: relative;

      flex: 1 1 auto;

      width: 100%;
      min-width: 0;
      min-height: 0;

      overflow-x: hidden;
      overflow-y: auto;

      overscroll-behavior: contain;

      scrollbar-width: thin;
      scrollbar-color:
        #A9B7B5 transparent;

      background-color: var(--nb-paper);

      background-image:
        repeating-linear-gradient(
          to bottom,
          transparent 0,
          transparent 35px,
          rgba(36,75,101,.065) 35px,
          rgba(36,75,101,.065) 36px
        );
    }

    .vl-notebook .nb-page {
      position: relative;

      width: 100%;
      max-width: 1000px;

      min-height: 100%;

      margin-inline: auto;

      padding:
        clamp(22px,3vw,44px)
        clamp(20px,4vw,56px)
        50px
        clamp(40px,5vw,74px);
    }

    .vl-notebook .nb-page::before {
      content: "";

      position: absolute;

      top: 0;
      bottom: 0;

      left: clamp(27px,3vw,48px);

      width: 1px;

      background:
        rgba(150,63,48,.30);

      pointer-events: none;
    }

    /* ==================================================
       05. READY STATE
       ================================================== */

    .vl-notebook .nb-ready {
      display: flex;
      flex-direction: column;

      align-items: flex-start;
      justify-content: center;

      min-height:
        min(65cqh,540px);

      max-width: 680px;

      gap: 14px;
    }

    .vl-notebook .nb-ready-symbol {
      position: relative;

      display: grid;
      place-items: center;

      width: 74px;
      height: 74px;

      margin-bottom: 10px;

      border: 2px solid
        var(--nb-blue);

      border-radius: 50%;

      color: var(--nb-blue);

      font-family:
        "Fraunces",
        Georgia,
        serif;

      font-size: 45px;
      font-style: italic;

      line-height: 1;
    }

    .vl-notebook .nb-ready-symbol::after {
      content: "";

      position: absolute;

      inset: -5px;

      border: 1px solid
        rgba(150,63,48,.65);

      border-radius: 48% 52% 49% 51%;

      transform: rotate(-9deg);
    }

    .vl-notebook .nb-ready-title {
      max-width: 19ch;

      margin: 0;

      color: var(--nb-ink);

      font-family:
        "Fraunces",
        Georgia,
        serif;

      font-size:
        clamp(30px,4vw,52px);

      font-weight: 650;

      line-height: 1.12;
      letter-spacing: -.035em;

      text-wrap: balance;
    }

    .vl-notebook .nb-ready-note {
      max-width: 48ch;

      margin: 0;

      color: var(--nb-blue);

      font-size:
        clamp(15px,1.4vw,18px);

      line-height: 1.55;
    }

    /* ==================================================
       06. MOMENT STRUCTURE
       ================================================== */

    .vl-notebook .nb-content {
      display: grid;

      width: 100%;

      gap: 16px;

      align-content: start;
    }

    .vl-notebook .nb-entry {
      position: relative;

      min-width: 0;

      overflow-wrap: anywhere;
    }

    .vl-notebook .nb-entry.nb-new {
      animation:
        nb-write-in 280ms ease-out both;
    }

    @keyframes nb-write-in {
      from {
        opacity: 0;
        transform: translateY(8px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .vl-notebook .nb-entry.nb-active {
      border-radius: 8px;
    }

    .vl-notebook .nb-entry.nb-active::before {
      content: "";

      position: absolute;

      top: 8px;
      bottom: 8px;
      left: -15px;

      width: 3px;

      border-radius: 3px;

      background: var(--nb-red);
    }

    .vl-notebook .nb-eyebrow {
      display: block;

      margin-bottom: 10px;

      color: var(--nb-blue);

      font-size: 12px;
      font-weight: 800;

      line-height: 1.4;
      letter-spacing: .10em;

      text-transform: uppercase;
    }

    /* ==================================================
       07. TITLE MOMENTS
       ================================================== */

    .vl-notebook .nb-title {
      padding:
        8px 0 18px;

      margin-bottom: 4px;
    }

    .vl-notebook .nb-title h2 {
      position: relative;

      max-width: 26ch;

      margin: 0;

      color: var(--nb-ink);

      font-family:
        "Fraunces",
        Georgia,
        serif;

      font-size:
        clamp(28px,3.5vw,46px);

      font-weight: 650;

      line-height: 1.14;
      letter-spacing: -.035em;

      text-wrap: balance;
    }

    .vl-notebook .nb-title-line {
      display: block;

      width: min(260px,65%);
      height: 3px;

      margin-top: 18px;

      border-radius: 3px;

      background: var(--nb-red);
    }

    /* ==================================================
       08. ITEM MOMENTS
       ================================================== */

    .vl-notebook .nb-item {
      display: grid;

      grid-template-columns:
        48px minmax(0,1fr);

      align-items: start;

      gap: 14px;

      padding: 16px 0;
    }

    .vl-notebook .nb-item-icon {
      display: grid;
      place-items: center;

      width: 44px;
      height: 44px;

      border: 1.5px solid
        var(--nb-blue);

      border-radius: 12px;

      background:
        rgba(36,75,101,.055);

      color: var(--nb-blue);
    }

    .vl-notebook .nb-item-icon svg {
      width: 25px;
      height: 25px;
    }

    .vl-notebook .nb-item h3 {
      max-width: 32ch;

      margin: 0 0 7px;

      color: var(--nb-ink);

      font-family:
        "Fraunces",
        Georgia,
        serif;

      font-size:
        clamp(21px,2.2vw,29px);

      font-weight: 650;

      line-height: 1.2;
    }

    .vl-notebook .nb-item p {
      max-width: 64ch;

      margin: 0;

      color: var(--nb-ink);

      font-size:
        clamp(16px,1.4vw,19px);

      line-height: 1.55;
    }

    .vl-notebook .nb-item-index {
      display: inline-block;

      margin-bottom: 7px;

      color: var(--nb-blue);

      font-size: 12px;
      font-weight: 800;

      letter-spacing: .06em;
    }

    /* ==================================================
       09. QUESTION MOMENTS
       ================================================== */

    .vl-notebook .nb-question {
      padding: 20px;

      border: 1px solid
        #D8D2BC;

      border-radius: 12px;

      background: #FFF5D7;
    }

    .vl-notebook .nb-question-mark {
      display: block;

      margin-bottom: 10px;

      color: var(--nb-red);

      font-family:
        "Fraunces",
        Georgia,
        serif;

      font-size: 40px;
      font-weight: 700;

      line-height: 1;
    }

    .vl-notebook .nb-question h2 {
      max-width: 35ch;

      margin: 0;

      font-family:
        "Fraunces",
        Georgia,
        serif;

      font-size:
        clamp(22px,2.6vw,34px);

      font-weight: 650;

      line-height: 1.25;
    }

    /* ==================================================
       10. FORMULA MOMENTS
       ================================================== */

    .vl-notebook .nb-formula {
      padding: 20px;

      border: 1px solid
        #C8D5D9;

      border-radius: 12px;

      background: #EDF3F4;
    }

    .vl-notebook .nb-fraction {
      display: grid;

      justify-items: stretch;

      width: min(100%,560px);

      gap: 12px;

      font-family:
        "Fraunces",
        Georgia,
        serif;

      font-size:
        clamp(23px,2.8vw,36px);

      font-weight: 650;

      line-height: 1.3;

      text-align: center;
    }

    .vl-notebook .nb-numerator,
    .vl-notebook .nb-denominator {
      overflow-wrap: anywhere;
    }

    .vl-notebook .nb-denominator {
      padding-top: 12px;

      border-top: 3px solid
        var(--nb-blue);
    }

    /* ==================================================
       11. ISSUE MOMENTS
       ================================================== */

    .vl-notebook .nb-issue {
      padding: 17px 19px;

      border-left: 4px solid
        var(--nb-red);

      border-radius: 0 10px 10px 0;

      background: #F7E9E3;
    }

    .vl-notebook .nb-issue-label {
      display: block;

      margin-bottom: 7px;

      color: var(--nb-red);

      font-size: 12px;
      font-weight: 800;

      letter-spacing: .08em;

      text-transform: uppercase;
    }

    .vl-notebook .nb-issue p {
      margin: 0;

      font-size:
        clamp(16px,1.4vw,18px);

      line-height: 1.5;
    }

    .vl-notebook .nb-effect {
      display: inline-block;

      margin-top: 10px;

      color: var(--nb-red);

      font-size: 14px;
      font-weight: 800;
    }

    /* ==================================================
       12. COMPARISON MOMENTS
       ================================================== */

    .vl-notebook .nb-pair {
      display: grid;

      grid-template-columns:
        repeat(2,minmax(0,1fr));

      gap: 14px;
    }

    .vl-notebook .nb-compare {
      min-width: 0;

      padding: 20px;

      border: 1px solid
        #BFCFD2;

      border-radius: 12px;

      background: #F0F5F5;
    }

    .vl-notebook
    .nb-compare[data-side="b"] {
      border-color: #D5B8AC;

      background: #FAEEE8;
    }

    .vl-notebook .nb-compare .nb-eyebrow {
      margin-bottom: 8px;
    }

    .vl-notebook .nb-compare p {
      margin: 0;

      font-family:
        "Fraunces",
        Georgia,
        serif;

      font-size:
        clamp(20px,2.1vw,28px);

      font-weight: 650;

      line-height: 1.25;
    }

    .vl-notebook .nb-arrow {
      display: block;

      margin: 8px 0 12px;

      color: var(--nb-blue);

      font-size: 38px;

      line-height: 1;
    }

    .vl-notebook
    .nb-compare[data-side="b"]
    .nb-arrow {
      color: var(--nb-red);
    }

    /* ==================================================
       13. STATEMENT MOMENTS
       ================================================== */

    .vl-notebook .nb-statement {
      padding:
        15px 8px 15px 20px;

      border-left: 4px solid
        var(--nb-blue);
    }

    .vl-notebook .nb-statement p {
      max-width: 50ch;

      margin: 0;

      font-family:
        "Fraunces",
        Georgia,
        serif;

      font-size:
        clamp(21px,2.5vw,32px);

      font-weight: 600;

      line-height: 1.3;
    }

    /* ==================================================
       14. DIAGRAM MOMENTS
       ================================================== */

    .vl-notebook .nb-diagram {
      min-width: 0;

      padding: 16px;

      border: 2px solid
        #40515B;

      border-radius: 12px;

      background: var(--nb-board);
      color: var(--nb-chalk);
    }

    .vl-notebook
    .nb-diagram
    .nb-eyebrow {
      color: #DCE7E9;
    }

    .vl-notebook .nb-diagram-svg {
      width: 100%;
      min-width: 0;

      overflow-x: auto;
    }

    .vl-notebook .nb-diagram-svg svg {
      display: block;

      width: 100%;
      height: auto;

      max-width: 100%;
      max-height: min(55dvh,520px);

      margin-inline: auto;
    }

    .vl-notebook .nb-diagram-caption {
      margin: 12px 0 0;

      color: #E5EDF0;

      font-size: 14px;
      line-height: 1.5;
    }

    /* ==================================================
       15. ACCESSIBILITY
       ================================================== */

    .vl-notebook .nb-sr {
      position: absolute;

      width: 1px;
      height: 1px;

      padding: 0;
      margin: -1px;

      overflow: hidden;

      clip: rect(0,0,0,0);
      white-space: nowrap;

      border: 0;
    }

    .vl-notebook .nb-scroll:focus-visible {
      outline: 3px solid
        var(--nb-blue);

      outline-offset: -3px;
    }

    /* ==================================================
       16. NARROW CONTAINERS
       ================================================== */

    @container (max-width: 500px) {

      .vl-notebook .nb-page {
        padding:
          20px
          16px
          40px
          36px;
      }

      .vl-notebook .nb-page::before {
        left: 25px;
      }

      .vl-notebook .nb-ready {
        min-height: 55cqh;
      }

      .vl-notebook .nb-ready-symbol {
        width: 62px;
        height: 62px;

        font-size: 38px;
      }

      .vl-notebook .nb-ready-title {
        font-size:
          clamp(28px,8cqw,36px);
      }

      .vl-notebook .nb-ready-note {
        font-size: 15px;
      }

      .vl-notebook .nb-title h2 {
        font-size:
          clamp(27px,7cqw,36px);
      }

      .vl-notebook .nb-item {
        grid-template-columns:
          40px minmax(0,1fr);

        gap: 10px;
      }

      .vl-notebook .nb-item-icon {
        width: 40px;
        height: 40px;
      }

      .vl-notebook .nb-item-icon svg {
        width: 23px;
        height: 23px;
      }

      .vl-notebook .nb-item h3 {
        font-size: 21px;
      }

      .vl-notebook .nb-item p {
        font-size: 16px;
      }

      .vl-notebook .nb-pair {
        grid-template-columns: 1fr;
      }

      .vl-notebook .nb-question,
      .vl-notebook .nb-formula,
      .vl-notebook .nb-compare {
        padding: 16px;
      }

      .vl-notebook .nb-diagram {
        padding: 10px;
      }

      .vl-notebook .nb-diagram-svg svg {
        max-height: 48dvh;
      }
    }

    /* ==================================================
       17. SHORT VIEWPORTS
       ================================================== */

    @container (max-height: 480px) {

      .vl-notebook .nb-page {
        padding-top: 14px;
      }

      .vl-notebook .nb-ready {
        min-height: 42cqh;
      }

      .vl-notebook .nb-ready-symbol {
        width: 50px;
        height: 50px;

        font-size: 31px;
      }

      .vl-notebook .nb-ready-title {
        font-size: 27px;
      }
    }

    /* ==================================================
       18. REDUCED MOTION
       ================================================== */

    @media (prefers-reduced-motion: reduce) {

      .vl-notebook .nb-entry.nb-new {
        animation: none !important;
      }

      .vl-notebook .nb-scroll {
        scroll-behavior: auto !important;
      }

      .vl-notebook *,
      .vl-notebook *::before,
      .vl-notebook *::after {
        transition-duration: 0ms !important;
      }
    }

  `;

  /* ======================================================
     19. INSTALL STYLES
     ====================================================== */

  const STYLE_ID = "vl-notebook-v25";

  if (!document.getElementById(STYLE_ID)) {
    const sheet =
      document.createElement("style");

    sheet.id = STYLE_ID;

    sheet.textContent =
      window.LAB &&
      typeof window.LAB.k === "function"
        ? window.LAB.k(css)
        : css;

    document.head.appendChild(sheet);
  }

  /* ======================================================
     20. ICONS
     ====================================================== */

  function makeIcon(key) {
    const wrapper = node(
      "span",
      "nb-item-icon"
    );

    decorative(wrapper);

    if (
      window.LAB &&
      typeof window.LAB.icon === "function"
    ) {
      wrapper.innerHTML =
        window.LAB.icon(key);
    } else {
      wrapper.textContent = "•";
    }

    return wrapper;
  }

  /* ======================================================
     21. MOMENT RENDERERS
     ====================================================== */

  function makeTitle(m) {
    const element = node(
      "article",
      "nb-entry nb-title"
    );

    element.append(
      node(
        "span",
        "nb-eyebrow",
        m.kicker || "The big idea"
      ),

      node(
        "h2",
        "",
        m.text
      ),

      decorative(
        node(
          "span",
          "nb-title-line"
        )
      )
    );

    return element;
  }

  function makeItem(m) {
    const element = node(
      "article",
      "nb-entry nb-item"
    );

    const copy = node("div");

    if (m.n != null) {
      copy.append(
        node(
          "span",
          "nb-item-index",
          `${m.n}${m.of ? ` of ${m.of}` : ""}`
        )
      );
    }

    copy.append(
      node("h3", "", m.title)
    );

    if (m.text) {
      copy.append(
        node("p", "", m.text)
      );
    }

    element.append(
      makeIcon(m.icon),
      copy
    );

    return element;
  }

  function makeQuestion(m) {
    const element = node(
      "article",
      "nb-entry nb-question"
    );

    element.append(
      decorative(
        node(
          "span",
          "nb-question-mark",
          "?"
        )
      ),

      node(
        "span",
        "nb-eyebrow",
        "Consider this"
      ),

      node(
        "h2",
        "",
        m.text
      )
    );

    return element;
  }

  function makeFormula(m) {
    const element = node(
      "article",
      "nb-entry nb-formula"
    );

    element.append(
      node(
        "span",
        "nb-eyebrow",
        m.label || "The calculation"
      )
    );

    const fraction = node(
      "div",
      "nb-fraction"
    );

    fraction.setAttribute(
      "aria-label",
      `${m.num || ""} divided by ${m.den || ""}`
    );

    fraction.append(
      node(
        "div",
        "nb-numerator",
        m.num
      ),

      node(
        "div",
        "nb-denominator",
        m.den
      )
    );

    element.append(fraction);

    return element;
  }

  function makeIssue(m) {
    const element = node(
      "article",
      "nb-entry nb-issue"
    );

    element.append(
      node(
        "span",
        "nb-issue-label",
        "What went wrong"
      ),

      node(
        "p",
        "",
        m.text
      )
    );

    if (m.effect) {
      element.append(
        node(
          "span",
          "nb-effect",
          m.effect
        )
      );
    }

    return element;
  }

  function makeCompare(m) {
    const element = node(
      "article",
      "nb-entry nb-compare"
    );

    element.dataset.side =
      m.side || "a";

    element.append(
      node(
        "span",
        "nb-eyebrow",
        m.label || "Comparison"
      ),

      decorative(
        node(
          "span",
          "nb-arrow",
          m.dir === "up"
            ? "↗"
            : m.dir === "down"
              ? "↘"
              : "↔"
        )
      ),

      node(
        "p",
        "",
        m.note
      )
    );

    return element;
  }

  function makeStatement(m) {
    const element = node(
      "article",
      "nb-entry nb-statement"
    );

    element.append(
      node(
        "p",
        "",
        m.text || m.title
      )
    );

    return element;
  }

  function makeDiagram(m) {
    const element = node(
      "article",
      "nb-entry nb-diagram"
    );

    element.append(
      node(
        "span",
        "nb-eyebrow",
        m.kicker || "Picture it"
      )
    );

    const figure = node(
      "div",
      "nb-diagram-svg"
    );

    /*
     * Only trusted locally generated SVG
     * should be assigned to innerHTML.
     */

    figure.innerHTML =
      typeof m.svg === "string"
        ? m.svg
        : "";

    element.append(figure);

    if (m.caption) {
      element.append(
        node(
          "p",
          "nb-diagram-caption",
          m.caption
        )
      );
    }

    return element;
  }

  function makeDefault(m) {
    return makeStatement(m);
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

  /* ======================================================
     22. INSTANCE STATE
     ====================================================== */

  let root = null;
  let scroll = null;
  let content = null;
  let ready = null;

  let section = null;
  let entries = [];

  let lastStep = null;

  let scrollFrame = 0;
  let announceTimer = 0;

  let liveRegion = null;

  /* ======================================================
     23. CANCEL PENDING WORK
     ====================================================== */

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

  /* ======================================================
     24. MOUNT
     ====================================================== */

  function mount(element) {
    cancelPending();

    root = element;

    if (!root) return;

    root.classList.add(ROOT_CLASS);

    root.replaceChildren();

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
      "Teacher's notebook lesson notes"
    );

    const page = node(
      "div",
      "nb-page"
    );

    ready = node(
      "div",
      "nb-ready"
    );

    ready.append(
      decorative(
        node(
          "div",
          "nb-ready-symbol",
          "a"
        )
      ),

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

    content = node(
      "div",
      "nb-content"
    );

    liveRegion = node(
      "div",
      "nb-sr"
    );

    liveRegion.setAttribute(
      "aria-live",
      "polite"
    );

    liveRegion.setAttribute(
      "aria-atomic",
      "true"
    );

    page.append(
      ready,
      content
    );

    scroll.append(page);

    root.append(
      scroll,
      liveRegion
    );

    section = null;
    entries = [];

    lastStep = null;
  }

  /* ======================================================
     25. BUILD ENTRIES
     ====================================================== */

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

    const fragment =
      document.createDocumentFragment();

    let pair = null;

    entries = [];

    sorted.forEach(({ moment }) => {
      if (
        !moment ||
        typeof moment !== "object"
      ) {
        return;
      }

      const element =
        makeMoment(moment);

      element.hidden = true;

      if (moment.type === "compare") {
        if (!pair) {
          pair = node(
            "div",
            "nb-pair"
          );

          fragment.append(pair);
        }

        pair.append(element);
      } else {
        pair = null;

        fragment.append(element);
      }

      entries.push({
        moment,
        element
      });
    });

    content.replaceChildren(fragment);
  }

  /* ======================================================
     26. LOAD
     ====================================================== */

  function load(data) {
    cancelPending();

    if (
      !root ||
      !scroll ||
      !content
    ) {
      return;
    }

    section = data || {};

    const moments = Array.isArray(
      section.moments
    )
      ? section.moments
      : [];

    buildEntries(moments);

    scroll.scrollTop = 0;

    lastStep = null;

    step(-1);
  }

  /* ======================================================
     27. NEWEST MOMENT
     ====================================================== */

  function newestAtFor(index) {
    let newest = -1;

    entries.forEach(({ moment }) => {
      const at = safeNumber(
        moment.at,
        -1
      );

      if (
        at >= 0 &&
        at <= index &&
        at > newest
      ) {
        newest = at;
      }
    });

    return newest;
  }

  /* ======================================================
     28. KEEP ACTIVE MOMENT VISIBLE
     ====================================================== */

  function keepVisible(
    target,
    force = false
  ) {
    if (
      !scroll ||
      !target ||
      target.hidden
    ) {
      return;
    }

    const scrollRect =
      scroll.getBoundingClientRect();

    const targetRect =
      target.getBoundingClientRect();

    const targetBottom =
      targetRect.bottom -
      scrollRect.top +
      scroll.scrollTop;

    const visibleBottom =
      scroll.scrollTop +
      scroll.clientHeight -
      24;

    if (
      force ||
      targetBottom > visibleBottom
    ) {
      scroll.scrollTop = Math.max(
        0,
        targetBottom -
        scroll.clientHeight +
        24
      );
    }
  }

  /* ======================================================
     29. ACCESSIBLE ANNOUNCEMENT
     ====================================================== */

  function announce(index, total) {
    if (!liveRegion) return;

    clearTimeout(announceTimer);

    announceTimer = setTimeout(() => {
      /*
       * Announce position only.
       *
       * The notebook must not duplicate
       * the speech narration itself.
       */

      if (index < 0) {
        liveRegion.textContent =
          "Lesson ready.";
      } else {
        liveRegion.textContent =
          `Visual notes updated. ` +
          `Sentence ${index + 1} of ${total}.`;
      }
    }, 150);
  }

  /* ======================================================
     30. SENTENCE PROGRESSION
     ====================================================== */

  function step(i) {
    if (
      !section ||
      !root ||
      !scroll
    ) {
      return;
    }

    cancelPending();

    const sentences = Array.isArray(
      section.sentences
    )
      ? section.sentences
      : [];

    const total = sentences.length;

    const index = clamp(
      Math.trunc(safeNumber(i, -1)),
      -1,
      Math.max(-1, total - 1)
    );

    const newest =
      newestAtFor(index);

    let newestElement = null;

    entries.forEach(
      ({ moment, element }) => {
        const at = safeNumber(
          moment.at,
          -1
        );

        const visible =
          index >= 0 &&
          at >= 0 &&
          at <= index;

        const wasHidden =
          element.hidden;

        element.hidden =
          !visible;

        element.classList.toggle(
          "nb-active",
          visible &&
          at === newest
        );

        element.classList.remove(
          "nb-new"
        );

        if (
          visible &&
          wasHidden &&
          !reducedMotion()
        ) {
          void element.offsetWidth;

          element.classList.add(
            "nb-new"
          );
        }

        if (
          visible &&
          at === newest
        ) {
          newestElement = element;
        }
      }
    );

    /*
     * Hide empty comparison wrappers.
     */

    content
      .querySelectorAll(".nb-pair")
      .forEach(pair => {
        pair.hidden = !Array.from(
          pair.children
        ).some(
          child => !child.hidden
        );
      });

    const anyVisible =
      entries.some(
        entry => !entry.element.hidden
      );

    ready.hidden = anyVisible;

    const backwards =
      lastStep !== null &&
      index < lastStep;

    if (newestElement) {
      keepVisible(
        newestElement,
        backwards
      );

      scrollFrame =
        requestAnimationFrame(() => {
          scrollFrame = 0;

          keepVisible(
            newestElement,
            false
          );
        });
    } else {
      scroll.scrollTop = 0;
    }

    /*
     * Repeated calls with the same index
     * must not cause repeated announcements.
     */

    if (index !== lastStep) {
      announce(index, total);
    }

    lastStep = index;
  }

  /* ======================================================
     31. REGISTRATION
     ====================================================== */

  if (!Array.isArray(window.STYLES)) {
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

// END FILE