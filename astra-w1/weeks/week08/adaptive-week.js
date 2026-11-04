// W08-adaptive-week
//
// OPER621 Business Process Management
// Week 8 - The Understand Phase
// Framework phase: establish a trustworthy picture of the current process.
//
// Adaptive layer: course learning outcomes (CLOs), Week 8 learning
// outcomes, sections, mastery rules and remedial micro-lessons.
// The question bank is in bank.js. The complete remedial narration
// is stored inside the matching COURSE lesson sections.
//
// LOAD ORDER: diagrams.js, course.js, adaptive-week.js, bank.js, moments.js
//
// CLO MAPPING
// S1 - Design a framework for BPM and explain and assess related phases.
// K3 - Assess the importance of change management in relation to BPM.
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
      S1: {
        name: "S1",
        full:
          "Design a framework for BPM and explain and assess related " +
          "phases in the context of a regional company"
      },
      K3: {
        name: "K3",
        full:
          "Assess the importance of change management in relation to BPM " +
          "and devise solutions to minimize employees' resistance"
      }
    },

    // ========================================================
    // WEEK 8 LEARNING OUTCOMES
    // ========================================================

    outcomes: {
      O1: {
        clo: "S1",
        name: "Model the current process",
        full:
          "Model an as-is process and establish an agreed baseline " +
          "of its performance"
      },
      O2: {
        clo: "S1",
        name: "Reconcile performance measurements",
        full:
          "Evaluate conflicting measurements of the same process and " +
          "determine which to trust"
      },
      O3: {
        clo: "K3",
        name: "Assess resistance to measurement",
        full:
          "Assess the resistance encountered when current performance " +
          "is made visible"
      }
    },

    // ========================================================
    // SECTION MAPPING (keys match section.sec in course.js and bank.js)
    // ========================================================

    sections: {
      W8O1a: { lo: "O1", lesson: "l1", name: "Understand before you improve" },
      W8O1b: { lo: "O1", lesson: "l1", name: "The process nobody wrote down" },
      W8O1c: { lo: "O1", lesson: "l1", name: "Finding evidence that people can trust" },
      W8O2a: { lo: "O2", lesson: "l2", name: "Whose clock are we using?" },
      W8O2b: { lo: "O2", lesson: "l2", name: "When the story and the data disagree" },
      W8O2c: { lo: "O2", lesson: "l2", name: "Twenty-three minutes or eighty-two?" },
      W8O1d: { lo: "O1", lesson: "l3", name: "Waiting is not working" },
      W8O1e: { lo: "O1", lesson: "l3", name: "Symptoms, causes and necessary controls" },
      W8O2d: { lo: "O2", lesson: "l3", name: "The baseline that future results must beat" },
      W8O3a: { lo: "O3", lesson: "l4", name: "Why measuring a process feels threatening" },
      W8O3b: { lo: "O3", lesson: "l4", name: "Building a baseline people will accept" },
      W8O3c: { lo: "O3", lesson: "l4", name: "The decision, the forum and the next phase" }
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
      "Week 8 adaptive layer requires COURSE.lessons. " +
      "Load course.js before adaptive-week.js."
    );
  }

  const registered = new Set();

  course.lessons.forEach((lesson) => {

    if (!lesson || !Array.isArray(lesson.sections)) {
      throw new Error(
        "Invalid COURSE lesson structure in Week 8."
      );
    }

    lesson.sections.forEach((section) => {

      if (!section || typeof section.sec !== "string") {
        throw new Error(
          "Every Week 8 COURSE section must have a sec identifier."
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
          "Duplicate Week 8 section identifier: " + sec
        );
      }

      registered.add(sec);

      if (
        !Array.isArray(section.review) ||
        section.review.length !== 2
      ) {
        throw new Error(
          "Week 8 section " + sec +
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
  // VERIFY COMPLETE Week 8 COVERAGE
  // ==========================================================

  const expectedSections = Object.keys(A.sections);

  expectedSections.forEach((sec) => {

    if (!registered.has(sec)) {
      throw new Error(
        "Week 8 COURSE is missing required section: " + sec
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