// FILE: style-journey.js

/*
 * VoiceLearn — Process Journey v25
 * OPER621 Business Process Management
 *
 * Visual revision of the original v24 renderer.
 *
 * Preserved:
 * - STYLES registration id "journey"
 * - mount(el), load(section), step(i)
 * - One station per narration sentence
 * - Multiple moments within one station
 * - Forward and backward seeking
 * - Comparison grouping
 * - All original semantic moment types
 * - Trusted LAB icons
 * - Trusted authored SVG diagrams
 * - Route and station scrolling
 *
 * Improved:
 * - Compact route overview
 * - No duplicated player header or progress
 * - No duplicated lesson title or counters
 * - No redundant footer
 * - Responsive station cards
 * - Accessible contrast
 * - Improved diagram dimensions
 * - Reduced-motion support
 *
 * No speech or voice logic is modified.
 */

(() => {
  "use strict";

  const ID = "journey";
  const NAME = "Process Journey";

  const NOTE =
    "Follow a connected learning route, " +
    "one station and one idea at a time.";

  const ROOT_CLASS = "vl-journey";
  const STYLE_ID = "vl-journey-v25";

  /* ======================================================
     01. UTILITIES
     ====================================================== */

  const prefersReducedMotion = () =>
    typeof window.matchMedia === "function" &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  function node(tag, className = "", text = null) {
    const el = document.createElement(tag);

    if (className) {
      el.className = className;
    }

    if (text !== null && text !== undefined) {
      el.textContent = String(text);
    }

    return el;
  }

  function decorative(el) {
    el.setAttribute("aria-hidden", "true");
    return el;
  }

  function clamp(value, min, max) {
    return Math.max(
      min,
      Math.min(max, value)
    );
  }

  function number(value, fallback = 0) {
    const n = Number(value);

    return Number.isFinite(n)
      ? n
      : fallback;
  }

  /* ======================================================
     02. CSS
     ====================================================== */

  const css = `

    .vl-journey {
      --jy-bg: #F5F2EB;
      --jy-paper: #FFFEFA;
      --jy-ink: #263D47;
      --jy-muted: #455A62;
      --jy-teal: #24675B;
      --jy-orange: #963D21;
      --jy-line: #C5CEC8;
      --jy-soft: #E4E9E3;
      --jy-board: #26343B;
      --jy-chalk: #F9F7F0;

      position: relative;
      isolation: isolate;

      display: flex;
      flex-direction: column;

      width: 100%;
      height: 100%;

      min-width: 0;
      min-height: 0;

      overflow: hidden;

      background: var(--jy-bg);
      color: var(--jy-ink);

      font-family:
        "Atkinson Hyperlegible",
        system-ui,
        sans-serif;

      font-size: 16px;
      line-height: 1.5;

      container-type: size;
    }

    .vl-journey,
    .vl-journey *,
    .vl-journey *::before,
    .vl-journey *::after {
      box-sizing: border-box;
    }

    .vl-journey [hidden] {
      display: none !important;
    }

    /* ==================================================
       03. REMOVE DUPLICATED PLAYER CHROME
       ================================================== */

    .vl-journey .jy-header,
    .vl-journey .jy-progress,
    .vl-journey .jy-lesson,
    .vl-journey .jy-counter,
    .vl-journey .jy-footer,
    .vl-journey .jy-station-number,
    .vl-journey .jy-count {
      display: none !important;
    }

    /* ==================================================
       04. ROUTE OVERVIEW
       ================================================== */

    .vl-journey .jy-map {
      position: relative;

      flex: 0 0 auto;

      min-height: 40px;

      padding: 7px 12px;

      border-bottom: 1px solid
        var(--jy-line);

      background: var(--jy-bg);
    }

    .vl-journey .jy-map-label {
      position: absolute;

      width: 1px;
      height: 1px;

      overflow: hidden;

      clip-path: inset(50%);

      white-space: nowrap;
    }

    .vl-journey .jy-map-scroll {
      width: 100%;

      overflow-x: auto;
      overflow-y: hidden;

      overscroll-behavior-x: contain;

      scrollbar-width: thin;
      scrollbar-color:
        #91A49B transparent;

      padding: 3px 2px 5px;
    }

    .vl-journey .jy-route {
      display: flex;
      align-items: center;

      width: max-content;
      min-width: 100%;

      padding: 0;
      margin: 0;

      list-style: none;
    }

    .vl-journey .jy-route-stop {
      position: relative;

      display: flex;
      align-items: center;
      justify-content: center;

      flex: 0 0 36px;

      min-width: 0;
      height: 26px;

      color: var(--jy-muted);
    }

    .vl-journey
    .jy-route-stop:not(:last-child)::after {
      content: "";

      position: absolute;

      left: calc(50% + 10px);
      top: 12px;

      width: 16px;
      height: 2px;

      background: #A7B4AE;
    }

    .vl-journey
    .jy-route-stop.jy-done:not(:last-child)::after {
      background: var(--jy-teal);
    }

    .vl-journey .jy-route-node {
      position: relative;
      z-index: 1;

      display: grid;
      place-items: center;

      width: 22px;
      height: 22px;

      border: 2px solid
        #71817C;

      border-radius: 50%;

      background: var(--jy-bg);
      color: var(--jy-ink);

      font-size: 9px;
      font-weight: 800;

      font-variant-numeric:
        tabular-nums;
    }

    .vl-journey
    .jy-route-stop.jy-done
    .jy-route-node {
      background: var(--jy-teal);
      border-color: var(--jy-teal);

      color: #FFFFFF;
    }

    .vl-journey
    .jy-route-stop.jy-current
    .jy-route-node {
      width: 26px;
      height: 26px;

      border: 2px solid
        var(--jy-orange);

      background: var(--jy-orange);
      color: #FFFFFF;

      font-size: 10px;

      box-shadow:
        0 0 0 2px var(--jy-bg),
        0 0 0 3px var(--jy-orange);
    }

    .vl-journey .jy-route-text {
      position: absolute;

      width: 1px;
      height: 1px;

      overflow: hidden;

      clip-path: inset(50%);

      white-space: nowrap;
    }

    /* ==================================================
       05. WORKSPACE
       ================================================== */

    .vl-journey .jy-scroll {
      position: relative;

      flex: 1 1 auto;

      min-width: 0;
      min-height: 0;

      overflow-x: hidden;
      overflow-y: auto;

      overscroll-behavior: contain;

      scrollbar-width: thin;
      scrollbar-color:
        #91A49B transparent;

      scroll-padding-bottom: 30px;
    }

    .vl-journey .jy-workspace {
      position: relative;

      width: 100%;
      max-width: 1000px;

      min-height: 100%;

      margin-inline: auto;

      padding:
        clamp(18px,3vw,42px);

      overflow-wrap: anywhere;
    }

    /* ==================================================
       06. READY STATE
       ================================================== */

    .vl-journey .jy-ready {
      display: flex;
      flex-direction: column;

      align-items: flex-start;
      justify-content: center;

      gap: 16px;

      min-height: min(65cqh,540px);

      padding: 14px 8px;
    }

    .vl-journey .jy-ready-symbol {
      position: relative;

      width: 120px;
      height: 60px;

      margin-bottom: 6px;
    }

    .vl-journey .jy-ready-symbol::before {
      content: "";

      position: absolute;

      left: 20px;
      right: 20px;
      top: 29px;

      height: 3px;

      background: var(--jy-teal);
    }

    .vl-journey .jy-ready-dot {
      position: absolute;

      top: 16px;

      width: 28px;
      height: 28px;

      border: 3px solid
        var(--jy-teal);

      border-radius: 50%;

      background: var(--jy-bg);
    }

    .vl-journey
    .jy-ready-dot:first-child {
      left: 5px;

      background: var(--jy-teal);
    }

    .vl-journey
    .jy-ready-dot:last-child {
      right: 5px;

      border-color: var(--jy-orange);
    }

    .vl-journey .jy-ready-title {
      max-width: 20ch;

      margin: 0;

      color: var(--jy-ink);

      font-family:
        "Bricolage Grotesque",
        system-ui,
        sans-serif;

      font-size:
        clamp(29px,3.5vw,46px);

      font-weight: 800;

      line-height: 1.12;
      letter-spacing: -.035em;

      text-wrap: balance;
    }

    .vl-journey .jy-ready-note {
      max-width: 45ch;

      margin: 0;

      color: var(--jy-muted);

      font-size:
        clamp(15px,1.4vw,18px);

      line-height: 1.5;
    }

    /* ==================================================
       07. STATION TRAIL
       ================================================== */

    .vl-journey .jy-stations {
      position: relative;

      display: grid;

      gap: 18px;

      padding-left: 32px;
    }

    .vl-journey .jy-stations::before {
      content: "";

      position: absolute;

      left: 13px;
      top: 14px;
      bottom: 14px;

      width: 2px;

      border-radius: 2px;

      background: #A9B8B0;
    }

    .vl-journey .jy-station {
      position: relative;

      min-width: 0;
    }

    .vl-journey .jy-station-marker {
      position: absolute;

      left: -32px;
      top: 16px;

      z-index: 2;

      display: grid;
      place-items: center;

      width: 28px;
      height: 28px;

      border: 2px solid
        var(--jy-teal);

      border-radius: 50%;

      background: var(--jy-paper);
      color: var(--jy-teal);

      font-size: 11px;
      font-weight: 800;

      font-variant-numeric:
        tabular-nums;
    }

    .vl-journey
    .jy-station.jy-active
    .jy-station-marker {
      background: var(--jy-orange);
      border-color: var(--jy-orange);

      color: #FFFFFF;

      box-shadow:
        0 0 0 3px var(--jy-bg);
    }

    .vl-journey .jy-station-card {
      position: relative;

      min-width: 0;

      padding:
        clamp(16px,2vw,24px);

      border: 1px solid
        #BAC7BF;

      border-radius: 12px;

      background: var(--jy-paper);

      box-shadow:
        0 2px 0 rgba(38,61,71,.05);
    }

    .vl-journey
    .jy-station.jy-active
    .jy-station-card {
      border: 2px solid
        var(--jy-orange);

      box-shadow:
        0 3px 0 rgba(150,61,33,.08);
    }

    .vl-journey .jy-station-label {
      display: block;

      margin-bottom: 14px;

      color: var(--jy-muted);

      font-size: 12px;
      font-weight: 800;

      line-height: 1.4;
      letter-spacing: .04em;
    }

    .vl-journey
    .jy-station.jy-active
    .jy-station-label {
      color: var(--jy-orange);
    }

    .vl-journey .jy-station-content {
      display: grid;

      gap: 16px;
    }

    .vl-journey
    .jy-station.jy-arrive
    .jy-station-card {
      animation:
        jy-station-enter
        280ms
        ease-out
        both;
    }

    @keyframes jy-station-enter {
      from {
        opacity: 0;
        transform: translateY(8px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* ==================================================
       08. SHARED MOMENT STYLES
       ================================================== */

    .vl-journey .jy-moment {
      min-width: 0;

      overflow-wrap: anywhere;
    }

    .vl-journey .jy-eyebrow {
      display: block;

      margin-bottom: 9px;

      color: var(--jy-teal);

      font-size: 12px;
      font-weight: 800;

      line-height: 1.4;
      letter-spacing: .04em;
    }

    /* ==================================================
       09. TITLE
       ================================================== */

    .vl-journey .jy-title h2 {
      max-width: 28ch;

      margin: 0;

      color: var(--jy-ink);

      font-family:
        "Bricolage Grotesque",
        system-ui,
        sans-serif;

      font-size:
        clamp(27px,3.5vw,46px);

      font-weight: 800;

      line-height: 1.12;
      letter-spacing: -.03em;

      text-wrap: balance;
    }

    /* ==================================================
       10. ITEM
       ================================================== */

    .vl-journey .jy-item {
      display: grid;

      grid-template-columns:
        44px minmax(0,1fr);

      align-items: start;

      gap: 13px;
    }

    .vl-journey .jy-item-icon {
      display: grid;
      place-items: center;

      width: 44px;
      height: 44px;

      border: 1.5px solid
        var(--jy-teal);

      border-radius: 11px;

      background: #E4EEE8;
      color: var(--jy-teal);
    }

    .vl-journey .jy-item-icon svg {
      width: 25px;
      height: 25px;
    }

    .vl-journey .jy-item h3 {
      margin: 0 0 7px;

      color: var(--jy-ink);

      font-family:
        "Bricolage Grotesque",
        system-ui,
        sans-serif;

      font-size:
        clamp(20px,2vw,27px);

      font-weight: 800;

      line-height: 1.2;
    }

    .vl-journey .jy-item p {
      margin: 0;

      color: var(--jy-ink);

      font-size:
        clamp(16px,1.4vw,19px);

      line-height: 1.5;
    }

    .vl-journey .jy-item-index {
      display: block;

      margin-top: 9px;

      color: var(--jy-teal);

      font-size: 12px;
      font-weight: 800;
    }

    /* ==================================================
       11. QUESTION
       ================================================== */

    .vl-journey .jy-question {
      padding: 18px;

      border-left: 4px solid
        var(--jy-teal);

      border-radius: 0 10px 10px 0;

      background: #E8EEE8;
    }

    .vl-journey .jy-question-mark {
      display: block;

      margin-bottom: 8px;

      color: var(--jy-teal);

      font-family:
        "Fraunces",
        Georgia,
        serif;

      font-size: 38px;
      line-height: 1;
    }

    .vl-journey .jy-question h2 {
      margin: 0;

      color: var(--jy-ink);

      font-family:
        "Bricolage Grotesque",
        system-ui,
        sans-serif;

      font-size:
        clamp(22px,2.5vw,33px);

      font-weight: 800;

      line-height: 1.23;
    }

    /* ==================================================
       12. FORMULA
       ================================================== */

    .vl-journey .jy-formula {
      padding: 18px;

      border: 1px solid
        #B4C7BD;

      border-radius: 10px;

      background: #E8EEE8;
    }

    .vl-journey .jy-fraction {
      display: grid;

      width: min(100%,600px);

      gap: 12px;

      margin-top: 12px;

      color: var(--jy-ink);

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

    .vl-journey .jy-numerator,
    .vl-journey .jy-denominator {
      overflow-wrap: anywhere;
    }

    .vl-journey .jy-denominator {
      padding-top: 12px;

      border-top: 3px solid
        var(--jy-teal);
    }

    /* ==================================================
       13. ISSUE
       ================================================== */

    .vl-journey .jy-issue {
      padding: 16px;

      border-left: 4px solid
        var(--jy-orange);

      border-radius: 0 10px 10px 0;

      background: #F6E7DF;
    }

    .vl-journey .jy-issue-label {
      display: block;

      margin-bottom: 8px;

      color: var(--jy-orange);

      font-size: 13px;
      font-weight: 800;
    }

    .vl-journey .jy-issue p {
      margin: 0;

      color: var(--jy-ink);

      font-size:
        clamp(16px,1.4vw,19px);

      line-height: 1.5;
    }

    .vl-journey .jy-effect {
      display: inline-block;

      margin-top: 10px;

      padding: 6px 10px;

      border-radius: 6px;

      background: var(--jy-orange);
      color: #FFFFFF;

      font-size: 13px;
      font-weight: 800;

      line-height: 1.3;
    }

    /* ==================================================
       14. COMPARISON
       ================================================== */

    .vl-journey .jy-pair {
      display: grid;

      grid-template-columns:
        repeat(2,minmax(0,1fr));

      gap: 12px;
    }

    .vl-journey .jy-compare {
      min-width: 0;

      padding: 16px;

      border: 1px solid
        #A7BDB1;

      border-radius: 10px;

      background: #E8EEE8;
    }

    .vl-journey
    .jy-compare[data-side="b"] {
      border-color: #CDAE9E;

      background: #F6E7DF;
    }

    .vl-journey .jy-compare p {
      margin: 0;

      color: var(--jy-ink);

      font-size:
        clamp(16px,1.4vw,19px);

      font-weight: 700;

      line-height: 1.4;
    }

    .vl-journey .jy-arrow {
      display: block;

      margin-bottom: 8px;

      color: var(--jy-teal);

      font-size: 34px;
      font-weight: 800;

      line-height: 1;
    }

    .vl-journey
    .jy-compare[data-side="b"]
    .jy-arrow {
      color: var(--jy-orange);
    }

    /* ==================================================
       15. STATEMENT
       ================================================== */

    .vl-journey .jy-statement {
      padding:
        14px 8px 14px 18px;

      border-left: 4px solid
        var(--jy-teal);
    }

    .vl-journey .jy-statement p {
      max-width: 52ch;

      margin: 0;

      color: var(--jy-ink);

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
       16. DIAGRAM
       ================================================== */

    .vl-journey .jy-diagram {
      min-width: 0;

      padding:
        clamp(10px,1.5vw,20px);

      border: 2px solid
        #42565E;

      border-radius: 12px;

      background: var(--jy-board);
      color: var(--jy-chalk);
    }

    .vl-journey
    .jy-diagram
    .jy-eyebrow {
      color: #F6D38A;
    }

    .vl-journey .jy-diagram-svg {
      width: 100%;
      min-width: 0;

      overflow-x: auto;

      color: var(--jy-chalk);
    }

    .vl-journey .jy-diagram-svg svg {
      display: block;

      width: 100%;
      height: auto;

      max-width: 100%;
      max-height: min(55dvh,520px);

      margin-inline: auto;
    }

    .vl-journey .jy-diagram-caption {
      margin: 12px 0 0;

      color: var(--jy-chalk);

      font-size: 14px;
      line-height: 1.5;
    }

    /* ==================================================
       17. ACCESSIBILITY
       ================================================== */

    .vl-journey .jy-sr {
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

    .vl-journey
    .jy-map-scroll:focus-visible,
    .vl-journey
    .jy-scroll:focus-visible {
      outline: 3px solid
        var(--jy-teal);

      outline-offset: -3px;
    }

    /* ==================================================
       18. MOBILE
       ================================================== */

    @container (max-width: 500px) {

      .vl-journey .jy-map {
        padding: 6px 8px;
      }

      .vl-journey .jy-workspace {
        padding:
          18px 14px 36px;
      }

      .vl-journey .jy-ready {
        min-height: 55cqh;
      }

      .vl-journey .jy-ready-title {
        font-size:
          clamp(28px,8cqw,36px);
      }

      .vl-journey .jy-ready-note {
        font-size: 15px;
      }

      .vl-journey .jy-stations {
        padding-left: 28px;

        gap: 14px;
      }

      .vl-journey .jy-stations::before {
        left: 12px;
      }

      .vl-journey .jy-station-marker {
        left: -28px;

        width: 25px;
        height: 25px;

        font-size: 10px;
      }

      .vl-journey .jy-station-card {
        padding: 15px 13px;
      }

      .vl-journey
      .jy-station.jy-active
      .jy-station-card {
        padding: 14px 12px;
      }

      .vl-journey .jy-title h2 {
        font-size:
          clamp(26px,7cqw,35px);
      }

      .vl-journey .jy-item {
        grid-template-columns:
          40px minmax(0,1fr);

        gap: 10px;
      }

      .vl-journey .jy-item-icon {
        width: 40px;
        height: 40px;
      }

      .vl-journey .jy-item h3 {
        font-size: 21px;
      }

      .vl-journey .jy-item p {
        font-size: 16px;
      }

      .vl-journey .jy-pair {
        grid-template-columns: 1fr;
      }

      .vl-journey .jy-question,
      .vl-journey .jy-formula,
      .vl-journey .jy-compare {
        padding: 14px;
      }

      .vl-journey .jy-diagram {
        padding: 9px;
      }

      .vl-journey .jy-diagram-svg svg {
        max-height: 48dvh;
      }
    }

    /* ==================================================
       19. SHORT VIEWPORTS
       ================================================== */

    @container (max-height: 480px) {

      .vl-journey .jy-workspace {
        padding-top: 12px;
      }

      .vl-journey .jy-ready {
        min-height: 42cqh;
      }

      .vl-journey .jy-ready-symbol {
        transform: scale(.8);
        transform-origin: left center;
      }

      .vl-journey .jy-ready-title {
        font-size: 27px;
      }
    }

    /* ==================================================
       20. REDUCED MOTION
       ================================================== */

    @media (prefers-reduced-motion: reduce) {

      .vl-journey *,
      .vl-journey *::before,
      .vl-journey *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
      }
    }

  `;

  /* ======================================================
     21. INSTALL STYLES
     ====================================================== */

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
     22. ICONS
     ====================================================== */

  function makeIcon(key) {
    const wrapper = decorative(
      node("span", "jy-item-icon")
    );

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

    svg.setAttribute(
      "viewBox",
      "0 0 24 24"
    );

    svg.setAttribute(
      "fill",
      "none"
    );

    svg.setAttribute(
      "stroke",
      "currentColor"
    );

    svg.setAttribute(
      "stroke-width",
      "1.8"
    );

    svg.setAttribute(
      "stroke-linecap",
      "round"
    );

    svg.setAttribute(
      "stroke-linejoin",
      "round"
    );

    svg.innerHTML = paths;

    wrapper.append(svg);

    return wrapper;
  }

  /* ======================================================
     23. MOMENT RENDERERS
     ====================================================== */

  function makeTitle(m) {
    const el = node(
      "article",
      "jy-moment jy-title"
    );

    el.append(
      node(
        "span",
        "jy-eyebrow",
        m.kicker || "The big idea"
      ),

      node(
        "h2",
        "",
        m.text || ""
      )
    );

    return el;
  }

  function makeItem(m) {
    const el = node(
      "article",
      "jy-moment jy-item"
    );

    const body = node(
      "div",
      "jy-item-body"
    );

    body.append(
      node(
        "h3",
        "",
        m.title || ""
      ),

      node(
        "p",
        "",
        m.text || ""
      )
    );

    if (
      m.n !== undefined &&
      m.n !== null
    ) {
      body.append(
        node(
          "span",
          "jy-item-index",
          m.of
            ? `${m.n} of ${m.of}`
            : String(m.n)
        )
      );
    }

    el.append(
      makeIcon(m.icon),
      body
    );

    return el;
  }

  function makeQuestion(m) {
    const el = node(
      "article",
      "jy-moment jy-question"
    );

    el.append(
      decorative(
        node(
          "span",
          "jy-question-mark",
          "?"
        )
      ),

      node(
        "span",
        "jy-eyebrow",
        "A question on our route"
      ),

      node(
        "h2",
        "",
        m.text || ""
      )
    );

    return el;
  }

  function makeFormula(m) {
    const el = node(
      "article",
      "jy-moment jy-formula"
    );

    el.append(
      node(
        "span",
        "jy-eyebrow",
        m.label || "The calculation"
      )
    );

    const fraction = node(
      "div",
      "jy-fraction"
    );

    fraction.setAttribute(
      "role",
      "group"
    );

    fraction.setAttribute(
      "aria-label",
      `${m.num || ""} divided by ${m.den || ""}`
    );

    const numerator = node(
      "div",
      "jy-numerator",
      m.num || ""
    );

    const denominator = node(
      "div",
      "jy-denominator",
      m.den || ""
    );

    numerator.setAttribute(
      "aria-hidden",
      "true"
    );

    denominator.setAttribute(
      "aria-hidden",
      "true"
    );

    fraction.append(
      numerator,
      denominator
    );

    el.append(fraction);

    return el;
  }

  function makeIssue(m) {
    const el = node(
      "article",
      "jy-moment jy-issue"
    );

    el.append(
      node(
        "span",
        "jy-issue-label",
        "A problem along the way"
      ),

      node(
        "p",
        "",
        m.text || ""
      )
    );

    if (m.effect) {
      el.append(
        node(
          "span",
          "jy-effect",
          m.effect
        )
      );
    }

    return el;
  }

  function makeCompare(m) {
    const el = node(
      "article",
      "jy-moment jy-compare"
    );

    el.dataset.side =
      m.side === "b" ? "b" : "a";

    if (
      m.dir === "up" ||
      m.dir === "down"
    ) {
      el.append(
        decorative(
          node(
            "span",
            "jy-arrow",
            m.dir === "up"
              ? "↑"
              : "↓"
          )
        )
      );
    }

    el.append(
      node(
        "span",
        "jy-eyebrow",
        m.label || "Comparison"
      ),

      node(
        "p",
        "",
        m.note || ""
      )
    );

    return el;
  }

  function makeStatement(m) {
    const el = node(
      "article",
      "jy-moment jy-statement"
    );

    el.append(
      node(
        "span",
        "jy-eyebrow",
        "Key takeaway"
      ),

      node(
        "p",
        "",
        m.text || ""
      )
    );

    return el;
  }

  function makeDiagram(m) {
    const el = node(
      "article",
      "jy-moment jy-diagram"
    );

    el.append(
      node(
        "span",
        "jy-eyebrow",
        m.kicker || "Process view"
      )
    );

    const drawing = node(
      "div",
      "jy-diagram-svg"
    );

    /*
     * Trusted authored SVG from diagrams.js.
     */

    drawing.innerHTML =
      typeof m.svg === "string"
        ? m.svg
        : "";

    el.append(drawing);

    if (m.caption) {
      el.append(
        node(
          "p",
          "jy-diagram-caption",
          m.caption
        )
      );
    }

    return el;
  }

  function makeDefault(m) {
    const el = node(
      "article",
      "jy-moment jy-statement"
    );

    el.append(
      node(
        "span",
        "jy-eyebrow",
        "An idea to remember"
      ),

      node(
        "p",
        "",
        m.text ||
        m.title ||
        m.note ||
        ""
      )
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

  /* ======================================================
     24. STATE
     ====================================================== */

  let root = null;

  let routeScroll = null;
  let routeList = null;

  let workspaceScroll = null;
  let stationsBox = null;

  let ready = null;
  let liveRegion = null;

  let section = null;
  let stations = [];

  let lastStep = null;

  let frame = 0;
  let announceTimer = 0;

  /* ======================================================
     25. CANCEL PENDING WORK
     ====================================================== */

  function cancelPending() {
    if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }

    if (announceTimer) {
      clearTimeout(announceTimer);
      announceTimer = 0;
    }
  }

  /* ======================================================
     26. STATION CONTENT
     ====================================================== */

  function buildStationContent(
    container,
    moments
  ) {
    let previousCompare = null;
    let pair = null;

    for (const m of moments) {
      const el = makeMoment(m);

      if (
        m.type === "compare" &&
        previousCompare
      ) {
        if (!pair) {
          pair = node(
            "div",
            "jy-pair"
          );

          container.insertBefore(
            pair,
            previousCompare
          );

          pair.append(previousCompare);
        }

        pair.append(el);
      } else {
        pair = null;
        container.append(el);
      }

      previousCompare =
        m.type === "compare"
          ? el
          : null;
    }
  }

  /* ======================================================
     27. STATION LABELS
     ====================================================== */

  function stationLabel(
    moments,
    index
  ) {
    if (!moments.length) {
      return `Step ${index + 1}`;
    }

    const m = moments[0];

    switch (m.type) {
      case "title":
        return (
          m.kicker ||
          m.text ||
          `Step ${index + 1}`
        );

      case "item":
        return (
          m.title ||
          `Step ${index + 1}`
        );

      case "question":
        return "Question";

      case "formula":
        return "Formula";

      case "issue":
        return "Challenge";

      case "compare":
        return "Compare";

      case "diagram":
        return (
          m.kicker ||
          "Process map"
        );

      case "statement":
        return "Takeaway";

      default:
        return "Idea";
    }
  }

  /* ======================================================
     28. MOUNT
     ====================================================== */

  function mount(el) {
    cancelPending();

    root = el;

    if (!root) return;

    root.classList.add(ROOT_CLASS);
    root.replaceChildren();

    section = null;
    stations = [];
    lastStep = null;

    /*
     * Compact route overview.
     *
     * The shared player already supplies
     * lesson title, progress and controls.
     */

    const map = node(
      "div",
      "jy-map"
    );

    const mapLabel = node(
      "span",
      "jy-map-label",
      "Your learning route"
    );

    routeScroll = node(
      "div",
      "jy-map-scroll"
    );

    routeScroll.setAttribute(
      "role",
      "region"
    );

    routeScroll.setAttribute(
      "aria-label",
      "Lesson route overview"
    );

    routeScroll.tabIndex = 0;

    routeList = node(
      "ol",
      "jy-route"
    );

    routeScroll.append(routeList);

    map.append(
      mapLabel,
      routeScroll
    );

    /*
     * Main lesson workspace.
     */

    workspaceScroll = node(
      "div",
      "jy-scroll"
    );

    workspaceScroll.setAttribute(
      "role",
      "region"
    );

    workspaceScroll.setAttribute(
      "aria-label",
      "Process journey lesson visuals"
    );

    workspaceScroll.tabIndex = 0;

    const workspace = node(
      "div",
      "jy-workspace"
    );

    /*
     * Ready state.
     */

    ready = node(
      "div",
      "jy-ready"
    );

    const symbol = decorative(
      node(
        "div",
        "jy-ready-symbol"
      )
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

    /*
     * Station trail.
     */

    stationsBox = node(
      "div",
      "jy-stations"
    );

    workspace.append(
      ready,
      stationsBox
    );

    workspaceScroll.append(workspace);

    /*
     * Screen reader status.
     */

    liveRegion = node(
      "div",
      "jy-sr"
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
      map,
      workspaceScroll,
      liveRegion
    );
  }

  /* ======================================================
     29. LOAD SECTION
     ====================================================== */

  function load(data) {
    cancelPending();

    if (
      !root ||
      !routeList ||
      !stationsBox
    ) {
      return;
    }

    section = data || {
      lesson: "",
      title: "",
      sentences: [],
      moments: []
    };

    stations = [];
    lastStep = null;

    routeList.replaceChildren();
    stationsBox.replaceChildren();

    const sentences = Array.isArray(
      section.sentences
    )
      ? section.sentences
      : [];

    const moments = Array.isArray(
      section.moments
    )
      ? section.moments
      : [];

    /*
     * Group moments by narration sentence.
     */

    const groups = new Map();

    moments.forEach(m => {
      if (
        !m ||
        typeof m !== "object"
      ) {
        return;
      }

      const at = Math.trunc(
        number(m.at, 0)
      );

      if (
        at < 0 ||
        at >= sentences.length
      ) {
        return;
      }

      if (!groups.has(at)) {
        groups.set(at, []);
      }

      groups.get(at).push(m);
    });

    /*
     * Preserve the original one-station-per-
     * sentence architecture.
     */

    for (
      let index = 0;
      index < sentences.length;
      index++
    ) {
      const group =
        groups.get(index) || [];

      const label =
        stationLabel(group, index);

      /*
       * Route overview node.
       */

      const routeStop = node(
        "li",
        "jy-route-stop"
      );

      const routeNode = node(
        "span",
        "jy-route-node",
        String(index + 1)
      );

      routeStop.setAttribute(
        "aria-label",
        `Station ${index + 1}: ${label}`
      );

      routeNode.setAttribute(
        "aria-hidden",
        "true"
      );

      const routeText = node(
        "span",
        "jy-route-text",
        label
      );

      routeStop.append(
        routeNode,
        routeText
      );

      routeList.append(routeStop);

      /*
       * Station.
       */

      const station = node(
        "section",
        "jy-station"
      );

      station.hidden = true;

      const marker = decorative(
        node(
          "span",
          "jy-station-marker",
          String(index + 1)
        )
      );

      const card = node(
        "div",
        "jy-station-card"
      );

      const stationHeader = node(
        "div",
        "jy-station-label"
      );

      stationHeader.append(
        node(
          "span",
          "",
          label
        )
      );

      const stationContent = node(
        "div",
        "jy-station-content"
      );

      buildStationContent(
        stationContent,
        group
      );

      /*
       * Avoid repeating the same title.
       *
       * A station header is useful as a
       * navigation label, but an identical
       * visible heading is redundant.
       *
       * Keep the semantic heading and
       * suppress only the redundant label.
       */

      const firstHeading =
        stationContent.querySelector(
          ".jy-title h2"
        );

      if (
        firstHeading &&
        firstHeading.textContent
          .trim()
          .toLowerCase() ===
        label.trim().toLowerCase()
      ) {
        stationHeader.hidden = true;
      }

      /* v24: the card header already shows this text, so a repeat inside the card is hidden. */
      if (!stationHeader.hidden) {
        const lt = String(label).trim().toLowerCase();
        if (lt) stationContent.querySelectorAll("*").forEach((e) => {
          if (!e.children.length && e.textContent.trim().toLowerCase() === lt) e.setAttribute("data-jy-dup", "");
        });
      }

      /*
       * Sentences without authored moments
       * still receive a meaningful station.
       */

      if (!group.length) {
        stationContent.append(
          node(
            "p",
            "jy-moment",
            sentences[index] || ""
          )
        );
      }

      card.append(
        stationHeader,
        stationContent
      );

      station.append(
        marker,
        card
      );

      stationsBox.append(station);

      stations.push({
        index,
        label,
        routeStop,
        station,
        card
      });
    }

    routeScroll.scrollLeft = 0;
    workspaceScroll.scrollTop = 0;

    step(-1);
  }

  /* ======================================================
     30. KEEP ROUTE NODE VISIBLE
     ====================================================== */

  function keepRouteVisible(target) {
    if (
      !target ||
      !routeScroll
    ) {
      return;
    }

    const viewport =
      routeScroll.getBoundingClientRect();

    const rect =
      target.getBoundingClientRect();

    const padding = 18;

    if (
      rect.left >= viewport.left + padding &&
      rect.right <= viewport.right - padding
    ) {
      return;
    }

    const targetLeft =
      rect.left -
      viewport.left +
      routeScroll.scrollLeft;

    const destination =
      targetLeft -
      routeScroll.clientWidth / 2 +
      rect.width / 2;

    routeScroll.scrollLeft = Math.max(
      0,
      destination
    );
  }

  /* ======================================================
     31. KEEP STATION VISIBLE
     ====================================================== */

  function keepStationVisible(
    target,
    force = false
  ) {
    if (
      !target ||
      target.hidden ||
      !workspaceScroll
    ) {
      return;
    }

    const viewport =
      workspaceScroll.getBoundingClientRect();

    const rect =
      target.getBoundingClientRect();

    const padding = 22;

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
      workspaceScroll.scrollTop;

    const available =
      workspaceScroll.clientHeight -
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
        targetTop +
        rect.height -
        workspaceScroll.clientHeight +
        padding;
    } else {
      destination =
        targetTop - padding;
    }

    workspaceScroll.scrollTop = Math.max(
      0,
      destination
    );
  }

  /* ======================================================
     32. ACCESSIBLE ANNOUNCEMENT
     ====================================================== */

  function announce(index, total) {
    if (!liveRegion) return;

    if (announceTimer) {
      clearTimeout(announceTimer);
    }

    announceTimer = setTimeout(() => {
      if (!liveRegion) return;

      if (index < 0) {
        liveRegion.textContent =
          "Journey ready.";
      } else {
        liveRegion.textContent =
          `Station ${index + 1} of ${total}.`;
      }

      announceTimer = 0;
    }, 120);
  }

  /* ======================================================
     33. SENTENCE PROGRESSION
     ====================================================== */

  function step(i) {
    if (
      !section ||
      !root
    ) {
      return;
    }

    const total =
      stations.length;

    const requested =
      Math.trunc(number(i, -1));

    const current = clamp(
      requested,
      -1,
      Math.max(-1, total - 1)
    );

    const sameStep =
      current === lastStep;

    const previousStep =
      lastStep;

    const isJump =
      previousStep !== null &&
      Math.abs(
        current - previousStep
      ) > 1;

    const isBackward =
      previousStep !== null &&
      current < previousStep;

    /*
     * Update route and station visibility.
     */

    stations.forEach(entry => {
      const index =
        entry.index;

      const visible =
        current >= 0 &&
        index <= current;

      const active =
        index === current;

      const completed =
        index < current;

      const wasHidden =
        entry.station.hidden;

      /*
       * Route states.
       */

      entry.routeStop.classList.toggle(
        "jy-done",
        completed
      );

      entry.routeStop.classList.toggle(
        "jy-current",
        active
      );

      if (active) {
        entry.routeStop.setAttribute(
          "aria-current",
          "step"
        );
      } else {
        entry.routeStop.removeAttribute(
          "aria-current"
        );
      }

      /*
       * Station states.
       */

      entry.station.hidden =
        !visible;

      entry.station.classList.toggle(
        "jy-active",
        active
      );

      if (!sameStep) {
        entry.station.classList.remove(
          "jy-arrive"
        );
      }

      /*
       * Animate only normal forward
       * progression.
       */

      if (
        visible &&
        wasHidden &&
        !sameStep &&
        !isJump &&
        !prefersReducedMotion()
      ) {
        entry.station.classList.add(
          "jy-arrive"
        );
      }
    });

    /*
     * Ready state.
     */

    ready.hidden =
      current >= 0;

    stationsBox.hidden =
      current < 0;

    /*
     * Scroll management.
     */

    if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }

    if (current < 0) {
      workspaceScroll.scrollTop = 0;
      routeScroll.scrollLeft = 0;
    } else {
      const active =
        stations[current];

      keepRouteVisible(
        active.routeStop
      );

      keepStationVisible(
        active.station,
        isBackward
      );

      /*
       * Recheck after layout settles.
       *
       * Important for responsive SVGs.
       */

      frame = requestAnimationFrame(() => {
        if (
          active.station.isConnected &&
          !active.station.hidden
        ) {
          keepRouteVisible(
            active.routeStop
          );

          keepStationVisible(
            active.station,
            false
          );
        }

        frame = 0;
      });
    }

    /*
     * Avoid repeated announcements.
     */

    if (!sameStep) {
      announce(
        current,
        total
      );
    }

    lastStep = current;
  }

  /* ======================================================
     34. REGISTRATION
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