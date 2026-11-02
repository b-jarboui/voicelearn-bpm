// OPER621 · Week 11 · The Develop Phase
// Cinematic scenes: W11O1a, W11O1b, W11O1c
// Parts 1–4 concatenate directly into one JavaScript file.

(() => {
"use strict";

window.VL_SCENES = window.VL_SCENES || {};

const NS = "http://www.w3.org/2000/svg";

const C = {
  navy: "#1f4e79",
  orange: "#c0502a",
  paper: "#fbf8f1",
  ink: "#1b2a3a",
  blue: "#dbe7f2",
  green: "#317c61",
  pale: "#e8f1ed",
  gold: "#e5b76c",
  muted: "#91aabd"
};

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

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
  const total = Number.isFinite(Number(n)) && Number(n) > 0
    ? Math.floor(Number(n)) : 1;
  return clamp(
    Number.isFinite(Number(i)) ? Math.floor(Number(i)) : 0,
    0,
    total - 1
  );
};

const beat = (i, cuts) =>
  cuts.reduce((v, cut) => v + (i >= cut ? 1 : 0), 0);

const svg = (body, label = "Animated BPM illustration") =>
  `<svg xmlns="${NS}" viewBox="0 0 340 390"
    preserveAspectRatio="xMidYMid meet"
    role="img" aria-label="${label}">${body}</svg>`;

const rect = (x, y, w, h, fill, rx = 0, extra = "") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}"
    rx="${rx}" fill="${fill}" ${extra}/>`;

const circle = (x, y, r, fill, extra = "") =>
  `<circle cx="${x}" cy="${y}" r="${r}"
    fill="${fill}" ${extra}/>`;

const path = (d, stroke = C.navy, width = 2, extra = "") =>
  `<path d="${d}" fill="none" stroke="${stroke}"
    stroke-width="${width}" stroke-linecap="round"
    stroke-linejoin="round" ${extra}/>`;

const text = (x, y, value, size = 12,
              color = C.ink, extra = "") =>
  `<text x="${x}" y="${y}" text-anchor="middle"
    font-size="${size}" fill="${color}" ${extra}>${value}</text>`;

const check = (x, y, color = C.green, scale = 1) =>
  `<path d="M${x-11*scale} ${y}
    l${8*scale} ${9*scale}
    ${17*scale} ${-20*scale}"
    fill="none" stroke="${color}"
    stroke-width="${4*scale}"
    stroke-linecap="round"
    stroke-linejoin="round"/>`;

const person = (x, y, color = C.navy, scale = 1) =>
  `<g transform="translate(${x} ${y}) scale(${scale})">
    ${circle(0,-14,10,color)}
    <path d="M-17 17 Q-17 -2 0 -2 Q17 -2 17 17Z"
      fill="${color}"/>
  </g>`;

function mount(el, id, body, label) {
  if (!el || typeof el.replaceChildren !== "function")
    return null;

  const root = document.createElement("div");
  root.className = `vls-w11-${id}`;
  root.dataset.scene = id;

  root.innerHTML = `
    <div class="vls-w11-stage">
      ${svg(body, label)}
    </div>
    <div class="vls-w11-caption" aria-hidden="true">
      <span class="vls-w11-status"></span>
    </div>
    <div class="vls-w11-progress" aria-hidden="true"></div>
  `;

  el.replaceChildren(root);
  return root;
}

const one = (root, selector) =>
  root ? root.querySelector(selector) : null;

const all = (root, selector) =>
  root ? [...root.querySelectorAll(selector)] : [];

function set(root, selector, props) {
  all(root, selector).forEach(el => {
    Object.entries(props).forEach(([key, value]) => {
      if (key === "text") {
        el.textContent = String(value);
      } else if (key === "attr") {
        Object.entries(value).forEach(([a, v]) =>
          el.setAttribute(a, String(v)));
      } else {
        el.style[key] = String(value);
      }
    });
  });
}

function show(root, selector, yes) {
  set(root, selector, {opacity: yes ? "1" : "0"});
}

function move(root, selector, x = 0, y = 0,
              scale = 1, rotation = 0) {
  set(root, selector, {
    transform:
      `translate(${x}px,${y}px) rotate(${rotation}deg) scale(${scale})`
  });
}

function caption(root, value) {
  set(root, ".vls-w11-status", {text: value});
}

function progress(root, i, n) {
  const total = Math.max(1, Number(n) || 1);
  const fraction = clamp((i + 1) / total, 0, 1);
  set(root, ".vls-w11-progress", {
    width: `${fraction * 100}%`
  });
}

// Every narration index has a unique visual state.
// The scene-specific renderers provide the semantic changes;
// the cinematic camera and travelling light provide a visible
// change even between narration lines in the same semantic beat.

function camera(root, i, n, mode = "drift") {
  if (!root) return;

  const k = safeIndex(i, n);
  const total = Math.max(1, Number(n) || 1);
  const p = total > 1 ? k / (total - 1) : 0;

  let x, y, zoom, rotation;

  if (mode === "orbit") {
    x = 5 * Math.sin(k * 0.69);
    y = 4 * Math.cos(k * 0.47);
    zoom = 1 + 0.035 * Math.sin(k * 0.43);
    rotation = 0.9 * Math.sin(k * 0.31);
  } else if (mode === "track") {
    x = -8 + 16 * p;
    y = 3 * Math.sin(k * 0.67);
    zoom = 1.025 + 0.025 * Math.cos(k * 0.37);
    rotation = 0;
  } else if (mode === "inspect") {
    x = 5 * Math.sin(k * 0.53);
    y = -5 + 10 * p;
    zoom = 1.025 + 0.03 * Math.sin(k * 0.59);
    rotation = 0;
  } else {
    x = 4 * Math.sin(k * 0.73);
    y = 4 * Math.cos(k * 0.51);
    zoom = 1.015 + 0.025 * Math.sin(k * 0.39);
    rotation = 0;
  }

  const stage = one(root, ".vls-w11-stage");
  if (stage) {
    stage.style.transform = reduced()
      ? "none"
      : `translate(${x}px,${y}px)
         rotate(${rotation}deg) scale(${zoom})`;
  }

  // A small travelling glint changes position at every moment.
  // It is decorative, not a substitute for semantic animation.
  const glint = one(root, ".vls-w11-glint");
  if (glint) {
    const gx = 35 + ((k * 37) % 270);
    const gy = 45 + ((k * 29) % 290);
    glint.setAttribute("transform",
      `translate(${gx} ${gy})`);
    glint.style.opacity = reduced() ? "0" : ".45";
  }
}

function update(root, i, n, label, mode = "drift") {
  caption(root, label);
  progress(root, i, n);
  camera(root, i, n, mode);
}

function instant(root, fn) {
  if (!root) return;
  root.classList.add("vls-w11-instant");
  fn();
  void root.offsetHeight;
  if (!reduced())
    root.classList.remove("vls-w11-instant");
}

function gsapMove(root, selector, props, duration = 0.8) {
  const el = one(root, selector);
  if (!el) return;

  if (window.gsap && !reduced()) {
    window.gsap.killTweensOf(el);
    window.gsap.to(el, {
      ...props,
      duration,
      ease: "power2.inOut",
      overwrite: true
    });
  } else {
    Object.entries(props).forEach(([key, value]) => {
      if (key === "x")
        el.style.translate = `${value}px 0`;
      else if (key === "y")
        el.style.translate = `0 ${value}px`;
      else
        el.style[key] = value;
    });
  }
}

// Shared kinetic details.
const glint = `
  <g class="vls-w11-glint" opacity="0">
    ${circle(0,0,4,C.gold)}
    ${path("M-9 0 H9 M0 -9 V9",C.gold,1.4)}
  </g>
`;

const sparkle = (x, y, color = C.gold) =>
  `<g transform="translate(${x} ${y})">
    ${path("M-8 0 H8 M0 -8 V8",color,2)}
    ${circle(0,0,3,C.paper)}
  </g>`;

// ------------------------------------------------------------
// SINGLE EMBEDDED STYLESHEET
// ------------------------------------------------------------

if (!document.getElementById("vl-sc-w11")) {
  const style = document.createElement("style");
  style.id = "vl-sc-w11";
  style.textContent = `
  [class^="vls-w11-W11O"],
  [class*=" vls-w11-W11O"] {
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
    background:transparent;
    color:var(--ink);
    font-family:inherit;
    isolation:isolate;
    box-sizing:border-box;
  }

  [class^="vls-w11-W11O"] *,
  [class*=" vls-w11-W11O"] * {
    box-sizing:border-box;
  }

  [class^="vls-w11-W11O"] .vls-w11-stage,
  [class*=" vls-w11-W11O"] .vls-w11-stage {
    position:absolute;
    inset:0 0 24px;
    display:flex;
    align-items:center;
    justify-content:center;
    transform-origin:center;
    transition:transform .85s cubic-bezier(.2,.75,.2,1);
    will-change:transform;
  }

  [class^="vls-w11-W11O"] svg,
  [class*=" vls-w11-W11O"] svg {
    display:block;
    width:100%;
    height:100%;
    max-width:440px;
    max-height:100%;
    overflow:visible;
    font-family:inherit;
  }

  [class^="vls-w11-W11O"] svg text,
  [class*=" vls-w11-W11O"] svg text {
    font-family:inherit;
    font-weight:700;
    letter-spacing:.15px;
  }

  [class^="vls-w11-W11O"] .vls-w11-caption,
  [class*=" vls-w11-W11O"] .vls-w11-caption {
    position:absolute;
    bottom:5px;
    left:4%;
    right:4%;
    min-height:19px;
    display:flex;
    justify-content:center;
    align-items:center;
    text-align:center;
    color:var(--navy);
    font-size:11px;
    font-weight:750;
    line-height:1.3;
    letter-spacing:.035em;
    pointer-events:none;
  }

  [class^="vls-w11-W11O"] .vls-w11-progress,
  [class*=" vls-w11-W11O"] .vls-w11-progress {
    position:absolute;
    left:0;
    bottom:0;
    width:0;
    height:3px;
    background:var(--orange);
    transition:width .75s ease;
  }

  [class^="vls-w11-W11O"] .kin,
  [class*=" vls-w11-W11O"] .kin {
    transition:
      transform .9s cubic-bezier(.2,.75,.2,1),
      opacity .7s ease,
      fill .7s ease,
      stroke .7s ease,
      stroke-dashoffset .9s ease;
  }

  [class^="vls-w11-W11O"] .draw,
  [class*=" vls-w11-W11O"] .draw {
    stroke-dasharray:500;
    stroke-dashoffset:500;
    transition:stroke-dashoffset 1s ease;
  }

  [class^="vls-w11-W11O"] .pulse,
  [class*=" vls-w11-W11O"] .pulse {
    animation:vlsW11Pulse 2.5s ease-in-out infinite;
    transform-box:fill-box;
    transform-origin:center;
  }

  @keyframes vlsW11Pulse {
    0%,100% {opacity:.3;transform:scale(.93)}
    50% {opacity:.85;transform:scale(1.08)}
  }

  [class^="vls-w11-W11O"].vls-w11-instant *,
  [class*=" vls-w11-W11O"].vls-w11-instant * {
    transition:none!important;
    animation:none!important;
  }

  /* O1a: architectural construction theatre */
  .vls-w11-W11O1a .a-blueprint {
    transform-origin:170px 184px;
  }
  .vls-w11-W11O1a .a-crane {
    transform-origin:170px 72px;
  }
  .vls-w11-W11O1a .a-block {
    transform-box:fill-box;
    transform-origin:center;
  }
  .vls-w11-W11O1a .a-elevator {
    transform-origin:170px 215px;
  }
  .vls-w11-W11O1a .a-guest {
    transform-origin:70px 310px;
  }
  .vls-w11-W11O1a .a-gate {
    transform-origin:170px 263px;
  }

  /* O1b: rotating development-route carousel */
  .vls-w11-W11O1b .b-carousel {
    transform-origin:170px 188px;
  }
  .vls-w11-W11O1b .b-route {
    transform-box:fill-box;
    transform-origin:center;
  }
  .vls-w11-W11O1b .b-compass {
    transform-origin:170px 188px;
  }
  .vls-w11-W11O1b .b-beam {
    transform-origin:170px 188px;
  }
  .vls-w11-W11O1b .b-halo {
    transform-origin:170px 188px;
  }

  /* O1c: physical design-drift fault line */
  .vls-w11-W11O1c .c-platform {
    transform-origin:170px 195px;
  }
  .vls-w11-W11O1c .c-crack {
    stroke-dasharray:260;
    stroke-dashoffset:260;
  }
  .vls-w11-W11O1c .c-fragment {
    transform-box:fill-box;
    transform-origin:center;
  }
  .vls-w11-W11O1c .c-bridge {
    stroke-dasharray:280;
    stroke-dashoffset:280;
  }
  .vls-w11-W11O1c .c-stamp {
    transform-origin:170px 165px;
  }

  @media(max-width:375px) {
    [class^="vls-w11-W11O"] .vls-w11-caption,
    [class*=" vls-w11-W11O"] .vls-w11-caption {
      font-size:10.5px;
    }
  }

  @media(prefers-reduced-motion:reduce) {
    [class^="vls-w11-W11O"] *,
    [class*=" vls-w11-W11O"] * {
      transition:none!important;
      animation:none!important;
    }
  }
  `;
  document.head.appendChild(style);
}

// ============================================================
// SCENE 1 · W11O1a
// THE PROCESS CONSTRUCTION SITE
//
// Original visual concept:
// A blueprint is lifted into a three-dimensional operating
// environment. A construction crane lowers systems, rules,
// human procedures and testing mechanisms into position.
//
// Unlike a flowchart, this is a miniature architectural world.
// The structure remains incomplete until exceptions and
// operational tests connect all its parts.
//
// Narration indices: 0–29.
// ============================================================

{
  let root = null;

  const labels = [
    "THE APPROVED DESIGN",
    "A DESIGN IS NOT OPERATION",
    "BUILD THE CAPABILITY",
    "SYSTEMS AND RULES",
    "THE OVERNIGHT DECISION",
    "CONNECT THE SYSTEMS",
    "THE HUMAN ROUTE",
    "EXCEPTION HANDLING",
    "TEST REAL CONDITIONS",
    "BEYOND THE DEMONSTRATION",
    "COMPLETE OPERATING CAPABILITY",
    "READY FOR IMPLEMENT"
  ];

  const cuts = [
    2,4,6,8,10,12,14,17,20,23,26
  ];

  const block = (x, y, w, h, color, label, cls) => `
    <g class="kin ${cls}">
      ${rect(x+8,y-8,w,h,color,5,'opacity=".3"')}
      ${rect(x,y,w,h,C.paper,5,
        `stroke="${color}" stroke-width="2.5"`)}
      ${rect(x+4,y+4,w-8,8,color,3)}
      ${text(x+w/2,y+h/2+10,label,11,C.ink)}
    </g>
  `;

  const body = `
    <defs>
      <linearGradient id="w11a-ground" x1="0" y1="0" x2="0" y2="1">
        <stop stop-color="${C.blue}" stop-opacity=".65"/>
        <stop offset="1" stop-color="${C.paper}" stop-opacity=".1"/>
      </linearGradient>
    </defs>

    ${text(170,24,"FROM DESIGN TO REALITY",13,C.navy)}

    <g class="a-blueprint kin">
      ${rect(24,81,292,238,"url(#w11a-ground)",12,
        `stroke="${C.muted}" stroke-width="1.5"`)}
      ${Array.from({length:9},(_,j)=>
        path(`M${39+j*32} 83 V315`,C.muted,.7,
          'opacity=".23"')).join("")}
      ${Array.from({length:7},(_,j)=>
        path(`M25 ${95+j*32} H315`,C.muted,.7,
          'opacity=".23"')).join("")}
      ${path("M65 260 V140 H270 V260 H65",C.navy,3,
        'stroke-dasharray="9 7"')}
      ${path("M110 140 V260 M225 140 V260",C.navy,1.5,
        'opacity=".5"')}
      ${text(170,199,"DESIGN",18,C.navy)}
      ${text(170,220,"APPROVED",12,C.navy)}
    </g>

    <g class="a-crane kin">
      ${path("M170 49 V103",C.navy,4)}
      ${path("M76 49 H273",C.navy,5)}
      ${path("M170 49 L118 70 M170 49 L222 70",C.navy,2)}
      ${circle(170,49,7,C.orange)}
      <g class="a-hook kin">
        ${path("M170 101 V139",C.orange,3)}
        ${path("M158 138 Q170 156 182 138",C.orange,4)}
      </g>
    </g>

    <g class="a-building kin" opacity="0">
      ${rect(64,128,212,170,C.blue,9,
        `stroke="${C.navy}" stroke-width="3"`)}
      ${rect(77,142,186,142,C.paper,5)}
      ${path("M77 190 H263 M77 238 H263",C.navy,2,
        'opacity=".35"')}
      ${path("M123 142 V284 M217 142 V284",C.navy,2,
        'opacity=".35"')}
      ${rect(145,250,50,48,C.navy,5)}
      ${rect(151,256,38,33,C.blue,3)}
      ${circle(170,274,5,C.green)}
    </g>

    ${block(87,149,75,43,C.navy,"SYSTEMS","a-system")}
    ${block(181,149,75,43,C.orange,"RULES","a-rules")}
    ${block(87,203,75,43,C.green,"PEOPLE","a-people")}
    ${block(181,203,75,43,C.navy,"TESTING","a-testing")}

    <g class="a-data kin" opacity="0">
      ${path("M162 171 H181",C.green,4)}
      ${path("M162 224 H181",C.green,4)}
      ${path("M124 192 V203 M219 192 V203",C.green,3)}
      ${circle(170,171,5,C.gold)}
      ${circle(170,224,5,C.gold)}
    </g>

    <g class="a-guest kin" opacity="0">
      ${person(70,312,C.navy,.8)}
      ${rect(84,309,12,17,C.orange,2)}
    </g>

    <g class="a-warning kin" opacity="0">
      ${circle(170,275,20,C.orange)}
      ${text(170,282,"!",24,C.paper)}
    </g>

    <g class="a-gate kin" opacity="0">
      ${rect(142,252,56,48,C.green,6)}
      ${check(170,274,C.paper,1.2)}
    </g>

    <g class="a-elevator kin" opacity="0">
      ${path("M170 139 V250",C.green,5)}
      ${circle(170,139,8,C.green)}
      ${circle(170,250,8,C.green)}
    </g>

    <g class="a-evidence kin" opacity="0">
      ${circle(170,214,83,"none",
        `stroke="${C.green}" stroke-width="4"
         stroke-dasharray="7 7"`)}
      ${check(170,211,C.green,2)}
    </g>

    ${glint}
  `;

  function render(i, n, isReset = false) {
    if (!root) return;

    const b = beat(i, cuts);
    const built = b >= 2;

    const apply = () => {
      show(root,".a-building",built);

      show(root,".a-system",b>=3);
      show(root,".a-rules",b>=3);
      show(root,".a-people",b>=6);
      show(root,".a-testing",b>=8);

      show(root,".a-data",b>=5);
      show(root,".a-guest",b>=4);
      show(root,".a-warning",b>=7&&b<=9);
      show(root,".a-gate",b>=10);
      show(root,".a-elevator",b>=5);
      show(root,".a-evidence",b>=10);

      set(root,".a-blueprint",{
        opacity:built?".16":"1",
        transform:built
          ?"translateY(15px) scale(.91)"
          :"translateY(0) scale(1)"
      });

      const descent = b<2 ? -48 : b<4 ? -8 : 20;
      move(root,".a-hook",0,descent);

      const activeBlocks = [
        [".a-system",3],
        [".a-rules",4],
        [".a-people",6],
        [".a-testing",8]
      ];

      activeBlocks.forEach(([selector,threshold],j)=>{
        if (b>=threshold) {
          move(root,selector,0,0,1,0);
        } else {
          move(root,selector,0,-45-j*8,.72,-5);
        }
      });

      move(root,".a-guest",
        b>=10?90:b>=7?75:b>=4?28:0,0);

      move(root,".a-warning",
        0,b===7?-10:0,b>=7?1:.5);

      set(root,".a-data",{
        opacity:b>=5?"1":"0"
      });

      if (!isReset) {
        const jitter = (i%4)*2;
        move(root,".a-crane",jitter-3,0);
      }

      update(root,i,n,labels[b],"track");
    };

    if (isReset) instant(root,apply);
    else apply();
  }

  window.VL_SCENES["W11O1a"] = {
    build(el) {
      root = mount(el,"W11O1a",body,
        "Architectural construction site turning an approved process blueprint into tested operating capability");
      render(0,30,true);
    },
    step(i,n) {
      render(safeIndex(i,n),n);
    },
    reset() {
      render(0,30,true);
    }
  };
}

// ============================================================
// SCENE 2 · W11O1b
// THE FOUR-ROUTE DEVELOPMENT COMPASS
//
// Original visual concept:
// Four physical technology mechanisms occupy separate stations
// on a rotating industrial compass.
//
// BUY: sealed standard product.
// CONFIGURE: adjustable sliders.
// EXTEND: additional module docking to a platform.
// BUILD: independent construction mechanism.
//
// A central decision needle turns toward each option.
// Strategic fit, support and future responsibility emerge
// through moving connections.
//
// Narration indices: 0–27.
// ============================================================

{
  let root = null;

  const cuts = [2,4,6,9,12,15,18,21,24,26];

  const labels = [
    "FOUR DEVELOPMENT ROUTES",
    "CHOOSING THE RIGHT FIT",
    "BUY STANDARD",
    "CONFIGURE SETTINGS",
    "EXTEND CAPABILITY",
    "BUILD CUSTOM",
    "CONTROL AND RESPONSIBILITY",
    "DIFFERENT BUSINESS NEEDS",
    "FUTURE OBLIGATIONS",
    "PROTECT PROCESS FIT",
    "A DEFENSIBLE CHOICE"
  ];

  const station = (x,y,color,label,icon,cls) => `
    <g class="b-route kin ${cls}">
      ${circle(x,y,48,C.paper,
        `stroke="${color}" stroke-width="3"`)}
      ${circle(x,y,39,C.blue,'opacity=".36"')}
      ${icon}
      ${text(x,y+37,label,11,color)}
    </g>
  `;

  const buyIcon = `
    ${rect(147,73,46,37,C.navy,5)}
    ${rect(153,79,34,25,C.paper,3)}
    ${path("M160 91 H180",C.green,4)}
  `;

  const configIcon = `
    ${rect(231,166,53,48,C.blue,6,
      `stroke="${C.orange}" stroke-width="2"`)}
    ${path("M243 177 V204 M258 177 V204 M273 177 V204",
      C.navy,2)}
    ${circle(243,185,5,C.orange)}
    ${circle(258,196,5,C.orange)}
    ${circle(273,181,5,C.orange)}
  `;

  const extendIcon = `
    ${rect(148,270,43,29,C.navy,5)}
    ${rect(155,277,29,15,C.paper,3)}
    ${rect(193,275,19,19,C.green,3)}
    ${path("M191 284 H196",C.green,3)}
  `;

  const buildIcon = `
    ${path("M53 175 L74 158 L95 175 V207 H53Z",
      C.navy,3)}
    ${path("M74 158 V207",C.orange,2)}
    ${path("M53 175 H95",C.orange,2)}
    ${rect(63,183,22,24,C.paper,3)}
  `;

  const body = `
    ${text(170,23,"FOUR ROUTES · ONE PURPOSE",13,C.navy)}

    <g class="b-carousel kin">
      ${circle(170,188,133,"none",
        `stroke="${C.blue}" stroke-width="12"`)}
      ${circle(170,188,112,"none",
        `stroke="${C.navy}" stroke-width="1.5"
         stroke-dasharray="4 9" opacity=".4"`)}
      ${path("M170 56 V320 M38 188 H302",C.muted,2,
        'opacity=".35"')}

      ${station(170,93,C.navy,"BUY",buyIcon,"b-buy")}
      ${station(265,188,C.orange,"CONFIGURE",
        configIcon,"b-config")}
      ${station(170,283,C.green,"EXTEND",
        extendIcon,"b-extend")}
      ${station(75,188,C.navy,"BUILD",
        buildIcon,"b-build")}
    </g>

    <g class="b-compass kin">
      ${circle(170,188,57,C.paper,
        `stroke="${C.navy}" stroke-width="3"`)}
      ${circle(170,188,46,C.blue,'opacity=".55"')}
      ${circle(170,188,33,C.paper)}
      ${text(170,181,"PROCESS",12,C.navy)}
      ${text(170,197,"FIT",15,C.navy)}
      <g class="b-needle kin">
        ${path("M170 188 L170 140",C.orange,5)}
        ${path("M160 153 L170 135 L180 153Z",
          C.orange,2)}
      </g>
      ${circle(170,188,6,C.navy)}
    </g>

    <g class="b-beam kin" opacity="0">
      ${path("M170 188 L170 93",C.green,4)}
      ${circle(170,93,8,C.green)}
    </g>

    <g class="b-halo kin" opacity="0">
      ${circle(170,188,143,"none",
        `stroke="${C.green}" stroke-width="4"
         stroke-dasharray="8 9"`)}
    </g>

    <g class="b-warning kin" opacity="0">
      ${circle(170,188,29,C.orange)}
      ${text(170,198,"!",30,C.paper)}
    </g>

    <g class="b-choice kin" opacity="0">
      ${circle(170,188,32,C.green)}
      ${check(170,188,C.paper,1.25)}
    </g>

    ${glint}
  `;

  function render(i,n,isReset=false) {
    if (!root) return;

    const b = beat(i,cuts);

    const selected =
      b<=2 ? 0 :
      b===3 ? 1 :
      b===4 ? 2 :
      b===5 ? 3 :
      b===6 ? 2 :
      b===7 ? 0 :
      b===8 ? 1 :
      b===9 ? 2 : 0;

    const angles = [0,90,180,270];
    const angle = angles[selected];

    const apply = () => {
      const needle = one(root,".b-needle");
      if (needle) {
        needle.style.transform =
          `rotate(${angle}deg)`;
        needle.style.transformOrigin = "170px 188px";
      }

      const stations = [
        ".b-buy",".b-config",".b-extend",".b-build"
      ];

      stations.forEach((selector,j)=>{
        const active = b<2 || j===selected;
        set(root,selector,{
          opacity:active?"1":".34",
          transform:active
            ?"scale(1.08)"
            :"scale(.86)"
        });
      });

      set(root,".b-carousel",{
        transform:
          `rotate(${b<2?0:(i%5-2)*1.4}deg)`
      });

      show(root,".b-beam",b>=2&&b<=9);
      show(root,".b-warning",b===6||b===8);
      show(root,".b-choice",b===10);
      show(root,".b-halo",b>=9);

      set(root,".b-beam",{
        transform:`rotate(${angle}deg)`,
        transformOrigin:"170px 188px"
      });

      set(root,".b-halo",{
        transform:`rotate(${i*9}deg)`
      });

      if (b===3) {
        const sliders = all(root,".b-config circle");
        sliders.forEach((el,j)=>{
          el.style.transform =
            `translateY(${Math.sin(i+j)*6}px)`;
        });
      }

      if (b===4) {
        move(root,".b-extend",
          0,-4+(i%3)*4,1.08);
      }

      update(root,i,n,labels[b],"orbit");
    };

    if (isReset) instant(root,apply);
    else apply();
  }

  window.VL_SCENES["W11O1b"] = {
    build(el) {
      root = mount(el,"W11O1b",body,
        "Rotating development compass with four distinct mechanisms for buying, configuring, extending and building technology");
      render(0,28,true);
    },
    step(i,n) {
      render(safeIndex(i,n),n);
    },
    reset() {
      render(0,28,true);
    }
  };
}

// ============================================================
// SCENE 3 · W11O1c
// THE DESIGN-DRIFT FAULT LINE
//
// Original visual concept:
// An approved process rests on a physical platform.
// Vendor limitations produce cracks.
// Each seemingly minor compromise separates another piece
// of the intended operating process.
//
// A governance bridge must span the fracture.
// Business approval stabilises the reconstructed structure.
//
// Animation language:
// Structural fracture, sliding fragments, exposed gaps,
// bridge construction, decision seal, restored alignment.
//
// Narration indices: 0–27.
// ============================================================

{
  let root = null;

  const cuts = [2,4,6,9,12,14,17,20,23,25,27];

  const labels = [
    "THE APPROVED PROCESS",
    "A SOFTWARE LIMITATION",
    "THE FIRST COMPROMISE",
    "CONSTRAINT OR CHOICE",
    "THE DESIGN BEGINS DRIFTING",
    "SMALL CHANGES ACCUMULATE",
    "RECORD THE DEVIATION",
    "NAME THE AUTHORITY",
    "EXAMINE FUTURE COSTS",
    "BUILD THE GOVERNANCE BRIDGE",
    "PROTECT THE IMPROVEMENT",
    "AN AUTHORISED DECISION"
  ];

  const body = `
    <defs>
      <linearGradient id="w11c-surface" x1="0" y1="0"
        x2="0" y2="1">
        <stop stop-color="${C.blue}"/>
        <stop offset="1" stop-color="${C.paper}"/>
      </linearGradient>
    </defs>

    ${text(170,23,"PROTECT THE APPROVED DESIGN",13,C.navy)}

    <g class="c-platform kin">
      ${rect(35,118,270,151,"url(#w11c-surface)",12,
        `stroke="${C.navy}" stroke-width="3"`)}
      ${rect(47,130,246,126,C.paper,6)}
      ${path("M47 176 H293 M47 218 H293",
        C.blue,2)}
      ${path("M109 130 V256 M231 130 V256",
        C.blue,2)}

      <g class="c-fragment c-left kin">
        ${rect(49,157,110,71,C.blue,6)}
        ${path("M66 192 H142",C.navy,5)}
        ${circle(80,176,8,C.green)}
        ${text(104,213,"DESIGN",12,C.navy)}
      </g>

      <g class="c-fragment c-right kin">
        ${rect(181,157,110,71,C.blue,6)}
        ${path("M196 192 H271",C.navy,5)}
        ${circle(259,176,8,C.green)}
        ${text(236,213,"OUTCOME",12,C.navy)}
      </g>
    </g>

    <g class="c-crack-group kin" opacity="0">
      ${path(
        "M170 122 L155 149 L180 172 L157 193 " +
        "L184 220 L166 245 L175 271",
        C.orange,5,'class="c-crack kin"'
      )}
      ${path(
        "M155 149 L138 160 M180 172 L199 163 " +
        "M157 193 L139 211 M184 220 L204 237",
        C.orange,2.5
      )}
    </g>

    <g class="c-vendor kin" opacity="0">
      ${rect(107,55,126,43,C.navy,9)}
      ${text(170,74,"VENDOR",12,C.paper)}
      ${text(170,89,"LIMITATION",11,C.paper)}
      ${path("M170 99 V121",C.orange,3)}
    </g>

    <g class="c-drift kin" opacity="0">
      ${circle(170,195,42,C.paper,
        `stroke="${C.orange}" stroke-width="4"`)}
      ${text(170,188,"DESIGN",13,C.orange)}
      ${text(170,204,"DRIFT",15,C.orange)}
    </g>

    <g class="c-concessions kin" opacity="0">
      ${circle(69,291,12,C.orange)}
      ${circle(111,307,12,C.orange)}
      ${circle(153,317,12,C.orange)}
      ${circle(195,317,12,C.orange)}
      ${circle(237,307,12,C.orange)}
      ${circle(279,291,12,C.orange)}
    </g>

    <g class="c-bridge-group kin" opacity="0">
      ${path(
        "M60 242 Q170 185 280 242",
        C.green,9,'class="c-bridge kin"'
      )}
      ${path("M85 233 V262 M125 217 V262 " +
        "M170 213 V262 M215 217 V262 M255 233 V262",
        C.green,3)}
    </g>

    <g class="c-authority kin" opacity="0">
      ${circle(170,92,35,C.paper,
        `stroke="${C.green}" stroke-width="3"`)}
      ${text(170,87,"NAMED",12,C.navy)}
      ${text(170,102,"OWNER",12,C.green)}
    </g>

    <g class="c-cost kin" opacity="0">
      ${path("M82 321 H258",C.navy,3)}
      ${Array.from({length:4},(_,j)=>`
        ${rect(98+j*46,321-(j+1)*13,
          25,(j+1)*13,
          j%2?C.orange:C.navy,3)}
      `).join("")}
      ${text(170,356,"FOUR-YEAR VIEW",12,C.navy)}
    </g>

    <g class="c-stamp kin" opacity="0">
      ${circle(170,194,55,"none",
        `stroke="${C.green}" stroke-width="5"`)}
      ${circle(170,194,45,"none",
        `stroke="${C.green}" stroke-width="1.5"`)}
      ${check(170,194,C.green,2)}
    </g>

    <g class="c-restored kin" opacity="0">
      ${rect(59,277,222,35,C.green,17)}
      ${text(170,300,"APPROVED CHANGE",13,C.paper)}
    </g>

    ${glint}
  `;

  function render(i,n,isReset=false) {
    if (!root) return;

    const b = beat(i,cuts);

    const apply = () => {
      const fractured = b>=2&&b<10;
      const severe = b>=4&&b<10;

      show(root,".c-vendor",b>=1&&b<=5);
      show(root,".c-crack-group",fractured);
      show(root,".c-drift",b>=4&&b<=6);
      show(root,".c-concessions",b>=5&&b<=8);
      show(root,".c-bridge-group",b>=9);
      show(root,".c-authority",b>=7);
      show(root,".c-cost",b===8);
      show(root,".c-stamp",b>=10);
      show(root,".c-restored",b>=11);

      set(root,".c-crack",{
        strokeDashoffset:fractured?"0":"260"
      });

      set(root,".c-bridge",{
        strokeDashoffset:b>=9?"0":"280"
      });

      move(root,".c-left",
        severe?-15:b>=2?-6:0,
        severe?8:0,
        1,
        severe?-4:0
      );

      move(root,".c-right",
        severe?17:b>=2?7:0,
        severe?-7:0,
        1,
        severe?5:0
      );

      set(root,".c-platform",{
        transform:b===5
          ?"rotate(-3deg) translateY(5px)"
          :b>=10
            ?"rotate(0deg) translateY(0)"
            :"rotate(0deg)"
      });

      if (b>=5&&b<=8) {
        all(root,".c-concessions circle").forEach(
          (el,j)=>{
            el.style.transform =
              `translateY(${(i+j)%4*3}px)`;
            el.style.opacity =
              j<=Math.min(5,i-12)?"1":".25";
          }
        );
      }

      if (b>=9) {
        move(root,".c-bridge-group",
          0,b===9?4:0,1);
      }

      if (b>=10) {
        move(root,".c-stamp",0,0,1,0);
      } else {
        move(root,".c-stamp",0,-35,.65,0);
      }

      update(root,i,n,labels[b],"inspect");
    };

    if (isReset) instant(root,apply);
    else apply();
  }

  window.VL_SCENES["W11O1c"] = {
    build(el) {
      root = mount(el,"W11O1c",body,
        "Approved process platform developing structural fractures as technology compromises accumulate, followed by a governance bridge and authorised repair");
      render(0,28,true);
    },
    step(i,n) {
      render(safeIndex(i,n),n);
    },
    reset() {
      render(0,28,true);
    }
  };
}

// END PART 1 OF 4
// Scenes: W11O3a, W11O3b, W11O3c

// ============================================================
// SCENE 4 · W11O3a
// THE VENDOR C CAPABILITY SCANNER
//
// Original visual concept:
// A physical corporate-rate agreement travels through a
// diagnostic machine. Vendor C can transport the request,
// but its standard mechanism cannot evaluate the agreement.
//
// A scanning lens exposes the missing decision mechanism.
// Two alternative mechanical routes then emerge:
// manual approval routing and automatic rules evaluation.
//
// Narration indices: 0–25.
// ============================================================

{
  let root = null;

  const cuts = [2,4,6,8,10,12,14,16,18,20,23,25];

  const labels = [
    "VENDOR C SELECTED",
    "INSPECT THE CAPABILITY",
    "THE APPROVED DESIGN",
    "THE ARRIVAL WAIT",
    "ROUTING IS NOT EVALUATION",
    "THE MISSING DECISION",
    "THE OVERNIGHT QUEUE",
    "A RELOCATED BOTTLENECK",
    "ADD AGREEMENT RULES",
    "AUTOMATIC EVALUATION",
    "COMPARE THE ROUTES",
    "PROTECT PROCESS FIT",
    "THE REAL REQUIREMENT"
  ];

  const body = `
    <defs>
      <linearGradient id="w11d-metal" x1="0" y1="0"
        x2="1" y2="1">
        <stop stop-color="${C.blue}"/>
        <stop offset=".48" stop-color="${C.paper}"/>
        <stop offset="1" stop-color="${C.muted}"/>
      </linearGradient>
      <linearGradient id="w11d-beam" x1="0" y1="0"
        x2="0" y2="1">
        <stop stop-color="${C.green}" stop-opacity="0"/>
        <stop offset=".5" stop-color="${C.green}"
          stop-opacity=".35"/>
        <stop offset="1" stop-color="${C.green}"
          stop-opacity="0"/>
      </linearGradient>
    </defs>

    ${text(170,23,"INSIDE VENDOR C",13,C.navy)}

    <g class="d-machine kin">
      ${rect(43,84,254,220,"url(#w11d-metal)",19,
        `stroke="${C.navy}" stroke-width="3"`)}
      ${rect(56,98,228,192,C.paper,11)}
      ${rect(70,114,200,139,C.blue,9)}
      ${path("M79 143 H261 M79 222 H261",
        C.navy,2,'opacity=".22"')}
      ${rect(91,126,158,115,C.paper,9,
        `stroke="${C.muted}" stroke-width="2"`)}
    </g>

    <g class="d-conveyor kin">
      ${rect(30,263,280,26,C.navy,8)}
      ${Array.from({length:10},(_,j)=>
        circle(47+j*27,276,7,C.blue)).join("")}
      ${path("M30 291 H310",C.muted,2)}
    </g>

    <g class="d-agreement kin">
      ${rect(103,145,65,77,C.paper,5,
        `stroke="${C.navy}" stroke-width="2.5"`)}
      ${rect(111,154,49,8,C.navy,3)}
      ${path("M113 175 H157 M113 186 H151 M113 197 H157",
        C.muted,2)}
      ${circle(147,208,8,C.orange)}
      ${text(147,212,"C",9,C.paper)}
    </g>

    <g class="d-router kin" opacity="0">
      ${circle(214,181,31,C.navy)}
      ${path("M194 181 H233 M223 170 L234 181 L223 192",
        C.paper,4)}
      ${text(214,229,"ROUTE",11,C.navy)}
    </g>

    <g class="d-missing kin" opacity="0">
      ${circle(214,181,37,C.paper,
        `stroke="${C.orange}" stroke-width="4"
         stroke-dasharray="6 6"`)}
      ${text(214,192,"?",35,C.orange)}
    </g>

    <g class="d-scanner kin" opacity="0">
      ${rect(66,122,208,12,"url(#w11d-beam)",4)}
      ${path("M66 128 H274",C.green,2)}
      ${circle(65,128,6,C.green)}
      ${circle(275,128,6,C.green)}
    </g>

    <g class="d-queue kin" opacity="0">
      ${rect(72,317,196,41,C.blue,12)}
      ${Array.from({length:5},(_,j)=>`
        ${rect(86+j*35,327,24,21,
          j<4?C.orange:C.paper,4)}
      `).join("")}
      ${text(170,374,"MANUAL APPROVAL",11,C.orange)}
    </g>

    <g class="d-rules kin" opacity="0">
      ${circle(214,181,40,C.green)}
      ${path("M195 181 L207 193 L231 165",
        C.paper,6)}
      ${text(214,235,"RULES",12,C.green)}
    </g>

    <g class="d-rate kin" opacity="0">
      ${rect(115,316,110,39,C.green,13)}
      ${text(170,341,"RATE SET",14,C.paper)}
    </g>

    <g class="d-clock kin" opacity="0">
      ${circle(170,57,25,C.paper,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${path("M170 42 V57 L184 66",C.orange,3)}
      ${text(170,94,"47 MIN",11,C.orange)}
    </g>

    <g class="d-choice kin" opacity="0">
      ${path("M170 307 L110 340 M170 307 L230 340",
        C.navy,3)}
      ${circle(110,340,12,C.orange)}
      ${circle(230,340,12,C.green)}
    </g>

    ${glint}
  `;

  function render(i,n,isReset=false) {
    if (!root) return;

    const b = beat(i,cuts);

    const apply = () => {
      show(root,".d-router",b>=4&&b<=7);
      show(root,".d-missing",b>=5&&b<=8);
      show(root,".d-scanner",b>=2&&b<=11);
      show(root,".d-queue",b>=6&&b<=7);
      show(root,".d-rules",b>=8&&b<=10);
      show(root,".d-rate",b>=9);
      show(root,".d-clock",b>=3&&b<=7);
      show(root,".d-choice",b>=10&&b<=11);

      const agreementX =
        b<2?0:b<5?37:b<8?66:b<11?95:120;

      move(root,".d-agreement",
        agreementX,
        b===5?8:b>=9?-5:0,
        b>=9?.82:1);

      move(root,".d-scanner",
        0,
        b>=5?105:(i%5)*23,
        1);

      set(root,".d-conveyor",{
        transform:`translateX(${(i%4)*3-5}px)`
      });

      set(root,".d-machine",{
        transform:b===5
          ?"translateY(-3px)"
          :"translateY(0)"
      });

      if (b>=6&&b<=7) {
        all(root,".d-queue rect").forEach((el,j)=>{
          if(j>0) {
            el.style.opacity =
              j<=Math.min(5,i-11)?"1":".3";
          }
        });
      }

      if (b>=8) {
        move(root,".d-rules",
          0,0,1+(i%3)*.025);
      }

      update(root,i,n,labels[b],"inspect");
    };

    if (isReset) instant(root,apply);
    else apply();
  }

  window.VL_SCENES["W11O3a"] = {
    build(el) {
      root = mount(el,"W11O3a",body,
        "Vendor C diagnostic machine scanning a corporate agreement and exposing the difference between approval routing and automatic rule evaluation");
      render(0,26,true);
    },
    step(i,n) {
      render(safeIndex(i,n),n);
    },
    reset() {
      render(0,26,true);
    }
  };
}

// ============================================================
// SCENE 5 · W11O3b
// THREE OPTIONS, THREE DIFFERENT FUTURES
//
// Original visual concept:
// A three-track railway junction represents three genuinely
// different futures for the same corporate-rate booking.
//
// CONFIGURE:
// The train enters a staffed overnight approval station.
//
// EXTEND:
// The train passes through an automatic rules engine,
// but the track crosses an unsupported upgrade bridge.
//
// CHANGE:
// The track divides into 71% resolved and 29% old path.
//
// Narration indices: 0–29.
// ============================================================

{
  let root = null;

  const cuts = [
    2,4,6,8,10,12,14,16,18,20,22,24,26,28
  ];

  const labels = [
    "THREE POSSIBLE FUTURES",
    "COMPARE THE ROUTES",
    "CONFIGURE THE WORKFLOW",
    "AED 180,000 · SIX WEEKS",
    "THE OVERNIGHT STATION",
    "TWO EXTRA SHIFTS",
    "EXTEND THE SYSTEM",
    "AED 540,000 · FOUR MONTHS",
    "AUTOMATIC AGREEMENT RULES",
    "UNSUPPORTED UPGRADE",
    "CHANGE THE DESIGN",
    "AED 95,000 · THREE WEEKS",
    "71% RESOLVED",
    "29% OLD APPROVAL",
    "CHOOSE THE FUTURE"
  ];

  const rail = (d,color,width=5,extra="") =>
    path(d,color,width,
      `stroke-dasharray="8 6" ${extra}`);

  const body = `
    <defs>
      <linearGradient id="w11e-track" x1="0" y1="0"
        x2="0" y2="1">
        <stop stop-color="${C.blue}"/>
        <stop offset="1" stop-color="${C.paper}"/>
      </linearGradient>
    </defs>

    ${text(170,22,"THE DEVELOPMENT JUNCTION",13,C.navy)}

    <g class="e-ground">
      ${rect(16,55,308,293,
        "url(#w11e-track)",19)}
      ${Array.from({length:7},(_,j)=>
        path(`M25 ${82+j*40} H315`,
          C.muted,1,'opacity=".18"')).join("")}
    </g>

    <g class="e-rails">
      ${rail("M170 342 V285",C.navy,7)}
      ${rail("M170 285 Q170 247 72 227 V101",
        C.navy,6)}
      ${rail("M170 285 V101",C.green,6)}
      ${rail("M170 285 Q170 247 268 227 V101",
        C.orange,6)}
    </g>

    <g class="e-config-station kin">
      ${rect(28,72,88,63,C.paper,9,
        `stroke="${C.navy}" stroke-width="3"`)}
      ${rect(38,82,68,12,C.navy,3)}
      ${text(72,92,"CONFIGURE",10,C.paper)}
      ${person(57,117,C.navy,.45)}
      ${person(87,117,C.orange,.45)}
      ${text(72,149,"6 WEEKS",11,C.navy)}
    </g>

    <g class="e-extend-station kin">
      ${circle(170,102,46,C.paper,
        `stroke="${C.green}" stroke-width="3"`)}
      ${circle(170,102,34,C.blue)}
      ${Array.from({length:8},(_,j)=>`
        <rect x="165" y="58" width="10" height="12"
          rx="2" fill="${C.green}"
          transform="rotate(${j*45} 170 102)"/>
      `).join("")}
      ${circle(170,102,22,C.paper)}
      ${check(170,102,C.green,.85)}
      ${text(170,157,"4 MONTHS",11,C.green)}
    </g>

    <g class="e-change-station kin">
      ${rect(223,72,91,63,C.paper,9,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${rect(234,82,69,12,C.orange,3)}
      ${text(268,92,"CHANGE",11,C.paper)}
      ${path("M268 101 V125 M268 111 L249 125 " +
        "M268 111 L287 125",C.orange,3)}
      ${text(268,149,"3 WEEKS",11,C.orange)}
    </g>

    <g class="e-train kin">
      ${rect(-23,-15,46,30,C.navy,9)}
      ${rect(-16,-9,16,13,C.blue,3)}
      ${rect(5,-9,12,13,C.blue,3)}
      ${circle(-13,17,6,C.ink)}
      ${circle(13,17,6,C.ink)}
      ${rect(-8,-23,16,8,C.orange,3)}
    </g>

    <g class="e-night kin" opacity="0">
      ${circle(55,179,20,C.navy)}
      ${circle(63,172,18,C.paper)}
      ${text(72,211,"OVERNIGHT",11,C.navy)}
    </g>

    <g class="e-shifts kin" opacity="0">
      ${person(50,250,C.orange,.65)}
      ${person(90,250,C.orange,.65)}
      ${text(70,283,"2 SHIFTS",12,C.orange)}
    </g>

    <g class="e-auto kin" opacity="0">
      ${circle(170,194,34,C.green)}
      ${check(170,194,C.paper,1.15)}
      ${text(170,245,"AUTO RULES",12,C.green)}
    </g>

    <g class="e-upgrade kin" opacity="0">
      ${path("M123 263 H217",C.orange,5,
        'stroke-dasharray="5 8"')}
      ${path("M145 251 L158 275 M183 251 L196 275",
        C.orange,4)}
      ${text(170,293,"UNSUPPORTED",11,C.orange)}
    </g>

    <g class="e-coverage kin" opacity="0">
      ${circle(268,190,47,C.paper,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${path("M268 190 V143 A47 47 0 1 1 222 180 Z",
        C.green,2,`fill="${C.green}"`)}
      ${text(268,187,"71%",20,C.paper)}
      ${text(268,207,"29% OLD",11,C.orange)}
    </g>

    <g class="e-price kin" opacity="0">
      ${rect(91,357,158,28,C.navy,12)}
      ${text(170,375,"AED 180,000",12,C.paper)}
    </g>

    <g class="e-decision kin" opacity="0">
      ${circle(170,283,38,C.paper,
        `stroke="${C.green}" stroke-width="4"`)}
      ${text(170,279,"WHICH",12,C.navy)}
      ${text(170,296,"FUTURE?",12,C.green)}
    </g>

    ${glint}
  `;

  function render(i,n,isReset=false) {
    if (!root) return;

    const b = beat(i,cuts);

    let route = 0;
    if(b>=6&&b<=9) route=1;
    if(b>=10&&b<=13) route=2;
    if(b===14) route=1;

    const destinations = [
      [72,168],
      [170,175],
      [268,168]
    ];

    const apply = () => {
      const [tx,ty] = destinations[route];

      const travel = b<2 ? 0 :
        b===14 ? 1 :
        clamp((i-cuts[Math.max(0,b-1)]+1)/3,0,1);

      const x = 170+(tx-170)*travel;
      const y = 328+(ty-328)*travel;

      const train = one(root,".e-train");
      if(train) {
        train.setAttribute("transform",
          `translate(${x} ${y})`);
      }

      const stations = [
        ".e-config-station",
        ".e-extend-station",
        ".e-change-station"
      ];

      stations.forEach((selector,j)=>{
        set(root,selector,{
          opacity:b<2||b===14||j===route?"1":".3",
          transform:j===route&&b>=2
            ?"scale(1.06)"
            :"scale(1)"
        });
      });

      show(root,".e-night",b>=4&&b<=5);
      show(root,".e-shifts",b===5);
      show(root,".e-auto",b>=8&&b<=9);
      show(root,".e-upgrade",b===9);
      show(root,".e-coverage",b>=12&&b<=13);
      show(root,".e-price",b>=3&&b<=11);
      show(root,".e-decision",b===14);

      const price =
        route===0?"AED 180,000":
        route===1?"AED 540,000":
        "AED 95,000";

      set(root,".e-price text",{text:price});

      set(root,".e-price rect",{
        fill:route===0?C.navy:
          route===1?C.green:C.orange
      });

      if(b===5) {
        move(root,".e-shifts",
          0,(i%3)*-3);
      }

      if(b===8) {
        move(root,".e-auto",
          0,0,1+(i%3)*.04);
      }

      if(b>=12&&b<=13) {
        move(root,".e-coverage",
          0,0,1+(i%3)*.025);
      }

      update(root,i,n,labels[b],"track");
    };

    if(isReset) instant(root,apply);
    else apply();
  }

  window.VL_SCENES["W11O3b"] = {
    build(el) {
      root = mount(el,"W11O3b",body,
        "Three-track railway junction comparing configuration with overnight staff, automatic rules extension with upgrade exposure, and design change with incomplete coverage");
      render(0,30,true);
    },
    step(i,n) {
      render(safeIndex(i,n),n);
    },
    reset() {
      render(0,30,true);
    }
  };
}

// ============================================================
// SCENE 6 · W11O3c
// THE FOUR-YEAR DECISION OBSERVATORY
//
// Original visual concept:
// A mechanical observatory examines the three development
// futures through a four-year horizon.
//
// Initial prices appear as solid physical weights.
// Unknown recurring costs remain translucent, unmeasured
// masses rather than invented numerical estimates.
//
// A second celestial body represents the January regulatory
// commitment. The shared delivery team must navigate
// both obligations without collision.
//
// Narration indices: 0–27.
// ============================================================

{
  let root = null;

  const cuts = [
    2,4,6,8,10,12,14,16,18,20,22,24,26
  ];

  const labels = [
    "LOOK BEYOND THE PRICE",
    "THE APPROVED IMPROVEMENT",
    "KNOWN INITIAL COSTS",
    "THE PRICE DIFFERENCE",
    "RECURRING OVERNIGHT WORK",
    "UNKNOWN STAFFING COST",
    "UNSUPPORTED UPGRADES",
    "UNKNOWN MAINTENANCE COST",
    "THE 29% SERVICE GAP",
    "THE JANUARY DEADLINE",
    "COMPETING TEAM CAPACITY",
    "THE FOUR-YEAR HORIZON",
    "A CONDITIONAL DECISION",
    "DEFEND THE OPERATING FUTURE"
  ];

  const body = `
    <defs>
      <radialGradient id="w11f-sky">
        <stop stop-color="${C.blue}" stop-opacity=".85"/>
        <stop offset="1" stop-color="${C.paper}"
          stop-opacity=".05"/>
      </radialGradient>
    </defs>

    ${text(170,22,"THE DECISION OBSERVATORY",13,C.navy)}

    <g class="f-observatory">
      ${circle(170,183,143,"url(#w11f-sky)")}
      ${circle(170,183,116,"none",
        `stroke="${C.navy}" stroke-width="2"
         stroke-dasharray="5 8" opacity=".25"`)}
      ${circle(170,183,86,"none",
        `stroke="${C.green}" stroke-width="2"
         opacity=".25"`)}
      ${path("M170 42 V326 M28 183 H312",
        C.muted,1,'opacity=".2"')}
    </g>

    <g class="f-telescope kin">
      ${path("M128 292 L170 204 L212 292",
        C.navy,7)}
      ${rect(145,290,50,12,C.navy,5)}
      <g class="f-lens kin">
        ${rect(126,137,103,38,C.navy,12)}
        ${rect(212,130,24,52,C.blue,8,
          `stroke="${C.navy}" stroke-width="3"`)}
        ${circle(223,156,16,C.paper,
          `stroke="${C.green}" stroke-width="3"`)}
        ${circle(223,156,8,C.green)}
        ${path("M125 147 L101 135 M125 166 L101 179",
          C.navy,4)}
      </g>
    </g>

    <g class="f-costs kin" opacity="0">
      ${rect(38,71,264,70,C.paper,12,
        `stroke="${C.navy}" stroke-width="2"`)}
      ${rect(52,117,54,10,C.orange,4)}
      ${rect(117,93,54,34,C.navy,4)}
      ${rect(182,77,54,50,C.green,4)}
      ${text(79,109,"95K",12,C.orange)}
      ${text(144,85,"180K",12,C.navy)}
      ${text(209,69,"540K",12,C.green)}
      ${text(170,136,"INITIAL AED",10,C.navy)}
    </g>

    <g class="f-unknown kin" opacity="0">
      ${circle(88,201,42,C.blue,
        `stroke="${C.orange}" stroke-width="2"
         stroke-dasharray="5 6"`)}
      ${text(88,209,"?",36,C.orange)}
      ${circle(252,201,42,C.blue,
        `stroke="${C.navy}" stroke-width="2"
         stroke-dasharray="5 6"`)}
      ${text(252,209,"?",36,C.navy)}
    </g>

    <g class="f-shifts kin" opacity="0">
      ${person(75,233,C.orange,.75)}
      ${person(109,233,C.orange,.75)}
      ${text(92,265,"2 SHIFTS",11,C.orange)}
    </g>

    <g class="f-upgrade kin" opacity="0">
      ${circle(247,230,29,C.paper,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${path("M235 220 L258 243 M258 220 L235 243",
        C.orange,4)}
      ${text(247,273,"UPGRADES",11,C.orange)}
    </g>

    <g class="f-gap kin" opacity="0">
      ${circle(170,184,59,C.paper,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${text(170,177,"29%",26,C.orange)}
      ${text(170,199,"OLD PATH",12,C.navy)}
    </g>

    <g class="f-january kin" opacity="0">
      ${circle(268,85,36,C.orange)}
      ${text(268,83,"JAN",15,C.paper)}
      ${text(268,99,"DEADLINE",9,C.paper)}
      ${path("M241 111 Q215 141 192 161",
        C.orange,3,'stroke-dasharray="5 5"')}
    </g>

    <g class="f-capacity kin" opacity="0">
      ${path("M85 305 H255",C.navy,4)}
      ${circle(110,305,20,C.navy)}
      ${circle(230,305,20,C.orange)}
      ${text(110,310,"A",13,C.paper)}
      ${text(230,310,"B",13,C.paper)}
      ${path("M170 287 V322",C.green,5)}
      ${circle(170,284,9,C.green)}
    </g>

    <g class="f-years kin" opacity="0">
      ${path("M42 344 H298",C.navy,3)}
      ${Array.from({length:4},(_,j)=>`
        ${circle(65+j*70,344,10,
          j%2?C.green:C.navy)}
        ${text(65+j*70,372,
          "Y"+(j+1),12,C.navy)}
      `).join("")}
    </g>

    <g class="f-decision kin" opacity="0">
      ${circle(170,184,60,C.paper,
        `stroke="${C.green}" stroke-width="4"`)}
      ${text(170,174,"EVIDENCE",14,C.navy)}
      ${text(170,195,"BEFORE",12,C.green)}
      ${text(170,212,"COMMITMENT",12,C.green)}
    </g>

    ${glint}
  `;

  function render(i,n,isReset=false) {
    if(!root) return;

    const b = beat(i,cuts);

    const apply = () => {
      show(root,".f-costs",b>=2&&b<=4);
      show(root,".f-unknown",
        b===5||b===7||b>=11&&b<=12);
      show(root,".f-shifts",b>=4&&b<=5);
      show(root,".f-upgrade",b>=6&&b<=7);
      show(root,".f-gap",b===8);
      show(root,".f-january",b>=9&&b<=12);
      show(root,".f-capacity",b>=10&&b<=12);
      show(root,".f-years",b>=11);
      show(root,".f-decision",b>=12);

      const angles = [
        -20,-13,-6,4,12,-14,
        19,-18,7,24,-9,0,0,0
      ];

      set(root,".f-lens",{
        transform:`rotate(${angles[b]+
          Math.sin(i*.6)*2}deg)`,
        transformOrigin:"170px 183px"
      });

      set(root,".f-telescope",{
        opacity:b>=12?".25":"1"
      });

      if(b>=9&&b<=12) {
        move(root,".f-january",
          Math.sin(i*.5)*5,
          Math.cos(i*.4)*3);
      }

      if(b===10||b===11) {
        set(root,".f-capacity",{
          transform:
            `rotate(${Math.sin(i*.6)*5}deg)`,
          transformOrigin:"170px 305px"
        });
      }

      if(b>=11) {
        all(root,".f-years circle").forEach((el,j)=>{
          el.style.opacity =
            j<=Math.floor((i-22)/2)?"1":".35";
        });
      }

      update(root,i,n,labels[b],"orbit");
    };

    if(isReset) instant(root,apply);
    else apply();
  }

  window.VL_SCENES["W11O3c"] = {
    build(el) {
      root = mount(el,"W11O3c",body,
        "Mechanical four-year decision observatory distinguishing known initial costs, unknown operating obligations, unsupported upgrades and the competing January regulatory deadline");
      render(0,28,true);
    },
    step(i,n) {
      render(safeIndex(i,n),n);
    },
    reset() {
      render(0,28,true);
    }
  };
}

// END PART 2 OF 4
// Scenes: W11O3d, W11O3e, W11O3f

// ============================================================
// SCENE 7 · W11O3d
// THE EVIDENCE FORGE
//
// Original visual concept:
// A large industrial press transforms uncertain claims into
// testable evidence. Requirements enter from the left;
// demonstrations, contracts, costs and operational tests
// arrive as separate physical components.
//
// The press cannot close while a critical evidence gap
// remains. When evidence is sufficient, the mechanism
// produces a conditional decision token.
//
// No generic cards: this is an animated industrial machine.
// ============================================================

{
  let root = null;

  const labels = [
    "CLAIMS ENTER",
    "SEPARATE THE CLAIMS",
    "REQUIREMENTS FIRST",
    "DEMONSTRATE THE RULE",
    "TEST REAL CONDITIONS",
    "VERIFY THE CONTRACT",
    "MEASURE THE COST",
    "EXPOSE THE GAPS",
    "ASSIGN THE EVIDENCE",
    "CLOSE THE GAPS",
    "PRESS THE DECISION",
    "CONDITIONAL APPROVAL"
  ];

  const cuts = [2,4,6,8,10,12,14,16,19,22,25];

  const body = `
    <defs>
      <linearGradient id="w11g-steel" x1="0" y1="0"
        x2="1" y2="1">
        <stop stop-color="${C.blue}"/>
        <stop offset=".5" stop-color="${C.paper}"/>
        <stop offset="1" stop-color="${C.muted}"/>
      </linearGradient>
    </defs>

    ${text(170,23,"THE EVIDENCE FORGE",13,C.navy)}

    <g class="g-frame">
      ${rect(44,67,252,257,
        "url(#w11g-steel)",13,
        `stroke="${C.navy}" stroke-width="3"`)}
      ${rect(66,91,208,209,C.paper,8)}
      ${rect(83,108,174,171,C.blue,7)}
      ${rect(97,117,146,150,C.paper,5)}
    </g>

    <g class="g-piston kin">
      ${rect(145,45,50,91,C.navy,8)}
      ${rect(154,58,32,65,C.blue,4)}
      ${rect(105,126,130,32,C.orange,5)}
      ${path("M114 143 H226",C.paper,3)}
    </g>

    <g class="g-anvil">
      ${rect(91,244,158,24,C.navy,5)}
      ${rect(110,267,120,24,C.muted,5)}
      ${rect(79,291,182,18,C.navy,5)}
    </g>

    <g class="g-claims kin">
      ${rect(20,186,76,48,C.paper,7,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${text(58,205,"VENDOR",11,C.orange)}
      ${text(58,220,"CLAIMS",11,C.orange)}
      ${path("M96 210 H126",C.orange,3)}
    </g>

    <g class="g-requirement kin" opacity="0">
      ${rect(128,181,84,51,C.paper,7,
        `stroke="${C.navy}" stroke-width="3"`)}
      ${text(170,200,"PROCESS",12,C.navy)}
      ${text(170,216,"NEED",12,C.navy)}
    </g>

    <g class="g-evidence kin" opacity="0">
      ${circle(116,194,18,C.green)}
      ${check(116,194,C.paper,.55)}
      ${circle(170,194,18,C.green)}
      ${check(170,194,C.paper,.55)}
      ${circle(224,194,18,C.green)}
      ${check(224,194,C.paper,.55)}
    </g>

    <g class="g-contract kin" opacity="0">
      ${rect(126,174,88,62,C.paper,5,
        `stroke="${C.navy}" stroke-width="2"`)}
      ${path("M138 188 H202 M138 199 H193 M138 210 H202",
        C.muted,2)}
      ${check(183,221,C.green,.6)}
    </g>

    <g class="g-cost kin" opacity="0">
      ${circle(170,201,39,C.paper,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${text(170,198,"FOUR",15,C.navy)}
      ${text(170,215,"YEARS",13,C.orange)}
    </g>

    <g class="g-gap kin" opacity="0">
      ${circle(170,205,37,C.orange)}
      ${text(170,216,"?",37,C.paper)}
      ${path("M127 167 L145 184 M213 167 L195 184",
        C.orange,4)}
    </g>

    <g class="g-owner kin" opacity="0">
      ${person(287,203,C.navy,.8)}
      ${path("M268 207 H232",C.green,3)}
      ${circle(232,207,5,C.green)}
    </g>

    <g class="g-sparks kin" opacity="0">
      ${sparkle(103,163)}
      ${sparkle(238,164)}
      ${sparkle(91,224)}
      ${sparkle(250,225)}
    </g>

    <g class="g-token kin" opacity="0">
      ${circle(170,206,43,C.green)}
      ${circle(170,206,34,"none",
        `stroke="${C.paper}" stroke-width="2"`)}
      ${check(170,205,C.paper,1.15)}
    </g>

    <g class="g-output kin" opacity="0">
      ${rect(83,332,174,35,C.green,12)}
      ${text(170,354,"EVIDENCE GATE",12,C.paper)}
    </g>

    ${glint}
  `;

  function render(i,n,isReset=false) {
    if(!root) return;

    const b = beat(i,cuts);

    const apply = () => {
      show(root,".g-claims",b<=3);
      show(root,".g-requirement",b>=2&&b<=3);
      show(root,".g-evidence",b>=3&&b<=5);
      show(root,".g-contract",b===5);
      show(root,".g-cost",b===6);
      show(root,".g-gap",b>=7&&b<=8);
      show(root,".g-owner",b>=8&&b<=9);
      show(root,".g-sparks",b>=9);
      show(root,".g-token",b>=10);
      show(root,".g-output",b>=11);

      const pressY =
        b<3?-36:
        b<7?-12:
        b<9?-31:
        b===9?5:
        b>=10?15:0;

      move(root,".g-piston",0,pressY);

      move(root,".g-claims",
        b>=2?55:b>=1?27:0,
        b>=2?4:0,
        b>=2?.8:1);

      if(b>=3&&b<=5) {
        all(root,".g-evidence circle").forEach((el,j)=>{
          el.style.opacity =
            j<=Math.floor((i-6)/2)?"1":".25";
        });
      }

      if(b===7||b===8) {
        move(root,".g-gap",
          Math.sin(i*1.4)*5,0,
          1+(i%3)*.04);
      }

      if(b>=10) {
        move(root,".g-token",
          0,b===10?0:20,
          b===10?.75:1);
      }

      update(root,i,n,labels[b],"inspect");
    };

    if(isReset) instant(root,apply);
    else apply();
  }

  window.VL_SCENES["W11O3d"] = {
    build(el) {
      root = mount(el,"W11O3d",body,
        "Industrial evidence forge pressing vendor claims, process requirements, demonstrations, contracts and costs into an evidence-gated decision");
      render(0,27,true);
    },
    step(i,n) {
      render(safeIndex(i,n),n);
    },
    reset() {
      render(0,27,true);
    }
  };
}

// ============================================================
// SCENE 8 · W11O3e
// THE DECISION CHAMBER
//
// Original visual concept:
// A suspended three-sided balance mechanism compares
// configuration, extension and redesign.
//
// Each option has a distinct physical mass.
// The balance shifts as operational burdens appear.
// A transparent evidence lens separates known facts
// from unresolved assumptions.
//
// The final mechanism locks only after decision rights,
// conditions and consequences have been made explicit.
// ============================================================

{
  let root = null;

  const cuts = [
    2,4,6,8,10,12,14,16,18,20,22,24,26
  ];

  const labels = [
    "THREE REAL CHOICES",
    "WEIGH THE CONSEQUENCES",
    "CONFIGURE",
    "RECURRING STAFF COST",
    "EXTEND",
    "AUTOMATION AND SUPPORT",
    "CHANGE THE DESIGN",
    "THE SERVICE GAP",
    "COMPARE FOUR YEARS",
    "PROTECT JANUARY",
    "EXPLICIT CONDITIONS",
    "DECISION AUTHORITY",
    "RECORD THE TRADE-OFF",
    "LOCK THE DECISION"
  ];

  const body = `
    ${text(170,22,"THE DECISION CHAMBER",13,C.navy)}

    <g class="h-ceiling">
      ${rect(39,49,262,17,C.navy,6)}
      ${path("M170 66 V111",C.navy,5)}
      ${circle(170,110,12,C.orange)}
    </g>

    <g class="h-balance kin">
      ${path("M56 145 H284",C.navy,7)}
      ${path("M170 111 V145",C.navy,5)}
      ${circle(170,145,11,C.orange)}

      ${path("M70 145 V212 M170 145 V212 M270 145 V212",
        C.navy,2.5)}

      <g class="h-pan-config kin">
        ${path("M34 212 Q70 240 106 212",
          C.navy,4)}
        ${rect(48,179,44,30,C.navy,5)}
        ${text(70,198,"CFG",11,C.paper)}
      </g>

      <g class="h-pan-extend kin">
        ${path("M134 212 Q170 240 206 212",
          C.green,4)}
        ${rect(148,169,44,40,C.green,5)}
        ${text(170,193,"EXT",11,C.paper)}
      </g>

      <g class="h-pan-change kin">
        ${path("M234 212 Q270 240 306 212",
          C.orange,4)}
        ${rect(248,185,44,24,C.orange,5)}
        ${text(270,201,"CHG",11,C.paper)}
      </g>
    </g>

    <g class="h-staff kin" opacity="0">
      ${person(70,266,C.orange,.65)}
      ${person(102,266,C.orange,.65)}
      ${text(86,296,"2 SHIFTS",11,C.orange)}
    </g>

    <g class="h-support kin" opacity="0">
      ${circle(170,272,29,C.paper,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${path("M157 258 L183 284 M183 258 L157 284",
        C.orange,4)}
      ${text(170,315,"NO SUPPORT",11,C.orange)}
    </g>

    <g class="h-gap kin" opacity="0">
      ${circle(270,267,31,C.paper,
        `stroke="${C.orange}" stroke-width="3"`)}
      ${text(270,266,"29%",17,C.orange)}
      ${text(270,281,"GAP",11,C.navy)}
    </g>

    <g class="h-horizon kin" opacity="0">
      ${path("M45 323 H295",C.navy,3)}
      ${Array.from({length:4},(_,j)=>`
        ${circle(69+j*67,323,9,C.green)}
        ${text(69+j*67,346,
          "Y"+(j+1),11,C.navy)}
      `).join("")}
    </g>

    <g class="h-january kin" opacity="0">
      ${rect(106,73,128,39,C.orange,10)}
      ${text(170,89,"JANUARY",12,C.paper)}
      ${text(170,103,"COMMITMENT",10,C.paper)}
    </g>

    <g class="h-lens kin" opacity="0">
      ${circle(170,184,79,C.paper,
        `stroke="${C.green}" stroke-width="3"
         opacity=".94"`)}
      ${circle(170,184,66,"none",
        `stroke="${C.navy}" stroke-width="2"`)}
      ${text(170,177,"KNOWN",14,C.navy)}
      ${path("M121 186 H219",C.muted,2)}
      ${text(170,202,"UNKNOWN",14,C.orange)}
    </g>

    <g class="h-authority kin" opacity="0">
      ${circle(170,183,53,C.paper,
        `stroke="${C.navy}" stroke-width="4"`)}
      ${text(170,178,"DECISION",13,C.navy)}
      ${text(170,196,"OWNER",13,C.green)}
    </g>

    <g class="h-lock kin" opacity="0">
      ${rect(144,171,52,48,C.green,8)}
      ${path("M154 173 V158 Q154 141 170 141 " +
        "Q186 141 186 158 V173",
        C.green,7)}
      ${circle(170,190,6,C.paper)}
      ${path("M170 196 V204",C.paper,3)}
    </g>

    ${glint}
  `;

  function render(i,n,isReset=false) {
    if(!root) return;

    const b = beat(i,cuts);

    const apply = () => {
      show(root,".h-staff",b===3);
      show(root,".h-support",b===5);
      show(root,".h-gap",b===7);
      show(root,".h-horizon",b>=8);
      show(root,".h-january",b>=9&&b<=10);
      show(root,".h-lens",b===10);
      show(root,".h-authority",b===11||b===12);
      show(root,".h-lock",b>=13);

      const tilts = [
        0,2,-5,-8,4,8,-3,-7,
        0,3,0,0,0,0
      ];

      set(root,".h-balance",{
        transform:
          `rotate(${tilts[b]+
            Math.sin(i*.7)*.8}deg)`,
        transformOrigin:"170px 145px"
      });

      const selected =
        b>=2&&b<=3?0:
        b>=4&&b<=5?1:
        b>=6&&b<=7?2:-1;

      const pans = [
        ".h-pan-config",
        ".h-pan-extend",
        ".h-pan-change"
      ];

      pans.forEach((selector,j)=>{
        set(root,selector,{
          opacity:selected<0||selected===j?"1":".3",
          transform:selected===j
            ?"translateY(7px) scale(1.08)"
            :"translateY(0) scale(1)"
        });
      });

      if(b===8) {
        all(root,".h-horizon circle").forEach((el,j)=>{
          el.style.opacity =
            j<=Math.floor((i-16)/2)?"1":".3";
        });
      }

      if(b>=13) {
        move(root,".h-lock",
          0,0,1+(i%3)*.025);
      }

      update(root,i,n,labels[b],"orbit");
    };

    if(isReset) instant(root,apply);
    else apply();
  }

  window.VL_SCENES["W11O3e"] = {
    build(el) {
      root = mount(el,"W11O3e",body,
        "Suspended three-sided decision balance comparing configuration, extension and design change under operating costs, support risks, service gaps and governance conditions");
      render(0,28,true);
    },
    step(i,n) {
      render(safeIndex(i,n),n);
    },
    reset() {
      render(0,28,true);
    }
  };
}

// ============================================================
// SCENE 9 · W11O3f
// THE DEVELOPMENT-TO-IMPLEMENT LAUNCH BRIDGE
//
// Original visual concept:
// A miniature spacecraft stands at the end of the Develop
// phase. Its launch is not triggered by a date or a vendor
// promise.
//
// Five mechanical clamps represent readiness conditions.
// Each clamp releases only when its evidence is visible.
//
// The launch vehicle then crosses a physical bridge into
// Implement, carrying the approved decision record.
//
// This is a cinematic transition, not a readiness checklist.
// ============================================================

{
  let root = null;

  const cuts = [
    2,4,6,8,10,12,14,16,18,20,22,24,26
  ];

  const labels = [
    "THE LAUNCH BRIDGE",
    "DESIGN TO DELIVERY",
    "DECISION RECORDED",
    "CAPABILITY VERIFIED",
    "COSTS UNDERSTOOD",
    "OWNERS ASSIGNED",
    "EXCEPTIONS TESTED",
    "READINESS CONDITIONS",
    "RELEASE THE CLAMPS",
    "THE DELIVERY HANDOFF",
    "CARRY THE EVIDENCE",
    "CROSS INTO IMPLEMENT",
    "THE NEXT PHASE",
    "READY TO LAUNCH"
  ];

  const clampGraphic = (x,y,rotation,color,cls) => `
    <g class="i-clamp kin ${cls}"
      transform="translate(${x} ${y}) rotate(${rotation})">
      ${rect(-25,-9,50,18,color,5)}
      ${rect(-34,-15,13,30,color,4)}
      ${path("M-20 -9 V9",C.paper,2)}
    </g>
  `;

  const body = `
    <defs>
      <linearGradient id="w11i-sky" x1="0" y1="0"
        x2="0" y2="1">
        <stop stop-color="${C.blue}" stop-opacity=".75"/>
        <stop offset="1" stop-color="${C.paper}"/>
      </linearGradient>
      <linearGradient id="w11i-flame" x1="0" y1="0"
        x2="0" y2="1">
        <stop stop-color="${C.gold}"/>
        <stop offset="1" stop-color="${C.orange}"/>
      </linearGradient>
    </defs>

    ${text(170,23,"THE IMPLEMENT LAUNCH",13,C.navy)}

    ${rect(16,44,308,288,
      "url(#w11i-sky)",15)}

    <g class="i-stars">
      ${circle(47,82,2,C.muted)}
      ${circle(292,92,3,C.gold)}
      ${circle(65,161,2,C.muted)}
      ${circle(280,173,2,C.muted)}
      ${sparkle(260,66,C.muted)}
      ${sparkle(79,108,C.muted)}
    </g>

    <g class="i-launchpad">
      ${rect(49,291,242,24,C.navy,6)}
      ${rect(79,315,182,13,C.muted,4)}
      ${path("M80 291 V240 M260 291 V240",
        C.navy,5)}
      ${path("M80 240 H260",C.navy,4)}
      ${text(170,344,"DEVELOP",12,C.navy)}
    </g>

    <g class="i-bridge kin" opacity="0">
      ${path("M170 300 Q230 278 310 215",
        C.green,8)}
      ${path("M170 286 Q230 264 310 201",
        C.green,3)}
      ${circle(310,207,12,C.green)}
    </g>

    <g class="i-rocket kin">
      ${path("M170 78 Q207 115 207 194 " +
        "L195 235 H145 L133 194 " +
        "Q133 115 170 78Z",
        C.navy,3,`fill="${C.paper}"`)}
      ${path("M170 78 Q189 99 198 130 H142 " +
        "Q151 99 170 78Z",
        C.orange,2,`fill="${C.orange}"`)}
      ${circle(170,158,25,C.blue,
        `stroke="${C.navy}" stroke-width="4"`)}
      ${circle(170,158,13,C.paper)}
      ${path("M145 199 L119 238 V256 L145 235Z",
        C.navy,2,`fill="${C.navy}"`)}
      ${path("M195 199 L221 238 V256 L195 235Z",
        C.navy,2,`fill="${C.navy}"`)}
      ${rect(153,229,34,13,C.orange,3)}
    </g>

    <g class="i-flame kin" opacity="0">
      <path d="M155 240 Q139 271 170 306
        Q201 271 185 240Z"
        fill="url(#w11i-flame)"/>
      <path d="M162 242 Q152 268 170 289
        Q188 268 178 242Z"
        fill="${C.paper}"/>
    </g>

    ${clampGraphic(126,150,0,C.navy,"i-c1")}
    ${clampGraphic(214,150,180,C.navy,"i-c2")}
    ${clampGraphic(125,202,0,C.orange,"i-c3")}
    ${clampGraphic(215,202,180,C.orange,"i-c4")}
    ${clampGraphic(170,247,90,C.green,"i-c5")}

    <g class="i-decision kin" opacity="0">
      ${rect(147,167,46,37,C.green,5)}
      ${check(170,185,C.paper,.8)}
    </g>

    <g class="i-capability kin" opacity="0">
      ${circle(170,158,16,C.green)}
      ${check(170,158,C.paper,.55)}
    </g>

    <g class="i-owner kin" opacity="0">
      ${person(79,264,C.navy,.65)}
      ${person(261,264,C.green,.65)}
    </g>

    <g class="i-target kin" opacity="0">
      ${circle(295,177,34,C.paper,
        `stroke="${C.green}" stroke-width="3"`)}
      ${text(295,172,"NEXT",12,C.navy)}
      ${text(295,189,"PHASE",12,C.green)}
    </g>

    <g class="i-success kin" opacity="0">
      ${circle(170,171,65,"none",
        `stroke="${C.green}" stroke-width="4"
         stroke-dasharray="8 9"`)}
      ${text(170,267,"READY",17,C.green)}
    </g>

    ${glint}
  `;

  function render(i,n,isReset=false) {
    if(!root) return;

    const b = beat(i,cuts);

    const released = clamp(
      b>=8?5:
      b>=7?4:
      b>=6?3:
      b>=5?2:
      b>=4?1:0,0,5);

    const apply = () => {
      show(root,".i-decision",b>=2&&b<=8);
      show(root,".i-capability",b>=3&&b<=8);
      show(root,".i-owner",b>=5&&b<=9);
      show(root,".i-bridge",b>=9);
      show(root,".i-flame",b>=11);
      show(root,".i-target",b>=11);
      show(root,".i-success",b>=13);

      const clamps = [
        ".i-c1",".i-c2",".i-c3",
        ".i-c4",".i-c5"
      ];

      clamps.forEach((selector,j)=>{
        const open = j<released;
        set(root,selector,{
          opacity:open?".18":"1"
        });

        const dx =
          j===0||j===2?-39:
          j===1||j===3?39:0;

        const dy = j===4?35:0;

        move(root,selector,
          open?dx:0,
          open?dy:0,
          open?.82:1);
      });

      const rise =
        b<9?0:
        b===9?-8:
        b===10?-20:
        b===11?-45:
        b===12?-90:-120;

      const drift =
        b>=11?(i%4)*7:0;

      move(root,".i-rocket",
        drift,rise,
        b>=12?.92:1);

      move(root,".i-flame",
        drift,rise,
        1+(i%3)*.09);

      if(b>=9) {
        set(root,".i-bridge",{
          transform:`translateY(${b>=11?-3:0}px)`
        });
      }

      if(b>=13) {
        set(root,".i-success",{
          transform:`rotate(${i*6}deg)`,
          transformOrigin:"170px 171px"
        });
      }

      update(root,i,n,labels[b],"track");
    };

    if(isReset) instant(root,apply);
    else apply();
  }

  window.VL_SCENES["W11O3f"] = {
    build(el) {
      root = mount(el,"W11O3f",body,
        "Development launch vehicle restrained by five evidence and readiness clamps, progressively released to cross a physical bridge into the Implement phase");
      render(0,28,true);
    },
    step(i,n) {
      render(safeIndex(i,n),n);
    },
    reset() {
      render(0,28,true);
    }
  };
}

// END PART 3 OF 4
// Final integration, responsive corrections, lifecycle safety,
// and closure of the Week 11 scene registry.


// ============================================================
// FINAL CINEMATIC INTEGRATION
// ============================================================

// The previous parts register nine original scenes:
//
// W11O1a  Process construction site
// W11O1b  Four-route development compass
// W11O1c  Design-drift fault line
// W11O3a  Vendor C capability scanner
// W11O3b  Three-future railway junction
// W11O3c  Four-year decision observatory
// W11O3d  Evidence forge
// W11O3e  Three-sided decision chamber
// W11O3f  Implement launch bridge
//
// The following integration layer preserves the requested
// build(el), step(i,n), reset() contract while adding:
//
// 1. Safe scene rebuilding.
// 2. Consistent narration-moment progression.
// 3. GSAP tween cleanup.
// 4. Reduced-motion support.
// 5. Responsive SVG presentation.
// 6. Deterministic reset.
// 7. Safe handling of missing or invalid arguments.
// 8. Scene isolation across successive builds.

const W11_SCENE_IDS = [
  "W11O1a",
  "W11O1b",
  "W11O1c",
  "W11O3a",
  "W11O3b",
  "W11O3c",
  "W11O3d",
  "W11O3e",
  "W11O3f"
];

const W11_DEFAULT_MOMENTS = {
  W11O1a: 30,
  W11O1b: 28,
  W11O1c: 28,
  W11O3a: 26,
  W11O3b: 30,
  W11O3c: 28,
  W11O3d: 27,
  W11O3e: 28,
  W11O3f: 28
};


// ------------------------------------------------------------
// RESPONSIVE PRESENTATION
// ------------------------------------------------------------

const W11_FINAL_CSS = `
  /* Scene container */

  ${W11_SCENE_IDS.map(id =>
    `.vls-w11-${id}`
  ).join(",\n")} {
    display:block;
    position:relative;
    width:100%;
    height:100%;
    min-height:0;
    overflow:hidden;
    background:transparent;
    contain:layout style;
  }

  /* Preserve full cinematic compositions */

  ${W11_SCENE_IDS.map(id =>
    `.vls-w11-${id} .vls-w11-stage`
  ).join(",\n")} {
    position:absolute;
    inset:0 0 24px;
    display:flex;
    align-items:center;
    justify-content:center;
    min-width:0;
    min-height:0;
    overflow:visible;
    transform-origin:center center;
  }

  ${W11_SCENE_IDS.map(id =>
    `.vls-w11-${id} .vls-w11-stage > svg`
  ).join(",\n")} {
    display:block;
    width:100%;
    height:100%;
    max-width:100%;
    max-height:100%;
    overflow:visible;
    flex:none;
  }

  /* Short labels remain legible on narrow phones. */

  ${W11_SCENE_IDS.map(id =>
    `.vls-w11-${id} .vls-w11-caption`
  ).join(",\n")} {
    position:absolute;
    left:3%;
    right:3%;
    bottom:5px;
    min-height:16px;
    display:flex;
    align-items:center;
    justify-content:center;
    text-align:center;
    font-size:clamp(9px,2.7vw,11px);
    line-height:1.2;
    font-weight:700;
    letter-spacing:.025em;
    pointer-events:none;
  }

  /* Cinematic entrance of scene objects. */

  ${W11_SCENE_IDS.map(id =>
    `.vls-w11-${id} .kin`
  ).join(",\n")} {
    transition:
      opacity .72s cubic-bezier(.2,.7,.2,1),
      transform .88s cubic-bezier(.2,.75,.2,1),
      fill .72s ease,
      stroke .72s ease,
      stroke-dashoffset .95s ease;
  }

  /* Very narrow phone */

  @media(max-width:375px) {
    ${W11_SCENE_IDS.map(id =>
      `.vls-w11-${id} .vls-w11-stage`
    ).join(",\n")} {
      inset:0 0 21px;
    }

    ${W11_SCENE_IDS.map(id =>
      `.vls-w11-${id} .vls-w11-caption`
    ).join(",\n")} {
      bottom:4px;
      font-size:10px;
      letter-spacing:0;
    }
  }

  /* Reduced motion */

  @media(prefers-reduced-motion:reduce) {
    ${W11_SCENE_IDS.map(id =>
      `.vls-w11-${id} .kin`
    ).join(",\n")} {
      transition:none!important;
      animation:none!important;
    }

    ${W11_SCENE_IDS.map(id =>
      `.vls-w11-${id} .vls-w11-stage`
    ).join(",\n")} {
      transition:none!important;
    }
  }
`;

// Append to the single existing stylesheet.
// Do not create a second style element.

{
  const sheet = document.getElementById("vl-sc-w11");

  if(sheet && !sheet.dataset.finalized) {
    sheet.appendChild(
      document.createTextNode(W11_FINAL_CSS)
    );
    sheet.dataset.finalized = "1";
  }
}


// ------------------------------------------------------------
// LIFECYCLE SAFETY
// ------------------------------------------------------------

function w11KillTweens(root) {
  if(!root || !window.gsap) return;

  try {
    const nodes = [
      root,
      ...root.querySelectorAll("*")
    ];

    window.gsap.killTweensOf(nodes);
  } catch(_) {
    // GSAP is optional.
  }
}

function w11ValidElement(el) {
  return !!(
    el &&
    el.nodeType === 1 &&
    typeof el.replaceChildren === "function"
  );
}

function w11NormalizeMoment(i,n,fallback) {
  const total =
    Number.isFinite(Number(n)) && Number(n)>0
      ? Math.floor(Number(n))
      : fallback;

  const index =
    Number.isFinite(Number(i))
      ? Math.floor(Number(i))
      : 0;

  return {
    i:clamp(index,0,total-1),
    n:total
  };
}


// ------------------------------------------------------------
// MOMENT TRANSITION ACCENTS
// ------------------------------------------------------------

// These accents supplement, rather than replace, the unique
// semantic movements implemented by each scene.
//
// The light point travels along a different path for every
// narration index. The camera also changes its framing.
//
// This ensures that two consecutive narration moments never
// leave the entire illustration visually identical.

function w11MomentAccent(root,id,i,n) {
  if(!root) return;

  const glint = root.querySelector(".vls-w11-glint");
  if(!glint) return;

  const paths = {
    W11O1a:k=>[
      45+(k*29)%240,
      95+(k*37)%205
    ],

    W11O1b:k=>[
      170+112*Math.cos(k*.59),
      188+112*Math.sin(k*.59)
    ],

    W11O1c:k=>[
      58+(k*31)%225,
      145+(k*19)%120
    ],

    W11O3a:k=>[
      70+(k*41)%200,
      122+(k*23)%135
    ],

    W11O3b:k=>[
      170+92*Math.sin(k*.52),
      320-180*Math.abs(Math.sin(k*.37))
    ],

    W11O3c:k=>[
      170+117*Math.cos(k*.43),
      183+117*Math.sin(k*.43)
    ],

    W11O3d:k=>[
      100+(k*31)%140,
      140+(k*29)%125
    ],

    W11O3e:k=>[
      60+(k*37)%220,
      145+(k*17)%95
    ],

    W11O3f:k=>[
      170+65*Math.sin(k*.47),
      235-130*Math.abs(Math.sin(k*.39))
    ]
  };

  const point = paths[id]
    ? paths[id](i)
    : [170,188];

  glint.setAttribute(
    "transform",
    `translate(${point[0]} ${point[1]})`
  );

  glint.style.opacity =
    reduced() ? "0" : ".48";

  const dots = root.querySelectorAll(
    ".vls-w11-progress"
  );

  dots.forEach(bar=>{
    const ratio = (i+1)/Math.max(1,n);
    bar.style.width =
      `${clamp(ratio,0,1)*100}%`;
  });
}


// ------------------------------------------------------------
// SCENE REGISTRY FINALIZATION
// ------------------------------------------------------------

// Preserve the original scene implementations.
// The wrapper handles repeated builds and scene replacement.
//
// Important:
// Existing scene renderers use their own closure-level root.
// The active-root guard prevents updates to a stale container.

W11_SCENE_IDS.forEach(id=>{

  const scene = window.VL_SCENES[id];

  if(!scene ||
     typeof scene.build!=="function" ||
     typeof scene.step!=="function" ||
     typeof scene.reset!=="function") {
    return;
  }

  if(scene.__w11Finalized) return;

  const originalBuild = scene.build.bind(scene);
  const originalStep = scene.step.bind(scene);
  const originalReset = scene.reset.bind(scene);

  let activeRoot = null;
  let activeHost = null;
  let currentIndex = 0;
  let currentTotal = W11_DEFAULT_MOMENTS[id] || 1;

  scene.build = function(el) {
    if(!w11ValidElement(el)) return;

    if(activeRoot) {
      w11KillTweens(activeRoot);
    }

    activeHost = el;
    currentIndex = 0;
    currentTotal = W11_DEFAULT_MOMENTS[id] || 1;

    originalBuild(el);

    activeRoot = el.querySelector(
      `.vls-w11-${id}`
    );

    if(activeRoot) {
      activeRoot.dataset.moment = "0";
      activeRoot.dataset.total =
        String(currentTotal);

      w11MomentAccent(
        activeRoot,id,0,currentTotal
      );
    }
  };

  scene.step = function(i,n) {
    if(!activeRoot ||
       !activeHost ||
       !activeHost.contains(activeRoot)) {
      return;
    }

    const moment = w11NormalizeMoment(
      i,n,currentTotal
    );

    currentIndex = moment.i;
    currentTotal = moment.n;

    originalStep(
      currentIndex,currentTotal
    );

    activeRoot.dataset.moment =
      String(currentIndex);

    activeRoot.dataset.total =
      String(currentTotal);

    w11MomentAccent(
      activeRoot,
      id,
      currentIndex,
      currentTotal
    );
  };

  scene.reset = function() {
    if(!activeRoot ||
       !activeHost ||
       !activeHost.contains(activeRoot)) {
      return;
    }

    w11KillTweens(activeRoot);

    currentIndex = 0;

    originalReset();

    activeRoot.dataset.moment = "0";

    w11MomentAccent(
      activeRoot,
      id,
      0,
      currentTotal
    );
  };

  Object.defineProperty(
    scene,
    "__w11Finalized",
    {
      value:true,
      configurable:false,
      enumerable:false
    }
  );

});


// ------------------------------------------------------------
// OPTIONAL DIAGNOSTIC VALIDATION
// ------------------------------------------------------------

// This check is deliberately non-fatal.
// The application may register additional scenes elsewhere.

const W11_MISSING_SCENES =
  W11_SCENE_IDS.filter(id=>{
    const scene = window.VL_SCENES[id];

    return !scene ||
      typeof scene.build!=="function" ||
      typeof scene.step!=="function" ||
      typeof scene.reset!=="function";
  });

if(W11_MISSING_SCENES.length) {
  console.warn(
    "[VoiceLearn Week 11] Missing scene registrations:",
    W11_MISSING_SCENES.join(", ")
  );
}


// ------------------------------------------------------------
// END OF WEEK 11 SCENE ENGINE
// ------------------------------------------------------------

})();

// OPER621 · Week 11 · Lesson 3 cinematic scene patch
// Sections: W11O2a, W11O2b, W11O2c
// Load AFTER weeks/week11/scenes-week.js.
// Standalone IIFE; no dependency on the original scene helpers.
// Does not overwrite any of the nine existing scene registrations.

(() => {
"use strict";

window.VL_SCENES = window.VL_SCENES || {};

const C = {
  navy:"#1f4e79", orange:"#c0502a", paper:"#fbf8f1",
  ink:"#1b2a3a", blue:"#dbe7f2", green:"#317c61",
  gold:"#e5b76c", muted:"#91aabd", pale:"#e8f1ed"
};

const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
const reduced = () => !!(window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches);
const num = (v,f=0) => Number.isFinite(Number(v)) ? Number(v) : f;
const idx = (i,n) => clamp(Math.floor(num(i)),0,Math.max(1,Math.floor(num(n,1)))-1);
const beat = (i,cuts) => cuts.reduce((a,c)=>a+(i>=c?1:0),0);
const R = (x,y,w,h,fill,rx=0,extra="") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`;
const O = (x,y,r,fill,extra="") =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
const P = (d,color=C.navy,w=2,extra="") =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const T = (x,y,s,size=12,color=C.ink,extra="") =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="${color}" ${extra}>${s}</text>`;
const tick = (x,y,color=C.green,s=1) =>
  P(`M${x-10*s} ${y} l${7*s} ${8*s} ${17*s} ${-19*s}`,color,4*s);
const person = (x,y,color=C.navy,s=1) =>
  `<g transform="translate(${x} ${y}) scale(${s})">${O(0,-13,9,color)}<path d="M-16 16 Q-16 -2 0 -2 Q16 -2 16 16Z" fill="${color}"/></g>`;

function mount(el,id,body,description) {
  if(!el || el.nodeType!==1 || !el.replaceChildren) return null;
  const root=document.createElement("div");
  root.className=`vls-w11-${id}`;
  root.innerHTML=`
    <div class="vls-w11b-stage">
      <svg viewBox="0 0 340 390" preserveAspectRatio="xMidYMid meet"
           role="img" aria-label="${description}">
        ${body}
      </svg>
    </div>
    <div class="vls-w11b-caption" aria-hidden="true"></div>
    <div class="vls-w11b-progress" aria-hidden="true"></div>`;
  el.replaceChildren(root);
  return root;
}

const one=(root,s)=>root?.querySelector(s);
const all=(root,s)=>root?[...root.querySelectorAll(s)]:[];

function show(root,s,on) {
  all(root,s).forEach(e=>e.style.opacity=on?"1":"0");
}
function move(root,s,x=0,y=0,scale=1,rot=0) {
  all(root,s).forEach(e=>{
    e.style.transform=`translate(${x}px,${y}px) rotate(${rot}deg) scale(${scale})`;
  });
}
function attr(root,s,k,v) {
  all(root,s).forEach(e=>e.setAttribute(k,String(v)));
}
function text(root,s,v) {
  all(root,s).forEach(e=>e.textContent=String(v));
}
function kill(root) {
  if(!root || !window.gsap) return;
  try { window.gsap.killTweensOf([root,...root.querySelectorAll("*")]); }
  catch(_) {}
}
function animate(root,s,properties,duration=.75) {
  const e=one(root,s);
  if(!e)return;
  if(window.gsap&&!reduced()) {
    window.gsap.to(e,{...properties,duration,ease:"power2.inOut",overwrite:true});
  } else {
    Object.entries(properties).forEach(([k,v])=>{
      if(k==="opacity")e.style.opacity=String(v);
      else if(k==="rotation")e.style.rotate=`${v}deg`;
      else if(k==="scale")e.style.scale=String(v);
      else if(k==="x")e.style.translate=`${v}px 0`;
      else if(k==="y")e.style.translate=`0 ${v}px`;
    });
  }
}
function update(root,i,n,label,mode="drift") {
  if(!root)return;
  text(root,".vls-w11b-caption",label);
  const bar=one(root,".vls-w11b-progress");
  if(bar)bar.style.width=`${100*(i+1)/Math.max(1,n)}%`;
  root.dataset.moment=String(i);
  root.dataset.total=String(n);
  const stage=one(root,".vls-w11b-stage");
  if(stage) {
    const x=mode==="track" ? -7+14*i/Math.max(1,n-1) : 3*Math.sin(i*.73);
    const y=mode==="inspect" ? -5+10*i/Math.max(1,n-1) : 3*Math.cos(i*.51);
    const z=1.012+.019*Math.sin(i*.39);
    stage.style.transform=reduced()?"none":
      `translate(${x}px,${y}px) scale(${z})`;
  }
}
function register(id,total,body,description,cuts,labels,render) {
  let root=null;
  let lastTotal=total;
  const apply=(i,n,reset=false)=>{
    if(!root)return;
    const k=idx(i,n);
    if(reset)root.classList.add("vls-w11b-instant");
    render(root,k,n,beat(k,cuts),reset);
    update(root,k,n,labels[Math.min(labels.length-1,beat(k,cuts))],
      id==="W11O2b"?"inspect":id==="W11O2c"?"track":"drift");
    if(reset) {
      void root.offsetHeight;
      root.classList.remove("vls-w11b-instant");
    }
  };
  window.VL_SCENES[id]={
    build(el) {
      kill(root);
      root=mount(el,id,body,description);
      lastTotal=total;
      apply(0,total,true);
    },
    step(i,n) {
      if(!root||!root.isConnected)return;
      lastTotal=Math.max(1,Math.floor(num(n,lastTotal)));
      apply(i,lastTotal);
    },
    reset() {
      if(!root)return;
      kill(root);
      apply(0,lastTotal,true);
    }
  };
}

// ============================================================
// ONE STYLESHEET, STRICTLY SCOPED
// ============================================================

if(!document.getElementById("vl-sc-w11b")) {
  const style=document.createElement("style");
  style.id="vl-sc-w11b";
  style.textContent=`
  .vls-w11-W11O2a,.vls-w11-W11O2b,.vls-w11-W11O2c{
    position:relative;width:100%;height:100%;min-height:0;
    overflow:hidden;background:transparent;color:${C.ink};
    font-family:inherit;isolation:isolate;box-sizing:border-box;
  }
  .vls-w11-W11O2a *,.vls-w11-W11O2b *,
  .vls-w11-W11O2c *{box-sizing:border-box}
  .vls-w11-W11O2a .vls-w11b-stage,
  .vls-w11-W11O2b .vls-w11b-stage,
  .vls-w11-W11O2c .vls-w11b-stage{
    position:absolute;inset:0 0 23px;
    display:flex;align-items:center;justify-content:center;
    transform-origin:center;transition:transform .85s ease;
  }
  .vls-w11-W11O2a svg,.vls-w11-W11O2b svg,
  .vls-w11-W11O2c svg{
    display:block;width:100%;height:100%;max-width:440px;
    max-height:100%;overflow:visible;font-family:inherit;
  }
  .vls-w11-W11O2a svg text,.vls-w11-W11O2b svg text,
  .vls-w11-W11O2c svg text{
    font-family:inherit;font-weight:700;letter-spacing:.12px;
  }
  .vls-w11-W11O2a .vls-w11b-caption,
  .vls-w11-W11O2b .vls-w11b-caption,
  .vls-w11-W11O2c .vls-w11b-caption{
    position:absolute;bottom:5px;left:3%;right:3%;
    min-height:17px;display:flex;align-items:center;
    justify-content:center;text-align:center;font-size:11px;
    line-height:1.25;font-weight:750;color:${C.navy};
    pointer-events:none;
  }
  .vls-w11-W11O2a .vls-w11b-progress,
  .vls-w11-W11O2b .vls-w11b-progress,
  .vls-w11-W11O2c .vls-w11b-progress{
    position:absolute;left:0;bottom:0;height:3px;width:0;
    background:${C.orange};transition:width .6s ease;
  }
  .vls-w11-W11O2a .kin,.vls-w11-W11O2b .kin,
  .vls-w11-W11O2c .kin{
    transition:transform .82s cubic-bezier(.2,.75,.2,1),
      opacity .65s ease,stroke-dashoffset .9s ease,
      fill .65s ease;
  }
  .vls-w11-W11O2a .kin,.vls-w11-W11O2b .kin,
  .vls-w11-W11O2c .kin{
    transform-box:view-box;
  }
  .vls-w11-W11O2a .a-switch{transform-origin:170px 181px}
  .vls-w11-W11O2a .a-gate{transform-origin:170px 195px}
  .vls-w11-W11O2a .a-lens{transform-origin:170px 200px}
  .vls-w11-W11O2a .a-pulse{transform-origin:170px 200px}
  .vls-w11-W11O2b .b-lens{transform-origin:170px 184px}
  .vls-w11-W11O2b .b-drum{transform-origin:170px 184px}
  .vls-w11-W11O2b .b-pressure{transform-origin:170px 184px}
  .vls-w11-W11O2c .c-baton{transform-origin:170px 184px}
  .vls-w11-W11O2c .c-rule{transform-origin:170px 184px}
  .vls-w11-W11O2c .c-loop{transform-origin:170px 184px}
  .vls-w11-W11O2a .draw,.vls-w11-W11O2b .draw,
  .vls-w11-W11O2c .draw{
    stroke-dasharray:500;stroke-dashoffset:500;
    transition:stroke-dashoffset .9s ease;
  }
  .vls-w11-W11O2a.vls-w11b-instant *,
  .vls-w11-W11O2b.vls-w11b-instant *,
  .vls-w11-W11O2c.vls-w11b-instant *{
    transition:none!important;animation:none!important;
  }
  @media(max-width:375px){
    .vls-w11-W11O2a .vls-w11b-caption,
    .vls-w11-W11O2b .vls-w11b-caption,
    .vls-w11-W11O2c .vls-w11b-caption{font-size:10px}
  }
  @media(prefers-reduced-motion:reduce){
    .vls-w11-W11O2a *,.vls-w11-W11O2b *,
    .vls-w11-W11O2c *{
      transition:none!important;animation:none!important;
    }
  }`;
  document.head.appendChild(style);
}

// ============================================================
// W11O2a · THE EXCEPTION DIVERSION YARD
//
// A miniature hotel arrival route becomes a physical
// branching rail system. Normal arrivals pass a green gate.
// An unresolved corporate rate is diverted into a red
// holding loop. A magnifying lens investigates the cause;
// unnecessary approval is removed, while genuine exceptions
// receive an authorised human route.
//
// 30 narration moments.
// ============================================================

{
  const cuts=[2,4,6,8,10,12,14,16,18,20,22,24,26,28];
  const labels=[
    "THE ARRIVAL ROUTE","AN UNRESOLVED RATE",
    "THE EXCEPTION SWITCH","71% RESOLVED",
    "29% OLD PATH","AUTOMATE OR REMOVE",
    "THE APPROVAL LOOP","QUESTION THE CAUSE",
    "MEASURE EXCEPTIONS","GIVE CASES OWNERS",
    "AUTHORISE THE DECISION","CHECK HANDLING TIME",
    "WATCH THE WORKAROUNDS","REMOVE USELESS WORK",
    "CONTROL THE EXCEPTION"
  ];

  const body=`
    ${T(170,22,"WHEN THE NORMAL PATH FAILS",12,C.navy)}
    <defs>
      <linearGradient id="w11b-yard" x1="0" y1="0" x2="0" y2="1">
        <stop stop-color="${C.blue}" stop-opacity=".8"/>
        <stop offset="1" stop-color="${C.paper}"/>
      </linearGradient>
    </defs>
    ${R(19,43,302,298,"url(#w11b-yard)",15)}
    ${P("M170 328 V238 Q170 214 170 183 V89",C.navy,8)}
    ${P("M170 238 Q170 207 234 189 Q273 176 273 142",C.orange,7)}
    ${P("M170 183 Q170 149 109 141 V89",C.green,7)}
    ${P("M170 328 V238 Q170 214 170 183 V89",C.paper,2,'stroke-dasharray="8 12"')}
    ${P("M170 238 Q170 207 234 189 Q273 176 273 142",C.paper,2,'stroke-dasharray="8 12"')}
    ${P("M170 183 Q170 149 109 141 V89",C.paper,2,'stroke-dasharray="8 12"')}

    <g class="a-hotel">
      ${R(66,55,86,72,C.paper,5,`stroke="${C.green}" stroke-width="2.5"`)}
      ${R(77,65,64,12,C.green,3)}
      ${T(109,75,"NORMAL",10,C.paper)}
      ${R(91,91,36,36,C.blue,4)}
      ${P("M109 91 V127",C.navy,2)}
      ${T(109,145,"RATE SET",11,C.green)}
    </g>

    <g class="a-old kin">
      ${R(228,87,90,65,C.paper,7,`stroke="${C.orange}" stroke-width="3"`)}
      ${R(240,99,66,12,C.orange,3)}
      ${T(273,108,"APPROVAL",9,C.paper)}
      ${person(273,134,C.orange,.65)}
      ${T(273,169,"OLD PATH",11,C.orange)}
    </g>

    <g class="a-switch kin">
      ${O(170,238,20,C.paper,`stroke="${C.navy}" stroke-width="3"`)}
      ${P("M170 249 V228 L182 219",C.orange,5)}
      ${O(170,238,5,C.navy)}
    </g>

    <g class="a-train kin">
      ${R(-18,-13,36,27,C.navy,8)}
      ${R(-11,-7,22,12,C.blue,3)}
      ${O(-10,15,5,C.ink)}${O(10,15,5,C.ink)}
    </g>

    <g class="a-rate kin" opacity="0">
      ${O(170,189,38,C.paper,`stroke="${C.orange}" stroke-width="3"`)}
      ${T(170,183,"RATE",12,C.navy)}
      ${T(170,201,"?",24,C.orange)}
    </g>

    <g class="a-coverage kin" opacity="0">
      ${O(170,191,55,C.paper,`stroke="${C.navy}" stroke-width="3"`)}
      <path d="M170 191 V136 A55 55 0 1 1 117 176 Z" fill="${C.green}"/>
      ${T(170,187,"71%",22,C.paper)}
      ${T(170,206,"29% OLD",11,C.orange)}
    </g>

    <g class="a-loop kin" opacity="0">
      ${P("M238 198 C317 198 319 277 268 284 C212 292 207 238 247 225",
        C.orange,5,'class="draw a-loop-path"')}
      ${P("M238 225 L248 225 L247 235",C.orange,3)}
    </g>

    <g class="a-lens kin" opacity="0">
      ${O(170,200,48,C.paper,`stroke="${C.navy}" stroke-width="4"`)}
      ${O(170,200,32,C.blue)}
      ${T(170,195,"WHY?",18,C.navy)}
      ${T(170,213,"CAUSE",11,C.orange)}
      ${P("M204 234 L236 263",C.navy,9)}
    </g>

    <g class="a-volume kin" opacity="0">
      ${Array.from({length:6},(_,j)=>
        R(65+j*36,315-(j+1)*11,23,(j+1)*11,
          j<4?C.green:C.orange,3)).join("")}
    </g>

    <g class="a-owner kin" opacity="0">
      ${person(245,252,C.navy,.9)}
      ${O(245,196,20,C.green)}
      ${tick(245,196,C.paper,.7)}
    </g>

    <g class="a-clock kin" opacity="0">
      ${O(92,226,30,C.paper,`stroke="${C.orange}" stroke-width="3"`)}
      ${P("M92 207 V226 L108 237",C.orange,3)}
    </g>

    <g class="a-remove kin" opacity="0">
      ${P("M235 186 L303 254 M303 186 L235 254",C.orange,7)}
      ${O(269,220,49,"none",`stroke="${C.orange}" stroke-width="3"`)}
    </g>

    <g class="a-safe kin" opacity="0">
      ${O(170,192,45,C.green)}
      ${tick(170,192,C.paper,1.4)}
    </g>

    <g class="a-pulse kin" opacity="0">
      ${O(170,192,69,"none",`stroke="${C.green}" stroke-width="3" stroke-dasharray="7 8"`)}
    </g>
  `;

  register("W11O2a",30,body,
    "Hotel arrival rail yard diverting unresolved corporate rates into an exception loop, investigating causes and returning authorised cases to normal service",
    cuts,labels,(root,i,n,b,reset)=>{

    const active=b>=2;
    const old=b>=4&&b<13;
    const train=one(root,".a-train");

    let x=170,y=315;
    if(b>=2&&b<=5) {
      x=170+(b>=4?Math.min(1,(i-8)/3)*90:0);
      y=230-(b>=4?Math.min(1,(i-8)/3)*58:0);
    } else if(b>=6&&b<13) {
      x=273+8*Math.sin(i*.7);
      y=171+6*Math.cos(i*.7);
    } else if(b>=13) {
      x=109;y=110;
    } else {
      y=315-i*12;
    }

    if(train)train.setAttribute("transform",`translate(${x} ${y})`);

    show(root,".a-rate",b>=1&&b<=2);
    show(root,".a-coverage",b>=3&&b<=4);
    show(root,".a-loop",b>=6&&b<=12);
    show(root,".a-lens",b>=7&&b<=8);
    show(root,".a-volume",b>=8&&b<=9);
    show(root,".a-owner",b>=9&&b<=11);
    show(root,".a-clock",b===11);
    show(root,".a-remove",b===13);
    show(root,".a-safe",b>=14);
    show(root,".a-pulse",b>=14);
    show(root,".a-old",old);

    move(root,".a-switch",0,0,1,old?35:-28);
    move(root,".a-lens",Math.sin(i*.65)*8,Math.cos(i*.4)*5);
    move(root,".a-pulse",0,0,1+(i%4)*.035,0);

    attr(root,".a-loop-path","stroke-dashoffset",b>=6?0:500);

    all(root,".a-volume rect").forEach((e,j)=>{
      e.style.opacity=b>=8&&j<=((i-16)%6)?"1":".2";
    });

    if(b>=13)move(root,".a-old",30,15,.75);
  });
}

// ============================================================
// W11O2b · THE STRESS-TEST WIND TUNNEL
//
// A working process is mounted inside a physical test tunnel.
// First a perfect demonstration passes. Then historical
// failures, missing information, peak demand and departmental
// handovers enter as escalating test conditions.
//
// A scanning lens tracks the process. Failures produce visible
// fractures and defect markers. The final sequence repairs
// weaknesses and proves the complete operating route.
//
// 30 narration moments.
// ============================================================

{
  const cuts=[2,4,6,8,10,12,14,16,18,20,22,24,26,28];
  const labels=[
    "THE PERFECT DEMO","PREPARED CONDITIONS",
    "REAL OPERATIONS","HISTORICAL FAILURES",
    "DIFFICULT BOOKINGS","THE REMAINING 29%",
    "PEAK DEMAND","THE 06:00 DEADLINE",
    "PERFORMER TESTING","TEST THE HANDOVER",
    "RECORD THE DEFECT","TEST MANUAL WORK",
    "CHECK THE INTERFACE","RETEST THE REPAIR",
    "EVIDENCE OF READINESS"
  ];

  const body=`
    <defs>
      <linearGradient id="w11b-tunnel" x1="0" y1="0" x2="1" y2="0">
        <stop stop-color="${C.blue}" stop-opacity=".25"/>
        <stop offset=".5" stop-color="${C.paper}"/>
        <stop offset="1" stop-color="${C.blue}" stop-opacity=".55"/>
      </linearGradient>
    </defs>
    ${T(170,22,"TEST BEYOND THE DEMO",12,C.navy)}
    ${R(24,65,292,239,"url(#w11b-tunnel)",18,
      `stroke="${C.navy}" stroke-width="3"`)}
    ${R(37,82,266,202,C.paper,10)}
    ${Array.from({length:7},(_,j)=>
      P(`M${48+j*41} 83 V282`,C.muted,.8,'opacity=".3"')).join("")}
    ${P("M38 252 H302",C.navy,4)}
    ${P("M38 264 H302",C.muted,2)}

    <g class="b-drum kin">
      ${O(170,184,97,C.blue,`stroke="${C.navy}" stroke-width="2"`)}
      ${O(170,184,77,C.paper,`stroke="${C.muted}" stroke-width="2"`)}
      ${O(170,184,56,C.blue,'opacity=".55"')}
      ${Array.from({length:8},(_,j)=>
        `<g transform="rotate(${j*45} 170 184)">
          ${R(165,89,10,19,C.navy,3)}
        </g>`).join("")}
    </g>

    <g class="b-process kin">
      ${R(113,156,114,57,C.paper,8,`stroke="${C.navy}" stroke-width="3"`)}
      ${R(124,166,92,12,C.navy,4)}
      ${T(170,175,"BOOKING",11,C.paper)}
      ${P("M131 192 H208",C.green,4)}
      ${O(143,192,6,C.green)}
      ${O(197,192,6,C.green)}
    </g>

    <g class="b-lens kin">
      ${R(49,109,242,9,C.green,4,'opacity=".65"')}
      ${P("M49 113 H291",C.green,2)}
      ${O(49,113,6,C.green)}
      ${O(291,113,6,C.green)}
    </g>

    <g class="b-perfect kin" opacity="0">
      ${O(170,184,35,C.green)}
      ${tick(170,184,C.paper,1.2)}
    </g>

    <g class="b-history kin" opacity="0">
      ${Array.from({length:4},(_,j)=>`
        ${R(52+j*62,316,44,42,C.paper,5,
          `stroke="${j%2?C.orange:C.navy}" stroke-width="2"`)}
        ${P(`M${60+j*62} 329 H${88+j*62}`,C.muted,2)}
        ${P(`M${60+j*62} 339 H${83+j*62}`,C.muted,2)}
      `).join("")}
    </g>

    <g class="b-failure kin" opacity="0">
      ${O(170,184,41,C.orange)}
      ${T(170,195,"!",34,C.paper)}
    </g>

    <g class="b-peak kin" opacity="0">
      ${Array.from({length:7},(_,j)=>`
        ${R(52+j*35,321-(j%3+1)*19,23,
          (j%3+1)*19,C.orange,3)}
      `).join("")}
    </g>

    <g class="b-clock kin" opacity="0">
      ${O(264,104,31,C.paper,`stroke="${C.orange}" stroke-width="3"`)}
      ${P("M264 85 V104 L278 111",C.orange,3)}
      ${T(264,149,"06:00",11,C.orange)}
    </g>

    <g class="b-people kin" opacity="0">
      ${person(90,312,C.navy,.7)}
      ${person(250,312,C.green,.7)}
      ${P("M115 309 H225",C.navy,3)}
    </g>

    <g class="b-handover kin" opacity="0">
      ${P("M90 224 C130 192 210 192 250 224",
        C.green,5,'class="draw b-handover-line"')}
      ${P("M236 211 L251 225 L231 228",C.green,3)}
    </g>

    <g class="b-defect kin" opacity="0">
      ${P("M150 151 L179 174 L156 192 L187 218",
        C.orange,5,'class="draw b-crack"')}
      ${O(237,226,19,C.orange)}
      ${T(237,234,"!",22,C.paper)}
    </g>

    <g class="b-repair kin" opacity="0">
      ${P("M147 185 H194",C.green,9)}
      ${O(170,185,20,C.green)}
      ${tick(170,185,C.paper,.7)}
    </g>

    <g class="b-interface kin" opacity="0">
      ${R(50,168,63,39,C.navy,6)}
      ${R(227,168,63,39,C.green,6)}
      ${P("M113 187 H227",C.orange,4,'class="draw b-data-line"')}
      ${O(170,187,7,C.gold)}
    </g>

    <g class="b-evidence kin" opacity="0">
      ${O(170,184,64,C.paper,`stroke="${C.green}" stroke-width="4"`)}
      ${tick(170,184,C.green,1.5)}
      ${T(170,234,"TESTED",12,C.green)}
    </g>

    <g class="b-pressure kin" opacity="0">
      ${P("M48 140 H291 M48 160 H291 M48 224 H291",
        C.orange,2,'stroke-dasharray="8 8"')}
    </g>
  `;

  register("W11O2b",30,body,
    "Cinematic process stress-test wind tunnel progressing from a perfect demonstration through historical failures, peak workload, performer-led handovers, defect repair and readiness evidence",
    cuts,labels,(root,i,n,b,reset)=>{

    show(root,".b-perfect",b<=1);
    show(root,".b-history",b>=3&&b<=4);
    show(root,".b-failure",b>=4&&b<=5);
    show(root,".b-peak",b>=6&&b<=7);
    show(root,".b-clock",b===7);
    show(root,".b-people",b>=8&&b<=11);
    show(root,".b-handover",b>=9&&b<=11);
    show(root,".b-defect",b>=10&&b<=12);
    show(root,".b-repair",b>=13);
    show(root,".b-interface",b===12);
    show(root,".b-evidence",b>=14);
    show(root,".b-pressure",b>=6&&b<=8);

    move(root,".b-drum",0,0,1,i*3.7);
    move(root,".b-process",
      b>=6&&b<=8?Math.sin(i*1.7)*5:0,
      b>=4&&b<=12?Math.cos(i*.9)*4:0,
      b>=14?.92:1);

    move(root,".b-lens",0,(i*23)%153,1);

    if(b>=6&&b<=8) {
      all(root,".b-peak rect").forEach((e,j)=>{
        const h=18+((i+j*3)%5)*11;
        e.setAttribute("height",h);
        e.setAttribute("y",321-h);
      });
    }

    attr(root,".b-handover-line","stroke-dashoffset",
      b>=9?0:500);
    attr(root,".b-crack","stroke-dashoffset",
      b>=10&&b<=12?0:500);
    attr(root,".b-data-line","stroke-dashoffset",
      b===12?0:500);

    if(b>=13)move(root,".b-repair",0,0,1+(i%3)*.04);
    if(b>=14)move(root,".b-evidence",0,0,1+(i%3)*.025);
  });
}

// ============================================================
// W11O2c · THE HUMAN HANDOVER RELAY
//
// The system identifies a problem but cannot complete it.
// A physical relay baton containing the case information
// must travel from reception to revenue and back.
//
// Missing information breaks the relay. Named authority,
// documented procedures and rule ownership repair it.
// A support beacon handles unfamiliar situations.
//
// Unlike the previous scenes, the central visual is a
// miniature human operating environment with two desks,
// a suspended information bridge and a moving relay baton.
//
// 30 narration moments.
// ============================================================

{
  const cuts=[2,4,6,8,10,12,14,16,18,20,22,24,26,28];
  const labels=[
    "THE HUMAN HALF","UNRESOLVED BOOKING",
    "DOCUMENT THE PROCEDURE","SYSTEMS AND RULES",
    "AUTHORISE THE EXCEPTION","STOP THE WORKAROUND",
    "CATALOGUE THE CASE","ASSIGN RESPONSIBILITY",
    "NAME THE RULE OWNER","CONTROL RULE CHANGES",
    "COMPLETE THE HANDOVER","VERIFY THE INFORMATION",
    "PROVIDE SUPPORT","TEST BEFORE GO-LIVE",
    "ONE OPERATING PROCESS"
  ];

  const body=`
    ${T(170,22,"THE HUMAN OPERATING SYSTEM",12,C.navy)}
    <defs>
      <linearGradient id="w11b-relay" x1="0" y1="0" x2="0" y2="1">
        <stop stop-color="${C.blue}" stop-opacity=".75"/>
        <stop offset="1" stop-color="${C.paper}"/>
      </linearGradient>
    </defs>
    ${R(18,43,304,294,"url(#w11b-relay)",15)}

    <g class="c-desks">
      ${R(30,166,113,86,C.paper,9,`stroke="${C.navy}" stroke-width="2.5"`)}
      ${R(197,166,113,86,C.paper,9,`stroke="${C.green}" stroke-width="2.5"`)}
      ${R(39,176,95,13,C.navy,3)}
      ${R(206,176,95,13,C.green,3)}
      ${T(86,186,"RECEPTION",10,C.paper)}
      ${T(254,186,"REVENUE",10,C.paper)}
      ${person(86,225,C.navy,.9)}
      ${person(254,225,C.green,.9)}
      ${R(57,244,58,7,C.navy,3)}
      ${R(225,244,58,7,C.green,3)}
    </g>

    <g class="c-bridge">
      ${P("M107 160 Q170 91 233 160",C.navy,5)}
      ${P("M107 151 Q170 82 233 151",C.muted,2)}
      ${O(107,160,7,C.navy)}
      ${O(233,160,7,C.green)}
    </g>

    <g class="c-baton kin">
      ${R(-22,-12,44,24,C.orange,7)}
      ${R(-15,-6,30,12,C.paper,3)}
      ${O(0,0,5,C.navy)}
    </g>

    <g class="c-problem kin" opacity="0">
      ${O(86,135,27,C.orange)}
      ${T(86,145,"?",28,C.paper)}
    </g>

    <g class="c-procedure kin" opacity="0">
      ${R(133,268,74,73,C.paper,5,`stroke="${C.navy}" stroke-width="2"`)}
      ${R(143,277,54,8,C.navy,2)}
      ${P("M144 295 H194 M144 305 H190 M144 315 H194",
        C.muted,2)}
      ${tick(182,325,C.green,.55)}
    </g>

    <g class="c-rule kin" opacity="0">
      ${O(170,121,37,C.paper,`stroke="${C.navy}" stroke-width="3"`)}
      ${T(170,117,"RULE",13,C.navy)}
      ${T(170,135,"OWNER",11,C.green)}
    </g>

    <g class="c-authority kin" opacity="0">
      ${O(254,136,25,C.green)}
      ${tick(254,136,C.paper,.9)}
    </g>

    <g class="c-workaround kin" opacity="0">
      ${P("M86 246 C30 285 60 324 139 315",
        C.orange,4,'stroke-dasharray="7 6" class="draw c-work-line"')}
      ${P("M128 304 L140 315 L125 322",C.orange,3)}
    </g>

    <g class="c-catalogue kin" opacity="0">
      ${R(39,273,78,66,C.paper,6,`stroke="${C.orange}" stroke-width="2"`)}
      ${Array.from({length:3},(_,j)=>`
        ${R(47,281+j*17,62,13,j===0?C.orange:C.blue,3)}
      `).join("")}
    </g>

    <g class="c-change kin" opacity="0">
      ${P("M147 105 Q170 78 193 105",C.orange,4)}
      ${P("M184 94 L194 105 L181 110",C.orange,3)}
      ${P("M193 137 Q170 164 147 137",C.green,4)}
      ${P("M156 148 L146 137 L159 132",C.green,3)}
    </g>

    <g class="c-handover kin" opacity="0">
      ${P("M108 208 H232",C.green,5,'class="draw c-transfer"')}
      ${P("M220 195 L234 208 L220 221",C.green,3)}
    </g>

    <g class="c-missing kin" opacity="0">
      ${O(170,207,27,C.orange)}
      ${T(170,216,"!",27,C.paper)}
    </g>

    <g class="c-support kin" opacity="0">
      ${P("M170 86 V56",C.navy,4)}
      ${O(170,55,18,C.gold)}
      ${O(170,55,30,"none",
        `stroke="${C.gold}" stroke-width="2" stroke-dasharray="5 6"`)}
    </g>

    <g class="c-tested kin" opacity="0">
      ${O(170,205,47,C.paper,`stroke="${C.green}" stroke-width="4"`)}
      ${tick(170,205,C.green,1.45)}
    </g>

    <g class="c-loop kin" opacity="0">
      ${P("M55 275 Q170 364 285 275",
        C.green,5,'class="draw c-loop-line"')}
      ${P("M272 267 L286 276 L272 289",C.green,3)}
    </g>

    <g class="c-complete kin" opacity="0">
      ${R(95,344,150,29,C.green,12)}
      ${T(170,363,"ONE PROCESS",12,C.paper)}
    </g>
  `;

  register("W11O2c",30,body,
    "Human relay between reception and revenue, with a travelling case baton, broken handovers, documented procedures, rule ownership, support beacon and tested operating closure",
    cuts,labels,(root,i,n,b,reset)=>{

    show(root,".c-problem",b>=1&&b<=5);
    show(root,".c-procedure",b>=2&&b<=6);
    show(root,".c-rule",b>=3&&b<=9);
    show(root,".c-authority",b>=4&&b<=11);
    show(root,".c-workaround",b===5);
    show(root,".c-catalogue",b>=6&&b<=8);
    show(root,".c-change",b===9);
    show(root,".c-handover",b>=10&&b<=11);
    show(root,".c-missing",b===11);
    show(root,".c-support",b===12);
    show(root,".c-tested",b>=13);
    show(root,".c-loop",b>=13);
    show(root,".c-complete",b>=14);

    const baton=one(root,".c-baton");
    if(baton) {
      let x=86,y=154;
      if(b>=3&&b<10) {
        const p=clamp((i-6)/14,0,1);
        x=86+168*p;
        y=154-48*Math.sin(Math.PI*p);
      } else if(b>=10&&b<13) {
        const p=clamp((i-20)/6,0,1);
        x=254-168*p;
        y=154-44*Math.sin(Math.PI*p);
      } else if(b>=13) {
        x=170;y=205;
      }
      baton.setAttribute("transform",`translate(${x} ${y})`);
      baton.style.opacity=b>=13?".15":"1";
    }

    move(root,".c-rule",0,0,1,i*1.2);
    move(root,".c-support",0,0,1+(i%3)*.04);
    move(root,".c-tested",0,0,1+(i%3)*.025);

    attr(root,".c-work-line","stroke-dashoffset",b===5?0:500);
    attr(root,".c-transfer","stroke-dashoffset",b>=10?0:500);
    attr(root,".c-loop-line","stroke-dashoffset",b>=13?0:500);

    if(b===11)move(root,".c-missing",
      Math.sin(i*1.4)*5,0);

    if(b>=14)move(root,".c-complete",0,0,1);
  });
}

// ============================================================
// PATCH VALIDATION
// ============================================================

const PATCH_IDS=["W11O2a","W11O2b","W11O2c"];

for(const id of PATCH_IDS) {
  const scene=window.VL_SCENES[id];
  if(!scene ||
     typeof scene.build!=="function" ||
     typeof scene.step!=="function" ||
     typeof scene.reset!=="function") {
    console.warn("[VoiceLearn W11] Missing patch scene:",id);
  }
}

})();
