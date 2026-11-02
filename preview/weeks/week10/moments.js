(() => {
  "use strict";

  /*
   * VoiceLearn · OPER621 · Week 10
   * THE PEOPLE PHASE — SEMANTIC MOMENTS AND CINEMATIC DIRECTION
   *
   * Contract
   * --------
   * - Preserve the existing window.MOMENTS interface.
   * - Preserve lesson IDs, section IDs and narration indices.
   * - Preserve all question IDs and question content.
   * - Never invent or replace a question.
   * - Never mutate COURSE or ADAPTIVE.
   * - A null moment retains the previous visual.
   * - Cinematic direction is optional metadata.
   * - All four looks retain their existing colour systems.
   * - Reduced motion always has a meaningful final state.
   * - The look renderer remains the authority for semantic visuals.
   *
   * The cinematic engine may consume the metadata exposed here.
   * If that engine is absent, ordinary VoiceLearn moments still work.
   */

  const COURSE = window.COURSE;
  const ADAPTIVE = window.ADAPTIVE;

  const M = {};
  const CINEMATIC_MOMENTS = {};

  const VALID_TYPES = new Set([
    "title",
    "item",
    "question",
    "formula",
    "issue",
    "compare",
    "statement",
    "diagram"
  ]);

  const WEEK10 = /^W10O[123][a-e]$/;

  const OWN = Object.prototype.hasOwnProperty;

  const num = (value, fallback = 0) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  };

  const clamp = (value, low, high) =>
    Math.max(low, Math.min(high, value));

  const text = value =>
    value == null ? "" : String(value);

  /*
   * A semantic moment is copied rather than modified in place.
   *
   * This matters because the course may be reused by the voice player,
   * another look, a review engine or a deterministic seek operation.
   */

  function normalizeMoment(raw, at) {
    if (!raw || typeof raw !== "object") return null;

    const moment = Object.assign({}, raw);
    moment.at = at;

    if (!VALID_TYPES.has(moment.type)) {
      moment.type = "statement";
      moment.text = text(
        moment.text ||
        moment.title ||
        moment.note ||
        ""
      );
    }

    return moment;
  }

  function build(lines) {
    if (!Array.isArray(lines)) return [];

    const result = [];

    lines.forEach((line, at) => {
      if (!Array.isArray(line) || line.length < 2) return;

      const raw = line[1];
      if (raw == null) return;

      const entries = Array.isArray(raw) ? raw : [raw];

      entries.forEach(entry => {
        const moment = normalizeMoment(entry, at);
        if (moment) result.push(moment);
      });
    });

    return result;
  }

  function register(key, lines) {
    M[key] = build(lines);
    return M[key];
  }

  /*
   * SECTION SIGNATURES
   *
   * Each main section has a different visual argument.
   * The effect describes what the learner should understand,
   * not merely how objects enter the screen.
   */

  const SECTION_DIRECTION = Object.freeze({
    W10O1a: {
      title: "The role enters the lobby",
      effect: "role-transformation",
      signature: "lobby-and-hosts",
      visualThesis:
        "A redesigned process becomes real only when a person can operate it.",
      beats: [
        "guest-arrival",
        "exception-interruption",
        "role-transformation",
        "twenty-two-hosts",
        "people-phase"
      ],
      pace: "cinematic-opening",
      accentPolicy: "problem-and-transformation"
    },

    W10O1b: {
      title: "Five things the People phase must deliver",
      effect: "readiness-assembly",
      signature: "five-slot-readiness",
      visualThesis:
        "Readiness is built from evidence, not declarations.",
      beats: [
        "empty-readiness-board",
        "role-definition",
        "decision-rights",
        "capability",
        "measures",
        "ownership"
      ],
      pace: "progressive-build",
      accentPolicy: "milestones-only"
    },

    W10O1c: {
      title: "Responsibility meets accountability",
      effect: "raci-reveal",
      signature: "raci-matrix",
      visualThesis:
        "Doing the work and owning the result are different jobs.",
      beats: [
        "responsibility",
        "accountability",
        "missing-owner",
        "matrix-build",
        "delegation-contrast"
      ],
      pace: "precise-and-decisive",
      accentPolicy: "missing-accountability"
    },

    W10O2a: {
      title: "The AED 400 decision",
      effect: "authority-simulation",
      signature: "authority-dial",
      visualThesis:
        "A limit is useful only when eligibility and authority are clear.",
      beats: [
        "guest-waits",
        "undocumented-authority",
        "aed320-escalation",
        "documented-delegation",
        "aed320-local-decision",
        "aed460-escalation"
      ],
      pace: "signature-simulation",
      accentPolicy: "decision-boundaries"
    },

    W10O2b: {
      title: "The scorecard changes the job",
      effect: "incentive-rebalance",
      signature: "scorecard-scale",
      visualThesis:
        "People follow what the organisation measures and rewards.",
      beats: [
        "three-competing-tasks",
        "old-scorecard",
        "complex-case-disadvantage",
        "aligned-measure",
        "quality-sample"
      ],
      pace: "contrast-and-reversal",
      accentPolicy: "scorecard-reversal"
    },

    W10O2c: {
      title: "Write the real job",
      effect: "role-specification",
      signature: "living-role-card",
      visualThesis:
        "A role description must match the decisions employees actually face.",
      beats: [
        "old-description",
        "three-week-delay",
        "new-responsibilities",
        "authority",
        "measures",
        "capability"
      ],
      pace: "document-repair",
      accentPolicy: "late-description"
    },

    W10O2d: {
      title: "Repair the operating role",
      effect: "role-repair",
      signature: "repair-checklist",
      visualThesis:
        "A job redesign fails when the surrounding people system stays unchanged.",
      beats: [
        "diagnose",
        "role",
        "authority",
        "measures",
        "practice",
        "evidence"
      ],
      pace: "repair-montage",
      accentPolicy: "completed-repairs"
    },

    W10O3a: {
      title: "Attendance is not capability",
      effect: "capability-evidence",
      signature: "twenty-two-hosts",
      visualThesis:
        "Training attendance is an input; demonstrated judgement is evidence.",
      beats: [
        "green-dashboard",
        "twenty-two-attend",
        "capability-unknown",
        "nine-referrals",
        "possible-explanations",
        "practical-assessment"
      ],
      pace: "reveal-and-diagnosis",
      accentPolicy: "evidence-gaps"
    },

    W10O3b: {
      title: "The lobby runs two processes",
      effect: "adoption-simulation",
      signature: "two-process-lobby",
      visualThesis:
        "A process can be launched without becoming normal work.",
      beats: [
        "kiosk-arrivals",
        "desk-arrivals",
        "unreported-remainder",
        "legitimate-exceptions",
        "possible-workarounds",
        "adoption-evidence"
      ],
      pace: "observed-versus-illustrative",
      accentPolicy: "route-divergence"
    },

    W10O3c: {
      title: "The knowledge people carry",
      effect: "knowledge-transfer",
      signature: "knowledge-iceberg",
      visualThesis:
        "Experience-based judgement must be made teachable before it is lost.",
      beats: [
        "written-procedure",
        "hidden-judgement",
        "worked-exception",
        "peer-learning",
        "two-departures",
        "reasons-unknown"
      ],
      pace: "human-and-reflective",
      accentPolicy: "knowledge-reveal"
    },

    W10O3d: {
      title: "Turn the dashboard over",
      effect: "evidence-board",
      signature: "dashboard-flip",
      visualThesis:
        "Completion status and operational readiness are not the same thing.",
      beats: [
        "green-dashboard",
        "dashboard-flip",
        "adoption-evidence",
        "referral-evidence",
        "capability-gap",
        "departures",
        "first-decision"
      ],
      pace: "signature-reveal",
      accentPolicy: "evidence-over-status"
    },

    W10O3e: {
      title: "The handover that changes tomorrow",
      effect: "controlled-handover",
      signature: "develop-handover",
      visualThesis:
        "The People phase succeeds when its decisions survive into operation.",
      beats: [
        "role-definition",
        "decision-rights",
        "capability-evidence",
        "aligned-measures",
        "develop-handover",
        "intended-future"
      ],
      pace: "resolution-and-finale",
      accentPolicy: "handover-and-future"
    }
  });

  /*
   * MOTION GRAMMAR
   *
   * Each semantic type has its own visual verb.
   * No universal sweep is requested.
   */

  const TYPE_DIRECTION = Object.freeze({
    title: {
      animation: "kinetic-title",
      duration: 1.15,
      entrance: "arrival",
      emphasis: "section-change",
      finalState: "fully-visible"
    },

    item: {
      animation: "progressive-item",
      duration: .85,
      entrance: "slot-fill",
      emphasis: "ordinal-progress",
      finalState: "item-visible"
    },

    question: {
      animation: "focus-question",
      duration: 1.35,
      entrance: "focus-and-hold",
      emphasis: "decision-pause",
      finalState: "question-visible"
    },

    formula: {
      animation: "formula-build",
      duration: 1.15,
      entrance: "component-build",
      emphasis: "relationship",
      finalState: "complete-formula"
    },

    issue: {
      animation: "problem-reveal",
      duration: 1.05,
      entrance: "interruption",
      emphasis: "decision-risk",
      finalState: "problem-visible"
    },

    compare: {
      animation: "comparison-build",
      duration: 1.1,
      entrance: "contrast",
      emphasis: "difference",
      finalState: "both-sides-readable"
    },

    statement: {
      animation: "key-takeaway",
      duration: 1.6,
      entrance: "emphasis-wipe",
      emphasis: "one-idea",
      finalState: "statement-visible"
    },

    diagram: {
      animation: "diagram-build",
      duration: 2.8,
      entrance: "teaching-order",
      emphasis: "relationship-or-decision",
      finalState: "complete-diagram"
    }
  });

  /*
   * MOMENT DESCRIPTION
   *
   * Metadata is derived from the actual semantic moment.
   * No claim is made that a field exists when the source lacks it.
   */

  function describeMoment(moment, sectionId, index) {
    const base = TYPE_DIRECTION[moment.type] ||
      TYPE_DIRECTION.statement;

    const result = {
      at: moment.at,
      index,
      type: moment.type,
      animation: base.animation,
      duration: base.duration,
      entrance: base.entrance,
      emphasis: base.emphasis,
      finalState: base.finalState,
      reducedMotion: "final-state",
      optional: true
    };

    if (moment.type === "diagram") {
      result.diagram = {
        build: "semantic-order",
        connectors: "stroke-draw",
        token: "meaningful-route-only",
        focus: "progressive",
        finalState: "complete",
        avoidDecorativeMotion: true
      };
    }

    if (moment.type === "compare") {
      const side = moment.side || "a";

      result.compare = {
        side,
        entrance: side === "b"
          ? "from-right"
          : "from-left",
        direction: moment.dir || null,
        relationship: "contrast",
        finalState: "both-readable"
      };
    }

    if (moment.type === "issue") {
      result.issue = {
        entrance: "interruption",
        emphasis: "problem",
        accent: "brief",
        finalState: "visible"
      };
    }

    if (moment.type === "formula") {
      result.formula = {
        numerator: "reveal",
        denominator: "reveal",
        fractionBar: "draw",
        finalState: "complete"
      };
    }

    if (moment.type === "item") {
      const n = num(moment.n, NaN);
      const of = num(moment.of, NaN);

      if (
        Number.isFinite(n) &&
        Number.isFinite(of) &&
        of > 0
      ) {
        result.progress = {
          n: clamp(Math.trunc(n), 0, Math.trunc(of)),
          of: Math.trunc(of),
          ratio: clamp(n / of, 0, 1),
          animation: "progress-fill"
        };
      }
    }

    if (moment.type === "question") {
      result.question = {
        preserveText: true,
        focus: "decision",
        hold: .6,
        answerReveal: false
      };
    }

    if (
      moment.type === "title" ||
      moment.type === "statement"
    ) {
      result.typography = {
        key: OWN.call(moment, "key")
          ? moment.key
          : null,
        entrance: base.entrance,
        finalState: "visible"
      };
    }

    if (SECTION_DIRECTION[sectionId]) {
      result.sectionEffect =
        SECTION_DIRECTION[sectionId].effect;
    }

    return result;
  }

  /*
   * NULL-LINE MICRO-BEATS
   *
   * A null narration line is not converted into a semantic moment.
   * It simply receives optional direction for the cinematic engine.
   *
   * The retained visual remains the same.
   */

  function buildMicroBeats(lines, moments) {
    if (!Array.isArray(lines)) return [];

    const starts = new Set(
      moments.map(moment => moment.at)
    );

    const result = [];

    let previous = null;
    let consecutive = 0;

    lines.forEach((line, at) => {
      if (!Array.isArray(line)) return;

      if (starts.has(at)) {
        const current = moments.filter(m => m.at === at);
        previous = current.at(-1) || previous;
        consecutive = 0;
        return;
      }

      if (line[1] != null) return;
      if (!previous) return;

      consecutive++;

      const type = previous.type;
      const focus = consecutive % 3;

      const action = type === "diagram"
        ? "retrace-meaningful-route"
        : type === "issue"
          ? "hold-problem"
          : type === "compare"
            ? "refocus-contrast"
            : type === "question"
              ? "hold-decision"
              : type === "item"
                ? "reinforce-progress"
                : "subtle-emphasis";

      result.push({
        at,
        retainsPreviousVisual: true,
        previousType: type,
        action,
        focus,
        duration: .4,
        reducedMotion: "no-animation",
        optional: true
      });
    });

    return result;
  }

  /*
   * CINEMATIC BEAT PLAN
   *
   * Beat labels describe desired meaning.
   * They are not treated as source facts or forced onto unrelated lines.
   *
   * A future course revision may supply an explicit moment.cinematic
   * field to bind a beat directly to its narration line.
   */

  function buildBeatPlan(sectionId, moments) {
    const direction = SECTION_DIRECTION[sectionId];

    if (!direction) return [];

    const explicit = moments.filter(moment =>
      moment.cinematic &&
      typeof moment.cinematic === "object"
    );

    if (explicit.length) {
      return explicit.map(moment => ({
        at: moment.at,
        type: moment.type,
        effect: moment.cinematic.effect ||
          direction.effect,
        signature: moment.cinematic.signature ||
          direction.signature,
        focus: moment.cinematic.focus ?? null,
        duration: num(
          moment.cinematic.duration,
          TYPE_DIRECTION[moment.type]?.duration || 1
        ),
        reducedMotion: "final-state"
      }));
    }

    return moments
      .filter(moment =>
        moment.type === "diagram" ||
        moment.type === "issue" ||
        moment.type === "compare" ||
        moment.type === "title"
      )
      .map((moment, index) => ({
        at: moment.at,
        type: moment.type,
        effect: direction.effect,
        signature: direction.signature,
        beat: direction.beats[
          Math.min(index, direction.beats.length - 1)
        ],
        duration:
          TYPE_DIRECTION[moment.type]?.duration || 1,
        inferredDirection: true,
        reducedMotion: "final-state"
      }));
  }

  /*
   * REGISTER MAIN LESSONS
   */

  if (COURSE && Array.isArray(COURSE.lessons)) {
    COURSE.lessons.forEach(lesson => {
      if (!lesson || !Array.isArray(lesson.sections)) {
        return;
      }

      lesson.sections.forEach((section, sectionIndex) => {
        const key = `${lesson.id}:${sectionIndex}`;
        const moments = register(key, section?.lines);

        const sectionId = text(section?.sec);

        if (!WEEK10.test(sectionId)) return;

        const direction = SECTION_DIRECTION[sectionId];

        CINEMATIC_MOMENTS[key] = {
          sectionId,
          lessonId: lesson.id,
          sectionIndex,
          effect: direction?.effect || "semantic-build",
          signature: direction?.signature || null,
          visualThesis: direction?.visualThesis || null,
          pace: direction?.pace || "teaching",
          accentPolicy: direction?.accentPolicy || "selective",
          beats: buildBeatPlan(sectionId, moments),
          moments: moments.map((moment, index) =>
            describeMoment(moment, sectionId, index)
          ),
          microBeats: buildMicroBeats(
            section?.lines,
            moments
          ),
          reducedMotion: "final-state",
          optional: true
        };

        /*
         * Some course versions keep remedials inside section.review.
         * Others use ADAPTIVE.review.
         *
         * Both are supported without duplicating semantic moments.
         */

        if (Array.isArray(section.review)) {
          section.review.forEach((review, reviewIndex) => {
            const reviewKey =
              `review:${sectionId}:${reviewIndex}`;

            if (!OWN.call(M, reviewKey)) {
              register(reviewKey, review?.lines);
            }

            const reviewMoments = M[reviewKey] || [];

            CINEMATIC_MOMENTS[reviewKey] = {
              sectionId,
              lessonId: lesson.id,
              reviewIndex,
              effect: "remedial-decision-story",
              signature: direction?.signature || null,
              visualThesis: direction?.visualThesis || null,
              pace: "short-decision-story",
              beats: buildBeatPlan(
                sectionId,
                reviewMoments
              ),
              moments: reviewMoments.map((moment, index) =>
                describeMoment(moment, sectionId, index)
              ),
              microBeats: buildMicroBeats(
                review?.lines,
                reviewMoments
              ),
              reducedMotion: "final-state",
              optional: true
            };
          });
        }
      });
    });
  }

  /*
   * REGISTER ADAPTIVE REVIEWS
   *
   * This registration is deliberately separate because ADAPTIVE
   * may exist even when reviews are not embedded in COURSE.
   */

  if (
    ADAPTIVE &&
    ADAPTIVE.review &&
    typeof ADAPTIVE.review === "object"
  ) {
    Object.entries(ADAPTIVE.review).forEach(
      ([sectionId, reviews]) => {
        if (!Array.isArray(reviews)) return;

        reviews.forEach((review, reviewIndex) => {
          const key =
            `review:${sectionId}:${reviewIndex}`;

          const moments = register(
            key,
            review?.lines
          );

          if (!WEEK10.test(sectionId)) return;

          const direction =
            SECTION_DIRECTION[sectionId];

          CINEMATIC_MOMENTS[key] = {
            sectionId,
            reviewIndex,
            effect: "remedial-decision-story",
            signature: direction?.signature || null,
            visualThesis: direction?.visualThesis || null,
            pace: "short-decision-story",
            beats: buildBeatPlan(sectionId, moments),
            moments: moments.map((moment, index) =>
              describeMoment(moment, sectionId, index)
            ),
            microBeats: buildMicroBeats(
              review?.lines,
              moments
            ),
            reducedMotion: "final-state",
            optional: true
          };
        });
      }
    );
  }

  /*
   * OPTIONAL METADATA ACCESS
   *
   * Consumers may inspect cinematic direction without mutating
   * the semantic MOMENTS registry.
   */

  function getCinematic(key) {
    return CINEMATIC_MOMENTS[key] || null;
  }

  function getMoment(key, at) {
    const moments = M[key];

    if (!Array.isArray(moments)) return [];

    return moments.filter(moment =>
      moment.at === at
    );
  }

  function getMicroBeat(key, at) {
    const entry = CINEMATIC_MOMENTS[key];

    if (!entry) return null;

    return entry.microBeats.find(beat =>
      beat.at === at
    ) || null;
  }

  function getSectionDirection(sectionId) {
    return SECTION_DIRECTION[sectionId] || null;
  }

  /*
   * INTEGRITY CHECKS
   *
   * These checks are observational.
   * They do not rewrite narration or change assessment objects.
   */

  function validate() {
    const issues = [];

    Object.entries(M).forEach(([key, moments]) => {
      let previous = -1;

      moments.forEach(moment => {
        if (!VALID_TYPES.has(moment.type)) {
          issues.push({
            key,
            at: moment.at,
            issue: "invalid-moment-type"
          });
        }

        if (!Number.isInteger(moment.at) || moment.at < 0) {
          issues.push({
            key,
            at: moment.at,
            issue: "invalid-narration-index"
          });
        }

        if (moment.at < previous) {
          issues.push({
            key,
            at: moment.at,
            issue: "out-of-order-moment"
          });
        }

        previous = moment.at;
      });
    });

    return {
      valid: issues.length === 0,
      issues
    };
  }

  /*
   * PUBLIC INTERFACES
   *
   * window.MOMENTS remains exactly the expected semantic registry.
   *
   * The cinematic metadata is exposed separately, allowing the
   * Week 10 engine to use it without affecting the four looks.
   */

  window.MOMENTS = M;

  window.WEEK10_CINEMATIC_MOMENTS =
    CINEMATIC_MOMENTS;

  window.W10_MOMENT_DIRECTION = Object.freeze({
    version: "2.0.0",
    sections: SECTION_DIRECTION,
    types: TYPE_DIRECTION,
    getCinematic,
    getMoment,
    getMicroBeat,
    getSectionDirection,
    validate
  });

})();