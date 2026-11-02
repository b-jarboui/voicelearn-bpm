// OPER621 · Week 8 · The Understand Phase
// Cinematic, narration-synchronised scenes.
// Concatenate all four parts without modification.

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

const reduced = () =>
  !!(window.matchMedia &&
     window.matchMedia("(prefers-reduced-motion: reduce)").matches);

const clamp = (v,a,b) => Math.max(a,Math.min(b,v));

const safeIndex = (i,n) => {
  const count = Number.isFinite(+n) && +n > 0
    ? Math.floor(+n) : 1;
  return clamp(Number.isFinite(+i) ? Math.floor(+i) : 0,
    0,count-1);
};

const svg = (body,view="0 0 340 390") =>
  `<svg xmlns="${NS}" viewBox="${view}"
    preserveAspectRatio="xMidYMid meet"
    role="img" aria-label="Animated business process illustration">
    ${body}
  </svg>`;

const circle = (x,y,r,fill,extra="") =>
  `<circle cx="${x}" cy="${y}" r="${r}"
    fill="${fill}" ${extra}/>`;

const rect = (x,y,w,h,fill,rx=0,extra="") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}"
    rx="${rx}" fill="${fill}" ${extra}/>`;

const path = (d,color=C.navy,width=2,extra="") =>
  `<path d="${d}" fill="none" stroke="${color}"
    stroke-width="${width}" stroke-linecap="round"
    stroke-linejoin="round" ${extra}/>`;

const txt = (x,y,s,size=13,color=C.ink,extra="") =>
  `<text x="${x}" y="${y}" text-anchor="middle"
    font-size="${size}" fill="${color}" ${extra}>${s}</text>`;

const person = (x,y,color=C.navy,scale=1) =>
  `<g transform="translate(${x} ${y}) scale(${scale})">
    ${circle(0,-14,9,color)}
    <path d="M-16 16 Q-16 -2 0 -2 Q16 -2 16 16Z"
      fill="${color}"/>
  </g>`;

const check = (x,y,color=C.green) =>
  path(`M${x-10} ${y} l7 7 15 -18`,color,4);

const gear = (x,y,r,color) => {
  let teeth="";
  for(let j=0;j<10;j++){
    const a=j*Math.PI/5;
    const xx=x+(r+3)*Math.cos(a);
    const yy=y+(r+3)*Math.sin(a);
    teeth+=rect(xx-5,yy-5,10,10,color,2,
      `transform="rotate(${j*36} ${xx} ${yy})"`);
  }
  return `<g>${teeth}
    ${circle(x,y,r,color)}
    ${circle(x,y,r*.57,C.paper)}
    ${circle(x,y,r*.23,color)}
  </g>`;
};

function mount(el,id,body){
  if(!el || typeof el.replaceChildren!=="function")
    return null;

  const root=document.createElement("div");
  root.className="vls-w08 vls-w08-"+id;
  root.innerHTML=`
    <div class="vls-w08-stage">
      ${svg(body)}
    </div>
    <div class="vls-w08-footer">
      <span class="vls-w08-status"></span>
    </div>
    <div class="vls-w08-progress"></div>
  `;
  el.replaceChildren(root);
  return root;
}

function set(root,selector,property,value){
  if(!root)return;
  root.querySelectorAll(selector).forEach(e=>{
    if(property==="text")e.textContent=String(value);
    else if(property==="attr"){
      Object.entries(value).forEach(([k,v])=>
        e.setAttribute(k,String(v)));
    }else e.style[property]=String(value);
  });
}

function show(root,selector,yes){
  set(root,selector,"opacity",yes?"1":"0");
}

function move(root,selector,x=0,y=0,scale=1){
  set(root,selector,"transform",
    `translate(${x}px,${y}px) scale(${scale})`);
}

function rotate(root,selector,degrees){
  set(root,selector,"transform",`rotate(${degrees}deg)`);
}

function label(root,text){
  set(root,".vls-w08-status","text",text);
}

function progress(root,i,n){
  const count=Math.max(1,Number(n)||1);
  const fraction=(safeIndex(i,count)+1)/count;
  set(root,".vls-w08-progress","width",
    `${fraction*100}%`);
}

function instant(root,yes){
  if(root)root.classList.toggle("vls-w08-instant",
    !!yes || reduced());
}

function sceneFactory(id,body,render){
  let root=null;
  let last=-1;
  let activeAnimation=null;

  function stopAnimation(){
    if(activeAnimation){
      try{activeAnimation.kill();}catch(e){}
      activeAnimation=null;
    }
  }

  function apply(i,n,initial=false){
    if(!root)return;

    const index=safeIndex(i,n);
    instant(root,initial);

    render(root,index,Math.max(1,Number(n)||1));

    // Every narration moment changes the composition, even when
    // consecutive moments remain within the same conceptual beat.
    // This is a camera movement, not a replacement text card.
    const camera=root.querySelector(".vls-w08-camera");

    if(camera){
      const direction=index%4;
      const x=[0,2.8,-2.8,1.5][direction];
      const y=[0,-2,1.8,-1.5][direction];
      const scale=1+(index%5)*.006;

      if(!initial && !reduced() && window.gsap){
        stopAnimation();
        activeAnimation=window.gsap.to(camera,{
          x,y,scale,
          duration:.75,
          ease:"power2.inOut",
          overwrite:true
        });
      }else{
        camera.style.transform=
          `translate(${x}px,${y}px) scale(${scale})`;
      }
    }

    // A moving optical highlight follows every spoken moment.
    const glint=root.querySelector(".vls-w08-glint");
    if(glint){
      const x=35+(index*37)%270;
      const y=75+(index*23)%230;
      glint.setAttribute("cx",x);
      glint.setAttribute("cy",y);
      glint.style.opacity=index%3===0?".18":".08";
    }

    progress(root,index,n);
    last=index;

    if(initial && !reduced()){
      requestAnimationFrame(()=>{
        if(root)root.classList.remove("vls-w08-instant");
      });
    }
  }

  return {
    build(el){
      stopAnimation();
      root=mount(el,id,body);
      last=-1;
      apply(0,1,true);
    },

    step(i,n){
      if(!root)return;
      const index=safeIndex(i,n);

      // Repeated calls are harmless; seeking backwards is supported.
      if(index===last)return;
      apply(index,n,false);
    },

    reset(){
      if(!root)return;
      stopAnimation();
      last=-1;
      apply(0,1,true);
    }
  };
}

// ================================================================
// ONE EMBEDDED STYLESHEET
// ================================================================

if(!document.getElementById("vl-sc-w08")){
  const style=document.createElement("style");
  style.id="vl-sc-w08";
  style.textContent=`
.vls-w08{
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
.vls-w08 *,
.vls-w08 *::before,
.vls-w08 *::after{
  box-sizing:border-box;
}
.vls-w08-stage{
  position:absolute;
  inset:0 0 29px;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
}
.vls-w08-stage>svg{
  display:block;
  width:100%;
  height:100%;
  max-width:100%;
  max-height:100%;
  overflow:visible;
  font-family:inherit;
}
.vls-w08 svg text{
  font-family:inherit;
  font-weight:700;
  letter-spacing:.1px;
}
.vls-w08 svg .vls-w08-motion{
  transition:
    transform .85s cubic-bezier(.2,.75,.2,1),
    opacity .7s ease,
    fill .7s ease,
    stroke .7s ease,
    stroke-dashoffset .9s ease;
}
.vls-w08 svg .vls-w08-camera{
  transform-origin:170px 190px;
  transition:transform .85s ease;
}
.vls-w08 svg .vls-w08-glint{
  transition:cx .75s ease,cy .75s ease,opacity .7s ease;
  pointer-events:none;
}
.vls-w08-footer{
  position:absolute;
  bottom:5px;
  left:5%;
  right:5%;
  min-height:21px;
  display:flex;
  align-items:center;
  justify-content:center;
  text-align:center;
  color:var(--navy);
  font-size:clamp(10px,2.8vw,12px);
  font-weight:750;
  letter-spacing:.035em;
  line-height:1.25;
  pointer-events:none;
}
.vls-w08-progress{
  position:absolute;
  bottom:0;
  left:0;
  width:0;
  height:3px;
  background:var(--orange);
  transition:width .7s ease;
}
.vls-w08-instant *,
.vls-w08-instant *::before,
.vls-w08-instant *::after{
  transition:none!important;
  animation:none!important;
}
.vls-w08 svg .vls-w08-fade{
  opacity:0;
  transition:opacity .75s ease,transform .85s ease;
}
.vls-w08 svg .vls-w08-draw{
  stroke-dasharray:500;
  stroke-dashoffset:500;
  transition:stroke-dashoffset 1s ease;
}
.vls-w08 svg .vls-w08-pulse{
  animation:vlsW08Pulse 2.4s ease-in-out infinite;
  transform-box:fill-box;
  transform-origin:center;
}
@keyframes vlsW08Pulse{
  0%,100%{opacity:.3;transform:scale(.94)}
  50%{opacity:.9;transform:scale(1.08)}
}
@media(max-width:380px){
  .vls-w08-footer{font-size:10px}
  .vls-w08-stage{inset:0 0 27px}
}
@media(prefers-reduced-motion:reduce){
  .vls-w08 *,
  .vls-w08 *::before,
  .vls-w08 *::after{
    animation:none!important;
    transition:none!important;
  }
}

/* W8O1a — The investigation theatre */
.vls-w08-W8O1a .a-lobby,
.vls-w08-W8O1a .a-lens,
.vls-w08-W8O1a .a-guest,
.vls-w08-W8O1a .a-route{
  transition:transform 1s ease,opacity .75s ease;
}
.vls-w08-W8O1a .a-lens{
  transform-origin:170px 183px;
}
.vls-w08-W8O1a .a-route{
  stroke-dasharray:320;
  stroke-dashoffset:320;
  transition:stroke-dashoffset 1s ease;
}

/* W8O1b — Physical swimlane conveyor */
.vls-w08-W8O1b .b-belt,
.vls-w08-W8O1b .b-token,
.vls-w08-W8O1b .b-phone,
.vls-w08-W8O1b .b-gate{
  transition:transform .9s ease,opacity .7s ease;
}
.vls-w08-W8O1b .b-trail{
  stroke-dasharray:400;
  stroke-dashoffset:400;
  transition:stroke-dashoffset 1s ease;
}
.vls-w08-W8O1b .b-wheel{
  transform-box:fill-box;
  transform-origin:center;
  transition:transform .9s ease;
}

/* W8O1c — Forensic evidence laboratory */
.vls-w08-W8O1c .c-lens,
.vls-w08-W8O1c .c-record,
.vls-w08-W8O1c .c-witness,
.vls-w08-W8O1c .c-stamp{
  transition:transform .9s ease,opacity .7s ease;
}
.vls-w08-W8O1c .c-beam{
  transition:transform 1s ease,opacity .7s ease;
}
.vls-w08-W8O1c .c-wire{
  stroke-dasharray:220;
  stroke-dashoffset:220;
  transition:stroke-dashoffset .9s ease;
}
`;
  document.head.appendChild(style);
}

// ================================================================
// SCENE 1 — W8O1a
// UNDERSTAND BEFORE YOU IMPROVE
//
// Original visual: THE INVESTIGATION THEATRE
//
// A guest enters a hotel lobby. The visible reception desk appears
// ordinary, but an enormous movable investigation lens reveals
// invisible waiting, hidden telephone work, and the actual journey.
//
// This scene is about resisting premature redesign.
//
// Unlike Week 10's kiosk scene, the centrepiece is a forensic lens
// that transforms a familiar lobby into an evidence investigation.
//
// Motion vocabulary:
// Guest tracking, lens translation, concealed-work reveal,
// split light, baseline ruler, phase-to-phase connection.
// ================================================================

{
const body=`
<defs>
  <radialGradient id="w08a-light">
    <stop stop-color="#f3d8aa" stop-opacity=".52"/>
    <stop offset="1" stop-color="#f3d8aa" stop-opacity="0"/>
  </radialGradient>
</defs>

<g class="vls-w08-camera">

  ${txt(170,25,"UNDERSTAND FIRST",15,C.navy)}

  <g class="a-lobby">
    ${rect(26,75,288,216,C.blue,15,'opacity=".28"')}

    ${path("M34 266 L170 213 L306 266",C.navy,1.5,
      'opacity=".23"')}
    ${path("M170 213 V302 M91 246 L70 302 M249 246 L270 302",
      C.navy,1,'opacity=".16"')}

    ${rect(39,90,61,111,C.paper,3,
      `stroke="${C.navy}" stroke-width="2" opacity=".55"`)}
    ${rect(240,90,61,111,C.paper,3,
      `stroke="${C.navy}" stroke-width="2" opacity=".55"`)}

    ${rect(112,154,116,17,C.orange,5)}
    ${rect(119,171,102,57,C.navy,5)}
    ${rect(143,136,54,25,C.paper,4,
      `stroke="${C.navy}" stroke-width="2"`)}
    ${path("M153 148 H187",C.green,3)}

    <g class="a-clerk">
      ${person(170,130,C.navy,.78)}
    </g>

    <g class="a-guest vls-w08-motion">
      ${person(67,244,C.navy,1.08)}
      ${rect(82,243,15,22,C.orange,3)}
    </g>

    <g class="a-queue vls-w08-fade">
      ${person(105,254,C.orange,.65)}
      ${person(129,267,C.navy,.55)}
    </g>

    <g class="a-phone vls-w08-fade">
      ${circle(271,173,31,C.paper,
        `stroke="${C.orange}" stroke-width="2.5"`)}
      ${path("M259 162 Q252 172 263 184 Q274 195 284 186",
        C.orange,5)}
      ${txt(271,219,"HIDDEN CALL",11,C.orange)}
    </g>

    <g class="a-wait vls-w08-fade">
      ${circle(76,155,29,C.paper,
        `stroke="${C.orange}" stroke-width="2.5"`)}
      ${path("M76 135 V155 L90 164",C.orange,3)}
      ${txt(76,201,"WAITING",11,C.orange)}
    </g>

    <path class="a-route" d="M66 274 Q112 298 170 256 Q217 224 277 263"
      fill="none" stroke="${C.green}" stroke-width="4"
      stroke-linecap="round"/>

  </g>

  <g class="a-lens vls-w08-motion">
    ${circle(170,183,76,"url(#w08a-light)")}
    ${circle(170,183,67,"none",
      `stroke="${C.navy}" stroke-width="5"`)}
    ${circle(170,183,57,"none",
      `stroke="${C.green}" stroke-width="1.5"
      stroke-dasharray="6 7"`)}
    ${path("M217 232 L268 286",C.navy,13)}
    ${path("M218 233 L265 283",C.blue,5)}
  </g>

  <g class="a-question vls-w08-fade">
    ${circle(170,183,30,C.paper)}
    ${txt(170,196,"?",39,C.orange)}
  </g>

  <g class="a-evidence vls-w08-fade">
    ${circle(170,183,31,C.paper)}
    ${check(170,184,C.green)}
  </g>

  <g class="a-ruler vls-w08-fade">
    ${rect(40,322,260,16,C.blue,7)}
    ${rect(40,322,85,16,C.navy,7)}
    ${rect(125,322,175,16,C.orange,7)}
    ${txt(84,315,"WORK",11,C.navy)}
    ${txt(218,315,"WAIT",11,C.orange)}
    ${txt(170,361,"BASELINE",13,C.navy)}
  </g>

  <g class="a-phases vls-w08-fade">
    ${circle(77,347,12,C.navy)}
    ${circle(170,347,17,C.orange)}
    ${circle(263,347,12,C.green)}
    ${path("M90 347 H151 M189 347 H250",C.navy,3)}
    ${txt(77,373,"STRATEGY",10,C.navy)}
    ${txt(170,373,"UNDERSTAND",10,C.orange)}
    ${txt(263,373,"INNOVATE",10,C.green)}
  </g>

  ${circle(170,180,28,C.orange,
    'class="vls-w08-glint" opacity=".08"')}

</g>
`;

const captions=[
  "The process today",
  "Return to Qasr",
  "A difficult arrival",
  "The guest waits",
  "Investigate the cause",
  "Strategy before action",
  "Programme foundations",
  "Phase four begins",
  "Evidence before redesign",
  "Avoid premature solutions",
  "Technology is not proof",
  "Test the assumptions",
  "Find the real cause",
  "Model actual work",
  "Include hidden activities",
  "Follow the telephone",
  "The workaround matters",
  "Measure the baseline",
  "Capture current performance",
  "Look beyond the desk",
  "Waiting stays visible",
  "Find customer value",
  "Separate cause and symptom",
  "Listen to employees",
  "Discover exceptions",
  "Validate the findings",
  "Protect credibility",
  "Evidence guides Innovate",
  "Compare future results",
  "Make redesign defensible",
  "Observe the real journey"
];

function render(r,i,n){
  const b=i;

  move(r,".a-guest",
    b<3?0:b<8?42:b<14?75:b<22?98:115,
    b%2===0?0:-3);

  show(r,".a-queue",b>=3&&b<19);
  show(r,".a-phone",b>=14&&b<24);
  show(r,".a-wait",b>=3&&b<23);

  move(r,".a-lens",
    b<3?-92:b<8?-40:b<14?0:b<20?52:
    b<25?-24:0,
    b<8?20:b<20?-6:0,
    b>=25?1.08:1);

  show(r,".a-question",
    (b>=9&&b<=13)||(b>=22&&b<=25));

  show(r,".a-evidence",b>=26);

  show(r,".a-ruler",b>=17&&b<=24);
  show(r,".a-phases",b>=26);

  set(r,".a-route","strokeDashoffset",
    b>=26?"0":b>=13?"140":"320");

  set(r,".a-lobby","opacity",b>=26?".4":"1");

  label(r,captions[Math.min(b,captions.length-1)]);
}

window.VL_SCENES.W8O1a=
  sceneFactory("W8O1a",body,render);
}

// ================================================================
// SCENE 2 — W8O1b
// THE PROCESS NOBODY WROTE DOWN
//
// Original visual: THE FOUR-LANE CONVEYOR
//
// A physical parcel-like guest case travels through four operational
// lanes. Mechanical transfer gates expose four handoffs.
// A hidden telephone branch and a re-entry loop appear when the
// official route proves incomplete.
//
// Motion vocabulary:
// Moving case token, belt motion, gate lifting, phone interruption,
// exception detour, repeated-data stamping, staff validation.
// ================================================================

{
const lanes=[
  {y:83,name:"GUEST",color:C.navy},
  {y:148,name:"RECEPTION",color:C.green},
  {y:213,name:"REVENUE",color:C.orange},
  {y:278,name:"ROOM TEAM",color:C.navy}
];

const laneMarkup=lanes.map((p,j)=>`
  <g class="b-lane-${j}">
    ${rect(25,p.y,290,54,
      j%2===0?C.blue:C.paper,9,
      `opacity="${j%2===0?.48:.75}"`)}
    ${rect(25,p.y,6,54,p.color,3)}
    ${txt(91,p.y+18,p.name,10,p.color)}
    ${path(`M43 ${p.y+39} H297`,p.color,2,
      'stroke-dasharray="8 9" opacity=".35"')}
  </g>
`).join("");

const body=`
<g class="vls-w08-camera">

${txt(170,26,"THE HIDDEN WORK",15,C.navy)}

${laneMarkup}

<g class="b-machinery">
  ${[0,1,2,3].map(j=>`
    <g class="b-wheel b-wheel-${j}">
      ${gear(275,118+j*65,10,
        j%2===0?C.navy:C.green)}
    </g>
  `).join("")}
</g>

<path class="b-trail" d=" M45 118 H242 Q268 118 268 146 V183 H87 Q60 183 60 210 V248 H245 Q269 248 269 277
  V313 H295" fill="none" stroke="${C.green}" stroke-width="5" stroke-linecap="round"/>  <g class="b-token vls-w08-motion"> ${rect(-17,-14,34,28,C.navy,7)} ${circle(0,0,5,C.paper)}
  ${path("M-7 -19 H7",C.orange,3)}
</g>

<g class="b-gate b-gate-0 vls-w08-motion">
  ${rect(233,130,39,11,C.orange,5)}
  ${path("M252 141 V163",C.orange,3)}
</g>

<g class="b-gate b-gate-1 vls-w08-motion">
  ${rect(46,195,39,11,C.orange,5)}
  ${path("M65 206 V228",C.orange,3)}
</g>

<g class="b-gate b-gate-2 vls-w08-motion">
  ${rect(233,260,39,11,C.orange,5)}
  ${path("M252 271 V293",C.orange,3)}
</g>

<g class="b-phone vls-w08-fade">
  ${circle(169,213,27,C.paper,
    `stroke="${C.orange}" stroke-width="3"`)}
  ${path("M159 203 Q153 213 165 224 Q176 233 181 221",
    C.orange,5)}
  ${txt(169,253,"RATE CALL",11,C.orange)}
</g>

<g class="b-duplicate vls-w08-fade">
  ${[0,1,2].map(j=>`
    <g transform="translate(${101+j*47} 68)">
      ${rect(-17,-12,34,24,C.paper,3,
        `stroke="${C.orange}" stroke-width="2"`)}
      ${path("M-10 -4 H10 M-10 3 H5",C.orange,2)}
    </g>
  `).join("")}
  ${txt(170,59,"REPEATED ENTRY",11,C.orange)}
</g>

<g class="b-exception vls-w08-fade">
  ${path("M97 248 Q50 245 50 304 Q50 335 103 330",
    C.orange,4,'stroke-dasharray="6 5"')}
  ${circle(102,330,9,C.orange)}
  ${txt(162,349,"EXCEPTION ROUTE",11,C.orange)}
</g>

<g class="b-validation vls-w08-fade">
  ${person(107,340,C.navy,.62)}
  ${person(153,340,C.green,.62)}
  ${person(199,340,C.orange,.62)}
  ${path("M221 337 l8 8 15 -18",C.green,4)}
</g>

${circle(170,190,25,C.orange,
  'class="vls-w08-glint" opacity=".08"')}

</g>
`;

const captions=[
  "Follow the actual work",
  "Procedures hide activity",
  "Question the description",
  "The official route",
  "Actual work differs",
  "Follow every department",
  "Responsibilities emerge",
  "Swimlanes reveal ownership",
  "Find the handoffs",
  "Four transfer points",
  "Work waits between teams",
  "Corporate rate uncertainty",
  "An informal telephone call",
  "The hidden workaround",
  "Workarounds have purposes",
  "The model is incomplete",
  "Observe real arrivals",
  "Find exceptional paths",
  "Booking discrepancies",
  "Include meaningful detail",
  "Avoid excessive detail",
  "Observe and distinguish",
  "Compare the evidence",
  "Validate conflicting accounts",
  "Employees know dependencies",
  "Build a recognisable model",
  "Do not redesign yet",
  "Investigate the handoffs",
  "Model the actual process",
  "Defend the evidence"
];

const route=[
  [45,118],[110,118],[180,118],[242,118],
  [260,150],[200,183],[125,183],[65,210],
  [105,248],[170,248],[245,248],[265,280],
  [269,313],[295,313]
];

function render(r,i,n){
  const k=Math.min(route.length-1,
    Math.floor(i*(route.length-1)/
      Math.max(1,n-1)));

  const [x,y]=route[k];

  const token=r.querySelector(".b-token");
  if(token)token.setAttribute("transform",
    `translate(${x} ${y})`);

  set(r,".b-trail","strokeDashoffset",
    Math.max(0,400-i*13));

  show(r,".b-phone",i>=11&&i<=17);
  show(r,".b-duplicate",i>=13&&i<=17);
  show(r,".b-exception",i>=17&&i<=23);
  show(r,".b-validation",i>=24);

  move(r,".b-gate-0",0,i>=8?-16:0);
  move(r,".b-gate-1",0,i>=11?-16:0);
  move(r,".b-gate-2",0,i>=18?-16:0);

  for(let j=0;j<4;j++)
    rotate(r,`.b-wheel-${j}`,
      (i*21)*(j%2?-1:1));

  // A subtle mechanical pulse marks the currently inspected lane.
  for(let j=0;j<4;j++){
    const active=Math.min(3,Math.floor(i/8))===j;
    set(r,`.b-lane-${j}`,"opacity",
      active?"1":".6");
  }

  label(r,captions[Math.min(i,captions.length-1)]);
}

window.VL_SCENES.W8O1b=
  sceneFactory("W8O1b",body,render);
}

// ================================================================
// SCENE 3 — W8O1c
// FINDING EVIDENCE THAT PEOPLE CAN TRUST
//
// Original visual: THE FORENSIC EVIDENCE LABORATORY
//
// A real guest-arrival case sits on a circular investigation table.
// Three evidence instruments approach from different directions:
//
// 1. Direct observation: an optical lens.
// 2. Interviews: two witness microphones.
// 3. System records: a timestamp strip.
//
// The instruments initially disagree. A scanning beam exposes
// unrecorded waiting. Evidence lines then converge, and an
// independent validation seal closes the investigation.
//
// Motion vocabulary:
// Rotating evidence table, independent witness movement,
// scanner sweep, missing-record reveal, convergence and seal.
// ================================================================

{
const body=`
<defs>
  <radialGradient id="w08c-table">
    <stop stop-color="#fff"/>
    <stop offset="1" stop-color="#dbe7f2"/>
  </radialGradient>
</defs>

<g class="vls-w08-camera">

${txt(170,25,"THE EVIDENCE LAB",15,C.navy)}

<circle cx="170" cy="188" r="132"
  fill="none" stroke="${C.blue}" stroke-width="3"
  stroke-dasharray="4 8"/>

<circle cx="170" cy="188" r="94"
  fill="url(#w08c-table)"
  stroke="${C.navy}" stroke-width="3"/>

<circle cx="170" cy="188" r="72"
  fill="none" stroke="${C.navy}"
  stroke-width="1.5" opacity=".24"/>

<g class="c-case">
  ${rect(136,159,68,54,C.paper,8,
    `stroke="${C.navy}" stroke-width="2.5"`)}
  ${path("M149 174 H190 M149 184 H183 M149 194 H174",
    C.navy,3)}
  ${circle(192,203,8,C.orange)}
</g>

<g class="c-lens vls-w08-motion">
  ${circle(83,119,37,C.paper,
    `stroke="${C.navy}" stroke-width="4"`)}
  ${circle(83,119,25,C.blue)}
  ${path("M108 144 L131 168",C.navy,10)}
  ${circle(83,119,11,C.green,'opacity=".3"')}
</g>

<g class="c-witness vls-w08-motion">
  ${person(260,112,C.orange,.85)}
  ${person(292,139,C.green,.68)}
  ${path("M254 144 Q268 153 283 143",
    C.orange,2,'stroke-dasharray="4 5"')}
</g>

<g class="c-record vls-w08-motion">
  ${rect(75,279,190,53,C.paper,7,
    `stroke="${C.navy}" stroke-width="2"`)}
  ${[0,1,2,3,4,5].map(j=>
    rect(89+j*28,294,15,23,
      j===2||j===3?C.orange:C.navy,3,
      `opacity="${j===2||j===3?.22:.8}"`)
  ).join("")}
  ${txt(170,348,"SYSTEM EVENTS",11,C.navy)}
</g>

<g class="c-missing vls-w08-fade">
  ${rect(131,291,65,30,C.paper,3,
    `stroke="${C.orange}" stroke-width="2.5"
    stroke-dasharray="5 4"`)}
  ${txt(163,310,"?",21,C.orange)}
</g>

<g class="c-scanner vls-w08-fade">
  <rect class="c-beam" x="46" y="151"
    width="248" height="7" rx="3"
    fill="${C.green}" opacity=".6"/>
</g>

<g class="c-convergence">
  ${[0,1,2].map(j=>`
    <path class="c-wire c-wire-${j}"
      d="${[ "M110 138 Q140 147 170 188", "M244 131 Q211 145 170 188", "M170 279 V188" ][j]}"
      fill="none" stroke="${[C.navy,C.orange,C.green][j]}"
      stroke-width="3"/>
  `).join("")}
</g>

<g class="c-sample vls-w08-fade">
  ${[0,1,2,3,4].map(j=>`
    ${circle(72+j*49,367,9,
      j===3?C.orange:C.green)}
  `).join("")}
</g>

<g class="c-stamp vls-w08-fade">
  ${circle(170,188,50,C.paper,
    `stroke="${C.green}" stroke-width="5"`)}
  ${circle(170,188,39,"none",
    `stroke="${C.green}" stroke-width="1.5"`)}
  ${check(170,190,C.green)}
  ${txt(170,226,"VALIDATED",11,C.green)}
</g>

${circle(170,188,26,C.orange,
  'class="vls-w08-glint" opacity=".08"')}

</g>
`;

const captions=[
  "Prove the actual process",
  "Evidence must withstand challenge",
  "The director questions",
  "Three different perspectives",
  "Accounts may differ",
  "Investigate the evidence",
  "Walk a complete case",
  "Trace the guest journey",
  "Observe every handoff",
  "Ask the receptionist",
  "Hear the supervisor",
  "Interview separately",
  "Avoid pressured agreement",
  "Compare the accounts",
  "Test explanations",
  "Examine system records",
  "Records omit activities",
  "Find the missing time",
  "Boundaries can mislead",
  "One case is insufficient",
  "Observe different conditions",
  "Choose a meaningful sample",
  "Include exceptions",
  "Compare operating periods",
  "Reconcile contradictions",
  "Investigate differing boundaries",
  "Document uncertainty",
  "Validate with employees",
  "Correct the model",
  "Preserve necessary controls",
  "Build transparent trust",
  "Credibility before consensus",
  "Prepare performance measures",
  "Question the clocks"
];

function render(r,i,n){
  const angle=i*9;

  rotate(r,".c-case",angle*.22);

  move(r,".c-lens",
    i<6?-17:i<15?12:i<23?37:0,
    i%3===0?-5:3,
    i>=25?1.08:1);

  move(r,".c-witness",
    i<10?0:i<15?-25:i<26?9:-10,
    i%2===0?0:-4);

  move(r,".c-record",
    i<15?0:i<23?0:i<28?-6:0,
    i>=15&&i<=23?-11:0);

  show(r,".c-missing",i>=16&&i<=25);
  show(r,".c-scanner",i>=16&&i<=28);

  move(r,".c-beam",0,
    i>=16?(i*19)%130-65:0);

  for(let j=0;j<3;j++){
    set(r,`.c-wire-${j}`,"strokeDashoffset",
      i>=24?0:i>=10+j*3?110:220);
  }

  show(r,".c-sample",i>=19&&i<=27);
  show(r,".c-stamp",i>=28);

  set(r,".c-case","opacity",i>=28?".2":"1");

  label(r,captions[Math.min(i,captions.length-1)]);
}

window.VL_SCENES.W8O1c=
  sceneFactory("W8O1c",body,render);
}

// Append directly after PART 1.
// Uses C, svg, rect, circle, path, txt, person, check,
// mount, set, show, move, rotate, label and sceneFactory
// defined in PART 1.

// ================================================================
// SCENE 4 — W8O2a
// WHOSE CLOCK ARE WE USING?
//
// Original visual: THE THREE-CLOCK OBSERVATORY
//
// A guest journey passes through three concentric clock mechanisms.
// The outer clock measures the complete customer journey.
// The inner clock measures active work.
// A third mechanism separates organisational waiting from waiting
// attributable to customer action.
//
// The clocks rotate independently, revealing why apparently
// contradictory durations can all be legitimate.
//
// Motion vocabulary:
// Rotating hands, concentric rings, expanding boundaries,
// moving guest, illuminated waiting sectors, clock alignment.
// ================================================================

{
const body=`
<defs>
  <radialGradient id="w08d-face">
    <stop stop-color="#fff"/>
    <stop offset="1" stop-color="#dbe7f2"/>
  </radialGradient>
</defs>

<g class="vls-w08-camera">

${txt(170,24,"THREE DIFFERENT CLOCKS",15,C.navy)}

<g class="d-observatory">

  ${circle(170,187,139,"none",
    `stroke="${C.blue}" stroke-width="12"`)}
  ${circle(170,187,118,"none",
    `stroke="${C.navy}" stroke-width="2.5"`)}
  ${circle(170,187,91,"none",
    `stroke="${C.orange}" stroke-width="13" opacity=".22"`)}
  ${circle(170,187,74,"none",
    `stroke="${C.orange}" stroke-width="2"`)}
  ${circle(170,187,48,"url(#w08d-face)",
    `stroke="${C.green}" stroke-width="4"`)}

  ${Array.from({length:12},(_,j)=>{
    const a=(j*30-90)*Math.PI/180;
    const x1=170+105*Math.cos(a);
    const y1=187+105*Math.sin(a);
    const x2=170+114*Math.cos(a);
    const y2=187+114*Math.sin(a);
    return path(`M${x1} ${y1} L${x2} ${y2}`,
      C.navy,j%3===0?3:1.5);
  }).join("")}

  <g class="d-outer-hand vls-w08-motion">
    ${path("M170 187 L170 79",C.navy,5)}
    ${circle(170,79,6,C.navy)}
  </g>

  <g class="d-inner-hand vls-w08-motion">
    ${path("M170 187 L216 142",C.orange,5)}
    ${circle(216,142,5,C.orange)}
  </g>

  <g class="d-third-hand vls-w08-motion">
    ${path("M170 187 L127 210",C.green,4)}
  </g>

  ${circle(170,187,10,C.navy)}
  ${circle(170,187,4,C.paper)}

  <g class="d-guest vls-w08-motion">
    ${person(170,49,C.navy,.62)}
  </g>

  <g class="d-wait-sector vls-w08-motion">
    <path d="M170 187 L170 97 A90 90 0 1 1 84 213 Z"
      fill="${C.orange}" opacity=".14"/>
  </g>

  <g class="d-touch-sector vls-w08-motion">
    <path d="M170 187 L170 139 A48 48 0 0 1 212 163 Z"
      fill="${C.green}" opacity=".55"/>
  </g>

  <g class="d-numbers">
    ${txt(170,176,"21.1",25,C.navy)}
    ${txt(170,197,"DAYS",11,C.navy)}
  </g>

  <g class="d-touch-label vls-w08-fade">
    ${rect(111,166,118,43,C.paper,10,
      `stroke="${C.green}" stroke-width="2"`)}
    ${txt(170,184,"4.1 DAYS",17,C.green)}
    ${txt(170,200,"ACTIVE WORK",10,C.green)}
  </g>

  <g class="d-breakdown vls-w08-fade">
    ${rect(37,321,266,18,C.blue,7)}
    ${rect(37,321,52,18,C.green,7)}
    ${rect(89,321,214,18,C.orange,7)}
    ${txt(68,313,"WORK",10,C.green)}
    ${txt(211,313,"OTHER TIME",10,C.orange)}
    ${txt(170,363,"17 DAYS OUTSIDE ACTIVE WORK",11,C.navy)}
  </g>

  <g class="d-boundary vls-w08-fade">
    ${circle(170,187,143,"none",
      `stroke="${C.green}" stroke-width="3"
      stroke-dasharray="7 7"`)}
    ${txt(170,376,"ARRIVAL TO ROOM ACCESS",11,C.green)}
  </g>

</g>

${circle(170,187,24,C.orange,
  'class="vls-w08-glint" opacity=".08"')}

</g>
`;

const captions=[
  "Choose the clock",
  "Define the boundaries",
  "What starts the timer?",
  "Departmental working time",
  "The guest's journey",
  "Different legitimate answers",
  "Start and stop events",
  "Compare measurement purposes",
  "Elapsed versus active",
  "21.1 days elapsed",
  "Only 4.1 days working",
  "17 days elsewhere",
  "Investigate the intervals",
  "Waiting is not always waste",
  "Return to Qasr",
  "The complete arrival",
  "Reception is one segment",
  "Touch versus elapsed",
  "Waiting extends the journey",
  "Find the dominant delay",
  "Internal and customer time",
  "Separate responsibility",
  "Report time categories",
  "Keep the full boundary",
  "Avoid departmental bias",
  "Choose the programme measure",
  "Preserve start and finish",
  "Do not change clocks",
  "Validate the definitions",
  "Match the objective",
  "Compare equivalent journeys",
  "Defend the complete measure"
];

function render(r,i,n){
  rotate(r,".d-outer-hand",i*23);
  rotate(r,".d-inner-hand",i*53);
  rotate(r,".d-third-hand",-i*31);

  rotate(r,".d-guest",i*7);

  show(r,".d-touch-label",i>=8&&i<=18);
  show(r,".d-breakdown",i>=9&&i<=14);
  show(r,".d-boundary",i>=23);

  set(r,".d-wait-sector","opacity",
    i>=9&&i<=22?".95":".2");

  set(r,".d-touch-sector","opacity",
    i>=8&&i<=18?"1":".18");

  set(r,".d-numbers","opacity",
    i>=8&&i<=13?"1":".28");

  label(r,captions[Math.min(i,captions.length-1)]);
}

window.VL_SCENES.W8O2a=
  sceneFactory("W8O2a",body,render);
}

// ================================================================
// SCENE 5 — W8O2b
// WHEN THE STORY AND THE DATA DISAGREE
//
// Original visual: THE ARRIVAL CONSTELLATION
//
// A single guest experience appears as one bright star.
// The camera pulls back to reveal a much larger constellation of
// arrivals, each with a different duration.
//
// A distribution emerges from the constellation.
// The original guest remains visible rather than disappearing
// behind the average.
//
// Motion vocabulary:
// Starfield reveal, orbital expansion, individual-to-population
// zoom, distribution formation, outlier illumination,
// average marker, reconciliation.
// ================================================================

{
const arrivals=Array.from({length:35},(_,j)=>{
  const a=j*2.399963229728653;
  const radius=25+Math.sqrt(j/34)*119;
  return {
    x:170+radius*Math.cos(a),
    y:187+radius*Math.sin(a)*.88,
    delay:8+((j*17+Math.floor(j/5)*9)%83),
    special:j===0
  };
});

const stars=arrivals.map((p,j)=>`
  <g class="e-star e-star-${j} vls-w08-motion">
    ${circle(p.x,p.y,j===0?9:4.5,
      j===0?C.orange:j%7===0?C.orange:C.navy)}
    ${circle(p.x,p.y,j===0?17:8,"none",
      `stroke="${j===0?C.orange:C.blue}"
      stroke-width="1.5"`)}
  </g>
`).join("");

const body=`
<defs>
  <radialGradient id="w08e-sky">
    <stop stop-color="#dbe7f2" stop-opacity=".7"/>
    <stop offset="1" stop-color="#fbf8f1" stop-opacity="0"/>
  </radialGradient>
</defs>

<g class="vls-w08-camera">

${txt(170,25,"ONE STORY · MANY ARRIVALS",14,C.navy)}

${circle(170,187,150,"url(#w08e-sky)")}

<g class="e-orbits">
  ${circle(170,187,125,"none",
    `stroke="${C.blue}" stroke-width="1.5"
    stroke-dasharray="4 7"`)}
  ${circle(170,187,80,"none",
    `stroke="${C.blue}" stroke-width="1.5"
    stroke-dasharray="4 7"`)}
</g>

<g class="e-stars">
  ${stars}
</g>

<g class="e-guest vls-w08-motion">
  ${circle(170,187,38,C.paper,
    `stroke="${C.orange}" stroke-width="3"`)}
  ${person(170,190,C.navy,.85)}
  ${txt(170,232,"23 MIN",13,C.orange)}
</g>

<g class="e-magnifier vls-w08-fade">
  ${circle(170,187,56,"none",
    `stroke="${C.orange}" stroke-width="4"`)}
  ${path("M211 228 L248 266",C.orange,10)}
</g>

<g class="e-distribution vls-w08-fade">
  ${rect(27,276,286,84,C.paper,9,
    `stroke="${C.blue}" stroke-width="2"`)}
  ${Array.from({length:17},(_,j)=>{
    const height=14+((j*13+7)%48);
    return rect(39+j*16,344-height,11,height,
      j===14?C.orange:C.navy,3,
      `opacity="${j===14?1:.65}"`);
  }).join("")}
  ${path("M38 344 H301",C.navy,2)}
  ${txt(170,372,"ARRIVAL DISTRIBUTION",11,C.navy)}
</g>

<g class="e-mean vls-w08-fade">
  ${path("M170 281 V349",C.green,3,
    'stroke-dasharray="5 5"')}
  ${rect(127,263,86,27,C.green,13)}
  ${txt(170,281,"AVERAGE",12,C.paper)}
</g>

<g class="e-outlier vls-w08-fade">
  ${circle(279,153,20,"none",
    `stroke="${C.orange}" stroke-width="3"`)}
  ${path("M293 168 L310 186",C.orange,4)}
</g>

<g class="e-complement vls-w08-fade">
  ${circle(104,348,18,C.orange)}
  ${circle(236,348,18,C.green)}
  ${path("M123 348 H217",C.navy,3)}
  ${txt(104,353,"1",14,C.paper)}
  ${txt(236,353,"N",14,C.paper)}
  ${txt(170,379,"CASE + PATTERN",11,C.navy)}
</g>

${circle(170,187,25,C.orange,
  'class="vls-w08-glint" opacity=".08"')}

</g>
`;

const captions=[
  "A memorable experience",
  "Return to the traveller",
  "Twenty-three minutes",
  "A genuine problem",
  "Can one case represent all?",
  "One case is insufficient",
  "Individual versus population",
  "The complaint still matters",
  "Investigate the pattern",
  "Memorable difficult arrivals",
  "Other arrivals differ",
  "Unusual events dominate memory",
  "Seek wider evidence",
  "Select an arrival sample",
  "Capture meaningful variation",
  "Quiet and busy periods",
  "Compare operating conditions",
  "Calculate the average",
  "An average is not everyone",
  "Arrivals vary",
  "Inspect the distribution",
  "Find unusually long cases",
  "Rare or recurring?",
  "Choose proportionate action",
  "Do not dismiss complaints",
  "Averages can conceal hardship",
  "Use both evidence types",
  "Patterns and mechanisms",
  "Keep boundaries consistent",
  "Preserve the original story",
  "Evidence establishes prevalence",
  "Investigate before concluding",
  "One story is not all"
];

function render(r,i,n){
  const reveal=Math.min(arrivals.length,
    Math.max(1,Math.floor(i*arrivals.length/16)));

  arrivals.forEach((p,j)=>{
    const visible=j<reveal;
    const star=r.querySelector(`.e-star-${j}`);
    if(!star)return;

    star.style.opacity=visible?"1":"0";

    const expansion=Math.min(1,i/15);
    const x=(170-p.x)*(1-expansion);
    const y=(187-p.y)*(1-expansion);

    star.style.transform=
      `translate(${x}px,${y}px) scale(${visible?1:.2})`;
  });

  move(r,".e-guest",
    i<5?0:i<12?-45:i<20?-65:0,
    i<5?0:i<20?-36:0,
    i<5?1.1:i<12?.82:.55);

  show(r,".e-magnifier",i>=2&&i<=8);
  show(r,".e-distribution",i>=17&&i<=29);
  show(r,".e-mean",i>=17&&i<=25);
  show(r,".e-outlier",i>=20&&i<=26);
  show(r,".e-complement",i>=26);

  rotate(r,".e-orbits",i*3);

  set(r,".e-stars","opacity",i>=27?".45":"1");

  label(r,captions[Math.min(i,captions.length-1)]);
}

window.VL_SCENES.W8O2b=
  sceneFactory("W8O2b",body,render);
}

// ================================================================
// SCENE 6 — W8O2c
// TWENTY-THREE MINUTES OR EIGHTY-TWO?
//
// Original visual: THE THREE-LEVEL ARRIVAL CUTAWAY
//
// A hotel is opened like an architectural cross-section.
//
// Level 1: booking-to-key system interval — 12.4 minutes.
// Level 2: the original guest's reception interval — 23 minutes.
// Level 3: the complete arrival journey — 82.0 minutes.
//
// A lift moves between levels, revealing what each clock includes.
// The 47-minute corporate-rate approval dependency appears as a
// large suspended chamber on the complete journey.
//
// The final camera position shows the complete hotel and retains
// all three measures without confusing their populations.
//
// Motion vocabulary:
// Architectural cutaway, vertical lift, boundary expansion,
// suspended approval chamber, evidence sampling, final baseline.
// ================================================================

{
const body=`
<defs>
  <linearGradient id="w08f-building" x1="0" y1="0" x2="1" y2="1">
    <stop stop-color="#dbe7f2"/>
    <stop offset="1" stop-color="#fbf8f1"/>
  </linearGradient>
</defs>

<g class="vls-w08-camera">

${txt(170,24,"THREE MEASURES · ONE PROCESS",14,C.navy)}

<g class="f-building">
  ${rect(35,51,270,284,"url(#w08f-building)",12,
    `stroke="${C.navy}" stroke-width="3"`)}
  ${path("M35 143 H305 M35 235 H305",C.navy,2,
    'opacity=".4"')}

  ${[0,1,2].map(j=>`
    <g class="f-floor-${j}">
      ${rect(46,62+j*92,248,71,C.paper,6,
        `opacity="${j===0?.85:.68}"`)}
      ${[0,1,2,3].map(k=>
        rect(62+k*58,78+j*92,37,34,C.blue,4,
          `stroke="${C.navy}" stroke-width="1"
          opacity=".6"`)
      ).join("")}
    </g>
  `).join("")}
</g>

<g class="f-system vls-w08-motion">
  ${rect(51,76,238,49,C.paper,8,
    `stroke="${C.navy}" stroke-width="2.5"`)}
  ${circle(78,101,12,C.navy)}
  ${path("M96 101 H252",C.navy,4)}
  ${circle(252,101,10,C.green)}
  ${txt(170,91,"SYSTEM CLOCK",11,C.navy)}
  ${txt(170,117,"12.4 MIN",17,C.navy)}
</g>

<g class="f-reception vls-w08-motion">
  ${rect(51,168,238,49,C.paper,8,
    `stroke="${C.orange}" stroke-width="2.5"`)}
  ${person(83,200,C.navy,.6)}
  ${rect(111,193,50,9,C.orange,3)}
  ${rect(118,202,36,17,C.navy,3)}
  ${txt(217,190,"23 MIN",17,C.orange)}
  ${txt(217,208,"ONE GUEST",10,C.orange)}
</g>

<g class="f-complete vls-w08-motion">
  ${rect(51,260,238,49,C.paper,8,
    `stroke="${C.green}" stroke-width="3"`)}
  ${person(75,293,C.navy,.55)}
  ${path("M101 286 H185",C.green,4)}
  ${circle(187,286,8,C.green)}
  ${txt(232,284,"82.0",19,C.green)}
  ${txt(232,300,"MIN",11,C.green)}
</g>

<g class="f-lift vls-w08-motion">
  ${rect(18,65,23,252,C.blue,5,
    `stroke="${C.navy}" stroke-width="2"`)}
  ${rect(19,73,21,38,C.navy,4)}
  ${circle(29,91,5,C.paper)}
</g>

<g class="f-approval vls-w08-fade">
  ${rect(74,143,192,90,C.paper,12,
    `stroke="${C.orange}" stroke-width="3"`)}
  ${circle(170,174,25,C.orange)}
  ${path("M170 157 V174 L183 181",C.paper,3)}
  ${txt(170,212,"47-MIN APPROVAL",14,C.orange)}
  ${txt(170,227,"61% OF ARRIVALS",11,C.orange)}
</g>

<g class="f-sample vls-w08-fade">
  ${Array.from({length:14},(_,j)=>{
    const x=48+(j%7)*40;
    const y=347+Math.floor(j/7)*20;
    return circle(x,y,6,
      j%3===0?C.orange:C.navy);
  }).join("")}
  ${txt(170,382,"310 ARRIVALS · 14 PROPERTIES",11,C.navy)}
</g>

<g class="f-baseline vls-w08-fade">
  ${rect(69,338,202,34,C.green,16)}
  ${txt(170,360,"END-TO-END BASELINE",13,C.paper)}
</g>

${circle(170,190,26,C.orange,
  'class="vls-w08-glint" opacity=".08"')}

</g>
`;

const captions=[
  "Three competing numbers",
  "Which number matters?",
  "Match the programme objective",
  "Different measurement boundaries",
  "Return to the traveller",
  "The original 23 minutes",
  "One guest, one observation",
  "The system reports 12.4",
  "Booking opened to key",
  "A narrow system interval",
  "Accurate within its boundary",
  "Fourteen Qasr properties",
  "310 corporate arrivals",
  "Lobby to released room",
  "The mean is 82.0",
  "A sample average",
  "Not every guest waits equally",
  "Explain the differences",
  "Boundaries and populations",
  "The 47-minute dependency",
  "61 percent affected",
  "A cross-department wait",
  "Reception speed is insufficient",
  "Preserve necessary controls",
  "Include experienced waiting",
  "The director challenges",
  "Department versus programme",
  "Accountability is distinct",
  "The whole journey matters",
  "Validate the baseline",
  "Agree the measurement",
  "Keep departmental indicators",
  "Avoid false improvement",
  "Choose the relevant clock",
  "Preserve all three figures",
  "Defend the baseline"
];

function render(r,i,n){
  const level=i<7?1:i<12?0:i<19?2:
    i<25?1:2;

  const lift=r.querySelector(".f-lift rect:nth-child(2)");
  if(lift){
    lift.setAttribute("y",73+level*92);
  }

  const liftLight=r.querySelector(".f-lift circle");
  if(liftLight){
    liftLight.setAttribute("cy",91+level*92);
  }

  set(r,".f-system","opacity",
    i>=7&&i<12?"1":".3");

  set(r,".f-reception","opacity",
    i<7||i>=25&&i<29?"1":".3");

  set(r,".f-complete","opacity",
    i>=12?"1":".3");

  show(r,".f-approval",i>=19&&i<=24);
  show(r,".f-sample",i>=11&&i<=18);
  show(r,".f-baseline",i>=29);

  move(r,".f-building",
    i>=19&&i<=24?0:0,
    i>=19&&i<=24?-6:0,
    i>=29?.94:1);

  label(r,captions[Math.min(i,captions.length-1)]);
}

window.VL_SCENES.W8O2c=
  sceneFactory("W8O2c",body,render);
}

// Append directly after PART 2.
// Three original cinematic scenes, one per section.

// ================================================================
// SCENE 7 — W8O3a
// THE BOTTLENECK IS NOT ALWAYS WHERE THE QUEUE APPEARS
//
// Original visual: THE GLASS PIPELINE
//
// A transparent process pipeline carries individual guest cases.
// The cases flow freely through reception but accumulate behind
// an upstream approval valve. The valve constricts, pressure
// rises, and a queue forms far from the visible reception desk.
//
// The scene distinguishes where waiting becomes visible from
// where the underlying constraint originates.
//
// Motion vocabulary:
// Flowing cases, valve constriction, pressure expansion,
// upstream illumination, queue accumulation, bypass testing,
// restored flow.
// ================================================================

{
const body=`
<defs>
  <linearGradient id="w08g-pipe" x1="0" y1="0" x2="0" y2="1">
    <stop stop-color="#dbe7f2" stop-opacity=".45"/>
    <stop offset=".5" stop-color="#ffffff" stop-opacity=".85"/>
    <stop offset="1" stop-color="#dbe7f2" stop-opacity=".65"/>
  </linearGradient>
</defs>

<g class="vls-w08-camera">

${txt(170,24,"FIND THE REAL CONSTRAINT",14,C.navy)}

<g class="g-pipeline">
  ${rect(18,149,304,77,"url(#w08g-pipe)",37,
    `stroke="${C.navy}" stroke-width="3"`)}
  ${path("M24 170 H316 M24 205 H316",
    C.navy,1.5,'opacity=".2"')}

  <g class="g-flow">
    ${Array.from({length:9},(_,j)=>`
      <g class="g-case g-case-${j} vls-w08-motion">
        ${rect(-12,-11,24,22,
          j%3===0?C.orange:C.navy,5)}
        ${circle(0,0,4,C.paper)}
      </g>
    `).join("")}
  </g>

  <g class="g-valve vls-w08-motion">
    ${rect(157,124,26,127,C.paper,7,
      `stroke="${C.navy}" stroke-width="3"`)}
    ${circle(170,116,32,C.blue,
      `stroke="${C.navy}" stroke-width="3"`)}
    ${path("M148 116 H192 M170 94 V138",C.navy,5)}
    ${circle(170,116,7,C.orange)}
  </g>

  <g class="g-constriction vls-w08-motion">
    ${path("M157 155 L170 187 L157 220",
      C.orange,5)}
    ${path("M183 155 L170 187 L183 220",
      C.orange,5)}
  </g>

  <g class="g-pressure vls-w08-fade">
    ${circle(101,187,66,C.orange,'opacity=".11"')}
    ${circle(101,187,48,"none",
      `stroke="${C.orange}" stroke-width="2"
      stroke-dasharray="5 6"`)}
    ${txt(101,267,"QUEUE BUILDS",12,C.orange)}
  </g>

  <g class="g-reception">
    ${rect(248,265,63,15,C.orange,4)}
    ${rect(255,280,49,38,C.navy,5)}
    ${person(279,258,C.navy,.65)}
    ${txt(279,340,"RECEPTION",11,C.navy)}
  </g>

  <g class="g-approval vls-w08-fade">
    ${rect(76,56,188,42,C.paper,10,
      `stroke="${C.orange}" stroke-width="2.5"`)}
    ${circle(102,77,13,C.orange)}
    ${path("M102 69 V77 L110 82",C.paper,2.5)}
    ${txt(187,74,"RATE APPROVAL",12,C.orange)}
    ${txt(187,89,"UPSTREAM DELAY",10,C.orange)}
    ${path("M170 99 V124",C.orange,3,
      'stroke-dasharray="5 4"')}
  </g>

  <g class="g-bypass vls-w08-fade">
    ${path("M84 149 V107 Q84 85 106 85 H236 Q258 85 258 107 V149",
      C.green,5)}
    ${circle(258,108,9,C.green)}
    ${check(258,108,C.paper)}
  </g>

  <g class="g-throughput vls-w08-fade">
    ${path("M34 362 H306",C.green,3)}
    ${Array.from({length:7},(_,j)=>
      circle(58+j*38,362,7,C.green)
    ).join("")}
    ${txt(170,383,"FLOW RESTORED",12,C.green)}
  </g>

  ${circle(170,188,25,C.orange,
    'class="vls-w08-glint" opacity=".08"')}
</g>

</g>
`;

const captions=[
  "Find the constraint",
  "Visible queues mislead",
  "Follow the complete flow",
  "Reception appears congested",
  "Cases arrive continuously",
  "Work accumulates upstream",
  "Investigate the approval",
  "A narrow transfer",
  "Pressure begins building",
  "The queue expands",
  "Waiting spreads downstream",
  "Locate the actual cause",
  "Distinguish cause and symptom",
  "Test the dependency",
  "The valve controls flow",
  "Capacity is not enough",
  "Protect required controls",
  "Explore alternative routing",
  "Test the possible bypass",
  "Avoid moving the queue",
  "Consider the entire system",
  "Check the consequences",
  "Observe the new flow",
  "Measure the result",
  "Validate the improvement",
  "Preserve the baseline",
  "Evidence before intervention",
  "Find the real bottleneck"
];

function render(r,i,n){
  const valveAngle=i<7?0:i<16?i*9:
    i<21?90:Math.max(0,90-(i-21)*18);

  rotate(r,".g-valve",valveAngle);

  const blocked=i>=7&&i<=20;
  const released=i>=21;

  for(let j=0;j<9;j++){
    const e=r.querySelector(`.g-case-${j}`);
    if(!e)continue;

    let x;

    if(i<7){
      x=28+((i*19+j*38)%284);
    }else if(blocked){
      x=34+(j%7)*17+
        Math.min(18,i-7)*1.3;
    }else{
      x=28+((i*31+j*41)%284);
    }

    const y=187+
      (blocked&&j%3===0?-12:
       blocked&&j%3===1?12:0);

    e.setAttribute("transform",
      `translate(${x} ${y})`);

    e.style.opacity=blocked&&j>=7?".3":"1";
  }

  show(r,".g-pressure",i>=8&&i<=20);
  show(r,".g-approval",i>=6&&i<=19);
  show(r,".g-bypass",i>=17&&i<=23);
  show(r,".g-throughput",i>=22);

  set(r,".g-constriction","opacity",
    blocked?"1":".15");

  move(r,".g-constriction",
    0,0,blocked?1:.3);

  set(r,".g-reception","opacity",
    i>=3&&i<=13?"1":".5");

  label(r,captions[Math.min(i,captions.length-1)]);
}

window.VL_SCENES.W8O3a=
  sceneFactory("W8O3a",body,render);
}

// ================================================================
// SCENE 8 — W8O3b
// THE CAUSE IS BURIED UNDER THE SYMPTOM
//
// Original visual: THE ROOT-Cause TREE
//
// Above ground, a hotel arrival queue appears as the visible
// problem. Below ground, a branching root system reveals the
// underlying mechanisms: rate uncertainty, approval dependencies,
// unclear ownership, and rework.
//
// A descending investigation light follows the roots.
// The scene is an environmental cutaway, not a fishbone diagram
// or another process-flow template.
//
// Motion vocabulary:
// Queue growth, ground opening, roots growing, investigative
// descent, branch highlighting, cause validation.
// ================================================================

{
const body=`
<defs>
  <linearGradient id="w08h-soil" x1="0" y1="0" x2="0" y2="1">
    <stop stop-color="#e5d7c2"/>
    <stop offset="1" stop-color="#c4aa89"/>
  </linearGradient>
</defs>

<g class="vls-w08-camera">

${txt(170,24,"DIG BELOW THE SYMPTOM",14,C.navy)}

<g class="h-surface">

  ${path("M20 174 H320",C.navy,3)}

  ${rect(20,177,300,184,"url(#w08h-soil)",7,
    'opacity=".72"')}

  <g class="h-hotel">
    ${rect(119,58,102,103,C.paper,5,
      `stroke="${C.navy}" stroke-width="2.5"`)}
    ${rect(133,74,24,28,C.blue,3)}
    ${rect(164,74,24,28,C.blue,3)}
    ${rect(195,74,14,28,C.blue,3)}
    ${rect(151,117,38,44,C.navy,3)}
    ${rect(159,126,22,8,C.orange,2)}
  </g>

  <g class="h-queue">
    ${person(62,164,C.navy,.68)}
    ${person(91,164,C.orange,.68)}
    ${person(250,164,C.navy,.68)}
    ${person(279,164,C.orange,.68)}
  </g>

  <g class="h-more-queue vls-w08-fade">
    ${person(34,164,C.orange,.55)}
    ${person(306,164,C.navy,.55)}
  </g>

  <g class="h-trunk">
    ${path("M170 177 V232",C.navy,9)}
  </g>

  <g class="h-roots">
    <path class="h-root h-root-0 vls-w08-draw"
      d="M170 231 Q118 241 76 287 Q57 307 41 334"
      fill="none" stroke="${C.orange}"
      stroke-width="6" stroke-linecap="round"/>

    <path class="h-root h-root-1 vls-w08-draw"
      d="M170 231 Q135 274 122 329"
      fill="none" stroke="${C.navy}"
      stroke-width="6" stroke-linecap="round"/>

    <path class="h-root h-root-2 vls-w08-draw"
      d="M170 231 Q208 260 222 324"
      fill="none" stroke="${C.green}"
      stroke-width="6" stroke-linecap="round"/>

    <path class="h-root h-root-3 vls-w08-draw"
      d="M170 231 Q240 244 288 326"
      fill="none" stroke="${C.orange}"
      stroke-width="6" stroke-linecap="round"/>
  </g>

  <g class="h-causes">
    <g class="h-cause-0 vls-w08-fade">
      ${circle(49,331,19,C.paper,
        `stroke="${C.orange}" stroke-width="2"`)}
      ${txt(49,337,"?",22,C.orange)}
      ${txt(70,365,"RATE RULES",10,C.orange)}
    </g>

    <g class="h-cause-1 vls-w08-fade">
      ${circle(122,329,19,C.paper,
        `stroke="${C.navy}" stroke-width="2"`)}
      ${path("M122 318 V330 L133 336",C.navy,3)}
      ${txt(123,365,"APPROVAL",10,C.navy)}
    </g>

    <g class="h-cause-2 vls-w08-fade">
      ${circle(222,329,19,C.paper,
        `stroke="${C.green}" stroke-width="2"`)}
      ${person(222,336,C.green,.45)}
      ${txt(220,365,"OWNERSHIP",10,C.green)}
    </g>

    <g class="h-cause-3 vls-w08-fade">
      ${circle(288,329,19,C.paper,
        `stroke="${C.orange}" stroke-width="2"`)}
      ${path("M279 329 Q289 314 298 329 M298 329 L291 324 M298 329 L298 321",
        C.orange,2.5)}
      ${txt(288,365,"REWORK",10,C.orange)}
    </g>
  </g>

  <g class="h-investigation vls-w08-motion">
    ${circle(170,206,28,"none",
      `stroke="${C.green}" stroke-width="3"`)}
    ${circle(170,206,6,C.green)}
    ${path("M170 176 V193 M170 219 V236 M140 206 H157 M183 206 H200",
      C.green,2)}
  </g>

  <g class="h-validation vls-w08-fade">
    ${circle(170,270,39,C.paper,
      `stroke="${C.green}" stroke-width="4"`)}
    ${check(170,273,C.green)}
    ${txt(170,319,"CAUSE VERIFIED",11,C.green)}
  </g>

</g>

${circle(170,190,24,C.orange,
  'class="vls-w08-glint" opacity=".08"')}

</g>
`;

const captions=[
  "The visible problem",
  "A growing arrival queue",
  "Symptoms attract attention",
  "Look beneath the surface",
  "Ask why it happens",
  "Follow the first cause",
  "Rate rules are unclear",
  "Trace the approval",
  "Dependencies create waiting",
  "Who owns the decision?",
  "Ownership becomes uncertain",
  "Work returns for correction",
  "Rework extends the journey",
  "Causes can interact",
  "Avoid a single explanation",
  "Test each causal branch",
  "Evidence supports the roots",
  "Distinguish association",
  "Check causal mechanisms",
  "Challenge easy assumptions",
  "Investigate alternative causes",
  "Employees explain workarounds",
  "Records reveal timing",
  "Validate the explanation",
  "Preserve necessary checks",
  "Identify actionable causes",
  "Correct the underlying system",
  "Do not trim symptoms",
  "Make causes defensible",
  "The roots determine action"
];

function render(r,i,n){
  show(r,".h-more-queue",i>=2&&i<=12);

  const roots=r.querySelectorAll(".h-root");

  roots.forEach((e,j)=>{
    const start=5+j*3;
    const fraction=Math.max(0,
      Math.min(1,(i-start)/5));

    e.style.strokeDashoffset=
      String(500*(1-fraction));
  });

  for(let j=0;j<4;j++)
    show(r,`.h-cause-${j}`,i>=6+j*3);

  move(r,".h-investigation",
    i<4?0:
    i<9?-72:
    i<14?-42:
    i<19?52:
    i<24?105:0,
    i<4?-52:
    i<9?45:
    i<14?83:
    i<19?87:
    i<24?100:64,
    i>=24?1.15:1);

  show(r,".h-validation",i>=25);

  set(r,".h-hotel","opacity",
    i>=14?".4":"1");

  set(r,".h-queue","opacity",
    i>=14?".35":"1");

  label(r,captions[Math.min(i,captions.length-1)]);
}

window.VL_SCENES.W8O3b=
  sceneFactory("W8O3b",body,render);
}

// ================================================================
// SCENE 9 — W8O3c
// TURNING FINDINGS INTO A DEFENSIBLE DIAGNOSIS
//
// Original visual: THE EVIDENCE COMPASS
//
// A physical compass rests on a circular investigation platform.
// Four evidence sources occupy the cardinal directions:
//
// NORTH: customer experience
// EAST: system records
// SOUTH: direct observation
// WEST: employee accounts
//
// The compass needle moves from one evidence source to another.
// Initially, the four signals disagree. As evidence is reconciled,
// the needle settles and the central diagnosis becomes stable.
//
// Motion vocabulary:
// Independent orbiting evidence instruments, compass needle
// rotation, conflicting signal arcs, convergence, diagnostic lock.
// ================================================================

{
const body=`
<defs>
  <radialGradient id="w08i-dial">
    <stop stop-color="#ffffff"/>
    <stop offset=".72" stop-color="#fbf8f1"/>
    <stop offset="1" stop-color="#dbe7f2"/>
  </radialGradient>
</defs>

<g class="vls-w08-camera">

${txt(170,24,"BUILD A DEFENSIBLE DIAGNOSIS",13,C.navy)}

<g class="i-compass">

  ${circle(170,195,127,"url(#w08i-dial)",
    `stroke="${C.navy}" stroke-width="4"`)}
  ${circle(170,195,113,"none",
    `stroke="${C.orange}" stroke-width="1.5"
    stroke-dasharray="4 7"`)}
  ${circle(170,195,90,"none",
    `stroke="${C.navy}" stroke-width="1.5"
    opacity=".28"`)}

  ${Array.from({length:24},(_,j)=>{
    const a=(j*15-90)*Math.PI/180;
    const x1=170+101*Math.cos(a);
    const y1=195+101*Math.sin(a);
    const x2=170+(j%3===0?112:107)*Math.cos(a);
    const y2=195+(j%3===0?112:107)*Math.sin(a);
    return path(`M${x1} ${y1} L${x2} ${y2}`,
      C.navy,j%3===0?2.5:1);
  }).join("")}

  <g class="i-north vls-w08-motion">
    ${circle(170,70,27,C.paper,
      `stroke="${C.orange}" stroke-width="2.5"`)}
    ${person(170,76,C.orange,.58)}
    ${txt(170,42,"CUSTOMER",10,C.orange)}
  </g>

  <g class="i-east vls-w08-motion">
    ${circle(295,195,27,C.paper,
      `stroke="${C.navy}" stroke-width="2.5"`)}
    ${rect(281,183,28,24,C.navy,3)}
    ${path("M286 190 H304 M286 196 H300 M286 202 H305",
      C.paper,2)}
    ${txt(295,235,"RECORDS",10,C.navy)}
  </g>

  <g class="i-south vls-w08-motion">
    ${circle(170,320,27,C.paper,
      `stroke="${C.green}" stroke-width="2.5"`)}
    ${circle(170,319,12,"none",
      `stroke="${C.green}" stroke-width="3"`)}
    ${circle(170,319,5,C.green)}
    ${txt(170,363,"OBSERVATION",10,C.green)}
  </g>

  <g class="i-west vls-w08-motion">
    ${circle(45,195,27,C.paper,
      `stroke="${C.orange}" stroke-width="2.5"`)}
    ${person(39,202,C.navy,.43)}
    ${person(53,202,C.orange,.43)}
    ${txt(45,235,"EMPLOYEES",10,C.orange)}
  </g>

  <g class="i-needle vls-w08-motion">
    <path d="M170 109 L184 195 L170 208 L156 195 Z" fill="${C.orange}"/>
    <path d="M170 281 L184 195 L170 208 L156 195 Z" fill="${C.navy}"/>
  </g>

  ${circle(170,195,15,C.paper,
    `stroke="${C.navy}" stroke-width="3"`)}
  ${circle(170,195,6,C.orange)}

  <g class="i-conflict vls-w08-fade">
    ${path("M95 127 Q170 75 245 127",
      C.orange,4,'stroke-dasharray="7 6"')}
    ${path("M95 263 Q170 315 245 263",
      C.green,4,'stroke-dasharray="7 6"')}
    ${txt(170,151,"CONFLICTING",12,C.orange)}
    ${txt(170,166,"SIGNALS",12,C.orange)}
  </g>

  <g class="i-diagnosis vls-w08-fade">
    ${circle(170,195,61,C.paper,
      `stroke="${C.green}" stroke-width="4"`)}
    ${check(170,186,C.green)}
    ${txt(170,222,"DIAGNOSIS",12,C.green)}
  </g>

  <g class="i-lock vls-w08-fade">
    ${rect(137,368,66,18,C.green,9)}
    ${txt(170,381,"VERIFIED",10,C.paper)}
  </g>

</g>

${circle(170,195,25,C.orange,
  'class="vls-w08-glint" opacity=".08"')}

</g>
`;

const captions=[
  "Bring evidence together",
  "Start with the customer",
  "Listen to the experience",
  "Inspect the records",
  "Check the system timestamps",
  "Observe the actual work",
  "Watch the handoffs",
  "Listen to employees",
  "Understand informal routines",
  "Different signals emerge",
  "Evidence may disagree",
  "Investigate the contradiction",
  "Check measurement boundaries",
  "Compare operating conditions",
  "Trace individual cases",
  "Look for recurring mechanisms",
  "Separate fact from inference",
  "Identify the causal chain",
  "Test competing explanations",
  "Challenge premature certainty",
  "Reconcile the evidence",
  "Return to the process",
  "Validate with participants",
  "Record remaining uncertainty",
  "Preserve essential controls",
  "Establish the diagnosis",
  "Show why it is credible",
  "Make findings traceable",
  "Prepare for redesign",
  "Evidence points the way",
  "A defensible conclusion"
];

function render(r,i,n){
  let angle;

  if(i<9){
    angle=[0,90,180,270][Math.floor(i/2)%4];
  }else if(i<20){
    angle=(i*71)%360;
  }else{
    angle=Math.max(0,180-(i-20)*24);
  }

  rotate(r,".i-needle",angle);

  const focus=i<9?Math.floor(i/2)%4:
    i<20?i%4:-1;

  const selectors=[
    ".i-north",".i-east",".i-south",".i-west"
  ];

  selectors.forEach((s,j)=>{
    const active=focus===j||i>=20;
    set(r,s,"opacity",active?"1":".55");
    move(r,s,0,active?-3:0,active?1.05:.96);
  });

  show(r,".i-conflict",i>=9&&i<=20);
  show(r,".i-diagnosis",i>=24);
  show(r,".i-lock",i>=26);

  set(r,".i-needle","opacity",
    i>=25?".12":"1");

  label(r,captions[Math.min(i,captions.length-1)]);
}

window.VL_SCENES.W8O3c=
  sceneFactory("W8O3c",body,render);
}

// Append directly after PART 3.
// Source: Week 8 course.js, Lesson 3 — Where the time disappears.
// Reuses the helpers and sceneFactory defined in PART 1.
//
// W8O1d — Waiting is not working
//          Cinematic time-decomposition machine.
// W8O1e — Symptoms, causes and necessary controls
//          Transparent approval vault and causal investigation.
// W8O2d — The baseline that future results must beat
//          Scientific baseline observatory and comparison apparatus.
//
// All three scenes are distinct in composition and movement.
// No narration sentences are rendered inside the figures.
// No additional stylesheet is created.

// ================================================================
// SCENE 10 — W8O1d
// WAITING IS NOT WORKING
//
// THE TIME-SEPARATION MACHINE
//
// A large transparent cylindrical chamber contains 82 units of
// elapsed time. Four physical mechanisms separate the time into:
//
// VALUE-ADDING WORK
// WAITING
// REWORK
// CHECKING
//
// A mechanical separator rotates while material flows into four
// differently shaped collection vessels.
//
// The illustrated before-redesign decomposition is:
//   14 minutes value-adding
//   47 minutes waiting
//   12 minutes rework
//    9 minutes checking
//   82 minutes total
//
// The illustrated after-redesign decomposition is:
//   12 minutes value-adding
//    6 minutes waiting
//    0 minutes rework
//    4 minutes checking
//   22 minutes total
//
// These are illustrative values, NOT achieved Qasr results.
// Qasr's separate observed exhibit reports 8.1 minutes of
// value-adding work within its 82-minute arrival measure.
//
// The illustration never presents the hypothetical 22 minutes
// as an achieved performance result.
//
// Visual progression:
// 1. A large elapsed-time chamber fills.
// 2. The rotating separator exposes four different time types.
// 3. Waiting dominates the material flowing through the machine.
// 4. An approval gate traps cases without active processing.
// 5. The illustrative before/after composition changes.
// 6. The separate Qasr observation is highlighted.
// 7. The machine settles into an investigation state.
//
// ================================================================

{
const body=`
<defs>
  <linearGradient id="w08m-glass" x1="0" y1="0" x2="1" y2="0">
    <stop stop-color="#dbe7f2" stop-opacity=".7"/>
    <stop offset=".45" stop-color="#ffffff" stop-opacity=".25"/>
    <stop offset="1" stop-color="#dbe7f2" stop-opacity=".75"/>
  </linearGradient>
  <linearGradient id="w08m-sand" x1="0" y1="0" x2="0" y2="1">
    <stop stop-color="#e9b275"/>
    <stop offset="1" stop-color="#c0502a"/>
  </linearGradient>
</defs>

<g class="vls-w08-camera">

${txt(170,24,"WHERE THE TIME GOES",15,C.navy)}

<g class="m-machine">

  <!-- Main elapsed-time reservoir -->
  ${rect(101,49,138,116,"url(#w08m-glass)",19,
    `stroke="${C.navy}" stroke-width="3"`)}
  ${rect(112,61,116,91,C.blue,12,'opacity=".25"')}

  <g class="m-reservoir vls-w08-motion">
    ${rect(115,91,110,59,C.orange,8,'opacity=".68"')}
    ${Array.from({length:13},(_,j)=>{
      const x=126+(j%5)*21;
      const y=101+Math.floor(j/5)*19;
      return circle(x,y,4.5,
        j%4===0?C.green:j%4===1?C.orange:C.navy);
    }).join("")}
  </g>

  ${txt(170,83,"ELAPSED",11,C.navy)}
  ${txt(170,124,"82",31,C.navy)}
  ${txt(170,141,"MINUTES",10,C.navy)}

  <!-- Separation throat -->
  ${path("M150 165 V185 M190 165 V185",C.navy,4)}
  ${rect(142,177,56,19,C.navy,7)}

  <!-- Physical rotating sorting rotor -->
  <g class="m-rotor vls-w08-motion">
    ${circle(170,216,35,C.paper,
      `stroke="${C.navy}" stroke-width="4"`)}
    ${Array.from({length:8},(_,j)=>{
      const a=j*Math.PI/4;
      const x=170+25*Math.cos(a);
      const y=216+25*Math.sin(a);
      return circle(x,y,5,
        j%2===0?C.orange:C.green);
    }).join("")}
    ${circle(170,216,12,C.navy)}
    ${circle(170,216,5,C.paper)}
  </g>

  <!-- Four physical distribution tubes -->
  ${path("M151 240 Q119 253 62 271",C.green,5)}
  ${path("M161 249 Q148 260 137 271",C.orange,5)}
  ${path("M179 249 Q193 260 213 271",C.navy,5)}
  ${path("M189 240 Q229 253 285 271",C.orange,5)}

  <!-- Four collection vessels -->
  <g class="m-vessel m-vessel-0">
    ${rect(26,272,68,65,C.paper,7,
      `stroke="${C.green}" stroke-width="2.5"`)}
    <rect class="m-fill m-fill-0"
      x="32" y="302" width="56" height="29"
      rx="4" fill="${C.green}" opacity=".65"/>
    ${txt(60,291,"WORK",10,C.green)}
    ${txt(60,323,"14",16,C.paper)}
  </g>

  <g class="m-vessel m-vessel-1">
    ${rect(103,272,68,65,C.paper,7,
      `stroke="${C.orange}" stroke-width="2.5"`)}
    <rect class="m-fill m-fill-1"
      x="109" y="285" width="56" height="46"
      rx="4" fill="${C.orange}" opacity=".78"/>
    ${txt(137,291,"WAIT",10,C.navy)}
    ${txt(137,323,"47",17,C.paper)}
  </g>

  <g class="m-vessel m-vessel-2">
    ${rect(180,272,68,65,C.paper,7,
      `stroke="${C.navy}" stroke-width="2.5"`)}
    <rect class="m-fill m-fill-2"
      x="186" y="305" width="56" height="26"
      rx="4" fill="${C.navy}" opacity=".78"/>
    ${txt(214,291,"REWORK",9,C.navy)}
    ${txt(214,323,"12",16,C.paper)}
  </g>

  <g class="m-vessel m-vessel-3">
    ${rect(257,272,57,65,C.paper,7,
      `stroke="${C.orange}" stroke-width="2.5"`)}
    <rect class="m-fill m-fill-3"
      x="263" y="311" width="45" height="20"
      rx="4" fill="${C.orange}" opacity=".5"/>
    ${txt(285,291,"CHECK",9,C.orange)}
    ${txt(285,323,"9",16,C.navy)}
  </g>

  <!-- Approval dependency -->
  <g class="m-approval vls-w08-fade">
    ${rect(77,168,186,91,C.paper,13,
      `stroke="${C.orange}" stroke-width="3"`)}
    ${circle(170,197,23,C.orange)}
    ${path("M170 183 V197 L183 204",C.paper,3)}
    ${txt(170,236,"RATE APPROVAL",12,C.orange)}
    ${txt(170,252,"47 MIN · 61%",11,C.orange)}
  </g>

  <!-- Hypothetical redesigned composition -->
  <g class="m-hypothesis vls-w08-fade">
    ${rect(106,54,128,105,C.paper,14,
      `stroke="${C.green}" stroke-width="3"`)}
    ${txt(170,82,"ILLUSTRATIVE",11,C.green)}
    ${txt(170,124,"22",34,C.green)}
    ${txt(170,144,"NOT ACHIEVED",10,C.orange)}
  </g>

  <!-- Separate Qasr observed value-adding evidence -->
  <g class="m-qasr vls-w08-fade">
    ${rect(80,166,180,91,C.paper,13,
      `stroke="${C.green}" stroke-width="3"`)}
    ${txt(170,190,"QASR OBSERVED",11,C.navy)}
    ${txt(170,224,"8.1 MIN",24,C.green)}
    ${txt(170,243,"VALUE-ADDING",10,C.green)}
  </g>

  <g class="m-inspection vls-w08-motion">
    ${circle(170,216,43,"none",
      `stroke="${C.green}" stroke-width="2"
      stroke-dasharray="6 7"`)}
  </g>

</g>

${circle(170,210,22,C.orange,
  'class="vls-w08-glint" opacity=".08"')}

</g>
`;

const captions=[
  "The complete elapsed time",
  "Long is not busy",
  "The clock keeps running",
  "Inside the boundary",
  "Four kinds of time",
  "Separate the activities",
  "Value-adding work",
  "Waiting for conditions",
  "Correcting earlier work",
  "Necessary checking",
  "Different operational purposes",
  "The approval dependency",
  "47 minutes waiting",
  "61 percent affected",
  "Work may be complete",
  "Handoffs accumulate cases",
  "A queue develops",
  "Waiting extends elapsed time",
  "Investigate the queue",
  "Do not assume staffing",
  "Illustrative decomposition",
  "14 minutes of work",
  "47 minutes of waiting",
  "12 minutes of rework",
  "9 minutes of checking",
  "82 minutes in total",
  "Hypothetical redesign",
  "22 minutes illustrated",
  "Not an achieved result",
  "Flow dominates the opportunity",
  "Qasr evidence differs",
  "8.1 minutes observed",
  "Keep the exhibits separate",
  "Investigate before redesign",
  "Preserve necessary controls",
  "Explain the time",
  "Understand before Innovate"
];

function render(r,i,n){
  const t=i/Math.max(1,n-1);

  // The sorting rotor turns with every narration moment.
  rotate(r,".m-rotor",i*27);

  // The inspection ring counter-rotates.
  rotate(r,".m-inspection",-i*13);

  // Reservoir movement: progressively expose its contents.
  move(r,".m-reservoir",
    0,
    i<5?12:i<11?0:i<20?-4:i<29?9:0,
    i>=20&&i<=28?.88:1);

  // Every time category receives its own changing physical level.
  const heights=[29,46,26,20];

  for(let j=0;j<4;j++){
    const e=r.querySelector(`.m-fill-${j}`);
    if(!e)continue;

    const h=heights[j];
    const pulse=3*Math.sin(i*.85+j*1.7);
    const current=Math.max(3,h+pulse);

    e.setAttribute("height",current);
    e.setAttribute("y",331-current);

    const vessel=r.querySelector(`.m-vessel-${j}`);
    if(vessel){
      const active=
        (i>=6+j*2&&i<12+j*2)||
        (i>=20+j&&i<=25);

      vessel.style.opacity=active?"1":".58";
      vessel.style.transform=
        `translate(0px,${active?-4:0}px)`;
    }
  }

  show(r,".m-approval",i>=11&&i<=19);
  show(r,".m-hypothesis",i>=26&&i<=29);
  show(r,".m-qasr",i>=30&&i<=33);

  set(r,".m-inspection","opacity",
    i>=33?"1":".2");

  label(r,captions[Math.min(i,captions.length-1)]);
}

window.VL_SCENES.W8O1d=
  sceneFactory("W8O1d",body,render);
}

// ================================================================
// SCENE 11 — W8O1e
// SYMPTOMS, CAUSES AND NECESSARY CONTROLS
//
// THE TRANSPARENT APPROVAL VAULT
//
// A corporate-rate approval mechanism is enclosed inside a
// transparent security vault.
//
// Outside the vault, guest cases accumulate.
// Inside, a verification mechanism protects contractual accuracy.
//
// The investigation distinguishes three different things:
//
// 1. SYMPTOM: the observable waiting queue.
// 2. POSSIBLE CAUSE: missing information or approval dependency.
// 3. NECESSARY CONTROL: verification of corporate-rate terms.
//
// A moving optical scanner examines the system.
// The control mechanism remains visible throughout.
//
// The scene deliberately does not show the approval being removed.
// Instead, it demonstrates how investigation can reveal causes
// without sacrificing necessary protection.
//
// Motion vocabulary:
// Growing external queue, scanner sweep, internal gear movement,
// information gaps, branching hypotheses, evidence convergence,
// control preservation.
//
// ================================================================

{
const body=`
<defs>
  <linearGradient id="w08n-vault" x1="0" y1="0" x2="1" y2="1">
    <stop stop-color="#dbe7f2" stop-opacity=".65"/>
    <stop offset=".5" stop-color="#ffffff" stop-opacity=".2"/>
    <stop offset="1" stop-color="#dbe7f2" stop-opacity=".8"/>
  </linearGradient>
</defs>

<g class="vls-w08-camera">

${txt(170,25,"WHAT CAUSES THE DELAY?",14,C.navy)}

<g class="n-vault">

  <!-- External guest cases -->
  <g class="n-queue">
    ${Array.from({length:5},(_,j)=>`
      <g class="n-case n-case-${j} vls-w08-motion">
        ${rect(31+j*23,170,19,22,
          j%2===0?C.navy:C.orange,5)}
        ${circle(40+j*23,181,4,C.paper)}
      </g>
    `).join("")}
  </g>

  <!-- Transparent approval enclosure -->
  ${rect(141,82,164,207,"url(#w08n-vault)",17,
    `stroke="${C.navy}" stroke-width="3"`)}
  ${rect(152,95,142,180,C.paper,11,'opacity=".38"')}

  <!-- Vault lock -->
  ${circle(223,176,53,C.paper,
    `stroke="${C.navy}" stroke-width="4"`)}
  ${circle(223,176,40,"none",
    `stroke="${C.orange}" stroke-width="2.5"`)}
  ${circle(223,176,28,C.blue)}

  <g class="n-lock-rotor vls-w08-motion">
    ${Array.from({length:8},(_,j)=>{
      const a=j*Math.PI/4;
      const x=223+34*Math.cos(a);
      const y=176+34*Math.sin(a);
      return circle(x,y,5,C.navy);
    }).join("")}
  </g>

  ${circle(223,176,12,C.navy)}
  ${circle(223,176,5,C.paper)}

  <!-- Contract protection -->
  <g class="n-contract">
    ${rect(186,111,74,32,C.paper,5,
      `stroke="${C.green}" stroke-width="2"`)}
    ${path("M198 122 H246 M198 130 H237",
      C.green,2)}
    ${check(247,133,C.green)}
  </g>

  <!-- Approval gate -->
  <g class="n-gate vls-w08-motion">
    ${rect(128,155,19,63,C.orange,5)}
    ${path("M128 168 H147 M128 204 H147",
      C.paper,2)}
  </g>

  <!-- Verification pathway -->
  ${path("M145 236 H285",C.green,3,
    'stroke-dasharray="6 5"')}

  <!-- Optical investigation scanner -->
  <g class="n-scanner vls-w08-motion">
    ${circle(78,103,36,C.paper,
      `stroke="${C.green}" stroke-width="3"`)}
    ${circle(78,103,25,C.blue,'opacity=".6"')}
    ${path("M103 128 L131 154",C.green,9)}
    ${path("M67 103 H89 M78 92 V114",C.green,2)}
  </g>

  <!-- Missing information hypothesis -->
  <g class="n-information vls-w08-fade">
    ${rect(38,237,94,56,C.paper,8,
      `stroke="${C.orange}" stroke-width="2.5"`)}
    ${rect(52,249,31,29,C.blue,4)}
    ${txt(67,269,"?",22,C.orange)}
    ${txt(106,263,"DATA",10,C.orange)}
    ${txt(106,277,"GAP",10,C.orange)}
  </g>

  <!-- Authority dependency hypothesis -->
  <g class="n-authority vls-w08-fade">
    ${circle(83,266,28,C.paper,
      `stroke="${C.navy}" stroke-width="3"`)}
    ${person(83,274,C.navy,.65)}
    ${txt(83,309,"AUTHORITY",10,C.navy)}
  </g>

  <!-- Visible symptom -->
  <g class="n-symptom vls-w08-fade">
    ${rect(25,207,112,28,C.orange,13)}
    ${txt(81,225,"WAITING QUEUE",11,C.paper)}
  </g>

  <!-- Evidence beams -->
  <g class="n-evidence">
    <path class="n-beam n-beam-0 vls-w08-draw"
      d="M95 239 Q124 209 156 191"
      fill="none" stroke="${C.orange}" stroke-width="3"/>
    <path class="n-beam n-beam-1 vls-w08-draw"
      d="M106 267 Q142 250 176 213"
      fill="none" stroke="${C.navy}" stroke-width="3"/>
  </g>

  <!-- Preserved control -->
  <g class="n-preserve vls-w08-fade">
    ${circle(223,176,58,"none",
      `stroke="${C.green}" stroke-width="4"`)}
    ${check(223,176,C.green)}
    ${txt(223,258,"CONTROL KEPT",11,C.green)}
  </g>

  <!-- Diagnostic foundation -->
  <g class="n-diagnosis vls-w08-fade">
    ${rect(39,331,262,35,C.paper,10,
      `stroke="${C.green}" stroke-width="2.5"`)}
    ${txt(170,353,"EVIDENCE BEFORE REDESIGN",12,C.green)}
  </g>

</g>

${circle(170,188,24,C.orange,
  'class="vls-w08-glint" opacity=".08"')}

</g>
`;

const captions=[
  "Observe the symptom",
  "Delay needs explanation",
  "The approval wait",
  "A visible process problem",
  "Why does approval exist?",
  "Protection may be necessary",
  "Do not remove safeguards",
  "Investigate the causes",
  "Customer value",
  "Enabling activities",
  "Verification and checking",
  "Purpose matters",
  "Separate control and delay",
  "Examine the dependency",
  "Why request approval?",
  "Missing information?",
  "Decision authority?",
  "Inspect actual cases",
  "Interview responsible employees",
  "Hypotheses need evidence",
  "Investigate deeper conditions",
  "Trace recurring symptoms",
  "Test the explanations",
  "Look for shared causes",
  "Clarification may recur",
  "One information dependency",
  "Protect existing safeguards",
  "Document the activity purpose",
  "Distinguish unnecessary duplication",
  "Record supported findings",
  "Remain in Understand",
  "Prepare for Innovate",
  "Explain the real cause",
  "Preserve legitimate controls"
];

function render(r,i,n){
  // Queue cases advance and accumulate before the locked gate.
  for(let j=0;j<5;j++){
    const e=r.querySelector(`.n-case-${j}`);
    if(!e)continue;

    const approach=Math.min(1,i/12);
    const x=approach*(12+j*2);
    const y=(i+j)%3===0?-3:0;

    e.style.transform=
      `translate(${x}px,${y}px)`;

    e.style.opacity=i>=2+j?"1":".22";
  }

  // The security mechanism continues functioning.
  rotate(r,".n-lock-rotor",i*19);

  // Gate moves only slightly; verification is not removed.
  move(r,".n-gate",
    i>=25?4:0,
    0,
    1);

  // Optical investigation moves between the symptom,
  // information dependency and verification mechanism.
  const scannerPositions=[
    [-18,12],
    [0,0],
    [42,35],
    [97,57],
    [55,108]
  ];

  const p=i<5?0:
    i<12?1:
    i<19?2:
    i<26?3:4;

  move(r,".n-scanner",
    scannerPositions[p][0]+
      3*Math.sin(i*.8),
    scannerPositions[p][1]+
      2*Math.cos(i*.7),
    i>=26?.85:1);

  show(r,".n-symptom",i>=2&&i<=13);
  show(r,".n-information",i>=14&&i<=25);
  show(r,".n-authority",i>=16&&i<=25);

  set(r,".n-beam-0","strokeDashoffset",
    i>=19?0:500);

  set(r,".n-beam-1","strokeDashoffset",
    i>=22?0:500);

  show(r,".n-preserve",i>=26);
  show(r,".n-diagnosis",i>=28);

  set(r,".n-contract","opacity",
    i>=5&&i<=12||i>=26?"1":".45");

  label(r,captions[Math.min(i,captions.length-1)]);
}

window.VL_SCENES.W8O1e=
  sceneFactory("W8O1e",body,render);
}

// ================================================================
// SCENE 12 — W8O2d
// THE BASELINE THAT FUTURE RESULTS MUST BEAT
//
// THE BASELINE OBSERVATORY
//
// A large scientific measurement instrument stands on a circular
// platform. Its main dial is calibrated to Qasr's observed
// 82.0-minute end-to-end mean.
//
// Three measurement needles represent:
//   12.4 minutes — system processing
//   23 minutes   — original guest's reception experience
//   82.0 minutes — programme end-to-end mean
//
// Only the 82-minute end-to-end mean is selected as the programme
// baseline candidate, subject to documented validation.
//
// Five physical evidence instruments are installed around the
// observatory:
//
// 1. Validated as-is model
// 2. Quantified baseline
// 3. Root cause analysis
// 4. Exception register
// 5. Potential quick wins
//
// A transparent future-measurement arm remains uncalibrated.
// The scene never invents achieved improvement.
//
// At the conclusion, a protective calibration ring locks the
// baseline definition so later results can be compared fairly.
//
// Motion vocabulary:
// Rotating measurement needles, instrument deployment,
// orbital evidence components, calibration lock,
// preserved measurement boundary, future comparison.
//
// ================================================================

{
const body=`
<defs>
  <radialGradient id="w08o-dial">
    <stop stop-color="#ffffff"/>
    <stop offset=".72" stop-color="#fbf8f1"/>
    <stop offset="1" stop-color="#dbe7f2"/>
  </radialGradient>
</defs>

<g class="vls-w08-camera">

${txt(170,24,"THE BASELINE TO BEAT",15,C.navy)}

<g class="o-observatory">

  <!-- Circular measuring instrument -->
  ${circle(170,178,112,"url(#w08o-dial)",
    `stroke="${C.navy}" stroke-width="4"`)}
  ${circle(170,178,96,"none",
    `stroke="${C.blue}" stroke-width="9"`)}
  ${circle(170,178,80,"none",
    `stroke="${C.navy}" stroke-width="1.5"
    opacity=".35"`)}

  ${Array.from({length:21},(_,j)=>{
    const a=(-210+j*12)*Math.PI/180;
    const x1=170+87*Math.cos(a);
    const y1=178+87*Math.sin(a);
    const x2=170+(j%5===0?102:95)*Math.cos(a);
    const y2=178+(j%5===0?102:95)*Math.sin(a);
    return path(`M${x1} ${y1} L${x2} ${y2}`,
      C.navy,j%5===0?3:1.4);
  }).join("")}

  <!-- System processing needle -->
  <g class="o-system-needle vls-w08-motion">
    ${path("M170 178 L170 107",C.navy,3)}
    ${circle(170,107,4,C.navy)}
  </g>

  <!-- Original guest needle -->
  <g class="o-guest-needle vls-w08-motion">
    ${path("M170 178 L170 98",C.orange,4)}
    ${circle(170,98,5,C.orange)}
  </g>

  <!-- End-to-end programme needle -->
  <g class="o-programme-needle vls-w08-motion">
    ${path("M170 178 L170 84",C.green,6)}
    ${circle(170,84,6,C.green)}
  </g>

  ${circle(170,178,12,C.navy)}
  ${circle(170,178,5,C.paper)}

  <!-- Main baseline value -->
  <g class="o-baseline-value vls-w08-motion">
    ${rect(115,191,110,57,C.paper,11,
      `stroke="${C.green}" stroke-width="2.5"`)}
    ${txt(170,218,"82.0",29,C.green)}
    ${txt(170,237,"MINUTES",11,C.green)}
  </g>

  <!-- Evidence instruments around the main dial -->
  <g class="o-evidence">

    <g class="o-item o-item-0 vls-w08-motion">
      ${circle(67,69,24,C.paper,
        `stroke="${C.navy}" stroke-width="2.5"`)}
      ${rect(56,61,22,17,C.navy,3)}
      ${path("M61 66 H73 M61 71 H70",C.paper,2)}
      ${txt(67,37,"AS-IS MODEL",10,C.navy)}
    </g>

    <g class="o-item o-item-1 vls-w08-motion">
      ${circle(273,69,24,C.paper,
        `stroke="${C.green}" stroke-width="2.5"`)}
      ${path("M260 79 V69 M271 79 V60 M282 79 V53",C.green,5)}
      ${txt(273,37,"BASELINE",10,C.green)}
    </g>

    <g class="o-item o-item-2 vls-w08-motion">
      ${circle(45,249,23,C.paper,
        `stroke="${C.orange}" stroke-width="2.5"`)}
      ${circle(45,244,7,C.orange)}
      ${path("M45 251 V262 M45 257 L35 264 M45 257 L55 264",C.orange,2.5)}
      ${txt(45,287,"ROOT CAUSES",10,C.orange)}
    </g>

    <g class="o-item o-item-3 vls-w08-motion">
      ${circle(295,249,23,C.paper,
        `stroke="${C.navy}" stroke-width="2.5"`)}
      ${rect(283,237,24,27,C.paper,3,
        `stroke="${C.navy}" stroke-width="2"`)}
      ${path("M289 244 H301 M289 251 H301 M289 258 H297",C.navy,2)}
      ${txt(295,287,"EXCEPTIONS",10,C.navy)}
    </g>

    <g class="o-item o-item-4 vls-w08-motion">
      ${circle(170,311,23,C.paper,
        `stroke="${C.orange}" stroke-width="2.5"`)}
      ${path("M160 316 L170 302 L180 316",
        C.orange,3)}
      ${path("M170 302 V323",C.orange,3)}
      ${txt(170,347,"QUICK WINS",10,C.orange)}
    </g>

  </g>

  <!-- Connections from evidence to measurement -->
  <g class="o-connections">
    ${[
      "M87 85 L117 111",
      "M253 85 L223 111",
      "M66 238 L93 217",
      "M274 238 L247 217",
      "M170 288 V252"
    ].map((d,j)=>`
      <path class="o-link o-link-${j} vls-w08-draw"
        d="${d}" fill="none"
        stroke="${j%2===0?C.green:C.orange}"
        stroke-width="2.5"/>
    `).join("")}
  </g>

  <!-- Measurement comparison -->
  <g class="o-three-clocks vls-w08-fade">
    ${rect(76,129,188,91,C.paper,13,
      `stroke="${C.navy}" stroke-width="2.5"`)}
    ${txt(170,151,"THREE MEASURES",11,C.navy)}
    ${txt(115,181,"12.4",18,C.navy)}
    ${txt(170,181,"23",18,C.orange)}
    ${txt(225,181,"82.0",18,C.green)}
    ${txt(115,197,"SYSTEM",9,C.navy)}
    ${txt(170,197,"GUEST",9,C.orange)}
    ${txt(225,197,"PROCESS",9,C.green)}
  </g>

  <!-- Preserved measurement boundary -->
  <g class="o-boundary vls-w08-fade">
    ${circle(170,178,117,"none",
      `stroke="${C.green}" stroke-width="4"
      stroke-dasharray="7 6"`)}
    ${txt(170,372,"LOBBY TO ROOM ACCESS",11,C.green)}
  </g>

  <!-- Future result intentionally remains unknown -->
  <g class="o-future vls-w08-fade">
    ${rect(96,125,148,104,C.paper,14,
      `stroke="${C.green}" stroke-width="3"`)}
    ${txt(170,150,"FUTURE RESULT",11,C.navy)}
    ${txt(170,191,"?",43,C.green)}
    ${txt(170,211,"NOT YET MEASURED",10,C.orange)}
  </g>

  <!-- Calibration lock -->
  <g class="o-calibration vls-w08-fade">
    ${circle(170,178,122,"none",
      `stroke="${C.green}" stroke-width="4"`)}
    ${circle(170,178,129,"none",
      `stroke="${C.navy}" stroke-width="1.5"
      stroke-dasharray="4 7"`)}
    ${circle(170,308,19,C.green)}
    ${check(170,309,C.paper)}
  </g>

</g>

${circle(170,178,24,C.orange,
  'class="vls-w08-glint" opacity=".08"')}

</g>
`;

const captions=[
  "Complete the investigation",
  "Evidence managers can use",
  "Prepare the sponsor decision",
  "Explain the findings",
  "Two essential outputs",
  "Validate the as-is model",
  "Check actual handoffs",
  "Employees confirm the model",
  "Measurement is also needed",
  "Define the baseline",
  "310 corporate arrivals",
  "82.0 minutes end-to-end",
  "The complete guest journey",
  "12.4 minutes system time",
  "One guest's 23 minutes",
  "Different measurement boundaries",
  "Preserve the definitions",
  "Avoid false improvement",
  "Comparable future samples",
  "Record recurring causes",
  "Investigate rate approval",
  "Protect necessary controls",
  "Register the exceptions",
  "Record exception frequency",
  "Identify potential quick wins",
  "Opportunities are not results",
  "Prepare for Innovate",
  "Evaluate later benefits",
  "Evidence before claims",
  "Preserve the original baseline",
  "Agree the starting point",
  "Prepare the next phase",
  "No improvement claimed yet",
  "The baseline remains fixed",
  "Address departmental concerns",
  "Defend the programme measure"
];

function render(r,i,n){
  const t=i/Math.max(1,n-1);

  // Three needles move independently as their different
  // measurement purposes become visible.
  rotate(r,".o-system-needle",
    i<13?-115+i*7:-24);

  rotate(r,".o-guest-needle",
    i<14?110-i*5:40);

  rotate(r,".o-programme-needle",
    i<11?-150+i*11:
    i<28?-29+(i-11)*1.7:0);

  // Each evidence instrument arrives from a distinct direction.
  const origins=[
    [-65,-45],
    [65,-45],
    [-75,50],
    [75,50],
    [0,70]
  ];

  const starts=[5,9,19,22,24];

  for(let j=0;j<5;j++){
    const active=i>=starts[j];
    const [dx,dy]=origins[j];

    move(r,`.o-item-${j}`,
      active?0:dx,
      active?0:dy,
      active?1:.65);

    set(r,`.o-item-${j}`,"opacity",
      active?"1":"0");

    set(r,`.o-link-${j}`,"strokeDashoffset",
      active?0:500);
  }

  // The three measurements are compared without being conflated.
  show(r,".o-three-clocks",i>=11&&i<=16);

  // Explicit end-to-end boundary.
  show(r,".o-boundary",
    i>=12&&i<=18||i>=29);

  // The future value is deliberately unknown.
  show(r,".o-future",i>=25&&i<=28);

  // Final calibration locks the baseline definition.
  show(r,".o-calibration",i>=29);

  // Preserve the observed 82-minute baseline as the central
  // value whenever the comparison overlay is not active.
  set(r,".o-baseline-value","opacity",
    i>=25&&i<=28?".12":"1");

  // Slight instrument breathing reinforces the narration beat.
  move(r,".o-baseline-value",
    0,
    i%2===0?0:-2,
    i>=29?1.05:1);

  label(r,captions[Math.min(i,captions.length-1)]);
}

window.VL_SCENES.W8O2d=
  sceneFactory("W8O2d",body,render);
}

// ================================================================
// FINAL REGISTRATION
// ================================================================
//
// Week 8 section coverage:
//
// LESSON 1 — What really happens at Qasr?
// W8O1a — Investigation theatre
// W8O1b — Four-lane conveyor
// W8O1c — Forensic evidence laboratory
//
// LESSON 2 — Three clocks, three different answers
// W8O2a — Three-clock observatory
// W8O2b — Arrival constellation
// W8O2c — Three-level arrival cutaway
//
// LESSON 3 — Where the time disappears
// W8O1d — Time-separation machine
// W8O1e — Transparent approval vault
// W8O2d — Baseline observatory
//
// LESSON 4 — When the numbers become personal
// W8O3a — Glass pipeline
// W8O3b — Root-cause tree
// W8O3c — Evidence compass
//
// Total: 12 registered section scenes.
//
// Every scene implements:
//   build(el)
//   step(i,n)
//   reset()
//
// No W8O4a, W8O4b or W8O4c registrations.
//
// The host controls narration timing and section navigation.
// The shared sceneFactory handles moment indexing, camera
// movement, progress, GSAP availability and reduced motion.
//
// ================================================================

})();

