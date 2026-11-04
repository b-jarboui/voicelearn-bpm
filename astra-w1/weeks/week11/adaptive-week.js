// W11-adaptive-week
//
// OPER621 Business Process Management
// Week 11 - The Develop Phase
// Framework phase: build the operating capability that the redesigned process needs.
//
// Adaptive layer: CLOs, Week 11 learning outcomes, sections, mastery rules
// and remedial micro-lessons. The question bank is in bank.js. The remedial
// narration is stored inside the matching COURSE lesson sections.
//
// LOAD ORDER: diagrams.js, course.js, adaptive-week.js, bank.js, moments.js
//
// CLO MAPPING: S1 (framework and phases), S2 (integrating new technologies).
// OUTCOMES: O1, O2, O3 (see course.js header). Remediation: two variants per
// section; round 1 uses variant 0, round 2 variant 1, then alternate.
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
    dg,
    fm
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
    clos: {
      S1: {
        name: "S1",
        full:
          "Design a framework for BPM and explain and assess related " +
          "phases in the context of a regional company"
      },
      S2: {
        name: "S2",
        full:
          "Integrate new technologies to manage organizational changes"
      }
    },

    outcomes: {
      O1: {
        clo: "S1",
        name: "Purpose and boundaries of Develop",
        full:
          "Explain the purpose and the boundaries of the Develop phase"
      },
      O2: {
        clo: "S1",
        name: "What to automate and what to handle by hand",
        full:
          "Evaluate what should and should not be automated, " +
          "particularly exception handling"
      },
      O3: {
        clo: "S2",
        name: "Technology without encoded dysfunction",
        full:
          "Integrate new technology into process delivery without " +
          "encoding existing dysfunction"
      }
    },

    sections: {
      W11O1a: { lo: "O1", lesson: "l1", name: "From a process design to an operating capability" },
      W11O1b: { lo: "O1", lesson: "l1", name: "Four ways to deliver the same capability" },
      W11O1c: { lo: "O1", lesson: "l1", name: "When the software starts changing the design" },
      W11O3a: { lo: "O3", lesson: "l2", name: "Vendor C fits — but not quite" },
      W11O3b: { lo: "O3", lesson: "l2", name: "Three options, three different futures" },
      W11O3c: { lo: "O3", lesson: "l2", name: "The four-year decision" },
      W11O2a: { lo: "O2", lesson: "l3", name: "What happens when the normal path fails?" },
      W11O2b: { lo: "O2", lesson: "l3", name: "Testing the cases nobody wants to demonstrate" },
      W11O2c: { lo: "O2", lesson: "l3", name: "The manual half of the new process" },
      W11O3d: { lo: "O3", lesson: "l4", name: "The cost of changing the process — and the cost of not changing it" },
      W11O3e: { lo: "O3", lesson: "l4", name: "Defending Qasr's build decision" },
      W11O3f: { lo: "O3", lesson: "l4", name: "From Develop to Implement — and your forum" }

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
      "Week 11 adaptive layer requires COURSE.lessons. " +
      "Load course.js before adaptive-week.js."
    );
  }

  const registered = new Set();

  course.lessons.forEach((lesson) => {

    if (!lesson || !Array.isArray(lesson.sections)) {
      throw new Error(
        "Invalid COURSE lesson structure in Week 11."
      );
    }

    lesson.sections.forEach((section) => {

      if (!section || typeof section.sec !== "string") {
        throw new Error(
          "Every Week 11 COURSE section must have a sec identifier."
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
          "Duplicate Week 11 section identifier: " + sec
        );
      }

      registered.add(sec);

      if (
        !Array.isArray(section.review) ||
        section.review.length !== 2
      ) {
        throw new Error(
          "Week 11 section " + sec +
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
  // VERIFY COMPLETE Week 11 COVERAGE
  // ==========================================================

  const expectedSections = Object.keys(A.sections);

  expectedSections.forEach((sec) => {

    if (!registered.has(sec)) {
      throw new Error(
        "Week 11 COURSE is missing required section: " + sec
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