(() => {
  "use strict";
 
  const M = {};
  const COURSE = window.COURSE;
  const ADAPTIVE = window.ADAPTIVE;
 
  const validTypes = new Set([
    "title",
    "item",
    "question",
    "formula",
    "issue",
    "compare",
    "statement",
    "diagram"
  ]);
 
  function build(lines) {
    if (!Array.isArray(lines)) return [];
 
    const result = [];
 
    lines.forEach((line, at) => {
      if (!Array.isArray(line) || line.length < 2) return;
 
      const raw = line[1];
 
      if (raw == null) return;
 
      const moments = Array.isArray(raw) ? raw : [raw];
 
      moments.forEach(moment => {
        if (!moment || typeof moment !== "object") return;
 
        const copy = Object.assign({}, moment);
 
        copy.at = at;
 
        if (!validTypes.has(copy.type)) {
          copy.type = "statement";
          copy.text = String(
            copy.text ||
            copy.title ||
            copy.note ||
            ""
          );
        }
 
        result.push(copy);
      });
    });
 
    return result;
  }
 
  function register(key, lines) {
    M[key] = build(lines);
  }
 
  if (COURSE && Array.isArray(COURSE.lessons)) {
    COURSE.lessons.forEach(lesson => {
      if (!lesson || !Array.isArray(lesson.sections)) return;
 
      lesson.sections.forEach((section, index) => {
        register(
          `${lesson.id}:${index}`,
          section?.lines
        );
      });
    });
  }
 
  if (
    ADAPTIVE &&
    ADAPTIVE.review &&
    typeof ADAPTIVE.review === "object"
  ) {
    Object.entries(ADAPTIVE.review).forEach(
      ([sectionId, reviews]) => {
        if (!Array.isArray(reviews)) return;
 
        reviews.forEach((review, index) => {
          register(
            `review:${sectionId}:${index}`,
            review?.lines
          );
        });
      }
    );
  }
 
  /*
   * Week 10 cinematic metadata.
   *
   * The normal semantic moments remain the
   * authoritative visuals for all four looks.
   *
   * Cinematic enhancements are optional.
   * No moment is removed or replaced.
   * Narration indices remain unchanged.
   */
 
  const WEEK10 = /^W10O[123][a-e]$/;
 
  const cinematicHints = Object.freeze({
    W10O1a: "process-build",
    W10O1b: "readiness-build",
    W10O1c: "raci-flow",
    W10O2a: "authority-simulation",
    W10O2b: "measure-comparison",
    W10O2c: "role-repair",
    W10O2d: "role-repair",
    W10O3a: "attendance-readiness",
    W10O3b: "adoption-curve",
    W10O3c: "knowledge-transfer",
    W10O3d: "qasr-decision",
    W10O3e: "handover"
  });
 
  const sceneTypes = Object.freeze({
    title: "kinetic-title",
    item: "progressive-item",
    question: "focus-question",
    formula: "formula-build",
    issue: "problem-reveal",
    compare: "comparison-build",
    statement: "key-takeaway",
    diagram: "diagram-build"
  });
 
  const CINEMATIC_MOMENTS = {};
 
  function describeMoment(moment, sectionId) {
    const type = moment.type;
 
    const description = {
      at: moment.at,
      type,
      animation: sceneTypes[type] || "progressive-reveal",
      duration: type === "diagram" ? 3.5 : 1.1,
      reducedMotion: "final-state",
      optional: true
    };
 
    if (type === "diagram") {
      description.diagram = {
        build: "node-by-node",
        connectors: "stroke-draw",
        focus: "progressive",
        token: "when-applicable",
        finalState: "complete"
      };
    }
 
    if (type === "compare") {
      description.compare = {
        side: moment.side || "a",
        entrance:
          moment.side === "b"
            ? "from-right"
            : "from-left",
        finalState: "visible"
      };
    }
 
    if (type === "issue") {
      description.issue = {
        entrance: "stack",
        emphasis: "problem",
        finalState: "visible"
      };
    }
 
    if (type === "formula") {
      description.formula = {
        numerator: "reveal",
        denominator: "reveal",
        fractionBar: "scale-x",
        finalState: "complete"
      };
    }
 
    if (type === "title" || type === "statement") {
      description.typography = {
        key: moment.key || null,
        entrance: "kinetic",
        finalState: "visible"
      };
    }
 
    if (sectionId === "W10O2a") {
      description.case = "aed400-authority";
    }
 
    if (sectionId === "W10O3b") {
      description.case = "adoption";
    }
 
    if (sectionId === "W10O3d") {
      description.case = "qasr-eleven-week";
    }
 
    return description;
  }
 
  if (COURSE && Array.isArray(COURSE.lessons)) {
    COURSE.lessons.forEach(lesson => {
      if (!lesson || !Array.isArray(lesson.sections)) return;
 
      lesson.sections.forEach((section, index) => {
        const sectionId = String(section?.sec || "");
 
        if (!WEEK10.test(sectionId)) return;
 
        const key = `${lesson.id}:${index}`;
        const moments = M[key] || [];
 
        CINEMATIC_MOMENTS[key] = {
          sectionId,
          lessonId: lesson.id,
          sectionIndex: index,
          effect: cinematicHints[sectionId] || "progressive-build",
          moments: moments.map(moment =>
            describeMoment(moment, sectionId)
          )
        };
 
        if (Array.isArray(section.review)) {
          section.review.forEach((review, reviewIndex) => {
            const reviewKey =
              `review:${sectionId}:${reviewIndex}`;
 
            if (!M[reviewKey]) {
              register(reviewKey, review?.lines);
            }
 
            CINEMATIC_MOMENTS[reviewKey] = {
              sectionId,
              lessonId: lesson.id,
              reviewIndex,
              effect: "remedial-progressive-build",
              moments: (M[reviewKey] || []).map(moment =>
                describeMoment(moment, sectionId)
              )
            };
          });
        }
      });
    });
  }
 
  /*
   * Preserve the standard VoiceLearn interface.
   *
   * MOMENTS contains only semantic moments.
   * Optional cinematic descriptors are separate.
   *
   * No GSAP timelines are created here.
   * The selected look remains responsible for
   * animation and deterministic seeking.
   */
 
  window.MOMENTS = M;
  window.WEEK10_CINEMATIC_MOMENTS = CINEMATIC_MOMENTS;
 
})();
