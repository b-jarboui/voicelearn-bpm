// OPER621 — Week 7: The Launch Pad Phase
// Original cinematic scenes, synchronised with narration.
//
// SECTION FILMOGRAPHY
// O1a — The Launch Pad: a strategic map becomes a launch runway.
// O1b — Five Decisions: a mechanical project ignition console.
// O1c — The Handover: a physical project capsule assembled for transfer.
// O2a — The Selection Compass: value and feasibility in tension.
// O2b — Four Candidates: four miniature operational worlds.
// O2c — The Decision Tribunal: competing evidence and conditional approval.
// O3a — The Boundary: a camera follows causes beyond reception.
// O3b — The Coalition: a living stakeholder influence field.
// O3c — The Negotiation: two departmental territories become one journey.
// O3d — The Baseline: a measurement laboratory.
// O3e — The Decision Record: a one-page architectural blueprint.
// O3f — The Forum: an evidence-driven discussion amphitheatre.
//
// Runtime:
// window.VL_SCENES[secId] = { build(el), step(i,n), reset() }
//
// Section IDs use the actual Week 7 runtime keys:
// O1a, O1b, O1c, O2a, O2b, O2c,
// O3a, O3b, O3c, O3d, O3e, O3f.
//
// IMPORTANT:
// Parts 1–4 are contiguous slices of ONE JavaScript file.
// Concatenate them in order without adding wrappers.
// The final IIFE closes in Part 4.

(() => {
  "use strict";

  window.VL_SCENES = window.VL_SCENES || {};

  const REG = window.VL_SCENES;

  const C = {
    navy: "#1f4e79",
    orange: "#c0502a",
    paper: "#fbf8f1",
    ink: "#1b2a3a",
    blue: "#dbe7f2",
    green: "#317c61",
    pale: "#edf3f7",
    gold: "#d7a45c"
  };

  const NS = "http://www.w3.org/2000/svg";

  const clamp = (v, a, b) =>
    Math.max(a, Math.min(b, v));

  const reduced = () => {
    try {
      return window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    } catch (_) {
      return false;
    }
  };

  const safeIndex = (i, n) => {
    const total = Number.isFinite(Number(n))
      ? Math.max(1, Math.floor(Number(n)))
      : 1;

    const index = Number.isFinite(Number(i))
      ? Math.floor(Number(i))
      : 0;

    return clamp(index, 0, total - 1);
  };

  const R = (x, y, w, h, fill, rx = 0, extra = "") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}"
      rx="${rx}" fill="${fill}" ${extra}/>`;

  const O = (x, y, radius, fill, extra = "") =>
    `<circle cx="${x}" cy="${y}" r="${radius}"
      fill="${fill}" ${extra}/>`;

  const P = (d, stroke, width = 2, extra = "") =>
    `<path d="${d}" fill="none" stroke="${stroke}"
      stroke-width="${width}" stroke-linecap="round"
      stroke-linejoin="round" ${extra}/>`;

  const T = (
    x, y, value, size = 12,
    color = C.ink, extra = ""
  ) =>
    `<text x="${x}" y="${y}" text-anchor="middle"
      font-size="${size}" fill="${color}" ${extra}>${value}</text>`;

  const SVG = (content) =>
    `<svg xmlns="${NS}" viewBox="0 0 340 390"
      preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="Animated BPM learning scene">
      ${content}
    </svg>`;

  const person = (x, y, color = C.navy, scale = 1) =>
    `<g transform="translate(${x} ${y}) scale(${scale})">
      ${O(0, -13, 9, color)}
      <path d="M-16 14 Q-16 -2 0 -2 Q16 -2 16 14Z"
        fill="${color}"/>
    </g>`;

  const check = (x, y, color = C.green) =>
    P(
      `M${x - 11} ${y} l8 8 17 -20`,
      color, 5
    );

  const arrow = (x, y, color = C.navy) =>
    P(
      `M${x - 9} ${y - 7} L${x} ${y}
       L${x - 9} ${y + 7}`,
      color, 3
    );

  const gear = (x, y, radius, color) => {
    const teeth = Array.from({ length: 10 }, (_, j) => {
      const a = j * 36;
      return `<rect x="${x - 5}" y="${y - radius - 7}"
        width="10" height="14" rx="2"
        fill="${color}"
        transform="rotate(${a} ${x} ${y})"/>`;
    }).join("");

    return `<g>
      ${teeth}
      ${O(x, y, radius, color)}
      ${O(x, y, radius * .58, C.paper)}
      ${O(x, y, radius * .23, color)}
    </g>`;
  };

  const set = (root, selector, props) => {
    if (!root) return;

    root.querySelectorAll(selector).forEach(el => {
      Object.entries(props).forEach(([key, value]) => {
        if (key === "text") {
          el.textContent = String(value);
        } else if (key === "attr") {
          Object.entries(value).forEach(([a, b]) =>
            el.setAttribute(a, String(b))
          );
        } else {
          el.style[key] = String(value);
        }
      });
    });
  };

  const show = (root, selector, visible) =>
    set(root, selector, {
      opacity: visible ? "1" : "0"
    });

  const move = (root, selector, x = 0, y = 0, scale = 1) =>
    set(root, selector, {
      transform:
        `translate(${x}px,${y}px) scale(${scale})`
    });

  const rotate = (root, selector, angle) =>
    set(root, selector, {
      transform: `rotate(${angle}deg)`
    });

  const label = (root, value) =>
    set(root, ".vls-w07-status", { text: value });

  const progress = (root, i, n) => {
    const total = Math.max(1, Number(n) || 1);
    const percentage = total <= 1
      ? 100
      : 100 * safeIndex(i, total) / (total - 1);

    set(root, ".vls-w07-progress", {
      width: `${percentage}%`
    });
  };

  // The progress mechanism is deliberately separate from the
  // scene's visual movement. Every narration index also changes
  // physical geometry, not merely a caption or progress indicator.

  const mount = (el, id, artwork, heading, initial) => {
    if (!el) return null;

    const root = document.createElement("div");

    root.className =
      `vls-w07 vls-w07-${id}`;

    root.innerHTML = `
      <div class="vls-w07-heading">${heading}</div>
      <div class="vls-w07-art">
        ${SVG(artwork)}
      </div>
      <div class="vls-w07-footer">
        <span class="vls-w07-status">${initial}</span>
      </div>
      <div class="vls-w07-progress"></div>
    `;

    el.replaceChildren(root);

    return root;
  };

  // Deterministic animation is important for replay, skipping,
  // backwards navigation, and returning to an earlier section.
  //
  // Every step reconstructs its intended state from the narration
  // index. No step depends on a previous step having executed.

  const instant = (root, fn) => {
    if (!root) return;

    root.classList.add("vls-w07-instant");

    fn();

    // Flush the initial state before enabling transitions.
    void root.offsetHeight;

    if (!reduced()) {
      root.classList.remove("vls-w07-instant");
    }
  };

  const animate = (root, fn) => {
    if (!root) return;

    root.classList.toggle(
      "vls-w07-instant",
      reduced()
    );

    fn();
  };

  // A small positional change accompanies every narration moment.
  // This is NOT a substitute for scene-specific state changes:
  // each scene also changes its own objects, connections, lights,
  // camera, mechanisms, or evidence.
  //
  // The index-dependent offset makes consecutive moments distinct,
  // including sentences that share the same conceptual chapter.

  const microMotion = (root, i, n, amplitude = 3) => {
    const index = safeIndex(i, n);

    const x = Math.sin(index * 1.73) * amplitude;
    const y = Math.cos(index * 1.17) * amplitude * .65;

    set(root, ".vls-w07-camera", {
      transform: `translate(${x}px,${y}px)`
    });

    progress(root, index, n);
  };

  // Optional GSAP support.
  //
  // CSS transitions remain the default, so every scene works
  // without GSAP. When available, GSAP animates the scene's
  // dedicated moving accent. Existing tweens are killed before
  // replacement to keep narration seeking deterministic.

  const gsapAccent = (root, selector, index) => {
    if (!root || reduced() || !window.gsap) return;

    const node = root.querySelector(selector);
    if (!node) return;

    try {
      window.gsap.killTweensOf(node);

      window.gsap.fromTo(
        node,
        { opacity: .35 },
        {
          opacity: 1,
          duration: .65,
          ease: "power2.out",
          overwrite: true
        }
      );
    } catch (_) {
      // Native transitions remain available.
    }
  };

  // ============================================================
  // ONE EMBEDDED STYLESHEET
  // ============================================================

  if (!document.getElementById("vl-sc-w07")) {
    const style = document.createElement("style");

    style.id = "vl-sc-w07";

    style.textContent = `
      .vls-w07 {
        --navy:${C.navy};
        --orange:${C.orange};
        --paper:${C.paper};
        --ink:${C.ink};
        --blue:${C.blue};
        --green:${C.green};

        position:relative;
        width:100%;
        height:100%;
        min-height:0;
        overflow:hidden;
        box-sizing:border-box;
        isolation:isolate;
        background:transparent;
        color:var(--ink);
        font-family:inherit;
      }

      .vls-w07 *,
      .vls-w07 *::before,
      .vls-w07 *::after {
        box-sizing:border-box;
      }

      .vls-w07-heading {
        position:absolute;
        z-index:2;
        top:1%;
        left:5%;
        right:5%;
        text-align:center;
        color:var(--navy);
        font-size:clamp(10px,2.8vw,13px);
        font-weight:800;
        letter-spacing:.12em;
        text-transform:uppercase;
        pointer-events:none;
      }

      .vls-w07-art {
        position:absolute;
        inset:5% 0 9%;
        display:flex;
        justify-content:center;
        align-items:center;
        overflow:hidden;
      }

      .vls-w07-art svg {
        display:block;
        width:100%;
        height:100%;
        max-width:440px;
        max-height:100%;
        overflow:visible;
        font-family:inherit;
      }

      .vls-w07 svg text {
        font-family:inherit;
        font-weight:650;
        letter-spacing:.03em;
        pointer-events:none;
      }

      .vls-w07-footer {
        position:absolute;
        bottom:3%;
        left:5%;
        right:5%;
        min-height:19px;
        display:flex;
        align-items:center;
        justify-content:center;
        color:var(--navy);
        font-size:clamp(10px,2.8vw,13px);
        font-weight:750;
        letter-spacing:.035em;
        text-align:center;
        pointer-events:none;
      }

      .vls-w07-progress {
        position:absolute;
        bottom:0;
        left:0;
        width:0;
        height:3px;
        background:var(--orange);
        transition:width .6s ease;
      }

      .vls-w07 svg .vls-w07-motion {
        transition:
          transform .82s cubic-bezier(.22,.75,.2,1),
          opacity .65s ease,
          fill .65s ease,
          stroke .65s ease,
          stroke-dashoffset .85s ease;
      }

      .vls-w07 svg .vls-w07-camera {
        transition:transform .85s ease;
      }

      .vls-w07 svg .vls-w07-draw {
        stroke-dasharray:500;
        stroke-dashoffset:500;
        transition:
          stroke-dashoffset .95s ease,
          opacity .7s ease;
      }

      .vls-w07 svg .vls-w07-fade {
        transition:
          opacity .7s ease,
          transform .85s ease;
      }

      .vls-w07 svg .vls-w07-rotate {
        transform-box:fill-box;
        transform-origin:center;
        transition:transform 1s cubic-bezier(.2,.7,.2,1);
      }

      .vls-w07 svg .vls-w07-scale {
        transform-box:fill-box;
        transform-origin:center;
        transition:
          transform .9s cubic-bezier(.2,.75,.2,1),
          opacity .65s ease;
      }

      .vls-w07 svg .vls-w07-glow {
        filter:drop-shadow(0 4px 7px rgba(31,78,121,.14));
      }

      .vls-w07.vls-w07-instant *,
      .vls-w07.vls-w07-instant *::before,
      .vls-w07.vls-w07-instant *::after {
        transition:none!important;
        animation:none!important;
      }

      /* O1a: Launch runway and strategic map. */

      .vls-w07-O1a .a-runway {
        stroke-dasharray:370;
        stroke-dashoffset:370;
        transition:stroke-dashoffset 1s ease;
      }

      .vls-w07-O1a .a-rocket {
        transition:
          transform 1.05s cubic-bezier(.2,.8,.2,1),
          opacity .7s ease;
      }

      .vls-w07-O1a .a-map {
        transform-origin:170px 188px;
        transition:
          transform 1s ease,
          opacity .8s ease;
      }

      .vls-w07-O1a .a-cloud {
        transition:
          transform 1.1s ease,
          opacity .7s ease;
      }

      /* O1b: Five mechanical ignition controls. */

      .vls-w07-O1b .b-dial {
        transform-box:fill-box;
        transform-origin:center;
        transition:transform .95s ease;
      }

      .vls-w07-O1b .b-lever {
        transform-origin:170px 230px;
        transition:transform .8s ease;
      }

      .vls-w07-O1b .b-power {
        transition:
          opacity .7s ease,
          transform .9s ease;
      }

      .vls-w07-O1b .b-cable {
        stroke-dasharray:180;
        stroke-dashoffset:180;
        transition:stroke-dashoffset .9s ease;
      }

      /* O1c: Handover capsule and delivery rail. */

      .vls-w07-O1c .c-capsule {
        transition:
          transform 1.05s cubic-bezier(.2,.8,.2,1),
          opacity .7s ease;
      }

      .vls-w07-O1c .c-component {
        transform-box:fill-box;
        transform-origin:center;
        transition:
          opacity .7s ease,
          transform .9s ease;
      }

      .vls-w07-O1c .c-gate {
        transition:
          transform .9s ease,
          opacity .7s ease;
      }

      .vls-w07-O1c .c-track {
        stroke-dasharray:310;
        stroke-dashoffset:310;
        transition:stroke-dashoffset 1s ease;
      }

      @media(max-width:375px) {
        .vls-w07-heading {
          font-size:10px;
          letter-spacing:.09em;
        }

        .vls-w07-footer {
          font-size:11px;
        }

        .vls-w07-art {
          inset:6% 0 9%;
        }
      }

      @media(prefers-reduced-motion:reduce) {
        .vls-w07 *,
        .vls-w07 *::before,
        .vls-w07 *::after {
          transition:none!important;
          animation:none!important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  // ============================================================
  // SCENE 01 — O1a
  // THE STRATEGIC LAUNCH RUNWAY
  //
  // A bird's-eye process map contains several possible routes.
  // Only one becomes a launch runway. A physical project capsule
  // moves from strategic intention toward Understand.
  //
  // Unlike a flowchart, this is an animated spatial metaphor:
  // map surveying, route illumination, capacity restriction,
  // ignition, lift-off, and transfer.
  // ============================================================

  {
    let root = null;

    const artwork = `
      <defs>
        <linearGradient id="w07a-sky" x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="${C.blue}" stop-opacity=".75"/>
          <stop offset="1" stop-color="${C.paper}" stop-opacity="0"/>
        </linearGradient>

        <linearGradient id="w07a-rocket" x1="0" x2="1">
          <stop stop-color="${C.navy}"/>
          <stop offset="1" stop-color="${C.green}"/>
        </linearGradient>
      </defs>

      <g class="vls-w07-camera">

        ${O(170, 185, 144, "url(#w07a-sky)")}

        <g class="a-map">
          ${R(30, 85, 280, 213, C.paper, 15,
            `stroke="${C.blue}" stroke-width="2"`)}
          ${P("M44 130 H296 M44 190 H296 M44 250 H296",
            C.blue, 2)}
          ${P("M95 95 V287 M170 95 V287 M245 95 V287",
            C.blue, 2)}

          <g class="vls-w07-motion a-route-0">
            ${P("M60 118 Q105 165 160 120 T280 155",
              C.orange, 5, 'stroke-dasharray="7 7"')}
          </g>

          <g class="vls-w07-motion a-route-1">
            ${P("M60 220 Q120 270 175 210 T285 235",
              C.navy, 5, 'stroke-dasharray="7 7"')}
          </g>

          <g class="vls-w07-motion a-route-2">
            ${P("M80 275 Q155 200 265 115",
              C.green, 5, 'stroke-dasharray="7 7"')}
          </g>

          ${[
            [62,118],[278,155],[60,220],
            [285,235],[80,275],[265,115]
          ].map(([x,y],j) =>
            O(x,y,8,j%3===0?C.orange:C.navy)
          ).join("")}
        </g>

        <g class="a-runway-group">
          ${P("M170 315 V75", C.navy, 22,
            'opacity=".12"')}
          ${P("M170 315 V75", C.navy, 2,
            'stroke-dasharray="9 13"')}
          <path class="a-runway"
            d="M170 315 V75"
            fill="none"
            stroke="${C.green}"
            stroke-width="9"
            stroke-linecap="round"/>
        </g>

        <g class="vls-w07-motion a-signal" opacity="0">
          ${O(170, 190, 44, C.paper,
            `stroke="${C.orange}" stroke-width="3"`)}
          ${T(170, 186, "ONE", 19, C.navy)}
          ${T(170, 207, "TEAM", 17, C.orange)}
        </g>

        <g class="a-rocket vls-w07-motion">
          <path d="M170 235 Q143 260 146 287 L159 279 L170 289 L181 279 L194 287 Q197 260 170 235Z"
            fill="url(#w07a-rocket)"/>

          ${O(170, 259, 10, C.paper)}
          ${O(170, 259, 5, C.blue)}

          <path d="M158 281 L170 306 L182 281"
            fill="${C.orange}"/>

          <g class="a-flame vls-w07-motion" opacity="0">
            <path d="M161 293 Q170 337 179 293Z"
              fill="${C.gold}"/>
            <path d="M166 293 Q170 318 174 293Z"
              fill="${C.orange}"/>
          </g>
        </g>

        <g class="a-cloud vls-w07-motion" opacity="0">
          ${O(125, 299, 20, C.blue)}
          ${O(150, 309, 26, C.blue)}
          ${O(188, 310, 26, C.blue)}
          ${O(215, 299, 20, C.blue)}
        </g>

        <g class="a-destination vls-w07-motion" opacity="0">
          ${O(170, 70, 32, C.paper,
            `stroke="${C.green}" stroke-width="3"`)}
          ${check(170, 75)}
          ${T(170, 117, "UNDERSTAND", 12, C.green)}
        </g>

        <g class="a-compass vls-w07-motion" opacity="0">
          ${O(278, 69, 24, C.paper,
            `stroke="${C.navy}" stroke-width="2"`)}
          ${P("M278 50 L284 70 L278 88 L272 70Z",
            C.orange, 3)}
        </g>

        <g class="a-board vls-w07-motion" opacity="0">
          ${R(37, 324, 266, 42, C.paper, 12,
            `stroke="${C.navy}" stroke-width="2"`)}
          ${T(170, 350, "SIX-MONTH REVIEW", 13, C.navy)}
        </g>
      </g>
    `;

    const states = [
      "Many possible routes",
      "Strategy gives direction",
      "Map the processes",
      "One delivery team",
      "Choose the starting point",
      "Define the commitment",
      "Secure the launch",
      "Measure the outcome",
      "Prepare to investigate"
    ];

    function render(i, n) {
      if (!root) return;

      const index = safeIndex(i, n);
      const p = n <= 1 ? 0 : index / (n - 1);
      const stage = Math.min(8, Math.floor(p * 9));

      animate(root, () => {
        microMotion(root, index, n, 3);

        label(root, states[stage]);

        set(root, ".a-map", {
          transform:
            `scale(${1 - Math.min(.12, p * .12)})`,
          opacity: stage >= 6 ? ".34" : "1"
        });

        show(root, ".a-compass",
          stage >= 1 && stage <= 4);

        show(root, ".a-route-0",
          stage >= 1 && stage <= 3);

        show(root, ".a-route-1",
          stage >= 2 && stage <= 3);

        show(root, ".a-route-2",
          stage >= 2 && stage <= 4);

        show(root, ".a-signal",
          stage >= 3 && stage <= 5);

        set(root, ".a-runway", {
          strokeDashoffset:
            stage >= 4
              ? String(Math.max(0,370-(stage-3)*105))
              : "370"
        });

        const rocketY =
          stage < 5 ? 0 :
          stage === 5 ? -26 :
          stage === 6 ? -91 :
          stage === 7 ? -155 : -196;

        const drift = Math.sin(index * 1.4) * 3;

        set(root, ".a-rocket", {
          transform:
            `translate(${drift}px,${rocketY}px)`
        });

        show(root, ".a-flame",
          stage >= 5 && stage <= 7);

        show(root, ".a-cloud", stage >= 5);

        move(
          root, ".a-cloud",
          0,
          stage >= 6 ? 12 : 0,
          stage >= 6 ? 1.3 : 1
        );

        show(root, ".a-destination", stage >= 7);
        show(root, ".a-board", stage >= 3);

        set(root, ".a-signal", {
          transform:
            `translateY(${Math.sin(index * 1.2)*4}px)`
        });
      });

      gsapAccent(root, ".a-rocket", index);
    }

    REG.O1a = {
      build(el) {
        root = mount(
          el, "O1a", artwork,
          "FROM STRATEGY TO ACTION",
          states[0]
        );

        this.reset();
      },

      step(i, n) {
        render(i, n);
      },

      reset() {
        if (!root) return;

        instant(root, () => render(0, 30));
      }
    };
  }

  // ============================================================
  // SCENE 02 — O1b
  // THE FIVE-DECISION IGNITION CONSOLE
  //
  // A physical control panel must be activated before the
  // improvement project can begin.
  //
  // The five controls represent:
  // 1. Process choice
  // 2. Scope
  // 3. People
  // 4. Measurement
  // 5. Benefits and risks
  //
  // Distinct from O1a:
  // no strategic map, no runway, no rocket.
  // The visual language is mechanical and tactile.
  // ============================================================

  {
    let root = null;

    const controls = [
      { x:78, y:123, name:"PROCESS", color:C.navy },
      { x:170, y:123, name:"SCOPE", color:C.orange },
      { x:262, y:123, name:"PEOPLE", color:C.green },
      { x:116, y:219, name:"MEASURE", color:C.navy },
      { x:224, y:219, name:"RISKS", color:C.orange }
    ];

    const artwork = `
      <defs>
        <linearGradient id="w07b-metal" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="${C.blue}"/>
          <stop offset=".48" stop-color="#ffffff"/>
          <stop offset="1" stop-color="#b7cad9"/>
        </linearGradient>
      </defs>

      <g class="vls-w07-camera">

        ${R(26, 57, 288, 275,
          "url(#w07b-metal)", 24,
          `stroke="${C.navy}" stroke-width="3"`)}
        ${R(38, 70, 264, 248, C.paper, 17)}

        ${T(170, 91, "PROJECT IGNITION", 14, C.navy)}

        ${controls.map((c,j) => `
          <g class="b-control-${j} vls-w07-motion">

            ${O(c.x,c.y,29,C.blue,
              `stroke="${c.color}" stroke-width="2"`)}
            ${O(c.x,c.y,22,C.paper)}

            <g class="b-dial b-dial-${j}">
              ${P(
                `M${c.x} ${c.y}
                 L${c.x} ${c.y-16}`,
                c.color,4
              )}
              ${O(c.x,c.y,5,c.color)}
            </g>

            <g class="b-led-${j} vls-w07-motion"
              opacity="0">
              ${O(c.x+20,c.y-19,6,C.green)}
            </g>

            ${T(c.x,c.y+43,c.name,11,C.ink)}
          </g>
        `).join("")}

        <g class="b-cables">
          ${controls.map((c,j) => `
            <path class="b-cable b-cable-${j}"
              d="M${c.x} ${c.y+28} Q${c.x} 276 170 281"
              fill="none"
              stroke="${c.color}"
              stroke-width="3"
              stroke-linecap="round"/>
          `).join("")}
        </g>

        <g class="b-lever vls-w07-motion">
          ${R(147,267,46,25,C.navy,8)}
          ${O(170,277,9,C.paper)}
          ${P("M170 277 L170 235",C.orange,8)}
          ${O(170,231,13,C.orange)}
        </g>

        <g class="b-power vls-w07-motion" opacity="0">
          ${O(170,278,31,C.green,
            `fill-opacity=".15"
             stroke="${C.green}" stroke-width="3"`)}
          ${check(170,280)}
        </g>

        <g class="b-warning vls-w07-motion" opacity="0">
          ${O(170,277,31,C.orange,
            'fill-opacity=".15"')}
          ${T(170,288,"!",31,C.orange)}
        </g>

        <g class="b-ready vls-w07-motion" opacity="0">
          ${R(69,344,202,30,C.green,15)}
          ${T(170,364,"READY TO INVESTIGATE",12,C.paper)}
        </g>

        <g class="b-current vls-w07-motion">
          ${O(170,281,6,C.gold)}
        </g>

      </g>
    `;

    const states = [
      "A project needs decisions",
      "Choose the process",
      "Agree the boundary",
      "Secure the people",
      "Define the measure",
      "Examine benefits and risks",
      "Check the connections",
      "Resolve missing commitments",
      "Ignite the project"
    ];

    function render(i,n) {
      if (!root) return;

      const index = safeIndex(i,n);
      const p = n <= 1 ? 0 : index/(n-1);
      const stage = Math.min(8,Math.floor(p*9));

      animate(root, () => {
        microMotion(root,index,n,2);

        label(root,states[stage]);

        const engaged = clamp(stage,0,5);

        controls.forEach((c,j) => {
          const active = j < engaged;

          set(root,`.b-control-${j}`,{
            opacity:active?"1":".55",
            transform:
              `translateY(${active?0:5}px)`
          });

          rotate(
            root,
            `.b-dial-${j}`,
            active ? 135+(index%3)*7 : -45
          );

          show(root,`.b-led-${j}`,active);

          set(root,`.b-cable-${j}`,{
            strokeDashoffset:active?"0":"180"
          });
        });

        rotate(
          root,
          ".b-lever",
          stage >= 8 ? 48 :
          stage >= 6 ? 16 : -22
        );

        show(root,".b-warning",
          stage===6 || stage===7);

        show(root,".b-power",stage>=8);
        show(root,".b-ready",stage>=8);

        move(
          root,
          ".b-current",
          Math.sin(index*1.6)*10,
          stage>=6?-15:0,
          stage>=8?1.7:1
        );

        set(root,".b-current",{
          opacity:stage>=8?"0":"1"
        });
      });

      gsapAccent(root,".b-current",index);
    }

    REG.O1b = {
      build(el) {
        root = mount(
          el,"O1b",artwork,
          "FIVE DECISIONS · ONE PROJECT",
          states[0]
        );

        this.reset();
      },

      step(i,n) {
        render(i,n);
      },

      reset() {
        if (!root) return;

        instant(root,()=>render(0,32));
      }
    };
  }

  // ============================================================
  // SCENE 03 — O1c
  // THE PROJECT HANDOVER CAPSULE
  //
  // Five physical modules are loaded into a transparent capsule.
  // The completed capsule passes through an evidence gate and
  // travels to the Understand phase.
  //
  // The scene is about handover readiness, not project selection.
  //
  // Animation language:
  // assembly, docking, locking, inspection, transfer.
  // ============================================================

  {
    let root = null;

    const modules = [
      { x:63,  y:92,  color:C.navy,   name:"CHOICE" },
      { x:170, y:73,  color:C.orange, name:"SCOPE" },
      { x:277, y:92,  color:C.green,  name:"PEOPLE" },
      { x:86,  y:288, color:C.navy,   name:"MEASURES" },
      { x:254, y:288, color:C.orange, name:"RISKS" }
    ];

    const artwork = `
      <defs>
        <linearGradient id="w07c-glass" x1="0" y1="0" x2="1">
          <stop stop-color="${C.blue}" stop-opacity=".75"/>
          <stop offset=".5" stop-color="${C.paper}"
            stop-opacity=".35"/>
          <stop offset="1" stop-color="${C.blue}"
            stop-opacity=".7"/>
        </linearGradient>
      </defs>

      <g class="vls-w07-camera">

        ${R(26,122,288,146,C.blue,22,
          'fill-opacity=".38"')}

        ${P("M26 195 H314",C.navy,3,
          'stroke-dasharray="6 9" opacity=".4"')}

        <path class="c-track"
          d="M28 195 H313"
          fill="none"
          stroke="${C.green}"
          stroke-width="6"
          stroke-linecap="round"/>

        <g class="c-capsule vls-w07-motion">

          ${R(109,145,122,98,
            "url(#w07c-glass)",29,
            `stroke="${C.navy}" stroke-width="3"`)}

          ${R(121,157,98,74,C.paper,20,
            'fill-opacity=".65"')}

          ${O(170,194,22,C.paper,
            `stroke="${C.navy}" stroke-width="2"`)}

          <g class="c-capsule-core">
            ${T(170,191,"LAUNCH",11,C.navy)}
            ${T(170,206,"PAD",12,C.navy)}
          </g>

          <g class="c-seal vls-w07-motion" opacity="0">
            ${O(170,194,25,C.paper,
              `stroke="${C.green}" stroke-width="3"`)}
            ${check(170,198)}
          </g>

        </g>

        ${modules.map((m,j) => `
          <g class="c-component c-component-${j}">
            ${O(m.x,m.y,22,C.paper,
              `stroke="${m.color}" stroke-width="3"`)}
            ${O(m.x,m.y,12,m.color,
              'fill-opacity=".17"')}
            ${T(m.x,m.y+5,j+1,16,m.color)}
            ${T(m.x,m.y+38,m.name,11,C.ink)}
          </g>
        `).join("")}

        <g class="c-gate vls-w07-motion">
          ${R(282,135,16,121,C.orange,5)}
          ${R(277,127,26,17,C.navy,5)}
          ${T(290,119,"CHECK",11,C.navy)}
        </g>

        <g class="c-beam vls-w07-motion" opacity="0">
          ${R(285,146,4,99,C.green,2,
            'fill-opacity=".55"')}
        </g>

        <g class="c-destination vls-w07-motion" opacity="0">
          ${O(290,195,31,C.paper,
            `stroke="${C.green}" stroke-width="3"`)}
          ${check(290,198)}
          ${T(270,284,"UNDERSTAND",12,C.green)}
        </g>

        <g class="c-inspection vls-w07-motion" opacity="0">
          ${O(170,194,62,"none",
            `stroke="${C.orange}" stroke-width="3"
             stroke-dasharray="6 8"`)}
        </g>

        <g class="c-missing vls-w07-motion" opacity="0">
          ${O(170,194,33,C.paper,
            `stroke="${C.orange}" stroke-width="3"`)}
          ${T(170,205,"?",32,C.orange)}
        </g>

        <g class="c-locks vls-w07-motion" opacity="0">
          ${P("M133 164 H207",C.green,4)}
          ${P("M133 224 H207",C.green,4)}
        </g>

        <g class="c-shadow vls-w07-motion">
          <ellipse cx="170" cy="253" rx="66" ry="8"
            fill="${C.navy}" opacity=".12"/>
        </g>

      </g>
    `;

    const states = [
      "Prepare the handover",
      "Identify the process",
      "Lock the boundary",
      "Confirm accountability",
      "Attach the measures",
      "Record the risks",
      "Inspect the evidence",
      "Resolve the gaps",
      "Transfer to Understand"
    ];

    function render(i,n) {
      if (!root) return;

      const index = safeIndex(i,n);
      const p = n <= 1 ? 0 : index/(n-1);
      const stage = Math.min(8,Math.floor(p*9));

      animate(root,()=>{
        microMotion(root,index,n,2);

        label(root,states[stage]);

        modules.forEach((m,j)=>{
          const active = stage >= j+1;

          const tx = active
            ? (170-m.x)*.68
            : 0;

          const ty = active
            ? (194-m.y)*.68
            : 0;

          set(root,`.c-component-${j}`,{
            opacity:active?".15":"1",
            transform:
              `translate(${tx}px,${ty}px)
               scale(${active?.55:1})`
          });
        });

        const capsuleX =
          stage<6 ? 0 :
          stage===6 ? 15 :
          stage===7 ? 37 : 111;

        set(root,".c-capsule",{
          transform:
            `translate(${capsuleX}px,
             ${Math.sin(index*1.2)*2}px)`
        });

        set(root,".c-track",{
          strokeDashoffset:
            stage>=6
              ? String(Math.max(0,310-(stage-5)*105))
              : "310"
        });

        show(root,".c-inspection",
          stage===6 || stage===7);

        show(root,".c-missing",stage===6);
        show(root,".c-beam",stage>=6);

        show(root,".c-locks",stage>=5);
        show(root,".c-seal",stage>=7);

        show(root,".c-destination",stage>=8);

        move(
          root,
          ".c-gate",
          0,
          stage>=8?-48:0
        );

        move(
          root,
          ".c-shadow",
          capsuleX,
          0,
          stage>=8?.7:1
        );
      });

      gsapAccent(root,".c-capsule",index);
    }

    REG.O1c = {
      build(el) {
        root = mount(
          el,"O1c",artwork,
          "A HANDOVER THE TEAM CAN USE",
          states[0]
        );

        this.reset();
      },

      step(i,n) {
        render(i,n);
      },

      reset() {
        if (!root) return;

        instant(root,()=>render(0,31));
      }
    };
  }

  // CONTINUES IN PART 2 OF 4
  // Next: O2a, O2b, O2c.
  // ============================================================
  // SCENE 04 — O2a
  // THE SELECTION COMPASS
  //
  // A large navigational compass seeks a viable starting point.
  // Four forces pull its needle: strategic value, deliverability,
  // sponsor commitment, and visible results.
  //
  // The compass first swings toward attractive but unsuitable
  // options, then settles on a balanced direction.
  //
  // Distinct from the previous scenes:
  // no launch runway, control console, or handover capsule.
  //
  // Animation:
  // needle rotation, competing magnetic fields, moving weights,
  // progressive calibration, and final directional alignment.
  // ============================================================

  {
    let root = null;

    const artwork = `
      <defs>
        <radialGradient id="w07d-field">
          <stop stop-color="${C.blue}" stop-opacity=".85"/>
          <stop offset="1" stop-color="${C.paper}"
            stop-opacity="0"/>
        </radialGradient>
      </defs>

      <g class="vls-w07-camera">

        ${O(170,191,150,"url(#w07d-field)")}

        ${O(170,191,125,"none",
          `stroke="${C.navy}" stroke-width="2"
           stroke-dasharray="4 8" opacity=".35"`)}

        ${O(170,191,101,C.paper,
          `stroke="${C.navy}" stroke-width="5"`)}

        ${O(170,191,89,C.blue,
          'fill-opacity=".45"')}

        <g class="d-compass-ring vls-w07-motion">
          ${Array.from({length:24},(_,j)=>{
            const a=j*Math.PI/12;
            const x1=170+93*Math.cos(a);
            const y1=191+93*Math.sin(a);
            const x2=170+(j%3===0?106:100)*Math.cos(a);
            const y2=191+(j%3===0?106:100)*Math.sin(a);
            return P(
              `M${x1} ${y1} L${x2} ${y2}`,
              j%3===0?C.navy:C.blue,
              j%3===0?3:2
            );
          }).join("")}
        </g>

        <g class="d-needle vls-w07-motion">
          <path d="M170 99 L187 191 L170 177 L153 191Z" fill="${C.orange}"/>
          <path d="M170 283 L187 191 L170 205 L153 191Z" fill="${C.navy}"/>
        </g>

        ${O(170,191,16,C.paper,
          `stroke="${C.navy}" stroke-width="3"`)}
        ${O(170,191,6,C.orange)}

        <g class="d-force d-force-0 vls-w07-motion">
          ${O(170,51,30,C.paper,
            `stroke="${C.navy}" stroke-width="2"`)}
          ${T(170,48,"STRATEGIC",10,C.navy)}
          ${T(170,61,"VALUE",11,C.navy)}
        </g>

        <g class="d-force d-force-1 vls-w07-motion">
          ${O(307,191,30,C.paper,
            `stroke="${C.orange}" stroke-width="2"`)}
          ${T(307,188,"DELIVERY",10,C.orange)}
          ${T(307,201,"CAPACITY",10,C.orange)}
        </g>

        <g class="d-force d-force-2 vls-w07-motion">
          ${O(170,331,30,C.paper,
            `stroke="${C.green}" stroke-width="2"`)}
          ${T(170,328,"SPONSOR",11,C.green)}
          ${T(170,341,"SUPPORT",10,C.green)}
        </g>

        <g class="d-force d-force-3 vls-w07-motion">
          ${O(33,191,30,C.paper,
            `stroke="${C.navy}" stroke-width="2"`)}
          ${T(33,188,"VISIBLE",11,C.navy)}
          ${T(33,201,"RESULTS",10,C.navy)}
        </g>

        <g class="d-magnetic-lines">
          ${[
            "M170 82 V117",
            "M276 191 H241",
            "M170 300 V265",
            "M64 191 H99"
          ].map((d,j)=>`
            <path class="d-line d-line-${j} vls-w07-draw"
              d="${d}" fill="none"
              stroke="${j%2?C.orange:C.green}"
              stroke-width="4"
              stroke-linecap="round"/>
          `).join("")}
        </g>

        <g class="d-warning vls-w07-motion" opacity="0">
          ${O(170,191,54,C.paper,
            `stroke="${C.orange}" stroke-width="3"`)}
          ${T(170,188,"HIGH VALUE",12,C.orange)}
          ${T(170,206,"LOW CAPACITY",11,C.orange)}
        </g>

        <g class="d-balance vls-w07-motion" opacity="0">
          ${O(170,191,51,C.paper,
            `stroke="${C.green}" stroke-width="4"`)}
          ${check(170,193)}
          ${T(170,227,"BALANCED",12,C.green)}
        </g>

        <g class="d-direction vls-w07-motion" opacity="0">
          ${P("M102 300 Q170 281 238 300",
            C.green,4)}
          ${T(170,318,"DEFENSIBLE CHOICE",12,C.green)}
        </g>

      </g>
    `;

    const states = [
      "Find a viable direction",
      "Follow strategic value",
      "Test delivery capacity",
      "Avoid trivial projects",
      "Secure sponsor support",
      "Demand visible results",
      "Expose the trade-offs",
      "Balance the criteria",
      "Choose responsibly"
    ];

    function render(i,n) {
      if (!root) return;

      const index=safeIndex(i,n);
      const p=n<=1?0:index/(n-1);
      const stage=Math.min(8,Math.floor(p*9));

      const angles=[
        -45,-8,76,145,191,267,38,312,315
      ];

      animate(root,()=>{
        microMotion(root,index,n,2);

        label(root,states[stage]);

        rotate(
          root,
          ".d-needle",
          angles[stage]+Math.sin(index*1.3)*4
        );

        rotate(
          root,
          ".d-compass-ring",
          stage*9
        );

        for(let j=0;j<4;j++){
          const active=
            stage>=j+1 || stage>=7;

          show(root,`.d-force-${j}`,true);

          move(
            root,
            `.d-force-${j}`,
            0,0,
            active?1.08:.88
          );

          set(root,`.d-force-${j}`,{
            opacity:active?"1":".45"
          });

          set(root,`.d-line-${j}`,{
            strokeDashoffset:active?"0":"500"
          });
        }

        show(root,".d-warning",
          stage===2 || stage===3 || stage===6);

        show(root,".d-balance",stage>=7);
        show(root,".d-direction",stage>=8);

        set(root,".d-needle",{
          opacity:stage>=7?".22":"1"
        });
      });

      gsapAccent(root,".d-needle",index);
    }

    REG.O2a={
      build(el){
        root=mount(
          el,"O2a",artwork,
          "VALUE MUST MEET FEASIBILITY",
          states[0]
        );
        this.reset();
      },

      step(i,n){
        render(i,n);
      },

      reset(){
        if(!root)return;
        instant(root,()=>render(0,30));
      }
    };
  }

  // ============================================================
  // SCENE 05 — O2b
  // FOUR MINIATURE OPERATIONAL WORLDS
  //
  // Qasr's four competing candidates appear as four different
  // physical environments, not four identical cards.
  //
  // Upper left: hotel reception and arriving guest.
  // Upper right: corporate invoice and broken account link.
  // Lower left: digital record and regulatory clock.
  // Lower right: housekeeping room and release mechanism.
  //
  // A travelling inspection spotlight moves between them.
  // The scene finishes with all four candidates visible.
  //
  // Motion:
  // guest movement, invoice disruption, deadline clock,
  // room release, camera focus, and selection beam.
  // ============================================================

  {
    let root=null;

    const artwork=`
      <defs>
        <radialGradient id="w07e-spot">
          <stop stop-color="${C.gold}" stop-opacity=".34"/>
          <stop offset="1" stop-color="${C.gold}"
            stop-opacity="0"/>
        </radialGradient>
      </defs>

      <g class="vls-w07-camera">

        <!-- Physical architectural separation, not text cards. -->
        ${P("M170 65 V340",C.blue,2)}
        ${P("M25 200 H315",C.blue,2)}

        <!-- WORLD 1: GUEST ARRIVAL -->
        <g class="e-world-0 vls-w07-motion">

          ${P("M38 169 H151",C.navy,3)}
          ${R(49,99,91,64,C.paper,5,
            `stroke="${C.navy}" stroke-width="2"`)}
          ${R(59,108,71,37,C.blue,3)}

          ${R(100,138,47,11,C.orange,4)}
          ${R(107,149,33,20,C.navy,3)}

          <g class="e-receptionist">
            ${person(120,128,C.green,.6)}
          </g>

          <g class="e-guest vls-w07-motion">
            ${person(55,151,C.navy,.75)}
            ${R(67,150,12,17,C.orange,2)}
          </g>

          <g class="e-arrival-error vls-w07-motion"
            opacity="0">
            ${O(120,104,13,C.orange)}
            ${T(120,110,"!",17,C.paper)}
          </g>

          ${T(92,83,"GUEST ARRIVAL",12,C.navy)}
        </g>

        <!-- WORLD 2: CORPORATE BILLING -->
        <g class="e-world-1 vls-w07-motion">

          ${R(204,98,91,72,C.paper,6,
            `stroke="${C.navy}" stroke-width="2"`)}
          ${P("M216 115 H280 M216 126 H272 M216 137 H283",C.blue,4)}

          ${R(218,148,45,10,C.orange,3)}

          <g class="e-invoice vls-w07-motion">
            ${R(222,110,56,48,C.paper,3,
              `stroke="${C.orange}" stroke-width="2"`)}
            ${P("M230 123 H270 M230 134 H261",
              C.navy,2)}
            ${T(250,150,"AED",12,C.orange)}
          </g>

          <g class="e-broken-link vls-w07-motion"
            opacity="0">
            ${P("M196 164 L214 153",C.orange,4)}
            ${P("M224 147 L242 136",C.orange,4)}
            ${P("M214 153 L223 148",C.paper,6)}
          </g>

          ${T(250,83,"CORPORATE BILLING",11,C.navy)}
        </g>

        <!-- WORLD 3: DIGITAL GUEST RECORD -->
        <g class="e-world-2 vls-w07-motion">

          ${R(57,226,79,83,C.navy,9)}
          ${R(65,234,63,58,C.paper,4)}

          ${O(96,251,11,C.blue)}
          ${P("M81 273 H111 M81 281 H104",
            C.navy,3)}

          <g class="e-record-scan vls-w07-motion">
            ${R(68,239,57,4,C.green,2,
              'fill-opacity=".65"')}
          </g>

          <g class="e-clock vls-w07-motion">
            ${O(133,295,22,C.paper,
              `stroke="${C.orange}" stroke-width="3"`)}
            ${P("M133 295 V281 M133 295 L145 301",
              C.orange,3)}
          </g>

          <g class="e-deadline vls-w07-motion"
            opacity="0">
            ${T(96,321,"JANUARY",11,C.orange)}
          </g>

          ${T(95,216,"DIGITAL RECORD",12,C.navy)}
        </g>

        <!-- WORLD 4: HOUSEKEEPING ROOM RELEASE -->
        <g class="e-world-3 vls-w07-motion">

          ${R(201,236,106,72,C.paper,5,
            `stroke="${C.navy}" stroke-width="2"`)}
          ${R(211,249,86,44,C.blue,4)}

          ${R(214,269,80,23,C.paper,5)}
          ${R(214,261,80,11,C.navy,3)}
          ${R(219,255,20,12,C.paper,4)}
          ${R(268,255,20,12,C.paper,4)}

          <g class="e-door vls-w07-motion">
            ${R(291,227,20,73,C.navy,3)}
            ${O(295,266,3,C.gold)}
          </g>

          <g class="e-room-ready vls-w07-motion"
            opacity="0">
            ${O(252,251,20,C.paper,
              `stroke="${C.green}" stroke-width="3"`)}
            ${check(252,254)}
          </g>

          ${T(254,216,"ROOM RELEASE",12,C.navy)}
        </g>

        <!-- Travelling inspection lens -->
        <g class="e-spotlight vls-w07-motion">
          ${O(92,128,72,"url(#w07e-spot)")}
          ${O(92,128,70,"none",
            `stroke="${C.orange}" stroke-width="3"
             stroke-dasharray="8 8"`)}
        </g>

        <!-- Single available team -->
        <g class="e-team vls-w07-motion" opacity="0">
          ${R(91,350,158,30,C.navy,15)}
          ${T(170,370,"ONE DELIVERY TEAM",12,C.paper)}
        </g>

        <g class="e-question vls-w07-motion" opacity="0">
          ${O(170,194,24,C.paper,
            `stroke="${C.orange}" stroke-width="3"`)}
          ${T(170,204,"?",28,C.orange)}
        </g>

      </g>
    `;

    const states=[
      "Four genuine candidates",
      "Inspect guest arrival",
      "Trace booking handoffs",
      "Inspect corporate billing",
      "Account losses matter",
      "Inspect digital records",
      "Mandatory deadline",
      "Inspect room release",
      "Compare all four"
    ];

    function render(i,n){
      if(!root)return;

      const index=safeIndex(i,n);
      const p=n<=1?0:index/(n-1);
      const stage=Math.min(8,Math.floor(p*9));

      const focus=[
        [92,128],
        [92,128],
        [92,128],
        [250,128],
        [250,128],
        [96,269],
        [96,269],
        [254,269],
        [170,195]
      ];

      animate(root,()=>{
        microMotion(root,index,n,1.5);

        label(root,states[stage]);

        const [fx,fy]=focus[stage];

        move(
          root,
          ".e-spotlight",
          fx-92,
          fy-128,
          stage===8?1.5:1
        );

        for(let j=0;j<4;j++){
          const active=
            stage===8 ||
            (j===0&&stage<=2) ||
            (j===1&&stage>=3&&stage<=4) ||
            (j===2&&stage>=5&&stage<=6) ||
            (j===3&&stage===7);

          set(root,`.e-world-${j}`,{
            opacity:active?"1":".35",
            transform:
              `scale(${active?1.03:.96})`
          });
        }

        move(
          root,
          ".e-guest",
          stage>=1?26+Math.sin(index)*5:0,
          0
        );

        show(root,".e-arrival-error",stage===2);

        move(
          root,
          ".e-invoice",
          stage>=3?Math.sin(index*1.5)*5:0,
          stage===4?8:0
        );

        show(root,".e-broken-link",stage===4);

        move(
          root,
          ".e-record-scan",
          0,
          stage>=5
            ? (index%5)*8
            : 0
        );

        rotate(
          root,
          ".e-clock",
          stage>=5?index*9:0
        );

        show(root,".e-deadline",stage===6);

        move(
          root,
          ".e-door",
          stage>=7?12:0,
          0,
          stage>=7?.8:1
        );

        show(root,".e-room-ready",stage>=7);

        show(root,".e-team",stage===8);
        show(root,".e-question",stage===8);
      });

      gsapAccent(root,".e-spotlight",index);
    }

    REG.O2b={
      build(el){
        root=mount(
          el,"O2b",artwork,
          "FOUR CANDIDATES · ONE TEAM",
          states[0]
        );
        this.reset();
      },

      step(i,n){
        render(i,n);
      },

      reset(){
        if(!root)return;
        instant(root,()=>render(0,30));
      }
    };
  }

  // ============================================================
  // SCENE 06 — O2c
  // THE DECISION TRIBUNAL
  //
  // A cinematic circular decision chamber.
  //
  // Four candidate tokens enter the chamber.
  // A moving evidence beam examines each proposal.
  // The compliance obligation is separated from the BPM choice.
  // Guest arrival receives conditional approval, while deferred
  // work remains visibly present.
  //
  // This is not a scoring table or ranking-card template.
  //
  // Motion:
  // rotating chamber, sliding candidate tokens, evidence beam,
  // compliance diversion, conditional seal, deferred orbit.
  // ============================================================

  {
    let root=null;

    const candidates=[
      {x:92,y:133,name:"ARRIVAL",color:C.green},
      {x:248,y:133,name:"BILLING",color:C.orange},
      {x:92,y:266,name:"RECORD",color:C.navy},
      {x:248,y:266,name:"ROOMS",color:C.navy}
    ];

    const artwork=`
      <defs>
        <radialGradient id="w07f-chamber">
          <stop stop-color="${C.blue}" stop-opacity=".7"/>
          <stop offset="1" stop-color="${C.paper}"
            stop-opacity="0"/>
        </radialGradient>
      </defs>

      <g class="vls-w07-camera">

        ${O(170,196,150,"url(#w07f-chamber)")}

        <g class="f-orbit vls-w07-motion">
          ${O(170,196,130,"none",
            `stroke="${C.navy}" stroke-width="2"
             stroke-dasharray="5 9" opacity=".35"`)}
          ${O(170,196,105,"none",
            `stroke="${C.green}" stroke-width="2"
             stroke-dasharray="3 8" opacity=".35"`)}
        </g>

        <g class="f-platform">
          ${O(170,196,57,C.paper,
            `stroke="${C.navy}" stroke-width="4"`)}
          ${O(170,196,44,C.blue,
            'fill-opacity=".6"')}
          ${T(170,187,"BPM",17,C.navy)}
          ${T(170,206,"START",15,C.navy)}
        </g>

        ${candidates.map((c,j)=>`
          <g class="f-candidate-${j} vls-w07-motion">
            ${O(c.x,c.y,32,C.paper,
              `stroke="${c.color}" stroke-width="3"`)}
            ${O(c.x,c.y,24,c.color,
              'fill-opacity=".12"')}
            ${T(c.x,c.y+4,j+1,21,c.color)}
            ${T(c.x,c.y+48,c.name,11,C.ink)}
          </g>
        `).join("")}

        <g class="f-evidence vls-w07-motion">
          ${P("M170 196 L92 133",C.orange,4,
            'stroke-dasharray="7 8"')}
          ${O(92,133,38,"none",
            `stroke="${C.orange}" stroke-width="2"
             stroke-dasharray="5 7"`)}
        </g>

        <g class="f-compliance vls-w07-motion"
          opacity="0">
          ${P("M92 266 Q39 284 43 338",
            C.orange,4)}
          ${O(43,338,20,C.paper,
            `stroke="${C.orange}" stroke-width="3"`)}
          ${T(43,344,"!",22,C.orange)}
          ${T(95,363,"MANDATORY",11,C.orange)}
        </g>

        <g class="f-seal vls-w07-motion" opacity="0">
          ${O(170,196,52,C.paper,
            `stroke="${C.green}" stroke-width="4"`)}
          ${check(170,193)}
          ${T(170,230,"CONDITIONAL",11,C.green)}
        </g>

        <g class="f-objection vls-w07-motion" opacity="0">
          ${O(248,133,41,"none",
            `stroke="${C.orange}" stroke-width="3"`)}
          ${T(248,130,"2 LOST",12,C.orange)}
          ${T(248,145,"ACCOUNTS",11,C.orange)}
        </g>

        <g class="f-deferral vls-w07-motion" opacity="0">
          ${P("M110 324 Q170 349 230 324",
            C.navy,3)}
          ${T(170,344,"DEFER · RECONSIDER",11,C.navy)}
        </g>

        <g class="f-conditions vls-w07-motion" opacity="0">
          ${P("M119 73 H221",C.green,4)}
          ${O(119,73,6,C.green)}
          ${O(170,73,6,C.green)}
          ${O(221,73,6,C.green)}
          ${T(170,58,"CONFIRM READINESS",12,C.green)}
        </g>

      </g>
    `;

    const states=[
      "Enter the decision chamber",
      "Apply common criteria",
      "Examine corporate losses",
      "Test delivery feasibility",
      "Consider room release",
      "Protect compliance duties",
      "Examine guest arrival",
      "Record the deferrals",
      "Approve conditionally"
    ];

    function render(i,n){
      if(!root)return;

      const index=safeIndex(i,n);
      const p=n<=1?0:index/(n-1);
      const stage=Math.min(8,Math.floor(p*9));

      const inspected=[
        0,0,1,1,3,2,0,3,0
      ][stage];

      const target=candidates[inspected];

      animate(root,()=>{
        microMotion(root,index,n,2);

        label(root,states[stage]);

        rotate(
          root,
          ".f-orbit",
          stage*12+Math.sin(index)*3
        );

        candidates.forEach((c,j)=>{
          const active=j===inspected;

          move(
            root,
            `.f-candidate-${j}`,
            active?(170-c.x)*.14:0,
            active?(196-c.y)*.14:0,
            active?1.13:.9
          );

          set(root,`.f-candidate-${j}`,{
            opacity:active?"1":".55"
          });
        });

        const evidence=root.querySelector(".f-evidence");

        if(evidence){
          const path=evidence.querySelector("path");
          const ring=evidence.querySelector("circle");

          if(path){
            path.setAttribute(
              "d",
              `M170 196 L${target.x} ${target.y}`
            );
          }

          if(ring){
            ring.setAttribute("cx",target.x);
            ring.setAttribute("cy",target.y);
          }
        }

        rotate(
          root,
          ".f-evidence",
          Math.sin(index*1.1)*2
        );

        show(root,".f-objection",
          stage===2 || stage===3);

        show(root,".f-compliance",
          stage>=5);

        show(root,".f-deferral",
          stage>=7);

        show(root,".f-conditions",
          stage>=8);

        show(root,".f-seal",
          stage>=8);

        set(root,".f-platform",{
          opacity:stage>=8?".15":"1"
        });

        set(root,".f-evidence",{
          opacity:stage>=8?"0":"1"
        });
      });

      gsapAccent(root,".f-evidence",index);
    }

    REG.O2c={
      build(el){
        root=mount(
          el,"O2c",artwork,
          "THE DECISION MUST BE DEFENSIBLE",
          states[0]
        );
        this.reset();
      },

      step(i,n){
        render(i,n);
      },

      reset(){
        if(!root)return;
        instant(root,()=>render(0,31));
      }
    };
  }

  // CONTINUES IN PART 3 OF 4
  // Next: O3a, O3b, O3c.
  // ============================================================
  // SCENE 07 — O3a
  // THE BOUNDARY INVESTIGATION
  //
  // A travelling camera follows a guest through the real
  // arrival process. The visible reception counter is only
  // one part of the journey.
  //
  // Booking, room readiness, identity verification, reception,
  // and the guest experience form one connected operating system.
  //
  // Visual language:
  // architectural cutaway, moving guest, illuminated handoffs,
  // expanding investigation boundary, and hidden causes.
  //
  // Unlike O2b, this is one continuous process environment,
  // not four competing candidate environments.
  // ============================================================

  {
    let root = null;

    const artwork = `
      <defs>
        <linearGradient id="w07g-floor" x1="0" y1="0"
          x2="0" y2="1">
          <stop stop-color="${C.blue}" stop-opacity=".5"/>
          <stop offset="1" stop-color="${C.paper}"
            stop-opacity=".2"/>
        </linearGradient>
      </defs>

      <g class="vls-w07-camera">

        <!-- Continuous hotel operating environment -->
        ${R(19,105,302,184,C.paper,12,
          `stroke="${C.blue}" stroke-width="2"`)}

        ${R(20,249,300,40,
          "url(#w07g-floor)",3)}

        ${P("M20 249 H320",C.navy,3)}

        <!-- Booking system -->
        <g class="g-booking vls-w07-motion">
          ${R(32,127,56,78,C.navy,7)}
          ${R(38,135,44,52,C.paper,3)}
          ${P("M44 145 H76 M44 155 H71 M44 165 H74",C.blue,3)}
          ${O(60,177,5,C.green)}
          ${T(60,221,"BOOKING",11,C.navy)}
        </g>

        <!-- Housekeeping and room readiness -->
        <g class="g-room vls-w07-motion">
          ${R(100,122,60,83,C.paper,4,
            `stroke="${C.navy}" stroke-width="2"`)}
          ${R(106,130,48,68,C.blue,3)}
          ${R(112,161,36,22,C.paper,4)}
          ${R(112,156,36,9,C.navy,3)}
          ${O(149,166,3,C.orange)}
          ${T(130,221,"ROOM",11,C.navy)}
        </g>

        <!-- Identity verification -->
        <g class="g-identity vls-w07-motion">
          ${R(174,135,48,66,C.paper,6,
            `stroke="${C.orange}" stroke-width="2"`)}
          ${O(198,154,9,C.blue)}
          ${P("M185 175 H211 M185 184 H207",
            C.navy,3)}
          ${T(198,221,"IDENTITY",11,C.navy)}
        </g>

        <!-- Reception -->
        <g class="g-reception vls-w07-motion">
          ${R(241,157,64,13,C.orange,3)}
          ${R(249,170,48,33,C.navy,4)}
          ${person(272,148,C.green,.72)}
          ${T(272,221,"RECEPTION",11,C.navy)}
        </g>

        <!-- Guest moving across the operating environment -->
        <g class="g-guest vls-w07-motion">
          ${person(37,272,C.navy,.9)}
          ${R(49,266,12,17,C.orange,2)}
        </g>

        <!-- The full end-to-end journey -->
        <path class="g-journey vls-w07-draw"
          d="M37 295 H305"
          fill="none"
          stroke="${C.green}"
          stroke-width="5"
          stroke-linecap="round"/>

        ${[60,130,198,272].map((x,j)=>`
          <g class="g-handoff-${j} vls-w07-motion"
            opacity="0">
            ${O(x,295,10,C.paper,
              `stroke="${C.green}" stroke-width="3"`)}
            ${O(x,295,4,C.green)}
          </g>
        `).join("")}

        <!-- Initial narrow reception-only boundary -->
        <g class="g-boundary vls-w07-motion">
          ${R(232,111,82,119,"none",10,
            `stroke="${C.orange}" stroke-width="3"
             stroke-dasharray="7 7"`)}
        </g>

        <!-- Hidden causes -->
        <g class="g-cause-0 vls-w07-motion" opacity="0">
          ${O(60,113,16,C.orange)}
          ${T(60,119,"!",21,C.paper)}
        </g>

        <g class="g-cause-1 vls-w07-motion" opacity="0">
          ${O(130,112,16,C.orange)}
          ${T(130,118,"!",21,C.paper)}
        </g>

        <g class="g-cause-2 vls-w07-motion" opacity="0">
          ${O(198,112,16,C.orange)}
          ${T(198,118,"!",21,C.paper)}
        </g>

        <!-- Investigation lens -->
        <g class="g-lens vls-w07-motion">
          ${O(272,178,46,"none",
            `stroke="${C.orange}" stroke-width="3"`)}
          ${P("M305 210 L328 232",C.orange,7)}
        </g>

        <!-- Boundary expansion -->
        <g class="g-expanded vls-w07-motion" opacity="0">
          ${R(24,109,291,121,"none",12,
            `stroke="${C.green}" stroke-width="3"
             stroke-dasharray="9 7"`)}
        </g>

        <g class="g-endpoint vls-w07-motion" opacity="0">
          ${O(304,295,19,C.paper,
            `stroke="${C.green}" stroke-width="3"`)}
          ${check(304,298)}
        </g>

        <!-- Lower architectural baseline -->
        ${P("M25 326 H315",C.blue,2)}
        ${T(170,348,"ONE GUEST JOURNEY",13,C.navy)}

      </g>
    `;

    const states = [
      "Start at reception",
      "Follow the guest",
      "Inspect booking",
      "Check room readiness",
      "Verify identity",
      "Trace the handoffs",
      "Find upstream causes",
      "Expand the boundary",
      "Define the whole journey"
    ];

    function render(i,n) {
      if (!root) return;

      const index = safeIndex(i,n);
      const p = n <= 1 ? 0 : index/(n-1);
      const stage = Math.min(8,Math.floor(p*9));

      const positions = [
        272,245,60,130,198,245,130,198,304
      ];

      animate(root,()=>{
        microMotion(root,index,n,1.8);

        label(root,states[stage]);

        const x = positions[stage];

        move(
          root,
          ".g-lens",
          x-272,
          Math.sin(index*1.1)*3
        );

        const guestX = 37+Math.min(267,p*267);

        move(
          root,
          ".g-guest",
          guestX-37,
          Math.sin(index*1.5)*2
        );

        const boundary = root.querySelector(".g-boundary rect");

        if (boundary) {
          const expanded = stage >= 7;

          boundary.setAttribute(
            "x",expanded?"24":"232"
          );
          boundary.setAttribute(
            "width",expanded?"291":"82"
          );
        }

        show(root,".g-expanded",stage>=7);

        set(root,".g-journey",{
          strokeDashoffset:
            String(Math.max(0,500-stage*73))
        });

        for(let j=0;j<4;j++){
          show(
            root,
            `.g-handoff-${j}`,
            stage>=j+2
          );
        }

        show(root,".g-cause-0",
          stage>=2 && stage<=7);

        show(root,".g-cause-1",
          stage>=3 && stage<=7);

        show(root,".g-cause-2",
          stage>=4 && stage<=7);

        show(root,".g-endpoint",stage>=8);

        const emphasis = [
          ".g-booking",
          ".g-room",
          ".g-identity",
          ".g-reception"
        ];

        emphasis.forEach((selector,j)=>{
          const active =
            (j===0 && (stage===2 || stage===6)) ||
            (j===1 && stage===3) ||
            (j===2 && stage===4) ||
            (j===3 && stage<=1);

          move(
            root,
            selector,
            0,
            active?-5:0,
            active?1.07:1
          );
        });
      });

      gsapAccent(root,".g-lens",index);
    }

    REG.O3a = {
      build(el) {
        root = mount(
          el,"O3a",artwork,
          "THE PROCESS EXTENDS BEYOND RECEPTION",
          states[0]
        );
        this.reset();
      },

      step(i,n) {
        render(i,n);
      },

      reset() {
        if (!root) return;
        instant(root,()=>render(0,32));
      }
    };
  }

  // ============================================================
  // SCENE 08 — O3b
  // THE LIVING STAKEHOLDER FIELD
  //
  // A stakeholder coalition is visualised as a living influence
  // field, not an organisation chart.
  //
  // Operational participants occupy different positions around
  // the guest journey. Influence travels along connections.
  //
  // A missing sponsor, weak data ownership, or absent operational
  // representative leaves visible gaps in the network.
  //
  // Motion:
  // stakeholder arrival, network activation, missing-link
  // detection, influence redistribution, and coalition closure.
  // ============================================================

  {
    let root = null;

    const stakeholders = [
      {
        x:170,y:65,
        name:"SPONSOR",
        color:C.orange
      },
      {
        x:275,y:115,
        name:"FRONT DESK",
        color:C.navy
      },
      {
        x:285,y:250,
        name:"HOUSEKEEPING",
        color:C.green
      },
      {
        x:170,y:322,
        name:"DATA OWNER",
        color:C.navy
      },
      {
        x:55,y:250,
        name:"IT SUPPORT",
        color:C.orange
      },
      {
        x:65,y:115,
        name:"GUEST VOICE",
        color:C.green
      }
    ];

    const artwork = `
      <defs>
        <radialGradient id="w07h-network">
          <stop stop-color="${C.blue}" stop-opacity=".7"/>
          <stop offset="1" stop-color="${C.paper}"
            stop-opacity="0"/>
        </radialGradient>
      </defs>

      <g class="vls-w07-camera">

        ${O(170,193,146,"url(#w07h-network)")}

        <!-- The operating network -->
        <g class="h-connections">
          ${stakeholders.map((s,j)=>`
            <path class="h-link-${j} vls-w07-draw"
              d="M170 193 Q${(170+s.x)/2+Math.sin(j)*18} ${(193+s.y)/2} ${s.x} ${s.y}"
              fill="none"
              stroke="${s.color}"
              stroke-width="3"
              stroke-linecap="round"/>
          `).join("")}
        </g>

        <!-- Cross-functional relationships -->
        <g class="h-crosslinks">
          ${[
            [0,1],[1,2],[2,3],
            [3,4],[4,5],[5,0]
          ].map(([a,b],j)=>`
            <path class="h-cross-${j} vls-w07-draw"
              d="M${stakeholders[a].x} ${stakeholders[a].y} L${stakeholders[b].x} ${stakeholders[b].y}"
              fill="none"
              stroke="${C.blue}"
              stroke-width="2"
              stroke-dasharray="5 8"/>
          `).join("")}
        </g>

        <!-- Central guest journey -->
        <g class="h-core vls-w07-motion">
          ${O(170,193,52,C.paper,
            `stroke="${C.navy}" stroke-width="4"`)}
          ${O(170,193,41,C.blue,
            'fill-opacity=".55"')}
          ${person(170,192,C.navy,.95)}
          ${T(170,225,"GUEST JOURNEY",11,C.navy)}
        </g>

        <!-- Individual stakeholders -->
        ${stakeholders.map((s,j)=>`
          <g class="h-person-${j} vls-w07-motion">
            ${O(s.x,s.y,28,C.paper,
              `stroke="${s.color}" stroke-width="3"`)}
            ${person(s.x,s.y+6,s.color,.7)}
            ${T(
              s.x,
              s.y+(j===0?46:j===3?45:43),
              s.name,
              j===2?9:10,
              C.ink
            )}
          </g>
        `).join("")}

        <!-- Influence pulse -->
        <g class="h-pulse vls-w07-motion">
          ${O(170,193,9,C.orange,
            'fill-opacity=".75"')}
        </g>

        <!-- A missing operational connection -->
        <g class="h-gap vls-w07-motion" opacity="0">
          ${O(285,250,38,"none",
            `stroke="${C.orange}" stroke-width="3"
             stroke-dasharray="6 7"`)}
          ${O(285,250,12,C.orange)}
          ${T(285,256,"!",18,C.paper)}
        </g>

        <!-- Sponsor authority -->
        <g class="h-authority vls-w07-motion" opacity="0">
          ${P("M150 34 H190",C.orange,4)}
          ${P("M150 34 L158 24 L170 34 L182 24 L190 34",C.orange,3)}
        </g>

        <!-- Coalition closure -->
        <g class="h-coalition vls-w07-motion" opacity="0">
          ${O(170,193,78,"none",
            `stroke="${C.green}" stroke-width="4"
             stroke-dasharray="10 7"`)}
          ${T(170,270,"CONNECTED TEAM",12,C.green)}
        </g>

        <!-- Evidence channel -->
        <g class="h-evidence vls-w07-motion" opacity="0">
          ${P("M170 285 V300",C.green,4)}
          ${O(170,310,8,C.green)}
        </g>

      </g>
    `;

    const states = [
      "Build the coalition",
      "Identify the sponsor",
      "Bring in front desk",
      "Include housekeeping",
      "Assign data ownership",
      "Connect technical support",
      "Represent the guest",
      "Close the missing links",
      "One accountable coalition"
    ];

    function render(i,n) {
      if (!root) return;

      const index = safeIndex(i,n);
      const p = n<=1?0:index/(n-1);
      const stage = Math.min(8,Math.floor(p*9));

      const activation = [
        0,1,2,3,4,5,6,6,6
      ][stage];

      animate(root,()=>{
        microMotion(root,index,n,2);

        label(root,states[stage]);

        stakeholders.forEach((s,j)=>{
          const active = j<activation;

          set(root,`.h-person-${j}`,{
            opacity:active?"1":".38",
            transform:
              `scale(${active?1:.84})`
          });

          set(root,`.h-link-${j}`,{
            strokeDashoffset:
              active?"0":"500"
          });
        });

        for(let j=0;j<6;j++){
          set(root,`.h-cross-${j}`,{
            strokeDashoffset:
              stage>=7?"0":"500"
          });
        }

        show(root,".h-authority",stage>=1);

        show(root,".h-gap",
          stage>=3 && stage<=6);

        show(root,".h-coalition",stage>=7);
        show(root,".h-evidence",stage>=8);

        const pulseX =
          stage===0?170:
          stage===1?170:
          stage===2?275:
          stage===3?285:
          stage===4?170:
          stage===5?55:
          stage===6?65:170;

        const pulseY =
          stage===0?193:
          stage===1?65:
          stage===2?115:
          stage===3?250:
          stage===4?322:
          stage===5?250:
          stage===6?115:193;

        move(
          root,
          ".h-pulse",
          pulseX-170,
          pulseY-193,
          stage>=7?2:1
        );

        move(
          root,
          ".h-core",
          0,
          Math.sin(index*1.2)*2,
          stage>=7?1.08:1
        );

        set(root,".h-pulse",{
          opacity:stage>=8?".25":"1"
        });
      });

      gsapAccent(root,".h-pulse",index);
    }

    REG.O3b = {
      build(el) {
        root = mount(
          el,"O3b",artwork,
          "A COALITION AROUND THE JOURNEY",
          states[0]
        );
        this.reset();
      },

      step(i,n) {
        render(i,n);
      },

      reset() {
        if (!root) return;
        instant(root,()=>render(0,32));
      }
    };
  }

  // ============================================================
  // SCENE 09 — O3c
  // THE CROSS-DEPARTMENT NEGOTIATION
  //
  // Two operational territories begin separated by a gap.
  //
  // Reception seeks fast check-in. Housekeeping needs reliable
  // room-release information. Each department's local optimum
  // can undermine the end-to-end guest journey.
  //
  // Negotiation builds a shared bridge across the gap.
  //
  // The bridge becomes a common process commitment.
  //
  // Visual language:
  // opposing territories, competing clocks, bridge engineering,
  // a moving guest, and a shared operating rhythm.
  //
  // This is not a stakeholder network or decision tribunal.
  // ============================================================

  {
    let root = null;

    const artwork = `
      <defs>
        <linearGradient id="w07i-gap" x1="0" y1="0"
          x2="0" y2="1">
          <stop stop-color="${C.blue}" stop-opacity=".3"/>
          <stop offset="1" stop-color="${C.navy}"
            stop-opacity=".15"/>
        </linearGradient>
      </defs>

      <g class="vls-w07-camera">

        <!-- Two physically separated departments -->
        ${R(17,100,135,188,C.paper,12,
          `stroke="${C.navy}" stroke-width="3"`)}

        ${R(188,100,135,188,C.paper,12,
          `stroke="${C.green}" stroke-width="3"`)}

        ${R(152,103,36,185,
          "url(#w07i-gap)",0)}

        ${T(84,88,"FRONT DESK",13,C.navy)}
        ${T(255,88,"HOUSEKEEPING",12,C.green)}

        <!-- Reception environment -->
        <g class="i-frontdesk vls-w07-motion">
          ${R(36,183,98,13,C.orange,3)}
          ${R(45,196,80,35,C.navy,4)}
          ${person(83,173,C.navy,.85)}
          ${R(102,145,20,25,C.paper,3,
            `stroke="${C.navy}" stroke-width="2"`)}
        </g>

        <!-- Housekeeping environment -->
        <g class="i-housekeeping vls-w07-motion">
          ${R(207,162,97,62,C.blue,5)}
          ${R(215,184,81,32,C.paper,4)}
          ${R(215,175,81,13,C.green,3)}
          ${R(223,169,22,13,C.paper,3)}
          ${R(265,169,22,13,C.paper,3)}
          ${person(281,154,C.green,.65)}
        </g>

        <!-- Opposing performance clocks -->
        <g class="i-clock-left vls-w07-motion">
          ${O(84,131,25,C.paper,
            `stroke="${C.navy}" stroke-width="3"`)}
          ${P("M84 131 V115 M84 131 L98 138",
            C.navy,3)}
        </g>

        <g class="i-clock-right vls-w07-motion">
          ${O(255,131,25,C.paper,
            `stroke="${C.green}" stroke-width="3"`)}
          ${P("M255 131 V115 M255 131 L242 140",
            C.green,3)}
        </g>

        <!-- Two incompatible arrows -->
        <g class="i-opposition vls-w07-motion">
          ${P("M111 260 H165",C.navy,5)}
          ${arrow(166,260,C.navy)}
          ${P("M229 275 H176",C.green,5)}
          ${P("M185 268 L176 275 L185 282",C.green,3)}
        </g>

        <!-- The negotiation table -->
        <g class="i-table vls-w07-motion" opacity="0">
          ${R(125,247,90,20,C.orange,8)}
          ${R(139,267,12,33,C.navy,2)}
          ${R(189,267,12,33,C.navy,2)}
          ${O(148,233,11,C.navy)}
          ${O(192,233,11,C.green)}
        </g>

        <!-- Bridge constructed plank by plank -->
        <g class="i-bridge">
          ${Array.from({length:5},(_,j)=>`
            <g class="i-plank-${j} vls-w07-motion"
              opacity="0">
              ${R(
                145+j*10,
                195,
                10,
                19,
                j%2?C.green:C.navy,
                2
              )}
            </g>
          `).join("")}

          <g class="i-bridge-rail vls-w07-motion"
            opacity="0">
            ${P("M143 191 H198",C.orange,4)}
            ${P("M143 218 H198",C.orange,4)}
          </g>
        </g>

        <!-- Shared guest crossing -->
        <g class="i-guest vls-w07-motion">
          ${person(84,209,C.orange,.72)}
        </g>

        <!-- Common operating agreement -->
        <g class="i-agreement vls-w07-motion" opacity="0">
          ${O(170,195,31,C.paper,
            `stroke="${C.green}" stroke-width="3"`)}
          ${check(170,198)}
        </g>

        <!-- Unified rhythm -->
        <g class="i-shared-clock vls-w07-motion" opacity="0">
          ${O(170,325,31,C.paper,
            `stroke="${C.green}" stroke-width="3"`)}
          ${P("M170 325 V307 M170 325 L184 334",
            C.green,4)}
        </g>

        <g class="i-common-goal vls-w07-motion" opacity="0">
          ${P("M90 361 H250",C.green,4)}
          ${T(170,379,"ONE GUEST PROMISE",12,C.green)}
        </g>

        <!-- Persistent physical ground -->
        ${P("M25 301 H315",C.blue,2)}

      </g>
    `;

    const states = [
      "Two local priorities",
      "Reception wants speed",
      "Housekeeping needs certainty",
      "The handoff breaks",
      "Bring both sides together",
      "Negotiate the boundary",
      "Build a shared handoff",
      "Align the operating rhythm",
      "Commit to one journey"
    ];

    function render(i,n) {
      if (!root) return;

      const index=safeIndex(i,n);
      const p=n<=1?0:index/(n-1);
      const stage=Math.min(8,Math.floor(p*9));

      animate(root,()=>{
        microMotion(root,index,n,1.5);

        label(root,states[stage]);

        rotate(
          root,
          ".i-clock-left",
          stage>=1?index*12:0
        );

        rotate(
          root,
          ".i-clock-right",
          stage>=2?-index*9:0
        );

        move(
          root,
          ".i-frontdesk",
          stage>=3?-5:0,
          0
        );

        move(
          root,
          ".i-housekeeping",
          stage>=3?5:0,
          0
        );

        show(root,".i-opposition",
          stage<=4);

        show(root,".i-table",
          stage>=4 && stage<=6);

        for(let j=0;j<5;j++){
          show(
            root,
            `.i-plank-${j}`,
            stage>=5 && (
              stage>=7 ||
              j<Math.max(1,(stage-4)*3)
            )
          );
        }

        show(root,".i-bridge-rail",
          stage>=7);

        const guestX =
          stage<=3?0:
          stage===4?22:
          stage===5?42:
          stage===6?65:
          stage===7?92:171;

        move(
          root,
          ".i-guest",
          guestX,
          Math.sin(index*1.3)*3
        );

        show(root,".i-agreement",
          stage>=7);

        show(root,".i-shared-clock",
          stage>=7);

        rotate(
          root,
          ".i-shared-clock",
          stage>=7?index*8:0
        );

        show(root,".i-common-goal",
          stage>=8);

        set(root,".i-clock-left",{
          opacity:stage>=7?".3":"1"
        });

        set(root,".i-clock-right",{
          opacity:stage>=7?".3":"1"
        });
      });

      gsapAccent(root,".i-agreement",index);
    }

    REG.O3c = {
      build(el) {
        root = mount(
          el,"O3c",artwork,
          "NEGOTIATE THE WHOLE JOURNEY",
          states[0]
        );
        this.reset();
      },

      step(i,n) {
        render(i,n);
      },

      reset() {
        if (!root) return;
        instant(root,()=>render(0,32));
      }
    };
  }

  // CONTINUES IN PART 4 OF 4
  // Next: O3d, O3e, O3f and closing IIFE.
  // ============================================================
  // SCENE 10 — O3d
  // THE BASELINE MEASUREMENT LABORATORY
  //
  // A physical measurement laboratory investigates the current
  // guest-arrival experience.
  //
  // A stream of guest observations enters the laboratory.
  // Instruments measure elapsed time, handoff failures,
  // variation, and service reliability.
  //
  // The baseline is distinguished from a proposed target.
  // Measurement ownership and evidence quality become visible.
  //
  // Visual language:
  // instruments, gauges, observation conveyor, calibration,
  // measurement uncertainty, and target alignment.
  //
  // This is not a dashboard of static numbers or text cards.
  // ============================================================

  {
    let root = null;

    const artwork = `
      <defs>
        <linearGradient id="w07j-glass" x1="0" y1="0"
          x2="1" y2="1">
          <stop stop-color="${C.paper}"/>
          <stop offset=".55" stop-color="${C.blue}"
            stop-opacity=".65"/>
          <stop offset="1" stop-color="${C.paper}"/>
        </linearGradient>
      </defs>

      <g class="vls-w07-camera">

        <!-- Laboratory measurement bench -->
        ${R(20,257,300,22,C.navy,6)}
        ${R(36,279,15,71,C.navy,3)}
        ${R(289,279,15,71,C.navy,3)}

        <!-- Observation conveyor -->
        <g class="j-conveyor">
          ${R(28,225,284,24,C.blue,10,
            `stroke="${C.navy}" stroke-width="2"`)}
          ${Array.from({length:12},(_,j)=>
            O(43+j*23,237,5,C.paper)
          ).join("")}
        </g>

        <!-- Moving observed guest -->
        <g class="j-observation vls-w07-motion">
          ${person(52,213,C.orange,.72)}
          ${O(52,238,5,C.orange)}
        </g>

        <!-- Primary elapsed-time gauge -->
        <g class="j-time-gauge vls-w07-motion">
          ${O(108,112,69,C.paper,
            `stroke="${C.navy}" stroke-width="4"`)}
          ${O(108,112,57,C.blue,
            'fill-opacity=".45"')}

          ${Array.from({length:13},(_,j)=>{
            const a=(-210+j*20)*Math.PI/180;
            const x1=108+48*Math.cos(a);
            const y1=112+48*Math.sin(a);
            const x2=108+56*Math.cos(a);
            const y2=112+56*Math.sin(a);

            return P(
              `M${x1} ${y1} L${x2} ${y2}`,
              j%3===0?C.navy:C.blue,
              j%3===0?3:2
            );
          }).join("")}

          <g class="j-time-needle vls-w07-motion">
            ${P("M108 112 L108 69",C.orange,5)}
          </g>

          ${O(108,112,9,C.navy)}
          ${T(108,145,"ARRIVAL TIME",11,C.navy)}
        </g>

        <!-- Handoff failure instrument -->
        <g class="j-handoff-gauge vls-w07-motion">
          ${R(206,66,92,93,
            "url(#w07j-glass)",12,
            `stroke="${C.navy}" stroke-width="2"`)}

          ${T(252,85,"HANDOFFS",11,C.navy)}

          ${[0,1,2,3].map(j=>`
            <g class="j-handoff-${j} vls-w07-motion">
              ${O(220+j*21,114,7,C.blue,
                `stroke="${C.navy}" stroke-width="2"`)}
            </g>
          `).join("")}

          ${P("M220 114 H283",C.navy,2)}

          <g class="j-handoff-break vls-w07-motion"
            opacity="0">
            ${P("M247 106 L256 121",C.orange,4)}
            ${P("M256 106 L247 121",C.orange,4)}
          </g>

          ${T(252,144,"RELIABILITY",10,C.navy)}
        </g>

        <!-- Measurement distribution -->
        <g class="j-distribution vls-w07-motion">
          ${P("M191 198 H311",C.navy,2)}
          ${P("M191 198 V167",C.navy,2)}

          ${[14,22,30,18,25,12].map((h,j)=>`
            <rect class="j-bar-${j} vls-w07-motion"
              x="${198+j*18}"
              y="${198-h}"
              width="11"
              height="${h}"
              rx="2"
              fill="${j%2?C.orange:C.navy}"/>
          `).join("")}

          ${T(251,216,"VARIATION",11,C.navy)}
        </g>

        <!-- Baseline evidence tray -->
        <g class="j-baseline vls-w07-motion" opacity="0">
          ${R(36,291,113,42,C.paper,8,
            `stroke="${C.navy}" stroke-width="2"`)}
          ${T(92,308,"CURRENT",11,C.navy)}
          ${T(92,323,"BASELINE",12,C.navy)}
        </g>

        <!-- Target calibration tray -->
        <g class="j-target vls-w07-motion" opacity="0">
          ${R(191,291,113,42,C.paper,8,
            `stroke="${C.green}" stroke-width="2"`)}
          ${T(247,308,"FUTURE",11,C.green)}
          ${T(247,323,"TARGET",12,C.green)}
        </g>

        <!-- Measurement comparison -->
        <g class="j-comparison vls-w07-motion" opacity="0">
          ${P("M149 311 H191",C.green,4)}
          ${arrow(191,311,C.green)}
        </g>

        <!-- Data quality inspection -->
        <g class="j-calibration vls-w07-motion" opacity="0">
          ${O(170,188,32,C.paper,
            `stroke="${C.orange}" stroke-width="3"`)}
          ${P("M170 169 V188 L183 197",C.orange,3)}
          ${T(170,227,"CHECK DATA",11,C.orange)}
        </g>

        <!-- Ownership seal -->
        <g class="j-owner vls-w07-motion" opacity="0">
          ${O(170,367,16,C.paper,
            `stroke="${C.green}" stroke-width="3"`)}
          ${check(170,370)}
          ${T(170,345,"MEASURE OWNER",11,C.green)}
        </g>

      </g>
    `;

    const states = [
      "Observe the real process",
      "Define the measurement",
      "Collect arrival times",
      "Trace handoff failures",
      "Measure variation",
      "Check evidence quality",
      "Establish the baseline",
      "Set a credible target",
      "Assign measurement ownership"
    ];

    function render(i,n) {
      if (!root) return;

      const index=safeIndex(i,n);
      const p=n<=1?0:index/(n-1);
      const stage=Math.min(8,Math.floor(p*9));

      animate(root,()=>{
        microMotion(root,index,n,2);

        label(root,states[stage]);

        // The observed guest progresses through the laboratory.
        const travel=stage*28+Math.sin(index*1.3)*4;

        move(
          root,
          ".j-observation",
          travel,
          Math.sin(index*1.4)*2
        );

        // The time gauge samples different observations.
        const needleAngles=[
          -110,-65,-28,35,85,42,17,-36,-45
        ];

        rotate(
          root,
          ".j-time-needle",
          needleAngles[stage]+Math.sin(index)*4
        );

        // Handoff points activate as observations accumulate.
        for(let j=0;j<4;j++){
          const active=stage>=j+2;

          set(root,`.j-handoff-${j}`,{
            opacity:active?"1":".4",
            transform:
              `scale(${active?1.12:.85})`
          });
        }

        show(root,".j-handoff-break",
          stage===3 || stage===4);

        // Distribution changes physically with the sample.
        for(let j=0;j<6;j++){
          const variation=
            Math.sin(index*.9+j*1.4)*.25;

          const scale=
            stage>=4
              ? 1+variation
              : .3+(stage/8);

          set(root,`.j-bar-${j}`,{
            transform:
              `scaleY(${Math.max(.15,scale)})`,
            transformOrigin:"center bottom"
          });
        }

        show(root,".j-calibration",
          stage===5);

        show(root,".j-baseline",
          stage>=6);

        show(root,".j-target",
          stage>=7);

        show(root,".j-comparison",
          stage>=7);

        show(root,".j-owner",
          stage>=8);

        move(
          root,
          ".j-target",
          0,
          stage>=7?-4:0,
          stage>=8?1.06:1
        );
      });

      gsapAccent(root,".j-observation",index);
    }

    REG.O3d = {
      build(el) {
        root = mount(
          el,"O3d",artwork,
          "MEASURE BEFORE PROMISING",
          states[0]
        );
        this.reset();
      },

      step(i,n) {
        render(i,n);
      },

      reset() {
        if (!root) return;
        instant(root,()=>render(0,32));
      }
    };
  }

  // ============================================================
  // SCENE 11 — O3e
  // THE ONE-PAGE LAUNCH PAD BLUEPRINT
  //
  // The decision record is visualised as an architectural
  // blueprint being constructed in real time.
  //
  // Rather than displaying a static document, the scene shows
  // its underlying operating structure emerging:
  //
  // project choice -> process boundary -> accountable people
  // -> baseline and target -> evidence -> risks -> next action.
  //
  // Lines are drawn, structural beams are installed, and the
  // blueprint becomes a complete launch platform.
  //
  // Motion:
  // blueprint drafting, structural assembly, connection tracing,
  // inspection, and final approval.
  //
  // No paragraph text or narration sentence is placed inside
  // the illustration.
  // ============================================================

  {
    let root = null;

    const artwork = `
      <defs>
        <pattern id="w07k-grid"
          width="17" height="17"
          patternUnits="userSpaceOnUse">
          <path d="M17 0 H0 V17"
            fill="none"
            stroke="${C.blue}"
            stroke-width="1"/>
        </pattern>
      </defs>

      <g class="vls-w07-camera">

        <!-- Drafting surface -->
        ${R(30,38,280,311,C.paper,8,
          `stroke="${C.navy}" stroke-width="3"`)}

        ${R(38,46,264,295,
          "url(#w07k-grid)",3)}

        <!-- Drafting instrument -->
        <g class="k-pencil vls-w07-motion">
          <path d="M0 -24 L7 -13 L7 17 L0 28 L-7 17 L-7 -13Z"
            fill="${C.orange}"/>
          <path d="M-7 17 L0 28 L7 17"
            fill="${C.navy}"/>
          ${P("M-5 -13 H5",C.paper,2)}
        </g>

        <!-- Structural foundation -->
        <path class="k-foundation vls-w07-draw"
          d="M56 306 H284"
          fill="none"
          stroke="${C.navy}"
          stroke-width="6"
          stroke-linecap="round"/>

        <!-- Seven blueprint structural elements -->
        <g class="k-structure">

          <!-- Project selection -->
          <g class="k-element-0 vls-w07-motion"
            opacity="0">
            ${O(170,85,27,C.paper,
              `stroke="${C.navy}" stroke-width="3"`)}
            ${T(170,82,"PROJECT",11,C.navy)}
            ${T(170,96,"CHOICE",11,C.navy)}
          </g>

          <!-- Process boundary -->
          <g class="k-element-1 vls-w07-motion"
            opacity="0">
            ${R(61,139,93,52,C.paper,7,
              `stroke="${C.orange}" stroke-width="3"`)}
            ${T(107,160,"PROCESS",11,C.orange)}
            ${T(107,174,"BOUNDARY",11,C.orange)}
          </g>

          <!-- Accountability -->
          <g class="k-element-2 vls-w07-motion"
            opacity="0">
            ${R(186,139,93,52,C.paper,7,
              `stroke="${C.green}" stroke-width="3"`)}
            ${person(232,160,C.green,.56)}
            ${T(232,181,"OWNERS",11,C.green)}
          </g>

          <!-- Baseline -->
          <g class="k-element-3 vls-w07-motion"
            opacity="0">
            ${O(86,245,25,C.paper,
              `stroke="${C.navy}" stroke-width="3"`)}
            ${P("M72 251 L81 240 L90 247 L101 229",C.navy,3)}
            ${T(86,284,"BASELINE",11,C.navy)}
          </g>

          <!-- Target -->
          <g class="k-element-4 vls-w07-motion"
            opacity="0">
            ${O(170,245,25,C.paper,
              `stroke="${C.green}" stroke-width="3"`)}
            ${P("M157 254 L170 239 L183 229",
              C.green,4)}
            ${arrow(185,229,C.green)}
            ${T(170,284,"TARGET",11,C.green)}
          </g>

          <!-- Risks -->
          <g class="k-element-5 vls-w07-motion"
            opacity="0">
            ${O(254,245,25,C.paper,
              `stroke="${C.orange}" stroke-width="3"`)}
            ${T(254,254,"!",30,C.orange)}
            ${T(254,284,"RISKS",11,C.orange)}
          </g>

          <!-- Next phase -->
          <g class="k-element-6 vls-w07-motion"
            opacity="0">
            ${R(104,300,132,33,C.green,12)}
            ${T(170,321,"UNDERSTAND NEXT",12,C.paper)}
          </g>

        </g>

        <!-- Blueprint connecting beams -->
        <g class="k-connections">

          <path class="k-line-0 vls-w07-draw"
            d="M170 112 V128 H107 V139"
            fill="none"
            stroke="${C.navy}"
            stroke-width="3"/>

          <path class="k-line-1 vls-w07-draw"
            d="M170 128 H232 V139"
            fill="none"
            stroke="${C.navy}"
            stroke-width="3"/>

          <path class="k-line-2 vls-w07-draw"
            d="M107 191 V208 H86 V220"
            fill="none"
            stroke="${C.orange}"
            stroke-width="3"/>

          <path class="k-line-3 vls-w07-draw"
            d="M232 191 V208 H170 V220"
            fill="none"
            stroke="${C.green}"
            stroke-width="3"/>

          <path class="k-line-4 vls-w07-draw"
            d="M232 208 H254 V220"
            fill="none"
            stroke="${C.orange}"
            stroke-width="3"/>

          <path class="k-line-5 vls-w07-draw"
            d="M86 270 V292 H170 V300"
            fill="none"
            stroke="${C.navy}"
            stroke-width="3"/>

          <path class="k-line-6 vls-w07-draw"
            d="M254 270 V292 H170"
            fill="none"
            stroke="${C.green}"
            stroke-width="3"/>

        </g>

        <!-- Blueprint inspection magnifier -->
        <g class="k-inspection vls-w07-motion"
          opacity="0">
          ${O(170,190,37,"none",
            `stroke="${C.orange}" stroke-width="3"`)}
          ${P("M196 216 L220 241",C.orange,7)}
        </g>

        <!-- Approval stamp -->
        <g class="k-stamp vls-w07-motion" opacity="0">
          ${O(170,191,56,C.paper,
            `stroke="${C.green}" stroke-width="5"`)}
          ${check(170,190)}
          ${T(170,224,"LAUNCH READY",12,C.green)}
        </g>

        <!-- Blueprint edge annotations -->
        ${P("M47 61 H82",C.blue,2)}
        ${P("M258 61 H293",C.blue,2)}
        ${P("M47 328 H82",C.blue,2)}
        ${P("M258 328 H293",C.blue,2)}

        <g class="k-page-corner vls-w07-motion">
          ${P("M278 38 V64 H310",C.navy,2)}
        </g>

      </g>
    `;

    const states = [
      "Draft the decision record",
      "Name the chosen project",
      "Draw the process boundary",
      "Identify accountable people",
      "Specify the baseline",
      "Commit to a target",
      "Record risks and evidence",
      "Define the next action",
      "Inspect the complete record"
    ];

    function render(i,n) {
      if (!root) return;

      const index=safeIndex(i,n);
      const p=n<=1?0:index/(n-1);
      const stage=Math.min(8,Math.floor(p*9));

      const pencilPositions = [
        [65,74],
        [170,85],
        [107,159],
        [232,158],
        [86,245],
        [170,245],
        [254,245],
        [170,315],
        [170,190]
      ];

      animate(root,()=>{
        microMotion(root,index,n,1.5);

        label(root,states[stage]);

        const [px,py]=pencilPositions[stage];

        move(
          root,
          ".k-pencil",
          px,
          py,
          stage===8?.75:1
        );

        set(root,".k-pencil",{
          opacity:stage===8?"0":"1"
        });

        for(let j=0;j<7;j++){
          const active=stage>=j+1;

          show(
            root,
            `.k-element-${j}`,
            active
          );

          move(
            root,
            `.k-element-${j}`,
            0,
            active?0:12,
            active?1:.75
          );

          set(root,`.k-line-${j}`,{
            strokeDashoffset:
              active?"0":"500"
          });
        }

        set(root,".k-foundation",{
          strokeDashoffset:
            stage>=7?"0":
            String(Math.max(0,500-stage*55))
        });

        show(root,".k-inspection",stage===8);
        show(root,".k-stamp",stage===8);

        move(
          root,
          ".k-page-corner",
          stage>=8?-5:0,
          stage>=8?5:0
        );
      });

      gsapAccent(root,".k-pencil",index);
    }

    REG.O3e = {
      build(el) {
        root = mount(
          el,"O3e",artwork,
          "THE ONE-PAGE LAUNCH PAD RECORD",
          states[0]
        );
        this.reset();
      },

      step(i,n) {
        render(i,n);
      },

      reset() {
        if (!root) return;
        instant(root,()=>render(0,32));
      }
    };
  }

  // ============================================================
  // SCENE 12 — O3f
  // THE EVIDENCE FORUM
  //
  // The final section becomes an animated decision forum.
  //
  // Participants bring different arguments to a central
  // evidence arena. Claims must survive questions about
  // strategic value, scope, delivery capacity, measures,
  // ownership, and risk.
  //
  // The central proposal is refined through discussion.
  // A shared decision emerges, followed by a bridge toward
  // the next phase of BPM.
  //
  // Visual language:
  // amphitheatre, moving participants, converging evidence,
  // proposal refinement, and forward passage.
  //
  // This is deliberately different from:
  // - O2c's candidate decision tribunal
  // - O3b's stakeholder influence network
  // - O3e's architectural blueprint
  //
  // The forum is about evidence-based dialogue.
  // ============================================================

  {
    let root = null;

    const artwork = `
      <defs>
        <radialGradient id="w07l-stage">
          <stop stop-color="${C.blue}" stop-opacity=".7"/>
          <stop offset="1" stop-color="${C.paper}"
            stop-opacity="0"/>
        </radialGradient>
      </defs>

      <g class="vls-w07-camera">

        <!-- Curved amphitheatre seating -->
        ${P("M28 117 Q170 5 312 117",
          C.blue,15)}
        ${P("M38 140 Q170 39 302 140",
          C.blue,11)}
        ${P("M49 163 Q170 80 291 163",
          C.blue,7)}

        <!-- Circular evidence arena -->
        ${O(170,215,120,"url(#w07l-stage)")}

        ${O(170,215,91,C.paper,
          `stroke="${C.navy}" stroke-width="3"`)}
        ${O(170,215,78,C.blue,
          'fill-opacity=".35"')}

        <!-- Central physical proposal -->
        <g class="l-proposal vls-w07-motion">
          ${R(127,180,86,73,C.paper,10,
            `stroke="${C.navy}" stroke-width="3"`)}
          ${P("M141 197 H199 M141 209 H191 M141 221 H199",C.blue,4)}
          ${O(170,238,8,C.orange)}
        </g>

        <!-- Participants in an amphitheatre -->
        <g class="l-participants">
          ${[
            [68,115,C.navy],
            [120,74,C.green],
            [220,74,C.orange],
            [272,115,C.navy],
            [49,247,C.green],
            [291,247,C.orange]
          ].map(([x,y,color],j)=>`
            <g class="l-person-${j} vls-w07-motion">
              ${O(x,y,25,C.paper,
                `stroke="${color}" stroke-width="2"`)}
              ${person(x,y+5,color,.65)}
            </g>
          `).join("")}
        </g>

        <!-- Six evidence beams -->
        <g class="l-evidence-beams">
          ${[
            [68,115],
            [120,74],
            [220,74],
            [272,115],
            [49,247],
            [291,247]
          ].map(([x,y],j)=>`
            <path class="l-beam-${j} vls-w07-draw"
              d="M${x} ${y} Q${(x+170)/2} ${(y+215)/2-12} 170 215"
              fill="none"
              stroke="${j%2?C.green:C.orange}"
              stroke-width="3"
              stroke-linecap="round"/>
          `).join("")}
        </g>

        <!-- Arguments represented as physical tokens -->
        <g class="l-argument l-argument-0 vls-w07-motion"
          opacity="0">
          ${O(91,163,19,C.paper,
            `stroke="${C.navy}" stroke-width="2"`)}
          ${T(91,168,"V",16,C.navy)}
        </g>

        <g class="l-argument l-argument-1 vls-w07-motion"
          opacity="0">
          ${O(137,124,19,C.paper,
            `stroke="${C.green}" stroke-width="2"`)}
          ${T(137,129,"S",16,C.green)}
        </g>

        <g class="l-argument l-argument-2 vls-w07-motion"
          opacity="0">
          ${O(203,124,19,C.paper,
            `stroke="${C.orange}" stroke-width="2"`)}
          ${T(203,129,"C",16,C.orange)}
        </g>

        <g class="l-argument l-argument-3 vls-w07-motion"
          opacity="0">
          ${O(249,163,19,C.paper,
            `stroke="${C.navy}" stroke-width="2"`)}
          ${T(249,168,"M",16,C.navy)}
        </g>

        <g class="l-argument l-argument-4 vls-w07-motion"
          opacity="0">
          ${O(94,274,19,C.paper,
            `stroke="${C.green}" stroke-width="2"`)}
          ${T(94,279,"O",16,C.green)}
        </g>

        <g class="l-argument l-argument-5 vls-w07-motion"
          opacity="0">
          ${O(246,274,19,C.paper,
            `stroke="${C.orange}" stroke-width="2"`)}
          ${T(246,279,"R",16,C.orange)}
        </g>

        <!-- A contested claim -->
        <g class="l-challenge vls-w07-motion" opacity="0">
          ${O(170,215,54,C.paper,
            `stroke="${C.orange}" stroke-width="3"
             stroke-dasharray="6 7"`)}
          ${T(170,222,"?",32,C.orange)}
        </g>

        <!-- Revised proposal -->
        <g class="l-revision vls-w07-motion" opacity="0">
          ${O(170,215,55,C.paper,
            `stroke="${C.green}" stroke-width="4"`)}
          ${P("M145 214 L161 230 L192 194",
            C.green,6)}
        </g>

        <!-- Shared decision -->
        <g class="l-decision vls-w07-motion" opacity="0">
          ${O(170,215,64,"none",
            `stroke="${C.green}" stroke-width="4"
             stroke-dasharray="10 8"`)}
          ${T(170,292,"SHARED DECISION",12,C.green)}
        </g>

        <!-- Bridge to the next BPM phase -->
        <g class="l-next vls-w07-motion" opacity="0">
          ${P("M170 294 V353",C.green,7)}
          ${P("M158 341 L170 354 L182 341",
            C.green,5)}
          ${R(110,354,120,28,C.green,13)}
          ${T(170,373,"UNDERSTAND",12,C.paper)}
        </g>

        <!-- Discussion sound / influence rings -->
        <g class="l-ripple vls-w07-motion" opacity="0">
          ${O(170,215,110,"none",
            `stroke="${C.orange}" stroke-width="2"`)}
          ${O(170,215,130,"none",
            `stroke="${C.orange}" stroke-width="2"
             opacity=".45"`)}
        </g>

      </g>
    `;

    const states = [
      "Enter the evidence forum",
      "Explain strategic value",
      "Defend the process scope",
      "Test delivery capacity",
      "Challenge the measures",
      "Confirm accountability",
      "Surface the risks",
      "Revise the proposal",
      "Agree the next step"
    ];

    function render(i,n) {
      if (!root) return;

      const index=safeIndex(i,n);
      const p=n<=1?0:index/(n-1);
      const stage=Math.min(8,Math.floor(p*9));

      animate(root,()=>{
        microMotion(root,index,n,2);

        label(root,states[stage]);

        const activeArguments=
          clamp(stage,0,6);

        for(let j=0;j<6;j++){
          const active=j<activeArguments;

          show(
            root,
            `.l-argument-${j}`,
            active && stage<=7
          );

          set(root,`.l-beam-${j}`,{
            strokeDashoffset:
              active?"0":"500"
          });

          move(
            root,
            `.l-person-${j}`,
            0,
            active?-6:0,
            active?1.12:.9
          );

          set(root,`.l-person-${j}`,{
            opacity:active?"1":".55"
          });
        }

        // Arguments converge physically on the proposal.
        for(let j=0;j<6;j++){
          const token=root.querySelector(
            `.l-argument-${j}`
          );

          if(!token)continue;

          const tokenPositions=[
            [91,163],
            [137,124],
            [203,124],
            [249,163],
            [94,274],
            [246,274]
          ];

          const [x,y]=tokenPositions[j];

          const convergence=
            stage>=7 ? .68 :
            stage>=5 ? .22 : 0;

          const dx=(170-x)*convergence;
          const dy=(215-y)*convergence;

          token.style.transform=
            `translate(${dx}px,${dy}px)
             scale(${stage>=7?.65:1})`;
        }

        show(root,".l-challenge",
          stage>=3 && stage<=6);

        show(root,".l-ripple",
          stage>=3 && stage<=7);

        move(
          root,
          ".l-ripple",
          0,0,
          1+Math.sin(index*1.2)*.08
        );

        show(root,".l-revision",stage>=7);
        show(root,".l-decision",stage>=8);
        show(root,".l-next",stage>=8);

        set(root,".l-proposal",{
          opacity:stage>=7?".18":"1",
          transform:
            `rotate(${Math.sin(index*.9)*2}deg)
             scale(${stage>=7?.9:1})`
        });

        move(
          root,
          ".l-next",
          0,
          stage>=8?0:25
        );
      });

      gsapAccent(root,".l-revision",index);
    }

    REG.O3f = {
      build(el) {
        root = mount(
          el,"O3f",artwork,
          "TURN ARGUMENTS INTO EVIDENCE",
          states[0]
        );
        this.reset();
      },

      step(i,n) {
        render(i,n);
      },

      reset() {
        if (!root) return;
        instant(root,()=>render(0,32));
      }
    };
  }

  // ============================================================
  // FINAL REGISTRY VALIDATION
  // ============================================================

  // The Week 7 runtime expects one scene for each section.
  //
  // Each registered scene exposes:
  //   build(el)
  //   step(i,n)
  //   reset()
  //
  // No external dependencies are required.
  // GSAP is optional.
  //
  // All SVGs are generated locally.
  // No image URLs, remote resources, or network calls.
  //
  // Every scene uses a different central visual metaphor.
  // Every scene supports nonsequential narration seeking.
  // Every scene supports prefers-reduced-motion.
  //
  // The registry is intentionally preserved if other weeks
  // have already installed their own scenes.

  const WEEK07_SECTION_IDS = [
    "O1a",
    "O1b",
    "O1c",
    "O2a",
    "O2b",
    "O2c",
    "O3a",
    "O3b",
    "O3c",
    "O3d",
    "O3e",
    "O3f"
  ];

  // Ensure that the expected contract is present.
  // This check does not throw during normal operation.
  // It is intended to make integration defects easier to find.

  WEEK07_SECTION_IDS.forEach(id => {
    const scene = REG[id];

    if (
      !scene ||
      typeof scene.build !== "function" ||
      typeof scene.step !== "function" ||
      typeof scene.reset !== "function"
    ) {
      console.warn(
        `[VoiceLearn Week 7] Missing scene contract: ${id}`
      );
    }
  });

})();

