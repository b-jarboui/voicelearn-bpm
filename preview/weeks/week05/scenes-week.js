// OPER621 | WEEK 05 | ORGANIZATION STRATEGY
// Cinematic section-specific visual scenes.
//
// CONTRACT
// window.VL_SCENES = window.VL_SCENES || {};
// VL_SCENES[secId] = { build(el), step(i,n), reset() };
//
// Every section has its own visual metaphor.
// Every narration index produces a visible change.
// No narration sentences are rendered inside scenes.
// All styling is embedded in #vl-sc-w05.
// Responsive at 375px.
// Reduced-motion aware.
// GSAP-enhanced when available.
// No external assets or dependencies.
//
// IMPORTANT:
// Parts 1, 2 and 3 form ONE contiguous JavaScript file.
// Concatenate them in order without adding wrappers.

(() => {
"use strict";

window.VL_SCENES = window.VL_SCENES || {};

const REG = window.VL_SCENES;
const PREFIX = "vls-w05-";

const NS = "http://www.w3.org/2000/svg";

const PALETTE = {
  ink: "#294861",
  blue: "#376f91",
  teal: "#6b9d9b",
  mint: "#a5c5b7",
  coral: "#d48b77",
  gold: "#c7a66b",
  pale: "#e5eeeb",
  paper: "#f8f7f2",
  line: "#a6b7bb"
};

const REDUCED = () =>
  !!(
    window.matchMedia &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  );

const GSAP = () =>
  !REDUCED() &&
  window.gsap &&
  typeof window.gsap.to === "function"
    ? window.gsap
    : null;

const clamp = (v, a, b) =>
  Math.max(a, Math.min(b, v));

const num = (v, fallback = 0) =>
  Number.isFinite(Number(v)) ? Number(v) : fallback;

const esc = s =>
  String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c]);

const E = (tag, attrs = {}, children = "") => {
  const a = Object.entries(attrs)
    .map(([k,v]) => ` ${k}="${esc(v)}"`)
    .join("");
  return `<${tag}${a}>${children}</${tag}>`;
};

const G = (attrs, content) => E("g", attrs, content);

const line = (x1,y1,x2,y2,color=PALETTE.line,w=2,extra={}) =>
  E("line", {
    x1,y1,x2,y2,
    stroke:color,
    "stroke-width":w,
    "stroke-linecap":"round",
    ...extra
  });

const rect = (x,y,w,h,fill,rx=0,extra={}) =>
  E("rect", {
    x,y,width:w,height:h,rx,fill,...extra
  });

const circle = (cx,cy,r,fill,extra={}) =>
  E("circle",{cx,cy,r,fill,...extra});

const ellipse = (cx,cy,rx,ry,fill,extra={}) =>
  E("ellipse",{cx,cy,rx,ry,fill,...extra});

const path = (d,fill="none",stroke="none",w=2,extra={}) =>
  E("path",{
    d,fill,stroke,
    "stroke-width":w,
    "stroke-linecap":"round",
    "stroke-linejoin":"round",
    ...extra
  });

const txt = (
  x,y,s,size=11,color=PALETTE.ink,
  anchor="middle",extra={}
) =>
  E("text",{
    x,y,
    fill:color,
    "font-size":size,
    "font-family":"Arial, Helvetica, sans-serif",
    "font-weight":600,
    "text-anchor":anchor,
    "letter-spacing":".35",
    ...extra
  },esc(s));

const dot = (x,y,r=4,color=PALETTE.teal) =>
  circle(x,y,r,color);

const badge = (x,y,s,color=PALETTE.blue) =>
  G({},
    rect(x-49,y-13,98,26,PALETTE.paper,13,{
      stroke:color,
      "stroke-width":1.2
    }) +
    txt(x,y+4,s,10,color)
  );

const person = (x,y,color=PALETTE.blue,scale=1) =>
  G({transform:`translate(${x} ${y}) scale(${scale})`},
    circle(0,-14,7,color) +
    path(
      "M-13 15 Q-13 -5 0 -5 Q13 -5 13 15 Z",
      color
    )
  );

const arrow = (
  x1,y1,x2,y2,
  color=PALETTE.blue,
  width=2
) => {
  const a = Math.atan2(y2-y1,x2-x1);
  const p1 = [
    x2-8*Math.cos(a-.55),
    y2-8*Math.sin(a-.55)
  ];
  const p2 = [
    x2-8*Math.cos(a+.55),
    y2-8*Math.sin(a+.55)
  ];

  return G({},
    line(x1,y1,x2,y2,color,width) +
    path(
      `M${p1[0]} ${p1[1]} L${x2} ${y2} L${p2[0]} ${p2[1]}`,
      "none",color,width
    )
  );
};

const svg = content =>
  `<svg class="vls-w05-svg"
    viewBox="0 0 360 430"
    preserveAspectRatio="xMidYMid meet"
    role="img"
    aria-hidden="true"
    xmlns="${NS}">
    ${content}
  </svg>`;

const shell = (id,title,subtitle,art) => `
  <div class="vls-w05-scene ${PREFIX}${id}"
       data-vls-scene="${id}">
    <div class="vls-w05-heading">
      <div class="vls-w05-kicker">ORGANIZATION STRATEGY</div>
      <div class="vls-w05-title">${esc(title)}</div>
      <div class="vls-w05-subtitle">${esc(subtitle)}</div>
    </div>
    <div class="vls-w05-stage">
      ${svg(art)}
    </div>
    <div class="vls-w05-footer">
      <span class="vls-w05-status" aria-hidden="true"></span>
      <div class="vls-w05-progress">
        <span class="vls-w05-progress-fill"></span>
      </div>
    </div>
  </div>
`;

function installCSS() {
  if (document.getElementById("vl-sc-w05")) return;

  const style = document.createElement("style");
  style.id = "vl-sc-w05";

  style.textContent = `
    [class*="vls-w05-W5O"] {
      --w05-ink: #294861;
      --w05-blue: #376f91;
      --w05-teal: #6b9d9b;
      --w05-mint: #a5c5b7;
      --w05-coral: #d48b77;
      --w05-gold: #c7a66b;
      --w05-paper: #f8f7f2;
      --w05-line: #a6b7bb;

      position: relative;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      box-sizing: border-box;
      color: var(--w05-ink);
      background: transparent;
      font-family: Arial, Helvetica, sans-serif;
      isolation: isolate;
    }

    [class*="vls-w05-W5O"] *,
    [class*="vls-w05-W5O"] *::before,
    [class*="vls-w05-W5O"] *::after {
      box-sizing: border-box;
    }

    [class*="vls-w05-W5O"] .vls-w05-heading {
      flex: 0 0 auto;
      padding: 10px 12px 0;
      text-align: center;
      z-index: 2;
    }

    [class*="vls-w05-W5O"] .vls-w05-kicker {
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 1.65px;
      color: var(--w05-teal);
      margin-bottom: 5px;
    }

    [class*="vls-w05-W5O"] .vls-w05-title {
      font-size: clamp(13px,3.7vw,18px);
      font-weight: 800;
      letter-spacing: .45px;
      line-height: 1.2;
      color: var(--w05-ink);
    }

    [class*="vls-w05-W5O"] .vls-w05-subtitle {
      font-size: 10px;
      line-height: 1.35;
      letter-spacing: .25px;
      margin-top: 5px;
      color: var(--w05-blue);
    }

    [class*="vls-w05-W5O"] .vls-w05-stage {
      flex: 1 1 auto;
      min-height: 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 0 2px;
    }

    [class*="vls-w05-W5O"] .vls-w05-svg {
      display: block;
      width: 100%;
      height: 100%;
      max-height: 100%;
      overflow: visible;
    }

    [class*="vls-w05-W5O"] .vls-w05-footer {
      flex: 0 0 auto;
      padding: 4px 14px 9px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    [class*="vls-w05-W5O"] .vls-w05-status {
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--w05-teal);
    }

    [class*="vls-w05-W5O"] .vls-w05-progress {
      height: 2px;
      flex: 1;
      background: #dce5e3;
      overflow: hidden;
      border-radius: 2px;
    }

    [class*="vls-w05-W5O"] .vls-w05-progress-fill {
      display: block;
      width: 0%;
      height: 100%;
      background: var(--w05-coral);
      transition: width .45s ease;
    }

    [class*="vls-w05-W5O"] .vls-w05-svg text {
      user-select: none;
      pointer-events: none;
    }

    [class*="vls-w05-W5O"] [data-part] {
      transform-box: fill-box;
      transform-origin: center;
      will-change: transform, opacity;
    }

    @media (max-width: 400px) {
      [class*="vls-w05-W5O"] .vls-w05-heading {
        padding: 8px 8px 0;
      }

      [class*="vls-w05-W5O"] .vls-w05-kicker {
        font-size: 7px;
      }

      [class*="vls-w05-W5O"] .vls-w05-title {
        font-size: 13px;
      }

      [class*="vls-w05-W5O"] .vls-w05-subtitle {
        font-size: 9px;
      }

      [class*="vls-w05-W5O"] .vls-w05-footer {
        padding-bottom: 5px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      [class*="vls-w05-W5O"] *,
      [class*="vls-w05-W5O"] *::before,
      [class*="vls-w05-W5O"] *::after {
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

function makeScene(id, title, subtitle, createArt, director) {
  let root = null;
  let host = null;
  let current = -1;
  let lastTotal = 1;
  let token = 0;

  const activeTweens = new Set();

  function select(part) {
    if (!root) return [];
    return Array.from(
      root.querySelectorAll(`[data-part="${part}"]`)
    );
  }

  function killAnimations() {
    token++;

    for (const tween of activeTweens) {
      try { tween.kill(); } catch (_) {}
    }

    activeTweens.clear();

    if (root && GSAP()) {
      try {
        GSAP().killTweensOf(
          root.querySelectorAll("[data-part]")
        );
      } catch (_) {}
    }
  }

  function apply(part, values = {}, duration = .65) {
    const nodes = select(part);
    const gsap = GSAP();

    nodes.forEach(node => {
      const v = {...values};

      if (gsap && duration > 0) {
        const tween = gsap.to(node, {
          ...v,
          duration,
          ease: "power2.inOut",
          overwrite: true,
          onComplete() {
            activeTweens.delete(tween);
          }
        });

        activeTweens.add(tween);
      } else {
        if (gsap) {
          gsap.set(node,v);
        } else {
          const transforms = [];

          if (v.x != null || v.y != null) {
            transforms.push(
              `translate(${num(v.x)}px,${num(v.y)}px)`
            );
          }

          if (v.rotation != null) {
            transforms.push(`rotate(${num(v.rotation)}deg)`);
          }

          if (v.scale != null) {
            transforms.push(`scale(${num(v.scale,1)})`);
          }

          if (v.scaleX != null || v.scaleY != null) {
            transforms.push(
              `scale(${num(v.scaleX,1)},${num(v.scaleY,1)})`
            );
          }

          if (transforms.length) {
            node.style.transform = transforms.join(" ");
          }

          if (v.opacity != null) {
            node.style.opacity = String(v.opacity);
          }

          if (v.fill != null) {
            node.style.fill = v.fill;
          }

          if (v.stroke != null) {
            node.style.stroke = v.stroke;
          }

          if (v.strokeDashoffset != null) {
            node.style.strokeDashoffset =
              String(v.strokeDashoffset);
          }
        }
      }
    });
  }

  function setText(part,value) {
    select(part).forEach(node => {
      node.textContent = String(value);
    });
  }

  function build(el) {
    if (!el || typeof el.appendChild !== "function") {
      return;
    }

    killAnimations();

    if (host && root && root.parentNode === host) {
      root.remove();
    }

    host = el;
    current = -1;
    lastTotal = 1;

    installCSS();

    const holder = document.createElement("div");
    holder.innerHTML = shell(
      id,title,subtitle,createArt()
    ).trim();

    root = holder.firstElementChild;

    // Build only one owned scene node.
    // Do not delete unrelated application elements.
    host.appendChild(root);

    const ctx = context();
    director(ctx,0,1,true);

    updateProgress(0,1);
  }

  function context() {
    return {
      root,
      select,
      apply,
      setText,
      reduced: REDUCED(),
      palette: PALETTE,
      token: () => token
    };
  }

  function updateProgress(i,n) {
    if (!root) return;

    const fill = root.querySelector(
      ".vls-w05-progress-fill"
    );

    if (!fill) return;

    const denominator = Math.max(1,n-1);
    const p = n <= 1 ? 1 : clamp(i/denominator,0,1);

    fill.style.width = `${p*100}%`;
  }

  function step(i,n) {
    if (!root) return;

    const total = Math.max(1,Math.floor(num(n,1)));
    const index = clamp(
      Math.floor(num(i,0)),
      0,total-1
    );

    lastTotal = total;

    // A narration moment is an absolute state.
    // Repeated, skipped and backward indices are supported.
    killAnimations();

    current = index;

    director(
      context(),
      index,
      total,
      false
    );

    updateProgress(index,total);
  }

  function reset() {
    if (!root) return;

    killAnimations();
    current = -1;

    director(context(),0,lastTotal,true);
    updateProgress(0,lastTotal);
  }

  REG[id] = {build,step,reset};
}

// ------------------------------------------------------------
// SHARED GEOMETRIC HELPERS
// ------------------------------------------------------------

function ring(cx,cy,r,color,w=2,extra={}) {
  return circle(cx,cy,r,"none",{
    stroke:color,
    "stroke-width":w,
    ...extra
  });
}

function star(x,y,r,color) {
  let d = "";

  for(let k=0;k<10;k++){
    const a=-Math.PI/2+k*Math.PI/5;
    const rr=k%2===0?r:r*.45;
    d += `${k===0?"M":"L"}${x+Math.cos(a)*rr} ${
      y+Math.sin(a)*rr
    } `;
  }

  return path(d+"Z",color);
}

function building(x,y,w,h,color=PALETTE.blue) {
  let windows = "";

  for(let row=0;row<3;row++){
    for(let col=0;col<2;col++){
      windows += rect(
        x+12+col*(w-30),
        y+17+row*24,
        10,12,
        PALETTE.paper,2
      );
    }
  }

  return G({},
    rect(x,y,w,h,color,4) +
    windows +
    rect(x+w/2-10,y+h-28,20,28,PALETTE.paper,2)
  );
}

function documentIcon(x,y,w=56,h=72) {
  return G({},
    rect(x,y,w,h,PALETTE.paper,5,{
      stroke:PALETTE.blue,
      "stroke-width":2
    }) +
    path(
      `M${x+w-17} ${y} V${y+17} H${x+w}`,
      "none",PALETTE.line,1.5
    ) +
    line(x+10,y+29,x+w-10,y+29,PALETTE.line,2) +
    line(x+10,y+40,x+w-10,y+40,PALETTE.line,2) +
    line(x+10,y+51,x+w-20,y+51,PALETTE.line,2)
  );
}

function checkMark(x,y,color=PALETTE.teal) {
  return path(
    `M${x-8} ${y} L${x-2} ${y+7} L${x+11} ${y-9}`,
    "none",color,3.5
  );
}

function pulsePhase(i,n,cycles=4) {
  const p = n<=1 ? 0 : i/(n-1);
  return {
    p,
    phase:Math.floor(p*cycles),
    beat:(i%5)/4
  };
}

// ============================================================
// W5O1a
// THE STRATEGIC CROSSROADS
//
// Original scene:
// Qasr's hotel stands at the centre of three competing
// investment directions. A traveller arrives; three
// directional paths awaken. The strategic compass rotates,
// competing priorities brighten, and one route is authorised.
//
// Not a diagram card: an illustrated decision landscape.
// ============================================================

function artO1a() {
  const P = PALETTE;

  const hotel =
    G({"data-part":"hotel"},
      ellipse(180,344,97,15,"#dfe8e5") +
      building(135,139,90,165,P.blue) +
      rect(144,129,72,12,P.ink,3) +
      txt(180,121,"QASR",13,P.ink) +
      rect(169,273,22,31,P.paper,3) +
      line(180,273,180,304,P.line,1.5)
    );

  const traveller =
    G({"data-part":"traveller"},
      person(84,324,P.coral,.85) +
      rect(95,325,12,17,P.ink,2) +
      line(101,324,101,319,P.ink,2)
    );

  const service =
    G({"data-part":"service"},
      path(
        "M180 170 Q104 144 65 98",
        "none",P.teal,3,{
          "stroke-dasharray":"6 7"
        }
      ) +
      circle(63,91,32,P.paper,{
        stroke:P.teal,
        "stroke-width":2
      }) +
      star(63,85,14,P.gold) +
      txt(63,115,"SERVICE",9,P.ink)
    );

  const cost =
    G({"data-part":"cost"},
      path(
        "M180 172 Q256 142 295 98",
        "none",P.gold,3,{
          "stroke-dasharray":"6 7"
        }
      ) +
      circle(296,91,32,P.paper,{
        stroke:P.gold,
        "stroke-width":2
      }) +
      txt(296,91,"10%",17,P.ink) +
      txt(296,115,"COST",9,P.ink)
    );

  const growth =
    G({"data-part":"growth"},
      path(
        "M180 238 Q272 254 291 325",
        "none",P.coral,3,{
          "stroke-dasharray":"6 7"
        }
      ) +
      circle(294,338,32,P.paper,{
        stroke:P.coral,
        "stroke-width":2
      }) +
      path(
        "M280 346 L291 335 L299 340 L310 323",
        "none",P.coral,3
      ) +
      txt(294,371,"GROWTH",9,P.ink)
    );

  const compass =
    G({"data-part":"compass"},
      ring(180,211,48,P.gold,1.5,{
        "stroke-dasharray":"3 5"
      }) +
      path(
        "M180 175 L191 211 L180 203 L169 211 Z",
        P.coral
      ) +
      path(
        "M180 247 L169 211 L180 219 L191 211 Z",
        P.teal
      ) +
      circle(180,211,5,P.ink)
    );

  const spotlight =
    G({"data-part":"spotlight"},
      ellipse(180,307,57,11,P.gold,{
        opacity:.23
      })
    );

  const decision =
    G({"data-part":"decision"},
      path(
        "M111 375 Q180 351 249 375",
        "none",P.blue,3
      ) +
      badge(180,397,"STRATEGIC FIT",P.blue)
    );

  return G({},
    path(
      "M20 352 Q180 300 340 352",
      "none",P.line,1.4
    ) +
    path(
      "M180 303 L180 421",
      "none",P.line,1.2
    ) +
    service + cost + growth +
    spotlight + hotel + compass +
    traveller + decision
  );
}

function directO1a(ctx,i,n,initial) {
  const {apply} = ctx;
  const {p,phase,beat} = pulsePhase(i,n,6);

  apply("hotel",{
    y:initial?0:-3-2*Math.sin(i*.8),
    scale:initial?1:1+.012*beat,
    opacity:1
  },.55);

  apply("traveller",{
    x:initial?-28:clamp(-28+p*105,-28,77),
    y:initial?0:-2*Math.sin(i*1.1),
    opacity:1
  },.7);

  apply("compass",{
    rotation:initial?0:i*13,
    scale:initial?.92:1+.05*beat,
    opacity:1
  },.75);

  apply("service",{
    opacity:initial?.45:
      phase===1||phase>=4?1:.48,
    scale:phase===1?1.08:1
  },.6);

  apply("cost",{
    opacity:initial?.45:
      phase===2||phase>=4?1:.48,
    scale:phase===2?1.08:1
  },.6);

  apply("growth",{
    opacity:initial?.45:
      phase===3||phase>=4?1:.48,
    scale:phase===3?1.08:1
  },.6);

  apply("spotlight",{
    scale:initial?.6:1+.35*p,
    opacity:initial?.15:.15+.45*p
  },.6);

  apply("decision",{
    opacity:initial?0:phase>=5?1:.12,
    y:phase>=5?0:12
  },.65);
}

makeScene(
  "W5O1a",
  "THE STRATEGIC CROSSROADS",
  "Three ambitions. One direction.",
  artO1a,
  directO1a
);

// ============================================================
// W5O1b
// THE MEASUREMENT OBSERVATORY
//
// Original scene:
// A large optical instrument focuses an abstract strategic
// star into observable operational measures.
// Three instrument needles and calibrated gauges respond
// independently to the narration.
//
// The visual metaphor is an observatory, not a flowchart.
// ============================================================

function artO1b() {
  const P = PALETTE;

  const telescope =
    G({"data-part":"telescope"},
      path(
        "M77 140 L218 208 L199 240 L60 172 Z",
        P.blue
      ) +
      ellipse(69,156,16,28,P.ink) +
      ellipse(69,156,10,20,P.teal) +
      ellipse(209,223,13,19,P.paper,{
        stroke:P.ink,
        "stroke-width":2
      }) +
      line(181,239,155,335,P.ink,4) +
      line(181,239,215,335,P.ink,4) +
      line(181,239,181,341,P.ink,4) +
      circle(181,239,8,P.gold)
    );

  const strategicStar =
    G({"data-part":"star"},
      ring(284,85,39,P.gold,1.5,{
        "stroke-dasharray":"3 5"
      }) +
      star(284,85,26,P.gold) +
      circle(284,85,8,P.paper) +
      txt(284,137,"INTENT",10,P.ink)
    );

  const beam =
    G({"data-part":"beam"},
      path(
        "M252 111 L83 144 L84 166 Z",
        P.mint,"none",0,{
          opacity:.3
        }
      ) +
      line(250,111,81,155,P.gold,1.5,{
        "stroke-dasharray":"4 5"
      })
    );

  const gauge = (x,y,label,color) =>
    G({},
      ring(x,y,34,P.line,3) +
      path(
        `M${x-28} ${y+18} A34 34 0 0 1 ${x+28} ${y+18}`,
        "none",color,4
      ) +
      circle(x,y,4,P.ink) +
      txt(x,y+54,label,9,P.ink)
    );

  const gauges =
    G({"data-part":"gauges"},
      gauge(69,344,"WAIT",P.teal) +
      gauge(180,344,"COST",P.gold) +
      gauge(291,344,"ACCURACY",P.coral)
    );

  const needle1 =
    G({"data-part":"needle1"},
      line(69,344,69,319,P.blue,3)
    );

  const needle2 =
    G({"data-part":"needle2"},
      line(180,344,180,319,P.blue,3)
    );

  const needle3 =
    G({"data-part":"needle3"},
      line(291,344,291,319,P.blue,3)
    );

  const scale =
    G({"data-part":"scale"},
      line(39,401,321,401,P.line,2) +
      Array.from({length:17},(_,k)=>
        line(
          39+k*17.6,396,
          39+k*17.6,
          k%4===0?409:404,
          P.line,1
        )
      ).join("") +
      circle(39,401,6,P.coral)
    );

  const readout =
    G({"data-part":"readout"},
      badge(180,282,"VERIFIED DATA",P.teal)
    );

  return G({},
    path(
      "M19 270 Q180 243 341 270",
      "none",P.line,1
    ) +
    strategicStar + beam +
    telescope + gauges +
    needle1 + needle2 + needle3 +
    scale + readout
  );
}

function directO1b(ctx,i,n,initial) {
  const {apply} = ctx;
  const {p,phase,beat} = pulsePhase(i,n,5);

  apply("star",{
    rotation:initial?0:i*9,
    scale:initial?.82:1+.08*beat,
    opacity:1
  },.6);

  apply("beam",{
    opacity:initial?.1:.25+.65*p,
    scaleX:initial?.2:1
  },.7);

  apply("telescope",{
    rotation:initial?-7:-7+13*p,
    y:initial?0:-3*Math.sin(i*.7)
  },.7);

  apply("gauges",{
    opacity:initial?.4:1,
    y:initial?10:0
  },.6);

  apply("needle1",{
    rotation:initial?-55:-55+105*
      (.15+.85*Math.abs(Math.sin(i*.31))),
    opacity:phase>=1?1:.35
  },.6);

  apply("needle2",{
    rotation:initial?-55:-55+105*
      (.2+.8*Math.abs(Math.sin(i*.24+1))),
    opacity:phase>=2?1:.35
  },.6);

  apply("needle3",{
    rotation:initial?-55:-55+105*
      (.1+.9*Math.abs(Math.sin(i*.28+2))),
    opacity:phase>=3?1:.35
  },.6);

  apply("scale",{
    opacity:initial?.25:1,
    x:initial?0:Math.sin(i*.4)*8
  },.5);

  apply("readout",{
    opacity:initial?0:phase>=4?1:.18,
    scale:phase>=4?1:.85
  },.6);
}

makeScene(
  "W5O1b",
  "THE MEASUREMENT OBSERVATORY",
  "Turn ambition into evidence.",
  artO1b,
  directO1b
);

// ============================================================
// W5O1c
// THE STRATEGIC LOCK
//
// Original scene:
// An abstract strategic vault has four independent tumblers.
// Each represents a condition needed to make an objective
// usable: definition, evidence, boundaries, authority.
//
// The tumblers rotate into alignment and the vault opens.
// This is a mechanical transformation, not a text checklist.
// ============================================================

function artO1c() {
  const P = PALETTE;

  const frame =
    G({"data-part":"frame"},
      rect(54,87,252,268,P.paper,22,{
        stroke:P.ink,
        "stroke-width":3
      }) +
      rect(65,98,230,246,"none",17,{
        stroke:P.line,
        "stroke-width":1.5
      }) +
      circle(180,216,94,P.pale,{
        stroke:P.line,
        "stroke-width":2
      })
    );

  const gear = (x,y,r,color,part,label) => {
    let teeth = "";

    for(let k=0;k<12;k++){
      const a=k*Math.PI/6;
      const tx=x+Math.cos(a)*(r+5);
      const ty=y+Math.sin(a)*(r+5);

      teeth += G({
        transform:`translate(${tx} ${ty}) rotate(${k*30})`
      },
        rect(-5,-8,10,16,color,2)
      );
    }

    return G({"data-part":part},
      teeth +
      circle(x,y,r,color) +
      circle(x,y,r*.72,P.paper) +
      circle(x,y,r*.38,P.pale) +
      txt(x,y+4,label,8,P.ink)
    );
  };

  const gears =
    gear(180,136,29,P.teal,"definition","DEFINE") +
    gear(260,216,29,P.gold,"evidence","PROVE") +
    gear(180,296,29,P.coral,"boundary","LIMIT") +
    gear(100,216,29,P.blue,"authority","APPROVE");

  const central =
    G({"data-part":"central"},
      ring(180,216,42,P.ink,3) +
      circle(180,216,29,P.paper) +
      path(
        "M165 216 L177 228 L198 204",
        "none",P.teal,5
      )
    );

  const bolt1 =
    G({"data-part":"bolt1"},
      rect(40,174,26,18,P.ink,4)
    );

  const bolt2 =
    G({"data-part":"bolt2"},
      rect(294,174,26,18,P.ink,4)
    );

  const door =
    G({"data-part":"door"},
      path(
        "M55 90 L305 90 L305 353 L55 353 Z",
        "none",P.gold,3
      ) +
      circle(180,216,110,"none",{
        stroke:P.gold,
        "stroke-width":1.5,
        "stroke-dasharray":"4 7"
      })
    );

  const unlocked =
    G({"data-part":"unlocked"},
      path(
        "M140 397 Q180 369 220 397",
        "none",P.teal,3
      ) +
      badge(180,410,"OBJECTIVE READY",P.teal)
    );

  return G({},
    ellipse(180,368,115,15,"#e1e8e5") +
    frame +
    door +
    gears +
    central +
    bolt1 +
    bolt2 +
    unlocked
  );
}

function directO1c(ctx,i,n,initial) {
  const {apply} = ctx;
  const {p,phase,beat} = pulsePhase(i,n,6);

  apply("frame",{
    scale:initial?.96:1,
    opacity:1
  },.6);

  apply("definition",{
    rotation:initial?-70:
      -70+Math.min(1,p*4)*70+i*3,
    scale:phase===1?1.12:1,
    opacity:phase>=1?1:.55
  },.65);

  apply("evidence",{
    rotation:initial?90:
      90-Math.min(1,Math.max(0,p-.2)*4)*90-i*2,
    scale:phase===2?1.12:1,
    opacity:phase>=2?1:.55
  },.65);

  apply("boundary",{
    rotation:initial?-90:
      -90+Math.min(1,Math.max(0,p-.4)*4)*90+i*2,
    scale:phase===3?1.12:1,
    opacity:phase>=3?1:.55
  },.65);

  apply("authority",{
    rotation:initial?75:
      75-Math.min(1,Math.max(0,p-.6)*4)*75-i*2,
    scale:phase===4?1.12:1,
    opacity:phase>=4?1:.55
  },.65);

  apply("central",{
    rotation:initial?-40:phase>=5?0:-40+35*p,
    scale:initial?.75:1+.06*beat,
    opacity:initial?.25:phase>=5?1:.55
  },.65);

  apply("bolt1",{
    x:phase>=5?-22:0
  },.7);

  apply("bolt2",{
    x:phase>=5?22:0
  },.7);

  apply("door",{
    opacity:phase>=5?.25:1,
    scale:phase>=5?1.07:1
  },.7);

  apply("unlocked",{
    opacity:initial?0:phase>=5?1:.08,
    y:phase>=5?0:13
  },.6);
}

makeScene(
  "W5O1c",
  "THE STRATEGIC LOCK",
  "Four conditions unlock action.",
  artO1c,
  directO1c
);

// ============================================================
// W5O2a
// THE CAUSAL BRIDGE
//
// Original scene:
// A proposed digital check-in kiosk occupies one bank of
// a river. Strategic value lies on the opposite bank.
//
// Physical bridge segments appear as evidence establishes
// the causal chain. An unsupported claim leaves a gap.
// A traveller crosses only when the mechanism is credible.
//
// Unlike a generic process flow, the bridge is the concept.
// ============================================================

function artO2a() {
  const P = PALETTE;

  const landscape =
    G({},
      path(
        "M0 280 Q90 256 144 284 L144 430 L0 430 Z",
        P.pale
      ) +
      path(
        "M216 284 Q290 250 360 278 L360 430 L216 430 Z",
        P.pale
      ) +
      path(
        "M144 277 Q180 292 216 277 L216 430 L144 430 Z",
        "#dce9e9"
      ) +
      Array.from({length:7},(_,k)=>
        path(
          `M149 ${305+k*18} Q180 ${
            294+k*18
          } 211 ${305+k*18}`,
          "none",P.line,1
        )
      ).join("")
    );

  const kiosk =
    G({"data-part":"kiosk"},
      rect(47,165,65,111,P.blue,10) +
      rect(55,176,49,58,P.paper,5) +
      rect(67,190,25,5,P.teal,2) +
      rect(67,202,25,5,P.line,2) +
      circle(80,223,4,P.gold) +
      rect(75,276,10,24,P.ink,2) +
      rect(59,299,42,5,P.ink,2)
    );

  const destination =
    G({"data-part":"destination"},
      building(262,159,61,133,P.teal) +
      star(292,146,18,P.gold) +
      txt(292,316,"SERVICE",10,P.ink)
    );

  const bridgeBase =
    G({"data-part":"bridgeBase"},
      path(
        "M91 266 Q180 224 269 266",
        "none",P.ink,3
      ) +
      path(
        "M91 276 Q180 234 269 276",
        "none",P.line,2
      )
    );

  const segment = (k,label) => {
    const x=104+k*48;
    const y=251-Math.sin((k+1)*Math.PI/5)*23;

    return G({"data-part":`segment${k}`},
      rect(x,y,44,12,P.gold,3,{
        stroke:P.ink,
        "stroke-width":1
      }) +
      line(
        x+22,y+12,x+22,y+38,
        P.ink,1.5
      ) +
      txt(x+22,y-10,label,9,P.ink)
    );
  };

  const segments =
    segment(0,"CHANGE") +
    segment(1,"EFFECT") +
    segment(2,"VALUE") +
    segment(3,"EVIDENCE");

  const traveller =
    G({"data-part":"traveller"},
      person(72,248,P.coral,.8)
    );

  const question =
    G({"data-part":"question"},
      ring(180,171,26,P.coral,2,{
        "stroke-dasharray":"3 5"
      }) +
      txt(180,179,"?",24,P.coral)
    );

  const proof =
    G({"data-part":"proof"},
      circle(180,171,26,P.paper,{
        stroke:P.teal,
        "stroke-width":2
      }) +
      checkMark(180,172,P.teal)
    );

  const claim =
    G({"data-part":"claim"},
      badge(180,379,"TRACE THE VALUE",P.blue)
    );

  return G({},
    landscape +
    kiosk +
    destination +
    bridgeBase +
    segments +
    traveller +
    question +
    proof +
    claim
  );
}

function directO2a(ctx,i,n,initial) {
  const {apply} = ctx;
  const {p,phase,beat} = pulsePhase(i,n,6);

  apply("kiosk",{
    scale:initial?.92:1+.025*beat,
    opacity:1
  },.55);

  apply("destination",{
    opacity:initial?.45:.45+.55*p,
    scale:initial?.92:1
  },.6);

  apply("bridgeBase",{
    opacity:initial?.3:1
  },.6);

  for(let k=0;k<4;k++){
    const threshold=(k+1)/6;
    const active=!initial && p>=threshold;

    apply(`segment${k}`,{
      opacity:active?1:.16,
      y:active?0:17,
      scale:active?1:.82
    },.65);
  }

  const crossed=phase>=5;

  apply("traveller",{
    x:initial?0:crossed?214:
      clamp(p*240,0,192),
    y:initial?0:
      -Math.sin(Math.PI*clamp(p*1.25,0,1))*36
      -2*Math.sin(i*1.2),
    opacity:1
  },.75);

  apply("question",{
    opacity:initial?.2:crossed?0:.8,
    rotation:initial?0:i*8,
    scale:1+.08*beat
  },.6);

  apply("proof",{
    opacity:crossed?1:0,
    scale:crossed?1:.65
  },.65);

  apply("claim",{
    opacity:initial?.15:1,
    y:initial?12:0
  },.6);
}

makeScene(
  "W5O2a",
  "THE CAUSAL BRIDGE",
  "A claim needs a mechanism.",
  artO2a,
  directO2a
);

// Continue directly after PART 1.
// No new wrapper or closing IIFE.

// ============================================================
// W5O2b
// THE INVESTMENT SHOWROOM
//
// Original scene:
// Four physical improvement proposals occupy four bays in
// Qasr's investment showroom. Three strategic spotlights
// illuminate their alignment. Only two funding tokens exist.
//
// The four proposals retain Exhibit Five's exact strengths:
// Arrival: strong / moderate / strong
// Stock:   none   / moderate / none
// Billing: moderate / weak / strong
// Spa:     moderate / none / none
//
// The scene is a miniature investment exhibition, not a
// matrix or a repeated comparison-card layout.
// ============================================================

function artO2b() {
  const P = PALETTE;

  const floor =
    G({},
      path(
        "M15 306 L345 306 L360 390 L0 390 Z",
        "#e8eeea"
      ) +
      line(15,306,345,306,P.line,1.5) +
      path(
        "M180 306 L180 390 M75 306 L30 390 M285 306 L330 390",
        "none",P.line,1
      )
    );

  const lights =
    G({"data-part":"lights"},
      line(42,68,318,68,P.ink,3) +
      [78,180,282].map((x,k)=>
        G({},
          line(x,68,x,91,P.ink,2) +
          path(
            `M${x-13} 91 L${x+13} 91 L${x+20} 111 L${x-20} 111 Z`,
            [P.teal,P.gold,P.coral][k]
          )
        )
      ).join("")
    );

  const arrival =
    G({"data-part":"arrival"},
      rect(19,142,151,142,P.paper,9,{
        stroke:P.line,
        "stroke-width":1.5
      }) +
      rect(41,164,49,75,P.blue,5) +
      rect(47,171,37,35,P.paper,3) +
      rect(54,215,23,4,P.gold,2) +
      person(117,220,P.coral,.68) +
      path(
        "M103 244 Q119 230 136 244",
        "none",P.teal,2
      ) +
      txt(94,264,"GUEST ARRIVAL",10,P.ink)
    );

  const stock =
    G({"data-part":"stock"},
      rect(190,142,151,142,P.paper,9,{
        stroke:P.line,
        "stroke-width":1.5
      }) +
      rect(214,189,36,37,P.gold,3) +
      rect(255,189,36,37,P.gold,3) +
      rect(234,153,36,33,P.gold,3) +
      line(232,207,244,207,P.paper,2) +
      line(273,207,285,207,P.paper,2) +
      txt(265,264,"STOCK COUNT",10,P.ink)
    );

  const billing =
    G({"data-part":"billing"},
      rect(19,294,151,103,P.paper,9,{
        stroke:P.line,
        "stroke-width":1.5
      }) +
      documentIcon(39,308,47,62) +
      circle(114,337,17,P.teal) +
      checkMark(114,338,P.paper) +
      txt(94,384,"CORPORATE BILLING",9,P.ink)
    );

  const spa =
    G({"data-part":"spa"},
      rect(190,294,151,103,P.paper,9,{
        stroke:P.line,
        "stroke-width":1.5
      }) +
      ellipse(266,359,40,8,P.pale) +
      path(
        "M234 354 Q246 337 258 354 Q270 337 282 354 Q294 337 306 354",
        "none",P.teal,3
      ) +
      path(
        "M245 336 Q239 326 245 315 M266 336 Q260 326 266 315 M287 336 Q281 326 287 315",
        "none",P.coral,2
      ) +
      txt(266,384,"SPA BOOKING",9,P.ink)
    );

  const serviceBeam =
    G({"data-part":"serviceBeam"},
      path(
        "M78 111 L24 284 L170 284 Z",
        P.teal,"none",0,{opacity:.16}
      ) +
      path(
        "M78 111 L189 284 L341 284 Z",
        P.teal,"none",0,{opacity:.08}
      )
    );

  const costBeam =
    G({"data-part":"costBeam"},
      path(
        "M180 111 L17 284 L342 284 Z",
        P.gold,"none",0,{opacity:.11}
      )
    );

  const growthBeam =
    G({"data-part":"growthBeam"},
      path(
        "M282 111 L19 397 L170 397 Z",
        P.coral,"none",0,{opacity:.10}
      )
    );

  const tokens =
    G({"data-part":"tokens"},
      circle(144,118,17,P.gold,{
        stroke:P.ink,
        "stroke-width":1.5
      }) +
      circle(216,118,17,P.gold,{
        stroke:P.ink,
        "stroke-width":1.5
      }) +
      txt(144,122,"1",12,P.paper) +
      txt(216,122,"2",12,P.paper)
    );

  const pointer =
    G({"data-part":"pointer"},
      path(
        "M180 119 L171 132 L189 132 Z",
        P.coral
      )
    );

  const strengths =
    G({"data-part":"strengths"},
      badge(180,415,"STRATEGIC ALIGNMENT",P.blue)
    );

  return G({},
    floor +
    lights +
    serviceBeam +
    costBeam +
    growthBeam +
    arrival +
    stock +
    billing +
    spa +
    tokens +
    pointer +
    strengths
  );
}

function directO2b(ctx,i,n,initial) {
  const {apply} = ctx;
  const {p,phase,beat} = pulsePhase(i,n,8);

  const focus = phase % 4;

  apply("lights",{
    opacity:initial?.55:1,
    y:initial?-8:0
  },.6);

  apply("serviceBeam",{
    opacity:initial?.08:
      phase===1||phase>=5?.9:.28,
    scaleX:1+.08*beat
  },.65);

  apply("costBeam",{
    opacity:initial?.08:
      phase===2||phase>=5?.75:.2,
    scaleX:1+.05*beat
  },.65);

  apply("growthBeam",{
    opacity:initial?.08:
      phase===3||phase>=5?.9:.2,
    scaleX:1+.07*beat
  },.65);

  ["arrival","stock","billing","spa"].forEach(
    (part,k) => {
      const selected =
        phase>=6
          ? k===0||k===2
          : focus===k;

      apply(part,{
        opacity:initial?.55:
          selected?1:.62,
        scale:selected?1.045:.985,
        y:selected?-5:0
      },.6);
    }
  );

  apply("tokens",{
    opacity:initial?.3:1,
    y:initial?-12:
      phase>=6?36:
      5*Math.sin(i*.7)
  },.7);

  apply("pointer",{
    x:initial?0:
      [-86,86,-86,86][focus],
    y:phase>=6?160:0,
    rotation:phase>=6?180:0,
    opacity:initial?0:1
  },.7);

  apply("strengths",{
    opacity:initial?.1:phase>=5?1:.35,
    scale:phase>=5?1:.9
  },.6);
}

makeScene(
  "W5O2b",
  "THE INVESTMENT SHOWROOM",
  "Four proposals. Two investments.",
  artO2b,
  directO2b
);

// ============================================================
// W5O2c
// THE FUNDING GATE
//
// Original scene:
// Two investment vessels move through a narrow harbour
// entrance. Four proposals approach, but only two berths
// are available. The gate responds to sponsor priorities.
//
// This visual represents funding scarcity, not an automatic
// ranking algorithm. Selected projects remain illustrative.
// ============================================================

function artO2c() {
  const P = PALETTE;

  const harbour =
    G({},
      path(
        "M0 178 Q180 162 360 178 L360 430 L0 430 Z",
        "#e2edeb"
      ) +
      Array.from({length:8},(_,k)=>
        path(
          `M0 ${206+k*26} Q90 ${
            195+k*26
          } 180 ${206+k*26} T360 ${206+k*26}`,
          "none",P.line,.8
        )
      ).join("")
    );

  const dock =
    G({"data-part":"dock"},
      rect(15,168,86,151,P.paper,5,{
        stroke:P.ink,
        "stroke-width":2
      }) +
      rect(259,168,86,151,P.paper,5,{
        stroke:P.ink,
        "stroke-width":2
      }) +
      txt(58,194,"BERTH 1",10,P.ink) +
      txt(302,194,"BERTH 2",10,P.ink) +
      rect(26,208,64,6,P.gold,2) +
      rect(270,208,64,6,P.gold,2)
    );

  const boat = (x,y,color,label,part) =>
    G({"data-part":part},
      path(
        `M${x-38} ${y} L${x+38} ${y}
         L${x+26} ${y+21}
         L${x-25} ${y+21} Z`,
        color
      ) +
      rect(x-23,y-23,46,23,P.paper,4,{
        stroke:color,
        "stroke-width":1.5
      }) +
      txt(x,y-8,label,9,P.ink)
    );

  const arrival =
    boat(102,350,P.teal,"ARRIVAL","arrivalBoat");

  const billing =
    boat(258,350,P.blue,"BILLING","billingBoat");

  const stock =
    boat(101,410,P.gold,"STOCK","stockBoat");

  const spa =
    boat(259,410,P.coral,"SPA","spaBoat");

  const gateLeft =
    G({"data-part":"gateLeft"},
      rect(145,184,8,91,P.ink,3) +
      path(
        "M149 194 L180 225",
        "none",P.gold,6
      )
    );

  const gateRight =
    G({"data-part":"gateRight"},
      rect(207,184,8,91,P.ink,3) +
      path(
        "M211 194 L180 225",
        "none",P.gold,6
      )
    );

  const lighthouse =
    G({"data-part":"lighthouse"},
      rect(169,75,22,88,P.paper,3,{
        stroke:P.ink,
        "stroke-width":2
      }) +
      rect(163,66,34,16,P.blue,4) +
      path(
        "M159 66 L180 45 L201 66 Z",
        P.coral
      ) +
      circle(180,73,6,P.gold) +
      path(
        "M180 72 L80 112 L80 133 Z",
        P.gold,"none",0,{opacity:.18}
      ) +
      path(
        "M180 72 L280 112 L280 133 Z",
        P.gold,"none",0,{opacity:.18}
      )
    );

  const approval =
    G({"data-part":"approval"},
      ring(180,289,29,P.teal,2) +
      checkMark(180,289,P.teal)
    );

  const deferred =
    G({"data-part":"deferred"},
      badge(180,399,"DEFER FOR REVIEW",P.coral)
    );

  return G({},
    harbour +
    dock +
    lighthouse +
    gateLeft +
    gateRight +
    arrival +
    billing +
    stock +
    spa +
    approval +
    deferred
  );
}

function directO2c(ctx,i,n,initial) {
  const {apply} = ctx;
  const {p,phase,beat} = pulsePhase(i,n,7);

  apply("lighthouse",{
    rotation:initial?0:
      Math.sin(i*.42)*5,
    opacity:1
  },.65);

  apply("dock",{
    opacity:initial?.65:1
  },.6);

  const open = phase>=3;

  apply("gateLeft",{
    rotation:open?-65:0
  },.8);

  apply("gateRight",{
    rotation:open?65:0
  },.8);

  apply("arrivalBoat",{
    x:initial?0:phase>=4?-44:0,
    y:initial?0:phase>=4?-104:
      -4*Math.sin(i*.6),
    rotation:phase>=4?-5:2*Math.sin(i*.5),
    opacity:1
  },.85);

  apply("billingBoat",{
    x:initial?0:phase>=5?44:0,
    y:initial?0:phase>=5?-104:
      4*Math.sin(i*.6),
    rotation:phase>=5?5:-2*Math.sin(i*.5),
    opacity:1
  },.85);

  apply("stockBoat",{
    y:initial?0:phase>=6?12:
      -3*Math.sin(i*.7),
    opacity:phase>=6?.45:1
  },.65);

  apply("spaBoat",{
    y:initial?0:phase>=6?12:
      3*Math.sin(i*.7),
    opacity:phase>=6?.45:1
  },.65);

  apply("approval",{
    opacity:initial?0:phase>=5?1:.12,
    scale:phase>=5?1:.6,
    rotation:initial?-30:0
  },.65);

  apply("deferred",{
    opacity:initial?0:phase>=6?1:.1,
    y:phase>=6?0:12
  },.6);
}

makeScene(
  "W5O2c",
  "THE FUNDING GATE",
  "Choose. Explain. Accept.",
  artO2c,
  directO2c
);

// ============================================================
// W5O3a
// THE EFFICIENCY TRAP
//
// Original scene:
// A reception desk becomes a mechanical productivity
// machine. Its cost dial improves while the guest queue
// grows and service quality falls.
//
// Two outcomes move in opposite directions.
// The visual demonstrates local optimisation physically.
// ============================================================

function artO3a() {
  const P = PALETTE;

  const lobby =
    G({},
      path(
        "M0 350 Q180 320 360 350",
        "none",P.line,1.5
      ) +
      line(20,351,340,351,P.line,1) +
      rect(108,203,144,71,P.blue,7) +
      rect(119,194,122,15,P.ink,3) +
      rect(162,221,36,21,P.paper,3) +
      txt(180,235,"CHECK-IN",9,P.ink)
    );

  const staff =
    G({"data-part":"staff"},
      person(180,184,P.teal,.95)
    );

  const queue =
    G({"data-part":"queue"},
      person(51,302,P.coral,.82) +
      person(88,305,P.gold,.82) +
      person(125,308,P.blue,.82) +
      person(162,311,P.teal,.82) +
      person(199,314,P.coral,.82)
    );

  const queueLine =
    G({"data-part":"queueLine"},
      path(
        "M40 335 Q100 345 160 335 T280 335",
        "none",P.coral,2,{
          "stroke-dasharray":"5 6"
        }
      )
    );

  const machine =
    G({"data-part":"machine"},
      circle(180,105,55,P.paper,{
        stroke:P.ink,
        "stroke-width":3
      }) +
      ring(180,105,44,P.line,2) +
      line(180,105,180,67,P.ink,4) +
      circle(180,105,6,P.gold) +
      txt(180,129,"EFFICIENCY",9,P.ink)
    );

  const costDial =
    G({"data-part":"costDial"},
      circle(65,107,34,P.paper,{
        stroke:P.gold,
        "stroke-width":2
      }) +
      txt(65,103,"COST",9,P.ink) +
      txt(65,119,"DOWN",9,P.teal) +
      path(
        "M65 69 L65 84",
        "none",P.gold,3
      )
    );

  const serviceDial =
    G({"data-part":"serviceDial"},
      circle(295,107,34,P.paper,{
        stroke:P.coral,
        "stroke-width":2
      }) +
      txt(295,103,"SERVICE",9,P.ink) +
      txt(295,119,"AT RISK",8,P.coral) +
      path(
        "M295 69 L295 84",
        "none",P.coral,3
      )
    );

  const costNeedle =
    G({"data-part":"costNeedle"},
      line(65,107,65,85,P.gold,3)
    );

  const serviceNeedle =
    G({"data-part":"serviceNeedle"},
      line(295,107,295,85,P.coral,3)
    );

  const warning =
    G({"data-part":"warning"},
      path(
        "M180 371 L160 408 L200 408 Z",
        P.coral
      ) +
      txt(180,401,"!",19,P.paper)
    );

  return G({},
    lobby +
    machine +
    costDial +
    serviceDial +
    costNeedle +
    serviceNeedle +
    staff +
    queueLine +
    queue +
    warning
  );
}

function directO3a(ctx,i,n,initial) {
  const {apply} = ctx;
  const {p,phase,beat} = pulsePhase(i,n,7);

  apply("machine",{
    rotation:initial?0:i*7,
    scale:initial?.95:1+.03*beat
  },.6);

  apply("costNeedle",{
    rotation:initial?0:-65*p
  },.65);

  apply("serviceNeedle",{
    rotation:initial?0:65*p
  },.65);

  apply("costDial",{
    scale:phase>=2?1.08:1,
    opacity:1
  },.6);

  apply("serviceDial",{
    scale:phase>=4?1.12:1,
    opacity:initial?.55:1
  },.6);

  apply("staff",{
    opacity:initial?1:
      phase>=3?.38:1,
    scale:phase>=3?.78:1,
    y:phase>=3?9:0
  },.7);

  apply("queue",{
    x:initial?-60:
      clamp(-60+p*88,-60,28),
    y:initial?0:
      3*Math.sin(i*.65),
    opacity:initial?.4:1
  },.75);

  apply("queueLine",{
    opacity:initial?.15:
      .25+.65*p,
    scaleX:initial?.3:1
  },.65);

  apply("warning",{
    opacity:initial?0:
      phase>=5?1:.05,
    scale:phase>=5?1+.08*beat:.5,
    y:phase>=5?0:15
  },.6);
}

makeScene(
  "W5O3a",
  "THE EFFICIENCY TRAP",
  "Cheaper is not always better.",
  artO3a,
  directO3a
);

// ============================================================
// W5O3b
// THE STRATEGIC TIGHTROPE
//
// Original scene:
// A suspended balance platform carries two competing
// strategic ambitions: corporate growth and guest service.
//
// A counterweight moves, the platform tilts, and a safety
// boundary appears. Flexible capacity restores balance.
//
// The scene makes sacrifice and safeguards tangible.
// ============================================================

function artO3b() {
  const P = PALETTE;

  const frame =
    G({},
      line(35,79,325,79,P.ink,4) +
      line(52,79,52,365,P.line,3) +
      line(308,79,308,365,P.line,3) +
      rect(38,365,284,13,P.ink,4) +
      line(180,79,180,139,P.ink,3)
    );

  const beam =
    G({"data-part":"beam"},
      path(
        "M55 211 L305 211",
        "none",P.ink,8
      ) +
      circle(180,211,11,P.gold) +
      line(75,211,75,255,P.ink,2) +
      line(285,211,285,255,P.ink,2)
    );

  const corporate =
    G({"data-part":"corporate"},
      rect(39,253,73,55,P.paper,8,{
        stroke:P.teal,
        "stroke-width":2
      }) +
      person(75,278,P.teal,.6) +
      txt(75,298,"CORPORATE",9,P.ink)
    );

  const general =
    G({"data-part":"general"},
      rect(248,253,73,55,P.paper,8,{
        stroke:P.coral,
        "stroke-width":2
      }) +
      person(285,278,P.coral,.6) +
      txt(285,298,"ALL GUESTS",9,P.ink)
    );

  const weight =
    G({"data-part":"weight"},
      rect(156,144,48,45,P.gold,7,{
        stroke:P.ink,
        "stroke-width":1.5
      }) +
      rect(168,135,24,13,"none",5,{
        stroke:P.ink,
        "stroke-width":2
      }) +
      txt(180,172,"CHOICE",9,P.ink)
    );

  const safeguard =
    G({"data-part":"safeguard"},
      path(
        "M49 337 Q180 320 311 337",
        "none",P.teal,4
      ) +
      line(49,327,49,346,P.teal,3) +
      line(311,327,311,346,P.teal,3) +
      badge(180,356,"SERVICE SAFEGUARD",P.teal)
    );

  const alternative =
    G({"data-part":"alternative"},
      circle(180,398,19,P.paper,{
        stroke:P.blue,
        "stroke-width":2
      }) +
      path(
        "M170 398 L177 405 L191 389",
        "none",P.teal,3
      )
    );

  const tension =
    G({"data-part":"tension"},
      path(
        "M180 106 L168 123 L192 123 Z",
        P.coral
      ) +
      txt(180,119,"!",13,P.paper)
    );

  return G({},
    frame +
    tension +
    beam +
    corporate +
    general +
    weight +
    safeguard +
    alternative
  );
}

function directO3b(ctx,i,n,initial) {
  const {apply} = ctx;
  const {p,phase,beat} = pulsePhase(i,n,7);

  const tilt =
    initial?0:
    phase<=2?-12:
    phase<=4?11:
    phase===5?-5:0;

  apply("beam",{
    rotation:tilt,
    y:initial?0:2*Math.sin(i*.6)
  },.75);

  apply("corporate",{
    y:initial?0:
      phase<=2?-15:
      phase<=4?13:0,
    scale:phase<=2&&!initial?1.08:1
  },.75);

  apply("general",{
    y:initial?0:
      phase<=2?15:
      phase<=4?-13:0,
    scale:phase>=3&&phase<=4?1.08:1
  },.75);

  apply("weight",{
    x:initial?0:
      phase<=2?-70:
      phase<=4?70:
      phase===5?-25:0,
    rotation:initial?0:i*4,
    y:initial?0:-2*Math.sin(i*.7)
  },.8);

  apply("tension",{
    opacity:initial?0:
      phase>=2&&phase<=5?1:.18,
    scale:phase>=2?1+.1*beat:.7
  },.6);

  apply("safeguard",{
    opacity:initial?0:
      phase>=5?1:.08,
    y:phase>=5?0:18
  },.7);

  apply("alternative",{
    opacity:initial?0:
      phase>=6?1:.08,
    scale:phase>=6?1:.6,
    rotation:phase>=6?0:-30
  },.65);
}

makeScene(
  "W5O3b",
  "THE STRATEGIC TIGHTROPE",
  "Every choice has a cost.",
  artO3b,
  directO3b
);

// Continue directly after PART 2.
// Closes the IIFE and completes weeks/week05/scenes-week.js.

// ============================================================
// W5O3c
// THE CAPACITY RESERVOIR
//
// Original scene:
// A hotel operates with a finite reservoir of service
// capacity. Corporate demand and ordinary guest demand
// draw from the same resource.
//
// An adjustable valve redistributes capacity. A protected
// reserve prevents strategic growth from consuming the
// minimum service standard.
//
// Physical metaphor: a hydraulic system.
// ============================================================

function artO3c() {
  const P = PALETTE;

  const tank =
    G({"data-part":"tank"},
      rect(99,103,162,192,P.paper,17,{
        stroke:P.ink,
        "stroke-width":3
      }) +
      rect(109,113,142,172,"none",11,{
        stroke:P.line,
        "stroke-width":1
      }) +
      line(109,236,251,236,P.line,1,{
        "stroke-dasharray":"4 5"
      }) +
      txt(180,91,"SERVICE CAPACITY",10,P.ink)
    );

  const water =
    G({"data-part":"water"},
      path(
        "M110 164 Q145 155 180 164 T250 164 L250 284 L110 284 Z",
        "#a5c5b7"
      ) +
      path(
        "M110 164 Q145 155 180 164 T250 164",
        "none",P.teal,2
      )
    );

  const reserve =
    G({"data-part":"reserve"},
      rect(110,236,140,48,P.gold,0,{
        opacity:.25
      }) +
      line(110,236,250,236,P.coral,3,{
        "stroke-dasharray":"5 4"
      }) +
      txt(180,264,"PROTECTED",10,P.ink)
    );

  const leftPipe =
    G({"data-part":"leftPipe"},
      path(
        "M99 193 H56 V324 H105",
        "none",P.blue,12
      ) +
      path(
        "M99 193 H56 V324 H105",
        "none",P.paper,5
      )
    );

  const rightPipe =
    G({"data-part":"rightPipe"},
      path(
        "M261 193 H304 V324 H255",
        "none",P.blue,12
      ) +
      path(
        "M261 193 H304 V324 H255",
        "none",P.paper,5
      )
    );

  const corporate =
    G({"data-part":"corporate"},
      circle(91,347,35,P.paper,{
        stroke:P.teal,
        "stroke-width":2
      }) +
      building(76,327,30,34,P.teal) +
      txt(91,396,"CORPORATE",9,P.ink)
    );

  const guests =
    G({"data-part":"guests"},
      circle(269,347,35,P.paper,{
        stroke:P.coral,
        "stroke-width":2
      }) +
      person(258,350,P.coral,.55) +
      person(281,350,P.gold,.55) +
      txt(269,396,"OTHER GUESTS",9,P.ink)
    );

  const valve =
    G({"data-part":"valve"},
      circle(180,193,22,P.paper,{
        stroke:P.ink,
        "stroke-width":2
      }) +
      line(158,193,202,193,P.ink,4) +
      line(180,171,180,215,P.ink,4) +
      circle(180,193,6,P.gold)
    );

  const leftFlow =
    G({"data-part":"leftFlow"},
      circle(56,251,6,P.teal) +
      circle(56,282,6,P.teal) +
      circle(75,324,6,P.teal)
    );

  const rightFlow =
    G({"data-part":"rightFlow"},
      circle(304,251,6,P.coral) +
      circle(304,282,6,P.coral) +
      circle(285,324,6,P.coral)
    );

  const guard =
    G({"data-part":"guard"},
      path(
        "M180 32 L203 42 V61 Q180 79 157 61 V42 Z",
        P.paper,P.teal,2
      ) +
      checkMark(180,53,P.teal)
    );

  return G({},
    ellipse(180,411,133,9,"#e3ebe8") +
    leftPipe +
    rightPipe +
    tank +
    water +
    reserve +
    valve +
    leftFlow +
    rightFlow +
    corporate +
    guests +
    guard
  );
}

function directO3c(ctx,i,n,initial) {
  const {apply} = ctx;
  const {p,phase,beat} = pulsePhase(i,n,7);

  apply("tank",{
    opacity:1,
    scale:initial?.97:1
  },.6);

  apply("water",{
    y:initial?0:
      phase<=3?Math.min(52,p*105):
      phase<=5?52-25*(p-.45):
      16,
    x:initial?0:3*Math.sin(i*.65),
    opacity:initial?.7:1
  },.8);

  apply("valve",{
    rotation:initial?0:
      phase<=2?-50:
      phase<=4?45:
      0,
    scale:1+.045*beat
  },.7);

  apply("leftFlow",{
    y:initial?-20:
      (i*13)%68-20,
    opacity:phase>=1?1:.15
  },.6);

  apply("rightFlow",{
    y:initial?-20:
      (i*17)%68-20,
    opacity:phase>=2?1:.15
  },.6);

  apply("corporate",{
    scale:phase>=2&&phase<=4?1.1:1,
    opacity:1
  },.6);

  apply("guests",{
    scale:phase>=4?1.1:1,
    opacity:phase>=3?.65:1
  },.6);

  apply("reserve",{
    opacity:initial?.15:
      phase>=5?1:.35,
    scaleY:phase>=5?1:.9
  },.65);

  apply("guard",{
    opacity:initial?0:
      phase>=6?1:.12,
    scale:phase>=6?1:.65,
    y:phase>=6?0:12
  },.65);
}

makeScene(
  "W5O3c",
  "THE CAPACITY RESERVOIR",
  "Protect the service floor.",
  artO3c,
  directO3c
);

// ============================================================
// W5O4a
// THE STRATEGIC CONTROL ROOM
//
// Original scene:
// A physical control room contains an operating console,
// a strategic horizon, and three independent signal towers.
//
// Operators do not merely observe measures. They connect
// a measure to a threshold, an owner and a decision.
//
// The control-room environment is distinct from the
// observatory in O1b: this scene concerns governance and
// action, not translating ambition into measurement.
// ============================================================

function artO4a() {
  const P = PALETTE;

  const room =
    G({},
      rect(25,76,310,210,P.paper,12,{
        stroke:P.line,
        "stroke-width":1.5
      }) +
      path(
        "M25 267 L335 267 L360 350 L0 350 Z",
        P.pale
      ) +
      line(25,267,335,267,P.ink,2) +
      path(
        "M0 350 L360 350",
        "none",P.line,2
      )
    );

  const horizon =
    G({"data-part":"horizon"},
      rect(46,96,268,83,"#e7efed",6,{
        stroke:P.line,
        "stroke-width":1
      }) +
      path(
        "M55 153 L98 143 L134 150 L170 120 L211 130 L251 108 L304 116",
        "none",P.teal,3
      ) +
      path(
        "M55 166 L98 159 L134 164 L170 144 L211 151 L251 135 L304 140",
        "none",P.gold,2
      ) +
      line(55,154,304,154,P.coral,1.5,{
        "stroke-dasharray":"5 5"
      })
    );

  const console =
    G({"data-part":"console"},
      path(
        "M69 234 L291 234 L315 317 L45 317 Z",
        P.blue
      ) +
      path(
        "M77 245 L283 245 L299 305 L61 305 Z",
        P.ink
      ) +
      [103,180,257].map((x,k)=>
        G({},
          circle(x,268,14,P.paper) +
          circle(x,268,8,[
            P.teal,P.gold,P.coral
          ][k]) +
          rect(x-18,292,36,5,P.line,2)
        )
      ).join("")
    );

  const tower = (x,label,color,part) =>
    G({"data-part":part},
      rect(x-22,192,44,42,P.paper,5,{
        stroke:color,
        "stroke-width":2
      }) +
      circle(x,208,8,color) +
      txt(x,226,label,8,P.ink)
    );

  const towers =
    tower(88,"WAIT",P.teal,"waitTower") +
    tower(180,"COST",P.gold,"costTower") +
    tower(272,"QUALITY",P.coral,"qualityTower");

  const operator =
    G({"data-part":"operator"},
      person(180,350,P.blue,1.25) +
      path(
        "M163 345 Q180 334 197 345",
        "none",P.paper,2
      )
    );

  const signal =
    G({"data-part":"signal"},
      path(
        "M180 187 L180 228",
        "none",P.gold,2,{
          "stroke-dasharray":"3 4"
        }
      ) +
      circle(180,187,7,P.gold)
    );

  const decision =
    G({"data-part":"decision"},
      rect(103,378,154,32,P.paper,16,{
        stroke:P.teal,
        "stroke-width":1.5
      }) +
      txt(180,398,"DECISION TRIGGER",10,P.ink)
    );

  return G({},
    room +
    horizon +
    console +
    towers +
    operator +
    signal +
    decision
  );
}

function directO4a(ctx,i,n,initial) {
  const {apply} = ctx;
  const {p,phase,beat} = pulsePhase(i,n,7);

  apply("horizon",{
    opacity:initial?.45:1,
    x:initial?-9:9*Math.sin(i*.45)
  },.7);

  apply("console",{
    opacity:initial?.65:1,
    y:initial?8:0
  },.65);

  const focus = phase%3;

  ["waitTower","costTower","qualityTower"].forEach(
    (part,k) => {
      apply(part,{
        opacity:initial?.45:
          phase>=4||focus===k?1:.38,
        scale:focus===k?1.12:1,
        y:focus===k?-5:0
      },.6);
    }
  );

  apply("operator",{
    x:initial?0:
      [-12,0,12][focus],
    y:initial?0:
      -2*Math.sin(i*.7),
    rotation:initial?0:
      focus===0?-4:focus===2?4:0
  },.65);

  apply("signal",{
    opacity:initial?0:
      phase>=3?1:.12,
    y:initial?-12:
      -8+12*beat,
    scale:phase>=3?1:.7
  },.6);

  apply("decision",{
    opacity:initial?0:
      phase>=5?1:.1,
    y:phase>=5?0:14,
    scale:phase>=5?1:.88
  },.7);
}

makeScene(
  "W5O4a",
  "THE STRATEGIC CONTROL ROOM",
  "Measures must trigger decisions.",
  artO4a,
  directO4a
);

// ============================================================
// W5O4b
// THE GOVERNANCE CLOCK
//
// Original scene:
// A large mechanical clock governs a recurring review cycle.
// Four hands represent observation, interpretation,
// escalation and corrective action.
//
// A review is not complete when a number is displayed.
// It is complete when a decision moves the system.
//
// Physical metaphor: a precision clock mechanism.
// ============================================================

function artO4b() {
  const P = PALETTE;

  const clock =
    G({"data-part":"clock"},
      circle(180,203,126,P.paper,{
        stroke:P.ink,
        "stroke-width":4
      }) +
      ring(180,203,115,P.gold,2) +
      ring(180,203,94,P.line,1) +
      Array.from({length:12},(_,k)=>{
        const a=k*Math.PI/6-Math.PI/2;
        const x1=180+Math.cos(a)*100;
        const y1=203+Math.sin(a)*100;
        const x2=180+Math.cos(a)*112;
        const y2=203+Math.sin(a)*112;

        return line(
          x1,y1,x2,y2,
          P.ink,k%3===0?3:1.5
        );
      }).join("")
    );

  const hourHand =
    G({"data-part":"hourHand"},
      line(180,203,180,139,P.blue,7)
    );

  const minuteHand =
    G({"data-part":"minuteHand"},
      line(180,203,180,116,P.teal,4)
    );

  const secondHand =
    G({"data-part":"secondHand"},
      line(180,223,180,99,P.coral,2)
    );

  const center =
    G({},
      circle(180,203,9,P.gold) +
      circle(180,203,4,P.ink)
    );

  const gearLeft =
    G({"data-part":"gearLeft"},
      ring(69,344,35,P.teal,4,{
        "stroke-dasharray":"7 6"
      }) +
      circle(69,344,21,P.paper,{
        stroke:P.ink,
        "stroke-width":2
      }) +
      txt(69,348,"REVIEW",8,P.ink)
    );

  const gearRight =
    G({"data-part":"gearRight"},
      ring(291,344,35,P.coral,4,{
        "stroke-dasharray":"7 6"
      }) +
      circle(291,344,21,P.paper,{
        stroke:P.ink,
        "stroke-width":2
      }) +
      txt(291,348,"ACT",9,P.ink)
    );

  const pendulum =
    G({"data-part":"pendulum"},
      line(180,330,180,385,P.ink,3) +
      circle(180,390,19,P.gold,{
        stroke:P.ink,
        "stroke-width":1.5
      })
    );

  const alert =
    G({"data-part":"alert"},
      circle(180,52,20,P.coral) +
      txt(180,59,"!",23,P.paper)
    );

  const resolved =
    G({"data-part":"resolved"},
      circle(180,52,20,P.teal) +
      checkMark(180,53,P.paper)
    );

  return G({},
    path(
      "M53 410 Q180 395 307 410",
      "none",P.line,1.5
    ) +
    clock +
    hourHand +
    minuteHand +
    secondHand +
    center +
    gearLeft +
    gearRight +
    pendulum +
    alert +
    resolved
  );
}

function directO4b(ctx,i,n,initial) {
  const {apply} = ctx;
  const {p,phase,beat} = pulsePhase(i,n,7);

  apply("clock",{
    scale:initial?.94:1,
    opacity:1
  },.65);

  apply("hourHand",{
    rotation:initial?0:i*14
  },.8);

  apply("minuteHand",{
    rotation:initial?0:i*39
  },.75);

  apply("secondHand",{
    rotation:initial?0:i*93
  },.65);

  apply("gearLeft",{
    rotation:initial?0:i*23,
    opacity:phase>=1?1:.4,
    scale:phase===2?1.1:1
  },.7);

  apply("gearRight",{
    rotation:initial?0:-i*28,
    opacity:phase>=4?1:.25,
    scale:phase>=5?1.1:1
  },.7);

  apply("pendulum",{
    rotation:initial?0:
      Math.sin(i*.85)*24,
    opacity:1
  },.65);

  apply("alert",{
    opacity:initial?0:
      phase>=3&&phase<6?1:.08,
    scale:phase>=3&&phase<6?
      1+.12*beat:.65
  },.6);

  apply("resolved",{
    opacity:initial?0:
      phase>=6?1:0,
    scale:phase>=6?1:.65
  },.65);
}

makeScene(
  "W5O4b",
  "THE GOVERNANCE CLOCK",
  "Review. Decide. Correct.",
  artO4b,
  directO4b
);

// ============================================================
// W5O4c
// THE STRATEGIC LAUNCH
//
// Original scene:
// A strategy is prepared for launch like a physical aircraft.
// Four subsystems activate in sequence:
// destination, evidence, trade-off and governance.
//
// The aircraft cannot depart until the runway is clear,
// the control tower authorises departure and the strategic
// direction is visible.
//
// The closing scene is a cinematic departure, not a
// summary card or another process diagram.
// ============================================================

function artO4c() {
  const P = PALETTE;

  const sky =
    G({},
      path(
        "M0 305 Q90 282 180 305 T360 305",
        "none",P.line,1.2
      ) +
      ellipse(73,101,43,10,P.pale) +
      ellipse(284,83,53,11,P.pale) +
      ellipse(231,144,35,8,P.pale)
    );

  const runway =
    G({"data-part":"runway"},
      path(
        "M118 430 L165 264 L195 264 L242 430 Z",
        "#dce6e3"
      ) +
      path(
        "M180 281 L180 430",
        "none",P.paper,3,{
          "stroke-dasharray":"17 14"
        }
      ) +
      line(165,264,118,430,P.line,2) +
      line(195,264,242,430,P.line,2)
    );

  const aircraft =
    G({"data-part":"aircraft"},
      path(
        "M180 149 Q190 169 190 208 L234 242 L234 254 L190 239 L190 269 L206 283 L206 293 L180 286 L154 293 L154 283 L170 269 L170 239 L126 254 L126 242 L170 208 Q170 169 180 149 Z",
        P.blue
      ) +
      path(
        "M180 157 Q184 179 184 202 L176 202 Q176 179 180 157",
        P.paper
      ) +
      line(180,211,180,277,P.gold,2)
    );

  const destination =
    G({"data-part":"destination"},
      star(180,53,23,P.gold) +
      ring(180,53,34,P.gold,1.5,{
        "stroke-dasharray":"3 5"
      }) +
      txt(180,103,"STRATEGIC NORTH",10,P.ink)
    );

  const tower =
    G({"data-part":"tower"},
      rect(271,211,38,96,P.paper,4,{
        stroke:P.ink,
        "stroke-width":2
      }) +
      rect(260,196,60,28,P.blue,5) +
      rect(268,203,44,13,P.pale,2) +
      path(
        "M258 196 L290 181 L322 196 Z",
        P.ink
      ) +
      line(290,181,290,162,P.ink,2) +
      circle(290,159,5,P.coral)
    );

  const light1 =
    G({"data-part":"light1"},
      circle(130,324,7,P.coral)
    );

  const light2 =
    G({"data-part":"light2"},
      circle(230,324,7,P.coral)
    );

  const light3 =
    G({"data-part":"light3"},
      circle(111,391,7,P.coral)
    );

  const light4 =
    G({"data-part":"light4"},
      circle(249,391,7,P.coral)
    );

  const clearance =
    G({"data-part":"clearance"},
      path(
        "M275 149 Q244 119 212 130",
        "none",P.teal,3,{
          "stroke-dasharray":"5 6"
        }
      ) +
      circle(275,149,8,P.teal) +
      badge(180,418,"CLEARED TO ACT",P.teal)
    );

  const trail =
    G({"data-part":"trail"},
      path(
        "M180 293 L180 415",
        "none",P.gold,3,{
          "stroke-dasharray":"6 9"
        }
      ) +
      path(
        "M167 305 L154 387 M193 305 L206 387",
        "none",P.line,1.5
      )
    );

  return G({},
    sky +
    runway +
    destination +
    tower +
    light1 +
    light2 +
    light3 +
    light4 +
    trail +
    aircraft +
    clearance
  );
}

function directO4c(ctx,i,n,initial) {
  const {apply} = ctx;
  const {p,phase,beat} = pulsePhase(i,n,8);

  apply("destination",{
    opacity:initial?.4:1,
    rotation:initial?0:i*5,
    scale:1+.045*beat
  },.65);

  apply("runway",{
    opacity:initial?.55:1,
    scaleY:initial?.92:1
  },.65);

  apply("tower",{
    opacity:initial?.45:
      phase>=3?1:.6,
    scale:phase>=5?1.04:1
  },.65);

  ["light1","light2","light3","light4"].forEach(
    (part,k) => {
      const active =
        !initial && phase>=k+1;

      apply(part,{
        opacity:active?1:.18,
        scale:active?
          1+.18*Math.abs(Math.sin(i*.9+k)):
          .65,
        fill:active?P.teal:P.coral
      },.55);
    }
  );

  apply("aircraft",{
    y:initial?30:
      phase>=6?-35-110*
        clamp((p-.75)*4,0,1):
      30-65*p,
    scale:initial?.8:
      phase>=6?.78:
      .8+.2*p,
    rotation:initial?0:
      phase>=6?-5:2*Math.sin(i*.5),
    opacity:1
  },.85);

  apply("trail",{
    opacity:initial?0:
      phase>=6?1:.1,
    scaleY:phase>=6?1:.5
  },.65);

  apply("clearance",{
    opacity:initial?0:
      phase>=6?1:.08,
    y:phase>=6?0:13,
    scale:phase>=6?1:.85
  },.65);
}

makeScene(
  "W5O4c",
  "THE STRATEGIC LAUNCH",
  "From strategic intent to action.",
  artO4c,
  directO4c
);

// ============================================================
// FINAL REGISTRY VALIDATION
// ============================================================

const WEEK05_SCENE_IDS = [
  "W5O1a",
  "W5O1b",
  "W5O1c",
  "W5O2a",
  "W5O2b",
  "W5O2c",
  "W5O3a",
  "W5O3b",
  "W5O3c",
  "W5O4a",
  "W5O4b",
  "W5O4c"
];

for (const id of WEEK05_SCENE_IDS) {
  const scene = REG[id];

  if (
    !scene ||
    typeof scene.build !== "function" ||
    typeof scene.step !== "function" ||
    typeof scene.reset !== "function"
  ) {
    console.error(
      `[VoiceLearn Week 05] Invalid scene: ${id}`
    );
  }
}

})();