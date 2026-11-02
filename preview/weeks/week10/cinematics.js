(() => {
  "use strict";

  /*
   * VoiceLearn · OPER621 · Week 10
   * THE PEOPLE PHASE — CINEMATIC ENGINE
   * Version 3.0.0
   *
   * DESIGN CONTRACT
   * ---------------
   * 1. Motion must explain a decision, contradiction, consequence or change.
   * 2. The four looks retain their own colours, fonts and layouts.
   * 3. The look renderer owns semantic content.
   * 4. This engine never changes narration, questions or assessment state.
   * 5. A null moment retains its visual.
   * 6. Same-kind visuals transition by difference, not full reconstruction.
   * 7. Seeking, replaying and changing looks must not accumulate animations.
   * 8. Reduced motion displays complete, meaningful final states.
   * 9. GSAP is optional. Its absence must not break the lesson.
   * 10. Narration and learner controls always take priority over animation.
   *
   * SOURCE INTEGRITY
   * ----------------
   * Observed Qasr facts:
   * - 22 Guest Hosts across four pilot properties.
   * - 22 attended a four-hour induction.
   * - No post-induction capability assessment was conducted.
   * - Nine of 22 refer every rate discrepancy.
   * - 65% kiosk adoption and 29% desk handling at week eleven.
   * - Revised descriptions arrived three weeks after go-live.
   * - Communicated AED 400 waiver is absent from formal delegation.
   * - Inherited objectives reward check-in volume and speed.
   * - Two resignations, with individual motives unknown.
   * - One pilot property reinstated a permanent desk.
   *
   * AED 320, AED 460, Layla, Mr Haddad and simulated guest movements
   * are illustrative, not observed Qasr transactions or individuals.
   *
   * LOAD ORDER
   * ----------
   * Preferred:
   *   cinematics.js
   *   course.js
   *   moments.js
   *
   * The engine also tolerates late look registration.
   */

  const VERSION = "3.0.0";
  const NS = "http://www.w3.org/2000/svg";
  const doc = document;
  const LOOK_IDS = new Set(["story", "codex", "notebook", "journey"]);
  const states = new WeakMap();
  const installed = new WeakSet();
  const originals = new WeakMap();
  const live = new Set();
  const warned = new Set();

  if (window.W10_CINEMATICS?.version === VERSION) return;

  const num = (v, d = 0) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : d;
  };

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const finite = (v, d = 0) => clamp(num(v, d), -100000, 100000);
  const str = v => v == null ? "" : String(v);
  const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

  const esc = v => str(v).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  }[c]));

  const active = () =>
    Number(window.WEEK) === 10 ||
    window.COURSE?.id === "oper621-w10";

  const gsapReady = () =>
    typeof window.gsap?.timeline === "function";

  function warnOnce(key, message) {
    if (warned.has(key)) return;
    warned.add(key);
    console.warn("[VoiceLearn Week 10]", message);
  }

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
   * PALETTE
   *
   * No new colour values are introduced.
   * The current look supplies every colour.
   */

  const C = Object.freeze({
    ink: "var(--w10-ink, currentColor)",
    line: "var(--w10-line, currentColor)",
    accent: "var(--w10-accent, var(--accent, currentColor))",
    ok: "var(--w10-ok, var(--good, var(--accent, currentColor)))",
    warn: "var(--w10-warn, var(--warning, var(--accent, currentColor)))",
    bad: "var(--w10-bad, var(--danger, currentColor))",
    paper: "var(--w10-paper, var(--surface, transparent))",
    muted: "var(--w10-muted, currentColor)"
  });

  /*
   * SVG PRIMITIVES
   *
   * Every SVG is complete before animation.
   * Animation only changes how the learner discovers its contents.
   */

  function attrs(o) {
    return Object.entries(o)
      .filter(([, v]) => v !== undefined && v !== null && v !== false)
      .map(([k, v]) => `${k}="${esc(v)}"`).join(" ");
  }

  function svg(kind, height, label, body, signature = kind) {
    return `<svg class="dg w10-dg w10-${esc(kind)}"
      data-w10-kind="${esc(kind)}"
      data-w10-signature="${esc(signature)}"
      viewBox="0 0 320 ${finite(height, 180)}"
      preserveAspectRatio="xMidYMid meet"
      role="img" aria-label="${esc(label)}">
      <title>${esc(label)}</title>
      <desc>${esc(label)}</desc>
      ${body}
    </svg>`;
  }

  function txt(x, y, value, o = {}) {
    const size = clamp(num(o.size, 10), 5, 38);
    const lines = str(value).split("|");
    const start = y - (lines.length - 1) * size * .56;
    const key = o.key || o.role || "";
    const a = attrs({
      x, y: start,
      "font-size": size,
      "font-weight": num(o.weight, 650),
      "text-anchor": o.anchor || "middle",
      "dominant-baseline": "middle",
      fill: o.fill || C.ink,
      "data-w10-seq": num(o.seq, 0),
      "data-w10-role": o.role,
      "data-w10-key": key || undefined,
      "data-w10-count": Number.isFinite(o.count) ? o.count : undefined,
      "data-w10-suffix": o.suffix
    });

    return `<text ${a}>${lines.map((part, i) =>
      `<tspan x="${x}" dy="${i ? size * 1.16 : 0}">${esc(part)}</tspan>`
    ).join("")}</text>`;
  }

  function rect(x, y, w, h, o = {}) {
    return `<rect ${attrs({
      x, y, width: w, height: h,
      rx: num(o.rx, 7),
      fill: o.fill || C.paper,
      stroke: o.stroke || C.line,
      "stroke-width": num(o.sw, 1.3),
      "stroke-dasharray": o.dash,
      "data-w10-seq": num(o.seq, 0),
      "data-w10-role": o.role,
      "data-w10-key": o.key || o.role
    })}/>`;
  }

  function circle(x, y, r, o = {}) {
    return `<circle ${attrs({
      cx: x, cy: y, r,
      fill: o.fill || C.paper,
      stroke: o.stroke || C.line,
      "stroke-width": num(o.sw, 1.4),
      "data-w10-seq": num(o.seq, 0),
      "data-w10-role": o.role,
      "data-w10-key": o.key || o.role
    })}/>`;
  }

  function path(d, o = {}) {
    return `<path ${attrs({
      d, fill: o.fill || "none",
      stroke: o.stroke || C.line,
      "stroke-width": num(o.sw, 2),
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "data-w10-seq": num(o.seq, 0),
      "data-w10-role": o.role,
      "data-w10-key": o.key || o.role,
      "data-w10-draw": o.draw === false ? undefined : "true",
      "data-w10-token-path": o.token ? "true" : undefined
    })}/>`;
  }

  function badge(x, y, value, o = {}) {
    const w = num(o.w, 82), h = num(o.h, 24);
    const colour = o.colour || C.accent;
    return rect(x, y, w, h, {
      stroke: colour, rx: h / 2,
      seq: o.seq, role: o.role, key: o.key
    }) + txt(x + w / 2, y + h / 2, value, {
      size: num(o.size, 8),
      fill: colour, seq: num(o.seq, 0) + 1,
      key: `${o.key || o.role || "badge"}-text`
    });
  }

  /*
   * SIGNATURE 1 — THE AUTHORITY DECISION
   *
   * Three independent checks:
   * eligibility, monetary limit and documented delegation.
   *
   * The decision changes because the rule changes,
   * not because the employee suddenly becomes braver.
   */

  function authority(options = {}) {
    const amount = Math.max(0, num(options.amount, 320));
    const documented = Boolean(options.documented);
    const eligible = options.eligible !== false;
    const mini = Boolean(options.mini);
    const within = amount <= 400;
    const local = eligible && documented && within;

    const reason = !eligible
      ? "NOT ELIGIBLE"
      : !documented
        ? "DELEGATION MISSING"
        : !within
          ? "ABOVE AED 400"
          : "LOCAL DECISION PERMITTED";

    const colour = local ? C.ok : C.warn;

    if (mini) {
      const body =
        rect(6, 8, 308, 48, {
          stroke: colour, role: "mini-boundary", key: "boundary"
        }) +
        txt(58, 32, `AED ${amount}`, {
          size: 15, weight: 900, fill: C.accent,
          role: "amount", key: "amount",
          count: amount
        }) +
        txt(202, 32, reason, {
          size: 9, fill: colour,
          role: "decision-result", key: "result"
        });

      return svg("authority-mini", 65,
        `Illustrative AED ${amount}. ${reason}.`,
        body, "authority-mini");
    }

    let b = "";

    b += txt(160, 15, "ILLUSTRATIVE RATE DISCREPANCY", {
      size: 8.5, fill: C.muted, seq: 1
    });

    b += txt(160, 46, String(amount), {
      size: 32, weight: 900, fill: C.accent,
      seq: 2, role: "amount", key: "amount",
      count: amount
    });

    b += txt(160, 67, "AED", {
      size: 9, seq: 3
    });

    b += path("M28 91H292", {
      sw: 3, seq: 4, role: "authority-track",
      key: "track"
    });

    b += path("M28 91H226", {
      stroke: C.accent, sw: 5, seq: 5,
      role: "decision-track", key: "decision-track"
    });

    const markerX = 28 + Math.min(amount, 500) / 500 * 264;

    b += circle(markerX, 91, 7, {
      fill: colour, stroke: colour,
      seq: 6, role: "decision-marker", key: "marker"
    });

    b += path("M226 82V101", {
      stroke: C.warn, sw: 2, seq: 7,
      role: "limit-marker", key: "limit"
    });

    b += txt(226, 111, "AED 400", {
      size: 8, fill: C.muted, seq: 8
    });

    b += rect(9, 131, 139, 52, {
      stroke: C.ok, seq: 9,
      role: "host-card", key: "host-card"
    });

    b += txt(78, 150, "GUEST HOST", {
      size: 10, fill: C.ok, seq: 10
    });

    b += txt(78, 169, "Local decision", {
      size: 8, seq: 11
    });

    b += rect(172, 131, 139, 52, {
      stroke: C.warn, seq: 12,
      role: "manager-card", key: "manager-card"
    });

    b += txt(241, 150, "DUTY MANAGER", {
      size: 10, fill: C.warn, seq: 13
    });

    b += txt(241, 169, "Authorised review", {
      size: 8, seq: 14
    });

    b += path(local
      ? "M160 116C130 123 101 125 78 131"
      : "M160 116C190 123 219 125 241 131", {
      stroke: colour, sw: 3, seq: 15,
      token: true, role: "decision-route",
      key: "decision-route"
    });

    b += badge(25, 195,
      documented ? "DOCUMENTED" : "EMAIL ONLY", {
      w: 118, colour: documented ? C.ok : C.bad,
      seq: 16, role: "delegation-stamp",
      key: "delegation"
    });

    b += badge(177, 195,
      eligible ? "ELIGIBLE" : "INELIGIBLE", {
      w: 118, colour: eligible ? C.ok : C.warn,
      seq: 18, role: "eligibility-stamp",
      key: "eligibility"
    });

    b += txt(160, 235, reason, {
      size: 10, weight: 900, fill: colour,
      seq: 20, role: "decision-result", key: "result"
    });

    b += txt(160, 253,
      local
        ? "Permission is not automatic approval."
        : "Investigate, document and use the authorised route.", {
      size: 7.8, seq: 21
    });

    return svg("authority", 269,
      `Illustrative AED ${amount} discrepancy. ${reason}. ` +
      "Local approval requires eligibility, the monetary limit " +
      "and documented authority.",
      b, "authority-dial");
  }

  /*
   * SIGNATURE 2 — TWENTY-TWO PEOPLE, ONE CAST
   *
   * Dot positions are stable identifiers for animation.
   * They do not identify real employees.
   */

  function hosts(options = {}) {
    const mode = str(options.mode || "team");
    const highlighted = mode === "referrals" ? 9 : 0;
    const departures = mode === "departures" ? 2 : 0;

    let b = txt(160, 15, "22 GUEST HOSTS", {
      size: 12, weight: 900, seq: 1
    });

    for (let i = 0; i < 22; i++) {
      const x = 40 + (i % 11) * 24;
      const y = 52 + Math.floor(i / 11) * 29;
      const isReferral = i < highlighted;
      const isDeparture = departures && i >= 20;

      const colour = isDeparture ? C.bad :
        isReferral ? C.warn : C.ok;

      b += circle(x, y, 7, {
        fill: isDeparture ? C.paper : colour,
        stroke: colour, sw: isDeparture ? 2 : 1,
        seq: i + 2,
        role: isDeparture ? "departed" :
          isReferral ? "escalating" : "host",
        key: `host-${i}`
      });

      if (isDeparture) {
        b += path(
          `M${x - 4} ${y - 4}L${x + 4} ${y + 4}` +
          `M${x + 4} ${y - 4}L${x - 4} ${y + 4}`, {
          stroke: C.bad, sw: 1.5,
          seq: i + 2, role: "departure-mark",
          key: `departure-${i}`
        });
      }
    }

    const labels = {
      team: ["ONE TEAM", "Twenty-two redesigned roles"],
      training: ["22 OF 22", "Attended four-hour induction"],
      assessment: ["NOT ASSESSED", "No post-induction capability assessment"],
      referrals: ["9 OF 22", "Refer every rate discrepancy"],
      departures: ["2 RESIGNED", "Individual motives unknown"]
    };

    const [heading, detail] = labels[mode] || labels.team;

    b += txt(160, 134, heading, {
      size: 16, weight: 900,
      fill: highlighted ? C.warn :
        departures ? C.bad : C.accent,
      seq: 30, role: "host-result", key: "host-result"
    });

    b += txt(160, 156, detail, {
      size: 8.6, seq: 31, key: "host-detail"
    });

    b += txt(160, 178,
      "Dot positions are illustrative; identities are unknown.", {
      size: 7.1, fill: C.muted, seq: 32
    });

    return svg("hosts", 193,
      `Twenty-two Guest Hosts. ${heading}. ${detail}. ` +
      "Dot positions do not identify real employees.",
      b, "twenty-two-hosts");
  }

  /*
   * SIGNATURE 3 — THE SCORECARD SCALE
   *
   * The old measure can make complex work appear less valuable.
   * The proposed measure restores balance with quality safeguards.
   */

  function measures(options = {}) {
    const aligned = Boolean(options.aligned);

    const old = Array.isArray(options.old) ? options.old :
      ["Check-ins per shift", "Average speed"];

    const proposed = Array.isArray(options.new) ? options.new :
      ["Correct resolution", "Quality review"];

    const labels = aligned ? proposed : old;
    const title = options.title ||
      (aligned ? "THE PROPOSED SCORECARD" : "THE INHERITED SCORECARD");

    let b = txt(160, 16, title, {
      size: 10.5, weight: 900, seq: 1
    });

    b += path(aligned
      ? "M42 85H278"
      : "M42 102L278 68", {
      stroke: C.accent, sw: 4, seq: 2,
      role: "balance-beam", key: "beam"
    });

    b += path("M160 87L143 123H177Z", {
      fill: C.paper, stroke: C.line, sw: 2,
      seq: 3, role: "balance-pivot", key: "pivot"
    });

    b += rect(9, aligned ? 66 : 83, 126, 52, {
      stroke: aligned ? C.ok : C.warn,
      seq: 4, role: "routine-task", key: "left-weight"
    });

    b += txt(72, aligned ? 85 : 102, labels[0] || "", {
      size: 8.1, seq: 5,
      fill: aligned ? C.ok : C.warn,
      key: "left-label"
    });

    b += rect(185, aligned ? 66 : 49, 126, 52, {
      stroke: aligned ? C.ok : C.bad,
      seq: 6, role: "exception-task", key: "right-weight"
    });

    b += txt(248, aligned ? 85 : 68, labels[1] || "", {
      size: 8.1, seq: 7,
      fill: aligned ? C.ok : C.bad,
      key: "right-label"
    });

    b += txt(160, 149,
      aligned
        ? "Quality and resolution support each other."
        : "Complex work can lose against the old target.", {
      size: 8.4, seq: 8, key: "scorecard-conclusion"
    });

    return svg("measures", 166,
      aligned
        ? "Illustrative proposed measures balance appropriate resolution and quality."
        : "Inherited throughput measures may discourage difficult exception handling.",
      b, "scorecard-scale");
  }

  /*
   * SIGNATURE 4 — CAPABILITY
   *
   * Labels and captions are configurable for remedial worlds.
   */

  function capability(options = {}) {
    const stages = options.stages || [
      ["EXPLAIN", "Know the rule"],
      ["PRACTISE", "Try the case"],
      ["FEEDBACK", "Correct errors"],
      ["DEMONSTRATE", "Show judgement"]
    ];

    let b = txt(160, 15,
      options.title || "FROM ATTENDANCE TO CAPABILITY", {
      size: 9.6, weight: 900, seq: 1
    });

    stages.slice(0, 4).forEach((stage, i) => {
      const x = 7 + i * 79;
      const colour = i === 3 ? C.ok : C.line;

      b += rect(x, 51, 69, 69, {
        stroke: colour, seq: 3 + i * 4,
        role: i === 3 ? "capability-gate" : "learning-stage",
        key: `capability-${i}`
      });

      b += txt(x + 34.5, 73, stage[0], {
        size: 7.5, fill: colour,
        seq: 4 + i * 4
      });

      b += txt(x + 34.5, 97, stage[1], {
        size: 7.2, seq: 5 + i * 4
      });

      if (i < 3) {
        b += path(`M${x + 70} 86H${x + 78}`, {
          stroke: C.accent, sw: 2,
          seq: 6 + i * 4
        });
      }
    });

    b += txt(160, 146,
      options.caption ||
      "Demonstrated judgement requires realistic assessment.", {
      size: 8.1, seq: 20
    });

    return svg("capability", 163,
      "Capability requires explanation, realistic practice, " +
      "feedback and demonstrated performance.",
      b, "capability");
  }

  /*
   * SIGNATURE 5 — READINESS
   *
   * The five conditions are displayed as a connected system.
   * Missing evidence is not treated as a measured failure.
   */

  function readiness(options = {}) {
    const reveal = Boolean(options.reveal);
    const selected = clamp(Math.trunc(num(options.selected, 0)), 0, 5);

    const labels = [
      "ROLE", "AUTHORITY", "MEASURES",
      "CAPABILITY", "ADOPTION"
    ];

    let b = txt(160, 16,
      reveal ? "LOOK BEHIND THE GREEN STATUS" :
        "FIVE CONDITIONS FOR READINESS", {
      size: 10, weight: 900, seq: 1
    });

    labels.forEach((label, i) => {
      const x = 12 + (i % 3) * 103;
      const y = 41 + Math.floor(i / 3) * 65;
      const done = i < selected;

      b += rect(x, y, 91, 53, {
        stroke: done ? C.ok : C.line,
        sw: done ? 2 : 1.2,
        seq: 3 + i * 3,
        role: "readiness-tile",
        key: `readiness-${i}`
      });

      b += txt(x + 45.5, y + 20, label, {
        size: 8.7, weight: 800,
        fill: done ? C.ok : C.ink,
        seq: 4 + i * 3
      });

      b += txt(x + 45.5, y + 39,
        done ? "SELECTED" : "REQUIRES EVIDENCE", {
        size: 6.8, seq: 5 + i * 3
      });
    });

    b += txt(160, 177,
      "A completed activity is not proof of readiness.", {
      size: 8.5, seq: 23
    });

    return svg("readiness", 193,
      "Readiness requires role clarity, documented authority, " +
      "aligned measures, demonstrated capability and adoption ownership.",
      b, "five-slot-readiness");
  }

  /*
   * SIGNATURE 6 — RACI
   */

  function raci(options = {}) {
    const task = options.task || "Investigate a rate discrepancy";
    const responsible = options.responsible || "Guest Host";
    const accountable = options.accountable || "Process owner";
    const missing = Boolean(options.missing);

    let b = txt(160, 17, task, {
      size: 10.5, weight: 800, seq: 1
    });

    b += rect(9, 48, 133, 74, {
      stroke: C.ok, seq: 2,
      role: "responsible", key: "responsible"
    });

    b += txt(75, 68, "R · DOES THE WORK", {
      size: 8.2, fill: C.ok, seq: 3
    });

    b += txt(75, 94, responsible, {
      size: 10.5, weight: 800, seq: 4
    });

    b += path("M144 85H176", {
      stroke: C.accent, sw: 2.5,
      token: true, seq: 5
    });

    b += rect(178, 48, 133, 74, {
      stroke: missing ? C.bad : C.warn,
      dash: missing ? "5 4" : undefined,
      seq: 6, role: missing ? "missing-owner" : "accountable",
      key: "accountable"
    });

    b += txt(244, 68,
      missing ? "A · MISSING" : "A · OWNS THE RESULT", {
      size: 8.1,
      fill: missing ? C.bad : C.warn,
      seq: 7
    });

    b += txt(244, 94,
      missing ? "No named owner" : accountable, {
      size: 10, weight: 800, seq: 8
    });

    b += txt(160, 149,
      missing
        ? "The work is assigned. The final owner is not."
        : "Performing and owning are different contributions.", {
      size: 8.1, seq: 9
    });

    return svg("raci", 164,
      `${responsible} performs ${task}. ` +
      (missing ? "Accountability is missing." :
        `${accountable} is accountable.`),
      b, "raci");
  }

  function raciMatrix(options = {}) {
    const missing = Boolean(options.missing);
    const roles = options.roles || [
      "Sponsor", "Owner", "Host", "Manager"
    ];

    const rows = options.rows || [
      ["Set standard", "A", "R", "I", "C"],
      ["Build workflow", "C", missing ? "?" : "A", "R", "C"],
      ["Resolve guest", "I", "A", "R", "C"],
      ["Review quality", "I", "A", "C", "R"]
    ];

    let b = txt(160, 13, "WHO DOES WHAT?", {
      size: 11, weight: 900, seq: 1
    });

    roles.slice(0, 4).forEach((role, i) => {
      b += txt(137 + i * 43, 39, role, {
        size: 7.2, seq: i + 2
      });
    });

    rows.slice(0, 4).forEach((row, r) => {
      const y = 57 + r * 27;

      b += txt(8, y, row[0], {
        size: 7.5, anchor: "start", seq: 10 + r
      });

      row.slice(1, 5).forEach((letter, c) => {
        const x = 121 + c * 43;
        const colour = letter === "A" ? C.warn :
          letter === "R" ? C.ok :
          letter === "?" ? C.bad : C.line;

        b += rect(x, y - 11, 31, 22, {
          rx: 4, stroke: colour,
          seq: 20 + r * 8 + c * 2,
          role: letter === "?" ? "missing-owner" : "raci-cell",
          key: `raci-${r}-${c}`
        });

        b += txt(x + 15.5, y, letter, {
          size: 10, weight: 900, fill: colour,
          seq: 21 + r * 8 + c * 2
        });
      });
    });

    b += txt(160, 181,
      missing
        ? "The workflow row has no accountable owner."
        : "Each activity has one accountable owner.", {
      size: 8.4, seq: 55
    });

    return svg("raci-matrix", 195,
      missing
        ? "Illustrative RACI matrix with a missing accountable owner."
        : "Illustrative RACI matrix with clear accountability.",
      b, "raci-matrix");
  }

  /*
   * SIGNATURE 7 — THE TWO-PROCESS LOBBY
   *
   * No invented classification for the unreported remainder.
   * Guest movement is explicitly illustrative.
   */

  function adoption(options = {}) {
    const lobby = Boolean(options.lobby);
    const deskReturned = Boolean(options.deskReturned);

    let b = txt(160, 15, "WEEK 11 · REPORTED CHANNELS", {
      size: 10, weight: 900, seq: 1
    });

    b += rect(12, 43, 296, 39, {
      stroke: C.line, rx: 3, seq: 2
    });

    b += rect(12, 43, 192.4, 39, {
      fill: C.ok, stroke: C.ok, rx: 0,
      seq: 3, role: "adoption-bar", key: "kiosk-bar"
    });

    b += rect(204.4, 43, 85.84, 39, {
      fill: C.warn, stroke: C.warn, rx: 0,
      seq: 4, role: "adoption-bar", key: "desk-bar"
    });

    b += txt(108, 63, "65%", {
      size: 14, weight: 900,
      fill: C.ink, seq: 5,
      count: 65, suffix: "%",
      key: "kiosk-count"
    });

    b += txt(247, 63, "29%", {
      size: 12, weight: 900,
      fill: C.ink, seq: 6,
      count: 29, suffix: "%",
      key: "desk-count"
    });

    b += txt(108, 101, "KIOSK", {
      size: 9, fill: C.ok, seq: 7
    });

    b += txt(247, 101, "DESK", {
      size: 9, fill: C.warn, seq: 8
    });

    b += txt(160, 120,
      "Remaining channel classification: not reported", {
      size: 8, fill: C.muted, seq: 9
    });

    if (!lobby) {
      return svg("adoption", 136,
        "Observed week-eleven channels: 65 percent kiosk use, " +
        "29 percent desk handling. Other classification not reported.",
        b, "two-process-lobby");
    }

    b += rect(12, 145, 296, 111, {
      stroke: C.line, rx: 9, seq: 10,
      role: "lobby-floor", key: "lobby-floor"
    });

    b += txt(160, 157, "ILLUSTRATIVE LOBBY MOVEMENT", {
      size: 7.5, fill: C.muted, seq: 11
    });

    b += rect(36, 181, 99, 44, {
      stroke: C.ok, seq: 12,
      role: "kiosk-zone", key: "kiosk-zone"
    });

    b += txt(85, 202, "KIOSKS", {
      size: 10, fill: C.ok, seq: 13
    });

    b += rect(186, 181, 99, 44, {
      stroke: C.warn, seq: 14,
      role: "desk-zone", key: "desk-zone"
    });

    b += txt(235, 202, "DESK", {
      size: 10, fill: C.warn, seq: 15
    });

    b += path("M160 245C125 241 103 234 85 225", {
      stroke: C.ok, sw: 2.5, seq: 16,
      token: true, role: "kiosk-route", key: "kiosk-route"
    });

    b += path("M160 245C194 241 216 234 235 225", {
      stroke: C.warn, sw: 2.5, seq: 17,
      token: true, role: "desk-route", key: "desk-route"
    });

    if (deskReturned) {
      b += badge(196, 263, "DESK RETURNED ?", {
        w: 112, colour: C.warn, seq: 18,
        role: "returned-desk", key: "returned-desk"
      });
    }

    b += txt(160, deskReturned ? 302 : 280,
      deskReturned
        ? "One property reinstated a desk; cause unknown."
        : "Illustrative routes; reported percentages are observed.", {
      size: 7.8, seq: 20
    });

    return svg("adoption", deskReturned ? 317 : 295,
      "Illustrative lobby with kiosk and desk routes. " +
      "Observed channel figures are 65 percent and 29 percent. " +
      (deskReturned
        ? "One property reinstated a permanent desk; its cause is unknown."
        : "The remaining classification is unreported."),
      b, "two-process-lobby");
  }

  /*
   * SIGNATURE 8 — THE KNOWLEDGE ICEBERG
   */

  function iceberg(options = {}) {
    const surfaced = Boolean(options.surfaced);

    let b = txt(160, 15, "WHAT THE ROLE KNOWS", {
      size: 11, weight: 900, seq: 1
    });

    b += path("M12 88H308", {
      stroke: C.accent, sw: 2.5, seq: 2,
      role: "waterline", key: "waterline"
    });

    b += path("M120 81L160 34L200 81Z", {
      fill: C.paper, stroke: C.line,
      seq: 3, role: "visible-knowledge",
      key: "visible-knowledge"
    });

    b += path("M115 97H205L190 151L160 171L130 151Z", {
      fill: C.paper, stroke: C.line,
      seq: 4, role: "hidden-knowledge",
      key: "hidden-knowledge"
    });

    b += txt(160, 65, "Written rules", {
      size: 8.5, seq: 5
    });

    b += txt(160, 122,
      surfaced ? "Worked example" : "Experience-based", {
      size: 8.5, fill: C.accent,
      seq: 6, key: "knowledge-label"
    });

    b += txt(160, 141,
      surfaced ? "made teachable" : "judgement", {
      size: 8.5, seq: 7,
      key: "knowledge-detail"
    });

    b += txt(160, 191,
      surfaced
        ? "Share the reasoning, not just the answer."
        : "A written procedure cannot capture every exception.", {
      size: 8.1, seq: 8
    });

    return svg("iceberg", 207,
      surfaced
        ? "Worked examples make experience-based judgement teachable."
        : "Written procedures are visible while practical judgement may remain hidden.",
      b, "knowledge-iceberg");
  }

  /*
   * SIGNATURE 9 — EVIDENCE BOARD
   *
   * Cards are observations, not a causal chain.
   */

  function caseTimeline(options = {}) {
    const cards = options.cards || [
      ["ROLE", "22 Guest Hosts"],
      ["AUTHORITY", "Email only"],
      ["ADOPTION", "65% kiosk"],
      ["REFERRALS", "9 of 22"],
      ["DEPARTURES", "2; motives unknown"]
    ];

    let b = txt(160, 15, "QASR · EVIDENCE, NOT ASSUMPTIONS", {
      size: 9.5, weight: 900, seq: 1
    });

    cards.slice(0, 6).forEach((entry, i) => {
      const x = 9 + (i % 3) * 103;
      const y = 40 + Math.floor(i / 3) * 70;
      const colour = i === 0 ? C.ok :
        i === 4 ? C.bad : C.warn;

      b += rect(x, y, 95, 60, {
        stroke: colour, seq: 3 + i * 3,
        role: "evidence-card", key: `evidence-${i}`
      });

      b += txt(x + 47.5, y + 19, entry[0], {
        size: 8.2, fill: colour,
        seq: 4 + i * 3
      });

      b += txt(x + 47.5, y + 42, entry[1], {
        size: 7.8, seq: 5 + i * 3
      });
    });

    b += txt(160, 189,
      "Observed facts do not establish individual causes.", {
      size: 8.2, seq: 25
    });

    return svg("case-timeline", 205,
      "Qasr observations include twenty-two Guest Hosts, " +
      "an undocumented waiver, kiosk adoption, referral behaviour " +
      "and two resignations with unknown motives.",
      b, "evidence-board");
  }

  /*
   * SIGNATURE 10 — TURN THE DASHBOARD OVER
   */

  function dashboardFlip(options = {}) {
    const revealed = options.revealed !== false &&
      options.flipped !== false;

    let b = txt(160, 15, "THE GREEN DASHBOARD", {
      size: 11, weight: 900, seq: 1
    });

    b += rect(28, 42, 264, 67, {
      stroke: C.ok, sw: 2.5, seq: 2,
      role: "dashboard-front", key: "dashboard-front"
    });

    b += txt(160, 65, "PEOPLE WORKSTREAM", {
      size: 10, fill: C.ok, seq: 3
    });

    b += txt(160, 89, "REPORTED COMPLETE", {
      size: 14, weight: 900,
      fill: C.ok, seq: 4
    });

    if (revealed) {
      b += path("M160 111V126", {
        stroke: C.accent, sw: 2,
        seq: 5, role: "reveal-path"
      });

      const evidence = [
        ["65%", "kiosk"],
        ["29%", "desk"],
        ["9/22", "always refer"],
        ["?", "not assessed"],
        ["2", "resigned"]
      ];

      evidence.forEach((entry, i) => {
        const x = 5 + i * 63;

        b += rect(x, 134, 58, 50, {
          stroke: i === 3 ? C.warn : C.line,
          seq: 6 + i * 3,
          role: "flip-card", key: `flip-${i}`
        });

        b += txt(x + 29, 151, entry[0], {
          size: 12, weight: 900,
          fill: i === 3 ? C.warn : C.accent,
          seq: 7 + i * 3,
          count: [65, 29, NaN, NaN, 2][i],
          suffix: i < 2 ? "%" : "",
          key: `flip-number-${i}`
        });

        b += txt(x + 29, 171, entry[1], {
          size: 7.1, seq: 8 + i * 3
        });
      });

      b += txt(160, 204,
        "Capability was not assessed; resignation motives unknown.", {
        size: 7.2, seq: 25
      });
    }

    return svg("dashboard-flip", revealed ? 219 : 122,
      revealed
        ? "Reported completion is contrasted with operating evidence: " +
          "65 percent kiosk use, 29 percent desk handling, nine of 22 " +
          "always referring, no capability assessment and two resignations."
        : "The People workstream is reported complete.",
      b, "dashboard-flip");
  }

  /*
   * SIGNATURE 11 — THE REPAIR ASSEMBLY
   */

  function repair(options = {}) {
    const selected = clamp(Math.trunc(num(options.selected, 5)), 0, 5);
    const labels = [
      "Role", "Authority", "Measures",
      "Capability", "Adoption"
    ];

    let b = txt(160, 16, "REPAIR THE PEOPLE SYSTEM", {
      size: 10.5, weight: 900, seq: 1
    });

    labels.forEach((label, i) => {
      const y = 39 + i * 27;
      const done = i < selected;

      b += circle(35, y, 9, {
        stroke: done ? C.ok : C.line,
        fill: done ? C.ok : C.paper,
        seq: 2 + i * 3,
        role: "repair-check", key: `repair-${i}`
      });

      if (done) {
        b += path(
          `M30 ${y}L34 ${y + 4}L41 ${y - 5}`, {
          stroke: C.paper, sw: 2,
          seq: 3 + i * 3,
          key: `repair-tick-${i}`
        });
      }

      b += txt(57, y, label, {
        anchor: "start", size: 10,
        fill: done ? C.ok : C.ink,
        seq: 4 + i * 3
      });
    });

    b += txt(160, 195,
      "Five connected repairs. One workable role.", {
      size: 8.5, seq: 20
    });

    return svg("repair", 209,
      `Illustrative repair plan: ${selected} of five elements selected. ` +
      "Selection does not mean Qasr has implemented them.",
      b, "repair-checklist");
  }

  /*
   * SIGNATURE 12 — PEOPLE TO DEVELOP
   */

  function handover(options = {}) {
    const items = options.items || [
      "Role|definition",
      "Decision|rights",
      "Capability|evidence",
      "Aligned|measures"
    ];

    let b = txt(160, 15, "PEOPLE → DEVELOP", {
      size: 12, weight: 900, seq: 1
    });

    items.slice(0, 4).forEach((item, i) => {
      const x = 6 + i * 79;

      b += rect(x, 54, 70, 66, {
        stroke: C.line, seq: 3 + i * 3,
        role: "handover-document",
        key: `handover-${i}`
      });

      b += txt(x + 35, 87, item, {
        size: 8, seq: 4 + i * 3
      });

      if (i < 3) {
        b += path(`M${x + 71} 87H${x + 78}`, {
          stroke: C.accent, sw: 2,
          seq: 5 + i * 3
        });
      }
    });

    b += path("M160 128V146", {
      stroke: C.accent, sw: 3,
      token: true, seq: 18,
      role: "handover-route"
    });

    b += rect(100, 151, 120, 38, {
      stroke: C.ok, sw: 2,
      seq: 19, role: "develop-gate",
      key: "develop-gate"
    });

    b += txt(160, 170, "DEVELOP", {
      size: 13, weight: 900,
      fill: C.ok, seq: 20
    });

    b += txt(160, 209,
      "Carry approved decisions and unresolved issues forward.", {
      size: 8.2, seq: 21
    });

    return svg("handover", 225,
      "People hands role definitions, decision rights, capability " +
      "evidence and aligned measures to Develop. Open issues remain visible.",
      b, "develop-handover");
  }

  /*
   * ADDITIONAL SIGNATURE — THE LIVING ROLE CARD
   */

  function roleCard(options = {}) {
    const revised = Boolean(options.revised);
    const delayed = Boolean(options.delayed);

    const fields = revised ? [
      ["TITLE", "Guest Host"],
      ["WORK", "Support arrivals and investigate exceptions"],
      ["AUTHORITY", "Document permitted decisions"],
      ["MEASURES", "Resolution with quality safeguards"]
    ] : [
      ["TITLE", "Front Desk Agent"],
      ["WORK", "Conventional check-ins"],
      ["AUTHORITY", "Existing approval routes"],
      ["MEASURES", "Volume and speed"]
    ];

    let b = txt(160, 16, "THE JOB ON PAPER", {
      size: 11, weight: 900, seq: 1
    });

    b += rect(16, 37, 288, 164, {
      stroke: C.line, seq: 2,
      role: "role-document", key: "role-document"
    });

    fields.forEach((field, i) => {
      const y = 60 + i * 37;

      b += txt(31, y, field[0], {
        size: 7.5, anchor: "start",
        fill: C.accent, seq: 3 + i * 3
      });

      b += txt(31, y + 15, field[1], {
        size: 8.2, anchor: "start",
        seq: 4 + i * 3,
        key: `role-field-${i}`
      });
    });

    if (delayed) {
      b += badge(197, 211, "+3 WEEKS", {
        w: 108, colour: C.warn,
        seq: 18, role: "delay-stamp",
        key: "delay-stamp"
      });
    }

    return svg("role-card", delayed ? 245 : 216,
      revised
        ? "Illustrative proposed Guest Host specification."
        : "Former Front Desk Agent specification.",
      b, "living-role-card");
  }

  /*
   * OPTIONAL COMPACT CALLBACK
   */

  function callback(options = {}) {
    const items = Array.isArray(options.items)
      ? options.items.slice(0, 4)
      : [
        ["65%", "Kiosk"],
        ["9/22", "Refer"],
        ["AED 400", "Waiver limit"]
      ];

    let b = "";

    items.forEach((item, i) => {
      const w = 304 / items.length;
      const x = 8 + i * w;

      b += rect(x, 9, w - 6, 49, {
        stroke: C.accent,
        seq: i * 3,
        role: "callback-chip",
        key: `callback-${i}`
      });

      b += txt(x + (w - 6) / 2, 27, item[0], {
        size: 12, weight: 900,
        fill: C.accent, seq: i * 3 + 1
      });

      b += txt(x + (w - 6) / 2, 46, item[1], {
        size: 7.5, seq: i * 3 + 2
      });
    });

    return svg("callback", 68,
      items.map(item => item.join(": ")).join(". "),
      b, "callback");
  }

  /*
   * CSS — INHERITED PALETTES ONLY
   */

  function ensureCss() {
    if (doc.getElementById("vl-w10-cinematics-v3")) return;

    const style = doc.createElement("style");
    style.id = "vl-w10-cinematics-v3";

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
        max-width: 100%;
        height: auto;
        overflow: visible;
        color: var(--w10-ink);
      }

      .look[data-w10-cinematics="on"] svg.w10-dg [data-w10-seq] {
        transform-box: fill-box;
        transform-origin: center;
      }

      .look[data-w10-cinematics="on"] .w10-flow-token {
        fill: var(--w10-accent);
        stroke: var(--w10-paper);
        stroke-width: 1.5;
        pointer-events: none;
        vector-effect: non-scaling-stroke;
      }

      .look[data-w10-cinematics="on"] .w10-cine-overlay {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        z-index: 2;
      }

      .look[data-w10-cinematics="on"] .w10-cine-accent {
        position: absolute;
        left: 8%;
        right: 8%;
        bottom: 8%;
        height: 2px;
        background: var(--w10-accent);
        transform-origin: left center;
        pointer-events: none;
        opacity: 0;
      }

      .look[data-w10-cinematics="on"] .w10-key-underline {
        text-decoration-line: underline;
        text-decoration-color: var(--w10-accent);
        text-decoration-thickness: .12em;
        text-underline-offset: .15em;
      }

      .look[data-w10-cinematics="on"] .w10-cine-focus {
        outline: 2px solid var(--w10-accent);
        outline-offset: 4px;
      }

      .look[data-w10-cinematics="on"] [data-w10-fallback] {
        animation: w10-fallback-enter .45s ease-out both;
      }

      @keyframes w10-fallback-enter {
        from { opacity: .4; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @media (prefers-reduced-motion: reduce) {
        .look[data-w10-cinematics="on"] *,
        .look[data-w10-cinematics="on"] *::before,
        .look[data-w10-cinematics="on"] *::after {
          animation-duration: 0s !important;
          transition-duration: 0s !important;
          scroll-behavior: auto !important;
        }

        .look[data-w10-cinematics="on"] .w10-flow-token {
          display: none !important;
        }
      }
    `;

    doc.head.appendChild(style);
  }

  /*
   * LIFECYCLE
   */

  function stateFor(style) {
    let state = states.get(style);

    if (!state) {
      state = {
        style,
        root: null,
        section: null,
        key: null,
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
        lastSignature: null,
        lastSnapshot: null,
        lastKind: null,
        previousType: null
      };

      states.set(style, state);
      live.add(state);
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

  function settleDiagram(element) {
    if (!element) return;

    element.querySelectorAll("[data-w10-seq]").forEach(el => {
      el.style.removeProperty("opacity");
      el.style.removeProperty("transform");
      el.style.removeProperty("stroke-dasharray");
      el.style.removeProperty("stroke-dashoffset");
    });

    settleNumbers(element);
  }

  function clearWork(state, preserveSnapshot = false) {
    state.epoch++;

    state.timers.forEach(clearTimeout);
    state.timers.clear();

    state.frames.forEach(cancelAnimationFrame);
    state.frames.clear();

    if (state.timeline) {
      try { state.timeline.kill(); } catch (_) {}
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

    if (!preserveSnapshot) {
      state.lastSnapshot = null;
      state.lastKind = null;
      state.lastSignature = null;
    }
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

  function makeTimeline(state) {
    if (reduced() || !gsapReady()) return null;

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

  function play(state, tl) {
    if (!tl) return;

    if (reduced()) {
      tl.progress(1);
      return;
    }

    if (state.paused) tl.pause(0);
    else tl.play(0);
  }

  /*
   * DIRECTOR BRIDGE
   *
   * moments.js v3 supplies content-grounded direction.
   */

  function director() {
    return window.W10_MOMENT_DIRECTION || null;
  }

  function directionFor(state, at) {
    if (!state.key) return null;

    try {
      return director()?.resolveDirection?.(
        state.key, at
      ) || null;
    } catch (error) {
      warnOnce("director-error",
        "The moments director could not resolve a beat.");
      return null;
    }
  }

  /*
   * SCENE LOOKUP
   */

  function scenes(section) {
    const moments = Array.isArray(section?.moments)
      ? section.moments : [];

    const grouped = new Map();

    moments.forEach(moment => {
      if (!moment || typeof moment !== "object") return;

      const at = Math.max(0, Math.trunc(num(moment.at, 0)));

      if (!grouped.has(at)) grouped.set(at, []);
      grouped.get(at).push(moment);
    });

    return [...grouped.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([at, group], index) => ({
        at, group, index
      }));
  }

  function sceneAt(section, sentence) {
    let result = {
      index: -1, at: -1, group: []
    };

    for (const scene of scenes(section)) {
      if (scene.at > sentence) break;
      result = scene;
    }

    return result;
  }

  function stageFor(state) {
    const root = state.root;
    if (!root) return null;

    const explicit = state.style.stage;

    if (
      explicit instanceof Element &&
      root.contains(explicit)
    ) return explicit;

    return root.querySelector(
      "[data-stage],.look-stage,.scene-stage," +
      ".stage,.visual-stage,.scene"
    ) || root;
  }

  function visible(el) {
    if (!(el instanceof Element) || !el.isConnected) return false;

    const css = getComputedStyle(el);

    if (
      css.display === "none" ||
      css.visibility === "hidden" ||
      Number(css.opacity) === 0
    ) return false;

    const box = el.getBoundingClientRect();

    return box.width > 3 && box.height > 3;
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
      .filter(el => !el.closest(
        "button,input,select,textarea,nav," +
        "[role='toolbar'],[data-player-controls]"
      ))
      .slice(-5);
  }

  /*
   * SVG SNAPSHOT
   *
   * Capture stable identities and visual attributes.
   * Diff transitions compare the old final state with the new one.
   */

  function snapshotSvg(element) {
    if (!element) return null;

    const nodes = new Map();

    element.querySelectorAll("[data-w10-key]").forEach(el => {
      const key = el.getAttribute("data-w10-key");
      if (!key || nodes.has(key)) return;

      nodes.set(key, {
        fill: el.getAttribute("fill"),
        stroke: el.getAttribute("stroke"),
        opacity: el.getAttribute("opacity"),
        transform: el.getAttribute("transform"),
        x: el.getAttribute("x"),
        y: el.getAttribute("y"),
        cx: el.getAttribute("cx"),
        cy: el.getAttribute("cy"),
        d: el.getAttribute("d"),
        text: el.textContent
      });
    });

    return {
      kind: element.getAttribute("data-w10-kind"),
      signature: element.getAttribute("data-w10-signature"),
      nodes
    };
  }

  function snapshotStage(state) {
    const stage = stageFor(state);
    if (!stage) return null;

    const element = [...stage.querySelectorAll("svg.w10-dg")]
      .filter(visible).at(-1);

    return snapshotSvg(element);
  }

  /*
   * ORDERED SVG ELEMENTS
   */

  function orderedElements(element) {
    const explicit = [
      ...element.querySelectorAll("[data-w10-seq]")
    ];

    const candidates = explicit.length ? explicit :
      [...element.querySelectorAll(
        "g,rect,circle,ellipse,polygon,polyline,line,path,text"
      )];

    const unique = [...new Set(candidates)];

    return unique.filter(el =>
      !unique.some(parent =>
        parent !== el &&
        parent.contains(el) &&
        parent.tagName.toLowerCase() === "g" &&
        parent.hasAttribute("data-w10-seq")
      )
    ).map((el, index) => ({
      el,
      index,
      seq: num(el.getAttribute("data-w10-seq"), index)
    })).sort((a, b) =>
      a.seq - b.seq || a.index - b.index
    ).slice(0, 90).map(item => item.el);
  }

  /*
   * FULL BUILD
   *
   * Reserved for a genuinely new diagram.
   * Timing is compressed to avoid talking over a static visual.
   */

  function animateDiagram(state, element, tl, start = 0) {
    if (!tl || reduced()) return;

    const gs = window.gsap;
    const elements = orderedElements(element);
    let cursor = start;

    elements.forEach(el => {
      const isPath = el instanceof SVGPathElement;
      const draw = el.hasAttribute("data-w10-draw");
      const bar = el.getAttribute("data-w10-role") === "adoption-bar";

      if (draw && isPath) {
        let length = 0;
        try { length = el.getTotalLength(); } catch (_) {}

        if (length > 0) {
          gs.set(el, {
            strokeDasharray: length,
            strokeDashoffset: length
          });

          tl.to(el, {
            strokeDashoffset: 0,
            duration: clamp(length / 260, .16, .55),
            ease: "power2.inOut"
          }, cursor);

          cursor += .035;
          return;
        }
      }

      if (bar) {
        tl.fromTo(el, {
          scaleX: .001, opacity: .5,
          transformOrigin: "left center"
        }, {
          scaleX: 1, opacity: 1,
          duration: .65
        }, cursor);

        cursor += .06;
        return;
      }

      const isText = el.tagName.toLowerCase() === "text";

      tl.fromTo(el, {
        opacity: 0,
        y: isText ? 3 : 6,
        scale: isText ? 1 : .96
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: isText ? .28 : .38
      }, cursor);

      cursor += isText ? .025 : .04;
    });

    animateCounters(element, tl);
    signatureMotion(state, element, tl);
    animateTokens(state, element, tl);
  }

  /*
   * DIFF TRANSITION
   *
   * Matching SVG elements keep their identity.
   * Only changed attributes receive animation.
   */

  function animateDiff(state, element, previous, tl) {
    if (!tl || !previous || reduced()) return false;

    const current = snapshotSvg(element);

    if (!current || current.kind !== previous.kind) return false;

    let changes = 0;

    element.querySelectorAll("[data-w10-key]").forEach(el => {
      const key = el.getAttribute("data-w10-key");
      const before = previous.nodes.get(key);

      if (!before) {
        tl.fromTo(el, {
          opacity: 0, scale: .85
        }, {
          opacity: 1, scale: 1,
          duration: .38
        }, .05 + changes * .025);

        changes++;
        return;
      }

      const afterFill = el.getAttribute("fill");
      const afterStroke = el.getAttribute("stroke");

      if (
        before.fill !== afterFill ||
        before.stroke !== afterStroke
      ) {
        const from = {};
        const to = { duration: .52 };

        if (before.fill && afterFill) {
          from.fill = before.fill;
          to.fill = afterFill;
        }

        if (before.stroke && afterStroke) {
          from.stroke = before.stroke;
          to.stroke = afterStroke;
        }

        if (Object.keys(from).length) {
          tl.fromTo(el, from, to, .05 + changes * .025);
          changes++;
        }
      }

      const textChanged = before.text !== el.textContent;

      if (textChanged && el.tagName.toLowerCase() === "text") {
        tl.fromTo(el, {
          opacity: .35, y: 5
        }, {
          opacity: 1, y: 0,
          duration: .4
        }, .08 + changes * .025);

        changes++;
      }

      if (
        before.d &&
        el.getAttribute("d") &&
        before.d !== el.getAttribute("d")
      ) {
        tl.fromTo(el, {
          opacity: .25
        }, {
          opacity: 1,
          duration: .5
        }, .08 + changes * .025);

        changes++;
      }
    });

    animateCounters(element, tl);

    return changes > 0;
  }

  /*
   * COUNTERS
   */

  function animateCounters(element, tl) {
    if (!tl || reduced()) return;

    element.querySelectorAll("[data-w10-count]").forEach(el => {
      const target = Number(el.getAttribute("data-w10-count"));
      if (!Number.isFinite(target)) return;

      const suffix = el.getAttribute("data-w10-suffix") || "";
      const value = { n: 0 };

      tl.to(value, {
        n: target,
        duration: .8,
        ease: "power2.out",
        onUpdate() {
          el.textContent = `${Math.round(value.n)}${suffix}`;
        },
        onComplete() {
          el.textContent = `${target}${suffix}`;
        }
      }, .08);
    });
  }

  /*
   * ROUTE TOKENS
   *
   * Tokens travel only along meaningful decision routes.
   */

  function animateTokens(state, element, tl) {
    if (!tl || reduced()) return;

    const paths = [
      ...element.querySelectorAll("[data-w10-token-path]")
    ].slice(0, 3);

    paths.forEach((route, index) => {
      let length = 0;

      try { length = route.getTotalLength(); } catch (_) {}
      if (length < 8) return;

      const token = doc.createElementNS(NS, "circle");
      token.setAttribute("r", "4");
      token.setAttribute("class", "w10-flow-token");
      token.setAttribute("aria-hidden", "true");

      element.appendChild(token);
      state.tokens.add(token);

      const progress = { p: 0 };

      tl.fromTo(token, {
        opacity: 0
      }, {
        opacity: 1,
        duration: .1
      }, .15 + index * .12);

      tl.to(progress, {
        p: 1,
        duration: clamp(length / 160, .45, 1.1),
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
      }, .22 + index * .12);

      tl.to(token, {
        opacity: 0,
        duration: .12
      }, ">-.1");
    });
  }

  /*
   * SIGNATURE MOTION
   */

  function signatureMotion(state, element, tl) {
    if (!tl || reduced()) return;

    const signature =
      element.getAttribute("data-w10-signature");

    const q = role => [
      ...element.querySelectorAll(
        `[data-w10-role="${role}"]`
      )
    ];

    switch (signature) {
      case "authority-dial": {
        const marker = q("decision-marker");
        const stamp = q("delegation-stamp");
        const route = q("decision-route");

        if (marker.length) {
          tl.fromTo(marker, {
            scale: .5
          }, {
            scale: 1.15,
            duration: .27,
            ease: "back.out(1.8)"
          }, .12);

          tl.to(marker, {
            scale: 1,
            duration: .18
          }, ">");
        }

        if (stamp.length) {
          tl.fromTo(stamp, {
            y: -12, opacity: 0
          }, {
            y: 0, opacity: 1,
            duration: .4,
            ease: "back.out(1.6)"
          }, .45);
        }

        if (route.length) {
          tl.fromTo(route, {
            opacity: .2
          }, {
            opacity: 1,
            duration: .4
          }, .65);
        }
        break;
      }

      case "twenty-two-hosts": {
        const dots = [
          ...q("host"), ...q("escalating"), ...q("departed")
        ];

        if (dots.length) {
          tl.fromTo(dots, {
            opacity: 0, scale: .45
          }, {
            opacity: 1, scale: 1,
            duration: .32,
            stagger: .025,
            ease: "back.out(1.4)"
          }, .08);
        }

        const nine = q("escalating");

        if (nine.length) {
          tl.fromTo(nine, {
            y: 0
          }, {
            y: -5,
            duration: .22,
            stagger: .045,
            yoyo: true,
            repeat: 1
          }, .75);
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
            duration: .7,
            ease: "elastic.out(1,.65)"
          }, .25);
        }

        if (exception.length) {
          tl.fromTo(exception, {
            y: -10, opacity: .4
          }, {
            y: 0, opacity: 1,
            duration: .55
          }, .48);
        }
        break;
      }

      case "dashboard-flip": {
        const cards = q("flip-card");

        if (cards.length) {
          tl.fromTo(cards, {
            scaleX: .02,
            opacity: 0
          }, {
            scaleX: 1,
            opacity: 1,
            duration: .45,
            stagger: .12
          }, .35);
        }
        break;
      }

      case "two-process-lobby": {
        const bars = q("adoption-bar");
        const desk = q("returned-desk");

        if (bars.length) {
          tl.fromTo(bars, {
            scaleX: .001
          }, {
            scaleX: 1,
            duration: .8,
            stagger: .12,
            transformOrigin: "left center"
          }, .15);
        }

        if (desk.length) {
          tl.fromTo(desk, {
            x: 24, opacity: 0
          }, {
            x: 0, opacity: 1,
            duration: .6
          }, .75);
        }
        break;
      }

      case "knowledge-iceberg": {
        const hidden = q("hidden-knowledge");

        if (hidden.length) {
          tl.fromTo(hidden, {
            y: 12, opacity: .25
          }, {
            y: 0, opacity: 1,
            duration: .8
          }, .35);
        }
        break;
      }

      case "develop-handover": {
        const documents = q("handover-document");
        const gate = q("develop-gate");

        if (documents.length) {
          tl.fromTo(documents, {
            y: -8, opacity: 0
          }, {
            y: 0, opacity: 1,
            duration: .4,
            stagger: .1
          }, .12);
        }

        if (gate.length) {
          tl.fromTo(gate, {
            scale: .9, opacity: .3
          }, {
            scale: 1, opacity: 1,
            duration: .6
          }, .75);
        }
        break;
      }

      case "living-role-card": {
        const fields = [
          ...element.querySelectorAll(
            '[data-w10-key^="role-field-"]'
          )
        ];

        if (fields.length) {
          tl.fromTo(fields, {
            opacity: .25, x: -9
          }, {
            opacity: 1, x: 0,
            duration: .4,
            stagger: .12
          }, .2);
        }
        break;
      }

      case "repair-checklist": {
        const ticks = q("repair-check");

        if (ticks.length) {
          tl.fromTo(ticks, {
            scale: .65
          }, {
            scale: 1,
            duration: .35,
            stagger: .1,
            ease: "back.out(1.6)"
          }, .15);
        }
        break;
      }

      case "raci-matrix": {
        const cells = q("raci-cell");
        const missing = q("missing-owner");

        if (cells.length) {
          tl.fromTo(cells, {
            opacity: 0, scale: .7
          }, {
            opacity: 1, scale: 1,
            duration: .3,
            stagger: .045
          }, .1);
        }

        if (missing.length) {
          tl.fromTo(missing, {
            scale: .9
          }, {
            scale: 1.07,
            duration: .25,
            yoyo: true,
            repeat: 1
          }, .7);
        }
        break;
      }

      default:
        break;
    }
  }

  /*
   * SEMANTIC MOTION
   *
   * The existing look owns text and layout.
   * This layer only provides restrained emphasis.
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
          opacity: 0, y: 14
        }, {
          opacity: 1, y: 0,
          duration: .55,
          stagger: .06
        }, 0);
        break;

      case "issue":
        tl.fromTo(targets, {
          opacity: .35, x: -8
        }, {
          opacity: 1, x: 0,
          duration: .42
        }, .05);
        break;

      case "statement":
        tl.fromTo(targets, {
          opacity: .45
        }, {
          opacity: 1,
          duration: .48
        }, .05);
        break;

      case "compare":
        tl.fromTo(targets, {
          opacity: .3,
          x: moment.side === "b" ? 12 : -12
        }, {
          opacity: 1,
          x: 0,
          duration: .5
        }, .05);
        break;

      case "question":
        tl.fromTo(targets, {
          opacity: .35, scale: .97
        }, {
          opacity: 1, scale: 1,
          duration: .55
        }, .05);
        break;

      case "formula":
        tl.fromTo(targets, {
          opacity: .25, scaleX: .8
        }, {
          opacity: 1, scaleX: 1,
          duration: .6
        }, .05);
        break;

      case "item":
        tl.fromTo(targets, {
          opacity: .25, y: 9
        }, {
          opacity: 1, y: 0,
          duration: .45,
          stagger: .05
        }, .05);
        break;
    }
  }

  /*
   * MICRO-BEATS
   *
   * Retained visuals receive meaningful attention,
   * not a generic replay of their last SVG element.
   */

  function microBeat(state, at) {
    if (reduced() || !gsapReady()) return;

    const stage = stageFor(state);
    if (!stage) return;

    const direction = directionFor(state, at);
    const action = direction?.microBeat?.action || "hold";

    if (action === "hold") return;

    const element = [...stage.querySelectorAll("svg.w10-dg")]
      .filter(visible).at(-1);

    if (!element) return;

    const roles = {
      "retick-decision-marker": "decision-marker",
      "emphasise-relevant-dots": "escalating",
      "rebalance-beam-once": "balance-beam",
      "waterline-ripple": "waterline",
      "focus-next-evidence-card": "flip-card",
      "focus-accountability-cell": "missing-owner",
      "focus-current-slot": "readiness-tile",
      "underline-changed-field": "role-document",
      "focus-current-repair": "repair-check",
      "focus-assessment-gate": "capability-gate",
      "focus-accountable-role": "accountable",
      "focus-evidence-gap": "evidence-card",
      "focus-decision-boundary": "limit-marker",
      "focus-measure-conflict": "balance-beam",
      "focus-handover-consequence": "develop-gate"
    };

    const role = roles[action];

    const targets = role
      ? [...element.querySelectorAll(
          `[data-w10-role="${role}"]`
        )]
      : [];

    const tl = makeTimeline(state);
    if (!tl) return;

    if (targets.length) {
      tl.fromTo(targets.slice(0, 9), {
        scale: 1
      }, {
        scale: 1.07,
        duration: .22,
        stagger: .045,
        yoyo: true,
        repeat: 1
      }, 0);
    } else if (
      action === "follow-one-guest-route" ||
      action === "follow-handover-route" ||
      action === "follow-guest-decision"
    ) {
      animateTokens(state, element, tl);
    } else {
      return;
    }

    play(state, tl);
  }

  /*
   * RENDER
   */

  function renderBeat(state, scene, animate, previousSnapshot) {
    if (!state.root?.isConnected) return;

    clearWork(state, true);

    state.root.dataset.w10Scene = String(scene.index);
    state.root.dataset.w10Moment =
      scene.group[0]?.type || "cover";

    const stage = stageFor(state);
    if (!stage) return;

    const elements = [
      ...stage.querySelectorAll("svg.w10-dg")
    ].filter(visible).slice(-2);

    elements.forEach(settleDiagram);

    const current = elements.at(-1);
    const direction = directionFor(state, scene.at);

    if (!animate || reduced()) {
      settleNumbers(stage);
      state.lastSnapshot = snapshotSvg(current);
      return;
    }

    if (!gsapReady()) {
      warnOnce("gsap",
        "GSAP is unavailable; final visuals remain visible.");
      if (current) {
        current.setAttribute("data-w10-fallback", "true");
      }
      settleNumbers(stage);
      state.lastSnapshot = snapshotSvg(current);
      return;
    }

    const tl = makeTimeline(state);
    if (!tl) return;

    let usedDiff = false;

    if (
      current &&
      previousSnapshot &&
      current.getAttribute("data-w10-kind") ===
        previousSnapshot.kind
    ) {
      usedDiff = animateDiff(
        state, current, previousSnapshot, tl
      );
    }

    if (!usedDiff && current) {
      animateDiagram(state, current, tl, 0);
    }

    animateSemantic(state, scene, tl);

    state.lastSnapshot = snapshotSvg(current);
    state.lastKind = current?.getAttribute("data-w10-kind") || null;
    state.lastSignature =
      current?.getAttribute("data-w10-signature") || null;

    play(state, tl);
  }

  function queueBeat(state, scene, animate, previousSnapshot) {
    const epoch = state.epoch;

    frame(state, () => {
      frame(state, () => {
        if (epoch !== state.epoch) return;
        renderBeat(state, scene, animate, previousSnapshot);
      });
    });
  }

  /*
   * RESIZE SAFETY
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

      const next = { w: box.width, h: box.height };
      const previous = state.size;
      state.size = next;

      if (!previous) return;

      if (
        Math.abs(previous.w - next.w) < 8 &&
        Math.abs(previous.h - next.h) < 8
      ) return;

      clearTimeout(state.resizeTimer);

      state.resizeTimer = setTimeout(() => {
        if (!state.section || !state.root?.isConnected) return;

        queueBeat(
          state,
          sceneAt(state.section, state.sentence),
          false,
          null
        );
      }, 150);
    });

    state.observer.observe(state.root);
  }

  /*
   * LOOK INSTALLATION
   *
   * Preserve original methods, arguments and return values.
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

    originals.set(style, base);

    const state = stateFor(style);

    style.mount = function mountWeek10Cinematics(element) {
      clearWork(state);
      state.observer?.disconnect();
      clearTimeout(state.resizeTimer);

      const result = base.mount.apply(this, arguments);

      state.root = element || null;
      state.section = null;
      state.key = null;
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
      }

      state.key = resolveSectionKey(section);

      queueBeat(
        state,
        sceneAt(state.section, -1),
        false,
        null
      );

      return result;
    };

    style.step = function stepWeek10Cinematics(index) {
      const target = Math.max(
        -1, Math.trunc(num(index, -1))
      );

      const previousSentence = state.sentence;
      const previousScene = state.scene;
      const previousSnapshot = snapshotStage(state);

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
          adjacent && changed && !repeated && target >= 0,
          previousSnapshot
        );
      } else if (adjacent && target >= 0) {
        clearWork(state, true);
        frame(state, () => microBeat(state, target));
      }

      return result;
    };

    installed.add(style);
  }

  /*
   * RESOLVE THE CURRENT SECTION TO THE EXISTING MOMENTS KEY
   */

  function resolveSectionKey(section) {
    const id = section?.sec || section?.sectionId;
    if (!id) return null;

    const course = window.COURSE;
    if (!Array.isArray(course?.lessons)) return null;

    for (const lesson of course.lessons) {
      if (!Array.isArray(lesson.sections)) continue;

      const index = lesson.sections.findIndex(s =>
        s === section || s?.sec === id
      );

      if (index >= 0) return `${lesson.id}:${index}`;
    }

    return null;
  }

  function installAll() {
    if (!active()) return;

    ensureCss();

    (window.STYLES || []).forEach(install);
  }

  /*
   * VOICE CONTROL API
   */

  function eachState(fn) {
    live.forEach(state => {
      if (!installed.has(state.style)) return;
      fn(state);
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
      if (!reduced()) state.timeline?.resume();
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
      -1, Math.trunc(num(index, -1))
    );

    eachState(state => {
      state.sentence = target;

      const scene = sceneAt(state.section, target);
      state.scene = scene.index;

      clearWork(state);
      queueBeat(state, scene, false, null);
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
   * Existing function names and argument contracts remain supported.
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
    repair,
    roleCard,
    callback
  });

  /*
   * DIAGNOSTICS
   */

  function diagnostics() {
    return {
      version: VERSION,
      active: active(),
      gsap: gsapReady(),
      reducedMotion: reduced(),
      directorAvailable: Boolean(director()),
      installedLooks: [...live]
        .filter(state => installed.has(state.style))
        .map(state => state.style.id),
      diagrams: Object.keys(DIAG),
      warnings: [...warned]
    };
  }

  /*
   * PUBLIC API
   */

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
    active,
    diagnostics
  });

  window.W10_CINEMATICS = API;
  window.W10_DIAG = DIAG;

  /*
   * INSTALLATION TIMING
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
   * OPTIONAL VOICE EVENT BRIDGE
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
   * MOTION-PREFERENCE CHANGES
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

        queueBeat(state, scene, false, null);
      });
    });
  } catch (_) {}

})();
