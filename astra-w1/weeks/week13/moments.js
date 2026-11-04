// Lesson visuals as semantic "moments" (the standard format for every course).
// Built from the [sentence, moment] pairs in course.js and adaptive.js, so every narration sentence has its own moment.
// `at` = index of the sentence that reveals the moment. Types: title, item, question, formula, issue, compare, statement, diagram.
// Storytelling narration (27 Oct 2026): a sentence may carry null, which keeps the previous picture on screen,
// so a new moment appears every 1 to 3 sentences instead of on every sentence.
(() => {
  const M = {};
  const build = (lines) => lines.flatMap(([, m], at) => [].concat(m).filter(Boolean).map((x) => Object.assign({ at }, x)));
  COURSE.lessons.forEach((l) => l.sections.forEach((s, i) => (M[`${l.id}:${i}`] = build(s.lines))));
  Object.entries(ADAPTIVE.review).forEach(([sec, vs]) => vs.forEach((r, v) => (M[`review:${sec}:${v}`] = build(r.lines))));
  window.MOMENTS = M;
})();
