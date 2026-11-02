// OPER621 - WEEK 6 - PROCESS ARCHITECTURE
// Original cinematic scenes for every main teaching section.
//
// CONTRACT
// window.VL_SCENES[secId] = { build(el), step(i,n), reset() }
//
// Each scene is a distinct visual composition.
// Every narration index changes the visible scene.
// All graphics use responsive SVG.
// No narration sentences appear inside scenes.
// No external dependencies.
// GSAP is optional.
// Reduced-motion users receive immediate visual states.
//
// IMPORTANT:
// Concatenate PARTS 1-4 without removing or adding characters.
// The IIFE opened here closes in PART 4.

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
    pale: "#eaf1f6",
    gold: "#d8aa62",
    white: "#ffffff"
  };

  const clamp = (v, a, b) =>
    Math.max(a, Math.min(b, v));

  const finite = (v, fallback = 0) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
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

  const S = (tag, attrs = {}, content = "") => {
    const attributes = Object.entries(attrs)
      .filter(([, v]) => v !== null && v !== undefined)
      .map(([k, v]) => ` ${k}="${esc(v)}"`)
      .join("");

    return `<${tag}${attributes}>${content}</${tag}>`;
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

  const line = (x1,y1,x2,y2,color=C.navy,w=2,extra={}) =>
    S("line", {
      x1,y1,x2,y2,
      stroke:color,
      "stroke-width":w,
      "stroke-linecap":"round",
      ...extra
    });

  const text = (x,y,value,size=13,color=C.ink,extra={}) =>
    S("text", {
      x,y,fill:color,
      "font-size":size,
      "text-anchor":"middle",
      ...extra
    }, esc(value));

  const group = (content, extra={}) =>
    S("g",extra,content);

  const svg = (content, label="Animated process architecture") =>
    `<svg xmlns="${NS}"
      viewBox="0 0 340 390"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="${esc(label)}"
      class="vls-w06-svg">
      ${content}
    </svg>`;

  const person = (x,y,color=C.navy,scale=1) =>
    group(
      circle(0,-12,9,color) +
      S("path",{
        d:"M-16 17 Q-16 -1 0 -1 Q16 -1 16 17Z",
        fill:color
      }),
      {transform:`translate(${x} ${y}) scale(${scale})`}
    );

  const check = (x,y,color=C.green,size=1) =>
    path(
      `M${x-10*size} ${y}
       l${7*size} ${7*size}
       ${16*size} ${-19*size}`,
      color,4*size
    );

  const arrow = (x1,y1,x2,y2,color=C.navy) => {
    const a = Math.atan2(y2-y1,x2-x1);
    const h = 9;
    const p1x = x2-h*Math.cos(a-.5);
    const p1y = y2-h*Math.sin(a-.5);
    const p2x = x2-h*Math.cos(a+.5);
    const p2y = y2-h*Math.sin(a+.5);

    return path(
      `M${x1} ${y1} L${x2} ${y2}
       M${p1x} ${p1y} L${x2} ${y2}
       L${p2x} ${p2y}`,
      color,2.5
    );
  };

  const gear = (x,y,r,color,teeth=10) => {
    let content = "";

    for(let j=0;j<teeth;j++){
      const a=j*360/teeth;
      content+=rect(
        x-5,y-r-7,10,15,color,2,{
          transform:`rotate(${a} ${x} ${y})`
        }
      );
    }

    content+=circle(x,y,r,color);
    content+=circle(x,y,r*.63,C.paper);
    content+=circle(x,y,r*.25,color);

    return group(content);
  };

  // ----------------------------------------------------------
  // ONE EMBEDDED STYLESHEET FOR ALL WEEK 6 SCENES
  // ----------------------------------------------------------

  const CSS = `
  [class*="vls-w06-W6"] {
    --navy:#1f4e79;
    --orange:#c0502a;
    --paper:#fbf8f1;
    --ink:#1b2a3a;
    --blue:#dbe7f2;
    --green:#317c61;
    position:relative;
    display:block;
    width:100%;
    height:100%;
    min-width:0;
    min-height:0;
    overflow:hidden;
    box-sizing:border-box;
    isolation:isolate;
    background:transparent;
    color:var(--ink);
    font-family:inherit;
  }

  [class*="vls-w06-W6"] *,
  [class*="vls-w06-W6"] *::before,
  [class*="vls-w06-W6"] *::after {
    box-sizing:border-box;
  }

  [class*="vls-w06-W6"] .vls-w06-svg {
    display:block;
    width:100%;
    height:100%;
    max-width:100%;
    max-height:100%;
    overflow:hidden;
    font-family:inherit;
  }

  [class*="vls-w06-W6"] svg text {
    font-family:inherit;
    font-weight:700;
    letter-spacing:.15px;
    user-select:none;
    pointer-events:none;
  }

  [class*="vls-w06-W6"] .w06-moving {
    transition:
      transform .85s cubic-bezier(.22,.76,.2,1),
      opacity .65s ease,
      fill .65s ease,
      stroke .65s ease,
      stroke-dashoffset .9s ease;
  }

  [class*="vls-w06-W6"] .w06-line {
    transition:
      stroke-dashoffset .9s ease,
      opacity .65s ease,
      stroke .65s ease;
  }

  [class*="vls-w06-W6"] .w06-pulse {
    animation:w06Pulse 2.8s ease-in-out infinite;
  }

  [class*="vls-w06-W6"] .w06-breathe {
    animation:w06Breathe 3.4s ease-in-out infinite;
  }

  [class*="vls-w06-W6"] .w06-rotate {
    animation:w06Rotate 16s linear infinite;
    transform-box:fill-box;
    transform-origin:center;
  }

  [class*="vls-w06-W6"] .w06-caption {
    position:absolute;
    bottom:1%;
    left:4%;
    right:4%;
    text-align:center;
    color:var(--navy);
    font-size:12px;
    font-weight:750;
    letter-spacing:.025em;
    line-height:1.25;
    pointer-events:none;
  }

  [class*="vls-w06-W6"] .w06-caption span {
    display:inline-block;
    padding:5px 9px;
    max-width:100%;
  }

  [class*="vls-w06-W6"] .w06-progress {
    position:absolute;
    left:3%;
    bottom:0;
    height:3px;
    width:0;
    background:var(--orange);
    border-radius:3px;
    transition:width .5s ease;
    pointer-events:none;
  }

  [class*="vls-w06-W6"] .w06-heading {
    position:absolute;
    top:1.5%;
    left:4%;
    right:4%;
    font-size:11px;
    font-weight:800;
    letter-spacing:.11em;
    text-align:center;
    color:var(--navy);
    pointer-events:none;
  }

  [class*="vls-w06-W6"].w06-instant *,
  [class*="vls-w06-W6"].w06-instant *::before,
  [class*="vls-w06-W6"].w06-instant *::after {
    transition:none!important;
    animation:none!important;
  }

  @keyframes w06Pulse {
    0%,100% {opacity:.25}
    50% {opacity:.85}
  }

  @keyframes w06Breathe {
    0%,100% {opacity:.5}
    50% {opacity:1}
  }

  @keyframes w06Rotate {
    to {transform:rotate(360deg)}
  }

  @media(max-width:375px) {
    [class*="vls-w06-W6"] .w06-caption {
      font-size:11px;
    }
    [class*="vls-w06-W6"] .w06-heading {
      font-size:10px;
    }
  }

  @media(prefers-reduced-motion:reduce) {
    [class*="vls-w06-W6"] *,
    [class*="vls-w06-W6"] *::before,
    [class*="vls-w06-W6"] *::after {
      animation:none!important;
      transition:none!important;
    }
  }
  `;

  function installCSS(){
    if(document.getElementById("vl-sc-w06")) return;

    const style=document.createElement("style");
    style.id="vl-sc-w06";
    style.textContent=CSS;
    document.head.appendChild(style);
  }

  // ----------------------------------------------------------
  // SCENE RUNTIME
  // ----------------------------------------------------------

  function mount(el,id,art,heading,caption){
    installCSS();

    if(!el || typeof el.replaceChildren!=="function"){
      return null;
    }

    const root=document.createElement("div");
    root.className=`vls-w06-${id}`;

    root.innerHTML=`
      <div class="w06-heading">${esc(heading)}</div>
      ${svg(art,heading)}
      <div class="w06-caption">
        <span>${esc(caption)}</span>
      </div>
      <div class="w06-progress"></div>
    `;

    el.replaceChildren(root);
    return root;
  }

  function one(root,selector){
    return root ? root.querySelector(selector) : null;
  }

  function all(root,selector){
    return root ? [...root.querySelectorAll(selector)] : [];
  }

  function opacity(root,selector,value){
    all(root,selector).forEach(e=>{
      e.style.opacity=String(value);
    });
  }

  function transform(root,selector,value){
    all(root,selector).forEach(e=>{
      e.style.transform=value;
    });
  }

  function attribute(root,selector,name,value){
    all(root,selector).forEach(e=>{
      e.setAttribute(name,String(value));
    });
  }

  function fill(root,selector,color){
    attribute(root,selector,"fill",color);
  }

  function stroke(root,selector,color){
    attribute(root,selector,"stroke",color);
  }

  function label(root,value){
    const e=one(root,".w06-caption span");
    if(e)e.textContent=value;
  }

  function progress(root,i,n){
    const e=one(root,".w06-progress");
    if(!e)return;

    e.style.width=
      `${100*(clamp(i,0,Math.max(0,n-1))+1)/
      Math.max(1,n)}%`;
  }

  function instant(root,fn){
    if(!root)return;

    root.classList.add("w06-instant");
    fn();

    // Force the initial state to settle before transitions return.
    void root.offsetWidth;

    if(!reduced()){
      root.classList.remove("w06-instant");
    }
  }

  function tween(root,selector,vars){
    const nodes=all(root,selector);

    if(!nodes.length)return;

    if(window.gsap && !reduced()){
      try{
        window.gsap.killTweensOf(nodes);

        window.gsap.to(nodes,{
          duration:.7,
          ease:"power2.inOut",
          overwrite:true,
          ...vars
        });

        return;
      }catch(_){}
    }

    nodes.forEach(e=>{
      if(vars.opacity!==undefined){
        e.style.opacity=String(vars.opacity);
      }

      if(vars.x!==undefined || vars.y!==undefined){
        e.style.transform=
          `translate(${finite(vars.x)}px,${finite(vars.y)}px)`;
      }

      if(vars.rotation!==undefined){
        e.style.transform=
          `rotate(${finite(vars.rotation)}deg)`;
      }

      if(vars.scale!==undefined){
        e.style.transform=
          `scale(${finite(vars.scale,1)})`;
      }
    });
  }

  function makeScene(id,art,heading,captions,render){
    let root=null;
    let last=-1;

    return {
      build(el){
        root=mount(
          el,id,art,heading,
          captions[0]||""
        );

        last=-1;

        if(root){
          instant(root,()=>render(root,0,1,0,true));
        }
      },

      step(i,n){
        if(!root)return;

        const total=Math.max(
          1,Math.floor(finite(n,1))
        );

        const index=clamp(
          Math.floor(finite(i)),
          0,total-1
        );

        // Deliberately render EVERY narration moment.
        // Do not suppress repeated conceptual phases.
        render(root,index,total,last,false);

        progress(root,index,total);
        last=index;
      },

      reset(){
        if(!root)return;

        if(window.gsap){
          try{
            window.gsap.killTweensOf(
              root.querySelectorAll("*")
            );
          }catch(_){}
        }

        last=-1;

        instant(root,()=>{
          render(root,0,1,-1,true);
          const p=one(root,".w06-progress");
          if(p)p.style.width="0%";
        });
      }
    };
  }

  // Every index has a unique visual position within its scene.
  // Major narrative phases remain semantically meaningful.
  function phase(i,n,count){
    return clamp(
      Math.floor(
        clamp(i,0,Math.max(0,n-1))*
        count/Math.max(1,n)
      ),
      0,count-1
    );
  }

  function fraction(i,n){
    return n<=1?0:
      clamp(i/(n-1),0,1);
  }

  // Use a small deterministic oscillation to ensure every
  // narration moment creates visible, seek-safe movement.
  function beatMotion(i){
    return {
      x:Math.sin(i*1.41)*7,
      y:Math.cos(i*1.13)*6,
      angle:Math.sin(i*.83)*8,
      pulse:1+(.04*Math.sin(i*1.7))
    };
  }

  // ==========================================================
  // SCENE 1 - W6O1a
  // THE LOST CITY
  //
  // Visual metaphor:
  // A traveller stands in a city of disconnected buildings.
  // Streets appear, intersections connect, and the city
  // transforms into a navigable organisational landscape.
  //
  // Distinct visual grammar:
  // Isometric city / route drawing / moving traveller /
  // map elevation / strategic beacon / accountability.
  // ==========================================================

  {
    const buildings=[
      {x:47,y:103,w:57,h:82,name:"HOTEL"},
      {x:236,y:88,w:60,h:96,name:"STATION"},
      {x:42,y:244,w:67,h:76,name:"HOSPITAL"},
      {x:231,y:245,w:68,h:75,name:"AIRPORT"}
    ];

    const buildingArt=buildings.map((b,j)=>{
      const windows=Array.from({length:6},(_,k)=>{
        const col=k%2,row=Math.floor(k/2);

        return rect(
          b.x+13+col*22,
          b.y+20+row*18,
          12,10,C.paper,2,{
            opacity:.65,
            class:`city-window win-${j}-${k}`
          }
        );
      }).join("");

      return group(
        rect(b.x+4,b.y+7,b.w,b.h,C.blue,5,{
          opacity:.35
        })+
        rect(b.x,b.y,b.w,b.h,C.paper,4,{
          stroke:C.navy,
          "stroke-width":2.5
        })+
        rect(b.x,b.y,b.w,11,
          j%2?C.orange:C.navy,2)+
        windows+
        text(
          b.x+b.w/2,
          b.y+b.h+17,
          b.name,10,C.navy
        ),
        {
          class:`city-building city-building-${j} w06-moving`
        }
      );
    }).join("");

    const roadArt=`
      <g class="city-roads">
        ${path(
          "M76 189 Q126 181 170 196 Q216 211 266 188",
          C.green,7,{
            class:"city-road road-a w06-line",
            "stroke-dasharray":320,
            "stroke-dashoffset":320
          }
        )}
        ${path(
          "M76 189 Q114 220 76 244",
          C.green,6,{
            class:"city-road road-b w06-line",
            "stroke-dasharray":180,
            "stroke-dashoffset":180
          }
        )}
        ${path(
          "M266 188 Q230 217 265 245",
          C.green,6,{
            class:"city-road road-c w06-line",
            "stroke-dasharray":180,
            "stroke-dashoffset":180
          }
        )}
        ${path(
          "M76 284 Q170 326 265 284",
          C.green,6,{
            class:"city-road road-d w06-line",
            "stroke-dasharray":300,
            "stroke-dashoffset":300
          }
        )}
      </g>
    `;

    const art=`
      <defs>
        <radialGradient id="w06-city-light">
          <stop stop-color="${C.gold}" stop-opacity=".28"/>
          <stop offset="1" stop-color="${C.paper}"
            stop-opacity="0"/>
        </radialGradient>
      </defs>

      ${circle(170,190,145,
        "url(#w06-city-light)")}

      <g class="city-camera w06-moving">
        ${roadArt}

        ${buildingArt}

        <g class="city-intersections">
          ${[
            [76,189],[266,188],
            [76,284],[265,284]
          ].map(([x,y],j)=>
            circle(x,y,7,C.green,{
              class:`city-junction junction-${j} w06-moving`,
              opacity:0
            })
          ).join("")}
        </g>

        <g class="city-traveller w06-moving">
          ${person(151,352,C.navy,1.05)}
          ${rect(166,349,14,18,C.orange,2)}
        </g>

        <g class="city-compass w06-moving" opacity="0">
          ${circle(170,195,45,C.paper,{
            stroke:C.navy,
            "stroke-width":3
          })}
          ${circle(170,195,31,"none",{
            stroke:C.blue,
            "stroke-width":7
          })}
          ${path(
            "M170 162 L180 195 L170 229 L160 195Z",
            C.orange,2,{
              fill:C.orange
            }
          )}
          ${circle(170,195,7,C.navy)}
        </g>

        <g class="city-beacon w06-moving" opacity="0">
          ${circle(170,61,30,C.blue)}
          ${circle(170,61,18,C.navy)}
          ${check(170,64,C.paper,.65)}
          ${path(
            "M170 91 V146",
            C.orange,3,{
              "stroke-dasharray":"5 6"
            }
          )}
        </g>

        <g class="city-owner w06-moving" opacity="0">
          ${circle(170,285,28,C.paper,{
            stroke:C.green,
            "stroke-width":3
          })}
          ${person(170,288,C.green,.8)}
        </g>

        <g class="city-warning w06-moving" opacity="0">
          ${circle(170,194,24,C.orange)}
          ${text(170,202,"?",26,C.paper)}
        </g>

        <g class="city-next w06-moving" opacity="0">
          ${arrow(110,357,230,357,C.green)}
          ${text(170,342,"NEXT PHASE",11,C.green)}
        </g>
      </g>

      ${text(170,28,"A CITY WITHOUT ROUTES",13,C.navy)}
    `;

    const captions=[
      "Four places, no route",
      "A missing organisational map",
      "Connect the whole journey",
      "Strategy gives direction",
      "See the dependencies",
      "Assign accountability",
      "A navigable process landscape",
      "Ready for Launch Pad"
    ];

    function render(r,i,n,last,initial){
      const b=phase(i,n,8);
      const m=beatMotion(i);
      const f=fraction(i,n);

      label(r,captions[b]);

      // Buildings initially float as disconnected objects.
      buildings.forEach((_,j)=>{
        const drift=b<2?
          Math.sin(i*.63+j*1.8)*5:0;

        transform(
          r,`.city-building-${j}`,
          `translate(${drift}px,${b<2?
            Math.cos(i*.7+j)*4:0}px)`
        );

        opacity(
          r,`.city-building-${j}`,
          b===4?.62:1
        );
      });

      // Roads become progressively connected.
      const roadProgress=[
        b>=2?0:320,
        b>=3?0:180,
        b>=4?0:180,
        b>=5?0:300
      ];

      ["a","b","c","d"].forEach((key,j)=>{
        attribute(
          r,`.road-${key}`,
          "stroke-dashoffset",
          roadProgress[j]
        );
      });

      for(let j=0;j<4;j++){
        opacity(
          r,`.junction-${j}`,
          b>=3+j%3?1:0
        );
      }

      // The traveller advances with every spoken moment.
      const x=151+
        (b<2?m.x:
         b<4?f*90:
         b<6?70-f*35:
         0);

      const y=b<2?m.y:
        b<5?-42-f*45:
        b<7?-70:-12;

      transform(
        r,".city-traveller",
        `translate(${x-151}px,${y}px)`
      );

      opacity(r,".city-warning",b===1?1:0);
      opacity(r,".city-compass",b>=2&&b<=4?1:0);
      opacity(r,".city-beacon",b>=3?1:0);
      opacity(r,".city-owner",b>=5?1:0);
      opacity(r,".city-next",b===7?1:0);

      transform(
        r,".city-compass",
        `rotate(${i*9}deg)`
      );

      transform(
        r,".city-beacon",
        `translateY(${m.y}px) scale(${m.pulse})`
      );

      transform(
        r,".city-owner",
        `translateY(${m.y*.6}px)`
      );

      // Cinematic camera moves without moving the UI text.
      transform(
        r,".city-camera",
        `translate(${m.x*.4}px,${m.y*.3}px)
         scale(${b===4?1.08:b===6?.93:1})`
      );

      // Keep a distinct visual beat even inside long phases.
      const activeWindow=(i%6);

      all(r,".city-window").forEach((e,j)=>{
        e.setAttribute(
          "fill",
          j%6===activeWindow?C.gold:C.paper
        );
      });
    }

    REG.W6O1a=makeScene(
      "W6O1a",
      art,
      "THE MAP THAT TELLS YOU WHERE YOU ARE",
      captions,
      render
    );
  }

  // ==========================================================
  // SCENE 2 - W6O1b
  // THE LIVING ARCHIVE
  //
  // Visual metaphor:
  // A cabinet of inconsistent process diagrams becomes
  // a controlled, interconnected architectural atlas.
  //
  // Distinct visual grammar:
  // Flying paper / physical archive drawers /
  // magnification / hierarchy / authoritative seal /
  // connected model pages.
  // ==========================================================

  {
    const sheets=Array.from({length:7},(_,j)=>{
      const x=39+(j%3)*89;
      const y=83+Math.floor(j/3)*83;

      return group(
        rect(-30,-38,60,76,C.paper,4,{
          stroke:j%2?C.orange:C.navy,
          "stroke-width":2
        })+
        rect(-22,-27,38,6,C.blue,2)+
        path(
          "M-21 -10 H20 M-21 0 H14 M-21 10 H22",
          C.navy,2,{
            opacity:.4
          }
        )+
        circle(20,26,5,j%2?C.orange:C.green),
        {
          class:`archive-sheet sheet-${j} w06-moving`,
          transform:`translate(${x} ${y}) rotate(${j*7-18})`
        }
      );
    }).join("");

    const art=`
      <defs>
        <linearGradient id="w06-archive-metal" x2="1" y2="1">
          <stop stop-color="${C.blue}"/>
          <stop offset="1" stop-color="${C.paper}"/>
        </linearGradient>
      </defs>

      ${text(170,29,"DOCUMENTS ARE NOT THE MAP",12,C.navy)}

      <g class="archive-cabinet w06-moving">
        ${rect(65,70,210,240,
          "url(#w06-archive-metal)",13,{
            stroke:C.navy,
            "stroke-width":3
          }
        )}

        ${[0,1,2].map(j=>group(
          rect(78,90+j*67,184,56,C.paper,7,{
            stroke:C.navy,
            "stroke-width":1.8
          })+
          rect(145,111+j*67,50,8,C.navy,4)+
          circle(170,132+j*67,4,C.orange),
          {
            class:`archive-drawer drawer-${j} w06-moving`
          }
        )).join("")}
      </g>

      <g class="archive-scattered">
        ${sheets}
      </g>

      <g class="archive-lens w06-moving" opacity="0">
        ${circle(177,181,73,C.paper,{
          "fill-opacity":.76,
          stroke:C.orange,
          "stroke-width":4
        })}
        ${circle(177,181,58,"none",{
          stroke:C.blue,
          "stroke-width":4
        })}
        ${line(226,231,279,282,C.orange,13)}
        ${text(177,187,"?",44,C.orange)}
      </g>

      <g class="archive-atlas w06-moving" opacity="0">
        ${rect(48,73,244,244,C.paper,12,{
          stroke:C.navy,
          "stroke-width":3
        })}
        ${line(170,73,170,317,C.navy,3)}

        ${rect(65,94,90,40,C.blue,6)}
        ${rect(185,94,90,40,C.blue,6)}

        ${text(110,119,"STRATEGY",12,C.navy)}
        ${text(230,119,"PROCESSES",12,C.navy)}

        ${[0,1,2].map(j=>{
          const y=166+j*49;

          return group(
            circle(105,y,14,
              j===0?C.orange:C.navy)+
            rect(189,y-13,68,26,C.blue,5)+
            path(
              `M119 ${y} H189`,
              C.green,3,{
                class:`atlas-link atlas-link-${j} w06-line`,
                "stroke-dasharray":100,
                "stroke-dashoffset":100
              }
            )
          );
        }).join("")}
      </g>

      <g class="archive-seal w06-moving" opacity="0">
        ${circle(170,195,55,C.paper,{
          stroke:C.green,
          "stroke-width":5
        })}
        ${circle(170,195,44,"none",{
          stroke:C.green,
          "stroke-width":2
        })}
        ${check(170,198,C.green,1.7)}
      </g>

      <g class="archive-owner w06-moving" opacity="0">
        ${person(170,341,C.green,.8)}
        ${text(170,377,"PROCESS OWNER",11,C.green)}
      </g>

      <g class="archive-warning w06-moving" opacity="0">
        ${circle(170,53,17,C.orange)}
        ${text(170,59,"!",19,C.paper)}
      </g>
    `;

    const captions=[
      "A crowded repository",
      "Conflicting descriptions",
      "Inspect the model",
      "Locate the process",
      "Agree the hierarchy",
      "Name the owner",
      "Approve the reference",
      "One coherent architecture"
    ];

    function render(r,i,n,last,initial){
      const b=phase(i,n,8);
      const m=beatMotion(i);
      const f=fraction(i,n);

      label(r,captions[b]);

      // Drawers open in a staggered documentary reveal.
      for(let j=0;j<3;j++){
        transform(
          r,`.drawer-${j}`,
          `translateX(${b===1?
            15+j*8:0}px)`
        );
      }

      opacity(
        r,".archive-cabinet",
        b<3?1:b<6?.18:0
      );

      // Each loose sheet follows a distinct flight path.
      for(let j=0;j<7;j++){
        const sx=39+(j%3)*89;
        const sy=83+Math.floor(j/3)*83;

        let x=sx,y=sy,rot=j*7-18;

        if(b>=2&&b<5){
          x=170+(j-3)*12+
            Math.sin(i*.8+j)*7;

          y=135+(j%3)*36+
            Math.cos(i*.9+j)*5;

          rot=(j-3)*4;
        }

        if(b>=5){
          x=170+(j-3)*3;
          y=195+(j-3)*2;
          rot=0;
        }

        const e=one(r,`.sheet-${j}`);

        if(e){
          e.setAttribute(
            "transform",
            `translate(${x} ${y}) rotate(${rot})`
          );

          e.style.opacity=b>=5?"0":"1";
        }
      }

      opacity(r,".archive-lens",
        b===2||b===3?1:0);

      transform(
        r,".archive-lens",
        `translate(${m.x*.7}px,${m.y*.7}px)
         scale(${b===3?1.08:1})`
      );

      opacity(r,".archive-atlas",b>=4?1:0);

      transform(
        r,".archive-atlas",
        `translateY(${b>=4?0:20}px)
         scale(${b>=7?1.04:1})`
      );

      for(let j=0;j<3;j++){
        attribute(
          r,`.atlas-link-${j}`,
          "stroke-dashoffset",
          b>=4+j%2?0:100
        );
      }

      opacity(r,".archive-owner",b>=5?1:0);
      opacity(r,".archive-seal",b>=6?1:0);
      opacity(r,".archive-warning",
        b===1||b===2?1:0);

      transform(
        r,".archive-seal",
        `translateY(${m.y*.5}px)
         rotate(${m.angle*.4}deg)`
      );

      // Moving highlight travels across the architectural links.
      if(b>=4){
        const active=i%3;

        for(let j=0;j<3;j++){
          stroke(
            r,`.atlas-link-${j}`,
            j===active?C.orange:C.green
          );
        }
      }
    }

    REG.W6O1b=makeScene(
      "W6O1b",
      art,
      "THE LIVING PROCESS ARCHIVE",
      captions,
      render
    );
  }

  // ==========================================================
  // SCENE 3 - W6O1c
  // THE HOTEL THEATRE
  //
  // Visual metaphor:
  // The hotel operates like a three-level theatre.
  // The guest sees the core performance.
  // Supporting machinery works beneath the stage.
  // Management directs the complete production above it.
  //
  // Distinct visual grammar:
  // Cutaway hotel / guest arrival / backstage machinery /
  // management control room / moving service signals /
  // investment spotlight.
  // ==========================================================

  {
    const art=`
      <defs>
        <linearGradient id="w06-theatre-wall"
          x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="${C.paper}"/>
          <stop offset="1" stop-color="${C.blue}"/>
        </linearGradient>

        <radialGradient id="w06-theatre-spot">
          <stop stop-color="${C.gold}"
            stop-opacity=".5"/>
          <stop offset="1" stop-color="${C.gold}"
            stop-opacity="0"/>
        </radialGradient>
      </defs>

      ${text(170,25,"THREE KINDS OF PROCESSES",12,C.navy)}

      <g class="theatre-building">
        ${rect(33,61,274,273,
          "url(#w06-theatre-wall)",8,{
            stroke:C.navy,
            "stroke-width":3
          }
        )}

        ${line(33,139,307,139,C.navy,4)}
        ${line(33,251,307,251,C.navy,4)}

        ${rect(43,71,254,59,C.blue,5)}
        ${rect(43,150,254,91,C.paper,5)}
        ${rect(43,261,254,63,C.blue,5)}
      </g>

      <g class="theatre-management w06-moving">
        ${text(170,87,"MANAGEMENT",12,C.navy)}

        ${rect(110,94,120,26,C.paper,5,{
          stroke:C.navy,
          "stroke-width":2
        })}

        ${[0,1,2].map(j=>
          rect(125+j*31,104,18,8,
            j===0?C.orange:C.green,2,{
              class:`management-light ml-${j}`
            })
        ).join("")}

        ${circle(76,108,13,C.navy)}
        ${path("M68 108 H84",C.paper,2)}

        ${circle(264,108,13,C.navy)}
        ${check(264,111,C.paper,.45)}
      </g>

      <g class="theatre-core w06-moving">
        ${text(170,168,"CORE VALUE",12,C.navy)}

        ${rect(62,182,77,12,C.orange,3)}
        ${rect(69,194,63,31,C.navy,3)}
        ${rect(91,174,17,17,C.blue,3,{
          stroke:C.navy,
          "stroke-width":2
        })}

        ${person(181,219,C.navy,.85)}

        <g class="theatre-guest w06-moving">
          ${person(255,219,C.orange,.85)}
          ${rect(267,214,13,18,C.orange,2)}
        </g>

        <g class="theatre-key w06-moving" opacity="0">
          ${circle(204,185,11,C.gold)}
          ${circle(204,185,4,C.paper)}
          ${line(214,185,237,185,C.gold,5)}
          ${line(230,185,230,193,C.gold,4)}
        </g>

        <g class="theatre-spotlight w06-moving">
          ${circle(170,204,94,
            "url(#w06-theatre-spot)")}
        </g>
      </g>

      <g class="theatre-support w06-moving">
        ${text(170,281,"SUPPORTING",12,C.navy)}

        <g class="support-gear support-gear-a w06-moving">
          ${gear(94,303,17,C.navy,9)}
        </g>

        <g class="support-gear support-gear-b w06-moving">
          ${gear(142,303,14,C.green,8)}
        </g>

        <g class="support-gear support-gear-c w06-moving">
          ${gear(187,303,17,C.navy,9)}
        </g>

        ${rect(230,292,43,24,C.paper,5,{
          stroke:C.orange,
          "stroke-width":2
        })}
        ${text(251,308,"IT",12,C.orange)}
      </g>

      <g class="theatre-links w06-moving" opacity="0">
        ${path(
          "M170 131 V150",
          C.green,4,{
            class:"theatre-link-a w06-line",
            "stroke-dasharray":50,
            "stroke-dashoffset":50
          }
        )}
        ${path(
          "M170 251 V237",
          C.green,4,{
            class:"theatre-link-b w06-line",
            "stroke-dasharray":50,
            "stroke-dashoffset":50
          }
        )}
      </g>

      <g class="theatre-choice w06-moving" opacity="0">
        ${circle(170,203,58,"none",{
          stroke:C.orange,
          "stroke-width":4,
          "stroke-dasharray":"7 7"
        })}
      </g>

      <g class="theatre-complete w06-moving" opacity="0">
        ${circle(170,204,28,C.green)}
        ${check(170,208,C.paper,1)}
      </g>

      <g class="theatre-payroll w06-moving" opacity="0">
        ${rect(214,276,79,36,C.paper,7,{
          stroke:C.orange,
          "stroke-width":2
        })}
        ${text(253,299,"PAYROLL",11,C.orange)}
      </g>

      <g class="theatre-flow w06-moving" opacity="0">
        ${arrow(92,236,251,236,C.green)}
      </g>

      ${text(170,361,"ONE CONNECTED HOTEL",12,C.navy)}
    `;

    const captions=[
      "The guest sees value",
      "Core delivers the stay",
      "Support enables delivery",
      "Management sets direction",
      "Invest where it matters",
      "Supporting is essential",
      "Strategy changes classification",
      "One connected operating system"
    ];

    function render(r,i,n,last,initial){
      const b=phase(i,n,8);
      const m=beatMotion(i);
      const f=fraction(i,n);

      label(r,captions[b]);

      // Theatre lighting follows the current strategic layer.
      opacity(
        r,".theatre-core",
        b===1||b===4||b===7?1:
        b===2||b===3?.55:.85
      );

      opacity(
        r,".theatre-support",
        b===2||b===5||b===7?1:.4
      );

      opacity(
        r,".theatre-management",
        b===3||b===7?1:.45
      );

      // Guest crosses the hotel stage progressively.
      const gx=b<2?
        -35+f*60:
        b<5?m.x:
        b===7?-28:15;

      transform(
        r,".theatre-guest",
        `translate(${gx}px,${m.y*.3}px)`
      );

      opacity(
        r,".theatre-key",
        b>=1&&b<=4?1:0
      );

      transform(
        r,".theatre-key",
        `translate(${m.x*.6}px,${m.y}px)
         rotate(${m.angle}deg)`
      );

      // Mechanical support gears rotate in opposing directions.
      transform(
        r,".support-gear-a",
        `rotate(${i*19}deg)`
      );

      transform(
        r,".support-gear-b",
        `rotate(${-i*24}deg)`
      );

      transform(
        r,".support-gear-c",
        `rotate(${i*16}deg)`
      );

      opacity(
        r,".theatre-payroll",
        b===5||b===6?1:0
      );

      opacity(
        r,".theatre-choice",
        b===4||b===6?1:0
      );

      transform(
        r,".theatre-choice",
        `rotate(${i*11}deg)
         scale(${m.pulse})`
      );

      opacity(
        r,".theatre-links",
        b>=3?1:0
      );

      attribute(
        r,".theatre-link-a",
        "stroke-dashoffset",
        b>=3?0:50
      );

      attribute(
        r,".theatre-link-b",
        "stroke-dashoffset",
        b>=5?0:50
      );

      opacity(
        r,".theatre-flow",
        b>=1&&b<=4?1:0
      );

      opacity(
        r,".theatre-complete",
        b===7?1:0
      );

      transform(
        r,".theatre-complete",
        `translateY(${m.y*.4}px)
         scale(${b===7?m.pulse:.5})`
      );

      // The control-room indicators remain active.
      for(let j=0;j<3;j++){
        fill(
          r,`.ml-${j}`,
          (i+j)%3===0?C.orange:C.green
        );
      }

      // Spotlight moves between the three operating layers.
      const spotY=
        b===2||b===5?88:
        b===3?-95:0;

      transform(
        r,".theatre-spotlight",
        `translate(${m.x}px,${spotY+m.y}px)`
      );
    }

    REG.W6O1c=makeScene(
      "W6O1c",
      art,
      "THE HOTEL OPERATING THEATRE",
      captions,
      render
    );
  }

  // CONTINUES DIRECTLY WITH PART 2.
  // ==========================================================
  // SCENE 4 - W6O2a
  // THE ARCHITECTURE ZOOM LENS
  //
  // Visual metaphor:
  // A physical optical instrument moves from a complete
  // hotel landscape into a process, sub-process and activity.
  //
  // Distinct visual grammar:
  // Telescoping lenses / nested landscapes / precision
  // reticle / over-decomposition / useful boundaries.
  // ==========================================================

  {
    const art=`
      <defs>
        <radialGradient id="w06-zoom-glass">
          <stop stop-color="${C.paper}"/>
          <stop offset=".72" stop-color="${C.blue}"/>
          <stop offset="1" stop-color="${C.navy}"
            stop-opacity=".18"/>
        </radialGradient>
      </defs>

      ${text(170,27,"HOW FAR SHOULD WE ZOOM?",12,C.navy)}

      <g class="zoom-instrument w06-moving">
        ${circle(170,184,139,C.blue,{opacity:.28})}

        ${circle(170,184,124,C.paper,{
          stroke:C.navy,
          "stroke-width":7
        })}

        ${circle(170,184,110,
          "url(#w06-zoom-glass)",{
            stroke:C.blue,
            "stroke-width":4
          }
        )}

        ${circle(170,184,95,"none",{
          stroke:C.navy,
          "stroke-width":1.5,
          "stroke-dasharray":"4 8",
          opacity:.35
        })}

        <g class="zoom-landscape w06-moving">
          ${[0,1,2,3].map(j=>{
            const x=101+(j%2)*89;
            const y=126+Math.floor(j/2)*88;

            return group(
              rect(x-29,y-31,58,62,C.paper,5,{
                stroke:C.navy,
                "stroke-width":2
              })+
              rect(x-23,y-23,46,8,
                j%2?C.orange:C.green,2)+
              rect(x-20,y-6,15,14,C.blue,2)+
              rect(x+5,y-6,15,14,C.blue,2)+
              rect(x-8,y+14,16,17,C.navy,2),
              {
                class:`zoom-property zp-${j} w06-moving`
              }
            );
          }).join("")}
        </g>

        <g class="zoom-process w06-moving" opacity="0">
          ${rect(103,130,134,112,C.paper,12,{
            stroke:C.navy,
            "stroke-width":3
          })}
          ${text(170,153,"GUEST ARRIVAL",12,C.navy)}

          ${person(128,204,C.orange,.8)}

          ${rect(174,175,45,42,C.blue,6,{
            stroke:C.navy,
            "stroke-width":2
          })}

          ${arrow(148,198,174,198,C.green)}
        </g>

        <g class="zoom-activity w06-moving" opacity="0">
          ${rect(112,132,116,108,C.paper,11,{
            stroke:C.green,
            "stroke-width":3
          })}

          ${rect(130,150,80,55,C.blue,5)}

          ${path(
            "M141 165 H199 M141 177 H187",
            C.navy,3
          )}

          ${check(170,195,C.green,.7)}

          ${text(170,226,"VERIFY BOOKING",11,C.navy)}
        </g>

        <g class="zoom-reticle w06-moving">
          ${line(170,64,170,91,C.orange,2)}
          ${line(170,277,170,304,C.orange,2)}
          ${line(50,184,77,184,C.orange,2)}
          ${line(263,184,290,184,C.orange,2)}
        </g>

        <g class="zoom-overload w06-moving" opacity="0">
          ${Array.from({length:35},(_,j)=>{
            const x=79+(j%7)*30;
            const y=101+Math.floor(j/7)*37;

            return rect(x,y,20,23,
              j%3?C.navy:C.orange,2,{
                opacity:.7
              });
          }).join("")}
        </g>

        <g class="zoom-boundary w06-moving" opacity="0">
          ${circle(170,184,79,"none",{
            stroke:C.green,
            "stroke-width":5,
            "stroke-dasharray":"10 6"
          })}
        </g>

        <g class="zoom-warning w06-moving" opacity="0">
          ${circle(170,184,33,C.orange)}
          ${text(170,195,"!",37,C.paper)}
        </g>

        <g class="zoom-dial w06-moving">
          ${circle(170,184,131,"none",{
            stroke:C.orange,
            "stroke-width":4,
            "stroke-dasharray":"12 70"
          })}
        </g>

        ${rect(124,325,92,16,C.navy,8)}
        ${rect(147,341,46,17,C.navy,4)}
        ${rect(111,358,118,9,C.navy,4)}

        ${text(170,383,"LANDSCAPE TO ACTIVITY",11,C.navy)}
      </g>
    `;

    const captions=[
      "See the whole landscape",
      "Choose the useful level",
      "Zoom into a process",
      "Reveal the activities",
      "Avoid excessive detail",
      "Avoid vague boundaries",
      "Compare equivalent levels",
      "Keep every level connected"
    ];

    function render(r,i,n,last,initial){
      const b=phase(i,n,8);
      const m=beatMotion(i);
      const f=fraction(i,n);

      label(r,captions[b]);

      const scales=[
        1,1.04,1.17,1.24,1.03,
        .91,1.09,1
      ];

      transform(
        r,".zoom-instrument",
        `translate(${m.x*.35}px,${m.y*.25}px)
         scale(${scales[b]})`
      );

      opacity(
        r,".zoom-landscape",
        b<=2||b>=6?1:0
      );

      opacity(
        r,".zoom-process",
        b===2||b===3||b===5?1:0
      );

      opacity(
        r,".zoom-activity",
        b===3?1:0
      );

      opacity(
        r,".zoom-overload",
        b===4?1:0
      );

      opacity(
        r,".zoom-warning",
        b===4||b===5?1:0
      );

      opacity(
        r,".zoom-boundary",
        b===5||b===6||b===7?1:0
      );

      transform(
        r,".zoom-dial",
        `rotate(${i*13}deg)`
      );

      transform(
        r,".zoom-reticle",
        `rotate(${b*11+m.angle}deg)`
      );

      for(let j=0;j<4;j++){
        transform(
          r,`.zp-${j}`,
          `translate(${Math.sin(i*.7+j)*3}px,
          ${Math.cos(i*.8+j)*3}px)`
        );
      }

      // The chosen boundary contracts around the meaningful
      // process instead of exposing every employee task.
      transform(
        r,".zoom-boundary",
        `scale(${b===6?.88:
          b===7?1.04:1})`
      );
    }

    REG.W6O2a=makeScene(
      "W6O2a",
      art,
      "THE ARCHITECTURE ZOOM LENS",
      captions,
      render
    );
  }

  // ==========================================================
  // SCENE 5 - W6O2b
  // THE BRIDGE OF ACCOUNTABILITY
  //
  // Visual metaphor:
  // A guest journey crosses several departmental islands.
  // The bridges initially fail at the handoffs.
  // A process owner receives the authority to reconnect
  // the complete journey.
  //
  // Distinct visual grammar:
  // Suspended bridges / moving traveller / broken handoff /
  // authority tower / decision cable / connected journey.
  // ==========================================================

  {
    const islands=[
      {x:34,name:"REVENUE"},
      {x:118,name:"RECEPTION"},
      {x:202,name:"HOUSEKEEPING"},
      {x:286,name:"FINANCE"}
    ];

    const art=`
      <defs>
        <linearGradient id="w06-bridge-water"
          x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="${C.blue}"/>
          <stop offset="1" stop-color="${C.paper}"/>
        </linearGradient>
      </defs>

      ${text(170,27,"WHO OWNS THE WHOLE JOURNEY?",12,C.navy)}

      ${rect(12,150,316,184,
        "url(#w06-bridge-water)",12,{
          opacity:.7
        }
      )}

      <g class="bridge-islands">
        ${islands.map((p,j)=>{
          const x=p.x;

          return group(
            rect(x-26,202,65,51,C.paper,7,{
              stroke:C.navy,
              "stroke-width":2.5
            })+
            rect(x-20,191,53,16,
              j%2?C.orange:C.navy,4)+
            rect(x-13,220,13,15,C.blue,2)+
            rect(x+12,220,13,15,C.blue,2)+
            text(x+7,271,p.name,9,C.navy),
            {
              class:`bridge-island bi-${j} w06-moving`
            }
          );
        }).join("")}
      </g>

      <g class="bridge-spans">
        ${[0,1,2].map(j=>{
          const x1=73+j*84;
          const x2=x1+45;

          return group(
            path(
              `M${x1} 221 Q${(x1+x2)/2} 206 ${x2} 221`,
              C.green,6,{
                class:`bridge-span bs-${j} w06-line`,
                "stroke-dasharray":100,
                "stroke-dashoffset":100
              }
            ),
            {
              class:`bridge-span-group bg-${j} w06-moving`
            }
          );
        }).join("")}
      </g>

      <g class="bridge-traveller w06-moving">
        ${person(44,185,C.orange,.85)}
        ${rect(54,184,12,16,C.orange,2)}
      </g>

      <g class="bridge-break w06-moving" opacity="0">
        ${circle(169,218,20,C.orange)}
        ${text(169,226,"!",25,C.paper)}
      </g>

      <g class="bridge-owner w06-moving" opacity="0">
        ${circle(170,94,39,C.paper,{
          stroke:C.green,
          "stroke-width":4
        })}
        ${person(170,104,C.green,1)}
        ${text(170,48,"PROCESS OWNER",12,C.green)}
      </g>

      <g class="bridge-authority w06-moving" opacity="0">
        ${path(
          "M170 133 V175",
          C.green,4,{
            "stroke-dasharray":"6 5"
          }
        )}

        ${rect(119,142,102,25,C.green,12)}
        ${text(170,159,"DECISION RIGHTS",11,C.paper)}
      </g>

      <g class="bridge-cables w06-moving" opacity="0">
        ${[0,1,2,3].map(j=>{
          const x=42+j*84;

          return path(
            `M170 132 Q${x} 145 ${x} 201`,
            C.green,2.5,{
              class:`bridge-cable bc-${j} w06-line`,
              "stroke-dasharray":200,
              "stroke-dashoffset":200
            }
          );
        }).join("")}
      </g>

      <g class="bridge-esc w06-moving" opacity="0">
        ${rect(109,302,122,29,C.orange,13)}
        ${text(170,321,"ESCALATION ROUTE",11,C.paper)}
        ${arrow(170,301,170,274,C.orange)}
      </g>

      <g class="bridge-result w06-moving" opacity="0">
        ${circle(170,184,27,C.green)}
        ${check(170,187,C.paper,1)}
      </g>

      <g class="bridge-waterline">
        ${path(
          "M18 294 Q60 287 100 294 T180 294 T260 294 T322 294",
          C.navy,1.5,{opacity:.25}
        )}
      </g>

      ${text(170,365,"ONE GUEST · MANY FUNCTIONS",11,C.navy)}
    `;

    const captions=[
      "One journey, many teams",
      "The handoff breaks",
      "Departments defend boundaries",
      "Name the process owner",
      "Authority must be real",
      "Create escalation routes",
      "Coordinate the complete flow",
      "Accountability across functions"
    ];

    function render(r,i,n,last,initial){
      const b=phase(i,n,8);
      const m=beatMotion(i);
      const f=fraction(i,n);

      label(r,captions[b]);

      // The bridge initially contains a missing connection.
      for(let j=0;j<3;j++){
        const connected=
          b>=6 ||
          (b>=1&&j===0) ||
          (b>=4&&j===2);

        attribute(
          r,`.bs-${j}`,
          "stroke-dashoffset",
          connected?0:100
        );

        stroke(
          r,`.bs-${j}`,
          b===1&&j===1?
          C.orange:C.green
        );

        transform(
          r,`.bg-${j}`,
          `translateY(${b===1&&j===1?16:0}px)`
        );
      }

      // The traveller cannot complete the journey until
      // authority reconnects the missing handoff.
      let tx;

      if(b<=1){
        tx=f*85;
      }else if(b<=3){
        tx=90+m.x*.4;
      }else if(b<=5){
        tx=95+f*45;
      }else{
        tx=245*f;
      }

      transform(
        r,".bridge-traveller",
        `translate(${tx}px,${m.y*.3}px)`
      );

      opacity(
        r,".bridge-break",
        b===1||b===2?1:0
      );

      opacity(
        r,".bridge-owner",
        b>=3?1:0
      );

      opacity(
        r,".bridge-authority",
        b>=4?1:0
      );

      opacity(
        r,".bridge-cables",
        b>=4?1:0
      );

      opacity(
        r,".bridge-esc",
        b===5||b===6?1:0
      );

      opacity(
        r,".bridge-result",
        b===7?1:0
      );

      for(let j=0;j<4;j++){
        attribute(
          r,`.bc-${j}`,
          "stroke-dashoffset",
          b>=4+j%2?0:200
        );
      }

      // Department islands respond independently.
      islands.forEach((_,j)=>{
        transform(
          r,`.bi-${j}`,
          `translateY(${b===2?
            Math.sin(i+j)*6:
            b===7?0:m.y*.2}px)`
        );
      });

      transform(
        r,".bridge-owner",
        `translateY(${m.y*.5}px)`
      );

      transform(
        r,".bridge-result",
        `scale(${m.pulse})`
      );
    }

    REG.W6O2b=makeScene(
      "W6O2b",
      art,
      "THE BRIDGE OF ACCOUNTABILITY",
      captions,
      render
    );
  }

  // ==========================================================
  // SCENE 6 - W6O2c
  // THE ARCHITECT'S PRINTING PRESS
  //
  // Visual metaphor:
  // A mechanical printing press receives inconsistent
  // process descriptions. Shared naming and boundary rules
  // align the printing plates. An approval seal establishes
  // the authoritative version while a controlled side tray
  // retains justified local variants.
  //
  // Distinct visual grammar:
  // Industrial press / sliding printing plates /
  // alignment guides / mechanical stamp /
  // version control / approved variant tray.
  // ==========================================================

  {
    const art=`
      <defs>
        <linearGradient id="w06-press-steel"
          x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="${C.blue}"/>
          <stop offset=".5" stop-color="${C.paper}"/>
          <stop offset="1" stop-color="${C.blue}"/>
        </linearGradient>
      </defs>

      ${text(170,26,"STRUCTURE BEFORE DETAIL",12,C.navy)}

      <g class="press-frame">
        ${rect(41,76,258,247,
          "url(#w06-press-steel)",12,{
            stroke:C.navy,
            "stroke-width":5
          }
        )}

        ${rect(59,95,222,202,C.paper,6)}

        ${rect(58,286,224,23,C.navy,5)}

        ${rect(76,308,20,31,C.navy,3)}
        ${rect(244,308,20,31,C.navy,3)}
      </g>

      <g class="press-rollers w06-moving">
        ${circle(170,117,42,C.navy)}
        ${circle(170,117,30,C.blue)}
        ${circle(170,117,13,C.paper)}
        ${circle(170,117,6,C.orange)}

        ${rect(91,149,158,15,C.navy,5)}
      </g>

      <g class="press-plate press-plate-a w06-moving">
        ${rect(79,181,76,83,C.paper,5,{
          stroke:C.orange,
          "stroke-width":2
        })}

        ${text(117,198,"RECEPTION",10,C.orange)}

        ${path(
          "M90 213 H143 M90 225 H136 M90 237 H143",
          C.navy,2,{opacity:.5}
        )}
      </g>

      <g class="press-plate press-plate-b w06-moving">
        ${rect(185,181,76,83,C.paper,5,{
          stroke:C.navy,
          "stroke-width":2
        })}

        ${text(223,198,"ARRIVAL",10,C.navy)}

        ${path(
          "M196 213 H249 M196 225 H242 M196 237 H249",
          C.navy,2,{opacity:.5}
        )}
      </g>

      <g class="press-guides w06-moving" opacity="0">
        ${line(170,163,170,281,C.green,2,{
          "stroke-dasharray":"5 5"
        })}

        ${line(75,221,265,221,C.green,2,{
          "stroke-dasharray":"5 5"
        })}

        ${circle(170,221,9,C.green)}
      </g>

      <g class="press-paper w06-moving" opacity="0">
        ${rect(107,177,126,102,C.paper,5,{
          stroke:C.green,
          "stroke-width":2.5
        })}

        ${text(170,197,"GUEST ARRIVAL",11,C.navy)}

        ${path(
          "M124 211 H216 M124 225 H208 M124 239 H216",
          C.navy,2.5,{opacity:.5}
        )}

        ${circle(170,258,9,C.green)}
      </g>

      <g class="press-stamp w06-moving" opacity="0">
        ${rect(149,63,42,39,C.orange,6)}
        ${rect(160,47,20,24,C.navy,4)}

        ${circle(170,119,24,C.green)}
        ${check(170,122,C.paper,.8)}
      </g>

      <g class="press-variant w06-moving" opacity="0">
        ${rect(231,271,79,49,C.paper,5,{
          stroke:C.orange,
          "stroke-width":2.5
        })}

        ${text(270,290,"LOCAL",10,C.orange)}
        ${text(270,304,"VARIANT",10,C.orange)}
      </g>

      <g class="press-warning w06-moving" opacity="0">
        ${circle(170,222,29,C.orange)}
        ${text(170,232,"?",32,C.paper)}
      </g>

      <g class="press-output w06-moving" opacity="0">
        ${rect(91,338,158,31,C.green,15)}
        ${text(170,358,"APPROVED REFERENCE",11,C.paper)}
      </g>

      <g class="press-gear w06-moving">
        ${gear(49,144,17,C.orange,9)}
      </g>

      <g class="press-gear2 w06-moving">
        ${gear(291,144,17,C.navy,9)}
      </g>
    `;

    const captions=[
      "Different descriptions arrive",
      "Names do not align",
      "Agree common conventions",
      "Define process boundaries",
      "Align comparable models",
      "Approve the reference",
      "Register justified variants",
      "Maintain one trusted structure"
    ];

    function render(r,i,n,last,initial){
      const b=phase(i,n,8);
      const m=beatMotion(i);
      const f=fraction(i,n);

      label(r,captions[b]);

      // The two source plates initially conflict.
      const leftX=
        b<2?-13+m.x:
        b<4?0:
        b<5?29:0;

      const rightX=
        b<2?13-m.x:
        b<4?0:
        b<5?-29:0;

      transform(
        r,".press-plate-a",
        `translate(${leftX}px,
        ${b===1?m.y:0}px)`
      );

      transform(
        r,".press-plate-b",
        `translate(${rightX}px,
        ${b===1?-m.y:0}px)`
      );

      opacity(
        r,".press-plate-a",
        b>=5?0:1
      );

      opacity(
        r,".press-plate-b",
        b>=5?0:1
      );

      opacity(
        r,".press-guides",
        b>=2&&b<=5?1:0
      );

      opacity(
        r,".press-warning",
        b===1?1:0
      );

      opacity(
        r,".press-paper",
        b>=4?1:0
      );

      opacity(
        r,".press-stamp",
        b>=5?1:0
      );

      opacity(
        r,".press-variant",
        b>=6?1:0
      );

      opacity(
        r,".press-output",
        b===7?1:0
      );

      // The stamp physically descends onto the approved model.
      transform(
        r,".press-stamp",
        `translateY(${b===5?95:
          b>=6?76:-40}px)`
      );

      // The press rollers rotate in opposite directions.
      transform(
        r,".press-rollers",
        `rotate(${Math.sin(i*.5)*5}deg)`
      );

      transform(
        r,".press-gear",
        `rotate(${i*22}deg)`
      );

      transform(
        r,".press-gear2",
        `rotate(${-i*22}deg)`
      );

      // The approved sheet advances out of the press.
      transform(
        r,".press-paper",
        `translateY(${b===7?43:
          b===6?16:0}px)`
      );

      transform(
        r,".press-variant",
        `translate(${m.x*.3}px,
        ${m.y*.4}px)`
      );

      // Naming and boundary alignment is deliberately
      // represented by mechanical convergence, not text cards.
      if(b===3||b===4){
        transform(
          r,".press-guides",
          `scale(${1+.03*Math.sin(i)})`
        );
      }
    }

    REG.W6O2c=makeScene(
      "W6O2c",
      art,
      "THE ARCHITECT'S PRINTING PRESS",
      captions,
      render
    );
  }

  // CONTINUES DIRECTLY WITH PART 3.
  // ==========================================================
  // SCENE 7 - W6O3a
  // THE ARCHITECTURE CONSTELLATION
  //
  // Visual metaphor:
  // Individual processes begin as isolated stars.
  // Strategic objectives form the gravitational centre.
  // Relationships emerge as illuminated orbital paths,
  // turning isolated processes into a coherent architecture.
  //
  // Distinct visual grammar:
  // Celestial navigation / orbital systems / constellation
  // lines / strategic gravity / moving signals.
  // ==========================================================

  {
    const nodes=[
      {x:170,y:82,name:"STRATEGY"},
      {x:75,y:145,name:"SALES"},
      {x:265,y:145,name:"SERVICE"},
      {x:58,y:256,name:"PEOPLE"},
      {x:170,y:296,name:"SYSTEMS"},
      {x:282,y:256,name:"FINANCE"}
    ];

    const links=[
      [0,1],[0,2],[1,3],
      [1,4],[2,4],[2,5],
      [3,4],[4,5]
    ];

    const art=`
      <defs>
        <radialGradient id="w06-star-glow">
          <stop stop-color="${C.gold}" stop-opacity=".45"/>
          <stop offset="1" stop-color="${C.paper}"
            stop-opacity="0"/>
        </radialGradient>
      </defs>

      ${text(170,25,"FROM ISLANDS TO SYSTEM",12,C.navy)}

      <g class="constellation-field">
        ${Array.from({length:30},(_,j)=>{
          const x=17+(j*79)%305;
          const y=47+(j*113)%300;

          return circle(x,y,j%3===0?2.2:1.2,
            C.navy,{
              opacity:.12+(j%4)*.05
            });
        }).join("")}
      </g>

      <g class="constellation-orbits w06-moving" opacity="0">
        ${S("ellipse",{
          cx:170,cy:188,rx:124,ry:105,
          fill:"none",stroke:C.blue,
          "stroke-width":2,
          "stroke-dasharray":"5 8"
        })}
        ${S("ellipse",{
          cx:170,cy:188,rx:87,ry:145,
          fill:"none",stroke:C.blue,
          "stroke-width":2,
          "stroke-dasharray":"5 8"
        })}
      </g>

      <g class="constellation-links">
        ${links.map(([a,b],j)=>
          path(
            `M${nodes[a].x} ${nodes[a].y}
             L${nodes[b].x} ${nodes[b].y}`,
            C.green,2.5,{
              class:`star-link sl-${j} w06-line`,
              "stroke-dasharray":350,
              "stroke-dashoffset":350
            }
          )
        ).join("")}
      </g>

      <g class="constellation-nodes">
        ${nodes.map((p,j)=>
          group(
            circle(0,0,36,
              "url(#w06-star-glow)")+
            circle(0,0,j===0?24:19,
              j===0?C.orange:C.navy)+
            circle(0,0,j===0?13:9,C.paper)+
            text(0,39,p.name,10,C.navy),
            {
              class:`star-node sn-${j} w06-moving`,
              transform:`translate(${p.x} ${p.y})`
            }
          )
        ).join("")}
      </g>

      <g class="constellation-centre w06-moving" opacity="0">
        ${circle(170,189,48,C.paper,{
          stroke:C.green,
          "stroke-width":4
        })}
        ${circle(170,189,34,C.blue)}
        ${text(170,186,"SHARED",12,C.navy)}
        ${text(170,201,"VALUE",12,C.navy)}
      </g>

      <g class="constellation-signal w06-moving" opacity="0">
        ${circle(170,189,9,C.orange)}
        ${circle(170,189,16,"none",{
          stroke:C.orange,
          "stroke-width":2
        })}
      </g>

      <g class="constellation-warning w06-moving" opacity="0">
        ${circle(170,189,31,C.orange)}
        ${text(170,200,"?",35,C.paper)}
      </g>

      <g class="constellation-frame w06-moving" opacity="0">
        ${circle(170,189,151,"none",{
          stroke:C.green,
          "stroke-width":3,
          "stroke-dasharray":"10 9"
        })}
      </g>

      ${text(170,373,"ONE CONNECTED LANDSCAPE",11,C.navy)}
    `;

    const captions=[
      "Processes appear isolated",
      "Strategy provides direction",
      "Find the relationships",
      "Trace the dependencies",
      "Connect supporting systems",
      "See shared value",
      "Test the whole architecture",
      "One coherent constellation"
    ];

    function render(r,i,n,last,initial){
      const b=phase(i,n,8);
      const m=beatMotion(i);
      const f=fraction(i,n);

      label(r,captions[b]);

      opacity(
        r,".constellation-orbits",
        b>=2?1:0
      );

      opacity(
        r,".constellation-centre",
        b>=5?1:0
      );

      opacity(
        r,".constellation-signal",
        b>=3&&b<=6?1:0
      );

      opacity(
        r,".constellation-warning",
        b===0||b===1?1:0
      );

      opacity(
        r,".constellation-frame",
        b===7?1:0
      );

      links.forEach((_,j)=>{
        const active=
          b>=7 ||
          (b>=2&&j<2) ||
          (b>=3&&j<4) ||
          (b>=4&&j<6) ||
          (b>=5&&j<8);

        attribute(
          r,`.sl-${j}`,
          "stroke-dashoffset",
          active?0:350
        );

        stroke(
          r,`.sl-${j}`,
          j===i%links.length?
          C.orange:C.green
        );
      });

      nodes.forEach((p,j)=>{
        const dx=Math.sin(i*.8+j*1.5)*4;
        const dy=Math.cos(i*.7+j)*4;

        const scatter=b===0?1.25:
          b===1?1.12:1;

        const x=170+(p.x-170)*scatter+dx;
        const y=189+(p.y-189)*scatter+dy;

        const e=one(r,`.sn-${j}`);

        if(e){
          e.setAttribute(
            "transform",
            `translate(${x} ${y})
             scale(${j===i%nodes.length?1.15:1})`
          );
        }
      });

      // A moving signal traverses the network rather than
      // remaining as a static highlighted node.
      if(b>=3&&b<=6){
        const edge=links[i%links.length];
        const a=nodes[edge[0]];
        const z=nodes[edge[1]];
        const t=.15+.7*((i%5)/4);

        const x=a.x+(z.x-a.x)*t;
        const y=a.y+(z.y-a.y)*t;

        transform(
          r,".constellation-signal",
          `translate(${x-170}px,${y-189}px)`
        );
      }

      transform(
        r,".constellation-frame",
        `rotate(${i*7}deg)`
      );

      transform(
        r,".constellation-centre",
        `scale(${m.pulse})`
      );

      transform(
        r,".constellation-orbits",
        `rotate(${m.angle*.35}deg)`
      );
    }

    REG.W6O3a=makeScene(
      "W6O3a",
      art,
      "THE ARCHITECTURE CONSTELLATION",
      captions,
      render
    );
  }

  // ==========================================================
  // SCENE 8 - W6O3b
  // THE PROCESS X-RAY
  //
  // Visual metaphor:
  // A diagnostic scanner moves across an operating process.
  // Hidden weaknesses become visible beneath the surface.
  // The scanner distinguishes symptoms from structural
  // causes and reveals where redesign should intervene.
  //
  // Distinct visual grammar:
  // Medical-style scanner / moving diagnostic beam /
  // transparent process machinery / defect detection /
  // structural repair.
  // ==========================================================

  {
    const art=`
      <defs>
        <linearGradient id="w06-xray-beam"
          x1="0" y1="0" x2="1" y2="0">
          <stop stop-color="${C.green}"
            stop-opacity="0"/>
          <stop offset=".5" stop-color="${C.green}"
            stop-opacity=".35"/>
          <stop offset="1" stop-color="${C.green}"
            stop-opacity="0"/>
        </linearGradient>
      </defs>

      ${text(170,25,"LOOK BENEATH THE SURFACE",12,C.navy)}

      <g class="xray-machine">
        ${rect(26,73,288,243,C.paper,14,{
          stroke:C.navy,
          "stroke-width":4
        })}

        ${rect(43,91,254,190,C.blue,8)}

        ${rect(37,292,266,16,C.navy,6)}

        ${rect(57,308,20,32,C.navy,4)}
        ${rect(263,308,20,32,C.navy,4)}
      </g>

      <g class="xray-process">
        ${[0,1,2,3].map(j=>{
          const x=57+j*62;

          return group(
            rect(x,163,46,46,C.paper,7,{
              stroke:C.navy,
              "stroke-width":2.5
            })+
            circle(x+23,186,11,
              j===2?C.orange:C.green)+
            text(x+23,227,
              ["REQUEST","CHECK","APPROVE","DELIVER"][j],
              9,C.navy),
            {
              class:`xray-stage xs-${j} w06-moving`
            }
          );
        }).join("")}

        ${[0,1,2].map(j=>
          arrow(
            104+j*62,186,
            118+j*62,186,
            C.navy
          )
        ).join("")}
      </g>

      <g class="xray-beam w06-moving">
        ${rect(49,98,43,174,
          "url(#w06-xray-beam)",0)}

        ${line(70,95,70,275,C.green,2,{
          opacity:.75
        })}
      </g>

      <g class="xray-defect w06-moving" opacity="0">
        ${circle(204,186,27,C.orange,{
          opacity:.9
        })}
        ${text(204,196,"!",34,C.paper)}

        ${circle(204,186,40,"none",{
          stroke:C.orange,
          "stroke-width":3,
          "stroke-dasharray":"6 7"
        })}
      </g>

      <g class="xray-bottleneck w06-moving" opacity="0">
        ${path(
          "M161 143 L185 165 L161 187",
          C.orange,5
        )}

        ${path(
          "M248 143 L224 165 L248 187",
          C.orange,5
        )}

        ${rect(186,118,37,19,C.orange,8)}
        ${text(204,131,"WAIT",10,C.paper)}
      </g>

      <g class="xray-cause w06-moving" opacity="0">
        ${path(
          "M204 161 Q204 117 169 105",
          C.orange,3,{
            "stroke-dasharray":"5 5"
          }
        )}

        ${circle(169,105,24,C.paper,{
          stroke:C.orange,
          "stroke-width":3
        })}

        ${text(169,110,"WHY?",12,C.orange)}
      </g>

      <g class="xray-repair w06-moving" opacity="0">
        ${circle(204,186,30,C.green)}
        ${check(204,190,C.paper,1.1)}

        ${path(
          "M105 252 H266",
          C.green,4
        )}
      </g>

      <g class="xray-metrics w06-moving" opacity="0">
        ${rect(92,111,156,31,C.paper,15,{
          stroke:C.green,
          "stroke-width":2
        })}

        ${text(170,131,"FLOW RESTORED",11,C.green)}
      </g>

      <g class="xray-monitor w06-moving">
        ${rect(100,339,140,29,C.navy,6)}

        ${path(
          "M113 354 H133 L141 345 L150 361 L160 349 L171 354 H227",
          C.green,2.5,{
            class:"xray-pulse-line"
          }
        )}
      </g>
    `;

    const captions=[
      "The process looks normal",
      "Scan the operating flow",
      "Locate the weak point",
      "Identify the bottleneck",
      "Separate cause from symptom",
      "Target structural repair",
      "Restore end-to-end flow",
      "Validate the improvement"
    ];

    function render(r,i,n,last,initial){
      const b=phase(i,n,8);
      const m=beatMotion(i);
      const f=fraction(i,n);

      label(r,captions[b]);

      const scanX=
        b<2?i*17%185:
        b<5?118+m.x:
        184;

      transform(
        r,".xray-beam",
        `translateX(${scanX}px)`
      );

      opacity(
        r,".xray-defect",
        b>=2&&b<=5?1:0
      );

      opacity(
        r,".xray-bottleneck",
        b===3||b===4?1:0
      );

      opacity(
        r,".xray-cause",
        b===4||b===5?1:0
      );

      opacity(
        r,".xray-repair",
        b>=6?1:0
      );

      opacity(
        r,".xray-metrics",
        b===7?1:0
      );

      for(let j=0;j<4;j++){
        const active=j===i%4;

        transform(
          r,`.xs-${j}`,
          `translateY(${active?-7:0}px)
           scale(${active?1.06:1})`
        );

        opacity(
          r,`.xs-${j}`,
          b===3&&j===2?.45:1
        );
      }

      transform(
        r,".xray-defect",
        `scale(${m.pulse})`
      );

      transform(
        r,".xray-cause",
        `translate(${m.x*.4}px,
        ${m.y*.4}px)`
      );

      transform(
        r,".xray-repair",
        `scale(${b>=6?1+.025*Math.sin(i):.8})`
      );

      // The diagnostic monitor advances with narration.
      attribute(
        r,".xray-pulse-line",
        "stroke-dasharray",
        `${25+i%7*9} 8`
      );

      stroke(
        r,".xray-pulse-line",
        b>=6?C.green:
        b>=2?C.orange:C.green
      );
    }

    REG.W6O3b=makeScene(
      "W6O3b",
      art,
      "THE PROCESS X-RAY",
      captions,
      render
    );
  }

  // ==========================================================
  // SCENE 9 - W6O3c
  // THE ARCHITECTURE CONTROL TOWER
  //
  // Visual metaphor:
  // An airport-style control tower coordinates the
  // organisation's process landscape. Multiple operational
  // routes approach the tower. Governance mechanisms
  // prioritise, approve, monitor and redirect traffic.
  //
  // Distinct visual grammar:
  // Airfield / control tower / radar sweep /
  // moving process aircraft / governance signals /
  // route clearance.
  // ==========================================================

  {
    const art=`
      <defs>
        <radialGradient id="w06-tower-radar">
          <stop stop-color="${C.green}"
            stop-opacity=".24"/>
          <stop offset="1" stop-color="${C.paper}"
            stop-opacity="0"/>
        </radialGradient>
      </defs>

      ${text(170,25,"GOVERN THE WHOLE LANDSCAPE",12,C.navy)}

      <g class="tower-radar">
        ${circle(170,162,128,
          "url(#w06-tower-radar)")}

        ${[36,70,105].map(rad=>
          circle(170,162,rad,"none",{
            stroke:C.green,
            "stroke-width":1.5,
            opacity:.35
          })
        ).join("")}

        ${line(170,49,170,275,C.green,1,{
          opacity:.25
        })}

        ${line(57,162,283,162,C.green,1,{
          opacity:.25
        })}
      </g>

      <g class="tower-sweep w06-moving">
        ${path(
          "M170 162 L170 52 A110 110 0 0 1 268 113 Z",
          C.green,1,{
            fill:C.green,
            "fill-opacity":.16,
            "stroke-opacity":.3
          }
        )}
      </g>

      <g class="tower-structure">
        ${rect(141,177,58,137,C.paper,5,{
          stroke:C.navy,
          "stroke-width":3
        })}

        ${path(
          "M151 314 L163 220 H177 L189 314",
          C.navy,3
        )}

        ${rect(116,144,108,44,C.navy,8)}

        ${rect(126,152,88,22,C.blue,4)}

        ${line(170,144,170,115,C.navy,3)}

        ${circle(170,109,8,C.orange)}

        ${rect(102,314,136,14,C.navy,5)}
      </g>

      <g class="tower-routes">
        ${[
          "M31 259 Q87 221 128 178",
          "M309 259 Q253 221 212 178",
          "M61 75 Q99 104 139 153",
          "M279 75 Q241 104 201 153"
        ].map((d,j)=>
          path(d,C.green,3,{
            class:`tower-route tr-${j} w06-line`,
            "stroke-dasharray":240,
            "stroke-dashoffset":240
          })
        ).join("")}
      </g>

      <g class="tower-aircraft">
        ${[
          [35,257],[305,257],[61,77],[279,77]
        ].map(([x,y],j)=>
          group(
            path(
              "M0 -17 L7 -2 L21 3 L21 10 L5 7 L4 20 L-4 20 L-5 7 L-21 10 L-21 3 L-7 -2Z",
              C.navy,2,{
                fill:j%2?C.orange:C.navy
              }
            ),
            {
              class:`tower-plane tp-${j} w06-moving`,
              transform:`translate(${x} ${y})`
            }
          )
        ).join("")}
      </g>

      <g class="tower-priority w06-moving" opacity="0">
        ${circle(170,162,49,"none",{
          stroke:C.orange,
          "stroke-width":5,
          "stroke-dasharray":"9 7"
        })}

        ${text(170,213,"PRIORITY",11,C.orange)}
      </g>

      <g class="tower-approval w06-moving" opacity="0">
        ${circle(170,162,26,C.green)}
        ${check(170,165,C.paper,.9)}
      </g>

      <g class="tower-alert w06-moving" opacity="0">
        ${circle(170,109,19,C.orange)}
        ${text(170,116,"!",22,C.paper)}
      </g>

      <g class="tower-board w06-moving" opacity="0">
        ${rect(75,338,190,33,C.paper,8,{
          stroke:C.green,
          "stroke-width":2.5
        })}

        ${text(170,359,"GOVERNED PROCESS FLOW",11,C.green)}
      </g>
    `;

    const captions=[
      "Many processes compete",
      "Establish the control view",
      "Prioritise what matters",
      "Clarify decision authority",
      "Approve architectural changes",
      "Monitor the dependencies",
      "Redirect emerging risks",
      "Keep the landscape governed"
    ];

    function render(r,i,n,last,initial){
      const b=phase(i,n,8);
      const m=beatMotion(i);
      const f=fraction(i,n);

      label(r,captions[b]);

      transform(
        r,".tower-sweep",
        `rotate(${i*21}deg)`
      );

      for(let j=0;j<4;j++){
        const active=
          b>=7 ||
          (b>=1&&j===0) ||
          (b>=2&&j===1) ||
          (b>=4&&j===2) ||
          (b>=5&&j===3);

        attribute(
          r,`.tr-${j}`,
          "stroke-dashoffset",
          active?0:240
        );

        stroke(
          r,`.tr-${j}`,
          j===i%4?C.orange:C.green
        );

        const start=[
          [35,257],[305,257],
          [61,77],[279,77]
        ][j];

        const target=[
          [128,178],[212,178],
          [139,153],[201,153]
        ][j];

        const t=active?
          .2+.7*((i%6)/5):0;

        const x=start[0]+
          (target[0]-start[0])*t;

        const y=start[1]+
          (target[1]-start[1])*t;

        const e=one(r,`.tp-${j}`);

        if(e){
          e.setAttribute(
            "transform",
            `translate(${x} ${y})
             rotate(${j%2?25:-25})`
          );
        }
      }

      opacity(
        r,".tower-priority",
        b===2||b===3?1:0
      );

      opacity(
        r,".tower-approval",
        b===4||b===7?1:0
      );

      opacity(
        r,".tower-alert",
        b===6?1:0
      );

      opacity(
        r,".tower-board",
        b===7?1:0
      );

      transform(
        r,".tower-priority",
        `rotate(${i*10}deg)`
      );

      transform(
        r,".tower-approval",
        `scale(${m.pulse})`
      );

      transform(
        r,".tower-alert",
        `translateY(${m.y}px)`
      );
    }

    REG.W6O3c=makeScene(
      "W6O3c",
      art,
      "THE ARCHITECTURE CONTROL TOWER",
      captions,
      render
    );
  }

  // CONTINUES DIRECTLY WITH PART 4.
  // ==========================================================
  // SCENE 10 - W6O3d
  // THE PROCESS ARCHITECTURE COMPASS
  //
  // Visual metaphor:
  // A large navigational compass aligns process decisions
  // with strategic direction. Competing priorities initially
  // pull in different directions. The needle settles when
  // objectives, ownership and measures become aligned.
  //
  // Distinct visual grammar:
  // Navigational instrument / rotating compass rose /
  // competing magnetic fields / strategic alignment /
  // illuminated destination.
  // ==========================================================

  {
    const art=`
      <defs>
        <radialGradient id="w06-compass-face">
          <stop stop-color="${C.paper}"/>
          <stop offset=".8" stop-color="${C.blue}"/>
          <stop offset="1" stop-color="${C.paper}"/>
        </radialGradient>
      </defs>

      ${text(170,25,"FIND THE STRATEGIC NORTH",12,C.navy)}

      <g class="compass-body">
        ${circle(170,190,139,C.blue,{
          opacity:.45
        })}

        ${circle(170,190,124,C.paper,{
          stroke:C.navy,
          "stroke-width":6
        })}

        ${circle(170,190,108,
          "url(#w06-compass-face)",{
            stroke:C.orange,
            "stroke-width":2.5
          }
        )}
      </g>

      <g class="compass-rose w06-moving">
        ${Array.from({length:16},(_,j)=>{
          const a=j*Math.PI/8;
          const r1=j%2===0?86:94;
          const r2=102;

          return line(
            170+Math.sin(a)*r1,
            190-Math.cos(a)*r1,
            170+Math.sin(a)*r2,
            190-Math.cos(a)*r2,
            j%4===0?C.orange:C.navy,
            j%4===0?3:1.5
          );
        }).join("")}

        ${text(170,112,"N",15,C.orange)}
        ${text(170,277,"S",13,C.navy)}
        ${text(254,195,"E",13,C.navy)}
        ${text(86,195,"W",13,C.navy)}
      </g>

      <g class="compass-needle w06-moving">
        ${path(
          "M170 122 L183 190 L170 203 L157 190Z",
          C.orange,2,{
            fill:C.orange
          }
        )}

        ${path(
          "M170 258 L183 190 L170 203 L157 190Z",
          C.navy,2,{
            fill:C.navy
          }
        )}

        ${circle(170,190,13,C.paper,{
          stroke:C.navy,
          "stroke-width":3
        })}

        ${circle(170,190,5,C.orange)}
      </g>

      <g class="compass-pulls w06-moving" opacity="0">
        ${[
          [58,104],[282,104],
          [58,276],[282,276]
        ].map(([x,y],j)=>
          group(
            circle(x,y,19,
              j%2?C.orange:C.navy)+
            path(
              `M${x-7} ${y} H${x+7}`,
              C.paper,3
            ),
            {
              class:`compass-pull cp-${j} w06-moving`
            }
          )
        ).join("")}
      </g>

      <g class="compass-objective w06-moving" opacity="0">
        ${circle(170,63,25,C.green)}
        ${check(170,67,C.paper,.8)}
      </g>

      <g class="compass-alignment w06-moving" opacity="0">
        ${path(
          "M170 96 V124",
          C.green,4,{
            "stroke-dasharray":"5 5"
          }
        )}

        ${circle(170,190,118,"none",{
          stroke:C.green,
          "stroke-width":4,
          "stroke-dasharray":"9 7"
        })}
      </g>

      <g class="compass-target w06-moving" opacity="0">
        ${circle(170,190,49,"none",{
          stroke:C.green,
          "stroke-width":4
        })}

        ${circle(170,190,32,"none",{
          stroke:C.green,
          "stroke-width":3
        })}

        ${circle(170,190,15,C.green)}
      </g>

      <g class="compass-route w06-moving" opacity="0">
        ${path(
          "M170 313 V344",
          C.green,4,{
            "stroke-dasharray":"5 5"
          }
        )}

        ${circle(170,351,13,C.green)}
      </g>

      ${text(170,380,"DIRECTION BEFORE DESIGN",11,C.navy)}
    `;

    const captions=[
      "Many competing priorities",
      "Identify strategic direction",
      "Choose the destination",
      "Align process objectives",
      "Connect ownership",
      "Align performance measures",
      "Test the chosen direction",
      "Navigate with confidence"
    ];

    function render(r,i,n,last,initial){
      const b=phase(i,n,8);
      const m=beatMotion(i);
      const f=fraction(i,n);

      label(r,captions[b]);

      const angles=[
        -65,43,-38,19,-12,7,2,0
      ];

      const angle=angles[b]+
        (b<6?m.angle*.45:0);

      transform(
        r,".compass-needle",
        `rotate(${angle}deg)`
      );

      transform(
        r,".compass-rose",
        `rotate(${b<3?i*6:
          m.angle*.2}deg)`
      );

      opacity(
        r,".compass-pulls",
        b<=2?1:0
      );

      opacity(
        r,".compass-objective",
        b>=2?1:0
      );

      opacity(
        r,".compass-alignment",
        b>=3?1:0
      );

      opacity(
        r,".compass-target",
        b>=6?1:0
      );

      opacity(
        r,".compass-route",
        b===7?1:0
      );

      for(let j=0;j<4;j++){
        transform(
          r,`.cp-${j}`,
          `translate(${Math.sin(i+j)*7}px,
          ${Math.cos(i+j)*7}px)`
        );
      }

      transform(
        r,".compass-objective",
        `translateY(${m.y*.4}px)
         scale(${m.pulse})`
      );

      transform(
        r,".compass-target",
        `scale(${b===7?1.07:1})`
      );
    }

    REG.W6O3d=makeScene(
      "W6O3d",
      art,
      "THE PROCESS ARCHITECTURE COMPASS",
      captions,
      render
    );
  }

  // ==========================================================
  // SCENE 11 - W6O3e
  // THE ARCHITECTURE LAUNCH PAD
  //
  // Visual metaphor:
  // Process architecture becomes an executable improvement
  // programme. A launch vehicle is assembled from decisions,
  // evidence, ownership and measures. Each component locks
  // into place before the vehicle can leave the launch pad.
  //
  // Distinct visual grammar:
  // Rocket assembly / mechanical docking /
  // countdown lights / ignition / rising vehicle /
  // strategic destination.
  // ==========================================================

  {
    const art=`
      <defs>
        <linearGradient id="w06-launch-flame"
          x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="${C.gold}"/>
          <stop offset=".6" stop-color="${C.orange}"/>
          <stop offset="1" stop-color="${C.orange}"
            stop-opacity="0"/>
        </linearGradient>
      </defs>

      ${text(170,25,"TURN ARCHITECTURE INTO ACTION",12,C.navy)}

      <g class="launch-background">
        ${circle(170,100,80,C.blue,{
          opacity:.45
        })}

        ${Array.from({length:16},(_,j)=>{
          const x=22+(j*73)%295;
          const y=43+(j*97)%225;

          return circle(x,y,1.5,C.navy,{
            opacity:.25
          });
        }).join("")}
      </g>

      <g class="launch-tower">
        ${rect(58,99,20,234,C.navy,3)}

        ${[0,1,2,3,4].map(j=>
          line(
            58,120+j*42,
            78,141+j*42,
            C.paper,2
          )+
          line(
            78,120+j*42,
            58,141+j*42,
            C.paper,2
          )
        ).join("")}

        ${rect(78,184,52,9,C.navy,3)}
        ${rect(78,252,52,9,C.navy,3)}
      </g>

      <g class="launch-rocket w06-moving">
        <g class="launch-nose w06-moving">
          ${path(
            "M145 113 Q170 53 195 113Z",
            C.navy,2,{
              fill:C.orange
            }
          )}
        </g>

        <g class="launch-body w06-moving">
          ${rect(145,113,50,135,C.paper,11,{
            stroke:C.navy,
            "stroke-width":3
          })}

          ${rect(145,153,50,14,C.blue,0)}

          ${circle(170,138,13,C.blue,{
            stroke:C.navy,
            "stroke-width":2
          })}

          ${circle(170,138,6,C.green)}
        </g>

        <g class="launch-fins w06-moving">
          ${path(
            "M145 213 L121 257 L145 250Z",
            C.orange,2,{
              fill:C.orange
            }
          )}

          ${path(
            "M195 213 L219 257 L195 250Z",
            C.orange,2,{
              fill:C.orange
            }
          )}
        </g>

        <g class="launch-engine w06-moving">
          ${rect(155,247,30,20,C.navy,4)}
          ${rect(161,266,18,12,C.orange,3)}
        </g>

        <g class="launch-flame w06-moving" opacity="0">
          ${path(
            "M158 276 Q143 308 170 346 Q197 308 182 276Z",
            C.orange,2,{
              fill:"url(#w06-launch-flame)"
            }
          )}
        </g>
      </g>

      <g class="launch-components">
        ${[
          ["EVIDENCE",45,128],
          ["OWNERSHIP",294,153],
          ["MEASURES",42,225],
          ["DECISIONS",295,256]
        ].map(([name,x,y],j)=>
          group(
            rect(-37,-16,74,32,
              j%2?C.blue:C.paper,7,{
                stroke:j%2?C.green:C.navy,
                "stroke-width":2
              })+
            text(0,4,name,9,C.navy),
            {
              class:`launch-part lp-${j} w06-moving`,
              transform:`translate(${x} ${y})`
            }
          )
        ).join("")}
      </g>

      <g class="launch-countdown w06-moving">
        ${[0,1,2].map(j=>
          circle(122+j*48,313,10,C.blue,{
            class:`launch-light ll-${j}`
          })
        ).join("")}
      </g>

      <g class="launch-pad">
        ${rect(85,337,170,13,C.navy,5)}
        ${rect(103,350,134,15,C.blue,4)}
      </g>

      <g class="launch-destination w06-moving" opacity="0">
        ${circle(170,60,28,C.green)}
        ${check(170,63,C.paper,.9)}
      </g>

      <g class="launch-ready w06-moving" opacity="0">
        ${rect(105,365,130,23,C.green,11)}
        ${text(170,381,"READY TO LAUNCH",10,C.paper)}
      </g>
    `;

    const captions=[
      "A design is not enough",
      "Collect credible evidence",
      "Confirm accountable owners",
      "Define meaningful measures",
      "Record the decisions",
      "Check launch readiness",
      "Activate the improvement",
      "Move from map to action"
    ];

    function render(r,i,n,last,initial){
      const b=phase(i,n,8);
      const m=beatMotion(i);
      const f=fraction(i,n);

      label(r,captions[b]);

      const positions=[
        [45,128],
        [294,153],
        [42,225],
        [295,256]
      ];

      const dock=[
        [170,156],
        [170,184],
        [170,212],
        [170,240]
      ];

      for(let j=0;j<4;j++){
        const locked=b>=j+2;

        const x=locked?
          dock[j][0]:positions[j][0]+m.x*.4;

        const y=locked?
          dock[j][1]:positions[j][1]+m.y*.4;

        const e=one(r,`.lp-${j}`);

        if(e){
          e.setAttribute(
            "transform",
            `translate(${x} ${y})
             scale(${locked?.73:1})`
          );

          e.style.opacity=b>=6?.15:1;
        }
      }

      for(let j=0;j<3;j++){
        fill(
          r,`.ll-${j}`,
          b>=5+j?
          C.green:
          j===i%3?C.orange:C.blue
        );
      }

      opacity(
        r,".launch-flame",
        b>=6?1:0
      );

      opacity(
        r,".launch-destination",
        b===7?1:0
      );

      opacity(
        r,".launch-ready",
        b>=5?1:0
      );

      // The rocket rises only after the launch conditions
      // have been assembled and checked.
      const lift=
        b===6?-22:
        b===7?-105:0;

      transform(
        r,".launch-rocket",
        `translateY(${lift+m.y*
          (b>=6?.5:.12)}px)`
      );

      transform(
        r,".launch-flame",
        `scaleY(${b>=6?
          1+.13*Math.sin(i*1.4):.3})`
      );

      // Subtle physical assembly motion.
      transform(
        r,".launch-nose",
        `translateY(${b<2?-12:0}px)`
      );

      transform(
        r,".launch-fins",
        `translateY(${b<4?9:0}px)`
      );

      transform(
        r,".launch-engine",
        `translateY(${b<5?8:0}px)`
      );

      transform(
        r,".launch-destination",
        `scale(${m.pulse})`
      );
    }

    REG.W6O3e=makeScene(
      "W6O3e",
      art,
      "THE ARCHITECTURE LAUNCH PAD",
      captions,
      render
    );
  }

  // ==========================================================
  // SHARED COMPLETION AND RUNTIME SAFEGUARDS
  // ==========================================================

  // Keep the registry additive. Other weeks and other
  // presentation looks can coexist without replacement.

  const WEEK06_IDS=[
    "W6O1a",
    "W6O1b",
    "W6O1c",
    "W6O2a",
    "W6O2b",
    "W6O2c",
    "W6O3a",
    "W6O3b",
    "W6O3c",
    "W6O3d",
    "W6O3e"
  ];

  // Verify that every registered scene exposes the contract.
  // A missing scene is reported without breaking other weeks.
  WEEK06_IDS.forEach(id=>{
    const scene=REG[id];

    if(!scene ||
       typeof scene.build!=="function" ||
       typeof scene.step!=="function" ||
       typeof scene.reset!=="function"){

      console.warn(
        "[VoiceLearn Week 6] Invalid scene contract:",
        id
      );
    }
  });

  // The app may call build after DOM readiness, but stylesheet
  // installation is also safe when this script is loaded late.
  if(typeof document!=="undefined"){
    if(document.head){
      installCSS();
    }else{
      document.addEventListener(
        "DOMContentLoaded",
        installCSS,
        {once:true}
      );
    }
  }

})();
