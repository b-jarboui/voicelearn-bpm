// FILE: weeks/week13/scenes-week.js
// OPER621 — WEEK 13 — THE REALIZE VALUE PHASE
// Twelve original cinematic scenes, one per course section.
//
// Join PARTS 1–4 by direct concatenation.
// No imports, external assets, or framework dependencies.
//
// CONTRACT
// window.VL_SCENES[secId] = { build(el), step(i,n), reset() }
//
// DESIGN
// Each section has its own physical visual metaphor.
// Narration remains in the application's existing text area.
// Every narration index produces a distinct visual state.
// Seeking backward is deterministic.
// Reduced motion preserves all information.
// One embedded stylesheet, scoped by section.
// SVG viewBox: 340 x 390.
// Compatible with narrow mobile stages.
//
// PALETTE
// Navy   #1f4e79
// Orange #c0502a
// Paper  #fbf8f1
// Ink    #1b2a3a
// Blue   #dbe7f2
// Green  #317c61

(() => {
  "use strict";

  window.VL_SCENES = window.VL_SCENES || {};

  const C = {
    navy: "#1f4e79",
    orange: "#c0502a",
    paper: "#fbf8f1",
    ink: "#1b2a3a",
    blue: "#dbe7f2",
    green: "#317c61",
    white: "#ffffff",
    pale: "#e5f2e9",
    gold: "#e8bd78"
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

  const R = (x, y, w, h, fill, rx = 0, extra = "") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}"
      rx="${rx}" fill="${fill}" ${extra}/>`;

  const O = (x, y, radius, fill, extra = "") =>
    `<circle cx="${x}" cy="${y}" r="${radius}"
      fill="${fill}" ${extra}/>`;

  const P = (d, stroke = C.navy, width = 2, extra = "") =>
    `<path d="${d}" fill="none" stroke="${stroke}"
      stroke-width="${width}" stroke-linecap="round"
      stroke-linejoin="round" ${extra}/>`;

  const T = (
    x, y, value, size = 13,
    color = C.ink, extra = ""
  ) =>
    `<text x="${x}" y="${y}" text-anchor="middle"
      font-size="${size}" fill="${color}"
      ${extra}>${value}</text>`;

  const G = (body, extra = "") =>
    `<g ${extra}>${body}</g>`;

  const check = (x, y, color = C.green, scale = 1) =>
    `<path d="M${x-11*scale} ${y}
      l${8*scale} ${9*scale}
      ${17*scale} ${-21*scale}"
      fill="none" stroke="${color}"
      stroke-width="${4*scale}"
      stroke-linecap="round"
      stroke-linejoin="round"/>`;

  const person = (x, y, color = C.navy, s = 1) =>
    `<g transform="translate(${x} ${y}) scale(${s})">
      ${O(0,-12,9,color)}
      <path d="M-17 16 Q-17 -2 0 -2 Q17 -2 17 16Z" fill="${color}"/>
    </g>`;

  const money = (x, y, color = C.green, s = 1) =>
    `<g transform="translate(${x} ${y}) scale(${s})">
      ${O(0,0,19,C.paper,
        `stroke="${color}" stroke-width="3"`)}
      ${T(0,6,"AED",11,color)}
    </g>`;

  const building = (x, y, color = C.navy, s = 1) =>
    `<g transform="translate(${x} ${y}) scale(${s})">
      ${R(-24,-35,48,69,C.paper,4,
        `stroke="${color}" stroke-width="3"`)}
      ${[-13,3].map(xx =>
        [-23,-8,7].map(yy =>
          R(xx,yy,10,9,C.blue,2)
        ).join("")
      ).join("")}
      ${R(-7,20,14,14,color,2)}
    </g>`;

  function svg(body) {
    return `<svg xmlns="${NS}"
      viewBox="0 0 340 390"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Animated benefits management illustration">
      ${body}
    </svg>`;
  }

  function mount(el, id, body) {
    if (!el || typeof el.replaceChildren !== "function") {
      return null;
    }

    const root = document.createElement("div");
    root.className = `vls-w13-${id} vls-w13-scene`;
    root.innerHTML = svg(body);
    el.replaceChildren(root);
    return root;
  }

  function one(root, selector) {
    return root ? root.querySelector(selector) : null;
  }

  function all(root, selector) {
    return root ? [...root.querySelectorAll(selector)] : [];
  }

  function opacity(root, selector, value) {
    all(root, selector).forEach(el => {
      el.style.opacity = String(value);
    });
  }

  function transform(root, selector, value) {
    all(root, selector).forEach(el => {
      el.style.transform = value;
    });
  }

  function attribute(root, selector, name, value) {
    all(root, selector).forEach(el => {
      el.setAttribute(name, String(value));
    });
  }

  function label(root, selector, value) {
    const el = one(root, selector);
    if (el) el.textContent = value;
  }

  function visible(root, selector, yes) {
    opacity(root, selector, yes ? 1 : 0);
  }

  function progress(root, i, n) {
    const total = Math.max(1, Number(n) || 1);
    const index = clamp(
      Math.floor(Number(i) || 0), 0, total - 1
    );
    const el = one(root, ".w13-progress");
    if (el) {
      el.style.width =
        `${((index + 1) / total) * 100}%`;
    }
  }

  function footer(text) {
    return `
      <div class="w13-caption">
        <span class="w13-status">${text}</span>
      </div>
      <div class="w13-progress"></div>`;
  }

  function stage(body, caption) {
    return `
      <div class="w13-visual">${body}</div>
      ${footer(caption)}`;
  }

  function safeStep(i, n) {
    const total = Number.isFinite(Number(n)) &&
      Number(n) > 0 ? Math.floor(Number(n)) : 1;

    return {
      i: clamp(
        Math.floor(Number(i) || 0),
        0,
        Math.max(0, total - 1)
      ),
      n: total
    };
  }

  function applyInstant(root, fn) {
    if (!root) return;

    root.classList.add("w13-instant");
    fn();

    // Keep the initial state visually stable.
    // Subsequent narration steps restore transitions.
    void root.offsetHeight;

    if (!reduced()) {
      root.classList.remove("w13-instant");
    }
  }

  function motion(root, selector, properties, duration = .8) {
    const nodes = all(root, selector);
    if (!nodes.length) return;

    const instant = reduced() ||
      root.classList.contains("w13-instant");

    nodes.forEach(node => {
      if (window.gsap && !instant) {
        try {
          window.gsap.killTweensOf(node);
          window.gsap.to(node, {
            ...properties,
            duration,
            ease: "power2.out",
            overwrite: true
          });
          return;
        } catch (_) {
          // Native CSS transition fallback.
        }
      }

      Object.entries(properties).forEach(([k,v]) => {
        node.style[k] = v;
      });
    });
  }

  // Each narration index changes the scene, including indices
  // within the same conceptual chapter. Conceptual chapters
  // determine what appears; index-specific motion determines
  // exactly where it appears.
  function createScene(id, body, cuts, render) {
    let root = null;
    let last = -1;

    function update(i, n, instant = false) {
      if (!root) return;

      const p = safeStep(i, n);
      const chapter = cuts.reduce(
        (count, cut) => count + (p.i >= cut ? 1 : 0),
        0
      );

      if (instant) {
        applyInstant(root, () =>
          render(root, chapter, p.i, p.n, true)
        );
      } else {
        render(root, chapter, p.i, p.n, false);
      }

      progress(root, p.i, p.n);
      last = p.i;
    }

    window.VL_SCENES[id] = {
      build(el) {
        root = mount(el, id, body);
        last = -1;
        update(0, 1, true);
      },

      step(i, n) {
        if (!root) return;
        const p = safeStep(i, n);

        // Repeated calls to the same index are harmless.
        if (p.i === last) return;

        update(p.i, p.n);
      },

      reset() {
        if (!root) return;
        last = -1;
        update(0, 1, true);
      }
    };
  }

  // ============================================================
  // SHARED CSS — EXACTLY ONE STYLESHEET FOR WEEK 13
  // ============================================================

  if (!document.getElementById("vl-sc-w13")) {
    const style = document.createElement("style");
    style.id = "vl-sc-w13";

    style.textContent = `
      [class^="vls-w13-W13"],
      [class*=" vls-w13-W13"] {
        --navy:#1f4e79;
        --orange:#c0502a;
        --paper:#fbf8f1;
        --ink:#1b2a3a;
        --blue:#dbe7f2;
        --green:#317c61;
        position:relative;
        width:100%;
        height:100%;
        min-height:0;
        overflow:hidden;
        box-sizing:border-box;
        background:transparent;
        color:var(--ink);
        font-family:inherit;
        isolation:isolate;
      }

      [class^="vls-w13-W13"] *,
      [class*=" vls-w13-W13"] * {
        box-sizing:border-box;
      }

      [class^="vls-w13-W13"] .w13-visual,
      [class*=" vls-w13-W13"] .w13-visual {
        position:absolute;
        inset:0 0 25px;
        display:flex;
        align-items:center;
        justify-content:center;
        overflow:hidden;
      }

      [class^="vls-w13-W13"] svg,
      [class*=" vls-w13-W13"] svg {
        display:block;
        width:100%;
        height:100%;
        max-width:100%;
        max-height:100%;
        overflow:hidden;
      }

      [class^="vls-w13-W13"] svg text,
      [class*=" vls-w13-W13"] svg text {
        font-family:inherit;
        font-weight:700;
        letter-spacing:.12px;
        user-select:none;
      }

      [class^="vls-w13-W13"] .w13-caption,
      [class*=" vls-w13-W13"] .w13-caption {
        position:absolute;
        bottom:5px;
        left:3%;
        right:3%;
        min-height:19px;
        display:flex;
        justify-content:center;
        align-items:center;
        text-align:center;
        font-size:12px;
        line-height:1.3;
        font-weight:750;
        letter-spacing:.025em;
        color:var(--navy);
        pointer-events:none;
      }

      [class^="vls-w13-W13"] .w13-progress,
      [class*=" vls-w13-W13"] .w13-progress {
        position:absolute;
        bottom:0;
        left:0;
        height:3px;
        width:0;
        background:var(--orange);
        transition:width .45s ease;
      }

      [class^="vls-w13-W13"] .w13-moving,
      [class*=" vls-w13-W13"] .w13-moving {
        transition:
          transform .8s cubic-bezier(.22,.75,.2,1),
          opacity .65s ease,
          fill .65s ease,
          stroke .65s ease,
          stroke-dashoffset .8s ease;
      }

      [class^="vls-w13-W13"] .w13-draw,
      [class*=" vls-w13-W13"] .w13-draw {
        stroke-dasharray:500;
        stroke-dashoffset:500;
        transition:stroke-dashoffset .85s ease;
      }

      [class^="vls-w13-W13"] .w13-pulse,
      [class*=" vls-w13-W13"] .w13-pulse {
        animation:w13-breathe 2.5s ease-in-out infinite;
        transform-box:fill-box;
        transform-origin:center;
      }

      @keyframes w13-breathe {
        0%,100% {
          opacity:.25;
          transform:scale(.94);
        }
        50% {
          opacity:.75;
          transform:scale(1.07);
        }
      }

      [class^="vls-w13-W13"].w13-instant *,
      [class*=" vls-w13-W13"].w13-instant * {
        transition:none!important;
        animation:none!important;
      }

      /* W13O1a — HOTEL LOBBY / VALUE EXTRACTION */

      .vls-w13-W13O1a .a-camera {
        transform-origin:170px 190px;
        transition:transform 1s ease;
      }

      .vls-w13-W13O1a .a-guest {
        transition:transform .9s ease;
      }

      .vls-w13-W13O1a .a-money {
        transition:transform .85s ease,opacity .7s ease;
      }

      .vls-w13-W13O1a .a-ledger {
        transition:transform .9s ease,opacity .7s ease;
      }

      .vls-w13-W13O1a .a-bridge {
        stroke-dasharray:320;
        stroke-dashoffset:320;
        transition:stroke-dashoffset 1s ease;
      }

      .vls-w13-W13O1a .a-spotlight {
        transition:transform 1s ease,opacity .7s ease;
      }

      /* W13O1b — FOUR-PHASE TIME OBSERVATORY */

      .vls-w13-W13O1b .b-carriage {
        transition:transform 1s cubic-bezier(.2,.8,.2,1);
      }

      .vls-w13-W13O1b .b-track {
        stroke-dasharray:650;
        stroke-dashoffset:650;
        transition:stroke-dashoffset 1s ease;
      }

      .vls-w13-W13O1b .b-beacon {
        transition:opacity .65s,transform .8s;
        transform-box:fill-box;
        transform-origin:center;
      }

      .vls-w13-W13O1b .b-lens {
        transition:transform .85s ease,opacity .65s ease;
      }

      .vls-w13-W13O1b .b-gauge {
        transform-origin:170px 181px;
        transition:transform .85s ease;
      }

      /* W13O1c — FIVE ECONOMIC CHAMBERS */

      .vls-w13-W13O1c .c-chamber {
        transition:opacity .7s ease,transform .85s ease;
        transform-box:fill-box;
        transform-origin:center;
      }

      .vls-w13-W13O1c .c-selector {
        transition:transform .9s cubic-bezier(.2,.8,.2,1);
      }

      .vls-w13-W13O1c .c-core {
        transition:fill .7s ease,transform .8s ease;
        transform-origin:170px 186px;
      }

      .vls-w13-W13O1c .c-ray {
        stroke-dasharray:180;
        stroke-dashoffset:180;
        transition:stroke-dashoffset .8s ease;
      }

      .vls-w13-W13O1c .c-token {
        transition:transform .8s ease,opacity .6s ease;
      }

      @media(max-width:375px) {
        [class^="vls-w13-W13"] .w13-caption,
        [class*=" vls-w13-W13"] .w13-caption {
          font-size:11px;
        }
      }

      @media(prefers-reduced-motion:reduce) {
        [class^="vls-w13-W13"] *,
        [class*=" vls-w13-W13"] * {
          animation:none!important;
          transition:none!important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  // ============================================================
  // SCENE 1 — W13O1a
  // GOING LIVE IS NOT DELIVERING VALUE
  //
  // ORIGINAL VISUAL: THE HOTEL'S INVISIBLE MONEY
  //
  // A guest enters Qasr's redesigned arrival lobby.
  // The kiosk operates, but a financial ledger remains empty.
  // Operational improvement releases a luminous value token.
  // That token cannot enter the financial ledger until the
  // bridge of evidence is completed.
  //
  // The visual progresses from physical arrival to financial
  // scrutiny, staffing assumptions, attribution and traceability.
  //
  // This is not a bar chart or a slide containing text.
  // It is a miniature architectural story.
  //
  // 30 narration moments.
  // ============================================================

  {
    const body = stage(`
      <g class="a-camera">

        <defs>
          <radialGradient id="w13a-light">
            <stop offset="0" stop-color="#e8bd78"
              stop-opacity=".38"/>
            <stop offset="1" stop-color="#e8bd78"
              stop-opacity="0"/>
          </radialGradient>
        </defs>

        ${T(170,27,"AFTER GO-LIVE",13,C.navy)}

        <g class="a-spotlight">
          <ellipse cx="170" cy="190" rx="149" ry="150"
            fill="url(#w13a-light)"/>
        </g>

        <path d="M12 294 L170 223 L328 294 L328 337 L12 337Z"
          fill="${C.blue}" opacity=".3"/>

        ${P("M12 294 L170 223 L328 294",
          C.navy,1.5,'opacity=".25"')}

        ${P("M170 223 V338 M86 261 L58 338 M254 261 L282 338",
          C.navy,1,'opacity=".13"')}

        <g opacity=".5">
          ${P("M28 217 V83 H93 V217",C.navy,4)}
          ${P("M247 217 V83 H312 V217",C.navy,4)}
          ${P("M28 109 H93 M247 109 H312",C.orange,2)}
        </g>

        <g class="a-kiosk w13-moving">
          ${R(140,107,60,120,C.navy,12)}
          ${R(147,115,46,72,C.blue,6)}
          ${R(153,125,34,8,C.green,3)}
          ${P("M155 149 H185 M155 160 H177",
            C.navy,2.5,'opacity=".45"')}
          ${O(170,176,4,C.green)}
          ${P("M170 227 V263 M149 263 H191",C.navy,7)}
        </g>

        <g class="a-guest w13-moving">
          ${person(59,247,C.navy,1.12)}
          ${R(77,246,16,22,C.orange,3)}
        </g>

        <g class="a-complete w13-moving" opacity="0">
          ${O(170,149,24,C.green)}
          ${check(170,149,C.white,.85)}
        </g>

        <g class="a-clock w13-moving" opacity="0">
          ${O(84,141,30,C.paper,
            `stroke="${C.navy}" stroke-width="3"`)}
          ${P("M84 122 V141 L101 149",C.orange,4)}
          ${O(84,141,4,C.navy)}
        </g>

        <g class="a-capacity w13-moving" opacity="0">
          ${person(266,237,C.green,1.05)}
          ${P("M241 202 Q266 182 291 202",
            C.green,2,'stroke-dasharray="4 5"')}
          ${O(266,189,8,C.green)}
        </g>

        <g class="a-ledger w13-moving" opacity="0">
          ${R(201,82,108,125,C.paper,9,
            `stroke="${C.navy}" stroke-width="3"`)}
          ${R(201,82,108,25,C.navy,8)}
          ${T(255,100,"FINANCE",12,C.white)}
          ${P("M217 124 H291 M217 143 H291 M217 162 H291",
            C.navy,2,'opacity=".3"')}
          ${R(216,176,78,17,C.blue,5)}
          ${T(255,189,"UNVERIFIED",10,C.orange)}
        </g>

        <g class="a-money w13-moving" opacity="0">
          ${money(170,195,C.green,1.25)}
        </g>

        <path class="a-bridge"
          d="M169 193 Q203 157 244 157"
          stroke="${C.green}" stroke-width="5"
          stroke-linecap="round" fill="none"/>

        <g class="a-question w13-moving" opacity="0">
          ${O(256,145,25,C.paper,
            `stroke="${C.orange}" stroke-width="3"`)}
          ${T(256,154,"?",30,C.orange)}
        </g>

        <g class="a-numbers w13-moving" opacity="0">
          ${R(26,61,128,56,C.paper,10,
            `stroke="${C.navy}" stroke-width="2"`)}
          ${T(90,84,"620,000",20,C.navy)}
          ${T(90,103,"PROMISED",11,C.navy)}

          ${R(186,61,128,56,C.paper,10,
            `stroke="${C.orange}" stroke-width="2"`)}
          ${T(250,84,"505,000",20,C.orange)}
          ${T(250,103,"TRACKED",11,C.orange)}
        </g>

        <g class="a-gap w13-moving" opacity="0">
          ${P("M154 88 H186",C.orange,3)}
          ${O(170,88,17,C.orange)}
          ${T(170,93,"?",19,C.white)}
        </g>

        <g class="a-phase w13-moving" opacity="0">
          ${O(77,341,10,C.blue)}
          ${O(170,341,15,C.orange)}
          ${O(263,341,10,C.green)}
          ${P("M87 341 H155 M185 341 H253",
            C.navy,3)}
          ${T(77,365,"IMPLEMENT",11,C.navy)}
          ${T(170,365,"REALIZE",11,C.orange)}
          ${T(263,365,"SUSTAIN",11,C.green)}
        </g>

        <g class="a-evidence w13-moving" opacity="0">
          ${R(112,268,116,61,C.paper,10,
            `stroke="${C.green}" stroke-width="2"`)}
          ${P("M129 284 H207 M129 296 H197 M129 308 H187",
            C.navy,2,'opacity=".45"')}
          ${check(210,308,C.green,.6)}
        </g>

        <g class="a-staff w13-moving" opacity="0">
          ${[0,1,2,3].map(j =>
            person(108+j*41,285,
              j<2?C.green:C.orange,.55)
          ).join("")}
        </g>

      </g>
    `,"Operational change is not financial proof");

    const captions = [
      "The arrival works",
      "Implementation completed",
      "The audit begins",
      "Two reported figures",
      "Realize Value begins",
      "Operational use",
      "Sustainable performance",
      "The programme view",
      "Find financial evidence",
      "Define the benefit",
      "Faster processing",
      "Time is not cash",
      "Capacity remains",
      "Capture the value",
      "Examine labour",
      "Eleven versus four",
      "Financial conversion",
      "Trace the claim",
      "Connect the evidence",
      "Agree the baseline",
      "Investigate other causes",
      "Deployment timing",
      "Timing is uncertain",
      "Two management perspectives",
      "Reconcile the claim",
      "Defend the evidence",
      "Show real outcomes",
      "Preserve uncertainty",
      "Prepare benefits tracking",
      "Value must be demonstrated"
    ];

    const cuts = [2,4,7,10,13,16,19,22,25,28];

    createScene("W13O1a",body,cuts,(r,b,i,n,instant) => {
      const drift = (i % 5) * 3;
      const focus = i % 3;

      const camera = [
        "translate(0px,0px) scale(1)",
        "translate(-8px,9px) scale(1.07)",
        "translate(0px,0px) scale(.98)",
        "translate(0px,7px) scale(.96)",
        "translate(0px,-5px) scale(.92)",
        "translate(0px,0px) scale(1.02)",
        "translate(0px,-5px) scale(.95)",
        "translate(0px,0px) scale(.94)",
        "translate(0px,0px) scale(.98)",
        "translate(0px,0px) scale(.96)",
        "translate(0px,0px) scale(1)"
      ];

      transform(r,".a-camera",camera[b] || camera[10]);

      transform(r,".a-guest",
        `translate(${Math.min(i,8)*10}px,${focus*2}px)`);

      visible(r,".a-complete",i>=1);
      visible(r,".a-clock",i>=9 && i<=14);
      visible(r,".a-capacity",i>=11 && i<=18);
      visible(r,".a-ledger",i>=2 && i<=27);
      visible(r,".a-money",i>=9 && i<=27);
      visible(r,".a-question",
        (i>=2 && i<=4) ||
        (i>=16 && i<=23));

      visible(r,".a-numbers",
        (i>=2 && i<=4) ||
        (i>=23 && i<=28));

      visible(r,".a-gap",i>=3 && i<=4);
      visible(r,".a-phase",i>=4 && i<=7);
      visible(r,".a-evidence",i>=17 && i<=29);
      visible(r,".a-staff",i>=14 && i<=17);

      const evidenceReady =
        i>=17 && i<=20 ? 140 :
        i>=24 ? 0 : 320;

      attribute(r,".a-bridge",
        "stroke-dashoffset",evidenceReady);

      transform(r,".a-money",
        `translate(${i>=24?68:i>=17?drift:0}px,
          ${i>=24?-37:Math.sin(i)*7}px)
         scale(${1+focus*.04})`);

      transform(r,".a-ledger",
        `translateY(${focus*2}px)`);

      transform(r,".a-spotlight",
        `translate(${Math.sin(i*.8)*12}px,
          ${Math.cos(i*.7)*5}px)`);

      label(r,".w13-status",
        captions[Math.min(i,captions.length-1)]);
    });
  }

  // ============================================================
  // SCENE 2 — W13O1b
  // THE PROMISE, BASELINE AND MEASURED RESULT
  //
  // ORIGINAL VISUAL: THE BENEFITS TIME OBSERVATORY
  //
  // A miniature rail vehicle travels through the BPM programme.
  // Four illuminated stations represent strategic objectives,
  // baseline, revised estimate and the phase-nine evidence test.
  //
  // A rotating observation lens examines each station.
  // A measuring needle separates expectation from observation.
  //
  // This is a spatial journey through time, not a flowchart.
  //
  // 28 narration moments.
  // ============================================================

  {
    const stations = [
      {x:48, y:183, name:"STRATEGY", num:"01"},
      {x:129,y:183, name:"BASELINE", num:"03"},
      {x:211,y:183, name:"INNOVATE", num:"05"},
      {x:292,y:183, name:"REALIZE", num:"09"}
    ];

    const body = stage(`
      <defs>
        <linearGradient id="w13b-track" x1="0" x2="1">
          <stop stop-color="${C.navy}"/>
          <stop offset=".6" stop-color="${C.orange}"/>
          <stop offset="1" stop-color="${C.green}"/>
        </linearGradient>
      </defs>

      ${T(170,27,"THE BENEFITS JOURNEY",13,C.navy)}

      ${P("M23 182 H317",C.blue,13)}
      ${P("M23 182 H317",C.navy,2,
        'stroke-dasharray="5 8" opacity=".3"')}

      <path class="b-track"
        d="M23 182 H317"
        stroke="url(#w13b-track)"
        stroke-width="5" fill="none"/>

      ${stations.map((s,j)=>`
        <g class="b-beacon b-beacon-${j} w13-moving">
          ${O(s.x,s.y,23,C.paper,
            `stroke="${j===3?C.green:C.navy}"
             stroke-width="3"`)}
          ${O(s.x,s.y,14,C.blue)}
          ${T(s.x,s.y+5,s.num,13,C.navy)}
          ${T(s.x,s.y-39,s.name,11,C.navy)}
        </g>
      `).join("")}

      <g class="b-carriage w13-moving">
        ${R(-19,-18,38,30,C.orange,9)}
        ${R(-12,-12,24,13,C.paper,3)}
        ${O(-10,15,5,C.navy)}
        ${O(10,15,5,C.navy)}
        ${P("M0 -18 V-31",C.orange,2)}
        ${O(0,-33,5,C.green)}
      </g>

      <g class="b-lens w13-moving">
        ${O(170,96,38,C.paper,
          `stroke="${C.navy}" stroke-width="3"`)}
        ${O(170,96,26,C.blue)}
        ${P("M192 120 L219 147",C.navy,9)}
        ${P("M151 96 H189 M170 77 V115",
          C.navy,1.5,'opacity=".4"')}
        ${O(170,96,7,C.orange)}
      </g>

      <g class="b-gauge w13-moving">
        ${O(170,293,58,C.paper,
          `stroke="${C.navy}" stroke-width="3"`)}
        ${P("M132 315 A45 45 0 0 1 208 315",
          C.blue,7)}
        ${P("M170 293 L170 255",C.orange,5)}
        ${O(170,293,9,C.navy)}
      </g>

      <g class="b-baseline w13-moving" opacity="0">
        ${P("M82 244 V331",C.navy,3,
          'stroke-dasharray="5 6"')}
        ${R(40,337,85,25,C.blue,10)}
        ${T(82,354,"BEFORE",12,C.navy)}
      </g>

      <g class="b-result w13-moving" opacity="0">
        ${P("M258 244 V331",C.green,3,
          'stroke-dasharray="5 6"')}
        ${R(215,337,85,25,C.pale,10)}
        ${T(258,354,"AFTER",12,C.green)}
      </g>

      <g class="b-uncertainty w13-moving" opacity="0">
        ${O(170,293,26,C.paper,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${T(170,303,"?",31,C.orange)}
      </g>

      <g class="b-promise w13-moving" opacity="0">
        ${R(94,39,152,40,C.paper,10,
          `stroke="${C.orange}" stroke-width="2"`)}
        ${T(170,57,"AED 620,000",18,C.orange)}
        ${T(170,72,"PROMISED",10,C.navy)}
      </g>

      <g class="b-tracked w13-moving" opacity="0">
        ${R(94,39,152,40,C.paper,10,
          `stroke="${C.green}" stroke-width="2"`)}
        ${T(170,57,"AED 505,000",18,C.green)}
        ${T(170,72,"TRACKED",10,C.navy)}
      </g>

      <g class="b-verified w13-moving" opacity="0">
        ${O(170,293,46,C.paper,
          `stroke="${C.green}" stroke-width="4"`)}
        ${check(170,293,C.green,1.3)}
      </g>

      ${T(170,382,"EARLY COMMITMENTS → LATER EVIDENCE",
        11,C.navy)}
    `,"The benefit travels through time");

    const captions = [
      "Two reported figures",
      "The original promise",
      "Make benefits measurable",
      "Begin with strategy",
      "Define business objectives",
      "Purpose before activity",
      "Implementation is different",
      "Measure the objective",
      "Establish the baseline",
      "Launch Pad evidence",
      "Without a baseline",
      "Check competing influences",
      "Investigate causation",
      "Revise the estimate",
      "Innovate the design",
      "Keep assumptions traceable",
      "Preserve the commitment",
      "Test actual results",
      "Phase nine review",
      "Examine financial conversion",
      "Promise is not proof",
      "Tracking needs verification",
      "The reported difference",
      "Consider deployment timing",
      "Two management perspectives",
      "Reconcile both records",
      "Preserve traceability",
      "Evidence establishes value"
    ];

    createScene("W13O1b",body,
      [3,8,13,17,20,23,26],
      (r,b,i,n) => {

      const positions = [
        48,48,48,
        48,48,48,48,48,
        129,129,129,129,129,
        211,211,211,211,
        292,292,292,
        292,292,292,
        292,292,292,
        292,292
      ];

      const x = positions[Math.min(i,27)];

      transform(r,".b-carriage",
        `translate(${x}px,183px)
         rotate(${Math.sin(i*.7)*3}deg)`);

      attribute(r,".b-track",
        "stroke-dashoffset",
        Math.max(0,650-(x-23)*2.2));

      stations.forEach((s,j)=>{
        const active = Math.abs(s.x-x)<12;
        opacity(r,`.b-beacon-${j}`,
          active?1:.4);

        transform(r,`.b-beacon-${j}`,
          active?
          `translateY(${-3-(i%3)*2}px) scale(1.1)`:
          "translateY(0px) scale(1)");
      });

      const lensX =
        i<8?48:
        i<13?129:
        i<17?211:292;

      transform(r,".b-lens",
        `translate(${lensX-170}px,
          ${Math.sin(i*.7)*7}px)
         rotate(${(i%4-2)*4}deg)`);

      transform(r,".b-gauge",
        `rotate(${[-25,-15,-8,0,12,19,27,35][b]}deg)`);

      visible(r,".b-baseline",i>=8 && i<=26);
      visible(r,".b-result",i>=17);
      visible(r,".b-uncertainty",
        (i>=11&&i<=12) ||
        (i>=22&&i<=25));

      visible(r,".b-promise",
        (i>=1&&i<=2) ||
        (i>=20&&i<=21));

      visible(r,".b-tracked",i>=21&&i<=25);
      visible(r,".b-verified",i===27);

      label(r,".w13-status",
        captions[Math.min(i,27)]);
    });
  }

  // ============================================================
  // SCENE 3 — W13O1c
  // FIVE KINDS OF BENEFIT, FIVE DIFFERENT TESTS
  //
  // ORIGINAL VISUAL: THE ECONOMIC SORTING MACHINE
  //
  // Five physically different chambers surround a central
  // classification mechanism.
  //
  // Each chamber contains a distinct economic object:
  // 1. Removed cost: departing expenditure.
  // 2. Avoided cost: a future expense blocked.
  // 3. Revenue gained: incoming commercial income.
  // 4. Risk reduced: protective shield.
  // 5. Capacity released: freed working time.
  //
  // A rotating selector moves between the mechanisms.
  // No chamber is presented as financially verified merely
  // because the process improvement exists.
  //
  // 28 narration moments.
  // ============================================================

  {
    const chambers = [
      {x:170,y:67,color:C.navy,label:"COST REMOVED"},
      {x:286,y:150,color:C.orange,label:"COST AVOIDED"},
      {x:241,y:286,color:C.green,label:"REVENUE GAINED"},
      {x:99,y:286,color:C.navy,label:"RISK REDUCED"},
      {x:54,y:150,color:C.green,label:"CAPACITY"}
    ];

    function chamberIcon(j) {
      switch(j) {
        case 0:
          return `
            ${R(-17,-11,34,24,C.blue,3)}
            ${P("M-10 -2 H10",C.navy,3)}
            ${P("M0 3 V18 M-7 11 L0 18 L7 11",
              C.orange,3)}`;

        case 1:
          return `
            ${money(0,-7,C.orange,.7)}
            ${P("M-21 15 H21",C.orange,5)}
            ${P("M-17 15 L-17 3 M17 15 V3",
              C.orange,3)}`;

        case 2:
          return `
            ${money(0,0,C.green,.8)}
            ${P("M-23 20 L-7 7 L4 13 L23 -10",
              C.green,3)}`;

        case 3:
          return `
            <path d="M0 -23 L21 -13 V3 Q21 19 0 27 Q-21 19 -21 3 V-13Z"
              fill="${C.blue}" stroke="${C.navy}"
              stroke-width="3"/>
            ${check(0,4,C.green,.7)}`;

        default:
          return `
            ${O(0,0,23,C.blue)}
            ${P("M0 -16 V0 L14 8",C.navy,4)}
            ${P("M-15 17 L-22 25 M15 17 L22 25",
              C.green,3)}`;
      }
    }

    const body = stage(`
      ${T(170,22,"FIVE ECONOMIC MECHANISMS",12,C.navy)}

      ${O(170,185,115,"none",
        `stroke="${C.blue}" stroke-width="15"
         opacity=".55"`)}
      ${O(170,185,115,"none",
        `stroke="${C.navy}" stroke-width="1.5"
         stroke-dasharray="4 9" opacity=".35"`)}

      ${chambers.map((p,j)=>`
        <path class="c-ray c-ray-${j}"
          d="M170 185 L${p.x} ${p.y}"
          stroke="${p.color}" stroke-width="3"
          fill="none"/>
      `).join("")}

      ${chambers.map((p,j)=>`
        <g class="c-chamber c-chamber-${j}">
          <g transform="translate(${p.x} ${p.y})">
            ${O(0,0,35,C.paper,
              `stroke="${p.color}" stroke-width="3"`)}
            ${O(0,0,29,C.blue,'opacity=".35"')}
            ${chamberIcon(j)}
          </g>
          ${T(p.x,
            p.y+(j===0?-45:j===2||j===3?49:48),
            p.label,10,p.color)}
        </g>
      `).join("")}

      <g class="c-selector w13-moving">
        ${P("M170 185 L170 91",C.orange,6)}
        ${P("M160 105 L170 89 L180 105",
          C.orange,3)}
      </g>

      <g class="c-core w13-moving">
        ${O(170,185,48,C.paper,
          `stroke="${C.navy}" stroke-width="3"`)}
        ${O(170,185,35,C.blue)}
        ${T(170,181,"VALUE",15,C.navy)}
        ${T(170,199,"TEST",13,C.navy)}
      </g>

      <g class="c-token w13-moving" opacity="0">
        ${money(170,185,C.green,1)}
      </g>

      <g class="c-proof w13-moving" opacity="0">
        ${O(170,185,55,"none",
          `stroke="${C.green}" stroke-width="4"
           stroke-dasharray="7 6"`)}
        ${check(170,185,C.green,1.15)}
      </g>

      <g class="c-warning w13-moving" opacity="0">
        ${O(170,185,54,C.paper,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${T(170,196,"?",43,C.orange)}
      </g>

      <g class="c-case w13-moving" opacity="0">
        ${R(76,340,188,35,C.paper,13,
          `stroke="${C.orange}" stroke-width="2"`)}
        ${T(170,362,"CLAIM ≠ PROOF",13,C.orange)}
      </g>
    `,"Different value, different evidence");

    const captions = [
      "The committee examines value",
      "Money labels can mislead",
      "Five distinct mechanisms",
      "Cost actually removed",
      "Expenditure must decrease",
      "Examine the labour claim",
      "Staffing needs evidence",
      "Cost genuinely avoided",
      "A credible future cost",
      "Test the counterfactual",
      "Avoid hypothetical savings",
      "Revenue gained",
      "Sales are not profit",
      "Establish process contribution",
      "Examine retained revenue",
      "Pricing complicates attribution",
      "Risk reduced",
      "Exposure is not cash",
      "The penalty is contingent",
      "Preserve financial uncertainty",
      "Capacity released",
      "Less processing effort",
      "Decide how capacity helps",
      "Measure the actual value",
      "Improvement may be genuine",
      "Five different evidence tests",
      "Examine every component",
      "Only defend supported value"
    ];

    const activeFor = i =>
      i<3?-1:
      i<7?0:
      i<11?1:
      i<16?2:
      i<20?3:
      i<25?4:-1;

    createScene("W13O1c",body,
      [3,7,11,16,20,25],
      (r,b,i,n) => {

      const active = activeFor(i);
      const angle = active<0 ?
        (i%5)*12 :
        active*72;

      transform(r,".c-selector",
        `rotate(${angle}deg)`);

      chambers.forEach((p,j)=>{
        const selected = j===active;

        opacity(r,`.c-chamber-${j}`,
          active<0? .72 : selected?1:.25);

        transform(r,`.c-chamber-${j}`,
          selected?
          `scale(${1.1+(i%3)*.035})`:
          "scale(.9)");

        attribute(r,`.c-ray-${j}`,
          "stroke-dashoffset",
          selected?0:180);
      });

      const tokenPositions = [
        [170,67],
        [286,150],
        [241,286],
        [99,286],
        [54,150]
      ];

      if(active>=0) {
        const p=tokenPositions[active];
        transform(r,".c-token",
          `translate(${p[0]-170}px,
            ${p[1]-185}px)
           scale(${.8+(i%3)*.08})`);
      }

      visible(r,".c-token",
        active>=0 &&
        i%4===2);

      visible(r,".c-warning",
        i===6||i===10||i===15||
        i===18||i===23||i===26);

      visible(r,".c-proof",i===27);
      visible(r,".c-case",i>=24&&i<=26);

      attribute(r,".c-core circle:first-child",
        "fill",
        i===27?C.pale:C.paper);

      transform(r,".c-core",
        `rotate(${Math.sin(i*.5)*3}deg)`);

      label(r,".w13-status",
        captions[Math.min(i,27)]);
    });
  }

  // END OF PART 1
  // Continue with PART 2:
  // W13O1d — The Competing Causes Laboratory
  // W13O2a — The Missing Benefits Vault
  // W13O2b — The Invisible Savings Factory

// FILE: weeks/week13/scenes-week.js
// CONTINUATION — paste directly after PART 1.
// Uses the shared helpers, palette and registry from PART 1.

// ============================================================
// SCENE 4 — W13O1d
// WHEN TWO CAUSES CHANGE THE SAME RESULT
//
// ORIGINAL VISUAL: THE COMPETING CAUSES LABORATORY
//
// A transparent experimental chamber contains a measurable
// outcome. Two independent interventions feed the chamber:
// redesigned collections and a late-payment penalty.
//
// Each intervention has its own physical control mechanism.
// The outcome changes, but the two incoming streams overlap.
//
// A forensic lens attempts to separate their contributions.
// The scene then shifts to Qasr's arrival improvement and
// corporate rate reduction.
//
// The visual never invents an attribution percentage.
//
// 28 narration moments.
// ============================================================

{
  const body = stage(`
    <defs>
      <linearGradient id="w13d-glass" x1="0" y1="0"
        x2="1" y2="1">
        <stop stop-color="${C.white}"
          stop-opacity=".85"/>
        <stop offset="1" stop-color="${C.blue}"
          stop-opacity=".35"/>
      </linearGradient>

      <linearGradient id="w13d-liquid" x1="0" y1="0"
        x2="0" y2="1">
        <stop stop-color="${C.green}"/>
        <stop offset="1" stop-color="${C.navy}"/>
      </linearGradient>
    </defs>

    ${T(170,25,"THE ATTRIBUTION LAB",13,C.navy)}

    <g class="d-apparatus">

      <!-- Two separate intervention reservoirs. -->

      <g class="d-source-a w13-moving">
        ${R(29,67,105,93,C.paper,14,
          `stroke="${C.navy}" stroke-width="3"`)}
        ${R(39,77,85,54,C.blue,8)}
        ${P("M49 113 L66 97 L82 105 L111 87",
          C.navy,4)}
        ${T(81,148,"PROCESS",12,C.navy)}
      </g>

      <g class="d-source-b w13-moving">
        ${R(206,67,105,93,C.paper,14,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${R(216,77,85,54,C.blue,8)}
        ${O(259,102,19,C.orange)}
        ${T(259,109,"!",25,C.white)}
        ${T(259,148,"PENALTY",12,C.orange)}
      </g>

      <!-- Two physical conduits into the measurement vessel. -->

      ${P("M81 160 V189 Q81 205 112 215 L145 229",
        C.navy,7,
        'class="d-pipe-a"')}

      ${P("M259 160 V189 Q259 205 228 215 L195 229",
        C.orange,7,
        'class="d-pipe-b"')}

      <path class="d-flow-a"
        d="M81 160 V189 Q81 205 112 215 L145 229"
        fill="none" stroke="${C.green}"
        stroke-width="4"
        stroke-dasharray="12 13"
        stroke-dashoffset="250"/>

      <path class="d-flow-b"
        d="M259 160 V189 Q259 205 228 215 L195 229"
        fill="none" stroke="${C.orange}"
        stroke-width="4"
        stroke-dasharray="12 13"
        stroke-dashoffset="250"/>

      <!-- Central measurement chamber. -->

      <g class="d-vessel w13-moving">
        ${R(110,218,120,112,
          "url(#w13d-glass)",18,
          `stroke="${C.navy}" stroke-width="3"`)}
        ${R(121,270,98,49,
          "url(#w13d-liquid)",8,
          'class="d-liquid" opacity=".45"')}
        ${P("M120 269 Q145 260 170 269 T220 269",
          C.green,2)}
        ${T(170,246,"DEBTOR DAYS",12,C.navy)}
        <text class="d-result"
          x="170" y="294"
          text-anchor="middle"
          font-size="30"
          font-weight="800"
          fill="${C.white}">47</text>
      </g>

      <!-- Rotating causal separator. -->

      <g class="d-separator w13-moving" opacity="0">
        ${O(170,273,57,"none",
          `stroke="${C.orange}" stroke-width="3"
           stroke-dasharray="7 6"`)}
        ${P("M170 216 V330",C.orange,3,
          'stroke-dasharray="5 6"')}
      </g>

      <!-- Investigation magnifier. -->

      <g class="d-lens w13-moving" opacity="0">
        ${O(170,275,48,C.paper,
          `stroke="${C.navy}" stroke-width="4"
           fill-opacity=".85"`)}
        ${P("M204 309 L235 340",C.navy,10)}
        ${T(170,286,"?",40,C.orange)}
      </g>

      <!-- Observed change is not assigned to one cause. -->

      <g class="d-difference w13-moving" opacity="0">
        ${R(106,343,128,34,C.paper,12,
          `stroke="${C.green}" stroke-width="2"`)}
        ${T(170,365,"47 → 31 DAYS",15,C.green)}
      </g>

      <!-- Alternative explanations remain visible. -->

      <g class="d-uncertain w13-moving" opacity="0">
        ${O(170,185,21,C.paper,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${T(170,193,"?",26,C.orange)}
      </g>

      <!-- Comparative-group apparatus. -->

      <g class="d-comparison w13-moving" opacity="0">
        ${R(29,343,128,34,C.blue,10)}
        ${R(183,343,128,34,C.pale,10)}
        ${T(93,365,"GROUP A",12,C.navy)}
        ${T(247,365,"GROUP B",12,C.green)}
      </g>

    </g>
  `,"Two causes, one observed result");

  const captions = [
    "Observed improvement",
    "Causation remains uncertain",
    "Define attribution",
    "Measure debtor days",
    "The starting position",
    "Sixteen days fewer",
    "A second intervention",
    "The penalty changes",
    "Two plausible causes",
    "Separate their contributions",
    "Avoid unsupported credit",
    "Investigate alternatives",
    "Compare similar groups",
    "Test different conditions",
    "Check group comparability",
    "Look beyond correlation",
    "Return to Qasr",
    "Retained corporate revenue",
    "Rates also decreased",
    "Two competing influences",
    "Observed versus attributed",
    "Do not invent percentages",
    "Uncertainty is not failure",
    "Report supported contribution",
    "Examine staffing assumptions",
    "Check actual expenditure",
    "Prefer defensible evidence",
    "Explain the real contribution"
  ];

  createScene("W13O1d",body,
    [3,6,9,12,16,19,23,26],
    (r,b,i,n) => {

    const processActive = i>=3;
    const penaltyActive = i>=6;

    visible(r,".d-source-a",true);
    visible(r,".d-source-b",true);

    opacity(r,".d-source-a",
      processActive?1:.4);

    opacity(r,".d-source-b",
      penaltyActive?1:.25);

    const flowA = processActive ?
      -250+(i%6)*34 : 250;

    const flowB = penaltyActive ?
      -250+(i%6)*34 : 250;

    attribute(r,".d-flow-a",
      "stroke-dashoffset",flowA);

    attribute(r,".d-flow-b",
      "stroke-dashoffset",flowB);

    const result =
      i<4?47:
      i<6?39:31;

    label(r,".d-result",String(result));

    const level =
      i<4?49:
      i<6?63:78;

    attribute(r,".d-liquid",
      "height",level);

    attribute(r,".d-liquid",
      "y",319-level);

    visible(r,".d-separator",
      i>=8&&i<=15);

    transform(r,".d-separator",
      `rotate(${(i%5-2)*11}deg)`);

    visible(r,".d-lens",
      (i>=9&&i<=15) ||
      (i>=19&&i<=23));

    const lensX =
      i%2===0?-35:35;

    transform(r,".d-lens",
      `translate(${lensX}px,
        ${Math.sin(i*.7)*9}px)
       scale(${1+(i%3)*.05})`);

    visible(r,".d-difference",
      i>=4&&i<=11);

    visible(r,".d-uncertain",
      (i>=6&&i<=11) ||
      (i>=19&&i<=23));

    visible(r,".d-comparison",
      i>=12&&i<=15);

    transform(r,".d-vessel",
      `translateY(${Math.sin(i*.65)*4}px)`);

    label(r,".w13-status",
      captions[Math.min(i,27)]);
  });
}

// ============================================================
// SCENE 5 — W13O2a
// THE GAP BETWEEN PROMISED AND TRACKED
//
// ORIGINAL VISUAL: THE MISSING BENEFITS VAULT
//
// A substantial circular vault contains the promised value.
// Only part of its illuminated perimeter has been accounted for.
//
// Three physical investigation mechanisms approach the vault:
//
// 1. An hourglass tests timing.
// 2. A lever tests management action.
// 3. A fractured foundation tests unrealistic assumptions.
//
// The missing AED 115,000 is never arbitrarily allocated among
// these explanations.
//
// Seven recently deployed properties appear as separate
// illuminated buildings, without implying benefit maturity.
//
// 30 narration moments.
// ============================================================

{
  const properties = Array.from({length:14},(_,j)=>{
    const col=j%7;
    const row=Math.floor(j/7);
    const x=31+col*46;
    const y=319+row*38;

    return `
      <g class="e-property e-property-${j} w13-moving">
        ${building(x,y,
          j<7?C.orange:C.navy,.46)}
      </g>`;
  }).join("");

  const body = stage(`
    <defs>
      <radialGradient id="w13e-vault">
        <stop stop-color="${C.white}"/>
        <stop offset=".7" stop-color="${C.blue}"/>
        <stop offset="1" stop-color="${C.paper}"/>
      </radialGradient>
    </defs>

    ${T(170,24,"THE MISSING VALUE",13,C.navy)}

    <!-- The vault occupies the visual centre. -->

    <g class="e-vault w13-moving">
      ${O(170,167,116,C.paper,
        `stroke="${C.navy}" stroke-width="7"`)}
      ${O(170,167,101,
        "url(#w13e-vault)",
        `stroke="${C.blue}" stroke-width="13"`)}
      ${O(170,167,88,"none",
        `stroke="${C.navy}" stroke-width="2"
         stroke-dasharray="3 9" opacity=".4"`)}

      <circle class="e-arc"
        cx="170" cy="167" r="93"
        fill="none"
        stroke="${C.green}"
        stroke-width="12"
        stroke-linecap="round"
        stroke-dasharray="584"
        stroke-dashoffset="584"
        transform="rotate(-90 170 167)"/>

      ${T(170,135,"PROMISED",12,C.navy)}
      ${T(170,161,"620,000",25,C.navy)}
      ${P("M115 178 H225",C.navy,2,
        'opacity=".25"')}
      ${T(170,204,"TRACKED",12,C.orange)}
      ${T(170,229,"505,000",23,C.orange)}
    </g>

    <!-- Central unresolved amount. -->

    <g class="e-gap w13-moving" opacity="0">
      ${O(170,167,48,C.paper,
        `stroke="${C.orange}" stroke-width="4"`)}
      ${T(170,162,"115,000",21,C.orange)}
      ${T(170,182,"GAP",12,C.navy)}
    </g>

    <!-- Timing mechanism: hourglass. -->

    <g class="e-hourglass w13-moving" opacity="0">
      ${P("M45 77 H105 M45 151 H105",C.navy,5)}
      ${P("M50 80 L100 148 M100 80 L50 148",
        C.navy,3)}
      <path d="M57 87 L93 87 L75 110Z"
        fill="${C.orange}" opacity=".55"/>
      <path d="M57 143 L93 143 L75 123Z"
        fill="${C.orange}"/>
      ${O(75,117,3,C.orange)}
      ${T(75,169,"TIMING",12,C.navy)}
    </g>

    <!-- Management-action mechanism: a physical lever. -->

    <g class="e-lever w13-moving" opacity="0">
      ${R(235,137,70,12,C.navy,5)}
      ${P("M270 149 L248 181 H292Z",
        C.navy,2)}
      ${O(270,137,12,C.orange)}
      ${P("M243 137 L298 106",C.green,7)}
      ${O(298,106,10,C.green)}
      ${T(270,202,"ACTION",12,C.navy)}
    </g>

    <!-- Unrealistic-assumption mechanism. -->

    <g class="e-foundation w13-moving" opacity="0">
      ${R(108,248,124,38,C.blue,6,
        `stroke="${C.navy}" stroke-width="2"`)}
      ${P("M170 249 L158 262 L178 270 L164 285",
        C.orange,4)}
      ${T(170,304,"ASSUMPTIONS",12,C.orange)}
    </g>

    <!-- A diagnostic key enters the vault. -->

    <g class="e-key w13-moving" opacity="0">
      ${O(75,231,17,"none",
        `stroke="${C.green}" stroke-width="6"`)}
      ${P("M89 241 L123 273 L133 263 M112 263 L122 253",
        C.green,6)}
    </g>

    <!-- Deployment properties. -->

    <g class="e-properties w13-moving" opacity="0">
      ${properties}
    </g>

    <!-- Staffing assumption gauge. -->

    <g class="e-staff w13-moving" opacity="0">
      ${R(48,298,244,54,C.paper,12,
        `stroke="${C.navy}" stroke-width="2"`)}
      ${T(106,321,"11 ASSUMED",13,C.navy)}
      ${T(234,321,"4 ACTUAL",13,C.orange)}
      ${P("M170 305 V340",C.blue,2)}
    </g>

    <!-- Uncertainty remains visible. -->

    <g class="e-question w13-moving" opacity="0">
      ${O(170,167,37,C.paper,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${T(170,181,"?",47,C.orange)}
    </g>

  `,"Investigate the gap");

  const captions = [
    "The benefits difference",
    "Promise versus tracking",
    "AED 115,000 gap",
    "Subtraction is insufficient",
    "Three possible explanations",
    "Benefits may be delayed",
    "Seven recent deployments",
    "The programme view",
    "Timing needs evidence",
    "Define measurement periods",
    "Observe emerging results",
    "Management action required",
    "Capacity may be released",
    "Capture needs a decision",
    "Potential is not cash",
    "Examine labour assumptions",
    "Eleven originally assumed",
    "Four actually observed",
    "Check actual expenditure",
    "Do not count future action",
    "Unrealistic expectations",
    "Test original assumptions",
    "Pricing complicates retention",
    "Regulatory exposure uncertain",
    "Do not invent allocations",
    "Reconcile financial evidence",
    "Request supporting records",
    "Assign corrective actions",
    "Report uncertainty honestly",
    "Explain the missing value"
  ];

  createScene("W13O2a",body,
    [4,6,11,15,20,25,28],
    (r,b,i,n) => {

    const ratio=505/620;
    const circumference=584;

    const arc =
      i<2?0:
      i<4?ratio*.5:
      ratio;

    attribute(r,".e-arc",
      "stroke-dashoffset",
      circumference*(1-arc));

    visible(r,".e-gap",
      i>=2&&i<=4);

    visible(r,".e-hourglass",
      i>=5&&i<=10);

    visible(r,".e-lever",
      i>=11&&i<=19);

    visible(r,".e-foundation",
      i>=20&&i<=24);

    visible(r,".e-key",
      i>=25&&i<=29);

    visible(r,".e-properties",
      i>=6&&i<=10);

    visible(r,".e-staff",
      i>=15&&i<=19);

    visible(r,".e-question",
      i===3||i===8||i===24||i===28);

    // The hourglass rotates to represent an evidence period.
    transform(r,".e-hourglass",
      `rotate(${(i%4)*8-12}deg)`);

    // The lever physically changes position during action beats.
    transform(r,".e-lever",
      `rotate(${i>=13?(i%4)*-6:0}deg)`);

    // The foundation shifts when assumptions are challenged.
    transform(r,".e-foundation",
      `translate(${i%2===0?-4:4}px,
        ${i%3===0?4:0}px)`);

    // Key moves toward the vault's central mechanism.
    transform(r,".e-key",
      `translate(${i>=25?
        Math.min(5,i-25)*17:0}px,
        ${i>=25?
        -Math.min(5,i-25)*12:0}px)
       rotate(${i>=25?(i-25)*12:0}deg)`);

    all(r,".e-property").forEach((node,j)=>{
      node.style.opacity =
        i>=6&&i<=10 ?
        (j<7?1:.3):0;

      node.style.transform =
        `translateY(${j<7?
          -((i+j)%3)*3:0}px)`;
    });

    transform(r,".e-vault",
      `rotate(${Math.sin(i*.45)*2}deg)`);

    label(r,".w13-status",
      captions[Math.min(i,29)]);
  });
}

// ============================================================
// SCENE 6 — W13O2b
// WHY REAL IMPROVEMENTS DISAPPEAR FROM THE ACCOUNTS
//
// ORIGINAL VISUAL: THE INVISIBLE SAVINGS FACTORY
//
// A process machine produces operational capacity.
// Its output moves along a conveyor toward a financial vault.
//
// However, a management gate blocks conversion into money.
//
// A business owner must operate the gate.
// Finance then examines the resulting financial evidence.
//
// The scene introduces organisational ownership, project-team
// departure, lost assumptions, incentives and honest reporting.
//
// The machine can work perfectly while the financial vault
// remains empty.
//
// 28 narration moments.
// ============================================================

{
  const body = stage(`
    <defs>
      <linearGradient id="w13f-machine"
        x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="${C.blue}"/>
        <stop offset="1" stop-color="${C.paper}"/>
      </linearGradient>
    </defs>

    ${T(170,25,"THE VALUE CONVERSION FACTORY",
      12,C.navy)}

    <!-- The operating process machine. -->

    <g class="f-machine w13-moving">
      ${R(24,111,116,150,
        "url(#w13f-machine)",16,
        `stroke="${C.navy}" stroke-width="4"`)}
      ${R(35,124,94,27,C.navy,7)}
      ${T(82,143,"PROCESS",12,C.white)}

      ${O(82,196,36,C.paper,
        `stroke="${C.navy}" stroke-width="3"`)}

      <g class="f-gear w13-moving">
        ${Array.from({length:10},(_,j)=>{
          const a=j*Math.PI/5;
          const x=82+35*Math.cos(a);
          const y=196+35*Math.sin(a);
          return R(x-5,y-5,10,10,
            C.navy,2,
            `transform="rotate(${j*36} ${x} ${y})"`);
        }).join("")}
        ${O(82,196,23,C.blue)}
        ${O(82,196,11,C.navy)}
        ${O(82,196,5,C.paper)}
      </g>

      ${R(47,239,70,12,C.green,5)}
    </g>

    <!-- Conveyor belt and released capacity. -->

    <g class="f-conveyor">
      ${R(116,222,118,20,C.navy,7)}
      ${Array.from({length:6},(_,j)=>
        O(126+j*19,232,5,C.blue)
      ).join("")}
    </g>

    <g class="f-capacity w13-moving">
      ${O(144,210,20,C.blue,
        `stroke="${C.green}" stroke-width="3"`)}
      ${P("M144 198 V210 L155 216",C.green,3)}
    </g>

    <!-- Financial vault remains separate. -->

    <g class="f-finance w13-moving">
      ${R(236,123,82,139,C.paper,12,
        `stroke="${C.navy}" stroke-width="4"`)}
      ${R(245,133,64,25,C.navy,5)}
      ${T(277,151,"FINANCE",11,C.white)}
      ${O(277,201,30,C.blue,
        `stroke="${C.navy}" stroke-width="3"`)}
      ${T(277,208,"?",30,C.orange)}
    </g>

    <!-- A physical gate blocks the conveyor. -->

    <g class="f-gate w13-moving">
      ${R(218,175,12,86,C.orange,4)}
      ${P("M224 175 V147",C.orange,5)}
      ${O(224,143,9,C.orange)}
    </g>

    <!-- A manager operates the conversion gate. -->

    <g class="f-owner w13-moving" opacity="0">
      ${person(171,137,C.green,1.05)}
      ${P("M185 144 L217 151",C.green,4)}
      ${T(171,174,"OWNER",12,C.green)}
    </g>

    <!-- Financial verification mechanism. -->

    <g class="f-proof w13-moving" opacity="0">
      ${O(277,201,32,C.paper,
        `stroke="${C.green}" stroke-width="4"`)}
      ${check(277,201,C.green,1.1)}
    </g>

    <!-- The financial benefit token. -->

    <g class="f-money w13-moving" opacity="0">
      ${money(143,210,C.green,.9)}
    </g>

    <!-- Project-team departure. -->

    <g class="f-departure w13-moving" opacity="0">
      ${person(54,319,C.navy,.7)}
      ${person(85,319,C.navy,.7)}
      ${P("M112 319 H149 M139 310 L149 319 L139 328",
        C.orange,3)}
    </g>

    <!-- Lost knowledge. -->

    <g class="f-record w13-moving" opacity="0">
      ${R(154,281,78,65,C.paper,7,
        `stroke="${C.orange}" stroke-width="2"`)}
      ${P("M167 296 H219 M167 307 H211 M167 318 H201",
        C.navy,2)}
      ${P("M183 281 L193 296 L185 306",
        C.orange,3)}
    </g>

    <!-- Accountability chain. -->

    <g class="f-chain w13-moving" opacity="0">
      ${O(80,340,13,C.navy)}
      ${O(170,340,13,C.green)}
      ${O(260,340,13,C.orange)}
      ${P("M93 340 H157 M183 340 H247",
        C.navy,3)}
      ${T(80,368,"PROJECT",11,C.navy)}
      ${T(170,368,"BUSINESS",11,C.green)}
      ${T(260,368,"FINANCE",11,C.orange)}
    </g>

    <!-- Financial reporting warning. -->

    <g class="f-warning w13-moving" opacity="0">
      ${O(277,201,29,C.paper,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${T(277,211,"!",36,C.orange)}
    </g>

  `,"Improvement needs financial conversion");

  const captions = [
    "A real process improvement",
    "The financial result is missing",
    "Follow the value",
    "Less employee effort",
    "Released working capacity",
    "Salaries remain payable",
    "Potential is not realised",
    "The labour claim",
    "Eleven assumed, four actual",
    "Investigate expenditure",
    "Who controls the decision?",
    "Assign a benefit owner",
    "Business authority matters",
    "Separate responsibilities",
    "Ownership can disappear",
    "Project closure is insufficient",
    "The implementation team leaves",
    "Original assumptions disappear",
    "Sponsor continuity matters",
    "Preserve accountability",
    "Incentives shape behaviour",
    "Delivery is not realisation",
    "Honest reporting matters",
    "Avoid optimistic estimates",
    "Reconcile the disagreement",
    "Identify required actions",
    "Verify financial consequences",
    "Capture and demonstrate value"
  ];

  createScene("W13O2b",body,
    [3,7,10,14,17,20,24,27],
    (r,b,i,n) => {

    // Process machinery runs even when financial realisation
    // has not been demonstrated.

    transform(r,".f-gear",
      `rotate(${i*28}deg)`);

    transform(r,".f-machine",
      `translateY(${Math.sin(i*.6)*3}px)`);

    // Released capacity travels toward the conversion gate.
    const travel =
      i<3?0:
      i<7?Math.min(60,(i-3)*15):
      65;

    transform(r,".f-capacity",
      `translate(${travel}px,
        ${Math.sin(i*.8)*5}px)`);

    visible(r,".f-owner",
      (i>=10&&i<=16) ||
      (i>=24&&i<=27));

    visible(r,".f-departure",
      i>=16&&i<=18);

    visible(r,".f-record",
      i>=17&&i<=19);

    visible(r,".f-chain",
      (i>=12&&i<=15) ||
      (i>=24&&i<=27));

    visible(r,".f-warning",
      (i>=5&&i<=9) ||
      (i>=21&&i<=25));

    // Gate remains closed until an actual management decision
    // is examined. Opening the gate illustrates a proposed
    // conversion pathway, not verified Qasr savings.
    const open =
      (i>=12&&i<=13) ||
      (i>=25&&i<=27);

    transform(r,".f-gate",
      open?
      "translateY(-67px)":
      "translateY(0px)");

    // Token represents possible value. Its appearance inside
    // the financial vault is not a claim of verified savings.
    visible(r,".f-money",
      i>=10&&i<=27);

    const tokenX =
      i<12?0:
      i<24?Math.min(72,(i-12)*6):
      Math.min(133,72+(i-24)*20);

    transform(r,".f-money",
      `translate(${tokenX}px,
        ${Math.sin(i*.5)*4}px)`);

    visible(r,".f-proof",i===27);

    // The verification symbol is conceptual: it represents
    // the required evidence test, not an audit conclusion.
    opacity(r,".f-finance",
      i>=24?1:.82);

    label(r,".w13-status",
      captions[Math.min(i,27)]);
  });
}

// END OF PART 2
// Continue with PART 3:
// W13O2c — The Staffing Assumption Theatre
// W13O2d — The Renewal and Regulatory Evidence Chambers
// W13O2e — The Audit Committee Reconciliation Table

// FILE: weeks/week13/scenes-week.js
// CONTINUATION — paste directly after PART 2.
// Uses the shared helpers, palette and registry from PART 1.

// ============================================================
// SCENE 7 — W13O2c
// STAFFING ASSUMPTIONS VERSUS FINANCIAL REALITY
//
// ORIGINAL VISUAL: THE STAFFING ASSUMPTION THEATRE
//
// Eleven illuminated staffing positions appear on a miniature
// hotel operations floor. A mechanical shutter progressively
// reveals the four positions associated with the revised
// operational estimate.
//
// The difference is an assumption gap, not automatically a
// payroll saving.
//
// A separate payroll mechanism remains connected to actual
// expenditure. It only changes when a financial consequence
// is demonstrated.
//
// A movable inspection lens examines staffing, redeployment,
// overtime, recruitment and payroll evidence.
//
// No invented labour-saving amount is displayed.
//
// 28 narration moments.
// ============================================================

{
  const staffPositions = Array.from({length:11},(_,j)=>{
    const row=Math.floor(j/6);
    const col=j%6;
    const x=43+col*51;
    const y=113+row*72;

    return `
      <g class="g-worker g-worker-${j} w13-moving"
         transform="translate(${x} ${y})">
        ${O(0,-12,11,j<4?C.green:C.navy)}
        <path d="M-18 19 Q-18 -1 0 -1 Q18 -1 18 19Z"
          fill="${j<4?C.green:C.navy}"/>
        ${O(0,32,3,C.blue)}
      </g>`;
  }).join("");

  const body = stage(`
    ${T(170,25,"THE STAFFING ASSUMPTION",13,C.navy)}

    <!-- Architectural operations floor. -->

    <g class="g-floor">
      ${R(18,63,304,178,C.paper,14,
        `stroke="${C.navy}" stroke-width="3"`)}
      ${R(28,72,284,24,C.blue,6)}
      ${T(170,89,"HOTEL OPERATIONS",12,C.navy)}

      ${P("M28 168 H312",C.blue,2)}
      ${staffPositions}
    </g>

    <!-- Mechanical shutter separating expected and actual. -->

    <g class="g-shutter w13-moving" opacity="0">
      ${R(34,101,280,132,C.paper,8,
        `stroke="${C.orange}" stroke-width="2"
         opacity=".92"`)}
      ${Array.from({length:8},(_,j)=>
        P(`M38 ${113+j*15} H308`,
          C.orange,1,'opacity=".2"')
      ).join("")}
    </g>

    <!-- Original and revised assumption indicators. -->

    <g class="g-original w13-moving">
      ${R(28,251,130,51,C.blue,10)}
      ${T(93,273,"11",27,C.navy)}
      ${T(93,291,"ASSUMED",11,C.navy)}
    </g>

    <g class="g-revised w13-moving" opacity="0">
      ${R(182,251,130,51,C.pale,10)}
      ${T(247,273,"4",27,C.green)}
      ${T(247,291,"OBSERVED",11,C.green)}
    </g>

    <!-- A payroll safe remains physically separate. -->

    <g class="g-payroll w13-moving" opacity="0">
      ${R(107,315,126,62,C.paper,10,
        `stroke="${C.navy}" stroke-width="3"`)}
      ${R(116,324,108,17,C.navy,4)}
      ${T(170,337,"PAYROLL",11,C.white)}
      ${O(170,358,13,C.blue,
        `stroke="${C.navy}" stroke-width="2"`)}
      ${T(170,363,"?",16,C.orange)}
    </g>

    <!-- Inspection lens moves among economic consequences. -->

    <g class="g-lens w13-moving" opacity="0">
      ${O(170,162,43,C.paper,
        `stroke="${C.orange}" stroke-width="4"
         fill-opacity=".72"`)}
      ${P("M201 192 L231 221",C.navy,9)}
      ${O(170,162,25,"none",
        `stroke="${C.navy}" stroke-width="2"`)}
    </g>

    <!-- Possible staffing decisions. -->

    <g class="g-options w13-moving" opacity="0">
      ${R(20,318,96,46,C.blue,9)}
      ${R(122,318,96,46,C.pale,9)}
      ${R(224,318,96,46,C.blue,9)}
      ${T(68,338,"OVERTIME",11,C.navy)}
      ${T(68,352,"REDUCED",10,C.navy)}
      ${T(170,338,"HIRING",11,C.green)}
      ${T(170,352,"AVOIDED",10,C.green)}
      ${T(272,338,"STAFF",11,C.navy)}
      ${T(272,352,"REDEPLOYED",10,C.navy)}
    </g>

    <!-- Financial consequence indicator. -->

    <g class="g-evidence w13-moving" opacity="0">
      ${O(170,347,27,C.paper,
        `stroke="${C.green}" stroke-width="3"`)}
      ${check(170,347,C.green,.9)}
    </g>

    <g class="g-warning w13-moving" opacity="0">
      ${O(170,347,27,C.paper,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${T(170,357,"?",32,C.orange)}
    </g>

  `,"A staffing assumption is not a saving");

  const captions = [
    "The labour assumption",
    "Eleven expected positions",
    "The operational estimate",
    "Four positions observed",
    "Seven-position difference",
    "An assumption has changed",
    "Payroll may be unchanged",
    "Staff may be redeployed",
    "Investigate overtime",
    "Investigate recruitment",
    "Identify the real decision",
    "Examine actual expenditure",
    "Compare payroll records",
    "Check employment costs",
    "Avoid double counting",
    "Separate time from money",
    "Released capacity",
    "Operational flexibility",
    "Financial conversion",
    "Management action matters",
    "Assign benefit ownership",
    "Finance must verify",
    "Measure the consequence",
    "Preserve the baseline",
    "Record the revised estimate",
    "Explain the difference",
    "Avoid invented savings",
    "Defend the labour claim"
  ];

  createScene("W13O2c",body,
    [3,6,8,11,15,19,23,26],
    (r,b,i,n) => {

    const revealed =
      i<3?11:
      i<5?7:
      4;

    all(r,".g-worker").forEach((node,j)=>{
      const active=j<revealed;

      node.style.opacity=active?1:.16;

      node.style.transform =
        `translateY(${active?
          -((i+j)%3)*3:8}px)
         scale(${active?1:.82})`;
    });

    visible(r,".g-shutter",i>=3&&i<=5);

    transform(r,".g-shutter",
      `translateX(${i>=3?
        (i-3)*42:0}px)`);

    visible(r,".g-revised",i>=3);

    visible(r,".g-payroll",
      (i>=6&&i<=15) ||
      (i>=19&&i<=27));

    visible(r,".g-options",
      (i>=7&&i<=10) ||
      (i>=16&&i<=20));

    visible(r,".g-lens",
      (i>=11&&i<=15) ||
      (i>=21&&i<=26));

    const inspectionX =
      i%3===0?-70:
      i%3===1?0:70;

    transform(r,".g-lens",
      `translate(${inspectionX}px,
        ${Math.sin(i*.7)*13}px)
       rotate(${(i%4-2)*5}deg)`);

    visible(r,".g-warning",
      i===6||i===10||i===15||
      i===22||i===26);

    visible(r,".g-evidence",i===27);

    transform(r,".g-original",
      `translateY(${Math.sin(i*.5)*3}px)`);

    label(r,".w13-status",
      captions[Math.min(i,27)]);
  });
}

// ============================================================
// SCENE 8 — W13O2d
// CORPORATE RENEWALS AND REGULATORY EXPOSURE
//
// ORIGINAL VISUAL: THE TWO EVIDENCE CHAMBERS
//
// Two distinct physical chambers occupy opposite sides of
// a miniature investigation hall.
//
// LEFT: Corporate renewal evidence.
// A contract moves through a renewal scanner while a pricing
// dial turns. The animation separates retained contracts,
// changed rates and financial contribution.
//
// RIGHT: Regulatory exposure.
// A protective shield intercepts a potential penalty.
// The shield demonstrates reduced exposure, not necessarily
// an actual cash saving.
//
// A travelling forensic spotlight switches between chambers.
//
// 30 narration moments.
// ============================================================

{
  const body = stage(`
    <defs>
      <linearGradient id="w13h-hall"
        x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="${C.paper}"/>
        <stop offset="1" stop-color="${C.blue}"/>
      </linearGradient>
    </defs>

    ${T(170,25,"TWO EVIDENCE CHAMBERS",13,C.navy)}

    <!-- Central investigation hall. -->

    ${R(13,53,314,272,
      "url(#w13h-hall)",15,
      `stroke="${C.navy}" stroke-width="2"`)}

    ${P("M170 63 V315",C.navy,2,
      'stroke-dasharray="5 7" opacity=".35"')}

    <!-- Chamber one: commercial renewal. -->

    <g class="h-commercial w13-moving">
      ${R(24,67,135,242,C.paper,12,
        `stroke="${C.navy}" stroke-width="2"`)}
      ${T(91,91,"RENEWALS",12,C.navy)}

      <!-- Contract scanner. -->

      ${R(45,112,92,109,C.blue,8)}
      ${R(57,122,68,88,C.paper,5,
        `stroke="${C.navy}" stroke-width="2"`)}
      ${P("M68 143 H114 M68 155 H109 M68 167 H112",
        C.navy,2)}
      ${P("M68 184 Q83 172 96 184 T116 184",
        C.orange,2)}

      <path class="h-scan"
        d="M52 125 H130"
        stroke="${C.green}" stroke-width="5"
        stroke-linecap="round"/>

      <!-- Commercial pricing dial. -->

      <g class="h-price w13-moving">
        ${O(91,266,29,C.paper,
          `stroke="${C.navy}" stroke-width="3"`)}
        ${P("M91 266 V244",C.orange,4)}
        ${O(91,266,6,C.navy)}
        ${T(91,306,"RATE",11,C.navy)}
      </g>
    </g>

    <!-- Chamber two: regulatory risk. -->

    <g class="h-regulatory w13-moving">
      ${R(181,67,135,242,C.paper,12,
        `stroke="${C.orange}" stroke-width="2"`)}
      ${T(248,91,"REGULATORY",12,C.orange)}

      <!-- Incoming contingent penalty. -->

      <g class="h-threat w13-moving">
        ${O(248,133,24,C.orange)}
        ${T(248,142,"!",29,C.white)}
        ${P("M248 159 V188",C.orange,4,
          'stroke-dasharray="5 5"')}
      </g>

      <!-- Protective shield. -->

      <g class="h-shield w13-moving">
        <path d="M248 182 L289 198 V234 Q289 269 248 291 Q207 269 207 234 V198Z"
          fill="${C.blue}"
          stroke="${C.navy}"
          stroke-width="4"/>
        ${check(248,235,C.green,1.15)}
      </g>
    </g>

    <!-- Moving forensic spotlight. -->

    <g class="h-spotlight w13-moving">
      ${O(91,183,78,"none",
        `stroke="${C.gold}" stroke-width="5"
         stroke-dasharray="12 8" opacity=".65"`)}
    </g>

    <!-- Distinguish commercial and regulatory records. -->

    <g class="h-renewed w13-moving" opacity="0">
      ${O(91,182,31,C.paper,
        `stroke="${C.green}" stroke-width="3"`)}
      ${check(91,182,C.green,1)}
    </g>

    <g class="h-price-question w13-moving" opacity="0">
      ${O(91,182,30,C.paper,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${T(91,193,"?",37,C.orange)}
    </g>

    <g class="h-risk-question w13-moving" opacity="0">
      ${O(248,236,31,C.paper,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${T(248,247,"?",38,C.orange)}
    </g>

    <!-- Evidence bridge. -->

    <g class="h-bridge w13-moving" opacity="0">
      ${P("M91 332 H248",C.navy,3)}
      ${O(91,332,8,C.navy)}
      ${O(248,332,8,C.orange)}
      ${O(170,332,15,C.paper,
        `stroke="${C.green}" stroke-width="3"`)}
      ${T(170,337,"?",17,C.green)}
    </g>

    <!-- Evidence lens. -->

    <g class="h-lens w13-moving" opacity="0">
      ${O(170,354,27,C.paper,
        `stroke="${C.navy}" stroke-width="3"`)}
      ${P("M188 372 L201 385",C.navy,6)}
      ${T(170,362,"?",29,C.orange)}
    </g>

  `,"Different claims require different proof");

  const captions = [
    "Two uncertain benefits",
    "Commercial renewal evidence",
    "Regulatory risk evidence",
    "Examine corporate contracts",
    "Count actual renewals",
    "Separate retention from value",
    "Inspect negotiated rates",
    "A lower price matters",
    "Calculate the net contribution",
    "Consider other influences",
    "Avoid claiming all retention",
    "Check the original baseline",
    "Preserve commercial records",
    "Test the financial outcome",
    "Now examine regulation",
    "Potential penalty exposure",
    "Risk can be reduced",
    "Exposure is not expenditure",
    "A penalty may never occur",
    "Estimate cautiously",
    "Define the relevant event",
    "Examine control effectiveness",
    "Check actual compliance",
    "Separate prevention from cash",
    "Keep both claims distinct",
    "Different evidence standards",
    "Reconcile with finance",
    "Report residual uncertainty",
    "Do not manufacture certainty",
    "Defend each benefit separately"
  ];

  createScene("W13O2d",body,
    [3,7,11,14,17,20,24,27],
    (r,b,i,n) => {

    const commercial=i<14;
    const regulatory=i>=14&&i<25;

    opacity(r,".h-commercial",
      commercial?1:.43);

    opacity(r,".h-regulatory",
      regulatory?1:
      commercial?.43:.85);

    const targetX =
      commercial?91:
      regulatory?248:170;

    transform(r,".h-spotlight",
      `translate(${targetX-91}px,
        ${Math.sin(i*.55)*6}px)
       rotate(${i*4}deg)`);

    attribute(r,".h-scan",
      "transform",
      `translate(0 ${((i%7)-3)*12})`);

    transform(r,".h-price",
      `rotate(${Math.min(i,13)*11}deg)`);

    transform(r,".h-threat",
      `translateY(${regulatory?
        Math.sin(i*.7)*15:0}px)`);

    transform(r,".h-shield",
      `scale(${regulatory?
        1.02+(i%3)*.025:1})`);

    visible(r,".h-renewed",
      i>=4&&i<=5);

    visible(r,".h-price-question",
      i>=7&&i<=10);

    visible(r,".h-risk-question",
      i>=17&&i<=23);

    visible(r,".h-bridge",i>=24);

    visible(r,".h-lens",i>=25);

    transform(r,".h-lens",
      `translate(${Math.sin(i*.6)*28}px,
        ${Math.cos(i*.6)*4}px)`);

    label(r,".w13-status",
      captions[Math.min(i,29)]);
  });
}

// ============================================================
// SCENE 9 — W13O2e
// RECONCILING THE BENEFITS CLAIM
//
// ORIGINAL VISUAL: THE AUDIT COMMITTEE RECONCILIATION TABLE
//
// A physical tabletop contains two independent evidence
// folders. The folders move toward a central reconciliation
// mechanism.
//
// A mechanical scale tests whether financial claims are
// supported by actual records.
//
// Evidence tokens arrive one by one:
// baseline, timing, ownership, attribution and financial proof.
//
// The scene deliberately refuses to make unsupported amounts
// balance. An unresolved question remains until evidence is
// sufficient.
//
// 30 narration moments.
// ============================================================

{
  const evidenceTokens=[
    {x:43,label:"BASELINE"},
    {x:106,label:"TIMING"},
    {x:170,label:"OWNER"},
    {x:234,label:"CAUSE"},
    {x:297,label:"FINANCE"}
  ];

  const body=stage(`
    ${T(170,25,"THE RECONCILIATION TABLE",13,C.navy)}

    <!-- Perspective tabletop. -->

    <path d="M20 107 L320 107 L337 335 L3 335Z"
      fill="${C.blue}" opacity=".4"/>

    ${P("M20 107 H320 L337 335 H3Z",
      C.navy,3)}

    <!-- Two competing records. -->

    <g class="j-folder-a w13-moving">
      ${R(27,80,120,119,C.paper,10,
        `stroke="${C.navy}" stroke-width="3"`)}
      ${R(27,80,120,27,C.navy,8)}
      ${T(87,99,"PROMISE",12,C.white)}
      ${T(87,145,"620,000",22,C.navy)}
      ${P("M43 160 H131 M43 171 H119",
        C.navy,2,'opacity=".3"')}
    </g>

    <g class="j-folder-b w13-moving">
      ${R(193,80,120,119,C.paper,10,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${R(193,80,120,27,C.orange,8)}
      ${T(253,99,"TRACKED",12,C.white)}
      ${T(253,145,"505,000",22,C.orange)}
      ${P("M209 160 H297 M209 171 H285",
        C.navy,2,'opacity=".3"')}
    </g>

    <!-- Physical balancing apparatus. -->

    <g class="j-scale w13-moving">
      ${P("M170 203 V294",C.navy,6)}
      ${P("M117 294 H223",C.navy,7)}
      ${O(170,205,10,C.navy)}

      <g class="j-beam w13-moving">
        ${P("M75 205 H265",C.navy,5)}
        ${P("M91 205 V238 M249 205 V238",
          C.navy,2)}
        ${P("M60 238 H122 L111 261 H71Z",
          C.navy,2)}
        ${P("M218 238 H280 L269 261 H229Z",
          C.navy,2)}
      </g>
    </g>

    <!-- Unresolved central difference. -->

    <g class="j-gap w13-moving" opacity="0">
      ${O(170,204,34,C.paper,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${T(170,199,"115,000",15,C.orange)}
      ${T(170,216,"GAP",11,C.navy)}
    </g>

    <!-- Five evidence objects along the front of the table. -->

    ${evidenceTokens.map((p,k)=>`
      <g class="j-token j-token-${k} w13-moving">
        ${O(p.x,327,22,C.paper,
          `stroke="${k%2?C.orange:C.navy}"
           stroke-width="2"`)}
        ${T(p.x,331,String(k+1),15,
          k%2?C.orange:C.navy)}
        ${T(p.x,363,p.label,10,C.navy)}
      </g>
    `).join("")}

    <!-- Reconciliation lens. -->

    <g class="j-lens w13-moving" opacity="0">
      ${O(170,205,42,C.paper,
        `stroke="${C.navy}" stroke-width="4"
         fill-opacity=".85"`)}
      ${P("M201 236 L229 264",C.navy,9)}
      ${T(170,216,"?",39,C.orange)}
    </g>

    <!-- Financially defensible decision record. -->

    <g class="j-decision w13-moving" opacity="0">
      ${R(98,175,144,83,C.paper,11,
        `stroke="${C.green}" stroke-width="3"`)}
      ${P("M113 196 H224 M113 210 H214 M113 224 H202",
        C.navy,2)}
      ${check(213,240,C.green,.65)}
    </g>

    <!-- Uncertainty marker. -->

    <g class="j-warning w13-moving" opacity="0">
      ${O(170,205,27,C.paper,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${T(170,215,"!",34,C.orange)}
    </g>

  `,"Reconcile before claiming success");

  const captions=[
    "The committee's decision",
    "Two financial perspectives",
    "The reported difference",
    "Do not force agreement",
    "Establish the baseline",
    "Check the original promise",
    "Identify revised estimates",
    "Test measurement timing",
    "Seven recent deployments",
    "Separate mature benefits",
    "Check management action",
    "Who owns each benefit?",
    "Investigate staffing",
    "Examine financial conversion",
    "Test competing causes",
    "Corporate rates matter",
    "Regulatory exposure differs",
    "Avoid double counting",
    "Demand financial evidence",
    "Check payroll and contracts",
    "Verify supporting records",
    "Identify unsupported claims",
    "Record remaining uncertainty",
    "Distinguish benefit categories",
    "Agree corrective actions",
    "Assign accountable owners",
    "Set future measurement",
    "Preserve the audit trail",
    "Make a defensible judgement",
    "Realisation requires proof"
  ];

  createScene("W13O2e",body,
    [3,7,10,14,18,22,25,28],
    (r,b,i,n)=>{

    const closing=i>=25;

    transform(r,".j-folder-a",
      `translate(${i>=3?
        Math.min(25,(i-3)*3):0}px,
        ${Math.sin(i*.5)*3}px)
       rotate(${Math.sin(i*.4)*2}deg)`);

    transform(r,".j-folder-b",
      `translate(${i>=3?
        -Math.min(25,(i-3)*3):0}px,
        ${Math.cos(i*.5)*3}px)
       rotate(${Math.cos(i*.4)*-2}deg)`);

    // The scale remains visibly unbalanced until the
    // evidence question has been examined.
    const tilt=
      i<3?0:
      i<18?-11+(i%3)*2:
      i<25?-5+(i%3)*2:
      0;

    transform(r,".j-beam",
      `rotate(${tilt}deg)`);

    visible(r,".j-gap",i>=2&&i<=6);

    evidenceTokens.forEach((p,k)=>{
      const threshold=[4,7,10,14,18][k];
      const active=i>=threshold;

      opacity(r,`.j-token-${k}`,
        active?1:.3);

      transform(r,`.j-token-${k}`,
        `translateY(${active?
          -((i+k)%3)*6:8}px)
         scale(${active?1.08:.88})`);
    });

    visible(r,".j-lens",
      (i>=18&&i<=23) ||
      (i>=27&&i<=28));

    transform(r,".j-lens",
      `translate(${Math.sin(i*.65)*27}px,
        ${Math.cos(i*.55)*11}px)`);

    visible(r,".j-warning",
      i===3||i===17||i===21||i===23);

    visible(r,".j-decision",closing);

    transform(r,".j-decision",
      `translateY(${closing?
        Math.max(0,20-(i-25)*8):20}px)`);

    label(r,".w13-status",
      captions[Math.min(i,29)]);
  });
}

// END OF PART 3
// Continue with PART 4:
// W13O3a — The Benefits Control Tower
// W13O3b — The Sustainable Value Flywheel
// W13O3c — The Final Evidence Bridge
// Final closure of the IIFE and file.

// FILE: weeks/week13/scenes-week.js
// FINAL CONTINUATION — paste directly after PART 3.
// W13O3a + W13O3b + W13O3c
// Closes the Week 13 scene registry and IIFE.

// ============================================================
// SCENE 10 — W13O3a
// BENEFITS MONITORING AND MANAGEMENT CONTROL
//
// ORIGINAL VISUAL: THE BENEFITS CONTROL TOWER
//
// A panoramic airport-style control tower oversees multiple
// hotel properties. Each property transmits a different
// benefits signal.
//
// A rotating radar identifies delayed, unverified and
// financially supported outcomes.
//
// A movable inspection beam scans the network. An accountable
// owner appears at the tower console.
//
// The central idea is active benefits governance rather than
// passive reporting.
//
// 30 narration moments.
// ============================================================

{
  const hotels = [
    {x:37,y:297},
    {x:90,y:316},
    {x:143,y:300},
    {x:197,y:318},
    {x:250,y:299},
    {x:303,y:316}
  ];

  const body = stage(`
    <defs>
      <radialGradient id="w13k-radar">
        <stop stop-color="${C.green}" stop-opacity=".22"/>
        <stop offset="1" stop-color="${C.green}"
          stop-opacity="0"/>
      </radialGradient>
    </defs>

    ${T(170,25,"THE BENEFITS CONTROL TOWER",12,C.navy)}

    <!-- Panoramic radar dish. -->

    <g class="k-radar">
      ${O(170,116,87,
        "url(#w13k-radar)")}
      ${O(170,116,75,"none",
        `stroke="${C.navy}" stroke-width="2"
         opacity=".35"`)}
      ${O(170,116,51,"none",
        `stroke="${C.navy}" stroke-width="1.5"
         opacity=".3"`)}
      ${O(170,116,25,"none",
        `stroke="${C.navy}" stroke-width="1.5"
         opacity=".3"`)}
      ${P("M95 116 H245 M170 41 V191",
        C.navy,1,'opacity=".25"')}

      <g class="k-sweep w13-moving">
        <path d="M170 116 L170 41 A75 75 0 0 1 237 82Z"
          fill="${C.green}" opacity=".28"/>
        ${P("M170 116 L170 41",C.green,3)}
      </g>

      ${[
        [130,80],[208,91],[119,142],
        [205,156],[171,64],[157,170]
      ].map((p,j)=>`
        <g class="k-signal k-signal-${j} w13-moving">
          ${O(p[0],p[1],7,
            j%3===0?C.orange:
            j%3===1?C.green:C.navy)}
          ${O(p[0],p[1],12,"none",
            `stroke="${j%3===0?
              C.orange:C.green}"
             stroke-width="2" opacity=".35"`)}
        </g>
      `).join("")}
    </g>

    <!-- Elevated control tower. -->

    <g class="k-tower w13-moving">
      ${P("M140 196 L124 267 H216 L200 196",
        C.navy,4)}
      ${R(120,182,100,42,C.blue,9,
        `stroke="${C.navy}" stroke-width="3"`)}
      ${R(130,190,80,21,C.paper,4)}
      ${P("M170 224 V266",C.navy,3)}
      ${R(113,266,114,15,C.navy,4)}
    </g>

    <!-- The responsible business owner. -->

    <g class="k-owner w13-moving" opacity="0">
      ${person(170,202,C.green,.65)}
      ${T(170,247,"BENEFIT OWNER",11,C.green)}
    </g>

    <!-- Network of hotel properties. -->

    <g class="k-network">
      ${hotels.map((p,j)=>`
        <g class="k-hotel k-hotel-${j} w13-moving">
          ${building(p.x,p.y,
            j%2?C.orange:C.navy,.65)}
          ${O(p.x,p.y-38,5,
            j%3===0?C.orange:C.green)}
        </g>
      `).join("")}
    </g>

    <!-- Physical data connections. -->

    ${hotels.map((p,j)=>`
      <path class="k-link k-link-${j}"
        d="M170 275 Q${p.x} 260
          ${p.x} ${p.y-38}"
        fill="none"
        stroke="${j%2?C.orange:C.green}"
        stroke-width="2"
        stroke-dasharray="5 6"
        stroke-dashoffset="200"/>
    `).join("")}

    <!-- Inspection beam. -->

    <g class="k-inspection w13-moving" opacity="0">
      <path d="M170 211 L100 335 H240Z"
        fill="${C.gold}" opacity=".24"/>
    </g>

    <!-- Governance decision console. -->

    <g class="k-console w13-moving" opacity="0">
      ${R(107,326,126,50,C.paper,9,
        `stroke="${C.navy}" stroke-width="2"`)}
      ${R(118,336,104,8,C.blue,3)}
      ${R(118,350,74,7,C.green,3)}
      ${O(207,354,7,C.orange)}
    </g>

    <!-- Corrective action signal. -->

    <g class="k-action w13-moving" opacity="0">
      ${O(170,116,32,C.paper,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${T(170,128,"!",39,C.orange)}
    </g>

  `,"Govern benefits after implementation");

  const captions = [
    "Benefits require monitoring",
    "The programme-wide view",
    "Each property is different",
    "Check actual performance",
    "Compare with the baseline",
    "Identify delayed results",
    "Distinguish verified benefits",
    "Investigate weak signals",
    "Assign business ownership",
    "The owner must act",
    "Finance verifies conversion",
    "Review operational evidence",
    "Check deployment timing",
    "Seven recent properties",
    "Benefits mature over time",
    "Monitor emerging results",
    "Do not hide exceptions",
    "Escalate unresolved issues",
    "Choose corrective action",
    "Document management decisions",
    "Revisit the financial claim",
    "Track agreed measures",
    "Preserve evidence history",
    "Review across properties",
    "Avoid averaging away gaps",
    "Maintain accountability",
    "Report uncertainty",
    "Confirm the next review",
    "Continue after project closure",
    "Sustain active governance"
  ];

  createScene("W13O3a",body,
    [3,8,12,16,20,24,28],
    (r,b,i,n) => {

    // Radar sweeps continuously through narration states.
    transform(r,".k-sweep",
      `rotate(${i*39}deg)`);

    // Signals pulse independently.
    all(r,".k-signal").forEach((node,j)=>{
      const active=(i+j)%4===0;

      node.style.opacity=active?1:.45;
      node.style.transform=
        `scale(${active?1.22:.88})`;
    });

    // Network links progressively become visible.
    hotels.forEach((p,j)=>{
      const active=i>=3+j*2;

      attribute(r,`.k-link-${j}`,
        "stroke-dashoffset",
        active?0:200);

      opacity(r,`.k-hotel-${j}`,
        active?1:.35);

      transform(r,`.k-hotel-${j}`,
        `translateY(${active?
          -((i+j)%3)*4:0}px)`);
    });

    visible(r,".k-owner",
      (i>=8&&i<=12) ||
      (i>=24&&i<=29));

    visible(r,".k-inspection",
      i>=4&&i<=25);

    transform(r,".k-inspection",
      `rotate(${(i%6-3)*8}deg)`);

    visible(r,".k-console",i>=18);

    visible(r,".k-action",
      i===7||i===16||i===18||
      i===26);

    transform(r,".k-tower",
      `translateY(${Math.sin(i*.5)*3}px)`);

    label(r,".w13-status",
      captions[Math.min(i,29)]);
  });
}

// ============================================================
// SCENE 11 — W13O3b
// SUSTAINING BENEFITS BEYOND PROJECT DELIVERY
//
// ORIGINAL VISUAL: THE SUSTAINABLE VALUE FLYWHEEL
//
// A large physical flywheel turns around a central operational
// outcome.
//
// Four distinct mechanical arms connect:
// performance measurement, ownership, corrective action and
// financial evidence.
//
// A disconnected gear visibly interrupts the mechanism.
// Management reconnects the missing component.
//
// The wheel demonstrates how realised benefits depend on
// continuing organisational routines.
//
// The scene avoids representing benefits management as a
// static four-box framework.
//
// 28 narration moments.
// ============================================================

{
  const wheelNodes=[
    {x:170,y:65,label:"MEASURE"},
    {x:285,y:184,label:"OWN"},
    {x:170,y:303,label:"ACT"},
    {x:55,y:184,label:"VERIFY"}
  ];

  const body=stage(`
    <defs>
      <radialGradient id="w13l-wheel">
        <stop stop-color="${C.white}"/>
        <stop offset=".75" stop-color="${C.blue}"/>
        <stop offset="1" stop-color="${C.paper}"/>
      </radialGradient>
    </defs>

    ${T(170,24,"THE VALUE FLYWHEEL",13,C.navy)}

    <!-- Main rotating mechanical ring. -->

    <g class="l-wheel w13-moving">
      ${O(170,184,117,"none",
        `stroke="${C.navy}" stroke-width="15"`)}
      ${O(170,184,100,"none",
        `stroke="${C.blue}" stroke-width="4"`)}
      ${O(170,184,86,"none",
        `stroke="${C.navy}" stroke-width="2"
         stroke-dasharray="5 9" opacity=".3"`)}

      ${Array.from({length:16},(_,j)=>{
        const a=j*Math.PI/8;
        const x=170+117*Math.cos(a);
        const y=184+117*Math.sin(a);

        return R(x-7,y-7,14,14,
          j%4===0?C.orange:C.navy,3,
          `transform="rotate(${j*22.5}
           ${x} ${y})"`);
      }).join("")}

      ${P("M170 83 V285 M69 184 H271",
        C.blue,3)}
      ${P("M99 113 L241 255 M241 113 L99 255",
        C.blue,2,'opacity=".5"')}
    </g>

    <!-- Centre represents continuing operational value. -->

    <g class="l-core w13-moving">
      ${O(170,184,62,
        "url(#w13l-wheel)",
        `stroke="${C.navy}" stroke-width="4"`)}
      ${T(170,179,"SUSTAIN",15,C.navy)}
      ${T(170,199,"VALUE",17,C.green)}
    </g>

    <!-- Four independent mechanical components. -->

    ${wheelNodes.map((p,j)=>`
      <g class="l-node l-node-${j} w13-moving">
        ${O(p.x,p.y,31,C.paper,
          `stroke="${j%2?C.orange:C.green}"
           stroke-width="3"`)}
        ${O(p.x,p.y,23,C.blue)}
        ${T(p.x,p.y+5,p.label,11,C.navy)}
      </g>
    `).join("")}

    <!-- Broken connection. -->

    <g class="l-break w13-moving" opacity="0">
      ${P("M224 112 L239 96",
        C.orange,5)}
      ${P("M252 83 L267 68",
        C.orange,5)}
      ${O(246,90,17,C.paper,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${T(246,97,"!",22,C.orange)}
    </g>

    <!-- Repair component. -->

    <g class="l-repair w13-moving" opacity="0">
      ${R(225,79,41,15,C.green,6)}
      ${O(225,86,9,C.green)}
      ${O(266,86,9,C.green)}
    </g>

    <!-- Benefits output moves outward. -->

    <g class="l-output w13-moving" opacity="0">
      ${money(170,184,C.green,1.2)}
    </g>

    <!-- Continuous improvement pulse. -->

    <g class="l-pulse w13-moving" opacity="0">
      ${O(170,184,77,"none",
        `stroke="${C.green}" stroke-width="4"
         stroke-dasharray="10 8"`)}
    </g>

    <!-- Project closure marker. -->

    <g class="l-closure w13-moving" opacity="0">
      ${R(91,345,158,32,C.paper,10,
        `stroke="${C.orange}" stroke-width="2"`)}
      ${T(170,366,"AFTER GO-LIVE",12,C.orange)}
    </g>

  `,"Sustained value needs an operating system");

  const captions=[
    "Delivery is not the end",
    "Benefits continue afterwards",
    "Sustained performance",
    "Measure the outcome",
    "Keep the baseline visible",
    "Detect performance drift",
    "Assign continuing ownership",
    "Authority must remain",
    "The business takes control",
    "Corrective action",
    "Respond to exceptions",
    "Change operating routines",
    "Verify financial results",
    "Reconcile with finance",
    "Preserve supporting evidence",
    "Four connected disciplines",
    "A missing connection",
    "Ownership can weaken",
    "Benefits may deteriorate",
    "Repair the operating system",
    "Reconnect accountability",
    "Restart the feedback loop",
    "Monitor across properties",
    "Review the benefit trajectory",
    "Update decisions",
    "Sustain measurable outcomes",
    "Do not declare victory early",
    "Value must keep working"
  ];

  createScene("W13O3b",body,
    [3,6,9,12,16,19,22,26],
    (r,b,i,n)=>{

    const interrupted=i>=16&&i<=19;

    const rotation=
      interrupted?
      16*19:
      i*19;

    transform(r,".l-wheel",
      `rotate(${rotation}deg)`);

    transform(r,".l-core",
      `scale(${1+Math.sin(i*.7)*.035})`);

    wheelNodes.forEach((p,j)=>{
      const active=
        i>=3+j*3;

      opacity(r,`.l-node-${j}`,
        active?1:.45);

      transform(r,`.l-node-${j}`,
        `scale(${active?
          1.04+(i%3)*.025:.88})`);
    });

    visible(r,".l-break",interrupted);

    visible(r,".l-repair",
      i>=19&&i<=21);

    transform(r,".l-repair",
      `translate(${i>=19?
        Math.max(0,60-(i-19)*30):60}px,
        ${Math.sin(i*.5)*5}px)`);

    visible(r,".l-output",
      i>=22&&i<=27);

    transform(r,".l-output",
      `translateY(${-((i-22)%4)*9}px)
       scale(${1+(i%3)*.06})`);

    visible(r,".l-pulse",i>=20);

    transform(r,".l-pulse",
      `rotate(${i*13}deg)`);

    visible(r,".l-closure",
      i>=1&&i<=5);

    label(r,".w13-status",
      captions[Math.min(i,27)]);
  });
}

// ============================================================
// SCENE 12 — W13O3c
// THE FINAL BENEFITS DECISION
//
// ORIGINAL VISUAL: THE FINAL EVIDENCE BRIDGE
//
// Two elevated platforms stand on opposite sides of a gap.
//
// LEFT: the implemented process.
// RIGHT: defensible, sustained business value.
//
// Individual bridge segments are lowered into place as
// evidence is examined:
//
// baseline, actual outcome, attribution, financial conversion,
// ownership and ongoing monitoring.
//
// A small traveller cannot cross until the bridge is complete.
//
// The final scene returns to the distinction introduced at
// the beginning of Week 13: going live is not the same as
// realising value.
//
// 30 narration moments.
// ============================================================

{
  const bridgeSegments=Array.from({length:6},(_,j)=>{
    const x=91+j*27;

    return `
      <g class="m-segment m-segment-${j} w13-moving">
        ${R(x,210,25,13,
          j%2?C.green:C.navy,3)}
        ${P(`M${x+12} 223 V261`,
          C.navy,2)}
      </g>`;
  }).join("");

  const body=stage(`
    <defs>
      <linearGradient id="w13m-sky"
        x1="0" y1="0" x2="0" y2="1">
        <stop stop-color="${C.paper}"/>
        <stop offset="1" stop-color="${C.blue}"/>
      </linearGradient>
    </defs>

    ${T(170,24,"FROM DELIVERY TO VALUE",13,C.navy)}

    <!-- Architectural environment. -->

    ${R(5,47,330,290,
      "url(#w13m-sky)",10)}

    ${O(267,90,31,C.gold,'opacity=".35"')}

    ${P("M20 158 Q76 123 132 157 M203 154 Q264 118 322 158",
      C.navy,2,'opacity=".2"')}

    <!-- Left platform: implementation. -->

    <g class="m-left">
      ${R(8,223,84,114,C.blue,4)}
      ${P("M8 223 H92",C.navy,5)}
      ${R(25,143,49,77,C.paper,6,
        `stroke="${C.navy}" stroke-width="3"`)}
      ${R(33,152,33,38,C.blue,4)}
      ${O(49,200,5,C.green)}
      ${T(50,359,"GO-LIVE",12,C.navy)}
    </g>

    <!-- Right platform: sustained business value. -->

    <g class="m-right">
      ${R(254,223,78,114,C.pale,4)}
      ${P("M254 223 H332",C.green,5)}
      ${building(291,185,C.green,.8)}
      ${T(291,359,"VALUE",12,C.green)}
    </g>

    <!-- The unsupported gap is visible initially. -->

    <g class="m-gap w13-moving">
      ${P("M92 223 L254 223",
        C.orange,2,
        'stroke-dasharray="5 9"')}
      ${T(173,285,"EVIDENCE GAP",12,C.orange)}
    </g>

    <!-- Six independent bridge sections. -->

    <g class="m-bridge">
      ${bridgeSegments}
    </g>

    <!-- Six evidence tokens above the bridge. -->

    ${[
      "BASELINE",
      "OUTCOME",
      "CAUSE",
      "FINANCE",
      "OWNER",
      "MONITOR"
    ].map((text,j)=>{
      const x=103+j*27;

      return `
        <g class="m-evidence m-evidence-${j} w13-moving">
          ${O(x,184,12,C.paper,
            `stroke="${j%2?C.green:C.navy}"
             stroke-width="2"`)}
          ${T(x,188,String(j+1),11,C.navy)}
        </g>`;
    }).join("")}

    <!-- Traveller representing the management decision. -->

    <g class="m-traveller w13-moving">
      ${person(63,198,C.orange,.85)}
    </g>

    <!-- A luminous value signal travels to the destination. -->

    <g class="m-value w13-moving" opacity="0">
      ${money(291,151,C.green,1.15)}
    </g>

    <!-- Final verification ring. -->

    <g class="m-proof w13-moving" opacity="0">
      ${O(291,184,55,"none",
        `stroke="${C.green}" stroke-width="4"
         stroke-dasharray="8 8"`)}
      ${check(291,184,C.green,1.2)}
    </g>

    <!-- Unresolved financial claims. -->

    <g class="m-question w13-moving" opacity="0">
      ${O(170,137,26,C.paper,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${T(170,147,"?",34,C.orange)}
    </g>

    <!-- Final decision marker. -->

    <g class="m-decision w13-moving" opacity="0">
      ${R(102,296,136,35,C.paper,11,
        `stroke="${C.green}" stroke-width="2"`)}
      ${T(170,318,"DEFEND THE VALUE",12,C.green)}
    </g>

  `,"Build the evidence bridge");

  const captions=[
    "The final benefits decision",
    "Implementation is only the start",
    "The evidence gap remains",
    "Begin with the baseline",
    "Know the starting position",
    "Define the intended benefit",
    "Measure actual outcomes",
    "Compare before and after",
    "Investigate the difference",
    "Test competing causes",
    "Do not confuse correlation",
    "Preserve attribution uncertainty",
    "Verify financial conversion",
    "Check actual expenditure",
    "Examine revenue contribution",
    "Separate risk from cash",
    "Assign accountable ownership",
    "Identify management action",
    "Keep decisions traceable",
    "Continue benefits monitoring",
    "Review across properties",
    "Respond to weak results",
    "Reconcile the reported gap",
    "The promise and tracking",
    "Avoid unsupported allocations",
    "Build a defensible judgement",
    "Move from activity to value",
    "Sustain the operating result",
    "Demonstrate the real benefit",
    "Realize Value"
  ];

  createScene("W13O3c",body,
    [3,6,9,12,16,19,22,26,29],
    (r,b,i,n)=>{

    // Six evidence components are progressively lowered.
    // Their arrival represents a requirement being examined,
    // not an assertion that Qasr has already proved it.

    const thresholds=[3,6,9,12,16,19];

    bridgeSegments.forEach((_,j)=>{
      const installed=i>=thresholds[j];

      opacity(r,`.m-segment-${j}`,
        installed?1:.15);

      transform(r,`.m-segment-${j}`,
        installed?
        `translateY(${Math.sin(i*.4+j)*2}px)`:
        "translateY(-73px) rotate(-8deg)");

      opacity(r,`.m-evidence-${j}`,
        installed?1:.35);

      transform(r,`.m-evidence-${j}`,
        installed?
        `translateY(${(i+j)%3*-3}px)`:
        "translateY(-20px)");
    });

    // The traveller only crosses after all six evidence
    // requirements have been introduced.
    const travellerX=
      i<19?0:
      Math.min(220,(i-19)*22);

    transform(r,".m-traveller",
      `translate(${travellerX}px,
        ${Math.sin(i*.7)*3}px)`);

    visible(r,".m-gap",i<19);

    visible(r,".m-question",
      (i>=2&&i<=3) ||
      (i>=10&&i<=11) ||
      (i>=22&&i<=25));

    transform(r,".m-question",
      `translateY(${Math.sin(i*.6)*8}px)`);

    visible(r,".m-value",i>=26);

    transform(r,".m-value",
      `translateY(${-((i-26)%4)*9}px)
       scale(${1+(i%3)*.07})`);

    visible(r,".m-proof",i>=28);

    transform(r,".m-proof",
      `rotate(${i*9}deg)`);

    visible(r,".m-decision",i>=25);

    transform(r,".m-decision",
      `translateY(${i>=25?
        Math.max(0,20-(i-25)*7):20}px)`);

    label(r,".w13-status",
      captions[Math.min(i,29)]);
  });
}

// ============================================================
// WEEK 13 SCENE REGISTRY COMPLETE
//
// Registered:
//   W13O1a  The Hotel's Invisible Money
//   W13O1b  The Benefits Time Observatory
//   W13O1c  The Economic Sorting Machine
//   W13O1d  The Competing Causes Laboratory
//   W13O2a  The Missing Benefits Vault
//   W13O2b  The Invisible Savings Factory
//   W13O2c  The Staffing Assumption Theatre
//   W13O2d  The Two Evidence Chambers
//   W13O2e  The Audit Reconciliation Table
//   W13O3a  The Benefits Control Tower
//   W13O3b  The Sustainable Value Flywheel
//   W13O3c  The Final Evidence Bridge
//
// Integration:
// <script src="weeks/week13/scenes-week.js"></script>
//
// Public API:
// window.VL_SCENES[sectionId].build(container)
// window.VL_SCENES[sectionId].step(momentIndex,totalMoments)
// window.VL_SCENES[sectionId].reset()
//
// The engine does not create narration text.
// Each section is registered independently.
// No external image assets are required.
// ============================================================

})();
