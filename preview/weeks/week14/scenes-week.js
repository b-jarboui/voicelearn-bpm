// FILE: weeks/week14/scenes-week.js
// OPER621 | Week 14 | Sustainable Performance
// Cinematic scenes: twelve original section-specific visual worlds.
// Source: Week 14 course.js; visual direction: Week 10 scenes.
//
// CONCATENATION CONTRACT
// Join PART 1 + PART 2 + PART 3 directly, without extra wrappers.
//
// SCENE CONTRACT
// window.VL_SCENES[secId] = {
//   build(el),
//   step(i, n),
//   reset()
// };
//
// Design principles:
// - One original physical or conceptual world per section.
// - No generic text cards or repeated diagram templates.
// - Every narration index produces a visible state change.
// - Deterministic, seek-safe, reversible scene state.
// - Responsive SVG geometry, including 375px phones.
// - No narration sentences rendered inside the scene.
// - Short labels only.
// - Week 10's restrained navy, terracotta, green and paper.
// - Look-compatible CSS custom properties.
// - GSAP enhancement where available.
// - Reduced-motion accessibility.
// - No invented Qasr observations or outcomes.

(() => {
  "use strict";

  window.VL_SCENES = window.VL_SCENES || {};

  const NS = "http://www.w3.org/2000/svg";

  const C = {
    navy: "#1f4e79",
    orange: "#c0502a",
    green: "#317c61",
    paper: "#fbf8f1",
    ink: "#1b2a3a",
    blue: "#dbe7f2",
    pale: "#edf3f6",
    muted: "#9bb5c8",
    gold: "#d7a65a",
    white: "#ffffff"
  };

  const clamp = (v, a, b) =>
    Math.max(a, Math.min(b, Number.isFinite(v) ? v : a));

  const finite = (v, fallback = 0) => {
    const x = Number(v);
    return Number.isFinite(x) ? x : fallback;
  };

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

  const S = (tag, attributes = {}, content = "") => {
    const attrs = Object.entries(attributes)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => ` ${key}="${esc(value)}"`)
      .join("");

    return `<${tag}${attrs}>${content}</${tag}>`;
  };

  const circle = (x, y, r, fill, extra = {}) =>
    S("circle", { cx:x, cy:y, r, fill, ...extra });

  const rect = (x, y, w, h, fill, rx = 0, extra = {}) =>
    S("rect", {
      x, y, width:w, height:h, rx, fill, ...extra
    });

  const path = (d, stroke, width = 2, extra = {}) =>
    S("path", {
      d, fill:"none", stroke,
      "stroke-width":width,
      "stroke-linecap":"round",
      "stroke-linejoin":"round",
      ...extra
    });

  const line = (x1, y1, x2, y2, stroke, width = 2, extra = {}) =>
    S("line", {
      x1, y1, x2, y2, stroke,
      "stroke-width":width,
      "stroke-linecap":"round",
      ...extra
    });

  const txt = (
    x, y, value, size = 12,
    fill = C.ink, extra = {}
  ) => S("text", {
    x, y,
    "text-anchor":"middle",
    "font-size":size,
    fill,
    ...extra
  }, esc(value));

  const group = (content, cls = "", extra = {}) =>
    S("g", { class:cls, ...extra }, content);

  const svg = (content, label = "Animated BPM scene") =>
    `<svg class="vls-w14-art"
      xmlns="${NS}"
      viewBox="0 0 340 390"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="${esc(label)}">
      ${content}
    </svg>`;

  const $ = (root, selector) =>
    root ? root.querySelector(selector) : null;

  const $$ = (root, selector) =>
    root ? [...root.querySelectorAll(selector)] : [];

  const opacity = (root, selector, value) => {
    $$(root, selector).forEach(node => {
      node.style.opacity = String(value);
    });
  };

  const transform = (root, selector, value) => {
    $$(root, selector).forEach(node => {
      node.style.transform = value;
    });
  };

  const attribute = (root, selector, key, value) => {
    $$(root, selector).forEach(node => {
      node.setAttribute(key, String(value));
    });
  };

  const label = (root, selector, value) => {
    const node = $(root, selector);
    if (node) node.textContent = value;
  };

  const visible = (root, selector, yes) =>
    opacity(root, selector, yes ? 1 : 0);

  const setProgress = (root, i, n) => {
    const bar = $(root, ".vls-w14-progress");
    if (!bar) return;
    const total = Math.max(1, Math.floor(finite(n, 1)));
    const index = clamp(Math.floor(finite(i)), 0, total - 1);
    bar.style.width = `${((index + 1) / total) * 100}%`;
  };

  const sequence = (i, n, count) => {
    const total = Math.max(1, Math.floor(finite(n, 1)));
    const index = clamp(Math.floor(finite(i)), 0, total - 1);
    return clamp(
      Math.floor(index * count / total),
      0,
      count - 1
    );
  };

  const person = (x, y, color = C.navy, scale = 1) =>
    group(
      circle(0, -12, 9, color) +
      S("path", {
        d:"M-15 17 Q-15 -2 0 -2 Q15 -2 15 17Z",
        fill:color
      }),
      "",
      { transform:`translate(${x} ${y}) scale(${scale})` }
    );

  const check = (x, y, color = C.green, scale = 1) =>
    group(
      path("M-12 0 L-3 9 L15 -12", color, 5),
      "",
      { transform:`translate(${x} ${y}) scale(${scale})` }
    );

  const arrow = (x1, y1, x2, y2, color = C.navy) => {
    const a = Math.atan2(y2-y1, x2-x1);
    const p1x = x2-10*Math.cos(a-.55);
    const p1y = y2-10*Math.sin(a-.55);
    const p2x = x2-10*Math.cos(a+.55);
    const p2y = y2-10*Math.sin(a+.55);

    return path(`M${x1} ${y1} L${x2} ${y2}`,color,3) +
      path(
        `M${p1x} ${p1y} L${x2} ${y2} L${p2x} ${p2y}`,
        color,3
      );
  };

  // ------------------------------------------------------------
  // ONE SHARED STYLESHEET
  // ------------------------------------------------------------

  function installCSS() {
    if (document.getElementById("vl-sc-w14")) return;

    const style = document.createElement("style");
    style.id = "vl-sc-w14";

    style.textContent = `
      [class*="vls-w14-W14O"] {
        --w14-navy: var(--vl-sc-navy, #1f4e79);
        --w14-orange: var(--vl-sc-orange, #c0502a);
        --w14-green: var(--vl-sc-green, #317c61);
        --w14-paper: var(--vl-sc-paper, #fbf8f1);
        --w14-ink: var(--vl-sc-ink, #1b2a3a);
        --w14-blue: var(--vl-sc-blue, #dbe7f2);
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 0;
        overflow: hidden;
        isolation: isolate;
        box-sizing: border-box;
        font-family: inherit;
        color: var(--w14-ink);
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      [class*="vls-w14-W14O"] *,
      [class*="vls-w14-W14O"] *::before,
      [class*="vls-w14-W14O"] *::after {
        box-sizing: border-box;
      }

      [class*="vls-w14-W14O"] .vls-w14-art {
        display: block;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        overflow: hidden;
        flex: 1 1 auto;
      }

      [class*="vls-w14-W14O"] svg text {
        font-family: inherit;
        font-weight: 700;
        letter-spacing: .15px;
        pointer-events: none;
      }

      [class*="vls-w14-W14O"] .vls-w14-top {
        position: absolute;
        top: 2%;
        left: 5%;
        right: 5%;
        z-index: 2;
        text-align: center;
        font-size: clamp(9px, 2.8vw, 12px);
        font-weight: 800;
        letter-spacing: .105em;
        color: var(--w14-navy);
        pointer-events: none;
      }

      [class*="vls-w14-W14O"] .vls-w14-bottom {
        position: absolute;
        bottom: 2.5%;
        left: 5%;
        right: 5%;
        z-index: 2;
        min-height: 18px;
        text-align: center;
        font-size: clamp(10px, 3vw, 13px);
        font-weight: 750;
        color: var(--w14-navy);
        pointer-events: none;
      }

      [class*="vls-w14-W14O"] .vls-w14-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        width: 0;
        background: var(--w14-orange);
        transition: width .55s ease;
      }

      [class*="vls-w14-W14O"] .vls-w14-moving {
        transition:
          transform .85s cubic-bezier(.2,.75,.2,1),
          opacity .65s ease,
          fill .65s ease,
          stroke .65s ease,
          stroke-dashoffset .85s ease;
        transform-box: fill-box;
        transform-origin: center;
      }

      [class*="vls-w14-W14O"] .vls-w14-draw {
        stroke-dasharray: 500;
        stroke-dashoffset: 500;
        transition: stroke-dashoffset .85s ease;
      }

      [class*="vls-w14-W14O"] .vls-w14-glow {
        filter: drop-shadow(0 4px 7px rgba(31,78,121,.16));
      }

      [class*="vls-w14-W14O"] .vls-w14-pulse {
        animation: vlsW14Pulse 2.6s ease-in-out infinite;
      }

      [class*="vls-w14-W14O"] .vls-w14-spin {
        animation: vlsW14Spin 15s linear infinite;
        transform-box: fill-box;
        transform-origin: center;
      }

      [class*="vls-w14-W14O"] .vls-w14-flow {
        stroke-dasharray: 8 8;
        animation: vlsW14Flow 1.8s linear infinite;
      }

      [class*="vls-w14-W14O"] .vls-w14-scan {
        animation: vlsW14Scan 3s ease-in-out infinite alternate;
      }

      [class*="vls-w14-W14O"] .vls-w14-instant *,
      [class*="vls-w14-W14O"].vls-w14-instant * {
        animation: none !important;
        transition: none !important;
      }

      @keyframes vlsW14Pulse {
        0%,100% { opacity:.35; }
        50% { opacity:1; }
      }

      @keyframes vlsW14Spin {
        from { transform:rotate(0deg); }
        to { transform:rotate(360deg); }
      }

      @keyframes vlsW14Flow {
        from { stroke-dashoffset:0; }
        to { stroke-dashoffset:-32; }
      }

      @keyframes vlsW14Scan {
        from { transform:translateY(-28px); }
        to { transform:translateY(28px); }
      }

      /* W14O1a: the programme-to-operations bridge */
      .vls-w14-W14O1a .a-project,
      .vls-w14-W14O1a .a-operations {
        transform-origin: center;
      }

      .vls-w14-W14O1a .a-bridge {
        stroke-dasharray: 310;
        stroke-dashoffset: 310;
        transition: stroke-dashoffset 1s ease;
      }

      .vls-w14-W14O1a .a-token {
        transition: transform 1s cubic-bezier(.2,.8,.2,1);
      }

      /* W14O2a: a process eroded by accumulating forces */
      .vls-w14-W14O2a .b-erosion {
        transition: transform .95s ease, opacity .7s ease;
      }

      .vls-w14-W14O2a .b-crack {
        stroke-dasharray: 120;
        stroke-dashoffset: 120;
        transition: stroke-dashoffset .8s ease;
      }

      /* W14O2b: converging local decisions */
      .vls-w14-W14O2b .c-conveyor {
        transition: transform .9s ease;
      }

      .vls-w14-W14O2b .c-station {
        transition: opacity .7s ease, transform .9s ease;
      }

      /* W14O2c: the unread measure */
      .vls-w14-W14O2c .d-page {
        transition: transform .9s ease, opacity .7s ease;
      }

      .vls-w14-W14O2c .d-eye {
        transition: opacity .7s ease, transform .8s ease;
      }

      @media (max-width: 380px) {
        [class*="vls-w14-W14O"] .vls-w14-top {
          font-size: 10px;
        }

        [class*="vls-w14-W14O"] .vls-w14-bottom {
          font-size: 11px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        [class*="vls-w14-W14O"] *,
        [class*="vls-w14-W14O"] *::before,
        [class*="vls-w14-W14O"] *::after {
          animation: none !important;
          transition: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  // ------------------------------------------------------------
  // SCENE LIFECYCLE
  // ------------------------------------------------------------

  function createScene(id, title, markup, render) {
    let root = null;
    let current = -1;
    let animation = null;

    const gsap = () =>
      window.gsap &&
      typeof window.gsap.to === "function"
        ? window.gsap
        : null;

    function stopAnimation() {
      if (animation && typeof animation.kill === "function") {
        animation.kill();
      }
      animation = null;
    }

    function apply(index, total, instant = false) {
      if (!root) return;

      stopAnimation();

      const n = Math.max(1, Math.floor(finite(total, 1)));
      const i = clamp(Math.floor(finite(index)), 0, n-1);
      const previous = current;

      root.classList.toggle(
        "vls-w14-instant",
        instant || reduced()
      );

      render(root, i, n, previous);
      setProgress(root, i, n);

      // A small cinematic camera breath on every narration moment.
      // It is subordinate to the section's own visual animation.
      const art = $(root, ".vls-w14-art");
      const g = gsap();

      if (art && !instant && !reduced() && g) {
        const direction = i % 2 ? 1 : -1;
        animation = g.fromTo(
          art,
          {
            scale: 1.012,
            x: -direction * 1.5
          },
          {
            scale: 1,
            x: 0,
            duration: .68,
            ease: "power2.out",
            overwrite: true
          }
        );
      }

      current = i;
    }

    return {
      build(el) {
        if (!el || typeof el.replaceChildren !== "function") {
          return;
        }

        installCSS();
        stopAnimation();

        const node = document.createElement("div");
        node.className = `vls-w14-${id}`;

        node.innerHTML =
          `<div class="vls-w14-top">${esc(title)}</div>` +
          svg(markup, title) +
          `<div class="vls-w14-bottom">
             <span class="vls-w14-status"></span>
           </div>` +
          `<div class="vls-w14-progress"></div>`;

        el.replaceChildren(node);

        root = node;
        current = -1;
        apply(0, 1, true);
      },

      step(i, n) {
        if (!root) return;
        apply(i, n, false);
      },

      reset() {
        if (!root) return;
        current = -1;
        apply(0, 1, true);
      }
    };
  }

  // ------------------------------------------------------------
  // SCENE 1 | W14O1a
  // THE BRIDGE THAT MUST NOT END
  //
  // A completed BPM project sits on one riverbank.
  // Ordinary operations occupy the other.
  // A physical bridge is assembled while a performance
  // token travels from temporary programme supervision
  // into permanent ownership.
  //
  // Distinctive visual:
  // Architecture, river, moving token, bridge, owner,
  // operational wheel and a returning feedback route.
  // ------------------------------------------------------------

  {
    const bridge = group(
      path("M48 236 Q170 199 292 236", C.navy, 8) +
      path("M48 252 Q170 215 292 252", C.muted, 3) +
      Array.from({length:9}, (_,j) => {
        const x = 62+j*27;
        const y = 234-34*Math.sin((x-48)/244*Math.PI);
        return line(x,y,x,y+22,C.navy,2);
      }).join(""),
      "a-bridge"
    );

    const markup = `
      <defs>
        <linearGradient id="w14a-water" x1="0" y1="0"
          x2="0" y2="1">
          <stop stop-color="#dbe7f2" stop-opacity=".7"/>
          <stop offset="1" stop-color="#fbf8f1"/>
        </linearGradient>
      </defs>

      ${txt(170,42,"FROM PROJECT TO PRACTICE",13,C.navy)}

      ${rect(15,266,310,77,"url(#w14a-water)",9)}

      ${Array.from({length:5},(_,j) =>
        path(
          `M20 ${278+j*13} Q75 ${269+j*13}
           130 ${278+j*13} T240 ${278+j*13}
           T320 ${278+j*13}`,
          C.muted,1,
          {opacity:.35}
        )
      ).join("")}

      ${group(
        rect(22,131,100,111,C.pale,8,{
          stroke:C.navy,"stroke-width":2
        }) +
        rect(36,107,72,29,C.navy,5) +
        txt(72,126,"PROJECT",12,C.white) +
        rect(42,156,60,12,C.muted,3) +
        rect(42,177,60,12,C.muted,3) +
        rect(42,198,60,12,C.muted,3) +
        check(94,225,C.green,.65),
        "a-project vls-w14-moving"
      )}

      ${group(
        rect(218,121,100,121,C.pale,8,{
          stroke:C.green,"stroke-width":2
        }) +
        rect(230,97,76,29,C.green,5) +
        txt(268,116,"OPERATIONS",11,C.white) +
        rect(235,151,65,10,C.muted,3) +
        rect(235,170,65,10,C.muted,3) +
        rect(235,189,65,10,C.muted,3) +
        circle(269,218,13,C.green),
        "a-operations vls-w14-moving"
      )}

      ${group(bridge,"a-bridge-wrap")}

      ${group(
        circle(65,226,16,C.orange) +
        check(65,226,C.white,.55),
        "a-token vls-w14-moving"
      )}

      ${group(
        person(268,88,C.green,.75) +
        circle(268,88,29,"none",{
          stroke:C.green,
          "stroke-width":2,
          "stroke-dasharray":"4 5"
        }),
        "a-owner vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        path("M285 266 Q170 340 57 266",C.green,3,{
          "stroke-dasharray":"6 7"
        }) +
        path("M57 266 L69 259 M57 266 L67 275",C.green,3),
        "a-return vls-w14-moving",
        {opacity:0}
      )}

      ${txt(72,360,"DELIVER",12,C.navy)}
      ${txt(268,360,"SUSTAIN",12,C.green)}
    `;

    const statuses = [
      "A project concludes",
      "The benefit crosses",
      "Ownership continues",
      "Review becomes routine",
      "The cycle stays alive",
      "Improvement returns"
    ];

    function render(r,i,n) {
      const b = sequence(i,n,6);

      attribute(
        r,".a-bridge","stroke-dashoffset",
        b >= 1 ? 0 : 310
      );

      const positions = [
        [0,0],[65,-15],[125,-24],
        [187,-15],[203,-15],[203,-15]
      ];

      const p = positions[b];

      transform(
        r,".a-token",
        `translate(${p[0]}px,${p[1]}px)
         rotate(${b*18}deg)`
      );

      visible(r,".a-owner",b>=2);
      visible(r,".a-return",b>=4);

      transform(
        r,".a-project",
        `translateY(${b>=3?7:0}px)
         scale(${b>=3?.95:1})`
      );

      transform(
        r,".a-operations",
        `scale(${b>=3?1.045:1})`
      );

      // Per-moment microblocking, independent of broad story beat.
      transform(
        r,".a-owner",
        `translateY(${Math.sin(i*.85)*4}px)
         rotate(${(i%3-1)*3}deg)`
      );

      label(r,".vls-w14-status",statuses[b]);
    }

    window.VL_SCENES.W14O1a = createScene(
      "W14O1a",
      "THE BRIDGE BEYOND THE PROJECT",
      markup,
      render
    );
  }

  // ------------------------------------------------------------
  // SCENE 2 | W14O2a
  // THE ERODING PROCESS FOUNDATION
  //
  // A once-solid engineered platform supports the guest
  // arrival journey. Five different forces gradually weaken
  // its foundation: ownership, measurement, local changes,
  // informal retraining and organisational change.
  //
  // Distinctive visual:
  // A cross-sectional physical structure that cracks,
  // tilts and is eventually inspected.
  //
  // The five forces are teaching mechanisms, not five
  // additional findings about Qasr.
  // ------------------------------------------------------------

  {
    const forces = [
      {x:48,y:112,c:C.orange,name:"OWNER"},
      {x:109,y:87,c:C.navy,name:"MEASURES"},
      {x:170,y:76,c:C.orange,name:"CHANGES"},
      {x:231,y:87,c:C.green,name:"TRAINING"},
      {x:292,y:112,c:C.navy,name:"CONTEXT"}
    ];

    const markup = `
      ${txt(170,38,"HOW A GAIN ERODES",13,C.navy)}

      ${group(
        rect(37,178,266,29,C.navy,5) +
        rect(48,207,244,82,C.blue,4) +
        rect(56,218,228,60,C.pale,3),
        "b-foundation vls-w14-moving"
      )}

      ${group(
        rect(54,146,232,31,C.green,5) +
        path("M58 145 H282",C.navy,2),
        "b-surface vls-w14-moving"
      )}

      ${group(
        rect(70,113,44,31,C.paper,5,{
          stroke:C.navy,"stroke-width":2
        }) +
        rect(126,104,44,40,C.paper,5,{
          stroke:C.navy,"stroke-width":2
        }) +
        rect(182,113,44,31,C.paper,5,{
          stroke:C.navy,"stroke-width":2
        }) +
        rect(238,104,31,40,C.paper,5,{
          stroke:C.navy,"stroke-width":2
        }),
        "b-arrival vls-w14-moving"
      )}

      ${forces.map((f,j) =>
        group(
          circle(f.x,f.y,18,C.paper,{
            stroke:f.c,"stroke-width":2
          }) +
          txt(f.x,f.y+5,String(j+1),15,f.c) +
          txt(f.x,f.y-27,f.name,9,f.c),
          `b-force-${j} b-erosion`,
          {opacity:.2}
        )
      ).join("")}

      ${Array.from({length:5},(_,j) => {
        const x=70+j*43;
        return path(
          `M${x} 208 l-9 17 l12 12 l-9 17`,
          C.orange,3,{
            class:`b-crack b-crack-${j}`
          }
        );
      }).join("")}

      ${group(
        circle(170,238,47,C.paper,{
          stroke:C.orange,"stroke-width":3
        }) +
        path("M145 238 H195 M170 213 V263",C.orange,3) +
        txt(170,287,"SYSTEM REVIEW",11,C.orange),
        "b-lens vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        path("M40 314 Q170 333 300 314",C.orange,4) +
        circle(40,314,6,C.orange) +
        circle(300,314,6,C.orange),
        "b-drift vls-w14-moving",
        {opacity:0}
      )}

      ${txt(170,365,"SMALL SHIFTS · LARGE EFFECT",12,C.navy)}
    `;

    const statuses = [
      "The improvement holds",
      "Ownership weakens",
      "Measures lose attention",
      "Local changes accumulate",
      "Practices gradually shift",
      "The design stops fitting",
      "Diagnose the system"
    ];

    function render(r,i,n) {
      const b = sequence(i,n,7);

      for(let j=0;j<5;j++) {
        const on = b>=j+1;

        opacity(r,`.b-force-${j}`,on?1:.2);

        transform(
          r,`.b-force-${j}`,
          `translateY(${on?12+Math.sin(i+j)*3:-12}px)
           rotate(${on?(j%2?8:-8):0}deg)`
        );

        attribute(
          r,`.b-crack-${j}`,
          "stroke-dashoffset",
          on?0:120
        );
      }

      transform(
        r,".b-surface",
        `translateY(${b>=3?b*3:0}px)
         rotate(${b>=4?(b-3)*1.7:0}deg)`
      );

      transform(
        r,".b-arrival",
        `translateY(${b>=4?b*2:0}px)
         rotate(${b>=4?3:0}deg)`
      );

      visible(r,".b-drift",b>=3);
      visible(r,".b-lens",b===6);

      transform(
        r,".b-lens",
        `translate(${Math.sin(i*.8)*6}px,
                    ${Math.cos(i*.7)*4}px)
         scale(${b===6?1:.7})`
      );

      label(r,".vls-w14-status",statuses[b]);
    }

    window.VL_SCENES.W14O2a = createScene(
      "W14O2a",
      "THE EROSION BENEATH THE PROCESS",
      markup,
      render
    );
  }

  // ------------------------------------------------------------
  // SCENE 3 | W14O2b
  // FOUR REASONABLE DECISIONS, ONE LONGER JOURNEY
  //
  // A physical arrival conveyor runs through four
  // individually justified operating stations.
  // Each station adds a visible activity.
  // The cumulative journey lengthens.
  //
  // This scene does not allocate minutes to individual
  // changes: the source establishes only the combined
  // 13-minute contribution.
  //
  // Distinctive visual:
  // An expanding process conveyor with four physical
  // interventions and a travelling guest token.
  // ------------------------------------------------------------

  {
    const stations = [
      {x:58,c:C.navy,tag:"PASSPORT"},
      {x:132,c:C.orange,tag:"WAIVER"},
      {x:206,c:C.green,tag:"LOYALTY"},
      {x:280,c:C.navy,tag:"DESK"}
    ];

    const markup = `
      ${txt(170,37,"REASONABLE PARTS · SLOWER WHOLE",12,C.navy)}

      ${group(
        rect(22,184,296,46,C.blue,22,{
          stroke:C.navy,"stroke-width":2
        }) +
        path("M34 207 H306",C.navy,3,{
          "stroke-dasharray":"8 8"
        }) +
        Array.from({length:10},(_,j) =>
          circle(43+j*28,231,6,C.navy)
        ).join(""),
        "c-conveyor vls-w14-moving"
      )}

      ${stations.map((s,j) => {
        const physical = [
          rect(-21,-34,42,37,C.paper,5,{
            stroke:s.c,"stroke-width":2
          }) +
          rect(-13,-25,26,5,s.c,2) +
          rect(-13,-14,20,4,C.muted,2),

          rect(-24,-28,48,29,C.paper,5,{
            stroke:s.c,"stroke-width":2
          }) +
          txt(0,-9,"AED",12,s.c) +
          line(-17,5,17,5,s.c,3),

          rect(-23,-29,46,34,C.paper,5,{
            stroke:s.c,"stroke-width":2
          }) +
          circle(0,-13,9,s.c) +
          check(0,-13,C.white,.35),

          rect(-26,-8,52,13,s.c,3) +
          rect(-22,5,44,25,C.navy,3) +
          person(0,-24,s.c,.65)
        ][j];

        return group(
          physical +
          txt(0,-48,s.tag,10,s.c),
          `c-station c-station-${j} vls-w14-moving`,
          {
            transform:`translate(${s.x} 171)`,
            opacity:.25
          }
        );
      }).join("")}

      ${group(
        circle(32,207,14,C.orange) +
        circle(32,207,6,C.paper),
        "c-guest vls-w14-moving"
      )}

      ${group(
        rect(73,278,194,61,C.paper,12,{
          stroke:C.orange,"stroke-width":2
        }) +
        txt(170,302,"13 OF 15 MINUTES",17,C.orange) +
        txt(170,324,"COMBINED EFFECT",11,C.navy),
        "c-result vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        path("M32 256 Q170 282 308 256",C.orange,3) +
        path("M297 248 L308 256 L296 263",C.orange,3),
        "c-accumulation vls-w14-moving",
        {opacity:0}
      )}

      ${txt(170,365,"THE GUEST EXPERIENCES THE WHOLE",11,C.navy)}
    `;

    const statuses = [
      "The original journey",
      "A compliance requirement",
      "Financial discretion changes",
      "An enrolment prompt",
      "A local desk variation",
      "Effects accumulate",
      "Examine the complete journey"
    ];

    function render(r,i,n) {
      const b=sequence(i,n,7);

      stations.forEach((_,j) => {
        const node=$(r,`.c-station-${j}`);
        if(!node)return;

        const active=b>=j+1;

        node.style.opacity=active?"1":".2";

        // Preserve the SVG's base transform.
        node.setAttribute(
          "transform",
          `translate(${stations[j].x} ${
            active?171+Math.sin(i*.7+j)*3:148
          })`
        );
      });

      const positions=[32,62,130,205,278,301,301];

      transform(
        r,".c-guest",
        `translateX(${positions[b]-32+
          Math.sin(i*.9)*2}px)
         rotate(${i*14}deg)`
      );

      visible(r,".c-accumulation",b>=4);
      visible(r,".c-result",b>=5);

      transform(
        r,".c-result",
        `translateY(${b>=5?0:18}px)
         scale(${b===6?1.04:1})`
      );

      transform(
        r,".c-conveyor",
        `translateX(${Math.sin(i*.75)*2}px)`
      );

      label(r,".vls-w14-status",statuses[b]);
    }

    window.VL_SCENES.W14O2b=createScene(
      "W14O2b",
      "FOUR DECISIONS · ONE GUEST JOURNEY",
      markup,
      render
    );
  }

  // ------------------------------------------------------------
  // SCENE 4 | W14O2c
  // THE MEASURE NOBODY READS
  //
  // A monthly operations pack is physically assembled.
  // The arrival measure appears on page four.
  // Pages turn, the measure deteriorates, but the
  // management chair remains empty.
  //
  // Eventually a review lens and decision mechanism
  // reconnect information with management action.
  //
  // Distinctive visual:
  // Editorial paper choreography, page turning,
  // changing performance trace, empty chair,
  // magnification and activated review.
  // ------------------------------------------------------------

  {
    const page = (x,y,index) =>
      group(
        rect(x,y,178,228,C.paper,7,{
          stroke:C.muted,
          "stroke-width":1.5
        }) +
        rect(x+17,y+18,144,9,C.blue,3) +
        Array.from({length:5},(_,j) =>
          rect(x+17,y+42+j*21,130-j*8,5,C.muted,2,{
            opacity:.45
          })
        ).join("") +
        txt(x+145,y+211,String(index),14,C.navy),
        `d-page d-page-${index} vls-w14-moving`
      );

    const markup=`
      ${txt(170,36,"THE MEASURE NOBODY READS",13,C.navy)}

      ${group(
        rect(49,85,242,266,C.blue,12,{
          opacity:.35
        }),
        "d-desk"
      )}

      ${page(73,94,1)}
      ${page(80,88,2)}
      ${page(87,82,3)}
      ${page(94,76,4)}

      ${group(
        rect(111,173,144,86,C.paper,6,{
          stroke:C.navy,"stroke-width":1.5
        }) +
        path(
          "M126 232 L150 224 L176 212 L201 194 L237 179",
          C.orange,4
        ) +
        circle(126,232,5,C.green) +
        circle(237,179,5,C.orange) +
        txt(181,251,"ARRIVAL TIME",10,C.navy),
        "d-measure vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        circle(170,173,57,"none",{
          stroke:C.orange,
          "stroke-width":5
        }) +
        path("M208 215 L252 261",C.orange,12) +
        circle(170,173,45,C.paper,{
          "fill-opacity":.13
        }),
        "d-eye vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        rect(27,277,54,10,C.navy,4) +
        rect(34,287,40,33,C.navy,4) +
        line(42,320,35,340,C.navy,5) +
        line(67,320,74,340,C.navy,5) +
        circle(54,267,12,C.orange),
        "d-chair vls-w14-moving",
        {opacity:.28}
      )}

      ${group(
        rect(236,283,71,39,C.green,9) +
        check(271,301,C.white,.8),
        "d-action vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        path("M92 340 H246",C.green,4,{
          "stroke-dasharray":"7 7"
        }),
        "d-link vls-w14-moving",
        {opacity:0}
      )}

      ${txt(170,370,"REPORTING IS NOT MANAGING",12,C.navy)}
    `;

    const statuses=[
      "The report is produced",
      "Pages keep arriving",
      "The fourth page",
      "Performance deteriorates",
      "Management review is absent",
      "Read the evidence",
      "Connect review to action"
    ];

    function render(r,i,n) {
      const b=sequence(i,n,7);

      for(let j=1;j<=4;j++) {
        transform(
          r,`.d-page-${j}`,
          `translate(${b>=j?-(j*5):0}px,
                      ${b>=j?j*4:0}px)
           rotate(${b>=j?-j*2:0}deg)`
        );
      }

      visible(r,".d-measure",b>=3);
      visible(r,".d-eye",b>=5);
      visible(r,".d-action",b===6);
      visible(r,".d-link",b===6);

      opacity(
        r,".d-chair",
        b===4?.18:b>=5?1:.28
      );

      transform(
        r,".d-eye",
        `translate(${Math.sin(i*.85)*8}px,
                    ${Math.cos(i*.85)*5}px)
         scale(${b>=5?1:.75})`
      );

      transform(
        r,".d-measure",
        `translateY(${b>=3?Math.sin(i*.65)*3:10}px)`
      );

      label(r,".vls-w14-status",statuses[b]);
    }

    window.VL_SCENES.W14O2c=createScene(
      "W14O2c",
      "PAGE FOUR · THE UNREAD SIGNAL",
      markup,
      render
    );
  }

  // END PART 1 OF 3
  // ============================================================
  // Continue immediately after PART 1.
  //
  // SCENES:
  // W14O1b — The four-signal lighthouse
  // W14O1c — The calibrated trigger mechanism
  // W14O3a — The living sustaining flywheel
  // W14O3b — The four-route governance junction
  //
  // the IIFE opened in PART 1.
  // ============================================================

  // ------------------------------------------------------------
  // SCENE 5 | W14O1b
  // THE FOUR-SIGNAL LIGHTHOUSE
  //
  // A coastal lighthouse protects a completed improvement.
  // Four different instruments reveal distinct threats:
  // arrival time, kiosk adoption, exceptions and variants.
  //
  // Unlike a conventional dashboard, these signals are
  // embodied in a rotating lighthouse, a rising waterline,
  // a shrinking adoption stream, an exception buoy and
  // an architectural branch.
  //
  // Documented Qasr values:
  // Arrival: 24 -> 28 -> 39 minutes.
  // Adoption: 65% -> 61% -> 48%.
  //
  // Exception and variant visuals represent monitoring
  // concepts, not measured Qasr observations.
  // ------------------------------------------------------------

  {
    const markup = `
      <defs>
        <linearGradient id="w14e-sea" x1="0" y1="0"
          x2="0" y2="1">
          <stop stop-color="#dbe7f2" stop-opacity=".45"/>
          <stop offset="1" stop-color="#1f4e79"
            stop-opacity=".22"/>
        </linearGradient>
        <linearGradient id="w14e-light" x1="0" y1="0"
          x2="1" y2="0">
          <stop stop-color="#f3d59c" stop-opacity="0"/>
          <stop offset=".65" stop-color="#f3d59c"
            stop-opacity=".35"/>
          <stop offset="1" stop-color="#f3d59c"
            stop-opacity="0"/>
        </linearGradient>
      </defs>

      ${txt(170,36,"FOUR SIGNALS · ONE PROCESS",12,C.navy)}

      ${rect(12,279,316,68,"url(#w14e-sea)",8)}

      ${group(
        path(
          "M12 291 Q48 279 84 291 T156 291 T228 291 T328 291",
          C.navy,2
        ) +
        path(
          "M12 311 Q48 299 84 311 T156 311 T228 311 T328 311",
          C.muted,2
        ),
        "e-waves vls-w14-moving"
      )}

      ${group(
        rect(138,112,64,170,C.paper,8,{
          stroke:C.navy,"stroke-width":3
        }) +
        rect(130,101,80,20,C.navy,4) +
        rect(146,84,48,18,C.orange,3) +
        rect(159,65,22,21,C.navy,3) +
        rect(164,125,12,117,C.blue,3) +
        rect(151,248,38,15,C.navy,4) +
        path("M131 282 H209",C.navy,5),
        "e-tower vls-w14-moving"
      )}

      ${group(
        S("path",{
          d:"M170 93 L38 48 L38 139 Z",
          fill:"url(#w14e-light)"
        }) +
        S("path",{
          d:"M170 93 L302 48 L302 139 Z",
          fill:"url(#w14e-light)"
        }),
        "e-beam vls-w14-moving"
      )}

      ${group(
        circle(170,92,13,C.gold) +
        circle(170,92,5,C.paper),
        "e-lamp vls-w14-pulse"
      )}

      ${group(
        circle(67,170,34,C.paper,{
          stroke:C.navy,"stroke-width":2.5
        }) +
        path("M48 183 L57 170 L66 177 L77 153 L87 160",
          C.orange,3) +
        txt(67,216,"ARRIVAL TIME",10,C.navy),
        "e-signal e-time vls-w14-moving",
        {opacity:.2}
      )}

      ${group(
        circle(273,170,34,C.paper,{
          stroke:C.green,"stroke-width":2.5
        }) +
        path("M252 157 H293",C.muted,3) +
        path("M252 169 H284",C.green,5) +
        path("M252 181 H273",C.orange,5) +
        txt(273,216,"KIOSK USE",10,C.green),
        "e-signal e-adoption vls-w14-moving",
        {opacity:.2}
      )}

      ${group(
        circle(62,287,17,C.orange) +
        circle(62,287,9,C.paper) +
        line(62,304,62,322,C.navy,3) +
        txt(62,342,"EXCEPTIONS",10,C.navy),
        "e-signal e-exception vls-w14-moving",
        {opacity:.2}
      )}

      ${group(
        path("M269 280 V246 L247 228",C.navy,5) +
        path("M269 246 L291 228",C.orange,5) +
        circle(247,228,7,C.green) +
        circle(291,228,7,C.orange) +
        txt(274,342,"VARIANTS",10,C.navy),
        "e-signal e-variant vls-w14-moving",
        {opacity:.2}
      )}

      ${group(
        rect(109,293,122,35,C.paper,12,{
          stroke:C.orange,"stroke-width":2
        }) +
        txt(170,315,"OWNER REVIEWS",12,C.orange),
        "e-review vls-w14-moving",
        {opacity:0}
      )}

      ${txt(170,371,"READ THE SIGNALS TOGETHER",11,C.navy)}
    `;

    const statuses = [
      "Protect the improvement",
      "Watch the whole journey",
      "Read adoption",
      "Investigate exceptions",
      "Identify variants",
      "Connect the evidence",
      "Owner reviews the signals"
    ];

    function render(r,i,n) {
      const b=sequence(i,n,7);

      const signalNames=[
        ".e-time",
        ".e-adoption",
        ".e-exception",
        ".e-variant"
      ];

      signalNames.forEach((selector,j)=>{
        const on=b>=j+1;

        opacity(r,selector,on?1:.18);

        transform(
          r,selector,
          `translateY(${on?Math.sin(i*.8+j)*3:12}px)
           scale(${on?1:.78})`
        );
      });

      transform(
        r,".e-beam",
        `rotate(${Math.sin(i*.47)*27+
          (b-3)*5}deg)`
      );

      transform(
        r,".e-waves",
        `translateX(${Math.sin(i*.8)*6}px)`
      );

      transform(
        r,".e-lamp",
        `scale(${1+Math.sin(i*.9)*.08})`
      );

      visible(r,".e-review",b>=5);

      transform(
        r,".e-review",
        `translateY(${b>=5?0:16}px)
         scale(${b===6?1.05:1})`
      );

      label(r,".vls-w14-status",statuses[b]);
    }

    window.VL_SCENES.W14O1b=createScene(
      "W14O1b",
      "THE FOUR-SIGNAL LIGHTHOUSE",
      markup,
      render
    );
  }

  // ------------------------------------------------------------
  // SCENE 6 | W14O1c
  // THE CALIBRATED TRIGGER MECHANISM
  //
  // A mechanical control instrument converts evidence
  // into a required management response.
  //
  // Its two principal gauges are:
  // Arrival: delivered 24, proposed boundary 26.4,
  // observed month 22 result 39 minutes.
  //
  // Adoption: delivered 65%, proposed boundary 60%,
  // observed month 22 result 48%.
  //
  // Two secondary mechanical gates represent exception
  // and variant triggers without inventing case values.
  //
  // Distinctive visual:
  // Industrial control chamber, rotating needles,
  // sliding threshold markers, opening gates,
  // warning lamps and a response lever.
  // ------------------------------------------------------------

  {
    const gauge=(cx,cy,r,title,value,color)=>`
      ${group(
        circle(cx,cy,r,C.paper,{
          stroke:C.navy,"stroke-width":3
        }) +
        circle(cx,cy,r-10,C.blue,{
          opacity:.55
        }) +
        S("path",{
          d:`M${cx-r+12} ${cy}
             A${r-12} ${r-12} 0 0 1
             ${cx+r-12} ${cy}`,
          fill:"none",
          stroke:C.muted,
          "stroke-width":6
        }) +
        line(cx,cy,cx,cy-r+18,color,5) +
        circle(cx,cy,8,C.navy) +
        txt(cx,cy+27,value,16,color) +
        txt(cx,cy+r+22,title,11,C.navy),
        `f-gauge f-${title.toLowerCase().replace(/\s/g,"-")}`
      )}
    `;

    const markup=`
      <defs>
        <linearGradient id="w14f-metal" x1="0" y1="0"
          x2="1" y2="1">
          <stop stop-color="#edf3f6"/>
          <stop offset=".5" stop-color="#fbf8f1"/>
          <stop offset="1" stop-color="#c8d8e5"/>
        </linearGradient>
      </defs>

      ${txt(170,34,"SET THE TRIGGER FIRST",13,C.navy)}

      ${rect(21,65,298,279,"url(#w14f-metal)",20,{
        stroke:C.navy,"stroke-width":3
      })}

      ${gauge(94,151,53,"ARRIVAL","24",C.orange)}
      ${gauge(246,151,53,"ADOPTION","65%",C.green)}

      ${group(
        path("M94 151 L94 111",C.orange,5),
        "f-arrival-needle vls-w14-moving"
      )}

      ${group(
        path("M246 151 L246 111",C.green,5),
        "f-adoption-needle vls-w14-moving"
      )}

      ${group(
        rect(46,235,112,37,C.paper,9,{
          stroke:C.orange,"stroke-width":2
        }) +
        txt(102,258,"26.4 MIN",13,C.orange),
        "f-arrival-boundary vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        rect(182,235,112,37,C.paper,9,{
          stroke:C.green,"stroke-width":2
        }) +
        txt(238,258,"60% USE",13,C.green),
        "f-adoption-boundary vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        circle(170,80,13,C.orange) +
        circle(170,80,6,C.paper),
        "f-alarm vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        rect(51,291,105,28,C.blue,8) +
        txt(103,310,"EXCEPTIONS",10,C.navy) +
        rect(184,291,105,28,C.blue,8) +
        txt(236,310,"VARIANTS",10,C.navy),
        "f-secondary vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        rect(125,325,90,35,C.green,12) +
        txt(170,348,"INVESTIGATE",12,C.white),
        "f-response vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        line(170,278,170,320,C.navy,5) +
        circle(170,278,12,C.orange),
        "f-lever vls-w14-moving",
        {opacity:0}
      )}

      ${txt(170,379,"A TRIGGER IS NOT A SOLUTION",11,C.navy)}
    `;

    const statuses=[
      "Calibrate the reference",
      "Set the arrival boundary",
      "Set the adoption boundary",
      "Detect deterioration",
      "Check other signals",
      "Assign the response",
      "Investigate before changing"
    ];

    function render(r,i,n) {
      const b=sequence(i,n,7);

      const arrivalAngle=[
        0,8,8,52,52,52,52
      ][b];

      const adoptionAngle=[
        0,0,-8,-49,-49,-49,-49
      ][b];

      transform(
        r,".f-arrival-needle",
        `rotate(${arrivalAngle+
          Math.sin(i*.7)*1.8}deg)`
      );

      transform(
        r,".f-adoption-needle",
        `rotate(${adoptionAngle+
          Math.cos(i*.7)*1.8}deg)`
      );

      visible(r,".f-arrival-boundary",b>=1);
      visible(r,".f-adoption-boundary",b>=2);
      visible(r,".f-alarm",b>=3);
      visible(r,".f-secondary",b>=4);
      visible(r,".f-lever",b>=5);
      visible(r,".f-response",b>=5);

      opacity(
        r,".f-alarm",
        b>=3?.65+.35*Math.abs(Math.sin(i*.8)):0
      );

      transform(
        r,".f-lever",
        `rotate(${b>=5?32:0}deg)`
      );

      transform(
        r,".f-response",
        `translateY(${b>=5?0:16}px)
         scale(${b===6?1.04:1})`
      );

      const arrivalValue=$(
        r,".f-arrival text"
      );

      const adoptionValue=$(
        r,".f-adoption text"
      );

      // The gauge labels remain source-faithful.
      if(arrivalValue) {
        const texts=$$(r,".f-arrival text");
        if(texts[0]) {
          texts[0].textContent=b>=3?"39":"24";
        }
      }

      if(adoptionValue) {
        const texts=$$(r,".f-adoption text");
        if(texts[0]) {
          texts[0].textContent=b>=3?"48%":"65%";
        }
      }

      label(r,".vls-w14-status",statuses[b]);
    }

    window.VL_SCENES.W14O1c=createScene(
      "W14O1c",
      "THE CALIBRATED TRIGGER CHAMBER",
      markup,
      render
    );
  }

  // ------------------------------------------------------------
  // SCENE 7 | W14O3a
  // THE LIVING SUSTAINING FLYWHEEL
  //
  // A large industrial flywheel is driven by four different
  // mechanisms: measurement, review, improvement and
  // embedding.
  //
  // The wheel initially lacks drive.
  // Each mechanism engages in sequence.
  // Finally the owner connects the four into a continuing
  // operating system.
  //
  // This is not the Week 10 readiness-gear scene.
  // It is a mechanical energy-transfer scene:
  // a central flywheel, four drive pistons, an owner
  // control lever and a continuous output shaft.
  //
  // Distinctive visual:
  // Flywheel inertia, reciprocating pistons, drive belts,
  // energy transfer, owner lever and sustained output.
  // ------------------------------------------------------------

  {
    const pistons=[
      {x:170,y:66,name:"MEASURE",c:C.navy},
      {x:285,y:182,name:"REVIEW",c:C.orange},
      {x:170,y:302,name:"IMPROVE",c:C.green},
      {x:55,y:182,name:"EMBED",c:C.navy}
    ];

    const markup=`
      <defs>
        <radialGradient id="w14g-wheel">
          <stop stop-color="#fbf8f1"/>
          <stop offset=".65" stop-color="#dbe7f2"/>
          <stop offset="1" stop-color="#9bb5c8"/>
        </radialGradient>
      </defs>

      ${txt(170,33,"THE OWNER'S SUSTAINING ENGINE",12,C.navy)}

      ${group(
        circle(170,182,103,C.blue,{
          opacity:.38
        }) +
        circle(170,182,86,"url(#w14g-wheel)",{
          stroke:C.navy,"stroke-width":7
        }) +
        circle(170,182,68,C.paper,{
          stroke:C.muted,"stroke-width":3
        }) +
        Array.from({length:8},(_,j)=>{
          const a=j*Math.PI/4;
          return line(
            170+25*Math.cos(a),
            182+25*Math.sin(a),
            170+66*Math.cos(a),
            182+66*Math.sin(a),
            C.navy,8
          );
        }).join("") +
        circle(170,182,25,C.navy) +
        circle(170,182,12,C.paper),
        "g-flywheel vls-w14-moving"
      )}

      ${pistons.map((p,j)=>{
        const horizontal=j%2===1;

        return group(
          rect(
            p.x-(horizontal?26:17),
            p.y-(horizontal?17:26),
            horizontal?52:34,
            horizontal?34:52,
            C.paper,7,{
              stroke:p.c,"stroke-width":3
            }
          ) +
          rect(
            p.x-(horizontal?14:7),
            p.y-(horizontal?8:14),
            horizontal?28:14,
            horizontal?16:28,
            p.c,4
          ) +
          txt(
            p.x,
            p.y+(j===0?-38:j===2?47:37),
            p.name,11,p.c
          ),
          `g-piston g-piston-${j} vls-w14-moving`,
          {opacity:.18}
        );
      }).join("")}

      ${group(
        circle(170,182,111,"none",{
          stroke:C.green,
          "stroke-width":4,
          "stroke-dasharray":"10 10"
        }),
        "g-energy vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        path("M245 268 L289 309",C.navy,8) +
        circle(245,268,12,C.navy) +
        circle(289,309,13,C.orange),
        "g-owner-lever vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        path("M170 182 V337",C.green,7) +
        circle(170,337,13,C.green) +
        path("M158 337 L168 347 L185 326",C.paper,4),
        "g-output vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        circle(170,182,117,"none",{
          stroke:C.green,
          "stroke-width":2,
          "stroke-dasharray":"4 8"
        }),
        "g-orbit vls-w14-moving",
        {opacity:0}
      )}

      ${txt(170,373,"MEASURE · REVIEW · IMPROVE · EMBED",11,C.navy)}
    `;

    const statuses=[
      "The loop needs an owner",
      "Measurement supplies evidence",
      "Review interprets results",
      "Improvement changes the work",
      "Embedding makes it normal",
      "The flywheel gains momentum",
      "The owner keeps it turning"
    ];

    function render(r,i,n) {
      const b=sequence(i,n,7);

      const engaged=Math.min(4,b);

      pistons.forEach((_,j)=>{
        const active=j<engaged;

        opacity(
          r,`.g-piston-${j}`,
          active?1:.16
        );

        const displacement=active?
          Math.sin(i*.95+j*Math.PI/2)*7:0;

        transform(
          r,`.g-piston-${j}`,
          j%2===0?
            `translateY(${displacement}px)`:
            `translateX(${displacement}px)`
        );
      });

      const angle=b>=5?
        i*29:
        b*12+i*3;

      transform(
        r,".g-flywheel",
        `rotate(${angle}deg)`
      );

      visible(r,".g-energy",b>=4);
      visible(r,".g-owner-lever",b>=5);
      visible(r,".g-output",b===6);
      visible(r,".g-orbit",b>=5);

      transform(
        r,".g-owner-lever",
        `rotate(${b>=5?-26:0+
          Math.sin(i*.8)*3}deg)`
      );

      transform(
        r,".g-orbit",
        `rotate(${-i*17}deg)`
      );

      label(r,".vls-w14-status",statuses[b]);
    }

    window.VL_SCENES.W14O3a=createScene(
      "W14O3a",
      "THE LIVING SUSTAINING FLYWHEEL",
      markup,
      render
    );
  }

  // ------------------------------------------------------------
  // SCENE 8 | W14O3b
  // THE FOUR-ROUTE GOVERNANCE JUNCTION
  //
  // A process change enters a railway-style switching yard.
  // Four distinct tracks lead to four governance routes.
  //
  // Route 1: below materiality.
  // Owner decides; log; quarterly aggregate review.
  //
  // Route 2: end-to-end measure affected.
  // Owner plus affected functions; model effect first.
  //
  // Route 3: incident-related control.
  // Owner plus risk; test current risk and cheapest control.
  //
  // Route 4: process boundary affected.
  // Steering group; return to phase-three scoping.
  //
  // Distinctive visual:
  // A physical rail junction, switching lever,
  // moving decision capsule, four differently engineered
  // destinations and a cumulative-change reservoir.
  //
  // This scene deliberately avoids a blanket approval gate.
  // ------------------------------------------------------------

  {
    const routes=[
      {
        y:105,
        name:"MINOR CHANGE",
        detail:"OWNER · LOG",
        color:C.green
      },
      {
        y:165,
        name:"MEASURE IMPACT",
        detail:"MODEL · CONSULT",
        color:C.navy
      },
      {
        y:225,
        name:"RISK CONTROL",
        detail:"OWNER · RISK",
        color:C.orange
      },
      {
        y:285,
        name:"BOUNDARY CHANGE",
        detail:"STEERING · PHASE 3",
        color:C.navy
      }
    ];

    const markup=`
      ${txt(170,35,"ONE CHANGE · FOUR ROUTES",13,C.navy)}

      ${group(
        rect(20,169,79,38,C.paper,12,{
          stroke:C.navy,"stroke-width":3
        }) +
        txt(59,192,"CHANGE",12,C.navy),
        "h-entry vls-w14-moving"
      )}

      ${group(
        circle(112,188,19,C.navy) +
        circle(112,188,9,C.paper) +
        line(112,188,129,171,C.orange,5),
        "h-switch vls-w14-moving"
      )}

      ${routes.map((route,j)=>{
        return group(
          path(
            `M112 188 Q154 188 179 ${route.y}
             H295`,
            route.color,4,{
              "stroke-dasharray":"7 7"
            }
          ) +
          circle(295,route.y,8,route.color),
          `h-track h-track-${j} vls-w14-moving`,
          {opacity:.18}
        );
      }).join("")}

      ${routes.map((route,j)=>{
        return group(
          rect(174,route.y-21,143,43,C.paper,9,{
            stroke:route.color,
            "stroke-width":2
          }) +
          txt(
            245,route.y-3,
            route.name,10,route.color
          ) +
          txt(
            245,route.y+12,
            route.detail,9,C.ink
          ),
          `h-destination h-destination-${j}
           vls-w14-moving`,
          {opacity:.2}
        );
      }).join("")}

      ${group(
        circle(60,188,11,C.orange) +
        circle(60,188,4,C.paper),
        "h-capsule vls-w14-moving"
      )}

      ${group(
        rect(45,325,250,30,C.blue,9) +
        txt(170,345,"QUARTERLY AGGREGATE REVIEW",
          10,C.navy),
        "h-quarterly vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        path("M36 310 H304",C.orange,3) +
        path("M294 301 L304 310 L294 319",C.orange,3),
        "h-cumulative vls-w14-moving",
        {opacity:0}
      )}

      ${txt(170,376,"ESCALATE IN PROPORTION",11,C.navy)}
    `;

    const statuses=[
      "Classify the proposed change",
      "Minor changes stay agile",
      "Model end-to-end impact",
      "Review continuing risk",
      "Revisit process boundaries",
      "Watch cumulative effects",
      "Govern without blocking"
    ];

    function render(r,i,n) {
      const b=sequence(i,n,7);

      let activeRoute=-1;

      if(b===1) activeRoute=0;
      if(b===2) activeRoute=1;
      if(b===3) activeRoute=2;
      if(b===4) activeRoute=3;

      routes.forEach((route,j)=>{
        const active=
          activeRoute===j ||
          (b>=5 && j===0) ||
          b===6;

        opacity(
          r,`.h-track-${j}`,
          active?1:.15
        );

        opacity(
          r,`.h-destination-${j}`,
          active?1:.22
        );

        transform(
          r,`.h-destination-${j}`,
          `translateX(${active?0:10}px)
           scale(${active?1:.96})`
        );
      });

      const capsulePositions=[
        [0,0],
        [135,-83],
        [135,-23],
        [135,37],
        [135,97],
        [140,-83],
        [140,0]
      ];

      const p=capsulePositions[b];

      transform(
        r,".h-capsule",
        `translate(${p[0]+Math.sin(i*.8)*3}px,
                    ${p[1]}px)`
      );

      const switchAngles=[
        0,-38,-13,13,38,-38,0
      ];

      transform(
        r,".h-switch",
        `rotate(${switchAngles[b]+
          Math.sin(i*.65)*2}deg)`
      );

      visible(r,".h-quarterly",b===5);
      visible(r,".h-cumulative",b>=5);

      transform(
        r,".h-cumulative",
        `translateX(${Math.sin(i*.75)*5}px)`
      );

      label(r,".vls-w14-status",statuses[b]);
    }

    window.VL_SCENES.W14O3b=createScene(
      "W14O3b",
      "THE FOUR-ROUTE GOVERNANCE JUNCTION",
      markup,
      render
    );
  }

  // END PART 2 OF 3
  // ============================================================
  // Continue immediately after PART 2.
  //
  // SCENES:
  // W14O3c — The accountability handover
  // W14O2d — The Qasr evidence observatory
  // W14O3d — The intervention decision arena
  // W14O1d — The self-improving organisation
  //
  // This part closes the IIFE and completes all 12 scenes.
  // ============================================================

  // ------------------------------------------------------------
  // SCENE 9 | W14O3c
  // THE ACCOUNTABILITY HANDOVER
  //
  // A physical control room changes hands.
  // The temporary BPM programme passes a control key
  // to the permanent operational process owner.
  //
  // The transfer activates five distinct obligations:
  // named ownership, objectives, measurement, review
  // and outstanding work.
  //
  // A vacancy alarm illustrates the Qasr ownership gap.
  //
  // Distinctive visual:
  // Two architectural control stations, a travelling key,
  // illuminated control circuits, a handover seal,
  // and an ownership continuity alarm.
  //
  // This depicts proposed sound governance, not evidence
  // that Qasr completed a formal transfer.
  // ------------------------------------------------------------

  {
    const markup = `
      <defs>
        <linearGradient id="w14i-floor" x1="0" y1="0"
          x2="0" y2="1">
          <stop stop-color="#edf3f6"/>
          <stop offset="1" stop-color="#dbe7f2"/>
        </linearGradient>
      </defs>

      ${txt(170,35,"PASS THE RESPONSIBILITY",12,C.navy)}

      ${rect(12,293,316,55,"url(#w14i-floor)",7)}

      ${group(
        rect(22,116,125,164,C.pale,10,{
          stroke:C.navy,"stroke-width":2
        }) +
        rect(34,130,101,29,C.navy,5) +
        txt(84,149,"PROGRAMME",11,C.white) +
        rect(43,176,82,56,C.paper,5,{
          stroke:C.muted,"stroke-width":2
        }) +
        path("M55 194 H113 M55 205 H103 M55 216 H108",
          C.muted,3) +
        rect(49,249,70,11,C.navy,4),
        "i-programme vls-w14-moving"
      )}

      ${group(
        rect(193,116,125,164,C.pale,10,{
          stroke:C.green,"stroke-width":2
        }) +
        rect(205,130,101,29,C.green,5) +
        txt(255,149,"OPERATIONS",11,C.white) +
        rect(213,176,85,56,C.paper,5,{
          stroke:C.muted,"stroke-width":2
        }) +
        circle(255,201,17,C.blue,{
          stroke:C.green,"stroke-width":2
        }) +
        check(255,201,C.green,.6) +
        rect(218,249,75,11,C.green,4),
        "i-operations vls-w14-moving"
      )}

      ${group(
        circle(170,188,15,C.gold,{
          stroke:C.navy,"stroke-width":2
        }) +
        rect(182,183,37,10,C.gold,3) +
        rect(206,193,8,8,C.gold,1) +
        circle(170,188,5,C.paper),
        "i-key vls-w14-moving"
      )}

      ${group(
        path("M136 188 H204",C.navy,3,{
          "stroke-dasharray":"6 6"
        }),
        "i-transfer vls-w14-moving"
      )}

      ${group(
        circle(255,105,16,C.orange) +
        txt(255,111,"!",20,C.white),
        "i-vacancy vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        circle(255,105,18,C.green) +
        check(255,105,C.white,.7),
        "i-accepted vls-w14-moving",
        {opacity:0}
      )}

      ${[
        ["OWNER",47],
        ["OBJECTIVES",108],
        ["MEASURES",170],
        ["REVIEW",232],
        ["DEFECTS",293]
      ].map(([name,x],j)=>
        group(
          circle(x,328,9,C.muted) +
          txt(x,356,name,9,C.navy),
          `i-obligation i-obligation-${j}
           vls-w14-moving`,
          {opacity:.22}
        )
      ).join("")}

      ${group(
        path("M219 270 Q255 287 291 270",C.green,3) +
        check(255,278,C.green,.55),
        "i-seal vls-w14-moving",
        {opacity:0}
      )}

      ${txt(170,377,"TRANSFER AUTHORITY · NOT JUST FILES",
        10,C.navy)}
    `;

    const statuses = [
      "The programme prepares",
      "A named owner is needed",
      "Transfer the authority",
      "Accept operating objectives",
      "Connect measures and review",
      "Assign outstanding work",
      "Accountability must endure"
    ];

    function render(r,i,n) {
      const b=sequence(i,n,7);

      const keyX=[-66,-42,-8,32,62,84,84][b];
      const keyY=[0,0,-5,-8,-4,0,0][b];

      transform(
        r,".i-key",
        `translate(${keyX}px,${keyY}px)
         rotate(${b*12}deg)`
      );

      opacity(r,".i-transfer",b>=2?1:.2);

      visible(r,".i-vacancy",b===1);
      visible(r,".i-accepted",b>=3);
      visible(r,".i-seal",b>=5);

      for(let j=0;j<5;j++) {
        const active=
          (j===0 && b>=2) ||
          (j===1 && b>=3) ||
          (j===2 && b>=4) ||
          (j===3 && b>=4) ||
          (j===4 && b>=5);

        const node=$(r,`.i-obligation-${j}`);

        if(node) {
          node.style.opacity=active?"1":".22";

          const lamp=node.querySelector("circle");

          if(lamp) {
            lamp.setAttribute(
              "fill",
              active?C.green:C.muted
            );
          }
        }

        transform(
          r,`.i-obligation-${j}`,
          `translateY(${active?
            Math.sin(i*.8+j)*2:7}px)
           scale(${active?1:.85})`
        );
      }

      transform(
        r,".i-programme",
        `translateY(${b>=3?5:0}px)
         scale(${b>=3?.97:1})`
      );

      transform(
        r,".i-operations",
        `scale(${b>=3?1.035:1})`
      );

      transform(
        r,".i-seal",
        `scale(${b===6?1.12:1})`
      );

      label(r,".vls-w14-status",statuses[b]);
    }

    window.VL_SCENES.W14O3c=createScene(
      "W14O3c",
      "THE ACCOUNTABILITY HANDOVER",
      markup,
      render
    );
  }

  // ------------------------------------------------------------
  // SCENE 10 | W14O2d
  // THE QASR EVIDENCE OBSERVATORY
  //
  // A cinematic investigation table reconstructs the
  // twenty-two-month performance history.
  //
  // Physical evidence appears as illuminated objects:
  // fourteen properties, an arrival-time trajectory,
  // a declining kiosk-adoption track, a vacant owner
  // position, an unread operations pack and four changes.
  //
  // The final visual separates thirteen explained minutes
  // from two minutes that remain unexplained.
  //
  // Distinctive visual:
  // Investigation table, animated evidence timeline,
  // magnifying lens, falling adoption markers,
  // empty ownership chair and thirteen-versus-two
  // evidence blocks.
  //
  // Every numerical value comes from Exhibit 14.
  // ------------------------------------------------------------

  {
    const markup=`
      <defs>
        <linearGradient id="w14j-table" x1="0" y1="0"
          x2="0" y2="1">
          <stop stop-color="#edf3f6"/>
          <stop offset="1" stop-color="#dbe7f2"/>
        </linearGradient>
      </defs>

      ${txt(170,34,"TWENTY-TWO MONTHS LATER",12,C.navy)}

      ${rect(14,57,312,300,"url(#w14j-table)",15,{
        stroke:C.muted,"stroke-width":2
      })}

      ${group(
        rect(31,75,278,147,C.paper,9,{
          stroke:C.navy,"stroke-width":2
        }) +
        line(52,190,292,190,C.muted,2) +
        line(52,94,52,190,C.muted,2) +
        txt(170,91,"ARRIVAL TIME",11,C.navy),
        "j-chart"
      )}

      ${group(
        path(
          "M61 108 L118 176 L188 171 L282 151",
          C.orange,4
        ) +
        circle(61,108,6,C.navy) +
        circle(118,176,6,C.green) +
        circle(188,171,6,C.orange) +
        circle(282,151,6,C.orange),
        "j-trajectory vls-w14-moving"
      )}

      ${group(
        txt(61,100,"82",13,C.navy) +
        txt(118,165,"24",13,C.green) +
        txt(188,160,"28",13,C.orange) +
        txt(282,140,"39",13,C.orange),
        "j-values vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        txt(61,208,"BASE",9,C.navy) +
        txt(118,208,"M5",9,C.navy) +
        txt(188,208,"M13",9,C.navy) +
        txt(282,208,"M22",9,C.navy),
        "j-dates"
      )}

      ${group(
        rect(34,235,272,23,C.blue,8) +
        rect(38,239,177,15,C.green,5) +
        txt(170,230,"KIOSK ADOPTION",10,C.navy),
        "j-adoption vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        txt(58,274,"65%",12,C.green) +
        txt(170,274,"61%",12,C.navy) +
        txt(283,274,"48%",12,C.orange),
        "j-adoption-values vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        rect(42,287,74,44,C.paper,7,{
          stroke:C.orange,"stroke-width":2
        }) +
        circle(79,302,8,C.orange) +
        txt(79,322,"NO OWNER",10,C.orange),
        "j-owner vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        rect(133,287,74,44,C.paper,7,{
          stroke:C.navy,"stroke-width":2
        }) +
        path("M145 298 H194 M145 305 H190",C.muted,2) +
        txt(170,322,"PAGE FOUR",10,C.navy),
        "j-report vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        rect(224,287,74,44,C.paper,7,{
          stroke:C.green,"stroke-width":2
        }) +
        txt(261,307,"4",17,C.green) +
        txt(261,322,"CHANGES",10,C.green),
        "j-changes vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        rect(49,282,242,55,C.paper,10,{
          stroke:C.orange,"stroke-width":2
        }) +
        rect(65,296,182,12,C.orange,4) +
        rect(247,296,28,12,C.muted,4) +
        txt(156,329,"13 EXPLAINED",11,C.orange) +
        txt(268,329,"2",11,C.navy),
        "j-attribution vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        circle(170,164,43,"none",{
          stroke:C.orange,"stroke-width":4
        }) +
        path("M200 195 L231 227",C.orange,9),
        "j-lens vls-w14-moving",
        {opacity:0}
      )}

      ${txt(170,377,"EVIDENCE BEFORE EXPLANATION",
        11,C.navy)}
    `;

    const statuses=[
      "Fourteen properties",
      "The original gain",
      "Performance drifts",
      "Adoption declines",
      "Ownership disappears",
      "The measure goes unread",
      "Four changes accumulate",
      "Thirteen minutes explained",
      "Two minutes remain unknown"
    ];

    function render(r,i,n) {
      const b=sequence(i,n,9);

      const trajectory=$(
        r,".j-trajectory path"
      );

      if(trajectory) {
        const points=[
          "M61 108",
          "M61 108 L118 176",
          "M61 108 L118 176 L188 171",
          "M61 108 L118 176 L188 171 L282 151"
        ];

        trajectory.setAttribute(
          "d",
          points[Math.min(3,Math.max(0,b))]
        );
      }

      visible(r,".j-values",b>=2);
      visible(r,".j-adoption",b>=3);
      visible(r,".j-adoption-values",b>=3);

      visible(r,".j-owner",b>=4 && b<7);
      visible(r,".j-report",b>=5 && b<7);
      visible(r,".j-changes",b>=6 && b<7);
      visible(r,".j-attribution",b>=7);

      visible(r,".j-lens",b===8);

      transform(
        r,".j-lens",
        `translate(${Math.sin(i*.8)*8}px,
                    ${Math.cos(i*.7)*6}px)
         scale(${b===8?1:.75})`
      );

      const adoptionBar=$(
        r,".j-adoption rect:nth-of-type(2)"
      );

      if(adoptionBar) {
        adoptionBar.setAttribute(
          "width",
          b>=3?131:177
        );
      }

      transform(
        r,".j-attribution",
        `translateY(${b>=7?0:18}px)
         scale(${b===8?1.04:1})`
      );

      label(r,".vls-w14-status",statuses[b]);
    }

    window.VL_SCENES.W14O2d=createScene(
      "W14O2d",
      "THE QASR EVIDENCE OBSERVATORY",
      markup,
      render
    );
  }

  // ------------------------------------------------------------
  // SCENE 11 | W14O3d
  // THE INTERVENTION DECISION ARENA
  //
  // Four proposed interventions enter a physical
  // decision arena.
  //
  // Training, step removal, more reporting and
  // restored ownership are represented by four
  // different mechanical objects.
  //
  // A central evidence beam tests each candidate.
  //
  // Three candidates are moved to secondary positions.
  // Restored ownership becomes the immediate priority,
  // while investigation and verification remain necessary.
  //
  // Distinctive visual:
  // Four rotating candidate platforms, a central
  // evidence spotlight, a mechanical decision arm,
  // an ownership pedestal and a follow-up pathway.
  //
  // The selection is a recommendation, not an
  // intervention already implemented by Qasr.
  // ------------------------------------------------------------

  {
    const markup=`
      <defs>
        <radialGradient id="w14k-stage">
          <stop stop-color="#fbf8f1"/>
          <stop offset="1" stop-color="#dbe7f2"/>
        </radialGradient>
      </defs>

      ${txt(170,35,"ONE PRIORITY · FOUR CANDIDATES",
        12,C.navy)}

      ${circle(170,184,130,"url(#w14k-stage)",{
        stroke:C.muted,"stroke-width":2
      })}

      ${group(
        circle(170,184,57,C.paper,{
          stroke:C.navy,"stroke-width":4
        }) +
        circle(170,184,42,C.blue) +
        txt(170,178,"CASE",13,C.navy) +
        txt(170,197,"EVIDENCE",13,C.navy),
        "k-centre vls-w14-moving"
      )}

      ${group(
        circle(170,75,35,C.paper,{
          stroke:C.navy,"stroke-width":3
        }) +
        person(170,75,C.navy,.65) +
        txt(170,122,"TRAINING",11,C.navy),
        "k-candidate k-training vls-w14-moving"
      )}

      ${group(
        circle(279,184,35,C.paper,{
          stroke:C.orange,"stroke-width":3
        }) +
        path("M260 184 H298",C.orange,5) +
        path("M269 172 L289 196",C.orange,4) +
        txt(279,232,"REMOVE STEPS",10,C.orange),
        "k-candidate k-removal vls-w14-moving"
      )}

      ${group(
        circle(170,293,35,C.paper,{
          stroke:C.navy,"stroke-width":3
        }) +
        rect(153,276,34,35,C.blue,4) +
        path("M159 285 H181 M159 293 H178 M159 301 H182",
          C.navy,2) +
        txt(170,341,"MORE REPORTS",10,C.navy),
        "k-candidate k-reporting vls-w14-moving"
      )}

      ${group(
        circle(61,184,35,C.paper,{
          stroke:C.green,"stroke-width":3
        }) +
        circle(61,176,12,C.green) +
        path("M42 202 Q61 183 80 202",C.green,7) +
        txt(61,232,"OWNERSHIP",10,C.green),
        "k-candidate k-ownership vls-w14-moving"
      )}

      ${group(
        path("M170 184 L61 184",C.green,6) +
        circle(61,184,8,C.green),
        "k-selection vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        circle(61,184,45,"none",{
          stroke:C.green,
          "stroke-width":5,
          "stroke-dasharray":"8 7"
        }),
        "k-priority vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        path("M61 230 Q170 270 279 230",C.green,3,{
          "stroke-dasharray":"6 7"
        }) +
        path("M268 222 L279 230 L267 238",C.green,3),
        "k-followup vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        rect(91,353,158,26,C.green,8) +
        txt(170,371,"RESTORE ACCOUNTABILITY",
          11,C.white),
        "k-decision vls-w14-moving",
        {opacity:0}
      )}
    `;

    const statuses=[
      "Compare the candidates",
      "Training needs evidence",
      "Controls need assessment",
      "Reporting already exists",
      "Ownership is missing",
      "Restore decision authority",
      "Investigate the causes",
      "Verify the response"
    ];

    function render(r,i,n) {
      const b=sequence(i,n,8);

      const selectors=[
        ".k-training",
        ".k-removal",
        ".k-reporting",
        ".k-ownership"
      ];

      let highlighted=-1;

      if(b===1) highlighted=0;
      if(b===2) highlighted=1;
      if(b===3) highlighted=2;
      if(b>=4) highlighted=3;

      selectors.forEach((selector,j)=>{
        const active=
          highlighted===j || b===0;

        opacity(
          r,selector,
          active?1:.27
        );

        transform(
          r,selector,
          `scale(${active?1.07:.92})
           rotate(${active?
             Math.sin(i*.7+j)*2:0}deg)`
        );
      });

      visible(r,".k-selection",b>=4);
      visible(r,".k-priority",b>=5);
      visible(r,".k-followup",b>=6);
      visible(r,".k-decision",b>=5);

      transform(
        r,".k-priority",
        `rotate(${i*15}deg)`
      );

      transform(
        r,".k-centre",
        `scale(${1+Math.sin(i*.8)*.025})`
      );

      transform(
        r,".k-decision",
        `translateY(${b>=5?0:15}px)
         scale(${b===7?1.04:1})`
      );

      label(r,".vls-w14-status",statuses[b]);
    }

    window.VL_SCENES.W14O3d=createScene(
      "W14O3d",
      "THE INTERVENTION DECISION ARENA",
      markup,
      render
    );
  }

  // ------------------------------------------------------------
  // SCENE 12 | W14O1d
  // THE SELF-IMPROVING ORGANISATION
  //
  // The final scene is not another circular BPM diagram.
  //
  // A living architectural model grows from a single
  // completed project into a network of independently
  // improving operational processes.
  //
  // The first building represents a successful BPM project.
  // A permanent ownership structure is constructed.
  // A knowledge library and centre of excellence appear.
  // Improvement capability spreads to other processes.
  //
  // Finally, a returning bridge reconnects operational
  // learning with earlier BPM phases.
  //
  // Distinctive visual:
  // Architectural construction, rising buildings,
  // growing network, illuminated knowledge hub,
  // travelling improvement pulses and a return bridge.
  //
  // This represents the intended organisational
  // capability, not a claim that Qasr has achieved it.
  // ------------------------------------------------------------

  {
    const markup=`
      <defs>
        <linearGradient id="w14l-ground" x1="0" y1="0"
          x2="0" y2="1">
          <stop stop-color="#edf3f6"/>
          <stop offset="1" stop-color="#dbe7f2"/>
        </linearGradient>
      </defs>

      ${txt(170,35,"FROM ONE PROJECT TO CAPABILITY",
        12,C.navy)}

      ${rect(12,309,316,49,"url(#w14l-ground)",8)}

      ${group(
        rect(24,179,79,130,C.paper,7,{
          stroke:C.navy,"stroke-width":3
        }) +
        rect(34,156,59,25,C.navy,4) +
        txt(63,173,"PROJECT",10,C.white) +
        Array.from({length:3},(_,j)=>
          rect(36,199+j*29,55,15,C.blue,3)
        ).join("") +
        check(63,285,C.green,.6),
        "l-project vls-w14-moving"
      )}

      ${group(
        rect(130,116,80,193,C.paper,8,{
          stroke:C.green,"stroke-width":3
        }) +
        rect(140,93,60,26,C.green,4) +
        txt(170,110,"OWNER",11,C.white) +
        Array.from({length:4},(_,j)=>
          rect(143,141+j*32,54,18,C.blue,4)
        ).join(""),
        "l-owner vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        rect(235,171,80,138,C.paper,8,{
          stroke:C.orange,"stroke-width":3
        }) +
        rect(245,148,60,26,C.orange,4) +
        txt(275,165,"BPM HUB",10,C.white) +
        rect(249,193,52,13,C.blue,3) +
        rect(249,214,52,13,C.blue,3) +
        rect(249,235,52,13,C.blue,3) +
        rect(249,256,52,13,C.blue,3),
        "l-hub vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        path("M103 237 H130",C.green,4) +
        path("M210 237 H235",C.green,4) +
        path("M119 229 L130 237 L119 245",C.green,3) +
        path("M224 229 L235 237 L224 245",C.green,3),
        "l-links vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        circle(63,94,19,C.navy) +
        circle(170,62,19,C.green) +
        circle(275,94,19,C.orange) +
        path("M63 94 L170 62 L275 94",C.muted,3) +
        path("M63 94 L170 62",C.green,3,{
          "stroke-dasharray":"5 6"
        }) +
        path("M170 62 L275 94",C.green,3,{
          "stroke-dasharray":"5 6"
        }),
        "l-network vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        circle(63,94,7,C.paper) +
        circle(170,62,7,C.paper) +
        circle(275,94,7,C.paper),
        "l-pulses vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        path(
          "M275 310 Q170 371 63 310",
          C.green,4,{
            "stroke-dasharray":"8 8"
          }
        ) +
        path(
          "M63 310 L75 301 M63 310 L75 319",
          C.green,3
        ),
        "l-return vls-w14-moving",
        {opacity:0}
      )}

      ${group(
        rect(91,323,158,29,C.paper,9,{
          stroke:C.green,"stroke-width":2
        }) +
        txt(170,342,"IMPROVE AGAIN",12,C.green),
        "l-repeat vls-w14-moving",
        {opacity:0}
      )}

      ${txt(170,379,"THE PROGRAMME ENDS · LEARNING CONTINUES",
        10,C.navy)}
    `;

    const statuses=[
      "One project succeeds",
      "Ownership becomes permanent",
      "Knowledge is preserved",
      "Internal expertise develops",
      "Capability spreads",
      "Other processes improve",
      "Learning returns upstream",
      "Continuous improvement endures"
    ];

    function render(r,i,n) {
      const b=sequence(i,n,8);

      visible(r,".l-owner",b>=1);
      visible(r,".l-hub",b>=3);
      visible(r,".l-links",b>=3);
      visible(r,".l-network",b>=4);
      visible(r,".l-pulses",b>=5);
      visible(r,".l-return",b>=6);
      visible(r,".l-repeat",b===7);

      transform(
        r,".l-project",
        `translateY(${Math.sin(i*.65)*2}px)
         scale(${b>=2?.97:1})`
      );

      transform(
        r,".l-owner",
        `translateY(${b>=1?0:35}px)
         scale(${b>=1?1:.7})`
      );

      transform(
        r,".l-hub",
        `translateY(${b>=3?0:35}px)
         scale(${b>=3?1:.7})`
      );

      transform(
        r,".l-network",
        `translateY(${b>=4?0:15}px)
         scale(${b>=4?1:.8})`
      );

      transform(
        r,".l-pulses",
        `translateX(${Math.sin(i*.85)*7}px)
         translateY(${Math.cos(i*.85)*4}px)`
      );

      transform(
        r,".l-return",
        `translateX(${Math.sin(i*.7)*4}px)`
      );

      transform(
        r,".l-repeat",
        `translateY(${b===7?0:14}px)
         scale(${b===7?1.05:1})`
      );

      label(r,".vls-w14-status",statuses[b]);
    }

    window.VL_SCENES.W14O1d=createScene(
      "W14O1d",
      "THE SELF-IMPROVING ORGANISATION",
      markup,
      render
    );
  }

  // ------------------------------------------------------------
  // FINAL REGISTRY VALIDATION
  // ------------------------------------------------------------

  const REQUIRED_W14_SECTIONS = [
    "W14O1a",
    "W14O2a",
    "W14O2b",
    "W14O2c",
    "W14O1b",
    "W14O1c",
    "W14O3a",
    "W14O3b",
    "W14O3c",
    "W14O2d",
    "W14O3d",
    "W14O1d"
  ];

  for(const id of REQUIRED_W14_SECTIONS) {
    const scene=window.VL_SCENES[id];

    if(
      !scene ||
      typeof scene.build!=="function" ||
      typeof scene.step!=="function" ||
      typeof scene.reset!=="function"
    ) {
      console.error(
        `[VoiceLearn Week 14] Missing scene contract: ${id}`
      );
    }
  }

  // ------------------------------------------------------------
  // WEEK 14 SCENE MANIFEST
  //
  // Lesson 1
  // W14O1a — Architectural bridge
  // W14O2a — Eroding foundation
  // W14O2b — Expanding arrival conveyor
  //
  // Lesson 2
  // W14O2c — Unread operations pack
  // W14O1b — Four-signal lighthouse
  // W14O1c — Calibrated trigger chamber
  //
  // Lesson 3
  // W14O3a — Industrial sustaining flywheel
  // W14O3b — Four-route railway junction
  // W14O3c — Accountability control-room handover
  //
  // Lesson 4
  // W14O2d — Qasr evidence observatory
  // W14O3d — Intervention decision arena
  // W14O1d — Self-improving architectural network
  //
  // Total: 12 distinct cinematic scenes.
  // ------------------------------------------------------------

})();
