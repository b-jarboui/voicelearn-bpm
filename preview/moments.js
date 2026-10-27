// Lesson visuals as semantic "moments" (the standard format for every course).
// Built from the [sentence, moment] pairs in course.js and adaptive.js, so every narration sentence has its own moment.
// `at` = index of the sentence that reveals the moment. Types: title, item, question, formula, issue, compare, statement, diagram.
(() => {
  const M = {};
  const build = (lines) => lines.flatMap(([, m], at) => [].concat(m).map((x) => Object.assign({ at }, x)));
  COURSE.lessons.forEach((l) => l.sections.forEach((s, i) => (M[`${l.id}:${i}`] = build(s.lines))));
  Object.entries(ADAPTIVE.review).forEach(([sec, vs]) => vs.forEach((r, v) => (M[`review:${sec}:${v}`] = build(r.lines))));
  window.MOMENTS = M;
})();
