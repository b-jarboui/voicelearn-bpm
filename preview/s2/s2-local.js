/* Offline "Check locally" checker. Lines taken verbatim from the OPER621 learning-support app (analysis and rendering of the requirement check). */
(function(){
'use strict';
function esc(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function words(text = "") {
  return (String(text).trim().match(/\S+/g) || []).length;
}

function normalize(text = "") {
  return String(text)
    .toLowerCase()
    .replace(/[‐‑‒–—―−-]/g, " ")
    .replace(/[‘’]/g, "'")
    .replace(/[^a-z0-9'%.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sentenceList(text = "") {
  return String(text)
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function clauseList(text = "") {
  return sentenceList(text)
    .flatMap((sentence) => sentence.split(
      /\s*[;—]\s*|\s+--\s+|,\s+(?=(?:while|whilst|whereas|but|however|although|though|yet)\b)|\s+(?=(?:while|whilst|whereas|however)\b)/i,
    ))
    .map((s) => s.trim())
    .filter(Boolean);
}

function clamp(text, max = 600) {
  const value = String(text || "").trim();
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

function setView(html) {
  app.innerHTML = html;
  app.scrollTop = 0;
  window.scrollTo(0, 0);
}

function header(title, subtitle = "", back = "") {
  return `<header class="top">
    ${back ? `<a class="back" href="${esc(back)}" aria-label="Back">&#8592;</a>` : ""}
    <div><h1>${esc(title)}</h1>${subtitle ? `<p class="sub">${esc(subtitle)}</p>` : ""}</div>
  </header>`;
}

function tableHtml(rows = []) {
  if (!Array.isArray(rows) || !rows.length) return "";
  const [head, ...body] = rows;
  return `<div class="scroll"><table>
    <thead><tr>${head.map((cell) => `<th>${esc(cell)}</th>`).join("")}</tr></thead>
    <tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
  </table></div>`;
}


const REJECTION_CUES = [
  "i would not", "i do not", "i don't", "not remove", "cannot remove", "can't remove",
  "must keep", "would keep", "keep the", "retain", "should stay", "must stay",
  "against", "reject", "do not choose", "should not", "not the right", "rather than",
  "instead of", "as opposed to", "is weaker", "is inferior", "is not viable",
  "fails to", "does not address", "would not deliver", "cannot deliver",
];

const SELECTION_CUES = [
  "i choose", "i would choose", "i recommend", "i would recommend", "i select",
  "i would select", "my recommendation is", "my choice is", "i would go with",
  "i would start with", "i would adopt", "i propose", "i would fund", "i would remove",
  "i would eliminate", "i suggest", "should dominate", "i support", "i would prioritise",
  "i would prioritize", "i would implement", "i would begin with", "we should choose",
];

const RISK_MARKERS = [
  "accepts the risk of", "accepts the risk that", "at the cost of", "the risk of",
  "the risk is", "the risk that", "risk of", "risk is", "risk that", "risks",
  "risking", "could lead to", "would lead to", "may lead to", "could cause",
  "would cause", "may cause", "resulting in", "leading to", "causing", "accepting",
  "the trade off is", "the tradeoff is", "because",
];

function aliasEntries(option) {
  return [option.name, ...(option.aliases || [])]
    .map((alias) => ({ raw: alias, normalized: normalize(alias) }))
    .filter((entry) => entry.normalized.length > 2)
    .sort((a, b) => b.normalized.length - a.normalized.length);
}

function optionMentions(clause, options) {
  const normalizedClause = normalize(clause);
  const mentions = [];
  options.forEach((option, optionIndex) => {
    for (const alias of aliasEntries(option)) {
      const index = normalizedClause.indexOf(alias.normalized);
      if (index !== -1) {
        mentions.push({ option, optionIndex, index, end: index + alias.normalized.length, alias: alias.raw });
        break;
      }
    }
  });
  return mentions.sort((a, b) => a.index - b.index);
}

function cuePositions(normalizedClause, cues) {
  return cues.flatMap((cue) => {
    const positions = [];
    let from = 0;
    while (from < normalizedClause.length) {
      const index = normalizedClause.indexOf(cue, from);
      if (index === -1) break;
      positions.push({ cue, index, end: index + cue.length });
      from = index + cue.length;
    }
    return positions;
  }).sort((a, b) => a.index - b.index);
}

function isLocallyNegated(normalizedClause, mention) {
  const before = normalizedClause.slice(Math.max(0, mention.index - 45), mention.index);
  return REJECTION_CUES.some((cue) => before.includes(cue));
}

function classifyClauseMentions(clause, options, taskType, expectedCount) {
  const normalizedClause = normalize(clause);
  const mentions = optionMentions(clause, options);
  if (!mentions.length) return [];
  const selectionCues = cuePositions(normalizedClause, SELECTION_CUES);
  const rejectionCues = cuePositions(normalizedClause, REJECTION_CUES);

  const result = mentions.map((mention) => ({ ...mention, clause, stance: "discussed" }));

  if (["mapping", "classification", "sequence", "ranking"].includes(taskType)) {
    result.forEach((item) => { item.stance = "addressed"; });
    return result;
  }

  for (const item of result) {
    if (isLocallyNegated(normalizedClause, item)) {
      item.stance = "rejected";
      continue;
    }
    const nearestReject = rejectionCues.filter((cue) => cue.index <= item.index).at(-1);
    const nearestSelect = selectionCues.filter((cue) => cue.index <= item.index).at(-1);
    if (nearestReject && (!nearestSelect || nearestReject.index > nearestSelect.index)) {
      item.stance = "rejected";
    }
  }

  // In removal questions, "Removing X" is a direct selection unless negated.
  if (taskType === "remove_with_risk") {
    result.forEach((item) => {
      const before = normalizedClause.slice(Math.max(0, item.index - 18), item.index);
      if (item.stance !== "rejected" && /(?:^|\s)(?:remove|removing|drop|dropping|eliminate|eliminating)\s*$/.test(before)) {
        item.stance = "selected";
      }
    });
  }

  // Apply explicit selection cues.
  for (const cue of selectionCues) {
    const after = result.filter((item) => item.index >= cue.end && item.stance !== "rejected");
    if (!after.length) continue;
    if (taskType === "remove_with_risk") {
      const limit = Number.isInteger(expectedCount) && expectedCount > 0 ? expectedCount : after.length;
      after.slice(0, limit).forEach((item) => { item.stance = "selected"; });
    } else {
      after[0].stance = "selected";
    }
  }

  // If a choice task names only one option in a short direct clause, treat it as an unclear choice.
  if (!result.some((item) => item.stance === "selected") && result.length === 1 && result[0].stance !== "rejected") {
    const direct = /^(?:choose|recommend|select|use|adopt|prioritise|prioritize|fund|implement|start with|begin with)\b/.test(normalizedClause);
    result[0].stance = direct ? "selected" : "unclear";
  }

  return result;
}

function extractAttachment(clause, mention) {
  const original = String(clause || "");
  const approximateStart = Math.max(0, (mention?.index || 0) - 6);
  let best = null;
  for (const marker of RISK_MARKERS) {
    const pattern = new RegExp(marker
      .split(/\s+/)
      .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("[\\s-]+"), "i");
    const match = pattern.exec(original.slice(approximateStart));
    if (!match) continue;
    const index = approximateStart + match.index;
    if (!best || index < best.index) best = { index, end: index + match[0].length };
  }
  if (!best) return "";
  const value = original.slice(best.end).trim().replace(/^[,:;\s-]+|[.;,\s]+$/g, "");
  return words(value) >= 2 ? value : "";
}

function extractRequestedDetail(clause, mention, taskType) {
  const text = String(clause || "");
  if (taskType === "classification") {
    const ruling = text.match(/\b(real|overstated|unproven|not\s+(?:a\s+)?benefit(?:\s+at\s+all)?)\b/i)?.[1] || "";
    const reason = extractAttachment(text, mention);
    if (ruling && reason) return `${ruling} — ${reason}`;
    return ruling || reason;
  }
  if (taskType === "mapping") {
    const relation = text.match(/\b(?:is|reflects|represents|comes\s+from|concerns|is\s+caused\s+by)\s+(.+?)(?=\s+because\b|[.;,]|$)/i)?.[1]?.trim() || "";
    return relation || extractAttachment(text, mention);
  }
  return extractAttachment(text, mention);
}

function findClosestSentence(answer, requirement) {
  const stop = new Set("a an the and or but if then than that this those these is are was were be been being to of in on at by for with from as it its not no nor so such into over under about between within without their there they them he she his her you your we our i which who whom whose what when where why how all any both each few more most other some only own same too very can will just should now also has have had do does did done would could may might must shall one two three because while".split(" "));
  const terms = normalize(requirement).split(" ").filter((term) => term.length > 3 && !stop.has(term));
  if (!terms.length) return "";
  let best = { sentence: "", score: 0 };
  for (const sentence of sentenceList(answer)) {
    const set = new Set(normalize(sentence).split(" "));
    const score = terms.reduce((total, term) => total + (set.has(term) ? 1 : 0), 0);
    if (score > best.score) best = { sentence, score };
  }
  return best.score >= 2 ? best.sentence : "";
}

function detectContradictions(answer, contract, options) {
  const clauses = clauseList(answer);
  const findings = [];
  for (const rule of contract.contradictions || []) {
    for (const clause of clauses) {
      const normalizedClause = normalize(clause);
      const optionMatches = !rule.option || options.some((option) => option.name === rule.option && optionMentions(clause, [option]).length);
      if (!optionMatches) continue;
      for (const trigger of rule.reasoning || []) {
        const normalizedTrigger = normalize(trigger);
        const index = normalizedClause.indexOf(normalizedTrigger);
        if (index === -1) continue;
        const before = normalizedClause.slice(Math.max(0, index - 32), index);
        if (/\b(?:not|never|no|cannot|can't|didn't|doesn't|isn't|wasn't|without)\b/.test(before)) continue;
        if (REJECTION_CUES.some((cue) => before.includes(cue))) continue;
        findings.push({ sentence: clause, conflict: rule.conflict, caseFact: rule.caseFact });
        break;
      }
    }
  }
  return findings;
}

function analyseLocally(answer, contract) {
  const asks = contract.asks || [];
  const clauses = clauseList(answer);
  const selectOptions = asks.flatMap((ask) => ask.kind === "select" ? (ask.options || []) : []);
  const taskType = contract.taskType || "multi_requirement";

  const results = asks.map((ask, askIndex) => {
    if (ask.kind !== "select" || !(ask.options || []).length) {
      return {
        ask,
        askIndex,
        evidence: findClosestSentence(answer, ask.text),
      };
    }

    const all = [];
    clauses.forEach((clause, clauseIndex) => {
      classifyClauseMentions(clause, ask.options, taskType, ask.count).forEach((item) => {
        all.push({ ...item, clauseIndex });
      });
    });

    if (contract.choiceNeeds) {
      for (const mention of all) {
        if (!["selected", "addressed", "unclear"].includes(mention.stance)) continue;
        mention.attachment = extractRequestedDetail(mention.clause, mention, taskType);
        if (!mention.attachment) {
          const nextClause = clauses[mention.clauseIndex + 1];
          if (nextClause && !optionMentions(nextClause, ask.options).length) {
            mention.attachment = extractRequestedDetail(nextClause, null, taskType);
            if (mention.attachment) mention.attachmentClause = nextClause;
          }
        }
      }
    }

    // Merge repeat mentions by option. Prefer a stronger stance, then a mention
    // that carries the requested attachment (risk, cause, ruling or reason).
    const priority = { selected: 5, rejected: 4, addressed: 3, unclear: 2, discussed: 1 };
    const byOption = new Map();
    for (const mention of all) {
      const existing = byOption.get(mention.option.name);
      if (existing && mention.attachment && !existing.attachment) {
        existing.attachment = mention.attachment;
        existing.attachmentClause = mention.clause;
      }
      const stronger = !existing || priority[mention.stance] > priority[existing.stance];
      const sameButRicher = existing && priority[mention.stance] === priority[existing.stance]
        && Boolean(mention.attachment) && !existing.attachment;
      if (stronger || sameButRicher) byOption.set(mention.option.name, mention);
    }

    const mentions = [...byOption.values()];
    if (mentions.some((item) => item.stance === "selected")) {
      mentions.forEach((item) => { if (item.stance === "unclear") item.stance = "discussed"; });
    }

    return {
      ask,
      askIndex,
      mentions,
      unmentioned: ask.options.filter((option) => !byOption.has(option.name)).map((option) => option.name),
    };
  });

  return {
    asks: results,
    conflicts: detectContradictions(answer, contract, selectOptions),
    taskType,
  };
}

function attachmentLabel(contract) {
  const need = normalize(contract.choiceNeeds || "");
  if (need.includes("risk")) return "Risk you stated";
  if (need.includes("underlying cause")) return "Cause you stated";
  if (need.includes("ruling")) return "Ruling/reason you stated";
  if (need.includes("reason")) return "Reason you stated";
  return "What you stated";
}

function renderSelectRequirement(result, contract) {
  const { ask, mentions = [], unmentioned = [] } = result;
  const taskType = contract.taskType || "multi_requirement";
  const selected = mentions.filter((item) => item.stance === "selected");
  const rejected = mentions.filter((item) => item.stance === "rejected");
  const addressed = mentions.filter((item) => item.stance === "addressed");
  const unclear = mentions.filter((item) => item.stance === "unclear");
  const discussed = mentions.filter((item) => item.stance === "discussed");

  let countMessage = "";
  if (Number.isInteger(ask.count)) {
    if (selected.length === ask.count) {
      countMessage = `<p class="ev-ok">✓ The app found exactly ${ask.count === 1 ? "one explicit choice" : `${ask.count} explicit choices`}.</p>`;
    } else {
      countMessage = `<p class="ev-none">The question asks for exactly ${ask.count}. The app found ${selected.length} explicit ${selected.length === 1 ? "choice" : "choices"}${unclear.length ? ` and ${unclear.length} unclear mention${unclear.length === 1 ? "" : "s"}` : ""}. This is a wording check, not a judgement.</p>`;
    }
  }

  const choiceRows = selected.map((item, index) => `<li class="ev selected-choice">
      <p class="ev-opt">${index + 1}. ${esc(item.option.name)} — your choice</p>
      <p class="ev-quote">“${esc(item.clause)}”</p>
      ${contract.choiceNeeds ? item.attachment
        ? `<p class="ev-risk"><span>${esc(attachmentLabel(contract))}</span>${esc(item.attachment)}</p>`
        : `<p class="ev-none">The app did not find ${esc(contract.choiceNeeds)} close to this choice. It may be phrased in a way the local checker cannot recognise.</p>` : ""}
    </li>`).join("");

  const addressedRows = addressed.map((item) => `<li class="ev">
      <p class="ev-opt">${esc(item.option.name)} — addressed</p>
      <p class="ev-quote">“${esc(item.clause)}”</p>
      ${contract.choiceNeeds ? item.attachment
        ? `<p class="ev-risk"><span>${esc(attachmentLabel(contract))}</span>${esc(item.attachment)}</p>`
        : `<p class="ev-none">This item is named, but the local checker could not reliably extract ${esc(contract.choiceNeeds)}.</p>` : ""}
    </li>`).join("");

  const rejectedRows = rejected.map((item) => `<li class="ev">
      <p class="ev-opt">${esc(item.option.name)} — discussed, not selected</p>
      <p class="ev-quote">“${esc(item.clause)}”</p>
    </li>`).join("");

  const unclearRows = unclear.map((item) => `<li class="ev">
      <p class="ev-opt">${esc(item.option.name)} — position unclear</p>
      <p class="ev-quote">“${esc(item.clause)}”</p>
      <p class="ev-note">State the choice directly if you intend this as your recommendation.</p>
    </li>`).join("");

  const discussedRows = discussed.map((item) => `<li class="ev">
      <p class="ev-opt">${esc(item.option.name)} — mentioned</p>
      <p class="ev-quote">“${esc(item.clause)}”</p>
    </li>`).join("");

  const missing = ask.count === null && unmentioned.length
    ? `<p class="ev-none">Not clearly addressed: ${unmentioned.map(esc).join("; ")}.</p>`
    : "";

  let taskHint = "";
  if (taskType === "mapping") taskHint = "Check whether each named item is connected to the correct cause.";
  if (taskType === "sequence") taskHint = "Check the order, especially the required second and last positions.";
  if (taskType === "classification") taskHint = "Check that every item has one permitted ruling and a case-based reason.";
  if (taskType === "ranking") taskHint = "Check that the phases are explicitly ranked by what had to be fixed first.";

  return `<li class="ask">
    <p class="ask-text">${esc(ask.text)}</p>
    ${countMessage}
    ${choiceRows || addressedRows ? `<ul class="evs">${choiceRows}${addressedRows}</ul>` : ""}
    ${rejectedRows || unclearRows || discussedRows ? `<details class="mention-details"><summary>Other options mentioned</summary><ul class="evs">${rejectedRows}${unclearRows}${discussedRows}</ul></details>` : ""}
    ${missing}
    ${taskHint ? `<p class="ev-next"><span>Next check</span> ${esc(taskHint)}</p>` : ""}
  </li>`;
}

function renderLocalReview(analysis, teachingPoints, heading, contract) {
  const requirements = analysis.asks.map((result) => {
    if (result.ask.kind === "select") return renderSelectRequirement(result, contract);
    return `<li class="ask">
      <p class="ask-text">${esc(result.ask.text)}</p>
      ${result.evidence
        ? `<p class="ev-opt">Possible evidence in your answer</p><p class="ev-quote">“${esc(result.evidence)}”</p><p class="ev-note">This is a text match only. Read it yourself to decide whether it genuinely answers the requirement.</p>`
        : `<p class="ev-none">The local checker did not find a clear sentence for this requirement. It may be missing or phrased differently.</p>`}
    </li>`;
  }).join("");

  const conflicts = analysis.conflicts.length ? `<h2 class="h">Possible conflicts with the case</h2>
    <ul class="fbs">${analysis.conflicts.map((item) => `<li class="fb conflict">
      <p class="ev-quote">“${esc(item.sentence)}”</p>
      <p class="crit">${esc(item.conflict)}</p>
      <p class="because"><span>Case evidence</span> ${esc(item.caseFact)}</p>
    </li>`).join("")}</ul>
    <p class="meta">These are pattern-based warnings. Negation and nuanced arguments can still be misread.</p>` : "";

  const teaching = teachingPoints.length ? `<h2 class="h">What the week teaches on this question</h2>
    <p class="meta">${heading ? `From the section “${esc(heading)}”.` : ""}</p>
    <ul class="fbs">${teachingPoints.map((point) => `<li class="fb teach">
      <p class="crit">${esc(point.claim)}.</p>
      ${point.because ? `<p class="because"><span>Why</span> ${esc(point.because)}</p>` : ""}
    </li>`).join("")}</ul>` : "";

  return `<h2 class="h">What this question asks for</h2>
    <div class="explain no">
      <p class="verdict">Your answer, read against the question</p>
      <p>The local checker finds choices, requirements and possible case conflicts. It does not decide whether your reasoning is correct, and it gives no mark.</p>
    </div>
    <ul class="asks">${requirements}</ul>
    ${contract.nextCheck ? `<p class="ev-next"><span>Reasoning question</span> ${esc(contract.nextCheck)}</p>` : ""}
    ${conflicts}
    ${teaching}
    <p class="meta">No mark has been given, here or anywhere in this app.</p>`;
}

function forumLocalReview(answer, forumCase) {
  const questionCards = forumCase.questions.map((question, index) => {
    const sentence = findClosestSentence(answer, question);
    return `<li class="ask">
      <p class="ask-text">Q${index + 1}. ${esc(question)}</p>
      ${sentence ? `<p class="ev-opt">Closest sentence in your post</p><p class="ev-quote">“${esc(sentence)}”</p><p class="ev-note">This is a text match only, not a judgement of the reasoning.</p>` : `<p class="ev-none">No clear sentence was found for this question.</p>`}
    </li>`;
  }).join("");

  const teaching = (forumCase.lookFor || []).map((point) => {
    const sentence = findClosestSentence(answer, `${point.claim} ${point.because || ""}`);
    return `<li class="fb teach"><p class="crit">${esc(point.claim)}.</p>
      ${point.because ? `<p class="because"><span>Why</span> ${esc(point.because)}</p>` : ""}
      ${sentence ? `<p class="ev-opt">Closest sentence in your post</p><p class="ev-quote">“${esc(sentence)}”</p>` : `<p class="ev-none">No close sentence found.</p>`}
    </li>`;
  }).join("");

  return `<h2 class="h">Your post against each question</h2>
    <div class="explain no"><p class="verdict">Requirements review</p><p>The local checker finds possible matching sentences. It cannot determine whether the argument is correct.</p></div>
    <ul class="asks">${questionCards}</ul>
    <h2 class="h">What a strong post contains</h2>
    <ul class="fbs">${teaching}</ul>
    ${forumCase.pushFurther?.length ? `<h2 class="h">Push it further</h2><ul class="push">${forumCase.pushFurther.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>` : ""}
    <p class="meta">No mark has been given.</p>`;
}
window.S2Local={esc:esc,words:words,clamp:clamp,tableHtml:tableHtml,analyseLocally:analyseLocally,renderLocalReview:renderLocalReview,forumLocalReview:forumLocalReview,findClosestSentence:findClosestSentence};
})();
