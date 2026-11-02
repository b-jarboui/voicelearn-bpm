/*
 * OPER621 — WEEK 3 CINEMATIC SCENES
 * BPM Technology and Critical Success Factors
 *
 * Nine original, section-specific animated environments.
 *
 * W3O1a — The Seductive Check-in Kiosk
 * W3O1b — The Five-Storey BPM Machine
 * W3O2a — The Leadership Bridge
 * W3O2b — The Benefits Observatory
 * W3O2c — The Five Failure Chambers
 * W3O3a — The Vendor Demonstration Theatre
 * W3O3b — The Four-Year Cost Machine
 * W3O3c — The Contract Readiness Vault
 * W3O2d — The Noor Hospital Evidence X-Ray
 *
 * CONTRACT
 * window.VL_SCENES[secId] = {
 *   build(el),
 *   step(i, n),
 *   reset()
 * };
 *
 * Every narration index produces a distinct visual state.
 * All scenes are seek-safe, responsive and reduced-motion aware.
 * No narration sentences are reproduced inside scenes.
 *
 * This file registers scenes only. It does not replace the
 * existing application scene host or narration controller.
 */

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
    pale: "#e5f2e9",
    grey: "#9ab0c1",
    white: "#ffffff"
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

  const R = (x, y, w, h, fill, rx = 8, extra = "") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}"
      rx="${rx}" fill="${fill}" ${extra}/>`;

  const O = (x, y, r, fill, extra = "") =>
    `<circle cx="${x}" cy="${y}" r="${r}"
      fill="${fill}" ${extra}/>`;

  const P = (d, stroke = C.navy, width = 3, extra = "") =>
    `<path d="${d}" fill="none" stroke="${stroke}"
      stroke-width="${width}" stroke-linecap="round"
      stroke-linejoin="round" ${extra}/>`;

  const T = (x, y, value, size = 13, color = C.ink, extra = "") =>
    `<text x="${x}" y="${y}" text-anchor="middle"
      font-size="${size}" fill="${color}" ${extra}>${value}</text>`;

  const person = (x, y, color = C.navy, scale = 1) =>
    `<g transform="translate(${x} ${y}) scale(${scale})">
      ${O(0, -12, 9, color)}
      <path d="M-16 16 Q-16 -2 0 -2 Q16 -2 16 16Z"
        fill="${color}"/>
    </g>`;

  const tick = (x, y, color = C.green) =>
    P(`M${x-9} ${y} l7 7 15 -18`, color, 4);

  const cross = (x, y, color = C.orange) =>
    P(`M${x-8} ${y-8} l16 16 M${x+8} ${y-8} l-16 16`,
      color, 4);

  const svg = body =>
    `<svg class="vls-w03-art" xmlns="${NS}"
      viewBox="0 0 340 390"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Animated BPM teaching illustration">
      ${body}
    </svg>`;

  const $ = (root, selector) =>
    root ? root.querySelector(selector) : null;

  const $$ = (root, selector) =>
    root ? Array.from(root.querySelectorAll(selector)) : [];

  const set = (root, selector, properties) => {
    $$(root, selector).forEach(node => {
      Object.entries(properties).forEach(([key, value]) => {
        if (key === "text") {
          node.textContent = String(value);
        } else if (key === "attr") {
          Object.entries(value).forEach(([a, v]) =>
            node.setAttribute(a, String(v))
          );
        } else {
          node.style[key] = String(value);
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
      transform: `translate(${x}px,${y}px) scale(${scale})`
    });

  const label = (root, value) => {
    const e = $(root, ".vls-w03-status");
    if (e) e.textContent = value;
  };

  const phase = (i, cuts) =>
    cuts.reduce((sum, cut) => sum + (i >= cut ? 1 : 0), 0);

  // ------------------------------------------------------------
  // SHARED STYLING
  // Exactly one style element for all nine scenes.
  // Every selector is scoped to a Week 3 section root.
  // ------------------------------------------------------------

  const IDS = [
    "W3O1a", "W3O1b",
    "W3O2a", "W3O2b", "W3O2c",
    "W3O3a", "W3O3b", "W3O3c", "W3O2d"
  ];

  const scope = IDS.map(id => `.vls-w03-${id}`).join(",");

  if (!document.getElementById("vl-sc-w03")) {
    const style = document.createElement("style");
    style.id = "vl-sc-w03";

    style.textContent = `
      ${scope}{
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
        isolation:isolate;
        background:transparent;
        color:var(--ink);
        font-family:inherit;
      }

      ${IDS.map(id =>
        `.vls-w03-${id} *`
      ).join(",")}{
        box-sizing:border-box;
      }

      ${IDS.map(id =>
        `.vls-w03-${id} .vls-w03-art`
      ).join(",")}{
        display:block;
        width:100%;
        height:100%;
        max-width:100%;
        max-height:100%;
        overflow:hidden;
        font-family:inherit;
      }

      ${IDS.map(id =>
        `.vls-w03-${id} svg text`
      ).join(",")}{
        font-family:inherit;
        font-weight:700;
        letter-spacing:.15px;
      }

      ${IDS.map(id =>
        `.vls-w03-${id} .vls-w03-moving`
      ).join(",")}{
        transition:
          transform .85s cubic-bezier(.2,.75,.2,1),
          opacity .65s ease,
          fill .7s ease,
          stroke .7s ease,
          stroke-dashoffset .9s ease;
      }

      ${IDS.map(id =>
        `.vls-w03-${id} .vls-w03-top`
      ).join(",")}{
        position:absolute;
        top:2%;
        left:5%;
        right:5%;
        text-align:center;
        color:var(--navy);
        font-size:11px;
        font-weight:800;
        letter-spacing:1.3px;
        pointer-events:none;
      }

      ${IDS.map(id =>
        `.vls-w03-${id} .vls-w03-status`
      ).join(",")}{
        position:absolute;
        bottom:2%;
        left:4%;
        right:4%;
        text-align:center;
        color:var(--navy);
        font-size:12px;
        font-weight:750;
        letter-spacing:.25px;
        pointer-events:none;
      }

      ${IDS.map(id =>
        `.vls-w03-${id} .vls-w03-progress`
      ).join(",")}{
        position:absolute;
        bottom:0;
        left:0;
        height:3px;
        width:0;
        background:var(--orange);
        transition:width .65s ease;
      }

      ${IDS.map(id =>
        `.vls-w03-${id}.vls-w03-instant *`
      ).join(",")}{
        transition:none!important;
        animation:none!important;
      }

      .vls-w03-W3O1a .guest,
      .vls-w03-W3O1a .camera,
      .vls-w03-W3O1a .screen,
      .vls-w03-W3O1a .connection{
        transition:transform 1s ease,opacity .7s ease;
      }

      .vls-w03-W3O1b .lift,
      .vls-w03-W3O1b .layer,
      .vls-w03-W3O1b .signal{
        transition:transform .9s ease,opacity .7s ease;
      }

      .vls-w03-W3O2a .bridge,
      .vls-w03-W3O2a .leader,
      .vls-w03-W3O2a .worker,
      .vls-w03-W3O2a .cable{
        transition:transform .9s ease,opacity .7s ease;
      }

      .vls-w03-W3O2b .needle{
        transform-origin:170px 205px;
        transition:transform .9s ease;
      }

      .vls-w03-W3O2b .measure,
      .vls-w03-W3O2b .target,
      .vls-w03-W3O2b .owner{
        transition:opacity .7s ease,transform .8s ease;
      }

      .vls-w03-W3O2c .chamber,
      .vls-w03-W3O2c .diagnostic,
      .vls-w03-W3O2c .failure{
        transition:opacity .7s ease,transform .85s ease;
      }

      .vls-w03-W3O3a .curtain,
      .vls-w03-W3O3a .projector,
      .vls-w03-W3O3a .exception,
      .vls-w03-W3O3a .director{
        transition:transform .9s ease,opacity .7s ease;
      }

      .vls-w03-W3O3b .cost,
      .vls-w03-W3O3b .gear,
      .vls-w03-W3O3b .clock,
      .vls-w03-W3O3b .chain{
        transition:transform .9s ease,opacity .7s ease;
      }

      .vls-w03-W3O3c .vault,
      .vls-w03-W3O3c .lock,
      .vls-w03-W3O3c .key,
      .vls-w03-W3O3c .seal{
        transition:transform .9s ease,opacity .7s ease;
      }

      .vls-w03-W3O2d .scanner,
      .vls-w03-W3O2d .hospital,
      .vls-w03-W3O2d .evidence,
      .vls-w03-W3O2d .result{
        transition:transform .9s ease,opacity .7s ease;
      }

      @media(max-width:375px){
        ${IDS.map(id =>
          `.vls-w03-${id} .vls-w03-top`
        ).join(",")}{
          font-size:10px;
          letter-spacing:.9px;
        }

        ${IDS.map(id =>
          `.vls-w03-${id} .vls-w03-status`
        ).join(",")}{
          font-size:11px;
        }
      }

      @media(prefers-reduced-motion:reduce){
        ${IDS.map(id =>
          `.vls-w03-${id} *`
        ).join(",")}{
          animation:none!important;
          transition:none!important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  // ------------------------------------------------------------
  // SCENE ENGINE
  //
  // Scene geometry is built once per mount.
  // step() updates persistent objects without rebuilding SVG.
  // Index-dependent micro-motion ensures that even two narration
  // moments within the same conceptual beat look different.
  // ------------------------------------------------------------

  function register(id, config) {
    let root = null;
    let lastIndex = -1;
    let animation = null;

    function stopAnimation() {
      if (animation) {
        try { animation.kill(); } catch (_) {}
        animation = null;
      }
    }

    function apply(index, total, instant) {
      if (!root) return;

      const n = Number.isFinite(Number(total)) && Number(total) > 0
        ? Math.floor(Number(total))
        : config.count;

      const i = clamp(
        Math.floor(Number(index) || 0),
        0,
        Math.max(0, n - 1)
      );

      const beat = phase(i, config.cuts);
      const local = i - (config.cuts[beat - 1] || 0);

      stopAnimation();

      root.classList.toggle(
        "vls-w03-instant",
        instant || reduced()
      );

      config.render(root, beat, i, local, n);

      // Each sentence advances the visual, including null moments.
      // The micro-motion is intentionally small: it never obscures
      // the major narrative transformation.
      const art = $(root, ".vls-w03-art");

      if (art) {
        const dx = Math.sin(i * 1.71) * 1.5;
        const dy = Math.cos(i * 1.31) * 1.3;
        const scale = 1 + (i % 4) * .002;

        if (!instant && !reduced() && window.gsap) {
          animation = window.gsap.to(art, {
            x: dx,
            y: dy,
            scale,
            duration: .65,
            ease: "power2.out",
            overwrite: true
          });
        } else {
          art.style.transform =
            `translate(${dx}px,${dy}px) scale(${scale})`;
        }
      }

      // An additional scene-specific accent advances every moment.
      const accent = $(root, ".vls-w03-accent");
      if (accent) {
        accent.style.transform =
          `rotate(${i * 13}deg) scale(${1 + (i % 3) * .035})`;
        accent.style.opacity = String(.35 + (i % 4) * .16);
      }

      const progress = $(root, ".vls-w03-progress");
      if (progress) {
        progress.style.width =
          `${((i + 1) / Math.max(1, n)) * 100}%`;
      }

      lastIndex = i;
    }

    window.VL_SCENES[id] = {
      build(el) {
        if (!el) return;

        stopAnimation();

        root = document.createElement("div");
        root.className = `vls-w03-${id}`;

        root.innerHTML = `
          <div class="vls-w03-top">${config.heading}</div>
          ${svg(config.art)}
          <div class="vls-w03-status"></div>
          <div class="vls-w03-progress"></div>
        `;

        el.replaceChildren(root);
        lastIndex = -1;
        apply(0, config.count, true);
      },

      step(i, n) {
        if (!root) return;
        apply(i, n, false);
      },

      reset() {
        if (!root) return;
        stopAnimation();
        lastIndex = -1;
        apply(0, config.count, true);
      }
    };
  }

  // ============================================================
  // W3O1a — THE SEDUCTIVE CHECK-IN KIOSK
  //
  // A guest approaches an elegant automated check-in station.
  // The camera exposes disconnected systems behind the screen.
  // The broken route is removed before technology is reintroduced.
  //
  // 32 narration moments.
  // ============================================================

  {
    const art = `
      <defs>
        <radialGradient id="w03a-light">
          <stop stop-color="#dbe7f2" stop-opacity=".85"/>
          <stop offset="1" stop-color="#fbf8f1" stop-opacity="0"/>
        </radialGradient>
      </defs>

      ${O(170,180,155,"url(#w03a-light)")}

      <g class="camera">
        ${P("M18 290 L170 235 L322 290",C.grey,2)}
        ${P("M170 235 V335 M85 265 L55 335 M255 265 L285 335",C.blue,2)}

        ${R(25,91,60,143,C.paper,3,
          `stroke="${C.grey}" stroke-width="3"`)}
        ${R(255,91,60,143,C.paper,3,
          `stroke="${C.grey}" stroke-width="3"`)}

        ${P("M35 108 H75 M265 108 H305",C.orange,3)}

        <g class="kiosk vls-w03-moving">
          ${R(125,93,90,151,C.navy,15)}
          ${R(134,103,72,102,C.blue,8)}
          ${R(145,116,50,12,C.green,5)}
          ${P("M147 146 H193 M147 158 H182",C.navy,3)}
          ${O(170,185,6,C.green)}
          ${P("M170 244 V285 M143 285 H197",C.navy,8)}
        </g>

        <g class="screen vls-w03-moving">
          ${R(139,133,62,52,C.orange,7)}
          ${T(170,165,"!",31,C.white)}
        </g>

        <g class="guest vls-w03-moving">
          ${person(58,267,C.navy,1.1)}
          ${R(76,258,18,27,C.orange,3)}
        </g>

        <g class="connection vls-w03-moving">
          ${P("M170 218 C95 224 90 185 63 177",C.orange,4)}
          ${P("M170 218 C245 224 250 185 278 177",C.orange,4)}
          ${O(63,177,9,C.orange)}
          ${O(278,177,9,C.orange)}
          ${cross(63,177,C.white)}
          ${cross(278,177,C.white)}
        </g>

        <g class="redesign vls-w03-moving">
          ${P("M58 320 Q170 278 282 320",C.green,6)}
          ${O(58,320,10,C.green)}
          ${O(170,296,10,C.green)}
          ${O(282,320,10,C.green)}
          ${tick(170,160,C.green)}
        </g>

        <g class="manual vls-w03-moving">
          ${R(113,36,114,49,C.paper,7,
            `stroke="${C.orange}" stroke-width="2"`)}
          ${T(170,56,"PROCESS",12,C.navy)}
          ${T(170,72,"BEFORE TOOL",11,C.orange)}
        </g>
      </g>

      ${O(170,348,6,C.orange,
        `class="vls-w03-accent vls-w03-moving"`)}
    `;

    register("W3O1a", {
      count: 32,
      heading: "THE SCREEN IS NOT THE PROCESS",
      cuts: [3,5,7,9,13,16,19,22,26,29],
      art,

      render(r,b,i) {
        move(r,".guest",
          [0,30,55,78,78,78,78,78,55,30,0][b],
          0
        );

        show(r,".screen",b>=3 && b<=7);
        show(r,".connection",b>=4 && b<=8);
        show(r,".redesign",b>=8);
        show(r,".manual",b>=6 && b<=9);

        set(r,".kiosk",{
          opacity:b===7?".3":"1",
          transform:b===8
            ?"translateY(18px) scale(.85)"
            :"translateY(0) scale(1)"
        });

        set(r,".camera",{
          transform:`translateY(${b===4?-9:0}px)
            scale(${b===4?1.045:1})`
        });

        const statuses = [
          "The guest returns",
          "A polished demonstration",
          "The guest approaches",
          "A perfect screen",
          "Connections are broken",
          "BPM is management",
          "Software supports work",
          "Automation preserves waste",
          "Redesign before automation",
          "Technology enters later",
          "People design the process"
        ];

        label(r,statuses[b]);
      }
    });
  }

  // ============================================================
  // W3O1b — THE FIVE-STOREY BPM MACHINE
  //
  // A transparent vertical machine with five working floors.
  // A moving lift carries one guest request through modelling,
  // execution, rules, integration and monitoring.
  // ============================================================

  {
    const names = [
      "MODELLING",
      "WORKFLOW",
      "RULES",
      "INTEGRATION",
      "MONITORING"
    ];

    const floors = names.map((name,j) => {
      const y = 69+j*55;
      return `
        <g class="layer layer-${j} vls-w03-moving">
          ${R(74,y,197,45,C.paper,8,
            `stroke="${C.navy}" stroke-width="2"`)}
          ${R(78,y+4,11,37,
            j===2?C.orange:C.green,3)}
          ${T(171,y+19,name,12,C.navy)}
          ${P(`M111 ${y+29} H231`,C.blue,4)}
          ${O(246,y+23,7,C.green)}
        </g>
      `;
    }).join("");

    const art = `
      ${T(170,37,"THE OPERATING SUITE",14,C.navy)}

      ${R(59,54,226,300,C.blue,15,
        `fill-opacity=".32" stroke="${C.grey}"
         stroke-width="2"`)}

      ${floors}

      ${P("M49 68 V339",C.navy,5)}
      ${P("M38 68 H60 M38 339 H60",C.navy,4)}

      <g class="lift vls-w03-moving">
        ${R(29,67,39,44,C.navy,8)}
        ${R(35,74,27,24,C.paper,4)}
        ${O(48,86,7,C.orange)}
      </g>

      <g class="signal vls-w03-moving">
        ${P("M270 92 H309 V309 H270",C.green,3)}
        ${O(309,92,6,C.green)}
        ${O(309,309,6,C.green)}
      </g>

      <g class="unused vls-w03-moving">
        ${P("M102 194 L254 194",C.orange,7)}
        ${cross(171,194)}
      </g>

      <g class="dashboard vls-w03-moving">
        ${R(111,127,119,134,C.paper,10,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${P("M130 229 V195 M158 229 V171 M186 229 V151",
          C.green,11)}
        ${T(170,248,"LIVE RESULTS",11,C.navy)}
      </g>

      ${O(170,368,7,C.orange,
        `class="vls-w03-accent vls-w03-moving"`)}
    `;

    register("W3O1b", {
      count:34,
      heading:"FIVE LAYERS · ONE PROCESS",
      cuts:[3,6,9,12,15,18,21,24,27,30],
      art,

      render(r,b,i) {
        const floor = Math.min(4,Math.floor(b/2));

        move(r,".lift",0,floor*55);

        for(let j=0;j<5;j++) {
          const active = j<=floor;

          set(r,`.layer-${j}`,{
            opacity:active?"1":".24",
            transform:active
              ?`translateX(${(i%3)*2}px)`
              :"translateX(9px)"
          });
        }

        show(r,".unused",b===8 || b===9);
        show(r,".dashboard",b>=7 && b<=8);

        set(r,".signal",{
          opacity:b>=5?"1":".15",
          transform:`translateY(${(i%4)*3}px)`
        });

        const statuses=[
          "Open the suite",
          "See the process",
          "Route the work",
          "Apply rate rules",
          "Connect the systems",
          "Watch live performance",
          "Act on exceptions",
          "Manage every day",
          "Unused capabilities",
          "The Noor warning",
          "Value requires use"
        ];

        label(r,statuses[b]);
      }
    });
  }

  // ============================================================
  // W3O2a — THE LEADERSHIP BRIDGE
  //
  // Three departments occupy separate riverbanks.
  // An incomplete suspension bridge cannot carry the guest.
  // Leadership, ownership and employee knowledge complete it.
  // ============================================================

  {
    const art=`
      <defs>
        <linearGradient id="w03leadwater" x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="#dbe7f2"/>
          <stop offset="1" stop-color="#fbf8f1"/>
        </linearGradient>
      </defs>

      ${R(0,215,340,122,"url(#w03leadwater)",0)}

      ${P("M0 236 Q40 224 80 236 T160 236 T240 236 T340 236",
        C.grey,2)}

      ${R(0,175,92,44,C.blue,5)}
      ${R(248,175,92,44,C.blue,5)}

      ${T(45,166,"RECEPTION",11,C.navy)}
      ${T(295,166,"REVENUE",11,C.navy)}

      <g class="bridge vls-w03-moving">
        ${P("M69 215 H271",C.navy,8)}
        ${P("M87 215 V98 M253 215 V98",C.navy,8)}
        ${P("M87 104 Q170 176 253 104",C.orange,5)}

        ${[105,127,149,171,193,215,237].map(x=>
          P(`M${x} 215 V${120+
            Math.abs(x-171)*.29}`,C.grey,2)
        ).join("")}
      </g>

      <g class="gap vls-w03-moving">
        ${R(147,205,47,21,C.paper,2)}
        ${P("M147 207 L194 226 M194 207 L147 226",
          C.orange,4)}
      </g>

      <g class="leader vls-w03-moving">
        ${person(170,76,C.orange,1.25)}
        ${O(170,37,20,C.blue,
          `stroke="${C.orange}" stroke-width="2"`)}
        ${T(170,42,"!",20,C.orange)}
      </g>

      <g class="owner vls-w03-moving">
        ${person(170,190,C.green,.9)}
        ${O(170,162,14,C.paper,
          `stroke="${C.green}" stroke-width="2"`)}
        ${tick(170,164)}
      </g>

      <g class="worker worker-a vls-w03-moving">
        ${person(42,200,C.navy,.8)}
      </g>

      <g class="worker worker-b vls-w03-moving">
        ${person(297,200,C.green,.8)}
      </g>

      <g class="cable vls-w03-moving">
        ${P("M42 266 Q170 321 297 266",C.green,5)}
        ${O(42,266,8,C.green)}
        ${O(297,266,8,C.green)}
      </g>

      <g class="knowledge vls-w03-moving">
        ${O(170,290,32,C.paper,
          `stroke="${C.green}" stroke-width="3"`)}
        ${T(170,286,"FRONT-LINE",11,C.navy)}
        ${T(170,302,"INSIGHT",11,C.green)}
      </g>

      ${O(170,354,7,C.orange,
        `class="vls-w03-accent vls-w03-moving"`)}
    `;

    register("W3O2a",{
      count:25,
      heading:"PEOPLE HOLD THE PROCESS",
      cuts:[2,5,8,11,14,17,20,23],
      art,

      render(r,b,i){
        show(r,".gap",b<4);
        show(r,".owner",b>=4);
        show(r,".knowledge",b>=6);
        show(r,".cable",b>=5);

        set(r,".leader",{
          transform:`translateY(${b<2?-15:0}px)`,
          opacity:b===1?".35":"1"
        });

        set(r,".bridge",{
          opacity:b<3?".4":"1",
          transform:b===2
            ?"translateY(13px)"
            :"translateY(0)"
        });

        move(r,".worker-a",
          b>=6?Math.min(75,(i-17)*8):0,0);

        move(r,".worker-b",
          b>=6?-Math.min(75,(i-17)*8):0,0);

        label(r,[
          "Installation is not adoption",
          "Departments remain divided",
          "Leadership must stay",
          "Decisions need authority",
          "Name the process owner",
          "Begin change early",
          "Listen to front-line work",
          "Build internal capability",
          "One connected journey"
        ][b]);
      }
    });
  }

  // ============================================================
  // W3O2b — THE BENEFITS OBSERVATORY
  //
  // A giant instrument measures actual process performance.
  // Strategy provides the compass, baseline anchors the dial,
  // and an accountable owner keeps the instrument operating.
  // Noor's target and result are displayed as distinct readings.
  // ============================================================

  {
    const art=`
      ${T(170,37,"MEASURE THE OUTCOME",14,C.navy)}

      ${O(170,205,119,C.blue,
        `fill-opacity=".4" stroke="${C.navy}"
         stroke-width="4"`)}

      ${O(170,205,97,C.paper,
        `stroke="${C.grey}" stroke-width="2"`)}

      ${Array.from({length:11},(_,j)=>{
        const a=(-130+j*26)*Math.PI/180;
        const x1=170+78*Math.sin(a);
        const y1=205-78*Math.cos(a);
        const x2=170+92*Math.sin(a);
        const y2=205-92*Math.cos(a);
        return P(`M${x1} ${y1} L${x2} ${y2}`,C.navy,2);
      }).join("")}

      <g class="needle vls-w03-moving">
        ${P("M170 205 L170 123",C.orange,7)}
        ${O(170,205,12,C.navy)}
      </g>

      <g class="measure vls-w03-moving">
        ${T(170,240,"4.1 h",27,C.navy)}
        ${T(170,262,"BASELINE",12,C.navy)}
      </g>

      <g class="target vls-w03-moving">
        ${O(170,205,60,"none",
          `stroke="${C.green}" stroke-width="4"
           stroke-dasharray="9 6"`)}
        ${T(170,240,"2.87 h",25,C.green)}
        ${T(170,262,"TARGET",12,C.green)}
      </g>

      <g class="actual vls-w03-moving">
        ${T(170,240,"3.9 h",28,C.orange)}
        ${T(170,262,"ACTUAL",12,C.orange)}
      </g>

      <g class="compass vls-w03-moving">
        ${O(170,69,22,C.paper,
          `stroke="${C.navy}" stroke-width="2"`)}
        ${P("M170 55 L177 75 L170 70 L163 75 Z",
          C.orange,2)}
      </g>

      <g class="owner vls-w03-moving">
        ${person(52,305,C.green,.9)}
        ${P("M70 306 H116",C.green,3)}
        ${O(122,306,8,C.green)}
      </g>

      <g class="timeline vls-w03-moving">
        ${P("M125 325 H285",C.navy,4)}
        ${O(130,325,8,C.orange)}
        ${O(205,325,8,C.blue)}
        ${O(280,325,8,C.green)}
        ${T(205,350,"BEYOND GO-LIVE",12,C.navy)}
      </g>

      ${O(170,374,6,C.orange,
        `class="vls-w03-accent vls-w03-moving"`)}
    `;

    register("W3O2b",{
      count:27,
      heading:"A PROMISE NEEDS PROOF",
      cuts:[3,6,9,12,15,18,21,24],
      art,

      render(r,b,i){
        show(r,".compass",b>=1);
        show(r,".target",b>=4 && b<=5);
        show(r,".actual",b>=6);
        show(r,".measure",b<4);
        show(r,".owner",b>=3);
        show(r,".timeline",b>=7);

        const angles=[-45,-25,-10,0,36,36,8,8,0];

        set(r,".needle",{
          transform:`rotate(${angles[b]+(i%3)*2}deg)`
        });

        label(r,[
          "Installation is not success",
          "Connect to strategy",
          "Define the benefit",
          "Record the baseline",
          "Promise: thirty percent",
          "Target: 2.87 hours",
          "Actual: 3.9 hours",
          "Govern beyond launch",
          "Sustain measurable value"
        ][b]);
      }
    });
  }

  // ============================================================
  // W3O2c — THE FIVE FAILURE CHAMBERS
  //
  // A long industrial inspection hall contains five distinct
  // malfunctioning mechanisms. A diagnostic spotlight moves
  // from failure to failure, then exposes their shared causes.
  // ============================================================

  {
    const chambers=[
      ["SHELFWARE",C.navy],
      ["AUTO MESS",C.orange],
      ["STALLED PILOT",C.navy],
      ["LOST BENEFITS",C.orange],
      ["REJECTION",C.navy]
    ];

    const art=`
      ${T(170,32,"THE FAILURE FACTORY",14,C.navy)}

      ${R(21,53,298,287,C.blue,16,
        `fill-opacity=".25" stroke="${C.grey}"
         stroke-width="2"`)}

      ${chambers.map(([name,color],j)=>{
        const y=65+j*53;

        return `
          <g class="chamber chamber-${j} vls-w03-moving">
            ${R(34,y,272,44,C.paper,8,
              `stroke="${color}" stroke-width="2"`)}
            ${O(56,y+22,12,color)}
            ${T(56,y+27,String(j+1),13,C.white)}
            ${T(166,y+27,name,12,C.navy)}
            ${O(284,y+22,8,C.orange)}
          </g>
        `;
      }).join("")}

      <g class="diagnostic vls-w03-moving">
        ${R(25,58,290,50,"none",9,
          `stroke="${C.orange}" stroke-width="4"`)}
        ${P("M170 108 V128",C.orange,3)}
        ${O(170,130,8,C.orange)}
      </g>

      <g class="failure vls-w03-moving">
        ${R(114,130,112,116,C.paper,13,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${O(170,171,26,C.blue)}
        ${cross(170,171)}
        ${T(170,221,"ROOT CAUSE",12,C.navy)}
      </g>

      <g class="repair vls-w03-moving">
        ${P("M78 355 H262",C.green,5)}
        ${O(78,355,9,C.green)}
        ${O(170,355,9,C.green)}
        ${O(262,355,9,C.green)}
        ${tick(170,326)}
      </g>

      ${O(170,375,6,C.orange,
        `class="vls-w03-accent vls-w03-moving"`)}
    `;

    register("W3O2c",{
      count:28,
      heading:"FIVE PREDICTABLE FAILURES",
      cuts:[2,5,8,11,14,17,20,23,26],
      art,

      render(r,b,i){
        const focus=clamp(
          b===0?0:b===1?0:b===2?1:
          b===3?2:b===4?3:b===5?4:
          Math.floor((i-17)/3),
          0,4
        );

        for(let j=0;j<5;j++){
          set(r,`.chamber-${j}`,{
            opacity:b>=6?"1":j===focus?"1":".25",
            transform:j===focus
              ?"translateX(7px)"
              :"translateX(0)"
          });
        }

        move(r,".diagnostic",0,focus*53);

        show(r,".failure",b>=6 && b<=8);
        show(r,".repair",b>=8);

        label(r,[
          "Inspect the programme",
          "Models gather dust",
          "Automate the mess",
          "One pilot stops",
          "Benefits evaporate",
          "People reject change",
          "Look beneath symptoms",
          "Find missing conditions",
          "Investigate Noor",
          "Prevent the failure"
        ][b]);
      }
    });
  }

  // ============================================================
  // W3O3a — THE VENDOR DEMONSTRATION THEATRE
  //
  // A cinematic stage presents a flawless digital check-in.
  // The curtains part to reveal the real guest's difficult case.
  // The committee turns the vendor's script into a test.
  // ============================================================

  {
    const art=`
      ${R(18,54,304,260,C.blue,13,
        `fill-opacity=".35" stroke="${C.navy}"
         stroke-width="3"`)}

      <g class="curtain left-curtain vls-w03-moving">
        ${R(19,55,151,258,C.orange,6)}
        ${Array.from({length:6},(_,j)=>
          P(`M${35+j*24} 55 V313`,C.paper,2,
            `opacity=".25"`)
        ).join("")}
      </g>

      <g class="curtain right-curtain vls-w03-moving">
        ${R(170,55,151,258,C.orange,6)}
        ${Array.from({length:6},(_,j)=>
          P(`M${185+j*24} 55 V313`,C.paper,2,
            `opacity=".25"`)
        ).join("")}
      </g>

      <g class="projector vls-w03-moving">
        ${R(63,77,214,199,C.paper,10)}
        ${R(115,103,110,126,C.navy,13)}
        ${R(126,114,88,79,C.blue,7)}
        ${tick(170,157)}
        ${T(170,213,"EASY ARRIVAL",12,C.white)}
      </g>

      <g class="exception vls-w03-moving">
        ${R(82,90,176,158,C.paper,9,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${person(115,173,C.navy,.85)}
        ${R(166,132,68,53,C.blue,6)}
        ${cross(200,158)}
        ${T(170,220,"ROOM NOT READY",12,C.orange)}
      </g>

      <g class="director vls-w03-moving">
        ${person(170,330,C.navy,.85)}
        ${person(100,330,C.green,.75)}
        ${person(240,330,C.orange,.75)}
      </g>

      <g class="test vls-w03-moving">
        ${P("M75 289 H265",C.green,5)}
        ${O(75,289,8,C.green)}
        ${O(170,289,8,C.green)}
        ${O(265,289,8,C.green)}
      </g>

      ${O(170,365,7,C.orange,
        `class="vls-w03-accent vls-w03-moving"`)}
    `;

    register("W3O3a",{
      count:29,
      heading:"WHO DESIGNS THE PROCESS?",
      cuts:[2,5,8,11,14,17,20,23,26],
      art,

      render(r,b,i){
        const open=b>=1;

        move(r,".left-curtain",open?-122:0,0);
        move(r,".right-curtain",open?122:0,0);

        show(r,".projector",b>=1 && b<=5);
        show(r,".exception",b>=5);
        show(r,".test",b>=7);

        set(r,".director",{
          opacity:b>=2?"1":".3",
          transform:`translateY(${b>=3?-8:0}px)`
        });

        label(r,[
          "Three vendors compete",
          "The theatre opens",
          "Different directors",
          "The design is missing",
          "A perfect guest",
          "Reality interrupts",
          "Design the to-be",
          "Test the hardest case",
          "Score real requirements",
          "Demonstrations test design"
        ][b]);
      }
    });
  }

  // ============================================================
  // W3O3b — THE FOUR-YEAR COST MACHINE
  //
  // Two competing mechanical routes start at the same purchase
  // gate. One accumulates custom-code dependencies and costly
  // upgrades. The other remains adjustable by Qasr's own staff.
  // ============================================================

  {
    const art=`
      ${T(170,32,"THE COST OF TOMORROW",14,C.navy)}

      ${P("M170 59 V96",C.navy,5)}
      ${O(170,62,17,C.blue)}
      ${T(170,67,"BUY",12,C.navy)}

      ${P("M170 96 Q170 119 91 128",C.orange,5)}
      ${P("M170 96 Q170 119 249 128",C.green,5)}

      ${T(90,115,"VENDOR B",12,C.orange)}
      ${T(250,115,"A / C",12,C.green)}

      <g class="cost cost-b vls-w03-moving">
        ${R(34,137,116,154,C.paper,11,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${T(92,163,"CUSTOM CODE",11,C.orange)}
        ${O(92,199,27,C.blue)}
        ${Array.from({length:8},(_,j)=>
          P("M92 164 V173",C.orange,5,
            `transform="rotate(${j*45} 92 199)"`)
        ).join("")}
        ${O(92,199,14,C.orange)}
        ${P("M60 247 H124",C.orange,5)}
        ${T(92,271,"HIGH CHANGE",11,C.orange)}
      </g>

      <g class="cost cost-ac vls-w03-moving">
        ${R(190,137,116,154,C.paper,11,
          `stroke="${C.green}" stroke-width="3"`)}
        ${T(248,163,"CONFIGURE",11,C.green)}
        ${O(248,199,27,C.blue)}
        ${tick(248,200)}
        ${P("M218 247 H278",C.green,5)}
        ${T(248,271,"LOW CHANGE",11,C.green)}
      </g>

      <g class="chain vls-w03-moving">
        ${P("M91 290 V332 H170",C.orange,5)}
        ${P("M249 290 V332 H170",C.green,5)}
        ${O(170,332,16,C.paper,
          `stroke="${C.navy}" stroke-width="3"`)}
      </g>

      <g class="clock vls-w03-moving">
        ${O(170,332,27,C.paper,
          `stroke="${C.navy}" stroke-width="3"`)}
        ${P("M170 332 V314 M170 332 L184 339",C.orange,4)}
      </g>

      <g class="freedom vls-w03-moving">
        ${O(170,332,28,C.pale,
          `stroke="${C.green}" stroke-width="3"`)}
        ${tick(170,334)}
      </g>

      ${O(170,375,7,C.orange,
        `class="vls-w03-accent vls-w03-moving"`)}
    `;

    register("W3O3b",{
      count:27,
      heading:"BUY TODAY · CHANGE TOMORROW",
      cuts:[3,6,9,12,15,18,21,24],
      art,

      render(r,b,i){
        show(r,".cost-b",b>=1);
        show(r,".cost-ac",b>=2);
        show(r,".chain",b>=3);
        show(r,".clock",b>=4 && b<=6);
        show(r,".freedom",b>=7);

        set(r,".cost-b",{
          transform:`translateY(${b>=4?12:0}px)`,
          opacity:b>=7?".4":"1"
        });

        set(r,".cost-ac",{
          transform:`translateY(${b>=7?-12:0}px)`
        });

        set(r,".clock",{
          transform:`rotate(${i*12}deg)`
        });

        label(r,[
          "Read every criterion",
          "Features favour B",
          "Change favours A and C",
          "Custom code accumulates",
          "Upgrades create cost",
          "A rate rule changes",
          "Who holds the knowledge?",
          "Protect local capability",
          "Choose future flexibility"
        ][b]);
      }
    });
  }

  // ============================================================
  // W3O3c — THE CONTRACT READINESS VAULT
  //
  // A large vault door protects the purchasing decision.
  // Five independent locks represent sponsor, owner, baseline,
  // capability and governance. A realistic test and a live
  // rule-change demonstration provide the final keys.
  // ============================================================

  {
    const locks=[
      ["SPONSOR",60,111],
      ["OWNER",280,111],
      ["BASELINE",60,247],
      ["PEOPLE",280,247],
      ["GOVERN",170,67]
    ];

    const art=`
      ${T(170,31,"BEFORE QASR SIGNS",14,C.navy)}

      <g class="vault vls-w03-moving">
        ${R(48,76,244,255,C.blue,21,
          `stroke="${C.navy}" stroke-width="6"`)}
        ${O(170,200,93,C.paper,
          `stroke="${C.navy}" stroke-width="8"`)}
        ${O(170,200,66,C.blue,
          `stroke="${C.grey}" stroke-width="3"`)}
        ${O(170,200,36,C.navy)}
        ${P("M170 164 V236 M134 200 H206",C.paper,7)}
      </g>

      ${locks.map(([name,x,y],j)=>`
        <g class="lock lock-${j} vls-w03-moving">
          ${O(x,y,22,C.paper,
            `stroke="${C.orange}" stroke-width="3"`)}
          ${R(x-9,y-1,18,15,C.orange,3)}
          ${P(`M${x-7} ${y-1} V${y-9}
               Q${x} ${y-19} ${x+7} ${y-9} V${y-1}`,
               C.orange,3)}
          ${T(x,y+36,name,10,C.navy)}
        </g>
      `).join("")}

      <g class="key vls-w03-moving">
        ${O(170,200,13,C.green)}
        ${P("M170 200 H226 V212 H239",C.green,7)}
      </g>

      <g class="test vls-w03-moving">
        ${R(105,141,130,105,C.paper,11,
          `stroke="${C.green}" stroke-width="3"`)}
        ${person(136,207,C.navy,.8)}
        ${R(177,171,38,34,C.blue,5)}
        ${cross(196,188)}
        ${T(170,227,"REAL CASE",11,C.green)}
      </g>

      <g class="seal vls-w03-moving">
        ${O(170,200,69,C.pale,
          `stroke="${C.green}" stroke-width="5"`)}
        ${tick(170,204)}
        ${T(170,251,"EVIDENCE",12,C.green)}
      </g>

      ${O(170,366,7,C.orange,
        `class="vls-w03-accent vls-w03-moving"`)}
    `;

    register("W3O3c",{
      count:29,
      heading:"THE DECISION MUST BE EARNED",
      cuts:[3,6,9,12,15,18,21,24,27],
      art,

      render(r,b,i){
        const unlocked=Math.min(5,Math.max(0,b-1));

        locks.forEach((_,j)=>{
          set(r,`.lock-${j}`,{
            opacity:j<unlocked?".25":"1",
            transform:j<unlocked
              ?"translateY(-12px) scale(.85)"
              :"translateY(0) scale(1)"
          });
        });

        show(r,".key",b>=6 && b<=8);
        show(r,".test",b>=7 && b<=8);
        show(r,".seal",b>=9);

        set(r,".vault",{
          transform:b>=9
            ?"translateX(-12px) scale(.96)"
            :"translateX(0) scale(1)"
        });

        label(r,[
          "Pause before signing",
          "Ask five questions",
          "Name the sponsor",
          "Name the owner",
          "Measure the baseline",
          "Prepare the people",
          "Govern after launch",
          "Test the hardest case",
          "Demonstrate live change",
          "An evidence-led choice"
        ][b]);
      }
    });
  }

  // ============================================================
  // W3O2d — THE NOOR HOSPITAL EVIDENCE X-RAY
  //
  // Five hospital towers stand behind a transparent diagnostic
  // scanner. The scan exposes disconnected capabilities and
  // missing clinical participation. The final image separates
  // known evidence from unproven explanations.
  // ============================================================

  {
    const buildings=Array.from({length:5},(_,j)=>{
      const x=21+j*62;

      return `
        <g class="hospital hospital-${j} vls-w03-moving">
          ${R(x,109,49,143,C.paper,5,
            `stroke="${C.navy}" stroke-width="2"`)}
          ${R(x+9,92,31,19,C.navy,3)}
          ${P(`M${x+24} 96 V107 M${x+18} 102 H${x+30}`,
            C.paper,3)}
          ${[0,1,2].map(k=>
            R(x+10,125+k*34,29,19,C.blue,3)
          ).join("")}
          ${R(x+17,224,15,28,C.navy,2)}
        </g>
      `;
    }).join("");

    const art=`
      ${T(170,32,"NOOR HEALTH GROUP",14,C.navy)}

      ${buildings}

      ${P("M15 253 H325",C.grey,3)}

      <g class="scanner vls-w03-moving">
        ${R(14,72,312,217,"none",12,
          `stroke="${C.green}" stroke-width="3"
           stroke-dasharray="8 6"`)}
        ${R(17,108,306,6,C.green,3,
          `opacity=".55"`)}
      </g>

      <g class="evidence models vls-w03-moving">
        ${R(94,115,152,131,C.paper,12,
          `stroke="${C.navy}" stroke-width="3"`)}
        ${T(170,149,"91 MODELS",20,C.navy)}
        ${P("M119 172 H221 M119 190 H221 M119 208 H198",
          C.grey,4)}
        ${T(170,231,"2019 MANUAL",11,C.orange)}
      </g>

      <g class="evidence unused vls-w03-moving">
        ${R(86,116,168,133,C.paper,12,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${O(170,169,34,C.blue)}
        ${cross(170,169)}
        ${T(170,226,"UNUSED RULES",12,C.orange)}
      </g>

      <g class="evidence disconnected vls-w03-moving">
        ${R(91,120,158,124,C.paper,11,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${P("M115 211 V183 M145 211 V163 M175 211 V190",
          C.navy,9)}
        ${P("M202 157 L223 180",C.orange,5)}
        ${cross(212,168)}
        ${T(170,231,"NO DATA LINK",12,C.orange)}
      </g>

      <g class="result vls-w03-moving">
        ${R(46,274,248,73,C.paper,12,
          `stroke="${C.navy}" stroke-width="2"`)}
        ${T(99,303,"4.1 h",22,C.navy)}
        ${T(240,303,"3.9 h",22,C.orange)}
        ${P("M137 298 H199",C.orange,4)}
        ${T(170,331,"TARGET 2.87 h",12,C.green)}
      </g>

      <g class="diagnosis vls-w03-moving">
        ${O(170,184,74,C.paper,
          `stroke="${C.orange}" stroke-width="4"`)}
        ${T(170,175,"KNOWN",15,C.navy)}
        ${P("M117 190 H223",C.grey,2)}
        ${T(170,211,"NOT PROVEN",13,C.orange)}
      </g>

      <g class="forum vls-w03-moving">
        ${O(110,177,28,C.blue)}
        ${O(230,177,28,C.blue)}
        ${person(110,186,C.navy,.65)}
        ${person(230,186,C.green,.65)}
        ${P("M140 178 H200",C.green,3)}
        ${T(170,244,"EVIDENCE",12,C.green)}
      </g>

      ${O(170,373,7,C.orange,
        `class="vls-w03-accent vls-w03-moving"`)}
    `;

    register("W3O2d",{
      count:33,
      heading:"THE SUITE NOBODY OPENED",
      cuts:[3,6,9,12,15,18,21,24,27,30],
      art,

      render(r,b,i){
        const scanY=72+(i%8)*25;

        set(r,".scanner",{
          transform:`translateY(${Math.min(35,scanY-72)}px)`,
          opacity:b>=1 && b<=7?"1":"0"
        });

        for(let j=0;j<5;j++){
          set(r,`.hospital-${j}`,{
            opacity:b>=3?".35":"1",
            transform:`translateY(${(i+j)%3*2}px)`
          });
        }

        show(r,".models",b>=2 && b<=3);
        show(r,".unused",b===4);
        show(r,".disconnected",b===5);
        show(r,".result",b>=6 && b<=8);
        show(r,".diagnosis",b>=8 && b<=9);
        show(r,".forum",b>=9);

        label(r,[
          "Five private hospitals",
          "An expensive promise",
          "Models from old policy",
          "Clinicians excluded",
          "The rules engine sleeps",
          "The dashboard is isolated",
          "The result disappoints",
          "Promise versus reality",
          "Separate facts from causes",
          "Build an evidence argument",
          "Management creates value"
        ][b]);
      }
    });
  }

  // ------------------------------------------------------------
  // REGISTRATION COMPLETE
  // ------------------------------------------------------------

  // Preserve any scenes registered by other weeks.
  // Do not replace the shared registry or existing host.
  // The application owns scene mounting and narration timing.

})();
