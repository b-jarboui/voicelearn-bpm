// W13-adaptive-week
//
// OPER621 Business Process Management
// Week 13 - The Realize Value Phase
// Framework phase: establish whether promised benefits have been delivered,
// assess attribution, capture benefits requiring management action and report honestly.
//
// Adaptive layer: CLOs, Week 13 learning outcomes, sections, mastery rules
// and remedial micro-lessons. The question bank is in bank.js. The remedial
// narration is stored inside the matching COURSE lesson sections.
//
// LOAD ORDER: diagrams.js, course.js, adaptive-week.js, bank.js, moments.js
//
// CLO MAPPING: K2 (factors affecting successful BPM implementation),
// S1 (designing and assessing BPM frameworks and phases in a regional company).
// OUTCOMES: O1, O2, O3 (see course.js header).
// O1 [S1]: Explain how benefits are defined, tracked and realised across a BPM programme.
// O2 [K2]: Evaluate why expected benefits frequently cannot be located after implementation.
// O3 [S1]: Design a benefits management approach with accountable ownership.
// The primary CLO mappings above are used for adaptive tracking;
// supporting CLO relationships are documented in the course.js header.
//
// SECTION MAPPING
// l1: W13O1a, W13O1b, W13O1c -> O1 [S1].
// l2: W13O1d -> O1 [S1]; W13O2a, W13O2b -> O2 [K2].
// l3: W13O2c, W13O2d, W13O2e -> O2 [K2].
// l4: W13O3a, W13O3b, W13O3c -> O3 [S1].
//
// SECTION CONTENT
// W13O1a: Realize Value as phase nine; Implement versus benefits realisation;
//           benefits management designed early and evaluated after implementation.
// W13O1b: Traceability from phase 1 objectives through phase 3 baselines,
//           phase 5 revised estimates and phase 9 measured outcomes.
// W13O1c: Cost removed, cost avoided, revenue gained, risk reduced and
//           capacity released; distinguish operational improvement from realised benefit.
// W13O1d: Attribution and confounding; the debtor-days example of 47 to 31
//           alongside a new late-payment penalty; comparisons and uncertainty.
// W13O2a: Promised versus tracked benefits; timing, required actions and
//           benefits that were never realisable; honest shortfall reporting.
// W13O2b: Organisational reasons benefits disappear; disbanded teams,
//           absent incentives, sponsor turnover and reluctance to report bad news.
// W13O2c: Qasr front-desk labour claim of AED 240,000; four fewer employees
//           versus eleven assumed; capacity released versus budget cost removed.
// W13O2d: Qasr retained corporate revenue claim of AED 180,000 alongside
//           a 4% rate cut; AED 85,000 avoided regulatory penalty and evidential limits.
// W13O2e: Qasr business case AED 620,000 versus AED 505,000 tracked;
//           AED 115,000 gap; seven recent go-lives; programme and finance positions.
// W13O3a: Business ownership of each benefit; owner named before approval;
//           programme capability versus business responsibility for realisation.
// W13O3b: Benefits register with objectives, baselines, estimates, measures,
//           dates, owners, attribution evidence, financial reconciliation and gaps.
// W13O3c: Qasr corporate-billing programme preparation; benefits governance,
//           accountable owners, reporting cycle and honest audit committee evidence;
//           transition to Sustainable Performance and the separate forum case.
//
// REMEDIATION: two variants per section; round 1 uses variant 0,
// round 2 uses variant 1, then alternate.
// Each remedial variant uses a different explanatory angle and relatable example.
// The review entries are registered from COURSE.lessons without duplicating narration.
// Every remedial lesson must remain consistent with its parent section and the slides.
//
// MASTERY: target 80%, window 5, minimum evidence 3.
// CONFIGURATION: target 0.8, window 5, minEvidence 3,
// firstCheck 4, firstCheckPerSection 3, perWeak 3.
// Preserve fresh-question selection, repeated remediation and instructor-review flags.
// The player must never reuse a question within the same learner attempt.
// Sections not mastered when the available bank is exhausted are flagged for instructor review.
//
// QUESTION BANK: twelve fresh items per section, 144 items in total.
// TYPES: mcq, tf, drop, visual, order, match.
// DISTRIBUTION PER SECTION: 3 mcq, 2 tf, 2 drop, 2 visual,
// 1 order, 2 match.
// TOTAL DISTRIBUTION: 36 mcq, 24 tf, 24 drop, 24 visual,
// 12 order, 24 match.
// No question type exceeds 30% of the total bank.
// Every section supports an initial check of three items and
// three fresh remediation rounds of three items each.
// Every question must have one unambiguous correct answer,
// plausible distractors, a full-sentence explanation and unique identifier.
// Each item inherits its weekly outcome and primary CLO from ADAPTIVE.sections.
// Each item points to its section's remedial lessons using review:<section-id>.
// Correct options are authored first for mcq, visual and drop;
// order items and match pairs are authored in their correct relationships.
// Runtime shuffling remains the responsibility of the existing player.
//
// FACTUAL SAFEGUARDS
// Use only the Week 13 Session 1 slides and Delivery Plan for factual content.
// Treat the Qasr figures as reported claims and evidence, not certified benefits.
// Do not equate labour hours saved with an equivalent reduction in budget cost.
// Do not assume both corporate renewals were caused by the redesigned process.
// Do not treat the avoided regulatory penalty as an automatically realised saving.
// Do not attribute the entire AED 115,000 gap to timing without supporting evidence.
// Do not invent a reconciled benefit total, final audit ruling or approved owner.
// Any proposed calculation, benefit register field or management decision must
// be distinguished from established Qasr case facts.
// The forum case concerns another organisation; do not invent its evidence.
//
// VALIDATION: exactly four lessons, twelve unique sections,
// two remedial variants per section and complete outcome/CLO mappings.
// Exactly 24 remedial micro-lessons and 144 automatically graded questions.
// Narration: 430-570 words per section; remedial narration: 230-360 words per variant.
// Sentence length: average 15-18 words, minimum 6, maximum 30.
// Every narration sentence must have a valid sentence-linked moment pair.
// Check unique ids, unique question stems, valid answers, valid diagram types,
// complete why explanations, valid remedial pointers and question distribution.
// Preserve the Week 12 adaptive structure, registration logic,
// mastery configuration, fresh-question handling and instructor-review flags.
// Keep the same window.COURSE, window.MOMENT_KIT and window.ADAPTIVE conventions.
// Keep the same six question types and the existing player-compatible schema.
// No engine changes, new diagram types or additional dependencies are required.
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
      K2: { name: "K2", full: "Evaluate various factors that impact on the successful implementation of BPM in public and private sector organizations" },
      S1: { name: "S1", full: "Design a framework for BPM and explain and assess related phases in the context of a regional company" }
    },

    outcomes: {
      O1: { clo: "S1", name: "Defining, tracking and realising benefits", full: "Explain how benefits are defined, tracked and realised across a BPM programme." },
      O2: { clo: "K2", name: "Evaluating missing and disputed benefits", full: "Evaluate why expected benefits frequently cannot be located after implementation." },
      O3: { clo: "S1", name: "Accountable benefits management", full: "Design a benefits management approach with accountable ownership." }
    },

    sections: {
      W13O1a: { lo: "O1", lesson: "l1", name: "Going live is not the same as delivering value" },
      W13O1b: { lo: "O1", lesson: "l1", name: "The promise, the baseline and the measured result" },
      W13O1c: { lo: "O1", lesson: "l1", name: "Five kinds of benefit, five different tests" },
      W13O1d: { lo: "O1", lesson: "l2", name: "When two causes change the same result" },
      W13O2a: { lo: "O2", lesson: "l2", name: "The gap between promised and tracked" },
      W13O2b: { lo: "O2", lesson: "l2", name: "Why real improvements disappear from the accounts" },
      W13O2c: { lo: "O2", lesson: "l3", name: "Four fewer employees, eleven assumed" },
      W13O2d: { lo: "O2", lesson: "l3", name: "Two renewals, a rate cut and an avoided fine" },
      W13O2e: { lo: "O2", lesson: "l3", name: "Six hundred and twenty, or five hundred and five" },
      W13O3a: { lo: "O3", lesson: "l4", name: "A benefit needs an owner in the business" },
      W13O3b: { lo: "O3", lesson: "l4", name: "Building a benefits register that finance can trust" },
      W13O3c: { lo: "O3", lesson: "l4", name: "The next programme must not repeat the argument" }
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
      "Week 13 adaptive layer requires COURSE.lessons. " +
      "Load course.js before adaptive-week.js."
    );
  }

  const registered = new Set();

  course.lessons.forEach((lesson) => {

    if (!lesson || !Array.isArray(lesson.sections)) {
      throw new Error(
        "Invalid COURSE lesson structure in Week 13."
      );
    }

    lesson.sections.forEach((section) => {

      if (!section || typeof section.sec !== "string") {
        throw new Error(
          "Every Week 13 COURSE section must have a sec identifier."
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
          "Duplicate Week 13 section identifier: " + sec
        );
      }

      registered.add(sec);

      if (
        !Array.isArray(section.review) ||
        section.review.length !== 2
      ) {
        throw new Error(
          "Week 13 section " + sec +
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
  // VERIFY COMPLETE Week 13 COVERAGE
  // ==========================================================

  const expectedSections = Object.keys(A.sections);

  expectedSections.forEach((sec) => {

    if (!registered.has(sec)) {
      throw new Error(
        "Week 13 COURSE is missing required section: " + sec
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