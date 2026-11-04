// FILE: content.js

/*
 * VoiceLearn — Shared Visual Helpers v25
 * OPER621 Business Process Management
 *
 * Revised from the supplied v24 content.js.
 *
 * This module provides shared presentation
 * utilities used by the four visual looks.
 *
 * Preserved public interface:
 *
 * window.LAB = {
 *   sections,
 *   icons,
 *   k(css),
 *   icon(name, className)
 * }
 *
 * window.STYLES = [...]
 *
 * Improvements:
 * - Preserve existing registered styles
 * - Prevent accidental registry resets
 * - Preserve all original icon names
 * - Accessible SVG icon markup
 * - Consistent icon dimensions
 * - Safer CSS scaling
 * - Avoid double-scaling existing calc()
 * - Support reduced motion
 * - No narration or speech modifications
 *
 * IMPORTANT:
 *
 * Load this file before:
 *
 * style-story.js
 * style-codex.js
 * style-notebook.js
 * style-journey.js
 *
 * It must not reset STYLES after the
 * presentation looks have registered.
 */

(() => {
  "use strict";

  /* ======================================================
     01. PRESERVE EXISTING STATE
     ====================================================== */

  const previousLAB =
    window.LAB &&
    typeof window.LAB === "object"
      ? window.LAB
      : {};

  const previousStyles =
    Array.isArray(window.STYLES)
      ? window.STYLES
      : [];

  /* ======================================================
     02. ICON DEFINITIONS
     ====================================================== */

  const icons = {

    target:
      '<circle cx="12" cy="12" r="8"/>' +
      '<circle cx="12" cy="12" r="3"/>',

    check:
      '<path d="M4 12l5 5L20 6"/>',

    eq:
      '<path d="M5 9h14M5 15h14"/>',

    clock:
      '<circle cx="12" cy="12" r="8"/>' +
      '<path d="M12 7v5l3 2"/>',

    one:
      '<rect x="5" y="5" width="14" ' +
      'height="14" rx="3"/>' +
      '<path d="M11 9l2-1v8"/>',

    link:
      '<path d="M10 14a4 4 0 0 0 6 0' +
      'l3-3a4 4 0 0 0-6-6l-1 1"/>' +
      '<path d="M14 10a4 4 0 0 0-6 0' +
      'l-3 3a4 4 0 0 0 6 6l1-1"/>',

    gauge:
      '<path d="M4 16a8 8 0 1 1 16 0"/>' +
      '<path d="M12 16l4-5"/>',

    chart:
      '<path d="M5 19V9M10 19V5' +
      'M15 19v-7M20 19v-4"/>',

    users:
      '<circle cx="9" cy="9" r="3"/>' +
      '<path d="M3 19a6 6 0 0 1 12 0"/>' +
      '<path d="M16 6a3 3 0 0 1 0 6' +
      'M17 19a6 6 0 0 0-2-4"/>',

    flask:
      '<path d="M9 3h6M10 3v6l-5 9' +
      'a2 2 0 0 0 2 3h10' +
      'a2 2 0 0 0 2-3l-5-9V3"/>',

    layers:
      '<path d="M12 3l9 5-9 5-9-5 9-5z"/>' +
      '<path d="M3 13l9 5 9-5"/>',

    dash:
      '<rect x="3" y="4" width="18" ' +
      'height="16" rx="2"/>' +
      '<path d="M7 15l3-3 3 2 4-5"/>',

    brain:
      '<circle cx="12" cy="12" r="3"/>' +
      '<path d="M12 3v3M12 18v3' +
      'M3 12h3M18 12h3' +
      'M5.6 5.6l2.1 2.1' +
      'M16.3 16.3l2.1 2.1' +
      'M5.6 18.4l2.1-2.1' +
      'M16.3 7.7l2.1-2.1"/>',

    audit:
      '<path d="M7 3h7l4 4v14H7z"/>' +
      '<path d="M10 12h5M10 16h5' +
      'M14 3v4h4"/>',

    flag:
      '<path d="M5 21V4h11l-2 4' +
      ' 2 4H5"/>',

    route:
      '<circle cx="5" cy="6" r="2"/>' +
      '<circle cx="19" cy="18" r="2"/>' +
      '<path d="M7 6h7a3 3 0 0 1 0 6' +
      'H10a3 3 0 0 0 0 6h7"/>',

    key:
      '<circle cx="8" cy="14" r="4"/>' +
      '<path d="M11 11l8-8M16 6l3 3' +
      'M14 8l2 2"/>',

    loop:
      '<path d="M20 12a8 8 0 1 1-3-6.2"/>' +
      '<path d="M20 4v5h-5"/>'

  };

  /*
   * Preserve any additional icon definitions
   * registered by other VoiceLearn modules.
   */

  const mergedIcons = {
    ...icons,
    ...(
      previousLAB.icons &&
      typeof previousLAB.icons === "object"
        ? previousLAB.icons
        : {}
    )
  };

  /* ======================================================
     03. HTML ATTRIBUTE ESCAPING
     ====================================================== */

  function escapeAttribute(value) {
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

  /* ======================================================
     04. CSS PIXEL SCALER
     ====================================================== */

  /*
   * Original v24 behavior:
   *
   * Convert:
   *
   *   24px
   *
   * into:
   *
   *   calc(24px * var(--k,1))
   *
   * This preserves the existing scaling
   * mechanism used by all four looks.
   *
   * v25 improvements:
   *
   * - Avoid modifying CSS strings and comments.
   * - Avoid converting values already inside
   *   calc(), min(), max() or clamp().
   * - Avoid converting custom properties.
   * - Avoid double-scaling previously
   *   processed CSS.
   *
   * The scaler is intentionally conservative.
   */

  function k(css) {
    if (typeof css !== "string") {
      return "";
    }

    if (!css.includes("px")) {
      return css;
    }

    /*
     * A lightweight CSS tokenizer.
     *
     * It preserves comments, quoted strings
     * and existing CSS functions.
     */

    let result = "";

    let i = 0;

    let quote = null;
    let comment = false;

    const functionStack = [];

    let token = "";

    const protectedFunctions =
      new Set([
        "calc",
        "clamp",
        "min",
        "max",
        "var"
      ]);

    function insideProtectedFunction() {
      return functionStack.some(
        name => protectedFunctions.has(name)
      );
    }

    function isIdentifierCharacter(ch) {
      return /[a-zA-Z0-9_-]/.test(ch);
    }

    while (i < css.length) {
      const ch = css[i];
      const next = css[i + 1];

      /*
       * CSS comments.
       */

      if (comment) {
        result += ch;

        if (
          ch === "*" &&
          next === "/"
        ) {
          result += "/";
          i += 2;
          comment = false;
        } else {
          i++;
        }

        continue;
      }

      if (
        !quote &&
        ch === "/" &&
        next === "*"
      ) {
        result += "/*";
        i += 2;
        comment = true;
        continue;
      }

      /*
       * Quoted strings.
       */

      if (quote) {
        result += ch;

        if (ch === "\\") {
          if (i + 1 < css.length) {
            result += css[i + 1];
            i += 2;
            continue;
          }
        }

        if (ch === quote) {
          quote = null;
        }

        i++;
        continue;
      }

      if (
        ch === '"' ||
        ch === "'"
      ) {
        quote = ch;
        result += ch;
        i++;
        continue;
      }

      /*
       * Function tracking.
       */

      if (isIdentifierCharacter(ch)) {
        token += ch;
      } else if (ch === "(") {
        functionStack.push(
          token.toLowerCase()
        );

        token = "";
      } else {
        token = "";
      }

      if (ch === ")") {
        functionStack.pop();
      }

      /*
       * Numeric pixel values.
       */

      const remaining = css.slice(i);

      const match = remaining.match(
        /^(-?(?:\d+\.?\d*|\.\d+))px\b/
      );

      if (
        match &&
        !insideProtectedFunction()
      ) {
        /*
         * Ensure the number is not part
         * of an identifier.
         */

        const previous =
          i > 0 ? css[i - 1] : "";

        if (
          !previous ||
          !isIdentifierCharacter(previous)
        ) {
          result +=
            `calc(${match[1]}px * var(--k,1))`;

          i += match[0].length;
          continue;
        }
      }

      result += ch;
      i++;
    }

    return result;
  }

  /* ======================================================
     05. ICON RENDERER
     ====================================================== */

  /*
   * Original interface:
   *
   * LAB.icon(name, className = "")
   *
   * Returns SVG markup.
   *
   * Decorative icons are hidden from
   * screen readers.
   *
   * Icons that convey meaning should be
   * accompanied by visible text.
   */

  function icon(
    name,
    className = ""
  ) {
    const key = String(name ?? "");

    const path =
      mergedIcons[key] ||
      mergedIcons.layers;

    const cls =
      escapeAttribute(className);

    return `
      <svg
        class="${cls}"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        focusable="false"
        style="
          display:inline-block;
          flex:none;
          max-width:100%;
          vertical-align:middle;
        "
      >
        ${path}
      </svg>
    `;
  }

  /* ======================================================
     06. REDUCED MOTION
     ====================================================== */

  function reducedMotion() {
    return Boolean(
      typeof window.matchMedia === "function" &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    );
  }

  /* ======================================================
     07. RESPONSIVE SCALE
     ====================================================== */

  /*
   * Return a conservative scale factor
   * based on available dimensions.
   *
   * The scene engine remains responsible
   * for applying --k.
   *
   * This helper does not modify the DOM.
   */

  function scaleFor(
    width,
    height,
    options = {}
  ) {
    const w = Number(width);
    const h = Number(height);

    if (
      !Number.isFinite(w) ||
      !Number.isFinite(h) ||
      w <= 0 ||
      h <= 0
    ) {
      return 1;
    }

    const min = Number.isFinite(
      Number(options.min)
    )
      ? Number(options.min)
      : 1;

    const max = Number.isFinite(
      Number(options.max)
    )
      ? Number(options.max)
      : 1.65;

    const referenceWidth =
      Number(options.referenceWidth) ||
      420;

    const referenceHeight =
      Number(options.referenceHeight) ||
      650;

    const raw = Math.min(
      w / referenceWidth,
      h / referenceHeight
    );

    const lower =
      Math.min(min, max);

    const upper =
      Math.max(min, max);

    return Math.max(
      lower,
      Math.min(upper, raw)
    );
  }

  /* ======================================================
     08. PUBLIC LAB OBJECT
     ====================================================== */

  /*
   * Preserve previously registered sections
   * and any additional LAB properties.
   */

  const LAB = {
    ...previousLAB,

    sections:
      Array.isArray(previousLAB.sections)
        ? previousLAB.sections
        : [],

    icons: mergedIcons,

    k,
    icon,

    reducedMotion,
    scaleFor
  };

  /* ======================================================
     09. REGISTER
     ====================================================== */

  window.LAB = LAB;

  /*
   * Preserve the existing styles registry.
   *
   * Never replace a populated registry
   * with an empty array.
   */

  window.STYLES = previousStyles;

})();

// END FILE