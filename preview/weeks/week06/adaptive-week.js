// W06-adaptive-week
//
// OPER621 Business Process Management
// Week 6 — Process Architecture
// Framework Phase 2: The map that tells you where you are.
//
// Adaptive layer: course learning outcomes (CLOs), Week 6
// learning outcomes, sections, mastery rules, and remedial
// micro-lessons.
//
// The question bank itself is in bank.js.
// Remedial micro-lessons are used ONLY during remediation,
// never during the main lessons.
//
// The complete remedial narration is stored inside the
// corresponding COURSE lesson sections.
//
// LOAD ORDER
// 1. diagrams.js
// 2. course.js
// 3. adaptive-week.js
// 4. bank.js
// 5. moments.js
//
// The COURSE object must exist before this file executes.
// The question bank is assigned separately through A.bank.
//
// CLO MAPPING
// S1 — Design a framework for BPM and explain and assess
// related phases in the context of a regional company.
//
// INTERNAL OUTCOME MAPPING
// O1 — Explain process architecture and distinguish it
//      from process documentation and process models.
// O2 — Design a process architecture relating processes
//      to strategy, to one another, and to ownership.
// O3 — Evaluate the consequences of working without an
//      architecture and apply architectural principles.
//
// SECTION MAPPING
// O1: W6O1a, W6O1b, W6O1c
// O2: W6O2a, W6O2b, W6O2c
// O3: W6O3a, W6O3b, W6O3c, W6O3d
//
// REMEDIATION
// Each section has two alternative remedial micro-lessons.
// Round 1 uses variant 0.
// Round 2 uses variant 1.
// Subsequent rounds alternate between the variants.
//
// Each remedial lesson contains [sentence, moment] pairs.
// The MOMENTS builder reads ADAPTIVE.review directly.
//
// MASTERY
// Target: 80%
// Rolling window: 5 answers per section
// Minimum evidence: 3 answers per section
// Initial lesson check: minimum 4 questions
// Initial section coverage: minimum 3 questions
// Remediation: 3 fresh questions per weak section
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
          "Design a framework for BPM and explain and assess " +
          "related phases in the context of a regional company"
      }

    },

    // ========================================================
    // WEEK 6 LEARNING OUTCOMES
    // ========================================================

    outcomes: {

      O1: {
        clo: "S1",

        name: "Explain process architecture",

        full:
          "Explain what a process architecture is and the " +
          "purpose it serves, and distinguish a process " +
          "architecture from a process model"
      },

      O2: {
        clo: "S1",

        name: "Design process architecture",

        full:
          "Design a process architecture relating processes " +
          "to strategy and to one another, construct a process " +
          "architecture for a described organisation, and " +
          "identify the level of granularity at which an " +
          "architecture is useful"
      },

      O3: {
        clo: "S1",

        name: "Evaluate and apply architecture",

        full:
          "Evaluate the consequences of beginning process " +
          "work without an architecture, build a first-level " +
          "architecture for an unfamiliar organisation, and " +
          "defend the chosen level of decomposition"
      }

    },

    // ========================================================
    // SECTION MAPPING
    //
    // The keys below must match section.sec in COURSE.lessons
    // and the section identifiers used by bank.js.
    //
    // Each section uses the Week 1 schema:
    //
    //   lo      — internal learning outcome key
    //   lesson  — lesson identifier
    //   name    — section title
    //
    // ========================================================

    sections: {

      // ------------------------------------------------------
      // LESSON l1 — WHY A LIST OF PROCESSES IS NOT A MAP
      // Outcome O1
      // ------------------------------------------------------

      W6O1a: {
        lo: "O1",
        lesson: "l1",
        name: "Phase 2 — The map that tells you where you are"
      },

      W6O1b: {
        lo: "O1",
        lesson: "l1",
        name: "Architecture versus documentation and process models"
      },

      W6O1c: {
        lo: "O1",
        lesson: "l1",
        name: "Three kinds of processes — core, supporting and management"
      },

      // ------------------------------------------------------
      // LESSON l2 — BUILDING AN ARCHITECTURE THAT WORKS
      // Outcome O2
      // ------------------------------------------------------

      W6O2a: {
        lo: "O2",
        lesson: "l2",
        name: "Three levels — knowing how far to zoom in"
      },

      W6O2b: {
        lo: "O2",
        lesson: "l2",
        name: "Process ownership — a title or real authority?"
      },

      W6O2c: {
        lo: "O2",
        lesson: "l2",
        name: "Structure first, detail second — conventions and authoritative versions"
      },

      // ------------------------------------------------------
      // LESSON l3 — FOURTEEN HOTELS, ELEVEN DIFFERENT ANSWERS
      // Outcome O3
      // ------------------------------------------------------

      W6O3a: {
        lo: "O3",
        lesson: "l3",
        name: "Which one is the process? — Qasr's conflicting models"
      },

      W6O3b: {
        lo: "O3",
        lesson: "l3",
        name: "One standard or fourteen variants? — evidence, granularity and local differences"
      },

      // ------------------------------------------------------
      // LESSON l4 — MAKING THE ARCHITECTURE USEFUL
      // Outcome O3
      // ------------------------------------------------------

      W6O3c: {
        lo: "O3",
        lesson: "l4",
        name: "An architecture that survives change — dependencies, decisions and governance"
      },

      W6O3d: {
        lo: "O3",
        lesson: "l4",
        name: "Build the first-level map — synthesis and forum handover"
      }

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
      "Week 6 adaptive layer requires COURSE.lessons. " +
      "Load course.js before adaptive-week.js."
    );
  }

  const registered = new Set();

  course.lessons.forEach((lesson) => {

    if (!lesson || !Array.isArray(lesson.sections)) {
      throw new Error(
        "Invalid COURSE lesson structure in Week 6."
      );
    }

    lesson.sections.forEach((section) => {

      if (!section || typeof section.sec !== "string") {
        throw new Error(
          "Every Week 6 COURSE section must have a sec identifier."
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
          "Duplicate Week 6 section identifier: " + sec
        );
      }

      registered.add(sec);

      if (
        !Array.isArray(section.review) ||
        section.review.length !== 2
      ) {
        throw new Error(
          "Week 6 section " + sec +
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
  // VERIFY COMPLETE WEEK 6 COVERAGE
  // ==========================================================

  const expectedSections = Object.keys(A.sections);

  expectedSections.forEach((sec) => {

    if (!registered.has(sec)) {
      throw new Error(
        "Week 6 COURSE is missing required section: " + sec
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