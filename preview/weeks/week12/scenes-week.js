/*
 * OPER621 · WEEK 12 · THE IMPLEMENT PHASE
 * Cinematic, narration-synchronised visual scenes.
 *
 * Contract:
 * window.VL_SCENES[secId] = {
 *   build(el),
 *   step(i, n),
 *   reset()
 * };
 *
 * Each section has an original SVG composition.
 * Each narration moment produces a visible state change.
 * Scenes are seek-safe, responsive and reduced-motion aware.
 *
 * Palette follows the Week 10 production:
 * navy   #1f4e79
 * orange #c0502a
 * paper  #fbf8f1
 * ink    #1b2a3a
 * blue   #dbe7f2
 * green  #317c61
 *
 * No narration text is reproduced inside the illustration.
 * Labels are short and serve the visual metaphor.
 */
(() => {
  "use strict";

  window.VL_SCENES = window.VL_SCENES || {};

  const NS = "http://www.w3.org/2000/svg";
  const C = {
    navy:"#1f4e79",
    orange:"#c0502a",
    paper:"#fbf8f1",
    ink:"#1b2a3a",
    blue:"#dbe7f2",
    green:"#317c61",
    pale:"#e8f1eb",
    gold:"#d9a75c"
  };

  const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
  const reduced = () => !!(
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const R = (x,y,w,h,fill,rx=0,extra="") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}"
      rx="${rx}" fill="${fill}" ${extra}/>`;

  const O = (x,y,r,fill,extra="") =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;

  const P = (d,color=C.navy,width=2,extra="") =>
    `<path d="${d}" fill="none" stroke="${color}"
      stroke-width="${width}" stroke-linecap="round"
      stroke-linejoin="round" ${extra}/>`;

  const T = (x,y,value,size=13,color=C.ink,extra="") =>
    `<text x="${x}" y="${y}" text-anchor="middle"
      font-size="${size}" fill="${color}" ${extra}>${value}</text>`;

  const G = (cls,content,extra="") =>
    `<g class="${cls}" ${extra}>${content}</g>`;

  const person = (x,y,color=C.navy,s=1) =>
    `<g transform="translate(${x} ${y}) scale(${s})">
      ${O(0,-13,9,color)}
      <path d="M-16 14 Q-16 -2 0 -2 Q16 -2 16 14Z"
        fill="${color}"/>
    </g>`;

  const check = (x,y,color=C.green,s=1) =>
    `<g transform="translate(${x} ${y}) scale(${s})">
      ${P("M-11 0 L-3 8 L14 -12",color,4)}
    </g>`;

  const cross = (x,y,color=C.orange) =>
    P(`M${x-9} ${y-9} L${x+9} ${y+9}
       M${x+9} ${y-9} L${x-9} ${y+9}`,color,4);

  const arrow = (x,y,color=C.navy) =>
    P(`M${x-10} ${y} H${x+10}
       M${x+3} ${y-7} L${x+10} ${y} L${x+3} ${y+7}`,
       color,3);

  const hotel = (x,y,w=64,h=105,color=C.navy) => `
    <g>
      ${R(x,y,w,h,C.paper,3,
        `stroke="${color}" stroke-width="3"`)}
      ${R(x+7,y+8,w-14,8,C.blue,2)}
      ${[0,1,2].map(row =>
        [0,1].map(col =>
          R(x+12+col*(w-35),y+27+row*20,13,12,
            row===2?C.blue:"#dbe7f2",2)
        ).join("")
      ).join("")}
      ${R(x+w/2-9,y+h-25,18,25,color,2)}
    </g>`;

  const kiosk = (x,y,s=1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      ${R(-25,-62,50,94,C.navy,10)}
      ${R(-19,-55,38,55,C.blue,5)}
      ${R(-13,-47,26,6,C.green,3)}
      ${P("M-11 -28 H11 M-11 -18 H7",C.navy,2)}
      ${O(0,13,5,C.green)}
      ${P("M0 32 V60 M-17 60 H17",C.navy,6)}
    </g>`;

  const clock = (x,y,r=31) => `
    <g>
      ${O(x,y,r,C.paper,
        `stroke="${C.navy}" stroke-width="3"`)}
      ${P(`M${x} ${y} V${y-r*.57}
          M${x} ${y} L${x+r*.43} ${y+r*.22}`,
          C.orange,3)}
      ${O(x,y,4,C.navy)}
    </g>`;

  const gear = (x,y,r,color=C.navy) => {
    const teeth = Array.from({length:10},(_,j) => {
      const a=j*Math.PI/5;
      const xx=x+(r+4)*Math.cos(a);
      const yy=y+(r+4)*Math.sin(a);
      return R(xx-5,yy-5,10,10,color,2,
        `transform="rotate(${j*36} ${xx} ${yy})"`);
    }).join("");
    return teeth+O(x,y,r,color)+O(x,y,r*.48,C.paper);
  };

  const svg = body => `
    <svg class="vls-w12-art"
      xmlns="${NS}"
      viewBox="0 0 340 390"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Animated business process implementation illustration">
      ${body}
    </svg>`;

  // ============================================================
  // SINGLE STYLESHEET
  // ============================================================

  if (!document.getElementById("vl-sc-w12")) {
    const style=document.createElement("style");
    style.id="vl-sc-w12";
    style.textContent=`
      [class*="vls-w12-W12"] {
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
        isolation:isolate;
        box-sizing:border-box;
        background:transparent;
        color:var(--ink);
        font-family:inherit;
      }

      [class*="vls-w12-W12"] *,
      [class*="vls-w12-W12"] *::before,
      [class*="vls-w12-W12"] *::after {
        box-sizing:border-box;
      }

      [class*="vls-w12-W12"] .vls-w12-art {
        display:block;
        width:100%;
        height:100%;
        max-width:100%;
        max-height:100%;
        overflow:visible;
        font-family:inherit;
      }

      [class*="vls-w12-W12"] svg text {
        font-family:inherit;
        font-weight:700;
        letter-spacing:.2px;
        paint-order:stroke;
      }

      [class*="vls-w12-W12"] .vls-w12-motion {
        transition:
          transform .85s cubic-bezier(.22,.75,.2,1),
          opacity .65s ease,
          fill .7s ease,
          stroke .7s ease,
          stroke-dashoffset .9s ease;
      }

      [class*="vls-w12-W12"] .vls-w12-rotor {
        transform-box:fill-box;
        transform-origin:center;
      }

      [class*="vls-w12-W12"] .vls-w12-draw {
        stroke-dasharray:400;
        stroke-dashoffset:400;
        transition:stroke-dashoffset .9s ease;
      }

      [class*="vls-w12-W12"] .vls-w12-beam {
        animation:vlsW12Scan 3s ease-in-out infinite alternate;
      }

      [class*="vls-w12-W12"] .vls-w12-pulse {
        animation:vlsW12Pulse 2.4s ease-in-out infinite;
        transform-box:fill-box;
        transform-origin:center;
      }

      [class*="vls-w12-W12"] .vls-w12-top {
        position:absolute;
        top:1.5%;
        left:5%;
        right:5%;
        text-align:center;
        color:var(--navy);
        font-size:clamp(9px,2.7vw,12px);
        font-weight:800;
        letter-spacing:1.15px;
        text-transform:uppercase;
        pointer-events:none;
      }

      [class*="vls-w12-W12"] .vls-w12-bottom {
        position:absolute;
        bottom:1.5%;
        left:5%;
        right:5%;
        text-align:center;
        font-size:clamp(10px,2.8vw,12px);
        font-weight:750;
        color:var(--navy);
        pointer-events:none;
      }

      [class*="vls-w12-W12"] .vls-w12-progress {
        position:absolute;
        left:0;
        bottom:0;
        height:3px;
        width:0;
        background:var(--orange);
        transition:width .65s ease;
      }

      [class*="vls-w12-W12"] .vls-w12-focus {
        transition:transform .9s ease,opacity .7s ease;
        transform-box:fill-box;
        transform-origin:center;
      }

      [class*="vls-w12-W12"].vls-w12-instant *,
      [class*="vls-w12-W12"].vls-w12-instant *::before,
      [class*="vls-w12-W12"].vls-w12-instant *::after {
        transition:none!important;
        animation:none!important;
      }

      @keyframes vlsW12Scan {
        from {opacity:.25}
        to {opacity:.85}
      }

      @keyframes vlsW12Pulse {
        0%,100% {opacity:.35;transform:scale(.92)}
        50% {opacity:.9;transform:scale(1.08)}
      }

      @media(max-width:375px) {
        [class*="vls-w12-W12"] .vls-w12-art {
          width:100%;
          height:100%;
        }
      }

      @media(prefers-reduced-motion:reduce) {
        [class*="vls-w12-W12"] *,
        [class*="vls-w12-W12"] *::before,
        [class*="vls-w12-W12"] *::after {
          transition:none!important;
          animation:none!important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ============================================================
  // SHARED SCENE CONTROLLER
  //
  // Each scene supplies:
  // - original artwork
  // - an original moment-by-moment animation function
  // - short status labels
  //
  // A changing focus beam and progress indicator accompany every
  // narration moment, including moments within the same major beat.
  // All visual states are derived from the requested index.
  // ============================================================

  function register(id,config) {
    let root=null;
    let last=-1;
    let lastN=1;
    let generation=0;

    function find(selector) {
      return root && root.querySelector(selector);
    }

    function all(selector) {
      return root ? [...root.querySelectorAll(selector)] : [];
    }

    function opacity(selector,value) {
      all(selector).forEach(e => {
        e.style.opacity=String(value);
      });
    }

    function transform(selector,value) {
      all(selector).forEach(e => {
        e.style.transform=value;
      });
    }

    function attribute(selector,name,value) {
      all(selector).forEach(e =>
        e.setAttribute(name,String(value))
      );
    }

    function text(selector,value) {
      const e=find(selector);
      if(e)e.textContent=value;
    }

    function draw(selector,on) {
      all(selector).forEach(e => {
        e.style.strokeDashoffset=on?"0":"400";
      });
    }

    function animate(selector,vars) {
      const elements=all(selector);
      if(!elements.length)return;
      if(window.gsap && !reduced()) {
        elements.forEach(e => {
          window.gsap.killTweensOf(e);
          window.gsap.to(e,{
            ...vars,
            duration:.65,
            ease:"power2.out",
            overwrite:true
          });
        });
      } else {
        elements.forEach(e => {
          for(const [key,value] of Object.entries(vars)) {
            if(key==="duration" || key==="ease")continue;
            e.style[key]=value;
          }
        });
      }
    }

    const api={
      find,all,opacity,transform,attribute,text,draw,animate,
      get root(){return root;}
    };

    function render(index,n,instant=false) {
      if(!root)return;

      const total=Math.max(1,Number(n)||1);
      const i=clamp(Math.floor(Number(index)||0),0,total-1);
      const p=total===1?0:i/(total-1);
      const beat=Math.min(
        config.beats-1,
        Math.floor(p*config.beats)
      );

      root.classList.toggle(
        "vls-w12-instant",
        instant || reduced()
      );

      // Cancel outstanding GSAP transitions before a seek.
      if(window.gsap) {
        root.querySelectorAll(".vls-w12-motion").forEach(e =>
          window.gsap.killTweensOf(e)
        );
      }

      config.render(api,{
        i,n:total,p,beat,
        local:(p*config.beats)%1,
        changed:i!==last,
        instant
      });

      const label=config.labels[
        Math.min(beat,config.labels.length-1)
      ];

      text(".vls-w12-bottom",label);

      const progress=find(".vls-w12-progress");
      if(progress) {
        progress.style.width=`${((i+1)/total)*100}%`;
      }

      // A small roaming illumination provides a visible transition
      // even when adjacent narration lines share a conceptual beat.
      const spot=find(".vls-w12-spot");
      if(spot) {
        const x=60+220*((i*0.61803398875)%1);
        const y=85+195*((i*0.38196601125)%1);
        spot.setAttribute("cx",x.toFixed(2));
        spot.setAttribute("cy",y.toFixed(2));
        spot.setAttribute("rx",String(33+(i%4)*8));
      }

      // Moment-specific physical indicator, not a narration card.
      const marker=find(".vls-w12-marker");
      if(marker) {
        const angle=2*Math.PI*p-Math.PI/2;
        marker.setAttribute("cx",String(
          170+143*Math.cos(angle)
        ));
        marker.setAttribute("cy",String(
          194+143*Math.sin(angle)
        ));
      }

      // Deterministic alternating visual emphasis on each moment.
      const accents=all(".vls-w12-accent");
      accents.forEach((e,j) => {
        e.style.opacity=((i+j)%3===0)?".95":".35";
      });

      last=i;
      lastN=total;
      generation++;

      if(instant && !reduced()) {
        void root.offsetHeight;
        root.classList.remove("vls-w12-instant");
      }
    }

    window.VL_SCENES[id]={
      build(el) {
        if(!el || typeof el.replaceChildren!=="function")return;

        const div=document.createElement("div");
        div.className=`vls-w12-${id}`;

        div.innerHTML=`
          ${svg(`
            <defs>
              <radialGradient id="${id}-glow">
                <stop offset="0" stop-color="${C.gold}"
                  stop-opacity=".25"/>
                <stop offset="1" stop-color="${C.gold}"
                  stop-opacity="0"/>
              </radialGradient>
            </defs>
            <ellipse class="vls-w12-spot"
              cx="170" cy="175" rx="45" ry="65"
              fill="url(#${id}-glow)"
              pointer-events="none"/>
            ${config.art}
            ${O(170,194,143,"none",
              `stroke="${C.navy}" stroke-width=".8"
               stroke-dasharray="2 12" opacity=".1"`)}
            <circle class="vls-w12-marker"
              cx="170" cy="51" r="3"
              fill="${C.orange}" opacity=".65"/>
          `)}
          <div class="vls-w12-top">${config.title}</div>
          <div class="vls-w12-bottom"></div>
          <div class="vls-w12-progress"></div>
        `;

        el.replaceChildren(div);
        root=div;
        last=-1;
        render(0,1,true);
      },

      step(i,n) {
        if(!root)return;
        render(i,n,false);
      },

      reset() {
        if(!root)return;
        last=-1;
        render(0,lastN,true);
      }
    };
  }

  // ============================================================
  // SCENE 1 · W12O1a
  // THE LOBBY COMES ALIVE
  //
  // Metaphor:
  // A tested kiosk is introduced into a functioning hotel lobby.
  // The entire guest journey, rather than the machine alone,
  // must become operational.
  //
  // Camera:
  // Guest approaches; kiosk activates; assisted route emerges;
  // people coordinate; the whole process becomes connected.
  // ============================================================

  {
    const art=`
      ${P("M15 303 L170 228 L325 303",C.blue,2)}
      ${P("M170 228 V352 M70 278 L48 348 M270 278 L292 348",
        C.blue,1)}

      ${G("a-building",
        hotel(25,104,65,125)+hotel(250,104,65,125),
        'opacity=".5"')}

      ${G("a-kiosk vls-w12-motion",kiosk(170,182,1.1))}

      ${G("a-guest vls-w12-motion",
        person(52,275,C.navy,1.1)+
        R(68,270,16,21,C.orange,3))}

      ${G("a-host vls-w12-motion",
        person(277,263,C.green,1.1),
        'opacity="0"')}

      ${G("a-warning vls-w12-motion",
        O(170,132,21,C.orange)+
        T(170,140,"!",25,C.paper),
        'opacity="0"')}

      ${G("a-route vls-w12-motion",
        P("M80 290 Q150 335 260 279",C.green,5,
          'class="vls-w12-draw"'),
        'opacity="0"')}

      ${G("a-team vls-w12-motion",
        O(170,181,104,"none",
          `stroke="${C.green}" stroke-width="2"
           stroke-dasharray="5 7"`)+
        person(91,170,C.orange,.7)+
        person(249,170,C.green,.7),
        'opacity="0"')}

      ${G("a-success vls-w12-motion",
        O(170,131,23,C.green)+check(170,131,C.paper),
        'opacity="0"')}

      ${G("a-phase vls-w12-motion",
        T(170,355,"IMPLEMENT",15,C.navy),
        'opacity="0"')}
    `;

    register("W12O1a",{
      title:"FROM TEST TO REALITY",
      beats:8,
      labels:[
        "Tested capability",
        "Real guest arrival",
        "Operating uncertainty",
        "Assisted intervention",
        "People and process",
        "Coordinated support",
        "Everyday operation",
        "Implementation begins"
      ],
      art,
      render(a,s) {
        const b=s.beat;

        a.transform(".a-guest",
          `translate(${Math.min(110,s.p*190)}px,${b>=3?-8:0}px)`);

        a.transform(".a-kiosk",
          `translateY(${b>=2?-7:0}px) scale(${b>=5?1.04:1})`);

        a.opacity(".a-warning",b>=2&&b<=4?1:0);
        a.opacity(".a-host",b>=3?1:0);
        a.opacity(".a-route",b>=3?1:0);
        a.draw(".a-route .vls-w12-draw",b>=3);

        a.opacity(".a-team",b>=4&&b<=6?1:0);
        a.opacity(".a-success",b>=6?1:0);
        a.opacity(".a-phase",b===7?1:0);

        a.transform(".a-team",
          `rotate(${b>=4?(s.i%5)*4:0}deg)`);

        a.transform(".a-warning",
          `scale(${1+(s.i%3)*.08})`);

        a.opacity(".a-building",b>=5?.35:.65);
      }
    });
  }

  // ============================================================
  // SCENE 2 · W12O1b
  // FOUR ROLLOUT MACHINES
  //
  // Metaphor:
  // Four different physical deployment mechanisms:
  // simultaneous ignition, successive waves, twin tracks,
  // and a learning spiral.
  //
  // Unlike a comparison card, the mechanisms operate visibly.
  // ============================================================

  {
    const cells=[
      [87,117],[253,117],[87,273],[253,273]
    ];

    const art=`
      ${cells.map(([x,y],j)=>
        O(x,y,66,C.paper,
          `stroke="${C.blue}" stroke-width="2"`)
      ).join("")}

      ${G("b-bang vls-w12-motion",
        [0,1,2,3,4].map(j=>
          O(58+j*15,117,6,C.orange)
        ).join("")+
        P("M52 142 H122",C.navy,3)+
        T(87,178,"BIG BANG",11,C.navy))}

      ${G("b-phased vls-w12-motion",
        [0,1,2,3].map(j=>
          R(215+j*17,112-j*12,13,25,
            j===0?C.green:C.blue,3)
        ).join("")+
        T(253,178,"PHASED",11,C.navy))}

      ${G("b-parallel vls-w12-motion",
        P("M46 257 H125 M46 277 H125",C.navy,5)+
        O(56,257,7,C.orange)+
        O(56,277,7,C.green)+
        T(87,335,"PARALLEL",11,C.navy))}

      ${G("b-pilot vls-w12-motion",
        P("M253 273 m-9 0 a9 9 0 1 0 18 0 a19 19 0 1 0 -38 0 a30 30 0 1 0 60 0",
          C.green,3)+
        O(253,273,7,C.orange)+
        T(253,335,"PILOT THEN ROLL",10,C.navy))}

      ${G("b-flash vls-w12-motion",
        O(87,117,48,C.orange,'opacity=".18"'),
        'opacity="0"')}

      ${G("b-waves vls-w12-motion",
        P("M215 149 Q253 175 291 149",C.green,3),
        'opacity="0"')}

      ${G("b-constraint vls-w12-motion",
        cross(87,273,C.orange),
        'opacity="0"')}

      ${G("b-learn vls-w12-motion",
        O(253,273,36,"none",
          `stroke="${C.green}" stroke-width="4"`),
        'opacity="0"')}
    `;

    register("W12O1b",{
      title:"FOUR WAYS TO GO LIVE",
      beats:8,
      labels:[
        "Choose exposure",
        "One simultaneous switch",
        "Concentrated risk",
        "Successive waves",
        "Repeated transitions",
        "Two operating tracks",
        "Transaction constraint",
        "Learn before expansion"
      ],
      art,
      render(a,s) {
        const b=s.beat;

        const active=b<3?0:b<5?1:b<7?2:3;
        const groups=[
          ".b-bang",".b-phased",".b-parallel",".b-pilot"
        ];

        groups.forEach((selector,j)=>{
          a.opacity(selector,j===active?1:.25);
          a.transform(selector,
            `scale(${j===active?1.09:.96})`);
        });

        a.opacity(".b-flash",b===1||b===2?1:0);
        a.opacity(".b-waves",b===3||b===4?1:0);
        a.opacity(".b-constraint",b===6?1:0);
        a.opacity(".b-learn",b===7?1:0);

        a.transform(".b-flash",
          `scale(${1+(s.i%5)*.12})`);

        a.transform(".b-phased",
          `translateY(${b===3?-(s.i%4)*3:0}px)`);

        a.transform(".b-parallel",
          `translateX(${b>=5?(s.i%4)*3:0}px)`);

        a.transform(".b-pilot",
          `rotate(${b===7?(s.i%8)*8:0}deg)`);
      }
    });
  }

  // ============================================================
  // SCENE 3 · W12O1c
  // THE CONSTRAINT COMPASS
  //
  // Metaphor:
  // Five gravitational forces pull an implementation decision.
  // A central compass needle must settle on the binding constraint.
  //
  // The illustration changes its geometry as constraints compete.
  // ============================================================

  {
    const forces=[
      {x:170,y:67,label:"DEADLINE",color:C.orange},
      {x:281,y:151,label:"PARALLEL",color:C.navy},
      {x:239,y:286,label:"CONFIDENCE",color:C.green},
      {x:101,y:286,label:"VARIATION",color:C.navy},
      {x:59,y:151,label:"RECONCILIATION",color:C.orange}
    ];

    const art=`
      ${O(170,187,112,"none",
        `stroke="${C.blue}" stroke-width="18" opacity=".55"`)}

      ${forces.map((f,j)=>`
        ${G(`c-force c-force-${j} vls-w12-motion`,
          P(`M170 187 L${f.x} ${f.y}`,f.color,2)+
          O(f.x,f.y,24,C.paper,
            `stroke="${f.color}" stroke-width="3"`)+
          O(f.x,f.y,10,f.color)+
          T(f.x,
            f.y+(f.y<100?-34:f.y>250?41:38),
            f.label,
            f.label.length>10?9:11,
            f.color)
        )}
      `).join("")}

      ${G("c-dial vls-w12-motion",
        O(170,187,66,C.paper,
          `stroke="${C.navy}" stroke-width="3"`)+
        O(170,187,50,"none",
          `stroke="${C.blue}" stroke-width="8"`)+
        T(170,212,"FIT",14,C.navy))}

      ${G("c-needle vls-w12-motion",
        P("M170 187 L170 136",C.orange,7)+
        P("M170 136 L160 153 L180 153 Z",C.orange,1)+
        O(170,187,10,C.navy))}

      ${G("c-lock vls-w12-motion",
        O(170,187,30,C.green)+
        check(170,187,C.paper,1.3),
        'opacity="0"')}
    `;

    register("W12O1c",{
      title:"THE BINDING CONSTRAINT",
      beats:8,
      labels:[
        "Competing pressures",
        "January deadline",
        "Parallel feasibility",
        "Organisational confidence",
        "Different properties",
        "Reconciliation cost",
        "Find the constraint",
        "Defend the choice"
      ],
      art,
      render(a,s) {
        const b=s.beat;
        const selected=b>=1&&b<=5?b-1:-1;

        for(let j=0;j<5;j++){
          const on=selected===j;
          a.opacity(`.c-force-${j}`,
            selected<0?.85:on?1:.25);

          a.transform(`.c-force-${j}`,
            `scale(${on?1.12:1})`);
        }

        const angles=[-20,0,72,144,216,288,325,360];
        const angle=angles[b]+(s.i%3)*3;

        a.transform(".c-needle",`rotate(${angle}deg)`);

        a.transform(".c-dial",
          `scale(${b===6?1.12:1})`);

        a.opacity(".c-lock",b===7?1:0);
        a.opacity(".c-needle",b===7?0:1);
      }
    });
  }

  // ============================================================
  // SCENE 4 · W12O2a
  // THE PERFORMANCE VALLEY
  //
  // Metaphor:
  // A moving service vehicle descends into a learning valley,
  // then climbs toward a stronger operating plateau.
  //
  // A second moving trace shows the human change journey.
  // ============================================================

  {
    const curve=
      "M30 140 C75 135 90 147 120 220 "+
      "S185 304 220 238 S285 135 316 97";

    const art=`
      ${P("M28 305 H318 M28 75 V305",C.navy,2)}

      ${[0,1,2,3].map(j=>
        P(`M28 ${115+j*50} H318`,C.blue,1,
          'stroke-dasharray="3 7"')
      ).join("")}

      ${P(curve,C.blue,13)}

      ${G("d-curve",
        P(curve,C.green,5,
          'class="vls-w12-draw"'))}

      ${G("d-vehicle vls-w12-motion",
        R(-22,-12,44,23,C.navy,7)+
        O(-12,13,7,C.ink)+
        O(12,13,7,C.ink)+
        R(-11,-7,20,9,C.blue,2))}

      ${G("d-valley vls-w12-motion",
        O(169,269,37,C.orange,'opacity=".17"')+
        T(169,322,"LEARNING DIP",12,C.orange))}

      ${G("d-recovery vls-w12-motion",
        O(292,127,38,C.green,'opacity=".15"')+
        check(292,127,C.green,1.4),
        'opacity="0"')}

      ${G("d-change vls-w12-motion",
        [0,1,2,3].map(j=>
          O(57+j*76,359,8,
            j<2?C.orange:C.green)
        ).join("")+
        P("M57 359 H285",C.navy,2),
        'opacity="0"')}

      ${T(53,66,"PERFORMANCE",11,C.navy)}
    `;

    register("W12O2a",{
      title:"THE PERFORMANCE DIP",
      beats:8,
      labels:[
        "Before go-live",
        "Unfamiliar routines",
        "Slower service",
        "Learning valley",
        "Employee adjustment",
        "Practical support",
        "Performance recovery",
        "Beyond the dip"
      ],
      art,
      render(a,s) {
        const b=s.beat;
        const vehicle=a.find(".d-vehicle");

        const svgEl=a.find("svg");
        const path=a.find(".d-curve path");

        if(vehicle&&path&&path.getTotalLength){
          const length=path.getTotalLength();
          const point=path.getPointAtLength(length*s.p);
          vehicle.setAttribute(
            "transform",
            `translate(${point.x} ${point.y-17})`
          );
        }

        a.draw(".d-curve path",b>=1);
        a.opacity(".d-recovery",b>=6?1:0);
        a.opacity(".d-change",b>=4?1:0);

        a.transform(".d-valley",
          `scale(${b>=3&&b<=5?1.1:1})`);

        a.opacity(".d-valley",b>=2&&b<=5?1:.35);

        a.transform(".d-recovery",
          `scale(${1+(s.i%4)*.05})`);
      }
    });
  }

  // ============================================================
  // SCENE 5 · W12O2b
  // THE FRONTLINE RESCUE
  //
  // Metaphor:
  // A corporate arrival becomes stuck at a kiosk.
  // A human support network physically bridges the gap.
  //
  // Six weeks of intensive support are represented by six
  // lights, not by a generic training checklist.
  // ============================================================

  {
    const art=`
      ${P("M25 304 H315",C.blue,3)}

      ${G("e-kiosk",kiosk(91,194,1.15))}

      ${G("e-guest vls-w12-motion",
        person(39,279,C.navy,1.05)+
        R(52,272,13,19,C.orange,2))}

      ${G("e-error vls-w12-motion",
        O(91,146,22,C.orange)+
        T(91,154,"!",27,C.paper),
        'opacity="0"')}

      ${G("e-support vls-w12-motion",
        person(251,245,C.green,1.15)+
        P("M235 241 L211 216",C.green,5),
        'opacity="0"')}

      ${G("e-bridge vls-w12-motion",
        P("M111 278 Q170 208 232 278",C.green,5,
          'class="vls-w12-draw"'),
        'opacity="0"')}

      ${G("e-escalation vls-w12-motion",
        O(170,153,35,C.paper,
          `stroke="${C.orange}" stroke-width="3"`)+
        arrow(170,153,C.orange)+
        T(170,203,"ESCALATE",11,C.navy),
        'opacity="0"')}

      ${G("e-fix vls-w12-motion",
        O(170,250,25,C.green)+
        check(170,250,C.paper),
        'opacity="0"')}

      ${G("e-six vls-w12-motion",
        [0,1,2,3,4,5].map(j=>
          O(65+j*42,351,10,C.blue,
            `class="e-week-${j}"`)
        ).join(""))}

      ${G("e-feedback vls-w12-motion",
        P("M244 190 Q291 162 281 126",C.green,3)+
        O(281,126,12,C.green),
        'opacity="0"')}
    `;

    register("W12O2b",{
      title:"SUPPORT WHERE WORK HAPPENS",
      beats:8,
      labels:[
        "A real guest arrives",
        "Corporate exception",
        "Training meets reality",
        "Frontline assistance",
        "Authorised escalation",
        "Daily correction",
        "Visible feedback",
        "Six weeks of support"
      ],
      art,
      render(a,s) {
        const b=s.beat;

        a.transform(".e-guest",
          `translateX(${Math.min(48,s.p*85)}px)`);

        a.opacity(".e-error",b>=1&&b<=4?1:0);
        a.opacity(".e-support",b>=3?1:0);
        a.opacity(".e-bridge",b>=3?1:0);
        a.draw(".e-bridge path",b>=3);

        a.opacity(".e-escalation",b===4?1:0);
        a.opacity(".e-fix",b>=5?1:0);
        a.opacity(".e-feedback",b>=6?1:0);

        for(let j=0;j<6;j++){
          a.attribute(
            `.e-week-${j}`,
            "fill",
            j<=Math.floor(s.p*6)?C.green:C.blue
          );
        }

        a.transform(".e-fix",
          `scale(${1+(s.i%4)*.06})`);
      }
    });
  }

  // ============================================================
  // SCENE 6 · W12O2c
  // THE SIXTY-FIVE PERCENT CEILING
  //
  // Metaphor:
  // A physical stream of arriving guests divides between
  // a fast kiosk channel and a slower assisted channel.
  //
  // A rising adoption gauge reaches a visible ceiling.
  // A diagnostic lens reveals the unresolved corporate cases.
  // ============================================================

  {
    const art=`
      ${P("M170 327 V276",C.navy,4)}

      ${P("M170 276 Q110 248 88 197",C.green,6)}
      ${P("M170 276 Q230 248 252 197",C.orange,6)}

      ${G("f-kiosk",kiosk(88,146,.78))}

      ${G("f-desk",
        R(212,163,80,15,C.orange,4)+
        R(221,178,62,34,C.navy,4)+
        person(252,150,C.orange,.7))}

      ${G("f-guests vls-w12-motion",
        Array.from({length:10},(_,j)=>{
          const x=118+(j%5)*25;
          const y=315+Math.floor(j/5)*22;
          return O(x,y,6,j<7?C.green:C.orange);
        }).join(""))}

      ${G("f-gauge vls-w12-motion",
        O(170,118,69,C.paper,
          `stroke="${C.blue}" stroke-width="13"`)+
        O(170,118,69,"none",
          `stroke="${C.green}" stroke-width="13"
           stroke-dasharray="433"
           stroke-dashoffset="433"
           transform="rotate(-90 170 118)"
           class="f-gauge-arc"`)+
        T(170,127,"65%",32,C.navy)+
        T(170,149,"ADOPTION",11,C.navy))}

      ${G("f-ceiling vls-w12-motion",
        P("M98 58 H242",C.orange,5)+
        T(170,46,"PLATEAU",12,C.orange),
        'opacity="0"')}

      ${G("f-lens vls-w12-motion",
        O(252,206,40,C.paper,
          `stroke="${C.orange}" stroke-width="3"`)+
        T(252,212,"?",32,C.orange)+
        P("M278 234 L303 261",C.orange,8),
        'opacity="0"')}

      ${G("f-times vls-w12-motion",
        T(88,244,"2 MIN",13,C.green)+
        T(252,244,"9 MIN",13,C.orange),
        'opacity="0"')}

      ${G("f-satisfaction vls-w12-motion",
        P("M92 364 L248 364",C.green,4)+
        O(92,364,7,C.orange)+
        O(248,364,9,C.green)+
        T(170,385,"6.8 TO 7.9",12,C.green),
        'opacity="0"')}
    `;

    register("W12O2c",{
      title:"THE ADOPTION CEILING",
      beats:8,
      labels:[
        "Pilot adoption rises",
        "Eleven weeks later",
        "The sixty-five plateau",
        "Residual arrivals",
        "Corporate exceptions",
        "Two service speeds",
        "Different performance signals",
        "Investigate the cause"
      ],
      art,
      render(a,s) {
        const b=s.beat;

        const rate=b>=2?65:
          Math.round(22+43*Math.min(1,s.p*4));

        const gauge=a.find(".f-gauge text");
        if(gauge)gauge.textContent=rate+"%";

        a.attribute(
          ".f-gauge-arc",
          "stroke-dashoffset",
          433*(1-rate/100)
        );

        a.opacity(".f-ceiling",b>=2?1:0);
        a.opacity(".f-lens",b>=4?1:0);
        a.opacity(".f-times",b>=5?1:0);
        a.opacity(".f-satisfaction",b>=6?1:0);

        a.transform(".f-lens",
          `translate(${(s.i%4)*3}px,${(s.i%3)*-3}px)`);

        a.transform(".f-guests",
          `translateY(${-Math.min(18,s.p*30)}px)`);

        a.transform(".f-ceiling",
          `translateY(${b>=2?(s.i%3)*2:0}px)`);

        a.opacity(".f-satisfaction",b===7?.55:b===6?1:0);
      }
    });
  }

  // ============================================================
  // SCENE 7 · W12O1d
  // THE PILOT ARCHIPELAGO
  //
  // Metaphor:
  // Two illuminated pilot islands send learning signals toward
  // a larger, varied group of properties.
  //
  // A heritage building physically rejects a kiosk footprint.
  // The scene distinguishes approved variants from uncontrolled
  // local redesign.
  //
  // Motion:
  // Expanding learning waves, travelling signals, lighthouse
  // rotation, architectural transformation and site scanning.
  // ============================================================

  {
    const sites=[
      {x:75,y:104,type:"pilot"},
      {x:151,y:82,type:"pilot"},
      {x:265,y:112,type:"standard"},
      {x:285,y:206,type:"heritage"},
      {x:220,y:291,type:"peak"},
      {x:101,y:292,type:"standard"},
      {x:54,y:205,type:"heritage"}
    ];

    const art=`
      <defs>
        <radialGradient id="w12g-sea">
          <stop offset="0" stop-color="${C.blue}"
            stop-opacity=".7"/>
          <stop offset="1" stop-color="${C.paper}"
            stop-opacity="0"/>
        </radialGradient>
      </defs>

      ${O(170,194,162,"url(#w12g-sea)")}

      ${[0,1,2].map(j=>
        O(112,125,58+j*36,"none",
          `stroke="${C.green}" stroke-width="1.5"
           stroke-dasharray="5 9" opacity=".24"
           class="g-wave g-wave-${j} vls-w12-motion"`)
      ).join("")}

      ${sites.map((site,j)=>`
        ${G(`g-island g-island-${j} vls-w12-motion`,
          `<ellipse cx="${site.x}" cy="${site.y+34}"
             rx="38" ry="15" fill="${C.blue}" opacity=".55"/>
           ${hotel(site.x-25,site.y-21,50,58,
             site.type==="pilot"?C.green:
             site.type==="heritage"?C.orange:C.navy)}
           ${site.type==="pilot"?
             O(site.x+25,site.y-23,8,C.green):""}
          `
        )}
      `).join("")}

      ${G("g-lighthouse vls-w12-motion",
        P("M113 147 V91",C.navy,6)+
        R(103,80,20,15,C.orange,3)+
        P("M113 80 L97 68 H129 Z",C.orange,2)+
        O(113,85,5,C.paper))}

      ${G("g-beam vls-w12-motion",
        `<path d="M113 85 L298 30 L298 143Z"
           fill="${C.gold}" opacity=".15"/>`)}

      ${G("g-signal vls-w12-motion",
        O(113,85,10,C.green)+
        O(113,85,19,"none",
          `stroke="${C.green}" stroke-width="2"
           class="vls-w12-pulse"`))}

      ${G("g-heritage vls-w12-motion",
        `<path d="M239 188 L285 163 L331 188"
           fill="none" stroke="${C.orange}" stroke-width="5"/>
         ${R(251,188,68,65,C.paper,2,
           `stroke="${C.orange}" stroke-width="3"`)}
         ${P("M263 247 V208 Q285 188 307 208 V247",
           C.orange,4)}
         ${T(285,274,"ASSISTED PATH",11,C.orange)}`,
        'opacity="0"')}

      ${G("g-kiosk-reject vls-w12-motion",
        kiosk(285,208,.45)+
        cross(285,208,C.orange),
        'opacity="0"')}

      ${G("g-bridge vls-w12-motion",
        P("M155 145 Q215 155 264 188",C.green,4,
          'class="vls-w12-draw"'),
        'opacity="0"')}

      ${G("g-check vls-w12-motion",
        O(170,193,36,C.paper,
          `stroke="${C.green}" stroke-width="3"`)+
        check(170,193,C.green,1.5),
        'opacity="0"')}

      ${T(170,363,"PILOT LEARNING",12,C.navy)}
    `;

    register("W12O1d",{
      title:"THE PILOT IS NOT THE MAP",
      beats:8,
      labels:[
        "Two pilot properties",
        "Learning travels",
        "Conditions differ",
        "Heritage constraints",
        "Approved process variant",
        "Assess each property",
        "Protect later sites",
        "Transfer with evidence"
      ],
      art,

      render(a,s) {
        const b=s.beat;

        for(let j=0;j<sites.length;j++){
          const pilot=j<2;
          const visible=b<2?pilot:true;

          a.opacity(`.g-island-${j}`,
            visible?1:.12);

          a.transform(`.g-island-${j}`,
            `translateY(${visible?0:12}px)
             scale(${visible?1:.8})`);
        }

        a.transform(".g-lighthouse",
          `translateY(${b>=1?-7:0}px)`);

        a.transform(".g-beam",
          `rotate(${b>=1?(s.i%8)*8:0}deg)`);

        a.opacity(".g-beam",b>=1&&b<=6?1:0);

        for(let j=0;j<3;j++){
          a.transform(`.g-wave-${j}`,
            `scale(${1+(s.i%5)*.045+j*.035})`);
        }

        a.opacity(".g-kiosk-reject",
          b===3?1:0);

        a.opacity(".g-heritage",
          b>=4&&b<=6?1:0);

        a.opacity(".g-bridge",
          b>=5?1:0);

        a.draw(".g-bridge .vls-w12-draw",
          b>=5);

        a.opacity(".g-check",b===7?1:0);

        a.transform(".g-check",
          `scale(${b===7?1+(s.i%3)*.05:.7})`);

        a.opacity(".g-signal",
          b>=1&&b<=6?1:.35);
      }
    });
  }

  // ============================================================
  // SCENE 8 · W12O1e
  // THE FOURTEEN-PROPERTY ROLLOUT
  //
  // Metaphor:
  // Fourteen miniature hotels occupy a cinematic rollout
  // landscape. Two pilot properties glow at the beginning.
  //
  // Five standard properties, three heritage properties and
  // four peak-occupancy properties become visibly different
  // deployment challenges.
  //
  // A moving deployment train follows an eight-week track.
  // A separate three-week buffer protects the January gate.
  //
  // No deployment order is presented as an approved decision.
  // ============================================================

  {
    const properties=Array.from({length:14},(_,j)=>{
      const col=j%7;
      const row=Math.floor(j/7);
      return {
        x:31+col*46,
        y:112+row*91,
        group:j<2?"pilot":
              j<7?"standard":
              j<10?"heritage":"peak"
      };
    });

    const art=`
      <defs>
        <linearGradient id="w12h-track" x1="0" x2="1">
          <stop stop-color="${C.navy}"/>
          <stop offset=".72" stop-color="${C.green}"/>
          <stop offset="1" stop-color="${C.orange}"/>
        </linearGradient>
      </defs>

      ${properties.map((p,j)=>`
        ${G(`h-property h-property-${j} vls-w12-motion`,
          R(p.x-16,p.y-25,32,49,C.paper,3,
            `stroke="${
              p.group==="pilot"?C.green:
              p.group==="heritage"?C.orange:
              p.group==="peak"?C.orange:C.navy
            }" stroke-width="2.5"`)+
          R(p.x-9,p.y-16,7,8,C.blue,1)+
          R(p.x+3,p.y-16,7,8,C.blue,1)+
          R(p.x-9,p.y-3,7,8,C.blue,1)+
          R(p.x+3,p.y-3,7,8,C.blue,1)+
          R(p.x-4,p.y+12,8,12,C.navy,1)+
          O(p.x+13,p.y-20,4,
            p.group==="pilot"?C.green:
            p.group==="peak"?C.orange:C.blue)
        )}
      `).join("")}

      ${G("h-pilot-ring vls-w12-motion",
        O(54,112,47,"none",
          `stroke="${C.green}" stroke-width="3"
           stroke-dasharray="6 5"`),
        'opacity="0"')}

      ${G("h-standard-ring vls-w12-motion",
        `<rect x="118" y="63" width="208" height="98"
           rx="19" fill="none" stroke="${C.green}"
           stroke-width="3" stroke-dasharray="7 6"/>`,
        'opacity="0"')}

      ${G("h-heritage-ring vls-w12-motion",
        `<rect x="15" y="168" width="145" height="90"
           rx="18" fill="none" stroke="${C.orange}"
           stroke-width="3" stroke-dasharray="7 6"/>`,
        'opacity="0"')}

      ${G("h-peak-ring vls-w12-motion",
        `<rect x="165" y="168" width="165" height="90"
           rx="18" fill="none" stroke="${C.orange}"
           stroke-width="3" stroke-dasharray="7 6"/>`,
        'opacity="0"')}

      ${G("h-track",
        P("M24 297 H316",C.blue,15)+
        P("M24 297 H236",
          "url(#w12h-track)",7)+
        P("M236 297 H316",C.orange,5,
          'stroke-dasharray="5 7"'))}

      ${G("h-train vls-w12-motion",
        R(-24,-17,48,27,C.navy,7)+
        R(-15,-11,14,10,C.blue,2)+
        R(5,-11,13,10,C.blue,2)+
        O(-12,13,6,C.ink)+
        O(13,13,6,C.ink))}

      ${G("h-deadline",
        P("M316 274 V338",C.orange,4)+
        T(295,355,"JANUARY",11,C.orange))}

      ${G("h-buffer vls-w12-motion",
        P("M236 319 H316",C.orange,5)+
        T(276,338,"3-WEEK BUFFER",10,C.orange),
        'opacity="0"')}

      ${G("h-failure vls-w12-motion",
        O(236,297,25,C.orange)+
        T(236,305,"!",29,C.paper),
        'opacity="0"')}

      ${G("h-protect vls-w12-motion",
        P("M188 180 L220 164 L252 180 V210 Q252 239 220 253 Q188 239 188 210Z",
          C.green,4)+
        check(220,205,C.green,1.3),
        'opacity="0"')}

      ${T(170,45,"14 PROPERTIES",16,C.navy)}
    `;

    register("W12O1e",{
      title:"ONE JANUARY DEADLINE",
      beats:9,
      labels:[
        "Fourteen properties",
        "Two already piloted",
        "Five standard layouts",
        "Three heritage variants",
        "Four peak properties",
        "Protect busy operations",
        "Eight-week proposal",
        "Three-week buffer",
        "What if week eight fails?"
      ],
      art,

      render(a,s) {
        const b=s.beat;

        const activeGroup=
          b===1?"pilot":
          b===2?"standard":
          b===3?"heritage":
          b===4||b===5?"peak":null;

        properties.forEach((p,j)=>{
          const selected=!activeGroup||
            p.group===activeGroup;

          a.opacity(`.h-property-${j}`,
            selected?1:.22);

          a.transform(`.h-property-${j}`,
            `translateY(${selected?-(s.i%3)*2:5}px)
             scale(${selected?1.06:.9})`);
        });

        a.opacity(".h-pilot-ring",b===1?1:0);
        a.opacity(".h-standard-ring",b===2?1:0);
        a.opacity(".h-heritage-ring",b===3?1:0);
        a.opacity(".h-peak-ring",
          b===4||b===5?1:0);

        a.opacity(".h-protect",b===5?1:0);
        a.opacity(".h-buffer",b>=7?1:0);
        a.opacity(".h-failure",b===8?1:0);

        const train=a.find(".h-train");
        if(train){
          const x=24+212*Math.min(1,s.p*1.3);
          train.setAttribute(
            "transform",
            `translate(${x} 297)`
          );
        }

        a.transform(".h-failure",
          `scale(${1+(s.i%4)*.06})`);

        a.opacity(".h-track",
          b>=6?1:.45);
      }
    });
  }

  // ============================================================
  // SCENE 9 · W12O3a
  // THE GO-LIVE READINESS GATE
  //
  // Metaphor:
  // A substantial physical gate blocks an approaching guest
  // service vehicle.
  //
  // Technical readiness alone cannot open it.
  // Operational capability, support, evidence and authority
  // must align before the gate can rise.
  //
  // Waivers are shown as explicit authorised exceptions,
  // not as automatic approval.
  // ============================================================

  {
    const art=`
      ${P("M15 310 H325",C.blue,4)}

      ${G("i-gate-frame",
        R(78,87,184,210,C.paper,13,
          `stroke="${C.navy}" stroke-width="9"`)+
        R(91,100,158,182,C.blue,6))}

      ${G("i-gate vls-w12-motion",
        R(101,109,138,170,C.navy,7)+
        [0,1,2,3].map(j=>
          P(`M112 ${132+j*35} H228`,
            C.blue,3)
        ).join("")+
        O(170,194,27,C.orange)+
        T(170,203,"STOP",16,C.paper))}

      ${G("i-vehicle vls-w12-motion",
        R(5,278,59,27,C.green,7)+
        R(15,270,32,15,C.blue,4)+
        O(18,309,7,C.ink)+
        O(51,309,7,C.ink))}

      ${G("i-technical vls-w12-motion",
        O(55,124,25,C.paper,
          `stroke="${C.navy}" stroke-width="3"`)+
        gear(55,124,12,C.navy),
        'opacity="0"')}

      ${G("i-people vls-w12-motion",
        O(286,124,25,C.paper,
          `stroke="${C.green}" stroke-width="3"`)+
        person(286,133,C.green,.6),
        'opacity="0"')}

      ${G("i-support vls-w12-motion",
        O(55,242,25,C.paper,
          `stroke="${C.orange}" stroke-width="3"`)+
        P("M43 242 Q55 226 67 242 M43 242 V252 M67 242 V252",
          C.orange,3),
        'opacity="0"')}

      ${G("i-authority vls-w12-motion",
        O(286,242,25,C.paper,
          `stroke="${C.navy}" stroke-width="3"`)+
        check(286,242,C.navy,.85),
        'opacity="0"')}

      ${G("i-beams vls-w12-motion",
        P("M80 124 L111 158 M260 124 L229 158 M80 242 L111 220 M260 242 L229 220",
          C.green,3),
        'opacity="0"')}

      ${G("i-waiver vls-w12-motion",
        R(122,320,96,29,C.paper,8,
          `stroke="${C.orange}" stroke-width="2"`)+
        T(170,340,"WAIVER",12,C.orange),
        'opacity="0"')}

      ${G("i-open vls-w12-motion",
        O(170,194,31,C.green)+
        check(170,194,C.paper,1.3),
        'opacity="0"')}
    `;

    register("W12O3a",{
      title:"THE GO-LIVE GATE",
      beats:9,
      labels:[
        "A date is not approval",
        "Technical readiness",
        "Operational capability",
        "Practical support",
        "Predefined evidence",
        "Named authority",
        "Document any waiver",
        "Assess the exposure",
        "Go or no-go"
      ],
      art,

      render(a,s) {
        const b=s.beat;

        a.opacity(".i-technical",b>=1?1:0);
        a.opacity(".i-people",b>=2?1:0);
        a.opacity(".i-support",b>=3?1:0);
        a.opacity(".i-authority",b>=5?1:0);

        a.opacity(".i-beams",b>=4?1:0);
        a.opacity(".i-waiver",b===6?1:0);

        const open=b===8;

        a.transform(".i-gate",
          `translateY(${open?-157:0}px)`);

        a.opacity(".i-open",open?1:0);

        a.transform(".i-vehicle",
          `translateX(${open?190:
            Math.min(70,s.p*90)}px)`);

        a.transform(".i-waiver",
          `rotate(${b===6?(s.i%3-1)*5:0}deg)`);

        a.opacity(".i-gate-frame",1);
      }
    });
  }

  // ============================================================
  // SCENE 10 · W12O3b
  // THE ELEVEN-HOUR ROLLBACK
  //
  // Metaphor:
  // A reversible railway switch is tested under limited
  // conditions, then confronted with live transaction traffic.
  //
  // The eleven-hour clock represents the reported Marina
  // rehearsal only. It is not a guaranteed recovery duration.
  //
  // Stop rollout and rollback are separate physical routes.
  // ============================================================

  {
    const art=`
      ${G("j-clock vls-w12-motion",
        clock(170,112,70)+
        T(170,202,"11 HOURS",15,C.navy))}

      ${G("j-rehearsal vls-w12-motion",
        R(112,222,116,33,C.blue,10)+
        T(170,244,"MARINA TEST",12,C.navy))}

      ${G("j-live vls-w12-motion",
        R(88,270,164,30,C.paper,9,
          `stroke="${C.orange}" stroke-width="2"`)+
        T(170,290,"LIVE BOOKINGS",12,C.orange),
        'opacity="0"')}

      ${G("j-track",
        P("M22 346 H142 Q170 346 190 324 L311 253",C.navy,5)+
        P("M142 346 Q190 346 230 346 H318",
          C.orange,5))}

      ${G("j-switch vls-w12-motion",
        O(143,346,11,C.paper,
          `stroke="${C.navy}" stroke-width="3"`)+
        P("M143 346 L169 328",C.green,4))}

      ${G("j-train vls-w12-motion",
        R(-19,-13,38,24,C.navy,5)+
        O(-10,13,6,C.ink)+
        O(10,13,6,C.ink))}

      ${G("j-stop vls-w12-motion",
        O(268,346,25,C.orange)+
        T(268,353,"STOP",12,C.paper),
        'opacity="0"')}

      ${G("j-rollback vls-w12-motion",
        P("M270 278 L248 291 L256 266",C.green,5)+
        T(277,237,"ROLLBACK",12,C.green),
        'opacity="0"')}

      ${G("j-records vls-w12-motion",
        [0,1,2].map(j=>
          R(39+j*15,167+j*9,36,43,C.paper,3,
            `stroke="${C.orange}" stroke-width="2"`)
        ).join(""),
        'opacity="0"')}

      ${G("j-warning vls-w12-motion",
        O(170,112,86,"none",
          `stroke="${C.orange}" stroke-width="4"
           stroke-dasharray="7 8"`),
        'opacity="0"')}
    `;

    register("W12O3b",{
      title:"ELEVEN HOURS BACKWARDS",
      beats:9,
      labels:[
        "A late failure",
        "One Marina rehearsal",
        "Eleven observed hours",
        "Live bookings untested",
        "Protect transaction records",
        "Define numerical triggers",
        "Stop further rollout",
        "Check rollback feasibility",
        "Recover and verify"
      ],
      art,

      render(a,s) {
        const b=s.beat;

        a.opacity(".j-live",b>=3?1:0);
        a.opacity(".j-records",b>=4?1:0);
        a.opacity(".j-warning",b>=3&&b<=5?1:0);

        a.opacity(".j-stop",b===6?1:0);
        a.opacity(".j-rollback",b>=7?1:0);

        const clockGroup=a.find(".j-clock");
        if(clockGroup){
          clockGroup.style.transform=
            `rotate(${(s.i%7-3)*1.5}deg)`;
        }

        const train=a.find(".j-train");
        if(train){
          const x=b<6?22+Math.min(115,s.p*170):
            b===6?220:
            b===7?245:286;

          const y=b<7?346:
            b===7?304:268;

          train.setAttribute(
            "transform",
            `translate(${x} ${y})`
          );
        }

        a.transform(".j-switch",
          `rotate(${b>=7?-32:0}deg)`);

        a.transform(".j-warning",
          `rotate(${(s.i%8)*5}deg)`);

        a.opacity(".j-rehearsal",
          b>=3?.4:1);
      }
    });
  }

  // ============================================================
  // SCENE 11 · W12O3c
  // THE OPERATIONAL HANDOVER
  //
  // Metaphor:
  // A project vessel transfers five essential operating
  // mechanisms to a permanent operations vessel.
  //
  // The receiving vessel cannot sail until the five conditions
  // are secured:
  // 1. Active process owner
  // 2. Reviewed end-to-end measure
  // 3. Controlled exceptions
  // 4. Operations-owned procedures
  // 5. Assigned defects and dates
  //
  // This is a physical transfer, not a checklist card.
  // ============================================================

  {
    const cargo=[
      {x:83,y:147,label:"OWNER",color:C.navy},
      {x:143,y:147,label:"MEASURE",color:C.green},
      {x:203,y:147,label:"EXCEPTIONS",color:C.orange},
      {x:113,y:207,label:"PROCEDURES",color:C.navy},
      {x:183,y:207,label:"DEFECTS",color:C.orange}
    ];

    const art=`
      <defs>
        <linearGradient id="w12k-water" x1="0" y1="0"
          x2="0" y2="1">
          <stop stop-color="${C.blue}" stop-opacity=".55"/>
          <stop offset="1" stop-color="${C.paper}"
            stop-opacity=".1"/>
        </linearGradient>
      </defs>

      ${R(10,274,320,88,
        "url(#w12k-water)",12)}

      ${P("M10 274 Q40 264 70 274 T130 274 T190 274 T250 274 T330 274",
        C.navy,2)}

      ${G("k-project vls-w12-motion",
        `<path d="M21 236 H152 L132 276 H43Z"
           fill="${C.navy}"/>
         ${R(49,205,76,32,C.blue,4)}
         ${P("M86 205 V174",C.navy,4)}
         ${T(86,229,"PROJECT",12,C.navy)}`)}

      ${G("k-operations vls-w12-motion",
        `<path d="M184 236 H319 L296 276 H205Z"
           fill="${C.green}"/>
         ${R(212,205,78,32,C.blue,4)}
         ${P("M251 205 V174",C.green,4)}
         ${T(251,229,"OPERATIONS",11,C.navy)}`)}

      ${G("k-crane vls-w12-motion",
        P("M170 58 V143 M170 58 H251",C.navy,5)+
        P("M251 58 V89",C.navy,3)+
        P("M237 89 H265",C.orange,4))}

      ${cargo.map((p,j)=>`
        ${G(`k-cargo k-cargo-${j} vls-w12-motion`,
          O(p.x,p.y,24,C.paper,
            `stroke="${p.color}" stroke-width="3"`)+
          O(p.x,p.y,10,p.color)+
          T(p.x,p.y+38,p.label,
            p.label.length>9?9:10,p.color)
        )}
      `).join("")}

      ${G("k-transfer vls-w12-motion",
        P("M145 184 Q170 151 198 184",C.green,4,
          'class="vls-w12-draw"'),
        'opacity="0"')}

      ${G("k-anchor vls-w12-motion",
        P("M251 278 V322 M237 308 Q251 335 265 308 M239 309 H263",C.green,5),
        'opacity="0"')}

      ${G("k-departure vls-w12-motion",
        P("M49 342 L91 342",C.orange,4)+
        arrow(91,342,C.orange),
        'opacity="0"')}

      ${G("k-value vls-w12-motion",
        O(251,126,40,C.paper,
          `stroke="${C.green}" stroke-width="3"`)+
        check(251,126,C.green,1.3),
        'opacity="0"')}
    `;

    register("W12O3c",{
      title:"WHEN THE PROJECT LEAVES",
      beats:9,
      labels:[
        "Project work finishes",
        "An active owner",
        "Reviewed performance",
        "Controlled exceptions",
        "Owned procedures",
        "Assigned defects",
        "Transfer responsibility",
        "Operations takes control",
        "Ready for value"
      ],
      art,

      render(a,s) {
        const b=s.beat;

        cargo.forEach((p,j)=>{
          const active=b>=j+1;

          const dx=active?115:0;
          const dy=active?50:0;

          a.transform(`.k-cargo-${j}`,
            `translate(${dx}px,${dy}px)
             scale(${active?1:.86})`);

          a.opacity(`.k-cargo-${j}`,
            active?1:.4);
        });

        a.opacity(".k-transfer",b>=6?1:0);
        a.draw(".k-transfer path",b>=6);

        a.opacity(".k-anchor",b>=7?1:0);
        a.opacity(".k-departure",b>=7?1:0);
        a.opacity(".k-value",b===8?1:0);

        a.transform(".k-project",
          `translateX(${b>=7?-24:0}px)`);

        a.transform(".k-operations",
          `translateY(${b>=7?-5:0}px)`);

        a.transform(".k-crane",
          `translateX(${(s.i%5-2)*3}px)`);

        a.transform(".k-value",
          `scale(${1+(s.i%3)*.05})`);
      }
    });
  }

  // ============================================================
  // SCENE 12 · W12O3d
  // THE FINAL STEERING-GROUP DECISION
  //
  // Metaphor:
  // A large command bridge looks across fourteen properties.
  //
  // Multiple moving evidence streams converge on a single
  // physical decision lever.
  //
  // The lever does not claim Qasr has approved a particular
  // rollout. The final image remains conditional.
  //
  // Motion:
  // Evidence illumination, site selection, deadline pressure,
  // recovery warning, readiness gate, adoption support and
  // operational handover.
  //
  // The scene ends by opening a visual route toward Realize
  // Value, rather than falsely declaring benefits achieved.
  // ============================================================

  {
    const nodes=[
      {x:63,y:96,label:"PILOT",color:C.green},
      {x:170,y:69,label:"SITES",color:C.navy},
      {x:277,y:96,label:"DEADLINE",color:C.orange},
      {x:63,y:267,label:"READINESS",color:C.navy},
      {x:277,y:267,label:"RECOVERY",color:C.orange}
    ];

    const art=`
      <defs>
        <radialGradient id="w12l-command">
          <stop stop-color="${C.blue}" stop-opacity=".85"/>
          <stop offset="1" stop-color="${C.paper}"
            stop-opacity="0"/>
        </radialGradient>
      </defs>

      ${O(170,186,150,"url(#w12l-command)")}

      ${nodes.map((p,j)=>`
        ${G(`l-node l-node-${j} vls-w12-motion`,
          O(p.x,p.y,29,C.paper,
            `stroke="${p.color}" stroke-width="3"`)+
          O(p.x,p.y,12,p.color)+
          T(p.x,p.y+43,p.label,10,p.color)
        )}
      `).join("")}

      ${nodes.map((p,j)=>`
        ${G(`l-ray l-ray-${j} vls-w12-motion`,
          P(`M${p.x} ${p.y} L170 188`,
            p.color,3,
            'class="vls-w12-draw"')
        )}
      `).join("")}

      ${G("l-command vls-w12-motion",
        O(170,188,67,C.paper,
          `stroke="${C.navy}" stroke-width="4"`)+
        O(170,188,52,C.blue)+
        T(170,182,"GO",21,C.navy)+
        T(170,207,"OR STOP",15,C.orange))}

      ${G("l-lever vls-w12-motion",
        P("M170 188 L170 137",C.navy,8)+
        O(170,132,13,C.orange))}

      ${G("l-pilot vls-w12-motion",
        T(63,103,"65%",17,C.paper),
        'opacity="0"')}

      ${G("l-sites vls-w12-motion",
        T(170,76,"12",20,C.paper),
        'opacity="0"')}

      ${G("l-deadline vls-w12-motion",
        T(277,103,"JAN",14,C.paper),
        'opacity="0"')}

      ${G("l-readiness vls-w12-motion",
        check(63,267,C.paper,.8),
        'opacity="0"')}

      ${G("l-recovery vls-w12-motion",
        T(277,274,"11h",16,C.paper),
        'opacity="0"')}

      ${G("l-stop vls-w12-motion",
        O(170,188,77,"none",
          `stroke="${C.orange}" stroke-width="5"
           stroke-dasharray="10 8"`),
        'opacity="0"')}

      ${G("l-support vls-w12-motion",
        person(100,321,C.green,.75)+
        person(240,321,C.navy,.75)+
        P("M119 321 Q170 290 221 321",C.green,3),
        'opacity="0"')}

      ${G("l-handover vls-w12-motion",
        P("M111 343 H229",C.green,5)+
        arrow(229,343,C.green)+
        T(170,365,"OPERATIONS",12,C.green),
        'opacity="0"')}

      ${G("l-next vls-w12-motion",
        O(170,188,78,"none",
          `stroke="${C.green}" stroke-width="5"`)+
        check(170,188,C.green,2)+
        T(170,302,"REALIZE VALUE",14,C.green),
        'opacity="0"')}

      ${G("l-question vls-w12-motion",
        O(170,188,26,C.paper,
          `stroke="${C.orange}" stroke-width="3"`)+
        T(170,198,"?",30,C.orange),
        'opacity="0"')}

      ${G("l-final-beam vls-w12-motion",
        `<path d="M170 188 L89 24 H251Z"
           fill="${C.green}" opacity=".12"/>`,
        'opacity="0"')}
    `;

    register("W12O3d",{
      title:"ONE DEFENSIBLE DECISION",
      beats:12,
      labels:[
        "The steering group",
        "Pilot evidence",
        "Twelve remaining sites",
        "January deadline",
        "Corporate exceptions",
        "Protect peak operations",
        "Test the buffer",
        "Readiness before go-live",
        "Stop or rollback",
        "Support employee adoption",
        "Transfer to operations",
        "Defend your recommendation"
      ],
      art,

      render(a,s) {
        const b=s.beat;

        const selected=
          b===1||b===4?0:
          b===2||b===5?1:
          b===3||b===6?2:
          b===7?3:
          b===8?4:-1;

        for(let j=0;j<nodes.length;j++){
          const active=selected===j;

          a.opacity(`.l-node-${j}`,
            selected<0?.85:active?1:.28);

          a.transform(`.l-node-${j}`,
            `scale(${active?1.16:1})`);

          a.draw(`.l-ray-${j} path`,
            active||b>=9);
        }

        a.opacity(".l-pilot",
          b===1||b===4?1:0);

        a.opacity(".l-sites",
          b===2||b===5?1:0);

        a.opacity(".l-deadline",
          b===3||b===6?1:0);

        a.opacity(".l-readiness",b===7?1:0);
        a.opacity(".l-recovery",b===8?1:0);

        a.opacity(".l-stop",b===8?1:0);
        a.opacity(".l-support",b===9?1:0);
        a.opacity(".l-handover",b===10?1:0);

        a.opacity(".l-next",b===11?1:0);
        a.opacity(".l-question",b===11?1:0);
        a.opacity(".l-final-beam",b===11?1:0);

        const angles=[
          -28,-18,-8,12,24,-18,30,0,43,-8,0,0
        ];

        a.transform(".l-lever",
          `rotate(${angles[b]+(s.i%3-1)*2}deg)`);

        a.transform(".l-command",
          `scale(${b===11?1.08:1})`);

        a.opacity(".l-command",
          b===11?.25:1);

        a.transform(".l-question",
          `scale(${1+(s.i%4)*.06})`);

        a.transform(".l-final-beam",
          `scale(${1+(s.i%3)*.035})`);
      }
    });
  }

  // ============================================================
  // WEEK 12 REGISTRATION COMPLETE
  //
  // Registered sections:
  //
  // W12O1a  The Lobby Comes Alive
  // W12O1b  Four Rollout Machines
  // W12O1c  The Constraint Compass
  //
  // W12O2a  The Performance Valley
  // W12O2b  The Frontline Rescue
  // W12O2c  The Adoption Ceiling
  //
  // W12O1d  The Pilot Archipelago
  // W12O1e  The Fourteen-Property Rollout
  // W12O3a  The Go-Live Readiness Gate
  //
  // W12O3b  The Eleven-Hour Rollback
  // W12O3c  The Operational Handover
  // W12O3d  The Final Steering-Group Decision
  //
  // Each scene:
  // - builds once per mount
  // - responds to narration moment index i
  // - supports arbitrary seeking
  // - resets to the opening visual
  // - respects prefers-reduced-motion
  // - uses the Week 10 palette
  // - contains no narration sentence cards
  // - remains responsive at 375px
  //
  // No additional scene-host implementation is included.
  // The existing application host must invoke build, step
  // and reset through window.VL_SCENES.
  // ============================================================

})();
