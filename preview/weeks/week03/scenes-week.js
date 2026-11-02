// OPER621 · Week 3 · Cinematic Scenes
// Prof. Bassem Jarboui · HBMSU
//
// Audit correction: F1–F15.
// Nine independent, section-specific cinematic scenes.
// No narration sentences appear inside the artwork.
// No raw line breaks inside JavaScript string literals.
//
// CONTRACT:
// window.VL_SCENES[secId] = { build(el), step(i,n), reset() }
//

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
    white: "#ffffff",
    red: "#8e2b1c"
  };

  const NS = "http://www.w3.org/2000/svg";

  const IDS = [
    "W3O1a", "W3O1b",
    "W3O2a", "W3O2b", "W3O2c",
    "W3O3a", "W3O3b", "W3O3c", "W3O2d"
  ];

  const clamp = (v, a, b) =>
    Math.max(a, Math.min(b, v));

  const reduced = () => {
    try {
      return !!window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    } catch (_) {
      return false;
    }
  };

  const R = (x, y, w, h, fill, rx = 8, extra = "") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`;

  const O = (x, y, r, fill, extra = "") =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;

  const P = (d, stroke = C.navy, width = 3, extra = "") =>
    `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;

  const T = (x, y, value, size = 15, color = C.ink, extra = "") =>
    `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="${color}" ${extra}>${value}</text>`;

  const person = (x, y, color = C.navy, scale = 1) =>
    `<g transform="translate(${x} ${y}) scale(${scale})">${O(0,-12,9,color)}<path d="M-16 16 Q-16 -2 0 -2 Q16 -2 16 16Z" fill="${color}"/></g>`;

  const tick = (x, y, color = C.green) =>
    P(`M${x-9} ${y} l7 7 15 -18`,color,4);

  const cross = (x, y, color = C.orange) =>
    P(`M${x-8} ${y-8} l16 16 M${x+8} ${y-8} l-16 16`,color,4);

  const svg = (body, vb = "0 0 340 440") =>
    `<svg class="vls-w03-art" xmlns="${NS}" viewBox="${vb}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Animated BPM teaching illustration">${body}</svg>`;

  const $ = (root, selector) =>
    root ? root.querySelector(selector) : null;

  const $$ = (root, selector) =>
    root ? Array.from(root.querySelectorAll(selector)) : [];

  function set(root, selector, properties) {
    $$(root,selector).forEach(node => {
      Object.entries(properties).forEach(([key,value]) => {
        if (key === "text") {
          node.textContent = String(value);
        } else if (key === "attr") {
          Object.entries(value).forEach(([a,v]) =>
            node.setAttribute(a,String(v))
          );
        } else {
          node.style[key] = String(value);
        }
      });
    });
  }

  const show = (root, selector, visible) =>
    set(root,selector,{opacity:visible?"1":"0"});

  const move = (root, selector, x=0, y=0, scale=1) =>
    set(root,selector,{
      transform:`translate(${x}px,${y}px) scale(${scale})`
    });

  const label = (root, value) => {
    const e = $(root,".vls-w03-status");
    if (e) e.textContent = value;
  };

  const phase = (i,cuts) =>
    cuts.reduce((sum,cut)=>sum+(i>=cut?1:0),0);

  // ============================================================
  // SHARED CSS — ONE STYLE ELEMENT
  //
  // F1: SVG transforms use local bounding boxes.
  // F3: No accent dot or duplicate progress indicator.
  // F4: One heading, outside the artwork.
  // F8: Larger labels for phone readability.
  // F13: Portrait artwork and full-height stage.
  // F14: Each scene clips its own contents.
  // ============================================================

  if (!document.getElementById("vl-sc-w03")) {
    const style = document.createElement("style");
    style.id = "vl-sc-w03";

    const rootSelectors = IDS.map(id =>
      `.vls-w03-${id}`
    ).join(",");

    const childSelectors = IDS.map(id =>
      `.vls-w03-${id} *`
    ).join(",");

    const movingSelectors = IDS.map(id =>
      `.vls-w03-${id} .vls-w03-moving`
    ).join(",");

    const artSelectors = IDS.map(id =>
      `.vls-w03-${id} .vls-w03-art`
    ).join(",");

    const textSelectors = IDS.map(id =>
      `.vls-w03-${id} svg text`
    ).join(",");

    const topSelectors = IDS.map(id =>
      `.vls-w03-${id} .vls-w03-top`
    ).join(",");

    const statusSelectors = IDS.map(id =>
      `.vls-w03-${id} .vls-w03-status`
    ).join(",");

    const instantSelectors = IDS.map(id =>
      `.vls-w03-${id}.vls-w03-instant *`
    ).join(",");

    style.textContent = [
      `${rootSelectors}{--navy:#1f4e79;--orange:#c0502a;--paper:#fbf8f1;--ink:#1b2a3a;--blue:#dbe7f2;--green:#317c61;position:relative;display:flex;flex-direction:column;width:100%;height:100%;min-height:0;overflow:hidden;box-sizing:border-box;isolation:isolate;background:transparent;color:var(--ink);font-family:inherit;contain:paint;}`,
      `${childSelectors}{box-sizing:border-box;}`,
      `${artSelectors}{display:block;flex:1 1 auto;width:100%;height:100%;min-height:0;max-width:100%;max-height:100%;overflow:hidden;font-family:inherit;}`,
      `${textSelectors}{font-family:inherit;font-weight:700;letter-spacing:.1px;}`,
      `${movingSelectors}{transition:transform .85s cubic-bezier(.2,.75,.2,1),opacity .65s ease,fill .7s ease,stroke .7s ease,stroke-dashoffset .9s ease;transform-box:fill-box;transform-origin:center;}`,
      `${topSelectors}{position:absolute;top:2%;left:5%;right:5%;z-index:3;text-align:center;color:var(--navy);font-size:12px;font-weight:800;letter-spacing:1.1px;line-height:1.35;pointer-events:none;}`,
      `${statusSelectors}{position:absolute;bottom:1.5%;left:5%;right:5%;z-index:3;text-align:center;color:var(--navy);font-size:13px;font-weight:750;line-height:1.3;pointer-events:none;}`,
      `${instantSelectors}{transition:none!important;animation:none!important;}`,
      `.vls-w03-W3O2b .needle{transform-box:view-box;transform-origin:170px 205px;}`,
      `.vls-w03-W3O1a .guest,.vls-w03-W3O1a .camera,.vls-w03-W3O1a .screen,.vls-w03-W3O1a .connection{transition:transform 1s ease,opacity .7s ease;transform-box:fill-box;transform-origin:center;}`,
      `.vls-w03-W3O1b .lift,.vls-w03-W3O1b .layer,.vls-w03-W3O1b .signal{transition:transform .9s ease,opacity .7s ease;transform-box:fill-box;transform-origin:center;}`,
      `.vls-w03-W3O2a .bridge,.vls-w03-W3O2a .leader,.vls-w03-W3O2a .worker,.vls-w03-W3O2a .cable{transition:transform .9s ease,opacity .7s ease;transform-box:fill-box;transform-origin:center;}`,
      `.vls-w03-W3O2b .measure,.vls-w03-W3O2b .target,.vls-w03-W3O2b .owner{transition:opacity .7s ease,transform .8s ease;}`,
      `.vls-w03-W3O2c .chamber,.vls-w03-W3O2c .failure{transition:opacity .7s ease,transform .85s ease;transform-box:fill-box;transform-origin:center;}`,
      `.vls-w03-W3O3a .curtain,.vls-w03-W3O3a .projector,.vls-w03-W3O3a .exception,.vls-w03-W3O3a .director{transition:transform .9s ease,opacity .7s ease;transform-box:fill-box;transform-origin:center;}`,
      `.vls-w03-W3O3b .cost,.vls-w03-W3O3b .clock,.vls-w03-W3O3b .chain{transition:transform .9s ease,opacity .7s ease;transform-box:fill-box;transform-origin:center;}`,
      `.vls-w03-W3O3c .vault,.vls-w03-W3O3c .lock,.vls-w03-W3O3c .key,.vls-w03-W3O3c .seal{transition:transform .9s ease,opacity .7s ease;transform-box:fill-box;transform-origin:center;}`,
      `.vls-w03-W3O2d .scanner,.vls-w03-W3O2d .hospital,.vls-w03-W3O2d .evidence,.vls-w03-W3O2d .result{transition:transform .9s ease,opacity .7s ease;transform-box:fill-box;transform-origin:center;}`,
      `@media(max-width:375px){${topSelectors}{font-size:11px;letter-spacing:.8px;}${statusSelectors}{font-size:12px;}}`,
      `@media(prefers-reduced-motion:reduce){${childSelectors}{animation:none!important;transition:none!important;}}`
    ].join("\n");

    document.head.appendChild(style);
  }

  // ============================================================
  // SCENE ENGINE
  //
  // Build once per mount.
  // Seek-safe updates.
  // Correct index scaling when host n differs.
  // Genuine scene changes at conceptual beats.
  // Small physical motion at intervening narration moments.
  // ============================================================

  function register(id,config) {
    let root=null;
    let lastIndex=-1;
    let animation=null;

    function stopAnimation() {
      if(animation) {
        try { animation.kill(); } catch(_) {}
        animation=null;
      }
    }

    function apply(index,total,instant) {
      if(!root) return;

      const rawN=Number(total);
      const n=Number.isFinite(rawN)&&rawN>0
        ?Math.max(1,Math.floor(rawN))
        :config.count;

      const rawI=Number(index);
      const i=clamp(
        Number.isFinite(rawI)?Math.floor(rawI):0,
        0,
        n-1
      );

      // F15: scale the narration index to authored beat cuts.
      const ii=Math.round(
        i*(config.count-1)/Math.max(1,n-1)
      );

      const beat=phase(ii,config.cuts);
      const local=ii-(config.cuts[beat-1]||0);

      stopAnimation();

      root.classList.toggle(
        "vls-w03-instant",
        instant||reduced()
      );

      config.render(root,beat,ii,local,n);

      // Motion on every narration moment, without using
      // meaningless floating accent dots or progress bars.
      const motion=$(root,".vls-w03-micro");

      if(motion) {
        const dx=Math.sin(i*1.71)*3;
        const dy=Math.cos(i*1.31)*2.5;
        const angle=Math.sin(i*.93)*2.2;

        const transform=
          `translate(${dx}px,${dy}px) rotate(${angle}deg)`;

        if(!instant&&!reduced()&&window.gsap) {
          animation=window.gsap.to(motion,{
            x:dx,
            y:dy,
            rotation:angle,
            duration:.65,
            ease:"power2.out",
            overwrite:true
          });
        } else {
          motion.style.transform=transform;
        }
      }

      // Even a repeated conceptual beat changes its short
      // scene-specific visual status only when meaningful.
      lastIndex=i;
    }

    window.VL_SCENES[id]={
      build(el) {
        if(!el||typeof el.replaceChildren!=="function") return;

        stopAnimation();

        root=document.createElement("div");
        root.className=`vls-w03-${id}`;

        root.innerHTML=[
          `<div class="vls-w03-top">${config.heading}</div>`,
          svg(config.art,config.vb||"0 0 340 440"),
          `<div class="vls-w03-status"></div>`
        ].join("");

        el.replaceChildren(root);
        lastIndex=-1;
        apply(0,config.count,true);
      },

      step(i,n) {
        if(!root) return;
        apply(i,n,false);
      },

      reset() {
        if(!root) return;
        stopAnimation();
        lastIndex=-1;
        apply(0,config.count,true);
      }
    };
  }

  // ============================================================
  // SCENE 1 — W3O1a
  // THE SEDUCTIVE CHECK-IN KIOSK
  //
  // Audit corrections:
  // - Named PMS and BILLING systems.
  // - Broken information connections visible at beat zero.
  // - Guest starts clear of both panels.
  // - No dangling perspective lines.
  // - No accent dot or duplicate progress indicator.
  // - Portrait composition uses the lower stage.
  // ============================================================

  {
    const art=[
      `<defs><radialGradient id="w03a-light"><stop stop-color="${C.blue}" stop-opacity=".85"/><stop offset="1" stop-color="${C.paper}" stop-opacity="0"/></radialGradient></defs>`,
      O(170,220,160,"url(#w03a-light)"),
      `<g class="camera">`,
      P("M15 320 L170 265 L325 320",C.grey,2),
      P("M15 320 V405 M325 320 V405",C.blue,2),
      P("M15 352 Q170 294 325 352",C.blue,1),
      P("M15 385 Q170 325 325 385",C.blue,1),
      P("M15 415 Q170 355 325 415",C.blue,1),
      R(19,105,69,151,C.paper,4,
        `stroke="${C.grey}" stroke-width="3"`),
      R(252,105,69,151,C.paper,4,
        `stroke="${C.grey}" stroke-width="3"`),
      P("M27 125 H80 M260 125 H313",C.orange,3),
      T(53,149,"PMS",15,C.navy),
      T(287,149,"BILLING",14,C.navy),
      P("M30 166 H76 M30 180 H69 M30 194 H74",C.grey,3),
      P("M263 166 H309 M263 180 H302 M263 194 H307",C.grey,3),
      `<g class="kiosk vls-w03-moving">`,
      O(170,320,47,C.navy,`opacity=".12"`),
      R(125,115,90,157,C.navy,15),
      R(134,125,72,105,C.blue,8),
      R(145,139,50,12,C.green,5),
      P("M147 169 H193 M147 183 H182",C.navy,3),
      O(170,209,6,C.green),
      P("M170 272 V321 M143 321 H197",C.navy,8),
      `</g>`,
      `<g class="screen vls-w03-moving">`,
      R(139,155,62,52,C.orange,7),
      T(170,188,"!",31,C.white),
      `</g>`,
      `<g class="guest vls-w03-moving">`,
      person(40,312,C.navy,1.1),
      R(58,304,18,27,C.orange,3),
      `</g>`,
      `<g class="connection vls-w03-moving">`,
      P("M125 218 C104 218 100 212 88 212",C.orange,4,
        `stroke-dasharray="7 6"`),
      P("M215 218 C236 218 240 212 252 212",C.orange,4,
        `stroke-dasharray="7 6"`),
      O(105,215,7,C.orange),
      O(235,215,7,C.orange),
      cross(105,215,C.white),
      cross(235,215,C.white),
      `</g>`,
      `<g class="redesign vls-w03-moving">`,
      P("M53 368 Q170 328 287 368",C.green,6),
      O(53,368,10,C.green),
      O(170,343,10,C.green),
      O(287,368,10,C.green),
      tick(170,183,C.green),
      `</g>`,
      `<g class="manual vls-w03-moving">`,
      R(112,65,116,43,C.paper,7,
        `stroke="${C.orange}" stroke-width="2"`),
      T(170,84,"PROCESS",14,C.navy),
      T(170,100,"BEFORE TOOL",14,C.orange),
      `</g>`,
      `<g class="vls-w03-micro">`,
      O(170,240,5,C.orange),
      `</g>`,
      `</g>`
    ].join("");

    register("W3O1a",{
      count:32,
      heading:"THE SCREEN IS NOT THE PROCESS",
      vb:"0 35 340 410",
      cuts:[3,5,7,9,13,16,19,22,26,29],
      art,

      render(r,b,i) {
        const positions=[0,10,22,36,45,45,50,55,45,25,0];

        move(r,".guest",Math.min(60,positions[b]),0);

        show(r,".screen",b>=3&&b<=7);

        // The broken links are visible from the opening frame.
        show(r,".connection",b<=8);

        show(r,".redesign",b>=8);
        show(r,".manual",b>=6&&b<=9);

        set(r,".kiosk",{
          opacity:b===7?".35":"1",
          transform:b===8
            ?"translateY(12px) scale(.9)"
            :"translateY(0) scale(1)"
        });

        set(r,".camera",{
          transform:`translateY(${b===4?-5:0}px) scale(${b===4?1.025:1})`
        });

        label(r,[
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
        ][b]);
      }
    });
  }

  // ============================================================
  // SCENE 2 — W3O1b
  // THE FIVE-STOREY BPM MACHINE
  //
  // Audit corrections:
  // - No duplicate SVG title.
  // - Lift completely outside the building border.
  // - All five layers remain readable.
  // - Dashboard does not obscure floor labels.
  // - Unused rules indicator does not strike through text.
  // - Extended portrait composition.
  // ============================================================

  {
    const names=[
      "MODELLING",
      "WORKFLOW",
      "RULES",
      "INTEGRATION",
      "MONITORING"
    ];

    const floors=names.map((name,j)=>{
      const y=95+j*60;

      return [
        `<g class="layer layer-${j} vls-w03-moving">`,
        R(73,y,213,50,C.paper,8,
          `stroke="${C.navy}" stroke-width="2"`),
        R(78,y+5,11,40,j===2?C.orange:C.green,3),
        T(176,y+21,name,15,C.navy),
        P(`M111 ${y+34} H244`,C.blue,4),
        O(265,y+25,8,C.green),
        `</g>`
      ].join("");
    }).join("");

    const art=[
      R(62,77,239,333,C.blue,15,
        `fill-opacity=".3" stroke="${C.grey}" stroke-width="2"`),
      floors,
      P("M29 91 V392",C.navy,5),
      P("M20 91 H39 M20 392 H39",C.navy,4),
      `<g class="lift vls-w03-moving">`,
      R(9,94,39,47,C.navy,8),
      R(15,101,27,27,C.paper,4),
      O(28,114,7,C.orange),
      `</g>`,
      `<g class="signal vls-w03-moving">`,
      P("M300 117 H321 V357 H300",C.green,3),
      O(321,117,6,C.green),
      O(321,357,6,C.green),
      `</g>`,
      `<g class="unused vls-w03-moving">`,
      O(265,240,13,C.paper,
        `stroke="${C.orange}" stroke-width="2"`),
      cross(265,240,C.orange),
      `</g>`,
      `<g class="dashboard vls-w03-moving">`,
      R(97,112,149,261,C.paper,10,
        `stroke="${C.orange}" stroke-width="3"`),
      T(171,145,"LIVE RESULTS",15,C.navy),
      P("M119 306 V257 M153 306 V213 M187 306 V180",
        C.green,13),
      P("M111 325 H219",C.navy,3),
      `</g>`,
      `<g class="vls-w03-micro">`,
      O(310,390,7,C.green),
      `</g>`
    ].join("");

    register("W3O1b",{
      count:34,
      heading:"FIVE LAYERS · ONE PROCESS",
      vb:"0 50 340 390",
      cuts:[3,6,9,12,15,18,21,24,27,30],
      art,

      render(r,b,i) {
        const floor=Math.min(4,Math.floor(b/2));

        move(r,".lift",0,floor*60);

        for(let j=0;j<5;j++){
          const active=j<=floor;
          const dashboard=b===7||b===8;

          set(r,`.layer-${j}`,{
            opacity:dashboard
              ?".15"
              :active?"1":".45",
            transform:active
              ?`translateX(${(i%3)*1.5}px)`
              :"translateX(0)"
          });
        }

        show(r,".unused",b===8||b===9);
        show(r,".dashboard",b===7||b===8);

        set(r,".signal",{
          opacity:b>=5?"1":".45",
          transform:`translateY(${(i%4)*3}px)`
        });

        label(r,[
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
        ][b]);
      }
    });
  }

  // ============================================================
  // SCENE 3 — W3O2a
  // THE LEADERSHIP BRIDGE
  //
  // Audit corrections:
  // - Preserve the original suspension-bridge concept.
  // - Entire bridge artwork moved down 34 SVG units.
  // - Removed the leader's exclamation bubble.
  // - Leader invisible until the sponsorship beat.
  // - Bridge and river extend into the portrait lower stage.
  // - No overlapping heading.
  // ============================================================

  {
    const art=[
      `<defs><linearGradient id="w03leadwater" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${C.blue}"/><stop offset="1" stop-color="${C.paper}"/></linearGradient></defs>`,
      `<g transform="translate(0 34)">`,
      R(0,215,340,180,"url(#w03leadwater)",0),
      P("M0 236 Q40 224 80 236 T160 236 T240 236 T340 236",C.grey,2),
      P("M0 268 Q40 256 80 268 T160 268 T240 268 T340 268",C.grey,2),
      P("M0 304 Q40 292 80 304 T160 304 T240 304 T340 304",C.grey,2),
      P("M0 344 Q40 332 80 344 T160 344 T240 344 T340 344",C.grey,2),
      R(0,175,92,44,C.blue,5),
      R(248,175,92,44,C.blue,5),
      T(45,166,"RECEPTION",14,C.navy),
      T(295,166,"REVENUE",14,C.navy),
      `<g class="bridge vls-w03-moving">`,
      P("M69 215 H271",C.navy,8),
      P("M87 215 V98 M253 215 V98",C.navy,8),
      P("M87 104 Q170 176 253 104",C.orange,5),
      ...[105,127,149,171,193,215,237].map(x=>
        P(`M${x} 215 V${120+Math.abs(x-171)*.29}`,C.grey,2)
      ),
      `</g>`,
      `<g class="gap vls-w03-moving">`,
      R(147,205,47,21,C.paper,2),
      P("M147 207 L194 226 M194 207 L147 226",C.orange,4),
      `</g>`,
      `<g class="leader vls-w03-moving">`,
      person(170,76,C.orange,1.25),
      `</g>`,
      `<g class="owner vls-w03-moving">`,
      person(170,190,C.green,.9),
      O(170,162,14,C.paper,
        `stroke="${C.green}" stroke-width="2"`),
      tick(170,164),
      `</g>`,
      `<g class="worker worker-a vls-w03-moving">`,
      person(42,200,C.navy,.8),
      `</g>`,
      `<g class="worker worker-b vls-w03-moving">`,
      person(297,200,C.green,.8),
      `</g>`,
      `<g class="cable vls-w03-moving">`,
      P("M42 305 Q170 360 297 305",C.green,5),
      O(42,305,8,C.green),
      O(297,305,8,C.green),
      `</g>`,
      `<g class="knowledge vls-w03-moving">`,
      O(170,326,36,C.paper,
        `stroke="${C.green}" stroke-width="3"`),
      T(170,320,"FRONT-LINE",14,C.navy),
      T(170,339,"INSIGHT",14,C.green),
      `</g>`,
      `<g class="vls-w03-micro">`,
      O(170,395,5,C.green),
      `</g>`,
      `</g>`
    ].join("");

    register("W3O2a",{
      count:25,
      heading:"PEOPLE HOLD THE PROCESS",
      vb:"0 45 340 395",
      cuts:[2,5,8,11,14,17,20,23],
      art,

      render(r,b,i) {
        show(r,".gap",b<4);
        show(r,".owner",b>=4);
        show(r,".knowledge",b>=6);
        show(r,".cable",b>=5);

        // The leader appears only when sponsorship is discussed.
        // Opacity is controlled here, in one place.
        set(r,".leader",{
          opacity:b<2?"0":"1",
          transform:`translateY(${b===2?-10:0}px)`
        });

        set(r,".bridge",{
          opacity:b<3?".55":"1",
          transform:b===2
            ?"translateY(9px)"
            :"translateY(0)"
        });

        move(r,".worker-a",
          b>=6?Math.min(75,Math.max(0,i-17)*8):0,0
        );

        move(r,".worker-b",
          b>=6?-Math.min(75,Math.max(0,i-17)*8):0,0
        );

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
  // SCENE 4 — W3O2b
  // THE BENEFITS OBSERVATORY
  //
  // A large precision instrument turns the promised business
  // benefit into something that can actually be measured.
  //
  // Audit corrections:
  // - No duplicate title inside the SVG.
  // - Readable baseline, target and actual measurements.
  // - Needle rotates about the gauge centre.
  // - Owner and timeline occupy separate visual zones.
  // - No accent dot or duplicate progress indicator.
  // - Every narration moment changes a physical element.
  // ============================================================

  {
    const art=[
      `<defs>`,
      `<radialGradient id="w03b-gauge">`,
      `<stop stop-color="${C.white}"/>`,
      `<stop offset="1" stop-color="${C.blue}"/>`,
      `</radialGradient>`,
      `</defs>`,

      `<g class="observatory vls-w03-moving">`,
      O(170,205,120,C.blue,
        `fill-opacity=".45" stroke="${C.navy}" stroke-width="4"`),
      O(170,205,101,"url(#w03b-gauge)",
        `stroke="${C.grey}" stroke-width="2"`),

      ...Array.from({length:11},(_,j)=>{
        const a=(-130+j*26)*Math.PI/180;
        const x1=170+79*Math.sin(a);
        const y1=205-79*Math.cos(a);
        const x2=170+94*Math.sin(a);
        const y2=205-94*Math.cos(a);
        return P(
          `M${x1.toFixed(2)} ${y1.toFixed(2)} L${x2.toFixed(2)} ${y2.toFixed(2)}`,
          C.navy,2
        );
      }),

      O(170,205,72,"none",
        `stroke="${C.grey}" stroke-width="2"`),
      `</g>`,

      `<g class="needle vls-w03-moving">`,
      P("M170 205 L170 127",C.orange,7),
      O(170,205,12,C.navy),
      O(170,205,5,C.paper),
      `</g>`,

      `<g class="measure vls-w03-moving">`,
      T(170,249,"4.1 h",29,C.navy),
      T(170,272,"BASELINE",15,C.navy),
      `</g>`,

      `<g class="target vls-w03-moving">`,
      O(170,205,61,"none",
        `stroke="${C.green}" stroke-width="4" stroke-dasharray="9 6"`),
      T(170,249,"2.87 h",27,C.green),
      T(170,272,"TARGET",15,C.green),
      `</g>`,

      `<g class="actual vls-w03-moving">`,
      T(170,249,"3.9 h",29,C.orange),
      T(170,272,"ACTUAL",15,C.orange),
      `</g>`,

      `<g class="compass vls-w03-moving">`,
      O(170,61,24,C.paper,
        `stroke="${C.navy}" stroke-width="3"`),
      P("M170 43 L178 68 L170 61 L162 68 Z",C.orange,2),
      O(170,61,4,C.navy),
      `</g>`,

      `<g class="owner vls-w03-moving">`,
      O(61,356,35,C.blue),
      person(61,364,C.green,.9),
      P("M96 356 H141",C.green,4),
      O(147,356,8,C.green),
      T(62,406,"OWNER",14,C.navy),
      `</g>`,

      `<g class="timeline vls-w03-moving">`,
      P("M171 355 H307",C.navy,4),
      O(181,355,9,C.orange),
      O(239,355,9,C.blue),
      O(298,355,9,C.green),
      P("M181 355 V377 M239 355 V377 M298 355 V377",C.grey,2),
      T(240,400,"AFTER LAUNCH",14,C.navy),
      `</g>`,

      `<g class="vls-w03-micro">`,
      O(170,205,17,"none",
        `stroke="${C.orange}" stroke-width="2" stroke-dasharray="5 5"`),
      `</g>`
    ].join("");

    register("W3O2b",{
      count:27,
      heading:"A PROMISE NEEDS PROOF",
      vb:"0 35 340 405",
      cuts:[3,6,9,12,15,18,21,24],
      art,

      render(r,b,i) {
        show(r,".compass",b>=1);
        show(r,".measure",b<4);
        show(r,".target",b>=4&&b<=5);
        show(r,".actual",b>=6);
        show(r,".owner",b>=3);
        show(r,".timeline",b>=7);

        const angles=[
          -45,-30,-15,0,36,36,8,8,0
        ];

        // The needle uses the SVG viewBox as its transform box.
        // This preserves the fixed gauge pivot at (170,205).
        set(r,".needle",{
          transform:`rotate(${angles[b]+(i%3)*2}deg)`
        });

        set(r,".observatory",{
          transform:`scale(${1+(i%4)*.003})`
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
  // SCENE 5 — W3O2c
  // THE FIVE FAILURE MECHANISMS
  //
  // Completely rebuilt after the harsh review.
  //
  // This is NOT another five-storey machine.
  //
  // Five distinct physical mechanisms occupy a 2+3 layout:
  // 1. Shelfware: closed binder gathering dust.
  // 2. Auto mess: tangled work on a conveyor.
  // 3. Stalled pilot: one live lamp, four dark lamps.
  // 4. Lost benefits: a leaking collection bucket.
  // 5. Rejection: person raising a stop hand.
  //
  // The focus moves from mechanism to mechanism.
  // The active mechanism enlarges about its own centre.
  // Inactive mechanisms remain legible at .45 opacity.
  // ============================================================

  {
    const cells=[
      [24,70],
      [176,70],
      [24,170],
      [176,170],
      [100,270]
    ];

    const binder=[
      R(56,96,62,48,C.navy,5),
      R(63,102,49,35,C.paper,3),
      P("M73 109 H102 M73 118 H102 M73 127 H94",C.grey,2),
      P("M49 92 Q72 72 96 89",C.grey,2),
      P("M96 89 Q109 80 120 91",C.grey,2),
      P("M57 83 Q82 76 106 91",C.grey,1),
      O(113,88,3,C.grey)
    ].join("");

    const conveyor=[
      R(193,119,107,20,C.navy,7),
      ...[205,229,253,277].map(x=>
        O(x,129,6,C.grey)
      ),
      P(
        "M213 109 C232 83 244 121 259 99 C276 78 291 112 280 119 C264 132 250 90 232 117",
        C.orange,5
      ),
      P("M190 145 H304",C.grey,2)
    ].join("");

    const pilot=[
      ...Array.from({length:5},(_,j)=>{
        const x=44+j*21;
        return [
          O(x,207,8,j===0?C.green:C.grey),
          O(x,207,12,"none",
            `stroke="${j===0?C.green:C.grey}" stroke-width="2"`),
          P(`M${x} 221 V236`,C.grey,2)
        ].join("");
      }),
      P("M40 241 H134",C.navy,4)
    ].join("");

    const leaking=[
      P("M205 206 H286 L278 243 H214 Z",C.navy,4),
      P("M219 218 H272",C.blue,8),
      P("M222 246 Q231 258 238 246",C.orange,3),
      O(238,261,5,C.orange),
      O(247,272,4,C.orange),
      O(257,283,3,C.orange)
    ].join("");

    const rejection=[
      person(151,318,C.navy,1),
      P("M167 321 L184 300",C.navy,7),
      O(190,291,12,C.orange),
      P("M190 280 V303 M180 291 H200",C.paper,2),
      P("M211 309 H226",C.orange,3),
      P("M211 320 H234",C.orange,3)
    ].join("");

    const names=[
      "SHELFWARE",
      "AUTO MESS",
      "STALLED PILOT",
      "LOST BENEFITS",
      "REJECTION"
    ];

    const drawings=[
      binder,conveyor,pilot,leaking,rejection
    ];

    const art=[
      ...cells.map(([x,y],j)=>{
        const bottom=j===4;
        const cx=x+70;

        return [
          `<g class="chamber chamber-${j} vls-w03-moving">`,
          R(x,y,140,90,C.paper,11,
            `stroke="${j%2?C.orange:C.navy}" stroke-width="2.5"`),
          drawings[j],
          T(cx,y+78,names[j],14,C.navy),
          `</g>`
        ].join("");
      }),

      `<g class="failure vls-w03-moving">`,
      O(170,219,57,C.paper,
        `stroke="${C.orange}" stroke-width="4"`),
      O(170,202,22,C.blue),
      cross(170,202),
      T(170,251,"ROOT CAUSE",14,C.navy),
      `</g>`,

      `<g class="repair vls-w03-moving">`,
      P("M72 386 H268",C.green,5),
      O(72,386,9,C.green),
      O(170,386,9,C.green),
      O(268,386,9,C.green),
      tick(170,368),
      T(170,418,"PREVENT FAILURE",14,C.green),
      `</g>`,

      `<g class="vls-w03-micro">`,
      O(170,387,5,C.green),
      `</g>`
    ].join("");

    register("W3O2c",{
      count:28,
      heading:"FIVE PREDICTABLE FAILURES",
      vb:"0 35 340 405",
      cuts:[2,5,8,11,14,17,20,23,26],
      art,

      render(r,b,i) {
        const focus=clamp(
          b===0?0:
          b===1?0:
          b===2?1:
          b===3?2:
          b===4?3:
          b===5?4:
          Math.floor(Math.max(0,i-17)/3),
          0,4
        );

        for(let j=0;j<5;j++) {
          const active=j===focus;

          // Scale the entire mechanism, including its border.
          // F1 prevents scaling towards SVG (0,0).
          set(r,`.chamber-${j}`,{
            opacity:b>=6?"1":active?"1":".45",
            transform:active
              ?`scale(${1.06+(i%3)*.01})`
              :"scale(1)"
          });
        }

        show(r,".failure",b>=6&&b<=8);
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
  // SCENE 6 — W3O3a
  // THE VENDOR DEMONSTRATION THEATRE
  //
  // Audit corrections:
  // - No giant orange slab at beat zero.
  // - Curtains are dark red and partly open.
  // - Three vendors are visible from the opening frame.
  // - A, B and C have separate podiums and clear labels.
  // - People are not trapped beneath the curtain hem.
  // - Projector and exception card never overlap.
  // - Theatre floor extends into the portrait lower area.
  // ============================================================

  {
    const art=[
      `<defs>`,
      `<linearGradient id="w03theatre-floor" x1="0" y1="0" x2="0" y2="1">`,
      `<stop stop-color="${C.blue}"/>`,
      `<stop offset="1" stop-color="${C.paper}"/>`,
      `</linearGradient>`,
      `</defs>`,

      R(17,63,306,256,C.blue,13,
        `fill-opacity=".28" stroke="${C.navy}" stroke-width="3"`),

      `<g class="stage-back">`,
      P("M33 292 H307",C.navy,5),
      P("M33 293 L5 400 M307 293 L335 400",C.grey,2),
      P("M89 293 L72 400 M170 293 V400 M251 293 L268 400",C.grey,2),
      R(32,293,276,104,"url(#w03theatre-floor)",2),
      `</g>`,

      `<g class="projector vls-w03-moving">`,
      R(67,85,206,188,C.paper,10),
      R(117,105,106,125,C.navy,13),
      R(128,116,84,78,C.blue,7),
      tick(170,156),
      T(170,218,"EASY ARRIVAL",14,C.white),
      `</g>`,

      `<g class="exception vls-w03-moving">`,
      R(84,94,172,160,C.paper,9,
        `stroke="${C.orange}" stroke-width="3"`),
      person(116,180,C.navy,.9),
      R(168,137,66,54,C.blue,6),
      cross(201,163),
      T(170,229,"ROOM NOT READY",14,C.orange),
      `</g>`,

      `<g class="curtain left-curtain vls-w03-moving">`,
      R(19,64,151,224,C.red,7,
        `fill-opacity=".9"`),
      ...Array.from({length:6},(_,j)=>
        P(`M${35+j*24} 64 V288`,C.paper,2,
          `opacity=".35"`)
      ),
      `</g>`,

      `<g class="curtain right-curtain vls-w03-moving">`,
      R(170,64,151,224,C.red,7,
        `fill-opacity=".9"`),
      ...Array.from({length:6},(_,j)=>
        P(`M${185+j*24} 64 V288`,C.paper,2,
          `opacity=".35"`)
      ),
      `</g>`,

      `<g class="director vls-w03-moving">`,
      R(64,326,72,43,C.paper,6,
        `stroke="${C.green}" stroke-width="2"`),
      R(134,326,72,43,C.paper,6,
        `stroke="${C.orange}" stroke-width="2"`),
      R(204,326,72,43,C.paper,6,
        `stroke="${C.navy}" stroke-width="2"`),

      person(100,312,C.green,.75),
      person(170,312,C.orange,.75),
      person(240,312,C.navy,.75),

      T(100,355,"A",17,C.green),
      T(170,355,"B",17,C.orange),
      T(240,355,"C",17,C.navy),
      `</g>`,

      `<g class="test vls-w03-moving">`,
      P("M75 393 H265",C.green,5),
      O(75,393,8,C.green),
      O(170,393,8,C.green),
      O(265,393,8,C.green),
      `</g>`,

      `<g class="vls-w03-micro">`,
      O(170,392,5,C.orange),
      `</g>`
    ].join("");

    register("W3O3a",{
      count:29,
      heading:"WHO DESIGNS THE PROCESS?",
      vb:"0 40 340 400",
      cuts:[2,5,8,11,14,17,20,23,26],
      art,

      render(r,b,i) {
        // At beat zero the curtains are already parted.
        // Three separate vendor podiums remain visible.
        const opening=b===0?46:b===1?85:125;

        move(r,".left-curtain",-opening,0);
        move(r,".right-curtain",opening,0);

        // No projector/exception overlap at beat five.
        show(r,".projector",b>=1&&b<=4);
        show(r,".exception",b>=5);

        // Vendors remain visible throughout.
        set(r,".director",{
          opacity:"1",
          transform:`translateY(${b>=3?-5:0}px)`
        });

        show(r,".test",b>=7);

        // Each vendor demonstration has a slightly different
        // physical emphasis at successive narration moments.
        const podiums=$$(r,".director rect");

        podiums.forEach((node,j)=>{
          const selected=(i%3)===j;
          node.style.strokeWidth=selected?"4":"2";
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
  // SCENE 7 — W3O3b
  // THE FOUR-YEAR COST MACHINE
  //
  // Two purchasing routes become two different futures.
  //
  // Vendor B begins with attractive functionality but creates
  // custom-code dependencies, maintenance work and upgrade cost.
  // Vendors A/C preserve more local configurability.
  //
  // Audit corrections:
  // - Distinct mechanical paths rather than text cards.
  // - No overlapping cost labels.
  // - Vendor B and A/C remain visible together.
  // - The four-year horizon is explicit.
  // - Clock and final freedom symbol never overlap.
  // - Physical movement advances at every narration moment.
  // ============================================================

  {
    const art=[
      `<defs>`,
      `<linearGradient id="w03costrail" x1="0" y1="0" x2="0" y2="1">`,
      `<stop stop-color="${C.blue}"/>`,
      `<stop offset="1" stop-color="${C.paper}"/>`,
      `</linearGradient>`,
      `</defs>`,

      `<g class="purchase vls-w03-moving">`,
      O(170,75,29,C.blue,
        `stroke="${C.navy}" stroke-width="3"`),
      T(170,81,"BUY",17,C.navy),
      P("M170 104 V119",C.navy,5),
      P("M170 119 Q170 139 91 151",C.orange,5),
      P("M170 119 Q170 139 249 151",C.green,5),
      `</g>`,

      T(91,142,"VENDOR B",15,C.orange),
      T(249,142,"A / C",15,C.green),

      `<g class="cost cost-b vls-w03-moving">`,
      R(30,161,122,166,C.paper,11,
        `stroke="${C.orange}" stroke-width="3"`),
      T(91,188,"CUSTOM CODE",13,C.orange),
      O(91,234,30,C.blue),
      ...Array.from({length:8},(_,j)=>
        P("M91 196 V206",C.orange,5,
          `transform="rotate(${j*45} 91 234)"`)
      ),
      O(91,234,15,C.orange),
      P("M55 285 H127",C.orange,5),
      T(91,307,"HIGH CHANGE",13,C.orange),
      `</g>`,

      `<g class="cost cost-ac vls-w03-moving">`,
      R(188,161,122,166,C.paper,11,
        `stroke="${C.green}" stroke-width="3"`),
      T(249,188,"CONFIGURE",13,C.green),
      O(249,234,30,C.blue),
      tick(249,235),
      P("M213 285 H285",C.green,5),
      T(249,307,"LOW CHANGE",13,C.green),
      `</g>`,

      `<g class="chain vls-w03-moving">`,
      P("M91 327 V363 H170",C.orange,5),
      P("M249 327 V363 H170",C.green,5),
      O(170,363,16,C.paper,
        `stroke="${C.navy}" stroke-width="3"`),
      `</g>`,

      `<g class="clock vls-w03-moving">`,
      O(170,363,31,C.paper,
        `stroke="${C.navy}" stroke-width="3"`),
      P("M170 363 V344 M170 363 L185 372",C.orange,4),
      `</g>`,

      `<g class="freedom vls-w03-moving">`,
      O(170,363,31,C.pale,
        `stroke="${C.green}" stroke-width="3"`),
      tick(170,365),
      `</g>`,

      `<g class="years vls-w03-moving">`,
      T(170,415,"FOUR-YEAR HORIZON",15,C.navy),
      `</g>`,

      `<g class="vls-w03-micro">`,
      O(170,119,5,C.orange),
      `</g>`
    ].join("");

    register("W3O3b",{
      count:27,
      heading:"BUY TODAY · CHANGE TOMORROW",
      vb:"0 35 340 405",
      cuts:[3,6,9,12,15,18,21,24],
      art,

      render(r,b,i) {
        show(r,".cost-b",b>=1);
        show(r,".cost-ac",b>=2);
        show(r,".chain",b>=3);
        show(r,".clock",b>=4&&b<=6);
        show(r,".freedom",b>=7);
        show(r,".years",b>=4);

        set(r,".cost-b",{
          opacity:b>=7?".45":"1",
          transform:`translateY(${b>=4?9:0}px)`
        });

        set(r,".cost-ac",{
          transform:`translateY(${b>=7?-9:0}px)`
        });

        set(r,".clock",{
          transform:`rotate(${i*12}deg)`
        });

        set(r,".purchase",{
          transform:`translateY(${Math.sin(i*.8)*2}px)`
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
  // SCENE 8 — W3O3c
  // THE CONTRACT READINESS VAULT
  //
  // Five independent locks protect the purchasing decision:
  // sponsor, process owner, baseline, people and governance.
  //
  // The vault cannot open until the necessary conditions have
  // been demonstrated, not merely promised.
  //
  // Audit corrections:
  // - Five locks positioned around the door without overlap.
  // - Short labels remain readable on a phone.
  // - Keys, realistic test and final seal appear sequentially.
  // - The final evidence seal does not obscure the heading.
  // - The vault occupies the full portrait composition.
  // ============================================================

  {
    const locks=[
      ["SPONSOR",68,137],
      ["OWNER",272,137],
      ["BASELINE",68,277],
      ["PEOPLE",272,277],
      ["GOVERN",170,92]
    ];

    const art=[
      `<defs>`,
      `<radialGradient id="w03vaultmetal">`,
      `<stop stop-color="${C.paper}"/>`,
      `<stop offset="1" stop-color="${C.blue}"/>`,
      `</radialGradient>`,
      `</defs>`,

      `<g class="vault vls-w03-moving">`,
      R(43,94,254,278,C.blue,23,
        `stroke="${C.navy}" stroke-width="6"`),
      O(170,224,98,"url(#w03vaultmetal)",
        `stroke="${C.navy}" stroke-width="8"`),
      O(170,224,72,C.blue,
        `stroke="${C.grey}" stroke-width="3"`),
      O(170,224,40,C.navy),
      P("M170 184 V264 M130 224 H210",C.paper,8),
      O(170,224,11,C.paper),
      `</g>`,

      ...locks.map(([name,x,y],j)=>[
        `<g class="lock lock-${j} vls-w03-moving">`,
        O(x,y,23,C.paper,
          `stroke="${C.orange}" stroke-width="3"`),
        R(x-10,y-1,20,16,C.orange,3),
        P(
          `M${x-8} ${y-1} V${y-10} Q${x} ${y-21} ${x+8} ${y-10} V${y-1}`,
          C.orange,3
        ),
        T(x,y+39,name,12,C.navy),
        `</g>`
      ].join("")),

      `<g class="key vls-w03-moving">`,
      O(170,224,14,C.green),
      P("M170 224 H227 V237 H241",C.green,8),
      O(170,224,5,C.paper),
      `</g>`,

      `<g class="test vls-w03-moving">`,
      R(102,162,136,126,C.paper,12,
        `stroke="${C.green}" stroke-width="3"`),
      person(135,238,C.navy,.85),
      R(177,192,40,37,C.blue,5),
      cross(197,210),
      T(170,267,"REAL CASE",14,C.green),
      `</g>`,

      `<g class="seal vls-w03-moving">`,
      O(170,224,72,C.pale,
        `stroke="${C.green}" stroke-width="5"`),
      tick(170,226),
      T(170,279,"EVIDENCE",15,C.green),
      `</g>`,

      `<g class="foundation vls-w03-moving">`,
      P("M48 388 H292",C.navy,5),
      P("M73 403 H267",C.grey,3),
      T(170,425,"READY TO DECIDE",14,C.navy),
      `</g>`,

      `<g class="vls-w03-micro">`,
      O(170,224,5,C.orange),
      `</g>`
    ].join("");

    register("W3O3c",{
      count:29,
      heading:"THE DECISION MUST BE EARNED",
      vb:"0 35 340 405",
      cuts:[3,6,9,12,15,18,21,24,27],
      art,

      render(r,b,i) {
        const unlocked=Math.min(5,Math.max(0,b-1));

        locks.forEach((_,j)=>{
          const open=j<unlocked;

          set(r,`.lock-${j}`,{
            opacity:open?".3":"1",
            transform:open
              ?"translateY(-9px) scale(.9)"
              :"translateY(0) scale(1)"
          });
        });

        show(r,".key",b>=6&&b<=8);
        show(r,".test",b>=7&&b<=8);
        show(r,".seal",b>=9);

        set(r,".vault",{
          transform:b>=9
            ?"translateX(-9px) scale(.97)"
            :"translateX(0) scale(1)"
        });

        set(r,".foundation",{
          opacity:b>=7?"1":".35"
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
  // SCENE 9 — W3O2d
  // THE NOOR HOSPITAL EVIDENCE X-RAY
  //
  // Five hospital buildings stand behind a transparent scanner.
  // The scan exposes models, unused rules and disconnected data.
  //
  // The final scene distinguishes what is known from what has
  // not been demonstrated by the available evidence.
  //
  // Audit corrections:
  // - Five hospitals are visible and spatially distinct.
  // - Diagnostic overlays do not cover the entire screen.
  // - The actual and target measurements remain readable.
  // - The scan line moves through the hospital group.
  // - The evidence/diagnosis distinction is explicit.
  // - The lower stage contains the outcome comparison.
  // ============================================================

  {
    const buildings=Array.from({length:5},(_,j)=>{
      const x=17+j*63;

      return [
        `<g class="hospital hospital-${j} vls-w03-moving">`,
        R(x,111,51,158,C.paper,5,
          `stroke="${C.navy}" stroke-width="2"`),
        R(x+10,93,31,20,C.navy,3),
        P(
          `M${x+25} 97 V109 M${x+19} 103 H${x+31}`,
          C.paper,3
        ),
        ...[0,1,2].map(k=>
          R(x+11,130+k*36,29,20,C.blue,3)
        ),
        R(x+18,240,15,29,C.navy,2),
        `</g>`
      ].join("");
    }).join("");

    const art=[
      buildings,

      P("M13 271 H327",C.grey,3),

      `<g class="scanner vls-w03-moving">`,
      R(11,83,318,207,"none",12,
        `stroke="${C.green}" stroke-width="3" stroke-dasharray="8 6"`),
      R(14,115,312,7,C.green,3,
        `opacity=".55"`),
      `</g>`,

      `<g class="evidence models vls-w03-moving">`,
      R(92,124,156,137,C.paper,12,
        `stroke="${C.navy}" stroke-width="3"`),
      T(170,159,"91 MODELS",22,C.navy),
      P("M118 185 H222 M118 204 H222 M118 223 H198",C.grey,4),
      T(170,245,"2019 MANUAL",14,C.orange),
      `</g>`,

      `<g class="evidence unused vls-w03-moving">`,
      R(85,126,170,137,C.paper,12,
        `stroke="${C.orange}" stroke-width="3"`),
      O(170,183,37,C.blue),
      cross(170,183),
      T(170,242,"UNUSED RULES",15,C.orange),
      `</g>`,

      `<g class="evidence disconnected vls-w03-moving">`,
      R(89,128,162,133,C.paper,11,
        `stroke="${C.orange}" stroke-width="3"`),
      P("M114 221 V191 M145 221 V169 M176 221 V198",C.navy,9),
      P("M202 170 L225 194",C.orange,5),
      cross(213,181),
      T(170,245,"NO DATA LINK",15,C.orange),
      `</g>`,

      `<g class="result vls-w03-moving">`,
      R(38,302,264,82,C.paper,12,
        `stroke="${C.navy}" stroke-width="2"`),
      T(99,334,"4.1 h",24,C.navy),
      T(241,334,"3.9 h",24,C.orange),
      P("M140 329 H198",C.orange,4),
      P("M188 322 L198 329 L188 336",C.orange,3),
      T(170,365,"TARGET 2.87 h",15,C.green),
      `</g>`,

      `<g class="diagnosis vls-w03-moving">`,
      O(170,191,76,C.paper,
        `stroke="${C.orange}" stroke-width="4"`),
      T(170,182,"KNOWN",18,C.navy),
      P("M117 197 H223",C.grey,2),
      T(170,220,"NOT PROVEN",15,C.orange),
      `</g>`,

      `<g class="forum vls-w03-moving">`,
      O(110,191,30,C.blue),
      O(230,191,30,C.blue),
      person(110,201,C.navy,.7),
      person(230,201,C.green,.7),
      P("M142 191 H198",C.green,3),
      T(170,262,"EVIDENCE",15,C.green),
      `</g>`,

      `<g class="vls-w03-micro">`,
      O(170,292,6,C.green),
      `</g>`
    ].join("");

    register("W3O2d",{
      count:33,
      heading:"THE SUITE NOBODY OPENED",
      vb:"0 40 340 400",
      cuts:[3,6,9,12,15,18,21,24,27,30],
      art,

      render(r,b,i) {
        const scanY=83+(i%8)*23;

        set(r,".scanner",{
          transform:`translateY(${Math.min(35,scanY-83)}px)`,
          opacity:b>=1&&b<=7?"1":"0"
        });

        for(let j=0;j<5;j++){
          set(r,`.hospital-${j}`,{
            opacity:b>=3?".45":"1",
            transform:`translateY(${(i+j)%3*2}px)`
          });
        }

        show(r,".models",b>=2&&b<=3);
        show(r,".unused",b===4);
        show(r,".disconnected",b===5);
        show(r,".result",b>=6&&b<=8);
        show(r,".diagnosis",b>=8&&b<=9);
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

  // ============================================================
  // REGISTRATION COMPLETE
  //
  // Nine section-specific cinematic scenes:
  //
  // W3O1a — The Seductive Check-in Kiosk
  // W3O1b — The Five-Storey BPM Machine
  // W3O2a — The Leadership Bridge
  // W3O2b — The Benefits Observatory
  // W3O2c — The Five Failure Mechanisms
  // W3O3a — The Vendor Demonstration Theatre
  // W3O3b — The Four-Year Cost Machine
  // W3O3c — The Contract Readiness Vault
  // W3O2d — The Noor Hospital Evidence X-Ray
  //
  // The shared scene registry is preserved.
  // The existing narration controller remains authoritative.
  // The existing application controls remain unchanged.
  //
  // END OF WEEK 3 SCENE REGISTRATION
  // ============================================================

})();
