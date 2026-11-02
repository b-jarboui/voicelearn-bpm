// OPER621 - Week 9 - The Innovate Phase
// Original cinematic scenes, synchronized to narration.
// Concatenate all three parts without adding separators.

(() => {
"use strict";

window.VL_SCENES = window.VL_SCENES || {};

const C = {
  navy:"#1f4e79",
  orange:"#c0502a",
  paper:"#fbf8f1",
  ink:"#1b2a3a",
  blue:"#dbe7f2",
  green:"#317c61"
};

const NS = "http://www.w3.org/2000/svg";
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

const T = (x,y,s,size=12,color=C.ink,extra="") =>
  `<text x="${x}" y="${y}" text-anchor="middle"
    font-size="${size}" fill="${color}" ${extra}>${s}</text>`;

const G = (cls,body,extra="") =>
  `<g class="${cls}" ${extra}>${body}</g>`;

const person = (x,y,color=C.navy,scale=1) =>
  `<g transform="translate(${x} ${y}) scale(${scale})">
    ${O(0,-13,9,color)}
    <path d="M-16 15 Q-16 -2 0 -2 Q16 -2 16 15Z"
      fill="${color}"/>
  </g>`;

const check = (x,y,color=C.green) =>
  P(`M${x-9} ${y} l6 6 14 -17`,color,4);

const arrow = (x,y,color=C.navy) =>
  P(`M${x-8} ${y-6} l9 6 -9 6`,color,3);

const door = (x,y,w=55,h=110) =>
  `<g>
    ${R(x,y,w,h,C.navy,5)}
    ${R(x+6,y+7,w-12,h-13,C.paper,3)}
    ${O(x+w-15,y+h*.54,3,C.orange)}
  </g>`;

const phone = (x,y,w=55,h=95) =>
  `<g>
    ${R(x,y,w,h,C.navy,10)}
    ${R(x+6,y+9,w-12,h-22,C.paper,5)}
    ${R(x+w*.32,y+4,w*.36,3,C.blue,2)}
    ${O(x+w/2,y+h-7,3,C.blue)}
  </g>`;

const kiosk = (x,y) =>
  `<g>
    ${R(x-30,y-73,60,105,C.navy,12)}
    ${R(x-24,y-65,48,70,C.blue,6)}
    ${R(x-17,y-53,34,7,C.green,3)}
    ${P(`M${x-15} ${y-28} h30 M${x-15} ${y-17} h23`,
      C.navy,2)}
    ${O(x,y-5,4,C.green)}
    ${P(`M${x} ${y+32} v35 M${x-22} ${y+67} h44`,
      C.navy,6)}
  </g>`;

const hotel = (x,y,w=90,h=120) =>
  `<g>
    ${R(x,y,w,h,C.blue,5,`stroke="${C.navy}" stroke-width="2"`)}
    ${R(x+8,y+8,w-16,11,C.navy,2)}
    ${[0,1,2].map(j =>
      [0,1,2].map(k =>
        R(x+12+k*(w-24)/3,y+30+j*25,13,15,
          C.paper,2,`stroke="${C.navy}" stroke-width="1"`)
      ).join("")
    ).join("")}
    ${R(x+w/2-12,y+h-27,24,27,C.navy,3)}
  </g>`;

const gear = (x,y,r,color) => {
  const teeth = Array.from({length:10},(_,j) =>
    `<rect x="${x-5}" y="${y-r-7}" width="10" height="15"
      rx="2" fill="${color}"
      transform="rotate(${j*36} ${x} ${y})"/>`
  ).join("");
  return `<g>${teeth}
    ${O(x,y,r,color)}
    ${O(x,y,r*.62,C.paper)}
    ${O(x,y,r*.23,color)}
  </g>`;
};

const svg = (body,view="0 0 340 390") =>
  `<svg viewBox="${view}" preserveAspectRatio="xMidYMid meet"
    xmlns="${NS}" role="img"
    aria-label="Animated Week 9 process redesign illustration">
    ${body}
  </svg>`;

const $ = (r,s) => r && r.querySelector(s);
const $$ = (r,s) => r ? [...r.querySelectorAll(s)] : [];

function set(r,s,props) {
  $$(r,s).forEach(e => {
    Object.entries(props).forEach(([k,v]) => {
      if(k==="text") e.textContent=String(v);
      else if(k==="attr") {
        Object.entries(v).forEach(([a,b]) =>
          e.setAttribute(a,String(b)));
      } else e.style[k]=String(v);
    });
  });
}

function show(r,s,on) {
  set(r,s,{opacity:on?"1":"0"});
}

function move(r,s,x=0,y=0,scale=1,rotate=0) {
  set(r,s,{
    transform:`translate(${x}px,${y}px) rotate(${rotate}deg) scale(${scale})`
  });
}

function label(r,s) {
  const e=$(r,".vls-w09-status");
  if(e) e.textContent=s;
}

function progress(r,i,n) {
  const e=$(r,".vls-w09-progress");
  if(e) e.style.width=
    `${100*(clamp(i,0,Math.max(0,n-1))+1)/Math.max(1,n)}%`;
}

function mount(el,id,body,title) {
  if(!el) return null;
  const r=document.createElement("div");
  r.className=`vls-w09 vls-w09-${id}`;
  r.innerHTML=`
    <div class="vls-w09-title">${title}</div>
    <div class="vls-w09-art">${svg(body)}</div>
    <div class="vls-w09-footer">
      <span class="vls-w09-status"></span>
    </div>
    <div class="vls-w09-progress"></div>`;
  el.replaceChildren(r);
  return r;
}

// Every narration line has its own visible state.
// The major composition follows the section's conceptual beats.
// Within each beat, a secondary cinematic motion changes at
// EVERY index, including lines whose original moment is null.
//
// State is calculated from the absolute narration index.
// Seeking backwards therefore works without replaying earlier lines.

function register(id,config) {
  let root=null;
  let last=-1;
  let tween=null;

  function stopTween() {
    if(tween && typeof tween.kill==="function") tween.kill();
    tween=null;
  }

  function render(i,n,instant=false) {
    if(!root) return;

    const count=Math.max(1,Math.floor(Number(n)||config.count));
    const index=clamp(Math.floor(Number(i)||0),0,count-1);
    const b=config.cuts.reduce((a,c)=>a+(index>=c?1:0),0);

    stopTween();

    root.classList.toggle(
      "vls-w09-instant",instant||reduced()
    );

    config.render(root,b,index,count);

    // The motion accent deliberately varies on every line,
    // even when the main conceptual beat has not changed.
    const accent=$(root,".vls-w09-accent");
    if(accent) {
      const positions=[
        [-9,-5],[-4,5],[4,-3],[10,4],
        [0,-8],[7,8],[-7,2],[3,0]
      ];
      const p=positions[index%positions.length];
      const rotation=((index*17)%29)-14;
      accent.style.transform=
        `translate(${p[0]}px,${p[1]}px) rotate(${rotation}deg)`;
      accent.style.opacity=String(.36+(index%5)*.13);
    }

    const camera=$(root,".vls-w09-camera");
    if(camera) {
      const z=1+((index%5)-2)*.012;
      const x=((index%7)-3)*1.15;
      const y=((index%3)-1)*1.4;
      camera.style.transform=
        `translate(${x}px,${y}px) scale(${z})`;
    }

    // A moving illumination scans the physical illustration.
    const light=$(root,".vls-w09-light");
    if(light) {
      const x=35+(index*37)%270;
      light.setAttribute("cx",x);
      light.style.opacity=String(.18+(index%4)*.08);
    }

    // Optional GSAP: short, non-looping accent for each moment.
    // Reduced-motion users still receive the changed static state.
    if(!instant && !reduced() &&
       window.gsap && accent) {
      tween=window.gsap.fromTo(accent,
        {opacity:.18},
        {opacity:parseFloat(accent.style.opacity),
         duration:.48,ease:"power2.out",
         overwrite:true});
    }

    progress(root,index,count);
    last=index;
  }

  window.VL_SCENES[id]={
    build(el) {
      stopTween();
      root=mount(el,id,config.body,config.title);
      last=-1;
      if(root) render(0,config.count,true);
    },
    step(i,n) {
      if(!root) return;
      render(i,n);
    },
    reset() {
      stopTween();
      if(!root) return;
      last=-1;
      render(0,config.count,true);
    }
  };
}

// ============================================================
// ONE EMBEDDED STYLESHEET
// All styling remains scoped under the Week 9 scene classes.
// ============================================================

if(!document.getElementById("vl-sc-w09")) {
  const style=document.createElement("style");
  style.id="vl-sc-w09";
  style.textContent=`
.vls-w09{
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
  background:transparent;
  color:var(--ink);
  font-family:inherit;
  box-sizing:border-box;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
}
.vls-w09 *,
.vls-w09 *::before,
.vls-w09 *::after{
  box-sizing:border-box;
}
.vls-w09 .vls-w09-title{
  position:absolute;
  top:2%;
  left:4%;
  right:4%;
  z-index:2;
  text-align:center;
  font-size:11px;
  font-weight:800;
  letter-spacing:1.25px;
  color:var(--navy);
  text-transform:uppercase;
  pointer-events:none;
}
.vls-w09 .vls-w09-art{
  position:relative;
  width:100%;
  height:100%;
  min-height:0;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
}
.vls-w09 .vls-w09-art svg{
  display:block;
  width:100%;
  height:100%;
  max-width:100%;
  max-height:100%;
  overflow:visible;
  flex:0 1 auto;
}
.vls-w09 svg text{
  font-family:inherit;
  font-weight:700;
  letter-spacing:.12px;
}
.vls-w09 .vls-w09-footer{
  position:absolute;
  bottom:2.5%;
  left:5%;
  right:5%;
  z-index:2;
  text-align:center;
  font-size:12px;
  font-weight:750;
  color:var(--navy);
  pointer-events:none;
}
.vls-w09 .vls-w09-progress{
  position:absolute;
  left:0;
  bottom:0;
  height:3px;
  width:0;
  background:var(--orange);
  transition:width .65s ease;
}
.vls-w09 .vls-w09-motion{
  transition:
    transform .88s cubic-bezier(.22,.75,.2,1),
    opacity .7s ease,
    fill .7s ease,
    stroke .7s ease,
    stroke-dashoffset .9s ease;
  transform-box:fill-box;
  transform-origin:center;
}
.vls-w09 .vls-w09-camera{
  transition:transform 1s cubic-bezier(.2,.7,.2,1);
  transform-origin:170px 190px;
}
.vls-w09 .vls-w09-accent{
  transition:transform .65s ease,opacity .55s ease;
  transform-box:fill-box;
  transform-origin:center;
}
.vls-w09 .vls-w09-light{
  transition:cx .8s ease,opacity .7s ease;
}
.vls-w09 .vls-w09-draw{
  stroke-dasharray:420;
  stroke-dashoffset:420;
  transition:stroke-dashoffset 1s ease,opacity .7s ease;
}
.vls-w09 .vls-w09-draw.on{
  stroke-dashoffset:0;
}
.vls-w09 .vls-w09-reveal{
  opacity:0;
  transition:opacity .7s ease,transform .8s ease;
}
.vls-w09 .vls-w09-reveal.on{
  opacity:1;
}
.vls-w09.vls-w09-instant *,
.vls-w09.vls-w09-instant *::before,
.vls-w09.vls-w09-instant *::after{
  transition:none!important;
  animation:none!important;
}
.vls-w09 .vls-w09-float{
  animation:vlsW09Float 3.5s ease-in-out infinite;
}
.vls-w09 .vls-w09-pulse{
  animation:vlsW09Pulse 2.5s ease-in-out infinite;
}
@keyframes vlsW09Float{
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-7px)}
}
@keyframes vlsW09Pulse{
  0%,100%{opacity:.25}
  50%{opacity:.85}
}
@media(max-width:380px){
  .vls-w09 .vls-w09-title{
    font-size:10px;
    letter-spacing:.85px;
  }
  .vls-w09 .vls-w09-footer{
    font-size:11px;
  }
}
@media(prefers-reduced-motion:reduce){
  .vls-w09 *,
  .vls-w09 *::before,
  .vls-w09 *::after{
    animation:none!important;
    transition:none!important;
  }
}
`;
  document.head.appendChild(style);
}

// ============================================================
// SCENE O1a - THE SURGICAL REMOVAL
//
// From Understand to Innovate.
//
// Original cinematic concept:
// A hotel arrival is trapped in a giant mechanical clock.
// The guest moves along a curved journey while an oversized
// approval mechanism interrupts the path.
//
// A precision arm identifies the root cause, extracts the
// unnecessary approval delay, and reconnects the route.
//
// Unlike a flowchart, the cause is a physical obstruction.
//
// 27 narration moments.
// ============================================================

{
const body=`
<defs>
  <radialGradient id="w09a-halo">
    <stop stop-color="#dbe7f2" stop-opacity=".9"/>
    <stop offset="1" stop-color="#fbf8f1" stop-opacity="0"/>
  </radialGradient>
</defs>

${O(170,185,147,"url(#w09a-halo)")}

${G("vls-w09-camera",`
  ${O(170,186,113,"none",
    `stroke="${C.navy}" stroke-width="8" opacity=".14"`)}
  ${O(170,186,99,"none",
    `stroke="${C.blue}" stroke-width="2" stroke-dasharray="4 8"`)}
  ${Array.from({length:12},(_,j)=>{
    const a=j*Math.PI/6;
    const x1=170+102*Math.sin(a);
    const y1=186-102*Math.cos(a);
    const x2=170+111*Math.sin(a);
    const y2=186-111*Math.cos(a);
    return P(`M${x1} ${y1} L${x2} ${y2}`,C.navy,2);
  }).join("")}

  ${G("a-hand vls-w09-motion",`
    ${P("M170 186 L170 104",C.orange,6)}
    ${O(170,186,11,C.navy)}
  `)}

  ${G("a-hotel vls-w09-motion",`
    ${hotel(29,155,78,113)}
    ${T(68,288,"QASR MARINA",10,C.navy)}
  `)}

  ${G("a-room vls-w09-motion",`
    ${door(252,155,54,112)}
    ${T(279,288,"READY ROOM",10,C.green)}
  `)}

  ${P("M108 221 Q170 285 251 220",C.blue,12)}
  ${P("M108 221 Q170 285 251 220",C.navy,2,
    `stroke-dasharray="5 9" opacity=".4"`)}

  ${G("a-guest vls-w09-motion",person(115,229,C.navy,.85))}

  ${G("a-block vls-w09-motion",`
    ${R(142,215,56,43,C.orange,9)}
    ${T(170,234,"47",21,C.paper)}
    ${T(170,248,"MIN",10,C.paper)}
  `)}

  ${G("a-fracture vls-w09-motion",`
    ${P("M139 256 l-14 15 m28 -14 l-9 22",C.orange,4)}
    ${P("M200 256 l14 15 m-28 -14 l9 22",C.orange,4)}
  `,`opacity="0"`)}

  ${G("a-surgery vls-w09-motion",`
    ${P("M260 55 L221 102 L186 178",C.navy,9)}
    ${O(186,178,12,C.blue,
      `stroke="${C.navy}" stroke-width="3"`)}
    ${P("M180 185 l-13 23 m25 -24 l12 24",C.orange,5)}
  `,`opacity="0"`)}

  ${G("a-booking vls-w09-motion",`
    ${R(115,52,110,52,C.paper,9,
      `stroke="${C.green}" stroke-width="3"`)}
    ${T(170,73,"RATE",13,C.navy)}
    ${T(170,90,"CONFIRMED",11,C.green)}
    ${check(211,75,C.green)}
  `,`opacity="0"`)}

  ${G("a-clean vls-w09-motion",`
    ${P("M107 219 Q170 283 251 219",C.green,7)}
    ${O(246,222,10,C.green)}
    ${check(246,223,C.paper)}
  `,`opacity="0"`)}

  ${G("a-value vls-w09-motion",`
    ${T(170,318,"82 MIN BASELINE",15,C.navy)}
    ${T(170,338,"8.1 MIN SERVICE",11,C.green)}
  `,`opacity="0"`)}

  ${G("vls-w09-accent",`
    ${O(170,186,126,"none",
      `stroke="${C.orange}" stroke-width="2"
       stroke-dasharray="5 12"`)}
  `)}
`)}

${O(170,186,4,C.orange,
  `class="vls-w09-light" opacity=".3"`)}
`;

register("O1a",{
  title:"FROM UNDERSTAND TO INNOVATE",
  count:27,
  cuts:[2,4,6,8,10,12,14,16,18,20,22,24,26],
  body,

  render(r,b,i,n){
    const phase=[
      "Investigate the journey",
      "Question existing steps",
      "Find the obstruction",
      "Expose the root cause",
      "Design the future",
      "Symptoms remain",
      "Remove the cause",
      "Move approval earlier",
      "Reconnect the route",
      "Measure the baseline",
      "Protect real service",
      "Focus on the guest",
      "Design, not implement",
      "Choose the ambition"
    ];

    label(r,phase[b]);

    move(r,".a-hand",0,0,1,i*11);
    move(r,".a-guest",
      Math.min(115,i*4.4),
      b<8?0:-7,
      1);

    show(r,".a-block",b<8);
    show(r,".a-fracture",b>=3&&b<8);
    show(r,".a-surgery",b>=4&&b<8);
    show(r,".a-booking",b>=7);
    show(r,".a-clean",b>=8);
    show(r,".a-value",b>=9);

    move(r,".a-surgery",
      b>=6?0:-18,
      b>=6?0:-32,
      1,
      b>=6?-12:0);

    move(r,".a-block",
      b>=6?0:0,
      b>=6?-25:0,
      b>=6?.7:1,
      b>=6?12:0);

    set(r,".a-room",{
      opacity:b>=8?"1":".4"
    });

    set(r,".a-clean",{
      opacity:b>=8?"1":"0"
    });

    set(r,".a-hotel",{
      opacity:b>=11?".5":"1"
    });
  }
});
}

// ============================================================
// SCENE O1b - THREE ARCHITECTURAL FUTURES
//
// Three levels of redesign ambition.
//
// Original cinematic concept:
// Three hotel arrival architectures stand on a rotating
// exhibition platform.
//
// Improvement repairs an existing reception.
// Workflow redesign moves the approval mechanism upstream.
// Radical redesign opens a direct passage to the guest room.
//
// The platform transforms physically between alternatives.
//
// 27 narration moments.
// ============================================================

{
const body=`
<defs>
  <linearGradient id="w09b-floor" x1="0" y1="0" x2="0" y2="1">
    <stop stop-color="#dbe7f2"/>
    <stop offset="1" stop-color="#fbf8f1"/>
  </linearGradient>
</defs>

${P("M18 304 L170 245 L322 304",C.blue,2)}
${P("M18 304 V331 M322 304 V331",C.navy,2)}

${G("b-platform vls-w09-camera",`
  ${R(27,280,286,32,C.blue,15)}
  ${R(37,291,266,12,C.navy,6)}

  ${G("b-improve vls-w09-motion",`
    ${R(43,107,254,163,C.paper,7,
      `stroke="${C.navy}" stroke-width="2"`)}
    ${P("M43 146 H297",C.navy,3)}
    ${R(70,166,200,18,C.orange,5)}
    ${R(86,185,168,56,C.navy,5)}
    ${R(102,195,136,36,C.blue,4)}
    ${person(75,251,C.orange,.8)}
    ${person(260,251,C.navy,.8)}
    ${G("b-scanner vls-w09-motion",`
      ${R(151,190,38,45,C.green,5)}
      ${P("M157 203 H183",C.paper,3)}
      ${P("M157 214 H183",C.paper,3)}
    `)}
  `)}

  ${G("b-workflow vls-w09-motion",`
    ${R(42,114,84,111,C.blue,9,
      `stroke="${C.navy}" stroke-width="2"`)}
    ${T(84,138,"BOOKING",11,C.navy)}
    ${R(59,154,50,43,C.paper,5)}
    ${check(84,176,C.green)}
    ${P("M127 174 H211",C.green,5)}
    ${arrow(209,174,C.green)}
    ${R(214,116,85,110,C.paper,8,
      `stroke="${C.navy}" stroke-width="2"`)}
    ${T(256,141,"ARRIVAL",11,C.navy)}
    ${kiosk(256,188)}
  `,`opacity="0"`)}

  ${G("b-rethink vls-w09-motion",`
    ${hotel(38,101,116,159)}
    ${door(230,126,65,130)}
    ${G("b-phone vls-w09-motion",
      phone(155,150,52,91))}
    ${P("M207 193 Q219 179 228 193",C.green,4)}
    ${P("M207 206 Q221 188 229 205",C.green,3)}
    ${G("b-open vls-w09-motion",`
      ${P("M237 184 l11 11 20 -26",C.green,5)}
    `)}
    ${P("M154 255 Q190 277 229 254",C.green,5)}
  `,`opacity="0"`)}

  ${G("b-risk vls-w09-motion",`
    ${P("M170 52 L197 98 H143Z",C.orange,3)}
    ${T(170,90,"!",24,C.orange)}
  `,`opacity="0"`)}

  ${G("b-gauge vls-w09-motion",`
    ${P("M70 338 Q170 292 270 338",C.navy,3)}
    ${O(170,338,8,C.navy)}
    ${P("M170 338 L106 312",C.orange,5)}
    ${T(73,355,"LOW",11,C.green)}
    ${T(267,355,"HIGH",11,C.orange)}
  `)}

  ${G("vls-w09-accent",`
    ${O(170,196,135,"none",
      `stroke="${C.orange}" stroke-width="2"
       stroke-dasharray="3 10"`)}
  `)}
`)}

${O(170,190,5,C.orange,
  `class="vls-w09-light" opacity=".3"`)}
`;

register("O1b",{
  title:"THREE LEVELS OF AMBITION",
  count:27,
  cuts:[2,4,6,8,10,12,14,16,18,20,22,24],
  body,

  render(r,b,i,n){
    const names=[
      "Choose the ambition",
      "Three possible futures",
      "Repair existing steps",
      "Improve execution",
      "Limited structural gain",
      "Change the workflow",
      "Move approval upstream",
      "Reduce handoffs",
      "Rethink the service",
      "Bypass reception",
      "Higher delivery risk",
      "Match cause to ambition",
      "Design for the guest"
    ];

    label(r,names[b]);

    const mode=b<5?0:b<8?1:2;

    show(r,".b-improve",mode===0);
    show(r,".b-workflow",mode===1);
    show(r,".b-rethink",mode===2);
    show(r,".b-risk",b===10||b===11);

    move(r,".b-platform",
      0,
      mode===1?-4:mode===2?-9:0,
      mode===2?1.04:1);

    move(r,".b-scanner",
      Math.sin(i*.8)*20,
      0,
      1);

    move(r,".b-phone",
      0,
      Math.sin(i*.6)*-8,
      1,
      (i%5-2)*4);

    move(r,".b-gauge",
      0,0,1,
      mode===0?-8:mode===1?0:8);

    set(r,".b-gauge path:last-of-type",{
      transform:`rotate(${mode*52}deg)`
    });

    set(r,".b-workflow",{
      opacity:mode===1?"1":"0"
    });

    set(r,".b-rethink",{
      opacity:mode===2?"1":"0"
    });

    set(r,".b-open",{
      opacity:b>=9?"1":".2"
    });
  }
});
}

// ============================================================
// SCENE O1c - THE LIVING ARRIVAL BLUEPRINT
//
// Designing Qasr's future arrival.
//
// Original cinematic concept:
// A hotel cutaway is assembled as an architectural model.
//
// Booking, revenue, housekeeping, identity verification,
// and the ready room are distinct physical stations.
//
// A luminous guest record travels between them.
// Duplicate paperwork is physically removed.
// Essential verification remains as a controlled gateway.
//
// 30 narration moments.
// ============================================================

{
const body=`
<defs>
  <linearGradient id="w09c-floor" x1="0" y1="0" x2="1" y2="1">
    <stop stop-color="#dbe7f2"/>
    <stop offset="1" stop-color="#fbf8f1"/>
  </linearGradient>
</defs>

${G("vls-w09-camera",`
  ${R(21,76,298,229,"url(#w09c-floor)",14,
    `stroke="${C.navy}" stroke-width="2"`)}
  ${P("M21 154 H319 M21 228 H319",C.navy,2)}
  ${P("M119 76 V305 M220 76 V305",C.navy,2)}

  ${G("c-booking vls-w09-motion",`
    ${R(36,94,67,46,C.paper,6,
      `stroke="${C.navy}" stroke-width="2"`)}
    ${P("M46 106 H92 M46 117 H80",C.navy,2)}
    ${O(90,129,5,C.orange)}
    ${T(70,150,"BOOKING",10,C.navy)}
  `)}

  ${G("c-revenue vls-w09-motion",`
    ${O(170,115,26,C.blue)}
    ${P("M154 116 l11 10 19 -24",C.green,5)}
    ${T(170,150,"RATE",11,C.navy)}
  `)}

  ${G("c-house vls-w09-motion",`
    ${R(239,93,62,49,C.paper,6,
      `stroke="${C.navy}" stroke-width="2"`)}
    ${P("M245 105 H294 M245 118 H294",C.blue,7)}
    ${O(287,130,5,C.green)}
    ${T(270,150,"ROOM READY",10,C.navy)}
  `)}

  ${G("c-kiosk vls-w09-motion",`
    ${kiosk(70,267)}
    ${T(70,325,"VERIFY ID",10,C.navy)}
  `)}

  ${G("c-desk vls-w09-motion",`
    ${R(136,258,70,17,C.orange,4)}
    ${R(142,275,58,27,C.navy,3)}
    ${person(170,248,C.green,.72)}
    ${T(170,325,"HUMAN HELP",10,C.navy)}
  `)}

  ${G("c-room vls-w09-motion",`
    ${door(245,241,49,63)}
    ${T(270,325,"GUEST ROOM",10,C.green)}
  `)}

  ${G("c-network vls-w09-motion",`
    ${P("M70 156 V216 H170 V157",C.green,3)}
    ${P("M170 157 V215 H270 V157",C.green,3)}
    ${P("M270 215 V237",C.green,3)}
    ${P("M70 215 V239",C.green,3)}
    ${P("M70 304 H136 M205 277 H244",C.green,3)}
  `,`opacity="0"`)}

  ${G("c-record vls-w09-motion",`
    ${R(54,169,31,39,C.paper,5,
      `stroke="${C.orange}" stroke-width="2"`)}
    ${P("M61 181 H78 M61 190 H76",C.navy,2)}
    ${O(69,201,3,C.green)}
  `)}

  ${G("c-paper vls-w09-motion",`
    ${R(146,166,50,51,C.paper,3,
      `stroke="${C.orange}" stroke-width="2"`)}
    ${P("M153 180 H189 M153 191 H185 M153 201 H179",
      C.orange,2)}
    ${P("M147 166 L196 217 M196 166 L147 217",
      C.orange,4)}
  `,`opacity="0"`)}

  ${G("c-shield vls-w09-motion",`
    <path d="M170 175 L194 184 V209 Q194 227 170 238 Q146 227 146 209 V184Z"
      fill="${C.paper}" stroke="${C.green}" stroke-width="3"/>
    ${check(170,205,C.green)}
  `,`opacity="0"`)}

  ${G("c-guest vls-w09-motion",
    person(37,288,C.navy,.65))}

  ${G("c-exception vls-w09-motion",`
    ${P("M70 241 Q119 216 170 241",C.orange,4,
      `stroke-dasharray="6 6"`)}
    ${O(170,232,9,C.orange)}
    ${T(170,237,"!",13,C.paper)}
  `,`opacity="0"`)}

  ${G("vls-w09-accent",`
    ${O(170,189,124,"none",
      `stroke="${C.orange}" stroke-width="2"
       stroke-dasharray="3 11"`)}
  `)}
`)}

${O(170,190,5,C.orange,
  `class="vls-w09-light" opacity=".3"`)}
`;

register("O1c",{
  title:"DESIGNING THE FUTURE ARRIVAL",
  count:30,
  cuts:[2,4,6,8,10,12,14,16,18,20,22,24,26,28],
  body,

  render(r,b,i,n){
    const names=[
      "Start with the guest",
      "Define the outcome",
      "Collect details early",
      "One shared record",
      "Connect departments",
      "Verify at arrival",
      "Remove unnecessary work",
      "Question each activity",
      "Reassign responsibility",
      "Move work upstream",
      "Reuse verified data",
      "Preserve essential controls",
      "Complete the blueprint",
      "Design the fallback",
      "Test the proposal"
    ];

    label(r,names[b]);

    const positions=[
      [0,0],[30,0],[65,-4],[110,-52],
      [178,-52],[210,0],[180,50],
      [110,50],[50,70],[0,70]
    ];

    const p=positions[Math.min(positions.length-1,
      Math.floor(i*positions.length/n))];

    move(r,".c-record",p[0],p[1],1,
      (i%4-2)*3);

    show(r,".c-network",b>=4);
    show(r,".c-paper",b>=6&&b<=8);
    show(r,".c-shield",b>=11);
    show(r,".c-exception",b>=13);

    set(r,".c-booking",{
      opacity:b>=2?"1":".35"
    });

    set(r,".c-revenue",{
      opacity:b>=3?"1":".35"
    });

    set(r,".c-house",{
      opacity:b>=4?"1":".35"
    });

    set(r,".c-kiosk",{
      opacity:b>=5?"1":".35"
    });

    set(r,".c-room",{
      opacity:b>=12?"1":".45"
    });

    move(r,".c-guest",
      b<5?0:b<12?35:b<13?125:220,
      b>=12?-2:0,
      1);

    move(r,".c-paper",
      b>=7?15:0,
      b>=7?-17:0,
      b>=7?.75:1,
      b>=7?18:0);

    set(r,".c-network",{
      opacity:b>=4?"1":"0"
    });

    set(r,".c-desk",{
      opacity:b>=13?"1":".5"
    });

    set(r,".c-exception",{
      opacity:b>=13?"1":"0"
    });
  }
});
}

// Continue immediately with PART 2.
// Do not close the outer IIFE until PART 3.
// Continue immediately after PART 1.
// Scenes: O2a, O2b, O2c, O3a.

// ============================================================
// SCENE O2a - THE DECISION OBSERVATORY
//
// Comparing redesign alternatives.
//
// Original cinematic concept:
// Four physical instruments surround a central decision lens.
// Benefit rises as a vertical signal; cost accumulates as
// weighted blocks; risk appears as a storm field; delivery
// time advances on a rotating clock.
//
// The instruments interact to reveal why no single measure
// can determine the preferred redesign.
//
// 27 narration moments.
// ============================================================

{
const body=`
<defs>
  <radialGradient id="w09d-glow">
    <stop stop-color="#dbe7f2" stop-opacity=".85"/>
    <stop offset="1" stop-color="#fbf8f1" stop-opacity="0"/>
  </radialGradient>
</defs>

${O(170,192,145,"url(#w09d-glow)")}

${G("vls-w09-camera",`
  ${O(170,190,103,"none",
    `stroke="${C.navy}" stroke-width="2"
     stroke-dasharray="4 8" opacity=".4"`)}

  ${G("d-benefit vls-w09-motion",`
    ${R(36,86,82,102,C.paper,12,
      `stroke="${C.navy}" stroke-width="2"`)}
    ${R(51,161,15,14,C.blue,2)}
    ${R(72,139,15,36,C.blue,2)}
    ${R(93,112,15,63,C.green,2)}
    ${P("M48 179 H109",C.navy,2)}
    ${T(77,104,"BENEFIT",11,C.navy)}
  `)}

  ${G("d-cost vls-w09-motion",`
    ${R(222,86,82,102,C.paper,12,
      `stroke="${C.navy}" stroke-width="2"`)}
    ${R(238,146,51,16,C.orange,3)}
    ${R(243,130,41,16,C.orange,3)}
    ${R(249,114,29,16,C.orange,3)}
    ${T(263,104,"COST",11,C.navy)}
    ${P("M235 175 H293",C.navy,2)}
  `)}

  ${G("d-risk vls-w09-motion",`
    ${R(36,231,82,96,C.paper,12,
      `stroke="${C.navy}" stroke-width="2"`)}
    ${P("M48 286 Q57 258 68 279 T91 274 T107 281",
      C.orange,4)}
    ${P("M52 251 l10 8 -7 12 15 -4",C.orange,3)}
    ${O(93,259,8,C.orange)}
    ${T(77,313,"RISK",11,C.navy)}
  `)}

  ${G("d-time vls-w09-motion",`
    ${R(222,231,82,96,C.paper,12,
      `stroke="${C.navy}" stroke-width="2"`)}
    ${O(263,275,29,C.blue,
      `stroke="${C.navy}" stroke-width="3"`)}
    ${P("M263 275 V253 M263 275 L282 284",C.orange,4)}
    ${O(263,275,5,C.navy)}
    ${T(263,313,"TIME",11,C.navy)}
  `)}

  ${G("d-core vls-w09-motion",`
    ${O(170,190,62,C.paper,
      `stroke="${C.navy}" stroke-width="4"`)}
    ${O(170,190,48,C.blue)}
    ${P("M147 190 H193",C.navy,4)}
    ${P("M170 166 V214",C.navy,4)}
    ${O(170,190,12,C.orange)}
    ${T(170,245,"DECISION",12,C.navy)}
  `)}

  ${G("d-rays vls-w09-motion",`
    ${P("M122 148 L113 141",C.green,4)}
    ${P("M218 148 L227 141",C.orange,4)}
    ${P("M122 231 L112 241",C.orange,4)}
    ${P("M218 231 L227 241",C.navy,4)}
  `,`opacity="0"`)}

  ${G("d-feasibility vls-w09-motion",`
    ${O(170,190,70,"none",
      `stroke="${C.green}" stroke-width="4"
       stroke-dasharray="8 7"`)}
    ${check(170,190,C.green)}
  `,`opacity="0"`)}

  ${G("d-warning vls-w09-motion",`
    ${P("M170 35 L188 67 H152Z",C.orange,3)}
    ${T(170,60,"!",20,C.orange)}
  `,`opacity="0"`)}

  ${G("vls-w09-accent",`
    ${O(170,190,121,"none",
      `stroke="${C.orange}" stroke-width="2"
       stroke-dasharray="5 12"`)}
  `)}
`)}

${O(170,190,5,C.orange,
  `class="vls-w09-light" opacity=".3"`)}
`;

register("O2a",{
  title:"THE REDESIGN DECISION",
  count:27,
  cuts:[2,4,6,8,10,12,14,16,18,20,22,24],
  body,

  render(r,b,i,n){
    const names=[
      "Two competing futures",
      "Choose with evidence",
      "Estimate the benefit",
      "Benefits are projections",
      "Calculate the cost",
      "Look beyond price",
      "Expose delivery risk",
      "Make uncertainty visible",
      "Consider delivery time",
      "Avoid the quick trap",
      "Test feasibility",
      "Balance the trade-offs",
      "Defend the decision"
    ];

    label(r,names[b]);

    const benefit=b>=2;
    const cost=b>=4;
    const risk=b>=6;
    const time=b>=8;

    set(r,".d-benefit",{
      opacity:benefit?"1":".3"
    });
    set(r,".d-cost",{
      opacity:cost?"1":".3"
    });
    set(r,".d-risk",{
      opacity:risk?"1":".3"
    });
    set(r,".d-time",{
      opacity:time?"1":".3"
    });

    move(r,".d-benefit",
      0,benefit?-5:9,benefit?1.04:.92);

    move(r,".d-cost",
      0,cost?5:-9,cost?1.04:.92);

    move(r,".d-risk",
      risk?0:-9,0,risk?1.04:.92);

    move(r,".d-time",
      time?0:9,0,time?1.04:.92);

    move(r,".d-core",
      0,0,b>=10?1.08:1,
      (i%7-3)*2);

    show(r,".d-rays",b>=10);
    show(r,".d-feasibility",b>=10);
    show(r,".d-warning",b===5||b===7||b===9);

    set(r,".d-time path",{
      transform:`rotate(${i*9}deg)`
    });

    set(r,".d-benefit rect:nth-of-type(3)",{
      fill:b>=3?C.green:C.blue
    });

    set(r,".d-risk path",{
      opacity:b>=6?"1":".3"
    });
  }
});
}

// ============================================================
// SCENE O2b - THE TWO HOTEL FUTURES
//
// Qasr's competing designs.
//
// Original cinematic concept:
// A hotel is divided into two alternative operating worlds.
//
// Design A retains a staffed reception and self-service kiosk.
// Design B creates a direct mobile route to the room.
//
// Two physical journey tracks emerge from the same 82-minute
// baseline. Their modelled endpoints are 44 and 22 minutes.
//
// The illustration also reveals the 74/26 split, the
// implementation schedules, and the January dependency.
//
// 28 narration moments.
// ============================================================

{
const body=`
<defs>
  <linearGradient id="w09e-floor" x1="0" y1="0" x2="0" y2="1">
    <stop stop-color="#dbe7f2" stop-opacity=".7"/>
    <stop offset="1" stop-color="#fbf8f1"/>
  </linearGradient>
</defs>

${G("vls-w09-camera",`
  ${R(16,71,308,257,"url(#w09e-floor)",16,
    `stroke="${C.navy}" stroke-width="2"`)}
  ${P("M170 73 V327",C.navy,2,
    `stroke-dasharray="5 8" opacity=".4"`)}

  ${G("e-a vls-w09-motion",`
    ${R(26,92,134,36,C.navy,8)}
    ${T(93,115,"DESIGN A",15,C.paper)}
    ${R(32,147,122,122,C.paper,9,
      `stroke="${C.navy}" stroke-width="2"`)}
    ${kiosk(92,229)}
    ${person(47,250,C.orange,.65)}
    ${P("M42 279 Q91 302 145 279",C.orange,4)}
    ${T(92,316,"44 MIN",19,C.navy)}
  `)}

  ${G("e-b vls-w09-motion",`
    ${R(180,92,134,36,C.green,8)}
    ${T(247,115,"DESIGN B",15,C.paper)}
    ${R(186,147,122,122,C.paper,9,
      `stroke="${C.green}" stroke-width="2"`)}
    ${phone(198,170,44,79)}
    ${door(259,171,40,77)}
    ${P("M243 208 H258",C.green,4)}
    ${arrow(256,208,C.green)}
    ${T(247,316,"22 MIN",19,C.green)}
  `,`opacity="0"`)}

  ${G("e-baseline vls-w09-motion",`
    ${R(104,32,132,35,C.orange,16)}
    ${T(170,55,"82 MIN TODAY",15,C.paper)}
  `)}

  ${G("e-approval vls-w09-motion",`
    ${R(121,134,98,44,C.paper,9,
      `stroke="${C.orange}" stroke-width="3"`)}
    ${T(170,153,"47 MIN",16,C.orange)}
    ${T(170,167,"REMOVED",10,C.green)}
    ${P("M128 139 L212 172",C.orange,3)}
  `,`opacity="0"`)}

  ${G("e-split vls-w09-motion",`
    ${O(247,207,48,"none",
      `stroke="${C.blue}" stroke-width="13"`)}
    <path d="M247 159 A48 48 0 1 1 199 207"
      fill="none" stroke="${C.green}" stroke-width="13"/>
    ${T(247,205,"74%",21,C.green)}
    ${T(247,222,"DIRECT",10,C.navy)}
  `,`opacity="0"`)}

  ${G("e-help vls-w09-motion",`
    ${person(198,266,C.orange,.7)}
    ${person(227,266,C.navy,.7)}
    ${T(213,291,"26% HELP",11,C.orange)}
  `,`opacity="0"`)}

  ${G("e-calendar vls-w09-motion",`
    ${R(74,335,192,37,C.paper,8,
      `stroke="${C.navy}" stroke-width="2"`)}
    ${T(170,350,"18 WEEKS  /  14 MONTHS",11,C.navy)}
    ${P("M98 360 H243",C.orange,3)}
  `,`opacity="0"`)}

  ${G("e-rule vls-w09-motion",`
    ${R(97,177,146,50,C.paper,8,
      `stroke="${C.orange}" stroke-width="3"`)}
    ${T(170,197,"JANUARY RULE",13,C.orange)}
    ${T(170,213,"11 MONTHS AWAY",11,C.navy)}
  `,`opacity="0"`)}

  ${G("vls-w09-accent",`
    ${O(170,197,132,"none",
      `stroke="${C.orange}" stroke-width="2"
       stroke-dasharray="4 12"`)}
  `)}
`)}

${O(170,190,5,C.orange,
  `class="vls-w09-light" opacity=".3"`)}
`;

register("O2b",{
  title:"TWO COMPETING ARRIVALS",
  count:28,
  cuts:[1,3,6,9,11,13,15,17,19,21,23,25,27],
  body,

  render(r,b,i,n){
    const names=[
      "Two proposed designs",
      "82-minute baseline",
      "Design A: kiosk",
      "44-minute model",
      "Design B: direct",
      "74% bypass desk",
      "22-minute model",
      "Compare journey times",
      "Same approval removed",
      "Service remains intact",
      "Reception still queues",
      "26% still need help",
      "January dependency",
      "Targets, not results"
    ];

    label(r,names[b]);

    show(r,".e-a",true);
    show(r,".e-b",b>=4);
    show(r,".e-approval",b===8);
    show(r,".e-split",b===5);
    show(r,".e-help",b===11);
    show(r,".e-calendar",b>=7&&b<=12);
    show(r,".e-rule",b===12);

    set(r,".e-a",{
      opacity:b>=4&&b<=6?".55":"1"
    });

    set(r,".e-b",{
      opacity:b>=4?"1":"0"
    });

    move(r,".e-a",
      b===7?-4:0,
      b===3?-7:0,
      b===3?1.04:1);

    move(r,".e-b",
      b===7?4:0,
      b===6?-7:0,
      b===6?1.04:1);

    move(r,".e-baseline",
      0,
      b>=7?-4:0,
      1);

    set(r,".e-baseline rect",{
      fill:b>=7?C.navy:C.orange
    });

    move(r,".e-split",0,0,1,i*3);

    set(r,".e-help",{
      opacity:b===11?"1":"0"
    });

    set(r,".e-rule",{
      opacity:b===12?"1":"0"
    });
  }
});
}

// ============================================================
// SCENE O2c - THE QUICK-WIN TRAP
//
// Original cinematic concept:
// A short bridge offers immediate passage across a ravine.
//
// But the bridge is built directly across the foundation of
// a larger future route.
//
// A mechanical lock-in trap emerges as equipment, sunk costs,
// obsolete training and integration dependencies accumulate.
//
// Reusable investments instead become foundation stones.
//
// 33 narration moments.
// ============================================================

{
const body=`
<defs>
  <linearGradient id="w09f-ground" x1="0" y1="0" x2="0" y2="1">
    <stop stop-color="#dbe7f2"/>
    <stop offset="1" stop-color="#fbf8f1"/>
  </linearGradient>
</defs>

${G("vls-w09-camera",`
  ${P("M15 277 H104 L133 331 H207 L236 277 H325",
    C.navy,4)}
  ${P("M133 331 L145 350 H195 L207 331",
    C.navy,2)}
  ${R(16,279,88,48,"url(#w09f-ground)",5)}
  ${R(236,279,88,48,"url(#w09f-ground)",5)}

  ${G("f-short vls-w09-motion",`
    ${R(92,237,155,22,C.orange,5)}
    ${P("M104 237 V205 M236 237 V205",C.navy,5)}
    ${P("M104 205 H236",C.navy,3)}
    ${person(112,218,C.navy,.72)}
    ${T(170,192,"EARLY RELIEF",12,C.orange)}
  `)}

  ${G("f-foundation vls-w09-motion",`
    ${R(121,291,98,18,C.blue,3)}
    ${R(135,309,70,17,C.blue,3)}
    ${P("M170 290 V267",C.navy,3)}
  `,`opacity="0"`)}

  ${G("f-trap vls-w09-motion",`
    ${gear(170,258,32,C.orange)}
    ${P("M137 258 H109 M203 258 H231",C.orange,5)}
    ${R(154,234,32,48,C.navy,5)}
    ${P("M160 243 H180 M160 253 H180",C.paper,3)}
  `,`opacity="0"`)}

  ${G("f-chain vls-w09-motion",`
    ${[0,1,2,3].map(j=>`
      <ellipse cx="${112+j*38}" cy="${157+j%2*10}"
        rx="22" ry="12" fill="none"
        stroke="${C.orange}" stroke-width="6"
        transform="rotate(${j%2?25:-25} ${112+j*38} ${157+j%2*10})"/>
    `).join("")}
  `,`opacity="0"`)}

  ${G("f-cost vls-w09-motion",`
    ${O(170,103,38,C.orange)}
    ${T(170,101,"SUNK",13,C.paper)}
    ${T(170,116,"COST",12,C.paper)}
  `,`opacity="0"`)}

  ${G("f-reuse vls-w09-motion",`
    ${R(82,260,58,30,C.green,4)}
    ${R(141,260,58,30,C.green,4)}
    ${R(200,260,58,30,C.green,4)}
    ${T(111,279,"DATA",11,C.paper)}
    ${T(170,279,"SKILLS",11,C.paper)}
    ${T(229,279,"RULES",11,C.paper)}
  `,`opacity="0"`)}

  ${G("f-future vls-w09-motion",`
    ${P("M65 229 Q170 105 275 229",C.green,9)}
    ${P("M65 229 Q170 105 275 229",C.paper,2,
      `stroke-dasharray="6 9"`)}
    ${O(170,159,16,C.green)}
    ${check(170,159,C.paper)}
  `,`opacity="0"`)}

  ${G("f-choice vls-w09-motion",`
    ${P("M170 68 V122",C.navy,5)}
    ${P("M170 122 L112 153 M170 122 L228 153",
      C.navy,4)}
    ${O(112,153,8,C.orange)}
    ${O(228,153,8,C.green)}
  `,`opacity="0"`)}

  ${G("vls-w09-accent",`
    ${O(170,215,122,"none",
      `stroke="${C.orange}" stroke-width="2"
       stroke-dasharray="4 12"`)}
  `)}
`)}

${O(170,190,5,C.orange,
  `class="vls-w09-light" opacity=".3"`)}
`;

register("O2c",{
  title:"THE QUICK-WIN TRAP",
  count:33,
  cuts:[2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32],
  body,

  render(r,b,i,n){
    const names=[
      "An attractive shortcut",
      "A staged proposal",
      "Early visible relief",
      "The hidden commitment",
      "Invest in the old route",
      "Sunk cost appears",
      "Repeated change fatigue",
      "Technology lock-in",
      "Management capacity",
      "Opportunity cost",
      "Find reusable gains",
      "Build shared capabilities",
      "Protect future options",
      "Test feasibility",
      "Choose A knowingly",
      "Choose B knowingly",
      "State the accepted risk"
    ];

    label(r,names[b]);

    show(r,".f-short",b<13||b===14);
    show(r,".f-foundation",b>=3);
    show(r,".f-trap",b>=4&&b<=9);
    show(r,".f-chain",b>=5&&b<=9);
    show(r,".f-cost",b>=5&&b<=8);
    show(r,".f-reuse",b>=10);
    show(r,".f-future",b>=12);
    show(r,".f-choice",b>=14);

    move(r,".f-short",
      0,b>=4&&b<=9?10:0,
      b>=4&&b<=9?.94:1);

    move(r,".f-trap",
      0,
      b>=5?-8:12,
      b>=5?1.12:.75,
      i*9);

    move(r,".f-chain",
      0,
      b>=7?14:0,
      b>=7?1.08:1);

    move(r,".f-cost",
      0,
      b>=5?0:-20,
      b>=5?1:.7);

    move(r,".f-future",
      0,
      b>=12?0:18,
      b>=12?1:.8);

    set(r,".f-short",{
      opacity:b>=12&&b!==14?".25":"1"
    });

    set(r,".f-reuse",{
      opacity:b>=10?"1":"0"
    });

    set(r,".f-future",{
      opacity:b>=12?"1":"0"
    });
  }
});
}

// ============================================================
// SCENE O3a - THE DIGITAL NERVOUS SYSTEM
//
// Technology that changes the process.
//
// Original cinematic concept:
// The hotel is represented as a living nervous system.
//
// Booking, revenue, housekeeping and room access become
// specialised organs connected by information signals.
//
// A faster computer cannot repair a broken connection.
// The redesign establishes shared records, automated
// approval, a kiosk, mobile access and human review.
//
// 26 narration moments.
// ============================================================

{
const body=`
<defs>
  <radialGradient id="w09g-core">
    <stop stop-color="#dbe7f2"/>
    <stop offset="1" stop-color="#fbf8f1"/>
  </radialGradient>
</defs>

${G("vls-w09-camera",`
  ${O(170,192,137,"none",
    `stroke="${C.blue}" stroke-width="2"
     stroke-dasharray="4 8"`)}

  ${G("g-core vls-w09-motion",`
    ${O(170,192,67,"url(#w09g-core)",
      `stroke="${C.navy}" stroke-width="3"`)}
    ${O(170,192,43,C.paper,
      `stroke="${C.green}" stroke-width="3"`)}
    ${P("M151 179 H188 M151 191 H180 M151 203 H186",
      C.navy,3)}
    ${O(190,211,9,C.green)}
    ${T(170,237,"SHARED RECORD",11,C.navy)}
  `)}

  ${G("g-booking vls-w09-motion",`
    ${R(132,41,76,58,C.paper,9,
      `stroke="${C.navy}" stroke-width="2"`)}
    ${P("M145 57 H195 M145 68 H185",C.navy,2)}
    ${O(189,82,7,C.green)}
    ${T(170,114,"BOOKING",11,C.navy)}
  `)}

  ${G("g-revenue vls-w09-motion",`
    ${O(285,160,39,C.paper,
      `stroke="${C.orange}" stroke-width="3"`)}
    ${gear(285,160,21,C.orange)}
    ${T(285,215,"REVENUE",11,C.navy)}
  `)}

  ${G("g-house vls-w09-motion",`
    ${O(252,299,37,C.paper,
      `stroke="${C.green}" stroke-width="3"`)}
    ${door(235,275,34,47)}
    ${T(252,348,"ROOM READY",10,C.green)}
  `)}

  ${G("g-kiosk vls-w09-motion",`
    ${O(88,299,37,C.paper,
      `stroke="${C.navy}" stroke-width="3"`)}
    ${R(73,276,30,40,C.navy,6)}
    ${R(78,282,20,21,C.blue,3)}
    ${T(88,348,"KIOSK",11,C.navy)}
  `)}

  ${G("g-mobile vls-w09-motion",`
    ${O(55,160,39,C.paper,
      `stroke="${C.green}" stroke-width="3"`)}
    ${phone(39,133,32,55)}
    ${T(55,215,"MOBILE",11,C.green)}
  `)}

  ${G("g-links vls-w09-motion",`
    ${P("M170 125 V100",C.green,4)}
    ${P("M231 174 L248 166",C.green,4)}
    ${P("M211 240 L228 267",C.green,4)}
    ${P("M129 240 L112 267",C.green,4)}
    ${P("M109 174 L92 166",C.green,4)}
  `,`opacity="0"`)}

  ${G("g-packets vls-w09-motion",`
    ${O(170,112,7,C.orange)}
    ${O(238,169,7,C.orange)}
    ${O(221,257,7,C.orange)}
    ${O(119,257,7,C.orange)}
    ${O(102,169,7,C.orange)}
  `,`opacity="0"`)}

  ${G("g-break vls-w09-motion",`
    ${P("M223 172 l-12 -9 m12 0 l-12 9",
      C.orange,5)}
    ${P("M118 253 l-11 -9 m11 0 l-11 9",
      C.orange,5)}
  `,`opacity="0"`)}

  ${G("g-human vls-w09-motion",`
    ${person(170,293,C.orange,1)}
    ${O(170,290,35,"none",
      `stroke="${C.orange}" stroke-width="3"`)}
    ${T(170,343,"HUMAN REVIEW",11,C.orange)}
  `,`opacity="0"`)}

  ${G("g-secure vls-w09-motion",`
    <path d="M170 151 L194 160 V185 Q194 205 170 218 Q146 205 146 185 V160Z"
      fill="${C.paper}" stroke="${C.green}" stroke-width="3"/>
    ${check(170,181,C.green)}
  `,`opacity="0"`)}

  ${G("vls-w09-accent",`
    ${O(170,192,125,"none",
      `stroke="${C.orange}" stroke-width="2"
       stroke-dasharray="4 12"`)}
  `)}
`)}

${O(170,190,5,C.orange,
  `class="vls-w09-light" opacity=".3"`)}
`;

register("O3a",{
  title:"TECHNOLOGY CHANGES THE WORK",
  count:26,
  cuts:[2,4,6,8,10,12,14,16,18,20,22,24],
  body,

  render(r,b,i,n){
    const names=[
      "Imagine the future",
      "Find the real delay",
      "Faster is not redesign",
      "Move approval upstream",
      "Connect the departments",
      "One reliable record",
      "Automate routine checks",
      "Preserve human review",
      "Self-service kiosk",
      "Direct mobile arrival",
      "Secure every connection",
      "Design before technology",
      "Handle real exceptions"
    ];

    label(r,names[b]);

    const active=[
      b>=4,b>=6,b>=4,b>=8,b>=9
    ];

    [
      ".g-booking",
      ".g-revenue",
      ".g-house",
      ".g-kiosk",
      ".g-mobile"
    ].forEach((s,j)=>{
      set(r,s,{
        opacity:active[j]?"1":".28"
      });
      move(r,s,
        0,
        active[j]?-4:7,
        active[j]?1.04:.88);
    });

    show(r,".g-links",b>=4);
    show(r,".g-packets",b>=5);
    show(r,".g-break",b===2||b===12);
    show(r,".g-human",b===7||b===12);
    show(r,".g-secure",b>=10);

    move(r,".g-core",
      0,0,
      b>=5?1.08:1,
      i%2?3:-3);

    move(r,".g-packets",
      Math.sin(i*.7)*12,
      Math.cos(i*.7)*9,
      1);

    move(r,".g-revenue",
      0,b>=6?-4:0,
      b>=6?1.06:1,
      b>=6?i*7:0);

    set(r,".g-links",{
      opacity:b>=4?"1":"0"
    });

    set(r,".g-secure",{
      opacity:b>=10?"1":"0"
    });
  }
});
}

// Next: PART 3 - O3b, O3c, O2d, O2e,
// followed by the closing IIFE and // END FILE.
// Append directly after PART 2.
// Scenes: O3b, O3c, O2d, O2e.
// Closes the IIFE and completes scenes-week.js.

// ============================================================
// SCENE O3b - THE AUTOMATION BOUNDARY
//
// Original cinematic concept:
// A precision sorting machine receives hotel arrival cases.
// Routine, verified cases pass through a green automatic
// gate. Exceptions are diverted to a staffed review station.
//
// A physical safety barrier prevents the machine from
// automating decisions requiring human judgment.
//
// 28 narration moments.
// ============================================================

{
const body=`
<defs>
  <linearGradient id="w09h-belt" x1="0" y1="0" x2="1" y2="0">
    <stop stop-color="#dbe7f2"/>
    <stop offset=".5" stop-color="#fbf8f1"/>
    <stop offset="1" stop-color="#dbe7f2"/>
  </linearGradient>
</defs>

${G("vls-w09-camera",`
  ${R(18,178,304,43,"url(#w09h-belt)",9,
    `stroke="${C.navy}" stroke-width="3"`)}
  ${P("M25 198 H313",C.navy,2,
    `stroke-dasharray="8 10" opacity=".45"`)}
  ${[45,95,145,195,245,295].map(x=>
    O(x,220,8,C.navy)).join("")}

  ${G("h-entry vls-w09-motion",`
    ${R(25,124,77,39,C.paper,7,
      `stroke="${C.navy}" stroke-width="2"`)}
    ${T(63,140,"ARRIVAL",11,C.navy)}
    ${T(63,153,"CASE",10,C.navy)}
    ${P("M63 164 V176",C.navy,3)}
  `)}

  ${G("h-cases vls-w09-motion",`
    ${R(37,183,31,30,C.paper,5,
      `stroke="${C.navy}" stroke-width="2"`)}
    ${P("M43 192 H61 M43 200 H56",C.navy,2)}
    ${R(106,183,31,30,C.paper,5,
      `stroke="${C.navy}" stroke-width="2"`)}
    ${P("M112 192 H130 M112 200 H125",C.navy,2)}
    ${R(175,183,31,30,C.paper,5,
      `stroke="${C.orange}" stroke-width="2"`)}
    ${P("M181 192 H199 M181 200 H194",C.orange,2)}
  `)}

  ${G("h-scanner vls-w09-motion",`
    ${P("M140 175 V134 Q140 116 158 116 H182 Q200 116 200 134 V175",C.navy,7)}
    ${P("M150 151 H190",C.green,4)}
    ${O(170,132,8,C.green)}
    ${P("M170 141 V176",C.green,2,
      `stroke-dasharray="3 5"`)}
  `)}

  ${G("h-auto vls-w09-motion",`
    ${P("M214 198 H299",C.green,8)}
    ${arrow(293,198,C.paper)}
    ${R(235,124,79,39,C.green,8)}
    ${T(274,140,"AUTO",12,C.paper)}
    ${T(274,153,"PASS",10,C.paper)}
    ${check(274,180,C.green)}
  `,`opacity="0"`)}

  ${G("h-exception vls-w09-motion",`
    ${P("M170 218 V270 H103",C.orange,6)}
    ${arrow(108,270,C.orange)}
    ${O(170,230,11,C.orange)}
    ${T(170,235,"!",15,C.paper)}
  `,`opacity="0"`)}

  ${G("h-human vls-w09-motion",`
    ${R(29,280,124,52,C.paper,8,
      `stroke="${C.orange}" stroke-width="3"`)}
    ${person(57,316,C.navy,.68)}
    ${T(105,301,"HUMAN",12,C.orange)}
    ${T(105,316,"REVIEW",12,C.orange)}
  `,`opacity="0"`)}

  ${G("h-barrier vls-w09-motion",`
    ${P("M210 163 V231",C.orange,7)}
    ${P("M199 163 H221 M199 231 H221",C.orange,4)}
    ${R(199,171,22,13,C.paper,3)}
    ${T(210,181,"!",12,C.orange)}
  `,`opacity="0"`)}

  ${G("h-controls vls-w09-motion",`
    ${O(170,72,38,C.paper,
      `stroke="${C.green}" stroke-width="3"`)}
    <path d="M170 47 L188 54 V74 Q188 89 170 99 Q152 89 152 74 V54Z"
      fill="${C.blue}" stroke="${C.navy}" stroke-width="2"/>
    ${check(170,71,C.green)}
  `,`opacity="0"`)}

  ${G("h-speed vls-w09-motion",`
    ${P("M43 245 H93 M35 257 H80 M44 269 H69",
      C.green,4)}
  `,`opacity="0"`)}

  ${G("h-warning vls-w09-motion",`
    ${P("M170 34 L190 68 H150Z",C.orange,3)}
    ${T(170,61,"!",19,C.orange)}
  `,`opacity="0"`)}

  ${G("vls-w09-accent",`
    ${O(170,195,131,"none",
      `stroke="${C.orange}" stroke-width="2"
       stroke-dasharray="4 12"`)}
  `)}
`)}

${O(170,190,5,C.orange,
  `class="vls-w09-light" opacity=".3"`)}
`;

register("O3b",{
  title:"THE AUTOMATION BOUNDARY",
  count:28,
  cuts:[2,4,6,8,10,12,14,16,18,20,22,24,26],
  body,

  render(r,b,i,n){
    const names=[
      "Separate the work",
      "Identify routine cases",
      "Check reliable inputs",
      "Automate the routine",
      "Speed up verification",
      "Recognise exceptions",
      "Route to human review",
      "Protect judgment",
      "Control the boundary",
      "Avoid blind automation",
      "Maintain accountability",
      "Measure both routes",
      "Preserve guest service",
      "Design the safeguards"
    ];

    label(r,names[b]);

    show(r,".h-auto",b>=3);
    show(r,".h-speed",b>=4);
    show(r,".h-exception",b>=5);
    show(r,".h-human",b>=6);
    show(r,".h-barrier",b>=7);
    show(r,".h-controls",b>=8);
    show(r,".h-warning",b===9);

    move(r,".h-cases",
      Math.min(95,i*5.4),
      0,
      1);

    move(r,".h-scanner",
      0,
      Math.sin(i*.8)*5,
      1,
      (i%5-2)*2);

    move(r,".h-exception",
      b>=6?-13:0,
      b>=6?8:0,
      1);

    move(r,".h-human",
      0,
      b>=6?-5:12,
      b>=6?1.04:.9);

    set(r,".h-auto",{
      opacity:b>=3?"1":"0"
    });

    set(r,".h-controls",{
      opacity:b>=8?"1":"0"
    });

    set(r,".h-warning",{
      opacity:b===9?"1":"0"
    });

    set(r,".h-barrier",{
      opacity:b>=7?"1":"0"
    });
  }
});
}

// ============================================================
// SCENE O3c - THE IMPLEMENTATION ENGINE
//
// Original cinematic concept:
// A redesign is represented by an aircraft preparing to
// leave the ground.
//
// The aircraft is the future process. Its engines are
// technology, people, controls and operational readiness.
//
// An unfinished runway, untrained crew or missing control
// prevents safe takeoff.
//
// The final moments show a controlled launch followed by
// monitoring and adjustment.
//
// 30 narration moments.
// ============================================================

{
const body=`
<defs>
  <linearGradient id="w09i-sky" x1="0" y1="0" x2="0" y2="1">
    <stop stop-color="#dbe7f2" stop-opacity=".85"/>
    <stop offset="1" stop-color="#fbf8f1" stop-opacity="0"/>
  </linearGradient>
</defs>

${G("vls-w09-camera",`
  ${R(13,52,314,283,"url(#w09i-sky)",13)}
  ${P("M25 294 H315",C.navy,4)}
  ${P("M170 294 V329",C.navy,3,
    `stroke-dasharray="8 8"`)}
  ${P("M65 316 H275",C.blue,3)}

  ${G("i-plane vls-w09-motion",`
    <path d="M59 224 L144 214 L168 144
      Q171 134 177 144 L197 214 L281 224
      Q291 229 281 235 L197 242 L185 272
      L216 282 L216 290 L173 282 L130 290
      L130 282 L161 272 L149 242 L59 235
      Q49 229 59 224Z" fill="${C.paper}" stroke="${C.navy}" stroke-width="4"/> ${P("M171 161 V265",C.navy,2)}
    ${O(172,225,12,C.blue)}
    ${R(160,188,25,9,C.navy,4)}
    ${P("M151 244 L139 262 M192 244 L205 262",
      C.orange,4)}
  `)}

  ${G("i-engines vls-w09-motion",`
    ${O(120,232,18,C.blue,
      `stroke="${C.navy}" stroke-width="3"`)}
    ${O(224,232,18,C.blue,
      `stroke="${C.navy}" stroke-width="3"`)}
    ${gear(120,232,10,C.green)}
    ${gear(224,232,10,C.green)}
  `,`opacity="0"`)}

  ${G("i-crew vls-w09-motion",`
    ${person(76,159,C.navy,.72)}
    ${person(108,159,C.orange,.72)}
    ${person(140,159,C.green,.72)}
    ${P("M67 186 H149",C.navy,3)}
  `,`opacity="0"`)}

  ${G("i-checklist vls-w09-motion",`
    ${R(221,86,84,95,C.paper,7,
      `stroke="${C.navy}" stroke-width="2"`)}
    ${T(263,105,"READINESS",11,C.navy)}
    ${[0,1,2,3].map(j=>`
      ${R(234,116+j*15,10,10,C.blue,2)}
      ${P(`M235 ${121+j*15} l3 3 5 -7`,
        C.green,2)}
      ${P(`M251 ${121+j*15} H291`,C.navy,2)}
    `).join("")}
  `,`opacity="0"`)}

  ${G("i-barrier vls-w09-motion",`
    ${P("M50 294 V252 M290 294 V252",C.orange,6)}
    ${P("M50 252 H290",C.orange,5,
      `stroke-dasharray="12 7"`)}
    ${T(170,246,"NOT READY",12,C.orange)}
  `,`opacity="0"`)}

  ${G("i-launch vls-w09-motion",`
    ${P("M92 300 Q170 274 248 300",C.green,5)}
    ${P("M90 313 Q170 287 250 313",C.green,3)}
    ${P("M170 331 V355",C.green,4)}
  `,`opacity="0"`)}

  ${G("i-monitor vls-w09-motion",`
    ${R(31,79,113,72,C.paper,9,
      `stroke="${C.green}" stroke-width="2"`)}
    ${P("M43 130 L60 117 L76 122 L93 101 L112 108 L132 91",C.green,4)}
    ${T(88,143,"LIVE SIGNALS",10,C.navy)}
  `,`opacity="0"`)}

  ${G("i-feedback vls-w09-motion",`
    ${P("M240 82 Q302 112 287 167",C.green,4)}
    ${P("M280 154 l7 13 10 -10",C.green,3)}
    ${P("M280 176 Q233 205 213 170",C.green,4)}
  `,`opacity="0"`)}

  ${G("vls-w09-accent",`
    ${O(170,205,132,"none",
      `stroke="${C.orange}" stroke-width="2"
       stroke-dasharray="4 12"`)}
  `)}
`)}

${O(170,190,5,C.orange,
  `class="vls-w09-light" opacity=".3"`)}
`;

register("O3c",{
  title:"PREPARING FOR LAUNCH",
  count:30,
  cuts:[2,4,6,8,10,12,14,16,18,20,22,24,26,28],
  body,

  render(r,b,i,n){
    const names=[
      "A design must work",
      "Prepare the runway",
      "Technology readiness",
      "People readiness",
      "Train the team",
      "Operational readiness",
      "Controls and safeguards",
      "Check dependencies",
      "Do not launch early",
      "Test before release",
      "Prepare the fallback",
      "Controlled launch",
      "Monitor performance",
      "Respond to signals",
      "Stabilise the change"
    ];

    label(r,names[b]);

    show(r,".i-engines",b>=2);
    show(r,".i-crew",b>=3);
    show(r,".i-checklist",b>=5);
    show(r,".i-barrier",b>=7&&b<=10);
    show(r,".i-launch",b>=11);
    show(r,".i-monitor",b>=12);
    show(r,".i-feedback",b>=13);

    move(r,".i-plane",
      0,
      b>=11?-Math.min(95,(i-22)*13):0,
      b>=11?1.04:1,
      b>=11?-7:0);

    move(r,".i-engines",
      0,
      b>=11?-Math.min(95,(i-22)*13):0,
      1,
      i*12);

    move(r,".i-crew",
      0,
      b>=4?-5:5,
      b>=4?1.04:1);

    move(r,".i-barrier",
      0,
      b>=10?17:0,
      b>=10?.85:1);

    set(r,".i-barrier",{
      opacity:b>=7&&b<=10?"1":"0"
    });

    set(r,".i-launch",{
      opacity:b>=11?"1":"0"
    });

    set(r,".i-monitor",{
      opacity:b>=12?"1":"0"
    });

    set(r,".i-feedback",{
      opacity:b>=13?"1":"0"
    });
  }
});
}

// ============================================================
// SCENE O2d - THE WEIGHTED DECISION BALANCE
//
// Original cinematic concept:
// A large mechanical balance compares redesign alternatives.
//
// Each criterion is a physical weight. Moving weights changes
// the balance, making trade-offs tangible.
//
// The decision is not an automatic winner: a recommendation
// emerges only after feasibility and dependencies are tested.
//
// 29 narration moments.
// ============================================================

{
const body=`
<defs>
  <linearGradient id="w09j-metal" x1="0" y1="0" x2="0" y2="1">
    <stop stop-color="#dbe7f2"/>
    <stop offset="1" stop-color="#fbf8f1"/>
  </linearGradient>
</defs>

${G("vls-w09-camera",`
  ${P("M170 128 V321",C.navy,9)}
  ${R(124,316,92,18,C.navy,6)}
  ${O(170,128,19,C.orange)}
  ${O(170,128,8,C.paper)}

  ${G("j-beam vls-w09-motion",`
    ${P("M47 139 H293",C.navy,8)}
    ${P("M65 139 V237 M275 139 V237",C.navy,3)}

    ${G("j-left",`
      ${P("M27 237 Q65 270 103 237",C.navy,4)}
      ${P("M27 237 H103",C.navy,3)}
      ${R(37,198,56,38,C.blue,7)}
      ${T(65,221,"A",24,C.navy)}
    `)}

    ${G("j-right",`
      ${P("M237 237 Q275 270 313 237",C.navy,4)}
      ${P("M237 237 H313",C.navy,3)}
      ${R(247,198,56,38,C.blue,7)}
      ${T(275,221,"B",24,C.navy)}
    `)}
  `)}

  ${G("j-benefit vls-w09-motion",`
    ${R(45,177,40,19,C.green,5)}
    ${T(65,191,"GAIN",10,C.paper)}
    ${R(255,177,40,19,C.green,5)}
    ${T(275,191,"GAIN",10,C.paper)}
  `,`opacity="0"`)}

  ${G("j-cost vls-w09-motion",`
    ${R(48,158,34,18,C.orange,4)}
    ${T(65,171,"COST",9,C.paper)}
    ${R(258,158,34,18,C.orange,4)}
    ${T(275,171,"COST",9,C.paper)}
  `,`opacity="0"`)}

  ${G("j-risk vls-w09-motion",`
    ${O(65,144,15,C.orange)}
    ${T(65,149,"!",19,C.paper)}
    ${O(275,144,15,C.orange)}
    ${T(275,149,"!",19,C.paper)}
  `,`opacity="0"`)}

  ${G("j-feasible vls-w09-motion",`
    ${O(170,65,39,C.paper,
      `stroke="${C.green}" stroke-width="3"`)}
    ${check(170,65,C.green)}
    ${T(170,116,"FEASIBILITY",11,C.green)}
  `,`opacity="0"`)}

  ${G("j-weights vls-w09-motion",`
    ${[0,1,2].map(j=>`
      ${O(109+j*61,362,14,
        j===0?C.green:j===1?C.orange:C.navy)}
    `).join("")}
    ${T(109,386,"VALUE",10,C.green)}
    ${T(170,386,"COST",10,C.orange)}
    ${T(231,386,"RISK",10,C.navy)}
  `,`opacity="0"`)}

  ${G("j-warning vls-w09-motion",`
    ${P("M170 32 L189 63 H151Z",C.orange,3)}
    ${T(170,56,"!",17,C.orange)}
  `,`opacity="0"`)}

  ${G("vls-w09-accent",`
    ${O(170,190,126,"none",
      `stroke="${C.orange}" stroke-width="2"
       stroke-dasharray="4 12"`)}
  `)}
`)}

${O(170,190,5,C.orange,
  `class="vls-w09-light" opacity=".3"`)}
`;

register("O2d",{
  title:"WEIGHING THE ALTERNATIVES",
  count:29,
  cuts:[2,4,6,8,10,12,14,16,18,20,22,24,26,28],
  body,

  render(r,b,i,n){
    const names=[
      "Compare the alternatives",
      "Use explicit criteria",
      "Define the weights",
      "Estimate the benefits",
      "Include total cost",
      "Expose delivery risk",
      "Assess implementation",
      "Consider timing",
      "Check dependencies",
      "Do not hide assumptions",
      "Test sensitivity",
      "Apply feasibility",
      "Explain the trade-off",
      "Make a recommendation",
      "Record the reasoning"
    ];

    label(r,names[b]);

    show(r,".j-weights",b>=2);
    show(r,".j-benefit",b>=3);
    show(r,".j-cost",b>=4);
    show(r,".j-risk",b>=5);
    show(r,".j-feasible",b>=11);
    show(r,".j-warning",b===9||b===10);

    const angles=[
      0,-3,-5,-9,-3,6,9,3,-5,0,
      7,-2,0,-4,-4
    ];

    move(r,".j-beam",
      0,0,1,
      angles[b]+Math.sin(i*.55)*1.3);

    move(r,".j-benefit",
      0,
      b>=3?-5:10,
      b>=3?1:.8);

    move(r,".j-cost",
      0,
      b>=4?-4:10,
      b>=4?1:.8);

    move(r,".j-risk",
      0,
      b>=5?-3:10,
      b>=5?1:.8);

    set(r,".j-feasible",{
      opacity:b>=11?"1":"0"
    });

    set(r,".j-warning",{
      opacity:b===9||b===10?"1":"0"
    });

    set(r,".j-weights",{
      opacity:b>=2?"1":"0"
    });
  }
});
}

// ============================================================
// SCENE O2e - THE DECISION RECORD
//
// Original cinematic concept:
// A one-page decision record becomes a physical engineering
// blueprint rather than a text document.
//
// Evidence, assumptions, alternatives, dependencies and
// acceptance criteria lock into a single structured panel.
//
// A moving drafting instrument checks each component.
// The final decision remains auditable and revisable.
//
// 28 narration moments.
// ============================================================

{
const body=`
<defs>
  <linearGradient id="w09k-sheet" x1="0" y1="0" x2="1" y2="1">
    <stop stop-color="#fbf8f1"/>
    <stop offset="1" stop-color="#dbe7f2"/>
  </linearGradient>
</defs>

${G("vls-w09-camera",`
  ${R(43,49,254,296,"url(#w09k-sheet)",10,
    `stroke="${C.navy}" stroke-width="3"`)}
  ${R(59,65,222,34,C.navy,6)}
  ${T(170,87,"DECISION BLUEPRINT",13,C.paper)}

  ${G("k-evidence vls-w09-motion",`
    ${R(62,115,98,73,C.blue,7)}
    ${T(111,132,"EVIDENCE",11,C.navy)}
    ${P("M74 174 L92 157 L108 164 L126 143 L148 151",
      C.green,4)}
  `,`opacity="0"`)}

  ${G("k-options vls-w09-motion",`
    ${R(180,115,98,73,C.blue,7)}
    ${T(229,132,"OPTIONS",11,C.navy)}
    ${O(210,160,15,C.navy)}
    ${O(250,160,15,C.green)}
    ${T(210,165,"A",14,C.paper)}
    ${T(250,165,"B",14,C.paper)}
  `,`opacity="0"`)}

  ${G("k-assumptions vls-w09-motion",`
    ${R(62,202,98,73,C.blue,7)}
    ${T(111,219,"ASSUMPTIONS",10,C.navy)}
    ${P("M74 235 H147 M74 246 H140 M74 257 H130",
      C.navy,3)}
    ${O(145,257,5,C.orange)}
  `,`opacity="0"`)}

  ${G("k-dependencies vls-w09-motion",`
    ${R(180,202,98,73,C.blue,7)}
    ${T(229,219,"DEPENDENCIES",9,C.navy)}
    ${O(204,247,9,C.orange)}
    ${O(229,237,9,C.navy)}
    ${O(254,247,9,C.green)}
    ${P("M213 245 L220 240 M238 240 L245 245",
      C.navy,3)}
  `,`opacity="0"`)}

  ${G("k-criteria vls-w09-motion",`
    ${R(62,286,216,43,C.paper,6,
      `stroke="${C.green}" stroke-width="2"`)}
    ${T(133,303,"ACCEPTANCE TEST",11,C.navy)}
    ${check(242,307,C.green)}
    ${P("M76 317 H207",C.green,3)}
  `,`opacity="0"`)}

  ${G("k-pen vls-w09-motion",`
    ${P("M286 62 L242 115",C.navy,9)}
    ${P("M242 115 L235 128 L251 119Z",C.orange,4)}
    ${O(286,62,9,C.orange)}
  `)}

  ${G("k-seal vls-w09-motion",`
    ${O(170,191,48,"none",
      `stroke="${C.green}" stroke-width="4"`)}
    ${O(170,191,37,"none",
      `stroke="${C.green}" stroke-width="2"`)}
    ${check(170,190,C.green)}
  `,`opacity="0"`)}

  ${G("k-question vls-w09-motion",`
    ${O(170,192,31,C.paper,
      `stroke="${C.orange}" stroke-width="3"`)}
    ${T(170,205,"?",37,C.orange)}
  `,`opacity="0"`)}

  ${G("vls-w09-accent",`
    ${O(170,192,126,"none",
      `stroke="${C.orange}" stroke-width="2"
       stroke-dasharray="4 12"`)}
  `)}
`)}

${O(170,190,5,C.orange,
  `class="vls-w09-light" opacity=".3"`)}
`;

register("O2e",{
  title:"THE DECISION BLUEPRINT",
  count:28,
  cuts:[2,4,6,8,10,12,14,16,18,20,22,24,26],
  body,

  render(r,b,i,n){
    const names=[
      "Make the choice explicit",
      "Capture the evidence",
      "Record the alternatives",
      "Expose the assumptions",
      "Identify dependencies",
      "Define acceptance tests",
      "Separate facts from models",
      "State the recommendation",
      "Explain the trade-off",
      "Record unresolved risks",
      "Make it auditable",
      "Prepare for revision",
      "Confirm the decision",
      "Connect to delivery"
    ];

    label(r,names[b]);

    show(r,".k-evidence",b>=1);
    show(r,".k-options",b>=2);
    show(r,".k-assumptions",b>=3);
    show(r,".k-dependencies",b>=4);
    show(r,".k-criteria",b>=5);
    show(r,".k-question",b===6||b===9||b===11);
    show(r,".k-seal",b>=12);

    const targets=[
      [0,0],[-138,55],[-25,55],
      [-138,142],[-25,142],
      [-80,217],[-50,128],
      [-80,115],[-25,143],
      [-50,160],[-80,180],
      [-50,150],[-80,120],
      [-80,217]
    ];

    const p=targets[b];

    move(r,".k-pen",
      p[0]+Math.sin(i*.7)*5,
      p[1]+Math.cos(i*.7)*4,
      1,
      (i%5-2)*3);

    move(r,".k-seal",
      0,
      b>=12?0:-18,
      b>=12?1:.6,
      b>=12?0:-14);

    set(r,".k-evidence",{
      opacity:b>=1?"1":"0"
    });

    set(r,".k-options",{
      opacity:b>=2?"1":"0"
    });

    set(r,".k-assumptions",{
      opacity:b>=3?"1":"0"
    });

    set(r,".k-dependencies",{
      opacity:b>=4?"1":"0"
    });

    set(r,".k-criteria",{
      opacity:b>=5?"1":"0"
    });

    set(r,".k-seal",{
      opacity:b>=12?"1":"0"
    });

    set(r,".k-question",{
      opacity:b===6||b===9||b===11?"1":"0"
    });
  }
});
}

// ============================================================
// WEEK 9 SCENE ENGINE - FINAL COMPATIBILITY AND CLEANUP
// ============================================================

// All scenes registered above follow:
//
// window.VL_SCENES["sectionId"] = {
//   build(el),
//   step(i,n),
//   reset()
// };
//
// Each scene is independent and owns its own DOM root.
// No scene uses a text-card template.
// Every scene has a unique physical cinematic metaphor.
//
// The engine supports:
// - repeated build calls
// - seeking backwards and forwards
// - changing narration moment counts
// - zero-based moment indices
// - reduced-motion preferences
// - optional GSAP
// - responsive SVG scaling
// - scene-local DOM mutations
// - deterministic reset
//
// Keep the following compatibility layer after all
// registrations and before closing the IIFE.

const WEEK09_IDS = [
  "O1a","O1b","O1c",
  "O2a","O2b","O2c","O2d","O2e",
  "O3a","O3b","O3c"
];

// Ensure scene methods are callable even if the host invokes
// step() or reset() before build().

WEEK09_IDS.forEach(id => {
  const scene=window.VL_SCENES[id];
  if(!scene) return;

  const originalBuild=scene.build;
  const originalStep=scene.step;
  const originalReset=scene.reset;

  scene.build=function(el) {
    if(!el || typeof el.replaceChildren!=="function") return;
    return originalBuild.call(scene,el);
  };

  scene.step=function(i,n) {
    const index=Number.isFinite(Number(i))?
      Math.max(0,Math.floor(Number(i))):0;

    const total=Number.isFinite(Number(n))&&Number(n)>0?
      Math.floor(Number(n)):undefined;

    return originalStep.call(scene,index,total);
  };

  scene.reset=function() {
    return originalReset.call(scene);
  };
});

// The app may load this script more than once while switching
// weeks or rebuilding its look. Scene registration is
// idempotent: the latest registration replaces the previous
// Week 9 entry, while entries belonging to other weeks remain.

})();

