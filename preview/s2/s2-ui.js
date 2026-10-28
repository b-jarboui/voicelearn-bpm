(function () {
  "use strict";

  const S2 = {};
  let host = null, active = null, timer = null, running = null;
  const P = () => window.S2Providers;
  const L = () => window.S2Local;
  const data = () => window.S2_DATA?.[host?.week];
  const esc = value => host.esc(String(value ?? ""));
  const escAttr = value => esc(value).replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const words = text => L().words(String(text || ""));
  const providerName = id => id === "gemini" ? "Gemini" : "Groq";
  const otherProvider = id => id === "gemini" ? "groq" : "gemini";
  const storageKey = () => `voicelearn.oper621.s2.w${host.week}.v1`;
  const emptyStore = () => ({ drafts: {}, history: {}, local: {} });
  const validObject = x => x && typeof x === "object" && !Array.isArray(x);
  const safeArray = x => Array.isArray(x) ? x : [];
  const dateText = at => {
    const n = Number(at);
    return Number.isFinite(n) && n > 0 ? new Date(n).toLocaleString() : "Date unavailable";
  };

  function readStore() {
    try {
      const raw = JSON.parse(localStorage.getItem(storageKey()) || "null");
      if (!validObject(raw)) return emptyStore();
      return {
        drafts: validObject(raw.drafts) ? raw.drafts : {},
        history: validObject(raw.history) ? raw.history : {},
        local: validObject(raw.local) ? raw.local : {}
      };
    } catch (_) {
      return emptyStore();
    }
  }

  function writeStore(store) {
    try {
      localStorage.setItem(storageKey(), JSON.stringify(store));
      return true;
    } catch (_) {
      return false;
    }
  }

  function storageWorks() {
    try { const k = storageKey() + ".probe"; localStorage.setItem(k, "1"); localStorage.removeItem(k); return true; }
    catch (_) { return false; }
  }

  function a11yScroll() {
    document.getElementById("main")?.querySelectorAll(".scroll").forEach(el => {
      el.tabIndex = 0;
      el.setAttribute("role", "region");
      el.setAttribute("aria-label", "Table. Scroll sideways to see all columns.");
    });
  }

  function questionId(c, q = 0) {
    return c === 2 ? `W${host.week}-FORUM` : `W${host.week}-C${q + 1}`;
  }

  function draft(store, id) {
    return typeof store.drafts?.[id]?.text === "string" ? store.drafts[id].text : "";
  }

  function historyFor(store, id) {
    return safeArray(store.history?.[id]).filter(x =>
      validObject(x) && validObject(x.review) && ["gemini", "groq"].includes(x.provider)
    );
  }

  function caseData(c) {
    return c === 1 ? data()?.classCase : data()?.forumCase;
  }

  function saveDraft(force = false) {
    if (!active?.textarea || !host) return true;
    clearTimeout(timer);
    timer = null;
    const text = active.textarea.value;
    if (!force && text === active.lastSaved) return active.saved;
    const store = readStore();
    store.drafts[active.id] = { text, at: Date.now() };
    const ok = writeStore(store);
    active.saved = ok;
    if (ok) active.lastSaved = text;
    updateCount();
    return ok;
  }

  function scheduleSave() {
    clearTimeout(timer);
    timer = setTimeout(() => saveDraft(), 400);
    updateCount();
  }

  function updateCount() {
    if (!active?.textarea) return;
    const n = words(active.textarea.value);
    const count = active.root.querySelector("#s2-count");
    if (!count) return;
    let text = `${n} ${n === 1 ? "word" : "words"} - `;
    text += active.saved === false
      ? "Not saved: your browser blocks storage."
      : "saved on this device";
    if (active.c === 2) {
      const hint = n < 400 ? "A little short so far" :
        n <= 600 ? "In the target range" : "Longer than the target";
      text += `. The target is 400 to 600 words. ${hint}.`;
    }
    count.textContent = text;
  }

  function announce(text) {
    const notice = active?.root?.querySelector("#s2-notice");
    if (notice) notice.textContent = [notice.textContent, text].filter(Boolean).join(" ");
  }

  function flushDraft() {
    if (active?.textarea) saveDraft(true);
  }

  function init(h) {
    if (!h || typeof h.showScreen !== "function" || typeof h.esc !== "function")
      throw new Error("Session 2 needs a valid host.");
    host = h;
    window.removeEventListener("pagehide", flushDraft);
    window.removeEventListener("focus", refreshKeys);
    document.removeEventListener("visibilitychange", visibilityRefresh);
    document.removeEventListener("click", settingsCloseRefresh);
    window.addEventListener("pagehide", flushDraft);
    window.addEventListener("focus", refreshKeys);
    document.addEventListener("visibilitychange", visibilityRefresh);
    document.addEventListener("click", settingsCloseRefresh);
    return S2;
  }

  function visibilityRefresh() {
    if (document.hidden) flushDraft(); else refreshKeys();
  }

  function settingsCloseRefresh(event) {
    if (event.target.closest("#vClose, #vBtn")) setTimeout(refreshKeys, 80);
  }

  function progress() {
    const week = data();
    if (!week) return { cases: [], anyStarted: false };
    const store = readStore();
    const cases = [1, 2].map(c => {
      const cd = caseData(c);
      const total = c === 1 ? safeArray(cd?.questions).length : 1;
      let answered = 0, feedback = 0, wordTotal = 0;
      for (let q = 0; q < total; q++) {
        const id = questionId(c, q);
        const n = words(draft(store, id));
        wordTotal += n;
        if (n >= (c === 1 ? 20 : 120)) answered++;
        if (historyFor(store, id).length || Number(store.local?.[id]) > 0) feedback++;
      }
      return { id: c, title: cd?.title || "", total, answered, feedback, words: wordTotal };
    });
    const anyStarted = cases.some(c => c.words > 0 || c.feedback > 0);
    return { cases, anyStarted };
  }

  function caseStatus(c, store) {
    const ids = c === 1
      ? safeArray(caseData(1)?.questions).map((_, i) => questionId(1, i))
      : [questionId(2)];
    if (ids.some(id => historyFor(store, id).length || Number(store.local?.[id]) > 0))
      return "Feedback received";
    if (ids.some(id => words(draft(store, id)) > 0)) return "In progress";
    return "Not started";
  }

  function homeCard() {
    if (!data()) return "";
    const store = readStore();
    const rows = [1, 2].map(c => {
      const cd = caseData(c);
      return `<div class="s2-home-row">
        <div class="s2-home-info">
          <strong>Case ${c}: ${esc(cd?.title)}</strong>
          ${c === 2 ? `<p class="muted">This is the case of the Moodle Session 2 forum.</p>` : ""}
          <span class="pill s2-progress">${esc(caseStatus(c, store))}</span>
        </div>
        <button type="button" class="primary s2-open" data-c="${c}" aria-label="Open Case ${c}: ${escAttr(cd?.title)}">Open</button>
      </div>`;
    }).join("");
    return `<section class="card s2-home">
      <p class="eyebrow">Session 2 - Case study</p>
      <h2>Practise on real cases</h2>
      <p>Self-paced: open it any time, before or after the lessons.</p>
      <div class="s2-home-rows">${rows}</div>
    </section>`;
  }

  function bindOpen(root) {
    root?.querySelectorAll(".s2-open").forEach(button => {
      button.addEventListener("click", () => {
        const c = Number(button.dataset.c) || 1;
        open({ v: "case", c });
      });
    });
  }

  function bindHome(root) { bindOpen(root); }

  function reportText() {
    if (!data()) return [];
    const p = progress(), store = readStore();
    if (!p.anyStarted) return ["Session 2 - Case study: not started"];
    const lines = ["Session 2 - Case study:"];
    p.cases.forEach(c => {
      const ids = c.id === 1
        ? safeArray(caseData(1)?.questions).map((_, i) => questionId(1, i))
        : [questionId(2)];
      const providers = new Set();
      let localDone = false;
      ids.forEach(id => {
        historyFor(store, id).forEach(h => providers.add(providerName(h.provider)));
        if (Number(store.local?.[id]) > 0) localDone = true;
      });
      const feedbackParts = [...providers];
      if (localDone) feedbackParts.push("local check");
      if (c.id === 1) {
        lines.push(`- Case 1 ${c.title}: ${c.answered} of ${c.total} answers drafted, feedback on ${c.feedback}${feedbackParts.length ? ` (${feedbackParts.join(", ")})` : ""}`);
      } else {
        lines.push(`- Case 2 ${c.title}: ${c.words ? `forum post ${c.words} words` : "forum post not started"}${localDone ? ", local check done" : ""}${providers.size ? `, feedback from ${[...providers].join(" and ")}` : ""}`);
      }
    });
    return lines;
  }

  function reportCard() {
    if (!data()) return "";
    const lines = reportText();
    return `<section class="card s2-report">
      <h3>Session 2 - Case study</h3>
      ${lines.slice(1).length
        ? `<ul>${lines.slice(1).map(line => `<li>${esc(line.replace(/^- /, ""))}</li>`).join("")}</ul>`
        : `<p>Not started yet.</p>`}
      <button type="button" class="primary s2-open" data-c="1">Open Session 2</button>
    </section>`;
  }

  function bindReport(root) { bindOpen(root); }

  function situationHtml(cd) {
    return `<div class="s2-situation">${safeArray(cd?.situation)
      .map(p => `<p>${esc(p)}</p>`).join("")}</div>`;
  }

  function exhibitHtml(cd) {
    if (!safeArray(cd?.exhibit).length) return "";
    return `<section class="s2-exhibit">
      <h3>${esc(cd.exhibitTitle || "Case exhibit")}</h3>
      ${L().tableHtml(cd.exhibit)}
    </section>`;
  }

  function caseBody(cd) {
    return `${situationHtml(cd)}${exhibitHtml(cd)}`;
  }

  function caseQuestionStatus(c, q, store) {
    const id = questionId(c, q);
    const n = words(draft(store, id));
    const results = historyFor(store, id);
    const names = [...new Set(results.map(r => providerName(r.provider)))];
    const localDone = Number(store.local?.[id]) > 0;
    const sources = names.concat(localDone ? ["the local check"] : []);
    const savedText = n === 1 ? "You have saved 1 word so far." : `You have saved ${n} words so far.`;
    if (sources.length) return `You have received feedback from ${sources.join(" and ")}. ${savedText}`;
    return n ? savedText : "Not started yet.";
  }

  function showCase(c) {
    const cd = caseData(c), store = readStore();
    const questions = safeArray(cd.questions);
    const questionRows = c === 1
      ? questions.map((question, q) => `<li class="s2-question-row">
          <div class="s2-question-body">
            <strong>Question ${q + 1}</strong>
            <p>${esc(question)}</p>
            <p class="s2-status">${esc(caseQuestionStatus(c, q, store))}</p>
          </div>
          <button type="button" class="primary s2-answer-open" data-q="${q}" aria-label="Answer question ${q + 1}">Answer</button>
        </li>`).join("")
      : questions.map((question, q) =>
          `<li><strong>Question ${q + 1}.</strong> ${esc(question)}</li>`
        ).join("");

    const extra = c === 2 ? `
      <p>Answer all questions in one post of 400 to 600 words.</p>
      <p class="s2-status">${esc(caseQuestionStatus(2, 0, store))}</p>
      <button type="button" class="primary s2-answer-open" data-q="0">Write your forum post</button>
      ${safeArray(cd.pushFurther).length ? `<section class="s2-further">
        <h3>If you want to go further</h3>
        <ul>${cd.pushFurther.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
      </section>` : ""}` : "";

    const html = `<div class="s2-page s2-case">
      <button type="button" class="s2-back" id="s2-back-week">Back to Week ${esc(host.week)}</button>
      <section class="card">
        <p class="eyebrow">Session 2 - Case study - Case ${c}</p>
        <h1>${esc(cd.title)}</h1>
        <p class="s2-organisation">${esc(cd.company || cd.organisation || "")}</p>
        ${caseBody(cd)}
      </section>
      <section class="card s2-questions">
        <h2>Questions</h2>
        <${c === 1 ? "ol" : "ol"} class="s2-question-list">${questionRows}</ol>
        ${extra}
      </section>
      <nav class="s2-case-nav" aria-label="Case navigation">
        <button type="button" class="s2-switch-case" data-c="${c === 1 ? 2 : 1}">
          ${c === 1 ? "Case 2 - Next case" : "Previous case - Case 1"}
        </button>
      </nav>
    </div>`;

    host.showScreen("s2-case", html, { s2: { v: "case", c } });
    a11yScroll();
    const root = document.getElementById("main");
    root.querySelector("#s2-back-week")?.addEventListener("click", () => host.goHome());
    root.querySelectorAll(".s2-answer-open").forEach(b =>
      b.addEventListener("click", () => open({ v: "q", c, q: Number(b.dataset.q) }))
    );
    root.querySelector(".s2-switch-case")?.addEventListener("click", e =>
      open({ v: "case", c: Number(e.currentTarget.dataset.c) })
    );
  }

  function feedbackButtons() {
    return `<div class="s2-actions" id="s2-actions">
      <div class="s2-action-group">
        <button type="button" id="s2-check-local">Check locally</button>
        <small>Works without internet.</small>
      </div>
      ${["gemini", "groq"].map(id => `<div class="s2-action-group s2-provider-group" data-provider="${id}">
        <button type="button" class="s2-fb" data-provider="${id}">Get feedback from ${providerName(id)}</button>
        <button type="button" class="s2-settings-link" data-provider="${id}">Add your ${providerName(id)} key in Settings</button>
      </div>`).join("")}
    </div>
    <p class="s2-privacy">When you ask for feedback, your essay is sent to the provider you choose (Google for Gemini, Groq for Groq), using your own key. It is not sent to VoiceLearn or to your teacher.</p>
    <div id="s2-notice" class="s2-notice" role="status" aria-live="polite"></div>
    <div id="s2-request-status" class="s2-request-status" role="status" aria-live="polite"></div>
    <button type="button" id="s2-cancel" hidden>Cancel the feedback request</button>`;
  }

  function showEssay(c, q) {
    const cd = caseData(c), isForum = c === 2;
    const id = questionId(c, q), store = readStore();
    const questions = safeArray(cd.questions);
    const questionHtml = isForum
      ? `<ol class="s2-forum-questions">${questions.map((text, i) =>
          `<li><strong>Question ${i + 1}.</strong> ${esc(text)}</li>`).join("")}</ol>`
      : `<p class="s2-question-stem">${esc(questions[q])}</p>`;
    const breadcrumb = isForum
      ? `Week ${host.week} - Case 2 - Forum post`
      : `Week ${host.week} - Case 1 - Question ${q + 1} of ${questions.length}`;
    const html = `<div class="s2-page s2-essay">
      <button type="button" class="s2-back" id="s2-back-case">Back to the case</button>
      <section class="card">
        <p class="eyebrow">${esc(breadcrumb)}</p>
        <h1>${esc(isForum ? "Write your forum post" : `Answer question ${q + 1}`)}</h1>
        ${questionHtml}
        <details class="s2-read-case">
          <summary>Read the case again</summary>
          <div class="s2-case-again">
            <h2>${esc(cd.title)}</h2>
            <p>${esc(cd.company || cd.organisation || "")}</p>
            ${caseBody(cd)}
          </div>
        </details>
      </section>
      <section class="card s2-writing">
        <label for="s2-answer"><strong>${isForum ? "Your forum post" : "Your answer"}</strong></label>
        <textarea id="s2-answer" aria-describedby="s2-count" rows="${isForum ? 16 : 12}"
          placeholder="${isForum ? "Write your forum post here. Answer all the questions in 400 to 600 words." : "Write your answer here. A paragraph or two is a good starting point."}">${esc(draft(store, id))}</textarea>
        <p id="s2-count" class="s2-word-count"></p>
        ${feedbackButtons()}
      </section>
      <div id="s2-local" class="s2-local"></div>
      <div id="s2-results" class="s2-results"></div>
      <div id="s2-history"></div>
      <div id="s2-error"></div>
    </div>`;

    host.showScreen("s2-question", html, { s2: { v: "q", c, q } });
    a11yScroll();
    const root = document.getElementById("main");
    active = {
      root, c, q, id, textarea: root.querySelector("#s2-answer"),
      saved: storageWorks(), lastSaved: draft(store, id)
    };
    active.textarea.addEventListener("input", scheduleSave);
    active.textarea.addEventListener("blur", () => saveDraft(true));
    root.querySelector("#s2-back-case").addEventListener("click", () =>
      open({ v: "case", c })
    );
    root.querySelector("#s2-check-local").addEventListener("click", checkLocal);
    root.querySelectorAll(".s2-fb").forEach(b =>
      b.addEventListener("click", () => requestFeedback(b.dataset.provider))
    );
    root.querySelectorAll(".s2-settings-link").forEach(b =>
      b.addEventListener("click", () => host.openSettings())
    );
    root.querySelector("#s2-cancel").addEventListener("click", () => {
      if (running) running.controller.abort();
    });
    updateCount();
    refreshKeys();
    renderSavedFeedback();
  }

  function refreshKeys() {
    if (!active?.root?.isConnected) return;
    active.root.querySelectorAll(".s2-provider-group").forEach(group => {
      const id = group.dataset.provider, available = P().hasKey(id);
      const button = group.querySelector(".s2-fb");
      const settings = group.querySelector(".s2-settings-link");
      button.disabled = !available;
      button.setAttribute("aria-disabled", String(!!running || !available));
      button.setAttribute("aria-busy", String(!!running));
      button.title = available
        ? `Ask ${providerName(id)} to review your answer.`
        : `Add your ${providerName(id)} API key in Settings to enable feedback.`;
      settings.hidden = available;
      group.classList.toggle("s2-no-key", !available);
    });
  }

  function preparedAnswer() {
    if (!active) return null;
    const answer = active.textarea.value.trim(), n = words(answer);
    const minimum = active.c === 2 ? 120 : 20;
    const notice = active.root.querySelector("#s2-notice");
    if (n < minimum) {
      notice.textContent = active.c === 2
        ? `Your forum post has ${n} words. Please write at least 120 words before checking it. The final target is 400 to 600 words.`
        : `Your answer has ${n} words. Please write at least 20 words so the feedback can respond to your reasoning.`;
      return null;
    }
    notice.textContent = active.c === 2 && n < 350
      ? `This is a partial draft of ${n} words. The feedback may identify missing points because you have not finished your post yet.`
      : "";
    saveDraft(true);
    return { answer, n };
  }

  function checkLocal() {
    const prepared = preparedAnswer();
    if (!prepared) return;
    const cd = caseData(active.c);
    let html;
    try {
      if (active.c === 1) {
        const contract = cd.contracts?.[active.q] || {
          asks: [{ text: cd.questions[active.q], kind: "prose", options: [] }],
          contradictions: [], taskType: "multi_requirement"
        };
        const point = cd.questionPoints?.[active.q] || { heading: "", lookFor: [] };
        const analysis = L().analyseLocally(prepared.answer, contract);
        html = L().renderLocalReview(analysis, point.lookFor || [], point.heading || "", contract);
      } else {
        html = L().forumLocalReview(prepared.answer, cd);
      }
    } catch (_) {
      active.root.querySelector("#s2-notice").textContent =
        "The local check could not finish. Your answer is still here, and you can try again.";
      return;
    }
    active.root.querySelector("#s2-local").innerHTML =
      `<section class="card"><h2>Local check</h2>${html}</section>`;
    const store = readStore();
    store.local[active.id] = Date.now();
    writeStore(store);
    announce("Your local check is ready below the writing box.");
  }

  const statusLabels = {
    addressed: ["✓", "Addressed"], partial: ["◐", "Partly addressed"],
    missing: ["!", "Not clearly addressed"], unclear: ["?", "Unclear"]
  };
  const judgementLabels = {
    supported: ["✓", "Supported by the case"],
    defensible: ["✓", "Defensible reasoning"],
    defensible_but_under_supported: ["!", "Defensible but needs more support"],
    contradicted_by_case: ["!", "Contradicted by the case"],
    weak_causal_connection: ["!", "Cause and effect not yet explained"],
    unsupported_assumption: ["!", "Assumption not yet supported"],
    outside_question: ["!", "Outside the question"],
    unclear: ["?", "Unclear"]
  };

  function chip(key, labels) {
    const [symbol, label] = labels[key] || ["?", "Unclear"];
    return `<span class="s2-chip s2-chip-${esc(key)}"><span aria-hidden="true">${symbol}</span> ${esc(label)}</span>`;
  }

  function quoteHtml(text) {
    return text ? `<blockquote class="s2-quote">${esc(text)}</blockquote>` : "";
  }

  function listHtml(items) {
    return safeArray(items).length
      ? `<ul>${items.map(item => `<li>${esc(item)}</li>`).join("")}</ul>` : "";
  }

  function renderReview(result) {
    const review = result?.review || {};
    const label = result?.label || providerName(result?.provider);
    const requirements = safeArray(review.requirements).map(r => `
      <li class="s2-review-item">
        <p><strong>${esc(r.text)}</strong></p>
        ${chip(r.status, statusLabels)}
        ${quoteHtml(r.studentQuote)}
        ${r.comment ? `<p>${esc(r.comment)}</p>` : ""}
      </li>`).join("");
    const claims = safeArray(review.claims).map(claim => `
      <li class="s2-review-item">
        ${chip(claim.judgement, judgementLabels)}
        ${quoteHtml(claim.studentQuote)}
        ${claim.explanation ? `<p>${esc(claim.explanation)}</p>` : ""}
        ${safeArray(claim.evidence).length ? `<ul class="s2-evidence-list">
          ${claim.evidence.map(e => `<li><strong>${esc(e.id)}:</strong> ${esc(e.text)}</li>`).join("")}
        </ul>` : ""}
      </li>`).join("");

    return `<article class="card s2-review">
      <h2>Feedback from ${esc(label)}</h2>
      <p class="s2-review-meta">Model: ${esc(result?.model || "Not recorded")}${result?.savedEarlier ? " - saved earlier" : ""}${result?.at ? ` - ${esc(dateText(result.at))}` : ""}</p>
      <p class="s2-caution">Formative feedback, not a mark. AI can make mistakes: check its comments against the case.</p>
      <section class="s2-review-section">
        <h3>Your position</h3>
        <p>${esc(review.position?.summary || "The AI did not clearly summarise your position.")}</p>
        ${quoteHtml(review.position?.studentQuote)}
      </section>
      ${safeArray(review.strengths).length ? `<section class="s2-review-section">
        <h3>What you did well</h3>${listHtml(review.strengths)}
      </section>` : ""}
      <section class="s2-review-section">
        <h3>Question parts</h3>
        <ul class="s2-review-list">${requirements}</ul>
      </section>
      <section class="s2-review-section">
        <h3>Reasoning and the case</h3>
        ${claims ? `<ul class="s2-review-list">${claims}</ul>` :
          `<p>The AI did not identify a specific claim that it could check against the case.</p>`}
      </section>
      ${safeArray(review.gaps).length ? `<section class="s2-review-section">
        <h3>Where to improve</h3>${listHtml(review.gaps)}
      </section>` : ""}
      <section class="s2-review-section">
        <h3>Trade-off</h3>
        <p>${esc(review.tradeoff?.comment || (review.tradeoff?.identified
          ? "The AI identified a trade-off in your answer."
          : "The AI did not identify a clear trade-off in your answer."))}</p>
      </section>
      <section class="s2-review-section">
        <h3>Another view</h3>
        <p>${esc(review.alternativeView?.comment || (review.alternativeView?.credible
          ? "The AI identified another defensible view."
          : "The AI did not identify another defensible view from the case."))}</p>
      </section>
      <section class="s2-next-step">
        <h3>One next step</h3>
        <p>${esc(review.nextStep || "Read the question again and connect your main conclusion to a specific fact from the case.")}</p>
      </section>
    </article>`;
  }

  function renderSavedFeedback() {
    if (!active) return;
    const fresh = safeArray(active.fresh), freshAt = new Set(fresh.map(r => r.at));
    const all = historyFor(readStore(), active.id)
      .filter(r => !freshAt.has(r.at))
      .map(r => ({ ...r, savedEarlier: true }))
      .concat(fresh)
      .sort((a, b) => (Number(b.at) || 0) - (Number(a.at) || 0));
    const latest = new Map(), earlier = [];
    all.forEach(item => {
      if (!latest.has(item.provider)) latest.set(item.provider, item);
      else earlier.push(item);
    });
    active.root.querySelector("#s2-results").innerHTML =
      [...latest.values()].map(item => renderReview(item)).join("");
    active.root.querySelector("#s2-history").innerHTML = earlier.length
      ? `<details class="s2-history card">
          <summary>Earlier feedback (${earlier.length})</summary>
          <div class="s2-history-items">${earlier.map(item =>
            renderReview(item)).join("")}</div>
        </details>` : "";
  }

  function storeResult(id, result, n) {
    const store = readStore();
    const entries = historyFor(store, id);
    entries.push({
      provider: result.provider, label: result.label, model: result.model,
      at: result.at, words: n, review: result.review
    });
    store.history[id] = entries.slice(-5);
    return writeStore(store);
  }

  function showError(err, provider, prepared) {
    if (!active) return;
    const other = otherProvider(provider);
    const offer = P().ERROR_CODES_FOR_OFFER.includes(err?.code);
    const alternative = offer
      ? P().hasKey(other)
        ? `<button type="button" class="s2-try-other" data-provider="${other}">Try ${providerName(other)} instead</button>`
        : `<button type="button" class="s2-settings-link" data-provider="${other}">Add a ${providerName(other)} key in Settings</button>`
      : "";
    const panel = active.root.querySelector("#s2-error");
    panel.innerHTML = `<section class="card s2-error-card" role="alert">
      <h2>The feedback request could not finish</h2>
      <p>${esc(P().friendlyError(err, provider))}</p>
      <div class="s2-actions">
        <button type="button" class="s2-retry" data-provider="${provider}">Try ${providerName(provider)} again</button>
        ${alternative}
      </div>
    </section>`;
    panel.querySelector(".s2-retry")?.addEventListener("click", () => requestFeedback(provider));
    panel.querySelector(".s2-try-other")?.addEventListener("click", () => requestFeedback(other));
    panel.querySelector(".s2-settings-link")?.addEventListener("click", () => host.openSettings());
  }

  async function requestFeedback(provider) {
    if (!active || running || !["gemini", "groq"].includes(provider)) return;
    if (!P().hasKey(provider)) {
      host.openSettings();
      return;
    }
    const prepared = preparedAnswer();
    if (!prepared) return;
    try {
      prepared.payload = P().buildPayload(data(), active.c === 1 ? "class" : "forum", active.q, prepared.answer);
    } catch (_) {
      announce("The feedback request could not be prepared for this question. Your answer is still here, and the local check still works.");
      return;
    }
    const root = active.root, id = active.id;
    const controller = new AbortController();
    running = { controller, provider, id };
    root.querySelector("#s2-error").innerHTML = "";
    root.querySelector("#s2-request-status").textContent =
      `Asking ${providerName(provider)}... this can take up to a minute.`;
    root.querySelector("#s2-cancel").hidden = false;
    root.querySelector(".s2-writing")?.setAttribute("aria-busy", "true");
    refreshKeys();

    try {
      const result = await P().review(provider, prepared.payload, { signal: controller.signal });
      if (active?.root !== root || active.id !== id) return;
      active.fresh = safeArray(active.fresh).concat(result);
      const saved = storeResult(id, result, prepared.n);
      renderSavedFeedback();
      announce(saved
        ? `Feedback from ${providerName(provider)} is ready below.`
        : `Feedback from ${providerName(provider)} is ready below. It could not be saved because your browser blocks storage, so please copy anything you want to keep.`);
    } catch (err) {
      if (active?.root !== root || active.id !== id) return;
      if (controller.signal.aborted) {
        root.querySelector("#s2-notice").textContent =
          "The feedback request was cancelled. Your essay and local check are still available.";
      } else {
        showError(err, provider, prepared);
      }
    } finally {
      if (running?.controller === controller) running = null;
      if (root.isConnected) {
        const cancel = root.querySelector("#s2-cancel");
        const hadFocus = document.activeElement === cancel;
        root.querySelector("#s2-request-status").textContent = "";
        cancel.hidden = true;
        if (hadFocus) root.querySelector(`.s2-fb[data-provider="${provider}"]`)?.focus();
        root.querySelector(".s2-writing")?.removeAttribute("aria-busy");
      }
      refreshKeys();
    }
  }

  function open(route, options = {}) {
    if (!host || !data()) return;
    const c = Number(route?.c) === 2 ? 2 : 1;
    const v = route?.v === "q" ? "q" : "case";
    const q = c === 2 ? 0 : Number(route?.q ?? 0);
    if (v === "q" && c === 1 && (!Number.isInteger(q) || q < 0 ||
      q >= safeArray(caseData(1)?.questions).length)) return;

    if (running) {
      running.controller.abort();
      running = null;
    }
    flushDraft();
    clearTimeout(timer);
    timer = null;
    active = null;

    if (v === "case") showCase(c);
    else showEssay(c, q);
  }

  Object.assign(S2, {
    init, homeCard, bindHome, open, refreshKeys, progress,
    reportText, reportCard, bindReport, renderReview
  });

  window.S2 = Object.freeze(S2);
})();
