// W14-adaptive-week
//
// OPER621 Business Process Management
// Week 14 - The Sustainable Performance Phase
// Framework phase: sustain realised improvements through accountable ownership,
// active measurement, proportionate change governance and continuous improvement.
// Sustainable Performance is phase ten, following Realize Value,
// and reconnects operational learning with earlier framework phases.
//
// Adaptive layer: CLOs, Week 14 learning outcomes, sections, mastery rules
// and remedial micro-lessons. The question bank is in bank.js. The remedial
// narration is stored inside the matching COURSE lesson sections.
//
// LOAD ORDER: diagrams.js, course.js, adaptive-week.js, bank.js, moments.js
//
// CLO MAPPING: K1 (utilization of BPM in contemporary organisations),
// K3 (change management and employee resistance),
// S3 (coordinating people and organisational change).
// OUTCOMES: O1, O2, O3 (see course.js header).
// O1 [K1]: Assess how process performance is sustained after a programme ends.
// O2 [K3]: Analyse the drift back towards prior performance when no individual has done anything wrong.
// O3 [S3]: Devise governance that maintains and continuously improves processes.
// The primary CLO mappings above are used for adaptive tracking;
// supporting CLO relationships are documented in the course.js header.
//
// SECTION MAPPING
// l1: W14O1a -> O1 [K1]; W14O2a, W14O2b -> O2 [K3].
// l2: W14O2c -> O2 [K3]; W14O1b, W14O1c -> O1 [K1].
// l3: W14O3a, W14O3b, W14O3c -> O3 [S3].
// l4: W14O2d -> O2 [K3]; W14O3d -> O3 [S3]; W14O1d -> O1 [K1].
//
// SECTION COVERAGE
// O1: W14O1a, W14O1b, W14O1c, W14O1d.
// O2: W14O2a, W14O2b, W14O2c, W14O2d.
// O3: W14O3a, W14O3b, W14O3c, W14O3d.
// Each outcome has four sections, with twelve sections overall.
//
// REMEDIATION: two variants per section; round 1 uses variant 0,
// round 2 uses variant 1, then alternate.
// The review entries are registered from COURSE.lessons without duplicating narration.
// Each remedial variant uses a distinct explanatory angle or illustrative example.
// Each variant contains 230–360 narration words and sentence-linked moments.
//
// MASTERY: target 80%, window 5, minimum evidence 3.
// CONFIGURATION: target 0.8, window 5, minEvidence 3,
// firstCheck 4, firstCheckPerSection 3, perWeak 3.
// For three-section lessons, the first check should cover all three sections.
// Preserve the existing adaptive player's selection, scoring and recovery logic.
// A section that cannot reach mastery after exhausting fresh items
// must be flagged for instructor review rather than silently passed.
//
// QUESTION BANK: twelve fresh items per section, 144 items in total.
// TYPES: mcq, tf, drop, visual, order, match.
// DISTRIBUTION PER SECTION: 3 mcq, 2 tf, 2 drop, 2 visual,
// 1 order, 2 match.
// Each item inherits its weekly outcome and primary CLO from ADAPTIVE.sections.
// Each item points to its section's remedial lessons using review:<section-id>.
// Every question has one unambiguous automatically graded answer and a clear why.
// All distractors must be plausible, source-consistent and distinguishable.
// Questions involving Qasr's numerical evidence must use the slide values exactly.
// Distinguish observed performance, analytical inference and proposed interventions.
// Do not introduce new question types or diagram constructors.
//
// FORMATIVE STATUS
// VoiceLearn checks are formative practice, not Assessment 4 grading.
// Assessment 4 — Participation (10%) concerns the self-paced forum activities.
// The separate forum case Nobody Did Anything Wrong must not be fabricated
// or converted into a bank of questions without its actual source document.
//
// VALIDATION: exactly four lessons, twelve unique sections,
// four sections per outcome, two remedial variants per section,
// and complete outcome/CLO mappings.
// Validate section-to-lesson assignments against the production map.
// Validate all diagram calls against the eight existing D constructors.
// Preserve the Week 12 adaptive structure, registration logic,
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
      K1: { name: "K1", full: "Analyse the utilization of Business Process Management in today's business environment" },
      K3: { name: "K3", full: "Assess the importance of change management in relation to BPM and devise solutions to minimize employees' resistance" },
      S3: { name: "S3", full: "Coordinate people and the change process in organizations to achieve BPM objectives" }
    },

    outcomes: {
      O1: { clo: "K1", name: "Sustaining process performance after a programme", full: "Assess how process performance is sustained after a programme ends." },
      O2: { clo: "K3", name: "Understanding performance drift without individual wrongdoing", full: "Analyse the drift back towards prior performance when no individual has done anything wrong." },
      O3: { clo: "S3", name: "Governance for sustained and continuous improvement", full: "Devise governance that maintains and continuously improves processes." }
    },

    sections: {
      W14O1a: { lo: "O1", lesson: "l1", name: "Phase ten: when BPM becomes management" },
      W14O2a: { lo: "O2", lesson: "l1", name: "Five ways a good process quietly deteriorates" },
      W14O2b: { lo: "O2", lesson: "l1", name: "Nobody did anything wrong — so why did performance fall?" },
      W14O2c: { lo: "O2", lesson: "l2", name: "The difference between reporting and managing" },
      W14O1b: { lo: "O1", lesson: "l2", name: "Four signals that the gain is slipping" },
      W14O1c: { lo: "O1", lesson: "l2", name: "Setting the trigger before the trend turns" },
      W14O3a: { lo: "O3", lesson: "l3", name: "Measure, review, improve, embed: the owner's loop" },
      W14O3b: { lo: "O3", lesson: "l3", name: "Governing changes without blocking improvement" },
      W14O3c: { lo: "O3", lesson: "l3", name: "The handover that makes accountability real" },
      W14O2d: { lo: "O2", lesson: "l4", name: "Exhibit 14: twenty-two months of gradual decay" },
      W14O3d: { lo: "O3", lesson: "l4", name: "One intervention, four candidates, one defensible choice" },
      W14O1d: { lo: "O1", lesson: "l4", name: "From one successful project to a self-improving organisation" }
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
      "Week 14 adaptive layer requires COURSE.lessons. " +
      "Load course.js before adaptive-week.js."
    );
  }

  const registered = new Set();

  course.lessons.forEach((lesson) => {

    if (!lesson || !Array.isArray(lesson.sections)) {
      throw new Error(
        "Invalid COURSE lesson structure in Week 14."
      );
    }

    lesson.sections.forEach((section) => {

      if (!section || typeof section.sec !== "string") {
        throw new Error(
          "Every Week 14 COURSE section must have a sec identifier."
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
          "Duplicate Week 14 section identifier: " + sec
        );
      }

      registered.add(sec);

      if (
        !Array.isArray(section.review) ||
        section.review.length !== 2
      ) {
        throw new Error(
          "Week 14 section " + sec +
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
  // VERIFY COMPLETE Week 14 COVERAGE
  // ==========================================================

  const expectedSections = Object.keys(A.sections);

  expectedSections.forEach((sec) => {

    if (!registered.has(sec)) {
      throw new Error(
        "Week 14 COURSE is missing required section: " + sec
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