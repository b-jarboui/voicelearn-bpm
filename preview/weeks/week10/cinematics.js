(() => {
  "use strict";

  /*
   * VoiceLearn · OPER621 · Week 10
   * THE PEOPLE PHASE — CINEMATIC ENGINE
   *
   * Design principles
   * -----------------
   * 1. Motion explains a decision, consequence, relationship or change.
   * 2. The four existing looks retain their own colours and visual identities.
   * 3. The underlying look remains responsible for semantic rendering.
   * 4. Cinematics never alter narration, question IDs or assessment state.
   * 5. Reduced motion renders complete, intelligible final states.
   * 6. Seeking is deterministic. Replaying never accumulates old animations.
   * 7. GSAP is preferred, but its absence must never break the lesson.
   * 8. Illustrations and inferred quantities are never presented as case facts.
   * 9. No animation is permitted to obstruct controls or spoken content.
   * 10. Every signature visual must communicate without requiring animation.
   */

  const VERSION = "2.0.0";
  const NS = "http://www.w3.org/2000/svg";
  const LOOK_IDS = new Set(["story", "codex", "notebook", "journey"]);
  const doc = document;
  const states = new WeakMap();
  const installed = new WeakSet();

  if (window.W10_CINEMATICS?.version === VERSION) return;

  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  }[c]));

  const num = (value, fallback = 0) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  };

  const clamp = (value, low, high) =>
    Math.max(low, Math.min(high, value));

  const active = () =>
    Number(window.WEEK) === 10 ||
    window.COURSE?.id === "oper621-w10";

  const gsapAvailable = () =>
    typeof window.gsap?.timeline === "function";

  function reduced() {
    try {
      return Boolean(
        window.LAB?.reducedMotion?.() ||
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
      );
    } catch (_) {
      return false;
    }
  }

  /*
   * Palette contract
   *
   * These are semantic aliases, not a new colour scheme.
   * Every value ultimately comes from the selected look's CSS.
   * The fallbacks use inherited foreground, background and accent.
   *
   * Host themes may override --w10-* without changing this file.
   */

  const C = Object.freeze({
    ink: "var(--w10-ink, currentColor)",
    line: "var(--w10-line, currentColor)",
    accent: "var(--w10-accent, var(--accent, currentColor))",
    ok: "var(--w10-ok, var(--good, var(--accent, currentColor)))",
    warn: "var(--w10-warn, var(--accent, currentColor))",
    bad: "var(--w10-bad, var(--danger, currentColor))",
    paper: "var(--w10-paper, var(--surface, transparent))",
    muted: "var(--w10-muted, currentColor)"
  });

  /*
   * SVG construction
   *
   * The markup is intentionally self-contained. Each visual exposes
   * an accessible description and a complete final state.
   *
   * data-w10-seq establishes the teaching order.
   * data-w10-draw identifies a path that should be drawn.
   * data-w10-token-path identifies a meaningful movement route.
   * data-w10-count identifies a genuine, explicitly stated quantity.
   * data-w10-role identifies an element for a signature animation.
   */

  function svg(kind, height, label, body, options = {}) {
    return `<svg class="dg w10-dg w10-${esc(kind)}"
      data-w10-kind="${esc(kind)}"
      data-w10-signature="${esc(options.signature || kind)}"
      viewBox="0 0 320 ${num(height, 160)}"
      role="img"
      aria-label="${esc(label)}"
      preserveAspectRatio="xMidYMid meet">
      <title>${esc(options.title || label)}</title>
      <desc>${esc(label)}</desc>
      ${body}
    </svg>`;
  }

  function txt(x, y, value, options = {}) {
    const size = num(options.size, 10);
    const weight = num(options.weight, 650);
    const anchor = options.anchor || "middle";
    const fill = options.fill || C.ink;
    const seq = num(options.seq, 0);
    const lines = String(value ?? "").split("|");
    const start = y - (lines.length - 1) * size * .57;

    const attrs = [
      `x="${x}"`,
      `y="${start}"`,
      `font-size="${size}"`,
      `font-weight="${weight}"`,
      `text-anchor="${anchor}"`,
      `dominant-baseline="middle"`,
      `fill="${fill}"`,
      `data-w10-seq="${seq}"`
    ];

    if (options.role) {
      attrs.push(`data-w10-role="${esc(options.role)}"`);
    }

    if (Number.isFinite(options.count)) {
      attrs.push(`data-w10-count="${options.count}"`);
      attrs.push(`data-w10-suffix="${esc(options.suffix || "")}"`);
    }

    return `<text ${attrs.join(" ")}>${
      lines.map((part, i) =>
        `<tspan x="${x}" dy="${i ? size * 1.14 : 0}">${esc(part)}</tspan>`
      ).join("")
    }</text>`;
  }

  function rect(x, y, w, h, options = {}) {
    const attrs = [
      `x="${x}"`, `y="${y}"`,
      `width="${w}"`, `height="${h}"`,
      `rx="${num(options.rx, 8)}"`,
      `fill="${options.fill || C.paper}"`,
      `stroke="${options.stroke || C.line}"`,
      `stroke-width="${num(options.sw, 1.4)}"`,
      `data-w10-seq="${num(options.seq, 0)}"`
    ];

    if (options.dash) {
      attrs.push(`stroke-dasharray="${esc(options.dash)}"`);
    }
    if (options.role) {
      attrs.push(`data-w10-role="${esc(options.role)}"`);
    }

    return `<rect ${attrs.join(" ")}/>`;
  }

  function circle(x, y, r, options = {}) {
    return `<circle cx="${x}" cy="${y}" r="${r}"
      fill="${options.fill || C.paper}"
      stroke="${options.stroke || C.line}"
      stroke-width="${num(options.sw, 1.5)}"
      data-w10-seq="${num(options.seq, 0)}"
      ${options.role ? `data-w10-role="${esc(options.role)}"` : ""}/>`;
  }

  function path(d, options = {}) {
    return `<path d="${esc(d)}"
      fill="${options.fill || "none"}"
      stroke="${options.stroke || C.line}"
      stroke-width="${num(options.sw, 2)}"
      stroke-linecap="round"
      stroke-linejoin="round"
      data-w10-seq="${num(options.seq, 0)}"
      ${options.draw === false ? "" : "data-w10-draw"}
      ${options.token ? "data-w10-token-path" : ""}
      ${options.role ? `data-w10-role="${esc(options.role)}"` : ""}/>`;
  }

  function badge(x, y, value, options = {}) {
    const w = num(options.w, 74);
    const h = num(options.h, 24);
    const colour = options.colour || C.accent;

    return rect(x, y, w, h, {
      stroke: colour,
      rx: h / 2,
      seq: options.seq,
      role: options.role
    }) + txt(x + w / 2, y + h / 2, value, {
      size: num(options.size, 8.5),
      fill: colour,
      seq: num(options.seq, 0) + 1
    });
  }

  function dots(options = {}) {
    const count = clamp(Math.trunc(num(options.count, 22)), 1, 60);
    const cols = clamp(Math.trunc(num(options.cols, 11)), 1, 20);
    const startX = num(options.x, 29);
    const startY = num(options.y, 57);
    const dx = num(options.dx, 24);
    const dy = num(options.dy, 24);
    const highlighted = new Set(options.highlighted || []);
    const departed = new Set(options.departed || []);
    let result = "";

    for (let i = 0; i < count; i++) {
      const x = startX + (i % cols) * dx;
      const y = startY + Math.floor(i / cols) * dy;
      const departure = departed.has(i);
      const emphasis = highlighted.has(i);

      result += circle(x, y, 7, {
        fill: departure ? C.paper : emphasis ? C.warn : C.ok,
        stroke: departure ? C.bad : emphasis ? C.warn : C.ok,
        sw: departure ? 2 : 1,
        seq: i + 1,
        role: departure
          ? "departed"
          : emphasis
            ? "escalating"
            : "host"
      });

      if (departure) {
        result += path(`M${x - 4} ${y - 4}L${x + 4} ${y + 4}
          M${x + 4} ${y - 4}L${x - 4} ${y + 4}`, {
          stroke: C.bad,
          sw: 1.5,
          seq: i + 1,
          role: "departure-mark"
        });
      }
    }

    return result;
  }

  /*
   * Signature visual 1 — THE AED 400 DECISION
   *
   * "Within the limit" is not equivalent to "automatically approved".
   * The visual distinguishes:
   *
   *   eligibility;
   *   documented delegation;
   *   monetary threshold;
   *   accountable decision;
   *   escalation.
   *
   * AED 320 and AED 460 are teaching examples, not case observations.
   */

  function authority(options = {}) {
    const amount = Math.max(0, num(options.amount, 320));
    const documented = Boolean(options.documented);
    const eligible = options.eligible !== false;
    const within = amount <= 400;
    const local = eligible && documented && within;

    const routeColour = local ? C.ok : C.warn;
    const destination = local ? "GUEST HOST" : "DUTY MANAGER";

    const reason = !eligible
      ? "Eligibility not established"
      : !documented
        ? "Delegation not formalised"
        : !within
          ? "Above AED 400 limit"
          : "Eligible and within delegated authority";

    let body = "";

    body += txt(160, 15, "ILLUSTRATIVE DECISION", {
      size: 8.5, fill: C.muted, seq: 1
    });

    body += txt(160, 46, String(amount), {
      size: 30,
      weight: 900,
      fill: C.accent,
      seq: 2,
      count: amount,
      role: "amount"
    });

    body += txt(160, 66, "AED · discrepancy", {
      size: 9, seq: 3
    });

    body += path("M28 90H292", {
      stroke: C.line, sw: 3, seq: 4
    });

    body += path("M28 90H226", {
      stroke: routeColour,
      sw: 5,
      seq: 5,
      role: "decision-track"
    });

    body += circle(226, 90, 7, {
      fill: routeColour,
      stroke: routeColour,
      seq: 6,
      role: "decision-marker"
    });

    body += txt(226, 108, "AED 400", {
      size: 8, fill: C.muted, seq: 7
    });

    body += rect(12, 126, 112, 51, {
      stroke: C.ok,
      seq: 8,
      role: "host-card"
    });

    body += txt(68, 143, "GUEST HOST", {
      size: 9, fill: C.ok, seq: 9
    });

    body += txt(68, 160, "Check eligibility", {
      size: 8, seq: 10
    });

    body += rect(196, 126, 112, 51, {
      stroke: C.warn,
      seq: 11,
      role: "manager-card"
    });

    body += txt(252, 143, "DUTY MANAGER", {
      size: 9, fill: C.warn, seq: 12
    });

    body += txt(252, 160, "Review exception", {
      size: 8, seq: 13
    });

    body += path(
      local
        ? "M160 116C136 119 101 120 68 126"
        : "M160 116C184 119 219 120 252 126",
      {
        stroke: routeColour,
        sw: 3,
        seq: 14,
        token: true,
        role: "decision-route"
      }
    );

    body += circle(local ? 68 : 252, 126, 4, {
      fill: routeColour,
      stroke: routeColour,
      seq: 15
    });

    body += badge(69, 188, documented
      ? "DOCUMENTED"
      : "EMAIL ONLY", {
      w: 85,
      colour: documented ? C.ok : C.bad,
      seq: 16,
      role: "delegation-stamp"
    });

    body += badge(166, 188, eligible
      ? "ELIGIBLE"
      : "CHECK", {
      w: 85,
      colour: eligible ? C.ok : C.warn,
      seq: 18
    });

    body += txt(160, 226, reason, {
      size: 9,
      fill: routeColour,
      seq: 20,
      role: "decision-result"
    });

    body += txt(160, 244, local
      ? "Local authority permits a decision, not an automatic waiver."
      : "Escalation protects the decision boundary.", {
      size: 7.7, seq: 21
    });

    return svg("authority", 258,
      `Illustrative AED ${amount} discrepancy. ${
        local
          ? "The eligible case may be decided locally under documented authority."
          : "The case requires escalation or further verification."
      } ${reason}.`,
      body,
      { signature: "authority-dial" }
    );
  }

  /*
   * Signature visual 2 — THE 22 GUEST HOSTS
   *
   * The same 22 positions are reused across the lesson.
   * Highlighted positions are illustrative identities.
   * The counts are observed; which particular people they represent
   * is not supplied by the case.
   */

  function hosts(options = {}) {
    const mode = options.mode || "team";
    const nine = mode === "referrals";
    const two = mode === "departures";
    const training = mode === "training";
    const assessed = mode === "assessment";

    const highlighted = nine
      ? Array.from({ length: 9 }, (_, i) => i)
      : [];

    const departed = two ? [20, 21] : [];

    let body = txt(160, 18, "22 GUEST HOSTS", {
      size: 12, weight: 900, seq: 1
    });

    body += dots({
      count: 22,
      x: 40,
      y: 54,
      dx: 24,
      dy: 27,
      highlighted,
      departed
    });

    let heading;
    let detail;

    if (nine) {
      heading = "9 OF 22";
      detail = "Reportedly escalated every rate discrepancy";
    } else if (two) {
      heading = "2 RESIGNED";
      detail = "Their reasons were not reported";
    } else if (training) {
      heading = "22 OF 22";
      detail = "Attended the four-hour induction";
    } else if (assessed) {
      heading = "NOT EVIDENCED";
      detail = "No demonstrated-capability result was supplied";
    } else {
      heading = "ONE TEAM";
      detail = "A redesigned role needs more than a new title";
    }

    body += txt(160, 132, heading, {
      size: 15,
      weight: 900,
      fill: nine ? C.warn : two ? C.bad : C.accent,
      seq: 30,
      role: "host-result"
    });

    body += txt(160, 153, detail, {
      size: 8.5, seq: 31
    });

    body += txt(160, 173,
      "Dot positions are illustrative; individual identities are unknown.", {
        size: 7.1, fill: C.muted, seq: 32
      });

    return svg("hosts", 188,
      `Twenty-two Guest Hosts. ${heading}. ${detail}. Individual identities are not specified.`,
      body,
      { signature: "twenty-two-hosts" }
    );
  }

  /*
   * RACI — responsibility is not accountability.
   */

  function raci(options = {}) {
    const task = options.task || "Resolve a rate discrepancy";
    const responsible = options.responsible || "Guest Host";
    const accountable = options.accountable || "Process owner";
    const missing = Boolean(options.missing);

    let body = txt(160, 17, task, {
      size: 11, weight: 800, seq: 1
    });

    body += rect(10, 49, 132, 75, {
      stroke: C.ok, seq: 2, role: "responsible"
    });

    body += txt(76, 67, "R · DOES THE WORK", {
      size: 8.5, fill: C.ok, seq: 3
    });

    body += txt(76, 94, responsible, {
      size: 11, weight: 800, seq: 4
    });

    body += path("M144 87H176", {
      stroke: C.accent,
      sw: 2.5,
      token: true,
      seq: 5
    });

    body += rect(178, 49, 132, 75, {
      stroke: missing ? C.bad : C.warn,
      dash: missing ? "5 4" : "",
      seq: 6,
      role: missing ? "missing-owner" : "accountable"
    });

    body += txt(244, 67, missing
      ? "A · MISSING"
      : "A · OWNS THE RESULT", {
      size: 8.5,
      fill: missing ? C.bad : C.warn,
      seq: 7
    });

    body += txt(244, 94, missing
      ? "No named owner"
      : accountable, {
      size: 10,
      weight: 800,
      seq: 8
    });

    body += txt(160, 149, missing
      ? "Someone can do the work while nobody owns the decision."
      : "One person performs. One person is answerable.", {
      size: 8.2, seq: 9
    });

    return svg("raci", 164,
      `${responsible} is responsible for ${task}. ${
        missing
          ? "No accountable owner is identified."
          : `${accountable} is accountable.`
      }`,
      body
    );
  }

  /*
   * RACI matrix — four letters, distinct meanings.
   */

  function raciMatrix(options = {}) {
    const missing = Boolean(options.missing);
    const roles = options.roles || [
      "Sponsor", "Owner", "Host", "Manager"
    ];

    const rows = [
      ["Set standard", "A", "R", "I", "C"],
      ["Build workflow", "C", missing ? "?" : "A", "R", "C"],
      ["Resolve guest", "I", "A", "R", "C"],
      ["Review quality", "I", "A", "C", "R"]
    ];

    let body = txt(160, 13, "WHO DOES WHAT?", {
      size: 11, weight: 900, seq: 1
    });

    roles.forEach((role, i) => {
      body += txt(137 + i * 43, 39, role, {
        size: 7.3, seq: i + 2
      });
    });

    rows.forEach((row, r) => {
      const y = 57 + r * 27;
      body += txt(8, y, row[0], {
        size: 7.6,
        anchor: "start",
        seq: 10 + r
      });

      row.slice(1).forEach((letter, c) => {
        const x = 121 + c * 43;
        const colour = letter === "A"
          ? C.warn
          : letter === "R"
            ? C.ok
            : letter === "?"
              ? C.bad
              : C.line;

        body += rect(x, y - 11, 31, 22, {
          rx: 4,
          stroke: colour,
          seq: 20 + r * 4 + c,
          role: letter === "?" ? "missing-owner" : "raci-cell"
        });

        body += txt(x + 15.5, y, letter, {
          size: 10,
          weight: 900,
          fill: colour,
          seq: 21 + r * 4 + c
        });
      });
    });

    body += txt(160, 178,
      missing
        ? "The missing A is a governance gap."
        : "Every activity needs one clear accountable owner.", {
        size: 8.5, seq: 45
      });

    return svg("raci-matrix", 193,
      `Illustrative RACI matrix with four roles and four activities. ${
        missing
          ? "Workflow building has no named accountable owner."
          : "Accountability is explicitly assigned."
      }`,
      body
    );
  }

  /*
   * SCORECARD SCALE
   *
   * The old and proposed scorecards are represented as different
   * incentives. No fabricated performance results are displayed.
   */

  function measures(options = {}) {
    const aligned = Boolean(options.aligned);

    let body = txt(160, 16, aligned
      ? "WHAT THE NEW ROLE SHOULD REWARD"
      : "WHAT THE OLD SCORECARD REWARDS", {
      size: 10,
      weight: 900,
      seq: 1
    });

    body += path(
      aligned ? "M48 84H272" : "M48 98L272 70", {
        stroke: C.accent,
        sw: 4,
        seq: 2,
        role: "balance-beam"
      }
    );

    body += path("M160 85L142 120H178Z", {
      fill: C.paper,
      stroke: C.line,
      sw: 2,
      seq: 3
    });

    body += rect(12, aligned ? 65 : 78, 114, 52, {
      stroke: aligned ? C.ok : C.warn,
      seq: 4,
      role: "routine-task"
    });

    body += txt(69, aligned ? 81 : 94,
      aligned ? "Eligible exceptions" : "Check-ins per shift", {
      size: 8.2,
      fill: aligned ? C.ok : C.warn,
      seq: 5
    });

    body += txt(69, aligned ? 99 : 112,
      aligned ? "resolved correctly" : "Average speed", {
      size: 8.2, seq: 6
    });

    body += rect(194, aligned ? 65 : 50, 114, 52, {
      stroke: aligned ? C.ok : C.bad,
      seq: 7,
      role: "exception-task"
    });

    body += txt(251, aligned ? 81 : 66,
      aligned ? "Quality sample" : "Complex exception", {
      size: 8.2,
      fill: aligned ? C.ok : C.bad,
      seq: 8
    });

    body += txt(251, aligned ? 99 : 84,
      aligned ? "checks the decision" : "takes longer", {
      size: 8.2, seq: 9
    });

    body += txt(160, 144, aligned
      ? "The measure now supports the redesigned work."
      : "The old measure can make difficult work unattractive.", {
      size: 8.5, seq: 10
    });

    return svg("measures", 160,
      aligned
        ? "The proposed scorecard counts eligible exceptions resolved correctly without unnecessary escalation, with quality sampling."
        : "The inherited scorecard emphasises check-in volume and speed, potentially discouraging careful exception handling.",
      body,
      { signature: "scorecard-scale" }
    );
  }

  /*
   * CAPABILITY — attendance is not demonstrated performance.
   */

  function capability(options = {}) {
    const stages = [
      ["EXPLAIN", "Know the rule"],
      ["PRACTISE", "Try the case"],
      ["FEEDBACK", "Correct errors"],
      ["DEMONSTRATE", "Show judgement"]
    ];

    let body = txt(160, 16,
      "FROM ATTENDANCE TO DEMONSTRATED CAPABILITY", {
        size: 9.2, weight: 900, seq: 1
      });

    stages.forEach((stage, i) => {
      const x = 7 + i * 79;
      const colour = i === 3 ? C.ok : C.line;

      body += rect(x, 53, 69, 68, {
        stroke: colour,
        seq: 3 + i * 4,
        role: i === 3 ? "capability-gate" : "learning-stage"
      });

      body += txt(x + 34.5, 74, stage[0], {
        size: 7.6,
        fill: colour,
        seq: 4 + i * 4
      });

      body += txt(x + 34.5, 97, stage[1], {
        size: 7.2,
        seq: 5 + i * 4
      });

      if (i < 3) {
        body += path(
          `M${x + 70} 87H${x + 78}`, {
            stroke: C.accent,
            sw: 2,
            seq: 6 + i * 4
          }
        );
      }
    });

    body += txt(160, 144,
      "Four hours in a room cannot establish judgement.", {
        size: 8.5, seq: 20
      });

    return svg("capability", 160,
      "Capability requires explanation, realistic practice, feedback and demonstrated performance. Attendance alone is not proof.",
      body
    );
  }

  /*
   * READINESS DASHBOARD
   *
   * A new role title and attendance are known.
   * The dashboard does not pretend that unverified evidence is a
   * measured failure or that no assessment took place.
   */

  function readiness(options = {}) {
    const reveal = Boolean(options.reveal);

    const checks = [
      ["Role title", "KNOWN", "ok"],
      ["Description", "3 WEEKS LATE", "warn"],
      ["Rewards", "NOT EVIDENCED", "unknown"],
      ["Objectives", "NOT EVIDENCED", "unknown"],
      ["Waiver", "EMAIL ONLY", "warn"],
      ["Induction", "22 ATTENDED", "ok"],
      ["Capability", "NOT EVIDENCED", "unknown"]
    ];

    let body = txt(160, 15,
      reveal ? "LOOK BEHIND THE GREEN STATUS" : "PEOPLE READINESS", {
        size: 10.5,
        weight: 900,
        seq: 1
      });

    checks.forEach((entry, i) => {
      const x = 8 + (i % 4) * 78;
      const y = 39 + Math.floor(i / 4) * 58;
      const colour = entry[2] === "ok"
        ? C.ok
        : entry[2] === "warn"
          ? C.warn
          : C.line;

      body += rect(x, y, 72, 48, {
        stroke: colour,
        seq: 3 + i * 3,
        role: reveal ? "evidence-tile" : "readiness-tile"
      });

      body += txt(x + 36, y + 15, entry[0], {
        size: 8,
        weight: 800,
        seq: 4 + i * 3
      });

      body += txt(x + 36, y + 33,
        entry[1].replace(" ", "|"), {
        size: 6.8,
        fill: colour,
        seq: 5 + i * 3
      });
    });

    body += txt(160, 168,
      "A completed activity is not the same as proven readiness.", {
        size: 8.5, seq: 28
      });

    return svg("readiness", 184,
      "Readiness evidence includes a named role and 22 induction attendees. The job description arrived three weeks late. Delegation was email-only. Other specified evidence is not established.",
      body,
      { signature: reveal ? "dashboard-reveal" : "readiness-board" }
    );
  }

  /*
   * ADOPTION — the unreported remainder is not labelled 6%.
   *
   * The case reports 65% kiosk use and 29% desk handling.
   * The remainder is left explicitly unreported.
   */

  function adoption(options = {}) {
    const lobby = Boolean(options.lobby);

    let body = txt(160, 15, "WEEK 11 · REPORTED CHANNELS", {
      size: 10, weight: 900, seq: 1
    });

    body += rect(12, 47, 296, 42, {
      stroke: C.line,
      seq: 2
    });

    body += rect(12, 47, 192.4, 42, {
      rx: 0,
      fill: C.ok,
      stroke: C.ok,
      seq: 3,
      role: "adoption-bar"
    });

    body += rect(204.4, 47, 85.84, 42, {
      rx: 0,
      fill: C.warn,
      stroke: C.warn,
      seq: 4,
      role: "adoption-bar"
    });

    body += txt(108, 68, "65%", {
      size: 14,
      weight: 900,
      fill: C.paper,
      seq: 5,
      count: 65,
      suffix: "%"
    });

    body += txt(247, 68, "29%", {
      size: 12,
      weight: 900,
      fill: C.paper,
      seq: 6,
      count: 29,
      suffix: "%"
    });

    body += txt(108, 109, "KIOSK", {
      size: 9, fill: C.ok, seq: 7
    });

    body += txt(247, 109, "DESK", {
      size: 9, fill: C.warn, seq: 8
    });

    body += txt(160, 133,
      "Other channels or classification: not reported", {
        size: 8.2,
        fill: C.muted,
        seq: 9
      });

    if (lobby) {
      body += path("M40 157H120M200 157H280", {
        stroke: C.line,
        seq: 10,
        token: true
      });

      body += badge(110, 145, "KIOSK", {
        w: 80, colour: C.ok, seq: 11
      });

      body += txt(160, 194,
        "Illustrative movement; percentages are observed.", {
          size: 7.8, seq: 14
        });

      return svg("adoption", 209,
        "At week eleven, 65 percent of arrivals used kiosks and 29 percent were handled at the desk. The remaining classification is not reported. The illustrated guest movement is hypothetical.",
        body,
        { signature: "two-process-lobby" }
      );
    }

    return svg("adoption", 149,
      "At week eleven, 65 percent of arrivals used kiosks and 29 percent were handled at the desk. The remaining classification is not reported.",
      body
    );
  }

  /*
   * KNOWLEDGE ICEBERG
   *
   * The metaphor distinguishes documented instructions from
   * experience-based judgement without inventing measurements.
   */

  function iceberg(options = {}) {
    const surfaced = Boolean(options.surfaced);

    let body = txt(160, 14, "WHAT THE ROLE KNOWS", {
      size: 11, weight: 900, seq: 1
    });

    body += path("M12 89H308", {
      stroke: C.accent,
      sw: 2.5,
      seq: 2,
      role: "waterline"
    });

    body += path("M120 82L160 35L200 82Z", {
      fill: C.paper,
      stroke: C.line,
      seq: 3
    });

    body += path("M115 97L205 97L190 152L160 171L130 152Z", {
      fill: C.paper,
      stroke: C.line,
      seq: 4,
      role: "hidden-knowledge"
    });

    body += txt(160, 65, "Written rules", {
      size: 8.5, seq: 5
    });

    body += txt(160, 122, surfaced
      ? "Worked example"
      : "Experience-based", {
      size: 8.5,
      fill: C.accent,
      seq: 6
    });

    body += txt(160, 141, surfaced
      ? "now made explicit"
      : "judgement", {
      size: 8.5, seq: 7
    });

    body += txt(160, 190, surfaced
      ? "Practice brings hidden know-how into the open."
      : "A procedure cannot capture every guest exception.", {
      size: 8.2, seq: 8
    });

    return svg("iceberg", 205,
      surfaced
        ? "A worked example makes experience-based knowledge explicit and teachable."
        : "Written procedures are visible, but experienced judgement can remain undocumented.",
      body,
      { signature: "knowledge-iceberg" }
    );
  }

  /*
   * CASE EVIDENCE BOARD
   *
   * No causal arrows connect unrelated observations.
   * The two departures are never attributed to the redesign.
   */

  function caseTimeline(options = {}) {
    const cards = [
      ["ROLE", "22 Guest Hosts"],
      ["AUTHORITY", "Email only"],
      ["ADOPTION", "65% kiosk"],
      ["REFERRALS", "9 of 22"],
      ["DEPARTURES", "2; reasons unknown"]
    ];

    let body = txt(160, 14, "QASR · EVIDENCE, NOT ASSUMPTIONS", {
      size: 9.5, weight: 900, seq: 1
    });

    cards.forEach((entry, i) => {
      const x = 10 + (i % 3) * 103;
      const y = 40 + Math.floor(i / 3) * 69;
      const colour = i === 0
        ? C.ok
        : i === 4
          ? C.bad
          : C.warn;

      body += rect(x, y, 94, 59, {
        stroke: colour,
        seq: 3 + i * 3,
        role: "evidence-card"
      });

      body += txt(x + 47, y + 19, entry[0], {
        size: 8.5,
        fill: colour,
        seq: 4 + i * 3
      });

      body += txt(x + 47, y + 41, entry[1], {
        size: 8.1,
        seq: 5 + i * 3
      });
    });

    body += txt(160, 185,
      "Five observations. Their causes still require investigation.", {
        size: 8.2, seq: 25
      });

    return svg("case-timeline", 200,
      "Qasr evidence board: 22 Guest Hosts, email-only authority, 65 percent kiosk use, nine of 22 escalating every discrepancy, and two resignations with reasons unknown. These observations do not establish causation.",
      body,
      { signature: "evidence-board" }
    );
  }

  /*
   * DASHBOARD FLIP — a truthful reveal.
   *
   * Green means an activity may have been reported as complete.
   * It does not prove that the people system was ready.
   */

  function dashboardFlip(options = {}) {
    const revealed = options.revealed !== false;

    let body = txt(160, 15, "THE GREEN DASHBOARD", {
      size: 11, weight: 900, seq: 1
    });

    body += rect(29, 42, 262, 65, {
      stroke: C.ok,
      sw: 2.5,
      seq: 2,
      role: "dashboard-front"
    });

    body += txt(160, 65, "PEOPLE WORKSTREAM", {
      size: 10, fill: C.ok, seq: 3
    });

    body += txt(160, 88, "REPORTED COMPLETE", {
      size: 14,
      weight: 900,
      fill: C.ok,
      seq: 4
    });

    if (revealed) {
      body += path("M160 111V124", {
        stroke: C.accent,
        sw: 2,
        seq: 5,
        role: "reveal-path"
      });

      const evidence = [
        ["65%", "kiosk"],
        ["29%", "desk"],
        ["9/22", "always refer"],
        ["?", "capability"],
        ["2", "resigned"]
      ];

      evidence.forEach((entry, i) => {
        const x = 5 + i * 63;

        body += rect(x, 133, 58, 49, {
          stroke: i === 3 ? C.warn : C.line,
          seq: 6 + i * 3,
          role: "flip-card"
        });

        body += txt(x + 29, 150, entry[0], {
          size: 12,
          weight: 900,
          fill: i === 3 ? C.warn : C.accent,
          seq: 7 + i * 3
        });

        body += txt(x + 29, 170, entry[1], {
          size: 7.3,
          seq: 8 + i * 3
        });
      });

      body += txt(160, 201,
        "Capability evidence absent; resignation motives unknown.", {
          size: 7.6, seq: 25
        });
    }

    return svg("dashboard-flip", revealed ? 215 : 121,
      revealed
        ? "The reported-complete dashboard is contrasted with five evidence cards: 65 percent kiosk use, 29 percent desk handling, nine of 22 escalating every rate discrepancy, no supplied capability assessment result, and two resignations with unknown reasons."
        : "The people workstream is reported complete, but completion does not establish readiness.",
      body,
      { signature: "dashboard-flip" }
    );
  }

  /*
   * HANDOVER — the People phase feeds Develop.
   */

  function handover(options = {}) {
    const items = [
      "Role|definition",
      "Decision|rights",
      "Capability|evidence",
      "Aligned|measures"
    ];

    let body = txt(160, 15, "PEOPLE → DEVELOP", {
      size: 12, weight: 900, seq: 1
    });

    items.forEach((item, i) => {
      const x = 6 + i * 79;

      body += rect(x, 55, 70, 65, {
        stroke: C.line,
        seq: 3 + i * 3,
        role: "handover-document"
      });

      body += txt(x + 35, 87, item, {
        size: 8,
        seq: 4 + i * 3
      });

      if (i < 3) {
        body += path(`M${x + 71} 87H${x + 78}`, {
          stroke: C.accent,
          seq: 5 + i * 3
        });
      }
    });

    body += path("M160 128V145", {
      stroke: C.accent,
      sw: 3,
      token: true,
      seq: 18
    });

    body += rect(100, 150, 120, 37, {
      stroke: C.ok,
      sw: 2,
      seq: 19,
      role: "develop-gate"
    });

    body += txt(160, 168, "DEVELOP", {
      size: 13,
      weight: 900,
      fill: C.ok,
      seq: 20
    });

    body += txt(160, 208,
      "Carry decisions, evidence and open issues forward.", {
        size: 8.5, seq: 21
      });

    return svg("handover", 223,
      "The People phase hands role definitions, documented decision rights, capability evidence and aligned measures into Develop, with unresolved issues visible.",
      body,
      { signature: "develop-handover" }
    );
  }

  /*
   * REPAIR CARD — a compact alternative to repeated flow diagrams.
   */

  function repair(options = {}) {
    const selected = clamp(Math.trunc(num(options.selected, 5)), 0, 5);
    const labels = [
      "Role", "Authority", "Measures", "Practice", "Evidence"
    ];

    let body = txt(160, 16, "REPAIR THE PEOPLE SYSTEM", {
      size: 10.5, weight: 900, seq: 1
    });

    labels.forEach((label, i) => {
      const y = 38 + i * 27;
      const done = i < selected;

      body += circle(35, y, 9, {
        stroke: done ? C.ok : C.line,
        fill: done ? C.ok : C.paper,
        seq: 2 + i * 3,
        role: "repair-check"
      });

      if (done) {
        body += path(
          `M30 ${y}L34 ${y + 4}L41 ${y - 5}`, {
            stroke: C.paper,
            sw: 2,
            seq: 3 + i * 3
          }
        );
      }

      body += txt(57, y, label, {
        anchor: "start",
        size: 10,
        fill: done ? C.ok : C.ink,
        seq: 4 + i * 3
      });
    });

    body += txt(160, 194,
      "A new job works only when its supports change too.", {
        size: 8.5, seq: 20
      });

    return svg("repair", 208,
      `Five people-system repair elements: role, authority, measures, practice and evidence. ${selected} are selected in this illustrative checklist.`,
      body
    );
  }

  /*
   * THE FOUR-LOOK VISUAL CONTRACT
   *
   * No hard-coded theme-specific colours are introduced.
   * The stage owns typography, layout and semantic components.
   */

  function ensureCss() {
    if (doc.getElementById("vl-w10-cinematics-v2")) return;

    const style = doc.createElement("style");
    style.id = "vl-w10-cinematics-v2";

    style.textContent = `
      .look[data-w10-cinematics="on"] {
        --w10-ink: var(--ink, var(--fg, currentColor));
        --w10-line: var(--line, var(--border, currentColor));
        --w10-accent: var(--accent, currentColor);
        --w10-ok: var(--good, var(--success, var(--accent, currentColor)));
        --w10-warn: var(--warning, var(--accent, currentColor));
        --w10-bad: var(--danger, var(--accent, currentColor));
        --w10-paper: var(--surface, transparent);
        --w10-muted: var(--muted, var(--fg, currentColor));
      }

      .look[data-w10-cinematics="on"] svg.w10-dg {
        display: block;
        width: 100%;
        height: auto;
        max-width: 100%;
        overflow: visible;
        color: var(--w10-ink);
      }

      .look[data-w10-cinematics="on"] svg.w10-dg [data-w10-seq] {
        transform-box: fill-box;
        transform-origin: center;
      }

      .look[data-w10-cinematics="on"] svg.w10-dg [data-w10-bar],
      .look[data-w10-cinematics="on"] svg.w10-dg [data-w10-role="adoption-bar"] {
        transform-origin: left center;
      }

      .look[data-w10-cinematics="on"] .w10-flow-token {
        fill: var(--w10-accent);
        stroke: var(--w10-paper);
        stroke-width: 1.5;
        vector-effect: non-scaling-stroke;
        pointer-events: none;
      }

      .look[data-w10-cinematics="on"] .w10-cine-accent {
        position: absolute;
        inset: auto 8% 8% 8%;
        height: 2px;
        background: var(--w10-accent);
        opacity: 0;
        pointer-events: none;
        transform-origin: left center;
        z-index: 2;
      }

      .look[data-w10-cinematics="on"] .w10-cine-focus {
        outline: 2px solid var(--w10-accent);
        outline-offset: 4px;
      }

      .look[data-w10-cinematics="on"] .w10-cine-overlay {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 2;
        overflow: hidden;
      }

      .look[data-w10-cinematics="on"] .w10-cine-wash {
        position: absolute;
        inset: 0;
        opacity: 0;
        pointer-events: none;
        background: linear-gradient(
          90deg,
          transparent,
          var(--w10-accent),
          transparent
        );
        mix-blend-mode: soft-light;
      }

      .look[data-w10-look="notebook"] .w10-cine-wash {
        mix-blend-mode: multiply;
      }

      .look[data-w10-cinematics="on"] .w10-cine-caption {
        font-size: .75rem;
        line-height: 1.35;
        color: var(--w10-muted);
      }

      @media (prefers-reduced-motion: reduce) {
        .look[data-w10-cinematics="on"] .w10-cine-wash,
        .look[data-w10-cinematics="on"] .w10-flow-token {
          display: none !important;
        }

        .look[data-w10-cinematics="on"] svg.w10-dg *,
        .look[data-w10-cinematics="on"] .w10-cine-accent {
          animation: none !important;
          transition: none !important;
        }
      }
    `;

    doc.head.appendChild(style);
  }

  /*
   * STATE AND LIFECYCLE
   *
   * Every look receives independent state.
   * No timeline is shared between different look instances.
   */

  function stateFor(style) {
    let state = states.get(style);

    if (!state) {
      state = {
        style,
        root: null,
        section: null,
        sentence: -1,
        scene: -1,
        epoch: 0,
        timeline: null,
        timers: new Set(),
        frames: new Set(),
        tokens: new Set(),
        observer: null,
        resizeTimer: null,
        size: null,
        overlay: null,
        paused: false,
        rate: 1,
        lastSignature: null
      };

      states.set(style, state);
    }

    return state;
  }

  function settleNumbers(root) {
    root?.querySelectorAll?.("[data-w10-count]").forEach(el => {
      const target = Number(el.getAttribute("data-w10-count"));
      if (!Number.isFinite(target)) return;

      el.textContent =
        `${target}${el.getAttribute("data-w10-suffix") || ""}`;
    });
  }

  function settleDiagram(svgElement) {
    if (!svgElement) return;

    svgElement.querySelectorAll("[data-w10-seq]").forEach(el => {
      el.style.removeProperty("opacity");
      el.style.removeProperty("transform");
      el.style.removeProperty("stroke-dasharray");
      el.style.removeProperty("stroke-dashoffset");
    });

    settleNumbers(svgElement);
  }

  function clearWork(state) {
    state.epoch++;

    state.timers.forEach(clearTimeout);
    state.timers.clear();

    state.frames.forEach(cancelAnimationFrame);
    state.frames.clear();

    if (state.timeline) {
      try {
        state.timeline.kill();
      } catch (_) {}
      state.timeline = null;
    }

    state.tokens.forEach(token => token.remove());
    state.tokens.clear();

    state.overlay?.remove();
    state.overlay = null;

    if (state.root) {
      state.root.querySelectorAll("svg.w10-dg")
        .forEach(settleDiagram);
    }
  }

  function schedule(state, fn, delay = 0) {
    const epoch = state.epoch;

    const id = setTimeout(() => {
      state.timers.delete(id);

      if (epoch !== state.epoch) return;
      if (!state.root?.isConnected) return;

      fn();
    }, Math.max(0, delay));

    state.timers.add(id);
    return id;
  }

  function frame(state, fn) {
    const epoch = state.epoch;

    const id = requestAnimationFrame(time => {
      state.frames.delete(id);

      if (epoch !== state.epoch) return;
      if (!state.root?.isConnected) return;

      fn(time);
    });

    state.frames.add(id);
    return id;
  }

  function timeline(state) {
    if (reduced() || !gsapAvailable()) return null;

    const tl = window.gsap.timeline({
      paused: true,
      defaults: {
        ease: "power3.out",
        overwrite: "auto"
      }
    });

    state.timeline = tl;
    tl.timeScale(state.rate);

    return tl;
  }

  function playTimeline(state, tl, animate) {
    if (!tl) return;

    if (!animate || reduced()) {
      tl.progress(1);
      return;
    }

    if (state.paused) {
      tl.pause(0);
    } else {
      tl.play(0);
    }
  }

  /*
   * SCENE LOOKUP
   *
   * A null narration line retains its previous semantic visual.
   * It may still trigger a small, meaningful emphasis.
   */

  function scenes(section) {
    const moments = Array.isArray(section?.moments)
      ? section.moments
      : [];

    const grouped = new Map();

    moments.forEach(moment => {
      if (!moment || typeof moment !== "object") return;

      const at = Math.max(
        0,
        Math.trunc(num(moment.at, 0))
      );

      if (!grouped.has(at)) grouped.set(at, []);
      grouped.get(at).push(moment);
    });

    return [...grouped.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([at, group], index) => ({
        at,
        group,
        index
      }));
  }

  function sceneAt(section, sentence) {
    const list = scenes(section);

    let result = {
      index: -1,
      at: -1,
      group: []
    };

    for (const scene of list) {
      if (scene.at > sentence) break;
      result = scene;
    }

    return result;
  }

  function stageFor(state) {
    const root = state.root;
    if (!root) return null;

    const explicit = state.style.stage;

    if (explicit instanceof Element && root.contains(explicit)) {
      return explicit;
    }

    return root.querySelector(
      "[data-stage],.look-stage,.scene-stage,.stage,.visual-stage,.scene"
    ) || root;
  }

  function visible(el) {
    if (!(el instanceof Element) || !el.isConnected) {
      return false;
    }

    const css = getComputedStyle(el);

    if (
      css.display === "none" ||
      css.visibility === "hidden" ||
      Number(css.opacity) === 0
    ) {
      return false;
    }

    const r = el.getBoundingClientRect();
    return r.width > 3 && r.height > 3;
  }

  function semanticTargets(state, type) {
    const stage = stageFor(state);
    if (!stage) return [];

    const selectors = {
      title: "h1,h2,.hero-title,.cx-title",
      issue: ".chip,.cx-issue,.issue-card",
      statement: ".stmt,.cx-statement,.takeaway",
      compare: ".vs-i,.cx-pair,.compare-card",
      question: ".bigq,.cx-question,.question-card",
      formula: ".frac,.cx-formula",
      item: ".ring,.cx-entry,.item-card"
    };

    const selector = selectors[type];
    if (!selector) return [];

    return [...stage.querySelectorAll(selector)]
      .filter(visible)
      .filter(el => !el.closest("svg"))
      .filter(el =>
        !el.closest(
          "button,input,select,textarea,nav,[role='toolbar'],[data-player-controls]"
        )
      )
      .slice(-6);
  }

  /*
   * SEQUENCE EXTRACTION
   *
   * Unlike the original engine, nested SVG groups are traversed.
   * A group and its descendants are never animated twice.
   */

  function orderedElements(svgElement) {
    const explicit = [
      ...svgElement.querySelectorAll("[data-w10-seq]")
    ];

    const candidates = explicit.length
      ? explicit
      : [...svgElement.querySelectorAll(
          "g,rect,circle,ellipse,polygon,polyline,line,path,text"
        )];

    const unique = [...new Set(candidates)];

    const filtered = unique.filter(el => {
      if (["defs", "title", "desc"].includes(
        el.tagName.toLowerCase()
      )) return false;

      return !unique.some(parent =>
        parent !== el &&
        parent.contains(el) &&
        parent.tagName.toLowerCase() === "g" &&
        parent.hasAttribute("data-w10-seq")
      );
    });

    return filtered
      .map((el, index) => ({
        el,
        index,
        seq: num(el.getAttribute("data-w10-seq"), index)
      }))
      .sort((a, b) => a.seq - b.seq || a.index - b.index)
      .slice(0, 90)
      .map(item => item.el);
  }

  /*
   * GSAP DIAGRAM CHOREOGRAPHY
   *
   * The final state exists in the SVG before animation.
   * GSAP temporarily reveals its construction.
   */

  function animateDiagram(state, svgElement, tl, start = 0) {
    if (!tl || reduced()) return;

    const gs = window.gsap;
    const elements = orderedElements(svgElement);

    let cursor = start;

    elements.forEach(el => {
      const tag = el.tagName.toLowerCase();
      const isPath = el instanceof SVGPathElement;
      const draw = el.hasAttribute("data-w10-draw");
      const bar = el.hasAttribute("data-w10-bar") ||
        el.getAttribute("data-w10-role") === "adoption-bar";

      if (draw && isPath) {
        let length = 0;

        try {
          length = el.getTotalLength();
        } catch (_) {}

        if (length > 0) {
          gs.set(el, {
            strokeDasharray: length,
            strokeDashoffset: length
          });

          tl.to(el, {
            strokeDashoffset: 0,
            duration: clamp(length / 190, .25, .85),
            ease: "power2.inOut"
          }, cursor);

          cursor += .11;
          return;
        }
      }

      if (bar) {
        tl.fromTo(el, {
          scaleX: .001,
          opacity: .5,
          transformOrigin: "left center"
        }, {
          scaleX: 1,
          opacity: 1,
          duration: .7,
          ease: "power3.out"
        }, cursor);

        cursor += .12;
        return;
      }

      const isText = tag === "text";

      tl.fromTo(el, {
        opacity: 0,
        y: isText ? 5 : 9,
        scale: isText ? 1 : .94
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: isText ? .36 : .48,
        ease: "back.out(1.3)"
      }, cursor);

      cursor += isText ? .055 : .095;
    });

    const signature =
      svgElement.getAttribute("data-w10-signature");

    signatureMotion(state, svgElement, tl, signature);

    animateCounters(svgElement, tl);
    animateTokens(state, svgElement, tl);
  }

  /*
   * COUNTERS
   *
   * Every counter has a fixed final value.
   * No counter is invented from an unreported residual.
   */

  function animateCounters(svgElement, tl) {
    if (!tl || reduced()) return;

    svgElement.querySelectorAll("[data-w10-count]")
      .forEach(el => {
        const target = Number(
          el.getAttribute("data-w10-count")
        );

        if (!Number.isFinite(target)) return;

        const suffix =
          el.getAttribute("data-w10-suffix") || "";

        const value = { n: 0 };

        tl.to(value, {
          n: target,
          duration: .85,
          ease: "power2.out",
          onUpdate() {
            el.textContent =
              `${Math.round(value.n)}${suffix}`;
          },
          onComplete() {
            el.textContent = `${target}${suffix}`;
          }
        }, .12);
      });
  }

  /*
   * TOKENS
   *
   * Motion follows an actual path, rather than flying randomly
   * across the stage.
   */

  function animateTokens(state, svgElement, tl) {
    if (!tl || reduced()) return;

    const paths = [
      ...svgElement.querySelectorAll("[data-w10-token-path]")
    ].slice(0, 4);

    paths.forEach((route, index) => {
      let length = 0;

      try {
        length = route.getTotalLength();
      } catch (_) {}

      if (length < 8) return;

      const token = doc.createElementNS(NS, "circle");
      token.setAttribute("r", "4");
      token.setAttribute("class", "w10-flow-token");
      token.setAttribute("aria-hidden", "true");

      svgElement.appendChild(token);
      state.tokens.add(token);

      const progress = { p: 0 };

      tl.fromTo(token, {
        opacity: 0
      }, {
        opacity: 1,
        duration: .12
      }, .3 + index * .12);

      tl.to(progress, {
        p: 1,
        duration: clamp(length / 120, .55, 1.3),
        ease: "power1.inOut",
        onUpdate() {
          if (!token.isConnected) return;

          try {
            const point = route.getPointAtLength(
              length * progress.p
            );

            token.setAttribute(
              "transform",
              `translate(${point.x} ${point.y})`
            );
          } catch (_) {}
        }
      }, .4 + index * .12);

      tl.to(token, {
        opacity: 0,
        duration: .16
      }, ">-.12");
    });
  }

  /*
   * SIGNATURE MOTION
   *
   * Each visual has a distinctive animation verb.
   * The animation reinforces the concept; it does not replace it.
   */

  function signatureMotion(state, svgElement, tl, signature) {
    if (!tl || reduced()) return;

    const q = role =>
      [...svgElement.querySelectorAll(
        `[data-w10-role="${role}"]`
      )];

    switch (signature) {
      case "authority-dial": {
        const marker = q("decision-marker");
        const route = q("decision-route");
        const stamp = q("delegation-stamp");
        const result = q("decision-result");

        if (marker.length) {
          tl.fromTo(marker, {
            scale: .4
          }, {
            scale: 1.25,
            duration: .3,
            ease: "back.out(2)"
          }, .25);

          tl.to(marker, {
            scale: 1,
            duration: .2
          }, ">");
        }

        if (stamp.length) {
          tl.fromTo(stamp, {
            y: -16,
            opacity: 0,
            scale: 1.15
          }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: .45,
            ease: "bounce.out"
          }, .65);
        }

        if (route.length) {
          tl.fromTo(route, {
            opacity: .25
          }, {
            opacity: 1,
            duration: .4
          }, .9);
        }

        if (result.length) {
          tl.fromTo(result, {
            opacity: 0
          }, {
            opacity: 1,
            duration: .45
          }, 1.05);
        }
        break;
      }

      case "twenty-two-hosts": {
        const hosts = [
          ...q("host"),
          ...q("escalating"),
          ...q("departed")
        ];

        if (hosts.length) {
          tl.fromTo(hosts, {
            scale: 0,
            opacity: 0
          }, {
            scale: 1,
            opacity: 1,
            duration: .35,
            stagger: {
              each: .035,
              from: "start"
            },
            ease: "back.out(1.7)"
          }, .1);
        }

        const referrals = q("escalating");

        if (referrals.length) {
          tl.to(referrals, {
            y: -7,
            duration: .3,
            stagger: .055,
            yoyo: true,
            repeat: 1
          }, 1.05);
        }

        const departures = q("departed");

        if (departures.length) {
          tl.fromTo(departures, {
            opacity: 1
          }, {
            opacity: .28,
            duration: .7
          }, 1.1);
        }
        break;
      }

      case "scorecard-scale": {
        const beam = q("balance-beam");
        const exception = q("exception-task");

        if (beam.length) {
          tl.fromTo(beam, {
            rotation: -5
          }, {
            rotation: 0,
            duration: .8,
            ease: "elastic.out(1,.5)"
          }, .5);
        }

        if (exception.length) {
          tl.fromTo(exception, {
            y: -8,
            opacity: .4
          }, {
            y: 0,
            opacity: 1,
            duration: .6
          }, .8);
        }
        break;
      }

      case "dashboard-flip": {
        const front = q("dashboard-front");
        const cards = q("flip-card");

        if (front.length) {
          tl.fromTo(front, {
            scaleX: .94
          }, {
            scaleX: 1,
            duration: .55
          }, .1);
        }

        if (cards.length) {
          tl.fromTo(cards, {
            scaleX: .05,
            opacity: 0,
            transformOrigin: "center center"
          }, {
            scaleX: 1,
            opacity: 1,
            duration: .55,
            stagger: .17,
            ease: "power3.out"
          }, .75);
        }
        break;
      }

      case "evidence-board": {
        const cards = q("evidence-card");

        if (cards.length) {
          tl.fromTo(cards, {
            rotation: -3,
            y: -10,
            opacity: 0
          }, {
            rotation: 0,
            y: 0,
            opacity: 1,
            duration: .5,
            stagger: .18,
            ease: "back.out(1.4)"
          }, .15);
        }
        break;
      }

      case "knowledge-iceberg": {
        const hidden = q("hidden-knowledge");

        if (hidden.length) {
          tl.fromTo(hidden, {
            y: 13,
            opacity: .2
          }, {
            y: 0,
            opacity: 1,
            duration: .9,
            ease: "power2.out"
          }, .5);
        }
        break;
      }

      case "develop-handover": {
        const documents = q("handover-document");
        const gate = q("develop-gate");

        if (documents.length) {
          tl.fromTo(documents, {
            y: -10,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            duration: .45,
            stagger: .13
          }, .15);
        }

        if (gate.length) {
          tl.fromTo(gate, {
            scale: .9,
            opacity: .35
          }, {
            scale: 1,
            opacity: 1,
            duration: .65,
            ease: "back.out(1.5)"
          }, .85);
        }
        break;
      }

      case "two-process-lobby": {
        const bars = q("adoption-bar");

        if (bars.length) {
          tl.fromTo(bars, {
            scaleX: .01
          }, {
            scaleX: 1,
            duration: .9,
            stagger: .2,
            ease: "power2.out"
          }, .2);
        }
        break;
      }

      default:
        break;
    }
  }

  /*
   * SEMANTIC MOTION GRAMMAR
   *
   * Title: arrival.
   * Issue: disruption.
   * Statement: emphasis.
   * Compare: contrast.
   * Question: deliberate pause.
   * Formula: construction.
   * Item: progression.
   */

  function animateSemantic(state, scene, tl) {
    if (!tl || reduced()) return;

    const moment = scene.group[0] || {};
    const type = moment.type || "statement";
    const targets = semanticTargets(state, type);

    if (!targets.length) return;

    switch (type) {
      case "title":
        tl.fromTo(targets, {
          opacity: 0,
          y: 18,
          scale: .97
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: .72,
          stagger: .08
        }, 0);
        break;

      case "issue":
        tl.fromTo(targets, {
          x: -3
        }, {
          x: 0,
          duration: .11,
          repeat: 3,
          yoyo: true,
          ease: "power1.inOut"
        }, .1);
        break;

      case "statement":
        tl.fromTo(targets, {
          opacity: .3,
          y: 6
        }, {
          opacity: 1,
          y: 0,
          duration: .55,
          stagger: .07
        }, .1);
        break;

      case "compare": {
        const side = moment.side || "a";
        const direction = side === "b" ? 16 : -16;

        tl.fromTo(targets, {
          x: direction,
          opacity: .25
        }, {
          x: 0,
          opacity: 1,
          duration: .62,
          stagger: .06
        }, .05);

        if (moment.dir === "down") {
          tl.fromTo(targets, {
            y: 0
          }, {
            y: 4,
            duration: .35,
            yoyo: true,
            repeat: 1
          }, .65);
        }
        break;
      }

      case "question":
        tl.fromTo(targets, {
          scale: .96,
          opacity: .35
        }, {
          scale: 1,
          opacity: 1,
          duration: .65,
          ease: "back.out(1.25)"
        }, .1);

        tl.to(targets, {
          scale: 1.015,
          duration: .3,
          yoyo: true,
          repeat: 1
        }, .8);
        break;

      case "formula":
        tl.fromTo(targets, {
          scaleX: .7,
          opacity: .25
        }, {
          scaleX: 1,
          opacity: 1,
          duration: .65
        }, .1);
        break;

      case "item":
        tl.fromTo(targets, {
          y: 12,
          opacity: .2
        }, {
          y: 0,
          opacity: 1,
          duration: .5,
          stagger: .07
        }, .05);
        break;

      default:
        break;
    }
  }

  /*
   * EMPHASIS WITHOUT A SCREEN-WIDE SWEEP
   *
   * The small accent is reserved for titles and issues.
   */

  function accentBeat(state, scene, tl) {
    if (!tl || reduced()) return;

    const type = scene.group[0]?.type;

    if (type !== "title" && type !== "issue") {
      return;
    }

    const stage = stageFor(state);
    if (!stage) return;

    const layer = doc.createElement("div");
    layer.className = "w10-cine-accent";
    layer.setAttribute("aria-hidden", "true");

    const host = stage === state.root
      ? state.root
      : stage;

    const computed = getComputedStyle(host);

    if (computed.position === "static") {
      layer.style.position = "relative";
      layer.style.inset = "auto";
      layer.style.margin = "8px 8% 0";
    }

    host.appendChild(layer);
    state.overlay = layer;

    tl.fromTo(layer, {
      scaleX: 0,
      opacity: 0
    }, {
      scaleX: 1,
      opacity: .8,
      duration: .5
    }, .1);

    tl.to(layer, {
      opacity: 0,
      duration: .45
    }, 1.1);
  }

  /*
   * NULL-LINE MICRO-BEATS
   *
   * These do not create a new scene or replace the retained visual.
   */

  function microBeat(state) {
    if (reduced() || !gsapAvailable()) return;

    const stage = stageFor(state);
    if (!stage) return;

    const svgElement = [...stage.querySelectorAll("svg.dg")]
      .filter(visible)
      .at(-1);

    const tl = timeline(state);
    if (!tl) return;

    if (svgElement) {
      const focus = svgElement.querySelector(
        '[data-w10-role="decision-marker"],' +
        '[data-w10-role="missing-owner"],' +
        '[data-w10-role="evidence-card"],' +
        '[data-w10-role="capability-gate"],' +
        '[data-w10-role="develop-gate"]'
      );

      if (focus) {
        tl.fromTo(focus, {
          scale: 1
        }, {
          scale: 1.07,
          duration: .25,
          yoyo: true,
          repeat: 1
        }, 0);
      } else {
        const pathElement =
          svgElement.querySelector("[data-w10-token-path]");

        if (pathElement) {
          animateTokens(state, svgElement, tl);
        } else {
          const last = orderedElements(svgElement).at(-1);

          if (last) {
            tl.fromTo(last, {
              opacity: .55
            }, {
              opacity: 1,
              duration: .35
            }, 0);
          }
        }
      }
    } else {
      const targets = semanticTargets(state, "statement");

      if (targets.length) {
        tl.fromTo(targets.at(-1), {
          opacity: .7
        }, {
          opacity: 1,
          duration: .35
        }, 0);
      }
    }

    playTimeline(state, tl, true);
  }

  /*
   * SCENE RENDERING
   */

  function renderBeat(state, scene, animate) {
    if (!state.root?.isConnected) return;

    clearWork(state);

    state.root.dataset.w10Scene = String(scene.index);
    state.root.dataset.w10Moment =
      scene.group[0]?.type || "cover";

    const stage = stageFor(state);
    if (!stage) return;

    const svgs = [...stage.querySelectorAll("svg.dg")]
      .filter(visible)
      .slice(-2);

    svgs.forEach(settleDiagram);

    if (!animate || reduced() || !gsapAvailable()) {
      settleNumbers(stage);
      return;
    }

    const tl = timeline(state);
    if (!tl) return;

    svgs.forEach((element, index) => {
      animateDiagram(state, element, tl, index * .12);
    });

    animateSemantic(state, scene, tl);
    accentBeat(state, scene, tl);

    playTimeline(state, tl, true);
  }

  function queueBeat(state, scene, animate) {
    const epoch = state.epoch;

    frame(state, () => {
      frame(state, () => {
        if (epoch !== state.epoch) return;
        renderBeat(state, scene, animate);
      });
    });
  }

  /*
   * RESIZE SAFETY
   *
   * Ignore tiny browser-chrome changes and debounce substantial ones.
   */

  function attachResize(state) {
    state.observer?.disconnect();
    state.observer = null;

    if (
      typeof ResizeObserver !== "function" ||
      !state.root
    ) return;

    state.observer = new ResizeObserver(entries => {
      const box = entries[0]?.contentRect;
      if (!box) return;

      const next = {
        w: box.width,
        h: box.height
      };

      const previous = state.size;
      state.size = next;

      if (!previous) return;

      if (
        Math.abs(previous.w - next.w) < 8 &&
        Math.abs(previous.h - next.h) < 8
      ) return;

      clearTimeout(state.resizeTimer);

      state.resizeTimer = setTimeout(() => {
        if (!state.section || !state.root?.isConnected) {
          return;
        }

        const scene = sceneAt(
          state.section,
          state.sentence
        );

        queueBeat(state, scene, false);
      }, 150);
    });

    state.observer.observe(state.root);
  }

  /*
   * INSTALLATION
   *
   * Wrappers preserve original arguments, return values and look state.
   * No modification is made to the four look implementations.
   */

  function install(style) {
    if (
      !style ||
      !LOOK_IDS.has(style.id) ||
      installed.has(style)
    ) return;

    if (
      !["mount", "load", "step"]
        .every(name => typeof style[name] === "function")
    ) return;

    const base = {
      mount: style.mount,
      load: style.load,
      step: style.step
    };

    const state = stateFor(style);

    style.mount = function mountWeek10Cinematics(element) {
      clearWork(state);

      state.observer?.disconnect();
      clearTimeout(state.resizeTimer);

      const result = base.mount.apply(this, arguments);

      state.root = element || null;
      state.section = null;
      state.sentence = -1;
      state.scene = -1;
      state.size = null;

      if (element) {
        element.dataset.w10Cinematics = "on";
        element.dataset.w10Look = style.id;
        attachResize(state);
      }

      return result;
    };

    style.load = function loadWeek10Cinematics(section) {
      clearWork(state);

      state.section = section || null;
      state.sentence = -1;
      state.scene = -1;

      const result = base.load.apply(this, arguments);

      if (state.root) {
        state.root.dataset.w10Cinematics = "on";
        state.root.dataset.w10Look = style.id;

        queueBeat(
          state,
          sceneAt(state.section, -1),
          false
        );
      }

      return result;
    };

    style.step = function stepWeek10Cinematics(index) {
      const target = Math.max(
        -1,
        Math.trunc(num(index, -1))
      );

      const previousSentence = state.sentence;
      const previousScene = state.scene;

      const scene = sceneAt(state.section, target);

      const result = base.step.apply(this, arguments);

      const adjacent = target === previousSentence + 1;
      const changed = scene.index !== previousScene;
      const repeated = target === previousSentence;

      state.sentence = target;
      state.scene = scene.index;

      if (changed || repeated || !adjacent) {
        queueBeat(
          state,
          scene,
          adjacent && changed && !repeated && target >= 0
        );
      } else if (adjacent && target >= 0) {
        clearWork(state);

        frame(state, () => {
          microBeat(state);
        });
      }

      return result;
    };

    installed.add(style);
  }

  function installAll() {
    if (!active()) return;

    ensureCss();

    (window.STYLES || []).forEach(install);
  }

  /*
   * PUBLIC CONTROL API
   *
   * pause(), resume() and rate() can be called by the voice player.
   * seek() settles to the requested narration sentence.
   *
   * No automatic assumption is made about the host player's private
   * event names or speech-engine implementation.
   */

  function eachState(callback) {
    (window.STYLES || []).forEach(style => {
      if (!installed.has(style)) return;
      callback(stateFor(style));
    });
  }

  function pause() {
    eachState(state => {
      state.paused = true;
      state.timeline?.pause();
    });
  }

  function resume() {
    eachState(state => {
      state.paused = false;

      if (!reduced()) {
        state.timeline?.resume();
      }
    });
  }

  function setRate(value) {
    const rate = clamp(num(value, 1), .25, 4);

    eachState(state => {
      state.rate = rate;
      state.timeline?.timeScale(rate);
    });

    return rate;
  }

  function seek(index) {
    const target = Math.max(
      -1,
      Math.trunc(num(index, -1))
    );

    eachState(state => {
      state.sentence = target;

      const scene = sceneAt(state.section, target);
      state.scene = scene.index;

      queueBeat(state, scene, false);
    });
  }

  function settle(root = doc) {
    root.querySelectorAll?.("svg.w10-dg")
      .forEach(settleDiagram);

    settleNumbers(root);
  }

  function destroy() {
    eachState(state => {
      clearWork(state);

      state.observer?.disconnect();
      state.observer = null;

      clearTimeout(state.resizeTimer);
      state.resizeTimer = null;
    });
  }

  /*
   * PUBLIC DIAGRAM LIBRARY
   *
   * All functions return SVG strings.
   *
   * Existing calls remain supported:
   *   W10_DIAG.raci(...)
   *   W10_DIAG.authority(...)
   *   W10_DIAG.measures()
   *   W10_DIAG.capability()
   *   W10_DIAG.adoption()
   *   W10_DIAG.readiness()
   *   W10_DIAG.caseTimeline()
   *   W10_DIAG.handover()
   *
   * Additional authoring functions are available for the revised
   * Week 10 moments and course.
   */

  const DIAG = Object.freeze({
    raci,
    raciMatrix,
    authority,
    measures,
    capability,
    adoption,
    readiness,
    caseTimeline,
    handover,
    hosts,
    iceberg,
    dashboardFlip,
    repair
  });

  const API = Object.freeze({
    version: VERSION,
    diagrams: DIAG,
    install: installAll,
    pause,
    resume,
    rate: setRate,
    seek,
    settle,
    destroy,
    reducedMotion: reduced,
    active
  });

  window.W10_CINEMATICS = API;
  window.W10_DIAG = DIAG;

  /*
   * INSTALLATION TIMING
   *
   * Cinematics may load before course.js so that W10_DIAG is
   * available during course construction.
   *
   * It may also load after the look registry. install() is safe
   * to call repeatedly and wraps each look only once.
   */

  if (doc.readyState === "loading") {
    doc.addEventListener(
      "DOMContentLoaded",
      installAll,
      { once: true }
    );
  } else {
    installAll();
  }

  window.addEventListener("pageshow", installAll);

  /*
   * Optional public event bridge.
   * The host may dispatch these events without coupling to this API.
   */

  window.addEventListener("w10:voice-pause", pause);
  window.addEventListener("w10:voice-resume", resume);

  window.addEventListener("w10:voice-rate", event => {
    setRate(event.detail?.rate);
  });

  window.addEventListener("w10:voice-seek", event => {
    seek(event.detail?.index);
  });

  /*
   * Honour operating-system motion-preference changes immediately.
   */

  try {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    media.addEventListener?.("change", () => {
      if (!reduced()) return;

      eachState(state => {
        clearWork(state);

        const scene = sceneAt(
          state.section,
          state.sentence
        );

        queueBeat(state, scene, false);
      });
    });
  } catch (_) {}

})();