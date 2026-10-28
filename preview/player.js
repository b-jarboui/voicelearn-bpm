// Adaptive narrated player: present → check → evaluate per section / outcome / CLO → remediate every weak section with a
// NEW explanation and FRESH questions → retest, looping until every section reaches the target (or the bank runs out,
// in which case the section is flagged for instructor review) → report.
// One control: Pause / Continue (it becomes "Repeat question" while waiting for an answer).
(() => {
  const C = window.COURSE, A = window.ADAPTIVE, $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const sentences = (t) => (t.match(/[^.!?…]+[.!?…]+["')]*|\S[^.!?…]*$/g) || []).map((x) => x.trim()).filter(Boolean);
  const L = "ABCD", pct = (x) => Math.round((x || 0) * 100);
  const LOS = Object.keys(A.outcomes), SECS = Object.keys(A.sections), CLOS = Object.keys(A.clos);
  const allQ = {}; A.bank.forEach((q) => (allQ[q.id] = q));
  let FAST = false; // QA only: switched on from the console with __vl.fast(true); never from the URL, never saved
  const lessonSecs = (l) => C.lessons[l].sections.map((s) => s.sec).filter(Boolean);
  const plain = (s) => String(s).replace(/\|/g, " ");

  // Stable pseudo-random numbers from a string (per learner seed), used for shuffles and item choice.
  const hash = (s) => { let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0; return h; };
  function perm(n, key) {
    let h = hash(key); const idx = [...Array(n).keys()];
    for (let i = n - 1; i > 0; i--) { h = (Math.imul(h, 1103515245) + 12345) >>> 0; const j = h % (i + 1); [idx[i], idx[j]] = [idx[j], idx[i]]; }
    return idx;
  }

  // ---------- state (this device) ----------
  const WK = window.WEEK || 1; // progress and history are stored per week
  const KEY = `voicelearn.oper621.w${WK}.v1`;
  const lessonPlan = (l) => C.lessons[l].sections.map((_, s) => ({ kind: "sec", l, s })).concat([{ kind: "quiz", l, round: 0, qs: null }, { kind: "result", l, round: 0 }]);
  const fresh = () => ({ seed: Math.random().toString(36).slice(2), queue: lessonPlan(0), idx: 0, part: "main", sent: 0, q: 0, used: {}, hist: [], rounds: {}, lessons: {}, flags: {}, rev: {} });
  let P;
  try { P = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!P || !Array.isArray(P.queue) || !P.queue[P.idx] || !Array.isArray(P.hist)) P = fresh();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) {} };
  const cur = () => P.queue[P.idx];
  const rkey = (st) => `${st.l}:${st.round}`;

  let view = "home", playing = false, waiting = false, tok = 0, script = null;

  // ---------- mastery ----------
  const secHist = (s) => P.hist.filter((x) => x.sec === s);
  // Section mastery = share correct in the learner's last A.window answers on that section (one consistent rule:
  // a good remediation round counts only through those last answers, it can no longer override them).
  function secM(s) {
    const all = secHist(s); if (!all.length) return null;
    const h = all.slice(-A.window);
    return h.filter((x) => x.ok).length / h.length;
  }
  const secOk = (s) => secHist(s).length >= A.minEvidence && secM(s) >= A.target - 1e-9;
  const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : null);
  const loM = (lo) => avg(SECS.filter((s) => A.sections[s].lo === lo).map(secM).filter((m) => m != null));
  const cloM = (c) => avg(LOS.filter((k) => A.outcomes[k].clo === c).map(loM).filter((m) => m != null));

  // Choose k fresh items for a section: one per target difficulty, varied types, never an item used before.
  function pick(sec, k, diffs) {
    const pool = A.bank.filter((q) => q.sec === sec && !P.used[q.id]);
    const out = [], types = new Set();
    for (let i = 0; i < k && pool.length; i++) {
      const d = diffs[Math.min(i, diffs.length - 1)];
      pool.sort((a, b) => (Math.abs(a.diff - d) - Math.abs(b.diff - d)) || ((types.has(a.type) ? 1 : 0) - (types.has(b.type) ? 1 : 0)) || (hash(P.seed + a.id) - hash(P.seed + b.id)));
      const q = pool.shift(); out.push(q.id); types.add(q.type); P.used[q.id] = true;
    }
    return out;
  }
  function firstCheck(l) {
    const secs = lessonSecs(l), k = Math.max(A.firstCheckPerSection, Math.ceil(A.firstCheck / secs.length));
    const diffs = k >= 4 ? [1, 2, 2, 3] : k === 3 ? [1, 2, 3] : [1, 2];
    const qs = secs.flatMap((s) => pick(s, k, diffs));
    return perm(qs.length, P.seed + "first" + l).map((i) => qs[i]);
  }

  // ---------- speech ----------
  const synth = window.speechSynthesis;
  // Own settings key: the original prototype lives on the same github.io origin and must not share (or break) our settings.
  const VKEY = "voicelearn.oper621.voice.v2";
  let VS = { uri: "", rate: 0.95, pitch: 1, look: "story" };
  try { VS = Object.assign(VS, JSON.parse(localStorage.getItem(VKEY)) || {}); } catch (e) {}
  // Sanitize saved values: a bad rate/pitch (NaN, a string, out of range) makes some engines silent.
  const num = (x, lo, hi, d) => { x = Number(x); return Number.isFinite(x) ? Math.min(hi, Math.max(lo, x)) : d; };
  VS.rate = num(VS.rate, 0.5, 2, 0.95); VS.pitch = num(VS.pitch, 0.5, 1.5, 1); if (typeof VS.uri !== "string") VS.uri = "";
  if (!["story", "codex", "notebook", "journey"].includes(VS.look)) VS.look = "story";
  if (VS.mode !== "captions") VS.mode = "voice"; // "captions" = no speech, captions advance at reading pace
  const saveVS = () => { try { localStorage.setItem(VKEY, JSON.stringify(VS)); } catch (e) {} };
  const enVoices = () => (synth ? synth.getVoices().filter((v) => /^en/i.test(v.lang)) : []);
  const UA = navigator.userAgent, IS_EDGE = /\bEdg[A-Za-z]*\//.test(UA), IS_ANDROID = /Android/i.test(UA);
  const IS_APPLE = /iPhone|iPad|iPod|Macintosh/i.test(UA) && !/Chrome|CriOS|Edg|Android/i.test(UA) || /iPhone|iPad|iPod/i.test(UA);
  // Free voice ranking (27 Oct 2026). Only the voices the device or browser already has, no downloads, no accounts.
  // Higher score = more natural. Edge "Online (Natural)" > Apple Premium/Enhanced/Siri > Google voices > good local voices
  // > compact/legacy voices; novelty and eSpeak voices are pushed to the bottom.
  const NOVELTY = /\b(albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|organ|pipe organ|superstar|trinoids|whisper|wobble|zarvox|fred|junior|kathy|ralph|princess|eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley)\b/i;
  const EDGE_BEST = ["ava", "andrew", "emma", "brian", "jenny", "aria", "guy", "christopher", "eric", "michelle", "roger", "steffan", "sonia", "ryan", "libby", "natasha", "william"];
  const APPLE_GOOD = ["ava", "zoe", "allison", "samantha", "susan", "evan", "nathan", "tom", "nicky", "aaron", "joelle", "noelle", "daniel", "serena", "kate", "oliver", "karen", "moira", "tessa", "rishi", "lee"];
  function vScore(v) {
    const n = (v.name || "") + " " + (v.voiceURI || ""), lang = String(v.lang || "").replace("_", "-");
    let s = 0;
    if (/undefined/i.test(v.name || "") || !v.lang) s -= 300; // broken entries (Edge 150 bug: "Microsoft undefined Online (Natural)")
    if (/espeak|eloquence|speech\.synthesis\.voice\./i.test(n) || NOVELTY.test(v.name || "")) s -= 80; // eSpeak, Apple Eloquence/Effects packs
    if (/compact/i.test(n)) s -= 15;
    if (IS_ANDROID && /^en[-_]us$/i.test(lang)) s += 64; // Chrome Android lists locales; en-US plays the phone's Google voice
    if (/online \(natural\)/i.test(n)) s += IS_EDGE ? 100 : 20; // Edge plays these itself; elsewhere they rarely work
    else if (/\(natural\)/i.test(n)) s += IS_EDGE ? 40 : -10;    // local Narrator voices: fine in Edge, often silent in Chrome
    if (/premium/i.test(n)) s += 90; else if (/enhanced/i.test(n)) s += 80; else if (/siri/i.test(n)) s += 75;
    if (/^google/i.test(v.name || "")) s += IS_ANDROID ? 70 : 55;
    if (IS_ANDROID && /-x-[a-z]{3}-(network|local)/i.test(n)) s += /network/i.test(n) ? 66 : 62;
    if (IS_ANDROID && v.default) s += 65; // the phone's own Google TTS voice
    if (IS_APPLE && v.localService) { const i = APPLE_GOOD.findIndex((g) => new RegExp("\\b" + g + "\\b", "i").test(v.name)); if (i >= 0) s += 40 - i; }
    if (IS_EDGE) { const i = EDGE_BEST.findIndex((g) => new RegExp("\\b" + g, "i").test(v.name)); if (i >= 0 && /natural/i.test(n)) s += 20 - i; if (/multilingual/i.test(n)) s -= 3; } // plain English voice before the multilingual twin
    if (/microsoft (zira|david|mark|hazel|george|susan)/i.test(n)) s += 30; // classic Windows voices: clear, a bit robotic
    if (/^en-US/i.test(lang)) s += 8; else if (/^en-GB/i.test(lang)) s += 6; else if (/^en-(AU|CA|IE|NZ)/i.test(lang)) s += 4;
    if (v.default) s += 3;
    if (avoidNetwork && !v.localService) s -= 500; // after a network-voice failure only local voices are used
    return s;
  }
  const rankedVoices = () => enVoices().map((v, i) => ({ v, s: vScore(v), i })).sort((a, b) => b.s - a.s || a.i - b.i).map((x) => x.v);
  const bestVoice = () => { const r = rankedVoices()[0]; return r && !(avoidNetwork && !r.localService) ? r : rankedVoices().find((v) => v.localService); };
  // The learner's own choice (saved per device) always wins; otherwise the best-ranked voice on this device.
  function voice() {
    const vs = enVoices(), saved = VS.uri && vs.find((v) => v.voiceURI === VS.uri);
    if (saved && !(avoidNetwork && !saved.localService)) return saved;
    return bestVoice() || (avoidNetwork ? undefined : vs.find((v) => v.default) || vs[0]);
  }
  // Speech-only text: what the voice reads (captions keep the original wording). Avoids symbols and abbreviations that
  // voices spell out or skip, and keeps the punctuation that carries intonation.
  const SAY = [
    [/\be\.g\.,?\s*/gi, "for example, "], [/\bi\.e\.,?\s*/gi, "that is, "], [/\betc\./gi, "et cetera."], [/\bvs\.?\s/gi, "versus "],
    [/(\d)\s*%/g, "$1 percent"], [/%/g, " percent"], [/\s*&\s*/g, " and "], [/\s*(→|->|⇒)\s*/g, ", then "], [/\s+[—–]\s+|—/g, ", "],
    [/(\w)\/(\w)/g, "$1 or $2"], [/\s*[•·]\s*/g, ", "], [/\bBPMN\b/g, "B P M N"], [/\bBPM\b/g, "B P M"], [/\bBPI\b/g, "B P I"],
    [/\bKPIs\b/g, "K P Is"], [/\bKPI\b/g, "K P I"], [/\bCLOs\b/g, "C L Os"], [/\bCLO\b/g, "C L O"], [/\bSOPs\b/g, "S O Ps"],
    [/[*_#`~^|<>]/g, " "], [/\s*\(\s*/g, ", "], [/\s*\)\s*([,.;:!?])/g, "$1"], [/\s*\)\s*/g, ", "], [/,\s*,/g, ","], [/,\s*([.!?])/g, "$1"], [/\s{2,}/g, " "],
  ];
  const sayText = (t) => SAY.reduce((s, [a, b]) => s.replace(a, b), String(t)).trim();
  // ---------- pacing (all pauses in one place, milliseconds) ----------
  const PACE = {
    lead: 350,        // the visual appears, then this short beat, then the voice (never longer than the gap itself)
    sentence: 300,    // pause between sentences of the same paragraph (talking, not a list)
    join: 28,        // two short sentences of the same moment are spoken as ONE utterance when together ≤ this many words
    moment: 1100,     // pause before a sentence that brings in a new visual moment
    part: 1800,       // pause before a new lesson part, review, result or report screen
    question: 1800,   // pause before each question screen
    feedback: 700,    // pause after answering, before the feedback is spoken
    rate: 0.95,       // default speaking rate (the Speed slider overrides it)
    startTimeout: 6000, // no "start" from the engine within this time = retry, then reading pace
  };
  // Reading pace used only when the device cannot speak: about 170 words per minute, never under 3 seconds a sentence.
  const words = (s) => String(s).trim().split(/\s+/).length;
  const readMs = (s) => Math.max(3000, (words(s) / 170) * 60000);
  const speakMs = (s) => (words(s) / 165) * 60000 / (VS.rate || 1);
  const SLOG = []; // recent speech events, shown in the Voice panel to diagnose devices
  const log = (x) => { SLOG.push(x); if (SLOG.length > 30) SLOG.shift(); };
  let silent = !synth, silentWhy = synth ? "" : "this browser has no speech engine.", noStart = 0, avoidNetwork = false;
  function goSilent(why) {
    if (silent) return; silent = true; silentWhy = why; log("silent:" + why);
    const n = $("vNote"); if (n) n.textContent = `Voice unavailable here: ${why} Captions now advance at reading pace. Try another voice in this panel, or open the page in Chrome, Edge or Safari.`;
    bar();
  }
  const FATAL = ["not-allowed", "synthesis-unavailable", "audio-hardware", "audio-busy"];
  // Speak list[from..] as complete sentences: show the sentence's visual, a short beat, speak it, wait for the engine's
  // "end", pause, then the next one. Never splits a sentence. For flowing narration, two short consecutive sentences of the
  // same moment (opts.canJoin(k) = sentence k+1 brings no new visual) are spoken as ONE utterance so the intonation carries;
  // the second caption/visual appears at the word boundary where it starts (or at an estimated time on engines without
  // boundary events, e.g. Android and network voices). The step only moves on after the last sentence has been spoken.
  // opts.pre = pause before the first sentence; opts.gapAfter(k) = pause after sentence k.
  const IS_CHROME_DESKTOP = /Chrome\//.test(UA) && !IS_EDGE && !IS_ANDROID && !/CriOS|OPR\//.test(UA);
  const ENDS = /[.!?…]["'”’)\]]*$/;
  function speak(list, from, onSentence, onDone, opts = {}) {
    const my = ++tok; if (synth) synth.cancel();
    const later = (ms, f) => setTimeout(() => { if (my === tok) f(); }, ms);
    const gapAfter = opts.gapAfter || (() => PACE.sentence);
    const canJoin = opts.canJoin || (() => false);
    let i = from;
    // How many sentences (1 or 2) the utterance starting at k carries.
    const group = (k) => (!FAST && !silent && VS.mode !== "captions" && synth && k + 1 < list.length && canJoin(k) &&
      ENDS.test(String(list[k]).trim()) && words(list[k]) + words(list[k + 1]) <= PACE.join ? 2 : 1);
    const next = (lead) => { if (i >= list.length) return onDone(); const k = i, n = group(k); i += n; onSentence(k); later(FAST ? 40 : lead, () => say(k, n, 0)); };
    // The silence between two utterances equals the gap (the lead beat before the voice is part of it).
    const after = (last) => {
      const gap = last + 1 < list.length ? gapAfter(last) : PACE.sentence, lead = Math.min(PACE.lead, gap);
      later(FAST ? 60 : Math.max(0, gap - lead), () => next(lead));
    };
    // Reading pace (captions only / no voice): each sentence shown for its own reading time.
    const readOut = (k, n, wait = 0) => later(Math.max(0, readMs(list[k]) - wait), () => { if (n === 2) { onSentence(k + 1); later(readMs(list[k + 1]), () => after(k + 1)); } else after(k); });
    const say = (k, n, attempt) => {
      if (FAST) return later(120, () => { if (n === 2) onSentence(k + 1); after(k + n - 1); });
      if (silent || VS.mode === "captions") return readOut(k, n);
      const parts = list.slice(k, k + n).map(sayText), text = parts.join(" "), split = parts[0].length + 1;
      const u = new SpeechSynthesisUtterance(text);
      const v = voice();
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-US";
      u.rate = VS.rate; u.pitch = VS.pitch; u.volume = window.__vlMute ? 0 : 1;
      window.__vlU = u; // keep a reference so the engine cannot lose the utterance before it starts
      let started = false, ended = false, words0 = 0, second = n === 1, keep = 0; const t0 = performance.now();
      const showSecond = () => { if (second || my !== tok) return; second = true; onSentence(k + 1); log("join"); };
      const done = () => { clearInterval(keep); if (!second) showSecond(); };
      u.onstart = () => {
        started = true; noStart = 0; log("start");
        // Engines without boundary events: show the second sentence at its estimated start.
        if (n === 2) later(speakMs(list[k]) * 0.92, () => { if (!words0) showSecond(); });
        // Chrome desktop cuts network (Google) voices after ~15 s: a pause/resume every 10 s keeps them talking.
        if (IS_CHROME_DESKTOP && v && !v.localService) keep = setInterval(() => { if (my !== tok || ended) return clearInterval(keep); if (synth.speaking && !synth.paused) { synth.pause(); synth.resume(); } }, 10000);
      };
      u.onboundary = (e) => { words0++; if (n === 2 && e.charIndex >= split) showSecond(); };
      u.onend = () => { if (ended) return; ended = true; done(); log(`end ${Math.round(performance.now() - t0)}ms ${words0}w`); if (my === tok) after(k + n - 1); };
      u.onerror = (e) => {
        if (ended) return;
        if (e.error === "interrupted" || e.error === "canceled") {
          if (my !== tok) return; // our own cancel (pause, skip, a new step)
          // Interrupted by something else (another tab, a system sound, iOS audio session): say it again once, then go on.
          ended = true; clearInterval(keep); log("interrupted");
          return attempt < 1 ? later(250, () => say(k, n, attempt + 1)) : (done(), after(k + n - 1));
        }
        ended = true; clearInterval(keep); log("error:" + e.error);
        if (my !== tok) return;
        // A network voice (e.g. Google or "Online") that fails: switch to a local voice and say the sentences again.
        if (v && !v.localService && !avoidNetwork) { avoidNetwork = true; return later(200, () => say(k, n, attempt)); }
        if (FATAL.includes(e.error) || attempt >= 1) { goSilent(`the speech engine reported "${e.error}".`); return readOut(k, n); }
        later(300, () => say(k, n, attempt + 1));
      };
      try { if (synth.paused) synth.resume(); } catch (e) {}
      synth.speak(u);
      // The engine never started: try once more (switching away from a network voice), then reading pace.
      // A quick check for network voices (Edge "Online (Natural)", Google) so a dead connection costs little time.
      const startMs = v && !v.localService && !IS_ANDROID ? 3500 : PACE.startTimeout;
      later(startMs, () => {
        if (started || ended || document.hidden) return;
        ended = true; clearInterval(keep); synth.cancel(); log("no-start");
        if (v && !v.localService && !avoidNetwork) { avoidNetwork = true; return later(150, () => say(k, n, attempt)); }
        if (++noStart >= 2) goSilent("the speech engine never starts speaking.");
        if (attempt < 1 && !silent) return later(150, () => say(k, n, attempt + 1));
        readOut(k, n, startMs);
      });
      // Safety net for engines that drop the "end" event: move on after a generous time.
      later(Math.max(9000, speakMs(text) * 2.5 + 4000), () => { if (started && !ended) { ended = true; done(); log("no-end"); synth.cancel(); after(k + n - 1); } });
    };
    later(FAST ? 0 : opts.pre || 0, () => next(PACE.lead));
  }
  const stopSpeech = () => { tok++; if (synth) synth.cancel(); };

  let wake = null;
  async function keepAwake() { try { if (!wake && "wakeLock" in navigator && !document.hidden) { wake = await navigator.wakeLock.request("screen"); wake.onrelease = () => (wake = null); } } catch (e) {} }
  document.addEventListener("visibilitychange", () => { if (!document.hidden && playing) { keepAwake(); play(); } });

  // ---------- views ----------
  const stageEl = document.createElement("div");
  Scenes.mount(stageEl);
  const lookEl = document.createElement("div");
  lookEl.className = "look";
  let look = null, lookStep = -1;
  const lookStyle = () => (window.STYLES || []).find((s) => s.id === (VS.look || "story")) || null;
  function fitLook() {
    const k = Math.max(1, Math.min(lookEl.clientHeight / 600, lookEl.clientWidth / 300, 2.2));
    lookEl.style.setProperty("--k", k.toFixed(3));
    lookEl.toggleAttribute("data-tall", lookEl.clientHeight / Math.max(1, lookEl.clientWidth) > 1.75);
  }
  // The quiz/result stage takes the colours of the chosen look (Story cards keeps the default dark blue).
  function updateLookClass() { stageEl.classList.remove("look-codex", "look-notebook", "look-journey"); if (["codex", "notebook", "journey"].includes(VS.look)) stageEl.classList.add("look-" + VS.look); }
  function showLook(on) { lookEl.hidden = !on; stageEl.hidden = on; }
  function vstep(j) { if (look) { lookStep = j; look.step(j); } else Scenes.step(Math.max(0, j)); }
  function loadLook(key, lessonLabel, title, body) {
    const s = lookStyle(), moments = window.MOMENTS && MOMENTS[key];
    look = null;
    if (!s || !moments) { showLook(false); return false; }
    showLook(true);
    lookEl.className = "look"; s.mount(lookEl); fitLook();
    s.load({ lesson: lessonLabel, title, sentences: body, moments });
    look = s; lookStep = -1; s.step(-1);
    return true;
  }

  const badge = (label, m, title) => `<span class="pill ${m == null ? "" : m >= A.target - 1e-9 ? "done" : "warn"}" title="${esc(title)}">${esc(label)}${m == null ? "" : " · " + pct(m) + "%"}</span>`;
  const LOOKS = [["story", "Story cards", "Full-screen cards that turn like social stories"], ["codex", "Signal Studio", "A growing field guide, one idea at a time"],
    ["notebook", "Teacher's Notebook", "Warm paper notes, sketches and teaching annotations"], ["journey", "Process Journey", "Each idea is a stop along one connected route"]];
  // Weeks listed in weeks/manifest.js, plus any other week folder found on the server (a HEAD probe of its four files), so a new week appears without code changes.
  const weekList = () => { const l = (window.WEEKS || []).slice(); if (!l.some((w) => w.n === WK)) l.push({ n: WK, title: C.title }); return l.sort((a, b) => a.n - b.n); };
  let probed = false;
  function probeWeeks() {
    if (probed || !window.fetch || location.protocol === "file:") return; probed = true;
    const known = new Set((window.WEEKS || []).map((w) => w.n)); let found = 0;
    for (let n = 2; n <= 14; n++) if (!known.has(n)) {
      const d = `weeks/week${n < 10 ? "0" : ""}${n}/`;
      Promise.all(["course.js", "bank.js", "moments.js", "adaptive-week.js"].map((f) => fetch(d + f, { method: "HEAD", cache: "no-store" }).then((r) => r.ok))).then((r) => {
        if (r.every(Boolean)) { (window.WEEKS = window.WEEKS || []).push({ n, title: "Week " + n + " (new)" }); found++; const s = $("wkSel"); if (s && !s.querySelector(`option[value="${n}"]`)) { const o = document.createElement("option"); o.value = n; o.textContent = `Week ${n}`; const after = [...s.options].find((x) => +x.value > n); s.insertBefore(o, after || null); } }
      }).catch(() => {});
    }
  }
  function renderHome() {
    view = "home"; document.body.dataset.view = "home";
    const st = cur(), les = C.lessons[st.l] || C.lessons[0];
    const flagged = SECS.filter((s) => P.flags[s]);
    $("main").innerHTML = `
      <div class="card"><div class="eyebrow">Week</div><label class="fld" style="display:grid;gap:6px"><span class="muted" style="font-size:15px">Choose the week to study. Each week keeps its own progress.</span><select id="wkSel" style="font:inherit;padding:10px;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--ink);width:100%">${weekList().map((w) => `<option value="${w.n}"${w.n === WK ? " selected" : ""}>Week ${w.n} · ${esc(w.title)}</option>`).join("")}</select></label>${window.REVISION_WEEK ? `<div class="muted" style="font-size:15px">Week ${window.REVISION_WEEK}: revision week, see Moodle (no lessons here).</div>` : ""}</div>
      <div class="card"><div class="eyebrow">Continue</div><h1>${st.kind === "report" ? "Your achievement report" : `Lesson ${st.l + 1}: ${esc(les.title)}`}</h1>
        <div class="row"><button class="primary" id="resume">▶ Continue</button><button id="restart">Start over</button></div></div>
      <div class="card"><div class="eyebrow">Look · how the lessons appear</div>
        <div class="looks" role="group" aria-label="Choose a look">${LOOKS.map(([id, name, note]) => `<button class="lookbtn ${id}" data-look="${id}" aria-pressed="${(VS.look || "story") === id}"><span class="sw" aria-hidden="true"></span><b>${name}</b><span class="muted">${note}</span></button>`).join("")}</div></div>
      <div class="card"><div class="eyebrow">Achievement · target ${pct(A.target)}% on every part</div>
        <div class="row">${CLOS.map((c) => badge(`CLO ${c}`, cloM(c), A.clos[c].full)).join(" ")}</div>
        <div class="row">${LOS.map((k) => badge(A.outcomes[k].name, loM(k), A.outcomes[k].full)).join(" ")}</div>
        ${flagged.length ? `<div class="muted" style="font-size:15px">Flagged for instructor review: ${flagged.map((s) => esc(A.sections[s].name)).join(", ")}</div>` : ""}</div>
      <div class="card"><div class="eyebrow">${esc(C.code)} · ${esc(C.subtitle)}</div><h2>${esc(C.title)}</h2>
        <div>${C.lessons.map((x, l) => { const r = P.lessons[x.id];
          const pill = r ? (r.passed ? `<span class="pill done">Mastered</span>` : `<span class="pill warn">${r.flagged ? "Flagged" : "In progress"}</span>`) : (st.l === l ? '<span class="pill now">In progress</span>' : '<span class="pill">Not started</span>');
          return `<div class="lesson"><div style="min-width:0"><b>${l + 1}. ${esc(x.title)}</b><div class="muted" style="font-size:15px">${x.sections.length} part${x.sections.length > 1 ? "s" : ""} + check</div></div>
          <div class="row">${pill}<button data-l="${l}" aria-label="Play lesson ${l + 1}">Play</button></div></div>`; }).join("")}</div></div>`;
    $("wkSel").onchange = (e) => { location.search = "?week=" + e.target.value; };
    probeWeeks();
    $("resume").onclick = () => openPlayer();
    $("restart").onclick = () => { P = fresh(); save(); openPlayer(); };
    document.querySelectorAll("[data-look]").forEach((b) => (b.onclick = () => { VS.look = b.dataset.look; saveVS(); document.querySelectorAll("[data-look]").forEach((x) => x.setAttribute("aria-pressed", x === b)); $("vLook").value = VS.look; }));
    // Replaying a lesson from home only re-plays its narrated parts, then returns to where the learner was.
    // It never replaces the queue, so an unfinished check, remediation or the question history cannot be lost.
    document.querySelectorAll("[data-l]").forEach((b) => (b.onclick = () => { const l = +b.dataset.l; if (cur().kind === "report") { P.queue.push(...C.lessons[l].sections.map((_, s) => ({ kind: "sec", l, s, replay: true })), { kind: "report", l: C.lessons.length - 1 }); P.idx++; } else P.queue.splice(P.idx, 0, ...C.lessons[l].sections.map((_, s) => ({ kind: "sec", l, s, replay: true }))); P.part = "main"; P.sent = 0; P.q = 0; save(); openPlayer(); }));
    bar();
  }
  // Called inside click handlers: the first utterance of the page is queued during a real user gesture.
  let primed = false;
  function primeSpeech() { if (primed || !synth || FAST) return; primed = true; try { const u = new SpeechSynthesisUtterance(" "); u.volume = 0; window.__vlPrime = u; synth.speak(u); } catch (e) {} }
  document.addEventListener("pointerdown", primeSpeech, { capture: true }); document.addEventListener("keydown", primeSpeech, { capture: true });
  function openPlayer() {
    view = "player"; document.body.dataset.view = "player";
    $("main").innerHTML = `<div class="player"><div id="slot"></div></div><div class="cc" id="cc" aria-live="polite"></div><div class="card send" id="send" hidden></div>`;
    $("slot").replaceWith(stageEl);
    stageEl.after(lookEl);
    window.scrollTo(0, 0);
    load(); play();
  }
  function bar() {
    $("toggle").textContent = waiting ? "↻ Repeat question" : playing ? "⏸ Pause" : "▶ Continue";
    const st = cur();
    const where = st.kind === "report" ? "Final report" : st.kind === "review" ? `Fresh explanation · ${A.sections[st.sec].name}` : st.kind === "quiz" ? (st.round ? `Practice round ${st.round}` : `Lesson ${st.l + 1} check`) : `Lesson ${st.l + 1} of ${C.lessons.length}`;
    $("status").textContent = `${where} · ${waiting ? "Your answer" : playing ? (VS.mode === "captions" ? "Captions only" : silent ? "Reading pace (no voice)" : "Playing") : "Paused"}`;
  }
  const caption = (t) => { const cc = $("cc"); if (cc) cc.textContent = t || ""; };
  const capOf = (l) => `<b>Lesson ${l + 1}</b> · ${esc(C.lessons[l].title)}`;

  // ---------- build the current step ----------
  function load() {
    const st = cur();
    waiting = false;
    updateLookClass();
    stageEl.classList.toggle("scroll", ["quiz", "result", "report"].includes(st.kind)); stageEl.scrollTop = 0;
    if (st.kind === "sec") {
      const les = C.lessons[st.l], sec = les.sections[st.s];
      const intro = (st.s === 0 ? [`Lesson ${st.l + 1}. ${les.title}.`] : []).concat([sec.title + "."]);
      const body = sec.lines ? sec.lines.map((x) => x[0]) : sentences(sec.script);
      script = { main: intro.concat(body), offset: intro.length };
      if (!loadLook(`${les.id}:${st.s}`, `Lesson ${st.l + 1} · ${les.title}`, sec.title, body)) Scenes.load(st.l, st.s, true);
    } else if (st.kind === "review") {
      const r = A.review[st.sec][st.v], body = r.lines.map((x) => x[0]);
      script = { main: [`A fresh look at ${A.sections[st.sec].name.toLowerCase()}.`].concat(body), offset: 1 };
      if (!loadLook(`review:${st.sec}:${st.v}`, `Fresh explanation · ${A.sections[st.sec].name}`, r.title, body))
        Scenes.loadBeats(`<b>Review</b> · ${esc(A.sections[st.sec].name)}`, "", [{ at: 0, html: `<h2 class="st-h">${esc(r.title)}</h2>` }]);
    } else { look = null; showLook(false); }
    if (st.kind === "quiz") {
      if (!st.qs) { st.qs = firstCheck(st.l); save(); }
      // never re-ask an item this learner has already answered
      while (P.q < st.qs.length && P.part === "main" && P.sent === 0 && P.hist.some((h) => h.id === st.qs[P.q])) P.q++;
      if (P.q >= st.qs.length) { P.idx++; P.part = "main"; P.sent = 0; P.q = 0; save(); return load(); }
      if (!st.qs.length) { P.idx++; P.part = "main"; P.sent = 0; P.q = 0; save(); return load(); } // nothing fresh left: go straight to the result
      loadQuestion(st);
    }
    else if (st.kind === "result") loadResult(st);
    else if (st.kind === "report") loadReport();
    renderSend(st.kind === "report" && !!T.sendReport);
  }

  // ---------- questions: six auto-checked, single-response types ----------
  const TYPE_NAME = { mcq: "Choose one", tf: "True or false", drop: "Fill the blanks", visual: "Pick the diagram", order: "Put in order", match: "Match the pairs" };
  function loadQuestion(st) {
    const q = allQ[st.qs[P.q]], sec = A.sections[q.sec], key = P.seed + q.id;
    const intro = P.q === 0 ? [st.round ? `Practice round. ${st.qs.length} fresh questions.` : `Lesson ${st.l + 1} check. ${st.qs.length} questions.`] : [];
    const stemSay = q.type === "drop" ? q.q.replace(/\{(\d)\}/g, (_, n) => `blank${q.blanks.length > 1 ? " " + n : ""}`) : q.q;
    const head = intro.concat([`Question ${P.q + 1}.`, stemSay]);
    const n0 = head.length - 1; // sentence index of the stem
    const cap = st.round ? `<b>Practice</b> · ${esc(sec.name)}` : capOf(st.l);
    const stem = q.type === "drop" ? esc(q.q).replace(/\{(\d)\}/g, "____") : esc(q.q);
    const beats = [{ at: 0, html: `<div class="st-kicker">Question ${P.q + 1} · ${TYPE_NAME[q.type]} · ${esc(sec.name)}</div><div class="st-quote qstem">${stem}</div>` }];
    let say = [], s = { q, n0 };
    if (q.type === "mcq" || q.type === "visual") {
      const ord = perm(4, key); s.ord = ord; s.right = ord.indexOf(0);
      say = ord.map((oi, i) => q.type === "visual" ? `Diagram ${L[i]}: ${q.o[oi]}.` : `${L[i]}. ${q.o[oi]}.`);
      s.rightSay = q.type === "visual" ? `The answer is diagram ${L[s.right]}: ${q.o[0]}.` : `The answer is ${L[s.right]}. ${q.o[0]}.`;
      beats.push({ at: n0 + 1, html: `<div class="st-opts${q.type === "visual" ? " vis" : ""}">${ord.map((oi, i) => `<button class="st-it st-opt" data-at="${n0 + 1}" data-pos="${i}" ${oi === 0 ? 'data-right="1"' : ""} aria-label="${q.type === "visual" ? "Diagram " : ""}${L[i]}: ${esc(q.o[oi])}"><b>${L[i]}</b>${q.type === "visual" ? `<span class="dgo">${q.svg[oi]}</span>` : `<span>${esc(q.o[oi])}</span>`}</button>`).join("")}</div>` });
    } else if (q.type === "tf") {
      say = ["True, or false?"]; s.right = q.ans ? 0 : 1; s.ord = [0, 1]; s.rightSay = `The answer is ${q.ans ? "true" : "false"}.`;
      beats.push({ at: n0 + 1, html: `<div class="st-opts tf">${["True", "False"].map((t, i) => `<button class="st-it st-opt" data-at="${n0 + 1}" data-pos="${i}" ${i === s.right ? 'data-right="1"' : ""}><b>${i ? "✗" : "✓"}</b><span>${t}</span></button>`).join("")}</div>` });
    } else if (q.type === "drop") {
      s.lists = q.blanks.map((b, bi) => perm(b.length, key + bi).map((i) => b[i]));
      say = s.lists.map((l, bi) => `${q.blanks.length > 1 ? `Blank ${bi + 1}` : "The blank"}: ${l.slice(0, -1).join(", ")}, or ${l[l.length - 1]}.`);
      let n = 0;
      const sentenceHtml = esc(q.q).replace(/\{(\d)\}/g, (_, d) => { const bi = +d - 1; n++; return `<select class="qsel" data-b="${bi}" aria-label="Blank ${bi + 1}"><option value="">choose…</option>${s.lists[bi].map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join("")}</select>`; });
      s.rightSay = `The complete sentence is: ${q.q.replace(/\{(\d)\}/g, (_, d) => q.blanks[+d - 1][0])}`;
      beats.push({ at: n0 + 1, html: `<div class="qbox"><div class="qsent">${sentenceHtml}</div><button class="qcheck" disabled>Check answer</button></div>` });
    } else if (q.type === "order") {
      let p = perm(q.items.length, key); if (p.every((v, i) => v === i)) p = p.slice(1).concat(p[0]);
      s.pool = p.map((i) => q.items[i]);
      say = ["Put these in the right order."].concat(s.pool.map((x) => x + "."));
      s.rightSay = `The right order is: ${q.items.join(", then ")}.`;
      beats.push({ at: n0 + 1, html: `<div class="qbox"><div class="st-note">Tap the items in order. Tap a placed item to take it back.</div>
        <ol class="qorder" aria-label="Your order"></ol><div class="qpool">${s.pool.map((x, i) => `<button class="qchip" data-i="${i}">${esc(x)}</button>`).join("")}</div>
        <div class="row"><button class="qclear">Clear</button><button class="qcheck" disabled>Check answer</button></div></div>` });
    } else if (q.type === "match") {
      const rights = [...new Set(q.pairs.map((p) => p[1]))]; s.rights = perm(rights.length, key).map((i) => rights[i]);
      say = ["Match each item."].concat(q.pairs.map((p) => p[0] + "."), [`Choose from: ${s.rights.join("; ")}.`]);
      s.rightSay = `The right pairs are: ${q.pairs.map((p) => `${p[0]}, with ${p[1]}`).join("; ")}.`;
      beats.push({ at: n0 + 1, html: `<div class="qbox">${q.pairs.map((p, i) => `<label class="qrow"><span>${esc(p[0])}</span><select class="qsel" data-m="${i}" aria-label="Match for ${esc(p[0])}"><option value="">choose…</option>${s.rights.map((r) => `<option value="${esc(r)}">${esc(r)}</option>`).join("")}</select></label>`).join("")}<button class="qcheck" disabled>Check answer</button></div>` });
    }
    beats.push({ at: 99, html: `<div class="st-kicker" id="fbk" role="status"></div><div class="st-note qwhy">${esc(q.why)}</div>` });
    script = Object.assign({ main: head.concat(say), offset: 0 }, s);
    Scenes.loadBeats(cap, `${P.q + 1}/${st.qs.length}`, beats);
    wireQuestion(q);
  }

  function wireQuestion(q) {
    const s = script, root = stageEl;
    root.querySelectorAll(".st-opt").forEach((b) => (b.onclick = () => submit(+b.dataset.pos === s.right, { pos: +b.dataset.pos })));
    const check = root.querySelector(".qcheck");
    if (q.type === "drop" || q.type === "match") {
      const sels = [...root.querySelectorAll(".qsel")];
      const upd = () => (check.disabled = sels.some((x) => !x.value));
      sels.forEach((x) => (x.onchange = upd));
      check.onclick = () => {
        const ok = q.type === "drop" ? sels.every((x) => x.value === q.blanks[+x.dataset.b][0]) : sels.every((x) => x.value === q.pairs[+x.dataset.m][1]);
        sels.forEach((x) => { const want = q.type === "drop" ? q.blanks[+x.dataset.b][0] : q.pairs[+x.dataset.m][1]; x.classList.add(x.value === want ? "ok" : "bad"); x.disabled = true; });
        submit(ok);
      };
    }
    if (q.type === "order") {
      const ol = root.querySelector(".qorder"), chips = [...root.querySelectorAll(".qchip")], picked = [];
      const draw = () => {
        ol.innerHTML = picked.map((i, n) => `<li><button class="qplaced" data-n="${n}" aria-label="Position ${n + 1}: ${esc(s.pool[i])}. Tap to remove">${esc(s.pool[i])}</button></li>`).join("");
        chips.forEach((c) => (c.hidden = picked.includes(+c.dataset.i)));
        ol.querySelectorAll(".qplaced").forEach((b) => (b.onclick = () => { picked.splice(+b.dataset.n, 1); draw(); }));
        check.disabled = picked.length !== s.pool.length;
      };
      chips.forEach((c) => (c.onclick = () => { picked.push(+c.dataset.i); draw(); const nx = chips.find((x) => !x.hidden); (nx || check).focus(); }));
      root.querySelector(".qclear").onclick = () => { picked.length = 0; draw(); };
      check.onclick = () => {
        const seq = picked.map((i) => s.pool[i]), ok = seq.every((x, n) => x === q.items[n]);
        ol.querySelectorAll(".qplaced").forEach((b, n) => { b.classList.add(seq[n] === q.items[n] ? "ok" : "bad"); b.disabled = true; });
        root.querySelector(".qclear").disabled = true;
        if (!ok) ol.insertAdjacentHTML("afterend", `<div class="st-note qright">Right order: ${q.items.map((x, n) => `${n + 1}. ${esc(x)}`).join(" · ")}</div>`);
        submit(ok);
      };
    }
  }

  function submit(ok, ui = {}) {
    const st = cur(); if (st.kind !== "quiz" || P.part === "feedback") return;
    const q = script.q;
    P.used[q.id] = true;
    P.hist.push({ id: q.id, sec: q.sec, lo: q.lo, clo: q.clo, type: q.type, ok, r: rkey(st), t: Date.now() });
    (P.rounds[rkey(st)] = P.rounds[rkey(st)] || {})[q.id] = ok;
    P.part = "feedback"; P.sent = 0; waiting = false; save();
    stopSpeech();
    stageEl.querySelectorAll(".st-opt").forEach((b) => { b.disabled = true; b.classList.toggle("picked", +b.dataset.pos === ui.pos && !ok); });
    stageEl.querySelectorAll(".st-opt[data-right]").forEach((b) => b.classList.add("right"));
    const chk = stageEl.querySelector(".qcheck"); if (chk) chk.disabled = true;
    script.feedback = [ok ? "Correct." : `Not quite. ${script.rightSay}`].concat(sentences(q.why));
    const f = stageEl.querySelector("#fbk"); f.textContent = ok ? "✓ Correct" : "✗ Not quite"; f.style.color = ok ? "var(--st-good)" : "var(--st-bad)";
    Scenes.step(99);
    setTimeout(() => stageEl.scrollTo({ top: stageEl.scrollHeight, behavior: "smooth" }), 400);
    playing = true; play();
  }

  // ---------- result of a round: evaluate every section of the lesson, remediate the weak ones ----------
  function loadResult(st) {
    const r = P.rounds[rkey(st)] || {}, n = Object.keys(r).length, c = Object.values(r).filter(Boolean).length, score = n ? c / n : 0;
    const secs = lessonSecs(st.l), id = C.lessons[st.l].id;
    if (!st.plan) { // decide once, then keep (resume-safe)
      const weak = secs.filter((s) => !secOk(s) && !P.flags[s]);
      const plan = [], newFlags = [];
      weak.forEach((s) => {
        const qs = pick(s, A.perWeak, [1, 2, 3]);
        if (!qs.length) { P.flags[s] = true; newFlags.push(s); return; }
        const v = (P.rev[s] || 0) % A.review[s].length; P.rev[s] = (P.rev[s] || 0) + 1;
        plan.push({ sec: s, v, qs });
      });
      st.plan = plan; st.newFlags = newFlags; st.weak = weak;
      const flagged = secs.filter((s) => P.flags[s]);
      st.verdict = plan.length ? "remediate" : flagged.length ? "flagged" : "pass";
      const prev = P.lessons[id] || {};
      P.lessons[id] = { first: prev.first ?? score, rounds: st.round + 1, passed: st.verdict === "pass", flagged: flagged.length > 0 };
      save();
    }
    const names = (a) => a.map((s) => A.sections[s].name.toLowerCase());
    const join = (a) => a.length > 1 ? a.slice(0, -1).join(", ") + " and " + a[a.length - 1] : a[0] || "";
    const say = [`You answered ${c} out of ${n}. That is ${pct(score)} percent.`];
    if (st.verdict === "pass") say.push(st.round ? "You've now reached the target on every part of this lesson. Well done." : "Every part of this lesson is at or above the target. Great work.");
    else if (st.verdict === "remediate") say.push(`The target is ${pct(A.target)} percent on every part.`, `Let's strengthen ${join(names(st.plan.map((p) => p.sec)))}.`, "I've prepared a fresh explanation, and new questions you haven't seen.");
    else say.push(`You have now used every fresh question on ${join(names(secs.filter((s) => P.flags[s])))}, and that part is not yet at the target.`, "It is marked for instructor review on your report, so please show your report to your instructor. Let's move on for now.");
    if (st.verdict === "remediate" && st.newFlags && st.newFlags.length) say.push(`There are no fresh questions left on ${join(names(st.newFlags))}, so that part is marked for instructor review.`);
    script = { main: say, offset: 0 };
    const rows = secs.map((s) => { const m = secM(s) ?? 0, cls = secOk(s) ? "good" : "bad";
      return `<div class="st-it st-lo" data-at="0"><div class="st-lo-h"><b>${esc(A.sections[s].name)}</b><span>${pct(m)}%${P.flags[s] ? " · flagged" : ""}</span></div>
        <div class="st-lo-t"><i class="${cls}" style="--w:${pct(m)}%"></i><em style="left:${pct(A.target)}%"></em></div></div>`; }).join("");
    Scenes.loadBeats(st.round ? `<b>Practice result</b> · Lesson ${st.l + 1}` : capOf(st.l), "Result", [
      { at: 0, fx: "bars", html: `<div class="st-kicker">${st.round ? `Practice round ${st.round} result` : `Lesson ${st.l + 1} result`}</div>
        <div class="st-score ${st.verdict === "pass" ? "good" : "bad"}"><span data-count="${pct(score)}" data-unit="%">0%</span><small>this round · target ${pct(A.target)}% per part</small></div>` },
      { at: 0, html: `<div class="st-kicker" style="color:var(--st-muted)">Mastery per part (your last ${A.window} answers)</div><div class="st-los">${rows}</div>` },
      { at: 1, html: st.verdict === "pass" ? `<div class="st-quote">Lesson <em>mastered</em>.</div>`
        : st.verdict === "flagged" ? `<div class="st-quote">Flagged for <em>instructor review</em></div>`
        : `<div class="st-kicker" style="color:var(--st-warm)">Your plan</div><div class="st-cards">${st.plan.map((p) => `<div class="st-it st-card" data-at="${say.length - 1}"><b>${esc(A.sections[p.sec].name)}</b><span>Fresh explanation + ${p.qs.length} new question${p.qs.length > 1 ? "s" : ""}</span></div>`).join("")}</div>` },
    ]);
  }

  // ---------- report ----------
  const PREF = "voicelearn.sender.v1", T = C.teacher || { name: C.author, email: "" };
  let pref = {};
  try { pref = JSON.parse(localStorage.getItem(PREF)) || {}; } catch (e) {}
  function reportText(name) {
    const v = (m) => (m == null ? "not assessed yet" : pct(m) + "%");
    const status = (s) => (P.flags[s] ? "INSTRUCTOR REVIEW (no fresh questions left, target not reached)" : secOk(s) ? "mastered" : secHist(s).length ? "in progress" : "not started");
    const flagged = SECS.filter((s) => P.flags[s]);
    return [
      `VoiceLearn achievement report · Week ${WK}`,
      `Student: ${name || "(not given)"}`,
      `Teacher: ${T.name}`,
      `Course: ${C.code} · ${C.subtitle} · ${C.title}`,
      `Date: ${new Date().toLocaleString()}`,
      `Mastery rule: every part at ${pct(A.target)}% or more (share correct in the last ${A.window} answers on that part).`,
      ``,
      `Course learning outcomes:`,
      ...CLOS.map((c) => `- ${c} ${A.clos[c].full}: ${v(cloM(c))}${cloM(c) != null && cloM(c) < A.target ? "  (below target)" : ""}`),
      ``,
      `Week ${WK} outcomes:`,
      ...LOS.map((k) => `- ${A.outcomes[k].name} (${A.outcomes[k].clo}): ${A.outcomes[k].full}: ${v(loM(k))}`),
      ``,
      `Parts (sections):`,
      ...SECS.map((s) => { const h = secHist(s); return `- ${s} ${A.sections[s].name}: ${v(secM(s))} on the last ${Math.min(A.window, h.length)} answers, ${h.filter((x) => x.ok).length} of ${h.length} correct overall, status: ${status(s)}`; }),
      ``,
      flagged.length ? `Needs instructor review: ${flagged.map((s) => A.sections[s].name).join("; ")}.` : `No part needs instructor review.`,
      ``,
      `Lessons:`,
      ...C.lessons.map((x, l) => { const r = P.lessons[x.id]; return `- Lesson ${l + 1}, ${x.title}: ${r ? `first check ${pct(r.first)}%, ${r.rounds} round${r.rounds > 1 ? "s" : ""}, ${r.passed ? "mastered" : r.flagged ? "flagged" : "in progress"}` : "not completed"}`; }),
      ``,
      `Questions answered: ${P.hist.length}, correct: ${P.hist.filter((h) => h.ok).length}.`,
    ].join("\n");
  }
  function renderSend(show) {
    const box = $("send"); if (!box) return;
    box.hidden = !show; if (!show) return;
    box.innerHTML = `
      <div class="eyebrow">Send your report to your teacher</div>
      <div><b>To:</b> ${esc(T.name)}</div>
      <label class="fld">Your name<input id="sName" autocomplete="name" value="${esc(pref.name || "")}"></label>
      <div class="row"><button class="primary" id="sMail">✉ Send report</button>${navigator.share ? '<button id="sShare">Share…</button>' : ""}<button id="sCopy">Copy report</button></div>
      <div class="muted" id="sMsg" role="status" style="font-size:15px">Opens your mail app with the report ready. Tap Send there.</div>`;
    const keep = () => { pref = { name: $("sName").value.trim() }; try { localStorage.setItem(PREF, JSON.stringify(pref)); } catch (e) {} };
    const subject = () => `${C.code} Week ${WK} achievement report – ${$("sName").value.trim() || "student"}`;
    $("sMail").onclick = () => { keep(); if (!pref.name) { $("sMsg").textContent = "Enter your name first."; $("sName").focus(); return; }
      location.href = `mailto:${encodeURIComponent(T.email || "")}?subject=${encodeURIComponent(subject())}&body=${encodeURIComponent(reportText(pref.name))}`; $("sMsg").textContent = "Your mail app should open with the report. Tap Send there."; };
    if ($("sShare")) $("sShare").onclick = async () => { keep(); try { await navigator.share({ title: subject(), text: reportText(pref.name) }); } catch (e) {} };
    $("sCopy").onclick = async () => { keep(); try { await navigator.clipboard.writeText(reportText(pref.name)); $("sMsg").textContent = "Report copied. Paste it into any email or message."; } catch (e) { $("sMsg").textContent = "Couldn't copy automatically."; } };
  }
  function loadReport() {
    const flagged = SECS.filter((s) => P.flags[s]), k1 = cloM(CLOS[0]);
    const said = (m) => (m == null ? "not assessed yet" : `${pct(m)} percent`);
    const say = [flagged.length ? "You have reached the end of Week one. Here is your achievement report." : "Week one complete. Here is your achievement report."]
      .concat(CLOS.map((c) => `Course outcome ${c}: ${said(cloM(c))}.`))
      .concat(LOS.map((k) => `${A.outcomes[k].name}: ${said(loM(k))}.`))
      .concat(flagged.length ? [`Some parts are not yet at the target, and they are marked for instructor review: ${flagged.map((s) => A.sections[s].name.toLowerCase()).join(" and ")}. Please show this report to your instructor.`] : ["You reached the target on every part of Week 1. Excellent work."]);
    script = { main: say, offset: 0 };
    const bar = (label, m, at, small) => `<div class="st-it st-lo${small ? " sm" : ""}" data-at="${at}"><div class="st-lo-h"><b>${esc(label)}</b><span>${m == null ? "–" : pct(m) + "%"}</span></div><div class="st-lo-t"><i class="${m != null && m >= A.target - 1e-9 ? "good" : "bad"}" style="--w:${pct(m)}%"></i><em style="left:${pct(A.target)}%"></em></div></div>`;
    Scenes.loadBeats("<b>Achievement report</b>", "", [
      { at: 0, html: `<div class="st-kicker">${esc(C.code)} · Week ${WK} achievement</div><h2 class="st-h">${esc(C.title)}</h2>` },
      { at: 1, fx: "bars", html: `<div class="st-score ${k1 != null && k1 >= A.target ? "good" : "bad"}"><span data-count="${pct(k1)}" data-unit="%">0%</span><small>CLO ${CLOS[0]} · ${esc(A.clos[CLOS[0]].full)}</small></div>` },
      { at: 2, html: `<div class="st-kicker">Week ${WK} outcomes</div><div class="st-los">${LOS.map((k, i) => bar(A.outcomes[k].full, loM(k), 2 + i)).join("")}</div>` },
      { at: 2 + LOS.length, html: `<div class="st-kicker">Every part</div><div class="st-los">${SECS.map((s) => bar(A.sections[s].name + (P.flags[s] ? " · flagged" : ""), secM(s), 2 + LOS.length, true)).join("")}</div>` },
      { at: say.length - 1, html: flagged.length ? `<div class="st-quote">Flagged for <em>instructor review</em>: ${esc(flagged.map((s) => A.sections[s].name).join(", "))}</div>` : `<div class="st-quote">Every part <em>achieved</em>.</div>` },
      ...(T.sendReport ? [{ at: say.length - 1, html: `<button class="st-card st-send"><b>✉ Send this report</b><span>By email or share</span></button>` }] : []),
    ]);
    if (T.sendReport) stageEl.querySelector(".st-send").onclick = () => { pause(); const s = $("send"); if (s) s.scrollIntoView({ behavior: "smooth", block: "center" }); };
  }

  // ---------- playback ----------
  function play() {
    if (view !== "player") return openPlayer();
    playing = true; waiting = false; keepAwake(); bar();
    const st = cur();
    const list = P.part === "feedback" ? script.feedback : script.main;
    if (!list) { P.part = "main"; P.sent = 0; return play(); }
    // Human pacing: a clear pause before a new screen, a longer beat before each new visual moment, a short one otherwise.
    const mkey = st.kind === "sec" ? `${C.lessons[st.l].id}:${st.s}` : st.kind === "review" ? `review:${st.sec}:${st.v}` : null;
    const mset = new Set(mkey && window.MOMENTS && MOMENTS[mkey] ? MOMENTS[mkey].map((m) => m.at + script.offset) : []);
    const pre = P.sent === 0 ? (P.part === "feedback" ? PACE.feedback : st.kind === "quiz" ? PACE.question : PACE.part) : 0;
    const gapAfter = (k) => (P.part === "main" && mset.has(k + 1) ? PACE.moment : PACE.sentence);
    // Flowing narration: join two short sentences only inside one moment (never across a new visual, never in a question).
    const canJoin = (k) => (P.part === "feedback" || (st.kind !== "quiz" && !mset.has(k + 1) && k + 1 !== script.offset));
    speak(list, P.sent, (i) => {
      P.sent = i; save(); caption(list[i]);
      if (P.part === "main") vstep(i - script.offset);
    }, () => {
      if (st.kind === "quiz" && P.part === "main") {
        playing = false; waiting = true; P.sent = 0; save();
        caption(["drop", "order", "match"].includes(script.q.type) ? "Make your choices, then press Check answer." : "Tap your answer.");
        const f = stageEl.querySelector(".qsel, .qchip, .st-opt"); if (f && document.activeElement === document.body) f.focus({ preventScroll: true });
        return bar();
      }
      advance();
    }, { pre, gapAfter, canJoin });
  }
  function advance() {
    const st = cur();
    if (st.kind === "quiz" && P.q + 1 < st.qs.length) { P.q++; P.part = "main"; P.sent = 0; save(); load(); return play(); }
    if (st.kind === "result" && !st.done) {
      st.done = true; // never splice the follow-up twice for the same result
      if (st.verdict === "remediate") {
        const plan = st.plan.map((p) => ({ kind: "review", sec: p.sec, v: p.v, l: st.l }));
        const qs = st.plan.flatMap((p) => p.qs);
        const mixed = perm(qs.length, P.seed + rkey(st)).map((i) => qs[i]);
        plan.push({ kind: "quiz", l: st.l, round: st.round + 1, qs: mixed }, { kind: "result", l: st.l, round: st.round + 1 });
        P.queue.splice(P.idx + 1, 0, ...plan);
      } else if (st.l + 1 < C.lessons.length) P.queue.push(...lessonPlan(st.l + 1));
      else P.queue.push({ kind: "report", l: st.l });
    }
    if (st.kind === "report") { playing = false; save(); return bar(); }
    P.idx++; P.part = "main"; P.sent = 0; P.q = 0; save();
    load(); play();
  }
  function pause() { playing = false; stopSpeech(); bar(); }

  $("toggle").onclick = () => { if (waiting) { P.sent = 0; waiting = false; return play(); } playing ? pause() : play(); };
  $("home").onclick = () => { setFs(false); pause(); waiting = false; renderHome(); };

  // ---------- full screen ----------
  function setFs(on) {
    if (on === document.body.classList.contains("fs")) return;
    document.body.classList.toggle("fs", on);
    $("fsBtn").textContent = on ? "✕" : "⛶";
    $("fsBtn").setAttribute("aria-label", on ? "Exit full screen" : "Full screen");
    try {
      if (on && !document.fullscreenElement && document.documentElement.requestFullscreen) document.documentElement.requestFullscreen({ navigationUI: "hide" }).catch(() => {});
      if (!on && document.fullscreenElement) document.exitFullscreen().catch(() => {});
    } catch (e) {}
    setTimeout(refit, 350);
  }
  function refit() { Scenes.fit(); if (look) { fitLook(); look.step(lookStep); } }
  $("fsBtn").onclick = () => setFs(!document.body.classList.contains("fs"));
  window.addEventListener("resize", () => { if (view === "player") refit(); });
  document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement) setFs(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setFs(false); });

  // ---------- voice & look panel ----------
  function fillVoices() {
    // Voices sorted best-first; the automatic pick carries "★ recommended". The first option follows the best voice.
    const sel = $("vVoice"), cv = voice(), vs = rankedVoices(), best = bestVoice();
    const label = (v) => esc(v.name.replace(/^(Microsoft|Google)\s+/, "").replace(/\s+-\s+English.*$/, "")) + " · " + esc(v.lang) + (v.localService ? "" : " · online") + (best && v.voiceURI === best.voiceURI ? " ★ recommended" : "");
    sel.innerHTML = vs.length ? `<option value="" ${!VS.uri ? "selected" : ""}>★ Automatic: best voice${best ? " (" + esc(best.name.replace(/^(Microsoft|Google)\s+/, "").replace(/\s+-\s+English.*$/, "")) + ")" : ""}</option>` +
      vs.map((v) => `<option value="${esc(v.voiceURI)}" ${VS.uri && cv && v.voiceURI === cv.voiceURI ? "selected" : ""}>${label(v)}</option>`).join("") : "<option>Default voice</option>";
    const n = $("vNote"); if (n) n.textContent = silent ? `Voice unavailable here: ${silentWhy} Captions advance at reading pace.` : !synth ? "This browser has no speech engine." : vs.length ? `${vs.length} English voice${vs.length > 1 ? "s" : ""} on this device.` : "Voices are still loading on this device…";
    if (n && SLOG.length) n.textContent += ` (engine: ${SLOG.slice(-4).join(", ")})`;
  }
  const showRate = () => { $("vRateOut").textContent = VS.rate.toFixed(2).replace(/0$/, "") + "×"; };
  const applyLive = () => { if (playing) play(); };
  const showPitch = () => { $("vPitchOut").textContent = VS.pitch < 0.95 ? "deeper" : VS.pitch > 1.05 ? "higher" : "normal"; };
  $("vLook").onchange = (e) => {
    VS.look = e.target.value; saveVS();
    if (view === "home") return renderHome();
    const st = cur();
    updateLookClass();
    if (st.kind !== "sec" && st.kind !== "review") return;
    const wasPlaying = playing; if (wasPlaying) stopSpeech();
    load();
    if (wasPlaying) play(); else vstep(P.sent - script.offset);
  };
  $("vMode").onchange = (e) => { VS.mode = e.target.value === "captions" ? "captions" : "voice"; saveVS(); if (playing) { stopSpeech(); play(); } bar(); };
  // Repeat the current sentence without losing your place.
  $("repBtn").onclick = () => { if (view !== "player") return; if (waiting) return $("toggle").click(); stopSpeech(); play(); };
  $("vBtn").onclick = () => { $("vMode").value = VS.mode; $("vLook").value = VS.look || "story"; fillVoices(); $("vRate").value = VS.rate; $("vPitch").value = VS.pitch; showRate(); showPitch(); $("vPanel").hidden = !$("vPanel").hidden; };
  $("vPitch").oninput = (e) => { VS.pitch = +e.target.value; showPitch(); };
  $("vPitch").onchange = () => { saveVS(); applyLive(); };
  $("vClose").onclick = () => ($("vPanel").hidden = true);
  $("vVoice").onchange = (e) => { VS.uri = e.target.value; saveVS(); if (synth) { silent = false; noStart = 0; avoidNetwork = false; } applyLive(); };
  $("vRate").oninput = (e) => { VS.rate = +e.target.value; showRate(); };
  $("vRate").onchange = () => { saveVS(); applyLive(); };
  // Test voice: spoken directly inside the click (user gesture), with the same voice/rate/pitch the lessons use.
  $("vTest").onclick = () => {
    if (playing) pause(); if (!synth) return fillVoices();
    silent = false; noStart = 0; avoidNetwork = false;
    const go = () => { const u = new SpeechSynthesisUtterance("Hello. This is how your lessons will sound."); const v = voice(); if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-US";
      u.rate = VS.rate; u.pitch = VS.pitch; u.volume = window.__vlMute ? 0 : 1; u.onstart = () => log("test:start"); u.onend = () => { log("test:end"); fillVoices(); }; u.onerror = (e) => { log("test:error:" + e.error); fillVoices(); };
      window.__vlTestU = u; try { if (synth.paused) synth.resume(); } catch (e) {} synth.speak(u); };
    if (synth.speaking || synth.pending) { tok++; synth.cancel(); setTimeout(go, 80); } else go(); // never cancel and speak in the same tick
  };
  if (synth && synth.addEventListener) synth.addEventListener("voiceschanged", () => { if (!$("vPanel").hidden) fillVoices(); });
  if (synth && synth.onvoiceschanged !== undefined) synth.onvoiceschanged = () => {}; // as in the original prototype
  if (synth) synth.getVoices(); // start loading the device voices early
  // Some engines (Chrome Android, Windows) never fire "voiceschanged": poll briefly until the list is there.
  if (synth) { let tries = 0; const poll = setInterval(() => { if (synth.getVoices().length || ++tries > 20) { clearInterval(poll); if (!$("vPanel").hidden) fillVoices(); } }, 250); }
  // Space toggles play, except when a control (answer button, list, input) has focus.
  document.addEventListener("keydown", (e) => { if (e.code === "Space" && view === "player" && !e.target.closest("button,select,input,textarea,label")) { e.preventDefault(); $("toggle").click(); } });

  // QA hooks (not used by the page itself).
  window.__vl = { state: () => P, cur, advance, reportText, secM, loM, cloM, respond: (ok) => submit(ok), skip: () => { stopSpeech(); if (cur().kind !== "quiz" || P.part === "feedback") advance(); },
    // show sentence i of the current step, paused (for screenshots)
    at: (i) => { pause(); P.sent = i; caption(script.main[i]); vstep(i - script.offset); },
    // open lesson l at step s (0..sections-1 = parts, then quiz, result), paused
    jump: (l, s = 0) => { pause(); P.queue = lessonPlan(l); P.idx = s; P.part = "main"; P.sent = 0; P.q = 0; save(); if (view !== "player") { view = "player"; document.body.dataset.view = "player"; $("main").innerHTML = `<div class="player"><div id="slot"></div></div><div class="cc" id="cc" aria-live="polite"></div><div class="card send" id="send" hidden></div>`; $("slot").replaceWith(stageEl); stageEl.after(lookEl); } load(); },
    showQ: (id) => { pause(); const st = cur(); st.qs = [id]; P.q = 0; P.part = "main"; P.sent = 0; load(); }, // QA: show one specific question (current step must be a quiz)
    setLook: (id) => { VS.look = id; saveVS(); },
    fast: (on) => { FAST = !!on; }, speech: () => ({ available: !!synth, silent, why: silentWhy, voices: enVoices().length, chosen: voice() && voice().name, ranked: rankedVoices().slice(0, 6).map((v) => v.name + " [" + vScore(v) + "]"), sayText, rate: VS.rate, log: SLOG.slice(-12) }) };
  renderHome();
})();
