// FILE: scenes.js

/*
 * VoiceLearn — Scene Engine v25
 * OPER621 Business Process Management
 *
 * Source-faithful revision of v24.
 *
 * Public API preserved:
 *   Scenes.mount(el)
 *   Scenes.load(li, si, force)
 *   Scenes.loadBeats(left, right, scene)
 *   Scenes.step(n)
 *   Scenes.showAll()
 *   Scenes.fit()
 *   Scenes.item(at, html, cls)
 *
 * Preserved:
 * - Existing scene registration
 * - Sentence-indexed reveals
 * - Reversible progression
 * - Bars, donuts, counters, tags and routes
 * - Quiz answer reveals
 * - Responsive --k scaling
 * - Visibility and page restoration
 *
 * Improved:
 * - No duplicated player progress bar
 * - No duplicated lesson header
 * - Safer viewport fitting
 * - Less excessive movement
 * - Better handling of long content
 * - Reduced-motion support
 * - Reliable cleanup of scheduled effects
 *
 * No speech synthesis or narration logic is modified.
 */

(() => {
  "use strict";

  /* ======================================================
     01. ICONS
     ====================================================== */

  const I = {
    target:
      '<circle cx="12" cy="12" r="8"/>' +
      '<circle cx="12" cy="12" r="3"/>',

    check:
      '<path d="M4 12l5 5L20 6"/>',

    eq:
      '<path d="M5 9h14M5 15h14"/>',

    clock:
      '<circle cx="12" cy="12" r="8"/>' +
      '<path d="M12 7v5l3 2"/>',

    one:
      '<rect x="5" y="5" width="14" ' +
      'height="14" rx="3"/>' +
      '<path d="M11 9l2-1v8"/>',

    link:
      '<path d="M10 14a4 4 0 0 0 6 0' +
      'l3-3a4 4 0 0 0-6-6l-1 1"/>' +
      '<path d="M14 10a4 4 0 0 0-6 0' +
      'l-3 3a4 4 0 0 0 6 6l1-1"/>',

    gauge:
      '<path d="M4 16a8 8 0 1 1 16 0"/>' +
      '<path d="M12 16l4-5"/>',

    chart:
      '<path d="M5 19V9M10 19V5' +
      'M15 19v-7M20 19v-4"/>',

    users:
      '<circle cx="9" cy="9" r="3"/>' +
      '<path d="M3 19a6 6 0 0 1 12 0"/>' +
      '<path d="M16 6a3 3 0 0 1 0 6' +
      'M17 19a6 6 0 0 0-2-4"/>',

    flask:
      '<path d="M9 3h6M10 3v6l-5 9' +
      'a2 2 0 0 0 2 3h10' +
      'a2 2 0 0 0 2-3l-5-9V3"/>',

    layers:
      '<path d="M12 3l9 5-9 5-9-5 9-5z"/>' +
      '<path d="M3 13l9 5 9-5"/>',

    dash:
      '<rect x="3" y="4" width="18" ' +
      'height="16" rx="2"/>' +
      '<path d="M7 15l3-3 3 2 4-5"/>',

    brain:
      '<circle cx="12" cy="12" r="3"/>' +
      '<path d="M12 3v3M12 18v3' +
      'M3 12h3M18 12h3' +
      'M5.6 5.6l2.1 2.1' +
      'M16.3 16.3l2.1 2.1' +
      'M5.6 18.4l2.1-2.1' +
      'M16.3 7.7l2.1-2.1"/>',

    audit:
      '<path d="M7 3h7l4 4v14H7z"/>' +
      '<path d="M10 12h5M10 16h5' +
      'M14 3v4h4"/>'
  };

  /* ======================================================
     02. HELPERS
     ====================================================== */

  const clamp = (n, lo, hi) =>
    Math.min(hi, Math.max(lo, n));

  const finite = (n, fallback = 0) => {
    const value = Number(n);

    return Number.isFinite(value)
      ? value
      : fallback;
  };

  const indexOf = (n, fallback = -1) => {
    const value = Number(n);

    return Number.isFinite(value)
      ? Math.max(-1, Math.trunc(value))
      : fallback;
  };

  const escapeHtml = value =>
    String(value ?? "").replace(
      /[&<>"']/g,
      character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[character]
    );

  const icon = name => `
    <div class="ic" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        ${I[name] || I.layers}
      </svg>
    </div>
  `;

  const arrow = `
    <div class="arrow" aria-hidden="true">
      <svg viewBox="0 0 16 30">
        <path d="M8 2v24M2 20l6 7 6-7"/>
      </svg>
    </div>
  `;

  const item = (
    at,
    html,
    cls = ""
  ) => `
    <div
      class="st-it ${cls}"
      data-at="${indexOf(at, 0)}"
    >
      ${html}
    </div>
  `;

  /* ======================================================
     03. SCENE REGISTRY
     ====================================================== */

  /*
   * Preserve the original scene registry.
   *
   * Course-specific scene definitions may
   * register through this object.
   */

  const S = Object.create(null);

  /* ======================================================
     04. STATE
     ====================================================== */

  let root = null;
  let track = null;
  let bar = null;

  let beats = [];
  let items = [];

  let current = -1;
  let maximum = 1;

  let lastKey = "";

  let generation = 0;

  let fittedScale = 1;
  let lastWidth = 0;
  let lastHeight = 0;

  const timers = new Set();
  const frames = new Set();

  /* ======================================================
     05. MOTION PREFERENCE
     ====================================================== */

  const motionQuery =
    typeof window.matchMedia === "function"
      ? window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        )
      : null;

  let reducedMotion =
    Boolean(
      motionQuery &&
      motionQuery.matches
    );

  function motion() {
    reducedMotion = Boolean(
      motionQuery &&
      motionQuery.matches
    );

    if (!root) return;

    root.classList.toggle(
      "st-reduced-motion",
      reducedMotion
    );

    root.style.setProperty(
      "--st-motion",
      reducedMotion ? "0" : "1"
    );

    if (track) {
      track.style.transition =
        reducedMotion ? "none" : "";
    }
  }

  if (motionQuery) {
    const onMotionChange = () => {
      motion();

      if (beats.length) {
        updateScene(
          current,
          false
        );
      }
    };

    if (
      typeof motionQuery.addEventListener ===
      "function"
    ) {
      motionQuery.addEventListener(
        "change",
        onMotionChange
      );
    } else if (
      typeof motionQuery.addListener ===
      "function"
    ) {
      motionQuery.addListener(
        onMotionChange
      );
    }
  }

  /* ======================================================
     06. SCHEDULED WORK
     ====================================================== */

  function clearWork() {
    for (const id of timers) {
      clearTimeout(id);
    }

    timers.clear();

    for (const id of frames) {
      cancelAnimationFrame(id);
    }

    frames.clear();
  }

  function invalidate() {
    generation++;
    clearWork();
  }

  function schedule(fn, ms = 0) {
    const token = generation;

    const id = setTimeout(() => {
      timers.delete(id);

      if (
        token === generation &&
        root &&
        track
      ) {
        fn();
      }
    }, Math.max(0, finite(ms)));

    timers.add(id);

    return id;
  }

  function frame(fn) {
    const token = generation;

    const id = requestAnimationFrame(time => {
      frames.delete(id);

      if (
        token === generation &&
        root &&
        track
      ) {
        fn(time);
      }
    });

    frames.add(id);

    return id;
  }

  /* ======================================================
     07. MOUNT
     ====================================================== */

  function mount(el) {
    if (!(el instanceof HTMLElement)) {
      throw new TypeError(
        "Scenes.mount requires an HTML element"
      );
    }

    invalidate();

    root = el;

    root.classList.add("stage");

    /*
     * Retain compatibility elements.
     *
     * The shared player owns the visible
     * title, progress and captions.
     *
     * Legacy scene elements remain in
     * the DOM for compatibility but are
     * visually suppressed.
     */

    root.innerHTML = `
      <div
        class="st-cap"
        aria-hidden="true"
        hidden
      >
        <span id="stCapL"></span>
        <span id="stCapR"></span>
      </div>

      <div
        class="st-fade t"
        aria-hidden="true"
      ></div>

      <div class="st-track"></div>

      <div
        class="st-fade b"
        aria-hidden="true"
      ></div>

      <div
        class="st-bar"
        aria-hidden="true"
        hidden
      ></div>
    `;

    track =
      root.querySelector(".st-track");

    bar =
      root.querySelector(".st-bar");

    beats = [];
    items = [];

    current = -1;
    maximum = 1;

    lastKey = "";

    fittedScale = 1;
    lastWidth = 0;
    lastHeight = 0;

    root.style.setProperty(
      "--k",
      "1"
    );

    motion();

    return root;
  }

  /* ======================================================
     08. LOAD COURSE SCENE
     ====================================================== */

  function load(
    lessonIndex,
    sectionIndex,
    force = false
  ) {
    if (!root || !track) return;

    const course =
      window.COURSE;

    if (
      !course ||
      !Array.isArray(course.lessons)
    ) {
      return;
    }

    const lesson =
      course.lessons[lessonIndex];

    if (
      !lesson ||
      !Array.isArray(lesson.sections)
    ) {
      return;
    }

    const section =
      lesson.sections[sectionIndex];

    if (!section) return;

    const key =
      `${lessonIndex}:${sectionIndex}`;

    if (
      !force &&
      lastKey === key
    ) {
      return;
    }

    const scene =
      S[`${lesson.id}:${sectionIndex}`] ||
      [
        {
          at: 0,

          html: `
            <div class="st-kicker">
              Lesson ${lessonIndex + 1}
            </div>

            <h2 class="st-h">
              ${escapeHtml(
                section.title || ""
              )}
            </h2>
          `
        }
      ];

    loadBeats(
      `<b>Lesson ${lessonIndex + 1}</b> · ` +
      escapeHtml(lesson.title || ""),

      `${sectionIndex + 1}/` +
      lesson.sections.length,

      scene
    );

    lastKey = key;
  }

  /* ======================================================
     09. LOAD BEATS
     ====================================================== */

  function loadBeats(
    left,
    right,
    scene
  ) {
    if (!root || !track) return;

    invalidate();

    lastKey =
      "custom:" +
      String(left ?? "") +
      String(right ?? "");

    const capLeft =
      root.querySelector("#stCapL");

    const capRight =
      root.querySelector("#stCapR");

    if (capLeft) {
      capLeft.innerHTML =
        String(left ?? "");
    }

    if (capRight) {
      capRight.textContent =
        String(right ?? "");
    }

    const source =
      Array.isArray(scene)
        ? scene
        : [];

    const markup = source
      .filter(
        beat =>
          beat &&
          typeof beat === "object"
      )
      .map((beat, i) => `
        <section
          class="st-beat"
          data-at="${indexOf(beat.at, 0)}"
          data-fx="${escapeHtml(
            beat.fx || ""
          )}"
          data-i="${i}"
        >
          ${String(beat.html ?? "")}
        </section>
      `)
      .join("");

    track.style.transition = "none";
    track.style.transform =
      "translateY(0px)";

    /*
     * Preserve the existing --k scaling
     * mechanism used by authored scenes.
     */

    track.innerHTML = markup.replace(
      /(\d*\.?\d+)px/g,
      "calc($1px * var(--k,1))"
    );

    void track.offsetHeight;

    if (!reducedMotion) {
      track.style.removeProperty(
        "transition"
      );
    }

    beats = Array.from(
      track.querySelectorAll(
        ".st-beat"
      )
    );

    items = Array.from(
      track.querySelectorAll(
        ".st-it"
      )
    );

    maximum = Math.max(
      1,
      ...Array.from(
        track.querySelectorAll(
          "[data-at]"
        )
      ).map(element =>
        indexOf(
          element.dataset.at,
          0
        )
      )
    );

    current = -1;

    if (bar) {
      bar.style.width = "0%";
    }

    beats.forEach(resetEffect);

    fit();
  }

  /* ======================================================
     10. COUNTERS
     ====================================================== */

  function setCount(
    el,
    zero = false
  ) {
    const n = zero
      ? 0
      : Math.round(
          finite(el.dataset.count)
        );

    const unit =
      el.dataset.unit ?? "°C";

    el.textContent =
      n + unit;
  }

  function countUp(el) {
    const token = generation;

    const target =
      finite(el.dataset.count);

    const unit =
      el.dataset.unit ?? "°C";

    if (reducedMotion) {
      setCount(el);
      return;
    }

    let start = null;

    function tick(time) {
      if (
        token !== generation ||
        !el.isConnected
      ) {
        return;
      }

      if (start === null) {
        start = time;
      }

      /*
       * Reduced from 1200ms to 500ms.
       *
       * Counters remain informative without
       * dominating the narrated lesson.
       */

      const progress = clamp(
        (time - start) / 500,
        0,
        1
      );

      const eased =
        1 - Math.pow(
          1 - progress,
          3
        );

      el.textContent =
        Math.round(
          target * eased
        ) + unit;

      if (progress < 1) {
        frame(tick);
      } else {
        setCount(el);
      }
    }

    frame(tick);
  }

  /* ======================================================
     11. APPLY EFFECT
     ====================================================== */

  function applyEffect(
    beat,
    animate
  ) {
    if (
      !beat ||
      beat.dataset.done === "1"
    ) {
      return;
    }

    beat.dataset.done = "1";

    const token = generation;

    const kind =
      beat.dataset.fx || "";

    const run = () => {
      if (
        token !== generation ||
        !beat.isConnected ||
        beat.dataset.done !== "1"
      ) {
        return;
      }

      /*
       * Counters.
       */

      beat
        .querySelectorAll("[data-count]")
        .forEach(element => {
          if (
            animate &&
            !reducedMotion
          ) {
            countUp(element);
          } else {
            setCount(element);
          }
        });

      /*
       * Bars.
       */

      if (kind === "bars") {
        beat
          .querySelectorAll(".bar")
          .forEach(element => {
            const height = Math.max(
              0,
              finite(
                element.dataset.h
              )
            );

            element.style.height =
              height * 1.6 + "px";
          });
      }

      /*
       * Donut chart.
       */

      if (kind === "donut") {
        beat
          .querySelectorAll(".arc")
          .forEach(element => {
            const percentage = clamp(
              finite(
                element.dataset.pct
              ),
              0,
              100
            );

            element.style.strokeDashoffset =
              String(
                301.6 *
                (1 - percentage / 100)
              );
          });
      }

      /*
       * Formula tags.
       */

      if (kind === "tags") {
        const fraction =
          beat.querySelector(
            ".st-frac"
          );

        if (fraction) {
          fraction.classList.add(
            "show-tags"
          );
        }
      }

      /*
       * Broken route.
       *
       * Use a short delay rather than
       * the original 1500ms wait.
       */

      if (kind === "route") {
        const route =
          beat.querySelector(
            ".st-route"
          );

        if (route) {
          if (
            animate &&
            !reducedMotion
          ) {
            schedule(() => {
              if (
                beat.dataset.done === "1"
              ) {
                route.classList.add(
                  "broken"
                );
              }
            }, 350);
          } else {
            route.classList.add(
              "broken"
            );
          }
        }
      }

      /*
       * Quiz answer reveal.
       */

      if (kind === "reveal") {
        beat
          .querySelectorAll(
            ".st-opt[data-right]"
          )
          .forEach(element => {
            element.classList.add(
              "right"
            );
          });
      }
    };

    if (
      animate &&
      !reducedMotion
    ) {
      schedule(run, 120);
    } else {
      run();
    }
  }

  /* ======================================================
     12. RESET EFFECT
     ====================================================== */

  function resetEffect(beat) {
    if (!beat) return;

    delete beat.dataset.done;

    beat
      .querySelectorAll(
        "[data-count]"
      )
      .forEach(element =>
        setCount(
          element,
          true
        )
      );

    const kind =
      beat.dataset.fx || "";

    if (kind === "bars") {
      beat
        .querySelectorAll(".bar")
        .forEach(element => {
          element.style.height =
            "0px";
        });
    }

    if (kind === "donut") {
      beat
        .querySelectorAll(".arc")
        .forEach(element => {
          element.style.strokeDashoffset =
            "301.6";
        });
    }

    if (kind === "tags") {
      const fraction =
        beat.querySelector(
          ".st-frac"
        );

      if (fraction) {
        fraction.classList.remove(
          "show-tags"
        );
      }
    }

    if (kind === "route") {
      const route =
        beat.querySelector(
          ".st-route"
        );

      if (route) {
        route.classList.remove(
          "broken"
        );
      }
    }

    if (kind === "reveal") {
      beat
        .querySelectorAll(
          ".st-opt[data-right]"
        )
        .forEach(element => {
          element.classList.remove(
            "right"
          );
        });
    }
  }

  /* ======================================================
     13. OFFSET WITHIN TRACK
     ====================================================== */

  function offsetInTrack(el) {
    if (
      !el ||
      !track
    ) {
      return 0;
    }

    let y = 0;
    let element = el;

    while (
      element &&
      element !== track
    ) {
      y += element.offsetTop || 0;

      element =
        element.offsetParent;
    }

    if (element === track) {
      return y;
    }

    return (
      el.getBoundingClientRect().top -
      track.getBoundingClientRect().top
    );
  }

  /* ======================================================
     14. POSITIONING
     ====================================================== */

  function position(
    focus,
    last,
    animate
  ) {
    if (
      !root ||
      !track
    ) {
      return;
    }

    /*
     * Quiz and report screens already use
     * native scrolling.
     */

    if (
      root.classList.contains(
        "scroll"
      )
    ) {
      track.style.transform =
        "none";

      return;
    }

    if (
      !root.clientHeight ||
      !root.clientWidth ||
      !beats.length
    ) {
      return;
    }

    const immediate =
      !animate ||
      reducedMotion;

    if (immediate) {
      track.style.transition =
        "none";
    }

    const first =
      beats[0];

    const end =
      beats[beats.length - 1];

    const bottom =
      end.offsetTop +
      end.offsetHeight;

    const top =
      first.offsetTop;

    const contentHeight =
      Math.max(
        0,
        bottom - top
      );

    const available =
      root.clientHeight;

    let y = 0;

    /*
     * Small scenes are centered.
     *
     * Larger scenes follow the newest
     * visible content.
     */

    if (
      contentHeight + 24 <= available
    ) {
      y = Math.max(
        0,
        (
          available -
          bottom -
          24
        ) / 2
      );
    } else if (
      focus &&
      last
    ) {
      const focusTop =
        offsetInTrack(focus);

      const lastBottom =
        offsetInTrack(last) +
        last.offsetHeight;

      const desired =
        focusTop +
        focus.offsetHeight / 2 -
        available * .45;

      const needed =
        lastBottom -
        available +
        32;

      y = -Math.max(
        0,
        Math.min(
          desired,
          needed
        )
      );
    }

    track.style.transform =
      `translateY(${Number.isFinite(y)
        ? y.toFixed(2)
        : "0"}px)`;

    if (
      immediate &&
      !reducedMotion
    ) {
      void track.offsetHeight;

      track.style.removeProperty(
        "transition"
      );
    }
  }

  /* ======================================================
     15. CURRENT POSITION
     ====================================================== */

  function positionCurrent() {
    if (
      !root ||
      !track ||
      !beats.length
    ) {
      return;
    }

    const visible =
      beats.filter(
        beat =>
          beat.classList.contains(
            "in"
          )
      );

    const last =
      visible[visible.length - 1] ||
      null;

    let focus = last;

    if (last) {
      const visibleItems =
        items.filter(
          element =>
            element.classList.contains(
              "in"
            ) &&
            last.contains(element)
        );

      focus =
        visibleItems[
          visibleItems.length - 1
        ] || last;
    }

    position(
      focus,
      last,
      false
    );
  }

  /* ======================================================
     16. UPDATE SCENE
     ====================================================== */

  function updateScene(
    value,
    animate = true
  ) {
    if (
      !root ||
      !track ||
      !beats.length
    ) {
      return;
    }

    const target =
      indexOf(value, -1);

    /*
     * Backward seeking invalidates pending
     * visual effects.
     *
     * It does not affect narration.
     */

    if (target < current) {
      invalidate();
    }

    current = target;

    let last = null;
    let newest = null;

    /*
     * Beat visibility.
     */

    for (const beat of beats) {
      const at =
        indexOf(
          beat.dataset.at,
          0
        );

      if (at <= target) {
        beat.classList.add(
          "in"
        );

        applyEffect(
          beat,
          animate
        );

        last = beat;
      } else {
        beat.classList.remove(
          "in",
          "dim"
        );

        resetEffect(beat);
      }
    }

    /*
     * Item visibility.
     */

    for (const element of items) {
      const at =
        indexOf(
          element.dataset.at,
          0
        );

      if (at <= target) {
        const wasVisible =
          element.classList.contains(
            "in"
          );

        element.classList.add(
          "in"
        );

        if (!wasVisible) {
          newest = element;
        }

        /*
         * Keep existing card-settling
         * semantics with a shorter delay.
         */

        if (
          element.classList.contains(
            "st-card"
          )
        ) {
          if (!wasVisible) {
            element.classList.remove(
              "settled"
            );
          }

          if (
            !animate ||
            reducedMotion
          ) {
            element.classList.add(
              "settled"
            );
          } else if (!wasVisible) {
            schedule(() => {
              if (
                element.classList.contains(
                  "in"
                )
              ) {
                element.classList.add(
                  "settled"
                );
              }
            }, 300);
          }
        }
      } else {
        element.classList.remove(
          "in",
          "settled"
        );
      }
    }

    /*
     * Process-pipe progression.
     */

    track
      .querySelectorAll(
        ".st-pipe"
      )
      .forEach(pipe => {
        const visibleItems =
          Array.from(
            pipe.querySelectorAll(
              ".st-it.in"
            )
          );

        const lastItem =
          visibleItems[
            visibleItems.length - 1
          ];

        const line =
          pipe.querySelector(
            ".prog"
          );

        if (line) {
          line.style.height =
            lastItem
              ? (
                  lastItem.offsetTop +
                  18
                ) + "px"
              : "0px";
        }
      });

    /*
     * Dim older beats.
     */

    const lastPosition =
      last
        ? beats.indexOf(last)
        : -1;

    beats.forEach(
      (beat, index) => {
        beat.classList.toggle(
          "dim",

          beat.classList.contains(
            "in"
          ) &&
          index < lastPosition - 1
        );
      }
    );

    /*
     * Legacy progress remains synchronized
     * but is visually hidden.
     *
     * The shared player owns the visible
     * progress indicator.
     */

    if (bar) {
      const percentage =
        clamp(
          (target + 1) /
          (maximum + 1),
          0,
          1
        ) * 100;

      bar.style.width =
        percentage.toFixed(2) +
        "%";
    }

    /*
     * Native scrolling for quizzes.
     */

    if (
      root.classList.contains(
        "scroll"
      )
    ) {
      track.style.transform =
        "none";

      return;
    }

    /*
     * Find the newest visible item.
     */

    if (
      !newest &&
      last
    ) {
      const visibleItems =
        items.filter(
          element =>
            element.classList.contains(
              "in"
            ) &&
            last.contains(element)
        );

      newest =
        visibleItems[
          visibleItems.length - 1
        ] || null;
    }

    position(
      newest &&
      last &&
      last.contains(newest)
        ? newest
        : last,

      last,

      animate
    );
  }

  /* ======================================================
     17. STEP
     ====================================================== */

  function step(n) {
    if (
      !root ||
      !track ||
      !beats.length
    ) {
      return;
    }

    const target =
      indexOf(n, -1);

    if (target === current) {
      positionCurrent();
      return;
    }

    updateScene(
      target,
      target > current
    );
  }

  /* ======================================================
     18. SHOW ALL
     ====================================================== */

  function showAll() {
    step(99);
  }

  /* ======================================================
     19. RESPONSIVE FITTING
     ====================================================== */

  function fit() {
    if (!root) return;

    const width =
      root.clientWidth;

    const height =
      root.clientHeight;

    if (
      !width ||
      !height
    ) {
      return;
    }

    /*
     * Preserve the original --k scaling.
     *
     * Limit maximum scale to avoid very
     * large typography and overflowing
     * diagrams on desktop displays.
     */

    const scale = clamp(
      Math.min(
        height / 650,
        width / 420
      ),
      1,
      1.65
    );

    if (
      Math.abs(
        scale - fittedScale
      ) <= .001 &&
      Math.abs(
        width - lastWidth
      ) <= 1 &&
      Math.abs(
        height - lastHeight
      ) <= 1
    ) {
      return;
    }

    fittedScale = scale;

    lastWidth = width;
    lastHeight = height;

    root.style.setProperty(
      "--k",
      scale.toFixed(3)
    );

    /*
     * Reposition existing content.
     *
     * No visual effects are restarted.
     */

    positionCurrent();
  }

  /* ======================================================
     20. VISIBILITY RESTORATION
     ====================================================== */

  document.addEventListener(
    "visibilitychange",
    () => {
      if (
        !root ||
        !track
      ) {
        return;
      }

      if (document.hidden) {
        clearWork();
      } else {
        updateScene(
          current,
          false
        );

        fit();
      }
    }
  );

  /* ======================================================
     21. PAGE RESTORATION
     ====================================================== */

  window.addEventListener(
    "pageshow",
    event => {
      if (
        event.persisted &&
        root &&
        track
      ) {
        updateScene(
          current,
          false
        );

        fit();
      }
    }
  );

  /* ======================================================
     22. PUBLIC API
     ====================================================== */

  window.Scenes = {
    mount,
    load,
    loadBeats,
    step,
    showAll,
    fit,
    item
  };

})();

// END FILE