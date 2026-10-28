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
  const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
  const smooth = () => (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");

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
  const save = () => { try { if(deferredReturn){const snapshot={...P,queue:deferredReturn.queue,idx:deferredReturn.idx,part:deferredReturn.part,sent:deferredReturn.sent,q:deferredReturn.q};localStorage.setItem(KEY,JSON.stringify(snapshot));}else localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) {} };
  const cur = () => P.queue[P.idx];
  const rkey = (st) => `${st.l}:${st.round}`;

  const DEFER_KEY = `voicelearn.oper621.w${WK}.toAnswerLater.v1`;
  let deferred = [];
  try { const x=JSON.parse(localStorage.getItem(DEFER_KEY)); if(Array.isArray(x)) deferred=x.filter(id=>typeof id==="string"&&allQ[id]&&!P.hist.some(h=>h.id===id)); } catch (_) {}
  const saveDeferred=()=>{try{localStorage.setItem(DEFER_KEY,JSON.stringify(deferred));}catch(_){}};
  const deferQuestion=id=>{if(id&&!P.hist.some(h=>h.id===id)&&!deferred.includes(id)){deferred.push(id);saveDeferred();}};
  const resolveDeferred=id=>{if(deferred.includes(id)){deferred=deferred.filter(x=>x!==id);saveDeferred();}};
  const hasDeferredForLesson=l=>deferred.some(id=>lessonSecs(l).includes(allQ[id].sec));
  const LISTEN_KEY="voicelearn.oper621.listenOnly.v1";
  let listenOnly=false;
  try{listenOnly=localStorage.getItem(LISTEN_KEY)==="true";}catch(_){}
  let deferredReturn=null, notePending=false;
  const saveListen=()=>{try{localStorage.setItem(LISTEN_KEY,String(listenOnly));}catch(_){};updateListenControls();};
  function updateListenControls(){for(const id of ["setupListen","settingsListen","playerListen"]){const el=$(id);if(el)el.checked=listenOnly;}const label=$("listenState");if(label)label.textContent=listenOnly?"Hands-free listening on":"Hands-free listening off";}
  function setListen(on){listenOnly=!!on;saveListen();updateMediaSession();if(listenOnly&&view==="player"&&cur().kind==="quiz"&&!cur().deferred){skipQuestion(true);}}
  function mediaAction(name,handler){try{if("mediaSession" in navigator)navigator.mediaSession.setActionHandler(name,handler);}catch(_){}}
  function updateMediaSession(){if(!("mediaSession" in navigator))return;try{navigator.mediaSession.playbackState=playing?"playing":"paused";if("MediaMetadata" in window){const st=cur();navigator.mediaSession.metadata=new MediaMetadata({title:st&&st.kind==="quiz"?"Knowledge check":`Week ${WK} · VoiceLearn`,artist:"OPER621 Business Process Management"});}}catch(_){}
  }
  function handsFreeNext(){if(view!=="player")return;if(cur().kind==="quiz"){skipQuestion(true);return;}if(playing)pause();advance();}

  function updateSkipButton(){const b=$("skipQuestion");if(!b)return;const st=cur();b.hidden=!(view==="player"&&st&&st.kind==="quiz"&&P.part!=="feedback");}
  function skipQuestion(auto=false){
    const st=cur();if(!st||st.kind!=="quiz"||P.part==="feedback")return;
    if(!st.qs){st.qs=firstCheck(st.l);save();}
    const id=st.qs[P.q];if(!id)return;
    deferQuestion(id);playing=false;waiting=false;stopSpeech();
    P.part="main";P.sent=0;
    if(st.deferred){ // Return to the exact original queue step after a deferred response is skipped again.
      if(deferredReturn){P.queue=deferredReturn.queue;P.idx=deferredReturn.idx;P.part=deferredReturn.part;P.sent=deferredReturn.sent;P.q=deferredReturn.q;deferredReturn=null;}
      save();load();bar();return;
    }
    save();
    if(auto&&listenOnly){notePending=true;}
    if(auto){
      for(let i=P.q+1;i<st.qs.length;i++)deferQuestion(st.qs[i]);
      P.q=st.qs.length-1;
    }
    advance();
  }
  function resumeDeferred(id){
    if(!id||!deferred.includes(id)||!allQ[id])return;
    pause();deferredReturn={queue:P.queue,idx:P.idx,part:P.part,sent:P.sent,q:P.q};
    // A temporary single-question queue; do not touch the original progress fields on disk.
    const q=allQ[id],l=C.lessons.findIndex((x,i)=>lessonSecs(i).includes(q.sec));
    const lesson=l>=0?l:Math.max(0,Math.min(C.lessons.length-1,cur().l||0));
    P.queue=[{kind:"quiz",l:lesson,round:0,qs:[id],deferred:true}];P.idx=0;P.part="main";P.sent=0;P.q=0;
    view="player";setRoute("player");
    $("main").innerHTML=`<div class="player"><div id="slot"></div></div><div class="cc" id="cc" aria-live="polite"></div><div class="card send" id="send" hidden></div>`;
    $("slot").replaceWith(stageEl);stageEl.after(lookEl);load();bar();
  }
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
  let VS = { uri: "", rate: 0.95, pitch: 1, look: "board" };
  try { VS = Object.assign(VS, JSON.parse(localStorage.getItem(VKEY)) || {}); } catch (e) {}
  // Sanitize saved values: a bad rate/pitch (NaN, a string, out of range) makes some engines silent.
  const num = (x, lo, hi, d) => { x = Number(x); return Number.isFinite(x) ? Math.min(hi, Math.max(lo, x)) : d; };
  VS.rate = num(VS.rate, 0.5, 2, 0.95); VS.pitch = num(VS.pitch, 0.5, 1.5, 1); if (typeof VS.uri !== "string") VS.uri = "";
  if (!["notebook", "journey", "board", "motion"].includes(VS.look)) VS.look = "board"; // the removed looks "story" and "codex" move to Animated Whiteboard silently
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
    lead: 200,       // the visual appears, then this short beat, then the voice (never longer than the gap itself)
    sentence: 200,   // pause between sentences of the same paragraph (talking, not a list)
    join: 28,        // two short sentences of the same moment are spoken as ONE utterance when together ≤ this many words
    moment: 600,    // pause before a sentence that brings in a new visual moment
    part: 1000,      // pause before a new lesson part, review, result or report screen
    question: 1000,  // pause before each question screen
    feedback: 400,   // pause after answering, before the feedback is spoken
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
  const FATAL = ["synthesis-unavailable", "audio-hardware", "audio-busy"];
  // Chrome blocks speech that starts without a user gesture (page load, week switch, timers). Instead of giving up on the voice,
  // pause and show a prominent button; its click handler speaks synchronously, which is allowed.
  const UA_API = typeof navigator !== "undefined" && navigator.userActivation;
  const gestureNow = () => !UA_API || UA_API.isActive;
  let spoken = false, tapBtn = null;
  function hideTap() { if (tapBtn) { tapBtn.remove(); tapBtn = null; } }
  function needTap(why) {
    log("needtap:" + (why || ""));
    playing = false; stopSpeech(); hideTap();
    tapBtn = document.createElement("button");
    tapBtn.id = "vTap"; tapBtn.className = "primary"; tapBtn.type = "button"; tapBtn.textContent = "▶ Tap to hear the voice";
    tapBtn.style.cssText = "position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:90;font-size:22px;font-weight:700;padding:18px 28px;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,.45)";
    tapBtn.onclick = () => { hideTap(); play(true); }; // real click: speech starts synchronously in this handler
    document.body.appendChild(tapBtn);
    bar();
  }
  // Speak list[from..] as complete sentences: show the sentence's visual, a short beat, speak it, wait for the engine's
  // "end", pause, then the next one. Never splits a sentence. For flowing narration, two short consecutive sentences of the
  // same moment (opts.canJoin(k) = sentence k+1 brings no new visual) are spoken as ONE utterance so the intonation carries;
  // the second caption/visual appears at the word boundary where it starts (or at an estimated time on engines without
  // boundary events, e.g. Android and network voices). The step only moves on after the last sentence has been spoken.
  // opts.pre = pause before the first sentence; opts.gapAfter(k) = pause after sentence k.
  const IS_CHROME_DESKTOP = /Chrome\//.test(UA) && !IS_EDGE && !IS_ANDROID && !/CriOS|OPR\//.test(UA);
  const ENDS = /[.!?…]["'”’)\]]*$/;
  function speak(list, from, onSentence, onDone, opts = {}) {
    const my = ++tok; cancelSpeech();
    const later = (ms, f) => setTimeout(() => { if (my === tok) f(); }, ms);
    const gapAfter = opts.gapAfter || (() => PACE.sentence);
    const canJoin = opts.canJoin || (() => false);
    let i = from;
    // How many sentences (1 or 2) the utterance starting at k carries.
    const group = (k) => (!FAST && !silent && VS.mode !== "captions" && synth && k + 1 < list.length && canJoin(k) &&
      ENDS.test(String(list[k]).trim()) && words(list[k]) + words(list[k + 1]) <= PACE.join ? 2 : 1);
    const next = (lead, sync) => { if (i >= list.length) return onDone(); const k = i, n = group(k); i += n; onSentence(k); if (sync && !FAST) return say(k, n, 0); later(FAST ? 40 : lead, () => say(k, n, 0)); };
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
        started = true; spoken = true; noStart = 0; log("start");
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
          if (attempt < 1) return later(250, () => say(k, n, attempt + 1));
          if (!started && !spoken) return needTap("interrupted");
          return (done(), after(k + n - 1));
        }
        ended = true; clearInterval(keep); log("error:" + e.error);
        if (my !== tok) return;
        if (e.error === "not-allowed") return needTap("not-allowed"); // no gesture: wait for a tap, never switch modes
        // A network voice (e.g. Google or "Online") that fails: switch to a local voice and say the sentences again.
        if (v && !v.localService && !avoidNetwork) { avoidNetwork = true; return later(200, () => say(k, n, attempt)); }
        if (FATAL.includes(e.error) || attempt >= 1) { goSilent(`the speech engine reported "${e.error}".`); return readOut(k, n); }
        later(300, () => say(k, n, attempt + 1));
      };
      try { if (synth.paused) synth.resume(); } catch (e) {}
      // Chrome's engine can wedge if speak() directly follows cancel(): wait >= 300 ms after any cancel (the first utterance
      // of a page, with nothing to cancel, still speaks synchronously inside the click handler).
      const wait = Math.max(0, 320 - (performance.now() - lastCancel));
      const go = () => { try { if (synth.paused) synth.resume(); } catch (e) {} synth.speak(u); };
      if (wait) later(wait, go); else go();
      // Watchdog: no "start" from the engine = cancel, wait 300 ms, retry once; then reading pace with a clear notice.
      // A quick check for network voices (Edge "Online (Natural)", Google) so a dead connection costs little time.
      const startMs = wait + (v && !v.localService && !IS_ANDROID ? 3500 : spoken ? 2500 : 6000); // the very first start of a page can take several seconds
      later(startMs, () => {
        if (started || ended || document.hidden) return;
        ended = true; clearInterval(keep); cancelSpeech(true); log("no-start");
        if (!spoken && UA_API && !UA_API.hasBeenActive) return needTap("no-start");
        if (v && !v.localService && !avoidNetwork) { avoidNetwork = true; return later(350, () => say(k, n, attempt)); }
        if (++noStart >= 2) goSilent("the browser's voice engine is not responding. Reload the page (close other tabs that are speaking) to hear the voice again.");
        if (attempt < 1 && !silent) return later(350, () => say(k, n, attempt + 1));
        readOut(k, n, startMs);
      });
      // Safety net for engines that drop the "end" event: move on after a generous time.
      later(Math.max(9000, speakMs(text) * 2.5 + 4000), () => { if (started && !ended) { ended = true; done(); log("no-end"); cancelSpeech(true); after(k + n - 1); } });
    };
    if (opts.sync && !FAST) next(0, true); // first utterance inside the click handler: no timer before speak()
    else later(FAST ? 0 : opts.pre || 0, () => next(PACE.lead));
  }
  let lastCancel = -1e9;
  // Only cancel when the engine has something to cancel (a needless cancel() can wedge Chrome's engine); remember when.
  function cancelSpeech(force) { if (!synth) return; try { if (force || synth.speaking || synth.pending) { synth.cancel(); lastCancel = performance.now(); } } catch (e) {} }
  const stopSpeech = () => { tok++; cancelSpeech(); };

  let wake = null;
  async function keepAwake() { try { if (!wake && "wakeLock" in navigator && !document.hidden) { wake = await navigator.wakeLock.request("screen"); wake.onrelease = () => (wake = null); } } catch (e) {} }
  document.addEventListener("visibilitychange", () => { if (!document.hidden && playing) { keepAwake(); play(); } });

  // ---------- views ----------
  const stageEl = document.createElement("div");
  Scenes.mount(stageEl);
  const lookEl = document.createElement("div");
  lookEl.className = "look";
  let look = null, lookStep = -1;
  const lookStyle = () => (window.STYLES || []).find((s) => s.id === (VS.look || "board")) || null;
  function fitLook() {
    const k = Math.max(1, Math.min(lookEl.clientHeight / 600, lookEl.clientWidth / 300, 2.2));
    lookEl.style.setProperty("--k", k.toFixed(3));
    lookEl.toggleAttribute("data-tall", lookEl.clientHeight / Math.max(1, lookEl.clientWidth) > 1.75);
  }
  // The quiz/result stage takes the colours of the chosen look (the other looks keep the default dark blue).
  function updateLookClass() { stageEl.classList.remove("look-notebook", "look-journey"); if (["notebook", "journey"].includes(VS.look)) stageEl.classList.add("look-" + VS.look); }
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
  const LOOKS = [
    ["notebook", "Teacher's Notebook", "Warm paper notes, sketches and teaching annotations"], ["journey", "Process Journey", "Each idea is a stop along one connected route"],
    ["board", "Animated Whiteboard", "Ideas and diagrams are drawn live as the teacher explains them"], ["motion", "Motion Explainer", "Clean explainer-video scenes: moving tokens, bold key words, growing bars"]];
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
    view = "home"; setRoute("home"); updateNavigation();
    const st = cur(), les = C.lessons[st.l] || C.lessons[0];
    const flagged = SECS.filter((s) => P.flags[s]);
    $("main").innerHTML = `
      <div class="card"><div class="eyebrow">Week</div><label class="fld" style="display:grid;gap:6px"><span class="muted" style="font-size:15px">Choose the week to study. Each week keeps its own progress.</span><select id="wkSel" style="font:inherit;padding:10px;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--ink);width:100%">${weekList().map((w) => `<option value="${w.n}"${w.n === WK ? " selected" : ""}>Week ${w.n} · ${esc(w.title)}</option>`).join("")}</select></label>${window.REVISION_WEEK ? `<div class="muted" style="font-size:15px">Week ${window.REVISION_WEEK}: revision week, see Moodle (no lessons here).</div>` : ""}</div>
      <div class="card later-card"><div class="eyebrow">To answer later</div><h2>${deferred.length} question${deferred.length===1?"":"s"} saved</h2>
        <p class="muted">Skipped checks are not marked wrong. Answer them when you are ready; the week stays unfinished until they are done.</p>
        ${deferred.length?`<div class="later-list">${deferred.map((id,i)=>`<button type="button" class="later-resume" data-later="${esc(id)}"><span>${i+1}. ${esc(allQ[id].q||id)}</span><strong>Resume →</strong></button>`).join("")}</div>`:"<p>Nothing waiting. You're up to date.</p>"}</div>
      <div class="card"><div class="eyebrow">Continue</div><h1>${st.kind === "report" ? "Your achievement report" : `Lesson ${st.l + 1}: ${esc(les.title)}`}</h1>
        <div class="row"><button class="primary" id="resume">▶ Continue</button><button id="restart">Start over</button></div></div>
      <div class="card"><div class="eyebrow">Look · how the lessons appear</div>
        <div class="looks" role="group" aria-label="Choose a look">${LOOKS.map(([id, name, note]) => `<button class="lookbtn ${id}" data-look="${id}" aria-pressed="${(VS.look || "board") === id}"><span class="sw" aria-hidden="true"></span><b>${name}</b><span class="muted">${note}</span></button>`).join("")}</div></div>
      <div class="card"><div class="eyebrow">Achievement · target ${pct(A.target)}% on every part</div>
        <div class="row">${CLOS.map((c) => badge(`CLO ${c}`, cloM(c), A.clos[c].full)).join(" ")}</div>
        <div class="row">${LOS.map((k) => badge(A.outcomes[k].name, loM(k), A.outcomes[k].full)).join(" ")}</div>
        ${flagged.length ? `<div class="muted" style="font-size:15px">Flagged for instructor review: ${flagged.map((s) => esc(A.sections[s].name)).join(", ")}</div>` : ""}</div>
      <div class="card s1-card"><div class="eyebrow">Session 1 · Lessons · ${esc(C.code)}</div><h2>${esc(C.title)}</h2>
        <div>${C.lessons.map((x, l) => { const r = P.lessons[x.id];
          const pill = r ? (r.passed && !hasDeferredForLesson(l) ? `<span class="pill done">Mastered</span>` : `<span class="pill warn">${r.flagged ? "Flagged" : "In progress"}</span>`) : (st.l === l ? '<span class="pill now">In progress</span>' : '<span class="pill">Not started</span>');
          return `<div class="lesson"><div style="min-width:0"><b>${l + 1}. ${esc(x.title)}</b><div class="muted" style="font-size:15px">${x.sections.length} part${x.sections.length > 1 ? "s" : ""} + check</div></div>
          <div class="row">${pill}<button data-l="${l}" aria-label="Play lesson ${l + 1}">Play</button></div></div>`; }).join("")}</div></div>${window.S2 ? S2.homeCard() : ""}`;
    $("wkSel").onchange = (e) => switchWeek(e.target.value);
    document.querySelectorAll("[data-later]").forEach(b=>b.onclick=()=>resumeDeferred(b.dataset.later));
    probeWeeks(); if (window.S2) S2.bindHome($("main"));
    $("resume").onclick = () => openPlayer();
    $("restart").onclick = () => { P = fresh(); save(); openPlayer(); };
    document.querySelectorAll("[data-look]").forEach((b) => (b.onclick = () => { VS.look = b.dataset.look; saveVS(); document.querySelectorAll("[data-look]").forEach((x) => x.setAttribute("aria-pressed", x === b)); $("vLook").value = VS.look; }));
    // Replaying a lesson from home only re-plays its narrated parts, then returns to where the learner was.
    // It never replaces the queue, so an unfinished check, remediation or the question history cannot be lost.
    document.querySelectorAll("[data-l]").forEach((b) => (b.onclick = () => { const l = +b.dataset.l; if (cur().kind === "report") { P.queue.push(...C.lessons[l].sections.map((_, s) => ({ kind: "sec", l, s, replay: true })), { kind: "report", l: C.lessons.length - 1 }); P.idx++; } else P.queue.splice(P.idx, 0, ...C.lessons[l].sections.map((_, s) => ({ kind: "sec", l, s, replay: true }))); P.part = "main"; P.sent = 0; P.q = 0; save(); openPlayer(); }));
    bar();
    if (!$("vPanel").contains(document.activeElement)) $("main").focus({ preventScroll: true });
  }
  // Called inside click handlers: the first utterance of the page is queued during a real user gesture.
  let primed = false;
  // A tap or key press is also a fresh chance for the voice: after an engine error the app only reads at pace until the next tap.
  function retryVoice() { if (synth && silent) { silent = false; noStart = 0; avoidNetwork = false; bar(); } }
  document.addEventListener("pointerdown", retryVoice, { capture: true }); document.addEventListener("keydown", retryVoice, { capture: true });
  function primeSpeech() { return; /* disabled: the zero-volume priming utterance + cancel wedged Chrome's speech engine */ if (primed || !synth || FAST) return; primed = true; try { const u = new SpeechSynthesisUtterance(" "); u.volume = 0; window.__vlPrime = u; synth.speak(u); } catch (e) {} }
  document.addEventListener("pointerdown", primeSpeech, { capture: true }); document.addEventListener("keydown", primeSpeech, { capture: true });
  function openPlayer(autoPlay = true) {
    view = "player"; setRoute(cur().kind === "report" ? "report" : "player");
    $("main").innerHTML = `<div class="player"><div id="slot"></div></div><div class="cc" id="cc" aria-live="polite"></div><div class="card send" id="send" hidden></div>`;
    $("slot").replaceWith(stageEl);
    stageEl.after(lookEl);
    window.scrollTo(0, 0);
    load(); updateNavigation();updateListenControls(); if(autoPlay)play();else{playing=false;bar();}
    if (!$("vPanel").contains(document.activeElement)) $("main").focus({ preventScroll: true });
  }
  function bar() {
    $("toggle").textContent = waiting ? "↻ Repeat question" : playing ? "⏸ Pause" : "▶ Continue";
    const st = cur();
    const where = st.kind === "report" ? "Final report" : st.kind === "review" ? `Fresh explanation · ${A.sections[st.sec].name}` : st.kind === "quiz" ? (st.round ? `Practice round ${st.round}` : `Lesson ${st.l + 1} check`) : `Lesson ${st.l + 1} of ${C.lessons.length}`;
    $("status").textContent = `${where} · ${waiting ? "Your answer" : playing ? (VS.mode === "captions" ? "Captions only" : silent ? "Reading pace (no voice)" : "Playing") : "Paused"}`;
    updateNavigation();updateSkipButton();updateListenControls();updateMediaSession();
  }
  const caption = (t) => { const cc = $("cc"); if (cc) cc.textContent = t || ""; };
  const capOf = (l) => `<b>Lesson ${l + 1}</b> · ${esc(C.lessons[l].title)}`;

  // ---------- build the current step ----------
  function load() {
    const st = cur();
    if (view === "player") { setRoute(st.kind === "report" ? "report" : "player", true); }
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
      if(listenOnly&&!st.deferred){skipQuestion(true);return;}
      loadQuestion(st);
    }
    else if (st.kind === "result") loadResult(st);
    else if (st.kind === "report") loadReport();
    renderSend(st.kind === "report" && !!T.sendReport);
    if (st.kind === "report") { const old = $("rateCard"); if (old) old.remove(); const rc = document.createElement("div"); rc.className = "card rate-card"; rc.id = "rateCard"; rc.innerHTML = `<div class="eyebrow">Your opinion</div><button class="primary" id="rateWeek" type="button">★ Rate this week</button><div class="muted" style="font-size:15px">Anonymous, two minutes. Opens in a new tab.</div>`; if (window.S2 && S2.reportCard) { const old2 = $("s2ReportCard"); if (old2) old2.remove(); const h = S2.reportCard(); if (h) { const w = document.createElement("div"); w.id = "s2ReportCard"; w.innerHTML = h; $("main").appendChild(w); S2.bindReport(w); } } $("main").appendChild(rc); $("rateWeek").onclick = openFeedback; }
    if(st.kind==="report"&&deferred.length){const note=document.createElement("div");note.className="card pending-report";note.setAttribute("role","status");note.textContent=`Week not complete: ${deferred.length} question(s) saved To answer later. Return Home to finish them.`;$("main").prepend(note);}
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
    // Universal question action: shown beside the Check answer control for
    // selection questions, and beside the answer options for instant-answer types.
    // Unlike Check answer, skipping never requires a selection.
    const actionBeat=beats[beats.length-1];
    if(actionBeat&&actionBeat.at===n0+1){
      actionBeat.html += `<div class="qskip-actions"><button type="button" class="qskip-inline" aria-label="Skip this question and answer later">Skip for now</button><span class="qskip-hint">Saved to To answer later; not marked wrong.</span></div>`;
    }
    beats.push({ at: 99, html: `<div class="st-kicker" id="fbk" role="status"></div><div class="st-note qwhy">${esc(q.why)}</div>` });
    script = Object.assign({ main: head.concat(say), offset: 0 }, s);
    Scenes.loadBeats(cap, `${P.q + 1}/${st.qs.length}`, beats);
    wireQuestion(q);
  }

  function wireQuestion(q) {
    const s = script, root = stageEl;
    const skip=root.querySelector(".qskip-inline");
    if(skip)skip.onclick=()=>skipQuestion(false);
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
    P.used[q.id] = true;resolveDeferred(q.id);
    P.hist.push({ id: q.id, sec: q.sec, lo: q.lo, clo: q.clo, type: q.type, ok, r: rkey(st), t: Date.now() });
    (P.rounds[rkey(st)] = P.rounds[rkey(st)] || {})[q.id] = ok;
    P.part = "feedback"; P.sent = 0; waiting = false; save();
    stopSpeech();
    stageEl.querySelectorAll(".st-opt").forEach((b) => { b.disabled = true; b.classList.toggle("picked", +b.dataset.pos === ui.pos && !ok); });
    stageEl.querySelectorAll(".st-opt[data-right]").forEach((b) => b.classList.add("right"));
    const chk = stageEl.querySelector(".qcheck"); if (chk) chk.disabled = true;
    const skip=stageEl.querySelector(".qskip-inline");if(skip)skip.disabled=true;
    script.feedback = [ok ? "Correct." : `Not quite. ${script.rightSay}`].concat(sentences(q.why));
    const f = stageEl.querySelector("#fbk"); f.textContent = ok ? "✓ Correct" : "✗ Not quite"; f.style.color = ok ? "var(--st-good)" : "var(--st-bad)";
    Scenes.step(99);
    setTimeout(() => stageEl.scrollTo({ top: stageEl.scrollHeight, behavior: smooth() }), 400);
    playing = true; play();
  }

  // ---------- result of a round: evaluate every section of the lesson, remediate the weak ones ----------
  function loadResult(st) {
    const r = P.rounds[rkey(st)] || {}, n = Object.keys(r).length, c = Object.values(r).filter(Boolean).length, score = n ? c / n : 0;
    const secs = lessonSecs(st.l), id = C.lessons[st.l].id;
    if (!st.plan && hasDeferredForLesson(st.l)) {
      st.plan=[];st.newFlags=[];st.weak=[];st.verdict="deferred";
      const prev=P.lessons[id]||{};P.lessons[id]={...prev,passed:false,pending:true};save();
    }
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
    if(st.verdict === "deferred")say.push("Some questions are saved for later. They are not counted as wrong. Return to them from Home before completing this week.");
    else if (st.verdict === "pass") say.push(st.round ? "You've now reached the target on every part of this lesson. Well done." : "Every part of this lesson is at or above the target. Great work.");
    else if (st.verdict === "remediate") say.push(`The target is ${pct(A.target)} percent on every part.`, `Let's strengthen ${join(names(st.plan.map((p) => p.sec)))}.`, "I've prepared a fresh explanation, and new questions you haven't seen.");
    else if(st.verdict!=="deferred")say.push(`You have now used every fresh question on ${join(names(secs.filter((s) => P.flags[s])))}, and that part is not yet at the target.`, "It is marked for instructor review on your report, so please show your report to your instructor. Let's move on for now.");
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
    ].concat(window.S2 ? ["", ...S2.reportText()] : []).join("\n");
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
    const say = [deferred.length ? `Week ${WK} is not complete yet. You have ${deferred.length} questions to answer later.` : flagged.length ? `You have reached the end of Week ${WK}. Here is your achievement report.` : `Week ${WK} complete. Here is your achievement report.`]
      .concat(CLOS.map((c) => `Course outcome ${c}: ${said(cloM(c))}.`))
      .concat(LOS.map((k) => `${A.outcomes[k].name}: ${said(loM(k))}.`))
      .concat(flagged.length ? [`Some parts are not yet at the target, and they are marked for instructor review: ${flagged.map((s) => A.sections[s].name.toLowerCase()).join(" and ")}. Please show this report to your instructor.`] : [`You reached the target on every part of Week ${WK}. Excellent work.`]);
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
    if (T.sendReport) stageEl.querySelector(".st-send").onclick = () => { pause(); const s = $("send"); if (s) s.scrollIntoView({ behavior: smooth(), block: "center" }); };
  }

  // ---------- playback ----------
  function play(fromTap) {
    if (view !== "player") return openPlayer();
    // The first utterance of a page load needs a real user gesture (Chrome autoplay policy); without one, ask for a tap.
    const gesture = fromTap === true || gestureNow();
    if (!spoken && !FAST && synth && !silent && VS.mode !== "captions" && !gesture) return needTap("no-gesture");
    hideTap();
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
    }, { pre, gapAfter, canJoin, sync: !spoken && gesture });
  }
  function advance() {
    const st = cur();
    if(st&&st.deferred&&deferredReturn){
      const back=deferredReturn;deferredReturn=null;
      P.queue=back.queue;P.idx=back.idx;P.part=back.part;P.sent=back.sent;P.q=back.q;
      save();load();bar();return;
    }
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
    load();
    if(listenOnly&&notePending){notePending=false;const cc=$("cc");if(cc)cc.textContent="We will save the questions for later.";}
    play();
  }
  function pause() { playing = false; stopSpeech(); hideTap(); bar(); }

  mediaAction("play",()=>{if(view==="player")play(true);});mediaAction("pause",()=>{if(view==="player")pause();});mediaAction("nexttrack",handsFreeNext);
  $("skipQuestion").onclick=()=>skipQuestion(false);
  $("playerListen").onchange=e=>setListen(e.target.checked);
  $("settingsListen").onchange=e=>setListen(e.target.checked);
  $("handsPlay").onclick=()=>{if(view!=="player")openPlayer();else if(!playing)play(true);};
  $("handsPause").onclick=()=>{if(view==="player")pause();};
  $("handsNext").onclick=handsFreeNext;
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
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { if (!$("vPanel").hidden) $("vClose").click(); setFs(false); } });

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
    if (view === "setupDesign") return setupDesign();
    if (view === "home") return renderHome();
    if (view !== "player") return;
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
  $("vBtn").onclick = () => { $("vMode").value = VS.mode; $("vLook").value = VS.look || "board"; fillVoices(); renderVoiceTests(); openAISettings(); updateListenControls(); $("vRate").value = VS.rate; $("vPitch").value = VS.pitch; showRate(); showPitch(); $("vPanel").hidden = !$("vPanel").hidden; const open = !$("vPanel").hidden; $("vBtn").setAttribute("aria-expanded", String(open)); if (open) $("vClose").focus(); };
  $("vPitch").oninput = (e) => { VS.pitch = +e.target.value; showPitch(); };
  $("vPitch").onchange = () => { saveVS(); applyLive(); };
  $("vClose").onclick = () => { $("vPanel").hidden = true; $("vBtn").setAttribute("aria-expanded", "false"); $("vBtn").focus(); };
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
    if (synth.speaking || synth.pending) { tok++; cancelSpeech(true); setTimeout(go, 350); } else go(); // never cancel and speak in the same tick
  };
  const refreshVoiceLists = () => { if (!$("vPanel").hidden) { fillVoices(); renderVoiceTests(); } else if (view === "setupVoice") renderVoiceTests(); };
  if (synth && synth.addEventListener) synth.addEventListener("voiceschanged", refreshVoiceLists);
  if (synth && synth.onvoiceschanged !== undefined) synth.onvoiceschanged = () => {}; // as in the original prototype
  if (synth) synth.getVoices(); // start loading the device voices early
  // Some engines (Chrome Android, Windows) never fire "voiceschanged": poll briefly until the list is there.
  if (synth) { let tries = 0; const poll = setInterval(() => { if (synth.getVoices().length || ++tries > 20) { clearInterval(poll); refreshVoiceLists(); } }, 250); }
  // Space toggles play, except when a control (answer button, list, input) has focus.
  document.addEventListener("keydown", (e) => { if (e.code === "Space" && view === "player" && !e.target.closest("button,select,input,textarea,label")) { e.preventDefault(); $("toggle").click(); } });

    // ---------- Astra onboarding and browser navigation (v9) ----------
    const ONKEY = "voicelearn.oper621.onboard.v1"; // global: shared by all weeks (progress is the only per-week storage)
    const FORM_URL = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=VEzcgzgLZ0CUzUjdUqdjq8HLB2cl_P1BuWvIvyGwFeZUQUlDOTY0MFMyQTM5N1ZYMTNGUlQ4TFI1Ni4u";
    const openFeedback = () => { try { window.open(FORM_URL, "_blank", "noopener"); } catch (e) {} };
    const onboardDone = () => { try { return localStorage.getItem(ONKEY) !== null; } catch (e) { return false; } };
    // One-time migration: a profile that finished onboarding or saved settings under an older per-week layout counts as set up.
    (function migrateGlobalSetup() { try { if (localStorage.getItem(ONKEY) === null && (localStorage.getItem(VKEY) !== null || localStorage.getItem(LISTEN_KEY) !== null)) localStorage.setItem(ONKEY, "done"); } catch (e) {} })();
    let restoringRoute = false;
    let onboardingFinishedThisVisit = false;
    const routeState = (screen) => ({ voicelearn: true, screen, week: WK });
    function setRoute(screen, replace = false) {
      document.body.dataset.view = screen === "report" ? "player" : screen;
      const nav = $("courseNav"); if (nav) nav.hidden = screen !== "player" && screen !== "report";
      const bottom = document.querySelector(".bar"); if (bottom) bottom.hidden = !["home", "player", "report"].includes(screen);
      if (restoringRoute) return;
      if (!replace && history.state && history.state.voicelearn && history.state.screen === screen && history.state.week === WK) return;
      (replace ? history.replaceState : history.pushState).call(history, routeState(screen), "", location.href);
    }
    function showScreen(screen, markup, replace = false) {
      pause(); waiting = false; view = screen; setRoute(screen, replace);
      $("main").innerHTML = markup;
      window.scrollTo({ top: 0, behavior: "instant" });
      $("main").focus({ preventScroll: true });
      updateNavigation();
    }
    function welcome() {
      const mins = Math.max(5, Math.round(C.lessons.reduce((n,l)=>n+l.sections.reduce((m,sec)=>m+words(sec.lines ? sec.lines.map(x=>x[0]).join(" ") : sec.script || ""),0),0)/150));
      const returning = (()=>{try{return localStorage.getItem(ONKEY)!==null;}catch(e){return false;}})();
      showScreen("welcome", `<section class="card onboard"><div class="onboard-eyebrow"><span class="onboard-eyebrow-dot" aria-hidden="true"></span>Welcome to VoiceLearn · OPER621</div>
        <h1>Business Process Management, explained one step at a time.</h1>
        <p>Learn by listening and seeing ideas unfold. Each lesson is followed by a knowledge check. When a topic needs more practice, VoiceLearn offers a fresh explanation and new questions until you reach the learning outcomes or need instructor support.</p>
        <p>The narrated material takes about ${mins} minutes at normal speed, excluding checks and personalised practice. Your total study time depends on the practice you need. Progress is saved separately for each week on this device.</p>
        <div class="actions"><button class="primary" id="welcomeNext" type="button">Get started →</button>${returning ? `<button id="welcomeSkip" type="button">Skip to course →</button>` : ""}</div></section>`);
      $("welcomeNext").onclick = setupDesign;
      if (returning) $("welcomeSkip").onclick = () => { onboardingFinishedThisVisit = true; history.replaceState(routeState("home"), "", location.href); renderHome(); };
    }
    function mini(id) {
      const text = { notebook:["Lesson note","Observe · reflect"],journey:["Stop 1","Explore the process"],board:["Draw it","Box → arrow → idea"],motion:["Scene 1","Token moves along"] }[id];
      return `<span class="mini ${id}" aria-hidden="true"><span class="tile"><b>${text[0]}</b><br>${text[1]}</span><span>● →</span></span>`;
    }
    function setupDesign() {
      showScreen("setupDesign", `<section class="card onboard"><div class="eyebrow">Setup · Step 1 of 3</div><h1>Choose how your lessons look</h1>
        <p>Each design shows the same learning content. Select the presentation that feels most comfortable.</p>
        <div class="setup-looks" role="group" aria-label="Lesson designs">${LOOKS.map(([id,name,note])=>`<button type="button" class="setup-look" data-design="${id}" aria-pressed="${VS.look===id}">${mini(id)}<b>${esc(name)}</b><span class="muted">${esc(note)}</span></button>`).join("")}</div>
        <div class="actions"><button id="designBack" type="button">← Welcome</button><button class="primary" id="designNext" type="button">Next: voice and speed →</button></div></section>`);
      document.querySelectorAll("[data-design]").forEach(b=>b.onclick=()=>{VS.look=b.dataset.design;saveVS();$("vLook").value=VS.look;document.querySelectorAll("[data-design]").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));});
      $("designBack").onclick=welcome;$("designNext").onclick=setupVoice;
    }
    function setupVoice() {
      showScreen("setupVoice", `<section class="card onboard"><div class="eyebrow">Setup · Step 2 of 3</div><h1>Choose your narrator</h1>
        <p>Voices available on your device are shown best first. Use <b>▶ Test</b> to hear each one. You can change these choices later in Settings.</p>
        <label class="fld">Narration mode <select id="setupMode"><option value="voice">Voice with captions</option><option value="captions">Captions only</option></select></label>
        <label class="fld">Voice <select id="setupVoice"></select></label>
        <div id="setupVoiceTests" class="voice-tests" aria-label="Available voices"></div>
        <label class="fld">Speed: <output id="setupRateOut"></output><input id="setupRate" type="range" min="0.5" max="2" step="0.05"></label>
        <div id="setupVoiceNote" role="status" class="muted"></div>
        <label class="listen-choice"><input id="setupListen" type="checkbox"> <span><strong>Listen only (hands-free)</strong><br>Play lessons continuously and save checks to answer later. A single Play tap starts narration.</span></label>
        <div class="actions"><button id="voiceBack" type="button">← Design</button><button class="primary" id="setupDone" type="button">Next: AI feedback →</button></div></section>`);
      $("setupMode").value=VS.mode;$("setupMode").onchange=e=>{VS.mode=e.target.value;saveVS();};
      $("setupRate").value=VS.rate;$("setupRateOut").textContent=VS.rate.toFixed(2)+"×";
      $("setupRate").oninput=e=>{$("setupRateOut").textContent=Number(e.target.value).toFixed(2)+"×";};
      $("setupRate").onchange=e=>{VS.rate=num(e.target.value,.5,2,.95);saveVS();$("vRate").value=VS.rate;};
      renderVoiceTests();updateListenControls();$("setupListen").onchange=e=>setListen(e.target.checked);
      $("voiceBack").onclick=setupDesign;
      $("setupDone").onclick=setupAI;
    }
    // Optional personal AI keys: only these two localStorage entries are used.
    // A key is never interpolated into HTML, URLs, logs, status messages or history.
    const AI_PROVIDERS = Object.freeze({
      gemini: {name:"Google Gemini", key:"voicelearn.ai.gemini", url:"https://generativelanguage.googleapis.com/v1beta/models", header:"x-goog-api-key", link:"https://aistudio.google.com/apikey"},
      groq: {name:"Groq", key:"voicelearn.ai.groq", url:"https://api.groq.com/openai/v1/models", header:"Authorization", link:"https://console.groq.com/keys"}
    });
    const aiKey = id => { try { return localStorage.getItem(AI_PROVIDERS[id].key) || ""; } catch (_) { return ""; } };
    function aiCard(id) {
      const cfg=AI_PROVIDERS[id], stored=!!aiKey(id);
      const steps=id==="gemini"
        ? "1. Open Google AI Studio. 2. Sign in with your Google account. 3. Choose Create API key and copy it. 4. Paste it below."
        : "1. Open the Groq console. 2. Create a free account or sign in. 3. Open API Keys and create a key. 4. Copy and paste it below.";
      return `<section class="ai-provider" aria-labelledby="ai-title-${id}"><h2 id="ai-title-${id}">${cfg.name}</h2>
        <p>${steps}</p><p><a href="${cfg.link}" target="_blank" rel="noopener noreferrer">Create a ${cfg.name} key ↗ <span class="sr-only">(opens a new tab)</span></a></p>
        <label class="fld" for="ai-input-${id}">${cfg.name} API key</label>
        <input id="ai-input-${id}" type="password" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${stored ? "Saved key — enter a new key to replace" : "Paste your key here"}" aria-describedby="ai-status-${id}">
        <div class="ai-key-actions"><button type="button" data-ai-test="${id}">Test key</button><button type="button" data-ai-save="${id}">Save key</button><button type="button" data-ai-remove="${id}" ${stored ? "" : "disabled"}>Remove saved key</button></div>
        <p id="ai-status-${id}" class="ai-key-status" role="status" aria-live="polite">${stored ? "✓ A key is saved on this device. Enter a new one to replace it." : "No key saved yet."}</p></section>`;
    }
    function aiEditorMarkup() {
      return `<div class="ai-provider-grid">${aiCard("gemini")}${aiCard("groq")}</div>
        <p class="ai-privacy"><strong>Privacy:</strong> Keys stay in this browser's localStorage, not on a VoiceLearn server. Test sends the key only to its chosen provider. Later, when you use essay feedback, your essay text will be sent to the provider you choose. Anyone with access to this browser or its developer tools may be able to read locally stored keys. Free access and limits are set by each provider.</p>`;
    }
    function bindAIEditor() {
      const status=(id,text,good=false)=>{const el=$("ai-status-"+id);if(el){el.textContent=text;el.classList.toggle("ai-ok",good);}};
      const save=id=>{
        const input=$("ai-input-"+id), value=input.value.trim();
        if(!value){status(id,"Enter a key before saving.");return false;}
        try{localStorage.setItem(AI_PROVIDERS[id].key,value);input.value="";input.placeholder="Saved key — enter a new key to replace";
          const remove=document.querySelector(`[data-ai-remove="${id}"]`);if(remove)remove.disabled=false;
          status(id,"✓ Key saved on this device.",true);return true;
        }catch(_){status(id,"Could not save the key. Check your browser storage settings.");return false;}
      };
      document.querySelectorAll("[data-ai-save]").forEach(b=>b.onclick=()=>save(b.dataset.aiSave));
      document.querySelectorAll("[data-ai-remove]").forEach(b=>b.onclick=()=>{
        const id=b.dataset.aiRemove;try{localStorage.removeItem(AI_PROVIDERS[id].key);$("ai-input-"+id).value="";$("ai-input-"+id).placeholder="Paste your key here";b.disabled=true;status(id,"Key removed from this browser.");}
        catch(_){status(id,"Could not remove the key. Check browser storage settings.");}
      });
      document.querySelectorAll("[data-ai-test]").forEach(b=>b.onclick=async()=>{
        const id=b.dataset.aiTest,cfg=AI_PROVIDERS[id],input=$("ai-input-"+id);
        const entered=input.value.trim(),key=entered||aiKey(id);
        if(!key){status(id,"Paste a key or save one before testing.");return;}
        b.disabled=true;status(id,"Testing securely with "+cfg.name+"…");
        const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),12000);
        try{
          const headers=cfg.header==="Authorization"?{Authorization:"Bearer "+key}:{"x-goog-api-key":key};
          const response=await fetch(cfg.url,{method:"GET",headers,mode:"cors",cache:"no-store",referrerPolicy:"no-referrer",signal:controller.signal});
          if(!response.ok){status(id,response.status===401||response.status===403?"✗ Key rejected or access not permitted.":"✗ Test failed (HTTP "+response.status+"). Check your provider account.");return;}
          const data=await response.json();
          if(!data||!Array.isArray(id==="gemini"?data.models:data.data)){status(id,"✗ Provider returned an unexpected response.");return;}
          // A successful test saves the entered key locally; no secret is shown.
          if(entered){if(!save(id))return;}
          status(id,"✓ Key works. Saved on this device.",true);
        }catch(error){status(id,error&&error.name==="AbortError"?"✗ Test timed out. Try again.":"✗ Could not contact the provider. Check your connection or browser restrictions.");}
        finally{clearTimeout(timeout);b.disabled=false;}
      });
    }
    function finishOnboarding(){
      try{localStorage.setItem(ONKEY,"done");}catch(_){}
      onboardingFinishedThisVisit=true;
      history.replaceState(routeState("home"),"",location.href);
      renderHome();
    }
    function setupAI(){
      showScreen("setupAI",`<section class="card onboard ai-setup"><div class="eyebrow">Setup · Step 3 of 3</div>
        <h1>Get AI feedback <span class="muted">(optional, recommended)</span></h1>
        <p>Would you like personal feedback on your case-study essays? You can bring your own free AI key from Google Gemini or Groq. VoiceLearn will remember it on this device, ready for the Session 2 case-study essay feedback in every week. You can use one, both, or neither.</p>
        ${aiEditorMarkup()}
        <div class="actions"><button id="aiBack" type="button">← Voice setup</button><button id="aiSkip" type="button">Skip for now</button><button id="aiDone" class="primary" type="button">Continue to course →</button></div></section>`);
      bindAIEditor();$("aiBack").onclick=setupVoice;$("aiSkip").onclick=finishOnboarding;$("aiDone").onclick=finishOnboarding;
    }
    function openAISettings(){
      const panel=$("vPanel"),existing=$("aiSettings");if(existing)existing.remove();
      const section=document.createElement("section");section.id="aiSettings";section.className="ai-settings";
      section.innerHTML='<h2>AI feedback keys</h2><p class="muted">Edit, test or remove your optional keys here.</p>'+aiEditorMarkup();
      panel.appendChild(section);bindAIEditor();
    }
    function testSpecificVoice(uri) {
      if(!synth)return;
      if(playing)pause();
      const voices=rankedVoices(),v=voices.find(x=>x.voiceURI===uri);
      if(v){VS.uri=v.voiceURI;saveVS();const sel=$("setupVoice");if(sel)sel.value=VS.uri;if(!$("vPanel").hidden)fillVoices();}
      const note=$("setupVoiceNote")||$("vNote");
      const setTestStatus=text=>{for(const id of ["setupVoiceNote","vNote"]){const node=$(id);if(node)node.textContent=text;}};
      setTestStatus("Starting voice sample…");
      const speakTest=()=>{
        const u=new SpeechSynthesisUtterance("Hello. Welcome to VoiceLearn. This is how your lessons will sound.");
        if(v){u.voice=v;u.lang=v.lang;}else u.lang="en-US";
        u.rate=VS.rate;u.pitch=VS.pitch;u.volume=window.__vlMute?0:1;
        window.__vlTestU=u;
        u.onstart=()=>setTestStatus("Playing voice sample…");
        u.onend=()=>setTestStatus("Finished. You can test another voice.");
        u.onerror=e=>setTestStatus("Voice test unavailable: "+e.error);
        try{if(synth.paused)synth.resume();synth.speak(u);}catch(e){if(note)note.textContent="Voice test could not start.";}
      };
      if(synth.speaking||synth.pending){cancelSpeech(true);setTimeout(speakTest,Math.max(320,350-(performance.now()-lastCancel)));}
      else {const wait=Math.max(0,320-(performance.now()-lastCancel));if(wait)setTimeout(speakTest,wait);else speakTest();}
    }
    function renderVoiceTests() {
      const voices=rankedVoices();
      for(const prefix of ["setup", "v"]){
        const list=$(prefix==="setup"?"setupVoiceTests":"voiceTests");
        if(!list)continue;
        list.innerHTML=voices.length?voices.map((v,i)=>`<div class="voice-test-row"><span>${i===0?"★ ":""}${esc(v.name)} · ${esc(v.lang)}${v.localService?"":" · online"}</span><button type="button" data-voice-test="${i}" aria-label="Test ${esc(v.name)}">▶ Test</button></div>`).join(""):'<p class="muted">No English voices listed yet. You can use the device default or captions only.</p>';
        list.querySelectorAll("[data-voice-test]").forEach(b=>b.onclick=()=>{const v=voices[+b.dataset.voiceTest];if(v)testSpecificVoice(v.voiceURI);});
      }
      const sel=$("setupVoice");if(sel){sel.innerHTML='<option value="">★ Automatic (recommended)</option>'+voices.map(v=>`<option value="${esc(v.voiceURI)}">${esc(v.name)} · ${esc(v.lang)}</option>`).join("");sel.value=VS.uri;sel.onchange=e=>{VS.uri=e.target.value;saveVS();};}
    }
function updateNavigation() {
  const nav = $("courseNav");
  if (!nav) return;

  const active = view === "player";

  document.body.dataset.view = view;
  nav.hidden = !active;

  positionSettingsButton();

  if (!active) return;

  const st = cur();
  if (!st) return;

  const lesson = C.lessons[st.l] || C.lessons[0];
  const lessonNumber =
    Number.isInteger(st.l) ? st.l + 1 : 1;

  let location = "";

  if (st.kind === "sec") {
    const section = lesson?.sections?.[st.s];
    location =
      `Part ${st.s + 1} · ${section?.title || "Lesson"}`;

  } else if (st.kind === "review") {
    const section = A.sections?.[st.sec];
    location = `Review · ${section?.name || "Review"}`;

  } else if (st.kind === "quiz") {
    location = `Check · Question ${P.q + 1}`;

  } else if (st.kind === "result") {
    location = "Result";

  } else {
    location = "Achievement report";
  }

  const shortLoc = st.kind === "sec" ? `Part ${st.s + 1}` : st.kind === "review" ? "Review" : location;
  const breadcrumb = `W${WK} · L${lessonNumber} · ${shortLoc}`;
  const fullCrumb = `Week ${WK}, lesson ${lessonNumber}: ${lesson ? lesson.title : ""}, ${location}`;

  const crumb = $("crumb");

  if (crumb) {
    if (crumb.textContent !== breadcrumb) {
      crumb.textContent = breadcrumb;
    }

    crumb.title = fullCrumb;
  }

  const weekSwitch = $("navWeek");
  if (weekSwitch) weekSwitch.value = String(WK);

  const settingsWeek = $("settingsWeek");
  if (settingsWeek) {
    settingsWeek.value = String(WK);
  }

  const total =
    script && script.main
      ? script.main.length
      : 1;

  const progress =
    st.kind === "quiz"
      ? (P.q + 1) /
        Math.max(1, st.qs?.length || 1)
      : (P.sent + 1) /
        Math.max(1, total);

  const percent =
    Math.round(clamp(progress, 0, 1) * 100);

  const progressBar = $("navProgress");

  if (progressBar) {
    let fill = progressBar.querySelector("i");

    if (!fill) {
      fill = document.createElement("i");
      progressBar.appendChild(fill);
    }

    fill.style.width = `${percent}%`;

    progressBar.setAttribute(
      "aria-valuenow",
      String(percent)
    );

    progressBar.setAttribute(
      "aria-valuetext",
      `${percent} percent complete`
    );
  }

  const progressText = $("navProgressText");

  if (progressText) {
    progressText.textContent =
      `${percent}% of ${
        st.kind === "quiz" ? "check" : "part"
      }`;
  }

  $("navPrev").disabled =
    waiting ||
    P.part === "feedback" ||
    P.sent <= 0;

  $("navNext").disabled =
    waiting ||
    P.part === "feedback" ||
    P.sent >= total - 1;

  $("navPrevPart").disabled =
    !(st.kind === "sec" && st.s > 0);

  $("navNextPart").disabled =
    !(
      st.kind === "sec" &&
      st.s < lesson.sections.length - 1
    );
}
    function positionSettingsButton() {
  const button = $("vBtn");
  if (!button) return;

  const playerSlot = $("playerSettingsSlot");
  const headerSlot = $("headerSettingsSlot");

  const destination =
    view === "player" ? playerSlot : headerSlot;

  if (!destination) return;

  if (button.parentElement !== destination) {
    destination.appendChild(button);
  }

  const playerMode = view === "player";

  button.classList.toggle(
    "player-settings-button",
    playerMode
  );

  button.setAttribute(
    "aria-label",
    "Voice, speed and look settings"
  );

  button.title = "Voice, speed and look settings";

  if (playerMode) {
    button.dataset.compact = "true";
  } else {
    delete button.dataset.compact;
  }
}
    function seekSentence(delta){if(view!=="player"||waiting||P.part!=="main"||!script)return;const to=clamp(P.sent+delta,0,script.main.length-1);pause();P.sent=to;save();caption(script.main[to]);vstep(to-script.offset);updateNavigation();}
    function seekPart(delta){if(view!=="player")return;const st=cur();if(st.kind!=="sec")return;const next=st.s+delta;if(next<0||next>=C.lessons[st.l].sections.length)return;pause();
      // Review navigation is a replay only; do not consume questions or alter mastery.
      const nx=P.queue[P.idx+1], rep={kind:"sec",l:st.l,s:next,replay:true};
      if(delta>0&&nx&&nx.kind==="sec"&&nx.l===st.l&&nx.s===next)P.idx++;
      else if(delta>0)P.queue[P.idx]=rep;
      else P.queue.splice(P.idx,0,rep);
      P.part="main";P.sent=0;P.q=0;save();load();updateNavigation();}
$("navHome").onclick = () => {
  setFs(false);
  pause();
  renderHome();
  positionSettingsButton();
};

const weekSelect = $("navWeek");

if (weekSelect) {
  weekSelect.innerHTML = weekList()
    .map(
      w =>
        `<option value="${w.n}">` +
        `Week ${w.n} · ${esc(w.title)}` +
        `</option>`
    )
    .join("");

  weekSelect.value = String(WK);

  weekSelect.onchange = e =>
    switchWeek(e.target.value);
}

$("navPrev").onclick = () => seekSentence(-1);
$("navNext").onclick = () => seekSentence(1);

$("navPrevPart").onclick = () => seekPart(-1);
$("navNextPart").onclick = () => seekPart(1);
function populateSettingsWeeks() {
  const select = $("settingsWeek");
  if (!select) return;

  const weeks = weekList();

  select.replaceChildren();

  weeks.forEach(w => {
    const option = document.createElement("option");
    option.value = String(w.n);
    option.textContent = `Week ${w.n} · ${w.title}`;
    select.appendChild(option);
  });

  select.value = String(WK);
}

populateSettingsWeeks();

const settingsWeek = $("settingsWeek");

if (settingsWeek) {
  settingsWeek.onchange = e => {
    const n = Number(e.target.value);

    if (!Number.isInteger(n)) {
      e.target.value = String(WK);
      return;
    }

    const valid = weekList().some(w => w.n === n);

    if (!valid) {
      e.target.value = String(WK);
      return;
    }

    switchWeek(n);
  };
}

(function installCaptionToggleAndCounter() {
  const KEY = "voicelearn.oper621.captions.v1", btn = $("ccBtn");
  const apply = (on) => { document.body.classList.toggle("cc-off", !on); if (btn) btn.setAttribute("aria-pressed", String(on)); };
  let on = false; try { on = localStorage.getItem(KEY) === "on"; } catch (e) {}
  apply(on);
  if (btn) btn.onclick = () => { on = !on; apply(on); try { localStorage.setItem(KEY, on ? "on" : "off"); } catch (e) {} };
  // The look's own "07/32" counter moves into the slim top bar (the look header itself is hidden by CSS).
  const sync = () => { const c = document.querySelector(".player .nb-counter,.player .cx-counter,.player .jy-counter"), t = $("lookCount"); if (t) t.textContent = c ? c.textContent.trim() : ""; };
  new MutationObserver(sync).observe($("main"), { childList: true, characterData: true, subtree: true });
  sync();
})();

(function installMoreMenu() {
  /* Phone: one "more" menu replaces the secondary buttons. Each item forwards the click to the real control, so no logic is duplicated. */
  const btn = $("moreBtn"), menu = $("moreMenu"); if (!btn || !menu) return;
  const items = [
    ["navPrevPart", "Previous part"], ["navNextPart", "Next part"], ["repBtn", "Replay this sentence"],
    ["fsBtn", "Full screen"], ["ccBtn", "Captions on or off"], ["playerListen", "Hands-free listening (listen only)"]
  ];
  function build() {
    menu.replaceChildren();
    items.forEach(([id, label]) => {
      const src = $(id); if (!src) return;
      const b = document.createElement("button"); b.type = "button"; b.setAttribute("role", id === "playerListen" || id === "ccBtn" ? "menuitemcheckbox" : "menuitem");
      const on = id === "playerListen" ? src.checked : id === "ccBtn" ? !document.body.classList.contains("cc-off") : null;
      if (on !== null) b.setAttribute("aria-checked", String(on));
      b.textContent = label + (on === null ? "" : on ? ": on" : ": off");
      b.disabled = !!src.disabled;
      b.onclick = () => { close(); src.click(); };
      menu.appendChild(b);
    });
  }
  function open() { build(); menu.hidden = false; btn.setAttribute("aria-expanded", "true"); const f = menu.querySelector("button:not(:disabled)"); if (f) f.focus(); }
  function close(refocus) { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); if (refocus) btn.focus(); }
  btn.onclick = () => (menu.hidden ? open() : close(true));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { e.preventDefault(); close(true); } });
  document.addEventListener("click", (e) => { if (!menu.hidden && !menu.contains(e.target) && !btn.contains(e.target)) close(); });
})();
(function installCaptionDedupe() {
  /* If the sentence being spoken is already printed on the slide, the caption line is hidden for that moment (space is kept, so nothing jumps). */
  const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  let timer = 0;
  function check() {
    const cc = document.querySelector(".cc"), look = document.querySelector(".player .look:not([hidden]),.player .stage:not([hidden])"); if (!cc || !look) return;
    const c = norm(cc.textContent); let dup = false;
    if (c.length >= 5) { const lt = norm(look.textContent); const c2 = c.replace(/^(diagram )?[a-d] /, ""); dup = lt.includes(c) || (c2.length >= 15 && lt.includes(c2)); }
    cc.classList.toggle("cc-dup", dup);
    cc.title = cc.textContent;
  }
  const kick = () => { clearTimeout(timer); timer = setTimeout(check, 450); };
  new MutationObserver(kick).observe($("main"), { childList: true, characterData: true, subtree: true });
})();
positionSettingsButton();
    window.addEventListener("popstate",e=>{let target=e.state&&e.state.voicelearn?e.state.screen:"welcome";
      if(onboardingFinishedThisVisit&&(target==="setupDesign"||target==="setupVoice"||target==="setupAI")){history.replaceState(routeState("welcome"),"",location.href);target="welcome";}
      if(e.state&&e.state.voicelearn&&e.state.s2&&window.S2){restoringRoute=true;try{setFs(false);pause();S2.open(e.state.s2,{fromPop:true});}finally{restoringRoute=false;}return;}
      restoringRoute=true;try{setFs(false);pause();if(target==="player"||target==="report")openPlayer();else if(target==="home")renderHome();else if(target==="setupAI")setupAI();else if(target==="setupVoice")setupVoice();else if(target==="setupDesign")setupDesign();else welcome();}finally{restoringRoute=false;}});
    $("vFeedback").onclick = openFeedback;
    $("vSetup").onclick = () => { $("vPanel").hidden = true; $("vBtn").setAttribute("aria-expanded", "false"); setupDesign(); };
    function switchWeek(n){const next=Number(n);if(!Number.isInteger(next)||next<1||next>14||next===WK)return;pause();setFs(false);
      try{localStorage.setItem(ONKEY,"done");}catch(e){}
      const url=new URL(location.href);url.searchParams.set("week",String(next));location.assign(url.href);}
    function initOnboarding(){
      $("weekLabel").textContent=`Week ${WK}`;
      const navEntry=performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
      const isReload=!!(navEntry&&navEntry.type==="reload");
      const state=history.state;
      if(isReload&&state&&state.voicelearn&&state.week===WK&&state.s2&&window.S2){restoringRoute=true;try{S2.open(state.s2,{fromPop:true});}finally{restoringRoute=false;}return;}
      if(isReload&&state&&state.voicelearn&&state.week===WK){restoringRoute=true;try{if(state.screen==="player"||state.screen==="report")openPlayer();else if(state.screen==="home")renderHome();else if(state.screen==="setupAI")setupAI();else if(state.screen==="setupVoice")setupVoice();else if(state.screen==="setupDesign")setupDesign();else welcome();}finally{restoringRoute=false;}return;}
      // Setup is global: only the very first visit starts with Welcome. A new week (or a later visit) opens Home.
      if (onboardDone()) { onboardingFinishedThisVisit = true; history.replaceState(routeState("home"), "", location.href); renderHome(); return; }
      history.replaceState(routeState("welcome"), "", location.href);
      welcome();
    }
  // QA hooks (not used by the page itself).
  window.__vl = { state: () => P, cur, advance, reportText, secM, loM, cloM, respond: (ok) => submit(ok), skip: () => { stopSpeech(); if (cur().kind !== "quiz" || P.part === "feedback") advance(); },
    // show sentence i of the current step, paused (for screenshots)
    at: (i) => { pause(); P.sent = i; caption(script.main[i]); vstep(i - script.offset); },
    // open lesson l at step s (0..sections-1 = parts, then quiz, result), paused
    jump: (l, s = 0) => { pause(); P.queue = lessonPlan(l); P.idx = s; P.part = "main"; P.sent = 0; P.q = 0; save(); openPlayer(false); updateNavigation(); },
    showQ: (id) => { pause(); const st = cur(); st.qs = [id]; P.q = 0; P.part = "main"; P.sent = 0; load(); }, // QA: show one specific question (current step must be a quiz)
    setLook: (id) => { VS.look = id; saveVS(); },
    fast: (on) => { FAST = !!on; }, speech: () => ({ available: !!synth, silent, why: silentWhy, voices: enVoices().length, chosen: voice() && voice().name, ranked: rankedVoices().slice(0, 6).map((v) => v.name + " [" + vScore(v) + "]"), sayText, rate: VS.rate, log: SLOG.slice(-12) }) };
  if (window.S2) S2.init({ week: WK, esc, smooth,
    showScreen: (name, html, st) => { pause(); waiting = false; view = name; const was = restoringRoute; restoringRoute = true; try { setRoute(name); } finally { restoringRoute = was; }
      const s2 = st && st.s2; if (!(st && st.fromPop) && !was) { const cur = history.state; if (!(cur && cur.s2 && JSON.stringify(cur.s2) === JSON.stringify(s2) && cur.screen === name)) history.pushState(Object.assign(routeState(name), { s2 }), "", location.href); }
      $("main").innerHTML = html; window.scrollTo({ top: 0, behavior: "instant" }); $("main").focus({ preventScroll: true }); updateNavigation(); },
    goHome: () => renderHome(),
    openSettings: () => { if ($("vPanel").hidden) $("vBtn").click(); const a = $("aiSettings"); if (a) a.scrollIntoView({ block: "center" }); } });
  initOnboarding();
})();
