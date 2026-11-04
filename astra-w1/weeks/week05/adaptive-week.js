// W05-adaptive-week
//
// OPER621 Business Process Management
// Week 5 - Organization Strategy
// Framework phase: understand the strategy before improving any process.
//
// Adaptive layer: course learning outcomes (CLOs), Week 5 learning
// outcomes, sections, mastery rules and remedial micro-lessons.
// The question bank is in bank.js. The complete remedial narration
// is stored inside the matching COURSE lesson sections.
//
// LOAD ORDER: diagrams.js, course.js, adaptive-week.js, bank.js, moments.js
//
// CLO MAPPING
// K2 - Evaluate factors that impact the successful implementation of BPM.
// S1 - Design a framework for BPM and explain and assess related phases.
//
// OUTCOMES: O1, O2, O3 (see course.js header). Remediation: two variants
// per section; round 1 uses variant 0, round 2 variant 1, then alternate.
// MASTERY: target 80%, window 5, minimum evidence 3.
//
// ============================================================

(() => {
  "use strict";

  const D = window.DIAG;

  const {
    t,
    it,
    q,
    st,
    iss,
    cmp,
    dg
  } = window.MOMENT_KIT;

  const A = {

    // ========================================================
    // MASTERY CONFIGURATION
    // ========================================================

    target: 0.8,

    window: 5,

    minEvidence: 3,

    firstCheck: 4,

    firstCheckPerSection: 3,

    perWeak: 3,
    // ========================================================
    // COURSE LEARNING OUTCOMES
    // ========================================================

    clos: {
      K2: {
        name: "K2",
        full:
          "Evaluate various factors that impact on the successful " +
          "implementation of BPM in public and private sector organizations"
      },
      S1: {
        name: "S1",
        full:
          "Design a framework for BPM and explain and assess related " +
          "phases in the context of a regional company"
      }
    },

    // ========================================================
    // WEEK 5 LEARNING OUTCOMES
    // ========================================================

    outcomes: {
      O1: {
        clo: "K2",
        name: "Explain the Organization Strategy phase",
        full:
          "Explain the purpose of the Organization Strategy phase " +
          "within the BPM framework"
      },
      O2: {
        clo: "S1",
        name: "Link strategic intent to process choices",
        full:
          "Analyse how strategic intent constrains which processes " +
          "should be improved"
      },
      O3: {
        clo: "K2",
        name: "Assess the risk of misaligned efficiency",
        full:
          "Assess the risk of pursuing efficiency in directions that " +
          "conflict with strategy"
      }
    },

    // ========================================================
    // SECTION MAPPING (keys match section.sec in course.js and bank.js)
    // ========================================================

    sections: {
      W5O1a: { lo: "O1", lesson: "l1", name: "Why the framework begins with strategy" },
      W5O1b: { lo: "O1", lesson: "l1", name: "From strategic intent to process measures" },
      W5O1c: { lo: "O2", lesson: "l1", name: "Making strategic objectives usable" },
      W5O2a: { lo: "O2", lesson: "l2", name: "Tracing proposals to strategic objectives" },
      W5O2b: { lo: "O2", lesson: "l2", name: "Qasr's three strategies and four proposals" },
      W5O2c: { lo: "O3", lesson: "l2", name: "Making a defensible funding decision" },
      W5O3a: { lo: "O3", lesson: "l3", name: "Efficiency without strategic alignment" },
      W5O3b: { lo: "O3", lesson: "l3", name: "Competing objectives and explicit trade-offs" },
      W5O3c: { lo: "O3", lesson: "l3", name: "Sponsors, decision rights and strategic scope" },
      W5O4a: { lo: "O1", lesson: "l4", name: "Deliverables and acceptance criteria" },
      W5O4b: { lo: "O1", lesson: "l4", name: "Benefits, baselines, targets and accountability" },
      W5O4c: { lo: "O2", lesson: "l4", name: "Strategic discipline and forum preparation" }
    },

    // ========================================================
    // REMEDIAL MICRO-LESSONS
    //
    // Registered below from COURSE.lessons.
    //
    // Every section contains exactly two remedial variants.
    // Each variant retains its original title and lines.
    //
    // No remedial narration is duplicated in this file.
    //
    // ========================================================

    review: {}

  };

  // ==========================================================
  // REGISTER REMEDIAL LESSONS FROM COURSE
  // ==========================================================

  const course = window.COURSE;

  if (
    !course ||
    !Array.isArray(course.lessons)
  ) {
    throw new Error(
      "Week 5 adaptive layer requires COURSE.lessons. " +
      "Load course.js before adaptive-week.js."
    );
  }

  const registered = new Set();

  course.lessons.forEach((lesson) => {

    if (!lesson || !Array.isArray(lesson.sections)) {
      throw new Error(
        "Invalid COURSE lesson structure in Week 5."
      );
    }

    lesson.sections.forEach((section) => {

      if (!section || typeof section.sec !== "string") {
        throw new Error(
          "Every Week 5 COURSE section must have a sec identifier."
        );
      }

      const sec = section.sec;

      const mapping = A.sections[sec];

      if (!mapping) {
        throw new Error(
          "Missing ADAPTIVE.sections mapping for " + sec
        );
      }

      if (mapping.lesson !== lesson.id) {
        throw new Error(
          "Lesson mismatch for " + sec +
          ": expected " + mapping.lesson +
          ", found " + lesson.id
        );
      }

      if (registered.has(sec)) {
        throw new Error(
          "Duplicate Week 5 section identifier: " + sec
        );
      }

      registered.add(sec);

      if (
        !Array.isArray(section.review) ||
        section.review.length !== 2
      ) {
        throw new Error(
          "Week 5 section " + sec +
          " must contain exactly two remedial micro-lessons."
        );
      }

      section.review.forEach((remedial, index) => {

        if (
          !remedial ||
          typeof remedial.title !== "string" ||
          !remedial.title.trim()
        ) {
          throw new Error(
            "Missing remedial title for " +
            sec + " variant " + index
          );
        }

        if (
          !Array.isArray(remedial.lines) ||
          remedial.lines.length === 0
        ) {
          throw new Error(
            "Missing remedial narration for " +
            sec + " variant " + index
          );
        }

        remedial.lines.forEach((line, lineIndex) => {

          if (
            !Array.isArray(line) ||
            line.length !== 2 ||
            typeof line[0] !== "string" ||
            !line[0].trim()
          ) {
            throw new Error(
              "Invalid [sentence, moment] pair in " +
              sec +
              " variant " + index +
              " line " + lineIndex
            );
          }

        });

        // Keep the Week 1 plain-text script convention.
        // This is derived from the existing narration and
        // does not alter or duplicate the remedial content.

        if (typeof remedial.script !== "string") {
          remedial.script = remedial.lines
            .map((line) => line[0])
            .join(" ");
        }

      });

      // Preserve the original remedial objects.
      // MOMENTS reads their [sentence, moment] pairs.
      // The adaptive player reads the same review array.

      A.review[sec] = section.review;

    });

  });

  // ==========================================================
  // VERIFY COMPLETE Week 5 COVERAGE
  // ==========================================================

  const expectedSections = Object.keys(A.sections);

  expectedSections.forEach((sec) => {

    if (!registered.has(sec)) {
      throw new Error(
        "Week 5 COURSE is missing required section: " + sec
      );
    }

    const mapping = A.sections[sec];

    if (!A.outcomes[mapping.lo]) {
      throw new Error(
        "Unknown learning outcome " +
        mapping.lo + " for section " + sec
      );
    }

    const outcome = A.outcomes[mapping.lo];

    if (!A.clos[outcome.clo]) {
      throw new Error(
        "Unknown CLO " +
        outcome.clo + " for section " + sec
      );
    }

    if (
      !Array.isArray(A.review[sec]) ||
      A.review[sec].length !== 2
    ) {
      throw new Error(
        "Incomplete remedial registration for " + sec
      );
    }

  });

  // ==========================================================
  // EXPOSE THE ADAPTIVE CONFIGURATION
  //
  // bank.js assigns its question bank to ADAPTIVE.bank.
  // moments.js builds its visual moments from ADAPTIVE.review.
  //
  // ==========================================================

  window.ADAPTIVE = A;

})();
// END-BLOCK