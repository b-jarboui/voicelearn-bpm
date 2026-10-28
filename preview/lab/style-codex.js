// FILE: style-codex.js

/*
 * VoiceLearn — Signal Studio v25
 * OPER621 Business Process Management
 *
 * Source-faithful visual revision of v24.
 *
 * Preserved:
 * - STYLES registration: id "codex"
 * - mount(rootEl), load(data), step(i)
 * - Sentence-indexed moment reveal
 * - Stable source ordering for equal indices
 * - Comparison grouping
 * - All seven moment types
 * - Existing diagram SVG rendering
 * - Local SVG icons
 * - Scrolling within the lesson canvas
 *
 * Improved:
 * - One shared player header and progress bar
 * - No duplicated title, counter, or footer
 * - Responsive typography
 * - Accessible contrast
 * - Better diagram sizing
 * - Compact mobile presentation
 * - Restrained animation
 * - Reduced-motion support
 * - No focus stealing
 *
 * No speech or narration logic is modified.
 */

(() => {
  "use strict";

  const css = `

    /* ====================================================
       01. SIGNAL STUDIO TOKENS
       ==================================================== */

    .cx-signal {
      --cx-bg: #102D2C;
      --cx-paper: #F5F7F1;
      --cx-lime: #D6F28A;
      --cx-muted: #C5D8D0;
      --cx-line: #68867E;
      --cx-panel: #1B403B;
      --cx-panel-light: #28534B;
      --cx-coral: #FFBEA7;

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

      background: var(--cx-bg);
      color: var(--cx-paper);

      font-family:
        "Atkinson Hyperlegible",
        system-ui,
        sans-serif;

      font-size: 16px;
      line-height: 1.5;
    }

    .cx-signal * {
      box-sizing: border-box;
    }

    .cx-signal [hidden] {
      display: none !important;
    }

    /* ====================================================
       02. REMOVE DUPLICATED PLAYER CHROME
       ==================================================== */

    .cx-signal .cx-top,
    .cx-signal .cx-progress,
    .cx-signal .cx-counter,
    .cx-signal .cx-lesson,
    .cx-signal .cx-foot,
    .cx-signal .cx-count {
      display: none !important;
    }

    /* ====================================================
       03. SCROLLING LESSON CANVAS
       ==================================================== */

    .cx-signal .cx-scroll {
      flex: 1 1 auto;

      width: 100%;
      min-width: 0;
      min-height: 0;

      overflow-x: hidden;
      overflow-y: auto;

      overscroll-behavior: contain;

      scrollbar-width: thin;
      scrollbar-color:
        #799A90 transparent;

      padding:
        clamp(20px, 3vw, 44px);

      scroll-padding-block: 24px;
    }

    .cx-signal .cx-content {
      width: 100%;
      max-width: 960px;

      margin-inline: auto;

      padding-bottom: 30px;
    }

    /* ====================================================
       04. READY STATE
       ==================================================== */

    .cx-signal .cx-wait {
      display: flex;
      flex-direction: column;

      align-items: flex-start;
      justify-content: center;

      width: 100%;
      max-width: 960px;

      min-height: 100%;

      margin-inline: auto;

      gap: 20px;
    }

    .cx-signal .cx-orbit {
      position: relative;

      width: 112px;
      height: 112px;

      margin-bottom: 8px;

      border: 1px solid
        rgba(213,232,222,.55);

      border-radius: 50%;
    }

    .cx-signal .cx-orbit::before {
      content: "";

      position: absolute;
      inset: 17px;

      border: 1px solid
        rgba(213,232,222,.45);

      border-radius: 50%;
    }

    .cx-signal .cx-orbit::after {
      content: "";

      position: absolute;

      inset: 39px;

      border-radius: 50%;

      background: var(--cx-lime);

      box-shadow:
        40px -30px 0 -10px
        var(--cx-paper);
    }

    .cx-signal .cx-wait strong {
      max-width: 17ch;

      color: var(--cx-paper);

      font-family:
        "Bricolage Grotesque",
        system-ui,
        sans-serif;

      font-size:
        clamp(30px, 4vw, 52px);

      font-weight: 800;

      line-height: 1.08;
      letter-spacing: -.04em;

      text-wrap: balance;
    }

    .cx-signal .cx-wait small {
      max-width: 48ch;

      color: var(--cx-muted);

      font-size:
        clamp(15px, 1.4vw, 18px);

      line-height: 1.5;
    }

    /* ====================================================
       05. MOMENT ENTRIES
       ==================================================== */

    .cx-signal .cx-entry {
      position: relative;

      min-width: 0;

      margin-bottom: 14px;

      overflow-wrap: anywhere;
    }

    .cx-signal .cx-enter {
      animation:
        cx-arrive 280ms ease-out both;
    }

    @keyframes cx-arrive {
      from {
        opacity: 0;
        transform: translateY(8px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .cx-signal .cx-eyebrow {
      display: block;

      margin-bottom: 12px;

      color: var(--cx-muted);

      font-size: 12px;
      font-weight: 800;

      line-height: 1.35;
      letter-spacing: .10em;

      text-transform: uppercase;
    }

    .cx-signal .cx-heading {
      max-width: 26ch;

      margin: 0;

      font-family:
        "Bricolage Grotesque",
        system-ui,
        sans-serif;

      font-size:
        clamp(28px, 4vw, 52px);

      font-weight: 800;

      line-height: 1.08;
      letter-spacing: -.035em;

      text-wrap: balance;
      overflow-wrap: anywhere;
    }

    /* ====================================================
       06. TITLE
       ==================================================== */

    .cx-signal .cx-title {
      padding: 4px 0 26px;

      margin-bottom: 18px;

      border-bottom: 1px solid
        rgba(255,255,255,.25);
    }

    .cx-signal .cx-title .cx-eyebrow {
      color: var(--cx-lime);
    }

    /* ====================================================
       07. ITEMS
       ==================================================== */

    .cx-signal .cx-item {
      display: grid;

      grid-template-columns:
        44px minmax(0,1fr) auto;

      align-items: center;

      gap: 14px;

      padding: 16px;

      border: 1px solid
        rgba(255,255,255,.27);

      border-radius: 12px;

      background: var(--cx-panel);

      color: var(--cx-paper);

      transition:
        background 220ms ease,
        border-color 220ms ease;
    }

    .cx-signal .cx-item.cx-active {
      border-color: var(--cx-lime);

      background: var(--cx-panel-light);

      box-shadow:
        inset 4px 0 0
        var(--cx-lime);
    }

    .cx-signal .cx-icon {
      display: grid;
      place-items: center;

      width: 44px;
      height: 44px;

      border: 1px solid
        currentColor;

      border-radius: 50%;

      color: var(--cx-lime);
    }

    .cx-signal .cx-icon svg {
      width: 24px;
      height: 24px;
    }

    .cx-signal .cx-item h3 {
      margin: 0 0 6px;

      font-family:
        "Bricolage Grotesque",
        system-ui,
        sans-serif;

      font-size:
        clamp(19px, 2vw, 25px);

      font-weight: 800;

      line-height: 1.17;
      letter-spacing: -.025em;
    }

    .cx-signal .cx-item p {
      margin: 0;

      color: var(--cx-muted);

      font-size:
        clamp(15px, 1.4vw, 18px);

      line-height: 1.5;
    }

    .cx-signal .cx-index {
      align-self: start;

      padding-top: 3px;

      color: var(--cx-muted);

      font-family:
        ui-monospace,
        monospace;

      font-size: 12px;

      white-space: nowrap;
    }

    /* ====================================================
       08. QUESTIONS
       ==================================================== */

    .cx-signal .cx-question {
      padding:
        clamp(20px, 3vw, 36px);

      margin-bottom: 20px;

      border-radius: 14px;

      background: var(--cx-lime);
      color: var(--cx-bg);
    }

    .cx-signal .cx-question .cx-eyebrow {
      color: var(--cx-bg);
    }

    .cx-signal .cx-question .cx-heading {
      color: var(--cx-bg);
    }

    .cx-signal .cx-q {
      display: block;

      margin-bottom: 16px;

      font-family:
        "Fraunces",
        Georgia,
        serif;

      font-size:
        clamp(48px, 6vw, 76px);

      line-height: 1;
    }

    /* ====================================================
       09. FORMULAS
       ==================================================== */

    .cx-signal .cx-formula {
      padding:
        clamp(20px, 3vw, 36px);

      margin-bottom: 20px;

      border-radius: 14px;

      background: var(--cx-paper);
      color: var(--cx-bg);
    }

    .cx-signal .cx-formula .cx-eyebrow {
      color: #36584F;
    }

    .cx-signal .cx-fraction {
      display: grid;

      width: min(100%, 600px);

      gap: 12px;

      padding: 10px 0;

      font-family:
        "Fraunces",
        Georgia,
        serif;

      font-size:
        clamp(24px, 3vw, 36px);

      font-weight: 600;

      line-height: 1.25;

      text-align: center;
    }

    .cx-signal .cx-fraction span {
      overflow-wrap: anywhere;
    }

    .cx-signal .cx-fraction span + span {
      padding-top: 14px;

      border-top: 3px solid
        var(--cx-bg);
    }

    /* ====================================================
       10. ISSUES
       ==================================================== */

    .cx-signal .cx-issue {
      display: grid;

      grid-template-columns:
        28px minmax(0,1fr);

      gap: 12px;

      padding: 14px 16px;

      border-left: 3px solid
        var(--cx-coral);

      border-radius: 0 10px 10px 0;

      background:
        rgba(255,190,167,.08);
    }

    .cx-signal .cx-alert {
      color: var(--cx-coral);

      font-family:
        "Fraunces",
        Georgia,
        serif;

      font-size: 26px;
      font-weight: 700;

      line-height: 1;
    }

    .cx-signal .cx-issue p {
      margin: 0;

      font-size:
        clamp(15px, 1.4vw, 18px);

      line-height: 1.5;
    }

    .cx-signal .cx-effect {
      display: inline-block;

      margin-top: 8px;

      color: var(--cx-coral);

      font-size: 13px;
      font-weight: 800;

      line-height: 1.4;
    }

    /* ====================================================
       11. COMPARISONS
       ==================================================== */

    .cx-signal .cx-pair {
      display: grid;

      grid-template-columns:
        repeat(2,minmax(0,1fr));

      gap: 14px;

      margin: 18px 0;
    }

    .cx-signal .cx-pair:empty {
      display: none;
    }

    .cx-signal .cx-compare {
      min-width: 0;

      margin: 0;
      padding: 20px;

      border: 1px solid
        rgba(255,255,255,.3);

      border-radius: 12px;

      background: var(--cx-panel);
    }

    .cx-signal .cx-compare[data-side="b"] {
      border-color: var(--cx-coral);

      background: var(--cx-coral);
      color: var(--cx-bg);
    }

    .cx-signal .cx-compare .cx-arrow {
      display: block;

      margin: 8px 0 12px;

      color: var(--cx-lime);

      font-size:
        clamp(36px, 4vw, 56px);

      line-height: 1;
    }

    .cx-signal
    .cx-compare[data-side="b"]
    .cx-arrow {
      color: var(--cx-bg);
    }

    .cx-signal
    .cx-compare[data-side="b"]
    .cx-eyebrow {
      color: var(--cx-bg);
    }

    .cx-signal .cx-compare p {
      margin: 0;

      font-family:
        "Bricolage Grotesque",
        system-ui,
        sans-serif;

      font-size:
        clamp(19px, 2vw, 27px);

      font-weight: 800;

      line-height: 1.2;

      overflow-wrap: anywhere;
    }

    /* ====================================================
       12. STATEMENTS
       ==================================================== */

    .cx-signal .cx-statement {
      margin-top: 20px;

      padding: 24px 0 8px;

      border-top: 2px solid
        var(--cx-lime);
    }

    .cx-signal
    .cx-statement
    .cx-eyebrow {
      color: var(--cx-lime);
    }

    .cx-signal .cx-statement p {
      max-width: 48ch;

      margin: 0;

      font-family:
        "Fraunces",
        Georgia,
        serif;

      font-size:
        clamp(23px, 2.8vw, 35px);

      font-weight: 600;

      line-height: 1.25;
      letter-spacing: -.025em;

      text-wrap: pretty;
    }

    /* ====================================================
       13. DIAGRAMS
       ==================================================== */

    .cx-signal .cx-diagram {
      min-width: 0;

      margin: 18px 0;
      padding:
        clamp(12px, 2vw, 22px);

      border: 1px solid
        rgba(255,255,255,.3);

      border-radius: 14px;

      background: #193B37;
    }

    .cx-signal .cx-diagram .cx-eyebrow {
      color: var(--cx-lime);
    }

    .cx-signal .cx-diagram.cx-active {
      border-color: var(--cx-lime);
    }

    .cx-signal .cx-dg {
      width: 100%;
      min-width: 0;

      overflow-x: auto;

      color: var(--cx-paper);
    }

    .cx-signal .cx-dg svg {
      display: block;

      width: 100%;
      height: auto;

      max-width: 100%;
      max-height: min(55dvh,520px);

      margin-inline: auto;
    }

    .cx-signal .cx-cap {
      margin: 12px 0 0;

      color: var(--cx-muted);

      font-size: 14px;
      line-height: 1.5;
    }

    /* ====================================================
       14. MOBILE
       ==================================================== */

    @container (max-width: 500px) {

      .cx-signal .cx-scroll {
        padding: 20px 16px 28px;
      }

      .cx-signal .cx-heading {
        font-size:
          clamp(27px,8cqw,36px);
      }

      .cx-signal .cx-item {
        grid-template-columns:
          40px minmax(0,1fr);

        gap: 10px;

        padding: 14px;
      }

      .cx-signal .cx-icon {
        width: 40px;
        height: 40px;
      }

      .cx-signal .cx-index {
        grid-column: 2;

        padding-top: 0;
      }

      .cx-signal .cx-item h3 {
        font-size: 19px;
      }

      .cx-signal .cx-item p {
        font-size: 15px;
      }

      .cx-signal .cx-question,
      .cx-signal .cx-formula {
        padding: 20px;
      }

      .cx-signal .cx-pair {
        grid-template-columns: 1fr;
      }

      .cx-signal .cx-compare {
        padding: 16px;
      }

      .cx-signal .cx-statement p {
        font-size: 24px;
      }

      .cx-signal .cx-wait strong {
        font-size: 32px;
      }

      .cx-signal .cx-orbit {
        width: 100px;
        height: 100px;
      }

      .cx-signal .cx-diagram {
        padding: 10px;
      }

      .cx-signal .cx-dg svg {
        max-height: 48dvh;
      }
    }

    /* ====================================================
       15. REDUCED MOTION
       ==================================================== */

    @media (prefers-reduced-motion: reduce) {

      .cx-signal .cx-enter {
        animation: none !important;
      }

      .cx-signal .cx-item {
        transition: none !important;
      }

      .cx-signal .cx-scroll {
        scroll-behavior: auto !important;
      }
    }

  `;

  /* ======================================================
     16. STYLESHEET INSTALLATION
     ====================================================== */

  const sheet = document.createElement("style");

  sheet.id = "vl-signal-studio-v25";

  sheet.textContent =
    window.LAB &&
    typeof window.LAB.k === "function"
      ? window.LAB.k(css)
      : css;

  document.head.appendChild(sheet);

  /* ======================================================
     17. DOM HELPERS
     ====================================================== */

  function node(tag, cls = "", text = null) {
    const element =
      document.createElement(tag);

    if (cls) {
      element.className = cls;
    }

    if (text != null) {
      element.textContent = String(text);
    }

    return element;
  }

  /* ======================================================
     18. ICONS
     ====================================================== */

  const icons = {
    target:
      '<circle cx="12" cy="12" r="8"/>' +
      '<circle cx="12" cy="12" r="3"/>',

    check:
      '<path d="m5 12 4 4L19 6"/>',

    eq:
      '<path d="M5 9h14M5 15h14"/>',

    clock:
      '<circle cx="12" cy="12" r="8"/>' +
      '<path d="M12 7v5l3 2"/>',

    one:
      '<rect x="5" y="4" width="14" ' +
      'height="16" rx="3"/>' +
      '<path d="m10 9 2-1v8"/>',

    link:
      '<path d="m10 14 4-4m-6 5-1 1' +
      'a4 4 0 0 1-5-6l4-4' +
      'a4 4 0 0 1 6 0m0 3 1-1' +
      'a4 4 0 0 1 6 6l-4 4' +
      'a4 4 0 0 1-6 0"/>'
  };

  function iconMarkup(name) {
    const shared =
      window.LAB &&
      window.LAB.icons
        ? window.LAB.icons
        : {};

    const path =
      icons[name] ||
      shared[name] ||
      '<path d="m6 12 4 4 8-8"/>';

    return `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        ${path}
      </svg>
    `;
  }

  /* ======================================================
     19. STATE
     ====================================================== */

  let root = null;
  let scroll = null;
  let content = null;
  let wait = null;
  let section = null;

  let entries = [];
  let last = null;

  let fitTimer = null;

  /* ======================================================
     20. MOMENT FACTORY
     ====================================================== */

  function makeMoment(moment) {
    const m = moment || {};

    const type =
      m.type || "statement";

    const element = node(
      "article",
      `cx-entry cx-${type}`
    );

    const eyebrow = text => {
      element.append(
        node("span", "cx-eyebrow", text)
      );
    };

    switch (type) {

      /* TITLE */

      case "title": {
        eyebrow(
          m.kicker || "The big idea"
        );

        element.append(
          node(
            "h2",
            "cx-heading",
            m.text
          )
        );

        break;
      }

      /* ITEM */

      case "item": {
        const icon = node(
          "span",
          "cx-icon"
        );

        icon.setAttribute(
          "aria-hidden",
          "true"
        );

        icon.innerHTML =
          iconMarkup(m.icon);

        const copy = node("div");

        copy.append(
          node("h3", "", m.title),
          node("p", "", m.text)
        );

        const index = node(
          "span",
          "cx-index",
          m.n == null
            ? ""
            : (
                String(m.n).padStart(2, "0") +
                (
                  m.of
                    ? ` / ${m.of}`
                    : ""
                )
              )
        );

        element.append(
          icon,
          copy,
          index
        );

        break;
      }

      /* QUESTION */

      case "question": {
        const symbol = node(
          "span",
          "cx-q",
          "?"
        );

        symbol.setAttribute(
          "aria-hidden",
          "true"
        );

        element.append(symbol);

        eyebrow("Consider this");

        element.append(
          node(
            "h2",
            "cx-heading",
            m.text
          )
        );

        break;
      }

      /* FORMULA */

      case "formula": {
        eyebrow(
          m.label || "The calculation"
        );

        const fraction = node(
          "div",
          "cx-fraction"
        );

        fraction.setAttribute(
          "aria-label",
          `${m.num || ""} divided by ` +
          `${m.den || ""}`
        );

        fraction.append(
          node("span", "", m.num),
          node("span", "", m.den)
        );

        element.append(fraction);

        break;
      }

      /* ISSUE */

      case "issue": {
        const alert = node(
          "span",
          "cx-alert",
          "!"
        );

        alert.setAttribute(
          "aria-hidden",
          "true"
        );

        const copy = node("div");

        copy.append(
          node("p", "", m.text)
        );

        if (m.effect) {
          copy.append(
            node(
              "span",
              "cx-effect",
              m.effect
            )
          );
        }

        element.append(
          alert,
          copy
        );

        break;
      }

      /* DIAGRAM */

      case "diagram": {
        eyebrow(
          m.kicker || "Picture it"
        );

        const figure = node(
          "div",
          "cx-dg"
        );

        /*
         * SVG comes from the trusted,
         * locally authored diagram engine.
         *
         * Learner-entered text must never
         * be inserted here as HTML.
         */

        figure.innerHTML =
          m.svg || "";

        element.append(figure);

        if (m.caption) {
          element.append(
            node(
              "p",
              "cx-cap",
              m.caption
            )
          );
        }

        break;
      }

      /* COMPARISON */

      case "compare": {
        element.dataset.side =
          m.side || "a";

        eyebrow(
          m.label || "Comparison"
        );

        const arrow = node(
          "span",
          "cx-arrow",
          m.dir === "up"
            ? "↗"
            : m.dir === "down"
              ? "↘"
              : "↔"
        );

        arrow.setAttribute(
          "aria-hidden",
          "true"
        );

        element.append(
          arrow,
          node("p", "", m.note)
        );

        break;
      }

      /* STATEMENT */

      default: {
        element.className =
          "cx-entry cx-statement";

        eyebrow(
          "Take this with you"
        );

        element.append(
          node(
            "p",
            "",
            m.text || m.title
          )
        );
      }
    }

    return element;
  }

  /* ======================================================
     21. MOUNT
     ====================================================== */

  function mount(rootElement) {
    root = rootElement;

    if (!root) return;

    root.classList.add(
      "cx-signal"
    );

    root.replaceChildren();

    scroll = node(
      "div",
      "cx-scroll"
    );

    scroll.tabIndex = 0;

    scroll.setAttribute(
      "role",
      "region"
    );

    scroll.setAttribute(
      "aria-label",
      "Lesson visual notes"
    );

    wait = node(
      "div",
      "cx-wait"
    );

    const orbit = node(
      "div",
      "cx-orbit"
    );

    orbit.setAttribute(
      "aria-hidden",
      "true"
    );

    wait.append(
      orbit,

      node(
        "strong",
        "",
        "Make room for an idea."
      ),

      node(
        "small",
        "",
        "Press Play. Follow the signal."
      )
    );

    content = node(
      "div",
      "cx-content"
    );

    scroll.append(
      wait,
      content
    );

    root.append(scroll);

    entries = [];
    section = null;
    last = null;
  }

  /* ======================================================
     22. LOAD
     ====================================================== */

  function load(data) {
    if (
      !root ||
      !scroll ||
      !content
    ) {
      return;
    }

    clearTimeout(fitTimer);

    section = data || {};

    last = null;
    entries = [];

    content.replaceChildren();

    let pair = null;

    /*
     * Preserve original order for moments
     * sharing the same sentence index.
     */

    const sorted = (
      Array.isArray(section.moments)
        ? section.moments
        : []
    )
      .map((moment, index) => ({
        moment,
        index
      }))
      .sort((a, b) => {
        const atA =
          Number(a.moment?.at) || 0;

        const atB =
          Number(b.moment?.at) || 0;

        return (
          atA - atB ||
          a.index - b.index
        );
      });

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

      if (
        moment.type === "compare"
      ) {
        if (!pair) {
          pair = node(
            "div",
            "cx-pair"
          );

          content.append(pair);
        }

        pair.append(element);
      } else {
        pair = null;

        content.append(element);
      }

      entries.push({
        moment,
        element
      });
    });

    scroll.scrollTop = 0;

    step(-1);
  }

  /* ======================================================
     23. SCROLL FITTING
     ====================================================== */

  function fitTarget(
    target,
    force = false
  ) {
    if (
      !target ||
      !scroll ||
      !target.isConnected
    ) {
      return;
    }

    const scrollRect =
      scroll.getBoundingClientRect();

    const targetRect =
      target.getBoundingClientRect();

    const bottom =
      targetRect.bottom -
      scrollRect.top +
      scroll.scrollTop;

    const visibleBottom =
      scroll.scrollTop +
      scroll.clientHeight -
      24;

    if (
      force ||
      bottom > visibleBottom
    ) {
      scroll.scrollTop = Math.max(
        0,
        bottom -
        scroll.clientHeight +
        24
      );
    }
  }

  /* ======================================================
     24. SENTENCE PROGRESSION
     ====================================================== */

  function step(index) {
    if (
      !section ||
      !root ||
      !scroll
    ) {
      return;
    }

    clearTimeout(fitTimer);

    const current =
      Number.isFinite(index)
        ? Math.trunc(index)
        : -1;

    const active = entries.filter(
      ({ moment }) =>
        current >= 0 &&
        Number(moment.at) <= current
    );

    const newest = active.length
      ? Number(
          active[active.length - 1]
            .moment.at
        )
      : -1;

    entries.forEach(
      ({ moment, element }) => {
        const at =
          Number(moment.at);

        const visible =
          current >= 0 &&
          Number.isFinite(at) &&
          at <= current;

        const entering =
          visible &&
          element.hidden;

        element.hidden =
          !visible;

        element.classList.toggle(
          "cx-active",
          visible && at === newest
        );

        element.classList.remove(
          "cx-enter"
        );

        if (entering) {
          /*
           * Restart animation only for
           * newly revealed moments.
           */

          void element.offsetWidth;

          element.classList.add(
            "cx-enter"
          );
        }
      }
    );

    /*
     * Comparison wrappers are visible only
     * when at least one child is visible.
     */

    content
      .querySelectorAll(".cx-pair")
      .forEach(pair => {
        pair.hidden = !Array.from(
          pair.children
        ).some(
          child => !child.hidden
        );
      });

    wait.hidden =
      active.length > 0;

    /*
     * No duplicate progress indicator,
     * counter, or footer status is created.
     *
     * Those responsibilities belong to
     * the shared player interface.
     */

    if (active.length) {
      const target =
        active[active.length - 1]
          .element;

      const backwards =
        last != null &&
        current < last;

      fitTarget(
        target,
        backwards
      );

      /*
       * One delayed measurement accounts
       * for text wrapping and SVG layout.
       *
       * This timer does not interact with
       * speech synthesis or narration.
       */

      fitTimer = setTimeout(
        () => {
          if (
            target.isConnected &&
            !target.hidden
          ) {
            fitTarget(
              target,
              false
            );
          }
        },
        320
      );
    } else {
      scroll.scrollTop = 0;
    }

    last = current;
  }

  /* ======================================================
     25. REGISTRATION
     ====================================================== */

  if (!Array.isArray(window.STYLES)) {
    window.STYLES = [];
  }

  window.STYLES.push({
    id: "codex",

    name: "Signal Studio",

    note:
      "A calm analytical field guide: " +
      "clear signals, growing visual notes, " +
      "and one idea at a time.",

    mount,
    load,
    step
  });

})();

// END FILE