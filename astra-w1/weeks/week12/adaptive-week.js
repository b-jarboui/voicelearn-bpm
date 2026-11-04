// W12-adaptive-week
//
// OPER621 Business Process Management
// Week 12 - The Implement Phase
// Framework phase: introduce the developed process into everyday operations
// while managing rollout risk, organisational change and operational continuity.
//
// Adaptive layer: CLOs, Week 12 learning outcomes, sections, mastery rules
// and remedial micro-lessons. The question bank is in bank.js. The remedial
// narration is stored inside the matching COURSE lesson sections.
//
// LOAD ORDER: diagrams.js, course.js, adaptive-week.js, bank.js, moments.js
//
// CLO MAPPING: K3 (change management and employee resistance),
// S2 (integrating new technologies), S3 (coordinating people and change).
// OUTCOMES: O1, O2, O3 (see course.js header).
// O1 [S2]: Evaluate implementation approaches against risk, benefit and organisational readiness.
// O2 [K3]: Devise a training and change approach that supports go-live.
// O3 [S3]: Assess readiness and design contingency for implementation.
// The primary CLO mappings above are used for adaptive tracking;
// supporting CLO relationships are documented in the course.js header.
//
// SECTION MAPPING
// l1: W12O1a, W12O1b, W12O1c -> O1 [S2].
// l2: W12O2a, W12O2b, W12O2c -> O2 [K3].
// l3: W12O1d, W12O1e -> O1 [S2]; W12O3a -> O3 [S3].
// l4: W12O3b, W12O3c, W12O3d -> O3 [S3].
//
// REMEDIATION: two variants per section; round 1 uses variant 0,
// round 2 uses variant 1, then alternate.
// The review entries are registered from COURSE.lessons without duplicating narration.
//
// MASTERY: target 80%, window 5, minimum evidence 3.
// CONFIGURATION: target 0.8, window 5, minEvidence 3,
// firstCheck 4, firstCheckPerSection 3, perWeak 3.
//
// QUESTION BANK: twelve fresh items per section, 144 items in total.
// TYPES: mcq, tf, drop, visual, order, match.
// DISTRIBUTION PER SECTION: 3 mcq, 2 tf, 2 drop, 2 visual,
// 1 order, 2 match.
// Each item inherits its weekly outcome and primary CLO from ADAPTIVE.sections.
// Each item points to its section's remedial lessons using review:<section-id>.
//
// VALIDATION: exactly four lessons, twelve unique sections,
// two remedial variants per section, and complete outcome/CLO mappings.
// Preserve the Week 11 adaptive structure, registration logic,
// mastery configuration, fresh-question handling and instructor-review flags.
//

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
      K3: { name: "K3", full: "Assess the importance of change management in relation to BPM and devise solutions to minimize employees' resistance" },
      S2: { name: "S2", full: "Integrate new technologies to manage organizational changes" },
      S3: { name: "S3", full: "Coordinate people and the change process in organizations to achieve BPM objectives" }
    },

    outcomes: {
      O1: { clo: "S2", name: "Implementation approaches and risk", full: "Evaluate implementation approaches against risk, benefit and organisational readiness." },
      O2: { clo: "K3", name: "Training and change for go-live", full: "Devise a training and change approach that supports go-live." },
      O3: { clo: "S3", name: "Readiness and implementation contingency", full: "Assess readiness and design contingency for implementation." }
    },

    sections: {
      W12O1a: { lo: "O1", lesson: "l1", name: "From a tested process to everyday operations" },
      W12O1b: { lo: "O1", lesson: "l1", name: "Four ways to go live" },
      W12O1c: { lo: "O1", lesson: "l1", name: "The factor that decides the rollout" },
      W12O2a: { lo: "O2", lesson: "l2", name: "The performance dip nobody wants to announce" },
      W12O2b: { lo: "O2", lesson: "l2", name: "Training people to use the process — and helping them stay with it" },
      W12O2c: { lo: "O2", lesson: "l2", name: "When adoption stops at sixty-five percent" },
      W12O1d: { lo: "O1", lesson: "l3", name: "A pilot is not fourteen properties" },
      W12O1e: { lo: "O1", lesson: "l3", name: "Sequencing the twelve remaining properties" },
      W12O3a: { lo: "O3", lesson: "l3", name: "The go-live decision is not a formality" },
      W12O3b: { lo: "O3", lesson: "l4", name: "Eleven hours to go backwards" },
      W12O3c: { lo: "O3", lesson: "l4", name: "When can the project team leave?" },
      W12O3d: { lo: "O3", lesson: "l4", name: "Fourteen properties, one defensible decision" }
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
      "Week 12 adaptive layer requires COURSE.lessons. " +
      "Load course.js before adaptive-week.js."
    );
  }

  const registered = new Set();

  course.lessons.forEach((lesson) => {

    if (!lesson || !Array.isArray(lesson.sections)) {
      throw new Error(
        "Invalid COURSE lesson structure in Week 12."
      );
    }

    lesson.sections.forEach((section) => {

      if (!section || typeof section.sec !== "string") {
        throw new Error(
          "Every Week 12 COURSE section must have a sec identifier."
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
          "Duplicate Week 12 section identifier: " + sec
        );
      }

      registered.add(sec);

      if (
        !Array.isArray(section.review) ||
        section.review.length !== 2
      ) {
        throw new Error(
          "Week 12 section " + sec +
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
  // VERIFY COMPLETE Week 12 COVERAGE
  // ==========================================================

  const expectedSections = Object.keys(A.sections);

  expectedSections.forEach((sec) => {

    if (!registered.has(sec)) {
      throw new Error(
        "Week 12 COURSE is missing required section: " + sec
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