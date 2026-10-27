/*
 * VoiceLearn — Process Journey
 * File: lab/style-journey.js
 *
 * A calm, spatial lesson experience.
 *
 * Each narration sentence is a station on a route.
 * Each station contains one or more semantic moments.
 *
 * Interface:
 *   STYLES.push({
 *     id,
 *     name,
 *     note,
 *     mount(el),
 *     load(section),
 *     step(i)
 *   })
 *
 * No external dependencies.
 * GSAP is not required.
 */

(() => {
  "use strict";

  const ID = "journey";
  const NAME = "Process Journey";

  const NOTE =
    "Follow a connected learning route, " +
    "one station and one idea at a time.";

  const ROOT_CLASS = "vl-journey";

  const STYLE_ID = "vl-journey-style";

  /*
   * Utilities
   */

  const prefersReducedMotion = () =>
    typeof window.matchMedia === "function" &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

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

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  /*
   * CSS
   *
   * All selectors are scoped to .vl-journey.
   * LAB.k scales pixel dimensions using --k.
   */

  const css = `

  .vl-journey {
    --jy-bg: #F3F0E8;
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
    min-height: 0;

    overflow: hidden;

    background: var(--jy-bg);
    color: var(--jy-ink);

    font-family:
      "Atkinson Hyperlegible",
      system-ui,
      sans-serif;

    font-size: 17px;
    line-height: 1.45;

    container-type: size;
  }

  .vl-journey,
  .vl-journey * {
    box-sizing: border-box;
  }

  .vl-journey [hidden] {
    display: none !important;
  }

  /* ----------------------------------
     Header
  ---------------------------------- */

  .vl-journey .jy-header {
    flex: none;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 12px;

    padding: 16px 18px;

    background: var(--jy-paper);

    border-bottom: 1px solid var(--jy-line);
  }

  .vl-journey .jy-brand {
    display: flex;
    align-items: center;

    gap: 10px;

    min-width: 0;

    color: var(--jy-ink);

    font-family:
      "Bricolage Grotesque",
      system-ui,
      sans-serif;

    font-size: 17px;
    font-weight: 800;
    line-height: 1.2;
  }

  .vl-journey .jy-brand-icon {
    position: relative;

    flex: none;

    width: 31px;
    height: 22px;
  }

  .vl-journey .jy-brand-icon::before {
    content: "";

    position: absolute;

    left: 5px;
    right: 5px;
    top: 10px;

    height: 3px;

    background: var(--jy-teal);
  }

  .vl-journey .jy-brand-icon::after {
    content: "";

    position: absolute;

    left: 0;
    top: 5px;

    width: 11px;
    height: 11px;

    border: 3px solid var(--jy-teal);
    border-radius: 50%;

    background: var(--jy-paper);

    box-shadow:
      20px 0 0 -3px var(--jy-paper),
      20px 0 0 0 var(--jy-orange);
  }

  .vl-journey .jy-counter {
    flex: none;

    color: var(--jy-muted);

    font-size: 13px;
    font-weight: 800;

    font-variant-numeric: tabular-nums;
  }

  /* ----------------------------------
     Progress
  ---------------------------------- */

  .vl-journey .jy-progress {
    flex: none;

    height: 4px;

    background: #D6DDD7;
  }

  .vl-journey .jy-progress-fill {
    display: block;

    width: 0;
    height: 100%;

    background: var(--jy-teal);

    transition: width 300ms ease;
  }

  /* ----------------------------------
     Lesson label
  ---------------------------------- */

  .vl-journey .jy-lesson {
    flex: none;

    padding: 11px 18px 8px;

    color: var(--jy-muted);

    font-size: 13px;
    font-weight: 700;
    line-height: 1.3;

    background: var(--jy-bg);

    overflow-wrap: anywhere;
  }

  /* ----------------------------------
     Route overview
  ---------------------------------- */

  .vl-journey .jy-map {
    position: relative;

    flex: none;

    padding: 10px 15px 15px;

    background: var(--jy-bg);

    border-bottom: 1px solid var(--jy-line);
  }

  .vl-journey .jy-map-label {
    display: block;

    margin-bottom: 10px;

    color: var(--jy-muted);

    font-size: 13px;
    font-weight: 800;
    line-height: 1.3;
  }

  .vl-journey .jy-map-scroll {
    overflow-x: auto;
    overflow-y: hidden;

    scrollbar-width: thin;
    scrollbar-color: #8A9D96 transparent;

    overscroll-behavior-x: contain;

    padding: 3px 2px 9px;
  }

  .vl-journey .jy-route {
    display: flex;
    align-items: flex-start;

    width: max-content;
    min-width: 100%;

    padding: 0;
    margin: 0;

    list-style: none;
  }

  .vl-journey .jy-route-stop {
    position: relative;

    flex: 0 0 66px;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 7px;

    min-width: 0;

    color: var(--jy-muted);
  }

  .vl-journey .jy-route-stop:not(:last-child)::after {
    content: "";

    position: absolute;

    left: calc(50% + 16px);
    top: 14px;

    width: 34px;
    height: 3px;

    background: #A7B4AE;
  }

  .vl-journey .jy-route-stop.jy-done:not(:last-child)::after {
    background: var(--jy-teal);
  }

  .vl-journey .jy-route-node {
    position: relative;
    z-index: 1;

    display: grid;
    place-items: center;

    width: 31px;
    height: 31px;

    border: 2px solid #71817C;
    border-radius: 50%;

    background: var(--jy-bg);

    color: var(--jy-ink);

    font-size: 12px;
    font-weight: 800;

    font-variant-numeric: tabular-nums;
  }

  .vl-journey .jy-route-stop.jy-done
  .jy-route-node {
    background: var(--jy-teal);
    border-color: var(--jy-teal);

    color: #FFFFFF;
  }

  .vl-journey .jy-route-stop.jy-current
  .jy-route-node {
    width: 36px;
    height: 36px;

    margin-top: -2px;
    margin-bottom: -3px;

    background: var(--jy-orange);
    border: 3px solid var(--jy-orange);

    color: #FFFFFF;

    box-shadow:
      0 0 0 3px var(--jy-bg),
      0 0 0 5px var(--jy-orange);
  }

  .vl-journey .jy-route-text {
    display: block;

    max-width: 66px;

    text-align: center;

    font-size: 11px;
    font-weight: 700;
    line-height: 1.2;

    overflow-wrap: anywhere;
  }

  .vl-journey .jy-route-stop.jy-current
  .jy-route-text {
    color: var(--jy-orange);
    font-weight: 800;
  }

  /* ----------------------------------
     Main scrollable workspace
  ---------------------------------- */

  .vl-journey .jy-scroll {
    position: relative;

    flex: 1;
    min-height: 0;

    overflow-x: hidden;
    overflow-y: auto;

    overscroll-behavior: contain;

    scrollbar-width: thin;
    scrollbar-color: #8A9D96 transparent;

    scroll-padding-bottom: 30px;
  }

  .vl-journey .jy-workspace {
    position: relative;

    width: 100%;
    max-width: 860px;
    min-height: 100%;

    margin-inline: auto;

    padding: 20px 17px 45px;

    overflow-wrap: anywhere;
  }

  /* ----------------------------------
     Ready state
  ---------------------------------- */

  .vl-journey .jy-ready {
    display: flex;
    flex-direction: column;
    justify-content: center;

    gap: 17px;

    min-height: 290px;

    padding: 15px 8px;
  }

  .vl-journey .jy-ready-symbol {
    position: relative;

    width: 145px;
    height: 68px;
  }

  .vl-journey .jy-ready-symbol::before {
    content: "";

    position: absolute;

    left: 20px;
    right: 20px;
    top: 32px;

    height: 4px;

    background: var(--jy-teal);
  }

  .vl-journey .jy-ready-dot {
    position: absolute;

    top: 18px;

    width: 32px;
    height: 32px;

    border: 4px solid var(--jy-teal);
    border-radius: 50%;

    background: var(--jy-bg);
  }

  .vl-journey .jy-ready-dot:first-child {
    left: 5px;

    background: var(--jy-teal);
  }

  .vl-journey .jy-ready-dot:last-child {
    right: 5px;

    border-color: var(--jy-orange);
  }

  .vl-journey .jy-ready-title {
    margin: 0;

    max-width: 20ch;

    color: var(--jy-ink);

    font-family:
      "Bricolage Grotesque",
      system-ui,
      sans-serif;

    font-size: 32px;
    font-weight: 800;
    line-height: 1.1;
  }

  .vl-journey .jy-ready-note {
    margin: 0;

    max-width: 31ch;

    color: var(--jy-muted);

    font-size: 18px;
    line-height: 1.45;
  }

  /* ----------------------------------
     Station trail
  ---------------------------------- */

  .vl-journey .jy-stations {
    position: relative;

    display: grid;

    gap: 17px;

    padding-left: 30px;
  }

  .vl-journey .jy-stations::before {
    content: "";

    position: absolute;

    left: 13px;
    top: 14px;
    bottom: 14px;

    width: 3px;

    background: #A9B8B0;

    border-radius: 3px;
  }

  .vl-journey .jy-station {
    position: relative;

    min-width: 0;
  }

  .vl-journey .jy-station-marker {
    position: absolute;

    left: -30px;
    top: 14px;

    z-index: 2;

    display: grid;
    place-items: center;

    width: 28px;
    height: 28px;

    border: 3px solid var(--jy-teal);
    border-radius: 50%;

    background: var(--jy-paper);

    color: var(--jy-teal);

    font-size: 11px;
    font-weight: 800;

    font-variant-numeric: tabular-nums;
  }

  .vl-journey .jy-station.jy-active
  .jy-station-marker {
    background: var(--jy-orange);
    border-color: var(--jy-orange);

    color: #FFFFFF;

    box-shadow:
      0 0 0 4px var(--jy-bg);
  }

  .vl-journey .jy-station-card {
    position: relative;

    min-width: 0;

    padding: 17px 15px;

    background: var(--jy-paper);

    border: 1px solid #BAC7BF;
    border-radius: 10px;

    box-shadow:
      0 2px 0 rgba(38, 61, 71, .06);
  }

  .vl-journey .jy-station.jy-active
  .jy-station-card {
    border: 2px solid var(--jy-orange);

    padding: 16px 14px;

    box-shadow:
      0 3px 0 rgba(150, 61, 33, .10);
  }

  .vl-journey .jy-station-label {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 10px;

    margin-bottom: 12px;

    color: var(--jy-muted);

    font-size: 13px;
    font-weight: 800;
    line-height: 1.3;
  }

  .vl-journey .jy-station.jy-active
  .jy-station-label {
    color: var(--jy-orange);
  }

  .vl-journey .jy-station-number {
    font-variant-numeric: tabular-nums;
  }

  .vl-journey .jy-station-content {
    display: grid;

    gap: 15px;
  }

  .vl-journey .jy-station.jy-arrive
  .jy-station-card {
    animation:
      jy-station-enter
      380ms
      ease-out
      both;
  }

  @keyframes jy-station-enter {
    from {
      opacity: 0;
      transform: translateY(10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ----------------------------------
     Shared moment styles
  ---------------------------------- */

  .vl-journey .jy-moment {
    min-width: 0;

    overflow-wrap: anywhere;
  }

  .vl-journey .jy-eyebrow {
    display: block;

    margin-bottom: 9px;

    color: var(--jy-teal);

    font-size: 13px;
    font-weight: 800;
    line-height: 1.3;
  }

  /* ----------------------------------
     Title
  ---------------------------------- */

  .vl-journey .jy-title h2 {
    margin: 0;

    color: var(--jy-ink);

    font-family:
      "Bricolage Grotesque",
      system-ui,
      sans-serif;

    font-size: 29px;
    font-weight: 800;
    line-height: 1.12;

    letter-spacing: -.025em;

    text-wrap: pretty;
  }

  .vl-journey .jy-count {
    display: flex;
    flex-wrap: wrap;

    gap: 7px;

    margin-top: 16px;
  }

  .vl-journey .jy-count-dot {
    width: 16px;
    height: 16px;

    border: 2px solid var(--jy-teal);
    border-radius: 50%;
  }

  /* ----------------------------------
     Item
  ---------------------------------- */

  .vl-journey .jy-item {
    display: grid;

    grid-template-columns:
      43px minmax(0, 1fr);

    gap: 12px;

    align-items: start;
  }

  .vl-journey .jy-item-icon {
    display: grid;
    place-items: center;

    width: 42px;
    height: 42px;

    background: #E4EEE8;

    border: 2px solid var(--jy-teal);
    border-radius: 10px;

    color: var(--jy-teal);
  }

  .vl-journey .jy-item-icon svg {
    width: 25px;
    height: 25px;
  }

  .vl-journey .jy-item h3 {
    margin: 0 0 6px;

    color: var(--jy-ink);

    font-family:
      "Bricolage Grotesque",
      system-ui,
      sans-serif;

    font-size: 23px;
    font-weight: 800;
    line-height: 1.15;
  }

  .vl-journey .jy-item p {
    margin: 0;

    color: var(--jy-ink);

    font-size: 17px;
    line-height: 1.45;
  }

  .vl-journey .jy-item-index {
    display: block;

    margin-top: 9px;

    color: var(--jy-teal);

    font-size: 13px;
    font-weight: 800;
  }

  /* ----------------------------------
     Question
  ---------------------------------- */

  .vl-journey .jy-question {
    padding: 15px;

    background: #E8EEE8;

    border-left: 5px solid var(--jy-teal);
    border-radius: 5px;
  }

  .vl-journey .jy-question-mark {
    display: block;

    margin-bottom: 7px;

    color: var(--jy-teal);

    font-family: "Fraunces", Georgia, serif;

    font-size: 40px;
    line-height: 1;
  }

  .vl-journey .jy-question h2 {
    margin: 0;

    color: var(--jy-ink);

    font-family:
      "Bricolage Grotesque",
      system-ui,
      sans-serif;

    font-size: 25px;
    font-weight: 800;
    line-height: 1.2;
  }

  /* ----------------------------------
     Formula
  ---------------------------------- */

  .vl-journey .jy-formula {
    padding: 16px 14px;

    background: #E8EEE8;

    border: 1px solid #B4C7BD;
    border-radius: 7px;
  }

  .vl-journey .jy-fraction {
    display: grid;

    gap: 10px;

    margin-top: 12px;

    text-align: center;

    color: var(--jy-ink);

    font-family: "Fraunces", Georgia, serif;

    font-size: 24px;
    font-weight: 650;
    line-height: 1.25;
  }

  .vl-journey .jy-denominator {
    padding-top: 10px;

    border-top: 3px solid var(--jy-teal);
  }

  /* ----------------------------------
     Issue
  ---------------------------------- */

  .vl-journey .jy-issue {
    padding: 14px;

    background: #F6E7DF;

    border-left: 5px solid var(--jy-orange);
    border-radius: 5px;
  }

  .vl-journey .jy-issue-label {
    display: block;

    margin-bottom: 8px;

    color: var(--jy-orange);

    font-size: 14px;
    font-weight: 800;
  }

  .vl-journey .jy-issue p {
    margin: 0;

    color: var(--jy-ink);

    font-size: 18px;
    line-height: 1.4;
  }

  .vl-journey .jy-effect {
    display: inline-block;

    margin-top: 10px;

    padding: 5px 9px;

    background: var(--jy-orange);
    color: #FFFFFF;

    border-radius: 4px;

    font-size: 14px;
    font-weight: 800;
  }

  /* ----------------------------------
     Compare
  ---------------------------------- */

  .vl-journey .jy-pair {
    display: grid;

    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap: 9px;
  }

  .vl-journey .jy-compare {
    min-width: 0;

    padding: 13px 11px;

    background: #E8EEE8;

    border: 1px solid #A7BDB1;
    border-radius: 6px;
  }

  .vl-journey .jy-compare[data-side="b"] {
    background: #F6E7DF;

    border-color: #CDAE9E;
  }

  .vl-journey .jy-compare
  .jy-eyebrow {
    margin-bottom: 8px;
  }

  .vl-journey .jy-compare
  p {
    margin: 0;

    color: var(--jy-ink);

    font-size: 17px;
    font-weight: 700;
    line-height: 1.32;
  }

  .vl-journey .jy-arrow {
    display: block;

    margin-bottom: 7px;

    color: var(--jy-teal);

    font-size: 34px;
    font-weight: 800;
    line-height: 1;
  }

  .vl-journey .jy-compare[data-side="b"]
  .jy-arrow {
    color: var(--jy-orange);
  }

  /* ----------------------------------
     Statement
  ---------------------------------- */

  .vl-journey .jy-statement {
    padding: 13px 5px 13px 15px;

    border-left: 4px solid var(--jy-teal);
  }

  .vl-journey .jy-statement p {
    margin: 0;

    color: var(--jy-ink);

    font-family: "Fraunces", Georgia, serif;

    font-size: 24px;
    font-weight: 600;
    line-height: 1.3;
  }

  /* ----------------------------------
     Diagram
  ---------------------------------- */

  .vl-journey .jy-diagram {
    padding: 14px 12px;

    background: var(--jy-board);
    color: var(--jy-chalk);

    border: 2px solid #42565E;
    border-radius: 8px;
  }

  .vl-journey .jy-diagram
  .jy-eyebrow {
    color: #F6D38A;
  }

  .vl-journey .jy-diagram-svg {
    width: 100%;

    color: var(--jy-chalk);
  }

  .vl-journey .jy-diagram-svg svg {
    display: block;

    width: 100%;
    height: auto;

    max-height: 300px;
  }

  .vl-journey .jy-diagram-caption {
    margin: 12px 0 0;

    color: var(--jy-chalk);

    font-size: 16px;
    line-height: 1.45;
  }

  /* ----------------------------------
     Footer
  ---------------------------------- */

  .vl-journey .jy-footer {
    flex: none;

    display: flex;
    align-items: center;

    gap: 9px;

    padding: 11px 18px;

    background: var(--jy-paper);

    border-top: 1px solid var(--jy-line);

    color: var(--jy-muted);

    font-size: 13px;
    font-weight: 700;
  }

  .vl-journey .jy-footer-dot {
    flex: none;

    width: 9px;
    height: 9px;

    border-radius: 50%;

    background: var(--jy-teal);
  }

  /* ----------------------------------
     Screen reader status
  ---------------------------------- */

  .vl-journey .jy-sr {
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

  /* ----------------------------------
     Narrow containers
  ---------------------------------- */

  @container (max-width: 340px) {

    .vl-journey .jy-header {
      padding: 13px 12px;
    }

    .vl-journey .jy-brand {
      font-size: 15px;
    }

    .vl-journey .jy-map {
      padding-left: 10px;
      padding-right: 10px;
    }

    .vl-journey .jy-workspace {
      padding: 16px 11px 35px;
    }

    .vl-journey .jy-stations {
      padding-left: 27px;
    }

    .vl-journey .jy-stations::before {
      left: 12px;
    }

    .vl-journey .jy-station-marker {
      left: -27px;
    }

    .vl-journey .jy-station-card {
      padding: 14px 11px;
    }

    .vl-journey .jy-station.jy-active
    .jy-station-card {
      padding: 13px 10px;
    }

    .vl-journey .jy-title h2 {
      font-size: 26px;
    }

    .vl-journey .jy-item {
      grid-template-columns:
        37px minmax(0, 1fr);

      gap: 9px;
    }

    .vl-journey .jy-item-icon {
      width: 36px;
      height: 36px;
    }

    .vl-journey .jy-item-icon svg {
      width: 21px;
      height: 21px;
    }

    .vl-journey .jy-item h3 {
      font-size: 21px;
    }

    .vl-journey .jy-pair {
      grid-template-columns: 1fr;
    }
  }

  /* ----------------------------------
     Wider containers
  ---------------------------------- */

  @container (min-width: 650px) {

    .vl-journey .jy-workspace {
      padding:
        27px
        35px
        55px;
    }

    .vl-journey .jy-stations {
      padding-left: 48px;
      gap: 22px;
    }

    .vl-journey .jy-stations::before {
      left: 19px;
    }

    .vl-journey .jy-station-marker {
      left: -48px;

      width: 40px;
      height: 40px;

      font-size: 13px;
    }

    .vl-journey .jy-station-card {
      padding: 23px 25px;
    }

    .vl-journey .jy-station.jy-active
    .jy-station-card {
      padding: 22px 24px;
    }

    .vl-journey .jy-title h2 {
      font-size: 37px;
    }

    .vl-journey .jy-route-stop {
      flex-basis: 82px;
    }

    .vl-journey .jy-route-stop:not(:last-child)::after {
      width: 50px;
    }

    .vl-journey .jy-route-text {
      max-width: 82px;
    }
  }

  /* ----------------------------------
     Reduced motion
  ---------------------------------- */

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

  /*
   * Inject stylesheet once.
   */

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
   * Trusted local SVG icons.
   *
   * Only LAB.icons markup enters innerHTML.
   */

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
   * Moment renderers
   */

  function makeTitle(m) {
    const el = node(
      "article",
      "jy-moment jy-title"
    );

    const eyebrow = node(
      "span",
      "jy-eyebrow",
      m.kicker || "The big idea"
    );

    const heading = node(
      "h2",
      "",
      m.text || ""
    );

    el.append(
      eyebrow,
      heading
    );

    const count = number(m.count, 0);

    if (count > 0) {
      const dots = decorative(
        node("div", "jy-count")
      );

      const total = clamp(
        Math.trunc(count),
        0,
        24
      );

      for (let i = 0; i < total; i++) {
        dots.append(
          node("span", "jy-count-dot")
        );
      }

      el.append(dots);
    }

    return el;
  }

  function makeItem(m) {
    const el = node(
      "article",
      "jy-moment jy-item"
    );

    const icon = makeIcon(m.icon);

    const body = node(
      "div",
      "jy-item-body"
    );

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
      icon,
      body
    );

    return el;
  }

  function makeQuestion(m) {
    const el = node(
      "article",
      "jy-moment jy-question"
    );

    const mark = decorative(
      node(
        "span",
        "jy-question-mark",
        "?"
      )
    );

    const eyebrow = node(
      "span",
      "jy-eyebrow",
      "A question on our route"
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
      "jy-moment jy-formula"
    );

    const label = node(
      "span",
      "jy-eyebrow",
      m.label || "The calculation"
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

    el.append(
      label,
      fraction
    );

    return el;
  }

  function makeIssue(m) {
    const el = node(
      "article",
      "jy-moment jy-issue"
    );

    const label = node(
      "span",
      "jy-issue-label",
      "A problem along the way"
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

    if (m.dir === "up" || m.dir === "down") {
      el.append(
        decorative(
          node(
            "span",
            "jy-arrow",
            m.dir === "up" ? "↑" : "↓"
          )
        )
      );
    }

    const label = node(
      "span",
      "jy-eyebrow",
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
      "jy-moment jy-statement"
    );

    const label = node(
      "span",
      "jy-eyebrow",
      "Key takeaway"
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
      "jy-moment jy-diagram"
    );

    const label = node(
      "span",
      "jy-eyebrow",
      m.kicker || "Process view"
    );

    const drawing = node(
      "div",
      "jy-diagram-svg"
    );

    /*
     * Trusted authored SVG from diagrams.js.
     */

    drawing.innerHTML = m.svg || "";

    el.append(
      label,
      drawing
    );

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
      )
    );

    el.append(
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

  /*
   * State
   */

  let root = null;

  let routeScroll = null;
  let routeList = null;

  let workspaceScroll = null;
  let stationsBox = null;

  let ready = null;
  let lessonLabel = null;

  let counter = null;
  let progressFill = null;
  let footerText = null;
  let liveRegion = null;

  let section = null;

  let stations = [];

  let lastStep = null;

  let frame = 0;
  let announceTimer = 0;

  /*
   * Cancel pending work.
   */

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

  /*
   * Build a station's content.
   *
   * Multiple moments at the same sentence
   * become one station.
   */

  function buildStationContent(container, moments) {
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

          pair.append(
            previousCompare
          );
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

  /*
   * Short route labels.
   *
   * These labels are derived from semantic
   * moments, not from arbitrary HTML.
   */

  function stationLabel(moments, index) {
    if (!moments.length) {
      return `Step ${index + 1}`;
    }

    const m = moments[0];

    switch (m.type) {
      case "title":
        return m.kicker ||
          m.text ||
          `Step ${index + 1}`;

      case "item":
        return m.title ||
          `Step ${index + 1}`;

      case "question":
        return "Question";

      case "formula":
        return "Formula";

      case "issue":
        return "Challenge";

      case "compare":
        return "Compare";

      case "diagram":
        return m.kicker ||
          "Process map";

      case "statement":
        return "Takeaway";

      default:
        return "Idea";
    }
  }

  /*
   * Mount
   */

  function mount(el) {
    cancelPending();

    root = el;

    root.classList.add(ROOT_CLASS);
    root.replaceChildren();

    section = null;
    stations = [];
    lastStep = null;

    /*
     * Header
     */

    const header = node(
      "div",
      "jy-header"
    );

    const brand = node(
      "div",
      "jy-brand"
    );

    const brandIcon = decorative(
      node("span", "jy-brand-icon")
    );

    const brandText = node(
      "span",
      "",
      "Process Journey"
    );

    brand.append(
      brandIcon,
      brandText
    );

    counter = node(
      "span",
      "jy-counter",
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
      node("div", "jy-progress")
    );

    progressFill = node(
      "span",
      "jy-progress-fill"
    );

    progress.append(progressFill);

    /*
     * Lesson label
     */

    lessonLabel = node(
      "div",
      "jy-lesson"
    );

    /*
     * Route overview
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
     * Workspace
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
     * Ready state
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

    const readyTitle = node(
      "h2",
      "jy-ready-title",
      "Every journey begins with an idea."
    );

    const readyNote = node(
      "p",
      "jy-ready-note",
      "Press Play. We'll follow the ideas together."
    );

    ready.append(
      symbol,
      readyTitle,
      readyNote
    );

    /*
     * Stations
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
     * Footer
     */

    const footer = node(
      "div",
      "jy-footer"
    );

    const footerDot = decorative(
      node(
        "span",
        "jy-footer-dot"
      )
    );

    footerText = node(
      "span",
      "",
      "Ready to begin"
    );

    footer.append(
      footerDot,
      footerText
    );

    /*
     * Screen reader status
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
      header,
      progress,
      lessonLabel,
      map,
      workspaceScroll,
      footer,
      liveRegion
    );
  }

  /*
   * Load section
   */

  function load(data) {
    cancelPending();

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

    lessonLabel.textContent =
      section.lesson ||
      section.title ||
      "";

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

    moments.forEach((m) => {
      const at = Math.trunc(
        number(m.at, 0)
      );

      if (!groups.has(at)) {
        groups.set(at, []);
      }

      groups.get(at).push(m);
    });

    /*
     * Create a station for every sentence.
     *
     * This ensures the route progresses even
     * if a sentence has no authored moment.
     */

    for (
      let index = 0;
      index < sentences.length;
      index++
    ) {
      const group = groups.get(index) || [];

      const label = stationLabel(
        group,
        index
      );

      /*
       * Route overview stop
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
       * Station
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

      const stationName = node(
        "span",
        "",
        label
      );

      const stationNumber = node(
        "span",
        "jy-station-number",
        `${pad(index + 1)} / ${pad(sentences.length)}`
      );

      stationHeader.append(
        stationName,
        stationNumber
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
       * A sentence without moments still
       * receives a useful station.
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

  /*
   * Keep the active route node visible.
   *
   * Only the route overview scrolls.
   */

  function keepRouteVisible(target) {
    if (!target || !routeScroll) {
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

  /*
   * Keep the newest station visible.
   *
   * Only the workspace scrolls.
   */

  function keepStationVisible(target, force = false) {
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

  /*
   * Polite progress announcement.
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
          "Journey ready.";

      } else {
        liveRegion.textContent =
          `Station ${index + 1} of ${total}.`;
      }

      announceTimer = 0;
    }, 120);
  }

  /*
   * Step
   *
   * -1: ready
   *  0: first sentence
   *  n: sentence n
   *
   * Supports seeking in either direction.
   * Repeated calls with the same index
   * do not replay entrance animation.
   */

  function step(i) {
    if (!section || !root) {
      return;
    }

    const total = stations.length;

    const requested = Math.trunc(
      number(i, -1)
    );

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
      Math.abs(current - previousStep) > 1;

    const isBackward =
      previousStep !== null &&
      current < previousStep;

    /*
     * Route and station visibility.
     */

    stations.forEach((entry) => {
      const index = entry.index;

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
       * Route states
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
       * Station states
       */

      entry.station.hidden = !visible;

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
       * Animate only a normal forward
       * entrance, never a large seek.
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
     * Ready state
     */

    ready.hidden =
      current >= 0;

    stationsBox.hidden =
      current < 0;

    /*
     * Progress
     */

    const spoken = clamp(
      current + 1,
      0,
      total
    );

    counter.textContent =
      `${pad(spoken)} / ${pad(total)}`;

    const percent =
      total
        ? spoken / total * 100
        : 0;

    progressFill.style.width =
      `${percent}%`;

    /*
     * Footer
     */

    if (spoken === 0) {
      footerText.textContent =
        "Ready to begin";

    } else if (spoken === total) {
      footerText.textContent =
        "Journey complete";

    } else {
      footerText.textContent =
        "Follow the next idea";
    }

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
      const active = stations[current];

      keepRouteVisible(
        active.routeStop
      );

      keepStationVisible(
        active.station,
        isBackward
      );

      /*
       * Recheck after layout settles.
       * Important for authored SVG diagrams.
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
     * Screen reader announcement.
     */

    if (!sameStep) {
      announce(
        current,
        total
      );
    }

    lastStep = current;
  }

  /*
   * Register the look.
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