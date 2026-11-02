(() => {
  "use strict";

  const VERSION = "1.0.0";
  const LOOK_IDS = new Set(["story", "codex", "notebook", "journey"]);
  const NS = "http://www.w3.org/2000/svg";
  const states = new WeakMap();
  const installed = new WeakSet();
  const doc = document;

  if (window.W10_CINEMATICS?.version === VERSION) return;

  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));

  const num = (value, fallback = 0) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  };

  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));

  const active = () =>
    Number(window.WEEK) === 10 ||
    window.COURSE?.id === "oper621-w10";

  const reduced = () => {
    try {
      return Boolean(
        window.LAB?.reducedMotion?.() ||
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
      );
    } catch (_) {
      return false;
    }
  };

  const diagram = (kind, height, label, body) =>
    `<svg class="dg w10-dg" data-w10-kind="${esc(kind)}" viewBox="0 0 320 ${num(height, 150)}" role="img" aria-label="${esc(label)}">${body}</svg>`;

  const text = (x, y, value, options = {}) => {
    const size = num(options.size, 10);
    const weight = num(options.weight, 700);
    const anchor = options.anchor || "middle";
    const fill = options.fill || "currentColor";
    const lines = String(value ?? "").split("|");
    const start = y - ((lines.length - 1) * size * 1.12) / 2;

    return `<text x="${x}" y="${start}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" dominant-baseline="middle" fill="${fill}">${lines.map((line, index) => `<tspan x="${x}" dy="${index ? size * 1.12 : 0}">${esc(line)}</tspan>`).join("")}</text>`;
  };

  const box = (x, y, width, height, options = {}) =>
    `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${num(options.rx, 8)}" fill="${options.fill || "rgba(255,255,255,.10)"}" stroke="${options.stroke || "rgba(255,255,255,.55)"}" stroke-width="${num(options.strokeWidth, 1.5)}"${options.dash ? ` stroke-dasharray="${options.dash}"` : ""} data-w10-seq="${num(options.seq, 0)}"/>`;

  const line = (d, seq, options = {}) =>
    `<path d="${d}" fill="none" stroke="${options.stroke || "rgba(255,255,255,.55)"}" stroke-width="${num(options.width, 2)}" stroke-linecap="round" stroke-linejoin="round" data-w10-draw data-w10-seq="${num(seq, 0)}"${options.token ? " data-w10-token-path" : ""}${options.dash ? ` stroke-dasharray="${options.dash}"` : ""}/>`;

  const arrow = (
    x,
    y,
    fill = "rgba(255,255,255,.55)",
    seq = 0
  ) =>
    `<path d="M${x - 6} ${y - 4}L${x} ${y}l-6 4Z" fill="${fill}" data-w10-seq="${num(seq, 0)}"/>`;

  const DIAG = Object.freeze({
    raci(options = {}) {
      const task = options.task || "Resolve a rate discrepancy";
      const responsible = options.responsible || "Guest Host";
      const accountable = options.accountable || "Process owner";
      const missing = Boolean(options.missing);
      const aStroke = missing ? "#FF6B6B" : "#FFB84D";
      const aLabel = missing ? "A missing" : "A · Accountable";
      const aName = missing ? "Assign one owner" : accountable;

      return diagram(
        "raci",
        154,
        `${responsible} is responsible for ${task}; ${
          missing
            ? "accountability is missing"
            : `${accountable} is accountable`
        }.`,
        `${text(160, 15, task, { size: 11, weight: 800 })}` +
        `${box(14, 49, 112, 66, {
          seq: 1,
          stroke: "#3DD68C"
        })}` +
        `${text(70, 67, "R · Responsible", {
          size: 9,
          fill: "#3DD68C"
        })}` +
        `${text(70, 91, responsible, {
          size: 11,
          weight: 800
        })}` +
        `${line("M128 82H190", 3, {
          token: true,
          stroke: "#FFB84D",
          width: 2.5
        })}` +
        `${arrow(190, 82, "#FFB84D", 4)}` +
        `${box(194, 49, 112, 66, {
          seq: 5,
          stroke: aStroke,
          dash: missing ? "6 4" : ""
        })}` +
        `${text(250, 67, aLabel, {
          size: 9,
          fill: aStroke
        })}` +
        `${text(250, 91, aName, {
          size: 11,
          weight: 800
        })}` +
        `${text(
          160,
          137,
          missing
            ? "Responsibility without one accountable owner creates a decision gap."
            : "The performer and the single owner are both visible.",
          { size: 8.5, weight: 600 }
        )}`
      );
    },

    authority(options = {}) {
      const amount = Math.max(0, num(options.amount, 250));
      const documented = Boolean(options.documented);
      const within = amount <= 400;
      const local = documented && within;
      const destination = local ? "Resolve locally" : "Duty manager";
      const reason = !within
        ? "Above stated limit"
        : documented
          ? "Documented authority"
          : "Authority not formalised";

      return diagram(
        "authority",
        158,
        `A rate discrepancy of AED ${amount} ${
          local
            ? "can be resolved by the Guest Host"
            : "is routed to the duty manager"
        }.`,
        `${text(160, 14, `RATE DIFFERENCE · AED ${amount}`, {
          size: 11,
          weight: 900,
          fill: "#FFB84D"
        })}` +
        `${box(12, 50, 88, 58, {
          seq: 1,
          stroke: "#3DD68C"
        })}` +
        `${text(56, 67, "GUEST HOST", {
          size: 9,
          fill: "#3DD68C"
        })}` +
        `${text(56, 88, "Receives|exception", { size: 10 })}` +
        `${line("M102 79H216", 3, {
          token: true,
          stroke: local ? "#3DD68C" : "#FF6B6B",
          width: 2.5
        })}` +
        `${arrow(
          216,
          79,
          local ? "#3DD68C" : "#FF6B6B",
          4
        )}` +
        `${box(220, 50, 88, 58, {
          seq: 5,
          stroke: local ? "#3DD68C" : "#FF6B6B"
        })}` +
        `${text(264, 67, destination, {
          size: 9,
          fill: local ? "#3DD68C" : "#FF6B6B"
        })}` +
        `${text(
          264,
          88,
          local
            ? "Decision near|the guest"
            : "Escalation|route",
          { size: 10 }
        )}` +
        `${box(91, 119, 138, 25, {
          seq: 6,
          rx: 12,
          stroke: documented ? "#3DD68C" : "#FF6B6B",
          dash: documented ? "" : "5 4"
        })}` +
        `${text(160, 132, reason, {
          size: 9,
          fill: documented ? "#3DD68C" : "#FF6B6B"
        })}`
      );
    },

    measures() {
      const card = (x, y, label, color, seq) =>
        `${box(x, y, 77, 28, {
          seq,
          rx: 6,
          stroke: color
        })}${text(x + 38.5, y + 14, label, {
          size: 8.5,
          fill: color
        })}`;

      return diagram(
        "measures",
        160,
        "Old speed and volume measures compete with aligned measures for exception quality and guest outcomes.",
        `${text(79, 15, "OLD TARGET", {
          size: 10,
          fill: "#FF6B6B"
        })}` +
        `${text(241, 15, "ALIGNED TARGET", {
          size: 10,
          fill: "#3DD68C"
        })}` +
        `${box(8, 30, 142, 111, {
          seq: 1,
          stroke: "#FF6B6B"
        })}` +
        `${box(170, 30, 142, 111, {
          seq: 2,
          stroke: "#3DD68C"
        })}` +
        `${card(19, 48, "Check-ins", "#FF6B6B", 3)}` +
        `${card(19, 84, "Speed", "#FF6B6B", 4)}` +
        `${card(181, 48, "Right first time", "#3DD68C", 5)}` +
        `${card(181, 84, "Guest outcome", "#3DD68C", 6)}` +
        `${line("M101 62C138 62 151 62 177 62", 7, {
          stroke: "#FFB84D",
          width: 2.5,
          token: true
        })}` +
        `${arrow(177, 62, "#FFB84D", 8)}` +
        `${text(
          160,
          151,
          "Change the measure → change what work becomes attractive",
          { size: 8.5, fill: "#FFB84D" }
        )}`
      );
    },

    capability() {
      const labels = [
        "Explain|the rule",
        "Practise|exceptions",
        "Receive|feedback",
        "Demonstrate|capability"
      ];

      let body = text(
        160,
        14,
        "ATTENDANCE IS AN INPUT · CAPABILITY IS EVIDENCE",
        { size: 9.5, fill: "#FFB84D" }
      );

      labels.forEach((label, index) => {
        const x = 8 + index * 79;

        body += box(x, 50, 66, 58, {
          seq: index * 3 + 1,
          stroke:
            index === 3
              ? "#3DD68C"
              : "rgba(255,255,255,.55)"
        });

        body += text(x + 33, 79, label, {
          size: 8.5,
          fill:
            index === 3
              ? "#3DD68C"
              : "currentColor"
        });

        if (index < labels.length - 1) {
          body += line(
            `M${x + 67} 79H${x + 78}`,
            index * 3 + 2,
            { stroke: "#FFB84D" }
          );

          body += arrow(
            x + 78,
            79,
            "#FFB84D",
            index * 3 + 3
          );
        }
      });

      body += text(
        160,
        134,
        "A four-hour induction cannot prove judgement unless performance is tested.",
        { size: 8.5 }
      );

      return diagram(
        "capability",
        148,
        "Capability develops through explanation, realistic practice, feedback and demonstrated performance.",
        body
      );
    },

    adoption() {
      const segments = [
        {
          x: 14,
          width: 187,
          label: "65% kiosk",
          color: "#3DD68C",
          seq: 2
        },
        {
          x: 201,
          width: 84,
          label: "29% desk",
          color: "#FFB84D",
          seq: 3
        },
        {
          x: 285,
          width: 21,
          label: "6%",
          color: "rgba(255,255,255,.55)",
          seq: 4
        }
      ];

      return diagram(
        "adoption",
        146,
        "At week eleven, 65 percent of arrivals used kiosks, 29 percent were handled at the desk and 6 percent were unspecified.",
        `${text(
          160,
          15,
          "WEEK 11 · OBSERVED ARRIVAL CHANNELS",
          { size: 10, fill: "#FFB84D" }
        )}` +
        `${box(14, 47, 292, 42, {
          seq: 1,
          rx: 8,
          stroke: "rgba(255,255,255,.35)"
        })}` +
        segments.map((segment) =>
          `<rect x="${segment.x}" y="47" width="${segment.width}" height="42" fill="${segment.color}" data-w10-bar data-w10-seq="${segment.seq}"/>`
        ).join("") +
        `${text(107, 68, "65% KIOSK", {
          size: 10,
          weight: 900,
          fill: "#10131a"
        })}` +
        `${text(243, 68, "29% DESK", {
          size: 9,
          weight: 900,
          fill: "#10131a"
        })}` +
        `${text(
          160,
          108,
          "9 of 22 Guest Hosts escalated every rate discrepancy",
          { size: 9, fill: "#FF6B6B" }
        )}` +
        `${text(
          160,
          129,
          "Adoption evidence reveals whether the redesigned process is becoming normal work.",
          { size: 8.5 }
        )}`
      );
    },

    readiness() {
      const checks = [
        ["Role defined", true],
        ["Description on time", false],
        ["Rewards reviewed", false],
        ["Objectives updated", false],
        ["Waiver formalised", false],
        ["Induction 22/22", true],
        ["Capability tested", false]
      ];

      let body = text(
        160,
        14,
        "READINESS EVIDENCE · NOT ATTENDANCE ALONE",
        { size: 9.5, fill: "#FFB84D" }
      );

      checks.forEach(([label, ok], index) => {
        const col = index % 4;
        const row = Math.floor(index / 4);
        const x = 7 + col * 78;
        const y = 35 + row * 51;
        const color = ok ? "#3DD68C" : "#FF6B6B";

        body += box(x, y, 72, 42, {
          seq: index + 1,
          rx: 6,
          stroke: color
        });

        body += text(x + 12, y + 21, ok ? "✓" : "×", {
          size: 13,
          weight: 900,
          fill: color
        });

        body += text(
          x + 42,
          y + 21,
          label.replace(" ", "|"),
          { size: 7.5, anchor: "middle" }
        );
      });

      body += text(
        160,
        145,
        "Green attendance data can coexist with serious people-design gaps.",
        { size: 8.5 }
      );

      return diagram(
        "readiness",
        157,
        "Readiness checks show two positive indicators and five unresolved gaps, including capability not tested.",
        body
      );
    },

    caseTimeline() {
      const stages = [
        ["NEW ROLE", "22 hosts", "#3DD68C"],
        ["AUTHORITY", "email only", "#FFB84D"],
        ["WEEK 11", "65% kiosk", "#FFB84D"],
        ["WARNING", "2 resign", "#FF6B6B"]
      ];

      let body = line("M28 77H292", 1, {
        stroke: "rgba(255,255,255,.4)",
        width: 3,
        token: true
      });

      stages.forEach(([head, note, color], index) => {
        const x = 32 + index * 85;

        body += `<circle cx="${x}" cy="77" r="18" fill="#10131a" stroke="${color}" stroke-width="3" data-w10-seq="${index * 3 + 2}"/>`;

        body += text(
          x,
          77,
          String(index + 1).padStart(2, "0"),
          { size: 9, fill: color }
        );

        body += text(x, 35, head, {
          size: 8,
          fill: color
        });

        body += text(x, 119, note, { size: 8.5 });
      });

      body += text(
        160,
        145,
        "A role launch becomes credible only when authority, measures and capability move with it.",
        { size: 8 }
      );

      return diagram(
        "case-timeline",
        156,
        "Qasr moved from a new Guest Host role to unclear authority, 65 percent kiosk adoption at week eleven and warning signs.",
        body
      );
    },

    handover() {
      const labels = [
        "Role|specification",
        "Decision|rights",
        "Capability|evidence",
        "Aligned|measures",
        "Develop|backlog"
      ];

      let body = text(
        160,
        14,
        "PEOPLE → DEVELOP · CONTROLLED HANDOVER",
        { size: 9.5, fill: "#FFB84D" }
      );

      labels.forEach((label, index) => {
        const x = 4 + index * 64;
        const color =
          index === labels.length - 1
            ? "#3DD68C"
            : "rgba(255,255,255,.55)";

        body += box(x, 52, 56, 58, {
          seq: index * 3 + 1,
          rx: 7,
          stroke: color
        });

        body += text(x + 28, 81, label, {
          size: 7.8,
          fill:
            index === labels.length - 1
              ? "#3DD68C"
              : "currentColor"
        });

        if (index < labels.length - 1) {
          body += line(
            `M${x + 57} 81H${x + 63}`,
            index * 3 + 2,
            { stroke: "#FFB84D" }
          );

          body += arrow(
            x + 63,
            81,
            "#FFB84D",
            index * 3 + 3
          );
        }
      });

      body += text(
        160,
        137,
        "Handover the people design with owners, evidence and unresolved decisions visible.",
        { size: 8.5 }
      );

      return diagram(
        "handover",
        150,
        "The People phase hands role specifications, decision rights, capability evidence and aligned measures into the Develop backlog.",
        body
      );
    }
  });

  function ensureCss() {
    if (doc.getElementById("vl-w10-cinematics-v1")) return;

    const style = doc.createElement("style");
    style.id = "vl-w10-cinematics-v1";
    style.textContent = `
.look[data-w10-cinematics="on"]{
  --w10-cine:#ffb84d;
  isolation:isolate;
}
.look[data-w10-look="story"]{
  --w10-cine:#ffe58b;
}
.look[data-w10-look="codex"]{
  --w10-cine:#63d7c6;
}
.look[data-w10-look="notebook"]{
  --w10-cine:#ee7f52;
}
.look[data-w10-look="journey"]{
  --w10-cine:#66c8ff;
}
.w10-cine-sweep{
  position:absolute;
  inset:-12%;
  z-index:999;
  pointer-events:none;
  opacity:0;
  background:linear-gradient(
    90deg,
    transparent 0%,
    color-mix(in srgb,var(--w10-cine) 18%,transparent) 47%,
    color-mix(in srgb,var(--w10-cine) 34%,transparent) 50%,
    transparent 54%
  );
  transform:translate3d(-110%,0,0);
  will-change:transform,opacity;
}
.look[data-w10-look="notebook"] .w10-cine-sweep{
  background:linear-gradient(
    100deg,
    transparent 0%,
    color-mix(in srgb,var(--w10-cine) 22%,transparent) 49%,
    transparent 53%
  );
}
.look[data-w10-look="journey"] .w10-cine-sweep{
  background:linear-gradient(
    90deg,
    transparent 0%,
    color-mix(in srgb,var(--w10-cine) 16%,transparent) 45%,
    color-mix(in srgb,var(--w10-cine) 30%,transparent) 50%,
    transparent 58%
  );
}
.look[data-w10-cinematics="on"] svg.w10-dg{
  overflow:visible;
}
.look[data-w10-cinematics="on"] svg.w10-dg [data-w10-seq]{
  transform-box:fill-box;
  transform-origin:center;
}
.look[data-w10-cinematics="on"] svg.w10-dg [data-w10-bar]{
  transform-box:fill-box;
  transform-origin:left center;
}
.look[data-w10-cinematics="on"] .w10-flow-token{
  fill:var(--w10-cine);
  stroke:#10131a;
  stroke-width:1.5;
  vector-effect:non-scaling-stroke;
  filter:none;
}
@media (prefers-reduced-motion:reduce){
  .w10-cine-sweep{
    display:none!important;
  }
}
`;

    doc.head.appendChild(style);
  }

  function stateFor(style) {
    let state = states.get(style);

    if (!state) {
      state = {
        style,
        root: null,
        section: null,
        lastSentence: -1,
        lastScene: -1,
        epoch: 0,
        animations: new Set(),
        timers: new Set(),
        frames: new Set(),
        tokens: new Set(),
        resize: null
      };

      states.set(style, state);
    }

    return state;
  }

  function clearWork(state, settle = true) {
    state.epoch += 1;

    state.timers.forEach((id) => clearTimeout(id));
    state.frames.forEach((id) => cancelAnimationFrame(id));
    state.timers.clear();
    state.frames.clear();

    state.animations.forEach((animation) => {
      try {
        settle
          ? animation.finish()
          : animation.cancel();
      } catch (_) {
        // The animated node may already have been detached.
      }
    });

    state.animations.clear();

    state.tokens.forEach((token) => token.remove());
    state.tokens.clear();
  }

  function later(state, fn, delay = 0) {
    const epoch = state.epoch;

    const id = setTimeout(() => {
      state.timers.delete(id);

      if (
        epoch === state.epoch &&
        state.root?.isConnected
      ) {
        fn();
      }
    }, Math.max(0, delay));

    state.timers.add(id);
    return id;
  }

  function frame(state, fn) {
    const epoch = state.epoch;

    const id = requestAnimationFrame((time) => {
      state.frames.delete(id);

      if (
        epoch === state.epoch &&
        state.root?.isConnected
      ) {
        fn(time);
      }
    });

    state.frames.add(id);
    return id;
  }

  function play(state, element, keyframes, options) {
    if (
      !element?.animate ||
      reduced()
    ) {
      return null;
    }

    const animation = element.animate(keyframes, options);
    state.animations.add(animation);

    animation.finished
      .catch(() => null)
      .finally(() => state.animations.delete(animation));

    return animation;
  }

  function scenes(section) {
    const moments = Array.isArray(section?.moments)
      ? section.moments
      : [];

    const map = new Map();

    moments.forEach((moment) => {
      if (
        !moment ||
        typeof moment !== "object"
      ) {
        return;
      }

      const at = Math.max(
        0,
        Math.trunc(num(moment.at, 0))
      );

      if (!map.has(at)) map.set(at, []);
      map.get(at).push(moment);
    });

    return [...map.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([at, group]) => ({ at, group }));
  }

  function sceneAt(section, sentence) {
    const list = scenes(section);
    let found = {
      index: -1,
      at: -1,
      group: []
    };

    list.forEach((scene, index) => {
      if (scene.at <= sentence) {
        found = {
          index,
          at: scene.at,
          group: scene.group
        };
      }
    });

    return found;
  }

  function visible(element) {
    if (
      !(element instanceof Element) ||
      !element.isConnected
    ) {
      return false;
    }

    const css = getComputedStyle(element);

    if (
      css.display === "none" ||
      css.visibility === "hidden" ||
      Number(css.opacity) === 0
    ) {
      return false;
    }

    const rect = element.getBoundingClientRect();
    return rect.width > 4 && rect.height > 4;
  }

  function settleDiagram(svg) {
    svg.querySelectorAll(
      "[data-w10-seq], rect, circle, ellipse, polygon, polyline, line, path, text, g"
    ).forEach((element) => {
      element.style.opacity = "";
      element.style.transform = "";

      if (element instanceof SVGPathElement) {
        element.style.strokeDasharray = "";
        element.style.strokeDashoffset = "";
      }
    });
  }

  function animateCount(state, element, delay) {
    const raw = element.getAttribute("data-w10-count");
    const target = num(raw, NaN);

    if (!Number.isFinite(target)) return;

    const suffix =
      element.getAttribute("data-w10-suffix") || "";

    const start = performance.now() + delay;
    const duration = 900;
    const epoch = state.epoch;

    const tick = (now) => {
      if (
        epoch !== state.epoch ||
        !element.isConnected
      ) {
        return;
      }

      const p = clamp(
        (now - start) / duration,
        0,
        1
      );

      const eased = 1 - Math.pow(1 - p, 3);
      element.textContent =
        `${Math.round(target * eased)}${suffix}`;

      if (p < 1) frame(state, tick);
    };

    frame(state, tick);
  }

  function animateToken(state, svg, path, delay) {
    if (
      reduced() ||
      !path ||
      typeof path.getTotalLength !== "function"
    ) {
      return;
    }

    let length;

    try {
      length = path.getTotalLength();
    } catch (_) {
      return;
    }

    if (
      !Number.isFinite(length) ||
      length < 12
    ) {
      return;
    }

    const token = doc.createElementNS(NS, "circle");
    token.setAttribute("r", "4.2");
    token.setAttribute("class", "w10-flow-token");
    token.setAttribute("aria-hidden", "true");
    svg.appendChild(token);
    state.tokens.add(token);

    const start = performance.now() + delay;
    const duration = clamp(length * 8, 850, 1700);
    const epoch = state.epoch;

    const tick = (now) => {
      if (
        epoch !== state.epoch ||
        !token.isConnected
      ) {
        return;
      }

      const p = clamp(
        (now - start) / duration,
        0,
        1
      );

      const eased = p < .5
        ? 2 * p * p
        : 1 - Math.pow(-2 * p + 2, 2) / 2;

      let point;

      try {
        point = path.getPointAtLength(length * eased);
      } catch (_) {
        token.remove();
        return;
      }

      token.setAttribute(
        "transform",
        `translate(${point.x} ${point.y})`
      );

      token.style.opacity = p < .04
        ? String(p / .04)
        : p > .9
          ? String((1 - p) / .1)
          : "1";

      if (p < 1) {
        frame(state, tick);
      } else {
        token.remove();
        state.tokens.delete(token);
      }
    };

    frame(state, tick);
  }

  function animateDiagram(state, svg, shouldAnimate) {
    settleDiagram(svg);

    if (
      !shouldAnimate ||
      reduced()
    ) {
      return;
    }

    // diagrams.js emits primitives in teaching order:
    // node, label, edge, arrowhead.
    const candidates = [...svg.children].filter(
      (element) =>
        !["defs", "title", "desc", "style"]
          .includes(element.tagName.toLowerCase())
    );

    const unique =
      [...new Set(candidates)].slice(0, 40);

    let cursor = 80;

    unique.forEach((element) => {
      const tag = element.tagName.toLowerCase();
      const isPath =
        element instanceof SVGPathElement;

      const isEdge =
        element.hasAttribute("data-w10-draw") ||
        (
          (
            isPath ||
            tag === "line" ||
            tag === "polyline"
          ) &&
          (
            element.getAttribute("fill") === "none" ||
            !element.getAttribute("fill")
          ) &&
          element.getAttribute("stroke") !== "none"
        );

      if (
        isEdge &&
        isPath &&
        typeof element.getTotalLength === "function"
      ) {
        let length = 0;

        try {
          length = element.getTotalLength();
        } catch (_) {
          length = 0;
        }

        if (length > 0) {
          element.style.strokeDasharray = `${length}`;
          element.style.strokeDashoffset = `${length}`;

          const animation = play(
            state,
            element,
            [
              {
                strokeDashoffset: length,
                opacity: .32
              },
              {
                strokeDashoffset: 0,
                opacity: 1
              }
            ],
            {
              duration: clamp(
                length * 7,
                480,
                1200
              ),
              delay: cursor,
              easing: "cubic-bezier(.16,1,.3,1)",
              fill: "forwards"
            }
          );

          animation?.finished
            .then(() => {
              element.style.strokeDasharray = "";
              element.style.strokeDashoffset = "";
            })
            .catch(() => null);

          cursor += 170;
          return;
        }
      }

      if (element.hasAttribute("data-w10-bar")) {
        play(
          state,
          element,
          [
            {
              transform: "scaleX(.02)",
              opacity: .35
            },
            {
              transform: "scaleX(1)",
              opacity: 1
            }
          ],
          {
            duration: 760,
            delay: cursor,
            easing: "cubic-bezier(.16,1,.3,1)",
            fill: "both"
          }
        );

        cursor += 120;
        return;
      }

      const from = tag === "text"
        ? {
            opacity: 0,
            transform: "translateY(5px)"
          }
        : {
            opacity: 0,
            transform: "translateY(8px) scale(.94)"
          };

      play(
        state,
        element,
        [
          from,
          {
            opacity: 1,
            transform: "translateY(0) scale(1)"
          }
        ],
        {
          duration: tag === "text" ? 430 : 580,
          delay: cursor,
          easing: "cubic-bezier(.16,1,.3,1)",
          fill: "both"
        }
      );

      if (element.hasAttribute("data-w10-count")) {
        animateCount(state, element, cursor);
      }

      cursor += tag === "text" ? 70 : 115;
    });

    const tokenPath =
      svg.querySelector("[data-w10-token-path]") ||
      [...svg.querySelectorAll("path[data-w10-draw]")]
        .find((path) => {
          try {
            return path.getTotalLength() > 36;
          } catch (_) {
            return false;
          }
        });

    animateToken(
      state,
      svg,
      tokenPath,
      Math.min(cursor + 120, 1700)
    );
  }

  function semanticTargets(root, type) {
    const selectors = {
      compare:
        ".vs-i,.cx-pair,[class*='compare']",
      issue:
        ".chip,.cx-issue,[class*='issue']",
      question:
        ".bigq,[class*='question']",
      formula:
        ".frac,[class*='formula']",
      statement:
        ".stmt,[class*='statement']",
      item:
        ".ring,.cx-entry,[class*='item']",
      title:
        "h1,h2,[class*='title']"
    };

    const selector =
      selectors[type] ||
      "h2,.stmt,.cx-entry";

    return [...root.querySelectorAll(selector)]
      .filter(visible)
      .filter((element) => !element.closest("svg"))
      .slice(-8);
  }

  function animateSemantic(
    state,
    type,
    shouldAnimate
  ) {
    if (
      !shouldAnimate ||
      reduced() ||
      type === "diagram"
    ) {
      return;
    }

    const vectors = {
      story: "translateY(12px) scale(.985)",
      codex: "translateX(-14px)",
      notebook: "translateY(9px) rotate(-.25deg)",
      journey: "translateX(14px) scale(.99)"
    };

    semanticTargets(state.root, type)
      .forEach((element, index) => {
        play(
          state,
          element,
          [
            {
              transform:
                vectors[state.style.id] ||
                "translateY(10px)",
              opacity: .18
            },
            {
              transform:
                "translate(0,0) scale(1) rotate(0)",
              opacity: 1
            }
          ],
          {
            duration: 520,
            delay: 70 + index * 75,
            easing: "cubic-bezier(.16,1,.3,1)",
            composite: "add"
          }
        );
      });
  }

  function sweep(state, shouldAnimate) {
    if (
      !shouldAnimate ||
      reduced() ||
      !state.root
    ) {
      return;
    }

    const layer = doc.createElement("div");
    layer.className = "w10-cine-sweep";
    layer.setAttribute("aria-hidden", "true");
    state.root.appendChild(layer);

    const animation = play(
      state,
      layer,
      [
        {
          transform: "translate3d(-110%,0,0)",
          opacity: 0
        },
        {
          transform: "translate3d(-30%,0,0)",
          opacity: .72,
          offset: .34
        },
        {
          transform: "translate3d(110%,0,0)",
          opacity: 0
        }
      ],
      {
        duration: 660,
        easing: "cubic-bezier(.4,0,.2,1)"
      }
    );

    animation?.finished
      .finally(() => layer.remove());
  }

  function renderBeat(
    state,
    scene,
    shouldAnimate
  ) {
    if (!state.root?.isConnected) return;

    clearWork(state, true);
    state.root.dataset.w10Scene =
      String(scene.index);

    const primary =
      scene.group[0]?.type || "cover";

    state.root.dataset.w10Moment = primary;
    sweep(state, shouldAnimate);

    const svgs =
      [...state.root.querySelectorAll("svg.dg")]
        .filter(visible)
        .slice(-2);

    svgs.forEach((svg) =>
      animateDiagram(state, svg, shouldAnimate)
    );

    animateSemantic(
      state,
      primary,
      shouldAnimate
    );
  }

  function queueBeat(
    state,
    scene,
    shouldAnimate
  ) {
    const epoch = state.epoch;

    frame(state, () =>
      frame(state, () => {
        if (epoch !== state.epoch) return;

        renderBeat(
          state,
          scene,
          shouldAnimate
        );
      })
    );
  }

  function install(style) {
    if (
      !style ||
      !LOOK_IDS.has(style.id) ||
      installed.has(style)
    ) {
      return;
    }

    if (
      ![
        style.mount,
        style.load,
        style.step
      ].every((method) => typeof method === "function")
    ) {
      return;
    }

    const base = {
      mount: style.mount,
      load: style.load,
      step: style.step
    };

    const state = stateFor(style);

    style.mount = function mountWeek10Cinematics(
      element
    ) {
      clearWork(state, false);
      state.resize?.disconnect?.();

      const result =
        base.mount.apply(this, arguments);

      state.root = element;
      state.section = null;
      state.lastSentence = -1;
      state.lastScene = -1;

      if (element) {
        element.dataset.w10Cinematics = "on";
        element.dataset.w10Look = style.id;

        state.resize =
          typeof ResizeObserver === "function"
            ? new ResizeObserver(() => {
                if (
                  state.lastSentence >= -1 &&
                  state.section
                ) {
                  const scene = sceneAt(
                    state.section,
                    state.lastSentence
                  );

                  queueBeat(
                    state,
                    scene,
                    false
                  );
                }
              })
            : null;

        state.resize?.observe(element);
      }

      return result;
    };

    style.load = function loadWeek10Cinematics(
      section
    ) {
      clearWork(state, false);
      state.section = section || null;
      state.lastSentence = -1;
      state.lastScene = -1;

      const result =
        base.load.apply(this, arguments);

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

    style.step = function stepWeek10Cinematics(
      index
    ) {
      const target = Math.max(
        -1,
        Math.trunc(num(index, -1))
      );

      const previousSentence =
        state.lastSentence;

      const previousScene =
        state.lastScene;

      const scene =
        sceneAt(state.section, target);

      const result =
        base.step.apply(this, arguments);

      const adjacent =
        target === previousSentence + 1;

      const changed =
        scene.index !== previousScene;

      const shouldAnimate =
        adjacent &&
        changed &&
        target >= 0;

      state.lastSentence = target;
      state.lastScene = scene.index;

      if (
        changed ||
        target === previousSentence
      ) {
        queueBeat(
          state,
          scene,
          shouldAnimate &&
          target !== previousSentence
        );
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

  const api = Object.freeze({
    version: VERSION,
    diagrams: DIAG,
    install: installAll,

    settle(root = doc) {
      root.querySelectorAll?.("svg.w10-dg")
        .forEach(settleDiagram);
    }
  });

  window.W10_CINEMATICS = api;
  window.W10_DIAG = DIAG;

  if (doc.readyState === "loading") {
    doc.addEventListener(
      "DOMContentLoaded",
      installAll,
      { once: true }
    );
  } else {
    installAll();
  }

  window.addEventListener(
    "pageshow",
    installAll
  );
})();
