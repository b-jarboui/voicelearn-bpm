// OPER621 · WEEK 04 · CINEMATIC SCENES
//
// Concatenate PARTS 1, 2 and 3 without modification.
// Do not load this partial file independently.
//
// One original visual environment per section.
// Every narration moment changes the illustration.
// No narration duplication or text-card substitution.
//
// Section inventory:
// O1a  The Adoption Divide
// O1b  The Performance Valley
// O2a  The Resistance Observatory
// O2b  The Evidence Tribunal
// O2c  The Intervention Workshop
// O3a  The Stakeholder Constellation
// O3b  The Engagement Calendar
// O3c  The Moving Stakeholder Grid
// O3d  The Parallel Process Railway
// O3e  The Intervention Construction Site
// O3f  The Decision Chamber
// O3g  The Knowledge Forum
//
// Registry:
// window.VL_SCENES[id] = { build(el), step(i,n), reset() }
//
// All coordinates use a responsive 340 × 390 SVG.
// All scene-specific styles are scoped to .vls-w04-<secId>.
// All scenes share one injected style: #vl-sc-w04.

(() => {
  "use strict";

  window.VL_SCENES = window.VL_SCENES || {};

  const REG = window.VL_SCENES;
  const NS = "http://www.w3.org/2000/svg";

  const C = {
    navy: "#1f4e79",
    orange: "#c0502a",
    paper: "#fbf8f1",
    ink: "#1b2a3a",
    blue: "#dbe7f2",
    green: "#317c61",
    pale: "#e8f1eb",
    gold: "#e5bc76",
    muted: "#9bb5c9"
  };

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

    return clamp(
      Number.isFinite(Number(i))
        ? Math.floor(Number(i))
        : 0,
      0,
      total - 1
    );
  };

  const esc = value =>
    String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const T = (
    x, y, value,
    size = 13,
    color = C.ink,
    extra = ""
  ) => `
    <text x="${x}" y="${y}"
      text-anchor="middle"
      font-size="${size}"
      fill="${color}"
      ${extra}>${esc(value)}</text>
  `;

  const R = (
    x, y, w, h,
    fill = C.paper,
    rx = 8,
    extra = ""
  ) => `
    <rect x="${x}" y="${y}"
      width="${w}" height="${h}"
      rx="${rx}" fill="${fill}"
      ${extra}/>
  `;

  const O = (
    x, y, r,
    fill = C.paper,
    extra = ""
  ) => `
    <circle cx="${x}" cy="${y}"
      r="${r}" fill="${fill}"
      ${extra}/>
  `;

  const P = (
    d,
    stroke = C.navy,
    width = 3,
    extra = ""
  ) => `
    <path d="${d}"
      fill="none"
      stroke="${stroke}"
      stroke-width="${width}"
      stroke-linecap="round"
      stroke-linejoin="round"
      ${extra}/>
  `;

  const person = (
    x, y,
    color = C.navy,
    scale = 1
  ) => `
    <g transform="translate(${x} ${y}) scale(${scale})">
      ${O(0,-15,10,color)}
      <path d="M-17 16 Q-17 -3 0 -3
               Q17 -3 17 16 Z"
        fill="${color}"/>
    </g>
  `;

  const tick = (
    x, y,
    color = C.green,
    scale = 1
  ) => `
    <g transform="translate(${x} ${y}) scale(${scale})">
      ${P("M-10 0 L-3 7 L12 -11",color,4)}
    </g>
  `;

  const cross = (
    x, y,
    color = C.orange,
    scale = 1
  ) => `
    <g transform="translate(${x} ${y}) scale(${scale})">
      ${P("M-9 -9 L9 9 M9 -9 L-9 9",color,4)}
    </g>
  `;

  const arrow = (
    x, y,
    color = C.navy,
    scale = 1
  ) => `
    <g transform="translate(${x} ${y}) scale(${scale})">
      ${P("M-12 0 H12 M4 -8 L12 0 L4 8",color,3)}
    </g>
  `;

  const kiosk = (
    x, y,
    scale = 1
  ) => `
    <g transform="translate(${x} ${y}) scale(${scale})">
      ${O(0,70,39,C.navy,'opacity=".09"')}
      ${R(-29,-72,58,116,C.navy,11)}
      ${R(-23,-65,46,68,C.blue,6)}
      ${R(-16,-56,32,7,C.green,3)}
      ${P("M-14 -35 H14 M-14 -24 H10",C.navy,2)}
      ${O(0,-8,4,C.green)}
      ${P("M0 44 V67 M-21 67 H21",C.navy,7)}
    </g>
  `;

  const desk = (
    x, y,
    scale = 1
  ) => `
    <g transform="translate(${x} ${y}) scale(${scale})">
      ${O(0,-36,12,C.navy)}
      <path d="M-20 -10 Q-20 -26 0 -26
               Q20 -26 20 -10"
        fill="${C.navy}"/>
      ${R(-43,-8,86,14,C.orange,4)}
      ${R(-36,6,72,48,C.navy,5)}
      ${R(-24,15,48,7,C.blue,3)}
    </g>
  `;

  const documentIcon = (
    x, y,
    scale = 1
  ) => `
    <g transform="translate(${x} ${y}) scale(${scale})">
      ${R(-24,-32,48,64,C.paper,5,
        `stroke="${C.navy}" stroke-width="2"`)}
      ${P("M-14 -14 H14 M-14 -4 H14 M-14 6 H7",C.muted,2)}
    </g>
  `;

  const svg = (
    body,
    label = "Animated BPM teaching illustration"
  ) => `
    <svg xmlns="${NS}"
      viewBox="0 0 340 390"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="${esc(label)}">
      ${body}
    </svg>
  `;

  const $ = (root, selector) =>
    root ? root.querySelector(selector) : null;

  const $$ = (root, selector) =>
    root ? [...root.querySelectorAll(selector)] : [];

  const style = (root, selector, values) => {
    $$(root, selector).forEach(node => {
      Object.entries(values).forEach(([key,value]) => {
        node.style[key] = String(value);
      });
    });
  };

  const attr = (root, selector, name, value) => {
    $$(root, selector).forEach(node =>
      node.setAttribute(name,String(value))
    );
  };

  const visible = (root, selector, yes) =>
    style(root,selector,{
      opacity: yes ? "1" : "0"
    });

  const move = (
    root, selector,
    x = 0, y = 0,
    scale = 1,
    rotation = 0
  ) =>
    style(root,selector,{
      transform:
        `translate(${x}px,${y}px) ` +
        `rotate(${rotation}deg) scale(${scale})`
    });

  const label = (root, text) => {
    const node = $(root,".vls-w04-status");
    if (node) node.textContent = text;
  };

  const progress = (root, i, n) => {
    const bar = $(root,".vls-w04-progress");
    if (!bar) return;

    bar.style.width =
      `${100 * (safeIndex(i,n)+1) / Math.max(1,n)}%`;
  };

  const flash = (root, selector, i) => {
    const node = $(root,selector);
    if (!node) return;

    // Alternating emphasis guarantees a visible change even
    // when two adjacent moments share the same narrative phase.
    node.style.opacity = i % 2 ? ".54" : "1";
    node.style.transform =
      `scale(${i % 2 ? 1.035 : 1})`;
  };

  const mount = (el,id,body,description) => {
    if (!el) return null;

    const root = document.createElement("div");
    root.className = `vls-w04-${id}`;

    root.innerHTML = `
      <div class="vls-w04-art">
        ${svg(body,description)}
      </div>
      <div class="vls-w04-bottom">
        <span class="vls-w04-status"></span>
      </div>
      <div class="vls-w04-progress"></div>
    `;

    el.replaceChildren(root);
    return root;
  };

  const scene = (id, body, render, description) => {
    let root = null;
    let previous = -1;
    let timeline = null;

    const apply = (i,n,instant) => {
      if (!root) return;

      const index = safeIndex(i,n);

      root.classList.toggle(
        "vls-w04-instant",
        instant || reduced()
      );

      if (timeline && typeof timeline.kill === "function") {
        timeline.kill();
        timeline = null;
      }

      render(root,index,n,instant);

      progress(root,index,n);

      if (!instant && !reduced() && window.gsap) {
        const target = $(root,".vls-w04-art");

        if (target) {
          timeline = window.gsap.fromTo(
            target,
            { opacity:.94 },
            {
              opacity:1,
              duration:.38,
              ease:"power2.out",
              overwrite:true
            }
          );
        }
      }

      previous = index;
    };

    REG[id] = {
      build(el) {
        if (timeline) {
          timeline.kill();
          timeline = null;
        }

        root = mount(el,id,body,description);
        previous = -1;

        if (root) {
          apply(0,1,true);
        }
      },

      step(i,n) {
        if (!root) return;

        const total =
          Number.isFinite(Number(n)) && Number(n)>0
            ? Math.floor(Number(n))
            : 1;

        apply(i,total,false);
      },

      reset() {
        if (!root) return;

        previous = -1;
        apply(0,1,true);
      }
    };
  };

  // ============================================================
  // SHARED STYLE
  // ============================================================

  if (!document.getElementById("vl-sc-w04")) {
    const css = document.createElement("style");
    css.id = "vl-sc-w04";

    css.textContent = `
      [class^="vls-w04-O"],
      [class*=" vls-w04-O"] {
        --navy:#1f4e79;
        --orange:#c0502a;
        --paper:#fbf8f1;
        --ink:#1b2a3a;
        --blue:#dbe7f2;
        --green:#317c61;

        position:relative;
        display:flex;
        flex-direction:column;
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

      [class^="vls-w04-O"] *,
      [class*=" vls-w04-O"] * {
        box-sizing:border-box;
      }

      [class^="vls-w04-O"] .vls-w04-art,
      [class*=" vls-w04-O"] .vls-w04-art {
        position:relative;
        flex:1 1 auto;
        min-height:0;
        display:flex;
        align-items:center;
        justify-content:center;
        overflow:hidden;
      }

      [class^="vls-w04-O"] svg,
      [class*=" vls-w04-O"] svg {
        display:block;
        width:100%;
        height:100%;
        max-width:100%;
        max-height:100%;
        overflow:visible;
        font-family:inherit;
      }

      [class^="vls-w04-O"] svg text,
      [class*=" vls-w04-O"] svg text {
        font-family:inherit;
        font-weight:700;
        letter-spacing:.1px;
        paint-order:stroke;
      }

      [class^="vls-w04-O"] .vls-w04-bottom,
      [class*=" vls-w04-O"] .vls-w04-bottom {
        flex:0 0 auto;
        min-height:28px;
        padding:4px 8px 7px;
        text-align:center;
        font-size:12px;
        font-weight:750;
        letter-spacing:.035em;
        color:var(--navy);
      }

      [class^="vls-w04-O"] .vls-w04-progress,
      [class*=" vls-w04-O"] .vls-w04-progress {
        position:absolute;
        bottom:0;
        left:0;
        height:3px;
        width:0;
        background:var(--orange);
        transition:width .6s ease;
      }

      [class^="vls-w04-O"] .motion,
      [class*=" vls-w04-O"] .motion {
        transition:
          transform .85s cubic-bezier(.2,.75,.2,1),
          opacity .65s ease,
          fill .65s ease,
          stroke .65s ease,
          stroke-dashoffset .9s ease;
        transform-box:fill-box;
        transform-origin:center;
      }

      [class^="vls-w04-O"] .draw,
      [class*=" vls-w04-O"] .draw {
        stroke-dasharray:400;
        stroke-dashoffset:400;
        transition:
          stroke-dashoffset .95s ease,
          opacity .65s ease;
      }

      [class^="vls-w04-O"] .fade,
      [class*=" vls-w04-O"] .fade {
        transition:
          opacity .65s ease,
          transform .85s ease;
      }

      [class^="vls-w04-O"].vls-w04-instant *,
      [class*=" vls-w04-O"].vls-w04-instant * {
        transition:none!important;
        animation:none!important;
      }

      @media (prefers-reduced-motion:reduce) {
        [class^="vls-w04-O"] *,
        [class*=" vls-w04-O"] * {
          transition:none!important;
          animation:none!important;
        }
      }

      @media(max-width:375px) {
        [class^="vls-w04-O"] .vls-w04-bottom,
        [class*=" vls-w04-O"] .vls-w04-bottom {
          font-size:11px;
          min-height:25px;
        }
      }

      /* O1a — THE ADOPTION DIVIDE */

      .vls-w04-O1a .a-guest,
      .vls-w04-O1a .a-staff,
      .vls-w04-O1a .a-bridge,
      .vls-w04-O1a .a-old,
      .vls-w04-O1a .a-new,
      .vls-w04-O1a .a-objection,
      .vls-w04-O1a .a-role {
        transition:
          transform .9s cubic-bezier(.2,.8,.2,1),
          opacity .7s ease;
      }

      .vls-w04-O1a .a-bridge {
        stroke-dasharray:260;
        stroke-dashoffset:260;
        transition:stroke-dashoffset 1.1s ease;
      }

      .vls-w04-O1a .a-spot {
        transform-origin:170px 170px;
        transition:
          transform .9s ease,
          opacity .7s ease;
      }

      /* O1b — THE PERFORMANCE VALLEY */

      .vls-w04-O1b .b-actual,
      .vls-w04-O1b .b-supported {
        stroke-dasharray:550;
        stroke-dashoffset:550;
        transition:stroke-dashoffset 1.2s ease;
      }

      .vls-w04-O1b .b-marker,
      .vls-w04-O1b .b-support,
      .vls-w04-O1b .b-cost,
      .vls-w04-O1b .b-target {
        transition:
          transform .85s ease,
          opacity .7s ease;
      }

      .vls-w04-O1b .b-marker {
        transform-origin:center;
      }

      /* O2a — THE RESISTANCE OBSERVATORY */

      .vls-w04-O2a .c-lens {
        transition:
          transform 1s cubic-bezier(.2,.75,.2,1),
          opacity .65s ease;
      }

      .vls-w04-O2a .c-bar,
      .vls-w04-O2a .c-survey,
      .vls-w04-O2a .c-voice,
      .vls-w04-O2a .c-core {
        transition:
          transform .85s ease,
          opacity .65s ease;
      }

      .vls-w04-O2a .c-ray {
        stroke-dasharray:230;
        stroke-dashoffset:230;
        transition:stroke-dashoffset .9s ease;
      }

      .vls-w04-O2a .c-needle {
        transition:transform .85s ease;
        transform-origin:170px 184px;
      }

      /* Additional section-specific styles continue in PART 2. */
    `;

    document.head.appendChild(css);
  }

  // ============================================================
  // SCENE O1a — THE ADOPTION DIVIDE
  // ============================================================
  //
  // Original visual:
  // A physical hotel lobby is divided by a deep gap.
  // On one side stands the redesigned kiosk.
  // On the other stand employees and the established desk.
  //
  // The promised improvement cannot cross the gap until
  // people, roles and practical exceptions are addressed.
  //
  // Cinematic language:
  // Guest tracking, kiosk activation, objection signals,
  // role transformation, bridge construction and crossing.
  //
  // Exact narration count: 29.
  // ============================================================

  {
    const body = `
      <defs>
        <radialGradient id="w04a-light">
          <stop stop-color="${C.gold}"
            stop-opacity=".38"/>
          <stop offset="1"
            stop-color="${C.gold}"
            stop-opacity="0"/>
        </radialGradient>
      </defs>

      ${T(170,26,"THE ADOPTION DIVIDE",14,C.navy)}

      <g class="a-spot motion">
        <ellipse cx="170" cy="176"
          rx="150" ry="144"
          fill="url(#w04a-light)"/>
      </g>

      <path d="M13 275 L145 227 L145 331 L13 351 Z"
        fill="${C.blue}" opacity=".65"/>

      <path d="M195 227 L327 275 L327 351 L195 331 Z"
        fill="${C.blue}" opacity=".65"/>

      <path d="M145 227 L195 227 L205 351 L135 351 Z"
        fill="${C.navy}" opacity=".12"/>

      ${P("M145 227 L135 351 M195 227 L205 351",
        C.navy,2,'opacity=".25"')}

      <g class="a-new motion">
        ${kiosk(83,179,.88)}
      </g>

      <g class="a-old motion">
        ${desk(260,218,.82)}
      </g>

      <g class="a-guest motion">
        ${person(39,288,C.navy,.9)}
        ${R(51,282,13,19,C.orange,2)}
      </g>

      <g class="a-staff motion">
        ${person(302,273,C.green,.82)}
      </g>

      <g class="a-objection motion" opacity="0">
        ${O(258,93,31,C.paper,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${T(258,101,"!",31,C.orange)}
        ${P("M253 123 L246 142",C.orange,2)}
      </g>

      <g class="a-figures fade" opacity="0">
        ${R(29,56,106,39,C.paper,18,
          `stroke="${C.navy}" stroke-width="2"`)}
        ${T(82,73,"23 MIN",13,C.navy)}
        ${T(82,88,"CURRENT",10,C.navy)}

        ${R(205,56,106,39,C.paper,18,
          `stroke="${C.green}" stroke-width="2"`)}
        ${T(258,73,"5 MIN",13,C.green)}
        ${T(258,88,"PROPOSED",10,C.green)}
      </g>

      <g class="a-role motion" opacity="0">
        ${O(260,171,32,C.paper,
          `stroke="${C.green}" stroke-width="2"`)}
        ${P("M246 169 H273 M260 157 V183",
          C.green,3)}
        ${O(260,171,5,C.orange)}
      </g>

      <path class="a-bridge"
        d="M126 268 Q170 247 214 268"
        fill="none"
        stroke="${C.green}"
        stroke-width="13"
        stroke-linecap="round"/>

      <g class="a-crossing fade" opacity="0">
        ${tick(170,251,C.green,1.4)}
      </g>

      <g class="a-gap fade">
        ${T(170,317,"ADOPTION GAP",12,C.orange)}
      </g>

      <g class="a-bpm fade" opacity="0">
        ${P("M48 355 H292",C.green,3)}
        ${[65,118,170,222,275].map(x =>
          O(x,355,7,C.green)
        ).join("")}
      </g>
    `;

    const states = [
      "Return to Qasr",
      "The delayed guest",
      "Targets versus service",
      "The complete journey",
      "A redesigned arrival",
      "Kiosk verification",
      "Promised time saving",
      "Less manual work",
      "Expected enthusiasm",
      "Three objections",
      "Benefits explained",
      "Listen before persuading",
      "Unseen operating risks",
      "Design needs adoption",
      "Two kinds of change",
      "Familiar routines shift",
      "The role changes",
      "Exceptions need people",
      "Actual process use",
      "Installation is insufficient",
      "Benefits remain distant",
      "Manage people change",
      "Support the transition",
      "Across every phase",
      "Communication is insufficient",
      "Go-live risk",
      "Beyond persuasion",
      "Build the bridge",
      "The next challenge"
    ];

    scene(
      "O1a",
      body,
      (r,i,n) => {
        label(r,states[Math.min(i,28)]);

        visible(r,".a-figures",i>=6 && i<=9);

        visible(r,".a-objection",
          (i>=9 && i<=13) ||
          (i>=19 && i<=20) ||
          i===25
        );

        visible(r,".a-role",i>=16 && i<=18);

        visible(r,".a-bpm",i>=21);

        visible(r,".a-crossing",i>=27);

        visible(r,".a-gap",i<27);

        attr(
          r,".a-bridge",
          "stroke-dashoffset",
          i>=27 ? 0 : i>=21 ? 135 : 260
        );

        const positions = [
          [0,0],[14,-6],[28,-8],[40,-10],
          [52,-13],[62,-15],[71,-15],[74,-15],
          [77,-15],[79,-15],[81,-15],[84,-15],
          [85,-15],[88,-15],[90,-15],[92,-15],
          [94,-15],[97,-15],[101,-15],[105,-15],
          [107,-15],[110,-15],[113,-15],[116,-15],
          [119,-15],[121,-15],[125,-15],[132,-15],
          [181,-15]
        ];

        const p = positions[Math.min(i,28)];

        move(r,".a-guest",p[0],p[1]);

        move(
          r,".a-staff",
          i<9 ? 0 : i<18 ? -9 : i<27 ? -24 : -57,
          i%2 ? -4 : 0
        );

        move(
          r,".a-new",
          0,
          i%2 ? -3 : 0,
          i>=27 ? 1.05 : 1
        );

        move(
          r,".a-old",
          i>=19 && i<27 ? 10 : 0,
          0,
          i>=27 ? .78 : 1
        );

        move(
          r,".a-spot",
          i<9 ? -28 : i<18 ? 25 : 0,
          i%2 ? 5 : -5,
          i>=27 ? 1.15 : 1
        );

        flash(r,".a-role",i);
      },
      "A redesigned hotel check-in separated from actual employee adoption"
    );
  }

  // ============================================================
  // SCENE O1b — THE PERFORMANCE VALLEY
  // ============================================================
  //
  // Original visual:
  // A three-dimensional valley of temporary performance loss.
  // The existing baseline is a suspended horizontal reference.
  // A travelling marker descends, crosses the valley and climbs.
  //
  // A second, shallower route appears when support is funded.
  //
  // Cinematic language:
  // Camera travel, curve drawing, moving performance marker,
  // baseline illumination, loss-area reveal and recovery.
  //
  // Exact narration count: 30.
  // ============================================================

  {
    const body = `
      <defs>
        <linearGradient id="w04b-valley"
          x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="${C.orange}"
            stop-opacity=".3"/>
          <stop offset="1"
            stop-color="${C.orange}"
            stop-opacity=".04"/>
        </linearGradient>
      </defs>

      ${T(170,25,"THE PERFORMANCE VALLEY",14,C.navy)}

      <g opacity=".35">
        ${P("M35 55 V328 H314",C.navy,2)}
        ${[95,145,195,245,295].map(y =>
          P(`M35 ${y} H314`,C.muted,1)
        ).join("")}
      </g>

      ${T(64,47,"PERFORMANCE",10,C.navy)}
      ${T(287,350,"TIME",11,C.navy)}

      <path d="M40 151 H311"
        stroke="${C.navy}"
        stroke-width="2"
        stroke-dasharray="6 6"
        opacity=".6"/>

      ${T(82,141,"BASELINE",11,C.navy)}

      <path class="b-cost fade"
        d="M82 151
           C116 153 134 250 169 269
           C211 289 238 164 266 151
           L82 151 Z"
        fill="url(#w04b-valley)"
        opacity="0"/>

      <path class="b-actual"
        d="M43 151
           L82 151
           C116 153 134 250 169 269
           C211 289 238 164 266 116
           Q286 94 309 92"
        fill="none"
        stroke="${C.orange}"
        stroke-width="5"
        stroke-linecap="round"/>

      <path class="b-supported"
        d="M82 151
           C119 152 140 207 169 216
           C205 226 236 150 266 116
           Q286 94 309 92"
        fill="none"
        stroke="${C.green}"
        stroke-width="4"
        stroke-dasharray="8 6"
        opacity="0"/>

      <g class="b-marker motion">
        ${O(43,151,13,C.paper,
          `stroke="${C.orange}" stroke-width="4"`)}
        ${O(43,151,5,C.orange)}
      </g>

      <g class="b-support fade" opacity="0">
        ${person(77,303,C.green,.7)}
        ${person(113,303,C.green,.7)}
        ${person(149,303,C.green,.7)}
        ${P("M68 325 H158",C.green,4)}
        ${T(113,345,"EXTRA SUPPORT",11,C.green)}
      </g>

      <g class="b-warning fade" opacity="0">
        ${O(170,290,21,C.paper,
          `stroke="${C.orange}" stroke-width="2"`)}
        ${T(170,297,"!",24,C.orange)}
      </g>

      <g class="b-target fade" opacity="0">
        ${O(287,92,23,C.pale,
          `stroke="${C.green}" stroke-width="3"`)}
        ${tick(287,92,C.green,1)}
      </g>

      <g class="b-stage fade">
        ${T(67,372,"BEFORE",11,C.navy)}
        ${T(170,372,"TRANSITION",11,C.orange)}
        ${T(280,372,"RECOVERY",11,C.green)}
      </g>
    `;

    const route = [
      [43,151],[49,151],[57,151],[65,151],
      [75,151],[82,151],[92,153],[104,163],
      [115,181],[127,207],[139,233],[150,250],
      [160,263],[169,269],[179,271],[191,263],
      [203,245],[215,219],[227,187],[239,157],
      [250,139],[261,121],[271,108],[280,99],
      [288,94],[295,92],[300,92],[304,92],
      [307,92],[309,92]
    ];

    const states = [
      "Preparing the transition",
      "Expected faster arrivals",
      "Learning new procedures",
      "Unfamiliar exceptions",
      "Temporary decline",
      "The performance dip",
      "Learning unfamiliar controls",
      "Old versus new",
      "Practice builds confidence",
      "Guests feel disruption",
      "The transition curve",
      "Establish the baseline",
      "Uncertainty increases",
      "Performance falls",
      "Exploration begins",
      "Recovery becomes possible",
      "Lost performance",
      "Service disruption",
      "Manage the dip",
      "Unrealistic expectations",
      "The difficult opening",
      "Sponsor confidence",
      "Forecast the valley",
      "Fund temporary capacity",
      "Support has costs",
      "Measure recovery",
      "Evidence of progress",
      "Shorter and shallower",
      "Protect the programme",
      "Prepare for resistance"
    ];

    scene(
      "O1b",
      body,
      (r,i,n) => {
        label(r,states[Math.min(i,29)]);

        const p = route[Math.min(i,29)];

        attr(
          r,".b-marker",
          "transform",
          `translate(${p[0]-43} ${p[1]-151})`
        );

        attr(
          r,".b-actual",
          "stroke-dashoffset",
          Math.max(0,550-(i/29)*550)
        );

        visible(r,".b-cost",i>=16);

        visible(
          r,".b-warning",
          i>=12 && i<=22
        );

        visible(r,".b-support",i>=23);

        visible(r,".b-target",i>=26);

        visible(r,".b-supported",i>=23);

        attr(
          r,".b-supported",
          "stroke-dashoffset",
          i>=28 ? 0 :
          i>=25 ? 140 : 290
        );

        move(
          r,".b-support",
          i%2 ? 4 : -4,
          i%2 ? -3 : 0
        );

        move(
          r,".b-target",
          0,
          i%2 ? -5 : 0,
          i>=28 ? 1.12 : 1
        );

        // The moving marker is unique to each narration line.
        // The valley itself remains a stable visual reference.
      },
      "Performance initially falls below baseline and recovers; temporary support makes the dip shallower"
    );
  }

  // ============================================================
  // SCENE O2a — THE RESISTANCE OBSERVATORY
  // ============================================================
  //
  // Original visual:
  // A rotating diagnostic instrument examines a live staff survey.
  // Five radial evidence channels surround a central lens.
  //
  // Survey observations:
  // 79% current check-in frustrates guests.
  // 71% expect the new design to be faster.
  // 18% believe exceptions are handled.
  // 34% expect their role to exist in a year.
  // 11% report having been consulted.
  //
  // The scene then focuses on the three supervisors:
  // Marina, Corniche and Old Town.
  //
  // Cinematic language:
  // Rotating diagnostic lens, evidence illumination,
  // radial signal transmission, survey bars, human voices.
  //
  // Exact narration count: 27.
  // ============================================================

  {
    const evidence = [
      {
        x:170,y:61,
        value:"79%",
        name:"GUEST FRICTION",
        color:C.navy
      },
      {
        x:281,y:135,
        value:"71%",
        name:"FASTER DESIGN",
        color:C.green
      },
      {
        x:249,y:276,
        value:"18%",
        name:"EXCEPTIONS",
        color:C.orange
      },
      {
        x:91,y:276,
        value:"34%",
        name:"ROLE SECURITY",
        color:C.orange
      },
      {
        x:59,y:135,
        value:"11%",
        name:"CONSULTED",
        color:C.orange
      }
    ];

    const body = `
      <defs>
        <radialGradient id="w04c-field">
          <stop stop-color="${C.blue}"
            stop-opacity=".65"/>
          <stop offset="1"
            stop-color="${C.blue}"
            stop-opacity="0"/>
        </radialGradient>
      </defs>

      ${T(170,22,"THE RESISTANCE OBSERVATORY",13,C.navy)}

      ${O(170,184,151,"url(#w04c-field)")}

      ${O(170,184,124,"none",
        `stroke="${C.muted}" stroke-width="1.5"
         stroke-dasharray="4 8"` )}

      <g class="c-survey">
        ${evidence.map((e,j) => `
          <g class="c-unit-${j} motion">
            ${P(
              `M170 184 L${e.x} ${e.y}`,
              e.color,2,
              `class="c-ray c-ray-${j}"`
            )}

            ${O(e.x,e.y,34,C.paper,
              `stroke="${e.color}" stroke-width="2.5"` )}

            ${T(e.x,e.y+5,e.value,19,e.color)}

            ${T(
              e.x,
              e.y+(e.y<184?-43:48),
              e.name,
              9,
              e.color
            )}
          </g>
        `).join("")}
      </g>

      <g class="c-lens motion">
        ${O(170,184,58,C.paper,
          `stroke="${C.navy}" stroke-width="4"` )}

        ${O(170,184,46,C.blue,
          `opacity=".55"` )}

        ${O(170,184,30,C.paper,
          `stroke="${C.green}" stroke-width="2"` )}

        ${T(170,180,"WHY",17,C.navy)}
        ${T(170,198,"RESIST?",12,C.orange)}
      </g>

      <g class="c-needle motion">
        ${P("M170 184 L170 137",C.orange,5)}
        ${O(170,184,7,C.navy)}
      </g>

      <g class="c-voice fade" opacity="0">
        ${person(75,330,C.navy,.68)}
        ${person(170,330,C.orange,.68)}
        ${person(265,330,C.green,.68)}

        ${T(75,367,"MARINA",11,C.navy)}
        ${T(170,367,"CORNICHE",11,C.orange)}
        ${T(265,367,"OLD TOWN",11,C.green)}
      </g>

      <g class="c-core fade" opacity="0">
        ${O(170,184,51,C.paper,
          `stroke="${C.orange}" stroke-width="3"` )}

        ${T(170,177,"RESISTANCE",13,C.navy)}
        ${T(170,195,"IS DATA",13,C.orange)}
      </g>

      <g class="c-bar fade" opacity="0">
        ${R(62,316,216,11,C.blue,5)}
        ${R(62,316,24,11,C.orange,5)}
        ${T(170,345,"INVOLVEMENT GAP",11,C.orange)}
      </g>
    `;

    const focus = [
      0,0,0,0,1,1,2,3,4,4,
      0,0,0,2,2,2,2,
      3,3,4,4,4,4,4,4,4,4
    ];

    const states = [
      "Three supervisors object",
      "Three hotel locations",
      "Survey evidence arrives",
      "Guests face friction",
      "Speed is recognised",
      "Benefits are understood",
      "Exceptions remain doubtful",
      "Employment uncertainty",
      "Little consultation",
      "The hidden contradiction",
      "Resistance has causes",
      "What people may lose",
      "Marina raises exceptions",
      "A checkable operating case",
      "Four sources emerge",
      "Expertise becomes invisible",
      "Professional status changes",
      "Corniche questions staffing",
      "Employment consequences",
      "Old Town remembers",
      "Broken promises remain",
      "Organisational memory",
      "No involvement",
      "Ownership is missing",
      "Speed cannot resolve this",
      "Treat objections as data",
      "Defect or resistance?"
    ];

    scene(
      "O2a",
      body,
      (r,i,n) => {
        label(r,states[Math.min(i,26)]);

        const f = focus[Math.min(i,26)];

        evidence.forEach((e,j) => {
          const active = j===f;

          style(r,`.c-unit-${j}`,{
            opacity:active ? "1" : ".23",
            transform:
              `scale(${active ? 1.13 : .88})`
          });

          attr(
            r,`.c-ray-${j}`,
            "stroke-dashoffset",
            active ? 0 : 230
          );
        });

        const angle = [
          0,0,0,0,72,72,144,216,288,288,
          0,0,0,144,144,144,144,
          216,216,288,288,288,288,288,
          288,288,288
        ][Math.min(i,26)];

        style(r,".c-needle",{
          transform:`rotate(${angle + (i%2?4:0)}deg)`
        });

        move(
          r,".c-lens",
          i%2 ? 2 : -2,
          i%2 ? -2 : 2,
          i>=24 ? 1.08 : 1
        );

        visible(r,".c-voice",i>=12);

        visible(r,".c-core",i>=24);

        visible(r,".c-bar",i>=22);

        if (i>=24) {
          style(r,".c-lens",{opacity:".15"});
        } else {
          style(r,".c-lens",{opacity:"1"});
        }

        move(
          r,".c-voice",
          i%2 ? 3 : -3,
          0
        );
      },
      "A diagnostic instrument reveals survey evidence and the different sources of employee resistance"
    );
  }

  // CONTINUE DIRECTLY WITH PART 2.
  // ============================================================
  // O2b · O2c · O3a · O3b · O3c
  // ============================================================

  // ============================================================
  // ADDITIONAL SCENE-SPECIFIC CSS
  // ============================================================

  {
    const css = document.getElementById("vl-sc-w04");

    if (css) {
      css.textContent += `

        /* O2b — THE EVIDENCE TRIBUNAL */

        .vls-w04-O2b .d-scale {
          transform-origin:170px 153px;
          transition:transform .9s cubic-bezier(.2,.8,.2,1);
        }

        .vls-w04-O2b .d-pan {
          transition:
            transform .9s ease,
            opacity .65s ease;
        }

        .vls-w04-O2b .d-evidence,
        .vls-w04-O2b .d-verdict,
        .vls-w04-O2b .d-warning,
        .vls-w04-O2b .d-file {
          transition:
            transform .85s ease,
            opacity .7s ease;
        }

        .vls-w04-O2b .d-scan {
          transition:transform .85s ease,opacity .6s ease;
        }

        /* O2c — THE INTERVENTION WORKSHOP */

        .vls-w04-O2c .e-belt {
          transition:transform .9s ease;
        }

        .vls-w04-O2c .e-object,
        .vls-w04-O2c .e-tool,
        .vls-w04-O2c .e-output,
        .vls-w04-O2c .e-cost,
        .vls-w04-O2c .e-press {
          transition:
            transform .85s cubic-bezier(.2,.8,.2,1),
            opacity .7s ease;
        }

        .vls-w04-O2c .e-arm {
          transform-origin:170px 98px;
          transition:transform .85s ease;
        }

        /* O3a — THE STAKEHOLDER CONSTELLATION */

        .vls-w04-O3a .f-star {
          transition:
            transform .9s ease,
            opacity .7s ease;
          transform-box:fill-box;
          transform-origin:center;
        }

        .vls-w04-O3a .f-link {
          stroke-dasharray:230;
          stroke-dashoffset:230;
          transition:stroke-dashoffset .95s ease;
        }

        .vls-w04-O3a .f-grid,
        .vls-w04-O3a .f-orbit,
        .vls-w04-O3a .f-beam {
          transition:
            opacity .75s ease,
            transform .9s ease;
        }

        /* O3b — THE ENGAGEMENT CALENDAR */

        .vls-w04-O3b .g-day,
        .vls-w04-O3b .g-director,
        .vls-w04-O3b .g-meeting,
        .vls-w04-O3b .g-message,
        .vls-w04-O3b .g-response {
          transition:
            transform .85s cubic-bezier(.2,.8,.2,1),
            opacity .7s ease;
        }

        .vls-w04-O3b .g-route {
          stroke-dasharray:400;
          stroke-dashoffset:400;
          transition:stroke-dashoffset 1s ease;
        }

        /* O3c — THE MOVING STAKEHOLDER GRID */

        .vls-w04-O3c .h-finance,
        .vls-w04-O3c .h-staff,
        .vls-w04-O3c .h-auditor,
        .vls-w04-O3c .h-sponsor {
          transition:
            transform 1.1s cubic-bezier(.2,.8,.2,1),
            opacity .7s ease;
        }

        .vls-w04-O3c .h-trail {
          stroke-dasharray:240;
          stroke-dashoffset:240;
          transition:stroke-dashoffset 1.1s ease;
        }

        .vls-w04-O3c .h-phase,
        .vls-w04-O3c .h-alert,
        .vls-w04-O3c .h-invoice {
          transition:
            transform .85s ease,
            opacity .7s ease;
        }

        @media (prefers-reduced-motion:reduce) {
          .vls-w04-O2b *,
          .vls-w04-O2c *,
          .vls-w04-O3a *,
          .vls-w04-O3b *,
          .vls-w04-O3c * {
            transition:none!important;
            animation:none!important;
          }
        }
      `;
    }
  }

  // ============================================================
  // SCENE O2b — THE EVIDENCE TRIBUNAL
  // ============================================================
  //
  // Original visual:
  // A large physical balance sits in a diagnostic chamber.
  // One pan carries a checkable operating case.
  // The other carries the personal stake of the objector.
  //
  // A scanning beam interrogates evidence.
  // A mechanical verdict emerges only after both tests.
  //
  // This is not a generic comparison chart.
  // It is a forensic instrument with physical consequences.
  //
  // Exact narration count: 29.
  // ============================================================

  {
    const body = `
      <defs>
        <linearGradient id="w04d-metal"
          x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="${C.blue}"/>
          <stop offset=".5" stop-color="${C.paper}"/>
          <stop offset="1" stop-color="${C.muted}"/>
        </linearGradient>
      </defs>

      ${T(170,24,"THE EVIDENCE TRIBUNAL",14,C.navy)}

      ${O(170,171,135,C.blue,'opacity=".23"')}

      <g class="d-scale motion">
        ${P("M55 151 H285",C.navy,8)}
        ${O(170,151,12,C.orange)}

        <g class="d-pan d-left">
          ${P("M70 151 L45 228 M70 151 L95 228",C.navy,2)}
          <path d="M29 228 Q70 267 111 228 Z"
            fill="${C.blue}"
            stroke="${C.navy}"
            stroke-width="2"/>
        </g>

        <g class="d-pan d-right">
          ${P("M270 151 L245 228 M270 151 L295 228",C.navy,2)}
          <path d="M229 228 Q270 267 311 228 Z"
            fill="${C.blue}"
            stroke="${C.navy}"
            stroke-width="2"/>
        </g>
      </g>

      <path d="M170 164 L141 310 H199 Z"
        fill="url(#w04d-metal)"
        stroke="${C.navy}"
        stroke-width="2"/>

      ${R(117,310,106,14,C.navy,7)}

      <g class="d-file motion">
        ${documentIcon(70,208,.7)}
        ${T(70,273,"REAL CASE",11,C.navy)}
      </g>

      <g class="d-evidence motion">
        ${O(270,208,24,C.paper,
          `stroke="${C.orange}" stroke-width="2"`)}
        ${T(270,215,"?",25,C.orange)}
        ${T(270,273,"PERSONAL STAKE",10,C.orange)}
      </g>

      <g class="d-scan motion" opacity="0">
        ${R(37,105,266,6,C.green,3,'opacity=".6"')}
        ${P("M37 111 V270 M303 111 V270",
          C.green,1,'opacity=".25"')}
      </g>

      <g class="d-warning fade" opacity="0">
        ${O(170,79,31,C.paper,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${T(170,88,"!",32,C.orange)}
      </g>

      <g class="d-verdict fade" opacity="0">
        ${O(170,79,34,C.pale,
          `stroke="${C.green}" stroke-width="3"`)}
        ${tick(170,79,C.green,1.5)}
      </g>

      <g class="d-record fade" opacity="0">
        ${R(53,340,234,35,C.paper,16,
          `stroke="${C.navy}" stroke-width="2"`)}
        ${T(170,362,"CHECK THE RECORDS",12,C.navy)}
      </g>

      <g class="d-mistake fade" opacity="0">
        ${cross(170,79,C.orange,1.7)}
      </g>
    `;

    const states = [
      "Defect or resistance?",
      "A real operating case",
      "Two distinct causes",
      "Identical objections",
      "Demand a test",
      "Check the claim",
      "Remove personal stake",
      "Apply both tests",
      "Marina's specific claim",
      "Retrieve booking records",
      "Test the thirty percent",
      "A missing exception path",
      "Independent evidence",
      "A genuine defect",
      "Survey corroboration",
      "Persuasion cannot repair",
      "Corniche's staffing claim",
      "Check the business case",
      "Not a flow defect",
      "Rational employment fear",
      "Old Town's memory",
      "Trust is damaged",
      "The communication trap",
      "Misdiagnosis begins",
      "Benefits already understood",
      "Defect reaches go-live",
      "Fear prompts redesign",
      "Protect both directions",
      "Match the response"
    ];

    scene(
      "O2b",
      body,
      (r,i,n) => {
        label(r,states[Math.min(i,28)]);

        const marina = i>=8 && i<=15;
        const corniche = i>=16 && i<=19;
        const oldTown = i>=20 && i<=21;
        const trap = i>=22 && i<=26;

        const angle =
          marina ? -10 :
          corniche ? 9 :
          oldTown ? 3 :
          trap ? -15 :
          i>=27 ? 0 :
          i%2 ? 5 : -5;

        style(r,".d-scale",{
          transform:`rotate(${angle}deg)`
        });

        style(r,".d-left",{
          transform:`rotate(${-angle}deg)`
        });

        style(r,".d-right",{
          transform:`rotate(${-angle}deg)`
        });

        visible(
          r,".d-scan",
          i===5 || i===6 ||
          (i>=9 && i<=13) ||
          i===17 || i===18
        );

        move(
          r,".d-scan",
          0,
          i%2 ? 100 : -25
        );

        visible(
          r,".d-verdict",
          i===13 || i===14 || i>=27
        );

        visible(
          r,".d-warning",
          i===11 || corniche || oldTown || trap
        );

        visible(r,".d-mistake",i>=23 && i<=26);

        visible(
          r,".d-record",
          i>=9 && i<=14
        );

        move(
          r,".d-file",
          i%2 ? 0 : 3,
          marina ? -13 : 0,
          marina ? 1.13 : 1
        );

        move(
          r,".d-evidence",
          i%2 ? -3 : 0,
          corniche ? -13 : 0,
          corniche ? 1.12 : 1
        );
      },
      "A forensic balance separates checkable process defects from rational personal concerns"
    );
  }

  // ============================================================
  // SCENE O2c — THE INTERVENTION WORKSHOP
  // ============================================================
  //
  // Original visual:
  // An industrial repair workshop.
  //
  // Different defective inputs travel along a conveyor.
  // A robotic arm selects a different physical tool for
  // each cause of resistance.
  //
  // Defect -> redesign.
  // Lost expertise -> co-design.
  // Employment fear -> written commitment.
  // Change fatigue -> reschedule.
  // No involvement -> shared design.
  //
  // Exact narration count: 30.
  // ============================================================

  {
    const body = `
      ${T(170,23,"THE INTERVENTION WORKSHOP",14,C.navy)}

      ${R(19,65,302,253,C.blue,19,'opacity=".28"')}

      ${P("M35 287 H305",C.navy,8)}

      ${[48,91,134,177,220,263,298].map(x =>
        O(x,287,10,C.paper,
          `stroke="${C.navy}" stroke-width="2"`)
      ).join("")}

      <g class="e-belt motion">
        ${R(38,238,264,35,C.navy,9)}
        ${[58,99,140,181,222,263].map(x =>
          R(x,247,23,15,C.blue,3)
        ).join("")}
      </g>

      <g class="e-object motion">
        ${R(121,190,98,48,C.paper,9,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${O(170,214,13,C.orange)}
        ${T(170,219,"!",17,C.paper)}
      </g>

      <g class="e-arm motion">
        ${P("M170 67 V100",C.navy,10)}
        ${O(170,105,17,C.navy)}
        ${P("M170 105 L221 137",C.navy,11)}
        ${O(221,137,12,C.orange)}
        ${P("M221 137 L191 178",C.navy,8)}
        ${P("M179 174 L191 190 L203 174",C.orange,5)}
      </g>

      <g class="e-tool e-design motion" opacity="0">
        ${P("M145 200 H195 M170 185 V219",C.green,5)}
        ${O(170,201,24,"none",
          `stroke="${C.green}" stroke-width="3"`)}
      </g>

      <g class="e-tool e-people motion" opacity="0">
        ${person(153,207,C.green,.58)}
        ${person(187,207,C.navy,.58)}
      </g>

      <g class="e-tool e-contract motion" opacity="0">
        ${documentIcon(170,207,.65)}
        ${tick(170,210,C.green,.7)}
      </g>

      <g class="e-tool e-calendar motion" opacity="0">
        ${R(146,183,48,48,C.paper,5,
          `stroke="${C.green}" stroke-width="3"`)}
        ${P("M146 197 H194",C.green,3)}
        ${T(170,219,"7",19,C.navy)}
      </g>

      <g class="e-output motion" opacity="0">
        ${O(170,212,30,C.pale,
          `stroke="${C.green}" stroke-width="3"`)}
        ${tick(170,212,C.green,1.3)}
      </g>

      <g class="e-cost fade" opacity="0">
        ${R(83,332,174,36,C.paper,16,
          `stroke="${C.orange}" stroke-width="2"`)}
        ${T(170,354,"REAL CHANGE · REAL COST",11,C.orange)}
      </g>

      <g class="e-press fade" opacity="0">
        ${R(42,88,79,49,C.paper,7,
          `stroke="${C.navy}" stroke-width="2"`)}
        ${T(81,109,"CAUSE",12,C.navy)}
        ${T(81,125,"FIRST",12,C.orange)}
      </g>

      <g class="e-reject fade" opacity="0">
        ${O(276,119,25,C.paper,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${cross(276,119,C.orange,1)}
      </g>
    `;

    const states = [
      "Eleven weeks remain",
      "One message cannot fit",
      "Match each cause",
      "Repair the design",
      "Add an exception path",
      "Credit the discovery",
      "Problems change decisions",
      "Protect expert status",
      "Training is insufficient",
      "Experts become designers",
      "Preserve their knowledge",
      "Make expertise visible",
      "Address employment fear",
      "Empty reassurance fails",
      "Commit in writing",
      "Name redeployment",
      "Remove ambiguity",
      "Recognise change fatigue",
      "Avoid another launch",
      "Space the changes",
      "Delay unrelated updates",
      "Most were excluded",
      "Communication is not ownership",
      "Co-design the process",
      "Input must change decisions",
      "Make tangible changes",
      "Every change costs",
      "Pay for adoption",
      "Beyond the front desk",
      "Engage the stakeholders"
    ];

    scene(
      "O2c",
      body,
      (r,i,n) => {
        label(r,states[Math.min(i,29)]);

        const design = i>=3 && i<=6;
        const expertise = i>=7 && i<=11;
        const employment = i>=12 && i<=16;
        const fatigue = i>=17 && i<=20;
        const involvement = i>=21 && i<=24;
        const outcome = i>=25;

        visible(r,".e-design",design);
        visible(r,".e-people",expertise || involvement);
        visible(r,".e-contract",employment);
        visible(r,".e-calendar",fatigue);
        visible(r,".e-output",outcome);

        visible(r,".e-cost",i>=25);
        visible(r,".e-press",i>=2);

        visible(
          r,".e-reject",
          i===1 || i===8 || i===13 ||
          i===18 || i===22
        );

        const armAngle =
          design ? -19 :
          expertise ? 16 :
          employment ? -9 :
          fatigue ? 22 :
          involvement ? -16 :
          outcome ? 0 :
          i%2 ? 8 : -8;

        style(r,".e-arm",{
          transform:`rotate(${armAngle}deg)`
        });

        move(
          r,".e-object",
          i%2 ? 10 : -10,
          outcome ? 0 : i%2 ? -4 : 0,
          outcome ? .85 : 1
        );

        move(
          r,".e-belt",
          i%2 ? 9 : -9,
          0
        );

        move(
          r,".e-output",
          0,
          i%2 ? -7 : 0,
          outcome ? 1.08 : 1
        );
      },
      "A repair workshop applies different physical interventions to different causes of resistance"
    );
  }

  // ============================================================
  // SCENE O3a — THE STAKEHOLDER CONSTELLATION
  // ============================================================
  //
  // Original visual:
  // A night-sky constellation of organisational influence.
  //
  // Stakeholders are stars, not boxes.
  // Power and interest form the underlying coordinate field.
  // The director's attention becomes a moving beam.
  //
  // Each stakeholder illuminates its appropriate quadrant.
  //
  // Exact narration count: 29.
  // ============================================================

  {
    const stars = [
      {
        x:251,y:95,
        name:"COO",
        color:C.orange,
        size:20
      },
      {
        x:286,y:139,
        name:"OWNER",
        color:C.green,
        size:18
      },
      {
        x:91,y:102,
        name:"LEGAL",
        color:C.navy,
        size:17
      },
      {
        x:253,y:277,
        name:"STAFF",
        color:C.green,
        size:19
      },
      {
        x:79,y:280,
        name:"AUDITOR",
        color:C.navy,
        size:15
      }
    ];

    const body = `
      <defs>
        <radialGradient id="w04f-sky">
          <stop stop-color="${C.blue}"
            stop-opacity=".6"/>
          <stop offset="1"
            stop-color="${C.paper}"
            stop-opacity="0"/>
        </radialGradient>
      </defs>

      ${T(170,23,"THE STAKEHOLDER CONSTELLATION",13,C.navy)}

      ${O(170,190,158,"url(#w04f-sky)")}

      <g class="f-grid fade" opacity="0">
        ${P("M35 190 H305 M170 45 V337",
          C.navy,2,'opacity=".45"')}

        ${T(83,60,"KEEP SATISFIED",10,C.navy)}
        ${T(250,60,"MANAGE CLOSELY",10,C.orange)}
        ${T(83,327,"MONITOR",10,C.navy)}
        ${T(255,327,"KEEP INFORMED",10,C.green)}
      </g>

      ${P("M29 342 V42 M29 342 H315",C.navy,2)}

      ${T(17,190,"P",11,C.navy)}
      ${T(323,359,"INTEREST",10,C.navy)}

      <g class="f-orbit motion">
        ${O(170,190,132,"none",
          `stroke="${C.muted}" stroke-width="1.5"
           stroke-dasharray="3 8"`)}
      </g>

      ${stars.map((s,j) => `
        <g class="f-star f-star-${j}">
          ${O(s.x,s.y,s.size+8,s.color,
            'opacity=".09"')}
          ${O(s.x,s.y,s.size,C.paper,
            `stroke="${s.color}" stroke-width="3"`)}
          ${O(s.x,s.y,6,s.color)}
          ${T(s.x,s.y+s.size+23,s.name,11,s.color)}
        </g>
      `).join("")}

      ${stars.map((s,j) =>
        P(
          `M170 190 L${s.x} ${s.y}`,
          s.color,
          2,
          `class="f-link f-link-${j}"`
        )
      ).join("")}

      <g class="f-beam motion">
        ${O(170,190,37,C.paper,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${O(170,190,21,C.blue)}
        ${T(170,195,"FOCUS",13,C.navy)}
      </g>

      <g class="f-influence fade" opacity="0">
        ${O(253,277,32,"none",
          `stroke="${C.orange}" stroke-width="3"
           stroke-dasharray="5 5"`)}
      </g>

      <g class="f-plan fade" opacity="0">
        ${R(84,350,172,29,C.pale,14)}
        ${T(170,369,"ENGAGEMENT PLAN",12,C.green)}
      </g>
    `;

    const states = [
      "Beyond the front desk",
      "Influence determines outcomes",
      "Identify stakeholders",
      "Map the organisation",
      "Attention is limited",
      "Power and interest",
      "Power can block",
      "Interest reflects impact",
      "Place the stakeholders",
      "Sponsor and owner",
      "Manage closely",
      "Legal has authority",
      "Keep legal satisfied",
      "Avoid late objections",
      "Manage expectations",
      "Front-line interest",
      "Consult the staff",
      "Neglected consultation",
      "External auditor",
      "Monitor selectively",
      "Attention follows risk",
      "Positions can change",
      "Attention is not respect",
      "Power is not just title",
      "Informal influence",
      "Old routines may survive",
      "Judge real influence",
      "Build engagement",
      "Act on the grid"
    ];

    const selected = [
      0,0,0,0,0,0,0,0,0,
      0,1,2,2,2,2,
      3,3,3,4,4,4,4,
      0,3,3,3,3,0,0
    ];

    scene(
      "O3a",
      body,
      (r,i,n) => {
        label(r,states[Math.min(i,28)]);

        const focus = selected[Math.min(i,28)];

        visible(r,".f-grid",i>=5);
        visible(r,".f-influence",i>=23 && i<=26);
        visible(r,".f-plan",i>=27);

        stars.forEach((s,j) => {
          const active = j===focus;

          style(r,`.f-star-${j}`,{
            opacity:active ? "1" : ".35",
            transform:
              `scale(${active ? 1.13 : .88})`
          });

          attr(
            r,`.f-link-${j}`,
            "stroke-dashoffset",
            active ? 0 : 230
          );
        });

        const target = stars[focus];

        move(
          r,".f-beam",
          (target.x-170)*.22,
          (target.y-190)*.22,
          i%2 ? 1.08 : 1
        );

        move(
          r,".f-orbit",
          0,0,1,
          i*7
        );
      },
      "Stakeholders form a constellation positioned by real power and interest"
    );
  }

  // ============================================================
  // SCENE O3b — THE ENGAGEMENT CALENDAR
  // ============================================================
  //
  // Original visual:
  // A miniature director moves through a three-dimensional
  // working week.
  //
  // Sunday: co-design table.
  // Monday: legal briefing.
  // Tuesday: front-desk consultation.
  // Thursday: auditor update and written follow-up.
  //
  // Four distinct engagement channels occupy the same world.
  //
  // Exact narration count: 29.
  // ============================================================

  {
    const days = [
      {x:48,name:"SUN",color:C.green},
      {x:128,name:"MON",color:C.navy},
      {x:208,name:"TUE",color:C.orange},
      {x:288,name:"THU",color:C.green}
    ];

    const body = `
      ${T(170,23,"ONE WEEK OF ENGAGEMENT",14,C.navy)}

      <path d="M28 72 H312 V318 H28 Z"
        fill="${C.blue}"
        opacity=".22"/>

      ${days.map((d,j) => `
        <g class="g-day g-day-${j}">
          ${R(d.x-30,53,60,45,C.paper,9,
            `stroke="${d.color}" stroke-width="2"`)}
          ${T(d.x,72,d.name,12,d.color)}
          ${O(d.x,85,5,d.color)}
        </g>
      `).join("")}

      <path class="g-route"
        d="M48 117 H128 H208 H288"
        fill="none"
        stroke="${C.green}"
        stroke-width="5"
        stroke-linecap="round"/>

      <g class="g-director motion">
        ${person(48,135,C.navy,.8)}
      </g>

      <g class="g-meeting g-sunday motion">
        ${O(75,230,39,C.paper,
          `stroke="${C.green}" stroke-width="3"`)}
        ${O(75,230,22,C.blue)}
        ${person(54,206,C.navy,.4)}
        ${person(96,206,C.green,.4)}
        ${person(75,254,C.orange,.4)}
        ${T(75,294,"CO-DESIGN",11,C.green)}
      </g>

      <g class="g-message g-monday motion" opacity="0">
        ${documentIcon(170,229,1.05)}
        ${O(193,199,14,C.green)}
        ${tick(193,199,C.paper,.55)}
        ${T(170,294,"LEGAL BRIEF",11,C.navy)}
      </g>

      <g class="g-meeting g-tuesday motion" opacity="0">
        ${desk(265,231,.67)}
        ${person(228,235,C.green,.55)}
        ${T(265,294,"CONSULT STAFF",11,C.orange)}
      </g>

      <g class="g-response motion" opacity="0">
        ${documentIcon(170,226,1)}
        ${P("M150 246 L164 257 L188 230",C.green,4)}
        ${T(170,294,"CLOSE THE LOOP",11,C.green)}
      </g>

      <g class="g-newsletter fade" opacity="0">
        ${P("M67 332 H273",C.orange,4)}
        ${cross(170,332,C.orange,1.1)}
        ${T(170,359,"ONE-WAY MESSAGE",11,C.orange)}
      </g>

      <g class="g-week fade" opacity="0">
        ${R(76,336,188,34,C.pale,16)}
        ${T(170,357,"EFFORT FOLLOWS NEED",12,C.green)}
      </g>
    `;

    const states = [
      "A director's working week",
      "Sunday co-design",
      "Decisions made together",
      "Agents reveal exceptions",
      "Sponsor sees trade-offs",
      "Frequent sponsor contact",
      "Monday legal briefing",
      "Ask about guest data",
      "Answer before launch",
      "Prevent late objections",
      "Honest expectations",
      "Tuesday at Corniche",
      "Ask and record",
      "Explain design decisions",
      "Promise a written answer",
      "Close the feedback loop",
      "Not a newsletter",
      "Thursday auditor update",
      "Deliver the promised answer",
      "Monitor selectively",
      "Review the calendar",
      "Avoid identical messages",
      "Different engagement depths",
      "Four different needs",
      "Effort follows the grid",
      "Calendar reveals priorities",
      "The grid is temporary",
      "Stakeholders keep moving",
      "Revisit the plan"
    ];

    const dayFor = i =>
      i<6 ? 0 :
      i<11 ? 1 :
      i<17 ? 2 :
      i<20 ? 3 :
      i<26 ? 2 : 3;

    scene(
      "O3b",
      body,
      (r,i,n) => {
        label(r,states[Math.min(i,28)]);

        const d = dayFor(i);

        days.forEach((day,j) => {
          style(r,`.g-day-${j}`,{
            opacity:j===d ? "1" : ".38",
            transform:
              `translateY(${j===d?-6:0}px) ` +
              `scale(${j===d?1.08:1})`
          });
        });

        move(
          r,".g-director",
          days[d].x-48,
          i%2 ? -6 : 0
        );

        visible(r,".g-sunday",i<6);
        visible(r,".g-monday",i>=6 && i<11);
        visible(r,".g-tuesday",i>=11 && i<17);
        visible(
          r,".g-response",
          (i>=17 && i<20) || i>=22
        );

        visible(r,".g-newsletter",i===16 || i===21);
        visible(r,".g-week",i>=24);

        attr(
          r,".g-route",
          "stroke-dashoffset",
          Math.max(0,400-(i/28)*400)
        );

        move(
          r,".g-response",
          i%2 ? 7 : -7,
          i%2 ? -4 : 0
        );

        move(
          r,".g-tuesday",
          i%2 ? -5 : 5,
          0
        );
      },
      "A director physically moves through different stakeholder engagement activities during one working week"
    );
  }

  // ============================================================
  // SCENE O3c — THE MOVING STAKEHOLDER GRID
  // ============================================================
  //
  // Original visual:
  // A stakeholder grid behaves like a living navigation map.
  //
  // Finance starts at high power / low interest.
  // When invoicing enters scope, finance travels horizontally
  // into high power / high interest.
  //
  // Later, informal power at Corniche also rises.
  //
  // Movement leaves a visible trail.
  // Phase boundaries trigger a new scan.
  //
  // Exact narration count: 30.
  // ============================================================

  {
    const body = `
      ${T(170,23,"THE MOVING STAKEHOLDER GRID",13,C.navy)}

      ${R(35,52,270,275,C.paper,8,
        `stroke="${C.navy}" stroke-width="2"` )}

      ${P("M170 52 V327 M35 190 H305",
        C.muted,2)}

      ${T(100,70,"KEEP SATISFIED",10,C.navy)}
      ${T(241,70,"MANAGE CLOSELY",10,C.green)}
      ${T(100,310,"MONITOR",10,C.navy)}
      ${T(242,310,"KEEP INFORMED",10,C.green)}

      ${T(18,186,"P",12,C.navy)}
      ${T(170,348,"INTEREST",11,C.navy)}

      <path class="h-trail"
        d="M91 111 Q170 80 249 111"
        fill="none"
        stroke="${C.orange}"
        stroke-width="4"
        stroke-linecap="round"/>

      <g class="h-finance motion">
        ${O(91,111,25,C.paper,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${T(91,117,"F",23,C.orange)}
      </g>

      <g class="h-sponsor motion">
        ${O(259,102,19,C.paper,
          `stroke="${C.green}" stroke-width="2.5"`)}
        ${T(259,108,"S",17,C.green)}
      </g>

      <g class="h-staff motion">
        ${O(252,271,22,C.paper,
          `stroke="${C.navy}" stroke-width="2.5"`)}
        ${T(252,277,"C",19,C.navy)}
      </g>

      <g class="h-auditor motion">
        ${O(83,267,18,C.paper,
          `stroke="${C.muted}" stroke-width="2"`)}
        ${T(83,273,"A",16,C.navy)}
      </g>

      <g class="h-invoice fade" opacity="0">
        ${documentIcon(170,185,.9)}
        ${T(170,234,"INVOICING",12,C.orange)}
      </g>

      <g class="h-alert fade" opacity="0">
        ${O(265,169,24,C.paper,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${T(265,176,"!",25,C.orange)}
      </g>

      <g class="h-phase fade" opacity="0">
        ${R(78,355,184,29,C.pale,14)}
        ${T(170,374,"RE-RUN THE GRID",12,C.green)}
      </g>
    `;

    const states = [
      "Four months later",
      "Finance at kickoff",
      "High power, low interest",
      "Invoicing enters scope",
      "Interest rises",
      "Finance moves",
      "Manage finance closely",
      "Shift to co-design",
      "An outdated grid",
      "A late objection",
      "Expensive redesign",
      "Power can stop launch",
      "Movement was missed",
      "An old snapshot",
      "Positions are temporary",
      "Power and interest move",
      "When should we redraw?",
      "Every phase boundary",
      "A new programme phase",
      "Scope changes again",
      "Scan the grid",
      "Movement can reverse",
      "Front-line influence",
      "Redeployment reaches Corniche",
      "A written commitment",
      "Informal power increases",
      "Other desks are watching",
      "Engagement must change",
      "Beyond go-live",
      "Measure actual adoption"
    ];

    scene(
      "O3c",
      body,
      (r,i,n) => {
        label(r,states[Math.min(i,29)]);

        const financeMoves = i>=4;
        const staffMoves = i>=25;

        move(
          r,".h-finance",
          financeMoves ? 158 : 0,
          i%2 ? -3 : 3,
          financeMoves ? 1.12 : 1
        );

        move(
          r,".h-staff",
          staffMoves ? -2 : 0,
          staffMoves ? -105 : 0,
          staffMoves ? 1.16 : 1
        );

        visible(r,".h-invoice",i>=3 && i<=7);

        visible(
          r,".h-alert",
          (i>=9 && i<=12) ||
          (i>=23 && i<=26)
        );

        visible(r,".h-phase",i>=17);

        attr(
          r,".h-trail",
          "stroke-dashoffset",
          financeMoves ? 0 : 240
        );

        move(
          r,".h-sponsor",
          i%2 ? 3 : -3,
          0
        );

        move(
          r,".h-auditor",
          i>=21 ? -5 : 0,
          i>=21 ? 7 : 0,
          i>=21 ? .85 : 1
        );

        move(
          r,".h-invoice",
          0,
          i%2 ? -7 : 0
        );
      },
      "A living stakeholder map shows finance and front-line influence moving as programme scope changes"
    );
  }

  // CONTINUE DIRECTLY WITH PART 3.
  // ============================================================
  // O3d · O3e · O3f · O3g
  // ============================================================

  // ============================================================
  // FINAL SCENE-SPECIFIC CSS
  // ============================================================

  {
    const css = document.getElementById("vl-sc-w04");

    if (css) {
      css.textContent += `

        /* O3d — THE PARALLEL PROCESS RAILWAY */

        .vls-w04-O3d .j-train,
        .vls-w04-O3d .j-switch,
        .vls-w04-O3d .j-gate,
        .vls-w04-O3d .j-exception,
        .vls-w04-O3d .j-risk,
        .vls-w04-O3d .j-station {
          transition:
            transform .95s cubic-bezier(.2,.8,.2,1),
            opacity .7s ease;
        }

        .vls-w04-O3d .j-track {
          stroke-dasharray:460;
          stroke-dashoffset:460;
          transition:stroke-dashoffset 1.1s ease;
        }

        /* O3e — THE INTERVENTION CONSTRUCTION SITE */

        .vls-w04-O3e .k-crane {
          transform-origin:170px 77px;
          transition:transform .95s ease;
        }

        .vls-w04-O3e .k-block,
        .vls-w04-O3e .k-worker,
        .vls-w04-O3e .k-foundation,
        .vls-w04-O3e .k-result,
        .vls-w04-O3e .k-budget {
          transition:
            transform .9s cubic-bezier(.2,.8,.2,1),
            opacity .7s ease;
        }

        .vls-w04-O3e .k-cable {
          transition:transform .9s ease;
        }

        /* O3f — THE DECISION CHAMBER */

        .vls-w04-O3f .m-door,
        .vls-w04-O3f .m-key,
        .vls-w04-O3f .m-light,
        .vls-w04-O3f .m-gate,
        .vls-w04-O3f .m-record,
        .vls-w04-O3f .m-choice {
          transition:
            transform .95s cubic-bezier(.2,.8,.2,1),
            opacity .7s ease;
        }

        .vls-w04-O3f .m-beam {
          stroke-dasharray:350;
          stroke-dashoffset:350;
          transition:stroke-dashoffset 1s ease;
        }

        /* O3g — THE KNOWLEDGE FORUM */

        .vls-w04-O3g .q-person,
        .vls-w04-O3g .q-signal,
        .vls-w04-O3g .q-centre,
        .vls-w04-O3g .q-archive,
        .vls-w04-O3g .q-loop,
        .vls-w04-O3g .q-evidence {
          transition:
            transform .95s cubic-bezier(.2,.8,.2,1),
            opacity .7s ease;
        }

        .vls-w04-O3g .q-link {
          stroke-dasharray:280;
          stroke-dashoffset:280;
          transition:stroke-dashoffset 1s ease;
        }

        @media (prefers-reduced-motion:reduce) {
          .vls-w04-O3d *,
          .vls-w04-O3e *,
          .vls-w04-O3f *,
          .vls-w04-O3g * {
            transition:none!important;
            animation:none!important;
          }
        }
      `;
    }
  }

  // ============================================================
  // SCENE O3d — THE PARALLEL PROCESS RAILWAY
  // ============================================================
  //
  // Original visual:
  // Two railway tracks represent old and new processes.
  //
  // The old route remains operational while the new route
  // is tested. A physical switch directs an arriving guest
  // toward either the kiosk or the staffed exception route.
  //
  // A failure closes the new route.
  // Evidence reopens the switch.
  //
  // Cinematic language:
  // Moving carriage, illuminated rails, junction switching,
  // safety gate, exception diversion, controlled reopening.
  // ============================================================

  {
    const body = `
      ${T(170,23,"THE PARALLEL PROCESS RAILWAY",13,C.navy)}

      <g opacity=".25">
        ${P("M25 67 H315 M25 90 H315",C.muted,1)}
        ${P("M25 315 H315",C.muted,2)}
      </g>

      <path class="j-track j-old"
        d="M170 331 V248 Q170 216 110 196
           Q67 180 67 120"
        fill="none"
        stroke="${C.navy}"
        stroke-width="8"
        stroke-linecap="round"/>

      <path class="j-track j-new"
        d="M170 331 V248 Q170 216 230 196
           Q273 180 273 120"
        fill="none"
        stroke="${C.green}"
        stroke-width="8"
        stroke-linecap="round"/>

      <g opacity=".5">
        ${[254,275,296,317].map(y =>
          P(`M153 ${y} H187`,C.navy,3)
        ).join("")}

        ${[135,154,173].map(y => `
          ${P(`M48 ${y} H86`,C.navy,3)}
          ${P(`M254 ${y} H292`,C.green,3)}
        `).join("")}
      </g>

      <g class="j-station j-old-station motion">
        ${R(31,64,73,49,C.paper,8,
          `stroke="${C.navy}" stroke-width="2"`)}
        ${T(67,83,"STAFFED",11,C.navy)}
        ${T(67,98,"DESK",11,C.navy)}
        ${desk(67,145,.4)}
      </g>

      <g class="j-station j-new-station motion">
        ${R(236,64,73,49,C.paper,8,
          `stroke="${C.green}" stroke-width="2"`)}
        ${T(273,83,"SELF",11,C.green)}
        ${T(273,98,"SERVICE",11,C.green)}
        ${kiosk(273,157,.42)}
      </g>

      <g class="j-switch motion">
        ${O(170,248,18,C.paper,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${P("M170 248 L148 224",C.orange,6)}
        ${O(170,248,5,C.navy)}
      </g>

      <g class="j-train motion">
        ${R(150,300,40,45,C.paper,8,
          `stroke="${C.navy}" stroke-width="3"`)}
        ${R(158,308,24,15,C.blue,3)}
        ${O(160,340,5,C.navy)}
        ${O(180,340,5,C.navy)}
      </g>

      <g class="j-gate fade" opacity="0">
        ${P("M232 204 H307",C.orange,7)}
        ${P("M239 204 L239 224",C.orange,4)}
        ${cross(273,190,C.orange,.9)}
      </g>

      <g class="j-exception fade" opacity="0">
        ${O(67,211,24,C.pale,
          `stroke="${C.green}" stroke-width="2"`)}
        ${tick(67,211,C.green,.9)}
      </g>

      <g class="j-risk fade" opacity="0">
        ${O(273,242,25,C.paper,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${T(273,250,"!",27,C.orange)}
      </g>

      <g class="j-release fade" opacity="0">
        ${R(104,350,132,29,C.pale,14)}
        ${T(170,369,"CONTROLLED RELEASE",11,C.green)}
      </g>
    `;

    const states = [
      "Two routes coexist",
      "Old service remains",
      "New service is tested",
      "The guest arrives",
      "A controlled junction",
      "Choose the new route",
      "The kiosk operates",
      "Exceptions remain",
      "Redirect the guest",
      "Staffed recovery",
      "Protect the experience",
      "A failed test",
      "Close the new route",
      "Investigate the defect",
      "Repair the exception",
      "Test the correction",
      "Collect evidence",
      "The switch reopens",
      "Avoid forced migration",
      "Parallel operation costs",
      "Staff both routes",
      "Limit the overlap",
      "Define exit criteria",
      "Measure exception rates",
      "Verify recovery",
      "Authorise the switch",
      "Retire the old route",
      "Preserve fallback",
      "Go-live is conditional",
      "Controlled transition"
    ];

    scene(
      "O3d",
      body,
      (r,i,n) => {
        label(r,states[Math.min(i,29)]);

        const failure = i>=11 && i<=16;
        const recovered = i>=17;
        const oldRoute =
          i<5 || (i>=8 && i<=10) || failure;

        attr(
          r,".j-old",
          "stroke-dashoffset",
          i>=1 ? 0 : 460
        );

        attr(
          r,".j-new",
          "stroke-dashoffset",
          i>=5 ? 0 : 460
        );

        visible(r,".j-gate",failure);
        visible(r,".j-risk",failure);
        visible(
          r,".j-exception",
          i>=8 && i<=10
        );
        visible(r,".j-release",i>=25);

        const routeX =
          oldRoute ? -103 : 103;

        const distance =
          i<3 ? 0 :
          i<5 ? -35 :
          i<8 ? -120 :
          i<11 ? -155 :
          failure ? -82 :
          i<25 ? -145 : -180;

        move(
          r,".j-train",
          routeX * Math.min(1,Math.abs(distance)/145),
          distance,
          i%2 ? 1.04 : 1
        );

        style(r,".j-switch",{
          transform:
            `rotate(${oldRoute?-38:38}deg)`
        });

        move(
          r,".j-new-station",
          0,
          i%2 ? -3 : 0,
          recovered ? 1.07 : 1
        );

        move(
          r,".j-old-station",
          0,
          i%2 ? 2 : -2
        );
      },
      "Two operational railway routes demonstrate parallel processing, exception recovery and controlled migration"
    );
  }

  // ============================================================
  // SCENE O3e — THE INTERVENTION CONSTRUCTION SITE
  // ============================================================
  //
  // Original visual:
  // A construction site assembles an adoption-support system.
  //
  // A tower crane places five different structural components:
  // exception repair, expert involvement, written commitments,
  // staged implementation and measurement.
  //
  // The structure becomes stable only when all supports exist.
  //
  // Cinematic language:
  // Crane rotation, suspended loads, lowering blocks,
  // construction workers, structural stability and inspection.
  // ============================================================

  {
    const blocks = [
      {x:49,y:260,w:75,c:C.navy,t:"REPAIR"},
      {x:133,y:260,w:75,c:C.green,t:"EXPERTS"},
      {x:217,y:260,w:75,c:C.orange,t:"PROMISES"},
      {x:91,y:214,w:75,c:C.green,t:"STAGING"},
      {x:175,y:214,w:75,c:C.navy,t:"MEASURES"}
    ];

    const body = `
      ${T(170,23,"THE INTERVENTION CONSTRUCTION SITE",12,C.navy)}

      <g opacity=".3">
        ${P("M24 320 H316",C.navy,3)}
        ${P("M24 335 H316",C.muted,2)}
      </g>

      <g class="k-crane motion">
        ${P("M170 72 V292",C.navy,8)}
        ${P("M77 76 H280",C.navy,7)}
        ${P("M170 76 L220 45 L280 76",C.navy,3)}
        ${P("M170 76 L116 45 L77 76",C.navy,3)}
        ${O(170,76,10,C.orange)}
      </g>

      <g class="k-cable motion">
        ${P("M231 77 V172",C.navy,3)}
        ${P("M222 172 L231 183 L240 172",C.orange,4)}
      </g>

      <g class="k-foundation motion">
        ${R(37,300,266,20,C.navy,5)}
        ${[58,111,164,217,270].map(x =>
          R(x,320,13,16,C.muted,2)
        ).join("")}
      </g>

      ${blocks.map((b,j) => `
        <g class="k-block k-block-${j} motion" opacity="0">
          ${R(b.x,b.y,b.w,42,C.paper,6,
            `stroke="${b.c}" stroke-width="3"`)}
          ${R(b.x+5,b.y+5,b.w-10,8,b.c,3,
            'opacity=".3"')}
          ${T(b.x+b.w/2,b.y+30,b.t,10,b.c)}
        </g>
      `).join("")}

      <g class="k-worker motion">
        ${person(37,282,C.orange,.68)}
        ${person(307,282,C.green,.68)}
      </g>

      <g class="k-budget fade" opacity="0">
        ${R(91,347,158,29,C.paper,14,
          `stroke="${C.orange}" stroke-width="2"`)}
        ${T(170,366,"RESOURCE THE WORK",11,C.orange)}
      </g>

      <g class="k-result fade" opacity="0">
        ${O(170,172,29,C.pale,
          `stroke="${C.green}" stroke-width="3"`)}
        ${tick(170,172,C.green,1.2)}
      </g>

      <g class="k-warning fade" opacity="0">
        ${O(170,174,27,C.paper,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${T(170,182,"!",29,C.orange)}
      </g>
    `;

    const states = [
      "Build the intervention",
      "Diagnose before acting",
      "A real exception defect",
      "Repair the process",
      "Make the fix visible",
      "Experts need a role",
      "Invite expert designers",
      "Recognise their contribution",
      "Employment uncertainty",
      "Make commitments explicit",
      "Write the agreement",
      "Change fatigue",
      "Stage the rollout",
      "Avoid competing changes",
      "Measure what matters",
      "Adoption requires evidence",
      "Five structural supports",
      "No single solution",
      "Allocate responsibility",
      "Assign the resources",
      "Fund the transition",
      "Construction has costs",
      "Check each component",
      "Inspect the system",
      "Weak support threatens launch",
      "Repair before release",
      "Demonstrate readiness",
      "Support real behaviour",
      "Build lasting capability",
      "Ready for decision"
    ];

    scene(
      "O3e",
      body,
      (r,i,n) => {
        label(r,states[Math.min(i,29)]);

        const count =
          i<3 ? 0 :
          i<6 ? 1 :
          i<9 ? 2 :
          i<12 ? 3 :
          i<15 ? 4 : 5;

        blocks.forEach((b,j) => {
          const placed = j<count;

          visible(r,`.k-block-${j}`,placed);

          if (placed) {
            move(
              r,`.k-block-${j}`,
              0,
              i%2 && j===count-1 ? -4 : 0
            );
          }
        });

        style(r,".k-crane",{
          transform:
            `rotate(${i%2?3:-3}deg)`
        });

        move(
          r,".k-cable",
          i<15 ? (i%3-1)*23 : 0,
          i%2 ? 12 : -9
        );

        move(
          r,".k-worker",
          i%2 ? 6 : -6,
          0
        );

        visible(r,".k-budget",i>=19 && i<=22);

        visible(
          r,".k-warning",
          i>=23 && i<=25
        );

        visible(r,".k-result",i>=26);

        move(
          r,".k-result",
          0,
          i%2 ? -5 : 0,
          i>=28 ? 1.14 : 1
        );
      },
      "A crane constructs a five-part adoption support system using different interventions as structural components"
    );
  }

  // ============================================================
  // SCENE O3f — THE DECISION CHAMBER
  // ============================================================
  //
  // Original visual:
  // A monumental decision gate with two heavy doors.
  //
  // Three keys represent:
  // operational evidence, stakeholder readiness and
  // explicit ownership.
  //
  // The gate refuses to open when one condition is missing.
  // Once evidence is complete, the mechanism unlocks.
  //
  // Cinematic language:
  // Key insertion, mechanical lock rotation, warning light,
  // door movement, decision record and release.
  // ============================================================

  {
    const body = `
      <defs>
        <linearGradient id="w04m-door"
          x1="0" y1="0" x2="1" y2="0">
          <stop stop-color="${C.navy}"/>
          <stop offset=".5" stop-color="${C.blue}"/>
          <stop offset="1" stop-color="${C.navy}"/>
        </linearGradient>
      </defs>

      ${T(170,23,"THE DECISION CHAMBER",14,C.navy)}

      ${R(45,66,250,256,C.navy,17)}

      ${R(57,78,226,232,C.paper,11)}

      <g class="m-door m-left motion">
        ${R(62,83,106,222,C.blue,6,
          `stroke="${C.navy}" stroke-width="3"`)}
        ${P("M149 115 V270",C.navy,2,'opacity=".4"')}
      </g>

      <g class="m-door m-right motion">
        ${R(172,83,106,222,C.blue,6,
          `stroke="${C.navy}" stroke-width="3"`)}
        ${P("M191 115 V270",C.navy,2,'opacity=".4"')}
      </g>

      <g class="m-gate motion">
        ${O(170,190,49,C.paper,
          `stroke="${C.orange}" stroke-width="5"`)}
        ${O(170,190,31,C.blue,
          `stroke="${C.navy}" stroke-width="2"`)}
        ${P("M170 173 V208",C.navy,6)}
        ${O(170,172,7,C.navy)}
      </g>

      <g class="m-key m-key-0 motion">
        ${O(81,345,12,C.paper,
          `stroke="${C.navy}" stroke-width="3"`)}
        ${P("M93 345 H122 M111 345 V353",C.navy,4)}
        ${T(101,376,"EVIDENCE",10,C.navy)}
      </g>

      <g class="m-key m-key-1 motion">
        ${O(155,345,12,C.paper,
          `stroke="${C.green}" stroke-width="3"`)}
        ${P("M167 345 H196 M185 345 V353",C.green,4)}
        ${T(174,376,"READINESS",10,C.green)}
      </g>

      <g class="m-key m-key-2 motion">
        ${O(229,345,12,C.paper,
          `stroke="${C.orange}" stroke-width="3"`)}
        ${P("M241 345 H270 M259 345 V353",C.orange,4)}
        ${T(248,376,"OWNERSHIP",10,C.orange)}
      </g>

      <g class="m-light fade" opacity="0">
        ${O(170,109,17,C.orange)}
        ${T(170,116,"!",23,C.paper)}
      </g>

      <g class="m-choice fade" opacity="0">
        ${O(170,109,19,C.green)}
        ${tick(170,109,C.paper,.8)}
      </g>

      <g class="m-record fade" opacity="0">
        ${documentIcon(170,247,.75)}
        ${T(170,296,"DECISION RECORDED",11,C.green)}
      </g>

      <path class="m-beam"
        d="M170 190 V90"
        fill="none"
        stroke="${C.green}"
        stroke-width="5"/>
    `;

    const states = [
      "The release decision",
      "A gate needs evidence",
      "What must be true?",
      "Operational performance",
      "Check the baseline",
      "Test the exceptions",
      "Measure the recovery",
      "The first key",
      "Stakeholder readiness",
      "Have people practised?",
      "Are concerns resolved?",
      "Is support available?",
      "The second key",
      "Ownership must be clear",
      "Who accepts the risk?",
      "Who authorises release?",
      "Who owns recovery?",
      "The third key",
      "One key is missing",
      "Do not force release",
      "Document the gap",
      "Close the condition",
      "Recheck the evidence",
      "All keys align",
      "The mechanism unlocks",
      "Record the decision",
      "Open the gate",
      "Continue monitoring",
      "Release is not completion",
      "The next learning cycle"
    ];

    scene(
      "O3f",
      body,
      (r,i,n) => {
        label(r,states[Math.min(i,29)]);

        const first = i>=7;
        const second = i>=12;
        const third = i>=17;
        const open = i>=26;

        const keyPositions = [
          first ? [-18,-130] : [0,0],
          second ? [0,-130] : [0,0],
          third ? [18,-130] : [0,0]
        ];

        keyPositions.forEach((p,j) => {
          move(
            r,`.m-key-${j}`,
            p[0],
            p[1],
            i%2 ? 1.03 : 1
          );
        });

        visible(
          r,".m-light",
          i>=18 && i<=22
        );

        visible(r,".m-choice",i>=23);

        visible(r,".m-record",i>=25);

        move(
          r,".m-gate",
          0,0,
          i>=24 ? .8 : 1,
          i>=24 ? 90 : 0
        );

        move(
          r,".m-left",
          open ? -54 : 0,
          0
        );

        move(
          r,".m-right",
          open ? 54 : 0,
          0
        );

        attr(
          r,".m-beam",
          "stroke-dashoffset",
          i>=24 ? 0 : 350
        );
      },
      "Three physical keys unlock a decision gate only after operational evidence, stakeholder readiness and ownership align"
    );
  }

  // ============================================================
  // SCENE O3g — THE KNOWLEDGE FORUM
  // ============================================================
  //
  // Original visual:
  // A circular knowledge forum.
  //
  // Different participants surround a shared operating model.
  // Observations travel inward as signals.
  // Verified improvements return outward.
  //
  // The forum creates a continuous learning cycle rather
  // than a final presentation or static lesson summary.
  //
  // Cinematic language:
  // Signal transmission, rotating discussion focus,
  // central model transformation, evidence circulation,
  // archival capture and continuous improvement.
  // ============================================================

  {
    const seats = [
      {x:170,y:80,c:C.navy,name:"SPONSOR"},
      {x:276,y:150,c:C.green,name:"EXPERT"},
      {x:236,y:286,c:C.orange,name:"STAFF"},
      {x:104,y:286,c:C.navy,name:"ANALYST"},
      {x:64,y:150,c:C.green,name:"GUEST"}
    ];

    const body = `
      ${T(170,23,"THE KNOWLEDGE FORUM",14,C.navy)}

      ${O(170,190,141,C.blue,'opacity=".25"')}

      ${O(170,190,104,"none",
        `stroke="${C.muted}" stroke-width="2"
         stroke-dasharray="5 7"` )}

      ${seats.map((s,j) => `
        <g class="q-person q-person-${j} motion">
          ${O(s.x,s.y,30,C.paper,
            `stroke="${s.c}" stroke-width="3"`)}
          ${person(s.x,s.y+8,s.c,.6)}
          ${T(
            s.x,
            s.y+(s.y<190?-39:44),
            s.name,
            10,
            s.c
          )}
        </g>
      `).join("")}

      ${seats.map((s,j) =>
        P(
          `M${s.x} ${s.y} L170 190`,
          s.c,
          2,
          `class="q-link q-link-${j}"`
        )
      ).join("")}

      <g class="q-centre motion">
        ${O(170,190,56,C.paper,
          `stroke="${C.navy}" stroke-width="3"`)}
        ${O(170,190,40,C.blue)}
        ${P("M145 194 H195 M170 169 V219",C.navy,3)}
        ${O(145,194,7,C.orange)}
        ${O(195,194,7,C.green)}
        ${O(170,169,7,C.navy)}
        ${O(170,219,7,C.green)}
      </g>

      <g class="q-signal motion" opacity="0">
        ${O(170,190,14,C.orange)}
        ${T(170,196,"!",17,C.paper)}
      </g>

      <g class="q-evidence fade" opacity="0">
        ${O(170,190,24,C.pale,
          `stroke="${C.green}" stroke-width="3"`)}
        ${tick(170,190,C.green,1)}
      </g>

      <g class="q-loop fade" opacity="0">
        ${P(
          "M75 190 A95 95 0 1 1 265 190",
          C.green,5
        )}
        ${P("M252 181 L265 190 L276 176",C.green,4)}
      </g>

      <g class="q-archive fade" opacity="0">
        ${R(91,340,158,34,C.paper,15,
          `stroke="${C.navy}" stroke-width="2"`)}
        ${T(170,362,"LEARNING RETAINED",11,C.navy)}
      </g>
    `;

    const states = [
      "The knowledge forum",
      "Return to the case",
      "The redesigned process",
      "People shape outcomes",
      "Bring different voices",
      "The sponsor's view",
      "The expert's view",
      "The staff experience",
      "Analytical evidence",
      "The guest journey",
      "Claims become questions",
      "Test the evidence",
      "Separate the causes",
      "Repair real defects",
      "Address personal stakes",
      "Choose the intervention",
      "Allocate ownership",
      "Monitor the transition",
      "Observe actual adoption",
      "Feedback returns",
      "The process changes",
      "Record the learning",
      "Share the evidence",
      "Revisit the stakeholders",
      "Avoid static assumptions",
      "Learn after release",
      "A continuous cycle",
      "Capability accumulates",
      "The next improvement",
      "Carry learning forward"
    ];

    const focus = [
      0,0,0,0,0,0,1,2,3,4,
      4,3,3,1,2,1,0,3,2,4,
      1,3,0,2,2,4,0,1,3,4
    ];

    scene(
      "O3g",
      body,
      (r,i,n) => {
        label(r,states[Math.min(i,29)]);

        const selected = focus[Math.min(i,29)];

        seats.forEach((s,j) => {
          const active = j===selected;

          style(r,`.q-person-${j}`,{
            opacity:active ? "1" : ".35",
            transform:
              `scale(${active ? 1.12 : .9})`
          });

          attr(
            r,`.q-link-${j}`,
            "stroke-dashoffset",
            active ? 0 : 280
          );
        });

        visible(
          r,".q-signal",
          i>=10 && i<=15
        );

        visible(
          r,".q-evidence",
          (i>=16 && i<=18) ||
          i>=25
        );

        visible(r,".q-loop",i>=19);

        visible(r,".q-archive",i>=21);

        move(
          r,".q-centre",
          0,0,
          i%2 ? 1.04 : 1,
          i>=19 ? (i-19)*7 : 0
        );

        move(
          r,".q-signal",
          i%2 ? 5 : -5,
          i%2 ? -4 : 4
        );

        move(
          r,".q-evidence",
          0,
          i%2 ? -4 : 4,
          i>=26 ? 1.15 : 1
        );
      },
      "A circular knowledge forum converts stakeholder observations into verified improvements and retained organisational learning"
    );
  }

  // ============================================================
  // REGISTRY COMPLETENESS
  // ============================================================

  const W04_IDS = [
    "O1a",
    "O1b",
    "O2a",
    "O2b",
    "O2c",
    "O3a",
    "O3b",
    "O3c",
    "O3d",
    "O3e",
    "O3f",
    "O3g"
  ];

  // Diagnostic only. No console noise during normal playback.
  // All registered scenes expose build, step and reset.

  window.VL_W04_SCENE_IDS = W04_IDS.slice();

  window.VL_W04_SCENES_READY = W04_IDS.every(id => {
    const s = REG[id];

    return !!(
      s &&
      typeof s.build === "function" &&
      typeof s.step === "function" &&
      typeof s.reset === "function"
    );
  });

  if (!window.VL_W04_SCENES_READY) {
    console.warn(
      "[VoiceLearn W04] Scene registration incomplete."
    );
  }

})();
