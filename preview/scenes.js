// Animated lesson scenes, synced to narration by sentence index (`at`).
// API: Scenes.mount(el); Scenes.load(lessonIdx, sectionIdx); Scenes.step(sentenceIdx); Scenes.showAll()
(() => {
  const I = { // tiny inline icons (stroke = currentColor)
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
    check: '<path d="M4 12l5 5L20 6"/>',
    eq: '<path d="M5 9h14M5 15h14"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>',
    one: '<rect x="5" y="5" width="14" height="14" rx="3"/><path d="M11 9l2-1v8"/>',
    link: '<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1"/><path d="M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>',
    gauge: '<path d="M4 16a8 8 0 1 1 16 0"/><path d="M12 16l4-5"/>',
    chart: '<path d="M5 19V9M10 19V5M15 19v-7M20 19v-4"/>',
    users: '<circle cx="9" cy="9" r="3"/><path d="M3 19a6 6 0 0 1 12 0"/><path d="M16 6a3 3 0 0 1 0 6M17 19a6 6 0 0 0-2-4"/>',
    flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
    dash: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 15l3-3 3 2 4-5"/>',
    brain: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
    audit: '<path d="M7 3h7l4 4v14H7z"/><path d="M10 12h5M10 16h5M14 3v4h4"/>',
  };
  const ic = (k) => `<div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${I[k]}</svg></div>`;
  const arrow = '<div class="arrow"><svg viewBox="0 0 16 30"><path d="M8 2v24M2 20l6 7 6-7"/></svg></div>';

  // ---- scene library: key = lessonId:sectionIndex. Each beat has `at` (sentence index) and HTML; items inside carry data-at.
  const it = (at, html, cls = "") => `<div class="st-it ${cls}" data-at="${at}">${html}</div>`;
  // Course-specific classic scenes (fallback only; every OPER621 section has moments, so the looks are used instead).
  const S = {};

  // ---------- engine ----------
  let root, track, bar, cap, beats = [], items = [], max = 0, cur = -1;
  const C = () => window.COURSE;

  function mount(el) {
    root = el; root.classList.add("stage");
    root.innerHTML = `<div class="st-cap"><span id="stCapL"></span><span id="stCapR"></span></div><div class="st-fade t"></div>
      <div class="st-track"></div><div class="st-fade b"></div><div class="st-bar"></div>`;
    track = root.querySelector(".st-track"); bar = root.querySelector(".st-bar");
  }

  let lastKey = "";
  function load(l, s, force) {
    if (!root) return;
    if (!force && lastKey === `${l}:${s}`) return;
    lastKey = `${l}:${s}`;
    const L = C().lessons[l], sec = L.sections[s];
    const scene = S[`${L.id}:${s}`] || [{ at: 0, html: `<div class="st-kicker">Lesson ${l + 1}</div><h2 class="st-h">${sec.title}</h2>` }];
    loadBeats(`<b>Lesson ${l + 1}</b> · ${L.title}`, `${s + 1}/${L.sections.length}`, scene);
    lastKey = `${l}:${s}`;
  }

  // Any custom scene (quizzes, assignments): beats = [{at, html, fx}]
  function loadBeats(capL, capR, scene) {
    lastKey = "custom:" + capL + capR;
    root.querySelector("#stCapL").innerHTML = capL;
    root.querySelector("#stCapR").textContent = capR;
    track.style.transition = "none"; track.style.transform = "translateY(0)";
    // inline px sizes scale with the stage too (--k, set by fit())
    track.innerHTML = scene.map((b, i) => `<section class="st-beat" data-at="${b.at}" data-fx="${b.fx || ""}" data-i="${i}">${b.html}</section>`).join("")
      .replace(/(\d*\.?\d+)px/g, "calc($1px*var(--k,1))");
    void track.offsetHeight; track.style.transition = "";
    beats = [...track.querySelectorAll(".st-beat")];
    items = [...track.querySelectorAll(".st-it")];
    max = Math.max(...[...track.querySelectorAll("[data-at]")].map((e) => +e.dataset.at), 1);
    cur = -1; bar.style.width = "0";
  }

  function countUp(el) {
    const to = +el.dataset.count, unit = el.dataset.unit ?? "°C", t0 = performance.now();
    const f = (t) => { const p = Math.min(1, (t - t0) / 1200), e = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(to * e) + unit; if (p < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  }
  function fx(b) {
    if (b.dataset.done) return; b.dataset.done = 1;
    const k = b.dataset.fx;
    setTimeout(() => {
      b.querySelectorAll("[data-count]").forEach(countUp);
      if (k === "bars") b.querySelectorAll(".bar").forEach((x) => (x.style.height = (+x.dataset.h * 1.6) + "px"));
      if (k === "donut") b.querySelectorAll(".arc").forEach((x) => (x.style.strokeDashoffset = 301.6 * (1 - +x.dataset.pct / 100)));
      if (k === "tags") b.querySelector(".st-frac").classList.add("show-tags");
      if (k === "route") setTimeout(() => b.querySelector(".st-route").classList.add("broken"), 1500);
      if (k === "reveal") b.closest(".st-track").querySelectorAll(".st-opt[data-right]").forEach((o) => o.classList.add("right"));
    }, 350);
  }

  function step(i) {
    if (!root || !beats.length) return;
    cur = Math.max(cur, i);
    let last = null;
    beats.forEach((b) => { if (+b.dataset.at <= cur) { if (!b.classList.contains("in")) { b.classList.add("in"); fx(b); } last = b; } });
    let newest = null;
    items.forEach((x) => { if (+x.dataset.at <= cur && !x.classList.contains("in")) { x.classList.add("in"); newest = x; if (x.classList.contains("st-card")) setTimeout(() => x.classList.add("settled"), 1600); } });
    // pipeline progress line follows the newest step
    track.querySelectorAll(".st-pipe").forEach((p) => {
      const on = [...p.querySelectorAll(".st-it.in")].pop(); const prog = p.querySelector(".prog");
      if (on && prog) prog.style.height = on.offsetTop + 18 + "px";
    });
    // focus: dim older beats, glide the newest item to the middle of the frame
    beats.forEach((b) => b.classList.toggle("dim", b.classList.contains("in") && b !== last && beats.indexOf(b) < beats.indexOf(last) - 1));
    const focus = newest && last && last.contains(newest) ? newest : last;
    // Whole scene shorter than the stage: centre it vertically. Otherwise glide to the newest item.
    const tb = track.getBoundingClientRect();
    const full = beats[beats.length - 1].getBoundingClientRect().bottom - tb.top, free = root.clientHeight - full - 24;
    if (free > 0) track.style.transform = `translateY(${free / 2}px)`;
    else if (focus) {
      const top = focus.getBoundingClientRect().top - tb.top;
      // Never scroll further than needed to show the last revealed beat, so short scenes stay fully visible.
      const lastBottom = last.getBoundingClientRect().bottom - tb.top;
      const y = Math.max(0, Math.min(top + focus.offsetHeight / 2 - root.clientHeight * 0.45, lastBottom - root.clientHeight + 48));
      track.style.transform = `translateY(${-y}px)`;
    }
    bar.style.width = Math.min(100, ((cur + 1) / (max + 1)) * 100) + "%";
  }

  function showAll() { step(99); }

  // Scale everything with the stage size: 1 in the normal view, larger in full screen.
  function fit() {
    if (!root) return;
    const k = Math.max(1, Math.min(root.clientHeight / 600, root.clientWidth / 300, 2.2));
    root.style.setProperty("--k", k.toFixed(3));
    step(-1); // re-centre / re-glide for the new size
  }

  window.Scenes = { mount, load, loadBeats, step, showAll, fit, item: it };
})();
