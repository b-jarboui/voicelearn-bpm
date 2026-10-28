// FILE: style-story.js

/*
 * VoiceLearn — Story Cards v25
 * OPER621 Business Process Management
 *
 * Visual presentation revision of the v24 Story Cards renderer.
 *
 * Preserved:
 * - STYLES registration interface
 * - id: "story"
 * - mount(el)
 * - load(section)
 * - step(sentenceIndex)
 * - All original moment types
 * - Cover card
 * - Sentence-indexed moment progression
 * - Grouped issue and comparison moments
 * - DIAG-generated SVG content
 * - LAB icon support
 *
 * Improved:
 * - Calm editorial presentation
 * - Responsive typography
 * - Mobile-first spacing
 * - Accessible contrast
 * - Long-text wrapping
 * - Diagram sizing
 * - Reduced-motion behavior
 * - No duplicated progress indicators
 * - No decorative sentence counters
 * - No 3D card rotation
 * - No character-by-character animation
 *
 * Speech and narration logic are not modified.
 */

(() => {
  "use strict";

  /* ======================================================
     01. STYLES
     ====================================================== */

  const css = `

  .ss {
    position: absolute;
    inset: 0;

    width: 100%;
    height: 100%;

    overflow: hidden;
    isolation: isolate;

    background: #102B3C;
    color: #FFFFFF;

    font-family:
      "Atkinson Hyperlegible",
      system-ui,
      sans-serif;
  }

  /*
   * One authoritative progress indicator exists
   * in the player navigation.
   *
   * Story Cards must not duplicate it.
   */

  .ss .ss-seg,
  .ss .ss-cap {
    display: none !important;
  }

  /* ======================================================
     02. CARD STRUCTURE
     ====================================================== */

  .ss-card {
    position: absolute;
    inset: 0;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    width: 100%;
    height: 100%;

    min-width: 0;
    min-height: 0;

    padding:
      clamp(24px, 4vw, 64px);

    gap:
      clamp(12px, 1.8vw, 24px);

    overflow-x: hidden;
    overflow-y: auto;

    overscroll-behavior: contain;

    visibility: hidden;
    opacity: 0;

    transform: none;

    backface-visibility: visible;

    transition:
      opacity 280ms ease,
      visibility 280ms ease;
  }

  .ss-card.now {
    visibility: visible;
    opacity: 1;
  }

  /*
   * Do not animate the entire lesson with
   * perspective transforms.
   *
   * A simple opacity transition preserves
   * orientation and reduces visual fatigue.
   */

  .ss-card::before {
    content: "";

    position: absolute;
    inset: 0;

    pointer-events: none;

    background:
      radial-gradient(
        circle at 85% 12%,
        rgba(255,255,255,.075),
        transparent 42%
      );

    z-index: 0;
  }

  .ss-card > * {
    position: relative;
    z-index: 1;

    max-width: 100%;
  }

  /* ======================================================
     03. TYPOGRAPHY
     ====================================================== */

  .ss .k {
    max-width: 70ch;

    margin: 0;

    color: rgba(255,255,255,.86);

    font-family:
      "Atkinson Hyperlegible",
      system-ui,
      sans-serif;

    font-size:
      clamp(12px, 1vw, 14px);

    font-weight: 700;

    line-height: 1.4;
    letter-spacing: .11em;

    text-transform: uppercase;

    overflow-wrap: anywhere;
  }

  .ss h2 {
    max-width: 23ch;

    margin: 0;

    color: #FFFFFF;

    font-family:
      "Bricolage Grotesque",
      "Atkinson Hyperlegible",
      system-ui,
      sans-serif;

    font-size:
      clamp(29px, 4.2vw, 60px);

    font-weight: 800;

    line-height: 1.09;
    letter-spacing: -.035em;

    text-wrap: balance;
    overflow-wrap: anywhere;
  }

  .ss h2.sm {
    max-width: 29ch;

    font-size:
      clamp(25px, 3.3vw, 46px);

    line-height: 1.13;
  }

  .ss .p {
    max-width: 52ch;

    margin: 0;

    color: rgba(255,255,255,.94);

    font-size:
      clamp(16px, 1.5vw, 21px);

    font-weight: 400;

    line-height: 1.55;

    overflow-wrap: anywhere;
  }

  /*
   * Compatibility class retained for any
   * existing authored content or selectors.
   */

  .ss .ch {
    display: inline;
    transform: none;
    will-change: auto;
  }

  /* ======================================================
     04. COVER CARD
     ====================================================== */

  .ss-card.ss-cover {
    justify-content: center;
  }

  .ss-cover .ss-cover-mark {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 54px;
    height: 54px;

    margin-bottom: 8px;

    border: 1px solid
      rgba(255,255,255,.38);

    border-radius: 16px;

    background:
      rgba(255,255,255,.10);

    color: #FFFFFF;

    font-family:
      "Bricolage Grotesque",
      system-ui,
      sans-serif;

    font-size: 20px;
    font-weight: 800;

    letter-spacing: -.06em;
  }

  .ss-cover h2 {
    max-width: 21ch;
  }

  .ss-cover .p {
    max-width: 42ch;
  }

  /* ======================================================
     05. ITEM MOMENTS
     ====================================================== */

  .ss .ring {
    position: relative;

    display: grid;
    place-items: center;

    flex: 0 0 auto;

    width: 82px;
    height: 82px;

    border: 1px solid
      rgba(255,255,255,.38);

    border-radius: 24px;

    background:
      rgba(255,255,255,.10);
  }

  .ss .ring svg.r {
    display: none;
  }

  .ss .ring .ic {
    display: block;

    width: 38px;
    height: 38px;

    color: #FFFFFF;
  }

  /*
   * The item number is represented once,
   * in the semantic kicker.
   *
   * The original large decorative counter
   * is intentionally suppressed.
   */

  .ss .cnt {
    display: none !important;
  }

  /* ======================================================
     06. QUESTION MOMENTS
     ====================================================== */

  .ss .bigq {
    position: relative;

    display: grid;
    place-items: center;

    width: 62px;
    height: 62px;

    margin-bottom: 6px;

    border: 1px solid
      rgba(255,255,255,.35);

    border-radius: 50%;

    background:
      rgba(255,255,255,.10);

    color: #FFFFFF;

    font-family:
      "Bricolage Grotesque",
      system-ui,
      sans-serif;

    font-size: 38px;
    font-weight: 700;

    line-height: 1;

    opacity: 1;
  }

  /* ======================================================
     07. FORMULA MOMENTS
     ====================================================== */

  .ss .frac {
    display: grid;

    justify-items: start;
    align-content: center;

    width: min(100%, 620px);

    gap: 14px;

    color: #FFFFFF;

    font-family:
      "Bricolage Grotesque",
      system-ui,
      sans-serif;

    font-size:
      clamp(24px, 3.2vw, 44px);

    font-weight: 800;

    line-height: 1.15;
  }

  .ss .frac .num,
  .ss .frac .den {
    width: 100%;

    overflow-wrap: anywhere;
    text-wrap: balance;
  }

  .ss .frac .bar {
    display: block;

    width: 100%;
    height: 4px;

    border-radius: 4px;

    background: #FFFFFF;

    transform: none;
  }

  /* ======================================================
     08. ISSUE MOMENTS
     ====================================================== */

  .ss .chips {
    display: grid;

    width: min(100%, 820px);

    gap: 12px;
  }

  .ss .chip {
    display: flex;
    align-items: center;
    justify-content: space-between;

    min-width: 0;

    gap: 16px;

    padding:
      clamp(14px, 1.5vw, 20px);

    border: 1px solid
      rgba(255,255,255,.28);

    border-radius: 14px;

    background:
      rgba(255,255,255,.10);

    color: #FFFFFF;

    font-size:
      clamp(15px, 1.3vw, 18px);

    line-height: 1.45;

    backdrop-filter: none;
  }

  .ss .chip span {
    flex: 1 1 auto;

    min-width: 0;

    overflow-wrap: anywhere;
  }

  .ss .chip b {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    flex: 0 0 auto;

    max-width: 42%;

    min-height: 30px;

    padding: 5px 11px;

    border-radius: 999px;

    background: #FFFFFF;
    color: #142535;

    font-size: 13px;
    font-weight: 800;

    line-height: 1.25;

    text-align: center;

    overflow-wrap: anywhere;
  }

  /* ======================================================
     09. COMPARISON MOMENTS
     ====================================================== */

  .ss .vs {
    display: grid;

    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    width: min(100%, 940px);

    gap: 14px;
  }

  .ss .vs-i {
    display: flex;
    flex-direction: column;

    align-items: flex-start;
    justify-content: center;

    min-width: 0;

    gap: 12px;

    padding:
      clamp(18px, 2vw, 28px);

    border: 1px solid
      rgba(255,255,255,.30);

    border-radius: 16px;

    background:
      rgba(255,255,255,.10);

    color: #FFFFFF;
  }

  .ss .vs-i.b {
    background: #FFFFFF;
    color: #172535;

    border-color: #FFFFFF;
  }

  .ss .vs-i.b .k {
    color: #455466;
  }

  .ss .vs-n {
    max-width: 100%;

    font-family:
      "Bricolage Grotesque",
      system-ui,
      sans-serif;

    font-size:
      clamp(19px, 2vw, 29px);

    font-weight: 800;

    line-height: 1.2;

    overflow-wrap: anywhere;
  }

  .ss .arr {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 68px;
    height: 68px;

    border: 1px solid
      rgba(255,255,255,.35);

    border-radius: 18px;

    background:
      rgba(255,255,255,.10);

    color: #FFFFFF;

    font-family:
      "Bricolage Grotesque",
      system-ui,
      sans-serif;

    font-size: 43px;
    font-weight: 800;

    line-height: 1;
  }

  .ss .arr.s {
    width: 48px;
    height: 48px;

    font-size: 30px;
  }

  .ss .vs-i.b .arr {
    color: #172535;

    border-color: #C7D0DA;

    background: #EDF2F7;
  }

  .ss .stmt {
    max-width: 760px;

    margin: 4px 0 0;

    padding: 8px 0 8px 18px;

    border-left: 4px solid #FFFFFF;

    color: #FFFFFF;

    font-family:
      "Bricolage Grotesque",
      system-ui,
      sans-serif;

    font-size:
      clamp(19px, 2.1vw, 28px);

    font-weight: 700;

    line-height: 1.3;

    overflow-wrap: anywhere;
  }

  /* ======================================================
     10. DIAGRAM MOMENTS
     ====================================================== */

  .ss .dgw {
    display: flex;
    align-items: center;
    justify-content: center;

    width: min(100%, 1100px);

    min-width: 0;

    max-height: min(64dvh, 650px);

    padding:
      clamp(10px, 1.5vw, 20px);

    overflow: auto;

    border: 1px solid
      rgba(255,255,255,.25);

    border-radius: 16px;

    background: #142535;
    color: #FFFFFF;
  }

  .ss .dgw svg {
    display: block;

    width: 100%;
    height: auto;

    max-width: 100%;
    max-height: min(57dvh, 570px);

    margin: auto;

    overflow: visible;
  }

  /*
   * Diagram cards have their own layout.
   * This avoids unnecessarily shrinking
   * complex diagrams beneath oversized
   * introductory typography.
   */

  .ss-card.ss-diagram {
    gap: 12px;
  }

  .ss-card.ss-diagram .k {
    flex: 0 0 auto;
  }

  .ss-card.ss-diagram .p {
    max-width: 80ch;

    font-size:
      clamp(14px, 1.2vw, 17px);
  }

  /* ======================================================
     11. RESPONSIVE TABLET
     ====================================================== */

  @media (max-width: 900px) {

    .ss-card {
      padding: 28px 24px;
    }

    .ss h2 {
      font-size:
        clamp(29px, 5vw, 46px);
    }

    .ss h2.sm {
      font-size:
        clamp(25px, 4vw, 36px);
    }

    .ss .p {
      font-size: 17px;
    }

    .ss .dgw {
      max-height: 58dvh;
    }

    .ss .dgw svg {
      max-height: 50dvh;
    }
  }

  /* ======================================================
     12. PHONE
     ====================================================== */

  @media (max-width: 600px) {

    .ss-card {
      justify-content: center;

      padding: 22px 18px;

      gap: 14px;
    }

    .ss h2 {
      max-width: 100%;

      font-size:
        clamp(27px, 8vw, 37px);

      line-height: 1.12;
    }

    .ss h2.sm {
      font-size:
        clamp(24px, 6.8vw, 31px);
    }

    .ss .k {
      font-size: 12px;
      letter-spacing: .08em;
    }

    .ss .p {
      max-width: 100%;

      font-size: 16px;
      line-height: 1.5;
    }

    .ss .ring {
      width: 64px;
      height: 64px;

      border-radius: 18px;
    }

    .ss .ring .ic {
      width: 31px;
      height: 31px;
    }

    .ss .bigq {
      width: 52px;
      height: 52px;

      font-size: 32px;
    }

    .ss .frac {
      font-size:
        clamp(23px, 7vw, 32px);
    }

    .ss .chips {
      gap: 9px;
    }

    .ss .chip {
      align-items: flex-start;

      gap: 10px;

      padding: 12px;

      font-size: 15px;
    }

    .ss .chip b {
      max-width: 38%;

      font-size: 12px;
    }

    .ss .vs {
      grid-template-columns: 1fr;

      gap: 10px;
    }

    .ss .vs-i {
      padding: 15px;

      gap: 8px;
    }

    .ss .vs-n {
      font-size: 20px;
    }

    .ss .arr {
      width: 54px;
      height: 54px;

      font-size: 35px;
    }

    .ss .arr.s {
      width: 40px;
      height: 40px;

      font-size: 26px;
    }

    .ss .stmt {
      font-size: 19px;
      line-height: 1.35;
    }

    .ss .dgw {
      width: 100%;

      max-height: 53dvh;

      padding: 8px;

      border-radius: 10px;
    }

    .ss .dgw svg {
      max-height: 47dvh;
    }

    .ss-card.ss-diagram {
      justify-content: center;

      gap: 10px;
    }

    .ss-card.ss-diagram .p {
      font-size: 14px;
    }

    .ss-cover .ss-cover-mark {
      width: 46px;
      height: 46px;

      font-size: 18px;
    }
  }

  /* ======================================================
     13. SHORT VIEWPORTS
     ====================================================== */

  @media (max-height: 600px) {

    .ss-card {
      justify-content: flex-start;

      padding-top: 18px;
      padding-bottom: 18px;

      gap: 10px;
    }

    .ss h2 {
      font-size:
        clamp(24px, 5vh, 36px);
    }

    .ss .p {
      font-size: 15px;
    }

    .ss .ring {
      width: 54px;
      height: 54px;
    }

    .ss .ring .ic {
      width: 27px;
      height: 27px;
    }

    .ss .dgw {
      max-height: 48dvh;
    }

    .ss .dgw svg {
      max-height: 42dvh;
    }
  }

  /* ======================================================
     14. REDUCED MOTION
     ====================================================== */

  @media (prefers-reduced-motion: reduce) {

    .ss-card {
      transition: none !important;
      animation: none !important;
    }

    .ss-card *,
    .ss-card *::before,
    .ss-card *::after {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }

  `;

  const styleElement =
    document.createElement("style");

  styleElement.id = "vl-story-v25";

  styleElement.textContent =
    window.LAB &&
    typeof LAB.k === "function"
      ? LAB.k(css)
      : css;

  document.head.appendChild(styleElement);

  /* ======================================================
     15. COLOR SYSTEM
     ====================================================== */

  /*
   * Dark, muted backgrounds provide a coherent
   * premium appearance.
   *
   * White text remains readable against every
   * background.
   */

  const BG = Object.freeze([
    "linear-gradient(155deg,#174E57 0%,#102B3C 100%)",

    "linear-gradient(155deg,#754337 0%,#382B3A 100%)",

    "linear-gradient(155deg,#294B75 0%,#172A4A 100%)",

    "linear-gradient(155deg,#285B49 0%,#17372E 100%)",

    "linear-gradient(155deg,#64405E 0%,#30243D 100%)",

    "linear-gradient(155deg,#73532C 0%,#393021 100%)",

    "linear-gradient(155deg,#35465B 0%,#172535 100%)"
  ]);

  /* ======================================================
     16. HTML SAFETY
     ====================================================== */

  function esc(value) {
    return String(value ?? "").replace(
      /[&<>"']/g,
      character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[character]
    );
  }

  /*
   * Preserve normal words and punctuation.
   *
   * Unlike the original character animation,
   * this does not split words into many spans.
   *
   * Screen readers therefore receive ordinary,
   * continuous text.
   */

  function heading(value) {
    return esc(value);
  }

  function smallHeading(value) {
    return String(value ?? "").length > 36
      ? ' class="sm"'
      : "";
  }

  function safeIcon(name) {
    if (
      window.LAB &&
      typeof LAB.icon === "function"
    ) {
      return LAB.icon(name, "ic");
    }

    return "";
  }

  /*
   * Diagram SVG is generated by the trusted
   * local DIAG module.
   *
   * It is deliberately not escaped because
   * escaping would prevent SVG rendering.
   */

  function diagramHTML(moment) {
    return typeof moment.svg === "string"
      ? moment.svg
      : "";
  }

  /* ======================================================
     17. MOMENT RENDERING
     ====================================================== */

  function cardHtml(moments, section) {
    const ms = Array.isArray(moments)
      ? moments
      : [];

    const m = ms[0];

    if (!m) {
      return `
        <div class="k">Learning moment</div>
        <h2>Continue listening.</h2>
      `;
    }

    /*
     * COVER
     */

    if (m.cover) {
      return `
        <div
          class="ss-cover-mark"
          aria-hidden="true"
        >VL</div>

        <div class="k">
          ${esc(section.lesson)}
        </div>

        <h2>
          ${heading(section.title)}
        </h2>

        <div class="p">
          Press Play to begin listening.
        </div>
      `;
    }

    switch (m.type) {

      /*
       * TITLE
       */

      case "title":
        return `
          ${m.kicker
            ? `
              <div class="k">
                ${esc(m.kicker)}
              </div>
            `
            : ""
          }

          <h2${smallHeading(m.text)}>
            ${heading(m.text)}
          </h2>
        `;

      /*
       * ITEM
       */

      case "item":
        return `
          <div
            class="ring"
            aria-hidden="true"
          >
            ${safeIcon(m.icon)}
          </div>

          <div class="k">
            ${esc(m.n)} of ${esc(m.of)}
          </div>

          <h2${smallHeading(m.title)}>
            ${heading(m.title)}
          </h2>

          ${m.text
            ? `
              <div class="p">
                ${esc(m.text)}
              </div>
            `
            : ""
          }
        `;

      /*
       * QUESTION
       */

      case "question":
        return `
          <div
            class="bigq"
            aria-hidden="true"
          >?</div>

          <h2${smallHeading(m.text)}>
            ${heading(m.text)}
          </h2>
        `;

      /*
       * FORMULA
       */

      case "formula":
        return `
          ${m.label
            ? `
              <div class="k">
                ${esc(m.label)}
              </div>
            `
            : ""
          }

          <div class="frac">

            <div class="num">
              ${esc(m.num)}
            </div>

            <div
              class="bar"
              aria-hidden="true"
            ></div>

            <div class="den">
              ${esc(m.den)}
            </div>

          </div>
        `;

      /*
       * ISSUE
       */

      case "issue":
        return `
          <div class="k">
            What went wrong
          </div>

          <div class="chips">
            ${ms.map(item => `
              <div class="chip">

                <span>
                  ${esc(item.text)}
                </span>

                ${item.effect
                  ? `
                    <b>
                      ${esc(item.effect)}
                    </b>
                  `
                  : ""
                }

              </div>
            `).join("")}
          </div>
        `;

      /*
       * COMPARE
       */

      case "compare": {
        const statement = ms.find(
          item => item.type === "statement"
        );

        const comparisons = ms.filter(
          item => item.type === "compare"
        );

        if (comparisons.length > 1) {
          return `
            <div class="vs">

              ${comparisons.map(item => `
                <div
                  class="vs-i${
                    item.side === "b" ? " b" : ""
                  }"
                >

                  ${item.dir
                    ? `
                      <div
                        class="arr s"
                        aria-hidden="true"
                      >
                        ${item.dir === "down"
                          ? "↓"
                          : "↑"
                        }
                      </div>
                    `
                    : ""
                  }

                  <div class="k">
                    ${esc(item.label)}
                  </div>

                  <div class="vs-n">
                    ${esc(item.note)}
                  </div>

                </div>
              `).join("")}

            </div>

            ${statement
              ? `
                <div class="stmt">
                  ${esc(statement.text)}
                </div>
              `
              : ""
            }
          `;
        }

        return `
          ${m.dir
            ? `
              <div
                class="arr"
                aria-hidden="true"
              >
                ${m.dir === "down"
                  ? "↓"
                  : "↑"
                }
              </div>
            `
            : ""
          }

          ${m.label
            ? `
              <div class="k">
                ${esc(m.label)}
              </div>
            `
            : ""
          }

          <h2${smallHeading(m.note)}>
            ${heading(m.note)}
          </h2>

          ${statement
            ? `
              <div class="stmt">
                ${esc(statement.text)}
              </div>
            `
            : ""
          }
        `;
      }

      /*
       * DIAGRAM
       */

      case "diagram":
        return `
          ${m.kicker
            ? `
              <div class="k">
                ${esc(m.kicker)}
              </div>
            `
            : ""
          }

          <div class="dgw">
            ${diagramHTML(m)}
          </div>

          ${m.caption
            ? `
              <div class="p">
                ${esc(m.caption)}
              </div>
            `
            : ""
          }
        `;

      /*
       * STATEMENT
       */

      case "statement":
        return `
          <div class="stmt">
            ${esc(m.text)}
          </div>
        `;

      /*
       * SAFE DEFAULT
       */

      default:
        return `
          <h2${smallHeading(m.text)}>
            ${heading(m.text || "")}
          </h2>
        `;
    }
  }

  /* ======================================================
     18. OPTIONAL GSAP SUPPORT
     ====================================================== */

  /*
   * GSAP is optional.
   *
   * The renderer remains fully functional
   * without it.
   *
   * Animations never control speech.
   */

  function reducedMotion() {
    return Boolean(
      window.matchMedia &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    );
  }

  function gsapInstance() {
    if (reducedMotion()) return null;

    return window.gsap || null;
  }

  function killAnimations(element) {
    const gsap = window.gsap;

    if (
      !gsap ||
      !element ||
      typeof gsap.killTweensOf !== "function"
    ) {
      return;
    }

    gsap.killTweensOf(element);

    element.querySelectorAll("*").forEach(
      child => gsap.killTweensOf(child)
    );
  }

  /*
   * One restrained content entrance.
   *
   * No:
   * - 3D rotations
   * - elastic movement
   * - bouncing formulas
   * - staggered character animations
   * - long choreographed sequences
   */

  function intro(card) {
    const gsap = gsapInstance();

    if (!gsap || !card) return;

    const elements = [
      ...card.querySelectorAll(
        ":scope > .k, " +
        ":scope > h2, " +
        ":scope > .p, " +
        ":scope > .ring, " +
        ":scope > .bigq, " +
        ":scope > .frac, " +
        ":scope > .chips, " +
        ":scope > .vs, " +
        ":scope > .stmt, " +
        ":scope > .dgw, " +
        ":scope > .arr"
      )
    ];

    if (!elements.length) return;

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 10
      },
      {
        opacity: 1,
        y: 0,

        duration: 0.32,
        stagger: 0.035,

        ease: "power2.out",

        overwrite: true,
        clearProps: "opacity,transform"
      }
    );
  }

  /* ======================================================
     19. STATE
     ====================================================== */

  let root = null;
  let section = null;

  let cards = [];
  let keys = [];

  let currentCard = -1;

  /*
   * Separate generation number prevents
   * stale animation callbacks from affecting
   * newly loaded lessons.
   */

  let generation = 0;

  /* ======================================================
     20. MOUNT
     ====================================================== */

  function mount(element) {
    root = element;

    if (!root) return;

    root.innerHTML = `
      <div
        class="ss"
        aria-label="Story Cards lesson presentation"
      ></div>
    `;

    cards = [];
    keys = [];
    section = null;

    currentCard = -1;

    generation++;
  }

  /* ======================================================
     21. LOAD
     ====================================================== */

  function load(nextSection) {
    if (!root) return;

    const container =
      root.querySelector(".ss");

    if (!container) return;

    generation++;

    section = nextSection || {};

    const moments = Array.isArray(
      section.moments
    )
      ? section.moments
      : [];

    const sentences = Array.isArray(
      section.sentences
    )
      ? section.sentences
      : [];

    /*
     * Remove all old cards.
     *
     * This prevents stale lesson content
     * from remaining in the DOM.
     */

    cards.forEach(card => {
      killAnimations(card);
      card.remove();
    });

    cards = [];
    keys = [];

    currentCard = -1;

    /*
     * Group moments by their sentence index.
     *
     * The original source used Map insertion
     * order. Sorting ensures deterministic
     * behavior even if moments are supplied
     * out of order.
     */

    const groups = new Map();

    moments.forEach(moment => {
      if (!moment || typeof moment !== "object") {
        return;
      }

      const rawIndex = Number(moment.at);

      if (!Number.isFinite(rawIndex)) {
        return;
      }

      const index = Math.trunc(rawIndex);

      if (
        index < 0 ||
        index >= sentences.length
      ) {
        return;
      }

      if (!groups.has(index)) {
        groups.set(index, []);
      }

      groups.get(index).push(moment);
    });

    const sortedKeys = [
      ...groups.keys()
    ].sort((a, b) => a - b);

    keys = [-1, ...sortedKeys];

    /*
     * Every moment group becomes one card.
     *
     * This preserves the original progression
     * model: a new card appears when its
     * sentence index is reached.
     */

    const fragment =
      document.createDocumentFragment();

    cards = keys.map((key, index) => {
      const card =
        document.createElement("div");

      card.className = "ss-card";

      card.style.background =
        BG[index % BG.length];

      const isCover = key === -1;

      const group = isCover
        ? [{ cover: true }]
        : groups.get(key);

      const primaryMoment = group?.[0];

      if (isCover) {
        card.classList.add("ss-cover");
      }

      if (
        primaryMoment?.type === "diagram"
      ) {
        card.classList.add("ss-diagram");
      }

      card.innerHTML =
        cardHtml(group, section);

      /*
       * Only the current card should be
       * available to assistive technology.
       */

      card.setAttribute(
        "aria-hidden",
        "true"
      );

      card.inert = true;

      fragment.appendChild(card);

      return card;
    });

    container.replaceChildren(fragment);

    /*
     * Display the cover immediately.
     *
     * This does not start narration.
     */

    if (cards.length) {
      currentCard = 0;

      const cover = cards[0];

      cover.classList.add("now");

      cover.setAttribute(
        "aria-hidden",
        "false"
      );

      cover.inert = false;
    }
  }

  /* ======================================================
     22. CARD ACTIVATION
     ====================================================== */

  function activateCard(index) {
    if (
      index < 0 ||
      index >= cards.length
    ) {
      return;
    }

    if (index === currentCard) {
      return;
    }

    const previous =
      cards[currentCard] || null;

    const next =
      cards[index];

    if (!next) return;

    const thisGeneration = generation;

    /*
     * Kill old animations before changing
     * card visibility.
     */

    if (previous) {
      killAnimations(previous);

      previous.classList.remove("now");

      previous.setAttribute(
        "aria-hidden",
        "true"
      );

      previous.inert = true;
    }

    cards.forEach((card, cardIndex) => {
      if (cardIndex === index) return;

      card.classList.remove("now");

      card.setAttribute(
        "aria-hidden",
        "true"
      );

      card.inert = true;
    });

    /*
     * Reset scrolling when moving to a
     * different learning moment.
     */

    next.scrollTop = 0;

    next.classList.add("now");

    next.setAttribute(
      "aria-hidden",
      "false"
    );

    next.inert = false;

    currentCard = index;

    /*
     * A generation guard prevents a stale
     * animation from a previous lesson.
     */

    if (thisGeneration === generation) {
      intro(next);
    }
  }

  /* ======================================================
     23. SENTENCE STEP
     ====================================================== */

  function step(sentenceIndex) {
    if (
      !section ||
      !cards.length
    ) {
      return;
    }

    const raw = Number(sentenceIndex);

    if (!Number.isFinite(raw)) {
      return;
    }

    const sentences = Array.isArray(
      section.sentences
    )
      ? section.sentences
      : [];

    /*
     * The cover corresponds to -1.
     *
     * Sentence 0 begins the actual lesson.
     */

    const index = Math.max(
      -1,
      Math.min(
        Math.trunc(raw),
        Math.max(-1, sentences.length - 1)
      )
    );

    let target = 0;

    /*
     * keys[0] is -1.
     *
     * Select the latest moment whose
     * sentence index is <= current index.
     */

    for (let i = 0; i < keys.length; i++) {
      if (keys[i] <= index) {
        target = i;
      } else {
        break;
      }
    }

    activateCard(target);
  }

  /* ======================================================
     24. REGISTRATION
     ====================================================== */

  if (!Array.isArray(window.STYLES)) {
    window.STYLES = [];
  }

  window.STYLES.push({
    id: "story",

    name: "Story cards",

    note:
      "Calm, full-screen visual cards with " +
      "clear typography, accessible diagrams " +
      "and restrained transitions.",

    mount,
    load,
    step
  });

})();

// END FILE