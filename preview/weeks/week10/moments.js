(() => {
  "use strict";

  /*
   * VoiceLearn · OPER621 · Week 10
   * THE PEOPLE PHASE — MOMENTS DIRECTOR
   * Version 3.0.1
   *
   * Corrected release:
   * - Fixes the unexpected closing parenthesis in W10O3a.
   * - Preserves window.MOMENTS and all narration indices.
   * - Registers all 12 sections, including W10O2d.
   * - Registers both remedial lessons for every section.
   * - Never changes COURSE, ADAPTIVE, questions or question IDs.
   * - Provides cinematic direction to cinematics.js.
   * - Preserves existing look colours.
   * - Supports reduced motion and deterministic seeking.
   * - Reports missing sections and remedials without inventing them.
   *
   * IMPORTANT:
   * This file does not manufacture missing course sections.
   * The corrected course.js must contain all 12 section objects,
   * each with exactly two remedial lessons.
   */

  const VERSION = "3.0.1";
  const COURSE = window.COURSE;
  const ADAPTIVE = window.ADAPTIVE;
  const OWN = Object.prototype.hasOwnProperty;

  const M = Object.create(null);
  const DIRECTED = Object.create(null);
  const REGISTRY = Object.create(null);

  const VALID_TYPES = new Set([
    "title", "item", "question", "formula",
    "issue", "compare", "statement", "diagram"
  ]);

  const SECTION_IDS = Object.freeze([
    "W10O1a", "W10O1b", "W10O1c",
    "W10O2a", "W10O2b", "W10O2c", "W10O2d",
    "W10O3a", "W10O3b", "W10O3c",
    "W10O3d", "W10O3e"
  ]);

  const SECTION_SET = new Set(SECTION_IDS);

  const EXPECTED_LESSONS = Object.freeze({
    W10O1a: "l1",
    W10O1b: "l1",
    W10O1c: "l1",
    W10O2a: "l2",
    W10O2b: "l2",
    W10O2c: "l2",
    W10O2d: "l4",
    W10O3a: "l3",
    W10O3b: "l3",
    W10O3c: "l3",
    W10O3d: "l4",
    W10O3e: "l4"
  });

  const number = (value, fallback = 0) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  };

  const clamp = (value, low, high) =>
    Math.max(low, Math.min(high, value));

  const str = value =>
    value == null ? "" : String(value);

  const lower = value => str(value).toLowerCase();

  const has = (value, pattern) =>
    pattern.test(str(value));

  const freeze = Object.freeze;

  function reducedMotion() {
    try {
      return Boolean(
        window.LAB?.reducedMotion?.() ||
        window.matchMedia?.(
          "(prefers-reduced-motion: reduce)"
        )?.matches
      );
    } catch (_) {
      return false;
    }
  }

  /*
   * 1. SECTION STORIES
   *
   * Each section has one visual argument.
   * Repeated signatures should evolve rather than rebuild.
   */

  const SECTIONS = freeze({
    W10O1a: freeze({
      title: "The role enters the lobby",
      effect: "role-transformation",
      signature: "lobby-and-hosts",
      thesis: "The kiosk works. The person beside it needs a workable job.",
      pace: "cold-open",
      visualBudget: 5,
      protagonist: "Layla",
      protagonistStatus: "illustrative",
      climax: "twenty-two-hosts",
      closing: "unresolved-human-decision",
      beats: [
        "arrival",
        "rate-interruption",
        "human-decision",
        "old-role-new-role",
        "twenty-two-hosts",
        "people-phase"
      ]
    }),

    W10O1b: freeze({
      title: "Five conditions for readiness",
      effect: "readiness-assembly",
      signature: "five-slot-readiness",
      thesis: "Five connected conditions matter more than five green ticks.",
      pace: "progressive-build",
      visualBudget: 4,
      climax: "five-slots-connected",
      closing: "readiness-challenge",
      beats: [
        "empty-board",
        "role-slot",
        "authority-slot",
        "measures-slot",
        "capability-slot",
        "adoption-slot",
        "connected-system"
      ]
    }),

    W10O1c: freeze({
      title: "Who does the work?",
      effect: "raci-reveal",
      signature: "raci-matrix",
      thesis: "Doing the work is not the same as owning the result.",
      pace: "decision-investigation",
      visualBudget: 5,
      climax: "missing-accountable-owner",
      closing: "responsibility-versus-authority",
      beats: [
        "guest-problem",
        "responsible",
        "accountable",
        "consulted",
        "informed",
        "missing-owner",
        "formal-delegation"
      ]
    }),

    W10O2a: freeze({
      title: "The AED 400 decision",
      effect: "authority-simulation",
      signature: "authority-dial",
      thesis: "The same amount leads to different decisions when authority changes.",
      pace: "signature-simulation",
      visualBudget: 4,
      climax: "same-amount-new-authority",
      closing: "decision-boundary",
      beats: [
        "illustrative-320",
        "eligibility-check",
        "email-only",
        "escalation",
        "delegation-approved",
        "local-resolution",
        "illustrative-460",
        "legitimate-escalation",
        "ineligible-case"
      ]
    }),

    W10O2b: freeze({
      title: "The scorecard punishes the right work",
      effect: "incentive-rebalance",
      signature: "scorecard-scale",
      thesis: "The old scorecard can punish the work the redesign needs.",
      pace: "cause-and-reversal",
      visualBudget: 5,
      climax: "complex-work-falls",
      closing: "reward-the-real-job",
      beats: [
        "difficult-case",
        "old-scorecard",
        "complex-work-disadvantaged",
        "balanced-measures",
        "quality-safeguard",
        "new-scorecard"
      ]
    }),

    W10O2c: freeze({
      title: "Write the real job",
      effect: "role-specification",
      signature: "living-role-card",
      thesis: "A badge cannot replace a job description.",
      pace: "document-transformation",
      visualBudget: 4,
      climax: "three-week-delay",
      closing: "written-versus-real-job",
      beats: [
        "old-role",
        "new-badge",
        "three-week-delay",
        "responsibilities",
        "decision-rights",
        "accountability",
        "capability",
        "performance"
      ]
    }),

    W10O2d: freeze({
      title: "Repair the Guest Host",
      effect: "role-repair",
      signature: "repair-checklist",
      thesis: "Repair the operating system around the job.",
      pace: "decisive-assembly",
      visualBudget: 4,
      climax: "five-repairs-connected",
      closing: "choose-first-repair",
      beats: [
        "confirmed-contradictions",
        "role-repair",
        "authority-repair",
        "measures-repair",
        "capability-repair",
        "adoption-repair",
        "priority-decision"
      ]
    }),

    W10O3a: freeze({
      title: "Twenty-two attended",
      effect: "capability-evidence",
      signature: "twenty-two-hosts",
      thesis: "Attendance was recorded. Decision capability was not assessed.",
      pace: "evidence-reveal",
      visualBudget: 5,
      climax: "nine-referrals",
      closing: "assessment-versus-attendance",
      beats: [
        "twenty-two-attended",
        "assessment-missing",
        "nine-referrals",
        "causes-unknown",
        "diagnostic-fork",
        "practical-assessment"
      ]
    }),

    W10O3b: freeze({
      title: "The lobby runs two processes",
      effect: "adoption-simulation",
      signature: "two-process-lobby",
      thesis: "The installed process and the actual process are not identical.",
      pace: "spatial-investigation",
      visualBudget: 5,
      climax: "permanent-desk-returns",
      closing: "explain-the-routes",
      beats: [
        "lobby-opens",
        "kiosk-65",
        "desk-29",
        "remainder-unreported",
        "legitimate-alternative",
        "possible-workaround",
        "desk-reinstated",
        "reason-investigation"
      ]
    }),

    W10O3c: freeze({
      title: "The knowledge people carry",
      effect: "knowledge-transfer",
      signature: "knowledge-iceberg",
      thesis: "A procedure cannot preserve judgement nobody has explained.",
      pace: "reflective-reveal",
      visualBudget: 4,
      climax: "hidden-knowledge-surfaced",
      closing: "share-the-reasoning",
      beats: [
        "written-rule",
        "hidden-judgement",
        "worked-example",
        "peer-learning",
        "two-departures",
        "motives-unknown",
        "knowledge-transfer"
      ]
    }),

    W10O3d: freeze({
      title: "Turn the dashboard over",
      effect: "evidence-board",
      signature: "dashboard-flip",
      thesis: "A green project milestone can conceal unanswered operating questions.",
      pace: "keynote-reveal",
      visualBudget: 4,
      climax: "dashboard-flip",
      closing: "evidence-before-intervention",
      beats: [
        "green-dashboard",
        "turn-over",
        "kiosk-65",
        "desk-29",
        "nine-referrals",
        "capability-not-assessed",
        "two-departures",
        "confirmed-versus-hypothesis",
        "first-decision"
      ]
    }),

    W10O3e: freeze({
      title: "The handover that changes tomorrow",
      effect: "controlled-handover",
      signature: "develop-handover",
      thesis: "The next guest needs an authorised decision, not another project milestone.",
      pace: "cinematic-finale",
      visualBudget: 5,
      climax: "supported-guest-decision",
      closing: "people-to-develop",
      beats: [
        "return-to-guest",
        "role-definition",
        "decision-rights",
        "capability-evidence",
        "aligned-measures",
        "open-issues",
        "develop-gate",
        "intended-future",
        "guest-resolution"
      ]
    })
  });

  /*
   * 2. SEMANTIC MOTION GRAMMAR
   */

  const TYPES = freeze({
    title: freeze({
      animation: "scene-arrival",
      entrance: "reveal-heading",
      duration: 0.65,
      emphasis: "new-story",
      finalState: "fully-visible"
    }),

    item: freeze({
      animation: "slot-activation",
      entrance: "increment",
      duration: 0.48,
      emphasis: "one-new-condition",
      finalState: "item-visible"
    }),

    question: freeze({
      animation: "decision-focus",
      entrance: "quiet-focus",
      duration: 0.58,
      emphasis: "learner-choice",
      finalState: "question-readable"
    }),

    formula: freeze({
      animation: "relationship-build",
      entrance: "numerator-denominator",
      duration: 0.75,
      emphasis: "meaning-of-measure",
      finalState: "complete-formula"
    }),

    issue: freeze({
      animation: "contradiction-reveal",
      entrance: "interruption",
      duration: 0.55,
      emphasis: "broken-expectation",
      finalState: "problem-visible"
    }),

    compare: freeze({
      animation: "contrast-replacement",
      entrance: "opposing-position",
      duration: 0.60,
      emphasis: "what-changed",
      finalState: "comparison-readable"
    }),

    statement: freeze({
      animation: "key-phrase-underline",
      entrance: "meaning-first",
      duration: 0.55,
      emphasis: "one-clear-idea",
      finalState: "statement-readable"
    }),

    diagram: freeze({
      animation: "semantic-choreography",
      entrance: "teaching-order",
      duration: 1.25,
      emphasis: "decision-or-consequence",
      finalState: "complete-diagram"
    })
  });

  /*
   * 3. SIGNATURE TRANSITION CONTRACTS
   */

  const SIGNATURES = freeze({
    "lobby-and-hosts": {
      entrance: "arrival-interrupted",
      transition: "role-change",
      persistent: true,
      finalState: "guest-and-host-visible"
    },

    "five-slot-readiness": {
      entrance: "empty-board",
      transition: "activate-next-slot",
      persistent: true,
      finalState: "five-connected-conditions"
    },

    "raci-matrix": {
      entrance: "matrix-cells",
      transition: "cell-difference",
      persistent: true,
      finalState: "accountability-readable"
    },

    "authority-dial": {
      entrance: "amount-and-boundary",
      transition: "same-dial-new-decision",
      persistent: true,
      finalState: "amount-rule-route-readable"
    },

    "scorecard-scale": {
      entrance: "weights-land",
      transition: "beam-rebalance",
      persistent: true,
      finalState: "old-or-new-incentive-readable"
    },

    "living-role-card": {
      entrance: "old-description",
      transition: "rewrite-field",
      persistent: true,
      finalState: "complete-role-readable"
    },

    "repair-checklist": {
      entrance: "unrepaired-system",
      transition: "one-repair-tick",
      persistent: true,
      finalState: "selected-repairs-readable"
    },

    "twenty-two-hosts": {
      entrance: "cast-appears",
      transition: "dot-state-difference",
      persistent: true,
      finalState: "all-twenty-two-positions-visible"
    },

    "two-process-lobby": {
      entrance: "lobby-reveal",
      transition: "route-divergence",
      persistent: true,
      finalState: "reported-channels-and-unknowns-visible"
    },

    "knowledge-iceberg": {
      entrance: "waterline",
      transition: "knowledge-surfaces",
      persistent: true,
      finalState: "written-and-experiential-knowledge-visible"
    },

    "dashboard-flip": {
      entrance: "reported-status",
      transition: "turn-over-and-reveal",
      persistent: true,
      finalState: "status-and-operating-evidence-readable"
    },

    "develop-handover": {
      entrance: "people-outputs",
      transition: "controlled-transfer",
      persistent: true,
      finalState: "handover-and-open-issues-visible"
    }
  });

  /*
   * 4. EVIDENCE CONTRACT
   *
   * Illustrative examples must not be presented as observations.
   */

  const EVIDENCE = freeze({
    observed: freeze({
      guestHosts: 22,
      pilotProperties: 4,
      kioskAdoption: 65,
      deskHandling: 29,
      alwaysRefer: 9,
      inductionAttendees: 22,
      inductionHours: 4,
      capabilityAssessmentConducted: false,
      roleDescriptionDelayWeeks: 3,
      communicatedWaiverAED: 400,
      waiverFormallyDelegated: false,
      resignations: 2,
      permanentDeskReinstatedProperties: 1
    }),

    illustrative: freeze({
      localExampleAED: 320,
      escalationExampleAED: 460,
      protagonist: "Layla",
      guest: "Mr Haddad",
      individualDotPositions: true,
      simulatedLobbyMovement: true
    }),

    unknown: freeze([
      "Individual reasons for the nine referral patterns",
      "Individual reasons for the two resignations",
      "Unreported arrival-channel classification",
      "Cause of the permanent desk reinstatement",
      "Individual capability assessment results"
    ])
  });

  /*
   * 5. MOMENT REGISTRATION
   */

  function normalizeMoment(raw, at) {
    if (!raw || typeof raw !== "object") return null;

    const moment = Object.assign({}, raw);
    moment.at = at;

    if (!VALID_TYPES.has(moment.type)) {
      moment.type = "statement";
      moment.text = str(
        moment.text || moment.title || moment.note || ""
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
   * 6. DIAGRAM IDENTIFICATION
   */

  function svgAttribute(svg, attribute) {
    if (typeof svg !== "string") return "";

    const pattern = new RegExp(
      "\\b" + attribute + "\\s*=\\s*[^\"']+[\"']",
      "i"
    );

    return svg.match(pattern)?.[1] || "";
  }

  function diagramIdentity(moment) {
    if (moment?.type !== "diagram") return null;

    const svg = str(moment.svg);

    const signature = svgAttribute(
      svg, "data-w10-signature"
    );

    const kind = svgAttribute(
      svg, "data-w10-kind"
    );

    if (signature || kind) {
      return {
        kind: kind || signature,
        signature: signature || kind,
        bespoke: true
      };
    }

    return {
      kind: "generic",
      signature: null,
      bespoke: false
    };
  }

  /*
   * 7. CONTENT-GROUNDED BEAT DETECTION
   *
   * Every beat is associated with actual narration or a moment.
   */

  function detectBeat(sectionId, spoken, moment) {
    const s = lower(spoken);

    const v = lower([
      moment?.kicker,
      moment?.title,
      moment?.text,
      moment?.label,
      moment?.caption
    ].filter(Boolean).join(" "));

    const combined = s + " " + v;

    if (moment?.type === "question") {
      return "learner-decision";
    }

    switch (sectionId) {
      case "W10O1a":
        if (/twenty.two|22 guest hosts/.test(combined))
          return "twenty-two-hosts";
        if (/rate|discrepancy/.test(combined))
          return "rate-interruption";
        if (/front desk agent|former role/.test(combined))
          return "old-role";
        if (/guest host|new role/.test(combined))
          return "role-transformation";
        if (/people phase|sixth phase/.test(combined))
          return "people-phase";
        return "arrival";

      case "W10O1b":
        if (moment?.type === "item") {
          const slots = [
            "role-slot",
            "authority-slot",
            "measures-slot",
            "capability-slot",
            "adoption-slot"
          ];

          return slots[
            clamp(number(moment.n, 1) - 1, 0, 4)
          ];
        }

        if (/five|together|connected/.test(combined))
          return "connected-system";

        return "readiness-question";

      case "W10O1c":
        if (/missing|unassigned|nobody/.test(combined))
          return "missing-owner";
        if (/two managers|two owners/.test(combined))
          return "competing-owners";
        if (/formal delegation|decision authority/.test(combined))
          return "formal-delegation";
        if (/consulted/.test(combined))
          return "consulted";
        if (/informed/.test(combined))
          return "informed";
        if (/accountable/.test(combined))
          return "accountable";
        if (/responsible/.test(combined))
          return "responsible";
        return "cross-functional-decision";

      case "W10O2a":
        if (/460/.test(combined))
          return "illustrative-460";
        if (/ineligible|not eligible|fail.*eligib/.test(combined))
          return "ineligible-case";
        if (
          /formal delegation.*approved|formally approv|after formal/
            .test(combined)
        )
          return "delegation-approved";
        if (/undocumented|email|missing|not.*formal/.test(combined))
          return "email-only";
        if (/eligib/.test(combined))
          return "eligibility-check";
        if (/320/.test(combined))
          return "illustrative-320";
        if (/escalat|refer/.test(combined))
          return "legitimate-escalation";
        return "decision-boundary";

      case "W10O2b":
        if (/quality|sample|safeguard/.test(combined))
          return "quality-safeguard";
        if (/aligned|replacement|proposed|new scorecard/.test(combined))
          return "new-scorecard";
        if (/old|inherited|throughput/.test(combined))
          return "old-scorecard";
        if (/complex|difficult|longer/.test(combined))
          return "complex-work-disadvantaged";
        return "incentive-contrast";

      case "W10O2c":
        if (/three weeks|3 weeks/.test(combined))
          return "three-week-delay";
        if (/grade|reward/.test(combined))
          return "employment-review";
        if (/authority|decision right/.test(combined))
          return "decision-rights";
        if (/capability|skills|judgement/.test(combined))
          return "capability";
        if (/measure|performance/.test(combined))
          return "performance";
        if (/guest host/.test(combined))
          return "new-role";
        return "role-document";

      case "W10O2d":
        if (moment?.type === "item") {
          const repairs = [
            "role-repair",
            "authority-repair",
            "measures-repair",
            "capability-repair",
            "adoption-repair"
          ];

          return repairs[
            clamp(number(moment.n, 1) - 1, 0, 4)
          ];
        }

        if (/priorit|first|starting point/.test(combined))
          return "priority-decision";
        if (/five|complete|connected/.test(combined))
          return "five-repairs-connected";
        return "repair-assembly";

      case "W10O3a":
        if (/nine|9 of 22/.test(combined))
          return "nine-referrals";

        // FIX: Exactly one closing parenthesis for the if condition.
        if (
          /no.*assessment|not assessed|capability was not/
            .test(combined)
        )
          return "assessment-missing";

        if (/twenty.two|22|four.hour/.test(combined))
          return "twenty-two-attended";
        if (/possible|plausible|why|causes/.test(combined))
          return "diagnostic-fork";
        if (/practice|scenario|test|assess/.test(combined))
          return "practical-assessment";
        return "capability-investigation";

      case "W10O3b":
        if (/permanent desk|reinstat/.test(combined))
          return "desk-reinstated";
        if (/65|sixty.five/.test(combined))
          return "kiosk-65";
        if (/29|twenty.nine/.test(combined))
          return "desk-29";
        if (/not reported|remaining/.test(combined))
          return "remainder-unreported";
        if (/legitimate|accessibility|assistance/.test(combined))
          return "legitimate-alternative";
        if (/workaround|old path|bypass/.test(combined))
          return "possible-workaround";
        return "lobby-investigation";

      case "W10O3c":
        if (/two guest hosts|two resign|departur/.test(combined))
          return "two-departures";
        if (/reason.*unknown|motives.*unknown/.test(combined))
          return "motives-unknown";
        if (/worked example/.test(combined))
          return "worked-example";
        if (/peer|share|discussion/.test(combined))
          return "peer-learning";
        if (/experience|hidden|judgement/.test(combined))
          return "hidden-judgement";
        return "written-rule";

      case "W10O3d":
        if (/turn.*dashboard|turn.*over/.test(combined))
          return "turn-over";
        if (/65|sixty.five/.test(combined))
          return "kiosk-65";
        if (/29|twenty.nine/.test(combined))
          return "desk-29";
        if (/nine|9 of 22/.test(combined))
          return "nine-referrals";
        if (/capability.*not|no.*assessment/.test(combined))
          return "capability-not-assessed";
        if (/two.*resign|two.*depart/.test(combined))
          return "two-departures";
        if (/hypothes|possible explanation/.test(combined))
          return "confirmed-versus-hypothesis";
        if (/repair|first response|first decision/.test(combined))
          return "first-decision";
        return "green-dashboard";

      case "W10O3e":
        if (/develop|handover/.test(combined))
          return "develop-gate";
        if (/next traveller|next guest|future scenario/.test(combined))
          return "intended-future";
        if (/guest.*decision|decision.*guest|guest.*wait/.test(combined))
          return "guest-resolution";
        if (/open issue|unresolved/.test(combined))
          return "open-issues";
        if (/authority|decision rights/.test(combined))
          return "decision-rights";
        if (/capability/.test(combined))
          return "capability-evidence";
        if (/measure/.test(combined))
          return "aligned-measures";
        return "controlled-handover";

      default:
        return "semantic-beat";
    }
  }

  /*
   * 8. TRANSITION POLICY
   */

  function transitionFor(moment, previous, sectionId, beat) {
    const identity = diagramIdentity(moment);

    if (moment.type !== "diagram") {
      return {
        mode: "semantic",
        animation: TYPES[moment.type]?.animation ||
          "key-phrase-underline"
      };
    }

    const prior = previous
      ? diagramIdentity(previous)
      : null;

    const sameKind = Boolean(
      identity &&
      prior &&
      identity.kind === prior.kind &&
      identity.kind !== "generic"
    );

    if (sameKind) {
      return {
        mode: "diff",
        animation: "state-difference",
        matchBy: "data-w10-key",
        fallbackMatchBy: "data-w10-role",
        preserveUnchanged: true,
        rebuild: false
      };
    }

    if (
      identity?.signature === "authority-dial" &&
      sectionId !== "W10O2a"
    ) {
      return {
        mode: "callback",
        animation: "authority-mini",
        fullBuild: false,
        preserveFinalState: true
      };
    }

    if (
      identity?.signature === "twenty-two-hosts" &&
      previous
    ) {
      return {
        mode: "state",
        animation: "dot-state-difference",
        rebuild: false,
        preserveUnchanged: true
      };
    }

    return {
      mode: "build",
      animation: identity?.signature ||
        "semantic-diagram-build",
      signature: identity?.signature || null,
      beat,
      buildOnlyMeaningfulElements: true
    };
  }

  /*
   * 9. MOMENT DESCRIPTION
   */

  function describeMoment(
    moment, sectionId, index, spoken, previous
  ) {
    const base = TYPES[moment.type] || TYPES.statement;
    const beat = detectBeat(sectionId, spoken, moment);
    const identity = diagramIdentity(moment);

    const result = {
      at: moment.at,
      index,
      type: moment.type,
      beat,
      animation: base.animation,
      duration: base.duration,
      entrance: base.entrance,
      emphasis: base.emphasis,
      finalState: base.finalState,
      reducedMotion: "final-state",
      optional: true,
      blocking: false,
      transition: transitionFor(
        moment, previous, sectionId, beat
      )
    };

    if (identity) {
      result.diagram = {
        kind: identity.kind,
        signature: identity.signature,
        bespoke: identity.bespoke,
        build: "semantic-order",
        connectors: "meaningful-path-only",
        token: "decision-route-only",
        counters: "observed-values-only",
        finalState: "complete",
        avoidDecorativeMotion: true
      };
    }

    if (moment.type === "compare") {
      result.compare = {
        side: moment.side || "a",
        direction: moment.dir || null,
        entrance: moment.side === "b"
          ? "from-right"
          : "from-left",
        demotePrevious: moment.side === "b",
        demotedOpacity: 0.45,
        demotedOffsetY: 6,
        yoyo: false,
        finalState: "both-readable"
      };
    }

    if (moment.type === "item") {
      const n = number(moment.n, NaN);
      const of = number(moment.of, NaN);

      if (
        Number.isFinite(n) &&
        Number.isFinite(of) &&
        of > 0
      ) {
        result.progress = {
          n: clamp(Math.trunc(n), 0, Math.trunc(of)),
          of: Math.trunc(of),
          ratio: clamp(n / of, 0, 1),
          animation: "activate-one-slot",
          preservePreviousSlots: true
        };
      }
    }

    if (moment.type === "question") {
      result.question = {
        preserveText: true,
        preserveId: true,
        answerReveal: false,
        focus: "learner-decision",
        hold: 0,
        neverAutoAdvance: true
      };
    }

    if (moment.type === "statement") {
      result.typography = {
        animation: "key-phrase-underline",
        key: OWN.call(moment, "key")
          ? moment.key
          : null,
        inferKeyOnlyWhenSafe: true,
        preserveText: true,
        useLookAccent: true,
        finalState: "fully-readable"
      };
    }

    if (moment.type === "issue") {
      result.issue = {
        animation: "contradiction-reveal",
        shake: false,
        accent: "brief",
        finalState: "problem-readable"
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

    if (SECTION_SET.has(sectionId)) {
      result.sectionEffect = SECTIONS[sectionId].effect;
      result.sectionSignature = SECTIONS[sectionId].signature;
    }

    return result;
  }

  /*
   * 10. MICRO-BEATS
   *
   * Null narration moments retain the previous visual.
   */

  const MICRO_ACTIONS = freeze({
    "authority-dial": "retick-decision-marker",
    "twenty-two-hosts": "emphasise-relevant-dots",
    "scorecard-scale": "rebalance-beam-once",
    "knowledge-iceberg": "waterline-ripple",
    "two-process-lobby": "follow-one-guest-route",
    "dashboard-flip": "focus-next-evidence-card",
    "raci-matrix": "focus-accountability-cell",
    "five-slot-readiness": "focus-current-slot",
    "living-role-card": "underline-changed-field",
    "repair-checklist": "focus-current-repair",
    "develop-handover": "follow-handover-route",
    "lobby-and-hosts": "focus-guest-host",
    "evidence-board": "focus-evidence-card",
    "readiness-board": "focus-readiness-gap",
    "capability": "focus-assessment-gate",
    "raci": "focus-accountable-role",
    "adoption": "follow-reported-route",
    "repair": "focus-current-repair"
  });

  function microAction(previous, spoken, sectionId) {
    const identity = diagramIdentity(previous);
    const signature = identity?.signature || identity?.kind;

    if (signature && MICRO_ACTIONS[signature]) {
      return MICRO_ACTIONS[signature];
    }

    const s = lower(spoken);

    if (/nine|9 of 22/.test(s))
      return "emphasise-relevant-dots";

    if (/authority|delegation|limit/.test(s))
      return "focus-decision-boundary";

    if (/scorecard|measure|incentive/.test(s))
      return "focus-measure-conflict";

    if (/evidence|assess|capability/.test(s))
      return "focus-evidence-gap";

    if (/guest|arrival|lobby/.test(s))
      return "follow-guest-decision";

    if (/knowledge|experience|reasoning/.test(s))
      return "focus-knowledge-transfer";

    if (/owner|accountab/.test(s))
      return "focus-accountable-role";

    if (sectionId === "W10O3e")
      return "focus-handover-consequence";

    return "hold";
  }

  function buildMicroBeats(lines, moments, sectionId) {
    if (!Array.isArray(lines)) return [];

    const starts = new Map();

    moments.forEach(moment => {
      if (!starts.has(moment.at)) {
        starts.set(moment.at, []);
      }

      starts.get(moment.at).push(moment);
    });

    const result = [];
    let previous = null;
    let retainedFrom = -1;

    lines.forEach((line, at) => {
      if (!Array.isArray(line)) return;

      if (starts.has(at)) {
        const group = starts.get(at);
        previous = group[group.length - 1];
        retainedFrom = at;
        return;
      }

      if (line[1] != null || !previous) return;

      const action = microAction(
        previous, line[0], sectionId
      );

      result.push({
        at,
        retainedFrom,
        retainsPreviousVisual: true,
        previousType: previous.type,
        action,
        focus: detectBeat(
          sectionId, line[0], previous
        ),
        duration: action === "hold" ? 0 : 0.42,
        reducedMotion: "no-animation",
        optional: true,
        blocking: false,
        neverReplaceVisual: true
      });
    });

    return result;
  }

  /*
   * 11. CONTENT-GROUNDED BEAT PLAN
   */

  function buildBeatPlan(
    sectionId, lines, moments, isReview = false
  ) {
    const direction = SECTIONS[sectionId];

    return moments.map((moment, index) => {
      const spoken = str(lines?.[moment.at]?.[0]);
      const beat = detectBeat(
        sectionId, spoken, moment
      );

      const explicit = (
        moment.cinematic &&
        typeof moment.cinematic === "object"
      ) ? moment.cinematic : {};

      const base = TYPES[moment.type] || TYPES.statement;

      return {
        at: moment.at,
        index,
        type: moment.type,
        beat: explicit.beat || beat,
        effect: explicit.effect ||
          (isReview
            ? "remedial-decision-story"
            : direction?.effect || "semantic-build"),
        signature: explicit.signature ||
          diagramIdentity(moment)?.signature ||
          direction?.signature || null,
        focus: explicit.focus ?? beat,
        duration: clamp(
          number(explicit.duration, base.duration),
          0,
          2.5
        ),
        reducedMotion: "final-state",
        optional: true,
        inferredDirection: !Object.keys(explicit).length,
        blocking: false
      };
    });
  }

  /*
   * 12. VISUAL REPETITION AUDIT
   */

  function visualAudit(moments, sectionId) {
    const counts = Object.create(null);
    let repeated = 0;
    let previous = null;

    moments.forEach(moment => {
      const identity = diagramIdentity(moment);
      if (!identity) return;

      const name = identity.signature ||
        identity.kind || "generic";

      counts[name] = (counts[name] || 0) + 1;

      if (
        previous &&
        previous.kind === identity.kind &&
        identity.kind !== "generic"
      ) {
        repeated++;
      }

      previous = identity;
    });

    return {
      sectionId,
      counts,
      repeatedKindTransitions: repeated,
      visualBudget: SECTIONS[sectionId]?.visualBudget ?? null,
      recommendation:
        "Use state differences and callbacks before adding full builds."
    };
  }

  /*
   * 13. REMEDIAL WORLD DETECTION
   *
   * Preserve original remedial narratives.
   * Never silently replace their cases or metrics.
   */

  function remedialWorld(title) {
    const s = lower(title);

    const worlds = [
      ["hospital", /hospital|nurse|discharge|medication/],
      ["airport", /airport|boarding|gate agent/],
      ["university", /university|student|enrolment/],
      ["warehouse", /warehouse|picking|paper forms/],
      ["bank", /bank|teller|customer adviser/],
      ["insurance", /insurance|claims/],
      ["logistics", /logistics|delivery/],
      ["maintenance", /maintenance|technician|repair/],
      ["retail", /retailer|refund|return/],
      ["call-centre", /call centre|call center/],
      ["service-centre", /service centre|complaint/],
      ["manufacturing", /manufacturing|plant/],
      ["supplier-payment", /supplier|invoice|payment/],
      ["financial-services", /financial.service|adviser who left/]
    ];

    return worlds.find(([, pattern]) =>
      pattern.test(s)
    )?.[0] || "general-service";
  }

  /*
   * 14. CINEMATIC DIRECTION REGISTRATION
   */

  function buildDirection({
    key,
    sectionId,
    lessonId,
    sectionIndex,
    reviewIndex,
    reviewTitle,
    lines,
    moments
  }) {
    const isReview = Number.isInteger(reviewIndex);
    const section = SECTIONS[sectionId];

    const direction = {
      sectionId,
      lessonId,
      sectionIndex: sectionIndex ?? null,
      reviewIndex: isReview ? reviewIndex : null,
      reviewTitle: isReview ? str(reviewTitle) : null,
      world: isReview
        ? remedialWorld(reviewTitle)
        : "Qasr Hospitality Group",
      illustrativeProtagonist: !isReview
        ? "Layla"
        : null,
      effect: isReview
        ? "remedial-decision-story"
        : section?.effect || "semantic-build",
      signature: section?.signature || null,
      visualThesis: section?.thesis || null,
      pace: isReview
        ? "short-decision-story"
        : section?.pace || "teaching",
      climax: isReview
        ? "learner-decision"
        : section?.climax,
      closing: isReview
        ? "transfer-learning"
        : section?.closing,
      visualBudget: isReview
        ? 3
        : section?.visualBudget ?? 5,
      beats: buildBeatPlan(
        sectionId, lines, moments, isReview
      ),
      moments: moments.map((moment, index) => {
        const previous = index > 0
          ? moments[index - 1]
          : null;

        return describeMoment(
          moment,
          sectionId,
          index,
          lines?.[moment.at]?.[0],
          previous
        );
      }),
      microBeats: buildMicroBeats(
        lines, moments, sectionId
      ),
      audit: visualAudit(moments, sectionId),
      reducedMotion: "final-state",
      optional: true,
      blocking: false,
      palette: "inherit-current-look",
      preserveQuestions: true,
      preserveNarration: true
    };

    DIRECTED[key] = direction;
    return direction;
  }

  /*
   * 15. REGISTER MAIN LESSONS AND EMBEDDED REMEDIALS
   *
   * The course structure is the source of truth.
   */

  if (COURSE && Array.isArray(COURSE.lessons)) {
    COURSE.lessons.forEach(lesson => {
      if (!lesson || !Array.isArray(lesson.sections)) {
        return;
      }

      lesson.sections.forEach((section, sectionIndex) => {
        const key = `${lesson.id}:${sectionIndex}`;
        const sectionId = str(section?.sec);
        const lines = section?.lines;

        const moments = register(key, lines);

        REGISTRY[key] = {
          sectionId,
          lessonId: lesson.id,
          sectionIndex,
          review: false
        };

        if (SECTION_SET.has(sectionId)) {
          buildDirection({
            key,
            sectionId,
            lessonId: lesson.id,
            sectionIndex,
            lines,
            moments
          });
        }

        if (!Array.isArray(section?.review)) return;

        section.review.forEach((review, reviewIndex) => {
          const reviewKey =
            `review:${sectionId}:${reviewIndex}`;

          const reviewMoments = register(
            reviewKey,
            review?.lines
          );

          REGISTRY[reviewKey] = {
            sectionId,
            lessonId: lesson.id,
            reviewIndex,
            review: true
          };

          if (!SECTION_SET.has(sectionId)) return;

          buildDirection({
            key: reviewKey,
            sectionId,
            lessonId: lesson.id,
            reviewIndex,
            reviewTitle: review?.title,
            lines: review?.lines,
            moments: reviewMoments
          });
        });
      });
    });
  }

  /*
   * 16. ADAPTIVE REVIEW COMPATIBILITY
   *
   * Embedded reviews take precedence.
   * Do not overwrite their moments with duplicate adaptive entries.
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

          if (OWN.call(M, key)) return;

          const moments = register(
            key,
            review?.lines
          );

          REGISTRY[key] = {
            sectionId,
            lessonId: EXPECTED_LESSONS[sectionId] || null,
            reviewIndex,
            review: true
          };

          if (!SECTION_SET.has(sectionId)) return;

          buildDirection({
            key,
            sectionId,
            lessonId: EXPECTED_LESSONS[sectionId],
            reviewIndex,
            reviewTitle: review?.title,
            lines: review?.lines,
            moments
          });
        });
      }
    );
  }

  /*
   * 17. PUBLIC LOOKUP API
   */

  function getCinematic(key) {
    return DIRECTED[key] || null;
  }

  function getMoment(key, at) {
    const moments = M[key];
    if (!Array.isArray(moments)) return [];

    return moments.filter(moment =>
      moment.at === at
    );
  }

  function getMicroBeat(key, at) {
    return DIRECTED[key]?.microBeats.find(
      beat => beat.at === at
    ) || null;
  }

  function getSectionDirection(sectionId) {
    return SECTIONS[sectionId] || null;
  }

  function getTransition(key, at) {
    const entry = DIRECTED[key];
    if (!entry) return null;

    return entry.moments.find(
      moment => moment.at === at
    )?.transition || null;
  }

  function getBeat(key, at) {
    return DIRECTED[key]?.beats.find(
      beat => beat.at === at
    ) || null;
  }

  function getSignature(key) {
    return DIRECTED[key]?.signature || null;
  }

  function getVisualAudit(key) {
    return DIRECTED[key]?.audit || null;
  }

  function getReducedDirection(key, at) {
    const entry = DIRECTED[key];
    if (!entry) return null;

    const moment = entry.moments.find(
      item => item.at === at
    );

    return {
      reduced: true,
      animate: false,
      settleCounters: true,
      settleTransitions: true,
      preserveSemanticVisual: true,
      finalState: moment?.finalState || "fully-visible",
      preserveQuestions: true
    };
  }

  /*
   * 18. CINEMATIC ENGINE BRIDGE
   */

  function resolveDirection(key, at) {
    const entry = getCinematic(key);
    if (!entry) return null;

    const moment = entry.moments.find(
      item => item.at === at
    );

    const micro = getMicroBeat(key, at);

    return {
      key,
      at,
      sectionId: entry.sectionId,
      effect: entry.effect,
      signature: entry.signature,
      pace: entry.pace,
      world: entry.world,
      moment: moment || null,
      beat: getBeat(key, at),
      microBeat: micro,
      transition: moment?.transition || null,
      reducedMotion: reducedMotion(),
      finalStateRequired: true,
      blocking: false
    };
  }

  /*
   * 19. INTEGRITY VALIDATION
   *
   * Explicitly verify all 12 sections and 24 remedial lessons.
   * Never invent missing content.
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

        if (
          !Number.isInteger(moment.at) ||
          moment.at < 0
        ) {
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

    if (COURSE && Array.isArray(COURSE.lessons)) {
      const found = [];

      COURSE.lessons.forEach(lesson => {
        if (!Array.isArray(lesson.sections)) return;

        lesson.sections.forEach(section => {
          const id = section.sec;
          found.push(id);

          if (
            SECTION_SET.has(id) &&
            lesson.id !== EXPECTED_LESSONS[id]
          ) {
            issues.push({
              sectionId: id,
              issue: "unexpected-lesson-mapping",
              expected: EXPECTED_LESSONS[id],
              actual: lesson.id
            });
          }

          if (SECTION_SET.has(id)) {
            if (
              !Array.isArray(section.review) ||
              section.review.length !== 2
            ) {
              issues.push({
                sectionId: id,
                issue: "expected-two-remedials",
                actual: Array.isArray(section.review)
                  ? section.review.length
                  : null
              });
            } else {
              section.review.forEach((review, index) => {
                if (!Array.isArray(review?.lines)) {
                  issues.push({
                    sectionId: id,
                    reviewIndex: index,
                    issue: "missing-remedial-narration"
                  });
                }
              });
            }
          }

          if (!Array.isArray(section.lines)) {
            issues.push({
              sectionId: id,
              issue: "missing-narration"
            });
            return;
          }

          section.lines.forEach((line, at) => {
            if (
              !Array.isArray(line) ||
              line.length !== 2
            ) {
              issues.push({
                sectionId: id,
                at,
                issue: "invalid-narration-entry"
              });
              return;
            }

            if (
              typeof line[0] !== "string" ||
              !line[0].trim()
            ) {
              issues.push({
                sectionId: id,
                at,
                issue: "missing-spoken-text"
              });
            }
          });
        });
      });

      SECTION_IDS.forEach(id => {
        const occurrences = found.filter(
          value => value === id
        ).length;

        if (occurrences !== 1) {
          issues.push({
            sectionId: id,
            issue: occurrences === 0
              ? "missing-section"
              : "duplicate-section",
            occurrences
          });
        }
      });

      if (COURSE.lessons.length !== 4) {
        issues.push({
          issue: "expected-four-lessons",
          actual: COURSE.lessons.length
        });
      }
    } else {
      issues.push({
        issue: "course-not-available-at-registration"
      });
    }

    const sectionsDirected = SECTION_IDS.filter(id =>
      Object.values(DIRECTED).some(
        entry =>
          entry.sectionId === id &&
          entry.reviewIndex === null
      )
    ).length;

    const remedialsRegistered = Object.values(REGISTRY)
      .filter(entry =>
        entry.review && SECTION_SET.has(entry.sectionId)
      ).length;

    return {
      valid: issues.length === 0,
      issues,
      sectionsExpected: 12,
      sectionsDirected,
      remedialsExpected: 24,
      remedialsRegistered,
      registeredKeys: Object.keys(M).length,
      reducedMotionSupported: true,
      courseMutated: false
    };
  }

  /*
   * 20. QUESTION INVENTORY
   *
   * Read-only. No question is rewritten or renumbered.
   */

  function questionInventory() {
    const result = Object.create(null);

    Object.entries(M).forEach(([key, moments]) => {
      result[key] = moments
        .filter(moment => moment.type === "question")
        .map(moment => ({
          at: moment.at,
          text: str(moment.text),
          id: moment.id ?? null
        }));
    });

    return result;
  }

  /*
   * 21. PUBLIC CONTRACT
   */

  const API = freeze({
    version: VERSION,

    sections: SECTIONS,
    types: TYPES,
    signatures: SIGNATURES,
    evidence: EVIDENCE,

    getCinematic,
    getMoment,
    getMicroBeat,
    getSectionDirection,
    getTransition,
    getBeat,
    getSignature,
    getVisualAudit,
    getReducedDirection,
    resolveDirection,

    questionInventory,
    validate,
    reducedMotion
  });

  window.MOMENTS = M;
  window.WEEK10_CINEMATIC_MOMENTS = DIRECTED;
  window.W10_MOMENT_DIRECTION = API;

  window.W10_MOMENTS_INTEGRITY = validate();

  /*
   * 22. COMPATIBILITY NOTES
   *
   * cinematics.js should:
   *
   * A. Read resolveDirection(key, at) for each narration step.
   * B. Animate changed SVG attributes using data-w10-key.
   * C. Prefer callbacks over rebuilding repeated diagrams.
   * D. Retain the visual on null narration moments.
   * E. Inherit the current look's colour variables.
   * F. Respect pause, resume, playback rate and seek.
   * G. Display complete final states under reduced motion.
   * H. Distinguish observations from illustrative examples.
   * I. Never interfere with assessment controls.
   * J. Never delay narration to finish an animation.
   * K. Preserve all original question IDs and content.
   * L. Preserve all 12 sections and 24 embedded remedials.
   *
   * Missing sections and reviews must be corrected in course.js.
   * This director reports structural problems; it never hides them.
   */

})();
