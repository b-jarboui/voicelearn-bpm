// OPER621 · WEEK 1 · CINEMATIC SCENES
//
// Week 1 visual direction:
// Every section is a distinct animated environment.
// No narration cards. No generic diagram templates.
// Every narration moment produces a visible state change.
//
// Scene inventory:
// W1INTRO  — The Arrival: a living hotel lobby
// O1a      — The Guest's Journey: a working hotel cutaway
// O1b      — Levels and Boundaries: a cinematic zoom lens
// O2a      — Nine Departments: a fragmented hotel tower
// O2b      — Handoffs: the 23-minute mechanical clock
// O3a      — Process-Centred Organisation: the command bridge
// O3b      — Two Lenses: the rotating organisation
// O4a      — BPI versus BPM: the improvement garden
// O4b      — Maturity: the five-level construction site
// O4c      — BPM Framework: the winding expedition
// W1OUTRO  — The Complaint: six departments, one lost case
//
// Public contract:
// window.VL_SCENES[id] = {
//   build(el),
//   step(i, n),
//   reset()
// };
//
// Integration:
// Load this file after the Week 1 course.js.
// The Week 10-compatible scene host can mount these scenes.
// The two unnumbered Week 1 sections receive stable IDs.
//
// Each part is a contiguous slice of this JavaScript file.
// Concatenate PART 1 through PART 5 without inserting code.

// ============================================================
// 00 · SHARED CINEMATIC INFRASTRUCTURE
// ============================================================

(() => {
  "use strict";

  window.VL_SCENES = window.VL_SCENES || {};

  const REG = window.VL_SCENES;

  // Give the introductory and concluding sections stable IDs.
  // Existing assessment-linked IDs remain unchanged.
  function registerMissingSectionIds() {
    const lessons = window.COURSE?.lessons;
    if (!Array.isArray(lessons)) return;

    const first = lessons[0]?.sections?.[0];
    const lastLesson = lessons[lessons.length - 1];
    const last = lastLesson?.sections?.[
      lastLesson.sections.length - 1
    ];

    if (first && !first.sec) first.sec = "W1INTRO";
    if (last && !last.sec) last.sec = "W1OUTRO";
  }

  registerMissingSectionIds();

  const C = Object.freeze({
    navy: "#1f4e79",
    orange: "#c0502a",
    paper: "#fbf8f1",
    ink: "#1b2a3a",
    blue: "#dbe7f2",
    green: "#317c61",
    pale: "#e8f0f5",
    gold: "#d6a45e",
    muted: "#8ba9bf",
    white: "#ffffff"
  });

  const NS = "http://www.w3.org/2000/svg";

  const clamp = (v, lo, hi) =>
    Math.max(lo, Math.min(hi, v));

  const reduced = () => {
    try {
      return window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    } catch (_) {
      return false;
    }
  };

  const esc = value =>
    String(value).replace(/[&<>"']/g, ch => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[ch]);

  const svg = (body, label = "Animated BPM illustration") =>
    `<svg xmlns="${NS}"
       viewBox="0 0 340 390"
       preserveAspectRatio="xMidYMid meet"
       role="img"
       aria-label="${esc(label)}">${body}</svg>`;

  const circle = (x, y, r, fill, extra = "") =>
    `<circle cx="${x}" cy="${y}" r="${r}"
       fill="${fill}" ${extra}/>`;

  const rect = (x, y, w, h, fill, rx = 0, extra = "") =>
    `<rect x="${x}" y="${y}"
       width="${w}" height="${h}"
       rx="${rx}" fill="${fill}" ${extra}/>`;

  const path = (d, stroke = C.navy, width = 2, extra = "") =>
    `<path d="${d}" fill="none"
       stroke="${stroke}" stroke-width="${width}"
       stroke-linecap="round"
       stroke-linejoin="round" ${extra}/>`;

  const txt = (
    x, y, value, size = 12,
    fill = C.ink, extra = ""
  ) =>
    `<text x="${x}" y="${y}"
       text-anchor="middle"
       font-size="${size}"
       fill="${fill}" ${extra}>${esc(value)}</text>`;

  const person = (x, y, color = C.navy, scale = 1) =>
    `<g transform="translate(${x} ${y}) scale(${scale})">
       ${circle(0, -12, 8, color)}
       <path d="M-14 13 Q-14 -3 0 -3
                Q14 -3 14 13 Z"
             fill="${color}"/>
     </g>`;

  const check = (
    x, y, color = C.green, width = 4
  ) =>
    path(
      `M${x - 9} ${y}
       l7 7 15 -17`,
      color, width
    );

  const arrow = (
    x1, y1, x2, y2,
    color = C.navy, width = 3
  ) => {
    const a = Math.atan2(y2 - y1, x2 - x1);
    const s = 9;
    const p1x = x2 - s * Math.cos(a - Math.PI / 6);
    const p1y = y2 - s * Math.sin(a - Math.PI / 6);
    const p2x = x2 - s * Math.cos(a + Math.PI / 6);
    const p2y = y2 - s * Math.sin(a + Math.PI / 6);

    return path(
      `M${x1} ${y1} L${x2} ${y2}
       M${p1x} ${p1y} L${x2} ${y2}
       L${p2x} ${p2y}`,
      color, width
    );
  };

  function mount(el, id, content, label) {
    if (!el || typeof el.replaceChildren !== "function")
      return null;

    const root = document.createElement("div");

    root.className = `vls-w01-${id}`;
    root.dataset.vlsScene = id;
    root.innerHTML = svg(content, label);

    el.replaceChildren(root);

    return root;
  }

  const one = (root, selector) =>
    root?.querySelector(selector) || null;

  const all = (root, selector) =>
    root ? Array.from(root.querySelectorAll(selector)) : [];

  function style(root, selector, props) {
    all(root, selector).forEach(el => {
      Object.entries(props).forEach(([key, value]) => {
        el.style[key] = String(value);
      });
    });
  }

  function attr(root, selector, name, value) {
    all(root, selector).forEach(el =>
      el.setAttribute(name, String(value))
    );
  }

  function visible(root, selector, yes) {
    style(root, selector, {
      opacity: yes ? 1 : 0
    });
  }

  function move(root, selector, x = 0, y = 0) {
    style(root, selector, {
      transform: `translate(${x}px, ${y}px)`
    });
  }

  function rotate(root, selector, degrees) {
    style(root, selector, {
      transform: `rotate(${degrees}deg)`
    });
  }

  function scale(root, selector, factor) {
    style(root, selector, {
      transform: `scale(${factor})`
    });
  }

  function text(root, selector, value) {
    const el = one(root, selector);
    if (el) el.textContent = value;
  }

  function draw(root, selector, amount) {
    style(root, selector, {
      strokeDashoffset: String(amount)
    });
  }

  // Progress through a section is measured against the actual
  // number of narration moments, not a guessed section length.
  function moment(i, n) {
    const total = Number.isFinite(Number(n))
      ? Math.max(1, Math.floor(Number(n)))
      : 1;

    const index = Number.isFinite(Number(i))
      ? clamp(Math.floor(Number(i)), 0, total - 1)
      : 0;

    return {
      i: index,
      n: total,
      p: total > 1 ? index / (total - 1) : 0
    };
  }

  function beat(i, boundaries) {
    return boundaries.reduce(
      (count, boundary) =>
        count + (i >= boundary ? 1 : 0),
      0
    );
  }

  // Set an entire scene immediately when resetting.
  // Normal narration steps retain CSS transitions.
  function renderState(root, fn, instant = false) {
    if (!root) return;

    const noMotion = instant || reduced();

    root.classList.toggle("vls-w01-instant", noMotion);

    fn();

    if (noMotion && !reduced()) {
      void root.offsetHeight;
      root.classList.remove("vls-w01-instant");
    }
  }

  // GSAP is optional. Never allow an old tween to continue
  // changing a scene after the learner seeks elsewhere.
  function tween(el, props, duration = 0.85) {
    if (!el) return;

    const gsap = window.gsap;

    if (gsap?.killTweensOf) {
      gsap.killTweensOf(el);
    }

    if (reduced() || !gsap?.to) {
      Object.entries(props).forEach(([key, value]) => {
        if (key === "opacity") {
          el.style.opacity = value;
        } else if (key === "x" || key === "y") {
          // Position-based animation is handled by scene
          // transforms so reduced motion remains deterministic.
        } else {
          el.style[key] = value;
        }
      });
      return;
    }

    gsap.to(el, {
      ...props,
      duration,
      ease: "power2.inOut",
      overwrite: true
    });
  }

  // Every step changes the primary scene AND a secondary
  // visual detail, including moments within the same story beat.
  //
  // This creates a visible response for every spoken line,
  // while preserving coherent, larger cinematic sequences.
  function microMotion(root, i, n, mode = "drift") {
    if (!root) return;

    const m = moment(i, n);
    const direction = i % 2 ? 1 : -1;
    const wave = Math.sin(i * 1.73);

    const camera = one(root, ".vls-camera");
    const light = one(root, ".vls-light");
    const spark = one(root, ".vls-spark");

    if (camera) {
      const x = mode === "track"
        ? wave * 3.8
        : direction * 1.8;

      const y = mode === "rise"
        ? -m.p * 7
        : Math.cos(i * 1.31) * 1.6;

      const z = 1 + Math.sin(i * 0.67) * 0.009;

      camera.style.transform =
        `translate(${x}px,${y}px) scale(${z})`;
    }

    if (light) {
      light.style.opacity =
        String(0.22 + (i % 5) * 0.12);

      light.style.transform =
        `translate(${wave * 9}px,
                   ${Math.cos(i) * 5}px)`;
    }

    if (spark) {
      spark.style.opacity =
        String(0.35 + (i % 4) * 0.18);

      spark.style.transform =
        `translate(${Math.sin(i * 2.1) * 9}px,
                   ${Math.cos(i * 1.9) * 8}px)`;
    }

    const progress = one(root, ".vls-progress");

    if (progress) {
      progress.setAttribute(
        "width",
        String(300 * (i + 1) / Math.max(1, n))
      );
    }
  }

  function stopTweens(root) {
    if (!root || !window.gsap?.killTweensOf) return;

    window.gsap.killTweensOf(
      [root, ...root.querySelectorAll("*")]
    );
  }

  // A single CSS element for the entire Week 1 file.
  // Later parts append rules to the same stylesheet.
  function addCSS(css) {
    let el = document.getElementById("vl-sc-w01");

    if (!el) {
      el = document.createElement("style");
      el.id = "vl-sc-w01";
      document.head.appendChild(el);
    }

    el.appendChild(document.createTextNode(css));
  }

  addCSS(`
    /* ================================================
       WEEK 1 · COMMON CINEMATIC FOUNDATION
       ================================================ */

    [data-vls-scene] {
      --navy: #1f4e79;
      --orange: #c0502a;
      --paper: #fbf8f1;
      --ink: #1b2a3a;
      --blue: #dbe7f2;
      --green: #317c61;

      position: relative;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      isolation: isolate;
      box-sizing: border-box;
      background: transparent;
      color: var(--ink);
      font-family: inherit;
    }

    [data-vls-scene] *,
    [data-vls-scene] *::before,
    [data-vls-scene] *::after {
      box-sizing: border-box;
    }

    [data-vls-scene] svg {
      display: block;
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      overflow: hidden;
      font-family: inherit;
    }

    [data-vls-scene] svg text {
      font-family: inherit;
      font-weight: 700;
      letter-spacing: .25px;
    }

    [data-vls-scene] .vls-camera,
    [data-vls-scene] .vls-light,
    [data-vls-scene] .vls-spark {
      transition:
        transform .8s cubic-bezier(.2,.75,.2,1),
        opacity .7s ease;
    }

    [data-vls-scene] .vls-moving {
      transition:
        transform .95s cubic-bezier(.2,.75,.2,1),
        opacity .75s ease,
        fill .75s ease,
        stroke .75s ease;
    }

    [data-vls-scene] .vls-drawing {
      transition:
        stroke-dashoffset .95s ease,
        opacity .7s ease;
    }

    [data-vls-scene] .vls-progress {
      transition: width .65s ease;
    }

    [data-vls-scene] .vls-caption {
      fill: var(--navy);
      font-size: 12px;
      font-weight: 750;
      letter-spacing: .4px;
    }

    [data-vls-scene] .vls-kicker {
      fill: var(--navy);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 1.1px;
    }

    [data-vls-scene].vls-w01-instant *,
    [data-vls-scene].vls-w01-instant *::before,
    [data-vls-scene].vls-w01-instant *::after {
      transition: none !important;
      animation: none !important;
    }

    @media (max-width: 375px) {
      [data-vls-scene] svg {
        width: 100%;
        height: 100%;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      [data-vls-scene] *,
      [data-vls-scene] *::before,
      [data-vls-scene] *::after {
        animation: none !important;
        transition: none !important;
      }
    }
  `);

  // Shared utilities are deliberately private to this IIFE.
  // Later parts extend the same registry independently.

  // ==========================================================
  // SCENE 01 · W1INTRO
  // THE ARRIVAL
  //
  // Original visual concept:
  // A theatrical hotel lobby, viewed in perspective.
  //
  // A traveller approaches reception. The booking screen
  // fails. Information becomes trapped behind departmental
  // doors. The camera follows the traveller while a network
  // of connections gradually illuminates above the lobby.
  //
  // Unlike the Week 10 kiosk scene, the central object is
  // a human-operated reception desk with a physical queue.
  //
  // Main animation:
  // Character blocking, perspective camera, swinging doors,
  // phone signal, interrupted information routes, and
  // a final connected guest journey.
  //
  // Narration: 28 moments.
  // ==========================================================

  {
    let root = null;

    const labels = [
      "WELCOME TO QASR",
      "A TIRED ARRIVAL",
      "THE BOOKING PROBLEM",
      "DEPARTMENTS RESPOND",
      "THE GUEST WAITS",
      "FOLLOW THE JOURNEY",
      "ONE CONNECTED PROCESS",
      "THE CUSTOMER OUTCOME"
    ];

    const body = `
      <defs>
        <linearGradient id="w01introFloor"
          x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="#dbe7f2"/>
          <stop offset="1" stop-color="#fbf8f1"/>
        </linearGradient>

        <radialGradient id="w01introSpot">
          <stop stop-color="#e8bd7c"
                stop-opacity=".55"/>
          <stop offset="1" stop-color="#e8bd7c"
                stop-opacity="0"/>
        </radialGradient>

        <filter id="w01introShadow"
          x="-30%" y="-30%"
          width="160%" height="160%">
          <feDropShadow dx="0" dy="5"
            stdDeviation="5"
            flood-color="#1f4e79"
            flood-opacity=".16"/>
        </filter>
      </defs>

      ${txt(170,25,"QASR MARINA",14,C.navy,
        'letter-spacing="2"')}

      <g class="vls-light">
        <ellipse cx="170" cy="181"
          rx="157" ry="146"
          fill="url(#w01introSpot)"/>
      </g>

      <g class="vls-camera">

        <!-- Architectural lobby -->
        <path d="M14 88 L170 48 L326 88
                 V278 H14 Z"
          fill="#f4f0e8"/>

        <path d="M14 88 L170 48 L326 88"
          fill="none" stroke="#1f4e79"
          stroke-width="3" opacity=".35"/>

        <!-- Tall lobby windows -->
        <g opacity=".45">
          ${rect(24,105,58,121,C.blue,4,
            'stroke="#1f4e79" stroke-width="2"')}
          ${rect(258,105,58,121,C.blue,4,
            'stroke="#1f4e79" stroke-width="2"')}

          ${path("M53 105 V226 M24 166 H82",
            C.navy,1.5)}
          ${path("M287 105 V226 M258 166 H316",
            C.navy,1.5)}
        </g>

        <!-- Perspective floor -->
        <path d="M14 278 L170 216 L326 278
                 L326 345 H14 Z"
          fill="url(#w01introFloor)"/>

        ${path("M170 216 V345",C.navy,1,
          'opacity=".15"')}
        ${path("M90 249 L57 345",C.navy,1,
          'opacity=".13"')}
        ${path("M250 249 L283 345",C.navy,1,
          'opacity=".13"')}

        <!-- Reception desk -->
        <g class="intro-desk vls-moving"
          filter="url(#w01introShadow)">

          ${rect(117,164,106,19,C.orange,4)}
          ${rect(123,183,94,52,C.navy,5)}

          ${rect(147,151,46,30,C.blue,4,
            'stroke="#1f4e79" stroke-width="2"')}

          ${path("M155 160 H185 M155 167 H176",
            C.navy,2)}

          <g class="intro-screen-error vls-moving"
             opacity="0">
            ${rect(147,151,46,30,C.orange,4)}
            ${txt(170,172,"!",23,C.white)}
          </g>

          <g class="intro-screen-ok vls-moving"
             opacity="0">
            ${rect(147,151,46,30,C.green,4)}
            ${check(170,166,C.white,3)}
          </g>
        </g>

        <!-- Reception employee -->
        <g class="intro-reception vls-moving">
          ${person(170,142,C.green,.85)}
        </g>

        <!-- Traveller and luggage -->
        <g class="intro-guest vls-moving">
          ${person(70,279,C.navy,1.18)}

          ${rect(85,279,18,25,C.orange,3)}
          ${path("M89 279 V274 Q94 267 99 274 V279",
            C.orange,2)}
          ${circle(91,307,3,C.ink)}
          ${circle(99,307,3,C.ink)}
        </g>

        <!-- Queue barriers -->
        <g class="intro-queue vls-moving">
          ${path("M30 300 V326 M112 280 V307",
            C.navy,3)}
          ${path("M30 300 Q70 282 112 280",
            C.orange,3)}
          ${circle(30,300,5,C.navy)}
          ${circle(112,280,5,C.navy)}
        </g>

        <!-- Department doors -->
        <g class="intro-departments vls-moving"
           opacity="0">

          <g class="intro-door-a vls-moving">
            ${rect(18,126,57,88,C.paper,3,
              'stroke="#1f4e79" stroke-width="3"')}
            ${rect(26,136,41,8,C.blue,2)}
            ${circle(64,179,3,C.orange)}
          </g>

          <g class="intro-door-b vls-moving">
            ${rect(265,126,57,88,C.paper,3,
              'stroke="#1f4e79" stroke-width="3"')}
            ${rect(273,136,41,8,C.blue,2)}
            ${circle(273,179,3,C.orange)}
          </g>

          ${txt(47,119,"BOOKINGS",11,C.navy)}
          ${txt(294,119,"RATES",11,C.navy)}
        </g>

        <!-- Telephone signal -->
        <g class="intro-call vls-moving"
           opacity="0">
          ${path("M196 146 Q237 94 277 142",
            C.orange,3,
            'stroke-dasharray="5 6"')}
          ${circle(238,111,8,C.orange)}
          ${txt(238,115,"?",12,C.white)}
        </g>

        <!-- Guest waiting indicator -->
        <g class="intro-clock vls-moving"
           opacity="0">
          ${circle(72,214,25,C.paper,
            'stroke="#c0502a" stroke-width="3"')}
          ${path("M72 197 V214 L85 221",
            C.orange,3)}
          ${circle(72,214,3,C.orange)}
        </g>

        <!-- Information links -->
        <g class="intro-links vls-moving"
           opacity="0">

          <path class="intro-link-a vls-drawing"
            d="M47 172 Q93 83 170 152"
            fill="none" stroke="#317c61"
            stroke-width="3"
            stroke-dasharray="220"
            stroke-dashoffset="220"/>

          <path class="intro-link-b vls-drawing"
            d="M294 172 Q246 83 170 152"
            fill="none" stroke="#317c61"
            stroke-width="3"
            stroke-dasharray="220"
            stroke-dashoffset="220"/>

          ${circle(170,90,11,C.green)}
          ${check(170,91,C.white,3)}
        </g>

        <!-- End-to-end guest route -->
        <g class="intro-route vls-moving"
           opacity="0">

          <path class="intro-route-line vls-drawing"
            d="M72 316
               Q115 341 170 302
               Q230 267 278 303"
            fill="none"
            stroke="#317c61"
            stroke-width="5"
            stroke-dasharray="350"
            stroke-dashoffset="350"/>

          ${circle(278,303,14,C.green)}
          ${check(278,304,C.white,3)}
        </g>

        <!-- Guest room -->
        <g class="intro-room vls-moving"
           opacity="0">

          ${rect(251,232,58,65,C.paper,4,
            'stroke="#317c61" stroke-width="3"')}

          ${rect(258,267,44,16,C.blue,3)}
          ${rect(261,260,16,9,C.white,2)}
          ${rect(282,260,16,9,C.white,2)}

          ${path("M258 283 V290 M302 283 V290",
            C.green,2)}
        </g>

      </g>

      <!-- Moment-specific visual emphasis -->
      <g class="vls-spark">
        ${circle(170,73,5,C.orange,
          'opacity=".45"')}
      </g>

      <g class="intro-outcome vls-moving"
         opacity="0">
        ${circle(170,62,22,C.green,
          'opacity=".14"')}
        ${check(170,64,C.green,5)}
      </g>

      <text class="vls-caption intro-caption"
        x="170" y="365"
        text-anchor="middle">
        WELCOME TO QASR
      </text>

      ${rect(20,381,300,3,C.blue,1)}
      <rect class="vls-progress"
        x="20" y="381"
        width="0" height="3"
        rx="1.5" fill="${C.orange}"/>
    `;

    const cuts = [
      2, 4, 7, 10, 13, 17, 23
    ];

    function apply(i, n, instant = false) {
      if (!root) return;

      const m = moment(i, n);
      const b = beat(m.i, cuts);

      renderState(root, () => {

        text(root, ".intro-caption", labels[b]);

        // The camera approaches the reception problem,
        // then opens to reveal the whole customer journey.
        const zoom = [
          1, 1.035, 1.10, 1.06,
          1.13, 1.025, .97, 1
        ][b];

        const desk = one(root, ".intro-desk");

        if (desk) {
          desk.style.transform =
            `translateY(${b === 2 ? 5 : 0}px)
             scale(${b === 2 ? 1.05 : 1})`;
        }

        const guestX = [
          0, 30, 57, 65,
          65, 74, 97, 171
        ][b];

        const guestY = [
          0, -10, -20, -20,
          -20, -16, -9, -19
        ][b];

        move(
          root,
          ".intro-guest",
          guestX + Math.sin(m.i * .85) * 2,
          guestY
        );

        visible(
          root,
          ".intro-screen-error",
          b >= 2 && b <= 5
        );

        visible(
          root,
          ".intro-screen-ok",
          b >= 6
        );

        visible(
          root,
          ".intro-departments",
          b >= 3
        );

        visible(
          root,
          ".intro-call",
          b >= 3 && b <= 5
        );

        visible(
          root,
          ".intro-clock",
          b >= 4 && b <= 5
        );

        visible(
          root,
          ".intro-links",
          b >= 5
        );

        visible(
          root,
          ".intro-route",
          b >= 6
        );

        visible(
          root,
          ".intro-room",
          b >= 6
        );

        visible(
          root,
          ".intro-outcome",
          b === 7
        );

        draw(
          root,
          ".intro-link-a",
          b >= 5 ? 0 : 220
        );

        draw(
          root,
          ".intro-link-b",
          b >= 6 ? 0 : 220
        );

        draw(
          root,
          ".intro-route-line",
          b >= 7 ? 0 : b === 6 ? 125 : 350
        );

        // Department doors react independently.
        move(
          root,
          ".intro-door-a",
          b >= 3 ? -4 - (m.i % 3) * 2 : 0,
          0
        );

        move(
          root,
          ".intro-door-b",
          b >= 3 ? 4 + (m.i % 3) * 2 : 0,
          0
        );

        // The waiting clock advances with narration.
        rotate(
          root,
          ".intro-clock",
          b === 4
            ? m.i * 11
            : b === 5 ? m.i * 6 : 0
        );

        style(root, ".intro-queue", {
          opacity: b >= 6 ? .15 : 1
        });

        style(root, ".intro-reception", {
          transform:
            `translateY(${Math.sin(m.i * .75) * 2}px)`
        });

        // A secondary change on every moment.
        microMotion(root, m.i, m.n, "track");

        // Override the common camera with a cinematic
        // scale plus a small line-by-line tracking motion.
        const camera = one(root, ".vls-camera");

        if (camera) {
          const dx = Math.sin(m.i * .9) * 2.5;

          camera.style.transform =
            `translate(${dx}px,0px) scale(${zoom})`;
          camera.style.transformOrigin = "170px 195px";
        }

      }, instant);
    }

    REG.W1INTRO = {
      build(el) {
        stopTweens(root);

        root = mount(
          el,
          "W1INTRO",
          body,
          "A hotel guest arrives, encounters disconnected departments, and finally follows a connected check-in journey"
        );

        this.reset();
      },

      step(i, n) {
        apply(i, n);
      },

      reset() {
        stopTweens(root);
        apply(0, 28, true);
      }
    };
  }

  // ==========================================================
  // SCENE 02 · O1a
  // THE GUEST'S JOURNEY
  //
  // Original visual concept:
  // A physical cutaway of a multi-floor hotel.
  //
  // The guest starts at reception. Different hotel rooms
  // and offices illuminate as the booking, rate, and room
  // readiness are verified.
  //
  // A glowing service token travels through the building.
  // The hotel eventually opens to reveal the correct room.
  //
  // The critical teaching distinction:
  // Handing over a key is not the same as delivering the
  // customer's completed outcome.
  //
  // Animation:
  // Elevator movement, illuminated offices, travelling
  // information token, handoff beams, room doors, and
  // the final customer arrival.
  //
  // Narration: 34 moments.
  // ==========================================================

  {
    let root = null;

    const labels = [
      "THE HOTEL JOURNEY",
      "SEPARATE DEPARTMENTS",
      "THE CHECK-IN TRIGGER",
      "WORK BEGINS",
      "CROSSING FUNCTIONS",
      "THE KEY IS NOT ENOUGH",
      "THE CORRECT ROOM",
      "CUSTOMER VALUE"
    ];

    const cuts = [
      3, 7, 14, 18, 22, 27, 31
    ];

    const body = `
      <defs>
        <linearGradient id="w01o1aGlass"
          x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#edf4f7"/>
          <stop offset="1" stop-color="#dbe7f2"/>
        </linearGradient>

        <filter id="w01o1aShadow"
          x="-30%" y="-30%"
          width="160%" height="160%">
          <feDropShadow dx="0" dy="5"
            stdDeviation="6"
            flood-color="#1f4e79"
            flood-opacity=".15"/>
        </filter>
      </defs>

      ${txt(170,24,"INSIDE QASR MARINA",
        13,C.navy,'letter-spacing="1.5"')}

      <g class="vls-light">
        ${circle(170,190,145,C.blue,
          'opacity=".22"')}
      </g>

      <g class="vls-camera">

        <!-- The hotel is a real architectural cutaway -->
        <g filter="url(#w01o1aShadow)">

          ${rect(46,55,248,267,C.paper,7,
            'stroke="#1f4e79" stroke-width="3"')}

          ${rect(46,55,248,22,C.navy,4)}

          ${txt(170,71,"QASR MARINA",12,C.white)}

          <!-- Structural floors -->
          ${path(
            "M46 137 H294 M46 197 H294 M46 257 H294",
            C.navy,3,
            'opacity=".45"'
          )}

          <!-- Central elevator shaft -->
          ${rect(148,78,44,243,C.blue,2,
            'stroke="#8ba9bf" stroke-width="2"')}

          ${path("M170 79 V320",C.navy,1,
            'stroke-dasharray="5 7" opacity=".25"')}

          <!-- Reservation office -->
          <g class="o1a-booking vls-moving">
            ${rect(57,88,81,39,C.blue,5)}
            ${rect(72,96,27,20,C.paper,3)}
            ${path("M77 102 H94 M77 108 H91",
              C.navy,2)}
            ${txt(97,132,"BOOKING",10,C.navy)}
          </g>

          <!-- Revenue office -->
          <g class="o1a-revenue vls-moving">
            ${rect(202,88,81,39,C.blue,5)}
            ${circle(242,106,14,C.paper)}
            ${txt(242,111,"$",16,C.orange)}
            ${txt(242,132,"RATE",10,C.navy)}
          </g>

          <!-- Housekeeping -->
          <g class="o1a-housekeeping vls-moving">
            ${rect(57,148,81,39,C.blue,5)}
            ${rect(70,166,55,13,C.paper,3)}
            ${rect(75,160,20,8,C.white,2)}
            ${rect(99,160,20,8,C.white,2)}
            ${txt(97,192,"ROOM STATUS",10,C.navy)}
          </g>

          <!-- Guest room -->
          <g class="o1a-room vls-moving">
            ${rect(202,147,81,43,C.blue,5)}

            <g class="o1a-room-door vls-moving">
              ${rect(223,150,39,38,C.paper,2,
                'stroke="#1f4e79" stroke-width="2"')}
              ${circle(254,170,2,C.orange)}
            </g>

            <g class="o1a-room-ready vls-moving"
               opacity="0">
              ${rect(209,169,67,14,C.green,3)}
              ${rect(213,162,25,10,C.white,2)}
              ${rect(244,162,25,10,C.white,2)}
              ${check(242,155,C.green,3)}
            </g>

            ${txt(242,192,"GUEST ROOM",10,C.navy)}
          </g>

          <!-- Front desk -->
          <g class="o1a-desk vls-moving">
            ${rect(57,268,81,43,C.blue,5)}
            ${rect(68,282,59,9,C.orange,3)}
            ${rect(72,291,51,15,C.navy,2)}
            ${person(97,277,C.green,.55)}
            ${txt(97,316,"RECEPTION",10,C.navy)}
          </g>

          <!-- Hotel entrance -->
          ${rect(202,268,81,43,C.blue,5)}

          <g class="o1a-entrance vls-moving">
            ${path("M242 269 V310",C.navy,2)}
            ${path("M207 269 H278",C.navy,2)}
            ${path("M208 308 H278",C.navy,2)}
          </g>

          ${txt(242,316,"ARRIVAL",10,C.navy)}
        </g>

        <!-- Moving elevator -->
        <g class="o1a-elevator vls-moving">
          ${rect(153,271,34,42,C.navy,4)}
          ${rect(157,276,26,31,C.paper,2)}
          ${path("M170 276 V307",C.navy,1)}
        </g>

        <!-- Guest, initially at arrival -->
        <g class="o1a-guest vls-moving">
          ${person(242,293,C.orange,.85)}
        </g>

        <!-- Service token -->
        <g class="o1a-token vls-moving"
           opacity="0">
          ${circle(97,280,12,C.orange)}
          ${circle(97,280,5,C.white)}
        </g>

        <!-- Handoff network -->
        <g class="o1a-network vls-moving"
           opacity="0">

          <path class="o1a-link-1 vls-drawing"
            d="M97 280 Q96 210 97 107"
            fill="none" stroke="#317c61"
            stroke-width="3"
            stroke-dasharray="250"
            stroke-dashoffset="250"/>

          <path class="o1a-link-2 vls-drawing"
            d="M97 107 H242"
            fill="none" stroke="#317c61"
            stroke-width="3"
            stroke-dasharray="170"
            stroke-dashoffset="170"/>

          <path class="o1a-link-3 vls-drawing"
            d="M242 107 Q310 150 97 167"
            fill="none" stroke="#317c61"
            stroke-width="3"
            stroke-dasharray="330"
            stroke-dashoffset="330"/>

          <path class="o1a-link-4 vls-drawing"
            d="M97 167 Q170 213 242 168"
            fill="none" stroke="#317c61"
            stroke-width="3"
            stroke-dasharray="210"
            stroke-dashoffset="210"/>
        </g>

        <!-- Trigger pulse -->
        <g class="o1a-trigger vls-moving"
           opacity="0">
          ${circle(242,293,23,"none",
            'stroke="#c0502a" stroke-width="3"')}
          ${circle(242,293,33,"none",
            'stroke="#c0502a" stroke-width="1.5" opacity=".4"')}
        </g>

        <!-- The key is not the end state -->
        <g class="o1a-key vls-moving"
           opacity="0">
          ${circle(242,229,13,C.orange)}
          ${circle(242,229,5,C.paper)}
          ${path("M253 229 H274 V235 H280",
            C.orange,5)}
        </g>

        <!-- Wrong completion -->
        <g class="o1a-failure vls-moving"
           opacity="0">
          ${circle(242,168,24,C.paper,
            'stroke="#c0502a" stroke-width="3"')}
          ${path("M231 157 L253 179 M253 157 L231 179",
            C.orange,5)}
        </g>

        <!-- Successful completed process -->
        <g class="o1a-success vls-moving"
           opacity="0">
          ${circle(242,168,29,C.paper,
            'stroke="#317c61" stroke-width="3"')}
          ${check(242,168,C.green,6)}
        </g>

      </g>

      <!-- Value boundary -->
      <g class="o1a-boundary vls-moving"
         opacity="0">

        <path class="o1a-boundary-line vls-drawing"
          d="M29 333 V45 H311 V333"
          fill="none"
          stroke="#317c61"
          stroke-width="2.5"
          stroke-dasharray="900"
          stroke-dashoffset="900"/>

        ${txt(170,44,"ONE COMPLETE PROCESS",
          11,C.green)}
      </g>

      <g class="vls-spark">
        ${circle(170,39,4,C.orange)}
      </g>

      <text class="vls-caption o1a-caption"
        x="170" y="365"
        text-anchor="middle">
        THE HOTEL JOURNEY
      </text>

      ${rect(20,381,300,3,C.blue,1)}
      <rect class="vls-progress"
        x="20" y="381"
        width="0" height="3"
        rx="1.5" fill="${C.orange}"/>
    `;

    function apply(i, n, instant = false) {
      if (!root) return;

      const m = moment(i, n);
      const b = beat(m.i, cuts);

      renderState(root, () => {

        text(root, ".o1a-caption", labels[b]);

        // Each department illuminates as the guest's
        // information travels through the building.
        const bookingOn = b >= 1;
        const revenueOn = b >= 3;
        const housekeepingOn = b >= 4;

        style(root, ".o1a-booking", {
          opacity: bookingOn ? 1 : .45
        });

        style(root, ".o1a-revenue", {
          opacity: revenueOn ? 1 : .45
        });

        style(root, ".o1a-housekeeping", {
          opacity: housekeepingOn ? 1 : .45
        });

        style(root, ".o1a-room", {
          opacity: b >= 5 ? 1 : .55
        });

        // Guest moves from arrival to reception and,
        // eventually, toward the correct room.
        const positions = [
          [0,0],
          [-115,0],
          [-115,0],
          [-115,-5],
          [-115,-5],
          [-65,-15],
          [0,-123],
          [0,-123]
        ];

        const p = positions[b];

        move(
          root,
          ".o1a-guest",
          p[0] + Math.sin(m.i * .8) * 2,
          p[1]
        );

        // The elevator rises as work advances.
        const elevatorY = [
          0,0,0,-65,-125,-125,-125,-125
        ][b];

        move(
          root,
          ".o1a-elevator",
          0,
          elevatorY - (m.i % 3) * 1.4
        );

        visible(root, ".o1a-trigger", b === 2);

        visible(root, ".o1a-token", b >= 3 && b <= 5);

        visible(root, ".o1a-network", b >= 3);

        draw(
          root,
          ".o1a-link-1",
          b >= 3 ? 0 : 250
        );

        draw(
          root,
          ".o1a-link-2",
          b >= 4 ? 0 : 170
        );

        draw(
          root,
          ".o1a-link-3",
          b >= 4 ? 0 : 330
        );

        draw(
          root,
          ".o1a-link-4",
          b >= 6 ? 0 : 210
        );

        // The information token moves between actual
        // department locations, not abstract boxes.
        const tokenPositions = [
          [0,0],
          [0,0],
          [0,0],
          [0,-173],
          [145,-173],
          [0,-113],
          [145,-112],
          [145,-112]
        ];

        const tp = tokenPositions[b];

        move(
          root,
          ".o1a-token",
          tp[0] + Math.sin(m.i * 1.4) * 3,
          tp[1]
        );

        // Receiving a key can still leave the room
        // unavailable. Show the failure before resolution.
        visible(
          root,
          ".o1a-key",
          b === 5
        );

        visible(
          root,
          ".o1a-failure",
          b === 5
        );

        visible(
          root,
          ".o1a-room-ready",
          b >= 6
        );

        visible(
          root,
          ".o1a-success",
          b === 7
        );

        // The room door physically opens at completion.
        style(root, ".o1a-room-door", {
          transform:
            b >= 6
              ? "translateX(15px) scaleX(.35)"
              : "translateX(0px) scaleX(1)",
          transformOrigin: "223px 170px"
        });

        visible(
          root,
          ".o1a-boundary",
          b >= 6
        );

        draw(
          root,
          ".o1a-boundary-line",
          b >= 6 ? 0 : 900
        );

        // Moment-level illumination of the active floor.
        const floor = m.i % 4;

        const targets = [
          ".o1a-booking",
          ".o1a-revenue",
          ".o1a-housekeeping",
          ".o1a-desk"
        ];

        const activeTarget = one(root, targets[floor]);

        if (activeTarget) {
          activeTarget.style.filter =
            `drop-shadow(0 0 ${
              3 + (m.i % 3) * 2
            }px rgba(49,124,97,.28))`;
        }

        targets.forEach((selector, j) => {
          if (j !== floor) {
            const el = one(root, selector);
            if (el) el.style.filter = "none";
          }
        });

        // The building breathes subtly while the narrator
        // continues within the same conceptual sequence.
        microMotion(root, m.i, m.n, "rise");

      }, instant);
    }

    REG.O1a = {
      build(el) {
        stopTweens(root);

        root = mount(
          el,
          "O1a",
          body,
          "Cutaway hotel showing the check-in trigger, booking verification, rate confirmation, housekeeping, and the guest reaching a ready room"
        );

        this.reset();
      },

      step(i, n) {
        apply(i, n);
      },

      reset() {
        stopTweens(root);
        apply(0, 34, true);
      }
    };
  }

  // CONTINUES IN PART 2
  // Next: O1b and O2a
  // ==========================================================
  // SCENE 03 · O1b
  // THE CINEMATIC ZOOM LENS
  //
  // Original visual concept:
  // A large optical instrument examines the same hotel
  // operation at five progressively finer magnifications.
  //
  // Value chain: the whole hospitality landscape.
  // Process: the complete guest arrival.
  // Sub-process: booking verification.
  // Activity: rate and guarantee checking.
  // Task: opening the corporate portal.
  //
  // The lens then becomes a movable process boundary.
  // Starting too late excludes the queue.
  // Ending too early excludes the unready room.
  //
  // Unlike O1a, this is not a hotel cutaway.
  // The visual grammar is optical: concentric lenses,
  // magnification, moving aperture blades, and
  // adjustable start/end boundary markers.
  //
  // Narration: 31 moments.
  // ==========================================================

  {
    let root = null;

    const labels = [
      "CHOOSE THE LEVEL",
      "VALUE CHAIN",
      "CHECK-IN PROCESS",
      "BOOKING VERIFICATION",
      "RATE AND GUARANTEE",
      "ONE PORTAL TASK",
      "FIVE NESTED LEVELS",
      "SET THE BOUNDARY",
      "START TOO LATE",
      "END TOO EARLY",
      "CUSTOMER-CENTRED SCOPE"
    ];

    const cuts = [
      5, 7, 9, 11, 13, 15, 18, 21, 24, 27
    ];

    const levels = [
      { name: "VALUE CHAIN", sub: "SERVE THE GUEST" },
      { name: "PROCESS", sub: "CHECK A GUEST IN" },
      { name: "SUB-PROCESS", sub: "VERIFY THE BOOKING" },
      { name: "ACTIVITY", sub: "CHECK RATE AND GUARANTEE" },
      { name: "TASK", sub: "OPEN THE PORTAL" }
    ];

    const lensRings = [128, 105, 82, 59, 37];

    const ringMarkup = lensRings.map((r, j) => `
      <circle class="o1b-ring o1b-ring-${j} vls-moving"
        cx="170" cy="173" r="${r}"
        fill="none"
        stroke="${j % 2 ? C.orange : C.navy}"
        stroke-width="${j === 4 ? 3 : 2}"
        stroke-dasharray="${j % 2 ? "6 8" : "none"}"
        opacity=".35"/>
    `).join("");

    const body = `
      <defs>
        <radialGradient id="w01o1bGlass">
          <stop stop-color="#ffffff"/>
          <stop offset=".72" stop-color="#dbe7f2"/>
          <stop offset="1" stop-color="#8ba9bf"/>
        </radialGradient>
        <clipPath id="w01o1bLensClip">
          <circle cx="170" cy="173" r="119"/>
        </clipPath>
      </defs>

      ${txt(170,25,"THE MAGNIFICATION LAB",13,C.navy,
        'letter-spacing="1.5"')}

      <g class="vls-light">
        ${circle(170,173,151,C.blue,'opacity=".3"')}
      </g>

      <g class="vls-camera">

        <!-- Physical optical housing -->
        ${circle(170,173,143,C.paper,
          `stroke="${C.navy}" stroke-width="9"`)}
        ${circle(170,173,132,C.blue,
          `stroke="${C.muted}" stroke-width="2"`)}
        ${circle(170,173,121,
          "url(#w01o1bGlass)")}

        ${ringMarkup}

        <!-- Lens contents change by magnification -->
        <g clip-path="url(#w01o1bLensClip)">

          <!-- Broad landscape -->
          <g class="o1b-landscape vls-moving">
            ${path("M35 239 Q95 170 153 221 T305 212",
              C.green,5)}
            ${path("M35 252 Q105 194 170 244 T305 225",
              C.navy,2,'opacity=".25"')}

            ${[64,113,165,216,268].map((x,j) => `
              ${rect(x-15,148+(j%2)*15,30,47,C.blue,3,
                `stroke="${C.navy}" stroke-width="2"`)}
              ${rect(x-9,158+(j%2)*15,7,9,C.paper,1)}
              ${rect(x+3,158+(j%2)*15,7,9,C.paper,1)}
              ${rect(x-9,173+(j%2)*15,7,9,C.paper,1)}
              ${rect(x+3,173+(j%2)*15,7,9,C.paper,1)}
            `).join("")}
          </g>

          <!-- Complete check-in journey -->
          <g class="o1b-process vls-moving" opacity="0">
            ${path("M65 185 H275",C.green,5)}
            ${[76,124,172,220,268].map((x,j) => `
              ${circle(x,185,13,
                j===4?C.green:C.navy)}
              ${txt(x,190,String(j+1),12,C.white)}
            `).join("")}
            ${txt(170,220,"GUEST JOURNEY",12,C.navy)}
          </g>

          <!-- Booking verification -->
          <g class="o1b-booking vls-moving" opacity="0">
            ${rect(116,117,108,117,C.paper,10,
              `stroke="${C.navy}" stroke-width="3"`)}
            ${rect(128,132,84,11,C.blue,3)}
            ${path("M133 161 H205 M133 176 H197 M133 191 H203",
              C.navy,3)}
            ${circle(170,216,10,C.orange)}
          </g>

          <!-- Activity: rate and guarantee -->
          <g class="o1b-activity vls-moving" opacity="0">
            ${circle(170,170,64,C.paper,
              `stroke="${C.orange}" stroke-width="3"`)}
            ${txt(170,159,"RATE",17,C.navy)}
            ${path("M130 174 H210",C.blue,3)}
            ${txt(170,193,"GUARANTEE",13,C.orange)}
            ${check(170,214,C.green,4)}
          </g>

          <!-- Task: a single portal action -->
          <g class="o1b-task vls-moving" opacity="0">
            ${rect(115,121,110,88,C.navy,9)}
            ${rect(122,130,96,59,C.paper,4)}
            ${rect(131,141,78,10,C.blue,2)}
            ${rect(144,160,52,19,C.green,5)}
            ${txt(170,174,"OPEN",12,C.white)}
            ${path("M170 211 V232",C.navy,5)}
            ${path("M146 232 H194",C.navy,5)}
          </g>
        </g>

        <!-- Aperture blades -->
        <g class="o1b-aperture vls-moving" opacity="0">
          ${Array.from({length:8},(_,j) => `
            <path d="M170 173 L110 55 L230 55 Z"
              fill="${j%2?C.blue:C.paper}"
              stroke="${C.navy}" stroke-width="1"
              opacity=".55"
              transform="rotate(${j*45} 170 173)"/>
          `).join("")}
        </g>

        <!-- Magnification handle -->
        <g class="o1b-handle vls-moving">
          ${path("M270 272 L309 318",C.navy,16)}
          ${path("M273 275 L306 313",C.orange,5)}
        </g>

        <!-- Boundary mechanism -->
        <g class="o1b-boundary vls-moving" opacity="0">
          ${path("M35 312 H305",C.navy,3)}
          ${[53,111,170,229,287].map(x =>
            circle(x,312,6,C.blue,
              `stroke="${C.navy}" stroke-width="2"`)
          ).join("")}

          <g class="o1b-start vls-moving">
            ${path("M53 286 V338",C.green,5)}
            ${txt(53,277,"START",11,C.green)}
          </g>

          <g class="o1b-end vls-moving">
            ${path("M287 286 V338",C.orange,5)}
            ${txt(287,277,"END",11,C.orange)}
          </g>

          <path class="o1b-scope vls-drawing"
            d="M53 345 H287"
            stroke="${C.green}" stroke-width="5"
            stroke-dasharray="240"
            stroke-dashoffset="240"/>
        </g>

        <g class="o1b-queue vls-moving" opacity="0">
          ${person(51,256,C.orange,.6)}
          ${person(75,256,C.navy,.6)}
          ${person(99,256,C.navy,.6)}
        </g>

        <g class="o1b-unready vls-moving" opacity="0">
          ${rect(248,238,43,47,C.paper,3,
            `stroke="${C.orange}" stroke-width="3"`)}
          ${path("M257 247 L282 274 M282 247 L257 274",
            C.orange,3)}
        </g>

      </g>

      <g class="vls-spark">
        ${circle(170,43,5,C.orange)}
      </g>

      <text class="vls-caption o1b-caption"
        x="170" y="365" text-anchor="middle">
        CHOOSE THE LEVEL
      </text>

      ${rect(20,381,300,3,C.blue,1)}
      <rect class="vls-progress"
        x="20" y="381" width="0" height="3"
        rx="1.5" fill="${C.orange}"/>
    `;

    function apply(i,n,instant=false) {
      if (!root) return;
      const m = moment(i,n);
      const b = beat(m.i,cuts);

      renderState(root,() => {
        text(root,".o1b-caption",labels[b]);

        const selected =
          b >= 1 && b <= 5 ? b-1 :
          b === 6 ? 4 : 0;

        const selectors = [
          ".o1b-landscape",
          ".o1b-process",
          ".o1b-booking",
          ".o1b-activity",
          ".o1b-task"
        ];

        selectors.forEach((selector,j) => {
          visible(root,selector,
            b <= 6 && (j === selected || b === 6));
          style(root,selector,{
            transform: b === 6
              ? `scale(${.55+j*.09})`
              : `scale(${j===selected?1:.72})`,
            transformOrigin:"170px 173px"
          });
        });

        lensRings.forEach((_,j) => {
          const active =
            b === 6 || (b>=1 && b<=5 && j===selected);
          style(root,`.o1b-ring-${j}`,{
            opacity:active?1:.15,
            strokeWidth:active?5:2,
            transform:`rotate(${m.i*(j%2?-2:2)}deg)`,
            transformOrigin:"170px 173px"
          });
        });

        visible(root,".o1b-aperture",b===0);
        rotate(root,".o1b-aperture",m.i*9);

        visible(root,".o1b-boundary",b>=7);
        visible(root,".o1b-queue",b===8);
        visible(root,".o1b-unready",b===9);

        // Starting too late excludes the queue.
        move(root,".o1b-start",
          b===8?58:0,0);

        // Ending at the key excludes the ready room.
        move(root,".o1b-end",
          b===9?-58:0,0);

        draw(root,".o1b-scope",
          b===10?0:b===9?75:b===8?85:240);

        // Lens handle turns with each narration moment.
        rotate(root,".o1b-handle",
          Math.sin(m.i*.72)*5);

        microMotion(root,m.i,m.n,"drift");
      },instant);
    }

    REG.O1b = {
      build(el) {
        stopTweens(root);
        root = mount(el,"O1b",body,
          "A magnifying lens moves through five levels of process detail before revealing boundaries that can exclude the customer's queue or unfinished room");
        this.reset();
      },
      step(i,n) { apply(i,n); },
      reset() {
        stopTweens(root);
        apply(0,31,true);
      }
    };
  }

  // ==========================================================
  // SCENE 04 · O2a
  // NINE DEPARTMENTS, ONE FRAGMENTED HOTEL
  //
  // Original visual concept:
  // A tall hotel tower divided into nine illuminated
  // departmental compartments.
  //
  // Every department has a green performance indicator,
  // yet the traveller's journey through the building is
  // obstructed by disconnected systems.
  //
  // A second, horizontal route eventually cuts across
  // the tower, revealing the difference between
  // vertical management and horizontal customer flow.
  //
  // The guest's 23-minute desk interaction, repeated
  // passport request, unready room, and 4/10 feedback
  // are revealed as consequences of fragmentation.
  //
  // Animation:
  // Department lights, moving guest, disconnected
  // information signals, falling performance stamps,
  // rotating tower perspective, and horizontal journey.
  //
  // Narration: 30 moments.
  // ==========================================================

  {
    let root = null;

    const labels = [
      "ONE GUEST",
      "SCATTERED INFORMATION",
      "THE WAIT GROWS",
      "THE ROOM IS NOT READY",
      "EVERY TARGET PASSES",
      "VERTICAL MANAGEMENT",
      "HORIZONTAL JOURNEY",
      "ONE FAILED EXPERIENCE"
    ];

    const cuts = [3,8,12,16,22,24,27];

    const departmentNames = [
      "RESERVATIONS",
      "REVENUE",
      "HOUSEKEEPING",
      "FINANCE",
      "FRONT DESK",
      "SALES",
      "OPERATIONS",
      "IT",
      "GUEST SERVICE"
    ];

    const departmentMarkup =
      departmentNames.map((name,j) => {
        const col = j%3;
        const row = Math.floor(j/3);
        const x = 39+col*89;
        const y = 76+row*78;

        return `
          <g class="o2a-dept o2a-dept-${j} vls-moving">
            ${rect(x,y,82,69,C.paper,6,
              `stroke="${C.navy}" stroke-width="2"`)}
            ${rect(x+5,y+5,72,42,C.blue,3)}
            ${txt(x+41,y+60,name,9,C.navy)}
            ${circle(x+67,y+16,6,C.green)}
            ${check(x+67,y+16,C.white,2)}
          </g>
        `;
      }).join("");

    const body = `
      <defs>
        <linearGradient id="w01o2aTower"
          x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#dbe7f2"/>
          <stop offset="1" stop-color="#fbf8f1"/>
        </linearGradient>
      </defs>

      ${txt(170,24,"THE FRAGMENTED HOTEL",
        13,C.navy,'letter-spacing="1.4"')}

      <g class="vls-light">
        ${circle(170,178,150,C.blue,'opacity=".25"')}
      </g>

      <g class="vls-camera">

        <!-- The nine-compartment tower -->
        <g class="o2a-tower vls-moving">
          ${rect(29,63,282,252,
            "url(#w01o2aTower)",9,
            `stroke="${C.navy}" stroke-width="3"`)}

          ${departmentMarkup}

          ${path("M29 149 H311 M29 227 H311",
            C.navy,2,'opacity=".3"')}
        </g>

        <!-- Disconnected departmental signals -->
        <g class="o2a-signals vls-moving" opacity="0">
          ${[0,1,2,3].map(j => `
            <path class="o2a-signal-${j} vls-drawing"
              d="M${80+j*48} ${104+j*28}
                 q${j%2?35:-35} 25
                 ${j%2?-12:12} 58"
              fill="none"
              stroke="${C.orange}"
              stroke-width="3"
              stroke-dasharray="160"
              stroke-dashoffset="160"/>
          `).join("")}
        </g>

        <!-- Guest waiting outside the system -->
        <g class="o2a-guest vls-moving">
          ${person(50,335,C.orange,.85)}
          ${rect(64,330,13,20,C.orange,3)}
        </g>

        <!-- Growing waiting clock -->
        <g class="o2a-clock vls-moving" opacity="0">
          ${circle(170,180,64,C.paper,
            `stroke="${C.orange}" stroke-width="5"`)}
          ${circle(170,180,52,"none",
            `stroke="${C.blue}" stroke-width="7"`)}
          ${path("M170 143 V180 L196 196",
            C.navy,5)}
          ${circle(170,180,6,C.orange)}
          ${txt(170,222,"23 MIN",16,C.orange)}
        </g>

        <!-- Repeated passport -->
        <g class="o2a-passports vls-moving" opacity="0">
          ${rect(94,149,49,65,C.navy,5)}
          ${rect(197,149,49,65,C.navy,5)}
          ${circle(118,175,11,C.paper)}
          ${circle(221,175,11,C.paper)}
          ${path("M104 195 H132 M207 195 H235",
            C.paper,2)}
          ${txt(170,184,"×2",22,C.orange)}
        </g>

        <!-- Unready room -->
        <g class="o2a-unready vls-moving" opacity="0">
          ${rect(127,137,86,96,C.paper,6,
            `stroke="${C.orange}" stroke-width="4"`)}
          ${rect(144,175,52,22,C.blue,3)}
          ${path("M149 155 L191 211 M191 155 L149 211",
            C.orange,5)}
        </g>

        <!-- Department success stamps -->
        <g class="o2a-targets vls-moving" opacity="0">
          ${[0,1,2].map((j) => {
            const x = 82+j*88;
            return `
              ${circle(x,175,33,C.paper,
                `stroke="${C.green}" stroke-width="4"`)}
              ${check(x,173,C.green,5)}
            `;
          }).join("")}
          ${txt(170,237,"TARGETS MET",14,C.green)}
        </g>

        <!-- Vertical reporting -->
        <g class="o2a-vertical vls-moving" opacity="0">
          ${[82,170,258].map(x =>
            arrow(x,279,x,95,C.navy,4)
          ).join("")}
          ${txt(170,322,"VERTICAL REPORTING",12,C.navy)}
        </g>

        <!-- Horizontal guest journey -->
        <g class="o2a-horizontal vls-moving" opacity="0">
          <path class="o2a-journey vls-drawing"
            d="M27 193 H313"
            stroke="${C.orange}" stroke-width="8"
            stroke-dasharray="300"
            stroke-dashoffset="300"/>
          ${circle(29,193,10,C.orange)}
          ${circle(311,193,10,C.green)}
          ${txt(170,324,"CUSTOMER JOURNEY",12,C.orange)}
        </g>

        <!-- Final customer feedback -->
        <g class="o2a-feedback vls-moving" opacity="0">
          ${circle(170,183,69,C.paper,
            `stroke="${C.orange}" stroke-width="5"`)}
          ${txt(170,185,"4/10",37,C.orange)}
          ${txt(170,208,"GUEST RATING",11,C.navy)}
        </g>

      </g>

      <g class="vls-spark">
        ${circle(170,44,5,C.orange)}
      </g>

      <text class="vls-caption o2a-caption"
        x="170" y="365" text-anchor="middle">
        ONE GUEST
      </text>

      ${rect(20,381,300,3,C.blue,1)}
      <rect class="vls-progress"
        x="20" y="381" width="0" height="3"
        rx="1.5" fill="${C.orange}"/>
    `;

    function apply(i,n,instant=false) {
      if (!root) return;
      const m = moment(i,n);
      const b = beat(m.i,cuts);

      renderState(root,() => {
        text(root,".o2a-caption",labels[b]);

        visible(root,".o2a-signals",b>=1&&b<=3);
        visible(root,".o2a-clock",b===2);
        visible(root,".o2a-passports",b===2);
        visible(root,".o2a-unready",b===3);
        visible(root,".o2a-targets",b===4);
        visible(root,".o2a-vertical",b===5);
        visible(root,".o2a-horizontal",b>=6);
        visible(root,".o2a-feedback",b===7);

        // The guest progresses horizontally while
        // departmental structures remain vertical.
        move(root,".o2a-guest",
          b>=6?Math.min(235,(m.i-24)*48):
          b>=2?65:Math.min(60,m.i*11),
          b>=6?-140:0);

        // Illuminate a different compartment on every
        // narration moment.
        const active = m.i%9;

        for(let j=0;j<9;j++) {
          const el = one(root,`.o2a-dept-${j}`);
          if(!el) continue;

          el.style.opacity =
            b===7?.28:j===active?1:.65;

          el.style.transform =
            j===active
              ? "translateY(-4px) scale(1.035)"
              : "translateY(0px) scale(1)";
        }

        for(let j=0;j<4;j++) {
          draw(root,`.o2a-signal-${j}`,
            b>=1?Math.max(0,160-(m.i-j*2)*16):160);
        }

        draw(root,".o2a-journey",
          b>=6?Math.max(0,300-(m.i-24)*110):300);

        // The tower shifts into a vertical perspective
        // before the horizontal process cuts across it.
        style(root,".o2a-tower",{
          transform:
            b===5
              ? "perspective(600px) rotateY(-8deg)"
              : b>=6
              ? "perspective(600px) rotateY(5deg)"
              : "perspective(600px) rotateY(0deg)"
        });

        rotate(root,".o2a-clock",
          b===2?Math.sin(m.i)*3:0);

        microMotion(root,m.i,m.n,"track");
      },instant);
    }

    REG.O2a = {
      build(el) {
        stopTweens(root);
        root = mount(el,"O2a",body,
          "A hotel tower with nine successful departments contrasts with the guest's delayed, incomplete check-in and poor feedback");
        this.reset();
      },
      step(i,n) { apply(i,n); },
      reset() {
        stopTweens(root);
        apply(0,30,true);
      }
    };
  }

  // CONTINUES IN PART 3
  // Next: O2b and O3a
  // ==========================================================
  // SCENE 05 · O2b
  // THE HANDOFF CLOCK
  //
  // Original visual concept:
  // An exposed mechanical clockwork machine.
  //
  // A guest request travels through a sequence of
  // physical transfer mechanisms. Each departmental
  // handoff adds friction, delay, or rework.
  //
  // The machine is initially fragmented: gears turn,
  // but their teeth do not engage. A document repeatedly
  // falls between disconnected mechanisms.
  //
  // The scene then reveals a distinction between
  // local efficiency and end-to-end flow.
  //
  // Unlike O2a's nine-compartment tower, this scene
  // uses kinetic machinery, rotating gears, pendulums,
  // transfer belts, falling documents, and a clock face.
  //
  // Narration: 27 moments.
  // ==========================================================

  {
    let root = null;

    const labels = [
      "THE HANDOFF MACHINE",
      "LOCAL WORK",
      "TRANSFER DELAYS",
      "REPEATED INFORMATION",
      "TWENTY-THREE MINUTES",
      "FIND THE BOTTLENECK",
      "CONNECT THE FLOW",
      "END-TO-END PERFORMANCE"
    ];

    const cuts = [3,6,10,14,18,22,25];

    function gear(x,y,r,teeth,color,cls) {
      const points = [];
      for(let j=0;j<teeth*4;j++) {
        const a = j*Math.PI/(teeth*2)-Math.PI/2;
        const rr = j%4===0||j%4===3?r+7:r;
        points.push(
          `${(x+Math.cos(a)*rr).toFixed(2)},`+
          `${(y+Math.sin(a)*rr).toFixed(2)}`
        );
      }
      return `
        <g class="${cls} vls-moving">
          <polygon points="${points.join(" ")}"
            fill="${color}" stroke="${C.navy}"
            stroke-width="2"/>
          ${circle(x,y,r*.65,C.paper)}
          ${circle(x,y,r*.22,C.navy)}
          ${circle(x,y,r*.09,C.white)}
        </g>
      `;
    }

    const body = `
      <defs>
        <linearGradient id="w01o2bMetal"
          x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#edf4f7"/>
          <stop offset=".5" stop-color="#dbe7f2"/>
          <stop offset="1" stop-color="#8ba9bf"/>
        </linearGradient>
        <filter id="w01o2bShadow"
          x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="4"
            flood-color="#1f4e79" flood-opacity=".18"/>
        </filter>
      </defs>

      ${txt(170,24,"INSIDE THE HANDOFF MACHINE",
        12,C.navy,'letter-spacing="1.2"')}

      <g class="vls-light">
        ${circle(170,180,145,C.blue,'opacity=".22"')}
      </g>

      <g class="vls-camera">

        <!-- Industrial machine housing -->
        ${rect(24,51,292,267,
          "url(#w01o2bMetal)",13,
          `stroke="${C.navy}" stroke-width="3"`)}

        ${[37,303].map(x =>
          [64,305].map(y =>
            circle(x,y,4,C.navy)
          ).join("")
        ).join("")}

        <!-- Three separate working mechanisms -->
        ${gear(83,128,29,10,C.blue,"o2b-gear-a")}
        ${gear(170,128,29,10,C.blue,"o2b-gear-b")}
        ${gear(257,128,29,10,C.blue,"o2b-gear-c")}

        <!-- Initially disengaged couplings -->
        <g class="o2b-couplings vls-moving" opacity="0">
          ${path("M119 128 H134",C.green,7)}
          ${path("M206 128 H221",C.green,7)}
          ${circle(126,128,6,C.green)}
          ${circle(213,128,6,C.green)}
        </g>

        <!-- Conveyor system -->
        ${rect(48,182,244,15,C.navy,7)}
        ${rect(48,199,244,9,C.muted,4)}

        ${[67,106,145,184,223,262].map(x =>
          circle(x,190,5,C.paper)
        ).join("")}

        <!-- Document travels along the belt -->
        <g class="o2b-document vls-moving">
          ${rect(54,155,27,34,C.paper,3,
            `stroke="${C.orange}" stroke-width="2"`)}
          ${path("M60 165 H75 M60 172 H73 M60 179 H70",
            C.navy,1.6)}
        </g>

        <!-- Falling document -->
        <g class="o2b-falling vls-moving" opacity="0">
          ${rect(157,224,27,34,C.paper,3,
            `stroke="${C.orange}" stroke-width="2"`)}
          ${path("M163 234 H178 M163 241 H176",
            C.navy,2)}
        </g>

        <!-- Friction sparks -->
        <g class="o2b-friction vls-moving" opacity="0">
          ${path("M127 174 l-9 -13 M127 174 l9 -13",
            C.orange,4)}
          ${path("M215 174 l-9 -13 M215 174 l9 -13",
            C.orange,4)}
          ${circle(127,174,5,C.orange)}
          ${circle(215,174,5,C.orange)}
        </g>

        <!-- Rework loop -->
        <g class="o2b-rework vls-moving" opacity="0">
          <path class="o2b-loop vls-drawing"
            d="M225 214
               C285 258 280 290 170 290
               C60 290 55 258 108 214"
            fill="none" stroke="${C.orange}"
            stroke-width="4"
            stroke-dasharray="420"
            stroke-dashoffset="420"/>
          ${txt(170,278,"REWORK",12,C.orange)}
        </g>

        <!-- Pendulum clock -->
        <g class="o2b-clock vls-moving">
          ${circle(170,73,21,C.paper,
            `stroke="${C.navy}" stroke-width="3"`)}
          ${path("M170 73 L170 59",C.navy,2)}
          ${path("M170 73 L180 78",C.orange,3)}
          ${circle(170,73,3,C.orange)}
        </g>

        <g class="o2b-pendulum vls-moving">
          ${path("M170 96 V248",C.navy,3,
            'opacity=".45"')}
          ${circle(170,251,15,C.gold)}
        </g>

        <!-- Delay display -->
        <g class="o2b-time vls-moving" opacity="0">
          ${rect(113,215,114,49,C.paper,7,
            `stroke="${C.orange}" stroke-width="3"`)}
          ${txt(170,245,"23 MIN",24,C.orange)}
        </g>

        <!-- Bottleneck constriction -->
        <g class="o2b-bottleneck vls-moving" opacity="0">
          ${path("M145 178 L158 193 L145 208",
            C.orange,5)}
          ${path("M195 178 L182 193 L195 208",
            C.orange,5)}
          ${circle(170,193,8,C.orange)}
        </g>

        <!-- Connected final route -->
        <g class="o2b-flow vls-moving" opacity="0">
          <path class="o2b-flow-line vls-drawing"
            d="M47 192 H293"
            fill="none" stroke="${C.green}"
            stroke-width="6"
            stroke-dasharray="260"
            stroke-dashoffset="260"/>
          ${circle(293,192,11,C.green)}
          ${check(293,192,C.white,3)}
        </g>

      </g>

      <g class="vls-spark">
        ${circle(170,39,5,C.orange)}
      </g>

      <text class="vls-caption o2b-caption"
        x="170" y="365" text-anchor="middle">
        THE HANDOFF MACHINE
      </text>

      ${rect(20,381,300,3,C.blue,1)}
      <rect class="vls-progress"
        x="20" y="381" width="0" height="3"
        rx="1.5" fill="${C.orange}"/>
    `;

    function apply(i,n,instant=false) {
      if(!root) return;
      const m=moment(i,n);
      const b=beat(m.i,cuts);

      renderState(root,() => {
        text(root,".o2b-caption",labels[b]);

        // Each mechanism turns independently until
        // the transfer couplings are introduced.
        rotate(root,".o2b-gear-a",m.i*19);
        rotate(root,".o2b-gear-b",
          b>=6?-m.i*19:m.i*13);
        rotate(root,".o2b-gear-c",
          b>=6?m.i*19:m.i*8);

        [".o2b-gear-a",".o2b-gear-b",
         ".o2b-gear-c"].forEach((selector,j) => {
          const el=one(root,selector);
          if(el) el.style.transformOrigin =
            `${83+j*87}px 128px`;
        });

        visible(root,".o2b-couplings",b>=6);
        visible(root,".o2b-friction",b>=2&&b<=5);
        visible(root,".o2b-falling",b>=2&&b<=4);
        visible(root,".o2b-rework",b>=3&&b<=5);
        visible(root,".o2b-time",b>=4&&b<=5);
        visible(root,".o2b-bottleneck",b===5);
        visible(root,".o2b-flow",b>=6);

        // Document travels, stalls, falls, then moves
        // smoothly after the handoffs are redesigned.
        const x = b>=6
          ? Math.min(207,(m.i-22)*49)
          : b>=2
          ? 88+Math.sin(m.i*.9)*12
          : Math.min(88,m.i*20);

        move(root,".o2b-document",x,0);

        move(root,".o2b-falling",
          Math.sin(m.i*.8)*5,
          b>=2?Math.min(42,(m.i-6)*6):0);

        draw(root,".o2b-loop",
          b>=3?Math.max(0,420-(m.i-10)*45):420);

        draw(root,".o2b-flow-line",
          b>=6?Math.max(0,260-(m.i-22)*70):260);

        // Pendulum reacts on every narration moment.
        rotate(root,".o2b-pendulum",
          Math.sin(m.i*1.5)*13);

        const pendulum=one(root,".o2b-pendulum");
        if(pendulum)
          pendulum.style.transformOrigin="170px 96px";

        rotate(root,".o2b-clock",m.i*8);
        const clock=one(root,".o2b-clock");
        if(clock)
          clock.style.transformOrigin="170px 73px";

        microMotion(root,m.i,m.n,"track");
      },instant);
    }

    REG.O2b = {
      build(el) {
        stopTweens(root);
        root=mount(el,"O2b",body,
          "A mechanical handoff machine shows disconnected departmental gears, delayed documents, rework, a bottleneck, and a connected end-to-end flow");
        this.reset();
      },
      step(i,n) { apply(i,n); },
      reset() {
        stopTweens(root);
        apply(0,27,true);
      }
    };
  }

  // ==========================================================
  // SCENE 06 · O3a
  // THE PROCESS-CENTRED COMMAND BRIDGE
  //
  // Original visual concept:
  // A panoramic operations bridge overlooking a hotel.
  //
  // Initially, each department controls a separate
  // instrument. No one can see the whole guest journey.
  //
  // A process owner then activates a central control
  // surface that connects customer outcomes, measures,
  // decision rights, and cross-functional coordination.
  //
  // The scene is not a dashboard or collection of cards.
  // It is a physical control room with moving levers,
  // rotating instruments, illuminated circuits,
  // sliding partitions, and a panoramic window.
  //
  // Narration: 32 moments.
  // ==========================================================

  {
    let root=null;

    const labels=[
      "THE COMMAND BRIDGE",
      "SEPARATE CONTROLS",
      "ONE PROCESS OWNER",
      "END-TO-END VISIBILITY",
      "DECISION RIGHTS",
      "SHARED MEASURES",
      "COORDINATED RESPONSE",
      "CUSTOMER OUTCOMES"
    ];

    const cuts=[3,7,11,16,21,26,30];

    const body=`
      <defs>
        <linearGradient id="w01o3aWindow"
          x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="#dbe7f2"/>
          <stop offset="1" stop-color="#fbf8f1"/>
        </linearGradient>
        <linearGradient id="w01o3aConsole"
          x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="#315e84"/>
          <stop offset="1" stop-color="#1b2a3a"/>
        </linearGradient>
      </defs>

      ${txt(170,24,"THE PROCESS COMMAND BRIDGE",
        12,C.navy,'letter-spacing="1.1"')}

      <g class="vls-light">
        ${circle(170,180,149,C.blue,'opacity=".2"')}
      </g>

      <g class="vls-camera">

        <!-- Panoramic observation window -->
        ${rect(20,54,300,158,
          "url(#w01o3aWindow)",16,
          `stroke="${C.navy}" stroke-width="6"`)}

        ${path("M120 54 V212 M220 54 V212",
          C.navy,5)}

        <!-- Hotel skyline beyond the bridge -->
        <g class="o3a-skyline vls-moving">
          ${rect(40,123,51,88,C.muted,3)}
          ${rect(102,98,65,113,C.blue,3,
            `stroke="${C.navy}" stroke-width="2"`)}
          ${rect(178,115,55,96,C.muted,3)}
          ${rect(246,132,49,79,C.blue,3)}

          ${[51,66,112,129,145,190,207,258,274].map(x =>
            [145,165,185].map(y =>
              rect(x,y,7,10,C.paper,1)
            ).join("")
          ).join("")}
        </g>

        <!-- Moving guest journey outside -->
        <g class="o3a-guest vls-moving">
          ${person(53,199,C.orange,.55)}
        </g>

        <!-- Control-room floor -->
        <path d="M20 212 H320 L340 345 H0 Z"
          fill="#dbe7f2"/>

        <!-- Three initially separated consoles -->
        <g class="o3a-left-console vls-moving">
          ${rect(24,237,87,74,
            "url(#w01o3aConsole)",9)}
          ${circle(67,264,20,C.paper)}
          ${path("M67 264 L53 254",C.orange,3)}
          ${circle(67,264,4,C.orange)}
          ${rect(39,292,56,6,C.muted,3)}
        </g>

        <g class="o3a-centre-console vls-moving">
          ${rect(126,226,88,90,
            "url(#w01o3aConsole)",9)}
          ${circle(170,258,23,C.paper)}
          ${path("M170 258 L185 246",C.orange,3)}
          ${circle(170,258,4,C.orange)}
          ${rect(142,295,56,6,C.muted,3)}
        </g>

        <g class="o3a-right-console vls-moving">
          ${rect(229,237,87,74,
            "url(#w01o3aConsole)",9)}
          ${circle(273,264,20,C.paper)}
          ${path("M273 264 L260 251",C.orange,3)}
          ${circle(273,264,4,C.orange)}
          ${rect(244,292,56,6,C.muted,3)}
        </g>

        <!-- Physical partitions -->
        <g class="o3a-partitions vls-moving">
          ${rect(112,218,9,105,C.navy,2)}
          ${rect(219,218,9,105,C.navy,2)}
        </g>

        <!-- Process owner at centre -->
        <g class="o3a-owner vls-moving" opacity="0">
          ${person(170,214,C.green,1.05)}
          ${circle(170,176,25,"none",
            `stroke="${C.green}" stroke-width="3"`)}
        </g>

        <!-- Illuminated end-to-end circuit -->
        <g class="o3a-circuit vls-moving" opacity="0">
          <path class="o3a-circuit-line vls-drawing"
            d="M67 264 Q110 204 170 258
               Q230 204 273 264"
            fill="none" stroke="${C.green}"
            stroke-width="5"
            stroke-dasharray="350"
            stroke-dashoffset="350"/>
          ${circle(67,264,7,C.green)}
          ${circle(170,258,7,C.green)}
          ${circle(273,264,7,C.green)}
        </g>

        <!-- Central authority lever -->
        <g class="o3a-lever vls-moving" opacity="0">
          ${rect(157,314,26,15,C.navy,4)}
          ${path("M170 315 L170 273",C.orange,7)}
          ${circle(170,270,12,C.orange)}
        </g>

        <!-- Shared measures represented as physical
             linked gauges, not text-based dashboard cards -->
        <g class="o3a-measures vls-moving" opacity="0">
          ${[73,170,267].map((x,j) => `
            ${circle(x,112,25,C.paper,
              `stroke="${C.green}" stroke-width="3"`)}
            ${path(
              `M${x} 112 L${x+Math.cos(j+1)*17}
               ${112-Math.sin(j+1)*17}`,
              C.green,4
            )}
            ${circle(x,112,4,C.green)}
          `).join("")}
        </g>

        <!-- Coordination beams -->
        <g class="o3a-beams vls-moving" opacity="0">
          <path class="o3a-beam-left vls-drawing"
            d="M170 177 Q120 135 67 112"
            fill="none" stroke="${C.green}"
            stroke-width="3"
            stroke-dasharray="170"
            stroke-dashoffset="170"/>
          <path class="o3a-beam-right vls-drawing"
            d="M170 177 Q220 135 273 112"
            fill="none" stroke="${C.green}"
            stroke-width="3"
            stroke-dasharray="170"
            stroke-dashoffset="170"/>
        </g>

        <!-- Final panoramic outcome -->
        <g class="o3a-outcome vls-moving" opacity="0">
          ${circle(170,117,44,C.paper,
            `stroke="${C.green}" stroke-width="4"`)}
          ${check(170,117,C.green,7)}
          ${txt(170,174,"GUEST READY",12,C.green)}
        </g>

      </g>

      <g class="vls-spark">
        ${circle(170,40,5,C.orange)}
      </g>

      <text class="vls-caption o3a-caption"
        x="170" y="365" text-anchor="middle">
        THE COMMAND BRIDGE
      </text>

      ${rect(20,381,300,3,C.blue,1)}
      <rect class="vls-progress"
        x="20" y="381" width="0" height="3"
        rx="1.5" fill="${C.orange}"/>
    `;

    function apply(i,n,instant=false) {
      if(!root) return;
      const m=moment(i,n);
      const b=beat(m.i,cuts);

      renderState(root,() => {
        text(root,".o3a-caption",labels[b]);

        // Separate controls remain physically divided
        // until a process owner gains authority.
        style(root,".o3a-partitions",{
          opacity:b>=3?0:1,
          transform:b>=3
            ?"translateY(90px)"
            :"translateY(0px)"
        });

        visible(root,".o3a-owner",b>=2);
        visible(root,".o3a-circuit",b>=3);
        visible(root,".o3a-lever",b>=4);
        visible(root,".o3a-measures",b>=5);
        visible(root,".o3a-beams",b>=6);
        visible(root,".o3a-outcome",b===7);

        draw(root,".o3a-circuit-line",
          b>=3?Math.max(0,350-(m.i-11)*55):350);

        draw(root,".o3a-beam-left",
          b>=6?0:170);
        draw(root,".o3a-beam-right",
          b>=6?Math.max(0,170-(m.i-26)*65):170);

        // The owner activates a real control lever.
        rotate(root,".o3a-lever",
          b>=4?-28:0);
        const lever=one(root,".o3a-lever");
        if(lever)
          lever.style.transformOrigin="170px 315px";

        // Each console reacts independently to narration.
        const angles=[
          Math.sin(m.i*.8)*18,
          Math.cos(m.i*.7)*16,
          Math.sin(m.i*.9+1)*20
        ];

        [
          ".o3a-left-console",
          ".o3a-centre-console",
          ".o3a-right-console"
        ].forEach((selector,j) => {
          const el=one(root,selector);
          if(!el) return;
          el.style.filter=
            `drop-shadow(0 0 ${
              3+(m.i+j)%4*2
            }px rgba(49,124,97,.25))`;
          el.style.transform=
            `translateY(${Math.sin(m.i+j)*2}px)`;
        });

        // Guest progresses across the visible hotel
        // only after the whole process is coordinated.
        move(root,".o3a-guest",
          b>=6?Math.min(226,(m.i-26)*52):
          b>=3?Math.min(80,(m.i-11)*8):0,
          0);

        // The skyline becomes brighter as the operation
        // shifts from silo management to customer outcomes.
        style(root,".o3a-skyline",{
          opacity:b>=6?1:.65,
          filter:b>=6
            ?"drop-shadow(0 0 7px rgba(49,124,97,.2))"
            :"none"
        });

        microMotion(root,m.i,m.n,"rise");
      },instant);
    }

    REG.O3a = {
      build(el) {
        stopTweens(root);
        root=mount(el,"O3a",body,
          "A physical operations bridge changes from isolated departmental controls into a connected, process-owned system focused on the guest's completed outcome");
        this.reset();
      },
      step(i,n) { apply(i,n); },
      reset() {
        stopTweens(root);
        apply(0,32,true);
      }
    };
  }

  // CONTINUES IN PART 4
  // Next: O3b, O4a, O4b
  // ==========================================================
  // SCENE 07 · O3b
  // TWO ORGANISATIONAL LENSES
  //
  // Original visual concept:
  // A rotating architectural model suspended inside
  // a large mechanical observation instrument.
  //
  // The first lens exposes vertical reporting lines:
  // departments, authority, specialist accountability.
  //
  // The second lens reveals the horizontal customer
  // journey passing through those same departments.
  //
  // Neither perspective replaces the other.
  // The final image combines both into a coherent
  // operating structure.
  //
  // Distinctive animation:
  // Rotating architectural model, moving lens,
  // vertical structural beams, horizontal light
  // route, travelling customer token, and
  // interlocking accountability mechanisms.
  //
  // Narration: 29 moments.
  // ==========================================================

  {
    let root = null;

    const labels = [
      "TWO ORGANISATIONAL LENSES",
      "THE FUNCTIONAL VIEW",
      "VERTICAL ACCOUNTABILITY",
      "THE PROCESS VIEW",
      "FOLLOW THE CUSTOMER",
      "CROSS-FUNCTIONAL WORK",
      "COMBINE BOTH VIEWS",
      "ONE OPERATING SYSTEM"
    ];

    const cuts = [3, 7, 10, 14, 19, 23, 27];

    const body = `
      <defs>
        <linearGradient id="w01o3bStructure"
          x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#edf4f7"/>
          <stop offset="1" stop-color="#8ba9bf"/>
        </linearGradient>

        <radialGradient id="w01o3bLens">
          <stop stop-color="#ffffff" stop-opacity=".9"/>
          <stop offset="1" stop-color="#dbe7f2"
                stop-opacity=".15"/>
        </radialGradient>
      </defs>

      ${txt(170,24,"THE ORGANISATION IN MOTION",
        12,C.navy,'letter-spacing="1.1"')}

      <g class="vls-light">
        ${circle(170,184,148,C.blue,'opacity=".25"')}
      </g>

      <g class="vls-camera">

        <!-- Suspended architectural instrument -->
        ${circle(170,181,133,C.paper,
          'stroke="#1f4e79" stroke-width="6"')}

        ${circle(170,181,122,
          "url(#w01o3bLens)",
          'stroke="#8ba9bf" stroke-width="2"')}

        <g class="o3b-model vls-moving">

          <!-- Organisational frame -->
          ${rect(66,104,208,157,
            "url(#w01o3bStructure)",8,
            'stroke="#1f4e79" stroke-width="3"')}

          <!-- Four specialist columns -->
          ${[81,130,179,228].map((x,j) => `
            <g class="o3b-column-${j} vls-moving">
              ${rect(x,116,33,132,C.paper,3,
                'stroke="#1f4e79" stroke-width="2"')}

              ${[132,163,194,225].map(y =>
                rect(x+6,y,21,16,C.blue,2)
              ).join("")}
            </g>
          `).join("")}

          <!-- Vertical reporting beams -->
          <g class="o3b-vertical vls-moving">
            ${[97,146,195,244].map(x => `
              ${arrow(x,238,x,118,C.navy,3)}
            `).join("")}

            ${rect(115,91,110,15,C.navy,5)}
            ${txt(170,102,"FUNCTIONS",10,C.white)}
          </g>

          <!-- Horizontal process route -->
          <g class="o3b-horizontal vls-moving"
             opacity="0">

            <path class="o3b-route vls-drawing"
              d="M58 184 H282"
              fill="none" stroke="${C.orange}"
              stroke-width="7"
              stroke-dasharray="240"
              stroke-dashoffset="240"/>

            ${[97,146,195,244].map(x =>
              circle(x,184,9,C.orange,
                'stroke="#ffffff" stroke-width="2"')
            ).join("")}
          </g>

          <!-- Customer token -->
          <g class="o3b-customer vls-moving"
             opacity="0">
            ${circle(58,184,14,C.green)}
            ${circle(58,184,6,C.white)}
          </g>

        </g>

        <!-- Rotating observation lens -->
        <g class="o3b-observer vls-moving">
          ${circle(170,181,113,"none",
            'stroke="#c0502a" stroke-width="4" stroke-dasharray="9 13"')}

          ${path("M170 53 V75 M170 287 V309",
            C.orange,3)}

          ${path("M42 181 H64 M276 181 H298",
            C.orange,3)}
        </g>

        <!-- Integration links -->
        <g class="o3b-integration vls-moving"
           opacity="0">

          ${[97,146,195,244].map(x => `
            ${circle(x,184,17,"none",
              'stroke="#317c61" stroke-width="3"')}
            ${check(x,184,C.green,3)}
          `).join("")}
        </g>

        <!-- Dual accountability indicator -->
        <g class="o3b-balance vls-moving"
           opacity="0">

          ${path("M170 270 V306",C.navy,4)}
          ${path("M120 280 H220",C.navy,4)}

          ${circle(120,293,17,C.blue)}
          ${circle(220,293,17,C.green)}

          ${txt(120,297,"F",13,C.navy)}
          ${txt(220,297,"P",13,C.white)}
        </g>

      </g>

      <g class="vls-spark">
        ${circle(170,43,5,C.orange)}
      </g>

      <text class="vls-caption o3b-caption"
        x="170" y="365" text-anchor="middle">
        TWO ORGANISATIONAL LENSES
      </text>

      ${rect(20,381,300,3,C.blue,1)}
      <rect class="vls-progress"
        x="20" y="381"
        width="0" height="3"
        rx="1.5" fill="${C.orange}"/>
    `;

    function apply(i,n,instant=false) {
      if(!root) return;

      const m=moment(i,n);
      const b=beat(m.i,cuts);

      renderState(root,() => {

        text(root,".o3b-caption",labels[b]);

        visible(root,".o3b-vertical",
          b<=2||b>=6);

        visible(root,".o3b-horizontal",b>=3);
        visible(root,".o3b-customer",b>=4);
        visible(root,".o3b-integration",b>=6);
        visible(root,".o3b-balance",b===7);

        // A physical perspective change introduces
        // the horizontal process lens.
        const angle=[
          0,-5,-11,16,10,5,0,0
        ][b];

        style(root,".o3b-model",{
          transform:
            `perspective(600px)
             rotateY(${angle}deg)
             rotateZ(${Math.sin(m.i*.6)*1.2}deg)`,
          transformOrigin:"170px 181px"
        });

        rotate(root,".o3b-observer",
          b>=3?90+m.i*2:m.i*3);

        const observer=one(root,".o3b-observer");
        if(observer)
          observer.style.transformOrigin="170px 181px";

        draw(root,".o3b-route",
          b>=3
            ?Math.max(0,240-(m.i-10)*23)
            :240);

        const customerX=b>=4
          ?Math.min(224,(m.i-14)*24)
          :0;

        move(root,".o3b-customer",
          customerX,Math.sin(m.i*.7)*2);

        // Each moment changes the emphasis on one
        // specialist column.
        for(let j=0;j<4;j++) {
          const el=one(root,`.o3b-column-${j}`);
          if(!el) continue;

          el.style.opacity=
            b===7?1:j===m.i%4?1:.55;

          el.style.transform=
            j===m.i%4
              ?"translateY(-4px)"
              :"translateY(0px)";
        }

        microMotion(root,m.i,m.n,"track");

      },instant);
    }

    REG.O3b={
      build(el) {
        stopTweens(root);

        root=mount(
          el,"O3b",body,
          "A rotating organisational model reveals vertical functional accountability and a horizontal customer journey, then integrates both perspectives"
        );

        this.reset();
      },

      step(i,n) {
        apply(i,n);
      },

      reset() {
        stopTweens(root);
        apply(0,29,true);
      }
    };
  }

  // ==========================================================
  // SCENE 08 · O4a
  // THE IMPROVEMENT GARDEN
  //
  // Original visual concept:
  // A botanical conservatory with two contrasting plants.
  //
  // BPI is represented by a focused intervention:
  // pruning a damaged branch, repairing the soil,
  // and producing a visible improvement.
  //
  // BPM is represented by the whole garden ecosystem:
  // recurring irrigation, measurement, seasonal
  // adaptation, stewardship, and continuing growth.
  //
  // The garden is a physical metaphor for the
  // relationship between a bounded improvement
  // project and sustained process management.
  //
  // Distinctive animation:
  // Growing stems, opening leaves, pruning,
  // water droplets, turning irrigation wheel,
  // sunlight, and changing seasonal conditions.
  //
  // Narration: 33 moments.
  // ==========================================================

  {
    let root=null;

    const labels=[
      "THE IMPROVEMENT GARDEN",
      "A SPECIFIC PROBLEM",
      "TARGETED IMPROVEMENT",
      "ONE BETTER RESULT",
      "THE WHOLE SYSTEM",
      "ONGOING MANAGEMENT",
      "MEASURE AND ADAPT",
      "IMPROVEMENT CONTINUES"
    ];

    const cuts=[4,8,12,16,21,26,30];

    function leaf(x,y,angle,color,cls) {
      return `
        <g class="${cls} vls-moving"
           transform="translate(${x} ${y})
                      rotate(${angle})">
          <path d="M0 0
                   Q-17 -21 0 -35
                   Q17 -21 0 0"
                fill="${color}"/>
          ${path("M0 0 V-30",C.green,1.5)}
        </g>
      `;
    }

    const body=`
      <defs>
        <linearGradient id="w01o4aSky"
          x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="#dbe7f2"/>
          <stop offset="1" stop-color="#fbf8f1"/>
        </linearGradient>

        <linearGradient id="w01o4aSoil"
          x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="#c8aa83"/>
          <stop offset="1" stop-color="#9c7858"/>
        </linearGradient>
      </defs>

      ${txt(170,24,"THE IMPROVEMENT GARDEN",
        13,C.navy,'letter-spacing="1.2"')}

      <g class="vls-light">
        ${circle(268,91,63,C.gold,'opacity=".2"')}
      </g>

      <g class="vls-camera">

        <!-- Conservatory -->
        ${rect(21,48,298,275,
          "url(#w01o4aSky)",11,
          'stroke="#1f4e79" stroke-width="3"')}

        ${path("M21 118 Q170 -18 319 118",
          C.navy,3)}

        ${path("M170 48 V322",C.navy,1,
          'opacity=".2"')}

        <!-- Sun -->
        <g class="o4a-sun vls-moving">
          ${circle(267,94,24,C.gold)}
          ${Array.from({length:8},(_,j)=>{
            const a=j*Math.PI/4;
            const x1=267+Math.cos(a)*32;
            const y1=94+Math.sin(a)*32;
            const x2=267+Math.cos(a)*43;
            const y2=94+Math.sin(a)*43;
            return path(
              `M${x1} ${y1} L${x2} ${y2}`,
              C.gold,3
            );
          }).join("")}
        </g>

        <!-- Garden soil -->
        ${rect(21,272,298,50,
          "url(#w01o4aSoil)",0)}

        ${path("M21 272 H319",C.green,4)}

        <!-- BPI: one focused plant -->
        <g class="o4a-bpi vls-moving">

          <path class="o4a-bpi-stem vls-drawing"
            d="M96 274
               Q88 225 96 180
               Q106 145 97 116"
            fill="none" stroke="${C.green}"
            stroke-width="6"
            stroke-dasharray="190"
            stroke-dashoffset="190"/>

          ${leaf(95,223,-53,C.green,
            "o4a-bpi-leaf-a")}
          ${leaf(98,190,49,C.green,
            "o4a-bpi-leaf-b")}
          ${leaf(97,154,-32,C.green,
            "o4a-bpi-leaf-c")}

          <g class="o4a-damaged vls-moving">
            ${path("M97 181 L123 161",
              C.orange,4)}
            ${circle(123,161,10,C.orange)}
          </g>

          <g class="o4a-pruning vls-moving"
             opacity="0">

            ${path("M117 151 L140 175",
              C.navy,5)}
            ${path("M140 151 L117 175",
              C.navy,5)}

            ${circle(128,163,5,C.orange)}
          </g>

          <g class="o4a-bloom vls-moving"
             opacity="0">
            ${circle(97,116,18,C.gold)}
            ${[0,72,144,216,288].map(a => `
              <ellipse cx="97" cy="94"
                rx="9" ry="17"
                fill="${C.orange}"
                transform="rotate(${a} 97 116)"/>
            `).join("")}
            ${circle(97,116,10,C.gold)}
          </g>

        </g>

        <!-- BPM: connected ecosystem -->
        <g class="o4a-bpm vls-moving"
           opacity="0">

          ${[190,230,270].map((x,j) => `
            <g class="o4a-tree-${j} vls-moving">

              <path d="M${x} 274
                       Q${x-7} 224 ${x} ${183-j*15}"
                    fill="none" stroke="${C.green}"
                    stroke-width="5"/>

              ${circle(x,180-j*15,22+j*3,C.green,
                'opacity=".8"')}

              ${circle(x-12,173-j*15,11,C.green)}
              ${circle(x+13,169-j*15,12,C.green)}
            </g>
          `).join("")}
        </g>

        <!-- Irrigation wheel -->
        <g class="o4a-wheel vls-moving"
           opacity="0">

          ${circle(170,253,27,C.paper,
            'stroke="#1f4e79" stroke-width="4"')}

          ${[0,45,90,135].map(a =>
            path("M170 228 V278",C.navy,3,
              `transform="rotate(${a} 170 253)"`)
          ).join("")}

          ${circle(170,253,7,C.orange)}
        </g>

        <!-- Irrigation channel -->
        <g class="o4a-irrigation vls-moving"
           opacity="0">

          <path class="o4a-water-line vls-drawing"
            d="M170 280
               Q195 302 225 282
               Q254 265 292 282"
            fill="none" stroke="${C.navy}"
            stroke-width="5"
            stroke-dasharray="170"
            stroke-dashoffset="170"/>

          ${[195,225,255,285].map((x,j) =>
            circle(x,282+(j%2)*4,5,C.blue)
          ).join("")}
        </g>

        <!-- Rain -->
        <g class="o4a-rain vls-moving"
           opacity="0">

          ${[185,210,235,260,285].map((x,j) => `
            <path d="M${x} ${118+j%2*12}
                     l-5 15"
                  stroke="${C.navy}"
                  stroke-width="3"
                  stroke-linecap="round"/>
          `).join("")}
        </g>

        <!-- Measurement instrument -->
        <g class="o4a-measure vls-moving"
           opacity="0">

          ${rect(132,107,76,48,C.paper,6,
            'stroke="#1f4e79" stroke-width="3"')}

          ${path("M143 143 L158 132 L171 137 L188 119 L198 124",
            C.green,3)}
        </g>

        <!-- Continuous cycle -->
        <g class="o4a-cycle vls-moving"
           opacity="0">

          <path class="o4a-cycle-path vls-drawing"
            d="M169 92
               A104 104 0 1 1 168 92"
            fill="none" stroke="${C.green}"
            stroke-width="4"
            stroke-dasharray="680"
            stroke-dashoffset="680"/>

          ${arrow(157,91,175,92,C.green,4)}
        </g>

      </g>

      <g class="vls-spark">
        ${circle(170,40,5,C.orange)}
      </g>

      <text class="vls-caption o4a-caption"
        x="170" y="365" text-anchor="middle">
        THE IMPROVEMENT GARDEN
      </text>

      ${rect(20,381,300,3,C.blue,1)}
      <rect class="vls-progress"
        x="20" y="381"
        width="0" height="3"
        rx="1.5" fill="${C.orange}"/>
    `;

    function apply(i,n,instant=false) {
      if(!root) return;

      const m=moment(i,n);
      const b=beat(m.i,cuts);

      renderState(root,() => {

        text(root,".o4a-caption",labels[b]);

        draw(root,".o4a-bpi-stem",
          Math.max(0,190-m.i*20));

        visible(root,".o4a-damaged",b<=2);
        visible(root,".o4a-pruning",b===2);
        visible(root,".o4a-bloom",b>=3);

        visible(root,".o4a-bpm",b>=4);
        visible(root,".o4a-wheel",b>=5);
        visible(root,".o4a-irrigation",b>=5);
        visible(root,".o4a-rain",b>=6);
        visible(root,".o4a-measure",b>=6);
        visible(root,".o4a-cycle",b===7);

        // Targeted BPI produces a visible, bounded
        // improvement in one plant.
        const bloom=one(root,".o4a-bloom");

        if(bloom) {
          bloom.style.transform=
            `scale(${b>=3
              ?Math.min(1,(m.i-12)*.24+.25)
              :0})`;

          bloom.style.transformOrigin="97px 116px";
        }

        // BPM grows the whole ecosystem.
        for(let j=0;j<3;j++) {
          const el=one(root,`.o4a-tree-${j}`);
          if(!el) continue;

          const growth=b>=4
            ?Math.min(1,.3+(m.i-16-j)*.12)
            :0;

          el.style.transform=
            `scale(${Math.max(0,growth)})`;

          el.style.transformOrigin=
            `${190+j*40}px 274px`;
        }

        rotate(root,".o4a-wheel",m.i*18);

        const wheel=one(root,".o4a-wheel");
        if(wheel)
          wheel.style.transformOrigin="170px 253px";

        draw(root,".o4a-water-line",
          b>=5?Math.max(0,170-(m.i-21)*25):170);

        draw(root,".o4a-cycle-path",
          b===7?Math.max(0,680-(m.i-30)*240):680);

        // Sunlight and weather respond to every moment.
        move(root,".o4a-sun",
          Math.sin(m.i*.5)*8,
          Math.cos(m.i*.4)*5);

        move(root,".o4a-rain",
          0,(m.i%4)*7);

        [
          ".o4a-bpi-leaf-a",
          ".o4a-bpi-leaf-b",
          ".o4a-bpi-leaf-c"
        ].forEach((selector,j) => {
          const el=one(root,selector);
          if(!el) return;

          el.style.transform=
            `translate(${Math.sin(m.i*.7+j)*2}px,
                       ${Math.cos(m.i*.5+j)*2}px)`;
        });

        microMotion(root,m.i,m.n,"rise");

      },instant);
    }

    REG.O4a={
      build(el) {
        stopTweens(root);

        root=mount(
          el,"O4a",body,
          "A focused plant repair represents business process improvement, while a continuously irrigated and monitored garden represents ongoing business process management"
        );

        this.reset();
      },

      step(i,n) {
        apply(i,n);
      },

      reset() {
        stopTweens(root);
        apply(0,33,true);
      }
    };
  }

  // ==========================================================
  // SCENE 09 · O4b
  // THE FIVE-LEVEL MATURITY CONSTRUCTION SITE
  //
  // Original visual concept:
  // A construction site where an operating system
  // is progressively built across five stages.
  //
  // Level 1: improvised foundations and unstable work.
  // Level 2: repeated practices and basic structure.
  // Level 3: defined and documented processes.
  // Level 4: measured, controlled performance.
  // Level 5: continuous adaptation and optimisation.
  //
  // Each level adds real architectural capability.
  // The construction crane moves materials, beams
  // rise, structural connections appear, instruments
  // activate, and the completed building adapts.
  //
  // This is not a staircase infographic.
  // It is a living construction environment.
  //
  // Narration: 30 moments.
  // ==========================================================

  {
    let root=null;

    const labels=[
      "BUILDING CAPABILITY",
      "LEVEL 1 · INITIAL",
      "LEVEL 2 · REPEATABLE",
      "LEVEL 3 · DEFINED",
      "LEVEL 4 · MANAGED",
      "LEVEL 5 · OPTIMISING",
      "CAPABILITY IS BUILT",
      "KEEP IMPROVING"
    ];

    const cuts=[3,7,11,15,19,24,28];

    const body=`
      <defs>
        <linearGradient id="w01o4bSky"
          x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="#dbe7f2"/>
          <stop offset="1" stop-color="#fbf8f1"/>
        </linearGradient>
      </defs>

      ${txt(170,24,"THE MATURITY CONSTRUCTION SITE",
        12,C.navy,'letter-spacing="1"')}

      <g class="vls-light">
        ${circle(170,168,145,C.blue,'opacity=".2"')}
      </g>

      <g class="vls-camera">

        <!-- Construction environment -->
        ${rect(20,50,300,273,
          "url(#w01o4bSky)",10)}

        ${rect(20,296,300,27,C.muted,0)}

        ${path("M20 296 H320",C.navy,3)}

        <!-- Tower crane -->
        <g class="o4b-crane vls-moving">

          ${path("M57 293 V69",C.navy,6)}

          ${path("M40 69 H281",C.navy,5)}

          ${path("M57 69 L116 106 M57 69 L28 106",
            C.navy,2)}

          ${[91,125,159,193,227,261].map(x =>
            path(`M${x} 69 L${x-20} 85
                  L${x} 85`,C.navy,1.5)
          ).join("")}

          <g class="o4b-hook vls-moving">
            ${path("M237 69 V154",C.navy,2)}
            ${path("M228 154 Q237 172 246 154",
              C.orange,4)}
          </g>
        </g>

        <!-- Foundations -->
        <g class="o4b-foundation vls-moving">

          ${rect(92,274,203,22,C.navy,3)}

          ${[104,145,186,227,268].map(x =>
            rect(x,284,20,12,C.muted,2)
          ).join("")}
        </g>

        <!-- Level 1: unstable isolated blocks -->
        <g class="o4b-level-1 vls-moving">

          ${rect(108,243,38,31,C.blue,2,
            'stroke="#1f4e79" stroke-width="2"')}

          ${rect(159,249,38,25,C.blue,2,
            'stroke="#1f4e79" stroke-width="2"')}

          ${rect(216,239,38,35,C.blue,2,
            'stroke="#1f4e79" stroke-width="2"')}
        </g>

        <!-- Level 2: repeated structural practice -->
        <g class="o4b-level-2 vls-moving"
           opacity="0">

          ${rect(102,213,165,29,C.paper,3,
            'stroke="#1f4e79" stroke-width="3"')}

          ${[113,151,189,227].map(x =>
            rect(x,219,27,17,C.blue,2)
          ).join("")}
        </g>

        <!-- Level 3: documented standard floors -->
        <g class="o4b-level-3 vls-moving"
           opacity="0">

          ${rect(102,174,165,36,C.paper,3,
            'stroke="#1f4e79" stroke-width="3"')}

          ${[112,151,190,229].map(x =>
            rect(x,182,28,20,C.blue,2)
          ).join("")}

          ${path("M108 177 H261",C.green,3)}
        </g>

        <!-- Level 4: measured performance -->
        <g class="o4b-level-4 vls-moving"
           opacity="0">

          ${rect(102,134,165,37,C.paper,3,
            'stroke="#1f4e79" stroke-width="3"')}

          ${[128,184,240].map((x,j) => `
            ${circle(x,152,12,C.blue,
              'stroke="#1f4e79" stroke-width="2"')}
            ${path(
              `M${x} 152
               L${x+Math.cos(j+1)*8}
               ${152-Math.sin(j+1)*8}`,
              C.green,2
            )}
          `).join("")}
        </g>

        <!-- Level 5: adaptive upper structure -->
        <g class="o4b-level-5 vls-moving"
           opacity="0">

          ${rect(102,94,165,37,C.paper,3,
            'stroke="#317c61" stroke-width="3"')}

          ${path("M111 121 L137 112 L160 117 L190 101 L219 108 L257 98",
            C.green,4)}

          ${circle(257,98,5,C.orange)}

          ${rect(158,81,53,11,C.green,3)}
        </g>

        <!-- Construction material suspended by crane -->
        <g class="o4b-material vls-moving">

          ${rect(208,154,59,17,C.orange,3)}

          ${path("M237 154 V145",C.navy,2)}
        </g>

        <!-- Workers -->
        <g class="o4b-workers vls-moving">

          ${person(72,283,C.orange,.7)}
          ${person(289,283,C.navy,.7)}
        </g>

        <!-- Capability connections -->
        <g class="o4b-connections vls-moving"
           opacity="0">

          <path class="o4b-spine vls-drawing"
            d="M184 274 V95"
            fill="none" stroke="${C.green}"
            stroke-width="5"
            stroke-dasharray="190"
            stroke-dashoffset="190"/>

          ${[252,222,192,152,113].map(y =>
            circle(184,y,5,C.green)
          ).join("")}
        </g>

        <!-- Adaptive roof signal -->
        <g class="o4b-signal vls-moving"
           opacity="0">

          ${path("M184 80 V61",C.green,3)}

          ${path("M169 67 Q184 51 199 67",
            C.green,3)}

          ${path("M158 61 Q184 34 210 61",
            C.green,2)}
        </g>

      </g>

      <g class="vls-spark">
        ${circle(170,39,5,C.orange)}
      </g>

      <text class="vls-caption o4b-caption"
        x="170" y="365" text-anchor="middle">
        BUILDING CAPABILITY
      </text>

      ${rect(20,381,300,3,C.blue,1)}
      <rect class="vls-progress"
        x="20" y="381"
        width="0" height="3"
        rx="1.5" fill="${C.orange}"/>
    `;

    function apply(i,n,instant=false) {
      if(!root) return;

      const m=moment(i,n);
      const b=beat(m.i,cuts);

      renderState(root,() => {

        text(root,".o4b-caption",labels[b]);

        visible(root,".o4b-level-2",b>=2);
        visible(root,".o4b-level-3",b>=3);
        visible(root,".o4b-level-4",b>=4);
        visible(root,".o4b-level-5",b>=5);

        visible(root,".o4b-connections",b>=6);
        visible(root,".o4b-signal",b===7);

        // Each floor is physically lifted into place.
        [
          ".o4b-level-2",
          ".o4b-level-3",
          ".o4b-level-4",
          ".o4b-level-5"
        ].forEach((selector,j) => {

          const el=one(root,selector);
          if(!el) return;

          const active=b>=j+2;

          el.style.transform=
            active
              ?"translateY(0px)"
              :"translateY(70px)";
        });

        // At the initial level, disconnected blocks
        // shift unpredictably.
        style(root,".o4b-level-1",{
          transform:b<=1
            ?`translateX(${Math.sin(m.i*1.2)*5}px)
              rotate(${Math.sin(m.i)*2}deg)`
            :"translateX(0px) rotate(0deg)",
          transformOrigin:"184px 260px"
        });

        // Crane moves materials between construction
        // stages rather than looping a generic animation.
        const craneX=[
          0,-20,-10,8,25,0,-15,0
        ][b];

        const craneY=[
          0,80,58,30,8,-32,-48,-48
        ][b];

        move(root,".o4b-hook",
          craneX+Math.sin(m.i*.7)*3,
          craneY);

        move(root,".o4b-material",
          craneX+Math.sin(m.i*.7)*3,
          craneY);

        visible(root,".o4b-material",b<=5);

        draw(root,".o4b-spine",
          b>=6?Math.max(0,190-(m.i-24)*45):190);

        // Workers visibly reposition at every moment.
        move(root,".o4b-workers",
          Math.sin(m.i*.8)*5,
          Math.cos(m.i*.6)*2);

        // The completed operating system adapts.
        style(root,".o4b-level-5",{
          filter:b>=5
            ?`drop-shadow(0 0 ${
              3+(m.i%4)*2
            }px rgba(49,124,97,.3))`
            :"none"
        });

        microMotion(root,m.i,m.n,"rise");

      },instant);
    }

    REG.O4b={
      build(el) {
        stopTweens(root);

        root=mount(
          el,"O4b",body,
          "A construction crane builds five progressively more capable operating levels, from improvised work through repeatable, defined, measured, and continuously optimised processes"
        );

        this.reset();
      },

      step(i,n) {
        apply(i,n);
      },

      reset() {
        stopTweens(root);
        apply(0,30,true);
      }
    };
  }

  // CONTINUES IN PART 5
  // Next: O4c, W1OUTRO, final integration and closure
  // ==========================================================
  // SCENE 10 · O4c
  // THE BPM FRAMEWORK EXPEDITION
  //
  // Original visual concept:
  // A miniature expedition travels across a continuous
  // landscape representing the BPM lifecycle.
  //
  // The traveller begins with an unresolved customer
  // problem, crosses a mapping bridge, examines the
  // process through a diagnostic telescope, constructs
  // an improved route, implements the change, and
  // finally establishes a monitoring station.
  //
  // The landscape is not a row of boxes or a circular
  // lifecycle diagram. It is one continuous physical
  // environment with different terrains, mechanisms,
  // and visible consequences.
  //
  // The route does not terminate at implementation.
  // A monitoring signal eventually reveals a new
  // opportunity, sending the expedition onward.
  //
  // Distinctive animation:
  // Travelling explorer, opening bridge, telescope,
  // lifting construction platform, flowing water,
  // operating signal tower, and returning route.
  //
  // Narration: 35 moments.
  // ==========================================================

  {
    let root = null;

    const labels = [
      "THE BPM EXPEDITION",
      "IDENTIFY THE PROCESS",
      "DISCOVER THE FLOW",
      "ANALYSE THE PROBLEM",
      "REDESIGN THE ROUTE",
      "IMPLEMENT THE CHANGE",
      "MONITOR PERFORMANCE",
      "IMPROVE AGAIN"
    ];

    const cuts = [4, 8, 13, 18, 23, 28, 32];

    const body = `
      <defs>
        <linearGradient id="w01o4cSky"
          x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="#dbe7f2"/>
          <stop offset="1" stop-color="#fbf8f1"/>
        </linearGradient>

        <linearGradient id="w01o4cGround"
          x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="#b5c9b0"/>
          <stop offset="1" stop-color="#729b83"/>
        </linearGradient>
      </defs>

      ${txt(170,24,"THE BPM EXPEDITION",
        13,C.navy,'letter-spacing="1.5"')}

      <g class="vls-light">
        ${circle(235,104,104,C.gold,'opacity=".15"')}
      </g>

      <g class="vls-camera">

        <!-- Continuous expedition landscape -->
        ${rect(15,45,310,287,
          "url(#w01o4cSky)",12)}

        <!-- Distant mountain terrain -->
        <path d="M15 223
                 L65 141 L102 191
                 L158 112 L211 184
                 L264 135 L325 215
                 V332 H15 Z"
          fill="#d4e1e4"/>

        <path d="M15 255
                 Q70 211 119 247
                 Q176 203 230 244
                 Q281 211 325 246
                 V332 H15 Z"
          fill="url(#w01o4cGround)"/>

        <!-- River separating existing and improved flow -->
        <path d="M15 273
                 Q82 241 138 278
                 Q195 311 257 267
                 Q291 249 325 274
                 V332 H15 Z"
          fill="${C.blue}"/>

        <path d="M15 273
                 Q82 241 138 278
                 Q195 311 257 267
                 Q291 249 325 274"
          fill="none" stroke="${C.navy}"
          stroke-width="2" opacity=".3"/>

        <!-- Expedition route -->
        <path class="o4c-route vls-drawing"
          d="M38 273
             Q67 240 91 249
             Q120 261 145 221
             Q175 181 205 215
             Q238 248 268 201
             Q291 171 306 194"
          fill="none" stroke="${C.orange}"
          stroke-width="5"
          stroke-dasharray="410"
          stroke-dashoffset="410"/>

        <!-- Stage 1: process identification beacon -->
        <g class="o4c-identify vls-moving">

          ${path("M39 270 V192",C.navy,4)}

          <path d="M39 193
                   L89 206 L39 219 Z"
            fill="${C.orange}"/>

          ${circle(39,192,5,C.navy)}
        </g>

        <!-- Stage 2: discovery bridge -->
        <g class="o4c-bridge vls-moving"
           opacity="0">

          ${path("M85 249 L153 225",C.navy,6)}

          ${[95,111,127,143].map((x,j) =>
            path(
              `M${x} ${246-j*5}
               V${263-j*5}`,
              C.navy,2
            )
          ).join("")}

          ${path("M85 249 Q119 205 153 225",
            C.orange,3)}
        </g>

        <!-- Stage 3: diagnostic telescope -->
        <g class="o4c-telescope vls-moving"
           opacity="0">

          ${path("M175 210 L189 250",C.navy,4)}
          ${path("M175 210 L158 249",C.navy,4)}

          <g class="o4c-telescope-head vls-moving">
            ${rect(153,189,61,19,C.navy,5,
              'transform="rotate(-23 183 198)"')}

            ${circle(207,189,12,C.orange)}
            ${circle(207,189,5,C.paper)}
          </g>

          <path class="o4c-scan vls-drawing"
            d="M208 190
               Q249 160 280 188"
            fill="none" stroke="${C.orange}"
            stroke-width="3"
            stroke-dasharray="100"
            stroke-dashoffset="100"/>
        </g>

        <!-- Stage 4: redesigned crossing -->
        <g class="o4c-redesign vls-moving"
           opacity="0">

          ${rect(188,217,82,13,C.green,3)}

          ${[197,218,239,260].map(x =>
            path(
              `M${x} 217 V245`,
              C.navy,3
            )
          ).join("")}

          ${path("M188 217 L229 196 L270 217",
            C.green,4)}
        </g>

        <!-- Stage 5: implementation mechanism -->
        <g class="o4c-implement vls-moving"
           opacity="0">

          ${rect(246,171,51,51,C.paper,5,
            'stroke="#1f4e79" stroke-width="3"')}

          ${circle(271,196,16,C.blue,
            'stroke="#1f4e79" stroke-width="2"')}

          ${check(271,196,C.green,4)}

          <g class="o4c-wheel vls-moving">
            ${circle(271,196,23,"none",
              'stroke="#317c61" stroke-width="3" stroke-dasharray="7 8"')}
          </g>
        </g>

        <!-- Stage 6: monitoring station -->
        <g class="o4c-monitor vls-moving"
           opacity="0">

          ${path("M298 204 V109",C.navy,5)}

          ${rect(274,108,48,37,C.paper,5,
            'stroke="#1f4e79" stroke-width="3"')}

          ${path("M281 134 L291 126 L299 130 L313 115",
            C.green,3)}

          <g class="o4c-signal vls-moving">
            ${path("M281 103 Q298 86 315 103",
              C.green,3)}

            ${path("M273 95 Q298 69 323 95",
              C.green,2)}
          </g>
        </g>

        <!-- Continuous-improvement return route -->
        <g class="o4c-return vls-moving"
           opacity="0">

          <path class="o4c-return-line vls-drawing"
            d="M298 100
               Q263 57 180 68
               Q90 76 39 174"
            fill="none" stroke="${C.green}"
            stroke-width="4"
            stroke-dasharray="350"
            stroke-dashoffset="350"/>

          ${arrow(51,154,39,174,C.green,4)}
        </g>

        <!-- Moving expedition traveller -->
        <g class="o4c-explorer vls-moving">

          ${person(38,262,C.navy,.72)}

          ${rect(43,251,13,17,C.orange,3)}

          ${path("M31 251 L46 251",C.navy,2)}
        </g>

        <!-- Physical milestones -->
        <g class="o4c-milestones vls-moving">

          ${[
            [39,273],
            [91,249],
            [145,221],
            [205,215],
            [268,201],
            [306,194]
          ].map(([x,y],j) => `
            ${circle(x,y,7,
              j===0?C.orange:C.paper,
              'stroke="#1f4e79" stroke-width="2"')}
          `).join("")}
        </g>

      </g>

      <g class="vls-spark">
        ${circle(170,39,5,C.orange)}
      </g>

      <text class="vls-caption o4c-caption"
        x="170" y="365"
        text-anchor="middle">
        THE BPM EXPEDITION
      </text>

      ${rect(20,381,300,3,C.blue,1)}

      <rect class="vls-progress"
        x="20" y="381"
        width="0" height="3"
        rx="1.5" fill="${C.orange}"/>
    `;

    function apply(i,n,instant=false) {
      if(!root) return;

      const m=moment(i,n);
      const b=beat(m.i,cuts);

      renderState(root,() => {

        text(root,".o4c-caption",labels[b]);

        visible(root,".o4c-bridge",b>=2);
        visible(root,".o4c-telescope",b>=3);
        visible(root,".o4c-redesign",b>=4);
        visible(root,".o4c-implement",b>=5);
        visible(root,".o4c-monitor",b>=6);
        visible(root,".o4c-return",b===7);

        // The route is revealed as the traveller
        // progresses through the BPM lifecycle.
        draw(root,".o4c-route",
          Math.max(0,410-m.i*15));

        // Each narrative stage corresponds to an
        // actual location in the landscape.
        const positions=[
          [0,0],
          [30,-13],
          [53,-24],
          [107,-54],
          [164,-48],
          [230,-65],
          [268,-68],
          [268,-68]
        ];

        const p=positions[b];

        move(root,".o4c-explorer",
          p[0]+Math.sin(m.i*.8)*3,
          p[1]+Math.cos(m.i*.9)*2);

        // Diagnostic telescope sweeps the terrain.
        rotate(root,".o4c-telescope-head",
          b===3?Math.sin(m.i*.7)*7:0);

        const telescope=one(
          root,".o4c-telescope-head"
        );

        if(telescope)
          telescope.style.transformOrigin="183px 198px";

        draw(root,".o4c-scan",
          b===3
            ?Math.max(0,100-(m.i-13)*22)
            :100);

        // Implementation starts a working mechanism.
        rotate(root,".o4c-wheel",
          b>=5?m.i*16:0);

        const wheel=one(root,".o4c-wheel");

        if(wheel)
          wheel.style.transformOrigin="271px 196px";

        // Monitoring pulses while the route operates.
        style(root,".o4c-signal",{
          opacity:b>=6
            ?.45+(m.i%4)*.17
            :0,

          transform:
            `scale(${1+(m.i%3)*.04})`,

          transformOrigin:"298px 109px"
        });

        draw(root,".o4c-return-line",
          b===7
            ?Math.max(0,350-(m.i-32)*125)
            :350);

        // The camera follows the expedition instead
        // of presenting a static lifecycle diagram.
        const camera=one(root,".vls-camera");

        if(camera) {
          const dx=
            -Math.sin(m.i*.43)*2.5;

          const dy=
            b>=5?-4:Math.cos(m.i*.6)*2;

          camera.style.transform=
            `translate(${dx}px,${dy}px)
             scale(${1+b*.006})`;

          camera.style.transformOrigin="170px 190px";
        }

        microMotion(root,m.i,m.n,"track");

      },instant);
    }

    REG.O4c={
      build(el) {
        stopTweens(root);

        root=mount(
          el,
          "O4c",
          body,
          "An expedition crosses a landscape through process identification, discovery, analysis, redesign, implementation, monitoring, and renewed improvement"
        );

        this.reset();
      },

      step(i,n) {
        apply(i,n);
      },

      reset() {
        stopTweens(root);
        apply(0,35,true);
      }
    };
  }

  // ==========================================================
  // SCENE 11 · W1OUTRO
  // THE LOST COMPLAINT
  //
  // Original visual concept:
  // A miniature six-department postal sorting machine.
  //
  // A guest complaint enters the machine as a physical
  // envelope. Six departments receive or redirect it.
  //
  // Each department can complete its own local action,
  // but the complaint remains unresolved.
  //
  // The envelope becomes increasingly worn as it
  // travels between departments.
  //
  // The final transformation replaces the disconnected
  // sorting routes with one visible case owner and
  // a continuous resolution pathway.
  //
  // The ending returns to the Week 1 central question:
  // Who owns the customer's completed outcome?
  //
  // Distinctive animation:
  // Sorting gates, travelling envelope, stamp arms,
  // branching conveyor belts, stalled delivery,
  // ownership beacon, and completed resolution.
  //
  // Narration: 28 moments.
  // ==========================================================

  {
    let root=null;

    const labels=[
      "THE LOST COMPLAINT",
      "SIX DEPARTMENTS",
      "EVERYONE RESPONDS",
      "THE CASE KEEPS MOVING",
      "NO ONE OWNS IT",
      "FOLLOW THE COMPLAINT",
      "ONE ACCOUNTABLE OWNER",
      "RESOLUTION DELIVERED"
    ];

    const cuts=[3,7,11,15,19,23,26];

    const departments=[
      "FRONT DESK",
      "HOUSEKEEPING",
      "RESERVATIONS",
      "FINANCE",
      "OPERATIONS",
      "GUEST SERVICE"
    ];

    const departmentMarkup=
      departments.map((name,j) => {
        const col=j%3;
        const row=Math.floor(j/3);

        const x=30+col*100;
        const y=76+row*105;

        return `
          <g class="outro-dept outro-dept-${j} vls-moving">

            ${rect(x,y,80,72,C.paper,6,
              'stroke="#1f4e79" stroke-width="2"')}

            ${rect(x+8,y+9,64,36,C.blue,3)}

            ${rect(x+21,y+15,38,23,C.paper,2)}

            ${path(
              `M${x+21} ${y+15}
               L${x+40} ${y+29}
               L${x+59} ${y+15}`,
              C.navy,2
            )}

            ${txt(x+40,y+59,name,9,C.navy)}

            <g class="outro-stamp-${j} vls-moving"
               opacity="0">
              ${circle(x+65,y+17,12,C.green)}
              ${check(x+65,y+17,C.white,2)}
            </g>
          </g>
        `;
      }).join("");

    const body=`
      <defs>
        <linearGradient id="w01outroMachine"
          x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="#edf4f7"/>
          <stop offset="1" stop-color="#dbe7f2"/>
        </linearGradient>
      </defs>

      ${txt(170,24,"WHERE DID THE CASE GO?",
        13,C.navy,'letter-spacing="1.2"')}

      <g class="vls-light">
        ${circle(170,178,147,C.blue,'opacity=".25"')}
      </g>

      <g class="vls-camera">

        <!-- Postal sorting machine -->
        ${rect(19,55,302,276,
          "url(#w01outroMachine)",12,
          'stroke="#1f4e79" stroke-width="3"')}

        ${departmentMarkup}

        <!-- Branching mechanical conveyor routes -->
        <g class="outro-conveyors vls-moving">

          ${path("M70 148 V171 H170 V181",
            C.navy,4)}

          ${path("M170 148 V171",
            C.navy,4)}

          ${path("M270 148 V171 H170",
            C.navy,4)}

          ${path("M70 253 V275 H170",
            C.navy,4)}

          ${path("M170 253 V275",
            C.navy,4)}

          ${path("M270 253 V275 H170",
            C.navy,4)}
        </g>

        <!-- Moving sorting gates -->
        <g class="outro-gates vls-moving">

          <g class="outro-gate-a vls-moving">
            ${path("M113 171 L132 156",
              C.orange,5)}
            ${circle(113,171,5,C.navy)}
          </g>

          <g class="outro-gate-b vls-moving">
            ${path("M227 171 L208 156",
              C.orange,5)}
            ${circle(227,171,5,C.navy)}
          </g>

          <g class="outro-gate-c vls-moving">
            ${path("M113 275 L132 260",
              C.orange,5)}
            ${circle(113,275,5,C.navy)}
          </g>

          <g class="outro-gate-d vls-moving">
            ${path("M227 275 L208 260",
              C.orange,5)}
            ${circle(227,275,5,C.navy)}
          </g>
        </g>

        <!-- Complaint envelope -->
        <g class="outro-envelope vls-moving">

          ${rect(43,115,48,32,C.paper,4,
            'stroke="#c0502a" stroke-width="3"')}

          ${path("M43 115 L67 134 L91 115",
            C.orange,2.5)}

          ${circle(67,131,5,C.orange)}
        </g>

        <!-- Accumulating wear -->
        <g class="outro-wear vls-moving"
           opacity="0">

          ${path("M47 117 L53 123 M79 139 L87 145",
            C.orange,2)}

          ${path("M61 116 L68 121",
            C.orange,2)}
        </g>

        <!-- Local completion stamps -->
        <g class="outro-local vls-moving"
           opacity="0">

          ${[70,170,270].map(x =>
            circle(x,171,8,C.green)
          ).join("")}
        </g>

        <!-- Unresolved case -->
        <g class="outro-unresolved vls-moving"
           opacity="0">

          ${circle(170,173,44,C.paper,
            'stroke="#c0502a" stroke-width="4"')}

          ${txt(170,183,"?",47,C.orange)}
        </g>

        <!-- One accountable case owner -->
        <g class="outro-owner vls-moving"
           opacity="0">

          ${circle(170,174,48,C.paper,
            'stroke="#317c61" stroke-width="4"')}

          ${person(170,178,C.green,1.1)}

          ${txt(170,225,"CASE OWNER",12,C.green)}
        </g>

        <!-- Redesigned resolution route -->
        <g class="outro-resolution vls-moving"
           opacity="0">

          <path class="outro-resolution-line vls-drawing"
            d="M70 289
               Q120 310 170 289
               Q220 268 270 289"
            fill="none" stroke="${C.green}"
            stroke-width="6"
            stroke-dasharray="250"
            stroke-dashoffset="250"/>

          ${circle(70,289,9,C.orange)}
          ${circle(270,289,13,C.green)}
          ${check(270,289,C.white,3)}
        </g>

        <!-- Final resolved case -->
        <g class="outro-complete vls-moving"
           opacity="0">

          ${circle(170,170,60,C.paper,
            'stroke="#317c61" stroke-width="5"')}

          ${check(170,167,C.green,10)}

          ${txt(170,213,"CASE RESOLVED",12,C.green)}
        </g>

      </g>

      <g class="vls-spark">
        ${circle(170,39,5,C.orange)}
      </g>

      <text class="vls-caption outro-caption"
        x="170" y="365"
        text-anchor="middle">
        THE LOST COMPLAINT
      </text>

      ${rect(20,381,300,3,C.blue,1)}

      <rect class="vls-progress"
        x="20" y="381"
        width="0" height="3"
        rx="1.5" fill="${C.orange}"/>
    `;

    function apply(i,n,instant=false) {
      if(!root) return;

      const m=moment(i,n);
      const b=beat(m.i,cuts);

      renderState(root,() => {

        text(root,".outro-caption",labels[b]);

        visible(root,".outro-local",b>=2&&b<=5);
        visible(root,".outro-wear",b>=3&&b<=5);
        visible(root,".outro-unresolved",b===4||b===5);
        visible(root,".outro-owner",b>=6&&b<=6);
        visible(root,".outro-resolution",b>=6);
        visible(root,".outro-complete",b===7);

        // The envelope follows a non-linear route
        // between departments, illustrating rework.
        const positions=[
          [0,0],
          [100,0],
          [200,0],
          [200,105],
          [100,105],
          [0,105],
          [100,60],
          [200,105]
        ];

        const p=positions[b];

        move(root,".outro-envelope",
          p[0]+Math.sin(m.i*.8)*3,
          p[1]+Math.cos(m.i*.7)*2);

        // Each department completes a local action.
        // Completion stamps accumulate without
        // guaranteeing complaint resolution.
        for(let j=0;j<6;j++) {
          visible(
            root,
            `.outro-stamp-${j}`,
            b>=2&&j<=Math.min(5,m.i-7)
          );
        }

        // Sorting gates redirect the complaint.
        [
          ".outro-gate-a",
          ".outro-gate-b",
          ".outro-gate-c",
          ".outro-gate-d"
        ].forEach((selector,j) => {

          const el=one(root,selector);
          if(!el) return;

          const angle=
            Math.sin(m.i*.85+j)*23;

          el.style.transform=
            `rotate(${angle}deg)`;

          const origins=[
            "113px 171px",
            "227px 171px",
            "113px 275px",
            "227px 275px"
          ];

          el.style.transformOrigin=origins[j];
        });

        // Departmental compartments remain busy even
        // when no one owns the complete outcome.
        for(let j=0;j<6;j++) {
          const el=one(root,`.outro-dept-${j}`);
          if(!el) continue;

          el.style.opacity=
            b===7?.3:j===m.i%6?1:.65;

          el.style.transform=
            j===m.i%6
              ?"translateY(-3px)"
              :"translateY(0px)";
        }

        // The final redesign removes the confusing
        // mechanical branches from the foreground.
        style(root,".outro-conveyors",{
          opacity:b>=6?.15:1
        });

        style(root,".outro-gates",{
          opacity:b>=6?.15:1
        });

        draw(root,".outro-resolution-line",
          b>=6
            ?Math.max(0,250-(m.i-23)*65)
            :250);

        // Ownership becomes the visual centre.
        const owner=one(root,".outro-owner");

        if(owner) {
          owner.style.transform=
            `scale(${b===6
              ?1+Math.sin(m.i*.7)*.035
              :1})`;

          owner.style.transformOrigin="170px 174px";
        }

        microMotion(root,m.i,m.n,"track");

      },instant);
    }

    REG.W1OUTRO={
      build(el) {
        stopTweens(root);

        root=mount(
          el,
          "W1OUTRO",
          body,
          "A guest complaint circulates among six departments, accumulating local completion stamps without resolution, before a single accountable owner connects the case to its outcome"
        );

        this.reset();
      },

      step(i,n) {
        apply(i,n);
      },

      reset() {
        stopTweens(root);
        apply(0,28,true);
      }
    };
  }

  // ==========================================================
  // FINAL INTEGRATION
  // ==========================================================

  // Register introductory and concluding section IDs again
  // in case course.js was populated after initial evaluation.
  registerMissingSectionIds();

  // Keep a single shared stylesheet. Each scene uses its
  // own vls-w01-<sectionId> root class, so look-specific
  // recolouring can be applied by the host application.
  //
  // Scene roots:
  //
  // .vls-w01-W1INTRO
  // .vls-w01-O1a
  // .vls-w01-O1b
  // .vls-w01-O2a
  // .vls-w01-O2b
  // .vls-w01-O3a
  // .vls-w01-O3b
  // .vls-w01-O4a
  // .vls-w01-O4b
  // .vls-w01-O4c
  // .vls-w01-W1OUTRO
  //
  // Public registry:
  //
  // window.VL_SCENES.W1INTRO
  // window.VL_SCENES.O1a
  // window.VL_SCENES.O1b
  // window.VL_SCENES.O2a
  // window.VL_SCENES.O2b
  // window.VL_SCENES.O3a
  // window.VL_SCENES.O3b
  // window.VL_SCENES.O4a
  // window.VL_SCENES.O4b
  // window.VL_SCENES.O4c
  // window.VL_SCENES.W1OUTRO
  //
  // Every registered scene implements:
  //
  // build(el)
  // step(i,n)
  // reset()
  //
  // Narration moment indices are zero-based.
  //
  // All scene graphics are inline SVG.
  // No external image assets are required.
  // No external CSS file is required.
  // GSAP is optional.
  // Reduced-motion preference is respected.
  //
  // END OF WEEK 1 CINEMATIC SCENE REGISTRY

})();
