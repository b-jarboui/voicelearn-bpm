(() => {
  "use strict";

  window.VL_SCENES = window.VL_SCENES || {};

  const IDS = [
    "W2O1a", "W2O1b", "W2O1c",
    "W2O2a", "W2O2b", "W2O2c",
    "W2O3a", "W2O3b", "W2O3c",
    "W2O4a", "W2O4b", "W2O4c"
  ];
  const SCOPE = IDS.map(id => `.vls-w02-${id}`).join(",");
  const V = {
    navy: "var(--navy)", orange: "var(--orange)", paper: "var(--paper)",
    ink: "var(--ink)", blue: "var(--blue)", green: "var(--green)"
  };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const reduced = () => {
    try { return matchMedia("(prefers-reduced-motion: reduce)").matches; }
    catch (_) { return false; }
  };
  const safeIndex = (i, n) => clamp(Math.floor(Number(i) || 0), 0, Math.max(0, (Number(n) || 1) - 1));
  const progress = (i, n) => n > 1 ? safeIndex(i, n) / (n - 1) : 0;
  const phase = (i, cuts) => cuts.reduce((p, cut) => p + (i >= cut ? 1 : 0), 0);
  const svg = (body, label) => `
    <svg viewBox="0 0 360 390" preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="${label}">${body}</svg>`;
  const text = (x, y, value, size = 12, color = V.ink, extra = "") =>
    `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="${color}" ${extra}>${value}</text>`;
  const line = (x1, y1, x2, y2, color = V.navy, width = 3, extra = "") =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" ${extra}/>`;
  const rect = (x, y, w, h, fill = V.paper, rx = 8, extra = "") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`;
  const circle = (x, y, r, fill = V.blue, extra = "") =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
  const path = (d, stroke = V.navy, width = 3, extra = "") =>
    `<path d="${d}" ${/\bfill\s*=/.test(extra) ? "" : 'fill="none"'} stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;

  function all(root, selector) { return root ? [...root.querySelectorAll(selector)] : []; }
  function one(root, selector) { return root ? root.querySelector(selector) : null; }
  function attrs(root, selector, values) {
    all(root, selector).forEach(node => Object.entries(values).forEach(([k, v]) => node.setAttribute(k, String(v))));
  }
  function css(root, selector, values) {
    all(root, selector).forEach(node => Object.assign(node.style, values));
  }
  function show(root, selector, yes) { css(root, selector, { opacity: yes ? "1" : "0" }); }
  function words(root, selector, value) {
    const node = one(root, selector);
    if (node) node.textContent = value;
  }
  function move(root, selector, x, y, rotation = 0, scale = 1, instant = false) {
    all(root, selector).forEach(node => {
      const vars = { x, y, rotation, scale, transformOrigin: "50% 50%", overwrite: "auto" };
      if (!instant && !reduced() && window.gsap && typeof window.gsap.to === "function") {
        window.gsap.to(node, { duration: .62, ease: "power2.out", ...vars });
      } else {
        node.style.transform = `translate(${x}px,${y}px) rotate(${rotation}deg) scale(${scale})`;
      }
    });
  }
  function kill(root) {
    if (root && window.gsap && typeof window.gsap.killTweensOf === "function") {
      window.gsap.killTweensOf(root.querySelectorAll("*"));
    }
  }
  function mount(el, id, body, label) {
    if (!el || typeof el.replaceChildren !== "function") return null;
    const root = document.createElement("div");
    root.className = `vls-w02-${id}`;
    root.innerHTML = svg(body, label);
    el.replaceChildren(root);
    return root;
  }
  function scene(id, expectedN, body, label, render) {
    const state = { root: null, n: expectedN, last: -1 };
    return {
      build(el) {
        state.root = mount(el, id, body, label);
        state.n = expectedN;
        state.last = -1;
        if (state.root) render(state.root, 0, expectedN, true);
      },
      step(i, n) {
        if (!state.root) return;
        const total = Math.max(1, Number(n) || expectedN);
        const index = safeIndex(i, total);
        state.root.classList.toggle("vls-reduced", reduced());
        state.root.classList.remove("vls-instant");
        render(state.root, index, total, false);
        state.n = total;
        state.last = index;
      },
      reset() {
        if (!state.root) return;
        kill(state.root);
        state.root.classList.add("vls-instant");
        render(state.root, 0, state.n || expectedN, true);
        state.last = -1;
      }
    };
  }

  if (!document.getElementById("vl-sc-w02")) {
    const style = document.createElement("style");
    style.id = "vl-sc-w02";
    style.textContent = `
:is(${SCOPE}){--navy:#1f4e79;--orange:#c0502a;--paper:#fbf8f1;--ink:#1b2a3a;--blue:#dbe7f2;--green:#317c61;position:relative;width:100%;height:100%;min-height:0;overflow:hidden;isolation:isolate;color:var(--ink);font-family:inherit;box-sizing:border-box}
:is(${SCOPE}) *{box-sizing:border-box}
:is(${SCOPE}) svg{display:block;width:100%;height:100%;max-height:100%;overflow:visible}
:is(${SCOPE}) svg text{font-family:inherit;font-weight:700;letter-spacing:.35px}
:is(${SCOPE}) .vls-fade{transition:opacity .55s ease,transform .65s cubic-bezier(.2,.75,.2,1);transform-box:fill-box;transform-origin:center}
:is(${SCOPE}) .vls-draw{stroke-dasharray:420;stroke-dashoffset:420;transition:stroke-dashoffset .7s ease}
:is(${SCOPE}).vls-instant *,:is(${SCOPE}).vls-reduced *{animation:none!important;transition:none!important}
.vls-w02-W2O1a .tank-level{transition:y .65s ease,height .65s ease}.vls-w02-W2O1a .pressure-bubble{animation:w02-bubble 2.3s ease-in-out infinite}.vls-w02-W2O1a .gauge-needle{transform-origin:180px 101px}
.vls-w02-W2O1b .trigger-spark{filter:drop-shadow(0 0 5px rgba(192,80,42,.45))}.vls-w02-W2O1b .launch-gate{transform-origin:281px 197px}.vls-w02-W2O1b .rail-glow{stroke-dasharray:10 9;animation:w02-dash 3s linear infinite}
.vls-w02-W2O1c .brief-prism{transform-origin:180px 185px}.vls-w02-W2O1c .brief-beam{transition:opacity .55s ease,stroke .55s ease}.vls-w02-W2O1c .brief-card{transition:opacity .55s ease,transform .65s ease;transform-box:fill-box;transform-origin:center}
.vls-w02-W2O2a .lens{filter:drop-shadow(0 4px 3px rgba(31,78,121,.22))}.vls-w02-W2O2a .march-burst{transform-origin:300px 199px;animation:w02-breathe 2s ease-in-out infinite}
.vls-w02-W2O2b .route-boat{transform-box:fill-box;transform-origin:center}.vls-w02-W2O2b .route-flow{stroke-dasharray:9 8;animation:w02-dash 3.2s linear infinite}.vls-w02-W2O2b .credibility-ring{transform-origin:180px 208px}
.vls-w02-W2O2c .draft-pencil{filter:drop-shadow(2px 3px 2px rgba(31,78,121,.2))}.vls-w02-W2O2c .blueprint-line{transition:opacity .5s ease,stroke-dashoffset .7s ease}.vls-w02-W2O2c .charter-seal{transform-origin:278px 316px}
.vls-w02-W2O3a .light-beam{transform-origin:180px 118px}.vls-w02-W2O3a .hotel-window{transition:fill .5s ease,opacity .5s ease}.vls-w02-W2O3a .signal-wave{stroke-dasharray:8 8;animation:w02-dash 3s linear infinite}
.vls-w02-W2O3b .customer-hand,.vls-w02-W2O3b .team-hand{transform-origin:180px 193px}.vls-w02-W2O3b .clock-pulse{animation:w02-breathe 2.2s ease-in-out infinite}
.vls-w02-W2O3c .garden-leaf{transition:opacity .5s ease,transform .6s ease;transform-box:fill-box;transform-origin:center}.vls-w02-W2O3c .water-drop{filter:drop-shadow(0 3px 2px rgba(31,78,121,.2))}.vls-w02-W2O3c .sun-ring{animation:w02-breathe 2.8s ease-in-out infinite}
.vls-w02-W2O4a .scan-beam{filter:drop-shadow(0 0 5px rgba(49,124,97,.5))}.vls-w02-W2O4a .scan-chip{transition:opacity .45s ease,transform .6s ease;transform-box:fill-box;transform-origin:center}
.vls-w02-W2O4b .crane-hook{transition:opacity .5s ease}.vls-w02-W2O4b .bridge-piece{transition:opacity .5s ease,transform .65s ease;transform-box:fill-box;transform-origin:center}.vls-w02-W2O4b .case-truck{filter:drop-shadow(0 4px 3px rgba(31,78,121,.2))}
.vls-w02-W2O4c .evidence-token{transform-box:fill-box;transform-origin:center}.vls-w02-W2O4c .forum-orbit{stroke-dasharray:8 9;animation:w02-dash 4s linear infinite}.vls-w02-W2O4c .judgement-ring{transform-origin:180px 195px}
@keyframes w02-bubble{0%,100%{opacity:.35;transform:translateY(3px)}50%{opacity:.9;transform:translateY(-6px)}}
@keyframes w02-dash{to{stroke-dashoffset:-68}}
@keyframes w02-breathe{0%,100%{opacity:.35;transform:scale(.92)}50%{opacity:.9;transform:scale(1.08)}}
@media(max-width:375px){:is(${SCOPE}) svg text{letter-spacing:.15px}:is(${SCOPE}) .small-label{font-size:10px}}
@media(prefers-reduced-motion:reduce){:is(${SCOPE}) *{animation:none!important;transition:none!important}}
`;
    document.head.appendChild(style);
  }

  // W2O1a — A reservoir fills as persistent pressures accumulate.
  {
    const cuts = [4, 8, 12, 14, 17, 23, 26, 29];
    const labels = ["VISIBLE PROBLEM", "DRIVER PRESSURE", "GUEST VALUE", "MOBILE CHECK-IN", "INTERNAL PRESSURE", "NO DECISION", "SHARED COMMITMENT", "CUSTOMER SIGNAL", "WHY ACT NOW"];
    const pipes = [
      { x: 54, label: "GUEST VALUE", color: V.orange },
      { x: 132, label: "MOBILE CHECK-IN", color: V.navy },
      { x: 228, label: "COST PRESSURE", color: V.green },
      { x: 306, label: "LOST ACCOUNTS", color: V.orange }
    ];
    const body = `
      ${text(180, 25, "PRESSURE RESERVOIR", 16, V.ink)}
      ${pipes.map((p, j) => `<g class="pipe p${j}">${line(p.x, 53, p.x, 105, p.color, 9)}${circle(p.x, 111, 7, p.color)}${text(p.x, 46, p.label, 9, p.color, 'class="small-label"')}</g>`).join("")}
      ${rect(37, 124, 246, 205, V.paper, 18, `stroke="${V.navy}" stroke-width="4"`)}
      <path d="M50 163 Q92 143 134 163 T218 163 T270 163 V315 H50Z" fill="${V.blue}" opacity=".35"/>
      <rect class="tank-level" x="50" y="296" width="220" height="19" rx="5" fill="${V.blue}"/>
      ${[0,1,2,3,4].map(j => circle(78 + j * 39, 285 - (j % 2) * 20, 5 + (j % 3), j % 2 ? V.green : V.navy, `class="pressure-bubble b${j}" opacity=".5"`)).join("")}
      <g class="gauge">
        ${circle(314, 104, 42, V.paper, `stroke="${V.navy}" stroke-width="4"`)}
        ${path("M286 113 A30 30 0 0 1 342 113", V.orange, 5)}
        <g class="gauge-needle">${line(314, 104, 314, 76, V.navy, 4)}${circle(314, 104, 7, V.orange)}</g>
        ${text(314, 126, "ACTION GATE", 9, V.navy, 'class="small-label"')}
      </g>
      <g class="commitment vls-fade" opacity="0">
        ${rect(88, 339, 184, 34, V.green, 17)}${text(180, 361, "FUNDED PROGRAMME", 12, V.paper)}
      </g>
      ${text(180, 356, "VISIBLE PROBLEM", 11, V.navy, 'class="stage-label"')}`;
    window.VL_SCENES["W2O1a"] = scene("W2O1a", 32, body, "Pressure reservoir showing drivers accumulating before commitment", (r, i, n, instant) => {
      const p = progress(i, n), b = phase(i, cuts), level = 19 + p * 164;
      attrs(r, ".tank-level", { y: 315 - level, height: level });
      move(r, ".gauge-needle", 0, 0, -62 + p * 124, 1, instant);
      pipes.forEach((_, j) => show(r, `.p${j}`, i >= [8,12,15,20][j]));
      for (let j = 0; j < 5; j++) move(r, `.b${j}`, Math.sin((i + j) * 1.7) * 5, -((i * 7 + j * 23) % 70), (i + j) * 4, 1, instant);
      show(r, ".commitment", i >= 25);
      show(r, ".stage-label", i < 25);
      words(r, ".stage-label", labels[b]);
    });
  }

  // W2O1b — A spark crosses a dormant line and launches the programme.
  {
    const cuts = [3, 4, 8, 10, 12, 14, 18, 21, 24, 28, 30];
    const labels = ["PRESSURE WAITS", "CONSEQUENCE CHANGES", "REGULATORY SIGNAL", "RECORDS SCATTERED", "ACT NOW", "PROGRAMME LAUNCH", "TRIGGER DEFINED", "ALARM MOMENT", "FUNDING EXPECTATION", "OTHER TRIGGERS", "SUCCESS EVIDENCE", "PRIORITIES SET"];
    const body = `
      ${text(180, 25, "THE TRIGGER LINE", 16, V.ink)}
      ${line(35, 198, 326, 198, V.blue, 13)}
      <path class="rail-glow" d="M35 198 H326" stroke="${V.navy}" stroke-width="3" fill="none"/>
      ${[58,105,152,199].map((x,j) => `<g class="pressure-mark m${j}">${circle(x,198,13,j%2?V.green:V.navy)}${line(x,178,x,145,j%2?V.green:V.navy,3)}${text(x,135,["SERVICE PRESSURE","MOBILE PRESSURE","COST PRESSURE","ACCOUNT PRESSURE"][j],9,V.ink,'class="small-label"')}</g>`).join("")}
      <g class="deadline vls-fade" opacity="0">
        ${line(247, 93, 247, 285, V.orange, 5)}${circle(247, 198, 20, V.orange)}
        ${text(247, 76, "JANUARY DEADLINE", 10, V.orange)}${text(247, 310, "24 HOUR RECORD", 10, V.orange)}
      </g>
      <g class="launch-gate">${rect(270,151,24,94,V.paper,7,`stroke="${V.orange}" stroke-width="4"`)}${line(282,160,282,236,V.orange,3)}</g>
      <g class="trigger-spark">${circle(35,198,10,V.orange)}${path("M35 177 L42 190 L57 193 L44 201 L45 216 L35 206 L24 216 L26 201 L13 193 L28 190Z",V.orange,2,`fill="${V.paper}"`)}</g>
      <g class="programme vls-fade" opacity="0">
        ${rect(297,170,45,35,V.green,8)}${circle(307,211,7,V.navy)}${circle(332,211,7,V.navy)}${text(319,162,"FUNDED PROGRAMME",9,V.green,'class="small-label"')}
      </g>
      ${rect(61,335,238,32,V.paper,16,`stroke="${V.navy}" stroke-width="2"`)}
      ${text(180,356,"PRESSURE WAITS",11,V.navy,'class="trigger-label"')}`;
    window.VL_SCENES["W2O1b"] = scene("W2O1b", 32, body, "Trigger spark converting pressure into a funded programme", (r, i, n, instant) => {
      const p = progress(i, n), b = phase(i, cuts), x = 35 + p * 262;
      move(r, ".trigger-spark", x - 35, Math.sin(i * 1.45) * 7, i * 19, 1, instant);
      show(r, ".deadline", i >= 4);
      move(r, ".launch-gate", 0, i >= 10 ? -36 : 0, i >= 10 ? 12 : 0, 1, instant);
      show(r, ".programme", i >= 10);
      move(r, ".programme", Math.max(-25, (p - .32) * 28), i % 2 ? -2 : 2, 0, 1, instant);
      words(r, ".trigger-label", labels[b]);
    });
  }

  // W2O1c — A rotating prism reveals the operational brief behind each trigger.
  {
    const cuts = [4, 8, 11, 15, 21, 26, 31, 34];
    const triggers = ["REGULATORY DEADLINE","MERGER DAY","COST TARGET","COMPLAINT SURGE","SYSTEM REPLACEMENT"];
    const outcomes = ["COMPLIANCE PROOF","ONE OPERATING WAY","DEFENSIBLE SAVINGS","VISIBLE RESPONSE","DELIBERATE DESIGN"];
    const risks = ["MINIMUM COMPLIANCE","CONFLICTING PRACTICE","UNTRACKED SAVINGS","SURFACE REPAIR","VENDOR WORKFLOW"];
    const body = `
      ${text(180,25,"READ THE BRIEF",16,V.ink)}
      <g class="brief-source">${circle(52,185,27,V.orange)}${text(52,190,"WHY NOW",11,V.paper)}</g>
      ${path("M80 185 H139",V.orange,8,`class="brief-beam"`)}
      <g class="brief-prism"><path d="M180 123 L226 215 H134Z" fill="${V.blue}" stroke="${V.navy}" stroke-width="4"/><circle cx="180" cy="185" r="9" fill="${V.orange}"/></g>
      ${[0,1,2,3,4].map(j => path(`M219 ${150+j*17} L315 ${75+j*58}`,j%2?V.green:V.navy,3,`class="brief-beam ray${j}" opacity=".2"`)).join("")}
      ${[0,1,2,3,4].map(j => `<g class="brief-card card${j}" opacity="${j?0:1}">${rect(247,48+j*60,101,44,V.paper,10,`stroke="${j%2?V.green:V.navy}" stroke-width="2"`)}${text(297,65+j*60,triggers[j],8,V.ink,'class="small-label"')}${text(297,82+j*60,outcomes[j],8,j%2?V.green:V.navy,'class="small-label outcome-text"')}</g>`).join("")}
      ${rect(75,329,210,36,V.paper,18,`stroke="${V.orange}" stroke-width="2"`)}${text(180,352,"MINIMUM COMPLIANCE",11,V.orange,'class="risk-label"')}`;
    window.VL_SCENES["W2O1c"] = scene("W2O1c", 36, body, "Prism revealing expectations and risks hidden behind triggers", (r, i, n, instant) => {
      const p = progress(i, n), b = phase(i, cuts), active = clamp(b - 2, 0, 4);
      move(r, ".brief-prism", 0, 0, -12 + i * 5, 1 + (i % 2) * .025, instant);
      for (let j = 0; j < 5; j++) {
        show(r, `.card${j}`, j === active);
        show(r, `.ray${j}`, j === active);
        move(r, `.card${j}`, j === active ? 0 : 14, 0, 0, j === active ? 1 : .86, instant);
      }
      words(r, ".risk-label", risks[active]);
      css(r, ".brief-source", { opacity: String(.65 + .35 * Math.sin((i + 1) * .8) ** 2) });
    });
  }

  // W2O2a — A forensic lens moves across the chronology of the board decision.
  {
    const cuts = [5, 9, 12, 14, 18, 22, 24, 28];
    const marks = [
      {x:46,y:235,a:"TWO YEARS",b:"GUEST DECLINE"},
      {x:105,y:193,a:"EIGHTEEN MONTHS",b:"MOBILE ARRIVAL"},
      {x:164,y:249,a:"TWELVE MONTHS",b:"COST RISE"},
      {x:223,y:207,a:"SIX MONTHS",b:"LOST ACCOUNTS"},
      {x:300,y:158,a:"MARCH TRIGGER",b:"REGULATORY RULE"}
    ];
    const body = `
      ${text(180,25,"DECISION TIMELINE",16,V.ink)}
      ${path("M31 278 C83 258 107 214 158 238 S236 217 316 151",V.navy,5)}
      ${marks.map((m,j)=>`<g class="time-mark tm${j}">${circle(m.x,m.y,13,j===4?V.orange:(j%2?V.green:V.navy))}${text(m.x,m.y-26,m.a,9,V.ink,'class="small-label"')}${text(m.x,m.y+31,m.b,8,j===4?V.orange:V.navy,'class="small-label"')}</g>`).join("")}
      <g class="march-burst" opacity="0">${circle(300,158,34,V.orange,'opacity=".2"')}${circle(300,158,23,V.orange,'opacity=".25"')}</g>
      <g class="lens">${circle(46,235,30,V.paper,`fill-opacity=".42" stroke="${V.orange}" stroke-width="5"`)}${line(67,256,88,277,V.orange,8)}</g>
      <g class="board vls-fade" opacity="0">${rect(222,306,116,48,V.green,12)}${text(280,326,"FIVE WEEKS",10,V.paper)}${text(280,343,"BOARD COMMITMENT",9,V.paper)}</g>
      ${text(88,342,"DISCUSSION ONLY",11,V.navy,'class="timeline-state"')}`;
    window.VL_SCENES["W2O2a"] = scene("W2O2a", 30, body, "Forensic timeline separating four drivers from one trigger", (r, i, n, instant) => {
      const p = progress(i,n), b = phase(i,cuts), x = 46 + p * 254, y = 235 - p * 77 + Math.sin(p * Math.PI * 4) * 15;
      move(r,".lens",x-46,y-235,i*7,1,instant);
      marks.forEach((_,j)=>css(r,`.tm${j}`,{opacity:i >= [5,9,12,14,18][j]?"1":".22"}));
      show(r,".march-burst",i>=18);
      show(r,".board",i>=22);
      words(r,".timeline-state",b<5?"DISCUSSION ONLY":b<6?"DECISIVE EVENT":"FUNDED PROGRAMME");
    });
  }

  // W2O2b — Two routes must reach one credible board destination.
  {
    const cuts = [5,7,13,17,20,22,24,27,30];
    const body = `
      ${text(180,25,"TWO SUCCESS ROUTES",16,V.ink)}
      ${circle(180,80,24,V.navy)}${text(180,84,"ONE BUDGET",9,V.paper)}
      ${path("M180 105 C105 123 77 177 77 242 S119 324 180 340",V.orange,7,'class="route-flow"')}
      ${path("M180 105 C255 123 283 177 283 242 S241 324 180 340",V.green,7,'class="route-flow"')}
      ${text(70,145,"COMPLIANCE ROUTE",10,V.orange,'class="small-label"')}${text(290,145,"GUEST VALUE",10,V.green,'class="small-label"')}
      <g class="route-boat boat-a">${path("M-18 4 H18 L10 15 H-10Z",V.orange,3,`fill="${V.paper}"`)}${circle(0,-4,6,V.orange)}</g>
      <g class="route-boat boat-b">${path("M-18 4 H18 L10 15 H-10Z",V.green,3,`fill="${V.paper}"`)}${circle(0,-4,6,V.green)}</g>
      <g class="baseline vls-fade" opacity="0">${rect(126,205,108,35,V.blue,17)}${text(180,227,"BASELINE EVIDENCE",10,V.navy)}</g>
      <g class="credibility-ring">${circle(180,340,37,V.paper,`stroke="${V.navy}" stroke-width="4"`)}${path("M161 341 L174 353 L200 326",V.green,6)}${text(180,383,"CREDIBLE BOARD",10,V.navy)}</g>
      ${text(180,188,"SHARED PURPOSE",11,V.navy,'class="route-state"')}`;
    window.VL_SCENES["W2O2b"] = scene("W2O2b",31,body,"Two success routes joining compliance and guest value",(r,i,n,instant)=>{
      const p=progress(i,n), b=phase(i,cuts), t=clamp(p*1.12,0,1);
      const ya=112+t*220, spread=Math.sin(t*Math.PI)*92;
      move(r,".boat-a",180-spread,ya,i*5-10,1,instant);
      move(r,".boat-b",180+spread,ya,-i*5+10,1,instant);
      show(r,".baseline",i>=20);
      move(r,".credibility-ring",0,0,i>=27?i*3:0,i>=27?1.08:1,instant);
      words(r,".route-state",b<2?"COMPETING PURPOSES":b<4?"CREDIBILITY RISK":b<7?"MEASURE BOTH":"ALIGNED OUTCOMES");
    });
  }

  // W2O2c — A drafting table constructs a testable programme charter.
  {
    const cuts=[3,5,9,12,15,19,22,24,28,31];
    const rows=["REQUIRED OUTCOME","PROCESS CHANGE","GUEST VALUE","OWNER AUTHORITY","SUCCESS MEASURES"];
    const body=`
      ${text(180,25,"CHARTER BLUEPRINT",16,V.ink)}
      ${rect(43,48,274,278,V.blue,12,`fill-opacity=".42" stroke="${V.navy}" stroke-width="3"`)}
      ${line(61,81,299,81,V.navy,2)}${text(180,70,"PROGRAMME PURPOSE",11,V.navy)}
      ${rows.map((s,j)=>`<g class="charter-row cr${j}" opacity=".16">${circle(72,112+j*38,7,j%2?V.green:V.orange)}${line(89,112+j*38,272,112+j*38,j%2?V.green:V.navy,6)}${text(180,106+j*38,s,9,V.ink,'class="small-label"')}</g>`).join("")}
      <path class="scope-boundary" d="M61 96 H299 V288 H61Z" fill="none" stroke="${V.orange}" stroke-width="3" stroke-dasharray="9 7" opacity="0"/>
      <g class="draft-pencil">${path("M0 0 L45 -45",V.orange,10)}${path("M45 -45 L55 -55 L51 -41Z",V.navy,2,`fill="${V.navy}"`)}</g>
      <g class="charter-seal vls-fade" opacity="0">${circle(278,316,30,V.paper,`stroke="${V.green}" stroke-width="5"`)}${path("M263 316 L274 327 L294 302",V.green,6)}</g>
      ${text(180,354,"SCOPE BOUNDARY",11,V.orange,'class="charter-state"')}`;
    window.VL_SCENES["W2O2c"]=scene("W2O2c",33,body,"Blueprint drawing a verifiable programme charter",(r,i,n,instant)=>{
      const p=progress(i,n), b=phase(i,cuts), row=clamp(Math.floor((i-9)/3),-1,4);
      move(r,".draft-pencil",62+(i%6)*36,105+Math.floor(i/6)*38,-8+(i%3)*5,1,instant);
      rows.forEach((_,j)=>css(r,`.cr${j}`,{opacity:j<=row?"1":".16"}));
      show(r,".scope-boundary",i>=24);
      show(r,".charter-seal",i>=31);
      move(r,".charter-seal",0,0,i>=31?0:25,i>=31?1:.5,instant);
      words(r,".charter-state",b<3?"VAGUE AMBITION":b<6?"TESTABLE PURPOSE":b<9?"DELIVERY BOUNDARY":"BOARD READY");
    });
  }

  // W2O3a — A lighthouse mandate connects teams and fourteen properties.
  {
    const cuts=[5,8,12,14,18,21,23,27,29,32];
    const teams=[{x:47,l:"RECEPTION TEAM"},{x:122,l:"HOUSEKEEPING TEAM"},{x:238,l:"RESERVATIONS TEAM"},{x:313,l:"SYSTEMS TEAM"}];
    const body=`
      ${text(180,25,"AUTHORITY LIGHTHOUSE",16,V.ink)}
      <g class="tower">${path("M151 312 L166 107 H194 L209 312Z",V.navy,4,`fill="${V.paper}"`)}${rect(157,82,46,31,V.orange,8)}${circle(180,97,9,V.paper)}${text(180,338,"PROCESS OWNER",11,V.navy)}</g>
      <path class="light-beam" d="M180 97 L58 45 L36 151Z" fill="${V.blue}" opacity=".55"/>
      ${teams.map((t,j)=>`<g class="team team${j}" opacity=".2">${rect(t.x-27,242+(j%2)*18,54,70,V.blue,7,`stroke="${j%2?V.green:V.navy}" stroke-width="2"`)}${[0,1,2,3].map(k=>rect(t.x-18+(k%2)*18,254+(j%2)*18+Math.floor(k/2)*18,10,10,V.paper,2,`class="hotel-window hw${j}-${k}"`)).join("")}${text(t.x,232+(j%2)*18,t.l,8,V.ink,'class="small-label"')}</g>`).join("")}
      <path class="signal-wave" d="M47 287 C92 220 135 333 180 275 S268 220 313 287" fill="none" stroke="${V.green}" stroke-width="4" opacity="0"/>
      <g class="champions vls-fade" opacity="0">${[60,100,140,220,260,300].map(x=>circle(x,365,7,V.orange)).join("")}${text(180,385,"LOCAL CHAMPIONS",10,V.orange)}</g>
      ${text(180,52,"REAL MANDATE",11,V.orange,'class="mandate-state"')}`;
    window.VL_SCENES["W2O3a"]=scene("W2O3a",34,body,"Authority lighthouse coordinating departments and local properties",(r,i,n,instant)=>{
      const b=phase(i,cuts), angle=-66+(i*17)%132;
      move(r,".light-beam",0,0,angle,1,instant);
      teams.forEach((_,j)=>css(r,`.team${j}`,{opacity:i>=[9,14,18,19][j]?"1":".2"}));
      for(let j=0;j<4;j++)for(let k=0;k<4;k++)css(r,`.hw${j}-${k}`,{fill:(i+j+k)%3?V.paper:V.orange});
      show(r,".signal-wave",i>=16);
      show(r,".champions",i>=23);
      words(r,".mandate-state",b<2?"TITLE ONLY":b<5?"CROSS TEAM AUTHORITY":b<8?"GROUP STANDARD":"CONTINUING OWNER");
    });
  }

  // W2O3b — Nested clocks expose seventeen invisible waiting days.
  {
    const cuts=[4,6,9,10,11,12,16,17,18,21,25,27,29];
    const zones=[
      {a:-90,b:-36,c:V.orange,l:"MAILBOX WAIT"},
      {a:-32,b:38,c:V.green,l:"DOCUMENT WAIT"},
      {a:42,b:118,c:V.navy,l:"TEAM WORK"},
      {a:122,b:176,c:V.orange,l:"PAYMENT WAIT"}
    ];
    const arc=(a,b,r)=>{const p=x=>[180+r*Math.cos(x*Math.PI/180),193+r*Math.sin(x*Math.PI/180)];const s=p(a),e=p(b);return `M${s[0]} ${s[1]} A${r} ${r} 0 ${b-a>180?1:0} 1 ${e[0]} ${e[1]}`;};
    const body=`
      ${text(180,25,"CUSTOMER CLOCK",16,V.ink)}
      ${circle(180,193,132,V.paper,`stroke="${V.blue}" stroke-width="18"`)}
      ${zones.map((z,j)=>`${path(arc(z.a,z.b,123),z.c,14,`class="zone z${j}" opacity=".25"`)}${text(180+96*Math.cos(((z.a+z.b)/2)*Math.PI/180),197+96*Math.sin(((z.a+z.b)/2)*Math.PI/180),z.l,8,z.c,'class="small-label"')}`).join("")}
      ${circle(180,193,72,V.blue,'opacity=".5"')}${circle(180,193,51,V.paper,`stroke="${V.navy}" stroke-width="3"`)}
      <g class="customer-hand">${line(180,193,180,74,V.orange,5)}${circle(180,193,9,V.orange)}</g>
      <g class="team-hand">${line(180,193,180,142,V.navy,4)}${circle(180,193,5,V.navy)}</g>
      <g class="clock-pulse">${circle(180,193,31,V.green,'opacity=".15"')}</g>
      ${text(180,188,"21.1 DAYS",17,V.orange,'class="clock-total"')}${text(180,207,"4.1 DAYS",11,V.navy,'class="team-total"')}
      ${text(180,356,"WHOLE JOURNEY",11,V.navy,'class="clock-state"')}`;
    window.VL_SCENES["W2O3b"]=scene("W2O3b",31,body,"Customer clock revealing active work and hidden waiting time",(r,i,n,instant)=>{
      const p=progress(i,n), b=phase(i,cuts);
      move(r,".customer-hand",0,0,-90+p*630,1,instant);
      move(r,".team-hand",0,0,-90+p*122,1,instant);
      zones.forEach((_,j)=>css(r,`.z${j}`,{opacity:i>=[10,11,12,18][j]?"1":".25"}));
      words(r,".clock-state",b<3?"TWO HONEST CLOCKS":b<7?"WAITING REVEALED":b<10?"CUSTOMER BOUNDARY":"MEASURE COMPLETE WORK");
      words(r,".clock-total",i<12?`${(4.1+p*17).toFixed(1)} DAYS`:"21.1 DAYS");
    });
  }

  // W2O3c — Governance supports a living process after trigger urgency fades.
  {
    const cuts=[5,6,10,11,17,18,21,25,27,29,33];
    const leaves=[{x:119,y:231,r:-35},{x:239,y:229,r:35},{x:102,y:188,r:-50},{x:257,y:184,r:50},{x:130,y:145,r:-25},{x:229,y:143,r:25}];
    const body=`
      ${text(180,25,"GOVERNANCE GARDEN",16,V.ink)}
      <g class="sun-ring">${circle(64,79,34,V.orange,'opacity=".2"')}${circle(64,79,17,V.orange)}${text(64,126,"TRIGGER SPARK",9,V.orange,'class="small-label"')}</g>
      ${rect(46,310,268,35,V.green,16)}${text(180,333,"DAILY GOVERNANCE",11,V.paper)}
      ${path("M180 309 C180 266 168 232 181 196 S190 118 180 83",V.green,9,`class="garden-stem"`)}
      ${leaves.map((l,j)=>`<g class="garden-leaf leaf${j}" opacity=".12" transform="translate(${l.x} ${l.y}) rotate(${l.r})"><path d="M0 0 Q24 -22 46 0 Q23 24 0 0Z" fill="${j%2?V.blue:V.green}" stroke="${V.navy}" stroke-width="1.5"/>${text(23,5,["PROCESS OWNER","EXECUTIVE SPONSOR","BENEFIT MEASURES","CLEAR BASELINE","OPERATING OWNER","LASTING VALUE"][j],7,j%2?V.navy:V.paper,'class="small-label"')}</g>`).join("")}
      <g class="water-drop">${path("M286 63 C273 84 272 96 286 104 C300 96 299 84 286 63Z",V.navy,2,`fill="${V.blue}"`)}</g>
      <g class="traveller vls-fade" opacity="0">${circle(180,65,10,V.orange)}${path("M165 98 Q165 73 180 73 Q195 73 195 98Z",V.orange,2,`fill="${V.orange}"`)}</g>
      ${text(180,375,"SUSTAINED VALUE",11,V.green,'class="garden-state"')}`;
    window.VL_SCENES["W2O3c"]=scene("W2O3c",35,body,"Governance garden sustaining process benefits after urgency fades",(r,i,n,instant)=>{
      const p=progress(i,n), b=phase(i,cuts), active=clamp(Math.floor((i-6)/4)+1,0,6);
      leaves.forEach((_,j)=>{show(r,`.leaf${j}`,j<active);move(r,`.leaf${j}`,0,0,Math.sin((i+j)*.7)*4,j<active?1:.72,instant);});
      move(r,".water-drop",Math.sin(i*.8)*22,18+(i*17)%220,i*9,.9,instant);
      css(r,".sun-ring",{opacity:i<17?"1":".35"});
      show(r,".traveller",i>=31);
      words(r,".garden-state",b<3?"URGENCY FADES":b<7?"GOVERNANCE SUPPORTS":b<10?"BENEFITS VERIFIED":"PERFORMANCE CONTINUES");
    });
  }

  // W2O4a — A moving scan reveals omissions in an attractive brief.
  {
    const cuts=[4,8,10,12,14,16,20,23,25,27,29];
    const chips=["WHY ACT NOW","REQUIRED EVIDENCE","SCOPE BOUNDARY","OWNER MANDATE","CURRENT BASELINE","EMPLOYEE ADOPTION"];
    const body=`
      ${text(180,25,"BRIEF SCANNER",16,V.ink)}
      ${rect(61,48,238,286,V.paper,14,`stroke="${V.navy}" stroke-width="3"`)}
      ${rect(78,67,204,38,V.blue,8)}${text(180,91,"DIGITAL TRANSFORMATION",11,V.navy)}
      ${[0,1,2,3,4].map(j=>line(91,130+j*28,269-(j%2)*35,130+j*28,V.blue,8)).join("")}
      <g class="scan-beam">${rect(48,74,264,12,V.green,6,'opacity=".55"')}${line(48,80,312,80,V.green,3)}</g>
      ${chips.map((s,j)=>`<g class="scan-chip chip${j}" opacity="0">${rect(j%2?189:70,118+Math.floor(j/2)*64,101,43,j%3===0?V.orange:(j%3===1?V.green:V.navy),9)}${text(j%2?239:120,139+Math.floor(j/2)*64,s,8,V.paper,'class="small-label"')}</g>`).join("")}
      <g class="scan-result vls-fade" opacity="0">${circle(180,305,24,V.green)}${path("M168 305 L177 314 L194 293",V.paper,5)}</g>
      ${text(180,368,"ATTRACTIVE PROMISE",11,V.orange,'class="scan-state"')}`;
    window.VL_SCENES["W2O4a"]=scene("W2O4a",30,body,"Scanner exposing missing evidence ownership scope and adoption",(r,i,n,instant)=>{
      const p=progress(i,n), b=phase(i,cuts), y=74+((i*29)%238);
      move(r,".scan-beam",0,y-74,0,1,instant);
      chips.forEach((_,j)=>{const on=i>=[4,14,16,20,23,25][j];show(r,`.chip${j}`,on);move(r,`.chip${j}`,on?0:(j%2?22:-22),0,0,on?1:.8,instant);});
      show(r,".scan-result",i>=27);
      words(r,".scan-state",b<3?"ATTRACTIVE PROMISE":b<6?"OBLIGATION FOUND":b<9?"GAPS EXPOSED":"DEFENSIBLE BRIEF");
    });
  }

  // W2O4b — A crane assembles the board's logic into a load-bearing bridge.
  {
    const cuts=[6,7,10,13,16,17,19,22,24,27,29];
    const pieces=["COMPLIANCE GAP","PROCESS RESPONSE","DELIVERY EVIDENCE","CLEAR GOVERNANCE","LASTING VALUE"];
    const body=`
      ${text(180,25,"BOARD CASE BRIDGE",16,V.ink)}
      ${line(40,75,320,75,V.navy,7)}${line(70,75,70,302,V.navy,5)}
      <g class="crane-trolley">${rect(47,64,48,22,V.orange,5)}${line(71,86,71,177,V.orange,3)}<g class="crane-hook">${path("M62 177 Q71 191 80 177",V.orange,5)}</g></g>
      ${rect(23,307,74,47,V.blue,8)}${rect(263,307,74,47,V.green,8)}
      ${text(60,333,"FUNDING START",9,V.navy,'class="small-label"')}${text(300,333,"BOARD VALUE",9,V.paper,'class="small-label"')}
      ${pieces.map((s,j)=>`<g class="bridge-piece bp${j}" opacity=".12">${rect(86+j*39,259-(j%2)*5,43,20,j%2?V.green:V.navy,4)}${text(107+j*39,248-(j%2)*5,s,7,V.ink,'class="small-label"')}</g>`).join("")}
      ${line(92,281,287,281,V.orange,4,'stroke-dasharray="8 7"')}
      <g class="case-truck" opacity="0">${rect(0,0,48,25,V.orange,6)}${circle(10,30,7,V.navy)}${circle(39,30,7,V.navy)}${text(24,17,"DELIVERY PROOF",7,V.paper)}</g>
      ${text(180,379,"ACCOUNTABLE INVESTMENT",11,V.navy,'class="bridge-state"')}`;
    window.VL_SCENES["W2O4b"]=scene("W2O4b",30,body,"Crane constructing a coherent business case bridge",(r,i,n,instant)=>{
      const p=progress(i,n), b=phase(i,cuts), active=clamp(Math.floor((i-7)/4)+1,0,5);
      move(r,".crane-trolley",p*224,0,0,1,instant);
      css(r,".crane-hook",{opacity:String(.45+.55*((i%2)?1:.4))});
      pieces.forEach((_,j)=>{show(r,`.bp${j}`,j<active);move(r,`.bp${j}`,0,j<active?0:-64,0,j<active?1:.75,instant);});
      show(r,".case-truck",i>=22);
      move(r,".case-truck",80+clamp((i-22)/7,0,1)*190,286,(i%2?1:-1)*2,1,instant);
      words(r,".bridge-state",b<3?"START WITH GAP":b<6?"CONNECT RESPONSE":b<9?"PROVE DELIVERY":"ACCOUNTABLE INVESTMENT");
    });
  }

  // W2O4c — Evidence orbits a finite budget while arguments are tested.
  {
    const cuts=[4,6,8,10,13,15,17,18,21,23,26,29,31,33];
    const body=`
      ${text(180,25,"EVIDENCE FORUM",16,V.ink)}
      ${circle(180,195,119,V.paper,`stroke="${V.blue}" stroke-width="16"`)}
      <circle class="forum-orbit" cx="180" cy="195" r="105" fill="none" stroke="${V.navy}" stroke-width="3"/>
      <g class="budget-core">${circle(180,195,48,V.orange)}${text(180,190,"ONE BUDGET",13,V.paper)}${text(180,210,"CHOOSE WELL",10,V.paper)}</g>
      ${[[180,70,"CASE EVIDENCE",V.navy],[61,222,"YOUR RATIONALE",V.green],[299,222,"PEER CHALLENGE",V.orange]].map((p,j)=>`<g class="forum-node fn${j}">${circle(p[0],p[1],34,V.paper,`stroke="${p[3]}" stroke-width="4"`)}${text(p[0],p[1]+4,p[2],8,p[3],'class="small-label"')}</g>`).join("")}
      ${[0,1,2,3,4,5].map(j=>`<g class="evidence-token et${j}">${circle(180,90,8,j%2?V.green:V.navy)}</g>`).join("")}
      <g class="peer-arrows" opacity="0">${path("M91 240 Q180 306 269 240",V.orange,4)}${path("M261 249 L271 240 L257 235",V.orange,3)}</g>
      <g class="judgement-ring" opacity="0">${circle(180,195,64,V.paper,`fill-opacity=".18" stroke="${V.green}" stroke-width="5"`)}${path("M153 197 L172 216 L209 172",V.green,8)}</g>
      ${text(180,361,"THREE PRESSURES",11,V.navy,'class="forum-state"')}`;
    window.VL_SCENES["W2O4c"]=scene("W2O4c",34,body,"Forum arena testing evidence rationale and competing budget choices",(r,i,n,instant)=>{
      const p=progress(i,n), b=phase(i,cuts), base=i*17;
      for(let j=0;j<6;j++){
        const a=(base+j*60)*Math.PI/180, rad=82+(j%2)*18;
        move(r,`.et${j}`,Math.cos(a)*rad,Math.sin(a)*rad+105,j*20+i*5,1,instant);
        show(r,`.et${j}`,i>=Math.max(2,j*3));
      }
      show(r,".peer-arrows",i>=21);
      show(r,".judgement-ring",i>=26);
      move(r,".judgement-ring",0,0,i*4,i>=26?1:.5,instant);
      css(r,".fn1",{opacity:i>=10?"1":".35"});css(r,".fn2",{opacity:i>=18?"1":".35"});
      words(r,".forum-state",b<3?"THREE PRESSURES":b<6?"SELECT RATIONALE":b<9?"CITE EVIDENCE":b<12?"TEST ASSUMPTIONS":"DEFENSIBLE JUDGEMENT");
    });
  }
})();